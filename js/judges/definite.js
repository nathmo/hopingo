// Judge `definite` (spec §5.2, §16.2, step U2): lines are numbers written
// with definite integrals ∫ from a to b, brackets [F] from a to b and
// limits. A line is right if it has the same value as the previous one:
// exactly when both are exact, else by quadrature (relative 1e−7; a
// singular end costs about 1e−8 in double precision). cfg:
//   {vars?: letters allowed, seq?: {J: 'int(x^n×e^x, x, 0, 1)'}, param?: 'n',
//    nRange?: [1, 6]}
// seq and param (recurrence formulas Iₙ = … Iₙ₋₁, catalogue A1 E4): J_n,
// J_(n−1), J_0 stand for the integral with n replaced; a line with n is
// compared for every n of nRange.
// Final form: an exact number in closed form (js/cas/closedform.js).

import { parse } from '../cas/parse.js';
import { symbolsIn, mapNode, contains, lit } from '../cas/ast.js';
import { exactValue } from '../cas/normal.js';
import { evalFloat } from '../cas/numeric.js';
import { closedNumber } from '../cas/closedform.js';
import { substVar } from '../cas/diff.js';
import { Q } from '../math/rational.js';
import { diagnoseLine } from './diagnose.js';
import { parseOpts, sameLine, frNum } from './common.js';

export const sign = '=';

const SEQS = new Map();
function seqOf(cfg) {
  if (!cfg.seq) return null;
  const key = JSON.stringify(cfg.seq);
  if (!SEQS.has(key)) SEQS.set(key, Object.fromEntries(Object.entries(cfg.seq).map(([k, t]) => [k, parse(t)])));
  return SEQS.get(key);
}

// J_k replaced by its integral, n by its value.
function expand(cfg, node, n) {
  const seq = seqOf(cfg);
  const p = cfg.param || 'n';
  let out = node;
  if (seq) {
    out = mapNode(out, (x) => {
      if (x.t !== 'sym' || !x.sub || !seq[x.name]) return x;
      const k = typeof x.sub === 'object' ? substVar(x.sub, p, lit(new Q(n ?? 0))) : parse(String(x.sub));
      return { t: 'paren', e: substVar(seq[x.name], p, k) };
    });
  }
  if (n !== undefined) out = substVar(out, p, lit(new Q(n)));
  return out;
}

// The value of a line: {q} exact, or {x} a float (NaN if unknown).
function valueOf(cfg, node, n) {
  const e = expand(cfg, node, n);
  if (!contains(e, (x) => x.t === 'int' || x.t === 'lim')) {
    const q = exactValue(e);
    if (q) return { q, x: q.valueOf() };
  }
  return { x: evalFloat(e, {}) };
}

const nsOf = (cfg) => {
  if (!cfg.param && !cfg.seq) return [undefined];
  const [a, b] = cfg.nRange || [1, 6];
  const out = [];
  for (let k = a; k <= b; k++) out.push(k);
  return out;
};

function compare(cfg, a, b) {
  for (const n of nsOf(cfg)) {
    const va = valueOf(cfg, a, n);
    const vb = valueOf(cfg, b, n);
    if (!Number.isFinite(vb.x)) return { equal: false, undefined: true, n };
    if (!Number.isFinite(va.x)) continue;
    const eq = va.q && vb.q ? va.q.eq(vb.q) : Math.abs(va.x - vb.x) <= 1e-7 * (1 + Math.abs(va.x) + Math.abs(vb.x));
    if (!eq) return { equal: false, n, values: [va.x, vb.x] };
  }
  return { equal: true };
}

export function sameValue(cfg, a, b) {
  try { return compare(cfg, a, b).equal; } catch { return false; }
}

export function isFinal(cfg, node) {
  if (cfg.param && symbolsIn(node).has(cfg.param)) return false;
  if (cfg.seq && contains(node, (x) => x.t === 'sym' && !!x.sub)) return false;
  return closedNumber(node);
}

export const start = (cfg) => cfg.start;

function read(cfg, input) {
  if (input && typeof input === 'object') return { node: input };
  const text = String(input ?? '').replace(/^\s*=/, '');
  let node;
  try { node = parse(text, parseOpts(cfg)); } catch (e) { return { error: { kind: 'parse', message: e.message } }; }
  const allowed = new Set([...(cfg.vars || []), ...(cfg.param ? [cfg.param] : []), ...Object.keys(cfg.seq || {}).map((k) => `${k}_`)]);
  const unknown = [...symbolsIn(node)].filter((s) => !allowed.has(s));
  if (unknown.length) return { error: { kind: 'parse', node, message: `Je ne connais pas la lettre « ${unknown[0].replace(/_$/, '')} » ici : la ligne doit être un nombre (les intégrales ont des bornes).` } };
  return { node };
}
export const parseLine = (cfg, text) => read(cfg, text).node ?? parse(text, parseOpts(cfg));

export function judgeLine(cfg, prev, input, state = {}) {
  const r = read(cfg, input);
  if (r.error) return r.error;
  const { node } = r;
  if (node.t === 'rel') return { kind: 'parse', node, message: 'Écris seulement l\'expression, sans « = » au milieu.' };
  if (sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  let c;
  try { c = compare(cfg, prev, node); } catch { c = { equal: false, undefined: true }; }
  if (!c.equal) {
    const diag = diagnoseLine('definite', prev, node, cfg, (cand, line) => sameValue(cfg, cand, line));
    const at = c.n !== undefined ? ` (pour n = ${c.n})` : '';
    const message = c.undefined
      ? `Je n'arrive pas à calculer la valeur de ta ligne${at} : une intégrale diverge ou une expression n'est pas définie.`
      : `Ta ligne vaut ${frNum(c.values[1], 4)}${at}, mais la ligne précédente vaut ${frNum(c.values[0], 4)}.`;
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais ${fin.charAt(0).toLowerCase()}${fin.slice(1)}` };
  state.lines = (state.lines || 0) + 1;
  return { kind: 'ok', node };
}

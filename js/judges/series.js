// Judge `series` (spec §5.2, step U2): développements limités. A line is
// right if its coefficients agree with those of the previous line up to
// the order both are known, and if it does not claim more than the
// previous line allows (a remainder x³·ε(x) hides what comes after x³).
// cfg: {v, at (number or text, default 0), order, dir?}
// Final form: a polynomial in h = v − at, by increasing powers, each power
// once with a computed coefficient, then the remainder hⁿ·ε(v) at the
// order asked (o(hⁿ) is read the same way).

import { Q } from '../math/rational.js';
import { parse } from '../cas/parse.js';
import { stripParen, dependsOn, numValue, contains } from '../cas/ast.js';
import { series, coefEqual } from '../cas/series.js';
import { exactValue } from '../cas/normal.js';
import { closedNumber } from '../cas/closedform.js';
import { toText } from '../cas/print.js';
import { diagnoseLine } from './diagnose.js';
import { readLine, sameLine } from './common.js';

export const sign = '=';
const MARGIN = 6;

export function atOf(cfg) {
  const a = cfg.at ?? 0;
  if (a === '+inf' || a === '-inf') return a;
  if (typeof a === 'number' || a instanceof Q) return a;
  const q = exactValue(parse(String(a)));
  return q ?? Number(a);
}
const dirOf = (cfg) => (cfg.dir === '+' ? 1 : cfg.dir === '-' ? -1 : 0);
const vOf = (cfg) => cfg.v || 'x';

// The series of a line, or null.
export function lineSeries(cfg, node) {
  try { return series(node, vOf(cfg), atOf(cfg), (cfg.order ?? 4) + MARGIN, { dir: dirOf(cfg) }); } catch { return null; }
}

const power = (k, cfg) => {
  const v = vOf(cfg);
  const a = atOf(cfg);
  const h = a === 0 || (a instanceof Q && a.n === 0) ? v : `(${v} − ${toText(parse(String(cfg.at)))})`;
  return k === 0 ? 'le terme constant' : k === 1 ? `le coefficient de ${h}` : `le coefficient de ${h}^${k}`;
};
const fmt = (c) => (c instanceof Q ? c.toString().replace('-', '−') : String(Math.round(c * 1e6) / 1e6).replace('.', ',').replace('-', '−'));

// The first exponent where two series differ, up to the order both know.
function firstDiff(a, b) {
  const n = Math.min(a.order, b.order);
  for (let k = Math.min(a.lo, b.lo); k <= n; k++) if (!coefEqual(a.coef(k), b.coef(k))) return k;
  return null;
}

export function agree(cfg, a, b) {
  const sa = lineSeries(cfg, a);
  const sb = lineSeries(cfg, b);
  return !!sa && !!sb && firstDiff(sa, sb) === null && sa.order === sb.order;
}

// ---------- final form ----------

function sumTerms(node, sign = 1, out = []) {
  node = stripParen(node);
  if (node.t === 'bin' && (node.op === '+' || node.op === '-')) {
    sumTerms(node.l, sign, out);
    sumTerms(node.r, node.op === '-' ? -sign : sign, out);
  } else if (node.t === 'neg') sumTerms(node.e, -sign, out);
  else out.push({ node, sign });
  return out;
}

// The degree of a power of h = v − at, or null.
function hDegree(f, cfg) {
  const v = vOf(cfg);
  const a = atOf(cfg);
  const isH = (n) => {
    n = stripParen(n);
    if (a === 0 || (a instanceof Q && a.n === 0)) return n.t === 'sym' && n.name === v && !n.sub;
    if (n.t !== 'bin' || n.op !== '-') return false;
    const l = stripParen(n.l);
    const r = exactValue(n.r);
    return l.t === 'sym' && l.name === v && !!r && (a instanceof Q ? r.eq(a) : Math.abs(r.valueOf() - a) < 1e-12);
  };
  f = stripParen(f);
  if (isH(f)) return 1;
  if (f.t === 'pow' && isH(f.b)) {
    const k = numValue(stripParen(f.e));
    return k && k.isInt() && k.n >= 2 ? k.n : null;
  }
  return null;
}

// One term c·hᵏ: {k, coef: node | null, rem} or null.
function termOf(t, cfg) {
  const v = vOf(cfg);
  const ups = [];
  const downs = [];
  const walk = (n, below) => {
    n = stripParen(n);
    if (n.t === 'bin' && n.op === '×') { walk(n.l, below); walk(n.r, below); return; }
    if (n.t === 'frac') { walk(n.n, below); walk(n.d, !below); return; }
    if (n.t === 'neg') { walk(n.e, below); return; }
    (below ? downs : ups).push(n);
  };
  walk(t, false);
  let k = 0;
  let rem = false;
  const coef = [];
  for (const f of ups) {
    if (f.t === 'eps') { rem = true; continue; }
    const d = hDegree(f, cfg);
    if (d !== null) { k += d; continue; }
    if (dependsOn(f, v)) return null;
    coef.push(f);
  }
  for (const f of downs) if (dependsOn(f, v) || contains(f, (x) => x.t === 'eps')) return null;
  return { k, rem, coefFactors: coef, downs };
}

export function dlForm(cfg, node) {
  const ts = sumTerms(node);
  const seen = [];
  let remAt = -1;
  for (let i = 0; i < ts.length; i++) {
    const t = termOf(ts[i].node, cfg);
    if (!t) return false;
    if (t.rem) { if (remAt >= 0) return 'Un seul reste suffit.'; remAt = i; continue; }
    // Like terms or a coefficient still to compute: a line on the way.
    if (seen.includes(t.k)) return false;
    if (seen.length && t.k < seen[seen.length - 1]) return 'Range les termes par puissances croissantes.';
    seen.push(t.k);
    // The coefficient must be computed: 1/2 − 1/6 is not yet 1/3.
    const factors = [...t.coefFactors, ...t.downs];
    const nums = factors.filter((f) => numValue(stripParen(f)) !== null).length;
    if (factors.some((f) => stripParen(f).t === 'bin' && ['+', '-'].includes(stripParen(f).op))) {
      const sum = factors.find((f) => stripParen(f).t === 'bin' && ['+', '-'].includes(stripParen(f).op));
      if (closedNumber(sum) !== true || exactValue(sum)) return false;
    }
    if (nums > 2) return false;
  }
  if (remAt < 0) return false;
  if (remAt !== ts.length - 1) return 'Mets le reste à la fin.';
  return true;
}

export function isFinal(cfg, node, s = lineSeries(cfg, node)) {
  const form = dlForm(cfg, node);
  if (form !== true) return form;
  if (!s) return false;
  const want = cfg.order ?? 4;
  if (s.order < want) return `ce développement s'arrête à l'ordre ${s.order} : il faut aller jusqu'à l'ordre ${want}.`;
  if (s.order > want) return `tronque à l'ordre ${want} : garde les termes jusqu'à la puissance ${want}, puis le reste.`;
  return true;
}

export const start = (cfg) => cfg.start;

export function judgeLine(cfg, prev, input, state = {}) {
  const read = readLine({ ...cfg, vars: cfg.vars || [vOf(cfg)] }, input);
  if (read.error) return read.error;
  const { node } = read;
  if (node.t === 'rel') return { kind: 'parse', node, message: 'Écris seulement le développement, sans « = » au milieu.' };
  if (sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  const a = lineSeries(cfg, prev);
  const b = lineSeries(cfg, node);
  if (!b) return { kind: 'wrong', node, rule: null, message: `Je n'arrive pas à développer ta ligne autour de ${vOf(cfg)} = ${cfg.at ?? 0} : vérifie-la.` };
  if (a) {
    const k = firstDiff(a, b);
    if (k !== null) {
      const diag = diagnoseLine('series', prev, node, cfg, (cand, line) => agree(cfg, cand, line));
      return {
        kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag,
        message: `${power(k, cfg).replace(/^./, (c) => c.toUpperCase())} ne va pas : ta ligne donne ${fmt(b.coef(k))}, la ligne précédente ${fmt(a.coef(k))}.`,
      };
    }
    if (b.order > a.order) {
      if (!b.remainder) return { kind: 'stay', node, message: `C'est juste jusqu'à l'ordre ${a.order}, mais n'oublie pas le reste : la ligne précédente n'est connue qu'à l'ordre ${a.order}.` };
      const diag = diagnoseLine('series', prev, node, cfg, (cand, line) => agree(cfg, cand, line));
      return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: `Ta ligne va jusqu'à l'ordre ${b.order}, mais la ligne précédente n'est connue que jusqu'à l'ordre ${a.order} : son reste cache les termes suivants.` };
    }
  }
  const fin = isFinal(cfg, node, b);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais ${fin.charAt(0).toLowerCase()}${fin.slice(1)}` };
  state.lines = (state.lines || 0) + 1;
  return { kind: 'ok', node };
}

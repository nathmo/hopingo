// Judge `lapres` (step U10, module F, part c): the residue of F(z)·e^(zt)
// at a pole z₀, a function of t (the inverse Laplace transform by the
// residues, f-lap-inv-res and f-lap-problem). A line is right if each of
// its members has the value of the residue at 6 values of t; a member that
// still holds z is read « at z = z₀ » (its d(…, z) taken first): so
// d((z² + 4z + 5)e^(zt)/(z + 2), z) is the formula of a double pole, and
// e^(zt)/(z²(z − 1 + i)) the one of a simple pole.
//
// cfg: {kind: 'lapres', value: text in t (the residue, i allowed),
//       z0: text (the pole, in ℚ(i)), v?: 't', s?: 'z', traps?: {id: [texts]}}
// Lines: [Res… =] member [= member …]; a first member « Res… » is a label.
// The start of a part is shown as it is (a label such as « Res(−1) »).
// Final: the last member has neither z nor d(…).
// Traps (judges: ['lapres']) receive prev and ctx.cfg; their candidates
// are texts or CAS nodes, compared by value.

import { parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { symbolsIn, contains } from '../cas/ast.js';
import { expandDerivs } from '../cas/diff.js';
import { evalComplex, cabs } from '../cas/complex.js';
import { diagnoseLine } from './diagnose.js';
import { t } from '../i18n.js';

export const sign = '=';

const vOf = (cfg) => cfg.v || 't';
const sOf = (cfg) => cfg.s || 'z';
const popts = (cfg) => ({ vars: [vOf(cfg), sOf(cfg)], complex: true, dvar: sOf(cfg) });
const T_POINTS = [0.23, 0.61, 1.07, 1.52, 1.98, 2.47];

// Top-level « = » splits.
function splitTop(text) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const c of text) {
    if ('([{'.includes(c)) depth++;
    if (')]}'.includes(c)) depth--;
    if (depth === 0 && c === '=') { out.push(cur); cur = ''; continue; }
    cur += c;
  }
  out.push(cur);
  return out.map((p) => p.trim());
}

function readStrict(cfg, input) {
  const text = String(input).trim().replace(/^=\s*/, '');
  let parts = splitTop(text);
  if (parts.some((p) => !p)) throw new Error(t('Un membre de ta ligne est vide.'));
  if (parts.length > 1 && /^Res/.test(parts[0])) parts = parts.slice(1);
  const members = parts.map((p) => parse(p, popts(cfg)));
  return { t: 'rline', text, members };
}

export function parseLine(cfg, text) {
  if (text && typeof text === 'object') return text;
  try { return readStrict(cfg, text); } catch { return { t: 'rline', text: String(text).trim(), members: [], raw: true }; }
}

const strip = (ml) => ml.replace(/^<math[^>]*>|<\/math>$/g, '');
export function show(cfg, node, { display } = {}) {
  const alt = node.text.replace(/"/g, '&quot;');
  if (node.raw || !node.members.length) return `<math${display ? ' display="block"' : ''} alttext="${alt}"><mtext>${node.text}</mtext></math>`;
  const body = node.members.map((m) => strip(toMathML(m, { dvar: sOf(cfg) }))).join('<mo>=</mo>');
  return `<math${display ? ' display="block"' : ''} alttext="${alt}"><mrow>${body}</mrow></math>`;
}
export const text = (cfg, node) => node.text;
export const start = (cfg) => cfg.start;

// ---------- values ----------

const REF = new Map();
const z0Of = (cfg) => evalComplex(parse(String(cfg.z0), { complex: true }), {});

function refValues(cfg) {
  const key = `${cfg.value}|${cfg.z0}`;
  if (!REF.has(key)) REF.set(key, valuesOf(cfg, parse(String(cfg.value), popts(cfg))));
  return REF.get(key);
}

// The values of a member at the points of t (null where undefined).
export function valuesOf(cfg, node) {
  const s = sOf(cfg);
  const n = contains(node, (x) => x.t === 'deriv') ? expandDerivs(node) : node;
  const env0 = symbolsIn(n).has(s) ? { [s]: z0Of(cfg) } : {};
  return T_POINTS.map((tt) => {
    const v = evalComplex(n, { ...env0, [vOf(cfg)]: tt });
    return v && Number.isFinite(v.re) && Number.isFinite(v.im) ? v : null;
  });
}

const close = (a, b) => !!a && !!b && cabs({ re: a.re - b.re, im: a.im - b.im }) <= 1e-8 * (1 + cabs(a) + cabs(b));
const sameValues = (A, B) => A.every((a, k) => close(a, B[k]));

function sameAsCandidate(cfg, cand, node) {
  let c = cand;
  if (typeof c === 'string') c = parseLine(cfg, c);
  const m = c?.t === 'rline' ? c.members.at(-1) : c;
  const last = node.members.at(-1);
  if (!m || !last) return false;
  return sameValues(valuesOf(cfg, m), valuesOf(cfg, last));
}

export function isFinal(cfg, node) {
  const last = node.members?.at(-1);
  if (!last) return false;
  return !symbolsIn(last).has(sOf(cfg)) && !contains(last, (x) => x.t === 'deriv');
}

export function judgeLine(cfg, prev, input, state = {}) {
  let node;
  if (input && typeof input === 'object' && input.t === 'rline') node = input;
  else {
    try { node = readStrict(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  const allowed = new Set([vOf(cfg), sOf(cfg)]);
  for (const m of node.members) {
    const extra = [...symbolsIn(m)].find((x) => !allowed.has(x));
    if (extra) return { kind: 'parse', node, message: t('Je ne connais pas la lettre « {a} » ici : le résidu est une fonction de {b}.', { a: extra.replace(/_$/, ''), b: vOf(cfg) }) };
  }
  if (prev?.text && node.text === prev.text) return { kind: 'same', node, message: t('Avance d\'au moins une étape.') };
  const want = refValues(cfg);
  for (const m of node.members) {
    const got = valuesOf(cfg, m);
    if (got.some((x) => !x)) return { kind: 'stay', node, message: t('Ta ligne n\'est pas définie en {a} = {b} : simplifie d\'abord par le facteur du pôle.', { a: sOf(cfg), b: String(cfg.z0).replace(/-/g, '−') }) };
    if (!sameValues(got, want)) {
      const diag = diagnoseLine('lapres', prev, node, cfg, (cand, n) => sameAsCandidate(cfg, cand, n));
      const tt = T_POINTS[got.findIndex((x, k) => !close(x, want[k]))];
      return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: t('Ce n\'est pas le résidu : en {a} = {b}, les valeurs diffèrent.', { a: vOf(cfg), b: String(tt).replace('.', ',') }) };
    }
  }
  if (isFinal(cfg, node)) return { kind: 'done', node };
  state.lines = (state.lines || 0) + 1;
  return { kind: 'ok', node };
}

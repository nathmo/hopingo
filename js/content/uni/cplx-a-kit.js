// Helpers of module C, part a (unit `cplx`, step U10): judge
// configurations (cvalue and cfamily of js/judges/cplx-ca.js, equiv in x
// and y, antideriv with grad, param), texts of exact complex numbers and
// of multiples of π, MathML with i the imaginary unit, items made of parts
// (partsItem of geo-kit.js), multiple choice with distinct options
// (single, or several right ones with opts.multi), problems.

import { Q } from '../../math/rational.js';
import { CQ } from '../../cas/complex.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { MT, mcq, examTag, answerItem } from './kit.js';
import { partsItem, H, modeOf } from './geo-kit.js';
import { problemItem, asProblem } from './kit-problem.js';

export { MT, mcq, examTag, answerItem, partsItem, H, modeOf, problemItem, asProblem };

export const LETTERS = ['z', 'w', 't', 'x', 'y', 'n', 'k', 'C', 'u', 'v', 'h', 'R'];
export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const cq = (a, b = 0) => new CQ(q(a), q(b));
// MathML of a text (i the imaginary unit).
// conj(z) is shown z̄.
const ZBAR = '<mi>conj</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mi>z</mi><mo stretchy="false">)</mo></mrow>';
export const M = (text, display = false) => MT(text, { complex: true, vars: LETTERS }, display)
  .split(ZBAR).join('<mover accent="true"><mi>z</mi><mo>¯</mo></mover>').replace(/conj\(z\)/g, 'z̄');
// Readable text: − for -, spaces around + and − between terms.
export const rd = (t) => String(t).replace(/-/g, '−');
export const zt = (z) => toText(z.toNode());
export const canon = (text) => toText(parse(text, { complex: true, vars: LETTERS }));

// tπ as text: π/3, -3π/4, π, 0.
export function piT(t) {
  const x = q(t);
  if (x.n === 0) return '0';
  const a = Math.abs(x.n);
  return `${x.n < 0 ? '-' : ''}${a === 1 ? '' : a}π${x.d === 1 ? '' : `/${x.d}`}`;
}
// i·tπ as a term: (3π/4)i, πi, (π/2)i with its sign.
export function piIT(t) {
  const x = q(t);
  if (x.n === 0) return '0';
  const a = x.n < 0 ? x.neg() : x;
  const body = a.eq(1) ? 'πi' : a.d === 1 ? `${a.n}πi` : `(${piT(a)})i`;
  return `${x.n < 0 ? '-' : ''}${body}`;
}
// Terms joined into a sum, empty ones and zeros skipped.
export const joinT = (ts) => ts.filter((t) => t && t !== '0').reduce((s, t) => (s ? (t.startsWith('-') ? `${s}${t}` : `${s}+${t}`) : t), '') || '0';
// c·body: '', 'x', '-x', '3x', '(3/2)x'.
export function term(c, body) {
  const C = q(c);
  if (C.n === 0) return '';
  if (!body) return String(C);
  if (C.eq(1)) return body;
  if (C.eq(-1)) return `-${body}`;
  if (C.d === 1) return `${C.n}${body}`;
  return `${C.n < 0 ? '-' : ''}(${Math.abs(C.n)}/${C.d})${body}`;
}
export const fac = (c) => { const C = q(c); if (C.eq(1)) return ''; if (C.eq(-1)) return '-'; return C.d === 1 ? String(C.n) : `(${C})`; };
// A number in brackets when needed in a product: 3, (−1/2), (1+i).
export const par = (t) => (/^[\d.]+$/.test(t) || /^[a-zπ]$/.test(t) ? t : `(${t})`);

// ---------- judges ----------

export const CV = (extra = {}) => ({ kind: 'cvalue', complex: true, vars: [], ...extra });
export const CF = (extra = {}) => ({ kind: 'cfamily', complex: true, vars: ['z', 'w', 'k'], ...extra });
export const SETW = { kind: 'complex', complex: true, form: 'set', unknown: 'w' };
export const SETZ = { kind: 'complex', complex: true, form: 'set' };
export const EQXY = (target = 'no-prime') => ({ kind: 'equiv', vars: ['x', 'y'], target, domain: { x: [-2, 2], y: [-2, 2] } });

export const KEYS = ['calc', 'cplx', 'calcfn'];
export const KEYS_XY = ['calc', 'cplx', 'calcfn', 'a2'];
export const KEYS_SUM = ['calc', 'cplx', 'calcfn', 'seq', 'anal'];

// ---------- items ----------

// A lines item made of parts (geo-kit's partsItem), with the module's keys.
export const linesOf = (o) => partsItem({ keys: KEYS, ...o });

// A multiple choice: right (html), wrongs [{html, rule}], fillers; four
// distinct options. With multi: options [{html, correct, rule?}], at
// least one right, all kept.
export function choice(o, rng) {
  if (o.multi) {
    const seen = new Set();
    const options = o.options.filter((x) => (seen.has(x.html) ? false : seen.add(x.html)));
    return mcq({ ...o, options, multi: true }, rng);
  }
  const options = [{ html: o.right, correct: true }];
  for (const w of [...(o.wrongs || []), ...(o.fillers || [])]) {
    if (options.length >= (o.count || 4)) break;
    if (!w || w.html === undefined || options.some((x) => x.html === w.html)) continue;
    options.push({ html: w.html, correct: false, rule: w.rule ?? null });
  }
  return mcq({ ...o, options }, rng);
}
export const opt = (text, rule = null) => ({ html: M(text), rule });

// k distinct elements of a list, in a random order.
export function pickK(rng, list, k) {
  const pool = [...list];
  const out = [];
  while (out.length < k && pool.length) out.push(pool.splice(rng.int(0, pool.length - 1), 1)[0]);
  return out;
}

// Statements for a multiple choice with several answers (opts.multi):
// 4 or 5 among the list, at least one true and one false.
export function multiOf(rng, list, k = 5) {
  for (let i = 0; i < 50; i++) {
    const s = pickK(rng, list, k);
    if (s.some((x) => x.truth) && s.some((x) => !x.truth)) return s;
  }
  return list.slice(0, k);
}

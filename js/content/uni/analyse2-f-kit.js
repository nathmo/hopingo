// Helpers of module A2, part f (step U6): exact values written as sums of
// q·atom (e, e², π, ln 2…), multiple choices with options distinct in
// value, Vrai/Faux as a two-option multiple choice, letters x ↔ y swapped,
// small texts (linear forms, bounds, regions).

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { evalFloat } from '../../cas/numeric.js';
import { toReadable } from '../../cas/print.js';
import { mcq } from './kit.js';
import { t } from '../../i18n.js';

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));

// ---------- exact values: [[Q, atom]], atom '' = 1 ----------
export const ATOMS = { '': 1, e: Math.E, 'e^2': Math.E ** 2, 'e^4': Math.E ** 4, π: Math.PI, 'ln(2)': Math.LN2, 'ln(3)': Math.log(3), 'ln(5)': Math.log(5) };
export const val = (...terms) => terms.map(([c, a = '']) => [q(c), a]);
export const vRat = (c) => val([c]);
// Merged and without zero terms.
export function vNorm(V) {
  const m = new Map();
  for (const [c, a] of V) m.set(a, (m.get(a) || q(0)).add(c));
  return [...m].filter(([, c]) => c.n !== 0).map(([a, c]) => [c, a]);
}
export const vScale = (V, k) => vNorm(V.map(([c, a]) => [c.mul(q(k)), a]));
export const vAdd = (A, B) => vNorm([...A, ...B]);
export const vRatOf = (V) => { const n = vNorm(V); return n.length === 0 ? q(0) : n.length === 1 && n[0][1] === '' ? n[0][0] : null; };
// A product: one of the two must be rational.
export function vMul(A, B) {
  const ra = vRatOf(A);
  const rb = vRatOf(B);
  if (ra) return vScale(B, ra);
  if (rb) return vScale(A, rb);
  return null;
}
export const vFloat = (V) => V.reduce((s, [c, a]) => s + c.valueOf() * ATOMS[a], 0);
// 3e/2 − 3/2, π/8, 15ln(3)/4, −1/2 (a closed number for the definite judge).
export function vText(V) {
  const n = vNorm(V);
  if (!n.length) return '0';
  // Atoms first, the rational term last.
  n.sort((x, y) => (x[1] === '' ? 1 : 0) - (y[1] === '' ? 1 : 0));
  return n.map(([c, a], i) => {
    const s = c.n < 0 ? '-' : i ? '+' : '';
    const N = Math.abs(c.n);
    const top = a === '' ? String(N) : N === 1 ? a : `${N}${a}`;
    return `${s}${top}${c.d === 1 ? '' : `/${c.d}`}`;
  }).join('');
}

// ---------- texts ----------
// The letters x and y swapped (texts without other x or y).
export const swapXY = (s) => String(s).replace(/[xy]/g, (c) => (c === 'x' ? 'y' : 'x')).replace(/(^|[^\w^])y x(?![\w^])/g, '$1x y').replace(/y\^2\+x\^2/g, 'x^2+y^2');
// a·x + b·y + c as text: 2x-y+1, x, -y.
export function linT(terms) {
  let out = '';
  for (const [c0, v] of terms) {
    const c = q(c0);
    if (c.n === 0) continue;
    const abs = c.n < 0 ? c.neg() : c;
    const body = v ? (abs.eq(1) ? v : abs.d === 1 ? `${abs.n}${v}` : `${abs.n === 1 ? '' : abs.n}${v}/${abs.d}`) : String(abs);
    out += c.n < 0 ? `-${body}` : out ? `+${body}` : body;
  }
  return out || '0';
}
export const R = (s) => toReadable(parse(s));
export const num = (s) => evalFloat(parse(String(s)), {});
// A bound as text for an interval written in the prompt: π/2, ln 2, √π.
export const bT = (s) => R(String(s));

// ---------- multiple choices ----------
// Options distinct in value (1e−6 relative, values by quadrature) and in
// writing; the right one first. right: {html, x}, wrongs: [{html, x, rule?}];
// x null: an option that is not a number (an outer bound with a letter).
export function mcqV(o, rng) {
  const options = [{ html: o.right.html, correct: true, x: o.right.x }];
  const close = (a, b) => a !== null && b !== null && Math.abs(a - b) <= 1e-6 * (1 + Math.abs(a));
  for (const w of o.wrongs) {
    if (options.length >= 4) break;
    if (!w || (w.x !== null && !Number.isFinite(w.x))) continue;
    if (options.some((p) => p.html === w.html || close(p.x, w.x))) continue;
    options.push({ html: w.html, correct: false, rule: w.rule ?? null, x: w.x });
  }
  if (options.length < 4) return null;
  return mcq({ ...o, options: options.map(({ x, ...rest }) => rest) }, rng);
}

// Vrai / Faux as a two-option multiple choice (the counter-example of a
// false statement is a map or a domain: no checker of part f fits).
export function vfMcq(o, rng) {
  const { skill, statement, truth, key, why, ruleIfTrue = null, ruleIfFalse = null, level = 4, exam = { format: 'tf', points: 1 } } = o;
  return mcq({
    skill, level, prompt: t('Vrai ou faux ?<br>« {statement} »', { statement }), keepOrder: true,
    options: [{ html: t('Vrai'), correct: truth, rule: truth ? null : ruleIfTrue }, { html: t('Faux'), correct: !truth, rule: truth ? ruleIfFalse : null }],
    key: `${skill}:tf:${key}`, solution: [{ html: why, note: '' }], expectedSec: 60, exam,
  }, rng);
}

// rng.pick with weights: [[w, x], …]
export function pickW(rng, list) {
  const W = list.reduce((s, [w]) => s + w, 0);
  let r = rng.next() * W;
  for (const [w, x] of list) { r -= w; if (r < 0) return x; }
  return list[list.length - 1][1];
}

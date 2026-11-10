// Tools of module A2, part b (step U6): limits in two variables, partial and
// directional derivatives by the definition, differentiability. Numbers
// q·√s (unit vectors (1/2 ; √3/2), values like √3/8), homogeneous
// polynomials written in x, y or in polar coordinates, substitutions done
// by the CAS (f(x, mx), f(r cos φ, r sin φ), f(tv)), decisions and notes.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText, toReadable } from '../../cas/print.js';
import { mapNode, stripParen } from '../../cas/ast.js';
import { MT } from './kit.js';

export { assemble, fitLines } from './analyse1-c-kit.js';
export { MT, linesItem, mcq, tfItem, examTag, A2_KEYS } from './a2-kit.js';
export { H, E, modeOf, blanked, fr, sup } from './a2-kit.js';
export { problemItem, asProblem } from './kit-problem.js';
export { blocksItem } from './kit.js';

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const PV = ['r', 'φ'];
export const XY = ['x', 'y'];

// ---------- numbers q·√s ----------

function squareFree(n) {
  let k = 1;
  let s = n;
  for (let p = 2; p * p <= s; p++) while (s % (p * p) === 0) { s /= p * p; k *= p; }
  return { k, s };
}

// q·√s, s square-free (1 for a rational number).
export class QS {
  constructor(qv, s = 1) {
    const { k, s: t } = squareFree(s);
    this.q = q(qv).mul(k);
    this.s = this.q.n === 0 ? 1 : t;
  }
  static of(x) { return x instanceof QS ? x : new QS(q(x), 1); }
  mul(o) { o = QS.of(o); return new QS(this.q.mul(o.q), this.s * o.s); }
  div(o) { o = QS.of(o); return new QS(this.q.div(o.q).div(o.s), this.s * o.s); }
  pow(k) { let r = QS.of(1); for (let i = 0; i < k; i++) r = r.mul(this); return r; }
  neg() { return new QS(this.q.neg(), this.s); }
  abs() { return new QS(this.q.n < 0 ? this.q.neg() : this.q, this.s); }
  isZero() { return this.q.n === 0; }
  isRational() { return this.s === 1; }
  valueOf() { return this.q.valueOf() * Math.sqrt(this.s); }
  eq(o) { o = QS.of(o); return this.s === o.s && this.q.eq(o.q); }
  // Text the CAS reads: 3/8, -√2/4, 3√3/8.
  text() {
    if (this.s === 1) return this.q.toString();
    const n = Math.abs(this.q.n);
    const top = `${n === 1 ? '' : n}√${this.s}`;
    return `${this.q.n < 0 ? '-' : ''}${this.q.d === 1 ? top : `${top}/${this.q.d}`}`;
  }
  // Inside a product: in brackets when negative or a fraction.
  fac() { const t = this.text(); return /^\d+$/.test(t) || /^\d*√\d+$/.test(t) ? t : `(${t})`; }
}
// Sum of two numbers q·√s with the same root (or one of them 0).
export function qsAdd(a, b) {
  if (a.isZero()) return b;
  if (b.isZero()) return a;
  if (a.s !== b.s) return null;
  return new QS(a.q.add(b.q), a.s);
}

// The nice unit vectors of the catalogue: (3/5, 4/5), (1/2, √3/2), (1/√2, 1/√2)…
export const UNIT_VECTORS = [
  { v: [new QS(q(3, 5)), new QS(q(4, 5))], text: '(3/5 ; 4/5)' },
  { v: [new QS(q(4, 5)), new QS(q(-3, 5))], text: '(4/5 ; −3/5)' },
  { v: [new QS(q(-3, 5)), new QS(q(4, 5))], text: '(−3/5 ; 4/5)' },
  { v: [new QS(q(4, 5)), new QS(q(3, 5))], text: '(4/5 ; 3/5)' },
  { v: [new QS(q(1, 2)), new QS(q(1, 2), 3)], text: '(1/2 ; √3/2)' },
  { v: [new QS(q(1, 2), 3), new QS(q(1, 2))], text: '(√3/2 ; 1/2)' },
  { v: [new QS(q(1, 2), 2), new QS(q(1, 2), 2)], text: '(1/√2 ; 1/√2)' },
  { v: [new QS(q(-1, 2), 2), new QS(q(1, 2), 2)], text: '(−1/√2 ; 1/√2)' },
];
export const E1 = { v: [QS.of(1), QS.of(0)], text: '(1 ; 0)', axis: 'x' };
export const E2 = { v: [QS.of(0), QS.of(1)], text: '(0 ; 1)', axis: 'y' };

// ---------- monomials and polynomials ----------

const pw = (base, k) => (k === 0 ? '' : k === 1 ? base : `${base}^${k}`);
// c·base: 3x^2y, -x, (1/2)xy (c a Q or a whole number; body '' gives c).
export function coefText(c, body) {
  const C = q(c);
  if (!body) return C.toString();
  if (C.eq(1)) return body;
  if (C.eq(-1)) return `-${body}`;
  if (C.d === 1) return `${C.n}${body}`;
  return `${C.n < 0 ? '-' : ''}(${Math.abs(C.n)}/${C.d})${body}`;
}
export const joinSum = (terms) => terms.filter((t) => t && t !== '0').reduce((s, t) => (s ? (t.startsWith('-') ? `${s}${t}` : `${s}+${t}`) : t), '') || '0';

// terms: [[c, i, j]] → c·x^i·y^j summed (in the letters a, b).
export const polyXY = (terms, a = 'x', b = 'y') => joinSum(terms.map(([c, i, j]) => coefText(c, `${pw(a, i)}${pw(b, j)}`)));
// The same in polar form: c·cos(φ)^i·sin(φ)^j.
export const polyTrig = (terms) => joinSum(terms.map(([c, i, j]) => coefText(c, `${pw('cos(φ)', i)}${pw('sin(φ)', j)}`)));
// Σ|c|.
export const absSum = (terms) => terms.reduce((s, [c]) => s.add(q(c).n < 0 ? q(c).neg() : q(c)), q(0));
// The value of Σ c·v1^i·v2^j at a vector of QS numbers (null if roots mix).
export function polyAt(terms, [v1, v2]) {
  let s = QS.of(0);
  for (const [c, i, j] of terms) {
    const t = v1.pow(i).mul(v2.pow(j)).mul(QS.of(q(c)));
    s = qsAdd(s, t);
    if (!s) return null;
  }
  return s;
}

// ---------- substitutions by the CAS ----------

// text with each letter of `map` replaced by (its text), written back.
export function subst(text, map, vars = Object.keys(map)) {
  const opts = { vars: [...new Set([...vars, ...Object.keys(map), 'r', 'φ', 't', 'm', 'h', 'k'])] };
  const reps = Object.fromEntries(Object.entries(map).map(([k, v]) => [k, { t: 'paren', e: parse(v, opts) }]));
  const node = mapNode(parse(text, opts), (n) => (n.t === 'sym' && !n.sub && reps[n.name] ? reps[n.name] : n));
  return toText(node);
}
export const toPolar = (text) => subst(text, { x: 'r cos(φ)', y: 'r sin(φ)' });

// ---------- lines ----------

export const NOTE = (html) => ({ kind: 'note', html });
export const DEC = (prompt, options, rng) => ({ kind: 'decision', prompt, options: rng ? rng.shuffle(options) : options });
// MathML of a formula in x, y (or other letters).
export const M = (text, vars = ['x', 'y', 'r', 'φ', 't', 'm', 'h', 'k']) => MT(text, { vars });
// A short French number: −3/4.
export const fq = (x) => String(x instanceof QS ? x.text() : q(x).toString()).replace(/-/g, '−');
// Options of a multiple choice without duplicates (same html), at most n.
export function distinct(options, n = 4) {
  const out = [];
  for (const o of options) {
    if (!o || out.some((x) => x.html === o.html)) continue;
    if (out.length >= n) break;
    out.push(o);
  }
  return out;
}


// A formula as plain text, for decision labels (they are not HTML).
export const RD = (text, vars = ['x', 'y', 'r', 'φ', 't', 'm', 'h', 'k']) => toReadable(stripParen(parse(text, { vars })));

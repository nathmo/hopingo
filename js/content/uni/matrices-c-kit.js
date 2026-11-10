// Tools of module M, part c (power method, low rank, norms, condition
// number, Gershgorin; step U8): exact square roots as the judge `value`
// writes them, small matrices with nice spectra found by enumeration, and
// the text and MathML helpers shared by the generators of the part.

import { Q } from '../../math/rational.js';
import * as MX from '../../cas/matrix.js';
import * as LF from '../../cas/linalg-float.js';
import { parse } from '../../cas/parse.js';
import { blankLine } from '../../judges/lines.js';
import { MT } from './kit.js';
import { q, qt, mt, vt, MLm, ML, sub } from './alglin-kit.js';

export { q, qt, mt, vt, MLm, ML, sub, MX, LF };

// The screen's minus sign.
export const R = (s) => String(s).replace(/-/g, '−');
export const fq = (x) => R(qt(x));
export const vR = (v) => R(vt(v));

// Integer square root, or null.
export const isqrt = (n) => { if (n < 0) return null; const r = Math.round(Math.sqrt(n)); return r * r === n ? r : null; };

// √r for a rational r ≥ 0, as the judge `value` (form 'exact') ends it:
// 3√5, 3√2/2, √5/5, 7.
export function rad(r0) {
  const r = q(r0);
  if (r.n === 0) return '0';
  // √(n/d) = √(n·d)/d
  let m = r.n * r.d;
  let out = 1;
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; out *= f; }
  const c = new Q(out, r.d);
  if (m === 1) return qt(c);
  const top = c.n === 1 ? `√${m}` : `${c.n}√${m}`;
  return c.d === 1 ? top : `${top}/${c.d}`;
}
// The same, readable.
export const radR = (r) => R(rad(r));
export const MR = (text) => MT(text);
// A number as a CAS node (exact text, else a float node).
export const numNode = (x) => (typeof x === 'number' ? { t: 'float', x } : parse(String(x)));

// One guided line of the judge value: the whole answer is a blank.
export function blankAll(math) {
  const node = parse(math);
  return blankLine(node, [node]);
}
// A guided line with the numbers listed as blanks (texts of numbers).
export function blanksOf(math, which) {
  const node = parse(math);
  const holes = [];
  const want = [...which];
  const walk = (n) => {
    if (!n || typeof n !== 'object') return;
    if (n.t === 'num' && want.length && String(n.v) === want[0]) { holes.push(n); want.shift(); return; }
    for (const k of ['e', 'l', 'r', 'n', 'd', 'b']) if (n[k] && typeof n[k] === 'object') walk(n[k]);
    for (const k of ['args', 'terms', 'items']) if (Array.isArray(n[k])) n[k].forEach(walk);
  };
  walk(node);
  return holes.length ? blankLine(node, holes) : blankAll(math);
}

// Menus of the « choose the action » mode: one valid action.
export function menuOf(items, active) {
  return items.map((o) => ({ id: o.id, label: o.label, valid: o.id === active, why: o.id === active ? undefined : o.why || 'Pas maintenant : ce n\'est pas l\'étape suivante.' }));
}

export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];

// ---------- matrices found by enumeration (once) ----------

// Symmetric [[a, b], [b, d]] (b ≠ 0) with whole eigenvalues l1 > l2.
let SYM2 = null;
export function sym2List() {
  if (SYM2) return SYM2;
  SYM2 = [];
  for (let a = -6; a <= 9; a++) for (let d = -6; d <= 9; d++) for (let b = -4; b <= 4; b++) {
    if (!b) continue;
    const disc = (a - d) ** 2 + 4 * b * b;
    const s = isqrt(disc);
    if (s === null || (a + d + s) % 2) continue;
    SYM2.push({ A: [[a, b], [b, d]], l1: (a + d + s) / 2, l2: (a + d - s) / 2 });
  }
  return SYM2;
}

// Any [[a, b], [c, d]] with AᵀA of whole eigenvalues (σ² whole), not
// symmetric, invertible.
let NS2 = null;
export function ns2List() {
  if (NS2) return NS2;
  NS2 = [];
  for (let a = -5; a <= 5; a++) for (let b = -5; b <= 5; b++) for (let c = -5; c <= 5; c++) for (let d = -5; d <= 5; d++) {
    if (b === c) continue;
    const det = a * d - b * c;
    if (!det) continue;
    const p = a * a + c * c;
    const r = b * b + d * d;
    const s = a * b + c * d;
    const disc = (p - r) ** 2 + 4 * s * s;
    const sq = isqrt(disc);
    if (sq === null || (p + r + sq) % 2) continue;
    NS2.push({ A: [[a, b], [c, d]], s1: (p + r + sq) / 2, s2: (p + r - sq) / 2, det });
  }
  return NS2;
}

// The eigenvalues of a 2 × 2 (floats, by modulus decreasing) and whether real.
export function eig2(A) {
  const [[a, b], [c, d]] = A;
  const tr = a + d;
  const det = a * d - b * c;
  const disc = tr * tr - 4 * det;
  if (disc < 0) return { real: false, mods: [Math.sqrt(det), Math.sqrt(det)] };
  const s = Math.sqrt(disc);
  const ls = [(tr + s) / 2, (tr - s) / 2].sort((x, y) => Math.abs(y) - Math.abs(x));
  return { real: true, ls, mods: ls.map(Math.abs), whole: Number.isInteger(s) && (tr + s) % 2 === 0 };
}

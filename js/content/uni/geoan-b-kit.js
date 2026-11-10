// Tools of module G4, part b (step U5): whole vectors of space with a whole
// norm, vectors orthogonal to a given one, texts of cross and dot products,
// and blanks searched from the end of a line.

import { tokenize } from '../../cas/parse.js';
import { q, qt, nz, cross, dot, norm2, isZero, prim, vt } from './geo-kit.js';

// Whole vectors with a whole norm (primitive), turned by permutations and signs.
const NICE = [[1, 2, 2], [2, 3, 6], [0, 3, 4], [1, 4, 8], [2, 6, 9], [4, 4, 7], [2, 2, 1], [0, 0, 1], [3, 4, 12], [2, 10, 11], [6, 6, 7]];
const PERMS = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];

export function niceVec(rng, { maxNorm = 9, minNorm = 3 } = {}) {
  for (let t = 0; t < 50; t++) {
    const b = rng.pick(NICE);
    const n = Math.round(Math.sqrt(b[0] ** 2 + b[1] ** 2 + b[2] ** 2));
    if (n > maxNorm || n < minNorm) continue;
    const p = rng.pick(PERMS);
    return p.map((i) => q(b[i] * (rng.chance(0.5) ? -1 : 1)));
  }
  return [q(1), q(2), q(2)];
}
export const normI = (v) => Math.round(Math.sqrt(norm2(v).valueOf()));
export const randVec = (rng, lo, hi) => [0, 1, 2].map(() => q(rng.int(lo, hi)));

// A small whole vector orthogonal to n (nonzero), not colinear with `avoid`.
export function orthTo(rng, n, { lo = -3, hi = 3, avoid = null } = {}) {
  for (let t = 0; t < 300; t++) {
    const u = randVec(rng, lo, hi);
    if (isZero(u) || dot(u, n).n !== 0) continue;
    if (avoid && isZero(cross(u, avoid))) continue;
    return prim(u);
  }
  // n ∧ eᵢ is always orthogonal to n.
  const e = [[1, 0, 0], [0, 1, 0], [0, 0, 1]].map((r) => r.map((x) => q(x)));
  for (const ei of e) {
    const u = cross(n, ei);
    if (!isZero(u) && !(avoid && isZero(cross(u, avoid)))) return prim(u);
  }
  return [q(1), q(0), q(0)];
}

// A number in a product: (−3), 2.
export const par = (x) => (q(x).n < 0 || q(x).d !== 1 ? `(${qt(x)})` : qt(x));
export const parR = (x) => par(x).replace(/-/g, '−');

// The three 2 × 2 determinants of u ∧ v, as written in the corrigé.
export const crossComps = (u, v) => [
  `${par(u[1])}·${par(v[2])} - ${par(u[2])}·${par(v[1])}`,
  `${par(u[2])}·${par(v[0])} - ${par(u[0])}·${par(v[2])}`,
  `${par(u[0])}·${par(v[1])} - ${par(u[1])}·${par(v[0])}`,
];
export const crossT = (u, v) => `(${crossComps(u, v).join(' ; ')})`;
// u·v written out: 2·1 + 7·(−1) + 1·3.
export const dotT = (u, v) => u.map((x, i) => `${par(x)}·${par(v[i])}`).join(' + ');
// a² + b² + c² written with the squares computed: 4 + 49 + 1.
export const squaresT = (v) => v.map((x) => qt(q(x).mul(q(x)))).join(' + ');

// The squarefree part of a whole number.
export function squarefree(n) {
  let m = Math.abs(n);
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) m /= f * f;
  return m;
}

// Blanks on the given substrings, searched from the end of the line
// (the result after « = »), as token ranges (see geo-kit blanks).
export function blanksEnd(math, parts) {
  const toks = tokenize(math, {});
  const starts = [];
  let compact = '';
  for (const t of toks) { starts.push(compact.length); compact += t.s; }
  const out = [];
  let to = compact.length;
  for (const p of [...parts].reverse()) {
    let pc;
    try { pc = tokenize(p, {}).map((t) => t.s).join(''); } catch { continue; }
    const at = compact.lastIndexOf(pc, to - pc.length);
    if (at < 0 || !pc) continue;
    const i = starts.indexOf(at);
    if (i < 0) continue;
    let j = i;
    while (j < toks.length && starts[j] < at + pc.length) j++;
    out.unshift([i, j]);
    to = at;
  }
  return out.length ? { math, blanks: out } : { math };
}

export { q, qt, nz, cross, dot, norm2, isZero, prim, vt };

// partsItem of geo-kit, with blanks searched from the end of a line when
// the line says so (`end: true`: « 2·2 + 7·(−1) + 1·3 = □ »).
import { partsItem as partsItemG, blanks } from './geo-kit.js';
export function partsB(o) {
  const item = partsItemG(o);
  if (o.level > 2) return item;
  // Replace the blanks of the lines marked `end` (same order as the parts' lines).
  const marked = o.parts.flatMap((p) => p.lines.filter((l) => !(l.from && o.level < l.from)));
  const eqs = item.script.filter((l) => l.kind === 'eq');
  eqs.forEach((line, i) => {
    const l = marked[i];
    if (!l?.end) return;
    const b = o.level === 1 ? l.blank : (l.blank2 ?? l.blank);
    delete line.blanks;
    if (b?.length) Object.assign(line, blanksEnd(l.math, b));
  });
  return item;
}
export { blanks };

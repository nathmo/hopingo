// Conics (step U5, module G10): nature, reduced frame and elements of
// ax² + bxy + cy² + dx + ey + f = 0, in floating point (the judges compare
// what the student writes, exact or not, to these numbers).
//
// analyzeConic([a, b, c, d, e, f]) → {
//   type: 'ellipse' | 'circle' | 'hyperbola' | 'parabola' | 'empty' | 'point'
//         | 'lines' (two secant lines) | 'parallel' | 'double' | 'none',
//   delta (δ = ac − b²/4), Delta (Δ = det M), lambdas [λ₁, λ₂], vecs [u₁, u₂] (unit),
//   center, fOmega, a, b, c, e, p, r, foci: [[x, y]], vertices: [[x, y]] (on the
//   focal axis), allVertices, asymptotes: [[A, B, C]], directrices, axis, frame}
// A line [A, B, C] is Ax + By + C = 0 with A² + B² = 1.
// conicIn(coefs, frame) → the coefficients in X, Y of the frame {O, u1, u2}.
// coefsOfText(text) → [a, b, c, d, e, f] (numeric) or null.

import { readObject } from './geomobj.js';

const EPS = 1e-9;
const hyp = Math.hypot;

export const lineThrough = (P, dir) => normLine([-dir[1], dir[0], dir[1] * P[0] - dir[0] * P[1]]);
export function normLine([A, B, C]) {
  const n = hyp(A, B);
  let L = [A / n, B / n, C / n];
  // A canonical sign: first nonzero of (A, B) positive.
  if (L[0] < -EPS || (Math.abs(L[0]) <= EPS && L[1] < 0)) L = L.map((x) => -x);
  return L;
}
export const sameLine = (L, M, tol = 1e-7) => L.every((x, i) => Math.abs(x - M[i]) <= tol * (1 + Math.abs(x)));
export const samePoint = (P, Q, tol = 1e-7) => P.every((x, i) => Math.abs(x - Q[i]) <= tol * (1 + Math.abs(x)));
export const sameNum = (x, y, tol = 1e-7) => Math.abs(x - y) <= tol * (1 + Math.abs(x));

function eigen(a, b2, c) {
  // Symmetric [[a, b2], [b2, c]]: λ₁ ≥ λ₂ by default, unit eigenvectors.
  const tr = a + c;
  const disc = Math.sqrt(Math.max(0, ((a - c) / 2) ** 2 + b2 * b2));
  const l1 = tr / 2 + disc;
  const l2 = tr / 2 - disc;
  let v1;
  if (Math.abs(b2) > EPS) v1 = [b2, l1 - a];
  else v1 = a >= c ? [1, 0] : [0, 1];
  const n = hyp(...v1);
  v1 = [v1[0] / n, v1[1] / n];
  const v2 = [-v1[1], v1[0]];
  return { lambdas: [l1, l2], vecs: [v1, v2] };
}

const det3 = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);

export function analyzeConic(coefs) {
  const [a, b, c, d, e, f] = coefs;
  const scale = Math.max(...coefs.map(Math.abs));
  const tol = 1e-9 * scale * scale * scale;
  const delta = a * c - (b * b) / 4;
  const M = [[a, b / 2, d / 2], [b / 2, c, e / 2], [d / 2, e / 2, f]];
  const Delta = det3(M);
  const { lambdas, vecs } = eigen(a, b / 2, c);
  const out = { coefs, delta, Delta, lambdas, vecs, foci: [], vertices: [], allVertices: [], asymptotes: [], directrices: [] };
  const P = (x, y) => a * x * x + b * x * y + c * y * y + d * x + e * y + f;
  out.P = P;
  const degenerate = Math.abs(Delta) <= tol;
  if (Math.abs(delta) > 1e-9 * scale * scale) {
    // Centre: ∂f/∂x = ∂f/∂y = 0.
    const det = a * c - (b * b) / 4;
    const x0 = ((b / 2) * (e / 2) - c * (d / 2)) / det;
    const y0 = ((b / 2) * (d / 2) - a * (e / 2)) / det;
    const fO = P(x0, y0);
    Object.assign(out, { center: [x0, y0], fOmega: fO });
    if (degenerate) {
      out.type = delta > 0 ? 'point' : 'lines';
      return out;
    }
    if (delta > 0) {
      if ((a + c) * Delta > 0) { out.type = 'empty'; return out; }
      // λᵢX² + λⱼY² = −f(Ω): denominators −fΩ/λ.
      const den = lambdas.map((l) => -fO / l);
      const major = den[0] >= den[1] ? 0 : 1;
      const A2 = den[major];
      const B2 = den[1 - major];
      const u = vecs[major];
      const w = vecs[1 - major];
      const aa = Math.sqrt(A2);
      const bb = Math.sqrt(B2);
      const cc = Math.sqrt(Math.max(0, A2 - B2));
      const C = [x0, y0];
      const at = (k, v) => [C[0] + k * v[0], C[1] + k * v[1]];
      Object.assign(out, {
        type: Math.abs(A2 - B2) <= 1e-9 * A2 ? 'circle' : 'ellipse', a: aa, b: bb, c: cc, e: cc / aa, r: Math.abs(A2 - B2) <= 1e-9 * A2 ? aa : undefined,
        focal: u, other: w,
        vertices: [at(aa, u), at(-aa, u)], allVertices: [at(aa, u), at(-aa, u), at(bb, w), at(-bb, w)],
        foci: cc > 1e-9 ? [at(cc, u), at(-cc, u)] : [C],
        directrices: cc > 1e-9 ? [lineThrough(at(A2 / cc, u), w), lineThrough(at(-A2 / cc, u), w)] : [],
        axis: lineThrough(C, u), minorAxis: lineThrough(C, w),
        frame: { O: C, u1: u, u2: [-u[1], u[0]] },
      });
      return out;
    }
    // Hyperbola: the real axis is the eigenvector whose denominator is > 0.
    const den = lambdas.map((l) => -fO / l);
    const real = den[0] > 0 ? 0 : 1;
    const A2 = den[real];
    const B2 = -den[1 - real];
    const u = vecs[real];
    const w = vecs[1 - real];
    const aa = Math.sqrt(A2);
    const bb = Math.sqrt(B2);
    const cc = Math.sqrt(A2 + B2);
    const C = [x0, y0];
    const at = (k, v) => [C[0] + k * v[0], C[1] + k * v[1]];
    Object.assign(out, {
      type: 'hyperbola', a: aa, b: bb, c: cc, e: cc / aa, focal: u, other: w,
      vertices: [at(aa, u), at(-aa, u)], allVertices: [at(aa, u), at(-aa, u)],
      foci: [at(cc, u), at(-cc, u)],
      asymptotes: [lineThrough(C, [aa * u[0] + bb * w[0], aa * u[1] + bb * w[1]]), lineThrough(C, [aa * u[0] - bb * w[0], aa * u[1] - bb * w[1]])],
      directrices: [lineThrough(at(A2 / cc, u), w), lineThrough(at(-A2 / cc, u), w)],
      axis: lineThrough(C, u), minorAxis: lineThrough(C, w),
      frame: { O: C, u1: u, u2: [-u[1], u[0]] },
    });
    return out;
  }
  // δ = 0: parabola, or parallel lines.
  const k = Math.abs(lambdas[0]) >= Math.abs(lambdas[1]) ? 0 : 1;
  const lam = lambdas[k];
  const w = vecs[k]; // the nonzero eigenvalue
  let v = vecs[1 - k]; // axis direction
  if (degenerate || Math.abs(lam) < 1e-12) { out.type = Math.abs(lam) < 1e-12 ? 'none' : 'parallel'; return out; }
  const Dw = d * w[0] + e * w[1];
  let Dv = d * v[0] + e * v[1];
  // λU² + Dw·U + Dv·V + f = 0, U along w, V along v.
  const U0 = -Dw / (2 * lam);
  const rest = f - (Dw * Dw) / (4 * lam);
  // λ(U − U0)² = −Dv·V − rest → (U − U0)² = −(Dv/λ)(V − V0), V0 = −rest/Dv.
  const V0 = -rest / Dv;
  let twoP = -Dv / lam;
  if (twoP < 0) { v = [-v[0], -v[1]]; Dv = -Dv; twoP = -twoP; }
  // In the flipped direction: (U − U0)² = twoP·(V' − V0'), V' = −V if flipped.
  const flipped = v[0] !== vecs[1 - k][0] || v[1] !== vecs[1 - k][1];
  const V0f = flipped ? -V0 : V0;
  const S = [U0 * w[0] + V0f * v[0], U0 * w[1] + V0f * v[1]];
  const p = twoP / 2;
  const at = (kk) => [S[0] + kk * v[0], S[1] + kk * v[1]];
  Object.assign(out, {
    type: 'parabola', p, e: 1, vertex: S, vertices: [S], allVertices: [S], foci: [at(p / 2)],
    directrices: [lineThrough(at(-p / 2), w)], axis: lineThrough(S, v), focal: v, other: w,
    frame: { O: S, u1: [-v[1], v[0]], u2: v },
  });
  // In the frame (S, u1 ⟂ axis, u2 = axis direction): X² = 2pY when u1 = ±w.
  return out;
}

// The coefficients [a, b, c, d, e, f] of the conic in X, Y, where a point is
// O + X·u1 + Y·u2 (frame {O, u1, u2}, any vectors).
export function conicIn(coefs, { O, u1, u2 }) {
  const [a, b, c, d, e, f] = coefs;
  const P = (x, y) => a * x * x + b * x * y + c * y * y + d * x + e * y + f;
  const g = (X, Y) => P(O[0] + X * u1[0] + Y * u2[0], O[1] + X * u1[1] + Y * u2[1]);
  // Exact for a quadratic: read the coefficients from values.
  const F = g(0, 0);
  const D = (g(1, 0) - g(-1, 0)) / 2;
  const A = (g(1, 0) + g(-1, 0)) / 2 - F;
  const E = (g(0, 1) - g(0, -1)) / 2;
  const C = (g(0, 1) + g(0, -1)) / 2 - F;
  const B = g(1, 1) - A - C - D - E - F;
  return [A, B, C, D, E, F].map((x) => (Math.abs(x) < 1e-11 ? 0 : x));
}

// [a, b, c, d, e, f] of an equation in x, y (or in X, Y with vars).
export function coefsOfText(text, vars = ['x', 'y']) {
  let t = text;
  if (vars[0] !== 'x') t = t.replace(/X/g, 'x').replace(/Y/g, 'y');
  const o = readObject(t, { dim: 2 });
  if (o.kind === 'poly') return o.coefs;
  if (o.kind === 'affine' && o.rows.length === 1) {
    const r = o.rows[0].map((q) => q.valueOf());
    return [0, 0, 0, r[0], r[1], r[2]];
  }
  return null;
}

// The coefficients of the poly object of js/cas/geomobj.js (MONO[2] order:
// x², xy, y², x, y, 1) are already [a, b, c, d, e, f].
export const coefsOfObject = (o) => (o.kind === 'poly' ? o.coefs : null);

// Frames of the reduced equation the student may use: centre (or vertex),
// the eigenvectors in either order and either sign.
export function candidateFrames(an) {
  if (!an.frame) return [];
  const { O } = an.frame;
  const [u, w] = an.type === 'parabola' ? [an.frame.u1, an.frame.u2] : [an.vecs[0], an.vecs[1]];
  const out = [];
  for (const [p, q] of [[u, w], [w, u]]) {
    for (const s of [1, -1]) for (const t of [1, -1]) out.push({ O, u1: p.map((x) => s * x), u2: q.map((x) => t * x) });
  }
  return out;
}

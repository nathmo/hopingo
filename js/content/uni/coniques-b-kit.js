// Tools of module G10, part b (step U5): exact invariants of a conic
// ax² + bxy + cy² + dx + ey + f = 0 (coefficients in Q), the matrices A and
// M, the cofactor lines of det M for the judge `det`, and the nature.

import { Q } from '../../math/rational.js';
import * as MX from '../../cas/matrix.js';
import { q, qt, fq, sumT, nz, dot, pickW } from './geo-kit.js';
import { analyzeConic } from '../../cas/conic.js';
import { t } from '../../i18n.js';

export const mtQ = (A) => `[${A.map((r) => `[${r.map(qt).join(',')}]`).join(',')}]`;
export const matA = ([a, b, c]) => [[q(a), q(b).div(2)], [q(b).div(2), q(c)]];
export const matM = ([a, b, c, d, e, f]) => [[q(a), q(b).div(2), q(d).div(2)], [q(b).div(2), q(c), q(e).div(2)], [q(d).div(2), q(e).div(2), q(f)]];
export const deltaOf = (co) => MX.det(matA(co));
export const DeltaOf = (co) => MX.det(matM(co));
export const traceOf = (co) => q(co[0]).add(q(co[2]));

// The rational roots of λ² − tλ + δ, or null.
export function eigRoots(t, d) {
  const disc = t.mul(t).sub(d.mul(4));
  if (disc.n < 0) return null;
  const sn = Math.round(Math.sqrt(disc.n));
  const sd = Math.round(Math.sqrt(disc.d));
  if (sn * sn !== disc.n || sd * sd !== disc.d) return null;
  const s = new Q(sn, sd);
  return [t.add(s).div(2), t.sub(s).div(2)];
}

// det M along the first row: a·det[…] − b·det[…] + c·det[…] (judge det).
export function detLines(M) {
  const minor = (j) => M.slice(1).map((r) => r.filter((_, k) => k !== j));
  const terms = [];
  M[0].forEach((x, j) => {
    if (x.n === 0) return;
    const c = j % 2 ? x.neg() : x;
    const abs = c.n < 0 ? c.neg() : c;
    terms.push(`${c.n < 0 ? '-' : '+'}${abs.eq(1) ? '' : `${qt(abs)}·`}det${mtQ(minor(j))}`);
  });
  return { matrix: `det${mtQ(M)}`, expansion: terms.join('').replace(/^\+/, '') || '0', value: qt(MX.det(M)) };
}

// The nature, exactly: 'ell' (real ellipse, circle included), 'empty',
// 'hyp', 'par', 'pt' (a point), 'lines' (two secant lines), 'par2'
// (parallel lines, a double line or nothing).
export function natureOf(co) {
  const d = deltaOf(co);
  const D = DeltaOf(co);
  if (D.n === 0) return d.n > 0 ? 'pt' : d.n < 0 ? 'lines' : 'par2';
  if (d.n > 0) return traceOf(co).mul(D).n < 0 ? 'ell' : 'empty';
  return d.n < 0 ? 'hyp' : 'par';
}
export const NATURE_NAME = {
  ell: t('une ellipse réelle'), empty: t('l\'ensemble vide (ellipse imaginaire)'), hyp: t('une hyperbole'), par: t('une parabole'),
  pt: t('un point'), lines: t('deux droites sécantes'), par2: t('deux droites parallèles (ou confondues, ou rien)'),
};

// Text of a product of two lines (p₁x + q₁y + r₁)(p₂x + q₂y + r₂), expanded.
export function productCoefs([p1, q1, r1], [p2, q2, r2]) {
  return [p1 * p2, p1 * q2 + p2 * q1, q1 * q2, p1 * r2 + p2 * r1, q1 * r2 + q2 * r1, r1 * r2].map((x) => q(x));
}
export const lineT2 = ([p, qq, r]) => sumT([[p, 'x'], [qq, 'y'], [r, '']]);

export { q, qt, fq };

// ---------- reductions built backwards (moved from coniques-b.js) ----------

const UNIT_VECS = [[1, 1, 2], [2, 1, 5], [1, 2, 5]];

// kind: 'hyp' | 'ell' | 'par'. opts.fociQ: foci with rational coordinates.
export function reduceData(rng, kind, opts = {}) {
  for (let t = 0; t < 400; t++) {
    const [p, r, n] = pickW(rng, UNIT_VECS);
    const s = rng.pick([1, -1]);
    const w1 = [q(s * p), q(s * r)]; // u₁·√n
    const w2 = [w1[1].neg(), w1[0]]; // u₂·√n (direct frame)
    let l1;
    let l2;
    if (kind === 'par') { l1 = nz(rng, -6, 8); l2 = 0; } else {
      l1 = nz(rng, -6, 8);
      l2 = nz(rng, -6, 8);
      if (l1 === l2) continue;
      if (kind === 'hyp' && l1 * l2 > 0) continue;
      if (kind === 'ell' && l1 * l2 < 0) continue;
    }
    // A = (λ₁w₁w₁ᵀ + λ₂w₂w₂ᵀ)/n, whole.
    const A = [[0, 0], [0, 1]].map(() => [q(0), q(0)]);
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) A[i][j] = w1[i].mul(w1[j]).mul(l1).add(w2[i].mul(w2[j]).mul(l2)).div(n);
    if (A.flat().some((x) => x.d !== 1) || A.flat().every((x) => x.n === 0)) continue;
    if (A[0][1].n === 0) continue; // a term in xy
    if (kind === 'par') {
      // Vertex S whole; λ₁X² + μY = 0 in (S, w1/√n, w2/√n), μ = m·√n so that
      // the linear terms are whole: m·(X − S)·w2.
      const S = [q(rng.int(-4, 4)), q(rng.int(-4, 4))];
      const m = nz(rng, -5, 5);
      // f(x) = (x − S)ᵀA(x − S) + m·(x − S)·w2.
      const a = A[0][0]; const b = A[0][1].mul(2); const c = A[1][1];
      const AS = [A[0][0].mul(S[0]).add(A[0][1].mul(S[1])), A[1][0].mul(S[0]).add(A[1][1].mul(S[1]))];
      const d = AS[0].mul(-2).add(w2[0].mul(m));
      const e = AS[1].mul(-2).add(w2[1].mul(m));
      const f = dot(S, AS).sub(dot(S, w2).mul(m));
      const coefs = [a, b, c, d, e, f];
      if (coefs.some((x) => Math.abs(x.valueOf()) > 60)) continue;
      return { kind, p, r, n, w1, w2, l1, l2, A, S, m, coefs, k: null };
    }
    const O = [q(rng.int(-4, 4)), q(rng.int(-4, 4))];
    // f(Ω) = −k: denominators k/λ of the reduced form ≤ 4, and the right sign.
    let k = null;
    for (let u = 0; u < 30 && k === null; u++) {
      const kk = nz(rng, -24, 24);
      const d1 = new Q(kk, l1);
      const d2 = new Q(kk, l2);
      if (d1.d > 4 || d2.d > 4) continue;
      if (kind === 'ell' && (d1.n < 0 || d2.n < 0)) continue;
      k = kk;
    }
    if (k === null) continue;
    const AO = [A[0][0].mul(O[0]).add(A[0][1].mul(O[1])), A[1][0].mul(O[0]).add(A[1][1].mul(O[1]))];
    const coefs = [A[0][0], A[0][1].mul(2), A[1][1], AO[0].mul(-2), AO[1].mul(-2), dot(O, AO).sub(k)];
    if (coefs.some((x) => Math.abs(x.valueOf()) > 60) || coefs.slice(3, 5).every((x) => x.n === 0)) continue;
    const an = analyzeConic(coefs.map((x) => x.valueOf()));
    // Rational foci: c·u₁ rational ⇔ c²/n is the square of a rational.
    if (opts.fociQ) {
      const a2 = new Q(k, l1);
      const b2 = new Q(k, l2);
      const c2 = kind === 'hyp' ? (a2.n > 0 ? a2.sub(b2) : b2.sub(a2)) : (a2.sub(b2).n > 0 ? a2.sub(b2) : b2.sub(a2));
      const r2 = c2.div(n);
      const sq = (x) => Number.isInteger(Math.sqrt(x)) ? Math.sqrt(x) : null;
      if (sq(r2.n) === null || sq(r2.d) === null) continue;
    }
    return { kind, p, r, n, w1, w2, l1, l2, A, O, k, coefs, an };
  }
  // Fallback: the corrigé type 2x² + 4xy − y² − 6y − 9 = 0.
  const w1 = [q(2), q(1)];
  return { kind: 'hyp', p: 2, r: 1, n: 5, w1, w2: [q(-1), q(2)], l1: 3, l2: -2, A: [[q(2), q(2)], [q(2), q(-1)]], O: [q(1), q(-1)], k: 6, coefs: [2, 4, -1, 0, -6, -9].map((x) => q(x)), fallback: true };
}


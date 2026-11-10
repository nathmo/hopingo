// Floating-point linear algebra js/cas/linalg-float.js (step U8): known
// results of module M, reused by module N (step U9).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as LF from '../js/cas/linalg-float.js';
import { makeRng } from '../js/content/random.js';
import { Q } from '../js/math/rational.js';

const near = (a, b, tol = 1e-9, msg = '') => assert.ok(Math.abs(a - b) <= tol * (1 + Math.abs(a) + Math.abs(b)), `${msg} ${a} ≠ ${b}`);
const nearM = (A, B, tol = 1e-9, msg = '') => A.forEach((r, i) => r.forEach((x, j) => near(x, B[i][j], tol, `${msg} (${i},${j})`)));
const randM = (rng, m, n) => Array.from({ length: m }, () => Array.from({ length: n }, () => rng.int(-5, 5)));

test('norms: 1 (columns), ∞ (rows), 2 (σ₁), Frobenius', () => {
  const A = [[3, 0], [4, 5]];
  assert.equal(LF.norm(A, 1), 7);
  assert.equal(LF.norm(A, Infinity), 9);
  assert.equal(LF.norm(A, 'inf'), 9);
  near(LF.norm(A, 'fro'), 5 * Math.SQRT2);
  near(LF.norm(A, 2), 3 * Math.sqrt(5));
  near(LF.norm([[5, 4], [4, 5]]), 9);
  // Rows of Q are accepted.
  near(LF.norm([[new Q(1, 2), new Q(0)], [new Q(0), new Q(1, 3)]], 2), 0.5);
  near(LF.vnorm([3, -4]), 5);
  assert.equal(LF.vnorm([3, -4], 1), 7);
  assert.equal(LF.vnorm([3, -4], Infinity), 4);
});

test('SVD reconstructs A; known singular values', () => {
  const rng = makeRng(5);
  for (const [m, n] of [[2, 2], [3, 3], [2, 3], [3, 2], [4, 4], [4, 2], [2, 4]]) {
    for (let t = 0; t < 20; t++) {
      const A = randM(rng, m, n);
      const { U, S, V } = LF.svd(A);
      const p = Math.min(m, n);
      assert.equal(S.length, p);
      for (let k = 1; k < p; k++) assert.ok(S[k - 1] >= S[k] - 1e-12, 'decreasing');
      const B = A.map((r, i) => r.map((_, j) => S.reduce((s, x, l) => s + x * U[i][l] * V[j][l], 0)));
      nearM(B, A, 1e-9, `${m}×${n}`);
      nearM(LF.matmul(LF.transpose(U), U), LF.identity(p), 1e-9, 'UᵀU');
      nearM(LF.matmul(LF.transpose(V), V), LF.identity(p), 1e-9, 'VᵀV');
    }
  }
  const { S } = LF.svd([[4, 5, 2], [0, 3, 6]]);
  near(S[0], 6 * Math.SQRT2);
  near(S[1], 3 * Math.SQRT2);
  // Rank deficient: a zero singular value, U still orthonormal.
  const r = LF.svd([[1, 2], [2, 4]]);
  near(r.S[1], 0, 1e-12);
  nearM(LF.matmul(LF.transpose(r.U), r.U), LF.identity(2));
  assert.equal(LF.rank([[1, 2], [2, 4]]), 1);
});

test('cond₂ = σmax/σmin; κ₁, κ∞; singular is ∞', () => {
  const rng = makeRng(8);
  for (let t = 0; t < 30; t++) {
    const A = randM(rng, 3, 3);
    if (Math.abs(LF.det(A)) < 0.5) continue;
    const S = LF.singularValues(A);
    near(LF.cond(A), S[0] / S[2]);
    near(LF.cond(A, 2), LF.norm(A, 2) * LF.norm(LF.inv(A), 2), 1e-8);
  }
  near(LF.cond([[5, 4], [4, 5]]), 9);
  near(LF.cond([[1e-3, 0], [0, 1e-3]]), 1);
  const A = [[1, 2], [3, 4]];
  near(LF.cond(A, 1), 6 * 3.5);
  near(LF.cond(A, Infinity), 7 * 3);
  assert.equal(LF.cond([[1, 2], [2, 4]]), Infinity);
  near(LF.cond([[3 / 5, -4 / 5], [4 / 5, 3 / 5]]), 1, 1e-12);
});

test('power method converges to the dominant eigenvalue; inverse power, Rayleigh', () => {
  const r = LF.powerMethod([[3, 1], [1, 3]], [1, 0], { steps: 4 });
  // The catalogue's iterations: μ = 3, 10/3, 18/5, 34/9.
  [3, 10 / 3, 18 / 5, 34 / 9].forEach((mu, k) => near(r.iterations[k].mu, mu));
  near(r.iterations[1].y[1], 1 / 3);
  const full = LF.powerMethod([[3, 1], [1, 3]], [1, 0]);
  assert.ok(full.converged);
  near(full.value, 4, 1e-9);
  near(LF.powerMethod([[6, 2], [2, 3]], [1, 0]).value, 7, 1e-9);
  // Negative dominant eigenvalue.
  near(LF.powerMethod([[-5, 1], [1, 2]], [1, 0]).value, LF.eigSym([[-5, 1], [1, 2]]).values[0], 1e-8);
  // Random symmetric 3 × 3 with distinct moduli.
  const rng = makeRng(11);
  for (let t = 0; t < 20; t++) {
    const B = randM(rng, 3, 3);
    const A = LF.madd(B, LF.transpose(B));
    const vals = LF.eigSym(A).values;
    const mods = vals.map(Math.abs).sort((a, b) => b - a);
    if (mods[0] - mods[1] < 0.5) continue;
    const dom = vals.find((v) => Math.abs(v) === mods[0]);
    near(LF.powerMethod(A, [1, 0.37, -0.71], { steps: 2000, normalize: '2' }).value, dom, 1e-6);
  }
  // Inverse power with shift σ = 1: the eigenvalue nearest 1 is 2.
  near(LF.inversePower([[6, 2], [2, 3]], [1, 0], 1).value, 2, 1e-9);
  near(LF.inversePower([[3, 1], [1, 3]], [1, 0], 0).value, 2, 1e-9);
  near(LF.rayleigh([[3, 1], [1, 3]], [2, 1]), 19 / 5);
  near(LF.rayleigh([[6, 2], [2, 3]], [1, 1 / 3]), 69 / 10);
});

test('expm: diagonalisable, nilpotent, double eigenvalue, e^{At} solves X′ = AX', () => {
  // Diagonal.
  nearM(LF.expm([[1, 0], [0, -2]], 0.7), [[Math.exp(0.7), 0], [0, Math.exp(-1.4)]]);
  // Nilpotent: e^N = I + N + N²/2.
  nearM(LF.expm([[0, 1], [0, 0]], 3), [[1, 3], [0, 1]], 1e-12);
  nearM(LF.expm([[0, 1, 0], [0, 0, 1], [0, 0, 0]], 2), [[1, 2, 2], [0, 1, 2], [0, 0, 1]], 1e-12);
  // Diagonalisable, λ = −2, −3: A = [[0, 1], [−6, −5]].
  const t = 0.8;
  const E = LF.expm([[0, 1], [-6, -5]], t);
  const a = Math.exp(-2 * t);
  const b = Math.exp(-3 * t);
  nearM(E, [[3 * a - 2 * b, a - b], [-6 * a + 6 * b, -2 * a + 3 * b]]);
  // Double eigenvalue 2: e^{At} = e^{2t}(I + tN), N = A − 2I.
  const s = 1.3;
  nearM(LF.expm([[1, 1], [-1, 3]], s), [[1 - s, s], [-s, 1 + s]].map((r) => r.map((x) => Math.exp(2 * s) * x)));
  // Rotation generator, large norm (scaling and squaring).
  nearM(LF.expm([[0, -1], [1, 0]], 10), [[Math.cos(10), -Math.sin(10)], [Math.sin(10), Math.cos(10)]], 1e-9);
  // d/dt e^{At} = A·e^{At} (central difference) and e^{A·0} = I.
  const A = [[-3, 1], [-1, -1]];
  const h = 1e-5;
  const D = LF.madd(LF.expm(A, 0.5 + h), LF.expm(A, 0.5 - h), -1).map((r) => r.map((x) => x / (2 * h)));
  nearM(D, LF.matmul(A, LF.expm(A, 0.5)), 1e-6);
  nearM(LF.expm(A, 0), LF.identity(2));
});

test('Cholesky: the catalogue examples; null when not positive definite', () => {
  nearM(LF.cholesky([[4, 2], [2, 5]]), [[2, 0], [1, 2]]);
  nearM(LF.cholesky([[4, 2, -2], [2, 10, 5], [-2, 5, 6]]), [[2, 0, 0], [1, 3, 0], [-1, 2, 1]]);
  nearM(LF.cholesky([[9, 3, -3], [3, 5, 1], [-3, 1, 6]]), [[3, 0, 0], [1, 2, 0], [-1, 1, 2]]);
  assert.equal(LF.cholesky([[1, 2], [2, 1]]), null);
  assert.equal(LF.cholesky([[1, 2], [3, 1]]), null, 'not symmetric');
  assert.equal(LF.cholesky([[1, 1], [1, 1]]), null, 'semi-definite');
  const L = LF.cholesky([[9, 3, -3], [3, 5, 1], [-3, 1, 6]]);
  LF.choleskySolve(L, [6, 4, 3]).forEach((x, i) => near(x, [1, 0, 1][i]));
  const rng = makeRng(4);
  for (let t = 0; t < 30; t++) {
    const B = randM(rng, 4, 4);
    const A = LF.madd(LF.matmul(B, LF.transpose(B)), LF.identity(4));
    const C = LF.cholesky(A);
    nearM(LF.matmul(C, LF.transpose(C)), A, 1e-10);
  }
});

test('eigenvalues: symmetric (Jacobi), general (complex pairs), spectral radius, Gershgorin', () => {
  const { values, vectors } = LF.eigSym([[2, -1, 0], [-1, 2, -1], [0, -1, 2]]);
  [2 - Math.SQRT2, 2, 2 + Math.SQRT2].forEach((v, i) => near(values[i], v));
  nearM(LF.matmul(LF.transpose(vectors), vectors), LF.identity(3));
  const e = LF.eig([[0, 1], [-6, -5]]).map((z) => z.re).sort((x, y) => x - y);
  near(e[0], -3);
  near(e[1], -2);
  const c = LF.eig([[-1, -2], [2, -1]]);
  near(c[0].re, -1);
  near(Math.abs(c[0].im), 2);
  near(LF.spectralRadius([[5 / 4, -3 / 4], [3 / 2, -1]]), 1 / 2);
  const g = LF.eig([[4, 1, 0], [1, -3, 1], [0, 1, 7]]).map((z) => z.re).sort((x, y) => x - y);
  [-3.24, 4.13, 7.1].forEach((v, i) => assert.ok(Math.abs(g[i] - v) < 0.01, `${g[i]}`));
  assert.deepEqual(LF.gershgorin([[4, 1, 0], [1, -3, 1], [0, 1, 7]]), [{ center: 4, radius: 1 }, { center: -3, radius: 2 }, { center: 7, radius: 1 }]);
  // Faddeev-LeVerrier: det(λI − A).
  LF.charpolyF([[2, 0, 0], [0, 3, 0], [0, 0, 5]]).forEach((x, i) => near(x, [-30, 31, -10, 1][i]));
  // A double eigenvalue (non-diagonalisable).
  LF.eig([[-3, 1], [-1, -1]]).forEach((z) => { near(z.re, -2, 1e-6); near(z.im, 0, 1e-6); });
});

test('best rank-k approximation, solve, inverse, det', () => {
  const r = LF.lowRank([[4, 5, 2], [0, 3, 6]], 1);
  nearM(r.Ak, [[2, 4, 4], [2, 4, 4]]);
  near(r.err2, 3 * Math.SQRT2);
  near(r.errF, 3 * Math.SQRT2);
  LF.solve([[2, 1], [1, 3]], [3, 5]).forEach((x, i) => near(x, [4 / 5, 7 / 5][i]));
  assert.equal(LF.solve([[1, 2], [2, 4]], [1, 1]), null);
  nearM(LF.inv([[2, 1], [1, 1]]), [[1, -1], [-1, 2]]);
  near(LF.det([[2, 1, 1], [1, 1, 0], [1, 1, 3]]), 3);
});

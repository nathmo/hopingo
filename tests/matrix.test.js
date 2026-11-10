// Exact matrices (js/cas/matrix.js, spec §13): rref, det and the
// characteristic polynomial against brute force on 200 random matrices,
// then the operations log, the factorisations and the recognition of a row
// operation.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Q } from '../js/math/rational.js';
import { makeRng } from '../js/content/random.js';
import * as M from '../js/cas/matrix.js';

const q = (n, d = 1) => new Q(n, d);

function randomMatrix(rng, m, n, lo = -4, hi = 4) {
  const A = Array.from({ length: m }, () => Array.from({ length: n }, () => q(rng.int(lo, hi))));
  // Some rank-deficient ones: a row equal to a combination of two others.
  if (m >= 3 && rng.chance(0.3)) A[m - 1] = A[0].map((x, j) => x.mul(2).sub(A[1][j]));
  return A;
}

// Leibniz: Σ over permutations.
function leibniz(A) {
  const n = A.length;
  let total = q(0);
  const perm = [...Array(n).keys()];
  const rec = (k, sign) => {
    if (k === n) {
      let p = q(sign);
      for (let i = 0; i < n; i++) p = p.mul(A[i][perm[i]]);
      total = total.add(p);
      return;
    }
    for (let i = k; i < n; i++) {
      [perm[k], perm[i]] = [perm[i], perm[k]];
      rec(k + 1, i === k ? sign : -sign);
      [perm[k], perm[i]] = [perm[i], perm[k]];
    }
  };
  rec(0, 1);
  return total;
}

// Rank by minors: the largest k with a non-zero k × k minor.
function rankByMinors(A) {
  const [m, n] = M.dims(A);
  const choose = (arr, k) => (k === 0 ? [[]] : arr.flatMap((x, i) => choose(arr.slice(i + 1), k - 1).map((c) => [x, ...c])));
  for (let k = Math.min(m, n); k > 0; k--) {
    for (const rs of choose([...Array(m).keys()], k)) {
      for (const cs of choose([...Array(n).keys()], k)) {
        if (leibniz(rs.map((i) => cs.map((j) => A[i][j]))).n !== 0) return k;
      }
    }
  }
  return 0;
}

test('rref, det and charpoly against brute force on 200 random matrices', () => {
  const rng = makeRng(2026);
  for (let t = 0; t < 200; t++) {
    const m = rng.int(1, 4);
    const n = rng.int(1, 5);
    const A = randomMatrix(rng, m, n);
    const { R, pivots, ops } = M.rref(A);
    // R is reduced, has the rank of A, and its rows span the rows of A:
    // stacking them does not raise the rank.
    assert.ok(M.isRref(R), `rref ${M.text(A)}`);
    const r = rankByMinors(A);
    assert.equal(pivots.length, r, `rank ${M.text(A)}`);
    assert.equal(rankByMinors([...A, ...R]), r, `same row space ${M.text(A)}`);
    // The log replays to R.
    assert.ok(M.equal(M.applyOps(A, ops), R), `log ${M.text(A)}`);
    assert.equal(M.rank(A), r);

    const k = rng.int(1, 4);
    const S = randomMatrix(rng, k, k, -5, 5);
    assert.ok(M.det(S).eq(leibniz(S)), `det ${M.text(S)}`);
    // det(A − λI) at λ = −2 … 2.
    const cs = M.charpoly(S);
    assert.equal(cs.length, k + 1);
    for (let l = -2; l <= 2; l++) {
      const shifted = S.map((row, i) => row.map((x, j) => (i === j ? x.sub(q(l)) : x)));
      const value = cs.reduceRight((s, c) => s.mul(q(l)).add(c), q(0));
      assert.ok(value.eq(leibniz(shifted)), `charpoly ${M.text(S)} at ${l}`);
    }
    // inverse and kernel.
    const inv = M.inverse(S);
    if (M.det(S).n === 0) assert.equal(inv, null);
    else assert.ok(M.equal(M.mul(S, inv), M.identity(k)));
    for (const v of M.kernel(A)) assert.ok(M.matVec(A, v).every((x) => x.n === 0));
    assert.equal(M.kernel(A).length, n - r);
  }
});

test('identifyRowOp recognises the three operations and a combo', () => {
  const A = M.mat([[1, 2, -1, 3], [2, 5, 1, 7], [-1, 1, 4, 0]]);
  const add = M.applyOp(A, { kind: 'add', i: 1, j: 0, k: q(-2) });
  assert.deepEqual(M.identifyRowOp(A, add), { kind: 'add', i: 1, j: 0, k: q(-2) });
  const sw = M.applyOp(A, { kind: 'swap', i: 0, j: 2 });
  assert.equal(M.identifyRowOp(A, sw).kind, 'swap');
  const sc = M.applyOp(A, { kind: 'scale', i: 1, k: q(1, 2) });
  assert.equal(M.identifyRowOp(A, sc).kind, 'scale');
  const co = M.applyOp(A, { kind: 'combo', i: 1, c: q(2), j: 0, k: q(-1) });
  const r = M.identifyRowOp(A, co);
  assert.equal(r.kind, 'combo');
  assert.ok(r.c.eq(2) && r.k.eq(-1));
  assert.equal(M.identifyRowOp(A, A), null);
  // Two rows changed by two operations: not one operation, but equivalent.
  const two = M.applyOps(A, [{ kind: 'add', i: 1, j: 0, k: q(-2) }, { kind: 'add', i: 2, j: 0, k: q(1) }]);
  assert.equal(M.identifyRowOp(A, two), null);
  assert.ok(M.rowEquivalent(A, two));
});

test('LU, PLU, Gram-Schmidt, Cholesky and eigenvalues', () => {
  const A = M.mat([[2, 1, -1], [4, 1, 0], [-2, -4, 10]]);
  const { L, U } = M.lu(A);
  assert.ok(M.equal(M.mul(L, U), A));
  assert.ok(M.equal(L, M.mat([[1, 0, 0], [2, 1, 0], [-1, 3, 1]])));
  assert.equal(M.lu(M.mat([[0, 1], [1, 0]])), null);
  const p = M.plu(M.mat([[0, 1], [1, 0]]));
  assert.ok(M.equal(M.mul(p.P, M.mat([[0, 1], [1, 0]])), M.mul(p.L, p.U)));
  const X = M.mat([[1, 2, 2], [1, 0, 4], [1, 2, 0], [1, 0, 2]]);
  const g = M.qrGS(X);
  assert.ok(M.equal(g.V, M.mat([[1, 1, 1], [1, -1, 1], [1, 1, -1], [1, -1, -1]])));
  assert.deepEqual(g.norms2.map(String), ['4', '4', '4']);
  const c = M.cholesky(M.mat([[4, 2], [2, 5]]));
  assert.ok(c.exact && M.equal(c.L, M.mat([[2, 0], [1, 2]])));
  assert.equal(M.cholesky(M.mat([[2, 1], [1, 2]])).exact, false);
  const e = M.rationalEigen(M.mat([[2, 0, 0], [1, 3, 1], [1, 1, 3]]));
  assert.deepEqual(e.roots.map((r) => `${r.value}:${r.mult}`).sort(), ['2:2', '4:1']);
});

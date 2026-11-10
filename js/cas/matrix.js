// Exact matrices over ℚ (spec §4.3, step U3). A matrix is an array of rows,
// each an array of Q (js/math/rational.js). Indices are 0-based here; the
// screen counts from 1.
//
// Row operations (the log of rref, identifyRowOp):
//   {kind:'swap', i, j}            Lᵢ ↔ Lⱼ
//   {kind:'scale', i, k}           Lᵢ ← k·Lᵢ          (k ≠ 0)
//   {kind:'add', i, j, k}          Lᵢ ← Lᵢ + k·Lⱼ     (j ≠ i)
//   {kind:'combo', i, c, j, k}     Lᵢ ← c·Lᵢ + k·Lⱼ   (c ≠ 0, 1; multiplies det by c)
//
// rref(A, {cols}) → {R, pivots, ops}     echelon(A, {cols}) → {E, pivots, ops}
// rank, det, inverse (null if singular), kernel → basis (one vector per free
// variable, that variable 1), charpoly → coefficients of det(A − λI), from
// λ⁰ up, identifyRowOp(A, B) → op | null, rowEquivalent(A, B),
// lu(A) → {L, U} | null (no exchange), plu(A) → {P, L, U}, qrGS(A) →
// {V, C, norms2} (Gram-Schmidt: columns vⱼ not normalised, xⱼ = vⱼ +
// Σᵢ<ⱼ C[i][j]·vᵢ, ‖vⱼ‖² exact), cholesky(A) → {L, exact} | null.

import { Q } from '../math/rational.js';

const ZERO = new Q(0);
const ONE = new Q(1);
export const q = (x) => (x instanceof Q ? x : typeof x === 'string' ? qText(x) : new Q(x));

function qText(s) {
  const t = s.replace(/−/g, '-').trim();
  const m = /^(-?\d+)(?:\/(-?\d+))?$/.exec(t);
  if (!m) throw new SyntaxError(`Nombre invalide : ${s}`);
  return new Q(Number(m[1]), m[2] ? Number(m[2]) : 1);
}

export const mat = (rows) => rows.map((r) => r.map(q));
export const clone = (A) => A.map((r) => [...r]);
export const dims = (A) => [A.length, A[0]?.length ?? 0];
export const identity = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? ONE : ZERO)));
export const zeros = (m, n) => Array.from({ length: m }, () => Array.from({ length: n }, () => ZERO));
export const diag = (xs) => xs.map((x, i) => xs.map((_, j) => (i === j ? q(x) : ZERO)));
export const transpose = (A) => (A.length ? A[0].map((_, j) => A.map((r) => r[j])) : []);
export const add = (A, B) => A.map((r, i) => r.map((x, j) => x.add(B[i][j])));
export const sub = (A, B) => A.map((r, i) => r.map((x, j) => x.sub(B[i][j])));
export const scale = (A, k) => A.map((r) => r.map((x) => x.mul(q(k))));
export const isZeroQ = (x) => x.n === 0;
export const equal = (A, B) => A.length === B.length && A.every((r, i) => r.length === B[i].length && r.every((x, j) => x.eq(B[i][j])));
export const col = (A, j) => A.map((r) => r[j]);
export const fromCols = (cols) => (cols.length ? cols[0].map((_, i) => cols.map((c) => c[i])) : []);
export const hcat = (A, B) => A.map((r, i) => [...r, ...B[i]]);
export const dot = (u, v) => u.reduce((s, x, i) => s.add(x.mul(v[i])), ZERO);
export const matVec = (A, v) => A.map((r) => dot(r, v));
export const toNumbers = (A) => A.map((r) => r.map((x) => x.n / x.d));
export const text = (A) => `[${A.map((r) => `[${r.map(String).join(',')}]`).join(',')}]`;

export function mul(A, B) {
  const [m, p] = dims(A);
  const n = B[0]?.length ?? 0;
  if (B.length !== p) throw new RangeError('Tailles incompatibles');
  const out = zeros(m, n);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let s = ZERO;
      for (let k = 0; k < p; k++) if (A[i][k].n && B[k][j].n) s = s.add(A[i][k].mul(B[k][j]));
      out[i][j] = s;
    }
  }
  return out;
}

export function power(A, k) {
  let out = identity(A.length);
  for (let i = 0; i < k; i++) out = mul(out, A);
  return out;
}

export const trace = (A) => A.reduce((s, r, i) => s.add(r[i]), ZERO);

// ---------- row operations ----------

export function applyOp(A, op) {
  const R = clone(A);
  switch (op.kind) {
    case 'swap': [R[op.i], R[op.j]] = [R[op.j], R[op.i]]; break;
    case 'scale': R[op.i] = R[op.i].map((x) => x.mul(op.k)); break;
    case 'add': R[op.i] = R[op.i].map((x, c) => x.add(op.k.mul(A[op.j][c]))); break;
    case 'combo': R[op.i] = R[op.i].map((x, c) => x.mul(op.c).add(op.k.mul(A[op.j][c]))); break;
    default: throw new Error(`Opération inconnue : ${op.kind}`);
  }
  return R;
}

export const applyOps = (A, ops) => ops.reduce((M, op) => applyOp(M, op), A);

// The factor by which an operation multiplies the determinant.
export function detFactor(op) {
  if (op.kind === 'swap') return new Q(-1);
  if (op.kind === 'scale') return op.k;
  if (op.kind === 'combo') return op.c;
  return ONE;
}

// Forward elimination: first non-zero entry as pivot, no scaling.
// cols: only the first `cols` columns hold pivots (augmented matrices).
export function echelon(A, { cols } = {}) {
  const E = clone(A);
  const [m, n] = dims(E);
  const last = cols ?? n;
  const ops = [];
  const pivots = [];
  let r = 0;
  for (let c = 0; c < last && r < m; c++) {
    let p = -1;
    for (let i = r; i < m; i++) if (E[i][c].n !== 0) { p = i; break; }
    if (p < 0) continue;
    if (p !== r) {
      const op = { kind: 'swap', i: r, j: p };
      ops.push(op);
      [E[r], E[p]] = [E[p], E[r]];
    }
    for (let i = r + 1; i < m; i++) {
      if (E[i][c].n === 0) continue;
      const op = { kind: 'add', i, j: r, k: E[i][c].div(E[r][c]).neg() };
      ops.push(op);
      const row = E[r];
      E[i] = E[i].map((x, cc) => x.add(op.k.mul(row[cc])));
    }
    pivots.push(c);
    r++;
  }
  return { E, pivots, ops };
}

// Reduced row echelon form: echelon, then pivots to 1 and back substitution
// from the last pivot up.
export function rref(A, { cols } = {}) {
  const { E, pivots, ops } = echelon(A, { cols });
  const R = E;
  for (let r = pivots.length - 1; r >= 0; r--) {
    const c = pivots[r];
    if (!R[r][c].eq(1)) {
      const op = { kind: 'scale', i: r, k: R[r][c].inv() };
      ops.push(op);
      R[r] = R[r].map((x) => x.mul(op.k));
    }
    for (let i = r - 1; i >= 0; i--) {
      if (R[i][c].n === 0) continue;
      const op = { kind: 'add', i, j: r, k: R[i][c].neg() };
      ops.push(op);
      const row = R[r];
      R[i] = R[i].map((x, cc) => x.add(op.k.mul(row[cc])));
    }
  }
  return { R, pivots, ops };
}

export const rank = (A) => echelon(A).pivots.length;

// Gaussian elimination with the determinant factor.
export function det(A) {
  const n = A.length;
  if (n === 0) return ONE;
  if (A.some((r) => r.length !== n)) throw new RangeError('Matrice non carrée');
  const M = clone(A);
  let d = ONE;
  for (let c = 0; c < n; c++) {
    let p = -1;
    for (let i = c; i < n; i++) if (M[i][c].n !== 0) { p = i; break; }
    if (p < 0) return ZERO;
    if (p !== c) { [M[c], M[p]] = [M[p], M[c]]; d = d.neg(); }
    d = d.mul(M[c][c]);
    for (let i = c + 1; i < n; i++) {
      if (M[i][c].n === 0) continue;
      const f = M[i][c].div(M[c][c]);
      M[i] = M[i].map((x, cc) => x.sub(f.mul(M[c][cc])));
    }
  }
  return d;
}

export function inverse(A) {
  const n = A.length;
  const { R, pivots } = rref(hcat(A, identity(n)), { cols: n });
  if (pivots.length < n || pivots.some((c, i) => c !== i)) return null;
  return R.map((r) => r.slice(n));
}

// Basis of the kernel: one vector per free column, that variable = 1.
export function kernel(A) {
  const n = A[0]?.length ?? 0;
  const { R, pivots } = rref(A);
  const free = [];
  for (let c = 0; c < n; c++) if (!pivots.includes(c)) free.push(c);
  return free.map((f) => {
    const v = Array.from({ length: n }, () => ZERO);
    v[f] = ONE;
    pivots.forEach((c, r) => { v[c] = R[r][f].neg(); });
    return v;
  });
}

export const pivotColumns = (A, opts) => echelon(A, opts).pivots;
export const colBasis = (A) => pivotColumns(A).map((j) => col(A, j));
export const rowBasis = (A) => rref(A).R.filter((r) => r.some((x) => x.n !== 0));

// Coefficients of det(A − λI), λ⁰ first (Faddeev–LeVerrier gives
// det(λI − A) = λⁿ + c₁λⁿ⁻¹ + … + cₙ).
export function charpoly(A) {
  const n = A.length;
  let M = zeros(n, n);
  const c = [ONE];
  for (let k = 1; k <= n; k++) {
    M = add(mul(A, M), scale(identity(n), c[k - 1]));
    const AM = mul(A, M);
    c.push(trace(AM).div(new Q(-k)));
  }
  // det(λI − A) = Σ c[k] λ^(n−k); det(A − λI) = (−1)ⁿ·that.
  const sign = n % 2 ? new Q(-1) : ONE;
  const out = [];
  for (let p = 0; p <= n; p++) out.push(c[n - p].mul(sign));
  return out;
}

// Rational eigenvalues with their algebraic multiplicities (roots of the
// characteristic polynomial found among p/q, p | c₀, q | lead).
export function rationalEigen(A) {
  let cs = charpoly(A);
  const out = [];
  const divs = (k) => {
    const a = Math.abs(k);
    const ds = [];
    for (let d = 1; d <= a; d++) if (a % d === 0) ds.push(d);
    return ds;
  };
  const evalAt = (cs2, x) => cs2.reduceRight((s, c) => s.mul(x).add(c), ZERO);
  const deflate = (cs2, x) => {
    const n = cs2.length - 1;
    const b = [];
    let acc = ZERO;
    for (let k = n; k >= 1; k--) { acc = acc.mul(x).add(cs2[k]); b.unshift(acc); }
    return b;
  };
  let guard = 0;
  while (cs.length > 1 && guard++ < 20) {
    if (cs[0].n === 0) { addRoot(out, ZERO); cs = cs.slice(1); continue; }
    // Clear denominators.
    let L = 1;
    for (const c of cs) L = (L * c.d) / gcdInt(L, c.d);
    const ints = cs.map((c) => c.mul(L).n);
    const cands = [];
    for (const p of divs(ints[0])) for (const d of divs(ints[ints.length - 1])) { cands.push(new Q(p, d)); cands.push(new Q(-p, d)); }
    const r = cands.find((x) => evalAt(cs, x).n === 0);
    if (!r) break;
    addRoot(out, r);
    cs = deflate(cs, r);
  }
  return { roots: out, rest: cs };
}

function addRoot(out, r) {
  const e = out.find((x) => x.value.eq(r));
  if (e) e.mult++; else out.push({ value: r, mult: 1 });
}

function gcdInt(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

// ---------- recognising operations ----------

const rowEq = (a, b) => a.every((x, c) => x.eq(b[c]));
const rowZero = (a) => a.every((x) => x.n === 0);

// k with a = k·b (b non-zero), or null.
function ratio(a, b) {
  let k = null;
  for (let c = 0; c < a.length; c++) {
    if (b[c].n === 0) { if (a[c].n !== 0) return null; continue; }
    const r = a[c].div(b[c]);
    if (k === null) k = r; else if (!k.eq(r)) return null;
  }
  return k;
}

// a = c·x + k·y for some c, k: solved on two columns where x, y are independent.
function combo2(a, x, y) {
  const n = a.length;
  for (let p = 0; p < n; p++) {
    for (let r = p + 1; r < n; r++) {
      const d = x[p].mul(y[r]).sub(x[r].mul(y[p]));
      if (d.n === 0) continue;
      const c = a[p].mul(y[r]).sub(a[r].mul(y[p])).div(d);
      const k = x[p].mul(a[r]).sub(x[r].mul(a[p])).div(d);
      return a.every((v, i) => v.eq(c.mul(x[i]).add(k.mul(y[i])))) ? { c, k } : null;
    }
  }
  return null;
}

// B = op(A) for one elementary operation (or a combo Lᵢ ← cLᵢ + kLⱼ)?
export function identifyRowOp(A, B) {
  if (A.length !== B.length || A.some((r, i) => r.length !== B[i].length)) return null;
  const diff = [];
  for (let i = 0; i < A.length; i++) if (!rowEq(A[i], B[i])) diff.push(i);
  if (diff.length === 0) return null;
  if (diff.length === 2) {
    const [i, j] = diff;
    if (rowEq(A[i], B[j]) && rowEq(A[j], B[i])) return { kind: 'swap', i, j };
    return null;
  }
  if (diff.length !== 1) return null;
  const i = diff[0];
  if (rowZero(A[i])) return null;
  const k = ratio(B[i], A[i]);
  if (k && k.n !== 0) return { kind: 'scale', i, k };
  for (let j = 0; j < A.length; j++) {
    if (j === i || rowZero(A[j])) continue;
    const d = B[i].map((x, c) => x.sub(A[i][c]));
    const kk = ratio(d, A[j]);
    if (kk && kk.n !== 0) return { kind: 'add', i, j, k: kk };
  }
  for (let j = 0; j < A.length; j++) {
    if (j === i || rowZero(A[j])) continue;
    const r = combo2(B[i], A[i], A[j]);
    if (r && r.c.n !== 0 && r.k.n !== 0 && !r.c.eq(1)) return { kind: 'combo', i, c: r.c, j, k: r.k };
  }
  return null;
}

export const rowEquivalent = (A, B) => A.length === B.length && equal(rref(A).R, rref(B).R);

// ---------- shapes ----------

// Echelon: each pivot right of the one above, zero rows at the bottom.
export function isEchelon(A, { cols } = {}) {
  let last = -1;
  let zeroSeen = false;
  const n = cols ?? A[0]?.length ?? 0;
  for (const r of A) {
    const c = r.slice(0, n).findIndex((x) => x.n !== 0);
    if (c < 0) { zeroSeen = true; continue; }
    if (zeroSeen || c <= last) return false;
    last = c;
  }
  return true;
}

export function isRref(A, { cols } = {}) {
  if (!isEchelon(A, { cols })) return false;
  const n = cols ?? A[0]?.length ?? 0;
  for (let i = 0; i < A.length; i++) {
    const c = A[i].slice(0, n).findIndex((x) => x.n !== 0);
    if (c < 0) continue;
    if (!A[i][c].eq(1)) return false;
    for (let k = 0; k < A.length; k++) if (k !== i && A[k][c].n !== 0) return false;
  }
  return true;
}

export const isUpper = (A) => A.every((r, i) => r.every((x, j) => j >= i || x.n === 0));
export const isLower = (A) => A.every((r, i) => r.every((x, j) => j <= i || x.n === 0));
export const isDiagonal = (A) => isUpper(A) && isLower(A);
export const isSymmetric = (A) => A.length === A[0]?.length && A.every((r, i) => r.every((x, j) => x.eq(A[j][i])));

// ---------- factorisations ----------

// A = LU without exchanges (null if a zero pivot is met).
export function lu(A) {
  const n = A.length;
  const U = clone(A);
  const L = identity(n);
  for (let c = 0; c < n; c++) {
    if (U[c][c].n === 0) {
      if (U.slice(c + 1).some((r) => r[c].n !== 0)) return null;
      continue;
    }
    for (let i = c + 1; i < n; i++) {
      const l = U[i][c].div(U[c][c]);
      L[i][c] = l;
      U[i] = U[i].map((x, cc) => x.sub(l.mul(U[c][cc])));
    }
  }
  return { L, U };
}

// PA = LU with row exchanges when a pivot is zero.
export function plu(A) {
  const n = A.length;
  const U = clone(A);
  const L = zeros(n, n);
  let perm = Array.from({ length: n }, (_, i) => i);
  for (let c = 0; c < n; c++) {
    let p = -1;
    for (let i = c; i < n; i++) if (U[i][c].n !== 0) { p = i; break; }
    if (p < 0) continue;
    if (p !== c) {
      [U[c], U[p]] = [U[p], U[c]];
      [L[c], L[p]] = [L[p], L[c]];
      [perm[c], perm[p]] = [perm[p], perm[c]];
    }
    for (let i = c + 1; i < n; i++) {
      const l = U[i][c].div(U[c][c]);
      L[i][c] = l;
      U[i] = U[i].map((x, cc) => x.sub(l.mul(U[c][cc])));
    }
  }
  for (let i = 0; i < n; i++) L[i][i] = ONE;
  const P = perm.map((r) => Array.from({ length: n }, (_, j) => (j === r ? ONE : ZERO)));
  return { P, L, U };
}

// Gram-Schmidt on the columns of A, exact: vⱼ = xⱼ − Σ C[i][j]·vᵢ, with
// C[i][j] = xⱼ·vᵢ / vᵢ·vᵢ. Null if the columns are dependent.
export function qrGS(A) {
  const X = transpose(A);
  const V = [];
  const n = X.length;
  const C = zeros(n, n);
  for (let j = 0; j < n; j++) {
    let v = [...X[j]];
    for (let i = 0; i < j; i++) {
      const c = dot(X[j], V[i]).div(dot(V[i], V[i]));
      C[i][j] = c;
      v = v.map((x, k) => x.sub(c.mul(V[i][k])));
    }
    if (v.every((x) => x.n === 0)) return null;
    V.push(v);
    C[j][j] = ONE;
  }
  return { V: fromCols(V), C, norms2: V.map((v) => dot(v, v)) };
}

// A = LLᵀ: exact when every square root is rational, else floating point.
export function cholesky(A) {
  const n = A.length;
  if (!isSymmetric(A)) return null;
  const L = zeros(n, n);
  let exact = true;
  const F = Array.from({ length: n }, () => Array(n).fill(0));
  for (let j = 0; j < n; j++) {
    let s = A[j][j];
    for (let k = 0; k < j; k++) s = s.sub(L[k] && exact ? L[j][k].mul(L[j][k]) : ZERO);
    let fs = A[j][j].valueOf();
    for (let k = 0; k < j; k++) fs -= F[j][k] * F[j][k];
    if (fs <= 1e-12) return null;
    F[j][j] = Math.sqrt(fs);
    const r = exact ? s.sqrt() : null;
    if (!r) exact = false; else L[j][j] = r;
    for (let i = j + 1; i < n; i++) {
      let t = A[i][j].valueOf();
      for (let k = 0; k < j; k++) t -= F[i][k] * F[j][k];
      F[i][j] = t / F[j][j];
      if (exact) {
        let e = A[i][j];
        for (let k = 0; k < j; k++) e = e.sub(L[i][k].mul(L[j][k]));
        L[i][j] = e.div(L[j][j]);
      }
    }
  }
  return exact ? { L, exact: true } : { L: F, exact: false };
}

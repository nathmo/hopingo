// Floating-point linear algebra (spec §4.3, step U8): what module M
// (analyse matricielle) computes, and module N (analyse numérique, step U9)
// reuses: norms, condition numbers, Cholesky, the power method and the
// Rayleigh quotient, SVD, eigenvalues, the matrix exponential.
//
// Exact matrices over ℚ stay in js/cas/matrix.js. Here a matrix is an
// array of rows of numbers; every function also takes rows of Q (or of
// numeric strings), converted by toF. Vectors are plain arrays. Nothing
// here throws on a singular or indefinite matrix: the functions return
// null (solve, inv, cholesky) or Infinity (cond).
//
// API (n × n unless said):
//   toF(A) → number[][]              toFv(v) → number[]
//   identity(n)  zeros(m, n)  transpose(A)  matmul(A, B)  matvec(A, x)
//   madd(A, B, s = 1) → A + s·B      mscale(A, k)      dot(u, v)
//   vnorm(x, p = 2)                  p ∈ 1 | 2 | Infinity ('inf')
//   norm(A, p = 2)                   p ∈ 1 | 2 | Infinity ('inf') | 'fro' (m × n)
//   lu(A) → {L, U, perm, sign} | null   (partial pivoting, PA = LU)
//   solve(A, b) → x | null           b a vector, or a matrix (one column each)
//   inv(A) → A⁻¹ | null              det(A)
//   cholesky(A) → L | null           A = LLᵀ, L lower with a positive diagonal;
//                                    null if A is not symmetric positive definite
//   choleskySolve(L, b) → x          Ly = b, then Lᵀx = y
//   eigSym(A) → {values, vectors}    symmetric A (Jacobi): values increasing,
//                                    vectors[:, i] (columns) orthonormal
//   eig(A) → [{re, im}]              any square A (n ≤ 8): the roots of the
//                                    characteristic polynomial, by decreasing
//                                    modulus (then decreasing real part)
//   charpolyF(A) → [c₀, …, cₙ]       det(λI − A) = Σ cₖλᵏ, cₙ = 1 (Faddeev-LeVerrier)
//   spectralRadius(A) → ρ(A)
//   svd(A) → {U, S, V}               m × n, p = min(m, n): U m × p, S the p
//                                    singular values decreasing, V n × p,
//                                    A = U·diag(S)·Vᵀ (one-sided Jacobi)
//   singularValues(A) → S            rank(A, tol?)
//   cond(A, p = 2) → ‖A‖·‖A⁻¹‖        p = 2: σmax/σmin (also m × n, full rank);
//                                    Infinity if A is singular
//   lowRank(A, k) → {Ak, err2, errF} best rank-k approximation (Eckart-Young):
//                                    ‖A − Ak‖₂ = σₖ₊₁, ‖A − Ak‖_F = √(Σ_{i>k} σᵢ²)
//   expm(A, t = 1) → e^{At}          scaling and squaring with a Taylor series
//   rayleigh(A, x) → xᵀAx / xᵀx
//   powerMethod(A, y0, opts) → {value, vector, iterations, converged}
//     opts: {steps = 100, tol = 1e-12, normalize: 'max' | '2', shift = 0,
//            inverse = false}. One step: z = Ay (inverse: (A − shift·I)z = y),
//     μ = the entry of z of largest modulus ('max', the course's
//     convention: y_{k+1} = z/μ, μ → λ₁) or the Rayleigh quotient yᵀz/yᵀy
//     ('2', y_{k+1} = z/‖z‖₂). iterations: [{k, y, z, mu}]. With inverse,
//     μ → 1/(λ − shift) and value = shift + 1/μ (the eigenvalue nearest to
//     shift); else value = μ.
//   inversePower(A, y0, shift = 0, opts) → powerMethod with inverse: true
//   gershgorin(A, by = 'rows') → [{center, radius}]   radius without aᵢᵢ
//   close(a, b, tol = 1e-9) → |a − b| ≤ tol·(1 + |a| + |b|)

const EPS = 2.220446049250313e-16;

// ---------- conversion and basic operations ----------

const numOf = (x) => {
  if (typeof x === 'number') return x;
  if (x && typeof x.valueOf === 'function' && typeof x.valueOf() === 'number') return x.valueOf();
  if (typeof x === 'string') {
    const t = x.replace(/−/g, '-').trim();
    const m = /^(-?\d+(?:\.\d+)?)(?:\/(-?\d+(?:\.\d+)?))?$/.exec(t);
    if (m) return Number(m[1]) / (m[2] ? Number(m[2]) : 1);
  }
  return Number(x);
};
export const toF = (A) => A.map((r) => r.map(numOf));
export const toFv = (v) => v.map((x) => (Array.isArray(x) ? numOf(x[0]) : numOf(x)));

export const identity = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
export const zeros = (m, n) => Array.from({ length: m }, () => Array(n).fill(0));
export const transpose = (A) => (A.length ? A[0].map((_, j) => A.map((r) => r[j])) : []);
export const dot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
export function matmul(A0, B0) {
  const A = toF(A0);
  const B = toF(B0);
  return A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
}
export const matvec = (A0, x0) => { const x = toFv(x0); return toF(A0).map((r) => dot(r, x)); };
export const madd = (A0, B0, s = 1) => { const B = toF(B0); return toF(A0).map((r, i) => r.map((x, j) => x + s * B[i][j])); };
export const mscale = (A0, k) => toF(A0).map((r) => r.map((x) => x * k));
export const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol * (1 + Math.abs(a) + Math.abs(b));

const isInf = (p) => p === Infinity || p === 'inf' || p === '∞';

export function vnorm(x0, p = 2) {
  const x = toFv(x0);
  if (isInf(p)) return Math.max(0, ...x.map(Math.abs));
  if (p === 1) return x.reduce((s, v) => s + Math.abs(v), 0);
  return Math.hypot(...x);
}

// ---------- norms ----------

export function norm(A0, p = 2) {
  const A = toF(A0);
  if (p === 1) return Math.max(0, ...transpose(A).map((c) => c.reduce((s, x) => s + Math.abs(x), 0)));
  if (isInf(p)) return Math.max(0, ...A.map((r) => r.reduce((s, x) => s + Math.abs(x), 0)));
  if (p === 'fro' || p === 'F') return Math.sqrt(A.flat().reduce((s, x) => s + x * x, 0));
  return singularValues(A)[0] ?? 0;
}

// ---------- LU, solving, inverse, determinant ----------

export function lu(A0) {
  const U = toF(A0).map((r) => [...r]);
  const n = U.length;
  const L = identity(n);
  const perm = [...Array(n).keys()];
  let sign = 1;
  const scale = Math.max(1e-300, ...U.flat().map(Math.abs));
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let i = c + 1; i < n; i++) if (Math.abs(U[i][c]) > Math.abs(U[p][c])) p = i;
    if (Math.abs(U[p][c]) <= 1e-13 * scale) return null;
    if (p !== c) {
      [U[p], U[c]] = [U[c], U[p]];
      [perm[p], perm[c]] = [perm[c], perm[p]];
      for (let j = 0; j < c; j++) [L[p][j], L[c][j]] = [L[c][j], L[p][j]];
      sign = -sign;
    }
    for (let i = c + 1; i < n; i++) {
      const f = U[i][c] / U[c][c];
      L[i][c] = f;
      for (let j = c; j < n; j++) U[i][j] -= f * U[c][j];
      U[i][c] = 0;
    }
  }
  return { L, U, perm, sign };
}

function luSolveVec({ L, U, perm }, b) {
  const n = L.length;
  const y = perm.map((p) => b[p]);
  for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) y[i] -= L[i][j] * y[j];
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = y[i];
    for (let j = i + 1; j < n; j++) s -= U[i][j] * x[j];
    x[i] = s / U[i][i];
  }
  return x;
}

export function solve(A0, b0) {
  const f = lu(A0);
  if (!f) return null;
  if (Array.isArray(b0[0]) && b0[0].length > 1) {
    const B = toF(b0);
    return transpose(transpose(B).map((c) => luSolveVec(f, c)));
  }
  return luSolveVec(f, toFv(b0));
}

export function inv(A0) {
  const n = A0.length;
  const f = lu(A0);
  if (!f) return null;
  return transpose(identity(n).map((e) => luSolveVec(f, e)));
}

export function det(A0) {
  const f = lu(A0);
  if (!f) return 0;
  return f.sign * f.U.reduce((s, r, i) => s * r[i], 1);
}

// ---------- Cholesky ----------

export function cholesky(A0) {
  const A = toF(A0);
  const n = A.length;
  const scale = Math.max(1e-300, ...A.flat().map(Math.abs));
  for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) if (!close(A[i][j], A[j][i], 1e-12)) return null;
  const L = zeros(n, n);
  for (let k = 0; k < n; k++) {
    let d = A[k][k];
    for (let j = 0; j < k; j++) d -= L[k][j] ** 2;
    if (!(d > 1e-14 * scale)) return null;
    L[k][k] = Math.sqrt(d);
    for (let i = k + 1; i < n; i++) {
      let s = A[i][k];
      for (let j = 0; j < k; j++) s -= L[i][j] * L[k][j];
      L[i][k] = s / L[k][k];
    }
  }
  return L;
}

export function choleskySolve(L, b0) {
  const b = toFv(b0);
  const n = L.length;
  const y = Array(n).fill(0);
  for (let i = 0; i < n; i++) { let s = b[i]; for (let j = 0; j < i; j++) s -= L[i][j] * y[j]; y[i] = s / L[i][i]; }
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) { let s = y[i]; for (let j = i + 1; j < n; j++) s -= L[j][i] * x[j]; x[i] = s / L[i][i]; }
  return x;
}

// ---------- symmetric eigenproblem (cyclic Jacobi) ----------

export function eigSym(A0) {
  const A = toF(A0).map((r) => [...r]);
  const n = A.length;
  const V = identity(n);
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] ** 2;
    const total = A.flat().reduce((s, x) => s + x * x, 0);
    if (off <= EPS * EPS * Math.max(total, 1e-300)) break;
    for (let p = 0; p < n; p++) {
      for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const theta = (A[q][q] - A[p][p]) / (2 * A[p][q]);
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1);
        const s = t * c;
        for (let k = 0; k < n; k++) {
          const akp = A[k][p];
          const akq = A[k][q];
          A[k][p] = c * akp - s * akq;
          A[k][q] = s * akp + c * akq;
        }
        for (let k = 0; k < n; k++) {
          const apk = A[p][k];
          const aqk = A[q][k];
          A[p][k] = c * apk - s * aqk;
          A[q][k] = s * apk + c * aqk;
        }
        for (let k = 0; k < n; k++) {
          const vkp = V[k][p];
          const vkq = V[k][q];
          V[k][p] = c * vkp - s * vkq;
          V[k][q] = s * vkp + c * vkq;
        }
      }
    }
  }
  const order = [...Array(n).keys()].sort((a, b) => A[a][a] - A[b][b]);
  return { values: order.map((i) => A[i][i]), vectors: V.map((r) => order.map((i) => r[i])) };
}

// ---------- general eigenvalues (roots of the characteristic polynomial) ----------

// det(λI − A) = Σ cₖλᵏ (Faddeev-LeVerrier), coefficients from λ⁰ up.
export function charpolyF(A0) {
  const A = toF(A0);
  const n = A.length;
  const c = Array(n + 1).fill(0);
  c[n] = 1;
  let M = zeros(n, n);
  for (let k = 1; k <= n; k++) {
    // M_k = A·M_{k−1} + c_{n−k+1}·I ; c_{n−k} = −tr(A·M_k)/k
    M = madd(matmul(A, M), identity(n), c[n - k + 1]);
    const AM = matmul(A, M);
    c[n - k] = -AM.reduce((s, r, i) => s + r[i], 0) / k;
  }
  return c;
}

// Roots of a real polynomial (coefficients from x⁰ up, leading ≠ 0) by
// Durand-Kerner, then a few Newton steps on each root.
function polyRootsF(cs0) {
  let cs = [...cs0];
  while (cs.length > 1 && cs[cs.length - 1] === 0) cs.pop();
  const n = cs.length - 1;
  if (n < 1) return [];
  const lead = cs[n];
  cs = cs.map((x) => x / lead);
  const cmul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
  const csub = (a, b) => ({ re: a.re - b.re, im: a.im - b.im });
  const cdiv = (a, b) => { const d = b.re * b.re + b.im * b.im; return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d }; };
  const evalP = (z) => { let s = { re: 1, im: 0 }; for (let k = n - 1; k >= 0; k--) s = { re: s.re * z.re - s.im * z.im + cs[k], im: s.re * z.im + s.im * z.re }; return s; };
  const evalD = (z) => { let s = { re: n, im: 0 }; for (let k = n - 1; k >= 1; k--) s = { re: s.re * z.re - s.im * z.im + k * cs[k], im: s.re * z.im + s.im * z.re }; return s; };
  const R = 1 + Math.max(...cs.slice(0, n).map(Math.abs));
  let z = Array.from({ length: n }, (_, k) => ({ re: R * 0.9 * Math.cos(0.4 + (2 * Math.PI * k) / n), im: R * 0.9 * Math.sin(0.4 + (2 * Math.PI * k) / n) }));
  for (let it = 0; it < 2000; it++) {
    let moved = 0;
    z = z.map((zi, i) => {
      let den = { re: 1, im: 0 };
      z.forEach((zj, j) => { if (j !== i) den = cmul(den, csub(zi, zj)); });
      const step = cdiv(evalP(zi), den);
      moved = Math.max(moved, Math.hypot(step.re, step.im));
      return csub(zi, step);
    });
    if (moved < 1e-15 * R) break;
  }
  z = z.map((zi) => {
    let x = zi;
    for (let k = 0; k < 3; k++) { const d = evalD(x); if (Math.hypot(d.re, d.im) < 1e-300) break; x = csub(x, cdiv(evalP(x), d)); }
    return x;
  });
  // Snap tiny imaginary parts (real roots) and pair the conjugates.
  return z.map((x) => (Math.abs(x.im) <= 1e-9 * (1 + Math.abs(x.re)) ? { re: x.re, im: 0 } : x));
}

export function eig(A0) {
  const A = toF(A0);
  if (A.length === 1) return [{ re: A[0][0], im: 0 }];
  const sym = A.every((r, i) => r.every((x, j) => close(x, A[j][i], 1e-14)));
  const vals = sym ? eigSym(A).values.map((re) => ({ re, im: 0 })) : polyRootsF(charpolyF(A));
  return vals.sort((a, b) => Math.hypot(b.re, b.im) - Math.hypot(a.re, a.im) || b.re - a.re || b.im - a.im);
}

export const spectralRadius = (A) => Math.max(0, ...eig(A).map((z) => Math.hypot(z.re, z.im)));

// ---------- SVD (one-sided Jacobi) ----------

export function svd(A0) {
  const A = toF(A0);
  const m = A.length;
  const n = A[0]?.length ?? 0;
  if (m < n) {
    const t = svd(transpose(A));
    return { U: t.V, S: t.S, V: t.U };
  }
  // m ≥ n: rotate the columns of W = A·V until they are orthogonal.
  const W = A.map((r) => [...r]);
  const V = identity(n);
  for (let sweep = 0; sweep < 80; sweep++) {
    let rotated = false;
    for (let p = 0; p < n; p++) {
      for (let q = p + 1; q < n; q++) {
        let a = 0;
        let b = 0;
        let g = 0;
        for (let i = 0; i < m; i++) { a += W[i][p] ** 2; b += W[i][q] ** 2; g += W[i][p] * W[i][q]; }
        if (Math.abs(g) <= EPS * Math.sqrt(a * b) || g === 0) continue;
        rotated = true;
        const zeta = (b - a) / (2 * g);
        const t = Math.sign(zeta || 1) / (Math.abs(zeta) + Math.sqrt(1 + zeta * zeta));
        const c = 1 / Math.sqrt(1 + t * t);
        const s = c * t;
        for (let i = 0; i < m; i++) { const x = W[i][p]; const y = W[i][q]; W[i][p] = c * x - s * y; W[i][q] = s * x + c * y; }
        for (let i = 0; i < n; i++) { const x = V[i][p]; const y = V[i][q]; V[i][p] = c * x - s * y; V[i][q] = s * x + c * y; }
      }
    }
    if (!rotated) break;
  }
  const sig = [...Array(n).keys()].map((j) => Math.sqrt(W.reduce((s, r) => s + r[j] ** 2, 0)));
  const order = [...Array(n).keys()].sort((a, b) => sig[b] - sig[a]);
  const S = order.map((j) => sig[j]);
  const Vs = V.map((r) => order.map((j) => r[j]));
  const tol = Math.max(m, n) * EPS * (S[0] || 0);
  // U: the normalised columns of AV; columns of a zero σ completed into an
  // orthonormal family (Gram-Schmidt on the standard basis).
  const cols = [];
  order.forEach((j, k) => {
    if (S[k] > tol) cols.push(W.map((r) => r[j] / S[k]));
    else cols.push(null);
  });
  for (let k = 0; k < cols.length; k++) {
    if (cols[k]) continue;
    for (let e = 0; e < m; e++) {
      let v = Array.from({ length: m }, (_, i) => (i === e ? 1 : 0));
      for (const u of cols) if (u) { const d = dot(u, v); v = v.map((x, i) => x - d * u[i]); }
      const nv = Math.hypot(...v);
      if (nv > 1e-6) { cols[k] = v.map((x) => x / nv); break; }
    }
    S[k] = S[k] > tol ? S[k] : 0;
  }
  return { U: transpose(cols), S, V: Vs };
}

export const singularValues = (A) => svd(A).S;

export function rank(A, tol = null) {
  const S = singularValues(A);
  const t = tol ?? Math.max(A.length, A[0]?.length ?? 0) * 1e-12 * (S[0] || 0);
  return S.filter((s) => s > t).length;
}

export function cond(A0, p = 2) {
  const A = toF(A0);
  if (p === 2 || p === undefined) {
    const S = singularValues(A);
    const lo = S[S.length - 1];
    if (!(lo > 1e-14 * (S[0] || 0))) return Infinity;
    return S[0] / lo;
  }
  const Ai = inv(A);
  if (!Ai) return Infinity;
  return norm(A, p) * norm(Ai, p);
}

export function lowRank(A0, k) {
  const { U, S, V } = svd(A0);
  const A = toF(A0);
  const Ak = A.map((r, i) => r.map((_, j) => {
    let s = 0;
    for (let l = 0; l < Math.min(k, S.length); l++) s += S[l] * U[i][l] * V[j][l];
    return s;
  }));
  const rest = S.slice(k);
  return { Ak, err2: rest[0] ?? 0, errF: Math.sqrt(rest.reduce((s, x) => s + x * x, 0)), S };
}

// ---------- matrix exponential ----------

export function expm(A0, t = 1) {
  const A = mscale(A0, t);
  const n = A.length;
  // Scale so that ‖A/2ˢ‖₁ ≤ 1/2, sum the Taylor series, square s times.
  const nrm = norm(A, 1);
  let s = 0;
  if (nrm > 0.5) s = Math.ceil(Math.log2(nrm / 0.5));
  const B = mscale(A, 2 ** -s);
  let E = identity(n);
  let term = identity(n);
  for (let k = 1; k <= 30; k++) {
    term = mscale(matmul(term, B), 1 / k);
    E = madd(E, term);
    if (norm(term, 1) <= EPS * norm(E, 1)) break;
  }
  for (let i = 0; i < s; i++) E = matmul(E, E);
  return E;
}

// ---------- Rayleigh quotient, power method ----------

export function rayleigh(A0, x0) {
  const x = toFv(x0);
  return dot(x, matvec(A0, x)) / dot(x, x);
}

const maxEntry = (z) => z.reduce((best, x) => (Math.abs(x) > Math.abs(best) + 1e-14 * Math.abs(best) ? x : best), 0);

export function powerMethod(A0, y00, { steps = 100, tol = 1e-12, normalize = 'max', shift = 0, inverse = false } = {}) {
  const A = toF(A0);
  const n = A.length;
  const M = shift ? madd(A, identity(n), -shift) : A;
  const f = inverse ? lu(M) : null;
  if (inverse && !f) return { value: shift, vector: toFv(y00), iterations: [], converged: false, singular: true };
  let y = toFv(y00);
  if (normalize === '2') { const ny = Math.hypot(...y); y = y.map((x) => x / ny); }
  const iterations = [];
  let mu = NaN;
  let converged = false;
  for (let k = 0; k < steps; k++) {
    const z = inverse ? luSolveVec(f, y) : matvec(M, y);
    const muNew = normalize === '2' ? dot(y, z) / dot(y, y) : maxEntry(z);
    iterations.push({ k, y, z, mu: muNew });
    if (!muNew) break;
    const yNext = normalize === '2' ? z.map((x) => x / Math.hypot(...z)) : z.map((x) => x / muNew);
    const done = Number.isFinite(mu) && Math.abs(muNew - mu) <= tol * (1 + Math.abs(muNew));
    mu = muNew;
    y = yNext;
    if (done) { converged = true; break; }
  }
  const value = inverse ? shift + 1 / mu : mu + shift;
  return { value, vector: y, iterations, converged };
}

export const inversePower = (A, y0, shift = 0, opts = {}) => powerMethod(A, y0, { ...opts, shift, inverse: true });

// ---------- Gershgorin ----------

export function gershgorin(A0, by = 'rows') {
  const A = by === 'cols' ? transpose(toF(A0)) : toF(A0);
  return A.map((r, i) => ({ center: r[i], radius: r.reduce((s, x, j) => s + (j === i ? 0 : Math.abs(x)), 0) }));
}

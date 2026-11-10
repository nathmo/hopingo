// Probability laws and statistical tables (spec §4.3, step U7): the normal
// law (Φ, Φ⁻¹), Student, χ², Fisher, binomial and Poisson laws, and the
// printed tables of the course formularies (docs/universite/P-probabilites.md,
// « Tables »), which the items show and the judges accept as they are.
//
//   Phi(z)  PhiInv(p)  tCdf(t, ν)  tInv(p, ν)  chi2Cdf(x, r)  chi2Inv(p, r)
//   fCdf(x, m, n)  fInv(p, m, n)  binom(n, k, p)  binomCdf(n, k, p)
//   poisson(k, λ)  poissonCdf(k, λ)  choose(n, k)  arrange(n, k)  fact(n)
//   roundCI(lo, hi, digits)  ciRound(θ̂, u)  sigRound(u, k)
//   Tables: phiTable(z), phiInvTable(p), studentTable(ν, level), chi2Table(r, level),
//   EE_Z, EE_T, PHI_GRID, STUDENT_DF, CHI2_DF; phiAccepted(z): the values a
//   reading of Table 1 may give (convention 3).
//
// Floating point throughout; the precision is about 1e−14 for Φ and its
// inverse, 1e−10 for the incomplete beta and gamma functions.

// ---------- special functions ----------

const SQRT2 = Math.SQRT2;
const LN_SQRT_2PI = 0.5 * Math.log(2 * Math.PI);

// ln Γ(x), Lanczos (g = 7, n = 9), x > 0.
const LANCZOS = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
  -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
export function lnGamma(x) {
  if (x < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - lnGamma(1 - x);
  x -= 1;
  let a = LANCZOS[0];
  const t = x + 7.5;
  for (let i = 1; i < 9; i++) a += LANCZOS[i] / (x + i);
  return LN_SQRT_2PI + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
export const gammaFn = (x) => (Number.isInteger(x) && x > 0 && x < 171 ? fact(x - 1) : Math.exp(lnGamma(x)));

// erfc(x) for x ≥ 0: Taylor series of erf below 3, continued fraction above.
function erfcPos(x) {
  if (x < 3) {
    // erf(x) = 2/√π Σ (−1)ⁿ x^(2n+1)/(n!(2n+1))
    let term = x;
    let sum = x;
    for (let n = 1; n < 200; n++) {
      term *= (-x * x) / n;
      const add = term / (2 * n + 1);
      sum += add;
      if (Math.abs(add) < 1e-17 * Math.abs(sum)) break;
    }
    return 1 - (2 / Math.sqrt(Math.PI)) * sum;
  }
  // erfc(x) = e^(−x²)/√π · 1/(x + 1/2/(x + 1/(x + 3/2/(x + …)))) (Lentz).
  const tiny = 1e-300;
  let f = x;
  let C = x;
  let D = 0;
  for (let n = 1; n < 500; n++) {
    const an = n / 2;
    D = x + an * D;
    D = Math.abs(D) < tiny ? tiny : D;
    C = x + an / C;
    C = Math.abs(C) < tiny ? tiny : C;
    D = 1 / D;
    const delta = C * D;
    f *= delta;
    if (Math.abs(delta - 1) < 1e-16) break;
  }
  return Math.exp(-x * x) / (Math.sqrt(Math.PI) * f);
}
export const erfc = (x) => (x >= 0 ? erfcPos(x) : 2 - erfcPos(-x));
export const erf = (x) => 1 - erfc(x);

// ---------- normal law ----------

export function Phi(z) {
  if (!Number.isFinite(z)) return z > 0 ? 1 : 0;
  return z >= 0 ? 1 - 0.5 * erfcPos(z / SQRT2) : 0.5 * erfcPos(-z / SQRT2);
}
export const phiDensity = (z) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);

// Acklam's rational approximation, then two Halley steps.
const A = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.383577518672690e2, -3.066479806614716e1, 2.506628277459239];
const B = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
const C = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
const D = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
export function PhiInv(p) {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  const lo = 0.02425;
  let x;
  if (p < lo) {
    const q = Math.sqrt(-2 * Math.log(p));
    x = (((((C[0] * q + C[1]) * q + C[2]) * q + C[3]) * q + C[4]) * q + C[5]) / ((((D[0] * q + D[1]) * q + D[2]) * q + D[3]) * q + 1);
  } else if (p <= 1 - lo) {
    const q = p - 0.5;
    const r = q * q;
    x = ((((((A[0] * r + A[1]) * r + A[2]) * r + A[3]) * r + A[4]) * r + A[5]) * q) / (((((B[0] * r + B[1]) * r + B[2]) * r + B[3]) * r + B[4]) * r + 1);
  } else {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    x = -(((((C[0] * q + C[1]) * q + C[2]) * q + C[3]) * q + C[4]) * q + C[5]) / ((((D[0] * q + D[1]) * q + D[2]) * q + D[3]) * q + 1);
  }
  for (let k = 0; k < 2; k++) {
    const e = (x >= 0 ? -(0.5 * erfcPos(x / SQRT2)) + (1 - p) : 0.5 * erfcPos(-x / SQRT2) - p);
    // e = Φ(x) − p, computed on the side that keeps its digits.
    const u = e * Math.sqrt(2 * Math.PI) * Math.exp((x * x) / 2);
    x -= u / (1 + (x * u) / 2);
  }
  return x;
}

// ---------- incomplete beta and gamma ----------

// Continued fraction of the incomplete beta (Numerical Recipes, betacf).
function betacf(x, a, b) {
  const tiny = 1e-300;
  let c = 1;
  let d = 1 - ((a + b) * x) / (a + 1);
  d = Math.abs(d) < tiny ? tiny : d;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= 1000; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((a + m2 - 1) * (a + m2));
    d = 1 + aa * d; d = Math.abs(d) < tiny ? tiny : d;
    c = 1 + aa / c; c = Math.abs(c) < tiny ? tiny : c;
    d = 1 / d;
    h *= d * c;
    aa = (-(a + m) * (a + b + m) * x) / ((a + m2) * (a + m2 + 1));
    d = 1 + aa * d; d = Math.abs(d) < tiny ? tiny : d;
    c = 1 + aa / c; c = Math.abs(c) < tiny ? tiny : c;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-15) break;
  }
  return h;
}
// Regularized incomplete beta I_x(a, b).
export function betaInc(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const lbt = lnGamma(a + b) - lnGamma(a) - lnGamma(b) + a * Math.log(x) + b * Math.log(1 - x);
  if (x < (a + 1) / (a + b + 2)) return (Math.exp(lbt) * betacf(x, a, b)) / a;
  return 1 - (Math.exp(lbt) * betacf(1 - x, b, a)) / b;
}
// Regularized lower incomplete gamma P(a, x).
export function gammaInc(a, x) {
  if (x <= 0) return 0;
  if (x < a + 1) {
    let sum = 1 / a;
    let term = sum;
    for (let n = 1; n < 1000; n++) {
      term *= x / (a + n);
      sum += term;
      if (Math.abs(term) < Math.abs(sum) * 1e-16) break;
    }
    return sum * Math.exp(-x + a * Math.log(x) - lnGamma(a));
  }
  // Continued fraction for Q(a, x).
  const tiny = 1e-300;
  let b = x + 1 - a;
  let c = 1 / tiny;
  let d = 1 / b;
  let h = d;
  for (let i = 1; i < 1000; i++) {
    const an = -i * (i - a);
    b += 2;
    d = an * d + b; d = Math.abs(d) < tiny ? tiny : d;
    c = b + an / c; c = Math.abs(c) < tiny ? tiny : c;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-16) break;
  }
  return 1 - Math.exp(-x + a * Math.log(x) - lnGamma(a)) * h;
}

// ---------- Student, χ², Fisher ----------

export function tCdf(t, nu) {
  if (!Number.isFinite(nu)) return Phi(t);
  const x = nu / (nu + t * t);
  const tail = 0.5 * betaInc(x, nu / 2, 0.5);
  return t >= 0 ? 1 - tail : tail;
}
export const chi2Cdf = (x, r) => (x <= 0 ? 0 : gammaInc(r / 2, x / 2));
export const fCdf = (x, m, n) => (x <= 0 ? 0 : betaInc((m * x) / (m * x + n), m / 2, n / 2));

// The quantile of an increasing cdf by bisection on [lo, hi] (widened if needed).
function invert(cdf, p, lo, hi) {
  while (cdf(hi) < p) hi *= 2;
  for (let k = 0; k < 200; k++) {
    const mid = (lo + hi) / 2;
    if (cdf(mid) < p) lo = mid; else hi = mid;
    if (hi - lo < 1e-13 * Math.max(1, Math.abs(mid))) break;
  }
  return (lo + hi) / 2;
}
export function tInv(p, nu) {
  if (!Number.isFinite(nu)) return PhiInv(p);
  if (p === 0.5) return 0;
  if (p < 0.5) return -tInv(1 - p, nu);
  return invert((t) => tCdf(t, nu), p, 0, 10);
}
export const chi2Inv = (p, r) => invert((x) => chi2Cdf(x, r), p, 0, Math.max(10, 4 * r));
export const fInv = (p, m, n) => invert((x) => fCdf(x, m, n), p, 0, 10);

// ---------- counting and discrete laws ----------

const FACTS = [1];
for (let i = 1; i <= 170; i++) FACTS[i] = FACTS[i - 1] * i;
export const fact = (n) => (Number.isInteger(n) && n >= 0 ? (n > 170 ? Infinity : FACTS[n]) : NaN);
// C(n, k) and A(n, k), exact while they fit in a safe integer.
export function choose(n, k) {
  if (!Number.isInteger(n) || !Number.isInteger(k) || k < 0 || n < 0) return NaN;
  if (k > n) return 0;
  k = Math.min(k, n - k);
  let c = 1;
  for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i;
  return Math.round(c);
}
export function arrange(n, k) {
  if (!Number.isInteger(n) || !Number.isInteger(k) || k < 0 || n < 0) return NaN;
  if (k > n) return 0;
  let a = 1;
  for (let i = 0; i < k; i++) a *= n - i;
  return a;
}
export const binom = (n, k, p) => (k < 0 || k > n ? 0 : choose(n, k) * p ** k * (1 - p) ** (n - k));
export function binomCdf(n, k, p) {
  let s = 0;
  for (let j = 0; j <= Math.min(k, n); j++) s += binom(n, j, p);
  return s;
}
export const poisson = (k, lambda) => (k < 0 ? 0 : Math.exp(-lambda + k * Math.log(lambda) - lnGamma(k + 1)));
export function poissonCdf(k, lambda) {
  let s = 0;
  for (let j = 0; j <= k; j++) s += poisson(j, lambda);
  return s;
}

// ---------- rounding ----------

// x rounded down / up / to the nearest at `digits` decimals (a little
// tolerance for the binary representation: 1,0674 stays 1,0674).
const EPS = 1e-9;
export const roundTo = (x, d) => Math.round(x * 10 ** d + (x >= 0 ? EPS : -EPS)) / 10 ** d;
export const floorTo = (x, d) => Math.floor(x * 10 ** d + EPS) / 10 ** d;
export const ceilTo = (x, d) => Math.ceil(x * 10 ** d - EPS) / 10 ** d;
export const roundCI = (lo, hi, digits) => [floorTo(lo, digits), ceilTo(hi, digits)];

// u with k significant digits: {value, digits (decimal places, may be < 0)}.
export function sigRound(u, k = 2) {
  const e = Math.floor(Math.log10(Math.abs(u)) + EPS);
  const digits = k - 1 - e;
  let value = roundTo(u, digits);
  // 0,0995 to 2 digits is 0,10: one digit fewer then.
  if (Math.floor(Math.log10(Math.abs(value)) + EPS) > e) return { value, digits: digits - 1 };
  return { value, digits };
}

// The EE-209 rule (part 3b): u with 2 significant digits (1 if its first
// digit is 4 to 9 and k = 1 is asked), θ̂ at the same last decimal, bounds
// computed from the unrounded values and rounded outward.
export function ciRound(theta, u, k = 2) {
  const r = sigRound(u, k);
  const d = r.digits;
  return { u: r.value, digits: d, theta: roundTo(theta, d), lo: floorTo(theta - u, d), hi: ceilTo(theta + u, d) };
}
// First significant digit of u.
export const firstDigit = (u) => Number(String(Math.abs(u).toExponential()).charAt(0));

// ---------- the printed tables ----------

// Table 1 (MATH-234): Φ(z) for z = 0, 0,025, …, 4,975; 3 decimals below 3,
// 7 decimals from 3 on. Negative z: 1 − Φ(−z) printed the same way.
export const PHI_STEP = 0.025;
export function phiTable(z) {
  const k = Math.round(Math.abs(z) / PHI_STEP);
  const g = k * PHI_STEP;
  if (Math.abs(Math.abs(z) - g) > 1e-9 || g > 4.975 + 1e-9) return null;
  const d = g >= 3 - 1e-9 ? 7 : 3;
  const v = roundTo(Phi(g), d);
  return z >= 0 ? v : roundTo(1 - v, d);
}
// The values a reading of Table 1 at z may give: the printed value at the
// grid points around z (one, or the two neighbours), and Φ(z) itself.
export function phiAccepted(z) {
  const out = [Phi(z)];
  const a = Math.abs(z);
  const lo = Math.floor(a / PHI_STEP + 1e-9) * PHI_STEP;
  for (const g of [lo, lo + PHI_STEP]) {
    if (g > 4.975 + 1e-9) continue;
    if (Math.abs(g - a) > PHI_STEP - 1e-9) continue;
    const v = phiTable(g);
    if (v !== null) out.push(z >= 0 ? v : roundTo(1 - v, g >= 3 - 1e-9 ? 7 : 3));
  }
  return out;
}

// Table 2 (MATH-234): Φ⁻¹(p), with as many decimals as p has (0,95 → 1,64 ;
// 0,975 → 1,960 ; 0,9935 → 2,4838 ; 0,99901 → 3,09322).
export function phiInvTable(p) {
  const s = String(p);
  const dec = s.includes('.') ? s.split('.')[1].length : 0;
  const d = Math.max(2, dec);
  return roundTo(PhiInv(p), d);
}

// Table 3 (MATH-234): s_α of Student, α = 5, 1, 0,1 (two-sided, in %).
export const STUDENT_DF = [...Array.from({ length: 30 }, (_, i) => i + 1), 32, 34, 36, 38, 40, 50, 100, 150, 200, Infinity];
export const studentTable = (nu, alpha = 5) => roundTo(tInv(1 - alpha / 200, nu), 3);

// Table 4 (MATH-234): s_α of χ²(r), upper tail α = 5, 1, 0,1 (in %).
export const CHI2_DF = [...Array.from({ length: 30 }, (_, i) => i + 1), 32, 34, 36, 38, 40, 50];
export const chi2Table = (r, alpha = 5) => roundTo(chi2Inv(1 - alpha / 100, r), 3);

// The EE-209 formulary: z quantiles (3 decimals) and Student quantiles as
// printed (some are truncated: 63.6, 9.92, 2.62).
export const EE_Z = { 0.9: [1.282, 1.645], 0.95: [1.645, 1.960], 0.99: [2.326, 2.576], 0.999: [3.090, 3.291] };
export const EE_T_DF = [1, 2, 5, 10, 20, 50, 100];
export const EE_T = {
  0.9: [6.31, 2.92, 2.02, 1.81, 1.73, 1.67, 1.66],
  0.95: [12.7, 4.30, 2.57, 2.23, 2.09, 2.01, 1.98],
  0.99: [63.6, 9.92, 4.03, 3.17, 2.85, 2.68, 2.62],
};
export const eeT = (level, df) => EE_T[level]?.[EE_T_DF.indexOf(df)] ?? null;

// The quantile the course reads for Student with ν degrees of freedom:
// Table 3 when ν is in it, the normal line for ν > 200.
export function courseT(nu, alpha = 5) {
  if (nu > 200) return studentTable(Infinity, alpha);
  if (!STUDENT_DF.includes(nu)) return null;
  return studentTable(nu, alpha);
}

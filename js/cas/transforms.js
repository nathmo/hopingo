// Numeric Fourier and Laplace transforms (step U10, module F), for the
// judge `transform` (js/judges/transform.js) and the generators' checks.
//
//   heaviside(node) → node   H(u) (Heaviside, H(0) undefined) and sgn(u) made
//                            computable: H(u) = (1 + u/|u|)/2
//   breakpoints(node, v) → [x]   where an H(…) or sgn(…) of an affine argument jumps
//   fourierAt(node, v, α, {env}) → {re, im}  f̂(α) = (1/√(2π)) ∫_ℝ f(y) e^(−iαy) dy
//   laplaceAt(node, v, z, {env}) → number    F(z) = ∫₀^∞ f(t) e^(−zt) dt, z real
// Convention of the course: 1/√(2π) in front of the Fourier transform.
// The oscillating integral is cut into half periods π/|α|, each one by
// Gauss-Legendre (split at the jumps), and the partial sums are
// extrapolated by Wynn's ε algorithm: enough for f in 1/y² (F6) at 1e−9.

import { mapNode, symbolsIn, contains } from './ast.js';
import { compileFloat, evalFloat } from './numeric.js';
import { quad } from './integrate.js';
import { C, evalComplex } from './complex.js';

const isI = (n) => n.t === 'const' && n.name === 'i';
import { Q } from '../math/rational.js';

const SQ2PI = Math.sqrt(2 * Math.PI);

// ---------- Heaviside and sign ----------

function sgnNode(u) {
  return { t: 'frac', n: { t: 'paren', e: u }, d: { t: 'abs', e: u } };
}
export function heaviside(node) {
  return mapNode(node, (n) => {
    if (n.t === 'fn' && n.args?.length === 1 && (n.name === 'H' || n.name === 'heaviside')) {
      return { t: 'frac', n: { t: 'paren', e: { t: 'bin', op: '+', l: lit1(), r: sgnNode(n.args[0]) } }, d: lit2() };
    }
    if (n.t === 'fn' && n.args?.length === 1 && (n.name === 'sgn' || n.name === 'sign')) return { t: 'paren', e: sgnNode(n.args[0]) };
    return n;
  });
}
const lit1 = () => ({ t: 'num', v: new Q(1), s: '1' });
const lit2 = () => ({ t: 'num', v: new Q(2), s: '2' });

// Jumps of H(a·v + b) and sgn(a·v + b), and kinks of |a·v + b|.
export function breakpoints(node, v, env = {}) {
  const out = new Set();
  const scan = (n) => {
    if (!n || typeof n !== 'object') return;
    const arg = (n.t === 'fn' && n.args?.length === 1 && ['H', 'heaviside', 'sgn', 'sign'].includes(n.name)) ? n.args[0]
      : n.t === 'abs' ? n.e : null;
    if (arg && symbolsIn(arg).has(v)) {
      // The roots of the argument on [−40 ; 40]: sign changes, then bisection.
      const g = (x) => evalFloat(arg, { ...env, [v]: x });
      const step = 0.01;
      let a = -40;
      let ga = g(a);
      for (let k = 1; k <= 8000; k++) {
        const b = -40 + k * step;
        const gb = g(b);
        if (gb === 0) out.add(b);
        else if (Number.isFinite(ga) && Number.isFinite(gb) && ga * gb < 0) {
          let lo = a;
          let hi = b;
          for (let it = 0; it < 60; it++) { const m = (lo + hi) / 2; if (g(lo) * g(m) <= 0) hi = m; else lo = m; }
          const r = (lo + hi) / 2;
          out.add(Math.abs(r - Math.round(r)) < 1e-12 ? Math.round(r) : r);
        }
        a = b;
        ga = gb;
      }
    }
    for (const k of Object.keys(n)) {
      const c = n[k];
      if (Array.isArray(c)) c.forEach(scan);
      else if (c && typeof c === 'object' && c.t) scan(c);
    }
  };
  scan(node);
  return [...out].filter(Number.isFinite).sort((a, b) => a - b);
}

// ---------- Gauss-Legendre (24 nodes) ----------

const GL = (() => {
  const n = 24;
  const xs = [];
  const ws = [];
  for (let i = 1; i <= n; i++) {
    let x = Math.cos((Math.PI * (i - 0.25)) / (n + 0.5));
    for (let it = 0; it < 100; it++) {
      let p0 = 1;
      let p1 = x;
      for (let k = 2; k <= n; k++) { const p2 = ((2 * k - 1) * x * p1 - (k - 1) * p0) / k; p0 = p1; p1 = p2; }
      const dp = (n * (x * p1 - p0)) / (x * x - 1);
      const dx = p1 / dp;
      x -= dx;
      if (Math.abs(dx) < 1e-16) break;
    }
    let p0 = 1;
    let p1 = x;
    for (let k = 2; k <= n; k++) { const p2 = ((2 * k - 1) * x * p1 - (k - 1) * p0) / k; p0 = p1; p1 = p2; }
    const dp = (n * (x * p1 - p0)) / (x * x - 1);
    xs.push(x);
    ws.push(2 / ((1 - x * x) * dp * dp));
  }
  return { xs, ws };
})();

// ∫ₐᵇ g, split at the jumps inside, each piece by Gauss-Legendre (halved twice).
function glInt(g, a, b, cuts) {
  const pts = [a, ...cuts.filter((c) => c > a && c < b), b];
  let s = 0;
  for (let k = 0; k + 1 < pts.length; k++) {
    const lo = pts[k];
    const hi = pts[k + 1];
    const m = 4;
    for (let j = 0; j < m; j++) {
      const l = lo + ((hi - lo) * j) / m;
      const h = lo + ((hi - lo) * (j + 1)) / m;
      const c = (l + h) / 2;
      const d = (h - l) / 2;
      for (let i = 0; i < GL.xs.length; i++) s += GL.ws[i] * d * g(c + d * GL.xs[i]);
    }
  }
  return s;
}

// Wynn's ε algorithm on partial sums: the limit estimate.
function wynn(S) {
  const n = S.length;
  let e0 = new Array(n + 1).fill(0);
  let e1 = S.slice();
  let best = S[n - 1];
  for (let k = 1; k < n; k++) {
    const e2 = [];
    for (let j = 0; j + 1 < e1.length; j++) {
      const d = e1[j + 1] - e1[j];
      e2.push(Math.abs(d) < 1e-300 ? Infinity : e0[j + 1] + 1 / d);
    }
    if (k % 2 === 0 && e2.length) {
      const last = e2[e2.length - 1];
      if (Number.isFinite(last)) best = last;
    }
    e0 = e1;
    e1 = e2;
    if (e1.length < 2) break;
  }
  return best;
}

// ∫₀^∞ g on [0, ∞) by pieces of length h, extrapolated.
function halfLine(g, h, cuts, sideMax = 600) {
  const S = [];
  let s = 0;
  let small = 0;
  for (let k = 0; k < sideMax; k++) {
    const piece = glInt(g, k * h, (k + 1) * h, cuts);
    if (!Number.isFinite(piece)) return NaN;
    s += piece;
    S.push(s);
    // Stop when the pieces are negligible for a while (fast decay).
    if (Math.abs(piece) < 1e-15 * (1 + Math.abs(s))) { small++; if (small > 6) return s; } else small = 0;
    if (k >= 60 && k % 20 === 0) {
      const a = wynn(S.slice(-40));
      const b = wynn(S.slice(-41, -1));
      if (Math.abs(a - b) < 1e-11 * (1 + Math.abs(a))) return a;
    }
  }
  return wynn(S.slice(-40));
}

// A real function x ↦ f(x) (compiled; evalFloat when the compiled form
// cannot compute it), 0 where undefined.
function realFn(node, v, env) {
  const n = heaviside(node);
  let f = compileFloat(n);
  const probe = { ...env, [v]: 0.37 };
  const a = f(probe);
  const b = evalFloat(n, probe);
  const same = (Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= 1e-12 * (1 + Math.abs(b))) || (!Number.isFinite(a) && !Number.isFinite(b));
  if (!same) f = (e) => evalFloat(n, e);
  return (x) => { const y = f({ ...env, [v]: x }); return Number.isFinite(y) ? y : 0; };
}

// f̂(α) with the course's convention (f may be complex: e^(−iwy) on [b ; c]).
export function fourierAt(node, v, alpha, { env = {} } = {}) {
  const cuts = breakpoints(node, v, env);
  const posCuts = cuts.filter((c) => c > 0);
  const negCuts = cuts.filter((c) => c < 0).map((c) => -c);
  const h = alpha === 0 ? 1 : Math.PI / Math.abs(alpha);
  const both = (g) => halfLine((x) => g(x), h, posCuts) + halfLine((x) => g(-x), h, negCuts);
  if (contains(node, isI)) {
    const n = heaviside(node);
    const val = (x) => { const z = evalComplex(n, { ...env, [v]: x }); return z || C(0); };
    const re = both((x) => { const z = val(x); return z.re * Math.cos(alpha * x) + z.im * Math.sin(alpha * x); });
    const im = both((x) => { const z = val(x); return z.im * Math.cos(alpha * x) - z.re * Math.sin(alpha * x); });
    return C(re / SQ2PI, im / SQ2PI);
  }
  const f = realFn(node, v, env);
  const re = both((x) => f(x) * Math.cos(alpha * x));
  const im = -both((x) => f(x) * Math.sin(alpha * x));
  return C(re / SQ2PI, im / SQ2PI);
}

// F(z) = ∫₀^∞ f(t) e^(−zt) dt for a real z in the half-plane of convergence.
export function laplaceAt(node, v, z, { env = {} } = {}) {
  const f = realFn(node, v, env);
  const g = (t) => f(t) * Math.exp(-z * t);
  const cuts = breakpoints(node, v, env).filter((c) => c > 0);
  const pts = [0, ...cuts];
  let s = 0;
  for (let k = 0; k < pts.length; k++) {
    const part = quad(g, pts[k], k + 1 < pts.length ? pts[k + 1] : Infinity);
    if (!Number.isFinite(part)) return NaN;
    s += part;
  }
  return s;
}


// The value of an expression of the transform variable (α or z), as a
// complex: real evaluation when there is no i (fact, H, sgn are known
// there), else complex evaluation. null where undefined.
export function valueAt(node, env = {}) {
  const n = heaviside(node);
  if (!contains(n, isI)) {
    const x = evalFloat(n, env);
    return Number.isFinite(x) ? C(x) : null;
  }
  return evalComplex(n, env);
}

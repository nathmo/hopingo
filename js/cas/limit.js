// Limits (spec §4.3), step U2: by series first (Laurent expansions at a
// point, in 1/x at ±∞), else numerically (values along a sequence that
// approaches the point, Aitken's acceleration). Step U4 adds windows of
// values at shrinking scales: a range that does not shrink is a limit that
// does not exist (sin(1/x), (−1)ⁿ), a range that shrinks gives the limit
// even without convergence along one sequence (x·cos(1/x)), and sequences
// (discrete: true) are sampled at whole n of both parities.
//
//   limit(node, v, to, dir, {env, discrete}) → {value, method}
//     to: a number or Q, '+inf' or '-inf'; dir: '+', '-' or undefined.
//     value: Q (exact), a float, '+inf', '-inf', or 'none' (no limit, or
//     the two sides differ); method: 'series' | 'numeric' | 'none' (could
//     not decide: value is null).
//   limitOfNode(lim) → the same for a {t:'lim'} node.
//   targetOf(toNode) → {to, dir}: reads a bound 0⁺, 1⁻, +∞, −∞, π/2.
//   sameLimit(a, b) → true | false: two results of limit().

import { Q } from '../math/rational.js';
import { stripParen, contains } from './ast.js';
import { series, NotSeries, coefEqual } from './series.js';
import { compileFloat, evalFloat } from './numeric.js';
import { exactValue } from './normal.js';

const isQ = (a) => a instanceof Q;
const F = (a) => (isQ(a) ? a.n / a.d : a);

// A bound written in a line: {to, dir}.
export function targetOf(node) {
  let n = stripParen(node);
  let dir;
  if (n.t === 'side') { dir = n.dir; n = stripParen(n.e); }
  if (n.t === 'const' && n.name === 'inf') return { to: '+inf' };
  if (n.t === 'neg' && stripParen(n.e).t === 'const' && stripParen(n.e).name === 'inf') return { to: '-inf' };
  const q = exactValue(n);
  if (q) return { to: q, dir };
  const x = evalFloat(n, {});
  return Number.isFinite(x) ? { to: x, dir } : { to: null, dir };
}

function bySeries(node, v, to, dir, env) {
  // At ±∞ the series is in h = 1/v, which has the sign of the bound: an odd
  // pole there has a sign, not two.
  const d = to === '+inf' ? 1 : to === '-inf' ? -1 : dir === '+' ? 1 : dir === '-' ? -1 : 0;
  for (const W of [4, 8, 14]) {
    let s;
    try { s = series(node, v, to, W, { dir: d, env }); } catch (e) {
      if (e instanceof NotSeries) return null;
      if (e instanceof RangeError) return null;
      throw e;
    }
    const k = s.valuation;
    if (k === null) {
      if (s.remainder || W === 14) return s.order >= 0 ? { value: new Q(0), method: 'series' } : null;
      continue;
    }
    if (k > 0) return { value: new Q(0), method: 'series' };
    const c = s.coef(k);
    if (k === 0) return { value: isQ(c) ? c : c, method: 'series' };
    // A pole: the sign of c·h^k on the side.
    let sign = Math.sign(F(c));
    if (k % 2 !== 0) {
      if (!d) return { value: 'none', method: 'series' };
      sign *= d;
    }
    return { value: sign > 0 ? '+inf' : '-inf', method: 'series' };
  }
  return null;
}

// Aitken's Δ² on a sequence: the extrapolated values.
function aitken(ys) {
  const out = [];
  for (let k = 2; k < ys.length; k++) {
    const d1 = ys[k] - ys[k - 1];
    const d0 = ys[k - 1] - ys[k - 2];
    const dd = d1 - d0;
    out.push(dd === 0 ? ys[k] : ys[k] - (d1 * d1) / dd);
  }
  return out;
}

function oneSide(f, to, s) {
  const xs = [];
  if (to === '+inf' || to === '-inf') {
    const sg = to === '+inf' ? 1 : -1;
    for (let k = 0; k <= 40; k++) xs.push(sg * 2 ** k);
  } else {
    const a = F(to);
    const d0 = 0.25 * Math.max(1, Math.abs(a));
    for (let k = 0; k <= 22; k++) xs.push(a + s * d0 * 2 ** -k);
  }
  const ys = xs.map(f);
  if (ys.some((y) => Number.isNaN(y))) {
    // Undefined on the way: keep the tail only if it is defined.
    const tail = ys.slice(-10);
    if (tail.some((y) => !Number.isFinite(y))) return null;
  }
  const tail = ys.slice(-12).filter(Number.isFinite);
  if (tail.length < 8) {
    const last = ys[ys.length - 1];
    if (last === Infinity || last === -Infinity) return last > 0 ? '+inf' : '-inf';
    return null;
  }
  // Growing without bound, with a constant sign.
  const big = tail.slice(-4);
  if (big.every((y) => Math.abs(y) > 1e6) && big.every((y) => Math.sign(y) === Math.sign(big[0]))) {
    const growing = big.every((y, i) => i === 0 || Math.abs(y) > Math.abs(big[i - 1]));
    if (growing) return big[0] > 0 ? '+inf' : '-inf';
  }
  // Slow but steady growth (ln x): differences that do not shrink.
  const ds = tail.slice(1).map((y, i) => y - tail[i]);
  const steady = ds.slice(-6).every((d) => Math.sign(d) === Math.sign(ds[ds.length - 1]) && Math.abs(d) > 1e-3);
  if (steady && Math.abs(ds[ds.length - 1]) >= 0.8 * Math.abs(ds[ds.length - 6])) return ds[ds.length - 1] > 0 ? '+inf' : '-inf';
  // Converging: the best agreement of the accelerated values of the tail,
  // close to the last value itself.
  const A = aitken(tail);
  const last = tail[tail.length - 1];
  let best = null;
  for (let k = 1; k < A.length; k++) {
    const err = Math.abs(A[k] - A[k - 1]);
    if (Number.isFinite(err) && (!best || err < best.err)) best = { err, value: A[k] };
  }
  if (best && best.err <= 1e-7 * (1 + Math.abs(best.value)) && Math.abs(best.value - last) <= 1e-3 * (1 + Math.abs(last))) return snap(best.value);
  return null;
}

// A float close to a simple fraction becomes that fraction.
function snap(x) {
  if (Math.abs(x) < 1e-6) return new Q(0);
  for (let d = 1; d <= 64; d++) {
    const n = Math.round(x * d);
    if (Math.abs(n / d - x) < 1e-7 * (1 + Math.abs(x)) && Number.isSafeInteger(n)) return new Q(n, d);
  }
  return x;
}

// ---------- windows (step U4) ----------

// Fixed pseudo-random numbers in ]0 ; 1[ (deterministic verdicts).
const U = (() => {
  const out = [];
  let x = 0.5;
  for (let k = 0; k < 60; k++) { x = (x * 9301 + 0.49297) % 1; out.push(0.02 + 0.97 * x); }
  return out;
})();

// Values in windows that shrink towards the point: [{min, max, minAbs, maxAbs, pos, negs}].
function windowsOf(f, to, s, discrete) {
  const out = [];
  const inf = to === '+inf' || to === '-inf';
  const ks = discrete ? [3, 4, 5, 6, 7, 8] : inf ? [2, 3, 4, 5, 6, 7] : [1, 2, 3, 4, 5, 6];
  for (const k of ks) {
    const xs = [];
    if (discrete) {
      const N = 10 ** k;
      const sg = to === '-inf' ? -1 : 1;
      for (let j = 0; j < 24; j++) xs.push(sg * (N + j));
      for (const u of U.slice(0, 36)) xs.push(sg * (N + Math.floor(u * N)));
    } else if (inf) {
      const sg = to === '+inf' ? 1 : -1;
      for (const u of U) xs.push(sg * 10 ** k * (1 + u));
    } else {
      const a = F(to);
      const h = 10 ** -k * Math.max(1, Math.abs(a));
      for (const u of U) xs.push(a + s * h * u);
    }
    const ys = xs.map(f).filter(Number.isFinite);
    if (ys.length < xs.length / 2) { out.push(null); continue; }
    let min = Infinity;
    let max = -Infinity;
    let minAbs = Infinity;
    let maxAbs = 0;
    let pos = 0;
    let negs = 0;
    for (const y of ys) {
      min = Math.min(min, y);
      max = Math.max(max, y);
      minAbs = Math.min(minAbs, Math.abs(y));
      maxAbs = Math.max(maxAbs, Math.abs(y));
      if (y > 0) pos++;
      if (y < 0) negs++;
    }
    out.push({ min, max, minAbs, maxAbs, pos, negs });
  }
  return out;
}

// What the windows say: {value: number, tol} | '+inf' | '-inf' | 'none' | null.
function windowVerdict(ws) {
  const w = ws.filter(Boolean);
  if (w.length < 3) return null;
  const last = w[w.length - 1];
  const prev = w[w.length - 2];
  const first = w[w.length - 3];
  const R = (x) => x.max - x.min;
  const c = (last.max + last.min) / 2;
  // Unbounded: one sign means ±∞, both signs means no limit.
  if (last.maxAbs > 1e4 && last.maxAbs > 10 * first.maxAbs) {
    if (last.negs === 0 && last.minAbs > first.minAbs && last.minAbs > 1e3) return '+inf';
    if (last.pos === 0 && last.minAbs > first.minAbs && last.minAbs > 1e3) return '-inf';
    if (last.pos > 0 && last.negs > 0) return 'none';
    // Step U4: unbounded, but some values stay small (n(1 + (−1)ⁿ)): no limit.
    if (last.minAbs <= first.maxAbs) return 'none';
    return null;
  }
  const scale = 1 + Math.abs(c);
  if (R(last) <= 1e-7 * scale) return { value: c, tol: 1e-7 * scale };
  // Windows that drift steadily one way (ln n): no verdict here.
  const mid = (x) => (x.max + x.min) / 2;
  const d1 = mid(prev) - mid(first);
  const d2 = mid(last) - mid(prev);
  if (Math.sign(d1) === Math.sign(d2) && Math.abs(d2) > 0.5 * R(last) && Math.abs(d1) > 0.5 * R(prev)) return null;
  // Shrinking steadily: the limit is the centre, known to about the range.
  if (R(last) <= 0.05 * R(first) && R(last) <= 0.5 * R(prev) && R(last) < 1e-2 * scale) return { value: c, tol: 2 * R(last) };
  // A range that does not shrink: oscillation.
  if (R(last) > 1e-3 * scale && R(last) >= 0.3 * R(first) && R(prev) >= 0.3 * R(first)) return 'none';
  return null;
}

// A float close to a simple fraction (within tol) becomes that fraction.
function snapTol(x, tol) {
  if (Math.abs(x) <= tol) return new Q(0);
  for (let d = 1; d <= 64; d++) {
    const n = Math.round(x * d);
    if (Math.abs(n / d - x) <= tol && Number.isSafeInteger(n)) return new Q(n, d);
  }
  return x;
}

// One side: Aitken along a sequence, checked (or replaced) by the windows.
function side(f, to, s, discrete) {
  const r = oneSide(f, to, s);
  const w = windowVerdict(windowsOf(f, to, s, discrete));
  if (w === 'none') return 'none';
  if (r === '+inf' || r === '-inf') return w === null || w === r ? r : typeof w === 'object' ? null : r;
  if (r !== null) {
    if (w === '+inf' || w === '-inf') return null;
    if (w && Math.abs(F(r) - w.value) > Math.max(2 * w.tol, 1e-6 * (1 + Math.abs(F(r))))) return null;
    return r;
  }
  if (w === '+inf' || w === '-inf') return w;
  if (w) return snapTol(w.value, Math.max(w.tol, 1e-9));
  return null;
}

function numerically(node, v, to, dir, env, discrete = false) {
  if (contains(node, (n) => n.t === 'eps')) return null;
  let c;
  try { c = compileFloat(node); } catch { return null; }
  const f = (x) => { try { return c({ ...env, [v]: x }); } catch { return NaN; } };
  if (to === '+inf' || to === '-inf') {
    const r = side(f, to, 1, discrete);
    return r === null ? null : { value: r, method: 'numeric' };
  }
  const sides = dir === '+' ? [1] : dir === '-' ? [-1] : [-1, 1];
  const rs = sides.map((s) => side(f, to, s, false));
  if (rs.some((r) => r === 'none')) return { value: 'none', method: 'numeric' };
  if (rs.some((r) => r === null)) return null;
  if (rs.length === 2 && !sameValue(rs[0], rs[1])) return { value: 'none', method: 'numeric' };
  return { value: rs[0], method: 'numeric' };
}

export function limit(node, v, to, dir, { env = {}, discrete = false } = {}) {
  if (to === null || to === undefined) return { value: null, method: 'none' };
  // (−1)ⁿ and trigonometric functions of n have no series in 1/n.
  const oscillating = discrete && contains(node, (n) => (n.t === 'pow' && contains(n.e, (x) => x.t === 'sym' && x.name === v) && evalFloat(n.b, env) < 0)
    || (n.t === 'fn' && ['sin', 'cos', 'tan'].includes(n.name) && contains(n, (x) => x.t === 'sym' && x.name === v)));
  const s = oscillating ? null : bySeries(node, v, to, dir, env);
  if (s) return s;
  return numerically(node, v, to, dir, env, discrete) ?? { value: null, method: 'none' };
}

export function limitOfNode(lim, opts) {
  const { to, dir } = targetOf(lim.to);
  return limit(lim.e, lim.v, to, dir, opts);
}

function sameValue(a, b) {
  if (typeof a === 'string' || typeof b === 'string') return a === b;
  if (isQ(a) && isQ(b)) return a.eq(b);
  const x = F(a);
  const y = F(b);
  return Math.abs(x - y) <= 1e-6 * (1 + Math.abs(x) + Math.abs(y));
}

export function sameLimit(a, b) {
  if (a.value === null || b.value === null) return false;
  if (a.method === 'series' && b.method === 'series' && !(typeof a.value === 'string') && !(typeof b.value === 'string')) return coefEqual(a.value, b.value);
  return sameValue(a.value, b.value);
}

// The value as a number (±Infinity, NaN for none or unknown).
export function limitNumber(r) {
  if (r.value === '+inf') return Infinity;
  if (r.value === '-inf') return -Infinity;
  if (r.value === null || r.value === 'none') return NaN;
  return F(r.value);
}

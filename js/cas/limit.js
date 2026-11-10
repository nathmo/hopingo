// Limits (spec §4.3), step U2: by series first (Laurent expansions at a
// point, in 1/x at ±∞), else numerically (values along a sequence that
// approaches the point, Aitken's acceleration). The numeric part is kept
// simple here; U4 extends it (sequences, oscillations, ε-δ).
//
//   limit(node, v, to, dir, {env}) → {value, method}
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
  const d = dir === '+' ? 1 : dir === '-' ? -1 : 0;
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

function numerically(node, v, to, dir, env) {
  if (contains(node, (n) => n.t === 'eps')) return null;
  let c;
  try { c = compileFloat(node); } catch { return null; }
  const f = (x) => { try { return c({ ...env, [v]: x }); } catch { return NaN; } };
  if (to === '+inf' || to === '-inf') {
    const r = oneSide(f, to, 1);
    return r === null ? null : { value: r, method: 'numeric' };
  }
  const sides = dir === '+' ? [1] : dir === '-' ? [-1] : [-1, 1];
  const rs = sides.map((s) => oneSide(f, to, s));
  if (rs.some((r) => r === null)) return null;
  if (rs.length === 2 && !sameValue(rs[0], rs[1])) return { value: 'none', method: 'numeric' };
  return { value: rs[0], method: 'numeric' };
}

export function limit(node, v, to, dir, { env = {} } = {}) {
  if (to === null || to === undefined) return { value: null, method: 'none' };
  const s = bySeries(node, v, to, dir, env);
  if (s) return s;
  return numerically(node, v, to, dir, env) ?? { value: null, method: 'none' };
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

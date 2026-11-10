// Floating-point evaluation and sampling (spec §4.3, §4.4).
//
// evalFloat(node, env, {guard}) → number, NaN where undefined. With
// guard, a point too close to a singularity is undefined too: a
// denominator under 0.05 in absolute value, a logarithm of a number under
// 1e-6, a tangent near its poles. Complex values come with complex.js (U4).
// sample(vars, domain, rng, k) → k points; domain {x: [lo, hi]} or
// {n: {int: [lo, hi]}}, default [−3, 3].

import { canonFn, stripParen } from './ast.js';
import { diff } from './diff.js';
import { quad } from './integrate.js';
import { limit, targetOf, limitNumber } from './limit.js';

const NEAR_POLE = 0.05;

const REAL_FN = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan, cot: (x) => 1 / Math.tan(x), exp: Math.exp, ln: Math.log,
  sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh, arcsin: Math.asin, arccos: Math.acos, arctan: Math.atan,
  argsh: Math.asinh, argch: Math.acosh, argth: Math.atanh, sqrt: Math.sqrt, abs: Math.abs,
};

export function evalFloat(node, env = {}, opts = {}) {
  const guard = !!opts.guard;
  const E = (n) => evalFloat(n, env, opts);
  const den = (d) => (guard && Math.abs(d) < NEAR_POLE ? NaN : d);
  switch (node.t) {
    case 'num': return node.v.n / node.v.d;
    case 'float': return node.x;
    case 'const':
      if (node.name === 'pi') return Math.PI;
      if (node.name === 'e') return Math.E;
      if (node.name === 'inf') return Infinity;
      return NaN;
    case 'sym': {
      const key = node.sub ? `${node.name}_` : node.name;
      return key in env ? env[key] : NaN;
    }
    case 'paren': return E(node.e);
    case 'neg': return -E(node.e);
    case 'bin': {
      const a = E(node.l);
      const b = E(node.r);
      if (node.op === '+') return a + b;
      if (node.op === '-') return a - b;
      if (node.op === '×') return a * b;
      return a / den(b);
    }
    case 'frac': return E(node.n) / den(E(node.d));
    case 'pow': {
      const b = E(node.b);
      const e = E(node.e);
      if (b < 0 && !Number.isInteger(e)) {
        // Odd roots of negative numbers: x^(1/3).
        const q = node.e.t === 'frac' ? E(node.e.d) : null;
        if (q && Number.isInteger(q) && q % 2 === 1) return -((-b) ** e);
        return NaN;
      }
      if (b === 0 && e < 0) return NaN;
      if (guard && e < 0 && Math.abs(b) < NEAR_POLE) return NaN;
      return b ** e;
    }
    case 'sqrt': { const x = E(node.e); return x < 0 ? NaN : Math.sqrt(x); }
    case 'root': {
      const k = E(node.n);
      const x = E(node.e);
      if (x < 0) return k % 2 === 1 ? -((-x) ** (1 / k)) : NaN;
      return x ** (1 / k);
    }
    case 'abs': return Math.abs(E(node.e));
    case 'fn': {
      const name = canonFn(node.name);
      if (name === 'logb' && node.args.length === 2) {
        const b = E(node.args[0]);
        const x = E(node.args[1]);
        if (!(b > 0) || b === 1 || !(x > 0) || (guard && x < 1e-6)) return NaN;
        return Math.log(x) / Math.log(b);
      }
      // Step U4: min and max of several numbers.
      if ((name === 'min' || name === 'max') && node.args.length >= 2) return (name === 'min' ? Math.min : Math.max)(...node.args.map(E));
      const f = REAL_FN[name];
      if (!f || node.args.length !== 1) return NaN;
      const x = E(node.args[0]);
      if (guard) {
        if (name === 'ln' && x < 1e-6) return NaN;
        if (name === 'tan' && Math.abs(Math.cos(x)) < NEAR_POLE) return NaN;
        if (name === 'cot' && Math.abs(Math.sin(x)) < NEAR_POLE) return NaN;
      }
      return f(x);
    }
    case 'sum': {
      // Σ_{k=lo}^{hi} e, the bounds rounded to whole numbers (empty if hi < lo).
      // Step U4: hi = +∞, a series, by partial sums and extrapolation.
      if (isInf(node.hi)) return seriesSum(node, env);
      const lo = E(node.lo);
      const hi = E(node.hi);
      if (!Number.isFinite(lo) || !Number.isFinite(hi)) return NaN;
      const a = Math.round(lo);
      const b = Math.round(hi);
      if (Math.abs(a - lo) > 1e-9 || Math.abs(b - hi) > 1e-9 || b - a > 100000) return NaN;
      let s = 0;
      for (let j = a; j <= b; j++) s += evalFloat(node.e, { ...env, [node.k]: j }, opts);
      return s;
    }
    case 'deriv': {
      let e = node.e;
      for (let i = 0; i < node.n; i++) e = diff(e, node.v);
      return E(e);
    }
    // Step U2: a bound 0⁺ is worth 0; definite integrals by quadrature;
    // [F] from a to b and lim by limits when a bound is one-sided or infinite.
    case 'side': return E(node.e);
    case 'int': {
      if (!node.lo) return NaN;
      const a = E(node.lo);
      const b = E(node.hi);
      const c = compileFloat(node.e);
      const v = node.v;
      return quad((x) => c({ ...env, [v]: x }), a, b);
    }
    case 'bracket': {
      const at = (bound) => {
        const s = stripParen(bound);
        const x = E(s);
        if (s.t !== 'side' && Number.isFinite(x)) {
          const y = evalFloat(node.e, { ...env, [node.v]: x }, opts);
          if (Number.isFinite(y)) return y;
        }
        const { to, dir } = targetOf(s);
        return limitNumber(limit(node.e, node.v, to, dir, { env }));
      };
      return at(node.hi) - at(node.lo);
    }
    case 'lim': {
      const { to, dir } = targetOf(node.to);
      return limitNumber(limit(node.e, node.v, to, dir, { env }));
    }
    default: return NaN;
  }
}

const isInf = (n) => { n = stripParen(n); return n.t === 'const' && n.name === 'inf'; };

// Σ_{k=lo}^{∞} e (step U4, catalogue A1 convention 3): partial sums S_N for
// N = 2ʲ up to 2¹⁷, then Richardson's extrapolation in 1/N and Aitken's Δ²;
// the estimate whose last two values agree best, if they agree to 1e−7.
// NaN for a divergent series, or one that converges too slowly to tell.
export function seriesSum(node, env = {}) {
  const lo = Math.round(evalFloat(node.lo, env));
  if (!Number.isFinite(lo)) return NaN;
  const c = compileFloat(node.e);
  const k = node.k;
  const e = { ...env };
  const S = [];
  let s = 0;
  let n = lo;
  for (let j = 1; j <= 17; j++) {
    const N = lo + 2 ** j;
    for (; n < N; n++) {
      e[k] = n;
      const t = c(e);
      if (!Number.isFinite(t)) return NaN;
      s += t;
    }
    S.push(s);
  }
  if (!S.every(Number.isFinite)) return NaN;
  const cands = [];
  // Richardson: error in powers of 1/N, N doubling.
  let row = S.slice(-8);
  for (let m = 1; m <= 4; m++) {
    row = row.slice(1).map((x, i) => (2 ** m * x - row[i]) / (2 ** m - 1));
    cands.push(row);
  }
  // Aitken (error q^N or N^(−p)).
  const A = [];
  for (let i = 2; i < S.length; i++) {
    const d1 = S[i] - S[i - 1];
    const d0 = S[i - 1] - S[i - 2];
    A.push(d1 === d0 ? S[i] : S[i] - (d1 * d1) / (d1 - d0));
  }
  cands.push(A.slice(-6), S.slice(-4));
  let best = null;
  for (const r of cands) {
    if (r.length < 2) continue;
    const a = r[r.length - 1];
    const b = r[r.length - 2];
    const err = Math.abs(a - b);
    if (Number.isFinite(err) && (!best || err < best.err)) best = { err, v: a };
  }
  if (!best || best.err > 1e-7 * (1 + Math.abs(best.v))) return NaN;
  // A growth that only looks stable (Σ 1/k: S grows like ln N).
  if (Math.abs(S[S.length - 1] - S[S.length - 2]) > 1e-3 * (1 + Math.abs(best.v)) && Math.abs(best.v - S[S.length - 1]) > 0.5 * (1 + Math.abs(best.v))) return NaN;
  return best.v;
}

// k points of the domain. Integer variables take whole values.
export function sample(vars, domain = {}, rng, k = 12) {
  const out = [];
  for (let i = 0; i < k; i++) {
    const env = {};
    for (const v of vars) {
      const d = domain[v];
      if (d && d.int) env[v] = rng.int(d.int[0], d.int[1]);
      else {
        const [lo, hi] = Array.isArray(d) ? d : [-3, 3];
        env[v] = lo + (hi - lo) * rng.next();
      }
    }
    out.push(env);
  }
  return out;
}

// The same evaluation compiled once into closures (no guard), for scans
// that evaluate one expression at thousands of points (js/cas/sets.js).
// compileFloat(node) → (env) => number.
export function compileFloat(node) {
  const C = compileFloat;
  switch (node.t) {
    case 'num': { const v = node.v.n / node.v.d; return () => v; }
    case 'float': return () => node.x;
    case 'const': { const v = evalFloat(node, {}); return () => v; }
    case 'sym': { const key = node.sub ? `${node.name}_` : node.name; return (env) => (key in env ? env[key] : NaN); }
    case 'paren': return C(node.e);
    case 'neg': { const e = C(node.e); return (env) => -e(env); }
    case 'bin': {
      const a = C(node.l);
      const b = C(node.r);
      if (node.op === '+') return (env) => a(env) + b(env);
      if (node.op === '-') return (env) => a(env) - b(env);
      if (node.op === '×') return (env) => a(env) * b(env);
      return (env) => a(env) / b(env);
    }
    case 'frac': { const a = C(node.n); const b = C(node.d); return (env) => a(env) / b(env); }
    case 'sqrt': { const e = C(node.e); return (env) => { const x = e(env); return x < 0 ? NaN : Math.sqrt(x); }; }
    case 'abs': { const e = C(node.e); return (env) => Math.abs(e(env)); }
    case 'fn': {
      const name = canonFn(node.name);
      if (name === 'logb' && node.args.length === 2) {
        const b = C(node.args[0]);
        const a = C(node.args[1]);
        return (env) => { const bb = b(env); const aa = a(env); return !(bb > 0) || bb === 1 || !(aa > 0) ? NaN : Math.log(aa) / Math.log(bb); };
      }
      const f = REAL_FN[name];
      if (!f || node.args.length !== 1) break;
      const a = C(node.args[0]);
      return (env) => f(a(env));
    }
    case 'pow': {
      const b = C(node.b);
      const e = C(node.e);
      const d = node.e.t === 'frac' ? C(node.e.d) : null;
      return (env) => {
        const x = b(env);
        const y = e(env);
        if (x < 0 && !Number.isInteger(y)) {
          const q = d ? d(env) : null;
          return q && Number.isInteger(q) && q % 2 === 1 ? -((-x) ** y) : NaN;
        }
        if (x === 0 && y < 0) return NaN;
        return x ** y;
      };
    }
    default: break;
  }
  return (env) => evalFloat(node, env);
}

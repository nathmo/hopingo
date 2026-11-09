// Floating-point evaluation and sampling (spec §4.3, §4.4).
//
// evalFloat(node, env, {guard}) → number, NaN where undefined. With
// guard, a point too close to a singularity is undefined too: a
// denominator under 0.05 in absolute value, a logarithm of a number under
// 1e-6, a tangent near its poles. Complex values come with complex.js (U4).
// sample(vars, domain, rng, k) → k points; domain {x: [lo, hi]} or
// {n: {int: [lo, hi]}}, default [−3, 3].

import { canonFn } from './ast.js';
import { diff } from './diff.js';

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
    default: return NaN;
  }
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

// evalFloat(node, {[v]: x}) compiled once into a function of x (no guard):
// the numeric scans of sets.js call it thousands of times.
export function compileFloat(node, v) {
  const C = (n) => compileFloat(n, v);
  switch (node.t) {
    case 'num': { const c = node.v.n / node.v.d; return () => c; }
    case 'float': { const c = node.x; return () => c; }
    case 'const': { const c = evalFloat(node, {}); return () => c; }
    case 'sym': return !node.sub && node.name === v ? (x) => x : () => NaN;
    case 'paren': return C(node.e);
    case 'neg': { const e = C(node.e); return (x) => -e(x); }
    case 'bin': {
      const a = C(node.l);
      const b = C(node.r);
      if (node.op === '+') return (x) => a(x) + b(x);
      if (node.op === '-') return (x) => a(x) - b(x);
      if (node.op === '×') return (x) => a(x) * b(x);
      return (x) => a(x) / b(x);
    }
    case 'frac': { const a = C(node.n); const b = C(node.d); return (x) => a(x) / b(x); }
    case 'sqrt': { const e = C(node.e); return (x) => { const y = e(x); return y < 0 ? NaN : Math.sqrt(y); }; }
    case 'abs': { const e = C(node.e); return (x) => Math.abs(e(x)); }
    case 'pow': {
      const b = C(node.b);
      const e = C(node.e);
      const oddDen = node.e.t === 'frac' ? evalFloat(node.e.d, {}) : null;
      const odd = Number.isInteger(oddDen) && oddDen % 2 === 1;
      return (x) => {
        const bb = b(x);
        const ee = e(x);
        if (bb < 0 && !Number.isInteger(ee)) return odd ? -((-bb) ** ee) : NaN;
        if (bb === 0 && ee < 0) return NaN;
        return bb ** ee;
      };
    }
    case 'fn': {
      const name = canonFn(node.name);
      if (name === 'logb' && node.args.length === 2) {
        const b = C(node.args[0]);
        const a = C(node.args[1]);
        return (x) => { const bb = b(x); const aa = a(x); return !(bb > 0) || bb === 1 || !(aa > 0) ? NaN : Math.log(aa) / Math.log(bb); };
      }
      const f = REAL_FN[name];
      if (!f || node.args.length !== 1) return () => NaN;
      const a = C(node.args[0]);
      return (x) => f(a(x));
    }
    default: return (x) => evalFloat(node, { [v]: x });
  }
}

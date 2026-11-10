// Complex numbers (spec §4.3, step U4): exact numbers of ℚ(i) and float
// complexes, and the evaluation of a node with i in either.
//
//   CQ          exact a + bi, a and b in ℚ: add sub mul div neg conj abs2
//               pow(k) eq isZero isReal; CQ.of(x), toNode(), toString()
//   exactComplex(node, env?) → CQ | null      exact value in ℚ(i), or null
//               (√2, π, e^(iθ) are not in ℚ(i)); env: {z: CQ}
//   C(re, im)   a float complex {re, im}; cadd csub cmul cdiv cexp clog cpow
//               csqrt cabs carg cconj
//   evalComplex(node, env?) → {re, im} | null  float value; env: {z: {re, im}
//               or number}. null where undefined (division by 0, ln 0…)
//   complexValue(node, env?) → {exact: CQ | null, re, im} | null
//   sameComplex(a, b, tol?)   two float complexes equal (relative 1e−9)
//   cText(c) → '3 − 2i', French decimals for floats
//   polarParts(node) → {r, theta} nodes when node is written r·e^(iθ),
//               e^(iθ), r(cos θ + i sin θ) or cis-like; null otherwise
//   algebraicParts(node) → {re, im} nodes when node is written a + bi
//               (each part without i), null otherwise
//   principalArg(x) → x brought into ]−π ; π]

import { Q } from '../math/rational.js';
import { canonFn, stripParen, contains, num, lit, add, mul, neg as negN, cst } from './ast.js';
import { evalFloat } from './numeric.js';

// ---------- exact ℚ(i) ----------

export class CQ {
  constructor(re, im = new Q(0)) {
    this.re = Q.of(re);
    this.im = Q.of(im);
  }

  static of(x) {
    if (x instanceof CQ) return x;
    return new CQ(Q.of(x), new Q(0));
  }

  add(o) { o = CQ.of(o); return new CQ(this.re.add(o.re), this.im.add(o.im)); }
  sub(o) { o = CQ.of(o); return new CQ(this.re.sub(o.re), this.im.sub(o.im)); }
  mul(o) {
    o = CQ.of(o);
    return new CQ(this.re.mul(o.re).sub(this.im.mul(o.im)), this.re.mul(o.im).add(this.im.mul(o.re)));
  }
  abs2() { return this.re.mul(this.re).add(this.im.mul(this.im)); }
  conj() { return new CQ(this.re, this.im.neg()); }
  neg() { return new CQ(this.re.neg(), this.im.neg()); }
  inv() {
    const m = this.abs2();
    if (m.n === 0) throw new RangeError('Division par zéro');
    return new CQ(this.re.div(m), this.im.neg().div(m));
  }
  div(o) { return this.mul(CQ.of(o).inv()); }
  pow(k) {
    if (!Number.isInteger(k)) throw new RangeError('Exposant non entier');
    if (k < 0) return this.inv().pow(-k);
    let out = new CQ(1);
    let b = this;
    let e = k;
    while (e > 0) {
      if (e & 1) out = out.mul(b);
      b = b.mul(b);
      e >>= 1;
    }
    return out;
  }
  eq(o) { o = CQ.of(o); return this.re.eq(o.re) && this.im.eq(o.im); }
  isZero() { return this.re.n === 0 && this.im.n === 0; }
  isReal() { return this.im.n === 0; }
  // |z| when it is rational, else null.
  absQ() { return this.abs2().sqrt(); }
  toFloat() { return { re: this.re.valueOf(), im: this.im.valueOf() }; }

  // a + bi as a node: 3 − 2i, i, −i, 2i/3, 0.
  toNode() {
    const a = this.re;
    const b = this.im;
    const iTerm = (q) => {
      const m = q.n < 0 ? q.neg() : q;
      const body = m.eq(1) ? cst('i') : m.d === 1 ? mul(lit(m), cst('i')) : { t: 'frac', n: mul(num(m.n), cst('i')), d: num(m.d) };
      return body;
    };
    if (b.n === 0) return lit(a);
    if (a.n === 0) return b.n < 0 ? negN(iTerm(b)) : iTerm(b);
    const re = lit(a);
    return b.n < 0 ? { t: 'bin', op: '-', l: re, r: iTerm(b) } : add(re, iTerm(b));
  }

  toString() { return cText(this); }
}

const isI = (n) => n.t === 'const' && n.name === 'i';

// Exact value in ℚ(i), or null.
export function exactComplex(node, env = {}) {
  try { return ex(node, env); } catch { return null; }
}

class NotQi extends Error {}

function intOf(c) {
  if (!c.isReal() || c.re.d !== 1) throw new NotQi();
  if (Math.abs(c.re.n) > 4096) throw new NotQi();
  return c.re.n;
}

function ex(n, env) {
  switch (n.t) {
    case 'num': return new CQ(n.v);
    case 'const': if (isI(n)) return new CQ(0, 1); throw new NotQi();
    case 'sym': {
      const key = n.sub ? `${n.name}_` : n.name;
      if (env[key] instanceof CQ) return env[key];
      if (env[key] instanceof Q) return new CQ(env[key]);
      throw new NotQi();
    }
    case 'paren': return ex(n.e, env);
    case 'neg': return ex(n.e, env).neg();
    case 'bin': {
      const a = ex(n.l, env);
      const b = ex(n.r, env);
      if (n.op === '+') return a.add(b);
      if (n.op === '-') return a.sub(b);
      if (n.op === '×') return a.mul(b);
      return a.div(b);
    }
    case 'frac': return ex(n.n, env).div(ex(n.d, env));
    case 'pow': {
      const b = ex(n.b, env);
      const k = intOf(ex(n.e, env));
      if (b.isZero() && k < 0) throw new NotQi();
      return b.pow(k);
    }
    case 'abs': {
      const r = ex(n.e, env).absQ();
      if (!r) throw new NotQi();
      return new CQ(r);
    }
    case 'sqrt': {
      // √q for a rational square only (√(−4) is not taken as 2i).
      const v = ex(n.e, env);
      if (!v.isReal()) throw new NotQi();
      const r = v.re.sqrt();
      if (!r) throw new NotQi();
      return new CQ(r);
    }
    case 'fn': {
      const name = canonFn(n.name);
      if (n.args.length !== 1) throw new NotQi();
      const a = ex(n.args[0], env);
      if (name === 'conj') return a.conj();
      if (name === 'Re') return new CQ(a.re);
      if (name === 'Im') return new CQ(a.im);
      if (name === 'abs') { const r = a.absQ(); if (!r) throw new NotQi(); return new CQ(r); }
      throw new NotQi();
    }
    default: throw new NotQi();
  }
}

// ---------- float complexes ----------

export const C = (re, im = 0) => ({ re, im });
export const cadd = (a, b) => C(a.re + b.re, a.im + b.im);
export const csub = (a, b) => C(a.re - b.re, a.im - b.im);
export const cmul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
export const cconj = (a) => C(a.re, -a.im);
export const cabs = (a) => Math.hypot(a.re, a.im);
export const carg = (a) => Math.atan2(a.im, a.re);
export function cdiv(a, b) {
  const m = b.re * b.re + b.im * b.im;
  if (m === 0) return C(NaN, NaN);
  return C((a.re * b.re + a.im * b.im) / m, (a.im * b.re - a.re * b.im) / m);
}
export const cexp = (a) => C(Math.exp(a.re) * Math.cos(a.im), Math.exp(a.re) * Math.sin(a.im));
export function clog(a) {
  const r = cabs(a);
  if (r === 0) return C(NaN, NaN);
  return C(Math.log(r), carg(a));
}
export function cpow(a, b) {
  // Whole exponents by repeated products: exact signs for (−1)ⁿ, i⁴…
  if (b.im === 0 && Number.isInteger(b.re) && Math.abs(b.re) <= 64) {
    let out = C(1);
    let k = Math.abs(b.re);
    let base = a;
    while (k > 0) {
      if (k & 1) out = cmul(out, base);
      base = cmul(base, base);
      k >>= 1;
    }
    return b.re < 0 ? cdiv(C(1), out) : out;
  }
  if (a.re === 0 && a.im === 0) return b.re > 0 ? C(0) : C(NaN, NaN);
  return cexp(cmul(b, clog(a)));
}
export function csqrt(a) {
  const r = cabs(a);
  const re = Math.sqrt((r + a.re) / 2);
  const im = Math.sign(a.im || 1) * Math.sqrt(Math.max(0, (r - a.re) / 2));
  return C(re, a.im === 0 && a.re >= 0 ? 0 : im);
}
const csin = (a) => C(Math.sin(a.re) * Math.cosh(a.im), Math.cos(a.re) * Math.sinh(a.im));
const ccos = (a) => C(Math.cos(a.re) * Math.cosh(a.im), -Math.sin(a.re) * Math.sinh(a.im));
const csinh = (a) => C(Math.sinh(a.re) * Math.cos(a.im), Math.cosh(a.re) * Math.sin(a.im));
const ccosh = (a) => C(Math.cosh(a.re) * Math.cos(a.im), Math.sinh(a.re) * Math.sin(a.im));

const ok = (z) => z && Number.isFinite(z.re) && Number.isFinite(z.im);
const realOnly = new Set(['arctan', 'arcsin', 'arccos', 'argsh', 'argch', 'argth', 'tanh', 'tan', 'cot', 'logb']);

// Float value of a node with i, or null where it is undefined.
export function evalComplex(node, env = {}) {
  const z = ev(node, env);
  return ok(z) ? z : null;
}

function ev(n, env) {
  const E = (x) => ev(x, env);
  switch (n.t) {
    case 'num': return C(n.v.n / n.v.d);
    case 'float': return C(n.x);
    case 'const':
      if (n.name === 'i') return C(0, 1);
      if (n.name === 'pi') return C(Math.PI);
      if (n.name === 'e') return C(Math.E);
      return C(NaN, NaN);
    case 'sym': {
      const key = n.sub ? `${n.name}_` : n.name;
      if (!(key in env)) return C(NaN, NaN);
      const v = env[key];
      if (typeof v === 'number') return C(v);
      if (v instanceof CQ) return v.toFloat();
      if (v instanceof Q) return C(v.valueOf());
      return v;
    }
    case 'paren': return E(n.e);
    case 'neg': { const a = E(n.e); return C(-a.re, -a.im); }
    case 'bin': {
      const a = E(n.l);
      const b = E(n.r);
      if (n.op === '+') return cadd(a, b);
      if (n.op === '-') return csub(a, b);
      if (n.op === '×') return cmul(a, b);
      return cdiv(a, b);
    }
    case 'frac': return cdiv(E(n.n), E(n.d));
    case 'pow': {
      const b = stripParen(n.b);
      if (b.t === 'const' && b.name === 'e') return cexp(E(n.e));
      return cpow(E(n.b), E(n.e));
    }
    case 'sqrt': return csqrt(E(n.e));
    case 'root': {
      const k = E(n.n);
      const x = E(n.e);
      // A real odd root of a real number stays real: ∛(−8) = −2.
      if (x.im === 0 && k.im === 0 && Number.isInteger(k.re) && k.re % 2 === 1 && x.re < 0) return C(-((-x.re) ** (1 / k.re)));
      return cpow(x, C(1 / k.re));
    }
    case 'abs': return C(cabs(E(n.e)));
    case 'fn': {
      const name = canonFn(n.name);
      if (n.args.length !== 1) {
        if ((name === 'min' || name === 'max') && n.args.length >= 2) {
          const xs = n.args.map(E);
          if (xs.some((x) => Math.abs(x.im) > 1e-12)) return C(NaN, NaN);
          return C((name === 'min' ? Math.min : Math.max)(...xs.map((x) => x.re)));
        }
        return C(NaN, NaN);
      }
      const a = E(n.args[0]);
      switch (name) {
        case 'conj': return cconj(a);
        case 'Re': return C(a.re);
        case 'Im': return C(a.im);
        case 'arg': return a.re === 0 && a.im === 0 ? C(NaN, NaN) : C(carg(a));
        case 'abs': return C(cabs(a));
        case 'exp': return cexp(a);
        case 'ln': return clog(a);
        case 'sin': return csin(a);
        case 'cos': return ccos(a);
        case 'sinh': return csinh(a);
        case 'cosh': return ccosh(a);
        case 'sqrt': return csqrt(a);
        default:
          if (realOnly.has(name) && Math.abs(a.im) < 1e-14) return C(evalFloat({ t: 'fn', name, args: [{ t: 'float', x: a.re }] }, {}));
          return C(NaN, NaN);
      }
    }
    default: {
      // Anything else without i (sums, integrals) by the real evaluator.
      if (contains(n, isI)) return C(NaN, NaN);
      const env2 = {};
      for (const [k, v] of Object.entries(env)) {
        const f = typeof v === 'number' ? C(v) : v instanceof CQ ? v.toFloat() : v instanceof Q ? C(v.valueOf()) : v;
        if (f && f.im === 0) env2[k] = f.re;
      }
      return C(evalFloat(n, env2));
    }
  }
}

// Exact value when there is one, float always.
export function complexValue(node, env = {}) {
  const exact = exactComplex(node, env);
  if (exact) return { exact, ...exact.toFloat() };
  const z = evalComplex(node, env);
  return z ? { exact: null, ...z } : null;
}

export function sameComplex(a, b, tol = 1e-9) {
  if (a.exact && b.exact) return a.exact.eq(b.exact);
  const scale = 1 + cabs(a) + cabs(b);
  return Math.abs(a.re - b.re) <= tol * scale && Math.abs(a.im - b.im) <= tol * scale;
}

// French writing of a complex: '3 − 2i', '−i', '0,5 + 1,25i'.
export function cText(c) {
  const fmt = (x) => {
    if (x instanceof Q) return x.toString().replace('-', '−');
    const r = Math.round(x * 1e4) / 1e4;
    return String(r).replace('.', ',').replace('-', '−');
  };
  const re = c.re;
  const im = c.im;
  const zero = (x) => (x instanceof Q ? x.n === 0 : Math.abs(x) < 1e-12);
  const neg = (x) => (x instanceof Q ? x.n < 0 : x < 0);
  const absOf = (x) => (x instanceof Q ? (x.n < 0 ? x.neg() : x) : Math.abs(x));
  const one = (x) => (x instanceof Q ? x.eq(1) : Math.abs(x - 1) < 1e-12);
  const iPart = (x) => `${one(absOf(x)) ? '' : fmt(absOf(x))}i`;
  if (zero(im)) return fmt(re);
  if (zero(re)) return `${neg(im) ? '−' : ''}${iPart(im)}`;
  return `${fmt(re)} ${neg(im) ? '−' : '+'} ${iPart(im)}`;
}

export function principalArg(x) {
  let t = x % (2 * Math.PI);
  if (t <= -Math.PI) t += 2 * Math.PI;
  if (t > Math.PI) t -= 2 * Math.PI;
  return t;
}

// ---------- forms ----------

const hasI = (n) => contains(n, isI);

// The terms of a sum, with their signs: [{node, sign}].
function termsOf(n, sign = 1, out = []) {
  n = stripParen(n);
  if (n.t === 'bin' && (n.op === '+' || n.op === '-')) {
    termsOf(n.l, sign, out);
    termsOf(n.r, n.op === '-' ? -sign : sign, out);
  } else if (n.t === 'neg') termsOf(n.e, -sign, out);
  else out.push({ node: n, sign });
  return out;
}

// The factor of i in a product term (3i, i·√2, 2i/3, i/2, √3·i), or null.
function iFactor(n) {
  n = stripParen(n);
  if (isI(n)) return num(1);
  if (n.t === 'neg') { const f = iFactor(n.e); return f ? negN(f) : null; }
  if (n.t === 'bin' && n.op === '×') {
    if (isI(stripParen(n.r)) && !hasI(n.l)) return n.l;
    if (isI(stripParen(n.l)) && !hasI(n.r)) return n.r;
    const l = !hasI(n.l) ? iFactor(n.r) : null;
    if (l) return mul(n.l, l);
    const r = !hasI(n.r) ? iFactor(n.l) : null;
    if (r) return mul(r, n.r);
    return null;
  }
  if (n.t === 'frac' && !hasI(n.d)) {
    const f = iFactor(n.n);
    return f ? { t: 'frac', n: f, d: n.d } : null;
  }
  return null;
}

// a + bi with a and b written without i (at most one real and one i term).
export function algebraicParts(node) {
  const ts = termsOf(node);
  let re = null;
  let im = null;
  for (const { node: t, sign } of ts) {
    if (!hasI(t)) {
      if (re) return null;
      re = sign < 0 ? negN(t) : t;
    } else {
      const f = iFactor(t);
      if (!f || im) return null;
      im = sign < 0 ? negN(f) : f;
    }
  }
  return { re: re ?? num(0), im: im ?? num(0) };
}

// r·e^(iθ), e^(iθ), r·(cos θ + i sin θ): {r, theta, kind: 'exp'|'trig'}.
export function polarParts(node) {
  let n = stripParen(node);
  let r = num(1);
  let sign = 1;
  if (n.t === 'neg') { sign = -1; n = stripParen(n.e); }
  if (n.t === 'bin' && n.op === '×' && !hasI(n.l)) { r = n.l; n = stripParen(n.r); }
  const theta = expTheta(n) ?? trigTheta(n);
  if (!theta) return null;
  return { r: sign < 0 ? negN(r) : r, theta: theta.theta, kind: theta.kind };
}

function expTheta(n) {
  let e = null;
  if (n.t === 'pow' && stripParen(n.b).t === 'const' && stripParen(n.b).name === 'e') e = n.e;
  if (n.t === 'fn' && canonFn(n.name) === 'exp') e = n.args[0];
  if (!e) return null;
  const f = iFactor(e);
  if (!f || hasI(f)) return null;
  // The whole exponent must be i·θ.
  const parts = algebraicParts(e);
  if (!parts || evalFloat(parts.re, {}) !== 0) return null;
  return { theta: f, kind: 'exp' };
}

function trigTheta(n) {
  const ts = termsOf(n);
  if (ts.length !== 2) return null;
  const [a, b] = ts;
  if (a.sign < 0) return null;
  const cosArg = stripParen(a.node).t === 'fn' && canonFn(stripParen(a.node).name) === 'cos' ? stripParen(a.node).args[0] : null;
  if (!cosArg) return null;
  const f = iFactor(b.node);
  if (!f) return null;
  const s = stripParen(f);
  if (!(s.t === 'fn' && canonFn(s.name) === 'sin')) return null;
  const sinArg = s.args[0];
  // cos θ − i sin θ is not the form (it is cos(−θ) + i sin(−θ)).
  if (b.sign < 0) return null;
  const x = evalFloat(cosArg, {});
  const y = evalFloat(sinArg, {});
  if (!Number.isFinite(x) || Math.abs(y - x) > 1e-12 * (1 + Math.abs(x))) return null;
  return { theta: cosArg, kind: 'trig' };
}

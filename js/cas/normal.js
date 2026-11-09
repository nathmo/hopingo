// Exact normal form (spec §4.3, §4.4). An expression is read as a rational
// function of its variables, where every sub-expression that is not
// rational (sin(3x), e^(2x), √x) becomes one opaque variable named by its
// own normal form. So 2x·sin(3x) + x²·3cos(3x) and 3x²cos(3x) + 2x·sin(3x)
// are equal exactly. With opaque parts, a difference that does not vanish
// proves nothing (sin² + cos² = 1): equalExact then says null.
//
// pretty(node) is a display simplification, not a normal form: numbers in
// front, equal factors gathered (x·x² = x³), like terms added, no expansion
// of brackets except in the numerator of a quotient.

import { Q } from '../math/rational.js';
import { Poly } from './poly.js';
import { RatFun } from './ratfun.js';
import {
  num, lit, sym, fn, neg, add, sub, mul, div, pow, numValue, stripParen, canonFn, mapNode,
} from './ast.js';
import { expandDerivs } from './diff.js';
import { toText } from './print.js';

export class NotExact extends Error {}

const MAX_POW = 40;
// f(0) for functions whose value at 0 is exact.
const AT_ZERO = { sin: 0, tan: 0, arcsin: 0, arctan: 0, sinh: 0, tanh: 0, argsh: 0, argth: 0, cos: 1, cosh: 1, exp: 1 };

const newCtx = () => ({ atoms: new Map(), opaque: false });

// log_b(x) when it is rational: b^r = x with r = n/d, d ≤ 12 (log₄ 8 = 3/2).
function logRational(b, x) {
  if (b.n <= 0 || b.eq(1) || x.n <= 0) return null;
  const r = Math.log(x.n / x.d) / Math.log(b.n / b.d);
  for (let d = 1; d <= 12; d++) {
    const n = Math.round(r * d);
    if (Math.abs(n / d - r) > 1e-9 || Math.abs(n) > 60) continue;
    // x^d = b^n, exactly.
    const lhs = x.pow(d);
    const rhs = n >= 0 ? b.pow(n) : new Q(1).div(b.pow(-n));
    if (lhs.eq(rhs)) return new Q(n, d);
  }
  return null;
}

// The term of a Σ for the index value j.
export const atIndex = (node, j) => mapNode(node.e, (x) => (x.t === 'sym' && !x.sub && x.name === node.k ? { t: 'paren', e: lit(Q.of(j)) } : x));

function atom(ctx, key, node) {
  ctx.opaque = true;
  if (!ctx.atoms.has(key)) ctx.atoms.set(key, node);
  return RatFun.variable(key);
}

// Exact rational root of a positive rational, or null.
function exactRoot(q, k) {
  if (q.n < 0 && k % 2 === 0) return null;
  const r = (x) => { const s = Math.round(Math.sign(x) * Math.abs(x) ** (1 / k)); return s ** k === x ? s : null; };
  const n = r(q.n);
  const d = r(q.d);
  return n !== null && d !== null ? new Q(n, d) : null;
}

function powFrac(baseNode, p, qd, ctx, node) {
  const b = toRF(baseNode, ctx);
  if (b.isConst) {
    const v = b.constValue();
    const root = exactRoot(v, qd);
    if (root) return RatFun.const(root).pow(p);
  }
  const key = `pow(${b.canon()},1/${qd})`;
  return atom(ctx, key, { t: 'pow', b: baseNode, e: { t: 'frac', n: num(1), d: num(qd) } }).pow(p);
}

function toRF(node, ctx) {
  switch (node.t) {
    case 'num': return RatFun.const(node.v);
    case 'const':
      if (node.name === 'pi') return atom(ctx, 'π', node);
      if (node.name === 'e') return atom(ctx, 'exp(1)', node);
      throw new NotExact();
    case 'sym': {
      const key = node.sub ? `${node.name}_${typeof node.sub === 'object' ? toRF(node.sub, ctx).canon() : node.sub}` : node.name;
      if (!ctx.atoms.has(key)) ctx.atoms.set(key, node);
      return RatFun.variable(key);
    }
    case 'paren': return toRF(node.e, ctx);
    case 'neg': return toRF(node.e, ctx).neg();
    case 'bin': {
      const a = toRF(node.l, ctx);
      const b = toRF(node.r, ctx);
      if (node.op === '+') return a.add(b);
      if (node.op === '-') return a.sub(b);
      if (node.op === '×') return a.mul(b);
      return a.div(b);
    }
    case 'frac': return toRF(node.n, ctx).div(toRF(node.d, ctx));
    case 'pow': {
      const e = toRF(node.e, ctx);
      if (e.isConst) {
        const k = e.constValue();
        if (k.isInt() && Math.abs(k.n) <= MAX_POW) return toRF(node.b, ctx).pow(k.n);
        if (Math.abs(k.n) <= MAX_POW && k.d <= 12) return powFrac(node.b, k.n, k.d, ctx, node);
      }
      const b = stripParen(node.b);
      if (b.t === 'const' && b.name === 'e') return atom(ctx, `exp(${e.canon()})`, fn('exp', node.e));
      return atom(ctx, `pow(${toRF(node.b, ctx).canon()},${e.canon()})`, node);
    }
    case 'sqrt': return powFrac(node.e, 1, 2, ctx, node);
    case 'root': {
      const k = numValue(node.n);
      if (!k || !k.isInt() || k.n < 2) throw new NotExact();
      return powFrac(node.e, 1, k.n, ctx, node);
    }
    case 'abs': {
      const u = toRF(node.e, ctx);
      if (u.isConst) { const v = u.constValue(); return RatFun.const(v.n < 0 ? v.neg() : v); }
      return atom(ctx, `abs(${u.canon()})`, node);
    }
    case 'fn': {
      if (node.name === 'logb' && node.args.length === 2) {
        const b = toRF(node.args[0], ctx);
        const u = toRF(node.args[1], ctx);
        if (b.isConst && u.isConst) {
          const r = logRational(b.constValue(), u.constValue());
          if (r) return RatFun.const(r);
        }
        return atom(ctx, `logb(${b.canon()},${u.canon()})`, node);
      }
      if (node.args.length !== 1) throw new NotExact();
      const name = canonFn(node.name);
      const u = toRF(node.args[0], ctx);
      if (u.isConst) {
        const v = u.constValue();
        if (v.n === 0 && name in AT_ZERO) return RatFun.const(AT_ZERO[name]);
        if (name === 'ln' && v.eq(1)) return RatFun.const(0);
      }
      return atom(ctx, `${name}(${u.canon()})`, node);
    }
    case 'deriv': return toRF(expandDerivs(node), ctx);
    case 'sum': {
      // Σ with whole-number bounds: added term by term; with a bound in n,
      // an opaque atom (compared at sampled whole n by equiv.js).
      const lo = toRF(node.lo, ctx);
      const hi = toRF(node.hi, ctx);
      if (lo.isConst && hi.isConst) {
        const a = lo.constValue();
        const b = hi.constValue();
        if (a.isInt() && b.isInt() && b.n - a.n <= 400) {
          let out = RatFun.const(0);
          for (let j = a.n; j <= b.n; j++) out = out.add(toRF(atIndex(node, j), ctx));
          return out;
        }
      }
      let inner;
      try { inner = toRF(node.e, newCtx()).canon(); } catch { inner = toText(node.e); }
      return atom(ctx, `sum(${inner};${node.k};${lo.canon()};${hi.canon()})`, node);
    }
    default: throw new NotExact();
  }
}

export function toRatFun(node) {
  const ctx = newCtx();
  const rf = toRF(node, ctx);
  return { rf, atoms: ctx.atoms, opaque: ctx.opaque };
}

// true, false, or null when it cannot decide exactly.
export function equalExact(a, b) {
  try {
    const ctx = newCtx();
    const d = toRF(a, ctx).sub(toRF(b, ctx));
    if (d.isZero) return true;
    return ctx.opaque ? null : false;
  } catch {
    return null;
  }
}

// A key equal for equal rational expressions (null if not computable).
export function canonKey(node) {
  try { return toRF(node, newCtx()).canon(); } catch { return null; }
}

// The exact value of an expression without variables, or null.
export function exactValue(node) {
  try {
    const ctx = newCtx();
    const rf = toRF(node, ctx);
    // Opaque parts that cancel out (e⁰, π·0) leave an exact number.
    return rf.isConst ? rf.constValue() : null;
  } catch { return null; }
}

// ---------- back to nodes ----------

const isPlain = (name, atoms) => atoms.get(name)?.t === 'sym' || !atoms.has(name);

function termNode(m, atoms) {
  const plain = m.filter(([v]) => isPlain(v, atoms)).sort((a, b) => (a[0] < b[0] ? -1 : 1));
  const other = m.filter(([v]) => !isPlain(v, atoms));
  let out = num(1);
  for (const [v, e] of [...plain, ...other]) {
    const base = atoms.get(v) ?? sym(v);
    out = mul(out, e === 1 ? base : pow(base, num(e)));
  }
  return out;
}

function polyToNode(p, atoms, { byDegree = false } = {}) {
  let terms = [...p.terms.values()];
  if (byDegree) {
    const deg = (t) => t.m.reduce((s, [, e]) => s + e, 0);
    terms = terms.map((t, i) => ({ t, i })).sort((a, b) => deg(b.t) - deg(a.t) || a.i - b.i).map(({ t }) => t);
  }
  if (!terms.length) return num(0);
  let out = null;
  for (const { m, c } of terms) {
    const body = mul(lit(c.n < 0 ? c.neg() : c), termNode(m, atoms));
    if (!out) out = c.n < 0 ? neg(body) : body;
    else out = c.n < 0 ? sub(out, body) : add(out, body);
  }
  return out;
}

// Canonical node for a rational expression (atoms kept as written).
export function normalize(node) {
  const ctx = newCtx();
  const rf = toRF(node, ctx).reduce();
  const n = polyToNode(rf.n, ctx.atoms, { byDegree: true });
  return rf.d.isConst ? div(n, lit(rf.d.constValue())) : div(n, polyToNode(rf.d, ctx.atoms, { byDegree: true }));
}

// ---------- display simplification ----------

const keyOf = (n) => canonKey(n) ?? toText(n);

// Factors of a product: coefficient, then [{base, k, key}] above and below the bar.
function factorize(node) {
  let coef = new Q(1);
  const up = [];
  const down = [];
  const push = (list, base, k) => {
    const key = keyOf(base);
    const f = list.find((x) => x.key === key);
    if (f) f.k = f.k.add(k); else list.push({ base, k, key });
  };
  const walk = (n, below) => {
    n = stripParen(n);
    const v = numValue(n);
    if (v) { coef = below ? coef.div(v) : coef.mul(v); return; }
    if (n.t === 'neg') { coef = coef.neg(); walk(n.e, below); return; }
    if (n.t === 'bin' && n.op === '×') { walk(n.l, below); walk(n.r, below); return; }
    if (n.t === 'frac' || (n.t === 'bin' && n.op === '÷')) {
      walk(n.t === 'frac' ? n.n : n.l, below);
      walk(n.t === 'frac' ? n.d : n.r, !below);
      return;
    }
    if (n.t === 'pow') {
      const k = numValue(n.e);
      if (k && k.isInt()) { push(below ? down : up, pretty(n.b), k); return; }
    }
    push(below ? down : up, pretty(n), new Q(1));
  };
  walk(node, false);
  // Cancel what appears above and below.
  for (const f of up) {
    const g = down.find((x) => x.key === f.key);
    if (!g) continue;
    const k = f.k.sub(g.k);
    if (k.n >= 0) { f.k = k; g.k = new Q(0); } else { g.k = k.neg(); f.k = new Q(0); }
  }
  return { coef, up: up.filter((f) => f.k.n !== 0), down: down.filter((f) => f.k.n !== 0) };
}

function buildProduct(list) {
  const plain = list.filter((f) => f.base.t === 'sym').sort((a, b) => (a.base.name < b.base.name ? -1 : 1));
  const other = list.filter((f) => f.base.t !== 'sym');
  let out = num(1);
  for (const f of [...plain, ...other]) {
    const k = f.k;
    const factor = k.eq(1) ? f.base : k.isInt() && k.n < 0 ? div(num(1), pow(f.base, lit(k.neg()))) : pow(f.base, lit(k));
    out = mul(out, factor);
  }
  return out;
}

function prettyProduct(node) {
  const { coef, up, down } = factorize(node);
  if (coef.n === 0) return num(0);
  let top = buildProduct(up);
  const bottom = buildProduct(down);
  const sign = coef.n < 0;
  const c = sign ? coef.neg() : coef;
  let out;
  if (down.length) {
    top = mul(lit(new Q(c.n)), top);
    out = div(top, c.d === 1 ? bottom : mul(lit(c.d), bottom));
  } else out = mul(lit(c), top);
  return sign ? neg(out) : out;
}

function sumTerms(node, sign = 1, out = []) {
  node = stripParen(node);
  if (node.t === 'bin' && (node.op === '+' || node.op === '-')) {
    sumTerms(node.l, sign, out);
    sumTerms(node.r, node.op === '-' ? -sign : sign, out);
  } else if (node.t === 'neg') sumTerms(node.e, -sign, out);
  else out.push(sign < 0 ? neg(node) : node);
  return out;
}

function prettySum(node) {
  const terms = sumTerms(node).map(prettyProduct);
  // Add like terms: same factors, different coefficients.
  const groups = [];
  for (const t of terms) {
    const { coef, up, down } = factorize(t);
    if (coef.n === 0) continue;
    const key = [...up.map((f) => `${f.key}^${f.k}`).sort(), '/', ...down.map((f) => `${f.key}^${f.k}`).sort()].join('|');
    const g = groups.find((x) => x.key === key);
    if (g) g.coef = g.coef.add(coef); else groups.push({ key, coef, up, down });
  }
  const live = groups.filter((g) => g.coef.n !== 0);
  if (!live.length) return num(0);
  const allPlain = live.every((g) => !g.down.length && g.up.every((f) => f.base.t === 'sym'));
  if (allPlain) {
    const deg = (g) => g.up.reduce((s, f) => s + f.k.valueOf(), 0);
    live.sort((a, b) => deg(b) - deg(a));
  }
  let out = null;
  for (const g of live) {
    const body = prettyProduct(mul(lit(g.coef.n < 0 ? g.coef.neg() : g.coef), g.down.length
      ? div(buildProduct(g.up), buildProduct(g.down)) : buildProduct(g.up)));
    if (!out) out = g.coef.n < 0 ? neg(body) : body;
    else out = g.coef.n < 0 ? sub(out, body) : add(out, body);
  }
  return out;
}

// A polynomial numerator is expanded and ordered; anything else is tidied.
function prettyNumerator(node) {
  try {
    const ctx = newCtx();
    const rf = toRF(node, ctx);
    if (!ctx.opaque && rf.d.isConst) return polyToNode(rf.n.scale(new Q(1).div(rf.d.constValue())), ctx.atoms, { byDegree: true });
  } catch { /* not rational */ }
  return prettySum(node);
}

export function pretty(node) {
  node = stripParen(node);
  switch (node.t) {
    case 'num': case 'sym': case 'const': return node;
    case 'fn': return fn(node.name, ...node.args.map(pretty));
    case 'sqrt': return { t: 'sqrt', e: pretty(node.e) };
    case 'abs': return { t: 'abs', e: pretty(node.e) };
    case 'sum': return { ...node, e: pretty(node.e) };
    case 'neg': {
      const inner = stripParen(node.e);
      if (inner.t === 'frac') return neg(pretty(inner));
      return prettySum(node);
    }
    case 'frac': {
      if (numValue(node.d)) return prettySum(node);
      const n = prettyNumerator(node.n);
      const d = prettyProduct(node.d);
      if (n.t === 'neg') return neg(div(n.e, d));
      return div(n, d);
    }
    case 'pow': {
      const k = numValue(node.e);
      if (k) return pow(pretty(node.b), lit(k));
      const b = stripParen(node.b);
      return pow(b.t === 'const' ? b : pretty(node.b), prettySum(node.e));
    }
    default: return prettySum(node);
  }
}

// Truncated series (spec §4.3, step U2): developments limités and Laurent
// expansions, used by the judges `series` and `limit`.
//
//   series(node, v, at, order, {dir, env}) → {lo, coeffs, order, remainder,
//       exact, valuation}
//     node = Σ coeffs[i]·h^(lo + i) + o(h^order), h = v − at (h = 1/v at
//     ±∞). coeffs are exact (Q) when they can be, else floats (e, ln 2,
//     π…): `exact` says whether all of them are. `remainder` is true when
//     the order comes from the line itself (an ε(x) or o(xⁿ) in it), false
//     when it is only where the computation stopped. `valuation` is the
//     first exponent with a non-zero coefficient (null if none is known).
//     at: a number (or Q), '+inf' or '-inf'. dir: +1, −1 (one side) or 0.
//     Throws NotSeries when the expression has no such expansion (ln x at
//     0, e^(1/x), an unknown letter).
//   seriesToNode(s, v, at) → the node P(h) + hⁿ·ε(v).
//   coefEqual(a, b) → exact or float equality of two coefficients.
//
// The remainder is tracked: ε(x) is 0 + o(1), so x³·ε(x) is known to order
// 3; a product A·B is known to min(oA + vB, oB + vA) (v the valuations); a
// quotient by B of valuation v loses 2v; f(u) with u → 0 keeps the order of
// u. Functions are expanded at the constant term of their argument: exp,
// sin, cos and the powers by their formulas, the arc and argument functions
// and ln by integrating the series of their derivative.

import { Q } from '../math/rational.js';
import { canonFn, stripParen, num, lit, add, mul, pow, neg, sym } from './ast.js';
import { expandDerivs } from './diff.js';

export class NotSeries extends Error {}

const NO = (msg = 'pas de développement') => { throw new NotSeries(msg); };

// ---------- coefficients: Q, or a float when not exact ----------

const isQ = (a) => a instanceof Q;
const F = (a) => (isQ(a) ? a.n / a.d : a);
function tryQ(fn, fl) { try { return fn(); } catch { return fl(); } }
const cAdd = (a, b) => (isQ(a) && isQ(b) ? tryQ(() => a.add(b), () => F(a) + F(b)) : F(a) + F(b));
const cSub = (a, b) => (isQ(a) && isQ(b) ? tryQ(() => a.sub(b), () => F(a) - F(b)) : F(a) - F(b));
const cMul = (a, b) => (isQ(a) && isQ(b) ? tryQ(() => a.mul(b), () => F(a) * F(b)) : F(a) * F(b));
const cDiv = (a, b) => (isQ(a) && isQ(b) ? tryQ(() => a.div(b), () => F(a) / F(b)) : F(a) / F(b));
const cNeg = (a) => (isQ(a) ? a.neg() : -a);
const cZero = (a) => (isQ(a) ? a.n === 0 : Math.abs(a) < 1e-12);
const ZERO = new Q(0);
const ONE = new Q(1);
const cOf = (x) => (Number.isSafeInteger(x) ? new Q(x) : x);

export function coefEqual(a, b) {
  if (isQ(a) && isQ(b)) return a.eq(b);
  const x = F(a);
  const y = F(b);
  return Math.abs(x - y) <= 1e-9 * (1 + Math.abs(x) + Math.abs(y));
}

// ---------- truncated series ----------
// {lo, c, o, rem}: Σ c[i] h^(lo+i) for lo + i ≤ o, plus o(h^o).

const mk = (lo, c, o, rem) => {
  const out = { lo, c: [], o, rem };
  for (let k = lo; k <= o; k++) out.c.push(c[k - lo] ?? ZERO);
  return out;
};
const at = (s, k) => (k < s.lo || k > s.o ? ZERO : s.c[k - s.lo]);
const constS = (a, W) => mk(0, [a], W, false);

function val(s) {
  for (let k = s.lo; k <= s.o; k++) if (!cZero(at(s, k))) return k;
  return null;
}
// A lower bound of the valuation, for the order of products.
const vLow = (s) => val(s) ?? s.o;

function sAdd(a, b, W) {
  const lo = Math.min(a.lo, b.lo);
  const o = Math.min(a.o, b.o, W);
  const rem = (a.o <= b.o ? a.rem : b.rem) && o < W;
  const c = [];
  for (let k = lo; k <= o; k++) c.push(cAdd(at(a, k), at(b, k)));
  return mk(lo, c, o, rem);
}
const sNeg = (a) => ({ ...a, c: a.c.map(cNeg) });
const sScale = (a, k) => ({ ...a, c: a.c.map((x) => cMul(x, k)) });

function sMul(a, b, W) {
  const va = vLow(a);
  const vb = vLow(b);
  const o = Math.min(a.o + vb, b.o + va, W);
  const rem = o < W && (a.rem || b.rem);
  const lo = a.lo + b.lo;
  const c = [];
  for (let k = lo; k <= o; k++) {
    let s = ZERO;
    for (let i = a.lo; i <= a.o; i++) {
      const j = k - i;
      if (j < b.lo || j > b.o) continue;
      const x = at(a, i);
      const y = at(b, j);
      if (cZero(x) || cZero(y)) continue;
      s = cAdd(s, cMul(x, y));
    }
    c.push(s);
  }
  return mk(lo, c, o, rem);
}

// Σ a_k u^k for u → 0 (valuation ≥ 1, or a remainder only).
function compose(coef, u, W) {
  const v = val(u);
  if (v !== null && v < 1) NO();
  if (u.o < 0) NO('ordre trop faible');
  if (v === null) return mk(0, [coef(0)], Math.min(u.o, W), u.rem && u.o < W);
  let out = constS(coef(0), W);
  let p = constS(ONE, W);
  for (let k = 1; k * v <= W; k++) {
    p = sMul(p, u, W);
    const a = coef(k);
    if (!cZero(a)) out = sAdd(out, sScale(p, a), W);
    else out = sAdd(out, sScale(p, ZERO), W);
  }
  return out;
}

// Leading term: s = a·h^v·(1 + w), w → 0.
function split(s, W) {
  const v = val(s);
  if (v === null) NO('terme principal inconnu');
  const a = at(s, v);
  const c = [];
  for (let k = v; k <= s.o; k++) c.push(k === v ? ZERO : cDiv(at(s, k), a));
  const w = mk(0, c, s.o - v, s.rem);
  return { v, a, w };
}

function sInv(s, W) {
  const { v, a, w } = split(s, W);
  // 1/(1 + w) = Σ (−w)^k; known to the order of w, then shifted by −v.
  const inv = compose((k) => (k % 2 ? new Q(-1) : ONE), w, W + v);
  const shifted = mk(inv.lo - v, inv.c.map((x) => cDiv(x, a)), Math.min(inv.o - v, W), inv.rem);
  return shifted;
}
const sDiv = (a, b, W) => sMul(a, sInv(b, W + Math.max(0, val(b) ?? 0)), W);

function sPowInt(s, n, W) {
  if (n === 0) return constS(ONE, W);
  if (n < 0) return sInv(sPowInt(s, -n, W + 2 * Math.abs(n) * Math.max(0, val(s) ?? 0)), W);
  let out = constS(ONE, W);
  for (let i = 0; i < n; i++) out = sMul(out, s, W);
  return out;
}

// Generalised binomial coefficient α(α − 1)…(α − k + 1)/k!.
function binom(alpha, k) {
  let c = ONE;
  for (let i = 0; i < k; i++) c = cDiv(cMul(c, cSub(alpha, new Q(i))), new Q(i + 1));
  return c;
}

// a^(p/q) for a coefficient a, real: exact when possible.
function cPowRat(a, alpha) {
  if (isQ(a) && isQ(alpha)) {
    if (alpha.d === 1) return tryQ(() => a.pow(alpha.n), () => F(a) ** alpha.n);
    const root = exactRoot(a, alpha.d);
    if (root) return tryQ(() => root.pow(alpha.n), () => F(root) ** alpha.n);
  }
  const x = F(a);
  const al = F(alpha);
  if (x < 0) {
    const d = isQ(alpha) ? alpha.d : 0;
    if (d % 2 === 1) return (isQ(alpha) && alpha.n % 2 ? -1 : 1) * (-x) ** al;
    NO('racine d\'un nombre négatif');
  }
  return x ** al;
}
function exactRoot(q, k) {
  if (q.n < 0 && k % 2 === 0) return null;
  const r = (x) => { const s = Math.round(Math.sign(x) * Math.abs(x) ** (1 / k)); return s ** k === x ? s : null; };
  const n = r(q.n);
  const d = r(q.d);
  return n !== null && d !== null ? new Q(n, d) : null;
}

// s^α for a rational (or real) α: the leading term goes out first.
function sPowReal(s, alpha, W, dir) {
  if (isQ(alpha) && alpha.d === 1) return sPowInt(s, alpha.n, W);
  const { v, a, w } = split(s, W);
  const va = isQ(alpha) ? new Q(v).mul(alpha) : v * alpha;
  if (!(isQ(va) ? va.d === 1 : Number.isInteger(va))) NO('puissance fractionnaire de h');
  const e = F(va);
  // Sign of the leading term a·h^v on the side we look at.
  let sign = Math.sign(F(a));
  if (v % 2 !== 0) {
    if (!dir) NO('côté non précisé');
    sign *= dir;
  }
  // (a·h^v)^α = ±|a|^α·|h|^(vα): a negative base needs an odd root.
  let lead = cPowRat(F(a) < 0 ? cNeg(a) : a, alpha);
  if (sign < 0) {
    if (!(isQ(alpha) && alpha.d % 2 === 1)) NO("racine d'un nombre négatif");
    if (alpha.n % 2) lead = cNeg(lead);
  }
  // |h|^e = (−1)^e·h^e when h < 0; not a series on both sides if e is odd.
  if (e % 2 !== 0) {
    if (!dir) NO('côté non précisé');
    if (dir < 0) lead = cNeg(lead);
  }
  const body = compose((k) => binom(alpha, k), w, W);
  return mk(body.lo + e, body.c.map((x) => cMul(x, lead)), Math.min(body.o + e, W), body.rem);
}

// The constant term and what tends to 0: s = c0 + u.
function center(s) {
  const v = val(s);
  if (v !== null && v < 0) NO('l\'argument tend vers l\'infini');
  if (s.o < 0) NO('ordre trop faible');
  const c0 = at(s, 0);
  const u = mk(Math.max(1, s.lo), s.c.slice(Math.max(0, 1 - s.lo)), s.o, s.rem);
  return { c0, u: { ...u, lo: Math.max(1, s.lo) } };
}

const fact = (k) => { let f = ONE; for (let i = 2; i <= k; i++) f = cMul(f, new Q(i)); return f; };

function sExp(s, W) {
  const { c0, u } = center(s);
  const base = compose((k) => cDiv(ONE, fact(k)), u, W);
  if (cZero(c0)) return base;
  return sScale(base, Math.exp(F(c0)));
}
const SIN = (k) => (k % 2 ? cDiv(new Q(((k - 1) / 2) % 2 ? -1 : 1), fact(k)) : ZERO);
const COS = (k) => (k % 2 ? ZERO : cDiv(new Q((k / 2) % 2 ? -1 : 1), fact(k)));
function sSinCos(s, W, which) {
  const { c0, u } = center(s);
  const su = compose(SIN, u, W);
  const cu = compose(COS, u, W);
  if (cZero(c0)) return which === 'sin' ? su : cu;
  const sc = Math.sin(F(c0));
  const cc = Math.cos(F(c0));
  // sin(c + u) = sin c cos u + cos c sin u ; cos(c + u) = cos c cos u − sin c sin u.
  return which === 'sin' ? sAdd(sScale(cu, sc), sScale(su, cc), W) : sAdd(sScale(cu, cc), sScale(su, -sc), W);
}

function deriv(s) {
  const c = [];
  const from = Math.max(1, s.lo);
  for (let k = from; k <= s.o; k++) c.push(cMul(at(s, k), new Q(k)));
  return mk(from - 1, c, s.o - 1, s.rem);
}
function integ(s, c0) {
  if (val(s) !== null && val(s) < 0) NO();
  const c = [c0];
  for (let k = 0; k <= s.o; k++) c.push(cDiv(at(s, k), new Q(k + 1)));
  return mk(0, c, s.o + 1, s.rem);
}

// F(s) = F(s(0)) + ∫ F′(s)·s′, for the functions known by their derivative.
function byDerivative(s, W, F0, Fprime) {
  const { c0 } = center(s);
  const ds = deriv(mk(Math.max(0, s.lo), s.c.slice(Math.max(0, -s.lo)), s.o, s.rem));
  const inner = sMul(Fprime(s, W + 1), ds, W);
  return integ(inner, F0(c0));
}

const fl = (f) => (c) => { const x = f(F(c)); if (!Number.isFinite(x)) NO(); return cZero(c) && x === 0 ? ZERO : x; };
const one = (W) => constS(ONE, W);
const sq = (s, W) => sMul(s, s, W);

function sLn(s, W) {
  const { v, a, w } = split(s, W);
  if (v !== 0) NO('ln de h');
  if (F(a) <= 0) NO('ln d\'un nombre négatif');
  const body = compose((k) => (k === 0 ? ZERO : cDiv(new Q(k % 2 ? 1 : -1), new Q(k))), w, W);
  if (isQ(a) && a.eq(1)) return body;
  return sAdd(body, constS(Math.log(F(a)), W), W);
}

function fnSeries(name, s, W, dir) {
  switch (name) {
    case 'exp': return sExp(s, W);
    case 'ln': return sLn(s, W);
    case 'sin': return sSinCos(s, W, 'sin');
    case 'cos': return sSinCos(s, W, 'cos');
    case 'tan': return sDiv(sSinCos(s, W + 2, 'sin'), sSinCos(s, W + 2, 'cos'), W);
    case 'cot': return sDiv(sSinCos(s, W + 2, 'cos'), sSinCos(s, W + 2, 'sin'), W);
    case 'sinh': case 'cosh': case 'tanh': {
      const ep = sExp(s, W + 2);
      const em = sExp(sNeg(s), W + 2);
      const sh = sScale(sAdd(ep, sNeg(em), W + 2), new Q(1, 2));
      const ch = sScale(sAdd(ep, em, W + 2), new Q(1, 2));
      if (name === 'sinh') return trunc(sh, W);
      if (name === 'cosh') return trunc(ch, W);
      return sDiv(sh, ch, W);
    }
    case 'arctan': return byDerivative(s, W, fl(Math.atan), (x, w) => sInv(sAdd(one(w), sq(x, w), w), w));
    case 'arcsin': return byDerivative(s, W, fl(Math.asin), (x, w) => sPowReal(sAdd(one(w), sNeg(sq(x, w)), w), new Q(-1, 2), w, dir));
    case 'arccos': return byDerivative(s, W, (c) => Math.acos(F(c)), (x, w) => sNeg(sPowReal(sAdd(one(w), sNeg(sq(x, w)), w), new Q(-1, 2), w, dir)));
    case 'argsh': return byDerivative(s, W, fl(Math.asinh), (x, w) => sPowReal(sAdd(one(w), sq(x, w), w), new Q(-1, 2), w, dir));
    case 'argch': return byDerivative(s, W, (c) => { const r = Math.acosh(F(c)); if (!Number.isFinite(r)) NO(); return r; }, (x, w) => sPowReal(sAdd(sq(x, w), constS(new Q(-1), w), w), new Q(-1, 2), w, dir));
    case 'argth': return byDerivative(s, W, fl(Math.atanh), (x, w) => sInv(sAdd(one(w), sNeg(sq(x, w)), w), w));
    default: return NO(`fonction ${name}`);
  }
}

const trunc = (s, W) => (s.o <= W ? s : mk(s.lo, s.c, W, false));

function sAbs(s, dir) {
  const v = val(s);
  if (v === null) NO();
  let sign = Math.sign(F(at(s, v)));
  if (v % 2 !== 0) { if (!dir) NO('côté non précisé'); sign *= dir; }
  return sign < 0 ? sNeg(s) : s;
}

// ---------- expressions ----------

function build(node, ctx) {
  const { W } = ctx;
  const B = (n) => build(n, ctx);
  switch (node.t) {
    case 'num': return constS(node.v, W);
    case 'float': return constS(node.x, W);
    case 'paren': return B(node.e);
    case 'neg': return sNeg(B(node.e));
    case 'const':
      if (node.name === 'pi') return constS(Math.PI, W);
      if (node.name === 'e') return constS(Math.E, W);
      return NO('constante');
    case 'sym': {
      const key = node.sub ? `${node.name}_` : node.name;
      if (!node.sub && node.name === ctx.v) return ctx.x;
      if (ctx.env && key in ctx.env) return constS(cOf(ctx.env[key]), W);
      return NO(`lettre ${node.name}`);
    }
    case 'eps':
      if (node.v !== ctx.v) NO();
      return mk(0, [ZERO], 0, true);
    case 'bin': {
      if (node.op === '+') return sAdd(B(node.l), B(node.r), W);
      if (node.op === '-') return sAdd(B(node.l), sNeg(B(node.r)), W);
      if (node.op === '×') return mulBoth(node.l, node.r, ctx);
      return divBoth(node.l, node.r, ctx);
    }
    case 'frac': return divBoth(node.n, node.d, ctx);
    case 'pow': {
      const e = stripParen(node.e);
      const k = constValue(e);
      if (k !== null) {
        if (isQ(k) && k.d === 1) {
          const b = build(node.b, { ...ctx, W: W + 2 * Math.abs(k.n) });
          return trunc(sPowInt(b, k.n, W + 2 * Math.abs(k.n)), W);
        }
        const b = build(node.b, { ...ctx, W: W + 4 });
        return trunc(sPowReal(b, k, W + 2, ctx.dir), W);
      }
      // b^e = exp(e·ln b).
      const b = stripParen(node.b);
      if (b.t === 'const' && b.name === 'e') return sExp(B(node.e), W);
      return sExp(mulBoth(node.e, { t: 'fn', name: 'ln', args: [node.b] }, ctx), W);
    }
    case 'sqrt': return trunc(sPowReal(build(node.e, { ...ctx, W: W + 4 }), new Q(1, 2), W + 2, ctx.dir), W);
    case 'root': {
      const k = constValue(stripParen(node.n));
      if (!k || !isQ(k) || k.d !== 1) NO();
      return trunc(sPowReal(build(node.e, { ...ctx, W: W + 4 }), new Q(1, k.n), W + 2, ctx.dir), W);
    }
    case 'abs': return sAbs(B(node.e), ctx.dir);
    case 'fn': {
      const name = canonFn(node.name);
      if (name === 'logb' && node.args.length === 2) {
        const b = constValue(stripParen(node.args[0]));
        if (b === null) NO();
        return sScale(sLn(B(node.args[1]), W), 1 / Math.log(F(b)));
      }
      if (node.args.length !== 1) NO();
      return fnSeries(name, build(node.args[0], { ...ctx, W: W + 2 }), W, ctx.dir);
    }
    case 'deriv': return B(expandDerivs(node));
    default: return NO(`nœud ${node.t}`);
  }
}

// A product or quotient: an extra order on each side for the valuations.
function mulBoth(l, r, ctx) {
  const W = ctx.W;
  const a = build(l, { ...ctx, W: W + 4 });
  const b = build(r, { ...ctx, W: W + 4 });
  const va = val(a) ?? 0;
  const vb = val(b) ?? 0;
  const A = va < 0 ? build(l, { ...ctx, W: W + 4 - vb }) : a;
  const Bs = vb < 0 ? build(r, { ...ctx, W: W + 4 - va }) : b;
  return trunc(sMul(A, Bs, W + 4), W);
}
function divBoth(l, r, ctx) {
  const W = ctx.W;
  const b = build(r, { ...ctx, W: W + 4 });
  const vb = Math.max(0, val(b) ?? 0);
  const den = vb ? build(r, { ...ctx, W: W + 4 + 2 * vb }) : b;
  const n = build(l, { ...ctx, W: W + 4 + vb });
  return trunc(sMul(n, sInv(den, W + 4 + vb), W + 4), W);
}

// The value of a constant expression (no variable): Q, a float, or null.
function constValue(n) {
  if (n.t === 'num') return n.v;
  if (n.t === 'neg') { const v = constValue(stripParen(n.e)); return v === null ? null : cNeg(v); }
  if (n.t === 'frac') {
    const a = constValue(stripParen(n.n));
    const b = constValue(stripParen(n.d));
    return a === null || b === null || cZero(b) ? null : cDiv(a, b);
  }
  if (n.t === 'paren') return constValue(n.e);
  return null;
}

function variableSeries(at, W) {
  if (at === '+inf' || at === '-inf') return mk(-1, [ONE], W, false);
  const a = isQ(at) ? at : cOf(at);
  return mk(0, [a, ONE], W, false);
}

// The public interface.
export function series(node, v = 'x', atPoint = 0, order = 6, opts = {}) {
  const W = order;
  let dir = opts.dir ?? 0;
  if (atPoint === '+inf') dir = 1;
  if (atPoint === '-inf') dir = -1;
  const ctx = { v, W, dir, env: opts.env, x: variableSeries(atPoint, W + 12) };
  const s = trunc(build(node, ctx), W);
  const coeffs = s.c.slice();
  return {
    lo: s.lo, coeffs, order: s.o, remainder: s.rem,
    exact: coeffs.every(isQ), valuation: val(s),
    coef: (k) => at(s, k),
  };
}

// Series → node: Σ c_k·hᵏ + hⁿ·ε(v), h = v − at.
export function seriesToNode(s, v = 'x', atPoint = 0) {
  const inf = atPoint === '+inf' || atPoint === '-inf';
  const h = inf || atPoint === 0 || (isQ(atPoint) && atPoint.n === 0) ? sym(v)
    : { t: 'paren', e: { t: 'bin', op: '-', l: sym(v), r: lit(Q.of(atPoint)) } };
  // At ±∞, h = 1/v: hᵏ is written 1/vᵏ.
  const hk = (k) => {
    const e = inf ? -k : k;
    if (e === 0) return num(1);
    if (e < 0) return { t: 'frac', n: num(1), d: e === -1 ? h : pow(h, lit(new Q(-e))) };
    return e === 1 ? h : pow(h, lit(new Q(e)));
  };
  let out = null;
  for (let k = s.lo; k <= s.order; k++) {
    const c = s.coef(k);
    if (cZero(c)) continue;
    const abs = isQ(c) ? (c.n < 0 ? c.neg() : c) : Math.abs(c);
    const cn = isQ(abs) ? lit(abs) : { t: 'float', x: abs };
    const term = mul(cn, hk(k));
    const negative = F(c) < 0;
    out = !out ? (negative ? neg(term) : term) : negative ? { t: 'bin', op: '-', l: out, r: term } : add(out, term);
  }
  if (s.remainder) {
    const r = mul(hk(s.order), { t: 'eps', v });
    out = out ? add(out, r) : r;
  }
  return out ?? num(0);
}

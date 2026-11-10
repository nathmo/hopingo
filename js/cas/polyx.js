// Polynomials in one variable x, for the `poly` judge and the G0 module
// (step U1): reading a node as a polynomial (with parameters such as λ, or
// with complex coefficients a + bi), coefficients, Horner, Euclidean
// division, rational roots, factorization over ℚ, real and complex
// factored forms, and back to nodes.
//
// Coefficients are kept as Poly (poly.js) in the parameters and in the
// imaginary unit, written as the variable I_ and reduced with I_² = −1.

import { Q } from '../math/rational.js';
import { Poly } from './poly.js';
import { toRatFun } from './normal.js';
import { mapNode, stripParen, num, lit, sym, neg, add, sub, mul, pow, numValue } from './ast.js';

export const I = 'I_';

// i^k with k mod 4.
function reduceI(p) {
  let out = new Poly();
  for (const { m, c } of p.terms.values()) {
    const e = m.find(([v]) => v === I)?.[1] ?? 0;
    const rest = m.filter(([v]) => v !== I);
    const k = e % 4;
    const sign = k >= 2 ? -1 : 1;
    out = out.add(Poly.monomial(k % 2 ? [...rest, [I, 1]] : rest, c.mul(sign)));
  }
  return out;
}

// The node as a polynomial (Poly over ℚ in x, the parameters and I_), or
// null if it is not one (a letter in a denominator, sin x, √x…).
export function polyOf(node, { complex = false, names = null } = {}) {
  try {
    let n = mapNode(node, (x) => {
      if (x.t === 'const' && x.name === 'i') return sym(I);
      if (names && x.t === 'sym' && !x.sub && names[x.name]) return { t: 'paren', e: names[x.name] };
      return x;
    });
    n = stripParen(n);
    if (n.t === 'rel' || n.t === 'list') return null;
    const { rf, opaque } = toRatFun(n);
    if (opaque) return null;
    if (!rf.d.isConst) {
      // A constant denominator after reduction (x²/x stays a fraction: refuse it).
      return null;
    }
    const p = rf.n.scale(new Q(1).div(rf.d.constValue()));
    if (!complex && p.vars().has(I)) return null;
    return complex ? reduceI(p) : p;
  } catch {
    return null;
  }
}

export const degree = (p, v = 'x') => (p.isZero ? -Infinity : p.degreeIn(v));

// Coefficients in v, lowest degree first (Poly in the other variables).
export function coeffs(p, v = 'x') {
  const c = p.coeffsIn(v);
  while (c.length && c[c.length - 1].isZero) c.pop();
  return c;
}

// Rational coefficients (lowest first), or null if one is not a number.
export function qCoeffs(p, v = 'x') {
  const c = coeffs(p, v);
  return c.every((x) => x.isConst) ? c.map((x) => x.constValue()) : null;
}

export const fromQ = (cs, v = 'x') => cs.reduce((s, c, k) => s.add(Poly.monomial([[v, k]], c)), new Poly());

export const leadCoeff = (p, v = 'x') => { const c = coeffs(p, v); return c[c.length - 1]; };

// Euclidean division in v; coefficients of b must be numbers (lead ≠ 0).
export function divide(a, b, v = 'x') {
  const db = degree(b, v);
  const lb = leadCoeff(b, v).constValue();
  let q = new Poly();
  let r = a;
  for (let guard = 0; !r.isZero && degree(r, v) >= db && guard < 60; guard++) {
    const dr = degree(r, v);
    const t = coeffs(r, v)[dr].scale(new Q(1).div(lb)).mul(Poly.variable(v, dr - db));
    q = q.add(t);
    r = r.sub(t.mul(b));
  }
  return { q, r };
}

// Horner: coefficients highest first, value a → {b: [b_n … b_0], rows}.
// b_0 is the remainder P(a); the others are the quotient, highest first.
export function horner(high, a) {
  const b = [];
  const prods = [];
  for (let k = 0; k < high.length; k++) {
    const prod = k === 0 ? null : Q.of(a).mul(b[k - 1]);
    prods.push(prod);
    b.push(k === 0 ? Q.of(high[0]) : Q.of(high[k]).add(prod));
  }
  return { b, prods };
}

// Value of a rational polynomial at a rational point.
export function evalQ(cs, a) {
  let s = new Q(0);
  for (let k = cs.length - 1; k >= 0; k--) s = s.mul(a).add(cs[k]);
  return s;
}

function divisors(n) {
  n = Math.abs(n);
  const out = [];
  for (let d = 1; d <= n && d <= 2000; d++) if (n % d === 0) out.push(d);
  return out;
}

// Rational roots of a rational polynomial (lowest first), with multiplicity:
// [{q, k}], and the cofactor without them.
export function rationalRoots(cs) {
  let c = [...cs];
  const out = [];
  // x = 0
  let k0 = 0;
  while (c.length > 1 && c[0].n === 0) { c.shift(); k0++; }
  if (k0) out.push({ q: new Q(0), k: k0 });
  if (c.length <= 1) return { roots: out, rest: c };
  // Integer coefficients.
  const l = c.reduce((m, x) => (m * x.d) / gcdInt(m, x.d), 1);
  const ints = c.map((x) => x.mul(l).n);
  const cands = [];
  for (const p of divisors(ints[0])) for (const qd of divisors(ints[ints.length - 1])) {
    cands.push(new Q(p, qd), new Q(-p, qd));
  }
  const seen = new Set();
  for (const r of cands) {
    const key = r.toString();
    if (seen.has(key)) continue;
    seen.add(key);
    let k = 0;
    while (c.length > 1 && evalQ(c, r).n === 0) {
      c = synth(c, r);
      k++;
    }
    if (k) out.push({ q: r, k });
  }
  out.sort((a, b) => a.q.cmp(b.q));
  return { roots: out, rest: c };
}

const gcdInt = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };

// Division of a rational polynomial (lowest first) by (x − r).
function synth(cs, r) {
  const high = [...cs].reverse();
  const { b } = horner(high, r);
  b.pop();
  return b.reverse();
}

// Discriminant of a rational quadratic (lowest first).
export const discriminant = (cs) => cs[1].mul(cs[1]).sub(cs[2].mul(cs[0]).mul(4));

// Is the rational polynomial irreducible over ℝ? (degree 1, or 2 with Δ < 0;
// degree 4 without real roots is reducible over ℝ but we never ask it.)
export function irreducibleR(cs) {
  const d = cs.length - 1;
  if (d === 1) return true;
  if (d === 2) return discriminant(cs).n < 0;
  return false;
}

// ---------- reading the shape of a line ----------

// Factors of a product, through brackets: [{node, k}] and a numeric coefficient.
export function productFactors(node) {
  let coef = new Q(1);
  const out = [];
  const walk = (n) => {
    n = stripParen(n);
    const v = numValue(n);
    if (v) { coef = coef.mul(v); return; }
    if (n.t === 'neg') { coef = coef.neg(); walk(n.e); return; }
    if (n.t === 'bin' && n.op === '×') { walk(n.l); walk(n.r); return; }
    if (n.t === 'frac' && numValue(n.d)) { coef = coef.div(numValue(n.d)); walk(n.n); return; }
    if (n.t === 'pow') {
      const k = numValue(n.e);
      if (k && k.isInt() && k.n >= 1) { out.push({ node: stripParen(n.b), k: k.n }); return; }
    }
    out.push({ node: n, k: 1 });
  };
  walk(node);
  return { coef, factors: out };
}

// Terms of a sum with their sign: [node] (negated where subtracted).
export function sumTerms(node, sign = 1, out = []) {
  node = stripParen(node);
  if (node.t === 'bin' && (node.op === '+' || node.op === '-')) {
    sumTerms(node.l, sign, out);
    sumTerms(node.r, node.op === '-' ? -sign : sign, out);
  } else if (node.t === 'neg') sumTerms(node.e, -sign, out);
  else out.push(sign < 0 ? { t: 'neg', e: node } : node);
  return out;
}

// A sum of monomials c·x^k with distinct k (an expanded polynomial)?
export function isExpanded(node, v = 'x', opts = {}) {
  const ks = new Set();
  for (const t of sumTerms(node)) {
    const { factors } = productFactors(t);
    let k = 0;
    for (const f of factors) {
      if (f.node.t === 'sym' && f.node.name === v) k += f.k;
      else if (opts.complex && f.node.t === 'const' && f.node.name === 'i') { /* i·x */ } else if (opts.params && f.node.t === 'sym' && opts.params.includes(f.node.name)) { /* λx */ } else return false;
    }
    if (ks.has(k)) return false;
    ks.add(k);
  }
  return true;
}

// ---------- back to nodes ----------

// A coefficient (Poly in the parameters and I_) as a node.
function coefNode(c) {
  // Highest degree first, then by letter; a positive term leads when there
  // is one: b − 2a rather than −2a + b, 4a − 2b + c.
  const terms = [...c.terms.values()].sort((a, b) => (keyDeg(b.m) - keyDeg(a.m)) || (a.m.map((x) => x[0]).join() < b.m.map((x) => x[0]).join() ? -1 : 1));
  const lead = terms.findIndex((t) => t.c.n > 0);
  if (lead > 0 && keyDeg(terms[lead].m) === keyDeg(terms[0].m)) terms.unshift(...terms.splice(lead, 1));
  let out = null;
  for (const { m, c: q } of terms) {
    let body = lit(q.n < 0 ? q.neg() : q);
    for (const [v, e] of m) body = mul(body, e === 1 ? symOf(v) : pow(symOf(v), num(e)));
    out = out === null ? (q.n < 0 ? neg(body) : body) : q.n < 0 ? sub(out, body) : add(out, body);
  }
  return out ?? num(0);
}
const keyDeg = (m) => m.reduce((s, [, e]) => s + e, 0);
const symOf = (v) => (v === I ? { t: 'const', name: 'i' } : sym(v));

// A polynomial as a node, highest degree first: 2x³ − 3x + (λ − 2)x + 1.
export function polyNode(p, v = 'x') {
  const c = coeffs(p, v);
  if (!c.length) return num(0);
  let out = null;
  for (let k = c.length - 1; k >= 0; k--) {
    const ck = c[k];
    if (ck.isZero) continue;
    const xk = k === 0 ? null : k === 1 ? sym(v) : pow(sym(v), num(k));
    let term;
    let negative = false;
    if (ck.isConst) {
      const q = ck.constValue();
      negative = q.n < 0 && out !== null;
      const a = negative ? q.neg() : q;
      term = xk ? mul(lit(a), xk) : lit(a);
    } else {
      const cn = coefNode(ck);
      const single = ck.terms.size === 1;
      const cneg = single && cn.t === 'neg';
      negative = cneg && out !== null;
      const body = cneg && out !== null ? cn.e : cn;
      const plain = (n) => (n.t === 'bin' && n.op === '×' ? { ...n, implicit: true, r: plain(n.r) } : n);
      term = xk ? (single ? { t: 'bin', op: '×', l: plain(body), r: xk, implicit: true } : { t: 'bin', op: '×', l: { t: 'paren', e: body }, r: xk, implicit: true }) : body;
    }
    out = out === null ? term : negative ? sub(out, term) : add(out, term);
  }
  return out;
}

// Rational coefficients (lowest first) → node.
export const qNode = (cs, v = 'x') => polyNode(fromQ(cs, v), v);

// The linear factor (x − r) as a node: x − 2, x + 3, x.
export function linNode(r, v = 'x') {
  const q = Q.of(r);
  if (q.n === 0) return sym(v);
  return q.n > 0 ? sub(sym(v), lit(q)) : add(sym(v), lit(q.neg()));
}

// A product of factors [{node, k}] with a coefficient, as a node.
export function productNode(coef, factors) {
  let out = null;
  for (const { node, k } of factors) {
    const base = node.t === 'sym' ? node : { t: 'paren', e: node };
    const f = k === 1 ? base : pow(base, num(k));
    out = out === null ? f : { t: 'bin', op: '×', l: out, r: f, implicit: true };
  }
  coef = Q.of(coef);
  if (out === null) return lit(coef);
  if (coef.eq(1)) return out;
  if (coef.eq(-1)) return neg(out);
  return { t: 'bin', op: '×', l: lit(coef), r: out, implicit: true };
}

// The factorization over ℚ of a rational polynomial: {coef, factors:[{cs, k}]}
// (factors monic; irreducible parts left as one factor).
export function factorQ(cs) {
  const lead = cs[cs.length - 1];
  const monic = cs.map((c) => c.div(lead));
  const { roots, rest } = rationalRoots(monic);
  const factors = roots.map(({ q, k }) => ({ cs: [q.neg(), new Q(1)], k }));
  if (rest.length > 1) factors.push({ cs: rest, k: 1 });
  return { coef: lead, factors };
}

// A line B·Q + R read with respect to the divisor B (a Poly): the terms with
// B as a factor (B written out, or the name opts.divisorName) give Q, the
// others R. → {q, r, hasB} or null if a part is not a polynomial.
export function splitByDivisor(node, divisor, opts = {}) {
  const { names = {}, complex = false, divisorName = null, v = 'x' } = opts;
  const P = (n) => polyOf(n, { complex, names });
  // The ratio factor/divisor when the factor is the divisor up to a number
  // (−x written for the divisor x, the sign gone to the coefficient), or null.
  const ratioB = (f) => {
    const n = stripParen(f.node);
    if (divisorName && n.t === 'sym' && n.name === divisorName) return new Q(1);
    const p = P(n);
    if (!p || !divisor || p.isZero) return null;
    const lp = leadCoeff(p, v);
    const ld = leadCoeff(divisor, v);
    if (!lp?.isConst || !ld?.isConst) return null;
    const k = lp.constValue().div(ld.constValue());
    return divisor.scale(k).equals(p) ? k : null;
  };
  let q = new Poly();
  let r = new Poly();
  let hasB = false;
  for (const t of sumTerms(node)) {
    const { coef, factors } = productFactors(t);
    const i = factors.findIndex((f) => ratioB(f) !== null);
    if (i < 0) {
      const p = P(t);
      if (!p) return null;
      r = r.add(p);
      continue;
    }
    hasB = true;
    let rest = Poly.const(coef.mul(ratioB(factors[i])));
    for (let j = 0; j < factors.length; j++) {
      const k = j === i ? factors[j].k - 1 : factors[j].k;
      if (k <= 0) continue;
      const p = P(factors[j].node);
      if (!p) return null;
      rest = rest.mul(p.pow(k));
    }
    q = q.add(rest);
  }
  return { q, r, hasB };
}

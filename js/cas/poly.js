// Sparse polynomials over ℚ in any number of variables. A variable is any
// name: x, λ, x_k, or the key of an opaque sub-expression such as sin(3x)
// (see normal.js). Terms keep their insertion order for display; `canon()`
// gives an order-independent key.
//
// js/math/algebra.js has a Poly limited to one-letter names, used by the
// school units; this one serves the symbolic core.

import { Q, gcd } from '../math/rational.js';

const ZERO = new Q(0);
const ONE = new Q(1);
const keyOf = (m) => m.map(([v, e]) => `${v}\u0001${e}`).join('\u0002');

// Monomial product: both sorted by name.
function monoMul(a, b) {
  const out = [];
  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    if (j >= b.length || (i < a.length && a[i][0] < b[j][0])) out.push(a[i++]);
    else if (i >= a.length || b[j][0] < a[i][0]) out.push(b[j++]);
    else { out.push([a[i][0], a[i][1] + b[j][1]]); i++; j++; }
  }
  return out;
}

export class Poly {
  // terms: Map key → {m: [[name, exponent]] sorted, c: Q ≠ 0}
  constructor(terms = new Map()) { this.terms = terms; }

  static const(q) {
    q = Q.of(q);
    return new Poly(q.n === 0 ? new Map() : new Map([['', { m: [], c: q }]]));
  }

  static variable(name, exp = 1) {
    if (exp === 0) return Poly.const(1);
    const m = [[name, exp]];
    return new Poly(new Map([[keyOf(m), { m, c: ONE }]]));
  }

  static monomial(m, c) {
    const sorted = [...m].filter(([, e]) => e !== 0).sort((a, b) => (a[0] < b[0] ? -1 : 1));
    return Q.of(c).n === 0 ? new Poly() : new Poly(new Map([[keyOf(sorted), { m: sorted, c: Q.of(c) }]]));
  }

  get isZero() { return this.terms.size === 0; }
  get isConst() { return this.terms.size === 0 || (this.terms.size === 1 && this.terms.has('')); }
  constValue() { return this.terms.get('')?.c ?? ZERO; }

  add(o) {
    const t = new Map(this.terms);
    for (const [k, { m, c }] of o.terms) {
      const s = (t.get(k)?.c ?? ZERO).add(c);
      if (s.n === 0) t.delete(k); else t.set(k, { m, c: s });
    }
    return new Poly(t);
  }

  neg() { return new Poly(new Map([...this.terms].map(([k, x]) => [k, { m: x.m, c: x.c.neg() }]))); }
  sub(o) { return this.add(o.neg()); }

  scale(q) {
    q = Q.of(q);
    if (q.n === 0) return new Poly();
    return new Poly(new Map([...this.terms].map(([k, x]) => [k, { m: x.m, c: x.c.mul(q) }])));
  }

  mul(o) {
    let r = new Poly();
    for (const a of this.terms.values()) {
      const part = new Map();
      for (const b of o.terms.values()) {
        const m = monoMul(a.m, b.m);
        const k = keyOf(m);
        const s = (part.get(k)?.c ?? ZERO).add(a.c.mul(b.c));
        if (s.n === 0) part.delete(k); else part.set(k, { m, c: s });
      }
      r = r.add(new Poly(part));
    }
    return r;
  }

  pow(n) {
    if (!Number.isInteger(n) || n < 0) throw new RangeError('Exposant entier ≥ 0 attendu');
    let r = Poly.const(1);
    let b = this;
    while (n > 0) {
      if (n & 1) r = r.mul(b);
      b = b.mul(b);
      n >>= 1;
    }
    return r;
  }

  equals(o) { return this.sub(o).isZero; }

  vars() {
    const s = new Set();
    for (const { m } of this.terms.values()) for (const [v] of m) s.add(v);
    return s;
  }

  degreeIn(v) {
    let d = 0;
    for (const { m } of this.terms.values()) for (const [w, e] of m) if (w === v) d = Math.max(d, e);
    return d;
  }

  // Order-independent text key.
  canon() {
    return [...this.terms.entries()].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
      .map(([k, { c }]) => `${c}*${k}`).join('+');
  }

  evalFloat(env) {
    let s = 0;
    for (const { m, c } of this.terms.values()) {
      let t = c.n / c.d;
      for (const [v, e] of m) t *= env[v] ** e;
      s += t;
    }
    return s;
  }

  // The largest monomial dividing every term (all exponents ≥ 0).
  monomialContent() {
    const all = [...this.terms.values()];
    if (!all.length) return [];
    let common = all[0].m;
    for (const { m } of all.slice(1)) {
      common = common.map(([v, e]) => [v, Math.min(e, m.find(([w]) => w === v)?.[1] ?? 0)]).filter(([, e]) => e > 0);
    }
    return common;
  }

  // Divide every term by a monomial that divides them all.
  divMonomial(mono) {
    const out = new Map();
    for (const { m, c } of this.terms.values()) {
      const nm = m.map(([v, e]) => [v, e - (mono.find(([w]) => w === v)?.[1] ?? 0)]).filter(([, e]) => e !== 0);
      out.set(keyOf(nm), { m: nm, c });
    }
    return new Poly(out);
  }

  // The term with the largest key: used to make a polynomial monic in a
  // canonical way.
  leading() {
    let best = null;
    for (const [k, t] of this.terms) if (best === null || k > best[0]) best = [k, t];
    return best ? best[1] : null;
  }

  // gcd of the numerators and lcm of the denominators of the coefficients.
  numericContent() {
    let n = 0;
    let d = 1;
    for (const { c } of this.terms.values()) {
      n = gcd(n, c.n);
      d = (d / gcd(d, c.d)) * c.d;
    }
    return n === 0 ? ONE : new Q(n, d);
  }

  // Coefficients in v, lowest degree first: each a Poly without v.
  coeffsIn(v) {
    const out = [];
    for (const { m, c } of this.terms.values()) {
      const e = m.find(([w]) => w === v)?.[1] ?? 0;
      const rest = m.filter(([w]) => w !== v);
      while (out.length <= e) out.push(new Poly());
      out[e] = out[e].add(Poly.monomial(rest, c));
    }
    return out;
  }
}

// ---------- one variable ----------

// Euclidean division of a by b, both polynomials in v only.
export function divmod(a, b, v) {
  const db = b.degreeIn(v);
  const lb = b.coeffsIn(v)[db].constValue();
  let q = new Poly();
  let r = a;
  let guard = 0;
  while (!r.isZero && r.degreeIn(v) >= db && guard++ < 200) {
    const dr = r.degreeIn(v);
    const lr = r.coeffsIn(v)[dr].constValue();
    const t = Poly.monomial([[v, dr - db]], lr.div(lb));
    q = q.add(t);
    r = r.sub(t.mul(b));
  }
  return { q, r };
}

// Monic gcd of two polynomials in v only.
export function gcdPoly(a, b, v) {
  while (!b.isZero) [a, b] = [b, divmod(a, b, v).r];
  if (a.isZero) return a;
  const d = a.degreeIn(v);
  return a.scale(new Q(1).div(a.coeffsIn(v)[d].constValue()));
}

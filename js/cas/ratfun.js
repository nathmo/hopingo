// Rational functions n/d over ℚ (polynomials from poly.js). reduce() gives a
// canonical form: common monomials cancelled, the gcd cancelled when there
// is a single variable, and the denominator made monic by its largest term.

import { Q } from '../math/rational.js';
import { Poly, gcdPoly, divmod } from './poly.js';
import { t } from '../i18n.js';

export class RatFun {
  constructor(n, d = Poly.const(1)) {
    if (d.isZero) throw new RangeError(t('Division par zéro'));
    this.n = n;
    this.d = d;
  }

  static const(q) { return new RatFun(Poly.const(q)); }
  static variable(name) { return new RatFun(Poly.variable(name)); }

  add(o) { return new RatFun(this.n.mul(o.d).add(o.n.mul(this.d)), this.d.mul(o.d)); }
  sub(o) { return new RatFun(this.n.mul(o.d).sub(o.n.mul(this.d)), this.d.mul(o.d)); }
  mul(o) { return new RatFun(this.n.mul(o.n), this.d.mul(o.d)); }
  div(o) {
    if (o.n.isZero) throw new RangeError(t('Division par zéro'));
    return new RatFun(this.n.mul(o.d), this.d.mul(o.n));
  }
  neg() { return new RatFun(this.n.neg(), this.d); }

  pow(k) {
    if (!Number.isInteger(k)) throw new RangeError(t('Exposant entier attendu'));
    if (k >= 0) return new RatFun(this.n.pow(k), this.d.pow(k));
    if (this.n.isZero) throw new RangeError(t('Division par zéro'));
    return new RatFun(this.d.pow(-k), this.n.pow(-k));
  }

  get isZero() { return this.n.isZero; }
  get isConst() { return this.n.isConst && this.d.isConst; }
  constValue() { return this.n.constValue().div(this.d.constValue()); }
  equals(o) { return this.sub(o).isZero; }

  vars() { return new Set([...this.n.vars(), ...this.d.vars()]); }

  reduce() {
    let { n, d } = this;
    if (n.isZero) return new RatFun(new Poly());
    // Common monomial factor.
    const mn = n.monomialContent();
    const md = d.monomialContent();
    const common = mn.map(([v, e]) => [v, Math.min(e, md.find(([w]) => w === v)?.[1] ?? 0)]).filter(([, e]) => e > 0);
    if (common.length) { n = n.divMonomial(common); d = d.divMonomial(common); }
    // gcd in a single variable.
    const vars = new Set([...n.vars(), ...d.vars()]);
    if (vars.size === 1 && !d.isConst) {
      const [v] = vars;
      const g = gcdPoly(n, d, v);
      if (!g.isZero && g.degreeIn(v) > 0) { n = divmod(n, g, v).q; d = divmod(d, g, v).q; }
    }
    // Monic denominator.
    const lead = d.leading().c;
    if (!lead.eq(1)) { const k = new Q(1).div(lead); n = n.scale(k); d = d.scale(k); }
    return new RatFun(n, d);
  }

  canon() {
    const r = this.reduce();
    return r.d.isConst ? r.n.canon() : `(${r.n.canon()})/(${r.d.canon()})`;
  }
}

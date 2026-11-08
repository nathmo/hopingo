// Exact rational numbers. Every computation in the app goes through here,
// so two expressions are equal exactly when their values are equal.

export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

function checkInt(x) {
  if (!Number.isSafeInteger(x)) throw new RangeError('Nombre trop grand');
  return x;
}

export class Q {
  constructor(n, d = 1) {
    checkInt(n);
    checkInt(d);
    if (d === 0) throw new RangeError('Division par zéro');
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d) || 1;
    this.n = n / g || 0; // avoid -0
    this.d = d / g;
  }

  static of(x) {
    return x instanceof Q ? x : new Q(x, 1);
  }

  // "0,25" or "0.25" or "12"
  static fromDecimal(str) {
    const s = String(str).replace(',', '.');
    if (!/^\d+(\.\d+)?$/.test(s)) throw new SyntaxError('Nombre invalide');
    const [int, dec = ''] = s.split('.');
    return new Q(Number(int + dec), 10 ** dec.length);
  }

  add(o) { o = Q.of(o); return new Q(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Q.of(o); return new Q(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Q.of(o); return new Q(this.n * o.n, this.d * o.d); }
  div(o) { o = Q.of(o); return new Q(this.n * o.d, this.d * o.n); }
  neg() { return new Q(-this.n, this.d); }
  inv() { return new Q(this.d, this.n); }

  pow(k) {
    if (!Number.isInteger(k)) throw new RangeError('Exposant non entier');
    if (k < 0) return this.inv().pow(-k);
    return new Q(checkInt(this.n ** k), checkInt(this.d ** k));
  }

  // Exact square root, or null when the result is not rational.
  sqrt() {
    if (this.n < 0) return null;
    const rn = Math.round(Math.sqrt(this.n));
    const rd = Math.round(Math.sqrt(this.d));
    return rn * rn === this.n && rd * rd === this.d ? new Q(rn, rd) : null;
  }

  eq(o) { o = Q.of(o); return this.n === o.n && this.d === o.d; }
  cmp(o) { o = Q.of(o); return Math.sign(this.n * o.d - o.n * this.d); }
  isInt() { return this.d === 1; }
  valueOf() { return this.n / this.d; }
  toString() { return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`; }

  // French decimal writing ("0,25"), or null if the decimal is not finite.
  toDecimal() {
    let d = this.d;
    let twos = 0;
    let fives = 0;
    while (d % 2 === 0) { d /= 2; twos++; }
    while (d % 5 === 0) { d /= 5; fives++; }
    if (d !== 1) return null;
    const places = Math.max(twos, fives);
    const scaled = Math.abs((this.n * 10 ** places) / this.d);
    let s = String(Math.round(scaled)).padStart(places + 1, '0');
    if (places) s = s.slice(0, -places) + ',' + s.slice(-places);
    return (this.n < 0 ? '-' : '') + s;
  }
}

export const q = (n, d = 1) => new Q(n, d);

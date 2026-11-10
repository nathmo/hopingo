// Helpers of module G8, part a (unit `complexes`, step U4): exact numbers
// p·√s (surds), complex numbers with surd parts, angles kπ/12, texts of
// a + bi and r·e^(iθ), the judge configurations, mcq options without
// duplicates. The helpers of lines (blanks, menus, parts) come from the
// U2 kit (analyse1-e-kit.js).

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { CQ } from '../../cas/complex.js';
import { MT } from './kit.js';
import { judgeFor, readWith } from '../../judges/index.js';
import { parseOpts, sameLine } from '../../judges/common.js';
import { tpl as tplOf } from './analyse1-e-kit.js';

export { q, N, nz, modeOf, H, E, SEG, tpl, blanked, stepMenus, withMenus } from './analyse1-e-kit.js';
import { partsScript as partsScriptU2, modeOf as modeOfU2 } from './analyse1-e-kit.js';

export const C = { complex: true };
// MathML of a complex text (i is the imaginary unit).
export const M = (text, display = false) => MT(text, C, display);
// A text read back and printed (canonical writing).
export const canon = (text, opts = C) => toText(parse(text, opts));
export const fr = (s) => String(s).replace(/-/g, '−');

// ---------- judge configurations ----------

export const ALG = { kind: 'complex', complex: true, form: 'algebraic' };
export const EXP = { kind: 'complex', complex: true, form: 'exp', arg: 'principal' };
export const REAL = { kind: 'complex', complex: true, form: 'real' };
export const ARG = { kind: 'complex', complex: true, form: 'real', arg: 'principal' };
export const SET = (unknown = 'z') => ({ kind: 'complex', complex: true, form: 'set', ...(unknown === 'z' ? {} : { unknown }) });
// A number asked whatever the line before (« x² = », « |z| = »).
export const ASK = (expect) => ({ kind: 'value', expect: String(expect), form: 'exact' });
export const KEYS = ['calc', 'cplx', 'calcfn'];
export const KEYS_SET = ['calc', 'cplx', 'set', 'calcfn'];

// ---------- surds p·√s (s squarefree in {1, 2, 3, 6}) ----------

export class Sd {
  constructor(p, s = 1) {
    this.p = Q.of(p);
    this.s = this.p.n === 0 ? 1 : s;
  }

  static of(x) { return x instanceof Sd ? x : new Sd(Q.of(x), 1); }
  isZero() { return this.p.n === 0; }
  isRational() { return this.s === 1; }
  neg() { return new Sd(this.p.neg(), this.s); }
  mul(o) {
    o = Sd.of(o);
    let s = this.s * o.s;
    let p = this.p.mul(o.p);
    for (const k of [2, 3]) while (s % (k * k) === 0) { s /= k * k; p = p.mul(k); }
    return new Sd(p, s);
  }
  // Sum when both have the same radical (else null).
  add(o) {
    o = Sd.of(o);
    if (this.isZero()) return o;
    if (o.isZero()) return this;
    return this.s === o.s ? new Sd(this.p.add(o.p), this.s) : null;
  }
  get value() { return (this.p.n / this.p.d) * Math.sqrt(this.s); }
  sign() { return Math.sign(this.p.n); }
  abs() { return this.p.n < 0 ? this.neg() : this; }
  eq(o) { o = Sd.of(o); return this.p.eq(o.p) && this.s === o.s; }
  // Text: 3, −1/2, √3, −√3/2, 2√2, 3√2/2.
  text() {
    const a = this.abs();
    const neg = this.p.n < 0 ? '-' : '';
    if (this.s === 1) return `${neg}${a.p.n}${a.p.d === 1 ? '' : `/${a.p.d}`}`;
    const top = `${a.p.n === 1 ? '' : a.p.n}√${this.s}`;
    return `${neg}${top}${a.p.d === 1 ? '' : `/${a.p.d}`}`;
  }
  // As a factor before e^(…) or (cos θ + i sin θ): '' for 1.
  factor() { return this.eq(1) ? '' : this.text(); }
}

// i times the magnitude of a surd: i, 2i, i/2, 3i/2, i√3, 2i√3, i√3/2.
function iText(m) {
  const { p, s } = m;
  const top = `${p.n === 1 ? '' : p.n}i${s === 1 ? '' : `√${s}`}`;
  return p.d === 1 ? top : `${top}/${p.d}`;
}

// A complex number with surd parts: {re: Sd, im: Sd}.
export const cz = (re, im = 0) => ({ re: Sd.of(re), im: Sd.of(im) });
export const czOfCQ = (z) => cz(z.re, z.im);
export function czText(z) {
  const re = z.re;
  const im = z.im;
  if (im.isZero()) return re.text();
  const it = iText(im.abs());
  if (re.isZero()) return `${im.sign() < 0 ? '-' : ''}${it}`;
  return `${re.text()}${im.sign() < 0 ? '-' : '+'}${it}`;
}
export const czValue = (z) => ({ re: z.re.value, im: z.im.value });
export const czAdd = (a, b) => {
  const re = a.re.add(b.re);
  const im = a.im.add(b.im);
  return re && im ? { re, im } : null;
};
export const czNeg = (a) => ({ re: a.re.neg(), im: a.im.neg() });
export const czExact = (z) => (z.re.isRational() && z.im.isRational() ? new CQ(z.re.p, z.im.p) : null);
export const cqText = (z) => toText(z.toNode());

// ---------- angles tπ (t rational, multiples of 1/6 and 1/4) ----------

// cos and sin of kπ/12 for the k of the multiples of π/6 and π/4.
const COS12 = {
  0: new Sd(1), 2: new Sd(new Q(1, 2), 3), 3: new Sd(new Q(1, 2), 2), 4: new Sd(new Q(1, 2)), 6: new Sd(0),
};
function cos12(k) {
  k = ((k % 24) + 24) % 24;
  if (k > 12) k = 24 - k;
  if (k <= 6) return COS12[k] ?? null;
  const c = COS12[12 - k];
  return c ? c.neg() : null;
}
export function cosT(t) {
  const k = Q.of(t).mul(12);
  if (k.d !== 1) return null;
  return cos12(k.n);
}
export const sinT = (t) => cosT(new Q(1, 2).sub(Q.of(t)));
export const isNiceAngle = (t) => !!cosT(t) && !!sinT(t);
// The point r·e^(itπ) in algebraic form.
export const polarToCz = (r, t) => ({ re: Sd.of(r).mul(cosT(t)), im: Sd.of(r).mul(sinT(t)) });
// t brought into ]−1 ; 1] (θ into ]−π ; π]).
export function principalT(t) {
  let x = Q.of(t);
  while (x.valueOf() > 1) x = x.sub(2);
  while (x.valueOf() <= -1) x = x.add(2);
  return x;
}

// tπ as text: π/3, −2π/3, π, 0, 15π/2.
export function piT(t) {
  const x = Q.of(t);
  if (x.n === 0) return '0';
  const a = Math.abs(x.n);
  return `${x.n < 0 ? '-' : ''}${a === 1 ? '' : a}π${x.d === 1 ? '' : `/${x.d}`}`;
}
// The exponent i·tπ as text: iπ/3, −2iπ/3, iπ, 15iπ/2.
export function iPiT(t) {
  const x = Q.of(t);
  const a = Math.abs(x.n);
  return `${x.n < 0 ? '-' : ''}${a === 1 ? '' : a}iπ${x.d === 1 ? '' : `/${x.d}`}`;
}
// r·e^(itπ) as text (r a surd, a number or a text such as '(√2)^10').
export function expText(r, t) {
  const f = typeof r === 'string' ? r : Sd.of(r).factor();
  if (Q.of(t).n === 0) return f || '1';
  return `${f}${f && /[)\d]$/.test(f) && f.startsWith('(') ? '×' : ''}e^(${iPiT(t)})`;
}
// r(cos tπ + i sin tπ) as text.
export const trigText = (r, t) => (Sd.of(r).eq(1) ? `cos(${piT(t)})+i sin(${piT(t)})` : `${Sd.of(r).factor()}(cos(${piT(t)})+i sin(${piT(t)}))`);
// The exact cos tπ + i sin tπ of a nice angle, as text: −1/2 + i√3/2.
export const unitText = (t) => czText({ re: cosT(t), im: sinT(t) });

// ---------- options ----------

// Options of a multiple choice: the right one first, then the wrong ones
// whose text differs (a wrong option equal to the right one is dropped,
// §16.3), up to four.
export function options(right, wrongs, fill = []) {
  const out = [{ html: right.html, correct: true, key: right.key ?? right.html }];
  for (const w of [...wrongs, ...fill]) {
    if (out.length >= 4) break;
    const key = w.key ?? w.html;
    if (!w.html || out.some((o) => o.key === key || o.html === w.html)) continue;
    out.push({ html: w.html, correct: false, key, ...(w.rule ? { rule: w.rule } : {}) });
  }
  return out.map(({ key, ...o }) => o);
}

// ---------- lines ----------

// Drops the intermediate reference lines that the judge already takes as
// final (they would end the part too early) or, outside the guided mode,
// as « right but to tidy » (stay).
// A line written like the one before it (start included) is dropped too.
export function clean(judge, lines, mode, start = null) {
  const J = judgeFor(judge);
  const read = (t) => { try { return readWith(judge, t); } catch { return null; } };
  let prev = start === null ? null : read(start);
  const out = lines.filter((l, i) => {
    if (l.kind !== 'eq') return true;
    const node = read(l.math);
    if (prev && node && sameLine(prev, node) && i < lines.length - 1) return false;
    if (i < lines.length - 1) {
      let f;
      try { f = J.isFinal(judge, node); } catch { f = false; }
      if (f === true || (mode !== 'guided' && typeof f === 'string')) return false;
    }
    prev = node;
    return true;
  });
  return out;
}

// A line with blanks on the sub-expressions written in texts (read as the
// judge reads them); the whole line when none is found.
export function bl(line, texts, judge = ALG) {
  const opts = parseOpts(judge);
  const t = tplOf(line.math, texts, { ...opts, complex: judge.kind === 'complex' || opts.complex });
  if (t.blanks?.length) return { ...line, ...t };
  return { ...line, ...tplOf(line.math, [line.math], { ...opts, complex: judge.kind === 'complex' || opts.complex }) };
}

export const cq = (a, b = 0) => new CQ(a, b);
// k·i as text: i, −i, 3i; with power: i^2, −i^2, 4i^2.
export const iT = (k, p = '') => `${k === 1 ? '' : k === -1 ? '-' : k}i${p}`;
// Terms joined into a sum, zeros skipped: ['3', '-6i', '2i'] → '3-6i+2i'.
export const joinT = (ts) => ts.filter((t) => t !== '' && t !== '0' && t !== '0i').reduce((s, t) => (s ? (t.startsWith('-') ? `${s}${t}` : `${s}+${t}`) : t), '') || '0';
// The terms a and bi of an exact complex.
export const termsOf = (z) => [z.re.n ? z.re.toString() : '', z.im.n ? (z.im.d === 1 ? iT(z.im.n) : cqText(new CQ(0, z.im))) : ''];
// (a + bi) in brackets when it has two parts, for a product.
export const par = (z) => (z.re.n && z.im.n ? `(${cqText(z)})` : z.im.n && !z.re.n ? `(${cqText(z)})` : cqText(z).startsWith('-') ? `(${cqText(z)})` : cqText(z));

// partsScript of the U2 kit, each part's lines cleaned against its start.
export const partsScript = (parts, level, choices) => partsScriptU2(parts.map((p) => ({ ...p, lines: clean(p.judge, p.lines, modeOfU2(level), p.start) })), level, choices);

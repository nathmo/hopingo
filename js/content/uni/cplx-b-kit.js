// Tools of module C, part b (unit `cplx`, step U10): exact numbers of ℚ(i)
// and their texts, polynomials with coefficients in ℚ(i), exact residues of
// rational functions (Taylor coefficients of N/E at the pole), labels of
// the `cval` parts (js/judges/cplx-cb.js), MathML helpers, and the numeric
// check of every reference residue against js/cas/series.js (residue,
// Laurent coefficients) when VERIFY.on (set by the tests).

import { Q } from '../../math/rational.js';
import { CQ, evalComplex } from '../../cas/complex.js';
import { parse } from '../../cas/parse.js';
import { toMathML } from '../../cas/mathml.js';
import { residue } from '../../cas/series.js';
import { JUDGES } from '../../judges/index.js';
import { MT, mcq, examTag } from './kit.js';
import { partsItem, H, modeOf } from './geo-kit.js';
import { problemItem, asProblem } from './kit-problem.js';

export { MT, mcq, examTag, partsItem, H, modeOf, problemItem, asProblem };

export const KEYS = ['calc', 'cplx', 'cres', 'calcfn'];

// ---------- numbers ----------

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const cq = (re, im = 0) => new CQ(Q.of(re), Q.of(im));
export const I = cq(0, 1);
export const qt = (x) => String(q(x));

// a·i as text: 'i', '3i', 'i/2', '3i/2' (a > 0).
const iT = (m) => {
  const n = m.n === 1 ? '' : String(m.n);
  return m.d === 1 ? `${n}i` : `${n}i/${m.d}`;
};
// a + bi as a text for the CAS: '-1/16-i/16', '2i', '-3', 'i/2'.
export function cT(c) {
  c = c instanceof CQ ? c : CQ.of(q(c));
  const a = c.re;
  const b = c.im;
  if (b.n === 0) return qt(a);
  const bi = iT(b.n < 0 ? b.neg() : b);
  if (a.n === 0) return b.n < 0 ? `-${bi}` : bi;
  return `${qt(a)}${b.n < 0 ? '-' : '+'}${bi}`;
}
// The same, between brackets when it is not a single positive term.
export const cP = (c) => { const t = cT(c); return /^[0-9]+$|^i$|^[0-9]+i$/.test(t) ? t : `(${t})`; };
// z − a as text: 'z-1', 'z+2i', 'z-(1+i)', 'z' for a = 0.
export function zMinus(a, v = 'z') {
  a = a instanceof CQ ? a : CQ.of(q(a));
  if (a.isZero()) return v;
  const t = cT(a);
  const simple = (s) => !/[+-]/.test(s);
  if (simple(t)) return `${v}-${t}`;
  if (t.startsWith('-') && simple(t.slice(1))) return `${v}+${t.slice(1)}`;
  return `${v}-(${t})`;
}

// Readable text (− and spaces) and MathML of a CAS text with i.
export const rd = (t) => String(t).replace(/-/g, '−');
export const CM = (t, display = false) => MT(t, { complex: true }, display);
// The inner MathML (without <math>) of a CAS text.
export const inner = (t) => toMathML(parse(t, { complex: true })).replace(/^<math[^>]*>|<\/math>$/g, '');

// A label « Res(f ; z₀) » in MathML.
export const resLabel = (z0T, f = 'f') => ({ label: `Res(${f} ; ${rd(z0T)})`, labelML: `<mi>Res</mi><mo>(</mo><mi>${f}</mi><mo>;</mo>${inner(z0T)}<mo>)</mo>` });
// A label made of a CAS text shown as math ('q′(1+i)', 'I'); text is what the line is.
export const mathLabel = (text, ml) => ({ label: text, labelML: ml ?? inner(text) });

// A cval judge: {label, labelML} + expect + options.
export const CV = (lab, expect, extra = {}) => ({ kind: 'cval', complex: true, ...lab, expect, form: 'algebraic', ...extra });

// ---------- polynomials over ℚ(i), lowest degree first ----------

const C0 = cq(0);
export const P = {
  trim(p) { const out = [...p]; while (out.length > 1 && out[out.length - 1].isZero()) out.pop(); return out; },
  of(...xs) { return xs.map((x) => (x instanceof CQ ? x : CQ.of(q(x)))); },
  add(a, b) { const n = Math.max(a.length, b.length); return P.trim(Array.from({ length: n }, (_, i) => (a[i] || C0).add(b[i] || C0))); },
  scale(a, k) { return P.trim(a.map((x) => x.mul(k))); },
  mul(a, b) {
    const out = Array.from({ length: a.length + b.length - 1 }, () => C0);
    a.forEach((x, i) => b.forEach((y, j) => { out[i + j] = out[i + j].add(x.mul(y)); }));
    return P.trim(out);
  },
  pow(a, k) { let out = [cq(1)]; for (let i = 0; i < k; i++) out = P.mul(out, a); return out; },
  der(a) { return a.length <= 1 ? [C0] : P.trim(a.slice(1).map((x, i) => x.mul(i + 1))); },
  ev(a, z) { let s = C0; for (let i = a.length - 1; i >= 0; i--) s = s.mul(z).add(a[i]); return s; },
  // (z − r₁)…(z − r_k)
  fromRoots(rs) { return rs.reduce((p, r) => P.mul(p, [r.neg(), cq(1)]), [cq(1)]); },
  // p(a + h) as a polynomial in h.
  shift(p, a) {
    let out = [C0];
    for (let i = p.length - 1; i >= 0; i--) out = P.add(P.mul(out, [a, cq(1)]), [p[i]]);
    return out;
  },
  // p / (z − a) when a is a root (synthetic division).
  deflate(p, a) {
    const n = p.length - 1;
    const out = Array.from({ length: n }, () => C0);
    let carry = C0;
    for (let i = n; i >= 1; i--) { carry = p[i].add(carry.mul(a)); out[i - 1] = carry; }
    return P.trim(out);
  },
  deg(p) { return P.trim(p).length - 1; },
};

// Power series N/D to order k (D[0] ≠ 0): coefficients 0…k.
function seriesDiv(N, D, k) {
  const out = [];
  for (let n = 0; n <= k; n++) {
    let s = N[n] || C0;
    for (let j = 1; j <= n; j++) s = s.sub((D[j] || C0).mul(out[n - j]));
    out.push(s.div(D[0]));
  }
  return out;
}

// Exact residue of N/D at a root a of D of multiplicity m (N(a) may be 0).
export function resRat(N, D, a) {
  let E = D;
  let m = 0;
  while (P.ev(E, a).isZero() && P.deg(E) > 0) { E = P.deflate(E, a); m++; }
  if (m === 0) return C0;
  const c = seriesDiv(P.shift(N, a), P.shift(E, a), m - 1);
  return c[m - 1];
}
// (z − a)^m D = E: the quotient E and m.
export function splitPole(D, a) {
  let E = D;
  let m = 0;
  while (P.ev(E, a).isZero() && P.deg(E) > 0) { E = P.deflate(E, a); m++; }
  return { E, m };
}

// A polynomial as a CAS text in v: 'z^4+4', '2z-(1+i)'.
export function pT(p, v = 'z') {
  const terms = [];
  for (let k = p.length - 1; k >= 0; k--) {
    const c = p[k];
    if (c.isZero()) continue;
    const mono = k === 0 ? '' : k === 1 ? v : `${v}^${k}`;
    let t;
    if (!mono) t = cT(c);
    else if (c.eq(1)) t = mono;
    else if (c.eq(-1)) t = `-${mono}`;
    else if (c.isReal() && c.re.d === 1) t = `${c.re.n}${mono}`;
    else if (c.isReal()) t = `${c.re.n < 0 ? '-' : ''}(${qt(c.re.n < 0 ? c.re.neg() : c.re)})${mono}`;
    else t = `${cP(c)}${mono}`;
    terms.push(t);
  }
  if (!terms.length) return '0';
  return terms.reduce((s, t) => (s ? (t.startsWith('-') ? `${s}${t}` : `${s}+${t}`) : t), '');
}

// ---------- numeric check of the reference values ----------

// Set by the tests: every residue a generator builds is checked against the
// numeric Laurent coefficient a₋₁ of js/cas/series.js.
export const VERIFY = { on: false, count: 0 };
const near = (a, b) => Math.abs(a.re - b.re) + Math.abs(a.im - b.im) <= 1e-6 * (1 + Math.abs(b.re) + Math.abs(b.im));
export function checkRes(fText, z0T, valueText, env = {}) {
  if (!VERIFY.on) return;
  const vars = ['z', ...Object.keys(env)];
  const f = parse(fText, { vars, complex: true });
  const z0 = parse(z0T, { complex: true });
  const r = residue(f, 'z', z0, { env });
  const want = evalComplex(parse(valueText, { vars, complex: true }), env);
  VERIFY.count++;
  if (!want || !near(r, want)) throw new Error(`Res(${fText} ; ${z0T}) = ${r.re} + ${r.im}i, pas ${valueText}`);
}
// A value text against a number (an integral computed by quadrature, a known value).
export function checkValue(text, expected, env = {}) {
  if (!VERIFY.on) return;
  const v = evalComplex(parse(text, { vars: Object.keys(env), complex: true }), env);
  const w = typeof expected === 'number' ? { re: expected, im: 0 } : expected;
  VERIFY.count++;
  if (!v || !near(v, w)) throw new Error(`${text} = ${v?.re} + ${v?.im}i, pas ${w.re} + ${w.im}i`);
}

// ---------- nice texts of computed values ----------

// A float as a fraction with a small denominator, or null.
export function ratQ(x) {
  if (!Number.isFinite(x)) return null;
  for (let m = 1; m <= 60; m++) {
    const k = x * m;
    if (Math.abs(k - Math.round(k)) < 1e-9 * Math.max(1, Math.abs(k)) && Math.abs(k) < 1e6) return q(Math.round(k), m);
  }
  return null;
}
// c·E as text (c in ℚ(i), E '' or a factor such as 'π', 'e^(-2)').
export function mulT(c, E = '') {
  if (!E) return cT(c);
  if (c.isZero()) return '0';
  if (c.isReal() || c.re.n === 0) {
    const r = c.isReal() ? c.re : c.im;
    const iS = c.isReal() ? '' : 'i';
    const a = r.n < 0 ? r.neg() : r;
    const n = a.n === 1 && !iS ? '' : a.n === 1 ? '' : String(a.n);
    return `${r.n < 0 ? '-' : ''}${n}${iS}${E}${a.d === 1 ? '' : `/${a.d}`}`;
  }
  return `(${cT(c)})${E}`;
}
// The value of a CAS text written c·E with E an exponential or π of the text
// itself (or 1), c in ℚ(i) with small denominators; null if none fits.
export function niceC(text) {
  let v;
  try { v = evalComplex(parse(text, { complex: true }), {}); } catch { v = null; }
  if (!v) return null;
  const Es = ['', ...new Set(String(text).match(/e\^\([^()]*\)/g) || []), ...(String(text).includes('π') ? ['π'] : [])];
  for (const E of Es) {
    const ev = E ? evalComplex(parse(E, { complex: true }), {}) : { re: 1, im: 0 };
    const m = ev.re * ev.re + ev.im * ev.im;
    const c = { re: (v.re * ev.re + v.im * ev.im) / m, im: (v.im * ev.re - v.re * ev.im) / m };
    const re = ratQ(c.re);
    const im = ratQ(c.im);
    if (re && im) return mulT(new CQ(re, im), E);
  }
  return null;
}
// An option for k·value (k a text: '-1', '2', 'i', '1/2'), when it has a nice text.
export const scaledOpt = (k, text, rule = null) => { const t = niceC(`(${k})(${text})`); return t ? { html: CM(t), rule } : null; };

// ---------- items ----------

// The lines of a part, without an intermediate line that would already end
// it (final for the judge) or repeat the previous value's writing.
export function chain(cfg, texts) {
  const J = JUDGES[cfg.kind];
  const out = [];
  texts = texts.filter(Boolean);
  texts.forEach((t, k) => {
    if (out.length && out[out.length - 1] === t) return;
    if (k < texts.length - 1) {
      // An intermediate line must be a step (isFinal false): a final line
      // ends the part, a « stay » one is refused in free mode.
      let fin = false;
      try { fin = J.isFinal(cfg, J.parseLine ? J.parseLine(cfg, t) : parse(t, { complex: true })) !== false; } catch { fin = false; }
      if (fin) return;
    }
    out.push(t);
  });
  return out;
}

// Sub-goal list entry.
export const SG = (id, label, skill) => ({ id, label, skill });
// A line of a part (partsItem): {math, note, subgoal, blank?, blank2?, from?}.
export const L = (math, note, subgoal, extra = {}) => ({ math, note, subgoal, ...extra });

// Four (or count) distinct options, the right one first (several right ones with rights).
export function choice(o, rng) {
  const options = [];
  for (const r of [o.right, ...(o.rights || [])]) if (r && !options.some((x) => x.html === r)) options.push({ html: r, correct: true });
  for (const w of [...(o.wrongs || []), ...(o.fillers || [])]) {
    if (options.length >= (o.count || 4)) break;
    if (!w || !w.html || options.some((x) => x.html === w.html)) continue;
    options.push({ html: w.html, correct: false, rule: w.rule ?? null });
  }
  return mcq({ ...o, options }, rng);
}
export const opt = (text, rule = null) => ({ html: CM(text), rule });

// A random pick that keeps the generator's own order of draws.
export const pick = (rng, xs) => xs[rng.int(0, xs.length - 1)];

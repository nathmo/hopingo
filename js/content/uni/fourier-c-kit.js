// Tools of module F, part c (Laplace, step U10): exact rational functions
// in z with poles in ℚ(i) (partial fractions, inverse transforms and
// residues of F(z)e^(zt), all exact), texts for the CAS and the judges
// `transform` and `lapres`, the cfg builders, multiple choice with several
// answers, and the numeric check of an integro-differential equation.

import { Q } from '../../math/rational.js';
import { CQ } from '../../cas/complex.js';
import { MT, mcq, linesItem, examTag } from './kit.js';
import { term, sumT, qt, q, fac } from './analyse2-h-kit.js';
import { laplaceTableHtml } from './fourier-tables.js';

export { MT, mcq, linesItem, examTag, term, sumT, qt, q, fac, laplaceTableHtml };

export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
export const KEYS = ['calc', 'transf', 'calcfn', 'calcx', 'cplx'];
// Readable text: − for -, spaces around + and =.
export const rd = (t) => String(t).replace(/\s*([+=])\s*/g, ' $1 ').replace(/([^(\s^,;])\s*-\s*/g, '$1 − ').replace(/-/g, '−').replace(/\^2(?![0-9])/g, '²').replace(/\^3(?![0-9])/g, '³').replace(/\^4(?![0-9])/g, '⁴');
export const TABLE = () => laplaceTableHtml();

// ---------- polynomials over ℚ(i) (lowest degree first) ----------

const C = (x) => CQ.of(x instanceof CQ ? x : Q.of(x));
export const P = (...cs) => cs.map(C);
const trim = (p) => { const r = [...p]; while (r.length > 1 && r[r.length - 1].isZero()) r.pop(); return r; };
export const padd = (a, b) => trim(Array.from({ length: Math.max(a.length, b.length) }, (_, k) => (a[k] || C(0)).add(b[k] || C(0))));
export const pscale = (a, c) => trim(a.map((x) => x.mul(C(c))));
export function pmul(a, b) {
  const out = Array.from({ length: a.length + b.length - 1 }, () => C(0));
  a.forEach((x, i) => b.forEach((y, j) => { out[i + j] = out[i + j].add(x.mul(y)); }));
  return trim(out);
}
export const ppow = (a, k) => { let r = P(1); for (let i = 0; i < k; i++) r = pmul(r, a); return r; };
export const peval = (a, z) => a.reduceRight((s, c) => s.mul(C(z)).add(c), C(0));
export const deg = (a) => (trim(a).length === 1 && a[0].isZero() ? -1 : trim(a).length - 1);
// (z − p).
export const lin = (p) => P(C(p).neg(), 1);
// a(p + w) as a polynomial in w.
function shift(a, p) {
  let out = P(0);
  for (let k = a.length - 1; k >= 0; k--) out = padd(pmul(out, P(C(p), 1)), [a[k]]);
  return out;
}
// Taylor coefficients of a/b at 0 up to order n − 1 (b(0) ≠ 0).
function seriesDiv(a, b, n) {
  const out = [];
  const A = [...a];
  for (let k = 0; k < n; k++) {
    let s = A[k] || C(0);
    for (let j = 1; j <= k; j++) s = s.sub((b[j] || C(0)).mul(out[k - j]));
    out.push(s.div(b[0]));
  }
  return out;
}

// A rational function N / Π (z − p)^m: poles [{p: CQ, m}] (distinct).
export const denPoly = (poles) => poles.reduce((d, { p, m }) => pmul(d, ppow(lin(p), m)), P(1));
// Partial fractions of a proper N/D: [{p, m, c: [c₁ … c_m]}], c_j the
// coefficient of 1/(z − p)^j.
export function pfd(N, poles) {
  return poles.map(({ p, m }) => {
    const other = denPoly(poles.filter((x) => !x.p.eq(p)));
    const g = seriesDiv(shift(N, p), shift(other, p), m);
    return { p: C(p), m, c: Array.from({ length: m }, (_, j) => g[m - 1 - j]) };
  });
}
const FACT = [1, 1, 2, 6, 24, 120];

// ---------- texts ----------

// A rational number as a factor before a body: '', '-', '3', '(3/2)'.
const cqT = (c) => {
  if (c.im.n === 0) return qt(c.re);
  if (c.re.n === 0) return term(c.im, 'i');
  const im = c.im.n < 0 ? `-${term(c.im.neg(), 'i')}` : `+${term(c.im, 'i')}`;
  return `${qt(c.re)}${im}`;
};
export const cText = cqT;
// z − p as text: z, z+2, z-(1+i).
export const zp = (p) => { const c = C(p); if (c.isZero()) return 'z'; if (c.im.n === 0) return c.re.n < 0 ? `z+${qt(c.re.neg())}` : `z-${qt(c.re)}`; return `z-(${cqT(c)})`; };
// (z − p)^m as a factor.
export const zpow = (p, m) => { const b = zp(p); const w = b === 'z' ? 'z' : `(${b})`; return m === 1 ? w : `${w}^${m}`; };
// e^(p t) (p in ℚ(i)): '' for 0.
export function et(p) {
  const c = C(p);
  if (c.isZero()) return '';
  if (c.im.n === 0) { const t = term(c.re, 't'); return t === 't' ? 'e^t' : `e^(${t})`; }
  return `e^((${cqT(c)})t)`;
}
const tk = (k) => (k === 0 ? '' : k === 1 ? 't' : `t^${k}`);
const join = (...xs) => xs.filter(Boolean).join(' ');
// A real polynomial in z (coefficients in ℚ), highest degree first.
export function zpoly(a) {
  const pairs = [];
  for (let k = a.length - 1; k >= 0; k--) pairs.push([a[k].re, k === 0 ? '' : k === 1 ? 'z' : `z^${k}`]);
  return sumT(pairs.map(([c, m]) => term(c, m)));
}
// The denominator as a product of factors; conjugate pairs as a trinomial.
export function denText(poles, { completed = false } = {}) {
  const out = [];
  for (const { p, m } of poles) {
    if (p.im.n < 0) continue;
    if (p.im.n === 0) { out.push(zpow(p, m)); continue; }
    const a = p.re;
    const b2 = p.im.mul(p.im);
    const tri = completed ? `${a.n === 0 ? 'z^2' : `(${zp(a)})^2`}+${qt(b2)}` : zpoly(pmul(lin(p), lin(p.conj())));
    out.push(m === 1 ? `(${tri})` : `(${tri})^${m}`);
  }
  return out.join('');
}
// c/den as text, c a rational, den 'z', 'z^2', '(z+1)', '(z+1)^2':
// '3/(z+1)', '-1/(2(z+1))'.
export function fracT(c, den) {
  const x = q(c);
  if (x.n === 0) return '';
  return x.d === 1 ? `${x.n}/${den}` : `${x.n}/(${x.d}${den})`;
}
// c·(body) with an explicit product: 'body', '-body', '3×body', '(1/2)×body'.
export const timesT = (c, body) => { const x = q(c); if (x.eq(1)) return body; if (x.eq(-1)) return `-${body}`; return x.d === 1 ? `${x.n}×${body}` : `(${qt(x)})×${body}`; };

// The inverse transform of the partial fractions (one function of t),
// real: conjugate pairs give e^(at)(A cos bt + B sin bt).
export function inverseText(parts) {
  const terms = [];
  for (const { p, c } of parts) {
    if (p.im.n < 0) continue;
    c.forEach((cj, j) => {
      if (cj.isZero()) return;
      const k = j;
      if (p.im.n === 0) {
        terms.push(term(cj.re.div(FACT[k]), join(tk(k), et(p.re)) || ''));
        return;
      }
      // c/(z − p) + c̄/(z − p̄) ↦ 2Re(c) e^(at) cos(bt) − 2Im(c) e^(at) sin(bt) (simple poles).
      const b = p.im;
      const arg = term(b, 't');
      const A = cj.re.mul(2).div(FACT[k]);
      const B = cj.im.mul(-2).div(FACT[k]);
      terms.push(term(A, join(tk(k), et(p.re), `cos(${arg})`)));
      terms.push(term(B, join(tk(k), et(p.re), `sin(${arg})`)));
    });
  }
  return sumT(terms);
}
// The residue of F(z)e^(zt) at the pole p, text in t (complex for a complex pole).
export function residueText(part) {
  const { p, c } = part;
  const terms = c.map((cj, j) => {
    if (cj.isZero()) return '';
    const k = cj.div(FACT[j]);
    const body = join(tk(j), et(p));
    if (k.im.n === 0) return term(k.re, body);
    return `(${cqT(k)})${body ? ` ${body}` : ''}`;
  }).filter(Boolean);
  return sumT(terms);
}
// The partial fractions as text (real form), and in the « table » form
// (A(z − a) + B·b over (z − a)² + b²).
export function pfdText(parts, { table = false } = {}) {
  const terms = [];
  for (const { p, c } of parts) {
    if (p.im.n < 0) continue;
    c.forEach((cj, j) => {
      if (cj.isZero()) return;
      if (p.im.n === 0) { terms.push(fracT(cj.re, zpow(p, j + 1))); return; }
      const a = p.re;
      const b = p.im;
      const den = a.n === 0 ? `z^2+${qt(b.mul(b))}` : `(${zp(a)})^2+${qt(b.mul(b))}`;
      const A = cj.re.mul(2);
      const B = cj.im.mul(-2);
      if (table) {
        if (A.n) terms.push(timesT(A, `(${a.n === 0 ? 'z' : zp(a)})/(${den})`));
        if (B.n) terms.push(timesT(B, `(${qt(b)}/(${den}))`));
        return;
      }
      // numerator A(z − a) + B·b = A z + (B b − A a).
      const num = zpoly([C(B.mul(b).sub(A.mul(a))), C(A)]);
      terms.push(A.n === 0 ? `${num}/(${den})` : `(${num})/(${den})`);
    });
  }
  return sumT(terms);
}

// ---------- judges ----------

export const lap = (o) => ({ kind: 'transform', transform: 'laplace', v: 't', s: 'z', dir: 'forward', ...o });
export const lapres = (o) => ({ kind: 'lapres', v: 't', s: 'z', ...o });

// ---------- items ----------

export const opt = (html, correct, rule = null) => ({ html, correct, rule });
// Multiple choice with several right answers (module F exams): 4 or 5
// distinct options, at least one right.
export function mcqMulti(o, rng) {
  const seen = new Set();
  const options = [];
  for (const x of o.options) {
    if (!x || seen.has(x.html) || options.length >= (o.count || 5)) continue;
    seen.add(x.html);
    options.push(x);
  }
  return mcq({ ...o, prompt: `${o.prompt} <i>(Plusieurs réponses possibles.)</i>`, options, multi: true }, rng);
}
// Single-answer multiple choice (lessons): the right one, then wrongs.
export function mcqOne(o, rng) {
  const seen = new Set();
  const options = [];
  for (const x of [o.right && opt(o.right, true), ...(o.wrongs || [])]) {
    if (!x || seen.has(x.html) || options.length >= 4) continue;
    seen.add(x.html);
    options.push({ ...x, correct: !!x.correct });
  }
  return mcq({ ...o, options }, rng);
}

// ---------- numbers ----------

export const pickNot = (rng, list, bad) => { const l = list.filter((x) => !bad.includes(x)); return rng.pick(l); };
export const small = (x, n = 12, d = 6) => q(x).d <= d && Math.abs(q(x).n) <= n;

// ---------- integro-differential equations (f-lap-integro) ----------

// u′(t) + a u(t) + c ∫₀ᵗ u(s) e^(a(t − s)) ds − K e^(at) at 6 values of t,
// for u = A cos ωt + B sin ωt (Simpson's rule, 400 intervals): the largest
// absolute value of the residual.
export function integroResidual({ a, c, K, A, B, w }) {
  const u = (t) => A * Math.cos(w * t) + B * Math.sin(w * t);
  const du = (t) => -A * w * Math.sin(w * t) + B * w * Math.cos(w * t);
  let worst = 0;
  for (const t of [0.3, 0.7, 1.1, 1.6, 2.2, 2.9]) {
    const n = 400;
    const h = t / n;
    let s = 0;
    for (let k = 0; k <= n; k++) {
      const x = k * h;
      const f = u(x) * Math.exp(a * (t - x));
      s += f * (k === 0 || k === n ? 1 : k % 2 ? 4 : 2);
    }
    const integral = (s * h) / 3;
    const r = du(t) + a * u(t) + c * integral - K * Math.exp(a * t);
    worst = Math.max(worst, Math.abs(r) / (1 + Math.abs(K * Math.exp(a * t))));
  }
  return worst;
}

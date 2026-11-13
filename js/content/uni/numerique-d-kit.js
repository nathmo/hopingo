// Tools of module N, part d (finite differences, step U9): polynomials with
// whole coefficients evaluated exactly, decimal writing, the letters of the
// Taylor lines, the stencils of the formulas built by Taylor.
//
// Taylor lines (no `series` judge with an abstract f, catalogue extension
// 5): a development is a line of the judge `equiv` whose start is f(x − 2h)
// with f declared as a function of the item (funcs) and defined (defs) as
// its cubic Taylor polynomial around x, with the letters A = f(x̄),
// B = f′(x̄), C = f″(x̄) and, for the last term, D = f‴(x̄) (formula
// building) or U, V = f‴(ξ₁), f‴(ξ₂) (Lagrange remainders of a proof):
//   f(t) = A + B(t − x) + C(t − x)²/2 + D(t − x)³/6
// so f(x − 2h) is exactly A − 2hB + 2h²C − (4/3)h³D, and target 'goal'
// asks for that developed form.

import { Q } from '../../math/rational.js';
import { t } from '../../i18n.js';

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const R = (s) => String(s).replace(/-/g, '−');

// Exact decimal text of a rational with a finite writing (« 1,331 »,
// « -0,729 »), else the fraction; fq for the screen (−).
export function dt(x) {
  const v = q(x);
  const d = v.toDecimal();
  return (d ?? v.toString()).replace(/−/g, '-');
}
export const fd = (x) => R(dt(x));

// ---------- polynomials ----------

// coeffs[k] = coefficient of x^k (whole numbers).
export const evalPoly = (c, x) => c.reduce((s, a, k) => s.add(q(a).mul(q(x).pow(k))), new Q(0));
export const derivPoly = (c) => c.slice(1).map((a, k) => a * (k + 1));
export function polyCas(c) {
  const terms = [];
  for (let k = c.length - 1; k >= 0; k--) {
    const a = c[k];
    if (!a) continue;
    const mono = k === 0 ? '' : k === 1 ? 'x' : `x^${k}`;
    const coef = k === 0 ? String(Math.abs(a)) : Math.abs(a) === 1 ? '' : String(Math.abs(a));
    terms.push(`${a < 0 ? '-' : terms.length ? '+' : ''}${coef}${mono}`);
  }
  return terms.join('') || '0';
}
const SUP = { 2: '²', 3: '³', 4: '⁴' };
export function polyHtml(c) {
  return R(polyCas(c).replace(/\^(\d)/g, (_, d) => SUP[d]).replace(/([+-])/g, ' $1 ').replace(/^ - /, '-').trim());
}
// Python text of the polynomial (x**3 - 2*x + 1).
export function polyPy(c) {
  return polyCas(c).replace(/\^(\d)/g, '**$1').replace(/(\d)x/g, '$1*x').replace(/([+-])/g, ' $1 ').replace(/^ - /, '-').trim();
}

export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const KEYS = ['calc'];
export const LKEYS = ['calc', 'letters'];

// ---------- Taylor letters ----------

export const TVARS = ['t', 'x', 'h', 'A', 'B', 'C', 'D', 'U', 'V'];
export const DEF_D = 'A+B(t-x)+C(t-x)^2/2+D(t-x)^3/6';
export const defWith = (last) => `A+B(t-x)+C(t-x)^2/2+${last}(t-x)^3/6`;
// The node f(x + kh) as text: f(x-2h), f(x+h), f(x).
export const atText = (k) => (k === 0 ? 'f(x)' : `f(x${k > 0 ? '+' : '-'}${Math.abs(k) === 1 ? '' : Math.abs(k)}h)`);
export const atHtml = (k, x = 'x̄') => (k === 0 ? `f(${x})` : `f(${x} ${k > 0 ? '+' : '−'} ${Math.abs(k) === 1 ? '' : Math.abs(k)}h)`);

// A coefficient times a monomial, as CAS text (+2/3h^3U).
function term(c, mono, first) {
  const v = q(c);
  if (v.n === 0) return '';
  const abs = v.n < 0 ? v.neg() : v;
  const sign = v.n < 0 ? '-' : first ? '' : '+';
  const k = abs.eq(1) ? '' : abs.d === 1 ? String(abs.n) : `${abs.n}/${abs.d}`;
  return `${sign}${k}${mono}`;
}
export function sumText(pairs) {
  let out = '';
  for (const [c, mono] of pairs) out += term(c, mono, !out);
  return out || '0';
}
// The Taylor development of f(x + kh) to h³, last letter L (D, U or V).
export function taylorText(k, L = 'D') {
  const K = q(k);
  return sumText([[1, 'A'], [K, 'hB'], [K.mul(K).div(2), 'h^2C'], [K.mul(K).mul(K).div(6), `h^3${L}`]]);
}
// The same with every sign + (trap n_fd_taylor_sign).
export function taylorPlusText(k, L = 'D') {
  const K = q(Math.abs(k));
  return sumText([[1, 'A'], [K, 'hB'], [K.mul(K).div(2), 'h^2C'], [K.mul(K).mul(K).div(6), `h^3${L}`]]);
}
// Readable: A − 2hB + 2h²C − (4/3)h³D.
export const readable = (t) => R(t.replace(/\^2/g, '²').replace(/\^3/g, '³').replace(/([+-])/g, ' $1 ').replace(/^ - /, '-').trim());

// ---------- stencils ----------

// Formulas D_h f(x̄) = Σ cⱼ f(x̄ + kⱼh) / h for f′ (order 2): offsets and
// letters of the coefficients, in the order of the formula.
export const STENCILS = [
  { id: 'back', ks: [0, -1, -2], name: t('rétrograde à trois points') },
  { id: 'fwd', ks: [0, 1, 2], name: t('progressive à trois points') },
  { id: 'cent', ks: [-1, 0, 1], name: t('centrée') },
  { id: 'skew', ks: [-1, 0, 2], name: t('décentrée') },
];
export const LETTERS = ['α', 'β', 'γ'];

// Solves the 3 × 3 system M c = r exactly (Cramer).
function det3(m) {
  return m[0][0].mul(m[1][1].mul(m[2][2]).sub(m[1][2].mul(m[2][1])))
    .sub(m[0][1].mul(m[1][0].mul(m[2][2]).sub(m[1][2].mul(m[2][0]))))
    .add(m[0][2].mul(m[1][0].mul(m[2][1]).sub(m[1][1].mul(m[2][0]))));
}
export function solve3(M, r) {
  const m = M.map((row) => row.map((x) => q(x)));
  const d = det3(m);
  return [0, 1, 2].map((j) => det3(m.map((row, i) => row.map((x, k) => (k === j ? q(r[i]) : x)))).div(d));
}
// The coefficients of the order-2 formula for f′, and its error term:
// D_h f = f′ + E·h²·f‴ + …, E = Σ cⱼkⱼ³/6.
export function stencilData(s) {
  const M = [s.ks.map(() => 1), s.ks.map((k) => k), s.ks.map((k) => q(k * k, 2))];
  const c = solve3(M, [0, 1, 0]);
  const err = c.reduce((acc, cj, j) => acc.add(cj.mul(s.ks[j] ** 3).div(6)), new Q(0));
  // Proof constant: Σ |cⱼ kⱼ³|/6 (each remainder has its own ξ).
  const C = c.reduce((acc, cj, j) => { const v = cj.mul(s.ks[j] ** 3).div(6); return acc.add(v.n < 0 ? v.neg() : v); }, new Q(0));
  return { ...s, c, err, C, rows: M };
}
// The formula as HTML: (3f(x̄) − 4f(x̄ − h) + f(x̄ − 2h))/(2h), over a common denominator.
export function formulaHtml(s, c = s.c, x = 'x̄') {
  const den = c.reduce((l, v) => (l * v.d) / gcd(l, v.d), 1);
  const ints = c.map((v) => v.mul(den));
  let out = '';
  ints.forEach((v, j) => {
    if (v.n === 0) return;
    const a = Math.abs(v.n);
    out += `${v.n < 0 ? (out ? ' − ' : '−') : out ? ' + ' : ''}${a === 1 ? '' : a}${atHtml(s.ks[j], x)}`;
  });
  return `(${out})/(${den === 1 ? '' : den}h)`;
}
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
// Python text of the same formula (catalogue code: (3 * f(x) - 4 * f(x - h) + f(x - 2 * h)) / (2 * h)).
export function formulaPy(s, c = s.c) {
  const den = c.reduce((l, v) => (l * v.d) / gcd(l, v.d), 1);
  const ints = c.map((v) => v.mul(den));
  const at = (k) => (k === 0 ? 'f(x)' : `f(x ${k > 0 ? '+' : '-'} ${Math.abs(k) === 1 ? 'h' : `${Math.abs(k)} * h`})`);
  let out = '';
  ints.forEach((v, j) => {
    if (v.n === 0) return;
    const a = Math.abs(v.n);
    out += `${v.n < 0 ? (out ? ' - ' : '-') : out ? ' + ' : ''}${a === 1 ? '' : `${a} * `}${at(s.ks[j])}`;
  });
  return `(${out}) / (${den === 1 ? '' : `${den} * `}h)`;
}

// ---------- tables in double precision ----------

export const FUNCS = [
  { id: 'ln', html: 'ln', f: Math.log, d: (x) => 1 / x, x: 1, xh: '1' },
  { id: 'exp', html: 'exp', f: Math.exp, d: Math.exp, x: 0, xh: '0' },
  { id: 'sin', html: 'sin', f: Math.sin, d: Math.cos, x: 1, xh: '1' },
  { id: 'cube', html: 'x ↦ x³', f: (x) => x * x * x, d: (x) => 3 * x * x, x: 1, xh: '1' },
];
export const fwd = (f, x, h) => (f(x + h) - f(x)) / h;
export const cent = (f, x, h) => (f(x + h) - f(x - h)) / (2 * h);
export const hText = (h) => `1e-${String(Math.round(-Math.log10(h))).padStart(2, '0')}`.replace('1e-01', '1e-1').replace(/1e-0(\d)$/, '1e-$1');

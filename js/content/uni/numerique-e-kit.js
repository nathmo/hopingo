// Tools of module N, part e (quadrature, error statements, Richardson;
// step U9): exact polynomials over ℚ, the composite formulas in exact and
// float arithmetic, the error tables of the catalogue, and the number
// writings of the part.

import { t } from '../../i18n.js';
import { Q } from '../../math/rational.js';
import { expText } from './numerique-kit.js';

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const R = (s) => String(s).replace(/-/g, '−');

// A rational as the screen writes it: a short decimal (0,125), else a
// fraction (7/6), with the minus sign of the screen.
export function qd(x) {
  const v = q(x);
  const d = v.toDecimal();
  if (d !== null && d.replace(/[^0-9]/g, '').length <= 6) return d;
  return String(v);
}
export const qR = (x) => R(qd(x));
// The same, as CAS input (parenthesised when negative).
export const qi = (x) => { const s = qd(x); return s.startsWith('-') ? `(${s})` : s; };

// ---------- polynomials (coefficients from x⁰) ----------

export const pEval = (cs, x) => cs.reduce((s, c, k) => s.add(q(c).mul(q(x).pow(k))), q(0));
export const pEvalF = (cs, x) => cs.reduce((s, c, k) => s + c * x ** k, 0);
export const pInt = (cs, a, b) => cs.reduce((s, c, k) => s.add(q(c).mul(q(b).pow(k + 1).sub(q(a).pow(k + 1))).div(k + 1)), q(0));
const SUP = { 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶' };
// x³ − 2x + 1 (readable); pText(cs, true): CAS input x^3-2x+1.
export function pText(cs, input = false) {
  const out = [];
  for (let k = cs.length - 1; k >= 0; k--) {
    const c = cs[k];
    if (!c) continue;
    const a = Math.abs(c);
    const mono = k === 0 ? '' : k === 1 ? 'x' : input ? `x^${k}` : `x${SUP[k]}`;
    const coef = k > 0 && a === 1 ? '' : String(a);
    const sign = c < 0 ? (out.length ? (input ? '-' : ' − ') : (input ? '-' : '−')) : (out.length ? (input ? '+' : ' + ') : '');
    out.push(`${sign}${coef}${mono}`);
  }
  return out.join('') || '0';
}

// ---------- composite formulas ----------

export const METHODS = {
  rect: { name: t('rectangle (à gauche)'), p: 1, r: 0 },
  mid: { name: t('point milieu'), p: 2, r: 1 },
  trap: { name: t('trapèze'), p: 2, r: 1 },
  simp: { name: t('Simpson'), p: 4, r: 3 },
  gauss2: { name: t('Gauss à 2 points'), p: 4, r: 3 },
};

// Exact (f: x ↦ Q) for rect, mid, trap, simp; float (f: x ↦ number) for all.
export function quadQ(m, f, a, b, n) {
  const h = q(b).sub(q(a)).div(n);
  let s = q(0);
  for (let i = 0; i < n; i++) {
    const x0 = q(a).add(h.mul(i));
    const x1 = x0.add(h);
    const c = x0.add(x1).div(2);
    if (m === 'rect') s = s.add(h.mul(f(x0)));
    else if (m === 'mid') s = s.add(h.mul(f(c)));
    else if (m === 'trap') s = s.add(h.div(2).mul(f(x0).add(f(x1))));
    else if (m === 'simp') s = s.add(h.div(6).mul(f(x0).add(f(c).mul(4)).add(f(x1))));
    else throw new Error(`quadQ ${m}`);
  }
  return s;
}
export function quadF(m, f, a, b, n) {
  const h = (b - a) / n;
  const al = 1 / Math.sqrt(3);
  let s = 0;
  for (let i = 0; i < n; i++) {
    const x0 = a + i * h;
    const x1 = x0 + h;
    const c = (x0 + x1) / 2;
    if (m === 'rect') s += h * f(x0);
    else if (m === 'mid') s += h * f(c);
    else if (m === 'trap') s += (h / 2) * (f(x0) + f(x1));
    else if (m === 'simp') s += (h / 6) * (f(x0) + 4 * f(c) + f(x1));
    else if (m === 'gauss2') s += (h / 2) * (f(x0 + (h / 2) * (1 - al)) + f(x0 + (h / 2) * (1 + al)));
  }
  return s;
}

// The functions of the error tables, with their exact integral.
export const FUNS = [
  { id: 'esin', text: 'e⁻ˣ sin x', a: 0, b: 2, ab: '[0 ; 2]', f: (x) => Math.exp(-x) * Math.sin(x), I: 0.5 - (Math.exp(-2) * (Math.sin(2) + Math.cos(2))) / 2 },
  { id: 'exp', text: 'eˣ', a: 0, b: 1, ab: '[0 ; 1]', f: Math.exp, I: Math.E - 1 },
  { id: 'runge', text: '1/(1 + x²)', a: 0, b: 1, ab: '[0 ; 1]', f: (x) => 1 / (1 + x * x), I: Math.PI / 4 },
  { id: 'cos', text: 'cos x', a: 0, b: Math.PI / 2, ab: '[0 ; π/2]', f: Math.cos, I: 1 },
];
export const NS = [10, 20, 40, 80];
export const errOf = (F, m, n) => Math.abs(quadF(m, F.f, F.a, F.b, n) - F.I);
export const E3 = (x) => expText(x, 3);
// x.yz with a comma (a ratio).
export const r2 = (x, d = 2) => String(Number(x.toFixed(d))).replace('.', ',');

export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];

// Wrong values of the traps of part e for a value segment (js/cas/rules/ne.js
// reads cfg.etraps = {ruleId: [texts]} and cfg.etrapCtx = {ruleId: ctx}).
export function etraps(list) {
  const traps = {};
  const ctx = {};
  for (const [id, values, c] of list) {
    const vs = values.filter((v) => v !== null && v !== undefined).map(String);
    if (!vs.length) continue;
    traps[id] = vs;
    if (c) ctx[id] = c;
  }
  return { etraps: traps, etrapCtx: ctx };
}

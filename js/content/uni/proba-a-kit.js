// Helpers of module P, part a (step U7): numbers written for the judges
// and for the screen, data lists, and the « Interpréter » options shared by
// the Bayes skills. Generators: proba-a-desc.js (descriptive statistics),
// proba-a-events.js (events, counting, conditioning, Bayes, independence),
// proba-a-laws.js (discrete laws).

import { Q } from '../../math/rational.js';
import { SM } from './proba-kit.js';

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
// A Q for the judges' lines: 0,35 ; 15/28 ; -0,5.
// (A decimal of more than 6 digits after the comma is written as a fraction.)
export const t = (x) => {
  if (!(x instanceof Q)) return String(x).replace('.', ',');
  const d = x.toDecimal();
  return d && !(d.split(',')[1]?.length > 6) ? d : `${x.n}/${x.d}`;
};
// The same for the screen (− and thin spaces in big integers).
export const s = (x) => {
  const v = t(x).replace('-', '−');
  return /^−?\d{5,}$/.test(v) ? v.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : v;
};
// A decimal Q from a number with at most 6 decimals (0.35 → 7/20).
export const qd = (x) => {
  const k = 1e6;
  return new Q(Math.round(x * k), k);
};
export const M = (text) => SM(text);
export const list = (xs) => xs.map((x) => String(x).replace('-', '−')).join(', ');
export const sum = (xs) => xs.reduce((a, b) => a + b, 0);
// A percentage of a Q: 1/12 → « 8,3 % ».
export const pct = (x, d = 1) => `${String(Number((x.valueOf() * 100).toFixed(d))).replace('.', ',')} %`;
// C(n, k) exactly (small n).
export function C(n, k) {
  if (k < 0 || k > n) return 0;
  let c = 1;
  for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i;
  return Math.round(c);
}
export const qpow = (x, k) => (k === 0 ? q(1) : x.pow(k));
// a/b for a line: each side in brackets when it is itself a fraction.
const wrap = (x) => (x.includes('/') || x.startsWith('-') ? `(${x})` : x);
export const ratio = (a, b) => `${wrap(t(a))}/${wrap(t(b))}`;
// « 1 dame », « 3 dames » : the words of a plural, made singular for k ≤ 1.
export const nb = (k, words) => `${k} ${Math.abs(k) <= 1 ? words.split(' ').map((w) => w.replace(/s$/, '')).join(' ') : words}`;

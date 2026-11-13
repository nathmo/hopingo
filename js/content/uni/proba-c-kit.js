// Small tools shared by the generators of module P, part c (step U7):
// proba-c.js and proba-c-est.js. Exact rationals for the corrigés, texts
// for the judges (point decimals) and for the lines (comma decimals).

import { Q } from '../../math/rational.js';
import { t } from '../../i18n.js';

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
// A rational for the judges: 0.24, 15/28, −3.
export const J = (x) => {
  const r = q(x);
  const d = r.toDecimal();
  return d !== null ? d.replace(',', '.') : `${r.n}/${r.d}`;
};
// A rational for a line of the corrigé: 0,24 ; 15/28 ; −3 (keypad text).
export const T = (x) => {
  const r = q(x);
  const d = r.toDecimal();
  return d !== null ? d : `${r.n}/${r.d}`;
};
// The same on screen (− sign).
export const S = (x) => T(x).replace('-', '−');
// A float with d decimals: for lines (0,023) and screens (−0,5).
export const F = (x, d = 3) => String(Number(Number(x).toFixed(d))).replace('.', ',');
export const FS = (x, d = 3) => F(x, d).replace('-', '−');
// A float for the judges.
export const FJ = (x, d = 10) => String(Number(Number(x).toFixed(d)));
// q from a decimal number (0.6 → 3/5).
export const qd = (x) => {
  const s = String(x);
  const k = s.includes('.') ? s.split('.')[1].length : 0;
  return new Q(Math.round(x * 10 ** k), 10 ** k);
};
// A line of the corrigé.
export const L = (math, note, subgoal, blank, blank2) => ({ math, note, subgoal, blank, blank2 });
export const sgn = (x) => (x < 0 ? -1 : 1);
// Parentheses around a negative number in a product: 2·(−3).
export const P = (x) => (q(x).n < 0 ? `(${T(x)})` : T(x));
export const PS = (x) => (q(x).n < 0 ? `(${S(x)})` : S(x));
// Distinct options: drop the values equal to the right one or repeated.
export function wrongsOf(right, list) {
  const seen = new Set([right]);
  const out = [];
  for (const w of list) {
    if (!w || seen.has(w.html)) continue;
    seen.add(w.html);
    out.push(w);
  }
  return out;
}

// Is a line text already a final number (whole, decimal or irreducible fraction)?
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
export function finalText(t) {
  if (/^-?\d+(,\d+)?$/.test(t)) return true;
  const m = /^-?(\d+)\/(\d+)$/.exec(t);
  return !!m && gcd(Number(m[1]), Number(m[2])) === 1 && m[2] !== '1';
}
// The lines « text », then the value if text is not final yet.
export const thenValue = (text, value, note, subgoal, blank) => [L(text, note, subgoal, blank), ...(finalText(text) ? [] : [L(T(value), t('Calculer'), subgoal, [T(value)])])];

// Helpers shared by the generators of module A1, part h (unit `analyse1`,
// step U4): the U2 helpers of part b (blanks, menus, items in parts) and
// what sequences need (n as a whole number, terms b·qⁿ written out).

import { Q } from '../../math/rational.js';
import { MT } from './kit.js';

export {
  q, N, nz, modeOf, H, E, examOf, kx, joinSum, lin, blanked, stepMenus, partsItem, mcqOf, RD, ML, P,
} from './analyse1-b-common.js';

// MathML of a text in n (and k, N for sums).
export const MN = (t) => MT(String(t), { vars: ['n', 'k', 'N'] });
// French text of a number: 3/4, −2.
export const fr = (s) => String(s).replace(/-/g, '−');
export const SEC = { 1: 60, 2: 90, 3: 120, 4: 180, 5: 300 };

// A number inside a power or a product: 2, (−2), (1/3).
export const base = (x) => { const v = Q.of(x); const s = v.toString(); return v.d === 1 && v.n >= 0 ? s : `(${s})`; };

// b·qⁿ written out: 4/3^n, −4/3^n, 5×2^n, −(−2)^n, 3(2/3)^n, (−1/2)^n.
export function geoTerm(b, qq, v = 'n') {
  const B = Q.of(b);
  const R = Q.of(qq);
  if (B.n === 0) return '0';
  // q = ±1/d: b/dⁿ (and (−1)ⁿ for the sign).
  if (R.n === 1 && R.d > 1) {
    const top = B.d === 1 ? String(B.n) : `(${B})`;
    return `${top}/${R.d}^${v}`;
  }
  const pw = `${base(R)}^${v}`;
  if (B.eq(1)) return pw;
  if (B.eq(-1)) return `-${pw}`;
  if (B.d !== 1) return `${B.n < 0 ? '-' : ''}(${Math.abs(B.n)}/${B.d})${pw}`;
  return R.d === 1 && R.n > 0 ? `${B.n}×${pw}` : `${B.n}${pw}`;
}

// q·u + c written with u = a_n: a_n/3 + 4, 2a_n − 3, −a_n/2 + 6, (2/3)a_n + 1.
export function affineText(qq, c, u = 'a_n') {
  const R = Q.of(qq);
  let head;
  if (R.eq(1)) head = u;
  else if (R.eq(-1)) head = `-${u}`;
  else if (Math.abs(R.n) === 1 && R.d > 1) head = `${R.n < 0 ? '-' : ''}${u}/${R.d}`;
  else if (R.d === 1) head = `${R.n}${u}`;
  else head = `${R.n < 0 ? '-' : ''}(${Math.abs(R.n)}/${R.d})${u}`;
  const C = Q.of(c);
  if (C.n === 0) return head;
  return C.n < 0 ? `${head}-${Q.of(C.neg())}` : `${head}+${C}`;
}

// « − L » in a sentence: − 3, + 4 (for aₙ − L).
export const minus = (x) => { const v = Q.of(x); return v.n < 0 ? `+ ${fr(v.neg())}` : `− ${fr(v)}`; };
// qⁿ in a sentence: 3ⁿ, (−2)ⁿ, (1/3)ⁿ.
export const powText = (x) => { const v = Q.of(x); return v.d === 1 && v.n >= 0 ? `${v}ⁿ` : `(${fr(v)})ⁿ`; };

// A segment of a lines item made of parts (js/content/uni/analyse1-b-common.js partsItem).
export const part = (html, ask, start, judge, lines, pre) => ({ html, ask, start, judge, lines, ...(pre ? { pre } : {}) });
// A decision line: options [{id, label, valid, why?, rule?}].
export const decision = (prompt, options) => ({ kind: 'decision', prompt, options });

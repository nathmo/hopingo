// Formulas and numbers in physics texts.
//   F('E_p = m g h') → the formula drawn (italic letters, subscripts, fractions)
//   num(175000) → « 175 000 », num(0.45) → « 0,45 », sci(3.6e6) → « 3,6·10⁶ »
//   qty(0.45, 'kg') → « 0,45 kg »

import { parse, toHtml, symbolsIn } from '../../physics/expr.js';
import { QUANTITIES } from '../../physics/quantities.js';

export const ALL_SYMBOLS = Object.keys(QUANTITIES);

// Symbols of a text: the known ones, plus any « X_y » written in it (m_1).
export const symbolsOf = (src) => [...new Set([...ALL_SYMBOLS, ...(String(src).match(/[\p{L}Δ]+_[\p{L}0-9]+/gu) || [])])];

export const F = (src, symbols = symbolsOf(src)) => `<span class="m">${toHtml(parse(src, symbols))}</span>`;

// The symbols a formula uses.
export const symsOf = (src, symbols = symbolsOf(src)) => [...symbolsIn(parse(src, symbols))];

// ---------- numbers ----------

// Rounds away float noise (0.1 + 0.2).
export const fix = (v) => Number(Number(v).toPrecision(12));

// French writing: decimal comma, thin space every 3 digits from 10 000.
export function num(v) {
  const x = fix(v);
  const [i, d] = String(Math.abs(x)).split('.');
  const int = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : i;
  return `${x < 0 ? '−' : ''}${int}${d ? `,${d}` : ''}`;
}

const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
// 3,6·10⁶ with `sig` significant figures.
export function sci(v, sig = 2) {
  if (v === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(v)));
  let m = fix(Number((v / 10 ** e).toPrecision(sig)));
  let k = e;
  if (Math.abs(m) >= 10) { m = fix(m / 10); k += 1; }
  return `${num(m)}·10${String(k).split('').map((c) => SUP[c]).join('')}`;
}

// A number as people write it: plain between 0,001 and 1 000 000, else 10ⁿ.
export const nice = (v, sig = 3) => {
  const r = fix(Number(v.toPrecision(sig)));
  return Math.abs(r) >= 1e6 || (Math.abs(r) < 1e-3 && r !== 0) ? sci(r, sig) : num(r);
};

// Keypad writing of a number (what the student types): 1,8×10^5.
export function typed(v, sig = 3) {
  const r = fix(Number(v.toPrecision(sig)));
  if (Math.abs(r) >= 1e6 || (Math.abs(r) < 1e-3 && r !== 0)) {
    const e = Math.floor(Math.log10(Math.abs(r)));
    return `${String(fix(r / 10 ** e)).replace('.', ',')}×10^${e}`;
  }
  return String(r).replace('.', ',');
}

const UNIT_SHOW = { 'm^2': 'm²', 'm^3': 'm³', 'cm^2': 'cm²', 'cm^3': 'cm³', 'kg/m^3': 'kg/m³', 'm/s^2': 'm/s²', 'J/(kg·K)': 'J/(kg·K)' };
export const unitText = (u) => UNIT_SHOW[u] ?? String(u).replace(/\^2/g, '²').replace(/\^3/g, '³');
export const qty = (v, unit, sig = 3) => (unit === '1' ? nice(v, sig) : `${nice(v, sig)} ${unitText(unit)}`);

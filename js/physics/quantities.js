// Physical quantities: the symbol, its SI unit, its name, how it is drawn.
//
// A symbol is typed as one key (« E_p », « ΔT », « ρ »): the keypad draws
// it as E with p below (registerChunks in js/ui/keypad.js). In text, the
// part after « _ » is the subscript.

import { t } from '../i18n.js';
import { parseUnit } from './units.js';

// [symbol, SI unit, French name]
const ROWS = [
  ['E', 'J', 'énergie'],
  ['E_p', 'J', 'énergie potentielle'],
  ['E_c', 'J', 'énergie cinétique'],
  ['E_th', 'J', 'énergie thermique'],
  ['E_el', 'J', 'énergie électrique'],
  ['E_u', 'J', 'énergie utile'],
  ['E_f', 'J', 'énergie fournie'],
  ['P', 'W', 'puissance'],
  ['P_u', 'W', 'puissance utile'],
  ['P_f', 'W', 'puissance fournie'],
  ['F', 'N', 'force'],
  ['d', 'm', 'distance'],
  ['h', 'm', 'hauteur'],
  ['ℓ', 'm', 'largeur'],
  ['r', 'm', 'rayon'],
  ['x', 'm', 'allongement'],
  ['v', 'm/s', 'vitesse'],
  ['m', 'kg', 'masse'],
  ['g', 'N/kg', 'intensité de la pesanteur'],
  ['t', 's', 'durée'],
  ['c', 'J/(kg·K)', 'capacité thermique massique'],
  ['ΔT', 'K', 'écart de température'],
  ['T', 'K', 'température'],
  ['U', 'V', 'tension'],
  ['I', 'A', 'intensité du courant'],
  ['Q', 'C', 'charge'],
  ['L_f', 'J/kg', 'chaleur latente de fusion'],
  ['ρ', 'kg/m^3', 'masse volumique'],
  ['V', 'm^3', 'volume'],
  ['A', 'm^2', 'aire'],
  ['η', '1', 'rendement'],
  ['k', 'N/m', 'raideur'],
  ['N', '1', 'nombre'],
  ['D', 'm^3/s', 'débit'],
];

export const QUANTITIES = Object.fromEntries(ROWS.map(([sym, unit, name]) => [sym, { sym, unit, name, d: parseUnit(unit).d }]));

export const quantity = (sym) => QUANTITIES[sym];
export const nameOf = (sym) => (QUANTITIES[sym] ? t(QUANTITIES[sym].name) : sym);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// E_p → <i>E</i><sub>p</sub>, ΔT → Δ<i>T</i>, ρ → <i>ρ</i>.
export function symHtml(sym) {
  const [base, sub] = String(sym).split('_');
  const b = base.startsWith('Δ') ? `Δ<i class="m-var">${esc(base.slice(1))}</i>` : `<i class="m-var">${esc(base)}</i>`;
  return sub ? `${b}<sub class="m-sub">${esc(sub)}</sub>` : b;
}

// Plain text with Unicode subscripts where they exist (for notes and keys).
const SUBS = { a: 'ₐ', e: 'ₑ', h: 'ₕ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ', o: 'ₒ', p: 'ₚ', s: 'ₛ', t: 'ₜ', u: 'ᵤ', x: 'ₓ' };
export function symText(sym) {
  const [base, sub] = String(sym).split('_');
  if (!sub) return base;
  return [...sub].every((c) => SUBS[c]) ? base + [...sub].map((c) => SUBS[c]).join('') : `${base}_${sub}`;
}

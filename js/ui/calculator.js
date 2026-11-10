// A small calculator for the tables of module N (step U9, catalogue N
// « Items table » : levels 1 to 4 only, never in an exam): the student
// types an expression (3/2 − (9/4 − 2)/3, √2, exp(0,5), ln 3, sin 1) and
// sees its value, exact when it is a fraction.

import { h } from './dom.js';
import { tryParse } from '../cas/parse.js';
import { exactValue } from '../cas/normal.js';
import { evalFloat } from '../cas/numeric.js';

export function calcValue(text) {
  const n = tryParse(String(text).replace(/(\d)\s*[eE]\s*([+-]?\d+)/, '$1×10^($2)'));
  if (!n) return null;
  try {
    const q = exactValue(n);
    if (q) {
      const dec = q.valueOf();
      return q.d === 1 ? String(q.n) : `${q.n}/${q.d} ≈ ${String(Number(dec.toPrecision(10))).replace('.', ',')}`;
    }
  } catch { /* float */ }
  const x = evalFloat(n, {});
  if (!Number.isFinite(x)) return null;
  return String(Number(x.toPrecision(10))).replace('.', ',');
}

export function calculator() {
  const out = h('span.calc-out', '');
  const f = h('input.calc-in', { type: 'text', autocomplete: 'off', placeholder: 'Calculatrice : 3/2 − (9/4 − 2)/3', size: 28 });
  f.addEventListener('input', () => { out.textContent = f.value.trim() ? `= ${calcValue(f.value) ?? '?'}` : ''; });
  return h('div.calc', h('span.calc-label', '🧮'), f, out);
}

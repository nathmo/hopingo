// Small tools of module P, part b (step U7): exact numbers, texts for the
// judges and the screen, tables for prompts. Items: proba-b-cont.js
// (densities, quantiles, uniform and exponential laws, moments, families),
// proba-b-norm.js (normal law, quantiles, transformations), proba-b-joint.js
// (joint laws, linear combinations).

import { Q } from '../../math/rational.js';

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
// A Q for the judges ('15/28', '-3') and for the screen (15/28, −3, 0,35).
export const qt = (x) => { const r = q(x); return r.d === 1 ? String(r.n) : `${r.n}/${r.d}`; };
export const qs = (x) => { const r = q(x); return (r.toDecimal() ?? qt(r)).replace('-', '−'); };
// A Q written as a decimal for a line when it is finite (0,35), else a fraction.
export const ql = (x) => { const r = q(x); return r.toDecimal() ?? qt(r); };
// Decimal text of a float, for the screen (comma) and for the judges.
export const dx = (x, d = 3) => String(Number(Number(x).toFixed(d))).replace('.', ',').replace('-', '−');
export const dl = (x, d = 3) => String(Number(Number(x).toFixed(d))).replace('.', ',');
// A number of the screen, French: 1,5 ; −2.
export const fr = (x) => String(x).replace('.', ',').replace(/-/g, '−');
// Parenthesised if negative, for a line: (−2).
export const par = (t) => (String(t).startsWith('-') ? `(${t})` : String(t));

// A small HTML table: header row, then rows.
export function table(head, rows) {
  const cell = (c, th = false) => `<${th ? 'th' : 'td'} style="border:1px solid #ced4da;padding:2px 8px;text-align:center">${c}</${th ? 'th' : 'td'}>`;
  return `<table style="border-collapse:collapse;margin:6px 0">${[head.map((c) => cell(c, true)).join(''), ...rows.map((r) => r.map((c, i) => cell(c, i === 0)).join(''))].map((r) => `<tr>${r}</tr>`).join('')}</table>`;
}

// Fisher–Yates on a copy, with the item's rng.
export const shuffle = (rng, xs) => rng.shuffle(xs);

// Helpers of the counter-examples of module N (js/judges/n-examples.js):
// reading numbers, functions of x and matrices typed by the student.
import { tryParse } from '../cas/parse.js';
import { evalFloat, compileFloat } from '../cas/numeric.js';
import { exactValue } from '../cas/normal.js';

export function numberOf(text) {
  const n = tryParse(String(text ?? '').replace(/−/g, '-'));
  if (!n) return null;
  try { const q = exactValue(n); if (q) return q.valueOf(); } catch { /* float */ }
  const x = evalFloat(n, {});
  return Number.isFinite(x) ? x : null;
}

// A function of v typed by the student: (x) => number, or null.
export function fnOf(text, v = 'x') {
  const n = tryParse(String(text ?? '').replace(/−/g, '-'), { vars: [v] });
  if (!n) return null;
  const f = compileFloat(n);
  return (x) => f({ [v]: x });
}

// [[1, 2], [3, 4]] → [[1, 2], [3, 4]] (numbers), or null.
export function matrixOf(text) {
  const s = String(text ?? '').replace(/\s/g, '').replace(/−/g, '-');
  if (!/^\[\[.*\]\]$/.test(s)) return null;
  const rows = s.slice(2, -2).split('],[').map((r) => r.split(',').map(numberOf));
  if (rows.some((r) => r.some((x) => x === null)) || rows.some((r) => r.length !== rows[0].length)) return null;
  return rows;
}

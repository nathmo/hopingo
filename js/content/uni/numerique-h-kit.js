// Tools of module N, part h (step U9): problèmes aux limites, chaleur,
// transport et ondes, éléments finis, KKT. The expected values of the code
// tests are computed once by the Python interpreter itself (pyValue), so a
// test never disagrees with the reference program.

import { Interp, show } from '../../py/index.js';
import { PRELUDE_VEC, PRELUDE_MAT } from './numerique-kit.js';
import { Q } from '../../math/rational.js';
import { t } from '../../i18n.js';

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const qt = (x) => String(q(x));
export const fq = (x) => qt(x).replace(/-/g, '−');
export const R = (s) => String(s).replace(/-/g, '−');

// The value of expr after the reference program, as a Python literal
// (cached: the programs are long).
const CACHE = new Map();
export function pyValue(src, expr, { mat = false, setup = '' } = {}) {
  const key = `${src}\u0000${setup}\u0000${expr}`;
  if (!CACHE.has(key)) {
    const it = new Interp({ maxSteps: 50000000 });
    it.run(PRELUDE_VEC);
    if (mat) it.run(PRELUDE_MAT);
    it.run(src);
    if (setup) it.run(setup);
    const v = it.evalSource(expr);
    CACHE.set(key, { text: show(v), v });
  }
  return CACHE.get(key);
}
export const pyNum = (src, expr, opts) => {
  const v = pyValue(src, expr, opts).v;
  return typeof v === 'bigint' ? Number(v) : v;
};

// %e as the exam programs print it: 2.032035e-02.
export const eText = (x, d = 6) => {
  if (x === 0) return '0';
  const [m, e] = Number(x).toExponential(d).split('e');
  const n = Number(e);
  return `${m}e${n < 0 ? '-' : '+'}${String(Math.abs(n)).padStart(2, '0')}`;
};

export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];

// A menu of the « choose the action » mode for one part.
export function menuOf(items, active) {
  return items.map((o) => ({ id: o.id, label: o.label, valid: o.id === active, why: o.id === active ? undefined : o.why || t('Pas maintenant : ce n\'est pas l\'étape suivante.') }));
}

// Four distinct options, the right one first (the item shuffles them).
export function opts4(right, wrongs, fillers = []) {
  const out = [{ html: right, correct: true }];
  for (const w of [...wrongs, ...fillers.map((html) => ({ html }))]) {
    if (out.length >= 4) break;
    if (!w || out.some((x) => x.html === w.html)) continue;
    out.push({ html: w.html, correct: false, ...(w.rule ? { rule: w.rule } : {}) });
  }
  return out;
}

// A tridiagonal matrix as the grid's text: [[2,-1,0],[-1,2,-1],[0,-1,2]]·k.
export function tridiagText(n, sub, diag, sup) {
  const rows = [];
  for (let i = 0; i < n; i++) {
    const r = [];
    for (let j = 0; j < n; j++) r.push(j === i ? qt(diag) : j === i - 1 ? qt(sub) : j === i + 1 ? qt(sup) : '0');
    rows.push(`[${r.join(',')}]`);
  }
  return `[${rows.join(',')}]`;
}
export const vecText = (v) => `(${v.map(qt).join(' ; ')})`;
export const vecR = (v) => `(${v.map(fq).join(' ; ')})`;

// A program followed by a question: the item offers the question's baits too.
export function withThen(item) {
  if (item.then?.baits?.length) item.baits = [...new Set([...item.baits, ...item.then.baits])];
  return item;
}

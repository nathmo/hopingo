// Traps of module N, part b (see js/cas/rules/n.js).
// DEFS: {id: {name, judges, transform?, wrongValues?, explain?, check, code?}}.
// Traps of this part: n_order_simple_ratio, n_order_roundoff_rows, n_newton_inverted, n_newton_sign, n_newton_always2, n_mult_ratio, n_newton_sys_sign, n_secant_update.
//
// A code trap lists in `code` the wrong text of a hole of a program
// ({skill, text, levels}): tests/n-engine.test.js checks that
// js/judges/code.js names it. Its `check` is a bait (the items of its skill
// offer it as an option or a decision).
// What the generators (js/content/uni/numerique-b-*.js) put in the judge's cfg:
//   value: cfg.mult = {r: '2/3'}   the ratio 1 − 1/m read on a table; the line « m = »
//   mat:   cfg.nsys = {x0, delta}  (vectors, texts) the line « x⁽¹⁾ = » of Newton for systems
// n_secant_update is also named by the table judge (js/judges/iter-num.js).

import { parse } from '../parse.js';
import { lit } from '../ast.js';
import { Q } from '../../math/rational.js';
import { buildLine } from '../../judges/matcommon.js';
import { t } from '../../i18n.js';

const qOf = (s) => { const m = /^(-?\d+)(?:\/(\d+))?$/.exec(String(s).replace(/\s|−/g, (c) => (c === '−' ? '-' : ''))); return m ? new Q(Number(m[1]), m[2] ? Number(m[2]) : 1) : null; };
const vecOf = (s) => String(s).replace(/[()\s]/g, '').split(';').map(qOf);

export const DEFS = {
  n_order_simple_ratio: {
    name: t('Ordre 1 conclu d\'un rapport δₖ₊₁/δₖ qui tend vers 0'),
    judges: [],
    check: { bait: { skill: 'n-order-read', level: 1 } },
  },
  n_order_roundoff_rows: {
    name: t('Ordre lu sur une ligne dominée par l\'arrondi'),
    judges: [],
    check: { bait: { skill: 'n-order-read', level: 3 } },
  },
  n_newton_inverted: {
    name: t('Newton : f′/f au lieu de f/f′'),
    judges: [],
    code: { skill: 'n-newton', text: 'df(x) / f(x)', levels: [5] },
    check: { bait: { skill: 'n-newton', level: 3 } },
  },
  n_newton_sign: {
    name: t('Newton : x + f/f′ au lieu de x − f/f′'),
    judges: [],
    code: { skill: 'n-newton', text: '-f(x) / df(x)', levels: [5] },
    check: { bait: { skill: 'n-newton', level: 3 } },
  },
  n_newton_always2: {
    name: t('« Newton est toujours d\'ordre 2 »'),
    judges: [],
    check: { bait: { skill: 'n-newton-multiple', level: 2 } },
  },
  n_mult_ratio: {
    name: t('Multiplicité lue comme 1/rapport'),
    judges: ['value'],
    transform(prev, ctx) {
      const r = qOf(ctx?.cfg?.mult?.r);
      if (!r || r.n === 0 || r.eq(1)) return [];
      const wrong = r.inv();
      const m = new Q(1).div(new Q(1).sub(r));
      if (wrong.eq(m)) return [];
      return [{ node: lit(wrong), ctx: { m: String(m), r: String(r).replace('-', '−') } }];
    },
    check: { judge: { kind: 'value', expect: '3', form: 'any', mult: { r: '2/3' } }, prev: 'm', line: '3/2' },
  },
  n_newton_sys_sign: {
    name: t('Newton pour un système : x⁽⁰⁾ + δ au lieu de x⁽⁰⁾ − δ'),
    judges: ['mat'],
    code: { skill: 'n-newton-system', text: 'x[0] + delta[0]', levels: [5] },
    transform(prev, ctx) {
      const s = ctx?.cfg?.nsys;
      if (!s) return [];
      const x0 = vecOf(s.x0);
      const d = vecOf(s.delta);
      if (x0.some((x) => !x) || d.some((x) => !x) || x0.length !== d.length) return [];
      const plus = x0.map((x, i) => x.add(d[i]));
      const text = `(${plus.map(String).join(' ; ')})`;
      let node = null;
      try { node = buildLine({}, text); } catch { node = null; }
      return node ? [{ node, ctx: { x1: `(${x0.map((x, i) => String(x.sub(d[i]))).join(' ; ')})`.replace(/-/g, '−') } }] : [];
    },
    check: { judge: { kind: 'mat', expect: '(5/4 ; 9/4)', nsys: { x0: '(1 ; 1)', delta: '(-1/4 ; -5/4)' } }, prev: 'x_1', line: '(3/4 ; -1/4)' },
  },
  n_secant_update: {
    name: t('Sécante : le point de départ gardé au lieu des deux derniers'),
    judges: [],
    code: { skill: 'n-secant', text: 'x0', levels: [5] },
    check: { bait: { skill: 'n-secant', level: 3 } },
  },
};

export { parse };

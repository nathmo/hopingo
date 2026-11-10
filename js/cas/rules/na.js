// Traps of module N, part a (see js/cas/rules/n.js).
// DEFS: {id: {name, judges, transform?, explain?, check, code?}}.
// Traps of this part: n_rel_by_approx, n_abs_signed, n_cancel_ignored,
// n_eps_absolute, n_bisect_no_minus1, n_bisect_log10, n_bisect_wrong_half,
// n_fp_f_vs_phi, n_fp_phi_at_x0, n_fp_abs_forgot, n_fp_order_count.
//
// The value traps read fields the generators (js/content/uni/numerique-a-*.js)
// put in the judge's configuration:
//   abserr {x, xt}   a line « e_abs = … » (exact texts of x and x̃)
//   relerr {x, xt}   a line « e_rel = … »
//   cancel 'text'    a part computing the stable form at p digits
//                    (value {arith: 'fp'}): the naive form's value
//   bisect {L, tol}  a line « k_min = … »
//   order {p}        a line « p = … » (order of a fixed point)
// The decisions, menus and options of the items name the others.

import { parse } from '../parse.js';
import { lit } from '../ast.js';
import { exactValue } from '../normal.js';
import { Q } from '../../math/rational.js';

const q = (t) => exactValue(parse(String(t)));
const absQ = (x) => (x.n < 0 ? x.neg() : x);
const show = (x) => String(x).replace('-', '−');
// META rows whose catalogue cells hold « | » (absolute values) are cut
// wrongly by the table reader: the example and the explanation are given
// again here.
const fill = (text, ctx = {}) => text.replace(/\{([^{}]*)\}/g, (_, k) => (ctx[k] !== undefined && ctx[k] !== null ? String(ctx[k]) : '…'));

export const DEFS = {
  n_rel_by_approx: {
    name: 'Erreur relative divisée par l\'approximation',
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.relerr;
      if (!s) return [];
      const x = q(s.x);
      const xt = q(s.xt);
      if (!x || !xt || xt.n === 0) return [];
      return [{ node: lit(absQ(xt.sub(x)).div(absQ(xt))), ctx: { 'x̃': show(s.xt), x: show(s.x) } }];
    },
    code: { skill: 'n-err-abs-rel', text: 'ea / abs(xt)', levels: [1, 4] },
    check: { judge: { kind: 'value', expect: '1/2000', form: 'irreducible', relerr: { x: '2/3', xt: '667/1000' } }, prev: 'E_r', line: '(1/3000)/(667/1000)' },
  },
  n_abs_signed: {
    name: 'Erreur avec son signe',
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.abserr || ctx?.cfg?.relerr;
      if (!s) return [];
      const x = q(s.x);
      const xt = q(s.xt);
      if (!x || !xt) return [];
      const e = x.sub(xt);
      const c = { e: show(e) };
      if (ctx.cfg.abserr) return [{ node: lit(e), ctx: c }, { node: lit(e.neg()), ctx: { e: show(e.neg()) } }];
      return [{ node: lit(e.div(x)), ctx: c }, { node: lit(e.neg().div(x)), ctx: c }];
    },
    code: { skill: 'n-err-abs-rel', text: 'x - xt', levels: [4] },
    check: { judge: { kind: 'value', expect: '1/3000', form: 'irreducible', abserr: { x: '2/3', xt: '667/1000' } }, prev: 'E', line: '-1/3000' },
  },
  n_cancel_ignored: {
    name: 'Annulation ignorée',
    judges: ['value'],
    transform(prev, ctx) {
      const t = ctx?.cfg?.cancel;
      if (!t) return [];
      return [{ node: parse(String(t)), ctx: {} }];
    },
    code: { skill: 'n-err-float', text: 'math.sqrt(x + 1) - math.sqrt(x)', levels: [5] },
    check: { judge: { kind: 'value', arith: 'fp', digits: 4, cancel: '√1001-√1000' }, prev: '1/(√1001+√1000)', line: '0,02' },
  },
  n_eps_absolute: {
    name: 'ε machine pris comme une erreur absolue',
    judges: [],
    check: { bait: { skill: 'n-err-float', exam: 'tf' } },
  },
  n_bisect_no_minus1: {
    name: 'Bissection : le « − 1 » oublié',
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.bisect;
      if (!s) return [];
      const y = Math.log2(q(s.L).valueOf() / q(s.tol).valueOf());
      return [{ node: lit(new Q(Math.floor(y) + 1)), ctx: {} }];
    },
    code: { skill: 'n-bisection', text: 'math.log((b - a) / tol) / math.log(2) + 1', levels: [5] },
    check: { judge: { kind: 'value', expect: '9', form: 'any', bisect: { L: '1', tol: '10^(-3)' } }, prev: 'k_min', line: '10' },
  },
  n_bisect_log10: {
    name: 'Bissection : log₁₀ au lieu de log₂',
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.bisect;
      if (!s) return [];
      const y = Math.log10(q(s.L).valueOf() / q(s.tol).valueOf());
      return [{ node: lit(new Q(Math.floor(y + 1e-9))), ctx: {} }, { node: lit(new Q(Math.floor(y + 1e-9) - 1)), ctx: {} }];
    },
    code: { skill: 'n-bisection', text: 'math.log10((b - a) / tol)', levels: [5] },
    check: { judge: { kind: 'value', expect: '9', form: 'any', bisect: { L: '1', tol: '10^(-3)' } }, prev: 'k_min', line: '3' },
  },
  n_bisect_wrong_half: {
    name: 'Bissection : la mauvaise moitié',
    judges: [],
    check: { bait: { skill: 'n-bisection', level: 3 } },
  },
  n_fp_f_vs_phi: {
    name: 'Point fixe : condition lue sur f au lieu de φ',
    judges: [],
    example: ['|f′(α)| < 1', '|φ′(α)| < 1'],
    explain: (ctx) => fill("La condition porte sur la fonction d'itération φ, pas sur f. Ici φ′({α}) = {φ′}.", ctx),
    check: { bait: { skill: 'n-fp-converge', level: 1 } },
  },
  n_fp_phi_at_x0: {
    name: 'Point fixe : φ′ prise en x⁽⁰⁾ au lieu de α',
    judges: [],
    check: { bait: { skill: 'n-fp-converge', level: 1 } },
  },
  n_fp_abs_forgot: {
    name: 'Point fixe : |φ′(α)| < 1 sans la valeur absolue',
    judges: [],
    example: ['φ′(α) = −3 < 1, donc converge', '|−3| > 1'],
    explain: (ctx) => fill("φ′({α}) = {φ′} : il faut |φ′(α)| < 1. Une pente très négative fait osciller en s'écartant.", ctx),
    check: { bait: { skill: 'n-fp-converge', exam: 'mcq' } },
  },
  n_fp_order_count: {
    name: 'Ordre d\'un point fixe mal compté',
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.order;
      if (!s) return [];
      return [s.p - 1, s.p + 1].filter((x) => x >= 1).map((x) => ({ node: lit(new Q(x)), ctx: { p: s.p } }));
    },
    check: { judge: { kind: 'value', expect: '2', form: 'any', order: { p: 2 } }, prev: 'p', line: '3' },
  },
};

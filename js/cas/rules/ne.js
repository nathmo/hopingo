// Traps of module N, part e (quadrature, error statements, Richardson; see
// js/cas/rules/n.js). DEFS: {id: {name, judges, transform?, check, code?}}.
// Traps of this part: n_simpson_h3_h6, n_trap_weights, n_map_jacobian,
// n_exactness_stop_early, n_exactness_order, n_order_ratio_is_p,
// n_proof_sum_count, n_regularity_ignored, n_more_regularity_more_order,
// n_richardson_wrong_p, n_richardson_swap.
//
// The value traps read the wrong values the generators
// (js/content/uni/numerique-e-*.js) put in the judge's configuration:
//   etraps   {ruleId: [texts of the wrong values]}
//   etrapCtx {ruleId: ctx} (the {…} of the catalogue's explanation)
// The others are options of multiple choices, decisions, decoy blocks or
// wrong holes of programs (`code`: the hole's text, checked by
// tests/n-engine.test.js); their check is a bait.

import { parse } from '../parse.js';
import { t } from '../../i18n.js';

const valueTrap = (id, name, check, extra = {}) => ({
  name,
  judges: ['value'],
  transform(prev, ctx) {
    const vals = ctx?.cfg?.etraps?.[id];
    if (!vals) return [];
    const c = ctx.cfg.etrapCtx?.[id] || {};
    return vals.map((v) => ({ node: parse(String(v)), ctx: c }));
  },
  check,
  ...extra,
});
const vcheck = (id, expect, wrong) => ({ judge: { kind: 'value', expect, form: 'any', etraps: { [id]: [wrong] } }, prev: 'Q', line: wrong });

export const DEFS = {
  n_simpson_h3_h6: valueTrap('n_simpson_h3_h6', t('Simpson : h/3 au lieu de h/6'), vcheck('n_simpson_h3_h6', '4', '8'), {
    code: { skill: 'n-quad-composite', text: 'h / 3 * (f(x0) + 4 * f(c) + f(x1))', levels: [5] },
  }),
  n_trap_weights: valueTrap('n_trap_weights', t('Trapèze : poids h aux extrémités'), vcheck('n_trap_weights', '5', '9'), {
    code: { skill: 'n-quad-composite', text: 'f(a) + f(b)', levels: [5] },
  }),
  n_map_jacobian: {
    name: t('Changement de variable sans le facteur h/2'),
    judges: ['code'],
    code: { skill: 'n-quad-exactness', text: 'h', levels: [5] },
    check: { bait: { skill: 'n-quad-exactness', level: 5 } },
  },
  n_exactness_stop_early: valueTrap('n_exactness_stop_early', t('Degré d\'exactitude : arrêt au dernier monôme testé'), vcheck('n_exactness_stop_early', '3', '2')),
  n_exactness_order: valueTrap('n_exactness_order', t('Ordre = degré d\'exactitude (sans le + 1)'), vcheck('n_exactness_order', '4', '3')),
  n_order_ratio_is_p: valueTrap('n_order_ratio_is_p', t('Ordre lu comme le rapport des erreurs'), vcheck('n_order_ratio_is_p', '2', '4')),
  n_proof_sum_count: {
    name: t('Constante laissée avec N'),
    judges: [],
    check: { bait: { skill: 'n-quad-proof', level: 5 } },
  },
  n_regularity_ignored: {
    name: t('Ordre théorique sans la régularité de f'),
    judges: [],
    check: { bait: { skill: 'n-error-statements', level: 3 } },
  },
  n_more_regularity_more_order: {
    name: t('Plus de régularité, plus d\'ordre'),
    judges: [],
    check: { bait: { skill: 'n-error-statements', level: 3 } },
  },
  n_richardson_wrong_p: valueTrap('n_richardson_wrong_p', t('Richardson avec le mauvais ordre p'), vcheck('n_richardson_wrong_p', '1/3', '3/8')),
  n_richardson_swap: valueTrap('n_richardson_swap', t('Richardson : Q_h et Q₂ₕ échangés'), vcheck('n_richardson_swap', '1/3', '1/4')),
};

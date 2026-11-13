// Traps of module N, part h (see js/cas/rules/n.js).
// DEFS: {id: {name, judges, transform?, wrongValues?, explain?, check, code?}}.
// Traps of this part: n_bvp_bc_rhs, n_bvp_h2_missing, n_spd_semidefinite, n_truncation_constant, n_stability_skipped, n_jacobian_vs_F, n_cholesky_tridiag_sq, n_heat_tau_h, n_heat_2tau, n_heat_ic_tau, n_heat_order_h_tau, n_cfl_direction, n_wave_lambda, n_weak_space_bc, n_hat_derivative, n_weak_sign, n_kkt_sign, n_kkt_complementarity, n_kkt_multiplier_sign.
//
// Value and line traps read the wrong lines the generators
// (js/content/uni/numerique-h-*.js) put in the judge's configuration:
//   cfg.ntraps = {trapId: [text…] | [{text, ctx}…]}
// A candidate is that text, read with the judge's variables. The other
// traps are options of multiple choices and decisions, decoy blocks, or
// wrong texts of a hole of a program (`code`: tests/n-engine.test.js
// checks that js/judges/code.js names them).

import { parse } from '../parse.js';
import { t } from '../../i18n.js';

function fromCfg(id) {
  return (prev, ctx) => {
    const list = ctx?.cfg?.ntraps?.[id];
    if (!list) return [];
    const vars = ctx.cfg.vars || [];
    return list.map((x) => {
      const text = typeof x === 'string' ? x : x.text;
      return { node: parse(String(text), { vars }), ctx: (typeof x === 'string' ? null : x.ctx) || ctx.cfg.nctx || {} };
    });
  };
}
const valueTrap = (id, name, extra = {}) => ({ name, judges: ['value'], transform: fromCfg(id), ...extra });

export const DEFS = {
  n_bvp_bc_rhs: valueTrap('n_bvp_bc_rhs', t('Conditions aux bords oubliées dans le second membre'), {
    judges: ['value', 'code'],
    code: { skill: 'n-bvp-fd', text: 'rhs[0]', levels: [5] },
    check: { judge: { kind: 'value', expect: '33', form: 'irreducible', ntraps: { n_bvp_bc_rhs: ['1'] }, nctx: { α: '2' } }, prev: '1+2/(1/4)^2', line: '1' },
  }),
  n_bvp_h2_missing: valueTrap('n_bvp_h2_missing', t('Facteur 1/h² oublié dans la matrice'), {
    judges: ['value', 'code'],
    code: { skill: 'n-bvp-fd', text: '2', levels: [5] },
    check: { judge: { kind: 'value', expect: '32', form: 'irreducible', ntraps: { n_bvp_h2_missing: ['2'] }, nctx: { h2: '1/16' } }, prev: '2/(1/4)^2', line: '2' },
  }),
  n_spd_semidefinite: {
    name: t('xᵀAx ≥ 0 pris pour « définie positive »'),
    judges: [],
    check: { bait: { skill: 'n-bvp-fd', level: 4 } },
  },
  n_truncation_constant: valueTrap('n_truncation_constant', t('Constante de troncature h²/24 ou h²/6 au lieu de h²/12'), {
    check: { judge: { kind: 'value', expect: '1/12', form: 'irreducible', ntraps: { n_truncation_constant: ['1/24', '1/6'] } }, prev: '2×(1/24)', line: '1/24' },
  }),
  n_stability_skipped: {
    name: t('Convergence tirée de la consistance seule'),
    judges: [],
    check: { bait: { skill: 'n-bvp-convergence', level: 3 } },
  },
  n_jacobian_vs_F: {
    name: t('Terme de F mis dans la jacobienne (ou l\'inverse)'),
    judges: ['code'],
    code: { skill: 'n-bvp-newton', text: 'x[i] ** 3 - 1', levels: [1, 3, 5] },
    check: { bait: { skill: 'n-bvp-newton', level: 1 } },
  },
  n_cholesky_tridiag_sq: {
    name: t('Cholesky tridiagonal : mauvais carré retiré'),
    judges: ['code'],
    code: { skill: 'n-bvp-newton', text: 'a[i] * a[i]', levels: [4, 5] },
    check: { bait: { skill: 'n-bvp-newton', level: 5 } },
  },
  n_heat_tau_h: {
    name: t('Chaleur : τ au lieu de τ/h²'),
    judges: ['code', 'value'],
    transform: fromCfg('n_heat_tau_h'),
    code: { skill: 'n-heat-implicit', text: '2 * tau', levels: [1, 2, 4] },
    check: { bait: { skill: 'n-heat-implicit', level: 2 } },
  },
  n_heat_2tau: {
    name: t('Chaleur : facteur 2 oublié sur la diagonale'),
    judges: ['code', 'value'],
    transform: fromCfg('n_heat_2tau'),
    code: { skill: 'n-heat-implicit', text: 'tau / (h * h)', levels: [1, 2, 4] },
    check: { bait: { skill: 'n-heat-implicit', level: 2 } },
  },
  n_heat_ic_tau: {
    name: t('Chaleur : condition initiale multipliée par τ'),
    judges: ['code'],
    code: { skill: 'n-heat-implicit', text: 'tau * math.sin(math.pi * (i + 1) * h)', levels: [1, 4, 5] },
    check: { bait: { skill: 'n-heat-implicit', level: 1 } },
  },
  n_heat_order_h_tau: {
    name: t('Ordre lu O(h + τ) au lieu de O(h² + τ)'),
    judges: [],
    check: { bait: { skill: 'n-heat-implicit', level: 4 } },
  },
  n_cfl_direction: {
    name: t('Transport : décentrement du mauvais côté'),
    judges: ['code'],
    code: { skill: 'n-pde-cfl', text: 'uold[i] * (1 - tau / h) + tau / h * uold[i - 1]', levels: [1, 5] },
    check: { bait: { skill: 'n-pde-cfl', level: 3 } },
  },
  n_wave_lambda: valueTrap('n_wave_lambda', t('Ondes : λ = τ/h au lieu de τ²/h²'), {
    check: { judge: { kind: 'value', expect: '1/4', form: 'irreducible', ntraps: { n_wave_lambda: ['1/2', '5', '1/20'] } }, prev: '(1/20)^2/(1/10)^2', line: '1/2' },
  }),
  n_weak_space_bc: {
    name: t('Espace V de la forme faible : mauvaises conditions'),
    judges: [],
    check: { bait: { skill: 'n-fem-hat', level: 1 } },
  },
  n_hat_derivative: valueTrap('n_hat_derivative', t('Fonction chapeau : pente ou ∫(φ′)² fausse'), {
    check: { judge: { kind: 'value', expect: '4', form: 'irreducible', ntraps: { n_hat_derivative: ['2', '8'] } }, prev: '2^2×(1/2)+2^2×(1/2)', line: '2' },
  }),
  n_weak_sign: {
    name: t('Forme faible : signe de l\'intégration par parties'),
    judges: [],
    check: { bait: { skill: 'n-fem-hat', level: 3 } },
  },
  n_kkt_sign: {
    name: t('KKT : signes des multiplicateurs inversés'),
    judges: ['equiv'],
    transform: fromCfg('n_kkt_sign'),
    check: { judge: { kind: 'equiv', vars: ['x', 'λ'], domain: { x: [-3, 3], λ: [0, 3] }, target: 'no-prime', ntraps: { n_kkt_sign: ['x-3-λ'] } }, prev: 'd(1/2×(x-3)^2-λ×(1-x), x)', line: 'x-3-λ' },
  },
  n_kkt_complementarity: {
    name: t('KKT : complémentarité avec la mauvaise contrainte'),
    judges: [],
    check: { bait: { skill: 'n-opt-kkt', level: 2 } },
  },
  n_kkt_multiplier_sign: {
    name: t('KKT : multiplicateur négatif accepté'),
    judges: [],
    check: { bait: { skill: 'n-opt-kkt', level: 3 } },
  },
};

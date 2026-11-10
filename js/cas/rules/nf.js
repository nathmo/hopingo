// Traps of module N, part f (see js/cas/rules/n.js).
// DEFS: {id: {name, judges, transform?, wrongValues?, explain?, check, code?}}.
// Traps of this part: n_lu_zero_pivot, n_lu_det_permutation, n_cost_inverse, n_thomas_index_shift, n_thomas_lu_roles, n_thomas_forget_last, n_jacobi_uses_new, n_diag_dominance, n_residual_is_error, n_norm_vs_radius, n_gradient_step_bound, n_gradient_sign, n_optimal_step_inverted.
//
// Fields read in the judge's configuration (js/content/uni/numerique-f-lu.js):
//   ludet {prodU}   a line « det A = … » after a row exchange: Π uᵢᵢ is the
//                   value without the sign of det P.
// The table traps (n_jacobi_uses_new, n_gradient_sign,
// n_optimal_step_inverted) are also named by js/judges/iter-num.js; the
// code traps (n_thomas_*) by js/judges/code.js from the holes' traps
// (part h reuses them for the programs of the heat equation).

import { parse } from '../parse.js';

export const DEFS = {
  n_lu_zero_pivot: {
    name: 'Pivot nul : « A est singulière »',
    judges: [],
    check: { bait: { skill: 'n-lu', level: 3 } },
  },
  n_lu_det_permutation: {
    name: 'det = Π uᵢᵢ sans le signe de la permutation',
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.ludet;
      if (!s) return [];
      return [{ node: parse(String(s.prodU)), ctx: {} }];
    },
    check: { judge: { kind: 'value', expect: '-18', form: 'irreducible', ludet: { prodU: '18' } }, prev: 'D', line: '18' },
  },
  n_cost_inverse: {
    name: 'inv(A)*b « plus rapide » que A\b',
    judges: [],
    check: { bait: { skill: 'n-lu', exam: 'mcq' } },
  },
  n_thomas_index_shift: {
    name: 'Thomas : indices décalés',
    judges: ['code'],
    code: { skill: 'n-thomas', text: 'd[i] * c[i]', levels: [1, 4, 5] },
    check: { bait: { skill: 'n-thomas', level: 1 } },
  },
  n_thomas_lu_roles: {
    name: 'Thomas : c et d échangés (rôles de L et U)',
    judges: ['code'],
    code: { skill: 'n-thomas', text: 'c[i] * b[i]', levels: [1, 4, 5] },
    check: { bait: { skill: 'n-thomas', level: 1 } },
  },
  n_thomas_forget_last: {
    name: 'Thomas : dernière ligne non mise à jour',
    judges: ['code'],
    code: { skill: 'n-thomas', text: '0', levels: [4, 5] },
    check: { bait: { skill: 'n-thomas', level: 4 } },
  },
  n_jacobi_uses_new: {
    name: 'Jacobi avec les valeurs déjà mises à jour',
    judges: ['iter'],
    check: { bait: { skill: 'n-iter-jacobi-gs', level: 3 } },
  },
  n_diag_dominance: {
    name: 'Diagonale dominante au sens large',
    judges: [],
    // The catalogue's row holds « |aᵢᵢ| » and was cut at the « | » (rules/n.js).
    example: ['|aᵢᵢ| ≥ Σ|aᵢⱼ|, ou par colonnes', '|aᵢᵢ| > Σⱼ≠ᵢ |aᵢⱼ| par lignes'],
    explain: (ctx = {}) => `Il faut |aᵢᵢ| > Σ<sub>j≠i</sub> |aᵢⱼ| <b>strictement</b>, ligne par ligne${ctx.i !== undefined ? ` : ligne ${ctx.i}, ${ctx.aii} contre ${ctx.s}` : ''}. Avec une égalité, le critère ne permet pas de conclure.`,
    check: { bait: { skill: 'n-iter-jacobi-gs', exam: 'tf' } },
  },
  n_residual_is_error: {
    name: 'Petit résidu ⇒ petite erreur',
    judges: [],
    check: { bait: { skill: 'n-iter-convergence', exam: 'tf' } },
  },
  n_norm_vs_radius: {
    name: '‖B‖ ≥ 1 ⇒ divergence',
    judges: [],
    check: { bait: { skill: 'n-iter-convergence', exam: 'tf' } },
  },
  n_gradient_step_bound: {
    name: 'Pas fixe : α < 2/λ_min au lieu de 2/λ_max',
    judges: [],
    // The catalogue's explanation holds « |1 − αλ| » and was cut (rules/n.js).
    explain: (ctx = {}) => `Le facteur |1 − αλ| doit être < 1 pour <b>toutes</b> les valeurs propres ; la plus grande${ctx.lmax ? `, ${ctx.lmax},` : ''} impose α < 2/λ_max.`,
    check: { bait: { skill: 'n-gradient-spd', exam: 'mcq' } },
  },
  n_gradient_sign: {
    name: 'Gradient : x − αr au lieu de x + αr',
    judges: ['iter', 'code'],
    code: { skill: 'n-gradient-spd', text: 'x[i] - alpha * r[i]', levels: [5] },
    check: { bait: { skill: 'n-gradient-spd', level: 3 } },
  },
  n_optimal_step_inverted: {
    name: 'Pas optimal inversé : rᵀAr/rᵀr',
    judges: ['iter', 'code'],
    code: { skill: 'n-gradient-spd', text: 'dot(r, Ar) / dot(r, r)', levels: [5] },
    check: { bait: { skill: 'n-gradient-spd', level: 3 } },
  },
};

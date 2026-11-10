// Traps of module N, part c (see js/cas/rules/n.js).
// DEFS: {id: {name, judges, transform?, wrongValues?, explain?, check, code?}}.
// Traps of this part: n_lagrange_no_denominator, n_vandermonde_order, n_runge_more_nodes, n_interp_error_factorial, n_divdiff_denominator, n_cheb_no_mapping, n_p1_bound, n_spline_natural_first, n_spline_count, n_ls_interp, n_ls_aat, n_ls_index_swap.
//
// The value traps read fields the generators (js/content/uni/numerique-c-*.js)
// put in the judge's configuration:
//   lagrange {nodenom, v}   a line « φᵢ(x*) = … » : the value without the
//                           denominator Π(xᵢ − xⱼ), and that denominator
//   vander   {coeffs, k, x0, y0}  a line « a_k = … » : the coefficient read
//                           in the reverse order (Matlab's polyfit)
//   interr   {wrong, n1, fact}    a line « borne = … » : the bound written
//                           with f⁽ⁿ⁾, 4n and hⁿ (one order too low)
//   cheb     {t}            a line « xᵢ = … » : the node tᵢ not transported
//   p1       {tol, M}       a line « h = … » : h from h·M/8 ≤ tol or
//                           h²·M/2 ≤ tol
// Code traps list in `code` the wrong text of a hole (tests/n-engine.test.js).
// n_divdiff_denominator is also named by the table judge (phi 'divdiff').
// The catalogue's cells of n_interp_error_factorial and n_p1_bound hold a
// « | » (max|f‴|), which cut them in META: their example and explanation
// are given here.

import { parse } from '../parse.js';

const fill = (text, ctx = {}) => text.replace(/\{([^{}]*)\}/g, (_, k) => (ctx[k] !== undefined && ctx[k] !== null ? String(ctx[k]) : '…'));
const nodeOf = (t) => parse(String(t).replace(/−/g, '-'));
const show = (t) => String(t).replace(/-/g, '−').replace(/\./g, ',');

export const DEFS = {
  n_lagrange_no_denominator: {
    name: 'Lagrange : φᵢ sans son dénominateur',
    judges: ['value', 'code'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.lagrange;
      if (!s) return [];
      return [{ node: nodeOf(s.nodenom), ctx: { v: show(s.v) } }];
    },
    code: { skill: 'n-interp-lagrange', text: 'x - xs[j]' },
    check: { judge: { kind: 'value', expect: '3/4', form: 'irreducible', lagrange: { nodenom: '-3/4', v: '-1' } }, prev: 'φ_1', line: '-3/4' },
  },
  n_vandermonde_order: {
    name: 'Coefficients lus dans l\'ordre inverse',
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.vander;
      if (!s) return [];
      const n = s.coeffs.length;
      const w = s.coeffs[n - 1 - s.k];
      if (w === s.coeffs[s.k]) return [];
      return [{ node: nodeOf(w), ctx: { x0: show(s.x0), y0: show(s.y0) } }];
    },
    check: { judge: { kind: 'value', expect: '-9', form: 'irreducible', vander: { coeffs: ['12', '15', '-9'], k: 2, x0: '1', y0: '18' } }, prev: 'a_2', line: '12' },
  },
  n_runge_more_nodes: {
    name: 'Plus de nœuds équirépartis, toujours mieux',
    judges: [],
    check: { bait: { skill: 'n-interp-error', exam: 'tf' } },
  },
  n_interp_error_factorial: {
    name: 'Erreur d\'interpolation : f⁽ⁿ⁾ au lieu de f⁽ⁿ⁺¹⁾',
    judges: ['value'],
    example: ['max|f″|/(4·2)·h² pour 3 nœuds', 'max|f‴|/(4·3)·h³'],
    explain: (ctx = {}) => fill('Pour n + 1 = {n1} nœuds, c\'est f⁽ⁿ⁺¹⁾ et (n + 1)! = {fact} qui interviennent : la borne est max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.', ctx),
    transform(prev, ctx) {
      const s = ctx?.cfg?.interr;
      if (!s) return [];
      return [{ node: nodeOf(s.wrong), ctx: { n1: s.n1, fact: s.fact } }];
    },
    check: { judge: { kind: 'value', form: 'closed', expect: 'π^3/96', interr: { wrong: 'π^2/32', n1: 3, fact: 6 } }, prev: 'E', line: 'π^2/32' },
  },
  n_divdiff_denominator: {
    name: 'Différence divisée : mauvais dénominateur',
    judges: ['code'],
    code: { skill: 'n-divided-diff', text: '(c[i] - c[i - 1]) / (xs[i] - xs[i - 1])' },
    check: { bait: { skill: 'n-divided-diff', exam: 'mcq' } },
  },
  n_cheb_no_mapping: {
    name: 'Nœuds de Tchebychev non transportés',
    judges: ['value', 'code'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.cheb;
      if (!s) return [];
      return [{ node: nodeOf(s.t), ctx: {} }];
    },
    code: { skill: 'n-chebyshev', text: 't' },
    check: { judge: { kind: 'value', expect: '2+√3', form: 'exact', cheb: { t: '√3/2' } }, prev: 'x_0', line: '√3/2' },
  },
  n_p1_bound: {
    name: 'Mauvaise borne de l\'interpolation linéaire',
    judges: ['value'],
    example: ['h·max|f″|/8 ≤ tol, ou h²·max|f″|/2', 'h²·max|f″|/8 ≤ tol'],
    explain: (ctx = {}) => fill('Pour l\'interpolation linéaire par morceaux : erreur ≤ h²/8·max|f″|, avec h au carré et le facteur 1/8. Ici h²/8·max|f″| ≤ {tol} donne h = {v}.', ctx),
    transform(prev, ctx) {
      const s = ctx?.cfg?.p1;
      if (!s) return [];
      const tol = Number(s.tol);
      const M = Number(s.M);
      const right = Math.sqrt((8 * tol) / M);
      const c = { tol: show(s.tol), v: show(Number(right.toPrecision(6))) };
      return [(8 * tol) / M, Math.sqrt((2 * tol) / M)].map((x) => ({ node: { t: 'float', x }, ctx: c }));
    },
    check: { judge: { kind: 'value', expect: '1/10', form: 'irreducible', p1: { tol: '0.015', M: '12' } }, prev: 'h', line: '1/100' },
  },
  n_spline_natural_first: {
    name: 'Spline naturelle : s′ = 0 au lieu de s″ = 0',
    judges: [],
    check: { bait: { skill: 'n-spline', level: 2 } },
  },
  n_spline_count: {
    name: 'Spline : mauvais compte des conditions',
    judges: [],
    check: { bait: { skill: 'n-spline', exam: 'mcq' } },
  },
  n_ls_interp: {
    name: 'Moindres carrés : interpoler au lieu des équations normales',
    judges: [],
    check: { bait: { skill: 'n-least-squares', level: 3 } },
  },
  n_ls_aat: {
    name: 'Équations normales avec AAᵀ',
    judges: ['code'],
    code: { skill: 'n-least-squares', text: 'solve(matmul(mat, At), matvec(mat, ys))' },
    check: { bait: { skill: 'n-least-squares', exam: 'mcq' } },
  },
  n_ls_index_swap: {
    name: 'Matrice des moindres carrés transposée',
    judges: [],
    check: { bait: { skill: 'n-least-squares', exam: 'mcq' } },
  },
};

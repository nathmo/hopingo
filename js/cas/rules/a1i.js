// Traps of module A1, part i (step U4, spec §7): series, convergence tests.
// Catalogue: docs/universite/A1-analyse-1.md, « Pièges du module ».
//
// These traps are verdicts and readings of a criterion, not calculation
// lines: decision options, multiple-choice options and true/false
// statements carry them (check: {bait}). a1_abs_square_ineq (|a| < |b| ⇒
// a < b) is diagnosed in a `solset` line by g1_abs_dropped, which removes
// the same bars and comes first in CAS_RULES; here it names the option of
// the multiple choice that drops them. a1_compare_wrong_direction (skill
// a1-ser-compare) stays in js/cas/rules/a1e.js, where step U2 defined it.

import { t } from '../../i18n.js';

export const RULES = [
  {
    id: 'a1_series_term_to_zero', family: 'logic', tag: 'R', skill: 'a1-ser-necessary', repair: 'a1-ser-necessary',
    judges: [],
    name: t('« uₙ → 0, donc la série converge »'),
    example: [t('1/n → 0, donc Σ 1/n converge'), t('Σ 1/n diverge')],
    check: { bait: { skill: 'a1-ser-necessary', exam: 'tf' } },
    explain: () => t('Σ 1/n diverge alors que 1/n → 0. uₙ → 0 est nécessaire, pas suffisant : il faut un autre critère (comparaison, d\'Alembert, Leibniz).'),
  },
  {
    id: 'a1_riemann_p_boundary', family: 'facts', tag: 'E', skill: 'a1-ser-compare', repair: 'a1-ser-compare',
    judges: [],
    name: t('Seuil de la série de Riemann mal placé'),
    example: [t('Σ 1/n converge (p = 1)'), t('diverge')],
    check: { bait: { skill: 'a1-ser-compare', exam: 'mcq' } },
    explain: () => t('Σ 1/nᵖ converge si et seulement si p > 1 strictement. p = 1 : série harmonique, divergente ; Σ 1/n^(3/2) converge déjà.'),
  },
  {
    id: 'a1_ratio_one', family: 'rule', tag: 'E', skill: 'a1-ser-ratio-root', repair: 'a1-seq-ratio',
    judges: [],
    name: t('ρ = 1, donc « converge » (ou « diverge »)'),
    example: [t('ρ = 1, donc la série converge'), t('aucune conclusion')],
    check: { bait: { skill: 'a1-ser-ratio-root', exam: 'mcq' } },
    explain: () => t('Avec ρ = 1, le critère ne dit rien : Σ 1/n (diverge) et Σ 1/n² (converge) ont toutes deux ρ = 1. Il faut un autre critère.'),
  },
  {
    id: 'a1_ratio_lt1_termwise', family: 'logic', tag: 'E', skill: 'a1-ser-ratio-root', repair: 'a1-ser-ratio-root',
    judges: [],
    name: t('aₙ₊₁/aₙ < 1 pour tout n pris pour ρ < 1'),
    example: [t('aₙ₊₁/aₙ < 1 pour tout n, donc Σ aₙ converge'), t('il faut ≤ q < 1 fixe, ou une limite < 1')],
    check: { bait: { skill: 'a1-ser-ratio-root', exam: 'tf' } },
    explain: () => t('1/n vérifie aₙ₊₁/aₙ = n/(n + 1) < 1, et Σ 1/n diverge : il faut un q < 1 fixe (aₙ₊₁/aₙ ≤ q), ou une limite ρ < 1.'),
  },
  {
    id: 'a1_leibniz_no_decrease', family: 'method', tag: 'C', skill: 'a1-ser-leibniz-abs', repair: 'a1-ser-leibniz-abs',
    judges: [],
    name: t('Leibniz sans la décroissance'),
    example: [t('Σ (−1)ⁿ/(√n + (−1)ⁿ) « converge par Leibniz »'), t('|aₙ| n\'est pas décroissante : la série diverge')],
    check: { bait: { skill: 'a1-ser-leibniz-abs', exam: 'mcq' } },
    explain: (ctx = {}) => t('Leibniz demande trois choses : signes alternés, |aₙ| décroissante, |aₙ| → 0.{p1}', { p1: ctx.a2 ? t(' Ici |a₂| = {a2} < |a₃| = {a3}.', { a2: ctx.a2, a3: ctx.a3 }) : t(' Pour aₙ = (−1)ⁿ/(√n + (−1)ⁿ), |a₂| ≈ 0,41 < |a₃| ≈ 1,37 : pas de décroissance, et la série diverge.') }),
  },
  {
    id: 'a1_abs_conv_confused', family: 'meaning', tag: 'E', skill: 'a1-ser-leibniz-abs', repair: 'a1-ser-leibniz-abs',
    judges: [],
    name: t('Convergence et convergence absolue confondues'),
    example: [t('Σ (−1)ⁿ/n « converge absolument »'), t('semi-convergente')],
    check: { bait: { skill: 'a1-ser-leibniz-abs', exam: 'mcq' } },
    explain: () => t('Leibniz donne la convergence, pas la convergence absolue : pour Σ (−1)ⁿ/n, Σ |aₙ| = Σ 1/n diverge. À l\'inverse, Σ |aₙ| divergente ne dit pas que Σ aₙ diverge.'),
  },
  {
    id: 'a1_param_bounds_untreated', family: 'method', tag: 'E', skill: 'a1-ser-param', repair: 'a1-ser-param',
    judges: [],
    name: t('Bornes de l\'ensemble de convergence non étudiées'),
    example: ['[−1 ; 3]', ']−1 ; 3['],
    check: { bait: { skill: 'a1-ser-param', exam: 'mcq' } },
    explain: (ctx = {}) => t('Aux bornes, ρ = 1 et le critère ne dit rien : remplace λ = {b1}{p1} et étudie chaque série (ici, |q| = 1 : le terme général ne tend pas vers 0).', { b1: ctx.b1 ?? t('chaque borne'), p1: ctx.b2 ? t(' et λ = {b2}', { b2: ctx.b2 }) : '' }),
  },
  {
    id: 'a1_abs_square_ineq', family: 'sign', tag: 'E', skill: 'a1-ser-param', repair: 'g1-sign-table',
    judges: [],
    name: t('|a| < |b| remplacé par a < b'),
    example: ['|2λ| < |λ + 3| ⇒ 2λ < λ + 3', '4λ² < (λ + 3)²'],
    check: { bait: { skill: 'a1-ser-param', exam: 'mcq' } },
    explain: (ctx = {}) => t('|a| < |b| équivaut à a² < b², pas à a < b.{p1}', { p1: ctx.t ? t(' λ = {p1} vérifie ta ligne mais pas la précédente.', { p1: ctx.t }) : t(' Avec λ = −2 : 2λ < λ + 3 est vrai, mais |2λ| = 4 > |λ + 3| = 1.') }),
  },
];

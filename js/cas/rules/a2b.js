// Traps of module A2, part b (step U6): limits in two variables, continuity,
// directional derivatives by the definition, differentiability and the
// implications between C¹, differentiable and partial derivatives. The
// catalogue's table is META in rules/a2.js; this file makes them work.
//
// Two traps replay a wrong line (the generators mark the judge's cfg so
// that they cost nothing elsewhere):
//   a2_dirderiv_power  cfg.dirDeriv: the quotient (f(a + tv) − f(a))/t with
//                      one power of t too many or too few (f(tv) not
//                      divided by t, or divided twice); judges equiv, limit;
//   a2_diff_no_norm    cfg.ratio: 'polar' (R/‖h‖ in r, φ: R written instead,
//                      r times the line) or 'hk' (R/√(h² + k²): R instead).
// The others are wrong final answers (wrongValues): options of the multiple
// choices, wrong decisions, the « true » answer to a false statement. Their
// wrongValues(d) take the generator's data and give the wrong value with
// the ctx of the explanation; `check` names the items that offer them.

import { parse } from '../parse.js';

const par = (e) => ({ t: 'paren', e });
const mul = (l, r) => ({ t: 'bin', op: '×', l: par(l), r });
const div = (l, r) => ({ t: 'frac', n: par(l), d: r });
const sym = (name) => ({ t: 'sym', name });
const fr = (s) => String(s).replace(/-/g, '−');

export const DEFS = {
  a2_lim_lines_only: {
    name: 'Seulement les droites regardées',
    judges: [],
    // d = {lines: value along y = mx, path: 'x²', along: value on the path}
    wrongValues: (d) => [{ value: d.lines, ctx: { L: fr(d.lines), chemin: d.path, valeur: fr(d.along) } }],
    explain: (ctx = {}) => (ctx.L !== undefined
      ? `Toutes les droites donnent ${ctx.L}, mais le long de y = ${ctx.chemin}, f vaut ${ctx.valeur}. Une limite doit être la même sur tous les chemins, pas seulement sur les droites.`
      : 'Toutes les droites y = mx peuvent donner la même valeur alors qu\'une courbe (y = x², x = y²…) en donne une autre. Une limite doit être la même sur tous les chemins, pas seulement sur les droites.'),
    check: { bait: { skill: 'a2-lim-paths', exam: 'mcq' } },
  },
  a2_lim_iterated: {
    name: 'Limites itérées prises pour la limite',
    judges: [],
    // d = {iterated, diag: value along y = x}
    wrongValues: (d) => [{ value: d.iterated, ctx: { valeur: fr(d.diag) } }],
    explain: (ctx = {}) => (ctx.valeur !== undefined
      ? `Les limites itérées ne regardent que deux chemins, les axes. Avec y = x, on trouve ${ctx.valeur}.`
      : 'Les limites itérées lim_x lim_y f et lim_y lim_x f ne regardent que les deux axes. Pour xy/(x² + y²), elles valent 0, mais f vaut 1/2 sur y = x : pas de limite.'),
    check: { bait: { skill: 'a2-lim-paths', exam: 'tf' } },
  },
  a2_lim_function_answer: {
    name: 'Une « limite » qui contient encore y',
    judges: [],
    // d = {partial: the limit in x alone, y kept}
    wrongValues: (d) => (d.partial ? [{ value: d.partial, ctx: {} }] : []),
    explain: () => 'Une limite en (0, 0) ne peut pas contenir y : x et y tendent vers 0 en même temps. Faire tendre x seul vers 0 regarde seulement l\'axe x = 0.',
    check: { bait: { skill: 'a2-lim-paths', exam: 'mcq' } },
  },
  a2_lim_polar_theta: {
    name: '« r → 0 » alors qu\'un terme ne dépend que de φ',
    judges: [],
    // d = {term: the term without r, v1: its value at φ = 0, v2: at φ = π/4}
    wrongValues: (d) => [{ value: '0', ctx: { terme: d.term, 'v₁': fr(d.v1), 'v₂': fr(d.v2) } }],
    explain: (ctx = {}) => (ctx.terme
      ? `Le terme ${ctx.terme} ne contient pas r : il vaut ${ctx['v₁']} pour φ = 0 et ${ctx['v₂']} pour φ = π/4. La limite dépend de la direction : elle n'existe pas.`
      : 'Un terme de la forme polaire qui ne contient pas r ne tend pas vers 0 quand r → 0 : s\'il dépend de φ, la limite dépend de la direction et n\'existe pas.'),
    check: { bait: { skill: 'a2-lim-polar', exam: 'mcq' } },
  },
  a2_lim_polar_r_forgot: {
    name: 'Dépendance en φ vue, facteur r oublié',
    judges: [],
    // d = {k, M}: the polar form is r^k·g(φ) with |g| ≤ M
    wrongValues: (d) => [{ value: 'none', ctx: { k: d.k, M: fr(d.M) } }],
    explain: (ctx = {}) => (ctx.k !== undefined
      ? `Ton expression dépend de φ, mais elle est multipliée par r${ctx.k === 1 ? '' : `^${ctx.k}`} : |f| ≤ ${ctx.M}·r${ctx.k === 1 ? '' : `^${ctx.k}`} → 0. La dépendance en φ ne gêne que si elle reste quand r → 0.`
      : 'r·cos²φ sin φ dépend de φ, mais |r·cos²φ sin φ| ≤ r → 0 : la limite vaut 0. La dépendance en φ ne gêne que si elle reste quand r → 0.'),
    check: { bait: { skill: 'a2-lim-polar', exam: 'mcq' } },
  },
  a2_cont_partial_functions: {
    name: 'Fonctions partielles continues prises pour la continuité',
    judges: [],
    wrongValues: () => [{ value: true, ctx: {} }],
    explain: () => 'Les fonctions partielles x ↦ f(x, 0) et y ↦ f(0, y) ne regardent que les axes. xy/(x² + y²) vaut 0 sur les axes et 1/2 sur y = x : elle n\'est pas continue en (0, 0).',
    check: { bait: { skill: 'a2-continuity', exam: 'tf' } },
  },
  a2_dirderiv_gradient: {
    name: 'D_v f = ∇f·v sans savoir que f est différentiable',
    judges: [],
    // d = {grad: ∇f(a)·v, value: the limit of the definition}
    wrongValues: (d) => [{ value: d.grad, ctx: { produit: fr(d.grad), vraie: fr(d.value) } }],
    explain: (ctx = {}) => (ctx.produit !== undefined
      ? `∇f·v = ${ctx.produit} suppose f différentiable en (0, 0). La définition donne ${ctx.vraie} : c'est la preuve que f n'y est pas différentiable.`
      : 'La formule D_v f(a) = ∇f(a)·v demande que f soit différentiable en a. Pour une fonction définie par morceaux, on calcule la limite de la définition : si elle diffère de ∇f·v, f n\'est pas différentiable.'),
    check: { bait: { skill: 'a2-dir-deriv-def', exam: 'mcq' } },
  },
  a2_dirderiv_power: {
    name: 'Puissance de t mal comptée dans (f(tv) − f(0))/t',
    judges: ['equiv', 'limit'],
    transform: (prev, ctx) => {
      const cfg = ctx?.cfg || {};
      if (!cfg.dirDeriv) return [];
      const t = sym(cfg.v || cfg.vars?.[0] || 't');
      return [
        { node: mul(prev, t), ctx: { more: false } },
        { node: div(prev, t), ctx: { more: true } },
      ];
    },
    explain: (ctx = {}) => (ctx.more === undefined
      ? 'Compte les puissances de t : f(tv) a une puissance de t au numérateur et une au dénominateur, et on divise encore par t.'
      : ctx.more
        ? 'Tu as divisé deux fois par t. Compte les puissances de t : f(tv) d\'abord, puis une seule division par t.'
        : 'Tu as oublié de diviser f(tv) par t : la définition est la limite de (f(tv) − f(0))/t.'),
    check: {
      judge: { kind: 'equiv', vars: ['t'], domain: { t: [-0.5, 0.5] }, dirDeriv: true },
      prev: '(((3t/5)^2(4t/5))/((3t/5)^4+(4t/5)^2)-0)/t',
      line: '(36t/125)/(81t^2/625+16/25)',
    },
  },
  a2_partials_imply_diff: {
    name: 'Dérivées partielles, donc différentiable',
    judges: [],
    // d = {ratio: a value of R/‖h‖, phi: its angle}
    wrongValues: (d) => [{ value: 'diff', ctx: { valeur: fr(d.ratio), 'φ': d.phi } }],
    explain: (ctx = {}) => (ctx.valeur !== undefined
      ? `Les dérivées partielles regardent deux directions. Ici R/‖h‖ vaut ${ctx.valeur} pour φ = ${ctx['φ']} : f n'est pas différentiable.`
      : 'Les dérivées partielles ne regardent que deux directions. Être différentiable demande que R(h)/‖h‖ tende vers 0 dans toutes les directions à la fois.'),
    check: { bait: { skill: 'a2-diff-def', exam: 'mcq' } },
  },
  a2_diff_no_norm: {
    name: 'Le reste R seul, sans le diviser par ‖h‖',
    judges: ['equiv'],
    transform: (prev, ctx) => {
      const ratio = ctx?.cfg?.ratio;
      if (ratio === 'polar') return [{ node: mul(prev, sym('r')), ctx: {} }];
      if (ratio === 'hk') return [{ node: mul(prev, parse('√(h^2+k^2)', { vars: ['h', 'k'] })), ctx: {} }];
      return [];
    },
    explain: () => 'R tend toujours vers 0 si f est continue. La différentiabilité demande plus : R divisé par ‖(h, k)‖ doit tendre vers 0.',
    check: {
      judge: { kind: 'equiv', vars: ['r', 'φ'], domain: { r: [0.01, 1], φ: [0, 6.28] }, ratio: 'polar' },
      prev: '(-(rcos(φ))(rsin(φ))((rcos(φ))+(rsin(φ))))/(((rcos(φ))^2+(rsin(φ))^2)r)',
      line: '-r cos(φ)sin(φ)(cos(φ)+sin(φ))',
    },
  },
  a2_diff_imply_c1: {
    name: 'Différentiable, donc C¹',
    judges: [],
    wrongValues: () => [{ value: true, ctx: {} }],
    explain: () => 'K3 = (x² + y²) sin(1/√(x² + y²)) est différentiable en (0, 0), mais ∂f/∂x oscille près de 0 : elle n\'est pas C¹.',
    check: { bait: { skill: 'a2-diff-implications', exam: 'tf' } },
  },
  a2_partials_imply_cont: {
    name: 'Dérivées partielles, donc continue',
    judges: [],
    wrongValues: () => [{ value: true, ctx: {} }],
    explain: () => 'K1 = xy/(x² + y²) : f(h, 0) = f(0, k) = 0, donc les dérivées partielles valent 0, mais f(t, t) = 1/2 : f n\'est pas continue en (0, 0).',
    check: { bait: { skill: 'a2-diff-implications', exam: 'tf' } },
  },
  a2_dirderiv_imply_diff: {
    name: 'Toutes les dérivées directionnelles, donc différentiable',
    judges: [],
    wrongValues: () => [{ value: true, ctx: {} }],
    explain: () => 'K2 = x²y/(x⁴ + y²) a toutes ses dérivées directionnelles en (0, 0), mais f(x, x²) = 1/2 : elle n\'est même pas continue, donc pas différentiable.',
    check: { bait: { skill: 'a2-diff-implications', exam: 'tf' } },
  },
};

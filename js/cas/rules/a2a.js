// Traps of module A2, part a (step U6): what makes the catalogue's traps
// of this part work (the table itself is META in rules/a2.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain, check}}; explain()
// falls back on the catalogue's text.
//
// The classification traps (a2-rn-topology) are the wrong options of the
// multiple choices, computed by the generator (analyse2-a-topo.js:
// finish); wrongValues gives the same answer from a classification
// {open, closed, bounded}. a2_arc_sum_components replays on the lines of
// the judge `definite`: the generator puts the sum of the components of
// γ′ in cfg.arc = {sum, a, b} (analyse2-a-curve.js).

import { parse } from '../parse.js';

const T = { vars: ['t'] };

export const DEFS = {
  a2_topo_not_open_closed: {
    name: 'Pas ouvert, donc fermé',
    judges: [],
    wrongValues: (c) => [{ value: { ...c, closed: !c.open } }],
    explain: (ctx = {}) => (ctx.p1 && ctx.p2
      ? `Ouvert et fermé ne sont pas contraires. Ton ensemble contient le point ${ctx.p1} du bord, mais pas ${ctx.p2} : il n'est ni ouvert ni fermé.`
      : 'Ouvert et fermé ne sont pas contraires : un ensemble qui contient une partie de son bord, mais pas tout, n\'est ni ouvert ni fermé ([0 ; 1[ par exemple).'),
    check: { bait: { skill: 'a2-rn-topology', exam: 'mcq' } },
  },
  a2_topo_trivial_atom: {
    name: 'Inégalité toujours vraie comptée',
    judges: [],
    wrongValues: (c, all) => [{ value: { ...c, open: all.every((a) => /[<>≠]/.test(a.op)), closed: all.every((a) => !/[<>≠]/.test(a.op)) } }],
    explain: (ctx = {}) => (ctx.atome
      ? `L'inégalité ${ctx.atome} est toujours vraie : elle n'enlève aucun point. Classe l'ensemble avec les autres inégalités seulement.`
      : 'Une inégalité toujours vraie (comme 1 ≥ −25x² − 15y²) n\'enlève aucun point : elle ne compte pas pour dire si l\'ensemble est ouvert ou fermé. On classe avec les autres inégalités seulement.'),
    check: { bait: { skill: 'a2-rn-topology', exam: 'mcq' } },
  },
  a2_topo_cylinder: {
    name: 'Variable absente oubliée (cylindre)',
    judges: [],
    wrongValues: (c) => [{ value: { ...c, bounded: true } }],
    explain: () => 'Dans ℝ³, une variable qui n\'apparaît dans aucune inégalité est libre : {x² + y² ≤ 1} contient (0, 0, z) pour tout z. C\'est un cylindre infini, pas un ensemble borné.',
    check: { bait: { skill: 'a2-rn-topology', exam: 'mcq' } },
  },
  a2_bd_union: {
    name: 'Bord d\'une réunion',
    judges: [],
    wrongValues: () => [{ value: true }],
    explain: () => 'Le bord d\'une réunion peut être plus petit : avec A = [0 ; 1] et B = [1 ; 2], le point 1 est dans ∂A, mais il est intérieur à A ∪ B = [0 ; 2]. B comble le trou. Seule l\'inclusion ∂(A ∪ B) ⊂ ∂A ∪ ∂B est vraie.',
    check: { bait: { skill: 'a2-rn-boundary', exam: 'tf' } },
  },
  a2_bd_isolated: {
    name: 'Point isolé oublié dans le bord',
    judges: [],
    wrongValues: (pieces) => [{ value: pieces.filter((p) => p.kind !== 'point') }],
    explain: (ctx = {}) => `Toute boule autour d'un point isolé${ctx.p ? ` ${ctx.p}` : ''} contient ce point (il est dans E) et des points hors de E : un point isolé est dans le bord.`,
    check: { bait: { skill: 'a2-rn-boundary', level: 2 } },
  },
  a2_seq_one_component: {
    name: 'Une composante converge, donc la suite converge',
    judges: [],
    wrongValues: (options) => options.filter((o) => o.comps.some((c) => c.conv)).map((o) => ({ value: o })),
    explain: (ctx = {}) => `${ctx.which ? `La composante ${ctx.which} converge, mais une autre alterne. ` : ''}Une suite de ℝⁿ converge seulement si chaque composante converge : une seule composante qui oscille suffit pour que la suite diverge.`,
    check: { bait: { skill: 'a2-rn-sequences', exam: 'mcq' } },
  },
  a2_curve_sign_factor: {
    name: 'Facteur discontinu, composante continue',
    judges: [],
    wrongValues: (comps) => comps.filter((c) => /sign/.test(c.text) && c.g0 === 0).map((c) => ({ value: c })),
    explain: () => 'sign(t) saute en 0, mais si l\'autre facteur vaut 0 en 0 (comme eᵗ − 1 ou sin t), le produit tend vers 0 des deux côtés : la composante est continue. Seul un facteur non nul en 0 (comme cos t) garde le saut.',
    check: { bait: { skill: 'a2-curve-param', exam: 'mcq' } },
  },
  a2_arc_sum_components: {
    name: 'Vitesse prise comme la somme des composantes',
    judges: ['definite'],
    // ∫ ‖γ′‖ dt → ∫ (x′ + y′ + z′) dt, with the item's components.
    transform: (prev, ctx) => {
      const arc = ctx?.cfg?.arc;
      if (!arc) return [];
      return [{ node: parse(`int(${arc.sum},t,${arc.a},${arc.b})`, T), ctx: {} }];
    },
    explain: () => 'La vitesse est la norme du vecteur γ′ : ‖γ′(t)‖ = √(x′² + y′² + z′²), pas la somme de ses composantes x′ + y′ + z′.',
    check: {
      judge: { kind: 'definite', arc: { sum: '-3sin(t)+3cos(t)+4', a: '0', b: '2π' } },
      prev: 'int(√(9sin(t)^2+9cos(t)^2+16),t,0,2π)', line: 'int(-3sin(t)+3cos(t)+4,t,0,2π)',
    },
  },
  a2_compact_open: {
    name: 'Bornes atteintes sans « fermé et borné »',
    judges: [],
    wrongValues: () => [{ value: true }],
    explain: (ctx = {}) => `Le théorème des bornes atteintes demande D fermé et borné (et non vide).${ctx.D && ctx.f ? ` Sur ${ctx.D}, la fonction ${ctx.f} est un contre-exemple.` : ' Sur ]0 ; 1[, f(x) = 1/x est continue et non bornée ; f(x) = x est bornée mais n\'atteint pas son maximum.'}`,
    check: { bait: { skill: 'a2-compact-extreme', exam: 'tf' } },
  },
  a2_open_image: {
    name: 'Image d\'un ouvert prise pour un ouvert',
    judges: [],
    wrongValues: () => [{ value: true }],
    explain: () => 'f = 0 est continue, et f(ℝⁿ) = {0} n\'est pas ouvert. C\'est l\'image réciproque d\'un ouvert par une fonction continue qui est ouverte, pas l\'image directe.',
    check: { bait: { skill: 'a2-compact-extreme', exam: 'tf' } },
  },
};

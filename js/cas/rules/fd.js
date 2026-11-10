// Traps of module F, part d (step U10): what makes the catalogue's traps
// of this part work (the table itself is META in rules/vcf.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain?, check}}; explain()
// falls back on the catalogue's text. Each trap carries a `check`
// replayed by tests/judges.test.js: {judge, prev, line} (a wrong line
// diagnosed as the trap), {counter, answers}, or {bait: {skill, level?, exam?}}.
//
// The lines of part d are named values judged by `prob` with variables
// (js/content/uni/fourier-d-kit.js): the generators know the wrong texts
// each trap produces for their item (the rate e^(−nt), the sines of a
// Neumann problem, the factor 1/L, the steady part alone, c² for c, the
// growing exponential e^(|α|x)) and write them in the part's cfg.traps =
// {trapId: [texts]}; `transform` reads them back as lines of the judge.

import { readStat } from '../../judges/statline.js';

// The candidates written by the generator in cfg.traps[id].
function fromCfg(id, ctx) {
  const cfg = ctx?.cfg || {};
  const list = cfg.traps?.[id] || [];
  const out = [];
  for (const t of list) {
    try { out.push({ node: readStat(cfg, typeof t === 'string' ? t : t.line), ctx: typeof t === 'string' ? {} : t.ctx || {} }); } catch { /* skip */ }
  }
  return out;
}
const fromCfgOf = (id) => (prev, ctx) => fromCfg(id, ctx);

const nDom = { n: { int: [1, 40] } };

export const DEFS = {
  f_heat_rate: {
    name: 'Taux de décroissance du mode n',
    judges: ['prob'],
    transform: fromCfgOf('f_heat_rate'),
    explain: () => 'u_xx dérive deux fois le mode sin(nπx/L) (ou cos) : il sort le facteur −(nπ/L)². Le coefficient vérifie donc bₙ′ = −(nπ/L)²bₙ, et le mode n décroît comme e^(−(nπ/L)² t), pas comme e^(−nt).',
    check: { judge: { kind: 'prob', label: 'λ_n', vars: ['n'], domain: nDom, expect: 'n^2π^2/4', traps: { f_heat_rate: ['nπ/2', 'n^2'] } }, prev: 'λ_n', line: 'nπ/2' },
  },
  f_heat_bc_coef: {
    name: 'Facteur 1/L dans la série de la condition initiale',
    judges: ['prob'],
    transform: fromCfgOf('f_heat_bc_coef'),
    explain: () => 'La condition initiale se développe en série de sinus sur ]0 ; L[ : c\'est la série du prolongement impair, de période 2L, et l\'intégrale sur ]−L ; L[ vaut deux fois celle sur ]0 ; L[. Donc bₙ(0) = (2/L)∫₀ᴸ u(x, 0) sin(nπx/L) dx, avec 2/L et non 1/L.',
    check: { judge: { kind: 'prob', label: 'b_n(0)', vars: ['n'], domain: nDom, expect: '2(1-(-1)^n)/(nπ)', traps: { f_heat_bc_coef: ['(1-(-1)^n)/(nπ)'] } }, prev: 'b_n(0)', line: '(1-(-1)^n)/(nπ)' },
  },
  f_neumann_sine: {
    name: 'Des sinus pour des conditions de Neumann',
    judges: ['prob'],
    transform: fromCfgOf('f_neumann_sine'),
    explain: () => 'u_x = 0 aux bords : ce sont les cosinus qui vérifient cette condition, car (cos(nπx/L))′ = −(nπ/L) sin(nπx/L) s\'annule en 0 et en L. La dérivée d\'un sinus vaut ±nπ/L aux bords. Et le mode n = 0 (la constante) compte.',
    check: { judge: { kind: 'prob', label: 'X_n', vars: ['x', 'n'], domain: { x: [0, 2], n: { int: [0, 30] } }, expect: 'cos(nπx/2)', traps: { f_neumann_sine: ['sin(nπx/2)'] } }, prev: 'X_n', line: 'sin(nπx/2)' },
  },
  f_heat_source_steady: {
    name: 'La partie stationnaire seule',
    judges: ['prob'],
    transform: fromCfgOf('f_heat_source_steady'),
    explain: (ctx = {}) => `bₖ′ + λbₖ = β a pour solution générale β/λ + Ce^(−λt) : la partie stationnaire β/λ${ctx.steady ? ` = ${ctx.steady}` : ''} ne vérifie pas la condition initiale du mode. Avec bₖ(0), C = bₖ(0) − β/λ : bₖ(t) = bₖ(0)e^(−λt) + (β/λ)(1 − e^(−λt)). Par exemple b₂(0) = 0 donne b₂ = (1 − e^(−4t))/4, pas 1/4.`,
    check: { judge: { kind: 'prob', label: 'b_2(t)', vars: ['t'], domain: { t: [0, 1] }, expect: '(1/4)(1-e^(-4t))', traps: { f_heat_source_steady: ['1/4'] } }, prev: 'b_2(t)', line: '1/4' },
  },
  f_wave_factor: {
    name: 'Facteur c de l\'équation des ondes',
    judges: ['prob'],
    transform: fromCfgOf('f_wave_factor'),
    explain: (ctx = {}) => `u_tt = c²u_xx : le coefficient devant u_xx est c², pas c${ctx.c ? ` ; ici c = ${ctx.c}` : ''}. Le coefficient ¼ devant u_xx donne c = ½ : û_tt + (α²/4)û = 0, û = û₀ cos(αt/2), et d'Alembert u = (u₀(x + t/2) + u₀(x − t/2))/2, avec un facteur ½ et non ¼. (Corrigé MT/SV 2021.)`,
    check: { judge: { kind: 'prob', label: 'û_tt', vars: ['α', 'û'], domain: { 'α': [-3, 3], 'û': [-2, 2] }, expect: '-(α^2/4)û', traps: { f_wave_factor: ['-α^2û', '-(α^2/2)û'] } }, prev: 'û_tt', line: '-α^2û' },
  },
  f_half_plane_abs: {
    name: 'Solution non bornée gardée',
    judges: ['prob'],
    transform: fromCfgOf('f_half_plane_abs'),
    explain: () => 'û_xx = α²û a pour solutions A(α)e^(|α|x) + B(α)e^(−|α|x). Le terme e^(|α|x) explose quand x → ∞ : pour une solution bornée dans le demi-plan, il faut A = 0, donc û(x, α) = û(0, α)e^(−|α|x).',
    check: { judge: { kind: 'prob', label: 'û', vars: ['x', 'α'], domain: { x: [0, 3], 'α': [-3, 3] }, expect: '√(π/2)e^(-(x+2)|α|)', traps: { f_half_plane_abs: ['√(π/2)e^(-2|α|)e^(|α|x)'] } }, prev: 'û', line: '√(π/2)e^(-2|α|)e^(|α|x)' },
  },
};

// Traps of module V, part a (step U10): what makes the catalogue's traps
// of this part work (the table itself is META in rules/vcf.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain?, check}}; explain()
// falls back on the catalogue's text. Each trap carries a `check`
// replayed by tests/judges.test.js: {judge, prev, line} (a wrong line
// diagnosed as the trap), {counter, answers}, or {bait: {skill, level?, exam?}}.
//
// Two sources of candidates:
// - the generators of vecto-a write the wrong lines of a trap in the
//   judge's configuration, cfg.traps = {id: [text | {line, ctx}]}: the
//   component of rot F with its sign changed, Δf with the mixed terms, the
//   integral without |γ′(t)| or with it in a work, the curve of radius R²,
//   the potentials counted twice or with ∫ c·vᵏ = c·vᵏ⁺¹ (fromCfg);
// - the previous line itself: ∂_aF_b − ∂_bF_a read in the other order (cfg.rot),
//   the unknown function α(y, z) of a potential replaced by a constant.
// The judge `param` names v_orientation_reversed and v_param_bounds
// itself, and `antideriv` with grad names v_pot_final_const; their checks
// replay a line those judges refuse. The traps on statements (domains,
// conclusions) are options of decisions and multiple choices ({bait}).

import { parse } from '../parse.js';
import { toText } from '../print.js';
import { mapNode, stripParen } from '../ast.js';

const FUNCS = ['α', 'β', 'γ', 'g', 'h', 'k'];

// A candidate text read as the judge of cfg reads it (param and antideriv
// with grad compare texts themselves).
function readFor(cfg, text) {
  if (cfg.kind === 'param' || (cfg.kind === 'antideriv' && cfg.grad)) return text;
  if (cfg.kind === 'solset') return parse(text, { vars: [cfg.v || 'x'], dvar: cfg.v || 'x' });
  return parse(text, { vars: cfg.vars, funcs: cfg.funcs, dvar: cfg.vars?.[0] || 'x' });
}

// The candidates written by the generator in cfg.traps[id].
function fromCfg(id, ctx) {
  const cfg = ctx?.cfg || {};
  const out = [];
  for (const t of cfg.traps?.[id] || []) {
    const line = typeof t === 'string' ? t : t.line;
    try { out.push({ node: readFor(cfg, line), ctx: { ...(typeof t === 'string' ? {} : t.ctx || {}) } }); } catch { /* skip */ }
  }
  return out;
}
const cfgOnly = (id) => (prev, ctx) => fromCfg(id, ctx);

const isPd = (n) => { n = stripParen(n); return n.t === 'deriv'; };

// ∂_aF_b − ∂_bF_a written in the other order (items of rot F set cfg.rot).
function rotSign(prev, ctx) {
  const out = fromCfg('v_rot_sign', ctx);
  if (!ctx?.cfg?.rot || !prev) return out;
  const p = stripParen(prev);
  if (p.t === 'bin' && p.op === '-' && isPd(p.l) && isPd(p.r)) out.push({ node: { t: 'bin', op: '-', l: p.r, r: p.l }, ctx: {} });
  return out;
}

// α(y, z) (any unknown function call) replaced by the constant C.
function constFn(prev, ctx) {
  const out = fromCfg('v_pot_const_fn', ctx);
  if (!ctx?.cfg?.grad || !prev || typeof prev !== 'object') return out;
  let found = false;
  const n = mapNode(prev, (x) => {
    if (x.t === 'fn' && FUNCS.includes(x.name)) { found = true; return { t: 'sym', name: 'C' }; }
    return x;
  });
  if (found) {
    const p = stripParen(n);
    out.push({ node: toText(p.t === 'rel' ? p.r : p), ctx: {} });
  }
  return out;
}

const RAD = (ctx) => `Le cercle x² + y² = ${ctx.R2 ?? 'R²'} a pour rayon ${ctx.R2 ? `√${ctx.R2} = ${ctx.R}` : 'R'}, pas ${ctx.R2 ?? 'R²'} : la paramétrisation est (${ctx.R ?? 'R'} cos t ; ${ctx.R ?? 'R'} sin t), et |γ′(t)| = ${ctx.R ?? 'R'}.`;

const HALF = { kind: 'param', curve: { ref: '(2cos(t) ; 2sin(t))', t: [0, 'π'] } };
const POT = { kind: 'antideriv', grad: ['2x y+z', 'x^2', 'x+2z'], vars: ['x', 'y', 'z'] };
const EQ3 = { kind: 'equiv', vars: ['x', 'y', 'z'], domain: { x: [-3, 3], y: [-3, 3], z: [-3, 3] }, target: 'goal' };

export const DEFS = {
  v_rot_sign: {
    name: 'Signe d\'une composante de rot F',
    judges: ['equiv'],
    transform: rotSign,
    explain: (ctx = {}) => `Chaque composante de rot F suit l'ordre x → y → z → x : (∂F₃/∂y − ∂F₂/∂z ; ∂F₁/∂z − ∂F₃/∂x ; ∂F₂/∂x − ∂F₁/∂y). En 2D, rot F = ∂F₂/∂x − ∂F₁/∂y.${ctx.want ? ` Ici, cela donne ${ctx.want}.` : ''} Dans l'autre ordre, on obtient l'opposé.`,
    check: { judge: { ...EQ3, goal: '-2', rot: true }, prev: 'pd(-x,x) - pd(y,y)', line: '2' },
  },
  v_rot_scalar_sum: {
    name: 'Composantes de rot F additionnées',
    judges: [],
    wrongValues: () => [],
    explain: () => 'rot F est un vecteur : rot F = 0 veut dire que chaque composante est nulle, en tout point. Une somme nulle des composantes n\'oblige pas chacune à valoir 0 : écris une équation par composante.',
    check: { bait: { skill: 'v-pot-lambda', level: 3 } },
  },
  v_lap_mixed: {
    name: 'Dérivées croisées dans le laplacien',
    judges: ['equiv'],
    transform: cfgOnly('v_lap_mixed'),
    explain: (ctx = {}) => `Le laplacien ne contient que ∂²f/∂x², ∂²f/∂y² et ∂²f/∂z².${ctx.mixed ? ` Le terme ${ctx.mixed} vient d'une dérivée croisée :` : ' Une dérivée croisée'} ne fait pas partie de Δf.`,
    check: { judge: { kind: 'equiv', vars: ['x', 'y'], domain: { x: [-3, 3], y: [-3, 3] }, target: 'goal', goal: '2+6y', traps: { v_lap_mixed: [{ line: '3+6y', ctx: { mixed: '∂²f/∂x∂y = 1' } }] } }, prev: 'pd(x^2+y^3+x y, x, x) + pd(x^2+y^3+x y, y, y)', line: '3+6y' },
  },
  v_identity_drop_term: {
    name: 'Terme oublié dans la règle du produit',
    judges: ['equiv'],
    transform: cfgOnly('v_identity_drop_term'),
    explain: (ctx = {}) => `div(fF) = f div F + F · ∇f est une règle du produit : comme (fg)′ = f′g + fg′, il y a deux termes. Il manque ${ctx.missing ?? 'F · ∇f'}.`,
    check: { judge: { ...EQ3, goal: '5x y', traps: { v_identity_drop_term: [{ line: '3x y', ctx: { missing: 'F · ∇f = 2xy' } }] } }, prev: '(x y)(pd(x,x)+pd(y,y)+pd(z,z)) + x pd(x y,x) + y pd(x y,y) + z pd(x y,z)', line: '3x y' },
  },
  v_orientation_reversed: {
    name: 'Courbe parcourue dans l\'autre sens',
    judges: ['param', 'definite'],
    transform: cfgOnly('v_orientation_reversed'),
    explain: (ctx = {}) => `Ta courbe est parcourue dans l'autre sens${ctx.from ? ` : de ${ctx.to} vers ${ctx.from}` : ''}. Changer de sens change le signe du travail. Pour un bord, le domaine doit rester à gauche.`,
    check: { judge: HALF, prev: 'Γ', line: 'γ(t) = (-2cos(t) ; 2sin(t)), t ∈ [0 ; π]' },
  },
  v_param_bounds: {
    name: 'Mauvaises bornes du paramètre',
    judges: ['param'],
    transform: cfgOnly('v_param_bounds'),
    explain: (ctx = {}) => `Avec ${ctx.a !== undefined ? `t ∈ [${ctx.a} ; ${ctx.b}]` : 'ces bornes'}, ta courbe ne parcourt pas exactement Γ : elle en fait trop, ou pas assez. Repère les valeurs de t aux deux extrémités de Γ.`,
    check: { judge: HALF, prev: 'Γ', line: 'γ(t) = (2cos(t) ; 2sin(t)), t ∈ [0 ; 2π]' },
  },
  v_radius_squared: {
    name: 'Rayon au carré',
    judges: ['param', 'definite'],
    transform: cfgOnly('v_radius_squared'),
    explain: (ctx = {}) => RAD(ctx),
    check: { judge: { kind: 'param', curve: { ref: '(2cos(t) ; 2sin(t))', t: [0, '2π'], closed: true }, traps: { v_radius_squared: [{ line: 'γ(t) = (4cos(t) ; 4sin(t)), t ∈ [0 ; 2π]', ctx: { R2: 4, R: 2 } }] } }, prev: 'Γ', line: 'γ(t) = (4cos(t) ; 4sin(t)), t ∈ [0 ; 2π]' },
  },
  v_speed_forgot: {
    name: 'Vitesse |γ′(t)| oubliée',
    judges: ['definite'],
    transform: cfgOnly('v_speed_forgot'),
    explain: (ctx = {}) => `Pour ∫ f dl, chaque morceau de courbe a la longueur |γ′(t)| dt.${ctx.speed ? ` Ici |γ′(t)| = ${ctx.speed} : il multiplie f(γ(t)).` : ' Ce facteur multiplie f(γ(t)).'}`,
    check: { judge: { kind: 'definite', vars: ['I'], known: { I: '35/2' }, traps: { v_speed_forgot: [{ line: 'int(7t,t,0,1)', ctx: { speed: '5' } }] } }, prev: 'I', line: 'int(3t+4t, t, 0, 1)' },
  },
  v_speed_in_work: {
    name: '|γ′(t)| en trop dans un travail',
    judges: ['definite'],
    transform: cfgOnly('v_speed_in_work'),
    explain: (ctx = {}) => `Pour le travail ∫ F · dl = ∫ F(γ(t)) · γ′(t) dt, le vecteur γ′(t) contient déjà la longueur : on ne multiplie pas encore par |γ′(t)|${ctx.speed ? ` = ${ctx.speed}` : ''}.`,
    check: { judge: { kind: 'definite', vars: ['W'], known: { W: '13/15' }, traps: { v_speed_in_work: ['int((t^4+2t^2)sqrt(1+4t^2),t,0,1)'] } }, prev: 'W', line: 'int((t^4+2t^2)×sqrt(1+4t^2), t, 0, 1)' },
  },
  v_gamma_prime_forgot: {
    name: 'Produit scalaire sans γ′(t)',
    judges: ['definite'],
    transform: cfgOnly('v_gamma_prime_forgot'),
    explain: (ctx = {}) => `Le travail se fait le long de la courbe : on fait le produit scalaire de F(γ(t)) avec la vitesse γ′(t)${ctx.gp ? ` = ${ctx.gp}` : ''}${ctx.used ? `, pas avec ${ctx.used}` : ''}.`,
    check: { judge: { kind: 'definite', vars: ['W'], known: { W: '13/15' }, traps: { v_gamma_prime_forgot: [{ line: 'int(t^4+t^3,t,0,1)', ctx: { gp: '(1 ; 2t)', used: 'γ(t)' } }] } }, prev: 'W', line: 'int(t^4 + t^3, t, 0, 1)' },
  },
  v_sincos_sign: {
    name: 'Signe de la primitive de sin t cosᵏ t',
    judges: ['definite'],
    transform: cfgOnly('v_sincos_sign'),
    explain: (ctx = {}) => `Avec u = cos t, du = −sin t dt : ∫ sin t cos²t dt = −cos³t/3 (et ∫ cos t sin²t dt = sin³t/3).${ctx.got ? ` Ton signe donne ${ctx.got} au lieu de ${ctx.want}.` : ''}`,
    check: { judge: { kind: 'definite', vars: ['W'], known: { W: '2/3' }, traps: { v_sincos_sign: [{ line: '-2/3', ctx: { got: '−2/3', want: '2/3' } }] } }, prev: 'W', line: '-2/3' },
  },
  v_simply_connected_wrong: {
    name: 'Simple connexité mal jugée',
    judges: [],
    wrongValues: () => [],
    explain: (ctx = {}) => `Un domaine du plan est simplement connexe s'il n'a pas de trou : une courbe fermée autour de ${ctx.hole ?? 'l\'origine'} ne peut pas se réduire à un point sans sortir du domaine. ℝ³ \\ {0}, lui, est simplement connexe (une courbe contourne le point), mais pas ℝ³ privé d'un axe.`,
    check: { bait: { skill: 'v-domain-topo', level: 2 } },
  },
  v_convex_star_confuse: {
    name: 'Étoilé pris pour convexe',
    judges: [],
    wrongValues: () => [],
    explain: (ctx = {}) => `Convexe ⇒ étoilé, mais pas l'inverse${ctx.p ? ` : le segment entre ${ctx.p} et ${ctx.q} sort du domaine` : ' : un domaine étoilé peut avoir un segment qui sort'}.`,
    check: { bait: { skill: 'v-domain-topo', level: 2 } },
  },
  v_pot_no_domain: {
    name: 'rot F = 0 sans regarder le domaine',
    judges: [],
    wrongValues: () => [],
    explain: (ctx = {}) => `rot F = 0 ne suffit que sur un domaine simplement connexe (par exemple convexe). Dis pourquoi ${ctx.domain ?? 'Ω'} l'est, ou cherche une courbe fermée autour du trou.`,
    check: { bait: { skill: 'v-pot-test', level: 4 } },
  },
  v_rot_closed_zero: {
    name: 'Une courbe avec ∮ = 0 ne prouve rien',
    judges: [],
    wrongValues: () => [],
    explain: () => 'Une seule courbe fermée avec ∮ F · dl = 0 ne prouve rien : il faudrait toutes les courbes fermées. À l\'inverse, une seule courbe avec ∮ ≠ 0 prouve qu\'il n\'y a pas de potentiel.',
    check: { bait: { skill: 'v-pot-none', level: 2 } },
  },
  v_pot_const_fn: {
    name: 'Constante au lieu d\'une fonction inconnue',
    judges: ['antideriv'],
    transform: constFn,
    explain: () => 'Après avoir intégré en x, ce qui ne dépend pas de x peut encore dépendre de y et z : écris α(y, z), pas une constante. Une seule constante C reste à la fin.',
    check: { judge: POT, prev: 'φ = x^2y + xz + α(y, z)', line: 'φ = x^2y + xz + C' },
  },
  v_pot_double_count: {
    name: 'Les trois primitives additionnées',
    judges: ['antideriv'],
    transform: cfgOnly('v_pot_double_count'),
    explain: (ctx = {}) => `${ctx.term ? `Le terme ${ctx.term}` : 'Un terme'} apparaît dans plusieurs primitives partielles : en additionnant ∫F₁ dx + ∫F₂ dy + ∫F₃ dz, on le compte plusieurs fois. Dérive ton φ en x : tu ne retrouves pas F₁.`,
    check: { judge: { ...POT, traps: { v_pot_double_count: [{ line: 'φ = 2x^2y + 2xz + z^2 + C', ctx: { term: 'x²y' } }] } }, prev: 'φ', line: 'φ = 2x^2y + 2xz + z^2 + C' },
  },
  v_pot_final_const: {
    name: 'Constante finale mal fixée',
    judges: ['antideriv'],
    explain: (ctx = {}) => `φ(P) = φ₀(P) + C doit valoir la valeur imposée${ctx.C !== undefined ? ` : C = ${String(ctx.C).replace('-', '−')}` : ''}. Remplace les coordonnées de P dans φ sans la constante, puis résous pour C.`,
    check: { judge: { ...POT, at: { point: [1, 2, -1], value: 0 } }, prev: 'φ = x^2 y + x z + z^2 + C', line: 'φ = x^2y + xz + z^2 + 2' },
  },
  v_pot_poly_integral: {
    name: 'Primitive de c·vᵏ sans diviser',
    judges: ['antideriv'],
    transform: cfgOnly('v_pot_poly_integral'),
    explain: (ctx = {}) => `La primitive de c·vᵏ est c·vᵏ⁺¹/(k + 1) : on divise par le nouvel exposant${ctx.term ? ` (primitive de ${ctx.term} : ${ctx.want})` : ''}.`,
    check: { judge: { ...POT, traps: { v_pot_poly_integral: [{ line: 'φ = 2x^2y + xz + α(y, z)', ctx: { term: '2xy', want: 'x²y' } }] } }, prev: 'φ', line: 'φ = 2x^2y + xz + α(y, z)' },
  },
  v_potential_sign: {
    name: 'F = −∇φ',
    judges: ['antideriv'],
    transform: cfgOnly('v_potential_sign'),
    explain: () => 'Dans ce cours, « F dérive d\'un potentiel » veut dire F = ∇φ, sans signe moins (ce n\'est pas la convention de la physique).',
    check: { judge: { ...POT, traps: { v_potential_sign: ['φ = -x^2y - xz - z^2 + C'] } }, prev: 'φ', line: 'φ = -x^2y - xz - z^2 + C' },
  },
  v_pot_on_restricted: {
    name: 'Potentiel d\'un demi-plan pris pour Ω',
    judges: [],
    wrongValues: () => [],
    explain: () => 'Ton φ contient Arctg(y/x) : il n\'est pas défini sur l\'axe x = 0, qui fait partie de Ω. C\'est un potentiel sur {x > 0}, pas sur Ω.',
    check: { bait: { skill: 'v-pot-domain', level: 4 } },
  },
};

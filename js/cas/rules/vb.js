// Traps of module V, part b (step U10): what makes the catalogue's traps
// of this part work (the table itself is META in rules/vcf.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain?, check}}; explain()
// falls back on the catalogue's text. Each trap carries a `check`
// replayed by tests/judges.test.js: {judge, prev, line} (a wrong line
// diagnosed as the trap), {counter, answers}, or {bait: {skill, level?, exam?}}.
//
// The generators of vecto-b know the numbers of their items: they write
// each trap's wrong lines in the judge's configuration, cfg.traps = {id:
// [texts]} (or [{line, ctx}]), and `transform` reads them back with the
// judge's own reader (a vector of judge `vector`, a parametrisation of
// judge `param` as a text, a number or an expression of `definite` and
// `equiv`). No transform here guesses from the previous line, so these
// traps never name a line of another module.
// The judges `param` and `boundary` name v_cross_order, v_surf_domain,
// v_boundary_orient and v_boundary_pieces themselves.
// Traps that are decisions or statements (v_fubini_bounds, v_chain_sign)
// are options of decisions, multiple choices and decoy blocks.

import { parse } from '../parse.js';
import { parseLine as vectorLine } from '../../judges/vector.js';

function readFor(cfg, text) {
  if (cfg.kind === 'vector') return vectorLine(cfg, text);
  if (cfg.kind === 'param' || cfg.kind === 'boundary') return text;
  return parse(text, { vars: cfg.vars || [] });
}

// The candidates written by the generator in cfg.traps[id].
export function fromCfg(id, ctx) {
  const cfg = ctx?.cfg || {};
  const list = cfg.traps?.[id] || [];
  const out = [];
  for (const t of list) {
    const text = typeof t === 'string' ? t : t.line;
    try { out.push({ node: readFor(cfg, text), ctx: { ...(typeof t === 'string' ? {} : t.ctx || {}) } }); } catch { /* skip */ }
  }
  return out;
}
const T = (id) => (prev, ctx) => fromCfg(id, ctx);

// The judges of the checks (one item each).
const HEMI = { ref: '(3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ))', u: [0, Math.PI / 2], v: [0, 2 * Math.PI], params: ['θ', 'φ'] };
const BOUNDARY = {
  kind: 'boundary', sides: [
    { name: 'Γ1', cancels: 'Γ3', ref: '(3sin(t) ; 0 ; 3cos(t))', t: [0, 'π/2'] },
    { name: 'Γ2', ref: '(3cos(t) ; 3sin(t) ; 0)', t: [0, '2π'], closed: true },
    { name: 'Γ3', cancels: 'Γ1', ref: '(3sin(t) ; 0 ; 3cos(t))', t: [0, 'π/2'] },
    { name: 'Γ4', point: true },
  ],
};

export const DEFS = {
  v_div_rot_confuse: {
    name: 'div et rot confondus',
    judges: ['equiv', 'definite'],
    transform: T('v_div_rot_confuse'),
    explain: (ctx = {}) => `Avec la normale ν, c'est la divergence (ce qui sort du domaine) ; avec dl le long de la courbe, c'est le rotationnel.${ctx.used ? ` Ici tu as pris ${ctx.used}.` : ''}`,
    check: { judge: { kind: 'equiv', vars: ['x', 'y'], traps: { v_div_rot_confuse: [{ line: '-2x y sin(x^2)', ctx: { used: 'rot F' } }] } }, prev: 'pd(x^2, x) + pd(y cos(x^2), y)', line: '-2x y sin(x^2)' },
  },
  v_green_singular: {
    name: 'Green avec une singularité dans le domaine',
    judges: ['definite'],
    transform: T('v_green_singular'),
    explain: (ctx = {}) => `F n'est pas défini en (0, 0), qui est dans le disque : Green ne s'applique pas. Le calcul direct donne ${ctx.direct ?? '2π'}.`,
    check: { judge: { kind: 'definite', traps: { v_green_singular: [{ line: '0', ctx: { direct: '2π' } }] } }, prev: 'int(1, t, 0, 2π)', line: '0' },
  },
  v_green_no_rot: {
    name: 'Green sans calculer rot F',
    judges: ['definite'],
    transform: T('v_green_no_rot'),
    explain: (ctx = {}) => `Green dit ∮ F · dl = ∬ rot F dx dy. Il faut écrire rot F${ctx.rot ? ` = ${ctx.rot}` : ''} : c'est parce qu'il vaut une constante que ∮ = ${ctx.rot ?? 'rot F'} × aire.`,
    check: { judge: { kind: 'definite', traps: { v_green_no_rot: [{ line: '4π', ctx: { rot: '3' } }] } }, prev: 'int(int(3r, r, 0, 2), φ, 0, 2π)', line: '4π' },
  },
  v_nu_formula: {
    name: 'Normale ν tournée du mauvais côté',
    judges: ['vector'],
    transform: T('v_nu_formula'),
    explain: () => 'Pour un bord parcouru avec le domaine à gauche, la normale extérieure unité est ν = (γ₂′, −γ₁′)/|γ′|. Ta normale pointe vers l\'intérieur, ou elle n\'est pas unitaire.',
    check: { judge: { kind: 'vector', params: ['t'], symbols: {}, form: 'any', expect: '(cos(t) ; sin(t))', traps: { v_nu_formula: ['(-cos(t) ; -sin(t))'] } }, prev: 'ν', line: '(-cos(t) ; -sin(t))' },
  },
  v_fubini_bounds: {
    name: 'Ordre des intégrales échangé sans changer les bornes',
    judges: [],
    explain: (ctx = {}) => `La borne ${ctx.inner ?? 'intérieure'} dépend de x : l'intégrale en y doit être à l'intérieur, celle en x à l'extérieur.`,
    check: { bait: { skill: 'v-green-flux', level: 3 } },
  },
  v_cross_order: {
    name: 'Produit vectoriel dans le mauvais ordre',
    judges: ['param', 'vector'],
    transform: T('v_cross_order'),
    explain: () => 'Le produit vectoriel change de signe si on échange les facteurs : σ_v ∧ σ_u = −σ_u ∧ σ_v. Et la 2e composante de a ∧ b est a₃b₁ − a₁b₃.',
    check: { judge: { kind: 'param', surface: HEMI }, prev: 'Σ', line: 'σ(φ, θ) = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), φ ∈ [0 ; 2π], θ ∈ [0 ; π/2]' },
  },
  v_sphere_theta: {
    name: 'θ mesuré depuis l\'équateur',
    judges: ['param', 'vector', 'equiv'],
    transform: T('v_sphere_theta'),
    explain: () => 'Dans ce cours, θ se mesure depuis l\'axe z : z = R cos θ, et le facteur de ds est R² sin θ.',
    check: { judge: { kind: 'param', surface: HEMI, traps: { v_sphere_theta: ['σ(θ, φ) = (3cos(θ)cos(φ) ; 3cos(θ)sin(φ) ; 3sin(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]'] } }, prev: 'Σ', line: 'σ(θ, φ) = (3cos(θ)cos(φ) ; 3cos(θ)sin(φ) ; 3sin(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]' },
  },
  v_surf_domain: {
    name: 'Domaine des paramètres trop grand ou trop petit',
    judges: ['param'],
    transform: T('v_surf_domain'),
    explain: (ctx = {}) => `y ≥ 0 veut dire sin φ ≥ 0, donc φ ∈ [0 ; π] ; z ≥ 0 donne ${ctx.r ?? 'les valeurs de r'}, avec r ≥ 0.`,
    check: { judge: { kind: 'param', surface: HEMI }, prev: 'Σ', line: 'σ(θ, φ) = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (θ ; φ) ∈ [0 ; π] × [0 ; 2π]' },
  },
  v_jacobian_surface: {
    name: 'Aire du domaine A au lieu de celle de Σ',
    judges: ['definite'],
    transform: T('v_jacobian_surface'),
    explain: (ctx = {}) => `Le domaine A n'a pas la même aire que Σ : chaque petit rectangle du dv devient un parallélogramme d'aire |σ_u ∧ σ_v| du dv${ctx.norm ? ` = ${ctx.norm} du dv` : ''}.`,
    check: { judge: { kind: 'definite', traps: { v_jacobian_surface: [{ line: '2π√2', ctx: { norm: 'r√(1 + 4r²)' } }] } }, prev: 'int(int(r sqrt(1+4r^2), r, 0, sqrt(2)), φ, 0, 2π)', line: '2π√2' },
  },
  v_normal_not_norm: {
    name: 'Une composante de σ_u ∧ σ_v au lieu de sa norme',
    judges: ['equiv', 'definite'],
    transform: T('v_normal_not_norm'),
    explain: () => 'Pour ∬ f ds, il faut la norme |σ_u ∧ σ_v|, pas une de ses composantes ni le vecteur.',
    check: { judge: { kind: 'equiv', vars: ['r', 'φ'], domain: { r: [0.1, 3] }, traps: { v_normal_not_norm: ['r'] } }, prev: 'sqrt((-2r^2 cos(φ))^2 + (-2r^2 sin(φ))^2 + r^2)', line: 'r' },
  },
  v_normal_flip: {
    name: 'Normale retournée d\'un seul côté',
    judges: ['vector', 'definite'],
    transform: T('v_normal_flip'),
    explain: (ctx = {}) => `Le cours n'exige pas une normale extérieure pour Stokes : il faut que le bord soit σ(∂A), avec la même paramétrisation. Tu as changé ${ctx.which ?? 'le sens de la normale'} sans changer l'autre membre.`,
    check: { judge: { kind: 'vector', params: ['r', 'φ'], symbols: {}, form: 'any', expect: 'r', traps: { v_normal_flip: ['-r'] } }, prev: 'rot F · N', line: '-r' },
  },
  v_normal_unit_twice: {
    name: 'Divisé par |σ_u ∧ σ_v|',
    judges: ['definite', 'vector'],
    transform: T('v_normal_unit_twice'),
    explain: () => 'Dans ∬ F · ds = ∬ F · (σ_u ∧ σ_v) du dv, la norme se simplifie : ν ds = (σ_u ∧ σ_v) du dv. On ne divise pas par |σ_u ∧ σ_v|.',
    check: { judge: { kind: 'definite', traps: { v_normal_unit_twice: ['16π'] } }, prev: 'int(int(8sin(θ), θ, 0, π), φ, 0, 2π)', line: '16π' },
  },
  v_curl_eval: {
    name: 'rot F constant multiplié par σ',
    judges: ['vector'],
    transform: T('v_curl_eval'),
    explain: (ctx = {}) => `rot F = ${ctx.c ?? 'une constante'} ne dépend pas du point : en σ(θ, φ), il vaut encore ${ctx.c ?? 'la même constante'}.`,
    check: { judge: { kind: 'vector', params: ['θ', 'φ'], symbols: {}, form: 'any', expect: '(0 ; 0 ; -2)', traps: { v_curl_eval: [{ line: '(0 ; 0 ; -6cos(θ))', ctx: { c: '(0, 0, −2)' } }] } }, prev: 'rot F(σ(θ, φ))', line: '(0 ; 0 ; -6cos(θ))' },
  },
  v_boundary_orient: {
    name: 'Bord parcouru dans l\'autre sens',
    judges: ['boundary'],
    explain: (ctx = {}) => `Avec ta paramétrisation, le bord σ(∂A) tourne dans le sens ${ctx.sense ?? 'fixé par σ_u ∧ σ_v'}. Ton morceau tourne dans l'autre sens : son intégrale change de signe.`,
    check: { judge: BOUNDARY, prev: '∂Σ', line: 'Γ2 : (3cos(t) ; -3sin(t) ; 0), t ∈ [0 ; 2π]' },
  },
  v_boundary_pieces: {
    name: 'Morceau du bord en trop',
    judges: ['boundary'],
    explain: () => 'Les côtés qui ont la même image, parcourue dans les deux sens, s\'annulent ; un côté qui devient un point ne compte pas. Ils ne font pas partie de ∂Σ.',
    check: { judge: BOUNDARY, prev: '∂Σ', line: 'Γ1 : (3sin(t) ; 0 ; 3cos(t)), t ∈ [0 ; π/2]' },
  },
  v_flux_normal_outward: {
    name: 'Normale d\'une face tournée vers l\'intérieur',
    judges: ['vector', 'definite'],
    transform: T('v_flux_normal_outward'),
    explain: (ctx = {}) => `Sur la face ${ctx.face ?? 'du bas'}, la normale extérieure pointe vers ${ctx.dir ?? 'l\'extérieur du volume'}.`,
    check: { judge: { kind: 'vector', params: [], symbols: {}, form: 'any', expect: '(0 ; 0 ; -1)', traps: { v_flux_normal_outward: [{ line: '(0 ; 0 ; 1)', ctx: { face: 'du bas (z = 0)', dir: 'le bas : ν = (0, 0, −1)' } }] } }, prev: 'ν', line: '(0 ; 0 ; 1)' },
  },
  v_jacobian_volume: {
    name: 'Jacobien oublié',
    judges: ['definite'],
    transform: T('v_jacobian_volume'),
    explain: (ctx = {}) => `En cylindriques, dx dy dz = r dr dφ dz${ctx.sph ? ' ; en sphériques, r² sin θ dr dθ dφ' : ''} : le facteur ${ctx.jac ?? 'r'} manque.`,
    check: { judge: { kind: 'definite', traps: { v_jacobian_volume: [{ line: '12π', ctx: { jac: 'r' } }] } }, prev: 'int(int(int(3r, r, 0, 1), φ, 0, 2π), z, 0, 2)', line: '12π' },
  },
  v_chain_sign: {
    name: 'Dérivée intérieure −1 oubliée',
    judges: [],
    explain: () => 'La dérivée de −x vaut −1 : elle multiplie (∂F₁/∂x)(−x, y). ∂/∂x [F₁(−x, y)] = −(∂F₁/∂x)(−x, y).',
    check: { bait: { skill: 'v-proof-identity', level: 2 } },
  },
};

// Traps of module A2, part i (step U6): what makes the catalogue's traps
// of this part work (the table itself is META in rules/a2.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain, check}}; explain()
// falls back on the catalogue's text.
//
// The generators of part i (js/content/uni/analyse2-i-*.js) write in the
// judge's configuration what the mistake gives on their item; each
// transform replays it when the field is there, whatever the previous line:
//   ode:    cfg._p = {res: [texts], icBefore: [texts], incomplete: [texts], ctx}
//           (a2-ode-particular: the general solution without y_p, the
//           constants fitted on y_h alone, y_p from an incomplete form);
//           cfg._choose = {sep: [{P, Q}], mu: [texts]} (a2-ode-choose);
//           cfg._exact = {noPhi: [texts], ctx} (a2-ode-exact: H without φ(y));
//           cfg.system.swapped (a2-ode-system: eigenvectors exchanged).
//   solset: cfg._stab = {closed, one: [texts], disc, ctx} (a2-ode-stability).
// wrongValues(item) gives the same wrong answers for multiple choices.

import { parse } from '../parse.js';
import { t } from '../../i18n.js';

const P = (text, dvar = 'x') => parse(String(text), { dvar });
const all = (texts, ctx, dvar) => (texts || []).map((t) => ({ node: P(t, dvar), ctx: ctx || {} }));
const odeV = (ctx) => ctx.cfg?.v || 'x';
const odesep = (P_, Q_, cfg) => ({ t: 'odesep', P: P(P_, cfg.v || 'x'), Q: P(Q_, cfg.v || 'x'), u: cfg.unknown || 'y', v: cfg.v || 'x' });

// The catalogue's examples, as the items write them.
const PART = { kind: 'ode', eq: "u''+9u=sin(3x)", unknown: 'u', order: 2, ic: { x: 0, y: 'π/6', dy: '-1/6' } };

export const DEFS = {
  a2_ode_ic_before_particular: {
    name: t('Conditions initiales posées sur y_h seule'),
    judges: ['ode'],
    transform: (prev, ctx) => all(ctx.cfg?._p?.icBefore, ctx.cfg?._p?.ctx, odeV(ctx)),
    wrongValues: (item) => item.wrong?.icBefore || [],
    explain: (ctx = {}) => (ctx.which
      ? t('Les conditions initiales portent sur la solution entière y = y_h + y_p, pas sur y_h seule. Avec ta solution, {which}(0) = {valeur} au lieu de {want}.', { which: ctx.which, valeur: ctx.valeur, want: ctx.want })
      : t('Les conditions initiales portent sur la solution entière y = y_h + y_p, pas sur y_h seule. Écris d’abord y = y_h + y_p, puis fixe C₁ et C₂.')),
    check: {
      judge: { ...PART, eq: "u''+u=x", ic: { x: 0, y: 1, dy: 0 }, _p: { icBefore: ['C_1 = 1 ; C_2 = 0', 'u = cos(x)+x'], ctx: { which: 'u′', valeur: '1', want: '0' } } },
      prev: 'u = C_1 cos(x)+C_2 sin(x)+x', line: 'C_1 = 1 ; C_2 = 0',
    },
  },
  a2_ode_resonance_no_x: {
    name: t('Résonance : facteur x oublié'),
    judges: ['ode'],
    transform: (prev, ctx) => all(ctx.cfg?._p?.res, ctx.cfg?._p?.ctx, odeV(ctx)),
    wrongValues: (item) => item.wrong?.res || [],
    explain: (ctx = {}) => (ctx.noX
      ? t('{noX} est une solution de l\'équation homogène : remplacée dans l\'équation, elle donne 0, jamais le second membre. Comme {root} est racine de l\'équation caractéristique, multiplie la forme par x : {withX}.', { noX: ctx.noX, root: ctx.root, withX: ctx.withX })
      : t('A cos 3x + B sin 3x est une solution de l’équation homogène : elle donne 0. Comme 3i est racine, multiplie par x.')),
    check: {
      judge: { ...PART, _p: { res: ['u = C_1 cos(3x)+C_2 sin(3x)', 'u = (π/6)cos(3x)-(1/18)sin(3x)'] } },
      prev: "u''+9u=sin(3x)", line: 'u = C_1 cos(3x) + C_2 sin(3x)',
    },
  },
  a2_ode_yp_incomplete: {
    name: t('Forme de y_p incomplète'),
    judges: ['ode'],
    transform: (prev, ctx) => all(ctx.cfg?._p?.incomplete, ctx.cfg?._p?.ctx, odeV(ctx)),
    wrongValues: (item) => item.wrong?.incomplete || [],
    check: {
      judge: { kind: 'ode', eq: "u''-2u'+5u=17sin(2x)", unknown: 'u', order: 2, final: 'particular', _p: { incomplete: ['u_p = 17sin(2x)'] } },
      prev: "u''-2u'+5u=17sin(2x)", line: 'u_p = 17sin(2x)',
    },
  },
  a2_ode_method_separable_sum: {
    name: t('Somme traitée comme un produit (séparable)'),
    judges: ['ode'],
    transform: (prev, ctx) => (ctx.cfg?._choose?.sep || []).map((s) => ({ node: odesep(s.P, s.Q, ctx.cfg), ctx: {} })),
    check: {
      judge: { kind: 'ode', eq: "y'=x+y", order: 1, _choose: { sep: [{ P: '1/(y)', Q: 'x' }] } },
      prev: "y'=x+y", line: 'dy/y = x dx',
    },
  },
  a2_ode_method_linear_nonlinear: {
    name: t('Équation non linéaire traitée comme linéaire'),
    judges: ['ode'],
    transform: (prev, ctx) => all(ctx.cfg?._choose?.mu, {}, odeV(ctx)),
    check: {
      judge: { kind: 'ode', eq: "y'=y^2", order: 1, yRange: [0.2, 2], _choose: { mu: ['μ = e^(-x y)'] } },
      prev: "y'=y^2", line: 'μ = e^(-x y)',
    },
  },
  a2_ode_stability_boundary: {
    name: t('Bornes comprises dans l\'ensemble de stabilité'),
    judges: ['solset'],
    transform: (prev, ctx) => (ctx.cfg?._stab?.closed ? [{ node: P(ctx.cfg._stab.closed), ctx: ctx.cfg._stab.ctx || {} }] : []),
    wrongValues: (item) => (item.stab ? [item.stab.closed] : []),
    check: {
      judge: { kind: 'solset', v: 'a', _stab: { closed: '[1 ; 2]', ctx: { borne: '2', racine: '0', sol: 'y = 1' } } },
      prev: 'a-1>0 et 4-a^2>0', line: '[1 ; 2]',
    },
  },
  a2_ode_stability_one_coef: {
    name: t('Une seule des deux conditions p > 0, q > 0'),
    judges: ['solset'],
    transform: (prev, ctx) => (ctx.cfg?._stab?.one || []).map((t) => ({ node: P(t), ctx: {} })),
    wrongValues: (item) => item.stab?.one || [],
    check: {
      judge: { kind: 'solset', v: 'a', _stab: { one: [']1 ; +∞[', ']-2 ; 2['] } },
      prev: 'a-1>0 et 4-a^2>0', line: ']1 ; +∞[',
    },
  },
  a2_ode_stability_discriminant: {
    name: t('Stabilité confondue avec Δ < 0'),
    judges: ['solset'],
    transform: (prev, ctx) => (ctx.cfg?._stab?.disc ? [{ node: P(ctx.cfg._stab.disc), ctx: {} }] : []),
    wrongValues: (item) => (item.stab?.disc ? [item.stab.disc] : []),
    check: {
      judge: { kind: 'solset', v: 'a', _stab: { disc: 'a<-1 ou a>3' } },
      prev: 'a-1>0 et 4-a^2>0', line: 'a<-1 ou a>3',
    },
  },
  a2_exact_phi_forgot: {
    name: t('φ(y) oubliée dans H'),
    judges: ['ode'],
    transform: (prev, ctx) => all(ctx.cfg?._exact?.noPhi, ctx.cfg?._exact?.ctx, odeV(ctx)),
    check: {
      judge: { kind: 'ode', eq: "(2x y+3)+(x^2+4y)y'=0", order: 1, ic: { x: 0, y: 1 }, final: 'implicit', yRange: [0.2, 3], firstIntegral: true, _exact: { noPhi: ['x^2 y+3x = C', 'x^2 y+3x = 0'], ctx: { N: 'x² + 4y', Hy: 'x²', phi: '2y²' } } },
      prev: "(2x y+3)+(x^2+4y)y'=0", line: 'x^2 y+3x = C',
    },
  },
  a2_ode_system_order: {
    name: t('Vecteurs propres associés aux mauvaises valeurs propres'),
    judges: ['ode'],
    transform: (prev, ctx) => (ctx.cfg?.system?.swapped ? [{ node: P(ctx.cfg.system.swapped, 't'), ctx: ctx.cfg.system.ctx || {} }] : []),
    explain: (ctx = {}) => (ctx.v
      ? t('{v} est vecteur propre pour λ = {l} : il va avec e^{{l}t}. Vérifie : A{v} = {Av} = {l}·{v}.', { v: ctx.v, l: ctx.l, Av: ctx.Av })
      : t('Chaque exponentielle e^{λt} va avec un vecteur propre de la même valeur propre λ : (1, −1) est vecteur propre pour −1, il va avec e^{−t}.')),
    check: {
      judge: { kind: 'ode', v: 't', system: { A: [['1', '2'], ['2', '1']], names: ['x', 'y'], X0: ['2', '0'], swapped: 'x = C_1 e^(3t)+C_2 e^(-t) ; y = -C_1 e^(3t)+C_2 e^(-t)', ctx: { v: '(1 ; −1)', l: '−1', Av: '(−1 ; 1)' } } },
      prev: "x' = x+2y ; y' = 2x+y", line: 'x = C_1 e^(3t)+C_2 e^(-t) ; y = -C_1 e^(3t)+C_2 e^(-t)',
    },
  },
};

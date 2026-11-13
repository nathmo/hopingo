// Traps of step U2, part g6c (spec §7): angular points, asymptotes, the
// full study, parametric arcs. Catalogue: docs/universite/G-gymnase-2.md,
// G6, « Pièges du module ». transform(prev, ctx) → [{node, ctx}], or a
// check {judge, prev, line} | {bait: {skill, level?, exam?}}.
//
// The limit traps read flags the generators put in the part's judge
// (ctx.cfg): `other` (the derivative of the piece on the other side of a
// junction), `slope` (the line is ẏ/ẋ), `ratio` (the line is y/x); they
// never fire elsewhere.

import { walk, stripParen, mul } from '../ast.js';
import { derivCandidates } from './g6.js';
import { parse } from '../parse.js';
import { toMathML } from '../mathml.js';
import { t } from '../../i18n.js';

const M = (n) => toMathML(stripParen(n));
const vOf = (ctx) => ctx?.v || 'x';

// Every d(|u|) of the line derived as |u′| (one d(…) at a time, its outer
// rule only or all the way in).
const absDerivs = (prev, v) => derivCandidates(prev, v, (info) => ({
  chain: (outer, inner, dInner, composed) => {
    if (stripParen(composed).t !== 'abs') return mul(outer, dInner);
    info.fired = true;
    info.u ??= inner;
    return { t: 'abs', e: dInner };
  },
}));

const frac = (n) => { n = stripParen(n); return n.t === 'frac' ? n : n.t === 'bin' && n.op === '÷' ? { n: n.l, d: n.r } : null; };
const invert = (prev) => { const f = frac(prev); return f ? [{ node: { t: 'frac', n: { t: 'paren', e: f.d }, d: { t: 'paren', e: f.n } }, ctx: {} }] : []; };

export const RULES = [
  {
    id: 'g6_abs_derivative', family: 'calculus', tag: 'E', skill: 'g6-angular-points', repair: 'g6-angular-points',
    judges: ['equiv'],
    name: t('Dérivée de |u| prise comme |u′|'),
    example: ['(|x² − 4|)′ = |2x|', t('(|x² − 4|)′ = 2x si |x| > 2, −2x si |x| < 2')],
    transform: (prev, ctx) => absDerivs(prev, vOf(ctx)),
    check: { judge: { kind: 'equiv', vars: ['x'], domain: { x: [-1.8, 1.8] }, target: 'no-prime' }, prev: 'd(|x^2-4|+3x)', line: '|2x|+3' },
    explain: (ctx = {}) => (ctx.u
      ? t('La dérivée de |u| dépend du <b>signe de u</b>, ici {u}, pas de celui de u′ : c\'est u′ là où u > 0, et −u′ là où u < 0. Écris f par morceaux, sans valeur absolue, puis dérive chaque morceau.', { u: M(ctx.u) })
      : t('La dérivée de |u| dépend du <b>signe de u</b>, pas de celui de u′ : c\'est u′ là où u > 0, et −u′ là où u < 0. Écris f par morceaux, sans valeur absolue, puis dérive chaque morceau.')),
  },
  {
    id: 'g6_angular_boundary', family: 'method', tag: 'C', skill: 'g6-angular-points', repair: 'g6-angular-points',
    judges: [],
    name: t('Cas limite d\'un point anguleux oublié (dérivée latérale nulle)'),
    example: ['a ∈ ]−∞ ; −2[ ∪ ]2 ; +∞[', 'a ∈ ]−∞ ; −2[ ∪ [2 ; +∞['],
    check: { bait: { skill: 'g6-angular-points', exam: 'mcq' } },
    explain: () => t('Quand une dérivée latérale est nulle, le signe des dérivées latérales ne décide pas : regarde le signe de f′ juste à côté du point, sur le morceau où la dérivée latérale vaut 0. (Source : barème du corrigé MAN 1B 2018, 1 point pour les cas limites.)'),
  },
  {
    id: 'g6_angular_not_seen', family: 'calculus', tag: 'E', skill: 'g6-angular-points', repair: 'g6-angular-points',
    judges: ['limit'],
    name: t('Point anguleux non vu : une seule formule des deux côtés'),
    example: [t('f′(2⁻) = 7 (formule de droite)'), 'f′(2⁻) = −1'],
    transform: (prev, ctx) => (ctx?.cfg?.other ? [{ node: parse(ctx.cfg.other), ctx: { other: ctx.cfg.other, at: ctx.cfg.to } }] : []),
    check: { judge: { kind: 'limit', v: 'x', to: '2', dir: '-', other: '2x+3' }, prev: '-2x+3', line: '7' },
    explain: (ctx = {}) => {
      const where = ctx.at ? t('En {a}', { a: String(ctx.at).replace('-', '−') }) : t('Au point de raccord');
      return ctx.other
        ? t('{where}, f change de formule. De chaque côté, il faut dériver le morceau de <b>ce côté-là</b> : {o} est la dérivée de l\'autre morceau. Si f′(a⁻) et f′(a⁺) diffèrent, f n\'est pas dérivable en a.', { where, o: M(parse(ctx.other)) })
        : t('{where}, f change de formule. De chaque côté, il faut dériver le morceau de <b>ce côté-là</b>. Si f′(a⁻) et f′(a⁺) diffèrent, f n\'est pas dérivable en a.', { where });
    },
  },
  {
    id: 'g6_oblique_h_forgot', family: 'calculus', tag: 'E', skill: 'g6-asymptotes', repair: 'g6-asymptotes',
    judges: ['equiv'],
    name: t('Asymptote oblique sans son ordonnée à l\'origine h'),
    example: [t('asymptote y = x'), t('asymptote y = x + 2')],
    // The line « y = mx + h » of the generators: m and h are letters given
    // by cfg.subst; forgetting h gives mx.
    transform: (prev, ctx) => {
      const s = ctx?.cfg?.subst;
      if (!s?.m || !s?.h) return [];
      let hasH = false;
      walk(prev, (n) => { if (n.t === 'sym' && n.name === 'h') hasH = true; return true; });
      return hasH ? [{ node: parse('m×x', { vars: ['x', 'm'] }), ctx: { h: s.h } }] : [];
    },
    check: { judge: { kind: 'equiv', vars: ['x', 'm', 'h'], subst: { m: '1', h: '2' }, target: 'only', finalVars: ['x'] }, prev: 'm×x+h', line: 'x' },
    explain: (ctx = {}) => t('m donne seulement la direction. Il faut encore h = lim (f(x) − mx){h} : l\'asymptote est décalée de h, y = mx + h.', { h: ctx.h ? ` = ${M(parse(ctx.h))}` : '' }),
  },
  {
    id: 'g6_vertical_any_zero', family: 'calculus', tag: 'E', skill: 'g6-asymptotes', repair: 'rat-simplify',
    judges: [],
    name: t('Asymptote verticale à chaque zéro du dénominateur'),
    example: [t('x = 2 asymptote de (x² − 4)/(x − 2)'), t('un trou en x = 2')],
    check: { bait: { skill: 'g6-asymptotes', exam: 'mcq' } },
    explain: () => t('Là où le numérateur s\'annule aussi, simplifie d\'abord : (x² − 4)/(x − 2) = x + 2, qui tend vers 4 en 2. Pas d\'asymptote verticale, seulement un trou.'),
  },
  {
    id: 'g6_sketch_crosses_asymptote', family: 'geometry', tag: 'E', skill: 'g6-study-full', repair: 'g6-asymptotes',
    judges: [],
    name: t('Branche du mauvais côté de l\'asymptote'),
    example: [t('f(x) − (x + 1) = 1/(x − 1) > 0 pour x > 1 : en dessous'), t('au-dessus')],
    check: { bait: { skill: 'g6-study-full', level: 4 } },
    explain: () => t('La position se lit sur le signe de f(x) − (mx + h) : positif, la courbe est <b>au-dessus</b> de l\'asymptote ; négatif, en dessous. Par exemple f(x) − (x + 1) = 1/(x − 1) > 0 pour x > 1.'),
  },
  {
    id: 'g6_param_slope_inverted', family: 'calculus', tag: 'E', skill: 'g6-param-tangent', repair: 'g6-param-tangent',
    judges: ['limit'],
    name: t('Pente d\'un arc paramétré prise comme ẋ/ẏ'),
    example: [t('pente ẋ/ẏ = 3'), t('pente ẏ/ẋ = 1/3')],
    transform: (prev, ctx) => (ctx?.cfg?.slope ? invert(prev) : []),
    check: { judge: { kind: 'limit', v: 't', to: '1', slope: true }, prev: '(2t-2)/(3t^2-3)', line: '3' },
    explain: () => t('La pente est dy/dx = ẏ/ẋ : y en haut, x en bas. Avec ẋ = 0 et ẏ ≠ 0, la tangente est <b>verticale</b> ; avec ẏ = 0 et ẋ ≠ 0, elle est horizontale.'),
  },
  {
    id: 'g6_param_ratio_inverted', family: 'calculus', tag: 'E', skill: 'g6-param-branches', repair: 'g6-param-branches',
    judges: ['limit'],
    name: t('Pente d\'une asymptote prise comme lim x/y'),
    example: ['m = lim x/y = 4/3', 'm = lim y/x = 3/4'],
    transform: (prev, ctx) => (ctx?.cfg?.ratio ? invert(prev) : []),
    check: { judge: { kind: 'limit', v: 't', to: '2', ratio: true }, prev: '((t+1)/(t-2))/(t^2/(t-2))', line: '4/3' },
    explain: () => t('La pente de l\'asymptote est m = lim y/x (y en haut). Avec x/y, tu obtiens 1/m.'),
  },
];

// Traps of step U2, part a1b (spec §7): transform(prev, ctx) → [{node, ctx}],
// or a check {judge, prev, line} | {counter, answers} | {bait: {skill}}.
// Catalogue: docs/universite/A1-analyse-1.md, « Pièges du module »
// (mean value theorem, Bernoulli-l'Hôpital, global extrema, study of a
// function, polar curves).

import { stripParen, div, sub, mul, pow, lit } from '../ast.js';
import { parse } from '../parse.js';
import { diff } from '../diff.js';
import { limit, targetOf } from '../limit.js';
import { exactValue } from '../normal.js';
import { toMathML } from '../mathml.js';
import { Q } from '../../math/rational.js';
import { t } from '../../i18n.js';

const M = (n) => toMathML(stripParen(n));
const fr = (x) => String(x).replace(/-/g, '−');

// Numerator and denominator of a quotient line, or null.
function quotient(node) {
  const n = stripParen(node);
  if (n.t === 'frac') return { f: n.n, g: n.d };
  if (n.t === 'bin' && n.op === '÷') return { f: n.l, g: n.r };
  return null;
}

// The limits of f and g at the judge's target.
function sideLimits(fg, ctx) {
  const cfg = ctx?.cfg || {};
  const v = cfg.v || ctx?.v || 'x';
  const t = targetOf(parse(String(cfg.to ?? '0')));
  const dir = cfg.dir ?? t.dir;
  const L = (e) => limit(e, v, t.to, dir).value;
  return { v, lf: L(fg.f), lg: L(fg.g) };
}
const isZero = (x) => (x instanceof Q ? x.n === 0 : typeof x === 'number' && Math.abs(x) < 1e-9);
const isInf = (x) => x === '+inf' || x === '-inf';
const indeterminate = ({ lf, lg }) => (isZero(lf) && isZero(lg)) || (isInf(lf) && isInf(lg));
const say = (x) => (x === '+inf' ? '+∞' : x === '-inf' ? '−∞' : x instanceof Q ? fr(x.toString()) : fr(Math.round(x * 1e4) / 1e4));

export const RULES = [
  {
    id: 'a1_bh_not_indeterminate', family: 'method', tag: 'C', skill: 'a1-bh', repair: 'a1-bh',
    judges: ['limit'],
    name: t('Bernoulli-l\'Hôpital appliqué sans forme indéterminée'),
    example: [t('(x + 1)/(x² + 3x + 1) en 0 : « = 1/3 par BH »'), t('la limite est 1/1 = 1')],
    check: { judge: { kind: 'limit', v: 'x', to: '0' }, prev: '(x+1)/(x^2+3x+1)', line: '1/(2x+3)' },
    transform: (prev, ctx) => {
      const fg = quotient(prev);
      if (!fg) return [];
      const s = sideLimits(fg, ctx);
      if (s.lf === null || s.lg === null || s.lf === 'none' || s.lg === 'none' || indeterminate(s) || isZero(s.lg)) return [];
      const dg = diff(fg.g, s.v);
      if (exactValue(dg)?.n === 0) return [];
      return [{ node: div(diff(fg.f, s.v), dg), ctx: { n: say(s.lf), d: say(s.lg), L: isInf(s.lf) ? say(s.lf) : null, f: fg.f, g: fg.g } }];
    },
    explain: (ctx = {}) => (ctx.n
      ? t('Au point, le numérateur tend vers {n} et le dénominateur vers {d} : ce n\'est pas une forme indéterminée, la limite se calcule directement{p1}. BH ne s\'applique qu\'à 0/0 et ∞/∞.', { n: ctx.n, d: ctx.d, p1: ctx.L ? '' : ` (${ctx.n}/${ctx.d})` })
      : t('Vérifie la forme avant d\'appliquer BH : si le numérateur et le dénominateur ont des limites finies et que celle du dénominateur n\'est pas 0, la limite se calcule directement. BH ne s\'applique qu\'à 0/0 et ∞/∞.')),
  },
  {
    id: 'a1_bh_quotient_rule', family: 'rule', tag: 'E', skill: 'a1-bh', repair: 'a1-bh',
    judges: ['limit'],
    name: t('BH : dériver le quotient au lieu du haut et du bas'),
    example: ['lim f/g = lim (f/g)′', 'lim f/g = lim f′/g′'],
    check: { judge: { kind: 'limit', v: 'x', to: '0' }, prev: '(e^(2x)-1-2x)/x^2', line: '((2e^(2x)-2)×x^2-(e^(2x)-1-2x)×2x)/x^4' },
    transform: (prev, ctx) => {
      const fg = quotient(prev);
      if (!fg) return [];
      const s = sideLimits(fg, ctx);
      if (!indeterminate(s)) return [];
      const node = div(sub(mul(diff(fg.f, s.v), fg.g), mul(fg.f, diff(fg.g, s.v))), pow(fg.g, lit(2)));
      return [{ node, ctx: { f: fg.f, g: fg.g } }];
    },
    explain: (ctx = {}) => t('BH dérive le haut et le bas séparément : lim f′/g′, pas la dérivée du quotient (f/g)′.{p1}', { p1: ctx.f ? t(' Ici f′ = {p1} et g′ = {p2}.', { p1: M(diff(ctx.f, 'x')), p2: M(diff(ctx.g, 'x')) }) : '' }),
  },
  {
    id: 'a1_bh_converse', family: 'logic', tag: 'C', skill: 'a1-bh', repair: 'a1-bh',
    judges: [],
    name: t('Réciproque de BH : « lim f′/g′ n\'existe pas, donc lim f/g non plus »'),
    example: [t('lim g′/h′ n\'existe pas ⇒ lim g/h n\'existe pas'), t('on ne peut rien conclure')],
    check: { bait: { skill: 'a1-bh', exam: 'tf' } },
    explain: () => t('BH ne va que dans un sens : si lim f′/g′ existe, lim f/g aussi. Si lim f′/g′ n\'existe pas, on ne peut rien dire. Exemple : g = x²·sin(1/x), h = x ; g/h → 0, mais g′/h′ = 2x·sin(1/x) − cos(1/x) n\'a pas de limite.'),
  },
  {
    id: 'a1_extrema_bounds_forgotten', family: 'method', tag: 'E', skill: 'a1-extrema-global', repair: 'a1-extrema-global',
    judges: ['value'],
    name: t('Extrema globaux cherchés seulement parmi les points où f′ = 0'),
    example: [t('max de x³ − 3x sur [0 ; 3] : « −2 » (seul point critique)'), 'f(3) = 18'],
    check: { judge: { kind: 'value', expect: '18', extrema: { kind: 'max', crit: [{ x: '1', y: '-2' }], ends: [{ x: '0', y: '0' }, { x: '3', y: '18' }] } }, prev: 'M', line: '-2' },
    // cfg.extrema = {kind: 'max'|'min', crit: [{x, y}], ends: [{x, y}]}:
    // the extremum taken among the critical points only.
    transform: (prev, ctx) => {
      const e = ctx?.cfg?.extrema;
      if (!e || !e.crit?.length) return [];
      const val = (t) => exactValue(parse(String(t)));
      const crit = e.crit.map((c) => ({ ...c, q: val(c.y) }));
      const pick = crit.reduce((a, b) => ((e.kind === 'max' ? b.q.cmp(a.q) > 0 : b.q.cmp(a.q) < 0) ? b : a));
      const ends = (e.ends || []).map((c) => ({ ...c, q: val(c.y) }));
      const best = ends.reduce((a, b) => (!a || (e.kind === 'max' ? b.q.cmp(a.q) > 0 : b.q.cmp(a.q) < 0) ? b : a), null);
      return [{ node: parse(String(pick.y)), ctx: { c: pick.x, fc: pick.y, a: best?.x, fa: best?.y, kind: e.kind } }];
    },
    explain: (ctx = {}) => (ctx.a
      ? t('Sur un segment, les bornes sont aussi candidates : f({a}) = {fa} {p1} f({c}) = {fc}.', { a: fr(ctx.a), fa: fr(ctx.fa), p1: ctx.kind === 'min' ? t('est plus petit que') : t('dépasse'), c: fr(ctx.c), fc: fr(ctx.fc) })
      : t('Sur un segment [a ; b], les candidats sont les bornes, les points où f′ = 0 et ceux où f′ n\'existe pas : compare toutes leurs valeurs.')),
  },
  {
    id: 'a1_rolle_without_hyp', family: 'logic', tag: 'C', skill: 'a1-mvt', repair: 'a1-mvt',
    judges: [],
    name: t('Rolle appliqué sans ses hypothèses'),
    example: [t('f(−1) = f(1) ⇒ ∃c : f′(c) = 0, pour f = |x|'), t('hypothèse « f dérivable » manquante')],
    check: { bait: { skill: 'a1-mvt' } },
    explain: () => t('Rolle demande f continue sur [a ; b], dérivable sur ]a ; b[ et f(a) = f(b). Sans ces hypothèses, il n\'y a pas forcément de c : |x| sur [−1 ; 1] n\'est pas dérivable en 0, et sa pente n\'est jamais nulle.'),
  },
  {
    id: 'a1_mvt_endpoints_values', family: 'rule', tag: 'E', skill: 'a1-mvt', repair: 'a1-mvt',
    judges: [],
    name: t('Taux d\'accroissement encadré par les valeurs de f au lieu de f′'),
    example: [t('encadrement par f(a) et f(b)'), t('encadrement par les valeurs de f′')],
    check: { bait: { skill: 'a1-mvt' } },
    explain: () => t('Le taux d\'accroissement (f(x) − f(y))/(x − y) est une valeur de f′ (TAF), pas de f : on encadre f′ sur l\'intervalle.'),
  },
  {
    id: 'a1_oblique_asymptote_slope_only', family: 'rule', tag: 'E', skill: 'a1-fn-study', repair: 'a1-fn-study',
    judges: [],
    name: t('Asymptote oblique : la pente sans l\'ordonnée à l\'origine'),
    example: [t('asymptote y = x'), 'y = x + 1'],
    check: { bait: { skill: 'a1-fn-study' } },
    explain: (ctx = {}) => t('f(x)/x → {p1} donne la pente ; il faut encore p = lim (f(x) − mx){p2}. Avec une division, p est le terme constant du quotient.', { p1: ctx.m ? fr(ctx.m) : 'm', p2: ctx.p ? ` = ${fr(ctx.p)}` : '' }),
  },
  {
    id: 'a1_polar_slope_naive', family: 'rule', tag: 'E', skill: 'a1-polar-curve', repair: 'a1-param-curve',
    judges: [],
    name: t('Pente d\'une courbe polaire prise égale à ρ̇'),
    example: ['y′ = ρ̇', 'y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ)'],
    check: { bait: { skill: 'a1-polar-curve' } },
    explain: () => t('ρ̇ dit comment le rayon change, pas la pente dans le plan. Dérive x = ρ cos φ et y = ρ sin φ : y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ).'),
  },
];

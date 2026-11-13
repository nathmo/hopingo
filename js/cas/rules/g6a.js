// Traps of step U2, part g6a (spec §7): module G6, derivatives of the table,
// tangent, limits, variation, convexity, optimisation. Catalogue:
// docs/universite/G-gymnase-2.md, G6, « Pièges du module ».
//
// transform(prev, ctx) → [{node, ctx}]: the line a student following the
// trap would write from prev (judges `equiv` and `limit`). The final-answer
// traps (an extremum, an inflection or a root kept where there is none) are
// options of decisions and multiple choices: check {bait: {skill, level?, exam?}}.

import { parse } from '../parse.js';
import { walk, getAt, replaceAt, mapNode, stripParen, dependsOn, add, sub, mul, div, neg, pow, num, fn } from '../ast.js';
import { diff } from '../diff.js';
import { toMathML } from '../mathml.js';
import { toText } from '../print.js';
import { limit, targetOf } from '../limit.js';
import { t } from '../../i18n.js';

const M = (n) => toMathML(stripParen(typeof n === 'string' ? parse(n) : n));
const par = (e) => ({ t: 'paren', e });
const vOf = (ctx) => ctx?.v || 'x';

// The derivative of a sum of c·g(x), with special(node) giving a wrong
// derivative for some g (null: the right one). info.fired says whether it
// was used.
function linDiff(node, v, special, info) {
  const s = special(node, v);
  if (s) { info.fired ??= node; return s; }
  const D = (n) => linDiff(n, v, special, info);
  switch (node.t) {
    case 'paren': return D(node.e);
    case 'neg': return neg(D(node.e));
    case 'bin':
      if (node.op === '+') return add(D(node.l), D(node.r));
      if (node.op === '-') return sub(D(node.l), D(node.r));
      if (node.op === '×' && !dependsOn(node.l, v)) return mul(node.l, D(node.r));
      if (node.op === '×' && !dependsOn(node.r, v)) return mul(D(node.l), node.r);
      return diff(node, v);
    case 'frac':
      if (!dependsOn(node.d, v)) return div(par(D(node.n)), node.d);
      return diff(node, v);
    default: return diff(node, v);
  }
}

// Candidates: every d(…) of prev computed, with the wrong table entry for
// one kind of term (each one in turn), then for all of them at once.
function tableCandidates(prev, v, special) {
  const paths = [];
  walk(prev, (n, path) => {
    if (n.t === 'deriv' && n.v === v && n.n === 1) { paths.push(path); return false; }
    return true;
  });
  const run = (only) => {
    const info = {};
    let out = prev;
    const sp = (n, w) => (only === null || toText(stripParen(n)) === only ? special(n, w) : null);
    for (const path of paths) {
      const d = getAt(prev, path);
      out = replaceAt(out, path, par(linDiff(d.e, v, sp, info)));
    }
    return info.fired ? { node: out, ctx: { g: info.fired } } : null;
  };
  // The terms the wrong entry applies to.
  const keys = new Set();
  for (const path of paths) walk(getAt(prev, path).e, (n) => { if (special(n, v)) keys.add(toText(stripParen(n))); return true; });
  const out = [];
  try {
    for (const k of keys) { const c = run(k); if (c) out.push(c); }
    if (keys.size > 1) { const c = run(null); if (c) out.push(c); }
  } catch { return out; }
  return out;
}

// aˣ (a constant, the exponent depends on x), eˣ and exp(u).
const expPart = (n, v) => {
  n = stripParen(n);
  if (n.t === 'pow' && !dependsOn(n.b, v) && dependsOn(n.e, v)) return { b: n.b, u: n.e };
  if (n.t === 'fn' && n.name === 'exp') return { b: { t: 'const', name: 'e' }, u: n.args[0] };
  return null;
};

// The sign of the limit of a sum: ∞ − ∞ written as 0.
function limOf(node, cfg, v) {
  const { to, dir } = targetOf(parse(String(cfg?.to ?? '0')));
  try { return limit(node, v, to, cfg?.dir ?? dir).value; } catch { return null; }
}
const INF = new Set(['+inf', '-inf']);

// √P with P ~ c·x² (c > 0) at −∞: √P = |x|·√(P/x²) = −x·√(P/x²).
function sqrtSquares(prev, v) {
  const out = [];
  walk(prev, (n, path) => {
    if (n.t !== 'sqrt' || !dependsOn(n.e, v)) return true;
    const c = limOf({ t: 'frac', n: n.e, d: pow({ t: 'sym', name: v }, num(2)) }, { to: '-∞' }, v);
    if (c && typeof c === 'object' && c.n > 0) out.push(path);
    return true;
  });
  return out;
}

export const RULES = [
  {
    id: 'g6_power_rule_exp', family: 'calculus', tag: 'E', skill: 'g6-deriv-usual', repair: 'g6-deriv-usual',
    judges: ['equiv'],
    name: t('Règle des puissances appliquée à une exponentielle'),
    example: ['(2ˣ)′ = x·2ˣ⁻¹', '(2ˣ)′ = 2ˣ·ln 2'],
    check: { judge: { kind: 'equiv', vars: ['x'], dvar: 'x', target: 'no-prime', domain: { x: [0.2, 3] } }, prev: 'd(2^x+x^3)', line: 'x×2^(x-1)+3x^2' },
    transform: (prev, ctx) => tableCandidates(prev, vOf(ctx), (n, v) => {
      const p = expPart(n, v);
      if (!p) return null;
      return mul(mul(par(p.u), pow(p.b, par(sub(p.u, num(1))))), diff(p.u, v));
    }),
    explain: (ctx = {}) => (ctx.g
      ? t('La règle nxⁿ⁻¹ vaut quand <b>l\'exposant</b> est constant. Dans {g}, c\'est la base qui est constante : (aˣ)′ = aˣ·ln a, et (eˣ)′ = eˣ.', { g: M(ctx.g) })
      : t('La règle nxⁿ⁻¹ vaut quand <b>l\'exposant</b> est constant. Ici c\'est la base qui est constante : (aˣ)′ = aˣ·ln a, et (eˣ)′ = eˣ.')),
  },
  {
    id: 'g6_cos_sign', family: 'sign', tag: 'E', skill: 'g6-deriv-usual', repair: 'g6-deriv-usual',
    judges: ['equiv'],
    name: t('Signe de la dérivée de cos (ou de sin)'),
    example: ['(cos x)′ = sin x', '(cos x)′ = −sin x'],
    check: { judge: { kind: 'equiv', vars: ['x'], dvar: 'x', target: 'no-prime', domain: { x: [0.2, 3] } }, prev: 'd(3cos(x)+x^2)', line: '3sin(x)+2x' },
    transform: (prev, ctx) => tableCandidates(prev, vOf(ctx), (n, v) => {
      n = stripParen(n);
      if (n.t !== 'fn' || n.args.length !== 1 || !dependsOn(n.args[0], v)) return null;
      const u = n.args[0];
      if (n.name === 'cos') return mul(fn('sin', u), diff(u, v));
      if (n.name === 'sin') return mul(neg(fn('cos', u)), diff(u, v));
      return null;
    }),
    explain: () => t('cos descend quand x passe de 0 à π/2 : sa dérivée y est négative. (cos x)′ = −sin x, et (sin x)′ = cos x, sans signe moins.'),
  },
  {
    id: 'g6_tangent_slope_function', family: 'calculus', tag: 'E', skill: 'g6-tangent', repair: 'g6-tangent',
    judges: ['equiv'],
    name: t('Pente de la tangente laissée en fonction de x'),
    example: ['y = f(2) + f′(x)(x − 2)', 'y = f(2) + f′(2)(x − 2)'],
    // The item's tangent segment says what f(a), f′(x) and a are.
    check: {
      judge: { kind: 'equiv', vars: ['x', 'y'], subst: { y: '5+10(x-2)' }, domain: { x: [-3, 3] }, target: 'expanded', tangent: { fa: '5', dfx: '3x^2-2', dfa: '10', a: '2' } },
      prev: 'y', line: '5+(3x^2-2)(x-2)',
    },
    transform: (prev, ctx) => {
      const t = ctx?.cfg?.tangent;
      if (!t) return [];
      return [{ node: parse(`${t.fa}+(${t.dfx})(x-(${t.a}))`), ctx: t }];
    },
    explain: (ctx = {}) => (ctx.dfx
      ? t('Une tangente est une droite : sa pente est un <b>nombre</b>, f′({a}) = {dfa}, pas la fonction f′(x) = {dfx}. Calcule f′ en {a}.', { a: ctx.a, dfa: M(ctx.dfa), dfx: M(ctx.dfx) })
      : t('Une tangente est une droite : sa pente est un <b>nombre</b>, f′(a), pas la fonction f′(x). Calcule f′ au point a.')),
  },
  {
    id: 'g6_infinity_minus_infinity', family: 'calculus', tag: 'E', skill: 'g6-limits', repair: 'g6-limits',
    judges: ['limit'],
    name: t('∞ − ∞ pris pour 0'),
    example: ['lim (√(x² + 4x) − x) = 0', 'lim (√(x² + 4x) − x) = 2'],
    check: { judge: { kind: 'limit', v: 'x', to: '+∞' }, prev: '√(x^2+4x)-x', line: '0' },
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const n = stripParen(prev);
      if (n.t !== 'bin' || (n.op !== '+' && n.op !== '-')) return [];
      const a = limOf(n.l, ctx?.cfg, v);
      const b = limOf(n.r, ctx?.cfg, v);
      if (!INF.has(a) || !INF.has(b)) return [];
      const clash = n.op === '-' ? a === b : a !== b;
      return clash ? [{ node: num(0), ctx: {} }] : [];
    },
    explain: () => t('∞ − ∞ n\'est pas 0 : les deux termes grandissent, mais l\'un peut rester en avance sur l\'autre (de 2, par exemple). Multiplie par l\'expression conjuguée pour le voir.'),
  },
  {
    id: 'g6_sqrt_x2_abs', family: 'calculus', tag: 'E', skill: 'g6-limits', repair: 'g1-abs-eq',
    judges: ['limit'],
    name: t('√(x²) = x quand x → −∞'),
    example: [t('√(4x² + 1)/(x + 3) → 2 en −∞'), t('√(4x² + 1)/(x + 3) → −2 en −∞')],
    check: { judge: { kind: 'limit', v: 'x', to: '-∞' }, prev: '√(4x^2+1)/(x+3)', line: '√(4+1/x^2)/(1+3/x)' },
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const to = ctx?.cfg?.to;
      if (!to || !String(to).startsWith('-')) return [];
      const paths = sqrtSquares(prev, v);
      if (!paths.length) return [];
      let out = prev;
      for (const p of paths) out = replaceAt(out, p, par(neg(getAt(prev, p))));
      return [{ node: out, ctx: {} }];
    },
    explain: () => t('√(x²) = |x|, et pour x &lt; 0, |x| = −x : en −∞, √(x²·u) = −x·√u. Le signe de ta limite change.'),
  },
  {
    id: 'g6_critical_is_extremum', family: 'calculus', tag: 'E', skill: 'g6-sign-variation', repair: 'g6-sign-variation',
    judges: [],
    name: t('Point critique pris pour un extremum'),
    example: [t('f′(0) = 0 pour x³, donc extremum en 0'), t('f′ ne change pas de signe en 0 : pas d\'extremum')],
    check: { bait: { skill: 'g6-sign-variation', level: 2 } },
    explain: (ctx = {}) => t('f′({a}) = 0, mais f′ a le même signe des deux côtés : f continue de monter (ou de descendre). Pour un extremum, il faut que f′ <b>change de signe</b>.', { a: ctx.a !== undefined ? ctx.a : 'a' }),
  },
  {
    id: 'g6_inflection_f2_zero', family: 'calculus', tag: 'E', skill: 'g6-convexity', repair: 'g6-convexity',
    judges: [],
    name: t('Zéro de f″ pris pour un point d\'inflexion'),
    example: [t('f″(0) = 0 pour x⁴, donc inflexion en 0'), t('f″ ne change pas de signe en 0 : pas d\'inflexion')],
    check: { bait: { skill: 'g6-convexity', level: 2 } },
    explain: () => t('f″(a) = 0, mais f″ garde le même signe des deux côtés : la concavité ne change pas. Un point d\'inflexion demande que f″ <b>change de signe</b> (x⁴ en 0 n\'en a pas).'),
  },
  {
    id: 'g6_optim_outside_domain', family: 'method', tag: 'E', skill: 'g6-optim', repair: 'g6-optim',
    judges: [],
    name: t('Racine de la dérivée gardée hors du domaine'),
    example: [t('x = 20/3 retenu pour la boîte 16 × 10'), t('x = 2 : 20/3 > 5 est hors du domaine')],
    check: { bait: { skill: 'g6-optim', level: 2 } },
    explain: () => t('Cette racine de la dérivée n\'est pas dans le domaine : pour elle, l\'objet n\'existe pas (une longueur deviendrait négative). Garde seulement les racines du domaine.'),
  },
];

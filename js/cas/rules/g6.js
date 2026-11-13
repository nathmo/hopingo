// Traps of module G6 (analyse de base), spec §7. Catalogue:
// docs/universite/G-gymnase-2.md, « Pièges du module ».
//
// Each transform(prev, ctx) returns the lines a student following the trap
// would write from the previous line: [{node, ctx}]. The trap is applied
// at one d(…) of the line, either to its outer rule only (the other
// derivatives stay to be computed) or everywhere inside it.

import { walk, getAt, replaceAt, add, sub, mul, div, pow, num, stripParen } from '../ast.js';
import { diff, stepDeriv } from '../diff.js';
import { toMathML } from '../mathml.js';
import { t } from '../../i18n.js';

const M = (n) => toMathML(stripParen(n));

// Candidates for one hook set (made fresh for each try by makeHooks(info)).
export function derivCandidates(prev, v, makeHooks) {
  const paths = [];
  walk(prev, (n, path) => {
    if (n.t === 'deriv' && n.v === v && n.n === 1) { paths.push(path); return false; }
    return true;
  });
  const out = [];
  for (const path of paths) {
    const d = getAt(prev, path);
    for (const scope of ['top', 'all']) {
      const info = {};
      let repl;
      try {
        const hooks = makeHooks(info);
        repl = scope === 'top' ? stepDeriv(d.e, v, hooks).node : diff(d.e, v, hooks);
      } catch { continue; }
      if (!info.fired) continue;
      out.push({ node: replaceAt(prev, path, { t: 'paren', e: repl }), ctx: info });
    }
  }
  return out;
}

const vOf = (ctx) => ctx?.v || 'x';

// The outer function of a composition, in words.
function outerName(e) {
  e = stripParen(e);
  if (e.t === 'fn') return e.name;
  if (e.t === 'sqrt') return t('la racine');
  if (e.t === 'pow') return e.b.t === 'const' && e.b.name === 'e' ? t('l\'exponentielle') : t('la puissance');
  return t('la fonction extérieure');
}

export const RULES = [
  {
    id: 'g6_product_naive', family: 'calculus', tag: 'R', skill: 'g6-deriv-rules', repair: 'g6-deriv-rules',
    judges: ['equiv'],
    name: t('Dérivée d\'un produit prise comme produit des dérivées'),
    example: ['(x²·sin(3x))′ = 2x·3cos(3x)', '(x²·sin(3x))′ = 2x·sin(3x) + 3x²·cos(3x)'],
    transform: (prev, ctx) => derivCandidates(prev, vOf(ctx), (info) => ({
      product: (u, w, du, dw) => { info.fired = true; info.u ??= u; info.w ??= w; return mul(du, dw); },
    })),
    explain: (ctx = {}) => (ctx.u
      ? t('La dérivée d\'un produit n\'est pas le produit des dérivées. Contrôle avec x·x = x² : ta règle donne 1·1 = 1, la vraie dérivée est 2x. Ici u = {u} et v = {v}, et (uv)′ = u′v + uv′.', { u: M(ctx.u), v: M(ctx.w) })
      : t('La dérivée d\'un produit n\'est pas le produit des dérivées. Contrôle avec x·x = x² : ta règle donne 1·1 = 1, la vraie dérivée est 2x. (uv)′ = u′v + uv′.')),
  },
  {
    id: 'g6_chain_forgot', family: 'calculus', tag: 'R', skill: 'g6-deriv-rules', repair: 'g6-deriv-rules',
    judges: ['equiv'],
    name: t('Règle de chaîne oubliée'),
    example: ['(sin(3x))′ = cos(3x)', '(sin(3x))′ = 3cos(3x)'],
    transform: (prev, ctx) => derivCandidates(prev, vOf(ctx), (info) => ({
      chain: (outer, inner, dInner, composed) => {
        info.fired = true;
        if (!info.inner) Object.assign(info, { outer, inner, composed, name: outerName(composed) });
        return outer;
      },
    })),
    explain: (ctx = {}) => (ctx.inner
      ? t('Tu as dérivé {name}, mais pas ce qu\'il y a dedans : la dérivée de {i} est {di}, et elle multiplie {o}.', { name: ctx.name, i: M(ctx.inner), di: M(diff(ctx.inner, 'x')), o: M(ctx.outer) })
      : t('Tu as dérivé la fonction extérieure, mais pas ce qu\'il y a dedans : (f(g))′ = f′(g)·g′. Par exemple (sin 3x)′ = 3cos 3x.')),
  },
  {
    id: 'g6_quotient_sign', family: 'calculus', tag: 'E', skill: 'g6-deriv-rules', repair: 'g6-deriv-rules',
    judges: ['equiv'],
    name: t('Signe ou ordre faux dans la règle du quotient'),
    example: ['((2x+1)/(x²+1))′ = (2(x²+1) + (2x+1)·2x)/(x²+1)²', '((2x+1)/(x²+1))′ = (2(x²+1) − (2x+1)·2x)/(x²+1)²'],
    transform: (prev, ctx) => [
      ...derivCandidates(prev, vOf(ctx), (info) => ({
        quotient: (u, w, du, dw) => { info.fired = true; info.w ??= w; return div(add(mul(du, w), mul(u, dw)), pow(w, num(2))); },
      })),
      ...derivCandidates(prev, vOf(ctx), (info) => ({
        quotient: (u, w, du, dw) => { info.fired = true; info.w ??= w; return div(sub(mul(u, dw), mul(du, w)), pow(w, num(2))); },
      })),
    ],
    explain: () => t('Dans la règle du quotient, c\'est u′v <b>moins</b> uv′, dans cet ordre : (u/v)′ = (u′v − uv′)/v². Contrôle avec 1/x : ta formule donne +1/x², la vraie dérivée est −1/x².'),
  },
  {
    id: 'g6_quotient_no_square', family: 'calculus', tag: 'E', skill: 'g6-deriv-rules', repair: 'g6-deriv-rules',
    judges: ['equiv'],
    name: t('Dénominateur pas au carré dans la règle du quotient'),
    example: ['((2x+1)/(x²+1))′ = (2(x²+1) − (2x+1)·2x)/(x²+1)', '((2x+1)/(x²+1))′ = (2(x²+1) − (2x+1)·2x)/(x²+1)²'],
    transform: (prev, ctx) => derivCandidates(prev, vOf(ctx), (info) => ({
      quotient: (u, w, du, dw) => { info.fired = true; info.w ??= w; return div(sub(mul(du, w), mul(u, dw)), w); },
    })),
    explain: (ctx = {}) => (ctx.w
      ? t('Le dénominateur de la règle du quotient est v², ici {v} : (u/v)′ = (u′v − uv′)/v².', { v: M(pow(ctx.w, num(2))) })
      : t('Le dénominateur de la règle du quotient est v² : (u/v)′ = (u′v − uv′)/v².')),
  },
];

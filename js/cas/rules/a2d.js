// Traps of module A2, part d (step U6): what makes the catalogue's traps
// of this part work (the table itself is META in rules/a2.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain, check}}; explain()
// falls back on the catalogue's text.
//
// Implicit functions (js/content/uni/analyse2-d-implicit.js). The value
// parts carry cfg.imp:
//   {role: 'first', num, den, var, value, others: [{v, value}]}: the part
//       asks g_u = −num/den (num = F_u(p), den = F_w(p), w = var the
//       eliminated variable, others: F_v(p) of the other variables);
//   {role: 'second', wrong2, value}: the part asks g_uu, wrong2 is the
//       value with w kept constant.
// The derived identity is an `equiv` part with cfg.implicit = {w: 'p',
// p: 'q'}: a2_implicit_second_const replays d(…) without the term p·∂/∂w.
//
// Integrals with a parameter t, x the variable of integration
// (analyse2-d-param.js): the traps replay themselves on d(∫ f dx, t) and on
// ∂f/∂t written pd(f, t); the parts after the formula carry cfg.leib =
// {noInt, sign, inner} (texts in t: F′ without the integral, with the
// lower term's sign changed, and the integral term), so that a wrong final
// line is named whatever the previous line.

import { parse } from '../parse.js';
import { toMathML } from '../mathml.js';
import { walk, replaceAt, stripParen, dependsOn, mapNode, add, sub, mul, sym } from '../ast.js';
import { diff, substVar } from '../diff.js';
import { Q } from '../../math/rational.js';

const M = (n) => toMathML(stripParen(typeof n === 'string' ? parse(n, { vars: ['x', 'y', 'z', 't'] }) : n));
const par = (e) => ({ t: 'paren', e });
const qOf = (s) => { const [n, d = '1'] = String(s).split('/'); return new Q(Number(n), Number(d)); };
const qT = (x) => (x.d === 1 ? String(x.n) : `${x.n}/${x.d}`);
const num = (x) => parse(qT(x));
const fr = (s) => String(s).replace(/-/g, '−');
const imp = (ctx) => ctx?.cfg?.imp || null;

// One candidate per sub-expression matching pred, replaced by fn(node).
function each(prev, pred, fn) {
  const out = [];
  walk(prev, (n, path) => {
    if (pred(n)) {
      let r = null;
      try { r = fn(n); } catch { r = null; }
      if (r) out.push({ node: replaceAt(prev, path, par(r.node ?? r)), ctx: r.ctx ?? {} });
      return false;
    }
    return true;
  });
  return out;
}

const T = 't';
const X = 'x';
const isInt = (n) => n.t === 'int' && !!n.lo;
// d(∫ from a to b of f dx, t) with f depending on t.
const isParamDeriv = (n) => n.t === 'deriv' && n.v === T && n.n === 1 && isInt(stripParen(n.e)) && dependsOn(stripParen(n.e).e, T);
// ∂f/∂t of an integrand f(x, t).
const isPartialT = (n) => n.t === 'deriv' && n.v === T && n.n === 1 && !isInt(stripParen(n.e)) && dependsOn(n.e, X);
// The two bound terms f(b, t)·b′ and f(a, t)·a′ of d(∫ f dx, t).
function ends(I) {
  const at = (b) => substVar(I.e, I.v, b);
  return { up: mul(at(I.hi), diff(I.hi, T)), low: mul(at(I.lo), diff(I.lo, T)) };
}
const leib = (ctx) => ctx?.cfg?.leib || null;
const fromCfg = (ctx, key) => {
  const l = leib(ctx);
  if (!l?.[key]) return [];
  return [{ node: parse(l[key], { vars: ['t'] }), ctx: { terme: l.inner ? M(l.inner) : null } }];
};

export const DEFS = {
  a2_implicit_sign: {
    name: 'Signe moins oublié dans g′ = −F_x/F_y',
    judges: ['value'],
    check: { judge: { kind: 'value', expect: '-3/4', imp: { role: 'first', num: '3', den: '4', var: 'y', value: '-3/4', others: [] } }, prev: '-F_x/F_y', line: '3/4' },
    transform: (prev, ctx) => {
      const m = imp(ctx);
      if (m?.role !== 'first' || qOf(m.num).n === 0) return [];
      return [{ node: num(qOf(m.num).div(qOf(m.den))), ctx: { valeur: fr(m.value), var: m.var } }];
    },
    explain: (ctx = {}) => `Dérive F = 0 le long de la fonction implicite : F_x + F_${ctx.var || 'y'}·g′ = 0, donc g′ = −F_x/F_${ctx.var || 'y'}${ctx.valeur ? ` = ${ctx.valeur}` : ''}. Le signe moins vient de ce passage de l'autre côté.`,
  },
  a2_implicit_inverted: {
    name: 'Fraction −F_x/F_y inversée',
    judges: ['value'],
    check: { judge: { kind: 'value', expect: '-3/4', imp: { role: 'first', num: '3', den: '4', var: 'y', value: '-3/4', others: [] } }, prev: '-F_x/F_y', line: '-4/3' },
    transform: (prev, ctx) => {
      const m = imp(ctx);
      if (m?.role !== 'first' || qOf(m.num).n === 0) return [];
      return [{ node: num(qOf(m.den).div(qOf(m.num)).neg()), ctx: { var: m.var } }];
    },
    explain: (ctx = {}) => `Au dénominateur : la dérivée de la variable qui devient la fonction, ici ${ctx.var || 'y'}. g′ = −F_x/F_${ctx.var || 'y'}, pas −F_${ctx.var || 'y'}/F_x.`,
  },
  a2_implicit_second_const: {
    name: 'g″ calculée en gardant y constant',
    judges: ['value', 'equiv'],
    check: {
      judge: { kind: 'equiv', vars: ['x', 'y', 'p', 'q'], implicit: { y: 'p', p: 'q' }, target: 'no-prime', domain: { x: [-2, 2], y: [-2, 2], p: [-2, 2], q: [-2, 2] } },
      prev: 'd(2x+y+(x+3y^2) p)', line: '2+p+(x+3y^2)q',
    },
    transform: (prev, ctx) => {
      const m = imp(ctx);
      if (m?.role === 'second') return [{ node: parse(m.wrong2), ctx: {} }];
      const im = ctx?.cfg?.implicit;
      if (!im) return [];
      const w = Object.keys(im).find((k) => im[k] === 'p');
      const q = im.p;
      if (!w || !q) return [];
      const v = ctx.cfg.vars?.[0] || 'x';
      let changed = false;
      const node = mapNode(prev, (n) => {
        if (n.t !== 'deriv' || n.n !== 1 || n.v !== v) return n;
        changed = true;
        return par(add(diff(n.e, v), mul(sym(q), diff(n.e, 'p'))));
      });
      return changed ? [{ node, ctx: { var: w } }] : [];
    },
    explain: (ctx = {}) => `${ctx.var || 'y'} = g(x) dépend de x : en dérivant F_x + F_${ctx.var || 'y'}·p, chaque terme en ${ctx.var || 'y'} donne aussi sa dérivée par rapport à ${ctx.var || 'y'}, fois p = g′ (règle de chaîne).`,
  },
  a2_implicit_wrong_var: {
    name: 'Mauvaise dérivée au dénominateur (3 variables)',
    judges: ['value'],
    check: { judge: { kind: 'value', expect: '-10/3', imp: { role: 'first', num: '10', den: '3', var: 'z', value: '-10/3', others: [{ v: 'x', value: '-4' }] } }, prev: '-F_y/F_z', line: '5/2' },
    transform: (prev, ctx) => {
      const m = imp(ctx);
      if (m?.role !== 'first') return [];
      return (m.others || []).filter((o) => qOf(o.value).n !== 0).map((o) => ({ node: num(qOf(m.num).div(qOf(o.value)).neg()), ctx: { var: m.var, autre: o.v } }));
    },
    explain: (ctx = {}) => `La fonction est ${ctx.var || 'z'} = g(…) : c'est F_${ctx.var || 'z'} qui va au dénominateur${ctx.autre ? `, pas F_${ctx.autre}` : ''}.`,
  },
  a2_leibniz_wrong_var: {
    name: 'Intégrande dérivée par rapport à x',
    judges: ['equiv'],
    check: { judge: { kind: 'equiv', vars: ['x', 't'], domain: { x: [0, 1], t: [0.5, 2] }, target: 'no-prime' }, prev: 'pd(arctan(t x),t)', line: 't/(1+t^2x^2)' },
    transform: (prev) => [
      ...each(prev, isPartialT, (n) => ({ ...n, v: X })),
      ...each(prev, isParamDeriv, (n) => {
        const I = stripParen(n.e);
        const { up, low } = ends(I);
        return add(sub(up, low), { t: 'int', e: { t: 'deriv', e: I.e, v: X, n: 1 }, v: I.v, lo: I.lo, hi: I.hi });
      }),
    ],
  },
  a2_leibniz_no_integral: {
    name: 'Règle de Leibniz sans l\'intégrale de ∂f/∂t',
    judges: ['equiv'],
    check: {
      judge: { kind: 'equiv', vars: ['t'], domain: { t: [0.3, 2] }, target: 'no-int', goal: '(2+2cos(t^2)-4cos(t^4))/t' },
      prev: 'd(int((1-cos(x t))/x,x,t,t^3),t)', line: '(2+cos(t^2)-3cos(t^4))/t',
    },
    transform: (prev, ctx) => [
      ...each(prev, isParamDeriv, (n) => {
        const I = stripParen(n.e);
        const { up, low } = ends(I);
        return { node: sub(up, low), ctx: { terme: M({ t: 'int', e: diff(I.e, T), v: I.v, lo: I.lo, hi: I.hi }) } };
      }),
      ...fromCfg(ctx, 'noInt'),
    ],
    explain: (ctx = {}) => `t est aussi dans l'intégrande : il manque le 3e terme, ∫ ∂f/∂t dx${ctx.terme ? ` = ${ctx.terme}` : ''}. Les bornes ne donnent que les deux premiers.`,
  },
  a2_leibniz_sign: {
    name: 'Signe du terme de la borne du bas',
    judges: ['equiv'],
    check: {
      judge: { kind: 'equiv', vars: ['t'], domain: { t: [0.3, 2] }, target: 'no-int', goal: '(2+2cos(t^2)-4cos(t^4))/t' },
      prev: 'd(int((1-cos(x t))/x,x,t,t^3),t)', line: '(4-4cos(t^4))/t',
    },
    transform: (prev, ctx) => [
      ...each(prev, isParamDeriv, (n) => {
        const I = stripParen(n.e);
        const { up, low } = ends(I);
        return add(add(up, low), { t: 'int', e: diff(I.e, T), v: I.v, lo: I.lo, hi: I.hi });
      }),
      ...fromCfg(ctx, 'sign'),
    ],
    explain: () => 'La borne du bas compte avec un signe moins : ∫ₐᵇ = F(b) − F(a), donc le terme f(a(t), t)·a′(t) est retranché.',
  },
};

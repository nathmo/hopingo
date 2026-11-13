// Traps of step U2, part a1d (spec §7): methods of integration. Catalogue:
// docs/universite/A1-analyse-1.md, « Pièges du module ».
//
// transform(prev, ctx) → [{node, ctx}]: the line a student following the
// trap writes from the previous one. Each trap rewrites one ∫ of the line
// (∫ f dx, or ∫ from a to b, rewritten with a bracket), so the rest of the
// line is kept. The judges compare candidates with their own equivalence
// (same derivative for `antideriv`, same value for `definite`). Some traps
// read what the item put in its judge's cfg:
//   prims:  {[toText(integrand)]: primitive text}  (the factor of u′ lost)
//   change: {t: 'sqrt(x)', x: 't^2'}               (t = φ(x) and x = ψ(t))
// Traps without a transform carry check {bait}: the items offer them as a
// decision option, or the judge itself answers (`stay` for « + C »).

import { parse } from '../parse.js';
import { walk, getAt, replaceAt, stripParen, dependsOn, mapNode, contains, symbolsIn, num, sym, add, sub, mul, div, pow, neg } from '../ast.js';
import { diff, substVar } from '../diff.js';
import { toMathML } from '../mathml.js';
import { toText } from '../print.js';
import { exactValue } from '../normal.js';
import { evalFloat } from '../numeric.js';
import { t } from '../../i18n.js';

const M = (n) => toMathML(stripParen(n));
const par = (e) => ({ t: 'paren', e });
const fn = (name, ...args) => ({ t: 'fn', name, args });
const fr = (x) => String(Math.round(x * 1e4) / 1e4).replace('.', ',').replace('-', '−');

// Every ∫ of the line: {path, node}.
function ints(prev) {
  const out = [];
  walk(prev, (n, path) => { if (n.t === 'int') out.push({ path, node: n }); return true; });
  return out;
}

// G written in place of ∫ g: G itself for ∫ g dv, the bracket [G] from a to
// b for a definite integral.
const asPrim = (I, G) => (I.lo ? { t: 'bracket', e: G, v: I.v, lo: I.lo, hi: I.hi } : par(G));
const intOf = (I, e, v = I.v, lo = I.lo, hi = I.hi) => (lo ? { t: 'int', e, v, lo, hi } : { t: 'int', e, v });

// Candidates: each ∫ of prev (filtered) replaced by what fn returns.
function eachInt(prev, fnc, pred = () => true) {
  const out = [];
  for (const { path, node } of ints(prev)) {
    if (!pred(path, node)) continue;
    let r;
    try { r = fnc(node, path); } catch { r = null; }
    for (const c of r || []) {
      // A definite candidate without a value (0/0 inside the interval)
      // would match any line: left out.
      if (node.lo && !symbolsIn(c.node).size && !Number.isFinite(evalFloat(c.node, {}))) continue;
      out.push({ node: replaceAt(prev, path, c.node), ctx: c.ctx ?? {} });
    }
  }
  return out;
}

// A primitive of the simple factors of an integration by parts: c, xⁿ,
// e^(ax + b), sin(ax), cos(ax), and constant multiples. null otherwise.
export function simplePrim(n, v) {
  n = stripParen(n);
  if (!dependsOn(n, v)) return mul(n, sym(v));
  if (n.t === 'sym' && n.name === v && !n.sub) return div(pow(sym(v), num(2)), num(2));
  if (n.t === 'neg') { const p = simplePrim(n.e, v); return p && neg(p); }
  if (n.t === 'pow') {
    const b = stripParen(n.b);
    if (b.t === 'sym' && b.name === v && !dependsOn(n.e, v)) {
      const k = exactValue(n.e);
      if (k && k.eq(-1)) return null;
      const e1 = add(n.e, num(1));
      return div(pow(b, e1), e1);
    }
    if (b.t === 'const' && b.name === 'e') {
      const a = diff(n.e, v);
      return dependsOn(a, v) ? null : div(n, a);
    }
    return null;
  }
  if (n.t === 'fn' && n.args.length === 1 && ['sin', 'cos', 'exp'].includes(n.name)) {
    const a = diff(n.args[0], v);
    if (dependsOn(a, v)) return null;
    if (n.name === 'sin') return div(neg(fn('cos', n.args[0])), a);
    if (n.name === 'cos') return div(fn('sin', n.args[0]), a);
    return div(n, a);
  }
  if (n.t === 'bin' && n.op === '×') {
    if (!dependsOn(n.l, v)) { const p = simplePrim(n.r, v); return p && mul(n.l, p); }
    if (!dependsOn(n.r, v)) { const p = simplePrim(n.l, v); return p && mul(p, n.r); }
    return null;
  }
  if (n.t === 'frac' && !dependsOn(n.d, v)) { const p = simplePrim(n.n, v); return p && div(p, n.d); }
  return null;
}

// The factors of a product (constants kept with the rest).
function factors(n) {
  n = stripParen(n);
  if (n.t === 'bin' && n.op === '×') return [...factors(n.l), ...factors(n.r)];
  return [n];
}
const product = (fs) => fs.reduce((p, f) => (p ? mul(p, f) : f), null) ?? num(1);

// Ways to integrate f by parts: {u, dv, V} with f = u·dv and V = ∫ dv.
function ibpSplits(f, v) {
  let body = stripParen(f);
  let scale = null;
  if (body.t === 'frac' && !dependsOn(body.d, v)) { scale = body.d; body = stripParen(body.n); }
  const fs = factors(body).filter((x) => dependsOn(x, v));
  const consts = factors(body).filter((x) => !dependsOn(x, v));
  if (fs.length < 2) return [];
  const out = [];
  fs.forEach((dv, i) => {
    const V0 = simplePrim(dv, v);
    if (!V0) return;
    let u = product([...consts, ...fs.filter((_, j) => j !== i)]);
    if (scale) u = div(u, scale);
    out.push({ u, dv, V: V0 });
  });
  return out;
}

// The integral is subtracted: A − ∫…, or A − c·∫….
function subtracted(prev, path) {
  for (let k = path.length; k > 0; k--) {
    const parent = getAt(prev, path.slice(0, k - 1));
    const key = path[k - 1];
    if (parent.t === 'bin' && parent.op === '-' && key === 'r') return true;
    if (parent.t === 'neg') return true;
    if (!(parent.t === 'paren' || (parent.t === 'bin' && parent.op === '×'))) return false;
  }
  return false;
}

const T_SQ = (t) => ({ t: 'frac', n: mul(num(2), t), d: add(num(1), pow(t, num(2))) });

export const RULES = [
  {
    id: 'a1_int_arctg_as_log', family: 'rule', tag: 'E', skill: 'a1-int-direct', repair: 'g6-antideriv-usual',
    judges: ['antideriv', 'definite'],
    name: t('Arctg pris pour un Log'),
    example: ['∫ 1/(1 + x²) dx = Log(1 + x²)', '∫ 1/(1 + x²) dx = Arctg x'],
    check: { judge: { kind: 'antideriv', v: 'x', domain: { x: [-3, 3] } }, prev: 'int(1/(1+x^2),x)', line: 'ln(1+x^2)+C' },
    // ∫ c/(u² + a) → κ·Log(u² + a): a sum of a positive number and a
    // square or an even power in the denominator.
    transform: (prev) => eachInt(prev, (I) => {
      const f = stripParen(I.e);
      if (f.t !== 'frac') return null;
      const d = stripParen(f.d);
      if (d.t !== 'bin' || d.op !== '+') return null;
      const k = exactValue(d.l) ?? exactValue(d.r);
      const other = exactValue(d.l) ? d.r : d.l;
      if (!k || k.n <= 0 || stripParen(other).t !== 'pow') return null;
      const c = exactValue(f.n);
      const ks = [...new Set([1, 1 / 2, ...(c ? [c.valueOf(), c.valueOf() / 2] : [])])];
      return ks.map((x) => ({ node: asPrim(I, mul(parse(String(x)), fn('ln', d))), ctx: { d, f } }));
    }),
    explain: (ctx = {}) => (ctx.d
      ? t('Dérive Log({d}) : tu obtiens {p1}/({d2}), pas {f}. Une fraction en 1/(1 + u²) donne un Arctg : ∫ u′/(1 + u²) = Arctg u.', { d: M(ctx.d), p1: M(diff(ctx.d, 'x')), d2: M(ctx.d), f: M(ctx.f) })
      : t('Dérive Log(1 + x²) : 2x/(1 + x²), pas 1/(1 + x²). ∫ u′/(1 + u²) = Arctg u.')),
  },
  {
    id: 'a1_int_missing_inner_factor', family: 'rule', tag: 'E', skill: 'a1-int-direct', repair: 'a1-int-direct',
    judges: ['antideriv', 'definite'],
    name: t('Facteur de u′ oublié dans une primitive'),
    example: ['∫ x/(1 + x⁴) dx = Arctg(x²)', '∫ x/(1 + x⁴) dx = ½Arctg(x²)'],
    check: { judge: { kind: 'antideriv', v: 'x', domain: { x: [-3, 3] }, prims: { [toText(parse('x/(1+x^4)'))]: '(1/2)arctan(x^2)' } }, prev: 'int(x/(1+x^4),x)', line: 'arctan(x^2)+C' },
    // The item's primitive F of this integrand, times a wrong constant.
    transform: (prev, ctx = {}) => {
      const prims = ctx.cfg?.prims;
      if (!prims) return [];
      return eachInt(prev, (I) => {
        const F = prims[toText(I.e)];
        if (!F) return null;
        return [2, 3, 4, 1 / 2, 1 / 3, 1 / 4, -1].map((k) => ({ node: asPrim(I, mul(parse(k === -1 ? '-1' : k < 1 ? `1/${Math.round(1 / k)}` : String(k)), par(parse(F)))), ctx: { k } }));
      });
    },
    explain: (ctx = {}) => (ctx.k === -1
      ? t('Dérive ta primitive : le signe est faux. La dérivée de u, ici, est négative (−sin x pour cos x) : elle change le signe.')
      : ctx.k
        ? t('Dérive ta primitive : {p1}. La dérivée de u apporte une constante : divise par elle.', { p1: ctx.k > 1 ? t('il y a un facteur {k} de trop', { k: ctx.k }) : t('il manque un facteur {p1}', { p1: Math.round(1 / ctx.k) }) })
        : t('Dérive Arctg(x²) : 2x/(1 + x⁴). Il y a un facteur 2 de trop : la primitive est ½Arctg(x²).')),
  },
  {
    id: 'a1_int_no_constant', family: 'notation', tag: 'E', skill: 'a1-int-direct', repair: 'a1-int-direct',
    judges: [],
    name: t('Constante d\'intégration oubliée'),
    example: ['∫ 2x dx = x²', '∫ 2x dx = x² + C'],
    // No transform: the antideriv judge answers `stay` (« N'oublie pas la
    // constante »); the items list the trap among their baits.
    check: { bait: { skill: 'a1-int-direct', level: 1 } },
    explain: () => t('N\'oublie pas la constante : les primitives sont toutes de la forme F + C (par exemple x² + C pour 2x).'),
  },
  {
    id: 'a1_subst_dx_kept', family: 'rule', tag: 'E', skill: 'a1-int-subst', repair: 'a1-int-subst',
    judges: ['antideriv', 'definite'],
    name: t('dx remplacé par dt sans le facteur φ′(t)'),
    example: ['t = √x : ∫ dx/(√x(1 + √x)) = ∫ dt/(t(1 + t))', '∫ 2 dt/(1 + t)'],
    check: { judge: { kind: 'antideriv', v: 'x', domain: { x: [0.2, 3] }, subst: { t: 'sqrt(x)' }, change: { t: 'sqrt(x)', x: 't^2' } }, prev: 'int(1/(√x(1+√x)),x)', line: 'int(1/(t(1+t)),t)' },
    transform: (prev, ctx = {}) => {
      const ch = ctx.cfg?.change;
      if (!ch) return [];
      const t = Object.keys(ch).find((k) => k !== 'x') || 't';
      const phi = parse(ch[t]);
      const psi = parse(ch.x, { vars: [t] });
      return eachInt(prev, (I) => {
        if (I.v !== 'x') return null;
        const e = substVar(I.e, 'x', par(psi));
        const lo = I.lo && substVar(phi, 'x', par(I.lo));
        const hi = I.hi && substVar(phi, 'x', par(I.hi));
        return [{ node: intOf(I, e, t, lo, hi), ctx: { dphi: diff(psi, t), t } }];
      });
    },
    explain: (ctx = {}) => (ctx.dphi
      ? t('Quand tu changes de variable, dx = {dphi} d{p1} : ce facteur manque dans ton intégrale.', { dphi: M(ctx.dphi), p1: ctx.t })
      : t('Avec t = √x, x = t² et dx = 2t dt : ce facteur 2t manque dans ton intégrale.')),
  },
  {
    id: 'a1_subst_bounds_kept', family: 'rule', tag: 'E', skill: 'a1-int-subst', repair: 'a1-int-subst',
    judges: ['definite'],
    name: t('Bornes en x gardées après le changement de variable'),
    example: ['t = √x : ∫₁⁴ dx/(√x(1 + √x)) = ∫₁⁴ 2 dt/(1 + t)', '∫₁² 2 dt/(1 + t)'],
    check: { judge: { kind: 'definite', change: { t: 'sqrt(x)', x: 't^2' } }, prev: 'int(1/(√x(1+√x)),x,1,4)', line: 'int(2/(1+t),t,1,4)' },
    transform: (prev, ctx = {}) => {
      const ch = ctx.cfg?.change;
      if (!ch) return [];
      const t = Object.keys(ch).find((k) => k !== 'x') || 't';
      const phi = parse(ch[t]);
      const psi = parse(ch.x, { vars: [t] });
      return eachInt(prev, (I) => {
        if (I.v !== 'x' || !I.lo) return null;
        const e = mul(par(substVar(I.e, 'x', par(psi))), par(diff(psi, t)));
        const ta = substVar(phi, 'x', par(I.lo));
        const tb = substVar(phi, 'x', par(I.hi));
        return [{ node: intOf(I, e, t, I.lo, I.hi), ctx: { a: I.lo, b: I.hi, ta, tb, t } }];
      });
    },
    explain: (ctx = {}) => (ctx.a
      ? t('Les bornes changent avec la variable : quand x va de {a} à {b}, {p1} va de {ta} à {tb}.', { a: M(ctx.a), b: M(ctx.b), p1: ctx.t, ta: M(ctx.ta), tb: M(ctx.tb) })
      : t('Les bornes changent avec la variable : avec t = √x, quand x va de 1 à 4, t va de 1 à 2.')),
  },
  {
    id: 'a1_ibp_sign', family: 'sign', tag: 'E', skill: 'a1-int-parts', repair: 'a1-int-parts',
    judges: ['antideriv', 'definite'],
    name: t('Signe de la deuxième IPP pas distribué'),
    example: ['x²e^(2x)/2 − ∫ x e^(2x) = x²e^(2x)/2 − x e^(2x)/2 − ∫ e^(2x)/2', '… + ∫ e^(2x)/2'],
    check: { judge: { kind: 'antideriv', v: 'x', domain: { x: [-2, 2] } }, prev: 'x^2×e^(2x)/2-int(x×e^(2x),x)', line: 'x^2×e^(2x)/2-x×e^(2x)/2-int(e^(2x)/2,x)' },
    // A − ∫u·v′ → A − u·v − ∫u′·v: the − does not reach the second term.
    transform: (prev) => eachInt(prev, (I) => ibpSplits(I.e, I.v).map(({ u, V }) => ({
      node: par(add(asPrim(I, mul(u, V)), intOf(I, mul(diff(u, I.v), V)))),
    })), (path) => subtracted(prev, path)),
    explain: () => t('Le − devant la deuxième intégration par parties porte sur toute la parenthèse : A − (uv − ∫u′v) = A − uv <b>+</b> ∫u′v.'),
  },
  {
    id: 'a1_ibp_plus', family: 'rule', tag: 'E', skill: 'a1-int-parts', repair: 'a1-int-parts',
    judges: ['antideriv', 'definite'],
    name: t('Formule d\'intégration par parties avec un +'),
    example: ['∫ uv′ = uv + ∫ u′v', '∫ uv′ = uv − ∫ u′v'],
    check: { judge: { kind: 'antideriv', v: 'x', domain: { x: [-2, 2] } }, prev: 'int(x×e^x,x)', line: 'x×e^x+int(e^x,x)' },
    transform: (prev) => eachInt(prev, (I) => ibpSplits(I.e, I.v).map(({ u, V }) => ({
      node: par(add(asPrim(I, mul(u, V)), intOf(I, mul(diff(u, I.v), V)))),
    })), (path) => !subtracted(prev, path)),
    explain: () => t('Dérive uv : (uv)′ = u′v + uv′. Donc ∫ uv′ = uv <b>−</b> ∫ u′v.'),
  },
  {
    id: 'a1_int_product', family: 'distribute', tag: 'R', skill: 'a1-int-parts', repair: 'a1-int-direct',
    judges: ['antideriv', 'definite'],
    name: t('Primitive d\'un produit prise comme produit des primitives'),
    example: ['∫ x²e^(2x) dx = (x³/3)(e^(2x)/2)', t('intégration par parties')],
    check: { judge: { kind: 'antideriv', v: 'x', domain: { x: [-2, 2] } }, prev: 'int(x^2×e^(2x),x)', line: '(x^3/3)×(e^(2x)/2)+C' },
    transform: (prev) => eachInt(prev, (I) => {
      const fs = factors(I.e).filter((x) => dependsOn(x, I.v));
      if (fs.length !== 2) return null;
      const consts = factors(I.e).filter((x) => !dependsOn(x, I.v));
      const a = simplePrim(fs[0], I.v);
      const b = simplePrim(fs[1], I.v);
      if (!a || !b) return null;
      return [{ node: asPrim(I, mul(product([...consts, par(a)]), par(b))), ctx: { a, b } }];
    }),
    explain: (ctx = {}) => t('La primitive d\'un produit n\'est pas le produit des primitives : dérive {p1}, c\'est un produit, il y a deux termes, et aucun n\'est la fonction de départ. Il faut une intégration par parties.', { p1: ctx.a ? `(${M(ctx.a)})·(${M(ctx.b)})` : '(x³/3)(e^(2x)/2)' }),
  },
  {
    id: 'a1_ibp_boundary_term', family: 'rule', tag: 'C', skill: 'a1-int-parts', repair: 'a1-int-parts',
    judges: ['definite'],
    name: t('Terme de bord [uv] oublié dans une IPP définie'),
    example: ['∫₀¹ x eˣ dx = −∫₀¹ eˣ dx', '[x eˣ]₀¹ − ∫₀¹ eˣ dx'],
    check: { judge: { kind: 'definite' }, prev: 'int(x×e^x,x,0,1)', line: '-int(e^x,x,0,1)' },
    transform: (prev) => eachInt(prev, (I) => ibpSplits(I.e, I.v).map(({ u, V }) => {
      let val = NaN;
      try { val = evalFloat({ t: 'bracket', e: mul(u, V), v: I.v, lo: I.lo, hi: I.hi }, {}); } catch { /* unknown */ }
      return { node: neg(intOf(I, mul(diff(u, I.v), V))), ctx: { a: I.lo, b: I.hi, val } };
    }), (path, I) => !!I.lo),
    explain: (ctx = {}) => (ctx.a && Number.isFinite(ctx.val)
      ? t('Le terme [uv] entre {a} et {b} vaut {val} ici : il ne disparaît que si uv prend la même valeur aux deux bornes.', { a: M(ctx.a), b: M(ctx.b), val: fr(ctx.val) })
      : t('Il manque le terme de bord : ∫ₐᵇ uv′ = [uv]ₐᵇ − ∫ₐᵇ u′v. Il ne disparaît que si uv prend la même valeur aux deux bornes.')),
  },
  {
    id: 'a1_reduction_index', family: 'rule', tag: 'E', skill: 'a1-int-reduction', repair: 'a1-int-reduction',
    judges: ['definite'],
    name: t('Coefficient décalé dans une formule de récurrence'),
    example: ['Jₙ = e − (n − 1)Jₙ₋₁', 'Jₙ = e − n·Jₙ₋₁'],
    check: { judge: { kind: 'definite', seq: { J: 'int(x^n×e^x,x,0,1)' }, param: 'n', recurrence: true }, prev: 'bracket(x^n×e^x,x,0,1)-n×int(x^(n-1)×e^x,x,0,1)', line: 'e-(n-1)×J_(n-1)' },
    // n·(∫ or J) → (n − 1)·… or (n + 1)·….
    transform: (prev, ctx = {}) => {
      const p = ctx.cfg?.param || 'n';
      const out = [];
      walk(prev, (n, path) => {
        if (n.t !== 'bin' || n.op !== '×') return true;
        const l = stripParen(n.l);
        if (!(l.t === 'sym' && l.name === p && !l.sub)) return true;
        if (!contains(n.r, (m) => m.t === 'int' || (m.t === 'sym' && !!m.sub))) return true;
        for (const k of [-1, 1]) {
          const c = par(k < 0 ? sub(sym(p), num(1)) : add(sym(p), num(1)));
          out.push({ node: replaceAt(prev, path, { ...n, l: c }), ctx: { k, cfg: ctx.cfg } });
        }
        return true;
      });
      return out;
    },
    explain: (ctx = {}) => {
      let j1 = '';
      const seq = ctx.cfg?.seq;
      if (seq) {
        const [name, text] = Object.entries(seq)[0];
        const p = ctx.cfg.param || 'n';
        const v = evalFloat(substVar(parse(text), p, num(1)), {});
        if (Number.isFinite(v)) j1 = t(' Teste n = 1 : {name}₁ = {v}.', { name, v: fr(v) });
      }
      return t('u = xⁿ donne u′ = n·xⁿ⁻¹ : le coefficient est n, ni n − 1 ni n + 1.{j1}', { j1 });
    },
  },
  {
    id: 'a1_des_wrong_form', family: 'rule', tag: 'E', skill: 'a1-int-rational', repair: 'g0-pfd-general',
    judges: [],
    name: t('Mauvaise forme de la décomposition en éléments simples'),
    example: ['B/(x² + 2x + 5)', '(Bx + C)/(x² + 2x + 5)'],
    // A decision option of a1-int-rational (the form of the DES).
    check: { bait: { skill: 'a1-int-rational', level: 2 } },
    explain: () => t('Sur un facteur de degré 2 sans racine, le numérateur est de degré 1 : Bx + C. Pour une racine double a, il faut A/(x − a) et B/(x − a)². Sans eux, le système n\'a pas de solution.'),
  },
  {
    id: 'a1_arctg_scale', family: 'rule', tag: 'E', skill: 'a1-int-rational', repair: 'a1-int-direct',
    judges: ['antideriv', 'definite'],
    name: t('Arctg sans le facteur 1/a'),
    example: ['∫ dx/((x + 1)² + 4) = Arctg(x + 1)', '½Arctg((x + 1)/2)'],
    check: { judge: { kind: 'antideriv', v: 'x', domain: { x: [-3, 3] } }, prev: 'int(1/((x+1)^2+4),x)', line: 'arctan(x+1)+C' },
    // ∫ c/(u² + a²) with a ≠ 1 → c·Arctg u, c·Arctg(u/a) or (c/a)·Arctg u.
    transform: (prev) => eachInt(prev, (I) => {
      const f = stripParen(I.e);
      if (f.t !== 'frac' || dependsOn(f.n, I.v)) return null;
      const d = stripParen(f.d);
      if (d.t !== 'bin' || d.op !== '+') return null;
      const s = exactValue(d.r) ?? exactValue(d.l);
      const sq = stripParen(exactValue(d.r) ? d.l : d.r);
      if (!s || s.n <= 0 || s.eq(1) || sq.t !== 'pow' || !exactValue(sq.e)?.eq(2)) return null;
      const u = sq.b;
      const a = { t: 'sqrt', e: parse(String(s)) };
      const c = f.n;
      return [
        mul(c, fn('arctan', u)),
        mul(c, fn('arctan', div(par(u), a))),
        mul(div(c, a), fn('arctan', u)),
      ].map((G) => ({ node: asPrim(I, G), ctx: { a: Math.sqrt(s.valueOf()) } }));
    }),
    explain: (ctx = {}) => t('∫ du/(u² + a²) = (1/a)·Arctg(u/a) : le a apparaît deux fois.{p1} Dérive ta ligne pour le voir.', { p1: ctx.a ? t(' Ici a = {a}.', { a: fr(ctx.a) }) : '' }),
  },
  {
    id: 'a1_int_log_of_denominator', family: 'rule', tag: 'E', skill: 'a1-int-rational', repair: 'a1-int-direct',
    judges: ['antideriv', 'definite'],
    name: t('Log du dénominateur quel que soit le numérateur'),
    example: ['∫ (x + 5)/((x − 1)(x² + 2x + 5)) dx = Log|(x − 1)(x² + 2x + 5)|', t('décomposition en éléments simples')],
    check: { judge: { kind: 'antideriv', v: 'x', domain: { x: [1.5, 4] } }, prev: 'int((x+5)/((x-1)(x^2+2x+5)),x)', line: 'ln(|(x-1)(x^2+2x+5)|)+C' },
    transform: (prev) => eachInt(prev, (I) => {
      const f = stripParen(I.e);
      if (f.t !== 'frac' || !dependsOn(f.d, I.v)) return null;
      let d = stripParen(f.d);
      if (d.t === 'sqrt') d = stripParen(d.e);
      return [{ node: asPrim(I, fn('ln', { t: 'abs', e: d })), ctx: { d } }];
    }),
    explain: (ctx = {}) => t('Log|Q| a pour dérivée Q′/Q{p1} : le numérateur n\'est pas Q′. Il faut une autre méthode (décomposition en éléments simples, changement de variable).', { p1: ctx.d ? t(', ici {p1}/({d})', { p1: M(diff(ctx.d, 'x')), d: M(ctx.d) }) : '' }),
  },
  {
    id: 'a1_trig_subst_dx', family: 'rule', tag: 'E', skill: 'a1-int-trig', repair: 'a1-int-trig',
    judges: ['antideriv'],
    name: t('t = tan(x/2) sans le facteur 2/(1 + t²)'),
    example: ['t = tan(x/2) : dx = dt', 'dx = 2 dt/(1 + t²)'],
    check: { judge: { kind: 'antideriv', v: 'x', domain: { x: [0.3, 2.8] }, subst: { t: 'tan(x/2)' } }, prev: 'int(1/sin(x),x)', line: 'int((1+t^2)/(2t),t)' },
    transform: (prev, ctx = {}) => {
      const s = ctx.cfg?.subst?.t;
      if (!s || toText(parse(s)) !== toText(parse('tan(x/2)'))) return [];
      const t = sym('t');
      return eachInt(prev, (I) => {
        if (I.v !== 'x') return null;
        const e = mapNode(I.e, (n) => {
          if (n.t === 'fn' && n.name === 'sin' && toText(n.args[0]) === 'x') return par(T_SQ(t));
          if (n.t === 'fn' && n.name === 'cos' && toText(n.args[0]) === 'x') return par({ t: 'frac', n: sub(num(1), pow(t, num(2))), d: add(num(1), pow(t, num(2))) });
          return n;
        });
        if (dependsOn(e, 'x')) return null;
        return [{ node: intOf(I, e, 't') }];
      });
    },
    explain: () => t('Avec t = tan(x/2), x = 2 Arctg t, donc dx = 2 dt/(1 + t²) : ce facteur manque.'),
  },
  {
    id: 'a1_hyper_identity_sign', family: 'sign', tag: 'E', skill: 'a1-int-hyper', repair: 'g2-hyp-formulas',
    judges: ['equiv', 'antideriv'],
    name: t('Identité trigonométrique appliquée aux hyperboliques'),
    example: ['2cosh²t = 2 − 2sinh²t', '2cosh²t = 2 + 2sinh²t'],
    check: { judge: { kind: 'equiv', vars: ['t'], domain: { t: [-2, 2] } }, prev: '2cosh(t)^2', line: '2-2sinh(t)^2' },
    // cos² + sin² = 1 used for cosh and sinh: cosh²u → 1 − sinh²u, sinh²u → 1 − cosh²u.
    transform: (prev) => {
      const out = [];
      walk(prev, (n, path) => {
        const b = n.t === 'pow' && exactValue(n.e)?.eq(2) ? stripParen(n.b) : null;
        if (b?.t === 'fn' && (b.name === 'cosh' || b.name === 'sinh')) {
          const other = { t: 'fn', name: b.name === 'cosh' ? 'sinh' : 'cosh', args: b.args };
          out.push({ node: replaceAt(prev, path, par(sub(num(1), pow(other, num(2))))) });
        }
        return true;
      });
      return out;
    },
    explain: () => t('Pour les hyperboliques, c\'est cosh² − sinh² = 1, pas cosh² + sinh² = 1 : donc 1 + sinh²t = cosh²t.'),
  },
];


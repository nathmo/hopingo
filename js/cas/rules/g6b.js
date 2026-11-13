// Traps of step U2, part g6b (spec §7): primitives, areas, implicit
// derivatives. Catalogue: docs/universite/G-gymnase-2.md, G6, « Pièges du
// module ». transform(prev, ctx) → [{node, ctx}]; check: see
// tests/judges.test.js (checkTrap).
//
// The primitive traps replay the table of usual primitives (tableTerms,
// primText, also used by the generators of js/content/uni/analyse0-b.js)
// on each ∫ … dx of the previous line, with one rule changed. The area trap
// drops the absolute value of ∫|f − g| (judge `definite`). The implicit
// traps differentiate the previous line's d(…) with y a function of x
// (judge `equiv` with cfg.implicit = {y: 'p'}), y′ = p forgotten or the
// product x·y differentiated wrongly.

import { parse } from '../parse.js';
import { Q } from '../../math/rational.js';
import { walk, replaceAt, mapNode, numValue, stripParen, dependsOn, symbolsIn, contains, add, mul, sym, num } from '../ast.js';
import { diff } from '../diff.js';
import { toMathML } from '../mathml.js';
import { toText } from '../print.js';
import { t } from '../../i18n.js';

const M = (n) => toMathML(stripParen(n));
const par = (e) => ({ t: 'paren', e });

// ---------- the table of usual primitives ----------

// A term of an integrand: {c: Q, kind: 'pow' | 'exp' | 'cos' | 'sin' | 'atan', n?: Q, a?: Q}.
const scale = (t, k) => (t ? { ...t, c: t.c.mul(k) } : null);

// The coefficient a of a·x, or null.
function linearCoef(n, v) {
  n = stripParen(n);
  if (n.t === 'sym' && n.name === v && !n.sub) return new Q(1);
  if (n.t === 'neg') { const a = linearCoef(n.e, v); return a && a.neg(); }
  if (n.t === 'bin' && n.op === '×') {
    const l = numValue(n.l);
    if (l) { const a = linearCoef(n.r, v); return a && a.mul(l); }
    const r = numValue(n.r);
    if (r) { const a = linearCoef(n.l, v); return a && a.mul(r); }
  }
  return null;
}

const isOnePlusX2 = (n, v) => [`1+${v}^2`, `${v}^2+1`].includes(toText(stripParen(n)));

export function classify(n, v = 'x') {
  n = stripParen(n);
  const k = numValue(n);
  if (k) return { c: k, kind: 'pow', n: new Q(0) };
  if (n.t === 'neg') return scale(classify(n.e, v), -1);
  if (n.t === 'sym' && n.name === v && !n.sub) return { c: new Q(1), kind: 'pow', n: new Q(1) };
  if (n.t === 'sqrt' && linearCoef(n.e, v)?.eq(1)) return { c: new Q(1), kind: 'pow', n: new Q(1, 2) };
  if (n.t === 'pow') {
    const e = numValue(n.e);
    const b = stripParen(n.b);
    if (e && b.t === 'sym' && b.name === v) return { c: new Q(1), kind: 'pow', n: e };
    if (e && b.t === 'sqrt' && linearCoef(b.e, v)?.eq(1)) return { c: new Q(1), kind: 'pow', n: e.div(2) };
    if (b.t === 'const' && b.name === 'e') { const a = linearCoef(n.e, v); return a ? { c: new Q(1), kind: 'exp', a } : null; }
    return null;
  }
  if (n.t === 'fn' && n.args.length === 1) {
    const a = linearCoef(n.args[0], v);
    if (!a) return null;
    if (n.name === 'cos' || n.name === 'sin') return { c: new Q(1), kind: n.name, a };
    if (n.name === 'exp') return { c: new Q(1), kind: 'exp', a };
    return null;
  }
  if (n.t === 'bin' && n.op === '×') {
    const l = numValue(n.l);
    if (l) return scale(classify(n.r, v), l);
    const r = numValue(n.r);
    if (r) return scale(classify(n.l, v), r);
    return null;
  }
  if (n.t === 'frac' || (n.t === 'bin' && n.op === '÷')) {
    const [N, D] = n.t === 'frac' ? [n.n, n.d] : [n.l, n.r];
    const d = numValue(D);
    if (d && d.n !== 0) return scale(classify(N, v), d.inv());
    const top = numValue(N);
    if (!top) {
      // c·x^n/x^m and the like are not in the table; x^n/k is above.
      return null;
    }
    if (isOnePlusX2(D, v)) return { c: top, kind: 'atan' };
    const t = classify(D, v);
    if (t && t.kind === 'pow' && t.c.n !== 0) return { c: top.div(t.c), kind: 'pow', n: t.n.neg() };
    return null;
  }
  return null;
}

// The terms of a sum (signs carried), each classified; null if one is not
// in the table.
export function tableTerms(node, v = 'x') {
  const out = [];
  const visit = (n, s) => {
    n = stripParen(n);
    if (n.t === 'bin' && (n.op === '+' || n.op === '-')) { visit(n.l, s); visit(n.r, n.op === '-' ? -s : s); return; }
    if (n.t === 'neg' && stripParen(n.e).t === 'bin' && ['+', '-'].includes(stripParen(n.e).op)) { visit(n.e, -s); return; }
    out.push(scale(classify(n, v), s));
  };
  visit(node, 1);
  return out.some((t) => !t) ? null : out;
}

// ---------- writing terms ----------

const qText = (q) => (q.d === 1 ? String(q.n) : `${q.n}/${q.d}`);
// x^n written naturally: x, x^3, 1/x^2 (as a denominator), √x, x^(3/2).
function powBody(n, v) {
  if (n.eq(1)) return v;
  if (n.eq(new Q(1, 2))) return `√${v}`;
  if (n.isInt()) return `${v}^${n.n}`;
  return `${v}^(${qText(n)})`;
}
// c·body as text: c = p/q gives p·body/q (x^3/3, -2e^(3x)/3).
function cBody(c, body) {
  if (!body) return qText(c);
  const p = Math.abs(c.n);
  const sign = c.n < 0 ? '-' : '';
  const top = p === 1 ? body : /^[0-9]/.test(body) ? `${p}×${body}` : `${p}${body}`;
  return c.d === 1 ? `${sign}${top}` : `${sign}${top}/${c.d}`;
}
// c/x^k (k > 0), c/√x: a quotient.
function cOver(c, den) {
  const p = Math.abs(c.n);
  const sign = c.n < 0 ? '-' : '';
  return c.d === 1 ? `${sign}${p}/${den}` : `${sign}${p}/(${c.d}${den})`;
}
const lin = (a, v) => (a.eq(1) ? v : a.eq(-1) ? `-${v}` : a.isInt() ? `${a.n}${v}` : `(${qText(a)})${v}`);

// style 'natural': 4/x^3, √x, 1/√x ; style 'power': 4x^(-3), x^(1/2).
export function termText(t, v = 'x', style = 'natural') {
  const { c } = t;
  switch (t.kind) {
    case 'pow': {
      const n = t.n;
      if (n.n === 0) return qText(c);
      if (style === 'power' && !(n.isInt() && n.n > 0) && !n.eq(-1)) return cBody(c, `${v}^(${qText(n)})`);
      if (n.n > 0) return cBody(c, powBody(n, v));
      if (n.eq(-1)) return cOver(c, v);
      if (n.eq(new Q(-1, 2))) return cOver(c, `√${v}`);
      if (n.isInt()) return cOver(c, `${v}^${-n.n}`);
      return cBody(c, `${v}^(${qText(n)})`);
    }
    case 'ln': return cBody(c, t.abs === false ? `ln(${v})` : `ln(|${v}|)`);
    case 'exp': return cBody(c, t.a.eq(1) ? `e^${v}` : `e^(${lin(t.a, v)})`);
    case 'cos': case 'sin': return cBody(c, `${t.kind}(${lin(t.a, v)})`);
    case 'atan': return cOver(c, `(1+${v}^2)`);
    case 'arctan': return cBody(c, `arctan(${v})`);
    default: throw new Error(t.kind);
  }
}

export function sumText(texts) {
  return texts.filter((s) => s && s !== '0').reduce((acc, s) => (acc ? (s.startsWith('-') ? `${acc}${s}` : `${acc}+${s}`) : s), '') || '0';
}

// The primitive of one term (a term object of termText). mode: 'right',
// 'noabs' (ln x instead of ln|x|), 'deriv' (the derivative instead).
export function primTerm(t, mode = 'right') {
  if (mode === 'deriv' && t.kind === 'pow' && t.n.n !== 0) return { c: t.c.mul(t.n), kind: 'pow', n: t.n.sub(1) };
  switch (t.kind) {
    case 'pow':
      if (t.n.eq(-1)) return { c: t.c, kind: 'ln', abs: mode !== 'noabs' };
      return { c: t.c.div(t.n.add(1)), kind: 'pow', n: t.n.add(1) };
    case 'exp': return { c: t.c.div(t.a), kind: 'exp', a: t.a };
    case 'cos': return { c: t.c.div(t.a), kind: 'sin', a: t.a };
    case 'sin': return { c: t.c.div(t.a).neg(), kind: 'cos', a: t.a };
    case 'atan': return { c: t.c, kind: 'arctan' };
    default: return null;
  }
}

// The primitive of an integrand (text), the term modes given by modeOf(i, t).
export function primText(terms, v = 'x', modeOf = () => 'right', style = 'natural') {
  return sumText(terms.map((t, i) => termText(primTerm(t, modeOf(i, t)), v, style)));
}

// ---------- replaying a trap on the ∫ of a line ----------

// The line with each ∫ … dv replaced by the primitive of its integrand
// (modes chosen per term), + C added. null if no ∫ could be done.
function integrateLine(prev, v, modeOf) {
  let done = 0;
  let k = 0;
  const node = mapNode(prev, (n) => {
    if (n.t !== 'int' || n.lo || n.v !== v) return n;
    const terms = tableTerms(n.e, v);
    if (!terms) return n;
    done++;
    const base = k;
    k += terms.length;
    return par(parse(primText(terms, v, (i, t) => modeOf(base + i, t))));
  });
  if (!done || contains(node, (n) => n.t === 'int' && !n.lo)) return null;
  return symbolsIn(node).has('C') ? node : add(node, sym('C'));
}

// The terms of every ∫ of the line, in order.
function lineTerms(prev, v) {
  const out = [];
  walk(prev, (n) => {
    if (n.t === 'int' && !n.lo && n.v === v) { out.push(...(tableTerms(n.e, v) || [])); return false; }
    return true;
  });
  return out;
}

// ---------- implicit derivatives ----------

const implicitOf = (ctx) => {
  const imp = ctx?.cfg?.implicit;
  if (!imp) return null;
  const [y, p] = Object.entries(imp)[0];
  return { x: ctx.cfg.vars?.[0] || 'x', y, p };
};

function sumParts(n, s = 1, out = []) {
  n = stripParen(n);
  if (n.t === 'bin' && (n.op === '+' || n.op === '-')) { sumParts(n.l, s, out); sumParts(n.r, n.op === '-' ? -s : s, out); } else out.push(s > 0 ? n : { t: 'neg', e: n });
  return out;
}

// For each d(F) of the line: the terms of F, and the line with d(F)
// replaced by Σ wrong(term) for the chosen terms (right(term) otherwise).
function implicitCandidates(prev, imp, pick, wrongOf) {
  const out = [];
  walk(prev, (n, path) => {
    if (n.t !== 'deriv' || n.n !== 1 || n.v !== imp.x) return true;
    const terms = sumParts(n.e);
    const right = (t) => add(diff(t, imp.x), mul(sym(imp.p), diff(t, imp.y)));
    const idx = terms.map((t, i) => (pick(t) ? i : -1)).filter((i) => i >= 0);
    const subsets = idx.length > 1 ? [idx, ...idx.map((i) => [i])] : idx.length ? [idx] : [];
    for (const S of subsets) {
      for (const w of wrongOf) {
        const parts = terms.map((t, i) => (S.includes(i) ? w(t) : right(t)));
        if (parts.some((x) => !x)) continue;
        const node = replaceAt(prev, path, par(parts.reduce((a, b) => add(a, b))));
        out.push({ node, ctx: { term: terms[S[0]], right: right(terms[S[0]]), y: imp.y } });
      }
    }
    return false;
  });
  return out;
}

const IMPLICIT_CFG = { kind: 'equiv', vars: ['x', 'y', 'p'], implicit: { y: 'p' }, target: 'no-prime', domain: { x: [-2, 2], y: [-2, 2], p: [-2, 2] } };

export const RULES = [
  {
    id: 'g6_ln_abs', family: 'calculus', tag: 'E', skill: 'g6-antideriv-usual', repair: 'g6-antideriv-usual',
    judges: ['antideriv'],
    name: t('ln x au lieu de ln|x|'),
    example: ['∫dx/x = ln x', '∫dx/x = ln|x|'],
    check: { judge: { kind: 'antideriv', v: 'x', domain: { x: [-3, 3] } }, prev: 'int(3x^2-4/x,x)', line: 'x^3-4ln(x)+C' },
    transform: (prev, ctx) => {
      const v = ctx?.v || 'x';
      const out = [];
      if (lineTerms(prev, v).some((t) => t.kind === 'pow' && t.n.eq(-1))) {
        const node = integrateLine(prev, v, () => 'noabs');
        if (node) out.push({ node, ctx: {} });
      }
      // A line already written with ln|u|: the bars dropped.
      if (contains(prev, (n) => n.t === 'fn' && n.name === 'ln' && stripParen(n.args[0]).t === 'abs')) {
        out.push({ node: mapNode(prev, (n) => (n.t === 'fn' && n.name === 'ln' && stripParen(n.args[0]).t === 'abs' ? { ...n, args: [stripParen(n.args[0]).e] } : n)), ctx: {} });
      }
      return out;
    },
    explain: () => t('ln x n\'existe que pour x > 0. Ici la fonction à intégrer existe aussi pour x < 0 : une primitive valable des deux côtés de 0 est ln|x|, car (ln|x|)′ = 1/x pour tout x ≠ 0.'),
  },
  {
    id: 'g6_antideriv_power_minus_one', family: 'calculus', tag: 'E', skill: 'g6-antideriv-usual', repair: 'g6-antideriv-usual',
    judges: ['antideriv'],
    name: t('Dériver au lieu d\'intégrer une puissance'),
    example: ['∫x³ dx = 3x²', '∫x³ dx = x⁴/4'],
    check: { judge: { kind: 'antideriv', v: 'x', domain: { x: [-3, 3] } }, prev: 'int(x^3+2x,x)', line: '3x^2+2+C' },
    transform: (prev, ctx) => {
      const v = ctx?.v || 'x';
      const terms = lineTerms(prev, v);
      const pw = terms.map((t, i) => (t.kind === 'pow' && t.n.n !== 0 ? i : -1)).filter((i) => i >= 0);
      if (!pw.length) return [];
      const sets = pw.length > 1 ? [pw, ...pw.map((i) => [i])] : [pw];
      const out = [];
      for (const S of sets) {
        const node = integrateLine(prev, v, (i) => (S.includes(i) ? 'deriv' : 'right'));
        if (node) out.push({ node, ctx: { term: termText(terms[S[0]], v), v } });
      }
      return out;
    },
    explain: (ctx = {}) => (ctx.term
      ? t('Pour intégrer une puissance, on <b>monte</b> l\'exposant et on divise par le nouvel exposant : ∫xⁿ dx = xⁿ⁺¹/(n + 1). Tu as dérivé {e} à la place. Contrôle en dérivant ta ligne : tu dois retrouver la fonction à intégrer.', { e: M(parse(ctx.term)) })
      : t('Pour intégrer une puissance, on <b>monte</b> l\'exposant et on divise par le nouvel exposant : ∫xⁿ dx = xⁿ⁺¹/(n + 1). Tu as dérivé à la place. Contrôle en dérivant ta ligne : tu dois retrouver la fonction à intégrer.')),
  },
  {
    id: 'g6_area_signed', family: 'calculus', tag: 'E', skill: 'g6-area', repair: 'g6-area',
    judges: ['definite'],
    name: t('Aire prise comme intégrale avec son signe'),
    example: [t('aire = ∫(bas − haut) = −32/3'), t('aire = 32/3')],
    check: { judge: { kind: 'definite' }, prev: 'int(|x^2-2x-3|,x,-1,3)', line: 'int(x^2-2x-3,x,-1,3)' },
    transform: (prev) => {
      const out = [];
      walk(prev, (n, path) => {
        if (n.t !== 'int' || !n.lo) return true;
        const e = stripParen(n.e);
        if (e.t !== 'abs') return true;
        out.push({ node: replaceAt(prev, path, { ...n, e: e.e }), ctx: {} });
        out.push({ node: replaceAt(prev, path, { ...n, e: { t: 'neg', e: par(e.e) } }), ctx: {} });
        return false;
      });
      return out;
    },
    explain: () => t('Une aire est positive. Sur chaque morceau, on intègre (courbe du haut − courbe du bas) : tu as soustrait la courbe du haut à celle du bas, ou intégré d\'un seul coup sur un intervalle où les courbes se croisent.'),
  },
  {
    id: 'g6_implicit_xy', family: 'calculus', tag: 'E', skill: 'g6-deriv-implicit', repair: 'g6-deriv-rules',
    judges: ['equiv'],
    name: t('Dérivée de x·y prise comme x·y′ ou y′'),
    example: ['(xy)′ = x·y′', '(xy)′ = y + x·y′'],
    check: { judge: IMPLICIT_CFG, prev: 'd(x^2+x×y+y^3)', line: '2x+x×y\'+3y^2×y\'' },
    transform: (prev, ctx) => {
      const imp = implicitOf(ctx);
      if (!imp) return [];
      const mixed = (t) => dependsOn(t, imp.x) && dependsOn(t, imp.y);
      return implicitCandidates(prev, imp, mixed, [
        (t) => mul(sym(imp.p), diff(t, imp.y)),
        (t) => mul(sym(imp.p), diff(diff(t, imp.y), imp.x)),
      ]);
    },
    explain: (ctx = {}) => (ctx.term
      ? t('{e} est un produit de deux fonctions de x (y dépend de x) : on applique la règle du produit, (xy)′ = 1·y + x·y′. Ici ({e})′ = {r}.', { e: M(ctx.term), r: M(ctx.right) })
      : t('xy est un produit de deux fonctions de x (y dépend de x) : on applique la règle du produit, (xy)′ = 1·y + x·y′.')),
  },
  {
    id: 'g6_implicit_yprime_forgot', family: 'calculus', tag: 'E', skill: 'g6-deriv-implicit', repair: 'g6-deriv-rules',
    judges: ['equiv'],
    name: t('Facteur y′ oublié en dérivant une expression en y'),
    example: ['(y³)′ = 3y²', '(y³)′ = 3y²·y′'],
    check: { judge: IMPLICIT_CFG, prev: 'd(x^2+x×y+y^3)', line: '2x+y+x×y\'+3y^2' },
    transform: (prev, ctx) => {
      const imp = implicitOf(ctx);
      if (!imp) return [];
      return implicitCandidates(prev, imp, (t) => dependsOn(t, imp.y), [
        (t) => add(diff(t, imp.x), mul(num(1), diff(t, imp.y))),
      ]);
    },
    explain: (ctx = {}) => (ctx.term
      ? t('y dépend de x : par la règle de chaîne, (y³)′ = 3y²·y′, comme (sin 3x)′ = 3cos 3x. Ici ({e})′ = {r}.', { e: M(ctx.term), r: M(ctx.right) })
      : t('y dépend de x : par la règle de chaîne, (y³)′ = 3y²·y′, comme (sin 3x)′ = 3cos 3x.')),
  },
];

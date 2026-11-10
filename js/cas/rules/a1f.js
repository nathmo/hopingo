// Traps of module A1, part f (step U4): sup and inf, the ε-N definition,
// N(ε), limits of sequences. Catalogue: docs/universite/A1-analyse-1.md,
// « Pièges du module ».
//
// transform(prev, ctx) → [{node, ctx}]: `solset` (tan applied to every
// member although a constant is outside ]−π/2 ; π/2[), `equiv` with
// rel '≤' (a fraction « bounded » by a bigger denominator), `limit` (a root
// split over a sum, the lowest terms kept). N(ε) that depends on n is named
// by the `delta` judge itself (cfg.rules.dependsOnVar). The others are final
// answers (options, decoy blocks, true/false): check {bait}.
// a1_indet_inf_minus_inf is the sequence twin of g6_infinity_minus_infinity,
// which comes first in CAS_RULES and names the line « 0 »: here it is the
// option « 0 » of the multiple choices.

import { parse } from '../parse.js';
import { walk, replaceAt, stripParen, contains, dependsOn, symbolsIn, lit } from '../ast.js';
import { toMathML } from '../mathml.js';
import { toText } from '../print.js';
import { evalFloat } from '../numeric.js';
import { polyOf, qCoeffs } from '../polyx.js';
import { frNum } from '../../judges/common.js';

const M = (n) => toMathML(stripParen(typeof n === 'string' ? parse(n) : n));
const par = (e) => ({ t: 'paren', e });
const vOf = (ctx) => ctx?.v || 'x';
const isArc = (n) => n.t === 'fn' && ['arctan', 'Arctg', 'atan'].includes(n.name);
const tanOf = (e) => ({ t: 'fn', name: 'tan', args: [e] });

// A constant member outside ]−π/2 ; π/2[, or null.
function outside(n) {
  if (symbolsIn(n).size) return null;
  const x = evalFloat(n, {});
  return Number.isFinite(x) && Math.abs(x) >= Math.PI / 2 - 1e-12 ? n : null;
}

// a/D with D depending on v: [a, D].
function fracParts(n, v) {
  n = stripParen(n);
  if (n.t === 'frac' && dependsOn(n.d, v) && !dependsOn(n.n, v)) return [n.n, stripParen(n.d)];
  if (n.t === 'bin' && n.op === '÷' && dependsOn(n.r, v) && !dependsOn(n.l, v)) return [n.l, stripParen(n.r)];
  return null;
}

export const RULES = [
  {
    id: 'a1_supinf_on_values', family: 'meaning', tag: 'C', skill: 'a1-sup-inf', repair: 'a1-sup-inf',
    judges: [],
    name: 'Inf ou Sup des valeurs de la fonction, au lieu des x',
    example: ['A = {x > 0 : cos(1/x) > 0} : « Sup A = π/2 »', 'Sup A = +∞, Inf A = 0'],
    check: { bait: { skill: 'a1-sup-inf', exam: 'mcq' } },
    explain: (ctx = {}) => (ctx.u
      ? `Tu as donné une borne des valeurs de ${ctx.u}. L'Inf et le Sup portent sur les x de A : quand ${ctx.u} parcourt ${ctx.U}, x parcourt ${ctx.X}.`
      : 'Tu as donné une borne des valeurs de la fonction (ici u = 1/x). L\'Inf et le Sup portent sur les x de A : avec cos(1/x) > 0, u = 1/x reste sous π/2, mais x peut être aussi grand qu\'on veut et aussi proche de 0 qu\'on veut.'),
  },
  {
    id: 'a1_tan_monotone_range', family: 'rule', tag: 'C', skill: 'a1-sup-inf', repair: 'g3-arc-def',
    judges: ['solset'],
    name: 'tan appliquée hors de ]−π/2 ; π/2[',
    example: ['Arctg(1/x) < 2π/3 ⇒ 1/x < tan(2π/3) = −√3', 'la condition est toujours vraie'],
    check: { judge: { kind: 'solset', v: 'x', domain: 'ℝ∖{0}' }, prev: 'arctan(1/x)<2π/3', line: '1/x<-√3' },
    // tan applied to every member of a relation or a chain with Arctg,
    // although a constant member is outside ]−π/2 ; π/2[.
    transform: (prev) => {
      const n = stripParen(prev);
      if (!contains(n, isArc)) return [];
      if (n.t === 'rel') {
        const c = outside(n.l) || outside(n.r);
        return c ? [{ node: { ...n, l: tanOf(n.l), r: tanOf(n.r) }, ctx: { c: M(c) } }] : [];
      }
      if (n.t === 'chain') {
        const c = n.items.map(outside).find(Boolean);
        return c ? [{ node: { ...n, items: n.items.map(tanOf) }, ctx: { c: M(c) } }] : [];
      }
      return [];
    },
    explain: (ctx = {}) => `tan n'est croissante que sur ]−π/2 ; π/2[, et ${ctx.c ?? 'cette constante'} n'y est pas. Comme Arctg prend ses valeurs dans ]−π/2 ; π/2[, l'inégalité Arctg(…) < ${ctx.c ?? 'c'} est toujours vraie : enlève-la au lieu d'appliquer tan.`,
  },
  {
    id: 'a1_sup_in_set', family: 'meaning', tag: 'E', skill: 'a1-sup-inf', repair: 'a1-sup-proof',
    judges: [],
    name: 'Le Sup pris pour un élément de A (un Max)',
    example: ['Sup [0 ; 3[ = 3 = Max', 'pas de Max'],
    check: { bait: { skill: 'a1-sup-proof', level: 3 } },
    explain: (ctx = {}) => `Le Sup est le plus petit majorant ; il n'est pas forcément dans A. ${ctx.s ?? '3'} ∉ A, donc A n'a pas de maximum.`,
  },
  {
    id: 'a1_n_depends_on_n', family: 'logic', tag: 'E', skill: 'a1-seq-eps-n', repair: 'a1-seq-eps-n-def',
    judges: ['delta'],
    name: 'N(ε) qui dépend de n',
    example: ['N(ε) = 5/(εn)', 'N(ε) = 5/ε'],
    check: { judge: { kind: 'delta', mode: 'N', f: '(3n+1)/(n+2)', L: '3', from: 1, rules: { dependsOnVar: 'a1_n_depends_on_n' } }, prev: 'N', line: '5/(ε×n)' },
    explain: () => 'N doit être fixé dès que ε est donné : il ne peut pas dépendre de n. Majore d\'abord |aₙ − L| par une expression plus simple (c/n), puis résous c/n ≤ ε.',
  },
  {
    id: 'a1_bound_wrong_direction', family: 'sign', tag: 'E', skill: 'a1-seq-eps-n', repair: 'g1-bound',
    judges: ['equiv'],
    name: 'Majorer une fraction en agrandissant son dénominateur',
    example: ['5/(n + 2) ≤ 5/(n + 3)', '5/(n + 2) ≤ 5/n'],
    check: { judge: { kind: 'equiv', vars: ['n'], rel: '≤', from: 1, simple: true }, prev: '5/(n+2)', line: '5/(n+3)' },
    // In a bound line (rel ≤): a/D → a/(D + k), a positive term added.
    transform: (prev, ctx) => {
      if (ctx?.cfg?.rel !== '≤') return [];
      const v = vOf(ctx);
      const p = fracParts(prev, v);
      if (!p) return [];
      const [a, D] = p;
      const at = (n) => evalFloat(n, { [v]: 1 });
      return [1, 2, 3, v].map((k) => {
        const d2 = parse(`${toText(par(D))}+${k}`, { vars: [v] });
        const node = { t: 'frac', n: a, d: par(d2) };
        return { node, ctx: { v, prev: M(prev), cand: M(node), a: frNum(at(prev), 3), b: frNum(at(node), 3) } };
      });
    },
    explain: (ctx = {}) => (ctx.prev
      ? `Pour agrandir ${ctx.prev}, il faut un dénominateur plus petit. Avec ${ctx.v} = 1 : ${ctx.prev} = ${ctx.a}, et ${ctx.cand} = ${ctx.b}, plus petit.`
      : 'Pour agrandir 5/(n + 2), il faut un dénominateur plus petit : 5/(n + 2) ≤ 5/n. Avec n = 1 : 5/3 ≈ 1,67, et 5/(n + 3) = 1,25, plus petit.'),
  },
  {
    id: 'a1_limit_never_reached', family: 'meaning', tag: 'R', skill: 'a1-seq-eps-n', repair: 'a1-seq-eps-n-def',
    judges: [],
    name: 'Une limite ne serait jamais atteinte',
    example: ['« 0,999… < 1 » ; « la suite constante 3 ne tend pas vers 3 »', '0,999… = 1, et la suite constante 3 tend vers 3'],
    check: { bait: { skill: 'a1-seq-eps-n', exam: 'tf' } },
    explain: () => 'Une limite peut être atteinte (suite constante) ou pas (1/n → 0). Ce qui compte : |aₙ − L| finit sous tout ε > 0. Ainsi 0,999… = 1, la limite de 0,9 ; 0,99 ; 0,999 ; …',
  },
  {
    id: 'a1_indet_inf_minus_inf', family: 'rule', tag: 'E', skill: 'a1-seq-limits', repair: 'a1-seq-limits',
    judges: [],
    name: '∞ − ∞ pris pour 0 (suites)',
    example: ['√(n² + 4n) − n → 0', '√(n² + 4n) − n → 2'],
    check: { bait: { skill: 'a1-seq-limits', exam: 'mcq' } },
    explain: () => '∞ − ∞ n\'est pas 0 : les deux termes grandissent presque à la même vitesse, et l\'écart peut tendre vers n\'importe quoi. Multiplie par la quantité conjuguée.',
  },
  {
    id: 'a1_sqrt_sum_split', family: 'distribute', tag: 'E', skill: 'a1-seq-limits', repair: 'rat-simplify',
    judges: ['limit'],
    name: 'Racine distribuée sur une somme',
    example: ['√(n² + 4n) = n + 2√n', 'quantité conjuguée'],
    check: { judge: { kind: 'limit', v: 'n', to: '+∞', discrete: true, vars: ['n'] }, prev: '√(n^2+4n)-n', line: 'n+2√n-n' },
    // √(A + B) → √A + √B.
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const out = [];
      walk(prev, (n, path) => {
        const s = n.t === 'sqrt' ? stripParen(n.e) : null;
        if (s && s.t === 'bin' && (s.op === '+' || s.op === '-') && dependsOn(s, v)) {
          const split = { t: 'bin', op: s.op, l: { t: 'sqrt', e: s.l }, r: { t: 'sqrt', e: s.r } };
          const at = (x) => evalFloat(x, { [v]: 1 });
          out.push({ node: replaceAt(prev, path, par(split)), ctx: { v, root: M(n), split: M(split), a: frNum(at(n), 3), b: frNum(at(split), 3) } });
        }
        return true;
      });
      return out;
    },
    explain: (ctx = {}) => (ctx.root
      ? `Une racine ne se distribue pas sur une somme : teste ${ctx.v} = 1, ${ctx.root} = ${ctx.a}, mais ${ctx.split} = ${ctx.b}.`
      : 'Une racine ne se distribue pas sur une somme : teste n = 1, √(1 + 4) = √5 ≈ 2,24, mais √1 + √4 = 3.'),
  },
  {
    id: 'a1_dominant_term_wrong', family: 'rule', tag: 'E', skill: 'a1-seq-limits', repair: 'a1-seq-limits',
    judges: ['limit'],
    name: 'Termes de plus bas degré gardés en +∞',
    example: ['(2n³ − n)/(5n³ + 7) → −1/7', '(2n³ − n)/(5n³ + 7) → 2/5'],
    check: { judge: { kind: 'limit', v: 'n', to: '+∞', discrete: true, vars: ['n'] }, prev: '(2n^3-n)/(5n^3+7)', line: '-1/7' },
    // A quotient of polynomials: the ratio of the lowest terms (as a number
    // and as an expression).
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const n = stripParen(prev);
      if (n.t !== 'frac' || !dependsOn(n.n, v) || !dependsOn(n.d, v)) return [];
      const P = polyOf(n.n);
      const Q = polyOf(n.d);
      if (!P || !Q) return [];
      const p = qCoeffs(P, v);
      const q = qCoeffs(Q, v);
      if (!p || !q) return [];
      const low = (cs) => cs.findIndex((c) => c.n !== 0);
      const i = low(p);
      const j = low(q);
      const top = Math.max(p.length, q.length) - 1;
      if (i < 0 || j < 0 || (i === p.length - 1 && j === q.length - 1)) return [];
      const ctx2 = { v, k: top };
      const term = (c, k) => (k === 0 ? toText(lit(c)) : `${toText(lit(c))}×${v}^${k}`);
      return [
        { node: lit(p[i].div(q[j])), ctx: ctx2 },
        { node: parse(`(${term(p[i], i)})/(${term(q[j], j)})`, { vars: [v] }), ctx: ctx2 },
      ];
    },
    explain: (ctx = {}) => `En +∞, ce sont les plus grandes puissances qui dominent : ${ctx.v ?? 'n'}${ctx.k ? `^${ctx.k}`.replace(/\^(\d)/, (m, d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]) : '³'} en haut et en bas. Divise en haut et en bas par cette puissance.`,
  },
  {
    id: 'a1_lim_quotient_bn_nonzero', family: 'rule', tag: 'C', skill: 'a1-seq-limits', repair: 'a1-seq-limits',
    judges: [],
    name: 'Règle du quotient appliquée avec lim bₙ = 0',
    example: ['aₙ → 1, bₙ → 0 (bₙ ≠ 0) : « aₙ/bₙ converge »', 'aₙ/bₙ peut ne pas avoir de limite'],
    check: { bait: { skill: 'a1-seq-limits', exam: 'tf' } },
    explain: () => 'La règle du quotient demande lim bₙ ≠ 0. bₙ ≠ 0 pour chaque n ne suffit pas : bₙ = (−1)ⁿ/n et aₙ = 1 donnent aₙ/bₙ = (−1)ⁿ·n, sans limite.',
  },
];

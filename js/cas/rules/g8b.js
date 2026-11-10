// Traps of module G8, part b (step U4): polynomials, loci, ratios,
// transformations, inversion. Catalogue: docs/universite/G-gymnase-2.md,
// « G8 », « Pièges du module ».
//
// Fields the generators put in the judge's configuration, read here:
//   ratio: true      (complex) a quotient (c − a)/(b − a): g8_ratio_order
//                    swaps it, and arg(q), |q| become arg(1/q), |1/q|
//   center: true     (complex) b = ω − aω of a rotation: g8_rotation_about_origin
//                    gives b = ω or b = aω
//   inversion: true  (poly, mode locus) the image by w = 1/z̄: g8_inversion_conj
//                    takes z = 1/w (conj(w) ↔ w, y → −y)
// g8_locus_sign replays on the lines of the mode 'locus' (|z + a| read as
// the distance to +a). g8_conj_root_nonreal is a final answer: decision
// options and multiple-choice options carry it.

import { mapNode, walk, replaceAt, stripParen, contains, equalsStructural } from '../ast.js';
import { toText } from '../print.js';

const par = (e) => ({ t: 'paren', e });
const isSym = (n, name) => n.t === 'sym' && n.name === name && !n.sub;

// One candidate per sub-expression matching pred, replaced by fn(node).
function each(prev, pred, fn) {
  const out = [];
  walk(prev, (n, path) => {
    if (pred(n)) {
      let r = null;
      try { r = fn(n); } catch { r = null; }
      if (r) out.push({ node: replaceAt(prev, path, par(r.node ?? r)), ctx: r.ctx ?? {} });
    }
    return true;
  });
  return out;
}

const T = (n) => toText(stripParen(n)).replace(/-/g, '−');

export const RULES = [
  {
    id: 'g8_conj_root_nonreal', family: 'method', tag: 'E', skill: 'g8-poly', repair: 'g8-poly', judges: [],
    name: 'Racine conjuguée sans coefficients réels',
    example: ['i racine de z − i, donc −i aussi', 'non : z − i n\'a pas de coefficients réels'],
    check: { bait: { skill: 'g8-poly', exam: 'mcq' } },
    explain: () => 'La règle de la conjuguée demande des coefficients réels. Ici un coefficient n\'est pas réel : calcule P(w̄), il n\'est pas nul.',
  },
  {
    id: 'g8_locus_sign', family: 'sign', tag: 'E', skill: 'g8-locus', repair: 'g8-locus', judges: ['poly'],
    name: 'Mauvais point dans |z + a|',
    example: ['|z + 4|² = (x − 4)² + y²', '|z + 4|² = (x + 4)² + y²'],
    check: {
      judge: { kind: 'poly', mode: 'locus', cv: 'z', xy: ['x', 'y'], vars: ['z', 'x', 'y'], locus: { kind: 'line', a: 2, b: 1, c: 3 }, target: 'line' },
      prev: '|z-2i|=|z+4|', line: 'x^2+(y-2)^2=(x-4)^2+y^2',
    },
    // |z ± c| → |z ∓ c|, one modulus at a time.
    transform: (prev, ctx) => {
      const cfg = ctx?.cfg || {};
      if (cfg.mode !== 'locus') return [];
      const cv = cfg.cv || 'z';
      return each(prev, (n) => {
        if (n.t !== 'abs') return false;
        const e = stripParen(n.e);
        return e.t === 'bin' && (e.op === '+' || e.op === '-') && isSym(stripParen(e.l), cv) && !contains(e.r, (x) => isSym(x, cv));
      }, (n) => {
        const e = stripParen(n.e);
        return { node: { t: 'abs', e: { ...e, op: e.op === '+' ? '-' : '+' } }, ctx: { a: T(e.r), op: e.op } };
      });
    },
    explain: (ctx = {}) => (ctx.a
      ? (ctx.op === '+'
        ? `|z + ${ctx.a}| = |z − (−${ctx.a})| : c'est la distance au point d'affixe −${ctx.a}, pas ${ctx.a}.`
        : `|z − ${ctx.a}| est la distance au point d'affixe ${ctx.a}, pas −${ctx.a}.`)
      : '|z + a| = |z − (−a)| : c\'est la distance au point d\'affixe −a. |z + 4| est la distance au point (−4 ; 0).'),
  },
  {
    id: 'g8_ratio_order', family: 'geometry', tag: 'E', skill: 'g8-ratio-angle', repair: 'g8-ratio-angle', judges: ['complex'],
    name: 'Quotient inversé : rapport et angle de AC⃗ vers AB⃗',
    example: ['angle (AB⃗, AC⃗) = −π/4', 'angle (AB⃗, AC⃗) = π/4'],
    check: { judge: { kind: 'complex', form: 'algebraic', complex: true, ratio: true }, prev: '((3+7i)-(1+i))/((5+3i)-(1+i))', line: '(1-i)/2' },
    // (c − a)/(b − a) → (b − a)/(c − a); arg(q), |q| → arg(1/q), |1/q|.
    transform: (prev, ctx) => {
      if (!ctx?.cfg?.ratio) return [];
      const quot = each(prev, (n) => n.t === 'frac' || (n.t === 'bin' && n.op === '÷'), (n) => (n.t === 'frac' ? { t: 'frac', n: n.d, d: n.n } : { ...n, l: n.r, r: n.l }));
      const inv = each(prev, (n) => (n.t === 'fn' && n.name === 'arg') || n.t === 'abs', (n) => {
        const e = n.t === 'abs' ? n.e : n.args[0];
        const flipped = { t: 'frac', n: { t: 'num', v: { n: 1, d: 1 }, s: '1' }, d: par(e) };
        return n.t === 'abs' ? { t: 'abs', e: flipped } : { ...n, args: [flipped] };
      });
      return [...quot, ...inv];
    },
    explain: () => '(c − a)/(b − a) mesure l\'angle de AB⃗ vers AC⃗ et le rapport AC/AB. Le quotient inversé donne l\'angle opposé et le rapport inverse AB/AC.',
  },
  {
    id: 'g8_rotation_about_origin', family: 'geometry', tag: 'E', skill: 'g8-transform', repair: 'g8-transform', judges: ['complex'],
    name: 'Rotation écrite autour de 0',
    example: ['z′ = e^(iθ)z + ω', 'z′ − ω = e^(iθ)(z − ω)'],
    check: { judge: { kind: 'complex', form: 'algebraic', complex: true, center: true }, prev: '(1+2i)-i(1+2i)', line: '1+2i' },
    // b = ω − aω → ω (z′ = az + ω) or aω (z′ = a(z + ω)).
    transform: (prev, ctx) => {
      if (!ctx?.cfg?.center) return [];
      const n = stripParen(prev);
      if (n.t !== 'bin' || n.op !== '-') return [];
      const r = stripParen(n.r);
      if (r.t !== 'bin' || r.op !== '×') return [];
      const same = (x) => equalsStructural(stripParen(x), stripParen(n.l), { parens: false });
      if (!same(r.l) && !same(r.r)) return [];
      return [{ node: n.l, ctx: { w: T(n.l) } }, { node: n.r, ctx: { w: T(n.l) } }];
    },
    explain: (ctx = {}) => `Avec ta formule, le centre ${ctx.w ? `ω = ${ctx.w}` : 'ω'} n'est pas fixe : e^(iθ)ω + ω ≠ ω. On tourne z − ω, puis on rajoute ω : z′ = e^(iθ)(z − ω) + ω, donc b = ω − e^(iθ)ω.`,
  },
  {
    id: 'g8_inversion_conj', family: 'rule', tag: 'E', skill: 'g8-inversion', repair: 'g8-inversion', judges: ['poly'],
    name: 'w = 1/z̄ traité comme 1/z',
    example: ['Im z = 1 et w = 1/z̄ : x² + (y + 1/2)² = 1/4', 'x² + (y − 1/2)² = 1/4'],
    check: {
      judge: { kind: 'poly', mode: 'locus', cv: 'w', xy: ['x', 'y'], vars: ['w', 'x', 'y'], inversion: true, locus: { kind: 'circle', c: [0, 0.5], r2: 0.25 }, exclude: [[0, 0]], target: 'circle' },
      prev: 'Im(1/conj(w))=1', line: 'x^2+(y+1/2)^2=1/4',
    },
    // z = 1/w instead of 1/w̄: the mirror image (conj(w) ↔ w, y → −y).
    transform: (prev, ctx) => {
      const cfg = ctx?.cfg || {};
      if (cfg.mode !== 'locus' || !cfg.inversion) return [];
      const cv = cfg.cv || 'w';
      const y = (cfg.xy || ['x', 'y'])[1];
      const CONJ = '__conj__';
      let node = mapNode(prev, (n) => (n.t === 'fn' && n.name === 'conj' && isSym(stripParen(n.args[0]), cv) ? { t: 'sym', name: CONJ } : n));
      node = mapNode(node, (n) => (isSym(n, cv) ? { t: 'fn', name: 'conj', args: [{ t: 'sym', name: cv }] } : n));
      node = mapNode(node, (n) => (isSym(n, CONJ) ? { t: 'sym', name: cv } : isSym(n, y) ? par({ t: 'neg', e: { t: 'sym', name: y } }) : n));
      return [{ node, ctx: {} }];
    },
    explain: () => '1/z̄ et 1/z sont symétriques par rapport à l\'axe réel. Pour w = 1/z̄, on a z = 1/w̄ (et non 1/w) : ton image est la symétrique de la bonne.',
  },
];

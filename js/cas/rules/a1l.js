// Traps of module A1, part l (step U4): complex numbers at BA1,
// definitions and short proofs. Catalogue: docs/universite/A1-analyse-1.md,
// « Pièges du module ».
//
// transform(prev, ctx) → [{node, ctx}] replays the mistake on the previous
// line: `complex` lines (iᵏ reduced with a wrong modulus, a negative
// module, z̄ written with the sign of φ kept, the solution z = 0 dropped),
// `solset` lines in r (dividing r³ = r by r), `logic` formulas (Cauchy
// written with consecutive terms). The traps on final answers (a count of
// solutions, a decoy block of a proof) are carried by options and blocks
// (check: {bait}).
//
// U4 merge: the catalogue repairs a1_cplx_ik_mod and a1_conj_arg_sign in
// g8-algebraic, a1_polar_r_negative in g8-polar, a1_cauchy_consecutive in
// a1-seq-monotone and a1_equiv_zero_limit in a1-ser-compare (other parts):
// the closest skill of this part stands in until the merge.

import { parse } from '../parse.js';
import { walk, replaceAt, stripParen, contains } from '../ast.js';
import { toText } from '../print.js';
import { toMathML } from '../mathml.js';
import { evalFloat } from '../numeric.js';
import { polarParts } from '../complex.js';
import { lexFor, parseFormula, formulaText } from '../logic.js';

const M = (n) => toMathML(stripParen(typeof n === 'string' ? parse(n, { complex: true }) : n));
const par = (e) => ({ t: 'paren', e });
const isI = (n) => { n = stripParen(n); return n.t === 'const' && n.name === 'i'; };
const intOf = (n) => { n = stripParen(n); return n.t === 'num' && n.v.d === 1 ? n.v.n : null; };

// i^k with k a whole number ≥ 2.
const ipow = (n) => n.t === 'pow' && isI(n.b) && intOf(n.e) !== null && intOf(n.e) >= 2;
const iTo = (k, minus = false) => parse(`${minus ? '-' : ''}i^${k}`, { complex: true });

// Every i^k of prev replaced at once by the result of fn(k) (a node), or [].
function allPowers(prev, fn) {
  let out = prev;
  const found = [];
  walk(prev, (n, path) => { if (ipow(n)) { found.push(path); return false; } return true; });
  if (!found.length) return null;
  for (const path of found.reverse()) {
    let n = out;
    for (const k of path) n = n[k];
    out = replaceAt(out, path, par(fn(intOf(n.e))));
  }
  return out;
}

// The variable of a solset part in polar unknowns.
const isR = (ctx) => (ctx?.cfg?.v || ctx?.v) === 'r';

// z = 0 dropped from a set of solutions: the disjunct « z = 0 », or the
// item 0 of a finite set.
function withoutZero(prev) {
  const n = stripParen(prev);
  const isZero = (x) => { const v = intOf(x); return v === 0; };
  if (n.t === 'set' && n.kind === 'finite' && n.items.some(isZero)) return { ...n, items: n.items.filter((x) => !isZero(x)) };
  if (n.t === 'logic' && n.op === 'or') {
    const ds = [];
    const flat = (x) => { x = stripParen(x); if (x.t === 'logic' && x.op === 'or') { flat(x.l); flat(x.r); } else ds.push(x); };
    flat(n);
    const keep = ds.filter((d) => !(d.t === 'rel' && d.op === '=' && stripParen(d.l).t === 'sym' && stripParen(d.l).name === 'z' && isZero(d.r)));
    if (keep.length === ds.length || !keep.length) return null;
    return keep.reduce((a, b) => ({ t: 'logic', op: 'or', l: a, r: b }));
  }
  return null;
}

export const RULES = [
  {
    id: 'a1_cplx_ik_mod', family: 'facts', tag: 'C', skill: 'a1-cplx-exam', repair: 'a1-cplx-exam', // U4 merge: repair g8-algebraic
    judges: ['complex'],
    name: 'iᵏ réduit avec un mauvais modulo',
    example: ['i¹⁵ = i', 'i¹⁵ = i³ = −i'],
    check: { judge: { kind: 'complex', complex: true }, prev: 'i^15', line: 'i' },
    // Each i^k replaced by i^(k mod 2), i^(k mod 3) or −i^(k mod 4).
    transform: (prev) => {
      const out = [];
      for (const [fn, how] of [[(k) => iTo(k % 2), 2], [(k) => iTo(k % 3), 3], [(k) => iTo(k % 4, true), -4]]) {
        const node = allPowers(prev, fn);
        if (node) out.push({ node, ctx: { how } });
      }
      return out;
    },
    explain: () => 'On réduit l\'exposant de i modulo 4, car i⁴ = 1 : 15 = 4·3 + 3, donc i¹⁵ = i³ = −i. Les puissances de i reviennent tous les 4 : i, −1, −i, 1.',
  },
  {
    id: 'a1_polar_r_negative', family: 'notation', tag: 'C', skill: 'a1-cplx-exam', repair: 'a1-cplx-exam', // U4 merge: repair g8-polar
    judges: ['complex'],
    name: 'Module négatif dans une forme polaire',
    example: ['−1 + i√3 = −2e^(−iπ/3), lu « r = 2, φ = −π/3 »', '−1 + i√3 = 2e^(2iπ/3)'],
    check: { judge: { kind: 'complex', complex: true }, prev: '-2e^(-iπ/3)', line: '2e^(-iπ/3)' },
    // −r·e^(iφ) read as r·e^(iφ): the sign − dropped.
    transform: (prev) => {
      const out = [];
      walk(prev, (n, path) => {
        const p = polarParts(n);
        if (!p) return true;
        const r = evalFloat(p.r, {});
        if (!(r < 0)) return true;
        const pos = stripParen(p.r).t === 'neg' ? stripParen(p.r).e : { t: 'neg', e: p.r };
        const node = parse(`(${toText(pos)})e^(i(${toText(p.theta)}))`, { complex: true });
        out.push({ node: replaceAt(prev, path, par(node)), ctx: { r: pos, theta: p.theta } });
        return false;
      });
      return out;
    },
    explain: (ctx = {}) => `Le module r d'une forme polaire est ≥ 0 : le signe − se met dans l'argument, car −1 = e^(iπ).${ctx.r ? ` Ici −${M(ctx.r)}·e^(i·${M(ctx.theta)}) = ${M(ctx.r)}·e^(i(${M(ctx.theta)} + π)).` : ' Par exemple −2e^(−iπ/3) = 2e^(2iπ/3).'}`,
  },
  {
    id: 'a1_zn_conj_r0', family: 'method', tag: 'C', skill: 'a1-cplx-zn-conj', repair: 'a1-cplx-zn-conj',
    judges: ['solset', 'complex'],
    name: 'Division par r sans le cas r = 0',
    example: ['z³ = z̄ : S = {1 ; i ; −1 ; −i}', 'S = {0 ; 1 ; i ; −1 ; −i}'],
    check: { judge: { kind: 'solset', v: 'r', domain: '[0 ; +∞[' }, prev: 'r^3=r', line: 'r=1' },
    transform: (prev, ctx) => {
      const n = stripParen(prev);
      // In r: both sides divided by r, when r = 0 is a solution.
      if (isR(ctx) && n.t === 'rel' && n.op === '=' && contains(n, (x) => x.t === 'sym' && x.name === 'r')) {
        const at0 = evalFloat({ t: 'bin', op: '-', l: n.l, r: par(n.r) }, { r: 0 });
        if (Math.abs(at0) > 1e-12) return [];
        const r = { t: 'sym', name: 'r' };
        return [{ node: { t: 'rel', op: '=', l: { t: 'frac', n: par(n.l), d: r }, r: { t: 'frac', n: par(n.r), d: r } }, ctx: {} }];
      }
      // In z (judge complex): the solution z = 0 dropped.
      if (ctx?.cfg?.kind !== 'complex') return [];
      const w = withoutZero(prev);
      return w ? [{ node: w, ctx: {} }] : [];
    },
    explain: () => 'Avant de diviser par r, regarde r = 0 : z = 0 vérifie l\'équation (0ⁿ = 0̄ = 0). Il manque cette solution.',
  },
  {
    id: 'a1_zn_conj_polynomial_count', family: 'meaning', tag: 'C', skill: 'a1-cplx-zn-conj', repair: 'a1-cplx-zn-conj',
    judges: [],
    name: 'Nombre de solutions lu sur le degré apparent',
    example: ['z⁵ = |z| a 5 solutions', 'z⁵ = |z| a 6 solutions : 0 et les 5 racines cinquièmes de 1'],
    check: { bait: { skill: 'a1-cplx-zn-conj', exam: 'mcq' } },
    explain: () => 'z̄ et |z| ne sont pas des polynômes en z : le théorème fondamental de l\'algèbre (n racines pour un polynôme de degré n) ne s\'applique pas. Il faut compter : z⁵ = |z| a 6 solutions, 0 et les 5 racines cinquièmes de 1.',
  },
  {
    id: 'a1_conj_arg_sign', family: 'sign', tag: 'E', skill: 'a1-cplx-zn-conj', repair: 'a1-cplx-zn-conj', // U4 merge: repair g8-algebraic
    judges: ['complex'],
    name: 'Conjugué écrit sans changer le signe de l\'argument',
    example: ['z̄ = r·e^(iφ)', 'z̄ = r·e^(−iφ)'],
    check: { judge: { kind: 'complex', complex: true, form: 'any', vars: ['r', 'φ'], domain: { r: [0.5, 3], φ: [-3, 3] } }, prev: 'conj(re^(iφ))', line: 're^(iφ)' },
    // conj(X) replaced by X.
    transform: (prev) => {
      const out = [];
      walk(prev, (n, path) => {
        if (n.t === 'fn' && n.name === 'conj') { out.push({ node: replaceAt(prev, path, par(n.args[0])), ctx: {} }); return false; }
        return true;
      });
      return out;
    },
    explain: () => 'Le conjugué change le signe de l\'argument : si z = r·e^(iφ), alors z̄ = r·e^(−iφ). Avec ton signe, tu résous zⁿ = z au lieu de zⁿ = z̄.',
  },
  {
    id: 'a1_cauchy_consecutive', family: 'logic', tag: 'E', skill: 'a1-defs', repair: 'a1-defs', // U4 merge: repair a1-seq-monotone
    judges: ['logic'],
    name: 'Cauchy réduit à deux termes consécutifs',
    example: ['(aₙ) de Cauchy ⇔ aₙ₊₁ − aₙ → 0', '∀ε > 0 ∃N ∀m, n ≥ N, |aₘ − aₙ| ≤ ε'],
    check: {
      judge: { kind: 'logic', pieces: [{ text: 'ε > 0' }, { text: 'N ∈ ℕ' }, { text: 'm, n ≥ N' }, { text: '|a_m − a_n| ≤ ε' }, { text: 'n ≥ N' }, { text: '|a_(n+1) − a_n| ≤ ε' }] },
      prev: '∀ε > 0 ∃N ∈ ℕ ∀m, n ≥ N, |a_m − a_n| ≤ ε', line: '∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |a_(n+1) − a_n| ≤ ε',
    },
    // The two indices m, n replaced by n and n + 1 (pieces of the item).
    transform: (prev, ctx) => {
      const lex = lexFor(ctx?.cfg || {});
      const text = formulaText(prev, lex);
      if (!/a_m/.test(text)) return [];
      const wrong = text.replace(/∀\s*m\s*,\s*n\s*≥\s*N/, '∀n ≥ N').replace(/\|\s*a_m\s*[−-]\s*a_n\s*\|\s*≤\s*ε/, '|a_(n+1) − a_n| ≤ ε');
      return [{ node: parseFormula(wrong, lex), ctx: {} }];
    },
    explain: () => 'Cauchy compare deux termes quelconques aₘ et aₙ au-delà du rang N, pas seulement deux voisins : Log(n + 1) − Log n → 0, mais Log n → +∞ n\'est pas de Cauchy.',
  },
  {
    id: 'a1_equiv_zero_limit', family: 'rule', tag: 'E', skill: 'a1-proofs', repair: 'a1-proofs', // U4 merge: repair a1-ser-compare
    judges: [],
    name: 'Équivalent ℓ/n³ avec ℓ = 0',
    example: ['bₙ → ℓ, donc bₙ/n³ ~ ℓ/n³', 'si ℓ = 0, passer par la borne |bₙ| ≤ M'],
    check: { bait: { skill: 'a1-proofs', level: 4 } },
    explain: () => 'Si ℓ = 0, ℓ/n³ = 0 n\'est équivalent à rien : « uₙ ~ 0 » voudrait dire uₙ = 0 à partir d\'un rang. Passe par la borne |bₙ| ≤ M, qui marche dans tous les cas.',
  },
];

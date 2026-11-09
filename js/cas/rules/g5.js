// Traps of module G5 (recurrence), spec §7. Catalogue:
// docs/universite/G-gymnase-1.md, G5, « Pièges du module ».
//
// Line traps replay the mistake on the previous line (transform), compared
// with the student's line by the judge's own equivalence: same value
// (`value`), or same values at sampled whole n (`equiv`). The traps of the
// arithmetic and geometric formulas read the item's numbers in cfg.arith
// {u1, r, n} and cfg.geom {u0, q, n}. The induction traps are decoy blocks.
// `check` says how tests/judges.test.js replays example[0].

import { Q } from '../../math/rational.js';
import { walk, replaceAt, stripParen, mapNode, lit, num, sym, add, sub, mul, pow, contains } from '../ast.js';
import { toMathML } from '../mathml.js';

const M = (n) => toMathML(stripParen(n));
const EQN = { kind: 'equiv', vars: ['n'], domain: { n: { int: [1, 12] } } };

// The Σ nodes of a line, with their paths.
function sums(prev) {
  const out = [];
  walk(prev, (n, path) => { if (n.t === 'sum') out.push({ node: n, path }); return true; });
  return out;
}

const dependsOnK = (s) => contains(s.e, (x) => x.t === 'sym' && !x.sub && x.name === s.k);
// The term of a Σ with the index replaced by a node.
const termAt = (s, node) => mapNode(s.e, (x) => (x.t === 'sym' && !x.sub && x.name === s.k ? { t: 'paren', e: node } : x));
const plus = (node, c) => (c === 0 ? node : c > 0 ? add(node, num(c)) : sub(node, num(-c)));

// Factors of a product term (through brackets), or null.
function productOf(e) {
  const n = stripParen(e);
  if (n.t === 'bin' && n.op === '×') return [n.l, n.r];
  return null;
}

const q = (x) => lit(Q.of(x));

export const RULES = [
  {
    id: 'g5_count_terms', family: 'facts', tag: 'E', skill: 'g5-sigma', repair: 'g5-sigma', judges: ['value'],
    name: 'Nombre de termes faux d\'une somme',
    example: ['Σ_{k=1}^{20} 2 = 2·19', 'Σ_{k=1}^{20} 2 = 2·20'],
    check: { judge: { kind: 'value' }, prev: 'sum(2,k,1,20)', line: '2×19' },
    // A constant term counted n − p or n − p + 2 times; or, with the numbers
    // of an arithmetic sum, one term too many or too few.
    transform: (prev, ctx = {}) => {
      const out = [];
      for (const { node: s, path } of sums(prev)) {
        if (dependsOnK(s)) continue;
        const count = sub(plus(s.hi, 0), s.lo); // n − p
        out.push({ node: replaceAt(prev, path, mul(s.e, { t: 'paren', e: count })), ctx: { lo: s.lo, hi: s.hi } });
        out.push({ node: replaceAt(prev, path, mul(s.e, { t: 'paren', e: plus(count, 2) })), ctx: { lo: s.lo, hi: s.hi } });
      }
      const a = ctx.cfg?.arith;
      if (a?.sum) {
        const last = a.u1 + (a.n - 1) * a.r;
        for (const N of [a.n - 1, a.n + 1]) out.push({ node: q(new Q(N * (a.u1 + last), 2)), ctx: { lo: num(1), hi: num(a.n) } });
      }
      return out;
    },
    explain: (ctx = {}) => (ctx.lo && ctx.hi
      ? `De k = ${M(ctx.lo)} à k = ${M(ctx.hi)}, il y a ${M(ctx.hi)} − ${M(ctx.lo)} + 1 termes : compte-les sur un petit exemple (1, 2, 3 : 3 termes).`
      : 'De k = p à k = n, il y a n − p + 1 termes. Compte : 1, 2, …, 20, cela fait 20 valeurs.'),
  },
  {
    id: 'g5_sum_product', family: 'distribute', tag: 'E', skill: 'g5-sigma', repair: 'g5-sigma', judges: ['value', 'equiv'],
    name: 'Σ distribuée sur un produit ou un carré',
    example: ['Σ k² = (Σ k)²', 'Σ k² = n(n + 1)(2n + 1)/6'],
    check: { judge: EQN, prev: 'sum(k^2,k,1,n)', line: '(n(n+1)/2)^2' },
    transform: (prev) => {
      const out = [];
      for (const { node: s, path } of sums(prev)) {
        const e = stripParen(s.e);
        const one = (t) => ({ t: 'sum', e: t, k: s.k, lo: s.lo, hi: s.hi });
        if (e.t === 'pow') out.push({ node: replaceAt(prev, path, pow({ t: 'paren', e: one(e.b) }, e.e)), ctx: { term: s.e } });
        const fs = productOf(e);
        if (fs && fs.every((f) => contains(f, (x) => x.t === 'sym' && x.name === s.k))) {
          out.push({ node: replaceAt(prev, path, mul(one(fs[0]), one(fs[1]))), ctx: { term: s.e } });
        }
      }
      return out;
    },
    explain: () => 'Pour n = 2 : 1 + 4 = 5, mais (1 + 2)² = 9. Σ se distribue sur +, pas sur × ni sur un carré.',
  },
  {
    id: 'g5_hered_wrong_term', family: 'rule', tag: 'E', skill: 'g5-induction-sum', repair: 'g5-sigma', judges: ['equiv'],
    name: 'Dernier terme de la somme jusqu\'à n + 1 mal séparé',
    example: ['Σ_{k=1}^{n+1} k(k + 1) = Σ_{k=1}^{n} k(k + 1) + n(n + 1)', 'Σ_{k=1}^{n} k(k + 1) + (n + 1)(n + 2)'],
    check: { judge: EQN, prev: 'sum(k(k+1),k,1,n+1)', line: 'sum(k(k+1),k,1,n)+n(n+1)' },
    // Σ_{k=p}^{n+1} u_k → Σ_{k=p}^{n} u_k + u_n.
    transform: (prev) => sums(prev).filter(({ node: s }) => stripParen(s.hi).t === 'bin' && stripParen(s.hi).op === '+').map(({ node: s, path }) => {
      const hi = stripParen(s.hi);
      const shorter = { ...s, hi: hi.l };
      return { node: replaceAt(prev, path, add(shorter, termAt(s, hi.l))), ctx: { right: termAt(s, s.hi), wrong: termAt(s, hi.l) } };
    }),
    explain: (ctx = {}) => (ctx.right
      ? `Le dernier terme de la somme jusqu'à n + 1 est celui de k = n + 1 : ${M(ctx.right)}, pas ${M(ctx.wrong)}.`
      : 'Le dernier terme de la somme jusqu\'à n + 1 est celui de k = n + 1.'),
  },
  {
    id: 'g5_reindex_half', family: 'rule', tag: 'E', skill: 'g5-reindex', repair: 'g5-reindex', judges: ['equiv'],
    name: 'Changement d\'indice à moitié fait',
    example: ['Σ_{k=2}^{n+1} (k − 1)² = Σ_{j=2}^{n+1} j²', 'Σ_{j=1}^{n} j²'],
    check: { judge: EQN, prev: 'sum((k-1)^2,k,2,n+1)', line: 'sum(j^2,j,2,n+1)' },
    // The term shifted with the bounds kept, or the bounds shifted with the term kept.
    transform: (prev) => {
      const out = [];
      for (const { node: s, path } of sums(prev)) {
        if (!dependsOnK(s)) continue;
        for (const c of [1, -1, 2, -2]) {
          out.push({ node: replaceAt(prev, path, { ...s, e: termAt(s, plus(sym(s.k), c)) }), ctx: { c, part: 'term' } });
          out.push({ node: replaceAt(prev, path, { ...s, lo: plus(s.lo, -c), hi: plus(s.hi, -c) }), ctx: { c, part: 'bounds' } });
        }
      }
      return out;
    },
    explain: (ctx = {}) => (ctx.part === 'bounds'
      ? 'Tu as changé les bornes, mais pas le terme : quand l\'indice se décale, le terme change aussi.'
      : 'Tu as changé le terme, mais pas les bornes : pour k = 2, j = k − 1 = 1, la nouvelle somme commence à 1.'),
  },
  {
    id: 'g5_telescope_ends', family: 'rule', tag: 'E', skill: 'g5-reindex', repair: 'g5-reindex', judges: ['equiv'],
    name: 'Mauvais termes gardés après un télescopage',
    example: ['Σ_{k=1}^{n} (1/k − 1/(k + 1)) = 1 − 1/n', '1 − 1/(n + 1)'],
    check: { judge: EQN, prev: 'sum(1/k-1/(k+1),k,1,n)', line: '1-1/n' },
    // Σ (a_k − a_{k+c}): keep a_p − a_n, or a_p − a_{n+1} when c = 2.
    transform: (prev) => {
      const out = [];
      for (const { node: s, path } of sums(prev)) {
        const e = stripParen(s.e);
        if (e.t !== 'bin' || e.op !== '-') continue;
        const L = (at) => mapNode(e.l, (x) => (x.t === 'sym' && !x.sub && x.name === s.k ? { t: 'paren', e: at } : x));
        const R = (at) => mapNode(e.r, (x) => (x.t === 'sym' && !x.sub && x.name === s.k ? { t: 'paren', e: at } : x));
        out.push({ node: replaceAt(prev, path, { t: 'paren', e: sub(L(s.lo), L(s.hi)) }), ctx: { last: R(s.hi) } });
        out.push({ node: replaceAt(prev, path, { t: 'paren', e: sub(L(s.lo), R(s.hi)) }), ctx: { last: R(s.hi) } });
        out.push({ node: replaceAt(prev, path, { t: 'paren', e: sub(L(plus(s.lo, -1)), R(s.hi)) }), ctx: { last: R(s.hi) } });
      }
      return out;
    },
    explain: (ctx = {}) => `Écris le premier et le dernier terme : ce qui reste est le début du premier et la fin du dernier${ctx.last ? `, ${M(ctx.last)}` : ''}. Vérifie avec n = 1.`,
  },
  {
    id: 'g5_arith_half', family: 'rule', tag: 'E', skill: 'g5-arith', repair: 'g5-arith', judges: ['value'],
    name: 'Somme arithmétique sans le /2, ou n au lieu de n − 1',
    example: ['S = 20·(3 + 79) = 1640', 'S = 20·(3 + 79)/2 = 820'],
    check: { judge: { kind: 'value', expect: '820', arith: { u1: 3, r: 4, n: 20, sum: true } }, prev: 'S', line: '1640' },
    transform: (prev, ctx = {}) => {
      const a = ctx.cfg?.arith;
      if (!a) return [];
      if (a.sum) {
        const last = a.u1 + (a.n - 1) * a.r;
        return [{ node: q(a.n * (a.u1 + last)), ctx: { a } }];
      }
      return [{ node: q(a.u1 + a.n * a.r), ctx: { a, term: true } }];
    },
    explain: (ctx = {}) => (ctx.term
      ? `De u₁ à uₙ, on ajoute r une fois de moins que le rang : n − 1 fois${ctx.a ? `, ici ${ctx.a.n - 1} fois` : ''}.`
      : 'Avec 2 termes, 3 + 7 = 10 = 2·(3 + 7)/2. Sans le /2, on compte tout deux fois.'),
  },
  {
    id: 'g5_geom_offset', family: 'rule', tag: 'E', skill: 'g5-geom', repair: 'g5-geom', judges: ['value'],
    name: 'Exposant décalé dans la somme géométrique',
    example: ['5 + 10 + … + 5·2⁵ = 5(2⁷ − 1)', '5(2⁶ − 1) = 315'],
    check: { judge: { kind: 'value', expect: '315', geom: { u0: 5, q: 2, n: 6 } }, prev: 'S', line: '635' },
    // u₀(q^(N ± 1) − 1)/(q − 1) for a sum of N terms; u₀q^(n ± 1) for a term.
    transform: (prev, ctx = {}) => {
      const g = ctx.cfg?.geom;
      if (!g) return [];
      const Qq = Q.of(g.q);
      const S = (N) => Q.of(g.u0).mul(Qq.pow(N).sub(new Q(1))).div(Qq.sub(new Q(1)));
      if (g.term) return [g.n + 1, g.n - 1].filter((k) => k >= 0).map((k) => ({ node: lit(Q.of(g.u0).mul(Qq.pow(k))), ctx: { g } }));
      return [g.n + 1, g.n - 1].filter((k) => k >= 1).map((k) => ({ node: lit(S(k)), ctx: { g, k } }));
    },
    explain: (ctx = {}) => (ctx.g
      ? `De q⁰ à q^${ctx.g.n - 1}, il y a ${ctx.g.n} termes : l'exposant de la formule est ${ctx.g.n}. Vérifie avec 1 terme : u₀(q¹ − 1)/(q − 1) = u₀.`
      : 'De 2⁰ à 2⁵, il y a 6 termes, donc 2⁶ dans la formule. Vérifie avec 1 terme : 5(2¹ − 1) = 5.'),
  },
  {
    id: 'g5_induction_circular', family: 'logic', tag: 'E', skill: 'g5-induction-frame', repair: 'g5-induction-frame', judges: [],
    name: 'Récurrence : on suppose ce qu\'on veut montrer',
    example: ['Supposons P(n + 1).', 'Supposons P(n), montrons P(n + 1).'],
    check: { bait: { skill: 'g5-induction-frame', level: 3 } },
    explain: () => 'P(n + 1) est ce qu\'on veut montrer : on ne peut pas le supposer. On part de P(n).',
  },
  {
    id: 'g5_induction_no_base', family: 'logic', tag: 'E', skill: 'g5-induction-frame', repair: 'g5-induction-frame', judges: [],
    name: 'Récurrence sans initialisation',
    example: ['L\'hérédité suffit.', 'Initialisation, puis hérédité.'],
    check: { bait: { skill: 'g5-induction-frame', level: 3 } },
    explain: () => '« n > n + 1 » a une hérédité vraie, mais n\'est vraie pour aucun n. Il faut un point de départ.',
  },
];


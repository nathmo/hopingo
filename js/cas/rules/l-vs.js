// Traps of module L, section « vs » (vector spaces, bases, coordinates; see
// js/cas/rules/l.js). DEFS: {id: {name, judges, transform?, explain?, check}}.
//
// Judge `span`: the traps replay on the start of the part (a matrix, A or
// its reduced form R): the kernel with the pivot components of the wrong
// sign, the rows of R, the pivot columns of R, the rows of A at the pivot
// positions (A given as cfg.rowsA). A candidate is a line whose value is
// the list of its vectors; the judge compares families by the space they
// span.
// Judges `mat` and `value`: the generator computes the wrong answers of the
// item and writes them in cfg.wrong = {trapId: [text, …]} (matrix of T in
// the canonical bases, P⁻¹ instead of P, canonical coordinates…); the trap
// reads its texts back. Elsewhere these traps give nothing.

import * as MX from '../matrix.js';
import { toQ } from '../matexpr.js';
import { parse } from '../parse.js';
import { buildLine } from '../../judges/matcommon.js';

const fq = (x) => String(x).replace('-', '−');
const vt = (v) => `(${v.map(String).join(' ; ')})`;
const vr = (v) => `(${v.map(fq).join(' ; ')})`;
const famLine = (vecs) => buildLine({}, vecs.map(vt).join(', '));

// The reduced form of the part's start (a matrix with at least 2 columns).
function reduced(prev) {
  const v = prev?.value;
  if (!v || v.k !== 'm' || v.vec || (v.rows[0]?.length ?? 0) < 2) return null;
  const A = toQ(v);
  return A ? MX.rref(A) : null;
}

// The wrong answers the generator wrote for this trap (cfg.wrong[id]).
const fromCfg = (id, read) => (prev, ctx) => (ctx?.cfg?.wrong?.[id] || []).map((w) => {
  const text = typeof w === 'string' ? w : w.text;
  return { node: read(ctx.cfg, text), ctx: { ...(w.ctx || {}), wrong: text } };
});
const matRead = (cfg, text) => buildLine(cfg, text);
const valRead = (cfg, text) => parse(text);

export const DEFS = {
  l_subspace_zero: {
    name: 'Sous-espace sans le vecteur nul',
    judges: [],
    explain: (ctx = {}) => (ctx.zero
      ? `Le vecteur nul n'est pas dans l'ensemble : ${ctx.zero}. Un sous-espace contient toujours 0.`
      : 'Le vecteur nul n\'est pas dans l\'ensemble : la condition n\'est pas homogène (p(0) = 1, x₁ = x₂ + 3). Un sous-espace contient toujours 0.'),
    check: { bait: { skill: 'l-vs-subspace', exam: 'mcq' } },
  },
  l_subspace_nonlinear: {
    name: 'Condition non linéaire prise pour un sous-espace',
    judges: [],
    explain: (ctx = {}) => (ctx.x
      ? `La condition n'est pas stable par somme : ${ctx.x} et ${ctx.y} y sont, mais pas leur somme ${ctx.s}.`
      : 'Une condition non linéaire (uv = w², a₀² = a₁², det A = 0) n\'est pas stable par somme : deux éléments de l\'ensemble ont une somme qui en sort.'),
    check: { bait: { skill: 'l-vs-subspace', exam: 'mcq' } },
  },
  l_ker_sign: {
    name: 'Signe oublié en isolant les variables pivots',
    judges: ['span'],
    transform(prev) {
      const r = reduced(prev);
      if (!r) return [];
      const K = MX.kernel(r.R);
      if (!K.length) return [];
      const bad = K.map((v) => v.map((x, i) => (r.pivots.includes(i) ? x.neg() : x)));
      if (bad.every((v, k) => v.every((x, i) => x.eq(K[k][i])))) return [];
      return [{ node: famLine(bad), ctx: { v: vr(bad.find((v, k) => !v.every((x, i) => x.eq(K[k][i])))) } }];
    },
    explain: (ctx = {}) => (ctx.v
      ? `De x₁ + 2x₂ = 0, on tire x₁ = −2x₂ : un terme change de signe en passant de l'autre côté. Ici, A·${ctx.v} ≠ 0 : ce vecteur n'est pas dans le noyau.`
      : 'De x₁ + 2x₂ − x₄ = 0, on tire x₁ = −2x₂ + x₄ : chaque terme change de signe en passant de l\'autre côté. Vérifie toujours que A·v = 0.'),
    check: { judge: { kind: 'span', basis: ['(-2 ; 1 ; 0 ; 0)', '(1 ; 0 ; -3 ; 1)'], require: 'basis' }, prev: '[[1,2,0,-1],[0,0,1,3],[0,0,0,0]]', line: '(2 ; 1 ; 0 ; 0), (-1 ; 0 ; 3 ; 1)' },
  },
  l_ker_from_rows: {
    name: 'Lignes de R prises pour le noyau',
    judges: ['span'],
    transform(prev) {
      const r = reduced(prev);
      if (!r) return [];
      const rows = r.R.filter((row) => row.some((x) => x.n !== 0));
      return rows.length ? [{ node: famLine(rows), ctx: { v: vr(rows[0]) } }] : [];
    },
    explain: (ctx = {}) => (ctx.v
      ? `Les lignes de R engendrent l'espace des lignes, qui est <b>orthogonal</b> au noyau. Un vecteur du noyau vérifie Ax = 0 : teste A·${ctx.v}, ce n'est pas 0.`
      : 'Les lignes de R engendrent l\'espace des lignes, qui est <b>orthogonal</b> au noyau. Un vecteur du noyau vérifie Ax = 0 : on le lit sur la solution générale, une variable libre à la fois.'),
    check: { judge: { kind: 'span', basis: ['(-2 ; 1 ; 0 ; 0)', '(1 ; 0 ; -3 ; 1)'], require: 'basis' }, prev: '[[1,2,0,-1],[0,0,1,3],[0,0,0,0]]', line: '(1 ; 2 ; 0 ; -1), (0 ; 0 ; 1 ; 3)' },
  },
  l_col_from_rref: {
    name: 'Colonnes pivots prises dans R',
    judges: ['span'],
    transform(prev) {
      const r = reduced(prev);
      if (!r || !r.pivots.length) return [];
      return [{ node: famLine(r.pivots.map((j) => MX.col(r.R, j))), ctx: { cols: r.pivots.map((j) => j + 1).join(' et ') } }];
    },
    explain: (ctx = {}) => `Les opérations sur les lignes changent l'espace des colonnes. Les pivots disent <b>quelles</b> colonnes garder${ctx.cols ? ` (ici ${ctx.cols})` : ''} ; les vecteurs se prennent dans A, pas dans R.`,
    check: { judge: { kind: 'span', basis: ['(1 ; 2 ; -1)', '(0 ; 1 ; 1)'], require: 'basis' }, prev: '[[1,2,0,-1],[2,4,1,1],[-1,-2,1,4]]', line: '(1 ; 0 ; 0), (0 ; 1 ; 0)' },
  },
  l_row_from_A: {
    name: 'Lignes de A aux positions des pivots',
    judges: ['span'],
    transform(prev, ctx) {
      const r = reduced(prev);
      const A = ctx?.cfg?.rowsA ? toQ(buildLine({}, ctx.cfg.rowsA).value) : null;
      if (!r || !A || A[0].length !== r.R[0].length) return [];
      const k = r.pivots.length;
      return k ? [{ node: famLine(A.slice(0, k)), ctx: { k } }] : [];
    },
    explain: (ctx = {}) => `Les lignes non nulles de R engendrent Lgn A. Les ${ctx.k ? `${ctx.k} ` : ''}premières lignes de A ne forment pas toujours une base : les opérations sur les lignes les ont mélangées, et ici elles sont liées.`,
    check: { judge: { kind: 'span', basis: ['(1 ; 2 ; 0 ; -1)', '(0 ; 0 ; 1 ; 3)'], require: 'basis', rowsA: '[[1,2,0,-1],[2,4,0,-2],[-1,-2,1,4]]' }, prev: '[[1,2,0,-1],[0,0,1,3],[0,0,0,0]]', line: '(1 ; 2 ; 0 ; -1), (2 ; 4 ; 0 ; -2)' },
  },
  l_span_count: {
    name: 'Compter les vecteurs au lieu des pivots',
    judges: [],
    explain: (ctx = {}) => `Le nombre de vecteurs ne suffit pas : ${ctx.k ?? 'n'} vecteurs peuvent être liés (deux égaux, ou un nul). Il faut compter les pivots de la matrice des coordonnées.`,
    check: { bait: { skill: 'l-vs-basis', exam: 'mcq' } },
  },
  l_rank_dim_confusion: {
    name: 'n et m confondus dans le théorème du rang',
    judges: ['value'],
    transform: fromCfg('l_rank_dim_confusion', valRead),
    explain: (ctx = {}) => (ctx.n
      ? `Le noyau vit dans l'espace de départ, de dimension n = ${ctx.n} (le nombre de colonnes) : dim Ker A = ${ctx.n} − ${ctx.r}. m − r est la dimension de Ker Aᵀ.`
      : 'Le noyau vit dans l\'espace de départ, de dimension n (le nombre de colonnes) : dim Ker A = n − r. m − r est la dimension de Ker Aᵀ.'),
    check: { judge: { kind: 'value', expect: '4', wrong: { l_rank_dim_confusion: [{ text: '2', ctx: { n: 7, r: 3 } }] } }, prev: 'd', line: '2' },
  },
  l_coords_canonical: {
    name: 'Coordonnées lues dans la base canonique',
    judges: ['mat'],
    transform: fromCfg('l_coords_canonical', matRead),
    explain: (ctx = {}) => (ctx.wrong
      ? `${ctx.wrong.replace(/-/g, '−')} sont les coordonnées dans la base canonique. Dans B, il faut écrire le vecteur comme combinaison de b₁, b₂, b₃ : résous [b₁ b₂ b₃ | x].`
      : 'Les coefficients du vecteur sont ses coordonnées dans la base canonique. Dans B, il faut l\'écrire comme combinaison des vecteurs de B : résous [b₁ … bₙ | x].'),
    check: { judge: { kind: 'mat', expect: '(6 ; -4 ; -1)', wrong: { l_coords_canonical: ['(2 ; 3 ; -1)'] } }, prev: '[p]_B = ?', line: '(2 ; 3 ; -1)' },
  },
  l_change_basis_direction: {
    name: 'Matrice de passage dans le mauvais sens',
    judges: ['mat'],
    transform: fromCfg('l_change_basis_direction', matRead),
    explain: (ctx = {}) => `Tu as obtenu la matrice du passage inverse (P_{B←C}, ou B appliquée au lieu de B⁻¹). Contrôle : la 1re colonne de P_{C←B} donne b₁ dans la base C${ctx.b1 ? ` : il faut ${ctx.b1}` : ''}.`,
    check: { judge: { kind: 'mat', expect: '[[1,2],[1,-1]]', wrong: { l_change_basis_direction: ['[[1/3,2/3],[1/3,-1/3]]'] } }, prev: 'P = ?', line: '[[1/3,2/3],[1/3,-1/3]]' },
  },
  l_change_basis_product: {
    name: 'Matrice de passage : produit incomplet',
    judges: ['mat'],
    transform: fromCfg('l_change_basis_product', matRead),
    explain: () => 'P_{C←B} = C⁻¹B : on passe des coordonnées dans B à la base canonique (multiplier par B), puis de la canonique à C (multiplier par C⁻¹). C⁻¹ seule, ou B·C⁻¹, ne font pas ce trajet.',
    check: { judge: { kind: 'mat', expect: '[[1,2],[1,-1]]', wrong: { l_change_basis_product: ['[[2,-1],[-1,1]]', '[[3,-1],[6,-3]]'] } }, prev: 'P = ?', line: '[[2,-1],[-1,1]]' },
  },
  l_map_basis_ignored: {
    name: 'Matrice de T dans les bases canoniques',
    judges: ['mat'],
    transform: fromCfg('l_map_basis_ignored', matRead),
    explain: () => 'On demande la matrice par rapport à B : la colonne j contient les coordonnées de T(bⱼ), l\'image du j-ième vecteur <b>de B</b>, pas celle de 1, t, t².',
    check: { judge: { kind: 'mat', expect: '[[0,-1,1],[1,-1,0],[1,-1,1]]', wrong: { l_map_basis_ignored: ['[[1,-1,0],[0,1,2],[1,0,1]]'] } }, prev: '[T] = ?', line: '[[1,-1,0],[0,1,2],[1,0,1]]' },
  },
  l_similar_order: {
    name: 'P et P⁻¹ échangées',
    judges: ['mat'],
    transform: fromCfg('l_similar_order', matRead),
    explain: () => 'Pour lire T dans B : on passe des coordonnées dans B aux coordonnées canoniques (P), on applique A, puis on revient (P⁻¹) : [T]_B = P⁻¹AP, donc A = P·[T]_B·P⁻¹.',
    check: { judge: { kind: 'mat', expect: '[[3,0],[2,2]]', wrong: { l_similar_order: ['[[0,-3],[2,5]]'] } }, prev: 'A = ?', line: '[[0,-3],[2,5]]' },
  },
};

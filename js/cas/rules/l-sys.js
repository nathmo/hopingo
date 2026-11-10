// Traps of module L, section « sys » (systems, vectors, linear maps; see
// js/cas/rules/l.js). DEFS: {id: {name, judges, transform?, wrongValues?,
// explain?, check}}.
//
// The row-operation traps (judge rowops) replay the announced operations
// (ctx.cfg._ops) on the previous matrix, or the likely ones
// (candidateOps). Each candidate is a line node {t:'mline', value}.

import { Mx, simp, applyRowOp, isZeroScalar, opReadable, sameScalar, parseExpr, evalAst } from '../matexpr.js';
import { parse } from '../parse.js';
import { Q } from '../../math/rational.js';
import { add, mul, neg, lit } from '../ast.js';
import { exactValue } from '../normal.js';
import { toText } from '../print.js';
import { candidateOps } from '../../judges/rowops.js';

const T = (n) => toText(n).replace(/-/g, '−');
const opsOf = (prev, ctx) => (ctx?.cfg?._ops?.length ? ctx.cfg._ops : candidateOps(prev.value.rows, { vars: ctx?.cfg?.vars || [] })).filter((op) => op.kind === 'add');
const line = (rows, aug) => ({ t: 'mline', ops: [], assigns: [], label: null, body: null, value: Mx(rows, { aug }) });
const matrixOf = (prev) => (prev?.value?.k === 'm' ? prev.value : null);

export const DEFS = {
  l_rhs_forgotten: {
    name: 'Second membre oublié',
    judges: ['rowops'],
    transform(prev, ctx) {
      const v = matrixOf(prev);
      if (!v || !v.aug) return [];
      return opsOf(prev, ctx).map((op) => {
        const rows = applyRowOp(v.rows, op).map((r, i) => (i === op.i ? r.map((x, c) => (c < v.aug ? x : v.rows[i][c])) : r));
        return { node: line(rows, v.aug), ctx: { i: op.i + 1, j: op.j + 1, b: T(v.rows[op.i][v.aug]), bk: T(simp(add(v.rows[op.i][v.aug], mul(op.k, v.rows[op.j][v.aug])))) } };
      });
    },
    explain: (ctx = {}) => (ctx.i
      ? `Tu as transformé les coefficients de la ligne ${ctx.i}, mais pas son second membre : il reste ${ctx.b} au lieu de ${ctx.bk}. Une équation se transforme en entier, des deux côtés du signe =.`
      : 'Tu as transformé les coefficients de la ligne, mais pas son second membre. Une équation se transforme en entier, des deux côtés du signe = : la colonne après la barre change aussi.'),
    check: { judge: { kind: 'rowops', goal: 'echelon' }, prev: '[[1,2,-1|3],[2,5,1|7],[-1,1,4|0]]', line: 'L2 ← L2 - 2L1 : [[1,2,-1|3],[0,1,3|7],[-1,1,4|0]]' },
  },
  l_rowop_sign: {
    name: 'Ajouter au lieu de retrancher',
    judges: ['rowops'],
    transform(prev, ctx) {
      const v = matrixOf(prev);
      if (!v) return [];
      return opsOf(prev, ctx).map((op) => {
        const c = v.rows[op.j].findIndex((x) => !isZeroScalar(x));
        const bad = { ...op, k: simp(neg(op.k)) };
        return { node: line(applyRowOp(v.rows, bad), v.aug), ctx: { i: op.i + 1, j: op.j + 1, a: T(v.rows[op.i][c] ?? op.k), p: T(v.rows[op.j][c] ?? op.k), op: opReadable(op), bad: opReadable(bad) } };
      });
    },
    explain: (ctx = {}) => (ctx.i
      ? `Pour annuler ${ctx.a} avec le pivot ${ctx.p}, il faut faire ${ctx.op}. Tu as fait ${ctx.bad} : la case double au lieu de devenir 0.`
      : 'Pour annuler une case sous le pivot, il faut retrancher le bon multiple de la ligne du pivot. Avec le mauvais signe, la case double au lieu de devenir 0.'),
    check: { judge: { kind: 'rowops', goal: 'echelon' }, prev: '[[1,2,-1|3],[2,5,1|7],[-1,1,4|0]]', line: 'L2 ← L2 - 2L1 : [[1,2,-1|3],[4,9,-1|13],[-1,1,4|0]]' },
  },
  l_rowop_partial: {
    name: 'Multiplicateur oublié hors du pivot',
    judges: ['rowops'],
    transform(prev, ctx) {
      const v = matrixOf(prev);
      if (!v) return [];
      const out = [];
      for (const op of opsOf(prev, ctx)) {
        const kq = exactValue(op.k);
        if (!kq || Math.abs(kq.valueOf()) === 1) continue;
        const s = kq.n < 0 ? -1 : 1;
        const c = v.rows[op.j].findIndex((x) => !isZeroScalar(x));
        const rows = v.rows.map((r) => [...r]);
        rows[op.i] = v.rows[op.i].map((x, cc) => simp(cc === c ? add(x, mul(op.k, v.rows[op.j][cc])) : add(x, mul(lit(new Q(s)), v.rows[op.j][cc]))));
        const k = T(simp(neg(op.k)));
        const col = rows[op.i].findIndex((x, cc) => cc !== c && !sameScalar(x, simp(add(v.rows[op.i][cc], mul(op.k, v.rows[op.j][cc])))));
        out.push({ node: line(rows, v.aug), ctx: { k, j: op.j + 1, c: col + 1, a: T(v.rows[op.i][col] ?? op.k), b: T(v.rows[op.j][col] ?? op.k), right: T(simp(add(v.rows[op.i][col] ?? op.k, mul(op.k, v.rows[op.j][col] ?? op.k)))) } });
      }
      return out;
    },
    explain: (ctx = {}) => (ctx.k && ctx.c > 0
      ? `Le facteur ${ctx.k} multiplie <b>toute</b> la ligne ${ctx.j}, pas seulement son pivot. Dans la colonne ${ctx.c}, il fallait ${ctx.a} − ${ctx.k}·(${ctx.b}) = ${ctx.right}.`
      : 'Le facteur multiplie <b>toute</b> la ligne du pivot, pas seulement le pivot : chaque case de la ligne se retranche avec ce facteur.'),
    check: { judge: { kind: 'rowops', goal: 'echelon' }, prev: '[[1,2,-1],[2,5,1]]', line: 'L2 ← L2 - 2L1 : [[1,2,-1],[0,3,2]]' },
  },
  l_rowop_wrong_row: {
    name: 'Résultat écrit dans la mauvaise ligne',
    judges: ['rowops'],
    transform(prev, ctx) {
      const v = matrixOf(prev);
      if (!v) return [];
      return opsOf(prev, ctx).map((op) => {
        const done = applyRowOp(v.rows, op);
        const rows = v.rows.map((r, i) => (i === op.j ? done[op.i] : r));
        return { node: line(rows, v.aug), ctx: { i: op.i + 1, j: op.j + 1 } };
      });
    },
    explain: (ctx = {}) => (ctx.i
      ? `L${ctx.i} ← … veut dire que c'est la ligne ${ctx.i} qui change ; la ligne ${ctx.j} reste telle quelle.`
      : 'Lᵢ ← … veut dire que c\'est la ligne i qui change ; la ligne qu\'on ajoute reste telle quelle.'),
    check: { judge: { kind: 'rowops', goal: 'echelon' }, prev: '[[1,2|3],[2,5|7]]', line: 'L2 ← L2 - 2L1 : [[0,1|1],[2,5|7]]' },
  },
  l_rref_not_reduced: {
    name: 'Échelonnée mais pas réduite',
    judges: [],
    explain: (ctx = {}) => (ctx.x
      ? `Ta matrice est échelonnée, mais pas réduite : il reste ${ctx.x} au-dessus du pivot de la colonne ${ctx.c}. La forme réduite est la seule qui soit unique.`
      : 'Ta matrice est échelonnée, mais pas réduite : il reste des cases non nulles au-dessus d\'un pivot, ou un pivot différent de 1. La forme réduite est la seule qui soit unique.'),
    check: { bait: { skill: 'l-sys-rref', exam: 'mcq' } },
  },
  // The particular solution alone: cfg.particular is p (the free variables
  // at 0), cfg.free names them (judge mat of « x = (2 + 3t ; …) »).
  l_free_var_zero: {
    name: 'Variables libres mises à 0',
    judges: ['mat'],
    transform(prev, ctx) {
      const p = ctx?.cfg?.particular;
      if (!p) return [];
      const value = evalAst(parseExpr(p, {}), {}, {});
      return [{ node: { ...line([]), value }, ctx: { p: p.replace(/-/g, '−'), free: ctx.cfg.free || 'une variable' } }];
    },
    explain: (ctx = {}) => (ctx.p
      ? `${ctx.p} est bien une solution, mais ${ctx.free} est libre : chaque valeur de ${ctx.free} donne une autre solution. Il y en a une infinité, de la forme p + t·v : garde la variable libre comme paramètre.`
      : 'Tu as donné une seule solution (les variables libres à 0), mais une variable libre peut prendre n\'importe quelle valeur : il y a une infinité de solutions, de la forme p + t·v.'),
    check: { judge: { kind: 'mat', vars: ['t'], expect: '(2-3t ; -1+t ; t)', particular: '(2 ; -1 ; 0)', free: 'x₃' }, prev: 'x', line: 'x = (2 ; -1 ; 0)' },
  },
  // Named by the judge rowops itself: an operation that multiplies a row
  // by an expression of the parameter (ctx.k, the factor).
  l_param_divide_zero: {
    name: 'Division par une expression qui peut s\'annuler',
    judges: ['rowops'],
    explain: (ctx = {}) => (ctx.k
      ? `Tu as multiplié une ligne par ${T(ctx.k)}, qui vaut 0 ou n'existe pas pour certaines valeurs du paramètre. Ces valeurs doivent être traitées à part : on échelonne sans diviser, puis on discute selon les zéros du pivot.`
      : 'Tu as divisé par une expression du paramètre, qui peut valoir 0. Ce cas doit être traité à part : on échelonne sans diviser, puis on discute selon les valeurs qui annulent le pivot.'),
    check: { judge: { kind: 'rowops', vars: ['a'], goal: 'echelon' }, prev: '[[1,1|1],[0,a-1|a-1]]', line: 'L2 ← (1/(a-1))L2' },
  },
  // The cases « none » and « infinity » exchanged: cfg.swapCase is the
  // other case's answer (judge solset of l-sys-param).
  l_param_none_vs_inf: {
    name: 'Aucune solution et une infinité échangées',
    judges: ['solset'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.swapCase;
      if (!s) return [];
      return [{ node: parse(s, { vars: [ctx.cfg.v || 'a'] }), ctx: { other: s.replace(/-/g, '−').replace('=', ' = ') } }];
    },
    explain: (ctx = {}) => (ctx.other
      ? `Pour ${ctx.other}, c'est l'autre cas. Une ligne 0 = c avec c ≠ 0 est impossible : aucune solution. Une infinité, c'est quand la ligne devient 0 = 0.`
      : 'La ligne 0 = c est impossible quand c ≠ 0 : aucune solution. Une infinité, c\'est quand la ligne devient 0 = 0.'),
    check: { judge: { kind: 'solset', v: 'a', sets: { S: '{1}' }, swapCase: 'a=-2' }, prev: 'S', line: 'a=-2' },
  },
  l_indep_scaled: {
    name: 'Multiples d\'une famille libre',
    judges: [],
    explain: () => 'Si un des αᵢ vaut 0, la famille α₁v₁, …, α_kv_k contient le vecteur nul : elle est liée. Contre-exemple : v₁ = (1 ; 0), v₂ = (0 ; 1), α₁ = 0, α₂ = 1.',
    check: { bait: { skill: 'l-vec-indep', exam: 'tf' } },
  },
  l_inj_rows: {
    name: 'Injective et surjective échangées',
    judges: [],
    explain: () => 'Injective, c\'est « au plus une solution » : il faut un pivot dans chaque <b>colonne</b> (pas de variable libre). Un pivot dans chaque ligne donne la surjectivité : une solution pour tout b.',
    check: { bait: { skill: 'l-map-inj-surj', exam: 'mcq' } },
  },
  // The images (or the vectors) in rows: the transposed matrix (judge mat
  // with cfg.rowsCols, the expected matrix or the previous one).
  l_matrix_rows_cols: {
    name: 'Images rangées en lignes',
    judges: ['mat'],
    transform(prev, ctx) {
      if (!ctx?.cfg?.rowsCols) return [];
      const opts = { vars: ctx.cfg.vars || [] };
      const out = [];
      for (const v of [ctx.cfg.expect !== undefined ? evalAst(parseExpr(String(ctx.cfg.expect), opts), {}, opts) : null, matrixOf(prev)]) {
        if (v?.k === 'm' && v.rows.length > 1 && v.rows[0].length > 1) out.push({ node: { ...line([]), value: Mx(v.rows[0].map((_, j) => v.rows.map((r) => r[j]))) }, ctx: {} });
      }
      return out;
    },
    explain: () => 'La colonne j de la matrice, c\'est l\'image (ou le vecteur) numéro j : c\'est pour cela que A·eⱼ redonne T(eⱼ). Tu as rangé les vecteurs en lignes : il faut les mettre en colonnes.',
    check: { judge: { kind: 'mat', expect: '[[2,2,-1],[-1,1,3],[3,-3,4]]', rowsCols: true }, prev: 'A', line: '[[2,-1,3],[2,1,-3],[-1,3,4]]' },
  },
  // The given images placed as they are (cfg.given: that matrix).
  l_map_scaled_image: {
    name: 'Images données placées telles quelles',
    judges: ['mat'],
    transform(prev, ctx) {
      const g = ctx?.cfg?.given;
      if (!g) return [];
      return [{ node: { ...line([]), value: evalAst(parseExpr(g, {}), {}, {}) }, ctx: {} }];
    },
    explain: () => 'On t\'a donné par exemple T(2e₂), qui vaut 2·T(e₂) : la colonne 2 doit contenir T(e₂), la moitié. De même, T(e₃) = T(e₂ + e₃) − T(e₂). Retrouve d\'abord chaque T(eⱼ), puis place-les en colonnes.',
    check: { judge: { kind: 'mat', expect: '[[2,2,-1],[-1,1,3],[3,-3,4]]', given: '[[2,4,1],[-1,2,4],[3,-6,1]]' }, prev: 'A', line: '[[2,4,1],[-1,2,4],[3,-6,1]]' },
  },
};

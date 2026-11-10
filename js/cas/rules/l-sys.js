// Traps of module L, section « sys » (systems, vectors, linear maps; see
// js/cas/rules/l.js). DEFS: {id: {name, judges, transform?, wrongValues?,
// explain?, check}}.
//
// The row-operation traps (judge rowops) replay the announced operations
// (ctx.cfg._ops) on the previous matrix, or the likely ones
// (candidateOps). Each candidate is a line node {t:'mline', value}.

import { Mx, simp, applyRowOp, isZeroScalar, opReadable, sameScalar } from '../matexpr.js';
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
};

// Generators of module L, section « mat » (Lay 2.1 to 2.5: products,
// inverses, maps of the plane, the invertible matrix theorem, elementary
// matrices, LU, blocks), spec §8.3. Catalogue:
// docs/universite/L-M-algebre-lineaire.md.
//
// Levels: 1–2 guided (matrix lines whose `cells` are blanks of the grid;
// a decision at level 2), 3 choose the action then write the line (menu
// `rowops`, or the generator's menu `menu` for the `mat` parts), 4 free
// lines, 5 alone. opts.exam = 'coef' | 'mcq' | 'tf' gives the exam
// variants. Every generator starts from the answer (alglin-kit.js).
//
// The `mat` parts start on a bare name (« M », « c_32 », « E^(-1) ») and
// carry the answer in cfg.expect: a start line that evaluates would show
// its value. cfg.about tells the traps what is asked (js/cas/rules/l-mat.js).

import * as MX from '../../cas/matrix.js';
import { readWith, showWith } from '../../judges/index.js';
import {
  q, mt, vt, ML, MLm, fq, qt, sub, unimodular, luPair, opLines, pickCells, withCells,
  matLines, coefItem, mcqDistinct, tfL, examTag, rowHoles, opR, opT,
} from './alglin-kit.js';

const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
const maxAbs = (A) => Math.max(...A.flat().map((x) => Math.abs(q(x).valueOf())));
const randM = (m, n, rng, lo, hi) => Array.from({ length: m }, () => Array.from({ length: n }, () => q(rng.int(lo, hi))));
const hasZeroRow = (A) => A.some((r) => r.every((x) => x.n === 0));
const hasZeroCol = (A) => hasZeroRow(MX.transpose(A));
// A text of the judges shown as written (a name, an expression of names).
const XCFG = { kind: 'mat', expect: '0' };
export const XL = (text) => showWith(XCFG, readWith(XCFG, text));
// A factor in a sum of products: 3, (−1).
const par = (x) => (q(x).n < 0 ? `(${qt(x)})` : qt(x));
const parR = (x) => (q(x).n < 0 ? `(${fq(x)})` : fq(x));
const sizeR = (A) => `${A.length} × ${A[0].length}`;
const ij = (i, j) => `${sub(i + 1)}${sub(j + 1)}`;
const tf = (x) => x;

// ======================================================================
// l-mat-product
// ======================================================================

const PROD = 'l-mat-product';
const PROD_SUB = [
  { id: 'size', label: 'tailles', skill: PROD },
  { id: 'rowcol', label: 'ligne fois colonne', skill: PROD },
];

// A (m × p) and B (p × n), entries in [lo ; hi], AB with entries ≤ 20.
// square: m = p = n (AB ≠ BA); same: n = m (BA exists too).
function prodData(rng, { square = false, same = rng.chance(0.6), sizes } = {}) {
  for (let t = 0; t < 200; t++) {
    let [m, p, n] = sizes ?? [rng.pick([2, 3]), rng.pick([2, 3]), 0];
    if (!sizes) n = same ? m : rng.pick([2, 3, 4].filter((x) => x !== m));
    if (square) { m = rng.pick([2, 3]); p = m; n = m; }
    const lim = p === 3 ? 3 : 4;
    const A = randM(m, p, rng, -lim, lim);
    const B = randM(p, n, rng, -lim, lim);
    if (hasZeroRow(A) || hasZeroCol(B)) continue;
    if (A.flat().filter((x) => x.n === 0).length > (m * p) / 3) continue;
    const AB = MX.mul(A, B);
    if (maxAbs(AB) > 20 || AB.flat().filter((x) => x.n === 0).length > 2) continue;
    if (m === n && p === m && MX.equal(AB, MX.mul(B, A))) continue;
    return { A, B, AB, m, p, n };
  }
  const A = MX.mat([[1, 2], [0, -1], [3, 1]]);
  const B = MX.mat([[2, 0, 1], [1, -1, 4]]);
  return { A, B, AB: MX.mul(A, B), m: 3, p: 2, n: 3, fallback: true };
}

// « (AB)₃₂ = 3·0 + 1·(−1) »: the text the judges read, and readable.
const expansion = (A, B, i, j) => A[i].map((x, k) => `${par(x)}·${par(B[k][j])}`).join('+');
const expansionR = (A, B, i, j) => A[i].map((x, k) => `${parR(x)}·${parR(B[k][j])}`).join(' + ');
const holesR = (A, B, i, j) => A[i].map((x) => `${parR(x)}·□`).join(' + ');

// A cell (i, j) of AB to ask: not the same as its transposed one, when there is one.
function pickCell(d, rng) {
  const cells = [];
  for (let i = 0; i < d.m; i++) for (let j = 0; j < d.n; j++) cells.push([i, j]);
  const nonzero = cells.filter(([i, j]) => d.AB[i][j].n !== 0);
  const good = nonzero.filter(([i, j]) => i !== j && d.AB[j]?.[i] && !d.AB[j][i].eq(d.AB[i][j]));
  return rng.pick(good.length ? good : nonzero.length ? nonzero : cells);
}

const prodAbout = (d, extra = {}) => ({ product: [mt(d.A), mt(d.B)], ...extra });
const prodPrompt = (d) => `Soit A = ${MLm(d.A)} et B = ${MLm(d.B)}.`;

function prodHints(d, [i, j]) {
  return [
    { level: 1, html: 'Case (i, j) de AB : la ligne i de A fois la colonne j de B, terme à terme, puis la somme.' },
    { level: 2, html: `(AB)${ij(i, j)} = ${holesR(d.A, d.B, i, j)}` },
    { level: 3, html: `(AB)${ij(i, j)} = ${expansionR(d.A, d.B, i, j)} = ${fq(d.AB[i][j])}` },
  ];
}

// The segment « c_ij = ? »: the expansion, then the value.
function cellSegment(d, [i, j], extra = {}) {
  const v = d.AB[i][j];
  return [
    { kind: 'segment', html: `Calcule le coefficient c${ij(i, j)} de C = AB.`, ask: `c${ij(i, j)} =`, start: { math: `c_${i + 1}${j + 1}` },
      judge: { kind: 'mat', expect: qt(v), about: prodAbout(d, { coef: { i, j, of: mt(d.AB), name: 'c' } }), ...extra } },
    { kind: 'eq', math: `(AB)_${i + 1}${j + 1} = ${expansion(d.A, d.B, i, j)}`, note: `Ligne ${i + 1} de A, colonne ${j + 1} de B : ${expansionR(d.A, d.B, i, j)}`, subgoal: 'rowcol' },
    { kind: 'eq', math: qt(v), note: '', subgoal: 'rowcol' },
  ];
}

function prodItem(level, rng) {
  const key = (d, tag) => `${PROD}:${tag}:${mt(d.A)}:${mt(d.B)}`;
  if (level <= 2) {
    const d = prodData(rng);
    const cell = pickCell(d, rng);
    const all = [];
    for (let i = 0; i < d.m; i++) for (let j = 0; j < d.n; j++) all.push([i, j]);
    const k = level === 1 ? Math.ceil(all.length / 2) : all.length - 1;
    const cells = rng.shuffle(all).slice(0, k).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const judge = { kind: 'mat', expect: mt(d.AB), about: prodAbout(d) };
    const script = [];
    if (level === 2) {
      const right = `${d.m} × ${d.n}`;
      const opts = [
        { id: 'ok', label: right, valid: true },
        d.n !== d.m ? { id: 'rev', label: `${d.n} × ${d.m}`, valid: false, why: `Les lignes de AB viennent de A (${d.m} lignes), ses colonnes de B (${d.n} colonnes) : AB est ${right}.` } : null,
        d.p !== d.m || d.p !== d.n ? { id: 'inner', label: `${d.p} × ${d.p}`, valid: false, why: `Le nombre ${d.p} (colonnes de A = lignes de B) disparaît dans le produit : AB est ${right}.` } : null,
        { id: 'none', label: 'Impossible', valid: false, why: `A a ${d.p} colonnes et B a ${d.p} lignes : le produit existe.` },
      ].filter(Boolean);
      script.push({ kind: 'decision', prompt: 'Quelle est la taille de AB ?', options: rng.shuffle(opts) });
    }
    script.push(withCells({ kind: 'eq', math: mt(d.AB), note: 'Case (i, j) : ligne i de A · colonne j de B', subgoal: 'rowcol' }, cells));
    return matLines({
      skill: PROD, level, prompt: `${prodPrompt(d)} ${level === 1 ? `AB est ${sizeR(d.AB)}. ` : ''}Complète le produit AB.`,
      start: 'AB', judge, mode: 'guided', script, hints: prodHints(d, cell), subgoals: PROD_SUB, key: key(d, 'g'), fallback: d.fallback,
    });
  }
  if (level === 3) {
    const d = prodData(rng);
    const cell = pickCell(d, rng);
    const [i, j] = cell;
    const menu1 = rng.shuffle([
      { id: 'ok', label: `Ligne ${i + 1} de A et colonne ${j + 1} de B`, valid: true },
      i !== j ? { id: 'swap', label: `Ligne ${j + 1} de A et colonne ${i + 1} de B`, valid: false, rule: 'l_coef_index_swap', why: `Le premier indice donne la ligne de A, le second la colonne de B : c${ij(i, j)} vient de la ligne ${i + 1} et de la colonne ${j + 1}.` } : null,
      { id: 'cols', label: `Colonne ${i + 1} de A et ligne ${j + 1} de B`, valid: false, why: 'Dans AB, on prend une ligne de A et une colonne de B.' },
      { id: 'cell', label: `La case (${i + 1}, ${j + 1}) de A fois la case (${i + 1}, ${j + 1}) de B`, valid: false, rule: 'l_product_entrywise', why: 'Une case de AB est une somme de produits « ligne fois colonne », pas le produit de deux cases.' },
    ].filter(Boolean));
    const menu2 = rng.shuffle([
      { id: 'ok', label: 'Chaque case : une ligne de A fois une colonne de B', valid: true },
      { id: 'cell', label: 'Multiplier les cases au même endroit', valid: false, rule: 'l_product_entrywise', why: 'Le produit matriciel n\'est pas le produit case par case.' },
      { id: 'ba', label: 'Chaque case : une ligne de B fois une colonne de A', valid: false, rule: 'l_ab_commute', why: 'Ce serait BA, et le produit ne commute pas.' },
    ]);
    const [seg, ...rest] = cellSegment(d, cell, { menu: menu1 });
    const script = [
      ...rest,
      { kind: 'segment', html: 'Calcule tout le produit AB.', start: { math: 'AB' }, judge: { kind: 'mat', expect: mt(d.AB), about: prodAbout(d), menu: menu2 } },
      { kind: 'eq', math: mt(d.AB), note: `AB est ${sizeR(d.AB)}`, subgoal: 'rowcol' },
    ];
    return matLines({
      skill: PROD, level, prompt: `${prodPrompt(d)} Calcule d'abord le coefficient c${ij(i, j)} de C = AB : choisis la ligne et la colonne à multiplier. Puis calcule AB.`,
      start: seg.start.math, judge: seg.judge, mode: 'tap', tapActions: 'menu', script, hints: prodHints(d, cell), subgoals: PROD_SUB, key: key(d, 't'), fallback: d.fallback,
    });
  }
  if (level === 4) {
    const d = prodData(rng);
    const At = MX.transpose(d.A);
    const Bt = MX.transpose(d.B);
    const ABt = MX.transpose(d.AB);
    const script = [
      { kind: 'eq', math: mt(d.AB), note: `AB est ${sizeR(d.AB)} : ligne fois colonne`, subgoal: 'rowcol' },
      { kind: 'segment', html: 'Calcule (AB)ᵀ en passant par BᵀAᵀ.', start: { math: '(AB)^T' }, judge: { kind: 'mat', expect: mt(ABt), about: { transpose: [mt(d.A), mt(d.B)] } } },
      { kind: 'eq', math: `${mt(Bt)}·${mt(At)}`, note: '(AB)ᵀ = BᵀAᵀ : l\'ordre s\'inverse', subgoal: 'size' },
      { kind: 'eq', math: mt(ABt), note: '', subgoal: 'rowcol' },
    ];
    return matLines({
      skill: PROD, level, prompt: `${prodPrompt(d)} Calcule AB, puis (AB)ᵀ.`,
      start: 'AB', judge: { kind: 'mat', expect: mt(d.AB), about: prodAbout(d) }, mode: 'free', script,
      hints: [
        { level: 1, html: 'Case (i, j) de AB : ligne i de A fois colonne j de B. Puis (AB)ᵀ = BᵀAᵀ : la transposée renverse l\'ordre.' },
        prodHints(d, pickCell(d, rng))[1],
        { level: 3, html: `AB = ${MLm(d.AB)}` },
      ],
      subgoals: PROD_SUB, key: key(d, 'f'), fallback: d.fallback,
    });
  }
  return prodExpr(rng);
}

// Level 5: (A + B)², AᵀB or A² − 2A + I, 2 × 2 or 3 × 3, without help.
function prodExpr(rng) {
  for (let t = 0; t < 200; t++) {
    const n = rng.pick([2, 2, 3]);
    const lim = n === 3 ? 2 : 3;
    const A = randM(n, n, rng, -lim, lim);
    const B = randM(n, n, rng, -lim, lim);
    if (hasZeroRow(A) || hasZeroRow(B)) continue;
    const kind = rng.pick(['sq', 'tA', 'poly']);
    const I = MX.identity(n);
    let start; let mid; let R; let text;
    if (kind === 'sq') {
      const S = MX.add(A, B);
      R = MX.mul(S, S);
      start = '(A+B)^2'; text = '(A + B)²'; mid = `${mt(S)}^2`;
      if (MX.equal(R, MX.add(MX.add(MX.mul(A, A), MX.scale(MX.mul(A, B), 2)), MX.mul(B, B)))) continue;
    } else if (kind === 'tA') {
      R = MX.mul(MX.transpose(A), B);
      start = 'A^T·B'; text = 'AᵀB'; mid = `${mt(MX.transpose(A))}·${mt(B)}`;
    } else {
      const A2 = MX.mul(A, A);
      R = MX.add(MX.sub(A2, MX.scale(A, 2)), I);
      start = 'A^2-2A+I'; text = 'A² − 2A + I'; mid = `${mt(A2)}-${mt(MX.scale(A, 2))}+I`;
    }
    if (maxAbs(R) > 25 || R.flat().every((x) => x.n === 0)) continue;
    const about = kind === 'tA' ? { product: [mt(MX.transpose(A)), mt(B)] } : kind === 'sq' ? { product: [mt(MX.add(A, B)), mt(MX.add(A, B))] } : {};
    return matLines({
      skill: PROD, level: 5, prompt: `Soit A = ${MLm(A)}${kind === 'poly' ? '' : ` et B = ${MLm(B)}`}. Calcule ${text}.`,
      start, judge: { kind: 'mat', expect: mt(R), about }, mode: 'free',
      script: [
        { kind: 'eq', math: mid, note: kind === 'sq' ? '(A + B)² = (A + B)(A + B), sans développer' : kind === 'tA' ? 'Transposer A, puis multiplier' : 'A², puis 2A, puis + I', subgoal: 'rowcol' },
        { kind: 'eq', math: mt(R), note: '', subgoal: 'rowcol' },
      ],
      hints: [], subgoals: PROD_SUB, key: `${PROD}:x:${kind}:${mt(A)}:${mt(B)}`,
    });
  }
  const d = prodData(rng, { sizes: [3, 2, 3] });
  return matLines({
    skill: PROD, level: 5, prompt: `${prodPrompt(d)} Calcule AB.`, start: 'AB', judge: { kind: 'mat', expect: mt(d.AB), about: prodAbout(d) },
    mode: 'free', script: [{ kind: 'eq', math: mt(d.AB), subgoal: 'rowcol' }], hints: [], subgoals: PROD_SUB, key: `${PROD}:x:fb`, fallback: true,
  });
}

// Product counter-examples: [A, B] pairs for the identities.
const NONCOMMUTE = [[[[1, 0], [0, 0]], [[0, 1], [0, 0]]], [[[1, 1], [0, 1]], [[1, 0], [1, 1]]], [[[0, 1], [0, 0]], [[0, 0], [1, 0]]], [[[1, 2], [0, 1]], [[1, 0], [0, 2]]]];
const ZERO_PAIRS = [[[[1, 0], [0, 0]], [[0, 0], [0, 1]]], [[[1, 1], [1, 1]], [[1, -1], [-1, 1]]], [[[0, 1], [0, 0]], [[1, 0], [0, 0]]], [[[1, 2], [2, 4]], [[2, 4], [-1, -2]]]];
const pairCounter = (test, [A, B], n = 2) => ({
  kind: 'matPair', params: { n, test },
  ask: [{ v: 'A', label: 'A =', shape: [n, n] }, { v: 'B', label: 'B =', shape: [n, n] }],
  answer: { A: mt(MX.mat(A)), B: mt(MX.mat(B)) },
});

function prodExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.pick(['sq', 'zero', 'tr', 'trOk', 'dist', 'assoc']);
    const tag = examTag({ exam });
    if (which === 'sq') {
      const pr = rng.pick(NONCOMMUTE);
      return tfL({
        skill: PROD, key: `sq:${mt(MX.mat(pr[0]))}`, truth: false, exam: tag, ruleIfTrue: 'l_ab_commute',
        statement: 'Pour toutes matrices carrées A et B de même taille, (A + B)² = A² + 2AB + B².',
        counter: pairCounter('(A+B)^2=A^2+2AB+B^2', pr),
        explanation: `Faux : (A + B)² = A² + AB + BA + B², et AB ≠ BA en général. Par exemple A = ${MLm(MX.mat(pr[0]))}, B = ${MLm(MX.mat(pr[1]))}.`,
      });
    }
    if (which === 'zero') {
      const pr = rng.pick(ZERO_PAIRS);
      return tfL({
        skill: PROD, key: `zero:${mt(MX.mat(pr[0]))}`, truth: false, exam: tag,
        statement: 'Si A et B sont des matrices carrées telles que AB = 0, alors A = 0 ou B = 0.',
        counter: pairCounter('AB=0⇒A=0ouB=0', pr),
        explanation: `Faux : A = ${MLm(MX.mat(pr[0]))} et B = ${MLm(MX.mat(pr[1]))} sont non nulles, et AB = 0.`,
      });
    }
    if (which === 'tr') {
      const pr = rng.pick(NONCOMMUTE);
      return tfL({
        skill: PROD, key: `tr:${mt(MX.mat(pr[0]))}`, truth: false, exam: tag, ruleIfTrue: 'l_transpose_product',
        statement: 'Pour toutes matrices carrées A et B de même taille, (AB)ᵀ = AᵀBᵀ.',
        counter: pairCounter('(AB)^T=A^TB^T', pr),
        explanation: `Faux : (AB)ᵀ = BᵀAᵀ, et AᵀBᵀ = (BA)ᵀ. Dès que AB ≠ BA, l'égalité tombe : A = ${MLm(MX.mat(pr[0]))}, B = ${MLm(MX.mat(pr[1]))}.`,
      });
    }
    const T = {
      trOk: ['Pour A de taille m × n et B de taille n × p, (AB)ᵀ = BᵀAᵀ.', 'Vrai : la case (i, j) de (AB)ᵀ est la ligne j de A fois la colonne i de B, c\'est-à-dire la ligne i de Bᵀ fois la colonne j de Aᵀ.'],
      dist: ['Pour A de taille m × n et B, C de taille n × p, A(B + C) = AB + AC.', 'Vrai : le produit est distributif, à condition de garder A à gauche.'],
      assoc: ['Pour A, B, C dont les produits existent, (AB)C = A(BC).', 'Vrai : le produit de matrices est associatif (c\'est la composition des applications).'],
    }[which];
    return tfL({ skill: PROD, key: which, truth: true, exam: tag, statement: T[0], explanation: T[1], ruleIfFalse: null });
  }
  const d = prodData(rng, { square: exam === 'mcq' || rng.chance(0.5) });
  const [i, j] = pickCell(d, rng);
  const right = d.AB[i][j];
  const prompt = `${prodPrompt(d)} Soit C = AB. Que vaut c${ij(i, j)} ?`;
  const solution = [{ html: `c${ij(i, j)} = ${expansionR(d.A, d.B, i, j)} = ${fq(right)}`, note: `Ligne ${i + 1} de A, colonne ${j + 1} de B` }];
  if (exam === 'coef') {
    return coefItem({
      skill: PROD, level: 4, prompt, label: `c_${i + 1}${j + 1}`, value: qt(right), key: `${mt(d.A)}:${mt(d.B)}:${i}${j}`, exam: examTag({ exam }),
      askCoef: { label: `c${ij(i, j)}`, path: [i, j] }, traps: [{ rule: 'l_coef_index_swap' }, { rule: 'l_product_entrywise' }, { rule: 'l_ab_commute' }],
      subgoals: PROD_SUB, solution, fallback: d.fallback,
    });
  }
  const BA = d.m === d.n ? MX.mul(d.B, d.A) : null;
  return mcqDistinct({
    skill: PROD, level: 4, key: `mcq:${mt(d.A)}:${mt(d.B)}:${i}${j}`, exam: examTag({ exam }), prompt,
    right: fq(right),
    wrongs: [
      BA?.[i]?.[j] ? { html: fq(BA[i][j]), rule: 'l_ab_commute' } : null,
      d.AB[j]?.[i] ? { html: fq(d.AB[j][i]), rule: 'l_coef_index_swap' } : null,
      d.A[i]?.[j] && d.B[i]?.[j] ? { html: fq(d.A[i][j].mul(d.B[i][j])), rule: 'l_product_entrywise' } : null,
    ].filter(Boolean),
    fillers: [{ html: fq(right.neg()) }, { html: fq(right.add(1)) }, { html: fq(right.sub(1)) }, { html: fq(right.add(2)) }],
    solution, fallback: d.fallback,
  }, rng);
}

// ======================================================================
// l-mat-inverse
// ======================================================================

const INV = 'l-mat-inverse';
const ECH = 'l-sys-echelon';
const RREF = 'l-sys-rref';
const INV_SUB = [
  { id: 'down', label: 'descendre', skill: ECH },
  { id: 'up', label: 'remonter', skill: RREF },
  { id: 'read', label: 'lire', skill: INV },
];

// A (n × n) with a nice inverse: unimodular (whole inverse), or
// M·diag(1, …, 1, d) (fractions k/d in the last row of A⁻¹). The reduction
// of [A | I] (no exchange) stays small. The asked entry b_ij ≠ b_ji, ≠ 0.
function invData(rng, { n = 3, scaled = false, maxOps = 8, unitPivot = false } = {}) {
  for (let t = 0; t < 200; t++) {
    let A = unimodular(n, rng, { max: 3 });
    if (scaled) A = MX.mul(A, MX.diag([...Array(n - 1).fill(1), rng.pick([2, 3])]));
    if (maxAbs(A) > 6 || A.flat().filter((x) => x.n === 0).length > n - 1 || A.some((r) => r.filter((x) => x.n !== 0).length < 2)) continue;
    const Ai = MX.inverse(A);
    if (maxAbs(Ai) > 9 || (unitPivot && Math.abs(A[0][0].valueOf()) !== 1)) continue;
    const M = MX.hcat(A, MX.identity(n));
    const red = MX.rref(M, { cols: n });
    if (red.ops.length < 3 || red.ops.length > maxOps || red.ops.some((op) => op.kind === 'swap')) continue;
    let ok = true;
    let X = M;
    for (const op of red.ops) {
      X = MX.applyOp(X, op);
      if (maxAbs(X) > 12 || X.flat().some((x) => x.d > 3)) ok = false;
    }
    if (!ok) continue;
    const cells = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (i !== j && Ai[i][j].n !== 0 && !Ai[i][j].eq(Ai[j][i])) cells.push([i, j]);
    if (!cells.length) continue;
    const [i, j] = rng.pick(cells);
    return { A, Ai, M, ops: red.ops, n, i, j };
  }
  const A = MX.mat([[1, 2, 0], [2, 5, 1], [1, 3, 2]]);
  const M = MX.hcat(A, MX.identity(3));
  return { A, Ai: MX.inverse(A), M, ops: MX.rref(M, { cols: 3 }).ops, n: 3, i: 0, j: 2, fallback: true };
}

const invAbout = (d, coef = false) => ({ inverse: mt(d.A), ...(coef ? { coef: { i: d.i, j: d.j, of: mt(d.Ai), name: 'b' } } : {}) });
const bLabel = (d) => `b_${d.i + 1}${d.j + 1}`;
const bName = (d) => `b${ij(d.i, d.j)}`;
const invSeg = (d) => ({ kind: 'segment', html: 'Lis A⁻¹ dans la partie droite.', start: { math: 'A^(-1)' }, judge: { kind: 'mat', expect: mt(d.Ai), about: invAbout(d) } });
const invLine = (d) => ({ kind: 'eq', math: mt(d.Ai), note: 'La partie droite de [I | A⁻¹]', subgoal: 'read' });
const coefSeg = (d, html = `Que vaut ${bName(d)}, le coefficient (${d.i + 1}, ${d.j + 1}) de A⁻¹ ?`) => ({
  kind: 'segment', html, ask: `${bName(d)} =`, start: { math: bLabel(d) }, judge: { kind: 'mat', expect: qt(d.Ai[d.i][d.j]), about: invAbout(d, true) },
});
const coefLine = (d) => ({ kind: 'eq', math: qt(d.Ai[d.i][d.j]), note: `Ligne ${d.i + 1}, colonne ${d.j + 1} de A⁻¹`, subgoal: 'read' });

function invLines(d) {
  return opLines(d.M, d.ops, {
    bar: d.n,
    note: (op) => (op.kind === 'scale' ? `Pivot à 1 : ${opR(op)}` : op.i > op.j ? `Descendre : ${opR(op)}` : `Remonter : ${opR(op)}`),
    subgoal: (op) => (op.kind === 'add' && op.i > op.j ? 'down' : 'up'),
  });
}

function invHints(d, lines) {
  const up = lines.find((l) => l.op.kind === 'add' && l.op.i < l.op.j) ?? lines[lines.length - 1];
  return [
    { level: 1, html: `Réduis [A | I] jusqu'à [I | A⁻¹] : chaque opération porte sur les ${2 * d.n} colonnes.` },
    { level: 2, html: `${opR(up.op)} : la ligne ${up.op.i + 1} devient ${rowHoles(up.result, up.op.i, d.n, d.n)}.` },
    { level: 3, html: ML(lines[0].math) },
  ];
}

// The value of b_ij when the first operation forgets the right half.
function rhsForgotten(d) {
  let X = d.M;
  d.ops.forEach((op, k) => {
    const Y = MX.applyOp(X, op);
    if (k === 0 && op.kind === 'add') Y[op.i] = Y[op.i].map((x, c) => (c < d.n ? x : X[op.i][c]));
    X = Y;
  });
  return X[d.i][d.n + d.j];
}

function invItem(level, rng) {
  if (level === 5) return invAlone(rng);
  if (level === 4 && rng.chance(0.5)) return inv2x2(rng);
  const d = invData(rng, { scaled: level === 4, maxOps: level <= 2 ? 7 : 9, unitPivot: level <= 3 });
  const lines = invLines(d);
  const judge = { kind: 'rowops', goal: 'rref', cols: d.n, multi: level >= 4 };
  const start = mt(d.M, d.n);
  const key = `${INV}:${mt(d.A)}:${d.i}${d.j}`;
  const hints = invHints(d, lines);
  const base = { skill: INV, level, start, judge, hints, subgoals: INV_SUB, fallback: d.fallback };
  if (level <= 2) {
    const script = [];
    if (level === 2) {
      const op = d.ops[0];
      const bad = { ...op, k: op.k.neg() };
      const other = { kind: 'add', i: op.i, j: [0, 1, 2].find((x) => x !== op.i && x !== op.j), k: q(1) };
      script.push({
        kind: 'decision', prompt: `Quelle opération annule la case (${op.i + 1}, 1) ?`, options: rng.shuffle([
          { id: 'ok', label: opR(op), valid: true },
          { id: 'sign', label: opR(bad), valid: false, rule: 'l_rowop_sign', why: `Avec ce signe, la case devient ${fq(d.M[op.i][0].add(bad.k.mul(d.M[op.j][0])))} au lieu de 0.` },
          { id: 'other', label: opR(other), valid: false, why: 'Cette opération ne crée pas de zéro sous le pivot : c\'est la ligne du pivot qu\'il faut ajouter.' },
        ]),
      });
    }
    lines.forEach((l) => {
      const left = pickCells(l.result.map((r) => r.slice(0, d.n)), [l.op.i], 1, rng);
      const right = pickCells(l.result.map((r) => r.slice(d.n)), [l.op.i], level === 1 ? 1 : 2, rng).map(([r, c]) => [r, c + d.n]);
      script.push(withCells(l, [...left, ...right]));
    });
    if (level === 1) script.push(invSeg(d), withCells(invLine(d), pickCells(d.Ai, [...Array(d.n).keys()], 3, rng)));
    else script.push(coefSeg(d), coefLine(d));
    return matLines({
      ...base, prompt: `Inverse A = ${MLm(d.A)} en réduisant [A | I]${level === 2 ? `, puis lis ${bName(d)}` : ''}.`,
      mode: 'guided', script, key,
    });
  }
  return matLines({
    ...base,
    prompt: `Réduis [A | I] avec A = ${MLm(d.A)}${level === 3 ? ' : choisis chaque opération, puis écris la matrice' : ''}. Puis donne ${level === 3 ? bName(d) : 'A⁻¹'}.`,
    mode: level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'rowops' : null,
    script: [...lines, ...(level === 3 ? [coefSeg(d), coefLine(d)] : [invSeg(d), invLine(d)])], key,
  });
}

// A 2 × 2 by the formula (level 4).
function inv2x2(rng) {
  let A; let det;
  for (let t = 0; t < 200; t++) {
    A = randM(2, 2, rng, -5, 5);
    det = MX.det(A);
    if ([-1, 2, -2, 3, -3, 4, -4, 5, -5].includes(det.valueOf()) && A.flat().every((x) => x.n !== 0) && !A[0][0].eq(A[1][1])) break;
    A = null;
  }
  const fb = !A;
  if (fb) { A = MX.mat([[1, 2], [3, 4]]); det = MX.det(A); }
  const [[a, b], [c, dd]] = A;
  const Ai = MX.inverse(A);
  const adj = [[dd, b.neg()], [c.neg(), a]];
  const mid = `(${qt(q(1).div(det))})·${mt(adj)}`;
  return matLines({
    skill: INV, level: 4, prompt: `Calcule l'inverse de A = ${MLm(A)} par la formule des matrices 2 × 2.`,
    start: 'A^(-1)', judge: { kind: 'mat', expect: mt(Ai), about: { inverse: mt(A) } }, mode: 'free',
    script: [
      { kind: 'eq', math: mid, note: `ad − bc = ${fq(det)} ; échanger a et d, changer le signe de b et c`, subgoal: 'read' },
      { kind: 'eq', math: mt(Ai), note: '', subgoal: 'read' },
    ],
    hints: [
      { level: 1, html: 'Pour une 2 × 2 : [[a, b], [c, d]]⁻¹ = (1/(ad − bc))·[[d, −b], [−c, a]].' },
      { level: 2, html: `ad − bc = ${parR(a)}·${parR(dd)} − ${parR(b)}·${parR(c)} = □` },
      { level: 3, html: `A⁻¹ = (1/${parR(det)})·${MLm(adj)}` },
    ],
    subgoals: INV_SUB, key: `${INV}:2x2:${mt(A)}`, fallback: fb,
  });
}

// Level 5: b_ij only, or « AB = I₄, que vaut tr B ? ».
function invAlone(rng) {
  if (rng.chance(0.35)) {
    let A; let Ai;
    for (let t = 0; t < 200 && !A; t++) {
      const X = unimodular(4, rng, { max: 3 });
      const Xi = MX.inverse(X);
      if (maxAbs(Xi) > 9 || MX.trace(Xi).eq(MX.trace(X))) continue;
      A = X; Ai = Xi;
    }
    const fb = !A;
    if (fb) { A = MX.mat([[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1], [0, 0, 0, 1]]); Ai = MX.inverse(A); }
    return coefItem({
      skill: INV, level: 5, prompt: `Soit A = ${MLm(A)} et B une matrice telle que AB = I₄. Que vaut la trace de B ?`,
      label: 'tr(B)', value: qt(MX.trace(Ai)), key: `tr:${mt(A)}`, askCoef: { label: 'tr B' },
      traps: [{ rule: 'l_inv_entrywise' }, { rule: 'l_coef_index_swap' }], subgoals: INV_SUB,
      solution: [{ html: `B = A⁻¹ = ${MLm(Ai)}`, note: 'AB = I et A carrée : B = A⁻¹' }, { html: `tr B = ${fq(MX.trace(Ai))}`, note: 'Somme de la diagonale' }],
      fallback: fb,
    });
  }
  const d = invData(rng, { scaled: rng.chance(0.5), maxOps: 9 });
  return coefItem({
    skill: INV, level: 5, prompt: `Soit A = ${MLm(d.A)} et B = A⁻¹. Que vaut ${bName(d)} ?`,
    label: bLabel(d), value: qt(d.Ai[d.i][d.j]), key: `${mt(d.A)}:${d.i}${d.j}`, askCoef: { label: bName(d), path: [d.i, d.j] },
    traps: [{ rule: 'l_coef_index_swap' }, { rule: 'l_inv_entrywise' }, { rule: 'l_rhs_forgotten' }], subgoals: INV_SUB,
    solution: [{ html: `A⁻¹ = ${MLm(d.Ai)}`, note: 'Réduire [A | I]' }, { html: `${bName(d)} = ${fq(d.Ai[d.i][d.j])}`, note: '' }],
    fallback: d.fallback,
  });
}

const INV_PAIRS = [[[[1, 1], [0, 1]], [[1, 0], [1, 1]]], [[[1, 2], [0, 1]], [[1, 0], [0, 2]]], [[[0, 1], [1, 0]], [[1, 1], [0, 1]]], [[[2, 1], [1, 1]], [[1, 0], [1, 1]]]];

function invExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const which = rng.pick(['prod', 'prod', 'transp', 'prodOk', 'twice']);
    if (which === 'prod') {
      const pr = rng.pick(INV_PAIRS);
      return tfL({
        skill: INV, key: `prod:${mt(MX.mat(pr[0]))}`, truth: false, exam: tag, ruleIfTrue: 'l_inv_product_order',
        statement: 'Si A et B sont des matrices n × n inversibles, alors AB est inversible et (AB)⁻¹ = A⁻¹B⁻¹.',
        counter: pairCounter('(AB)^-1=A^-1B^-1', pr),
        explanation: `Faux : (AB)⁻¹ = B⁻¹A⁻¹, qui diffère de A⁻¹B⁻¹ dès que A et B ne commutent pas. Par exemple A = ${MLm(MX.mat(pr[0]))} et B = ${MLm(MX.mat(pr[1]))}.`,
      });
    }
    const T = {
      transp: ['Si A est inversible, alors Aᵀ est inversible et (Aᵀ)⁻¹ = (A⁻¹)ᵀ.', 'Vrai : Aᵀ(A⁻¹)ᵀ = (A⁻¹A)ᵀ = Iᵀ = I.'],
      prodOk: ['Si A et B sont des matrices n × n inversibles, alors (AB)⁻¹ = B⁻¹A⁻¹.', 'Vrai : (AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ = AA⁻¹ = I.'],
      twice: ['Si A est inversible, alors A⁻¹ est inversible et (A⁻¹)⁻¹ = A.', 'Vrai : A⁻¹A = AA⁻¹ = I dit justement que A est l\'inverse de A⁻¹.'],
    }[which];
    return tfL({ skill: INV, key: which, truth: true, exam: tag, statement: T[0], explanation: T[1], ruleIfFalse: which === 'prodOk' ? 'l_inv_product_order' : null });
  }
  const d = invData(rng, { scaled: rng.chance(0.4), maxOps: 9 });
  const right = d.Ai[d.i][d.j];
  const prompt = `Soit A = ${MLm(d.A)} et B = A⁻¹. Que vaut ${bName(d)} ?`;
  const solution = [{ html: `A⁻¹ = ${MLm(d.Ai)}`, note: 'Réduire [A | I]' }, { html: `${bName(d)} = ${fq(right)}`, note: `Ligne ${d.i + 1}, colonne ${d.j + 1}` }];
  if (exam === 'coef') {
    return coefItem({
      skill: INV, level: 4, prompt, label: bLabel(d), value: qt(right), key: `${mt(d.A)}:${d.i}${d.j}`, exam: tag,
      askCoef: { label: bName(d), path: [d.i, d.j] }, traps: [{ rule: 'l_coef_index_swap' }, { rule: 'l_inv_entrywise' }, { rule: 'l_rhs_forgotten' }],
      subgoals: INV_SUB, solution, fallback: d.fallback,
    });
  }
  const a = d.A[d.i][d.j];
  return mcqDistinct({
    skill: INV, level: 4, key: `mcq:${mt(d.A)}:${d.i}${d.j}`, exam: tag, prompt, right: fq(right),
    wrongs: [
      { html: fq(d.Ai[d.j][d.i]), rule: 'l_coef_index_swap' },
      a.n !== 0 ? { html: fq(q(1).div(a)), rule: 'l_inv_entrywise' } : null,
      { html: fq(rhsForgotten(d)), rule: 'l_rhs_forgotten' },
    ].filter(Boolean),
    fillers: [{ html: fq(right.neg()) }, { html: fq(a) }, { html: fq(right.add(1)) }, { html: fq(right.sub(1)) }],
    solution, fallback: d.fallback,
  }, rng);
}

// ======================================================================

export const GEN = {
  [PROD]: (level, rng, profile, opts = {}) => (opts.exam ? prodExam(rng, opts.exam) : prodItem(level, rng)),
  [INV]: (level, rng, profile, opts = {}) => (opts.exam ? invExam(rng, opts.exam) : invItem(level, rng)),
};

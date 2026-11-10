// Generators of module M, part a (unit `matrices`, step U8), spec §8.3.
// Catalogue: docs/universite/L-M-algebre-lineaire.md, part M.
// Skills: m-blocks-schur, m-rank1-proj, m-spectral, m-posdef.
//
// Every matrix is built from its answer: the blocks from A₁₁ (det ±1) and
// the Schur complement S; projectors from a whole vector u; symmetric
// matrices from a whole orthogonal basis and their eigenvalues
// (A = Σ λᵢvᵢvᵢᵀ/‖vᵢ‖²); positive definite ones from A = LDLᵀ (L unit
// lower, D the pivots). Items are `lines` in parts (matrices-a-kit.js):
// `mat` lines (blocks, projectors, f(A)), `det` and `value` lines (minors,
// determinants), `solset` in a (parameter), decisions (formula of S, nature).

import * as MX from '../../cas/matrix.js';
import { q, mt, vt, ML, MLm, fq, qt, sub, unimodular, coefItem, mcqDistinct, tfL, examTag, orthIntBasis } from './alglin-kit.js';
import { blocksItem } from './kit.js';
import { partsItem, menuOf } from './matrices-a-kit.js';

const SCHUR = 'm-blocks-schur';
const RANK1 = 'm-rank1-proj';
const SPEC = 'm-spectral';
const POSDEF = 'm-posdef';

// ---------- small helpers ----------

const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
const randM = (m, n, rng, lo, hi) => Array.from({ length: m }, () => Array.from({ length: n }, () => q(rng.int(lo, hi))));
const maxAbs = (A) => Math.max(...A.flat().map((x) => Math.abs(q(x).valueOf())));
const isZeroM = (A) => A.every((r) => r.every((x) => x.n === 0));
const isInt = (A) => A.every((r) => r.every((x) => x.d === 1));
const R = (s) => String(s).replace(/-/g, '−');
// A column (m × 1) as a vector text, else a matrix text.
const T = (M) => (M[0].length === 1 && M.length > 1 ? vt(M.map((r) => r[0])) : M.length === 1 && M[0].length === 1 ? qt(M[0][0]) : mt(M));
const TM = (M) => ML(T(M));
// A factor in a product: 3, (−1).
const par = (x) => (q(x).n < 0 ? `(${qt(x)})` : qt(x));
const parR = (x) => (q(x).n < 0 ? `(${fq(x)})` : fq(x));
const outer = (u, v) => u.map((a) => v.map((b) => q(a).mul(q(b))));
const addM = (A, B) => A.map((r, i) => r.map((x, j) => x.add(B[i][j])));
const scaleM = (A, k) => A.map((r) => r.map((x) => x.mul(q(k))));
const dot = (u, v) => u.reduce((s, x, i) => s.add(q(x).mul(q(v[i]))), q(0));
const hints = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];

// ======================================================================
// m-blocks-schur
// ======================================================================

const SCHUR_SUB = [
  { id: 'inv', label: 'inverser le bloc', skill: 'l-mat-inverse' },
  { id: 'factors', label: 'facteurs X et Y', skill: 'l-mat-blocks' },
  { id: 'schur', label: 'complément de Schur', skill: SCHUR },
  { id: 'det', label: 'déterminant par blocs', skill: 'l-det-props' },
];

// A whole 2 × 2 with det in dets, small entries.
function det2(rng, dets, lim = 2) {
  for (let t = 0; t < 400; t++) {
    const A = randM(2, 2, rng, -lim, lim + 1);
    if (dets.includes(MX.det(A).valueOf()) && A.flat().filter((x) => x.n === 0).length <= 1) return A;
  }
  return MX.mat([[1, 1], [0, dets[0]]]);
}

// Blocks of A = [[A₁₁, A₁₂], [A₂₁, A₂₂]] with A₁₁ 2 × 2 (det ±1), and S.
// shape 3: A₁₂ a column, A₂₁ a row, S a number; shape 4: 2 × 2 blocks.
// given: {A11, A12, A21, A22?} for the KKT matrices.
function schurData(rng, { shape = rng.chance(0.6) ? 3 : 4, given = null } = {}) {
  for (let t = 0; t < 300; t++) {
    const A11 = given?.A11 ?? unimodular(2, rng, { max: 3 });
    const Ai = MX.inverse(A11);
    const p = shape === 3 ? 1 : 2;
    const A12 = given?.A12 ?? randM(2, p, rng, -2, 2);
    const A21 = given?.A21 ?? randM(p, 2, rng, -2, 2);
    if (isZeroM(A12) || isZeroM(A21)) continue;
    if (shape === 4 && (MX.rank(A12) < 2 || MX.rank(A21) < 2)) continue;
    const Y = MX.mul(Ai, A12);
    const X = MX.mul(A21, Ai);
    const XA12 = MX.mul(A21, Y);
    if (isZeroM(XA12) || maxAbs(Y) > 6 || maxAbs(X) > 6) continue;
    let S;
    let A22;
    if (given) {
      A22 = given.A22 ?? MX.zeros(p, p);
      S = MX.sub(A22, XA12);
      if (isZeroM(S) || MX.det(S).n === 0) continue;
    } else {
      S = shape === 3 ? [[q(nz(rng, -5, 5))]] : det2(rng, [1, -1, 2, -2]);
      A22 = addM(S, XA12);
    }
    if (maxAbs(A22) > 9 || (!given && A22.flat().every((x) => x.n === 0))) continue;
    const order = shape === 4 ? MX.sub(A22, MX.mul(MX.mul(A12, Ai), A21)) : null;
    if (order && MX.equal(order, S)) continue;
    const signed = addM(A22, XA12);
    const A = [...A11.map((r, i) => [...r, ...A12[i]]), ...A21.map((r, i) => [...r, ...A22[i]])];
    const detA11 = MX.det(A11);
    const detS = MX.det(S);
    if (!MX.det(A).eq(detA11.mul(detS))) continue;
    return { shape, A11, A12, A21, A22, Ai, X, Y, S, order, signed, A, detA11, detS, detA: detA11.mul(detS) };
  }
  const A11 = MX.mat([[2, 1], [1, 1]]);
  const A12 = MX.mat([[1], [0]]);
  const A21 = MX.mat([[1, 2]]);
  const Ai = MX.inverse(A11);
  const Y = MX.mul(Ai, A12);
  const X = MX.mul(A21, Ai);
  const S = [[q(3)]];
  const A22 = addM(S, MX.mul(A21, Y));
  const A = [...A11.map((r, i) => [...r, ...A12[i]]), ...A21.map((r, i) => [...r, ...A22[i]])];
  return { shape: 3, A11, A12, A21, A22, Ai, X, Y, S, order: null, signed: addM(A22, MX.mul(A21, Y)), A, detA11: q(1), detS: q(3), detA: q(3), fallback: true };
}

const schurNames = (d) => ({ A_11: mt(d.A11), A_12: T(d.A12), A_21: mt(d.A21), A_22: mt(d.A22), X: mt(d.X), Y: T(d.Y) });
const schurCfg = (d) => ({ A11: mt(d.A11), A12: mt(d.A12), A21: mt(d.A21), A22: mt(d.A22) });
const blocksText = (d) => `A₁₁ = ${MLm(d.A11)}, A₁₂ = ${TM(d.A12)}, A₂₁ = ${MLm(d.A21)}, A₂₂ = ${TM(d.A22)}`;
const sizeT = (d) => (d.shape === 3 ? 'A₁₁ est 2 × 2, A₂₂ est 1 × 1' : 'les quatre blocs sont 2 × 2');

// The formula of S: decision (level 2) and menu (level 3).
function schurDecision(rng) {
  return {
    kind: 'decision', prompt: 'Quelle formule donne le complément de Schur S ?', options: rng.shuffle([
      { id: 'ok', label: 'S = A₂₂ − A₂₁A₁₁⁻¹A₁₂', valid: true },
      { id: 'order', label: 'S = A₂₂ − A₁₂A₁₁⁻¹A₂₁', valid: false, rule: 'm_schur_order', why: 'On élimine A₂₁ avec le pivot A₁₁ : la ligne du bas (A₂₁), puis le pivot inversé, puis la colonne de droite (A₁₂).' },
      { id: 'sign', label: 'S = A₂₂ + A₂₁A₁₁⁻¹A₁₂', valid: false, rule: 'm_schur_sign', why: 'Comme en Gauss, on retranche : L₂ ← L₂ − A₂₁A₁₁⁻¹·L₁.' },
    ]),
  };
}

function schurSegs(d, rng, { withInv = true, withDet = true } = {}) {
  const names = schurNames(d);
  const segs = [];
  if (withInv) {
    segs.push({
      html: 'Inverse le bloc A₁₁.', start: 'A_11^(-1)', judge: { kind: 'mat', expect: mt(d.Ai), names },
      menu: menuOf(rng, 'Inverser le bloc A₁₁', [{ id: 'copy', label: 'Inverser A tout entière', valid: false, why: 'Il suffit d\'inverser le petit bloc A₁₁ : c\'est tout l\'intérêt des blocs.' }]),
      lines: [{ math: mt(d.Ai), note: `det A₁₁ = ${fq(d.detA11)} : on échange la diagonale et on change le signe des deux autres cases`, subgoal: 'inv', grid: d.Ai }],
    });
  }
  segs.push({
    html: 'Le facteur Y = A₁₁⁻¹A₁₂.', start: 'Y', judge: { kind: 'mat', expect: T(d.Y), names },
    menu: menuOf(rng, 'Y = A₁₁⁻¹·A₁₂', [{ id: 'swap', label: 'Y = A₁₂·A₁₁⁻¹', valid: false, rule: 'l_blocks_order', why: 'A₁₂ est à droite de A₁₁ : on multiplie A₁₁⁻¹ par A₁₂, dans cet ordre (et A₁₂·A₁₁⁻¹ n\'a souvent même pas de sens).' }]),
    lines: [
      { math: 'A_11^(-1)·A_12', note: 'Y = A₁₁⁻¹A₁₂', subgoal: 'factors' },
      { math: T(d.Y), note: '', subgoal: 'factors', grid: d.Y },
    ],
  });
  segs.push({
    html: 'Le facteur X = A₂₁A₁₁⁻¹.', start: 'X', judge: { kind: 'mat', expect: T(d.X), names },
    menu: menuOf(rng, 'X = A₂₁·A₁₁⁻¹', [{ id: 'swap', label: 'X = A₁₁⁻¹·A₂₁', valid: false, rule: 'l_blocks_order', why: 'A₂₁ est sous A₁₁ : X = A₂₁A₁₁⁻¹, le bloc du bas à gauche du pivot inversé.' }]),
    lines: [
      { math: 'A_21·A_11^(-1)', note: 'X = A₂₁A₁₁⁻¹', subgoal: 'factors' },
      { math: T(d.X), note: '', subgoal: 'factors', grid: d.X },
    ],
  });
  const sLast = d.shape === 3 ? { math: qt(d.S[0][0]), note: '', subgoal: 'schur', blank: true } : { math: mt(d.S), note: '', subgoal: 'schur', grid: d.S };
  segs.push({
    html: 'Le complément de Schur S.', ask: 'S =', start: 'S', judge: { kind: 'mat', expect: T(d.S), names, schur: schurCfg(d) },
    decision: schurDecision(rng),
    menu: menuOf(rng, 'S = A₂₂ − A₂₁·Y', [
      { id: 'sign', label: 'S = A₂₂ + A₂₁·Y', valid: false, rule: 'm_schur_sign', why: 'On retranche, comme en Gauss.' },
      { id: 'a22', label: 'S = A₂₂', valid: false, why: 'Le bloc A₂₂ change quand on élimine A₂₁ : S = A₂₂ − A₂₁A₁₁⁻¹A₁₂.' },
    ]),
    lines: [{ math: 'A_22 - A_21·Y', note: 'S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ = A₂₂ − A₂₁Y', subgoal: 'schur' }, sLast],
  });
  if (withDet) {
    segs.push({
      html: 'Le déterminant de A.', ask: 'det A =', start: 'det A', judge: { kind: 'mat', expect: qt(d.detA), names: { ...names, S: T(d.S) } },
      menu: menuOf(rng, 'det A = det A₁₁ · det S', [{ id: 'a22', label: 'det A = det A₁₁ · det A₂₂', valid: false, why: 'Ce serait vrai si A₂₁ ou A₁₂ était nul. En général, c\'est S qui remplace A₂₂.' }]),
      lines: [
        { math: d.shape === 3 ? 'det(A_11)·S' : 'det(A_11)·det(S)', note: `det A = det A₁₁ · det S = ${parR(d.detA11)}·${parR(d.detS)}`, subgoal: 'det' },
        { math: qt(d.detA), note: '', subgoal: 'det', blank: true },
      ],
    });
  }
  return segs;
}

const schurHints = (d) => hints(
  'Élimine le bloc A₂₁ comme une ligne de Gauss : S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est ce qui reste en bas à droite.',
  `S = ${TM(d.A22)} − ${MLm(d.A21)}·□`,
  `Y = ${TM(d.Y)}, X = ${TM(d.X)}, S = ${TM(d.S)}`,
);

function schurItem(level, rng) {
  if (level === 5) return kktItem(rng);
  if (level === 4 && rng.chance(0.5)) return schurSystem(rng);
  const d = schurData(rng, { shape: level <= 2 ? (rng.chance(0.7) ? 3 : 4) : undefined });
  const segs = schurSegs(d, rng, { withInv: level >= 3, withDet: true });
  const given = level <= 2 ? ` On donne A₁₁⁻¹ = ${MLm(d.Ai)}.` : '';
  return partsItem(level, rng, segs, {
    skill: SCHUR, key: `${SCHUR}:${level}:${mt(d.A)}`, fallback: d.fallback, subgoals: SCHUR_SUB,
    prompt: `A = ${MLm(d.A)}, découpée en blocs (${sizeT(d)}) : ${blocksText(d)}.${given} Calcule les facteurs de A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], le complément de Schur S, puis det A.${level === 3 ? ' Choisis d\'abord chaque action.' : ''}`,
    hints: schurHints(d), baits: ['l_blocks_order', 'm_schur_sign'],
  });
}

// Level 4, template (c): A·(x ; y) = (F ; G) by the Schur complement.
function schurSystem(rng) {
  const d = schurData(rng, { shape: 3 });
  const xs = [q(nz(rng, -3, 3)), q(rng.int(-3, 3))];
  const ys = q(nz(rng, -3, 3));
  const F = MX.matVec(d.A11, xs).map((v, i) => v.add(d.A12[i][0].mul(ys)));
  const G = MX.matVec(d.A21, xs)[0].add(d.A22[0][0].mul(ys));
  const s = d.S[0][0];
  const r = G.sub(MX.matVec(d.X, F)[0]);
  const names = { ...schurNames(d), F: vt(F), G: `[[${qt(G)}]]` };
  const segs = schurSegs(d, rng, { withInv: true, withDet: false }).filter((sg) => sg.start !== 'Y');
  segs.push({
    html: 'Le second membre de l\'équation en y : G − A₂₁A₁₁⁻¹F = G − XF.', start: 'G - X·F', judge: { kind: 'mat', expect: qt(r), names },
    menu: menuOf(rng, 'Éliminer x : G − X·F', [{ id: 'plus', label: 'G + X·F', valid: false, rule: 'm_schur_sign', why: 'On retranche X fois la première équation de la seconde.' }]),
    lines: [{ math: `${qt(G)} - ${mt(d.X)}·${vt(F)}`, note: 'Sy = G − A₂₁A₁₁⁻¹F', subgoal: 'schur' }, { math: qt(r), note: '', subgoal: 'schur' }],
  });
  segs.push({
    html: 'Résous Sy = G − XF.', ask: 'y =', start: 'y', judge: { kind: 'value', expect: qt(ys), form: 'irreducible' },
    menu: menuOf(rng, 'Diviser par S', [{ id: 'mul', label: 'Multiplier par S', valid: false, why: 'Sy = … : on divise par S.' }]),
    lines: [{ math: `(${qt(r)})/(${qt(s)})`, note: `y = (G − XF)/S`, subgoal: 'schur' }, { math: qt(ys), note: '' }],
  });
  segs.push({
    html: 'Puis x = A₁₁⁻¹(F − A₁₂y).', ask: 'x =', start: 'x', judge: { kind: 'mat', expect: vt(xs), names },
    menu: menuOf(rng, 'x = A₁₁⁻¹(F − A₁₂y)', [{ id: 'f', label: 'x = A₁₁⁻¹F', valid: false, why: 'La première équation est A₁₁x + A₁₂y = F : il faut retirer A₁₂y.' }]),
    lines: [{ math: `A_11^(-1)·(F - ${par(ys)}·A_12)`, note: 'A₁₁x + A₁₂y = F', subgoal: 'inv' }, { math: vt(xs), note: '', subgoal: 'inv' }],
  });
  return partsItem(4, rng, segs, {
    skill: SCHUR, key: `${SCHUR}:sys:${mt(d.A)}:${vt(F)}`, fallback: d.fallback, subgoals: SCHUR_SUB,
    prompt: `Résous A·(x ; y) = (F ; G) par blocs, avec A = ${MLm(d.A)} (x ∈ ℝ², y ∈ ℝ), F = ${ML(vt(F))} et G = ${fq(G)}. Blocs : ${blocksText(d)}. Élimine x avec le complément de Schur S.`,
    hints: hints('Comme en Gauss : multiplie la première ligne de blocs par X = A₂₁A₁₁⁻¹ et retranche-la de la seconde. Il reste Sy = G − XF.', `y = (G − XF)/S, avec S = ${fq(s)}`, `y = ${fq(ys)}, x = ${ML(vt(xs))}`),
  });
}

// Level 5: a KKT matrix [[H, Cᵀ], [C, 0]] (H 2 × 2 positive definite, one
// constraint): S = −CH⁻¹Cᵀ and det K = det H · S, without help.
function kktItem(rng) {
  let d = null;
  for (let t = 0; t < 100 && !d; t++) {
    const l = rng.int(-2, 2);
    const a = rng.pick([1, 2]);
    const c = rng.pick([1, 2, 3]);
    const L = MX.mat([[a, 0], [l, c]]);
    const H = MX.mul(L, MX.transpose(L));
    if (![1, -1].includes(MX.det(H).valueOf()) && rng.chance(0.6)) continue;
    const C = randM(1, 2, rng, -2, 2);
    if (isZeroM(C)) continue;
    const r = schurData(rng, { shape: 3, given: { A11: H, A12: MX.transpose(C), A21: C } });
    if (!r.fallback && r.S[0][0].d <= 6) d = r;
  }
  d ||= schurData(rng, { shape: 3 });
  const names = schurNames(d);
  const s = d.S[0][0];
  const segs = [
    { start: 'H^(-1)', judge: { kind: 'mat', expect: mt(d.Ai), names: { ...names, H: mt(d.A11) } }, lines: [{ math: mt(d.Ai), note: 'Inverse 2 × 2', subgoal: 'inv' }] },
    {
      html: 'Le complément de Schur de H dans K.', ask: 'S =', start: 'S', judge: { kind: 'mat', expect: qt(s), names: { ...names, C: mt(d.A21), H: mt(d.A11) }, schur: schurCfg(d) },
      lines: [{ math: '-C·H^(-1)·C^T', note: 'S = 0 − CH⁻¹Cᵀ', subgoal: 'schur' }, { math: qt(s), note: '', subgoal: 'schur' }],
    },
    {
      html: 'Le déterminant de K.', ask: 'det K =', start: 'det K', judge: { kind: 'mat', expect: qt(d.detA), names: { H: mt(d.A11), S: qt(s) } },
      lines: [{ math: 'det(H)·S', note: `det K = det H · S = ${parR(d.detA11)}·${parR(s)}`, subgoal: 'det' }, { math: qt(d.detA), note: '', subgoal: 'det' }],
    },
  ];
  return partsItem(5, rng, segs, {
    skill: SCHUR, key: `${SCHUR}:kkt:${mt(d.A)}`, fallback: d.fallback, subgoals: SCHUR_SUB, noHints: true,
    prompt: `Système KKT : K = [[H, Cᵀ], [C, 0]] = ${MLm(d.A)}, avec H = ${MLm(d.A11)} (définie positive) et la contrainte C = ${MLm(d.A21)}. Calcule H⁻¹, le complément de Schur S = −CH⁻¹Cᵀ, puis det K. K est-elle inversible ?`,
    hints: [],
  });
}

function schurExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const k = rng.int(0, 3);
    if (k === 0) return tfL({ skill: SCHUR, key: 'inv', truth: true, exam: tag, statement: 'Si A₁₁ et A = [[A₁₁, A₁₂], [A₂₁, A₂₂]] sont inversibles, le complément de Schur S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est inversible.', explanation: 'Vrai : det A = det A₁₁ · det S, donc det S ≠ 0.' });
    if (k === 1) return tfL({ skill: SCHUR, key: 'det', truth: true, exam: tag, statement: 'Si A₁₁ est inversible, det [[A₁₁, A₁₂], [A₂₁, A₂₂]] = det A₁₁ · det(A₂₂ − A₂₁A₁₁⁻¹A₁₂).', explanation: 'Vrai : A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], et les deux facteurs triangulaires par blocs ont un déterminant 1.' });
    const d = schurData(rng, { shape: 3 });
    return tfL({
      skill: SCHUR, key: `detA22:${mt(d.A)}`, truth: false, exam: tag, ruleIfTrue: 'l_blocks_inverse_each',
      statement: 'Pour A = [[A₁₁, A₁₂], [A₂₁, A₂₂]] (A₁₁ 2 × 2 inversible, A₂₂ 1 × 1), det A = det A₁₁ · det A₂₂.',
      counter: { kind: 'mx', prop: 'schurDetA22', params: { n: 3 }, ask: [{ v: 'A', label: 'A =', shape: [3, 3] }], answer: { A: mt(d.A) } },
      explanation: `Faux : c'est det A₁₁ · det S. Par exemple ${MLm(d.A)} : det A = ${fq(d.detA)}, mais det A₁₁ · a₃₃ = ${fq(d.detA11.mul(d.A22[0][0]))}.`,
    });
  }
  if (exam === 'coef') {
    const d = schurData(rng);
    if (d.shape === 3 && rng.chance(0.5)) {
      const v = q(1).div(d.S[0][0]);
      return coefItem({
        skill: SCHUR, exam: tag, label: 'b_33', value: qt(v), key: `inv33:${mt(d.A)}`, fallback: d.fallback,
        prompt: `A = ${MLm(d.A)} (A₁₁ 2 × 2 en haut à gauche). On note B = A⁻¹. Que vaut b₃₃ ? (Le bloc en bas à droite de A⁻¹ est S⁻¹.)`,
        traps: [{ rule: 'l_blocks_inverse_each' }, { rule: 'm_schur_sign' }],
        solution: [{ html: `S = ${fq(d.S[0][0])}, b₃₃ = 1/S = ${fq(v)}`, note: '' }], subgoals: SCHUR_SUB,
      });
    }
    const [i, j] = d.shape === 3 ? [0, 0] : [rng.int(0, 1), rng.int(0, 1)];
    return coefItem({
      skill: SCHUR, exam: tag, label: d.shape === 3 ? 'S' : `s_${i + 1}${j + 1}`, value: qt(d.S[i][j]), key: `s:${mt(d.A)}:${i}${j}`, fallback: d.fallback,
      prompt: `A = ${MLm(d.A)}, avec A₁₁ = ${MLm(d.A11)} (${sizeT(d)}). Que vaut ${d.shape === 3 ? 'le complément de Schur S' : `le coefficient s${sub(i + 1)}${sub(j + 1)} du complément de Schur S`} = A₂₂ − A₂₁A₁₁⁻¹A₁₂ ?`,
      traps: [{ rule: 'm_schur_sign' }, { rule: 'm_schur_order' }],
      solution: [{ html: `A₁₁⁻¹ = ${MLm(d.Ai)}, S = ${TM(d.S)}`, note: '' }], subgoals: SCHUR_SUB,
    });
  }
  // mcq: S, or the bottom right block of A⁻¹.
  const d = schurData(rng);
  if (rng.chance(0.5)) {
    return mcqDistinct({
      skill: SCHUR, level: 4, key: `mcqS:${mt(d.A)}`, exam: tag, fallback: d.fallback,
      prompt: `A = ${MLm(d.A)}, découpée avec A₁₁ = ${MLm(d.A11)} (${sizeT(d)}). Que vaut le complément de Schur S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ ?`,
      right: TM(d.S),
      wrongs: [
        { html: TM(d.signed), rule: 'm_schur_sign' },
        d.order ? { html: TM(d.order), rule: 'm_schur_order' } : null,
        { html: TM(d.A22), rule: 'l_blocks_inverse_each' },
      ].filter(Boolean),
      fillers: [{ html: TM(scaleM(d.S, -1)) }, { html: TM(addM(d.S, d.S)) }],
      solution: [{ html: `S = A₂₂ − A₂₁·Y = ${TM(d.S)}`, note: `Y = A₁₁⁻¹A₁₂ = ${TM(d.Y)}` }],
    }, rng);
  }
  const Si = MX.inverse(d.S);
  const A22i = MX.det(d.A22).n !== 0 ? MX.inverse(d.A22) : null;
  const signedI = MX.det(d.signed).n !== 0 ? MX.inverse(d.signed) : null;
  return mcqDistinct({
    skill: SCHUR, level: 4, key: `mcqInv:${mt(d.A)}`, exam: tag, fallback: d.fallback,
    prompt: `A = ${MLm(d.A)}, avec A₁₁ = ${MLm(d.A11)} (${sizeT(d)}). Quel est le bloc en bas à droite de A⁻¹ ?`,
    right: TM(Si),
    wrongs: [
      A22i ? { html: TM(A22i), rule: 'l_blocks_inverse_each' } : null,
      signedI ? { html: TM(signedI), rule: 'm_schur_sign' } : null,
      { html: TM(d.S), rule: null },
    ].filter(Boolean),
    fillers: [{ html: TM(scaleM(Si, -1)) }, { html: TM(MX.transpose(Si)) }, { html: TM(addM(Si, MX.identity(Si.length))) }],
    solution: [{ html: `Le bloc (2, 2) de A⁻¹ est S⁻¹ = ${TM(Si)}`, note: `S = ${TM(d.S)}` }],
  }, rng);
}

// ======================================================================
// m-rank1-proj
// ======================================================================

const RANK1_SUB = [
  { id: 'outer', label: 'produit uuᵀ', skill: 'l-mat-product' },
  { id: 'proj', label: 'projection', skill: 'l-orth-proj' },
  { id: 'projector', label: 'projecteur', skill: RANK1 },
];

// Whole vectors u: of whole norm (3, 7, 9) or not.
const U_INT = [[1, 2, 2], [2, 3, 6], [1, 4, 8], [2, 1, 2]];
const U_NON = [[1, 1], [1, 2], [2, 1], [1, -1], [1, 3], [1, 1, 1], [1, -1, 2], [1, 2, -1], [1, 1, 2]];
const isqrt = (n) => { const r = Math.round(Math.sqrt(n)); return r * r === n ? r : null; };
const rootT = (n) => (isqrt(n) !== null ? String(isqrt(n)) : `√${n}`);

function signsPerm(u, rng) {
  const p = rng.shuffle([...u]);
  return p.map((x) => (rng.chance(0.3) ? -x : x));
}

function projData(rng, { whole = rng.chance(0.4), dim = null } = {}) {
  for (let t = 0; t < 200; t++) {
    let u = signsPerm(rng.pick(whole && !dim ? U_INT : U_NON.filter((v) => !dim || v.length === dim)), rng);
    if (u.every((x) => x <= 0)) u = u.map((x) => -x);
    u = u.map((x) => q(x));
    const n = u.length;
    const y = Array.from({ length: n }, () => q(rng.int(-3, 3)));
    const uy = dot(u, y);
    const uu = dot(u, u);
    if (uy.n === 0 || y.every((x) => x.n === 0)) continue;
    if (MX.rank([u, y]) < 2) continue;
    const P = scaleM(outer(u, u), q(1).div(uu));
    const c = uy.div(uu);
    const Py = u.map((x) => x.mul(c));
    if (Py.some((x) => x.d > 9)) continue;
    const I = MX.identity(n);
    const H = MX.sub(I, scaleM(P, 2));
    const Hy = y.map((x, i) => x.sub(Py[i].mul(2)));
    return { u, y, n, uu, uy, P, Py, c, rest: y.map((x, i) => x.sub(Py[i])), H, Hy, IP: MX.sub(I, P), uut: outer(u, u) };
  }
  const u = [q(1), q(2), q(2)];
  const y = [q(3), q(0), q(3)];
  const P = scaleM(outer(u, u), q(1, 9));
  const H = MX.sub(MX.identity(3), scaleM(P, 2));
  return { u, y, n: 3, uu: q(9), uy: q(9), P, Py: [q(1), q(2), q(2)], c: q(1), rest: [q(2), q(-2), q(1)], H, Hy: [q(1), q(-4), q(-1)], IP: MX.sub(MX.identity(3), P), uut: outer(u, u), fallback: true };
}

// « (1/9)·[[1,2,2],…] »: the projector before the division is done.
const scaledT = (d) => `(${qt(q(1).div(d.uu))})·${mt(d.uut)}`;
const uR = (d) => ML(vt(d.u));
const projHints = (d) => hints(
  'P = uuᵀ/(uᵀu) ; pour Py, calcule d\'abord le nombre u · y, puis Py = (u · y)/(uᵀu)·u.',
  `P = (1/${d.uu})·□, où □ = uuᵀ ; puis Py = (□/${d.uu})·u`,
  `P = ${MLm(d.P)}`,
);

function projSegs(d, rng, { outerFirst = false, house = false } = {}) {
  const segs = [];
  const projCfg = { orth: [d.u.map(Number)], y: d.y.map(Number) };
  if (outerFirst) {
    segs.push({
      start: 'u·u^T', judge: { kind: 'mat', expect: mt(d.uut) },
      lines: [{ math: mt(d.uut), note: 'Case (i, j) : uᵢuⱼ', subgoal: 'outer', grid: d.uut }],
    });
  }
  segs.push({
    html: outerFirst ? `Divise par uᵀu = ${d.uu}.` : 'Le projecteur P sur Span{u}.', ask: 'P =', start: 'P', judge: { kind: 'mat', expect: mt(d.P) },
    decision: {
      kind: 'decision', prompt: `u = ${R(vt(d.u))} n'est pas unitaire (uᵀu = ${d.uu}). Quelle formule donne P ?`, options: rng.shuffle([
        { id: 'ok', label: 'P = uuᵀ/(uᵀu)', valid: true },
        { id: 'nodiv', label: 'P = uuᵀ', valid: false, rule: 'g4_proj_no_square', why: `uuᵀ n'est un projecteur que si ‖u‖ = 1 : ici (uuᵀ)² = ${d.uu}·uuᵀ ≠ uuᵀ.` },
        { id: 'norm', label: 'P = uuᵀ/‖u‖', valid: false, rule: 'g4_proj_no_square', why: 'On divise par ‖u‖² = uᵀu, pas par ‖u‖ : chacun des deux u de uuᵀ porte un facteur ‖u‖.' },
      ]),
    },
    menu: menuOf(rng, 'P = uuᵀ/(uᵀu)', [
      { id: 'nodiv', label: 'P = uuᵀ', valid: false, rule: 'g4_proj_no_square', why: 'u n\'est pas unitaire : il faut diviser par uᵀu.' },
      { id: 'norm', label: 'P = uuᵀ/‖u‖', valid: false, rule: 'g4_proj_no_square', why: 'On divise par ‖u‖², pas par ‖u‖.' },
    ]),
    lines: [{ math: scaledT(d), note: `uᵀu = ${d.uu}`, subgoal: 'projector' }, { math: mt(d.P), note: '', subgoal: 'projector', grid: d.P }],
  });
  if (house) {
    segs.push({
      html: 'La symétrie de Householder H par rapport à u⊥.', ask: 'H =', start: 'H', judge: { kind: 'mat', expect: mt(d.H), names: { P: mt(d.P) }, householder: { u: vt(d.u) } },
      menu: menuOf(rng, 'H = I − 2P', [{ id: 'once', label: 'H = I − P', valid: false, rule: 'm_householder_factor', why: 'I − P projette sur u⊥ ; la symétrie enlève deux fois la composante selon u.' }]),
      lines: [{ math: 'I - 2P', note: 'On enlève deux fois la composante selon u', subgoal: 'projector' }, { math: mt(d.H), note: '', subgoal: 'projector', grid: d.H }],
    });
  }
  segs.push({
    html: `La projection de y = ${R(vt(d.y))}.`, ask: 'Py =', start: 'Py', judge: { kind: 'mat', expect: vt(d.Py), names: { P: mt(d.P) }, proj: projCfg },
    menu: menuOf(rng, 'Py = (u · y)/(uᵀu)·u', [{ id: 'nodiv', label: 'Py = (u · y)·u', valid: false, rule: 'g4_proj_no_square', why: 'Il faut diviser par uᵀu.' }]),
    lines: [{ math: `(${qt(d.uy)}/${d.uu})·${vt(d.u)}`, note: `u · y = ${fq(d.uy)} : on projette sans former P`, subgoal: 'proj' }, { math: vt(d.Py), note: '', subgoal: 'proj', grid: d.Py.map((x) => [x]) }],
  });
  if (house) {
    segs.push({
      html: 'L\'image de y par la symétrie.', ask: 'Hy =', start: 'Hy', judge: { kind: 'mat', expect: vt(d.Hy), names: { H: mt(d.H) } },
      menu: menuOf(rng, 'Hy = y − 2Py', [{ id: 'once', label: 'Hy = y − Py', valid: false, rule: 'm_householder_factor', why: 'y − Py est la projection sur u⊥ ; la symétrie va deux fois plus loin.' }]),
      lines: [{ math: `${vt(d.y)} - 2·${vt(d.Py)}`, note: 'Hy = y − 2Py', subgoal: 'projector' }, { math: vt(d.Hy), note: `‖Hy‖ = ‖y‖ = ${rootT(dot(d.y, d.y).valueOf())}`, subgoal: 'projector', grid: d.Hy.map((x) => [x]) }],
    });
  } else {
    segs.push({
      html: 'La composante de y orthogonale à u.', ask: '(I − P)y =', start: '(I-P)y', judge: { kind: 'mat', expect: vt(d.rest), names: { P: mt(d.P) } },
      menu: menuOf(rng, '(I − P)y = y − Py', [{ id: 'py', label: '(I − P)y = Py', valid: false, why: 'I − P enlève la composante selon u : y − Py.' }]),
      lines: [{ math: `${vt(d.y)} - ${vt(d.Py)}`, note: 'y − Py', subgoal: 'proj' }, { math: vt(d.rest), note: 'Orthogonal à u : u · (I − P)y = 0', subgoal: 'proj', grid: d.rest.map((x) => [x]) }],
    });
  }
  return segs;
}

// Level 4, template (c): the projector on Col A, A(AᵀA)⁻¹Aᵀ, and its trace.
function colProjData(rng) {
  for (let t = 0; t < 300; t++) {
    const A = randM(3, 2, rng, -2, 2);
    if (MX.rank(A) < 2 || A.some((r) => r.every((x) => x.n === 0))) continue;
    const G = MX.mul(MX.transpose(A), A);
    const Gi = MX.inverse(G);
    const P = MX.mul(MX.mul(A, Gi), MX.transpose(A));
    if (P.flat().some((x) => x.d > 12) || isInt(P) || MX.det(G).valueOf() > 30) continue;
    return { A, G, Gi, P };
  }
  const A = MX.mat([[1, 0], [1, 1], [0, 1]]);
  const G = MX.mul(MX.transpose(A), A);
  const Gi = MX.inverse(G);
  return { A, G, Gi, P: MX.mul(MX.mul(A, Gi), MX.transpose(A)), fallback: true };
}

function colProjItem(rng) {
  const d = colProjData(rng);
  const names = { A: mt(d.A) };
  const segs = [
    { start: 'A^T·A', judge: { kind: 'mat', expect: mt(d.G), names }, lines: [{ math: mt(d.G), note: 'Produits scalaires des colonnes de A', subgoal: 'proj' }] },
    { html: 'Son inverse.', start: '(A^T·A)^(-1)', judge: { kind: 'mat', expect: mt(d.Gi), names }, lines: [{ math: mt(d.Gi), note: `det AᵀA = ${MX.det(d.G)}`, subgoal: 'proj' }] },
    {
      html: 'Le projecteur sur Col A.', ask: 'P =', start: 'P', judge: { kind: 'mat', expect: mt(d.P), names: { ...names, G: mt(d.G) } },
      lines: [{ math: 'A·G^(-1)·A^T', note: 'P = A(AᵀA)⁻¹Aᵀ, avec G = AᵀA', subgoal: 'projector' }, { math: mt(d.P), note: '', subgoal: 'projector' }],
    },
    {
      html: 'Le rang de P, par sa trace (les valeurs propres de P sont 1, 1 et 0).', ask: 'tr P =', start: 'tr P', judge: { kind: 'mat', expect: '2', names: { P: mt(d.P) } },
      lines: [{ math: 'tr(P)', note: 'Somme des cases diagonales', subgoal: 'projector' }, { math: '2', note: 'tr P = rang P = dim Col A' }],
    },
  ];
  return partsItem(4, rng, segs, {
    skill: RANK1, key: `${RANK1}:col:${mt(d.A)}`, fallback: d.fallback, subgoals: RANK1_SUB,
    prompt: `A = ${MLm(d.A)} a deux colonnes libres. Calcule le projecteur orthogonal P = A(AᵀA)⁻¹Aᵀ sur le plan Col A, puis sa trace.`,
    hints: hints('P = A(AᵀA)⁻¹Aᵀ : commence par la matrice 2 × 2 G = AᵀA et son inverse.', `AᵀA = ${MLm(d.G)}, (AᵀA)⁻¹ = □`, `P = ${MLm(d.P)}`),
  });
}

// Level 5 (half the time): the proof « uuᵀ is the projector on Span{u} »
// in blocks, without help.
const PROOF_P = [
  'Soit u unitaire (uᵀu = 1), P = uuᵀ, et x ∈ ℝⁿ.',
  'Px = u(uᵀx) = (u · x)u : Px est dans Span{u}.',
  'u · (x − Px) = u · x − (u · x)(u · u) = 0, car u · u = 1 : x − Px est orthogonal à u.',
  'Donc x = Px + (x − Px), avec Px ∈ Span{u} et x − Px ⊥ u.',
  'Par unicité de la décomposition orthogonale, Px est la projection orthogonale de x sur Span{u}.',
];
function projProof(rng) {
  const ids = PROOF_P.map((_, i) => `b${i}`);
  const blocks = PROOF_P.map((h, i) => ({ id: ids[i], html: h, needs: i ? [ids[i - 1]] : [], earlyWhy: i ? 'Pas encore : ce bloc s\'appuie sur le bloc précédent.' : undefined }));
  blocks.push({ id: 'd0', html: 'Comme P est la projection sur Span{u}, Px est dans Span{u}.', needs: [], distractor: 'l_proof_circular', why: 'Ce bloc suppose ce qu\'on veut montrer.' });
  blocks.push({ id: 'd1', html: 'Avec u = e₁, P = diag(1, 0) projette bien sur l\'axe des x.', needs: [], distractor: 'g9_proof_by_example', why: 'Un exemple ne prouve pas l\'énoncé pour tout u.' });
  return blocksItem({
    skill: RANK1, level: 5, mode: 'order',
    prompt: 'Montre que si u est unitaire, P = uuᵀ est la projection orthogonale sur Span{u}. Touche les blocs dans l\'ordre de la preuve.',
    blocks: rng.shuffle(blocks), goal: ids.at(-1), order: ids, placed: [],
    hints: [], noHints: true,
    solution: PROOF_P.map((s) => ({ html: s, note: '' })),
    subgoals: [{ id: 'projector', label: 'projecteur', skill: RANK1 }, { id: 'proj', label: 'projection', skill: 'l-orth-proj' }, { id: 'outer', label: 'produit uuᵀ', skill: 'l-mat-product' }],
    key: `${RANK1}:proof`, expectedSec: 140,
  });
}

function rank1Item(level, rng) {
  if (level === 5 && rng.chance(0.4)) return projProof(rng);
  if (level === 4 && rng.chance(0.5)) return colProjItem(rng);
  const house = level >= 3 && rng.chance(0.6);
  const d = projData(rng);
  const segs = projSegs(d, rng, { outerFirst: level === 1, house });
  const ask = house ? 'P, la symétrie de Householder H = I − 2P, puis Py et Hy' : 'P, puis Py et (I − P)y';
  return partsItem(level, rng, segs, {
    skill: RANK1, key: `${RANK1}:${level}:${vt(d.u)}:${vt(d.y)}:${house}`, fallback: d.fallback, subgoals: RANK1_SUB, noHints: level === 5,
    prompt: `u = ${uR(d)} et y = ${ML(vt(d.y))}. Calcule le projecteur orthogonal ${ask}.${level === 1 ? ' Commence par la matrice uuᵀ.' : ''}${level === 3 ? ' Choisis d\'abord chaque action.' : ''}`,
    hints: level === 5 ? [] : projHints(d), baits: ['g4_proj_no_square', ...(house ? ['m_householder_factor'] : [])],
  });
}

function rank1Exam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const k = rng.int(0, 3);
    if (k === 0) return tfL({ skill: RANK1, key: 'eig01', truth: true, exam: tag, statement: 'Les valeurs propres d\'un projecteur orthogonal P (P² = P, Pᵀ = P) sont 0 et 1.', explanation: 'Vrai : si Pv = λv avec v ≠ 0, alors λv = P²v = λ²v, donc λ² = λ.' });
    if (k === 1) return tfL({ skill: RANK1, key: 'trace', truth: true, exam: tag, statement: 'Pour tout vecteur u ∈ ℝⁿ, tr(uuᵀ) = ‖u‖².', explanation: 'Vrai : la diagonale de uuᵀ porte u₁², …, uₙ², dont la somme vaut ‖u‖².' });
    const d = projData(rng, { dim: 2 });
    return tfL({
      skill: RANK1, key: `inv:${vt(d.u)}`, truth: false, exam: tag,
      statement: 'Un projecteur orthogonal P (P² = P, Pᵀ = P) de ℝ² est toujours inversible.',
      counter: { kind: 'mx', prop: 'projNotInvertible', params: { n: 2 }, ask: [{ v: 'A', label: 'P =', shape: [2, 2] }], answer: { A: mt(d.P) } },
      explanation: `Faux : seul P = I est inversible. Par exemple P = ${MLm(d.P)}, la projection sur Span{${R(vt(d.u))}}, envoie ${ML(vt([d.u[1].neg(), d.u[0]]))} sur 0.`,
    });
  }
  const d = projData(rng);
  if (exam === 'coef') {
    const house = rng.chance(0.4);
    const M = house ? d.H : d.P;
    const cells = [];
    M.forEach((r, i) => r.forEach((x, j) => { if (x.n !== 0 && j >= i) cells.push([i, j]); }));
    const [i, j] = rng.pick(cells);
    const name = house ? 'h' : 'p';
    return coefItem({
      skill: RANK1, exam: tag, label: `${name}_${i + 1}${j + 1}`, value: qt(M[i][j]), key: `${name}:${vt(d.u)}:${i}${j}`, fallback: d.fallback,
      prompt: `u = ${uR(d)}. ${house ? 'H = I − 2uuᵀ/(uᵀu) est la symétrie de Householder par rapport à u⊥.' : 'P est le projecteur orthogonal sur Span{u}.'} Que vaut ${name}${sub(i + 1)}${sub(j + 1)} ?`,
      traps: house ? [{ rule: 'm_householder_factor' }, { rule: 'g4_proj_no_square' }] : [{ rule: 'g4_proj_no_square' }],
      solution: [{ html: `P = ${MLm(d.P)}${house ? `, H = I − 2P = ${MLm(d.H)}` : ''}`, note: '' }], subgoals: RANK1_SUB,
    });
  }
  const pick = rng.int(0, 2);
  const nrm = isqrt(d.uu.valueOf());
  if (pick === 0) {
    return mcqDistinct({
      skill: RANK1, level: 4, key: `mcqP:${vt(d.u)}`, exam: tag, fallback: d.fallback,
      prompt: `u = ${uR(d)}. Quel est le projecteur orthogonal sur Span{u} ?`,
      right: MLm(d.P),
      wrongs: [
        { html: MLm(d.uut), rule: 'g4_proj_no_square' },
        nrm ? { html: MLm(scaleM(d.uut, q(1, nrm))), rule: 'g4_proj_no_square' } : null,
        { html: MLm(d.IP), rule: null },
      ].filter(Boolean),
      fillers: [{ html: MLm(d.H) }, { html: MLm(scaleM(d.P, 2)) }],
      solution: [{ html: `P = uuᵀ/(uᵀu) = ${MLm(d.P)}`, note: `uᵀu = ${d.uu}` }],
    }, rng);
  }
  if (pick === 1) {
    return mcqDistinct({
      skill: RANK1, level: 4, key: `mcqH:${vt(d.u)}`, exam: tag, fallback: d.fallback,
      prompt: `u = ${uR(d)}. Quelle est la matrice de la symétrie orthogonale par rapport à l'hyperplan u⊥ (Householder) ?`,
      right: MLm(d.H),
      wrongs: [
        { html: MLm(d.IP), rule: 'm_householder_factor' },
        { html: MLm(MX.sub(MX.identity(d.n), scaleM(d.uut, 2))), rule: 'g4_proj_no_square' },
        { html: MLm(scaleM(d.H, -1)), rule: null },
      ],
      fillers: [{ html: MLm(d.P) }],
      solution: [{ html: `H = I − 2P = ${MLm(d.H)}`, note: `P = ${MLm(d.P)}` }],
    }, rng);
  }
  return mcqDistinct({
    skill: RANK1, level: 4, key: `mcqPy:${vt(d.u)}:${vt(d.y)}`, exam: tag, fallback: d.fallback,
    prompt: `u = ${uR(d)} et y = ${ML(vt(d.y))}. Quelle est la projection orthogonale de y sur Span{u} ?`,
    right: ML(vt(d.Py)),
    wrongs: [
      { html: ML(vt(d.u.map((x) => x.mul(d.uy)))), rule: 'g4_proj_no_square' },
      nrm ? { html: ML(vt(d.u.map((x) => x.mul(d.uy).div(nrm)))), rule: 'g4_proj_no_square' } : null,
      { html: ML(vt(d.rest)), rule: null },
    ].filter(Boolean),
    fillers: [{ html: ML(vt(d.Hy)) }, { html: ML(vt(d.Py.map((x) => x.mul(2)))) }],
    solution: [{ html: `Py = (u · y)/(uᵀu)·u = (${fq(d.uy)}/${d.uu})·${uR(d)} = ${ML(vt(d.Py))}`, note: '' }],
  }, rng);
}

// ======================================================================

export const GEN = {
  [RANK1]: (level, rng, profile, opts = {}) => (opts.exam ? rank1Exam(rng, opts.exam) : rank1Item(level, rng)),
  [SCHUR]: (level, rng, profile, opts = {}) => (opts.exam ? schurExam(rng, opts.exam) : schurItem(level, rng)),
};


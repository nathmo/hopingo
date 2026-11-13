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
import { unitText } from '../../cas/rules/l-sym.js';
import { t } from '../../i18n.js';

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
// The sentence added to a prompt at level 3 (the menu of actions).
const tapText = (level) => (level === 3 ? ` ${t('Choisis d\'abord chaque action.')}` : '');

// ======================================================================
// m-blocks-schur
// ======================================================================

const SCHUR_SUB = [
  { id: 'inv', label: t('inverser le bloc'), skill: 'l-mat-inverse' },
  { id: 'factors', label: t('facteurs X et Y'), skill: 'l-mat-blocks' },
  { id: 'schur', label: t('complément de Schur'), skill: SCHUR },
  { id: 'det', label: t('déterminant par blocs'), skill: 'l-det-props' },
];

// A whole 2 × 2 with det in dets, small entries.
function det2(rng, dets, lim = 2) {
  for (let tries = 0; tries < 400; tries++) {
    const A = randM(2, 2, rng, -lim, lim + 1);
    if (dets.includes(MX.det(A).valueOf()) && A.flat().filter((x) => x.n === 0).length <= 1) return A;
  }
  return MX.mat([[1, 1], [0, dets[0]]]);
}

// Blocks of A = [[A₁₁, A₁₂], [A₂₁, A₂₂]] with A₁₁ 2 × 2 (det ±1), and S.
// shape 3: A₁₂ a column, A₂₁ a row, S a number; shape 4: 2 × 2 blocks.
// given: {A11, A12, A21, A22?} for the KKT matrices.
function schurData(rng, { shape = rng.chance(0.6) ? 3 : 4, given = null } = {}) {
  for (let tries = 0; tries < 300; tries++) {
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
const sizeT = (d) => (d.shape === 3 ? t('A₁₁ est 2 × 2, A₂₂ est 1 × 1') : t('les quatre blocs sont 2 × 2'));

// The formula of S: decision (level 2) and menu (level 3).
function schurDecision(rng) {
  return {
    kind: 'decision', prompt: t('Quelle formule donne le complément de Schur S ?'), options: rng.shuffle([
      { id: 'ok', label: 'S = A₂₂ − A₂₁A₁₁⁻¹A₁₂', valid: true },
      { id: 'order', label: 'S = A₂₂ − A₁₂A₁₁⁻¹A₂₁', valid: false, rule: 'm_schur_order', why: t('On élimine A₂₁ avec le pivot A₁₁ : la ligne du bas (A₂₁), puis le pivot inversé, puis la colonne de droite (A₁₂).') },
      { id: 'sign', label: 'S = A₂₂ + A₂₁A₁₁⁻¹A₁₂', valid: false, rule: 'm_schur_sign', why: t('Comme en Gauss, on retranche : L₂ ← L₂ − A₂₁A₁₁⁻¹·L₁.') },
    ]),
  };
}

function schurSegs(d, rng, { withInv = true, withDet = true } = {}) {
  const names = schurNames(d);
  const segs = [];
  if (withInv) {
    segs.push({
      html: t('Inverse le bloc A₁₁.'), start: 'A_11^(-1)', judge: { kind: 'mat', expect: mt(d.Ai), names },
      menu: menuOf(rng, t('Inverser le bloc A₁₁'), [{ id: 'copy', label: t('Inverser A tout entière'), valid: false, why: t('Il suffit d\'inverser le petit bloc A₁₁ : c\'est tout l\'intérêt des blocs.') }]),
      lines: [{ math: mt(d.Ai), note: t('det A₁₁ = {det} : on échange la diagonale et on change le signe des deux autres cases', { det: fq(d.detA11) }), subgoal: 'inv', grid: d.Ai }],
    });
  }
  segs.push({
    html: t('Le facteur Y = A₁₁⁻¹A₁₂.'), start: 'Y', judge: { kind: 'mat', expect: T(d.Y), names },
    menu: menuOf(rng, 'Y = A₁₁⁻¹·A₁₂', [{ id: 'swap', label: 'Y = A₁₂·A₁₁⁻¹', valid: false, rule: 'l_blocks_order', why: t('A₁₂ est à droite de A₁₁ : on multiplie A₁₁⁻¹ par A₁₂, dans cet ordre (et A₁₂·A₁₁⁻¹ n\'a souvent même pas de sens).') }]),
    lines: [
      { math: 'A_11^(-1)·A_12', note: 'Y = A₁₁⁻¹A₁₂', subgoal: 'factors' },
      { math: T(d.Y), note: '', subgoal: 'factors', grid: d.Y },
    ],
  });
  segs.push({
    html: t('Le facteur X = A₂₁A₁₁⁻¹.'), start: 'X', judge: { kind: 'mat', expect: T(d.X), names },
    menu: menuOf(rng, 'X = A₂₁·A₁₁⁻¹', [{ id: 'swap', label: 'X = A₁₁⁻¹·A₂₁', valid: false, rule: 'l_blocks_order', why: t('A₂₁ est sous A₁₁ : X = A₂₁A₁₁⁻¹, le bloc du bas à gauche du pivot inversé.') }]),
    lines: [
      { math: 'A_21·A_11^(-1)', note: 'X = A₂₁A₁₁⁻¹', subgoal: 'factors' },
      { math: T(d.X), note: '', subgoal: 'factors', grid: d.X },
    ],
  });
  const sLast = d.shape === 3 ? { math: qt(d.S[0][0]), note: '', subgoal: 'schur', blank: true } : { math: mt(d.S), note: '', subgoal: 'schur', grid: d.S };
  segs.push({
    html: t('Le complément de Schur S.'), ask: 'S =', start: 'S', judge: { kind: 'mat', expect: T(d.S), names, schur: schurCfg(d) },
    decision: schurDecision(rng),
    menu: menuOf(rng, 'S = A₂₂ − A₂₁·Y', [
      { id: 'sign', label: 'S = A₂₂ + A₂₁·Y', valid: false, rule: 'm_schur_sign', why: t('On retranche, comme en Gauss.') },
      { id: 'a22', label: 'S = A₂₂', valid: false, why: t('Le bloc A₂₂ change quand on élimine A₂₁ : S = A₂₂ − A₂₁A₁₁⁻¹A₁₂.') },
    ]),
    lines: [{ math: 'A_22 - A_21·Y', note: 'S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ = A₂₂ − A₂₁Y', subgoal: 'schur' }, sLast],
  });
  if (withDet) {
    segs.push({
      html: t('Le déterminant de A.'), ask: 'det A =', start: 'det A', judge: { kind: 'mat', expect: qt(d.detA), names: { ...names, S: T(d.S) } },
      menu: menuOf(rng, 'det A = det A₁₁ · det S', [{ id: 'a22', label: 'det A = det A₁₁ · det A₂₂', valid: false, why: t('Ce serait vrai si A₂₁ ou A₁₂ était nul. En général, c\'est S qui remplace A₂₂.') }]),
      lines: [
        { math: d.shape === 3 ? 'det(A_11)·S' : 'det(A_11)·det(S)', note: `det A = det A₁₁ · det S = ${parR(d.detA11)}·${parR(d.detS)}`, subgoal: 'det' },
        { math: qt(d.detA), note: '', subgoal: 'det', blank: true },
      ],
    });
  }
  return segs;
}

const schurHints = (d) => hints(
  t('Élimine le bloc A₂₁ comme une ligne de Gauss : S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est ce qui reste en bas à droite.'),
  `S = ${TM(d.A22)} − ${MLm(d.A21)}·□`,
  `Y = ${TM(d.Y)}, X = ${TM(d.X)}, S = ${TM(d.S)}`,
);

function schurItem(level, rng) {
  if (level === 5) return kktItem(rng);
  if (level === 4 && rng.chance(0.5)) return schurSystem(rng);
  const d = schurData(rng, { shape: level <= 2 ? (rng.chance(0.7) ? 3 : 4) : undefined });
  const segs = schurSegs(d, rng, { withInv: level >= 3, withDet: true });
  const given = level <= 2 ? ` ${t('On donne A₁₁⁻¹ = {Ai}.', { Ai: MLm(d.Ai) })}` : '';
  return partsItem(level, rng, segs, {
    skill: SCHUR, key: `${SCHUR}:${level}:${mt(d.A)}`, fallback: d.fallback, subgoals: SCHUR_SUB,
    prompt: t('A = {A}, découpée en blocs ({size}) : {blocks}.{given} Calcule les facteurs de A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], le complément de Schur S, puis det A.{tap}', { A: MLm(d.A), size: sizeT(d), blocks: blocksText(d), given, tap: tapText(level) }),
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
    html: t('Le second membre de l\'équation en y : G − A₂₁A₁₁⁻¹F = G − XF.'), start: 'G - X·F', judge: { kind: 'mat', expect: qt(r), names },
    menu: menuOf(rng, t('Éliminer x : G − X·F'), [{ id: 'plus', label: 'G + X·F', valid: false, rule: 'm_schur_sign', why: t('On retranche X fois la première équation de la seconde.') }]),
    lines: [{ math: `${qt(G)} - ${mt(d.X)}·${vt(F)}`, note: 'Sy = G − A₂₁A₁₁⁻¹F', subgoal: 'schur' }, { math: qt(r), note: '', subgoal: 'schur' }],
  });
  segs.push({
    html: t('Résous Sy = G − XF.'), ask: 'y =', start: 'y', judge: { kind: 'value', expect: qt(ys), form: 'irreducible' },
    menu: menuOf(rng, t('Diviser par S'), [{ id: 'mul', label: t('Multiplier par S'), valid: false, why: t('Sy = … : on divise par S.') }]),
    lines: [{ math: `(${qt(r)})/(${qt(s)})`, note: `y = (G − XF)/S`, subgoal: 'schur' }, { math: qt(ys), note: '' }],
  });
  segs.push({
    html: t('Puis x = A₁₁⁻¹(F − A₁₂y).'), ask: 'x =', start: 'x', judge: { kind: 'mat', expect: vt(xs), names },
    menu: menuOf(rng, 'x = A₁₁⁻¹(F − A₁₂y)', [{ id: 'f', label: 'x = A₁₁⁻¹F', valid: false, why: t('La première équation est A₁₁x + A₁₂y = F : il faut retirer A₁₂y.') }]),
    lines: [{ math: `A_11^(-1)·(F - ${par(ys)}·A_12)`, note: 'A₁₁x + A₁₂y = F', subgoal: 'inv' }, { math: vt(xs), note: '', subgoal: 'inv' }],
  });
  return partsItem(4, rng, segs, {
    skill: SCHUR, key: `${SCHUR}:sys:${mt(d.A)}:${vt(F)}`, fallback: d.fallback, subgoals: SCHUR_SUB,
    prompt: t('Résous A·(x ; y) = (F ; G) par blocs, avec A = {A} (x ∈ ℝ², y ∈ ℝ), F = {F} et G = {G}. Blocs : {blocks}. Élimine x avec le complément de Schur S.', { A: MLm(d.A), F: ML(vt(F)), G: fq(G), blocks: blocksText(d) }),
    hints: hints(t('Comme en Gauss : multiplie la première ligne de blocs par X = A₂₁A₁₁⁻¹ et retranche-la de la seconde. Il reste Sy = G − XF.'), t('y = (G − XF)/S, avec S = {s}', { s: fq(s) }), `y = ${fq(ys)}, x = ${ML(vt(xs))}`),
  });
}

// Level 5: a KKT matrix [[H, Cᵀ], [C, 0]] (H 2 × 2 positive definite, one
// constraint): S = −CH⁻¹Cᵀ and det K = det H · S, without help.
function kktItem(rng) {
  let d = null;
  for (let tries = 0; tries < 100 && !d; tries++) {
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
    { start: 'H^(-1)', judge: { kind: 'mat', expect: mt(d.Ai), names: { ...names, H: mt(d.A11) } }, lines: [{ math: mt(d.Ai), note: t('Inverse 2 × 2'), subgoal: 'inv' }] },
    {
      html: t('Le complément de Schur de H dans K.'), ask: 'S =', start: 'S', judge: { kind: 'mat', expect: qt(s), names: { ...names, C: mt(d.A21), H: mt(d.A11) }, schur: schurCfg(d) },
      lines: [{ math: '-C·H^(-1)·C^T', note: 'S = 0 − CH⁻¹Cᵀ', subgoal: 'schur' }, { math: qt(s), note: '', subgoal: 'schur' }],
    },
    {
      html: t('Le déterminant de K.'), ask: 'det K =', start: 'det K', judge: { kind: 'mat', expect: qt(d.detA), names: { H: mt(d.A11), S: qt(s) } },
      lines: [{ math: 'det(H)·S', note: `det K = det H · S = ${parR(d.detA11)}·${parR(s)}`, subgoal: 'det' }, { math: qt(d.detA), note: '', subgoal: 'det' }],
    },
  ];
  return partsItem(5, rng, segs, {
    skill: SCHUR, key: `${SCHUR}:kkt:${mt(d.A)}`, fallback: d.fallback, subgoals: SCHUR_SUB, noHints: true,
    prompt: t('Système KKT : K = [[H, Cᵀ], [C, 0]] = {K}, avec H = {H} (définie positive) et la contrainte C = {C}. Calcule H⁻¹, le complément de Schur S = −CH⁻¹Cᵀ, puis det K. K est-elle inversible ?', { K: MLm(d.A), H: MLm(d.A11), C: MLm(d.A21) }),
    hints: [],
  });
}

function schurExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const k = rng.int(0, 3);
    if (k === 0) return tfL({ skill: SCHUR, key: 'inv', truth: true, exam: tag, statement: t('Si A₁₁ et A = [[A₁₁, A₁₂], [A₂₁, A₂₂]] sont inversibles, le complément de Schur S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est inversible.'), explanation: t('Vrai : det A = det A₁₁ · det S, donc det S ≠ 0.') });
    if (k === 1) return tfL({ skill: SCHUR, key: 'det', truth: true, exam: tag, statement: t('Si A₁₁ est inversible, det [[A₁₁, A₁₂], [A₂₁, A₂₂]] = det A₁₁ · det(A₂₂ − A₂₁A₁₁⁻¹A₁₂).'), explanation: t('Vrai : A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], et les deux facteurs triangulaires par blocs ont un déterminant 1.') });
    const d = schurData(rng, { shape: 3 });
    return tfL({
      skill: SCHUR, key: `detA22:${mt(d.A)}`, truth: false, exam: tag, ruleIfTrue: 'l_blocks_inverse_each',
      statement: t('Pour A = [[A₁₁, A₁₂], [A₂₁, A₂₂]] (A₁₁ 2 × 2 inversible, A₂₂ 1 × 1), det A = det A₁₁ · det A₂₂.'),
      counter: { kind: 'mx', prop: 'schurDetA22', params: { n: 3 }, ask: [{ v: 'A', label: 'A =', shape: [3, 3] }], answer: { A: mt(d.A) } },
      explanation: t('Faux : c\'est det A₁₁ · det S. Par exemple {A} : det A = {detA}, mais det A₁₁ · a₃₃ = {prod}.', { A: MLm(d.A), detA: fq(d.detA), prod: fq(d.detA11.mul(d.A22[0][0])) }),
    });
  }
  if (exam === 'coef') {
    const d = schurData(rng);
    if (d.shape === 3 && rng.chance(0.5)) {
      const v = q(1).div(d.S[0][0]);
      return coefItem({
        skill: SCHUR, exam: tag, label: 'b_33', value: qt(v), key: `inv33:${mt(d.A)}`, fallback: d.fallback,
        prompt: t('A = {A} (A₁₁ 2 × 2 en haut à gauche). On note B = A⁻¹. Que vaut b₃₃ ? (Le bloc en bas à droite de A⁻¹ est S⁻¹.)', { A: MLm(d.A) }),
        traps: [{ rule: 'l_blocks_inverse_each' }, { rule: 'm_schur_sign' }],
        solution: [{ html: `S = ${fq(d.S[0][0])}, b₃₃ = 1/S = ${fq(v)}`, note: '' }], subgoals: SCHUR_SUB,
      });
    }
    const [i, j] = d.shape === 3 ? [0, 0] : [rng.int(0, 1), rng.int(0, 1)];
    return coefItem({
      skill: SCHUR, exam: tag, label: d.shape === 3 ? 'S' : `s_${i + 1}${j + 1}`, value: qt(d.S[i][j]), key: `s:${mt(d.A)}:${i}${j}`, fallback: d.fallback,
      prompt: d.shape === 3
        ? t('A = {A}, avec A₁₁ = {A11} ({size}). Que vaut le complément de Schur S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ ?', { A: MLm(d.A), A11: MLm(d.A11), size: sizeT(d) })
        : t('A = {A}, avec A₁₁ = {A11} ({size}). Que vaut le coefficient s{ij} du complément de Schur S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ ?', { A: MLm(d.A), A11: MLm(d.A11), size: sizeT(d), ij: `${sub(i + 1)}${sub(j + 1)}` }),
      traps: [{ rule: 'm_schur_sign' }, { rule: 'm_schur_order' }],
      solution: [{ html: `A₁₁⁻¹ = ${MLm(d.Ai)}, S = ${TM(d.S)}`, note: '' }], subgoals: SCHUR_SUB,
    });
  }
  // mcq: S, or the bottom right block of A⁻¹.
  const d = schurData(rng);
  if (rng.chance(0.5)) {
    return mcqDistinct({
      skill: SCHUR, level: 4, key: `mcqS:${mt(d.A)}`, exam: tag, fallback: d.fallback,
      prompt: t('A = {A}, découpée avec A₁₁ = {A11} ({size}). Que vaut le complément de Schur S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ ?', { A: MLm(d.A), A11: MLm(d.A11), size: sizeT(d) }),
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
    prompt: t('A = {A}, avec A₁₁ = {A11} ({size}). Quel est le bloc en bas à droite de A⁻¹ ?', { A: MLm(d.A), A11: MLm(d.A11), size: sizeT(d) }),
    right: TM(Si),
    wrongs: [
      A22i ? { html: TM(A22i), rule: 'l_blocks_inverse_each' } : null,
      signedI ? { html: TM(signedI), rule: 'm_schur_sign' } : null,
      { html: TM(d.S), rule: null },
    ].filter(Boolean),
    fillers: [{ html: TM(scaleM(Si, -1)) }, { html: TM(MX.transpose(Si)) }, { html: TM(addM(Si, MX.identity(Si.length))) }],
    solution: [{ html: t('Le bloc (2, 2) de A⁻¹ est S⁻¹ = {Si}', { Si: TM(Si) }), note: `S = ${TM(d.S)}` }],
  }, rng);
}

// ======================================================================
// m-rank1-proj
// ======================================================================

const RANK1_SUB = [
  { id: 'outer', label: t('produit uuᵀ'), skill: 'l-mat-product' },
  { id: 'proj', label: t('projection'), skill: 'l-orth-proj' },
  { id: 'projector', label: t('projecteur'), skill: RANK1 },
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
  for (let tries = 0; tries < 200; tries++) {
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
  t('P = uuᵀ/(uᵀu) ; pour Py, calcule d\'abord le nombre u · y, puis Py = (u · y)/(uᵀu)·u.'),
  t('P = (1/{uu})·□, où □ = uuᵀ ; puis Py = (□/{uu})·u', { uu: d.uu }),
  `P = ${MLm(d.P)}`,
);

function projSegs(d, rng, { outerFirst = false, house = false } = {}) {
  const segs = [];
  const projCfg = { orth: [d.u.map(Number)], y: d.y.map(Number) };
  if (outerFirst) {
    segs.push({
      start: 'u·u^T', judge: { kind: 'mat', expect: mt(d.uut) },
      lines: [{ math: mt(d.uut), note: t('Case (i, j) : uᵢuⱼ'), subgoal: 'outer', grid: d.uut }],
    });
  }
  segs.push({
    html: outerFirst ? t('Divise par uᵀu = {uu}.', { uu: d.uu }) : t('Le projecteur P sur Span{u}.'), ask: 'P =', start: 'P', judge: { kind: 'mat', expect: mt(d.P) },
    decision: {
      kind: 'decision', prompt: t('u = {uv} n\'est pas unitaire (uᵀu = {uu}). Quelle formule donne P ?', { uv: R(vt(d.u)), uu: d.uu }), options: rng.shuffle([
        { id: 'ok', label: 'P = uuᵀ/(uᵀu)', valid: true },
        { id: 'nodiv', label: 'P = uuᵀ', valid: false, rule: 'g4_proj_no_square', why: t('uuᵀ n\'est un projecteur que si ‖u‖ = 1 : ici (uuᵀ)² = {uu}·uuᵀ ≠ uuᵀ.', { uu: d.uu }) },
        { id: 'norm', label: 'P = uuᵀ/‖u‖', valid: false, rule: 'g4_proj_no_square', why: t('On divise par ‖u‖² = uᵀu, pas par ‖u‖ : chacun des deux u de uuᵀ porte un facteur ‖u‖.') },
      ]),
    },
    menu: menuOf(rng, 'P = uuᵀ/(uᵀu)', [
      { id: 'nodiv', label: 'P = uuᵀ', valid: false, rule: 'g4_proj_no_square', why: t('u n\'est pas unitaire : il faut diviser par uᵀu.') },
      { id: 'norm', label: 'P = uuᵀ/‖u‖', valid: false, rule: 'g4_proj_no_square', why: t('On divise par ‖u‖², pas par ‖u‖.') },
    ]),
    lines: [{ math: scaledT(d), note: `uᵀu = ${d.uu}`, subgoal: 'projector' }, { math: mt(d.P), note: '', subgoal: 'projector', grid: d.P }],
  });
  if (house) {
    segs.push({
      html: t('La symétrie de Householder H par rapport à u⊥.'), ask: 'H =', start: 'H', judge: { kind: 'mat', expect: mt(d.H), names: { P: mt(d.P) }, householder: { u: vt(d.u) } },
      menu: menuOf(rng, 'H = I − 2P', [{ id: 'once', label: 'H = I − P', valid: false, rule: 'm_householder_factor', why: t('I − P projette sur u⊥ ; la symétrie enlève deux fois la composante selon u.') }]),
      lines: [{ math: 'I - 2P', note: t('On enlève deux fois la composante selon u'), subgoal: 'projector' }, { math: mt(d.H), note: '', subgoal: 'projector', grid: d.H }],
    });
  }
  segs.push({
    html: t('La projection de y = {y}.', { y: R(vt(d.y)) }), ask: 'Py =', start: 'Py', judge: { kind: 'mat', expect: vt(d.Py), names: { P: mt(d.P) }, proj: projCfg },
    menu: menuOf(rng, 'Py = (u · y)/(uᵀu)·u', [{ id: 'nodiv', label: 'Py = (u · y)·u', valid: false, rule: 'g4_proj_no_square', why: t('Il faut diviser par uᵀu.') }]),
    lines: [{ math: `(${qt(d.uy)}/${d.uu})·${vt(d.u)}`, note: t('u · y = {uy} : on projette sans former P', { uy: fq(d.uy) }), subgoal: 'proj' }, { math: vt(d.Py), note: '', subgoal: 'proj', grid: d.Py.map((x) => [x]) }],
  });
  if (house) {
    segs.push({
      html: t('L\'image de y par la symétrie.'), ask: 'Hy =', start: 'Hy', judge: { kind: 'mat', expect: vt(d.Hy), names: { H: mt(d.H) } },
      menu: menuOf(rng, 'Hy = y − 2Py', [{ id: 'once', label: 'Hy = y − Py', valid: false, rule: 'm_householder_factor', why: t('y − Py est la projection sur u⊥ ; la symétrie va deux fois plus loin.') }]),
      lines: [{ math: `${vt(d.y)} - 2·${vt(d.Py)}`, note: 'Hy = y − 2Py', subgoal: 'projector' }, { math: vt(d.Hy), note: `‖Hy‖ = ‖y‖ = ${rootT(dot(d.y, d.y).valueOf())}`, subgoal: 'projector', grid: d.Hy.map((x) => [x]) }],
    });
  } else {
    segs.push({
      html: t('La composante de y orthogonale à u.'), ask: '(I − P)y =', start: '(I-P)y', judge: { kind: 'mat', expect: vt(d.rest), names: { P: mt(d.P) } },
      menu: menuOf(rng, '(I − P)y = y − Py', [{ id: 'py', label: '(I − P)y = Py', valid: false, why: t('I − P enlève la composante selon u : y − Py.') }]),
      lines: [{ math: `${vt(d.y)} - ${vt(d.Py)}`, note: 'y − Py', subgoal: 'proj' }, { math: vt(d.rest), note: t('Orthogonal à u : u · (I − P)y = 0'), subgoal: 'proj', grid: d.rest.map((x) => [x]) }],
    });
  }
  return segs;
}

// Level 4, template (c): the projector on Col A, A(AᵀA)⁻¹Aᵀ, and its trace.
function colProjData(rng) {
  for (let tries = 0; tries < 300; tries++) {
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
    { start: 'A^T·A', judge: { kind: 'mat', expect: mt(d.G), names }, lines: [{ math: mt(d.G), note: t('Produits scalaires des colonnes de A'), subgoal: 'proj' }] },
    { html: t('Son inverse.'), start: '(A^T·A)^(-1)', judge: { kind: 'mat', expect: mt(d.Gi), names }, lines: [{ math: mt(d.Gi), note: `det AᵀA = ${MX.det(d.G)}`, subgoal: 'proj' }] },
    {
      html: t('Le projecteur sur Col A.'), ask: 'P =', start: 'P', judge: { kind: 'mat', expect: mt(d.P), names: { ...names, G: mt(d.G) } },
      lines: [{ math: 'A·G^(-1)·A^T', note: t('P = A(AᵀA)⁻¹Aᵀ, avec G = AᵀA'), subgoal: 'projector' }, { math: mt(d.P), note: '', subgoal: 'projector' }],
    },
    {
      html: t('Le rang de P, par sa trace (les valeurs propres de P sont 1, 1 et 0).'), ask: 'tr P =', start: 'tr P', judge: { kind: 'mat', expect: '2', names: { P: mt(d.P) } },
      lines: [{ math: 'tr(P)', note: t('Somme des cases diagonales'), subgoal: 'projector' }, { math: '2', note: t('tr P = rang P = dim Col A') }],
    },
  ];
  return partsItem(4, rng, segs, {
    skill: RANK1, key: `${RANK1}:col:${mt(d.A)}`, fallback: d.fallback, subgoals: RANK1_SUB,
    prompt: t('A = {A} a deux colonnes libres. Calcule le projecteur orthogonal P = A(AᵀA)⁻¹Aᵀ sur le plan Col A, puis sa trace.', { A: MLm(d.A) }),
    hints: hints(t('P = A(AᵀA)⁻¹Aᵀ : commence par la matrice 2 × 2 G = AᵀA et son inverse.'), `AᵀA = ${MLm(d.G)}, (AᵀA)⁻¹ = □`, `P = ${MLm(d.P)}`),
  });
}

// Level 5 (half the time): the proof « uuᵀ is the projector on Span{u} »
// in blocks, without help.
const PROOF_P = [
  t('Soit u unitaire (uᵀu = 1), P = uuᵀ, et x ∈ ℝⁿ.'),
  t('Px = u(uᵀx) = (u · x)u : Px est dans Span{u}.'),
  t('u · (x − Px) = u · x − (u · x)(u · u) = 0, car u · u = 1 : x − Px est orthogonal à u.'),
  t('Donc x = Px + (x − Px), avec Px ∈ Span{u} et x − Px ⊥ u.'),
  t('Par unicité de la décomposition orthogonale, Px est la projection orthogonale de x sur Span{u}.'),
];
function projProof(rng) {
  const ids = PROOF_P.map((_, i) => `b${i}`);
  const blocks = PROOF_P.map((h, i) => ({ id: ids[i], html: h, needs: i ? [ids[i - 1]] : [], earlyWhy: i ? t('Pas encore : ce bloc s\'appuie sur le bloc précédent.') : undefined }));
  blocks.push({ id: 'd0', html: t('Comme P est la projection sur Span{u}, Px est dans Span{u}.'), needs: [], distractor: 'l_proof_circular', why: t('Ce bloc suppose ce qu\'on veut montrer.') });
  blocks.push({ id: 'd1', html: t('Avec u = e₁, P = diag(1, 0) projette bien sur l\'axe des x.'), needs: [], distractor: 'g9_proof_by_example', why: t('Un exemple ne prouve pas l\'énoncé pour tout u.') });
  return blocksItem({
    skill: RANK1, level: 5, mode: 'order',
    prompt: t('Montre que si u est unitaire, P = uuᵀ est la projection orthogonale sur Span{u}. Touche les blocs dans l\'ordre de la preuve.'),
    blocks: rng.shuffle(blocks), goal: ids.at(-1), order: ids, placed: [],
    hints: [], noHints: true,
    solution: PROOF_P.map((s) => ({ html: s, note: '' })),
    subgoals: [{ id: 'projector', label: t('projecteur'), skill: RANK1 }, { id: 'proj', label: t('projection'), skill: 'l-orth-proj' }, { id: 'outer', label: t('produit uuᵀ'), skill: 'l-mat-product' }],
    key: `${RANK1}:proof`, expectedSec: 140,
  });
}

function rank1Item(level, rng) {
  if (level === 5 && rng.chance(0.4)) return projProof(rng);
  if (level === 4 && rng.chance(0.5)) return colProjItem(rng);
  const house = level >= 3 && rng.chance(0.6);
  const d = projData(rng);
  const segs = projSegs(d, rng, { outerFirst: level === 1, house });

  return partsItem(level, rng, segs, {
    skill: RANK1, key: `${RANK1}:${level}:${vt(d.u)}:${vt(d.y)}:${house}`, fallback: d.fallback, subgoals: RANK1_SUB, noHints: level === 5,
    prompt: ((v) => (house
      ? t('u = {uv} et y = {y}. Calcule le projecteur orthogonal P, la symétrie de Householder H = I − 2P, puis Py et Hy.{first}{tap}', v)
      : t('u = {uv} et y = {y}. Calcule le projecteur orthogonal P, puis Py et (I − P)y.{first}{tap}', v)))({ uv: uR(d), y: ML(vt(d.y)), first: level === 1 ? ` ${t('Commence par la matrice uuᵀ.')}` : '', tap: tapText(level) }),
    hints: level === 5 ? [] : projHints(d), baits: ['g4_proj_no_square', ...(house ? ['m_householder_factor'] : [])],
  });
}

function rank1Exam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const k = rng.int(0, 3);
    if (k === 0) return tfL({ skill: RANK1, key: 'eig01', truth: true, exam: tag, statement: t('Les valeurs propres d\'un projecteur orthogonal P (P² = P, Pᵀ = P) sont 0 et 1.'), explanation: t('Vrai : si Pv = λv avec v ≠ 0, alors λv = P²v = λ²v, donc λ² = λ.') });
    if (k === 1) return tfL({ skill: RANK1, key: 'trace', truth: true, exam: tag, statement: t('Pour tout vecteur u ∈ ℝⁿ, tr(uuᵀ) = ‖u‖².'), explanation: t('Vrai : la diagonale de uuᵀ porte u₁², …, uₙ², dont la somme vaut ‖u‖².') });
    const d = projData(rng, { dim: 2 });
    return tfL({
      skill: RANK1, key: `inv:${vt(d.u)}`, truth: false, exam: tag,
      statement: t('Un projecteur orthogonal P (P² = P, Pᵀ = P) de ℝ² est toujours inversible.'),
      counter: { kind: 'mx', prop: 'projNotInvertible', params: { n: 2 }, ask: [{ v: 'A', label: 'P =', shape: [2, 2] }], answer: { A: mt(d.P) } },
      explanation: t('Faux : seul P = I est inversible. Par exemple P = {P}, la projection sur Span{{uv}}, envoie {w} sur 0.', { P: MLm(d.P), uv: R(vt(d.u)), w: ML(vt([d.u[1].neg(), d.u[0]])) }),
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
      prompt: house
        ? t('u = {uv}. H = I − 2uuᵀ/(uᵀu) est la symétrie de Householder par rapport à u⊥. Que vaut {cell} ?', { uv: uR(d), cell: `${name}${sub(i + 1)}${sub(j + 1)}` })
        : t('u = {uv}. P est le projecteur orthogonal sur Span{u}. Que vaut {cell} ?', { uv: uR(d), cell: `${name}${sub(i + 1)}${sub(j + 1)}` }),
      traps: house ? [{ rule: 'm_householder_factor' }, { rule: 'g4_proj_no_square' }] : [{ rule: 'g4_proj_no_square' }],
      solution: [{ html: `P = ${MLm(d.P)}${house ? `, H = I − 2P = ${MLm(d.H)}` : ''}`, note: '' }], subgoals: RANK1_SUB,
    });
  }
  const pick = rng.int(0, 2);
  const nrm = isqrt(d.uu.valueOf());
  if (pick === 0) {
    return mcqDistinct({
      skill: RANK1, level: 4, key: `mcqP:${vt(d.u)}`, exam: tag, fallback: d.fallback,
      prompt: t('u = {uv}. Quel est le projecteur orthogonal sur Span{u} ?', { uv: uR(d) }),
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
      prompt: t('u = {uv}. Quelle est la matrice de la symétrie orthogonale par rapport à l\'hyperplan u⊥ (Householder) ?', { uv: uR(d) }),
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
    prompt: t('u = {uv} et y = {y}. Quelle est la projection orthogonale de y sur Span{u} ?', { uv: uR(d), y: ML(vt(d.y)) }),
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
// m-spectral
// ======================================================================

const SPEC_SUB = [
  { id: 'orthodiag', label: t('orthodiagonaliser'), skill: 'l-sym-orthodiag' },
  { id: 'projectors', label: t('projecteurs'), skill: RANK1 },
  { id: 'fA', label: t('f(A) sur les valeurs propres'), skill: SPEC },
];

// Whole orthogonal bases of ℝ² (eigenvectors).
const FAM2 = [[[1, 1], [1, -1]], [[1, 2], [2, -1]], [[2, 1], [1, -2]], [[1, 3], [3, -1]], [[3, 1], [1, -3]]];
// Whole vectors of ℝ³ for A = cI + (λ − c)·vvᵀ/‖v‖².
const V3 = [[1, 2, 2], [2, 1, 2], [2, 2, 1], [1, 1, 1], [1, -1, 1], [2, -2, 1], [1, 2, -2]];
const FNAME = { sqrt: '√A', inv: 'A⁻¹', pow3: 'A³' };
const FTEXT = { sqrt: '√A', inv: 'A^(-1)', pow3: 'A^3' };
const fOf = (f, l) => (f === 'sqrt' ? q(Math.round(Math.sqrt(l.valueOf()))) : f === 'inv' ? q(1).div(l) : l.mul(l).mul(l));
const proj = (v) => { const vv = dot(v, v); return outer(v, v).map((r) => r.map((x) => x.div(vv))); };
const combo = (cs, Ps) => Ps.reduce((S, P, i) => addM(S, scaleM(P, cs[i])), Ps[0].map((r) => r.map(() => q(0))));
// λ for f: perfect squares (sqrt), non-zero (inv), small (pow3).
const lamFor = (f, rng) => q(f === 'sqrt' ? rng.pick([1, 4, 9, 16, 25, 36]) : f === 'inv' ? nz(rng, -4, 6) : nz(rng, -3, 3));

// n = 2: a whole orthogonal basis and two eigenvalues; n = 3: v, λ (simple)
// and c (double). A whole, f(A) with small denominators.
function specData(rng, { n = 2, f = rng.pick(['sqrt', 'sqrt', 'inv', 'pow3']) } = {}) {
  for (let tries = 0; tries < 400; tries++) {
    let vs;
    let lams;
    let Ps;
    if (n === 2) {
      vs = rng.pick(FAM2).map((v) => v.map((x) => q(x)));
      if (rng.chance(0.5)) vs = [vs[1], vs[0]];
      lams = [lamFor(f, rng), lamFor(f, rng)];
      Ps = vs.map(proj);
    } else {
      const v = signsPerm(rng.pick(V3), rng).map((x) => q(x));
      vs = [v];
      lams = [lamFor(f, rng), lamFor(f, rng)];
      const P = proj(v);
      Ps = [P, MX.sub(MX.identity(3), P)];
    }
    if (lams[0].eq(lams[1])) continue;
    const A = combo(lams, Ps);
    if (!isInt(A) || maxAbs(A) > 40 || MX.isDiagonal(A)) continue;
    const fl = lams.map((l) => fOf(f, l));
    const F = combo(fl, Ps);
    if (F.flat().some((x) => x.d > 12) || maxAbs(F) > 200 || MX.equal(F, A)) continue;
    if (f === 'sqrt' && A.flat().some((x) => x.n < 0) && rng.chance(0.5)) continue;
    // The decoys: f on the entries, and the projectors not normalised.
    const raw = n === 2 ? combo(fl, vs.map((v) => outer(v, v))) : null;
    return { n, f, vs, lams, Ps, A, fl, F, raw };
  }
  const vs = [[q(1), q(1)], [q(1), q(-1)]];
  const Ps = vs.map(proj);
  return { n: 2, f: 'sqrt', vs, lams: [q(9), q(1)], Ps, A: MX.mat([[5, 4], [4, 5]]), fl: [q(3), q(1)], F: MX.mat([[2, 1], [1, 2]]), raw: combo([q(3), q(1)], vs.map((v) => outer(v, v))), fallback: true };
}

// f applied to each entry (the trap), as a value text, or null.
function entrywise(d) {
  const ok = d.A.flat().every((x) => (d.f === 'sqrt' ? x.n >= 0 : d.f === 'inv' ? x.n !== 0 : true));
  if (!ok) return null;
  return `[${d.A.map((r) => `[${r.map((x) => (d.f === 'sqrt' ? (isqrt(x.valueOf()) !== null ? String(isqrt(x.valueOf())) : `√${x}`) : d.f === 'inv' ? qt(q(1).div(x)) : qt(x.mul(x).mul(x)))).join(',')}]`).join(',')}]`;
}

const lamR = (l) => R(qt(l));
const charT = (lams) => lams.map((l) => `(${qt(l)}-λ)`).join('') + (lams.length === 2 && lams[0] === lams[1] ? '' : '');
const fLam = (d, i) => (d.f === 'sqrt' ? `√${lamR(d.lams[i])} = ${lamR(d.fl[i])}` : d.f === 'inv' ? `1/${parR(d.lams[i])} = ${lamR(d.fl[i])}` : `${parR(d.lams[i])}³ = ${lamR(d.fl[i])}`);

function specSegs(d, rng, { charpoly = false, eigen = false, check = false } = {}) {
  const segs = [];
  const A = mt(d.A);
  if (charpoly) {
    segs.push({
      start: 'det(A-λI)', judge: { kind: 'det', vars: ['λ'], names: { A }, target: 'factored' },
      menu: menuOf(rng, t('Polynôme caractéristique'), [{ id: 'cases', label: t('Appliquer f à chaque case'), valid: false, rule: 'm_spectral_entrywise', why: t('f(A) se calcule sur les valeurs propres : il faut d\'abord les trouver.') }]),
      lines: [{ math: `${charT(d.lams)}`, note: t('Valeurs propres {l1} et {l2}', { l1: lamR(d.lams[0]), l2: lamR(d.lams[1]) }), subgoal: 'orthodiag' }],
    });
  }
  if (eigen) {
    d.vs.forEach((v, i) => segs.push({
      html: t('Un vecteur propre pour λ = {l}.', { l: lamR(d.lams[i]) }), ask: 'v =', start: `E_(${qt(d.lams[i])})`, judge: { kind: 'eigvec', A, lambda: qt(d.lams[i]) },
      menu: menuOf(rng, t('Résoudre (A − {l}I)v = 0', { l: lamR(d.lams[i]) }), [{ id: 'col', label: t('Prendre une colonne de A'), valid: false, why: t('Un vecteur propre vérifie (A − λI)v = 0.') }]),
      lines: [{ math: vt(v), note: '', subgoal: 'orthodiag' }],
    }));
  }
  const names = {};
  d.Ps.forEach((P, i) => {
    names[`P_${i + 1}`] = mt(P);
    const v = d.vs[i];
    const vv = v ? dot(v, v) : null;
    segs.push({
      html: i === 0 ? t('Le projecteur P₁ = u₁u₁ᵀ sur l\'espace propre de {l}.', { l: lamR(d.lams[0]) }) : (v ? t('Le projecteur P₂ = u₂u₂ᵀ sur l\'espace propre de {l}.', { l: lamR(d.lams[1]) }) : t('Le projecteur P₂ sur l\'espace propre de {l} (le plan orthogonal à v).', { l: lamR(d.lams[1]) })),
      ask: `P${sub(i + 1)} =`, start: `P_${i + 1}`, judge: { kind: 'mat', expect: mt(P), names: i ? { P_1: mt(d.Ps[0]) } : {} },
      menu: menuOf(rng, v ? 'P = vvᵀ/(vᵀv)' : 'P₂ = I − P₁', [{ id: 'nodiv', label: v ? 'P = vvᵀ' : 'P₂ = P₁', valid: false, rule: v ? 'l_orthodiag_no_normalize' : null, why: v ? t('Les uᵢ sont normés : uᵢuᵢᵀ = vvᵀ/(vᵀv).') : t('Les deux espaces propres sont orthogonaux : P₁ + P₂ = I.') }]),
      lines: v
        ? [{ math: `(${qt(q(1).div(vv))})·${mt(outer(v, v))}`, note: t('u = v/‖v‖ avec vᵀv = {vv}', { vv }), subgoal: 'projectors' }, { math: mt(P), note: '', subgoal: 'projectors', grid: P }]
        : [{ math: 'I - P_1', note: 'P₁ + P₂ = I', subgoal: 'projectors' }, { math: mt(P), note: '', subgoal: 'projectors', grid: P }],
    });
  });
  const ent = entrywise(d);
  segs.push({
    html: `${FNAME[d.f]} = Σ f(λᵢ)Pᵢ.`, ask: `${FNAME[d.f]} =`, start: FTEXT[d.f], judge: { kind: 'mat', expect: mt(d.F), names, spectral: { A, f: d.f } },
    decision: {
      kind: 'decision', prompt: t('Comment calculer {f} ?', { f: FNAME[d.f] }), options: rng.shuffle([
        { id: 'eig', label: t('Appliquer f aux valeurs propres : Σ f(λᵢ)Pᵢ'), valid: true },
        { id: 'cases', label: t('Appliquer f à chaque case de A'), valid: false, rule: 'm_spectral_entrywise', why: ent && d.f === 'sqrt' ? t('f(A) n\'est pas f appliquée case par case : {M}² ≠ A.', { M: R(ent) }) : t('f(A) n\'est pas f appliquée case par case.') },
      ]),
    },
    menu: menuOf(rng, t('Combiner : {f1}·P₁ + {f2}·P₂', { f1: fLam(d, 0).split(' = ')[0], f2: fLam(d, 1).split(' = ')[0] }), [
      { id: 'cases', label: t('Appliquer f à chaque case de A'), valid: false, rule: 'm_spectral_entrywise', why: t('f(A) se calcule sur les valeurs propres.') },
      { id: 'same', label: t('Garder {l1}·P₁ + {l2}·P₂', { l1: lamR(d.lams[0]), l2: lamR(d.lams[1]) }), valid: false, why: t('Ça redonne A : il faut remplacer chaque λᵢ par f(λᵢ).') },
    ]),
    lines: [
      { math: `${par(d.fl[0])}·P_1 + ${par(d.fl[1])}·P_2`, note: `f(λ₁) = ${fLam(d, 0)}, f(λ₂) = ${fLam(d, 1)}`, subgoal: 'fA' },
      { math: mt(d.F), note: '', subgoal: 'fA', grid: d.F },
    ],
  });
  if (check && d.f === 'sqrt') {
    segs.push({
      html: t('Contrôle : avec R = √A, R² = A.'), ask: 'R² =', start: '(√A)^2', judge: { kind: 'mat', expect: A, names: { R: mt(d.F) } },
      menu: menuOf(rng, t('Élever au carré'), [{ id: 'cases', label: t('Élever chaque case au carré'), valid: false, rule: 'm_spectral_entrywise', why: t('B² est le produit B·B, pas le carré de chaque case.') }]),
      lines: [{ math: 'R·R', note: t('Le produit R·R'), subgoal: 'fA' }, { math: A, note: t('On retrouve A') }],
    });
  }
  return segs;
}

const specHints = (d) => hints(
  t('Remplace chaque λᵢ par f(λᵢ) et garde les projecteurs : f(A) = f(λ₁)P₁ + f(λ₂)P₂.'),
  `${FNAME[d.f]} = ${parR(d.fl[0])}·P₁ + ${parR(d.fl[1])}·P₂ = □`,
  `${FNAME[d.f]} = ${MLm(d.F)}`,
);

const eigText = (d) => (d.n === 2
  ? t('λ₁ = {l1}, de vecteur propre v₁ = {v1}, et λ₂ = {l2}, de vecteur propre v₂ = {v2}', { l1: lamR(d.lams[0]), v1: ML(vt(d.vs[0])), l2: lamR(d.lams[1]), v2: ML(vt(d.vs[1])) })
  : t('λ₁ = {l1} (simple, vecteur propre v = {v}) et λ₂ = {l2} (double : le plan v⊥)', { l1: lamR(d.lams[0]), v: ML(vt(d.vs[0])), l2: lamR(d.lams[1]) }));

function specItem(level, rng) {
  if (level === 5) return specAlone(rng);
  const d = level === 4 && rng.chance(0.5) ? specData(rng, { n: 3, f: rng.pick(['inv', 'sqrt']) }) : specData(rng);
  const full = level >= 3 && d.n === 2;
  const segs = specSegs(d, rng, { charpoly: full, eigen: full || (level === 4 && d.n === 3), check: level >= 3 });
  const given = full ? '' : ` ${t('Ses valeurs propres : {eig}.', { eig: eigText(d) })}`;
  return partsItem(level, rng, segs, {
    skill: SPEC, key: `${SPEC}:${level}:${mt(d.A)}:${d.f}`, fallback: d.fallback, subgoals: SPEC_SUB,
    prompt: t('A = {A} est symétrique.{given} Écris A = Σ λᵢPᵢ (Pᵢ projecteurs orthogonaux sur les espaces propres), puis calcule {f} par la décomposition spectrale.{tap}', { A: MLm(d.A), given, f: FNAME[d.f], tap: tapText(level) }),
    hints: specHints(d), baits: ['m_spectral_entrywise', ...(d.n === 2 ? ['l_orthodiag_no_normalize'] : [])],
  });
}

// Level 5 (2018 Q11): A = λ₁u₁u₁ᵀ + λ₂u₂u₂ᵀ given by its orthonormal
// vectors; its characteristic polynomial, then f(A), without help.
function specAlone(rng) {
  const d = specData(rng, { n: 2, f: rng.pick(['sqrt', 'inv']) });
  const uT = (v) => unitText(v).replace(/-/g, '−');
  const segs = specSegs(d, rng, { charpoly: true }).filter((s) => !/^P_/.test(s.start));
  segs[segs.length - 1].judge.names = {};
  segs[segs.length - 1].lines[0] = { math: `${par(d.fl[0])}·${mt(d.Ps[0])} + ${par(d.fl[1])}·${mt(d.Ps[1])}`, note: t('u₁u₁ᵀ et u₂u₂ᵀ, pondérés par f(λᵢ)'), subgoal: 'fA' };
  return partsItem(5, rng, segs, {
    skill: SPEC, key: `${SPEC}:5:${mt(d.A)}:${d.f}`, fallback: d.fallback, subgoals: SPEC_SUB, noHints: true,
    prompt: t('Soit A = {l1}·u₁u₁ᵀ {sign} {l2}·u₂u₂ᵀ, avec u₁ = {u1} et u₂ = {u2} (base orthonormée). Donne le polynôme caractéristique de A (factorisé), puis {f}.', { l1: lamR(d.lams[0]), sign: d.lams[1].n < 0 ? '−' : '+', l2: lamR(d.lams[1].n < 0 ? d.lams[1].neg() : d.lams[1]), u1: uT(d.vs[0]), u2: uT(d.vs[1]), f: FNAME[d.f] }),
    hints: [], baits: ['m_spectral_entrywise'],
  });
}

function specExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const k = rng.int(0, 3);
    if (k === 0) return tfL({ skill: SPEC, key: 'proj0', truth: true, exam: tag, statement: t('Si A = Σ λᵢuᵢuᵢᵀ avec (uᵢ) orthonormée, alors (uᵢuᵢᵀ)(uⱼuⱼᵀ) = 0 pour i ≠ j.'), explanation: t('Vrai : (uᵢuᵢᵀ)(uⱼuⱼᵀ) = uᵢ(uᵢᵀuⱼ)uⱼᵀ, et uᵢᵀuⱼ = 0.') });
    if (k === 1) return tfL({ skill: SPEC, key: 'samevec', truth: true, exam: tag, statement: t('Si A est symétrique et inversible, A⁻¹ a les mêmes vecteurs propres que A, de valeurs propres 1/λᵢ.'), explanation: t('Vrai : A⁻¹ = Σ (1/λᵢ)uᵢuᵢᵀ.') });
    const neg = rng.int(-4, -1);
    const pos = rng.int(1, 5);
    const Mx = rng.chance(0.5) ? MX.mat([[neg, 0], [0, pos]]) : combo([q(neg), q(pos * 2)], FAM2[0].map((v) => proj(v.map((x) => q(x)))));
    return tfL({
      skill: SPEC, key: `sqrt:${mt(Mx)}`, truth: false, exam: tag,
      statement: t('Toute matrice symétrique réelle a une racine carrée réelle symétrique (une B symétrique avec B² = A).'),
      counter: { kind: 'mx', prop: 'symNegEig', params: { n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(Mx) } },
      explanation: t('Faux : B² = BᵀB a des valeurs propres ≥ 0. {M} a la valeur propre {neg} < 0 : elle n\'a pas de racine carrée symétrique réelle.', { M: MLm(Mx), neg }),
    });
  }
  const d = specData(rng, { f: rng.pick(['sqrt', 'inv']) });
  const ent = entrywise(d);
  const swap = combo([d.fl[1], d.fl[0]], d.Ps);
  return mcqDistinct({
    skill: SPEC, level: 4, key: `mcq:${mt(d.A)}:${d.f}`, exam: tag, fallback: d.fallback,
    prompt: ((v) => (d.f === 'sqrt'
      ? t('A = {A} a les valeurs propres {l1} (vecteur propre {v1}) et {l2} (vecteur propre {v2}). Que vaut la racine carrée symétrique positive √A ?', v)
      : t('A = {A} a les valeurs propres {l1} (vecteur propre {v1}) et {l2} (vecteur propre {v2}). Que vaut A⁻¹ ?', v)))({ A: MLm(d.A), l1: lamR(d.lams[0]), v1: ML(vt(d.vs[0])), l2: lamR(d.lams[1]), v2: ML(vt(d.vs[1])) }),
    right: MLm(d.F),
    wrongs: [
      ent ? { html: ML(ent), rule: 'm_spectral_entrywise' } : null,
      { html: MLm(d.raw), rule: 'l_orthodiag_no_normalize' },
      { html: MLm(swap), rule: null },
    ].filter(Boolean),
    fillers: [{ html: MLm(scaleM(d.F, 2)) }, { html: MLm(MX.transpose(d.raw)) }, { html: MLm(addM(d.F, MX.identity(2))) }],
    solution: [{ html: `${FNAME[d.f]} = ${lamR(d.fl[0])}·P₁ + ${lamR(d.fl[1])}·P₂ = ${MLm(d.F)}`, note: `P₁ = ${MLm(d.Ps[0])}, P₂ = ${MLm(d.Ps[1])}` }],
  }, rng);
}

// ======================================================================
// m-posdef
// ======================================================================

const POSDEF_SUB = [
  { id: 'minors', label: t('mineurs dominants'), skill: 'l-det-cofactor' },
  { id: 'nature', label: t('nature'), skill: POSDEF },
  { id: 'squares', label: t('somme de carrés'), skill: 'l-sym-quadform' },
];

const NATURES = [
  ['pos', t('définie positive')], ['semipos', t('semi-définie positive')], ['neg', t('définie négative')],
  ['semineg', t('semi-définie négative')], ['indef', t('indéfinie')],
];
const NAT = Object.fromEntries(NATURES);

// A = LDLᵀ: L unit lower (whole), D the pivots (signs by nature), so the
// leading minors are Δₖ = d₁…dₖ ≠ 0. tri: L bidiagonal (A tridiagonal).
function posdefData(rng, { n = rng.chance(0.4) ? 2 : 3, nature = rng.pick(['pos', 'pos', 'neg', 'indef', 'indef']), tri = rng.chance(0.4) } = {}) {
  for (let tries = 0; tries < 400; tries++) {
    const L = MX.identity(n);
    for (let i = 1; i < n; i++) for (let j = 0; j < i; j++) L[i][j] = q(tri && i - j > 1 ? 0 : rng.int(-2, 2));
    let ds;
    if (nature === 'pos') ds = Array.from({ length: n }, () => rng.int(1, 4));
    else if (nature === 'neg') ds = Array.from({ length: n }, () => -rng.int(1, 4));
    else {
      ds = Array.from({ length: n }, () => nz(rng, -3, 4));
      if (ds.every((x) => x > 0) || ds.every((x) => x < 0)) continue;
    }
    const A = MX.mul(MX.mul(L, MX.diag(ds.map((x) => q(x)))), MX.transpose(L));
    if (MX.isDiagonal(A) || maxAbs(A) > 12) continue;
    if (tri && n === 3 && A[0][2].n !== 0) continue;
    const minors = ds.map((_, k) => ds.slice(0, k + 1).reduce((p, x) => p * x, 1));
    // The leurre « diagonale positive » for half of the indefinite ones.
    const diagPos = A.every((r, i) => r[i].n > 0);
    if (nature === 'indef' && !diagPos && rng.chance(0.5)) continue;
    return { n, nature, A, ds, minors, diagPos, tri: n === 3 && tri, L };
  }
  const A = MX.mat([[2, -1, 0], [-1, 2, -1], [0, -1, 2]]);
  return { n: 3, nature: 'pos', A, ds: [2, 3 / 2, 4 / 3].map((x) => x), minors: [2, 3, 4], diagPos: true, tri: true, fallback: true };
}

const pivotsOf = (d) => d.minors.map((m, k) => (k ? q(m).div(q(d.minors[k - 1])) : q(m)));
const prM = (x) => (q(x).n < 0 ? `(${qt(x)})` : qt(x));
const d2Text = (A) => `${prM(A[0][0])}×${prM(A[1][1])}-${prM(A[0][1])}×${prM(A[1][0])}`;
function d3Dev(A) {
  const minor = (j) => A.slice(1).map((r) => r.filter((_, k) => k !== j));
  const terms = [];
  [0, 1, 2].forEach((j) => {
    const c = A[0][j].mul(j % 2 ? -1 : 1);
    if (c.n === 0) return;
    const sgn = c.n < 0 ? '-' : terms.length ? '+' : '';
    const a = c.n < 0 ? c.neg() : c;
    terms.push(`${sgn}${a.eq(1) ? '' : `${qt(a)}·`}det${mt(minor(j))}`);
  });
  return terms.join('') || '0';
}
const minorsR = (d) => d.minors.map((m, k) => `Δ${sub(k + 1)} = ${R(m)}`).join(', ');

// The decision « nature ? », with the traps on the wrong options.
function natureDecision(d, rng) {
  const allNeg = d.minors.every((m) => m < 0);
  const opts = NATURES.map(([id, label]) => {
    const o = { id, label, valid: id === d.nature };
    if (o.valid) return o;
    if (id === 'pos' && d.nature === 'indef' && d.diagPos) Object.assign(o, { rule: 'l_posdef_diag', why: t('La diagonale est positive, mais ce n\'est pas un critère : un mineur est négatif.') });
    else if (id === 'indef' && d.nature === 'neg') Object.assign(o, { rule: 'm_sylvester_negdef', why: t('Définie négative : les mineurs alternent, Δ₁ < 0, Δ₂ > 0, Δ₃ < 0. Ils ne sont pas tous négatifs.') });
    else if (id === 'neg' && d.nature === 'indef' && allNeg) Object.assign(o, { rule: 'm_sylvester_negdef', why: t('Pour « définie négative », il faut des signes alternés (−, +, −), pas tous négatifs.') });
    else if (id === 'semipos' && d.nature === 'pos') o.why = t('Elle est même définie positive : tous les mineurs sont > 0.');
    else if (id === 'semineg' && d.nature === 'neg') o.why = t('Elle est même définie négative : les mineurs alternent strictement.');
    else o.why = t('Relis les signes : {minors}.', { minors: minorsR(d) });
    return o;
  });
  return { kind: 'decision', prompt: t('{minors}. Quelle est la nature de A ?', { minors: minorsR(d) }), options: rng.shuffle(opts) };
}

function posdefSegs(d, rng) {
  const A = mt(d.A);
  const segs = [];
  const sub2 = [[d.A[0][0], d.A[0][1]], [d.A[1][0], d.A[1][1]]];
  segs.push({
    html: t('Δ₁ = {m}. Le mineur Δ₂ :', { m: R(d.minors[0]) }), ask: 'Δ₂ =', start: `det${mt(sub2)}`, judge: { kind: 'det', target: 'number' },
    decision: {
      kind: 'decision', prompt: t('Quel critère est le plus court ici ?'), options: rng.shuffle([
        { id: 'minors', label: d.n === 2 ? t('Le signe de a₁₁ et de det A') : d.tri ? t('Les mineurs dominants (ou les pivots : A est tridiagonale)') : t('Les mineurs dominants Δ₁, Δ₂, Δ₃'), valid: true },
        { id: 'eig', label: t('Les valeurs propres'), valid: true, quality: 'poor', why: t('Juste, mais il faut résoudre un polynôme de degré {n} : les mineurs sont plus rapides.', { n: d.n }) },
        { id: 'diag', label: t('Le signe des cases diagonales'), valid: false, rule: 'l_posdef_diag', why: t('Une diagonale positive ne suffit pas : [[1, 2], [2, 1]] a la valeur propre −1.') },
      ]),
    },
    menu: menuOf(rng, t('Mineur 2 × 2 en haut à gauche'), [{ id: 'diag', label: t('Regarder seulement la diagonale'), valid: false, rule: 'l_posdef_diag', why: t('La diagonale ne suffit pas : il faut les mineurs.') }]),
    lines: [{ math: d2Text(d.A), note: 'a₁₁a₂₂ − a₁₂a₂₁', subgoal: 'minors' }, { math: qt(d.minors[1]), note: '', subgoal: 'minors', blank: true }],
  });
  if (d.n === 3) {
    segs.push({
      html: t('Le mineur Δ₃ = det A :'), ask: 'Δ₃ =', start: `det${A}`, judge: { kind: 'det', target: 'number' },
      menu: menuOf(rng, t('Développer selon la 1re ligne'), [{ id: 'trace', label: t('Prendre la trace'), valid: false, why: t('Δ₃ est un déterminant, pas une trace.') }]),
      lines: [{ math: d3Dev(d.A), note: t('Développement selon la première ligne'), subgoal: 'minors' }, { math: qt(d.minors[2]), note: '', subgoal: 'minors', blank: true }],
    });
  }
  const piv = pivotsOf(d);
  segs.push({
    html: t('Contrôle par un second critère : les pivots de Gauss sans échange, dₖ = Δₖ/Δₖ₋₁.'), ask: '(d₁ ; …) =', start: 'pivots', judge: { kind: 'mat', expect: vt(piv) },
    pre: [natureDecision(d, rng)],
    menu: menuOf(rng, 'Pivots dₖ = Δₖ/Δₖ₋₁', [{ id: 'minors', label: t('Pivots = mineurs'), valid: false, why: t('Le pivot dₖ est le quotient Δₖ/Δₖ₋₁ (Δₖ = d₁…dₖ).') }]),
    lines: [{ math: vt(piv), note: t('Mêmes signes que les valeurs propres : {nat}', { nat: NAT[d.nature] }), subgoal: 'nature', grid: piv.map((x) => [x]) }],
  });
  return segs;
}

const posdefHints = (d) => hints(
  t('Calcule les déterminants des coins en haut à gauche, de taille {sizes}. Tous > 0 : définie positive ; signes −, +, − : définie négative ; un mauvais signe (et aucun nul) : indéfinie.', { sizes: d.n === 3 ? '1, 2, 3' : '1, 2' }),
  `Δ₂ = ${parR(d.A[0][0])}·${parR(d.A[1][1])} − □`,
  `${minorsR(d)} : ${NAT[d.nature]}`,
);

function posdefItem(level, rng) {
  if (level === 5) return posdefParam(rng, 3);
  if (level === 4 && rng.chance(0.5)) return posdefParam(rng, 2);
  const d = posdefData(rng, level === 1 ? { nature: rng.pick(['pos', 'neg', 'indef']) } : {});
  return partsItem(level, rng, posdefSegs(d, rng), {
    skill: POSDEF, key: `${POSDEF}:${level}:${mt(d.A)}`, fallback: d.fallback, subgoals: POSDEF_SUB,
    prompt: t('A = {A} est symétrique. Est-elle définie positive, définie négative, ou indéfinie ? Utilise les mineurs principaux dominants (critère de Sylvester), puis contrôle avec les pivots.{rule}{tap}', { A: MLm(d.A), rule: level <= 2 ? `<br>${t('Règle : tous les Δₖ &gt; 0 ⇔ définie positive ; Δ₁ &lt; 0, Δ₂ &gt; 0, Δ₃ &lt; 0 ⇔ définie négative.')}` : '', tap: tapText(level) }),
    hints: posdefHints(d), baits: ['l_posdef_diag'],
  });
}

// A parameter a: 2 × 2 [[p, a], [a, r]] with pr = c², or 3 × 3 tridiagonal
// [[p, a, 0], [a, r, b], [0, b, s]] with Δ₃ = κ(c² − a²). Definite positive
// ⇔ |a| < c.
function paramData(rng, n) {
  const c = rng.pick(n === 2 ? [2, 3, 4, 6] : [1, 2, 3]);
  if (n === 2) {
    const ps = [];
    for (let p = 1; p <= c * c; p++) if ((c * c) % p === 0 && c * c / p <= 12 && p <= 12) ps.push(p);
    const p = rng.pick(ps);
    const r = (c * c) / p;
    return { n, c, M: [[String(p), 'a'], [String(r), 'a']], text: `[[${p},a],[a,${r}]]`, d2: `${p * r}-a^2`, d3: null, cond: `${p * r}-a^2>0`, p, r };
  }
  const opt = rng.pick([{ p: 1, s: 1 }, { p: 2, s: 2 }]);
  const b = opt.p === 1 ? rng.pick([1, 2]) : 1;
  // p = s = 1: r = c² + b², Δ₃ = c² − a². p = s = 2, b = 1: 2r − 1 = c², Δ₃ = 2(c² − a²).
  let r;
  let cc = c;
  if (opt.p === 1) r = c * c + b * b;
  else { cc = rng.pick([1, 3]); r = (cc * cc + 1) / 2; }
  const k = opt.p === 1 ? 1 : 2;
  const d3 = `${k * cc * cc}-${k === 1 ? '' : k}a^2`;
  return { n, c: cc, text: `[[${opt.p},a,0],[a,${r},${b}],[0,${b},${opt.s}]]`, d2: `${opt.p * r}-a^2`, d3, cond: `${d3}>0`, p: opt.p, r, b, s: opt.s, k };
}

function posdefParam(rng, n) {
  const d = paramData(rng, n);
  const level = n === 3 ? 5 : 4;
  const c = d.c;
  const sol = `]-${c} ; ${c}[`;
  const segs = [{
    start: `det[[${d.p},a],[a,${d.r}]]`, judge: { kind: 'det', vars: ['a'], target: 'expanded' },
    lines: [{ math: d.d2, note: `Δ₂ = ${d.p}·${d.r} − a²`, subgoal: 'minors' }],
  }];
  if (n === 3) {
    segs.push({
      html: t('Le mineur Δ₃ = det A :'), ask: 'Δ₃ =', start: `det${d.text}`, judge: { kind: 'det', vars: ['a'], target: 'expanded' },
      lines: [{ math: d.d3, note: t('Développer, puis réduire'), subgoal: 'minors' }],
    });
  }
  segs.push({
    html: n === 3
      ? t('Δ₁ = {p} > 0. A est définie positive si et seulement si Δ₂ > 0 et Δ₃ > 0 (ici Δ₃ > 0 entraîne Δ₂ > 0) : résous en a.', { p: d.p })
      : t('Δ₁ = {p} > 0. A est définie positive si et seulement si Δ₂ > 0 : résous en a.', { p: d.p }),
    ask: 'a ∈', start: d.cond, judge: { kind: 'solset', v: 'a' },
    lines: [
      { math: `a^2<${c * c}`, note: t('Isoler a²'), subgoal: 'nature' },
      { math: `-${c}<a<${c}`, note: t('Racine carrée : |a| < {c}', { c }), subgoal: 'nature' },
      { math: sol, note: '', subgoal: 'nature' },
    ],
  });
  const item = partsItem(level, rng, segs, {
    skill: POSDEF, key: `${POSDEF}:param:${d.text}`, subgoals: POSDEF_SUB, noHints: level === 5,
    prompt: t('A = {A}, avec un paramètre réel a. Pour quelles valeurs de a la matrice A est-elle définie positive ? Calcule les mineurs dominants, puis résous.', { A: ML(d.text, { vars: ['a'] }) }),
    hints: level === 5 ? [] : hints(t('Tous les mineurs dominants doivent être > 0 : Δ₁, puis Δ₂ (et Δ₃), qui dépendent de a.'), `Δ₂ = ${d.p}·${d.r} − □ > 0`, `a ∈ ]−${c} ; ${c}[`),
    baits: ['m_sylvester_semidef'],
  });
  item.declares = { vars: ['a'] };
  return item;
}

// A semi-definite leurre: [[B, 0], [0, −k]] with B = vvᵀ (rank 1): the
// leading minors are ≥ 0 (Δ₂ = Δ₃ = 0), but A is indefinite.
function semiLeurre(rng) {
  const v = [nz(rng, -2, 2), nz(rng, -2, 2)];
  const k = rng.int(1, 3);
  const A = MX.mat([[v[0] * v[0], v[0] * v[1], 0], [v[0] * v[1], v[1] * v[1], 0], [0, 0, -k]]);
  return { n: 3, nature: 'indef', A, minors: [v[0] * v[0], 0, 0], diagPos: false, semi: true };
}

function posdefExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const k = rng.int(0, 3);
    if (k === 0) return tfL({ skill: POSDEF, key: 'inv', truth: true, exam: tag, statement: t('Une matrice symétrique définie positive est inversible.'), explanation: t('Vrai : ses valeurs propres sont > 0, donc det A = Π λᵢ > 0.') });
    if (k === 1) return tfL({ skill: POSDEF, key: 'ata', truth: true, exam: tag, statement: t('Pour toute matrice A (m × n), AᵀA est semi-définie positive.'), explanation: t('Vrai : xᵀAᵀAx = ‖Ax‖² ≥ 0.') });
    const kk = rng.int(1, 4);
    const answer = mt(MX.mat([[0, 0], [0, -kk]]));
    return tfL({
      skill: POSDEF, key: `semi:${kk}`, truth: false, exam: tag, ruleIfTrue: 'm_sylvester_semidef',
      statement: t('Si A est symétrique et que tous ses mineurs principaux dominants sont ≥ 0, alors A est semi-définie positive.'),
      counter: { kind: 'mx', prop: 'minorsNotSemidef', params: { n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: answer } },
      explanation: t('Faux : {M} a Δ₁ = Δ₂ = 0, mais Q(0, 1) = −{k} < 0. Pour « semi-définie », il faut tous les mineurs principaux, pas seulement les dominants.', { M: ML(answer), k: kk }),
    });
  }
  if (rng.chance(0.3)) {
    const d = paramData(rng, 2);
    const c = d.c;
    return mcqDistinct({
      skill: POSDEF, level: 4, key: `mcqParam:${d.text}`, exam: tag,
      prompt: t('A = {A}. A est définie positive si et seulement si :', { A: ML(d.text, { vars: ['a'] }) }),
      right: `a ∈ ]−${c} ; ${c}[`,
      wrongs: [
        { html: `a ∈ [−${c} ; ${c}]`, rule: 'm_sylvester_semidef' },
        { html: `a ∈ ]−${c * c} ; ${c * c}[`, rule: null },
        { html: `a ∈ ]0 ; ${c}[`, rule: null },
      ],
      fillers: [{ html: t('pour tout a ∈ ℝ') }],
      solution: [{ html: `Δ₁ = ${d.p} > 0, Δ₂ = ${R(d.d2.replace('^2', '²'))} > 0 ⇔ |a| < ${c}`, note: '' }],
    }, rng);
  }
  const d = rng.chance(0.25) ? semiLeurre(rng) : posdefData(rng);
  const dec = natureDecision(d, rng);
  if (d.semi) dec.options.find((o) => o.id === 'semipos').rule = 'm_sylvester_semidef';
  const right = dec.options.find((o) => o.valid);
  const wrongs = dec.options.filter((o) => !o.valid).sort((a, b) => (b.rule ? 1 : 0) - (a.rule ? 1 : 0));
  return mcqDistinct({
    skill: POSDEF, level: 4, key: `mcq:${mt(d.A)}`, exam: tag, fallback: d.fallback,
    prompt: t('Quelle est la nature de la matrice symétrique A = {A} ?', { A: MLm(d.A) }),
    right: right.label,
    wrongs: wrongs.map((o) => ({ html: o.label, rule: o.rule ?? null })),
    solution: [{ html: d.semi ? t('Δ₁ = {m}, Δ₂ = Δ₃ = 0 ; mais e₃ᵀAe₃ = {a33} < 0 et e₁ᵀAe₁ > 0 : indéfinie.', { m: d.minors[0], a33: R(qt(d.A[2][2])) }) : `${minorsR(d)} : ${NAT[d.nature]}`, note: '' }],
  }, rng);
}

// ======================================================================

export const GEN = {
  [POSDEF]: (level, rng, profile, opts = {}) => (opts.exam ? posdefExam(rng, opts.exam) : posdefItem(level, rng)),
  [SPEC]: (level, rng, profile, opts = {}) => (opts.exam ? specExam(rng, opts.exam) : specItem(level, rng)),
  [RANK1]: (level, rng, profile, opts = {}) => (opts.exam ? rank1Exam(rng, opts.exam) : rank1Item(level, rng)),
  [SCHUR]: (level, rng, profile, opts = {}) => (opts.exam ? schurExam(rng, opts.exam) : schurItem(level, rng)),
};


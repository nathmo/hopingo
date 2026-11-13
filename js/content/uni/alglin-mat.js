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
import { parseExpr, evalAst, valueText } from '../../cas/matexpr.js';
import {
  q, mt, vt, ML, MLm, fq, qt, sub, unimodular, luPair, opLines, pickCells, withCells,
  matLines, coefItem, mcqDistinct, tfL, examTag, rowHoles, opR,
} from './alglin-kit.js';
import { t, tn } from '../../i18n.js';

const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
const maxAbs = (A) => Math.max(...A.flat().map((x) => Math.abs(q(x).valueOf())));
const randM = (m, n, rng, lo, hi) => Array.from({ length: m }, () => Array.from({ length: n }, () => q(rng.int(lo, hi))));
const hasZeroRow = (A) => A.some((r) => r.every((x) => x.n === 0));
const hasZeroCol = (A) => hasZeroRow(MX.transpose(A));
const sameLines = (A) => A.some((r, i) => A.some((s, k) => k > i && r.every((x, j) => x.eq(s[j]))));
// A factor in a sum of products: 3, (−1).
const par = (x) => (q(x).n < 0 ? `(${qt(x)})` : qt(x));
const parR = (x) => (q(x).n < 0 ? `(${fq(x)})` : fq(x));
const sizeR = (A) => `${A.length} × ${A[0].length}`;
const ij = (i, j) => `${sub(i + 1)}${sub(j + 1)}`;
// Exact values of expressions with roots (geometry): their text and MathML.
const EV = (text) => evalAst(parseExpr(text), {}, {});
const VT = (text) => valueText(EV(text));
const negT = (s) => (s === '0' ? '0' : s.startsWith('-') ? s.slice(1) : `-${s}`);
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const GRID2 = [[0, 0], [0, 0]];

// Lines of several parts, assembled for a level: segs = [{html, ask?,
// start, judge, decision?, lines: [{math, note, subgoal, grid?}]}]. Guided
// levels blank `blanks` cells of each line with a grid; level 3 gives each
// part its menu (tapActions 'menu').
function partsItem(level, rng, segs, o) {
  const script = [];
  const judgeOf = (s) => (level === 3 && s.menu ? { ...s.judge, menu: s.menu } : s.judge);
  segs.forEach((s, k) => {
    if (k > 0) script.push({ kind: 'segment', html: s.html, ask: s.ask, start: { math: s.start }, judge: judgeOf(s) });
    if (s.decision && level === 2) script.push(s.decision);
    for (const l of s.lines) {
      const line = { kind: 'eq', math: l.math, note: l.note || '', subgoal: l.subgoal };
      if (level <= 2 && l.grid) {
        const rows = [...Array(l.grid.length).keys()];
        const k2 = Math.min(l.grid.length * l.grid[0].length, level === 1 ? (o.blanks ?? 2) : (o.blanks2 ?? 3));
        script.push(withCells(line, pickCells(l.grid, rows, k2, rng)));
      } else script.push(line);
    }
  });
  return matLines({
    skill: o.skill, level, prompt: o.prompt, start: segs[0].start, judge: judgeOf(segs[0]),
    mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'menu' : null,
    script, hints: o.hints, subgoals: o.subgoals, key: o.key, fallback: o.fallback,
  });
}

// ======================================================================
// l-mat-product
// ======================================================================

const PROD = 'l-mat-product';
const PROD_SUB = [
  { id: 'size', label: t('tailles'), skill: PROD },
  { id: 'rowcol', label: t('ligne fois colonne'), skill: PROD },
];

// A (m × p) and B (p × n), entries in [lo ; hi], AB with entries ≤ 20.
// square: m = p = n (AB ≠ BA); same: n = m (BA exists too).
function prodData(rng, { square = false, same = rng.chance(0.6), sizes } = {}) {
  for (let tries = 0; tries < 200; tries++) {
    let [m, p, n] = sizes ?? [rng.pick([2, 3]), rng.pick([2, 3]), 0];
    if (!sizes) n = same ? m : rng.pick([2, 3, 4].filter((x) => x !== m));
    if (square) { m = rng.pick([2, 3]); p = m; n = m; }
    const lim = p === 3 ? 3 : 4;
    const A = randM(m, p, rng, -lim, lim);
    const B = randM(p, n, rng, -lim, lim);
    if (hasZeroRow(A) || hasZeroCol(B) || sameLines(A) || sameLines(MX.transpose(B))) continue;
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
const prodPrompt = (d) => t('Soit A = {A} et B = {B}.', { A: MLm(d.A), B: MLm(d.B) });

function prodHints(d, [i, j]) {
  return [
    { level: 1, html: t('Case (i, j) de AB : la ligne i de A fois la colonne j de B, terme à terme, puis la somme.') },
    { level: 2, html: `(AB)${ij(i, j)} = ${holesR(d.A, d.B, i, j)}` },
    { level: 3, html: `(AB)${ij(i, j)} = ${expansionR(d.A, d.B, i, j)} = ${fq(d.AB[i][j])}` },
  ];
}

// The segment « c_ij = ? »: the expansion, then the value.
function cellSegment(d, [i, j], extra = {}) {
  const v = d.AB[i][j];
  return [
    { kind: 'segment', html: t('Calcule le coefficient {c} de C = AB.', { c: `c${ij(i, j)}` }), ask: `c${ij(i, j)} =`, start: { math: `c_${i + 1}${j + 1}` },
      judge: { kind: 'mat', expect: qt(v), about: prodAbout(d, { coef: { i, j, of: mt(d.AB), name: 'c' } }), ...extra } },
    { kind: 'eq', math: `(AB)_${i + 1}${j + 1} = ${expansion(d.A, d.B, i, j)}`, note: t('Ligne {i} de A, colonne {j} de B : {e}', { i: i + 1, j: j + 1, e: expansionR(d.A, d.B, i, j) }), subgoal: 'rowcol' },
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
        d.n !== d.m ? { id: 'rev', label: `${d.n} × ${d.m}`, valid: false, why: t('Les lignes de AB viennent de A ({m} lignes), ses colonnes de B ({n} colonnes) : AB est {s}.', { m: d.m, n: d.n, s: right }) } : null,
        d.p !== d.m || d.p !== d.n ? { id: 'inner', label: `${d.p} × ${d.p}`, valid: false, why: t('Le nombre {p} (colonnes de A = lignes de B) disparaît dans le produit : AB est {s}.', { p: d.p, s: right }) } : null,
        { id: 'none', label: t('Impossible'), valid: false, why: t('A a {p} colonnes et B a {p} lignes : le produit existe.', { p: d.p }) },
      ].filter(Boolean);
      script.push({ kind: 'decision', prompt: t('Quelle est la taille de AB ?'), options: rng.shuffle(opts) });
    }
    script.push(withCells({ kind: 'eq', math: mt(d.AB), note: t('Case (i, j) : ligne i de A · colonne j de B'), subgoal: 'rowcol' }, cells));
    return matLines({
      skill: PROD, level, prompt: level === 1 ? t('{p} AB est {s}. Complète le produit AB.', { p: prodPrompt(d), s: sizeR(d.AB) }) : t('{p} Complète le produit AB.', { p: prodPrompt(d) }),
      start: 'AB', judge, mode: 'guided', script, hints: prodHints(d, cell), subgoals: PROD_SUB, key: key(d, 'g'), fallback: d.fallback,
    });
  }
  if (level === 3) {
    const d = prodData(rng);
    const cell = pickCell(d, rng);
    const [i, j] = cell;
    const menu1 = rng.shuffle([
      { id: 'ok', label: t('Ligne {i} de A et colonne {j} de B', { i: i + 1, j: j + 1 }), valid: true },
      i !== j ? { id: 'swap', label: t('Ligne {i} de A et colonne {j} de B', { i: j + 1, j: i + 1 }), valid: false, rule: 'l_coef_index_swap', why: t('Le premier indice donne la ligne de A, le second la colonne de B : {c} vient de la ligne {i} et de la colonne {j}.', { c: `c${ij(i, j)}`, i: i + 1, j: j + 1 }) } : null,
      { id: 'cols', label: t('Colonne {i} de A et ligne {j} de B', { i: i + 1, j: j + 1 }), valid: false, why: t('Dans AB, on prend une ligne de A et une colonne de B.') },
      { id: 'cell', label: t('La case ({i}, {j}) de A fois la case ({i}, {j}) de B', { i: i + 1, j: j + 1 }), valid: false, rule: 'l_product_entrywise', why: t('Une case de AB est une somme de produits « ligne fois colonne », pas le produit de deux cases.') },
    ].filter(Boolean));
    const menu2 = rng.shuffle([
      { id: 'ok', label: t('Chaque case : une ligne de A fois une colonne de B'), valid: true },
      { id: 'cell', label: t('Multiplier les cases au même endroit'), valid: false, rule: 'l_product_entrywise', why: t('Le produit matriciel n\'est pas le produit case par case.') },
      { id: 'ba', label: t('Chaque case : une ligne de B fois une colonne de A'), valid: false, rule: 'l_ab_commute', why: t('Ce serait BA, et le produit ne commute pas.') },
    ]);
    const [seg, ...rest] = cellSegment(d, cell, { menu: menu1 });
    const script = [
      ...rest,
      { kind: 'segment', html: t('Calcule tout le produit AB.'), start: { math: 'AB' }, judge: { kind: 'mat', expect: mt(d.AB), about: prodAbout(d), menu: menu2 } },
      { kind: 'eq', math: mt(d.AB), note: t('AB est {s}', { s: sizeR(d.AB) }), subgoal: 'rowcol' },
    ];
    return matLines({
      skill: PROD, level, prompt: t('{p} Calcule d\'abord le coefficient {c} de C = AB : choisis la ligne et la colonne à multiplier. Puis calcule AB.', { p: prodPrompt(d), c: `c${ij(i, j)}` }),
      start: seg.start.math, judge: seg.judge, mode: 'tap', tapActions: 'menu', script, hints: prodHints(d, cell), subgoals: PROD_SUB, key: key(d, 't'), fallback: d.fallback,
    });
  }
  if (level === 4) {
    const d = prodData(rng);
    const At = MX.transpose(d.A);
    const Bt = MX.transpose(d.B);
    const ABt = MX.transpose(d.AB);
    const script = [
      { kind: 'eq', math: mt(d.AB), note: t('AB est {s} : ligne fois colonne', { s: sizeR(d.AB) }), subgoal: 'rowcol' },
      { kind: 'segment', html: t('Calcule (AB)ᵀ en passant par BᵀAᵀ.'), start: { math: '(AB)^T' }, judge: { kind: 'mat', expect: mt(ABt), about: { transpose: [mt(d.A), mt(d.B)] } } },
      { kind: 'eq', math: `${mt(Bt)}·${mt(At)}`, note: t('(AB)ᵀ = BᵀAᵀ : l\'ordre s\'inverse'), subgoal: 'size' },
      { kind: 'eq', math: mt(ABt), note: '', subgoal: 'rowcol' },
    ];
    return matLines({
      skill: PROD, level, prompt: t('{p} Calcule AB, puis (AB)ᵀ.', { p: prodPrompt(d) }),
      start: 'AB', judge: { kind: 'mat', expect: mt(d.AB), about: prodAbout(d) }, mode: 'free', script,
      hints: [
        { level: 1, html: t('Case (i, j) de AB : ligne i de A fois colonne j de B. Puis (AB)ᵀ = BᵀAᵀ : la transposée renverse l\'ordre.') },
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
  for (let tries = 0; tries < 200; tries++) {
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
      skill: PROD, level: 5, prompt: kind === 'poly' ? t('Soit A = {A}. Calcule {e}.', { A: MLm(A), e: text }) : t('Soit A = {A} et B = {B}. Calcule {e}.', { A: MLm(A), B: MLm(B), e: text }),
      start, judge: { kind: 'mat', expect: mt(R), about }, mode: 'free',
      script: [
        { kind: 'eq', math: mid, note: kind === 'sq' ? t('(A + B)² = (A + B)(A + B), sans développer') : kind === 'tA' ? t('Transposer A, puis multiplier') : t('A², puis 2A, puis + I'), subgoal: 'rowcol' },
        { kind: 'eq', math: mt(R), note: '', subgoal: 'rowcol' },
      ],
      hints: [], subgoals: PROD_SUB, key: `${PROD}:x:${kind}:${mt(A)}:${mt(B)}`,
    });
  }
  const d = prodData(rng, { sizes: [3, 2, 3] });
  return matLines({
    skill: PROD, level: 5, prompt: t('{p} Calcule AB.', { p: prodPrompt(d) }), start: 'AB', judge: { kind: 'mat', expect: mt(d.AB), about: prodAbout(d) },
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
        statement: t('Pour toutes matrices carrées A et B de même taille, (A + B)² = A² + 2AB + B².'),
        counter: pairCounter('(A+B)^2=A^2+2AB+B^2', pr),
        explanation: t('Faux : (A + B)² = A² + AB + BA + B², et AB ≠ BA en général. Par exemple A = {A}, B = {B}.', { A: MLm(MX.mat(pr[0])), B: MLm(MX.mat(pr[1])) }),
      });
    }
    if (which === 'zero') {
      const pr = rng.pick(ZERO_PAIRS);
      return tfL({
        skill: PROD, key: `zero:${mt(MX.mat(pr[0]))}`, truth: false, exam: tag,
        statement: t('Si A et B sont des matrices carrées telles que AB = 0, alors A = 0 ou B = 0.'),
        counter: pairCounter('AB=0⇒A=0ouB=0', pr),
        explanation: t('Faux : A = {A} et B = {B} sont non nulles, et AB = 0.', { A: MLm(MX.mat(pr[0])), B: MLm(MX.mat(pr[1])) }),
      });
    }
    if (which === 'tr') {
      const pr = rng.pick(NONCOMMUTE);
      return tfL({
        skill: PROD, key: `tr:${mt(MX.mat(pr[0]))}`, truth: false, exam: tag, ruleIfTrue: 'l_transpose_product',
        statement: t('Pour toutes matrices carrées A et B de même taille, (AB)ᵀ = AᵀBᵀ.'),
        counter: pairCounter('(AB)^T=A^TB^T', pr),
        explanation: t('Faux : (AB)ᵀ = BᵀAᵀ, et AᵀBᵀ = (BA)ᵀ. Dès que AB ≠ BA, l\'égalité tombe : A = {A}, B = {B}.', { A: MLm(MX.mat(pr[0])), B: MLm(MX.mat(pr[1])) }),
      });
    }
    const T = {
      trOk: [t('Pour A de taille m × n et B de taille n × p, (AB)ᵀ = BᵀAᵀ.'), t('Vrai : la case (i, j) de (AB)ᵀ est la ligne j de A fois la colonne i de B, c\'est-à-dire la ligne i de Bᵀ fois la colonne j de Aᵀ.')],
      dist: [t('Pour A de taille m × n et B, C de taille n × p, A(B + C) = AB + AC.'), t('Vrai : le produit est distributif, à condition de garder A à gauche.')],
      assoc: [t('Pour A, B, C dont les produits existent, (AB)C = A(BC).'), t('Vrai : le produit de matrices est associatif (c\'est la composition des applications).')],
    }[which];
    return tfL({ skill: PROD, key: which, truth: true, exam: tag, statement: T[0], explanation: T[1], ruleIfFalse: null });
  }
  const d = prodData(rng, { square: exam === 'mcq' || rng.chance(0.5) });
  const [i, j] = pickCell(d, rng);
  const right = d.AB[i][j];
  const prompt = t('{p} Soit C = AB. Que vaut {c} ?', { p: prodPrompt(d), c: `c${ij(i, j)}` });
  const solution = [{ html: `c${ij(i, j)} = ${expansionR(d.A, d.B, i, j)} = ${fq(right)}`, note: t('Ligne {i} de A, colonne {j} de B', { i: i + 1, j: j + 1 }) }];
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
  { id: 'down', label: t('descendre'), skill: ECH },
  { id: 'up', label: t('remonter'), skill: RREF },
  { id: 'read', label: t('lire'), skill: INV },
];

// A (n × n) with a nice inverse: unimodular (whole inverse), or
// M·diag(1, …, 1, d) (fractions k/d in the last row of A⁻¹). The reduction
// of [A | I] (no exchange) stays small. The asked entry b_ij ≠ b_ji, ≠ 0.
function invData(rng, { n = 3, scaled = false, maxOps = 8, unitPivot = false } = {}) {
  for (let tries = 0; tries < 200; tries++) {
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
const invSeg = (d) => ({ kind: 'segment', html: t('Lis A⁻¹ dans la partie droite.'), start: { math: 'A^(-1)' }, judge: { kind: 'mat', expect: mt(d.Ai), about: invAbout(d) } });
const invLine = (d) => ({ kind: 'eq', math: mt(d.Ai), note: t('La partie droite de [I | A⁻¹]'), subgoal: 'read' });
const coefSeg = (d, html = t('Que vaut {b}, le coefficient ({i}, {j}) de A⁻¹ ?', { b: bName(d), i: d.i + 1, j: d.j + 1 })) => ({
  kind: 'segment', html, ask: `${bName(d)} =`, start: { math: bLabel(d) }, judge: { kind: 'mat', expect: qt(d.Ai[d.i][d.j]), about: invAbout(d, true) },
});
const coefLine = (d) => ({ kind: 'eq', math: qt(d.Ai[d.i][d.j]), note: t('Ligne {i}, colonne {j} de A⁻¹', { i: d.i + 1, j: d.j + 1 }), subgoal: 'read' });

function invLines(d) {
  return opLines(d.M, d.ops, {
    bar: d.n,
    note: (op) => (op.kind === 'scale' ? t('Pivot à 1 : {op}', { op: opR(op) }) : op.i > op.j ? t('Descendre : {op}', { op: opR(op) }) : t('Remonter : {op}', { op: opR(op) })),
    subgoal: (op) => (op.kind === 'add' && op.i > op.j ? 'down' : 'up'),
  });
}

function invHints(d, lines) {
  const up = lines.find((l) => l.op.kind === 'add' && l.op.i < l.op.j) ?? lines[lines.length - 1];
  return [
    { level: 1, html: t('Réduis [A | I] jusqu\'à [I | A⁻¹] : chaque opération porte sur les {n} colonnes.', { n: 2 * d.n }) },
    { level: 2, html: t('{op} : la ligne {i} devient {row}.', { op: opR(up.op), i: up.op.i + 1, row: rowHoles(up.result, up.op.i, d.n, d.n) }) },
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
        kind: 'decision', prompt: t('Quelle opération annule la case ({i}, 1) ?', { i: op.i + 1 }), options: rng.shuffle([
          { id: 'ok', label: opR(op), valid: true },
          { id: 'sign', label: opR(bad), valid: false, rule: 'l_rowop_sign', why: t('Avec ce signe, la case devient {v} au lieu de 0.', { v: fq(d.M[op.i][0].add(bad.k.mul(d.M[op.j][0]))) }) },
          { id: 'other', label: opR(other), valid: false, why: t('Cette opération ne crée pas de zéro sous le pivot : c\'est la ligne du pivot qu\'il faut ajouter.') },
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
      ...base, prompt: level === 2 ? t('Inverse A = {A} en réduisant [A | I], puis lis {b}.', { A: MLm(d.A), b: bName(d) }) : t('Inverse A = {A} en réduisant [A | I].', { A: MLm(d.A) }),
      mode: 'guided', script, key,
    });
  }
  return matLines({
    ...base,
    prompt: level === 3
      ? t('Réduis [A | I] avec A = {A} : choisis chaque opération, puis écris la matrice. Puis donne {b}.', { A: MLm(d.A), b: bName(d) })
      : t('Réduis [A | I] avec A = {A}. Puis donne {b}.', { A: MLm(d.A), b: 'A⁻¹' }),
    mode: level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'rowops' : null,
    script: [...lines, ...(level === 3 ? [coefSeg(d), coefLine(d)] : [invSeg(d), invLine(d)])], key,
  });
}

// A 2 × 2 by the formula (level 4).
function inv2x2(rng) {
  let A; let det;
  for (let tries = 0; tries < 200; tries++) {
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
    skill: INV, level: 4, prompt: t('Calcule l\'inverse de A = {A} par la formule des matrices 2 × 2.', { A: MLm(A) }),
    start: 'A^(-1)', judge: { kind: 'mat', expect: mt(Ai), about: { inverse: mt(A) } }, mode: 'free',
    script: [
      { kind: 'eq', math: mid, note: t('ad − bc = {d} ; échanger a et d, changer le signe de b et c', { d: fq(det) }), subgoal: 'read' },
      { kind: 'eq', math: mt(Ai), note: '', subgoal: 'read' },
    ],
    hints: [
      { level: 1, html: t('Pour une 2 × 2 : [[a, b], [c, d]]⁻¹ = (1/(ad − bc))·[[d, −b], [−c, a]].') },
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
    for (let tries = 0; tries < 200 && !A; tries++) {
      const X = unimodular(4, rng, { max: 3 });
      const Xi = MX.inverse(X);
      if (maxAbs(Xi) > 9 || MX.trace(Xi).eq(MX.trace(X))) continue;
      A = X; Ai = Xi;
    }
    const fb = !A;
    if (fb) { A = MX.mat([[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1], [0, 0, 0, 1]]); Ai = MX.inverse(A); }
    return coefItem({
      skill: INV, level: 5, prompt: t('Soit A = {A} et B une matrice telle que AB = I₄. Que vaut la trace de B ?', { A: MLm(A) }),
      label: 'tr(B)', value: qt(MX.trace(Ai)), key: `tr:${mt(A)}`, askCoef: { label: 'tr B' },
      traps: [{ rule: 'l_inv_entrywise' }, { rule: 'l_coef_index_swap' }], subgoals: INV_SUB,
      solution: [{ html: `B = A⁻¹ = ${MLm(Ai)}`, note: t('AB = I et A carrée : B = A⁻¹') }, { html: `tr B = ${fq(MX.trace(Ai))}`, note: t('Somme de la diagonale') }],
      fallback: fb,
    });
  }
  const d = invData(rng, { scaled: rng.chance(0.5), maxOps: 9 });
  return coefItem({
    skill: INV, level: 5, prompt: t('Soit A = {A} et B = A⁻¹. Que vaut {b} ?', { A: MLm(d.A), b: bName(d) }),
    label: bLabel(d), value: qt(d.Ai[d.i][d.j]), key: `${mt(d.A)}:${d.i}${d.j}`, askCoef: { label: bName(d), path: [d.i, d.j] },
    traps: [{ rule: 'l_coef_index_swap' }, { rule: 'l_inv_entrywise' }, { rule: 'l_rhs_forgotten' }], subgoals: INV_SUB,
    solution: [{ html: `A⁻¹ = ${MLm(d.Ai)}`, note: t('Réduire [A | I]') }, { html: `${bName(d)} = ${fq(d.Ai[d.i][d.j])}`, note: '' }],
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
        statement: t('Si A et B sont des matrices n × n inversibles, alors AB est inversible et (AB)⁻¹ = A⁻¹B⁻¹.'),
        counter: pairCounter('(AB)^-1=A^-1B^-1', pr),
        explanation: t('Faux : (AB)⁻¹ = B⁻¹A⁻¹, qui diffère de A⁻¹B⁻¹ dès que A et B ne commutent pas. Par exemple A = {A} et B = {B}.', { A: MLm(MX.mat(pr[0])), B: MLm(MX.mat(pr[1])) }),
      });
    }
    const T = {
      transp: [t('Si A est inversible, alors Aᵀ est inversible et (Aᵀ)⁻¹ = (A⁻¹)ᵀ.'), t('Vrai : Aᵀ(A⁻¹)ᵀ = (A⁻¹A)ᵀ = Iᵀ = I.')],
      prodOk: [t('Si A et B sont des matrices n × n inversibles, alors (AB)⁻¹ = B⁻¹A⁻¹.'), t('Vrai : (AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ = AA⁻¹ = I.')],
      twice: [t('Si A est inversible, alors A⁻¹ est inversible et (A⁻¹)⁻¹ = A.'), t('Vrai : A⁻¹A = AA⁻¹ = I dit justement que A est l\'inverse de A⁻¹.')],
    }[which];
    return tfL({ skill: INV, key: which, truth: true, exam: tag, statement: T[0], explanation: T[1], ruleIfFalse: which === 'prodOk' ? 'l_inv_product_order' : null });
  }
  const d = invData(rng, { scaled: rng.chance(0.4), maxOps: 9 });
  const right = d.Ai[d.i][d.j];
  const prompt = t('Soit A = {A} et B = A⁻¹. Que vaut {b} ?', { A: MLm(d.A), b: bName(d) });
  const solution = [{ html: `A⁻¹ = ${MLm(d.Ai)}`, note: t('Réduire [A | I]') }, { html: `${bName(d)} = ${fq(right)}`, note: t('Ligne {i}, colonne {j}', { i: d.i + 1, j: d.j + 1 }) }];
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
// l-map-geom
// ======================================================================

const GEOM = 'l-map-geom';
const GEOM_SUB = [
  { id: 'images', label: t('images de e₁ et e₂'), skill: 'l-map-std-matrix' },
  { id: 'trig', label: t('cos θ et sin θ'), skill: 'g3-exact' },
  { id: 'dir', label: t('vecteur directeur d\'une droite'), skill: 'g4-line2' },
  { id: 'invP', label: t('inverser P'), skill: INV },
  { id: 'compose', label: t('recomposer'), skill: GEOM },
];

const THETA = [
  { t: 'π/6', c: '√3/2', s: '1/2' }, { t: 'π/4', c: '√2/2', s: '√2/2' }, { t: 'π/3', c: '1/2', s: '√3/2' },
  { t: 'π/2', c: '0', s: '1' }, { t: '2π/3', c: '-1/2', s: '√3/2' }, { t: '3π/4', c: '-√2/2', s: '√2/2' },
  { t: '5π/6', c: '-√3/2', s: '1/2' }, { t: 'π', c: '-1', s: '0' }, { t: '−π/2', c: '0', s: '-1' }, { t: '−π/3', c: '1/2', s: '-√3/2' },
];
const RAT_THETA = THETA.filter((x) => !/√/.test(x.c + x.s));
const rotT = (th) => `[[${th.c},${negT(th.s)}],[${th.s},${th.c}]]`;
const rotTT = (th) => `[[${th.c},${th.s}],[${negT(th.s)},${th.c}]]`;
// A scalar with a root, as matexpr reads it alone: (√2)/2 (« √2/2 » alone is misread).
const rootP = (s) => s.replace(/√(\d+)/g, '(√$1)');
const rotR = (th) => t('la rotation d\'angle {a} (de centre O)', { a: th.t });

// « ax + by = 0 », readable (a ≥ 0).
function lineEq(a, b) {
  if (a < 0 || (a === 0 && b < 0)) { a = -a; b = -b; }
  const term = (c, v, first) => (c === 0 ? '' : `${c < 0 ? (first ? '−' : ' − ') : first ? '' : ' + '}${Math.abs(c) === 1 ? '' : Math.abs(c)}${v}`);
  return `${term(a, 'x', true)}${term(b, 'y', a === 0)} = 0`;
}
// A direction (p ; q), p > 0, q ≠ 0, coprime, entries ≤ 3.
function direction(rng) {
  for (;;) {
    const p = rng.int(1, 3);
    const qq = nz(rng, -3, 3);
    if (gcd(p, qq) === 1) return [p, qq];
  }
}

// Projection on the line of direction u, and the symmetry.
function projData(rng) {
  const [p, r] = direction(rng);
  const n2 = p * p + r * r;
  const uu = MX.mat([[p * p, p * r], [p * r, r * r]]);
  const P = MX.scale(uu, q(1, n2));
  const S = MX.sub(MX.scale(P, 2), MX.identity(2));
  return { u: [p, r], n2, uu, P, S, eq: lineEq(r, -p) };
}

// Affinity of axis Span{a}, direction Span{u}, ratio k: M = P·diag(1, k)·P⁻¹.
const KS = [q(-2), q(-1, 2), q(2, 3), q(-2, 3), q(3), q(2), q(1, 2)];
function affData(rng) {
  for (let tries = 0; tries < 200; tries++) {
    const a = direction(rng).map((x, i) => (i === 0 ? x * rng.pick([1, -1]) : x));
    const u = [rng.int(-3, 3), rng.int(-3, 3)];
    if (u.every((x) => x === 0) || gcd(u[0], u[1]) !== 1) continue;
    const det = a[0] * u[1] - a[1] * u[0];
    if (![1, -1, 2, -2, 3, -3, 5, -5].includes(det)) continue;
    const k = rng.pick(KS);
    const P = MX.mat([[a[0], u[0]], [a[1], u[1]]]);
    const Pi = MX.inverse(P);
    const M = MX.mul(MX.mul(P, MX.diag([1, k])), Pi);
    if (M.flat().some((x) => x.d > 15 || Math.abs(x.valueOf()) > 6) || MX.isDiagonal(M)) continue;
    return { a, u, k, P, Pi, M, det: q(det), axis: lineEq(a[1], -a[0]), dir: lineEq(u[1], -u[0]) };
  }
  const P = MX.mat([[2, 3], [-1, 1]]);
  const Pi = MX.inverse(P);
  const k = q(-2, 3);
  return { a: [2, -1], u: [3, 1], k, P, Pi, M: MX.mul(MX.mul(P, MX.diag([1, k])), Pi), det: q(5), axis: 'x + 2y = 0', dir: 'x − 3y = 0', fallback: true };
}

// The matrix of a map « first, then second »: second·first.
const SIMPLE_SYM = [
  { M: '[[1,0],[0,-1]]', r: t('la symétrie d\'axe Ox') }, { M: '[[-1,0],[0,1]]', r: t('la symétrie d\'axe Oy') }, { M: '[[0,1],[1,0]]', r: t('la symétrie d\'axe y = x') },
];
function compData(rng) {
  const th = rng.pick(rng.chance(0.5) ? RAT_THETA : THETA);
  let S;
  if (!/√/.test(th.c + th.s) && rng.chance(0.6)) {
    const p = projData(rng);
    S = rng.chance(0.5) ? { M: mt(p.S), r: t('la symétrie orthogonale d\'axe {eq}', { eq: p.eq }), p } : { M: mt(p.P), r: t('la projection orthogonale sur la droite {eq}', { eq: p.eq }), p };
  } else S = rng.pick(SIMPLE_SYM);
  const R = { M: rotT(th), r: rotR(th), th };
  const rFirst = rng.chance(0.5);
  const [first, second] = rFirst ? [R, S] : [S, R];
  const expr = `${second.M}·${first.M}`;
  return { th, R, S, first, second, expr, M: VT(expr), rFirst };
}

const geomCfg = (expect, about) => ({ kind: 'mat', expect, ...(about ? { about } : {}) });

// The parts of each kind of map.
function rotParts(th, rng) {
  const a = th.t.replace('−', '-');
  const exact = () => rng.shuffle([
    { id: 'ok', label: t('La valeur exacte, lue sur le cercle trigonométrique'), valid: true },
    { id: 'approx', label: t('Une valeur approchée à la calculatrice'), valid: false, why: t('La matrice demande des valeurs exactes, avec des racines.') },
  ]);
  return [
    { start: `cos(${a})`, judge: geomCfg(rootP(th.c)), menu: exact(),
      lines: [{ math: th.c, note: t('cos θ, abscisse du point d\'angle {a} du cercle', { a: th.t }), subgoal: 'trig' }] },
    { html: 'sin θ.', start: `sin(${a})`, judge: geomCfg(rootP(th.s)), menu: exact(),
      lines: [{ math: th.s, note: t('sin θ, ordonnée du même point'), subgoal: 'trig' }] },
    { html: t('La matrice R de la rotation.'), start: 'R', judge: geomCfg(rotT(th), { rotation: true }),
      menu: rng.shuffle([
        { id: 'ok', label: t('R·e₁ et R·e₂ en colonnes'), valid: true },
        { id: 'rows', label: t('R·e₁ et R·e₂ en lignes'), valid: false, rule: 'l_rot_transpose', why: t('Les colonnes d\'une matrice sont les images des vecteurs de base : en lignes, on obtient la rotation d\'angle −θ.') },
      ]),
      decision: {
        kind: 'decision', prompt: t('Quelle est la matrice de la rotation d\'angle θ ?'), options: rng.shuffle([
          { id: 'ok', label: '[[cos θ, −sin θ], [sin θ, cos θ]]', valid: true },
          { id: 'tr', label: '[[cos θ, sin θ], [−sin θ, cos θ]]', valid: false, rule: 'l_rot_transpose', why: t('Sa première colonne est (cos θ ; −sin θ) : c\'est la rotation d\'angle −θ.') },
          { id: 'sc', label: '[[sin θ, −cos θ], [cos θ, sin θ]]', valid: false, why: t('Sa première colonne doit être l\'image de e₁, (cos θ ; sin θ).') },
        ]),
      },
      lines: [{ math: rotT(th), note: t('Colonnes : R·e₁ et R·e₂'), subgoal: 'images', grid: GRID2 }] },
  ];
}

function projParts(p, sym, rng) {
  const parts = [
    { start: 'u', judge: { kind: 'span', basis: [vt(p.u.map((x) => q(x)))], require: 'basis' },
      menu: rng.shuffle([
        { id: 'ok', label: t('Pour ax + by = 0 : u = (−b ; a)'), valid: true },
        { id: 'n', label: t('Pour ax + by = 0 : u = (a ; b)'), valid: false, why: t('(a ; b) est un vecteur normal : il est orthogonal à la droite.') },
      ]),
      lines: [{ math: vt(p.u.map((x) => q(x))), note: t('Un vecteur directeur de {eq}', { eq: p.eq }), subgoal: 'dir' }] },
    { html: t('La matrice P de la projection orthogonale sur la droite.'), start: 'P', judge: geomCfg(mt(p.P)),
      menu: rng.shuffle([
        { id: 'ok', label: 'P = uuᵀ/(uᵀu)', valid: true },
        { id: 'sq', label: 'P = uuᵀ/‖u‖', valid: false, rule: 'g4_proj_no_square', why: t('Il faut diviser par ‖u‖² = uᵀu : P·u doit redonner u.') },
        { id: 'ut', label: 'P = uᵀu/(uuᵀ)', valid: false, why: t('uᵀu est un nombre, et on ne divise pas par une matrice.') },
      ]),
      decision: {
        kind: 'decision', prompt: t('Quelle formule donne la projection orthogonale sur la droite de direction u ?'), options: rng.shuffle([
          { id: 'ok', label: 'P = uuᵀ/(uᵀu)', valid: true },
          { id: 'sq', label: 'P = uuᵀ/‖u‖', valid: false, rule: 'g4_proj_no_square', why: t('Il faut diviser par ‖u‖² = uᵀu : alors P·u = u.') },
          { id: 'ut', label: 'P = uᵀu/(uuᵀ)', valid: false, why: t('uᵀu est un nombre, uuᵀ une matrice : on ne divise pas par une matrice.') },
        ]),
      },
      lines: [
        { math: `(1/${p.n2})·${mt(p.uu)}`, note: t('uuᵀ divisé par uᵀu = {n}', { n: p.n2 }), subgoal: 'compose' },
        { math: mt(p.P), note: '', subgoal: 'compose', grid: GRID2 },
      ] },
  ];
  if (sym) {
    parts.push({
      html: t('La matrice S de la symétrie orthogonale d\'axe la droite.'), start: 'S', judge: geomCfg(mt(p.S)),
      menu: rng.shuffle([
        { id: 'ok', label: 'S = 2P − I', valid: true },
        { id: 'pi', label: 'S = P − I', valid: false, why: t('Le symétrique de x est P(x) + (P(x) − x) = 2P(x) − x.') },
        { id: 'ip', label: 'S = I − 2P', valid: false, why: t('I − 2P est la symétrie d\'axe la droite perpendiculaire.') },
      ]),
      lines: [
        { math: `2·${mt(p.P)}-I`, note: 'S = 2P − I', subgoal: 'compose' },
        { math: mt(p.S), note: '', subgoal: 'compose', grid: GRID2 },
      ],
    });
  }
  return parts;
}

function affParts(d, given, rng) {
  const vec = (v) => vt(v.map((x) => q(x)));
  const mDecision = {
    kind: 'decision', prompt: t('Comment écrire M ?'), options: rng.shuffle([
      { id: 'ok', label: 'M = P·diag(1, k)·P⁻¹', valid: true },
      { id: 'inv', label: 'M = P⁻¹·diag(1, k)·P', valid: false, rule: 'l_pdp_inverse_side', why: t('Les colonnes de P sont a et u : MP = P·diag(1, k), donc M = P·diag(1, k)·P⁻¹.') },
      { id: 'k1', label: 'M = P·diag(k, 1)·P⁻¹', valid: false, why: t('M fixe a (1re colonne de P) et multiplie u par k : diag(1, k).') },
    ]),
  };
  const mMenu = rng.shuffle([
    { id: 'ok', label: t('M = P·diag(1, k)·P⁻¹ avec P = [a | u]'), valid: true },
    { id: 'inv', label: 'M = P⁻¹·diag(1, k)·P', valid: false, rule: 'l_pdp_inverse_side', why: t('MP = P·diag(1, k), donc M = P·diag(1, k)·P⁻¹.') },
    { id: 'k1', label: 'M = P·diag(k, 1)·P⁻¹', valid: false, why: t('Le rapport k s\'applique à la direction u, pas à l\'axe.') },
  ]);
  const prod = { math: `${mt(d.P)}·diag(1,${qt(d.k)})·${mt(d.Pi)}`, note: `M = P·diag(1, ${fq(d.k)})·P⁻¹`, subgoal: 'compose' };
  const mPart = { html: t('Recompose M = P·diag(1, k)·P⁻¹.'), start: 'M', judge: geomCfg(mt(d.M)), decision: mDecision, menu: mMenu,
    lines: [prod, { math: mt(d.M), note: t('Contrôle : M·a = a et M·u = {k}·u', { k: parR(d.k) }), subgoal: 'compose', grid: GRID2 }] };
  const dirMenu = (label) => rng.shuffle([
    { id: 'ok', label, valid: true },
    { id: 'n', label: t('Le vecteur normal (a ; b)'), valid: false, why: t('(a ; b) est orthogonal à la droite, il n\'est pas sur elle.') },
  ]);
  if (!given) {
    return [
      { start: 'a', judge: { kind: 'span', basis: [vec(d.a)], require: 'basis' }, menu: dirMenu(t('Un vecteur de l\'axe : (−b ; a) pour ax + by = 0')),
        lines: [{ math: vec(d.a), note: t('Sur l\'axe {eq} : M·a = a', { eq: d.axis }), subgoal: 'dir' }] },
      { html: t('Un vecteur u de la direction.'), start: 'u', judge: { kind: 'span', basis: [vec(d.u)], require: 'basis' }, menu: dirMenu(t('Un vecteur de la direction : (−b ; a) pour ax + by = 0')),
        lines: [{ math: vec(d.u), note: t('Sur la droite {eq} : M·u = k·u', { eq: d.dir }), subgoal: 'dir' }] },
      mPart,
    ];
  }
  const adj = [[q(d.u[1]), q(-d.u[0])], [q(-d.a[1]), q(d.a[0])]];
  return [
    { start: 'P', judge: geomCfg(mt(d.P)), menu: rng.shuffle([{ id: 'ok', label: t('P = [a | u] : a et u en colonnes'), valid: true }, { id: 'rows', label: t('a et u en lignes'), valid: false, why: t('MP = P·diag(1, k) demande a et u en colonnes.') }]),
      lines: [{ math: mt(d.P), note: t('a et u en colonnes'), subgoal: 'compose', grid: GRID2 }] },
    { html: t('Inverse P.'), start: 'P^(-1)', judge: geomCfg(mt(d.Pi), { inverse: mt(d.P) }),
      menu: rng.shuffle([{ id: 'ok', label: t('Formule 2 × 2 : (1/det P)·[[d, −b], [−c, a]]'), valid: true }, { id: 'each', label: t('Inverser chaque case'), valid: false, rule: 'l_inv_entrywise', why: t('L\'inverse d\'une matrice n\'est pas la matrice des inverses.') }]),
      lines: [
        ...(d.det.eq(1) ? [] : [{ math: `(${qt(q(1).div(d.det))})·${mt(adj)}`, note: `det P = ${fq(d.det)}`, subgoal: 'invP' }]),
        { math: mt(d.Pi), note: '', subgoal: 'invP', grid: GRID2 },
      ] },
    mPart,
  ];
}

function compParts(c, rng) {
  const one = (x, name) => ({
    html: name === 'R' ? t('La matrice R de la rotation.') : t('La matrice S de l\'autre application.'), start: name,
    judge: geomCfg(x.M, name === 'R' ? { rotation: true } : null),
    menu: rng.shuffle([{ id: 'ok', label: t('Les images de e₁ et e₂ en colonnes'), valid: true }, { id: 'rows', label: t('Les images de e₁ et e₂ en lignes'), valid: false, rule: name === 'R' ? 'l_rot_transpose' : null, why: t('La colonne j est l\'image de eⱼ.') }]),
    lines: [{ math: x.M, note: name === 'R' ? t('Rotation d\'angle {a}', { a: c.th.t }) : t('Les images de e₁ et e₂ en colonnes'), subgoal: 'images', grid: GRID2 }],
  });
  const fn = c.rFirst ? 'R' : 'S';
  const sn = c.rFirst ? 'S' : 'R';
  return [
    ...(/√/.test(c.R.M) ? [one(c.S, 'S'), one(c.R, 'R')] : [one(c.R, 'R'), one(c.S, 'S')]),
    { html: t('La matrice M de la composée (d\'abord {f}, puis {s}).', { f: fn, s: sn }), start: 'M', judge: geomCfg(c.M, { compose: [c.first.M, c.second.M] }),
      decision: {
        kind: 'decision', prompt: t('On applique d\'abord {f}, puis {s}. Quelle est la matrice de la composée ?', { f: fn, s: sn }), options: rng.shuffle([
          { id: 'ok', label: `${sn}·${fn}`, valid: true },
          { id: 'rev', label: `${fn}·${sn}`, valid: false, rule: 'l_compose_order', why: t('{s}({f}(x)) = ({s}{f})x : la matrice appliquée en premier est à droite.', { f: fn, s: sn }) },
        ]),
      },
      menu: rng.shuffle([
        { id: 'ok', label: t('{s}·{f} : la première appliquée est à droite', { f: fn, s: sn }), valid: true },
        { id: 'rev', label: t('{f}·{s} : dans l\'ordre de l\'énoncé', { f: fn, s: sn }), valid: false, rule: 'l_compose_order', why: `${sn}(${fn}(x)) = (${sn}${fn})x.` },
      ]),
      lines: [{ math: c.expr, note: `${sn}·${fn}`, subgoal: 'compose' }, { math: c.M, note: '', subgoal: 'compose', grid: GRID2 }] },
  ];
}

function geomItem(level, rng) {
  const kinds = { 1: ['aff', 'aff', 'rot'], 2: ['rot', 'proj', 'sym', 'aff', 'comp'], 3: ['rot', 'proj', 'sym', 'aff', 'comp'], 4: ['proj', 'sym', 'aff', 'comp', 'rot'], 5: ['aff', 'comp'] }[level];
  const kind = rng.pick(kinds);
  const o = { skill: GEOM, subgoals: GEOM_SUB };
  if (kind === 'rot') {
    const th = rng.pick(THETA);
    return partsItem(level, rng, rotParts(th, rng), {
      ...o, prompt: t('Écris la matrice de {r} dans ℝ², en passant par les images de e₁ et e₂.', { r: rotR(th) }), key: `${GEOM}:rot:${th.t}`, blanks: 2,
      hints: level === 5 ? [] : [
        { level: 1, html: t('Les colonnes de R sont les images de e₁ et e₂ : e₁ tourné de θ donne (cos θ ; sin θ), e₂ tourné donne (−sin θ ; cos θ).') },
        { level: 2, html: `R = [[cos(${th.t}), □], [□, cos(${th.t})]]` },
        { level: 3, html: `R = ${ML(rotT(th))}` },
      ],
    });
  }
  if (kind === 'proj' || kind === 'sym') {
    const p = projData(rng);
    const sym = kind === 'sym';
    return partsItem(level, rng, projParts(p, sym, rng), {
      ...o, key: `${GEOM}:${kind}:${p.eq}`,
      prompt: sym
        ? t('Écris la matrice de la symétrie orthogonale d\'axe la droite d : {eq}, en passant par la projection P sur d. Commence par un vecteur directeur u de d.', { eq: p.eq })
        : t('Écris la matrice de la projection orthogonale sur la droite d : {eq}. Commence par un vecteur directeur u de d.', { eq: p.eq }),
      hints: [
        { level: 1, html: sym ? t('Un vecteur directeur u de d, puis P = uuᵀ/(uᵀu), puis S = 2P − I.') : t('Un vecteur directeur u de d, puis P = uuᵀ/(uᵀu).') },
        { level: 2, html: `u = ${vt(p.u.map((x) => q(x))).replace(/-/g, '−')}, P = (1/□)·${MLm(p.uu)}` },
        { level: 3, html: `${sym ? `S = ${MLm(p.S)}` : `P = ${MLm(p.P)}`}` },
      ],
    });
  }
  if (kind === 'aff') {
    const d = affData(rng);
    const given = level <= 2;
    return partsItem(level, rng, affParts(d, given, rng), {
      ...o, key: `${GEOM}:aff:${mt(d.P)}:${qt(d.k)}`, fallback: d.fallback,
      prompt: given
        ? t('Écris la matrice M de l\'affinité d\'axe {axis}, de direction {dir} et de rapport {k}. On prend a = {a} sur l\'axe, u = {u} dans la direction et P = [a | u].', { axis: d.axis, dir: d.dir, k: fq(d.k), a: vt(d.a.map((x) => q(x))).replace(/-/g, '−'), u: vt(d.u.map((x) => q(x))).replace(/-/g, '−') })
        : t('Écris la matrice M de l\'affinité d\'axe {axis}, de direction {dir} et de rapport {k}. Cherche un vecteur a de l\'axe et un vecteur u de la direction.', { axis: d.axis, dir: d.dir, k: fq(d.k) }),
      hints: level === 5 ? [] : [
        { level: 1, html: t('Cherche deux vecteurs dont tu connais l\'image : a sur l\'axe (M·a = a), u dans la direction (M·u = k·u). Puis M = P·diag(1, k)·P⁻¹ avec P = [a | u].') },
        { level: 2, html: `M = ${MLm(d.P)}·diag(1, □)·P⁻¹` },
        { level: 3, html: `M = ${MLm(d.M)}` },
      ],
    });
  }
  const c = compData(rng);
  const fn = c.rFirst ? 'R' : 'S';
  const sn = c.rFirst ? 'S' : 'R';
  return partsItem(level, rng, compParts(c, rng), {
    ...o, key: `${GEOM}:comp:${c.expr}`,
    prompt: t('Soit R {r} et S {s}. Écris la matrice M de l\'application qui fait d\'abord {f}, puis {n}.', { r: c.R.r, s: c.S.r, f: fn, n: sn }),
    hints: level === 5 ? [] : [
      { level: 1, html: t('On applique d\'abord {f} à x, puis {s} au résultat : {s}({f}(x)) = ({s}{f})x. La matrice appliquée en premier est à droite.', { f: fn, s: sn }) },
      { level: 2, html: t('M = □·□ : écris R et S, puis leur produit dans le bon ordre.') },
      { level: 3, html: `M = ${ML(c.M)}` },
    ],
  });
}

function geomExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const which = rng.pick(['inj', 'inv', 'p2', 'sym2', 'rot']);
    if (which === 'inj' || which === 'inv') {
      const p = projData(rng);
      const nrm = vt([q(-p.u[1]), q(p.u[0])]);
      return tfL({
        skill: GEOM, key: `${which}:${p.eq}`, truth: false, exam: tag,
        statement: which === 'inj' ? t('Une projection orthogonale de ℝ² sur une droite est injective.') : t('La matrice d\'une projection orthogonale de ℝ² sur une droite est inversible.'),
        counter: { kind: 'mapWitness', params: { A: mt(p.P) }, ask: [{ v: 'x', label: 'x =' }, { v: 'y', label: 'y =' }], answer: { x: nrm, y: '(0 ; 0)' } },
        explanation: t('Faux : pour la projection sur {eq}, de matrice {P}, le vecteur {v} (orthogonal à la droite) et 0 ont la même image 0.', { eq: p.eq, P: MLm(p.P), v: nrm.replace(/-/g, '−') }),
      });
    }
    const T = {
      p2: [t('La matrice P d\'une projection orthogonale vérifie P² = P.'), t('Vrai : un vecteur déjà projeté sur la droite ne bouge plus.')],
      sym2: [t('La matrice S d\'une symétrie orthogonale d\'axe une droite vérifie S² = I.'), t('Vrai : appliquer deux fois la symétrie ramène chaque vecteur à sa place (S = 2P − I et P² = P donnent S² = 4P − 4P + I).')],
      rot: [t('La matrice R d\'une rotation de ℝ² vérifie R⁻¹ = Rᵀ.'), t('Vrai : Rᵀ = [[cos θ, sin θ], [−sin θ, cos θ]] est la rotation d\'angle −θ, qui défait R.')],
    }[which];
    return tfL({ skill: GEOM, key: which, truth: true, exam: tag, statement: T[0], explanation: T[1] });
  }
  const kind = rng.pick(['rot', 'proj', 'sym', 'aff']);
  if (kind === 'rot') {
    const th = rng.pick(THETA.filter((x) => x.s !== '0'));
    const alt = { ...th, c: th.s, s: th.c };
    return mcqDistinct({
      skill: GEOM, level: 4, key: `mcq:rot:${th.t}`, exam: tag, prompt: t('Quelle est la matrice de {r} ?', { r: rotR(th) }),
      right: ML(rotT(th)),
      wrongs: [{ html: ML(rotTT(th)), rule: 'l_rot_transpose' }, { html: ML(rotT(alt)), rule: null }, { html: ML(`[[${th.c},${th.s}],[${th.s},${negT(th.c)}]]`), rule: null }],
      fillers: [{ html: ML(`[[${negT(th.c)},${th.s}],[${negT(th.s)},${negT(th.c)}]]`) }],
      solution: [{ html: `R = [[cos θ, −sin θ], [sin θ, cos θ]] = ${ML(rotT(th))}`, note: `θ = ${th.t}` }],
    }, rng);
  }
  if (kind === 'proj' || kind === 'sym') {
    const p = projData(rng);
    const sym = kind === 'sym';
    // uuᵀ/‖u‖, written as such.
    const noSq = `(1/√${p.n2})·${MLm(p.uu)}`;
    const right = sym ? mt(p.S) : mt(p.P);
    return mcqDistinct({
      skill: GEOM, level: 4, key: `mcq:${kind}:${p.eq}`, exam: tag,
      prompt: sym ? t('Quelle est la matrice de la symétrie orthogonale d\'axe la droite {eq} ?', { eq: p.eq }) : t('Quelle est la matrice de la projection orthogonale sur la droite {eq} ?', { eq: p.eq }),
      right: ML(right),
      wrongs: sym
        ? [{ html: MLm(p.P), rule: null }, { html: `(2/√${p.n2})·${MLm(p.uu)} − I`, rule: 'g4_proj_no_square' }, { html: MLm(MX.scale(p.S, -1)), rule: null }]
        : [{ html: noSq, rule: 'g4_proj_no_square' }, { html: MLm(p.uu), rule: null }, { html: MLm(MX.sub(MX.identity(2), p.P)), rule: null }],
      fillers: [{ html: MLm(MX.transpose(MX.scale(p.uu, -1))) }],
      solution: [{ html: `u = ${vt(p.u.map((x) => q(x)))}, P = uuᵀ/(uᵀu) = ${MLm(p.P)}`, note: '' }, ...(sym ? [{ html: `S = 2P − I = ${MLm(p.S)}`, note: '' }] : [])],
    }, rng);
  }
  const d = affData(rng);
  const wrongInv = MX.mul(MX.mul(d.Pi, MX.diag([1, d.k])), d.P);
  const swapK = MX.mul(MX.mul(d.P, MX.diag([d.k, 1])), d.Pi);
  return mcqDistinct({
    skill: GEOM, level: 4, key: `mcq:aff:${mt(d.P)}:${qt(d.k)}`, exam: tag,
    prompt: t('Quelle est la matrice de l\'affinité d\'axe {axis}, de direction {dir} et de rapport {k} ?', { axis: d.axis, dir: d.dir, k: fq(d.k) }),
    right: MLm(d.M),
    wrongs: [{ html: MLm(wrongInv), rule: 'l_pdp_inverse_side' }, { html: MLm(swapK), rule: null }, { html: MLm(MX.diag([1, d.k])), rule: null }],
    fillers: [{ html: MLm(MX.transpose(d.M)) }],
    solution: [{ html: `P = ${MLm(d.P)}, M = P·diag(1, ${fq(d.k)})·P⁻¹ = ${MLm(d.M)}`, note: '' }], fallback: d.fallback,
  }, rng);
}

// ======================================================================
// l-mat-imt
// ======================================================================

const IMT = 'l-mat-imt';
const IMT_SUB = [
  { id: 'pivots', label: t('pivots'), skill: 'l-sys-pivots-theory' },
  { id: 'equiv', label: t('équivalence'), skill: IMT },
];

// Statements « always true? »: [statement, explanation, pivot hint].
const SQ_TRUE = [
  [t('Si A est n × n et que ses colonnes sont libres, alors Ax = b a une solution pour tout b ∈ ℝⁿ.'), t('Vrai : colonnes libres, c\'est n pivots. A est carrée, donc il y a aussi un pivot dans chaque ligne : Ax = b a une solution (unique) pour tout b.'), t('nombre de pivots = □ sur n colonnes et n lignes')],
  [t('Si A est 3 × 3 et que Ax = 0 a une infinité de solutions, alors les colonnes de A n\'engendrent pas ℝ³.'), t('Vrai : une infinité de solutions, c\'est une variable libre, donc moins de 3 pivots. Une ligne n\'a pas de pivot : les colonnes n\'engendrent pas ℝ³.'), t('nombre de pivots = □ sur 3')],
  [t('Si A est n × n et que x ↦ Ax est injective, alors x ↦ Ax est surjective.'), t('Vrai : injective, c\'est un pivot dans chaque colonne, donc n pivots ; A est carrée, donc un pivot dans chaque ligne : surjective.'), t('nombre de pivots = □ sur n')],
  [t('Si A est n × n et que Aᵀ est inversible, alors les lignes de A sont libres.'), t('Vrai : les lignes de A sont les colonnes de Aᵀ, qui sont libres puisque Aᵀ est inversible.'), t('Aᵀ inversible : ses □ sont libres')],
  [t('Si A et B sont n × n et que AB = I, alors BA = I.'), t('Vrai pour des matrices carrées : Bx = 0 donne x = ABx = 0, donc B est inversible (théorème), A = B⁻¹ et BA = I.'), 'Bx = 0 ⇒ x = □'],
  [t('Si A et B sont n × n et que AB est inversible, alors A est inversible.'), t('Vrai : avec C = (AB)⁻¹, A(BC) = I et A est carrée, donc A est inversible.'), 'A(BC) = □'],
  [t('Si A est n × n et a deux colonnes égales, alors A n\'est pas inversible.'), t('Vrai : deux colonnes égales sont liées, donc A n\'a pas n pivots.'), t('nombre de pivots < □')],
  [t('Si 0 est valeur propre de la matrice carrée A, alors A n\'est pas inversible.'), t('Vrai : Av = 0 avec v ≠ 0, donc Ax = 0 a une solution non nulle.'), t('Av = □ avec v ≠ 0')],
  [t('Si A est n × n et que Ax = b a une solution unique pour un certain b, alors A est inversible.'), t('Vrai : solution unique, donc aucune variable libre, donc n pivots ; A est carrée, donc inversible.'), t('nombre de pivots = □ sur n')],
];
const SINGULAR = [[[1, 2], [2, 4]], [[1, 1], [1, 1]], [[0, 0], [0, 0]], [[1, 0], [0, 0]], [[2, 1], [4, 2]]];
const SQ_FALSE = [
  (rng) => {
    const A = rng.pick(SINGULAR);
    return {
      statement: t('Si A est n × n et que Ax = b a une solution pour un certain b, alors A est inversible.'),
      counter: { kind: 'matOne', params: { want: 'singular' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(MX.mat(A)) } },
      explanation: t('Faux : avec b = 0, Ax = b a toujours la solution x = 0. Une matrice non inversible comme {A} convient.', { A: MLm(MX.mat(A)) }),
      hint: t('avec b = □, il y a toujours une solution'),
    };
  },
  (rng) => {
    const A = rng.pick([[[1, 0], [0, 1]], [[1, 1], [0, 1]], [[2, 1], [1, 1]]]);
    const B = MX.scale(MX.mat(A), -1);
    return {
      statement: t('Si A et B sont des matrices n × n inversibles, alors A + B est inversible.'),
      counter: pairCounter('A,B inv⇒A+B inv', [A, B.map((r) => r.map((x) => x.valueOf()))]),
      explanation: t('Faux : A = {A} et B = −A sont inversibles, mais A + B = 0 ne l\'est pas.', { A: MLm(MX.mat(A)) }),
      hint: t('essaie B = □A'),
    };
  },
  (rng) => {
    const pr = rng.pick(INV_PAIRS);
    return {
      statement: t('Si S et T sont des applications linéaires inversibles de ℝⁿ dans ℝⁿ, de matrices canoniques A et B, alors B⁻¹A⁻¹ est la matrice canonique de (T ∘ S)⁻¹.'),
      counter: pairCounter('(AB)^-1=A^-1B^-1', pr), ruleIfTrue: 'l_inv_product_order',
      explanation: t('Faux : T ∘ S a pour matrice BA (S d\'abord, donc A à droite), et (BA)⁻¹ = A⁻¹B⁻¹, qui diffère de B⁻¹A⁻¹ si A et B ne commutent pas : A = {A}, B = {B}.', { A: MLm(MX.mat(pr[0])), B: MLm(MX.mat(pr[1])) }),
      hint: t('la matrice de T ∘ S est □'),
    };
  },
  (rng) => {
    const A = rng.pick(SINGULAR.slice(0, 2).concat([[[1, 2], [1, 2]]]));
    return {
      statement: t('Si A est n × n et qu\'aucune colonne de A n\'est nulle, alors A est inversible.'),
      counter: { kind: 'matOne', params: { want: 'singular' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(MX.mat(A)) } },
      explanation: t('Faux : {A} a des colonnes non nulles mais liées : un seul pivot.', { A: MLm(MX.mat(A)) }),
      hint: t('des colonnes non nulles peuvent être □'),
    };
  },
];
// Statements on m × n matrices (m ≠ n allowed): false, with sizes for a counter-example.
const NS_FALSE = [
  [t('Si A est m × n et que ses colonnes sont libres, alors A est inversible.'), ['r=n', 'm>n'], t('Seule une matrice carrée peut être inversible')],
  [t('Si A est m × n et que ses colonnes sont libres, alors Ax = b a une solution pour tout b ∈ ℝᵐ.'), ['r=n', 'm>n'], t('Colonnes libres : n pivots, mais il en faudrait m pour avoir une solution pour tout b')],
  [t('Si A est m × n et que Ax = b a une solution pour tout b ∈ ℝᵐ, alors Ax = 0 n\'a que la solution nulle.'), ['r=m', 'n>m'], t('Un pivot par ligne, c\'est m pivots ; avec n > m colonnes, il reste des variables libres')],
  [t('Si A est m × n et que x ↦ Ax est injective, alors x ↦ Ax est surjective.'), ['r=n', 'm>n'], t('Injective : n pivots ; surjective demande m pivots')],
  [t('Si les colonnes d\'une matrice A de taille m × n engendrent ℝᵐ, alors elles sont libres.'), ['r=m', 'n>m'], t('Engendrer ℝᵐ : m pivots ; libres demande n pivots')],
  [t('Si A est m × n avec un pivot dans chaque ligne, alors x ↦ Ax est injective.'), ['r=m', 'n>m'], t('Un pivot par ligne donne la surjectivité ; l\'injectivité demande un pivot par colonne'), 'l_inj_rows'],
];
const exampleOf = (m, n) => MX.mat(Array.from({ length: m }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))));
// Sizes m ≠ n: true statements read on the pivots. [French statement (it
// makes the key), statement shown, explanation].
const SUP = '⁰¹²³⁴⁵⁶';
const NS_TRUE = [
  (m, n) => (m < n ? [`Si A est ${m} × ${n}, alors Ax = 0 a une infinité de solutions.`, t('Si A est {m} × {n}, alors Ax = 0 a une infinité de solutions.', { m, n }), tn(n - m, 'Vrai : au plus {m} pivots pour {c} colonnes, donc au moins {n} variable libre.', 'Vrai : au plus {m} pivots pour {c} colonnes, donc au moins {n} variables libres.', { m, c: n })] : null),
  (m, n) => (m < n ? [`Si A est ${m} × ${n}, alors x ↦ Ax n'est pas injective.`, t('Si A est {m} × {n}, alors x ↦ Ax n\'est pas injective.', { m, n }), t('Vrai : au plus {m} pivots pour {n} colonnes : une colonne n\'a pas de pivot.', { m, n })] : null),
  (m, n) => (m > n ? [`Si A est ${m} × ${n}, alors x ↦ Ax n'est pas surjective.`, t('Si A est {m} × {n}, alors x ↦ Ax n\'est pas surjective.', { m, n }), t('Vrai : au plus {n} pivots pour {m} lignes : une ligne n\'a pas de pivot.', { m, n })] : null),
  (m, n) => (m > n ? [`Si A est ${m} × ${n}, alors ses colonnes n'engendrent pas ℝ${SUP[m]}.`, t('Si A est {m} × {n}, alors ses colonnes n\'engendrent pas {R}.', { m, n, R: `ℝ${SUP[m]}` }), t('Vrai : {n} vecteurs ne peuvent pas engendrer {R}, il faut au moins {m} pivots.', { m, n, R: `ℝ${SUP[m]}` })] : null),
  (m, n) => (m !== n ? [`Une matrice ${m} × ${n} n'est jamais inversible.`, t('Une matrice {m} × {n} n\'est jamais inversible.', { m, n }), t('Vrai : seule une matrice carrée peut avoir un inverse des deux côtés.')] : null),
];
const IMT_HINT1 = t('La matrice est-elle carrée ? Sinon, le théorème de la matrice inversible ne s\'applique pas : compte les pivots par ligne et par colonne.');

function imtTf(level, rng, kind, exam) {
  const base = { skill: IMT, level, exam: exam ? examTag({ exam }) : false, noHints: level === 5 || !!exam };
  const hints = (h2, expl) => [{ level: 1, html: IMT_HINT1 }, { level: 2, html: h2 }, { level: 3, html: expl }];
  const sg = { subgoals: IMT_SUB };
  if (kind === 'sqTrue') {
    const k = rng.int(0, SQ_TRUE.length - 1);
    const [st, ex, h] = SQ_TRUE[k];
    return { ...tfL({ ...base, key: `sq:${k}`, truth: true, statement: st, explanation: ex, hints: hints(h, ex) }), ...sg };
  }
  if (kind === 'sqFalse') {
    const k = rng.int(0, SQ_FALSE.length - 1);
    const f = SQ_FALSE[k](rng);
    return { ...tfL({ ...base, key: `sqf:${k}:${f.counter.answer.A}`, truth: false, statement: f.statement, counter: f.counter, explanation: f.explanation, ruleIfTrue: f.ruleIfTrue || null, hints: hints(f.hint, f.explanation) }), ...sg };
  }
  if (kind === 'nsFalse') {
    const k = rng.int(0, NS_FALSE.length - 1);
    const [st, conds, why, rule] = NS_FALSE[k];
    const [m, n] = conds[1] === 'm>n' ? rng.pick([[3, 2], [4, 3], [4, 2]]) : rng.pick([[2, 3], [3, 4], [2, 4]]);
    const r = Math.min(m, n);
    const ex = t('Faux si A n\'est pas carrée. {why}. Par exemple A = {A}, de taille {m} × {n} et de rang {r}.', { why, A: MLm(exampleOf(m, n)), m, n, r });
    const cnd = conds.map((c) => c.replace(/r=/g, 'r = ').replace(/>/g, ' > '));
    return {
      ...tfL({
        ...base, key: `ns:${k}:${m}${n}`, truth: false, statement: st, explanation: ex, ruleIfTrue: rule || 'l_imt_nonsquare',
        counter: { kind: 'dims', params: { conds }, ask: [{ v: 'm', label: 'm =' }, { v: 'n', label: 'n =' }, { v: 'r', label: t('rang r =') }], answer: { m: String(m), n: String(n), r: String(r) } },
        hints: hints(t('nombre de pivots ≤ min(m, n) ; ici, il faudrait {a} et {b}', { a: cnd[0], b: cnd[1] }), ex),
      }),
      ...sg,
    };
  }
  // nsTrue
  for (;;) {
    const [m, n] = rng.pick([[2, 3], [3, 5], [3, 4], [4, 3], [5, 3], [4, 2], [2, 4]]);
    const f = rng.pick(NS_TRUE)(m, n);
    if (!f) continue;
    return { ...tfL({ ...base, key: `nst:${f[0]}`, truth: true, statement: f[1], explanation: f[2], ruleIfFalse: null, hints: hints(t('nombre de pivots ≤ min({m}, {n}) = {r}', { m, n, r: Math.min(m, n) }), f[2]) }), ...sg };
  }
}

const EQUIV = ['A a n pivots', 'Ax = 0 n\'a que la solution x = 0', 'Les colonnes de A sont libres', 'Les colonnes de A engendrent ℝⁿ', 'x ↦ Ax est injective', 'x ↦ Ax est surjective', 'Aᵀ est inversible', 'det A ≠ 0', '0 n\'est pas valeur propre de A', 'Ax = b a une solution unique pour tout b', 'Les lignes de A sont libres'];
const NOT_EQUIV = ['A n\'a aucun coefficient nul', 'A est symétrique', 'det A = 1', 'A est diagonale', 'Ax = b a une solution pour un certain b', 'Aucune colonne de A n\'est nulle', 'A ≠ 0', 'La diagonale de A n\'a pas de 0', 'A² = A'];

function imtMcq(level, rng, exam) {
  const not = exam === 'mcq';
  const right = rng.pick(not ? NOT_EQUIV : EQUIV);
  // EQUIV and NOT_EQUIV stay French: the key is built from them.
  const wrongs = rng.shuffle([...(not ? EQUIV : NOT_EQUIV)]).slice(0, 3).map((html) => ({ html: t(html), rule: null }));
  return {
    ...mcqDistinct({
      skill: IMT, level, key: `mcq:${not ? 'not' : 'eq'}:${right}`, exam: exam ? examTag({ exam }) : false,
      prompt: not
        ? t('A est une matrice carrée n × n. Lequel de ces énoncés <b>n\'est pas</b> équivalent à « A est inversible » ?')
        : t('A est une matrice carrée n × n. Lequel de ces énoncés est équivalent à « A est inversible » ?'),
      right: t(right), wrongs,
      solution: [{ html: not ? t('« {s} » ne suffit pas : une matrice peut le vérifier sans être inversible (ou être inversible sans le vérifier).', { s: t(right) }) : t('« {s} » fait partie du théorème de la matrice inversible.', { s: t(right) }), note: '' }],
    }, rng),
    subgoals: IMT_SUB,
  };
}

function imtItem(level, rng) {
  if (level === 1) return imtMcq(1, rng);
  if (level === 2) return imtTf(2, rng, rng.pick(['sqTrue', 'sqTrue', 'sqFalse']));
  if (level === 3) return imtTf(3, rng, rng.pick(['nsFalse', 'nsFalse', 'nsTrue']));
  if (level === 4) return imtTf(4, rng, rng.pick(['sqFalse', 'nsFalse']));
  return imtTf(5, rng, rng.pick(['sqTrue', 'sqFalse', 'nsFalse', 'nsTrue']));
}

function imtExam(rng, exam) {
  if (exam === 'mcq') return imtMcq(4, rng, exam);
  return imtTf(4, rng, rng.pick(['sqTrue', 'sqFalse', 'sqFalse', 'nsFalse', 'nsTrue']), exam);
}

// ======================================================================
// l-mat-elementary
// ======================================================================

const ELEM = 'l-mat-elementary';
const ELEM_SUB = [
  { id: 'elim', label: t('éliminer'), skill: ECH },
  { id: 'writeE', label: t('écrire E'), skill: ELEM },
];

// The operation that undoes op.
const undo = (op) => (op.kind === 'add' ? { ...op, k: op.k.neg() } : op.kind === 'scale' ? { ...op, k: q(1).div(op.k) } : op);
const elemOf = (n, op) => MX.applyOp(MX.identity(n), op);
const opWords = (op) => (op.kind === 'add' ? t('ajouter {k} fois la ligne {j} à la ligne {i}', { k: parR(op.k), j: op.j + 1, i: op.i + 1 }) : op.kind === 'scale' ? t('multiplier la ligne {i} par {k}', { i: op.i + 1, k: parR(op.k) }) : t('échanger les lignes {i} et {j}', { i: op.i + 1, j: op.j + 1 }));

// One operation on n rows: Lᵢ ← Lᵢ + kLⱼ (k ∈ {±1, ±2, ±3}), Lᵢ ← kLᵢ or a swap.
function randOp(n, rng, kinds = ['add', 'add', 'scale', 'swap']) {
  const kind = rng.pick(kinds);
  const i = rng.int(0, n - 1);
  let j = rng.int(0, n - 1);
  if (j === i) j = (i + 1) % n;
  if (kind === 'add') return { kind, i, j, k: q(rng.pick([1, -1, 2, -2, 3, -3])) };
  if (kind === 'scale') return { kind, i, k: rng.pick([q(2), q(3), q(-1), q(1, 2), q(-2), q(1, 3)]) };
  return { kind: 'swap', i: Math.min(i, j), j: Math.max(i, j) };
}

// A 2 × 2 whole, det ±1 or ±2, reduced to I by 3 or 4 operations (no swap).
function decompData(rng) {
  for (let tries = 0; tries < 200; tries++) {
    const A = randM(2, 2, rng, -4, 4);
    const det = MX.det(A).valueOf();
    if (![1, -1, 2, -2].includes(det) || A.flat().some((x) => x.n === 0) || Math.abs(A[0][0].valueOf()) !== 1) continue;
    const { ops } = MX.rref(A);
    if (ops.length < 3 || ops.length > 4 || ops.some((op) => op.kind === 'swap' || op.k.d > 2)) continue;
    const Es = ops.map((op) => elemOf(2, op));
    const Eis = ops.map((op) => elemOf(2, undo(op)));
    return { A, Ai: MX.inverse(A), ops, Es, Eis };
  }
  const A = MX.mat([[1, 2], [3, 4]]);
  const ops = MX.rref(A).ops;
  return { A, Ai: MX.inverse(A), ops, Es: ops.map((op) => elemOf(2, op)), Eis: ops.map((op) => elemOf(2, undo(op))), fallback: true };
}

const eName = (k) => `E${sub(k + 1)}`;

function elemItem(level, rng) {
  if (level <= 2) {
    const n = 3;
    const op = randOp(n, rng, level === 1 ? ['add', 'add', 'scale'] : ['add', 'add', 'scale', 'swap']);
    const E = elemOf(n, op);
    const Ei = elemOf(n, undo(op));
    const changed = op.kind === 'swap' ? [op.i, op.j] : [op.i];
    const invSeg = { start: 'E^(-1)', judge: { kind: 'mat', expect: mt(Ei), about: { elementary: mt(E) } } };
    const invLine = withCells({ kind: 'eq', math: mt(Ei), note: t('E⁻¹ fait l\'opération contraire : {op}', { op: opR(undo(op)) }), subgoal: 'writeE' }, pickCells(Ei, changed, level === 1 ? 2 : 3, rng));
    const hints = [
      { level: 1, html: t('Fais l\'opération sur I pour obtenir E ; E⁻¹ fait l\'opération contraire.') },
      { level: 2, html: t('E⁻¹ fait {op} : {row} en ligne {i}', { op: opR(undo(op)), row: rowHoles(Ei, changed[0]), i: changed[0] + 1 }) },
      { level: 3, html: `E⁻¹ = ${MLm(Ei)}` },
    ];
    if (level === 1) {
      return matLines({
        skill: ELEM, level, prompt: t('E est la matrice élémentaire 3 × 3 de l\'opération {op}. Écris E, puis E⁻¹.', { op: opR(op) }),
        start: 'E', judge: { kind: 'mat', expect: mt(E) }, mode: 'guided',
        script: [
          withCells({ kind: 'eq', math: mt(E), note: t('I₃ après {op}', { op: opR(op) }), subgoal: 'writeE' }, pickCells(E, changed, 2, rng)),
          { kind: 'segment', html: t('Écris E⁻¹.'), start: { math: invSeg.start }, judge: invSeg.judge },
          invLine,
        ],
        hints, subgoals: ELEM_SUB, key: `${ELEM}:op:${mt(E)}`,
      });
    }
    // Level 2: E is given; which operation does it do?
    const other = op.kind === 'add' ? { ...op, i: op.j, j: op.i } : op.kind === 'scale' ? { kind: 'scale', i: (op.i + 1) % n, k: op.k } : { kind: 'swap', i: [0, 1, 2].find((x) => x !== op.i && x !== op.j), j: op.j };
    const opts = [
      { id: 'ok', label: opR(op), valid: true },
      op.kind !== 'swap' ? { id: 'inv', label: opR(undo(op)), valid: false, rule: 'l_elementary_inverse', why: t('Ça, c\'est l\'opération de E⁻¹. E est I après {op} : regarde la case qui a changé.', { op: opR(op) }) } : null,
      { id: 'other', label: opR(other), valid: false, why: t('Compare E à I : la ligne qui change est celle de l\'opération, et le coefficient hors diagonale dit quelle ligne on ajoute.') },
    ].filter(Boolean);
    return matLines({
      skill: ELEM, level, prompt: t('E = {E} est une matrice élémentaire. Quelle opération fait-elle ? Écris ensuite E⁻¹.', { E: MLm(E) }),
      start: invSeg.start, judge: invSeg.judge, mode: 'guided',
      script: [{ kind: 'decision', prompt: t('Quelle opération E fait-elle sur les lignes ?'), options: rng.shuffle(opts) }, invLine],
      hints, subgoals: ELEM_SUB, key: `${ELEM}:read:${mt(E)}`,
    });
  }
  if (level === 5 && rng.chance(0.5)) return elemTf(5, rng);
  // Levels 3–5: decompose a 2 × 2.
  const d = decompData(rng);
  const kk = d.ops.length;
  const names = Object.fromEntries(d.Es.map((E, k) => [`E_${k + 1}`, mt(E)]));
  const useNames = level === 4;
  const segs = [];
  d.ops.forEach((op, k) => {
    const menu = rng.shuffle([
      { id: 'ok', label: opR(op), valid: true },
      op.kind === 'add' ? { id: 'sign', label: opR(undo(op)), valid: false, rule: 'l_rowop_sign', why: t('Avec ce signe, la case ne s\'annule pas.') } : { id: 'inv', label: opR(undo(op)), valid: false, why: t('Ce facteur n\'amène pas le pivot à 1.') },
      { id: 'swap', label: 'L₁ ↔ L₂', valid: false, why: t('Le pivot n\'est pas nul : pas besoin d\'échanger.') },
    ]);
    segs.push({
      html: t('{E} : la matrice de l\'opération {k}.', { E: eName(k), k: k + 1 }), start: `E_${k + 1}`, judge: { kind: 'mat', expect: mt(d.Es[k]), menu },
      lines: [{ kind: 'eq', math: mt(d.Es[k]), note: t('{op} appliquée à I', { op: opR(op) }), subgoal: op.kind === 'add' && op.i > op.j ? 'elim' : 'writeE' }],
    });
  });
  const order = [...Array(kk).keys()];
  const prodInv = order.slice().reverse().map((k) => (useNames ? `E_${k + 1}` : mt(d.Es[k]))).join('·');
  const prodA = order.map((k) => (useNames ? `E_${k + 1}^(-1)` : mt(d.Eis[k]))).join('·');
  const invR = order.slice().reverse().map(eName).join('');
  const aR = order.map((k) => `${eName(k)}⁻¹`).join('');
  segs.push({
    html: `A⁻¹ = ${invR}.`, start: 'A^(-1)',
    judge: { kind: 'mat', expect: mt(d.Ai), about: { compose: d.Es.map((E) => mt(E)) }, ...(useNames ? { names } : {}),
      menu: rng.shuffle([{ id: 'ok', label: `A⁻¹ = ${invR}`, valid: true }, { id: 'rev', label: `A⁻¹ = ${order.map(eName).join('')}`, valid: false, rule: 'l_compose_order', why: t('{E} est faite en premier : elle est à droite.', { E: eName(0) }) }]) },
    lines: [{ kind: 'eq', math: prodInv, note: `${invR}·A = I`, subgoal: 'writeE' }, { kind: 'eq', math: mt(d.Ai), note: '', subgoal: 'writeE' }],
  });
  segs.push({
    html: `A = ${aR}.`, start: 'A',
    judge: { kind: 'mat', expect: mt(d.A), about: { compose: d.Eis.slice().reverse().map((E) => mt(E)) }, ...(useNames ? { names } : {}),
      menu: rng.shuffle([{ id: 'ok', label: `A = ${aR}`, valid: true }, { id: 'rev', label: `A = ${order.slice().reverse().map((k) => `${eName(k)}⁻¹`).join('')}`, valid: false, rule: 'l_compose_order', why: t('A = (E_k⋯E₁)⁻¹ : l\'inverse d\'un produit renverse l\'ordre.') }]) },
    lines: [{ kind: 'eq', math: prodA, note: `(${invR})⁻¹ = ${aR}`, subgoal: 'writeE' }, { kind: 'eq', math: mt(d.A), note: '', subgoal: 'writeE' }],
  });
  const script = [];
  segs.forEach((s, k) => {
    const judge = level === 3 ? s.judge : (({ menu, ...rest }) => rest)(s.judge);
    if (k > 0) script.push({ kind: 'segment', html: s.html, start: { math: s.start }, judge });
    script.push(...s.lines);
  });
  const first = level === 3 ? segs[0].judge : (({ menu, ...rest }) => rest)(segs[0].judge);
  return matLines({
    skill: ELEM, level,
    prompt: level === 3
      ? t('Réduis A = {A} à I sans échange, en {k} opérations : choisis chaque opération et écris sa matrice élémentaire {Es}. Puis écris A⁻¹ et A comme produits de matrices élémentaires.', { A: MLm(d.A), k: kk, Es: order.map(eName).join(', ') })
      : t('On réduit A = {A} à I par {ops}. Écris {Es}, puis A⁻¹ et A comme produits de matrices élémentaires.', { A: MLm(d.A), ops: d.ops.map((op, k) => `${eName(k)} : ${opR(op)}`).join(', '), Es: order.map(eName).join(', ') }),
    start: segs[0].start, judge: first, mode: level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'menu' : null, script,
    hints: level === 5 ? [] : [
      { level: 1, html: t('Fais chaque opération sur I pour obtenir Eₖ. Si {inv}·A = I, alors A⁻¹ = {inv} et A = {a}.', { inv: invR, a: aR }) },
      { level: 2, html: t('{E}⁻¹ = {row} en ligne {i}', { E: eName(0), row: rowHoles(d.Eis[0], d.ops[0].i), i: d.ops[0].i + 1 }) },
      { level: 3, html: `A⁻¹ = ${MLm(d.Ai)}` },
    ],
    subgoals: ELEM_SUB, key: `${ELEM}:dec:${mt(d.A)}`, fallback: d.fallback,
  });
}

const ELEM_PAIRS = [[[[1, 1], [0, 1]], [[1, 0], [1, 1]]], [[[1, 2], [0, 1]], [[1, 0], [-1, 1]]], [[[0, 1], [1, 0]], [[1, 1], [0, 1]]], [[[2, 0], [0, 1]], [[1, 0], [3, 1]]]];
const REL_PAIRS = [[[[1, 2], [2, 4]], [[2, 4], [1, 2]]], [[[1, -1], [2, -2]], [[2, -2], [1, -1]]], [[[1, 3], [3, 9]], [[1, 3], [0, 0]]]];

function elemTf(level, rng, exam) {
  const base = { skill: ELEM, level, exam: exam ? examTag({ exam }) : false, noHints: level === 5 || !!exam };
  const which = rng.pick(['prod', 'rows', 'inv', 'cols']);
  if (which === 'prod') {
    const pr = rng.pick(ELEM_PAIRS);
    return tfL({
      ...base, key: `prod:${mt(MX.mat(pr[0]))}`, truth: false,
      statement: t('Le produit de deux matrices élémentaires de même taille est une matrice élémentaire.'),
      counter: pairCounter('elemProduct', pr),
      explanation: t('Faux : {A}·{B} = {C} fait deux opérations à la fois.', { A: MLm(MX.mat(pr[0])), B: MLm(MX.mat(pr[1])), C: MLm(MX.mul(MX.mat(pr[0]), MX.mat(pr[1]))) }),
    });
  }
  if (which === 'rows') {
    const [A, B] = rng.pick(REL_PAIRS);
    return tfL({
      ...base, key: `rows:${mt(MX.mat(A))}`, truth: false,
      statement: t('Si E₁, E₂, E₃ sont des matrices élémentaires, les lignes de E₃E₂E₁A sont reliées par les mêmes relations de dépendance que les lignes de A.'),
      counter: { kind: 'matOne', params: { want: 'rowRelations' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }, { v: 'B', label: 'B = EA =', shape: [2, 2] }], answer: { A: mt(MX.mat(A)), B: mt(MX.mat(B)) } },
      explanation: t('Faux : les opérations sur les lignes mélangent les lignes. Avec A = {A} et B = {B}, obtenue par une opération, les relations entre lignes changent. Ce sont les <b>colonnes</b> qui gardent leurs relations.', { A: MLm(MX.mat(A)), B: MLm(MX.mat(B)) }),
    });
  }
  const T = {
    inv: [t('Toute matrice élémentaire est inversible, et son inverse est une matrice élémentaire.'), t('Vrai : l\'inverse de E fait l\'opération contraire, qui est aussi une seule opération élémentaire.')],
    cols: [t('Si E est une matrice élémentaire, les colonnes de EA sont reliées par les mêmes relations de dépendance que les colonnes de A.'), t('Vrai : Ax = 0 ⇔ EAx = 0 puisque E est inversible ; les relations entre colonnes sont les solutions de Ax = 0.')],
  }[which];
  return tfL({ ...base, key: which, truth: true, statement: T[0], explanation: T[1] });
}

function elemExam(rng, exam) {
  if (exam === 'tf') return elemTf(4, rng, exam);
  const op = randOp(3, rng, ['add']);
  const E = elemOf(3, op);
  const Ei = elemOf(3, undo(op));
  return mcqDistinct({
    skill: ELEM, level: 4, key: `mcq:${mt(E)}`, exam: examTag({ exam }),
    prompt: t('E = {E} est la matrice élémentaire de {op}. Que vaut E⁻¹ ?', { E: MLm(E), op: opR(op) }),
    right: MLm(Ei),
    wrongs: [{ html: MLm(E), rule: 'l_elementary_inverse' }, { html: MLm(MX.transpose(E)), rule: null }, { html: MLm(MX.transpose(Ei)), rule: null }],
    solution: [{ html: t('E⁻¹ fait {op} : E⁻¹ = {E}', { op: opR(undo(op)), E: MLm(Ei) }), note: t('Contrôle : E·E⁻¹ = I') }],
  }, rng);
}

// ======================================================================
// l-mat-lu
// ======================================================================

const LU = 'l-mat-lu';
const LU_SUB = [
  { id: 'elim', label: t('éliminer'), skill: ECH },
  { id: 'noteL', label: t('noter ℓ'), skill: LU },
  { id: 'assemble', label: t('assembler'), skill: LU },
  { id: 'solve', label: t('résoudre Ly = b'), skill: LU },
];

// A = LU (luPair), the elimination Lᵢ ← Lᵢ − ℓᵢⱼLⱼ column by column.
function luData(rng, { n = 3, fracL = false, far: needFar = false } = {}) {
  for (let tries = 0; tries < 200; tries++) {
    const { L, U, A, fallback } = luPair(n, rng, { fracL });
    if (fallback) continue;
    const ls = [];
    for (let c = 0; c < n - 1; c++) for (let i = c + 1; i < n; i++) if (L[i][c].n !== 0) ls.push([i, c]);
    if (ls.length < n - 1) continue;
    const ops = ls.map(([i, c]) => ({ kind: 'add', i, j: c, k: L[i][c].neg() }));
    const steps = [];
    let X = A;
    for (const op of ops) { X = MX.applyOp(X, op); steps.push(X); }
    if (!MX.equal(X, U) || steps.some((S) => maxAbs(S) > 15)) continue;
    const lu = MX.lu(A);
    if (!lu || !MX.equal(lu.L, L)) continue;
    // The asked ℓ: not next to the diagonal when possible (l_lu_inverse differs).
    const far = ls.filter(([i, c]) => i > c + 1);
    const frac = ls.filter(([i, c]) => L[i][c].d > 1 && (!needFar || i > c + 1));
    if (needFar && !far.length) continue;
    if (needFar && fracL && !frac.length) continue;
    const [i, j] = rng.pick(frac.length ? frac : far.length && (needFar || rng.chance(0.6)) ? far : ls);
    if (needFar && [L[i][j].neg(), L[i][j]].some((x) => MX.inverse(L)[i][j].eq(x))) continue;
    return { L, U, A, ops, n, i, j };
  }
  const L = MX.mat([[1, 0, 0], [2, 1, 0], [-1, 3, 1]]);
  const U = MX.mat([[2, 1, -1], [0, -1, 2], [0, 0, 3]]);
  const A = MX.mul(L, U);
  return { L, U, A, ops: [[1, 0], [2, 0], [2, 1]].map(([i, c]) => ({ kind: 'add', i, j: c, k: L[i][c].neg() })), n: 3, i: 2, j: 1, fallback: true };
}

const lName = (i, j) => `ℓ${ij(i, j)}`;
const luCfg = (d) => ({ kind: 'factor', A: mt(d.A), of: 'LU' });

function luItem(level, rng) {
  if (level === 5) return luCoef(rng, { level: 5 });
  const d = luData(rng);
  const lines = opLines(d.A, d.ops, { note: (op) => `${opR(op)} : ${lName(op.i, op.j)} = ${fq(op.k.neg())}`, subgoal: 'elim' });
  const judge = { kind: 'rowops', goal: 'echelon', lowerOnly: true, multi: level >= 4 };
  const below = [];
  for (let i = 1; i < d.n; i++) for (let j = 0; j < i; j++) below.push([i, j]);
  const factorSeg = { kind: 'segment', html: t('Écris L et U.'), start: { math: 'LU' }, judge: luCfg(d) };
  const Lline = { kind: 'eq', math: `L = ${mt(d.L)}`, note: t('Sous la diagonale, les multiplicateurs ℓᵢⱼ'), subgoal: 'noteL' };
  const Uline = { kind: 'eq', math: `U = ${mt(d.U)}`, note: t('La forme échelonnée obtenue'), subgoal: 'assemble' };
  const both = { kind: 'eq', math: `L = ${mt(d.L)} ; U = ${mt(d.U)}`, note: t('L : les multiplicateurs ; U : la forme échelonnée'), subgoal: 'assemble' };
  const first = d.ops[0];
  const hints = [
    { level: 1, html: t('ℓᵢⱼ est le nombre k de Lᵢ ← Lᵢ − kLⱼ, avec son signe : on le range en ligne i, colonne j de L.') },
    { level: 2, html: `L${sub(first.i + 1)} ← L${sub(first.i + 1)} − □L${sub(first.j + 1)}, ${lName(first.i, first.j)} = □` },
    { level: 3, html: `${ML(lines[0].math)} ; ${lName(first.i, first.j)} = ${fq(first.k.neg())}` },
  ];
  const key = `${LU}:${mt(d.A)}`;
  const base = { skill: LU, level, start: mt(d.A), judge, hints, subgoals: LU_SUB, key, fallback: d.fallback };
  if (level <= 2) {
    const script = lines.map((l) => withCells(l, pickCells(l.result, [l.op.i], 2, rng)));
    script.push(factorSeg);
    if (level === 2) {
      const op = rng.pick(d.ops);
      const k = op.k.neg();
      const cands = [
        { id: 'ok', label: fq(k), valid: true },
        { id: 'neg', label: fq(k.neg()), valid: false, rule: 'l_lu_sign', why: t('On retranche {k} fois la ligne {j} : ℓ = {v}, avec ce signe.', { k: parR(k), j: op.j + 1, v: fq(k) }) },
        { id: 'inv', label: fq(q(1).div(k)), valid: false, why: t('ℓᵢⱼ est le multiplicateur lui-même, pas son inverse.') },
        { id: 'neginv', label: fq(q(1).div(k).neg()), valid: false, why: t('ℓᵢⱼ est le multiplicateur lui-même, avec son signe.') },
      ];
      const options = cands.filter((o, idx) => cands.findIndex((x) => x.label === o.label) === idx).slice(0, 3);
      script.push({ kind: 'decision', prompt: t('On a fait {op}. Que vaut {l} ?', { op: opR({ ...op }), l: lName(op.i, op.j) }), options: rng.shuffle(options) });
    }
    script.push(withCells(Lline, below.slice(0, level === 1 ? below.length : below.length)), withCells(Uline, pickCells(d.U, [0, 1, 2], level === 1 ? 2 : 3, rng).filter(([r, c]) => c >= r)));
    return matLines({ ...base, prompt: t('Factorise A = {A} en A = LU : échelonne sans échange, en notant chaque multiplicateur ℓᵢⱼ.', { A: MLm(d.A) }), mode: 'guided', script });
  }
  const script = [...lines, factorSeg, both];
  let prompt = level === 3
    ? t('Factorise A = {A} en A = LU : choisis chaque opération Lᵢ ← Lᵢ − kLⱼ (j < i), puis écris la matrice. Écris ensuite L et U.', { A: MLm(d.A) })
    : t('Factorise A = {A} en A = LU. Écris ensuite L et U.', { A: MLm(d.A) });
  if (level === 4 && rng.chance(0.5)) {
    const x = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)].map((v) => q(v));
    const y = MX.matVec(d.U, x);
    const b = MX.matVec(d.A, x);
    script.push(
      { kind: 'segment', html: t('Résous Ax = b avec b = {b} : d\'abord Ly = b.', { b: vt(b).replace(/-/g, '−') }), start: { math: 'y' }, judge: { kind: 'mat', expect: vt(y) } },
      { kind: 'eq', math: vt(y), note: t('Ly = b, de haut en bas'), subgoal: 'solve' },
      { kind: 'segment', html: t('Puis Ux = y.'), start: { math: 'x' }, judge: { kind: 'mat', expect: vt(x) } },
      { kind: 'eq', math: vt(x), note: t('Ux = y, de bas en haut'), subgoal: 'solve' },
    );
    prompt = t('Factorise A = {A} en A = LU, puis résous Ax = b avec b = {b} par Ly = b et Ux = y.', { A: MLm(d.A), b: vt(b).replace(/-/g, '−') });
  }
  return matLines({ ...base, prompt, mode: level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'rowops' : null, script });
}

// « ℓᵢⱼ = ? » (level 5 and exam variants): 4 × 4 with a fractional ℓ, or 3 × 3.
function luCoef(rng, { level = 4, exam = null, n = 4 } = {}) {
  const d = luData(rng, { n, fracL: n === 4, far: exam === 'mcq' });
  const right = d.L[d.i][d.j];
  const prompt = t('On factorise A = {A} en A = LU sans échange (L unitriangulaire inférieure). Que vaut {l} ?', { A: MLm(d.A), l: lName(d.i, d.j) });
  const solution = [{ html: `L = ${MLm(d.L)}`, note: t('Les multiplicateurs de l\'élimination') }, { html: `U = ${MLm(d.U)}`, note: '' }];
  const traps = [{ rule: 'l_lu_sign' }, { rule: 'l_lu_inverse' }, { rule: 'l_coef_index_swap' }];
  if (exam !== 'mcq') {
    return coefItem({
      skill: LU, level, prompt, label: `l_${d.i + 1}${d.j + 1}`, value: qt(right), key: `${mt(d.A)}:${d.i}${d.j}`, exam: exam ? examTag({ exam }) : false,
      askCoef: { label: lName(d.i, d.j), path: [d.i, d.j], factor: 'L' }, traps, subgoals: LU_SUB, solution, fallback: d.fallback,
    });
  }
  const Li = MX.inverse(d.L);
  return mcqDistinct({
    skill: LU, level: 4, key: `mcq:${mt(d.A)}:${d.i}${d.j}`, exam: examTag({ exam }), prompt, right: fq(right),
    wrongs: [{ html: fq(right.neg()), rule: 'l_lu_sign' }, { html: fq(Li[d.i][d.j]), rule: 'l_lu_inverse' }, { html: fq(Li[d.i][d.j].neg()), rule: 'l_lu_inverse' }, { html: fq(d.U[d.j][d.i]), rule: 'l_coef_index_swap' }],
    fillers: [{ html: fq(right.add(1)) }, { html: fq(q(1).div(right)) }, { html: fq(right.mul(2)) }],
    solution, fallback: d.fallback,
  }, rng);
}

const NOT_LU = ['[[0,1],[1,0]]', '[[0,2],[1,1]]', '[[0,1],[1,1]]', '[[0,1,0],[1,0,0],[0,0,1]]'];

function luExam(rng, exam) {
  if (exam === 'coef') return luCoef(rng, { exam, n: rng.pick([3, 4]) });
  if (exam === 'mcq') return luCoef(rng, { exam });
  const which = rng.pick(['notLU', 'notLU', 'det', 'mult']);
  const tag = examTag({ exam });
  if (which === 'notLU') {
    const A = rng.pick(NOT_LU);
    const n = A.startsWith('[[0,1,0]') ? 3 : 2;
    return tfL({
      skill: LU, key: `notLU:${A}`, truth: false, exam: tag,
      statement: t('Toute matrice inversible admet une factorisation A = LU sans échange de lignes.'),
      counter: { kind: 'matOne', params: { want: 'notLUable' }, ask: [{ v: 'A', label: 'A =', shape: [n, n] }], answer: { A } },
      explanation: t('Faux : {A} est inversible, mais son premier pivot a₁₁ est nul : il faut échanger deux lignes (PA = LU).', { A: ML(A) }),
    });
  }
  const T = {
    det: [t('Si A = LU avec L unitriangulaire inférieure et U triangulaire supérieure, alors det A est le produit des coefficients diagonaux de U.'), t('Vrai : det A = det L · det U = 1 · (produit de la diagonale de U).')],
    mult: [t('Dans A = LU sans échange, si l\'élimination fait Lᵢ ← Lᵢ − kLⱼ, alors ℓᵢⱼ = k.'), t('Vrai : L range les multiplicateurs eux-mêmes, avec leur signe.')],
  }[which];
  return tfL({ skill: LU, key: which, truth: true, exam: tag, statement: T[0], explanation: T[1], ruleIfFalse: which === 'mult' ? 'l_lu_sign' : null });
}

// ======================================================================
// l-mat-blocks
// ======================================================================

const BLK = 'l-mat-blocks';
const BLK_SUB = [
  { id: 'invBlock', label: t('inverser un bloc'), skill: INV },
  { id: 'formula', label: t('formule du bloc'), skill: BLK },
];

// [[X, Y], [Z, W]] from four 2 × 2 blocks.
const blk = (X, Y, Z, W) => [...X.map((r, i) => [...r, ...Y[i]]), ...Z.map((r, i) => [...r, ...W[i]])];
const Z2 = MX.zeros(2, 2);
const I2 = MX.identity(2);

// A whole 2 × 2 with det in dets.
function det2(rng, dets, lim = 3) {
  for (;;) {
    const A = randM(2, 2, rng, -lim, lim);
    if (dets.includes(MX.det(A).valueOf()) && A.flat().filter((x) => x.n === 0).length <= 1) return A;
  }
}

// M = [[A, B], [0, D]]: A and D of det ±1 (or D = 3I), M⁻¹ = [[A⁻¹, X], [0, D⁻¹]], X = −A⁻¹BD⁻¹.
function blocksData(rng) {
  for (let tries = 0; tries < 200; tries++) {
    const A = det2(rng, [1, -1]);
    const D = rng.chance(0.25) ? MX.scale(I2, 3) : det2(rng, [1, -1, 3, -3]);
    const B = randM(2, 2, rng, -3, 3);
    if (B.flat().filter((x) => x.n === 0).length > 1) continue;
    const Ai = MX.inverse(A);
    const Di = MX.inverse(D);
    const X = MX.scale(MX.mul(MX.mul(Ai, B), Di), -1);
    const Xbad = MX.scale(MX.mul(MX.mul(Di, B), Ai), -1);
    if (MX.equal(X, Xbad) || maxAbs(X) > 9 || X.flat().some((x) => x.d > 3) || X.flat().every((x) => x.n === 0)) continue;
    const M = blk(A, B, Z2, D);
    const Mi = blk(Ai, X, Z2, Di);
    if (!MX.equal(MX.mul(M, Mi), MX.identity(4))) continue;
    return { A, B, D, Ai, Di, X, Xbad, M, Mi };
  }
  const A = MX.mat([[1, 2], [0, 1]]);
  const D = MX.scale(I2, 3);
  const B = MX.mat([[1, 0], [1, 1]]);
  const Ai = MX.inverse(A); const Di = MX.inverse(D);
  const X = MX.scale(MX.mul(MX.mul(Ai, B), Di), -1);
  return { A, B, D, Ai, Di, X, Xbad: MX.scale(MX.mul(MX.mul(Di, B), Ai), -1), M: blk(A, B, Z2, D), Mi: blk(Ai, X, Z2, Di), fallback: true };
}

const blkNames = (d) => ({ A: mt(d.A), B: mt(d.B), D: mt(d.D) });
const blkAbout = (d) => ({ blocks: blkNames(d) });

// The line « (1/det)·[[d, −b], [−c, a]] » of a 2 × 2 inverse, when det ≠ 1.
function inv2Lines(A, subgoal) {
  const det = MX.det(A);
  const adj = [[A[1][1], A[0][1].neg()], [A[1][0].neg(), A[0][0]]];
  const out = det.eq(1) ? [] : [{ math: `(${qt(q(1).div(det))})·${mt(adj)}`, note: `det = ${fq(det)}`, subgoal }];
  return [...out, { math: mt(MX.inverse(A)), note: '', subgoal, grid: GRID2 }];
}

function blocksItem(level, rng) {
  if (level === 5) return blocksAlone(rng);
  const d = blocksData(rng);
  const names = blkNames(d);
  const Bi = MX.inverse(d.B);
  const decision = {
    kind: 'decision', prompt: t('Quel est le bloc X₁₂ de M⁻¹ ?'), options: rng.shuffle([
      { id: 'ok', label: '−A⁻¹BD⁻¹', valid: true },
      { id: 'order', label: '−D⁻¹BA⁻¹', valid: false, rule: 'l_blocks_order', why: t('Écris M·M⁻¹ = I bloc par bloc : A·X₁₂ + B·D⁻¹ = 0, donc X₁₂ = −A⁻¹BD⁻¹. Les blocs ne commutent pas.') },
      Bi ? { id: 'each', label: 'B⁻¹', valid: false, rule: 'l_blocks_inverse_each', why: t('On n\'inverse pas une matrice par blocs case par case : A·B⁻¹ + B·D⁻¹ ≠ 0.') } : { id: 'sign', label: 'A⁻¹BD⁻¹', valid: false, why: t('A·X₁₂ + B·D⁻¹ = 0 donne un signe moins : X₁₂ = −A⁻¹BD⁻¹.') },
    ]),
  };
  const menu = (valid, others) => rng.shuffle([{ id: 'ok', label: valid, valid: true }, ...others]);
  const segs = [
    { start: 'X_11', judge: { kind: 'mat', expect: mt(d.Ai), about: { inverse: mt(d.A) } },
      menu: menu(t('Inverser le bloc A'), [{ id: 'each', label: t('Recopier A'), valid: false, why: t('M·M⁻¹ = I donne A·X₁₁ = I : X₁₁ = A⁻¹.') }]),
      lines: inv2Lines(d.A, 'invBlock').map((l) => ({ ...l, note: l.note || 'X₁₁ = A⁻¹' })) },
    { html: t('Le bloc X₂₂ = D⁻¹.'), start: 'X_22', judge: { kind: 'mat', expect: mt(d.Di), about: { inverse: mt(d.D) } },
      menu: menu(t('Inverser le bloc D'), [{ id: 'zero', label: t('Bloc nul'), valid: false, why: t('D·X₂₂ = I : X₂₂ = D⁻¹, qui n\'est pas nul.') }]),
      lines: inv2Lines(d.D, 'invBlock').map((l) => ({ ...l, note: l.note || 'X₂₂ = D⁻¹' })) },
    { html: t('Le bloc X₁₂ (en haut à droite).'), start: 'X_12', judge: { kind: 'mat', expect: mt(d.X), names, about: blkAbout(d) }, decision,
      menu: menu(t('Formule du bloc : X₁₂ = −A⁻¹BD⁻¹'), [
        { id: 'order', label: 'X₁₂ = −D⁻¹BA⁻¹', valid: false, rule: 'l_blocks_order', why: t('A·X₁₂ + B·D⁻¹ = 0 donne X₁₂ = −A⁻¹BD⁻¹.') },
        { id: 'zero', label: t('Bloc nul'), valid: false, why: t('Le bloc nul est en bas à gauche ; en haut à droite, A·X₁₂ + B·D⁻¹ = 0.') },
      ]),
      lines: [
        { math: '-A^(-1)·B·D^(-1)', note: 'A·X₁₂ + B·D⁻¹ = 0', subgoal: 'formula' },
        { math: mt(d.X), note: '', subgoal: 'formula', grid: GRID2 },
      ] },
    { html: t('Assemble M⁻¹.'), start: 'M^(-1)', judge: { kind: 'mat', expect: mt(d.Mi), about: blkAbout(d) },
      menu: menu(t('Assembler [[X₁₁, X₁₂], [0, X₂₂]]'), [{ id: 'each', label: t('Inverser chaque bloc de M'), valid: false, rule: 'l_blocks_inverse_each', why: t('Le bloc haut droit n\'est pas B⁻¹ mais −A⁻¹BD⁻¹.') }]),
      lines: [{ math: mt(d.Mi), note: t('Contrôle : M·M⁻¹ = I₄'), subgoal: 'formula', grid: [[0, 0], [0, 0]] }] },
  ];
  // The 4 × 4 line: blanks in the top right block.
  const item = partsItem(level, rng, segs, {
    skill: BLK, subgoals: BLK_SUB, key: `${BLK}:inv:${mt(d.M)}`, fallback: d.fallback,
    prompt: t('M = [[A, B], [0, D]] = {M}, avec A = {A}, B = {B} et D = {D}. Calcule M⁻¹ = [[X₁₁, X₁₂], [0, X₂₂]] par blocs.', { M: MLm(d.M), A: MLm(d.A), B: MLm(d.B), D: MLm(d.D) }),
    hints: [
      { level: 1, html: t('Écris M·M⁻¹ = I bloc par bloc et résous pour chaque bloc : A·X₁₁ = I, D·X₂₂ = I, A·X₁₂ + B·X₂₂ = 0.') },
      { level: 2, html: 'X₁₂ = −A⁻¹·B·□' },
      { level: 3, html: `X₁₂ = ${MLm(d.X)}` },
    ],
  });
  const last = item.script[item.script.length - 1];
  if (last.cells) last.cells = [[0, 2], [0, 3], [1, 2], [1, 3]];
  return item;
}

// Level 5: [[I, X], [0, I]]ᵏ = [[I, kX], [0, I]], or the product
// [[I, 0], [X, I]]·[[A, B], [0, D]] = [[A, B], [XA, XB + D]].
function blocksAlone(rng) {
  const X = randM(2, 2, rng, -3, 3);
  if (rng.chance(0.5)) {
    const k = rng.int(2, 4);
    const M = blk(I2, X, Z2, I2);
    const P = blk(I2, MX.scale(X, k), Z2, I2);
    return matLines({
      skill: BLK, level: 5, prompt: t('Soit M = [[I, X], [0, I]] = {M} (blocs 2 × 2). Calcule {Mk} par blocs.', { M: MLm(M), Mk: `M${'⁰¹²³⁴⁵'[k]}` }),
      start: `M^${k}`, judge: { kind: 'mat', expect: mt(P) }, mode: 'free',
      script: [{ kind: 'eq', math: mt(P), note: t('[[I, X], [0, I]]ᵏ = [[I, kX], [0, I]] : ici k = {k}', { k }), subgoal: 'formula' }],
      hints: [], subgoals: BLK_SUB, key: `${BLK}:pow:${mt(X)}:${k}`,
    });
  }
  const d = blocksData(rng);
  const N = blk(I2, Z2, X, I2);
  const P = MX.mul(N, d.M);
  return matLines({
    skill: BLK, level: 5,
    prompt: t('Soit N = [[I, 0], [X, I]] = {N} et M = [[A, B], [0, D]] = {M} (blocs 2 × 2). Calcule NM par blocs.', { N: MLm(N), M: MLm(d.M) }),
    start: 'NM', judge: { kind: 'mat', expect: mt(P), names: { X: mt(X), A: mt(d.A), B: mt(d.B), D: mt(d.D) } }, mode: 'free',
    script: [{ kind: 'eq', math: mt(P), note: 'NM = [[A, B], [XA, XB + D]]', subgoal: 'formula' }],
    hints: [], subgoals: BLK_SUB, key: `${BLK}:prod:${mt(X)}:${mt(d.M)}`, fallback: d.fallback,
  });
}

const BLOCK_DET = ['[[0,0,1,0],[0,0,0,1],[1,0,0,0],[0,1,0,0]]', '[[1,0,1,0],[0,1,0,1],[1,0,0,0],[0,1,0,0]]', '[[0,1,1,0],[1,0,0,1],[1,0,0,0],[0,1,0,0]]'];

function blocksExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const which = rng.pick(['det', 'detFalse', 'detFalse', 'diag']);
    if (which === 'detFalse') {
      const A = rng.pick(BLOCK_DET);
      return tfL({
        skill: BLK, key: `det:${A}`, truth: false, exam: tag,
        statement: t('Pour des blocs A, B, C, D de taille 2 × 2, det [[A, B], [C, D]] = det A · det D − det B · det C.'),
        counter: { kind: 'matOne', params: { want: 'blockDet', n: 4 }, ask: [{ v: 'A', label: 'M =', shape: [4, 4] }], answer: { A } },
        explanation: t('Faux : la formule « ad − bc » ne vaut pas pour des blocs. Par exemple {A} : la formule ne donne pas son déterminant.', { A: ML(A) }),
      });
    }
    const T = {
      det: [t('Pour A et D carrées, det [[A, B], [0, D]] = det A · det D.'), t('Vrai : une matrice triangulaire par blocs a pour déterminant le produit des déterminants des blocs diagonaux.')],
      diag: [t('Si A et D sont inversibles, [[A, 0], [0, D]]⁻¹ = [[A⁻¹, 0], [0, D⁻¹]].'), t('Vrai : le produit par blocs donne [[AA⁻¹, 0], [0, DD⁻¹]] = I.')],
    }[which];
    return tfL({ skill: BLK, key: which, truth: true, exam: tag, statement: T[0], explanation: T[1] });
  }
  const d = blocksData(rng);
  const Bi = MX.inverse(d.B);
  return mcqDistinct({
    skill: BLK, level: 4, key: `mcq:${mt(d.M)}`, exam: tag,
    prompt: t('M = [[A, B], [0, D]] avec A = {A}, B = {B} et D = {D}. Quel est le bloc (1, 2) de M⁻¹ ?', { A: MLm(d.A), B: MLm(d.B), D: MLm(d.D) }),
    right: MLm(d.X),
    wrongs: [
      { html: MLm(d.Xbad), rule: 'l_blocks_order' },
      Bi ? { html: MLm(Bi), rule: 'l_blocks_inverse_each' } : null,
      { html: MLm(MX.scale(d.X, -1)), rule: null },
    ].filter(Boolean),
    fillers: [{ html: MLm(MX.scale(MX.mul(d.Ai, d.B), -1)) }, { html: MLm(MX.scale(MX.mul(d.B, d.Di), -1)) }],
    solution: [{ html: `X₁₂ = −A⁻¹BD⁻¹ = ${MLm(d.X)}`, note: 'A·X₁₂ + B·D⁻¹ = 0' }], fallback: d.fallback,
  }, rng);
}

// ======================================================================

export const GEN = {
  [BLK]: (level, rng, profile, opts = {}) => (opts.exam ? blocksExam(rng, opts.exam) : blocksItem(level, rng)),
  [LU]: (level, rng, profile, opts = {}) => (opts.exam ? luExam(rng, opts.exam) : luItem(level, rng)),
  [ELEM]: (level, rng, profile, opts = {}) => (opts.exam ? elemExam(rng, opts.exam) : elemItem(level, rng)),
  [IMT]: (level, rng, profile, opts = {}) => (opts.exam ? imtExam(rng, opts.exam) : imtItem(level, rng)),
  [GEOM]: (level, rng, profile, opts = {}) => (opts.exam ? geomExam(rng, opts.exam) : geomItem(level, rng)),
  [PROD]: (level, rng, profile, opts = {}) => (opts.exam ? prodExam(rng, opts.exam) : prodItem(level, rng)),
  [INV]: (level, rng, profile, opts = {}) => (opts.exam ? invExam(rng, opts.exam) : invItem(level, rng)),
};

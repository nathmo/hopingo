// Generators of module L, section « sys » (Lay 1: systems, vectors, linear
// maps), spec §8.3. Catalogue: docs/universite/L-M-algebre-lineaire.md.
//
// Levels: 1–2 guided (matrix lines whose `cells` are blanks of the grid;
// notes and decisions), 3 choose the operation then write the line (menu
// `rowops`, computed from the student's matrix), 4 free lines, 5 alone.
// Every generator starts from the answer and builds the question from it
// (alglin-kit.js: unimodular, rrefWith…). opts.exam = 'mcq' | 'tf' |
// 'coef' gives the exam variants.

import * as MX from '../../cas/matrix.js';
import { toMathML } from '../../cas/mathml.js';
import { parse } from '../../cas/parse.js';
import { opText as opTextN, opReadable, parseMatLine, exprML, normalizeMatText } from '../../cas/matexpr.js';
import {
  q, mt, aug, vt, ML, MLm, MLv, opT, opR, fq, qt, sub, unimodular, rrefWith, opLines, pickCells, withCells,
  matLines, coefItem, mcqDistinct, tfL, examTag, rowHoles, polyT, polyR, exampleItem,
} from './alglin-kit.js';
import { mcq } from './kit.js';
import { t, tn } from '../../i18n.js';

const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };

// A linear system as MathML, from its augmented matrix: one equation per row.
function systemML(A, b, names) {
  const eqs = A.map((r, i) => {
    let s = '';
    r.forEach((c, j) => {
      if (c.n === 0) return;
      const abs = c.n < 0 ? c.neg() : c;
      const coef = abs.eq(1) ? '' : qt(abs);
      s += `${c.n < 0 ? '-' : s ? '+' : ''}${coef}${names[j]}`;
    });
    return `${s || '0'}=${qt(b[i])}`;
  });
  return toMathML(parse(eqs.join(';'), { vars: names }), { display: 'block' });
}
const VARS3 = ['x', 'y', 'z'];
const VARS_IDX = (n) => Array.from({ length: n }, (_, i) => `x_${i + 1}`);

// ======================================================================
// l-sys-augmented
// ======================================================================

const AUG = 'l-sys-augmented';
const AUG_SUB = [
  { id: 'write', label: t('écrire la matrice augmentée'), skill: AUG },
  { id: 'clear', label: t('annuler sous le pivot'), skill: AUG },
];

// x* whole in [−3 ; 3]³, a₁₁ = ±1, b = Ax*. Template (b): a zero in an
// equation (a missing variable).
function augData(rng, level) {
  for (let tries = 0; tries < 200; tries++) {
    const holes = level >= 2 && rng.chance(0.5);
    let A;
    if (rng.chance(0.4)) A = unimodular(3, rng, { max: 4, swaps: false });
    else A = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => q(rng.int(-5, 5))));
    A[0][0] = q(rng.pick([1, -1]));
    if (holes) A[rng.int(1, 2)][rng.int(1, 2)] = q(0);
    if (A[1][0].n === 0 && A[2][0].n === 0) continue;
    if (A.some((r) => r.every((x) => x.n === 0))) continue;
    if (MX.det(A).n === 0) continue;
    const x = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)].map((v) => q(v));
    const b = MX.matVec(A, x);
    if (b.some((v) => Math.abs(v.valueOf()) > 20)) continue;
    return { A, b, x, names: holes || rng.chance(0.4) ? VARS_IDX(3) : VARS3 };
  }
  const A = MX.mat([[1, 2, -1], [2, 5, 1], [-1, 1, 4]]);
  return { A, b: MX.mat([[3], [7], [0]]).map((r) => r[0]), x: [q(0), q(1), q(-1)], names: VARS3, fallback: true };
}

// The operations that clear the first column under a₁₁.
const clearOps = (M) => [1, 2].filter((i) => M[i][0].n !== 0).map((i) => ({ kind: 'add', i, j: 0, k: M[i][0].div(M[0][0]).neg() }));

function augItem(level, rng) {
  const d = augData(rng, level);
  const M = d.A.map((r, i) => [...r, d.b[i]]);
  const Mtext = mt(M, 3);
  const ops = clearOps(M);
  const lines = opLines(M, ops, { bar: 3, note: (op) => t('Annuler sous le pivot : {opR}', { opR: opR(op) }), subgoal: 'clear' });
  const sys = systemML(d.A, d.b, d.names);
  const first = { kind: 'eq', math: Mtext, note: t('Une ligne par équation, b après la barre'), subgoal: 'write' };
  const hints = [
    { level: 1, html: t('Choisis k pour que la case sous le pivot devienne 0 : k = a₂₁/a₁₁. Ici, {opR}.', { opR: opR(ops[0]) }) },
    { level: 2, html: t('{opR} : la ligne {x} devient {rowHoles}.', { opR: opR(ops[0]), x: ops[0].i + 1, rowHoles: rowHoles(lines[0].result, ops[0].i, 3, 3) }) },
    { level: 3, html: ML(lines[0].math) },
  ];
  const key = `${AUG}:${Mtext}`;
  // Level 1: the matrix with two blank cells, then each operation with two
  // blank cells in the changed row.
  if (level === 1) {
    const cells = pickCells(M, [1, 2], 2, rng);
    const script = [
      withCells({ kind: 'eq', math: Mtext, note: t('Recopie les coefficients : une ligne par équation'), subgoal: 'write' }, cells),
      { kind: 'segment', html: t('Annule la première colonne sous le pivot.'), start: { math: Mtext }, judge: { kind: 'rowops', goal: 'col1' } },
      ...lines.map((l) => withCells(l, pickCells(l.result, [l.op.i], 2, rng))),
    ];
    return matLines({
      skill: AUG, level, prompt: t('Le système {sys} s\'écrit avec une matrice augmentée. Complète-la, puis annule la première colonne sous le pivot.', { sys }),
      start: 'Matrice', judge: { kind: 'mat', expect: Mtext }, mode: 'guided', script, hints, subgoals: AUG_SUB, key, fallback: d.fallback,
    });
  }
  // Level 2: the whole matrix, then the operation chosen among three.
  if (level === 2) {
    const op = ops[0];
    const bad = { ...op, k: op.k.neg() };
    const swapLike = { kind: 'add', i: op.i, j: op.i === 1 ? 2 : 1, k: q(1) };
    const decision = {
      kind: 'decision', prompt: t('Quelle opération annule la case (2, 1) ?'), options: rng.shuffle([
        { id: 'ok', label: opR(op), valid: true },
        { id: 'sign', label: opR(bad), valid: false, rule: 'l_rowop_sign', why: t('Avec ce signe, la case devient {fq} au lieu de 0.', { fq: fq(M[op.i][0].add(bad.k.mul(M[0][0]))) }) },
        { id: 'other', label: opR(swapLike), valid: false, why: t('Cette opération ne crée pas de zéro sous le pivot : c\'est la ligne du pivot qu\'il faut ajouter.') },
      ]),
    };
    const script = [
      { ...first },
      { kind: 'segment', html: t('Annule la première colonne sous le pivot.'), start: { math: Mtext }, judge: { kind: 'rowops', goal: 'col1' } },
      decision,
      ...lines.map((l) => withCells(l, pickCells(l.result, [l.op.i], 3, rng))),
    ];
    return matLines({
      skill: AUG, level, prompt: t('Écris la matrice augmentée du système {sys}, puis annule la première colonne sous le pivot.', { sys }),
      start: 'Matrice', judge: { kind: 'mat', expect: Mtext }, mode: 'guided', script, hints, subgoals: AUG_SUB, key, fallback: d.fallback,
    });
  }
  // Levels 3–5: the matrix, then the first column cleared.
  const script = [first, { kind: 'segment', html: t('Annule la première colonne sous le pivot.'), start: { math: Mtext }, judge: { kind: 'rowops', goal: 'col1' } }, ...lines];
  return matLines({
    skill: AUG, level,
    prompt: level === 5
      ? t('Résous le début du système {sys} : sa matrice augmentée, puis la première colonne nettoyée sous le pivot.', { sys })
      : level === 3 ? t('Écris la matrice augmentée du système {sys}, puis annule la première colonne sous le pivot : choisis d\'abord l\'opération.', { sys }) : t('Écris la matrice augmentée du système {sys}, puis annule la première colonne sous le pivot.', { sys }),
    start: 'Matrice', judge: { kind: 'mat', expect: Mtext }, mode: level === 3 ? 'tap' : 'free', script,
    hints, subgoals: AUG_SUB, key, tapActions: level === 3 ? 'rowops' : null, fallback: d.fallback,
  });
}

// ======================================================================
// l-sys-echelon
// ======================================================================

const ECH = 'l-sys-echelon';
const ECH_SUB = [
  { id: 'clear', label: t('annuler sous un pivot'), skill: AUG },
  { id: 'swap', label: t('échanger deux lignes'), skill: ECH },
  { id: 'pivots', label: t('lire les pivots'), skill: ECH },
];

// A matrix with the given rank; swap: a zero pivot appears on the way.
function echData(rng, level, { swap = false } = {}) {
  for (let tries = 0; tries < 200; tries++) {
    const m = level >= 4 ? rng.pick([3, 4]) : 3;
    const n = level === 5 ? 5 : level === 4 ? rng.pick([4, 4, 5]) : rng.pick([3, 4]);
    const r = Math.min(m, n, rng.pick(level >= 4 ? [2, 3, 3, 4] : [2, 3, 3]));
    const cols = rng.shuffle([...Array(n).keys()]).slice(0, r).sort((a, b) => a - b);
    if (cols[0] !== 0) cols[0] = 0;
    const { A, fallback } = rrefWith(m, n, [...new Set(cols)].sort((a, b) => a - b), rng, { max: 3 });
    if (fallback) continue;
    const e = MX.echelon(A);
    if (e.ops.length < 2 || e.ops.length > (level >= 4 ? 7 : 4)) continue;
    const hasSwap = e.ops.some((op) => op.kind === 'swap');
    if (swap !== hasSwap) continue;
    if (e.ops[0].kind === 'swap') continue;
    if (e.ops.some((op) => op.kind === 'add' && op.k.d > 2)) continue;
    if (e.E.flat().some((x) => x.d > 2 || Math.abs(x.valueOf()) > 15)) continue;
    return { A, ...e, m, n };
  }
  const A = MX.mat([[1, 2, -1, 3], [2, 4, 1, 7], [-1, 1, 4, 0]]);
  return { A, ...MX.echelon(A), m: 3, n: 4, fallback: true };
}

function echItem(level, rng) {
  const d = echData(rng, level, { swap: level === 2 || level === 5 });
  const Atext = mt(d.A);
  const rank = d.pivots.length;
  const lines = opLines(d.A, d.ops, {
    note: (op) => (op.kind === 'swap' ? t('Pivot nul : échanger avec une ligne plus bas') : t('Annuler sous le pivot : {opR}', { opR: opR(op) })),
    subgoal: (op) => (op.kind === 'swap' ? 'swap' : 'clear'),
  });
  const judge = { kind: 'rowops', goal: 'echelon', multi: level >= 4 };
  const pivSeg = { kind: 'segment', html: t('Combien de pivots ?'), ask: t('nombre de pivots ='), start: { math: 'r' }, judge: { kind: 'value', expect: String(rank) } };
  const pivLine = { kind: 'eq', math: String(rank), note: t('Pivots en colonnes {x}', { x: d.pivots.map((c) => c + 1).join(', ') }), subgoal: 'pivots' };
  const first = d.ops.find((op) => op.kind === 'add');
  const hints = [
    { level: 1, html: t('Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant.') },
    { level: 2, html: (() => { const l = lines.find((x) => x.op.kind === 'add'); return l ? t('{opR} : la ligne {x} devient {rowHoles}.', { opR: opR(l.op), x: l.op.i + 1, rowHoles: rowHoles(l.result, l.op.i) }) : t('Échange deux lignes.'); })() },
    { level: 3, html: ML(lines[0].math) },
  ];
  const key = `${ECH}:${Atext}`;
  const script = [];
  if (level <= 2) {
    lines.forEach((l) => {
      if (level === 2 && l.op.kind === 'swap') {
        script.push({
          kind: 'decision', prompt: t('Le pivot de la colonne suivante est nul. Que fais-tu ?'), options: [
            { id: 'swap', label: t('Échanger : {opR}', { opR: opR(l.op) }), valid: true },
            { id: 'div', label: t('Diviser la ligne par ce pivot'), valid: false, why: t('Le pivot vaut 0 : on ne divise pas par 0. On échange avec une ligne plus bas qui a un coefficient non nul.') },
          ],
        });
        script.push({ kind: 'eq', math: l.math, note: l.note, subgoal: l.subgoal });
        return;
      }
      script.push(l.op.kind === 'swap' ? { kind: 'eq', math: l.math, note: l.note, subgoal: l.subgoal } : withCells(l, pickCells(l.result, [l.op.i], 2, rng)));
    });
  } else script.push(...lines);
  script.push(pivSeg, pivLine);
  if (level === 5) {
    const cols = vt(d.pivots.map((c) => c + 1));
    script.push({ kind: 'segment', html: t('Quelles colonnes ont un pivot ? Écris leurs numéros : (1 ; 2 ; 4).'), ask: t('colonnes ='), start: { math: 'colonnes' }, judge: { kind: 'mat', expect: cols } }, { kind: 'eq', math: cols, subgoal: 'pivots' });
  }
  return matLines({
    skill: ECH, level,
    prompt: level === 5
      ? t('Échelonne {MLm}, puis donne le nombre de pivots et les colonnes pivots.', { MLm: MLm(d.A) })
      : level === 3 ? t('Échelonne la matrice {A} : choisis chaque opération, puis écris la matrice, puis compte les pivots.', { A: MLm(d.A) })
        : level === 4 ? t('Échelonne la matrice {A} (plusieurs opérations par ligne permises), puis compte les pivots.', { A: MLm(d.A) })
          : t('Échelonne la matrice {A}, puis compte les pivots.', { A: MLm(d.A) }),
    start: Atext, judge, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints, subgoals: ECH_SUB, key, tapActions: level === 3 ? 'rowops' : null, fallback: d.fallback,
  });
}

function echExam(rng, exam) {
  if (exam === 'tf') {
    if (rng.chance(0.5)) {
      return tfL({
        skill: ECH, key: `same-pivots:${rng.int(1, 99)}`, truth: true, exam: examTag({ exam }),
        statement: t('Deux formes échelonnées d\'une même matrice A ont leurs pivots aux mêmes positions.'),
        explanation: t('Vrai : les positions des pivots ne dépendent pas des opérations choisies (ce sont celles de la forme réduite, qui est unique).'),
      });
    }
    const A = rng.pick([[[1, 1], [1, 2]], [[1, 2], [2, 3]], [[2, 1], [4, 3]]]);
    const E1 = MX.echelon(MX.mat(A)).E;
    const E2 = MX.applyOp(E1, { kind: 'scale', i: 0, k: q(2) });
    return tfL({
      skill: ECH, key: `unique:${mt(MX.mat(A))}`, truth: false, exam: examTag({ exam }),
      statement: t('La forme échelonnée d\'une matrice est unique.'),
      counter: {
        kind: 'matOne', params: { want: 'echelonNotUnique' },
        ask: [{ v: 'A', label: 'A =', shape: [2, 2] }, { v: 'E1', label: 'E₁ =', shape: [2, 2] }, { v: 'E2', label: 'E₂ =', shape: [2, 2] }],
        answer: { A: mt(MX.mat(A)), E1: mt(E1), E2: mt(E2) },
      },
      explanation: t('Faux : {MLm} et {MLm2} sont deux formes échelonnées de {MLm3}. Seule la forme <b>réduite</b> est unique.', { MLm: MLm(E1), MLm2: MLm(E2), MLm3: MLm(MX.mat(A)) }),
    });
  }
  const d = echData(rng, 4);
  const r = d.pivots.length;
  const n = (v) => ({ html: String(v) });
  return mcqDistinct({
    skill: ECH, level: 4, key: `mcq:${mt(d.A)}`, exam: examTag({ exam }),
    prompt: rng.chance(0.5) ? t('Combien de pivots a la matrice {A} ?', { A: MLm(d.A) }) : t('Quel est le rang de la matrice {A} ?', { A: MLm(d.A) }),
    right: String(r),
    wrongs: [{ ...n(d.m), rule: null }, { ...n(d.n), rule: null }],
    fillers: [n(r - 1), n(r + 1), n(r + 2)].filter((o) => Number(o.html) > 0),
    solution: [{ html: t('Forme échelonnée : {MLm}', { MLm: MLm(d.E) }), note: '' }, { html: `${r} pivots`, note: '' }],
  }, rng);
}

// ======================================================================
// l-sys-rref
// ======================================================================

const RREF = 'l-sys-rref';
const RREF_SUB = [
  { id: 'down', label: t('descendre'), skill: ECH },
  { id: 'up', label: t('remonter'), skill: RREF },
  { id: 'read', label: t('lire le coefficient'), skill: RREF },
];
const PIVOTS = [[0, 1], [0, 1, 3], [0, 2, 3]];

// A 3 × 4 matrix whose reduced form has a free entry ≠ 0, ±1 (the
// coefficient asked), integers on the way down.
function rrefData(rng) {
  for (let tries = 0; tries < 200; tries++) {
    const pivots = rng.pick(PIVOTS);
    const { A, R, fallback } = rrefWith(3, 4, pivots, rng, { lo: -4, hi: 4, needFree: true, max: 3 });
    if (fallback || A.some((r) => r.every((x) => x.n === 0))) continue;
    const red = MX.rref(A);
    if (red.ops.length > 7 || red.ops.some((op) => op.k && op.k.d > 2)) continue;
    const e = MX.echelon(A);
    // The asked entry: free, ≠ 0, ±1, and different in E (else the
    // « not reduced » trap is invisible).
    const cands = [];
    pivots.forEach((c, i) => { for (let j = c + 1; j < 4; j++) if (!pivots.includes(j) && Math.abs(R[i][j].valueOf()) > 1 && !e.E[i][j].eq(R[i][j]) && !R[j]?.[i]?.eq(R[i][j])) cands.push([i, j]); });
    if (!cands.length) continue;
    if (e.E.flat().some((x) => x.d > 2)) continue;
    const [i, j] = rng.pick(cands);
    return { A, R, E: e.E, ops: red.ops, eOps: e.ops, pivots, i, j };
  }
  const A = MX.mat([[1, 2, -1, 0], [1, 3, 0, -1], [2, 1, -5, 3]]);
  const red = MX.rref(A);
  return { A, R: red.R, E: MX.echelon(A).E, ops: red.ops, eOps: MX.echelon(A).ops, pivots: red.pivots, i: 0, j: 2, fallback: true };
}

const rLabel = (i, j) => `r_${i + 1}${j + 1}`;
const rName = (i, j) => `r${sub(i + 1)}${sub(j + 1)}`;

function rrefItem(level, rng) {
  const d = rrefData(rng);
  const down = d.eOps.length;
  const lines = opLines(d.A, d.ops, {
    note: (op) => (op.kind === 'scale' ? t('Pivot à 1') : op.i < op.j ? t('Remonter : {opR}', { opR: opR(op) }) : t('Descendre : {opR}', { opR: opR(op) })),
    subgoal: (op) => (op.kind === 'add' && op.i > op.j ? 'down' : 'up'),
  });
  const key = `${RREF}:${mt(d.A)}`;
  const hints = [
    { level: 1, html: t('Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot.') },
    { level: 2, html: (() => { const l = lines[down] ?? lines[0]; return t('{opR} : la ligne {x} devient {rowHoles}.', { opR: opR(l.op), x: l.op.i + 1, rowHoles: rowHoles(l.result, l.op.i) }); })() },
    { level: 3, html: ML(lines[down]?.math ?? lines[0].math) },
  ];
  const ask = { kind: 'segment', html: t('Que vaut {rName} ?', { rName: rName(d.i, d.j) }), ask: `${rName(d.i, d.j)} =`, start: { math: rLabel(d.i, d.j) }, judge: { kind: 'value', expect: qt(d.R[d.i][d.j]) } };
  const askLine = { kind: 'eq', math: qt(d.R[d.i][d.j]), note: t('Ligne {x}, colonne {x2} de R', { x: d.i + 1, x2: d.j + 1 }), subgoal: 'read' };
  const judge = { kind: 'rowops', goal: 'rref', multi: level >= 4 };
  // Levels 1–2: the way down is done; the way up, guided.
  if (level <= 2) {
    const upLines = lines.slice(down);
    const script = [];
    if (level === 2) {
      script.push({
        kind: 'decision', prompt: t('Dans quel ordre remonter ?'), options: [
          { id: 'last', label: t('Du dernier pivot vers le premier'), valid: true, quality: 'good' },
          { id: 'first', label: t('Du premier pivot vers le dernier'), valid: true, quality: 'poor', why: t('Juste aussi, mais plus long : en partant du haut, une case déjà nettoyée peut se remplir de nouveau.') },
        ],
      });
    }
    script.push(...upLines.map((l) => withCells(l, pickCells(l.result, [l.op.i], level === 1 ? 2 : 3, rng))), ask, askLine);
    return matLines({
      skill: RREF, level, prompt: t('Une forme échelonnée de A = {MLm} est {MLm2}. Remonte jusqu\'à la forme réduite R, puis lis {rName}.', { MLm: MLm(d.A), MLm2: MLm(d.E), rName: rName(d.i, d.j) }),
      start: mt(d.E), judge, mode: 'guided', script, hints, subgoals: RREF_SUB, key, fallback: d.fallback,
    });
  }
  if (level === 5) {
    return coefItem({
      skill: RREF, level: 5, prompt: t('Soit A = {MLm} et R sa forme échelonnée réduite. Que vaut {rName} ?', { MLm: MLm(d.A), rName: rName(d.i, d.j) }),
      label: rLabel(d.i, d.j), value: qt(d.R[d.i][d.j]), key: `${mt(d.A)}:${d.i}${d.j}`, askCoef: { label: rName(d.i, d.j), path: [d.i, d.j] },
      traps: [{ rule: 'l_rref_not_reduced' }, { rule: 'l_coef_index_swap' }],
      subgoals: RREF_SUB, solution: [{ html: `R = ${MLm(d.R)}`, note: t('Forme réduite') }, { html: `${rName(d.i, d.j)} = ${fq(d.R[d.i][d.j])}`, note: '' }], fallback: d.fallback,
    });
  }
  return matLines({
    skill: RREF, level, prompt: level === 3 ? t('Réduis A = {A} jusqu\'à sa forme échelonnée réduite R : choisis chaque opération, puis écris la matrice, puis lis {r}.', { A: MLm(d.A), r: rName(d.i, d.j) }) : t('Réduis A = {A} jusqu\'à sa forme échelonnée réduite R, puis lis {r}.', { A: MLm(d.A), r: rName(d.i, d.j) }),
    start: mt(d.A), judge, mode: level === 3 ? 'tap' : 'free', script: [...lines, ask, askLine],
    hints, subgoals: RREF_SUB, key, tapActions: level === 3 ? 'rowops' : null, fallback: d.fallback,
  });
}

function rrefExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 2);
    if (which < 2) {
      return tfL({
        skill: RREF, key: `unique:${which}`, truth: true, exam: examTag({ exam }),
        statement: which === 0 ? t('La forme échelonnée réduite d\'une matrice est unique.') : t('Deux matrices équivalentes par lignes ont la même forme échelonnée réduite.'),
        explanation: t('Vrai : c\'est le théorème d\'unicité de la forme réduite.'),
      });
    }
    const A = rng.pick([[[1, 2], [3, 4]], [[1, 0], [1, 1]], [[2, 1], [1, 1]]]);
    const B = MX.identity(2);
    return tfL({
      skill: RREF, key: `same:${mt(MX.mat(A))}`, truth: false, exam: examTag({ exam }),
      statement: t('Si deux matrices de même taille ont la même forme échelonnée réduite, elles sont égales.'),
      counter: { kind: 'matPair', params: { n: 2, test: 'sameRref' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }, { v: 'B', label: 'B =', shape: [2, 2] }], answer: { A: mt(MX.mat(A)), B: mt(B) } },
      explanation: t('Faux : {MLm} et I₂ ont toutes deux la forme réduite I₂.', { MLm: MLm(MX.mat(A)) }),
    });
  }
  const d = rrefData(rng);
  const right = d.R[d.i][d.j];
  if (exam === 'coef') {
    return coefItem({
      skill: RREF, level: 4, prompt: t('Soit A = {MLm} et R sa forme échelonnée réduite. Que vaut {rName} ?', { MLm: MLm(d.A), rName: rName(d.i, d.j) }),
      label: rLabel(d.i, d.j), value: qt(right), key: `${mt(d.A)}:${d.i}${d.j}`, exam: examTag({ exam }), askCoef: { label: rName(d.i, d.j), path: [d.i, d.j] },
      traps: [{ rule: 'l_rref_not_reduced' }, { rule: 'l_coef_index_swap' }],
      solution: [{ html: `R = ${MLm(d.R)}`, note: '' }], fallback: d.fallback,
    });
  }
  // A sign mistake in the first operation, then a correct reduction.
  const op0 = d.ops.find((op) => op.kind === 'add');
  const signR = op0 ? MX.rref(MX.applyOp(d.A, { ...op0, k: op0.k.neg() })).R[d.i]?.[d.j] : null;
  return mcqDistinct({
    skill: RREF, level: 4, key: `mcq:${mt(d.A)}:${d.i}${d.j}`, exam: examTag({ exam }),
    prompt: t('Soit A = {MLm} et R sa forme échelonnée réduite. Que vaut {rName} ?', { MLm: MLm(d.A), rName: rName(d.i, d.j) }),
    right: fq(right),
    wrongs: [
      { html: fq(d.E[d.i][d.j]), rule: 'l_rref_not_reduced' },
      d.R[d.j]?.[d.i] ? { html: fq(d.R[d.j][d.i]), rule: 'l_coef_index_swap' } : null,
      signR ? { html: fq(signR), rule: 'l_rowop_sign' } : null,
    ].filter(Boolean),
    fillers: [{ html: fq(right.neg()) }, { html: fq(right.add(1)) }, { html: fq(right.sub(1)) }],
    solution: [{ html: `R = ${MLm(d.R)}`, note: t('Forme réduite') }],
  }, rng);
}

// ======================================================================
// Shared: polynomials in a parameter, parametric matrices and systems
// ======================================================================

// A polynomial in one letter: coefficients in ℚ, constant first ([] = 0).
const ptrim = (p) => { const r = [...p]; while (r.length && r[r.length - 1].n === 0) r.pop(); return r; };
const pc = (...cs) => ptrim(cs.map((c) => q(c)));
const padd = (a, b) => ptrim(Array.from({ length: Math.max(a.length, b.length) }, (_, i) => (a[i] ?? q(0)).add(b[i] ?? q(0))));
const pscale = (a, k) => ptrim(a.map((c) => c.mul(q(k))));
const pmul = (a, b) => {
  if (!a.length || !b.length) return [];
  const r = Array(a.length + b.length - 1).fill(q(0));
  a.forEach((x, i) => b.forEach((y, j) => { r[i + j] = r[i + j].add(x.mul(y)); }));
  return ptrim(r);
};
const peval = (a, x) => a.reduceRight((s, c) => s.mul(q(x)).add(c), q(0));
const pdeg = (a) => a.length - 1;
// a / b when it is a polynomial (b constant, or a = k·b), else null.
function pratio(a, b) {
  if (!b.length) return null;
  if (!a.length) return [];
  if (b.length === 1) return pscale(a, b[0].inv());
  if (a.length !== b.length) return null;
  const k = a[a.length - 1].div(b[b.length - 1]);
  return a.every((c, i) => c.eq(b[i].mul(k))) ? [k] : null;
}
// Highest degree first, as the courses write it: a^2-a-6, -3a-2.
function ptext(p, v = 'a') {
  // 1 − a rather than −a + 1.
  if (p.length === 2 && p[1].n < 0 && p[0].n > 0) return `${qt(p[0])}-${p[1].eq(-1) ? '' : qt(p[1].neg())}${v}`;
  const parts = [];
  for (let k = p.length - 1; k >= 0; k--) {
    const c = p[k];
    if (c.n === 0) continue;
    const abs = c.n < 0 ? c.neg() : c;
    const coef = k === 0 ? qt(abs) : abs.eq(1) ? '' : abs.d === 1 ? qt(abs) : `(${qt(abs)})`;
    parts.push(`${c.n < 0 ? '-' : parts.length ? '+' : ''}${coef}${k === 0 ? '' : k === 1 ? v : `${v}^${k}`}`);
  }
  return parts.join('') || '0';
}
// The same, readable: a² − a − 6.
const pR = (p, v = 'a') => ptext(p, v).replace(/\^2/g, '²').replace(/([+-])/g, ' $1 ').replace(/^ - /, '−').replace(/-/g, '−').trim();
// A matrix with polynomial entries as text: [[1,a|2],[0,1-a|a]].
const pmt = (rows, bar = null, v = 'a') => `[${rows.map((r) => `[${r.map((x, j) => `${bar !== null && j === bar ? '|' : ''}${ptext(x, v)}`).join(',').replace(/,\|/g, '|')}]`).join(',')}]`;
// Lᵢ ← Lᵢ + k·Lⱼ with k a polynomial: the text the judges read, readable.
const pnode = (p, v = 'a') => parse(ptext(p, v), { vars: [v] });
const popT = (op, v = 'a') => opTextN({ kind: 'add', i: op.i, j: op.j, k: pnode(op.k, v) });
const popR = (op, v = 'a') => opReadable({ kind: 'add', i: op.i, j: op.j, k: pnode(op.k, v) });
const applyP = (rows, op) => rows.map((r, i) => (i === op.i ? r.map((x, c) => padd(x, pmul(op.k, rows[op.j][c]))) : r));
const atP = (rows, x) => rows.map((r) => r.map((p) => peval(p, x)));
// The factored form s·(a − r₁)(a − r₂): -(a-1)(a+2), a(a-2).
const fa = (r, v = 'a') => (r === 0 ? v : `(${v}${r > 0 ? '-' : '+'}${Math.abs(r)})`);
const factoredT = (s, r1, r2, v = 'a') => { const [x, y] = r2 === 0 ? [r2, r1] : [r1, r2]; return `${s < 0 ? '-' : ''}${fa(x, v)}${fa(y, v)}`; };
const MT = (text, vars = ['a']) => toMathML(parse(text, { vars }));
// A line shown as written, not evaluated (x = p + t·v keeps its sum).
function MLx(text, vars = []) {
  try {
    const line = parseMatLine(normalizeMatText(text), { vars });
    return `<math><mrow>${line.label ? `<mi>${line.label}</mi><mo>=</mo>` : ''}${exprML(line.body)}</mrow></math>`;
  } catch { return text; }
}
const MP = (p, v = 'a') => MT(ptext(p, v), [v]);
const setR = (xs) => `{${xs.map(fq).join(' ; ')}}`;

// Kind of the solutions of a system [A | b] (n unknowns) over ℚ.
function solKind(M, n) {
  const rA = MX.rank(M.map((r) => r.slice(0, n)));
  const rAb = MX.rank(M);
  return rA !== rAb ? 'none' : rA < n ? 'inf' : 'unique';
}

// A system as MathML from rows of polynomials (the last entry is the
// right-hand side): x + (a − 1)y + 2az = 1.
function systemP(rows, names, v = 'a') {
  const eqs = rows.map((r) => {
    let s = '';
    r.slice(0, -1).forEach((p, j) => {
      if (!p.length) return;
      let neg = false;
      let coef;
      if (p.length === 1) { neg = p[0].n < 0; const abs = neg ? p[0].neg() : p[0]; coef = abs.eq(1) ? '' : qt(abs); }
      else if (p.length === 2 && p[0].n === 0) { neg = p[1].n < 0; const abs = neg ? p[1].neg() : p[1]; coef = `${abs.eq(1) ? '' : qt(abs)}${v}`; }
      else coef = `(${ptext(p, v)})`;
      s += `${neg ? '-' : s ? '+' : ''}${coef}${names[j]}`;
    });
    return `${s || '0'}=${ptext(r[r.length - 1], v)}`;
  });
  return toMathML(parse(eqs.join(';'), { vars: [...names, v] }), { display: 'block' });
}

// Gaussian elimination of a 3-row matrix of polynomials without dividing
// by the parameter: pivot a₁₁ = ±1, then a₂₂ (a constant, or a polynomial
// of which the entry below is a constant multiple). → {ops, steps} | null.
function elimP(A) {
  if (A[0][0].length !== 1 || Math.abs(A[0][0][0].valueOf()) !== 1) return null;
  const ops = [];
  const steps = [];
  let R = A;
  const go = (op) => { R = applyP(R, op); ops.push(op); steps.push(R); };
  for (const i of [1, 2]) if (R[i][0].length) go({ i, j: 0, k: pscale(R[i][0], R[0][0][0].inv().neg()) });
  if (!R[1][1].length) return null;
  if (R[2][1].length) {
    const k = pratio(R[2][1], R[1][1]);
    if (!k) return null;
    go({ i: 2, j: 1, k: pscale(k, -1) });
  }
  return { ops, steps, E: R };
}

// No two proportional rows (no equation written twice).
const distinctRows = (M) => M.every((r, i) => M.every((s, j) => j <= i || MX.rank([r, s]) === 2));

// a + Σ cᵢ·tᵢ as text: 2+3t, -1-t, s-2t.
function linT(c0, terms) {
  let s = c0.n !== 0 ? qt(c0) : '';
  for (const [c, v] of terms) {
    if (c.n === 0) continue;
    const abs = c.n < 0 ? c.neg() : c;
    const coef = abs.eq(1) ? '' : abs.d === 1 ? qt(abs) : `(${qt(abs)})`;
    s += `${c.n < 0 ? '-' : s ? '+' : ''}${coef}${v}`;
  }
  return s || '0';
}

// ======================================================================
// l-sys-solution
// ======================================================================

const SOL = 'l-sys-solution';
const SOL_SUB = [
  { id: 'write', label: t('écrire la matrice augmentée'), skill: AUG },
  { id: 'reduce', label: t('réduire'), skill: RREF },
  { id: 'pivots', label: t('exprimer les variables pivots'), skill: SOL },
  { id: 'vector', label: t('forme vectorielle'), skill: SOL },
];

// [A | b] from its reduced form (rrefWith on the augmented matrix): n
// unknowns, `free` free variables, or no solution (a pivot in b's column).
function solData(rng, level, { none = false, free: free0, n: n0 } = {}) {
  for (let tries = 0; tries < 200; tries++) {
    const n = n0 ?? (level >= 4 ? 4 : 3);
    const free = free0 ?? (level === 5 ? 2 : level === 4 ? rng.pick([1, 1, 2]) : 1);
    const rank = n - free;
    if (rank < 1 || rank + (none ? 1 : 0) > 3) continue;
    const cols = [0, ...rng.shuffle([...Array(n).keys()].slice(1)).slice(0, rank - 1)].sort((a, b) => a - b);
    const { A: M, fallback } = rrefWith(3, n + 1, none ? [...cols, n] : cols, rng, { max: 3 });
    if (fallback) continue;
    if (M.some((r) => r.slice(0, n).every((x) => x.n === 0))) continue;
    if (!distinctRows(M)) continue;
    if (solKind(M, n) !== (none ? 'none' : 'inf')) continue;
    const red = MX.rref(M, { cols: n });
    if (red.ops.length < 2 || red.ops.length > (level >= 4 ? 8 : 6)) continue;
    if (red.ops.some((op) => op.kind === 'swap' && level < 3)) continue;
    if (red.ops.some((op) => op.k && op.k.d > 2)) continue;
    let X = M;
    let ok = true;
    for (const op of red.ops) {
      X = MX.applyOp(X, op);
      if (X.flat().some((x) => x.d > 2 || Math.abs(x.valueOf()) > 15)) { ok = false; break; }
    }
    if (!ok || M.flat().some((x) => Math.abs(x.valueOf()) > 9)) continue;
    const R = red.R;
    const freeCols = [...Array(n).keys()].filter((c) => !cols.includes(c));
    const p = Array.from({ length: n }, () => q(0));
    cols.forEach((c, r) => { p[c] = R[r][n]; });
    if (!none && p[0].n === 0) continue;
    if (!none && R.flat().some((x) => x.d !== 1)) continue;
    const dirs = freeCols.map((f) => {
      const v = Array.from({ length: n }, () => q(0));
      v[f] = q(1);
      cols.forEach((c, r) => { v[c] = R[r][f].neg(); });
      return v;
    });
    return { M, R, ops: red.ops, n, pivots: cols, freeCols, p, dirs, none };
  }
  const M = MX.mat([[1, 2, -1, 0], [1, 3, 0, -1], [2, 1, -5, 3]]);
  const red = MX.rref(M, { cols: 3 });
  return { M, R: red.R, ops: red.ops, n: 3, pivots: [0, 1], freeCols: [2], p: MX.mat([[2, -1, 0]])[0], dirs: [MX.mat([[3, -1, 1]])[0]], none: false, fallback: true };
}

const xName = (j) => `x${sub(j + 1)}`;
const paramsOf = (k) => (k === 1 ? ['t'] : ['s', 't']);
// The pieces of the answer: x with the pivots expressed, x = p + t·v.
function solTexts(d) {
  const ps = paramsOf(d.freeCols.length);
  const entries = Array.from({ length: d.n }, (_, j) => {
    const f = d.freeCols.indexOf(j);
    if (f >= 0) return ps[f];
    return linT(d.p[j], d.dirs.map((v, k) => [v[j], ps[k]]));
  });
  const vec = `(${entries.join(' ; ')})`;
  const final = `x = ${vt(d.p)} + ${d.dirs.map((v, k) => `${ps[k]}${vt(v)}`).join(' + ')}`;
  const freeText = d.freeCols.map((f, k) => `${xName(f)} = ${ps[k]}`).join(', ');
  return { ps, vec, final, freeText };
}

function solItem(level, rng) {
  const none = level === 5 && rng.chance(0.25);
  const d = solData(rng, level, { none });
  const n = d.n;
  const Mtext = mt(d.M, n);
  const Rtext = mt(d.R, n);
  const sys = systemML(d.M.map((r) => r.slice(0, n)), d.M.map((r) => r[n]), VARS_IDX(n));
  const key = `${SOL}:${Mtext}`;
  const redLines = opLines(d.M, d.ops, {
    bar: n,
    note: (op) => (op.kind === 'scale' ? t('Pivot à 1') : op.kind === 'swap' ? t('Échanger deux lignes') : op.i > op.j ? t('Descendre : {opR}', { opR: opR(op) }) : t('Remonter : {opR}', { opR: opR(op) })),
    subgoal: 'reduce',
  });
  const writeSeg = { kind: 'segment', html: t('Réduis la matrice augmentée.'), start: { math: Mtext }, judge: { kind: 'rowops', goal: 'rref', multi: level >= 4 } };
  const writeLine = { kind: 'eq', math: Mtext, note: t('Une ligne par équation, b après la barre'), subgoal: 'write' };
  if (d.none) {
    const script = [writeLine, writeSeg, ...redLines,
      { kind: 'segment', html: t('Combien de solutions a ce système ?'), ask: t('nombre de solutions ='), start: { math: 'N' }, judge: { kind: 'value', expect: '0' } },
      { kind: 'eq', math: '0', note: t('Une ligne [0 … 0 | c] avec c ≠ 0 se lit 0 = c : aucune solution'), subgoal: 'vector' }];
    return matLines({
      skill: SOL, level, prompt: t('Résous le système {sys} : matrice augmentée, forme réduite, puis l\'ensemble des solutions.', { sys }),
      start: 'Matrice', judge: { kind: 'mat', expect: Mtext }, mode: 'free', script, hints: [], subgoals: SOL_SUB, key, fallback: d.fallback,
    });
  }
  const T = solTexts(d);
  const ps = T.ps;
  const vecJudge = { kind: 'mat', vars: ps, expect: T.vec, particular: vt(d.p), free: d.freeCols.map(xName).join(', ') };
  const spanJudge = { kind: 'span', basis: d.dirs.map(vt), affine: vt(d.p), require: 'basis' };
  const vecSeg = (html) => ({ kind: 'segment', html, ask: 'x =', start: { math: 'x' }, judge: vecJudge });
  const vecLine = { kind: 'eq', math: `x = ${T.vec}`, note: ps.length > 1 ? t('{free} : les variables pivots s\'expriment avec s et t', { free: T.freeText }) : t('{free} : les variables pivots s\'expriment avec t', { free: T.freeText }), subgoal: 'pivots' };
  const finalSeg = { kind: 'segment', html: t('Écris la solution sous forme vectorielle.'), ask: 'x =', start: { math: 'x' }, judge: spanJudge };
  const finalLine = { kind: 'eq', math: T.final, note: t('Un point, plus les combinaisons des vecteurs directeurs'), subgoal: 'vector' };
  const pivotHole = d.pivots.map((c, r) => `${xName(c)} = ${fq(d.p[c])}${d.dirs.map((v, k) => (v[c].n ? ` + □${ps[k]}` : '')).join('')}`).join(', ');
  const hints = [
    { level: 1, html: t('Les variables sans pivot sont libres : pose {freeText}.', { freeText: T.freeText }) },
    { level: 2, html: pivotHole },
    { level: 3, html: MLx(T.final, ps) },
  ];
  const freeDecision = {
    kind: 'decision', prompt: t('Quelles variables sont libres ?'), options: rng.shuffle([
      { id: 'ok', label: d.freeCols.length > 1 ? t('{xs} : leurs colonnes n\'ont pas de pivot', { xs: d.freeCols.map(xName).join(' et ') }) : t('{xs} : sa colonne n\'a pas de pivot', { xs: d.freeCols.map(xName).join(' et ') }), valid: true },
      { id: 'first', label: t('{xName} : la première variable', { xName: xName(d.pivots[0]) }), valid: false, why: t('La colonne de {xName} a un pivot : {xName} s\'exprime avec les autres. Les variables libres sont celles des colonnes sans pivot.', { xName: xName(d.pivots[0]) }) },
      { id: 'none', label: t('Aucune : il y a une solution unique'), valid: false, rule: 'l_free_var_zero', why: t('La colonne de {xName} n\'a pas de pivot : {xName} peut prendre n\'importe quelle valeur, il y a une infinité de solutions.', { xName: xName(d.freeCols[0]) }) },
    ]),
  };
  // Levels 1–2: the reduced form is given.
  if (level <= 2) {
    const cells = d.pivots.map((c) => [c, 0]);
    const script = [
      ...(level === 2 ? [freeDecision] : [{ kind: 'note', html: t('Pas de pivot dans la colonne de {x} : {freeText}.', { x: d.freeCols.map(xName).join(' et '), freeText: T.freeText }) }]),
      withCells(vecLine, level === 1 ? cells.slice(0, 2) : cells),
      finalSeg, finalLine,
    ];
    return matLines({
      skill: SOL, level,
      prompt: d.freeCols.length > 1
        ? t('La forme échelonnée réduite de la matrice augmentée d\'un système est {R}. Exprime les variables pivots en fonction des variables libres, puis écris la solution sous forme vectorielle.', { R: MLm(d.R, n) })
        : t('La forme échelonnée réduite de la matrice augmentée d\'un système est {R}. Exprime les variables pivots en fonction de la variable libre, puis écris la solution sous forme vectorielle.', { R: MLm(d.R, n) }),
      start: Rtext, judge: vecJudge, mode: 'guided', script, hints, subgoals: SOL_SUB, key, fallback: d.fallback,
    });
  }
  if (level === 3) {
    const script = [...redLines, vecSeg(t('Exprime les variables pivots en fonction des variables libres.')), vecLine, finalSeg, finalLine];
    return matLines({
      skill: SOL, level, prompt: t('Résous le système de matrice augmentée {MLm} : réduis-la (choisis chaque opération), puis écris la solution x = p + t·v.', { MLm: MLm(d.M, n) }),
      start: Mtext, judge: { kind: 'rowops', goal: 'rref' }, mode: 'tap', script, hints, subgoals: SOL_SUB, key, tapActions: 'rowops', fallback: d.fallback,
    });
  }
  const script = [writeLine, writeSeg, ...redLines, vecSeg(t('Exprime les variables pivots en fonction des variables libres.')), vecLine, finalSeg, finalLine];
  return matLines({
    skill: SOL, level, prompt: t('Résous le système {sys} : matrice augmentée, forme réduite, puis solution sous forme vectorielle.', { sys }),
    start: 'Matrice', judge: { kind: 'mat', expect: Mtext }, mode: 'free', script, hints, subgoals: SOL_SUB, key, fallback: d.fallback,
  });
}

function solExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 3);
    const tag = examTag({ exam });
    if (which === 0) {
      return tfL({
        skill: SOL, key: 'two-sol', truth: true, exam: tag,
        statement: t('Si Ax = b a deux solutions distinctes, il en a une infinité.'),
        explanation: t('Vrai : si u et v sont solutions, u − v ≠ 0 vérifie A(u − v) = 0, et u + t(u − v) est solution pour tout t.'),
      });
    }
    if (which === 1) {
      return tfL({
        skill: SOL, key: 'zero-row', truth: true, exam: tag,
        statement: t('Si une forme échelonnée de [A | b] a une ligne [0 … 0 | c] avec c ≠ 0, le système n\'a aucune solution.'),
        explanation: t('Vrai : cette ligne se lit 0 = c, une équation impossible.'),
      });
    }
    const wide = which === 3;
    const A = wide ? [[1, 1, 1], [1, 1, 1]] : [[1, 1], [1, 1]];
    return tfL({
      skill: SOL, key: wide ? 'wide' : 'ker-b', truth: false, exam: tag,
      statement: wide ? t('Un système qui a plus d\'inconnues que d\'équations a toujours une infinité de solutions.') : t('Si Ax = 0 a une infinité de solutions, alors Ax = b en a aussi une infinité, pour tout b.'),
      counter: {
        kind: 'matOne', params: { want: 'kerNoSolution', wide },
        ask: [{ v: 'A', label: 'A =', shape: [2, wide ? 3 : 2] }, { v: 'b', label: 'b =', shape: [2, 1] }],
        answer: { A: mt(MX.mat(A)), b: '(0 ; 1)' },
      },
      explanation: wide
        ? t('Faux : avec A = {A} et b = (0 ; 1), les deux équations disent {lhs} = 0 et = 1 : aucune solution. Plus d\'inconnues donne des variables libres, mais seulement si le système est compatible.', { A: MLm(MX.mat(A)), lhs: 'x₁ + x₂ + x₃' })
        : t('Faux : avec A = {A} et b = (0 ; 1), les deux équations disent {lhs} = 0 et = 1 : aucune solution. Ax = 0 décrit les directions ; encore faut-il que Ax = b ait une solution.', { A: MLm(MX.mat(A)), lhs: 'x₁ + x₂' }),
    });
  }
  const d = solData(rng, 4, { n: rng.pick([3, 4]), free: 1 });
  const T = solTexts(d);
  const ps = T.ps;
  const n = d.n;
  const sys = systemML(d.M.map((r) => r.slice(0, n)), d.M.map((r) => r[n]), VARS_IDX(n));
  const line = (p, dirs) => MLx(`x = ${p ? vt(p) : ''}${p && dirs.length ? ' + ' : ''}${dirs.map((v, k) => `${ps[k]}${vt(v)}`).join(' + ')}`, ps);
  const signed = d.dirs.map((v) => v.map((x, j) => (d.pivots.includes(j) ? x.neg() : x)));
  // « Une solution est… »: p + t₀v, among vectors that are not solutions.
  if (rng.chance(0.4)) {
    const t0 = rng.pick([1, -1, 2]);
    const at = (p, v) => p.map((x, j) => x.add(v[j].mul(t0)));
    const isSol = (x) => MX.matVec(d.M.map((r) => r.slice(0, n)), x).every((y, i) => y.eq(d.M[i][n]));
    const free = d.freeCols[0];
    const wrongs = [
      { x: at(d.p, signed[0]), rule: 'l_ker_sign' },
      { x: d.dirs[0].map((x) => x.mul(t0)), rule: 'l_rhs_forgotten' },
      { x: d.p.map((x, j) => (j === free ? q(t0) : x)), rule: null },
      { x: at(d.p.map((x) => x.neg()), d.dirs[0]), rule: null },
      { x: d.p.map((x, j) => (j === d.pivots[0] ? x.add(1) : x)), rule: null },
    ].filter((w) => !isSol(w.x));
    return mcqDistinct({
      skill: SOL, level: 4, key: `mcq1:${mt(d.M, n)}:${t0}`, exam: examTag({ exam }),
      prompt: t('Lequel de ces vecteurs est une solution du système {sys}', { sys }),
      right: MLv(at(d.p, d.dirs[0])),
      wrongs: wrongs.map((w) => ({ html: MLv(w.x), rule: w.rule })),
      solution: [{ html: MLx(T.final, ps), note: t('Solution générale') }, { html: `${ps[0]} = ${fq(q(t0))} : ${MLv(at(d.p, d.dirs[0]))}`, note: '' }],
    }, rng);
  }
  return mcqDistinct({
    skill: SOL, level: 4, key: `mcq:${mt(d.M, n)}`, exam: examTag({ exam }),
    prompt: t('La solution générale du système {sys} est :', { sys }),
    right: line(d.p, d.dirs),
    wrongs: [
      { html: line(d.p, []), rule: 'l_free_var_zero' },
      { html: line(d.p, signed), rule: 'l_ker_sign' },
      { html: line(null, d.dirs), rule: 'l_rhs_forgotten' },
    ],
    fillers: [{ html: line(d.p.map((x) => x.neg()), d.dirs) }, { html: line(d.p, d.dirs.map((v) => v.map((x, j) => (j === d.pivots[0] ? x.add(1) : x)))) }],
    solution: [{ html: t('Forme réduite : {MLm}', { MLm: MLm(d.R, n) }), note: '' }, { html: MLx(T.final, ps), note: '' }],
  }, rng);
}

// ======================================================================
// l-sys-param
// ======================================================================

const PAR = 'l-sys-param';
const PAR_SUB = [
  { id: 'down', label: t('descendre'), skill: ECH },
  { id: 'factor', label: t('factoriser'), skill: 'fac-trinomial' },
  { id: 'discuss', label: t('discuter'), skill: PAR },
];

// From the last row [0 0 f(a) | g(a)]: f = s(a − r₁)(a − r₂), g = m(a − r₁)
// (r₁: infinity, r₂: none). Echelon form E with E₁₁ = 1, A = L·E with L
// unit lower. quad (level 5, exams): L constant, a² in a₃₃ (2021 Q4,
// exam example 1); else the multiplier of L₁ in L₃ holds a, so that every
// entry of A has degree ≤ 1 (the symmetric template x + y + az = 1 …).
// Each case is checked on the system itself (ranks at r₁ and r₂).
function parData(rng, { quad = false } = {}) {
  for (let tries = 0; tries < 200; tries++) {
    const [r1, r2] = rng.shuffle([-3, -2, -1, 0, 1, 2, 3]).slice(0, 2);
    const s = quad ? rng.pick([1, 1, -1]) : rng.pick([1, -1]);
    const f = pscale(pmul(pc(-r1, 1), pc(-r2, 1)), s);
    const g = pscale(pc(-r1, 1), rng.pick([1, -1, 2, -2]));
    let E;
    let L;
    if (quad) {
      E = [[pc(1), pc(rng.int(-2, 2)), pc(rng.int(-2, 2)), pc(rng.int(-2, 2))], [[], pc(rng.pick([1, -1])), pc(rng.int(-3, 3)), pc(rng.int(-2, 2))], [[], [], f, g]];
      L = [pc(rng.pick([1, 2, -1, -2])), pc(rng.pick([1, -1, 2, 0])), pc(rng.pick([1, -1, 2, -2]))];
    } else {
      const sigma = rng.pick([1, -1]);
      E = [
        [pc(1), pc(rng.pick([1, -1, 2, 0])), pc(rng.int(-1, 1), -s * sigma), pc(rng.int(-2, 2))],
        [[], rng.chance(0.4) ? pscale(pc(-r1, 1), rng.pick([1, -1])) : pc(rng.pick([1, -1])), pc(rng.int(-2, 2), rng.chance(0.3) ? rng.pick([1, -1]) : 0), pc(rng.int(-2, 2))],
        [[], [], f, g],
      ];
      L = [pc(rng.pick([1, -1, 2, 0, 1])), pc(rng.int(-1, 1), sigma), pc(rng.pick([1, -1, 2, -2]))];
    }
    const [l21, l31, l32] = L;
    const A = [E[0], E[1].map((x, j) => padd(x, pmul(l21, E[0][j]))), E[2].map((x, j) => padd(padd(x, pmul(l31, E[0][j])), pmul(l32, E[1][j])))];
    if (A.flat().some((p) => p.some((c) => Math.abs(c.valueOf()) > 6))) continue;
    if (A.some((r, i) => r.some((p, j) => pdeg(p) > (quad && i === 2 && j === 2 ? 2 : 1)))) continue;
    const withA = A.flat().filter((p) => pdeg(p) >= 1).length;
    if (withA < 2 || withA > 5) continue;
    if (A.some((r) => r.slice(0, 3).filter((p) => p.length).length < 2)) continue;
    const el = elimP(A);
    if (!el || el.ops.length < 2) continue;
    if (el.steps.flat(2).some((p) => pdeg(p) > 2 || p.some((c) => c.d !== 1 || Math.abs(c.valueOf()) > 9))) continue;
    if (!el.E[2][2].every((c, i) => c.eq(f[i] ?? q(0))) || el.E[2][2].length !== f.length) continue;
    if (solKind(atP(A, r1), 3) !== 'inf' || solKind(atP(A, r2), 3) !== 'none' || solKind(atP(A, 7), 3) !== 'unique') continue;
    return { A, ...el, f, g, r1, r2, s };
  }
  const A = [[pc(1), pc(1), pc(0, 1), pc(1)], [pc(1), pc(0, 1), pc(1), pc(1)], [pc(0, 1), pc(1), pc(1), pc(1)]];
  return { A, ...elimP(A), f: pc(2, -1, -1), g: pc(1, -1), r1: 1, r2: -2, s: -1, fallback: true };
}

function parItem(level, rng) {
  const d = parData(rng, { quad: level === 5 });
  const Atext = pmt(d.A, 3);
  const sys = systemP(d.A, VARS3);
  const key = `${PAR}:${Atext}`;
  const lines = d.ops.map((op, k) => ({ kind: 'eq', math: `${popT(op)} : ${pmt(d.steps[k], 3)}`, note: t('Descendre sans diviser : {popR}', { popR: popR(op) }), subgoal: 'down', rows: d.steps[k], op }));
  const fT = ptext(d.f);
  const facT = factoredT(d.s, d.r1, d.r2);
  const g2 = peval(d.g, d.r2);
  const caseJudge = (r, other) => ({ kind: 'solset', v: 'a', sets: { S: `{${r}}` }, swapCase: `a=${other}` });
  const factorSeg = { kind: 'segment', html: t('Le dernier pivot est {MT}. Factorise-le.', { MT: MT(fT) }), ask: 'f(a) =', start: { math: fT }, judge: { kind: 'poly', v: 'a', target: 'factored-R' } };
  const factorLine = { kind: 'eq', math: facT, note: t('Ses zéros sont les valeurs de a à traiter à part'), subgoal: 'factor' };
  const infSeg = { kind: 'segment', html: t('Pour quelles valeurs de a le système a-t-il une infinité de solutions ?'), ask: 'a :', start: { math: 'S' }, judge: caseJudge(d.r1, d.r2) };
  const uniqueNote = { kind: 'note', html: t('Si a ∉ {setR}, le dernier pivot n\'est pas nul : une solution unique. Restent ces deux valeurs.', { setR: setR([d.r1, d.r2]) }) };
  const infLine = { kind: 'eq', math: `a=${d.r1}`, note: t('Pour a = {fq}, la dernière ligne devient 0 = 0', { fq: fq(d.r1) }), subgoal: 'discuss' };
  const noneSeg = { kind: 'segment', html: t('Pour quelles valeurs de a le système n\'a-t-il aucune solution ?'), ask: 'a :', start: { math: 'S' }, judge: caseJudge(d.r2, d.r1) };
  const noneLine = { kind: 'eq', math: `a=${d.r2}`, note: t('Pour a = {fq}, la dernière ligne devient 0 = {fq2}', { fq: fq(d.r2), fq2: fq(g2) }), subgoal: 'discuss' };
  const holed = facT.replace(/\(a[+-]\d\)$|a$/, '(□)').replace(/-/g, '−');
  const hints = [
    { level: 1, html: t('Échelonne sans diviser par une expression en a, puis regarde la dernière ligne [0 0 f(a) | g(a)] : f(a) ≠ 0, unique ; f(a) = 0 et g(a) ≠ 0, aucune ; f(a) = g(a) = 0, une infinité.') },
    { level: 2, html: t('f(a) = {holed} ; une infinité pour a = □ ; aucune pour a = □.', { holed }) },
    { level: 3, html: t('f(a) = {MT} ; une infinité pour a = {fq} ; aucune pour a = {fq2} ; une solution unique sinon.', { MT: MT(facT), fq: fq(d.r1), fq2: fq(d.r2) }) },
  ];
  const divDecision = {
    kind: 'decision', prompt: t('La dernière ligne est [0, 0, {pR} | {pR2}]. Que fais-tu ?', { pR: pR(d.f), pR2: pR(d.g) }), options: rng.shuffle([
      { id: 'factor', label: t('Factoriser le pivot et traiter à part les valeurs qui l\'annulent'), valid: true },
      { id: 'divide', label: t('Diviser la ligne par le pivot pour avoir un 1'), valid: false, rule: 'l_param_divide_zero', why: t('Le pivot s\'annule pour a = {fq} et a = {fq2} : on ne divise pas par 0. On traite ces valeurs à part.', { fq: fq(d.r1), fq2: fq(d.r2) }) },
    ]),
  };
  const judge = { kind: 'rowops', vars: ['a'], goal: 'echelon', multi: level >= 4 };
  const tail = [factorSeg, ...(level === 2 ? [divDecision] : []), factorLine, infSeg, uniqueNote, infLine, noneSeg, noneLine];
  const body = level <= 2 ? lines.map((l) => withCells(l, pickCells(l.rows, [l.op.i], level === 1 ? 2 : 3, rng))) : lines;
  const script = [...body.map(({ rows, op, ...l }) => l), ...tail];
  return matLines({
    skill: PAR, level,
    prompt: level === 3
      ? t('Discute selon le paramètre réel a les solutions du système {sys} Choisis chaque opération de sa matrice augmentée, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n\'en donnent aucune.', { sys })
      : t('Discute selon le paramètre réel a les solutions du système {sys} Échelonne sa matrice augmentée sans diviser par une expression de a, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n\'en donnent aucune.', { sys }),
    start: Atext, judge, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints, subgoals: PAR_SUB, key, tapActions: level === 3 ? 'rowops' : null, fallback: d.fallback, keys: ['mat', 'calc'],
    // The baits of the row-operation traps, without replaying them (a CAS
    // computation per entry in ℚ(a)).
    baits: ['l_rhs_forgotten', 'l_rowop_sign', 'l_rowop_wrong_row', ...(d.ops.some((op) => op.k.length === 1 && Math.abs(op.k[0].valueOf()) !== 1) ? ['l_rowop_partial'] : []), ...(level === 2 ? ['l_param_divide_zero'] : []), 'l_param_none_vs_inf'],
  });
}

function parExam(rng, exam) {
  const d = parData(rng, { quad: rng.chance(0.6) });
  const sys = systemP(d.A, VARS3);
  const { r1, r2 } = d;
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const which = rng.int(0, 2);
    if (which === 0) {
      return tfL({
        skill: PAR, key: 'finite', truth: true, exam: tag,
        statement: t('Un système carré à paramètre a. S\'il a une solution unique pour a = 0, alors il a une solution unique pour tout a, sauf pour un nombre fini de valeurs.'),
        explanation: t('Vrai : det A(a) est un polynôme en a, non nul puisque det A(0) ≠ 0. Il n\'a qu\'un nombre fini de racines.'),
      });
    }
    if (which === 1) {
      return tfL({
        skill: PAR, key: `none:${pmt(d.A, 3)}`, truth: true, exam: tag, ruleIfFalse: 'l_param_none_vs_inf',
        statement: t('Pour a = {fq}, le système {sys} n\'a aucune solution.', { fq: fq(r2), sys }),
        explanation: t('Vrai : échelonné sans diviser, la dernière ligne est [0, 0, {pR} | {pR2}]. Pour a = {fq}, elle devient 0 = {fq2}.', { pR: pR(d.f), pR2: pR(d.g), fq: fq(r2), fq2: fq(peval(d.g, r2)) }),
      });
    }
    return tfL({
      skill: PAR, key: `unique:${pmt(d.A, 3)}`, truth: false, exam: tag, ruleIfTrue: 'l_param_divide_zero',
      statement: t('Le système {sys} a une solution unique pour tout a ≠ {fq}.', { sys, fq: fq(r1) }),
      counter: {
        kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R' }], pred: `a=${r1} ∨ ${ptext(d.f)}≠0`,
        ask: [{ v: 'a', label: 'a =' }], answer: { a: String(r2) },
      },
      explanation: t('Faux : le dernier pivot vaut {MT}, qui s\'annule aussi pour a = {fq}. Alors la dernière ligne devient 0 = {fq2} : aucune solution.', { MT: MT(factoredT(d.s, r1, r2)), fq: fq(r2), fq2: fq(peval(d.g, r2)) }),
    });
  }
  if (exam === 'coef') {
    const names = VARS3;
    for (const a0 of rng.shuffle([-4, -3, -2, -1, 0, 1, 2, 3, 4, 5]).filter((x) => x !== r1 && x !== r2)) {
      const M = atP(d.A, a0);
      const inv = MX.inverse(M.map((r) => r.slice(0, 3)));
      const x = MX.matVec(inv, M.map((r) => r[3]));
      const j = [0, 1, 2].filter((k) => x[k].d <= 12 && Math.abs(x[k].valueOf()) <= 20).sort((u, v) => x[u].d - x[v].d)[0];
      if (j === undefined) continue;
      return coefItem({
        skill: PAR, level: 4, prompt: t('Soit le système {sys} Pour a = {fq}, il a une solution unique. Que vaut {x} ?', { sys, fq: fq(a0), x: names[j] }),
        label: names[j], value: qt(x[j]), key: `${pmt(d.A, 3)}:${a0}:${j}`, exam: tag,
        traps: [{ rule: 'l_rowop_sign' }],
        solution: [{ html: t('Pour a = {fq} : {systemP}', { fq: fq(a0), systemP: systemP(d.A.map((r) => r.map((p) => pc(peval(p, a0)))), VARS3) }), note: '' }, { html: `${names[j]} = ${fq(x[j])}`, note: '' }], fallback: d.fallback,
      });
    }
  }
  // mcq: one true statement, and three of the traps.
  // One full sentence per case (a key of the dictionary each).
  const INF = 'inf';
  const NONE = 'none';
  const ONE = 'one';
  const ATLEAST = 'atleast';
  const S = (k, set) => ({
    inf: () => t('Le système a une infinité de solutions si et seulement si a {set}.', { set }),
    none: () => t('Le système n\'a aucune solution si et seulement si a {set}.', { set }),
    one: () => t('Le système a une solution unique si et seulement si a {set}.', { set }),
    atleast: () => t('Le système a au moins une solution si et seulement si a {set}.', { set }),
  })[k]();
  const both = setR([Math.min(r1, r2), Math.max(r1, r2)]);
  const trues = [S(INF, `= ${fq(r1)}`), S(NONE, `= ${fq(r2)}`), S(ONE, `∉ ${both}`), S(ATLEAST, `≠ ${fq(r2)}`)];
  const swaps = [S(INF, `= ${fq(r2)}`), S(NONE, `= ${fq(r1)}`), S(ATLEAST, `≠ ${fq(r1)}`), S(NONE, `∈ ${both}`)];
  const lost = [S(ONE, `≠ ${fq(r2)}`), S(ONE, `≠ ${fq(r1)}`)];
  return mcqDistinct({
    skill: PAR, level: 4, key: `mcq:${pmt(d.A, 3)}`, exam: tag,
    prompt: t('Soit a un paramètre réel et le système {sys} Une seule affirmation est vraie :', { sys }),
    right: rng.pick(trues),
    wrongs: [{ html: rng.pick(swaps), rule: 'l_param_none_vs_inf' }, { html: rng.pick(lost), rule: 'l_param_divide_zero' }, { html: S(ATLEAST, `∉ ${both}`), rule: null }],
    fillers: swaps.map((html) => ({ html, rule: 'l_param_none_vs_inf' })),
    solution: [
      { html: t('Dernière ligne échelonnée : [0, 0, {pR} | {pR2}]', { pR: pR(d.f), pR2: pR(d.g) }), note: t('Sans diviser') },
      { html: t('a ∉ {both} : unique ; a = {fq} : une infinité ; a = {fq2} : aucune.', { both, fq: fq(r1), fq2: fq(r2) }), note: '' },
    ],
  }, rng);
}

// ======================================================================
// l-vec-span
// ======================================================================

const SPAN = 'l-vec-span';
const SPAN_SUB = [
  { id: 'cols', label: t('mettre en colonnes'), skill: SPAN },
  { id: 'echelon', label: t('échelonner'), skill: ECH },
  { id: 'conclude', label: t('conclure'), skill: SPAN },
];

// The lines of an elimination by constant operations on a matrix whose
// last column holds polynomials in h: rows of polynomials after each op.
const constOps = (ops) => ops.map((op) => ({ i: op.i, j: op.j, k: pc(op.k) }));
function lastZeroRow(left, col, ops) {
  let rows = left.map((r, i) => [...r.map((x) => pc(x)), col[i]]);
  for (const op of constOps(ops)) rows = applyP(rows, op);
  return rows;
}
// The value of h that makes the zero rows consistent (one zero row), or null.
function hRoot(rows, k) {
  const zero = rows.filter((r) => r.slice(0, k).every((p) => !p.length));
  if (zero.length !== 1) return null;
  const p = zero[0][k];
  if (pdeg(p) !== 1) return null;
  return p[0].neg().div(p[1]);
}

// b = Vc (in), b = Vc + w with w ⊥ Col V (out), or one component of b
// replaced by h (param: b ∈ Span ⇔ h = h*). V = M·[I; 0], M unimodular.
function spanData(rng, level, { kind = 'in', n: n0, k: k0 } = {}) {
  for (let tries = 0; tries < 200; tries++) {
    const n = n0 ?? (level >= 4 && kind === 'in' ? rng.pick([3, 4]) : 3);
    const k = k0 ?? (n === 4 && rng.chance(0.4) ? 3 : 2);
    const { A: V, fallback } = rrefWith(n, k, [...Array(k).keys()], rng, { max: 3 });
    if (fallback || V.flat().some((x) => Math.abs(x.valueOf()) > 5)) continue;
    const c = Array.from({ length: k }, () => q(nz(rng, -3, 3)));
    let b = MX.matVec(V, c);
    if (kind === 'out') {
      let w = MX.kernel(MX.transpose(V))[0];
      const den = w.reduce((l, x) => (l * x.d) / gcd(l, x.d), 1);
      const sign = rng.pick([1, -1]);
      w = w.map((x) => x.mul(den * sign));
      if (w.some((x) => Math.abs(x.valueOf()) > 3)) continue;
      b = b.map((x, i) => x.add(w[i]));
      if (MX.rank(V.map((r, i) => [...r, b[i]])) === k) continue;
    }
    if (b.some((x) => Math.abs(x.valueOf()) > 12) || b.every((x) => x.n === 0)) continue;
    const M = V.map((r, i) => [...r, b[i]]);
    const e = MX.echelon(M, { cols: k });
    if (e.ops.length < 2 || e.ops.length > (level >= 4 ? 6 : 4)) continue;
    if (e.ops.some((op) => op.kind === 'swap' || (op.k && op.k.d > 2))) continue;
    let X = M;
    let ok = true;
    for (const op of e.ops) { X = MX.applyOp(X, op); if (X.flat().some((x) => x.d > 2 || Math.abs(x.valueOf()) > 15)) ok = false; }
    if (!ok) continue;
    // The kind of the system, checked: b in the span with weights c, or not.
    if (MX.rank(V) !== k || (MX.rank(M) === k) !== (kind !== 'out') || (kind !== 'out' && !MX.matVec(V, c).every((x, i) => x.eq(b[i])))) continue;
    const out = { V, c, b, M, ops: e.ops, E: e.E, n, k, kind };
    if (kind === 'param') {
      const p = rng.int(0, n - 1);
      const col = b.map((x, i) => (i === p ? pc(0, 1) : pc(x)));
      const rows = lastZeroRow(V, col, e.ops);
      const h = hRoot(rows, k);
      if (!h || !h.eq(b[p])) continue;
      // The same with the sign of the first operation changed.
      const bad = { ...e.ops[0], k: e.ops[0].k.neg() };
      const left2 = MX.applyOp(V, bad);
      const col2 = applyP(col.map((x) => [x]), { i: bad.i, j: bad.j, k: pc(bad.k) }).map((r) => r[0]);
      const h2 = hRoot(lastZeroRow(left2, col2, MX.echelon(left2).ops), k);
      return { ...out, p, h, col, signH: h2 && !h2.eq(h) ? h2 : null };
    }
    return out;
  }
  const V = MX.mat([[1, 1], [1, -1], [1, 2]]);
  const b = MX.mat([[3, 1, 4]])[0];
  const M = V.map((r, i) => [...r, b[i]]);
  const e = MX.echelon(M, { cols: 2 });
  return { V, c: [q(2), q(1)], b, M, ops: e.ops, E: e.E, n: 3, k: 2, kind: 'in', fallback: true };
}
function gcd(a, b) { return b ? gcd(b, a % b) : Math.abs(a); }

const vName = (i) => `v${sub(i + 1)}`;
const qabs = (x) => (x.n < 0 ? x.neg() : x);
// The coefficients of a polynomial of P₂, the one of t^p written h.
function polyH(cs, p, v = 't') {
  const parts = [];
  cs.forEach((c, k) => {
    const mono = k === 0 ? '' : k === 1 ? v : `${v}${'⁰¹²³'[k]}`;
    if (k === p) { parts.push({ neg: false, s: k === 0 ? 'h' : `h${mono}` }); return; }
    if (c.n === 0) return;
    const abs = c.n < 0 ? c.neg() : c;
    parts.push({ neg: c.n < 0, s: `${k === 0 || !abs.eq(1) ? fq(abs) : ''}${mono}` });
  });
  if (!parts.length) return '0';
  return parts.map((x, i) => (i === 0 ? `${x.neg ? '−' : ''}${x.s}` : ` ${x.neg ? '−' : '+'} ${x.s}`)).join('');
}

function spanItem(level, rng) {
  const kind = level === 5 ? 'param' : level === 4 && rng.chance(0.25) ? 'out' : 'in';
  const poly = kind !== 'out' && (level === 5 || level === 4) && rng.chance(0.4);
  const d = spanData(rng, level, { kind, n: poly ? 3 : undefined, k: poly ? 2 : undefined });
  const { k, n } = d;
  const vars = d.kind === 'param' ? ['h'] : [];
  const leftT = (r) => r.map(qt);
  const Mtext = d.kind === 'param'
    ? `[${d.V.map((r, i) => `[${leftT(r).join(',')}|${ptext(d.col[i], 'h')}]`).join(',')}]`
    : mt(d.M, k);
  const names = [...Array(k).keys()].map(vName);
  const bText = d.kind === 'param' ? `(${d.col.map((p) => ptext(p, 'h')).join(' ; ')})` : vt(d.b);
  const isPoly = poly && d.kind !== 'out' && n === 3;
  const cols = MX.transpose(d.V);
  const given = isPoly
    ? `${cols.map((c0, i) => `p${sub(i + 1)} = ${polyR(c0)}`).join(', ')} et q = ${d.kind === 'param' ? polyH(d.b, d.p) : polyR(d.b)}`
    : `${cols.map((c0, i) => `${vName(i)} = ${MLm(c0.map((x) => [x]))}`).join(', ')} et b = ${ML(bText, { vars })}`;
  const target = isPoly ? 'q' : 'b';
  const spanOf = isPoly ? `Span{${cols.map((_, i) => `p${sub(i + 1)}`).join(', ')}}` : `Span{${names.join(', ')}}`;
  const key = `${SPAN}:${Mtext}`;
  // Lines of the elimination (the last column with h in the param case).
  let rows = d.V.map((r, i) => [...r.map((x) => pc(x)), d.kind === 'param' ? d.col[i] : pc(d.b[i])]);
  const lines = d.ops.map((op) => {
    const pop = { i: op.i, j: op.j, k: pc(op.k) };
    rows = applyP(rows, pop);
    return { kind: 'eq', math: `${opT(op)} : ${pmt(rows, k, 'h')}`, note: t('Annuler sous le pivot : {opR}', { opR: opR(op) }), subgoal: 'echelon', rows, op };
  });
  const colsSeg = { kind: 'eq', math: Mtext, note: isPoly ? t('Les coefficients de chaque polynôme en colonnes, {target} après la barre', { target }) : t('Les vecteurs en colonnes, {target} après la barre', { target }), subgoal: 'cols' };
  const ech = { kind: 'segment', html: t('Échelonne cette matrice.'), start: { math: Mtext }, judge: { kind: 'rowops', goal: 'echelon', vars, multi: level >= 4 } };
  const last = rows.find((r) => r.slice(0, k).every((p) => !p.length) && r[k].length) ?? rows[rows.length - 1];
  let concl;
  if (d.kind === 'in') {
    concl = [
      { kind: 'segment', html: t('Lis les poids : {target} = {x}.', { target, x: [...Array(k).keys()].map((i) => `c${sub(i + 1)}${isPoly ? `p${sub(i + 1)}` : vName(i)}`).join(' + ') }), ask: `(${[...Array(k).keys()].map((i) => `c${sub(i + 1)}`).join(' ; ')}) =`, start: { math: 'c' }, judge: { kind: 'mat', expect: vt(d.c) } },
      { kind: 'eq', math: vt(d.c), note: t('{target} = {x} : {target} est dans le Span', { target, x: d.c.map((x, i) => `${i ? (x.n < 0 ? ' − ' : ' + ') : x.n < 0 ? '−' : ''}${qabs(x).eq(1) ? '' : fq(qabs(x))}${isPoly ? `p${sub(i + 1)}` : vName(i)}`).join('') }), subgoal: 'conclude' },
    ];
  } else if (d.kind === 'out') {
    concl = [
      { kind: 'segment', html: t('Combien de solutions a ce système ?'), ask: t('nombre de solutions ='), start: { math: 'N' }, judge: { kind: 'value', expect: '0' } },
      { kind: 'eq', math: '0', note: t('La ligne [0 … 0 | {fq}] se lit 0 = {fq} : {target} n\'est pas dans {spanOf}', { fq: fq(last[k][0] ?? q(0)), target, spanOf }), subgoal: 'conclude' },
    ];
  } else {
    concl = [
      { kind: 'segment', html: isPoly ? t('Pour quelle valeur de h le polynôme q est-il dans {spanOf} ?', { spanOf }) : t('Pour quelle valeur de h le vecteur b est-il dans {spanOf} ?', { spanOf }), ask: 'h =', start: { math: 'h' }, judge: { kind: 'value', expect: qt(d.h) } },
      { kind: 'eq', math: qt(d.h), note: t('La ligne [0 0 | {ptext}] doit se lire 0 = 0', { ptext: ptext(rows.find((r) => r.slice(0, k).every((p) => !p.length))[k], 'h').replace(/-/g, '−') }), subgoal: 'conclude' },
    ];
  }
  const firstAdd = lines[0];
  const hints = [
    { level: 1, html: isPoly ? t('Mets les coefficients des polynômes en colonnes, et {target} en dernière colonne : {target} est dans le Span si et seulement si ce système est compatible.', { target }) : t('Mets les vecteurs en colonnes, et {target} en dernière colonne : {target} est dans le Span si et seulement si ce système est compatible.', { target }) },
    { level: 2, html: t('{opR} : la ligne {x} devient {rowHoles}.', { opR: opR(firstAdd.op), x: firstAdd.op.i + 1, rowHoles: rowHoles(MX.applyOp(d.M, firstAdd.op), firstAdd.op.i, k) }) },
    { level: 3, html: `${ML(Mtext, { vars })} ; ${concl[concl.length - 1].note}.` },
  ];
  const decision = {
    kind: 'decision', prompt: t('Comment ranger les données dans la matrice ?'), options: rng.shuffle([
      { id: 'cols', label: isPoly ? t('Les coefficients de chaque polynôme en colonne, {target} en dernière colonne', { target }) : t('Chaque vecteur en colonne, {target} en dernière colonne', { target }), valid: true },
      { id: 'rows', label: isPoly ? t('Les coefficients de chaque polynôme en ligne, {target} en dernière ligne', { target }) : t('Chaque vecteur en ligne, {target} en dernière ligne', { target }), valid: false, rule: 'l_matrix_rows_cols', why: isPoly ? t('On cherche des poids c avec c₁p₁ + c₂p₂ = {target} : chaque équation porte sur une composante, donc chaque polynôme est une colonne.', { target }) : t('On cherche des poids c avec c₁v₁ + c₂v₂ = {target} : chaque équation porte sur une composante, donc chaque vecteur est une colonne.', { target }) },
    ]),
  };
  const body = level <= 2 ? lines.map((l) => withCells(l, pickCells(l.rows, [l.op.i], level === 1 ? 2 : 3, rng))) : lines;
  const script = [
    ...(level === 2 ? [decision] : []),
    level === 1 ? withCells(colsSeg, pickCells(d.M, [...Array(n).keys()], 2, rng)) : colsSeg,
    ech, ...body.map(({ rows: r0, op, ...l }) => l), ...concl,
  ];
  const ask = d.kind === 'param' ? (isPoly ? t('Pour quelle valeur de h le polynôme q appartient-il à {spanOf} ?', { spanOf }) : t('Pour quelle valeur de h le vecteur b appartient-il à {spanOf} ?', { spanOf })) : t('{target} appartient-il à {spanOf} ? Si oui, avec quels poids ?', { target, spanOf });
  return matLines({
    skill: SPAN, level,
    prompt: level === 3 ? t('Soit {given}. {ask} Écris la matrice, puis choisis chaque opération.', { given, ask }) : t('Soit {given}. {ask} Écris la matrice du système, échelonne-la, puis conclus.', { given, ask }),
    start: 'Matrice', judge: { kind: 'mat', expect: Mtext, vars, rowsCols: true }, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints, subgoals: SPAN_SUB, key, tapActions: level === 3 ? 'rowops' : null, fallback: d.fallback,
  });
}

function spanExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const which = rng.int(0, 3);
    if (which === 0) {
      return tfL({
        skill: SPAN, key: 'subspace', truth: true, exam: tag,
        statement: t('Si un sous-espace H contient p et q, alors il contient p + q et 3p − 2q.'),
        explanation: t('Vrai : un sous-espace est stable par somme et par multiplication par un nombre, donc par toute combinaison linéaire.'),
      });
    }
    if (which === 1) {
      return tfL({
        skill: SPAN, key: 'zero', truth: true, exam: tag,
        statement: t('Le vecteur nul appartient à Span{v₁, …, v_k}, quels que soient v₁, …, v_k.'),
        explanation: t('Vrai : 0 = 0·v₁ + … + 0·v_k.'),
      });
    }
    if (which === 2) {
      return tfL({
        skill: SPAN, key: 'ax', truth: true, exam: tag,
        statement: t('Pour une matrice A de taille m × n et x dans ℝⁿ, Ax est une combinaison linéaire des colonnes de A.'),
        explanation: t('Vrai : Ax = x₁a₁ + … + xₙaₙ, où a₁, …, aₙ sont les colonnes de A.'),
      });
    }
    return tfL({
      skill: SPAN, key: 'plane', truth: false, exam: tag,
      statement: t('Pour deux vecteurs u et v de ℝ³, Span{u, v} est toujours un plan.'),
      counter: { kind: 'vecFamily', params: { want: 'spanNotPlane' }, ask: [{ v: 'F', label: 'u, v =' }], answer: { F: '(1 ; 0 ; 0), (2 ; 0 ; 0)' } },
      explanation: t('Faux : si v = 2u, Span{u, v} = Span{u} est une droite (et un point si u = v = 0).'),
    });
  }
  const d = spanData(rng, 4, { kind: 'param', n: 3, k: 2 });
  const isPoly = rng.chance(0.5);
  const cols = MX.transpose(d.V);
  const given = isPoly
    ? `${cols.map((c0, i) => `p${sub(i + 1)} = ${polyR(c0)}`).join(', ')} et q = ${polyH(d.b, d.p)}`
    : `${cols.map((c0, i) => `${vName(i)} = ${MLm(c0.map((x) => [x]))}`).join(', ')} et b = ${ML(`(${d.col.map((p) => ptext(p, 'h')).join(' ; ')})`, { vars: ['h'] })}`;
  const target = isPoly ? 'q' : 'b';
  const spanOf = isPoly ? 'Span{p₁, p₂}' : 'Span{v₁, v₂}';
  const right = d.h;
  const sumC = d.c.reduce((s, x) => s.add(x), q(0));
  return mcqDistinct({
    skill: SPAN, level: 4, key: `mcq:${mt(d.M, 2)}:${d.p}`, exam: tag,
    prompt: t('Soit {given}. {target} appartient à {spanOf} lorsque h =', { given, target, spanOf }),
    right: fq(right),
    wrongs: [d.signH ? { html: fq(d.signH), rule: 'l_rowop_sign' } : null, { html: fq(sumC), rule: null }].filter(Boolean),
    fillers: [{ html: fq(right.neg()) }, { html: fq(right.add(1)) }, { html: fq(right.sub(1)) }, { html: fq(right.add(2)) }],
    solution: [{ html: t('{target} = {x} pour h = {fq}', { target, x: d.c.map((x, i) => `${i && x.n > 0 ? '+' : ''}${fq(x)}·${isPoly ? `p${sub(i + 1)}` : vName(i)}`).join(' '), fq: fq(right) }), note: t('Le système [v₁ v₂ | b] est compatible') }],
  }, rng);
}

// ======================================================================
// l-vec-indep
// ======================================================================

const IND = 'l-vec-indep';
const IND_SUB = [
  { id: 'cols', label: t('vecteurs en colonnes'), skill: IND },
  { id: 'echelon', label: t('échelonner'), skill: ECH },
  { id: 'discuss', label: t('discuter'), skill: PAR },
  { id: 'relation', label: t('relation'), skill: IND },
];

// Free: V = M·[I; 0]. Linked: v₃ = c₁v₁ + c₂v₂. Kernel vector (c₁ ; c₂ ; −1).
function indData(rng, level, { dep, n: n0 } = {}) {
  for (let tries = 0; tries < 200; tries++) {
    const n = n0 ?? (level >= 4 ? rng.pick([3, 4]) : 3);
    let V;
    let rel = null;
    if (dep) {
      const { A, fallback } = rrefWith(n, 2, [0, 1], rng, { max: 3 });
      if (fallback) continue;
      const c = [nz(rng, -2, 2), nz(rng, -2, 2)];
      V = A.map((r) => [r[0], r[1], r[0].mul(c[0]).add(r[1].mul(c[1]))]);
      rel = c[0] < 0 ? [q(-c[0]), q(-c[1]), q(1)] : [q(c[0]), q(c[1]), q(-1)];
    } else {
      const { A, fallback } = rrefWith(n, 3, [0, 1, 2], rng, { max: 3 });
      if (fallback) continue;
      V = A;
    }
    if (V.flat().some((x) => Math.abs(x.valueOf()) > 6)) continue;
    if (MX.rank(V) !== (dep ? 2 : 3) || (dep && !MX.matVec(V, rel).every((x) => x.n === 0))) continue;
    if (MX.transpose(V).some((c) => c.every((x) => x.n === 0))) continue;
    const e = MX.echelon(V);
    if (e.ops.length < 2 || e.ops.length > (level >= 4 ? 6 : 4)) continue;
    if (e.ops.some((op) => op.kind === 'swap' || (op.k && op.k.d > 2))) continue;
    let X = V;
    let ok = true;
    for (const op of e.ops) { X = MX.applyOp(X, op); if (X.flat().some((x) => x.d > 2 || Math.abs(x.valueOf()) > 15)) ok = false; }
    if (!ok) continue;
    return { V, ops: e.ops, E: e.E, n, dep: !!dep, rel, rank: e.pivots.length };
  }
  const V = MX.mat([[1, 2, 4], [0, 1, 1], [1, 3, 5]]);
  return { V, ...MX.echelon(V), n: 3, dep: true, rel: [q(2), q(1), q(-1)], rank: 2, fallback: true };
}

// Pivots 1, σ(a − r₁), τ(a − r₂): A = L·E, L unit lower (its (3, 1)
// entry may hold a). Linked ⇔ a ∈ {r₁ ; r₂}.
function indParam(rng) {
  for (let tries = 0; tries < 200; tries++) {
    const [r1, r2] = rng.shuffle([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7]).slice(0, 2);
    if (Math.abs(r1) > 3 && Math.abs(r2) > 3) continue;
    const E = [
      [pc(1), pc(rng.int(-2, 2)), pc(rng.int(-2, 2))],
      [[], pscale(pc(-r1, 1), rng.pick([1, -1])), pc(rng.int(-3, 3))],
      [[], [], pscale(pc(-r2, 1), rng.pick([1, -1]))],
    ];
    const l21 = pc(rng.pick([0, 1, -1, 2]));
    const l31 = rng.chance(0.5) ? pc(rng.int(-1, 1), rng.pick([1, -1])) : pc(rng.pick([1, -1, 2, 0]));
    const l32 = pc(rng.pick([1, -1, 2, -2]));
    const A = [E[0], E[1].map((x, j) => padd(x, pmul(l21, E[0][j]))), E[2].map((x, j) => padd(padd(x, pmul(l31, E[0][j])), pmul(l32, E[1][j])))];
    if (A.flat().some((p) => pdeg(p) > 1 || p.some((c) => Math.abs(c.valueOf()) > 7))) continue;
    const withA = A.flat().filter((p) => pdeg(p) >= 1).length;
    if (withA < 2 || withA > 5) continue;
    if (MX.transpose(A).some((c) => c.every((p) => !p.length))) continue;
    const el = elimP(A);
    if (!el || el.ops.length < 2) continue;
    if (el.steps.flat(2).some((p) => pdeg(p) > 2 || p.some((c) => c.d !== 1 || Math.abs(c.valueOf()) > 12))) continue;
    if (MX.rank(atP(A, r1)) === 3 || MX.rank(atP(A, r2)) === 3 || MX.rank(atP(A, 11)) !== 3) continue;
    return { A, ...el, r1, r2 };
  }
  const A = [[pc(1), pc(2), pc(1)], [[], pc(0, 1), pc(3)], [pc(0, 1), [], pc(1)]];
  return { A, ...elimP(A), r1: 0, r2: 7, fallback: true };
}

const D_NAMES = { R: 'v', P: 'p', M: 'M' };
// The family as the student reads it: vectors of ℝⁿ, polynomials of P₂ or
// P₃ (coordinates in 1, t, t², t³), matrices of M₂ₓ₂ (row by row).
function familyHtml(cols, shape) {
  return cols.map((c, i) => {
    const name = `${D_NAMES[shape]}${sub(i + 1)}`;
    if (shape === 'P') return `${name} = ${polyR(c)}`;
    if (shape === 'M') return `${name} = ${MLm([[c[0], c[1]], [c[2], c[3]]])}`;
    return `${name} = ${MLm(c.map((x) => [x]))}`;
  }).join(', ');
}

function indItem(level, rng) {
  if (level === 5) return indParamItem(level, rng);
  const dep = rng.chance(0.55);
  const d = indData(rng, level, { dep });
  const n = d.n;
  const shape = level >= 4 ? rng.pick(['R', 'P', n === 4 ? 'M' : 'P']) : level === 3 ? 'R' : rng.pick(['R', 'R', 'P']);
  const cols = MX.transpose(d.V);
  const Vtext = mt(d.V);
  const name = (i) => `${D_NAMES[shape]}${sub(i + 1)}`;
  const key = `${IND}:${Vtext}`;
  const lines = opLines(d.V, d.ops, { note: (op) => t('Annuler sous le pivot : {opR}', { opR: opR(op) }), subgoal: 'echelon' });
  const writeLine = { kind: 'eq', math: Vtext, note: shape === 'R' ? t('Les vecteurs en colonnes') : shape === 'P' ? t('Les coefficients (1, t, t²…) en colonnes') : t('Les coefficients, ligne par ligne, en colonnes'), subgoal: 'cols' };
  const ech = { kind: 'segment', html: t('Échelonne cette matrice.'), start: { math: Vtext }, judge: { kind: 'rowops', goal: 'echelon', multi: level >= 4 } };
  const verdict = {
    kind: 'decision', prompt: t('La famille est-elle libre ?'), options: [
      { id: 'free', label: t('Libre : un pivot dans chaque colonne'), valid: !d.dep, why: d.dep ? t('La 3e colonne n\'a pas de pivot : il y a une variable libre, donc une relation non nulle.') : undefined },
      { id: 'dep', label: t('Liée : une colonne sans pivot'), valid: d.dep, why: d.dep ? undefined : t('Chaque colonne a un pivot : [v₁ v₂ v₃]x = 0 n\'a que la solution nulle.') },
    ],
  };
  const relText = (r) => r.map((x, i) => `${i ? (x.n < 0 ? ' − ' : ' + ') : x.n < 0 ? '−' : ''}${qabs(x).eq(1) ? '' : fq(qabs(x))}${name(i)}`).join('');
  const concl = d.dep
    ? [{ kind: 'segment', html: t('Donne une relation c₁{name} + c₂{name2} + c₃{name3} = 0, avec des cᵢ non tous nuls.', { name: name(0), name2: name(1), name3: name(2) }), ask: '(c₁ ; c₂ ; c₃) =', start: { math: 'c' }, judge: { kind: 'span', basis: [vt(d.rel)], require: 'basis' } },
      ...(level >= 2 ? [verdict] : [{ kind: 'note', html: t('La 3e colonne n\'a pas de pivot : la famille est liée.') }]),
      { kind: 'eq', math: vt(d.rel), note: `${relText(d.rel)} = 0`, subgoal: 'relation' }]
    : [{ kind: 'segment', html: t('Combien de pivots ?'), ask: t('nombre de pivots ='), start: { math: 'r' }, judge: { kind: 'value', expect: '3' } },
      ...(level >= 2 ? [verdict] : [{ kind: 'note', html: t('Un pivot dans chaque colonne : la famille est libre.') }]),
      { kind: 'eq', math: '3', note: t('Un pivot dans chaque colonne : libre'), subgoal: 'relation' }];
  const method = {
    kind: 'decision', prompt: t('Quelle méthode ?'), options: rng.shuffle([
      { id: 'gauss', label: t('Échelonner la matrice des vecteurs (en colonnes)'), valid: true },
      ...(n === 3 ? [{ id: 'det', label: t('Calculer le déterminant de cette matrice'), valid: true, quality: 'poor', why: t('Juste aussi pour une matrice carrée, mais si la famille est liée, le déterminant ne donne pas la relation.') }] : []),
      { id: 'pairs', label: t('Vérifier que les vecteurs sont deux à deux non colinéaires'), valid: false, why: t('Ça ne suffit pas : trois vecteurs peuvent être liés sans que deux soient colinéaires, comme (1 ; 0), (0 ; 1) et (1 ; 1).') },
    ]),
  };
  const hints = [
    { level: 1, html: t('Libre ⇔ un pivot dans chaque colonne de la matrice des vecteurs (en colonnes).') },
    { level: 2, html: t('{opR} : la ligne {x} devient {rowHoles}.', { opR: opR(lines[0].op), x: lines[0].op.i + 1, rowHoles: rowHoles(lines[0].result, lines[0].op.i) }) },
    { level: 3, html: d.dep ? t('Forme échelonnée {MLm} : la 3e colonne n\'a pas de pivot ; {relText} = 0.', { MLm: MLm(d.E), relText: relText(d.rel) }) : t('Forme échelonnée {MLm} : trois pivots, la famille est libre.', { MLm: MLm(d.E) }) },
  ];
  const fam = familyHtml(cols, shape);
  if (level === 1) {
    const script = [...lines.map((l) => withCells(l, pickCells(l.result, [l.op.i], 2, rng))), ...concl];
    return matLines({
      skill: IND, level, prompt: t('La famille {fam} est-elle libre ? Échelonne la matrice de ses vecteurs, puis conclus.', { fam }),
      start: Vtext, judge: ech.judge, mode: 'guided', script, hints, subgoals: IND_SUB, key, fallback: d.fallback,
    });
  }
  const body = level === 2 ? lines.map((l) => withCells(l, pickCells(l.result, [l.op.i], 3, rng))) : lines;
  const script = [...(level === 2 ? [method] : []), writeLine, ech, ...body, ...concl];
  return matLines({
    skill: IND, level,
    prompt: level === 3 ? t('La famille {fam} est-elle libre ? Si elle est liée, donne une relation entre ses éléments. Choisis chaque opération.', { fam }) : t('La famille {fam} est-elle libre ? Si elle est liée, donne une relation entre ses éléments.', { fam }),
    start: 'Matrice', judge: { kind: 'mat', expect: Vtext, rowsCols: true }, mode: level === 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints, subgoals: IND_SUB, key, tapActions: level === 3 ? 'rowops' : null, fallback: d.fallback,
  });
}

function indParamItem(level, rng) {
  const d = indParam(rng);
  const cols = MX.transpose(d.A);
  const Atext = pmt(d.A);
  const fam = cols.map((c, i) => `${vName(i)} = ${ML(`(${c.map((p) => ptext(p)).join(' ; ')})`, { vars: ['a'] })}`).join(', ');
  const lines = d.ops.map((op, k) => ({ kind: 'eq', math: `${popT(op)} : ${pmt(d.steps[k])}`, note: t('Échelonner sans diviser : {popR}', { popR: popR(op) }), subgoal: 'echelon' }));
  const set = [Math.min(d.r1, d.r2), Math.max(d.r1, d.r2)];
  const script = [
    { kind: 'eq', math: Atext, note: t('Les vecteurs en colonnes'), subgoal: 'cols' },
    { kind: 'segment', html: t('Échelonne sans diviser par une expression de a.'), start: { math: Atext }, judge: { kind: 'rowops', vars: ['a'], goal: 'echelon', multi: true } },
    ...lines,
    { kind: 'segment', html: t('Pour quelles valeurs de a la famille est-elle liée ?'), ask: 'a :', start: { math: 'S' }, judge: { kind: 'solset', v: 'a', sets: { S: `{${set.join(';')}}` } } },
    { kind: 'eq', math: `a=${set[0]} ou a=${set[1]}`, note: t('Les pivots {pR} et {pR2} s\'annulent', { pR: pR(d.E[1][1]), pR2: pR(d.E[2][2]) }), subgoal: 'discuss' },
  ];
  return matLines({
    skill: IND, level, prompt: t('Pour quelles valeurs du paramètre a la famille {fam} est-elle liée ?', { fam }),
    start: 'Matrice', judge: { kind: 'mat', expect: Atext, vars: ['a'], rowsCols: true }, mode: 'free', script,
    hints: [], subgoals: IND_SUB, key: `${IND}:${Atext}`, fallback: d.fallback,
  });
}

function indExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const which = rng.int(0, 3);
    if (which === 0) {
      return tfL({
        skill: IND, key: 'scaled', truth: false, exam: tag, ruleIfTrue: 'l_indep_scaled',
        statement: t('Si v₁, …, v_k sont linéairement indépendants et α₁, …, α_k sont des réels, alors α₁v₁, …, α_kv_k sont linéairement indépendants.'),
        counter: { kind: 'vecFamily', params: { want: 'scaledDependent' }, ask: [{ v: 'F', label: 'v₁, v₂ =' }, { v: 'alpha', label: 'α₁ ; α₂ =' }], answer: { F: '(1 ; 0), (0 ; 1)', alpha: '0 ; 1' } },
        explanation: t('Faux : avec α₁ = 0, la famille contient le vecteur nul, elle est liée.'),
      });
    }
    if (which === 1) {
      return tfL({
        skill: IND, key: 'subfamily', truth: true, exam: tag,
        statement: t('Toute sous-famille non vide d\'une famille libre est libre.'),
        explanation: t('Vrai : une relation entre quelques vecteurs serait aussi une relation de toute la famille (les autres avec un coefficient 0).'),
      });
    }
    if (which === 2) {
      return tfL({
        skill: IND, key: 'four', truth: true, exam: tag,
        statement: t('Quatre vecteurs de ℝ³ sont toujours linéairement dépendants.'),
        explanation: t('Vrai : la matrice 3 × 4 a au plus 3 pivots, donc une colonne sans pivot.'),
      });
    }
    return tfL({
      skill: IND, key: 'pairwise', truth: false, exam: tag,
      statement: t('Si trois vecteurs sont deux à deux non colinéaires, ils sont linéairement indépendants.'),
      counter: { kind: 'vecFamily', params: { want: 'pairwiseFreeDependent' }, ask: [{ v: 'F', label: 'v₁, v₂, v₃ =' }], answer: { F: '(1 ; 0), (0 ; 1), (1 ; 1)' } },
      explanation: t('Faux : (1 ; 0), (0 ; 1) et (1 ; 1) ne sont pas colinéaires deux à deux, mais v₃ = v₁ + v₂.'),
    });
  }
  const d = indParam(rng);
  const cols = MX.transpose(d.A);
  const fam = cols.map((c, i) => `${vName(i)} = ${ML(`(${c.map((p) => ptext(p)).join(' ; ')})`, { vars: ['a'] })}`).join(', ');
  const set = (xs) => `a ∈ ${setR([...new Set(xs)].sort((x, y) => x - y))}`;
  return mcqDistinct({
    skill: IND, level: 4, key: `mcq:${pmt(d.A)}`, exam: tag,
    prompt: t('Les vecteurs {fam} sont linéairement dépendants si et seulement si', { fam }),
    right: set([d.r1, d.r2]),
    wrongs: [{ html: set([d.r2]), rule: 'l_param_divide_zero' }, { html: set([-d.r1, -d.r2]), rule: null }],
    fillers: [{ html: set([d.r1]) }, { html: set([d.r1, d.r2, d.r1 + d.r2]) }, { html: set([d.r1 + 1, d.r2 + 1]) }],
    solution: [{ html: t('Échelonnée : {ML}', { ML: ML(pmt(d.E), { vars: ['a'] }) }), note: t('Sans diviser') }, { html: t('Pivots nuls pour a = {fq} ou a = {fq2}', { fq: fq(d.r1), fq2: fq(d.r2) }), note: '' }],
  }, rng);
}

// ======================================================================
// l-sys-pivots-theory
// ======================================================================

const PIV = 'l-sys-pivots-theory';
const PIV_SUB = [
  { id: 'read', label: t('lire les pivots'), skill: ECH },
  { id: 'conclude', label: t('conclure'), skill: PIV },
];
const sz = (m, n) => `${m} × ${n}`;

// A random echelon matrix m × n with r pivots (first in column 1).
function echelonOf(rng, m, n, r) {
  for (let tries = 0; tries < 50; tries++) {
    const cols = [0, ...rng.shuffle([...Array(n).keys()].slice(1)).slice(0, r - 1)].sort((a, b) => a - b);
    const E = MX.zeros(m, n);
    cols.forEach((c, i) => {
      E[i][c] = q(rng.pick([1, 2, -1, 3, -2]));
      for (let j = c + 1; j < n; j++) E[i][j] = q(rng.int(-3, 4));
    });
    if (MX.rank(E) === r) return E;
  }
  return MX.identity(m).map((row) => [...row, ...Array(n - m).fill(q(0))]).slice(0, m).map((row) => row.slice(0, n));
}

// The four conclusions about Ax = b, from pivots in every row (all b) and
// in every column (at most one solution).
const EXIST = [
  t('Ax = b a une solution pour tout b, et elle est unique.'),
  t('Ax = b a une solution pour tout b, mais pas unique : une infinité.'),
  t('Ax = b n\'a pas de solution pour certains b ; quand il en a une, elle est unique.'),
  t('Ax = b n\'a pas de solution pour certains b ; quand il en a, il en a une infinité.'),
];
const existIndex = (rows, cols) => (rows ? (cols ? 0 : 1) : cols ? 2 : 3);
function existOptions(m, n, r) {
  const rows = r === m;
  const cols = r === n;
  const right = existIndex(rows, cols);
  const swapped = existIndex(cols, rows);
  return EXIST.map((html, i) => ({ html, correct: i === right, rule: i !== right && i === swapped ? 'l_inj_rows' : null }));
}
// Two clauses joined by « ; », one key per clause and per plural.
const existWhy = (m, n, r) => tn(r, '{n} pivot : {rows} ; {cols}.', '{n} pivots : {rows} ; {cols}.', {
  rows: r === m ? t('un dans chacune des {m} lignes, donc une solution pour tout b', { m }) : tn(m - r, '{n} ligne sans pivot, donc pas de solution pour certains b', '{n} lignes sans pivot, donc pas de solution pour certains b'),
  cols: r === n ? t('un dans chacune des {n} colonnes, donc au plus une solution', { n }) : tn(n - r, '{n} colonne sans pivot (variable libre), donc une infinité dès qu\'il y en a une', '{n} colonnes sans pivot (variables libres), donc une infinité dès qu\'il y en a une'),
});

// The statements of the catalogue (2018 Q6, Q8 ; 2019 Q8 ; série de
// révision): text, truth, reason ('rows' | 'cols' | 'sizes'), counter.
function pivStatements(rng) {
  const [m1, n1] = rng.pick([[2, 3], [3, 4], [3, 5], [2, 4], [4, 6]]);
  const [m2, n2] = rng.pick([[3, 2], [4, 3], [5, 3], [4, 2]]);
  const wideCounter = {
    kind: 'matOne', params: { want: 'kerNoSolution', wide: true },
    ask: [{ v: 'A', label: 'A =', shape: [2, 3] }, { v: 'b', label: 'b =', shape: [2, 1] }],
    answer: { A: '[[1,1,1],[0,0,0]]', b: '(0 ; 1)' },
  };
  const ontoNotInj = { kind: 'matOne', params: { want: 'pivots', rowsAll: true, colsAll: false }, ask: [{ v: 'A', label: 'A =' }], answer: { A: '[[1,0,0],[0,1,0]]' } };
  const injNotOnto = { kind: 'matOne', params: { want: 'pivots', rowsAll: false, colsAll: true }, ask: [{ v: 'A', label: 'A =' }], answer: { A: '[[1,0],[0,1],[0,0]]' } };
  return [
    { id: 'wide-all', truth: false, reason: 'rows', counter: wideCounter, text: t('Soit A de taille {sz}. Alors Ax = b a au moins une solution pour tout b.', { sz: sz(m1, n1) }), why: t('Au plus {m1} pivots, et il en faudrait un dans chaque ligne, ce qui n\'est pas garanti : A = [[1, 1, 1], [0, 0, 0]] et b = (0 ; 1).', { m1 }) },
    { id: 'wide-zero', truth: true, reason: 'sizes', text: t('Soit A de taille {sz}. Alors Ax = 0 a une infinité de solutions.', { sz: sz(m1, n1) }), why: tn(n1 - m1, 'Au plus {m1} pivots pour {n1} colonnes : au moins {n} variable libre, et Ax = 0 a toujours la solution 0.', 'Au plus {m1} pivots pour {n1} colonnes : au moins {n} variables libres, et Ax = 0 a toujours la solution 0.', { m1, n1 }) },
    { id: 'all-ker', truth: false, reason: 'cols', counter: ontoNotInj, ruleIfTrue: 'l_inj_rows', text: t('Si Ax = b a une solution pour tout b, alors Ax = 0 n\'a que la solution triviale.'), why: t('Un pivot dans chaque ligne ne donne pas un pivot dans chaque colonne : A = [[1, 0, 0], [0, 1, 0]] a une solution pour tout b, mais x₃ est libre.') },
    { id: 'span-ker', truth: false, reason: 'cols', counter: ontoNotInj, ruleIfTrue: 'l_inj_rows', text: t('Si les colonnes de A engendrent ℝᵐ, alors Ax = 0 n\'a que la solution triviale.'), why: t('Les colonnes engendrent ℝᵐ ⇔ un pivot dans chaque ligne ; l\'unicité demande un pivot dans chaque colonne. A = [[1, 0, 0], [0, 1, 0]].') },
    { id: 'ker-all', truth: false, reason: 'rows', counter: injNotOnto, ruleIfTrue: 'l_inj_rows', text: t('Si Ax = 0 n\'a que la solution triviale, alors Ax = b a une solution pour tout b.'), why: t('Un pivot dans chaque colonne ne donne pas un pivot dans chaque ligne : A = [[1, 0], [0, 1], [0, 0]] et b = (0 ; 0 ; 1).') },
    { id: 'tall', truth: true, reason: 'sizes', text: t('Soit A de taille {sz}. Alors il existe un b pour lequel Ax = b n\'a pas de solution.', { sz: sz(m2, n2) }), why: t('Au plus {n2} pivots pour {m2} lignes : une ligne au moins n\'a pas de pivot.', { n2, m2 }) },
    { id: 'square', truth: true, reason: 'cols', text: t('Si A est carrée et que Ax = 0 n\'a que la solution triviale, alors Ax = b a une solution unique pour tout b.'), why: t('Un pivot dans chaque colonne d\'une matrice carrée, c\'est aussi un pivot dans chaque ligne.') },
    { id: 'tall-unique', truth: false, reason: 'cols', counter: { kind: 'matOne', params: { want: 'pivots', colsAll: false, shape: 'tall' }, ask: [{ v: 'A', label: 'A =' }], answer: { A: '[[1,1],[1,1],[1,1]]' } }, text: t('Si A a plus de lignes que de colonnes, Ax = b a au plus une solution.'), why: t('Les tailles ne disent rien des colonnes : A = [[1, 1], [1, 1], [1, 1]] et b = 0 donnent une infinité de solutions.') },
    { id: 'two', truth: true, reason: 'cols', text: t('Si Ax = b a deux solutions distinctes, alors Ax = 0 a une infinité de solutions.'), why: t('Leur différence u − v ≠ 0 vérifie A(u − v) = 0 : une colonne sans pivot, donc une variable libre.') },
    { id: 'cols-square', truth: false, reason: 'sizes', counter: { kind: 'dims', params: { conds: ['r=n', 'm≠n'] }, ask: [{ v: 'm', label: 'm =' }, { v: 'n', label: 'n =' }, { v: 'r', label: t('rang =') }], answer: { m: '3', n: '2', r: '2' } }, text: t('Si A a un pivot dans chaque colonne, alors A est carrée.'), why: t('Une matrice 3 × 2 de rang 2 a un pivot dans chaque colonne.') },
    { id: 'unique-square', truth: true, reason: 'sizes', text: t('Si Ax = b a une solution unique pour tout b, alors A est carrée.'), why: t('Il faut un pivot dans chaque ligne et dans chaque colonne : m = rang = n.') },
  ];
}

const REASONS = {
  rows: t('tout dépend des pivots dans les lignes'),
  cols: t('tout dépend des pivots dans les colonnes'),
  sizes: t('les tailles suffisent à conclure'),
};
const pivTf = (s, o) => tfL({
  skill: PIV, key: s.id, truth: s.truth, counter: s.truth ? null : s.counter,
  ruleIfTrue: s.truth ? null : s.ruleIfTrue ?? null, ruleIfFalse: s.truth ? s.ruleIfFalse ?? null : null,
  statement: s.text, explanation: s.truth ? t('Vrai : {why}', { why: `${s.why[0].toLowerCase()}${s.why.slice(1)}` }) : t('Faux : {why}', { why: `${s.why[0].toLowerCase()}${s.why.slice(1)}` }), ...o,
});

function pivItem(level, rng) {
  if (level <= 2) {
    const [m, n] = rng.pick([[3, 3], [3, 4], [4, 3], [3, 5], [2, 4], [4, 4], [4, 2]]);
    const r = rng.int(Math.max(1, Math.min(m, n) - 1), Math.min(m, n));
    const E = echelonOf(rng, m, n, r);
    const prompt = level === 1
      ? t('A est de taille {sz}, et {MLm} est une forme échelonnée de A. Compte les pivots par ligne et par colonne. Que peut-on dire de l\'équation Ax = b ?', { sz: sz(m, n), MLm: MLm(E) })
      : r > 1 ? t('A est de taille {sz} et de rang {r} ({r} pivots). Que peut-on dire de l\'équation Ax = b ?', { sz: sz(m, n), r }) : t('A est de taille {sz} et de rang {r} ({r} pivot). Que peut-on dire de l\'équation Ax = b ?', { sz: sz(m, n), r });
    return {
      ...mcq({ skill: PIV, level, prompt, key: `${PIV}:${level}:${m}${n}${r}:${level === 1 ? mt(E) : ''}`, options: existOptions(m, n, r), keepOrder: true, solution: [{ html: existWhy(m, n, r), note: '' }] }, rng),
      subgoals: PIV_SUB,
    };
  }
  const all = pivStatements(rng);
  const s = rng.pick(all);
  if (level === 3) {
    const reasons = Object.keys(REASONS);
    const opts = [];
    const add = (truth, reason, rule) => { if (!opts.some((o) => o.truth === truth && o.reason === reason)) opts.push({ truth, reason, rule }); };
    add(s.truth, s.reason, null);
    add(!s.truth, s.reason, s.truth ? s.ruleIfFalse ?? null : s.ruleIfTrue ?? null);
    const other = rng.pick(reasons.filter((x) => x !== s.reason));
    add(s.truth, other, (other === 'rows' && s.reason === 'cols') || (other === 'cols' && s.reason === 'rows') ? 'l_inj_rows' : null);
    add(!s.truth, rng.pick(reasons.filter((x) => x !== s.reason && x !== other)), null);
    const options = opts.map((o, i) => ({ html: o.truth ? t('Vrai : {r}.', { r: REASONS[o.reason] }) : t('Faux : {r}.', { r: REASONS[o.reason] }), correct: i === 0, rule: o.rule }));
    return {
      ...mcq({ skill: PIV, level, prompt: t('Vrai ou faux, et pourquoi ? « {text} »', { text: s.text }), key: `${PIV}:why:${s.id}`, options, solution: [{ html: s.truth ? t('Vrai : {why}', { why: s.why }) : t('Faux : {why}', { why: s.why }), note: '' }] }, rng),
      subgoals: PIV_SUB,
    };
  }
  const hints = [
    { level: 1, html: t('Existence pour tout b : un pivot dans chaque ligne. Unicité : un pivot dans chaque colonne. Il y a au plus min(m, n) pivots.') },
    { level: 2, html: t('Combien de pivots au plus ? □ ; combien de lignes ? □ ; de colonnes ? □. Si c\'est faux, cherche une petite matrice qui le montre.') },
    { level: 3, html: s.truth ? t('Vrai : {why}', { why: s.why }) : t('Faux : {why}', { why: s.why }) },
  ];
  if (level === 4 && rng.chance(0.3)) {
    const ex = rng.pick([
      { key: 'wide', prompt: t('Donne une matrice A de taille 2 × 3 et un vecteur b de ℝ² tels que Ax = 0 ait une infinité de solutions mais que Ax = b n\'en ait aucune.'), property: { kind: 'matOne', params: { want: 'kerNoSolution', wide: true, n: 2, cols: 3 }, ask: [{ v: 'A', label: 'A =', shape: [2, 3] }, { v: 'b', label: 'b =', shape: [2, 1] }], answer: { A: '[[1,2,0],[2,4,0]]', b: '(1 ; 0)' } } },
      { key: 'onto', prompt: t('Donne une matrice A de taille 2 × 3 telle que Ax = b ait une solution pour tout b, sans que la solution soit unique.'), property: { kind: 'matOne', params: { want: 'pivots', rowsAll: true, colsAll: false, n: 2, cols: 3 }, ask: [{ v: 'A', label: 'A =', shape: [2, 3] }], answer: { A: '[[1,0,2],[0,1,1]]' } } },
      { key: 'inj', prompt: t('Donne une matrice A de taille 3 × 2 telle que Ax = 0 n\'ait que la solution triviale, mais que Ax = b n\'ait pas de solution pour un certain b.'), property: { kind: 'matOne', params: { want: 'pivots', rowsAll: false, colsAll: true, n: 3, cols: 2 }, ask: [{ v: 'A', label: 'A =', shape: [3, 2] }], answer: { A: '[[1,0],[0,1],[1,1]]' } } },
    ]);
    return exampleItem({
      skill: PIV, level, prompt: ex.prompt, property: ex.property, key: ex.key, subgoals: PIV_SUB,
      hints: [hints[0], { level: 2, html: t('Un pivot dans chaque ligne ? dans chaque colonne ? Choisis le rang qui convient, puis écris une matrice échelonnée.') }, { level: 3, html: t('Par exemple {x}.', { x: Object.entries(ex.property.answer).map(([k, v]) => `${k} = ${ML(v)}`).join(', ') }) }],
      solution: [{ html: Object.entries(ex.property.answer).map(([k, v]) => `${k} = ${ML(v)}`).join(', '), note: '' }],
    });
  }
  return { ...pivTf(s, { level, hints, noHints: level === 5 }), subgoals: PIV_SUB };
}

function pivExam(rng, exam) {
  const tag = examTag({ exam });
  const all = pivStatements(rng);
  if (exam === 'tf') return pivTf(rng.pick(all), { exam: tag });
  if (rng.chance(0.3)) {
    const [m, n] = rng.pick([[3, 5], [2, 5], [3, 7], [4, 6], [2, 4]]);
    return mcqDistinct({
      skill: PIV, level: 4, key: `mcq:ker:${m}${n}`, exam: tag,
      prompt: t('A est une matrice de taille {sz}. La plus petite valeur possible de dim Ker A (le nombre de variables libres de Ax = 0) est :', { sz: sz(m, n) }),
      right: String(n - m),
      wrongs: [{ html: '0', rule: 'l_rank_dim_confusion' }, { html: String(m), rule: 'l_rank_dim_confusion' }, { html: String(n), rule: 'l_rank_dim_confusion' }],
      fillers: [{ html: String(n - m + 1) }, { html: '1' }],
      solution: [{ html: t('Au plus {m} pivots pour {n} colonnes : au moins {n} − {m} = {x} variables libres, atteint quand le rang vaut {m}.', { m, n, x: n - m }), note: '' }],
    }, rng);
  }
  const trues = all.filter((s) => s.truth);
  const falses = rng.shuffle(all.filter((s) => !s.truth));
  const right = rng.pick(trues);
  return mcqDistinct({
    skill: PIV, level: 4, key: `mcq:${right.id}`, exam: tag,
    prompt: t('A est une matrice de taille m × n. Une seule affirmation est toujours vraie :'),
    right: right.text,
    wrongs: falses.map((s) => ({ html: s.text, rule: s.ruleIfTrue ?? null })),
    solution: [{ html: right.why, note: '' }],
  }, rng);
}

// ======================================================================
// l-map-std-matrix
// ======================================================================

const STD = 'l-map-std-matrix';
const STD_SUB = [
  { id: 'lin', label: t('linéarité'), skill: STD },
  { id: 'place', label: t('placer les colonnes'), skill: STD },
];
// Given vectors (coordinates over e₁, e₂, e₃), each with one new basis
// vector: T(eₖ) follows from T(w) and the images already known.
const STD_BASIC = [
  [[1, 0, 0], [0, 2, 0], [0, 1, 1]],
  [[2, 0, 0], [0, 1, 0], [1, 0, 1]],
  [[1, 0, 0], [1, 1, 0], [0, 0, 3]],
];
const STD_OTHER = [
  [[1, 0, 0], [1, 1, 0], [1, 1, 1]],
  [[1, -1, 0], [0, 1, 0], [0, 0, 3]],
  [[0, 1, 0], [1, 2, 0], [0, 1, -1]],
  [[1, 0, 0], [0, 1, 0], [1, 1, 2]],
];
const eName = (k) => `e${sub(k + 1)}`;
// 2e₂, e₂ + e₃, e₁ − e₂.
function wName(w) {
  let s = '';
  w.forEach((c, k) => {
    if (!c) return;
    const abs = Math.abs(c);
    s += `${c < 0 ? (s ? ' − ' : '−') : s ? ' + ' : ''}${abs === 1 ? '' : abs}${eName(k)}`;
  });
  return s;
}

// M (entries in [−6 ; 6]) and given vectors (a pattern, coordinates
// permuted). Steps: for each eₖ not given, T(eₖ) = (T(w) − Σ cⱼT(eⱼ))/c.
function stdData(rng, level) {
  for (let tries = 0; tries < 200; tries++) {
    const pat = rng.pick(level >= 4 ? STD_OTHER : STD_BASIC);
    const perm = rng.shuffle([0, 1, 2]);
    const given = rng.shuffle(pat.map((w) => { const v = [0, 0, 0]; w.forEach((c, k) => { v[perm[k]] = c; }); return v; }));
    const M = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => q(rng.int(-6, 6))));
    if (MX.transpose(M).some((c) => c.every((x) => x.n === 0)) || MX.rank(M) < 2) continue;
    const imgs = given.map((w) => MX.matVec(M, w.map((x) => q(x))));
    if (imgs.flat().some((x) => Math.abs(x.valueOf()) > 18)) continue;
    // Derive in order: a given vector with exactly one unknown eₖ.
    const known = new Set();
    const steps = [];
    const used = new Set();
    let progress = true;
    while (known.size < 3 && progress) {
      progress = false;
      given.forEach((w, gi) => {
        if (used.has(gi)) return;
        const unknown = w.map((c, k) => (c && !known.has(k) ? k : -1)).filter((k) => k >= 0);
        if (unknown.length !== 1) return;
        const k = unknown[0];
        used.add(gi);
        known.add(k);
        progress = true;
        const others = w.map((c, j) => (c && j !== k ? j : -1)).filter((j) => j >= 0);
        steps.push({ k, gi, c: w[k], others: others.map((j) => ({ j, c: w[j] })), direct: !others.length && w[k] === 1 });
      });
    }
    if (known.size < 3) continue;
    if (steps.filter((s) => !s.direct).length < 2) continue;
    // The trap: each given image in the column of its new basis vector.
    const G = MX.transpose([0, 1, 2].map((k) => imgs[steps.find((s) => s.k === k).gi]));
    if (MX.equal(G, M)) continue;
    return { M, given, imgs, steps, G };
  }
  const M = MX.mat([[2, 2, -1], [-1, 1, 3], [3, -3, 4]]);
  const given = [[1, 0, 0], [0, 2, 0], [0, 1, 1]];
  const imgs = given.map((w) => MX.matVec(M, w.map((x) => q(x))));
  const steps = [{ k: 0, gi: 0, c: 1, others: [], direct: true }, { k: 1, gi: 1, c: 2, others: [], direct: false }, { k: 2, gi: 2, c: 1, others: [{ j: 1, c: 1 }], direct: false }];
  return { M, given, imgs, steps, G: MX.transpose([imgs[0], imgs[1], imgs[2]]), fallback: true };
}

// « T(e₃) = T(e₂ + e₃) − T(e₂) », « T(e₂) = ½·T(2e₂) ».
function stepFormula(d, s) {
  const tw = `T(${wName(d.given[s.gi])})`;
  const minus = s.others.map((o) => `${o.c < 0 ? ' + ' : ' − '}${Math.abs(o.c) === 1 ? '' : Math.abs(o.c)}T(${eName(o.j)})`).join('');
  const body = `${tw}${minus}`;
  if (s.c === 1) return body;
  const f = s.c === -1 ? '−' : `${s.c < 0 ? '−' : ''}${{ 2: '½', 3: '⅓' }[Math.abs(s.c)] ?? `(1/${Math.abs(s.c)})`}·`;
  return s.others.length ? `${f}(${body})` : `${f}${body}`;
}

function linForm(row, names) {
  let s = '';
  row.forEach((c, j) => {
    if (c.n === 0) return;
    const abs = c.n < 0 ? c.neg() : c;
    s += `${c.n < 0 ? '-' : s ? '+' : ''}${abs.eq(1) ? '' : qt(abs)}${names[j]}`;
  });
  return s || '0';
}
const X3 = ['x_1', 'x_2', 'x_3'];
// T(x) as a column of linear forms (MathML).
const formulaML = (M, names = VARS_IDX(M[0].length)) => `T(${names.map((x) => x.replace(/_(\d)/, (_, d) => sub(d))).join(', ')}) = ${ML(`(${M.map((r) => linForm(r, names)).join(' ; ')})`, { vars: names })}`;

function stdItem(level, rng) {
  const d = stdData(rng, level);
  const Mtext = mt(d.M);
  const key = `${STD}:${Mtext}:${d.given.map(wName).join(',')}`;
  const givenHtml = d.given.map((w, i) => `T(${wName(w)}) = ${MLm(d.imgs[i].map((x) => [x]))}`).join(', ');
  const matJudge = { kind: 'mat', expect: Mtext, rowsCols: true, given: mt(d.G) };
  const matLine = { kind: 'eq', math: Mtext, note: t('Les images T(e₁), T(e₂), T(e₃) en colonnes'), subgoal: 'place' };
  const colsMenu = [
    { id: 'cols', label: t('Placer T(eⱼ) en colonne j'), valid: true },
    { id: 'rows', label: t('Placer T(eⱼ) en ligne j'), valid: false, rule: 'l_matrix_rows_cols', why: t('La colonne j de la matrice est l\'image de eⱼ : A·eⱼ redonne la colonne j.') },
    { id: 'raw', label: t('Placer les images données telles quelles'), valid: false, rule: 'l_map_scaled_image', why: t('Les images données ne sont pas toutes celles des eⱼ : il faut d\'abord retrouver T(eⱼ).') },
  ];
  if (level === 5) {
    const matSeg = [
      { kind: 'decision', prompt: t('T est-elle linéaire ?'), options: [
        { id: 'yes', label: t('Oui : chaque composante est une combinaison des xᵢ, sans constante'), valid: true },
        { id: 'no', label: t('Non : on ne peut pas savoir sans tester T(u + v)'), valid: false, why: t('Une formule dont chaque composante est a₁x₁ + a₂x₂ + a₃x₃ est toujours linéaire : c\'est Ax.') },
      ] },
      matLine,
    ];
    return matLines({
      skill: STD, level, prompt: t('Soit T : ℝ³ → ℝ³ définie par {formulaML}. Est-elle linéaire ? Donne sa matrice canonique.', { formulaML: formulaML(d.M, X3) }),
      start: 'A', judge: matJudge, mode: 'free', script: matSeg, hints: [], subgoals: STD_SUB, key: `${STD}:formula:${Mtext}`, fallback: d.fallback,
    });
  }
  const derived = d.steps.filter((s) => !s.direct);
  const segs = [];
  derived.forEach((s, i) => {
    const col = MX.col(d.M, s.k);
    const judge = { kind: 'mat', expect: vt(col) };
    if (level === 3) {
      judge.menu = rng.shuffle([
        { id: 'ok', label: `T(${eName(s.k)}) = ${stepFormula(d, s)}`, valid: true },
        { id: 'raw', label: `T(${eName(s.k)}) = T(${wName(d.given[s.gi])})`, valid: false, rule: 'l_map_scaled_image', why: s.c !== 1 ? t('T({w}) n\'est pas T({e}) : par linéarité, il faut diviser.', { w: wName(d.given[s.gi]), e: eName(s.k) }) : t('T({w}) n\'est pas T({e}) : par linéarité, il faut retirer les autres images.', { w: wName(d.given[s.gi]), e: eName(s.k) }) },
        { id: 'mul', label: `T(${eName(s.k)}) = ${Math.abs(s.c) === 1 ? 2 : Math.abs(s.c)}·T(${wName(d.given[s.gi])})`, valid: false, why: t('Par linéarité, T(c·u) = c·T(u) : pour revenir de T(c·eₖ) à T(eₖ), on divise par c.') },
      ]);
    }
    const line = { kind: 'eq', math: `T(e_${s.k + 1}) = ${vt(col)}`, note: t('Linéarité : T({eName}) = {stepFormula}', { eName: eName(s.k), stepFormula: stepFormula(d, s) }), subgoal: 'lin' };
    if (i > 0) segs.push({ kind: 'segment', html: t('Trouve T({eName}).', { eName: eName(s.k) }), ask: `T(${eName(s.k)}) =`, start: { math: `T(e_${s.k + 1})` }, judge });
    else segs.first = { judge, start: `T(e_${s.k + 1})` };
    segs.push(level <= 2 ? withCells(line, pickCells(col.map((x) => [x]), [0, 1, 2], level === 1 ? 2 : 3, rng).map(([r]) => [r, 0])) : line);
  });
  const known = d.steps.filter((s) => s.direct).map((s) => s.k);
  const matCells = [];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (!known.includes(j)) matCells.push([i, j]);
  const decision = {
    kind: 'decision', prompt: t('Comment ranger les images dans la matrice ?'), options: rng.shuffle([
      { id: 'cols', label: t('T(e₁), T(e₂), T(e₃) en colonnes'), valid: true },
      { id: 'rows', label: t('T(e₁), T(e₂), T(e₃) en lignes'), valid: false, rule: 'l_matrix_rows_cols', why: t('La colonne j est l\'image de eⱼ : c\'est pour cela que A·eⱼ redonne T(eⱼ).') },
    ]),
  };
  const matJ = level === 3 ? { ...matJudge, menu: colsMenu } : matJudge;
  const script = [
    ...segs,
    { kind: 'segment', html: t('Écris la matrice canonique de T.'), ask: 'A =', start: { math: 'A' }, judge: matJ },
    ...(level === 2 ? [decision] : []),
    level === 1 ? withCells(matLine, rng.shuffle(matCells).slice(0, 3).sort((a, b) => a[0] - b[0] || a[1] - b[1])) : matLine,
  ];
  const s0 = derived[0];
  const hints = [
    { level: 1, html: t('Retrouve d\'abord chaque T(eⱼ) par linéarité (T(cu) = cT(u), T(u + v) = T(u) + T(v)), puis mets les images en colonnes.') },
    { level: 2, html: `T(${eName(s0.k)}) = ${stepFormula(d, s0)} = □` },
    { level: 3, html: `A = ${MLm(d.M)}` },
  ];
  const firstJudge = segs.first.judge;
  return matLines({
    skill: STD, level,
    prompt: level === 3
      ? t('T : ℝ³ → ℝ³ est linéaire, avec {givenHtml}. Trouve {imgs}, puis la matrice canonique de T. Choisis à chaque fois la bonne règle.', { givenHtml, imgs: derived.map((s) => `T(${eName(s.k)})`).join(' et ') })
      : t('T : ℝ³ → ℝ³ est linéaire, avec {givenHtml}. Trouve {imgs}, puis la matrice canonique de T.', { givenHtml, imgs: derived.map((s) => `T(${eName(s.k)})`).join(' et ') }),
    start: segs.first.start, judge: firstJudge, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints, subgoals: STD_SUB, key, tapActions: level === 3 ? 'menu' : null, fallback: d.fallback,
  });
}

function stdExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const which = rng.int(0, 3);
    if (which === 0) {
      return tfL({
        skill: STD, key: 'unique', truth: true, exam: tag,
        statement: t('La matrice canonique d\'une application linéaire T : ℝⁿ → ℝᵐ est unique.'),
        explanation: t('Vrai : si Ax = Bx pour tout x, alors avec x = eⱼ les colonnes j de A et de B sont égales.'),
      });
    }
    if (which === 1) {
      return tfL({
        skill: STD, key: 'zero', truth: true, exam: tag,
        statement: t('Si T est linéaire, alors T(0) = 0.'),
        explanation: t('Vrai : T(0) = T(0·0) = 0·T(0) = 0.'),
      });
    }
    const affine = which === 2;
    return tfL({
      skill: STD, key: affine ? 'affine' : 'product', truth: false, exam: tag,
      statement: affine ? t('L\'application T : ℝ² → ℝ² définie par T(x) = x + (1 ; 0) est linéaire.') : t('L\'application T : ℝ² → ℝ² définie par T(x₁, x₂) = (x₁x₂ ; x₁) est linéaire.'),
      counter: {
        kind: 'vecFamily', params: { want: 'notLinear', n: 2, T: affine ? ['x_1+1', 'x_2'] : ['x_1x_2', 'x_1'] },
        ask: [{ v: 'u', label: 'u =' }, { v: 'v', label: 'v =' }, { v: 'c', label: t('ou un nombre c =') }],
        answer: affine ? { u: '(0 ; 0)', v: '(0 ; 0)' } : { u: '(1 ; 1)', c: '2' },
      },
      explanation: affine ? t('Faux : T(0) = (1 ; 0) ≠ 0. Avec u = v = 0 : T(u + v) = (1 ; 0), mais T(u) + T(v) = (2 ; 0).') : t('Faux : T(2·(1 ; 1)) = (4 ; 2), mais 2·T(1 ; 1) = (2 ; 2).'),
    });
  }
  const d = stdData(rng, rng.pick([2, 4]));
  const givenHtml = d.given.map((w, i) => `T(${wName(w)}) = ${MLm(d.imgs[i].map((x) => [x]))}`).join(', ');
  const prompt = t('T : ℝ³ → ℝ³ est linéaire, avec {givenHtml}.', { givenHtml });
  if (exam === 'coef') {
    const s = d.steps.find((x) => !x.direct);
    const cands = [0, 1, 2].filter((i) => !d.M[i][s.k].eq(d.G[i][s.k]));
    const i = cands.length ? rng.pick(cands) : 0;
    const j = s.k;
    return coefItem({
      skill: STD, level: 4, prompt: t('{prompt} Soit A la matrice canonique de T. Que vaut a{sub}{sub2} ?', { prompt, sub: sub(i + 1), sub2: sub(j + 1) }),
      label: `a_${i + 1}${j + 1}`, value: qt(d.M[i][j]), key: `${mt(d.M)}:${i}${j}`, exam: tag,
      askCoef: { label: `a${sub(i + 1)}${sub(j + 1)}`, path: [i, j] },
      traps: [{ rule: 'l_map_scaled_image' }, { rule: 'l_matrix_rows_cols' }],
      solution: [{ html: `T(${eName(j)}) = ${stepFormula(d, s)}`, note: '' }, { html: `A = ${MLm(d.M)}`, note: '' }], fallback: d.fallback,
    });
  }
  return mcqDistinct({
    skill: STD, level: 4, key: `mcq:${mt(d.M)}`, exam: tag,
    prompt: t('{prompt} Sa matrice canonique est :', { prompt }),
    right: MLm(d.M),
    wrongs: [{ html: MLm(d.G), rule: 'l_map_scaled_image' }, { html: MLm(MX.transpose(d.M)), rule: 'l_matrix_rows_cols' }, { html: MLm(MX.transpose(d.G)), rule: 'l_matrix_rows_cols' }],
    fillers: [{ html: MLm(MX.scale(d.M, -1)) }],
    solution: d.steps.filter((s) => !s.direct).map((s) => ({ html: `T(${eName(s.k)}) = ${stepFormula(d, s)} = ${MLv(MX.col(d.M, s.k))}`, note: '' })),
  }, rng);
}

// ======================================================================
// l-map-inj-surj
// ======================================================================

const INJ = 'l-map-inj-surj';
const INJ_SUB = [
  { id: 'matrix', label: t('matrice de T'), skill: STD },
  { id: 'echelon', label: t('échelonner'), skill: ECH },
  { id: 'conclude', label: t('conclure'), skill: INJ },
];
const INJ_SHAPES = [[3, 4], [4, 3], [3, 3], [4, 4], [2, 4], [3, 2]];
const INJ_LABELS = [t('Injective et surjective'), t('Injective, pas surjective'), t('Surjective, pas injective'), t('Ni injective, ni surjective')];
const injIndex = (inj, surj) => (inj ? (surj ? 0 : 1) : surj ? 2 : 3);

function injData(rng, level) {
  for (let tries = 0; tries < 200; tries++) {
    const [m, n] = rng.pick(INJ_SHAPES);
    const top = Math.min(m, n);
    const r = rng.chance(0.5) ? top : top - 1;
    if (r < 1) continue;
    const cols = [0, ...rng.shuffle([...Array(n).keys()].slice(1)).slice(0, r - 1)].sort((a, b) => a - b);
    const { A, fallback } = rrefWith(m, n, cols, rng, { max: 3 });
    if (fallback || A.some((row) => row.every((x) => x.n === 0))) continue;
    if (!distinctRows(A)) continue;
    if (A.flat().some((x) => Math.abs(x.valueOf()) > 7)) continue;
    const e = MX.echelon(A);
    if (e.ops.length < 2 || e.ops.length > (level >= 4 ? 7 : 5)) continue;
    if (e.ops.some((op) => op.kind === 'swap' || (op.k && op.k.d > 1))) continue;
    let X = A;
    let ok = true;
    for (const op of e.ops) { X = MX.applyOp(X, op); if (X.flat().some((x) => x.d > 2 || Math.abs(x.valueOf()) > 15)) ok = false; }
    if (!ok) continue;
    return { A, E: e.E, ops: e.ops, m, n, r: e.pivots.length };
  }
  const A = MX.mat([[1, 2, 0, 1], [2, 4, 1, 3], [0, 0, 1, 1]]);
  const e = MX.echelon(A);
  return { A, E: e.E, ops: e.ops, m: 3, n: 4, r: 2, fallback: true };
}

function injDecision(d) {
  const inj = d.r === d.n;
  const surj = d.r === d.m;
  const right = injIndex(inj, surj);
  const swapped = injIndex(surj, inj);
  const why = [
    d.r < d.n ? t('Il faudrait un pivot dans chacune des {n} colonnes : le rang vaut {r}.', { n: d.n, r: d.r }) : t('Il faudrait un pivot dans chacune des {m} lignes : le rang vaut {r}.', { m: d.m, r: d.r }),
  ];
  return {
    kind: 'decision', prompt: t('T est-elle injective ? surjective ?'), options: INJ_LABELS.map((label, i) => ({
      id: `c${i}`, label, valid: i === right,
      ...(i === right ? {} : { rule: i === swapped ? 'l_inj_rows' : undefined, why: i === swapped ? t('Injective, c\'est un pivot dans chaque colonne (pas de variable libre) ; surjective, un pivot dans chaque ligne.') : why[0] }),
    })),
  };
}
// Two clauses joined by « ; », one key per clause and per plural.
const injWhy = (d) => t('Rang {r} : {cols} ; {rows}.', {
  r: d.r,
  cols: d.r === d.n ? t('un pivot dans chacune des {n} colonnes, injective', { n: d.n }) : tn(d.n - d.r, '{n} colonne sans pivot, pas injective', '{n} colonnes sans pivot, pas injective'),
  rows: d.r === d.m ? t('un pivot dans chacune des {m} lignes, surjective', { m: d.m }) : tn(d.m - d.r, '{n} ligne sans pivot, pas surjective', '{n} lignes sans pivot, pas surjective'),
});
const rn = (k) => `ℝ${'⁰¹²³⁴⁵⁶'[k]}`;

function injItem(level, rng) {
  const d = injData(rng, level);
  const Atext = mt(d.A);
  const key = `${INJ}:${Atext}`;
  const lines = opLines(d.A, d.ops, { note: (op) => t('Annuler sous le pivot : {opR}', { opR: opR(op) }), subgoal: 'echelon' });
  const concl = [
    { kind: 'segment', html: t('Conclus, et justifie par le rang.'), ask: t('rang A ='), start: { math: 'r' }, judge: { kind: 'value', expect: String(d.r) } },
    injDecision(d),
    { kind: 'eq', math: String(d.r), note: injWhy(d), subgoal: 'conclude' },
  ];
  const sizes = {
    kind: 'decision', prompt: t('Avant de calculer : les tailles suffisent-elles à conclure ?'), options: [
      { id: 'inj', label: t('Oui : {n} colonnes et au plus {m} pivots, donc pas injective', { n: d.n, m: d.m }), valid: d.n > d.m, why: d.n > d.m ? undefined : t('Ici n = {n} ≤ m = {m} : les tailles ne disent rien sur l\'injectivité.', { n: d.n, m: d.m }) },
      { id: 'surj', label: t('Oui : {m} lignes et au plus {n} pivots, donc pas surjective', { m: d.m, n: d.n }), valid: d.m > d.n, rule: d.n > d.m ? 'l_inj_rows' : undefined, why: d.m > d.n ? undefined : t('Ici m = {m} ≤ n = {n} : les tailles ne disent rien sur la surjectivité.', { m: d.m, n: d.n }) },
      { id: 'calc', label: t('Il faut calculer le rang'), valid: d.m === d.n, why: d.m === d.n ? undefined : t('Juste pour l\'autre propriété, mais les tailles en tranchent déjà une.') },
    ],
  };
  const hints = [
    { level: 1, html: t('Injective : un pivot dans chaque colonne. Surjective : un pivot dans chaque ligne.') },
    { level: 2, html: t('rang = □ ; colonnes : {n} ; lignes : {m}.', { n: d.n, m: d.m }) },
    { level: 3, html: injWhy(d) },
  ];
  const T = `T : ${rn(d.n)} → ${rn(d.m)}`;
  if (level === 1) {
    return matLines({
      skill: INJ, level, prompt: t('{T}, T(x) = Ax, et {MLm} est une forme échelonnée de A. Compte les pivots par ligne et par colonne : T est-elle injective ? surjective ?', { T, MLm: MLm(d.E) }),
      start: 'r', judge: concl[0].judge, mode: 'guided', script: [concl[1], concl[2]], hints, subgoals: INJ_SUB, key, keys: ['calc'], fallback: d.fallback,
    });
  }
  const ech = { kind: 'segment', html: t('Échelonne A.'), start: { math: Atext }, judge: { kind: 'rowops', goal: 'echelon', multi: level >= 4 } };
  if (level <= 3) {
    const body = level === 2 ? lines.map((l) => withCells(l, pickCells(l.result, [l.op.i], 2, rng))) : lines;
    return matLines({
      skill: INJ, level, prompt: level === 3 ? t('Soit {T}, T(x) = Ax avec A = {A}. T est-elle injective ? surjective ? Commence par regarder les tailles, puis choisis chaque opération.', { T, A: MLm(d.A) }) : t('Soit {T}, T(x) = Ax avec A = {A}. T est-elle injective ? surjective ?', { T, A: MLm(d.A) }),
      start: Atext, judge: ech.judge, mode: level === 2 ? 'guided' : 'tap', script: [...(level === 3 ? [sizes] : []), ...body, ...concl],
      hints, subgoals: INJ_SUB, key, tapActions: level === 3 ? 'rowops' : null, fallback: d.fallback,
    });
  }
  // Levels 4–5: T given by a formula, or by the images of the eⱼ.
  const names = VARS_IDX(d.n);
  const byImages = level === 4 && rng.chance(0.5);
  const given = byImages
    ? t('{T} est linéaire, avec {x}.', { T, x: MX.transpose(d.A).map((c, j) => `T(${eName(j)}) = ${MLm(c.map((x) => [x]))}`).join(', ') })
    : t('Soit {T} définie par {formulaML}.', { T, formulaML: formulaML(d.A, names) });
  const script = [
    { kind: 'eq', math: Atext, note: t('Les images T(eⱼ) en colonnes'), subgoal: 'matrix' },
    ech, ...lines, ...concl,
  ];
  return matLines({
    skill: INJ, level, prompt: t('{given} T est-elle injective ? surjective ? Écris sa matrice A, échelonne-la, puis conclus.', { given }),
    start: 'A', judge: { kind: 'mat', expect: Atext, rowsCols: true }, mode: 'free', script,
    hints, subgoals: INJ_SUB, key, fallback: d.fallback,
  });
}

function injExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const which = rng.int(0, 4);
    const T = [
      { truth: true, key: 'dim', statement: t('Si n > m, une application linéaire T : ℝⁿ → ℝᵐ n\'est pas injective.'), explanation: t('Vrai : au plus m pivots pour n colonnes, donc une colonne sans pivot.') },
      { truth: true, key: 'square', statement: t('Si T : ℝⁿ → ℝⁿ est linéaire et surjective, alors elle est injective.'), explanation: t('Vrai : un pivot dans chacune des n lignes, donc n pivots, un dans chacune des n colonnes.') },
      { truth: false, key: 'onto', ruleIfTrue: null, statement: t('Toute application linéaire T : ℝ⁴ → ℝ³ est surjective.'), counter: { kind: 'matOne', params: { want: 'pivots', rowsAll: false, n: 3, cols: 4 }, ask: [{ v: 'A', label: 'A =', shape: [3, 4] }], answer: { A: '[[1,0,0,0],[0,1,0,0],[0,0,0,0]]' } }, explanation: t('Faux : la matrice A = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]] n\'a pas de pivot dans sa 3e ligne. Plus de colonnes que de lignes ne suffit pas.') },
      { truth: false, key: 'into', statement: t('Toute application linéaire T : ℝ² → ℝ³ est injective.'), counter: { kind: 'matOne', params: { want: 'pivots', colsAll: false, n: 3, cols: 2 }, ask: [{ v: 'A', label: 'A =', shape: [3, 2] }], answer: { A: '[[1,1],[1,1],[1,1]]' } }, explanation: t('Faux : A = [[1, 1], [1, 1], [1, 1]] n\'a qu\'un pivot ; T(1 ; −1) = 0.') },
      { truth: false, key: 'inj-onto', ruleIfTrue: 'l_inj_rows', statement: t('Si une application linéaire T : ℝⁿ → ℝᵐ est injective, alors elle est surjective.'), counter: { kind: 'matOne', params: { want: 'pivots', colsAll: true, rowsAll: false }, ask: [{ v: 'A', label: 'A =' }], answer: { A: '[[1,0],[0,1],[0,0]]' } }, explanation: t('Faux : A = [[1, 0], [0, 1], [0, 0]] a un pivot dans chaque colonne (injective) mais pas dans la 3e ligne.') },
    ][which];
    return tfL({ skill: INJ, exam: tag, ...T });
  }
  const d = injData(rng, 4);
  const inj = d.r === d.n;
  const surj = d.r === d.m;
  const right = injIndex(inj, surj);
  const swapped = injIndex(surj, inj);
  const INJ_SENTENCES = [t('T est injective et surjective.'), t('T est injective, mais pas surjective.'), t('T est surjective, mais pas injective.'), t('T n\'est ni injective, ni surjective.')];
  const options = INJ_SENTENCES.map((html, i) => ({ html, correct: i === right, rule: i !== right && i === swapped ? 'l_inj_rows' : null }));
  return {
    ...mcq({ skill: INJ, level: 4, prompt: t('Soit T : {rn} → {rn2}, T(x) = Ax avec A = {MLm}. Alors :', { rn: rn(d.n), rn2: rn(d.m), MLm: MLm(d.A) }), key: `${INJ}:mcq:${mt(d.A)}`, options, keepOrder: true, solution: [{ html: t('Forme échelonnée : {MLm}', { MLm: MLm(d.E) }), note: '' }, { html: injWhy(d), note: '' }] }, rng),
    exam: tag,
  };
}
// ======================================================================

const withExam = (item, exam) => (level, rng, profile, opts = {}) => (opts.exam ? exam(rng, opts.exam) : item(level, rng));

export const GEN = {
  [AUG]: (level, rng) => augItem(level, rng),
  [ECH]: withExam(echItem, echExam),
  [RREF]: withExam(rrefItem, rrefExam),
  [SOL]: withExam(solItem, solExam),
  [PAR]: withExam(parItem, parExam),
  [SPAN]: withExam(spanItem, spanExam),
  [IND]: withExam(indItem, indExam),
  [PIV]: withExam(pivItem, pivExam),
  [STD]: withExam(stdItem, stdExam),
  [INJ]: withExam(injItem, injExam),
};

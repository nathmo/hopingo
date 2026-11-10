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
import {
  q, mt, aug, vt, ML, MLm, opT, opR, fq, qt, sub, unimodular, rrefWith, opLines, pickCells, withCells,
  matLines, coefItem, mcqDistinct, tfL, examTag, rowHoles,
} from './alglin-kit.js';

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
  { id: 'write', label: 'écrire la matrice augmentée', skill: AUG },
  { id: 'clear', label: 'annuler sous le pivot', skill: AUG },
];

// x* whole in [−3 ; 3]³, a₁₁ = ±1, b = Ax*. Template (b): a zero in an
// equation (a missing variable).
function augData(rng, level) {
  for (let t = 0; t < 200; t++) {
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
  const lines = opLines(M, ops, { bar: 3, note: (op) => `Annuler sous le pivot : ${opR(op)}`, subgoal: 'clear' });
  const sys = systemML(d.A, d.b, d.names);
  const first = { kind: 'eq', math: Mtext, note: 'Une ligne par équation, b après la barre', subgoal: 'write' };
  const hints = [
    { level: 1, html: `Choisis k pour que la case sous le pivot devienne 0 : k = a₂₁/a₁₁. Ici, ${opR(ops[0])}.` },
    { level: 2, html: `${opR(ops[0])} : la ligne ${ops[0].i + 1} devient ${rowHoles(lines[0].result, ops[0].i, 3, 3)}.` },
    { level: 3, html: ML(lines[0].math) },
  ];
  const key = `${AUG}:${Mtext}`;
  // Level 1: the matrix with two blank cells, then each operation with two
  // blank cells in the changed row.
  if (level === 1) {
    const cells = pickCells(M, [1, 2], 2, rng);
    const script = [
      withCells({ kind: 'eq', math: Mtext, note: 'Recopie les coefficients : une ligne par équation', subgoal: 'write' }, cells),
      { kind: 'segment', html: 'Annule la première colonne sous le pivot.', start: { math: Mtext }, judge: { kind: 'rowops', goal: 'col1' } },
      ...lines.map((l) => withCells(l, pickCells(l.result, [l.op.i], 2, rng))),
    ];
    return matLines({
      skill: AUG, level, prompt: `Le système ${sys} s'écrit avec une matrice augmentée. Complète-la, puis annule la première colonne sous le pivot.`,
      start: 'Matrice', judge: { kind: 'mat', expect: Mtext }, mode: 'guided', script, hints, subgoals: AUG_SUB, key, fallback: d.fallback,
    });
  }
  // Level 2: the whole matrix, then the operation chosen among three.
  if (level === 2) {
    const op = ops[0];
    const bad = { ...op, k: op.k.neg() };
    const swapLike = { kind: 'add', i: op.i, j: op.i === 1 ? 2 : 1, k: q(1) };
    const decision = {
      kind: 'decision', prompt: 'Quelle opération annule la case (2, 1) ?', options: rng.shuffle([
        { id: 'ok', label: opR(op), valid: true },
        { id: 'sign', label: opR(bad), valid: false, rule: 'l_rowop_sign', why: `Avec ce signe, la case devient ${fq(M[op.i][0].add(bad.k.mul(M[0][0])))} au lieu de 0.` },
        { id: 'other', label: opR(swapLike), valid: false, why: 'Cette opération ne crée pas de zéro sous le pivot : c\'est la ligne du pivot qu\'il faut ajouter.' },
      ]),
    };
    const script = [
      { ...first },
      { kind: 'segment', html: 'Annule la première colonne sous le pivot.', start: { math: Mtext }, judge: { kind: 'rowops', goal: 'col1' } },
      decision,
      ...lines.map((l) => withCells(l, pickCells(l.result, [l.op.i], 3, rng))),
    ];
    return matLines({
      skill: AUG, level, prompt: `Écris la matrice augmentée du système ${sys}, puis annule la première colonne sous le pivot.`,
      start: 'Matrice', judge: { kind: 'mat', expect: Mtext }, mode: 'guided', script, hints, subgoals: AUG_SUB, key, fallback: d.fallback,
    });
  }
  // Levels 3–5: the matrix, then the first column cleared.
  const script = [first, { kind: 'segment', html: 'Annule la première colonne sous le pivot.', start: { math: Mtext }, judge: { kind: 'rowops', goal: 'col1' } }, ...lines];
  return matLines({
    skill: AUG, level,
    prompt: level === 5
      ? `Résous le début du système ${sys} : sa matrice augmentée, puis la première colonne nettoyée sous le pivot.`
      : `Écris la matrice augmentée du système ${sys}, puis annule la première colonne sous le pivot${level === 3 ? ' : choisis d\'abord l\'opération' : ''}.`,
    start: 'Matrice', judge: { kind: 'mat', expect: Mtext }, mode: level === 3 ? 'tap' : 'free', script,
    hints, subgoals: AUG_SUB, key, tapActions: level === 3 ? 'rowops' : null, fallback: d.fallback,
  });
}

// ======================================================================
// l-sys-echelon
// ======================================================================

const ECH = 'l-sys-echelon';
const ECH_SUB = [
  { id: 'clear', label: 'annuler sous un pivot', skill: AUG },
  { id: 'swap', label: 'échanger deux lignes', skill: ECH },
  { id: 'pivots', label: 'lire les pivots', skill: ECH },
];

// A matrix with the given rank; swap: a zero pivot appears on the way.
function echData(rng, level, { swap = false } = {}) {
  for (let t = 0; t < 200; t++) {
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
    note: (op) => (op.kind === 'swap' ? 'Pivot nul : échanger avec une ligne plus bas' : `Annuler sous le pivot : ${opR(op)}`),
    subgoal: (op) => (op.kind === 'swap' ? 'swap' : 'clear'),
  });
  const judge = { kind: 'rowops', goal: 'echelon', multi: level >= 4 };
  const pivSeg = { kind: 'segment', html: 'Combien de pivots ?', ask: 'nombre de pivots =', start: { math: 'r' }, judge: { kind: 'value', expect: String(rank) } };
  const pivLine = { kind: 'eq', math: String(rank), note: `Pivots en colonnes ${d.pivots.map((c) => c + 1).join(', ')}`, subgoal: 'pivots' };
  const first = d.ops.find((op) => op.kind === 'add');
  const hints = [
    { level: 1, html: 'Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant.' },
    { level: 2, html: (() => { const l = lines.find((x) => x.op.kind === 'add'); return l ? `${opR(l.op)} : la ligne ${l.op.i + 1} devient ${rowHoles(l.result, l.op.i)}.` : 'Échange deux lignes.'; })() },
    { level: 3, html: ML(lines[0].math) },
  ];
  const key = `${ECH}:${Atext}`;
  const script = [];
  if (level <= 2) {
    lines.forEach((l) => {
      if (level === 2 && l.op.kind === 'swap') {
        script.push({
          kind: 'decision', prompt: 'Le pivot de la colonne suivante est nul. Que fais-tu ?', options: [
            { id: 'swap', label: `Échanger : ${opR(l.op)}`, valid: true },
            { id: 'div', label: 'Diviser la ligne par ce pivot', valid: false, why: 'Le pivot vaut 0 : on ne divise pas par 0. On échange avec une ligne plus bas qui a un coefficient non nul.' },
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
    script.push({ kind: 'segment', html: 'Quelles colonnes ont un pivot ? Écris leurs numéros : (1 ; 2 ; 4).', ask: 'colonnes =', start: { math: 'colonnes' }, judge: { kind: 'mat', expect: cols } }, { kind: 'eq', math: cols, subgoal: 'pivots' });
  }
  return matLines({
    skill: ECH, level,
    prompt: level === 5
      ? `Échelonne ${MLm(d.A)}, puis donne le nombre de pivots et les colonnes pivots.`
      : `Échelonne la matrice ${MLm(d.A)}${level === 3 ? ' : choisis chaque opération, puis écris la matrice' : level === 4 ? ' (plusieurs opérations par ligne permises)' : ''}, puis compte les pivots.`,
    start: Atext, judge, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints, subgoals: ECH_SUB, key, tapActions: level === 3 ? 'rowops' : null, fallback: d.fallback,
  });
}

function echExam(rng, exam) {
  if (exam === 'tf') {
    if (rng.chance(0.5)) {
      return tfL({
        skill: ECH, key: `same-pivots:${rng.int(1, 99)}`, truth: true, exam: examTag({ exam }),
        statement: 'Deux formes échelonnées d\'une même matrice A ont leurs pivots aux mêmes positions.',
        explanation: 'Vrai : les positions des pivots ne dépendent pas des opérations choisies (ce sont celles de la forme réduite, qui est unique).',
      });
    }
    const A = rng.pick([[[1, 1], [1, 2]], [[1, 2], [2, 3]], [[2, 1], [4, 3]]]);
    const E1 = MX.echelon(MX.mat(A)).E;
    const E2 = MX.applyOp(E1, { kind: 'scale', i: 0, k: q(2) });
    return tfL({
      skill: ECH, key: `unique:${mt(MX.mat(A))}`, truth: false, exam: examTag({ exam }),
      statement: 'La forme échelonnée d\'une matrice est unique.',
      counter: {
        kind: 'matOne', params: { want: 'echelonNotUnique' },
        ask: [{ v: 'A', label: 'A =', shape: [2, 2] }, { v: 'E1', label: 'E₁ =', shape: [2, 2] }, { v: 'E2', label: 'E₂ =', shape: [2, 2] }],
        answer: { A: mt(MX.mat(A)), E1: mt(E1), E2: mt(E2) },
      },
      explanation: `Faux : ${MLm(E1)} et ${MLm(E2)} sont deux formes échelonnées de ${MLm(MX.mat(A))}. Seule la forme <b>réduite</b> est unique.`,
    });
  }
  const d = echData(rng, 4);
  const r = d.pivots.length;
  const n = (v) => ({ html: String(v) });
  return mcqDistinct({
    skill: ECH, level: 4, key: `mcq:${mt(d.A)}`, exam: examTag({ exam }),
    prompt: `${rng.chance(0.5) ? 'Combien de pivots a' : 'Quel est le rang de'} la matrice ${MLm(d.A)} ?`,
    right: String(r),
    wrongs: [{ ...n(d.m), rule: null }, { ...n(d.n), rule: null }],
    fillers: [n(r - 1), n(r + 1), n(r + 2)].filter((o) => Number(o.html) > 0),
    solution: [{ html: `Forme échelonnée : ${MLm(d.E)}`, note: '' }, { html: `${r} pivots`, note: '' }],
  }, rng);
}

// ======================================================================
// l-sys-rref
// ======================================================================

const RREF = 'l-sys-rref';
const RREF_SUB = [
  { id: 'down', label: 'descendre', skill: ECH },
  { id: 'up', label: 'remonter', skill: RREF },
  { id: 'read', label: 'lire le coefficient', skill: RREF },
];
const PIVOTS = [[0, 1], [0, 1, 3], [0, 2, 3]];

// A 3 × 4 matrix whose reduced form has a free entry ≠ 0, ±1 (the
// coefficient asked), integers on the way down.
function rrefData(rng) {
  for (let t = 0; t < 200; t++) {
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
    note: (op) => (op.kind === 'scale' ? 'Pivot à 1' : op.i < op.j ? `Remonter : ${opR(op)}` : `Descendre : ${opR(op)}`),
    subgoal: (op) => (op.kind === 'add' && op.i > op.j ? 'down' : 'up'),
  });
  const key = `${RREF}:${mt(d.A)}`;
  const hints = [
    { level: 1, html: 'Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot.' },
    { level: 2, html: (() => { const l = lines[down] ?? lines[0]; return `${opR(l.op)} : la ligne ${l.op.i + 1} devient ${rowHoles(l.result, l.op.i)}.`; })() },
    { level: 3, html: ML(lines[down]?.math ?? lines[0].math) },
  ];
  const ask = { kind: 'segment', html: `Que vaut ${rName(d.i, d.j)} ?`, ask: `${rName(d.i, d.j)} =`, start: { math: rLabel(d.i, d.j) }, judge: { kind: 'value', expect: qt(d.R[d.i][d.j]) } };
  const askLine = { kind: 'eq', math: qt(d.R[d.i][d.j]), note: `Ligne ${d.i + 1}, colonne ${d.j + 1} de R`, subgoal: 'read' };
  const judge = { kind: 'rowops', goal: 'rref', multi: level >= 4 };
  // Levels 1–2: the way down is done; the way up, guided.
  if (level <= 2) {
    const upLines = lines.slice(down);
    const script = [];
    if (level === 2) {
      script.push({
        kind: 'decision', prompt: 'Dans quel ordre remonter ?', options: [
          { id: 'last', label: 'Du dernier pivot vers le premier', valid: true, quality: 'good' },
          { id: 'first', label: 'Du premier pivot vers le dernier', valid: true, quality: 'poor', why: 'Juste aussi, mais plus long : en partant du haut, une case déjà nettoyée peut se remplir de nouveau.' },
        ],
      });
    }
    script.push(...upLines.map((l) => withCells(l, pickCells(l.result, [l.op.i], level === 1 ? 2 : 3, rng))), ask, askLine);
    return matLines({
      skill: RREF, level, prompt: `Une forme échelonnée de A = ${MLm(d.A)} est ${MLm(d.E)}. Remonte jusqu'à la forme réduite R, puis lis ${rName(d.i, d.j)}.`,
      start: mt(d.E), judge, mode: 'guided', script, hints, subgoals: RREF_SUB, key, fallback: d.fallback,
    });
  }
  if (level === 5) {
    return coefItem({
      skill: RREF, level: 5, prompt: `Soit A = ${MLm(d.A)} et R sa forme échelonnée réduite. Que vaut ${rName(d.i, d.j)} ?`,
      label: rLabel(d.i, d.j), value: qt(d.R[d.i][d.j]), key: `${mt(d.A)}:${d.i}${d.j}`, askCoef: { label: rName(d.i, d.j), path: [d.i, d.j] },
      traps: [{ rule: 'l_rref_not_reduced' }, { rule: 'l_coef_index_swap' }],
      subgoals: RREF_SUB, solution: [{ html: `R = ${MLm(d.R)}`, note: 'Forme réduite' }, { html: `${rName(d.i, d.j)} = ${fq(d.R[d.i][d.j])}`, note: '' }], fallback: d.fallback,
    });
  }
  return matLines({
    skill: RREF, level, prompt: `Réduis A = ${MLm(d.A)} jusqu'à sa forme échelonnée réduite R${level === 3 ? ' : choisis chaque opération, puis écris la matrice' : ''}, puis lis ${rName(d.i, d.j)}.`,
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
        statement: which === 0 ? 'La forme échelonnée réduite d\'une matrice est unique.' : 'Deux matrices équivalentes par lignes ont la même forme échelonnée réduite.',
        explanation: 'Vrai : c\'est le théorème d\'unicité de la forme réduite.',
      });
    }
    const A = rng.pick([[[1, 2], [3, 4]], [[1, 0], [1, 1]], [[2, 1], [1, 1]]]);
    const B = MX.identity(2);
    return tfL({
      skill: RREF, key: `same:${mt(MX.mat(A))}`, truth: false, exam: examTag({ exam }),
      statement: 'Si deux matrices de même taille ont la même forme échelonnée réduite, elles sont égales.',
      counter: { kind: 'matPair', params: { n: 2, test: 'sameRref' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }, { v: 'B', label: 'B =', shape: [2, 2] }], answer: { A: mt(MX.mat(A)), B: mt(B) } },
      explanation: `Faux : ${MLm(MX.mat(A))} et I₂ ont toutes deux la forme réduite I₂.`,
    });
  }
  const d = rrefData(rng);
  const right = d.R[d.i][d.j];
  if (exam === 'coef') {
    return coefItem({
      skill: RREF, level: 4, prompt: `Soit A = ${MLm(d.A)} et R sa forme échelonnée réduite. Que vaut ${rName(d.i, d.j)} ?`,
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
    prompt: `Soit A = ${MLm(d.A)} et R sa forme échelonnée réduite. Que vaut ${rName(d.i, d.j)} ?`,
    right: fq(right),
    wrongs: [
      { html: fq(d.E[d.i][d.j]), rule: 'l_rref_not_reduced' },
      d.R[d.j]?.[d.i] ? { html: fq(d.R[d.j][d.i]), rule: 'l_coef_index_swap' } : null,
      signR ? { html: fq(signR), rule: 'l_rowop_sign' } : null,
    ].filter(Boolean),
    fillers: [{ html: fq(right.neg()) }, { html: fq(right.add(1)) }, { html: fq(right.sub(1)) }],
    solution: [{ html: `R = ${MLm(d.R)}`, note: 'Forme réduite' }],
  }, rng);
}

// ======================================================================

export const GEN = {
  [AUG]: (level, rng) => augItem(level, rng),
  [ECH]: (level, rng, profile, opts = {}) => (opts.exam ? echExam(rng, opts.exam) : echItem(level, rng)),
  [RREF]: (level, rng, profile, opts = {}) => (opts.exam ? rrefExam(rng, opts.exam) : rrefItem(level, rng)),
};

// Tools shared by the generators of module L (catalogue L, « Outils
// communs »): matrices built backwards from nice answers, their text in
// the line language of js/cas/matexpr.js, and item builders for the matrix
// judges (lines with grid blanks, a single grid answer, a coefficient, an
// example to give, multiple choice with distinct options).
//
// Every helper works on exact matrices of js/cas/matrix.js (rows of Q).
// Texts: mt([[1, 2], [3, 4]]) = '[[1,2],[3,4]]', vt([1, 2]) = '(1 ; 2)'.
// Display: ML(text) is the MathML of a line, as the judges show it.

import { Q } from '../../math/rational.js';
import * as MX from '../../cas/matrix.js';
import { opText } from '../../cas/matexpr.js';
import { buildLine } from '../../judges/matcommon.js';
import { lineML, normalizeMatText } from '../../cas/matexpr.js';
import { linesItem, mcq, tfItem, examTag } from './kit.js';
import { trapAnswers } from '../../judges/diagnose.js';
import { readWith } from '../../judges/index.js';
import { lit } from '../../cas/ast.js';

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const Qm = (rows) => rows.map((r) => r.map((x) => q(x)));

// ---------- texts ----------

// A rational as the judges write it: 3, -3, 3/2.
export const qt = (x) => String(q(x));
// The same for the screen: −3/2.
export const fq = (x) => qt(x).replace('-', '−');
// [[1,2],[3,4]]; with bar: augmented after `bar` columns.
export const mt = (A, bar = null) => `[${A.map((r) => `[${r.map((x, j) => `${bar !== null && j === bar ? '|' : ''}${qt(x)}`).join(',').replace(/,\|/g, '|')}]`).join(',')}]`;
export const aug = (A, b) => mt(A.map((r, i) => [...r, ...(Array.isArray(b[i]) ? b[i] : [b[i]])]), A[0].length);
export const vt = (v) => `(${v.map(qt).join(' ; ')})`;
export const famT = (vs) => vs.map(vt).join(', ');
// Polynomial in t from coefficients (constant first): 1+2t-t^2.
export function polyT(cs, v = 't') {
  const parts = [];
  cs.forEach((c0, k) => {
    const c = q(c0);
    if (c.n === 0) return;
    const abs = c.n < 0 ? c.neg() : c;
    const coef = k === 0 ? qt(abs) : abs.eq(1) ? '' : abs.d === 1 ? qt(abs) : `(${qt(abs)})`;
    const mono = k === 0 ? '' : k === 1 ? v : `${v}^${k}`;
    parts.push({ neg: c.n < 0, s: `${coef}${mono}` });
  });
  if (!parts.length) return '0';
  return parts.map((p, i) => (i === 0 ? (p.neg ? `-${p.s}` : p.s) : `${p.neg ? '-' : '+'}${p.s}`)).join('');
}
// The same, readable: 1 + 2t − t².
export const polyR = (cs, v = 't') => polyT(cs, v).replace(/\^2/g, '²').replace(/\^3/g, '³').replace(/\^4/g, '⁴').replace(/([+-])/g, ' $1 ').replace(/^ - /, '−').replace(/-/g, '−').trim();

// MathML of a line of the matrix judges (opts: vars, names).
export function ML(text, opts = {}) {
  try { return lineML(buildLine({ vars: opts.vars || [], names: opts.names }, normalizeMatText(text))); } catch { return text; }
}
export const MLm = (A, bar = null) => ML(mt(A, bar));
export const MLv = (v) => ML(vt(v));
// An operation as text the judges read, and readable: L2 ← L2 - 2L1.
export const opT = (op) => opText({ ...op, k: op.k !== undefined ? lit(q(op.k)) : undefined, c: op.c !== undefined ? lit(q(op.c)) : undefined });
export const opR = (op) => opT(op).replace(/L(\d)/g, (_, d) => `L${'₀₁₂₃₄₅₆₇₈₉'[d]}`).replace(/-/g, '−');
const SUB = '₀₁₂₃₄₅₆₇₈₉';
export const sub = (n) => String(n).split('').map((d) => SUB[d] ?? d).join('');

// ---------- matrices built backwards ----------

const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
const maxAbs = (A) => Math.max(...A.flat().map((x) => Math.abs(q(x).valueOf())));
const isInt = (A) => A.every((r) => r.every((x) => q(x).d === 1));

// A product of 3 to 5 operations Lᵢ ← Lᵢ + kLⱼ (k ∈ {±1, ±2}) and swaps,
// applied to Iₙ: det = ±1, M and M⁻¹ whole. Entries ≤ max.
export function unimodular(n, rng, { max = 3, swaps = true, steps } = {}) {
  for (let t = 0; t < 200; t++) {
    let M = MX.identity(n);
    const k = steps ?? rng.int(3, 5);
    for (let s = 0; s < k; s++) {
      if (swaps && rng.chance(0.15)) {
        const i = rng.int(0, n - 1);
        let j = rng.int(0, n - 1);
        if (j === i) j = (i + 1) % n;
        M = MX.applyOp(M, { kind: 'swap', i, j });
      } else {
        const i = rng.int(0, n - 1);
        let j = rng.int(0, n - 1);
        if (j === i) j = (i + 1) % n;
        M = MX.applyOp(M, { kind: 'add', i, j, k: q(rng.pick([1, -1, 2, -2])) });
      }
    }
    if (maxAbs(M) <= max && maxAbs(MX.inverse(M)) <= Math.max(max, 4) && !MX.equal(M, MX.identity(n))) return M;
  }
  return MX.mat(n === 2 ? [[1, 1], [1, 2]] : n === 3 ? [[1, 2, 0], [2, 5, 1], [1, 3, 2]] : MX.identity(n).map((r, i) => r.map((x, j) => (j === i + 1 ? 1 : x.valueOf()))));
}

// A reduced form R (m × n) with the given pivot columns (0-based) and free
// entries in [lo ; hi], then A = M·R with M = unimodular(m). No zero column
// in A; at most `big` entries outside [−9 ; 9].
export function rrefWith(m, n, pivots, rng, { lo = -3, hi = 3, big = 2, max = 3, needFree = false } = {}) {
  for (let t = 0; t < 200; t++) {
    const R = MX.zeros(m, n);
    pivots.forEach((c, r) => {
      R[r][c] = q(1);
      for (let j = c + 1; j < n; j++) if (!pivots.includes(j)) R[r][j] = q(rng.int(lo, hi));
    });
    if (needFree && !R.some((r) => r.some((x, j) => !pivots.includes(j) && x.n !== 0 && Math.abs(x.n) !== 1))) continue;
    const M = unimodular(m, rng, { max });
    const A = MX.mul(M, R);
    if (MX.transpose(A).some((c) => c.every((x) => x.n === 0))) continue;
    if (A.flat().filter((x) => Math.abs(x.valueOf()) > 9).length > big) continue;
    if (MX.equal(A, R)) continue;
    return { A, R, M };
  }
  const R = MX.zeros(m, n);
  pivots.forEach((c, r) => { R[r][c] = q(1); });
  return { A: R, R, M: MX.identity(m), fallback: true };
}

// L unit lower (ℓᵢⱼ ∈ [−3 ; 3]), U upper (pivots in {±1, ±2, 3}); A = LU.
// fracL: one pivot of U is 2 and its row even, so that an ℓ is k/2 while A
// stays whole.
export function luPair(n, rng, { fracL = false } = {}) {
  for (let t = 0; t < 200; t++) {
    const L = MX.identity(n);
    const U = MX.zeros(n, n);
    for (let i = 0; i < n; i++) {
      U[i][i] = q(rng.pick([1, -1, 2, -2, 3]));
      for (let j = i + 1; j < n; j++) U[i][j] = q(rng.int(-3, 4));
      for (let j = 0; j < i; j++) L[i][j] = q(rng.int(-3, 3));
    }
    if (fracL) {
      const p = rng.int(1, n - 2);
      U[p][p] = q(2);
      for (let j = p + 1; j < n; j++) U[p][j] = q(2 * rng.int(-2, 2));
      const i = rng.int(p + 1, n - 1);
      L[i][p] = q(rng.pick([1, 3, -1, -3]), 2);
    }
    const A = MX.mul(L, U);
    if (!isInt(A) || maxAbs(A) > 12) continue;
    if (L.every((r, i) => r.every((x, j) => j >= i || x.n === 0))) continue;
    return { L, U, A };
  }
  const L = MX.mat([[1, 0, 0], [2, 1, 0], [-1, 3, 1]]);
  const U = MX.mat([[2, 1, -1], [0, -1, 2], [0, 0, 3]]);
  return { L, U, A: MX.mul(L, U), fallback: true };
}

// P = unimodular(n), D = diag(eigs), A = PDP⁻¹ whole, entries ≤ max.
export function pdp(eigs, rng, { max = 12 } = {}) {
  const n = eigs.length;
  for (let t = 0; t < 200; t++) {
    const P = unimodular(n, rng, { max: 3, swaps: false });
    const Pinv = MX.inverse(P);
    const D = MX.diag(eigs.map((x) => q(x)));
    const A = MX.mul(MX.mul(P, D), Pinv);
    if (!isInt(A) || maxAbs(A) > max || MX.isDiagonal(A)) continue;
    return { P, D, A, Pinv };
  }
  const P = MX.identity(n).map((r, i) => r.map((x, j) => (j === i + 1 ? q(1) : x)));
  const D = MX.diag(eigs.map((x) => q(x)));
  return { P, D, A: MX.mul(MX.mul(P, D), MX.inverse(P)), Pinv: MX.inverse(P), fallback: true };
}

const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
const ORTH3 = [
  [9, [[1, 2, 2], [2, 1, -2], [2, -2, 1]], 3],
  [49, [[2, 3, 6], [3, -6, 2], [6, 2, -3]], 7],
  [81, [[1, 4, 8], [4, 7, -4], [8, -4, 1]], 9],
];

// A rational orthogonal matrix: 2 × 2 from Pythagorean triples, 3 × 3 from
// the table, 4 × 4 = ½·Hadamard; rows and columns permuted, signs changed.
export function orthRational(n, rng) {
  let U;
  if (n === 2) {
    const [a, b, c] = rng.pick(TRIPLES);
    U = rng.chance(0.5) ? [[q(a, c), q(-b, c)], [q(b, c), q(a, c)]] : [[q(a, c), q(b, c)], [q(b, c), q(-a, c)]];
  } else if (n === 3) {
    const [, M, d] = rng.pick(ORTH3);
    U = M.map((r) => r.map((x) => q(x, d)));
  } else {
    const H = [[1, 1, 1, 1], [1, -1, 1, -1], [1, 1, -1, -1], [1, -1, -1, 1]];
    U = H.map((r) => r.map((x) => q(x, 2)));
  }
  // Permute and change signs of columns.
  const perm = rng.shuffle([...Array(n).keys()]);
  const sgn = perm.map(() => (rng.chance(0.3) ? -1 : 1));
  return U.map((r) => perm.map((j, k) => r[j].mul(sgn[k])));
}

// k whole vectors of ℝⁿ, pairwise orthogonal, entries in [−3 ; 3],
// ‖vᵢ‖² ≤ maxNorm2.
export function orthIntBasis(n, k, rng, { maxNorm2 = 14, lo = -3, hi = 3 } = {}) {
  for (let t = 0; t < 200; t++) {
    const vs = [];
    let ok = true;
    for (let j = 0; j < k && ok; j++) {
      let found = null;
      for (let s = 0; s < 200 && !found; s++) {
        const v = Array.from({ length: n }, () => q(rng.int(lo, hi)));
        if (v.every((x) => x.n === 0)) continue;
        if (vs.some((u) => MX.dot(u, v).n !== 0)) continue;
        if (MX.dot(v, v).valueOf() > maxNorm2) continue;
        found = v;
      }
      if (!found) ok = false; else vs.push(found);
    }
    if (ok) return vs;
  }
  const E = MX.identity(n);
  return E.slice(0, k).map((r) => [...r]);
}

// xⱼ = vⱼ + Σ_{i<j} cᵢⱼvᵢ, cᵢⱼ ∈ {−2, …, 2}, at least one ≠ 0 per j ≥ 2:
// Gram-Schmidt on the xⱼ gives back the vⱼ, with coefficients cᵢⱼ.
export function gsReverse(vs, rng, { lo = -2, hi = 2 } = {}) {
  const C = vs.map(() => vs.map(() => 0));
  const xs = vs.map((v, j) => {
    let x = [...v];
    let any = false;
    for (let i = 0; i < j; i++) {
      let c = rng.int(lo, hi);
      if (i === j - 1 && !any && c === 0) c = rng.pick([1, -1, 2]);
      if (c) any = true;
      C[i][j] = c;
      x = x.map((y, k) => y.add(vs[i][k].mul(c)));
    }
    return x;
  });
  return { xs, C };
}

// b = A·x̂ + r, r ≠ 0 whole in Ker Aᵀ (entries in [−2 ; 2]): Ax = b has no
// solution, its least-squares solution is x̂.
export function lsqReverse(A, xhat, rng) {
  const K = MX.kernel(MX.transpose(A));
  for (let t = 0; t < 200; t++) {
    let r = A.map(() => q(0));
    for (const v of K) {
      const c = rng.int(-2, 2);
      r = r.map((x, i) => x.add(v[i].mul(c)));
    }
    if (r.every((x) => x.n === 0) || r.some((x) => x.d !== 1 || Math.abs(x.valueOf()) > 4)) continue;
    const b = MX.matVec(A, xhat.map((x) => q(x))).map((x, i) => x.add(r[i]));
    return { b, r };
  }
  const r = K[0] ?? A.map(() => q(0));
  return { b: MX.matVec(A, xhat.map((x) => q(x))).map((x, i) => x.add(r[i])), r, fallback: true };
}

// A basis of Pₙ (n + 1 polynomials, coordinates whole): columns of a
// unimodular matrix read in (1, t, …, tⁿ).
export function polyBasis(n, rng, opts = {}) {
  const M = unimodular(n + 1, rng, { max: 2, ...opts });
  const cols = MX.transpose(M);
  return { M, polys: cols, texts: cols.map((c) => polyT(c)) };
}

// ---------- reference lines of row reduction ----------

// The lines of a reduction from A by the given operations: each line
// « op : [[…]] » with its result. ops: [{kind, i, j, k, c}] (0-based, Q or numbers).
export function opLines(A, ops, { bar = null, note, subgoal } = {}) {
  let M = A;
  return ops.map((op0) => {
    const op = { ...op0, k: op0.k !== undefined ? q(op0.k) : undefined, c: op0.c !== undefined ? q(op0.c) : undefined };
    M = MX.applyOp(M, op);
    return { kind: 'eq', math: `${opT(op)} : ${mt(M, bar)}`, note: typeof note === 'function' ? note(op) : note, subgoal: typeof subgoal === 'function' ? subgoal(op) : subgoal, result: M, op };
  });
}

// Blank cells of a guided matrix line: k entries of the changed rows.
// cells: [[row, col]] 0-based in the line's matrix.
export function withCells(line, cells) { return { ...line, cells }; }
export function pickCells(M, rows, k, rng) {
  const all = [];
  for (const i of rows) for (let j = 0; j < M[i].length; j++) all.push([i, j]);
  return rng.shuffle(all).slice(0, Math.min(k, all.length)).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

// A row of M with some entries hidden (hints « ligne à trous »):
// rowHoles(M, i, bar, k) → '[0, □, □ | □]'.
export function rowHoles(M, i, bar = null, k = 2) {
  const cells = M[i].map((x) => fq(x));
  const idx = cells.map((_, j) => j).filter((j) => M[i][j].n !== 0).slice(-k);
  idx.forEach((j) => { cells[j] = '□'; });
  return `[${cells.map((c, j) => `${bar !== null && j === bar ? '| ' : ''}${c}`).join(', ').replace(/, \| /g, ' | ')}]`;
}

// ---------- items ----------

// A lines item of a matrix judge: linesItem with its defaults (baits from
// the traps on the first line, keys of the grid).
export function matLines(o) {
  return linesItem({ keys: ['calc', 'greek'], ...o });
}

// « b₁₃ = ? »: a coefficient (exam variant `coef`, level 5). A lines item
// whose only line is the value; label is the CAS text of the symbol
// (b_13), traps give the baits.
export function coefItem(o) {
  const value = String(o.value);
  const radical = /√|π/.test(value);
  const item = linesItem({
    skill: o.skill, level: o.level ?? 4, prompt: o.prompt, start: o.label,
    judge: { kind: 'value', expect: value, form: radical ? 'exact' : 'irreducible' },
    mode: 'free', script: [{ kind: 'eq', math: value, note: o.note || '' }],
    hints: o.hints || [], noHints: o.noHints ?? true, subgoals: o.subgoals || [], keys: ['calc'],
    key: `${o.skill}:coef:${o.key}`, exam: o.exam ?? false, fallback: o.fallback,
    baits: [...new Set((o.traps || []).map((t) => t.rule).filter(Boolean))],
    solution: o.solution,
    expectedSec: o.expectedSec || 120,
  });
  item.final = { form: 'any', askCoef: o.askCoef || { label: o.label } };
  return item;
}

// A single answer in a grid (spec §6 `matrix`): judged by its judge from
// `start`; the item is right when the judge says `done`.
export function matrixItem(o) {
  return {
    skill: o.skill, level: o.level, type: 'matrix', prompt: o.prompt,
    rows: o.rows, cols: o.cols, judge: o.judge, start: { math: o.start ?? '?' }, answer: o.answer,
    hints: o.noHints || o.exam ? [] : o.hints || [],
    noHints: !!o.noHints || !!o.exam,
    solution: o.solution || [{ html: ML(o.answer, o.judge), note: '' }],
    answerHtml: o.answerHtml || ML(o.answer, o.judge),
    baits: o.baits || [],
    subgoals: o.subgoals || [],
    key: `${o.skill}:matrix:${o.key}`, expectedSec: o.expectedSec || 90,
    exam: o.exam || false, fallback: !!o.fallback,
  };
}

// « Donne une matrice telle que… » (spec §6 `example`): the property is a
// counter-example kind of js/judges/linalg-examples.js (or examples.js).
export function exampleItem(o) {
  return {
    skill: o.skill, level: o.level, type: 'example', prompt: o.prompt,
    property: o.property, answer: o.property.answer,
    hints: o.noHints || o.exam ? [] : o.hints || [],
    noHints: !!o.noHints || !!o.exam,
    solution: o.solution || [],
    baits: o.baits || [],
    subgoals: o.subgoals || [],
    key: `${o.skill}:example:${o.key}`, expectedSec: o.expectedSec || 90,
    exam: o.exam || false, fallback: !!o.fallback,
  };
}

// Multiple choice with distinct options: right = {html}, wrongs = [{html,
// rule}] in order of preference (traps first), fillers last. A wrong
// option equal to the right one is dropped (§16.3).
export function mcqDistinct(o, rng) {
  const options = [{ html: o.right, correct: true }];
  for (const w of [...(o.wrongs || []), ...(o.fillers || [])]) {
    if (options.length >= (o.count || 4)) break;
    if (!w || w.html === undefined || options.some((x) => x.html === w.html)) continue;
    options.push({ html: w.html, correct: false, rule: w.rule ?? null });
  }
  return mcq({ ...o, options }, rng);
}

// True or false, with the exam tag.
export function tfL(o) { return tfItem({ level: 4, ...o }); }

export { examTag, trapAnswers, readWith, MX };

// Generators of module L, section « eig » (Lay 5: eigenvalues and
// eigenvectors), spec §8.3. Catalogue: docs/universite/L-M-algebre-lineaire.md.
//
// Every item is a chain of parts, each with its own judge (§16.2 segments):
// Av (mat), A − λI (mat), its reduction (rowops), det(A − λI) (det, in λ),
// the roots (solset or poly), an eigenvector (eigvec), an eigenspace
// (span), P and D (factor, PDP), Aᵏ (mat with the letter k), a number
// (value). Levels: 1–2 guided (grid cells to fill, notes; 2 adds a
// decision), 3 choose the action (a menu per part), 4 free, 5 alone.
// Matrices are built backwards (alglin-kit.js pdp, and sparse3 below: a
// 3 × 3 with a row that has two zeros, so that det(A − λI) expands in one
// line). opts.exam = 'mcq' | 'tf' | 'coef' | 'open' gives the exam variants.

import * as MX from '../../cas/matrix.js';
import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toMathML } from '../../cas/mathml.js';
import { blankLine } from '../../judges/lines.js';
import { exactValue } from '../../cas/normal.js';
import {
  q, mt, vt, ML, MLm, fq, qt, sub, pdp, unimodular, opLines, pickCells, matLines, coefItem, mcqDistinct, tfL, examTag, opR,
} from './alglin-kit.js';

// ---------- numbers and texts ----------

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const lcm = (a, b) => (a / gcd(a, b)) * b;
const nzPick = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
const maxAbs = (A) => Math.max(...A.flat().map((x) => Math.abs(q(x).valueOf())));
const isInt = (A) => A.every((r) => r.every((x) => q(x).d === 1));
const shiftQ = (A, l) => A.map((r, i) => r.map((x, j) => (i === j ? x.sub(q(l)) : x)));

// A vector of Q as whole numbers without common factor, first non-zero > 0.
export function primitive(v) {
  const L = v.reduce((l, x) => lcm(l, x.d), 1);
  let w = v.map((x) => x.mul(L));
  const g = w.reduce((s, x) => gcd(s, x.n), 0) || 1;
  w = w.map((x) => x.div(g));
  const f = w.find((x) => x.n !== 0);
  return f && f.n < 0 ? w.map((x) => x.neg()) : w;
}
// A basis of E_λ, whole vectors.
const eigBasis = (A, l) => MX.kernel(shiftQ(A, l)).map(primitive);

// Texts in λ: 4 − λ (a case of A − λI), λ − 2 (a factor).
const lamC = (a) => (q(a).n === 0 ? '-λ' : `${qt(a)}-λ`);
const linF = (r) => (q(r).n === 0 ? 'λ' : q(r).n < 0 ? `λ+${qt(q(r).neg())}` : `λ-${qt(r)}`);
// A − λI as text.
const shiftT = (A) => `[${A.map((r, i) => `[${r.map((x, j) => (i === j ? lamC(x) : qt(x))).join(',')}]`).join(',')}]`;
// A − μI as the name expression the judges read: A-4I, A+2I.
const shiftName = (mu, name = 'A') => { const a = q(mu).n < 0 ? q(mu).neg() : q(mu); const k = a.eq(1) ? '' : qt(a); return q(mu).n < 0 ? `${name}+${k}I` : `${name}-${k}I`; };
const shiftR = (mu, name = 'A') => shiftName(mu, name).replace('-', ' − ').replace('+', ' + ');
// A polynomial in v, highest degree first (coefficients constant first).
export function polyDesc(cs, v = 'λ') {
  const parts = [];
  for (let k = cs.length - 1; k >= 0; k--) {
    const c = q(cs[k]);
    if (c.n === 0) continue;
    const abs = c.n < 0 ? c.neg() : c;
    const coef = k === 0 ? qt(abs) : abs.eq(1) ? '' : abs.d === 1 ? qt(abs) : `(${qt(abs)})`;
    const mono = k === 0 ? '' : k === 1 ? v : `${v}^${k}`;
    parts.push({ neg: c.n < 0, s: `${coef}${mono}` });
  }
  if (!parts.length) return '0';
  return parts.map((p, i) => (i === 0 ? (p.neg ? `-${p.s}` : p.s) : `${p.neg ? '-' : '+'}${p.s}`)).join('');
}
// (λ − r₁)(λ − r₂)…, equal factors grouped: (λ-2)^2(λ-4).
function factoredT(roots, lead = 1) {
  const groups = [];
  for (const r of [...roots].sort((a, b) => q(a).valueOf() - q(b).valueOf())) {
    const g = groups.find((x) => q(x.r).eq(q(r)));
    if (g) g.m++; else groups.push({ r, m: 1 });
  }
  const zero = groups.find((g) => q(g.r).n === 0);
  const body = (zero ? `λ${zero.m > 1 ? `^${zero.m}` : ''}` : '') + groups.filter((g) => g !== zero).map(({ r, m }) => `(${linF(r)})${m > 1 ? `^${m}` : ''}`).join('');
  return lead < 0 ? `-${body}` : body;
}
// Roots as a solset line: λ=2 ou λ=5.
const rootsLine = (roots, v = 'λ') => [...new Set(roots.map((r) => q(r).valueOf()))].sort((a, b) => a - b).map((r) => `${v}=${qt(roots.find((x) => q(x).valueOf() === r))}`).join(' ou ');
// Readable texts.
const R = (t) => String(t).replace(/-/g, '−').replace(/\^2/g, '²').replace(/\^3/g, '³').replace(/\^k/g, 'ᵏ').replace(/·/g, '·');
const CM = (t, vars = ['λ']) => toMathML(parse(t, { vars }));
const setR = (xs) => `{${xs.map((x) => fq(x)).join(' ; ')}}`;
const vecR = (v) => `(${v.map(fq).join(' ; ')})`;
const LSUB = (l) => sub(Math.abs(q(l).valueOf())).replace(/^/, q(l).n < 0 ? '₋' : '');
// E_2, E_(-1): the name of an eigenspace as the judges read it.
const eName = (l) => `E_${q(l).n < 0 ? `(${qt(l)})` : qt(l)}`;
// A matrix with □ in some cells (hints): [[□, 1], [2, □]].
const holeMat = (M, cells) => `[${M.map((r, i) => `[${r.map((x, j) => (cells.some(([a, b]) => a === i && b === j) ? '□' : fq(x))).join(', ')}]`).join(', ')}]`;
// A vector with one entry hidden.
const holeVec = (v) => { const k = Math.max(0, v.findLastIndex((x) => x.n !== 0)); return `(${v.map((x, i) => (i === k ? '□' : fq(x))).join(' ; ')})`; };
const ESUB = (l) => `E${q(l).n < 0 ? '₋' : ''}${sub(Math.abs(q(l).n))}${q(l).d > 1 ? `/${q(l).d}` : ''}`;

// Blank numbers of a CAS line (guided levels): k number nodes of the line.
function blankNums(math, vars, k, rng) {
  const node = parse(math, { vars });
  const nums = [];
  const walk = (n) => {
    if (!n || typeof n !== 'object') return;
    if (n.t === 'num') { nums.push(n); return; }
    for (const key of Object.keys(n)) {
      if (n.t === 'pow' && key === 'e') continue;
      const c = n[key];
      if (Array.isArray(c)) c.forEach(walk); else if (c && typeof c === 'object' && c.t) walk(c);
    }
  };
  walk(node);
  const holes = rng.shuffle(nums.filter((x) => String(x.v ?? x.n ?? '') !== '1')).slice(0, k);
  if (!holes.length) return { math };
  const b = blankLine(node, holes, { vars });
  return b.blanks.length ? b : { math };
}

// ---------- matrices built backwards ----------

// 2 × 2, eigenvalues eigs (distinct), whole entries ≤ max, not triangular;
// P (columns: whole eigenvectors, first entry ≥ 0) with det ±1.
// The 2 × 2 whole matrices P with det ±1 and entries in [−2 ; 2], columns
// with first non-zero entry > 0 (computed once).
const P2 = [];
for (let a = 0; a <= 2; a++) for (let b = 0; b <= 2; b++) for (let c = -2; c <= 2; c++) for (let d = -2; d <= 2; d++) {
  if (Math.abs(a * d - b * c) !== 1) continue;
  if ((a === 0 && c <= 0) || (b === 0 && d <= 0)) continue;
  P2.push([[a, b], [c, d]]);
}
export function eig2(rng, eigs, { max = 9 } = {}) {
  const [l1, l2] = eigs.map((x) => q(x));
  for (const p of rng.shuffle(P2)) {
    const P = MX.mat(p);
    const Pinv = MX.inverse(P);
    const D = MX.diag([l1, l2]);
    const A = MX.mul(MX.mul(P, D), Pinv);
    if (maxAbs(A) > max || A[0][1].n === 0 || A[1][0].n === 0) continue;
    return { A, eigs: [l1, l2], vecs: MX.transpose(P), P, D, Pinv };
  }
  const A = MX.mat([[5, -2], [4, -1]]);
  const P = MX.mat([[1, 1], [2, 1]]);
  return { A, eigs: [q(1), q(3)], vecs: MX.transpose(P), P, D: MX.diag([1, 3]), Pinv: MX.inverse(P), fallback: true };
}

// 3 × 3 with a row r that is (λ₁ at its diagonal, zeros elsewhere): A is
// conjugate by a permutation to [[λ₁, 0, 0], [c, B]], B 2 × 2 of
// eigenvalues λ₂ ≠ λ₃. mode 'distinct' (λ₁ ∉ {λ₂, λ₃}), 'dim2' (λ₁ = λ₂,
// dim E = 2) or 'jordan' (λ₁ = λ₂, dim E = 1).
export function sparse3(rng, eigs, { mode = 'distinct', max = 9 } = {}) {
  let [l1, l2, l3] = eigs.map((x) => q(x));
  // Distinct: B takes the two closest eigenvalues (whole entries stay small).
  if (mode === 'distinct') {
    const s = [l1, l2, l3].sort((a, b) => a.valueOf() - b.valueOf());
    [l1, l2, l3] = s[1].sub(s[0]).valueOf() <= s[2].sub(s[1]).valueOf() ? [s[2], s[0], s[1]] : [s[0], s[1], s[2]];
  }
  for (let t = 0; t < 200; t++) {
    const B = eig2(rng, [l2.valueOf(), l3.valueOf()], { max: 8 });
    if (B.fallback) break;
    const Bm = B.A;
    let c;
    const u = [q(rng.int(-2, 2)), q(rng.int(-2, 2))];
    if (mode === 'jordan') c = [q(rng.int(-3, 3)), q(rng.int(-3, 3))];
    else if (mode === 'dim2') c = MX.matVec(shiftQ(Bm, l1), u);
    else c = MX.matVec(shiftQ(Bm, l1), u).map((x) => x.neg());
    if (c.every((x) => x.n === 0)) continue;
    const A0 = [[l1, q(0), q(0)], [c[0], Bm[0][0], Bm[0][1]], [c[1], Bm[1][0], Bm[1][1]]];
    const perm = rng.shuffle([0, 1, 2]);
    const A = MX.zeros(3, 3);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) A[perm[i]][perm[j]] = A0[i][j];
    if (!isInt(A) || maxAbs(A) > max) continue;
    const dim = 3 - MX.rank(shiftQ(A, l1));
    if (mode === 'jordan' && dim !== 1) continue;
    if (mode === 'dim2' && dim !== 2) continue;
    // Only one sparse row (the expansion is then the one to see).
    return { A, row: perm[0], eigs: [l1, l2, l3], B: Bm };
  }
  const A = MX.mat([[2, 0, 0], [1, 3, 1], [1, 1, 3]]);
  return { A, row: 0, eigs: [q(2), q(2), q(4)], fallback: true };
}

// k distinct values of pool whose span (max − min) is at most span.
function pickEigs(rng, pool, k, span = 4) {
  for (let t = 0; t < 100; t++) {
    const e = rng.shuffle(pool).slice(0, k).sort((a, b) => a - b);
    if (e[k - 1] - e[0] <= span) return e;
  }
  return pool.slice(0, k);
}

// The distinct eigenvalues of a list, sorted.
const distinct = (eigs) => [...new Map(eigs.map((x) => [q(x).valueOf(), q(x)])).values()].sort((a, b) => a.valueOf() - b.valueOf());

// ---------- det(A − λI) lines ----------

// 2 × 2: [[a−λ, b], [c, d−λ]] → (a−λ)(d−λ) − bc → λ² − tλ + p → factored.
function charLines2(A, roots, { withMatrix = true } = {}) {
  const [[a, b], [c, d]] = A;
  const bc = b.mul(c);
  const tr = a.add(d);
  const dt = MX.det(A);
  const out = [];
  if (withMatrix) out.push({ math: `det${shiftT(A)}`, note: 'λ soustrait sur toute la diagonale', subgoal: 'develop' });
  out.push({ math: `(${lamC(a)})(${lamC(d)})${bc.n >= 0 ? '-' : '+'}${qt(bc.n >= 0 ? bc : bc.neg())}`, note: 'Diagonale moins antidiagonale', subgoal: 'develop' });
  out.push({ math: polyDesc([dt, tr.neg(), q(1)]), note: `λ² − (tr A)λ + det A`, subgoal: 'develop' });
  out.push({ math: factoredT(roots), note: 'Factoriser le trinôme', subgoal: 'factor' });
  return out;
}

// 3 × 3 with a sparse row r: (λ₁ − λ)·det(minor) → … → −(λ − λ₁)(λ − λ₂)(λ − λ₃).
function charLines3(A, r, roots, { withLabel = true } = {}) {
  const l1 = A[r][r];
  const keep = [0, 1, 2].filter((i) => i !== r);
  const M = keep.map((i) => keep.map((j) => A[i][j]));
  const [[a, b], [c, d]] = M;
  const bc = b.mul(c);
  const tr = a.add(d);
  const dt = MX.det(M);
  const head = `(${lamC(l1)})`;
  return [
    { math: `${head}·det${shiftT(M)}`, note: `Développer selon la ligne ${r + 1}`, subgoal: 'develop' },
    { math: `${head}((${lamC(a)})(${lamC(d)})${bc.n >= 0 ? '-' : '+'}${qt(bc.n >= 0 ? bc : bc.neg())})`, note: 'Mineur 2 × 2', subgoal: 'develop' },
    { math: `${head}(${polyDesc([dt, tr.neg(), q(1)])})`, note: 'Développer le mineur', subgoal: 'develop' },
    { math: factoredT(roots, -1), note: 'Factoriser', subgoal: 'factor' },
  ].filter(Boolean);
}

const detJudge = (A) => ({ kind: 'det', vars: ['λ'], target: 'factored', names: { A: mt(A) } });
const rootsPart = (roots, factored, html = 'Les valeurs propres sont les racines.') => ({
  html, ask: 'valeurs propres :', start: `${factored}=0`, judge: { kind: 'solset', v: 'λ' },
  lines: [{ math: rootsLine(roots), note: roots.length > distinct(roots).length ? `Multiplicités : ${distinct(roots).map((l) => `${fq(l)} (${roots.filter((x) => q(x).eq(l)).length === 2 ? 'double' : 'simple'})`).join(', ')}` : 'Lire les racines', subgoal: 'roots' }],
});

// ---------- items made of parts ----------

// A part: {html, ask, start, judge, lines: [{math, note, subgoal, cells,
// blanks}], decision, menu}. Level 1 shows the decisions as notes; level 3
// gives each part its menu (tapActions 'menu').
function partsItem(o) {
  const { level, parts } = o;
  const guided = level <= 2;
  const judgeAt = (p) => (level === 3 && p.menu ? { ...p.judge, menu: p.menu } : p.judge);
  const script = [];
  parts.forEach((p, k) => {
    if (k > 0) script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge: judgeAt(p) });
    else if (p.html) script.push({ kind: 'note', html: p.html });
    for (const dec of [...(p.decisions || []), p.decision].filter(Boolean)) {
      if (o.exam) continue;
      if (level === 1) {
        const ok = dec.options.find((x) => x.valid && x.quality !== 'poor');
        script.push({ kind: 'note', html: `${dec.prompt} ${ok.label}.` });
      } else script.push(dec);
    }
    for (const l of p.lines) {
      const line = { kind: 'eq', math: l.math, note: l.note, subgoal: l.subgoal };
      if (guided && l.cells?.length) line.cells = l.cells;
      if (guided && l.blanks?.length) { line.math = l.bmath; line.blanks = l.blanks; }
      script.push(line);
    }
  });
  const item = matLines({
    skill: o.skill, level, prompt: o.prompt, start: parts[0].start, judge: judgeAt(parts[0]),
    mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script, hints: o.hints, subgoals: o.subgoals,
    key: o.key, tapActions: level === 3 ? 'menu' : null, fallback: o.fallback, exam: o.exam, noHints: o.noHints,
  });
  return item;
}

// Cells of a matrix or vector line to fill (guided levels).
const cellsOf = (M, k, rng) => pickCells(M, M.map((_, i) => i), k, rng);
const vcells = (v, k, rng) => pickCells(v.map((x) => [x]), v.map((_, i) => i), k, rng);
// Guided blanks of a CAS line.
function withBlanks(l, vars, k, rng) {
  const b = blankNums(l.math, vars, k, rng);
  return b.blanks ? { ...l, bmath: b.math, blanks: b.blanks } : l;
}

// Menus of the « choose the action » level (one per part).
const MENU = {
  product: [
    { id: 'av', label: 'Calculer Av (lignes de A fois v)', valid: true },
    { id: 'va', label: 'Calculer vᵀA', valid: false, why: 'On teste Av = λv : c\'est A qui multiplie v, à gauche.' },
    { id: 'det', label: 'Calculer det A', valid: false, why: 'det A ne dit rien sur ce vecteur-là.' },
  ],
  shift: [
    { id: 'shift', label: 'Retrancher λ à chaque case de la diagonale', valid: true },
    { id: 'one', label: 'Retrancher λ à la première case', valid: false, rule: 'l_lambda_one_entry', why: 'λI a des λ sur toute la diagonale.' },
    { id: 'all', label: 'Retrancher λ à toutes les cases', valid: false, why: 'λI n\'a de λ que sur la diagonale.' },
  ],
  reduce: [
    { id: 'pivot', label: 'Annuler sous (ou au-dessus d\') un pivot', valid: true },
    { id: 'diag', label: 'Lire les valeurs propres sur la diagonale', valid: false, rule: 'l_eigen_rref', why: 'Les opérations sur les lignes changent les valeurs propres.' },
  ],
  count: [
    { id: 'free', label: 'Compter les colonnes sans pivot', valid: true },
    { id: 'piv', label: 'Compter les pivots', valid: false, why: 'Les pivots donnent le rang ; les variables libres sont les colonnes sans pivot.' },
  ],
  ratio: [
    { id: 'ratio', label: 'Comparer Av à v : Av = λv', valid: true },
    { id: 'sum', label: 'Additionner les composantes de Av', valid: false, why: 'λ est le facteur entre Av et v, composante par composante.' },
  ],
  develop: [
    { id: 'dev', label: 'Développer le déterminant', valid: true },
    { id: 'fact', label: 'Mettre en facteur / factoriser le trinôme', valid: true },
    { id: 'rref', label: 'Échelonner A et lire la diagonale', valid: false, rule: 'l_eigen_rref', why: 'Les opérations sur les lignes changent les valeurs propres.' },
  ],
  roots: [
    { id: 'roots', label: 'Lire les racines du polynôme factorisé', valid: true },
    { id: 'coef', label: 'Lire les coefficients du polynôme', valid: false, why: 'Les valeurs propres sont les racines de p(λ), pas ses coefficients.' },
  ],
  kernel: [
    { id: 'ker', label: 'Une base du noyau : une variable libre = 1, les autres = 0', valid: true },
    { id: 'row', label: 'Prendre une ligne de la matrice réduite', valid: false, rule: 'l_eigvec_row', why: 'v doit être orthogonal aux lignes de A − λI, pas égal à l\'une d\'elles.' },
  ],
  assemble: [
    { id: 'pd', label: 'P = [v₁ … vₙ] et D = diag(λ₁, …, λₙ), dans le même ordre', valid: true },
    { id: 'swap', label: 'Ranger P et D chacun dans son ordre', valid: false, rule: 'l_pd_order', why: 'La colonne k de P doit être un vecteur propre de la valeur en position k de D.' },
  ],
  value: [
    { id: 'apply', label: 'Appliquer la règle à la valeur propre', valid: true },
    { id: 'opp', label: 'Prendre l\'opposé', valid: false, rule: 'l_eig_inv_neg', why: 'A⁻¹v = (1/λ)v : c\'est l\'inverse, pas l\'opposé.' },
  ],
};

// ======================================================================
// l-eig-check
// ======================================================================

const CHECK = 'l-eig-check';
const CHECK_SUB = [
  { id: 'product', label: 'calculer Av', skill: 'l-mat-product' },
  { id: 'echelon', label: 'échelonner A − λI', skill: 'l-sys-echelon' },
  { id: 'conclude', label: 'conclure', skill: CHECK },
];

function checkData(rng, n) {
  for (let t = 0; t < 200; t++) {
    const eigs = pickEigs(rng, [-3, -2, -1, 1, 2, 3, 4, 5], n, n === 2 ? 4 : 5);
    let A;
    let vecs;
    if (n === 2) {
      const d = eig2(rng, eigs);
      if (d.fallback) continue;
      ({ A, vecs } = d);
    } else {
      const d = pdp(eigs, rng, { max: 9 });
      if (d.fallback) continue;
      A = d.A;
      vecs = eigs.map((l) => eigBasis(A, l)[0]);
    }
    if (vecs.some((v) => maxAbs([v]) > 3)) continue;
    // A proper vector (k·vᵢ) and an improper one (vᵢ + vⱼ).
    const i = rng.int(0, n - 1);
    const k = rng.pick([1, -1, 2]);
    const good = vecs[i].map((x) => x.mul(k));
    let j = rng.int(0, n - 1);
    if (j === i) j = (i + 1) % n;
    const bad = vecs[i].map((x, c) => x.add(vecs[j][c]));
    if (bad.every((x) => x.n === 0) || maxAbs([good]) > 6 || maxAbs([bad]) > 6) continue;
    // μ to test: an eigenvalue, or not.
    const isEig = rng.chance(0.5);
    const mu = isEig ? rng.pick(eigs) : rng.pick([-2, -1, 1, 2, 3, 4, 5, 6].filter((x) => !eigs.includes(x)));
    const S = shiftQ(A, mu);
    const e = MX.echelon(S);
    if (!e.ops.length || e.ops.length > (n === 2 ? 2 : 4) || e.ops.some((op) => op.k && op.k.d > 2)) continue;
    if (e.E.flat().some((x) => x.d > 2 || Math.abs(x.valueOf()) > 20)) continue;
    if (maxAbs(MX.matVec(A, good).map((x) => [x])) > 30 || maxAbs(MX.matVec(A, bad).map((x) => [x])) > 30) continue;
    return { A, eigs, vecs, good, bad, lam: q(eigs[i]).mul(1), mu: q(mu), isEig, S, e };
  }
  const A = MX.mat([[3, 1, 0], [1, 3, 0], [0, 0, 2]]);
  const S = shiftQ(A, 4);
  return { A, eigs: [2, 2, 4], vecs: [], good: [q(1), q(-1), q(2)], bad: [q(1), q(1), q(1)], lam: q(2), mu: q(4), isEig: true, S, e: MX.echelon(S), fallback: true };
}

// The parts that test one vector: Av, then λ if v is proper. The decision
// on v goes at the start of the part that follows.
function vectorParts(d, v, level, rng) {
  const Av = MX.matVec(d.A, v);
  const proper = MX.rank(MX.fromCols([v, Av])) <= 1;
  const lam = proper ? (() => { const c = v.findIndex((x) => x.n !== 0); return Av[c].div(v[c]); })() : null;
  const parts = [{
    html: `Calcule A·${vecR(v)}.`, ask: 'Av =', start: `A·${vt(v)}`, judge: { kind: 'mat', names: { A: mt(d.A) } },
    lines: [{ math: vt(Av), note: proper ? `= ${fq(lam)}·v` : 'Pas un multiple de v', subgoal: 'product', cells: level <= 2 ? vcells(Av, level === 1 ? 2 : 3, rng) : null }],
    menu: MENU.product,
  }];
  const decision = {
    kind: 'decision', prompt: `${vecR(v)} est-il un vecteur propre de A ?`, options: [
      { id: 'yes', label: 'Oui', valid: proper, why: proper ? '' : `Av = ${vecR(Av)} n'est pas un multiple de v : compare les rapports composante par composante.` },
      { id: 'no', label: 'Non', valid: !proper, why: proper ? `Av = ${fq(lam)}·v : c'est bien un multiple de v (et v ≠ 0).` : '' },
    ],
  };
  if (proper) {
    parts.push({
      html: `Av = λv : que vaut λ ?`, ask: 'λ =', start: 'λ', judge: { kind: 'value', expect: qt(lam) }, decision,
      lines: [{ math: qt(lam), note: `v est un vecteur propre, de valeur propre ${fq(lam)}`, subgoal: 'conclude' }], menu: MENU.ratio,
    });
    return { parts, pending: null };
  }
  return { parts, pending: decision };
}

function valueParts(d, level, rng, pending) {
  const n = d.A.length;
  const free = n - d.e.pivots.length;
  const lines = opLines(d.S, d.e.ops, { note: (op) => (op.kind === 'swap' ? 'Échanger' : `Annuler sous le pivot : ${opR(op)}`), subgoal: 'echelon' })
    .map((l) => ({ math: l.math, note: l.note, subgoal: l.subgoal, cells: level <= 2 && l.op.kind !== 'swap' ? pickCells(l.result, [l.op.i], 2, rng) : null }));
  return [
    {
      html: `Est-ce que ${fq(d.mu)} est une valeur propre de A ? Écris d'abord ${shiftR(d.mu)}.`, ask: `${shiftR(d.mu)} =`, start: shiftName(d.mu),
      judge: { kind: 'mat', names: { A: mt(d.A) } }, decision: pending || undefined,
      lines: [{ math: mt(d.S), note: `${fq(d.mu)} retranché sur la diagonale`, subgoal: 'echelon', cells: level <= 2 ? d.S.map((_, i) => [i, i]) : null }],
      menu: MENU.shift,
    },
    { html: `Échelonne ${shiftR(d.mu)}.`, start: mt(d.S), judge: { kind: 'rowops', goal: 'echelon' }, lines, menu: MENU.reduce },
    {
      html: `Combien de variables libres a (${shiftR(d.mu)})x = 0 ? (${fq(d.mu)} est valeur propre si et seulement s'il y en a au moins une.)`,
      ask: 'variables libres :', start: 'n', judge: { kind: 'value', expect: String(free) },
      decision: {
        kind: 'decision', prompt: `${fq(d.mu)} est-elle une valeur propre de A ?`, options: [
          { id: 'yes', label: 'Oui', valid: d.isEig, why: d.isEig ? '' : `La forme échelonnée a ${n} pivots : (${shiftR(d.mu)})x = 0 n'a que la solution nulle.` },
          { id: 'no', label: 'Non', valid: !d.isEig, why: d.isEig ? 'Une colonne n\'a pas de pivot : il y a une variable libre, donc une solution non nulle.' : '' },
        ],
      },
      lines: [{ math: String(free), note: d.isEig ? `Une solution non nulle : ${fq(d.mu)} est valeur propre` : `Seule la solution nulle : ${fq(d.mu)} n'est pas valeur propre`, subgoal: 'conclude' }],
      menu: MENU.count,
    },
  ];
}

function checkItem(level, rng) {
  const n = level >= 4 ? 3 : 2;
  const d = checkData(rng, n);
  const two = level === 5;
  const vs = two ? rng.shuffle([d.good, d.bad]) : [rng.chance(level === 1 ? 0.7 : 0.5) ? d.good : d.bad];
  let parts = [];
  let pending = null;
  for (const v of vs) {
    const r = vectorParts(d, v, level, rng);
    if (pending) r.parts[0].decision = pending;
    parts = parts.concat(r.parts);
    pending = r.pending;
  }
  parts = parts.concat(valueParts(d, level, rng, pending));
  if (level === 2) {
    parts[0].decision = {
      kind: 'decision', prompt: `Pour savoir si ${vecR(vs[0])} est un vecteur propre, que fais-tu ?`, options: [
        { id: 'av', label: 'Je calcule Av et je compare à v', valid: true, quality: 'good' },
        { id: 'rref', label: 'J\'échelonne A − λI', valid: false, why: 'On ne connaît pas encore λ : on calcule Av, et λ est le rapport entre Av et v.' },
      ],
    };
  }
  const Av = MX.matVec(d.A, vs[0]);
  const hints = [
    { level: 1, html: 'Calcule Av et compare à v : v est propre si Av = λv pour un nombre λ (et v ≠ 0). Pour une valeur μ, échelonne A − μI et cherche une variable libre.' },
    { level: 2, html: `Av = (${vs[0].map(() => '□').join(' ; ')}) = □·v ? Puis ${shiftR(d.mu)} = ${holeMat(d.S, d.S.map((_, i) => [i, i]))} à échelonner.` },
    { level: 3, html: `Av = ${vecR(Av)}. ${d.isEig ? `${fq(d.mu)} est valeur propre` : `${fq(d.mu)} n'est pas valeur propre`}.` },
  ];
  const vText = vs.map(vecR).join(' et ');
  return partsItem({
    skill: CHECK, level, parts, hints, subgoals: CHECK_SUB, key: `${CHECK}:${mt(d.A)}:${vs.map(vt).join('')}:${qt(d.mu)}`, fallback: d.fallback,
    noHints: level === 5,
    prompt: `Soit A = ${MLm(d.A)}. ${vs.length > 1 ? `Les vecteurs ${vText} sont-ils des vecteurs propres` : `Le vecteur ${vText} est-il un vecteur propre`} de A ? Et ${fq(d.mu)} est-elle une valeur propre de A ?`,
  });
}

function checkExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 2);
    if (which === 0) {
      return tfL({
        skill: CHECK, key: 'zero-eig', truth: true, exam: examTag({ exam }),
        statement: '0 est une valeur propre de A si et seulement si A n\'est pas inversible.',
        explanation: 'Vrai : 0 est valeur propre ⇔ Ax = 0 a une solution non nulle ⇔ A n\'est pas inversible.',
      });
    }
    if (which === 1) {
      const k = rng.pick([2, 3, -1, 5]);
      return tfL({
        skill: CHECK, key: `multiple:${k}`, truth: true, exam: examTag({ exam }),
        statement: `Si v est un vecteur propre de A, alors ${fq(k)}v en est aussi un.`,
        explanation: `Vrai : A(${fq(k)}v) = ${fq(k)}Av = λ(${fq(k)}v), et ${fq(k)}v ≠ 0.`,
      });
    }
    const a = rng.pick([1, 2, -1]);
    const b = a + rng.pick([1, 2, 3]);
    return tfL({
      skill: CHECK, key: `sum:${a}${b}`, truth: false, exam: examTag({ exam }),
      statement: 'Si u et w sont deux vecteurs propres de A, alors u + w est aussi un vecteur propre de A.',
      counter: {
        kind: 'matOne', params: { want: 'sumNotEigvec' },
        ask: [{ v: 'A', label: 'A =', shape: [2, 2] }, { v: 'u', label: 'u =', shape: [2, 1] }, { v: 'w', label: 'w =', shape: [2, 1] }],
        answer: { A: mt(MX.diag([a, b])), u: '(1 ; 0)', w: '(0 ; 1)' },
      },
      explanation: `Faux : avec A = diag(${fq(a)}, ${fq(b)}), u = (1 ; 0) et w = (0 ; 1) sont propres, mais A(u + w) = (${fq(a)} ; ${fq(b)}) n'est pas un multiple de (1 ; 1). C'est vrai seulement si u et w ont la même valeur propre.`,
    });
  }
  const d = checkData(rng, 3);
  const isProper = (v) => v.some((x) => x.n !== 0) && MX.rank(MX.fromCols([v, MX.matVec(d.A, v)])) <= 1;
  const i = d.vecs.findIndex((v) => MX.rank(MX.fromCols([v, d.good])) <= 1);
  const lam = d.eigs[Math.max(0, i)];
  const row = shiftQ(d.A, lam).find((r) => r.some((x) => x.n !== 0));
  const tweak = d.good.map((x, c) => (c === 1 ? x.add(1) : x));
  const zero = d.good.map(() => q(0));
  const opt = (v, rule) => (v && (rule === 'l_eigvec_zero' || !isProper(v)) ? { html: ML(vt(v)), rule } : null);
  return mcqDistinct({
    skill: CHECK, level: 4, key: `mcq:${mt(d.A)}`, exam: examTag({ exam }),
    prompt: `Soit A = ${MLm(d.A)}. Lequel de ces vecteurs est un vecteur propre de A ?`,
    right: ML(vt(d.good)),
    wrongs: [opt(zero, 'l_eigvec_zero'), opt(d.bad, null), opt(row, 'l_eigvec_row')].filter(Boolean),
    fillers: [opt(tweak, null), opt(d.good.map((x, c) => (c === 0 ? x.add(1) : x)), null), opt(d.good.map((x, c) => (c === 2 ? x.sub(1) : x)), null)].filter(Boolean),
    solution: [{ html: `A·${ML(vt(d.good))} = ${ML(vt(MX.matVec(d.A, d.good)))} = ${fq(lam)}·v`, note: 'Av = λv' }, { html: 'Le vecteur nul n\'est jamais un vecteur propre.', note: '' }],
  }, rng);
}

// ======================================================================
// l-eig-charpoly
// ======================================================================

const CHAR = 'l-eig-charpoly';
const CHAR_SUB = [
  { id: 'develop', label: 'développer det(A − λI)', skill: 'l-det-cofactor' },
  { id: 'factor', label: 'factoriser', skill: 'quad-formula' },
  { id: 'roots', label: 'lire les racines', skill: CHAR },
];

function char2Data(rng) {
  for (let t = 0; t < 200; t++) {
    const l1 = rng.int(-5, 6);
    let l2 = rng.int(-5, 6);
    if (l2 === l1) l2 = l1 + rng.pick([1, 2, 3]);
    const eigs = [l1, l2].sort((a, b) => a - b);
    const d = eig2(rng, eigs);
    if (d.fallback || d.A[0][0].n === 0) continue;
    return d;
  }
  return eig2(rng, [2, 5]);
}

function char3Data(rng, { double = false } = {}) {
  for (let t = 0; t < 200; t++) {
    const pool = pickEigs(rng, [-3, -2, -1, 1, 2, 3, 4, 5, 6], 3, 6);
    const eigs = double ? [pool[0], pool[0], pool[1]] : pool;
    const d = sparse3(rng, eigs, { mode: double ? (rng.chance(0.5) ? 'dim2' : 'jordan') : 'distinct' });
    if (d.fallback) continue;
    const r = d.row;
    const keep = [0, 1, 2].filter((i) => i !== r);
    if (d.A[keep[0]][keep[1]].n === 0 || d.A[keep[1]][keep[0]].n === 0) continue;
    return d;
  }
  return sparse3(rng, [2, 2, 4], { mode: 'dim2' });
}

// 4 × 4 lower block-triangular [[B₁, 0], [C, B₂]]: det(A − λI) =
// det(B₁ − λI)·det(B₂ − λI).
function char4Data(rng) {
  for (let t = 0; t < 200; t++) {
    const pool = rng.chance(0.5) ? pickEigs(rng, [-3, -2, -1, 1, 2, 3, 4, 5], 4, 6) : (([a, b, c, d]) => [c, d, a, b])(pickEigs(rng, [-3, -2, -1, 1, 2, 3, 4, 5], 4, 6));
    const b1 = eig2(rng, [pool[0], pool[1]].sort((a, b) => a - b), { max: 8 });
    const b2 = eig2(rng, [pool[2], pool[3]].sort((a, b) => a - b), { max: 8 });
    if (b1.fallback || b2.fallback) continue;
    const C = [[rng.int(-2, 2), rng.int(-2, 2)], [rng.int(-2, 2), rng.int(-2, 2)]].map((r) => r.map((x) => q(x)));
    const A = [
      [b1.A[0][0], b1.A[0][1], q(0), q(0)], [b1.A[1][0], b1.A[1][1], q(0), q(0)],
      [C[0][0], C[0][1], b2.A[0][0], b2.A[0][1]], [C[1][0], C[1][1], b2.A[1][0], b2.A[1][1]],
    ];
    return { A, B1: b1.A, B2: b2.A, eigs: pool.slice(0, 4).map((x) => q(x)) };
  }
  return null;
}

function charItem(level, rng) {
  // L1, L3: 2 × 2 (L3 with 3 × 3 half the time); L2, L4: 3 × 3; L5: 4 × 4.
  const size = level === 1 ? 2 : level === 5 ? 4 : level === 3 ? rng.pick([2, 3]) : 3;
  let A;
  let roots;
  let lines;
  let fallback = false;
  let rowNote = '';
  let r = 0;
  if (size === 2) {
    const d = char2Data(rng);
    ({ A } = d);
    roots = d.eigs;
    lines = charLines2(A, roots, { withMatrix: level !== 1 });
    fallback = d.fallback;
  } else if (size === 3) {
    const d = char3Data(rng, { double: level === 4 && rng.chance(0.5) });
    ({ A } = d);
    r = d.row;
    roots = d.eigs;
    lines = charLines3(A, r, roots);
    fallback = d.fallback;
    rowNote = `la ligne ${r + 1} n'a qu'une case non nulle`;
  } else {
    const d = char4Data(rng);
    if (!d) return charItem(4, rng);
    A = d.A;
    roots = d.eigs;
    const c1 = MX.charpoly(d.B1);
    const c2 = MX.charpoly(d.B2);
    lines = [
      { math: `det${shiftT(d.B1)}·det${shiftT(d.B2)}`, note: 'Triangulaire par blocs : produit des blocs diagonaux', subgoal: 'develop' },
      { math: `(${polyDesc(c1)})(${polyDesc(c2)})`, note: 'Deux déterminants 2 × 2', subgoal: 'develop' },
      { math: factoredT(roots), note: 'Factoriser chaque trinôme', subgoal: 'factor' },
    ];
  }
  const fact = lines[lines.length - 1].math;
  const judge = detJudge(A);
  const parts = [];
  if (level === 1) {
    // A − λI first (cells on the diagonal), then the expansion.
    const S = shiftT(A);
    parts.push({
      html: 'Écris A − λI.', ask: 'A − λI =', start: 'A-λI', judge: { kind: 'mat', names: { A: mt(A) }, vars: ['λ'], expect: 'A-λI' },
      lines: [{ math: S, note: 'λ sur toute la diagonale', subgoal: 'develop', cells: A.map((_, i) => [i, i]) }],
    });
    parts.push({
      html: 'Développe det(A − λI).', start: `det${S}`, judge: { ...judge, names: undefined },
      lines: lines.map((l, k) => (k === 0 ? withBlanks(l, ['λ'], 1, rng) : k === 1 ? withBlanks(l, ['λ'], 2, rng) : l)),
    });
  } else {
    parts.push({ start: 'det(A-λI)', judge, lines, menu: MENU.develop });
  }
  parts.push({ ...rootsPart(roots, fact.replace(/^-/, '')), menu: MENU.roots });
  if (level === 2 && size === 3) {
    const other = (r + 1) % 3;
    parts[0].decision = {
      kind: 'decision', prompt: 'Selon quelle ligne développer det(A − λI) ?', options: rng.shuffle([
        { id: 'sparse', label: `La ligne ${r + 1}`, valid: true, quality: 'good' },
        { id: 'other', label: `La ligne ${other + 1}`, valid: true, quality: 'poor', why: `Juste aussi, mais trois cofacteurs à calculer : ${rowNote}, un seul terme y suffit.` },
      ]),
    };
  }
  const hints = [
    { level: 1, html: size === 4 ? 'Soustrais λ sur toute la diagonale ; la matrice est triangulaire par blocs : det = produit des déterminants des blocs diagonaux.' : `Soustrais λ sur toute la diagonale, puis développe${size === 3 ? ' selon la ligne la plus creuse' : ' : diagonale moins antidiagonale'}.` },
    { level: 2, html: size === 4 ? 'det(A − λI) = det(B₁ − λI)·det(B₂ − λI) = (□)(□)' : size === 3 ? `(${R(lamC(A[r][r]))})·((□ − λ)(□ − λ) − □)` : `(${R(lamC(A[0][0]))})(${R(lamC(A[1][1]))}) − □` },
    { level: 3, html: `det(A − λI) = ${CM(fact)} : valeurs propres ${distinct(roots).map(fq).join(', ')}.` },
  ];
  return partsItem({
    skill: CHAR, level, parts, hints, subgoals: CHAR_SUB, key: `${CHAR}:${mt(A)}`, fallback, noHints: level === 5,
    prompt: `Calcule le polynôme caractéristique de A = ${MLm(A)}, factorise-le, puis donne les valeurs propres de A${level === 3 ? ' : choisis d\'abord l\'action' : ''}.`,
  });
}

// Roots of λ² − sλ + p as a readable set, or a sentence.
function rootsText(s, p) {
  const D = s.mul(s).sub(p.mul(4));
  if (D.n < 0) return 'Aucune valeur propre réelle';
  const rt = (n) => Math.round(Math.sqrt(n));
  if (rt(D.n) ** 2 === D.n && rt(D.d) ** 2 === D.d) {
    const sq = new Q(rt(D.n), rt(D.d));
    return setR(distinct([s.sub(sq).div(2), s.add(sq).div(2)]));
  }
  return `{(${fq(s)} − √${fq(D)})/2 ; (${fq(s)} + √${fq(D)})/2}`;
}

function charExam(rng, exam) {
  if (exam === 'tf') {
    if (rng.chance(0.4)) {
      return tfL({
        skill: CHAR, key: 'triangular', truth: true, exam: examTag({ exam }),
        statement: 'Les valeurs propres d\'une matrice triangulaire sont les coefficients de sa diagonale.',
        explanation: 'Vrai : A − λI est encore triangulaire, et son déterminant est le produit (a₁₁ − λ)…(aₙₙ − λ).',
      });
    }
    const A = rng.pick([[[1, 1], [1, 2]], [[2, 1], [2, 2]], [[1, 2], [1, 1]], [[0, 1], [1, 1]]]);
    const E = MX.echelon(MX.mat(A)).E;
    return tfL({
      skill: CHAR, key: `rref:${mt(MX.mat(A))}`, truth: false, exam: examTag({ exam }), ruleIfTrue: 'l_eigen_rref',
      statement: 'Une matrice carrée A et une forme échelonnée de A ont les mêmes valeurs propres.',
      counter: {
        kind: 'matOne', params: { want: 'echelonEigen' },
        ask: [{ v: 'A', label: 'A =', shape: [2, 2] }, { v: 'E', label: 'E =', shape: [2, 2] }],
        answer: { A: mt(MX.mat(A)), E: mt(E) },
      },
      explanation: `Faux : A = ${MLm(MX.mat(A))} a pour forme échelonnée E = ${MLm(E)}, de valeurs propres ${setR(distinct([E[0][0], E[1][1]]))}, alors que det(A − λI) = ${CM(polyDesc(MX.charpoly(MX.mat(A))))}.`,
    });
  }
  const d = char2Data(rng);
  const [[a, b], [c, dd]] = d.A;
  const s = a.add(dd);
  const p = MX.det(d.A);
  const E = MX.echelon(d.A).E;
  // (a − λ)(d − λ) + bc; (a − λ)·d − bc; diagonal of E.
  const signP = a.mul(dd).add(b.mul(c));
  const one = a.mul(dd).sub(b.mul(c)).div(dd.n ? dd : q(1));
  return mcqDistinct({
    skill: CHAR, level: 4, key: `mcq:${mt(d.A)}`, exam: examTag({ exam }),
    prompt: `Quelles sont les valeurs propres de A = ${MLm(d.A)} ?`,
    right: setR(d.eigs),
    wrongs: [
      { html: rootsText(s, signP), rule: 'l_charpoly_sign' },
      dd.n ? { html: setR([one]), rule: 'l_lambda_one_entry' } : null,
      { html: setR(distinct([E[0][0], E[1][1]])), rule: 'l_eigen_rref' },
    ].filter(Boolean),
    fillers: [{ html: setR(d.eigs.map((x) => x.neg())) }, { html: setR([s, p]) }, { html: setR(d.eigs.map((x) => x.add(1))) }],
    solution: [{ html: `det(A − λI) = ${CM(polyDesc([p, s.neg(), q(1)]))} = ${CM(factoredT(d.eigs))}`, note: 'λ² − (tr A)λ + det A' }],
  }, rng);
}

// ======================================================================
// l-eig-space
// ======================================================================

const SPACE = 'l-eig-space';
const SPACE_SUB = [
  { id: 'reduce', label: 'réduire A − λI', skill: 'l-sys-rref' },
  { id: 'basis', label: 'base de l\'espace propre', skill: SPACE },
];

// The parts of one eigenspace: (A − λI when asked,) its reduction, the basis.
function spaceParts(A, l, level, rng, { writeShift = level <= 2, menu = true } = {}) {
  const S = shiftQ(A, l);
  const red = MX.rref(S);
  const basis = eigBasis(A, l);
  const name = ESUB(l);
  const parts = [];
  if (writeShift) {
    parts.push({
      html: `λ = ${fq(l)} : écris ${shiftR(l)}.`, ask: `${shiftR(l)} =`, start: shiftName(l), judge: { kind: 'mat', names: { A: mt(A) } },
      lines: [{ math: mt(S), note: `${fq(l)} retranché sur la diagonale`, subgoal: 'reduce', cells: level <= 2 ? S.map((_, i) => [i, i]) : null }],
      menu: menu ? MENU.shift : null,
    });
  }
  const lines = opLines(S, red.ops, {
    note: (op) => (op.kind === 'scale' ? 'Pivot à 1' : op.kind === 'swap' ? 'Échanger' : `Annuler : ${opR(op)}`), subgoal: 'reduce',
  }).map((x) => ({ math: x.math, note: x.note, subgoal: x.subgoal, cells: level <= 2 && x.op.kind !== 'swap' ? pickCells(x.result, [x.op.i], level === 1 ? 1 : 2, rng) : null }));
  parts.push({ html: `Réduis ${shiftR(l)}.`, start: writeShift ? mt(S) : shiftName(l), judge: { kind: 'rowops', goal: 'rref', names: writeShift ? undefined : { A: mt(A) } }, lines, menu: menu ? MENU.reduce : null });
  const free = basis.length;
  const judge = free === 1
    ? { kind: 'eigvec', A: mt(A), lambda: qt(l) }
    : { kind: 'span', basis: basis.map(vt), require: 'basis', shifted: mt(S) };
  parts.push({
    html: `Donne une base de ${name} = Ker(${shiftR(l)}).`, ask: `${name} :`, start: eName(l), judge,
    lines: [{ math: basis.map(vt).join(', '), note: free === 1 ? 'Variable libre = 1' : 'Une variable libre à 1, les autres à 0', subgoal: 'basis', cells: level <= 2 && free === 1 ? vcells(basis[0], level === 1 ? 1 : 2, rng) : null }],
    menu: menu ? MENU.kernel : null,
  });
  return { parts, red, basis, S };
}

function spaceData(rng, level) {
  for (let t = 0; t < 200; t++) {
    let A;
    let eigs;
    let fb = false;
    if (level <= 2) {
      const pool = pickEigs(rng, [-2, -1, 1, 2, 3, 4, 5], 2, 4);
      const d = eig2(rng, pool);
      ({ A } = d); eigs = d.eigs; fb = d.fallback;
    } else if (level === 5) {
      // 4 × 4: an eigenvalue with dim E = 2.
      const pool = rng.shuffle(pickEigs(rng, [-2, -1, 1, 2, 3, 4], 3, 4));
      const e = [pool[0], pool[0], pool[1], pool[2]];
      const d = pdp(e, rng, { max: 9 });
      ({ A } = d); fb = d.fallback; eigs = e.map((x) => q(x));
    } else {
      const pool = rng.shuffle(pickEigs(rng, [-2, -1, 1, 2, 3, 4, 5], 3, 5));
      const e = level === 4 ? [pool[0], pool[0], pool[1]] : pool.slice(0, 3);
      const d = level === 4 ? pdp(e, rng, { max: 9 }) : sparse3(rng, e);
      ({ A } = d); fb = d.fallback; eigs = e.map((x) => q(x));
    }
    // Small reductions with small fractions; whole bases.
    const ok = distinct(eigs).every((l) => {
      const red = MX.rref(shiftQ(A, l));
      return red.ops.length >= 1 && red.ops.length <= (A.length === 4 ? 8 : 5) && red.ops.every((op) => !op.k || op.k.d <= 3) && red.R.flat().every((x) => x.d <= 3) && maxAbs(eigBasis(A, l)) <= 4;
    });
    if (!ok && t < 199) continue;
    return { A, eigs, fallback: fb };
  }
  return { A: MX.mat([[2, 0, 0], [1, 3, 1], [1, 1, 3]]), eigs: [q(2), q(2), q(4)], fallback: true };
}

function spaceItem(level, rng) {
  const d = spaceData(rng, level);
  const ds = distinct(d.eigs);
  // L3: one or two eigenspaces of a 3 × 3; L5: the double one only.
  const double = ds.find((l) => d.eigs.filter((x) => x.eq(l)).length > 1);
  const asked = level === 5 ? [double] : level === 3 ? rng.shuffle(ds).slice(0, 2).sort((a, b) => a.valueOf() - b.valueOf()) : ds;
  let parts = [];
  let firstBasis = null;
  let firstS = null;
  for (const l of asked) {
    const r = spaceParts(d.A, l, level, rng, { writeShift: level <= 2 });
    if (!firstBasis) { firstBasis = r.basis; firstS = r.S; }
    parts = parts.concat(r.parts);
  }
  if (level === 2) {
    const piv = MX.rref(firstS).pivots;
    const freeCol = [0, 1].find((c) => !piv.includes(c)) ?? 1;
    const pIdx = parts.findIndex((p) => p.judge.kind === 'eigvec' || p.judge.kind === 'span');
    parts[pIdx].decision = {
      kind: 'decision', prompt: 'Quelle variable est libre ?', options: [
        { id: 'free', label: `x${sub(freeCol + 1)} (colonne sans pivot)`, valid: true },
        { id: 'pivot', label: `x${sub(piv[0] + 1)} (colonne du pivot)`, valid: false, why: `La colonne ${piv[0] + 1} a un pivot : x${sub(piv[0] + 1)} se calcule à partir de la variable libre.` },
      ],
    };
  }
  const l0 = asked[0];
  const hints = [
    { level: 1, html: 'E_λ = Ker(A − λI) : même méthode que pour un noyau. Réduis A − λI, puis donne la valeur 1 à une variable libre et 0 aux autres.' },
    { level: 2, html: `${ESUB(l0)} = Span{${firstBasis.map(holeVec).join(', ')}}` },
    { level: 3, html: asked.map((l) => `${ESUB(l)} = Span{${eigBasis(d.A, l).map(vecR).join(', ')}}`).join(' ; ') },
  ];
  const lam = asked.map(fq).join(level === 5 ? '' : ' et ');
  return partsItem({
    skill: SPACE, level, parts, hints, subgoals: SPACE_SUB, key: `${SPACE}:${mt(d.A)}:${asked.map(qt).join(',')}`, fallback: d.fallback, noHints: level === 5,
    prompt: level === 5
      ? `Soit A = ${MLm(d.A)}. Donne une base de {x : Ax = ${fq(double)}x}.`
      : `Les valeurs propres de A = ${MLm(d.A)} sont ${setR(ds)}. Donne une base de l'espace propre ${asked.length > 1 ? 'de chacune des valeurs' : 'de la valeur'} ${lam}${level === 3 ? ' : choisis d\'abord l\'action' : ''}.`,
  });
}

function spaceExam(rng, exam) {
  if (exam === 'tf') {
    if (rng.chance(0.35)) {
      return tfL({
        skill: SPACE, key: 'dim-mult', truth: true, exam: examTag({ exam }),
        statement: 'Pour toute valeur propre λ de A, 1 ≤ dim E_λ ≤ multiplicité de λ.',
        explanation: 'Vrai : E_λ contient un vecteur non nul, et sa dimension ne dépasse jamais la multiplicité de λ dans le polynôme caractéristique.',
      });
    }
    const a = rng.pick([1, 2, 3, -1]);
    const b = a + rng.pick([1, 2, -3]);
    const J = MX.mat([[a, 1, 0], [0, a, 0], [0, 0, b]]);
    return tfL({
      skill: SPACE, key: `dim:${a}:${b}`, truth: false, exam: examTag({ exam }),
      statement: `Si A est 3 × 3 et det(A − λI) = −${R(factoredT([a, a, b]))}, l'espace propre de ${fq(a)} est toujours de dimension 2.`,
      counter: {
        kind: 'matOne', params: { want: 'eigspaceDim', n: 3, poly: [[a, 2], [b, 1]], lambda: a, dim: 2 },
        ask: [{ v: 'A', label: 'A =', shape: [3, 3] }],
        answer: { A: mt(J) },
      },
      explanation: `Faux : A = ${MLm(J)} a ce polynôme caractéristique, mais rang(A − ${fq(a)}I) = 2, donc dim E = 1.`,
    });
  }
  // A 3 × 3, one eigenspace; distractors: rows of A − λI, signs of the
  // pivot components, the zero vector.
  const d = spaceData(rng, 3);
  const ds = distinct(d.eigs);
  const l = rng.pick(ds);
  const S = shiftQ(d.A, l);
  const basis = eigBasis(d.A, l);
  const red = MX.rref(S);
  const rows = red.R.filter((r) => r.some((x) => x.n !== 0)).map(primitive);
  const signed = basis.map((v) => primitive(v.map((x, i) => (red.pivots.includes(i) ? x.neg() : x))));
  const same = (us) => MX.rank(MX.fromCols([...us, ...basis])) === basis.length && MX.rank(MX.fromCols(us)) === basis.length;
  const fam = (vs) => `Span{${vs.map(vecR).join(', ')}}`;
  return mcqDistinct({
    skill: SPACE, level: 4, key: `mcq:${mt(d.A)}:${qt(l)}`, exam: examTag({ exam }),
    prompt: `Soit A = ${MLm(d.A)}, qui a la valeur propre ${fq(l)}. Quel est l'espace propre ${ESUB(l)} ?`,
    right: fam(basis),
    wrongs: [
      same(rows) ? null : { html: fam(rows), rule: 'l_eigvec_row' },
      same(signed) ? null : { html: fam(signed), rule: 'l_ker_sign' },
      { html: '{0}', rule: 'l_eigvec_zero' },
    ].filter(Boolean),
    fillers: [{ html: fam([basis[0].map((x, i) => (i === 0 ? x.add(1) : x))]) }, { html: fam(MX.identity(3).slice(0, 1)) }],
    solution: [{ html: `${shiftR(l)} se réduit à ${MLm(red.R)}`, note: '' }, { html: `${ESUB(l)} = ${fam(basis)}`, note: '' }],
  }, rng);
}

// ======================================================================
// l-eig-related
// ======================================================================

const REL = 'l-eig-related';
const REL_SUB = [
  { id: 'apply', label: 'appliquer la règle à chaque valeur propre', skill: REL },
  { id: 'dettr', label: 'det et trace', skill: 'l-det-props' },
];

// The forms of an expression in A: name, readable name, f(λ) as text
// (with L for λ), the rule (for the traps' cfg.eig), c.
const sgn = (c) => (c < 0 ? `-${-c}` : `+${c}`);
function relForm(rng, kind) {
  const c = rng.pick([2, 3, -1, -2]);
  const k = rng.pick([2, 3]);
  switch (kind) {
    case 'scale': return { name: `${fq(c)}A`.replace(/^−1A$/, '−A'), f: `${c}·L`, rule: 'scale', c, ruleR: `${fq(c)}λ` };
    case 'shift': return { name: `A ${c < 0 ? '−' : '+'} ${Math.abs(c) === 1 ? '' : Math.abs(c)}I`, f: `L${sgn(c)}`, rule: 'shift', c, ruleR: `λ ${c < 0 ? '−' : '+'} ${Math.abs(c)}` };
    case 'pow': return { name: `A${k === 2 ? '²' : '³'}`, f: `L^${k}`, rule: 'pow', ruleR: `λ${k === 2 ? '²' : '³'}` };
    case 'inv': return { name: 'A⁻¹', f: '1/L', rule: 'inv', ruleR: '1/λ' };
    case 'T': return { name: 'Aᵀ', f: 'L', rule: 'T', ruleR: 'λ (mêmes valeurs propres)' };
    case 'sim': return { name: 'BAB⁻¹ (B inversible)', f: 'L', rule: 'sim', ruleR: 'λ (matrices semblables)' };
    case 'poly': {
      const p = rng.pick([['A² − A', 'L^2-L', 'λ² − λ'], ['A² − I', 'L^2-1', 'λ² − 1'], ['A² + A', 'L^2+L', 'λ² + λ'], ['A² − 2A', 'L^2-2L', 'λ² − 2λ']]);
      return { name: p[0], f: p[1], rule: 'poly', ruleR: p[2] };
    }
    default: { // 2A⁻¹ + I
      const c2 = rng.pick([2, 3, -2]);
      const d2 = rng.pick([1, -1, 2]);
      return { name: `${fq(c2)}A⁻¹ ${d2 < 0 ? '−' : '+'} ${Math.abs(d2) === 1 ? '' : Math.abs(d2)}I`, f: `${c2}/L${sgn(d2)}`, rule: 'inv2', c: d2, ruleR: `${fq(c2)}/λ ${d2 < 0 ? '−' : '+'} ${Math.abs(d2)}` };
    }
  }
}
const at = (f, l) => f.replace(/L/g, q(l).n < 0 ? `(${qt(l)})` : qt(l));
const toNum = (text) => exactValue(parse(text));

function relData(rng, n = 3) {
  const eigs = rng.shuffle([-4, -3, -2, -1, 1, 2, 3, 4]).slice(0, n).sort((a, b) => a - b).map((x) => q(x));
  return { eigs };
}

// One part per eigenvalue: μ = f(λ).
function relParts(eigs, form, level, rng, { shown = true } = {}) {
  return eigs.map((l) => {
    const v = toNum(at(form.f, l));
    const mid = at(form.f, l);
    const lines = [];
    if (shown && !['T', 'sim'].includes(form.rule) && (level <= 2 || form.rule === 'poly' || form.rule === 'inv2') && !/^-?\d+(\/\d+)?$/.test(mid)) lines.push({ math: mid, note: `f(λ) = ${R(form.ruleR)}`, subgoal: 'apply' });
    lines.push({ math: qt(v), note: '', subgoal: 'apply' });
    return {
      html: `λ = ${fq(l)} : valeur propre correspondante de ${form.name}.`, ask: 'μ =', start: 'μ',
      judge: { kind: 'value', expect: qt(v), eig: { rule: form.rule, lambda: qt(l), c: form.c !== undefined ? String(form.c) : undefined } },
      lines, menu: MENU.value,
    };
  });
}

function relItem(level, rng) {
  const { eigs } = relData(rng, 3);
  const kinds = level === 1 ? ['scale', 'shift', 'pow', 'inv'] : level === 2 ? ['inv', 'shift', 'scale', 'pow'] : level === 3 ? ['inv2', 'poly'] : ['poly', 'inv2', 'shift'];
  const form = relForm(rng, rng.pick(kinds));
  let parts = relParts(eigs, form, level, rng);
  const spec = setR(eigs);
  if (level === 2) {
    const wrong = {
      inv: [{ label: '−λ', rule: 'l_eig_inv_neg', why: 'A⁻¹v = (1/λ)v : c\'est l\'inverse, pas l\'opposé.' }, { label: 'λ', why: 'A⁻¹ n\'a pas les mêmes valeurs propres que A : A⁻¹v = (1/λ)v.' }],
      shift: [{ label: `${fq(form.c ?? 0)}λ`, rule: 'l_eig_shift_scale', why: `(A + cI)v = λv + cv : on ajoute c, on ne multiplie pas.` }, { label: 'λ', why: 'Ajouter cI décale toutes les valeurs propres de c.' }],
      scale: [{ label: `λ ${(form.c ?? 0) < 0 ? '−' : '+'} ${Math.abs(form.c ?? 0)}`, rule: 'l_eig_shift_scale', why: '(cA)v = c(Av) = cλv : on multiplie par c.' }, { label: 'λ', why: '(cA)v = cλv.' }],
      pow: [{ label: `${form.name.endsWith('²') ? 2 : 3}λ`, why: 'Aᵏv = A(…(Av)) = λᵏv : une puissance, pas un produit par k.' }, { label: 'λ', why: 'Aᵏv = λᵏv.' }],
    }[form.rule];
    parts[0].decision = {
      kind: 'decision', prompt: `Quelle règle donne les valeurs propres de ${form.name} ?`, options: rng.shuffle([
        { id: 'ok', label: R(form.ruleR), valid: true },
        ...wrong.map((w, i) => ({ id: `w${i}`, label: w.label, valid: false, rule: w.rule, why: w.why })),
      ]),
    };
  }
  let shown = form;
  let prompt = `A est une matrice 3 × 3 de valeurs propres ${spec}. Donne les valeurs propres de ${form.name}${level === 3 ? ' : choisis d\'abord l\'action' : ''}.`;
  if (level >= 4) {
    // det, trace, then the spectrum of A − λⱼI (not invertible) or of p(A).
    const d = eigs.reduce((s, x) => s.mul(x), q(1));
    const tr = eigs.reduce((s, x) => s.add(x), q(0));
    const j = rng.pick(eigs);
    const shiftF = { name: `A ${j.n > 0 ? '−' : '+'} ${Math.abs(j.n) === 1 ? '' : Math.abs(j.n)}I`, f: `L${sgn(-j.n)}`, rule: 'shift', c: -j.n, ruleR: `λ ${j.n > 0 ? '−' : '+'} ${Math.abs(j.n)}` };
    const second = level === 4 ? shiftF : form;
    shown = second;
    const det2 = eigs.reduce((s, l) => s.mul(toNum(at(second.f, l))), q(1));
    parts = [
      { html: 'det A = produit des valeurs propres.', ask: 'det A =', start: 'det(A)', judge: { kind: 'value', expect: qt(d) }, lines: [{ math: eigs.map((x) => `(${qt(x)})`).join('·'), note: 'Produit', subgoal: 'dettr' }, { math: qt(d), note: '', subgoal: 'dettr' }] },
      { html: 'tr A = somme des valeurs propres.', ask: 'tr A =', start: 'tr(A)', judge: { kind: 'value', expect: qt(tr) }, lines: [{ math: qt(tr), note: 'Somme', subgoal: 'dettr' }] },
      ...relParts(eigs, second, level, rng),
      {
        html: `det(${second.name}) = produit de ses valeurs propres.`, ask: `det(${second.name}) =`, start: 'det', judge: { kind: 'value', expect: qt(det2) },
        decision: {
          kind: 'decision', prompt: `${second.name} est-elle inversible ?`, options: [
            { id: 'yes', label: 'Oui', valid: det2.n !== 0, why: det2.n !== 0 ? '' : `0 est une valeur propre de ${second.name} : elle n'est pas inversible.` },
            { id: 'no', label: 'Non', valid: det2.n === 0, why: det2.n === 0 ? '' : `0 n'est pas valeur propre de ${second.name} : elle est inversible.` },
          ],
        },
        lines: [{ math: qt(det2), note: det2.n === 0 ? 'Une valeur propre nulle : pas inversible' : 'Aucune valeur propre nulle : inversible', subgoal: 'apply' }],
      },
    ];
    prompt = `A est une matrice 3 × 3 de valeurs propres ${spec}. Calcule det A et tr A, puis les valeurs propres de ${second.name} et son déterminant.`;
  }
  const l0 = eigs[0];
  const hints = [
    { level: 1, html: 'Si Av = λv : (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v, (A + cI)v = (λ + c)v. Applique la même opération à chaque valeur propre. det A = produit, tr A = somme.' },
    { level: 2, html: `λ = ${fq(l0)} : μ = f(${fq(l0)}) = □, où f est la règle de l'expression demandée.` },
    { level: 3, html: `Valeurs propres de ${shown.name} : ${setR(eigs.map((l) => toNum(at(shown.f, l))))}.` },
  ];
  return partsItem({
    skill: REL, level, parts, hints, subgoals: REL_SUB, key: `${REL}:${spec}:${form.name}:${level}`, noHints: level === 5, prompt,
  });
}

function relExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 2);
    if (which === 0) {
      return tfL({
        skill: REL, key: 'diag-T-inv', truth: true, exam: examTag({ exam }),
        statement: 'Si A est diagonalisable et que ses valeurs propres sont non nulles, alors Aᵀ et A⁻¹ sont diagonalisables.',
        explanation: 'Vrai : A = PDP⁻¹ donne Aᵀ = (P⁻¹)ᵀDPᵀ et A⁻¹ = PD⁻¹P⁻¹ (D⁻¹ existe car aucune valeur propre n\'est nulle).',
      });
    }
    if (which === 1) {
      return tfL({
        skill: REL, key: 'T-vec', truth: false, exam: examTag({ exam }), ruleIfTrue: 'l_eig_transpose_vec',
        statement: 'Une matrice carrée A et sa transposée Aᵀ ont les mêmes vecteurs propres.',
        counter: {
          kind: 'matOne', params: { want: 'transposeEigvec' },
          ask: [{ v: 'A', label: 'A =', shape: [2, 2] }, { v: 'v', label: 'v =', shape: [2, 1] }],
          answer: { A: '[[1,1],[0,2]]', v: '(1 ; 0)' },
        },
        explanation: 'Faux : avec A = [[1, 1], [0, 2]], v = (1 ; 0) vérifie Av = v, mais Aᵀv = (1 ; 1) n\'est pas un multiple de v. A et Aᵀ ont les mêmes valeurs propres, pas les mêmes vecteurs propres.',
      });
    }
    return tfL({
      skill: REL, key: 'sum', truth: false, exam: examTag({ exam }), ruleIfTrue: 'l_eig_sum',
      statement: 'Si λ est valeur propre de A et μ valeur propre de B, alors λ + μ est valeur propre de A + B.',
      counter: {
        kind: 'matPair', params: { n: 2, test: 'eig(A+B)=eig(A)+eig(B)' },
        ask: [{ v: 'A', label: 'A =', shape: [2, 2] }, { v: 'B', label: 'B =', shape: [2, 2] }],
        answer: { A: '[[0,1],[0,0]]', B: '[[0,0],[1,0]]' },
      },
      explanation: 'Faux : A = [[0, 1], [0, 0]] et B = [[0, 0], [1, 0]] n\'ont que la valeur propre 0, mais A + B = [[0, 1], [1, 0]] a les valeurs propres 1 et −1.',
    });
  }
  const { eigs } = relData(rng, 3);
  const kind = rng.pick(['inv', 'shift', 'scale']);
  const form = relForm(rng, kind);
  const vals = (f) => setR(eigs.map((l) => toNum(at(f, l))).sort((a, b) => a.valueOf() - b.valueOf()));
  const wrongs = kind === 'inv'
    ? [{ html: vals('-1·L'), rule: 'l_eig_inv_neg' }, { html: vals('L'), rule: null }]
    : kind === 'shift'
      ? [{ html: vals(`${form.c}·L`), rule: 'l_eig_shift_scale' }, { html: vals('L'), rule: null }]
      : [{ html: vals(`L${sgn(form.c)}`), rule: 'l_eig_shift_scale' }, { html: vals('L'), rule: null }];
  return mcqDistinct({
    skill: REL, level: 4, key: `mcq:${setR(eigs)}:${form.name}`, exam: examTag({ exam }),
    prompt: `A est une matrice 3 × 3 de valeurs propres ${setR(eigs)}. Quelles sont les valeurs propres de ${form.name} ?`,
    right: vals(form.f),
    wrongs,
    fillers: [{ html: vals('L+1') }, { html: vals('-1·L') }, { html: vals('2·L') }, { html: vals('L-1') }],
    solution: [{ html: `Chaque valeur propre λ devient ${R(form.ruleR)}.`, note: '' }],
  }, rng);
}

// ======================================================================
// l-eig-diag
// ======================================================================

const DIAG = 'l-eig-diag';
const DIAG_SUB = [
  { id: 'poly', label: 'polynôme caractéristique', skill: CHAR },
  { id: 'spaces', label: 'espaces propres', skill: SPACE },
  { id: 'assemble', label: 'assembler P et D', skill: DIAG },
  { id: 'inverse', label: 'calculer P⁻¹', skill: 'l-mat-inverse' },
];
const diagT = (xs) => `diag(${xs.map(qt).join(',')})`;
const diagR = (xs) => `diag(${xs.map(fq).join(', ')})`;

function diagData(rng, level) {
  if (level <= 3) {
    const d = eig2(rng, pickEigs(rng, [-3, -2, -1, 1, 2, 3, 4, 5], 2, 4));
    return { A: d.A, eigs: d.eigs, n: 2, fallback: d.fallback, diag: true };
  }
  const mode = level === 4 ? (rng.chance(0.6) ? 'dim2' : 'distinct') : rng.pick(['dim2', 'distinct', 'jordan']);
  for (let t = 0; t < 50; t++) {
    const pool = pickEigs(rng, [-2, -1, 1, 2, 3, 4, 5], 3, 5);
    const e = mode === 'distinct' ? pool : [pool[0], pool[0], pool[1]];
    const d = sparse3(rng, e, { mode });
    if (d.fallback) continue;
    const keep = [0, 1, 2].filter((i) => i !== d.row);
    if (d.A[keep[0]][keep[1]].n === 0 || d.A[keep[1]][keep[0]].n === 0) continue;
    const ok = distinct(d.eigs).every((l) => maxAbs(eigBasis(d.A, l)) <= 4);
    if (!ok) continue;
    const P = MX.fromCols(distinct(d.eigs).flatMap((l) => eigBasis(d.A, l)));
    if (mode !== 'jordan' && maxAbs(MX.inverse(P)) > 6) continue;
    return { A: d.A, row: d.row, eigs: d.eigs, n: 3, diag: mode !== 'jordan' };
  }
  const d = sparse3(rng, [2, 2, 4], { mode: 'dim2' });
  return { A: d.A, row: d.row, eigs: d.eigs, n: 3, diag: true, fallback: true };
}

// The eigenspace parts (one vector, or a basis of a plane).
function eigvecParts(A, ls, level, rng) {
  return ls.map((l, k) => {
    const basis = eigBasis(A, l);
    const S = shiftQ(A, l);
    const one = basis.length === 1;
    return {
      html: `λ = ${fq(l)} : ${one ? `un vecteur propre v${sub(k + 1)}` : `une base de ${ESUB(l)}`} (noyau de ${shiftR(l)} = ${MLm(S)}).`,
      ask: one ? `v${sub(k + 1)} =` : `${ESUB(l)} :`, start: one ? `v_${k + 1}` : eName(l),
      judge: one ? { kind: 'eigvec', A: mt(A), lambda: qt(l) } : { kind: 'span', basis: basis.map(vt), require: 'basis', shifted: mt(S) },
      lines: [{ math: basis.map(vt).join(', '), note: one ? 'Ker(A − λI)' : 'Deux variables libres', subgoal: 'spaces', cells: level <= 2 && one ? vcells(basis[0], 1, rng) : null }],
      menu: MENU.kernel,
    };
  });
}

function diagItem(level, rng) {
  const d = diagData(rng, level);
  const ls = distinct(d.eigs);
  const cols = ls.flatMap((l) => eigBasis(d.A, l));
  const Dl = ls.flatMap((l) => eigBasis(d.A, l).map(() => l));
  const P = MX.fromCols(cols);
  const parts = [];
  if (level >= 2) {
    const lines = d.n === 2 ? charLines2(d.A, d.eigs) : charLines3(d.A, d.row, d.eigs);
    parts.push({ html: 'Polynôme caractéristique.', start: 'det(A-λI)', judge: detJudge(d.A), lines: lines.map((l) => ({ ...l, subgoal: 'poly' })), menu: MENU.develop });
  }
  parts.push(...eigvecParts(d.A, ls, level, rng));
  const factorPart = {
    html: 'Assemble P et D.', ask: 'P, D :', start: 'A = P·D·P^(-1)', judge: { kind: 'factor', A: mt(d.A), of: 'PDP' },
    lines: [{ math: `P = ${mt(P)} ; D = ${diagT(Dl)}`, note: 'Colonne k de P ↔ case k de D', subgoal: 'assemble' }], menu: MENU.assemble,
  };
  if (level === 2 && d.n === 2) {
    const Psw = MX.fromCols([cols[1], cols[0]]);
    factorPart.decision = {
      kind: 'decision', prompt: 'Comment ranger P et D ?', options: rng.shuffle([
        { id: 'ok', label: `P = [v₁ v₂], D = ${diagR(Dl)}`, valid: true },
        { id: 'swap', label: `P = [v₂ v₁], D = ${diagR(Dl)}`, valid: false, rule: 'l_pd_order', why: `La colonne 1 de P = ${MLm(Psw)} est un vecteur propre de ${fq(Dl[1])}, pas de ${fq(Dl[0])}.` },
      ]),
    };
  }
  if (!d.diag) {
    const sum = ls.reduce((s, l) => s + eigBasis(d.A, l).length, 0);
    parts.push({
      html: 'Additionne les dimensions des espaces propres (A est diagonalisable si et seulement si la somme vaut 3).', ask: 'Σ dim E_λ =', start: 'Σ', judge: { kind: 'value', expect: String(sum) },
      decision: {
        kind: 'decision', prompt: 'A est-elle diagonalisable ?', options: [
          { id: 'yes', label: 'Oui', valid: false, why: `Il n'y a que ${sum} vecteurs propres libres pour une matrice 3 × 3.` },
          { id: 'no', label: 'Non', valid: true },
        ],
      },
      lines: [{ math: String(sum), note: `${sum} &lt; 3 : pas assez de vecteurs propres libres, A n'est pas diagonalisable`, subgoal: 'assemble' }],
    });
  } else {
    if (level === 5) {
      factorPart.decision = {
        kind: 'decision', prompt: 'A est-elle diagonalisable ?', options: [
          { id: 'yes', label: 'Oui', valid: true },
          { id: 'no', label: 'Non', valid: false, why: 'Les espaces propres donnent 3 vecteurs propres libres : A est diagonalisable.' },
        ],
      };
    }
    parts.push(factorPart);
    if (level === 4) {
      parts.push({
        html: 'Calcule P⁻¹.', ask: 'P⁻¹ =', start: 'P^(-1)', judge: { kind: 'mat', names: { P: mt(P) }, expect: 'P^(-1)' },
        lines: [{ math: mt(MX.inverse(P)), note: '[P | I] réduite', subgoal: 'inverse' }],
      });
    }
  }
  const hints = [
    { level: 1, html: 'Valeurs propres (racines de det(A − λI)), puis un vecteur propre par variable libre de chaque A − λI. Une colonne de P par vecteur propre, dans l\'ordre de D.' },
    { level: 2, html: `P = ${holeMat(P, P[0].map((_, j) => [P.length - 1, j]))}, D = ${diagR(Dl)}` },
    { level: 3, html: d.diag ? `P = ${MLm(P)}, D = ${diagR(Dl)}` : 'Pas assez de vecteurs propres libres : A n\'est pas diagonalisable.' },
  ];
  return partsItem({
    skill: DIAG, level, parts, hints, subgoals: DIAG_SUB, key: `${DIAG}:${mt(d.A)}`, fallback: d.fallback, noHints: level === 5,
    prompt: level === 1
      ? `Les valeurs propres de A = ${MLm(d.A)} sont ${setR(ls)}. Trouve un vecteur propre pour chacune, puis P et D telles que A = PDP⁻¹.`
      : level === 5
        ? `A = ${MLm(d.A)} est-elle diagonalisable ? Si oui, donne P et D telles que A = PDP⁻¹.`
        : `Diagonalise A = ${MLm(d.A)} : trouve P inversible et D diagonale telles que A = PDP⁻¹${level === 4 ? ', puis calcule P⁻¹' : ''}${level === 3 ? ' (choisis d\'abord l\'action)' : ''}.`,
  });
}

// A radical a/√n written rationalised: 2√5/5.
function radText(a, n) {
  let s = 1;
  let m = n;
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; s *= f; }
  if (m === 1) return qt(new Q(a, s));
  const den0 = s * m;
  const g = gcd(a, den0);
  const num = a / g;
  const den = den0 / g;
  const head = Math.abs(num) === 1 ? `${num < 0 ? '-' : ''}√${m}` : `${num}√${m}`;
  return den === 1 ? head : `${head}/${den}`;
}

function diagExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 2);
    if (which === 0) {
      const a = rng.pick([1, 2, -1, 3]);
      return tfL({
        skill: DIAG, key: `distinct:${a}`, truth: false, exam: examTag({ exam }),
        statement: 'Si A est diagonalisable, ses valeurs propres sont deux à deux distinctes.',
        counter: { kind: 'matOne', params: { want: 'diagRepeated' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(MX.diag([a, a])) } },
        explanation: `Faux : ${fq(a)}I₂ = diag(${fq(a)}, ${fq(a)}) est diagonale (donc diagonalisable), avec la valeur propre double ${fq(a)}.`,
      });
    }
    if (which === 1) {
      return tfL({
        skill: DIAG, key: 'n-distinct', truth: true, exam: examTag({ exam }),
        statement: 'Une matrice n × n qui a n valeurs propres distinctes est diagonalisable.',
        explanation: 'Vrai : des vecteurs propres de valeurs propres distinctes sont libres ; on en a n, ils forment une base.',
      });
    }
    return tfL({
      skill: DIAG, key: 'cols', truth: true, exam: examTag({ exam }),
      statement: 'Si A = PDP⁻¹ avec D diagonale, les colonnes de P sont des vecteurs propres de A.',
      explanation: 'Vrai : AP = PD, et la colonne k de cette égalité dit Apₖ = dₖpₖ (pₖ ≠ 0 car P est inversible).',
    });
  }
  const d = eig2(rng, pickEigs(rng, [-3, -2, -1, 1, 2, 3, 4, 5], 2, 4));
  const [v1, v2] = d.vecs;
  if (exam === 'coef') {
    const j = rng.int(0, 1);
    const v = [v1, v2][j];
    const i = v.findIndex((x) => x.n !== 0) === 0 && v[1].n !== 0 ? rng.int(0, 1) : v.findIndex((x) => x.n !== 0);
    const n2 = v.reduce((s, x) => s + x.n * x.n, 0);
    const val = radText(v[i].n, n2);
    const lab = `p_${i + 1}${j + 1}`;
    return coefItem({
      skill: DIAG, level: 4, exam: examTag({ exam }), key: `${mt(d.A)}:${i}${j}`,
      prompt: `Soit A = ${MLm(d.A)}. On écrit A = PDP⁻¹ avec D = ${diagR(d.eigs)} (λ₁ &lt; λ₂) et des colonnes de P <b>de norme 1</b>, de première composante non nulle positive. Que vaut p${sub(i + 1)}${sub(j + 1)} ?`,
      label: lab, value: val, askCoef: { label: `p${sub(i + 1)}${sub(j + 1)}`, path: [i, j], factor: 'P', convention: { order: 'λ₁ < λ₂', normalized: true, sign: 'première composante non nulle positive' } },
      traps: [{ rule: 'l_pd_order' }],
      solution: [{ html: `v${sub(j + 1)} = ${vecR(v)}, de norme √${n2}`, note: `λ = ${fq(d.eigs[j])}` }, { html: `p${sub(i + 1)}${sub(j + 1)} = ${fq(v[i])}/√${n2}`, note: '' }],
      fallback: d.fallback,
    });
  }
  const valid = (P, D) => Math.abs(MX.det(P).valueOf()) > 0 && MX.equal(MX.mul(d.A, P), MX.mul(P, D));
  const opt = (P, D, rule) => (valid(P, D) ? null : { html: `P = ${MLm(P)}, D = ${diagR([D[0][0], D[1][1]])}`, rule });
  const P = MX.fromCols([v1, v2]);
  const D = MX.diag(d.eigs);
  const rows = d.eigs.map((l) => shiftQ(d.A, l).find((r) => r.some((x) => x.n !== 0)));
  return mcqDistinct({
    skill: DIAG, level: 4, key: `mcq:${mt(d.A)}`, exam: examTag({ exam }),
    prompt: `Soit A = ${MLm(d.A)}. Quelle paire (P, D) vérifie A = PDP⁻¹ ?`,
    right: `P = ${MLm(P)}, D = ${diagR(d.eigs)}`,
    wrongs: [
      opt(MX.fromCols([v2, v1]), D, 'l_pd_order'),
      opt(d.Pinv, D, 'l_pdp_inverse_side'),
      opt(MX.fromCols(rows), D, 'l_eigvec_row'),
    ].filter(Boolean),
    fillers: [opt(P, MX.diag(d.eigs.map((x) => x.neg())), null), opt(MX.transpose(P), D, null), opt(P, MX.diag(d.eigs.map((x) => x.add(1))), null)].filter(Boolean),
    solution: [{ html: `A·${MLm(P)} = ${MLm(MX.mul(d.A, P))} = PD`, note: 'AP = PD, colonne par colonne' }],
  }, rng);
}

// ======================================================================
// l-eig-diag-param
// ======================================================================

const DPAR = 'l-eig-diag-param';
const DPAR_SUB = [
  { id: 'rank', label: 'rang de A − λI', skill: 'l-vs-rank' },
  { id: 'discuss', label: 'discuter selon a', skill: DPAR },
];

// Upper triangular [[p, x, y], [0, a + s, z], [0, 0, r]] (or its
// transpose): eigenvalues p, a + s, r. At a + s = p, dim E = 2 iff x = 0;
// at a + s = r, iff z = 0.
function dparData(rng) {
  const [p, r] = rng.shuffle([-2, -1, 1, 2, 3, 4]).slice(0, 2);
  const s = rng.pick([1, -1, 2, -2, 3]);
  const pattern = rng.pick(['x0', 'z0', 'x0', 'z0', 'none']);
  const x = pattern === 'x0' ? 0 : nzPick(rng, -2, 3);
  const z = pattern === 'z0' ? 0 : nzPick(rng, -2, 3);
  const y = rng.int(-2, 3);
  const lower = rng.chance(0.3);
  const rowsAt = (aVal) => {
    const M = [[p, x, y], [0, aVal + s, z], [0, 0, r]].map((row) => row.map((v) => q(v)));
    return lower ? MX.transpose(M) : M;
  };
  const sT = s === 0 ? 'a' : `a${s < 0 ? '-' : '+'}${Math.abs(s)}`;
  const Mtext = (() => {
    const M = [[String(p), String(x), String(y)], ['0', sT, String(z)], ['0', '0', String(r)]];
    const T = lower ? M[0].map((_, j) => M.map((row) => row[j])) : M;
    return `[${T.map((row) => `[${row.join(',')}]`).join(',')}]`;
  })();
  const crit = [{ a: p - s, l: p }, { a: r - s, l: r }].sort((u, v) => u.a - v.a).map((c) => {
    const S = shiftQ(rowsAt(c.a), c.l);
    const rank = MX.rank(S);
    return { ...c, S, rank, dim: 3 - rank, ok: 3 - rank === 2 };
  });
  return { p, r, s, x, y, z, lower, sT, Mtext, crit, rowsAt };
}

// The set of a where A is diagonalisable: ℝ minus the bad critical values.
function dparSet(bad) {
  const b = [...bad].sort((u, v) => u - v);
  if (!b.length) return 'ℝ';
  const pts = ['-∞', ...b.map(String), '+∞'];
  return pts.slice(0, -1).map((u, i) => `]${u};${pts[i + 1]}[`).join('∪');
}
const notIn = (b) => (b.length === 0 ? 'pour tout a' : b.length === 1 ? `a ≠ ${fq(b[0])}` : `a ∉ {${b.map(fq).join(' ; ')}}`);

function dparItem(level, rng) {
  let d = dparData(rng);
  for (let t = 0; t < 50 && d.crit.every((c) => c.ok); t++) d = dparData(rng);
  const bad = d.crit.filter((c) => !c.ok).map((c) => c.a);
  const A = d.Mtext.replace(/,/g, ', ');
  const parts = [{
    html: `Les valeurs propres sont ${fq(d.p)}, ${R(d.sT.replace(/([+-])/, ' $1 '))} et ${fq(d.r)} (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?`,
    ask: 'a =', start: `${d.sT}=${d.p} ou ${d.sT}=${d.r}`, judge: { kind: 'solset', v: 'a' },
    lines: [{ math: d.crit.map((c) => `a=${c.a}`).join(' ou '), note: 'Valeurs critiques', subgoal: 'discuss' }],
    menu: [
      { id: 'eq', label: 'Égaler deux valeurs propres', valid: true },
      { id: 'det', label: 'Résoudre det A = 0', valid: false, why: 'det A = 0 dit si A est inversible, pas si deux valeurs propres se confondent.' },
    ],
  }];
  if (level === 2) {
    parts[0].decision = {
      kind: 'decision', prompt: 'Quelles valeurs de a faut-il examiner ?', options: rng.shuffle([
        { id: 'crit', label: 'Celles où deux valeurs propres sont égales', valid: true },
        { id: 'all', label: 'Toutes : chercher le rang de A − λI pour chaque a', valid: false, why: 'Ailleurs, les trois valeurs propres sont distinctes : A est diagonalisable sans calcul.' },
        { id: 'zero', label: 'Celles où det A = 0', valid: false, why: 'det A = 0 dit si A est inversible ; une matrice non inversible peut être diagonalisable.' },
      ]),
    };
  }
  let pending = null;
  for (const c of d.crit) {
    const name = shiftR(c.l);
    parts.push({
      html: `a = ${fq(c.a)} : ${fq(c.l)} est valeur propre double. Écris ${name}.`, ask: `${name} =`, start: shiftName(c.l),
      judge: { kind: 'mat', expect: mt(c.S) }, decision: pending || undefined,
      lines: [{ math: mt(c.S), note: `a = ${fq(c.a)}`, subgoal: 'rank', cells: level <= 2 ? c.S.map((_, i) => [i, i]) : null }],
      menu: MENU.shift,
    });
    parts.push({
      html: `dim ${ESUB(c.l)} = 3 − rang(${name}).`, ask: `dim ${ESUB(c.l)} =`, start: 'dim', judge: { kind: 'value', expect: String(c.dim) },
      lines: [...(level <= 3 ? [{ math: `3-${c.rank}`, note: `rang(${name}) = ${c.rank}`, subgoal: 'rank' }] : []), { math: String(c.dim), note: c.ok ? 'dim 2 = multiplicité : diagonalisable' : 'dim 1 &lt; 2 : pas diagonalisable', subgoal: 'rank' }],
      menu: [
        { id: 'rank', label: 'Compter les lignes non nulles (pivots) de A − λI', valid: true },
        { id: 'mult', label: 'Prendre la multiplicité de λ', valid: false, rule: 'l_diag_distinct', why: 'dim E_λ peut être plus petite que la multiplicité : c\'est justement ce qu\'on teste.' },
      ],
    });
    pending = {
      kind: 'decision', prompt: `Pour a = ${fq(c.a)}, A est-elle diagonalisable ?`, options: [
        { id: 'yes', label: 'Oui', valid: c.ok, why: c.ok ? '' : `dim ${ESUB(c.l)} = ${c.dim} &lt; 2 : il manque un vecteur propre.` },
        { id: 'no', label: 'Non', valid: !c.ok, rule: c.ok ? 'l_diag_distinct' : undefined, why: c.ok ? `dim ${ESUB(c.l)} = 2 = multiplicité : la valeur double ne gêne pas.` : '' },
      ],
    };
  }
  const S = dparSet(bad);
  parts.push({
    html: 'Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)', ask: 'S =', start: 'S', judge: { kind: 'solset', v: 'a', sets: { S } },
    decision: pending, lines: [{ math: S, note: notIn(bad), subgoal: 'discuss' }],
    menu: [
      { id: 'excl', label: 'Exclure les valeurs critiques où dim E_λ &lt; multiplicité', valid: true },
      { id: 'all', label: 'Exclure toutes les valeurs critiques', valid: false, rule: 'l_diag_distinct', why: 'Une valeur double avec dim E = 2 n\'empêche rien.' },
    ],
  });
  const hints = [
    { level: 1, html: 'Seules les valeurs de a où deux valeurs propres se confondent posent problème. Là, compare dim E_λ = 3 − rang(A − λI) à la multiplicité 2.' },
    { level: 2, html: `a = ${fq(d.crit[0].a)} : rang(${shiftR(d.crit[0].l)}) = □, dim ${ESUB(d.crit[0].l)} = □` },
    { level: 3, html: `A est diagonalisable si et seulement si ${notIn(bad)}.` },
  ];
  return partsItem({
    skill: DPAR, level, parts, hints, subgoals: DPAR_SUB, key: `${DPAR}:${d.Mtext}`, noHints: level === 5,
    prompt: `Soit A = ${ML(d.Mtext, { vars: ['a'] })}. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?${level === 3 ? ' Choisis d\'abord l\'action.' : ''}`.replace(A, A),
  });
}

function dparExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 2);
    if (which === 0) {
      const a = rng.pick([1, 2, -1]);
      const b = a + rng.pick([1, 2, 3]);
      return tfL({
        skill: DPAR, key: `double:${a}${b}`, truth: false, exam: examTag({ exam }), ruleIfTrue: 'l_diag_distinct',
        statement: 'Une matrice 3 × 3 qui a une valeur propre double n\'est jamais diagonalisable.',
        counter: { kind: 'matOne', params: { want: 'diagRepeated' }, ask: [{ v: 'A', label: 'A =', shape: [3, 3] }], answer: { A: mt(MX.diag([a, a, b])) } },
        explanation: `Faux : diag(${fq(a)}, ${fq(a)}, ${fq(b)}) a la valeur propre double ${fq(a)}, et elle est diagonale.`,
      });
    }
    if (which === 1) {
      return tfL({
        skill: DPAR, key: 'dim-lt', truth: true, exam: examTag({ exam }),
        statement: 'Si une valeur propre λ de A vérifie dim E_λ &lt; multiplicité de λ, alors A n\'est pas diagonalisable.',
        explanation: 'Vrai : A est diagonalisable si et seulement si dim E_λ = multiplicité pour chaque valeur propre.',
      });
    }
    const a = rng.pick([1, 2, -1, 3]);
    return tfL({
      skill: DPAR, key: `tri:${a}`, truth: false, exam: examTag({ exam }),
      statement: 'Toute matrice triangulaire est diagonalisable.',
      counter: { kind: 'matOne', params: { want: 'notDiag' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(MX.mat([[a, 1], [0, a]])) } },
      explanation: `Faux : [[${fq(a)}, 1], [0, ${fq(a)}]] a la valeur propre double ${fq(a)}, mais rang(A − ${fq(a)}I) = 1, donc dim E = 1 &lt; 2.`,
    });
  }
  let d = dparData(rng);
  for (let t = 0; t < 50 && !(d.crit.some((c) => c.ok) && d.crit.some((c) => !c.ok)); t++) d = dparData(rng);
  const bad = d.crit.filter((c) => !c.ok).map((c) => c.a);
  const good = d.crit.filter((c) => c.ok).map((c) => c.a);
  const all = d.crit.map((c) => c.a);
  return mcqDistinct({
    skill: DPAR, level: 4, key: `mcq:${d.Mtext}`, exam: examTag({ exam }),
    prompt: `Soit A = ${ML(d.Mtext, { vars: ['a'] })}. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?`,
    right: `Si et seulement si ${notIn(bad)}`,
    wrongs: [
      { html: `Si et seulement si ${notIn(all)}`, rule: 'l_diag_distinct' },
      { html: 'Pour tout a', rule: null },
      good.length ? { html: `Si et seulement si ${notIn(good)}`, rule: null } : null,
    ].filter(Boolean),
    fillers: [{ html: `Seulement pour a = ${fq(all[0])}` }, { html: 'Pour aucune valeur de a' }],
    solution: d.crit.map((c) => ({ html: `a = ${fq(c.a)} : rang(${shiftR(c.l)}) = ${c.rank}, dim ${ESUB(c.l)} = ${c.dim}`, note: c.ok ? 'diagonalisable' : 'pas diagonalisable' })),
  }, rng);
}

// ======================================================================

export const GEN = {
  [CHECK]: (level, rng, profile, opts = {}) => (opts.exam ? checkExam(rng, opts.exam) : checkItem(level, rng)),
  [CHAR]: (level, rng, profile, opts = {}) => (opts.exam ? charExam(rng, opts.exam) : charItem(level, rng)),
  [SPACE]: (level, rng, profile, opts = {}) => (opts.exam ? spaceExam(rng, opts.exam) : spaceItem(level, rng)),
  [REL]: (level, rng, profile, opts = {}) => (opts.exam ? relExam(rng, opts.exam) : relItem(level, rng)),
  [DIAG]: (level, rng, profile, opts = {}) => (opts.exam ? diagExam(rng, opts.exam) : diagItem(level, rng)),
  [DPAR]: (level, rng, profile, opts = {}) => (opts.exam ? dparExam(rng, opts.exam) : dparItem(level, rng)),
};

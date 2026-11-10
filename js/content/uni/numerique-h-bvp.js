// n-bvp-fd and n-bvp-convergence (module N, part h, step U9): −u″ = f by
// centred finite differences, the matrix A and why it is positive
// definite; consistency, stability and convergence in Ch². Catalogue:
// docs/universite/N-analyse-numerique.md, n-bvp-fd, n-bvp-convergence, and
// exam example 2.
//
// n-bvp-fd. Data: N ∈ {2, 3, 4}, h = 1/(N + 1), m = 1/h²; the exact solution
// is a cubic u = α(1 − x) + βx + x(1 − x)(a + bx), so f = −u″ = 2a − 2b + 6bx
// and the scheme is exact (uᵢ = u(xᵢ)). L1 guided values: 2/h², f̃₁, f̃_N;
// L2 the matrix A and the vector f̃ in the grid; L3 the boundary term
// (decision), then f̃₁ and f̃_N; L4 the proof that A is positive definite
// (blocks, decoys n_spd_semidefinite and l_posdef_diag); L5 the program
// bvp_system, then its output (the scheme is exact for f = 1). Exam: mcq
// (the Neumann matrix of 2019 Q1, several answers, or f̃₁), open (exam
// example 2 a–c, 3.5 points).
//
// n-bvp-convergence. L1, L2 guided values (the Taylor coefficient 1/24,
// C₁ = 1/12, C = 1/96, then max|u⁽⁴⁾|); L3 the proof in blocks (decoy
// n_stability_skipped); L4 free, on [0 ; L] (stability L²/8); L5 the table
// of errors to read. Exam: mcq, open (exam example 2 d–f, 4 points).

import { linesItem, mcq, blocksItem, examTag } from './kit.js';
import { partsItem, modeOf } from './geo-kit.js';
import { problemItem } from './kit-problem.js';
import { refCode, codeItem, holesFor, readtableItem, multiMcq, tableHtml } from './numerique-kit.js';
import { q, qt, fq, R, H, menuOf, opts4, tridiagText, vecText, vecR, pyValue, eText , withThen } from './numerique-h-kit.js';

const FD = 'n-bvp-fd';
const CV = 'n-bvp-convergence';

// ======================================================================
// n-bvp-fd
// ======================================================================

const FD_SUB = [
  { id: 'scheme', label: 'différence centrée de u″', skill: 'n-fd-basic' },
  { id: 'boundary', label: 'conditions aux bords dans f̃', skill: FD },
  { id: 'matrix', label: 'la matrice A', skill: FD },
  { id: 'spd', label: 'A définie positive', skill: 'm-posdef' },
  { id: 'solve', label: 'système tridiagonal', skill: 'n-thomas' },
];

function fdData(rng, { bc = true } = {}) {
  for (let t = 0; t < 200; t++) {
    const N = rng.pick([2, 3, 4]);
    const m = (N + 1) * (N + 1);
    const al = bc ? rng.int(-2, 3) : 0;
    const be = bc ? rng.int(-2, 3) : 0;
    if (bc && (al === 0 || be === 0)) continue;
    const a = rng.int(-3, 3);
    const b = rng.int(-2, 2);
    if (a === 0 && b === 0) continue;
    const h = q(1, N + 1);
    const fx = (x) => q(2 * a - 2 * b).add(q(6 * b).mul(x));
    const ux = (x) => q(al).mul(q(1).sub(x)).add(q(be).mul(x)).add(x.mul(q(1).sub(x)).mul(q(a).add(q(b).mul(x))));
    const xs = Array.from({ length: N }, (_, i) => h.mul(i + 1));
    const f = xs.map(fx);
    const ft = f.map((v, i) => v.add(i === 0 ? q(al * m) : q(0)).add(i === N - 1 ? q(be * m) : q(0)));
    const u = xs.map(ux);
    if (f.some((v) => v.d > 4)) continue;
    return { N, m, al, be, a, b, h, xs, f, ft, u, fText: polyText(2 * a - 2 * b, 6 * b) };
  }
  throw new Error('fdData');
}
const fR = (d) => d.fText;
// c₀ + c₁x written out: « 4 − 12x », « 6x », « −2 ».
function polyText(c0, c1) {
  const x = c1 === 0 ? '' : `${Math.abs(c1) === 1 ? '' : Math.abs(c1)}x`;
  if (c0 === 0) return c1 === 0 ? '0' : `${c1 < 0 ? '−' : ''}${x}`;
  return `${fq(c0)}${c1 === 0 ? '' : ` ${c1 < 0 ? '−' : '+'} ${x}`}`;
}
const aMat = (d) => tridiagText(d.N, -d.m, 2 * d.m, -d.m);
const pbText = (d) => `−u″ = ${fR(d)} sur ]0 ; 1[, u(0) = ${fq(d.al)}, u(1) = ${fq(d.be)}, N = ${d.N} (h = 1/${d.N + 1})`;

const FD_MENU = [
  { id: 'diag', label: 'Coefficient diagonal 2/h²' },
  { id: 'rhs1', label: 'Second membre f̃₁ (bord gauche)' },
  { id: 'rhsN', label: 'Second membre f̃_N (bord droit)' },
  { id: 'solve', label: 'Résoudre le système', why: 'On n\'a pas encore écrit le système.' },
];

function diagPart(d, level) {
  return {
    html: 'Le coefficient diagonal de A est 2/h².', ask: 'aᵢᵢ =',
    start: `2/(1/${d.N + 1})^2`,
    judge: { kind: 'value', expect: String(2 * d.m), form: 'irreducible', ntraps: { n_bvp_h2_missing: ['2'] }, nctx: { h2: `1/${d.m}` } },
    menu: level === 3 ? menuOf(FD_MENU, 'diag') : undefined,
    lines: [
      { math: `2×${d.m}`, note: `1/h² = ${d.m}`, subgoal: 'matrix', blank: [String(d.m)] },
      { math: String(2 * d.m), note: 'Diagonale de A', subgoal: 'matrix', blank: [String(2 * d.m)] },
    ],
  };
}
function rhsPart(d, which, level) {
  const i = which === 1 ? 0 : d.N - 1;
  const bc = which === 1 ? d.al : d.be;
  const name = which === 1 ? 'f̃₁' : `f̃${'₀₁₂₃₄₅'[d.N]}`;
  const x = d.xs[i];
  return {
    html: `${name} = f(x${which === 1 ? '₁' : '_N'}) + ${which === 1 ? 'u(0)' : 'u(1)'}/h², avec x${which === 1 ? '₁' : '_N'} = ${fq(x)}.`,
    ask: `${name} =`,
    start: `${qt(d.f[i])}+${bc < 0 ? `(${bc})` : bc}/(1/${d.N + 1})^2`,
    judge: { kind: 'value', expect: qt(d.ft[i]), form: 'irreducible', ntraps: { n_bvp_bc_rhs: [qt(d.f[i]), qt(d.f[i].sub(q(bc * d.m)))] }, nctx: { α: fq(bc) } },
    menu: level === 3 ? menuOf(FD_MENU, which === 1 ? 'rhs1' : 'rhsN') : undefined,
    lines: [
      { math: `${qt(d.f[i])}+${bc < 0 ? `(${bc})` : bc}×${d.m}`, note: `f(${fq(x)}) = ${fq(d.f[i])}`, subgoal: 'boundary', blank: [String(d.m)] },
      { math: qt(d.ft[i]), note: `Le bord ${which === 1 ? 'gauche' : 'droit'} passe à droite`, subgoal: 'boundary', blank: [qt(d.ft[i])] },
    ],
  };
}

const BC_DECISION = (d) => ({
  kind: 'decision', prompt: `L'équation en x₁ contient −u₀/h² avec u₀ = u(0) = ${fq(d.al)} connu. Que devient ce terme ?`, options: [
    { id: 'rhs', label: 'Il passe à droite : f̃₁ = f(x₁) + u(0)/h²', valid: true, ref: true },
    { id: 'drop', label: 'On l\'oublie : f̃₁ = f(x₁)', valid: false, rule: 'n_bvp_bc_rhs', why: `u₀ = ${fq(d.al)} n'est pas nul : −u₀/h² passe à droite et devient +u₀/h².` },
    { id: 'minus', label: 'Il passe à droite avec un signe − : f̃₁ = f(x₁) − u(0)/h²', valid: false, why: 'En passant de l\'autre côté du signe =, −u₀/h² devient +u₀/h².' },
  ],
});

function fdHints(d) {
  return H('Écris l\'équation au nœud xᵢ avec la différence centrée de u″ ; aux nœuds 1 et N, u₀ et u_{N+1} sont connus : ils passent à droite.',
    `f̃₁ = ${fq(d.f[0])} + (${fq(d.al)})·□`,
    `A = ${d.m}·tridiag(−1, 2, −1), f̃₁ = ${fq(d.ft[0])}, f̃_N = ${fq(d.ft[d.N - 1])}.`);
}

function fdLevel123(level, rng) {
  const d = fdData(rng);
  const parts = [diagPart(d, level), rhsPart(d, 1, level), rhsPart(d, d.N, level)];
  if (level >= 2) parts[1].decisions = [BC_DECISION(d)];
  return partsItem({
    skill: FD, level, key: `${FD}:${level}:${d.N}:${d.al}:${d.be}:${d.a}:${d.b}`,
    prompt: `${pbText(d)}. Le schéma centré s'écrit (−uᵢ₋₁ + 2uᵢ − uᵢ₊₁)/h² = f(xᵢ), soit Au = f̃. Calcule le coefficient diagonal de A, puis les seconds membres aux deux bords.${level === 3 ? ' Choisis d\'abord chaque action.' : ''}`,
    parts, hints: fdHints(d), subgoals: FD_SUB, keys: ['calc'],
    baits: ['n_bvp_bc_rhs', 'n_bvp_h2_missing'],
  });
}

// L2 alternative (catalogue: A and f̃ written out): the grid.
function fdMatrices(level, rng, opts = {}) {
  const d = fdData(rng);
  const A = aMat(d);
  const ft = vecText(d.ft);
  const parts = [
    {
      html: 'La matrice A.', ask: 'A =', start: 'A',
      judge: { kind: 'mat', expect: A },
      lines: [{ math: A, note: `(1/h²)·tridiag(−1, 2, −1), 1/h² = ${d.m}`, subgoal: 'matrix', cells: [[0, 0], [0, 1]] }],
    },
    {
      html: 'Le second membre f̃.', ask: 'f̃ =', start: 'f',
      judge: { kind: 'mat', expect: ft },
      lines: [{ math: ft, note: 'f(xᵢ), plus u(0)/h² en haut et u(1)/h² en bas', subgoal: 'boundary', cells: [[0, 0], [d.N - 1, 0]] }],
    },
  ];
  return partsItem({
    skill: FD, level, key: `${FD}:mat:${level}:${d.N}:${d.al}:${d.be}:${d.a}:${d.b}`,
    prompt: `${pbText(d)}. Écris la matrice A et le vecteur f̃ du système Au = f̃ (schéma centré).`,
    parts, hints: opts.exam ? [] : fdHints(d), subgoals: FD_SUB, keys: ['calc', 'mat'], exam: opts.exam, noHints: opts.noHints,
    baits: ['n_bvp_bc_rhs', 'n_bvp_h2_missing'],
  });
}

const SPD_PROOF = [
  'Soit v ∈ ℝᴺ, v ≠ 0. On développe : vᵀAv = (1/h²)(2Σvᵢ² − 2Σvᵢvᵢ₊₁).',
  'On regroupe : vᵀAv = (1/h²)(v₁² + Σᵢ (vᵢ₊₁ − vᵢ)² + v_N²).',
  'Chaque terme est ≥ 0, donc vᵀAv ≥ 0.',
  'Si vᵀAv = 0, tous les carrés sont nuls : v₁ = 0, puis v₂ = v₁ = 0, …, v_N = 0.',
  'Comme v ≠ 0, c\'est impossible : vᵀAv > 0. A est symétrique, donc définie positive.',
];
function spdBlocks(level, rng, opts = {}) {
  const ids = SPD_PROOF.map((_, i) => `b${i}`);
  const blocks = SPD_PROOF.map((html, i) => ({ id: ids[i], html, needs: i ? [ids[i - 1]] : [], earlyWhy: i ? 'Pas encore : ce bloc s\'appuie sur le bloc précédent.' : undefined }));
  blocks.push({ id: 'd0', html: 'vᵀAv ≥ 0 pour tout v, donc A est définie positive.', needs: [], distractor: 'n_spd_semidefinite', why: 'Il faut vᵀAv > 0 pour v ≠ 0 : une matrice semi-définie (A·1 = 0 avec des bords de Neumann) a aussi vᵀAv ≥ 0.' });
  blocks.push({ id: 'd1', html: 'Les coefficients diagonaux 2/h² sont positifs, donc A est définie positive.', needs: [], distractor: 'l_posdef_diag', why: 'Une diagonale positive ne suffit pas : [[1, 2], [2, 1]] a la valeur propre −1.' });
  return blocksItem({
    skill: FD, level, mode: 'order',
    prompt: 'A = (1/h²)·tridiag(−1, 2, −1) de taille N. Montre que A est symétrique définie positive : touche les blocs dans l\'ordre de la preuve.',
    blocks: rng.shuffle(blocks), goal: ids.at(-1), order: ids, placed: [],
    hints: opts.noHints || opts.exam ? [] : H('Développe vᵀAv, puis regroupe en une somme de carrés.', 'vᵀAv = (1/h²)(v₁² + Σ(vᵢ₊₁ − □)² + v_N²)', 'Une somme de carrés nulle force v₁ = 0, puis toutes les composantes à 0.'),
    noHints: !!opts.noHints || !!opts.exam, exam: opts.exam || false,
    solution: SPD_PROOF.map((s) => ({ html: s, note: '' })),
    subgoals: FD_SUB, key: `${FD}:spd`, expectedSec: 150,
  });
}

const BVP = refCode(`def bvp_system(N, f, alpha, beta):
    # -u'' = f sur ]0;1[, u(0) = alpha, u(1) = beta ; inconnue u[i] au point (i + 1) h
    h = 1 / (N + 1)
    A = zeros2(N, N)
    rhs = zeros(N)
    for i in range(N):
        A[i][i] = «2 / (h * h)»
        if i > 0:
            A[i][i - 1] = «-1 / (h * h)»
        if i < N - 1:
            A[i][i + 1] = -1 / (h * h)
        rhs[i] = «f((i + 1) * h)»
    rhs[0] = «rhs[0] + alpha / (h * h)»
    rhs[N - 1] = rhs[N - 1] + beta / (h * h)
    return [A, rhs]
`);
const BVP_SETUP = 'def one(x): return 1.0\ndef zero(x): return 0.0\nS = bvp_system(3, one, 0.0, 0.0)\nT = bvp_system(3, zero, 1.0, 3.0)';
const BVP_TESTS = [
  { setup: BVP_SETUP, expr: 'solve(S[0], S[1])', expect: '[0.09375, 0.125, 0.09375]', tol: 1e-12 },
  { setup: BVP_SETUP, expr: 'solve(T[0], T[1])', expect: '[1.5, 2.0, 2.5]', tol: 1e-12 },
  // f(x) = x : u = (x − x³)/6, a cubic, so the scheme is exact.
  { setup: 'def lin(x): return x\nU = bvp_system(3, lin, 0.0, 0.0)', expr: 'solve(U[0], U[1])', expect: '[0.0390625, 0.0625, 0.0546875]', tol: 1e-12 },
];
const BVP_TRAPS = {
  0: [{ text: '2', rule: 'n_bvp_h2_missing' }],
  3: [{ text: 'rhs[0]', rule: 'n_bvp_bc_rhs' }, { text: 'rhs[0] - alpha / (h * h)', rule: 'n_bvp_bc_rhs' }],
};
const BVP_WRONG = { 1: '1 / (h * h)', 2: 'f(i * h)' };

function fdCode(level, rng) {
  const N = rng.pick([3, 4, 5, 7]);
  const h = 1 / (N + 1);
  const rows = Array.from({ length: N }, (_, i) => {
    const x = (i + 1) * h;
    const u = pyValue(BVP.text, `solve(bvp_system(${N}, one, 0.0, 0.0)[0], bvp_system(${N}, one, 0.0, 0.0)[1])[${i}]`, { mat: true, setup: 'def one(x): return 1.0' }).v;
    return [String(Number(x.toFixed(6))), String(Number(u.toPrecision(10))), String(Number((x * (1 - x) / 2).toPrecision(10)))];
  });
  const then = readtableItem({
    skill: FD, level, key: `${FD}:out:${N}`,
    prompt: `Le programme, appelé avec N = ${N}, f = 1, α = β = 0, puis solve(A, rhs), donne les uᵢ ; on les compare à la solution exacte u(x) = x(1 − x)/2.`,
    table: { columns: ['xᵢ', 'uᵢ', 'u(xᵢ)'], rows },
    question: mcq({
      skill: FD, level, key: `${FD}:outq:${N}`,
      prompt: 'Pourquoi uᵢ = u(xᵢ) exactement ?',
      options: [
        { html: 'u est un polynôme de degré 2 : la différence centrée de u″ est exacte', correct: true },
        { html: 'Parce que h est petit', correct: false },
        { html: 'Parce que A est définie positive', correct: false, rule: 'n_spd_semidefinite' },
        { html: 'Par hasard : l\'erreur est en h²', correct: false },
      ],
      solution: [{ html: 'L\'erreur de troncature fait intervenir u⁽⁴⁾, nulle pour un polynôme de degré ≤ 3 : le schéma est exact aux nœuds.', note: '' }],
    }, rng),
  });
  return withThen(codeItem({
    skill: FD, level, ref: BVP, blanks: holesFor(5, BVP), traps: BVP_TRAPS, wrong: BVP_WRONG, rng, preludes: ['vec', 'mat'],
    prompt: 'Complète la fonction qui écrit le système Au = f̃ du schéma centré (inconnue u[i] au nœud (i + 1)h, indices à partir de 0).',
    tests: BVP_TESTS, then, hints: [], subgoals: FD_SUB, key: `5:${N}`,
  }));
}

// Exam (2019 Q1): the Neumann matrix, several answers; or f̃₁.
function fdExamMcq(rng, opts) {
  if (rng.chance(0.5)) {
    return multiMcq({
      skill: FD, level: 4, key: `${FD}:neumann`, exam: examTag(opts),
      prompt: 'Soit A = [[1, −1, 0, 0], [−1, 2, −1, 0], [0, −1, 2, −1], [0, 0, −1, 1]] (bords de Neumann). Cocher les affirmations vraies.',
      options: [
        { html: 'A·(1, 1, 1, 1)ᵀ = 0', correct: true },
        { html: 'xᵀAx ≥ 0 pour tout x ∈ ℝ⁴', correct: true },
        { html: 'A est inversible', correct: false },
        { html: 'A est symétrique définie positive', correct: false, rule: 'n_spd_semidefinite' },
      ],
      solution: [{ html: 'xᵀAx = Σ(xᵢ₊₁ − xᵢ)² ≥ 0, nul pour x = (1, 1, 1, 1) : A est semi-définie, singulière.', note: '' }],
    }, rng);
  }
  const d = fdData(rng);
  const right = fq(d.ft[0]);
  return mcq({
    skill: FD, level: 4, key: `${FD}:f1:${d.N}:${d.al}:${d.a}:${d.b}`, exam: examTag(opts),
    prompt: `${pbText(d)}. Avec le schéma centré, Au = f̃. Que vaut f̃₁ ?`,
    options: opts4(right, [
      { html: fq(d.f[0]), rule: 'n_bvp_bc_rhs' },
      { html: fq(d.f[0].add(q(d.al))), rule: 'n_bvp_h2_missing' },
      { html: fq(d.f[0].sub(q(d.al * d.m))) },
    ], [fq(d.ft[0].add(q(1))), fq(d.ft[0].mul(2))]),
    solution: [{ html: `f̃₁ = f(x₁) + u(0)/h² = ${fq(d.f[0])} + ${fq(d.al)}·${d.m} = ${right}.`, note: '' }],
  }, rng);
}

function fdOpen(rng, opts) {
  const mats = fdMatrices(4, rng, { exam: examTag(opts, 3.5), noHints: true });
  const proof = spdBlocks(4, rng, { exam: examTag(opts, 3.5), noHints: true });
  return problemItem({
    skill: FD, level: 4, key: `${FD}:open:${mats.key}`, exam: examTag(opts, 3.5),
    prompt: 'Problème aux limites par différences finies (modèle des examens 2020 et 2022).',
    parts: [{ item: mats, points: [1, 1], title: 'Le système Au = f̃' }, { item: proof, points: 1.5, title: 'A est définie positive' }],
  });
}

function fdGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return fdExamMcq(rng, opts);
  if (opts.exam === 'open') return fdOpen(rng, opts);
  if (level === 1 || level === 3) return fdLevel123(level, rng);
  if (level === 2) return rng.chance(0.5) ? fdLevel123(2, rng) : fdMatrices(2, rng);
  if (level === 4) return spdBlocks(4, rng);
  return fdCode(5, rng);
}

// ======================================================================
// n-bvp-convergence
// ======================================================================

const CV_SUB = [
  { id: 'taylor', label: 'Taylor à l\'ordre 4', skill: 'a1-dl-usual' },
  { id: 'consistency', label: 'consistance', skill: CV },
  { id: 'stability', label: 'stabilité', skill: CV },
  { id: 'constant', label: 'la constante', skill: CV },
  { id: 'scheme', label: 'le schéma et A', skill: FD },
  { id: 'proof', label: 'preuve d\'ordre', skill: 'n-fd-proof' },
];

const SOLS = [
  { u: 'sin(πx)', f: 'π²·sin(πx)', M4: 'π^4', M4R: 'π⁴', note: 'u⁽⁴⁾ = π⁴ sin(πx)' },
  { u: '1 − eˣ + (e − 1)x', f: 'eˣ', M4: 'e', M4R: 'e', note: 'u⁽⁴⁾ = −eˣ, de module ≤ e sur [0 ; 1]' },
  { u: 'sin(2πx)', f: '4π²·sin(2πx)', M4: '16π^4', M4R: '16π⁴', note: 'u⁽⁴⁾ = 16π⁴ sin(2πx)' },
];

function cvParts(level, rng, { L = 1, sol = null } = {}) {
  // Levels 1 and 2: the computation is the start; later, only its name.
  const S = (calc, name) => (level <= 2 ? calc : name);
  const tr = { n_truncation_constant: ['1/24', '1/6'] };
  const parts = [
    {
      html: 'Taylor-Lagrange : u(xᵢ ± h) = u ± hu′ + (h²/2)u″ ± (h³/6)u‴ + c·h⁴u⁽⁴⁾(ξ±). Le coefficient c :', ask: 'c =',
      start: S('1/(4!)', 'c'), judge: { kind: 'value', expect: '1/24', form: 'irreducible' },
      lines: [{ math: '1/24', note: '4! = 24', subgoal: 'taylor', blank: ['1/24'] }],
    },
    {
      html: 'τᵢ = (−u(xᵢ₋₁) + 2u(xᵢ) − u(xᵢ₊₁))/h² − f(xᵢ) = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), donc |τᵢ| ≤ C₁h²·max|u⁽⁴⁾|. La constante C₁ :', ask: 'C₁ =',
      start: S('2×(1/24)', 'C_1'), judge: { kind: 'value', expect: '1/12', form: 'irreducible', ntraps: tr },
      lines: [{ math: '1/12', note: 'Les deux restes s\'additionnent', subgoal: 'consistency', blank: ['1/12'] }],
    },
    {
      html: `Stabilité (admise) : si Av = g, max|vᵢ| ≤ ${L === 1 ? '(1/8)' : `(L²/8)`}·max|gᵢ|${L === 1 ? '' : `, avec L = ${L}`}. Avec A(w − u) = τ, max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾| :`, ask: 'C =',
      start: S(`(${q(L * L, 8)})×(1/12)`, 'C'), judge: { kind: 'value', expect: qt(q(L * L, 96)), form: 'irreducible', ntraps: { n_truncation_constant: [qt(q(L * L, 192)), qt(q(L * L, 48))] } },
      lines: [{ math: qt(q(L * L, 96)), note: 'Consistance × stabilité', subgoal: 'stability', blank: [qt(q(L * L, 96))] }],
    },
  ];
  if (sol) {
    parts.push({
      html: `Pour u(x) = ${sol.u} (f = ${sol.f}) : max|u⁽⁴⁾| sur [0 ; 1].`, ask: 'max|u⁽⁴⁾| =',
      start: 'M_4', judge: { kind: 'value', expect: sol.M4, form: 'closed' },
      lines: [{ math: sol.M4, note: sol.note, subgoal: 'constant', blank: [sol.M4] }],
    });
  }
  if (level === 3) {
    const MENU = [
      { id: 'taylor', label: 'Développer u(xᵢ ± h) par Taylor' },
      { id: 'cons', label: 'Majorer la troncature τᵢ' },
      { id: 'stab', label: 'Appliquer la stabilité à l\'erreur' },
      { id: 'max', label: 'Majorer u⁽⁴⁾' },
    ];
    ['taylor', 'cons', 'stab', 'max'].forEach((id, k) => { if (parts[k]) parts[k].menu = menuOf(MENU, id); });
  }
  return parts;
}

function cvHints(L = 1) {
  return H('Remplace uᵢ par u(xᵢ) dans le schéma : ce qui reste est τᵢ. Développe u(xᵢ ± h) jusqu\'à l\'ordre 4.',
    'u(xᵢ₊₁) + u(xᵢ₋₁) = 2u(xᵢ) + h²u″(xᵢ) + (h⁴/24)(□ + □)',
    `|τᵢ| ≤ h²/12·max|u⁽⁴⁾|, et la stabilité donne le facteur ${L === 1 ? '1/8' : `${L * L}/8`} : C = ${qt(q(L * L, 96))}.`);
}

function cvLines(level, rng) {
  const sol = level === 1 ? null : rng.pick(SOLS);
  const L = level === 4 ? rng.pick([1, 2, 3]) : 1;
  const parts = cvParts(level, rng, { L, sol });
  if (level === 4 && L !== 1) parts.pop();
  return partsItem({
    skill: CV, level, key: `${CV}:${level}:${sol?.M4 ?? '-'}:${L}`,
    prompt: `Convergence du schéma centré pour −u″ = f sur ]0 ; ${L}[ avec u = 0 aux bords : consistance, stabilité, puis la constante C de max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾|.${level === 3 ? ' Choisis d\'abord chaque action.' : ''}`,
    parts, hints: cvHints(L), subgoals: CV_SUB, keys: ['calc'], baits: ['n_truncation_constant'],
  });
}

const CV_PROOF = [
  'Consistance : avec w = (u(xᵢ))ᵢ, Aw = f + τ, et |τᵢ| ≤ (h²/12)·max|u⁽⁴⁾|.',
  'Le schéma donne Au = f ; on soustrait les deux systèmes : A(w − u) = τ.',
  'Stabilité appliquée à e = w − u : max|eᵢ| ≤ (1/8)·max|τᵢ|.',
  'Conclusion : max|u(xᵢ) − uᵢ| ≤ (h²/96)·max|u⁽⁴⁾|.',
];
function cvBlocks(level, rng, opts = {}) {
  const ids = CV_PROOF.map((_, i) => `b${i}`);
  const blocks = CV_PROOF.map((html, i) => ({ id: ids[i], html, needs: i ? [ids[i - 1]] : [], earlyWhy: i ? 'Pas encore : ce bloc s\'appuie sur le bloc précédent.' : undefined }));
  blocks.push({ id: 'd0', html: 'τ est en O(h²), donc l\'erreur u(xᵢ) − uᵢ est en O(h²).', needs: [], distractor: 'n_stability_skipped', why: 'La consistance seule ne suffit pas : c\'est la stabilité qui transmet O(h²) à l\'erreur.' });
  blocks.push({ id: 'd1', html: 'Les points ξ₊ et ξ₋ sont égaux, donc les restes s\'annulent.', needs: [], distractor: 'n_proof_same_xi', why: 'Chaque développement a son propre point intermédiaire : on majore, on ne simplifie pas.' });
  return blocksItem({
    skill: CV, level, mode: 'order',
    prompt: 'Montre que le schéma centré pour −u″ = f converge en O(h²) : touche les blocs dans l\'ordre (consistance, équation de l\'erreur, stabilité, conclusion).',
    blocks: rng.shuffle(blocks), goal: ids.at(-1), order: ids, placed: [],
    hints: opts.noHints || opts.exam ? [] : H('Consistance + stabilité ⇒ convergence.', 'A(w − u) = □', 'max|eᵢ| ≤ (1/8)(h²/12)·max|u⁽⁴⁾| = (h²/96)·max|u⁽⁴⁾|.'),
    noHints: !!opts.noHints || !!opts.exam, exam: opts.exam || false,
    solution: CV_PROOF.map((s) => ({ html: s, note: '' })),
    subgoals: CV_SUB, key: `${CV}:blocks`, expectedSec: 120,
  });
}

// The tables of errors (recomputed: tests/uni-numerique-h.test.js).
export const CV_TABLES = {
  sin: { title: '−u″ = π² sin(πx), u = sin(πx)', rows: [[9, '8.265e-03', '1.015e-02'], [19, '2.059e-03', '2.537e-03'], [39, '5.142e-04', '6.342e-04'], [79, '1.285e-04', '1.585e-04']] },
  exp: { title: '−u″ = eˣ, u = 1 − eˣ + (e − 1)x (examen 2020)', rows: [[9, '1.752621e-04', '2.832e-04'], [19, '4.411990e-05', '7.079e-05'], [39, '1.103101e-05', '1.770e-05'], [79, '2.758498e-06', '4.424e-06']] },
};
function cvTable(rng, n = 3) {
  const k = rng.pick(['sin', 'exp']);
  const T = CV_TABLES[k];
  const rows = T.rows.slice(0, n).map((r) => [String(r[0]), r[1], r[2]]);
  return { k, T, table: { columns: ['N', 'max|u(xᵢ) − uᵢ|', k === 'sin' ? 'h²π⁴/96' : 'h²e/96'], rows } };
}
function cvQuestion(rng, level, t, extra = {}) {
  return multiMcq({
    skill: CV, level, key: `${CV}:read:${t.k}`, ...extra,
    prompt: `${t.T.title} : erreur maximale aux nœuds et borne théorique. Cocher les affirmations vraies.`,
    options: [
      { html: 'L\'erreur est divisée par environ 4 quand N + 1 double : ordre 2', correct: true },
      { html: 'La borne théorique C·h²·max|u⁽⁴⁾| est respectée', correct: true },
      { html: 'L\'erreur est divisée par 2 quand N + 1 double : ordre 1', correct: false },
      { html: 'La consistance (τ = O(h²)) suffit à garantir ce tableau, sans stabilité', correct: false, rule: 'n_stability_skipped' },
    ],
    solution: [{ html: 'h est divisé par 2 et l\'erreur par 4 = 2² : ordre 2, sous la borne h²·max|u⁽⁴⁾|/96. La preuve demande la consistance et la stabilité.', note: '' }],
  }, rng);
}
function cvRead(level, rng) {
  const t = cvTable(rng, 4);
  return readtableItem({
    skill: CV, level, key: `${t.k}:${level}`,
    prompt: 'Le schéma centré pour −u″ = f, u(0) = u(1) = 0, a donné ces erreurs (h = 1/(N + 1)) :',
    table: t.table, question: cvQuestion(rng, level, t), subgoals: CV_SUB,
    hints: level >= 5 ? [] : H('Compare deux lignes : N + 1 double, donc h est divisé par 2.', 'erreur(N = 19)/erreur(N = 39) ≈ □', '≈ 4 = 2² : ordre 2, sous la borne.'),
  });
}

function cvExamMcq(rng, opts) {
  if (rng.chance(0.5)) {
    const t = cvTable(rng, 3);
    const qz = cvQuestion(rng, 4, t);
    return { ...qz, prompt: qz.prompt.replace(' Cocher', `${tableHtml(t.table)}Cocher`), exam: examTag(opts), key: `${CV}:exam:${t.k}` };
  }
  return mcq({
    skill: CV, level: 4, key: `${CV}:trunc`, exam: examTag(opts),
    prompt: 'Pour u ∈ C⁴, l\'erreur de troncature de la différence centrée (−u(x − h) + 2u(x) − u(x + h))/h² de −u″(x) est majorée par…',
    options: [
      { html: '(h²/12)·max|u⁽⁴⁾|', correct: true },
      { html: '(h²/24)·max|u⁽⁴⁾|', correct: false, rule: 'n_truncation_constant' },
      { html: '(h/2)·max|u‴|', correct: false },
      { html: '(h⁴/24)·max|u⁽⁴⁾|', correct: false },
    ],
    solution: [{ html: 'Les deux restes (h⁴/24)u⁽⁴⁾(ξ±) s\'additionnent, puis on divise par h² : h²/12.', note: '' }],
  }, rng);
}

function cvOpen(rng, opts) {
  const sol = SOLS[0];
  const parts = cvParts(4, rng, { L: 1, sol });
  const last = {
    html: 'La borne finale : max|u(xᵢ) − uᵢ| ≤ K·h².', ask: 'K =', start: 'K',
    judge: { kind: 'value', expect: 'π^4/96', form: 'closed', ntraps: { n_truncation_constant: ['π^4/192', 'π^4/48'] } },
    lines: [{ math: 'π^4/96', note: '(1/8)·(1/12)·π⁴', subgoal: 'stability' }],
  };
  const values = partsItem({
    skill: CV, level: 4, key: `${CV}:open:vals`, prompt: 'Consistance puis convergence pour −u″ = π² sin(πx), u = sin(πx).',
    parts: [parts[1], parts[3], last], hints: [], noHints: true, subgoals: CV_SUB, keys: ['calc'], exam: examTag(opts, 4),
  });
  const proof = cvBlocks(4, rng, { exam: examTag(opts, 4), noHints: true });
  return problemItem({
    skill: CV, level: 4, key: `${CV}:open`, exam: examTag(opts, 4),
    prompt: 'Convergence du schéma centré (examen 2022, question ouverte 2, parties d à f).',
    parts: [{ item: proof, points: 1, title: 'L\'équation de l\'erreur et la stabilité' }, { item: values, points: [1, 0.5, 1.5], title: 'Les constantes' }],
  });
}

function cvGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return cvExamMcq(rng, opts);
  if (opts.exam === 'open') return cvOpen(rng, opts);
  if (level === 3) return cvBlocks(3, rng);
  if (level === 5) return cvRead(5, rng);
  return cvLines(level, rng);
}

export const GEN = { [FD]: fdGen, [CV]: cvGen };
export { modeOf, linesItem };

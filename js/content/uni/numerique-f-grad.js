// n-gradient-spd (module N, part f, step U9): the gradient method for
// Ax = b, A symmetric positive definite, with the optimal step or a fixed
// step. Catalogue: docs/universite/N-analyse-numerique.md, n-gradient-spd.
//
// Data: A among [[2, −1], [−1, 2]] (λ = 1, 3), [[3, 1], [1, 3]] (2, 4),
// [[5, 2], [2, 2]] (1, 6), [[2, 0], [0, 4]]; b whole, x⁽⁰⁾ = 0; two optimal
// steps with denominators ≤ 64; r⁽⁰⁾ never an eigenvector. The table is
// judged from the student's cells (phi 'gradient'): rᵏ = b − Axᵏ, αₖ =
// rᵀr/rᵀAr, xᵏ⁺¹ = xᵏ + αₖrᵏ.
// L1 r⁽⁰⁾ given, α₀ and x⁽¹⁾ to fill; L2 one iteration; L3 choose the step
// and the sign, then α₀ and x⁽¹⁾; L4 two iterations, then the interval of
// the fixed step; L5 the programs gradient and gradient_fixed, then a table
// of errors of the fixed step. Exam: mcq (the interval of α), tf, open (the
// proof of 2021, 7 points: ∇f = 0, the error equation, the eigenvector
// argument, α < 2/λ_max).

import { Q } from '../../math/rational.js';
import { linesItem, mcq, tfItem, blocksItem, examTag } from './kit.js';
import { mt, vt, MLm, ML, mcqDistinct } from './alglin-kit.js';
import { problemItem } from './kit-problem.js';
import {
  refCode, codeItem, readtableItem, multiMcq, vfMcq, iterTable, H, fmt, expText, blankBy,
} from './numerique-kit.js';
import { referenceRows, fv } from '../../judges/iter-num.js';

const GR = 'n-gradient-spd';
const SUB = [
  { id: 'residual', label: 'r = b − Ax', skill: GR },
  { id: 'step', label: 'pas optimal', skill: GR },
  { id: 'update', label: 'x + αr', skill: GR },
  { id: 'fixed', label: 'pas fixe : 0 < α < 2/λ_max', skill: GR },
  { id: 'spd', label: 'A SDP', skill: 'm-posdef' },
  { id: 'grad', label: '∇Φ = Av − b', skill: 'm-quad-gradient' },
];
const MATS = [
  { A: [[2, -1], [-1, 2]], l: [1, 3] },
  { A: [[3, 1], [1, 3]], l: [2, 4] },
  { A: [[5, 2], [2, 2]], l: [1, 6] },
  { A: [[2, 0], [0, 4]], l: [2, 4] },
];
const R = (s) => String(s).replace(/-/g, '−');
const vR = (v) => R(`(${v.join(' ; ')})`);
const COLS = [
  { id: 'x1', label: 'x₁⁽ᵏ⁾' }, { id: 'x2', label: 'x₂⁽ᵏ⁾' }, { id: 'r1', label: 'r₁⁽ᵏ⁾' }, { id: 'r2', label: 'r₂⁽ᵏ⁾' }, { id: 'alpha', label: 'αₖ' },
];

function data(rng) {
  for (let t = 0; t < 300; t++) {
    const m = rng.pick(MATS);
    const b = [rng.int(-3, 3), rng.int(-3, 3)];
    if (b.every((x) => x === 0)) continue;
    const Ab = m.A.map((r) => r[0] * b[0] + r[1] * b[1]);
    if (Ab[0] * b[1] - Ab[1] * b[0] === 0) continue; // r⁽⁰⁾ = b is an eigenvector
    const phi = { kind: 'gradient', A: m.A.map((r) => r.map(String)), b: b.map(String), x0: ['0', '0'], step: 'optimal', tol: 1e-9 };
    const rows = referenceRows({ ...phi, cols: COLS.map((c) => c.id) }, 3);
    const vals = rows.flatMap((r) => [r.x1, r.x2, r.r1, r.r2, r.alpha]);
    if (vals.some((v) => !(v instanceof Q) || v.d > 64)) continue;
    return { ...m, b, phi, rows };
  }
  const m = MATS[0];
  const phi = { kind: 'gradient', A: m.A.map((r) => r.map(String)), b: ['1', '0'], x0: ['0', '0'], step: 'optimal', tol: 1e-9 };
  return { ...m, b: [1, 0], phi, rows: referenceRows({ ...phi, cols: COLS.map((c) => c.id) }, 3), fallback: true };
}
const Ar = (d, r) => d.A.map((row) => row[0] * fv(r[0]) + row[1] * fv(r[1]));
const qv = (v) => v.map((x) => (x instanceof Q ? x : new Q(x)));
const ArQ = (d, r) => d.A.map((row) => qv(r).reduce((s, x, j) => s.add(x.mul(row[j])), new Q(0)));
const rowVec = (r, p) => [r[`${p}1`], r[`${p}2`]];

function table(rng, level) {
  const d = data(rng);
  const r0 = rowVec(d.rows[0], 'r');
  const n = level === 4 ? 3 : 2;
  const given = level === 1 ? (k, id) => k === 0 && id !== 'alpha' : (k, id) => k === 0 && id.startsWith('x');
  const blank = (k, id) => k === n - 1 && !id.startsWith('x');
  const then = level === 4 ? stepMcq(rng, d, 4) : null;
  return iterTable({
    skill: GR, level, key: `${level}:${mt(d.A)}:${d.b}`, n, cols: COLS, phi: d.phi, given, blank, then,
    prompt: `Méthode du gradient à pas optimal pour Ax = b, A = ${MLm(d.A)}, b = ${vR(d.b)}, x⁽⁰⁾ = 0 : r⁽ᵏ⁾ = b − Ax⁽ᵏ⁾, αₖ = (r⁽ᵏ⁾·r⁽ᵏ⁾)/(r⁽ᵏ⁾·Ar⁽ᵏ⁾), x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αₖr⁽ᵏ⁾.${level === 1 ? ` On a Ar⁽⁰⁾ = ${vR(ArQ(d, r0))}.` : ''} ${n === 3 ? 'Fais deux itérations' : 'Fais une itération'} (fractions exactes).`,
    hints: H('Le résidu r = b − Ax est la direction de plus grande descente ; le pas optimal minimise Φ(x + αr) : α = (r·r)/(r·Ar).',
      `α₀ = (r⁽⁰⁾·r⁽⁰⁾)/(r⁽⁰⁾·□), avec Ar⁽⁰⁾ = ${vR(ArQ(d, r0))}`,
      `α₀ = ${fmt(d.rows[0].alpha)}, x⁽¹⁾ = ${vR(rowVec(d.rows[1], 'x'))}.`),
    subgoals: SUB, baits: ['n_gradient_sign', 'n_optimal_step_inverted', ...(then ? then.baits : [])], fallback: d.fallback,
  });
}

function stepMcq(rng, d, level, exam = false) {
  const [l1, l2] = d.l;
  const q = (a, b) => fmt(new Q(a, b));
  return mcqDistinct({
    skill: GR, level, key: `${GR}:step:${mt(d.A)}`, exam,
    prompt: `A = ${MLm(d.A)} est SDP, de valeurs propres ${l1} et ${l2}. Pour quels pas fixes α la méthode x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + α(b − Ax⁽ᵏ⁾) converge-t-elle pour tout x⁽⁰⁾ ?`,
    right: `0 < α < ${q(2, l2)}`,
    wrongs: [{ html: `0 < α < ${q(2, l1)}`, rule: 'n_gradient_step_bound' }, { html: `0 < α < ${q(1, l2)}`, rule: 'n_gradient_step_bound' }],
    fillers: [{ html: 'tout α > 0, puisque A est SDP' }, { html: `α > ${q(2, l2)}` }],
    solution: [{ html: `L'erreur est multipliée par I − αA : il faut |1 − αλ| < 1 pour λ = ${l1} et λ = ${l2}, soit 0 < α < 2/λ_max = ${q(2, l2)}.`, note: '' }],
  }, rng);
}

// L3: choose the step and the sign.
function level3(rng) {
  const d = data(rng);
  const r0 = rowVec(d.rows[0], 'r');
  const a0 = d.rows[0].alpha;
  const x1 = rowVec(d.rows[1], 'x');
  const rr = qv(r0).reduce((s, x) => s.add(x.mul(x)), new Q(0));
  const rAr = qv(r0).reduce((s, x, i) => s.add(x.mul(ArQ(d, r0)[i])), new Q(0));
  const script = [
    { kind: 'decision', prompt: 'Quel est le pas optimal ?', options: rng.shuffle([
      { id: 'ok', label: 'α₀ = (r·r)/(r·Ar)', valid: true, ref: true },
      { id: 'inv', label: 'α₀ = (r·Ar)/(r·r)', valid: false, rule: 'n_optimal_step_inverted', why: 'α minimise Φ(x + αr) = ½α²(r·Ar) − α(r·r) + cste : α = (r·r)/(r·Ar).' },
      { id: 'one', label: 'α₀ = 1', valid: false, why: 'Un pas fixe arbitraire peut diverger ; le pas optimal se calcule.' },
    ]) },
    { kind: 'eq', math: String(a0), note: `r⁽⁰⁾·r⁽⁰⁾ = ${rr}, r⁽⁰⁾·Ar⁽⁰⁾ = ${R(rAr)}, α₀ = ${rr}/${R(rAr)}`, subgoal: 'step' },
    { kind: 'segment', html: 'Le nouvel itéré.', ask: 'x⁽¹⁾ =', start: { math: 'x_1' }, judge: { kind: 'mat', expect: vt(x1), menu: [{ id: 'plus', label: 'x⁽⁰⁾ + α₀r⁽⁰⁾', valid: true }, { id: 'minus', label: 'x⁽⁰⁾ − α₀r⁽⁰⁾', valid: false, why: 'r = b − Ax = −∇Φ : on descend dans le sens de r.' }] } },
    { kind: 'decision', prompt: 'Dans quel sens avance-t-on ?', options: rng.shuffle([
      { id: 'plus', label: 'x⁽¹⁾ = x⁽⁰⁾ + α₀r⁽⁰⁾', valid: true, ref: true },
      { id: 'minus', label: 'x⁽¹⁾ = x⁽⁰⁾ − α₀r⁽⁰⁾', valid: false, rule: 'n_gradient_sign', why: 'r = b − Ax = −∇Φ(x) : la descente se fait dans le sens de r.' },
    ]) },
    { kind: 'eq', math: vt(x1), note: `${fmt(a0)}·${vR(r0)}`, subgoal: 'update' },
  ];
  return linesItem({
    skill: GR, level: 3, mode: 'tap', tapActions: 'menu', keys: ['calc', 'greek'],
    prompt: `Gradient pour Ax = b, A = ${MLm(d.A)}, b = ${vR(d.b)}, x⁽⁰⁾ = 0. On a r⁽⁰⁾ = ${vR(r0)} et Ar⁽⁰⁾ = ${vR(ArQ(d, r0))}. Calcule le pas optimal α₀, puis x⁽¹⁾. Choisis d'abord chaque action.`,
    start: 'α_0', judge: { kind: 'value', expect: String(a0), form: 'irreducible', menu: [{ id: 'opt', label: 'Calculer le pas optimal', valid: true }, { id: 'x', label: 'Calculer x⁽¹⁾', valid: false, why: 'Il faut d\'abord le pas.' }] },
    script,
    hints: H('α₀ = (r·r)/(r·Ar) ; puis x⁽¹⁾ = x⁽⁰⁾ + α₀r⁽⁰⁾.', `α₀ = ${rr}/□`, `α₀ = ${fmt(a0)}, x⁽¹⁾ = ${vR(x1)}.`),
    subgoals: SUB, key: `${GR}:3:${mt(d.A)}:${d.b}`, baits: ['n_optimal_step_inverted', 'n_gradient_sign'], fallback: d.fallback,
  });
}

// ---------- the programs ----------

export const GR_CODE = refCode(`def gradient(A, b, x0, tol, nmax):
    x = x0
    for k in range(nmax):
        Ax = matvec(A, x)
        r = zeros(len(b))
        for i in range(len(b)):
            r[i] = «b[i] - Ax[i]»
        if norm(r) <= tol * norm(b):
            return [x, k]
        Ar = matvec(A, r)
        alpha = «dot(r, r) / dot(r, Ar)»
        for i in range(len(b)):
            x[i] = «x[i] + alpha * r[i]»
    return [x, nmax]

def gradient_fixed(A, b, x0, alpha, nsteps):
    x = x0
    for k in range(nsteps):
        Ax = matvec(A, x)
        for i in range(len(b)):
            x[i] = «x[i] - alpha * (Ax[i] - b[i])»
    return x
`);
const SETUP = 'A = [[2, -1], [-1, 2]]';
const GR_TESTS = [
  { setup: SETUP, expr: 'gradient(A, [1.0, 0.0], [0.0, 0.0], 1e-10, 1000)[0]', expect: '[0.6666666667, 0.3333333333]', tol: 1e-8 },
  { setup: SETUP, expr: 'gradient(A, [1.0, 0.0], [0.0, 0.0], 0.0, 2)[0]', expect: '[0.5, 0.25]', tol: 1e-12 },
  { setup: SETUP, expr: 'gradient_fixed(A, [1.0, 0.0], [0.0, 0.0], 0.5, 2)', expect: '[0.5, 0.25]', tol: 1e-12 },
  { setup: SETUP, expr: 'abs(gradient_fixed(A, [1.0, 0.0], [0.0, 0.0], 0.7, 60)[0]) > 10', expect: 'True' },
];
const GR_TRAPS = {
  0: [{ text: 'Ax[i] - b[i]', rule: 'n_gradient_sign' }],
  1: [{ text: 'dot(r, Ar) / dot(r, r)', rule: 'n_optimal_step_inverted' }],
  2: [{ text: 'x[i] - alpha * r[i]', rule: 'n_gradient_sign' }],
  3: [{ text: 'x[i] + alpha * (Ax[i] - b[i])', rule: 'n_gradient_sign' }],
};

function fixedErrors() {
  const A = [[2, -1], [-1, 2]];
  const b = [1, 0];
  const sol = [2 / 3, 1 / 3];
  const run = (alpha, n) => {
    let x = [0, 0];
    for (let k = 0; k < n; k++) { const Ax = A.map((r) => r[0] * x[0] + r[1] * x[1]); x = x.map((xi, i) => xi - alpha * (Ax[i] - b[i])); }
    return Math.max(...x.map((xi, i) => Math.abs(xi - sol[i])));
  };
  const alphas = [0.5, 0.6, 0.65, 0.7];
  return { columns: ['α', 'erreur après 10 pas', 'après 20 pas', 'après 40 pas'], rows: alphas.map((a) => [String(a).replace('.', ','), expText(run(a, 10), 3), expText(run(a, 20), 3), expText(run(a, 40), 3)]) };
}

function codeLevel(rng, level) {
  const then = readtableItem({
    skill: GR, level, key: 'fixed',
    prompt: 'gradient_fixed, appelé pour A = [[2, −1], [−1, 2]] (valeurs propres 1 et 3), b = (1 ; 0), x⁽⁰⁾ = 0, donne l\'erreur ‖x⁽ᵏ⁾ − x‖∞ :',
    table: fixedErrors(),
    question: multiMcq({
      skill: GR, level, key: `${GR}:fixed`, prompt: 'Que peut-on en déduire ?',
      options: [
        { html: 'Pour α = 0,7 > 2/3 = 2/λ_max, la méthode diverge', correct: true },
        { html: 'Parmi ces pas, α = 0,5 converge le plus vite : le facteur max|1 − αλᵢ| vaut 1/2', correct: true },
        { html: 'Plus le pas est grand, plus la méthode converge vite', correct: false },
        { html: 'Il faut α < 2/λ_min = 2 pour converger', correct: false, rule: 'n_gradient_step_bound' },
      ],
      solution: [{ html: 'Le facteur de réduction est max(|1 − α|, |1 − 3α|) : 0,5 pour α = 0,5 ; 0,8 pour 0,6 ; 0,95 pour 0,65 ; 1,1 pour 0,7 (> 1 : divergence).', note: '' }],
    }, rng),
  });
  return codeItem({
    skill: GR, level, ref: GR_CODE, blanks: [0, 1, 2, 3], traps: GR_TRAPS, preludes: ['vec', 'mat'], rng,
    prompt: 'Complète la méthode du gradient à pas optimal (arrêt sur le résidu relatif), puis la version à pas fixe α.',
    tests: GR_TESTS, then, hints: [], subgoals: SUB, key: 'grad',
  });
}

// ---------- exam ----------

const PROOF2 = [
  ['b0', 'x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αr⁽ᵏ⁾ = x⁽ᵏ⁾ + α(b − Ax⁽ᵏ⁾).'],
  ['b1', 'Comme Ax = b, on a b − Ax⁽ᵏ⁾ = A(x − x⁽ᵏ⁾).'],
  ['b2', 'Donc x − x⁽ᵏ⁺¹⁾ = x − x⁽ᵏ⁾ − αA(x − x⁽ᵏ⁾) = (I − αA)(x − x⁽ᵏ⁾).'],
];
const PROOF3 = [
  ['c0', 'A est SDP : elle a une base orthonormée de vecteurs propres v₁, …, vₙ, avec 0 < λ₁ ≤ … ≤ λₙ.'],
  ['c1', 'Si e⁽ᵏ⁾ = x − x⁽ᵏ⁾ = Σ cᵢvᵢ, alors e⁽ᵏ⁺¹⁾ = (I − αA)e⁽ᵏ⁾ = Σ (1 − αλᵢ)cᵢvᵢ.'],
  ['c2', '‖e⁽ᵏ⁺¹⁾‖² = Σ (1 − αλᵢ)²cᵢ² ≤ maxᵢ (1 − αλᵢ)²·‖e⁽ᵏ⁾‖².'],
  ['c3', 'Si 0 < α < 2/λₙ, alors |1 − αλᵢ| < 1 pour tout i : l\'erreur tend vers 0.'],
];
function chain(pairs, extra, prompt, level, rng) {
  const ids = pairs.map(([id]) => id);
  const blocks = pairs.map(([id, html], i) => ({ id, html, needs: i ? [ids[i - 1]] : [] }));
  blocks.push(extra);
  return blocksItem({
    skill: GR, level, mode: 'order', prompt, blocks: rng.shuffle(blocks), goal: ids.at(-1), order: ids, placed: [], noHints: true, hints: [],
    subgoals: SUB, key: `proof:${ids[0]}`, expectedSec: 150,
  });
}

function openItem(rng, opts) {
  const d = data(rng);
  const p1 = mcq({
    skill: GR, level: 4, key: `${GR}:open:grad`,
    prompt: 'Soit A SDP et f(v) = ½vᵀAv − bᵀv. Le minimum x de f vérifie :',
    options: [
      { html: '∇f(x) = Ax − b = 0, donc Ax = b', correct: true },
      { html: '∇f(x) = ½Ax − b = 0', correct: false, rule: 'm_grad_factor' },
      { html: '∇f(x) = 2Ax − b = 0', correct: false, rule: 'm_grad_factor' },
      { html: 'f(x) = 0', correct: false },
    ],
    solution: [{ html: '∇(½vᵀAv) = Av pour A symétrique, ∇(bᵀv) = b : ∇f(x) = Ax − b, nul au minimum.', note: '' }],
  }, rng);
  const p2 = chain(PROOF2, { id: 'd2', html: 'x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − α(b − Ax⁽ᵏ⁾).', needs: [], distractor: 'n_gradient_sign', why: 'r = b − Ax = −∇f : on avance dans le sens de r.' },
    'Montre que x − x⁽ᵏ⁺¹⁾ = (I − αA)(x − x⁽ᵏ⁾) pour le pas fixe α. Touche les blocs dans l\'ordre.', 4, rng);
  const p3 = chain(PROOF3, { id: 'd3', html: '‖I − αA‖ ≤ 1 − α, donc la méthode converge pour tout α > 0.', needs: [], distractor: 'n_gradient_step_bound', why: 'Faux : pour α > 2/λₙ, |1 − αλₙ| > 1.' },
    'Montre que la méthode à pas fixe converge si 0 < α < 2/λₙ. Touche les blocs dans l\'ordre.', 4, rng);
  const amax = new Q(2, d.l[1]);
  const p4 = linesItem({
    skill: GR, level: 4, mode: 'free', keys: ['calc'], noHints: true,
    prompt: `Application : A = ${MLm(d.A)} a pour valeurs propres ${d.l[0]} et ${d.l[1]}. Donne la borne α_max telle que la méthode converge pour 0 < α < α_max.`,
    start: 'α_max', judge: { kind: 'value', expect: String(amax), form: 'irreducible' },
    script: [{ kind: 'eq', math: String(amax), note: `2/λ_max = 2/${d.l[1]}`, subgoal: 'fixed' }],
    subgoals: SUB, key: `${GR}:open:amax:${mt(d.A)}`,
  });
  return problemItem({
    skill: GR, level: 4, key: `open:${mt(d.A)}`, exam: examTag(opts, 7),
    prompt: 'Méthode du gradient à pas fixe pour Ax = b, A symétrique définie positive : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + α(b − Ax⁽ᵏ⁾) (examen 2021, question ouverte 2).',
    parts: [{ item: p1, points: 1.5, title: '(a) Le minimum de f' }, { item: p2, points: 2.5, title: '(b) L\'équation de l\'erreur' }, { item: p3, points: 2, title: '(c) La convergence' }, { item: p4, points: 1, title: '(d) Application' }],
    fallback: d.fallback,
  });
}

function examTf(rng, opts) {
  const tag = examTag(opts);
  const k = rng.int(0, 2);
  if (k === 0) {
    const d = data(rng);
    return tfItem({
      skill: GR, level: 4, key: `finite:${mt(d.A)}:${d.b}`, exam: tag,
      statement: 'Pour A symétrique définie positive n × n, la méthode du gradient à pas optimal atteint la solution de Ax = b en au plus n itérations.',
      truth: false,
      counter: { kind: 'num', prop: 'gradientNotFinite', params: {}, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }, { v: 'b', label: 'b =' }], answer: { A: mt(d.A), b: `[${d.b.join(', ')}]` } },
      explanation: `Faux : c'est le gradient conjugué qui finit en n pas. Pour A = ${MLm(d.A)}, b = ${vR(d.b)}, x⁽²⁾ = ${vR(rowVec(d.rows[2], 'x'))} n'est pas encore la solution.`,
    });
  }
  if (k === 1) return vfMcq({ skill: GR, key: `${GR}:tf:alpha`, exam: tag, statement: 'Si A est symétrique définie positive, le gradient à pas fixe converge pour tout pas α > 0.', truth: false, ruleIfTrue: 'n_gradient_step_bound', explanation: 'Faux : il faut 0 < α < 2/λ_max ; sinon |1 − αλ_max| > 1 et l\'erreur explose.' }, rng);
  return vfMcq({ skill: GR, key: `${GR}:tf:opt`, exam: tag, statement: 'Le pas optimal αₖ = (r·r)/(r·Ar) minimise α ↦ Φ(x⁽ᵏ⁾ + αr⁽ᵏ⁾).', truth: true, ruleIfFalse: 'n_optimal_step_inverted', explanation: 'Vrai : Φ(x + αr) = Φ(x) − α(r·r) + ½α²(r·Ar), minimal pour α = (r·r)/(r·Ar).' }, rng);
}

export const GEN = {
  [GR]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'open') return openItem(rng, opts);
    if (opts.exam === 'mcq') return stepMcq(rng, data(rng), 4, examTag(opts));
    if (opts.exam === 'tf') return examTf(rng, opts);
    if (level === 3) return level3(rng);
    if (level === 5) return codeLevel(rng, 5);
    return table(rng, level);
  },
};

export { blankBy, ML, Ar };

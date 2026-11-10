// n-ode-implicit-newton (module N, part g, step U9): Euler rétrograde on a
// non-linear system, one Newton step from x⁽⁰⁾ = uⁿ. Catalogue:
// docs/universite/N-analyse-numerique.md, n-ode-implicit-newton (exam 2019).
//
// System u₁′ = −g(u₂)u₁, u₂′ = −g(u₁)u₂, g ∈ {u², 1 + u², u⁴}; uⁿ ∈ {(1 ; 1),
// (1 ; 2)}; h ∈ {1/10, 1/2, 1}. The unknowns x = uⁿ⁺¹ are written (x ; y):
// f₁ = x − u₁ⁿ + h·g(y)·x, f₂ = y − u₂ⁿ + h·g(x)·y; J = [[1 + h·g(y),
// h·g′(y)·x], [h·g′(x)·y, 1 + h·g(x)]]; J(uⁿ)·δ = F(uⁿ), x¹ = uⁿ − δ, kept
// when its denominators are ≤ 50.
// L1 J (cells to fill) and x¹ (cells), f given; L2 f₁ and f₂ to write
// (equiv), then J and x¹; L3 choose the system (the 3 options of 2019),
// then J and x¹; L4 J, F(uⁿ) and x¹ free; L5 the program, then the energy
// statements of 2019 (several answers).
// Exam: mcq (the pair (a, b) of the program, 2019 question 5; or the
// system, question 4); tf (energy statements, or x¹ = uⁿ + δ).

import { Q } from '../../math/rational.js';
import { linesItem, mcq, examTag } from './kit.js';
import { mcqDistinct, withCells } from './alglin-kit.js';
import { refCode, codeItem, readtableItem, multiMcq, vfMcq, H, blankBy } from './numerique-kit.js';
import { R, nice } from './numerique-g-kit.js';

const IN = 'n-ode-implicit-newton';
const SUB = [
  { id: 'system', label: 'le système du schéma implicite', skill: 'n-ode-euler' },
  { id: 'jacobian', label: 'la jacobienne', skill: 'n-newton-system' },
  { id: 'evaluate', label: 'évaluer en x⁽⁰⁾ = uⁿ', skill: IN },
  { id: 'solve', label: 'résoudre J·δ = F', skill: 'n-newton-system' },
];
const KEYS = ['calc', 'greek'];

const GS = {
  sq: { show: (v) => `${v}²`, text: (v) => `${v}^2`, g: (v) => v.mul(v), dg: (v) => v.mul(2), name: 'u²' },
  one: { show: (v) => `(1 + ${v}²)`, text: (v) => `(1+${v}^2)`, g: (v) => v.mul(v).add(1), dg: (v) => v.mul(2), name: '1 + u²' },
  four: { show: (v) => `${v}⁴`, text: (v) => `${v}^4`, g: (v) => v.pow(4), dg: (v) => v.pow(3).mul(4), name: 'u⁴' },
};
const qs = (x) => String(x);
const mt = (M) => `[[${M[0].map(qs).join(',')}],[${M[1].map(qs).join(',')}]]`;
const vt = (v) => `(${v.map(qs).join(' ; ')})`;
const vR = (v) => R(`(${v.map(qs).join(' ; ')})`);
const mR = (M) => R(`[[${M[0].map(qs).join(', ')}], [${M[1].map(qs).join(', ')}]]`);

function data(rng, { only } = {}) {
  for (let t = 0; t < 100; t++) {
    const gk = only || rng.pick(['sq', 'sq', 'one', 'four']);
    const G = GS[gk];
    const [u1, u2] = rng.pick([[1, 1], [1, 2], [2, 1]]).map((x) => new Q(x));
    const h = rng.pick([new Q(1, 10), new Q(1, 2), new Q(1)]);
    const J = [[h.mul(G.g(u2)).add(1), h.mul(G.dg(u2)).mul(u1)], [h.mul(G.dg(u1)).mul(u2), h.mul(G.g(u1)).add(1)]];
    const F = [h.mul(G.g(u2)).mul(u1), h.mul(G.g(u1)).mul(u2)];
    const det = J[0][0].mul(J[1][1]).sub(J[0][1].mul(J[1][0]));
    if (det.n === 0) continue;
    const d = [J[1][1].mul(F[0]).sub(J[0][1].mul(F[1])).div(det), J[0][0].mul(F[1]).sub(J[1][0].mul(F[0])).div(det)];
    const x1 = [u1.sub(d[0]), u2.sub(d[1])];
    if (x1.some((x) => x.d > 50) || d.some((x) => x.d > 50)) continue;
    return { gk, G, u1, u2, h, J, F, delta: d, x1 };
  }
  const G = GS.sq;
  const [u1, u2, h] = [new Q(1), new Q(1), new Q(1, 10)];
  return { gk: 'sq', G, u1, u2, h, J: [[new Q(11, 10), new Q(1, 5)], [new Q(1, 5), new Q(11, 10)]], F: [new Q(1, 10), new Q(1, 10)], delta: [new Q(1, 13), new Q(1, 13)], x1: [new Q(12, 13), new Q(12, 13)], fallback: true };
}

const sysShow = (d) => `u₁′ = −${d.G.show('u₂')}·u₁, u₂′ = −${d.G.show('u₁')}·u₂`;
const f1Text = (d) => `x-${d.u1}+${d.h}×${d.G.text('y')}×x`;
const f2Text = (d) => `y-${d.u2}+${d.h}×${d.G.text('x')}×y`;
const f1Show = (d) => `f₁(x, y) = x − ${d.u1} + ${nice(d.h)}·${d.G.show('y')}·x`;
const f2Show = (d) => `f₂(x, y) = y − ${d.u2} + ${nice(d.h)}·${d.G.show('x')}·y`;
const intro = (d) => `Euler rétrograde pour ${sysShow(d)}, avec h = ${nice(d.h)} et uⁿ = ${vR([d.u1, d.u2])}. Les inconnues x = (x ; y) = uⁿ⁺¹ vérifient f(x) = 0, résolu par un pas de Newton depuis x⁽⁰⁾ = uⁿ.`;

// The parts J, F, x¹ (mat judge), with grid cells to fill when guided.
function parts(d, { guided = false, withF = false } = {}) {
  const out = [
    { kind: 'segment', html: `La jacobienne de f en x⁽⁰⁾ = ${vR([d.u1, d.u2])} :`, ask: 'J =', start: { math: 'J' }, judge: { kind: 'mat', expect: mt(d.J) } },
    guided ? withCells({ kind: 'eq', math: mt(d.J), note: '∂fᵢ/∂x, ∂fᵢ/∂y, évaluées en uⁿ', subgoal: 'jacobian' }, [[0, 0], [0, 1]]) : { kind: 'eq', math: mt(d.J), note: '∂fᵢ/∂x, ∂fᵢ/∂y, évaluées en uⁿ', subgoal: 'jacobian' },
  ];
  if (withF) {
    out.push(
      { kind: 'segment', html: 'F(x⁽⁰⁾) = (f₁(uⁿ) ; f₂(uⁿ)) :', ask: 'F =', start: { math: 'F' }, judge: { kind: 'mat', expect: vt(d.F) } },
      { kind: 'eq', math: vt(d.F), note: 'x = uⁿ : il reste h·g(·)·uᵢⁿ', subgoal: 'evaluate' },
    );
  }
  out.push(
    { kind: 'segment', html: 'Résous J·δ = F, puis x⁽¹⁾ = x⁽⁰⁾ − δ :', ask: 'x⁽¹⁾ =', start: { math: 'x' }, judge: { kind: 'mat', expect: vt(d.x1) } },
    guided ? withCells({ kind: 'eq', math: vt(d.x1), note: `δ = ${vR(d.delta)}`, subgoal: 'solve' }, [[0, 0]]) : { kind: 'eq', math: vt(d.x1), note: `δ = ${vR(d.delta)}`, subgoal: 'solve' },
  );
  return out;
}

function hintsOf(d) {
  return H('Ligne i de J : les dérivées de fᵢ par rapport à x, puis à y, en x⁽⁰⁾ = uⁿ.',
    `J = [[1 + ${nice(d.h)}·g(${d.u2}), □], [□, 1 + ${nice(d.h)}·g(${d.u1})]]`,
    `J = ${mR(d.J)}, δ = ${vR(d.delta)}, x⁽¹⁾ = ${vR(d.x1)}.`);
}

function linesLevel(rng, level) {
  const d = data(rng);
  const mode = { 1: 'guided', 2: 'guided', 3: 'tap', 4: 'free' }[level];
  const all = parts(d, { guided: level <= 2, withF: level === 4 });
  let start;
  let judge;
  let script;
  if (level === 2) {
    start = `x-${d.u1}-${d.h}×(-${d.G.text('y')}×x)`;
    judge = { kind: 'equiv', vars: ['x', 'y'] };
    const l1 = f1Text(d);
    script = [
      { kind: 'note', html: 'Le schéma : x = u₁ⁿ + h·(−g(y)·x), donc f₁(x, y) = x − u₁ⁿ − h·(−g(y)·x).' },
      { kind: 'eq', math: l1, ...blankBy(l1, [`${d.h}×${d.G.text('y')}×x`]), note: 'f₁ simplifiée', subgoal: 'system' },
      { kind: 'segment', html: 'De même, f₂ :', ask: 'f₂ =', start: { math: `y-${d.u2}-${d.h}×(-${d.G.text('x')}×y)` }, judge: { kind: 'equiv', vars: ['x', 'y'] } },
      { kind: 'eq', math: f2Text(d), ...blankBy(f2Text(d), [`${d.h}×${d.G.text('x')}×y`]), note: 'f₂ simplifiée', subgoal: 'system' },
      ...all,
    ];
  } else {
    const [first, ...rest] = all;
    start = first.start.math;
    judge = first.judge;
    script = [{ kind: 'note', html: `${f1Show(d)} ; ${f2Show(d)}.` }];
    if (level === 3) {
      script.push({
        kind: 'decision', prompt: 'Quel système résout-on à chaque pas d\'Euler rétrograde ?', options: rng.shuffle([
          { id: 'ok', label: `${f1Show(d)}, ${f2Show(d)}`, valid: true, ref: true },
          { id: 'mix', label: `f₁(x, y) = x − ${d.u1} + ${nice(d.h)}·${d.G.show(`${d.u2}`)}·x, f₂(x, y) = y − ${d.u2} + ${nice(d.h)}·${d.G.show(`${d.u1}`)}·y`, valid: false, rule: 'n_implicit_as_explicit', why: 'Les termes non linéaires doivent porter sur les inconnues x et y (le nouveau point), pas sur uⁿ.' },
          { id: 'new', label: 'f₁ = u₁ⁿ⁺¹ − u₁ⁿ + h·(u₂ⁿ⁺¹)²u₁ⁿ⁺¹, écrit en uⁿ⁺¹ sans inconnues nommées', valid: false, why: 'C\'est le schéma, mais Newton demande une fonction des inconnues (x, y) pour la dériver.' },
        ]),
      });
    }
    script.push({ kind: 'note', html: first.html }, ...rest);
  }
  return linesItem({
    skill: IN, level, mode, keys: KEYS,
    prompt: `${intro(d)}${level === 2 ? ' Écris f₁ et f₂, puis fais le pas de Newton.' : ''}`,
    start, judge, script,
    hints: hintsOf(d),
    subgoals: SUB, key: `${IN}:${level}:${d.gk}:${d.u1}${d.u2}:${d.h}`, baits: level === 3 ? ['n_implicit_as_explicit'] : [], fallback: d.fallback,
  });
}

// ---------- L5: the program ----------

const STEP = refCode(`def be_newton_step(u1, u2, h):
    # un pas de Newton pour le schema d'Euler retrograde, depuis x = u^n
    x1 = u1
    x2 = u2
    F1 = «x1 - u1 + h * x2 * x2 * x1»
    F2 = «x2 - u2 + h * x1 * x1 * x2»
    a = «1 + h * x2 * x2»
    b = «2 * h * x1 * x2»
    c = 2 * h * x1 * x2
    d = 1 + h * x1 * x1
    delta = solve([[a, b], [c, d]], [F1, F2])
    return [«x1 - delta[0]», x2 - delta[1]]
`);
const TRAPS = { 4: [{ text: 'x1 + delta[0]', rule: 'n_newton_sys_sign' }] };
const TESTS = [
  { expr: 'be_newton_step(1.0, 1.0, 0.1)', expect: '[0.9230769230769231, 0.9230769230769231]', tol: 1e-12 },
  { expr: 'be_newton_step(1.0, 1.0, 0.5)', expect: '[0.8, 0.8]', tol: 1e-12 },
  { expr: 'be_newton_step(2.0, 1.0, 0.5)', expect: '[4.0, -1.0]', tol: 1e-12 },
  { expr: 'be_newton_step(1.0, 2.0, 0.5)', expect: '[-1.0, 4.0]', tol: 1e-12 },
];

function energy(rng, level) {
  return multiMcq({
    skill: IN, level, key: `${IN}:energy`,
    prompt: 'Pour la solution exacte de u₁′ = −u₂²u₁, u₂′ = −u₁²u₂ :',
    options: [
      { html: '½·d/dt(u₁² + u₂²) + 2u₁²u₂² = 0', correct: true },
      { html: 'u₁(1)² + u₂(1)² ≤ u₁(0)² + u₂(0)²', correct: true },
      { html: 'u₁² + u₂² est constante', correct: false },
      { html: 'u₁(t)² + u₂(t)² croît avec t', correct: false },
    ],
    solution: [{ html: 'u₁u₁′ + u₂u₂′ = −u₁²u₂² − u₁²u₂² = −2u₁²u₂² ≤ 0 : l\'énergie ½(u₁² + u₂²) décroît.', note: '' }],
  }, rng);
}

function level5(rng) {
  return codeItem({
    skill: IN, level: 5, ref: STEP, blanks: [0, 1, 2, 3, 4], traps: TRAPS, wrong: { 3: 'h * x1 * x2', 2: '1 - h * x2 * x2' }, rng,
    prompt: 'Complète un pas de Newton pour Euler rétrograde sur u₁′ = −u₂²u₁, u₂′ = −u₁²u₂ (les inconnues x1, x2 partent de uⁿ). solve(A, b) résout Ax = b.',
    preludes: ['vec', 'mat'], tests: TESTS,
    then: readtableItem({ skill: IN, level: 5, key: 'energy', prompt: 'Une propriété du problème exact :', table: null, question: energy(rng, 5) }),
    hints: [], subgoals: SUB, key: '5',
  });
}

// ---------- exam ----------

function examMcq(rng, opts) {
  if (rng.chance(0.5)) {
    const d = data(rng);
    const a = d.J[0][0];
    const b = d.J[0][1];
    const pair = (x, y) => `a = ${nice(x)}, b = ${nice(y)}`;
    return mcqDistinct({
      skill: IN, level: 4, key: `${IN}:mcq:ab:${d.gk}:${d.u1}${d.u2}:${d.h}`, exam: examTag(opts),
      prompt: `${intro(d)} La jacobienne en x⁽⁰⁾ est J = [[a, b], [c, d]]. Que valent a et b ?`,
      right: pair(a, b),
      wrongs: [
        { html: pair(new Q(2).sub(a), b.neg()) },
        { html: pair(a, d.J[1][0]), rule: b.eq(d.J[1][0]) ? null : 'a2_jacobian_transposed' },
        { html: pair(a, b.div(2)) },
        { html: pair(a.add(d.h), b) },
      ],
      solution: [{ html: `a = ∂f₁/∂x = 1 + h·g(y), b = ∂f₁/∂y = h·g′(y)·x, en (x ; y) = uⁿ : J = ${mR(d.J)}.`, note: '' }],
    }, rng);
  }
  const d = data(rng);
  return mcq({
    skill: IN, level: 4, key: `${IN}:mcq:sys:${d.gk}:${d.u1}${d.u2}`, exam: examTag(opts),
    prompt: `Euler rétrograde pour ${sysShow(d)}, h = ${nice(d.h)}, uⁿ = ${vR([d.u1, d.u2])}. Les inconnues (x ; y) = uⁿ⁺¹ vérifient f(x, y) = 0 avec`,
    options: [
      { html: `${f1Show(d)}, ${f2Show(d)}`, correct: true },
      { html: `f₁(x, y) = x − ${d.u1} + ${nice(d.h)}·${d.G.show(`${d.u2}`)}·x, f₂(x, y) = y − ${d.u2} + ${nice(d.h)}·${d.G.show(`${d.u1}`)}·y`, correct: false, rule: 'n_implicit_as_explicit' },
      { html: `f₁(x, y) = x − ${d.u1} − ${nice(d.h)}·${d.G.show('y')}·x, f₂(x, y) = y − ${d.u2} − ${nice(d.h)}·${d.G.show('x')}·y`, correct: false },
      { html: `f₁(x, y) = x − ${d.u1} + ${nice(d.h)}·${d.G.show('x')}·y, f₂(x, y) = y − ${d.u2} + ${nice(d.h)}·${d.G.show('y')}·x`, correct: false },
    ],
    solution: [{ html: 'x = uⁿ + h·(−g(y)·x) : f₁ = x − u₁ⁿ + h·g(y)·x, et de même f₂.', note: '' }],
  }, rng);
}

function examTf(rng, opts) {
  if (rng.chance(0.5)) {
    return vfMcq({
      skill: IN, key: `${IN}:tf:sign`, exam: examTag(opts), truth: false, ruleIfTrue: 'n_newton_sys_sign',
      statement: 'Dans le pas de Newton du schéma implicite, si J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), alors x⁽¹⁾ = x⁽⁰⁾ + δ.',
      explanation: 'Faux : DF(x⁽⁰⁾)(x⁽⁰⁾ − x⁽¹⁾) = F(x⁽⁰⁾), donc x⁽¹⁾ = x⁽⁰⁾ − δ.',
    }, rng);
  }
  const k = rng.int(0, 1);
  return vfMcq({
    skill: IN, key: `${IN}:tf:energy:${k}`, exam: examTag(opts), truth: true,
    statement: k ? 'La solution exacte de u₁′ = −u₂²u₁, u₂′ = −u₁²u₂ vérifie ½·d/dt(u₁² + u₂²) + 2u₁²u₂² = 0.' : 'La solution exacte de u₁′ = −u₂²u₁, u₂′ = −u₁²u₂ vérifie u₁(1)² + u₂(1)² ≤ u₁(0)² + u₂(0)².',
    explanation: 'Vrai : u₁u₁′ + u₂u₂′ = −2u₁²u₂² ≤ 0, l\'énergie décroît.',
  }, rng);
}

export const GEN = {
  [IN]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return examMcq(rng, opts);
    if (opts.exam === 'tf') return examTf(rng, opts);
    if (level >= 5) return level5(rng);
    return linesLevel(rng, level);
  },
};

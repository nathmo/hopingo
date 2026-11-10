// n-newton-system (module N, part b, step U9): Newton for a system of two
// equations, the Jacobian by hand. Catalogue:
// docs/universite/N-analyse-numerique.md, n-newton-system.
//
// Data, from the solution (p ; q) (whole numbers): F₁ ∈ {x² + y² − (p² + q²),
// xy − pq, x² − y − (p² − q)}, F₂ = ax + by − (ap + bq), a, b ∈ {−2, …, 2};
// x⁽⁰⁾ at distance 1 of (p ; q); det J(x⁽⁰⁾) ∈ {±1, ±2, ±4, ±8} and δ with
// denominators ≤ 8. Convention of the exams: J(x⁽ᵏ⁾)·δ = F(x⁽ᵏ⁾), then
// x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − δ. The parts are judged by `mat` (J in x and y, then
// numbers; F(x⁽⁰⁾), δ, x⁽¹⁾ as vectors), cells of the grid in guided mode.
// L1 J with blanks, F(x⁽⁰⁾) given; L2 J and F, δ, x⁽¹⁾ (decisions: solve
// or invert, x − δ or x + δ); L3 the same, choosing each action; L4 one
// free step; L5 the program newton_sys, then its increments to read.
// Exam: mcq (J(x⁽⁰⁾), with its transpose as a distractor), coef (the first
// entry of x⁽¹⁾).

import { Q } from '../../math/rational.js';
import { mcq, examTag } from './kit.js';
import { partsItem } from './geo-kit.js';
import { coefItem, ML } from './alglin-kit.js';
import { refCode, codeItem, readtableItem, multiMcq, expText, H, fmt } from './numerique-kit.js';

export const NS = 'n-newton-system';
const SUB = [
  { id: 'jacobian', label: 'la jacobienne', skill: 'a2-partials' },
  { id: 'evaluate', label: 'J et F en x⁽⁰⁾', skill: NS },
  { id: 'solve', label: 'résoudre J·δ = F', skill: 'l-sys-echelon' },
  { id: 'update', label: 'x⁽¹⁾ = x⁽⁰⁾ − δ', skill: NS },
  { id: 'newton', label: 'l\'itération de Newton', skill: 'n-newton' },
];
const KEYS = ['calc', 'mat'];

const q = (n, d = 1) => new Q(n, d);
const sgn = (k) => (k < 0 ? `-${-k}` : `+${k}`);
const vt = (v) => `(${v.map(String).join(' ; ')})`;
const mt = (M) => `[${M.map((r) => `[${r.map(String).join(',')}]`).join(',')}]`;
const vR = (v) => vt(v).replace(/-/g, '−');
const allCells = (m, n) => { const out = []; for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) out.push([i, j]); return out; };

// a·x + b·y as text (b, a not both 0).
function linT(a, b) {
  const t = [];
  if (a) t.push(`${a === 1 ? '' : a === -1 ? '-' : a}x`);
  if (b) t.push(`${t.length && b > 0 ? '+' : ''}${b === 1 ? '' : b === -1 ? '-' : b}y`);
  return t.join('');
}

const KINDS = {
  circ: (p, q0) => ({ F1: `x^2+y^2${sgn(-(p * p + q0 * q0))}`, R1: `x² + y² − ${p * p + q0 * q0}`, f1: (x, y) => x.mul(x).add(y.mul(y)).sub(p * p + q0 * q0), J1: (x, y) => [x.mul(2), y.mul(2)], J1s: '2x,2y' }),
  prod: (p, q0) => ({ F1: `xy${sgn(-p * q0)}`, R1: `xy ${p * q0 >= 0 ? '−' : '+'} ${Math.abs(p * q0)}`, f1: (x, y) => x.mul(y).sub(p * q0), J1: (x, y) => [y, x], J1s: 'y,x' }),
  parab: (p, q0) => ({ F1: `x^2-y${sgn(-(p * p - q0))}`, R1: `x² − y ${p * p - q0 >= 0 ? '−' : '+'} ${Math.abs(p * p - q0)}`, f1: (x, y) => x.mul(x).sub(y).sub(p * p - q0), J1: (x) => [x.mul(2), q(-1)], J1s: '2x,-1' }),
};

function data(rng) {
  for (let t = 0; t < 300; t++) {
    const kind = rng.pick(['circ', 'circ', 'prod', 'parab']);
    const p = rng.int(-2, 3);
    const q0 = rng.int(-2, 3);
    const a = rng.int(-2, 2);
    const b = rng.int(-2, 2);
    if (!a || !b) continue;
    const K = KINDS[kind](p, q0);
    // The solution must be a simple one: J(p, q) invertible (else Newton
    // loses its order 2, a circle tangent to the line).
    const Js = K.J1(q(p), q(q0));
    if (Js[0].mul(b).sub(Js[1].mul(a)).n === 0) continue;
    const [dx, dy] = rng.pick([[1, 0], [-1, 0], [0, 1], [0, -1]]);
    const x0 = [q(p + dx), q(q0 + dy)];
    const J1 = K.J1(x0[0], x0[1]);
    // xy − pq goes second, so that J starts with a number (y, x would not).
    const swap = kind === 'prod';
    const J = swap ? [[q(a), q(b)], J1] : [J1, [q(a), q(b)]];
    const det = J[0][0].mul(J[1][1]).sub(J[0][1].mul(J[1][0]));
    if (![1, 2, 4, 8].includes(Math.abs(det.valueOf()))) continue;
    const lin0 = q(a).mul(x0[0]).add(q(b).mul(x0[1])).sub(a * p + b * q0);
    const F = swap ? [lin0, K.f1(x0[0], x0[1])] : [K.f1(x0[0], x0[1]), lin0];
    if (F.every((x) => x.n === 0)) continue;
    // Cramer.
    const delta = [F[0].mul(J[1][1]).sub(J[0][1].mul(F[1])).div(det), J[0][0].mul(F[1]).sub(F[0].mul(J[1][0])).div(det)];
    if (delta.some((x) => x.d > 8)) continue;
    const x1 = [x0[0].sub(delta[0]), x0[1].sub(delta[1])];
    const Jsym = swap ? `[[${a},${b}],[${K.J1s}]]` : `[[${K.J1s}],[${a},${b}]]`;
    const F2 = `${linT(a, b)}${sgn(-(a * p + b * q0))}`.replace(/\+0$|-0$/, '');
    return { kind, swap, p, q0, a, b, K, x0, J, F, delta, x1, Jsym, F2, det };
  }
  const K = KINDS.circ(1, 2);
  return { kind: 'circ', p: 1, q0: 2, a: 1, b: -1, K, x0: [q(1), q(1)], J: [[q(2), q(2)], [q(1), q(-1)]], F: [q(-3), q(1)], delta: [q(-1, 4), q(-5, 4)], x1: [q(5, 4), q(9, 4)], Jsym: '[[2x,2y],[1,-1]]', F2: 'x-y+1', det: q(-4), fallback: true };
}

const F2R = (d) => d.F2.replace(/-/g, ' − ').replace(/\+/g, ' + ').replace(/^ − /, '−');
const sysR = (d) => (d.swap ? `F(x, y) = (${F2R(d)} ; ${d.K.R1})` : `F(x, y) = (${d.K.R1} ; ${F2R(d)})`);

// ---------- the lines items ----------

function parts(d, level) {
  const guided = level <= 2;
  const out = [
    {
      start: 'J', judge: { kind: 'mat', vars: ['x', 'y'], expect: d.Jsym },
      notes: level <= 2 ? ['Ligne i : les dérivées de Fᵢ par rapport à x, puis à y.'] : [],
      menu: [
        { id: 'rows', label: 'Ligne i : les dérivées partielles de Fᵢ', valid: true },
        { id: 'cols', label: 'Ligne i : les dérivées par rapport à la i-ème variable', valid: false, rule: 'a2_jacobian_transposed', why: 'J a une ligne par composante de F : la ligne i contient ∂Fᵢ/∂x et ∂Fᵢ/∂y.' },
      ],
      lines: [{ math: d.Jsym, note: 'une ligne par composante, une colonne par variable', subgoal: 'jacobian', cells: guided ? (level === 1 ? [[0, 0], [0, 1]] : allCells(2, 2)) : undefined }],
    },
    {
      html: `En x⁽⁰⁾ = ${vR(d.x0)} :`, ask: `J${vR(d.x0)} =`, start: 'J_0', judge: { kind: 'mat', expect: mt(d.J) },
      menu: [{ id: 'eval', label: 'Remplacer x et y par les coordonnées de x⁽⁰⁾', valid: true }, { id: 'inv', label: 'Calculer J⁻¹', valid: false, why: 'On ne calcule jamais J⁻¹ : on résout un système.' }],
      lines: [{ math: mt(d.J), note: 'on évalue chaque case', subgoal: 'evaluate', cells: guided ? allCells(2, 2) : undefined }],
    },
  ];
  if (level === 1) out[1].notes = [`F${vR(d.x0)} = ${vR(d.F)} (donné).`];
  else {
    out.push({
      html: 'Le second membre :', ask: `F${vR(d.x0)} =`, start: 'F_0', judge: { kind: 'mat', expect: vt(d.F) },
      menu: [{ id: 'F', label: 'Évaluer F en x⁽⁰⁾', valid: true }, { id: 'zero', label: 'Prendre F = 0', valid: false, why: 'F(x⁽⁰⁾) ≠ 0 : c\'est le second membre du système de Newton.' }],
      lines: [{ math: vt(d.F), note: 'F₁ et F₂ en x⁽⁰⁾', subgoal: 'evaluate', cells: guided ? [[0, 0], [1, 0]] : undefined }],
    });
  }
  out.push({
    html: `Le pas : résoudre J${vR(d.x0)}·δ = F${vR(d.x0)}.`, ask: 'δ =', start: 'δ', judge: { kind: 'mat', expect: vt(d.delta) },
    decisions: [{
      kind: 'decision', prompt: 'Comment obtiens-tu δ ?', levels: [2, 3], options: [
        { id: 'solve', label: 'Résoudre le système J·δ = F (Gauss)', valid: true, ref: true },
        { id: 'inv', label: 'Calculer J⁻¹, puis δ = J⁻¹F', valid: true, quality: 'poor', why: 'Juste en 2 × 2, mais le cours ne calcule jamais J⁻¹ : résoudre le système coûte moins cher (et c\'est la seule façon raisonnable en grande dimension).' },
      ],
    }],
    menu: [{ id: 'solve', label: 'Résoudre J·δ = F', valid: true }, { id: 'neg', label: 'Résoudre J·δ = −F', valid: false, why: 'La convention du cours : J·δ = F, puis x − δ.' }],
    lines: [{ math: vt(d.delta), note: `det J = ${fmt(d.det)}`, subgoal: 'solve', cells: guided ? [[0, 0], [1, 0]] : undefined }],
  });
  out.push({
    html: 'La mise à jour :', ask: 'x⁽¹⁾ =', start: 'x_1', judge: { kind: 'mat', expect: vt(d.x1), nsys: { x0: vt(d.x0), delta: vt(d.delta) } },
    decisions: [{
      kind: 'decision', prompt: 'Comment passes-tu de x⁽⁰⁾ à x⁽¹⁾ ?', levels: [2, 3], options: [
        { id: 'minus', label: 'x⁽¹⁾ = x⁽⁰⁾ − δ', valid: true, ref: true },
        { id: 'plus', label: 'x⁽¹⁾ = x⁽⁰⁾ + δ', valid: false, rule: 'n_newton_sys_sign', why: 'Avec J·δ = F(x), Newton retire δ : x⁽¹⁾ = x⁽⁰⁾ − δ.' },
      ],
    }],
    menu: [{ id: 'minus', label: 'Retirer δ', valid: true }, { id: 'plus', label: 'Ajouter δ', valid: false, rule: 'n_newton_sys_sign', why: 'Avec J·δ = F, on retire δ.' }],
    lines: [
      { math: `${vt(d.x0)}-${vt(d.delta)}`, note: 'x⁽⁰⁾ − δ', subgoal: 'update' },
      { math: vt(d.x1), note: 'le nouvel itéré', subgoal: 'update', cells: guided ? [[0, 0], [1, 0]] : undefined },
    ],
  });
  return out;
}

function linesLevel(rng, level) {
  const d = data(rng);
  return partsItem({
    skill: NS, level, parts: parts(d, level), subgoals: SUB, keys: KEYS, key: `${NS}:${level}:${d.Jsym}:${d.x0.join(',')}`, fallback: d.fallback,
    prompt: `Un pas de Newton pour ${sysR(d)} = (0 ; 0), à partir de x⁽⁰⁾ = ${vR(d.x0)} : J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), puis x⁽¹⁾ = x⁽⁰⁾ − δ.${level === 3 ? ' Choisis d\'abord chaque action.' : ''}`,
    hints: H('Ligne i de la jacobienne : les dérivées de Fᵢ par rapport à x, puis à y ; ensuite on résout J·δ = F.',
      `J${vR(d.x0)}·δ = ${vR(d.F)}, puis x⁽¹⁾ = x⁽⁰⁾ − □`,
      `δ = ${vR(d.delta)}, donc x⁽¹⁾ = ${vR(d.x1)}.`),
    baits: level >= 2 ? ['n_newton_sys_sign', 'a2_jacobian_transposed'] : ['a2_jacobian_transposed'],
  });
}

// ---------- L5: the program ----------

const NSYS = refCode(`def newton_sys(F, J, x0, tol, nmax):
    x = [x0[0], x0[1]]
    for k in range(nmax):
        delta = «solve(J(x), F(x))»
        x[0] = «x[0] - delta[0]»
        x[1] = «x[1] - delta[1]»
        if «norm(delta) < tol»:
            return [x[0], x[1], k + 1]
    return [x[0], x[1], nmax]
`);
const SETUP = 'def F(x): return [x[0]**2 + x[1]**2 - 5, x[0] - x[1] + 1]\ndef J(x): return [[2*x[0], 2*x[1]], [1, -1]]';
const TESTS = [
  { setup: SETUP, expr: 'newton_sys(F, J, [1.0, 1.0], 1e-12, 50)', expect: '[1.0, 2.0, 6]', tol: 1e-9 },
  { setup: SETUP, expr: 'newton_sys(F, J, [1.0, 1.0], 1e9, 1)', expect: '[1.25, 2.25, 1]', tol: 1e-12 },
];
const TRAPS = {
  0: [{ text: 'solve(transpose(J(x)), F(x))', rule: 'a2_jacobian_transposed' }],
  1: [{ text: 'x[0] + delta[0]', rule: 'n_newton_sys_sign' }],
  2: [{ text: 'x[1] + delta[1]', rule: 'n_newton_sys_sign' }],
};
const FILLERS = { 0: ['matvec(J(x), F(x))', 'solve(F(x), J(x))'], 3: ['norm(delta) > tol'] };
const WRONG = { 3: 'norm(delta) > tol' };

// Newton in double precision on the item's system: ‖δ‖ at each step.
function increments(d) {
  const f1 = (x, y) => (d.kind === 'circ' ? x * x + y * y - (d.p ** 2 + d.q0 ** 2) : d.kind === 'prod' ? x * y - d.p * d.q0 : x * x - y - (d.p ** 2 - d.q0));
  const j1 = (x, y) => (d.kind === 'circ' ? [2 * x, 2 * y] : d.kind === 'prod' ? [y, x] : [2 * x, -1]);
  let [x, y] = d.x0.map(Number);
  const out = [];
  for (let k = 0; k < 12; k++) {
    let [a11, a12] = j1(x, y);
    let [a21, a22] = [d.a, d.b];
    let F1 = f1(x, y);
    let F2 = d.a * x + d.b * y - (d.a * d.p + d.b * d.q0);
    if (d.swap) { [a11, a12, a21, a22] = [a21, a22, a11, a12]; [F1, F2] = [F2, F1]; }
    const det = a11 * a22 - a12 * a21;
    if (!det) break;
    const dx = (F1 * a22 - a12 * F2) / det;
    const dy = (a11 * F2 - F1 * a21) / det;
    x -= dx;
    y -= dy;
    const n = Math.hypot(dx, dy);
    out.push(n);
    if (n < 1e-14) break;
  }
  return out;
}

function level5(rng) {
  let d = data(rng);
  let inc = increments(d);
  // A run that reaches 10⁻¹² in at most 8 steps, with at least 4 rows.
  const good = (v) => v.length >= 4 && v.length <= 8 && v[v.length - 1] < 1e-12;
  for (let t = 0; t < 60 && !good(inc); t++) { d = data(rng); inc = increments(d); }
  const rows = inc.map((x, k) => [String(k + 1), expText(x, 6)]);
  const then = readtableItem({
    skill: NS, level: 5, key: `5:${d.Jsym}:${d.x0.join(',')}`,
    prompt: `Le programme, appelé pour ${sysR(d)} et x⁽⁰⁾ = ${vR(d.x0)}, affiche ‖δ‖ à chaque itération :`,
    table: { columns: ['itération', '‖δ‖'], rows },
    question: multiMcq({
      skill: NS, level: 5, key: `${NS}:5q`, prompt: 'Que peut-on en déduire ?',
      options: [
        { html: 'Newton converge quadratiquement pour ce point de départ', correct: true },
        { html: 'La jacobienne en la solution est inversible (sinon l\'ordre 2 serait perdu)', correct: true },
        { html: 'Newton converge quadratiquement quel que soit le point de départ', correct: false },
        { html: 'La méthode est d\'ordre 1, puisque ‖δ‖ₖ₊₁/‖δ‖ₖ tend vers 0', correct: false, rule: 'n_order_simple_ratio' },
      ],
      solution: [{ html: 'Le nombre de chiffres exacts double à chaque pas : ordre 2 pour ce départ. Rien ne dit qu\'un autre départ converge.', note: '' }],
    }, rng),
  });
  return codeItem({
    skill: NS, level: 5, ref: NSYS, blanks: [0, 1, 2, 3], traps: TRAPS, fillers: FILLERS, wrong: WRONG, rng,
    preludes: ['vec', 'mat'],
    prompt: 'Complète Newton pour un système de deux équations : F(x) et J(x) sont des fonctions données ; on résout J·δ = F, puis x ← x − δ, jusqu\'à ‖δ‖ < tol. La fonction renvoie [x₁, x₂, nombre d\'itérations].',
    tests: TESTS, then, hints: [], subgoals: SUB, key: `5:${d.Jsym}`, fallback: d.fallback,
  });
}

// ---------- exam ----------

function examMcq(rng, opts) {
  const d = data(rng);
  const right = ML(mt(d.J));
  const T = [[d.J[0][0], d.J[1][0]], [d.J[0][1], d.J[1][1]]];
  const wrongs = [];
  if (mt(T) !== mt(d.J)) wrongs.push({ html: ML(mt(T)), rule: 'a2_jacobian_transposed' });
  // A partial derivative forgotten: ∂(x²)/∂x written x², or xy differentiated in x as x.
  const bad = d.kind === 'prod' ? [[d.x0[0], d.x0[1]], d.J[1]] : [[d.J[0][0].div(2), d.J[0][1]], d.J[1]];
  wrongs.push({ html: ML(mt(bad)) });
  wrongs.push({ html: ML(mt([d.J[0], [d.J[1][0].neg(), d.J[1][1].neg()]])) });
  wrongs.push({ html: ML(mt([d.J[0].map((x) => x.add(1)), d.J[1]])) });
  const options = [{ html: right, correct: true }];
  for (const w of wrongs) if (options.length < 4 && !options.some((o) => o.html === w.html)) options.push({ ...w, correct: false });
  return mcq({
    skill: NS, level: 4, key: `${NS}:exam:${d.Jsym}:${d.x0.join(',')}`, exam: examTag(opts),
    prompt: `On applique Newton à ${sysR(d)} = (0 ; 0), à partir de x⁽⁰⁾ = ${vR(d.x0)}. Que vaut la jacobienne J(x⁽⁰⁾) ?`,
    options,
    solution: [{ html: `J(x, y) = ${ML(d.Jsym, { vars: ['x', 'y'] })}, donc J${vR(d.x0)} = ${right}.`, note: '' }],
  }, rng);
}

function examCoef(rng, opts) {
  const d = data(rng);
  const plus = d.x0[0].add(d.delta[0]);
  return coefItem({
    skill: NS, level: 4, key: `${d.Jsym}:${d.x0.join(',')}`, exam: examTag(opts),
    prompt: `Un pas de Newton pour ${sysR(d)} = (0 ; 0), à partir de x⁽⁰⁾ = ${vR(d.x0)} (J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), x⁽¹⁾ = x⁽⁰⁾ − δ). Donne la première composante de x⁽¹⁾.`,
    label: 'x_1', value: String(d.x1[0]),
    traps: plus.eq(d.x1[0]) ? [] : [{ value: String(plus), rule: 'n_newton_sys_sign' }],
    solution: [{ html: `J${vR(d.x0)} = ${ML(mt(d.J))}, F = ${vR(d.F)}, δ = ${vR(d.delta)}, x⁽¹⁾ = ${vR(d.x1)}.`, note: '' }],
    fallback: d.fallback,
  });
}

export const GEN = {
  [NS]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return examMcq(rng, opts);
    if (opts.exam === 'coef') return examCoef(rng, opts);
    if (level >= 5) return level5(rng);
    return linesLevel(rng, level);
  },
};

export { Q };

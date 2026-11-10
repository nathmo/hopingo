// n-secant (module N, part b, step U9): the secant method. Catalogue:
// docs/universite/N-analyse-numerique.md, n-secant.
//
// Data: f = x² − c (c ∈ {2, 3, 5, 6, 7}) or x³ − c (c ∈ {2, 3, 5}); x⁽⁰⁾ and
// x⁽¹⁾ the whole numbers around α; x⁽²⁾ and x⁽³⁾ rational with a
// denominator ≤ 500. The table is judged from the student's two previous
// rows (phi 'secant'), with n_secant_update when x⁽⁰⁾ is kept.
// L1 x⁽²⁾ and x⁽³⁾ in guided lines; L2 the table; L3 choose the two points;
// L4 a longer table, then the order; L5 the program, then its increments.
// Exam: tf only (weight 0).

import { Q } from '../../math/rational.js';
import { mcq, examTag } from './kit.js';
import { partsItem } from './geo-kit.js';
import {
  refCode, codeItem, readtableItem, iterTable, multiMcq, expText, fmt, H, vfMcq,
} from './numerique-kit.js';

export const SC = 'n-secant';
const SUB = [
  { id: 'eval', label: 'f aux deux derniers points', skill: SC },
  { id: 'iterate', label: 'un pas de la sécante', skill: SC },
  { id: 'newton', label: 'Newton avec la pente de la corde', skill: 'n-newton' },
  { id: 'order', label: 'l\'ordre lu sur les incréments', skill: 'n-order-read' },
];
const KEYS = ['calc'];

function data(rng, { maxD = 500 } = {}) {
  for (let t = 0; t < 200; t++) {
    const cube = rng.chance(0.35);
    const c = cube ? rng.pick([2, 3, 5]) : rng.pick([2, 3, 5, 6, 7]);
    const e = cube ? 3 : 2;
    const a = c ** (1 / e);
    const x0 = Math.floor(a);
    const x1 = x0 + 1;
    const f = (x) => x.pow(e).sub(c);
    const xs = [new Q(x0), new Q(x1)];
    let ok = true;
    for (let k = 2; k < 5; k++) {
      try {
        const [u, v] = [xs[k - 2], xs[k - 1]];
        xs.push(v.sub(f(v).mul(v.sub(u)).div(f(v).sub(f(u)))));
      } catch { ok = false; break; }
    }
    if (!ok || xs[2].d > maxD || xs[3].d > maxD) continue;
    return { e, c, x0, x1, xs, fx: `x^${e}-${c}`, fR: `f(x) = x${e === 2 ? '²' : '³'} − ${c}`, f };
  }
  const f = (x) => x.mul(x).sub(2);
  return { e: 2, c: 2, x0: 1, x1: 2, xs: [new Q(1), new Q(2), new Q(4, 3), new Q(7, 5), new Q(41, 29)], fx: 'x^2-2', fR: 'f(x) = x² − 2', f, fallback: true };
}

// The line of one step: x_k − f(x_k)(x_k − x_{k−1})/(f(x_k) − f(x_{k−1})).
function stepText(d, k) {
  const [u, v] = [d.xs[k - 2], d.xs[k - 1]];
  const [fu, fv] = [d.f(u), d.f(v)];
  return `${v}-(${fv})×(${v}-(${u}))/((${fv})-(${fu}))`.replace(/\((\d+)\)/g, '$1');
}
const stepR = (d, k) => stepText(d, k).replace(/×/g, '·').replace(/-/g, ' − ').replace(/\( − /g, '(−');

const sup = (k) => String(k).split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join('');

function stepPart(d, k, level, { first = false, decision = null } = {}) {
  const [u, v] = [d.xs[k - 2], d.xs[k - 1]];
  const xk = String(d.xs[k]);
  return {
    ...(first ? {} : { html: `Le pas suivant, à partir de x⁽${sup(k - 2)}⁾ et x⁽${sup(k - 1)}⁾ :` }), ask: `x⁽${sup(k)}⁾ =`, start: `x_${k}`,
    judge: { kind: 'value', expect: xk, form: 'irreducible' },
    notes: level <= 2 ? [`f(${fmt(u)}) = ${fmt(d.f(u))}, f(${fmt(v)}) = ${fmt(d.f(v))}.`] : [],
    decisions: decision ? [decision] : [],
    menu: [
      { id: 'last', label: `Utiliser x⁽${sup(k - 2)}⁾ et x⁽${sup(k - 1)}⁾`, valid: true },
      { id: 'first', label: `Utiliser x⁽⁰⁾ et x⁽${sup(k - 1)}⁾`, valid: k === 2, ...(k === 2 ? {} : { rule: 'n_secant_update', why: 'La sécante utilise les deux derniers points.' }) },
    ].filter((o, i) => i === 0 || k > 2),
    lines: [
      { math: stepText(d, k), note: 'x − f(x)·(x − x_prec)/(f(x) − f(x_prec))', subgoal: 'eval' },
      { math: xk, note: 'fraction irréductible', subgoal: 'iterate', blank: [xk] },
    ],
  };
}

const updateDecision = {
  kind: 'decision', prompt: 'Avec quels deux points calcules-tu x⁽³⁾ ?', levels: [2, 3], options: [
    { id: 'last', label: 'x⁽¹⁾ et x⁽²⁾, les deux derniers', valid: true, ref: true },
    { id: 'frozen', label: 'x⁽⁰⁾ et x⁽²⁾ : on garde le point de départ', valid: false, rule: 'n_secant_update', why: 'La sécante oublie le plus ancien point : elle utilise les deux derniers.' },
  ],
};

function linesLevel(rng, level) {
  const d = data(rng);
  const parts = [stepPart(d, 2, level, { first: true }), stepPart(d, 3, level, { decision: updateDecision })];
  return partsItem({
    skill: SC, level, parts, subgoals: SUB, keys: KEYS, key: `${SC}:${level}:${d.fx}`, fallback: d.fallback,
    prompt: `Méthode de la sécante pour ${d.fR}, avec x⁽⁰⁾ = ${d.x0} et x⁽¹⁾ = ${d.x1} : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)·(x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾)/(f(x⁽ᵏ⁾) − f(x⁽ᵏ⁻¹⁾)). Calcule x⁽²⁾ et x⁽³⁾ (fractions exactes).${level === 3 ? ' Choisis d\'abord chaque action.' : ''}`,
    hints: H('C\'est Newton avec f′ remplacée par la pente entre les deux derniers points.',
      `pente = (f(${d.x1}) − f(${d.x0}))/(${d.x1} − ${d.x0}) = □`,
      `x⁽²⁾ = ${fmt(d.xs[2])}, x⁽³⁾ = ${fmt(d.xs[3])}.`),
    baits: level >= 2 ? ['n_secant_update'] : [],
  });
}

// ---------- tables ----------

function tableLevel(rng, level) {
  const d = data(rng, { maxD: level === 4 ? 200 : 500 });
  const n = level === 2 ? 4 : 5;
  const then = level === 4 ? mcq({
    skill: SC, level: 4, key: `${SC}:order`,
    prompt: 'Les incréments de la sécante : r₁ = δₖ/δₖ₋₁ tend vers 0 et r₂ = δₖ/δₖ₋₁² vers l\'infini. Quel est son ordre ?',
    options: [
      { html: 'Strictement entre 1 et 2 (≈ 1,618)', correct: true },
      { html: 'Ordre 1, puisque δₖ/δₖ₋₁ tend vers 0', correct: false, rule: 'n_order_simple_ratio' },
      { html: 'Ordre 2, comme Newton', correct: false },
      { html: 'Ordre 3', correct: false },
    ],
    solution: [{ html: 'p = 1 est trop petit (r₁ → 0), p = 2 trop grand (r₂ → ∞) : l\'ordre est (1 + √5)/2 ≈ 1,618.', note: '' }],
  }, rng) : null;
  return iterTable({
    skill: SC, level, key: `${level}:${d.fx}`, n,
    phi: { kind: 'secant', f: d.fx, x0: String(d.x0), x1: String(d.x1), tol: 1e-7, sig: 2 },
    cols: [{ id: 'x', label: 'x⁽ᵏ⁾' }, { id: 'inc', label: 'δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|', auto: true }],
    given: (k) => k <= 1,
    prompt: `Méthode de la sécante pour ${d.fR}, avec x⁽⁰⁾ = ${d.x0} et x⁽¹⁾ = ${d.x1}. Remplis les itérés (fractions exactes, ou 8 chiffres significatifs) ; chaque ligne se calcule avec tes deux lignes d'avant.`,
    then,
    hints: H('Chaque ligne utilise les deux lignes précédentes : x − f(x)·(x − x_prec)/(f(x) − f(x_prec)).',
      `x⁽²⁾ = ${d.x1} − f(${d.x1})·(${d.x1} − ${d.x0})/(f(${d.x1}) − f(${d.x0})) = □`,
      `x⁽²⁾ = ${fmt(d.xs[2])}, x⁽³⁾ = ${fmt(d.xs[3])}.`),
    subgoals: SUB, baits: level === 4 ? ['n_order_simple_ratio'] : [],
    fallback: d.fallback,
  });
}

// ---------- L5: the program ----------

const SECANT = refCode(`def secant(f, x0, x1, tol, nmax):
    for k in range(nmax):
        x2 = «x1 - f(x1) * (x1 - x0) / (f(x1) - f(x0))»
        if abs(x2 - x1) < tol:
            return [x2, k + 1]
        x0 = «x1»
        x1 = «x2»
    return [x1, nmax]
`);
const TESTS = [
  { setup: 'def f(x): return x*x - 2', expr: 'secant(f, 1.0, 2.0, 1e-12, 50)', expect: '[1.4142135623730951, 7]', tol: 1e-12 },
  { setup: 'def f(x): return x**3 - 5', expr: 'secant(f, 1.0, 2.0, 1e-12, 50)[0]', expect: '1.7099759466766968', tol: 1e-12 },
];
const TRAPS = { 1: [{ text: 'x0', rule: 'n_secant_update' }] };
const FILLERS = { 0: ['x1 - f(x1) * (f(x1) - f(x0)) / (x1 - x0)'], 2: ['x1'] };
const WRONG = { 2: 'x1' };

function runSecant(f, x0, x1) {
  const out = [];
  for (let k = 0; k < 20; k++) {
    const x2 = x1 - (f(x1) * (x1 - x0)) / (f(x1) - f(x0));
    if (!Number.isFinite(x2)) break;
    const inc = Math.abs(x2 - x1);
    if (inc === 0) break;
    out.push(inc);
    if (inc < 1e-14) break;
    x0 = x1;
    x1 = x2;
  }
  return out;
}

function level5(rng) {
  const d = data(rng);
  const f = (x) => x ** d.e - d.c;
  const inc = runSecant(f, d.x0, d.x1);
  const then = readtableItem({
    skill: SC, level: 5, key: `5:${d.fx}`,
    prompt: `Le programme, appelé pour ${d.fR}, x⁽⁰⁾ = ${d.x0} et x⁽¹⁾ = ${d.x1}, affiche les incréments |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| :`,
    table: { columns: ['k', 'δₖ'], rows: inc.map((x, k) => [String(k + 1), expText(x, 3)]) },
    question: multiMcq({
      skill: SC, level: 5, key: `${SC}:5q`, prompt: 'Que peut-on en déduire ?',
      options: [
        { html: 'δₖ/δₖ₋₁ tend vers 0', correct: true },
        { html: 'L\'ordre est strictement entre 1 et 2', correct: true },
        { html: 'La méthode est d\'ordre 1, puisque δₖ/δₖ₋₁ tend vers 0', correct: false, rule: 'n_order_simple_ratio' },
        { html: 'La méthode est d\'ordre 2', correct: false },
      ],
      solution: [{ html: 'r₁ → 0 (p = 1 trop petit) mais r₂ → ∞ (p = 2 trop grand) : l\'ordre de la sécante est (1 + √5)/2 ≈ 1,618.', note: '' }],
    }, rng),
  });
  return codeItem({
    skill: SC, level: 5, ref: SECANT, blanks: [0, 1, 2], traps: TRAPS, fillers: FILLERS, wrong: WRONG, rng,
    prompt: 'Complète la méthode de la sécante : elle s\'arrête quand |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| < tol et renvoie [x, nombre d\'itérations].',
    tests: TESTS, then, hints: [], subgoals: SUB, key: `5:${d.fx}`, fallback: d.fallback,
  });
}

function examTf(rng, opts) {
  return rng.chance(0.6)
    ? vfMcq({
      skill: SC, key: `${SC}:tf:order`, exam: examTag(opts), truth: false,
      statement: 'La méthode de la sécante est d\'ordre 2, comme Newton.',
      explanation: 'Faux : son ordre est (1 + √5)/2 ≈ 1,618. Sur les incréments, δₖ/δₖ₋₁ → 0 mais δₖ/δₖ₋₁² → ∞.',
    }, rng)
    : vfMcq({
      skill: SC, key: `${SC}:tf:deriv`, exam: examTag(opts), truth: true,
      statement: 'La méthode de la sécante n\'utilise pas la dérivée de f, mais demande deux points de départ.',
      explanation: 'Vrai : f′ est remplacée par la pente de la corde entre les deux derniers itérés.',
    }, rng);
}

export const GEN = {
  [SC]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'tf') return examTf(rng, opts);
    switch (level) {
      case 1: return linesLevel(rng, 1);
      case 2: return tableLevel(rng, 2);
      case 3: return linesLevel(rng, 3);
      case 4: return tableLevel(rng, 4);
      default: return level5(rng);
    }
  },
};

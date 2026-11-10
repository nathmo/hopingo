// n-newton (module N, part b, step U9): Newton's method for one equation.
// Catalogue: docs/universite/N-analyse-numerique.md, n-newton. The
// reference skill of the module: it uses the four item types of U9
// (lines, an iteration table judged from the student's cells, a `code`
// item, a `readtable`).
//
// Data: f = x² − c, c ∈ {2, 3, 5, 6, 7} (not a square), x⁽⁰⁾ a whole number
// next to √c; Newton is φ(x) = (x² + c)/(2x) and the first iterates stay
// rational (denominators ≤ 10⁴ for x⁽¹⁾ and x⁽²⁾).
// L1 guided lines: φ with blanks, then x⁽¹⁾; L2 the table (x⁽¹⁾, x⁽²⁾, the
// increments computed by the app); L3 choose the iteration (x − f/f′, or
// the traps x − f′/f, x + f/f′), then x⁽¹⁾; L4 the table with δ and r₂ to
// compute, then the order; L5 the program, then its output to read.
// Exam: mcq (the line x = x − ??? of the program, or the table `stop` of
// 2020 with several answers), tf (« converge quel que soit x⁽⁰⁾ » with
// the cycle of x³ − 2x + 2 as counter-example).

import { Q } from '../../math/rational.js';
import { linesItem, mcq, tfItem, examTag } from './kit.js';
import {
  refCode, codeItem, codeMcq, holesFor, readtableItem, iterTable, multiMcq, tableHtml, expText, fmt, H, blankBy, dec,
} from './numerique-kit.js';

const NW = 'n-newton';
const SUB = [
  { id: 'deriv', label: 'f′(x)', skill: 'g6-deriv-rules' },
  { id: 'formula', label: 'la formule de Newton', skill: NW },
  { id: 'iterate', label: 'une itération', skill: NW },
  { id: 'order', label: 'lire l\'ordre', skill: 'n-order-read' },
  { id: 'fixed', label: 'Newton est un point fixe', skill: 'n-fp-converge' },
];
const KEYS = ['calc'];

// ---------- data ----------

function data(rng) {
  for (let t = 0; t < 200; t++) {
    const c = rng.pick([2, 3, 5, 6, 7]);
    const r = Math.sqrt(c);
    const x0 = rng.pick([Math.floor(r), Math.ceil(r)]);
    if (x0 <= 0) continue;
    const xs = [new Q(x0)];
    let ok = true;
    for (let k = 0; k < 3; k++) {
      try { xs.push(xs[k].mul(xs[k]).add(c).div(xs[k].mul(2))); } catch { ok = false; break; }
    }
    if (!ok || xs[2].d > 10000) continue;
    return { c, x0, xs, phi: `(x^2+${c})/(2x)`, newton: `x-(x^2-${c})/(2x)`, fx: `x^2-${c}` };
  }
  const xs = [new Q(1), new Q(3, 2), new Q(17, 12), new Q(577, 408)];
  return { c: 2, x0: 1, xs, phi: '(x^2+2)/(2x)', newton: 'x-(x^2-2)/(2x)', fx: 'x^2-2', fallback: true };
}
const fT = (d) => `f(x) = x² − ${d.c}`;

// ---------- L1: guided lines ----------

function level1(rng) {
  const d = data(rng);
  const x1 = d.xs[1];
  return linesItem({
    skill: NW, level: 1, mode: 'guided', keys: KEYS,
    prompt: `Méthode de Newton pour ${fT(d)}, à partir de x⁽⁰⁾ = ${d.x0}. Simplifie la fonction d'itération φ(x) = x − f(x)/f′(x), puis calcule x⁽¹⁾.`,
    start: d.newton,
    judge: { kind: 'equiv', vars: ['x'], domain: { x: [0.5, 4] }, target: 'goal', goal: d.phi },
    script: [
      { kind: 'note', html: `f′(x) = 2x, donc φ(x) = x − (x² − ${d.c})/(2x).` },
      { kind: 'eq', math: d.phi, ...blankBy(d.phi, [String(d.c)]), note: `Même dénominateur 2x : 2x² − (x² − ${d.c}) = x² + ${d.c}`, subgoal: 'formula' },
      { kind: 'segment', html: `x⁽¹⁾ = φ(${d.x0}).`, ask: 'x⁽¹⁾ =', start: { math: `(${d.x0}^2+${d.c})/(2×${d.x0})` }, judge: { kind: 'value', form: 'irreducible' } },
      { kind: 'eq', math: String(x1), ...blankBy(String(x1), [String(x1)]), note: 'Fraction irréductible', subgoal: 'iterate' },
    ],
    hints: H('Remplace f par sa tangente en x⁽ᵏ⁾ et cherche où elle coupe l\'axe : x − f(x)/f′(x).',
      `φ(x) = x − (x² − ${d.c})/(□)`,
      `φ(x) = (x² + ${d.c})/(2x), x⁽¹⁾ = ${fmt(x1)}.`),
    subgoals: SUB, key: `${NW}:1:${d.c}:${d.x0}`, baits: [], fallback: d.fallback,
  });
}

// ---------- L2 and L4: the table ----------

function tableLevel(rng, level) {
  const d = data(rng);
  const n = level === 2 ? 3 : 4;
  const phi = { kind: 'scalar', phi: d.newton, x0: String(d.x0), tol: 1e-9, sig: 2 };
  const cols = level === 2
    ? [{ id: 'x', label: 'x⁽ᵏ⁾' }, { id: 'inc', label: 'δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|', auto: true }]
    : [{ id: 'x', label: 'x⁽ᵏ⁾' }, { id: 'inc', label: 'δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|' }, { id: 'r2', label: 'r₂ = δₖ/δₖ₋₁²' }];
  const rows = d.xs.slice(0, n);
  const then = level === 4 ? mcq({
    skill: NW, level, key: `${NW}:order:${d.c}:${d.x0}`,
    prompt: 'Les rapports r₂ se stabilisent vers une constante non nulle. Quel est l\'ordre de la méthode ?',
    options: [{ html: 'Ordre 2 (convergence quadratique)', correct: true }, { html: 'Ordre 1 : δₖ/δₖ₋₁ tend vers 0', correct: false, rule: 'n_order_simple_ratio' }, { html: 'Ordre 3', correct: false }, { html: 'On ne peut pas savoir sans α', correct: false }],
    solution: [{ html: 'r₂ = δₖ/δₖ₋₁² tend vers une constante finie non nulle (1/(2√c)) : ordre 2. Le rapport r₁ tend vers 0, ce qui dit seulement que l\'ordre est > 1.', note: '' }],
  }, rng) : null;
  const item = iterTable({
    skill: NW, level, key: `${level}:${d.c}:${d.x0}`, n, cols,
    prompt: `Méthode de Newton pour ${fT(d)} : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − (x⁽ᵏ⁾² − ${d.c})/(2x⁽ᵏ⁾), à partir de x⁽⁰⁾ = ${d.x0}. ${level === 2 ? 'Remplis les itérés (fractions exactes) ; l\'app calcule les incréments.' : 'Remplis les itérés (fractions exactes), les incréments et les rapports r₂ (2 chiffres significatifs suffisent).'}`,
    phi, given: (k, id) => k === 0 && id === 'x', blank: (k, id) => (id === 'r2' && k < 2),
    then,
    hints: H('Chaque ligne se calcule à partir de la ligne d\'avant : x − f(x)/f′(x).',
      `x⁽¹⁾ = ${d.x0} − (${d.x0}² − ${d.c})/(2·${d.x0}) = □`,
      `x⁽¹⁾ = ${fmt(rows[1])}, x⁽²⁾ = ${fmt(rows[2])}.`),
    subgoals: SUB, baits: level === 4 ? ['n_order_simple_ratio'] : [], fallback: d.fallback,
  });
  return item;
}

// ---------- L3: choose the iteration ----------

function level3(rng) {
  const d = data(rng);
  const x1 = d.xs[1];
  const f0 = new Q(d.x0 * d.x0 - d.c);
  const df0 = new Q(2 * d.x0);
  return linesItem({
    skill: NW, level: 3, mode: 'tap', keys: KEYS,
    prompt: `Méthode de Newton pour ${fT(d)}, à partir de x⁽⁰⁾ = ${d.x0}. Choisis la formule, puis calcule x⁽¹⁾.`,
    start: `${d.x0}`,
    judge: { kind: 'value', expect: String(x1), form: 'irreducible' },
    script: [
      {
        kind: 'decision', prompt: 'Quelle est l\'itération de Newton ?', options: [
          { id: 'ok', label: 'x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)/f′(x⁽ᵏ⁾)', valid: true, ref: true },
          { id: 'inv', label: 'x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f′(x⁽ᵏ⁾)/f(x⁽ᵏ⁾)', valid: false, rule: 'n_newton_inverted', why: 'La tangente coupe l\'axe en x − f(x)/f′(x) : f au numérateur.' },
          { id: 'sign', label: 'x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + f(x⁽ᵏ⁾)/f′(x⁽ᵏ⁾)', valid: false, rule: 'n_newton_sign', why: 'On va vers le zéro de la tangente : on retire f/f′.' },
        ],
      },
      { kind: 'eq', math: `${d.x0}-${f0.n < 0 ? `(${f0})` : f0}/${df0}`, note: `f(${d.x0}) = ${fmt(f0)}, f′(${d.x0}) = ${fmt(df0)}`, subgoal: 'formula' },
      { kind: 'eq', math: String(x1), note: 'x⁽¹⁾', subgoal: 'iterate' },
    ],
    hints: H('La tangente en x⁽ᵏ⁾ coupe l\'axe en x⁽ᵏ⁾ − f(x⁽ᵏ⁾)/f′(x⁽ᵏ⁾).',
      `x⁽¹⁾ = ${d.x0} − ${f0.n < 0 ? `(${fmt(f0)})` : fmt(f0)}/□`,
      `x⁽¹⁾ = ${d.x0} − ${f0.n < 0 ? `(${fmt(f0)})` : fmt(f0)}/${fmt(df0)} = ${fmt(x1)}.`),
    subgoals: SUB, key: `${NW}:3:${d.c}:${d.x0}`, baits: ['n_newton_inverted', 'n_newton_sign'], fallback: d.fallback,
  });
}

// ---------- the program (catalogue « Item code ») ----------

const NEWTON = refCode(`def newton(f, df, x0, tol, nmax):
    x = x0
    for k in range(nmax):
        incr = «f(x) / df(x)»
        x = «x - incr»
        if «abs(incr) < tol»:
            return [x, k + 1]
    return [x, nmax]
`);
const TRAPS = {
  0: [{ text: 'df(x) / f(x)', rule: 'n_newton_inverted' }, { text: '-f(x) / df(x)', rule: 'n_newton_sign' }],
  1: [{ text: 'x + incr', rule: 'n_newton_sign' }],
  2: [],
};
const FILLERS = { 0: ['f(x) * df(x)'], 2: ['abs(incr) > tol', 'incr < tol'] };
const WRONG = { 2: 'abs(incr) > tol' };
const TESTS = [
  { setup: 'def f(x): return x*x - 2\ndef df(x): return 2*x', expr: 'newton(f, df, 1.1, 1e-10, 100)', expect: '[1.4142135623730951, 5]', tol: 1e-12 },
  { setup: 'def f(x): return x**3 - 2\ndef df(x): return 3*x*x', expr: 'newton(f, df, 2.0, 1e-12, 100)', expect: '[1.2599210498948732, 6]', tol: 1e-12 },
];

// The increments of Newton for f (JS, as the program prints them).
function stops(f, df, x0, n) {
  const out = [];
  let x = x0;
  for (let k = 0; k < n; k++) {
    const incr = f(x) / df(x);
    x -= incr;
    out.push(Math.abs(incr));
    if (Math.abs(incr) < 1e-15) break;
  }
  return out;
}

function stopTable(rng) {
  const c = rng.pick([2, 3, 5, 7]);
  const x0 = rng.pick([4, 5, 6, 8]);
  const s = stops((x) => x * x - c, (x) => 2 * x, x0, 7).filter((x) => x > 1e-16);
  return { c, x0, s, table: { columns: ['k', ...s.map((_, k) => String(k + 1))], rows: [['δₖ', ...s.map((x) => expText(x, 6))]] } };
}

function readQuestion(rng, t, level) {
  return multiMcq({
    skill: NW, level, key: `${NW}:read:${t.c}:${t.x0}`,
    prompt: `Le programme newton affiche les incréments |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| pour f(x) = x² − ${t.c} et x⁽⁰⁾ = ${t.x0}. Que peut-on en déduire ?`,
    options: [
      { html: 'Newton converge quadratiquement pour ce point de départ', correct: true },
      { html: 'Le nombre de chiffres exacts double environ à chaque pas, à la fin', correct: true },
      { html: 'Newton converge quadratiquement quel que soit le point de départ', correct: false },
      { html: 'La méthode est d\'ordre 1, puisque δₖ₊₁/δₖ tend vers 0', correct: false, rule: 'n_order_simple_ratio' },
    ],
    solution: [{ html: 'δₖ₊₁ ≈ C·δₖ² sur les dernières lignes (l\'exposant double) : ordre 2 pour ce départ. Le tableau ne dit rien des autres départs.', note: '' }],
  }, rng);
}

function level5(rng) {
  const t = stopTable(rng);
  const then = readtableItem({
    skill: NW, level: 5, key: `${t.c}:${t.x0}`,
    prompt: `Le programme, appelé pour f(x) = x² − ${t.c} et x⁽⁰⁾ = ${t.x0}, affiche les incréments :`,
    table: t.table, question: readQuestion(rng, t, 5),
  });
  return codeItem({
    skill: NW, level: 5, ref: NEWTON, blanks: holesFor(5, NEWTON), traps: TRAPS, wrong: WRONG, rng,
    prompt: 'Complète la méthode de Newton : elle s\'arrête quand l\'incrément est plus petit que tol, et renvoie [x, nombre d\'itérations].',
    tests: TESTS, then,
    hints: [], subgoals: SUB, key: `5:${t.c}:${t.x0}`,
  });
}

// ---------- exam variants ----------

function examMcq(rng, opts) {
  if (rng.chance(0.5)) {
    return codeMcq({
      skill: NW, ref: NEWTON, hole: 0, traps: TRAPS, fillers: FILLERS, key: 'incr', exam: examTag(opts),
      prompt: 'La fonction Python ci-dessous applique la méthode de Newton.',
    }, rng);
  }
  const t = stopTable(rng);
  const q = readQuestion(rng, t, 4);
  return { ...q, prompt: `${q.prompt.replace(' Que peut-on', `${tableHtml(t.table)}Que peut-on`)}`, exam: examTag(opts), key: `${NW}:examread:${t.c}:${t.x0}` };
}

function examTf(rng, opts) {
  return tfItem({
    skill: NW, level: 4, key: 'cycle', exam: examTag(opts),
    statement: 'Si f′ ne s\'annule pas près de la racine α, la méthode de Newton converge vers α quel que soit x⁽⁰⁾.',
    truth: false, ruleIfTrue: null,
    counter: {
      kind: 'num', prop: 'newtonNoConv', params: {},
      ask: [{ v: 'f', label: 'f(x) =' }, { v: 'x0', label: 'x⁽⁰⁾ =' }],
      answer: { f: 'x^3-2x+2', x0: '0' },
    },
    explanation: 'Faux : la convergence n\'est que locale. Pour f(x) = x³ − 2x + 2 et x⁽⁰⁾ = 0, on obtient 0, 1, 0, 1… (un cycle).',
  });
}

export const GEN = {
  [NW]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return examMcq(rng, opts);
    if (opts.exam === 'tf') return examTf(rng, opts);
    switch (level) {
      case 1: return level1(rng);
      case 2: return tableLevel(rng, 2);
      case 3: return level3(rng);
      case 4: return tableLevel(rng, 4);
      default: return level5(rng);
    }
  },
};

export const NEWTON_CODE = NEWTON;
export { dec };

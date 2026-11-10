// n-newton-multiple (module N, part b, step U9): Newton on a multiple root,
// and the modified Newton x − m·f/f′. Catalogue:
// docs/universite/N-analyse-numerique.md, n-newton-multiple.
//
// By hand: f = (x − a)ᵐ, a ∈ {−2, …, 3}, m ∈ {2, 3}; Newton is the affine
// map x − (x − a)/m, the iterates a + d·(1 − 1/m)ᵏ stay rational. Tables:
// f = (x − a)ᵐ·g(x), g ∈ {eˣ, x + 2, 1 + x²}, Newton run in double
// precision (rejected when it needs more than 40 steps for 10⁻¹⁰).
// L1 φ simplified (blanks), the ratio given, the order; L2 the table, then
// the order; L3 simple or multiple, m, then one step of the modified Newton
// (choose the action); L4 a raw table, m deduced from the ratio; L5 the
// program newton_mod, then Newton against the modified Newton (several
// answers). Exam: mcq (the table, or the line incr = ??? of the modified
// Newton), tf (« Newton est toujours d'ordre 2 », counter-example checked).

import { Q } from '../../math/rational.js';
import { mcq, tfItem, examTag } from './kit.js';
import { partsItem } from './geo-kit.js';
import {
  refCode, codeItem, codeMcq, readtableItem, iterTable, multiMcq, tableHtml, expText, fmt, H, dec,
} from './numerique-kit.js';

export const NM = 'n-newton-multiple';
const SUB = [
  { id: 'deriv', label: 'f′(x)', skill: 'g6-deriv-rules' },
  { id: 'formula', label: 'la formule de Newton', skill: 'n-newton' },
  { id: 'order', label: 'l\'ordre lu sur le rapport', skill: 'n-order-read' },
  { id: 'mult', label: 'la multiplicité m', skill: 'g0-multiplicity' },
  { id: 'modified', label: 'Newton modifié', skill: NM },
];
const KEYS = ['calc'];

// (x − a), written for the CAS.
const xa = (a) => (a === 0 ? 'x' : a > 0 ? `(x-${a})` : `(x+${-a})`);
const xaR = (a) => (a === 0 ? 'x' : a > 0 ? `(x − ${a})` : `(x + ${-a})`);
// ((m − 1)x + a)/m
function phiText(m, a) {
  const lin = `${m - 1 === 1 ? '' : m - 1}x${a === 0 ? '' : a > 0 ? `+${a}` : `-${-a}`}`;
  return a === 0 ? `${lin}/${m}` : `(${lin})/${m}`;
}

function hand(rng) {
  for (let t = 0; t < 100; t++) {
    const m = rng.pick([2, 2, 3]);
    const a = rng.int(-2, 3);
    const d = rng.pick(m === 2 ? [1, 2, -1, -2, 4] : [3, -3, 1, 2]);
    const x0 = a + d;
    const r = new Q(m - 1, m);
    const xs = [new Q(x0)];
    for (let k = 0; k < 4; k++) xs.push(xs[k].sub(a).mul(r).add(a));
    return { m, a, d, x0, r, xs, newton: `x-${xa(a)}^${m}/(${m}${xa(a)}${m > 2 ? `^${m - 1}` : ''})`, phi: phiText(m, a) };
  }
  return null;
}
const nr = (x) => String(x).replace('-', '−');
const fR = (h) => `f(x) = ${xaR(h.a)}${h.m === 2 ? '²' : '³'}`;

// ---------- L1: φ, the ratio, the order ----------

function orderPart(level) {
  return {
    html: 'L\'ordre de Newton ici :', ask: 'p =', start: 'p', judge: { kind: 'value', expect: '1', form: 'any' },
    decisions: [{
      kind: 'decision', prompt: 'f′(α) = 0 : la racine est multiple. Quel ordre ?', levels: [2, 3], options: [
        { id: 'one', label: 'Ordre 1 : le rapport tend vers 1 − 1/m ≠ 0', valid: true, ref: true },
        { id: 'two', label: 'Ordre 2 : Newton est toujours d\'ordre 2', valid: false, rule: 'n_newton_always2', why: 'L\'ordre 2 demande une racine simple (f′(α) ≠ 0).' },
      ],
    }],
    menu: [{ id: 'order', label: 'Conclure l\'ordre', valid: true }],
    lines: [{ math: '1', note: 'rapport constant non nul : ordre 1', subgoal: 'order', blank: ['1'] }],
  };
}

function level1(rng) {
  const h = hand(rng);
  const rT = `${h.m - 1}/${h.m}`;
  const parts = [
    {
      start: h.newton, judge: { kind: 'equiv', vars: ['x'], domain: { x: [h.a + 0.5, h.a + 4] }, target: 'goal', goal: h.phi },
      notes: [`f′(x) = ${h.m}${xaR(h.a)}${h.m > 2 ? '²' : ''}, donc φ(x) = x − f(x)/f′(x).`],
      lines: [{ math: h.phi, note: `On simplifie par ${xaR(h.a)}${h.m > 2 ? '²' : ''}`, subgoal: 'formula', blank: [String(h.m - 1 === 1 ? 'x' : `${h.m - 1}x`)] }],
    },
    {
      html: `L'erreur : x⁽ᵏ⁺¹⁾ − α = (1 − 1/${h.m})·(x⁽ᵏ⁾ − α), avec α = ${nr(h.a)}. Le rapport des erreurs vaut :`, ask: 'rapport =', start: 'r', judge: { kind: 'value', expect: rT, form: 'irreducible' },
      lines: [{ math: `1-1/${h.m}`, note: '1 − 1/m', subgoal: 'order' }, { math: rT, note: 'constant, non nul', subgoal: 'order', blank: [rT] }],
    },
    orderPart(1),
  ];
  return partsItem({
    skill: NM, level: 1, parts, subgoals: SUB, keys: KEYS, key: `${NM}:1:${h.m}:${h.a}`,
    prompt: `Newton pour ${fR(h)}, de racine α = ${nr(h.a)} de multiplicité ${h.m}. Simplifie φ(x) = x − f(x)/f′(x), puis donne le rapport des erreurs et l'ordre.`,
    hints: H('Regarde f′(α) : s\'il est nul, la racine est multiple et Newton perd son ordre 2.',
      `x⁽ᵏ⁺¹⁾ − α = (1 − 1/□)(x⁽ᵏ⁾ − α)`,
      `φ(x) = ${h.phi.replace(/-/g, ' − ').replace(/\+/g, ' + ')}, rapport ${rT}, ordre 1.`),
  });
}

// ---------- L2: the table, then the order ----------

function level2(rng) {
  const h = hand(rng);
  const then = mcq({
    skill: NM, level: 2, key: `${NM}:2q:${h.m}`,
    prompt: `Le rapport r₁ vaut ${fmt(h.r)} à chaque pas. Quel est l'ordre de Newton ici ?`,
    options: [
      { html: `Ordre 1 : r₁ = 1 − 1/m = ${fmt(h.r)}, la racine est multiple`, correct: true },
      { html: 'Ordre 2 : Newton est toujours d\'ordre 2', correct: false, rule: 'n_newton_always2' },
      { html: 'Ordre 0 : la méthode ne converge pas', correct: false },
      { html: 'On ne peut pas savoir sans α', correct: false },
    ],
    solution: [{ html: `Racine de multiplicité ${h.m} : x⁽ᵏ⁺¹⁾ − α = (1 − 1/${h.m})(x⁽ᵏ⁾ − α), ordre 1.`, note: '' }],
  }, rng);
  return iterTable({
    skill: NM, level: 2, key: `${h.m}:${h.a}:${h.x0}`, n: 4,
    phi: { kind: 'scalar', phi: h.newton, x0: String(h.x0), tol: 1e-9, sig: 2 },
    cols: [{ id: 'x', label: 'x⁽ᵏ⁾' }, { id: 'inc', label: 'δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|', auto: true }, { id: 'r1', label: 'r₁ = δₖ/δₖ₋₁' }],
    given: (k, id) => k === 0 && id === 'x', blank: (k, id) => id === 'r1' && k < 2,
    prompt: `Newton pour ${fR(h)}, à partir de x⁽⁰⁾ = ${nr(h.x0)} : φ(x) = ${h.phi.replace(/-/g, ' − ').replace(/\+/g, ' + ')}. Remplis les itérés (fractions exactes) et les rapports r₁ ; l'app calcule les incréments.`,
    then,
    hints: H('Chaque ligne : x⁽ᵏ⁺¹⁾ = φ(x⁽ᵏ⁾), à partir de ta ligne d\'avant.',
      `x⁽¹⁾ = φ(${nr(h.x0)}) = □`,
      `x⁽¹⁾ = ${fmt(h.xs[1])}, x⁽²⁾ = ${fmt(h.xs[2])}, r₁ = ${fmt(h.r)}.`),
    subgoals: SUB, baits: ['n_newton_always2'],
  });
}

// ---------- L3: choose the action ----------

function level3(rng) {
  const h = hand(rng);
  const parts = [
    {
      start: 'm', judge: { kind: 'value', expect: String(h.m), form: 'any' },
      notes: [`f(${nr(h.a)}) = 0 et f′(${nr(h.a)}) = 0${h.m === 3 ? `, f″(${nr(h.a)}) = 0` : ''}.`],
      decisions: [{
        kind: 'decision', prompt: 'f′(α) = 0 : que vaut Newton ici ?', options: [
          { id: 'mult', label: 'Racine multiple : Newton n\'est que d\'ordre 1', valid: true, ref: true },
          { id: 'two', label: 'Newton reste d\'ordre 2', valid: false, rule: 'n_newton_always2', why: 'L\'ordre 2 suppose f′(α) ≠ 0.' },
        ],
      }],
      menu: [{ id: 'm', label: 'Compter les dérivées nulles en α', valid: true }, { id: 'newton', label: 'Faire un pas de Newton', valid: false, why: 'D\'abord la multiplicité.' }],
      lines: [{ math: String(h.m), note: h.m === 2 ? 'f″(α) ≠ 0' : 'f‴(α) ≠ 0', subgoal: 'mult' }],
    },
    {
      html: `Un pas de Newton modifié à partir de x⁽⁰⁾ = ${nr(h.x0)} :`, ask: 'x⁽¹⁾ =', start: 'x_1', judge: { kind: 'value', expect: String(h.a), form: 'any' },
      decisions: [{
        kind: 'decision', prompt: 'Quelle itération ?', options: [
          { id: 'mod', label: `Newton modifié : x − ${h.m}·f(x)/f′(x)`, valid: true, ref: true },
          { id: 'plain', label: 'Newton : x − f(x)/f′(x)', valid: false, rule: 'n_newton_always2', why: 'Sur une racine multiple, Newton n\'est que d\'ordre 1 : on multiplie le pas par m.' },
        ],
      }],
      menu: [{ id: 'step', label: 'Appliquer x − m·f/f′', valid: true }, { id: 'plain', label: 'Appliquer x − f/f′', valid: false, why: 'Ce serait Newton, d\'ordre 1 ici.' }],
      lines: [
        { math: `${h.x0}-${h.m}×(${h.d})/${h.m}`, note: `f/f′ = ${xaR(h.a)}/${h.m}`, subgoal: 'modified' },
        { math: String(h.a), note: 'exact en un pas', subgoal: 'modified' },
      ],
    },
  ];
  return partsItem({
    skill: NM, level: 3, parts, subgoals: SUB, keys: KEYS, key: `${NM}:3:${h.m}:${h.a}:${h.x0}`,
    prompt: `${fR(h)}, de racine α = ${nr(h.a)}. Trouve la multiplicité m, puis fais un pas de Newton modifié. Choisis d'abord chaque action.`,
    hints: H('Regarde f′(α) : s\'il est nul, la racine est multiple.',
      `x⁽¹⁾ = ${nr(h.x0)} − ${h.m}·f(${nr(h.x0)})/f′(${nr(h.x0)}) = ${nr(h.x0)} − □`,
      `m = ${h.m} et x⁽¹⁾ = ${nr(h.a)}.`),
    baits: ['n_newton_always2'],
  });
}

// ---------- tables of Newton in double precision ----------

const GS = [
  { g: (x) => Math.exp(x), dg: (x) => Math.exp(x), t: 'eˣ' },
  { g: (x) => x + 2, dg: () => 1, t: '(x + 2)' },
  { g: (x) => 1 + x * x, dg: (x) => 2 * x, t: '(1 + x²)' },
];
function runNewton(f, df, x0, mult = 1, n = 90) {
  const d = [];
  let x = x0;
  for (let k = 0; k < n; k++) {
    const inc = (mult * f(x)) / df(x);
    if (!Number.isFinite(inc)) break;
    x -= inc;
    if (inc === 0) break;
    d.push(Math.abs(inc));
    if (Math.abs(inc) < 1e-10) break;
  }
  return d;
}
function tableData(rng) {
  for (let t = 0; t < 100; t++) {
    const G = rng.pick(GS);
    const m = rng.pick([2, 2, 3]);
    const a = rng.pick([1, 2, -1]);
    const x0 = a + rng.pick([1, 2]);
    if (G.t === '(x + 2)' && a === -1 && x0 < -1) continue;
    const f = (x) => (x - a) ** m * G.g(x);
    const df = (x) => m * (x - a) ** (m - 1) * G.g(x) + (x - a) ** m * G.dg(x);
    const d = runNewton(f, df, x0);
    if (d.length >= (m === 2 ? 40 : 70) || d.length < 8) continue;
    const dm = runNewton(f, df, x0, m);
    return { m, a, x0, f, df, d, dm, label: `f(x) = ${xaR(a)}${m === 2 ? '²' : '³'}·${G.t}, avec x⁽⁰⁾ = ${nr(x0)}`, r: new Q(m - 1, m) };
  }
  return null;
}
function newtonTable(t, rows = 8) {
  const d = t.d.slice(0, rows);
  return {
    columns: ['k', ...d.map((_, k) => String(k))],
    rows: [['δₖ', ...d.map((x) => expText(x, 3))], ['r₁', ...d.map((x, k) => (k === 0 ? '' : dec(x / d[k - 1], 3)))]],
  };
}

// ---------- L4: m from the ratio ----------

function level4(rng) {
  const t = tableData(rng);
  const question = partsItem({
    skill: NM, level: 4, keys: KEYS, key: `${NM}:4q:${t.m}`, noHints: true, hints: [], subgoals: SUB,
    prompt: 'Le rapport r₁ tend vers 1 − 1/m. Quelle est la multiplicité m de la racine ?',
    parts: [{ start: 'm', judge: { kind: 'value', expect: String(t.m), form: 'any', mult: { r: `${t.m - 1}/${t.m}` } }, lines: [{ math: `1/(1-${t.m - 1}/${t.m})`, note: 'r₁ → 1 − 1/m', subgoal: 'mult' }, { math: String(t.m), note: 'multiplicité', subgoal: 'mult' }] }],
  });
  return readtableItem({
    skill: NM, level: 4, key: `4:${t.m}:${t.a}:${t.x0}:${t.label}`,
    prompt: `Newton pour ${t.label} affiche :`,
    table: newtonTable(t), question,
    hints: H('Sur une racine de multiplicité m, x⁽ᵏ⁺¹⁾ − α ≈ (1 − 1/m)(x⁽ᵏ⁾ − α) : le rapport tend vers 1 − 1/m.',
      'r₁ → □ = 1 − 1/m',
      `r₁ → ${fmt(t.r)}, donc m = ${t.m}.`),
    subgoals: SUB, baits: ['n_mult_ratio'],
  });
}

// ---------- L5: the program, then two tables ----------

const NMOD = refCode(`def newton_mod(f, df, m, x0, tol, nmax):
    x = x0
    for k in range(nmax):
        incr = «m * f(x) / df(x)»
        x = x - incr
        if abs(incr) < tol:
            return [x, k + 1]
    return [x, nmax]
`);
const SETUP = 'def f(x): return (x-1)**2 * math.exp(x)\ndef df(x): return (2*(x-1) + (x-1)**2) * math.exp(x)';
const TESTS = [
  { setup: SETUP, expr: 'newton_mod(f, df, 2, 2.0, 1e-10, 100)', expect: '[1.0, 6]', tol: 1e-9 },
  { setup: SETUP, expr: 'newton_mod(f, df, 1, 2.0, 1e-10, 100)[1]', expect: '35' },
];
const TRAPS = { 0: [{ text: 'df(x) / (m * f(x))', rule: 'n_newton_inverted' }] };
const FILLERS = { 0: ['f(x) / df(x)', 'f(x) / (m * df(x))'] };

function compareOptions() {
  return [
    { html: 'Newton est d\'ordre 1 ici : r₁ → 1/2', correct: true },
    { html: 'Newton modifié retrouve l\'ordre 2', correct: true },
    { html: 'Newton est d\'ordre 2, comme toujours', correct: false, rule: 'n_newton_always2' },
    { html: 'Newton modifié est d\'ordre 1', correct: false },
  ];
}

function level5(rng) {
  const t = tableData(rng);
  const n = Math.min(8, t.d.length);
  const rows = Array.from({ length: n }, (_, k) => [String(k), expText(t.d[k], 3), t.dm[k] !== undefined ? expText(t.dm[k], 3) : '']);
  const opts = compareOptions().map((o) => (t.m === 3 && o.correct && o.html.startsWith('Newton est d') ? { ...o, html: 'Newton est d\'ordre 1 ici : r₁ → 2/3' } : o));
  const then = readtableItem({
    skill: NM, level: 5, key: `5:${t.label}`,
    prompt: `Pour ${t.label}, Newton (m = 1) et Newton modifié (m = ${t.m}) affichent leurs incréments :`,
    table: { columns: ['k', 'δₖ, Newton', `δₖ, modifié (m = ${t.m})`], rows },
    question: multiMcq({ skill: NM, level: 5, key: `${NM}:5q`, prompt: 'Que peut-on en déduire ?', options: opts, solution: [{ html: `La racine est de multiplicité ${t.m} : Newton n'est que d'ordre 1 (rapport ${fmt(t.r)}), Newton modifié retrouve l'ordre 2.`, note: '' }] }, rng),
  });
  return codeItem({
    skill: NM, level: 5, ref: NMOD, blanks: [0], traps: TRAPS, rng,
    prompt: 'Complète Newton modifié pour une racine de multiplicité m connue (m = 1 donne Newton).',
    tests: TESTS, then, hints: [], subgoals: SUB, key: `5:${t.label}`,
  });
}

// L2 sometimes: the program with one typed hole.
function codeLevel(rng, level) {
  return codeItem({
    skill: NM, level, ref: NMOD, blanks: [0], choice: level === 1 ? 0 : undefined, traps: TRAPS, fillers: FILLERS, rng,
    prompt: 'Complète Newton modifié pour une racine de multiplicité m connue (m = 1 donne Newton).',
    tests: TESTS,
    hints: H('Newton modifié multiplie le pas de Newton par m.', 'incr = □ * f(x) / df(x)', 'incr = m * f(x) / df(x)'),
    subgoals: SUB, key: `${level}`,
  });
}

// ---------- exam ----------

const N2 = refCode(`def newton2(f, df, x0, tol, nmax):
    # racine double
    x = x0
    for k in range(nmax):
        incr = «2 * f(x) / df(x)»
        x = x - incr
        if abs(incr) < tol:
            return [x, k + 1]
    return [x, nmax]
`);

function examMcq(rng, opts) {
  if (rng.chance(0.4)) {
    return codeMcq({
      skill: NM, ref: N2, hole: 0, key: 'n2', exam: examTag(opts),
      traps: { 0: [{ text: 'f(x) / df(x)', rule: 'n_newton_always2' }, { text: '2 * df(x) / f(x)', rule: 'n_newton_inverted' }] },
      fillers: { 0: ['f(x) / (2 * df(x))'] },
      prompt: 'On sait que la racine cherchée est double. La fonction ci-dessous doit converger à l\'ordre 2.',
    }, rng);
  }
  const t = tableData(rng);
  return multiMcq({
    skill: NM, level: 4, key: `${NM}:exam:${t.label}`, exam: examTag(opts),
    prompt: `Newton pour ${t.label} affiche :${tableHtml(newtonTable(t))}Que peut-on en déduire ?`,
    options: [
      { html: 'La méthode converge à l\'ordre 1', correct: true },
      { html: `La racine est de multiplicité ${t.m} (r₁ → ${fmt(t.r)})`, correct: true },
      { html: 'La méthode converge à l\'ordre 2', correct: false, rule: 'n_newton_always2' },
      { html: 'La racine est simple', correct: false },
    ],
    solution: [{ html: `r₁ → ${fmt(t.r)} = 1 − 1/${t.m} : ordre 1, racine de multiplicité ${t.m}.`, note: '' }],
  }, rng);
}

function examTf(rng, opts) {
  return tfItem({
    skill: NM, level: 4, key: 'always2', exam: examTag(opts),
    statement: 'Quand elle converge, la méthode de Newton est toujours d\'ordre 2.',
    truth: false, ruleIfTrue: 'n_newton_always2',
    counter: {
      kind: 'num', prop: 'newtonOrder1', params: {},
      ask: [{ v: 'f', label: 'f(x) =' }, { v: 'x0', label: 'x⁽⁰⁾ =' }],
      answer: { f: '(x-1)^2', x0: '2' },
    },
    explanation: 'Faux : pour f(x) = (x − 1)² et x⁽⁰⁾ = 2, Newton donne 2 ; 1,5 ; 1,25 ; … : l\'erreur est divisée par 2 à chaque pas, ordre 1. L\'ordre 2 demande une racine simple.',
  });
}

export const GEN = {
  [NM]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return examMcq(rng, opts);
    if (opts.exam === 'tf') return examTf(rng, opts);
    switch (level) {
      case 1: return level1(rng);
      case 2: return rng.chance(0.25) ? codeLevel(rng, 2) : level2(rng);
      case 3: return level3(rng);
      case 4: return level4(rng);
      default: return level5(rng);
    }
  },
};

export { dec };

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
import { t } from '../../i18n.js';
import { mcq, tfItem, examTag } from './kit.js';
import { partsItem } from './geo-kit.js';
import {
  refCode, codeItem, codeMcq, readtableItem, iterTable, multiMcq, tableHtml, expText, fmt, H, dec,
} from './numerique-kit.js';

export const NM = 'n-newton-multiple';
const SUB = [
  { id: 'deriv', label: 'f′(x)', skill: 'g6-deriv-rules' },
  { id: 'formula', label: t('la formule de Newton'), skill: 'n-newton' },
  { id: 'order', label: t('l\'ordre lu sur le rapport'), skill: 'n-order-read' },
  { id: 'mult', label: t('la multiplicité m'), skill: 'g0-multiplicity' },
  { id: 'modified', label: t('Newton modifié'), skill: NM },
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
  for (let tries = 0; tries < 100; tries++) {
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
    html: t('L\'ordre de Newton ici :'), ask: 'p =', start: 'p', judge: { kind: 'value', expect: '1', form: 'any' },
    decisions: [{
      kind: 'decision', prompt: t('f′(α) = 0 : la racine est multiple. Quel ordre ?'), levels: [2, 3], options: [
        { id: 'one', label: t('Ordre 1 : le rapport tend vers 1 − 1/m ≠ 0'), valid: true, ref: true },
        { id: 'two', label: t('Ordre 2 : Newton est toujours d\'ordre 2'), valid: false, rule: 'n_newton_always2', why: t('L\'ordre 2 demande une racine simple (f′(α) ≠ 0).') },
      ],
    }],
    menu: [{ id: 'order', label: t('Conclure l\'ordre'), valid: true }],
    lines: [{ math: '1', note: t('rapport constant non nul : ordre 1'), subgoal: 'order', blank: ['1'] }],
  };
}

function level1(rng) {
  const h = hand(rng);
  const rT = `${h.m - 1}/${h.m}`;
  const parts = [
    {
      start: h.newton, judge: { kind: 'equiv', vars: ['x'], domain: { x: [h.a + 0.5, h.a + 4] }, target: 'goal', goal: h.phi },
      notes: [t('f′(x) = {d}, donc φ(x) = x − f(x)/f′(x).', { d: `${h.m}${xaR(h.a)}${h.m > 2 ? '²' : ''}` })],
      lines: [{ math: h.phi, note: t('On simplifie par {f}', { f: `${xaR(h.a)}${h.m > 2 ? '²' : ''}` }), subgoal: 'formula', blank: [String(h.m - 1 === 1 ? 'x' : `${h.m - 1}x`)] }],
    },
    {
      html: t('L\'erreur : x⁽ᵏ⁺¹⁾ − α = (1 − 1/{m})·(x⁽ᵏ⁾ − α), avec α = {a}. Le rapport des erreurs vaut :', { m: h.m, a: nr(h.a) }), ask: t('rapport ='), start: 'r', judge: { kind: 'value', expect: rT, form: 'irreducible' },
      lines: [{ math: `1-1/${h.m}`, note: '1 − 1/m', subgoal: 'order' }, { math: rT, note: t('constant, non nul'), subgoal: 'order', blank: [rT] }],
    },
    orderPart(1),
  ];
  return partsItem({
    skill: NM, level: 1, parts, subgoals: SUB, keys: KEYS, key: `${NM}:1:${h.m}:${h.a}`,
    prompt: t('Newton pour {f}, de racine α = {a} de multiplicité {m}. Simplifie φ(x) = x − f(x)/f′(x), puis donne le rapport des erreurs et l\'ordre.', { f: fR(h), a: nr(h.a), m: h.m }),
    hints: H(t('Regarde f′(α) : s\'il est nul, la racine est multiple et Newton perd son ordre 2.'),
      `x⁽ᵏ⁺¹⁾ − α = (1 − 1/□)(x⁽ᵏ⁾ − α)`,
      t('φ(x) = {phi}, rapport {r}, ordre 1.', { phi: h.phi.replace(/-/g, ' − ').replace(/\+/g, ' + '), r: rT })),
  });
}

// ---------- L2: the table, then the order ----------

function level2(rng) {
  const h = hand(rng);
  const then = mcq({
    skill: NM, level: 2, key: `${NM}:2q:${h.m}`,
    prompt: t('Le rapport r₁ vaut {r} à chaque pas. Quel est l\'ordre de Newton ici ?', { r: fmt(h.r) }),
    options: [
      { html: t('Ordre 1 : r₁ = 1 − 1/m = {r}, la racine est multiple', { r: fmt(h.r) }), correct: true },
      { html: t('Ordre 2 : Newton est toujours d\'ordre 2'), correct: false, rule: 'n_newton_always2' },
      { html: t('Ordre 0 : la méthode ne converge pas'), correct: false },
      { html: t('On ne peut pas savoir sans α'), correct: false },
    ],
    solution: [{ html: t('Racine de multiplicité {m} : x⁽ᵏ⁺¹⁾ − α = (1 − 1/{m})(x⁽ᵏ⁾ − α), ordre 1.', { m: h.m }), note: '' }],
  }, rng);
  return iterTable({
    skill: NM, level: 2, key: `${h.m}:${h.a}:${h.x0}`, n: 4,
    phi: { kind: 'scalar', phi: h.newton, x0: String(h.x0), tol: 1e-9, sig: 2 },
    cols: [{ id: 'x', label: 'x⁽ᵏ⁾' }, { id: 'inc', label: 'δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|', auto: true }, { id: 'r1', label: 'r₁ = δₖ/δₖ₋₁' }],
    given: (k, id) => k === 0 && id === 'x', blank: (k, id) => id === 'r1' && k < 2,
    prompt: t('Newton pour {f}, à partir de x⁽⁰⁾ = {x0} : φ(x) = {phi}. Remplis les itérés (fractions exactes) et les rapports r₁ ; l\'app calcule les incréments.', { f: fR(h), x0: nr(h.x0), phi: h.phi.replace(/-/g, ' − ').replace(/\+/g, ' + ') }),
    then,
    hints: H(t('Chaque ligne : x⁽ᵏ⁺¹⁾ = φ(x⁽ᵏ⁾), à partir de ta ligne d\'avant.'),
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
      notes: [h.m === 3 ? t('f({a}) = 0 et f′({a}) = 0, f″({a}) = 0.', { a: nr(h.a) }) : t('f({a}) = 0 et f′({a}) = 0.', { a: nr(h.a) })],
      decisions: [{
        kind: 'decision', prompt: t('f′(α) = 0 : que vaut Newton ici ?'), options: [
          { id: 'mult', label: t('Racine multiple : Newton n\'est que d\'ordre 1'), valid: true, ref: true },
          { id: 'two', label: t('Newton reste d\'ordre 2'), valid: false, rule: 'n_newton_always2', why: t('L\'ordre 2 suppose f′(α) ≠ 0.') },
        ],
      }],
      menu: [{ id: 'm', label: t('Compter les dérivées nulles en α'), valid: true }, { id: 'newton', label: t('Faire un pas de Newton'), valid: false, why: t('D\'abord la multiplicité.') }],
      lines: [{ math: String(h.m), note: h.m === 2 ? 'f″(α) ≠ 0' : 'f‴(α) ≠ 0', subgoal: 'mult' }],
    },
    {
      html: t('Un pas de Newton modifié à partir de x⁽⁰⁾ = {x0} :', { x0: nr(h.x0) }), ask: 'x⁽¹⁾ =', start: 'x_1', judge: { kind: 'value', expect: String(h.a), form: 'any' },
      decisions: [{
        kind: 'decision', prompt: t('Quelle itération ?'), options: [
          { id: 'mod', label: t('Newton modifié : x − {m}·f(x)/f′(x)', { m: h.m }), valid: true, ref: true },
          { id: 'plain', label: 'Newton : x − f(x)/f′(x)', valid: false, rule: 'n_newton_always2', why: t('Sur une racine multiple, Newton n\'est que d\'ordre 1 : on multiplie le pas par m.') },
        ],
      }],
      menu: [{ id: 'step', label: t('Appliquer x − m·f/f′'), valid: true }, { id: 'plain', label: t('Appliquer x − f/f′'), valid: false, why: t('Ce serait Newton, d\'ordre 1 ici.') }],
      lines: [
        { math: `${h.x0}-${h.m}×(${h.d})/${h.m}`, note: `f/f′ = ${xaR(h.a)}/${h.m}`, subgoal: 'modified' },
        { math: String(h.a), note: t('exact en un pas'), subgoal: 'modified' },
      ],
    },
  ];
  return partsItem({
    skill: NM, level: 3, parts, subgoals: SUB, keys: KEYS, key: `${NM}:3:${h.m}:${h.a}:${h.x0}`,
    prompt: t('{f}, de racine α = {a}. Trouve la multiplicité m, puis fais un pas de Newton modifié. Choisis d\'abord chaque action.', { f: fR(h), a: nr(h.a) }),
    hints: H(t('Regarde f′(α) : s\'il est nul, la racine est multiple.'),
      `x⁽¹⁾ = ${nr(h.x0)} − ${h.m}·f(${nr(h.x0)})/f′(${nr(h.x0)}) = ${nr(h.x0)} − □`,
      t('m = {m} et x⁽¹⁾ = {a}.', { m: h.m, a: nr(h.a) })),
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
  for (let tries = 0; tries < 100; tries++) {
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
    return { m, a, x0, f, df, d, dm, label: `f(x) = ${xaR(a)}${m === 2 ? '²' : '³'}·${G.t}, avec x⁽⁰⁾ = ${nr(x0)}`, show: t('{f}, avec x⁽⁰⁾ = {x0}', { f: `f(x) = ${xaR(a)}${m === 2 ? '²' : '³'}·${G.t}`, x0: nr(x0) }), r: new Q(m - 1, m) };
  }
  return null;
}
function newtonTable(td, rows = 8) {
  const d = td.d.slice(0, rows);
  return {
    columns: ['k', ...d.map((_, k) => String(k))],
    rows: [['δₖ', ...d.map((x) => expText(x, 3))], ['r₁', ...d.map((x, k) => (k === 0 ? '' : dec(x / d[k - 1], 3)))]],
  };
}

// ---------- L4: m from the ratio ----------

function level4(rng) {
  const td = tableData(rng);
  const question = partsItem({
    skill: NM, level: 4, keys: KEYS, key: `${NM}:4q:${td.m}`, noHints: true, hints: [], subgoals: SUB,
    prompt: t('Le rapport r₁ tend vers 1 − 1/m. Quelle est la multiplicité m de la racine ?'),
    parts: [{ start: 'm', judge: { kind: 'value', expect: String(td.m), form: 'any', mult: { r: `${td.m - 1}/${td.m}` } }, lines: [{ math: `1/(1-${td.m - 1}/${td.m})`, note: 'r₁ → 1 − 1/m', subgoal: 'mult' }, { math: String(td.m), note: t('multiplicité'), subgoal: 'mult' }] }],
  });
  return readtableItem({
    skill: NM, level: 4, key: `4:${td.m}:${td.a}:${td.x0}:${td.label}`,
    prompt: t('Newton pour {f} affiche :', { f: td.show }),
    table: newtonTable(td), question,
    hints: H(t('Sur une racine de multiplicité m, x⁽ᵏ⁺¹⁾ − α ≈ (1 − 1/m)(x⁽ᵏ⁾ − α) : le rapport tend vers 1 − 1/m.'),
      'r₁ → □ = 1 − 1/m',
      t('r₁ → {r}, donc m = {m}.', { r: fmt(td.r), m: td.m })),
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

// m = 3: the ratio of Newton tends to 2/3 (m = 2: 1/2).
function compareOptions(m) {
  return [
    { html: m === 3 ? t('Newton est d\'ordre 1 ici : r₁ → 2/3') : t('Newton est d\'ordre 1 ici : r₁ → 1/2'), correct: true },
    { html: t('Newton modifié retrouve l\'ordre 2'), correct: true },
    { html: t('Newton est d\'ordre 2, comme toujours'), correct: false, rule: 'n_newton_always2' },
    { html: t('Newton modifié est d\'ordre 1'), correct: false },
  ];
}

function level5(rng) {
  const td = tableData(rng);
  const n = Math.min(8, td.d.length);
  const rows = Array.from({ length: n }, (_, k) => [String(k), expText(td.d[k], 3), td.dm[k] !== undefined ? expText(td.dm[k], 3) : '']);
  const opts = compareOptions(td.m);
  const then = readtableItem({
    skill: NM, level: 5, key: `5:${td.label}`,
    prompt: t('Pour {f}, Newton (m = 1) et Newton modifié (m = {m}) affichent leurs incréments :', { f: td.show, m: td.m }),
    table: { columns: ['k', 'δₖ, Newton', t('δₖ, modifié (m = {m})', { m: td.m })], rows },
    question: multiMcq({ skill: NM, level: 5, key: `${NM}:5q`, prompt: t('Que peut-on en déduire ?'), options: opts, solution: [{ html: t('La racine est de multiplicité {m} : Newton n\'est que d\'ordre 1 (rapport {r}), Newton modifié retrouve l\'ordre 2.', { m: td.m, r: fmt(td.r) }), note: '' }] }, rng),
  });
  return codeItem({
    skill: NM, level: 5, ref: NMOD, blanks: [0], traps: TRAPS, rng,
    prompt: t('Complète Newton modifié pour une racine de multiplicité m connue (m = 1 donne Newton).'),
    tests: TESTS, then, hints: [], subgoals: SUB, key: `5:${td.label}`,
  });
}

// L2 sometimes: the program with one typed hole.
function codeLevel(rng, level) {
  return codeItem({
    skill: NM, level, ref: NMOD, blanks: [0], choice: level === 1 ? 0 : undefined, traps: TRAPS, fillers: FILLERS, rng,
    prompt: t('Complète Newton modifié pour une racine de multiplicité m connue (m = 1 donne Newton).'),
    tests: TESTS,
    hints: H(t('Newton modifié multiplie le pas de Newton par m.'), 'incr = □ * f(x) / df(x)', 'incr = m * f(x) / df(x)'),
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
      prompt: t('On sait que la racine cherchée est double. La fonction ci-dessous doit converger à l\'ordre 2.'),
    }, rng);
  }
  const td = tableData(rng);
  return multiMcq({
    skill: NM, level: 4, key: `${NM}:exam:${td.label}`, exam: examTag(opts),
    prompt: t('Newton pour {f} affiche :{table}Que peut-on en déduire ?', { f: td.show, table: tableHtml(newtonTable(td)) }),
    options: [
      { html: t('La méthode converge à l\'ordre 1'), correct: true },
      { html: t('La racine est de multiplicité {m} (r₁ → {r})', { m: td.m, r: fmt(td.r) }), correct: true },
      { html: t('La méthode converge à l\'ordre 2'), correct: false, rule: 'n_newton_always2' },
      { html: t('La racine est simple'), correct: false },
    ],
    solution: [{ html: t('r₁ → {r} = 1 − 1/{m} : ordre 1, racine de multiplicité {m}.', { r: fmt(td.r), m: td.m }), note: '' }],
  }, rng);
}

function examTf(rng, opts) {
  return tfItem({
    skill: NM, level: 4, key: 'always2', exam: examTag(opts),
    statement: t('Quand elle converge, la méthode de Newton est toujours d\'ordre 2.'),
    truth: false, ruleIfTrue: 'n_newton_always2',
    counter: {
      kind: 'num', prop: 'newtonOrder1', params: {},
      ask: [{ v: 'f', label: 'f(x) =' }, { v: 'x0', label: 'x⁽⁰⁾ =' }],
      answer: { f: '(x-1)^2', x0: '2' },
    },
    explanation: t('Faux : pour f(x) = (x − 1)² et x⁽⁰⁾ = 2, Newton donne 2 ; 1,5 ; 1,25 ; … : l\'erreur est divisée par 2 à chaque pas, ordre 1. L\'ordre 2 demande une racine simple.'),
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

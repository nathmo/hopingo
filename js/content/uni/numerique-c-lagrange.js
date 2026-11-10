// n-interp-lagrange and n-divided-diff (module N, part c, step U9).
// Catalogue: docs/universite/N-analyse-numerique.md.
//
// Data: p of degree 2 with whole coefficients (a₂ ≠ 0), 3 distinct
// abscissas in {−2, …, 3} (consecutive at levels 1 and 2, so that the
// system of Vandermonde is solved by hand), yᵢ = p(xᵢ), x* a half-integer
// between the nodes. For the divided differences, a 4th point whose new
// coefficient f[x₀, …, x₃] is a small fraction.
//
// n-interp-lagrange: L1 the system of Vandermonde (each coefficient from
// its formula, guided), then p(x*); L2 the choice Vandermonde or Lagrange,
// then φ₀(x*), φ₁(x*), φ₂(x*) and p(x*) (guided); L3 choose φ₁ (the trap
// without denominator), then the values, with menus; L4 Vandermonde free,
// the Lagrange form expanded, p(x*); L5 the program lagrange_eval, then its
// output to read. Exam: mcq (φ₁(x*)), tf (« unique polynôme de degré 3 »,
// counter-example: 4 aligned points), coef (a₂).
// n-divided-diff: L1 the column of order 1, then f[x₀, x₁, x₂]; L2 the
// whole table, then p(x*) in Newton form; L3 read the coefficients on the
// table (readtable); L4 a 4th point added to the table, then p₃(x*);
// L5 the program divdiff/newton_eval, then its output. Exam: mcq.

import { Q } from '../../math/rational.js';
import { linesItem, mcq, tfItem, examTag } from './kit.js';
import { mcqDistinct } from './alglin-kit.js';
import {
  refCode, codeItem, codeMcq, holesFor, readtableItem, iterTable, multiMcq, tableHtml, expText, blankBy,
} from './numerique-kit.js';
import { q, fq, H, lagrangeEval } from './numerique-c-kit.js';

const LG = 'n-interp-lagrange';
const DD = 'n-divided-diff';
const KEYS = ['calc'];

const P = (x) => (q(x).n < 0 ? `(${q(x)})` : `${q(x)}`);
const ptsText = (xs, ys) => xs.map((x, i) => `(${fq(x)} ; ${fq(ys[i])})`).join(', ');
const polyText = (c) => {
  // c = [a0, a1, a2, …] → « 12 + 15x − 9x² »
  const sup = ['', '', '²', '³'];
  const parts = [];
  c.forEach((a, k) => {
    const v = q(a);
    if (v.n === 0) return;
    const abs = v.n < 0 ? v.neg() : v;
    const coef = k === 0 ? fq(abs) : abs.eq(1) ? '' : fq(abs);
    const mon = k === 0 ? '' : `x${sup[k]}`;
    parts.push({ neg: v.n < 0, s: `${coef}${mon}` });
  });
  if (!parts.length) return '0';
  return parts.map((t, i) => (i === 0 ? (t.neg ? `−${t.s}` : t.s) : `${t.neg ? '−' : '+'} ${t.s}`)).join(' ');
};
const evalPoly = (c, x) => c.reduce((s, a, k) => s.add(q(a).mul(q(x).pow(k))), new Q(0));

// φᵢ(x*): numerator Π(x* − xⱼ), denominator Π(xᵢ − xⱼ).
function phiParts(xs, i, xstar) {
  let num = new Q(1);
  let den = new Q(1);
  const numT = [];
  const denT = [];
  xs.forEach((xj, j) => {
    if (j === i) return;
    num = num.mul(q(xstar).sub(xj));
    den = den.mul(q(xs[i]).sub(xj));
    numT.push(`(${P(xstar)}-${P(xj)})`);
    denT.push(`(${P(xs[i])}-${P(xj)})`);
  });
  return { num, den, value: num.div(den), text: `${numT.join('')}/(${denT.join('')})` };
}

function lgData(rng, { consecutive = false, n = 3 } = {}) {
  for (let t = 0; t < 200; t++) {
    const a = [rng.int(-12, 12), rng.int(-10, 10), rng.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])];
    if (n === 4) a.push(rng.pick([-1, 1, 2, -2]));
    let xs;
    if (consecutive) { const k = rng.int(-1, 0); xs = Array.from({ length: n }, (_, i) => k + i); } else {
      const pool = rng.shuffle([-2, -1, 0, 1, 2, 3]).slice(0, n);
      xs = pool.sort((u, v) => u - v);
    }
    const ys = xs.map((x) => evalPoly(a, x));
    if (ys.some((y) => Math.abs(y.valueOf()) > 60)) continue;
    // x* a half-integer between the first and last node.
    const cands = [];
    for (let k = xs[0]; k < xs[n - 1]; k++) cands.push(q(2 * k + 1, 2));
    const xstar = rng.pick(cands);
    // Not aligned points (the trap template is the catalogue's « piège »).
    return { a, xs, ys, xstar, px: evalPoly(a, xstar), n };
  }
  return { a: [12, 15, -9], xs: [0, 1, 2], ys: [q(12), q(18), q(6)], xstar: q(1, 2), px: q(69, 4), n: 3, fallback: true };
}

const SUB_LG = [
  { id: 'system', label: 'le système de Vandermonde', skill: LG },
  { id: 'solve', label: 'résoudre le système', skill: 'l-sys-echelon' },
  { id: 'poly', label: 'le polynôme p', skill: LG },
  { id: 'basis', label: 'une fonction de base φᵢ', skill: LG },
  { id: 'eval', label: 'p(x*)', skill: LG },
];

// The system shown: one equation per point.
const systemHtml = (d) => d.xs.map((x, i) => {
  const terms = ['a₀'];
  d.a.forEach((_, k) => {
    if (k === 0) return;
    const c = q(x).pow(k);
    if (c.n === 0) return;
    const name = `a${'₀₁₂₃'[k]}`;
    terms.push(c.eq(1) ? `+ ${name}` : c.eq(-1) ? `− ${name}` : c.n < 0 ? `− ${fq(c.neg())}${name}` : `+ ${fq(c)}${name}`);
  });
  return `${terms.join(' ')} = ${fq(d.ys[i])}`;
}).join(' ; ');

// The coefficients by elimination: segments a₂, a₁, a₀ (judge value, expect).
function vanderSegs(d, { guided, menu } = {}) {
  const out = [];
  const names = ['a_0', 'a_1', 'a_2', 'a_3'];
  const coeffs = d.a.map(String);
  const order = [...d.a.keys()].reverse();
  for (const k of order) {
    const v = String(d.a[k]);
    out.push({ kind: 'segment', html: `Le coefficient a${'₀₁₂₃'[k]}.`, ask: `a${'₀₁₂₃'[k]} =`, start: { math: names[k] }, judge: { kind: 'value', expect: v, form: 'irreducible', vander: { coeffs, k, x0: String(d.xs[1]), y0: String(d.ys[1]) }, ...(menu ? { menu: menu('system') } : {}) } });
    const line = { kind: 'eq', math: v, note: k === d.a.length - 1 ? 'Par élimination dans le système' : 'En remontant le système', subgoal: k === d.a.length - 1 ? 'solve' : 'poly' };
    out.push(guided ? { ...line, ...blankBy(v, [v]) } : line);
  }
  return out;
}

// p(x*) from the coefficients.
function evalSeg(d, { guided, menu } = {}) {
  const terms = d.a.map((a, k) => (k === 0 ? P(a) : `${P(a)}×(${q(d.xstar)})${k > 1 ? `^${k}` : ''}`)).join('+');
  const line = { kind: 'eq', math: String(d.px), note: 'Fraction irréductible', subgoal: 'eval' };
  return [
    { kind: 'segment', html: `p(${fq(d.xstar)}) = a₀ + a₁·x* + a₂·x*².`, ask: `p(${fq(d.xstar)}) =`, start: { math: terms }, judge: { kind: 'value', form: 'irreducible', ...(menu ? { menu: menu('eval') } : {}) } },
    guided ? { ...line, ...blankBy(String(d.px), [String(d.px)]) } : line,
  ];
}

function phiSegs(d, { guided, menu } = {}) {
  const out = [];
  d.xs.forEach((_, i) => {
    const ph = phiParts(d.xs, i, d.xstar);
    const v = String(ph.value);
    out.push({ kind: 'segment', html: `φ${'₀₁₂₃'[i]}(${fq(d.xstar)}) = Π (x* − xⱼ)/(x${'₀₁₂₃'[i]} − xⱼ).`, ask: `φ${'₀₁₂₃'[i]}(${fq(d.xstar)}) =`, start: { math: ph.text }, judge: { kind: 'value', form: 'irreducible', lagrange: { nodenom: String(ph.num), v: String(ph.den) }, ...(menu ? { menu: menu('phi') } : {}) } });
    const line = { kind: 'eq', math: v, note: `Numérateur ${fq(ph.num)}, dénominateur ${fq(ph.den)}`, subgoal: 'basis' };
    out.push(guided ? { ...line, ...blankBy(v, [v]) } : line);
  });
  const phis = d.xs.map((_, i) => phiParts(d.xs, i, d.xstar).value);
  const sum = d.ys.map((y, i) => `${P(y)}×${P(phis[i])}`).join('+');
  const line = { kind: 'eq', math: String(d.px), note: 'p = Σ yᵢφᵢ', subgoal: 'eval' };
  out.push({ kind: 'segment', html: `p(${fq(d.xstar)}) = Σ yᵢ·φᵢ(${fq(d.xstar)}).`, ask: `p(${fq(d.xstar)}) =`, start: { math: sum }, judge: { kind: 'value', form: 'irreducible', ...(menu ? { menu: menu('sum') } : {}) } });
  out.push(guided ? { ...line, ...blankBy(String(d.px), [String(d.px)]) } : line);
  return out;
}

function split(script) {
  const [seg, ...rest] = script;
  return { start: seg.start.math, judge: seg.judge, script: seg.html ? [{ kind: 'note', html: seg.html }, ...rest] : rest };
}

const MENU = [
  { id: 'system', label: 'Écrire et résoudre le système de Vandermonde', why: 'Pas maintenant.' },
  { id: 'phi', label: 'Évaluer une fonction de base φᵢ en x*', why: 'Pas maintenant.' },
  { id: 'sum', label: 'Sommer yᵢ·φᵢ(x*)', why: 'Il faut d\'abord les φᵢ(x*).' },
  { id: 'eval', label: 'Évaluer p en x*', why: 'Il faut d\'abord p.' },
];
const menuOf = (id) => MENU.map((o) => ({ id: o.id, label: o.label, valid: o.id === id, why: o.id === id ? undefined : o.why }));

function lg1(rng) {
  const d = lgData(rng, { consecutive: true });
  const { start, judge, script } = split([...vanderSegs(d, { guided: true }), ...evalSeg(d, { guided: true })]);
  return linesItem({
    skill: LG, level: 1, mode: 'guided', keys: KEYS,
    prompt: `Le polynôme p(x) = a₀ + a₁x + a₂x² passe par ${ptsText(d.xs, d.ys)}. Système de Vandermonde : ${systemHtml(d)}. Trouve a₂, a₁, a₀, puis p(${fq(d.xstar)}).`,
    start, judge, script,
    hints: H('Soustrais les équations deux à deux : a₀ disparaît, puis a₁.', `a₂ = (y₂ − 2y₁ + y₀)/2 = (${fq(d.ys[2])} − 2·${P(d.ys[1])} + ${P(d.ys[0])})/□`, `a₂ = ${fq(d.a[2])}, a₁ = ${fq(d.a[1])}, a₀ = ${fq(d.a[0])} ; p = ${polyText(d.a)}.`),
    subgoals: SUB_LG, key: `${LG}:1:${d.xs}:${d.ys}`, fallback: d.fallback,
  });
}

function lg2(rng) {
  const d = lgData(rng, { consecutive: true });
  const decision = {
    kind: 'decision', prompt: `On ne veut que p(${fq(d.xstar)}). Quelle méthode ?`, options: [
      { id: 'lag', label: 'Lagrange : p(x*) = Σ yᵢ·φᵢ(x*)', valid: true, ref: true },
      { id: 'van', label: 'Vandermonde : résoudre le système, puis évaluer', valid: true, quality: 'poor', why: 'Juste aussi, mais il faut résoudre un système ; pour une seule valeur, Lagrange est plus direct.' },
    ],
  };
  const segs = phiSegs(d, { guided: true });
  const { start, judge, script } = split(segs);
  return linesItem({
    skill: LG, level: 2, mode: 'guided', keys: KEYS,
    prompt: `Points ${ptsText(d.xs, d.ys)}. Calcule p(${fq(d.xstar)}), où p est le polynôme d'interpolation de degré ≤ 2.`,
    start, judge, script: [decision, ...script],
    hints: H('φᵢ vaut 1 en xᵢ et 0 aux autres nœuds : un produit de (x − xⱼ), divisé par sa valeur en xᵢ.', `φ₀(x*) = ${phiParts(d.xs, 0, d.xstar).text.replace(/\/\(.*$/, '')}/(□)`, `φ(x*) = ${d.xs.map((_, i) => fq(phiParts(d.xs, i, d.xstar).value)).join(' ; ')}, p(x*) = ${fq(d.px)}.`),
    subgoals: SUB_LG, key: `${LG}:2:${d.xs}:${d.ys}`, fallback: d.fallback,
  });
}

function lg3(rng) {
  const d = lgData(rng);
  const [x0, x1, x2] = d.xs.map(fq);
  const decision = {
    kind: 'decision', prompt: 'Quelle est la fonction de base φ₁ ?', options: [
      { id: 'ok', label: `φ₁(x) = (x − ${x0})(x − ${x2})/((${x1} − ${x0})(${x1} − ${x2}))`, valid: true, ref: true },
      { id: 'noden', label: `φ₁(x) = (x − ${x0})(x − ${x2})`, valid: false, rule: 'n_lagrange_no_denominator', why: `φ₁ doit valoir 1 en x₁ = ${x1} : il faut diviser par (${x1} − ${x0})(${x1} − ${x2}).` },
      { id: 'one', label: `φ₁(x) = (x − ${x1})/(${x0} − ${x1})`, valid: false, why: 'φ₁ s\'annule aux autres nœuds x₀ et x₂, pas en x₁.' },
    ],
  };
  const { start, judge, script } = split(phiSegs(d, { menu: menuOf }));
  return linesItem({
    skill: LG, level: 3, mode: 'tap', tapActions: 'menu', keys: KEYS,
    prompt: `Points ${ptsText(d.xs, d.ys)}. Calcule p(${fq(d.xstar)}) par la formule de Lagrange. Choisis d'abord chaque action.`,
    start, judge, script: [decision, ...script],
    hints: H('φᵢ(x*) = Π (x* − xⱼ)/(xᵢ − xⱼ), le produit sur les j ≠ i.', `φ₁(x*) = ${phiParts(d.xs, 1, d.xstar).text.replace(/\/\(.*$/, '')}/(□)`, `φ₁(x*) = ${fq(phiParts(d.xs, 1, d.xstar).value)} ; p(x*) = ${fq(d.px)}.`),
    subgoals: SUB_LG, key: `${LG}:3:${d.xs}:${d.ys}`, baits: ['n_lagrange_no_denominator'], fallback: d.fallback,
  });
}

// The Lagrange form, expanded (judge equiv, target expanded).
function lagrangeForm(d) {
  return d.xs.map((xi, i) => {
    const den = d.xs.reduce((s, xj, j) => (j === i ? s : s.mul(q(xi).sub(xj))), new Q(1));
    const facs = d.xs.filter((_, j) => j !== i).map((xj) => `(x-${P(xj)})`).join('');
    return `${P(d.ys[i])}×${facs}/${P(den)}`;
  }).join('+');
}

function lg4(rng) {
  const d = lgData(rng);
  const segs = [
    ...vanderSegs(d, {}),
    { kind: 'segment', html: 'La forme de Lagrange, développée : on doit retrouver le même p.', ask: 'p(x) =', start: { math: lagrangeForm(d) }, judge: { kind: 'equiv', vars: ['x'], target: 'expanded' } },
    { kind: 'eq', math: polyText(d.a).replace(/−/g, '-').replace(/²/g, '^2').replace(/ /g, ''), note: 'Le même polynôme', subgoal: 'poly' },
    ...evalSeg(d, {}),
  ];
  const { start, judge, script } = split(segs);
  return linesItem({
    skill: LG, level: 4, mode: 'free', keys: KEYS,
    prompt: `Points ${ptsText(d.xs, d.ys)}. Système de Vandermonde : ${systemHtml(d)}. Trouve p(x) = a₀ + a₁x + a₂x², vérifie-le en développant la forme de Lagrange, puis calcule p(${fq(d.xstar)}).`,
    start, judge, script,
    hints: H('Élimine a₀ en soustrayant les équations, puis a₁.', `a₂ = □ ; p(x) = a₀ + a₁x + a₂x²`, `p(x) = ${polyText(d.a)}, p(${fq(d.xstar)}) = ${fq(d.px)}.`),
    subgoals: SUB_LG, key: `${LG}:4:${d.xs}:${d.ys}`, fallback: d.fallback,
  });
}

// ---------- the program ----------

const LAGRANGE = refCode(`def lagrange_eval(xs, ys, x):
    n = len(xs)
    p = 0.0
    for i in range(n):
        phi = 1.0
        for j in range(n):
            if j != i:
                phi = phi * «(x - xs[j]) / (xs[i] - xs[j])»
        p = p + «ys[i] * phi»
    return p
`);
const LG_TRAPS = { 0: [{ text: 'x - xs[j]', rule: 'n_lagrange_no_denominator' }, { text: '(x - xs[i]) / (xs[j] - xs[i])' }], 1: [{ text: 'phi' }] };
const LG_FILLERS = { 0: ['(x - xs[j]) / (xs[i] - x)'], 1: ['ys[i] + phi'] };
const LG_TESTS = [
  { expr: 'lagrange_eval([0, 1, 2], [12, 18, 6], 0.5)', expect: '17.25' },
  { expr: 'lagrange_eval([0, 1, 2, 3], [1, 2, 5, 10], 1.5)', expect: '3.25' },
  { expr: 'lagrange_eval([-1, 0, 1], [1, 0, 1], 0.5)', expect: '0.25' },
];

function lgCode(rng, level) {
  const d = lgData(rng);
  const xsT = `[${d.xs.join(', ')}]`;
  const ysT = `[${d.ys.map((y) => String(y.valueOf())).join(', ')}]`;
  const tVals = [...d.xs, d.xstar.valueOf()];
  const table = {
    columns: ['t', `lagrange_eval(${xsT}, ${ysT}, t)`],
    rows: tVals.map((t) => [String(t).replace('.', ','), expText(lagrangeEval(d.xs, d.ys.map((y) => y.valueOf()), t), 6)]),
  };
  // p(x*) computed without the denominators Π(xᵢ − xⱼ).
  const wrongNoDen = d.xs.reduce((s, _, i) => s.add(q(d.ys[i]).mul(phiParts(d.xs, i, d.xstar).num)), new Q(0));
  const then = readtableItem({
    skill: LG, level, key: `${d.xs}:${d.ys}`,
    prompt: 'Le programme complet affiche :', table,
    question: multiMcq({
      skill: LG, level, key: `${LG}:read:${d.xs}:${d.ys}`,
      prompt: `Que lit-on dans ce tableau ? (le polynôme d'interpolation est p(x) = ${polyText(d.a)})`,
      options: [
        { html: 'Aux nœuds, le programme redonne les yᵢ : p interpole les données', correct: true },
        { html: `p(${fq(d.xstar)}) = ${fq(d.px)}`, correct: true },
        ...(wrongNoDen.eq(d.px) ? [] : [{ html: `p(${fq(d.xstar)}) = Σ yᵢ·Π(x* − xⱼ) = ${fq(wrongNoDen)}`, correct: false, rule: 'n_lagrange_no_denominator' }]),
        { html: 'Le programme calcule les coefficients a₀, a₁, a₂', correct: false },
      ],
      solution: [{ html: `Le programme évalue p = Σ yᵢφᵢ en x, sans calculer les aᵢ ; chaque φᵢ est divisé par Π(xᵢ − xⱼ), sinon on obtiendrait ${fq(wrongNoDen)} au lieu de ${fq(d.px)}.`, note: '' }],
    }, rng),
  });
  const blanks = level >= 5 ? holesFor(5, LAGRANGE) : [0];
  return codeItem({
    skill: LG, level, ref: LAGRANGE, blanks, choice: level === 1 ? 0 : undefined, traps: LG_TRAPS, fillers: LG_FILLERS, rng,
    prompt: 'Complète la fonction qui évalue en x le polynôme d\'interpolation des points (xs[i] ; ys[i]) par la formule de Lagrange.',
    tests: LG_TESTS, then: level >= 5 ? then : null,
    hints: H('phi est le produit des (x − xⱼ)/(xᵢ − xⱼ) pour j ≠ i.', 'phi = phi * (x − xs[j]) / (□)', 'phi = phi * (x - xs[j]) / (xs[i] - xs[j])'),
    subgoals: SUB_LG, key: `${level}:${d.xs}:${d.ys}`, fallback: d.fallback,
  });
}

// ---------- exam ----------

function lgMcq(rng, opts) {
  const d = lgData(rng);
  const ph = phiParts(d.xs, 1, d.xstar);
  return mcqDistinct({
    skill: LG, level: 4, key: `${LG}:mcq:${d.xs}:${d.xstar}`, exam: examTag(opts),
    prompt: `Nœuds x₀ = ${fq(d.xs[0])}, x₁ = ${fq(d.xs[1])}, x₂ = ${fq(d.xs[2])}. Que vaut la fonction de base de Lagrange φ₁ en ${fq(d.xstar)} ?`,
    right: fq(ph.value),
    wrongs: [{ html: fq(ph.num), rule: 'n_lagrange_no_denominator' }, { html: fq(ph.value.neg()) }],
    fillers: [{ html: fq(phiParts(d.xs, 0, d.xstar).value) }, { html: fq(phiParts(d.xs, 2, d.xstar).value) }, { html: fq(ph.value.mul(2)) }, { html: '1' }],
    solution: [{ html: `φ₁(x*) = ${ph.text.replace(/-/g, '−')} = ${fq(ph.num)}/${P(ph.den)} = ${fq(ph.value)}.`, note: '' }],
  }, rng);
}

function lgTf(rng, opts) {
  return tfItem({
    skill: LG, level: 4, key: 'deg3', exam: examTag(opts),
    statement: 'Par 4 points d\'abscisses distinctes passe un unique polynôme de degré 3.',
    truth: false,
    counter: { kind: 'num', prop: 'interpDegreeLow', params: {}, ask: [{ v: 'pts', label: 'Points (x ; y), séparés par des virgules :' }], answer: { pts: '(0 ; 0), (1 ; 1), (2 ; 2), (3 ; 3)' } },
    explanation: 'Faux : il passe un unique polynôme de degré <b>≤ 3</b>. Par (0 ; 0), (1 ; 1), (2 ; 2), (3 ; 3), c\'est p(x) = x, de degré 1.',
  });
}

function lgCoef(rng, opts) {
  const d = lgData(rng);
  const v = String(d.a[2]);
  const item = linesItem({
    skill: LG, level: 4, mode: 'free', keys: KEYS, noHints: true, exam: examTag(opts),
    prompt: `p(x) = a₀ + a₁x + a₂x² passe par ${ptsText(d.xs, d.ys)}. Donne le coefficient de x² de p.`,
    start: 'a_2', judge: { kind: 'value', expect: v, form: 'irreducible', vander: { coeffs: d.a.map(String), k: 2, x0: String(d.xs[1]), y0: String(d.ys[1]) } },
    script: [{ kind: 'eq', math: v, note: `p(x) = ${polyText(d.a)}` }],
    subgoals: SUB_LG, key: `${LG}:coef:${d.xs}:${d.ys}`, baits: ['n_vandermonde_order'], fallback: d.fallback,
    expectedSec: 150,
  });
  item.final = { form: 'any', askCoef: { label: 'a_2' } };
  return item;
}

// ======================================================================
// n-divided-diff
// ======================================================================

const SUB_DD = [
  { id: 'dd1', label: 'différences d\'ordre 1', skill: DD },
  { id: 'dd2', label: 'différences d\'ordre 2', skill: DD },
  { id: 'form', label: 'la forme de Newton', skill: DD },
  { id: 'horner', label: 'évaluer par Horner', skill: 'g0-horner' },
  { id: 'interp', label: 'le polynôme d\'interpolation', skill: LG },
];
const ORD = '₀₁₂₃';

function ddData(rng, n = 3) {
  for (let t = 0; t < 200; t++) {
    const d = lgData(rng, { n: 3 });
    if (n === 3) return d;
    // A 4th point: its new coefficient c ∈ {±1, ±2, ±1/2}.
    const rest = [-2, -1, 0, 1, 2, 3, 4].filter((x) => !d.xs.includes(x));
    const x3 = rng.pick(rest);
    const c = q(rng.pick([1, -1, 2, -2]), rng.pick([1, 1, 2]));
    const prod = d.xs.reduce((s, xj) => s.mul(q(x3).sub(xj)), new Q(1));
    const y3 = evalPoly(d.a, x3).add(c.mul(prod));
    if (!y3.isInt() || Math.abs(y3.valueOf()) > 80) continue;
    return { ...d, xs4: [...d.xs, x3], ys4: [...d.ys, y3], c };
  }
  return { a: [12, 15, -9], xs: [0, 1, 2], ys: [q(12), q(18), q(6)], xstar: q(1, 2), px: q(69, 4), n: 3, xs4: [0, 1, 2, 3], ys4: [q(12), q(18), q(6), q(0)], c: q(4), fallback: true };
}

const DD_COLS = (n) => [{ id: 'x', label: 'xᵢ' }, { id: 'd0', label: 'f[xᵢ]' }, { id: 'd1', label: 'ordre 1' }, { id: 'd2', label: 'ordre 2' }, ...(n === 4 ? [{ id: 'd3', label: 'ordre 3' }] : [])];
const ddPhi = (xs, ys) => ({ kind: 'divdiff', xs: xs.map(String), ys: ys.map(String), tol: 1e-9 });
const coefsOf = (xs, ys) => {
  const c = ys.map(q);
  for (let k = 1; k < xs.length; k++) for (let i = xs.length - 1; i >= k; i--) c[i] = c[i].sub(c[i - 1]).div(q(xs[i]).sub(xs[i - k]));
  return c;
};
const factorT = (x) => (q(x).n === 0 ? 'x' : q(x).n > 0 ? `(x − ${fq(x)})` : `(x + ${fq(q(x).neg())})`);
const newtonText = (xs, c) => {
  const parts = c.map((ck, k) => { const v = q(ck); const abs = v.n < 0 ? v.neg() : v; return { neg: v.n < 0, zero: v.n === 0, s: `${k > 0 && abs.eq(1) ? "" : (k > 0 && !abs.isInt() ? `(${fq(abs)})` : fq(abs))}${xs.slice(0, k).map(factorT).join("")}` }; });
  const kept = parts.filter((t) => !t.zero);
  if (!kept.length) return '0';
  return kept.map((t, i) => (i === 0 ? (t.neg ? `−${t.s}` : t.s) : `${t.neg ? '−' : '+'} ${t.s}`)).join(' ');
};

function ddTable(rng, level, { n = 3, givenRows = 0, onlyD1 = false, then = null, prompt, hints, baits = [] }) {
  const d = ddData(rng, n);
  const xs = n === 4 ? d.xs4 : d.xs;
  const ys = n === 4 ? d.ys4 : d.ys;
  const item = iterTable({
    skill: DD, level, key: `${level}:${xs}:${ys}`, n: xs.length, cols: onlyD1 ? DD_COLS(n).slice(0, 3) : DD_COLS(n),
    prompt: prompt(xs, ys, d),
    phi: ddPhi(xs, ys),
    given: (k, id) => id === 'x' || id === 'd0' || k < givenRows,
    rowLabel: (k) => `i = ${k}`,
    then: then ? then(d, xs, ys) : null,
    hints, subgoals: SUB_DD, baits, fallback: d.fallback,
  });
  return item;
}

function dd1(rng) {
  return ddTable(rng, 1, {
    onlyD1: true,
    prompt: (xs, ys) => `Points ${ptsText(xs, ys)}. Remplis la colonne des différences d'ordre 1 : f[xᵢ₋₁, xᵢ] = (f[xᵢ] − f[xᵢ₋₁])/(xᵢ − xᵢ₋₁).`,
    then: (d, xs, ys) => {
      const c = coefsOf(xs, ys);
      const d1 = ys.map((y, i) => (i ? q(y).sub(ys[i - 1]).div(q(xs[i]).sub(xs[i - 1])) : null));
      const bad = d1[2].sub(d1[1]).div(q(xs[2]).sub(xs[1]));
      return mcqDistinct({
        skill: DD, level: 1, key: `${DD}:1then:${xs}:${ys}`,
        prompt: `Et la différence d'ordre 2, f[x₀, x₁, x₂] = (f[x₁, x₂] − f[x₀, x₁])/(x₂ − x₀) ?`,
        right: fq(c[2]),
        wrongs: [{ html: fq(bad), rule: 'n_divdiff_denominator' }, { html: fq(d1[2].sub(d1[1])) }],
        fillers: [{ html: fq(c[2].neg()) }, { html: fq(c[1]) }, { html: '0' }],
        solution: [{ html: `(${fq(d1[2])} − ${P(d1[1])})/(${fq(xs[2])} − ${P(xs[0])}) = ${fq(c[2])} : on divise par l'écart des abscisses extrêmes.`, note: '' }],
      }, rng);
    },
    hints: H('Chaque case est une pente : la différence des deux cases voisines de la colonne d\'avant, divisée par l\'écart des abscisses.', 'f[x₀, x₁] = (f[x₁] − f[x₀])/(□ − □)', 'Les pentes entre points voisins.'),
    baits: ['n_divdiff_denominator'],
  });
}

function dd2(rng) {
  return ddTable(rng, 2, {
    prompt: (xs, ys) => `Points ${ptsText(xs, ys)}. Remplis la table des différences divisées, puis évalue la forme de Newton.`,
    then: (d, xs, ys) => {
      const c = coefsOf(xs, ys);
      const start = `${P(c[0])}+${P(c[1])}×(${P(d.xstar)}-${P(xs[0])})+${P(c[2])}×(${P(d.xstar)}-${P(xs[0])})×(${P(d.xstar)}-${P(xs[1])})`;
      return linesItem({
        skill: DD, level: 2, mode: 'guided', keys: KEYS, noHints: true,
        prompt: `p(x) = ${newtonText(xs, c)}. Calcule p(${fq(d.xstar)}).`,
        start, judge: { kind: 'value', form: 'irreducible' },
        script: [{ kind: 'eq', math: String(d.px), ...blankBy(String(d.px), [String(d.px)]), note: 'Forme de Newton évaluée', subgoal: 'form' }],
        subgoals: SUB_DD, key: `${DD}:2then:${xs}:${ys}`,
      });
    },
    hints: H('Colonne d\'ordre k : (case de gauche − case de gauche au-dessus)/(xᵢ − xᵢ₋ₖ).', 'f[x₀, x₁, x₂] = (f[x₁, x₂] − f[x₀, x₁])/(x₂ − □)', 'Les coefficients de Newton sont la diagonale : la première case de chaque colonne.'),
    baits: ['n_divdiff_denominator'],
  });
}

// L3: read the coefficients on a printed table.
function ddReadTable(xs, ys) {
  const n = xs.length;
  const c = ys.map(q);
  const cols = [ys.map(q)];
  for (let k = 1; k < n; k++) {
    const prev = cols[k - 1];
    cols.push(prev.map((v, i) => (i >= k ? v.sub(prev[i - 1]).div(q(xs[i]).sub(xs[i - k])) : null)));
  }
  void c;
  return {
    columns: ['xᵢ', 'f[xᵢ]', ...Array.from({ length: n - 1 }, (_, k) => `ordre ${k + 1}`)],
    rows: xs.map((x, i) => [fq(x), ...cols.map((col) => (col[i] === null ? '' : fq(col[i])))]),
    cols,
  };
}

function dd3(rng) {
  const d = ddData(rng, 3);
  const t = ddReadTable(d.xs, d.ys);
  const diag = t.cols.map((col, k) => col[k]);
  const last = t.cols.map((col) => col[d.xs.length - 1]);
  const html = (cs) => newtonText(d.xs, cs);
  return readtableItem({
    skill: DD, level: 3, key: `${d.xs}:${d.ys}`,
    prompt: `Table des différences divisées des points ${ptsText(d.xs, d.ys)}.`,
    table: { columns: t.columns, rows: t.rows },
    question: mcqDistinct({
      skill: DD, level: 3, key: `${DD}:3q:${d.xs}:${d.ys}`,
      prompt: 'Quelle est la forme de Newton du polynôme d\'interpolation ?',
      right: html(diag),
      wrongs: [{ html: html(last) }, { html: newtonText([...d.xs].reverse(), diag) }],
      fillers: [{ html: html(diag.map((x, k) => (k === 2 ? x.neg() : x))) }, { html: html([diag[0], diag[1], q(0)]) }],
      solution: [{ html: `Les coefficients sont la diagonale du haut : ${diag.map(fq).join(', ')} ; p = ${html(diag)}.`, note: '' }],
    }, rng),
    hints: H('Les coefficients de Newton sont les premières cases de chaque colonne (f[x₀], f[x₀, x₁], f[x₀, x₁, x₂]).', 'p = f[x₀] + f[x₀, x₁](x − x₀) + □·(x − x₀)(x − x₁)', `p = ${html(diag)}.`),
    subgoals: SUB_DD, fallback: d.fallback,
  });
}

function dd4(rng) {
  return ddTable(rng, 4, {
    n: 4, givenRows: 3,
    prompt: (xs, ys) => `On ajoute le point (${fq(xs[3])} ; ${fq(ys[3])}) aux points ${ptsText(xs.slice(0, 3), ys.slice(0, 3))}. Complète la dernière ligne de la table, puis mets p à jour.`,
    then: (d, xs, ys) => {
      const c = coefsOf(xs, ys);
      const p3 = evalPoly(d.a, d.xstar).add(c[3].mul(xs.slice(0, 3).reduce((s, x) => s.mul(q(d.xstar).sub(x)), new Q(1))));
      return linesItem({
        skill: DD, level: 4, mode: 'free', keys: KEYS, noHints: true,
        prompt: `p₂(x) = ${newtonText(xs.slice(0, 3), c.slice(0, 3))} et p₂(${fq(d.xstar)}) = ${fq(d.px)}. Que vaut p₃(${fq(d.xstar)}) ?`,
        start: `p_3`, judge: { kind: 'value', expect: String(p3), form: 'irreducible' },
        script: [{ kind: 'eq', math: String(p3), note: `p₃ = p₂ + ${fq(c[3])}·(x − x₀)(x − x₁)(x − x₂)`, subgoal: 'form' }],
        subgoals: SUB_DD, key: `${DD}:4then:${xs}:${ys}`,
      });
    },
    hints: H('Un point de plus ajoute une ligne à la table et un terme à p : p₃ = p₂ + f[x₀, …, x₃](x − x₀)(x − x₁)(x − x₂).', 'f[x₂, x₃] = (y₃ − y₂)/(x₃ − □)', 'Le nouveau coefficient est la dernière case de la ligne ajoutée.'),
    baits: ['n_divdiff_denominator'],
  });
}

const DIVDIFF = refCode(`def divdiff(xs, ys):
    n = len(xs)
    c = []
    for i in range(n):
        c.append(ys[i])
    for k in range(1, n):
        for i in range(n - 1, k - 1, -1):
            c[i] = «(c[i] - c[i - 1]) / (xs[i] - xs[i - k])»
    return c

def newton_eval(xs, c, x):
    n = len(c)
    p = c[n - 1]
    for i in range(n - 2, -1, -1):
        p = «p * (x - xs[i]) + c[i]»
    return p
`);
const DD_TRAPS = { 0: [{ text: '(c[i] - c[i - 1]) / (xs[i] - xs[i - 1])', rule: 'n_divdiff_denominator' }, { text: '(c[i] - c[i - 1]) / (xs[i - k] - xs[i])' }], 1: [{ text: 'p * x + c[i]' }] };
const DD_FILLERS = { 0: ['(c[i] - c[i - 1]) / k'], 1: ['p + c[i] * (x - xs[i])'] };
const DD_TESTS = [
  { expr: 'divdiff([0, 1, 2], [12, 18, 6])', expect: '[12, 6, -9]' },
  { expr: 'divdiff([0, 1, 2, 3], [12, 18, 6, 0])', expect: '[12, 6, -9, 4]' },
  { expr: 'divdiff([0, 1, 3], [1, 2, 10])', expect: '[1, 1, 1]' },
  { expr: 'newton_eval([0, 1, 2, 3], [12, 6, -9, 4], 0.5)', expect: '18.75' },
];

function dd5(rng) {
  const d = ddData(rng, 4);
  const c = coefsOf(d.xs4, d.ys4);
  const xsT = `[${d.xs4.join(', ')}]`;
  const ysT = `[${d.ys4.map((y) => String(y)).join(', ')}]`;
  const wrongC = d.ys4.map(q);
  for (let k = 1; k < 4; k++) for (let i = 3; i >= k; i--) wrongC[i] = wrongC[i].sub(wrongC[i - 1]).div(q(d.xs4[i]).sub(d.xs4[i - 1]));
  const then = readtableItem({
    skill: DD, level: 5, key: `${d.xs4}:${d.ys4}`,
    prompt: `Le programme complet, appelé avec xs = ${xsT} et ys = ${ysT}, affiche :`,
    table: { columns: ['c[0]', 'c[1]', 'c[2]', 'c[3]'], rows: [c.map((x) => expText(x.valueOf(), 6))] },
    question: mcqDistinct({
      skill: DD, level: 5, key: `${DD}:5q:${d.xs4}:${d.ys4}`,
      prompt: 'Quel est le polynôme d\'interpolation de ces 4 points ?',
      right: newtonText(d.xs4, c),
      wrongs: [{ html: newtonText(d.xs4, wrongC), rule: wrongC.every((x, k) => x.eq(c[k])) ? undefined : 'n_divdiff_denominator' }, { html: newtonText(d.xs4, [...c].reverse()) }],
      fillers: [{ html: newtonText(d.xs4, c.map((x, k) => (k === 3 ? x.neg() : x))) }, { html: newtonText(d.xs4, c.map((x, k) => (k === 1 ? x.neg() : x))) }],
      solution: [{ html: `c = (${c.map(fq).join(' ; ')}) sont les coefficients de Newton : p = ${newtonText(d.xs4, c)}.`, note: '' }],
    }, rng),
  });
  return codeItem({
    skill: DD, level: 5, ref: DIVDIFF, blanks: holesFor(5, DIVDIFF), traps: DD_TRAPS, rng,
    prompt: 'Complète le calcul des différences divisées (en place, de bas en haut) et l\'évaluation de la forme de Newton par Horner.',
    tests: DD_TESTS, then, hints: [], subgoals: SUB_DD, key: `5:${d.xs4}:${d.ys4}`, fallback: d.fallback,
  });
}

function ddMcq(rng, opts) {
  if (rng.chance(0.5)) {
    return codeMcq({
      skill: DD, ref: DIVDIFF, hole: 0, traps: DD_TRAPS, fillers: DD_FILLERS, key: 'dd', exam: examTag(opts),
      prompt: 'La fonction divdiff calcule en place les coefficients de la forme de Newton.',
    }, rng);
  }
  const d = ddData(rng, 3);
  const c = coefsOf(d.xs, d.ys);
  const d1 = d.ys.map((y, i) => (i ? q(y).sub(d.ys[i - 1]).div(q(d.xs[i]).sub(d.xs[i - 1])) : null));
  const bad = d1[2].sub(d1[1]).div(q(d.xs[2]).sub(d.xs[1]));
  return mcqDistinct({
    skill: DD, level: 4, key: `${DD}:mcq:${d.xs}:${d.ys}`, exam: examTag(opts),
    prompt: `Points ${ptsText(d.xs, d.ys)}. Que vaut la différence divisée f[x₀, x₁, x₂] ?`,
    right: fq(c[2]),
    wrongs: [{ html: fq(bad), rule: 'n_divdiff_denominator' }, { html: fq(d1[2].sub(d1[1])) }],
    fillers: [{ html: fq(c[2].neg()) }, { html: fq(c[1]) }, { html: fq(c[2].mul(2)) }],
    solution: [{ html: `f[x₀, x₁] = ${fq(d1[1])}, f[x₁, x₂] = ${fq(d1[2])}, puis (${fq(d1[2])} − ${P(d1[1])})/(${fq(d.xs[2])} − ${P(d.xs[0])}) = ${fq(c[2])}.`, note: '' }],
  }, rng);
}

export const GEN = {
  [LG]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return lgMcq(rng, opts);
    if (opts.exam === 'tf') return lgTf(rng, opts);
    if (opts.exam === 'coef') return lgCoef(rng, opts);
    switch (level) {
      case 1: return lg1(rng);
      case 2: return lg2(rng);
      case 3: return lg3(rng);
      case 4: return lg4(rng);
      default: return lgCode(rng, 5);
    }
  },
  [DD]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return ddMcq(rng, opts);
    switch (level) {
      case 1: return dd1(rng);
      case 2: return dd2(rng);
      case 3: return dd3(rng);
      case 4: return dd4(rng);
      default: return dd5(rng);
    }
  },
};

export { ORD, lgCode };

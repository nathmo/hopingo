// n-interp-piecewise and n-spline (module N, part c, step U9). Catalogue:
// docs/universite/N-analyse-numerique.md.
//
// n-interp-piecewise. Data: f(x) = kx³ + αx² on [0 ; b] (f″ = 6kx + 2α ≥ 0
// increases, so max|f″| = 6kb + 2α), h chosen in {1/2, 1/4, 1/5, 1/8, 1/10,
// 1/20} with b/h whole, and tol = h²·max|f″|/8 (a finite decimal): the
// smallest n is b/h. For the evaluation: whole data (xᵢ ; yᵢ) and x* inside
// a sub-interval. L1 M, h and n guided; L2 the same, M to find; L3 the
// sub-interval (decision), then Π₁ʰf(x*), with menus; L4 everything free;
// L5 the program p1h, then the table of sin on [0 ; π] (order 2). Exam: tf
// (« diviser h par 2 divise l'erreur par 2 », counter-example f).
// n-spline. Data: nodes −1, 0, 1; (a, b, c) with a, b ∈ {−3, …, 3} and c ∈
// (3/2)ℤ*, |c| ≤ 6; y(−1) = a − b + 2c/3, y(0) = a, y(1) = a + b + 2c/3
// (whole). s = a + bx + cx² + d₁x³ on [−1 ; 0], a + bx + cx² + d₂x³ on
// [0 ; 1], d₁ = c/3, d₂ = −c/3. Each coefficient is a part `value`. L1 the
// formulas given, guided; L2 the boundary conditions to choose, then
// guided; L3 the extra conditions (decision), menus; L4 free; L5 the table
// of the natural spline of sin (order 4). Exam: mcq (degrees of freedom),
// tf.

import { t } from '../../i18n.js';
import { linesItem, mcq, tfItem, examTag } from './kit.js';
import { mcqDistinct } from './alglin-kit.js';
import { refCode, codeItem, holesFor, readtableItem, multiMcq, expText, blankBy, vfMcq } from './numerique-kit.js';
import { q, fq, H, p1Rows, splineRows } from './numerique-c-kit.js';

const PW = 'n-interp-piecewise';
const SP = 'n-spline';
const KEYS = ['calc'];
const P = (x) => (q(x).n < 0 ? `(${q(x)})` : `${q(x)}`);
const dec = (x) => {
  const d = q(x).toDecimal();
  return d ?? fq(x);
};
const PR = (x) => (q(x).n < 0 ? `(${fq(x)})` : fq(x));
const decT = (x) => (q(x).toDecimal() ?? String(q(x))).replace(',', '.');

function split(script) {
  const [seg, ...rest] = script;
  return { start: seg.start.math, judge: seg.judge, script: seg.html ? [{ kind: 'note', html: seg.html }, ...rest] : rest };
}
const menuOf = (menu, id) => menu.map((o) => ({ id: o.id, label: o.label, valid: o.id === id, why: o.id === id ? undefined : t('Pas maintenant : ce n\'est pas l\'étape suivante.') }));

// ======================================================================
// n-interp-piecewise
// ======================================================================

const SUB_PW = [
  { id: 'max', label: t('max|f″| sur [a ; b]'), skill: 'a1-extrema-global' },
  { id: 'bound', label: t('la borne h²/8·max|f″|'), skill: PW },
  { id: 'n', label: t('le nombre de sous-intervalles'), skill: PW },
  { id: 'eval', label: t('évaluer Π₁ʰf'), skill: PW },
  { id: 'error', label: t('erreur d\'interpolation de degré 1'), skill: 'n-interp-error' },
];
const PMENU = [
  { id: 'max', label: t('Majorer |f″| sur l\'intervalle') },
  { id: 'h', label: t('Résoudre h²/8·max|f″| ≤ tol') },
  { id: 'n', label: t('En déduire n') },
  { id: 'eval', label: t('Interpoler sur le bon sous-intervalle') },
];

const polyF = (k, al) => `${k === 1 ? '' : k}x³${al ? ` + ${al === 1 ? '' : al}x²` : ''}`;

function pwData(rng) {
  for (let t = 0; t < 200; t++) {
    const k = rng.pick([1, 2]);
    const al = rng.pick([0, 0, 1, 3]);
    const b = rng.pick([1, 2, 3]);
    const h = q(1, rng.pick([2, 4, 5, 8, 10, 20]));
    const n = q(b).div(h);
    if (!n.isInt() || n.n < 2 || n.n > 60) continue;
    const M = 6 * k * b + 2 * al;
    const tol = q(M).mul(h.mul(h)).div(8);
    const dd = tol.toDecimal();
    if (!dd || dd.replace(/\D/g, '').replace(/^0+/, '').length > 4) continue;
    return { k, al, b, h, n: n.n, M, tol };
  }
  return { k: 1, al: 0, b: 2, h: q(1, 10), n: 20, M: 12, tol: q(15, 1000), fallback: true };
}

// Whole data for the evaluation: 4 nodes, x* inside one sub-interval.
function evalData(rng) {
  for (let t = 0; t < 200; t++) {
    const xs = [0];
    for (let i = 0; i < 3; i++) xs.push(xs[i] + rng.pick([1, 2, 2, 3]));
    const ys = xs.map(() => rng.int(-4, 9));
    const i = rng.int(0, 2);
    const span = xs[i + 1] - xs[i];
    const xstar = span === 1 ? q(2 * xs[i] + 1, 2) : q(xs[i] + rng.int(1, span - 1));
    const v = q(ys[i]).add(q(ys[i + 1] - ys[i]).mul(xstar.sub(xs[i])).div(span));
    if (v.d > 4) continue;
    return { xs, ys, i, xstar, v };
  }
  return { xs: [0, 1, 3, 4], ys: [1, 3, 2, 5], i: 1, xstar: q(2), v: q(5, 2) };
}

function pwBoundSegs(d, { guided = false, menu = false } = {}) {
  const g = (line) => (guided ? { ...line, ...blankBy(line.math, [line.math]) } : line);
  const M = (id) => (menu ? { menu: menuOf(PMENU, id) } : {});
  return [
    { kind: 'segment', html: t('M = max|f″| sur [0 ; {b}].', { b: d.b }), ask: 'M =', start: { math: 'M' }, judge: { kind: 'value', expect: String(d.M), form: 'irreducible', ...M('max') } },
    g({ kind: 'eq', math: String(d.M), note: t('f″(x) = {f} croît : maximum en x = {b}', { f: `${6 * d.k}x${d.al ? ` + ${2 * d.al}` : ''}`, b: d.b }), subgoal: 'max' }),
    { kind: 'segment', html: `h²/8·M ≤ ${dec(d.tol)} ⇔ h ≤ √(8·tol/M).`, ask: 'h =', start: { math: `√(8×${decT(d.tol)}/${d.M})` }, judge: { kind: 'value', form: 'irreducible', p1: { tol: decT(d.tol), M: String(d.M) }, ...M('h') } },
    g({ kind: 'eq', math: String(d.h), note: t('Le plus grand pas permis : {h}', { h: dec(d.h) }), subgoal: 'bound' }),
    { kind: 'segment', html: t('n = (b − a)/h sous-intervalles.'), ask: 'n =', start: { math: `${d.b}/(${d.h})` }, judge: { kind: 'value', form: 'irreducible', ...M('n') } },
    g({ kind: 'eq', math: String(d.n), note: `n ≥ ${d.b}/${dec(d.h)}`, subgoal: 'n' }),
  ];
}

function pwEvalSegs(e, { decision = false, menu = false } = {}) {
  const i = e.i;
  const out = [];
  if (decision) {
    out.push({
      kind: 'decision', prompt: t('Dans quel sous-intervalle se trouve x* = {x} ?', { x: fq(e.xstar) }), options: e.xs.slice(0, -1).map((x, j) => ({
        id: `s${j}`, label: `[${x} ; ${e.xs[j + 1]}]`, valid: j === i, ...(j === i ? { ref: true } : { why: t('{x} n\'est pas dans [{a} ; {b}].', { x: fq(e.xstar), a: x, b: e.xs[j + 1] }) }),
      })),
    });
  }
  const start = `${P(e.ys[i])}+(${P(e.ys[i + 1])}-${P(e.ys[i])})×(${P(e.xstar)}-${e.xs[i]})/(${e.xs[i + 1]}-${e.xs[i]})`;
  out.unshift({ kind: 'segment', html: t('Π₁ʰf(x*) : la droite entre ({x0} ; {y0}) et ({x1} ; {y1}).', { x0: e.xs[i], y0: fq(e.ys[i]), x1: e.xs[i + 1], y1: fq(e.ys[i + 1]) }), ask: `Π₁ʰf(${fq(e.xstar)}) =`, start: { math: start }, judge: { kind: 'value', form: 'irreducible', ...(menu ? { menu: menuOf(PMENU, 'eval') } : {}) } });
  out.push({ kind: 'eq', math: String(e.v), note: 'yᵢ + (yᵢ₊₁ − yᵢ)(x* − xᵢ)/(xᵢ₊₁ − xᵢ)', subgoal: 'eval' });
  return out;
}

const pwHints = (d) => H(
  t('Sur chaque morceau, c\'est l\'interpolation de degré 1 : l\'erreur fait intervenir f″ et h², avec le facteur 1/8.'),
  `(h²/8)·${d.M} ≤ ${dec(d.tol)} ⇔ h² ≤ □`,
  `M = ${d.M}, h = ${dec(d.h)}, n = ${d.n}.`,
);
const evalText = (e) => t('Données : {pts}.', { pts: e.xs.map((x, j) => `(${x} ; ${fq(e.ys[j])})`).join(', ') });

function pwLines(rng, level) {
  const d = pwData(rng);
  if (level === 3) {
    const e = evalData(rng);
    const { start, judge, script } = split(pwEvalSegs(e, { decision: true, menu: true }));
    // The decision first, then the line.
    const dec0 = script.find((l) => l.kind === 'decision');
    return linesItem({
      skill: PW, level, mode: 'tap', tapActions: 'menu', keys: KEYS,
      prompt: `${evalText(e)} ${t('Calcule l\'interpolant linéaire par morceaux Π₁ʰf en x* = {x}. Choisis d\'abord le sous-intervalle.', { x: fq(e.xstar) })}`,
      start, judge, script: [dec0, ...script.filter((l) => l !== dec0)],
      hints: H(t('Π₁ʰf est la droite qui joint les deux nœuds voisins de x*.'), `Π₁ʰf(x*) = ${fq(e.ys[e.i])} + (${fq(e.ys[e.i + 1])} − ${PR(e.ys[e.i])})·(x* − ${e.xs[e.i]})/□`, `Π₁ʰf(${fq(e.xstar)}) = ${fq(e.v)}.`),
      subgoals: SUB_PW, key: `${PW}:3:${e.xs}:${e.ys}:${e.xstar}`,
    });
  }
  const segs = pwBoundSegs(d, { guided: level <= 2 });
  let extra = [];
  let e = null;
  if (level === 4) { e = evalData(rng); extra = pwEvalSegs(e); extra[0] = { ...extra[0], html: `${evalText(e)} ${extra[0].html}` }; }
  const { start, judge, script } = split([...segs, ...extra]);
  const given = level === 1 ? t(' On donne f″(x) = {f}.', { f: `${6 * d.k}x${d.al ? ` + ${2 * d.al}` : ''}` }) : '';
  return linesItem({
    skill: PW, level, mode: level <= 2 ? 'guided' : 'free', keys: KEYS,
    prompt: t('f(x) = {f} sur [0 ; {b}], interpolée linéairement par morceaux avec un pas h. Combien de sous-intervalles faut-il au moins pour garantir une erreur ≤ {tol} ? (max|f − Π₁ʰf| ≤ (h²/8)·max|f″|)', { f: polyF(d.k, d.al), b: d.b, tol: dec(d.tol) }) + given + (level === 4 ? t(' Puis évalue un interpolant.') : ''),
    start, judge, script,
    hints: pwHints(d), subgoals: SUB_PW, baits: ['n_p1_bound'],
    key: `${PW}:${level}:${d.k}:${d.al}:${d.b}:${d.h}${e ? `:${e.xs}:${e.ys}` : ''}`, fallback: d.fallback,
  });
}

const P1H = refCode(`def p1h(xs, ys, x):
    for i in range(len(xs) - 1):
        if «xs[i] <= x and x <= xs[i + 1]»:
            return «ys[i] + (ys[i + 1] - ys[i]) * (x - xs[i]) / (xs[i + 1] - xs[i])»
    return None
`);
const P1H_TRAPS = { 0: [{ text: 'xs[i] <= x' }, { text: 'x <= xs[i + 1]' }], 1: [{ text: 'ys[i] + (ys[i + 1] - ys[i]) * (x - xs[i])' }, { text: '(ys[i] + ys[i + 1]) / 2' }] };
const P1H_TESTS = [
  { expr: 'p1h([0, 1, 3], [1, 3, 2], 2)', expect: '2.5' },
  { expr: 'p1h([0, 1, 2, 4], [0, 1, 4, 16], 3)', expect: '10.0' },
  { expr: 'p1h([0, 2, 5], [4, 0, 6], 1.5)', expect: '1.0' },
  { expr: 'p1h([0, 1, 2], [0, 1, 4], -1)', expect: 'None' },
];

let P1T = null;
function p1Table() {
  P1T ||= p1Rows();
  return { columns: ['n', t('erreur max'), 'h²/8'], rows: P1T.map((r) => [String(r.n), expText(r.err, 3), expText(r.bound, 3)]) };
}

function pw5(rng) {
  const tb = p1Table();
  const then = readtableItem({
    skill: PW, level: 5, key: 'sin',
    prompt: t('Avec ce programme, on interpole f = sin sur [0 ; π] en n sous-intervalles (h = π/n). Erreur maximale et borne h²/8·max|f″| :'),
    table: tb,
    question: multiMcq({
      skill: PW, level: 5, key: `${PW}:5q`,
      prompt: t('Que lit-on dans ce tableau ?'),
      options: [
        { html: t('L\'erreur est divisée par environ 4 quand n double : ordre 2'), correct: true },
        { html: t('La borne h²/8·max|f″| est respectée'), correct: true },
        { html: t('L\'erreur est divisée par 2 quand n double : ordre 1'), correct: false },
        { html: t('La borne est très pessimiste (10 fois trop grande)'), correct: false },
      ],
      solution: [{ html: t('{e0} → {e1} : rapport ≈ 3,7, puis ≈ 3,9 et 4 : ordre 2. Chaque erreur est sous h²/8 (max|sin″| = 1).', { e0: tb.rows[0][1], e1: tb.rows[1][1] }), note: '' }],
    }, rng),
  });
  return codeItem({
    skill: PW, level: 5, ref: P1H, blanks: holesFor(5, P1H), traps: P1H_TRAPS, rng,
    prompt: t('Complète la fonction qui évalue en x l\'interpolant linéaire par morceaux des données (xs[i] ; ys[i]), les xs étant croissants.'),
    tests: P1H_TESTS, then, hints: [], subgoals: SUB_PW, key: '5',
  });
}

function pwTf(rng, opts) {
  return tfItem({
    skill: PW, level: 4, key: 'half', exam: examTag(opts), truth: false,
    statement: t('Diviser h par 2 divise par 2 l\'erreur max|f − Π₁ʰf| de l\'interpolation linéaire par morceaux.'),
    counter: { kind: 'num', prop: 'p1Ratio', params: {}, ask: [{ v: 'f', label: t('f(x) = (sur [0 ; 1])') }], answer: { f: 'x^2' } },
    explanation: t('Faux : l\'erreur est en h²/8·max|f″| ; elle est divisée par 4. Pour f(x) = x² sur [0 ; 1], elle vaut exactement h²/4 : 1/64 pour h = 1/4, 1/256 pour h = 1/8.'),
  });
}

// ======================================================================
// n-spline
// ======================================================================

const SUB_SP = [
  { id: 'continuity', label: t('les raccords en 0'), skill: SP },
  { id: 'natural', label: t('s″ = 0 aux bords'), skill: SP },
  { id: 'interp', label: t('les conditions d\'interpolation'), skill: SP },
  { id: 'solve', label: t('résoudre le système'), skill: 'l-sys-echelon' },
  { id: 'pieces', label: t('les deux morceaux'), skill: SP },
  { id: 'pw', label: t('interpolation par morceaux'), skill: 'n-interp-piecewise' },
];
const SMENU = [
  { id: 'interp', label: t('Écrire les conditions d\'interpolation') },
  { id: 'solve', label: t('Résoudre en b et c') },
  { id: 'natural', label: t('Appliquer s″(±1) = 0') },
];

function spData(rng) {
  for (let t = 0; t < 200; t++) {
    const a = rng.int(-3, 3);
    const b = rng.int(-3, 3);
    const c = q(3 * rng.pick([-4, -3, -2, -1, 1, 2, 3, 4]), 2);
    const twoC3 = c.mul(2).div(3);
    const ym = q(a - b).add(twoC3);
    const yp = q(a + b).add(twoC3);
    if (!ym.isInt() || !yp.isInt()) continue;
    return { a: q(a), b: q(b), c, d1: c.div(3), d2: c.div(3).neg(), ym, y0: q(a), yp };
  }
  return { a: q(1), b: q(1), c: q(-3, 2), d1: q(-1, 2), d2: q(1, 2), ym: q(-1), y0: q(1), yp: q(1), fallback: true };
}
const ptsSp = (d) => `(−1 ; ${fq(d.ym)}), (0 ; ${fq(d.y0)}), (1 ; ${fq(d.yp)})`;
const cub = (a, b, c, dd) => {
  const terms = [[a, ''], [b, 'x'], [c, 'x²'], [dd, 'x³']];
  const parts = terms.filter(([v]) => q(v).n !== 0).map(([v, m]) => {
    const abs = q(v).n < 0 ? q(v).neg() : q(v);
    const coef = m && abs.eq(1) ? '' : !abs.isInt() && m ? `(${fq(abs)})` : fq(abs);
    return { neg: q(v).n < 0, s: `${coef}${m}` };
  });
  if (!parts.length) return '0';
  return parts.map((p, i) => (i === 0 ? (p.neg ? `−${p.s}` : p.s) : `${p.neg ? '−' : '+'} ${p.s}`)).join(' ');
};
const piecesHtml = (d) => t('s(x) = {p1} sur [−1 ; 0] et {p2} sur [0 ; 1]', { p1: cub(d.a, d.b, d.c, d.d1), p2: cub(d.a, d.b, d.c, d.d2) });

function spSegs(d, { guided = false, formulas = false, menu = false } = {}) {
  const g = (line) => (guided ? { ...line, ...blankBy(line.math, [line.math]) } : line);
  const M = (id) => (menu ? { menu: menuOf(SMENU, id) } : {});
  const seg = (name, ask, expect, html, startF) => ({ kind: 'segment', html, ask, start: { math: formulas && name !== 'a' ? startF : name }, judge: formulas && name !== 'a' ? { kind: 'value', form: 'irreducible', ...M(menuIdOf[name]) } : { kind: 'value', expect: String(expect), form: 'irreducible', ...M(menuIdOf[name]) } });
  return [
    seg('a', 'a =', d.a, 's(0) = a.', String(d.a)),
    g({ kind: 'eq', math: String(d.a), note: `s(0) = y(0) = ${fq(d.y0)}`, subgoal: 'interp' }),
    seg('b', 'b =', d.b, 's(1) − s(−1) = 2b.', `(${P(d.yp)}-${P(d.ym)})/2`),
    g({ kind: 'eq', math: String(d.b), note: `(${fq(d.yp)} − ${PR(d.ym)})/2`, subgoal: 'solve' }),
    seg('c', 'c =', d.c, 's(1) + s(−1) = 2a + 4c/3.', `3×(${P(d.yp)}+${P(d.ym)}-2×${P(d.a)})/4`),
    g({ kind: 'eq', math: String(d.c), note: t('Car d₂ = −d₁ : les termes en x³ s\'annulent dans la somme'), subgoal: 'solve' }),
    seg('d_1', 'd₁ =', d.d1, 's″(−1) = 2c − 6d₁ = 0.', `(${P(d.c)})/3`),
    g({ kind: 'eq', math: String(d.d1), note: 'd₁ = c/3', subgoal: 'natural' }),
    seg('d_2', 'd₂ =', d.d2, 's″(1) = 2c + 6d₂ = 0.', `-(${P(d.c)})/3`),
    g({ kind: 'eq', math: String(d.d2), note: 'd₂ = −c/3', subgoal: 'pieces' }),
  ];
}
const menuIdOf = { a: 'interp', b: 'solve', c: 'solve', d_1: 'natural', d_2: 'natural' };

const spHints = (d) => H(
  t('Écris les 3 conditions de raccord en 0 (valeur, pente, courbure : mêmes a, b, c), puis s″ = 0 aux deux bouts, puis les données.'),
  `s″(−1) = 2c − 6d₁ = □ ; s(1) − s(−1) = □·b`,
  `a = ${fq(d.a)}, b = ${fq(d.b)}, c = ${fq(d.c)}, d₁ = ${fq(d.d1)}, d₂ = ${fq(d.d2)}.`,
);
const SP_FORM = t('s(x) = a + bx + cx² + d₁x³ sur [−1 ; 0] et a + bx + cx² + d₂x³ sur [0 ; 1] (les raccords C² en 0 donnent les mêmes a, b, c)');

function spLines(rng, level) {
  const d = spData(rng);
  const decisionNatural = {
    kind: 'decision', prompt: t('Spline naturelle : quelles conditions aux bords x = −1 et x = 1 ?'), options: [
      { id: 'nat', label: 's″(−1) = s″(1) = 0', valid: true, ref: true },
      { id: 'slope', label: 's′(−1) = s′(1) = 0', valid: false, rule: 'n_spline_natural_first', why: t('Spline naturelle : la courbure s″ est nulle aux bords, pas la pente.') },
      { id: 'none', label: t('Aucune : les conditions d\'interpolation suffisent'), valid: false, rule: 'n_spline_count', why: t('4·2 = 8 inconnues, 3 raccords et 3 données : il reste 2 conditions à fixer.') },
    ],
  };
  const decisionExtra = {
    kind: 'decision', prompt: t('Il reste 2 degrés de liberté. Lesquels fixent la spline naturelle ?'), options: [
      { id: 'nat', label: t('Courbure nulle aux deux bouts'), valid: true, ref: true },
      { id: 'clamp', label: t('Pentes imposées aux deux bouts'), valid: false, rule: 'n_spline_natural_first', why: t('C\'est la spline « encastrée » : la naturelle a s″ = 0 aux bords.') },
      { id: 'knot', label: t('Même cubique sur les deux morceaux (not-a-knot)'), valid: false, why: t('C\'est une autre spline ; la naturelle a s″ = 0 aux bords.') },
    ],
  };
  const opts = level === 1 ? { guided: true, formulas: true } : level === 2 ? { guided: true } : level === 3 ? { menu: true } : {};
  const { start, judge, script } = split(spSegs(d, opts));
  const pre = level === 2 ? [decisionNatural] : level === 3 ? [decisionExtra] : [];
  return linesItem({
    skill: SP, level, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', keys: KEYS, ...(level === 3 ? { tapActions: 'menu' } : {}),
    prompt: t('Spline cubique naturelle des points {pts} : {form}. Trouve a, b, c, d₁ et d₂.', { pts: ptsSp(d), form: SP_FORM }),
    start, judge, script: [...pre, ...script, { kind: 'note', html: `${piecesHtml(d)}.` }],
    hints: spHints(d), subgoals: SUB_SP, baits: level === 2 || level === 3 ? ['n_spline_natural_first'] : [],
    key: `${SP}:${level}:${d.a}:${d.b}:${d.c}`, fallback: d.fallback,
  });
}

let SPT = null;
function spTable() {
  SPT ||= splineRows();
  return { columns: ['n', 'max|sin − s|'], rows: SPT.map((r) => [String(r.n), expText(r.err, 3)]) };
}

function sp5(rng) {
  const tb = spTable();
  return readtableItem({
    skill: SP, level: 5, key: 'sin',
    prompt: t('Spline cubique naturelle de sin sur [0 ; π], n sous-intervalles. Elle est exacte au bord, puisque sin″ = 0 en 0 et en π.'),
    table: tb,
    question: mcqDistinct({
      skill: SP, level: 5, key: `${SP}:5q`,
      prompt: t('Quel est l\'ordre de convergence observé ?'),
      right: t('4 (rapport ≈ 16 quand n double)'),
      wrongs: [{ html: t('16 (le rapport)') }, { html: t('2 (comme l\'interpolation linéaire)') }, { html: t('3 (le degré des morceaux)') }],
      solution: [{ html: t('{e0}/{e1} ≈ 17, puis ≈ 16 : 2⁴ = 16, donc ordre 4.', { e0: tb.rows[0][1], e1: tb.rows[1][1] }), note: '' }],
    }, rng),
    subgoals: SUB_SP,
  });
}

function spMcq(rng, opts) {
  const n = rng.pick([2, 3, 4, 5, 6]);
  return mcqDistinct({
    skill: SP, level: 4, key: `${SP}:mcq:${n}`, exam: examTag(opts),
    prompt: t('Une spline cubique interpole {n1} points (donc {n} sous-intervalles). On impose la continuité de s, s′ et s″ aux nœuds intérieurs. Combien de degrés de liberté reste-t-il ?', { n1: n + 1, n }),
    right: '2',
    wrongs: [{ html: '0', rule: 'n_spline_count' }, { html: '1', rule: 'n_spline_count' }, { html: '3', rule: 'n_spline_count' }],
    solution: [{ html: t('{u} inconnues − 3·{r} raccords − {d} données = 2.', { u: 4 * n, r: n - 1, d: n + 1 }), note: '' }],
  }, rng);
}

function spTf(rng, opts) {
  if (rng.chance(0.5)) {
    return vfMcq({
      skill: SP, level: 4, key: `${SP}:tf:slope`, exam: examTag(opts), truth: false, ruleIfTrue: 'n_spline_natural_first',
      statement: t('Une spline cubique naturelle a une dérivée s′ nulle aux deux extrémités.'),
      explanation: t('Faux : c\'est s″ qui est nulle aux bords. Pour (−1 ; −1), (0 ; 1), (1 ; 1), s′(−1) = 1 + 3 − 3/2 = 5/2 ≠ 0.'),
    }, rng);
  }
  return tfItem({
    skill: SP, level: 4, key: 'c2', exam: examTag(opts), truth: true,
    statement: t('Une spline cubique est de classe C² sur [a ; b] : s, s′ et s″ sont continues aux nœuds.'),
    explanation: t('Vrai : ce sont les 3(n − 1) conditions de raccord.'),
  });
}

export const GEN = {
  [PW]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'tf') return pwTf(rng, opts);
    if (level <= 4) return pwLines(rng, level);
    return pw5(rng);
  },
  [SP]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return spMcq(rng, opts);
    if (opts.exam === 'tf') return spTf(rng, opts);
    if (level <= 4) return spLines(rng, level);
    return sp5(rng);
  },
};

export { mcq, piecesHtml };

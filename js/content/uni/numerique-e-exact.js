// n-quad-exactness and n-quad-order (module N, part e, step U9).
// Catalogue: docs/universite/N-analyse-numerique.md.
//
// n-quad-exactness. A formula J on [−1 ; 1], symmetric (nodes ±√s with
// rational s): g(±1/√3), g(±1/2), g(±1), 2g(0), Simpson (1/3, 4/3, 1/3),
// Simpson 3/8 (nodes ±1, ±1/3), the trapezoid in two pieces, Gauss at 3
// points (±√(3/5)). J(tᵏ) and ∫tᵏ are exact numbers; the degree r is the
// last k before a monomial fails. Lines judged by `value` (cfg.expect):
// one part per monomial, then « r = ». L1 J(tᵏ) to fill (the integrals
// given); L2 the integrals and J(tᵏ); L3 after each monomial, « test the
// next one » or « conclude » (n_exactness_stop_early); L4 the weights of
// ω₀g(−1) + ω₁g(β) + ω₂g(1) (moments of order 0, 1, 2, solved exactly),
// then r; L5 the program gauss2 (Gauss at 2 points, composite, with the
// change of variable x = xᵢ + h(t + 1)/2), then its outputs to read.
// Exam: mcq with several answers (exact on Pₖ, the order of the composite
// formula), tf on the change of variable (2020, question 16).
//
// n-quad-order. Error tables of the composite formulas (rectangle, point
// milieu, trapèze, Simpson, Gauss 2 points) for e⁻ˣ sin x on [0 ; 2] (the
// GM series 7), eˣ, 1/(1 + x²) on [0 ; 1], cos x on [0 ; π/2], n = 10, 20,
// 40, 80 (computed here). L1 a column and its ratios, choose p; L2 the ratio
// and p to write; L3 match a column to a method; L4 r from the exactness,
// then p (n_exactness_order); L5 a column of an unknown method, several
// answers. Exam: mcq (order from the degree of exactness), tf « le trapèze
// est plus précis que le point milieu » (false; counter-example kind num,
// trapNotBetter).

import { t } from '../../i18n.js';
import { linesItem, mcq, tfItem, examTag } from './kit.js';
import { refCode, codeItem, holesFor, readtableItem, multiMcq, vfMcq, tableHtml, blankBy } from './numerique-kit.js';
import { q, qd, qR, H, etraps, METHODS, FUNS, NS, errOf, E3, r2 } from './numerique-e-kit.js';

const EX = 'n-quad-exactness';
const OR = 'n-quad-order';
const KEYS = ['calc'];

// ---------- formulas on [−1 ; 1] ----------

// pairs: weight w on g(−√s) and on g(√s); w0 on g(0).
const FORMS = [
  { id: 'g2', html: 'J(g) = g(−1/√3) + g(1/√3)', w0: q(0), pairs: [{ w: q(1), s: q(1, 3), node: '1/√3' }] },
  { id: 'half', html: 'J(g) = g(−1/2) + g(1/2)', w0: q(0), pairs: [{ w: q(1), s: q(1, 4), node: '1/2' }] },
  { id: 'ends', html: 'J(g) = g(−1) + g(1)', w0: q(0), pairs: [{ w: q(1), s: q(1), node: '1' }] },
  { id: 'mid', html: 'J(g) = 2g(0)', w0: q(2), pairs: [] },
  { id: 'simp', html: 'J(g) = (1/3)g(−1) + (4/3)g(0) + (1/3)g(1)', w0: q(4, 3), pairs: [{ w: q(1, 3), s: q(1), node: '1' }] },
  { id: 'trap2', html: 'J(g) = (1/2)g(−1) + g(0) + (1/2)g(1)', w0: q(1), pairs: [{ w: q(1, 2), s: q(1), node: '1' }] },
  { id: 's38', html: 'J(g) = (1/4)g(−1) + (3/4)g(−1/3) + (3/4)g(1/3) + (1/4)g(1)', w0: q(0), pairs: [{ w: q(1, 4), s: q(1), node: '1' }, { w: q(3, 4), s: q(1, 9), node: '1/3' }] },
  { id: 'g3', html: 'J(g) = (5/9)g(−√(3/5)) + (8/9)g(0) + (5/9)g(√(3/5))', w0: q(8, 9), pairs: [{ w: q(5, 9), s: q(3, 5), node: '√(3/5)' }] },
];
const fq = (x) => String(q(x)).replace(/-/g, '−');
const intT = (k) => (k % 2 ? q(0) : q(2, k + 1));
function Jmono(F, k) {
  if (k % 2) return q(0);
  let s = k === 0 ? F.w0 : q(0);
  for (const p of F.pairs) s = s.add(p.w.mul(2).mul(p.s.pow(k / 2)));
  return s;
}
function degreeOf(F) {
  for (let k = 0; k < 12; k++) if (!Jmono(F, k).eq(intT(k))) return k - 1;
  return 11;
}
// J(tᵏ) written with the nodes (CAS input): (−1/√3)^2+(1/√3)^2.
function Jexpr(F, k) {
  const wt = (w) => (w.eq(1) ? '' : `${String(w)}×`);
  const node = (p) => (p.node.includes('/') || p.node.includes('√') ? `(${p.node})` : p.node);
  if (k === 0) return [...F.pairs.map((p) => String(p.w)), ...(F.w0.eq(0) ? [] : [String(F.w0)]), ...F.pairs.map((p) => String(p.w)).reverse()].join('+');
  return [
    ...F.pairs.map((p) => `${wt(p.w)}(-${p.node})^${k}`),
    ...(F.w0.eq(0) ? [] : [`${wt(F.w0)}0^${k}`]),
    ...F.pairs.map((p) => `${wt(p.w)}${node(p)}^${k}`).reverse(),
  ].join('+');
}
const sup = (k) => ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷'][k];
const tk = (k) => (k === 0 ? '1' : k === 1 ? 't' : `t${sup(k)}`);
const pickForm = (rng, maxR = 3) => rng.pick(FORMS.filter((F) => degreeOf(F) <= maxR));

const SUB_E = [
  { id: 'monomial', label: t('tester un monôme'), skill: EX },
  { id: 'degree', label: t('conclure le degré'), skill: EX },
  { id: 'change-var', label: t('changement de variable'), skill: 'a1-int-subst' },
  { id: 'formula', label: t('formule composite'), skill: 'n-quad-composite' },
];

function exactLines(rng, level) {
  const F = pickForm(rng, 3);
  const r = degreeOf(F);
  const ks = Array.from({ length: r + 2 }, (_, k) => k);
  const shown = level === 2 ? ks.filter((k) => k % 2 === 0 || k === r + 1) : ks;
  const parts = [];
  for (const k of shown) {
    const J = Jmono(F, k);
    const I = intT(k);
    if (level === 2) {
      parts.push({ html: `∫₋₁¹ ${tk(k)} dt.`, ask: `∫${tk(k)} =`, start: `I_${k}`, judge: { kind: 'value', expect: String(I) }, lines: [{ kind: 'eq', math: String(I), note: k % 2 ? t('Fonction impaire') : k === 0 ? t('Longueur de [−1 ; 1]') : `2/${k + 1}`, subgoal: 'monomial', ...blankBy(String(I), [String(I)]) }] });
    }
    const lines = [];
    if (level >= 3 && Jexpr(F, k) !== String(J)) lines.push({ kind: 'eq', math: Jexpr(F, k), note: `J(${tk(k)})`, subgoal: 'monomial' });
    const same = J.eq(I);
    const vnote = level === 2 ? (same ? t('égal') : t('différent'))
      : same ? t('∫₋₁¹ {tk} dt = {I} ; égal', { tk: tk(k), I: fq(I) }) : t('∫₋₁¹ {tk} dt = {I} ; différent', { tk: tk(k), I: fq(I) });
    const vline = { kind: 'eq', math: String(J), note: vnote, subgoal: 'monomial' };
    if (level <= 2) Object.assign(vline, blankBy(String(J), [String(J)]));
    lines.push(vline);
    if (level === 3) {
      const last = k === r + 1;
      lines.push({
        kind: 'decision', prompt: t('J({tk}) = {J} et ∫₋₁¹ {tk} dt = {I}. Et maintenant ?', { tk: tk(k), J: fq(J), I: fq(I) }),
        options: last ? [
          { id: 'stop', label: t('Conclure : degré d\'exactitude {r}', { r }), valid: true, ref: true },
          { id: 'go', label: t('Tester {tk}', { tk: tk(k + 1) }), valid: false, why: t('J({tk}) ≠ ∫{tk} : le degré est atteint, c\'est {r}.', { tk: tk(k), r }) },
        ] : [
          { id: 'go', label: t('Tester {tk}', { tk: tk(k + 1) }), valid: true, ref: true },
          { id: 'stop', label: t('Conclure : degré d\'exactitude {r}', { r: k }), valid: false, rule: 'n_exactness_stop_early', why: t('J est exacte sur {tk}, mais le degré est atteint seulement quand un monôme échoue : teste {next}.', { tk: tk(k), next: tk(k + 1) }) },
        ],
      });
    }
    parts.push({ html: `J(${tk(k)}) =`, ask: `J(${tk(k)}) =`, start: `J_${k}`, judge: { kind: 'value', expect: String(J) }, lines });
  }
  const rline = { kind: 'eq', math: String(r), note: t('{tk} est le premier monôme qui échoue', { tk: tk(r + 1) }), subgoal: 'degree' };
  if (level <= 2) Object.assign(rline, blankBy(String(r), [String(r)]));
  parts.push({ html: t('Le degré d\'exactitude.'), ask: 'r =', start: 'r', judge: { kind: 'value', expect: String(r), ...etraps([['n_exactness_stop_early', r >= 1 ? [String(r - 1)] : [], { j3: `J(${tk(r)})`, i3: `∫${tk(r)}` }]]) }, lines: [rline] });
  const [p0, ...rest] = parts;
  const script = [{ kind: 'note', html: p0.html }, ...p0.lines];
  for (const p of rest) script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge: p.judge }, ...p.lines);
  return linesItem({
    skill: EX, level, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', keys: ['calc', 'calcfn'],
    prompt: level === 1
      ? t('{J}. Teste les monômes 1, t, t², … : compare J(tᵏ) à ∫₋₁¹ tᵏ dt (= 2/(k + 1) si k est pair, 0 si k est impair), puis donne le degré d\'exactitude r de J.', { J: F.html })
      : t('{J}. Teste les monômes 1, t, t², … : compare J(tᵏ) à ∫₋₁¹ tᵏ dt, puis donne le degré d\'exactitude r de J.', { J: F.html }),
    start: p0.start, judge: p0.judge, script,
    hints: H(t('Teste 1, t, t², … et compare à ∫ de −1 à 1. La première égalité qui échoue donne le degré + 1.'),
      t('J(t²) = {J} et ∫t² = □', { J: R(Jexpr(F, 2)) }),
      t('J(t²) = {J}, ∫t² = 2/3 ; le degré d\'exactitude est {r}.', { J: fq(Jmono(F, 2)), r })),
    subgoals: SUB_E, key: `${EX}:${level}:${F.id}`,
  });
}
function R(s) { return String(s).replace(/-/g, '−').replace(/\^(\d)/g, (m, d) => sup(Number(d))).replace(/×/g, '·'); }

// L4: the weights of ω₀g(−1) + ω₁g(β) + ω₂g(1).
function weightsOf(beta) {
  // ω₀ + ω₁ + ω₂ = 2 ; −ω₀ + βω₁ + ω₂ = 0 ; ω₀ + β²ω₁ + ω₂ = 2/3
  const b = q(beta);
  // From (1) − (3): ω₁(1 − β²) = 4/3.
  const w1 = q(4, 3).div(q(1).sub(b.mul(b)));
  const s = q(2).sub(w1); // ω₀ + ω₂
  const d = b.mul(w1).neg(); // ω₂ − ω₀
  const w2 = s.add(d).div(2);
  const w0 = s.sub(d).div(2);
  return [w0, w1, w2];
}
function weightsLines(rng) {
  const beta = rng.pick([q(0), q(1, 2), q(-1, 2), q(1, 3), q(-1, 3)]);
  const [w0, w1, w2] = weightsOf(beta);
  const J = (k) => w0.mul(q(-1).pow(k)).add(w1.mul(beta.pow(k))).add(w2);
  let r = 2;
  while (r < 8 && J(r + 1).eq(intT(r + 1))) r++;
  const bt = fq(beta);
  const sys = `ω₀ + ω₁ + ω₂ = 2 ; −ω₀ + ${beta.n < 0 ? `(${bt})` : bt}·ω₁ + ω₂ = 0 ; ω₀ + ${fq(beta.mul(beta))}·ω₁ + ω₂ = 2/3`;
  const parts = [
    ['ω_1', 'ω₁', w1, t('Équation (1) − (3) : ω₁(1 − β²) = 2 − 2/3')],
    ['ω_0', 'ω₀', w0, t('Avec ω₀ + ω₂ = 2 − ω₁ et ω₂ − ω₀ = −βω₁')],
    ['ω_2', 'ω₂', w2, t('Avec ω₀ + ω₂ = 2 − ω₁ et ω₂ − ω₀ = −βω₁')],
  ];
  const script = [{ kind: 'note', html: t('Exacte sur 1, t, t² : {sys}.', { sys }) }, { kind: 'eq', math: String(w1), note: parts[0][3], subgoal: 'monomial' }];
  for (const [nm, lab, val, note] of parts.slice(1)) {
    script.push({ kind: 'segment', html: `${lab} :`, ask: `${lab} =`, start: { math: nm }, judge: { kind: 'value', expect: String(val) } }, { kind: 'eq', math: String(val), note, subgoal: 'monomial' });
  }
  script.push(
    { kind: 'segment', html: t('Le degré d\'exactitude : {expr}.', { expr: `J(t³) = ${fq(J(3))} ${J(3).eq(0) ? '=' : '≠'} 0${J(3).eq(0) ? ` ; J(t⁴) = ${fq(J(4))} ≠ 2/5` : ''}` }), ask: 'r =', start: { math: 'r' }, judge: { kind: 'value', expect: String(r), ...etraps([['n_exactness_stop_early', [String(r - 1)], { j3: 'J(t³)', i3: '∫t³' }]]) } },
    { kind: 'eq', math: String(r), note: t('{tk} échoue', { tk: tk(r + 1) }), subgoal: 'degree' },
  );
  return linesItem({
    skill: EX, level: 4, mode: 'free', keys: ['calc', 'greek'],
    prompt: t('Trouve les poids de J(g) = ω₀g(−1) + ω₁g({b}) + ω₂g(1) pour que J soit exacte sur P₂ (∫₋₁¹), puis son degré d\'exactitude.', { b: bt }),
    start: 'ω_1', judge: { kind: 'value', expect: String(w1) }, script,
    hints: H(t('Écris J(1) = 2, J(t) = 0, J(t²) = 2/3 : trois équations en ω₀, ω₁, ω₂.'),
      `ω₁·(1 − ${fq(beta.mul(beta))}) = □`,
      t('ω₀ = {w0}, ω₁ = {w1}, ω₂ = {w2} ; degré {r}.', { w0: fq(w0), w1: fq(w1), w2: fq(w2), r })),
    subgoals: SUB_E, key: `${EX}:4:${beta}`,
  });
}

// ---------- the program gauss2 ----------

const GAUSS = refCode(`def gauss2(f, a, b, n):
    h = (b - a) / n
    al = 1 / math.sqrt(3)
    s = 0.0
    for i in range(n):
        xi = a + i * h
        # x = xi + h (t + 1) / 2, dx = h/2 dt, noeuds t = -al et t = al
        s = s + «h / 2» * (f(«xi + h / 2 * (1 - al)») + f(«xi + h / 2 * (1 + al)»))
    return s
`);
const GAUSS_TRAPS = { 0: [{ text: 'h', rule: 'n_map_jacobian' }], 1: [], 2: [] };
const GAUSS_FILL = { 0: ['1', '2 * h'], 1: ['xi - al', 'xi + al * h'] };
const GAUSS_WRONG = { 1: 'xi - al', 2: 'xi + al' };
const GAUSS_TESTS = [
  { setup: 'def g(x): return x**3', expr: 'gauss2(g, 0, 2, 1)', expect: '4.0', tol: 1e-12 },
  { setup: 'def g(x): return x**4', expr: 'gauss2(g, 0, 2, 1)', expect: '6.222222222222222', tol: 1e-12 },
  { setup: 'def g(x): return x**3 + x*x', expr: 'gauss2(g, -1, 3, 2)', expect: '29.333333333333336', tol: 1e-12 },
];

function gaussCode(rng, level) {
  const question = multiMcq({
    skill: EX, level, key: `${EX}:gaussread`,
    prompt: t('Sur [0 ; 2] avec n = 1, gauss2 donne 4 pour x³ (∫ = 4) et 56/9 ≈ 6,2222 pour x⁴ (∫ = 32/5 = 6,4). Qu\'en déduis-tu ?'),
    options: [
      { html: t('Gauss à 2 points est exacte sur P₃'), correct: true },
      { html: t('Elle n\'est pas exacte sur P₄'), correct: true },
      { html: t('La formule composite est d\'ordre 3'), correct: false, rule: 'n_exactness_order' },
      { html: t('Sans le facteur h/2, gauss2 donnerait encore 4 pour x³'), correct: false, rule: 'n_map_jacobian' },
    ],
    solution: [{ html: t('Exacte sur P₃, pas sur P₄ : degré d\'exactitude 3, donc la formule composite est d\'ordre 4. Sans h/2, on obtiendrait le double (8).'), note: '' }],
  }, rng);
  const then = readtableItem({ skill: EX, level, key: 'gauss', prompt: t('Les tests de ton programme :'), table: null, question });
  return codeItem({
    skill: EX, level, ref: GAUSS, blanks: holesFor(5, GAUSS), traps: GAUSS_TRAPS, fillers: GAUSS_FILL, wrong: GAUSS_WRONG, rng,
    prompt: t('Complète la formule de Gauss à 2 points composite : sur [xᵢ ; xᵢ + h], x = xᵢ + h(t + 1)/2 ramène à [−1 ; 1], et J(g) = g(−1/√3) + g(1/√3).'),
    tests: GAUSS_TESTS, then, hints: [], subgoals: SUB_E, key: `${level}`,
  });
}

// ---------- exam ----------

function exactMcq(rng, opts) {
  const F = rng.pick(FORMS);
  const r = degreeOf(F);
  const P = (k) => `P${['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇'][k]}`;
  const options = [
    { html: t('∫₋₁¹ p = J(p) pour tout p ∈ {P}', { P: P(r) }), correct: true },
    { html: t('∫₋₁¹ p = J(p) pour tout p ∈ {P}', { P: P(r + 1) }), correct: false },
    ...(r >= 1 ? [{ html: t('∫₋₁¹ p = J(p) pour tout p ∈ {P}', { P: P(r - 1) }), correct: true }] : []),
    { html: t('La formule composite associée est d\'ordre {p}', { p: r + 1 }), correct: true },
    { html: t('La formule composite associée est d\'ordre {p}', { p: r }), correct: false, rule: 'n_exactness_order' },
  ];
  return { ...multiMcq({ skill: EX, level: 4, key: `${EX}:mcq:${F.id}`, prompt: t('{J}. Que peut-on affirmer ?', { J: F.html }), options, exam: examTag(opts), solution: [{ html: t('J(tᵏ) = ∫₋₁¹ tᵏ dt jusqu\'à k = {r}, mais pas pour {tk} : degré d\'exactitude {r}, ordre composite {p}.', { r, tk: tk(r + 1), p: r + 1 }), note: '' }] }, rng) };
}

function exactTf(rng, opts) {
  const right = rng.chance(0.5);
  const st = (f) => t('Avec h = 1/N et xᵢ = ih (i = 0 … N − 1), ∫₀¹ f(x) dx = {f}·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt.', { f });
  if (right) {
    return tfItem({
      skill: EX, level: 4, key: 'cv-true', exam: examTag(opts), statement: st('(h/2)'), truth: true,
      explanation: t('Vrai : sur [xᵢ ; xᵢ + h], x = xᵢ + h(t + 1)/2 donne dx = (h/2)dt.'),
    });
  }
  return vfMcq({
    skill: EX, level: 4, key: `${EX}:cv-false`, exam: examTag(opts), statement: st('h'), truth: false, ruleIfTrue: 'n_map_jacobian',
    explanation: t('Faux : dx = (h/2)dt, le facteur est h/2 (avec h, on obtient le double).'),
  }, rng);
}

// ======================================================================
// n-quad-order
// ======================================================================

const SUB_O = [
  { id: 'ratio', label: t('rapport des erreurs'), skill: 'fn-affine' },
  { id: 'theory', label: t('ordre = degré + 1'), skill: OR },
  { id: 'exact', label: t('degré d\'exactitude'), skill: EX },
];
// Whole sentences per method (the name alone does not fit French grammar).
const L2_PROMPT = {
  rect: t('Calcule le rapport e(10)/e(20) des erreurs de la formule du rectangle (à gauche), puis l\'ordre p.'),
  mid: t('Calcule le rapport e(10)/e(20) des erreurs de la formule du point milieu, puis l\'ordre p.'),
  trap: t('Calcule le rapport e(10)/e(20) des erreurs de la formule du trapèze, puis l\'ordre p.'),
  simp: t('Calcule le rapport e(10)/e(20) des erreurs de la formule de Simpson, puis l\'ordre p.'),
};
const L3_PROMPT = {
  rect: t('Quelle colonne est celle de la formule du rectangle (à gauche) ?'),
  mid: t('Quelle colonne est celle de la formule du point milieu ?'),
  trap: t('Quelle colonne est celle de la formule du trapèze ?'),
  simp: t('Quelle colonne est celle de la formule de Simpson ?'),
};
const L4_PROMPT = {
  rect: t('La formule élémentaire du rectangle (à gauche) : donne son degré d\'exactitude r, puis l\'ordre p de la formule composite, et vérifie-le sur le tableau.'),
  mid: t('La formule élémentaire du point milieu : donne son degré d\'exactitude r, puis l\'ordre p de la formule composite, et vérifie-le sur le tableau.'),
  trap: t('La formule élémentaire du trapèze : donne son degré d\'exactitude r, puis l\'ordre p de la formule composite, et vérifie-le sur le tableau.'),
  simp: t('La formule élémentaire de Simpson : donne son degré d\'exactitude r, puis l\'ordre p de la formule composite, et vérifie-le sur le tableau.'),
  gauss2: t('La formule élémentaire de Gauss à 2 points : donne son degré d\'exactitude r, puis l\'ordre p de la formule composite, et vérifie-le sur le tableau.'),
};
const L4_COLUMN = {
  rect: t('erreur (formule rectangle (à gauche))'),
  mid: t('erreur (formule point milieu)'),
  trap: t('erreur (formule trapèze)'),
  simp: t('erreur (formule Simpson)'),
  gauss2: t('erreur (formule Gauss à 2 points)'),
};
const errCol = (m) => t('erreur ({name})', { name: METHODS[m].name });
// A %e value written out in decimals: 1.962e-03 → 0,001962.
const decOf = (x) => { const v = Number(E3(x)); return v.toFixed(Math.max(0, 3 - Math.floor(Math.log10(v)))).replace('.', ','); };
// The (function, method) pairs whose table shows the theoretical order:
// errors above 10⁻¹³, ratios within 25 % of 2ᵖ (Simpson on 1/(1 + x²)
// converges faster, in h⁶: excluded).
const PAIRS = FUNS.flatMap((F) => Object.keys(METHODS).filter((m) => {
  const e = NS.map((n) => errOf(F, m, n));
  const want = 2 ** METHODS[m].p;
  return e.every((x) => x >= 1e-13) && e.slice(1).every((x, i) => Math.abs(e[i] / x / want - 1) < 0.25);
}).map((m) => ({ F, m })));
const pickPair = (rng, ms) => rng.pick(PAIRS.filter((x) => ms.includes(x.m)));
const okFor = (F, ms) => ms.every((m) => PAIRS.some((x) => x.F === F && x.m === m));
const ratioOf = (F, m) => errOf(F, m, 10) / errOf(F, m, 20);
const tableOf = (F, ms, labels) => ({
  columns: ['n', ...labels],
  rows: NS.map((n) => [String(n), ...ms.map((m) => E3(errOf(F, m, n)))]),
});
const fPrompt = (F) => t('Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = {f} sur {ab}, avec n sous-intervalles (h = (b − a)/n) :', { f: F.text, ab: F.ab });

function orderMcqQ(rng, F, m, level, withRatio) {
  const p = METHODS[m].p;
  const ratio = ratioOf(F, m);
  const rr = Math.round(ratio);
  const opts = [{ html: `p = ${p}`, correct: true }];
  const seen = new Set([p]);
  if (!seen.has(rr)) { opts.push({ html: `p = ${rr}`, correct: false, rule: 'n_order_ratio_is_p' }); seen.add(rr); }
  for (const x of [1, 2, 3, 4, 8, 16]) { if (opts.length >= 4) break; if (!seen.has(x)) { opts.push({ html: `p = ${x}`, correct: false }); seen.add(x); } }
  return mcq({
    skill: OR, level, key: `${OR}:p:${F.id}:${m}`,
    prompt: withRatio ? t('Quel est l\'ordre p de la formule ?') : t('Quel est l\'ordre p de la formule (quand n double, l\'erreur est divisée par 2ᵖ) ?'),
    options: opts,
    solution: [{ html: t('Le rapport des erreurs quand n double est ≈ {r} ≈ 2{sup} : p = {p}.', { r: r2(ratio, 1), sup: sup(p), p }), note: '' }],
  }, rng);
}

function orderL1(rng, level) {
  const { F, m } = pickPair(rng, ['rect', 'mid', 'trap', 'simp', 'gauss2']);
  const errs = NS.map((n) => errOf(F, m, n));
  const table = { columns: ['n', errCol(m), t('rapport e(n/2)/e(n)')], rows: NS.map((n, i) => [String(n), E3(errs[i]), i ? r2(errs[i - 1] / errs[i]) : '']) };
  return readtableItem({
    skill: OR, level, key: `1:${F.id}:${m}`, prompt: fPrompt(F), table, question: orderMcqQ(rng, F, m, level, true),
    hints: H(t('n double, donc h est divisé par 2 : regarde par combien l\'erreur est divisée.'), t('2ᵖ = rapport ≈ □'), t('Rapport ≈ {r} = 2{sup} : p = {p}.', { r: r2(ratioOf(F, m), 1), sup: sup(METHODS[m].p), p: METHODS[m].p })),
    subgoals: SUB_O, baits: ['n_order_ratio_is_p'],
  });
}

function orderL2(rng) {
  const { F, m } = pickPair(rng, ['rect', 'mid', 'trap', 'simp']);
  const p = METHODS[m].p;
  const e10 = errOf(F, m, 10);
  const e20 = errOf(F, m, 20);
  const ratio = Number(E3(e10)) / Number(E3(e20));
  const rt = r2(ratio);
  const q2 = linesItem({
    skill: OR, level: 2, mode: 'guided', keys: KEYS,
    prompt: L2_PROMPT[m],
    start: 'ρ', judge: { kind: 'stat', expect: String(Number(ratio.toPrecision(7))).replace('.', ','), decimals: ratio < 10 ? 1 : 0 },
    script: [
      { kind: 'eq', math: `${decOf(e10)}/${decOf(e20)}`, note: 'e(10)/e(20)', subgoal: 'ratio' },
      { kind: 'eq', math: ratio < 10 ? rt : String(Math.round(ratio)), note: t('h divisé par 2'), subgoal: 'ratio' },
      { kind: 'segment', html: t('L\'ordre : 2ᵖ ≈ rapport.'), ask: 'p =', start: { math: 'p' }, judge: { kind: 'value', expect: String(p), ...etraps([['n_order_ratio_is_p', Math.round(ratio) !== p ? [String(Math.round(ratio))] : [], { r: rt, p: String(p) }]]) } },
      { kind: 'eq', math: String(p), note: `2${sup(p)} = ${2 ** p}`, subgoal: 'theory', ...blankBy(String(p), [String(p)]) },
    ],
    subgoals: SUB_O, key: `${OR}:2q:${F.id}:${m}`, hints: [],
  });
  return readtableItem({
    skill: OR, level: 2, key: `2:${F.id}:${m}`, prompt: fPrompt(F),
    table: tableOf(F, [m], [errCol(m)]), question: q2,
    hints: H(t('n double, donc h est divisé par 2 : l\'erreur est divisée par 2ᵖ.'), t('rapport = {a}/{b} ≈ □', { a: E3(e10), b: E3(e20) }), t('rapport ≈ {rt} ≈ {n} = 2{sup}, donc p = {p}.', { rt, n: 2 ** p, sup: sup(p), p })),
    subgoals: SUB_O, baits: ['n_order_ratio_is_p'],
  });
}

const LETTERS = ['A', 'B', 'C', 'D'];
function orderL3(rng) {
  const F = rng.pick(FUNS.filter((G) => okFor(G, ['rect', 'mid', 'trap', 'simp'])));
  const ms = rng.shuffle(['rect', 'mid', 'trap', 'simp']);
  const target = rng.pick(['rect', 'mid', 'simp', 'trap']);
  const options = ms.map((m, i) => ({ html: t('La colonne {L}', { L: LETTERS[i] }), correct: m === target }));
  const why = {
    rect: t('le rectangle est d\'ordre 1 : l\'erreur n\'est divisée que par 2'),
    simp: t('Simpson est d\'ordre 4 : l\'erreur est divisée par 16'),
    mid: t('point milieu et trapèze sont d\'ordre 2 (divisée par 4), et l\'erreur du point milieu est environ la moitié de celle du trapèze'),
    trap: t('point milieu et trapèze sont d\'ordre 2 (divisée par 4), et l\'erreur du trapèze est environ le double de celle du point milieu'),
  }[target];
  const q3 = mcq({ skill: OR, level: 3, key: `${OR}:col:${F.id}:${ms.join('')}:${target}`, prompt: L3_PROMPT[target], options, keepOrder: true, solution: [{ html: t('Colonne {L} : {why}.', { L: LETTERS[ms.indexOf(target)], why }), note: '' }] }, rng);
  return readtableItem({
    skill: OR, level: 3, key: `3:${F.id}:${ms.join('')}:${target}`, prompt: t('{intro} (les colonnes A à D sont le rectangle, le point milieu, le trapèze et Simpson, dans le désordre)', { intro: fPrompt(F) }),
    table: tableOf(F, ms, LETTERS), question: q3,
    hints: H(t('Calcule pour chaque colonne le rapport quand n double : 2 (ordre 1), 4 (ordre 2), 16 (ordre 4).'), t('rapport de la colonne A ≈ □'), t('C\'est la colonne {L} : {why}.', { L: LETTERS[ms.indexOf(target)], why })),
    subgoals: SUB_O, baits: [],
  });
}

function orderL4(rng) {
  const { F, m } = pickPair(rng, ['mid', 'trap', 'simp', 'gauss2', 'rect']);
  const { r, p } = METHODS[m];
  const q4 = linesItem({
    skill: OR, level: 4, mode: 'free', keys: KEYS,
    prompt: L4_PROMPT[m],
    start: 'r', judge: { kind: 'value', expect: String(r) },
    script: [
      { kind: 'eq', math: String(r), note: t('exacte sur {P}', { P: `P${['₀', '₁', '₂', '₃'][r]}` }), subgoal: 'theory' },
      { kind: 'segment', html: t('L\'ordre de la formule composite.'), ask: 'p =', start: { math: 'p' }, judge: { kind: 'value', expect: String(p), ...etraps([['n_exactness_order', [String(r)], { r: String(r) }]]) } },
      { kind: 'eq', math: String(p), note: t('r + 1 ; rapport ≈ {r} ≈ 2{sup}', { r: r2(ratioOf(F, m), 1), sup: sup(p) }), subgoal: 'theory' },
    ],
    subgoals: SUB_O, key: `${OR}:4q:${F.id}:${m}`, hints: [],
  });
  return readtableItem({
    skill: OR, level: 4, key: `4:${F.id}:${m}`, prompt: fPrompt(F),
    table: tableOf(F, [m], [L4_COLUMN[m]]), question: q4,
    hints: H(t('Exactitude de degré r ⇒ ordre r + 1 pour la formule composite.'), t('r = □, donc p = r + 1'), t('r = {r}, p = {p} : le rapport ≈ {ratio} ≈ {n}.', { r, p, ratio: r2(ratioOf(F, m), 1), n: 2 ** p })),
    subgoals: SUB_O, baits: ['n_exactness_order'],
  });
}

function orderL5(rng, opts = {}) {
  const { F, m } = pickPair(rng, ['mid', 'trap', 'simp', 'gauss2', 'rect']);
  const { p, r } = METHODS[m];
  const ratio = ratioOf(F, m);
  const options = rng.shuffle([
    { html: t('X est d\'ordre {p}', { p }), correct: true },
    { html: t('X est exacte sur {P} (degré d\'exactitude {r})', { P: `P${['₀', '₁', '₂', '₃'][r]}`, r }), correct: true },
    { html: t('X est d\'ordre {p}', { p: Math.round(ratio) }), correct: false, rule: 'n_order_ratio_is_p' },
    { html: p === 4 ? t('X pourrait être la formule du trapèze') : t('X pourrait être la formule de Simpson'), correct: false },
    { html: t('Diviser h par 2 divise l\'erreur par {n}', { n: 2 * 2 ** p }), correct: false },
  ].filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i)).slice(0, 4);
  if (!options.some((o) => o.correct)) options[0] = { html: t('X est d\'ordre {p}', { p }), correct: true };
  if (!options.some((o) => !o.correct)) options[3] = { html: t('X est d\'ordre {p}', { p: p + 1 }), correct: false };
  const table = tableOf(F, [m], [t('méthode X')]);
  const sol = t('Rapport ≈ {ratio} ≈ 2{sup} : ordre {p}, degré d\'exactitude {r}.', { ratio: r2(ratio, 1), sup: sup(p), p, r });
  if (opts.exam) {
    return multiMcq({ skill: OR, level: 4, key: `${OR}:mcqX:${F.id}:${m}`, prompt: `${fPrompt(F)}${tableHtml(table)}`, options, exam: examTag(opts), solution: [{ html: sol, note: '' }] }, rng);
  }
  const q5 = multiMcq({ skill: OR, level: 5, key: `${OR}:X:${F.id}:${m}`, prompt: t('Qu\'en déduis-tu sur la méthode X ?'), options, solution: [{ html: sol, note: '' }] }, rng);
  return readtableItem({ skill: OR, level: 5, key: `5:${F.id}:${m}`, prompt: t('{intro} (méthode X inconnue)', { intro: fPrompt(F) }), table, question: q5, subgoals: SUB_O });
}

function orderExamMcq(rng, opts) {
  if (rng.chance(0.5)) return orderL5(rng, opts);
  const r = rng.pick([1, 3, 5]);
  const P = ['P₀', 'P₁', 'P₂', 'P₃', 'P₄', 'P₅', 'P₆'];
  return mcq({
    skill: OR, level: 4, key: `${OR}:mcq:${r}`, exam: examTag(opts),
    prompt: t('Une formule J sur [−1 ; 1] est exacte sur {P1} mais pas sur {P2}. Pour f assez régulière, la formule composite associée est d\'ordre…', { P1: P[r], P2: P[r + 1] }),
    options: [{ html: String(r + 1), correct: true }, { html: String(r), correct: false, rule: 'n_exactness_order' }, ...[...new Set([r + 2, 2 * (r + 1), r + 3])].filter((x) => x !== r + 1 && x !== r).slice(0, 2).map((x) => ({ html: String(x), correct: false }))],
    solution: [{ html: t('Degré d\'exactitude r = {r} ⇒ ordre r + 1 = {p}.', { r, p: r + 1 }), note: '' }],
  }, rng);
}

function orderTf(rng, opts) {
  return tfItem({
    skill: OR, level: 4, key: 'trap-mid', exam: examTag(opts),
    statement: t('La formule du trapèze composite, qui utilise les extrémités des sous-intervalles, est toujours plus précise que celle du point milieu (même n).'),
    truth: false,
    counter: { kind: 'num', prop: 'trapNotBetter', params: { n: 4 }, ask: [{ v: 'f', label: 'f(x) =' }], answer: { f: 'x^2' } },
    explanation: t('Faux : pour f(x) = x² sur [0 ; 1] et n = 4, l\'erreur du trapèze est 1/96, celle du point milieu 1/192. Dans le tableau des erreurs, celle du trapèze est environ le double.'),
  });
}

export const GEN = {
  [EX]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return exactMcq(rng, opts);
    if (opts.exam === 'tf') return exactTf(rng, opts);
    if (level === 4) return weightsLines(rng);
    if (level === 5) return gaussCode(rng, 5);
    return exactLines(rng, level);
  },
  [OR]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return orderExamMcq(rng, opts);
    if (opts.exam === 'tf') return orderTf(rng, opts);
    if (level === 1) return orderL1(rng, 1);
    if (level === 2) return orderL2(rng);
    if (level === 3) return orderL3(rng);
    if (level === 4) return orderL4(rng);
    return orderL5(rng);
  },
};


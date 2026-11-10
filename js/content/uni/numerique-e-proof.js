// n-quad-proof and n-error-statements (module N, part e, step U9).
// Catalogue: docs/universite/N-analyse-numerique.md.
//
// n-quad-proof. The proof of the exams 2019 and 2021 for J(g) = 2g(0)
// (point milieu), and its variants J(g) = 2g(−1), 2g(1) (rectangles, order
// 1) and g(−1) + g(1) (trapezoid, interpolation error). The abstract-f
// judges of the catalogue (series and definite with f, ext. 5) are not
// built: the change of variable, L_h and the Taylor expansion are multiple
// choices; the argument « J exact on P₁ » is a proof in blocks; the bound
// is computed by `value` (∫₋₁¹ of the remainder's weight) and `equiv` in
// h, N, L = b − a and M = max|f⁽ᵖ⁾| (N = L/h substituted, cfg.subst), whose
// final form has no N; the constant by `value`.
// L1 the bound with blanks; L2 a table (rectangle, point milieu) to read
// (« what is the order with 2g(−1)? »); L3 choose the point and the order
// of the expansion, then the bound; L4 the blocks of (d); L5 the exam
// problem (example 3, 10 points). Exam: open (the same problem), tf on the
// change of variable.
//
// n-error-statements. A statement « Q₁f ∈ Cᵏ[0 ; 1], Q₂C > 0, ∀h ∈ ]0 ; 1] :
// |∫f − L_h(f)| ≤ C·h^q [·max|f⁽q⁾|] » about a composite formula of order p
// (point milieu, trapèze 2 ; Simpson, Gauss 2 points 4). It is true iff
// q = p, k ≥ p, and C comes after f or the bound has the factor
// max|f⁽ᵖ⁾|. Counter-examples (kind num): a family λ·f (errScaling) when C
// is chosen before f; a function for which E_h/h^q is unbounded (notOrder)
// when q = p + 1. L1 two statements to compare; L2 true/false with a
// counter-example; L3 the reason why a statement is false; L4 the right
// statement with tokens (judge logic); L5 several statements, or the table
// of Simpson on √x and eˣ, several answers. Exam: mcq with several
// answers, tf.

import { linesItem, mcq, tfItem, blocksItem, tokensItem, examTag } from './kit.js';
import { readtableItem, multiMcq, vfMcq, blankBy } from './numerique-kit.js';
import { problemItem } from './kit-problem.js';
import { FUNS, NS, errOf, E3, H, quadF } from './numerique-e-kit.js';

const QP = 'n-quad-proof';
const ES = 'n-error-statements';

// ======================================================================
// n-quad-proof
// ======================================================================

// The variants of J: point of the expansion, remainder rᵢ(t), the weight
// w(t) whose integral bounds it, the factor in front, the order.
const JS = {
  mid: { J: '2g(0)', name: 'point milieu', at: 'cᵢ = xᵢ + h/2', p: 2, r: 1, rem: '(h²t²/8)·f″(ξᵢ(t))', w: 't^2', wHtml: 't²', wInt: '2/3', coef: 'h^2/8', coefHtml: 'h²/8', deriv: 'f″', bound: 'L×h^2×M/24', boundHtml: '(b − a)·h²/24·max|f″|', C: '1/24' },
  left: { J: '2g(−1)', name: 'rectangle à gauche', at: 'xᵢ', p: 1, r: 0, rem: '(h(t + 1)/2)·f′(ξᵢ(t))', w: 't+1', wHtml: 't + 1', wInt: '2', coef: 'h/2', coefHtml: 'h/2', deriv: 'f′', bound: 'L×h×M/2', boundHtml: '(b − a)·h/2·max|f′|', C: '1/2' },
  right: { J: '2g(1)', name: 'rectangle à droite', at: 'xᵢ₊₁', p: 1, r: 0, rem: '(h(t − 1)/2)·f′(ξᵢ(t))', w: '1-t', wHtml: '1 − t', wInt: '2', coef: 'h/2', coefHtml: 'h/2', deriv: 'f′', bound: 'L×h×M/2', boundHtml: '(b − a)·h/2·max|f′|', C: '1/2' },
  trap: { J: 'g(−1) + g(1)', name: 'trapèze', at: 'l\'interpolation linéaire de xᵢ et xᵢ₊₁', p: 2, r: 1, rem: '(h²(t² − 1)/8)·f″(ξᵢ(t))', w: '1-t^2', wHtml: '1 − t²', wInt: '4/3', coef: 'h^2/8', coefHtml: 'h²/8', deriv: 'f″', bound: 'L×h^2×M/12', boundHtml: '(b − a)·h²/12·max|f″|', C: '1/12' },
};
const SUB_P = [
  { id: 'change-var', label: 'changement de variable', skill: 'n-quad-exactness' },
  { id: 'taylor', label: 'Taylor avec reste', skill: 'a1-dl-usual' },
  { id: 'exactness', label: 'J exacte sur P₁', skill: 'n-quad-exactness' },
  { id: 'bound', label: 'majorer', skill: QP },
  { id: 'variant', label: 'variante de J', skill: QP },
  { id: 'order', label: 'ordre annoncé', skill: 'n-quad-order' },
];
const EQ_CFG = { kind: 'equiv', vars: ['h', 'N', 'L', 'M'], domain: { h: [0.05, 1], N: [1, 6], L: [0.5, 3], M: [0.5, 3] }, subst: { N: 'L/h' }, target: 'only', finalVars: ['L', 'h', 'M'] };

// The bound: ∫₋₁¹ w, then (h/2)·N·coef·∫w·M = bound.
function boundScript(V, { blanks = false } = {}) {
  const startB = `(h/2)×N×(${V.coef})×(${V.wInt})×M`;
  const mid = V.bound.replace('L×h^2', 'N×h^3').replace('L×h×', 'N×h^2×');
  return {
    first: { start: `int(${V.w},t,-1,1)`, judge: { kind: 'value', expect: V.wInt } },
    lines: [
      { kind: 'eq', math: V.wInt, note: `∫₋₁¹ ${V.wHtml} dt`, subgoal: 'bound', ...(blanks ? blankBy(V.wInt, [V.wInt]) : {}) },
      { kind: 'segment', html: `Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(${V.coefHtml})·max|${V.deriv}|·∫₋₁¹ ${V.wHtml} dt. Écris la borne avec L = b − a = Nh et M = max|${V.deriv}|.`, ask: '≤', start: { math: startB }, judge: EQ_CFG },
      { kind: 'eq', math: mid, note: 'On regroupe', subgoal: 'bound' },
      { kind: 'eq', math: V.bound, note: 'N·h = b − a : la constante ne dépend plus de h', subgoal: 'bound', ...(blanks ? blankBy(V.bound, ['L']) : {}) },
    ],
  };
}

function proofLines(rng, level) {
  const V = JS[rng.pick(level === 1 ? ['mid', 'mid', 'left'] : ['mid', 'left', 'right', 'trap'])];
  const B = boundScript(V, { blanks: level <= 2 });
  const script = [];
  if (level === 3) {
    script.push(
      {
        kind: 'decision', prompt: `Autour de quel point développe-t-on f(xᵢ + h(t + 1)/2) pour J(g) = ${V.J} ?`, options: [
          { id: 'ok', label: V.at, valid: true, ref: true },
          ...(V.p === 2 && V.r === 1 && V.J === '2g(0)' ? [{ id: 'xi', label: 'xᵢ', valid: true, quality: 'poor', why: 'Juste, mais en xᵢ le terme de degré 1 n\'est plus intégré exactement par J = 2g(0) : on perd un ordre.' }] : [{ id: 'c', label: 'cᵢ = xᵢ + h/2', valid: false, why: `J = ${V.J} n'utilise pas le milieu : on développe en ${V.at}.` }]),
          { id: 'xi1', label: 'ξᵢ, un point inconnu', valid: false, why: 'ξ apparaît dans le reste de Taylor, pas comme point du développement.' },
        ],
      },
      {
        kind: 'decision', prompt: 'Jusqu\'à quel degré écrire pᵢ(t) avant le reste ?', options: [
          { id: 'r', label: `Degré ${V.r} : J est exacte sur P${V.r === 1 ? '₁' : '₀'}`, valid: true, ref: true },
          { id: 'r1', label: `Degré ${V.r + 1}`, valid: false, rule: 'n_exactness_order', why: `J n'est exacte que sur P${V.r === 1 ? '₁' : '₀'} : un terme de degré ${V.r + 1} ne serait pas intégré exactement.` },
          { id: 'zero', label: 'Aucun : on majore f directement', valid: false, why: 'Il faut un polynôme pᵢ que J intègre exactement : l\'erreur ne vient alors que du reste.' },
        ],
      },
    );
  }
  script.push(...B.lines);
  return linesItem({
    skill: QP, level, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', keys: ['calc', 'anal'],
    prompt: `Formule composite associée à J(g) = ${V.J} (${V.name}) sur [a ; b], h = (b − a)/N. Sur chaque sous-intervalle, f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t) avec rᵢ(t) = ${V.rem}, et ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt. Majore cette erreur : calcule d'abord ∫₋₁¹ ${V.wHtml} dt.`,
    start: B.first.start, judge: B.first.judge, script,
    hints: H(`|rᵢ(t)| ≤ ${V.coefHtml}·|${V.wHtml}|·max|${V.deriv}| : intègre ce poids sur [−1 ; 1], puis somme sur les N sous-intervalles.`,
      `(h/2)·N·(${V.coefHtml})·□·M`,
      `(h/2)·N·(${V.coefHtml})·${V.wInt}·M = ${V.boundHtml}, car Nh = b − a.`),
    subgoals: SUB_P, key: `${QP}:${level}:${V.J}`,
  });
}

// L2: the table of the rectangle and the point milieu.
function proofTable(rng) {
  const F = FUNS[0];
  const which = rng.pick(['left', 'right']);
  const rows = NS.map((n) => [String(n), E3(errOf(F, 'rect', n)), E3(errOf(F, 'mid', n))]);
  const q = mcq({
    skill: QP, level: 2, key: `${QP}:read:${which}`,
    prompt: `Que devient l'ordre si l'on remplace J(g) = 2g(0) par J(g) = ${which === 'left' ? '2g(−1)' : '2g(1)'} ?`,
    options: [
      { html: 'Ordre 1 : l\'erreur n\'est plus divisée que par 2 quand n double', correct: true },
      { html: 'Ordre 2, comme le point milieu : la composite ne dépend pas de J', correct: false },
      { html: 'Ordre 0 : la formule ne converge pas', correct: false },
      { html: 'Ordre 2, puisque l\'erreur est divisée par 2', correct: false, rule: 'n_order_ratio_is_p' },
    ],
    solution: [{ html: 'J = 2g(−1) n\'est exacte que sur P₀ : on développe à l\'ordre 0 et le reste est en h·f′(ξ) ; la constante devient (b − a)/2·max|f′|. Le tableau le confirme : rapport ≈ 2 au lieu de 4.', note: '' }],
  }, rng);
  return readtableItem({
    skill: QP, level: 2, key: `2:${which}`,
    prompt: 'Erreurs des formules composites du rectangle à gauche (J = 2g(−1)) et du point milieu (J = 2g(0)) pour f(x) = e⁻ˣ sin x sur [0 ; 2] :',
    table: { columns: ['n', 'rectangle', 'point milieu'], rows }, question: q,
    hints: H('Compare les rapports quand n double : 4 pour le point milieu (ordre 2).', 'rapport du rectangle ≈ □', 'Rapport ≈ 2 : ordre 1. J = 2g(±1) n\'est exacte que sur P₀.'),
    subgoals: SUB_P,
  });
}

// L4: the blocks of (d).
function proofBlocks(rng, level = 4, opts = {}) {
  const V = JS[rng.pick(['mid', 'left'])];
  const P = V.r === 1 ? 'P₁' : 'P₀';
  const blocks = [
    { id: 'split', html: `f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), avec pᵢ ∈ ${P} (Taylor en ${V.at}) et rᵢ(t) = ${V.rem}`, needs: [] },
    { id: 'exact', html: `J(pᵢ) = ∫₋₁¹ pᵢ(t) dt, car J est exacte sur ${P}`, needs: ['split'] },
    { id: 'lin', html: 'Par linéarité : ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt − J(f(xᵢ + h(· + 1)/2)) = ∫₋₁¹ rᵢ(t) dt − J(rᵢ)', needs: ['split'] },
    { id: 'jr', html: `J(rᵢ) = ${V.J.replace('g', 'rᵢ')} = 0, car rᵢ s'annule en ${V.J === '2g(0)' ? 't = 0' : V.J === '2g(−1)' ? 't = −1' : 't = 1'}`, needs: ['split'] },
    { id: 'sum', html: 'On somme sur i avec le facteur h/2 : ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt', needs: ['exact', 'lin', 'jr'] },
    { id: 'decoy', html: 'rᵢ(t) = 0, car t est petit : l\'erreur est nulle', needs: [], distractor: 'n_proof_same_xi', why: 'Le reste n\'est pas nul : il contient f″(ξ) (ou f′(ξ)), qu\'on majore par max|f⁽ᵖ⁾|.' },
  ];
  const order = ['split', 'exact', 'lin', 'jr', 'sum'];
  return blocksItem({
    skill: QP, level, mode: 'order', exam: opts.exam ? { format: opts.exam, points: 1 } : false,
    prompt: `Montre que ∫ₐᵇ f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt pour J(g) = ${V.J} (${V.name}). Touche les blocs dans l'ordre de la preuve ; un bloc est faux.`,
    blocks: rng.shuffle(blocks), goal: 'sum', order, placed: [],
    hints: level >= 5 || opts.exam ? [] : H('On écrit f = pᵢ + rᵢ, J intègre pᵢ exactement, et J ne voit pas rᵢ.', `J(pᵢ) = ∫pᵢ car J est exacte sur ${P}`, 'Taylor, puis l\'exactitude et J(rᵢ) = 0, la linéarité, et enfin la somme.'),
    noHints: level >= 5 || !!opts.exam,
    subgoals: SUB_P, key: `${QP}:blocks:${V.J}`, expectedSec: 150,
  });
}

// The exam problem (example 3, 10 points).
function proofProblem(rng, level, opts = {}) {
  const V = JS.mid;
  const W = JS[rng.pick(['right', 'left'])];
  const pa = mcq({
    skill: QP, level, key: `${QP}:pa`, prompt: 'Sur [xᵢ ; xᵢ₊₁], on pose x = xᵢ + h(t + 1)/2. Alors ∫ₐᵇ f(x) dx =',
    options: [
      { html: '(h/2)·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt', correct: true },
      { html: 'Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt', correct: false, rule: 'n_map_jacobian' },
      { html: 'h·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt', correct: false },
      { html: '(h/2)·Σᵢ ∫₋₁¹ f(xᵢ + ht/2) dt', correct: false },
    ],
    solution: [{ html: 'dx = (h/2)dt, et t parcourt [−1 ; 1] quand x parcourt [xᵢ ; xᵢ₊₁].', note: '' }],
  }, rng);
  const pb = mcq({
    skill: QP, level, key: `${QP}:pb`, prompt: 'Avec J(g) = 2g(0), la formule composite L_h(f) vaut :',
    options: [
      { html: 'h·Σᵢ f(xᵢ + h/2)', correct: true },
      { html: '(h/2)·Σᵢ f(xᵢ + h/2)', correct: false },
      { html: 'h·Σᵢ f(xᵢ)', correct: false },
      { html: '2h·Σᵢ f(xᵢ + h/2)', correct: false, rule: 'n_map_jacobian' },
    ],
    solution: [{ html: 'L_h(f) = (h/2)·Σᵢ J(f(xᵢ + h(· + 1)/2)) = (h/2)·Σᵢ 2f(xᵢ + h/2).', note: '' }],
  }, rng);
  const pc = mcq({
    skill: QP, level, key: `${QP}:pc`, prompt: 'Taylor autour de cᵢ = xᵢ + h/2 : f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), pᵢ ∈ P₁, avec',
    options: [
      { html: 'pᵢ(t) = f(cᵢ) + (ht/2)·f′(cᵢ), rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))', correct: true },
      { html: 'pᵢ(t) = f(cᵢ) + (ht/2)·f′(cᵢ), rᵢ(t) = (h²t²/4)·f″(ξᵢ(t))', correct: false },
      { html: 'pᵢ(t) = f(xᵢ) + (ht/2)·f′(xᵢ), rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))', correct: false },
      { html: 'pᵢ(t) = f(cᵢ) + ht·f′(cᵢ), rᵢ(t) = (h²t²/2)·f″(ξᵢ(t))', correct: false },
    ],
    solution: [{ html: 'x − cᵢ = ht/2 : f = f(cᵢ) + (ht/2)f′(cᵢ) + ½(ht/2)²f″(ξ).', note: '' }],
  }, rng);
  const pd = { ...proofBlocks(rng, level, opts) };
  const B = boundScript(V);
  const pe = linesItem({
    skill: QP, level, mode: 'free', keys: ['calc', 'anal'],
    prompt: 'Majore |∫ₐᵇ f − L_h(f)| : calcule ∫₋₁¹ t² dt, puis la borne avec L = b − a et M = max|f″|.',
    start: B.first.start, judge: B.first.judge, script: B.lines, subgoals: SUB_P, key: `${QP}:pe`, hints: [],
  });
  const pf = mcq({
    skill: QP, level, key: `${QP}:pf:${W.J}`, prompt: `Même question avec J(g) = ${W.J} (f ∈ C¹[a ; b]) :`,
    options: [
      { html: 'ordre 1 : |∫f − L_h(f)| ≤ (b − a)/2·h·max|f′|', correct: true },
      { html: 'ordre 2 : |∫f − L_h(f)| ≤ (b − a)/24·h²·max|f″|', correct: false, rule: 'n_exactness_order' },
      { html: 'ordre 1 : |∫f − L_h(f)| ≤ (N/2)·h·max|f′|', correct: false, rule: 'n_proof_sum_count' },
      { html: 'ordre 1 : |∫f − L_h(f)| ≤ (b − a)/2·h·|f′(ξ)|', correct: false, rule: 'n_proof_constant_depends_h' },
    ],
    solution: [{ html: `J = ${W.J} n'est exacte que sur P₀ : rᵢ(t) = ${W.rem}, ∫₋₁¹ |${W.wHtml}| dt = 2, d'où (h/2)·N·(h/2)·2·max|f′| = (b − a)h/2·max|f′|.`, note: '' }],
  }, rng);
  return problemItem({
    skill: QP, level, key: `5:${W.J}`, exam: opts.exam ? { format: 'open', points: 10 } : false,
    prompt: 'Soit f ∈ C²[a ; b], h = (b − a)/N, xᵢ = a + ih, et J(g) = 2g(0) sur [−1 ; 1] (point milieu). Prouve que la formule composite L_h est d\'ordre 2, avec une constante explicite.',
    parts: [
      { item: pa, points: 1.5, title: '(a) Changement de variable' },
      { item: pb, points: 1, title: '(b) La formule L_h' },
      { item: pc, points: 2, title: '(c) Taylor : pᵢ + rᵢ' },
      { item: pd, points: 1.5, title: '(d) L\'erreur ne vient que des restes' },
      { item: pe, points: [1, 1.5], title: '(e) La majoration' },
      { item: pf, points: 1.5, title: `(f) Avec J(g) = ${W.J}` },
    ],
  });
}

function proofTf(rng, opts) {
  if (rng.chance(0.5)) {
    return tfItem({
      skill: QP, level: 4, key: 'cv', exam: examTag(opts),
      statement: 'Pour J(g) = 2g(0), h = (b − a)/N et xᵢ = a + ih : ∫ₐᵇ f(x) dx − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt, où rᵢ est le reste de Taylor de f(xᵢ + h(t + 1)/2) à l\'ordre 1 en cᵢ.',
      truth: true, explanation: 'Vrai : J est exacte sur P₁ et J(rᵢ) = 2rᵢ(0) = 0.',
    });
  }
  return vfMcq({
    skill: QP, level: 4, key: `${QP}:const`, exam: examTag(opts), truth: false, ruleIfTrue: 'n_proof_sum_count',
    statement: 'Pour le point milieu composite, la majoration |∫ₐᵇ f − L_h(f)| ≤ (N·h³/24)·max|f″| montre l\'ordre 3.',
    explanation: 'Faux : N·h³ = (b − a)·h², la majoration est (b − a)h²/24·max|f″| : ordre 2. La constante ne doit pas contenir N.',
  }, rng);
}

// ======================================================================
// n-error-statements
// ======================================================================

const SUPS = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶'];
const MS = {
  mid: { name: 'du point milieu', p: 2, counter: 'x^2' },
  trap: { name: 'du trapèze', p: 2, counter: 'x^2' },
  simp: { name: 'de Simpson', p: 4, counter: 'x^4' },
  gauss2: { name: 'de Gauss à 2 points', p: 4, counter: 'x^4' },
};
const SUB_S = [
  { id: 'negate', label: 'nier l\'énoncé', skill: 'g9-negate' },
  { id: 'counter', label: 'contre-exemple', skill: ES },
  { id: 'verdict', label: 'verdict', skill: ES },
  { id: 'order', label: 'ordre de la formule', skill: 'n-quad-order' },
];

// A statement: {m, k, q, order: 'A' (∀f ∃C) | 'B' (∃C ∀f), factor}.
const truthOf = (s) => s.q === MS[s.m].p && s.k >= MS[s.m].p && (s.order === 'A' || s.factor);
function kindOf(s) {
  if (truthOf(s)) return 'true';
  if (s.k < MS[s.m].p) return 'reg';
  if (s.q > MS[s.m].p) return 'power';
  return 'quant';
}
function stmtHtml(s, bold = null) {
  const b = (t, w) => (bold === w ? `<b>${t}</b>` : t);
  const qf = `∀f ∈ C${SUPS[s.k]}[0 ; 1]`;
  const qc = '∃C > 0';
  const head = s.order === 'A' ? `${b(qf, 'f')}, ${b(qc, 'C')}` : `${b(qc, 'C')}, ${b(qf, 'f')}`;
  return `${head}, ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h${SUPS[s.q]}${s.factor ? `·max|f⁽${SUPS[s.q]}⁾|` : ''}`;
}
const intro = (m) => `L_h(f) est la formule ${MS[m].name} composite sur [0 ; 1], de pas h = 1/N (ordre ${MS[m].p}).`;

function makeStmt(rng, kind, m = rng.pick(Object.keys(MS))) {
  const p = MS[m].p;
  switch (kind) {
    case 'true': {
      const order = rng.pick(['A', 'A', 'B']);
      return { m, k: rng.pick([p, p, p + 1]), q: p, order, factor: order === 'B' ? true : rng.chance(0.4) };
    }
    case 'quant': return { m, k: rng.pick([p, p + 1]), q: p, order: 'B', factor: false };
    case 'power': return { m, k: p + 1, q: p + 1, order: 'A', factor: rng.chance(0.3) };
    default: return { m, k: p - 1, q: p, order: 'A', factor: rng.chance(0.3) };
  }
}

const REASONS = {
  quant: 'C est choisie avant f : elle devrait convenir à toutes les f, ce qui est impossible',
  reg: `f n'est pas assez régulière : le théorème demande f ∈ Cᵖ`,
  power: 'La puissance de h est trop grande : la formule n\'est que d\'ordre p',
};
const REASON_RULE = { quant: 'g9_quant_order', reg: 'n_regularity_ignored', power: 'n_more_regularity_more_order' };

function counterFor(s) {
  const k = kindOf(s);
  if (k === 'quant') return { kind: 'num', prop: 'errScaling', params: { method: s.m }, ask: [{ v: 'f', label: 'f_λ(x) =' }], answer: { f: `λx^${MS[s.m].p}` } };
  if (k === 'power') return { kind: 'num', prop: 'notOrder', params: { method: s.m, q: s.q }, ask: [{ v: 'f', label: 'f(x) =' }], answer: { f: MS[s.m].counter } };
  return null;
}
const explainOf = (s) => {
  const k = kindOf(s);
  const p = MS[s.m].p;
  if (k === 'true') return `Vrai : f ∈ C${SUPS[p]} suffit pour l'ordre ${p}${s.order === 'B' ? ', et la constante universelle multiplie max|f⁽ᵖ⁾|' : ' ; C peut dépendre de f'}.`;
  if (k === 'quant') return `Faux : avec f_λ = λx${SUPS[p]}, l'erreur est multipliée par λ ; aucune constante fixée avant f ne convient.`;
  if (k === 'power') return `Faux : la formule est d'ordre ${p}, même pour f très régulière ; pour f = ${MS[s.m].counter.replace('^', '')}, E_h(f)/h${SUPS[s.q]} → ∞.`;
  return `Faux : le théorème demande f ∈ C${SUPS[p]} ; avec moins de régularité, l'ordre peut baisser (√x : ordre 1,5 pour Simpson).`;
};

// L1: two statements, the difference in bold.
function compareTwo(rng) {
  const m = rng.pick(Object.keys(MS));
  const p = MS[m].p;
  const A = { m, k: p, q: p, order: 'A', factor: false };
  const B = { ...A, order: 'B' };
  const firstTrue = rng.chance(0.5);
  const [s1, s2] = firstTrue ? [A, B] : [B, A];
  return mcq({
    skill: ES, level: 1, key: `${ES}:cmp:${m}:${firstTrue}`, keepOrder: true,
    prompt: `${intro(m)} Les deux énoncés ne diffèrent que par l'ordre des quantificateurs (en gras) :<br>(1) ${stmtHtml(s1, 'C')}<br>(2) ${stmtHtml(s2, 'C')}`,
    options: [
      { html: firstTrue ? 'Seul (1) est vrai' : 'Seul (2) est vrai', correct: true },
      { html: firstTrue ? 'Seul (2) est vrai' : 'Seul (1) est vrai', correct: false, rule: 'g9_quant_order' },
      { html: 'Les deux sont vrais : l\'ordre des quantificateurs ne change rien', correct: false, rule: 'g9_quant_order' },
      { html: 'Aucun des deux', correct: false },
    ],
    solution: [{ html: `Avec ∀f ∃C, C peut dépendre de f : c'est le théorème. Avec ∃C ∀f, C devrait convenir à λx${SUPS[p]} pour tout λ : faux.`, note: '' }],
  }, rng);
}

function tfStatement(rng, level, opts = {}, kinds = ['quant']) {
  const kind = rng.pick(kinds);
  const s = makeStmt(rng, kind);
  const statement = `${intro(s.m)}<br>${stmtHtml(s)}`;
  const counter = counterFor(s);
  if (kind === 'reg') {
    return vfMcq({ skill: ES, level, key: `${ES}:vf:${JSON.stringify(s)}`, exam: examTag(opts), statement, truth: false, ruleIfTrue: 'n_regularity_ignored', explanation: explainOf(s) }, rng);
  }
  return tfItem({
    skill: ES, level, key: JSON.stringify(s), exam: opts.exam ? examTag(opts) : false, statement,
    truth: kind === 'true', counter: kind === 'true' ? null : counter,
    ruleIfTrue: kind === 'true' ? null : REASON_RULE[kind], ruleIfFalse: null,
    explanation: explainOf(s),
    hints: H('Qui choisit en premier ? Si C est choisi avant f, il doit marcher pour toutes les f.',
      kind === 'power' ? `Prends f = ${MS[s.m].counter.replace('^', '')} : l'erreur est exactement en h${SUPS[MS[s.m].p]}.` : `Multiplie f par λ : l'erreur est multipliée par □.`,
      kind === 'power' ? `f(x) = ${MS[s.m].counter.replace('^', '')}.` : `f_λ(x) = λx${SUPS[MS[s.m].p]} : E(f_λ) = λE(x${SUPS[MS[s.m].p]}), aucune constante fixe ne suffit.`),
    noHints: level >= 5 || !!opts.exam,
  });
}

function reasonMcq(rng) {
  const kind = rng.pick(['quant', 'reg', 'power']);
  const s = makeStmt(rng, kind);
  const options = ['quant', 'reg', 'power'].map((k) => ({ html: REASONS[k].replace('Cᵖ', `C${SUPS[MS[s.m].p]}`).replace("d'ordre p", `d'ordre ${MS[s.m].p}`), correct: k === kind, ...(k === kind ? {} : { rule: REASON_RULE[k] }) }));
  options.push({ html: 'Il est vrai', correct: false });
  return mcq({
    skill: ES, level: 3, key: `${ES}:why:${JSON.stringify(s)}`,
    prompt: `${intro(s.m)} Cet énoncé est faux. Pourquoi ?<br>${stmtHtml(s)}`,
    options, solution: [{ html: explainOf(s), note: '' }],
  }, rng);
}

function tokensStmt(rng, level, opts = {}) {
  const m = rng.pick(Object.keys(MS));
  const p = MS[m].p;
  const pf = `f ∈ C${SUPS[p]}[0 ; 1]`;
  const bound = `|E_h(f)| ≤ C·h${SUPS[p]}`;
  const pieces = [{ text: pf }, { text: 'C > 0' }, { text: 'h ∈ ]0 ; 1]' }, { text: bound }];
  if (level >= 4 || opts.exam) pieces.push({ text: `|E_h(f)| ≤ C·h${SUPS[p + 1]}` }, { text: `f ∈ C${SUPS[p - 1]}[0 ; 1]` });
  const target = `∀${pf} ∃C > 0 ∀h ∈ ]0 ; 1], ${bound}`;
  return tokensItem({
    skill: ES, level, key: `${m}:${level}`, pieces, target, start: target,
    prompt: `${intro(m)} Avec E_h(f) = ∫₀¹ f − L_h(f), écris le théorème d'erreur (C peut dépendre de f, mais pas de h).`,
    hints: [
      { level: 1, html: 'Qui choisit en premier ? La constante dépend de f, donc ∀f vient avant ∃C ; elle ne dépend pas de h, donc ∃C vient avant ∀h.' },
      { level: 2, html: `∀${pf} ∃C > 0 …` },
      { level: 3, html: target },
    ],
    noHints: level >= 5 || !!opts.exam, baits: ['g9_quant_order', 'n_more_regularity_more_order'],
    solution: [{ html: target, note: '' }],
  });
}

function stmtOptions(rng, n) {
  const m = rng.pick(Object.keys(MS));
  const kinds = rng.shuffle(['true', 'true', 'quant', 'power', 'reg', 'true']).slice(0, n);
  if (!kinds.includes('true')) kinds[0] = 'true';
  if (kinds.every((k) => k === 'true')) kinds[1] = 'quant';
  const seen = new Set();
  const options = [];
  for (const k of kinds) {
    let s;
    let t = 0;
    do { s = makeStmt(rng, k, m); t++; } while (seen.has(stmtHtml(s)) && t < 20);
    if (seen.has(stmtHtml(s))) continue;
    seen.add(stmtHtml(s));
    options.push({ html: stmtHtml(s), correct: k === 'true', ...(k === 'true' ? {} : { rule: REASON_RULE[k] }) , s });
  }
  return { m, options: options.map(({ s, ...o }) => o), list: options };
}

function statementsMulti(rng, level, opts = {}) {
  const { m, options, list } = stmtOptions(rng, rng.pick([4, 5]));
  const o = {
    skill: ES, level, key: `${ES}:multi:${m}:${options.map((x) => x.html).join('|').length}:${options.filter((x) => x.correct).length}`,
    prompt: `${intro(m)} Quels énoncés sont vrais ?`,
    options, exam: opts.exam ? examTag(opts) : false,
    solution: list.map((x) => ({ html: `${x.html} : ${explainOf(x.s)}`, note: '' })),
  };
  return multiMcq(o, rng);
}

function sqrtTable(rng) {
  const rows = [4, 8, 16, 32, 64].map((n) => [String(n), E3(Math.abs(quadF('simp', Math.sqrt, 0, 1, n) - 2 / 3)), E3(Math.abs(quadF('simp', Math.exp, 0, 1, n) - (Math.E - 1)))]);
  const q = multiMcq({
    skill: ES, level: 5, key: `${ES}:sqrt`,
    prompt: 'Qu\'en déduis-tu ?',
    options: [
      { html: 'Pour eˣ, Simpson est d\'ordre 4 (rapport 16)', correct: true },
      { html: 'Pour √x, l\'ordre n\'est que ≈ 1,5, car √x ∉ C⁴[0 ; 1]', correct: true },
      { html: 'Simpson est d\'ordre 4 pour toute f continue', correct: false, rule: 'n_regularity_ignored' },
      { html: 'Pour √x, Simpson ne converge pas', correct: false },
    ],
    solution: [{ html: 'Rapports : 16 pour eˣ, ≈ 2,83 = 2^1,5 pour √x. Le théorème d\'ordre 4 demande f ∈ C⁴[0 ; 1], ce que √x n\'est pas (en 0).', note: '' }],
  }, rng);
  return readtableItem({
    skill: ES, level: 5, key: 'sqrt', prompt: 'Erreurs de la formule de Simpson composite sur [0 ; 1], avec n sous-intervalles :',
    table: { columns: ['n', 'E(√x)', 'E(eˣ)'], rows }, question: q, subgoals: SUB_S,
  });
}

export const GEN = {
  [QP]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'open') return proofProblem(rng, 4, opts);
    if (opts.exam === 'tf') return proofTf(rng, opts);
    if (level === 2) return proofTable(rng);
    if (level === 4) return proofBlocks(rng, 4);
    if (level === 5) return proofProblem(rng, 5);
    return proofLines(rng, level);
  },
  [ES]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return statementsMulti(rng, 4, opts);
    if (opts.exam === 'tf') return tfStatement(rng, 4, opts, ['true', 'quant', 'power', 'reg']);
    if (level === 1) return compareTwo(rng);
    if (level === 2) return tfStatement(rng, 2, {}, ['quant', 'quant', 'power']);
    if (level === 3) return reasonMcq(rng);
    if (level === 4) return tokensStmt(rng, 4);
    if (rng.chance(0.5)) return sqrtTable(rng);
    return readtableItem({ skill: ES, level: 5, key: 'stmts', prompt: 'Format d\'examen : plusieurs énoncés, une ou plusieurs réponses justes.', table: null, question: statementsMulti(rng, 5), subgoals: SUB_S });
  },
};


// n-fp-converge and n-fp-order (module N, part a, step U9): fixed-point
// iterations, their convergence, their order. Catalogue:
// docs/universite/N-analyse-numerique.md.
//
// n-fp-converge. Gabarit 1: φ(x) = ax/(b + x) (a > b), fixed points 0 and
// α = a − b, φ′(α) = b/a ∈ {1/2, 1/3, 2/3, 1/4, 3/4}, φ′(0) = a/b > 1; x⁽⁰⁾
// a whole number ≠ α, iterates with denominators ≤ 10⁴. Gabarit 2:
// f(x) = x² − x − c, c = m(m − 1), α = m, and φ₁ = x² − c (diverges),
// φ₂ = √(x + c) (φ₂′(α) = 1/(2m)), φ₃ = 1 + c/x (φ₃′(α) = −(m − 1)/m).
// L1 φ′ given: φ′(α), the decision, x⁽¹⁾ (guided); L2 the fixed points
// (solset) and φ′ (guided); L3 gabarit 2, choose the fastest φ, then
// φ′(α) (menus); L4 everything in free lines, with 3 iterations; L5 the
// program fixed_point, then its increments to read (order 1, ratio φ′(α)).
// Exam: mcq (gabarit 2: which φ converges), tf (« converges for every
// x⁽⁰⁾ », counter φ = x², x⁽⁰⁾ = 2; « the residual estimates the error »,
// counter φ = 0,99x + 0,01).
//
// n-fp-order. φ_ω(x) = x − ω·f(x), f = (x − α)(x + β), α ∈ {1, …, 5}:
// φ_ω′(α) = 1 − ωF with F = f′(α) = α + β, so ω* = 1/F gives order 2
// (φ″ = −2ω* ≠ 0), and |1 − ωF| < 1 is the interval of convergence.
// L1 φ′ and φ″ guided; L2 free derivative and the decision on φ″; L3 menus;
// L4 everything, with the interval; L5 a table of increments for ω₁ = 4/(5F)
// and ω*, to read. Exam: mcq (GM 2013: (x − a)³ + a, order 3 at a), tf
// (« φ′(α) = 0 ⇒ order 2 », counter (x − 1)³ + 1; or a true statement),
// coef (ω*).

import { Q } from '../../math/rational.js';
import { linesItem, mcq, tfItem, examTag } from './kit.js';
import { coefItem } from './alglin-kit.js';
import {
  refCode, codeItem, holesFor, readtableItem, multiMcq, expText, H, blankBy,
} from './numerique-kit.js';

const FC = 'n-fp-converge';
const FO = 'n-fp-order';
const KEYS = ['calc', 'greek'];
const fr = (s) => String(s).replace(/\./g, ',').replace(/-/g, '−');
const menuOf = (items, active) => items.map((o) => ({ id: o.id, label: o.label, valid: o.id === active, why: o.id === active ? undefined : o.why || 'Pas maintenant : ce n\'est pas l\'étape suivante.' }));

// ======================================================================
// n-fp-converge
// ======================================================================

const SUB_C = [
  { id: 'fixed', label: 'les points fixes', skill: FC },
  { id: 'deriv', label: 'φ′(x)', skill: 'g6-deriv-rules' },
  { id: 'decide', label: 'converge si |φ′(α)| < 1', skill: FC },
  { id: 'iterate', label: 'itérer', skill: FC },
  { id: 'rec', label: 'suite récurrente xₖ₊₁ = φ(xₖ)', skill: 'a1-seq-rec-fixed' },
];

const RATIOS = [[2, 1], [3, 1], [3, 2], [4, 1], [4, 3]];
function g1Data(rng) {
  for (let t = 0; t < 200; t++) {
    const [a0, b0] = rng.pick(RATIOS);
    const k = rng.pick([1, 2, 3]);
    const a = a0 * k;
    const b = b0 * k;
    const alpha = a - b;
    const x0 = rng.int(1, 2 * alpha + 2);
    if (x0 === alpha) continue;
    const xs = [new Q(x0)];
    let ok = true;
    for (let j = 0; j < 3; j++) {
      try { xs.push(xs[j].mul(a).div(xs[j].add(b))); } catch { ok = false; break; }
      if (xs[j + 1].d > 10000) ok = false;
    }
    if (!ok) continue;
    return { a, b, alpha, x0, xs, phi: `${a}x/(${b}+x)`, dphi: `${a * b}/(${b}+x)^2`, d1: new Q(b, a), d0: new Q(a, b) };
  }
  const xs = [new Q(2), new Q(4, 3), new Q(8, 7), new Q(16, 15)];
  return { a: 2, b: 1, alpha: 1, x0: 2, xs, phi: '2x/(1+x)', dphi: '2/(1+x)^2', d1: new Q(1, 2), d0: new Q(2), fallback: true };
}
const phiT = (d) => `φ(x) = ${d.a}x/(${d.b} + x)`;

function decision(d) {
  return {
    kind: 'decision', prompt: 'Que peut-on dire de la convergence ?', options: [
      { id: 'ok', label: `Converge vers ${d.alpha} pour x⁽⁰⁾ assez proche : |φ′(${d.alpha})| = ${d.d1} < 1 ; jamais vers 0 : φ′(0) = ${d.d0} > 1`, valid: true, ref: true },
      { id: 'f', label: `On regarde f(x) = φ(x) − x : |f′(${d.alpha})| = ${String(new Q(d.a - d.b, d.a))} < 1, donc ça converge`, valid: false, rule: 'n_fp_f_vs_phi', why: `La condition porte sur la fonction d'itération φ, pas sur f : ici φ′(${d.alpha}) = ${d.d1}.` },
      { id: 'x0', label: `On regarde φ′(x⁽⁰⁾) = φ′(${d.x0}) = ${String(new Q(d.a * d.b, (d.b + d.x0) ** 2))}`, valid: false, rule: 'n_fp_phi_at_x0', why: `La convergence locale se décide au point fixe α = ${d.alpha}, pas au point de départ.` },
      { id: 'zero', label: 'Converge vers 0, l\'autre point fixe', valid: false, why: `φ′(0) = ${d.d0} > 1 : 0 repousse les itérés.` },
    ],
  };
}

const iterSegs = (d, n, guided) => {
  const out = [];
  for (let j = 1; j <= n; j++) {
    const prev = d.xs[j - 1];
    out.push(
      { kind: 'segment', html: `x⁽${'⁰¹²³'[j]}⁾ = φ(x⁽${'⁰¹²³'[j - 1]}⁾).`, ask: `x⁽${'⁰¹²³'[j]}⁾ =`, start: { math: `${d.a}×(${prev})/(${d.b}+${prev})` }, judge: { kind: 'value', form: 'irreducible' } },
      { kind: 'eq', math: String(d.xs[j]), ...(guided ? blankBy(String(d.xs[j]), [String(d.xs[j])]) : {}), note: `erreur |x − ${d.alpha}| = ${String(d.xs[j].sub(d.alpha).n < 0 ? d.xs[j].sub(d.alpha).neg() : d.xs[j].sub(d.alpha))}`, subgoal: 'iterate' },
    );
  }
  return out;
};

function fcLines(rng, level) {
  const d = g1Data(rng);
  const guided = level <= 2;
  const fixedSeg = [
    { kind: 'eq', math: `x(${d.alpha}-x)=0`, ...(guided ? blankBy(`x(${d.alpha}-x)=0`, [String(d.alpha)]) : {}), note: `${d.a}x = x(${d.b} + x) ⇔ x² − ${d.alpha === 1 ? '' : d.alpha}x = 0`, subgoal: 'fixed' },
    { kind: 'eq', math: `x=0 ou x=${d.alpha}`, note: 'Deux points fixes', subgoal: 'fixed' },
  ];
  const derivSeg = { kind: 'segment', html: 'La dérivée de φ.', ask: 'φ′(x) =', start: { math: `d(${d.phi},x)` }, judge: { kind: 'equiv', vars: ['x'], domain: { x: [0.1, 5] }, target: 'no-prime' } };
  const derivLine = { kind: 'eq', math: d.dphi, ...(guided ? blankBy(d.dphi, [String(d.a * d.b)]) : {}), note: 'Quotient : (a(b + x) − ax)/(b + x)²', subgoal: 'deriv' };
  const valSeg = { kind: 'segment', html: `La pente au point fixe α = ${d.alpha}.`, ask: `φ′(${d.alpha}) =`, start: { math: `${d.a * d.b}/(${d.b}+${d.alpha})^2` }, judge: { kind: 'value', form: 'irreducible' } };
  const valLine = { kind: 'eq', math: String(d.d1), ...(level === 1 ? blankBy(String(d.d1), [String(d.d1)]) : {}), note: `= b/a`, subgoal: 'decide' };
  let start;
  let judge;
  let script;
  if (level === 1) {
    start = valSeg.start.math;
    judge = valSeg.judge;
    const [s1, l1] = iterSegs(d, 1, true);
    script = [
      { kind: 'note', html: `Les points fixes sont 0 et ${d.alpha}, et φ′(x) = ${d.a * d.b}/(${d.b} + x)². ${valSeg.html}` },
      valLine,
      { ...s1, html: `Puis une itération à partir de x⁽⁰⁾ = ${d.x0}. ${s1.html}` }, decision(d), l1,
    ];
  } else {
    start = `${d.phi}=x`;
    judge = { kind: 'solset', v: 'x' };
    script = [...fixedSeg, derivSeg, derivLine];
    if (level >= 3) script.push(valSeg, valLine);
    if (level === 4) {
      const its = iterSegs(d, 3, false);
      its.splice(1, 0, decision(d));
      script.push(...its);
    }
  }
  return linesItem({
    skill: FC, level, mode: level <= 2 ? 'guided' : 'free', keys: KEYS,
    prompt: `Point fixe pour ${phiT(d)}${level === 1 ? `, x⁽⁰⁾ = ${d.x0}. Calcule φ′(${d.alpha}), décide si la méthode converge vers ${d.alpha}, puis calcule x⁽¹⁾.` : level === 2 ? ' : trouve les points fixes (φ(x) = x), puis φ′(x).' : `, x⁽⁰⁾ = ${d.x0} : points fixes, φ′, φ′(α), conclusion, puis x⁽¹⁾, x⁽²⁾, x⁽³⁾.`}`,
    start, judge, script,
    hints: H('Regarde la pente de φ au point fixe : si |φ′(α)| < 1, φ rapproche les points de α.',
      `φ′(x) = ${d.a * d.b}/(${d.b} + x)², donc φ′(${d.alpha}) = □.`,
      `φ′(${d.alpha}) = ${d.d1} < 1 : la méthode converge vers ${d.alpha}, l'erreur est environ multipliée par ${d.d1} à chaque pas.`),
    subgoals: SUB_C, key: `${FC}:${level}:${d.a}:${d.b}:${d.x0}`, baits: ['n_fp_f_vs_phi', 'n_fp_phi_at_x0'], fallback: d.fallback,
  });
}

// L3: gabarit 2, the fastest of three reformulations.
const M3 = [
  { id: 'deriv', label: 'Dériver φ' },
  { id: 'eval', label: 'Évaluer en α', why: 'D\'abord φ′(x).' },
  { id: 'iterate', label: 'Itérer à partir de x⁽⁰⁾', why: 'La convergence se décide sur φ′(α) : calcule-la d\'abord.' },
];
function fcLevel3(rng) {
  const m = rng.pick([2, 3, 4]);
  const c = m * (m - 1);
  return linesItem({
    skill: FC, level: 3, mode: 'tap', keys: KEYS, tapActions: 'menu',
    prompt: `On cherche α = ${m}, racine de f(x) = x² − x − ${c}. Trois reformulations x = φᵢ(x) : φ₁(x) = x² − ${c}, φ₂(x) = √(x + ${c}), φ₃(x) = 1 + ${c}/x. Choisis celle qui converge le plus vite vers ${m}, puis calcule sa pente en α.`,
    start: `d(√(x+${c}),x)`,
    judge: { kind: 'equiv', vars: ['x'], domain: { x: [0.5, 6] }, target: 'no-prime', menu: menuOf(M3, 'deriv') },
    script: [
      {
        kind: 'decision', prompt: 'Quelle fonction d\'itération choisis-tu ?', options: [
          { id: 'p2', label: `φ₂(x) = √(x + ${c}) : |φ₂′(${m})| = 1/${2 * m}`, valid: true, ref: true },
          { id: 'p3', label: `φ₃(x) = 1 + ${c}/x : |φ₃′(${m})| = ${m - 1}/${m}`, valid: true, quality: 'poor', why: `φ₃ converge aussi (en oscillant), mais plus lentement : |φ₃′(${m})| = ${m - 1}/${m} > 1/${2 * m}.` },
          { id: 'p1', label: `φ₁(x) = x² − ${c} : φ₁′(${m}) = ${2 * m}`, valid: false, why: `|φ₁′(${m})| = ${2 * m} > 1 : les itérés s'éloignent de ${m}.` },
        ],
      },
      { kind: 'eq', math: `1/(2√(x+${c}))`, note: '(√u)′ = u′/(2√u)', subgoal: 'deriv' },
      { kind: 'segment', html: `La pente en α = ${m}.`, ask: `φ₂′(${m}) =`, start: { math: `1/(2√(${m}+${c}))` }, judge: { kind: 'value', form: 'irreducible', menu: menuOf(M3, 'eval') } },
      { kind: 'eq', math: `1/${2 * m}`, note: `√${m * m} = ${m}`, subgoal: 'decide' },
    ],
    hints: H('La méthode converge le plus vite quand |φ′(α)| est le plus petit (et < 1).',
      `φ₂′(x) = 1/(2√(x + ${c})), donc φ₂′(${m}) = 1/(2·□).`,
      `φ₂′(${m}) = 1/${2 * m}, φ₃′(${m}) = −${m - 1}/${m}, φ₁′(${m}) = ${2 * m} : φ₂ est la plus rapide.`),
    subgoals: SUB_C, key: `${FC}:3:${m}`, baits: [],
  });
}

// The program fixed_point (catalogue « Item code »).
const FIXED = refCode(`def fixed_point(phi, x0, tol, nmax):
    x = x0
    for k in range(nmax):
        x_new = «phi(x)»
        if «abs(x_new - x) < tol»:
            return [x_new, k + 1]
        x = «x_new»
    return [x, nmax]
`);
const FIX_TESTS = [
  { setup: 'def phi(x): return 2*x/(1+x)', expr: 'fixed_point(phi, 2.0, 1e-6, 100)', expect: '[1.000000953675226, 19]', tol: 1e-12 },
  { setup: 'def phi(x): return 3*x/(1+x)', expr: 'fixed_point(phi, 1.0, 1e-8, 100)', expect: '[1.9999999982792167, 19]', tol: 1e-12 },
  { setup: 'def phi(x): return math.cos(x)', expr: 'fixed_point(phi, 1.0, 1e-10, 1000)', expect: '[0.7390851332451103, 58]', tol: 1e-12 },
];

function incrementsTable(d) {
  const xs = [d.x0];
  for (let k = 0; k < 8; k++) xs.push((d.a * xs[k]) / (d.b + xs[k]));
  const inc = xs.slice(1).map((x, k) => Math.abs(x - xs[k]));
  return {
    columns: ['k', 'δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾|', 'δₖ/δₖ₋₁'],
    rows: inc.slice(0, 7).map((x, k) => [String(k), expText(x, 3), k ? (x / inc[k - 1]).toFixed(3).replace('.', ',') : '']),
  };
}
function fcLevel5(rng) {
  const d = g1Data(rng);
  const then = readtableItem({
    skill: FC, level: 5, key: `${d.a}:${d.b}:${d.x0}`,
    prompt: `Les incréments de fixed_point pour ${phiT(d)}, x⁽⁰⁾ = ${d.x0} :`,
    table: incrementsTable(d),
    question: multiMcq({
      skill: FC, level: 5, key: `${FC}:read:${d.a}:${d.b}:${d.x0}`,
      prompt: 'Que lit-on sur ce tableau ?',
      options: [
        { html: `La méthode est d'ordre 1 : δₖ/δₖ₋₁ tend vers φ′(${d.alpha}) = ${d.d1}`, correct: true },
        { html: `L'erreur est environ multipliée par ${d.d1} à chaque pas`, correct: true },
        { html: 'La méthode est d\'ordre 2, car les incréments diminuent', correct: false, rule: 'n_order_simple_ratio' },
        { html: `La méthode converge vers 0`, correct: false },
      ],
      solution: [{ html: `Le rapport des incréments tend vers |φ′(α)| = ${d.d1} ≠ 0 : ordre 1, de constante ${d.d1}.`, note: '' }],
    }, rng),
  });
  return codeItem({
    skill: FC, level: 5, ref: FIXED, blanks: holesFor(5, FIXED), rng,
    traps: { 0: [], 1: [], 2: [] }, wrong: { 0: 'phi(x0)', 1: 'abs(x_new - x) > tol', 2: 'x0' },
    prompt: 'Complète la méthode du point fixe : elle s\'arrête quand |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| < tol et renvoie [x, nombre d\'itérations].',
    tests: FIX_TESTS, then, hints: [], subgoals: SUB_C, key: `5:${d.a}:${d.b}:${d.x0}`,
  });
}

function fcMcq(rng, opts) {
  const m = rng.pick([2, 3, 4]);
  const c = m * (m - 1);
  const w = new Q(4, 2 * m - 1);
  return mcq({
    skill: FC, level: 4, key: `${FC}:mcq:${m}`, exam: examTag(opts),
    prompt: `On cherche α = ${m}, racine de f(x) = x² − x − ${c}. Laquelle de ces fonctions d'itération donne une méthode de point fixe qui converge vers ${m} (pour x⁽⁰⁾ assez proche) ?`,
    options: [
      { html: `φ(x) = √(x + ${c})`, correct: true },
      { html: `φ(x) = x² − ${c}`, correct: false },
      { html: `φ(x) = x − (${w})(x² − x − ${c}), car φ′(${m}) = −3 < 1`, correct: false, rule: 'n_fp_abs_forgot' },
      { html: `φ(x) = x + (x² − x − ${c})/${2 * m - 1}`, correct: false },
    ],
    solution: [{ html: `φ′(x) = 1/(2√(x + ${c})), φ′(${m}) = 1/${2 * m} : |φ′(α)| < 1. Pour x² − ${c}, φ′(${m}) = ${2 * m} ; pour x − (${w})f, φ′(${m}) = −3 et |−3| > 1.`, note: '' }],
  }, rng);
}

function fcTf(rng, opts) {
  if (rng.chance(0.5)) {
    return tfItem({
      skill: FC, level: 4, key: 'global', exam: examTag(opts),
      statement: 'Si φ est C¹ et |φ′(α)| < 1 au point fixe α, alors la méthode x⁽ᵏ⁺¹⁾ = φ(x⁽ᵏ⁾) converge vers α quel que soit x⁽⁰⁾.',
      truth: false, ruleIfTrue: 'n_fp_phi_at_x0',
      counter: { kind: 'num', prop: 'fpNotGlobal', params: {}, ask: [{ v: 'phi', label: 'φ(x) =' }, { v: 'alpha', label: 'α =' }, { v: 'x0', label: 'x⁽⁰⁾ =' }], answer: { phi: 'x^2', alpha: '0', x0: '2' } },
      explanation: 'Faux : la convergence n\'est que locale. φ(x) = x², α = 0, φ′(0) = 0 ; mais à partir de x⁽⁰⁾ = 2, on obtient 4, 16, 256…',
    });
  }
  return tfItem({
    skill: FC, level: 4, key: 'residual', exam: examTag(opts),
    statement: 'Pour une méthode de point fixe, le résidu |x⁽ᵏ⁾ − φ(x⁽ᵏ⁾)| est toujours une bonne estimation de l\'erreur |x⁽ᵏ⁾ − α|.',
    truth: false,
    counter: { kind: 'num', prop: 'residualNotError', params: {}, ask: [{ v: 'phi', label: 'φ(x) =' }, { v: 'x0', label: 'x⁽⁰⁾ =' }], answer: { phi: '0,99x+0,01', x0: '2' } },
    explanation: 'Faux quand φ′(α) est proche de 1 : erreur ≈ résidu/(1 − φ′(α)). Pour φ(x) = 0,99x + 0,01 (α = 1) et x⁽⁰⁾ = 2, le résidu vaut 0,01 pour une erreur de 1.',
  });
}

export function genFpConverge(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return fcMcq(rng, opts);
  if (opts.exam === 'tf') return fcTf(rng, opts);
  if (level === 3) return fcLevel3(rng);
  if (level === 5) return fcLevel5(rng);
  return fcLines(rng, level);
}

// ======================================================================
// n-fp-order
// ======================================================================

const SUB_O = [
  { id: 'fixed', label: 'α est point fixe pour tout ω', skill: FO },
  { id: 'deriv', label: 'φ′ et φ″', skill: 'g6-deriv-rules' },
  { id: 'order2', label: 'φ′(α) = 0', skill: FO },
  { id: 'order-exact', label: 'φ″(α) ≠ 0 : ordre exactement 2', skill: FO },
  { id: 'conv', label: '|φ′(α)| < 1', skill: FO },
  { id: 'taylor', label: 'Taylor de φ en α', skill: 'a1-dl-usual' },
  { id: 'base', label: 'convergence d\'un point fixe', skill: 'n-fp-converge' },
];

// f = (x − α)(x + β) = x² + px + q, F = f′(α) = α + β.
function foData(rng) {
  for (let t = 0; t < 200; t++) {
    const alpha = rng.int(1, 5);
    const beta = rng.int(-3, 5);
    const F = alpha + beta;
    if (F === 0 || Math.abs(F) > 12 || beta === -alpha) continue;
    if (F < 0 && rng.chance(0.6)) continue;
    const p = beta - alpha;
    const q = -alpha * beta;
    const poly = `x^2${p === 0 ? '' : p === 1 ? '+x' : p === -1 ? '-x' : p > 0 ? `+${p}x` : `${p}x`}${q === 0 ? '' : q > 0 ? `+${q}` : `${q}`}`;
    return { alpha, beta, F, p, q, poly, w: new Q(1, F), d2: new Q(-2, F) };
  }
  return { alpha: 2, beta: 2, F: 4, p: 0, q: -4, poly: 'x^2-4', w: new Q(1, 4), d2: new Q(-1, 2), fallback: true };
}
const polyR = (d) => d.poly.replace(/\^2/, '²').replace(/([+-])/g, ' $1 ').replace(/-/g, '−').trim();
const lin = (d, v) => { // 1 − F·v, written
  const F = d.F;
  return F === 1 ? `1-${v}` : F === -1 ? `1+${v}` : F > 0 ? `1-${F}${v}` : `1+${-F}${v}`;
};
const convSet = (d) => (d.F > 0 ? `]0 ; ${new Q(2, d.F)}[` : `]${new Q(2, d.F)} ; 0[`);
const dphi = (d) => `1-ω(2x${d.p === 0 ? '' : d.p > 0 ? `+${d.p}` : `${d.p}`})`;

const MO = [
  { id: 'deriv', label: 'Calculer φ′(x)' },
  { id: 'solve', label: 'Résoudre φ′(α) = 0', why: 'D\'abord φ′.' },
  { id: 'second', label: 'Calculer φ″(α)', why: 'Il faut d\'abord ω*.' },
  { id: 'order', label: 'Conclure l\'ordre', why: 'Il faut d\'abord φ″(α).' },
  { id: 'conv', label: 'Résoudre |φ′(α)| < 1', why: 'Pas maintenant.' },
];

function foLines(rng, level) {
  const d = foData(rng);
  const guided = level <= 2;
  const M = (id) => (level === 3 ? { menu: menuOf(MO, id) } : {});
  const w = String(d.w);
  const fixedSeg = [
    { kind: 'eq', math: String(d.alpha), note: `f(${d.alpha}) = 0, donc φ_ω(${d.alpha}) = ${d.alpha} pour tout ω`, subgoal: 'fixed' },
  ];
  const derivStart = `d(x-ω(${d.poly}),x)`;
  const derivLine = { kind: 'eq', math: dphi(d), ...(level === 1 ? blankBy(dphi(d), [`2x${d.p === 0 ? '' : d.p > 0 ? `+${d.p}` : `${d.p}`}`]) : {}), note: 'φ′ = 1 − ω·f′', subgoal: 'deriv' };
  const solveSeg = [
    { kind: 'segment', html: `φ_ω′(${d.alpha}) = ${fr(lin(d, 'ω'))} : pour quel ω est-il nul ?`, ask: 'ω :', start: { math: `${lin(d, 'ω')}=0` }, judge: { kind: 'solset', v: 'ω', ...M('solve') } },
    { kind: 'eq', math: `ω=${w}`, ...(guided ? blankBy(`ω=${w}`, [w]) : {}), note: `ω* = 1/f′(${d.alpha})`, subgoal: 'order2' },
  ];
  const secondSeg = [
    { kind: 'segment', html: `φ_ω″(x) = −2ω. Sa valeur en α pour ω = ω* :`, ask: `φ″(${d.alpha}) =`, start: { math: `-2×(${w})` }, judge: { kind: 'value', form: 'irreducible', ...M('second') } },
    { kind: 'eq', math: String(d.d2), ...(guided ? blankBy(String(d.d2), [String(d.d2)]) : {}), note: '≠ 0', subgoal: 'order-exact' },
  ];
  const orderSeg = [
    { kind: 'segment', html: 'L\'ordre de la méthode pour ω = ω* :', ask: 'p =', start: { math: 'p' }, judge: { kind: 'value', expect: '2', form: 'any', order: { p: 2 }, ...M('order') } },
    { kind: 'eq', math: '2', note: 'φ′(α) = 0 et φ″(α) ≠ 0', subgoal: 'order-exact' },
  ];
  if (level === 2) {
    orderSeg.splice(1, 0, {
      kind: 'decision', prompt: `φ′(${d.alpha}) = 0 et φ″(${d.alpha}) = ${fr(String(d.d2))}. Quel est l'ordre ?`, options: [
        { id: 'two', label: 'φ″(α) ≠ 0 : ordre exactement 2', valid: true, ref: true },
        { id: 'three', label: 'φ′(α) = 0, une dérivée de plus : ordre 3', valid: false, rule: 'n_fp_order_count', why: 'L\'ordre est le rang de la première dérivée non nulle : φ″(α) ≠ 0, donc ordre 2.' },
        { id: 'one', label: 'φ″(α) ≠ 0 : ordre 1', valid: false, rule: 'n_fp_order_count', why: 'φ′(α) = 0 : l\'ordre est au moins 2 ; φ″(α) ≠ 0 donne exactement 2.' },
      ],
    });
  }
  const convSeg = [
    { kind: 'segment', html: `Pour quels ω la méthode converge-t-elle vers ${d.alpha} (|φ_ω′(${d.alpha})| < 1) ?`, ask: 'ω ∈', start: { math: `|${lin(d, 'ω')}|<1` }, judge: { kind: 'solset', v: 'ω', ...M('conv') } },
    { kind: 'eq', math: convSet(d), note: `−1 < ${fr(lin(d, 'ω'))} < 1`, subgoal: 'conv' },
  ];
  const script = [];
  let start;
  let judge;
  if (level === 1) {
    start = derivStart;
    judge = { kind: 'equiv', vars: ['x', 'ω'], domain: { x: [-3, 3], ω: [-1, 1] }, target: 'no-prime' };
    script.push(derivLine, ...solveSeg, ...secondSeg);
  } else if (level === 4) {
    start = `${d.alpha}-ω×(${d.alpha}^2${d.p === 0 ? '' : d.p > 0 ? `+${d.p}×${d.alpha}` : `${d.p}×${d.alpha}`}${d.q === 0 ? '' : d.q > 0 ? `+${d.q}` : `${d.q}`})`;
    judge = { kind: 'equiv', vars: ['ω'], target: 'constant' };
    script.push(...fixedSeg,
      { kind: 'segment', html: 'φ_ω′(x) :', ask: 'φ′(x) =', start: { math: derivStart }, judge: { kind: 'equiv', vars: ['x', 'ω'], domain: { x: [-3, 3], ω: [-1, 1] }, target: 'no-prime' } }, derivLine,
      ...solveSeg, ...secondSeg, ...orderSeg, ...convSeg);
  } else {
    start = derivStart;
    judge = { kind: 'equiv', vars: ['x', 'ω'], domain: { x: [-3, 3], ω: [-1, 1] }, target: 'no-prime', ...M('deriv') };
    script.push(derivLine, ...solveSeg, ...secondSeg, ...orderSeg);
  }
  return linesItem({
    skill: FO, level, mode: guided ? 'guided' : level === 3 ? 'tap' : 'free', keys: KEYS, tapActions: level === 3 ? 'menu' : null,
    prompt: `φ_ω(x) = x − ω(${polyR(d)}), de point fixe α = ${d.alpha}. ${level === 4 ? 'Vérifie que α est point fixe pour tout ω, trouve ω* pour que la méthode soit d\'ordre ≥ 2, son ordre exact, puis les ω pour lesquels elle converge.' : 'Calcule φ_ω′, trouve ω* qui annule φ_ω′(α), puis φ″(α) pour conclure l\'ordre.'}`,
    start, judge, script,
    hints: H('L\'ordre est le rang de la première dérivée de φ qui ne s\'annule pas en α.',
      `φ′(${d.alpha}) = 1 − ω·□`,
      `φ′(${d.alpha}) = ${fr(lin(d, 'ω'))} = 0 ⇔ ω = ${fr(w)} ; φ″(${d.alpha}) = ${fr(String(d.d2))} ≠ 0 : ordre 2.`),
    subgoals: SUB_O, key: `${FO}:${level}:${d.alpha}:${d.beta}`, baits: ['n_fp_order_count'], fallback: d.fallback,
  });
}

// L5: the increments for ω₁ = 4/(5F) and ω*, to read.
function foLevel5(rng) {
  const d = foData(rng);
  const f = (x) => (x - d.alpha) * (x + d.beta);
  const run = (w) => {
    const xs = [d.alpha + 0.5];
    for (let k = 0; k < 7; k++) xs.push(xs[k] - w * f(xs[k]));
    return xs.slice(1).map((x, k) => Math.abs(x - xs[k]));
  };
  const w1 = new Q(4, 5 * d.F);
  const i1 = run(w1.valueOf());
  const i2 = run(d.w.valueOf());
  const rows = [];
  for (let k = 0; k < 6; k++) {
    const ok2 = i2[k] > 1e-15;
    rows.push([String(k), expText(i1[k], 3), k ? (i1[k] / i1[k - 1]).toFixed(3).replace('.', ',') : '',
      ok2 ? expText(i2[k], 3) : '', k && ok2 && i2[k - 1] > 1e-15 ? (i2[k] / i2[k - 1] ** 2).toFixed(3).replace('.', ',') : '']);
  }
  const r1 = new Q(1, 5);
  const c2 = new Q(1, Math.abs(d.F));
  return readtableItem({
    skill: FO, level: 5, key: `${d.alpha}:${d.beta}`,
    prompt: `Incréments δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| de φ_ω(x) = x − ω(${polyR(d)}), à partir de x⁽⁰⁾ = ${fr(String(d.alpha + 0.5))}, pour ω₁ = ${w1} et ω* = ${d.w}. Que peut-on en conclure ?`,
    table: { columns: ['k', `δₖ (ω₁ = ${w1})`, 'r₁ = δₖ/δₖ₋₁', `δₖ (ω* = ${d.w})`, 'r₂ = δₖ/δₖ₋₁²'], rows },
    question: multiMcq({
      skill: FO, level: 5, key: `${FO}:read:${d.alpha}:${d.beta}`, prompt: 'Coche les affirmations justes.',
      options: [
        { html: `Pour ω₁ : ordre 1, le rapport tend vers |1 − ω₁f′(α)| = ${r1}`, correct: true },
        { html: `Pour ω* : ordre 2, r₂ tend vers |φ″(α)|/2 = ${c2}`, correct: true },
        { html: 'Pour ω₁ : ordre 2', correct: false, rule: 'n_order_simple_ratio' },
        { html: 'Pour ω* : ordre 1, car δₖ/δₖ₋₁ tend vers 0', correct: false, rule: 'n_order_simple_ratio' },
      ],
      solution: [{ html: `ω₁ : r₁ → ${r1} ≠ 0, ordre 1. ω* : r₁ → 0 mais r₂ → ${c2} ≠ 0, ordre 2.`, note: '' }],
    }, rng),
    subgoals: SUB_O,
  });
}

function foMcq(rng, opts) {
  const a = rng.int(-1, 3);
  const A = (k) => fr(String(a + k));
  return mcq({
    skill: FO, level: 4, key: `${FO}:mcq:${a}`, exam: examTag(opts),
    prompt: `On considère x⁽ᵏ⁺¹⁾ = (x⁽ᵏ⁾ − ${fr(String(a))})³ + ${fr(String(a))}`.replace('− −', '+ ').replace('+ −', '− ') + `, dont les points fixes sont ${A(-1)}, ${A(0)} et ${A(1)}. Que peut-on dire ?`,
    options: [
      { html: `La méthode converge vers ${A(0)} à l'ordre 3 (pour x⁽⁰⁾ assez proche), jamais vers ${A(-1)} ni ${A(1)}`, correct: true },
      { html: `Elle converge vers ${A(0)} à l'ordre 2`, correct: false, rule: 'n_fp_order_count' },
      { html: `Elle converge vers ${A(0)} à l'ordre 1`, correct: false, rule: 'n_fp_order_count' },
      { html: `Elle converge vers chacun des trois points fixes, à l'ordre 1`, correct: false },
    ],
    solution: [{ html: `φ′(x) = 3(x − ${fr(String(a))})² : φ′(${A(-1)}) = φ′(${A(1)}) = 3 > 1. En ${A(0)}, φ′ = φ″ = 0 et φ‴ = 6 ≠ 0 : ordre 3.`, note: '' }],
  }, rng);
}

function foTf(rng, opts) {
  if (rng.chance(0.5)) {
    return tfItem({
      skill: FO, level: 4, key: 'order2', exam: examTag(opts),
      statement: 'Si φ′(α) = 0 au point fixe α, la méthode de point fixe est d\'ordre 2.',
      truth: false, ruleIfTrue: 'n_fp_order_count',
      counter: { kind: 'num', prop: 'orderAboveTwo', params: {}, ask: [{ v: 'phi', label: 'φ(x) =' }, { v: 'alpha', label: 'α =' }], answer: { phi: '(x-1)^3+1', alpha: '1' } },
      explanation: 'Faux : elle est d\'ordre au moins 2. Pour φ(x) = (x − 1)³ + 1 en α = 1, φ′(1) = φ″(1) = 0 et φ‴(1) = 6 : ordre 3.',
    });
  }
  return tfItem({
    skill: FO, level: 4, key: 'order2exact', exam: examTag(opts),
    statement: 'Si φ′(α) = 0 et φ″(α) ≠ 0 au point fixe α (φ de classe C²), la méthode est d\'ordre exactement 2.',
    truth: true, ruleIfFalse: 'n_fp_order_count',
    explanation: 'Vrai : par Taylor, x⁽ᵏ⁺¹⁾ − α = φ″(ξ)/2·(x⁽ᵏ⁾ − α)², et le rapport tend vers |φ″(α)|/2 ≠ 0.',
  });
}

function foCoef(rng, opts) {
  const d = foData(rng);
  return coefItem({
    skill: FO, level: 4, key: `${d.alpha}:${d.beta}`, label: 'ω', value: String(d.w), exam: examTag(opts),
    prompt: `φ_ω(x) = x − ω(${polyR(d)}), de point fixe α = ${d.alpha}. Pour quelle valeur de ω la méthode est-elle d'ordre au moins 2 ?`,
    note: `φ′(${d.alpha}) = ${fr(lin(d, 'ω'))} = 0`,
    solution: [{ html: `φ_ω′(${d.alpha}) = 1 − ω·f′(${d.alpha}) = ${fr(lin(d, 'ω'))} = 0 ⇔ ω = ${fr(String(d.w))}.`, note: '' }],
    subgoals: SUB_O,
  });
}

export function genFpOrder(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return foMcq(rng, opts);
  if (opts.exam === 'tf') return foTf(rng, opts);
  if (opts.exam === 'coef') return foCoef(rng, opts);
  if (level === 5) return foLevel5(rng);
  return foLines(rng, level);
}

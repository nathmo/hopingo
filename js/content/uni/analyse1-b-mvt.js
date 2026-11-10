// a1-mvt (module A1, part b, step U2): Rolle and the mean value theorem,
// bounding a rate of change by the bounds of f′ on the interval.
// Parts: derive f (equiv), then bound f′(c) from below and from above
// (equiv with rel '≥' / '≤' on c ∈ ]p ; q[, the finest bound asked).
// The conclusion −4 < (f(x) − f(y))/(x − y) < 6 is the decision « what
// does the theorem say » (taken at level 1) and the solution.

import { Q } from '../../math/rational.js';
import { tfItem } from './kit.js';
import { N, nz, H, E, examOf, kx, joinSum, P, blanked, partsItem, mcqOf, vfItem, ML, RD } from './analyse1-b-common.js';

const SK = 'a1-mvt';
const KEYS = ['calcx', 'letters', 'relation'];
const SUB = [
  { id: 'deriv', label: 'dériver f', skill: 'a1-deriv-rules' },
  { id: 'image', label: 'image de f′ sur l\'intervalle', skill: 'a1-fn-image' },
  { id: 'conclude', label: 'conclure par le TAF', skill: SK },
];
const CHOICES = [
  { id: 'deriv', label: 'Dériver f' },
  { id: 'min', label: 'Minorer f′(c) : sa plus petite valeur sur l\'intervalle' },
  { id: 'max', label: 'Majorer f′(c) : sa plus grande valeur sur l\'intervalle' },
  { id: 'fvals', label: 'Calculer f aux bornes de l\'intervalle', rule: 'a1_mvt_endpoints_values', why: 'Le taux d\'accroissement est une valeur de f′, pas de f.' },
];
const RATE = '(f(x) − f(y))/(x − y)';

// f(x) = a x² + b x + c on ]p ; q[ (f′ affine), or x³ + k x + d with
// p < 0 < q (f′ = 3x² + k, smallest at 0).
function quadData(rng) {
  for (let i = 0; i < 200; i++) {
    const a = rng.pick([1, -1, 2, -2]);
    const b = rng.int(-6, 6);
    const c = rng.int(-6, 9);
    const p = rng.int(-3, 1);
    const qq = p + rng.int(2, 5);
    const d1 = 2 * a * p + b;
    const d2 = 2 * a * qq + b;
    if (Math.abs(d1) > 24 || Math.abs(d2) > 24) continue;
    return { kind: 'quad', a, b, c, p, q: qq, lo: Math.min(d1, d2), hi: Math.max(d1, d2), atLo: d1 < d2 ? p : qq, atHi: d1 < d2 ? qq : p };
  }
  return { kind: 'quad', a: 1, b: -2, c: 5, p: -1, q: 4, lo: -4, hi: 6, atLo: -1, atHi: 4, fallback: true };
}
function cubicData(rng) {
  for (let i = 0; i < 200; i++) {
    const k = rng.int(-6, 6);
    const d = rng.int(-4, 4);
    const p = rng.int(-3, -1);
    const qq = rng.int(1, 3);
    if (p === -qq) continue;
    const far = Math.abs(p) > qq ? p : qq;
    return { kind: 'cubic', k, d, p, q: qq, far, lo: k, hi: 3 * far * far + k };
  }
  return { kind: 'cubic', k: -3, d: 1, p: -1, q: 2, far: 2, lo: -3, hi: 9, fallback: true };
}

const fText = (D) => (D.kind === 'quad' ? joinSum([kx(D.a, 'x^2'), kx(D.b, 'x'), N(D.c)]) : joinSum(['x^3', kx(D.k, 'x'), N(D.d)]));
const dText = (D, v = 'x') => (D.kind === 'quad' ? joinSum([kx(2 * D.a, v), N(D.b)]) : joinSum([`3${v}^2`, N(D.k)]));
const atText = (D, val) => (D.kind === 'quad' ? joinSum([`${N(2 * D.a)}×${P(val)}`, N(D.b)]) : joinSum([`3×${P(val)}^2`, N(D.k)]));
const fAt = (D, x) => (D.kind === 'quad' ? D.a * x * x + D.b * x + D.c : x ** 3 + D.k * x + D.d);
const I = (D) => `]${RD(D.p)} ; ${RD(D.q)}[`;

function tafDecision(D) {
  return {
    kind: 'decision', prompt: `Que dit le théorème des accroissements finis sur ${RATE} ?`,
    options: [
      { id: 'taf', label: `${RATE} = f′(c) pour un c entre x et y`, valid: true },
      { id: 'rolle', label: `Rolle : f′(c) = 0 pour un c, donc le taux vaut 0`, valid: false, rule: 'a1_rolle_without_hyp', why: 'Rolle demande f(x) = f(y) : ce n\'est pas le cas en général.' },
      { id: 'fvals', label: `Le taux est compris entre f(${RD(D.p)}) et f(${RD(D.q)})`, valid: false, rule: 'a1_mvt_endpoints_values', why: 'Le taux d\'accroissement est une pente, une valeur de f′ : on encadre f′, pas f.' },
      { id: 'tvi', label: 'TVI : f prend toutes les valeurs entre f(x) et f(y)', valid: false, why: 'Le TVI parle des valeurs de f ; le taux est une pente : c\'est le TAF.' },
    ],
  };
}

function mvtLines(level, rng, opts) {
  const D = level === 5 || (level === 4 && rng.chance(0.4)) ? cubicData(rng) : quadData(rng);
  const f = fText(D);
  const fp = dText(D);
  const fc = dText(D, 'c');
  const guided = level <= 2;
  const bound = (rel) => ({ kind: 'equiv', vars: ['c'], domain: { c: [D.p, D.q] }, rel, bound: N(rel === '≥' ? D.lo : D.hi) });
  // Lines of the two bounds.
  let minLines;
  let maxLines;
  if (D.kind === 'quad') {
    minLines = guided ? [blanked(E(atText(D, D.atLo), `f′ est affine : sa plus petite valeur est en c = ${RD(D.atLo)}`, 'image', 'min'), [N(D.atLo)]), E(N(D.lo), 'Calculer', 'conclude', 'min')] : [E(N(D.lo), `f′ est affine : minimum en c = ${RD(D.atLo)}`, 'conclude', 'min')];
    maxLines = guided ? [blanked(E(atText(D, D.atHi), `Plus grande valeur en c = ${RD(D.atHi)}`, 'image', 'max'), [N(D.atHi)]), E(N(D.hi), 'Calculer', 'conclude', 'max')] : [E(N(D.hi), `Maximum en c = ${RD(D.atHi)}`, 'conclude', 'max')];
  } else {
    minLines = [E(N(D.lo), 'c² ≥ 0', 'conclude', 'min')];
    maxLines = [E(N(D.hi), `c² ≤ ${D.far * D.far} sur ${I(D)}`, 'conclude', 'max')];
  }
  const derive = { start: `d(${f})`, judge: { kind: 'equiv', vars: ['x'], domain: { x: [-3, 3] }, target: 'no-prime' }, lines: [level === 2 ? blanked(E(fp, 'Dériver', 'deriv', 'deriv'), [kx(2 * D.a, 'x')]) : E(fp, 'Dériver', 'deriv', 'deriv')] };
  const minPart = { start: fc, judge: bound('≥'), html: `Pour c ∈ ${I(D)}, minore f′(c) au plus juste :`, ask: 'f′(c) ≥', lines: minLines };
  const maxPart = { start: fc, judge: bound('≤'), html: `Pour c ∈ ${I(D)}, majore f′(c) au plus juste :`, ask: 'f′(c) ≤', lines: maxLines };
  const parts = level === 1 ? [minPart, maxPart] : [derive, minPart, maxPart];
  const before = level === 1
    ? [{ kind: 'note', html: `TAF : ${RATE} = f′(c) pour un c entre x et y. Ici f′(x) = ${ML(fp)}.` }]
    : [tafDecision(D)];
  const prompt = rng.chance(0.5)
    ? `Soit f(x) = ${ML(f)}. Encadre ${RATE} pour x ≠ y dans ${I(D)}, au plus juste.`
    : `Soit f(x) = ${ML(f)} sur ${I(D)}. Trouve le plus grand m et le plus petit M tels que m ≤ ${RATE} ≤ M pour tous x ≠ y de l'intervalle.`;
  return partsItem({
    skill: SK, level, prompt, parts, before, choices: CHOICES,
    hints: H('Le taux d\'accroissement est une valeur de f′ : encadre f′ sur l\'intervalle.', `f′(c) = ${ML(fc, ['c'])} ∈ [▢ ; ▢]`, `${RD(D.lo)} ≤ f′(c) ≤ ${RD(D.hi)}, donc ${RD(D.lo)} ≤ ${RATE} ≤ ${RD(D.hi)}.`),
    subgoals: SUB, keys: KEYS, key: `${SK}:${f}:${D.p}:${D.q}:${level}`, exam: examOf(opts), fallback: D.fallback,
  });
}

// ---------- exam variants ----------

function mcqVariant(rng, opts) {
  if (rng.chance(0.65)) {
    const D = quadData(rng);
    const f = fText(D);
    const fa = fAt(D, D.p);
    const fb = fAt(D, D.q);
    const r = (lo, hi) => `${RD(lo)} &lt; ${RATE} &lt; ${RD(hi)}`;
    const options = [
      { html: r(D.lo, D.hi), correct: true },
      { html: r(Math.min(fa, fb), Math.max(fa, fb)), correct: false, rule: 'a1_mvt_endpoints_values' },
      { html: `${RATE} = 0, par le théorème de Rolle`, correct: false, rule: 'a1_rolle_without_hyp' },
      { html: r(-D.hi, -D.lo), correct: false },
      { html: r(D.lo - 2, D.hi + 2), correct: false },
    ];
    return mcqOf({
      skill: SK, level: 4, prompt: `Soit f(x) = ${ML(f)}. Pour tous x ≠ y dans ${I(D)}, quel est le meilleur encadrement ?`,
      options, key: `mcq:${f}:${D.p}:${D.q}`, expectedSec: 240, exam: examOf(opts),
      solution: [{ html: `TAF : ${RATE} = f′(c) avec c entre x et y. f′(c) = ${ML(dText(D, 'c'), ['c'])} est affine : sur ${I(D)}, elle reste entre ${RD(D.lo)} et ${RD(D.hi)}.`, note: '' }],
      fallback: D.fallback,
    }, rng);
  }
  // Template (b), exam 2021: f′ ≥ k, what about f(L)?
  const k = nz(rng, -5, 5);
  const a = rng.int(-6, 6);
  const L = rng.int(2, 6);
  const w = a + k * L;
  const options = [
    { html: `f(${L}) ≥ ${RD(w)}`, correct: true },
    { html: `f(${L}) ≥ ${RD(k * L)}`, correct: false },
    { html: `f(${L}) ≥ ${RD(a + k)}`, correct: false },
    { html: `f(${L}) ≤ ${RD(w)}`, correct: false },
    { html: `f(${L}) ≥ ${RD(w + 1)}`, correct: false },
  ];
  return mcqOf({
    skill: SK, level: 4, prompt: `f est dérivable sur ℝ, f(0) = ${RD(a)} et f′(x) ≥ ${RD(k)} pour tout x. Que peut-on affirmer ?`,
    options, key: `mcq:b:${k}:${a}:${L}`, expectedSec: 240, exam: examOf(opts),
    solution: [{ html: `TAF sur [0 ; ${L}] : f(${L}) − f(0) = ${L}·f′(c) ≥ ${RD(k * L)}, donc f(${L}) ≥ ${RD(a)} + ${RD(k * L)} = ${RD(w)}.`, note: '' }],
  }, rng);
}

// |f(x) − f(y)| ≤ K·|x − y| on [p ; q]: true with K = max |f′|, false
// with a smaller K (a counter-example pair close to where |f′| is largest).
function lipschitzTf(rng, opts) {
  for (let i = 0; i < 200; i++) {
    const D = quadData(rng);
    const M = Math.max(Math.abs(D.lo), Math.abs(D.hi));
    if (M < 3) continue;
    const truth = rng.chance(0.4);
    const K = truth ? M : M - rng.int(1, 2);
    const f = fText(D);
    const fv = (x) => fAt(D, x);
    const hyp = `${N(D.p)}≤x≤${N(D.q)}∧${N(D.p)}≤y≤${N(D.q)}`;
    const pred = `${hyp}⇒|(${f})-(${f.replace(/x/g, 'y')})|≤${K}×|x-y|`;
    let answer = null;
    if (!truth) {
      for (let s = 4 * D.p; s <= 4 * D.q && !answer; s++) {
        for (let t = s + 1; t <= 4 * D.q && !answer; t++) {
          const x = s / 4;
          const y = t / 4;
          if (Math.abs(fv(x) - fv(y)) > K * Math.abs(x - y) + 1e-9) answer = { x: N(new Q(s, 4)), y: N(new Q(t, 4)) };
        }
      }
      if (!answer) continue;
    }
    const at = Math.abs(D.lo) > Math.abs(D.hi) ? D.atLo : D.atHi;
    return tfItem({
      skill: SK, level: 4, key: `lip:${f}:${D.p}:${D.q}:${K}`,
      statement: `Pour f(x) = ${ML(f)} et tous x, y ∈ [${RD(D.p)} ; ${RD(D.q)}] : |f(x) − f(y)| ≤ ${K}·|x − y|.`,
      truth,
      counter: truth ? null : { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }, { q: '∀', v: 'y', dom: 'R' }], pred, hyp, ask: [{ v: 'x', label: 'x =' }, { v: 'y', label: 'y =' }], answer },
      explanation: `TAF : |f(x) − f(y)| = |f′(c)|·|x − y|, et |f′| vaut au plus ${M} sur l'intervalle (en ${RD(at)}). ${truth ? 'Vrai.' : `Faux : ${K} < ${M}, l'inégalité casse près de ${RD(at)}.`}`,
      exam: examOf(opts),
    });
  }
  return tfItem({
    skill: SK, level: 4, key: 'lip:sin', statement: 'Pour tous x, y réels : |sin x − sin y| ≤ |x − y|.', truth: true,
    explanation: 'Vrai : TAF, |sin x − sin y| = |cos c|·|x − y| ≤ |x − y|.', exam: examOf(opts), fallback: true,
  });
}

const FIXED_TF = [
  { statement: 'Si f est continue sur [−1 ; 1] et f(−1) = f(1), alors il existe x₀ ∈ ]−1 ; 1[ tel que f′(x₀) = 0.', truth: false, rule: 'a1_rolle_without_hyp', why: 'Faux : f(x) = |x| est continue, f(−1) = f(1), mais f′ vaut ±1 et n\'existe pas en 0. Rolle demande f dérivable sur ]−1 ; 1[.' },
  { statement: 'Si f, g sont continues sur [a ; b], dérivables sur ]a ; b[ et f′ ≤ g′, alors f ≤ g sur [a ; b].', truth: false, why: 'Faux : f = 1 et g = 0 ont f′ = g′ = 0, mais f > g. Le TAF donne seulement f(x) − f(a) ≤ g(x) − g(a).' },
  { statement: 'Si f ∈ C¹(ℝ) et que f′(x) = 0 a une seule solution, alors f(x) = 1 a au plus deux solutions.', truth: true, why: 'Vrai : trois solutions a < b < c donneraient, par Rolle sur [a ; b] et sur [b ; c], deux zéros de f′.' },
  { statement: 'Si f est dérivable sur ]0 ; 1[, continue sur [0 ; 1] et f(0) = f(1), alors f′ s\'annule sur ]0 ; 1[.', truth: true, why: 'Vrai : c\'est le théorème de Rolle, ses hypothèses sont toutes là.' },
];

function tfVariant(rng, opts) {
  if (rng.chance(0.5)) return lipschitzTf(rng, opts);
  const s = rng.pick(FIXED_TF);
  return vfItem({ skill: SK, statement: s.statement, truth: s.truth, rule: s.rule, why: s.why, key: s.statement, exam: examOf(opts) }, rng);
}

export function mvtItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return mcqVariant(rng, opts);
  if (opts.exam === 'tf') return tfVariant(rng, opts);
  return mvtLines(level, rng, opts);
}

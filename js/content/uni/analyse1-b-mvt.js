// a1-mvt (module A1, part b, step U2): Rolle and the mean value theorem,
// bounding a rate of change by the bounds of f′ on the interval.
// Parts: derive f (equiv), then bound f′(c) from below and from above
// (equiv with rel '≥' / '≤' on c ∈ ]p ; q[, the finest bound asked).
// The conclusion −4 < (f(x) − f(y))/(x − y) < 6 is the decision « what
// does the theorem say » (taken at level 1) and the solution.

import { Q } from '../../math/rational.js';
import { tfItem } from './kit.js';
import { N, nz, H, E, examOf, kx, joinSum, P, blanked, partsItem, mcqOf, vfItem, ML, RD } from './analyse1-b-common.js';
import { t } from '../../i18n.js';

const SK = 'a1-mvt';
const KEYS = ['calcx', 'letters', 'relation'];
const SUB = [
  { id: 'deriv', label: t('dériver f'), skill: 'a1-deriv-rules' },
  { id: 'image', label: t('image de f′ sur l\'intervalle'), skill: 'a1-fn-image' },
  { id: 'conclude', label: t('conclure par le TAF'), skill: SK },
];
const CHOICES = [
  { id: 'deriv', label: t('Dériver f') },
  { id: 'min', label: t('Minorer f′(c) : sa plus petite valeur sur l\'intervalle') },
  { id: 'max', label: t('Majorer f′(c) : sa plus grande valeur sur l\'intervalle') },
  { id: 'fvals', label: t('Calculer f aux bornes de l\'intervalle'), rule: 'a1_mvt_endpoints_values', why: t('Le taux d\'accroissement est une valeur de f′, pas de f.') },
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
    kind: 'decision', prompt: t('Que dit le théorème des accroissements finis sur {RATE} ?', { RATE }),
    options: [
      { id: 'taf', label: t('{RATE} = f′(c) pour un c entre x et y', { RATE }), valid: true },
      { id: 'rolle', label: t('Rolle : f′(c) = 0 pour un c, donc le taux vaut 0'), valid: false, rule: 'a1_rolle_without_hyp', why: t('Rolle demande f(x) = f(y) : ce n\'est pas le cas en général.') },
      { id: 'fvals', label: t('Le taux est compris entre f({p}) et f({q})', { p: RD(D.p), q: RD(D.q) }), valid: false, rule: 'a1_mvt_endpoints_values', why: t('Le taux d\'accroissement est une pente, une valeur de f′ : on encadre f′, pas f.') },
      { id: 'tvi', label: t('TVI : f prend toutes les valeurs entre f(x) et f(y)'), valid: false, why: t('Le TVI parle des valeurs de f ; le taux est une pente : c\'est le TAF.') },
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
    minLines = guided ? [blanked(E(atText(D, D.atLo), t('f′ est affine : sa plus petite valeur est en c = {atLo}', { atLo: RD(D.atLo) }), 'image', 'min'), [N(D.atLo)]), E(N(D.lo), t('Calculer'), 'conclude', 'min')] : [E(N(D.lo), t('f′ est affine : minimum en c = {atLo}', { atLo: RD(D.atLo) }), 'conclude', 'min')];
    maxLines = guided ? [blanked(E(atText(D, D.atHi), t('Plus grande valeur en c = {atHi}', { atHi: RD(D.atHi) }), 'image', 'max'), [N(D.atHi)]), E(N(D.hi), t('Calculer'), 'conclude', 'max')] : [E(N(D.hi), t('Maximum en c = {atHi}', { atHi: RD(D.atHi) }), 'conclude', 'max')];
  } else {
    minLines = [E(N(D.lo), 'c² ≥ 0', 'conclude', 'min')];
    maxLines = [E(N(D.hi), t('c² ≤ {p1} sur {D}', { p1: D.far * D.far, D: I(D) }), 'conclude', 'max')];
  }
  const derive = { start: `d(${f})`, html: t('Dérive f :'), judge: { kind: 'equiv', vars: ['x'], domain: { x: [-3, 3] }, target: 'no-prime' }, lines: [level === 2 ? blanked(E(fp, t('Dériver'), 'deriv', 'deriv'), [kx(2 * D.a, 'x')]) : E(fp, t('Dériver'), 'deriv', 'deriv')] };
  const minPart = { start: fc, judge: bound('≥'), html: t('Pour c ∈ {D}, minore f′(c) au plus juste :', { D: I(D) }), ask: 'f′(c) ≥', lines: minLines };
  const maxPart = { start: fc, judge: bound('≤'), html: t('Pour c ∈ {D}, majore f′(c) au plus juste :', { D: I(D) }), ask: 'f′(c) ≤', lines: maxLines };
  const parts = level === 1 ? [minPart, maxPart] : [derive, minPart, maxPart];
  const before = level === 1
    ? [{ kind: 'note', html: t('TAF : {RATE} = f′(c) pour un c entre x et y. Ici f′(x) = {fp}.', { RATE, fp: ML(fp) }) }]
    : [tafDecision(D)];
  const prompt = rng.chance(0.5)
    ? t('Soit f(x) = {f}. Encadre {RATE} pour x ≠ y dans {D}, au plus juste.', { f: ML(f), RATE, D: I(D) })
    : t('Soit f(x) = {f} sur {D}. Trouve le plus grand m et le plus petit M tels que m ≤ {RATE} ≤ M pour tous x ≠ y de l\'intervalle.', { f: ML(f), D: I(D), RATE });
  return partsItem({
    skill: SK, level, prompt, parts, before, choices: CHOICES,
    hints: H(t('Le taux d\'accroissement est une valeur de f′ : encadre f′ sur l\'intervalle.'), `f′(c) = ${ML(fc, ['c'])} ∈ [▢ ; ▢]`, t('{lo} ≤ f′(c) ≤ {hi}, donc {lo2} ≤ {RATE} ≤ {hi2}.', { lo: RD(D.lo), hi: RD(D.hi), lo2: RD(D.lo), RATE, hi2: RD(D.hi) })),
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
      { html: t('{RATE} = 0, par le théorème de Rolle', { RATE }), correct: false, rule: 'a1_rolle_without_hyp' },
      { html: r(-D.hi, -D.lo), correct: false },
      { html: r(D.lo - 2, D.hi + 2), correct: false },
    ];
    return mcqOf({
      skill: SK, level: 4, prompt: t('Soit f(x) = {f}. Pour tous x ≠ y dans {D}, quel est le meilleur encadrement ?', { f: ML(f), D: I(D) }),
      options, key: `mcq:${f}:${D.p}:${D.q}`, expectedSec: 240, exam: examOf(opts),
      solution: [{ html: t('TAF : {RATE} = f′(c) avec c entre x et y. f′(c) = {p1} est affine : sur {D}, elle reste entre {lo} et {hi}.', { RATE, p1: ML(dText(D, 'c'), ['c']), D: I(D), lo: RD(D.lo), hi: RD(D.hi) }), note: '' }],
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
    skill: SK, level: 4, prompt: t('f est dérivable sur ℝ, f(0) = {a} et f′(x) ≥ {k} pour tout x. Que peut-on affirmer ?', { a: RD(a), k: RD(k) }),
    options, key: `mcq:b:${k}:${a}:${L}`, expectedSec: 240, exam: examOf(opts),
    solution: [{ html: t('TAF sur [0 ; {L}] : f({L}) − f(0) = {L}·f′(c) ≥ {p1}, donc f({L}) ≥ {a} + {p2} = {w}.', { L, p1: RD(k * L), a: RD(a), p2: RD(k * L), w: RD(w) }), note: '' }],
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
      statement: t('Pour f(x) = {f} et tous x, y ∈ [{p} ; {q}] : |f(x) − f(y)| ≤ {K}·|x − y|.', { f: ML(f), p: RD(D.p), q: RD(D.q), K }),
      truth,
      counter: truth ? null : { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }, { q: '∀', v: 'y', dom: 'R' }], pred, hyp, ask: [{ v: 'x', label: 'x =' }, { v: 'y', label: 'y =' }], answer },
      explanation: t('TAF : |f(x) − f(y)| = |f′(c)|·|x − y|, et |f′| vaut au plus {M} sur l\'intervalle (en {at}). {p1}', { M, at: RD(at), p1: truth ? t('Vrai.') : t('Faux : {K} < {M}, l\'inégalité casse près de {at}.', { K, M, at: RD(at) }) }),
      exam: examOf(opts),
    });
  }
  return tfItem({
    skill: SK, level: 4, key: 'lip:sin', statement: t('Pour tous x, y réels : |sin x − sin y| ≤ |x − y|.'), truth: true,
    explanation: t('Vrai : TAF, |sin x − sin y| = |cos c|·|x − y| ≤ |x − y|.'), exam: examOf(opts), fallback: true,
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
  return vfItem({ skill: SK, statement: t(s.statement), truth: s.truth, rule: s.rule, why: t(s.why), key: s.statement, exam: examOf(opts) }, rng);
}

export function mvtItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return mcqVariant(rng, opts);
  if (opts.exam === 'tf') return tfVariant(rng, opts);
  return mvtLines(level, rng, opts);
}

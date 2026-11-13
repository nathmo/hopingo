// n-fd-roundoff (module N, part d, step U9): the trade-off between
// truncation and round-off. Catalogue: docs/universite/N-analyse-numerique.md,
// n-fd-roundoff.
//
// The model: E(h) = (h/2)·M₂ + 2ε·M₀/h for the forward difference
// (M₀ ≈ max|f|, M₂ ≈ max|f″|, ε the relative round-off), whose minimum is
// h* = 2√(εM₀/M₂); for the centred one E(h) = (h²/6)·M₃ + ε·M₀/h and
// h* = ∛(3εM₀/M₃). ε stays a letter in the lines (judged by `equiv` on
// ε ∈ [0,5 ; 2]): with ε = 10⁻¹⁶ as a number, the round-off term would be
// lost in the numerical comparison. M₀, M₂ are squares, so that h* is a
// whole or simple multiple of √ε; 3M₀/M₃ = 1 for the centred formula.
// L1 E′(h), then h* (letter H, judged against its value in ε), then
// h*/10⁻⁸ for ε = 10⁻¹⁶; L2 the student writes E(h) after choosing its two
// terms; L3 a table of errors in double precision: where is the best h?;
// L4 the centred formula; L5 the table of both formulas and a question
// with several answers. Exam: tf (« plus h est petit… » with a
// counter-example checked in double precision).

import { t } from '../../i18n.js';
import { mcq, linesItem, tfItem, examTag } from './kit.js';
import { readtableItem, multiMcq, expText, blankBy } from './numerique-kit.js';
import { q, H, FUNCS, fwd, cent, hText } from './numerique-d-kit.js';

const SK = 'n-fd-roundoff';
const SUB = [
  { id: 'model', label: t('troncature + arrondi'), skill: 'n-err-float' },
  { id: 'min', label: t('minimiser E(h)'), skill: 'a1-extrema-global' },
  { id: 'read', label: t('lire le tableau'), skill: SK },
];
const KEYS = ['calc', 'greek'];
const EPS = { kind: 'equiv', vars: ['h', 'ε'], domain: { h: [0.5, 2], ε: [0.5, 2] } };

const fq = (x) => String(q(x)).replace('-', '−');
// A coefficient before a letter: 1 is not written.
const co = (x) => (q(x).eq(1) ? '' : String(q(x)));
// k·√ε as CAS text and as text.
const kRoot = (k) => (q(k).eq(1) ? '√ε' : `${String(q(k))}√ε`);

function data(rng) {
  const M0 = rng.pick([1, 4, 9]);
  const M2 = rng.pick([1, 4, 9]);
  const k = q(2 * Math.sqrt(M0), Math.sqrt(M2)); // h* = k√ε
  return { M0, M2, k, E: `${co(q(M2, 2))}h+${2 * M0}ε/h`, dE: `${String(q(M2, 2))}-${2 * M0}ε/h^2`, hstar: `2√(ε×${M0}/${M2})` };
}
const intro = (d) => t('On approche f′(x̄) par la différence progressive, en machine. Près de x̄, max|f| ≈ M₀ = {M0} et max|f″| ≈ M₂ = {M2} ; ε est l\'erreur d\'arrondi relative (ε ≈ 10⁻¹⁶).', { M0: d.M0, M2: d.M2 });
const Etext = (d) => `E(h) = ${co(q(d.M2, 2)).replace('-', '−')}h + ${2 * d.M0}ε/h`;

function hstarSegs(d, guided) {
  const hs = kRoot(d.k);
  const kt = String(d.k);
  return [
    { kind: 'segment', html: t('E′(h) = 0 donne le meilleur pas h*. On le note H et on l\'écrit en fonction de ε.'), ask: 'h* =', start: { math: 'H' }, judge: { kind: 'equiv', vars: ['ε'], domain: { ε: [0.5, 2] }, subst: { H: d.hstar } } },
    { kind: 'eq', math: hs, ...(guided ? blankBy(hs, [hs]) : {}), note: `h*² = 2ε·${d.M0}/(${fq(q(d.M2, 2))}) = ${fq(q(4 * d.M0, d.M2))}ε`, subgoal: 'min' },
    { kind: 'segment', html: t('Avec ε = 10⁻¹⁶ : h* = □·10⁻⁸.'), ask: 'h*/10⁻⁸ =', start: { math: 'H/10^(-8)' }, judge: { kind: 'value', expect: kt, form: 'any' } },
    { kind: 'eq', math: kt, ...(guided ? blankBy(kt, [kt]) : {}), note: `√(10⁻¹⁶) = 10⁻⁸`, subgoal: 'min' },
  ];
}

function level1(rng) {
  const d = data(rng);
  return linesItem({
    skill: SK, level: 1, mode: 'guided', keys: KEYS,
    prompt: t('{intro} L\'erreur totale est majorée par {E}. Dérive E, puis trouve le pas h* qui la rend minimale.', { intro: intro(d), E: Etext(d) }),
    start: `d(${d.E}, h)`, judge: { ...EPS, target: 'no-prime' },
    script: [
      { kind: 'eq', math: d.dE, ...blankBy(d.dE, [`${2 * d.M0}ε/h^2`]), note: t('La dérivée de 1/h est −1/h²'), subgoal: 'min' },
      ...hstarSegs(d, true),
    ],
    hints: H(t('La troncature diminue avec h, l\'arrondi divisé par h augmente : le minimum est là où E′(h) = 0.'),
      `E′(h) = ${fq(q(d.M2, 2))} − ${2 * d.M0}ε/□`,
      t('E′(h) = {a} − {b}ε/h² = 0 donne h* = {hs}, soit {k}·10⁻⁸.', { a: fq(q(d.M2, 2)), b: 2 * d.M0, hs: kRoot(d.k).replace('√', '√'), k: fq(d.k) })),
    subgoals: SUB, key: `${SK}:1:${d.M0}:${d.M2}`, baits: [],
  });
}

function level2(rng) {
  const d = data(rng);
  const decision = {
    kind: 'decision', prompt: t('Quelles erreurs E(h) additionne-t-elle ?'), options: [
      { id: 'ok', label: t('Troncature (h/2)·M₂, plus arrondi 2ε·M₀/h'), valid: true, ref: true },
      { id: 'trunc', label: t('La troncature (h/2)·M₂ seulement'), valid: false, rule: 'n_fd_smaller_h', why: t('En machine, f(x̄ + h) et f(x̄) sont arrondis : leur différence porte une erreur ≈ 2εM₀, divisée par h.') },
      { id: 'minus', label: t('Troncature moins arrondi : (h/2)·M₂ − 2ε·M₀/h'), valid: false, why: t('On majore : les deux erreurs s\'ajoutent dans la borne.') },
    ],
  };
  return linesItem({
    skill: SK, level: 2, mode: 'guided', keys: KEYS,
    prompt: t('{intro} Écris la borne E(h) de l\'erreur, puis trouve le meilleur pas h*.', { intro: intro(d) }),
    start: 'E', judge: { ...EPS, subst: { E: d.E } },
    script: [
      decision,
      { kind: 'eq', math: d.E, ...blankBy(d.E, [`${2 * d.M0}ε/h`]), note: t('Troncature + arrondi'), subgoal: 'model' },
      { kind: 'segment', html: t('Sa dérivée :'), ask: 'E′(h) =', start: { math: `d(${d.E}, h)` }, judge: { ...EPS, target: 'no-prime' } },
      { kind: 'eq', math: d.dE, ...blankBy(d.dE, [d.dE]), note: '', subgoal: 'min' },
      ...hstarSegs(d, true),
    ],
    hints: H(t('Deux erreurs se disputent : celle de Taylor, qui diminue avec h, et l\'arrondi divisé par h, qui augmente.'),
      `E(h) = ${co(q(d.M2, 2))}h + □/h`,
      `${Etext(d)}, E′(h) = ${fq(q(d.M2, 2))} − ${2 * d.M0}ε/h², h* = ${kRoot(d.k)}.`),
    subgoals: SUB, key: `${SK}:2:${d.M0}:${d.M2}`, baits: ['n_fd_smaller_h'],
  });
}

// ---------- tables (double precision) ----------

const HS = [1e-2, 1e-4, 1e-5, 1e-6, 1e-8, 1e-10, 1e-12, 1e-14];
function table(rng, { both = true } = {}) {
  const F = rng.pick(FUNCS);
  const ef = HS.map((h) => Math.abs(F.d(F.x) - fwd(F.f, F.x, h)));
  const ec = HS.map((h) => Math.abs(F.d(F.x) - cent(F.f, F.x, h)));
  const argmin = (e) => e.reduce((b, x, i) => (x < e[b] ? i : b), 0);
  const rows = HS.map((h, i) => [hText(h), expText(ef[i], 3), ...(both ? [expText(ec[i], 3)] : [])]);
  return { F, ef, ec, bestF: argmin(ef), bestC: argmin(ec), table: { columns: ['h', t('progressive'), ...(both ? [t('centrée')] : [])], rows } };
}
const pow10 = (h) => `10<sup>${Math.round(Math.log10(h))}</sup>`.replace('-', '−');

function level3(rng) {
  const tb = table(rng, { both: false });
  const best = HS[tb.bestF];
  const others = [1e-2, 1e-5, 1e-12].filter((h) => h !== best);
  const question = mcq({
    skill: SK, level: 3, key: `${SK}:best:${tb.F.id}`,
    prompt: t('Pour quel pas h la différence progressive est-elle la plus précise ?'),
    options: [
      { html: `h = ${pow10(best)}`, correct: true },
      { html: t('h = {h}, le plus petit', { h: pow10(1e-14) }), correct: false, rule: 'n_fd_smaller_h' },
      ...others.slice(0, 2).map((h) => ({ html: `h = ${pow10(h)}`, correct: false })),
    ],
    solution: [{ html: t('L\'erreur est minimale pour h = {h} ({e}). Au-dessus, la troncature (h/2)·|f″| domine ; en dessous, l\'arrondi ≈ 2ε|f|/h domine et l\'erreur remonte.', { h: pow10(best), e: expText(tb.ef[tb.bestF], 3) }), note: '' }],
  }, rng);
  return readtableItem({
    skill: SK, level: 3, key: `3:${tb.F.id}`,
    prompt: t('Erreurs |f′({x}) − (f({x} + h) − f({x}))/h| calculées en double précision, pour f = {f}.', { x: tb.F.xh, f: tb.F.html }),
    table: tb.table, question,
    hints: H(t('L\'erreur descend tant que la troncature domine, puis remonte quand l\'arrondi divisé par h l\'emporte.'),
      t('Cherche la ligne où l\'erreur est la plus petite : au-dessus et au-dessous, elle est plus grande.'),
      t('Le minimum est en h = {h}.', { h: pow10(best) })),
    subgoals: SUB, baits: ['n_fd_smaller_h'],
  });
}

// ---------- L4: the centred formula ----------

const CENT = [[1, 3], [9, 27], [8, 24], [2, 6], [4, 12]];
function level4(rng) {
  const [M0, M3] = rng.pick(CENT);
  const E = `${co(q(M3, 6))}h^2+${co(M0)}ε/h`;
  const dE = `${co(q(M3, 3))}h-${co(M0)}ε/h^2`;
  const script = [
    { kind: 'eq', math: dE, note: 'E′(h)', subgoal: 'min' },
    { kind: 'segment', html: t('E′(h) = 0 donne h*³ = 3εM₀/M₃. On note H = h*, en fonction de ε.'), ask: 'h* =', start: { math: 'H' }, judge: { kind: 'equiv', vars: ['ε'], domain: { ε: [0.5, 2] }, subst: { H: `(3ε×${M0}/${M3})^(1/3)` } } },
    { kind: 'eq', math: 'ε^(1/3)', note: `3·${M0}/${M3} = 1`, subgoal: 'min' },
    { kind: 'segment', html: t('Avec ε ≈ 10⁻¹⁶, h* ≈ 10ᵏ.'), ask: 'k =', start: { math: 'p' }, judge: { kind: 'value', expect: '-5', form: 'any' } },
    {
      kind: 'decision', prompt: t('Ordre de grandeur de ∛(10⁻¹⁶) ?'), options: [
        { id: 'ok', label: t('≈ 4,6·10⁻⁶, soit environ 10⁻⁵'), valid: true, ref: true },
        { id: 'fwd', label: t('10⁻⁸, comme pour la progressive'), valid: false, why: t('Pour la progressive, h* ≈ √ε ; ici c\'est ∛ε, beaucoup plus grand.') },
        { id: 'eps', label: t('10⁻¹⁶, le plus petit possible'), valid: false, rule: 'n_fd_smaller_h', why: t('Avec h = 10⁻¹⁶, l\'arrondi divisé par h vaut environ 1 : l\'erreur est énorme.') },
      ],
    },
    { kind: 'eq', math: '-5', note: '∛(10⁻¹⁶) = 10^(−16/3) ≈ 10⁻⁵', subgoal: 'read' },
  ];
  return linesItem({
    skill: SK, level: 4, mode: 'free', keys: KEYS,
    prompt: t('Pour la différence centrée, en machine : E(h) = (h²/6)·M₃ + ε·M₀/h, avec M₀ = {M0} et M₃ = {M3}, soit E(h) = {a}h² + {b}ε/h. Dérive E, trouve h* en fonction de ε, puis son ordre de grandeur.', { M0, M3, a: co(q(M3, 6)), b: co(M0) }),
    start: `d(${E}, h)`, judge: { ...EPS, target: 'no-prime' },
    script,
    hints: H(t('Même méthode que pour la progressive : E′(h) = 0. La troncature est maintenant en h².'),
      t('E′(h) = {a}h − {b}ε/□, puis h*³ = □', { a: co(q(M3, 3)), b: co(M0) }),
      t('h*³ = 3ε·{M0}/{M3} = ε, donc h* = ∛ε ≈ 10⁻⁵.', { M0, M3 })),
    subgoals: SUB, key: `${SK}:4:${M0}:${M3}`, baits: ['n_fd_smaller_h'],
  });
}

// ---------- L5: the whole table ----------

function level5(rng) {
  const tb = table(rng);
  const bf = HS[tb.bestF];
  const bc = HS[tb.bestC];
  const options = [
    { html: t('Le meilleur h pour la progressive est vers {h}', { h: pow10(bf) }), correct: true },
    { html: t('En dessous de {h}, l\'erreur de la progressive augmente à cause des arrondis', { h: pow10(bf) }), correct: true },
    { html: t('La centrée atteint son minimum pour un h plus grand que la progressive'), correct: bc > bf },
    { html: t('Plus h est petit, plus l\'approximation est précise'), correct: false, rule: 'n_fd_smaller_h' },
  ];
  if (bc > bf) options.push({ html: t('Le meilleur h pour la centrée est vers {h}', { h: pow10(1e-14) }), correct: false, rule: 'n_fd_smaller_h' });
  const question = multiMcq({
    skill: SK, level: 5, key: `${SK}:read:${tb.F.id}`,
    prompt: t('Que peut-on lire dans ce tableau ?'), options,
    solution: [{ html: t('Progressive : minimum {ef} en h = {hf} ; centrée : minimum {ec} en h = {hc}. En dessous, l\'arrondi divisé par h domine : l\'erreur remonte.', { ef: expText(tb.ef[tb.bestF], 3), hf: pow10(bf), ec: expText(tb.ec[tb.bestC], 3), hc: pow10(bc) }), note: '' }],
  }, rng);
  return readtableItem({
    skill: SK, level: 5, key: `5:${tb.F.id}`,
    prompt: t('Erreurs |f′({x}) − Dₕf| des différences progressive et centrée, calculées en double précision, pour f = {f}.', { x: tb.F.xh, f: tb.F.html }),
    table: tb.table, question, subgoals: SUB, baits: ['n_fd_smaller_h'],
  });
}

function examTf(rng, opts) {
  return tfItem({
    skill: SK, level: 4, key: 'smaller-h', exam: examTag(opts),
    statement: t('Sur un ordinateur, plus le pas h est petit, plus la différence finie (f(x̄ + h) − f(x̄))/h est proche de f′(x̄).'),
    truth: false,
    counter: {
      kind: 'num', prop: 'fdSmallerWorse', params: {},
      ask: [{ v: 'f', label: 'f(x) =' }, { v: 'x0', label: 'x̄ =' }, { v: 'h', label: 'h =' }],
      answer: { f: 'ln(x)', x0: '1', h: '1e-12' },
    },
    explanation: t('Faux : pour f = ln en x̄ = 1, l\'erreur vaut 8,9·10⁻⁵ avec h = 10⁻¹², contre 8,3·10⁻⁸ avec h = 10⁻¹⁰ et 1,1·10⁻⁸ avec h = 10⁻⁸. L\'arrondi divisé par h domine pour h petit.'),
  });
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'tf') return examTf(rng, opts);
    switch (level) {
      case 1: return level1(rng);
      case 2: return level2(rng);
      case 3: return level3(rng);
      case 4: return level4(rng);
      default: return level5(rng);
    }
  },
};

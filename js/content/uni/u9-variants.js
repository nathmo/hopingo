// Step U9: `code` and `readtable` variants that earlier steps left for U9
// (their « Pas encore fait », spec §17):
//   p-desc-summary L4  the variance in n − 1 (P catalogue, item code L4)
//   p-ci-mean L4       the half-width t·s/√n (item code L4)
//   p-reg-ls L4        the least-squares slope S_xy/S_xx (item code L4)
//   m-power-method L5  the power iteration as a program, then its μ_k to read
//   m-cond L5          the table of perturbations as a readtable
// Each wraps the generator of its step: a third of the level-4 items (P),
// half of the level-5 items (M) are the new variant; the rest, and the exam
// variants, are unchanged.

import { GEN as PROBA } from './proba.js';
import { GEN as MATRICES } from './matrices.js';
import { refCode, codeItem, readtableItem, multiMcq, expText, H, holesFor } from './numerique-kit.js';
import * as LF from '../../cas/linalg-float.js';
import { Q } from '../../math/rational.js';
import { t } from '../../i18n.js';

const fr = (x, d = 4) => String(Number(Number(x).toPrecision(d))).replace('.', ',').replace('-', '−');

// ---------- p-desc-summary: s² in n − 1 ----------

const VAR = refCode(`def variance(x):
    n = len(x)
    m = sum(x) / n
    s2 = 0.0
    for i in range(n):
        s2 = s2 + «(x[i] - m) ** 2»
    return s2 / «(n - 1)»
`);

function varianceCode(rng) {
  const data = rng.pick([[2, 4, 4, 5, 7, 8], [10, 12, 9, 11, 13], [3, 7, 7, 19], [1, 2, 3, 4, 5, 6, 7]]);
  const n = data.length;
  const m = data.reduce((a, b) => a + b, 0) / n;
  const s2 = data.reduce((a, b) => a + (b - m) ** 2, 0) / (n - 1);
  const blanks = rng.chance(0.5) ? [1] : [0, 1];
  return codeItem({
    skill: 'p-desc-summary', level: 4, ref: VAR, blanks,
    traps: { 1: [{ text: 'n', rule: 'p_sd_n' }], 0: [{ text: 'x[i] - m', rule: null }] },
    wrong: { 0: 'x[i] ** 2 - m' },
    prompt: t('Complète la fonction qui calcule la variance empirique s² d\'une liste de données (l\'estimateur sans biais du cours).'),
    preludes: ['import math'], signatures: ['sum(x), len(x)'],
    tests: [
      { expr: 'variance([2, 4, 4, 5, 7, 8])', expect: '4.8' },
      { expr: 'variance([10, 12, 9, 11, 13])', expect: '2.5' },
      { expr: 'variance([3, 7, 7, 19])', expect: '48.0' },
    ],
    hints: H(t('s² = Σ(xᵢ − x̄)²/(n − 1) : on divise par n − 1, pas par n.'),
      t('s2 = s2 + (x[i] − m) ** 2, puis return s2 / ▢'),
      t('Pour ({data}) : x̄ = {m}, s² = {s2}.', { data: data.join(', '), m: fr(m), s2: fr(s2) })),
    subgoals: [{ id: 'var', label: t('s² en n − 1'), skill: 'p-desc-summary' }],
    key: `var:${blanks.join('')}:${data.join(',')}`,
  });
}

// ---------- p-ci-mean: half-width t·s/√n ----------

const HALF = refCode(`def half_width(t, s, n):
    # ${t('demi-largeur de l\'IC de Student : t * s / racine de n')}
    half = t * s / «math.sqrt(n)»
    return half

def interval(xbar, t, s, n):
    h = half_width(t, s, n)
    return [«xbar - h», xbar + h]
`);

function halfCode(rng) {
  const blanks = rng.chance(0.5) ? [0] : [0, 1];
  return codeItem({
    skill: 'p-ci-mean', level: 4, ref: HALF, blanks,
    traps: { 0: [{ text: 'n', rule: 'p_se_forgot_sqrt_n' }, { text: 'math.sqrt(n - 1)', rule: null }] },
    wrong: { 1: 'xbar + h' },
    prompt: t('Complète le calcul de l\'intervalle de confiance de Student x̄ ± t·s/√n (t est le quantile, déjà lu dans la table).'),
    preludes: ['import math'], signatures: ['math.sqrt'],
    tests: [
      { expr: 'half_width(2.131, 4.0, 16)', expect: '2.131' },
      { expr: 'half_width(1.96, 3.0, 25)', expect: '1.176' },
      { expr: 'interval(50.0, 2.262, 5.0, 10)', expect: '[46.423463966349566, 53.576536033650434]' },
    ],
    hints: H(t('L\'écart-type de X̄ est s/√n : la racine de n, pas n.'),
      'half = t * s / ▢',
      t('half = t * s / math.sqrt(n) ; l\'IC est [x̄ − half ; x̄ + half].')),
    subgoals: [{ id: 'half', label: t('demi-largeur t·s/√n'), skill: 'p-ci-mean' }],
    key: `half:${blanks.join('')}`,
  });
}

// ---------- p-reg-ls: the slope S_xy/S_xx ----------

const SLOPE = refCode(`def slope(x, y):
    n = len(x)
    mx = sum(x) / n
    my = sum(y) / n
    sxx = 0.0
    sxy = 0.0
    for i in range(n):
        sxx = sxx + «(x[i] - mx) ** 2»
        sxy = sxy + «(x[i] - mx) * (y[i] - my)»
    return «sxy / sxx»
`);

function slopeCode(rng) {
  const blanks = rng.pick([[1], [1, 2], [0, 1, 2]]);
  return codeItem({
    skill: 'p-reg-ls', level: 4, ref: SLOPE, blanks,
    traps: { 1: [{ text: 'x[i] * y[i]', rule: 'p_reg_sums_raw' }], 2: [{ text: 'sxx / sxy', rule: null }, { text: 'sxy / syy', rule: null }] },
    wrong: { 0: 'x[i] ** 2' },
    prompt: t('Complète la pente des moindres carrés β̂ = S_xy/S_xx (sommes centrées).'),
    preludes: ['import math'], signatures: ['sum(x), len(x)'],
    tests: [
      { expr: 'slope([1, 2, 3, 4], [2, 4, 5, 9])', expect: '2.2' },
      { expr: 'slope([0, 1, 2], [1, 3, 4])', expect: '1.5' },
      { expr: 'slope([2, 4, 6, 8, 10], [10, 8, 9, 5, 3])', expect: '-0.85' },
    ],
    hints: H(t('Les deux sommes sont centrées : on retire x̄ et ȳ.'),
      t('sxy = sxy + ▢ (les deux écarts à la moyenne)'),
      t('sxy = sxy + (x[i] − mx) * (y[i] − my), puis return sxy / sxx.')),
    subgoals: [{ id: 'slope', label: 'β̂ = S_xy/S_xx', skill: 'p-reg-ls' }],
    key: `slope:${blanks.join('')}`,
  });
}

// ---------- m-power-method: the program, then μ_k ----------

const POWER = refCode(`def power(A, y, nsteps):
    mus = []
    for k in range(nsteps):
        z = matvec(A, y)
        mu = z[0]
        for i in range(len(z)):
            if «abs(z[i]) > abs(mu)»:
                mu = z[i]
        mus.append(mu)
        for i in range(len(z)):
            y[i] = «z[i] / mu»
    return mus
`);

const SYM = [[[3, 1], [1, 3], 4, 2], [[5, 2], [2, 2], 6, 1], [[4, 1], [1, 4], 5, 3], [[2, 1], [1, 2], 3, 1], [[7, 2], [2, 4], 8, 3], [[6, 2], [2, 3], 7, 2]];

function powerCode(rng) {
  const [r1, r2, l1, l2] = rng.pick(SYM);
  const A = [r1, r2];
  const y0 = rng.pick([[1, 0], [0, 1]]);
  const it = LF.powerMethod(A, y0, { steps: 8, tol: 0 }).iterations;
  const mus = it.map((x) => x.mu);
  const ratio = new Q(l2, l1);
  const table = { columns: ['k', ...mus.map((_, k) => String(k))], rows: [['μₖ', ...mus.map((m) => expText(m, 6))]] };
  const then = readtableItem({
    skill: 'm-power-method', level: 5, key: `pw:${A.flat().join(',')}:${y0.join('')}`,
    prompt: t('Le programme, appelé pour A = [[{r1}], [{r2}]] et y₀ = ({y0}), renvoie :', { r1: r1.join(', '), r2: r2.join(', '), y0: y0.join(' ; ') }),
    table,
    question: multiMcq({
      skill: 'm-power-method', level: 5, key: `pwq:${A.flat().join(',')}`,
      prompt: t('Que peut-on lire sur ce tableau ?'),
      options: [
        { html: `μₖ → λ₁ = ${l1}`, correct: true },
        { html: t('L\'erreur μₖ − λ₁ est multipliée par environ {r} à chaque pas', { r: String(ratio) }), correct: true },
        { html: t('L\'erreur est multipliée par environ {r} à chaque pas', { r: String(new Q(l1, l2)) }), correct: false, rule: 'm_power_ratio' },
        { html: t('μₖ → {l2}, la plus petite valeur propre', { l2 }), correct: false, rule: 'm_power_ratio' },
      ],
      solution: [{ html: t('Les μₖ tendent vers λ₁ = {l1} ; le rapport de deux erreurs successives tend vers |λ₂/λ₁| = {r}.', { l1, r: String(ratio) }), note: '' }],
    }, rng),
  });
  return codeItem({
    skill: 'm-power-method', level: 5, ref: POWER, blanks: holesFor(5, POWER), rng,
    traps: { 0: [{ text: 'z[i] > mu', rule: null }], 1: [{ text: 'z[i] / norm(z)', rule: null }] },
    prompt: t('Complète la méthode de la puissance du cours : μ est la composante de z = Ay de plus grand module (avec son signe), et y ← z/μ. La fonction renvoie la liste des μₖ.'),
    preludes: ['vec', 'mat'],
    tests: [
      { expr: 'power([[3, 1], [1, 3]], [1.0, 0.0], 4)', expect: '[3.0, 10/3, 3.6, 34/9]', tol: 1e-12 },
      { expr: 'power([[-5, 1], [1, 2]], [1.0, 1.0], 2)', expect: '[-4.0, -5.75]', tol: 1e-12 },
    ],
    then, hints: [], subgoals: [{ id: 'iter', label: t('une itération'), skill: 'm-power-method' }, { id: 'product', label: t('produit Ay'), skill: 'l-mat-product' }],
    key: `pw5:${A.flat().join(',')}:${y0.join('')}`,
  });
}

// ---------- m-cond: the table of perturbations to read ----------

function condRead(rng) {
  const a = rng.int(3, 7);
  const b = rng.int(1, a - 1);
  const A = [[a, b], [b, a]];
  const l1 = a + b;
  const l2 = a - b;
  const kappa = new Q(l1, l2);
  const x = [1, 1];
  const bv = [l1, l1];
  const nb = Math.hypot(...bv);
  const rows = rng.shuffle([{ db: [1, -1], reach: true }, { db: [1, 1], reach: false }, { db: [1, 0], reach: false }]).map((r, i) => {
    const dbv = r.db.map((v) => v / 100);
    const dx = LF.solve(A, dbv);
    return { ...r, i: i + 1, dbv, relb: Math.hypot(...dbv) / nb, relx: Math.hypot(...dx) / Math.hypot(...x) };
  });
  const reach = rows.find((r) => r.reach).i;
  const none = rows.find((r) => r.db[0] === 1 && r.db[1] === 1).i;
  const table = {
    columns: [t('n°'), 'δb', '‖δb‖/‖b‖', '‖δx‖/‖x‖'],
    rows: rows.map((r) => [String(r.i), `(${r.dbv.map((v) => fr(v)).join(' ; ')})`, expText(r.relb, 3), expText(r.relx, 3)]),
  };
  return readtableItem({
    skill: 'm-cond', level: 5, key: `cond5:${a}:${b}:${rows.map((r) => r.i).join('')}`,
    prompt: t('A = [[{a}, {b}], [{b}, {a}]] (symétrique, valeurs propres {l1} et {l2}), x = (1 ; 1), b = Ax = ({l1} ; {l1}). On résout A(x + δx) = b + δb pour trois perturbations δb :', { a, b, l1, l2 }),
    table,
    question: multiMcq({
      skill: 'm-cond', level: 5, key: `cond5q:${a}:${b}`,
      prompt: t('Que lit-on dans ce tableau ?'),
      options: [
        { html: `κ₂(A) = ${String(kappa)}`, correct: true },
        { html: t('La perturbation n° {n} atteint la borne ‖δx‖/‖x‖ = κ₂·‖δb‖/‖b‖', { n: reach }), correct: true },
        { html: t('La perturbation n° {n} atteint la borne', { n: none }), correct: false },
        { html: `κ₂(A) = 1/det A = ${String(new Q(1, l1 * l2))}`, correct: false, rule: 'm_cond_det' },
      ],
      solution: [{ html: t('κ₂ = λ_max/λ_min = {k}. δb le long du vecteur propre de λ_min = {l2}, (1 ; −1), est amplifié {k} fois ; le long de (1 ; 1), il ne l\'est pas.', { k: String(kappa), l2 }), note: '' }],
    }, rng),
    subgoals: [{ id: 'bound', label: t('la borne κ·‖δb‖/‖b‖'), skill: 'm-cond' }, { id: 'norms', label: t('normes'), skill: 'm-norms' }],
    noHints: true,
  });
}

// ---------- the wrapped generators ----------

const wrap = (id, base, level, share, make) => (lv, rng, profile, opts = {}) => {
  if (!opts.exam && lv === level && rng.next() < share) return make(rng);
  return base(lv, rng, profile, opts);
};

export const GEN = {
  'p-desc-summary': wrap('p-desc-summary', PROBA['p-desc-summary'], 4, 1 / 3, varianceCode),
  'p-ci-mean': wrap('p-ci-mean', PROBA['p-ci-mean'], 4, 1 / 3, halfCode),
  'p-reg-ls': wrap('p-reg-ls', PROBA['p-reg-ls'], 4, 1 / 3, slopeCode),
  'm-power-method': wrap('m-power-method', MATRICES['m-power-method'], 5, 1 / 2, powerCode),
  'm-cond': wrap('m-cond', MATRICES['m-cond'], 5, 1 / 2, condRead),
};

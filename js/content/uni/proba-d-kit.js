// Tools of module P, part d (intervals and tests, step U7): data sets built
// backwards (convention 10 of docs/universite/P-probabilites.md), the
// sentences of « Interpréter » and of the conclusion of a test, the
// decision lines of the protocol (convention 7) and number texts.

import { dec, val, num } from './proba-kit.js';
import { courseT, studentTable, Phi, roundTo } from '../../cas/stats.js';

export { dec, val, num };

// A list for the screen: 86 ; 90 ; 84 (« ; », the comma being decimal).
export const list = (xs) => xs.map((x) => dec(x, 4).replace('-', '−')).join(' ; ');
export const pct = (a) => `${dec(a * 100, 2)} %`;
// −2,45 for the screen.
export const sc = (x, d = 4) => dec(x, d).replace('-', '−');

// A data set of n values with an integer mean, paired deviations ±a (and
// zeros), Σ dᵢ² divisible by n − 1 when s2int (s² a whole number).
// → {xs (shuffled), mean, SS, s2}
export function dataSet(rng, n, { lo = 5, hi = 60, maxDev = 6, s2int = true, minSS = 4 } = {}) {
  for (let t = 0; t < 400; t++) {
    const devs = [];
    let pairs = Math.floor(n / 2);
    if (pairs > 1 && rng.chance(0.3)) pairs -= 1;
    for (let i = 0; i < pairs; i++) { const a = rng.int(1, maxDev); devs.push(a, -a); }
    while (devs.length < n) devs.push(0);
    const SS = devs.reduce((s, d) => s + d * d, 0);
    if (SS < minSS) continue;
    if (s2int && SS % (n - 1)) continue;
    const mean = rng.int(Math.max(lo, maxDev + 1), hi);
    return { xs: rng.shuffle(devs.map((d) => mean + d)), mean, SS, s2: SS / (n - 1), devs };
  }
  // A fixed set (never used in practice).
  const devs = [2, -2, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].slice(0, n);
  const mean = 20;
  const SS = 10;
  return { xs: devs.map((d) => mean + d), mean, SS, s2: SS / (n - 1), devs, fallback: true };
}

export const sum = (xs) => xs.reduce((s, x) => s + x, 0);

// The squared deviations written out: 16 + 4 + 4 + 1 + 1 + 9 + 25.
export const sqDevs = (xs, mean) => xs.map((x) => (x - mean) ** 2).join('+');

// The quantile of Student read by the course (Table 3, 5 % two-sided).
export const tq = (nu, alpha = 5) => courseT(nu, alpha);
export { studentTable, Phi, roundTo };

// ---------- interpretation ----------

// The sentences of a confidence interval at level `level` (%) for `of` (« μ »).
export function ciInterpret(level, of, lo, hi) {
  const I = `[${sc(lo)} ; ${sc(hi)}]`;
  return {
    prompt: 'Interpréter : quelle phrase est juste ?',
    options: [
      { html: `Si l’on refaisait l’expérience souvent, ${level} % des intervalles construits ainsi contiendraient ${of}.`, correct: true },
      { html: `${of} est dans ${I} avec une probabilité de ${dec(level / 100, 3)}.`, correct: false, rule: 'p_ci_prob' },
      { html: `${level} % des mesures sont dans ${I}.`, correct: false, rule: 'p_ci_data' },
      { html: `La moyenne observée est dans l’intervalle avec une probabilité de ${dec(level / 100, 3)}.`, correct: false, rule: 'p_ci_xbar' },
    ],
  };
}

// The conclusion of a test: the decision at level alpha (in %) and its
// meaning. claim: what H₀ says, in words (« la consommation moyenne vaut 12 »).
export function testConclusion(reject, alpha, claim, { p = null } = {}) {
  const a = `${dec(alpha, 2)} %`;
  const opts = reject ? [
    { html: `On rejette H₀ au niveau ${a} : les données contredisent l’hypothèse que ${claim}.`, correct: true },
    { html: `On ne rejette pas H₀ au niveau ${a} : les données sont compatibles avec l’hypothèse que ${claim}.`, correct: false, rule: 'p_pvalue_alpha_compare' },
    { html: `La probabilité que H₀ soit vraie est inférieure à ${dec(alpha / 100, 3)}.`, correct: false, rule: 'p_pvalue_h0' },
    p !== null && p > 0.01
      ? { html: 'On rejetterait aussi H₀ au niveau 1 %.', correct: false, rule: 'p_reject_10_5' }
      : { html: 'L’écart est significatif, donc il est important en pratique.', correct: false, rule: 'p_significant_large' },
  ] : [
    { html: `On ne rejette pas H₀ au niveau ${a} : les données ne contredisent pas l’hypothèse que ${claim}.`, correct: true },
    { html: `On rejette H₀ au niveau ${a}.`, correct: false, rule: 'p_pvalue_alpha_compare' },
    { html: `Les données prouvent que ${claim}.`, correct: false, rule: 'p_accept_h0' },
    { html: `H₀ est vraie avec une probabilité de ${dec(1 - alpha / 100, 3)}.`, correct: false, rule: 'p_pvalue_h0' },
  ];
  return { prompt: 'Conclure et interpréter : quelle phrase est juste ?', options: opts };
}

// The decision « quel quantile ? » before the critical value of a t test (or CI).
export function quantileDecision(nu, twoSided = true, { levels = [1, 2, 3], alpha = 5 } = {}) {
  const right = tq(nu, alpha);
  const opts = [
    { id: 't', label: `Student à ν = ${nu} degrés de liberté, ${twoSided ? 'bilatéral' : 'unilatéral'} : ${dec(right, 3)}`, valid: true },
    { id: 'z', label: `La loi normale : ${alpha === 5 ? '1,96' : '2,576'}`, valid: false, rule: 'p_t_vs_z', why: `σ est inconnu et ν = ${nu} < 200 : la loi de Student, plus large, remplace la normale.` },
  ];
  if (tq(nu + 1, alpha)) opts.push({ id: 'df', label: `Student à ν = ${nu + 1} : ${dec(tq(nu + 1, alpha), 3)}`, valid: false, rule: 'p_df_wrong', why: `On perd un degré de liberté par paramètre estimé : ν = ${nu}.` });
  return { prompt: 'Quel quantile ?', levels, options: opts };
}

// The quantile of Student written in a line: 2,306.
export const tqText = (nu, alpha = 5) => dec(tq(nu, alpha), 3);

// Rounded value as text with a comma.
export const r = (x, d) => dec(roundTo(x, d), d);

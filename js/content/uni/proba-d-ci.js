// Generators of module P, part d: confidence intervals (step U7) —
// p-ci-mean, p-ci-wald, p-ci-round, p-max-sample. Catalogue:
// docs/universite/P-probabilites.md. Tools: proba-kit.js, proba-d-kit.js;
// traps: js/cas/rules/pd.js (and p_ci_prob, p_ci_data, p_ci_xbar of part e,
// p_wald_var_inverse, p_wald_sign, p_se_forgot_sqrt_n, p_sd_n of parts a, c).

import { statItem, coefItem, openItem, choice, tf, numCounter, H, SM, examTag } from './proba-kit.js';
import { dataSet, sum, sqDevs, tq, tqText, ciInterpret, quantileDecision, dec, val, sc, list, r } from './proba-d-kit.js';
import { Q } from '../../math/rational.js';
import { tInv, PhiInv, roundTo, floorTo, ceilTo, sigRound, firstDigit, eeT } from '../../cas/stats.js';

// Indices and exponents of the statements: X₂₀, F(x)²⁰.
const subT = (k) => [...String(k)].map((c) => '₀₁₂₃₄₅₆₇₈₉'[c]).join('');
const supT = (k) => [...String(k)].map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join('');
const pick = (rng, xs) => xs[rng.int(0, xs.length - 1)];
const I = (lo, hi, d = 3) => `[${dec(lo, d)} ; ${dec(hi, d)}]`;
const IR = (lo, hi, d = 3) => I(lo, hi, d).replace(/-/g, '−');

// ======================================================================
// p-ci-mean
// ======================================================================

const CM = 'p-ci-mean';
const CM_SUB = [
  { id: 'desc', label: 'x̄ et s', skill: 'p-desc-summary' },
  { id: 'q', label: 'quantile', skill: 'p-normal-inverse' },
  { id: 'ci', label: 'pivot et bornes', skill: CM },
];

// An interval for μ: {kind, n, xbar, s2?, sigma?, xs?, q, qName, se, seText, u, level, story}.
function cmData(rng, kind) {
  if (kind === 'known') {
    const n = pick(rng, [9, 16, 25, 36, 64, 100]);
    const sigma = rng.int(2, 12);
    const level = rng.chance(0.7) ? 95 : 99;
    const xbar = rng.int(20, 300) + (rng.chance(0.4) ? rng.int(1, 9) / 10 : 0);
    const q = level === 95 ? 1.96 : PhiInv(0.995);
    const se = sigma / Math.sqrt(n);
    return {
      kind, n, xbar, sigma, level, q, qText: level === 95 ? '1,96' : '2,576', se, seText: `${sigma}/√${n}`, seExpect: `${sigma}/√${n}`,
      story: `Un appareil de mesure a un écart-type connu σ = ${sigma}. On fait ${n} mesures de moyenne x̄ = ${dec(xbar)}. On suppose les mesures normales. Donne l’intervalle de confiance à ${level} % pour μ.`,
      claim: 'μ',
    };
  }
  if (kind === 'large') {
    const n = pick(rng, [225, 400, 900]);
    const s = pick(rng, [15, 30, 45, 60]);
    const xbar = rng.int(50, 500);
    const se = s / Math.sqrt(n);
    return {
      kind, n, xbar, s2: s * s, level: 95, q: 1.96, qText: '1,96', se, seText: `${s}/√${n}`, seExpect: `${s}/√${n}`,
      story: `Sur n = ${n} observations (loi inconnue), x̄ = ${xbar} et s = ${s}. Donne l’intervalle de confiance asymptotique à 95 % pour μ.`,
    };
  }
  // Student: summary or raw data.
  const raw = kind === 'raw';
  const n = raw ? pick(rng, [5, 6, 9, 10]) : pick(rng, [5, 9, 10, 16, 25, 31]);
  const level = raw || rng.chance(0.7) ? 95 : 99;
  const alpha = level === 95 ? 5 : 1;
  let xbar;
  let s2;
  let xs = null;
  if (raw) {
    const d = dataSet(rng, n, { lo: 8, hi: 40, maxDev: n <= 6 ? 4 : 5 });
    ({ xs } = d);
    xbar = d.mean;
    s2 = d.s2;
  } else {
    xbar = rng.int(10, 200);
    const sq = [4, 9, 16, 25, 36].includes(n) || rng.chance(0.4);
    s2 = sq ? n * rng.int(1, 4) ** 2 : rng.int(2, 30);
  }
  const se = Math.sqrt(s2 / n);
  const root = Math.sqrt(s2 / n);
  const exact = Math.abs(root - Math.round(root * 100) / 100) < 1e-12;
  return {
    kind, n, nu: n - 1, xbar, s2, xs, level, alpha, q: tq(n - 1, alpha), qText: tqText(n - 1, alpha),
    se, seText: exact ? dec(root, 2) : `√(${s2}/${n})`, seExpect: `√(${s2}/${n})`,
    story: raw
      ? `Mesures supposées normales : ${list(xs)}. Donne l’intervalle de confiance à ${level} % pour μ.`
      : `Sur n = ${n} mesures supposées normales, x̄ = ${xbar} et s² = ${s2}. Donne l’intervalle de confiance à ${level} % pour μ.`,
  };
}

function cmParts(d, level) {
  const parts = [];
  const xb = d.kind === 'raw' ? '$xbar' : val(d.xbar);
  if (d.kind === 'raw') {
    parts.push({
      label: 'x̄', name: 'xbar', kind: 'prob', expect: String(d.xbar), action: 'Calculer la moyenne x̄',
      lines: [{ math: `(${d.xs.join('+')})/${d.n}`, note: 'Moyenne', subgoal: 'desc', blank: [String(d.n)] }, { math: String(d.xbar), subgoal: 'desc', blank: [String(d.xbar)] }],
    });
    const SS = d.s2 * (d.n - 1);
    parts.push({
      label: 's²', name: 's2', kind: 'prob', expect: String(d.s2), action: 'Calculer s² (diviser par n − 1)',
      traps: { p_sd_n: { values: [`${SS}/${d.n}`], ctx: { SS, n: d.n, 'n−1': d.n - 1 } } },
      lines: [
        { math: `(${sqDevs(d.xs, d.xbar)})/${d.n - 1}`, note: 'Écarts au carré, divisés par n − 1', subgoal: 'desc', blank: [String(d.n - 1)] },
        { math: `${SS}/${d.n - 1}`, blank: [String(SS)] },
        { math: String(d.s2), blank: [String(d.s2)] },
      ],
    });
  }
  const student = d.kind === 'raw' || d.kind === 'summary';
  const qTraps = {};
  if (student) {
    qTraps.p_t_vs_z = { values: [d.alpha === 5 ? '1.96' : '2.576'], ctx: { 'ν': d.nu } };
    if (tq(d.n, d.alpha)) qTraps.p_df_wrong = { values: [val(tq(d.n, d.alpha))], ctx: { 'ν': d.nu } };
    qTraps.p_one_two_sided = { values: [val(roundTo(tInv(1 - d.alpha / 100, d.nu), 3))] };
  } else qTraps.p_one_two_sided = { values: [d.level === 95 ? '1.645' : '2.326'] };
  const decisions = student
    ? [quantileDecision(d.nu, true, { alpha: d.alpha })]
    : [{ prompt: 'Quel pivot ?', levels: [1, 2, 3], options: [
      { id: 'z', label: d.kind === 'known' ? 'σ est connu : la loi normale' : 'n est grand : la loi normale (ligne ∞ de la table)', valid: true },
      { id: 't', label: `Student à ν = ${d.n - 1}`, valid: d.kind === 'large', quality: 'poor', why: d.kind === 'large' ? 'Juste : pour ν > 200, la table de Student donne la ligne ∞, la normale.' : 'σ est connu : le pivot (X̄ − μ)/(σ/√n) suit exactement la loi normale.' },
      { id: 'one', label: `Le quantile unilatéral ${d.level === 95 ? '1,645' : '2,326'}`, valid: false, rule: 'p_one_two_sided', why: `Un IC à ${d.level} % laisse ${dec((100 - d.level) / 2, 1)} % de chaque côté.` },
    ] }];
  if (!student) decisions[0].options = decisions[0].options.filter((o) => o.valid !== true || o.id === 'z').filter((o) => !(o.id === 't' && d.kind === 'known'));
  const accept = d.level === 99 && !student ? ['2.576', '2.58', '2.5758'] : student ? [] : ['1.960'];
  parts.push({
    label: student ? 't' : 'z', name: 'q', kind: 'stat', expect: student ? `#t(${d.nu},${d.alpha})` : val(d.q), decimals: 3, accept,
    action: 'Lire le quantile', traps: qTraps, decisions,
    wrongActions: student ? [{ label: 'Prendre 1,96', rule: 'p_t_vs_z', why: 'σ est inconnu et n est petit : Student.' }] : [],
    lines: [{ math: d.qText, note: student ? `Table 3, ν = ${d.nu}` : 'Table 2', subgoal: 'q', blank: [d.qText] }],
  });
  const sd = d.sigma ?? Math.sqrt(d.s2);
  const seExpect = d.kind === 'raw' ? `√($s2/${d.n})` : d.seExpect;
  const seLines = [{ math: d.kind === 'raw' ? `√(${d.s2}/${d.n})` : d.seText.includes('√') ? d.seText.replace(/^(\d+)\/√(\d+)$/, '$1/√($2)') : `√(${d.s2}/${d.n})`, note: 'Erreur standard', subgoal: 'ci', blank: [String(d.n)] }];
  const seFinal = dec(d.se, 3);
  if (seFinal !== seLines[0].math) seLines.push({ math: seFinal, blank: [seFinal] });
  parts.push({
    label: d.sigma ? 'σ/√n' : 's/√n', name: 'se', kind: 'stat', expect: seExpect, decimals: 3, action: 'Calculer l’erreur standard',
    traps: { p_se_forgot_sqrt_n: { values: [val(sd)], ctx: { n: d.n, v: dec(d.se, 3) } } },
    wrongActions: [{ label: `Prendre ${d.sigma ? 'σ' : 's'} comme erreur standard`, rule: 'p_se_forgot_sqrt_n', why: 'La moyenne de n mesures varie moins qu’une seule : on divise par √n.' }],
    lines: seLines,
  });
  // Downstream values from the rounded ones the lines show (carried forward).
  const u = Number(d.qText.replace(',', '.')) * Number(seFinal.replace(',', '.'));
  const u3 = roundTo(u, 3);
  parts.push({
    label: 'u', name: 'u', kind: 'stat', expect: '$q*$se', decimals: 3, action: 'Demi-largeur : quantile × erreur standard',
    lines: [{ math: `${d.qText}×${seFinal}`, note: 'Demi-largeur', subgoal: 'ci', blank: [seFinal] }, ...(dec(u3, 3) !== `${d.qText}×${seFinal}` ? [{ math: dec(u3, 3), blank: [dec(u3, 3)] }] : [])],
  });
  const lo = d.xbar - u3;
  const hi = d.xbar + u3;
  parts.push({
    label: 'IC', name: 'ic', kind: 'stat', expect: [`${xb}-$u`, `${xb}+$u`], decimals: 3, action: 'Bornes : x̄ ± u',
    traps: { p_se_forgot_sqrt_n: { values: [`[${val(d.xbar - d.q * sd)};${val(d.xbar + d.q * sd)}]`], ctx: { n: d.n } } },
    lines: [{ math: `[${dec(d.xbar)}-${dec(u3, 3)} ; ${dec(d.xbar)}+${dec(u3, 3)}]`, note: 'x̄ ± u', subgoal: 'ci', blank: [dec(u3, 3)] }, { math: I(lo, hi), blank: [dec(lo, 3), dec(hi, 3)] }],
  });
  return { parts, lo, hi, u: u3 };
}

function cmItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return cmMcq(rng, opts);
  if (opts.exam === 'tf') return cmTf(rng, opts);
  const kinds = level === 1 ? ['summary', 'known'] : level === 2 ? ['raw', 'summary'] : level === 5 ? ['raw', 'size'] : ['summary', 'raw', 'known', 'large'];
  const kind = opts.exam === 'coef' ? pick(rng, ['summary', 'known']) : pick(rng, kinds);
  let d = cmData(rng, kind === 'size' ? 'known' : kind);
  while (kind === 'size' && d.level !== 95) d = cmData(rng, 'known');
  const { parts, lo, hi } = cmParts(d, level);
  let prompt = d.story;
  if (kind === 'size') {
    const E = pick(rng, [0.5, 1, 1.5, 2].filter((e) => e < d.sigma));
    const nmin = Math.ceil((1.96 * d.sigma / E) ** 2 - 1e-9);
    prompt = `${d.story} Puis : combien de mesures faut-il pour une demi-largeur au plus ${dec(E)} ?`;
    // (zσ/E)² is not a whole number: n is rounded up (tol < 0,5).
    parts.push({
      label: 'n', name: 'nmin', kind: 'stat', expect: String(nmin), decimals: 0, tol: 0.4, action: 'Taille : n ≥ (zσ/E)², arrondi vers le haut',
      notes: [`n ≥ (1,96 · ${d.sigma}/${dec(E)})² = ${dec((1.96 * d.sigma / E) ** 2, 2)} : on arrondit vers le haut.`],
      lines: [{ math: String(nmin), note: 'Le plus petit entier qui convient', subgoal: 'ci' }],
    });
  }
  const of = 'μ';
  const hints = H(
    d.sigma ? 'σ est connu : x̄ ± z·σ/√n, avec z = Φ⁻¹(0,975) = 1,96 pour 95 %.' : d.kind === 'large' ? 'n est grand : x̄ ± 1,96·s/√n.' : `σ inconnu et n petit : Student à n − 1 = ${d.nu} degrés de liberté.`,
    SM(`[${dec(d.xbar)}-□ ; ${dec(d.xbar)}+□]`),
    `IC = ${IR(lo, hi)}`,
  );
  const o = {
    skill: CM, level, key: `${level}:${kind}:${d.n}:${d.xbar}:${d.s2 ?? d.sigma}`, prompt, parts, hints, subgoals: CM_SUB,
    interpret: ciInterpret(d.level, of, lo, hi), exam: examTag(opts),
  };
  if (opts.exam === 'coef') {
    return coefItem({ ...o, prompt: `${d.story} Donne la borne supérieure.`, part: { label: 'borne sup.', kind: 'stat', expect: val(d.xbar + d.q * d.se), accept: [val(hi)], decimals: 3, ref: {}, lines: [{ math: dec(roundTo(d.xbar + d.q * d.se, 3), 3) }] } });
  }
  return statItem(o);
}

function cmMcq(rng, opts) {
  const d = cmData(rng, 'summary');
  const sd = Math.sqrt(d.s2);
  const t1 = roundTo(tInv(1 - d.alpha / 100, d.nu), 3);
  const tn = tq(d.n, d.alpha);
  const z = d.alpha === 5 ? 1.96 : 2.576;
  const iv = (q, se) => IR(roundTo(d.xbar - q * se, 3), roundTo(d.xbar + q * se, 3));
  const wrongs = [
    { html: iv(z, d.se), rule: 'p_t_vs_z' },
    { html: iv(t1, d.se), rule: 'p_one_two_sided' },
    { html: iv(d.q, sd), rule: 'p_se_forgot_sqrt_n' },
    ...(tn ? [{ html: iv(tn, d.se), rule: 'p_df_wrong' }] : []),
  ];
  const given = `On donne les quantiles : t(ν = ${d.nu} ; ${dec(1 - d.alpha / 200, 4)}) = ${dec(d.q, 3)}, t(ν = ${d.nu} ; ${dec(1 - d.alpha / 100, 3)}) = ${dec(t1, 3)}${tn ? `, t(ν = ${d.n} ; ${dec(1 - d.alpha / 200, 4)}) = ${dec(tn, 3)}` : ''}, z(${dec(1 - d.alpha / 200, 4)}) = ${dec(z, 3)}.`;
  return choice({
    skill: CM, level: 4, key: `mcq:${d.n}:${d.xbar}:${d.s2}:${d.level}`, exam: examTag(opts),
    prompt: `${d.story} ${given}`, right: iv(d.q, d.se), wrongs,
  }, rng);
}

function cmTf(rng, opts) {
  const truth = rng.chance(0.5);
  if (truth) {
    return tf({
      skill: CM, key: 'quatre-fois', exam: examTag(opts), truth: true,
      statement: 'σ connu : avec 4 fois plus d’observations, l’intervalle de confiance pour μ est 2 fois plus étroit.',
      explanation: 'La demi-largeur z·σ/√n est divisée par √4 = 2.',
    });
  }
  const level = pick(rng, [[99, 95], [95, 90]]);
  const z = { 99: '2,576', 95: '1,96', 90: '1,645' };
  return tf({
    skill: CM, key: `largeur-${level[0]}`, exam: examTag(opts), truth: false,
    statement: `Un intervalle de confiance à ${level[0]} % pour μ est plus étroit que l’intervalle à ${level[1]} % calculé sur les mêmes données.`,
    explanation: `Plus de confiance demande un intervalle plus large : z = ${z[level[0]]} contre ${z[level[1]]}.`,
    counter: numCounter({
      vars: [{ v: 'a', label: `quantile z pour ${level[1]} % :`, dom: 'R+' }, { v: 'b', label: `quantile z pour ${level[0]} % :`, dom: 'R+' }],
      hyp: `a=${z[level[1]]}∧b=${z[level[0]]}`, pred: 'b<a', answer: { a: z[level[1]], b: z[level[0]] },
    }),
  });
}

// ======================================================================
// p-ci-wald
// ======================================================================

const CW = 'p-ci-wald';
const CW_SUB = [
  { id: 'mle', label: 'MLE et ℓ″', skill: 'p-mle' },
  { id: 'wald', label: 'information, erreur standard, bornes', skill: CW },
  { id: 'q', label: 'pivot θ̂ ± z·se', skill: 'p-ci-mean' },
];
const BERN = [[100, 36], [400, 80], [625, 125], [900, 90], [100, 50], [400, 40]];
const POIS = [[25, 1], [50, 2], [100, 4], [64, 4], [36, 4], [100, 1]];
const EXPO = [[16, 2], [25, 0.5], [100, 2], [36, 3], [64, 2], [49, 0.5]];

// {model, n, theta, J, se, story, l2Text}
function cwData(rng, model) {
  if (model === 'bern') {
    const [n, k] = pick(rng, BERN);
    const p = k / n;
    const Jq = new Q(n * n * n, k * (n - k));
    const J = Jq.valueOf();
    return {
      model, n, k, theta: p, J, Jq, se: 1 / Math.sqrt(J), thetaText: `${k}/${n}`, name: 'p',
      l2: `-${n}/(${dec(p)}×${dec(1 - p)})`, Jtext: `${n}/(${dec(p)}×${dec(1 - p)})`,
      story: `On observe ${k} succès en n = ${n} essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)).`,
    };
  }
  if (model === 'pois') {
    const [n, l] = pick(rng, POIS);
    const S = n * l;
    return {
      model, n, theta: l, J: n / l, Jq: new Q(n * n, S), se: Math.sqrt(l / n), thetaText: `${S}/${n}`, name: 'λ', S,
      l2: `-${S}/${l}^2`, Jtext: `${S}/${l}^2`,
      story: `n = ${n} observations indépendantes d’une loi de Poisson de paramètre λ, de somme Σxᵢ = ${S}. ℓ(λ) = Σxᵢ ln λ − nλ + constante, ℓ″(λ) = −Σxᵢ/λ².`,
    };
  }
  const [n, l] = pick(rng, EXPO);
  const S = n / l;
  const lq = l === 0.5 ? new Q(1, 2) : new Q(l);
  return {
    model: 'expo', n, theta: l, J: n / (l * l), Jq: new Q(n).div(lq.mul(lq)), se: l / Math.sqrt(n), thetaText: `${n}/${dec(S)}`, name: 'λ', S,
    l2: `-${n}/${dec(l)}^2`, Jtext: `${n}/${dec(l)}^2`,
    story: `n = ${n} durées indépendantes de loi exponentielle de paramètre λ, de somme Σxᵢ = ${dec(S)}. ℓ(λ) = n ln λ − λΣxᵢ, ℓ″(λ) = −n/λ².`,
  };
}

function cwParts(d) {
  const lab = d.name === 'p' ? 'p̂' : 'λ̂';
  const se3 = roundTo(d.se, 4);
  const u = 1.96 * se3;
  const lo = d.theta - u;
  const hi = d.theta + u;
  const thetaD = dec(d.theta, 4);
  return {
    parts: [
      {
        label: lab, name: 'th', kind: 'prob', expect: val(d.theta), action: 'Calculer le MLE',
        lines: [{ math: d.thetaText, note: d.name === 'p' ? 'p̂ = k/n' : d.model === 'pois' ? 'λ̂ = x̄' : 'λ̂ = n/Σxᵢ', subgoal: 'mle', blank: [String(d.n)] }, { math: thetaD, blank: [thetaD] }],
      },
      {
        label: 'J', name: 'J', kind: 'prob', expect: String(d.Jq), action: 'Information observée J = −ℓ″(θ̂)',
        traps: { p_wald_sign: { values: [val(-d.J)], ctx: { J: dec(d.J) } } },
        wrongActions: [{ label: 'Prendre J = ℓ″(θ̂)', rule: 'p_wald_sign', why: 'Au maximum ℓ″ < 0 : J = −ℓ″(θ̂) est positive.' }],
        lines: [{ math: d.Jtext, note: 'J = −ℓ″(θ̂)', subgoal: 'mle', blank: [String(d.n)] }, ...(String(d.Jq) !== d.Jtext ? [{ math: String(d.Jq), blank: [String(d.Jq)] }] : [])],
      },
      {
        label: 'se', name: 'se', kind: 'stat', expect: '1/√($J)', decimals: 4, action: 'Erreur standard 1/√J',
        traps: { p_wald_var_inverse: { values: [val(Math.sqrt(d.J)), val(1 / d.J)], ctx: { J: dec(d.J), se: dec(d.se, 4) } } },
        wrongActions: [{ label: 'Prendre √J', rule: 'p_wald_var_inverse', why: 'La variance asymptotique est l’inverse de J.' }],
        lines: [{ math: `1/√(${d.Jq})`, note: 'Var(θ̂) ≈ 1/J', subgoal: 'wald', blank: [String(d.Jq)] }, { math: dec(se3, 4), blank: [dec(se3, 4)] }],
      },
      {
        label: 'IC', name: 'ic', kind: 'stat', expect: ['$th-1.96*$se', '$th+1.96*$se'], decimals: 3, action: 'Bornes θ̂ ± 1,96·se',
        traps: { p_se_forgot_sqrt_n: { values: d.model === 'bern' ? [`[${val(d.theta - 1.96 * Math.sqrt(d.theta * (1 - d.theta)))};${val(d.theta + 1.96 * Math.sqrt(d.theta * (1 - d.theta)))}]`] : [], ctx: { n: d.n } } },
        lines: [{ math: `[${thetaD}-1,96×${dec(se3, 4)} ; ${thetaD}+1,96×${dec(se3, 4)}]`, note: 'θ̂ ± z·se', subgoal: 'q', blank: [dec(se3, 4)] }, { math: I(lo, hi), blank: [dec(lo, 3), dec(hi, 3)] }],
      },
    ],
    lo, hi,
  };
}

// Wilson (EE-209, z = 2): centre p̃ and half-width.
function wilsonParts(d) {
  const z2 = 4;
  const ct = (d.k + z2 / 2) / (d.n + z2);
  const half = (2 * Math.sqrt(d.n) / (d.n + z2)) * Math.sqrt(d.theta * (1 - d.theta) + z2 / (4 * d.n));
  return {
    parts: [
      {
        label: 'p̃', name: 'ct', kind: 'stat', expect: `(${d.k}+2)/(${d.n}+4)`, decimals: 4, action: 'Centre de Wilson',
        traps: { p_wilson_center: { values: [val(d.theta)] } },
        wrongActions: [{ label: 'Centrer en p̂', rule: 'p_wilson_center', why: 'Wilson est centré en (np̂ + z²/2)/(n + z²).' }],
        lines: [{ math: `(${d.k}+2)/(${d.n}+4)`, note: 'p̃ = (np̂ + z²/2)/(n + z²), z = 2', subgoal: 'wald' }, { math: dec(ct, 4) }],
      },
      {
        label: 'IC_W', name: 'icw', kind: 'stat', expect: [val(ct - half), val(ct + half)], decimals: 3, action: 'Bornes de Wilson',
        lines: [{ math: I(ct - half, ct + half), note: `demi-largeur z√n/(n + z²)·√(p̂(1 − p̂) + z²/(4n)) = ${dec(half, 4)}`, subgoal: 'wald' }],
      },
    ],
    lo: ct - half, hi: ct + half,
  };
}

function cwItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return cwMcq(rng, opts);
  if (opts.exam === 'tf') return cwTf(rng, opts);
  const model = level <= 2 ? pick(rng, ['bern', 'bern', 'pois']) : level === 5 ? 'bern' : pick(rng, ['bern', 'pois', 'expo']);
  const d = cwData(rng, model);
  const { parts, lo, hi } = cwParts(d);
  let prompt = `${d.story} Donne l’intervalle de confiance de Wald à 95 % pour ${d.name} (z = 1,96).`;
  let interpret = ciInterpret(95, d.name, lo, hi);
  if (level === 5 && opts.exam !== 'open') {
    const w = wilsonParts(d);
    parts.push(...w.parts);
    prompt = `${d.story} Donne l’intervalle de Wald à 95 % (z = 1,96), puis celui de Wilson (EE-209 : on prend z = 2).`;
    interpret = {
      prompt: 'Avec p̂ = 0,02 et n = 50, quel intervalle préférer ?',
      options: [
        { html: 'Wilson : Wald est peu fiable quand p̂ est près de 0 ou de 1 (il peut même sortir de [0 ; 1]).', correct: true },
        { html: 'Wald : il est exact pour tout n.', correct: false },
        { html: 'Les deux se valent toujours.', correct: false },
        { html: 'Wilson, parce qu’il est centré en p̂.', correct: false, rule: 'p_wilson_center' },
      ],
    };
  }
  if (opts.exam === 'open') {
    interpret = {
      prompt: 'Sous quelles hypothèses cet intervalle est-il valable ?',
      options: [
        { html: 'n grand, et un modèle régulier (le support ne dépend pas du paramètre).', correct: true },
        { html: 'Il est exact pour tout n.', correct: false },
        { html: `Il contient ${d.name === 'p' ? 'p̂' : 'λ̂'} avec une probabilité de 95 %.`, correct: false, rule: 'p_ci_prob' },
        { html: '95 % des données sont dans l’intervalle.', correct: false, rule: 'p_ci_data' },
      ],
    };
  }
  const o = {
    skill: CW, level, key: `${level}:${d.model}:${d.n}:${d.theta}`, prompt, parts,
    hints: H('La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J.', SM(`1/√(${d.Jq})`), `se = ${dec(d.se, 4)}, IC = ${IR(lo, hi)}`),
    subgoals: CW_SUB, interpret, exam: examTag(opts),
    simulate: d.model === 'bern' ? { model: 'binom', n: d.n, p: d.theta, event: { op: 'between', a: d.n * lo - 1e-9, b: d.n * hi + 1e-9 }, label: `Si p valait ${dec(d.theta)}, part des séries où p̂ tombe dans l’IC`, answer: 0.95 } : undefined,
  };
  if (opts.exam === 'open') return openItem({ ...o, exam: undefined, title: 'IC de Wald' }, 8, rng);
  if (opts.exam === 'coef') return coefItem({ ...o, prompt: `${prompt} Donne l’erreur standard se = 1/√J.`, part: parts[2] });
  return statItem(o);
}

function cwMcq(rng, opts) {
  const d = cwData(rng, 'bern');
  const iv = (c, se) => IR(roundTo(c - 1.96 * se, 3), roundTo(c + 1.96 * se, 3));
  const wrongs = [
    { html: iv(d.theta, Math.sqrt(d.J)).replace(/\[.*\]/, `[${sc(roundTo(d.theta - 1.96 * Math.sqrt(d.J), 1), 1)} ; ${sc(roundTo(d.theta + 1.96 * Math.sqrt(d.J), 1), 1)}]`), rule: 'p_wald_var_inverse' },
    { html: iv(d.theta, Math.sqrt(d.theta * (1 - d.theta))), rule: 'p_se_forgot_sqrt_n' },
    { html: 'La variance est négative : l’intervalle n’existe pas.', rule: 'p_wald_sign' },
  ];
  return choice({
    skill: CW, level: 4, key: `mcq:${d.n}:${d.k}`, exam: examTag(opts),
    prompt: `${d.story} Quel est l’intervalle de Wald à 95 % pour p (z = 1,96) ?`, right: iv(d.theta, d.se), wrongs,
  }, rng);
}

function cwTf(rng, opts) {
  if (rng.chance(0.4)) {
    return tf({
      skill: CW, key: 'wald-mle', exam: examTag(opts), truth: true,
      statement: 'L’intervalle de Wald θ̂ ± z/√J(θ̂) repose sur la normalité approchée du MLE, valable quand n est grand.',
      explanation: 'θ̂ ≈ N(θ, 1/J(θ̂)) pour n grand et un modèle régulier.',
    });
  }
  const n = pick(rng, [10, 20]);
  return tf({
    skill: CW, key: `couverture-${n}`, exam: examTag(opts), truth: false,
    statement: `L’intervalle de Wald p̂ ± 1,96·√(p̂(1 − p̂)/n) a une couverture de 95 % pour tout n et tout p (ici n = ${n}).`,
    explanation: 'Avec p̂ = 0 (aucun succès), l’intervalle est réduit au point 0 : il ne contient jamais un p > 0. Pour n = 10 et p = 0,05, la couverture réelle est d’environ 0,40.',
    counter: numCounter({
      vars: [{ v: 'p', label: `Une proportion observée p̂ (n = ${n}) qui réduit l’IC à un point : p̂ =`, dom: 'R' }],
      hyp: '0≤p∧p≤1', pred: `p×(1-p)>0`, answer: { p: '0' },
    }),
  });
}

// ======================================================================
// p-ci-round (EE-209, part 3b)
// ======================================================================

const CR = 'p-ci-round';
const CR_SUB = [
  { id: 'sig', label: 'chiffres significatifs', skill: 'cm-round' },
  { id: 'dir', label: 'sens d’arrondi', skill: CR },
  { id: 'ci', label: 'IC à arrondir', skill: 'p-ci-mean' },
];

// θ̂ with 6 decimals and u, drawn so that rounding the lower bound to the
// nearest (or from rounded values) gives another bound, half of the time.
function crData(rng, wantNearestDiff) {
  for (let t = 0; t < 300; t++) {
    const e = rng.int(-4, 0); // u ≈ 10^e
    const first = rng.int(1, 9);
    const u = (first + rng.int(0, 999) / 1000) * 10 ** e;
    const theta = roundTo(rng.int(1, 60) + rng.next(), 6);
    const r = sigRound(u, 2);
    const dd = r.digits;
    if (dd < 0 || dd > 6) continue;
    const lo = theta - u;
    const hi = theta + u;
    if (lo <= 0) continue;
    const out = [floorTo(lo, dd), ceilTo(hi, dd)];
    const near = [roundTo(lo, dd), roundTo(hi, dd)];
    const tr = roundTo(theta, dd);
    const fromR = [floorTo(tr - r.value, dd), ceilTo(tr + r.value, dd)];
    const nearDiff = near[0] !== out[0] || near[1] !== out[1];
    if (nearDiff !== wantNearestDiff) continue;
    // Exactly on the grid: no rounding to learn.
    if (Math.abs(lo * 10 ** dd - Math.round(lo * 10 ** dd)) < 1e-6 || Math.abs(hi * 10 ** dd - Math.round(hi * 10 ** dd)) < 1e-6) continue;
    return { theta, u, ur: r.value, d: dd, lo, hi, out, near, tr, fromR, alt: firstDigit(u) >= 4 ? sigRound(u, 1) : null };
  }
  return { theta: 1.069871, u: 0.002415, ur: 0.0024, d: 4, lo: 1.067456, hi: 1.072286, out: [1.0674, 1.0723], near: [1.0675, 1.0723], tr: 1.0699, fromR: [1.0675, 1.0723], alt: null, fallback: true };
}

const dd = (x, d) => (d > 0 ? Number(x).toFixed(d).replace('.', ',') : String(Math.round(x)));

function crParts(c, level) {
  const uText = dd(c.ur, c.d);
  const accept = c.alt ? [val(c.alt.value)] : [];
  const iTraps = {
    p_ci_round_nearest: { values: [`[${val(c.near[0])};${val(c.near[1])}]`] },
    p_ci_round_from_rounded: { values: [`[${val(c.fromR[0])};${val(c.fromR[1])}]`] },
    p_ci_round_digits: { values: [`[${val(c.lo, 8)};${val(c.hi, 8)}]`, `[${val(floorTo(c.lo, Math.max(c.d - 2, 0)))};${val(ceilTo(c.hi, Math.max(c.d - 2, 0)))}]`], ctx: { u: uText } },
  };
  return [
    {
      label: 'u', name: 'u', kind: 'stat', expect: val(c.ur), decimals: c.d, sig: 2, sigAlt: c.alt ? 1 : undefined, accept,
      action: 'Arrondir u à 2 chiffres significatifs',
      lines: [{ math: uText, note: `2 chiffres significatifs : précision ${c.d ? `10${String(-c.d).replace(/./g, (x) => '⁰¹²³⁴⁵⁶⁷⁸⁹'['0123456789'.indexOf(x)] ?? '⁻')}` : '1'}`, subgoal: 'sig', blank: [uText] }],
    },
    {
      label: 'θ̂', name: 'th', kind: 'stat', expect: val(c.tr), decimals: c.d + 3, accept: c.alt ? [val(roundTo(c.theta, c.d - 1))] : [],
      action: 'Arrondir θ̂ à la même précision que u',
      lines: [{ math: dd(c.tr, c.d), note: 'Même dernière décimale que u', subgoal: 'sig', blank: [dd(c.tr, c.d)] }],
    },
    ...(level >= 2 ? [{
      label: 'θ̂ ± u', name: 'raw', kind: 'stat', expect: [val(c.lo, 10), val(c.hi, 10)], decimals: 8, action: 'Calculer θ̂ ± u avec les valeurs complètes',
      lines: [{ math: `[${dd(c.lo, 8).replace(/0+$/, '')} ; ${dd(c.hi, 8).replace(/0+$/, '')}]`, note: 'Avec les valeurs non arrondies', subgoal: 'ci', blank: [dd(c.lo, 8).replace(/0+$/, '')] }],
    }] : []),
    {
      label: 'IC', name: 'ic', kind: 'stat', expect: [val(c.lo, 10), val(c.hi, 10)], ciRule: 'outward', digits: c.d, digitsFrom: 'u', decimals: c.d + 2,
      action: 'Bornes : vers le bas, puis vers le haut', traps: iTraps,
      wrongActions: [{ label: 'Arrondir chaque borne au plus proche', rule: 'p_ci_round_nearest', why: 'L’IC ne doit pas rétrécir : la borne basse vers le bas, la haute vers le haut.' }, { label: 'Calculer θ̂ ± u avec les valeurs arrondies', rule: 'p_ci_round_from_rounded', why: 'On arrondit les bornes calculées avec les valeurs complètes.' }],
      decisions: [{ prompt: 'Comment arrondir les bornes ?', levels: [1, 2], options: [
        { id: 'out', label: 'Vers l’extérieur : la borne inférieure vers le bas, la supérieure vers le haut', valid: true },
        { id: 'near', label: 'Chaque borne au plus proche', valid: false, rule: 'p_ci_round_nearest', why: 'Arrondir au plus proche peut rétrécir l’intervalle : on arrondit vers l’extérieur.' },
      ] }],
      lines: [
        { math: `[${dd(c.out[0], c.d)} ; ${dd(c.out[1], c.d)}]`, note: 'Vers le bas, vers le haut', subgoal: 'dir', blank: [dd(c.out[0], c.d), dd(c.out[1], c.d)] },
      ],
    },
  ];
}

function crItem(level, rng, profile, opts = {}) {
  const c = crData(rng, opts.exam === 'mcq' ? true : rng.chance(0.55));
  if (opts.exam === 'mcq') return crMcq(c, rng, opts);
  if (opts.exam === 'tf') return crTf(c, opts);
  const parts = crParts(c, level);
  let prompt = `Un estimateur vaut θ̂ = ${dd(c.theta, 6)} et la demi-largeur de l’IC est u = ${dd(c.u, Math.max(c.d + 2, 3))}. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.`;
  if (level === 5) {
    // From a Student interval: u = t·s/√n first.
    const n = pick(rng, [16, 25, 36, 49, 64, 100]);
    const t = { 16: 2.131, 25: 2.064, 36: 2.03, 49: 2.01, 64: 2.0, 100: 1.984 }[n];
    const s = roundTo(c.u * Math.sqrt(n) / t, 6);
    const u = t * s / Math.sqrt(n);
    const c2 = { ...c, u };
    c2.lo = c.theta - u;
    c2.hi = c.theta + u;
    const r2 = sigRound(u, 2);
    if (r2.digits === c.d && Math.abs(r2.value - c.ur) < 1e-12) {
      c2.out = [floorTo(c2.lo, c.d), ceilTo(c2.hi, c.d)];
      c2.near = [roundTo(c2.lo, c.d), roundTo(c2.hi, c.d)];
      c2.fromR = [floorTo(c.tr - c.ur, c.d), ceilTo(c.tr + c.ur, c.d)];
      const ps = crParts(c2, level);
      ps.unshift({
        label: 'u_brut', name: 'ub', kind: 'stat', expect: `${t}*${val(s)}/√${n}`, decimals: Math.max(c.d + 2, 3), action: 'Demi-largeur t·s/√n',
        lines: [{ math: `${dec(t, 3)}×${dd(s, 6)}/√(${n})`, note: 'u = t·s/√n', subgoal: 'ci' }, { math: dd(u, Math.max(c.d + 3, 4)) }],
      });
      prompt = `Sur n = ${n} mesures normales : x̄ = ${dd(c.theta, 6)}, s = ${dd(s, 6)}, et t₍${n - 1}₎ ; 0,975 = ${dec(t, 3)} (donné). Calcule la demi-largeur u, puis écris u, x̄ et l’IC à 95 % arrondis selon la règle d’EE-209.`;
      return statItem({ skill: CR, level, key: `5:${n}:${c.theta}:${s}`, prompt, parts: ps, hints: [], subgoals: CR_SUB, interpret: ciInterpret(95, 'μ', c2.out[0], c2.out[1]), exam: examTag(opts) });
    }
  }
  return statItem({
    skill: CR, level, key: `${level}:${c.theta}:${c.u}`, prompt, parts,
    hints: H('La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit.', SM(`[${dd(c.out[0], c.d)} ; □]`), `IC = [${dd(c.out[0], c.d)} ; ${dd(c.out[1], c.d)}]`),
    subgoals: CR_SUB, exam: examTag(opts), fallback: c.fallback,
  });
}

function crMcq(c, rng, opts) {
  const iv = ([a, b], d) => `[${dd(a, d)} ; ${dd(b, d)}]`;
  const wrongs = [
    { html: iv(c.near, c.d), rule: 'p_ci_round_nearest' },
    { html: iv(c.fromR, c.d), rule: 'p_ci_round_from_rounded' },
    { html: iv([c.lo, c.hi], 6), rule: 'p_ci_round_digits' },
    { html: iv([floorTo(c.lo, Math.max(c.d - 2, 0)), ceilTo(c.hi, Math.max(c.d - 2, 0))], Math.max(c.d - 2, 0)), rule: 'p_ci_round_digits' },
  ];
  return choice({
    skill: CR, level: 4, key: `mcq:${c.theta}:${c.u}`, exam: examTag(opts),
    prompt: `θ̂ = ${dd(c.theta, 6)} et u = ${dd(c.u, Math.max(c.d + 2, 3))}. Quel est l’IC arrondi selon la règle d’EE-209 (u à 2 chiffres significatifs, bornes vers l’extérieur) ?`,
    right: iv(c.out, c.d), wrongs,
  }, rng);
}

function crTf(c, opts) {
  // Use a draw where the nearest rounding moves a bound.
  const truth = !(c.near[0] !== c.out[0] || c.near[1] !== c.out[1]) ? true : false;
  if (truth) {
    return tf({
      skill: CR, key: 'bas', exam: examTag(opts), truth: true,
      statement: 'Selon la règle d’EE-209, la borne inférieure d’un IC s’arrondit vers le bas.',
      explanation: 'On arrondit vers l’extérieur, pour ne jamais rétrécir l’intervalle.',
    });
  }
  const lower = c.near[0] !== c.out[0];
  const x = lower ? c.lo : c.hi;
  const a = lower ? c.near[0] : c.near[1];
  const b = lower ? c.out[0] : c.out[1];
  return tf({
    skill: CR, key: `proche:${c.theta}:${c.u}`, exam: examTag(opts), truth: false, ruleIfTrue: 'p_ci_round_nearest',
    statement: `Pour θ̂ = ${dd(c.theta, 6)} et u = ${dd(c.u, Math.max(c.d + 2, 3))}, on arrondit chaque borne de l’IC au plus proche, à la précision de u.`,
    explanation: `La borne ${lower ? 'inférieure' : 'supérieure'} ${dd(x, 6)} donne ${dd(a, c.d)} au plus proche, mais ${dd(b, c.d)} vers l’extérieur.`,
    counter: numCounter({
      vars: [{ v: 'a', label: `${dd(x, 6)} arrondi au plus proche (${c.d} décimales) :` }, { v: 'b', label: `${dd(x, 6)} arrondi vers ${lower ? 'le bas' : 'le haut'} :` }],
      hyp: `a=${dd(a, c.d)}∧b=${dd(b, c.d)}`, pred: 'a=b', answer: { a: dd(a, c.d), b: dd(b, c.d) },
    }),
  });
}

// ======================================================================
// p-max-sample
// ======================================================================

const MS = 'p-max-sample';
const MS_SUB = [
  { id: 'all', label: '« tous ≤ x »', skill: 'p-indep' },
  { id: 'F', label: 'fonction de répartition', skill: 'p-cont-quantile' },
  { id: 'piv', label: 'pivot et IC', skill: MS },
];
const XV = { vars: ['x', 'θ'], domain: { x: [0.2, 1], 'θ': [1.2, 3] } };

// Density (k + 1)x^k/θ^(k+1) on [0 ; θ] (k = 0: uniform), n data.
function msDensityParts(k, n, withF = true) {
  const m = k + 1;
  const N = n * m;
  const f = k === 0 ? '1/θ' : `${m}x^${k}/θ^${m}`;
  const F = m === 1 ? 'x/θ' : `(x/θ)^${m}`;
  const parts = [];
  if (withF) {
    parts.push({
      label: 'F(x)', name: 'F', kind: 'prob', ...XV, expect: F, action: 'Fonction de répartition d’une donnée',
      lines: [{ math: F, note: k === 0 ? 'F(x) = x/θ sur [0 ; θ]' : `F(x) = ∫₀ˣ ${m}u^${k}/θ^${m} du`, subgoal: 'F', blank: [String(m === 1 ? 'x/θ' : m)] }],
    });
  }
  parts.push({
    label: 'F_M(x)', name: 'FM', kind: 'prob', ...XV, expect: `(x/θ)^${N}`, action: 'Maximum : F(x)ⁿ (tous ≤ x)',
    traps: { p_max_min_swap: [`1-(1-${m === 1 ? 'x/θ' : `(x/θ)^${m}`})^${n}`] },
    wrongActions: [{ label: 'Prendre 1 − (1 − F(x))ⁿ', rule: 'p_max_min_swap', why: '« max ≤ x » veut dire « tous ≤ x » : F(x)ⁿ. L’autre formule est celle du minimum.' }],
    lines: [{ math: `(x/θ)^${N}`, note: `M ≤ x ⇔ les ${n} données ≤ x : F(x)${supT(n)}`, subgoal: 'all', blank: [String(N)] }],
  });
  parts.push({
    label: 'f_M(x)', name: 'fM', kind: 'prob', ...XV, expect: `${N}x^${N - 1}/θ^${N}`, action: 'Dériver F_M',
    traps: { p_max_density_power: [`(${f})^${n}`] },
    wrongActions: [{ label: 'Prendre f(x)ⁿ', rule: 'p_max_density_power', why: 'C’est F qui s’élève à la puissance n ; on dérive ensuite.' }],
    lines: [{ math: `${N}x^${N - 1}/θ^${N}`, note: 'f_M = n·F^(n−1)·f', subgoal: 'piv', blank: [String(N), String(N - 1)] }],
  });
  return { parts, f, F, N };
}

// The exact interval for θ (uniform): [M ; M·α^(−1/n)].
function msCiPart(M, n, alpha) {
  const hi = M * alpha ** (-1 / n);
  return {
    part: {
      label: 'IC', name: 'ic', kind: 'stat', expect: [String(M), `${M}*${val(alpha)}^(-1/${n})`], decimals: 2, action: 'Inverser : θ ∈ [M ; M·α^(−1/n)]',
      decisions: [{ prompt: 'Quel pivot ?', levels: [1, 2], options: [
        { id: 'piv', label: `M/θ, de fonction de répartition u^${n} sur [0 ; 1]`, valid: true },
        { id: 'clt', label: 'Le théorème central limite sur M', valid: false, why: `M n’est pas une moyenne ; sa loi exacte est connue : Pr(M/θ ≤ u) = u^${n}.` },
      ] }],
      lines: [{ math: `[${M} ; ${M}×${dec(alpha)}^(-1/${n})]`, note: `Pr(${dec(alpha)}^(1/${n}) ≤ M/θ ≤ 1) = ${dec(1 - alpha)}`, subgoal: 'piv', blank: [String(n)] }, { math: `[${M} ; ${dec(roundTo(hi, 2), 2)}]`, blank: [dec(roundTo(hi, 2), 2)] }],
    },
    hi,
  };
}

function msItem(level, rng, profile, opts = {}) {
  const n = pick(rng, [5, 10, 20]);
  const alpha = pick(rng, [0.05, 0.1]);
  if (opts.exam === 'mcq') return msMcq(rng, opts);
  const kind = opts.exam === 'coef' ? 'ci' : level === 5 || opts.exam === 'open' ? 'plates' : level === 1 ? 'unif' : pick(rng, ['unif', 'dens', 'ci', 'dens']);
  if (kind === 'ci' || kind === 'plates') {
    const M = kind === 'plates' ? pick(rng, [347, 512, 689, 925]) : rng.int(5, 40);
    const { part, hi } = msCiPart(M, n, alpha);
    const pre = kind === 'plates'
      ? `Sur ${n} plaques vaudoises vues au hasard, le plus grand numéro est M = ${M}. On modélise les numéros par des variables iid U[0, θ].`
      : `X₁, …, X${subT(n)} iid U[0, θ], et M = max Xᵢ = ${M}.`;
    const parts = [];
    if (kind === 'plates') parts.push(...msDensityParts(0, n, false).parts.slice(0, 1));
    parts.push(part);
    const o = {
      skill: MS, level, key: `${level}:${kind}:${n}:${M}:${alpha}`,
      prompt: `${pre} ${kind === 'plates' ? 'Donne F_M, puis l’IC' : 'Donne l’IC'} exact à ${dec((1 - alpha) * 100)} % pour θ (deux décimales).`,
      parts,
      hints: H('Le maximum est ≤ x si et seulement si toutes les données le sont ; M/θ a la fonction de répartition uⁿ.', SM(`[${M} ; ${M}×${dec(alpha)}^(-1/□)]`), `IC = [${M} ; ${dec(roundTo(hi, 2), 2)}]`),
      subgoals: MS_SUB, interpret: ciInterpret(Math.round((1 - alpha) * 100), 'θ', M, roundTo(hi, 2)), exam: examTag(opts),
    };
    if (opts.exam === 'open') return openItem({ ...o, exam: undefined, title: 'Maximum et IC exact' }, 8, rng);
    if (opts.exam === 'coef') return coefItem({ ...o, prompt: `${pre} Donne la borne supérieure de l’IC exact à ${dec((1 - alpha) * 100)} % pour θ.`, part: { label: 'borne sup.', kind: 'stat', expect: `${M}*${val(alpha)}^(-1/${n})`, decimals: 2, lines: [{ math: dec(roundTo(hi, 2), 2) }] } });
    return statItem(o);
  }
  const k = kind === 'unif' ? 0 : rng.int(1, 3);
  const { parts, f } = msDensityParts(k, n, true);
  const fT = k === 0 ? '1/θ' : `${k + 1}x${k > 1 ? `^${k}` : ''}/θ^${k + 1}`;
  return statItem({
    skill: MS, level, key: `${level}:${k}:${n}`,
    prompt: `X₁, …, X${subT(n)} iid de densité f(x) = ${SM(fT)} sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].`,
    parts,
    hints: H('Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive.', SM(`(x/θ)^□`), `f_M(x) = ${SM(`${n * (k + 1)}x^${n * (k + 1) - 1}/θ^${n * (k + 1)}`)}`),
    subgoals: MS_SUB, exam: examTag(opts),
  });
}

function msMcq(rng, opts) {
  const n = pick(rng, [3, 4, 5, 10]);
  const k = rng.int(0, 2);
  const m = k + 1;
  const F = m === 1 ? 'x/θ' : `(x/θ)^${m}`;
  return choice({
    skill: MS, level: 4, key: `mcq:${n}:${k}`, exam: examTag(opts),
    prompt: `X₁, …, X${subT(n)} iid de fonction de répartition F(x) = ${SM(F)} sur [0 ; θ]. Quelle est la densité de M = max Xᵢ sur [0 ; θ] ?`,
    right: SM(`${n * m}x^${n * m - 1}/θ^${n * m}`),
    wrongs: [
      { html: SM(`(${m === 1 ? '1/θ' : `${m}x^${k}/θ^${m}`})^${n}`), rule: 'p_max_density_power' },
      { html: SM(`${n}×(1-${F})^${n - 1}×${m === 1 ? '1/θ' : `${m}x^${k}/θ^${m}`}`), rule: 'p_max_min_swap' },
      { html: SM(`(x/θ)^${n * m}`) },
    ],
  }, rng);
}

export const GEN = { [CM]: cmItem, [CW]: cwItem, [CR]: crItem, [MS]: msItem };
void sum; void PhiInv; void eeT; void r;

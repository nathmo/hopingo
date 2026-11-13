// Generators of module P, part e (unit `proba`, step U7): χ² tests (this
// file), interpretation and regression diagnostics (proba-e-interp.js),
// regression (proba-e-reg.js), Bayesian statistics (proba-e-bayes.js).
// Catalogue: docs/universite/P-probabilites.md. Skills: proba-e.skills.js;
// traps: js/cas/rules/pe.js; tools: proba-kit.js, proba-e-kit.js.
//
// A χ² test is a lines item of named values (judges prob and stat): the
// expected counts, T, r, the 5 % quantile of Table 4 (read for the
// student's own r), the decision at 5 %, then the 1 % quantile (to bracket
// the p-value) and « Interpréter ».

import { choice, tf, numCounter, H, examTag } from './proba-kit.js';
import { statItem, coefItem, openItem, q, qt, qs, ql, rl, r2, chi, sum, qsum, interp, vf, zeroSum } from './proba-e-kit.js';
import { chi2Inv, roundTo, poisson } from '../../cas/stats.js';
import { GEN as INTERP } from './proba-e-interp.js';
import { GEN as REG } from './proba-e-reg.js';
import { GEN as BAYES } from './proba-e-bayes.js';
import { t } from '../../i18n.js';

const decision = (reject, T, c, a = 5) => ({
  prompt: t('Décision au niveau {a} % ?', { a }),
  options: [
    { id: 'rej', label: t('Rejeter H₀ : T = {T} > {c}', { T: r2(T), c: r2(c, 3) }), valid: reject, why: t('T = {T} ne dépasse pas le seuil {c} : on ne rejette pas H₀.', { T: r2(T), c: r2(c, 3) }), rule: reject ? undefined : 'p_pvalue_alpha_compare' },
    { id: 'keep', label: t('Ne pas rejeter H₀ : T = {T} ≤ {c}', { T: r2(T), c: r2(c, 3) }), valid: !reject, why: t('T = {T} dépasse le seuil {c} : on rejette H₀ (le test χ² rejette pour T grand).', { T: r2(T), c: r2(c, 3) }), rule: reject ? 'p_pvalue_alpha_compare' : undefined },
  ],
});

// The region of T: below the 5 % quantile, between 5 % and 1 %, above 1 %.
const regionOf = (T, r) => (T < chi(r, 5) ? 'keep' : T < chi(r, 1) ? 'five' : 'one');
const clear = (T, r) => [chi(r, 5), chi(r, 1)].every((c) => Math.abs(T - c) >= 0.4);

// The interpretation of a χ² test by region, with the traps of part e.
function chiInterp(rng, region, h0, h1) {
  // French agreement: « la répartition … est prouvée », « un dé … est prouvé ».
  const fem = h0.startsWith('l');
  const H0 = `${h0[0].toUpperCase()}${h0.slice(1)}`;
  if (region === 'keep') {
    return interp(rng, t('Les données sont compatibles avec {h0} au niveau 5 % : on ne peut pas conclure que {h1}.', { h0, h1 }), [
      [fem ? t('{H0} est prouvée par le test.', { H0 }) : t('{H0} est prouvé par le test.', { H0 }), 'p_accept_h0'],
      [fem ? t('La probabilité que {h0} soit vraie est supérieure à 95 %.', { h0 }) : t('La probabilité que {h0} soit vrai est supérieure à 95 %.', { h0 }), 'p_pvalue_h0'],
      [t('On rejetterait H₀ au niveau 1 %.'), 'p_reject_10_5'],
    ]);
  }
  const five = region === 'five';
  return interp(rng, five
    ? t('Les données sont peu compatibles avec {h0} au niveau 5 %, mais pas au niveau 1 % : 0,01 < p < 0,05.', { h0 })
    : t('Les données contredisent {h0}, même au niveau 1 % : p < 0,01.', { h0 }), [
    [fem ? t('La probabilité que {h0} soit vraie est inférieure à {a} %.', { h0, a: five ? '5' : '1' }) : t('La probabilité que {h0} soit vrai est inférieure à {a} %.', { h0, a: five ? '5' : '1' }), 'p_pvalue_h0'],
    [t('Puisque l\'on rejette H₀, l\'écart est grand et important en pratique.'), 'p_significant_large'],
    five ? [t('On rejetterait aussi H₀ au niveau 1 %.'), 'p_reject_10_5'] : [t('On a prouvé que {h1}, avec certitude.', { h1 }), 'p_accept_h0'],
  ]);
}

// ======================================================================
// p-test-chi2-gof
// ======================================================================

const GOF = 'p-test-chi2-gof';
const GOF_SUB = [
  { id: 'e', label: t('effectifs attendus'), skill: 'p-binom' },
  { id: 'T', label: t('statistique'), skill: GOF },
  { id: 'dec', label: t('décision'), skill: GOF },
];
const DIE_FACES = ['1', '2', '3', '4', '5', '6'];
const CATS = [
  { what: t('les couleurs de bonbons d\'un sachet'), names: [t('rouges'), t('verts'), t('jaunes')], p: [[1, 2], [1, 4], [1, 4]], h0: t('la répartition annoncée (1/2, 1/4, 1/4)') },
  { what: t('les modes de transport d\'élèves'), names: [t('vélo'), t('bus'), t('à pied')], p: [[2, 5], [2, 5], [1, 5]], h0: t('la répartition (40 %, 40 %, 20 %)') },
  { what: t('les groupes sanguins d\'un échantillon'), names: ['O', 'A', 'B', 'AB'], p: [[2, 5], [3, 10], [1, 5], [1, 10]], h0: t('la répartition (40 %, 30 %, 20 %, 10 %)') },
  { what: t('les phénotypes d\'un croisement'), names: ['AB', 'Ab', 'aB', 'ab'], p: [[9, 16], [3, 16], [3, 16], [1, 16]], h0: t('les proportions de Mendel 9 : 3 : 3 : 1') },
  { what: t('les jours de pannes d\'une machine'), names: [t('lundi'), t('mardi'), t('mercredi'), t('jeudi'), t('vendredi')], p: [[1, 5], [1, 5], [1, 5], [1, 5], [1, 5]], h0: t('des pannes uniformes sur les 5 jours') },
];

// {kind, story, names, o, e (Q), n, k, c, T (Q), h0, h1, eLine, pLine}
function gofData(rng, level) {
  const kind = level === 5 ? 'poisson' : rng.pick(level <= 2 ? ['die', 'die', 'cat'] : ['die', 'cat', 'cat']);
  const region = rng.pick(['keep', 'five', 'one']);
  const f = { keep: 1.2, five: 2.4, one: 3.6 }[region];
  for (let tries = 0; tries < 2000; tries++) {
    if (kind === 'die') {
      const m = rng.pick([10, 15, 20, 30]);
      const e = Array(6).fill(q(m));
      const d = zeroSum(rng, 6, Math.ceil(Math.sqrt(m * f)));
      const o = d.map((x) => m + x);
      const T = qsum(d.map((x) => q(x * x, m)));
      if (regionOf(T.valueOf(), 5) !== region || !clear(T.valueOf(), 5) || !T.mul(100).isInt()) continue;
      return { kind, region, names: DIE_FACES, o, e, n: 6 * m, k: 6, c: 0, T, p: Array(6).fill([1, 6]),
        story: t('Un dé est lancé {n} fois. Effectifs des faces 1 à 6 : {o}. Le dé est-il équilibré ? Test χ² d\'adéquation au niveau 5 %.', { n: 6 * m, o: o.join(', ') }),
        h0: t('un dé équilibré'), h1: t('le dé est truqué') };
    }
    if (kind === 'cat') {
      const C = rng.pick(CATS);
      const den = C.p.reduce((l, [, b]) => (l % b === 0 ? l : l * b / gcd(l, b)), 1);
      const minP = Math.min(...C.p.map(([a, b]) => a / b));
      const m = rng.int(Math.ceil(5 / (minP * den)), Math.ceil(5 / (minP * den)) + 6);
      const n = m * den;
      const e = C.p.map(([a, b]) => q(n * a, b));
      const k = e.length;
      const d = zeroSum(rng, k, Math.ceil(Math.sqrt(Math.min(...e.map((x) => x.valueOf())) * f)));
      const o = e.map((x, i) => x.valueOf() + d[i]);
      if (o.some((x) => x < 0)) continue;
      const T = qsum(d.map((x, i) => q(x * x).div(e[i])));
      const Tv = T.valueOf();
      if (regionOf(Tv, k - 1) !== region || !clear(Tv, k - 1) || Tv < 0.3) continue;
      return { kind, region, names: C.names, o, e, n, k, c: 0, T, p: C.p,
        story: t('On observe {what} sur {n} cas : {list}. Ces effectifs suivent-ils {h0} ? Test χ² d\'adéquation au niveau 5 %.', { what: C.what, n, list: C.names.map((x, i) => `${x} ${o[i]}`).join(', '), h0: C.h0 }),
        h0: C.h0, h1: t('la répartition n\'est pas {h0}', { h0: C.h0 }) };
    }
    // Level 5: Poisson fitted on the data (c = 1), classes 0, 1, 2, ≥ 3.
    const lambda = rng.pick([1, 1.5, 2]);
    const n = rng.pick([100, 200]);
    const raw = [0, 1, 2].map((j) => n * poisson(j, lambda));
    const e = [...raw.map((x) => roundTo(x, 1)), roundTo(n - raw.reduce((s, x) => s + x, 0), 1)];
    const eq = e.map((x) => q(Math.round(x * 10), 10));
    const d = zeroSum(rng, 4, Math.ceil(Math.sqrt(Math.min(...e) * f)));
    const o = e.map((x, i) => Math.round(x) + d[i]);
    o[3] = n - o[0] - o[1] - o[2];
    if (o.some((x) => x < 0)) continue;
    const T = qsum(o.map((x, i) => q(x).sub(eq[i]).mul(q(x).sub(eq[i])).div(eq[i])));
    const Tv = T.valueOf();
    if (regionOf(Tv, 2) !== region || !clear(Tv, 2)) continue;
    return { kind, region, names: ['0', '1', '2', '≥ 3'], o, e: eq, n, k: 4, c: 1, T, lambda,
      story: t('Nombre de pannes par jour sur {n} jours : 0 panne {o0} fois, 1 panne {o1} fois, 2 pannes {o2} fois, 3 ou plus {o3} fois. On ajuste une loi de Poisson (λ̂ = x̄ = {lambda}, estimé sur ces données) ; effectifs attendus : {e}. La loi de Poisson convient-elle ? Test χ² au niveau 5 %.', { n, o0: o[0], o1: o[1], o2: o[2], o3: o[3], lambda: String(lambda).replace('.', ','), e: e.map((x) => String(x).replace('.', ',')).join(' ; ') }),
      h0: t('une loi de Poisson'), h1: t('les pannes ne suivent pas une loi de Poisson') };
  }
  return gofFallback();
}
function gcd(a, b) { return b ? gcd(b, a % b) : a; }
function gofFallback() {
  const o = [5, 8, 9, 8, 10, 20];
  return { kind: 'die', region: 'five', names: DIE_FACES, o, e: Array(6).fill(q(10)), n: 60, k: 6, c: 0, T: q(67, 5), p: Array(6).fill([1, 6]), fallback: true,
    story: t('Un dé est lancé {n} fois. Effectifs des faces 1 à 6 : {o}. Le dé est-il équilibré ? Test χ² d\'adéquation au niveau 5 %.', { n: 60, o: o.join(', ') }),
    h0: t('un dé équilibré'), h1: t('le dé est truqué') };
}

const eTxt = (x) => ql(x, 1);
function gofParts(d, level) {
  const r = d.k - 1 - d.c;
  const equal = d.e.every((x) => x.eq(d.e[0]));
  const terms = d.o.map((o, i) => `(${o}-${eTxt(d.e[i])})^2/${eTxt(d.e[i])}`);
  const sq = d.o.map((o, i) => q(o).sub(d.e[i]).mul(q(o).sub(d.e[i])));
  const line2 = equal ? `(${sq.map(qt).join('+')})/${eTxt(d.e[0])}` : sq.map((s, i) => `${ql(s, 2)}/${eTxt(d.e[i])}`).join('+');
  const Tv = d.T.valueOf();
  const props = d.T.div(d.n);
  const byObs = qsum(sq.map((s, i) => s.div(d.o[i] || 1)));
  const parts = [];
  if (d.kind !== 'poisson') {
    const [a, b] = d.p[0];
    parts.push({
      label: equal ? 'e' : 'e₁', name: 'e', kind: 'prob', expect: qt(d.e[0]), action: t('Effectifs attendus : eᵢ = n·pᵢ'),
      traps: { p_chi2_proportions: { values: [`${a}/${b}`], ctx: { n: d.n } } },
      wrongActions: [{ label: t('Prendre les proportions pᵢ comme effectifs attendus'), rule: 'p_chi2_proportions', why: t('Le χ² compare des effectifs : eᵢ = n·pᵢ.') }],
      decisions: [{ prompt: t('Que compare le test χ² ?'), levels: [1, 2], options: [
        { id: 'counts', label: t('Des effectifs : eᵢ = n·pᵢ'), valid: true },
        { id: 'props', label: t('Des proportions : eᵢ = pᵢ'), valid: false, rule: 'p_chi2_proportions', why: t('Avec des proportions, T est divisé par n : le χ² compare des effectifs observés et attendus.') },
      ] }],
      lines: [
        { math: `${d.n}×${a}/${b}`, note: equal ? (d.kind === 'die' ? t('Même effectif attendu pour chaque face') : t('Même effectif attendu pour chaque classe')) : t('Classe « {c} »', { c: d.names[0] }), subgoal: 'e', blank: [`${a}/${b}`] },
        { math: qt(d.e[0]), note: t('Effectif attendu'), blank: [qt(d.e[0])] },
      ],
    });
  }
  parts.push({
    label: 'T', name: 'T', kind: 'stat', decimals: 2, expect: qt(d.T), action: t('Calculer T = Σ(oᵢ − eᵢ)²/eᵢ'),
    title: t('Statistique T'),
    notes: d.kind === 'poisson' || equal ? [] : [t('Effectifs attendus : {list}.', { list: d.e.map((x, i) => `${d.names[i]} ${qs(x, 1)}`).join(', ') })],
    traps: { p_chi2_proportions: { values: [qt(props)], ctx: { n: d.n } }, p_chi2_divide_obs: [qt(byObs)] },
    wrongActions: [{ label: t('Diviser chaque écart au carré par l\'effectif observé'), rule: 'p_chi2_divide_obs', why: t('On divise par l\'effectif attendu sous H₀, eᵢ.') }],
    lines: [
      { math: terms.join('+'), note: t('Un terme par classe'), subgoal: 'T', blank: [terms[0]], blank2: terms.slice(0, 2) },
      { math: line2, note: t('Écarts au carré'), blank: [qt(sq[sq.length - 1])] },
      { math: rl(Tv, 2), note: t('Statistique observée'), blank: [rl(Tv, 2)] },
    ],
  });
  parts.push({
    label: 'r', name: 'r', kind: 'prob', expect: String(r), action: t('Degrés de liberté : r = k − 1 − c'),
    traps: { p_chi2_df: { values: d.c ? [String(d.k - 1), String(d.k)] : [String(d.k)], ctx: { k: d.k, c: d.c, r } } },
    wrongActions: [{ label: t('r = k, le nombre de classes'), rule: 'p_chi2_df', why: t('On perd un degré par la somme fixée, et un par paramètre estimé.') }],
    decisions: d.c ? [{ prompt: t('Le paramètre λ a été estimé sur les données. Conséquence ?'), levels: [2, 3, 4], options: [
      { id: 'c1', label: t('On retire un degré de liberté de plus : r = k − 1 − 1'), valid: true },
      { id: 'c0', label: t('Rien : r = k − 1'), valid: false, rule: 'p_chi2_df', why: t('Chaque paramètre estimé sur les données retire un degré de liberté.') },
    ] }] : [],
    lines: [
      { math: d.c ? `${d.k}-1-${d.c}` : `${d.k}-1`, note: d.c ? t('k classes, un paramètre estimé') : t('k classes, probabilités fixées'), subgoal: 'dec', blank: [String(d.k)] },
      { math: String(r), note: t('Degrés de liberté'), blank: [String(r)] },
    ],
  });
  parts.push({
    label: 's₅', name: 's', kind: 'stat', decimals: 3, expect: '#chi($r,5)', action: t('Lire le seuil à 5 % dans la Table 4'),
    title: t('Seuil à 5 % (Table 4, queue supérieure)'),
    traps: { p_chi2_df: { values: [qt(chi(d.k, 5)), ...(d.c ? [qt(chi(d.k - 1, 5))] : [])], ctx: { k: d.k, c: d.c, r } } },
    lines: [{ math: rl(chi(r, 5), 3), note: t('Table 4, ligne r = {r}, colonne s₅', { r }), blank: [rl(chi(r, 5), 3)] }],
  });
  parts.push({
    label: 's₁', name: 'sone', kind: 'stat', decimals: 3, expect: '#chi($r,1)', action: t('Lire le seuil à 1 % pour encadrer la p-valeur'),
    title: t('Seuil à 1 %, pour encadrer la p-valeur'),
    decisions: [decision(Tv > chi(r, 5), Tv, chi(r, 5))],
    lines: [{ math: rl(chi(r, 1), 3), note: t('Table 4, colonne s₁ : {s}', { s: Tv > chi(r, 1) ? t('T le dépasse aussi, p < 0,01') : Tv > chi(r, 5) ? t('T est entre les deux seuils, 0,01 < p < 0,05') : 'p > 0,05' }), subgoal: 'dec', blank: [rl(chi(r, 1), 3)] }],
  });
  return parts;
}

function gofHints(d) {
  const r = d.k - 1 - d.c;
  return H(t('Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés).'),
    t('T = ({o} − {e})²/{e} + … (une classe par terme)', { o: d.o[0], e: qs(d.e[0], 1) }),
    `T = ${r2(d.T.valueOf())}, r = ${r}, s₅(${r}) = ${r2(chi(r, 5), 3)}`);
}

function gofItem(level, rng, profile, opts = {}) {
  const d = gofData(rng, level);
  if (opts.exam === 'mcq') return gofMcq(d, rng, opts);
  if (opts.exam === 'tf') return gofTf(rng, opts);
  const parts = gofParts(d, level);
  const o = {
    skill: GOF, level, key: `${level}:${d.kind}:${d.o.join('-')}`, prompt: d.story, parts,
    hints: gofHints(d), subgoals: GOF_SUB, exam: examTag(opts), fallback: d.fallback,
    interpret: chiInterp(rng, d.region, d.h0, d.h1),
  };
  if (opts.exam === 'coef') return coefItem({ ...o, part: parts.find((p) => p.name === 'T'), prompt: t('{story} Calcule la statistique T (à 0,01 près).', { story: d.story }) });
  if (opts.exam === 'open') return openItem(o, 10, rng);
  return statItem(o);
}

function gofMcq(d, rng, opts) {
  const r = d.k - 1 - d.c;
  if (d.c || rng.chance(0.3)) {
    return choice({ skill: GOF, level: 4, prompt: t('{story} Combien de degrés de liberté a la loi de T sous H₀ ?', { story: d.story }), right: String(r),
      wrongs: [{ html: String(d.k), rule: 'p_chi2_df' }, { html: String(d.k - 1 - d.c === d.k - 1 ? d.k - 2 : d.k - 1), rule: d.c ? 'p_chi2_df' : null }],
      fillers: [{ html: String(d.n - 1) }, { html: String(d.k + 1) }], key: `mcq:r:${d.o.join('-')}`, exam: examTag(opts) }, rng);
  }
  const sq = d.o.map((o, i) => q(o).sub(d.e[i]).mul(q(o).sub(d.e[i])));
  const byObs = qsum(sq.map((s, i) => s.div(d.o[i] || 1)));
  return choice({ skill: GOF, level: 4, prompt: t('{story} Que vaut la statistique T ?', { story: d.story }), right: r2(d.T.valueOf()),
    wrongs: [{ html: r2(d.T.valueOf() / d.n, 3), rule: 'p_chi2_proportions' }, { html: r2(byObs.valueOf()), rule: 'p_chi2_divide_obs' }],
    fillers: [{ html: r2(Math.sqrt(d.T.valueOf())) }, { html: r2(d.T.valueOf() * 2) }], key: `mcq:T:${d.o.join('-')}`, exam: examTag(opts) }, rng);
}

function gofTf(rng, opts) {
  const kind = rng.pick(['big', 'df', 'df']);
  if (kind === 'big') {
    return tf({ skill: GOF, key: 'big', exam: examTag(opts), statement: t('Pour un test χ² d\'adéquation, une grande valeur de T = Σ(oᵢ − eᵢ)²/eᵢ conduit à rejeter H₀.'), truth: true,
      explanation: t('T mesure l\'écart entre effectifs observés et attendus : on rejette pour T grand (test unilatéral à droite).') });
  }
  return tf({ skill: GOF, key: 'df', exam: examTag(opts), statement: t('Dans un test χ² d\'adéquation à k classes, si l\'on estime c ≥ 1 paramètres sur les données, le nombre de degrés de liberté reste r = k − 1.'), truth: false,
    ruleIfTrue: 'p_chi2_df', explanation: t('r = k − 1 − c : chaque paramètre estimé retire un degré de liberté (Poisson ajustée : r = k − 2).'),
    counter: numCounter({ vars: [{ v: 'k', label: t('k (classes) ='), dom: 'N' }, { v: 'c', label: t('c (paramètres estimés) ='), dom: 'N' }], hyp: 'c≥1', pred: 'k-1-c=k-1', answer: { k: '4', c: '1' } }) });
}

// ======================================================================
// p-test-chi2-indep
// ======================================================================

const IND = 'p-test-chi2-indep';
const IND_SUB = [
  { id: 'marg', label: t('marges'), skill: 'p-joint-disc' },
  { id: 'T', label: t('statistique'), skill: IND },
  { id: 'dec', label: t('décision'), skill: IND },
];
const CTX = [
  { rows: [t('traités'), t('non traités')], cols: [t('guéris'), t('non guéris')], what: t('Patients selon le traitement (lignes) et la guérison (colonnes)'), h0: t('l\'indépendance du traitement et de la guérison'), h1: t('traitement et guérison sont liés'), cause: t('Le traitement cause la guérison : c\'est démontré.') },
  { rows: [t('yeux clairs'), t('yeux foncés')], cols: [t('cheveux blonds'), t('cheveux bruns'), t('cheveux roux')], what: t('Personnes selon la couleur des yeux (lignes) et des cheveux (colonnes)'), h0: t('l\'indépendance des yeux et des cheveux'), h1: t('la couleur des yeux et celle des cheveux sont liées'), cause: t('La couleur des yeux cause celle des cheveux.') },
  { rows: [t('salariés'), t('contractuels'), t('indépendants')], cols: [t('assurés'), t('non assurés')], what: t('Personnes selon le statut (lignes) et l\'assurance complémentaire (colonnes)'), h0: t('l\'indépendance du statut et de l\'assurance'), h1: t('le statut et l\'assurance sont liés'), cause: t('Être salarié fait prendre une assurance : la cause est établie.') },
  { rows: [t('bus'), t('vélo'), t('voiture')], cols: [t('matin'), t('midi'), t('soir')], what: t('Trajets selon le moyen de transport (lignes) et l\'heure (colonnes)'), h0: t('l\'indépendance du moyen et de l\'heure'), h1: t('le moyen de transport dépend de l\'heure'), cause: t('L\'heure cause le choix du transport : c\'est prouvé.') },
];

function indData(rng, level) {
  const region = rng.pick(['keep', 'five', 'one']);
  for (let tries = 0; tries < 400; tries++) {
    const C = rng.pick(level <= 2 ? CTX.slice(0, 2) : CTX);
    const h = C.rows.length;
    const k = C.cols.length;
    const a = Array.from({ length: h }, () => rng.int(1, 3));
    const b = Array.from({ length: k }, () => rng.int(1, 3));
    const m = rng.int(Math.ceil(5 / (Math.min(...a) * Math.min(...b))), 12);
    const e = a.map((x) => b.map((y) => m * x * y));
    const A = sum(a);
    const B = sum(b);
    const n = m * A * B;
    if (e[0][0] === n / (h * k) || n > 400) continue;
    const D = e.map((row) => row.map(() => 0));
    const blocks = h * k >= 6 && rng.chance(0.5) ? 2 : 1;
    for (let b = 0; b < blocks; b++) {
      const [i1, i2] = rng.shuffle([...Array(h).keys()]).slice(0, 2);
      const [j1, j2] = rng.shuffle([...Array(k).keys()]).slice(0, 2);
      const dd = rng.int(1, Math.max(2, Math.round(Math.sqrt(Math.min(e[i1][j1], e[i2][j2]) * 2))));
      D[i1][j1] += dd; D[i2][j2] += dd; D[i1][j2] -= dd; D[i2][j1] -= dd;
    }
    const N = e.map((row, i) => row.map((x, j) => x + D[i][j]));
    if (N.flat().some((x) => x < 0) || D.flat().every((x) => x === 0)) continue;
    const r = (h - 1) * (k - 1);
    const T = qsum(D.flat().map((x, idx) => q(x * x, e.flat()[idx])));
    const Tv = T.valueOf();
    if (regionOf(Tv, r) !== region || !clear(Tv, r)) continue;
    const R = N.map((row) => sum(row));
    const Cs = b.map((_, j) => sum(N.map((row) => row[j])));
    return { C, h, k, e, N, D, n, R, Cs, r, T, region };
  }
  const C = CTX[0];
  return { C, h: 2, k: 2, e: [[25, 25], [25, 25]], N: [[30, 20], [20, 30]], D: [[5, -5], [-5, 5]], n: 100, R: [50, 50], Cs: [50, 50], r: 1, T: q(4), region: 'five', fallback: true };
}

const tableHtml = (d) => `<table class="ptable" style="border-collapse:collapse;margin:6px 0"><tr><th></th>${d.C.cols.map((c) => `<th style="padding:2px 8px">${c}</th>`).join('')}<th style="padding:2px 8px">${t('total')}</th></tr>${d.N.map((row, i) => `<tr><th style="padding:2px 8px;text-align:left">${d.C.rows[i]}</th>${row.map((x) => `<td style="padding:2px 8px;text-align:center">${x}</td>`).join('')}<td style="padding:2px 8px;text-align:center">${d.R[i]}</td></tr>`).join('')}<tr><th style="padding:2px 8px;text-align:left">${t('total')}</th>${d.Cs.map((x) => `<td style="padding:2px 8px;text-align:center">${x}</td>`).join('')}<td style="padding:2px 8px;text-align:center">${d.n}</td></tr></table>`;
const indStory = (d) => t('{what} :{table}Test χ² d\'indépendance au niveau 5 %.', { what: d.C.what, table: tableHtml(d) });

function indParts(d) {
  const e11 = q(d.R[0] * d.Cs[0], d.n);
  const flat = d.N.flat();
  const ef = d.e.flat();
  const terms = flat.map((x, i) => `(${x}-${ef[i]})^2/${ef[i]}`);
  const nz = d.D.flat().map((x, i) => [x, ef[i]]).filter(([x]) => x !== 0);
  const Tv = d.T.valueOf();
  const byObs = qsum(flat.map((x, i) => q((x - ef[i]) ** 2, x || 1)));
  return [
    {
      label: 'e₁₁', name: 'e', kind: 'prob', expect: qt(e11), action: t('Effectif attendu : (total de la ligne × total de la colonne)/n'),
      traps: { p_chi2_expected_uniform: { values: [qt(q(d.n, d.h * d.k))], ctx: { n: d.n } } },
      wrongActions: [{ label: t('Répartir n uniformément : n/{hk}', { hk: d.h * d.k }), rule: 'p_chi2_expected_uniform', why: t('Sous l\'indépendance, eᵢⱼ = (total ligne × total colonne)/n, pas une répartition uniforme.') }],
      decisions: [{ prompt: t('Sous H₀ (indépendance), que vaut l\'effectif attendu eᵢⱼ ?'), levels: [1, 2], options: [
        { id: 'marg', label: t('(total de la ligne i × total de la colonne j)/n'), valid: true },
        { id: 'unif', label: t('n/{hk}, la même valeur pour chaque case', { hk: d.h * d.k }), valid: false, rule: 'p_chi2_expected_uniform', why: t('L\'indépendance garde les marges : eᵢⱼ = nᵢ·n·ⱼ/n.') },
      ] }],
      lines: [
        { math: `${d.R[0]}×${d.Cs[0]}/${d.n}`, note: t('Marges de la case (1, 1)'), subgoal: 'marg', blank: [String(d.Cs[0])] },
        { math: qt(e11), note: t('Effectif attendu'), blank: [qt(e11)] },
      ],
    },
    {
      label: 'T', name: 'T', kind: 'stat', decimals: 2, expect: qt(d.T), action: t('Calculer T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ'), title: t('Statistique T'),
      notes: [t('Effectifs attendus : {list}.', { list: d.e.map((row) => row.join(' ; ')).join(' | ') })],
      traps: { p_chi2_divide_obs: [qt(byObs)] },
      wrongActions: [{ label: t('Diviser par l\'effectif observé'), rule: 'p_chi2_divide_obs', why: t('On divise par l\'effectif attendu eᵢⱼ.') }],
      lines: [
        { math: terms.join('+'), note: t('Une case par terme'), subgoal: 'T', blank: [terms[0]] },
        { math: nz.map(([x, e]) => `${x * x}/${e}`).join('+'), note: nz.length < flat.length ? t('Les cases sans écart donnent 0') : t('Écarts au carré'), blank: [`${nz[0][0] ** 2}/${nz[0][1]}`] },
        { math: rl(Tv, 2), note: t('Statistique observée'), blank: [rl(Tv, 2)] },
      ],
    },
    {
      label: 'r', name: 'r', kind: 'prob', expect: String(d.r), action: t('Degrés de liberté : (h − 1)(k − 1)'),
      traps: { p_chi2_df_indep: { values: [String(d.h * d.k - 1)], ctx: { h: d.h, k: d.k, r: d.r } } },
      wrongActions: [{ label: `r = h·k − 1 = ${d.h * d.k - 1}`, rule: 'p_chi2_df_indep', why: t('Les marges sont estimées : r = (h − 1)(k − 1).') }],
      lines: [
        { math: `(${d.h}-1)(${d.k}-1)`, note: t('{h} lignes, {k} colonnes', { h: d.h, k: d.k }), subgoal: 'dec', blank: [String(d.k)] },
        { math: String(d.r), note: t('Degrés de liberté'), blank: [String(d.r)] },
      ],
    },
    {
      label: 's₅', name: 's', kind: 'stat', decimals: 3, expect: '#chi($r,5)', title: t('Seuil à 5 % (Table 4)'), action: t('Lire le seuil à 5 % dans la Table 4'),
      traps: { p_chi2_df_indep: { values: [qt(chi(d.h * d.k - 1, 5))], ctx: { h: d.h, k: d.k, r: d.r } } },
      lines: [{ math: rl(chi(d.r, 5), 3), note: `Table 4, r = ${d.r}`, blank: [rl(chi(d.r, 5), 3)] }],
    },
    {
      label: 's₁', name: 'sone', kind: 'stat', decimals: 3, expect: '#chi($r,1)', title: t('Seuil à 1 %, pour encadrer la p-valeur'), action: t('Lire le seuil à 1 %'),
      decisions: [decision(Tv > chi(d.r, 5), Tv, chi(d.r, 5))],
      lines: [{ math: rl(chi(d.r, 1), 3), note: t('Table 4, colonne s₁'), subgoal: 'dec', blank: [rl(chi(d.r, 1), 3)] }],
    },
  ];
}

function indInterp(rng, d) {
  const { C } = d;
  if (d.region === 'keep') {
    return interp(rng, t('Au niveau 5 %, les données ne permettent pas de conclure que {h1}.', { h1: C.h1 }), [
      [t('Les deux variables sont indépendantes : le test l\'a prouvé.'), 'p_accept_h0'],
      [t('La probabilité que les variables soient indépendantes est supérieure à 95 %.'), 'p_pvalue_h0'],
      [t('On rejetterait l\'indépendance au niveau 1 %.'), 'p_reject_10_5'],
    ]);
  }
  return interp(rng, t('Les données contredisent {h0} au niveau {a} % : {h1}.', { h0: C.h0, a: d.region === 'one' ? '1' : '5', h1: C.h1 }), [
    [C.cause, 'p_corr_causal'],
    [t('Le lien est fort et important en pratique, puisque le test rejette.'), 'p_significant_large'],
    [t('La probabilité que les variables soient indépendantes est inférieure à 5 %.'), 'p_pvalue_h0'],
  ]);
}

function indItem(level, rng, profile, opts = {}) {
  const d = indData(rng, level);
  if (opts.exam === 'mcq') {
    if (rng.chance(0.5)) {
      return choice({ skill: IND, level: 4, prompt: t('{story} Combien de degrés de liberté a la loi de T sous H₀ ?', { story: indStory(d) }), right: String(d.r),
        wrongs: [{ html: String(d.h * d.k - 1), rule: 'p_chi2_df_indep' }], fillers: [{ html: String(d.h * d.k) }, { html: String(d.n - 1) }, { html: String(d.r + 1) }], key: `mcq:r:${d.N.flat().join('-')}`, exam: examTag(opts) }, rng);
    }
    const e11 = q(d.R[0] * d.Cs[0], d.n);
    return choice({ skill: IND, level: 4, prompt: t('{story} Sous H₀, quel est l\'effectif attendu de la case ({r}, {c}) ?', { story: indStory(d), r: d.C.rows[0], c: d.C.cols[0] }), right: qs(e11, 2),
      wrongs: [{ html: qs(q(d.n, d.h * d.k), 2), rule: 'p_chi2_expected_uniform' }], fillers: [{ html: String(d.N[0][0]) }, { html: qs(q(d.R[0], d.k), 2) }, { html: qs(e11.add(1), 2) }], key: `mcq:e:${d.N.flat().join('-')}`, exam: examTag(opts) }, rng);
  }
  if (opts.exam === 'tf') {
    const kind = rng.pick(['df', 'cause', 'e']);
    if (kind === 'cause') return vf({ skill: IND, statement: t('Rejeter l\'indépendance dans un test χ² montre un lien de cause à effet entre les deux variables.'), truth: false, rule: 'p_corr_causal', explanation: t('Le test montre une association ; elle peut venir d\'une cause commune ou du sens inverse.'), key: 'cause', opts }, rng);
    if (kind === 'e') return tf({ skill: IND, key: 'e', exam: examTag(opts), truth: true, statement: t('Sous l\'hypothèse d\'indépendance, l\'effectif attendu de la case (i, j) vaut (total de la ligne i × total de la colonne j)/n.'), explanation: t('Pr(ligne i et colonne j) = Pr(ligne i)·Pr(colonne j), estimées par les marges.') });
    return tf({ skill: IND, key: 'df', exam: examTag(opts), truth: false, ruleIfTrue: 'p_chi2_df_indep',
      statement: t('Pour un tableau de contingence à h lignes et k colonnes, le test χ² d\'indépendance a h·k − 1 degrés de liberté.'),
      explanation: t('r = (h − 1)(k − 1) : les marges sont estimées.'),
      counter: numCounter({ vars: [{ v: 'h', label: t('h (lignes) ='), dom: 'N' }, { v: 'k', label: t('k (colonnes) ='), dom: 'N' }], hyp: 'h≥2∧k≥2', pred: '(h-1)(k-1)=h×k-1', answer: { h: '2', k: '2' } }) });
  }
  const parts = indParts(d);
  const o = {
    skill: IND, level, key: `${level}:${d.N.flat().join('-')}`, prompt: indStory(d), parts,
    hints: H(t('eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1).'),
      `e₁₁ = ${d.R[0]} · ${d.Cs[0]}/□`, `e₁₁ = ${qs(q(d.R[0] * d.Cs[0], d.n), 2)}, T = ${r2(d.T.valueOf())}, r = ${d.r}`),
    subgoals: IND_SUB, exam: examTag(opts), fallback: d.fallback, interpret: indInterp(rng, d),
  };
  if (opts.exam === 'coef') return coefItem({ ...o, part: parts[1], prompt: t('{story} Calcule la statistique T (à 0,01 près).', { story: indStory(d) }) });
  if (opts.exam === 'open') return openItem(o, 10, rng);
  return statItem(o);
}

// ======================================================================
// p-test-chi2-var (EE-209)
// ======================================================================

const VAR = 'p-test-chi2-var';
const VAR_SUB = [
  { id: 'chi', label: t('loi χ²'), skill: 'p-family' },
  { id: 'test', label: t('test et IC'), skill: VAR },
];
const lowQ = (r) => roundTo(chi2Inv(0.025, r), 3);
const highQ = (r) => roundTo(chi2Inv(0.975, r), 3);

function varData(rng) {
  for (let tries = 0; tries < 300; tries++) {
    const n = rng.pick([6, 11, 16, 21]);
    const r = n - 1;
    const s0 = rng.pick([2, 4, 5, 8, 10, 20]);
    const s2 = rng.int(Math.max(1, Math.round(s0 / 2)), 2 * s0);
    const T = q(r * s2, s0);
    if (T.d > 10 && !(q(T.n * 100, T.d).isInt())) continue;
    if (Math.abs(T.valueOf() - chi(r, 5)) < 0.5 || s2 === s0) continue;
    return { n, r, s0, s2, T, what: rng.pick([t('Diamètre de pièces usinées'), t('Masse de comprimés'), t('Temps de réaction de conducteurs'), t('Épaisseur de plaques de verre')]) };
  }
  return { n: 11, r: 10, s0: 10, s2: 15, T: q(15), what: t('Diamètre de pièces usinées'), fallback: true };
}

function varItem(level, rng, profile, opts = {}) {
  const d = varData(rng);
  const { n, r, s0, s2 } = d;
  const Tv = d.T.valueOf();
  const c5 = chi(r, 5);
  const lo = (r * s2) / highQ(r);
  const hi = (r * s2) / lowQ(r);
  const reject = Tv > c5;
  const story = t('{what} (données normales, moyenne inconnue) : n = {n} mesures, variance empirique s² = {s2}. On teste H₀ : σ² = {s0} contre H₁ : σ² > {s0} au niveau 5 %, puis on donne l\'IC à 95 % pour σ². Quantiles fournis : χ²({r}) a pour quantiles d\'ordre 0,025 et 0,975 les nombres {lo} et {hi} ; le seuil à 5 % (queue supérieure) est dans la Table 4.', { what: d.what, n, s2, s0, r, lo: r2(lowQ(r), 3), hi: r2(highQ(r), 3) });
  if (opts.exam === 'mcq') {
    return choice({ skill: VAR, level: 4, prompt: t('Données normales, n = {n}, s² = {s2}. Pour tester H₀ : σ² = {s0}, que vaut la statistique T ?', { n, s2, s0 }), right: r2(Tv),
      wrongs: [{ html: r2((n * s2) / s0), rule: 'p_chi2_var_n' }, { html: r2((r * s0) / s2), rule: 'p_chi2_var_inverted' }],
      fillers: [{ html: r2(s2 / s0) }, { html: r2(Tv + r) }], key: `mcq:${n}:${s2}:${s0}`, exam: examTag(opts) }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) {
      return tf({ skill: VAR, key: 'hi', exam: examTag(opts), truth: true, statement: t('La borne supérieure de l\'IC à 95 % pour σ² est (n − 1)s² divisé par le petit quantile (d\'ordre 0,025) du χ²(n − 1).'), explanation: t('Diviser par le petit quantile donne la grande borne.') });
    }
    return tf({ skill: VAR, key: `T${n}:${s2}:${s0}`, exam: examTag(opts), truth: false, ruleIfTrue: 'p_chi2_var_n',
      statement: t('Avec n = {n} données normales et s² = {s2}, la statistique du test de H₀ : σ² = {s0} vaut T = n·s²/σ₀² = {v}.', { n, s2, s0, v: r2((n * s2) / s0) }),
      explanation: t('Avec s² (diviseur n − 1), le pivot est (n − 1)s²/σ₀² = {v}.', { v: r2(Tv) }),
      counter: numCounter({ vars: [{ v: 'T', label: t('La vraie valeur de T =') }], hyp: `T=${qt(d.T)}`, pred: `T=${qt(q(n * s2, s0))}`, answer: { T: qt(d.T) } }) });
  }
  const parts = [
    {
      label: 'T', name: 'T', kind: 'stat', decimals: 2, expect: qt(d.T), action: t('Calculer T = (n − 1)s²/σ₀²'),
      traps: { p_chi2_var_n: [qt(q(n * s2, s0))], p_chi2_var_inverted: [qt(q(r * s0, s2))] },
      wrongActions: [
        { label: t('Calculer n·s²/σ₀²'), rule: 'p_chi2_var_n', why: t('Avec s² (diviseur n − 1), le pivot est (n − 1)s²/σ₀².') },
        { label: t('Calculer (n − 1)σ₀²/s²'), rule: 'p_chi2_var_inverted', why: t('Le pivot met la variance observée au numérateur.') },
      ],
      lines: [
        { math: `(${n}-1)×${s2}/${s0}`, note: 'Pivot (n − 1)S²/σ₀²', subgoal: 'test', blank: [`${s2}/${s0}`] },
        { math: rl(Tv, 2), note: t('Statistique observée'), blank: [rl(Tv, 2)] },
      ],
    },
    {
      label: 'r', name: 'r', kind: 'prob', expect: String(r), action: t('Degrés de liberté : n − 1'),
      lines: [{ math: String(r), note: t('Loi χ²(n − 1) sous H₀'), subgoal: 'chi', blank: [String(r)] }],
    },
    {
      label: 's₅', name: 's', kind: 'stat', decimals: 3, expect: '#chi($r,5)', action: t('Lire le seuil à 5 % (queue supérieure)'), title: t('Seuil à 5 % (Table 4, queue supérieure)'),
      lines: [{ math: rl(c5, 3), note: `Table 4, r = ${r}`, blank: [rl(c5, 3)] }],
    },
    {
      label: 'σ²_min', name: 'lo', kind: 'stat', decimals: 2, expect: `${r}×${s2}/${highQ(r)}`, action: t('Borne inférieure : diviser par le grand quantile'), title: t('IC à 95 % pour σ² : borne inférieure'),
      decisions: [{ prompt: t('Décision au niveau 5 % ?'), options: [
        { id: 'rej', label: t('Rejeter H₀ : T = {T} > {c}', { T: r2(Tv), c: r2(c5, 3) }), valid: reject, why: t('T = {T} ≤ {c} : on ne rejette pas H₀.', { T: r2(Tv), c: r2(c5, 3) }), rule: reject ? undefined : 'p_pvalue_alpha_compare' },
        { id: 'keep', label: t('Ne pas rejeter H₀ : T = {T} ≤ {c}', { T: r2(Tv), c: r2(c5, 3) }), valid: !reject, why: t('T = {T} > {c} : on rejette H₀.', { T: r2(Tv), c: r2(c5, 3) }), rule: reject ? 'p_pvalue_alpha_compare' : undefined },
      ] }],
      traps: { p_chi2_ci_swapped: [qt(q(Math.round(hi * 1e6), 1e6))] },
      wrongActions: [{ label: t('Diviser par le petit quantile'), rule: 'p_chi2_ci_swapped', why: t('Diviser par le grand quantile donne la petite borne.') }],
      lines: [
        { math: `${r}×${s2}/${rl(highQ(r), 3)}`, note: t('(n − 1)s² divisé par le grand quantile'), subgoal: 'test', blank: [rl(highQ(r), 3)] },
        { math: rl(lo, 2), note: t('Borne inférieure'), blank: [rl(lo, 2)] },
      ],
    },
    {
      label: 'σ²_max', name: 'hi', kind: 'stat', decimals: 2, expect: `${r}×${s2}/${lowQ(r)}`, action: t('Borne supérieure : diviser par le petit quantile'), title: t('Borne supérieure'),
      traps: { p_chi2_ci_swapped: [qt(q(Math.round(lo * 1e6), 1e6))] },
      lines: [
        { math: `${r}×${s2}/${rl(lowQ(r), 3)}`, note: t('(n − 1)s² divisé par le petit quantile'), subgoal: 'test', blank: [rl(lowQ(r), 3)] },
        { math: rl(hi, 2), note: t('Borne supérieure'), blank: [rl(hi, 2)] },
      ],
    },
  ];
  const interpret = reject
    ? interp(rng, t('Au niveau 5 %, les données indiquent que σ² > {s0}.', { s0 }), [
      [t('σ² est dans [{lo} ; {hi}] avec probabilité 0,95.', { lo: r2(lo), hi: r2(hi) }), 'p_ci_prob'],
      [t('La probabilité que σ² = {s0} est inférieure à 5 %.', { s0 }), 'p_pvalue_h0'],
      [t('95 % des mesures ont une variance dans l\'IC.'), 'p_ci_data'],
    ])
    : interp(rng, t('Les données ne permettent pas de conclure que σ² > {s0} au niveau 5 %.', { s0 }), [
      [t('σ² = {s0} est démontré.', { s0 }), 'p_accept_h0'],
      [t('σ² est dans [{lo} ; {hi}] avec probabilité 0,95.', { lo: r2(lo), hi: r2(hi) }), 'p_ci_prob'],
      [t('La probabilité que σ² = {s0} est supérieure à 95 %.', { s0 }), 'p_pvalue_h0'],
    ]);
  return statItem({
    skill: VAR, level, key: `${level}:${n}:${s2}:${s0}`, prompt: story, parts,
    hints: H(t('(n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l\'IC, le grand quantile donne la petite borne.'), `T = ${r} · ${s2}/□`, t('T = {T} ; IC = [{lo} ; {hi}]', { T: r2(Tv), lo: r2(lo), hi: r2(hi) })),
    subgoals: VAR_SUB, exam: examTag(opts), fallback: d.fallback, interpret,
  });
}

export const GEN = {
  [GOF]: gofItem,
  [IND]: indItem,
  [VAR]: varItem,
  ...INTERP,
  ...REG,
  ...BAYES,
};
void sum; void qs;

// Generators of module P, part e: Bayesian statistics (EE-209, no
// calculator: fractions with small denominators). p-bayes-beta (Beta-
// Bernoulli), p-bayes-gauss (normal-normal, precisions), p-bayes-conjugate
// (conjugate laws, Dirichlet-multinomial).

import { choice, tf, numCounter, H, examTag } from './proba-kit.js';
import { statItem, coefItem, openItem, q, qt, qs, interp, vf } from './proba-e-kit.js';
import { fact } from '../../cas/stats.js';

const neg = (x) => qs(x).replace('−', '-');

// ======================================================================
// p-bayes-beta
// ======================================================================

const BB = 'p-bayes-beta';
const BB_SUB = [
  { id: 'fam', label: 'loi Beta', skill: 'p-family' },
  { id: 'upd', label: 'mise à jour', skill: BB },
  { id: 'mle', label: 'MLE', skill: 'p-mle' },
];
const BB_CTX = [
  (n, N) => `Un joueur de basket réussit ${N} tirs sur ${n}`,
  (n, N) => `Une publicité est cliquée ${N} fois sur ${n} affichages`,
  (n, N) => `Une pièce donne ${N} piles sur ${n} lancers`,
  (n, N) => `Un capteur détecte l'objet ${N} fois sur ${n} essais`,
];

function bbData(rng) {
  for (let t = 0; t < 300; t++) {
    const a = rng.int(1, 5);
    const b = rng.int(1, 5);
    const n = rng.int(2, 20);
    const N = rng.int(0, n);
    const A = a + N;
    const B = b + n - N;
    if (A < 2 || B < 2 || A + B > 30) continue;
    const pm = q(A, A + B);
    const map = q(A - 1, A + B - 2);
    if (pm.eq(map) || (N === n - N && a === b)) continue;
    return { a, b, n, N, A, B, pm, map, v: pm.mul(q(1).sub(pm)).div(1 + A + B), ctx: rng.pick(BB_CTX) };
  }
  return { a: 2, b: 2, n: 10, N: 7, A: 9, B: 5, pm: q(9, 14), map: q(2, 3), v: q(3, 196), ctx: BB_CTX[0], fallback: true };
}
const prior = (d) => (d.a === 1 && d.b === 1 ? 'uniforme, Beta(1, 1)' : `Beta(${d.a}, ${d.b})`);

function bbItem(level, rng, profile, opts = {}) {
  const d = bbData(rng);
  const story = `${d.ctx(d.n, d.N)}. A priori, la probabilité de succès θ suit une loi ${prior(d)} ; les essais sont indépendants.`;
  if (opts.exam === 'mcq') {
    if (rng.chance(0.5)) {
      return choice({ skill: BB, level: 4, prompt: `${story} Quelle est la loi a posteriori de θ ?`, right: `Beta(${d.A}, ${d.B})`,
        wrongs: [{ html: `Beta(${d.N}, ${d.n - d.N})`, rule: 'p_beta_prior_not_added' }, { html: `Beta(${d.B}, ${d.A})`, rule: 'p_beta_swap' }, { html: `Beta(${d.a + d.N}, ${d.b})` }],
        fillers: [{ html: `Beta(${d.A + 1}, ${d.B})` }], key: `mcq:post:${d.a}:${d.b}:${d.n}:${d.N}`, exam: examTag(opts) }, rng);
    }
    const pair = (x, y) => `PM = ${qs(x)} ; MAP = ${qs(y)}`;
    return choice({ skill: BB, level: 4, prompt: `${story} Moyenne a posteriori (PM) et mode a posteriori (MAP) de θ ?`, right: pair(d.pm, d.map),
      wrongs: [{ html: pair(d.map, d.pm), rule: 'p_map_pm_confused' }, { html: pair(d.pm, d.pm), rule: 'p_map_pm_confused' }, { html: pair(d.map, d.map), rule: 'p_map_pm_confused' }],
      key: `mcq:pm:${d.a}:${d.b}:${d.n}:${d.N}`, exam: examTag(opts) }, rng);
  }
  if (opts.exam === 'tf') {
    const k = rng.pick(['map', 'between', 'pm']);
    if (k === 'map') return tf({ skill: BB, key: k, exam: examTag(opts), truth: true, statement: 'Avec un a priori uniforme Beta(1, 1), le MAP du modèle Beta-Bernoulli est égal au MLE N/n.', explanation: 'MAP = (1 + N − 1)/(2 + n − 2) = N/n.' });
    if (k === 'between') return tf({ skill: BB, key: k, exam: examTag(opts), truth: true, statement: 'Dans le modèle Beta-Bernoulli, la moyenne a posteriori est entre la moyenne a priori α/(α + β) et le MLE N/n.', explanation: 'PM = (α + N)/(α + β + n) est une moyenne pondérée des deux.' });
    return tf({ skill: BB, key: k, exam: examTag(opts), truth: false, ruleIfTrue: 'p_map_pm_confused', statement: 'Avec un a priori uniforme, la moyenne a posteriori (N + 1)/(n + 2) est égale au MLE N/n.',
      explanation: 'C\'est le MAP qui vaut N/n ; la PM est tirée vers 1/2. Par exemple N = 3, n = 4 : PM = 2/3, MLE = 3/4.',
      counter: numCounter({ vars: [{ v: 'N', label: 'N (succès) =', dom: 'N' }, { v: 'n', label: 'n (essais) =', dom: 'N*' }], hyp: 'N≤n', pred: '(N+1)/(n+2)=N/n', answer: { N: '3', n: '4' } }) });
  }
  const mode = level === 5;
  const parts = [
    {
      label: 'α′', name: 'A', kind: 'prob', expect: String(d.A), action: 'Ajouter les succès au premier paramètre',
      traps: { p_beta_prior_not_added: [String(d.N)], p_beta_swap: [String(d.a + d.n - d.N)] },
      wrongActions: [{ label: 'Ajouter les échecs au premier paramètre', rule: 'p_beta_swap', why: 'Les succès s\'ajoutent au premier paramètre : Beta(α + N, β + n − N).' }],
      decisions: [{ prompt: 'Quelle famille pour la loi a posteriori ?', levels: [1, 2], options: [
        { id: 'beta', label: 'Beta : la loi Beta est conjuguée au modèle de Bernoulli', valid: true },
        { id: 'binom', label: 'Binomiale, comme les données', valid: false, why: 'θ est une probabilité dans [0 ; 1] : sa loi est continue. A posteriori ∝ θ^N(1 − θ)^(n−N) × noyau Beta : encore une Beta.' },
      ] }],
      lines: [{ math: `${d.a}+${d.N}`, note: 'α′ = α + N (succès)', subgoal: 'upd', blank: [String(d.N)] }, { math: String(d.A), blank: [String(d.A)] }],
    },
    {
      label: 'β′', name: 'B', kind: 'prob', expect: String(d.B), action: 'Ajouter les échecs au second paramètre',
      traps: { p_beta_prior_not_added: [String(d.n - d.N)], p_beta_swap: [String(d.b + d.N)] },
      lines: [{ math: `${d.b}+${d.n}-${d.N}`, note: 'β′ = β + n − N (échecs)', subgoal: 'upd', blank: [`${d.n}-${d.N}`] }, { math: String(d.B), blank: [String(d.B)] }],
    },
    {
      label: 'PM', name: 'pm', kind: 'prob', expect: '$A/($A+$B)', action: 'Moyenne a posteriori α′/(α′ + β′)',
      traps: { p_map_pm_confused: [qt(d.map)] },
      wrongActions: [{ label: 'PM = (α′ − 1)/(α′ + β′ − 2)', rule: 'p_map_pm_confused', why: 'C\'est la formule du MAP (le mode).' }],
      lines: [{ math: `${d.A}/(${d.A}+${d.B})`, note: 'Moyenne d\'une Beta(α′, β′)', subgoal: 'fam', blank: [String(d.B)] }, { math: `${d.A}/${d.A + d.B}` }], value: qt(d.pm),
    },
    {
      label: 'MAP', name: 'map', kind: 'prob', expect: '($A-1)/($A+$B-2)', action: 'Mode a posteriori (α′ − 1)/(α′ + β′ − 2)',
      traps: { p_map_pm_confused: [qt(d.pm)] },
      lines: [{ math: `(${d.A}-1)/(${d.A}+${d.B}-2)`, note: 'Mode d\'une Beta', subgoal: 'fam', blank: [`${d.A}-1`] }, { math: `${d.A - 1}/${d.A + d.B - 2}` }], value: qt(d.map),
    },
  ];
  if (level === 4 || mode) {
    parts.push({ label: 'Var', name: 'v', kind: 'prob', expect: '$pm×(1-$pm)/(1+$A+$B)', action: 'Variance a posteriori',
      lines: [{ math: `${qt(d.pm)}×(1-${qt(d.pm)})/(1+${d.A}+${d.B})`, note: 'PM(1 − PM)/(1 + α′ + β′)', subgoal: 'upd' }, { math: qt(d.v) }] });
  }
  if (mode) {
    parts.push({ label: 'MLE', name: 'mle', kind: 'prob', expect: `${d.N}/${d.n}`, title: 'Comparer : le MLE N/n', lines: [{ math: `${d.N}/${d.n}`, note: 'Le MLE ignore l\'a priori', subgoal: 'mle' }, ], value: qt(q(d.N, d.n)) });
  }
  return statItem({
    skill: BB, level, key: `${level}:${d.a}:${d.b}:${d.n}:${d.N}`,
    prompt: `${story} Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP)${level >= 4 ? ', puis sa variance' : ''}${mode ? ', et compare au MLE' : ''}.`,
    parts, hints: H('Les succès s\'ajoutent au premier paramètre, les échecs au second.', `Beta(${d.a} + ${d.N}, ${d.b} + □)`, `Beta(${d.A}, ${d.B}), PM = ${qs(d.pm)}, MAP = ${qs(d.map)}`),
    subgoals: BB_SUB, exam: examTag(opts), fallback: d.fallback,
  });
}

// ======================================================================
// p-bayes-gauss
// ======================================================================

const BG = 'p-bayes-gauss';
const BG_SUB = [{ id: 'prec', label: 'précisions, a posteriori', skill: BG }];
const VARS = [q(1, 4), q(1, 2), q(1), q(2), q(4)];

function bgData(rng) {
  for (let t = 0; t < 300; t++) {
    const tau = rng.pick(VARS);
    const sig = rng.pick(VARS);
    const n = rng.int(1, 6);
    const m0 = q(rng.int(10, 60), 10);
    const xb = q(rng.int(10, 60), 10);
    const p0 = q(1).div(tau);
    const p1 = q(n).div(sig);
    const P = p0.add(p1);
    const post = q(1).div(P);
    const mu = m0.mul(p0).add(xb.mul(p1)).div(P);
    if (m0.eq(xb) || mu.d > 40 || post.d > 40 || p0.eq(p1)) continue;
    return { tau, sig, n, m0, xb, p0, p1, P, post, mu };
  }
  const tau = q(1); const sig = q(1, 2);
  return { tau, sig, n: 1, m0: q(5, 2), xb: q(11, 5), p0: q(1), p1: q(2), P: q(3), post: q(1, 3), mu: q(23, 10), fallback: true };
}
// The smallest n with 1/(1/τ² + n/σ²) < s.
const nMin = (tau, sig, s) => { let n = 0; while (q(1).div(q(1).div(tau).add(q(n).div(sig))).cmp(s) >= 0) n++; return n; };

function bgItem(level, rng, profile, opts = {}) {
  const d = bgData(rng);
  const meas = d.n === 1 ? `une mesure x = ${qs(d.xb)}` : `${d.n} mesures de moyenne x̄ = ${qs(d.xb)}`;
  const story = `A priori θ ~ N(${qs(d.m0)} ; ${qs(d.tau)}). Chaque mesure suit N(θ ; ${qs(d.sig)}), les mesures sont indépendantes. On observe ${meas}.`;
  if (opts.exam === 'mcq' || level === 5) {
    const s = rng.pick([q(1, 10), q(1, 20), q(1, 2), q(1, 4)]);
    const tau = rng.pick(VARS.slice(2));
    const sig = rng.pick(VARS.slice(1));
    const right = nMin(tau, sig, s);
    const noPrior = (() => { let n = 1; while (sig.div(n).cmp(s) >= 0) n++; return n; })();
    const add = (() => { let n = 1; while (tau.add(sig).div(n).cmp(s) >= 0) n++; return n; })();
    if ((right < 2 || noPrior === right) && (opts._retry || 0) < 50) return bgItem(level, rng, profile, { ...opts, _retry: (opts._retry || 0) + 1 });
    const prompt = `A priori θ ~ N(10 ; ${qs(tau)}) ; chaque mesure suit N(θ ; ${qs(sig)}), indépendantes. Nombre minimal n de mesures pour que la variance a posteriori soit < ${qs(s)} ?`;
    if (opts.exam === 'mcq') {
      return choice({ skill: BG, level: 4, prompt, right: String(right),
        wrongs: [{ html: String(noPrior), rule: 'p_precision_n' }, { html: String(right - 1), rule: 'p_precision_n' }, { html: String(add), rule: 'p_gauss_post_var_add' }],
        fillers: [{ html: String(right + 1) }, { html: String(right + 2) }], key: `mcq:n:${qt(tau)}:${qt(sig)}:${qt(s)}`, exam: examTag(opts) }, rng);
    }
    // Level 5: the posterior, then the number of measures.
    return statItem({
      skill: BG, level: 5, key: `5:${qt(d.tau)}:${qt(d.sig)}:${d.n}:${qt(d.m0)}:${qt(d.xb)}:${qt(s)}`,
      prompt: `${story} Donne la loi a posteriori N(μ_post ; σ²_post). Puis, avec le même a priori et le même σ², combien de mesures faut-il au minimum pour que σ²_post < ${qs(s)} ?`,
      parts: [
        ...bgParts(d, 5),
        { label: 'n_min', name: 'nmin', kind: 'prob', expect: String(nMin(d.tau, d.sig, s)), title: `Nombre minimal de mesures pour σ²_post < ${qs(s)}`,
          traps: { p_precision_n: { values: [String((() => { let n = 1; while (d.sig.div(n).cmp(s) >= 0) n++; return n; })())], ctx: {} } },
          lines: [{ math: String(nMin(d.tau, d.sig, s)), note: `1/(${qs(d.p0)} + n/${qs(d.sig)}) < ${qs(s)}`, subgoal: 'prec' }] },
      ],
      hints: [], subgoals: BG_SUB, exam: examTag(opts),
    });
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) return tf({ skill: BG, key: 'lim', exam: examTag(opts), truth: true, statement: 'Dans le modèle gaussien-gaussien, quand le nombre n de mesures tend vers l\'infini, la moyenne a posteriori tend vers x̄.', explanation: 'Le poids des données, n/σ², l\'emporte sur la précision a priori 1/τ².' });
    return vf({ skill: BG, statement: 'Une mesure de plus augmente la variance a posteriori, puisque les variances s\'additionnent.', truth: false, rule: 'p_gauss_post_var_add', explanation: 'Ce sont les précisions qui s\'additionnent : une donnée de plus réduit la variance a posteriori.', key: 'add', opts }, rng);
  }
  return statItem({
    skill: BG, level, key: `${level}:${qt(d.tau)}:${qt(d.sig)}:${d.n}:${qt(d.m0)}:${qt(d.xb)}`,
    prompt: `${story} Donne la loi a posteriori N(μ_post ; σ²_post) de θ.`,
    parts: bgParts(d, level),
    hints: H('Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions.', `σ²_post = 1/(${qs(d.p0)} + □)`, `σ²_post = ${qs(d.post)}, μ_post = ${qs(d.mu)}`),
    subgoals: BG_SUB, exam: examTag(opts), fallback: d.fallback,
  });
}

function bgParts(d) {
  return [
    { label: '1/τ²', name: 'pa', kind: 'prob', expect: qt(d.p0), action: 'Précision a priori 1/τ²', title: 'Précision a priori',
      lines: [{ math: `1/${neg(d.tau)}`, note: 'Inverse de la variance a priori', subgoal: 'prec', blank: [neg(d.tau)] }, ], value: qt(d.p0) },
    { label: 'n/σ²', name: 'pd', kind: 'prob', expect: qt(d.p1), action: 'Précision des données n/σ²', title: 'Précision des données',
      lines: [{ math: `${d.n}/${neg(d.sig)}`, note: 'n mesures de variance σ²', subgoal: 'prec', blank: [String(d.n)] }, ], value: qt(d.p1) },
    { label: 'σ²_post', name: 'post', kind: 'prob', expect: '1/($pa+$pd)', action: 'Additionner les précisions, puis inverser',
      traps: { p_gauss_post_var_add: { values: [qt(d.tau.add(d.sig.div(d.n))), qt(d.tau.add(d.sig))], ctx: {} } },
      wrongActions: [{ label: 'Additionner les variances τ² + σ²/n', rule: 'p_gauss_post_var_add', why: 'Ce sont les précisions qui s\'additionnent.' }],
      lines: [{ math: `1/(${qt(d.p0)}+${qt(d.p1)})`, note: 'Les précisions s\'additionnent', subgoal: 'prec', blank: [qt(d.p1)] }, { math: qt(d.post), blank: [qt(d.post)] }] },
    { label: 'μ_post', name: 'mu', kind: 'prob', expect: `(${qt(d.p0)}×${qt(d.m0)}+${qt(d.p1)}×${qt(d.xb)})/($pa+$pd)`, action: 'Moyenne pondérée par les précisions',
      traps: { p_gauss_posterior_avg: { values: [qt(d.m0.add(d.xb).div(2))], ctx: { a: qs(d.p1), b: qs(d.p0) } } },
      wrongActions: [{ label: 'Moyenne simple de μ₀ et x̄', rule: 'p_gauss_posterior_avg', why: 'Les deux sources n\'ont pas la même précision.' }],
      lines: [
        { math: `(${qt(d.p0)}×${qs(d.m0)}+${qt(d.p1)}×${qs(d.xb)})/(${qt(d.P)})`, note: 'Moyenne pondérée de μ₀ et x̄', subgoal: 'prec', blank: [qs(d.xb)] },
        { math: qs(d.mu).replace('−', '-'), blank: [qs(d.mu).replace('−', '-')] },
      ] },
  ];
}

// ======================================================================
// p-bayes-conjugate
// ======================================================================

const BC = 'p-bayes-conjugate';
const BC_SUB = [
  { id: 'multi', label: 'probabilité multinomiale', skill: 'p-count' },
  { id: 'dir', label: 'mise à jour de Dirichlet', skill: BC },
];
const CATEGORIES = [['rouge', 'vert', 'bleu'], ['A', 'B', 'C'], ['pluie', 'nuages', 'soleil'], ['vélo', 'bus', 'train', 'voiture']];

function bcData(rng) {
  for (let t = 0; t < 300; t++) {
    const names = rng.pick(CATEGORIES);
    const K = names.length;
    const al = Array.from({ length: K }, () => rng.int(1, 3));
    const n = rng.int(5, 12);
    const cut = Array.from({ length: K - 1 }, () => rng.int(0, n)).sort((a, b) => a - b);
    const N = [...cut, n].map((x, i) => x - (i ? [...cut, n][i - 1] : 0));
    if (N[0] === 0) continue;
    const a0 = al.reduce((s, x) => s + x, 0);
    const pm = q(al[0] + N[0], a0 + n);
    const map = q(al[0] + N[0] - 1, a0 + n - K);
    if (pm.eq(map) || pm.eq(q(al[0] + N[0], n))) continue;
    return { names, K, al, n, N, a0, pm, map };
  }
  return { names: CATEGORIES[0], K: 3, al: [1, 1, 1], n: 10, N: [3, 5, 2], a0: 3, pm: q(4, 13), map: q(3, 10), fallback: true };
}
const THETAS = [[q(1, 2), q(1, 4), q(1, 4)], [q(1, 3), q(1, 3), q(1, 3)], [q(1, 2), q(1, 3), q(1, 6)], [q(1, 4), q(1, 4), q(1, 4), q(1, 4)]];

function multiData(rng) {
  const th = rng.pick(THETAS);
  const K = th.length;
  for (;;) {
    const N = Array.from({ length: K }, () => rng.int(0, 2));
    const n = N.reduce((s, x) => s + x, 0);
    if (n < 3 || n > 5) continue;
    const coef = fact(n) / N.reduce((p, x) => p * fact(x), 1);
    if (coef === 1) continue;
    const prod = N.reduce((p, x, i) => p.mul(th[i].pow(x)), q(1));
    return { th, K, N, n, coef, prod, P: prod.mul(coef) };
  }
}

function bcItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') {
    const k = rng.pick(['beta', 'pm', 'gauss']);
    if (k === 'beta') return tf({ skill: BC, key: k, exam: examTag(opts), truth: true, statement: 'La loi Beta est conjuguée au modèle de Bernoulli.', explanation: 'A priori Beta, vraisemblance θ^N(1 − θ)^(n−N) : a posteriori Beta.' });
    if (k === 'gauss') return tf({ skill: BC, key: k, exam: examTag(opts), truth: true, statement: 'Pour la moyenne θ d\'une loi normale de variance connue, un a priori normal est conjugué.', explanation: 'L\'a posteriori est encore normal (modèle gaussien-gaussien).' });
    return tf({ skill: BC, key: k, exam: examTag(opts), truth: false, ruleIfTrue: 'p_map_pm_confused', statement: 'Avec un a priori uniforme Dir(1, 1, 1), la moyenne a posteriori de θ₁ est égale au MLE N₁/n.',
      explanation: 'PM₁ = (1 + N₁)/(3 + n) ; c\'est le MAP qui vaut N₁/n. Par exemple N₁ = 3, n = 10 : 4/13 ≠ 3/10.',
      counter: numCounter({ vars: [{ v: 'N', label: 'N₁ =', dom: 'N' }, { v: 'n', label: 'n =', dom: 'N*' }], hyp: 'N≤n', pred: '(N+1)/(n+3)=N/n', answer: { N: '3', n: '10' } }) });
  }
  if (level === 1 || (opts.exam === 'mcq' && rng.chance(0.4))) return multiItem(level, rng, opts);
  const d = bcData(rng);
  const story = `${d.K} catégories : ${d.names.join(', ')}. A priori, θ = (${d.names.map((_, i) => `θ${'₁₂₃₄'[i]}`).join(', ')}) suit une loi de Dirichlet Dir(${d.al.join(', ')}). On observe les comptes (${d.N.join(', ')}) sur n = ${d.n} tirages indépendants.`;
  if (opts.exam === 'mcq') {
    return choice({ skill: BC, level: 4, prompt: `${story} Moyenne a posteriori de θ₁ ?`, right: qs(d.pm),
      wrongs: [{ html: qs(q(d.al[0] + d.N[0], d.n)), rule: 'p_dirichlet_alpha0' }, { html: qs(d.map), rule: 'p_map_pm_confused' }, { html: qs(q(d.N[0], d.n)) }],
      fillers: [{ html: qs(q(d.al[0], d.a0)) }], key: `mcq:${d.al.join('-')}:${d.N.join('-')}`, exam: examTag(opts) }, rng);
  }
  const parts = [
    { label: 'α′₁', name: 'A', kind: 'prob', expect: String(d.al[0] + d.N[0]), action: 'Ajouter chaque compte à son paramètre',
      decisions: [{ prompt: 'Quelle loi a posteriori ?', levels: [2, 3], options: [
        { id: 'dir', label: 'Dirichlet : on ajoute les comptes aux paramètres (loi conjuguée)', valid: true },
        { id: 'mult', label: 'Multinomiale, comme les données', valid: false, why: 'θ est un vecteur de probabilités : la Dirichlet est conjuguée à la multinomiale.' },
      ] }],
      // Shown only when guided: it would give the answer away.
      notes: level > 2 ? [] : [`A posteriori : Dir(${d.al.map((a, i) => a + d.N[i]).join(', ')}).`],
      lines: [{ math: `${d.al[0]}+${d.N[0]}`, note: 'α₁ + N₁', subgoal: 'dir', blank: [String(d.N[0])] }, { math: String(d.al[0] + d.N[0]) }] },
    { label: 'α₀+n', name: 'T', kind: 'prob', expect: String(d.a0 + d.n), action: 'Total des paramètres a posteriori α₀ + n',
      lines: [{ math: `${d.a0}+${d.n}`, note: `α₀ = ${d.al.join(' + ')}`, subgoal: 'dir', blank: [String(d.n)] }, { math: String(d.a0 + d.n) }] },
    { label: 'PM₁', name: 'pm', kind: 'prob', expect: '$A/$T', action: 'PM₁ = (α₁ + N₁)/(α₀ + n)',
      traps: { p_dirichlet_alpha0: { values: [qt(q(d.al[0] + d.N[0], d.n))], ctx: { v: d.a0 + d.n } }, p_map_pm_confused: [qt(d.map)] },
      wrongActions: [{ label: 'Diviser par n seulement', rule: 'p_dirichlet_alpha0', why: 'La PM divise par la somme de tous les paramètres a posteriori, α₀ + n.' }],
      lines: [{ math: `${d.al[0] + d.N[0]}/${d.a0 + d.n}`, note: 'Moyenne a posteriori', subgoal: 'dir', blank: [String(d.a0 + d.n)] }, ], value: qt(d.pm) },
    { label: 'MAP₁', name: 'map', kind: 'prob', expect: `($A-1)/($T-${d.K})`, action: 'MAP₁ = (α₁ + N₁ − 1)/(α₀ + n − K)',
      traps: { p_map_pm_confused: [qt(d.pm)] },
      lines: [{ math: `(${d.al[0] + d.N[0]}-1)/(${d.a0 + d.n}-${d.K})`, note: 'Mode a posteriori', subgoal: 'dir', blank: [String(d.K)] }, { math: `${d.al[0] + d.N[0] - 1}/${d.a0 + d.n - d.K}` }], value: qt(d.map) },
  ];
  return statItem({
    skill: BC, level, key: `${level}:${d.al.join('-')}:${d.N.join('-')}`, prompt: `${story} Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.`,
    parts, hints: H('Chaque compte s\'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori.', `PM₁ = (${d.al[0]} + ${d.N[0]})/(${d.a0} + □)`, `PM₁ = ${qs(d.pm)}, MAP₁ = ${qs(d.map)}`),
    subgoals: BC_SUB, exam: examTag(opts), fallback: d.fallback,
  });
}

// The multinomial probability (level 1, and an exam choice).
// Quarters and halves stay fractions (3/16 reads better than 0,1875).
const qf = (x) => (x.d === 1 ? String(x.n) : `${x.n}/${x.d}`).replace('-', '−');
function multiItem(level, rng, opts) {
  const m = multiData(rng);
  const story = `Une expérience a ${m.K} issues de probabilités (${m.th.map(qf).join(' ; ')}). On la répète n = ${m.n} fois, indépendamment. Probabilité d'obtenir les comptes (${m.N.join(', ')}) ?`;
  if (opts.exam === 'mcq') {
    return choice({ skill: BC, level: 4, prompt: story, right: qf(m.P), wrongs: [{ html: qf(m.prod), rule: 'p_multinomial_no_coef' }],
      fillers: [{ html: qf(m.P.mul(2).cmp(1) < 0 ? m.P.mul(2) : m.P.div(3)) }, { html: qf(m.prod.mul(m.n)) }], key: `mcq:multi:${m.N.join('-')}:${m.th.map(qt).join('-')}`, exam: examTag(opts) }, rng);
  }
  const fac = `${m.n}!/(${m.N.map((x) => `${x}!`).join('×')})`;
  const pw = m.N.map((x, i) => (x ? `(${qt(m.th[i])})^${x}` : '')).filter(Boolean).join('×');
  return statItem({
    skill: BC, level, key: `${level}:multi:${m.N.join('-')}:${m.th.map(qt).join('-')}`, prompt: story,
    parts: [
      { label: 'coef', name: 'c', kind: 'prob', expect: String(m.coef), title: 'Nombre d\'ordres possibles', action: 'Coefficient multinomial n!/(N₁!···N_K!)',
        lines: [{ math: fac, note: 'Ordres possibles des issues', subgoal: 'multi', blank: [`${m.n}!`] }, { math: String(m.coef), blank: [String(m.coef)] }] },
      { label: 'Pr', name: 'P', kind: 'prob', expect: `$c×${qt(m.prod)}`, action: 'Multiplier par Π θₖ^(Nₖ)',
        traps: { p_multinomial_no_coef: { values: [qt(m.prod)], ctx: { c: m.coef } } },
        wrongActions: [{ label: 'Prendre seulement Π θₖ^(Nₖ)', rule: 'p_multinomial_no_coef', why: 'Il faut compter tous les ordres possibles.' }],
        lines: [{ math: `${m.coef}×${pw}`, note: 'Coefficient × produit des probabilités', subgoal: 'multi', blank: [String(m.coef)] }, { math: qt(m.P), blank: [qt(m.P)] }] },
    ],
    hints: H('Une suite précise a la probabilité Π θₖ^(Nₖ) ; il y a n!/(N₁!···N_K!) suites.', `${fac} × □`, qf(m.P)),
    subgoals: BC_SUB, exam: examTag(opts),
  });
}

export const GEN = { [BB]: bbItem, [BG]: bgItem, [BC]: bcItem };
void interp;

// n-heat-implicit and n-pde-cfl (module N, part h, step U9). Catalogue:
// docs/universite/N-analyse-numerique.md, n-heat-implicit, n-pde-cfl, exam
// example 1.
//
// n-heat-implicit: the program heat_implicit of the exams 2019 and 2022
// (backward Euler + centred differences + Thomas), with u(x, 0) =
// sin(kπx), k ∈ {1, 2}. L1 the line b[i] = ??? (or a[i] = 1 + ???) as a
// choice; L2 one typed hole of A; L3 lines: the point of the equation
// (decision), then the coefficients of A and u¹ for N = 2, τ/h² ∈ {1, 1/2};
// L4 the holes that fill the system, then the error table; L5 the whole
// program, then the error table (tables A of exam example 1 for k = 2).
// Exam: mcq (a line of the program, the order table, the stability table,
// the explicit scheme for contrast).
//
// n-pde-cfl: the program transport (exam 2019, exam2.m) and the wave
// scheme. L1 the line unew[i] = ??? as a choice; L2 λ = τ²/h² and the
// first wave step (guided values); L3 the side of the upwind scheme
// (decision), then uᵢⁿ⁺¹; L4 the maximum principle in blocks; L5 the
// program, then its error table. Exam: mcq.

import { mcq, blocksItem, examTag } from './kit.js';
import { partsItem } from './geo-kit.js';
import { refCode, codeItem, codeMcq, readtableItem, multiMcq, tableHtml } from './numerique-kit.js';
import { q, qt, fq, H, menuOf, opts4, pyValue, pyNum, eText , withThen } from './numerique-h-kit.js';
import { t } from '../../i18n.js';

const HT = 'n-heat-implicit';
const CF = 'n-pde-cfl';

// ======================================================================
// n-heat-implicit
// ======================================================================

const HT_SUB = [
  { id: 'scheme', label: t('le schéma au point (xᵢ, tₙ₊₁)'), skill: HT },
  { id: 'matrix', label: t('la matrice A'), skill: HT },
  { id: 'ic', label: t('la condition initiale'), skill: HT },
  { id: 'order', label: t('l\'ordre O(h² + τ)'), skill: HT },
  { id: 'stability', label: t('stabilité'), skill: 'n-ode-stability' },
  { id: 'thomas', label: t('LU tridiagonale'), skill: 'n-thomas' },
  { id: 'bvp', label: t('la matrice de −u″'), skill: 'n-bvp-fd' },
];

const sinT = (k) => (k === 1 ? 'math.sin(math.pi * (i + 1) * h)' : `math.sin(${k} * math.pi * (i + 1) * h)`);
function heatProgram(k) {
  const ex = k === 1 ? 'math.exp(-math.pi * math.pi * t)' : `math.exp(-${k * k} * math.pi * math.pi * t)`;
  return refCode(`def heat_implicit(N, M, tau):
    # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
    h = 1 / (N + 1)
    t = 0.0
    a = zeros(N)
    b = zeros(N)
    c = zeros(N - 1)
    d = zeros(N - 1)
    for i in range(N):
        b[i] = «${sinT(k)}»
    for i in range(N):
        a[i] = 1 + «2 * tau / (h * h)»
    for i in range(N - 1):
        d[i] = -«tau / (h * h)»
        c[i] = -«tau / (h * h)»
    # A = LU (voir n-thomas)
    c[0] = c[0] / «a[0]»
    for i in range(1, N - 1):
        a[i] = a[i] - «d[i - 1] * c[i - 1]»
        c[i] = c[i] / «a[i]»
    a[N - 1] = a[N - 1] - «d[N - 2] * c[N - 2]»
    for n in range(M):
        t = t + tau
        b[0] = b[0] / «a[0]»
        for i in range(N - 1):
            b[i + 1] = (b[i + 1] - «d[i] * b[i]») / a[i + 1]
        for i in range(N - 2, -1, -1):
            b[i] = b[i] - «c[i] * b[i + 1]»
    err = 0.0
    for i in range(N):
        err = max(err, abs(b[i] - ${ex} * ${sinT(k)}))
    return err
`);
}
function heatTraps(k) {
  return {
    0: [{ text: `tau * ${sinT(k)}`, rule: 'n_heat_ic_tau' }, { text: `tau / (h * h) * ${sinT(k)}`, rule: 'n_heat_ic_tau' }, { text: '0' }],
    1: [{ text: 'tau / (h * h)', rule: 'n_heat_2tau' }, { text: '2 * tau', rule: 'n_heat_tau_h' }, { text: 'tau' }],
    2: [{ text: 'tau', rule: 'n_heat_tau_h' }, { text: '2 * tau / (h * h)', rule: 'n_heat_2tau' }],
    3: [{ text: 'tau', rule: 'n_heat_tau_h' }],
    5: [{ text: 'd[i] * c[i]', rule: 'n_thomas_index_shift' }, { text: 'b[i - 1] * c[i - 1]' }, { text: 'b[i - 1] * d[i - 1]' }],
    7: [{ text: '0', rule: 'n_thomas_forget_last' }],
    9: [{ text: 'c[i] * b[i]', rule: 'n_thomas_lu_roles' }, { text: 'd[i] * c[i]' }],
    10: [{ text: 'd[i] * b[i + 1]', rule: 'n_thomas_lu_roles' }, { text: 'c[i] * d[i]' }],
  };
}
const HT_WRONG = { 4: 'c[0]', 6: 'c[i]', 8: 'b[0]' };

// Tables (recomputed with the reference program; see the test file).
const ORDER_RUNS = { 1: [[9, 10, '0.01'], [19, 40, '0.0025'], [39, 160, '0.000625'], [79, 640, '0.00015625']], 2: [[9, 10, '0.005'], [19, 40, '0.00125'], [39, 160, '0.0003125'], [79, 640, '0.000078125']] };
const STAB_RUNS = { 1: [[9, 1000, '0.01'], [19, 1000, '0.1'], [39, 1000, '1']], 2: [[9, 200, '0.01'], [9, 200, '0.1'], [19, 200, '0.01'], [19, 200, '0.1'], [39, 200, '1']] };
const HCACHE = new Map();
function heatData(k) {
  if (!HCACHE.has(k)) {
    const R = heatProgram(k);
    // The exam runs keep τ/h² = 1 ; (9, 20, 0,005) has τ/h² = 1/2, so
    // that τ·sin and (τ/h²)·sin differ.
    const tests = [...ORDER_RUNS[k].slice(0, 2), [9, 20, '0.005']].map(([N, M, tau]) => ({ expr: `heat_implicit(${N}, ${M}, ${tau})`, expect: eText(pyNum(R.text, `heat_implicit(${N}, ${M}, ${tau})`)), tol: 1e-6 }));
    const run = (rows) => rows.map(([N, M, tau]) => [String(N), String(M), tau, eText(pyNum(R.text, `heat_implicit(${N}, ${M}, ${tau})`))]);
    HCACHE.set(k, { k, R, tests, traps: heatTraps(k), order: run(ORDER_RUNS[k]), stab: run(STAB_RUNS[k]) });
  }
  return HCACHE.get(k);
}
const ICT = (k) => (k === 1 ? 'sin(πx)' : 'sin(2πx)');
const HT_PROMPT = (d) => t('On résout ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[, u(0, t) = u(1, t) = 0, u(x, 0) = {k}, par Euler rétrograde en t et différences centrées en x : Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) (a : diagonale, d : sous-diagonale, c : sur-diagonale), factorisée par Thomas. Traduction de exam1.m (2019, 2022), indices à partir de 0.', { k: ICT(d.k) });

export const EXPLICIT_RUNS = [[9, 500, '0.004', '5.534e-10'], [9, 500, '0.0055', '1.028e+12'], [19, 2000, '0.001', '1.485e-10'], [19, 2000, '0.0014', '7.825e+160']];

function orderQuestion(rng, d, level, extra = {}) {
  return multiMcq({
    skill: HT, level, key: `${HT}:order:${d.k}`, ...extra,
    prompt: t('h est divisé par 2 et τ par 4 d\'une ligne à la suivante (temps final fixe). Que peut-on déduire de ce tableau ?'),
    options: [
      { html: t('Le schéma converge à l\'ordre O(h² + τ)'), correct: true },
      { html: t('Le schéma converge à l\'ordre O(h + τ)'), correct: false, rule: 'n_heat_order_h_tau' },
      { html: t('Ce tableau montre que le schéma est stable pour tous h > 0, τ > 0'), correct: false, rule: 'n_stab_order_confused' },
      { html: t('Ce tableau montre que le schéma est stable seulement si τ ≤ h²/2'), correct: false, rule: 'n_stab_order_confused' },
    ],
    solution: [{ html: t('L\'erreur est divisée par 4 : h/2 donne h²/4 et τ/4 donne τ/4. Avec O(h + τ), h/2 ne diviserait que par 2. Un tableau où h et τ diminuent ensemble mesure l\'ordre, pas la stabilité.'), note: '' }],
  }, rng);
}
function stabQuestion(rng, d, level, extra = {}) {
  return multiMcq({
    skill: HT, level, key: `${HT}:stab:${d.k}`, ...extra,
    prompt: t('Avec de grands pas de temps τ (et beaucoup de pas), l\'erreur au temps final est donnée ci-dessus. Que peut-on en déduire ?'),
    options: [
      { html: t('Le schéma est stable pour tous h > 0, τ > 0'), correct: true },
      { html: t('Le schéma converge à l\'ordre O(h² + τ)'), correct: false, rule: 'n_stab_order_confused' },
      { html: t('Le schéma est stable seulement si τ ≤ h²/2'), correct: false, rule: 'n_stab_order_confused' },
      { html: t('Le schéma est explicite'), correct: false },
    ],
    solution: [{ html: t('τ = 1 ≫ h²/2 et rien n\'explose : Euler rétrograde est inconditionnellement stable. Ce tableau ne dit rien de l\'ordre.'), note: '' }],
  }, rng);
}
const orderTable = (d) => ({ columns: ['N', 'M', 'τ', t('erreur max au temps final')], rows: d.order });
const stabTable = (d) => ({ columns: ['N', 'M', 'τ', t('erreur max au temps final')], rows: d.stab });

function heatCode(level, rng) {
  const k = level === 5 ? rng.pick([1, 2]) : rng.pick([1, 1, 2]);
  const d = heatData(k);
  let blanks;
  let choice;
  if (level === 1) { const f = rng.pick([0, 0, 1]); blanks = [f]; choice = f; }
  else if (level === 2) blanks = [rng.pick([1, 2])];
  else if (level === 4) blanks = [0, 1, 2, 3];
  else blanks = d.R.answers.map((_, j) => j);
  const then = level >= 4 ? readtableItem({
    skill: HT, level, key: `${HT}:read:${k}:${level}`,
    prompt: t('Le programme donne ces erreurs :'), table: orderTable(d), question: orderQuestion(rng, d, level),
    hints: H(t('Compare deux lignes : h est divisé par 2 et τ par 4.'), t('erreur(ligne 1)/erreur(ligne 2) ≈ □'), t('Le rapport ≈ 4 : h² et τ sont tous deux divisés par 4, donc O(h² + τ).')),
  }) : null;
  return withThen(codeItem({
    skill: HT, level, ref: d.R, blanks, choice, rng, traps: d.traps, wrong: HT_WRONG,
    fillers: { 0: ['0'], 1: ['tau'] }, preludes: ['vec'], maxSteps: 300000,
    prompt: level === 1 ? t('{p} Choisis ce qui manque.', { p: HT_PROMPT(d) }) : t('{p} Complète les trous.', { p: HT_PROMPT(d) }),
    tests: d.tests, then,
    hints: level >= 5 ? [] : H(t('Multiplie l\'équation par τ et mets toutes les inconnues uⁿ⁺¹ à gauche ; au départ, b = u⁰.'),
      t('coefficient diagonal : 1 + 2·□ ; b[i] = u(xᵢ, 0)'),
      t('A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²), Auⁿ⁺¹ = uⁿ, et b[i] = {v1}.', { v1: d.R.answers[0] })),
    subgoals: HT_SUB, key: `${level}:${k}:${blanks.join('.')}`,
  }));
}

// L3: the point of the equation, then A and u¹ for N = 2 (h = 1/3).
function heatLines(level, rng) {
  const k = rng.pick([1, 2]);
  const r = rng.pick([q(1), q(1, 2)]);
  const tau = r.div(q(9));
  const diag = q(1).add(r.mul(2));
  const lam = k === 1 ? q(1).add(r) : q(1).add(r.mul(3));
  const u1 = q(1, 2).div(lam); // u¹₁ = (√3/2)/λ
  const u1t = u1.n === 1 ? `√3/${u1.d}` : `${u1.n}√3/${u1.d}`;
  const MENU = [
    { id: 'diag', label: t('Coefficient diagonal 1 + 2τ/h²') },
    { id: 'off', label: t('Coefficient hors diagonale −τ/h²') },
    { id: 'u1', label: t('Résoudre Au¹ = u⁰') },
  ];
  const M = (id) => (level === 3 ? menuOf(MENU, id) : undefined);
  const parts = [
    {
      html: t('Le coefficient diagonal de A.'), ask: 'aᵢᵢ =',
      start: `1+2×(${qt(tau)})/(1/3)^2`,
      judge: { kind: 'value', expect: qt(diag), form: 'irreducible', ntraps: { n_heat_tau_h: [qt(q(1).add(tau.mul(2)))], n_heat_2tau: [qt(q(1).add(r))] }, nctx: { r: fq(r) } },
      decisions: [{
        kind: 'decision', prompt: t('En quel point écrit-on l\'équation pour Euler rétrograde ?'), options: [
          { id: 'n1', label: t('Au point (xᵢ, tₙ₊₁) : −∂²u/∂x² est pris au nouveau temps'), valid: true, ref: true },
          { id: 'n', label: t('Au point (xᵢ, tₙ) : −∂²u/∂x² est pris à l\'ancien temps'), valid: false, rule: 'n_implicit_as_explicit', why: t('C\'est le schéma explicite (Euler progressif), stable seulement si τ ≤ h²/2.') },
        ],
      }],
      menu: M('diag'),
      lines: [{ math: qt(diag), note: `τ/h² = ${fq(r)}`, subgoal: 'matrix', blank: [qt(diag)] }],
    },
    {
      html: t('Le coefficient hors diagonale de A.'), ask: 'a₁₂ =',
      start: `-(${qt(tau)})/(1/3)^2`,
      judge: { kind: 'value', expect: qt(r.neg()), form: 'irreducible' },
      menu: M('off'),
      lines: [{ math: qt(r.neg()), note: '−τ/h²', subgoal: 'matrix', blank: [qt(r.neg())] }],
    },
    {
      html: k === 1
        ? t('u⁰ = (sin(π/3) ; sin(2π/3)) = (√3/2 ; √3/2). (1 ; 1) est vecteur propre de A pour la valeur propre 1 + τ/h² = {lam}, donc u¹ = u⁰/{lam}.', { lam: fq(lam) })
        : t('u⁰ = (sin(2π/3) ; sin(4π/3)) = (√3/2 ; −√3/2). (1 ; −1) est vecteur propre de A pour la valeur propre 1 + 3τ/h² = {lam}, donc u¹ = u⁰/{lam}.', { lam: fq(lam) }),
      ask: 'u₁¹ =', start: 'u_1',
      judge: { kind: 'value', expect: u1t, form: 'exact' },
      menu: M('u1'),
      lines: [{ math: u1t, note: `(√3/2)/${fq(lam)}`, subgoal: 'scheme', blank: [u1t] }],
    },
  ];
  return partsItem({
    skill: HT, level, key: `${HT}:lines:${level}:${k}:${r}`,
    prompt: level === 3
      ? t('Chaleur ∂u/∂t = ∂²u/∂x², u(x, 0) = {ic}, N = 2 (h = 1/3), τ = {tau}. Écris le schéma d\'Euler implicite Au¹ = u⁰ : les coefficients de A, puis u₁¹. Choisis d\'abord chaque action.', { ic: ICT(k), tau: fq(tau) })
      : t('Chaleur ∂u/∂t = ∂²u/∂x², u(x, 0) = {ic}, N = 2 (h = 1/3), τ = {tau}. Écris le schéma d\'Euler implicite Au¹ = u⁰ : les coefficients de A, puis u₁¹.', { ic: ICT(k), tau: fq(tau) }),
    parts, keys: ['calc'], subgoals: HT_SUB,
    hints: H(t('Multiplie l\'équation par τ et mets toutes les inconnues uⁿ⁺¹ à gauche.'), t('coefficient diagonal : 1 + 2·□'), `A = tridiag(${fq(r.neg())}, ${fq(diag)}, ${fq(r.neg())}), u₁¹ = ${u1t.replace('√', '√')}.`),
    baits: ['n_heat_tau_h', 'n_heat_2tau', 'n_implicit_as_explicit'],
  });
}

function heatExamMcq(rng, opts) {
  const d = heatData(rng.pick([1, 2]));
  const r = rng.int(0, 4);
  if (r <= 1) {
    return codeMcq({ skill: HT, ref: d.R, hole: r === 0 ? 0 : 1, traps: d.traps, key: `${d.k}:${r}`, exam: examTag(opts), prompt: HT_PROMPT(d) }, rng);
  }
  if (r === 2) {
    return codeMcq({ skill: HT, ref: d.R, hole: rng.pick([5, 9, 10]), traps: d.traps, key: `${d.k}:thomas`, exam: examTag(opts), prompt: HT_PROMPT(d) }, rng);
  }
  if (r === 3) {
    const qz = orderQuestion(rng, d, 4);
    return { ...qz, prompt: `${HT_PROMPT(d)}${tableHtml(orderTable(d))}${qz.prompt}`, exam: examTag(opts), key: `${HT}:examorder:${d.k}` };
  }
  if (rng.chance(0.5)) {
    const qz = stabQuestion(rng, d, 4);
    return { ...qz, prompt: `${HT_PROMPT(d)}${tableHtml(stabTable(d))}${qz.prompt}`, exam: examTag(opts), key: `${HT}:examstab:${d.k}` };
  }
  return multiMcq({
    skill: HT, level: 4, key: `${HT}:explicit`, exam: examTag(opts),
    prompt: t('Même équation (u(x, 0) = sin(πx)), avec le schéma explicite (Euler progressif) : erreur au temps final.{table}Cocher les affirmations vraies (h = 1/(N + 1)).', { table: tableHtml({ columns: ['N', 'M', 'τ', t('erreur')], rows: EXPLICIT_RUNS.map((x) => x.map(String)) }) }),
    options: [
      { html: t('L\'explicite est stable seulement si τ/h² ≤ 1/2'), correct: true },
      { html: t('Pour N = 9, τ = 0,0055 donne τ/h² = 0,55 > 1/2 : le schéma explose'), correct: true },
      { html: t('L\'explicite est stable pour tous h, τ'), correct: false, rule: 'n_stab_order_confused' },
      { html: t('L\'explosion vient d\'une erreur d\'ordre trop faible'), correct: false, rule: 'n_stab_order_confused' },
    ],
    solution: [{ html: t('τ/h² = 0,4 reste stable, 0,55 et 0,56 explosent : condition τ ≤ h²/2.'), note: '' }],
  }, rng);
}

function heatGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return heatExamMcq(rng, opts);
  if (level === 3) return heatLines(3, rng);
  return heatCode(level, rng);
}

// ======================================================================
// n-pde-cfl
// ======================================================================

const CF_SUB = [
  { id: 'scheme', label: t('le schéma décentré'), skill: CF },
  { id: 'cfl', label: t('la condition τ ≤ h'), skill: CF },
  { id: 'order', label: t('l\'ordre'), skill: CF },
  { id: 'grid', label: t('la grille (xᵢ, tₙ)'), skill: HT },
];

const TRANSPORT = refCode(`def transport(N, M, tau):
    # du/dt - du/dx = 0, u(x,0) = 10 (1 - x)^3, u(1,t) = 0 ; decentre vers la droite
    h = 1 / (N + 1)
    uold = zeros(N)
    unew = zeros(N)
    for i in range(N):
        uold[i] = 10 * (1 - (i + 1) * h) ** 3
    t = 0.0
    for n in range(M):
        t = t + tau
        unew[N - 1] = «uold[N - 1] * (1 - tau / h)»
        for i in range(N - 2, -1, -1):
            unew[i] = «uold[i] * (1 - tau / h) + tau / h * uold[i + 1]»
        for i in range(N):
            uold[i] = unew[i]
    err = 0.0
    for i in range(N):
        x = (i + 1) * h
        if «x + t < 1»:
            uex = «10 * (1 - x - t) ** 3»
        else:
            uex = 0.0
        err = max(err, abs(unew[i] - uex))
    return err
`);
const TR_TRAPS = {
  1: [{ text: 'uold[i] * (1 - tau / h) + tau / h * uold[i - 1]', rule: 'n_cfl_direction' }, { text: 'uold[i] * (1 + tau / h) - tau / h * uold[i + 1]' }, { text: 'uold[i] + tau / h * uold[i + 1]' }],
  2: [{ text: 'x - t < 1' }],
  3: [{ text: '10 * (1 - x + t) ** 3' }],
};
let TR = null;
function trData() {
  if (!TR) {
    const run = (N, M) => pyNum(TRANSPORT.text, `transport(${N}, ${M}, ${0.9 / (N + 1)})`);
    TR = {
      tests: [[9, 5], [19, 10]].map(([N, M]) => ({ expr: `transport(${N}, ${M}, ${0.9 / (N + 1)})`, expect: eText(run(N, M)), tol: 1e-6 })),
      table: { columns: ['N', 'M', 'τ = 0,9h', t('erreur max')], rows: [[9, 5], [19, 10], [39, 20], [79, 40]].map(([N, M]) => [String(N), String(M), String(Number((0.9 / (N + 1)).toPrecision(6))), eText(run(N, M))]) },
    };
  }
  return TR;
}
export const WAVE_RUNS = [[9, 10, '0.09', '6.903714e-04'], [19, 20, '0.045', '1.711472e-04'], [39, 40, '0.0225', '4.269724e-05']];
export const WAVE_STAB = [[9, 100, '0.1', '1.443290e-15'], [9, 100, '0.11', '1.564047e+18']];

const CF_PROMPT = t('Transport ∂u/∂t − ∂u/∂x = 0 sur ]0 ; 1[, u(x, 0) = 10(1 − x)³, u(1, t) = 0 ; la solution est u₀(x + t). Schéma explicite décentré : uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ. Traduction de exam2.m (2019), indices à partir de 0.');

function trQuestion(rng, level) {
  return multiMcq({
    skill: CF, level, key: `${CF}:tr`,
    prompt: t('Erreurs du schéma de transport avec τ = 0,9h (h = 1/(N + 1)). Que peut-on en déduire ?'),
    options: [
      { html: t('Le schéma est stable pour τ = 0,9h'), correct: true },
      { html: t('Il converge à l\'ordre O(h + τ) : l\'erreur est divisée par 2 quand h et τ le sont'), correct: true },
      { html: t('Il converge à l\'ordre O(h² + τ²)'), correct: false },
      { html: t('Il serait encore stable avec τ = 1,1h'), correct: false },
    ],
    solution: [{ html: t('Rapport ≈ 2 : ordre 1. τ ≤ h donne des poids ≥ 0 de somme 1 (principe du maximum) ; τ > h ne le garantit plus.'), note: '' }],
  }, rng);
}

function cfCode(level, rng) {
  const d = trData();
  const blanks = level <= 2 ? [level === 1 ? 1 : rng.pick([1, 3])] : TRANSPORT.answers.map((_, j) => j);
  const then = level === 5 ? readtableItem({ skill: CF, level, key: `${CF}:read`, prompt: t('Le programme donne :'), table: d.table, question: trQuestion(rng, level) }) : null;
  return withThen(codeItem({
    skill: CF, level, ref: TRANSPORT, blanks, choice: level === 1 ? 1 : undefined, rng, traps: TR_TRAPS,
    preludes: ['vec'], maxSteps: 300000,
    prompt: level === 1 ? t('{p} Choisis ce qui manque.', { p: CF_PROMPT }) : t('{p} Complète les trous.', { p: CF_PROMPT }),
    tests: d.tests, then,
    hints: level >= 5 ? [] : H(t('La solution est transportée vers la gauche : on prend le voisin de droite.'), 'uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)·□', 'unew[i] = uold[i] * (1 - tau / h) + tau / h * uold[i + 1].'),
    subgoals: CF_SUB, key: `${level}:${blanks.join('.')}`,
  }));
}

// L2: the wave scheme, λ = τ²/h² and the first step.
function cfWave(level, rng) {
  const hd = rng.pick([10, 5, 4]);
  const s = rng.pick([q(1, 2), q(1, 3), q(1, 4), q(2, 3), q(3, 4), q(1)]);
  const h = q(1, hd);
  const tau = s.mul(h);
  const lam = s.mul(s);
  const u = [rng.int(-3, 4), rng.int(1, 6), rng.int(-3, 4)].map((x) => q(x));
  const u1 = q(1).sub(lam).mul(u[1]).add(lam.div(2).mul(u[0].add(u[2])));
  return partsItem({
    skill: CF, level, key: `${CF}:wave:${hd}:${s}:${u.join(',')}`,
    prompt: t('Ondes ∂²u/∂t² = ∂²u/∂x², vitesse initiale nulle, h = {h}, τ = {tau}. Schéma : uᵢⁿ⁺¹ = 2(1 − λ)uᵢⁿ + λ(uᵢ₋₁ⁿ + uᵢ₊₁ⁿ) − uᵢⁿ⁻¹ ; premier pas : uᵢ¹ = (1 − λ)uᵢ⁰ + (λ/2)(uᵢ₋₁⁰ + uᵢ₊₁⁰). Les valeurs u⁰ voisines sont uᵢ₋₁⁰ = {v1}, uᵢ⁰ = {v2}, uᵢ₊₁⁰ = {v3}.', { h: fq(h), tau: fq(tau), v1: fq(u[0]), v2: fq(u[1]), v3: fq(u[2]) }),
    parts: [
      {
        html: t('Le paramètre λ.'), ask: 'λ =', start: `(${qt(tau)})^2/(${qt(h)})^2`,
        judge: { kind: 'value', expect: qt(lam), form: 'irreducible', ntraps: { n_wave_lambda: [qt(s), qt(tau.div(h.mul(h))), qt(tau.mul(tau).div(h))].filter((x) => x !== qt(lam)) } },
        lines: [{ math: qt(lam), note: 'λ = τ²/h²', subgoal: 'scheme', blank: [qt(lam)] }],
      },
      {
        html: t('Le premier pas en xᵢ.'), ask: 'uᵢ¹ =', start: `(1-${qt(lam)})×(${qt(u[1])})+(${qt(lam)}/2)×(${qt(u[0])}+${qt(u[2])})`,
        judge: { kind: 'value', expect: qt(u1), form: 'irreducible' },
        lines: [{ math: qt(u1), note: t('Vitesse initiale nulle'), subgoal: 'scheme', blank: [qt(u1)] }],
      },
    ],
    keys: ['calc'], subgoals: CF_SUB,
    hints: H(t('Les deux dérivées sont d\'ordre 2 : λ = τ²/h².'), `λ = (${fq(tau)})²/(□)²`, `λ = ${fq(lam)}, uᵢ¹ = ${fq(u1)}.`),
    baits: ['n_wave_lambda'],
  });
}

// L3: the side of the upwind scheme, then one step.
function cfSide(level, rng) {
  const s = rng.pick([q(1, 2), q(1, 4), q(3, 4), q(9, 10), q(1, 5)]);
  const u = [rng.int(0, 6), rng.int(1, 9), rng.int(0, 9)].map((x) => q(x));
  const val = q(1).sub(s).mul(u[1]).add(s.mul(u[2]));
  const MENU = [{ id: 'step', label: 'Calculer uᵢⁿ⁺¹' }, { id: 'cfl', label: t('Condition de stabilité') }];
  return partsItem({
    skill: CF, level, key: `${CF}:side:${s}:${u.join(',')}`,
    prompt: level === 3
      ? t('Transport ∂u/∂t − ∂u/∂x = 0, schéma explicite décentré avec τ/h = {s}. À l\'instant n : uᵢ₋₁ⁿ = {a}, uᵢⁿ = {b}, uᵢ₊₁ⁿ = {c}. Choisis d\'abord chaque action.', { s: fq(s), a: fq(u[0]), b: fq(u[1]), c: fq(u[2]) })
      : t('Transport ∂u/∂t − ∂u/∂x = 0, schéma explicite décentré avec τ/h = {s}. À l\'instant n : uᵢ₋₁ⁿ = {a}, uᵢⁿ = {b}, uᵢ₊₁ⁿ = {c}.', { s: fq(s), a: fq(u[0]), b: fq(u[1]), c: fq(u[2]) }),
    parts: [
      {
        html: t('uᵢⁿ⁺¹ par le schéma décentré.'), ask: 'uᵢⁿ⁺¹ =', start: `u_i`,
        judge: { kind: 'value', expect: qt(val), form: 'irreducible' },
        menu: level === 3 ? menuOf(MENU, 'step') : undefined,
        decisions: [{
          kind: 'decision', prompt: t('Quel voisin utilise le schéma décentré ?'), options: [
            { id: 'right', label: t('Le voisin de droite uᵢ₊₁ⁿ : u(x, t) = u₀(x + t), l\'information vient de la droite'), valid: true, ref: true },
            { id: 'left', label: t('Le voisin de gauche uᵢ₋₁ⁿ'), valid: false, rule: 'n_cfl_direction', why: t('∂u/∂t − ∂u/∂x = 0 transporte la solution vers la gauche : elle vient de la droite.') },
          ],
        }],
        lines: [
          { math: `(1-${qt(s)})×${qt(u[1])}+${qt(s)}×${qt(u[2])}`, note: '(1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ', subgoal: 'scheme', blank: [qt(u[2])] },
          { math: qt(val), note: t('Combinaison convexe'), subgoal: 'scheme', blank: [qt(val)] },
        ],
      },
      {
        html: t('Le plus grand τ/h pour lequel les deux poids restent ≥ 0 (principe du maximum).'), ask: '(τ/h)max =', start: 'r',
        judge: { kind: 'value', expect: '1', form: 'irreducible' },
        menu: level === 3 ? menuOf(MENU, 'cfl') : undefined,
        lines: [{ math: '1', note: '1 − τ/h ≥ 0 ⇔ τ ≤ h (CFL)', subgoal: 'cfl', blank: ['1'] }],
      },
    ],
    keys: ['calc'], subgoals: CF_SUB,
    hints: H(t('La solution est transportée vers la gauche : on prend le voisin de droite.'), `uᵢⁿ⁺¹ = (1 − ${fq(s)})·${fq(u[1])} + ${fq(s)}·□`, t('uᵢⁿ⁺¹ = {val} ; poids ≥ 0 tant que τ ≤ h.', { val: fq(val) })),
    baits: ['n_cfl_direction'],
  });
}

const MAX_PROOF = [
  t('Supposons τ ≤ h : les poids 1 − τ/h et τ/h sont ≥ 0, de somme 1.'),
  t('|uᵢⁿ⁺¹| ≤ (1 − τ/h)|uᵢⁿ| + (τ/h)|uᵢ₊₁ⁿ| (inégalité triangulaire).'),
  '|uᵢⁿ⁺¹| ≤ (1 − τ/h)·max|uⁿ| + (τ/h)·max|uⁿ| = max|uⁿ|.',
  t('Donc max|uⁿ⁺¹| ≤ max|uⁿ| ≤ … ≤ max|u⁰| : le schéma est stable.'),
];
function cfBlocks(level, rng) {
  const ids = MAX_PROOF.map((_, i) => `b${i}`);
  const blocks = MAX_PROOF.map((html, i) => ({ id: ids[i], html, needs: i ? [ids[i - 1]] : [], earlyWhy: i ? t('Pas encore : ce bloc s\'appuie sur le bloc précédent.') : undefined }));
  blocks.push({ id: 'd0', html: t('On écrit uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₋₁ⁿ, avec le voisin de gauche.'), needs: [], distractor: 'n_cfl_direction', why: t('Pour ∂u/∂t − ∂u/∂x = 0, l\'information vient de la droite : uᵢ₊₁ⁿ.') });
  return blocksItem({
    skill: CF, level, mode: 'order',
    prompt: t('Montre le principe du maximum pour le schéma de transport uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ quand τ ≤ h (examen 2019, question 18) : touche les blocs dans l\'ordre.'),
    blocks: rng.shuffle(blocks), goal: ids.at(-1), order: ids, placed: [],
    hints: H(t('Si τ ≤ h, les deux poids sont ≥ 0 et de somme 1.'), '|uᵢⁿ⁺¹| ≤ (1 − τ/h)·□ + (τ/h)·□', 'max|uⁿ⁺¹| ≤ max|uⁿ|.'),
    solution: MAX_PROOF.map((s) => ({ html: s, note: '' })),
    subgoals: CF_SUB, key: `${CF}:max`, expectedSec: 120,
  });
}

function cfExamMcq(rng, opts) {
  const r = rng.int(0, 3);
  if (r === 0) return codeMcq({ skill: CF, ref: TRANSPORT, hole: 1, traps: TR_TRAPS, key: 'unew', exam: examTag(opts), prompt: CF_PROMPT }, rng);
  if (r === 1) {
    const d = trData();
    const qz = trQuestion(rng, 4);
    return { ...qz, prompt: `${CF_PROMPT}${tableHtml(d.table)}${qz.prompt}`, exam: examTag(opts), key: `${CF}:examtr` };
  }
  if (r === 2) {
    return multiMcq({
      skill: CF, level: 4, key: `${CF}:wave`, exam: examTag(opts),
      prompt: t('Ondes ∂²u/∂t² = ∂²u/∂x², u(x, 0) = sin(πx), schéma explicite à trois niveaux, h = 1/(N + 1).{table}Cocher les affirmations vraies.', { table: tableHtml({ columns: ['N', 'M', 'τ', t('erreur max')], rows: [...WAVE_RUNS, ...WAVE_STAB].map((x) => x.map(String)) }) }),
      options: [
        { html: t('Le schéma converge à l\'ordre O(h² + τ²)'), correct: true },
        { html: t('Il est stable si τ ≤ h, et explose pour τ > h'), correct: true },
        { html: t('Il converge à l\'ordre O(h + τ)'), correct: false },
        { html: t('Il est stable pour tout τ'), correct: false, rule: 'n_stab_order_confused' },
      ],
      solution: [{ html: t('Erreur divisée par 4 quand h et τ sont divisés par 2 : ordre 2 en h et en τ. τ = 0,1 = h reste stable, τ = 0,11 > h explose.'), note: '' }],
    }, rng);
  }
  const hd = rng.pick([10, 20]);
  const tau = q(rng.pick([1, 3]), 4 * hd);
  const h = q(1, hd);
  const lam = tau.mul(tau).div(h.mul(h));
  return mcq({
    skill: CF, level: 4, key: `${CF}:lam:${hd}:${tau}`, exam: examTag(opts),
    prompt: t('Schéma explicite pour les ondes avec h = {h} et τ = {tau} : uᵢⁿ⁺¹ = 2(1 − λ)uᵢⁿ + λ(uᵢ₋₁ⁿ + uᵢ₊₁ⁿ) − uᵢⁿ⁻¹. Que vaut λ ?', { h: fq(h), tau: fq(tau) }),
    options: opts4(fq(lam), [{ html: fq(tau.div(h)), rule: 'n_wave_lambda' }, { html: fq(tau.div(h.mul(h))), rule: 'n_wave_lambda' }, { html: fq(tau.mul(tau).div(h)), rule: 'n_wave_lambda' }], ['1']),
    solution: [{ html: `λ = τ²/h² = ${fq(lam)}.`, note: '' }],
  }, rng);
}

function cfGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return cfExamMcq(rng, opts);
  if (level === 2) return cfWave(2, rng);
  if (level === 3) return cfSide(3, rng);
  if (level === 4) return cfBlocks(4, rng);
  return cfCode(level, rng);
}

export const GEN = { [HT]: heatGen, [CF]: cfGen };
export { pyValue, heatData, trData };

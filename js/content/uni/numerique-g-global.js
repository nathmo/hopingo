// n-ode-euler-global (module N, part g, step U9): the global error of Euler
// progressif, by a proof. Catalogue: docs/universite/N-analyse-numerique.md,
// n-ode-euler-global, and exam example 4.
//
// u′ = −u, u(0) = 1 on [0 ; T], h = T/N: u_N = (1 − h)ᴺ, u(t_N) = e^(−Nh);
// lemma |e^(−x) − (1 − x)| ≤ x²/2; aᴺ − bᴺ = (a − b)·Σ a^(N−1−k)bᵏ with
// |a|, |b| ≤ 1 when 0 < h ≤ 2; so |u(t_N) − u_N| ≤ N·h²/2 = (T/2)·h.
// T ∈ {10, 20, 50, 100} (λ = −1 only; the variant λ = −2 is not built).
// L1 guided lines: the scheme, a² − b², the constant; L2 guided: a³ − b³ (or
// a⁴ − b⁴), the constant; L3 the table of errors for T = 1 to read (ordre 1,
// borne respectée); L4 the proof in blocks, with decoys (h ≤ 2 forgotten,
// the factor N forgotten, O(h²)); L5 the 2020 problem (T = 10, 5 points).
// Exam: open = exam example 4 (T = 20, 4 points); tf (O(h²) like the local
// error; or « |1 − h| ≤ 1 pour tout h > 0 », counter-example h = 3).

import { linesItem, blocksItem, tfItem, examTag } from './kit.js';
import { problemItem } from './kit-problem.js';
import { readtableItem, multiMcq, vfMcq, H, blankBy } from './numerique-kit.js';
import { globalTable, e4, hShow } from './numerique-g-kit.js';
import { t } from '../../i18n.js';

const GL = 'n-ode-euler-global';
const SUB = [
  { id: 'scheme', label: t('le schéma uₙ₊₁ = (1 − h)uₙ'), skill: 'n-ode-euler' },
  { id: 'lemma', label: t('Taylor avec reste : |e^(−x) − (1 − x)| ≤ x²/2'), skill: 'a1-dl-usual' },
  { id: 'factor', label: 'aᴺ − bᴺ = (a − b)·Σ a^(N−1−k)bᵏ', skill: 'g5-geom' },
  { id: 'bound', label: t('majorer'), skill: GL },
  { id: 'constant', label: t('la constante C = T/2'), skill: GL },
];

const schemeSeg = (guided) => ({
  start: 'u+h×(-u)',
  judge: { kind: 'equiv', vars: ['h', 'u'], domain: { h: [0.1, 2], u: [-3, 3] } },
  lines: [{ kind: 'eq', math: '(1-h)u', ...(guided ? blankBy('(1-h)u', ['1-h']) : {}), note: t('uₙ₊₁ = uₙ + h·(−uₙ) = (1 − h)uₙ, donc u_N = (1 − h)ᴺ'), subgoal: 'scheme' }],
});
const IDENT = {
  2: ['a^2-b^2', '(a-b)(a+b)', 'a+b'],
  3: ['a^3-b^3', '(a-b)(a^2+ab+b^2)', 'a^2+ab+b^2'],
  4: ['a^4-b^4', '(a-b)(a^3+a^2b+ab^2+b^3)', 'a^3+a^2b+ab^2+b^3'],
};
const identSeg = (N, guided) => ({
  kind: 'segment', html: t('Avec a = e^(−h) et b = 1 − h : u(t_N) − u_N = aᴺ − bᴺ. Factorise pour N = {N}.', { N }), ask: `a${'⁰¹²³⁴'[N]} − b${'⁰¹²³⁴'[N]} =`,
  start: { math: IDENT[N][0] }, judge: { kind: 'equiv', vars: ['a', 'b'] },
});
const identLine = (N, guided) => ({ kind: 'eq', math: IDENT[N][1], ...(guided ? blankBy(IDENT[N][1], [IDENT[N][2]]) : {}), note: t('aᴺ − bᴺ = (a − b)(a^(N−1) + a^(N−2)b + … + b^(N−1)) : N termes'), subgoal: 'factor' });
const constSeg = (T) => [
  { kind: 'segment', html: t('|u(t_N) − u_N| ≤ N·h²/2 = (Nh)·h/2, avec Nh = T = {T}. Ainsi |u(t_N) − u_N| ≤ C·h avec C =', { T }), ask: 'C =', start: { math: 'C' }, judge: { kind: 'value', expect: String(T / 2), form: 'irreducible' } },
  { kind: 'eq', math: `${T}/2`, note: 'Nh = T', subgoal: 'constant' },
  { kind: 'eq', math: String(T / 2), note: t('C ne dépend ni de h ni de N'), subgoal: 'constant' },
];

function linesLevel(rng, level) {
  const T = rng.pick([10, 20, 50, 100]);
  const N = level === 1 ? 2 : rng.pick([3, 4]);
  const guided = level <= 2;
  const s = schemeSeg(guided);
  const script = level === 1
    ? [...s.lines, identSeg(N), identLine(N, guided), ...constSeg(T)]
    : [identLine(N, guided), ...constSeg(T)];
  if (guided) script.find((l) => l.kind === 'eq' && l.subgoal === 'constant' && l.math === String(T / 2)).blanks = blankBy(String(T / 2), [String(T / 2)]).blanks;
  const base = level === 1 ? { start: s.start, judge: s.judge } : { start: IDENT[N][0], judge: { kind: 'equiv', vars: ['a', 'b'] } };
  return linesItem({
    skill: GL, level, mode: 'guided', keys: ['calc', 'letters'],
    prompt: level === 1
      ? t('Erreur globale d\'Euler progressif pour u′ = −u, u(0) = 1 sur [0 ; {T}], h = {T}/N. Écris le schéma, factorise a² − b², puis donne la constante C de la borne C·h.', { T })
      : t('Erreur globale d\'Euler progressif pour u′ = −u, u(0) = 1 sur [0 ; {T}], h = {T}/N. Factorise aᴺ − bᴺ pour N = {N} (a = e^(−h), b = 1 − h), puis donne la constante C de la borne C·h.', { T, N }),
    ...base, script: level === 1 ? script : script,
    hints: H(t('Écris les deux nombres comme des puissances N-ièmes, puis factorise aᴺ − bᴺ.'),
      t('|aᴺ − bᴺ| ≤ |a − b|·(□ termes ≤ 1)'),
      `≤ N·h²/2 = T·h/2 = ${T / 2}h.`),
    subgoals: SUB, key: `${GL}:${level}:${T}:${N}`, baits: [],
  });
}

// ---------- L3: the table of errors ----------

function level3(rng) {
  const T = globalTable();
  const question = multiMcq({
    skill: GL, level: 3, key: `${GL}:table`, prompt: t('Que montre ce tableau ?'),
    options: [
      { html: t('L\'erreur globale est d\'ordre 1 : divisée par 2 quand h est divisé par 2'), correct: true },
      { html: t('La borne T·h/2 est respectée'), correct: true },
      { html: t('L\'erreur globale est d\'ordre 2, comme l\'erreur locale h²/2'), correct: false, rule: 'n_global_error_order' },
      { html: t('La borne n\'est pas respectée pour h = 0,1'), correct: false },
    ],
    solution: [{ html: t('L\'erreur passe de {v1} à {v2} quand h passe de 0,1 à 0,05 : divisée par 2, ordre 1 ; chaque erreur est sous h/2.', { v1: e4(T[0].err), v2: e4(T[1].err) }), note: '' }],
  }, rng);
  return readtableItem({
    skill: GL, level: 3, key: 'table',
    prompt: t('Euler progressif pour u′ = −u, u(0) = 1 sur [0 ; 1] (T = 1) : erreur |u(1) − u_N| et borne T·h/2.'),
    table: { columns: ['N', 'h', t('erreur'), 'h/2'], rows: T.map((r) => [String(r.N), hShow(r.h), e4(r.err), e4(r.bound)]) },
    question,
    hints: H(t('Quand N double, h est divisé par 2 : regarde par combien l\'erreur est divisée.'), `${e4(T[0].err)}/${e4(T[1].err)} ≈ □`, t('Rapport ≈ 2 : ordre 1, et chaque erreur est sous h/2.')),
    subgoals: SUB,
  });
}

// ---------- L4: the proof in blocks ----------

function proofBlocks(T) {
  return [
    { id: 's1', html: t('u_N = (1 − h)ᴺ et u(t_N) = e^(−Nh) : u(t_N) − u_N = aᴺ − bᴺ, avec a = e^(−h), b = 1 − h'), needs: [] },
    { id: 's2', html: t('Taylor-Lagrange : e^(−h) = 1 − h + e^(−ξ)h²/2 avec ξ ∈ ]0 ; h[, donc |a − b| ≤ h²/2'), needs: [] },
    { id: 's3', html: t('aᴺ − bᴺ = (a − b)·Σₖ a^(N−1−k)bᵏ (N termes)'), needs: ['s1'] },
    { id: 's4', html: t('|a| = e^(−h) ≤ 1, et |b| = |1 − h| ≤ 1 car 0 &lt; h ≤ 2'), needs: [] },
    { id: 's5', html: t('Inégalité triangulaire : |Σₖ a^(N−1−k)bᵏ| ≤ N'), needs: ['s3', 's4'] },
    { id: 's6', html: `|u(t_N) − u_N| ≤ N·h²/2 = T·h/2 = ${T / 2}h`, needs: ['s2', 's5'] },
  ];
}
const DECOYS = [
  { html: t('|1 − h| ≤ 1 pour tout h > 0'), distractor: 'n_h_le_2_forgotten', why: t('Pour h = 3, |1 − h| = 2 > 1 : il faut 0 &lt; h ≤ 2.') },
  { html: '|aᴺ − bᴺ| ≤ |a − b| ≤ h²/2', distractor: 'n_euler_ineq_bound', why: t('La somme a N termes de module ≤ 1 : le facteur N reste.') },
  { html: t('L\'erreur locale est h²/2, donc l\'erreur globale est O(h²)'), distractor: 'n_global_error_order', why: t('Les N = T/h erreurs locales s\'accumulent : N·h² = T·h.') },
];

function level4(rng) {
  const T = rng.pick([10, 20, 50, 100]);
  const blocks = proofBlocks(T);
  const decoys = DECOYS.map((d, i) => ({ id: `x${i}`, needs: [], ...d }));
  return blocksItem({
    skill: GL, level: 4, mode: 'order',
    prompt: t('u′ = −u, u(0) = 1 sur [0 ; {T}], Euler progressif avec h = {T}/N, 0 &lt; h ≤ 2. Montre que |u(t_N) − u_N| ≤ {v1}h : touche les blocs de la preuve dans l\'ordre. Attention aux blocs faux.', { T, v1: T / 2 }),
    blocks: rng.shuffle([...blocks, ...decoys]), goal: 's6', order: blocks.map((b) => b.id),
    hints: H(t('Écris l\'erreur comme aᴺ − bᴺ, factorise, puis majore chaque facteur.'), t('|aᴺ − bᴺ| ≤ |a − b|·(□ termes de module ≤ 1)'), `≤ N·h²/2 = T·h/2 = ${T / 2}h.`),
    subgoals: SUB, key: `4:${T}`, expectedSec: 200,
  });
}

// ---------- L5 and exam: the problem ----------

function problem(rng, level, T, pts, opts = {}) {
  const s = schemeSeg(false);
  const a = linesItem({
    skill: GL, level, mode: 'free', keys: ['calc', 'letters'], noHints: true,
    prompt: t('(a) Écris un pas du schéma : uₙ₊₁ = uₙ + h·(−uₙ) = ?'),
    start: s.start, judge: s.judge, script: s.lines, hints: [], subgoals: SUB, key: `${GL}:pa:${T}`,
  });
  const b = blocksItem({
    skill: GL, level, mode: 'order', noHints: true,
    prompt: t('(b) Montre que |e^(−x) − (1 − x)| ≤ x²/2 pour x > 0 : touche les blocs dans l\'ordre.'),
    blocks: rng.shuffle([
      { id: 'b1', html: t('Taylor-Lagrange en 0 : e^(−x) = 1 − x + e^(−ξ)·x²/2, avec ξ ∈ ]0 ; x['), needs: [] },
      { id: 'b2', html: t('0 &lt; e^(−ξ) ≤ 1, car ξ > 0'), needs: ['b1'] },
      { id: 'b3', html: t('Donc |e^(−x) − (1 − x)| = e^(−ξ)·x²/2 ≤ x²/2'), needs: ['b2'] },
    ]), goal: 'b3', order: ['b1', 'b2', 'b3'], hints: [], subgoals: SUB, key: `pb:${T}`,
  });
  const c = linesItem({
    skill: GL, level, mode: 'free', keys: ['calc', 'letters'], noHints: true,
    prompt: t('(c) Avec a = e^(−h) et b = 1 − h, u(t_N) − u_N = aᴺ − bᴺ. Factorise a³ − b³ (le cas N = 3 du produit (a − b)·Σ a^(N−1−k)bᵏ).'),
    start: IDENT[3][0], judge: { kind: 'equiv', vars: ['a', 'b'] }, script: [identLine(3, false)], hints: [], subgoals: SUB, key: `${GL}:pc:${T}`,
  });
  const d = blocksItem({
    skill: GL, level, mode: 'order', noHints: true,
    prompt: t('(d) Déduis-en |u(t_N) − u_N| ≤ {v1}h pour 0 &lt; h ≤ 2 : touche les blocs dans l\'ordre. Attention aux blocs faux.', { v1: T / 2 }),
    blocks: rng.shuffle([
      { id: 'd1', html: '|a| = e^(−h) ≤ 1', needs: [] },
      { id: 'd2', html: t('|b| = |1 − h| ≤ 1, car 0 &lt; h ≤ 2'), needs: [] },
      { id: 'd3', html: t('|Σₖ a^(N−1−k)bᵏ| ≤ N : N termes de module ≤ 1'), needs: ['d1', 'd2'] },
      { id: 'd4', html: `|u(t_N) − u_N| ≤ N·|a − b| ≤ N·h²/2 = ${T}h/2 = ${T / 2}h`, needs: ['d3'] },
      { id: 'x0', needs: [], ...DECOYS[0] },
      { id: 'x1', needs: [], ...DECOYS[1] },
    ]), goal: 'd4', order: ['d1', 'd2', 'd3', 'd4'], hints: [], subgoals: SUB, key: `pd:${T}`,
  });
  return problemItem({
    skill: GL, level, key: `${GL}:problem:${T}`, exam: opts.exam ? examTag(opts, pts.reduce((x, y) => x + y, 0)) : false,
    prompt: t('Soit u′ = −u sur ]0 ; {T}], u(0) = 1, h = {T}/N, tₙ = nh, et Euler progressif. Montre que |u(t_N) − u_N| ≤ {v1}h pour 0 &lt; h ≤ 2.', { T, v1: T / 2 }),
    parts: [
      { item: a, points: pts[0], title: t('(a) Le schéma') },
      { item: b, points: pts[1], title: t('(b) Le lemme') },
      { item: c, points: pts[2], title: t('(c) Factoriser aᴺ − bᴺ') },
      { item: d, points: pts[3], title: t('(d) Majorer') },
    ],
  });
}

// ---------- exam tf ----------

function examTf(rng, opts) {
  if (rng.chance(0.5)) {
    return vfMcq({
      skill: GL, key: `${GL}:tf:order`, exam: examTag(opts), truth: false, ruleIfTrue: 'n_global_error_order',
      statement: t('L\'erreur globale d\'Euler progressif est O(h²), comme son erreur locale.'),
      explanation: t('Faux : les N = T/h erreurs locales h²/2 s\'accumulent, N·h²/2 = T·h/2 : l\'erreur globale est O(h).'),
    }, rng);
  }
  return tfItem({
    skill: GL, level: 4, key: 'h2', exam: examTag(opts),
    statement: t('Pour tout pas h > 0, |1 − h| ≤ 1.'),
    truth: false,
    counter: { kind: 'num', prop: 'absOneMinusH', params: {}, ask: [{ v: 'h', label: 'h =' }], answer: { h: '3' } },
    explanation: t('Faux : pour h = 3, |1 − h| = 2. C\'est pourquoi la preuve suppose 0 &lt; h ≤ 2.'),
  });
}

export const GEN = {
  [GL]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'open') return problem(rng, 4, 20, [0.5, 1, 1.5, 1], opts);
    if (opts.exam === 'tf') return examTf(rng, opts);
    switch (level) {
      case 1: return linesLevel(rng, 1);
      case 2: return linesLevel(rng, 2);
      case 3: return level3(rng);
      case 4: return level4(rng);
      default: return problem(rng, 5, 10, [0.5, 1, 2, 1.5]);
    }
  },
};

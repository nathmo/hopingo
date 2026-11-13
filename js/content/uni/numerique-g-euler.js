// n-ode-euler (module N, part g, step U9): Euler progressif et rétrograde.
// Catalogue: docs/universite/N-analyse-numerique.md, n-ode-euler.
//
// Data: u′ = λu + g(t), λ ∈ {−1, −2, −5, −10}, g ∈ {0, 1, t}, h ∈ {1/10,
// 1/20, 1/5}, u(0) ∈ {1, 2}, |hλ| < 1; two steps of EP and ER stay exact
// fractions with denominators ≤ 1000 (numerique-g-kit.js odeData).
// L1 guided lines: u₁ by EP, then the equation of ER for u₁; L2 the table of
// EP (two steps, judged from the student's rows); L3 choose where f is
// evaluated in ER, then u₁; L4 the table of ER, then u₂ by EP; L5 the
// program (euler and its implicit version), then the table of errors of
// the GM series 13 (√u/(1 + t²)) to read.
// Exam: mcq (u₁ by ER with its traps, or the equation solved at each step
// of ER, 2019 question 4); tf (EP decreasing for every h: counter-example
// λ, h; or « ER est explicite »).

import { linesItem, mcq, tfItem, examTag } from './kit.js';
import { mcqDistinct } from './alglin-kit.js';
import {
  refCode, codeItem, readtableItem, iterTable, multiMcq, vfMcq, H, blankBy,
} from './numerique-kit.js';
import { odeData, fShow, nice, problemText, gAt, q, sqrtTable, e4, exactSol, R } from './numerique-g-kit.js';
import { t } from '../../i18n.js';

const EU = 'n-ode-euler';
const SUB = [
  { id: 'scheme', label: t('écrire le schéma'), skill: EU },
  { id: 'step', label: t('un pas d\'Euler progressif'), skill: EU },
  { id: 'implicit', label: t('résoudre l\'équation d\'Euler rétrograde'), skill: EU },
];
const KEYS = ['calc'];

const fAtText = (d, t, u) => `${d.lam}×${u}${d.g === 0 ? '' : `+${t}`.replace('+t', `+${t}`)}`;
// The value f(t, u) written with the numbers: −2×1 + 1/10.
function fNum(d, t, u) {
  const tt = `(${t})`;
  const g = d.g === 0 ? '' : d.g === 1 ? '+1' : `+${tt}`;
  return `(${d.lam})×(${u})${g}`;
}

// ---------- L1 ----------

function level1(rng) {
  const d = odeData(rng);
  const u1 = d.rows.EP[1].u;
  const r1 = d.rows.ER[1].u;
  const h = String(d.h);
  const t1 = d.h;
  const g1 = gAt(d.g, t1);
  const erLine = `(${d.u0}+${h}×${g1})/(1-${h}×(${d.lam}))`;
  return linesItem({
    skill: EU, level: 1, mode: 'guided', keys: KEYS,
    prompt: t('{d}. Calcule u₁ par Euler progressif, puis par Euler rétrograde.', { d: problemText(d) }),
    start: `${d.u0}+${h}×(${fNum(d, 0, d.u0)})`,
    judge: { kind: 'value', form: 'irreducible', ode: d.phiOf('EP') },
    script: [
      { kind: 'note', html: t('Euler progressif : u₁ = u₀ + h·f(t₀, u₀), avec f(t, u) = {v1}.', { v1: fShow(d.lam, d.g) }) },
      { kind: 'eq', math: String(u1), ...blankBy(String(u1), [String(u1)]), note: t('u₁ par Euler progressif'), subgoal: 'step' },
      { kind: 'segment', html: t('Euler rétrograde : u₁ = u₀ + h·f(t₁, u₁), soit u₁ = {u0} + {h}·({lam}u₁{v1}). On isole u₁.', { u0: d.u0, h: nice(d.h), lam: R(d.lam), v1: d.g === 0 ? '' : ` + ${nice(g1)}` }), ask: 'u₁ =', start: { math: 'u_1' }, judge: { kind: 'value', expect: String(r1), form: 'irreducible', ode: d.phiOf('ER') } },
      { kind: 'eq', math: erLine, ...blankBy(erLine, [`1-${h}×(${d.lam})`]), note: '(1 − hλ)u₁ = u₀ + h·g(t₁)', subgoal: 'implicit' },
      { kind: 'eq', math: String(r1), ...blankBy(String(r1), [String(r1)]), note: t('u₁ par Euler rétrograde'), subgoal: 'implicit' },
    ],
    hints: H(t('Progressif : la pente au début du pas ; rétrograde : la pente à la fin, où u₁ est inconnu.'),
      t('Rétrograde : u₁ = {u0} + {h}·f({t1} ; □)', { u0: d.u0, h: nice(d.h), t1: nice(t1) }),
      t('u₁ = {u1} (progressif) ; u₁ = {r1} (rétrograde).', { u1: nice(u1), r1: nice(r1) })),
    subgoals: SUB, key: `${EU}:1:${d.f}:${h}:${d.u0}`, baits: ['n_implicit_as_explicit'], fallback: d.fallback,
  });
}

// ---------- L2 and L4: tables ----------

function tableLevel(rng, level) {
  const scheme = level === 2 ? 'EP' : 'ER';
  const d = odeData(rng);
  const rows = d.rows[scheme];
  const phi = { ...d.phiOf(scheme), tol: 1e-9 };
  const name = scheme === 'EP' ? t('Euler progressif : uₙ₊₁ = uₙ + h·f(tₙ, uₙ)') : t('Euler rétrograde : uₙ₊₁ = uₙ + h·f(tₙ₊₁, uₙ₊₁)');
  let then = null;
  if (level === 4) {
    const e2 = d.rows.EP[2].u;
    then = linesItem({
      skill: EU, level: 4, mode: 'free', keys: KEYS,
      prompt: t('Avec Euler progressif, sur le même problème, combien vaut u₂ ? (La solution exacte donne u({v1}) ≈ {v2}.)', { v1: nice(rows[2].t), v2: String(exactSol(d, rows[2].t.valueOf()).toFixed(4)).replace('.', ',') }),
      start: 'u_2', judge: { kind: 'value', expect: String(e2), form: 'irreducible', ode: d.phiOf('EP') },
      script: [
        { kind: 'eq', math: `${d.rows.EP[1].u}+${d.h}×(${fNum(d, d.h, d.rows.EP[1].u)})`, note: 'u₂ = u₁ + h·f(t₁, u₁)', subgoal: 'step' },
        { kind: 'eq', math: String(e2), note: t('u₂ par Euler progressif'), subgoal: 'step' },
      ],
      hints: [], noHints: true, subgoals: SUB, key: `${EU}:4then:${d.f}:${d.h}:${d.u0}`,
    });
  }
  return iterTable({
    skill: EU, level, key: `${level}:${d.f}:${d.h}:${d.u0}`, n: 3,
    cols: [{ id: 't', label: 'tₙ' }, { id: 'u', label: 'uₙ' }],
    prompt: scheme === 'ER'
      ? t('{pb}. {name}. Remplis le tableau (fractions exactes, ou décimaux exacts). f est affine en u : chaque pas est une équation du premier degré.', { pb: problemText(d), name })
      : t('{pb}. {name}. Remplis le tableau (fractions exactes, ou décimaux exacts).', { pb: problemText(d), name }),
    phi, given: (k, id) => k === 0 || id === 't', then,
    hints: H(scheme === 'EP' ? t('Chaque ligne se calcule à partir de la ligne d\'avant : uₙ₊₁ = uₙ + h·f(tₙ, uₙ).') : t('Écris uₙ₊₁ = uₙ + h·(λuₙ₊₁ + g(tₙ₊₁)), puis isole uₙ₊₁.'),
      scheme === 'EP' ? `u₁ = ${d.u0} + ${nice(d.h)}·(□)` : `(1 − ${nice(d.h)}·(${R(d.lam)}))·u₁ = ${d.u0} + ${nice(d.h)}·□`,
      `u₁ = ${nice(rows[1].u)}, u₂ = ${nice(rows[2].u)}.`),
    subgoals: SUB, baits: scheme === 'ER' ? ['n_implicit_as_explicit'] : [], fallback: d.fallback,
  });
}

// ---------- L3: where is f evaluated? ----------

function level3(rng) {
  const d = odeData(rng);
  const r1 = d.rows.ER[1].u;
  const g1 = gAt(d.g, d.h);
  return linesItem({
    skill: EU, level: 3, mode: 'tap', keys: KEYS,
    prompt: t('{d}. Fais un pas d\'Euler rétrograde : u₁ = ?', { d: problemText(d) }),
    start: 'u_1',
    judge: { kind: 'value', expect: String(r1), form: 'irreducible', ode: d.phiOf('ER') },
    script: [
      {
        kind: 'decision', prompt: t('Euler rétrograde : en quel point évalue-t-on f ?'), options: [
          { id: 'new', label: t('f(t₁, u₁) : le nouveau point, u₁ inconnu'), valid: true, ref: true },
          { id: 'old', label: t('f(t₀, u₀) : le point de départ'), valid: false, rule: 'n_implicit_as_explicit', why: t('C\'est Euler progressif. Le rétrograde évalue f au nouveau point : il faut résoudre une équation en u₁.') },
          { id: 'mix', label: t('f(t₁, u₀) : le nouveau temps, l\'ancienne valeur'), valid: false, rule: 'n_euler_time_index', why: t('Le temps et la valeur doivent être ceux du même instant : (t₁, u₁).') },
        ],
      },
      { kind: 'eq', math: `(${d.u0}+${d.h}×${g1})/(1-${d.h}×(${d.lam}))`, note: t('u₁ = {u0} + {h}·({lam}u₁{v1}), on isole u₁', { u0: d.u0, h: nice(d.h), lam: R(d.lam), v1: d.g === 0 ? '' : ` + ${nice(g1)}` }), subgoal: 'implicit' },
      { kind: 'eq', math: String(r1), note: 'u₁', subgoal: 'implicit' },
    ],
    hints: H(t('Rétrograde : la pente de la fin du pas, f(t₁, u₁), avec u₁ inconnu.'),
      `(1 − ${nice(d.h)}·(${R(d.lam)}))·u₁ = □`,
      `u₁ = ${nice(r1)}.`),
    subgoals: SUB, key: `${EU}:3:${d.f}:${d.h}:${d.u0}`, baits: ['n_implicit_as_explicit', 'n_euler_time_index'], fallback: d.fallback,
  });
}

// ---------- L5: the program, then the table of errors ----------

export const EULER = refCode(`def euler(f, t0, u0, T, N):
    h = (T - t0) / N
    t = t0
    u = u0
    for n in range(N):
        u = «u + h * f(t, u)»
        t = «t + h»
    return u

def euler_implicit_linear(lam, g, t0, u0, T, N):
    # u' = lam * u + g(t) : le schema retrograde se resout a la main
    h = (T - t0) / N
    t = t0
    u = u0
    for n in range(N):
        t = t + h
        u = «(u + h * g(t)) / (1 - h * lam)»
    return u
`);
export const EULER_TRAPS = {
  0: [{ text: 'u + h * f(t + h, u)', rule: 'n_euler_time_index' }],
  2: [{ text: 'u + h * (lam * u + g(t))', rule: 'n_implicit_as_explicit' }],
};
export const EULER_FILLERS = { 0: ['u + f(t, u)', 'h * f(t, u)'], 1: ['t + 1', 'h'], 2: ['(u + h * g(t)) / (1 + h * lam)', 'u / (1 - h * lam)'] };
export const EULER_TESTS = [
  { setup: 'def f(t, u): return -2*u', expr: 'euler(f, 0, 1.0, 0.2, 2)', expect: '0.64', tol: 1e-12 },
  { setup: 'def f(t, u): return t', expr: 'euler(f, 0, 0.0, 1, 2)', expect: '0.25', tol: 1e-12 },
  { setup: 'def g(t): return 0.0', expr: 'euler_implicit_linear(-2, g, 0, 1.0, 0.1, 1)', expect: '0.8333333333333334', tol: 1e-12 },
  { setup: 'def f(t, u): return 2/15*u*(1 - u/1000)', expr: 'euler(f, 0, 100.0, 100, 20)', expect: '999.9999441414363', tol: 1e-9 },
  { setup: 'def g(t): return 50*math.cos(t)', expr: 'euler_implicit_linear(-50, g, 0, 0.0, 1, 20)', expect: '0.5566157093851379', tol: 1e-9 },
];

export function sqrtReadtable(rng, level, { heun = false } = {}) {
  const T = sqrtTable();
  const columns = ['N', t('Euler progressif'), t('Euler rétrograde'), ...(heun ? ['Heun'] : [])];
  const rows = T.map((r) => [String(r.N), e4(r.EP), e4(r.ER), ...(heun ? [e4(r.Heun)] : [])]);
  const options = heun ? [
    { html: t('Heun est d\'ordre 2 : son erreur est divisée par 4 quand N double'), correct: true },
    { html: t('Euler progressif et Euler rétrograde sont d\'ordre 1'), correct: true },
    { html: t('Heun est d\'ordre 4, comme Runge-Kutta'), correct: false },
    { html: t('Euler rétrograde est d\'ordre 2, parce qu\'il est implicite'), correct: false, rule: 'n_global_error_order' },
  ] : [
    { html: t('Les deux schémas sont d\'ordre 1'), correct: true },
    { html: t('Quand N double, l\'erreur est environ divisée par 2'), correct: true },
    { html: t('L\'erreur globale est d\'ordre 2, comme l\'erreur locale h²/2'), correct: false, rule: 'n_global_error_order' },
    { html: t('Euler rétrograde est plus précis, parce qu\'il est implicite'), correct: false },
  ];
  const question = multiMcq({
    skill: heun ? 'n-ode-rk' : EU, level, key: `${heun ? 'rk' : 'eu'}:sqrt`,
    prompt: t('Que montre ce tableau ?'), options,
    solution: [{ html: heun
      ? t('De N = 50 à N = 100, l\'erreur d\'Euler passe de {a} à {b} : divisée par 2, ordre 1. Celle de Heun passe de {c} à {d} : divisée par 4, ordre 2.', { a: e4(T[0].EP), b: e4(T[1].EP), c: e4(T[0].Heun), d: e4(T[1].Heun) })
      : t('De N = 50 à N = 100, l\'erreur d\'Euler passe de {a} à {b} : divisée par 2, ordre 1.', { a: e4(T[0].EP), b: e4(T[1].EP) }), note: '' }],
  }, rng);
  return readtableItem({
    skill: heun ? 'n-ode-rk' : EU, level, key: `sqrt:${heun}`,
    prompt: t('u′ = √u/(1 + t²) sur [0 ; 20], u(0) = 1, de solution exacte (1 + ½·arctan t)². Erreur E = max |u(tₙ) − uₙ| pour N pas (h = 20/N) :'),
    table: { columns, rows }, question,
    hints: H(t('Quand N double, h est divisé par 2 : regarde par combien l\'erreur est divisée.'), t('Rapport des erreurs pour N = 50 et 100 : □ ≈ 2ᵖ'), t('Divisée par 2 : ordre 1.')),
  });
}

function level5(rng) {
  return codeItem({
    skill: EU, level: 5, ref: EULER, blanks: [0, 1, 2], traps: EULER_TRAPS, rng,
    prompt: t('Complète Euler progressif pour u′ = f(t, u), puis Euler rétrograde pour u′ = λu + g(t), qui se résout à la main.'),
    tests: EULER_TESTS, then: sqrtReadtable(rng, 5),
    hints: [], subgoals: SUB, key: '5',
  });
}

// ---------- exam ----------

function examMcq(rng, opts) {
  if (rng.chance(0.5)) {
    const d = odeData(rng, { gs: [0] });
    const r1 = d.rows.ER[1].u;
    const h = d.h;
    const ep = d.rows.EP[1].u;
    const sign = q(d.u0).div(q(1).add(h.mul(d.lam)));
    const mult = q(d.u0).mul(q(1).sub(h.mul(d.lam)));
    return mcqDistinct({
      skill: EU, level: 4, key: `${EU}:mcq:${d.lam}:${h}:${d.u0}`, exam: examTag(opts),
      prompt: t('u′ = {v1}, u(0) = {u0}, h = {h}. Euler rétrograde donne u₁ =', { v1: fShow(d.lam, 0), u0: d.u0, h: nice(h) }),
      right: nice(r1),
      wrongs: [{ html: nice(ep), rule: 'n_implicit_as_explicit' }, { html: nice(sign) }, { html: nice(mult) }],
      fillers: [{ html: nice(q(d.u0)) }],
      solution: [{ html: t('u₁ = {u0} + {h}·({lam})u₁, donc u₁ = {u0}/(1 + {v1}) = {r1}.', { u0: d.u0, h: nice(h), lam: R(d.lam), v1: nice(h.mul(-d.lam)), r1: nice(r1) }), note: '' }],
    }, rng);
  }
  return mcq({
    skill: EU, level: 4, key: `${EU}:mcq:equation`, exam: examTag(opts),
    prompt: t('Pour u′ = f(t, u), quelle équation en v = uₙ₊₁ résout-on à chaque pas d\'Euler rétrograde ?'),
    options: [
      { html: 'v − uₙ − h·f(tₙ₊₁, v) = 0', correct: true },
      { html: 'v − uₙ − h·f(tₙ, uₙ) = 0', correct: false, rule: 'n_implicit_as_explicit' },
      { html: 'v − uₙ − h·f(tₙ₊₁, uₙ) = 0', correct: false, rule: 'n_euler_time_index' },
      { html: 'v − uₙ + h·f(tₙ₊₁, v) = 0', correct: false },
    ],
    solution: [{ html: t('Euler rétrograde : uₙ₊₁ = uₙ + h·f(tₙ₊₁, uₙ₊₁) ; l\'inconnue est dans f, on résout F(v) = v − uₙ − h·f(tₙ₊₁, v) = 0 (par Newton si f n\'est pas linéaire).'), note: '' }],
  }, rng);
}

function examTf(rng, opts) {
  if (rng.chance(0.5)) {
    return vfMcq({
      skill: EU, key: `${EU}:tf:explicit`, exam: examTag(opts), truth: false, ruleIfTrue: 'n_implicit_as_explicit',
      statement: t('Le schéma d\'Euler rétrograde uₙ₊₁ = uₙ + h·f(tₙ₊₁, uₙ₊₁) est explicite.'),
      explanation: t('Faux : uₙ₊₁ figure dans f ; à chaque pas, on résout une équation (implicite).'),
    }, rng);
  }
  const lam = rng.pick([-10, -20, -50]);
  return tfItem({
    skill: EU, level: 4, key: `epdec:${lam}`, exam: examTag(opts),
    statement: t('Pour u′ = λu avec λ &lt; 0, Euler progressif donne une suite |uₙ| décroissante, quel que soit le pas h > 0.'),
    truth: false,
    counter: { kind: 'num', prop: 'epNotDecreasing', params: {}, ask: [{ v: 'lambda', label: 'λ =' }, { v: 'h', label: 'h =' }], answer: { lambda: String(lam), h: '1' } },
    explanation: t('Faux : uₙ₊₁ = (1 + hλ)uₙ ; avec λ = {lam} et h = 1, |1 + hλ| = {v1} > 1 et |uₙ| grandit.', { lam: R(lam), v1: -lam - 1 }),
  });
}

export const GEN = {
  [EU]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return examMcq(rng, opts);
    if (opts.exam === 'tf') return examTf(rng, opts);
    switch (level) {
      case 1: return level1(rng);
      case 2: return tableLevel(rng, 2);
      case 3: return level3(rng);
      case 4: return tableLevel(rng, 4);
      default: return level5(rng);
    }
  },
};

export { fAtText };

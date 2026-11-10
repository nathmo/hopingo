// Generators of module P, part c (unit `proba`, step U7): covariance and
// correlation, total expectation, sums and mixtures, Markov and Chebyshev,
// central limit theorem (this file); estimators — moments, maximum
// likelihood, bias, Fisher information (proba-c-est.js). Catalogue:
// docs/universite/P-probabilites.md. Skills: proba-c.skills.js; traps:
// js/cas/rules/pc.js; tools: proba-kit.js, proba-c-kit.js.
//
// Each item is a suite of named values (one part each), judged by `prob`
// (exact) or `stat` (approximate, table readings accepted), with the
// student's earlier values carried forward ($name). Levels: 1–2 guided
// (blanks, decisions shown then chosen), 3 « choose the action », 4 free
// with three hints, 5 alone.

import { statItem, coefItem, openItem, choice, tf, numCounter, H, KEYS, SM, examTag } from './proba-kit.js';
import { Phi, phiAccepted, phiInvTable, PhiInv, roundTo } from '../../cas/stats.js';
import { q, J, T, S, F, FS, FJ, qd, L, P, PS, thenValue } from './proba-c-kit.js';
import { GEN as EST } from './proba-c-est.js';

const GK = ['calc', 'stat', 'greek', 'calcfn'];

// ======================================================================
// p-cov-corr
// ======================================================================

const CC = 'p-cov-corr';
const CC_SUB = [
  { id: 'cov', label: 'covariance', skill: 'p-lin-combo' },
  { id: 'corr', label: 'corrélation', skill: CC },
];
const RHOS = ['1/5', '1/4', '2/5', '1/2', '3/5', '3/4', '4/5'];
// aX + b as text: 2X + 1, −Y, 3X − 2.
function aff(a, V, b) {
  const lead = a === 1 ? V : a === -1 ? `−${V}` : `${S(a)}${V}`;
  return b ? `${lead} ${b > 0 ? '+' : '−'} ${Math.abs(b)}` : lead;
}

function ccData(rng) {
  for (;;) {
    const sx = rng.int(1, 5);
    const sy = rng.int(1, 5);
    const r = q(...rng.pick(RHOS).split('/').map(Number)).mul(rng.pick([1, 1, -1]));
    const cov = r.mul(sx * sy);
    if (cov.toDecimal() === null || sx === sy && rng.chance(0.5)) continue;
    let a = 0;
    let c = 0;
    while (!a) a = rng.int(-3, 3);
    while (!c) c = rng.int(-3, 3);
    const b = rng.int(-5, 5);
    const d = rng.int(-5, 5);
    const ex = rng.int(-3, 5);
    const ey = rng.int(-3, 5);
    return { sx, sy, vx: sx * sx, vy: sy * sy, r, cov, a, b, c, d, ex, ey, exy: cov.add(ex * ey) };
  }
}

function ccParts(d, level, withExy) {
  const parts = [];
  const sign = d.a * d.c > 0 ? 1 : -1;
  const X = aff(d.a, 'X', d.b);
  const Y = aff(d.c, 'Y', d.d);
  if (withExy) {
    parts.push({ label: 'cov(X, Y)', name: 'cv', kind: 'prob', expect: J(d.cov), action: 'Covariance : E[XY] − E[X]·E[Y]',
      lines: [L(`${T(d.exy)}-${P(d.ex)}×${P(d.ey)}`, 'cov = E[XY] − E[X]E[Y]', 'cov', [`${P(d.ex)}×${P(d.ey)}`]), L(T(d.cov), 'Calculer', 'cov', [T(d.cov)])] });
  }
  const cv = withExy ? '$cv' : J(d.cov);
  parts.push({ label: 'corr(X, Y)', name: 'r', kind: 'prob', expect: `${cv}/(${d.sx}×${d.sy})`, action: 'Normaliser : diviser par σ_X·σ_Y',
    wrongActions: [{ label: 'Diviser par var X · var Y', why: 'On divise par le produit des écarts-types, pas des variances.' }],
    lines: [L(`${P(d.cov)}/(${d.sx}×${d.sy})`, `σ_X = √${d.vx} = ${d.sx}, σ_Y = √${d.vy} = ${d.sy}`, 'corr', [`${d.sx}×${d.sy}`]), L(T(d.r), 'Calculer', 'corr', [T(d.r)])] });
  parts.push({ label: `cov(${X}, ${Y})`, name: 'cab', kind: 'prob', expect: `${d.a}×${d.c}×${withExy ? '$cv' : J(d.cov)}`, action: 'Sortir les constantes : a·c·cov(X, Y)',
    wrongActions: [{ label: 'Ajouter les constantes b et d', why: 'Une constante ajoutée ne change pas la covariance.' }],
    lines: [L(`${P(d.a)}×${P(d.c)}×${P(d.cov)}`, 'cov(aX + b, cY + d) = ac·cov(X, Y)', 'cov', [`${P(d.a)}×${P(d.c)}`]), L(T(d.cov.mul(d.a * d.c)), 'Calculer', 'cov', [T(d.cov.mul(d.a * d.c))])] });
  const rab = d.r.mul(sign);
  const traps = { p_corr_scale: { values: [J(d.cov.mul(d.a * d.c)), J(d.r.mul(d.a * d.c))].filter((v) => v !== J(rab)), ctx: {} } };
  parts.push({ label: `corr(${X}, ${Y})`, name: 'rab', kind: 'prob', expect: `${sign}×$r`, traps, action: 'Garder le signe de a·c',
    wrongActions: [{ label: 'Multiplier la corrélation par a·c', rule: 'p_corr_scale', why: 'La corrélation ne change pas d\'échelle : seul le signe de a·c compte.' }],
    lines: [L(T(rab), `Le signe de a·c = ${S(d.a * d.c)} ; la corrélation garde sa taille`, 'corr', [T(rab)])] });
  if (level >= 3 && level <= 4) {
    parts.push({ label: 'cov(X + Y, X − Y)', name: 'cxy', kind: 'prob', expect: String(d.vx - d.vy), action: 'Développer : cov(X + Y, X − Y) = var X − var Y',
      lines: [L(`${d.vx}-${d.vy}`, 'Les termes cov(X, Y) s\'annulent', 'cov', [String(d.vy)]), L(String(d.vx - d.vy), 'Calculer', 'cov')] });
  }
  return parts;
}

function ccInterpret(d) {
  const pos = d.r.n > 0;
  return {
    prompt: `Interpréter : corr(X, Y) = ${S(d.r)}. Quelle phrase est juste ?`,
    options: [
      { html: pos ? 'Quand X est grand, Y a tendance à être grand aussi : un lien linéaire croissant.' : 'Quand X est grand, Y a tendance à être petit : un lien linéaire décroissant.', correct: true },
      { html: 'Les variations de X sont la cause des variations de Y.', correct: false, rule: 'p_corr_causal' },
      { html: `Y = ${S(d.r)}·X : la corrélation est la pente de la droite.`, correct: false, rule: 'p_corr_slope' },
      { html: `Une part ${S(d.r.n < 0 ? d.r.neg() : d.r)} de Y est expliquée par X.`, correct: false, rule: 'p_r2_r' },
    ],
  };
}

function ccItem(level, rng, profile, opts = {}) {
  const d = ccData(rng);
  const X = aff(d.a, 'X', d.b);
  const Y = aff(d.c, 'Y', d.d);
  const withExy = level >= 2 && rng.chance(0.5);
  const given = withExy ? `E[X] = ${S(d.ex)}, E[Y] = ${S(d.ey)}, E[XY] = ${S(d.exy)}` : `cov(X, Y) = ${S(d.cov)}`;
  const prompt = `On sait que var X = ${d.vx}, var Y = ${d.vy} et ${given}. Calcule la corrélation de X et Y, puis la covariance et la corrélation de ${X} et ${Y}.`;
  if (opts.exam === 'mcq') {
    const sign = d.a * d.c > 0 ? 1 : -1;
    const right = d.r.mul(sign);
    return choice({
      skill: CC, level: 4, key: `mcq:${d.vx}:${d.vy}:${T(d.cov)}:${d.a}:${d.c}`, exam: examTag(opts),
      prompt: `var X = ${d.vx}, var Y = ${d.vy}, cov(X, Y) = ${S(d.cov)}. Que vaut corr(${X}, ${Y}) ?`,
      right: S(right),
      wrongs: [{ html: S(d.cov.mul(d.a * d.c)), rule: 'p_corr_scale' }, { html: S(d.r.mul(d.a * d.c)), rule: 'p_corr_scale' }],
      fillers: [{ html: S(right.neg()) }, { html: S(d.cov) }, { html: S(d.cov.mul(sign)) }, { html: S(right.div(2)) }],
    }, rng);
  }
  if (opts.exam === 'tf') {
    const k = rng.int(0, 2);
    if (k === 0) {
      return tf({
        skill: CC, key: `aff:${T(d.r)}`, exam: examTag(opts), truth: false, ruleIfTrue: 'p_corr_scale',
        statement: `Si corr(X, Y) = ${S(d.r)}, alors corr(aX + b, cY + d) = a·c·${PS(d.r)} pour tous a, c ≠ 0.`,
        explanation: `corr(aX + b, cY + d) = signe(ac)·corr(X, Y) : avec a = 2 et c = 1, on trouve ${S(d.r)}, pas ${S(d.r.mul(2))}.`,
        counter: numCounter({ vars: [{ v: 'a', label: 'a =' }, { v: 'c', label: 'c =' }], hyp: 'a×c≠0', pred: `a×c×(${T(d.r)})=(${T(d.r)})×(a×c)/|a×c|`, answer: { a: '2', c: '1' } }),
      });
    }
    if (k === 1) {
      return tf({ skill: CC, key: `bound:${T(d.r)}`, exam: examTag(opts), truth: true, ruleIfFalse: null,
        statement: 'Pour toutes variables X, Y de variances non nulles, −1 ≤ corr(X, Y) ≤ 1.', explanation: 'C\'est l\'inégalité de Cauchy-Schwarz : |cov(X, Y)| ≤ σ_X·σ_Y.' });
    }
    return tf({ skill: CC, key: `xpy:${d.vx}:${d.vy}`, exam: examTag(opts), truth: true,
      statement: `Si var X = ${d.vx} et var Y = ${d.vy}, alors cov(X + Y, X − Y) = ${d.vx - d.vy}.`,
      explanation: 'cov(X + Y, X − Y) = var X − cov(X, Y) + cov(Y, X) − var Y = var X − var Y.' });
  }
  const parts = ccParts(d, level, withExy);
  const o = {
    skill: CC, level, key: `${level}:${d.vx}:${d.vy}:${T(d.cov)}:${d.a}:${d.b}:${d.c}:${d.d}:${withExy}`, prompt, parts,
    hints: H('corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance.',
      SM(`${P(d.cov)}/(□×□)`), `corr(X, Y) = ${S(d.r)} ; cov(${X}, ${Y}) = ${S(d.cov.mul(d.a * d.c))} ; corr(${X}, ${Y}) = ${S(d.r.mul(d.a * d.c > 0 ? 1 : -1))}`),
    subgoals: CC_SUB, interpret: ccInterpret(d), exam: examTag(opts),
  };
  if (opts.exam === 'coef') {
    // The coef variant asks one value, and its prompt says which.
    const part = parts.find((x) => x.label === 'corr(X, Y)') ?? parts[parts.length - 1];
    return coefItem({ ...o, part, prompt: `${prompt.split(' Calcule')[0]} Que vaut la corrélation corr(X, Y) ?` });
  }
  return statItem(o);
}

// ======================================================================
// p-total-expect
// ======================================================================

const TE = 'p-total-expect';
const TE_SUB = [
  { id: 'cond', label: 'lois conditionnelles', skill: 'p-binom' },
  { id: 'weight', label: 'pondérer', skill: 'p-cond-total' },
  { id: 'total', label: 'formule totale', skill: TE },
];

function teData(rng) {
  for (;;) {
    const pi = qd(rng.pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]));
    const n = rng.int(3, 10);
    const p1 = qd(rng.int(1, 9) / 10);
    const p2 = qd(rng.int(1, 9) / 10);
    if (p1.eq(p2)) continue;
    const pj = q(1).sub(pi);
    const e1 = p1.mul(n);
    const e2 = p2.mul(n);
    const v1 = e1.mul(q(1).sub(p1));
    const v2 = e2.mul(q(1).sub(p2));
    const e = pi.mul(e1).add(pj.mul(e2));
    const ev = pi.mul(v1).add(pj.mul(v2));
    const ve = pi.mul(pj).mul(e2.sub(e1).mul(e2.sub(e1)));
    const names = rng.pick([['Mary', 'Frank'], ['Anne', 'Bruno'], ['Léa', 'Marc']]);
    return { pi, pj, n, p1, p2, e1, e2, v1, v2, e, ev, ve, v: ev.add(ve), names };
  }
}

function teParts(d, level) {
  const [A, B] = d.names;
  const decisions = level >= 2 ? [] : [];
  return [
    { label: `E[N | ${A}]`, name: 'ea', kind: 'prob', expect: J(d.e1), action: 'Espérance sachant l\'examinateur', decisions: [
      { prompt: `Quelle est la loi de N quand ${A} interroge ?`, levels: [1, 2, 3], options: [
        { id: 'b', label: `N | ${A} ~ B(${d.n} ; ${S(d.p1)})`, valid: true },
        { id: 'p', label: `N | ${A} ~ B(${d.n} ; ${S(d.pi.mul(d.p1))})`, valid: false, why: `Sachant que ${A} interroge, chaque question est réussie avec la probabilité ${S(d.p1)} : le choix de l'examinateur est déjà fait.` },
      ] }, ...decisions],
      lines: [L(`${d.n}×${T(d.p1)}`, `N | ${A} ~ B(${d.n} ; ${S(d.p1)}) : E = np`, 'cond', [T(d.p1)]), L(T(d.e1), 'Calculer', 'cond', [T(d.e1)])] },
    { label: `E[N | ${B}]`, name: 'eb', kind: 'prob', expect: J(d.e2), action: 'Espérance sachant l\'examinateur',
      lines: [L(`${d.n}×${T(d.p2)}`, `N | ${B} ~ B(${d.n} ; ${S(d.p2)})`, 'cond', [T(d.p2)]), L(T(d.e2), 'Calculer', 'cond', [T(d.e2)])] },
    { label: 'E[N]', name: 'e', kind: 'prob', expect: `${J(d.pi)}×$ea+${J(d.pj)}×$eb`, action: 'Pondérer par les probabilités des examinateurs',
      traps: { p_total_expect_unweighted: { values: [J(d.e1.add(d.e2).div(2))], ctx: { p: S(d.pi) } } },
      wrongActions: [{ label: 'Faire la moyenne des deux espérances', rule: 'p_total_expect_unweighted', why: 'Les deux examinateurs n\'interrogent pas aussi souvent : on pondère.' }],
      lines: [L(`${T(d.pi)}×${T(d.e1)}+${T(d.pj)}×${T(d.e2)}`, 'E[N] = Σ E[N | y]·Pr(y)', 'weight', [T(d.pi), T(d.pj)]), L(T(d.e), 'Espérance totale', 'total', [T(d.e)])] },
    { label: 'E[var(N | ·)]', name: 'ev', kind: 'prob', expect: J(d.ev), action: 'Moyenne des variances conditionnelles',
      lines: [L(`${T(d.pi)}×${d.n}×${T(d.p1)}×${T(q(1).sub(d.p1))}+${T(d.pj)}×${d.n}×${T(d.p2)}×${T(q(1).sub(d.p2))}`, 'var(N | y) = np(1 − p), pondérée', 'weight', [T(q(1).sub(d.p1)), T(q(1).sub(d.p2))]), L(T(d.ev), 'Moyenne des variances', 'total', [T(d.ev)])] },
    { label: 'var(E[N | ·])', name: 've', kind: 'prob', expect: `${J(d.pi)}×${J(d.pj)}×($eb-$ea)^2`, action: 'Variance des espérances conditionnelles',
      lines: [L(`${T(d.pi)}×${T(d.pj)}×(${T(d.e2)}-${T(d.e1)})^2`, 'Deux valeurs : π(1 − π)·(écart)²', 'total', [`(${T(d.e2)}-${T(d.e1)})^2`]), L(T(d.ve), 'Variance des moyennes', 'total', [T(d.ve)])] },
    { label: 'var(N)', name: 'v', kind: 'prob', expect: '$ev+$ve', action: 'Additionner : moyenne des variances + variance des moyennes',
      traps: { p_total_var_forget: { values: [J(d.ev)], ctx: { v: S(d.ve) } } },
      wrongActions: [{ label: 'Garder seulement la moyenne des variances', rule: 'p_total_var_forget', why: 'Le choix de l\'examinateur ajoute sa propre variance : var(E[N | ·]).' }],
      lines: [L(`${T(d.ev)}+${T(d.ve)}`, 'var = E[var(N | ·)] + var(E[N | ·])', 'total', [T(d.ve)]), L(T(d.v), 'Variance totale', 'total', [T(d.v)])] },
  ];
}

// R ~ U(0, a), X | R ~ U(0, R): E[X] = a/4, var(X) = a²/36 + a²/48 = 7a²/144.
function teNested(level, rng, opts) {
  const a = rng.pick([1, 2, 3, 6, 12]);
  const a2 = a * a;
  const parts = [
    { label: 'E[X]', name: 'e', kind: 'prob', expect: J(q(a, 4)), action: 'E[X] = E[E[X | R]] = E[R/2]',
      lines: [L(`${a}/2/2`, 'E[X | R] = R/2, et E[R] = a/2', 'total'), L(T(q(a, 4)), 'Espérance totale', 'total')] },
    { label: 'E[var(X | R)]', name: 'ev', kind: 'prob', expect: J(q(a2, 36)), action: 'var(X | R) = R²/12, puis E[R²] = a²/3',
      lines: [L(`${a2}/3/12`, 'E[R²/12] = E[R²]/12', 'total'), L(T(q(a2, 36)), 'Moyenne des variances', 'total')] },
    { label: 'var(E[X | R])', name: 've', kind: 'prob', expect: J(q(a2, 48)), action: 'var(R/2) = var(R)/4',
      lines: [L(`${a2}/12/4`, 'var(R) = a²/12', 'total'), L(T(q(a2, 48)), 'Variance des moyennes', 'total')] },
    { label: 'var(X)', name: 'v', kind: 'prob', expect: '$ev+$ve', traps: { p_total_var_forget: { values: [J(q(a2, 36))], ctx: { v: S(q(a2, 48)) } } }, action: 'Additionner',
      lines: [L(`${T(q(a2, 36))}+${T(q(a2, 48))}`, 'Variance totale', 'total'), L(T(q(7 * a2, 144)), 'Calculer', 'total')] },
  ];
  const o = {
    skill: TE, level, key: `${level}:nested:${a}`, parts, subgoals: TE_SUB,
    prompt: `Le retard R de Jo (en heures) suit U(0, ${a}). Sachant R, le retard X du bus suit U(0, R). Calcule E[X] et var(X) par les formules totales.`,
    hints: H('Conditionne par R : E[X | R] = R/2 et var(X | R) = R²/12 ; puis prends l\'espérance et la variance en R.', SM(`${T(q(a2, 36))}+□`), `var(X) = ${S(q(7 * a2, 144))}`),
    exam: examTag(opts),
  };
  return o;
}

function teItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) return tf({ skill: TE, key: 'vargeq', exam: examTag(opts), truth: true, statement: 'Pour toutes variables X, Y : var(X) ≥ E[var(X | Y)].', explanation: 'var(X) = E[var(X | Y)] + var(E[X | Y]), et une variance est positive.' });
    const d = teData(rng);
    return tf({
      skill: TE, key: `unw:${T(d.pi)}`, exam: examTag(opts), truth: false, ruleIfTrue: 'p_total_expect_unweighted',
      statement: 'Si Y prend deux valeurs a et b, alors E[X] = (E[X | Y = a] + E[X | Y = b])/2.',
      explanation: `E[X] = p·E[X | Y = a] + (1 − p)·E[X | Y = b] avec p = Pr(Y = a) : la moyenne simple n'est juste que si p = 1/2. Par exemple p = 0,8, u = 1, v = 2 : 1,2 ≠ 1,5.`,
      counter: numCounter({ vars: [{ v: 'p', label: 'Pr(Y = a) = p =' }, { v: 'u', label: 'E[X | Y = a] = u =' }, { v: 'w', label: 'E[X | Y = b] = w =' }], hyp: 'p>0∧p<1', pred: 'p×u+(1-p)×w=(u+w)/2', answer: { p: '0,8', u: '1', w: '2' } }),
    });
  }
  const d = teData(rng);
  if (opts.exam === 'mcq') {
    const [A, B] = d.names;
    const story = `${A} interroge avec la probabilité ${S(d.pi)}, ${B} sinon. Avec ${A}, chacune des ${d.n} questions est réussie avec la probabilité ${S(d.p1)} ; avec ${B}, ${S(d.p2)}, indépendamment.`;
    if (rng.chance(0.5)) {
      return choice({ skill: TE, level: 4, key: `mcqE:${T(d.pi)}:${d.n}:${T(d.p1)}:${T(d.p2)}`, exam: examTag(opts),
        prompt: `${story} N = nombre de bonnes réponses. E[N] = ?`, right: S(d.e),
        wrongs: [{ html: S(d.e1.add(d.e2).div(2)), rule: 'p_total_expect_unweighted' }],
        fillers: [{ html: S(d.pi.mul(d.e2).add(d.pj.mul(d.e1))) }, { html: S(d.e1.add(d.e2)) }, { html: S(d.e.add(1)) }] }, rng);
    }
    return choice({ skill: TE, level: 4, key: `mcqV:${T(d.pi)}:${d.n}:${T(d.p1)}:${T(d.p2)}`, exam: examTag(opts),
      prompt: `${story} N = nombre de bonnes réponses. var(N) = ?`, right: S(d.v),
      wrongs: [{ html: S(d.ev), rule: 'p_total_var_forget' }, { html: S(d.v1.add(d.v2).div(2)), rule: 'p_total_expect_unweighted' }],
      fillers: [{ html: S(d.ve) }, { html: S(d.v.add(1)) }, { html: S(d.v1.add(d.v2)) }] }, rng);
  }
  const [A, B] = d.names;
  const nested = (level >= 4 || opts.exam === 'open') && rng.chance(0.3);
  const o = nested ? teNested(level, rng, opts) : {
    skill: TE, level, key: `${level}:${T(d.pi)}:${d.n}:${T(d.p1)}:${T(d.p2)}`, subgoals: TE_SUB, exam: examTag(opts),
    prompt: `À un oral, ${A} interroge avec la probabilité ${S(d.pi)}, ${B} sinon. Avec ${A}, chacune des ${d.n} questions est réussie avec la probabilité ${S(d.p1)} ; avec ${B}, ${S(d.p2)}, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).`,
    parts: teParts(d, level),
    hints: H('Calcule tout sachant l\'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]).',
      SM(`${T(d.pi)}×${T(d.e1)}+${T(d.pj)}×□`), `E[N] = ${S(d.e)} ; var(N) = ${S(d.ev)} + ${S(d.ve)} = ${S(d.v)}`),
  };
  if (opts.exam === 'coef') return coefItem({ ...o, prompt: o.prompt.replace('Calcule E[N] et var(N).', 'Calcule var(N).') });
  if (opts.exam === 'open') return openItem({ ...o, key: `open:${o.key}` }, 10, rng);
  return statItem(o);
}

// ======================================================================
// p-sum-mixture
// ======================================================================

const SM_ID = 'p-sum-mixture';
const SM_SUB = [
  { id: 'mix', label: 'moments du mélange', skill: 'p-total-expect' },
  { id: 'conv', label: 'convolution', skill: SM_ID },
];

function smDice(level, rng, opts) {
  const f = rng.pick([4, 6, 6]);
  let z;
  do z = rng.int(3, 2 * f - 1); while (z === f + 1 && rng.chance(0.5));
  const pairs = [];
  for (let i = 1; i <= f; i++) if (z - i >= 1 && z - i <= f) pairs.push([i, z - i]);
  const k = pairs.length;
  return {
    skill: SM_ID, level, key: `${level}:dice:${f}:${z}`, subgoals: SM_SUB, exam: examTag(opts),
    prompt: `On lance deux dés équilibrés à ${f} faces, indépendants ; S est la somme. Calcule Pr(S = ${z}) par la convolution p_S(${z}) = Σ p(i)·p(${z} − i).`,
    parts: [
      { label: 'nombre de couples', name: 'k', kind: 'prob', expect: String(k), action: 'Lister les couples (i, z − i)',
        notes: [`Couples : ${pairs.map(([a, b]) => `(${a}, ${b})`).join(', ')}.`],
        lines: [L(pairs.map(() => '1').join('+'), 'Un terme 1/f² par couple possible', 'conv', ['1']), L(String(k), 'Compter', 'conv', [String(k)])] },
      { label: `Pr(S = ${z})`, name: 'p', kind: 'prob', expect: `$k/${f * f}`, action: 'Chaque couple a la probabilité 1/f²',
        traps: { g7_laplace_not_equiprobable: { values: [`1/${2 * f - 1}`], ctx: { what: `Les ${2 * f - 1} sommes de 2 à ${2 * f}` } } },
        wrongActions: [{ label: `Diviser 1 par le nombre de sommes possibles (${2 * f - 1})`, rule: 'g7_laplace_not_equiprobable', why: 'Les sommes ne sont pas équiprobables.' }],
        lines: [L(`${k}/${f * f}`, `${f}² = ${f * f} couples équiprobables`, 'conv', [String(f * f)]), ...(q(k, f * f).d !== f * f ? [L(T(q(k, f * f)), 'Simplifier', 'conv')] : [])] },
    ],
    hints: H('p_S(z) = Σᵢ p(i)·p(z − i) : un terme par couple (i, z − i) possible.', SM(`□/${f * f}`), `Pr(S = ${z}) = ${S(q(k, f * f))}`),
  };
}

// The density of U(0, 1) + U(0, 1) at z.
function smUnif(level, rng, opts) {
  let k;
  do k = rng.int(1, 19); while (k === 10);
  const zq = q(k, 10);
  const z = k / 10;
  const fz = z < 1 ? zq : q(2).sub(zq);
  const loq = z < 1 ? q(0) : zq.sub(1);
  const hiq = z < 1 ? zq : q(1);
  const lo = T(loq);
  const hi = T(hiq);
  return {
    skill: SM_ID, level, key: `${level}:unif:${k}`, subgoals: SM_SUB, exam: examTag(opts),
    prompt: `X et Y sont indépendantes, de loi U(0, 1). Calcule la densité de Z = X + Y en z = ${S(zq)} : f_Z(z) = ∫ f_X(z − y)·f_Y(y) dy.`,
    parts: [{
      label: `f_Z(${T(zq)})`, name: 'fz', kind: 'prob', expect: J(fz), action: 'Découper selon z : bornes max(0, z − 1) et min(1, z)',
      traps: { p_conv_bounds: { values: ['1'] }, p_sum_density_add: { values: ['2'] } },
      decisions: [{ prompt: `Pour z = ${S(zq)}, sur quel intervalle y doit-il varier ?`, options: [
        { id: 'ok', label: `y ∈ [${S(loq)} ; ${S(hiq)}] : il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1`, valid: true },
        { id: 'all', label: 'y ∈ [0 ; 1], comme f_Y', valid: false, rule: 'p_conv_bounds', why: 'Il faut aussi 0 ≤ z − y ≤ 1 : les bornes dépendent de z.' },
        { id: 'add', label: 'Pas d\'intégrale : f_Z = f_X + f_Y', valid: false, rule: 'p_sum_density_add', why: 'f_X + f_Y intègre à 2 : ce n\'est pas une densité. La somme demande une convolution.' },
      ] }],
      wrongActions: [{ label: 'Intégrer y de 0 à 1 pour tout z', rule: 'p_conv_bounds', why: 'Les bornes dépendent de z.' }, { label: 'Additionner les densités', rule: 'p_sum_density_add', why: 'f_X + f_Y n\'est pas une densité.' }],
      lines: [L(`${hi}-${lo}`, `∫ de ${lo} à ${hi} de 1 dy`, 'conv', [lo]), L(T(fz), 'Densité en triangle', 'conv', [T(fz)])],
    }],
    hints: H('Il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 : y va de max(0, z − 1) à min(1, z).', SM(`${hi}-□`), `f_Z(${S(zq)}) = ${S(fz)}`),
  };
}

function smMixData(rng) {
  for (;;) {
    const pi = qd(rng.pick([0.2, 0.3, 0.5]));
    const m1 = rng.int(-2, 6);
    const m2 = rng.int(-2, 6);
    if (m1 === m2) continue;
    const s1 = rng.pick([1, 4]);
    const s2 = rng.pick([1, 4]);
    const pj = q(1).sub(pi);
    const e = pi.mul(m1).add(pj.mul(m2));
    const m2nd = pi.mul(s1 + m1 * m1).add(pj.mul(s2 + m2 * m2));
    const v = m2nd.sub(e.mul(e));
    const vs = pi.mul(pi).mul(s1).add(pj.mul(pj).mul(s2));
    return { pi, pj, m1, m2, s1, s2, e, m2nd, v, vs };
  }
}

function smMix(level, rng, opts) {
  const d = smMixData(rng);
  const parts = [
    { label: 'E[X]', name: 'e', kind: 'prob', expect: J(d.e), action: 'Moyenne pondérée des moyennes',
      lines: [L(`${T(d.pi)}×${P(d.m1)}+${T(d.pj)}×${P(d.m2)}`, 'E = Σ πₖμₖ', 'mix', [T(d.pj)]), L(T(d.e), 'Calculer', 'mix', [T(d.e)])] },
    { label: 'E[X²]', name: 'm', kind: 'prob', expect: J(d.m2nd), action: 'Seconds moments : σₖ² + μₖ²',
      lines: [L(`${T(d.pi)}×(${d.s1}+${P(d.m1)}^2)+${T(d.pj)}×(${d.s2}+${P(d.m2)}^2)`, 'E[X²] = Σ πₖ(σₖ² + μₖ²)', 'mix', [`${P(d.m2)}^2`]), L(T(d.m2nd), 'Calculer', 'mix', [T(d.m2nd)])] },
    { label: 'var(X)', name: 'v', kind: 'prob', expect: '$m-$e^2', action: 'König-Huygens : E[X²] − E[X]²',
      traps: { p_mixture_vs_sum: { values: [J(d.vs)] } },
      wrongActions: [{ label: 'Calculer π²σ₁² + (1 − π)²σ₂²', rule: 'p_mixture_vs_sum', why: 'C\'est la variance de la somme pondérée, un autre objet.' }],
      lines: [L(`${T(d.m2nd)}-${P(d.e)}^2`, 'var = E[X²] − E[X]²', 'mix', [`${P(d.e)}^2`]), L(T(d.v), 'Variance du mélange', 'mix', [T(d.v)])] },
  ];
  if (level >= 4) {
    parts.push({ label: `var(${T(d.pi)}X₁ + ${T(d.pj)}X₂)`, name: 'vs', kind: 'prob', expect: J(d.vs), action: 'Somme pondérée : π²σ₁² + (1 − π)²σ₂²',
      decisions: level >= 5 ? [{ prompt: 'Lequel des deux a un histogramme à deux bosses (si les moyennes sont loin) ?', options: [
        { id: 'mix', label: 'Le mélange : il choisit une composante, puis tire autour de sa moyenne', valid: true },
        { id: 'sum', label: 'La somme pondérée', valid: false, rule: 'p_mixture_vs_sum', why: 'Une somme de normales indépendantes est normale : une seule bosse.' },
      ] }] : [],
      lines: [L(`${T(d.pi)}^2×${d.s1}+${T(d.pj)}^2×${d.s2}`, 'Variables indépendantes : les coefficients au carré', 'conv'), L(T(d.vs), 'Un autre objet que le mélange', 'conv')] });
  }
  return {
    skill: SM_ID, level, key: `${level}:mix:${T(d.pi)}:${d.m1}:${d.m2}:${d.s1}:${d.s2}`, subgoals: SM_SUB, exam: examTag(opts), parts,
    prompt: `X est un mélange : avec la probabilité ${S(d.pi)} on tire X selon N(${S(d.m1)}, ${d.s1}), sinon selon N(${S(d.m2)}, ${d.s2}). Calcule E[X], E[X²] et var(X)${level >= 4 ? `, puis la variance de la somme pondérée ${S(d.pi)}X₁ + ${S(d.pj)}X₂ (X₁ ~ N(${S(d.m1)}, ${d.s1}), X₂ ~ N(${S(d.m2)}, ${d.s2}) indépendantes)` : ''}.`,
    hints: H('Un mélange choisit une composante : E[X²] = Σ πₖ(σₖ² + μₖ²), puis var = E[X²] − E[X]².', SM(`${T(d.pi)}×(${d.s1}+${P(d.m1)}^2)+□`), `var(X) = ${S(d.v)}`),
  };
}

function smExp(level, rng, opts) {
  const l = rng.pick([1, 2, 3]);
  const lt = l === 1 ? '' : String(l);
  const want = `${l * l === 1 ? '' : l * l}z×e^(-${lt}z)`;
  return {
    skill: SM_ID, level, key: `${level}:exp:${l}`, subgoals: SM_SUB, exam: examTag(opts),
    prompt: `X et Y sont indépendantes, de loi exp(${l}). Calcule la densité de Z = X + Y pour z > 0 (convolution).`,
    parts: [{
      label: 'f_Z(z)', kind: 'prob', vars: ['z'], domain: { z: [0.1, 4] }, expect: want, action: 'Écrire la convolution, y de 0 à z',
      traps: { p_sum_density_add: { values: [`${2 * l}e^(-${lt}z)`] } },
      wrongActions: [{ label: 'Additionner les densités', rule: 'p_sum_density_add', why: 'f_X + f_Y intègre à 2 : ce n\'est pas une densité.' }],
      notes: [`f_Z(z) = ∫₀ᶻ f_X(z − y)·f_Y(y) dy : f_X(z − y) > 0 demande y < z, f_Y(y) > 0 demande y > 0. L'intégrande vaut ${l * l === 1 ? '' : l * l}e^(−${lt}z) : elle ne dépend plus de y.`],
      lines: [L(want, 'Z ~ Γ(2, 1/λ)', 'conv', [`${l * l === 1 ? '' : l * l}z`])],
    }],
    keys: [...GK, 'anal'],
    hints: H('f_Z(z) = ∫ f_X(z − y)·f_Y(y) dy, avec 0 < y < z.', 'L\'intégrande ne dépend pas de y : on intègre une constante de 0 à z.', `f_Z(z) = ${want}`),
  };
}

function smItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') {
    const d = smMixData(rng);
    return choice({ skill: SM_ID, level: 4, key: `mcq:${T(d.pi)}:${d.m1}:${d.m2}:${d.s1}:${d.s2}`, exam: examTag(opts),
      prompt: `X suit le mélange ${S(d.pi)}·N(${S(d.m1)}, ${d.s1}) + ${S(d.pj)}·N(${S(d.m2)}, ${d.s2}). Que vaut var(X) ?`,
      right: S(d.v), wrongs: [{ html: S(d.vs), rule: 'p_mixture_vs_sum' }],
      fillers: [{ html: S(d.pi.mul(d.s1).add(d.pj.mul(d.s2))) }, { html: S(d.m2nd) }, { html: S(d.v.add(1)) }] }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) {
      return tf({ skill: SM_ID, key: 'add', exam: examTag(opts), truth: false, ruleIfTrue: 'p_sum_density_add',
        statement: 'Si X et Y sont indépendantes de loi U(0, 1), la densité de X + Y est f_X + f_Y, qui vaut 2 sur [0 ; 1].',
        explanation: 'La densité de X + Y est le triangle f(z) = z sur [0 ; 1] et 2 − z sur [1 ; 2] : en z = 1/2, elle vaut 1/2, pas 2.',
        counter: numCounter({ vars: [{ v: 'z', label: 'z (où les deux diffèrent) =' }], hyp: 'z>0∧z<1', pred: 'z=2', answer: { z: '1/2' } }) });
    }
    return tf({ skill: SM_ID, key: 'mean', exam: examTag(opts), truth: true, statement: 'L\'espérance du mélange π·N(μ₁, σ₁²) + (1 − π)·N(μ₂, σ₂²) est πμ₁ + (1 − π)μ₂.', explanation: 'E = Σ πₖμₖ : c\'est l\'espérance totale.' });
  }
  const kind = level === 1 ? 'dice' : level === 2 ? rng.pick(['unif', 'dice']) : level === 3 ? rng.pick(['unif', 'mix']) : level === 4 ? rng.pick(['mix', 'unif', 'exp']) : 'mix';
  const o = kind === 'dice' ? smDice(level, rng, opts) : kind === 'unif' ? smUnif(level, rng, opts) : kind === 'exp' ? smExp(level, rng, opts) : smMix(level, rng, opts);
  return statItem(o);
}

// ======================================================================
// p-markov-cheb
// ======================================================================

const MC = 'p-markov-cheb';
const MC_SUB = [
  { id: 'bound', label: 'bornes', skill: MC },
  { id: 'normal', label: 'comparaison avec la normale', skill: 'p-normal-std' },
];
const LLN = {
  prompt: 'Une pièce équilibrée est lancée de nombreuses fois. Que dit la loi des grands nombres ?',
  options: [
    { html: 'La proportion de piles s\'approche de 1/2 quand le nombre de lancers grandit.', correct: true },
    { html: 'Après 5 piles de suite, face est plus probable au lancer suivant.', correct: false, rule: 'p_gambler' },
    { html: 'Le nombre de piles moins le nombre de faces tend vers 0.', correct: false, rule: 'p_lln_count' },
    { html: 'Elle donne Pr(X ≥ a) ≤ E[X]/a pour toute variable X, même négative.', correct: false, rule: 'p_markov_negative' },
  ],
};

function mcMarkov(level, rng) {
  const m = rng.int(2, 20);
  const k = rng.int(2, 6);
  const a = k * m;
  const what = rng.pick([['Le temps d\'attente X (en minutes) à un guichet', 'minutes'], ['Le nombre X de clients en une heure', 'clients'], ['La durée de vie X d\'une ampoule (en mois)', 'mois']]);
  return {
    key: `markov:${m}:${a}`,
    prompt: `${what[0]} est ${what[0].startsWith('La ') ? 'positive' : 'positif'}, d'espérance ${m}. Majore Pr(X ≥ ${a}).`,
    parts: [{ label: `Pr(X ≥ ${a})`, name: 'b', kind: 'prob', expect: `${m}/${a}`, action: 'Markov : Pr(X ≥ a) ≤ E[X]/a',
      decisions: [{ prompt: 'Quelle inégalité ?', options: [
        { id: 'm', label: 'Markov : X ≥ 0 et on connaît E[X]', valid: true },
        { id: 't', label: 'Tchebychev', valid: false, why: 'On ne connaît pas la variance de X.' },
      ] }],
      lines: thenValue(`${m}/${a}`, q(m, a), 'Pr(X ≥ a) ≤ E[X]/a', 'bound', [String(m)]) }],
    hints: H('X ≥ 0 et E[X] connue : Markov, Pr(X ≥ a) ≤ E[X]/a.', SM(`□/${a}`), `Pr(X ≥ ${a}) ≤ ${S(q(m, a))}`),
  };
}

function mcCheb(level, rng) {
  const mu = rng.int(2, 12) * 10;
  const s = rng.pick([2, 5, 10]);
  const k = rng.int(2, 5);
  const dd = k * s;
  const parts = [
    { label: 'k', name: 'k', kind: 'prob', expect: `${dd}/${s}`, action: 'Écrire l\'écart en nombre d\'écarts-types',
      decisions: [{ prompt: 'Quelle inégalité ?', options: [
        { id: 't', label: 'Tchebychev : on connaît μ et σ', valid: true },
        { id: 'm', label: 'Markov', valid: false, rule: 'p_markov_negative', why: 'Markov demande X ≥ 0 et majore Pr(X ≥ a), pas un écart des deux côtés.' },
      ] }],
      lines: [L(`${dd}/${s}`, `L'écart ${dd} vaut k écarts-types`, 'bound', [String(s)]), L(String(k), `k = ${k}`, 'bound', [String(k)])] },
    { label: `Pr(|Y - ${mu}| ≥ ${dd})`, name: 'b', kind: 'prob', expect: '1/$k^2', action: 'Tchebychev : ≤ 1/k²',
      traps: { p_chebyshev_k: { values: [`1/${k}`], ctx: { k, k2: k * k } } },
      wrongActions: [{ label: 'Borne 1/k', rule: 'p_chebyshev_k', why: 'Tchebychev donne 1/k².' }],
      lines: [L(`1/${k}^2`, 'Pr(|Y − μ| ≥ kσ) ≤ 1/k²', 'bound', [`${k}^2`]), L(`1/${k * k}`, 'La borne', 'bound', [String(k * k)])] },
  ];
  if (level >= 3 && k <= 3) {
    const ex = 2 * (1 - Phi(k));
    parts.push({ label: 'Pr si Y ~ N', name: 'n', kind: 'stat', decimals: 3, expect: `2×(1-#phi($k))`, accept: [FJ(ex)], action: 'Comparer à la valeur exacte pour une normale',
      lines: [L(`2×(1-Φ(${k}))`, 'Si Y est normale, deux queues', 'normal'), L(F(2 * (1 - roundTo(Phi(k), k >= 3 ? 7 : 3)), 4), 'La borne de Tchebychev est large', 'normal')] });
  }
  return {
    key: `cheb:${mu}:${s}:${k}`,
    prompt: `Y a pour moyenne ${mu} et pour écart-type ${s}. Majore Pr(|Y − ${mu}| ≥ ${dd})${level >= 3 && k <= 3 ? ', puis compare à la valeur exacte si Y est normale' : ''}.`,
    parts,
    hints: H('Compte combien d\'écarts-types fait l\'écart, puis 1/k².', SM(`1/□^2`), `Pr ≤ 1/${k * k}`),
  };
}

function mcSize(level, rng) {
  for (;;) {
    const s = rng.pick([1, 2, 5, 10]);
    const e = rng.pick([0.1, 0.5, 1]);
    const dl = rng.pick([0.01, 0.05, 0.1]);
    const v = q(s * s).div(qd(dl).mul(qd(e)).mul(qd(e)));
    if (v.valueOf() > 100000 || v.valueOf() < 10) continue;
    const n = Math.ceil(v.valueOf() - 1e-9);
    return {
      key: `size:${s}:${e}:${dl}`,
      prompt: `Des mesures iid ont un écart-type σ = ${s}. Par Tchebychev, combien en faut-il au moins pour que Pr(|X̄ − μ| ≥ ${FS(e, 2)}) ≤ ${FS(dl, 2)} ?`,
      parts: [
        { label: 'σ²/(δε²)', name: 'b', kind: 'prob', expect: J(v), action: 'Tchebychev pour X̄ : σ²/(nε²) ≤ δ',
          lines: [L(`${s * s}/(${F(dl, 2)}×${F(e, 2)}^2)`, 'var(X̄) = σ²/n ; il faut σ²/(nε²) ≤ δ', 'bound', [`${F(e, 2)}^2`]), L(T(v), 'Calculer', 'bound', [T(v)])] },
        { label: 'n', name: 'n', kind: 'prob', expect: String(n), action: 'Le plus petit entier qui convient',
          lines: [L(String(n), n === v.valueOf() ? 'n ≥ σ²/(δε²)' : 'Arrondir vers le haut', 'bound', [String(n)])] },
      ],
      hints: H('var(X̄) = σ²/n ; Tchebychev donne Pr(|X̄ − μ| ≥ ε) ≤ σ²/(nε²), à rendre ≤ δ.', SM(`${s * s}/(${F(dl, 2)}×□)`), `n ≥ ${n}`),
    };
  }
}

function mcItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') {
    const k = rng.int(2, 5);
    const s = rng.pick([2, 5, 10]);
    const mu = rng.int(2, 12) * 10;
    return choice({ skill: MC, level: 4, key: `mcq:${mu}:${s}:${k}`, exam: examTag(opts),
      prompt: `Y a pour moyenne ${mu} et pour écart-type ${s}. Quelle est la meilleure borne que donne Tchebychev pour Pr(|Y − ${mu}| ≥ ${k * s}) ?`,
      right: `≤ 1/${k * k}`, wrongs: [{ html: `≤ 1/${k}`, rule: 'p_chebyshev_k' }, { html: `≤ ${mu}/${mu + k * s}`, rule: 'p_markov_negative' }],
      fillers: [{ html: `≤ 1/${2 * k}` }, { html: `= ${F(2 * (1 - Phi(k)), 3)}` }] }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) {
      return tf({ skill: MC, key: 'markovneg', exam: examTag(opts), truth: false, ruleIfTrue: 'p_markov_negative',
        statement: 'Pour toute variable aléatoire X (pas forcément positive) et tout a > 0, Pr(X ≥ a) ≤ E[X]/a.',
        explanation: 'Markov demande X ≥ 0. Si X vaut toujours −1 et a = 1 : Pr(X ≥ 1) = 0, mais E[X]/a = −1.',
        counter: numCounter({ vars: [{ v: 'c', label: 'X constante égale à c, c =' }, { v: 'a', label: 'a =' }], hyp: 'a>0∧c<a', pred: '0≤c/a', answer: { c: '-1', a: '1' } }) });
    }
    return tf({ skill: MC, key: 'gambler', exam: examTag(opts), truth: true, ruleIfFalse: 'p_gambler',
      statement: 'Après 5 piles de suite avec une pièce équilibrée, la probabilité de face au lancer suivant est 1/2.',
      explanation: 'Les lancers sont indépendants : la pièce n\'a pas de mémoire.' });
  }
  const kind = level === 1 ? rng.pick(['markov', 'cheb']) : level === 2 ? rng.pick(['markov', 'cheb']) : level === 5 ? rng.pick(['size', 'cheb']) : rng.pick(['markov', 'cheb', 'size']);
  const d = kind === 'markov' ? mcMarkov(level, rng) : kind === 'cheb' ? mcCheb(level, rng) : mcSize(level, rng);
  const o = { skill: MC, level, key: `${level}:${d.key}`, prompt: d.prompt, parts: d.parts, hints: d.hints, subgoals: MC_SUB, interpret: LLN, exam: examTag(opts) };
  if (opts.exam === 'coef') return coefItem(o);
  return statItem(o);
}

// ======================================================================
// p-clt-sum
// ======================================================================

const CS = 'p-clt-sum';
const CS_SUB = [
  { id: 'sum', label: 'E et écart-type de la somme', skill: 'p-lin-combo' },
  { id: 'std', label: 'standardiser, lire Φ', skill: 'p-normal-std' },
  { id: 'clt', label: 'TCL', skill: CS },
];
const CLT_DECISION = {
  prompt: 'Peut-on approcher la loi de la somme par une loi normale ?',
  options: [
    { id: 'ok', label: 'Oui : n variables indépendantes de même loi, et n est grand', valid: true },
    { id: 'pop', label: 'Seulement si la population est très grande', valid: false, rule: 'p_clt_population', why: 'Le TCL porte sur la taille n de l\'échantillon, pas sur la population.' },
    { id: 'norm', label: 'Seulement si chaque variable est normale', valid: false, rule: 'p_clt_needs_normal', why: 'Justement, le TCL sert quand la population n\'est pas normale.' },
  ],
};
const ZS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5];

function phiPart(zName, zRef, label = 'Φ(z)') {
  return { label, name: 'phi', kind: 'stat', decimals: 3, expect: `#phi($${zName})`, accept: phiAccepted(zRef).map((x) => FJ(x)), action: 'Lire la table de Φ',
    lines: [L(F(phiTableOf(zRef), 3), 'Table 1', 'std', [F(phiTableOf(zRef), 3)])] };
}
const phiTableOf = (z) => roundTo(Phi(z), 3);

function csData(rng) {
  for (;;) {
    const n = rng.pick([16, 25, 36, 49, 64, 100]);
    const mu = rng.int(2, 90);
    const s = rng.pick([2, 4, 5, 10, 15, 20]);
    const z = rng.pick(ZS);
    const sd = s * Math.sqrt(n);
    if (!Number.isInteger(z * sd)) continue;
    return { n, mu, s, z, sd, e: n * mu, x: n * mu + z * sd, rn: Math.sqrt(n) };
  }
}

function csSum(level, rng) {
  const d = csData(rng);
  const story = rng.pick([
    [`Un ascenseur transporte ${d.n} personnes ; le poids d'une personne a pour espérance ${d.mu} kg et pour écart-type ${d.s} kg.`, `le poids total dépasse ${d.x} kg`],
    [`Un camion charge ${d.n} colis ; un colis pèse en moyenne ${d.mu} kg, avec un écart-type de ${d.s} kg.`, `la charge dépasse ${d.x} kg`],
    [`Un serveur traite ${d.n} requêtes ; une requête dure en moyenne ${d.mu} ms, avec un écart-type de ${d.s} ms.`, `la durée totale dépasse ${d.x} ms`],
  ]);
  const pr = 1 - phiTableOf(d.z);
  const parts = [
    { label: 'E[S]', name: 'e', kind: 'prob', expect: String(d.e), action: 'Espérance de la somme : nμ', decisions: [CLT_DECISION],
      lines: [L(`${d.n}×${d.mu}`, 'E[S] = nμ', 'sum', [String(d.mu)]), L(String(d.e), 'Calculer', 'sum', [String(d.e)])] },
    { label: 'sd(S)', name: 'sd', kind: 'prob', expect: String(d.sd), action: 'Écart-type de la somme : σ√n',
      traps: { p_clt_sum_sd: { values: [String(d.n * d.s)], ctx: { n: d.n, σ: d.s, v: d.sd } }, p_se_forgot_sqrt_n: { values: [String(d.s)], ctx: { n: d.n, v: d.sd } } },
      wrongActions: [{ label: 'Écart-type n·σ', rule: 'p_clt_sum_sd', why: 'Ce sont les variances qui s\'additionnent : σ√n.' }],
      lines: [L(`√${d.n}×${d.s}`, 'var(S) = nσ², donc sd(S) = σ√n', 'sum', [`√${d.n}`]), L(String(d.sd), 'Calculer', 'sum', [String(d.sd)])] },
    { label: 'z', name: 'z', kind: 'stat', decimals: 2, expect: `(${d.x}-$e)/$sd`, action: 'Standardiser',
      lines: [L(`(${d.x}-${d.e})/${d.sd}`, 'z = (s − E[S])/sd(S)', 'std', [String(d.e)]), L(F(d.z, 2), 'Calculer', 'std', [F(d.z, 2)])] },
    phiPart('z', d.z, 'Φ(z)'),
    { label: 'Pr', name: 'p', kind: 'stat', decimals: 3, expect: '1-$phi', action: 'Complément : queue de droite',
      traps: { p_upper_tail: { values: [FJ(phiTableOf(d.z))], ctx: { z: F(d.z, 2), v: F(phiTableOf(d.z), 3) } } },
      wrongActions: [{ label: 'Garder Φ(z)', rule: 'p_upper_tail', why: 'Φ(z) est la probabilité d\'être en dessous.' }],
      lines: [L(`1-${F(phiTableOf(d.z), 3)}`, 'Pr(S > s) ≈ 1 − Φ(z)', 'clt', [F(phiTableOf(d.z), 3)]), L(F(pr, 3), 'TCL et table', 'clt', [F(pr, 3)])] },
  ];
  const half = d.s * Math.sqrt(3);
  return {
    key: `sum:${d.n}:${d.mu}:${d.s}:${d.z}`, d,
    prompt: `${story[0]} Par le théorème central limite, quelle est la probabilité approchée que ${story[1]} ?`,
    parts,
    simulate: { model: 'sum', n: d.n, of: { model: 'unif', a: d.mu - half, b: d.mu + half }, event: { op: 'gt', k: d.x }, answer: pr, label: `Somme de ${d.n} valeurs uniformes de moyenne ${d.mu} et d'écart-type ${d.s}` },
    hints: H('La variance d\'une somme de n termes indépendants est nσ² ; l\'écart-type est σ√n.', SM(`(${d.x}-${d.e})/□`), `z = ${FS(d.z, 2)} ; Pr ≈ 1 − Φ(${FS(d.z, 2)}) = ${F(pr, 3)}`),
  };
}

function csMean(level, rng) {
  const d = csData(rng);
  const seq = q(d.s, d.rn);
  const xq = q(d.mu).add(qd(d.z).mul(seq));
  const xd = xq.toDecimal();
  if (!xd || seq.toDecimal() === null || (xd.split(',')[1] || '').length > 2) return csSum(level, rng);
  const se = seq.valueOf();
  const xb = xq.valueOf();
  const pr = 1 - phiTableOf(d.z);
  return {
    key: `mean:${d.n}:${d.mu}:${d.s}:${d.z}`,
    prompt: `On mesure ${d.n} valeurs iid d'espérance ${d.mu} et d'écart-type ${d.s}. Quelle est la probabilité approchée que la moyenne X̄ dépasse ${FS(xb, 2)} ?`,
    parts: [
      { label: 'E[X̄]', name: 'e', kind: 'prob', expect: String(d.mu), action: 'Espérance de la moyenne : μ', decisions: [CLT_DECISION],
        lines: [L(String(d.mu), 'E[X̄] = μ', 'sum', [String(d.mu)])] },
      { label: 'sd(X̄)', name: 'sd', kind: 'prob', expect: `${d.s}/√${d.n}`, action: 'Écart-type de la moyenne : σ/√n',
        traps: { p_se_forgot_sqrt_n: { values: [String(d.s)], ctx: { n: d.n, v: F(se, 3) } } },
        wrongActions: [{ label: 'Garder σ', rule: 'p_se_forgot_sqrt_n', why: 'La moyenne varie moins qu\'une seule observation : σ/√n.' }],
        lines: [L(`${d.s}/√${d.n}`, 'sd(X̄) = σ/√n', 'sum', [`√${d.n}`]), L(T(seq), 'Calculer', 'sum', [T(seq)])] },
      { label: 'z', name: 'z', kind: 'stat', decimals: 2, expect: `(${J(xq)}-$e)/$sd`, action: 'Standardiser',
        lines: [L(`(${T(xq)}-${d.mu})/${T(seq)}`, 'z = (x̄ − μ)/(σ/√n)', 'std', [String(d.mu)]), L(F(d.z, 2), 'Calculer', 'std')] },
      phiPart('z', d.z),
      { label: 'Pr', name: 'p', kind: 'stat', decimals: 3, expect: '1-$phi', action: 'Complément',
        traps: { p_upper_tail: { values: [FJ(phiTableOf(d.z))] } },
        lines: [L(`1-${F(phiTableOf(d.z), 3)}`, 'Queue de droite', 'clt'), L(F(pr, 3), 'TCL et table', 'clt')] },
    ],
    hints: H('X̄ ≈ N(μ, σ²/n) : son écart-type est σ/√n.', SM(`${d.s}/√□`), `Pr ≈ ${F(pr, 3)}`),
  };
}

// Inverse problem: the capacity c with Pr(S > c) = α.
function csInverse(level, rng) {
  const d = csData(rng);
  const [a, p] = rng.pick([[0.04, 0.96], [0.05, 0.95], [0.1, 0.9], [0.01, 0.99], [0.025, 0.975]]);
  const z = phiInvTable(p);
  const c = d.e + z * d.sd;
  return {
    key: `inv:${d.n}:${d.mu}:${d.s}:${a}`,
    prompt: `Un camion charge ${d.n} colis ; un colis pèse en moyenne ${d.mu} kg, avec un écart-type de ${d.s} kg. Quelle charge c (en kg) le camion doit-il supporter pour que Pr(charge > c) = ${FS(a, 3)} ?`,
    parts: [
      { label: 'E[S]', name: 'e', kind: 'prob', expect: String(d.e), action: 'Espérance de la somme', decisions: [CLT_DECISION],
        lines: [L(`${d.n}×${d.mu}`, 'E[S] = nμ', 'sum'), L(String(d.e), 'Calculer', 'sum')] },
      { label: 'sd(S)', name: 'sd', kind: 'prob', expect: String(d.sd), action: 'Écart-type de la somme', traps: { p_clt_sum_sd: { values: [String(d.n * d.s)] } },
        lines: [L(`√${d.n}×${d.s}`, 'σ√n', 'sum'), L(String(d.sd), 'Calculer', 'sum')] },
      { label: 'z', name: 'z', kind: 'stat', decimals: 2, expect: `#z(${p})`, accept: [FJ(PhiInv(p))], action: 'Lire la table de Φ⁻¹',
        lines: [L(`Φ⁻¹(${F(p, 3)})`, `Φ(z) = 1 − ${FS(a, 3)}`, 'std'), L(F(z, 3), 'Table 2', 'std')] },
      { label: 'c', name: 'c', kind: 'stat', decimals: 0, expect: '$e+$z×$sd', action: 'Revenir à l\'échelle de S',
        lines: [L(`${d.e}+${F(z, 3)}×${d.sd}`, 'c = E[S] + z·sd(S)', 'clt'), L(F(c, 1), 'Capacité', 'clt')] },
    ],
    hints: H('Pr(S > c) = α veut dire Φ((c − nμ)/(σ√n)) = 1 − α.', SM(`${d.e}+□×${d.sd}`), `c ≈ ${FS(c, 1)} kg`),
  };
}

function csItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') {
    if (rng.chance(0.5)) {
      return choice({ skill: CS, level: 4, key: 'mcqcond', exam: examTag(opts),
        prompt: 'X₁, …, Xₙ sont iid d\'espérance μ et de variance σ². Sous quelle condition X̄ est-elle approximativement normale (théorème central limite) ?',
        right: 'La taille n de l\'échantillon est grande', wrongs: [{ html: 'La population dont on tire les Xᵢ est grande', rule: 'p_clt_population' }, { html: 'Les Xᵢ sont normales', rule: 'p_clt_needs_normal' }],
        fillers: [{ html: 'Les Xᵢ sont bornées' }] }, rng);
    }
    const d = csData(rng);
    const pr = 1 - phiTableOf(d.z);
    return choice({ skill: CS, level: 4, key: `mcq:${d.n}:${d.mu}:${d.s}:${d.z}`, exam: examTag(opts),
      prompt: `${d.n} variables iid d'espérance ${d.mu} et d'écart-type ${d.s}. Pr(S > ${d.x}) ≈ ? (S est leur somme)`,
      right: F(pr, 3), wrongs: [{ html: F(phiTableOf(d.z), 3), rule: 'p_upper_tail' }, { html: F(1 - roundTo(Phi(d.z / d.rn), 3), 3), rule: 'p_clt_sum_sd' }],
      fillers: [{ html: F(1 - roundTo(Phi(d.z / 2), 3), 3) }, { html: F(2 * pr, 3) }] }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) {
      return tf({ skill: CS, key: 'sdsum', exam: examTag(opts), truth: false, ruleIfTrue: 'p_clt_sum_sd',
        statement: 'La somme de n variables indépendantes d\'écart-type σ a pour écart-type n·σ.',
        explanation: 'Les variances s\'additionnent : var = nσ², donc l\'écart-type est σ√n. Avec n = 4 et σ = 1 : 2, pas 4.',
        counter: numCounter({ vars: [{ v: 'n', label: 'n =', dom: 'N*' }, { v: 's', label: 'σ =' }], hyp: 'n≥2∧s>0', pred: 'n×s=√(n)×s', answer: { n: '4', s: '1' } }) });
    }
    return tf({ skill: CS, key: 'expo', exam: examTag(opts), truth: true, ruleIfFalse: 'p_clt_needs_normal',
      statement: 'Pour n grand, la moyenne empirique de n variables iid de loi exponentielle est approximativement normale.', explanation: 'Le TCL ne demande pas que la population soit normale.' });
  }
  const kind = level <= 2 ? 'sum' : level === 3 ? rng.pick(['sum', 'mean']) : level === 4 ? rng.pick(['sum', 'mean', 'inverse']) : rng.pick(['inverse', 'sum']);
  const d = kind === 'sum' ? csSum(level, rng) : kind === 'mean' ? csMean(level, rng) : csInverse(level, rng);
  const o = { skill: CS, level, key: `${level}:${d.key}`, prompt: d.prompt, parts: d.parts, hints: d.hints, subgoals: CS_SUB, simulate: d.simulate, exam: examTag(opts) };
  if (opts.exam === 'coef') return coefItem(o);
  return statItem(o);
}

// ======================================================================
// p-clt-binom
// ======================================================================

const CB = 'p-clt-binom';
const CB_SUB = [
  { id: 'par', label: 'paramètres', skill: 'p-binom' },
  { id: 'std', label: 'standardiser', skill: 'p-normal-std' },
  { id: 'approx', label: 'approximation', skill: CB },
];
const CB_PAIRS = [['1/2', [100, 400, 900, 2500]], ['1/5', [100, 400, 625]], ['1/10', [100, 400, 900]]];

function cbData(rng, poisson) {
  for (;;) {
    let mu;
    let v;
    let n = null;
    let p = null;
    if (poisson) {
      const l = rng.pick([16, 25, 36, 64, 100]);
      mu = q(l);
      v = q(l);
    } else {
      const [pt, ns] = rng.pick(CB_PAIRS);
      p = q(...pt.split('/').map(Number));
      n = rng.pick(ns);
      mu = p.mul(n);
      v = mu.mul(q(1).sub(p));
    }
    const s = v.sqrt();
    if (!s || !s.isInt()) continue;
    const z = rng.pick([0.5, 1, 1.5, 2, 2.5, 0.75, 1.25]);
    const k = mu.valueOf() + z * s.valueOf();
    if (!Number.isInteger(k)) continue;
    const upper = rng.chance(0.7);
    return { poisson, n, p, mu, v, s, z, k, upper };
  }
}

function cbItem(level, rng, profile, opts = {}) {
  const d = cbData(rng, level >= 3 && rng.chance(0.3));
  const ph = phiTableOf(d.z);
  const pr = d.upper ? 1 - ph : ph;
  const law = d.poisson ? `Poiss(${d.mu.n})` : `B(${d.n} ; ${S(d.p)})`;
  const ev = d.upper ? `X ≥ ${d.k}` : `X ≤ ${d.k}`;
  const story = d.poisson
    ? `Le nombre X de clients d'un magasin en un mois suit ${law}.`
    : rng.pick([d.p.eq?.(q(1, 2)) || Number(d.p) === 0.5 ? `On lance ${d.n} fois une pièce équilibrée ; X est le nombre de piles, X ~ ${law}.` : `Une machine produit des pièces défectueuses avec la probabilité ${S(d.p)}, indépendamment ; sur ${d.n} pièces, X est le nombre de pièces défectueuses, X ~ ${law}.`, `Dans un sondage, ${d.n} personnes répondent ; chacune est favorable avec la probabilité ${S(d.p)}. X est le nombre de personnes favorables, X ~ ${law}.`]);
  if (opts.exam === 'mcq') {
    return choice({ skill: CB, level: 4, key: `mcq:${law}:${d.k}:${d.upper}`, exam: examTag(opts),
      prompt: `${story} Par l'approximation normale (sans correction de continuité), Pr(${ev}) ≈ ?`,
      right: F(pr, 3), wrongs: [{ html: F(d.upper ? ph : 1 - ph, 3), rule: 'p_upper_tail' }, { html: F(d.upper ? 1 - roundTo(Phi(d.z * d.s.valueOf() / d.v.valueOf()), 3) : roundTo(Phi(d.z * d.s.valueOf() / d.v.valueOf()), 3), 3), rule: 'p_binom_var_as_sd' }],
      fillers: [{ html: F(pr / 2, 3) }, { html: F(1 - pr / 2, 3) }] }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) {
      return tf({ skill: CB, key: 'sd', exam: examTag(opts), truth: false, ruleIfTrue: 'p_binom_var_as_sd',
        statement: 'Si X ~ B(n, p), l\'écart-type de X est np(1 − p).',
        explanation: 'np(1 − p) est la variance ; l\'écart-type est sa racine. Pour n = 100 et p = 1/2 : 25 contre 5.',
        counter: numCounter({ vars: [{ v: 'n', label: 'n =', dom: 'N*' }, { v: 'p', label: 'p =' }], hyp: 'p>0∧p<1', pred: 'n×p×(1-p)=√(n×p×(1-p))', answer: { n: '100', p: '1/2' } }) });
    }
    return tf({ skill: CB, key: 'mean', exam: examTag(opts), truth: true, statement: `Si X ~ ${law}, alors E[X] = ${S(d.mu)} et var(X) = ${S(d.v)}.`, explanation: d.poisson ? 'Pour Poisson, E = var = λ.' : 'E = np et var = np(1 − p).' });
  }
  const parts = [
    { label: 'E[X]', name: 'e', kind: 'prob', expect: J(d.mu), action: d.poisson ? 'E[X] = λ' : 'E[X] = np',
      decisions: d.poisson ? [] : [{ prompt: 'Quelle approximation ?', levels: [1, 2, 3, 4], options: [
        { id: 'n', label: `Normale : np = ${S(d.mu)} et n(1 − p) = ${S(q(d.n).sub(d.mu))} sont grands`, valid: true },
        { id: 'p', label: 'Poisson', valid: false, rule: 'p_poisson_approx_bad', why: `L'approximation de Poisson demande p petit ; ici p = ${S(d.p)}.` },
      ] }],
      lines: d.poisson ? [L(String(d.mu.n), 'Pour Poisson, E = λ', 'par', [String(d.mu.n)])] : [L(`${d.n}×${T(d.p)}`, 'E = np', 'par', [T(d.p)]), L(T(d.mu), 'Calculer', 'par', [T(d.mu)])] },
    { label: 'var(X)', name: 'v', kind: 'prob', expect: J(d.v), action: d.poisson ? 'var(X) = λ' : 'var(X) = np(1 − p)',
      lines: d.poisson ? [L(String(d.v.n), 'var = λ', 'par')] : [L(`${d.n}×${T(d.p)}×${T(q(1).sub(d.p))}`, 'var = np(1 − p)', 'par', [T(q(1).sub(d.p))]), L(T(d.v), 'Calculer', 'par', [T(d.v)])] },
    { label: 'σ', name: 's', kind: 'prob', expect: '√$v', action: 'Racine de la variance',
      traps: { p_binom_var_as_sd: { values: [J(d.v)], ctx: { v: S(d.v) } } },
      wrongActions: [{ label: 'Prendre σ = np(1 − p)', rule: 'p_binom_var_as_sd', why: 'np(1 − p) est la variance.' }],
      lines: [L(`√${T(d.v)}`, 'σ = √var', 'par', [T(d.v)]), L(T(d.s), 'Écart-type', 'par', [T(d.s)])] },
    { label: 'z', name: 'z', kind: 'stat', decimals: 2, expect: `(${d.k}-$e)/$s`, action: 'Standardiser',
      lines: [L(`(${d.k}-${T(d.mu)})/${T(d.s)}`, 'z = (k − μ)/σ', 'std', [T(d.mu)]), L(F(d.z, 2), 'Calculer', 'std', [F(d.z, 2)])] },
    phiPart('z', d.z),
    { label: `Pr(${ev})`, name: 'p', kind: 'stat', decimals: 3, expect: d.upper ? '1-$phi' : '$phi', action: d.upper ? 'Queue de droite : 1 − Φ(z)' : 'Queue de gauche : Φ(z)',
      traps: { p_upper_tail: { values: [FJ(d.upper ? ph : 1 - ph)], ctx: { z: F(d.z, 2), v: F(ph, 3) } } },
      lines: d.upper ? [L(`1-${F(ph, 3)}`, 'Complément', 'approx', [F(ph, 3)]), L(F(pr, 3), 'Approximation normale', 'approx', [F(pr, 3)])] : [L(F(pr, 3), 'Pr ≈ Φ(z)', 'approx', [F(pr, 3)])] },
  ];
  const o = {
    skill: CB, level, key: `${level}:${law}:${d.k}:${d.upper}`, parts, subgoals: CB_SUB, exam: examTag(opts),
    prompt: `${story} Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(${ev}).`,
    hints: H(d.poisson ? 'Poiss(λ) ≈ N(λ, λ) : l\'écart-type est √λ.' : 'np(1 − p) est la <b>variance</b> : prends sa racine.', SM(`(${d.k}-${T(d.mu)})/√□`), `z = ${FS(d.z, 2)} ; Pr ≈ ${F(pr, 3)}`),
    simulate: d.poisson ? { model: 'poisson', lambda: d.mu.n, event: { op: d.upper ? 'ge' : 'le', k: d.k }, answer: pr, label: `Pr(${ev}) simulée` } : { model: 'binom', n: d.n, p: d.p.valueOf(), event: { op: d.upper ? 'ge' : 'le', k: d.k }, answer: pr, label: `Pr(${ev}) simulée (la valeur exacte diffère un peu : pas de correction de continuité)` },
  };
  if (opts.exam === 'coef') return coefItem(o);
  return statItem(o);
}

export const GEN = {
  [CC]: ccItem,
  [TE]: teItem,
  [SM_ID]: smItem,
  [MC]: mcItem,
  [CS]: csItem,
  [CB]: cbItem,
  ...EST,
};

void T; void GK;

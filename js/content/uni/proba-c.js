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
import { t } from '../../i18n.js';

const GK = ['calc', 'stat', 'greek', 'calcfn'];

// ======================================================================
// p-cov-corr
// ======================================================================

const CC = 'p-cov-corr';
const CC_SUB = [
  { id: 'cov', label: t('covariance'), skill: 'p-lin-combo' },
  { id: 'corr', label: t('corrélation'), skill: CC },
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
    parts.push({ label: 'cov(X, Y)', name: 'cv', kind: 'prob', expect: J(d.cov), action: t('Covariance : E[XY] − E[X]·E[Y]'),
      lines: [L(`${T(d.exy)}-${P(d.ex)}×${P(d.ey)}`, 'cov = E[XY] − E[X]E[Y]', 'cov', [`${P(d.ex)}×${P(d.ey)}`]), L(T(d.cov), t('Calculer'), 'cov', [T(d.cov)])] });
  }
  const cv = withExy ? '$cv' : J(d.cov);
  parts.push({ label: 'corr(X, Y)', name: 'r', kind: 'prob', expect: `${cv}/(${d.sx}×${d.sy})`, action: t('Normaliser : diviser par σ_X·σ_Y'),
    wrongActions: [{ label: t('Diviser par var X · var Y'), why: t('On divise par le produit des écarts-types, pas des variances.') }],
    lines: [L(`${P(d.cov)}/(${d.sx}×${d.sy})`, `σ_X = √${d.vx} = ${d.sx}, σ_Y = √${d.vy} = ${d.sy}`, 'corr', [`${d.sx}×${d.sy}`]), L(T(d.r), t('Calculer'), 'corr', [T(d.r)])] });
  parts.push({ label: `cov(${X}, ${Y})`, name: 'cab', kind: 'prob', expect: `${d.a}×${d.c}×${withExy ? '$cv' : J(d.cov)}`, action: t('Sortir les constantes : a·c·cov(X, Y)'),
    wrongActions: [{ label: t('Ajouter les constantes b et d'), why: t('Une constante ajoutée ne change pas la covariance.') }],
    lines: [L(`${P(d.a)}×${P(d.c)}×${P(d.cov)}`, 'cov(aX + b, cY + d) = ac·cov(X, Y)', 'cov', [`${P(d.a)}×${P(d.c)}`]), L(T(d.cov.mul(d.a * d.c)), t('Calculer'), 'cov', [T(d.cov.mul(d.a * d.c))])] });
  const rab = d.r.mul(sign);
  const traps = { p_corr_scale: { values: [J(d.cov.mul(d.a * d.c)), J(d.r.mul(d.a * d.c))].filter((v) => v !== J(rab)), ctx: {} } };
  parts.push({ label: `corr(${X}, ${Y})`, name: 'rab', kind: 'prob', expect: `${sign}×$r`, traps, action: t('Garder le signe de a·c'),
    wrongActions: [{ label: t('Multiplier la corrélation par a·c'), rule: 'p_corr_scale', why: t('La corrélation ne change pas d\'échelle : seul le signe de a·c compte.') }],
    lines: [L(T(rab), t('Le signe de a·c = {s} ; la corrélation garde sa taille', { s: S(d.a * d.c) }), 'corr', [T(rab)])] });
  if (level >= 3 && level <= 4) {
    parts.push({ label: 'cov(X + Y, X − Y)', name: 'cxy', kind: 'prob', expect: String(d.vx - d.vy), action: t('Développer : cov(X + Y, X − Y) = var X − var Y'),
      lines: [L(`${d.vx}-${d.vy}`, t('Les termes cov(X, Y) s\'annulent'), 'cov', [String(d.vy)]), L(String(d.vx - d.vy), t('Calculer'), 'cov')] });
  }
  return parts;
}

function ccInterpret(d) {
  const pos = d.r.n > 0;
  return {
    prompt: t('Interpréter : corr(X, Y) = {r}. Quelle phrase est juste ?', { r: S(d.r) }),
    options: [
      { html: pos ? t('Quand X est grand, Y a tendance à être grand aussi : un lien linéaire croissant.') : t('Quand X est grand, Y a tendance à être petit : un lien linéaire décroissant.'), correct: true },
      { html: t('Les variations de X sont la cause des variations de Y.'), correct: false, rule: 'p_corr_causal' },
      { html: t('Y = {r}·X : la corrélation est la pente de la droite.', { r: S(d.r) }), correct: false, rule: 'p_corr_slope' },
      { html: t('Une part {r} de Y est expliquée par X.', { r: S(d.r.n < 0 ? d.r.neg() : d.r) }), correct: false, rule: 'p_r2_r' },
    ],
  };
}

function ccItem(level, rng, profile, opts = {}) {
  const d = ccData(rng);
  const X = aff(d.a, 'X', d.b);
  const Y = aff(d.c, 'Y', d.d);
  const withExy = level >= 2 && rng.chance(0.5);
  const given = withExy ? `E[X] = ${S(d.ex)}, E[Y] = ${S(d.ey)}, E[XY] = ${S(d.exy)}` : `cov(X, Y) = ${S(d.cov)}`;
  const known = t('On sait que var X = {vx}, var Y = {vy} et {given}.', { vx: d.vx, vy: d.vy, given });
  const prompt = `${known} ${t('Calcule la corrélation de X et Y, puis la covariance et la corrélation de {X} et {Y}.', { X, Y })}`;
  if (opts.exam === 'mcq') {
    const sign = d.a * d.c > 0 ? 1 : -1;
    const right = d.r.mul(sign);
    return choice({
      skill: CC, level: 4, key: `mcq:${d.vx}:${d.vy}:${T(d.cov)}:${d.a}:${d.c}`, exam: examTag(opts),
      prompt: t('var X = {vx}, var Y = {vy}, cov(X, Y) = {c}. Que vaut corr({X}, {Y}) ?', { vx: d.vx, vy: d.vy, c: S(d.cov), X, Y }),
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
        statement: t('Si corr(X, Y) = {r}, alors corr(aX + b, cY + d) = a·c·{p} pour tous a, c ≠ 0.', { r: S(d.r), p: PS(d.r) }),
        explanation: t('corr(aX + b, cY + d) = signe(ac)·corr(X, Y) : avec a = 2 et c = 1, on trouve {r}, pas {w}.', { r: S(d.r), w: S(d.r.mul(2)) }),
        counter: numCounter({ vars: [{ v: 'a', label: 'a =' }, { v: 'c', label: 'c =' }], hyp: 'a×c≠0', pred: `a×c×(${T(d.r)})=(${T(d.r)})×(a×c)/|a×c|`, answer: { a: '2', c: '1' } }),
      });
    }
    if (k === 1) {
      return tf({ skill: CC, key: `bound:${T(d.r)}`, exam: examTag(opts), truth: true, ruleIfFalse: null,
        statement: t('Pour toutes variables X, Y de variances non nulles, −1 ≤ corr(X, Y) ≤ 1.'), explanation: t('C\'est l\'inégalité de Cauchy-Schwarz : |cov(X, Y)| ≤ σ_X·σ_Y.') });
    }
    return tf({ skill: CC, key: `xpy:${d.vx}:${d.vy}`, exam: examTag(opts), truth: true,
      statement: t('Si var X = {vx} et var Y = {vy}, alors cov(X + Y, X − Y) = {d}.', { vx: d.vx, vy: d.vy, d: d.vx - d.vy }),
      explanation: 'cov(X + Y, X − Y) = var X − cov(X, Y) + cov(Y, X) − var Y = var X − var Y.' });
  }
  const parts = ccParts(d, level, withExy);
  const o = {
    skill: CC, level, key: `${level}:${d.vx}:${d.vy}:${T(d.cov)}:${d.a}:${d.b}:${d.c}:${d.d}:${withExy}`, prompt, parts,
    hints: H(t('corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance.'),
      SM(`${P(d.cov)}/(□×□)`), `corr(X, Y) = ${S(d.r)} ; cov(${X}, ${Y}) = ${S(d.cov.mul(d.a * d.c))} ; corr(${X}, ${Y}) = ${S(d.r.mul(d.a * d.c > 0 ? 1 : -1))}`),
    subgoals: CC_SUB, interpret: ccInterpret(d), exam: examTag(opts),
  };
  if (opts.exam === 'coef') {
    // The coef variant asks one value, and its prompt says which.
    const part = parts.find((x) => x.label === 'corr(X, Y)') ?? parts[parts.length - 1];
    return coefItem({ ...o, part, prompt: `${known} ${t('Que vaut la corrélation corr(X, Y) ?')}` });
  }
  return statItem(o);
}

// ======================================================================
// p-total-expect
// ======================================================================

const TE = 'p-total-expect';
const TE_SUB = [
  { id: 'cond', label: t('lois conditionnelles'), skill: 'p-binom' },
  { id: 'weight', label: t('pondérer'), skill: 'p-cond-total' },
  { id: 'total', label: t('formule totale'), skill: TE },
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
    { label: `E[N | ${A}]`, name: 'ea', kind: 'prob', expect: J(d.e1), action: t('Espérance sachant l\'examinateur'), decisions: [
      { prompt: t('Quelle est la loi de N quand {A} interroge ?', { A }), levels: [1, 2, 3], options: [
        { id: 'b', label: `N | ${A} ~ B(${d.n} ; ${S(d.p1)})`, valid: true },
        { id: 'p', label: `N | ${A} ~ B(${d.n} ; ${S(d.pi.mul(d.p1))})`, valid: false, why: t('Sachant que {A} interroge, chaque question est réussie avec la probabilité {p} : le choix de l\'examinateur est déjà fait.', { A, p: S(d.p1) }) },
      ] }, ...decisions],
      lines: [L(`${d.n}×${T(d.p1)}`, `N | ${A} ~ B(${d.n} ; ${S(d.p1)}) : E = np`, 'cond', [T(d.p1)]), L(T(d.e1), t('Calculer'), 'cond', [T(d.e1)])] },
    { label: `E[N | ${B}]`, name: 'eb', kind: 'prob', expect: J(d.e2), action: t('Espérance sachant l\'examinateur'),
      lines: [L(`${d.n}×${T(d.p2)}`, `N | ${B} ~ B(${d.n} ; ${S(d.p2)})`, 'cond', [T(d.p2)]), L(T(d.e2), t('Calculer'), 'cond', [T(d.e2)])] },
    { label: 'E[N]', name: 'e', kind: 'prob', expect: `${J(d.pi)}×$ea+${J(d.pj)}×$eb`, action: t('Pondérer par les probabilités des examinateurs'),
      traps: { p_total_expect_unweighted: { values: [J(d.e1.add(d.e2).div(2))], ctx: { p: S(d.pi) } } },
      wrongActions: [{ label: t('Faire la moyenne des deux espérances'), rule: 'p_total_expect_unweighted', why: t('Les deux examinateurs n\'interrogent pas aussi souvent : on pondère.') }],
      lines: [L(`${T(d.pi)}×${T(d.e1)}+${T(d.pj)}×${T(d.e2)}`, 'E[N] = Σ E[N | y]·Pr(y)', 'weight', [T(d.pi), T(d.pj)]), L(T(d.e), t('Espérance totale'), 'total', [T(d.e)])] },
    { label: 'E[var(N | ·)]', name: 'ev', kind: 'prob', expect: J(d.ev), action: t('Moyenne des variances conditionnelles'),
      lines: [L(`${T(d.pi)}×${d.n}×${T(d.p1)}×${T(q(1).sub(d.p1))}+${T(d.pj)}×${d.n}×${T(d.p2)}×${T(q(1).sub(d.p2))}`, t('var(N | y) = np(1 − p), pondérée'), 'weight', [T(q(1).sub(d.p1)), T(q(1).sub(d.p2))]), L(T(d.ev), t('Moyenne des variances'), 'total', [T(d.ev)])] },
    { label: 'var(E[N | ·])', name: 've', kind: 'prob', expect: `${J(d.pi)}×${J(d.pj)}×($eb-$ea)^2`, action: t('Variance des espérances conditionnelles'),
      lines: [L(`${T(d.pi)}×${T(d.pj)}×(${T(d.e2)}-${T(d.e1)})^2`, t('Deux valeurs : π(1 − π)·(écart)²'), 'total', [`(${T(d.e2)}-${T(d.e1)})^2`]), L(T(d.ve), t('Variance des moyennes'), 'total', [T(d.ve)])] },
    { label: 'var(N)', name: 'v', kind: 'prob', expect: '$ev+$ve', action: t('Additionner : moyenne des variances + variance des moyennes'),
      traps: { p_total_var_forget: { values: [J(d.ev)], ctx: { v: S(d.ve) } } },
      wrongActions: [{ label: t('Garder seulement la moyenne des variances'), rule: 'p_total_var_forget', why: t('Le choix de l\'examinateur ajoute sa propre variance : var(E[N | ·]).') }],
      lines: [L(`${T(d.ev)}+${T(d.ve)}`, 'var = E[var(N | ·)] + var(E[N | ·])', 'total', [T(d.ve)]), L(T(d.v), t('Variance totale'), 'total', [T(d.v)])] },
  ];
}

// R ~ U(0, a), X | R ~ U(0, R): E[X] = a/4, var(X) = a²/36 + a²/48 = 7a²/144.
function teNested(level, rng, opts) {
  const a = rng.pick([1, 2, 3, 6, 12]);
  const a2 = a * a;
  const parts = [
    { label: 'E[X]', name: 'e', kind: 'prob', expect: J(q(a, 4)), action: 'E[X] = E[E[X | R]] = E[R/2]',
      lines: [L(`${a}/2/2`, t('E[X | R] = R/2, et E[R] = a/2'), 'total'), L(T(q(a, 4)), t('Espérance totale'), 'total')] },
    { label: 'E[var(X | R)]', name: 'ev', kind: 'prob', expect: J(q(a2, 36)), action: t('var(X | R) = R²/12, puis E[R²] = a²/3'),
      lines: [L(`${a2}/3/12`, 'E[R²/12] = E[R²]/12', 'total'), L(T(q(a2, 36)), t('Moyenne des variances'), 'total')] },
    { label: 'var(E[X | R])', name: 've', kind: 'prob', expect: J(q(a2, 48)), action: 'var(R/2) = var(R)/4',
      lines: [L(`${a2}/12/4`, 'var(R) = a²/12', 'total'), L(T(q(a2, 48)), t('Variance des moyennes'), 'total')] },
    { label: 'var(X)', name: 'v', kind: 'prob', expect: '$ev+$ve', traps: { p_total_var_forget: { values: [J(q(a2, 36))], ctx: { v: S(q(a2, 48)) } } }, action: t('Additionner'),
      lines: [L(`${T(q(a2, 36))}+${T(q(a2, 48))}`, t('Variance totale'), 'total'), L(T(q(7 * a2, 144)), t('Calculer'), 'total')] },
  ];
  const o = {
    skill: TE, level, key: `${level}:nested:${a}`, parts, subgoals: TE_SUB,
    prompt: t('Le retard R de Jo (en heures) suit U(0, {a}). Sachant R, le retard X du bus suit U(0, R). Calcule E[X] et var(X) par les formules totales.', { a }),
    hints: H(t('Conditionne par R : E[X | R] = R/2 et var(X | R) = R²/12 ; puis prends l\'espérance et la variance en R.'), SM(`${T(q(a2, 36))}+□`), `var(X) = ${S(q(7 * a2, 144))}`),
    exam: examTag(opts),
  };
  return o;
}

function teItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) return tf({ skill: TE, key: 'vargeq', exam: examTag(opts), truth: true, statement: t('Pour toutes variables X, Y : var(X) ≥ E[var(X | Y)].'), explanation: t('var(X) = E[var(X | Y)] + var(E[X | Y]), et une variance est positive.') });
    const d = teData(rng);
    return tf({
      skill: TE, key: `unw:${T(d.pi)}`, exam: examTag(opts), truth: false, ruleIfTrue: 'p_total_expect_unweighted',
      statement: t('Si Y prend deux valeurs a et b, alors E[X] = (E[X | Y = a] + E[X | Y = b])/2.'),
      explanation: t('E[X] = p·E[X | Y = a] + (1 − p)·E[X | Y = b] avec p = Pr(Y = a) : la moyenne simple n\'est juste que si p = 1/2. Par exemple p = 0,8, u = 1, v = 2 : 1,2 ≠ 1,5.'),
      counter: numCounter({ vars: [{ v: 'p', label: 'Pr(Y = a) = p =' }, { v: 'u', label: 'E[X | Y = a] = u =' }, { v: 'w', label: 'E[X | Y = b] = w =' }], hyp: 'p>0∧p<1', pred: 'p×u+(1-p)×w=(u+w)/2', answer: { p: '0,8', u: '1', w: '2' } }),
    });
  }
  const d = teData(rng);
  if (opts.exam === 'mcq') {
    const [A, B] = d.names;
    const story = t('{A} interroge avec la probabilité {pi}, {B} sinon. Avec {A}, chacune des {n} questions est réussie avec la probabilité {p1} ; avec {B}, {p2}, indépendamment.', { A, B, pi: S(d.pi), n: d.n, p1: S(d.p1), p2: S(d.p2) });
    if (rng.chance(0.5)) {
      return choice({ skill: TE, level: 4, key: `mcqE:${T(d.pi)}:${d.n}:${T(d.p1)}:${T(d.p2)}`, exam: examTag(opts),
        prompt: `${story} ${t('N = nombre de bonnes réponses. E[N] = ?')}`, right: S(d.e),
        wrongs: [{ html: S(d.e1.add(d.e2).div(2)), rule: 'p_total_expect_unweighted' }],
        fillers: [{ html: S(d.pi.mul(d.e2).add(d.pj.mul(d.e1))) }, { html: S(d.e1.add(d.e2)) }, { html: S(d.e.add(1)) }] }, rng);
    }
    return choice({ skill: TE, level: 4, key: `mcqV:${T(d.pi)}:${d.n}:${T(d.p1)}:${T(d.p2)}`, exam: examTag(opts),
      prompt: `${story} ${t('N = nombre de bonnes réponses. var(N) = ?')}`, right: S(d.v),
      wrongs: [{ html: S(d.ev), rule: 'p_total_var_forget' }, { html: S(d.v1.add(d.v2).div(2)), rule: 'p_total_expect_unweighted' }],
      fillers: [{ html: S(d.ve) }, { html: S(d.v.add(1)) }, { html: S(d.v1.add(d.v2)) }] }, rng);
  }
  const [A, B] = d.names;
  const nested = (level >= 4 || opts.exam === 'open') && rng.chance(0.3);
  const o = nested ? teNested(level, rng, opts) : {
    skill: TE, level, key: `${level}:${T(d.pi)}:${d.n}:${T(d.p1)}:${T(d.p2)}`, subgoals: TE_SUB, exam: examTag(opts),
    prompt: `${t('À un oral, {A} interroge avec la probabilité {pi}, {B} sinon. Avec {A}, chacune des {n} questions est réussie avec la probabilité {p1} ; avec {B}, {p2}, indépendamment. N est le nombre de bonnes réponses.', { A, B, pi: S(d.pi), n: d.n, p1: S(d.p1), p2: S(d.p2) })} ${t('Calcule E[N] et var(N).')}`,
    parts: teParts(d, level),
    hints: H(t('Calcule tout sachant l\'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]).'),
      SM(`${T(d.pi)}×${T(d.e1)}+${T(d.pj)}×□`), `E[N] = ${S(d.e)} ; var(N) = ${S(d.ev)} + ${S(d.ve)} = ${S(d.v)}`),
  };
  if (opts.exam === 'coef') return coefItem({ ...o, prompt: o.prompt.replace(t('Calcule E[N] et var(N).'), t('Calcule var(N).')) });
  if (opts.exam === 'open') return openItem({ ...o, key: `open:${o.key}` }, 10, rng);
  return statItem(o);
}

// ======================================================================
// p-sum-mixture
// ======================================================================

const SM_ID = 'p-sum-mixture';
const SM_SUB = [
  { id: 'mix', label: t('moments du mélange'), skill: 'p-total-expect' },
  { id: 'conv', label: t('convolution'), skill: SM_ID },
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
    prompt: t('On lance deux dés équilibrés à {f} faces, indépendants ; S est la somme. Calcule Pr(S = {z}) par la convolution p_S({z}) = Σ p(i)·p({z} − i).', { f, z }),
    parts: [
      { label: t('nombre de couples'), name: 'k', kind: 'prob', expect: String(k), action: t('Lister les couples (i, z − i)'),
        notes: [t('Couples : {list}.', { list: pairs.map(([a, b]) => `(${a}, ${b})`).join(', ') })],
        lines: [L(pairs.map(() => '1').join('+'), t('Un terme 1/f² par couple possible'), 'conv', ['1']), L(String(k), t('Compter'), 'conv', [String(k)])] },
      { label: `Pr(S = ${z})`, name: 'p', kind: 'prob', expect: `$k/${f * f}`, action: t('Chaque couple a la probabilité 1/f²'),
        traps: { g7_laplace_not_equiprobable: { values: [`1/${2 * f - 1}`], ctx: { what: t('Les {n} sommes de 2 à {m}', { n: 2 * f - 1, m: 2 * f }) } } },
        wrongActions: [{ label: t('Diviser 1 par le nombre de sommes possibles ({n})', { n: 2 * f - 1 }), rule: 'g7_laplace_not_equiprobable', why: t('Les sommes ne sont pas équiprobables.') }],
        lines: [L(`${k}/${f * f}`, t('{f}² = {ff} couples équiprobables', { f, ff: f * f }), 'conv', [String(f * f)]), ...(q(k, f * f).d !== f * f ? [L(T(q(k, f * f)), t('Simplifier'), 'conv')] : [])] },
    ],
    hints: H(t('p_S(z) = Σᵢ p(i)·p(z − i) : un terme par couple (i, z − i) possible.'), SM(`□/${f * f}`), `Pr(S = ${z}) = ${S(q(k, f * f))}`),
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
    prompt: t('X et Y sont indépendantes, de loi U(0, 1). Calcule la densité de Z = X + Y en z = {z} : f_Z(z) = ∫ f_X(z − y)·f_Y(y) dy.', { z: S(zq) }),
    parts: [{
      label: `f_Z(${T(zq)})`, name: 'fz', kind: 'prob', expect: J(fz), action: t('Découper selon z : bornes max(0, z − 1) et min(1, z)'),
      traps: { p_conv_bounds: { values: ['1'] }, p_sum_density_add: { values: ['2'] } },
      decisions: [{ prompt: t('Pour z = {z}, sur quel intervalle y doit-il varier ?', { z: S(zq) }), options: [
        { id: 'ok', label: t('y ∈ [{lo} ; {hi}] : il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1', { lo: S(loq), hi: S(hiq) }), valid: true },
        { id: 'all', label: t('y ∈ [0 ; 1], comme f_Y'), valid: false, rule: 'p_conv_bounds', why: t('Il faut aussi 0 ≤ z − y ≤ 1 : les bornes dépendent de z.') },
        { id: 'add', label: t('Pas d\'intégrale : f_Z = f_X + f_Y'), valid: false, rule: 'p_sum_density_add', why: t('f_X + f_Y intègre à 2 : ce n\'est pas une densité. La somme demande une convolution.') },
      ] }],
      wrongActions: [{ label: t('Intégrer y de 0 à 1 pour tout z'), rule: 'p_conv_bounds', why: t('Les bornes dépendent de z.') }, { label: t('Additionner les densités'), rule: 'p_sum_density_add', why: t('f_X + f_Y n\'est pas une densité.') }],
      lines: [L(`${hi}-${lo}`, t('∫ de {lo} à {hi} de 1 dy', { lo, hi }), 'conv', [lo]), L(T(fz), t('Densité en triangle'), 'conv', [T(fz)])],
    }],
    hints: H(t('Il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 : y va de max(0, z − 1) à min(1, z).'), SM(`${hi}-□`), `f_Z(${S(zq)}) = ${S(fz)}`),
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
    { label: 'E[X]', name: 'e', kind: 'prob', expect: J(d.e), action: t('Moyenne pondérée des moyennes'),
      lines: [L(`${T(d.pi)}×${P(d.m1)}+${T(d.pj)}×${P(d.m2)}`, 'E = Σ πₖμₖ', 'mix', [T(d.pj)]), L(T(d.e), t('Calculer'), 'mix', [T(d.e)])] },
    { label: 'E[X²]', name: 'm', kind: 'prob', expect: J(d.m2nd), action: t('Seconds moments : σₖ² + μₖ²'),
      lines: [L(`${T(d.pi)}×(${d.s1}+${P(d.m1)}^2)+${T(d.pj)}×(${d.s2}+${P(d.m2)}^2)`, 'E[X²] = Σ πₖ(σₖ² + μₖ²)', 'mix', [`${P(d.m2)}^2`]), L(T(d.m2nd), t('Calculer'), 'mix', [T(d.m2nd)])] },
    { label: 'var(X)', name: 'v', kind: 'prob', expect: '$m-$e^2', action: t('König-Huygens : E[X²] − E[X]²'),
      traps: { p_mixture_vs_sum: { values: [J(d.vs)] } },
      wrongActions: [{ label: t('Calculer π²σ₁² + (1 − π)²σ₂²'), rule: 'p_mixture_vs_sum', why: t('C\'est la variance de la somme pondérée, un autre objet.') }],
      lines: [L(`${T(d.m2nd)}-${P(d.e)}^2`, 'var = E[X²] − E[X]²', 'mix', [`${P(d.e)}^2`]), L(T(d.v), t('Variance du mélange'), 'mix', [T(d.v)])] },
  ];
  if (level >= 4) {
    parts.push({ label: `var(${T(d.pi)}X₁ + ${T(d.pj)}X₂)`, name: 'vs', kind: 'prob', expect: J(d.vs), action: t('Somme pondérée : π²σ₁² + (1 − π)²σ₂²'),
      decisions: level >= 5 ? [{ prompt: t('Lequel des deux a un histogramme à deux bosses (si les moyennes sont loin) ?'), options: [
        { id: 'mix', label: t('Le mélange : il choisit une composante, puis tire autour de sa moyenne'), valid: true },
        { id: 'sum', label: t('La somme pondérée'), valid: false, rule: 'p_mixture_vs_sum', why: t('Une somme de normales indépendantes est normale : une seule bosse.') },
      ] }] : [],
      lines: [L(`${T(d.pi)}^2×${d.s1}+${T(d.pj)}^2×${d.s2}`, t('Variables indépendantes : les coefficients au carré'), 'conv'), L(T(d.vs), t('Un autre objet que le mélange'), 'conv')] });
  }
  return {
    skill: SM_ID, level, key: `${level}:mix:${T(d.pi)}:${d.m1}:${d.m2}:${d.s1}:${d.s2}`, subgoals: SM_SUB, exam: examTag(opts), parts,
    prompt: level >= 4 ? t('X est un mélange : avec la probabilité {pi} on tire X selon N({m1}, {s1}), sinon selon N({m2}, {s2}). Calcule E[X], E[X²] et var(X), puis la variance de la somme pondérée {pi}X₁ + {pj}X₂ (X₁ ~ N({m1}, {s1}), X₂ ~ N({m2}, {s2}) indépendantes).', { pi: S(d.pi), pj: S(d.pj), m1: S(d.m1), s1: d.s1, m2: S(d.m2), s2: d.s2 }) : t('X est un mélange : avec la probabilité {pi} on tire X selon N({m1}, {s1}), sinon selon N({m2}, {s2}). Calcule E[X], E[X²] et var(X).', { pi: S(d.pi), m1: S(d.m1), s1: d.s1, m2: S(d.m2), s2: d.s2 }),
    hints: H(t('Un mélange choisit une composante : E[X²] = Σ πₖ(σₖ² + μₖ²), puis var = E[X²] − E[X]².'), SM(`${T(d.pi)}×(${d.s1}+${P(d.m1)}^2)+□`), `var(X) = ${S(d.v)}`),
  };
}

function smExp(level, rng, opts) {
  const l = rng.pick([1, 2, 3]);
  const lt = l === 1 ? '' : String(l);
  const want = `${l * l === 1 ? '' : l * l}z×e^(-${lt}z)`;
  return {
    skill: SM_ID, level, key: `${level}:exp:${l}`, subgoals: SM_SUB, exam: examTag(opts),
    prompt: t('X et Y sont indépendantes, de loi exp({l}). Calcule la densité de Z = X + Y pour z > 0 (convolution).', { l }),
    parts: [{
      label: 'f_Z(z)', kind: 'prob', vars: ['z'], domain: { z: [0.1, 4] }, expect: want, action: t('Écrire la convolution, y de 0 à z'),
      traps: { p_sum_density_add: { values: [`${2 * l}e^(-${lt}z)`] } },
      wrongActions: [{ label: t('Additionner les densités'), rule: 'p_sum_density_add', why: t('f_X + f_Y intègre à 2 : ce n\'est pas une densité.') }],
      notes: [t('f_Z(z) = ∫₀ᶻ f_X(z − y)·f_Y(y) dy : f_X(z − y) > 0 demande y < z, f_Y(y) > 0 demande y > 0. L\'intégrande vaut {c}e^(−{lt}z) : elle ne dépend plus de y.', { c: l * l === 1 ? '' : l * l, lt })],
      lines: [L(want, 'Z ~ Γ(2, 1/λ)', 'conv', [`${l * l === 1 ? '' : l * l}z`])],
    }],
    keys: [...GK, 'anal'],
    hints: H(t('f_Z(z) = ∫ f_X(z − y)·f_Y(y) dy, avec 0 < y < z.'), t('L\'intégrande ne dépend pas de y : on intègre une constante de 0 à z.'), `f_Z(z) = ${want}`),
  };
}

function smItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') {
    const d = smMixData(rng);
    return choice({ skill: SM_ID, level: 4, key: `mcq:${T(d.pi)}:${d.m1}:${d.m2}:${d.s1}:${d.s2}`, exam: examTag(opts),
      prompt: t('X suit le mélange {pi}·N({m1}, {s1}) + {pj}·N({m2}, {s2}). Que vaut var(X) ?', { pi: S(d.pi), m1: S(d.m1), s1: d.s1, pj: S(d.pj), m2: S(d.m2), s2: d.s2 }),
      right: S(d.v), wrongs: [{ html: S(d.vs), rule: 'p_mixture_vs_sum' }],
      fillers: [{ html: S(d.pi.mul(d.s1).add(d.pj.mul(d.s2))) }, { html: S(d.m2nd) }, { html: S(d.v.add(1)) }] }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) {
      return tf({ skill: SM_ID, key: 'add', exam: examTag(opts), truth: false, ruleIfTrue: 'p_sum_density_add',
        statement: t('Si X et Y sont indépendantes de loi U(0, 1), la densité de X + Y est f_X + f_Y, qui vaut 2 sur [0 ; 1].'),
        explanation: t('La densité de X + Y est le triangle f(z) = z sur [0 ; 1] et 2 − z sur [1 ; 2] : en z = 1/2, elle vaut 1/2, pas 2.'),
        counter: numCounter({ vars: [{ v: 'z', label: t('z (où les deux diffèrent) =') }], hyp: 'z>0∧z<1', pred: 'z=2', answer: { z: '1/2' } }) });
    }
    return tf({ skill: SM_ID, key: 'mean', exam: examTag(opts), truth: true, statement: t('L\'espérance du mélange π·N(μ₁, σ₁²) + (1 − π)·N(μ₂, σ₂²) est πμ₁ + (1 − π)μ₂.'), explanation: t('E = Σ πₖμₖ : c\'est l\'espérance totale.') });
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
  { id: 'bound', label: t('bornes'), skill: MC },
  { id: 'normal', label: t('comparaison avec la normale'), skill: 'p-normal-std' },
];
const LLN = {
  prompt: t('Une pièce équilibrée est lancée de nombreuses fois. Que dit la loi des grands nombres ?'),
  options: [
    { html: t('La proportion de piles s\'approche de 1/2 quand le nombre de lancers grandit.'), correct: true },
    { html: t('Après 5 piles de suite, face est plus probable au lancer suivant.'), correct: false, rule: 'p_gambler' },
    { html: t('Le nombre de piles moins le nombre de faces tend vers 0.'), correct: false, rule: 'p_lln_count' },
    { html: t('Elle donne Pr(X ≥ a) ≤ E[X]/a pour toute variable X, même négative.'), correct: false, rule: 'p_markov_negative' },
  ],
};

function mcMarkov(level, rng) {
  const m = rng.int(2, 20);
  const k = rng.int(2, 6);
  const a = k * m;
  const what = rng.pick(['Le temps d\'attente X (en minutes) à un guichet est positif, d\'espérance {m}. Majore Pr(X ≥ {a}).', 'Le nombre X de clients en une heure est positif, d\'espérance {m}. Majore Pr(X ≥ {a}).', 'La durée de vie X d\'une ampoule (en mois) est positive, d\'espérance {m}. Majore Pr(X ≥ {a}).']);
  return {
    key: `markov:${m}:${a}`,
    prompt: t(what, { m, a }),
    parts: [{ label: `Pr(X ≥ ${a})`, name: 'b', kind: 'prob', expect: `${m}/${a}`, action: t('Markov : Pr(X ≥ a) ≤ E[X]/a'),
      decisions: [{ prompt: t('Quelle inégalité ?'), options: [
        { id: 'm', label: t('Markov : X ≥ 0 et on connaît E[X]'), valid: true },
        { id: 't', label: t('Tchebychev'), valid: false, why: t('On ne connaît pas la variance de X.') },
      ] }],
      lines: thenValue(`${m}/${a}`, q(m, a), 'Pr(X ≥ a) ≤ E[X]/a', 'bound', [String(m)]) }],
    hints: H(t('X ≥ 0 et E[X] connue : Markov, Pr(X ≥ a) ≤ E[X]/a.'), SM(`□/${a}`), `Pr(X ≥ ${a}) ≤ ${S(q(m, a))}`),
  };
}

function mcCheb(level, rng) {
  const mu = rng.int(2, 12) * 10;
  const s = rng.pick([2, 5, 10]);
  const k = rng.int(2, 5);
  const dd = k * s;
  const parts = [
    { label: 'k', name: 'k', kind: 'prob', expect: `${dd}/${s}`, action: t('Écrire l\'écart en nombre d\'écarts-types'),
      decisions: [{ prompt: t('Quelle inégalité ?'), options: [
        { id: 't', label: t('Tchebychev : on connaît μ et σ'), valid: true },
        { id: 'm', label: 'Markov', valid: false, rule: 'p_markov_negative', why: t('Markov demande X ≥ 0 et majore Pr(X ≥ a), pas un écart des deux côtés.') },
      ] }],
      lines: [L(`${dd}/${s}`, t('L\'écart {d} vaut k écarts-types', { d: dd }), 'bound', [String(s)]), L(String(k), `k = ${k}`, 'bound', [String(k)])] },
    { label: `Pr(|Y - ${mu}| ≥ ${dd})`, name: 'b', kind: 'prob', expect: '1/$k^2', action: t('Tchebychev : ≤ 1/k²'),
      traps: { p_chebyshev_k: { values: [`1/${k}`], ctx: { k, k2: k * k } } },
      wrongActions: [{ label: t('Borne 1/k'), rule: 'p_chebyshev_k', why: t('Tchebychev donne 1/k².') }],
      lines: [L(`1/${k}^2`, 'Pr(|Y − μ| ≥ kσ) ≤ 1/k²', 'bound', [`${k}^2`]), L(`1/${k * k}`, t('La borne'), 'bound', [String(k * k)])] },
  ];
  if (level >= 3 && k <= 3) {
    const ex = 2 * (1 - Phi(k));
    parts.push({ label: t('Pr si Y ~ N'), name: 'n', kind: 'stat', decimals: 3, expect: `2×(1-#phi($k))`, accept: [FJ(ex)], action: t('Comparer à la valeur exacte pour une normale'),
      lines: [L(`2×(1-Φ(${k}))`, t('Si Y est normale, deux queues'), 'normal'), L(F(2 * (1 - roundTo(Phi(k), k >= 3 ? 7 : 3)), 4), t('La borne de Tchebychev est large'), 'normal')] });
  }
  return {
    key: `cheb:${mu}:${s}:${k}`,
    prompt: level >= 3 && k <= 3 ? t('Y a pour moyenne {mu} et pour écart-type {s}. Majore Pr(|Y − {mu}| ≥ {d}), puis compare à la valeur exacte si Y est normale.', { mu, s, d: dd }) : t('Y a pour moyenne {mu} et pour écart-type {s}. Majore Pr(|Y − {mu}| ≥ {d}).', { mu, s, d: dd }),
    parts,
    hints: H(t('Compte combien d\'écarts-types fait l\'écart, puis 1/k².'), SM(`1/□^2`), `Pr ≤ 1/${k * k}`),
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
      prompt: t('Des mesures iid ont un écart-type σ = {s}. Par Tchebychev, combien en faut-il au moins pour que Pr(|X̄ − μ| ≥ {e}) ≤ {d} ?', { s, e: FS(e, 2), d: FS(dl, 2) }),
      parts: [
        { label: 'σ²/(δε²)', name: 'b', kind: 'prob', expect: J(v), action: t('Tchebychev pour X̄ : σ²/(nε²) ≤ δ'),
          lines: [L(`${s * s}/(${F(dl, 2)}×${F(e, 2)}^2)`, t('var(X̄) = σ²/n ; il faut σ²/(nε²) ≤ δ'), 'bound', [`${F(e, 2)}^2`]), L(T(v), t('Calculer'), 'bound', [T(v)])] },
        { label: 'n', name: 'n', kind: 'prob', expect: String(n), action: t('Le plus petit entier qui convient'),
          lines: [L(String(n), n === v.valueOf() ? 'n ≥ σ²/(δε²)' : t('Arrondir vers le haut'), 'bound', [String(n)])] },
      ],
      hints: H(t('var(X̄) = σ²/n ; Tchebychev donne Pr(|X̄ − μ| ≥ ε) ≤ σ²/(nε²), à rendre ≤ δ.'), SM(`${s * s}/(${F(dl, 2)}×□)`), `n ≥ ${n}`),
    };
  }
}

function mcItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') {
    const k = rng.int(2, 5);
    const s = rng.pick([2, 5, 10]);
    const mu = rng.int(2, 12) * 10;
    return choice({ skill: MC, level: 4, key: `mcq:${mu}:${s}:${k}`, exam: examTag(opts),
      prompt: t('Y a pour moyenne {mu} et pour écart-type {s}. Quelle est la meilleure borne que donne Tchebychev pour Pr(|Y − {mu}| ≥ {d}) ?', { mu, s, d: k * s }),
      right: `≤ 1/${k * k}`, wrongs: [{ html: `≤ 1/${k}`, rule: 'p_chebyshev_k' }, { html: `≤ ${mu}/${mu + k * s}`, rule: 'p_markov_negative' }],
      fillers: [{ html: `≤ 1/${2 * k}` }, { html: `= ${F(2 * (1 - Phi(k)), 3)}` }] }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) {
      return tf({ skill: MC, key: 'markovneg', exam: examTag(opts), truth: false, ruleIfTrue: 'p_markov_negative',
        statement: t('Pour toute variable aléatoire X (pas forcément positive) et tout a > 0, Pr(X ≥ a) ≤ E[X]/a.'),
        explanation: t('Markov demande X ≥ 0. Si X vaut toujours −1 et a = 1 : Pr(X ≥ 1) = 0, mais E[X]/a = −1.'),
        counter: numCounter({ vars: [{ v: 'c', label: t('X constante égale à c, c =') }, { v: 'a', label: 'a =' }], hyp: 'a>0∧c<a', pred: '0≤c/a', answer: { c: '-1', a: '1' } }) });
    }
    return tf({ skill: MC, key: 'gambler', exam: examTag(opts), truth: true, ruleIfFalse: 'p_gambler',
      statement: t('Après 5 piles de suite avec une pièce équilibrée, la probabilité de face au lancer suivant est 1/2.'),
      explanation: t('Les lancers sont indépendants : la pièce n\'a pas de mémoire.') });
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
  { id: 'sum', label: t('E et écart-type de la somme'), skill: 'p-lin-combo' },
  { id: 'std', label: t('standardiser, lire Φ'), skill: 'p-normal-std' },
  { id: 'clt', label: t('TCL'), skill: CS },
];
const CLT_DECISION = {
  prompt: t('Peut-on approcher la loi de la somme par une loi normale ?'),
  options: [
    { id: 'ok', label: t('Oui : n variables indépendantes de même loi, et n est grand'), valid: true },
    { id: 'pop', label: t('Seulement si la population est très grande'), valid: false, rule: 'p_clt_population', why: t('Le TCL porte sur la taille n de l\'échantillon, pas sur la population.') },
    { id: 'norm', label: t('Seulement si chaque variable est normale'), valid: false, rule: 'p_clt_needs_normal', why: t('Justement, le TCL sert quand la population n\'est pas normale.') },
  ],
};
const ZS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5];

function phiPart(zName, zRef, label = 'Φ(z)') {
  return { label, name: 'phi', kind: 'stat', decimals: 3, expect: `#phi($${zName})`, accept: phiAccepted(zRef).map((x) => FJ(x)), action: t('Lire la table de Φ'),
    lines: [L(F(phiTableOf(zRef), 3), t('Table 1'), 'std', [F(phiTableOf(zRef), 3)])] };
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
    'Un ascenseur transporte {n} personnes ; le poids d\'une personne a pour espérance {mu} kg et pour écart-type {s} kg. Par le théorème central limite, quelle est la probabilité approchée que le poids total dépasse {x} kg ?',
    'Un camion charge {n} colis ; un colis pèse en moyenne {mu} kg, avec un écart-type de {s} kg. Par le théorème central limite, quelle est la probabilité approchée que la charge dépasse {x} kg ?',
    'Un serveur traite {n} requêtes ; une requête dure en moyenne {mu} ms, avec un écart-type de {s} ms. Par le théorème central limite, quelle est la probabilité approchée que la durée totale dépasse {x} ms ?',
  ]);
  const pr = 1 - phiTableOf(d.z);
  const parts = [
    { label: 'E[S]', name: 'e', kind: 'prob', expect: String(d.e), action: t('Espérance de la somme : nμ'), decisions: [CLT_DECISION],
      lines: [L(`${d.n}×${d.mu}`, 'E[S] = nμ', 'sum', [String(d.mu)]), L(String(d.e), t('Calculer'), 'sum', [String(d.e)])] },
    { label: 'sd(S)', name: 'sd', kind: 'prob', expect: String(d.sd), action: t('Écart-type de la somme : σ√n'),
      traps: { p_clt_sum_sd: { values: [String(d.n * d.s)], ctx: { n: d.n, σ: d.s, v: d.sd } }, p_se_forgot_sqrt_n: { values: [String(d.s)], ctx: { n: d.n, v: d.sd } } },
      wrongActions: [{ label: t('Écart-type n·σ'), rule: 'p_clt_sum_sd', why: t('Ce sont les variances qui s\'additionnent : σ√n.') }],
      lines: [L(`√${d.n}×${d.s}`, t('var(S) = nσ², donc sd(S) = σ√n'), 'sum', [`√${d.n}`]), L(String(d.sd), t('Calculer'), 'sum', [String(d.sd)])] },
    { label: 'z', name: 'z', kind: 'stat', decimals: 2, expect: `(${d.x}-$e)/$sd`, action: t('Standardiser'),
      lines: [L(`(${d.x}-${d.e})/${d.sd}`, 'z = (s − E[S])/sd(S)', 'std', [String(d.e)]), L(F(d.z, 2), t('Calculer'), 'std', [F(d.z, 2)])] },
    phiPart('z', d.z, 'Φ(z)'),
    { label: 'Pr', name: 'p', kind: 'stat', decimals: 3, expect: '1-$phi', action: t('Complément : queue de droite'),
      traps: { p_upper_tail: { values: [FJ(phiTableOf(d.z))], ctx: { z: F(d.z, 2), v: F(phiTableOf(d.z), 3) } } },
      wrongActions: [{ label: t('Garder Φ(z)'), rule: 'p_upper_tail', why: t('Φ(z) est la probabilité d\'être en dessous.') }],
      lines: [L(`1-${F(phiTableOf(d.z), 3)}`, 'Pr(S > s) ≈ 1 − Φ(z)', 'clt', [F(phiTableOf(d.z), 3)]), L(F(pr, 3), t('TCL et table'), 'clt', [F(pr, 3)])] },
  ];
  const half = d.s * Math.sqrt(3);
  return {
    key: `sum:${d.n}:${d.mu}:${d.s}:${d.z}`, d,
    prompt: t(story, { n: d.n, mu: d.mu, s: d.s, x: d.x }),
    parts,
    simulate: { model: 'sum', n: d.n, of: { model: 'unif', a: d.mu - half, b: d.mu + half }, event: { op: 'gt', k: d.x }, answer: pr, label: t('Somme de {n} valeurs uniformes de moyenne {mu} et d\'écart-type {s}', { n: d.n, mu: d.mu, s: d.s }) },
    hints: H(t('La variance d\'une somme de n termes indépendants est nσ² ; l\'écart-type est σ√n.'), SM(`(${d.x}-${d.e})/□`), `z = ${FS(d.z, 2)} ; Pr ≈ 1 − Φ(${FS(d.z, 2)}) = ${F(pr, 3)}`),
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
    prompt: t('On mesure {n} valeurs iid d\'espérance {mu} et d\'écart-type {s}. Quelle est la probabilité approchée que la moyenne X̄ dépasse {x} ?', { n: d.n, mu: d.mu, s: d.s, x: FS(xb, 2) }),
    parts: [
      { label: 'E[X̄]', name: 'e', kind: 'prob', expect: String(d.mu), action: t('Espérance de la moyenne : μ'), decisions: [CLT_DECISION],
        lines: [L(String(d.mu), 'E[X̄] = μ', 'sum', [String(d.mu)])] },
      { label: 'sd(X̄)', name: 'sd', kind: 'prob', expect: `${d.s}/√${d.n}`, action: t('Écart-type de la moyenne : σ/√n'),
        traps: { p_se_forgot_sqrt_n: { values: [String(d.s)], ctx: { n: d.n, v: F(se, 3) } } },
        wrongActions: [{ label: t('Garder σ'), rule: 'p_se_forgot_sqrt_n', why: t('La moyenne varie moins qu\'une seule observation : σ/√n.') }],
        lines: [L(`${d.s}/√${d.n}`, 'sd(X̄) = σ/√n', 'sum', [`√${d.n}`]), L(T(seq), t('Calculer'), 'sum', [T(seq)])] },
      { label: 'z', name: 'z', kind: 'stat', decimals: 2, expect: `(${J(xq)}-$e)/$sd`, action: t('Standardiser'),
        lines: [L(`(${T(xq)}-${d.mu})/${T(seq)}`, 'z = (x̄ − μ)/(σ/√n)', 'std', [String(d.mu)]), L(F(d.z, 2), t('Calculer'), 'std')] },
      phiPart('z', d.z),
      { label: 'Pr', name: 'p', kind: 'stat', decimals: 3, expect: '1-$phi', action: t('Complément'),
        traps: { p_upper_tail: { values: [FJ(phiTableOf(d.z))] } },
        lines: [L(`1-${F(phiTableOf(d.z), 3)}`, t('Queue de droite'), 'clt'), L(F(pr, 3), t('TCL et table'), 'clt')] },
    ],
    hints: H(t('X̄ ≈ N(μ, σ²/n) : son écart-type est σ/√n.'), SM(`${d.s}/√□`), `Pr ≈ ${F(pr, 3)}`),
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
    prompt: t('Un camion charge {n} colis ; un colis pèse en moyenne {mu} kg, avec un écart-type de {s} kg. Quelle charge c (en kg) le camion doit-il supporter pour que Pr(charge > c) = {a} ?', { n: d.n, mu: d.mu, s: d.s, a: FS(a, 3) }),
    parts: [
      { label: 'E[S]', name: 'e', kind: 'prob', expect: String(d.e), action: t('Espérance de la somme'), decisions: [CLT_DECISION],
        lines: [L(`${d.n}×${d.mu}`, 'E[S] = nμ', 'sum'), L(String(d.e), t('Calculer'), 'sum')] },
      { label: 'sd(S)', name: 'sd', kind: 'prob', expect: String(d.sd), action: t('Écart-type de la somme'), traps: { p_clt_sum_sd: { values: [String(d.n * d.s)] } },
        lines: [L(`√${d.n}×${d.s}`, 'σ√n', 'sum'), L(String(d.sd), t('Calculer'), 'sum')] },
      { label: 'z', name: 'z', kind: 'stat', decimals: 2, expect: `#z(${p})`, accept: [FJ(PhiInv(p))], action: t('Lire la table de Φ⁻¹'),
        lines: [L(`Φ⁻¹(${F(p, 3)})`, `Φ(z) = 1 − ${FS(a, 3)}`, 'std'), L(F(z, 3), t('Table 2'), 'std')] },
      { label: 'c', name: 'c', kind: 'stat', decimals: 0, expect: '$e+$z×$sd', action: t('Revenir à l\'échelle de S'),
        lines: [L(`${d.e}+${F(z, 3)}×${d.sd}`, 'c = E[S] + z·sd(S)', 'clt'), L(F(c, 1), t('Capacité'), 'clt')] },
    ],
    hints: H(t('Pr(S > c) = α veut dire Φ((c − nμ)/(σ√n)) = 1 − α.'), SM(`${d.e}+□×${d.sd}`), `c ≈ ${FS(c, 1)} kg`),
  };
}

function csItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') {
    if (rng.chance(0.5)) {
      return choice({ skill: CS, level: 4, key: 'mcqcond', exam: examTag(opts),
        prompt: t('X₁, …, Xₙ sont iid d\'espérance μ et de variance σ². Sous quelle condition X̄ est-elle approximativement normale (théorème central limite) ?'),
        right: t('La taille n de l\'échantillon est grande'), wrongs: [{ html: t('La population dont on tire les Xᵢ est grande'), rule: 'p_clt_population' }, { html: t('Les Xᵢ sont normales'), rule: 'p_clt_needs_normal' }],
        fillers: [{ html: t('Les Xᵢ sont bornées') }] }, rng);
    }
    const d = csData(rng);
    const pr = 1 - phiTableOf(d.z);
    return choice({ skill: CS, level: 4, key: `mcq:${d.n}:${d.mu}:${d.s}:${d.z}`, exam: examTag(opts),
      prompt: t('{n} variables iid d\'espérance {mu} et d\'écart-type {s}. Pr(S > {x}) ≈ ? (S est leur somme)', { n: d.n, mu: d.mu, s: d.s, x: d.x }),
      right: F(pr, 3), wrongs: [{ html: F(phiTableOf(d.z), 3), rule: 'p_upper_tail' }, { html: F(1 - roundTo(Phi(d.z / d.rn), 3), 3), rule: 'p_clt_sum_sd' }],
      fillers: [{ html: F(1 - roundTo(Phi(d.z / 2), 3), 3) }, { html: F(2 * pr, 3) }] }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) {
      return tf({ skill: CS, key: 'sdsum', exam: examTag(opts), truth: false, ruleIfTrue: 'p_clt_sum_sd',
        statement: t('La somme de n variables indépendantes d\'écart-type σ a pour écart-type n·σ.'),
        explanation: t('Les variances s\'additionnent : var = nσ², donc l\'écart-type est σ√n. Avec n = 4 et σ = 1 : 2, pas 4.'),
        counter: numCounter({ vars: [{ v: 'n', label: 'n =', dom: 'N*' }, { v: 's', label: 'σ =' }], hyp: 'n≥2∧s>0', pred: 'n×s=√(n)×s', answer: { n: '4', s: '1' } }) });
    }
    return tf({ skill: CS, key: 'expo', exam: examTag(opts), truth: true, ruleIfFalse: 'p_clt_needs_normal',
      statement: t('Pour n grand, la moyenne empirique de n variables iid de loi exponentielle est approximativement normale.'), explanation: t('Le TCL ne demande pas que la population soit normale.') });
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
  { id: 'par', label: t('paramètres'), skill: 'p-binom' },
  { id: 'std', label: t('standardiser'), skill: 'p-normal-std' },
  { id: 'approx', label: t('approximation'), skill: CB },
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
    ? t('Le nombre X de clients d\'un magasin en un mois suit {law}.', { law })
    : rng.pick([d.p.eq?.(q(1, 2)) || Number(d.p) === 0.5 ? t('On lance {n} fois une pièce équilibrée ; X est le nombre de piles, X ~ {law}.', { n: d.n, law }) : t('Une machine produit des pièces défectueuses avec la probabilité {p}, indépendamment ; sur {n} pièces, X est le nombre de pièces défectueuses, X ~ {law}.', { p: S(d.p), n: d.n, law }), t('Dans un sondage, {n} personnes répondent ; chacune est favorable avec la probabilité {p}. X est le nombre de personnes favorables, X ~ {law}.', { n: d.n, p: S(d.p), law })]);
  if (opts.exam === 'mcq') {
    return choice({ skill: CB, level: 4, key: `mcq:${law}:${d.k}:${d.upper}`, exam: examTag(opts),
      prompt: `${story} ${t('Par l\'approximation normale (sans correction de continuité), Pr({ev}) ≈ ?', { ev })}`,
      right: F(pr, 3), wrongs: [{ html: F(d.upper ? ph : 1 - ph, 3), rule: 'p_upper_tail' }, { html: F(d.upper ? 1 - roundTo(Phi(d.z * d.s.valueOf() / d.v.valueOf()), 3) : roundTo(Phi(d.z * d.s.valueOf() / d.v.valueOf()), 3), 3), rule: 'p_binom_var_as_sd' }],
      fillers: [{ html: F(pr / 2, 3) }, { html: F(1 - pr / 2, 3) }] }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) {
      return tf({ skill: CB, key: 'sd', exam: examTag(opts), truth: false, ruleIfTrue: 'p_binom_var_as_sd',
        statement: t('Si X ~ B(n, p), l\'écart-type de X est np(1 − p).'),
        explanation: t('np(1 − p) est la variance ; l\'écart-type est sa racine. Pour n = 100 et p = 1/2 : 25 contre 5.'),
        counter: numCounter({ vars: [{ v: 'n', label: 'n =', dom: 'N*' }, { v: 'p', label: 'p =' }], hyp: 'p>0∧p<1', pred: 'n×p×(1-p)=√(n×p×(1-p))', answer: { n: '100', p: '1/2' } }) });
    }
    return tf({ skill: CB, key: 'mean', exam: examTag(opts), truth: true, statement: t('Si X ~ {law}, alors E[X] = {e} et var(X) = {v}.', { law, e: S(d.mu), v: S(d.v) }), explanation: d.poisson ? t('Pour Poisson, E = var = λ.') : t('E = np et var = np(1 − p).') });
  }
  const parts = [
    { label: 'E[X]', name: 'e', kind: 'prob', expect: J(d.mu), action: d.poisson ? 'E[X] = λ' : 'E[X] = np',
      decisions: d.poisson ? [] : [{ prompt: t('Quelle approximation ?'), levels: [1, 2, 3, 4], options: [
        { id: 'n', label: t('Normale : np = {a} et n(1 − p) = {b} sont grands', { a: S(d.mu), b: S(q(d.n).sub(d.mu)) }), valid: true },
        { id: 'p', label: 'Poisson', valid: false, rule: 'p_poisson_approx_bad', why: t('L\'approximation de Poisson demande p petit ; ici p = {p}.', { p: S(d.p) }) },
      ] }],
      lines: d.poisson ? [L(String(d.mu.n), t('Pour Poisson, E = λ'), 'par', [String(d.mu.n)])] : [L(`${d.n}×${T(d.p)}`, 'E = np', 'par', [T(d.p)]), L(T(d.mu), t('Calculer'), 'par', [T(d.mu)])] },
    { label: 'var(X)', name: 'v', kind: 'prob', expect: J(d.v), action: d.poisson ? 'var(X) = λ' : 'var(X) = np(1 − p)',
      lines: d.poisson ? [L(String(d.v.n), 'var = λ', 'par')] : [L(`${d.n}×${T(d.p)}×${T(q(1).sub(d.p))}`, 'var = np(1 − p)', 'par', [T(q(1).sub(d.p))]), L(T(d.v), t('Calculer'), 'par', [T(d.v)])] },
    { label: 'σ', name: 's', kind: 'prob', expect: '√$v', action: t('Racine de la variance'),
      traps: { p_binom_var_as_sd: { values: [J(d.v)], ctx: { v: S(d.v) } } },
      wrongActions: [{ label: t('Prendre σ = np(1 − p)'), rule: 'p_binom_var_as_sd', why: t('np(1 − p) est la variance.') }],
      lines: [L(`√${T(d.v)}`, 'σ = √var', 'par', [T(d.v)]), L(T(d.s), t('Écart-type'), 'par', [T(d.s)])] },
    { label: 'z', name: 'z', kind: 'stat', decimals: 2, expect: `(${d.k}-$e)/$s`, action: t('Standardiser'),
      lines: [L(`(${d.k}-${T(d.mu)})/${T(d.s)}`, 'z = (k − μ)/σ', 'std', [T(d.mu)]), L(F(d.z, 2), t('Calculer'), 'std', [F(d.z, 2)])] },
    phiPart('z', d.z),
    { label: `Pr(${ev})`, name: 'p', kind: 'stat', decimals: 3, expect: d.upper ? '1-$phi' : '$phi', action: d.upper ? t('Queue de droite : 1 − Φ(z)') : t('Queue de gauche : Φ(z)'),
      traps: { p_upper_tail: { values: [FJ(d.upper ? ph : 1 - ph)], ctx: { z: F(d.z, 2), v: F(ph, 3) } } },
      lines: d.upper ? [L(`1-${F(ph, 3)}`, t('Complément'), 'approx', [F(ph, 3)]), L(F(pr, 3), t('Approximation normale'), 'approx', [F(pr, 3)])] : [L(F(pr, 3), 'Pr ≈ Φ(z)', 'approx', [F(pr, 3)])] },
  ];
  const o = {
    skill: CB, level, key: `${level}:${law}:${d.k}:${d.upper}`, parts, subgoals: CB_SUB, exam: examTag(opts),
    prompt: `${story} ${t('Par l\'approximation normale (sans correction de continuité, comme le cours), calcule Pr({ev}).', { ev })}`,
    hints: H(d.poisson ? t('Poiss(λ) ≈ N(λ, λ) : l\'écart-type est √λ.') : t('np(1 − p) est la <b>variance</b> : prends sa racine.'), SM(`(${d.k}-${T(d.mu)})/√□`), `z = ${FS(d.z, 2)} ; Pr ≈ ${F(pr, 3)}`),
    simulate: d.poisson ? { model: 'poisson', lambda: d.mu.n, event: { op: d.upper ? 'ge' : 'le', k: d.k }, answer: pr, label: t('Pr({ev}) simulée', { ev }) } : { model: 'binom', n: d.n, p: d.p.valueOf(), event: { op: d.upper ? 'ge' : 'le', k: d.k }, answer: pr, label: t('Pr({ev}) simulée (la valeur exacte diffère un peu : pas de correction de continuité)', { ev }) },
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

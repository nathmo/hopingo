// Generators of module P, part c, estimators (unit `proba`, step U7):
// method of moments, maximum likelihood, MLE at the edge of the support and
// invariance, bias and mean squared error, Fisher information and
// Cramér-Rao. Catalogue: docs/universite/P-probabilites.md; traps:
// js/cas/rules/pc.js; GEN merged by proba-c.js.
//
// Expressions in the parameter (ℓ(λ), ℓ′, ℓ″, E[Y] = 3θ/4, I₁(λ) = 1/λ)
// are parts of the `prob` judge in expression mode (vars, domain), one line
// each; ℓ(θ) is compared up to an additive constant (the course keeps or
// drops the terms without θ). Numbers (θ̂, J, se, IC) are numeric parts,
// computed from the student's own earlier values ($th, $J).

import { statItem, coefItem, openItem, choice, tf, numCounter, H, SM, examTag } from './proba-kit.js';
import { Phi } from '../../cas/stats.js';
import { q, J, T, S, F, FS, FJ, L, finalText, thenValue } from './proba-c-kit.js';
import { t } from '../../i18n.js';

// « iid de loi exp(λ) », but « iid de la loi de densité … ».
// Exponents written as superscripts in the statements: 2y/θ², 4y³/θ⁴.
const supT = (s) => String(s).replace(/\^(\d+)/g, (m, d) => [...d].map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join(''));
const densT = (k) => supT(`${k + 1}y${k === 1 ? '' : `^${k}`}/θ^${k + 1}`);
const ofLaw = (l) => (l.startsWith('la loi') ? t('de {l}', { l: t(l) }) : t('de loi {l}', { l: t(l) }));
const GK = ['calc', 'stat', 'greek', 'calcfn'];

// ======================================================================
// p-mom
// ======================================================================

const MOM = 'p-mom';
const MOM_SUB = [
  { id: 'th', label: t('moments théoriques'), skill: 'p-moments' },
  { id: 'solve', label: t('résoudre'), skill: MOM },
];

// One parameter, data given by n and Σxᵢ.
const MOM_MODELS = [
  { id: 'exp', sym: 'λ', law: 'exp(λ)', E: '1/λ', hat: (m) => q(1).div(m), hatT: '1/$m', hatLine: (m) => `1/${T(m)}`, dom: [0.2, 5],
    data: (rng) => { const l = rng.pick([q(1, 2), q(1, 4), q(2), q(1, 5), q(1, 10), q(4)]); const n = rng.pick([10, 20, 25, 40, 50]); const s = q(n).div(l); return s.isInt() ? { n, s: s.n, hat: l } : null; } },
  { id: 'pois', sym: 'λ', law: 'Poiss(λ)', E: 'λ', hat: (m) => m, hatT: '$m', hatLine: (m) => T(m), dom: [0.2, 5],
    data: (rng) => { const n = rng.pick([10, 20, 25, 40]); const s = rng.int(n, 5 * n); return { n, s, hat: q(s, n) }; } },
  { id: 'unif', sym: 'θ', law: 'U[0, θ]', E: 'θ/2', hat: (m) => m.mul(2), hatT: '2×$m', hatLine: (m) => `2×${T(m)}`, dom: [0.5, 20],
    data: (rng) => { const n = rng.pick([10, 20, 25, 40]); const s = rng.int(2 * n, 8 * n); return { n, s, hat: q(2 * s, n) }; } },
  { id: 'pareto', sym: 'α', law: 'la loi de Pareto de densité αx^(−α−1) sur ]1 ; ∞[ (α > 1)', E: 'α/(α-1)', hat: (m) => m.div(m.sub(1)), hatT: '$m/($m-1)', hatLine: (m) => `${T(m)}/(${T(m)}-1)`, dom: [1.5, 6],
    data: (rng) => { const [a, b] = rng.pick([[3, 2], [2, 1], [5, 4], [4, 3]]); const n = rng.pick([12, 24, 36]); return { n, s: (n * a) / b, hat: q(a, b).div(q(a, b).sub(1)) }; } },
  { id: 'beta', sym: 'θ', law: 'la loi de densité θx^(θ−1) sur ]0 ; 1[', E: 'θ/(θ+1)', hat: (m) => m.div(q(1).sub(m)), hatT: '$m/(1-$m)', hatLine: (m) => `${T(m)}/(1-${T(m)})`, dom: [0.5, 6],
    data: (rng) => { const [a, b] = rng.pick([[3, 4], [2, 3], [4, 5], [1, 2]]); const n = 60; return { n, s: (n * a) / b, hat: q(a, b).div(q(1).sub(q(a, b))) }; } },
];

function momOne(level, rng, model) {
  let d = null;
  while (!d) d = model.data(rng);
  const m = q(d.s, d.n);
  const hat = model.hat(m);
  const exS = `E[X] = ${model.E.replace('-', '−')}`;
  const parts = [
    { label: 'x̄', name: 'm', kind: 'prob', expect: `${d.s}/${d.n}`, action: t('Moment empirique : x̄ = Σxᵢ/n'),
      lines: [L(`${d.s}/${d.n}`, 'x̄ = Σxᵢ/n', 'solve', [String(d.n)]), ...(m.d !== d.n ? [L(T(m), t('Calculer'), 'solve', [T(m)])] : [])] },
  ];
  if (level >= 2) {
    parts.push({ label: 'E[X]', kind: 'prob', vars: [model.sym], domain: { [model.sym]: model.dom }, expect: model.E, action: t('Moment théorique en fonction du paramètre'),
      lines: [L(model.E, t('Espérance de {l}', { l: t(model.law) }), 'th', [model.E])] });
  }
  parts.push({ label: `${model.sym}̂`, name: 'th', kind: 'prob', expect: model.hatT, action: t('Égaler E[X] = x̄ et isoler {v}', { v: model.sym }),
    traps: model.id === 'exp' ? { p_exp_rate_mean: { values: [J(m)], ctx: { m: S(m), x: '' } } } : {},
    notes: level === 1 ? [t('{ex} : on résout {e} = x̄.', { ex: exS, e: model.E.replace('-', '−') })] : [],
    lines: thenValue(model.hatLine(m), hat, t('{e} = x̄, puis isoler {v}', { e: model.E.replace('-', '−'), v: model.sym }), 'solve', [T(m)]) });
  return {
    key: `${model.id}:${d.n}:${d.s}`, hat,
    prompt: t('X₁, …, Xₙ (n = {n}) sont iid {law}. On observe Σxᵢ = {s}. Estime {v} par la méthode des moments.', { n: d.n, law: ofLaw(model.law), s: d.s, v: model.sym }),
    parts,
    hints: H(t('Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre.'), t('{e} = {m}, donc {v} = □', { e: model.E.replace('-', '−'), m: S(m), v: model.sym }), `${model.sym}̂ = ${S(hat)}`),
  };
}

// Γ(k, θ): two moments, diviser n.
function momGammaData(rng) {
  for (;;) {
    const n = rng.pick([4, 5, 6, 8]);
    const m = rng.int(4, 12);
    const devs = [];
    for (let i = 0; i < Math.floor(n / 2); i++) { const a = rng.int(1, m - 1); devs.push(a, -a); }
    if (n % 2) devs.push(0);
    const ss = devs.reduce((s, x) => s + x * x, 0);
    if (ss % n) continue;
    const v = ss / n;
    const th = q(v, m);
    const k = q(m).div(th);
    if (th.d > 4 || k.d > 4) continue;
    const xs = rng.shuffle(devs.map((x) => m + x));
    return { n, m, xs, ss, v, th, k, sum: n * m };
  }
}

function momGamma(level, rng) {
  const d = momGammaData(rng);
  const wrongTh = q(d.ss, d.n - 1).div(d.m);
  const parts = [
    { label: 'x̄', name: 'm', kind: 'prob', expect: `${d.sum}/${d.n}`, action: t('Premier moment empirique'),
      lines: [L(`${d.sum}/${d.n}`, t('Somme des données / n'), 'solve', [String(d.sum)]), L(String(d.m), 'x̄', 'solve', [String(d.m)])] },
    { label: 'σ̂²', name: 's', kind: 'prob', expect: `${d.ss}/${d.n}`, action: t('Second moment centré, diviseur n'),
      traps: { p_mom_s2: { values: [J(q(d.ss, d.n - 1))], ctx: { n: d.n } } },
      decisions: [{ prompt: t('Quelle seconde équation ?'), levels: [1, 2, 3, 4, 5], options: [
        { id: 'v', label: 'var(X) = σ̂² = (1/n)Σ(xᵢ − x̄)²', valid: true },
        { id: 'sq', label: 'E[X²] = x̄²', valid: false, rule: 'p_mom_wrong_moment', why: t('Le moment empirique d\'ordre 2 est la moyenne des carrés, pas le carré de la moyenne.') },
        { id: 's2', label: 'var(X) = s² = Σ(xᵢ − x̄)²/(n − 1)', valid: false, rule: 'p_mom_s2', why: t('La méthode des moments égale au moment empirique : on divise par n = {n}.', { n: d.n }) },
      ] }],
      wrongActions: [{ label: t('Diviser par n − 1'), rule: 'p_mom_s2', why: t('Les moments empiriques divisent par n.') }],
      lines: [L(`${d.ss}/${d.n}`, `Σ(xᵢ − x̄)² = ${d.ss}`, 'solve', [String(d.ss)]), L(String(d.v), 'σ̂²', 'solve', [String(d.v)])] },
    { label: 'θ̂', name: 't', kind: 'prob', expect: '$s/$m', action: t('Diviser les deux équations : kθ² / kθ = θ'),
      traps: { p_mom_s2: { values: [J(wrongTh)], ctx: { n: d.n } } },
      notes: [t('E[X] = kθ et var(X) = kθ² pour Γ(k, θ).')],
      lines: [L(`${d.v}/${d.m}`, t('kθ = x̄ et kθ² = σ̂², donc θ = σ̂²/x̄'), 'th', [String(d.v)]), ...(d.th.d !== d.m ? [L(T(d.th), 'θ̂', 'solve', [T(d.th)])] : [])] },
    { label: 'k̂', name: 'k', kind: 'prob', expect: '$m/$t', action: t('Isoler k : k = x̄/θ'),
      lines: thenValue(`${d.m}/${d.th.d === 1 ? T(d.th) : `(${T(d.th)})`}`, d.k, 'k = x̄/θ̂', 'solve', [String(d.m)]) },
  ];
  return {
    key: `gamma:${d.xs.join(',')}`, hat: d.th, wrongTh,
    prompt: `${t('Les données {xs} viennent d\'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²).', { xs: d.xs.join(' ; ') })} ${t('Estime θ et k par la méthode des moments.')}`,
    parts,
    hints: H(t('Deux paramètres : deux équations, E[X] = x̄ et var(X) = σ̂² (diviseur n).'), SM(`${d.v}/□`), `θ̂ = ${S(d.th)} ; k̂ = ${S(d.k)}`),
  };
}

function momItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') {
    const g = momGamma(4, rng);
    const d = g.parts;
    return choice({ skill: MOM, level: 4, key: `mcq:${g.key}`, exam: examTag(opts),
      prompt: g.prompt.replace(t('Estime θ et k par la méthode des moments.'), t('Que vaut θ̂ par la méthode des moments ?')),
      right: S(g.hat), wrongs: [{ html: S(g.wrongTh), rule: 'p_mom_s2' }],
      fillers: [{ html: S(q(1).div(g.hat)) }, { html: S(g.hat.mul(2)) }, { html: S(g.hat.add(1)) }] }, rng);
    void d;
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) return tf({ skill: MOM, key: 'xbar', exam: examTag(opts), truth: true, statement: t('Pour estimer θ = E[X], la moyenne X̄ est l\'estimateur des moments, quel que soit le modèle.'), explanation: t('La méthode des moments égale E[X] à x̄ : si θ = E[X], θ̂ = X̄.') });
    return tf({ skill: MOM, key: 'exp', exam: examTag(opts), truth: false, ruleIfTrue: 'p_exp_rate_mean',
      statement: t('Pour un échantillon de loi exp(λ) (espérance 1/λ), l\'estimateur des moments de λ est x̄.'),
      explanation: t('E[X] = 1/λ = x̄ donne λ̂ = 1/x̄ : avec x̄ = 2, λ̂ = 1/2, pas 2.'),
      counter: numCounter({ vars: [{ v: 'm', label: t('Une moyenne x̄ =') }], hyp: 'm>0', pred: '1/m=m', answer: { m: '2' } }) });
  }
  const gamma = level === 5 ? rng.chance(0.6) : level >= 3 ? rng.chance(0.4) : level === 2 ? rng.chance(0.3) : false;
  const d = gamma ? momGamma(level, rng) : momOne(level, rng, level === 1 ? rng.pick(MOM_MODELS.slice(0, 3)) : rng.pick(MOM_MODELS));
  const o = { skill: MOM, level, key: `${level}:${d.key}`, prompt: d.prompt, parts: d.parts, hints: d.hints, subgoals: MOM_SUB, keys: GK, exam: examTag(opts) };
  if (opts.exam === 'coef') return coefItem(o);
  return statItem(o);
}

// ======================================================================
// p-mle
// ======================================================================

const MLE = 'p-mle';
const MLE_SUB = [
  { id: 'log', label: t('logarithme'), skill: 'g2-log-rules' },
  { id: 'deriv', label: t('dériver'), skill: 'g6-deriv-rules' },
  { id: 'solve', label: t('isoler'), skill: 'iso-formula' },
  { id: 'mle', label: t('vraisemblance, θ̂, vérification'), skill: MLE },
  { id: 'wald', label: 'Wald', skill: 'p-ci-wald' },
];

// Models in closed form: n, S (and n − S…), the estimate, J at the estimate.
const MLE_MODELS = {
  exp: {
    sym: 'λ', dom: [0.3, 5], law: 'exp(λ), de densité λe^(−λx) pour x > 0', sumName: 'Σxᵢ',
    pick: (rng) => { const n = rng.pick([16, 25, 36, 64, 100]); const h = rng.pick([q(1, 2), q(1), q(2), q(4), q(5, 2), q(1, 4)]); const s = q(n).div(h); return s.isInt() ? { n, s: s.n, h } : null; },
    Lnote: ({ n, s }) => `L(λ) = Π λe^(−λxᵢ) = λ^${n}·e^(−${s}λ)`,
    ell: ({ n, s }) => `${n}ln(λ)-${s}λ`, d1: ({ n, s }) => `${n}/λ-${s}`, d2: ({ n }) => `-${n}/λ^2`,
    hatLine: ({ n, s }) => `${n}/${s}`, Jexp: ({ n }) => `${n}/$th^2`, Jline: ({ n, h }) => `${n}/${T(h)}^2`,
    lit: { ell: 'n×ln(λ)-S×λ', d1: 'n/λ-S', hat: 'n/S', d2: '-n/λ^2', J: 'S^2/n' },
  },
  pois: {
    sym: 'λ', dom: [0.3, 6], law: 'Poiss(λ)', sumName: 'Σxᵢ',
    pick: (rng) => { const [n, l] = rng.pick([[25, 1], [50, 2], [18, 2], [36, 4], [20, 5], [64, 4], [100, 4]]); return { n, s: n * l, h: q(l) }; },
    Lnote: ({ s, n }) => `L(λ) = Π λ^(xᵢ)e^(−λ)/xᵢ! ∝ λ^${s}·e^(−${n ?? 'n'}λ)`,
    ell: ({ n, s }) => `${s}ln(λ)-${n}λ`, d1: ({ n, s }) => `${s}/λ-${n}`, d2: ({ s }) => `-${s}/λ^2`,
    hatLine: ({ n, s }) => `${s}/${n}`, Jexp: ({ s }) => `${s}/$th^2`, Jline: ({ s, h }) => `${s}/${T(h)}^2`,
    lit: { ell: 'S×ln(λ)-n×λ', d1: 'S/λ-n', hat: 'S/n', d2: '-S/λ^2', J: 'n^2/S' },
  },
  bern: {
    sym: 'p', dom: [0.1, 0.9], law: 'Bernoulli de paramètre p', sumName: 'le nombre de succès S',
    pick: (rng) => { const [n, h] = rng.pick([[100, q(1, 2)], [100, q(1, 5)], [400, q(1, 5)], [64, q(1, 2)]]); return { n, s: h.mul(n).n, h }; },
    Lnote: ({ n, s }) => `L(p) = p^${s}·(1 − p)^${n - s}`,
    ell: ({ n, s }) => `${s}ln(p)+${n - s}ln(1-p)`, d1: ({ n, s }) => `${s}/p-${n - s}/(1-p)`, d2: ({ n, s }) => `-${s}/p^2-${n - s}/(1-p)^2`,
    hatLine: ({ n, s }) => `${s}/${n}`, Jexp: ({ n, s }) => `${s}/$th^2+${n - s}/(1-$th)^2`, Jline: ({ n, s, h }) => `${s}/${T(h)}^2+${n - s}/(1-${T(h)})^2`,
  },
  rain: {
    sym: 'θ', dom: [0.05, 3], law: 'la loi de densité √θ·e^(−θx)/√(πx) pour x > 0', sumName: 'Σxᵢ',
    pick: (rng) => { const n = rng.pick([50, 32, 72, 200]); const h = rng.pick([q(1, 4), q(1, 2), q(1), q(1, 8)]); const s = q(n).div(h.mul(2)); return s.isInt() ? { n, s: s.n, h } : null; },
    Lnote: ({ n, s }) => `L(θ) ∝ θ^(${n}/2)·e^(−${s}θ)`,
    ell: ({ n, s }) => `${n}/2×ln(θ)-${s}θ`, d1: ({ n, s }) => `${n}/(2θ)-${s}`, d2: ({ n }) => `-${n}/(2θ^2)`,
    hatLine: ({ n, s }) => `${n}/(2×${s})`, Jexp: ({ n }) => `${n}/(2×$th^2)`, Jline: ({ n, h }) => `${n}/(2×${T(h)}^2)`,
  },
  geom: {
    sym: 'p', dom: [0.1, 0.9], law: 'géométrique Pr(X = x) = (1 − p)ˣp pour x = 0, 1, … (le nombre d\'échecs avant le premier succès)', sumName: 'Σxᵢ',
    pick: (rng) => { const [n, h] = rng.pick([[50, q(1, 2)], [8, q(1, 2)], [32, q(1, 2)], [20, q(1, 5)]]); return { n, s: q(n).mul(q(1).sub(h)).div(h).n, h }; },
    Lnote: ({ n, s }) => `L(p) = Π (1 − p)^(xᵢ)p = p^${n}·(1 − p)^${s}`,
    ell: ({ n, s }) => `${n}ln(p)+${s}ln(1-p)`, d1: ({ n, s }) => `${n}/p-${s}/(1-p)`, d2: ({ n, s }) => `-${n}/p^2-${s}/(1-p)^2`,
    hatLine: ({ n, s }) => `${n}/(${n}+${s})`, Jexp: ({ n, s }) => `${n}/$th^2+${s}/(1-$th)^2`, Jline: ({ n, s, h }) => `${n}/${T(h)}^2+${s}/(1-${T(h)})^2`,
  },
};

function mleData(rng, kinds) {
  for (;;) {
    const kind = rng.pick(kinds);
    const M = MLE_MODELS[kind];
    const d = M.pick(rng);
    if (!d) continue;
    const vJ = jAt(kind, d);
    const se = q(1).div(vJ).sqrt();
    if (!se) continue;
    return { kind, M, ...d, Jv: vJ, se };
  }
}
function jAt(kind, d) {
  const { n, s, h } = d;
  if (kind === 'exp') return q(n).div(h.mul(h));
  if (kind === 'pois') return q(s).div(h.mul(h));
  if (kind === 'rain') return q(n).div(h.mul(h).mul(2));
  return q(kind === 'bern' ? s : n).div(h.mul(h)).add(q(kind === 'bern' ? n - s : s).div(q(1).sub(h).mul(q(1).sub(h))));
}

const MAX_DECISION = (sym) => ({
  prompt: t('ℓ″({v}) < 0 : que peut-on conclure ?', { v: sym }),
  options: [
    { id: 'max', label: t('ℓ est concave : {v}̂ est le maximum global', { v: sym }), valid: true },
    { id: 'zero', label: t('Rien à vérifier : ℓ′({v}̂) = 0 suffit', { v: sym }), valid: false, rule: 'p_mle_no_check', why: t('Un point où ℓ′ s\'annule peut être un minimum : ℓ″ < 0 garantit le maximum.') },
    { id: 'min', label: t('{v}̂ est un minimum', { v: sym }), valid: false, why: t('ℓ″ < 0 : la courbe est tournée vers le bas, c\'est un maximum.') },
  ],
});

const MLE_INTERPRET = {
  prompt: t('Interpréter : sur quoi repose cet IC de Wald ?'),
  options: [
    { html: t('Il est approché : valable si n est grand et si le modèle est régulier (le support ne dépend pas du paramètre).'), correct: true },
    { html: t('Il est exact pour tout n.'), correct: false },
    { html: t('Le paramètre est dans cet intervalle avec la probabilité 0,95.'), correct: false, rule: 'p_ci_prob' },
    { html: t('95 % des données sont dans cet intervalle.'), correct: false, rule: 'p_ci_data' },
  ],
};

function mleParts(d, level, literal) {
  const { M } = d;
  const v = M.sym;
  const vars = literal ? [v, 'n', 'S'] : [v];
  const dom = literal ? { [v]: M.dom, n: [5, 60], S: [5, 120] } : { [v]: M.dom };
  const E = (key) => (literal ? M.lit[key] : M[key](d));
  const first = (s) => (/\d+/.exec(s) || [''])[0];
  const parts = literal ? [] : [
    { label: 'x̄', name: 'xb', kind: 'prob', expect: `${d.s}/${d.n}`, action: t('La moyenne des données'),
      lines: [L(`${d.s}/${d.n}`, `x̄ = ${d.M.sumName.replace('le nombre de succès S', 'S')}/n`, 'mle', [String(d.n)]), ...(q(d.s, d.n).d !== d.n ? [L(T(q(d.s, d.n)), t('Calculer'), 'mle')] : [])] },
  ];
  parts.push(
    { label: `ℓ(${v})`, kind: 'prob', vars, domain: dom, upToConstant: !literal, expect: E('ell'), action: t('Logarithme : le produit devient une somme'),
      notes: [literal ? t('{L} (on laisse tomber les termes sans {v})', { L: M.Lnote({ n: 'n', s: 'S' }), v }) : t('{L} (ℓ est comparée à une constante près : les termes sans {v} peuvent rester ou partir)', { L: M.Lnote(d), v })],
      lines: [L(E('ell'), t('ℓ = ln L (à une constante près)'), 'log', literal ? [] : [first(E('ell'))])] },
    { label: `ℓ′(${v})`, kind: 'prob', vars, domain: dom, expect: E('d1'), action: t('Dériver en {v} seulement', { v }),
      wrongActions: [{ label: t('Dériver aussi les termes qui ne contiennent que les données (Σxᵢ, Σ ln xᵢ!)'), rule: 'p_mle_constant_kept', why: t('Une donnée est une constante : sa dérivée est 0.') }],
      lines: [L(E('d1'), t('Dériver en {v}', { v }), 'deriv', literal ? [] : [String(d.s)])] });
  if (literal) {
    parts.push({ label: `${v}̂`, kind: 'prob', vars: ['n', 'S'], domain: { n: [5, 60], S: [5, 120] }, expect: M.lit.hat, action: t('Annuler ℓ′ et isoler'),
      lines: [L(M.lit.hat, `ℓ′(${v}̂) = 0`, 'solve')] });
    parts.push({ label: `ℓ″(${v})`, kind: 'prob', vars, domain: dom, expect: M.lit.d2, action: t('Dériver deux fois'),
      lines: [L(M.lit.d2, t('Dériver encore'), 'deriv')] });
    parts.push({ label: `J(${v}̂)`, kind: 'prob', vars: ['n', 'S'], domain: { n: [5, 60], S: [5, 120] }, expect: M.lit.J, action: t('J = −ℓ″ en l\'estimateur'),
      decisions: [MAX_DECISION(v)],
      lines: [L(M.lit.J, `−ℓ″(${v}̂)`, 'wald')] });
    return parts;
  }
  const h = d.h;
  parts.push({ label: `${v}̂`, name: 'th', kind: 'prob', expect: d.M.hatLine(d), action: t('Annuler ℓ′ et isoler'),
    traps: { p_mle_solve: { values: [J(q(1).div(h))].filter((x) => x !== J(h)), ctx: {} } },
    wrongActions: [{ label: t('Prendre l\'inverse de la solution'), rule: 'p_mle_solve', why: t('Isole soigneusement : on multiplie, on ne renverse pas.') }],
    lines: thenValue(d.M.hatLine(d), h, `ℓ′(${v}̂) = 0`, 'solve', [String(d.s)]) });
  parts.push({ label: `ℓ″(${v})`, kind: 'prob', vars, domain: dom, expect: M.d2(d), action: t('Dériver deux fois'),
    lines: [L(M.d2(d), t('Dériver encore'), 'deriv', [`${v}^2`])] });
  parts.push({ label: `J(${v}̂)`, name: 'J', kind: 'prob', expect: M.Jexp(d), action: t('J = −ℓ″ en l\'estimateur'),
    decisions: [MAX_DECISION(v)],
    traps: { p_wald_sign: { values: [J(d.Jv.neg())], ctx: { J: S(d.Jv) } } },
    wrongActions: [{ label: t('Prendre ℓ″({v}̂) tel quel', { v }), rule: 'p_wald_sign', why: t('J = −ℓ″(θ̂) est positive.') }],
    lines: [L(M.Jline(d), `−ℓ″(${v}̂)`, 'wald'), L(T(d.Jv), t('Information observée'), 'wald', [T(d.Jv)])] });
  if (level >= 3) {
    parts.push({ label: `se(${v}̂)`, name: 'se', kind: 'prob', expect: '1/√$J', action: t('Erreur standard : 1/√J'),
      traps: { p_wald_var_inverse: { values: [J(d.Jv.sqrt() ?? d.Jv), J(d.Jv), J(q(1).div(d.Jv))].filter((x) => x !== J(d.se)), ctx: { J: S(d.Jv), se: S(d.se) } } },
      wrongActions: [{ label: 'se = √J', rule: 'p_wald_var_inverse', why: t('La variance asymptotique est l\'inverse de J.') }],
      lines: [L(`1/√${T(d.Jv)}`, 'Var ≈ 1/J', 'wald', [T(d.Jv)]), L(T(d.se), t('Erreur standard'), 'wald', [T(d.se)])] });
  }
  if (level >= 4) {
    const lo = h.valueOf() - 1.96 * d.se.valueOf();
    const hi = h.valueOf() + 1.96 * d.se.valueOf();
    parts.push({ label: 'IC₉₅', name: 'ic', kind: 'stat', decimals: 3, expect: ['$th-1.96×$se', '$th+1.96×$se'], action: t('IC de Wald : θ̂ ± 1,96·se'),
      lines: [L(`[${F(lo, 3)};${F(hi, 3)}]`, `${S(h)} ± 1,96 · ${S(d.se)}`, 'wald')] });
  }
  return parts;
}

function mleItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') {
    const d = mleData(rng, ['exp', 'pois', 'rain']);
    const v = d.M.sym;
    if (rng.chance(0.5)) {
      return choice({ skill: MLE, level: 4, key: `mcq:${d.kind}:${d.n}:${d.s}`, exam: examTag(opts),
        prompt: t('X₁, …, Xₙ (n = {n}) iid {law} ; {sum} = {s}. Que vaut le maximum de vraisemblance {v}̂ ?', { n: d.n, law: ofLaw(d.M.law), sum: t(d.M.sumName), s: d.s, v }),
        right: S(d.h), wrongs: [{ html: S(q(1).div(d.h)), rule: 'p_mle_solve' }],
        fillers: [{ html: S(d.h.mul(2)) }, { html: S(d.h.div(2)) }, { html: S(d.h.add(1)) }] }, rng);
    }
    const ell = d.M.ell(d);
    return choice({ skill: MLE, level: 4, key: `mcqell:${d.kind}:${d.n}:${d.s}`, exam: examTag(opts),
      prompt: t('X₁, …, Xₙ (n = {n}) iid {law} ; {sum} = {s}. Quelle est la log-vraisemblance (à une constante près) ?', { n: d.n, law: ofLaw(d.M.law), sum: t(d.M.sumName), s: d.s }),
      right: `ℓ(${v}) = ${SM(ell, { vars: [v] })}`,
      wrongs: [{ html: `ℓ(${v}) = ${SM(d.kind === 'pois' ? `ln(${v})^${d.s}-${d.n}${v}` : `ln(${v})^${d.n}-${d.s}${v}`, { vars: [v] })}`, rule: 'g2_log_power' },
        { html: `ℓ(${v}) = ${SM(d.kind === 'pois' ? `${d.s}ln(${v})-${d.n}` : `${d.n}ln(${v})-${d.s}`, { vars: [v] })}`, rule: 'p_mle_constant_kept' }],
      fillers: [{ html: `ℓ(${v}) = ${SM(d.kind === 'pois' ? `${d.s}${v}-${d.n}ln(${v})` : `${d.n}${v}-${d.s}ln(${v})`, { vars: [v] })}` }] }, rng);
  }
  if (opts.exam === 'tf') {
    return tf({ skill: MLE, key: 'cubic', exam: examTag(opts), truth: false, ruleIfTrue: 'p_mle_no_check',
      statement: t('Pour ℓ(θ) = θ³ − 3θ, tout θ où ℓ′(θ) = 0 est un maximum de ℓ.'),
      explanation: t('ℓ′(1) = 0 mais ℓ″(1) = 6 > 0 : θ = 1 est un minimum local. Il faut vérifier le signe de ℓ″.'),
      counter: numCounter({ vars: [{ v: 't', label: 'θ =' }], hyp: '3t^2-3=0', pred: '6t<0', answer: { t: '1' } }) });
  }
  const kinds = level <= 2 ? ['exp', 'pois'] : level === 5 || opts.exam === 'open' ? ['rain', 'exp', 'bern', 'geom'] : ['exp', 'pois', 'bern', 'rain', 'geom'];
  const d = mleData(rng, kinds);
  const literal = level === 4 && !opts.exam && !!d.M.lit && rng.chance(0.5);
  const v = d.M.sym;
  const parts = mleParts(d, opts.exam === 'open' ? 5 : opts.exam === 'coef' ? 2 : level, literal);
  const pv = { n: d.n, law: ofLaw(d.M.law), sum: t(d.M.sumName), s: d.s, v };
  const short = t('X₁, …, Xₙ (n = {n}) sont iid {law}. On observe {sum} = {s}. Trouve le maximum de vraisemblance {v}̂.', pv);
  const prompt = literal
    ? (d.M.sumName === 'Σxᵢ' ? t('X₁, …, Xₙ sont iid {law}, et S = Σxᵢ. Trouve l\'estimateur du maximum de vraisemblance de {v} en fonction de n et S, vérifie que c\'est un maximum, et donne J({v}̂).', pv) : t('X₁, …, Xₙ sont iid {law}, et S = le nombre de succès. Trouve l\'estimateur du maximum de vraisemblance de {v} en fonction de n et S, vérifie que c\'est un maximum, et donne J({v}̂).', pv))
    : level >= 4 ? t('X₁, …, Xₙ (n = {n}) sont iid {law}. On observe {sum} = {s}. Trouve le maximum de vraisemblance {v}̂, puis son erreur standard asymptotique et l\'IC de Wald à 95 %.', pv)
      : level >= 3 ? t('X₁, …, Xₙ (n = {n}) sont iid {law}. On observe {sum} = {s}. Trouve le maximum de vraisemblance {v}̂, puis son erreur standard asymptotique.', pv) : short;
  const o = {
    skill: MLE, level, key: `${level}:${d.kind}:${d.n}:${d.s}:${literal}`, prompt, parts, subgoals: MLE_SUB, keys: GK, exam: examTag(opts),
    interpret: !literal && level >= 4 ? MLE_INTERPRET : null,
    hints: H(t('Le logarithme transforme le produit en somme ; dérive ensuite en {v} seulement, annule, puis vérifie le signe de ℓ″.', { v }),
      literal ? t('ℓ′({v}) = {d} = 0, donc {v} = □', { v, d: SM(d.M.lit.d1, { vars: [v, 'n', 'S'] }) }) : t('ℓ′({v}) = {d} = 0, donc {v}̂ = □', { v, d: SM(d.M.d1(d), { vars: [v] }) }),
      literal ? `${v}̂ = ${SM(d.M.lit.hat, { vars: ['n', 'S'] })}` : `${v}̂ = ${S(d.h)}`),
  };
  if (opts.exam === 'coef') return coefItem({ ...o, prompt: literal ? prompt : short, parts: parts.slice(0, 4) });
  if (opts.exam === 'open') return openItem({ ...o, interpret: MLE_INTERPRET, key: `open:${o.key}` }, 10, rng);
  return statItem(o);
}

// ======================================================================
// p-mle-special
// ======================================================================

const MS = 'p-mle-special';
const MS_SUB = [
  { id: 'lik', label: t('vraisemblance'), skill: MLE },
  { id: 'support', label: t('support, invariance'), skill: MS },
];

const intList = (rng, n, lo, hi) => Array.from({ length: n }, () => rng.int(lo, hi));
const SUPPORT_DECISION = (n, mx) => ({
  prompt: t('Peut-on annuler ℓ′ ?'),
  options: [
    { id: 'edge', label: t('Non : ℓ′(θ) = −{n}/θ ne s\'annule pas ; L vaut 0 si θ < {mx}, puis décroît : le maximum est au bord, en {mx}', { n, mx }), valid: true },
    { id: 'none', label: t('ℓ′ ne s\'annule jamais : il n\'y a pas de maximum de vraisemblance'), valid: false, rule: 'p_mle_support', why: t('Le maximum est au bord : L vaut 0 si θ < {mx} et décroît ensuite.', { mx }) },
    { id: 'mm', label: t('On prend l\'estimateur des moments 2x̄'), valid: false, rule: 'p_mle_support', why: t('Ce n\'est pas le maximum de vraisemblance : 2x̄ peut même être plus petit qu\'une donnée.') },
  ],
});

function msUnif(level, rng, sym = false) {
  for (;;) {
    const n = rng.int(5, 8);
    const xs = intList(rng, n, sym ? -15 : 1, 15);
    const abs = xs.map(Math.abs);
    const mx = Math.max(...abs);
    if (mx < 3 || (!sym && xs.some((x) => x <= 0))) continue;
    const sum = xs.reduce((s, x) => s + x, 0);
    const mm = q(2 * sum, n);
    if (!sym && mm.valueOf() === mx) continue;
    const c = rng.int(1, mx - 1);
    const freq = q(abs.filter((x) => x <= c).length, n);
    const inv = q(c, mx);
    const parts = [
      { label: 'θ̂', name: 'th', kind: 'prob', expect: String(mx), action: sym ? t('Le maximum des |xᵢ|') : t('Le maximum des données'),
        decisions: [SUPPORT_DECISION(n, mx)],
        traps: sym ? {} : { p_mle_support: { values: [J(mm)], ctx: { max: mx } } },
        notes: [t('L(θ) = {L} si θ ≥ {mx}, et 0 sinon.', { L: sym ? `(2θ)^(−${n})` : `θ^(−${n})`, mx })],
        wrongActions: [{ label: t('Prendre 2x̄'), rule: 'p_mle_support', why: t('L\'estimateur des moments n\'est pas le maximum de vraisemblance.') }],
        lines: [L(String(mx), sym ? 'θ̂ = max|xᵢ|' : 'θ̂ = max xᵢ', 'support', [String(mx)])] },
    ];
    if (level >= 2) {
      parts.push({ label: sym ? `Pr(|X| ≤ ${c})` : `Pr(X ≤ ${c})`, name: 'g', kind: 'prob', expect: `${c}/$th`, action: t('Invariance : g(θ̂)'),
        traps: freq.eq(inv) ? {} : { p_mle_invariance_ignored: { values: [J(freq)] } },
        wrongActions: [{ label: t('Compter la part des données ≤ c'), rule: 'p_mle_invariance_ignored', why: t('Le MLE de g(θ) est g(θ̂) : la fréquence empirique n\'utilise pas le modèle.') }],
        lines: thenValue(`${c}/${mx}`, inv, t('Pr({X} ≤ c) = c/θ, en θ̂', { X: sym ? '|X|' : 'X' }), 'support', [String(mx)]) });
    }
    return {
      key: `${sym ? 'sym' : 'unif'}:${xs.join(',')}:${c}`,
      prompt: level >= 2 ? t('Les données {xs} sont iid de loi {law}. Trouve le maximum de vraisemblance θ̂, puis celui de Pr({X} ≤ {c}).', { xs: xs.join(' ; ').replace(/-/g, '−'), law: sym ? 'U[−θ ; θ]' : 'U[0 ; θ]', X: sym ? '|X|' : 'X', c }) : t('Les données {xs} sont iid de loi {law}. Trouve le maximum de vraisemblance θ̂.', { xs: xs.join(' ; ').replace(/-/g, '−'), law: sym ? 'U[−θ ; θ]' : 'U[0 ; θ]' }),
      parts, mx, mm, freq, inv, c, xs,
      hints: H(t('Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu\'une donnée, puis décroît.'), t('L(θ) = θ^(−{n}) pour θ ≥ □', { n }), `θ̂ = ${mx}`),
    };
  }
}

function msShift(level, rng) {
  const n = rng.int(5, 7);
  const xs = intList(rng, n, 2, 14);
  const mn = Math.min(...xs);
  return {
    key: `shift:${xs.join(',')}`,
    prompt: t('Les données {xs} sont iid de densité f(x ; θ) = e^(−(x − θ)) pour x ≥ θ (0 sinon). Trouve le maximum de vraisemblance θ̂.', { xs: xs.join(' ; ') }),
    parts: [{ label: 'θ̂', name: 'th', kind: 'prob', expect: String(mn), action: t('Le minimum des données'),
      notes: [t('L(θ) = e^(nθ − Σxᵢ) si θ ≤ min xᵢ = {mn}, et 0 sinon : L croît jusqu\'au bord.', { mn })],
      decisions: [{ prompt: t('Où L est-elle maximale ?'), options: [
        { id: 'edge', label: t('Au bord : L croît tant que θ ≤ {mn}, puis vaut 0', { mn }), valid: true },
        { id: 'none', label: t('ℓ′ = n ne s\'annule jamais : pas de maximum'), valid: false, rule: 'p_mle_support', why: t('Le maximum est au bord du support.') },
      ] }],
      lines: [L(String(mn), 'θ̂ = min xᵢ', 'support', [String(mn)])] }],
    hints: H(t('Le support dépend de θ : regarde pour quels θ la vraisemblance n\'est pas nulle.'), t('L(θ) croît sur ]−∞ ; □]'), `θ̂ = ${mn}`),
  };
}

function msExp(level, rng) {
  const n = rng.pick([5, 8, 10]);
  for (;;) {
    const xs = intList(rng, n, 1, 9);
    const m = q(xs.reduce((s, x) => s + x, 0), n);
    if (m.toDecimal() === null) continue;
    const c = rng.int(1, 4);
    const val = 1 - Math.exp(-c / m.valueOf());
    const freq = q(xs.filter((x) => x <= c).length, n);
    return {
      key: `exp:${xs.join(',')}:${c}`,
      prompt: t('Les durées {xs} sont iid de loi exponentielle de moyenne θ. Le MLE de θ est x̄. Donne le maximum de vraisemblance de Pr(X ≤ {c}).', { xs: xs.join(' ; '), c }),
      parts: [
        { label: 'θ̂', name: 'th', kind: 'prob', expect: J(m), action: 'θ̂ = x̄',
          lines: thenValue(`${xs.reduce((s, x) => s + x, 0)}/${n}`, m, 'θ̂ = x̄', 'lik') },
        { label: `Pr(X ≤ ${c})`, name: 'g', kind: 'stat', decimals: 3, expect: `1-e^(-${c}/$th)`, action: t('Invariance : remplacer θ par θ̂'),
          traps: { p_mle_invariance_ignored: { values: [J(freq)] }, p_exp_rate_mean: { values: [FJ(1 - Math.exp(-c * m.valueOf()))] } },
          wrongActions: [{ label: t('La fréquence des données ≤ c'), rule: 'p_mle_invariance_ignored', why: t('Le MLE de g(θ) est g(θ̂).') }],
          lines: [L(`1-e^(-${c}/${T(m)})`, t('Pr(X ≤ c) = 1 − e^(−c/θ), en θ̂'), 'support'), L(F(val, 3), t('Calculer'), 'support')] },
      ],
      hints: H(t('Invariance : le MLE de g(θ) est g(θ̂).'), SM(`1-e^(-${c}/□)`), `≈ ${F(val, 3)}`),
    };
  }
}

function msItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') {
    return choice({ skill: MS, level: 4, key: 'mcqQ7', exam: examTag(opts),
      prompt: t('X₁, …, Xₙ iid de loi exponentielle de moyenne θ (le MLE de θ est X̄). Quel est le maximum de vraisemblance de Pr(X ≤ 2) ?'),
      right: '1 − e^(−2/X̄)', wrongs: [{ html: '(1/n)·Σ 1{Xᵢ ≤ 2}', rule: 'p_mle_invariance_ignored' }, { html: '1 − e^(−2X̄)', rule: 'p_exp_rate_mean' }, { html: t('Il n\'existe pas'), rule: 'p_mle_support' }],
      fillers: [] }, rng);
  }
  if (opts.exam === 'tf') {
    return tf({ skill: MS, key: '2xbar', exam: examTag(opts), truth: false, ruleIfTrue: 'p_mle_support',
      statement: t('Pour des données positives de U[0 ; θ], l\'estimateur 2x̄ est toujours au moins égal à max xᵢ (la vraisemblance y est donc non nulle).'),
      explanation: t('Avec 0 ; 1 ; 9 : 2x̄ = 20/3 ≈ 6,7 < 9, et L(6,7) = 0. Le maximum de vraisemblance est max xᵢ = 9.'),
      counter: numCounter({ vars: [{ v: 'a', label: 'x₁ =' }, { v: 'b', label: 'x₂ =' }, { v: 'c', label: 'x₃ =' }], hyp: 'a≥0∧b≥0∧c≥0', pred: '2×(a+b+c)/3≥max(a;max(b;c))', answer: { a: '0', b: '1', c: '9' } }) });
  }
  let d;
  if (level <= 3 || level === 5) d = msUnif(level, rng, level === 3 && rng.chance(0.3));
  else d = rng.pick([() => msUnif(level, rng, true), () => msShift(level, rng), () => msExp(level, rng), () => msUnif(level, rng)])();
  const o = { skill: MS, level, key: `${level}:${d.key}`, prompt: d.prompt, parts: d.parts, hints: d.hints, subgoals: MS_SUB, exam: examTag(opts) };
  // The coef variant asks the last value the prompt names (θ̂, or the MLE of a probability).
  if (opts.exam === 'coef') return coefItem({ ...o, part: d.parts[d.parts.length - 1] });
  return statItem(o);
}

// ======================================================================
// p-bias-mse
// ======================================================================

const BM = 'p-bias-mse';
const BM_SUB = [
  { id: 'mom', label: t('moments'), skill: 'p-moments' },
  { id: 'var', label: t('variance d\'une combinaison'), skill: 'p-lin-combo' },
  { id: 'bias', label: t('biais, EQM'), skill: BM },
];
const BM_DOM = { θ: [0.5, 5], n: [2, 50] };
const qt = (x) => T(x);
// a·θ^p/(b·n) as text for the core.
function mono(c, pow = 1, withN = false) {
  const r = q(c);
  const th = pow === 2 ? 'θ^2' : 'θ';
  const num = r.n === 1 ? th : r.n === -1 ? `-${th}` : `${r.n}${th}`;
  const den = withN ? (r.d === 1 ? 'n' : `(${r.d}n)`) : (r.d === 1 ? '' : String(r.d));
  return den ? `${num}/${den}` : num;
}

const BM_INTERPRET = (k) => ({
  prompt: t('Interpréter : quelle phrase est juste ?'),
  options: [
    { html: t('θ̂ est sans biais et son EQM tend vers 0 quand n grandit : il est consistant.'), correct: true },
    { html: t('Un estimateur sans biais est toujours meilleur qu\'un estimateur biaisé.'), correct: false, rule: 'p_unbiased_better' },
    { html: t('L\'EQM de Ȳ vaut var(Ȳ) + biais(Ȳ) (sans carré).'), correct: false, rule: 'p_mse_bias_not_squared' },
    { html: t('Ȳ est sans biais, puisque E[Y] = {a}θ/{b} ≈ θ.', { a: k + 1, b: k + 2 }), correct: false },
  ],
});

function bmDensity(level, rng) {
  const k = rng.int(1, 4);
  const EY = q(k + 1, k + 2);
  const EY2 = q(k + 1, k + 3);
  const vY = EY2.sub(EY.mul(EY));
  const c = q(k + 2, k + 1);
  const vT = c.mul(c).mul(vY);
  const parts = [
    { label: 'E[Y]', kind: 'prob', vars: ['θ'], domain: BM_DOM, expect: mono(EY), action: t('Espérance : ∫ y·f(y) dy'),
      lines: [L(mono(EY), `∫₀^θ ${k + 1}y^${k + 1}/θ^${k + 1} dy`, 'mom', [String(EY.n)])] },
    { label: t('biais(Ȳ)'), kind: 'prob', vars: ['θ'], domain: BM_DOM, expect: mono(EY.sub(1)), action: t('Biais : E[Ȳ] − θ'),
      lines: [L(mono(EY.sub(1)), 'E[Ȳ] = E[Y]', 'bias')] },
    { label: 'c', name: 'c', kind: 'prob', expect: J(c), action: t('Corriger : θ̂ = c·Ȳ avec E[θ̂] = θ'),
      lines: [L(T(c), `c·${S(EY)}θ = θ`, 'bias', [T(c)])] },
  ];
  if (level >= 2) {
    parts.push({ label: 'E[Y²]', kind: 'prob', vars: ['θ'], domain: BM_DOM, expect: mono(EY2, 2), action: t('Second moment'),
      lines: [L(mono(EY2, 2), `∫₀^θ ${k + 1}y^${k + 2}/θ^${k + 1} dy`, 'mom')] });
    parts.push({ label: 'var(Y)', kind: 'prob', vars: ['θ'], domain: BM_DOM, expect: mono(vY, 2), action: 'König-Huygens',
      lines: [L(`${mono(EY2, 2)}-(${mono(EY)})^2`, 'E[Y²] − E[Y]²', 'mom'), L(mono(vY, 2), t('Simplifier'), 'mom')].slice(-1) });
    parts.push({ label: 'var(θ̂)', kind: 'prob', vars: ['θ', 'n'], domain: BM_DOM, expect: mono(vT, 2, true), action: 'c²·var(Y)/n',
      traps: { p_var_scale: { values: [mono(c.mul(vY), 2, true)] }, p_se_forgot_sqrt_n: { values: [mono(vT, 2)] } },
      wrongActions: [{ label: 'c·var(Y)/n', rule: 'p_var_scale', why: t('Une constante sort de la variance au carré.') }, { label: t('c²·var(Y), sans diviser par n'), rule: 'p_se_forgot_sqrt_n', why: 'var(Ȳ) = var(Y)/n.' }],
      lines: [L(mono(vT, 2, true), `(${S(c)})² · var(Y)/n`, 'var', [`n`])] });
  }
  return {
    key: `dens:${k}`, k,
    prompt: level >= 2 ? t('Y₁, …, Yₙ sont iid de densité f(y) = {f} sur ]0 ; θ[. L\'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l\'estimateur corrigé θ̂ = c·Ȳ.', { f: densT(k) }) : t('Y₁, …, Yₙ sont iid de densité f(y) = {f} sur ]0 ; θ[. L\'estimateur Ȳ est-il sans biais pour θ ? Corrige-le.', { f: densT(k) }),
    parts,
    hints: H(t('var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ.'), `var(θ̂) = (${S(c)})² · ${S(vY)}θ²/□`, `var(θ̂) = ${mono(vT, 2, true).replace('-', '−')}`),
  };
}

// Level 4: the mean squared error of the biased Ȳ.
function bmMse(level, rng) {
  const d = bmDensity(2, rng);
  const k = d.k;
  const EY = q(k + 1, k + 2);
  const vY = q(k + 1, k + 3).sub(EY.mul(EY));
  const b = EY.sub(1);
  return {
    key: `mse:${k}`, k,
    prompt: t('Y₁, …, Yₙ sont iid de densité {f} sur ]0 ; θ[ : E[Y] = {e} et var(Y) = {v}. Calcule l\'erreur quadratique moyenne de Ȳ comme estimateur de θ.', { f: densT(k), e: supT(mono(EY)), v: supT(mono(vY, 2)) }),
    parts: [
      { label: t('biais(Ȳ)'), kind: 'prob', vars: ['θ'], domain: BM_DOM, expect: mono(b), action: t('Biais : E[Ȳ] − θ'),
        lines: [L(mono(b), 'E[Ȳ] − θ', 'bias')] },
      { label: 'var(Ȳ)', kind: 'prob', vars: ['θ', 'n'], domain: BM_DOM, expect: mono(vY, 2, true), action: 'var(Y)/n',
        traps: { p_se_forgot_sqrt_n: { values: [mono(vY, 2)] } },
        lines: [L(mono(vY, 2, true), 'var(Ȳ) = var(Y)/n', 'var')] },
      { label: t('EQM(Ȳ)'), kind: 'prob', vars: ['θ', 'n'], domain: BM_DOM, expect: `${mono(vY, 2, true)}+${mono(b.mul(b), 2)}`, action: t('EQM = var + biais²'),
        traps: { p_mse_bias_not_squared: { values: [`${mono(vY, 2, true)}${mono(b)}`] } },
        wrongActions: [{ label: t('EQM = var + biais'), rule: 'p_mse_bias_not_squared', why: t('Le biais entre au carré.') }],
        lines: [L(`${mono(vY, 2, true)}+${mono(b.mul(b), 2)}`, t('EQM = var + biais²'), 'bias')] },
    ],
    hints: H(t('EQM = var + biais².'), t('EQM = {v} + (□)²', { v: mono(vY, 2, true) }), t('EQM = {v} + {b}', { v: mono(vY, 2, true), b: mono(b.mul(b), 2) })),
  };
}

// Level 5: U[0, θ], max xᵢ against 2x̄.
function bmUnif(level, rng) {
  return {
    key: 'unif',
    prompt: t('X₁, …, Xₙ sont iid de loi U[0 ; θ]. Compare les erreurs quadratiques moyennes de 2X̄ (sans biais) et de M = max Xᵢ, sachant que E[M] = nθ/(n + 1) et var(M) = nθ²/((n + 1)²(n + 2)).'),
    parts: [
      { label: t('EQM(2X̄)'), kind: 'prob', vars: ['θ', 'n'], domain: BM_DOM, expect: 'θ^2/(3n)', action: t('Sans biais : EQM = var = 4·var(X)/n'),
        traps: { p_var_scale: { values: ['θ^2/(6n)'] } },
        lines: [L('θ^2/(3n)', '4 · (θ²/12)/n', 'var')] },
      { label: t('biais(M)'), kind: 'prob', vars: ['θ', 'n'], domain: BM_DOM, expect: '-θ/(n+1)', action: t('Biais : E[M] − θ'),
        lines: [L('-θ/(n+1)', 'nθ/(n + 1) − θ', 'bias')] },
      { label: t('EQM(M)'), kind: 'prob', vars: ['θ', 'n'], domain: BM_DOM, expect: '2θ^2/((n+1)(n+2))', action: t('EQM = var + biais²'),
        traps: { p_mse_bias_not_squared: { values: ['n×θ^2/((n+1)^2×(n+2))-θ/(n+1)'] } },
        lines: [L('2θ^2/((n+1)(n+2))', t('var(M) + biais(M)², simplifié'), 'bias')] },
    ],
    hints: [],
  };
}

function bmItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') {
    const k = rng.int(1, 4);
    const EY = q(k + 1, k + 2);
    const vY = q(k + 1, k + 3).sub(EY.mul(EY));
    const c = q(k + 2, k + 1);
    const mk = (x, n) => SM(mono(x, 2, n), { vars: ['θ', 'n'] });
    return choice({ skill: BM, level: 4, key: `mcq:${k}`, exam: examTag(opts),
      prompt: t('Y₁, …, Yₙ iid de densité {f} sur ]0 ; θ[. On pose θ̂ = ({c})·Ȳ, sans biais. Que vaut var(θ̂) ?', { f: densT(k), c: S(c) }),
      right: mk(c.mul(c).mul(vY), true), wrongs: [{ html: mk(c.mul(vY), true), rule: 'p_var_scale' }, { html: mk(c.mul(c).mul(vY), false), rule: 'p_se_forgot_sqrt_n' }],
      fillers: [{ html: mk(vY, true) }, { html: mk(vY.mul(2), true) }] }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) {
      return tf({ skill: BM, key: 'better', exam: examTag(opts), truth: false, ruleIfTrue: 'p_unbiased_better',
        statement: t('Pour U[0 ; θ], l\'estimateur sans biais 2X̄ a toujours une EQM plus petite que M = max Xᵢ (biaisé), d\'EQM 2θ²/((n + 1)(n + 2)).'),
        explanation: t('EQM(2X̄) = θ²/(3n). Pour n = 3 : θ²/9 ≈ 0,111θ² contre 2θ²/20 = 0,1θ² : l\'estimateur biaisé est meilleur.'),
        counter: numCounter({ vars: [{ v: 'n', label: 'n =', dom: 'N*' }], hyp: 'n≥1', pred: '1/(3n)≤2/((n+1)(n+2))', answer: { n: '3' } }) });
    }
    return tf({ skill: BM, key: 'ybar', exam: examTag(opts), truth: false, ruleIfTrue: 'p_unbiased_better',
      statement: t('Si Y a pour densité 3y²/θ³ sur ]0 ; θ[, Ȳ est un estimateur sans biais de θ.'),
      explanation: t('E[Ȳ] = E[Y] = 3θ/4 ≠ θ : Ȳ est biaisé (biais −θ/4). Avec θ = 1, E[Ȳ] = 3/4.'),
      counter: numCounter({ vars: [{ v: 't', label: 'θ =' }], hyp: 't>0', pred: '3t/4=t', answer: { t: '1' } }) });
  }
  const d = level === 5 ? rng.pick([bmUnif, bmUnif, bmMse, bmDensity])(level, rng) : level === 4 && rng.chance(0.4) ? bmMse(level, rng) : bmDensity(level, rng);
  return statItem({ skill: BM, level, key: `${level}:${d.key}`, prompt: d.prompt, parts: d.parts, hints: level === 5 ? [] : d.hints, subgoals: BM_SUB, keys: GK,
    interpret: d.k && level >= 2 && level <= 4 ? BM_INTERPRET(d.k) : null, exam: examTag(opts) });
}

// ======================================================================
// p-fisher-cr
// ======================================================================

const FC = 'p-fisher-cr';
const FC_SUB = [
  { id: 'deriv', label: t('dérivées'), skill: MLE },
  { id: 'info', label: t('information, borne'), skill: FC },
];
const FC_MODELS = [
  { id: 'pois', score: 'x/λ-1', lnfText: 'x·ln λ − λ − ln(x!)', sym: 'λ', law: 'Poiss(λ)', lnf: 'x×ln(λ)-λ', d2: '-x/λ^2', I: '1/λ', CR: 'λ/n', dom: [0.5, 5], est: 'X̄', eff: true, how: 'E[X] = λ' },
  { id: 'bern', score: 'x/p-(1-x)/(1-p)', lnfText: 'x·ln p + (1 − x)·ln(1 − p)', sym: 'p', law: 'Bernoulli de paramètre p', lnf: 'x×ln(p)+(1-x)×ln(1-p)', d2: '-x/p^2-(1-x)/(1-p)^2', I: '1/(p(1-p))', CR: 'p(1-p)/n', dom: [0.1, 0.9], est: 'X̄', eff: true, how: 'E[X] = p' },
  { id: 'exp', score: '1/λ-x', lnfText: 'ln λ − λx', sym: 'λ', law: 'exp(λ)', lnf: 'ln(λ)-λx', d2: '-1/λ^2', I: '1/λ^2', CR: 'λ^2/n', dom: [0.5, 5], est: null, eff: false, how: 'la dérivée seconde ne dépend pas de x' },
  { id: 'norm', score: '(x-μ)/4', lnfText: '−(x − μ)²/8', sym: 'μ', law: 'N(μ, 4) (variance connue)', lnf: '-(x-μ)^2/8', d2: '-1/4', I: '1/4', CR: '4/n', dom: [-3, 3], est: 'X̄', eff: true, how: 'la dérivée seconde est constante' },
  { id: 'var', score: '-1/(2v)+x^2/(2v^2)', lnfText: '−ln(v)/2 − x²/(2v)', sym: 'v', law: 'N(0, v) (v = σ² inconnue)', lnf: '-ln(v)/2-x^2/(2v)', d2: '1/(2v^2)-x^2/v^3', I: '1/(2v^2)', CR: '2v^2/n', dom: [0.5, 4], est: null, eff: false, how: 'E[X²] = v' },
];
const neg = (s) => (s.startsWith('-') ? s.slice(1) : `-(${s})`);

function fcParts(M, level) {
  const v = M.sym;
  const X = { [v]: M.dom, x: [0, 6] };
  const parts = [
    { label: `∂ln f/∂${v}`, kind: 'prob', vars: [v, 'x'], domain: X, expect: M.score, action: t('Dériver ln f en {v} : le score', { v }),
      notes: [t('ln f(x ; {v}) = {f} (à une constante près).', { v, f: M.lnfText })],
      lines: [L(M.score, t('Le score d\'une observation'), 'deriv', [M.score])] },
    { label: `∂²ln f/∂${v}²`, kind: 'prob', vars: [v, 'x'], domain: X, expect: M.d2, action: t('Dériver deux fois en {v}', { v }),
      lines: [L(M.d2, t('Dériver deux fois'), 'deriv')] },
    { label: `I₁(${v})`, kind: 'prob', vars: [v], domain: { [v]: M.dom }, expect: M.I, action: t('Espérance de l\'opposé'),
      traps: { p_fisher_sign: { values: [neg(M.I)] } },
      wrongActions: [{ label: t('Garder le signe de la dérivée seconde'), rule: 'p_fisher_sign', why: t('I₁ = −E[∂² ln f] est positive.') }],
      lines: [L(M.I, t('I₁ = −E[∂² ln f], avec {how}', { how: t(M.how) }), 'info')] },
  ];
  if (level >= 2) {
    parts.push({ label: t('borne de Cramér-Rao'), kind: 'prob', vars: [v, 'n'], domain: { [v]: M.dom, n: [2, 50] }, expect: M.CR, action: t('Inverser n·I₁'),
      decisions: [{ prompt: t('À quels estimateurs la borne s\'applique-t-elle ?'), options: [
        { id: 'u', label: t('Aux estimateurs sans biais de {v}', { v }), valid: true },
        { id: 'all', label: t('À tous les estimateurs, même biaisés'), valid: false, rule: 'p_cr_biased', why: t('L\'estimateur constant a une variance nulle : la borne ne vaut que sans biais.') },
      ] }],
      traps: { p_fisher_per_obs: { values: [M.CR.replace('/n', '')] } },
      wrongActions: [{ label: t('Prendre 1/I₁ (une seule observation)'), rule: 'p_fisher_per_obs', why: t('Pour n observations, l\'information est n·I₁.') }],
      lines: [L(M.CR, '1/(n·I₁)', 'info', ['n'])] });
  }
  return parts;
}

const FC_INTERPRET = (M) => ({
  prompt: t('Interpréter : que dit cette borne ?'),
  options: [
    { html: M.eff ? t('var(X̄) = {cr} : X̄ atteint la borne, il est efficace.', { cr: M.CR.replace('(1-p)', '(1 − p)') }) : t('Tout estimateur sans biais de {v} a une variance au moins égale à cette borne.', { v: M.sym }), correct: true },
    { html: t('Aucun estimateur, même biaisé, n\'a une variance plus petite.'), correct: false, rule: 'p_cr_biased' },
    { html: t('La borne pour n observations est 1/I₁, la même que pour une seule.'), correct: false, rule: 'p_fisher_per_obs' },
    { html: t('L\'information de Fisher peut être négative.'), correct: false, rule: 'p_fisher_sign' },
  ],
});

function fcItem(level, rng, profile, opts = {}) {
  const M = level === 1 ? rng.pick(FC_MODELS.slice(0, 2)) : rng.pick(FC_MODELS);
  if (opts.exam === 'mcq') {
    const sm = (s) => SM(s, { vars: [M.sym, 'n'] });
    return choice({ skill: FC, level: 4, key: `mcq:${M.id}`, exam: examTag(opts),
      prompt: t('X₁, …, Xₙ iid {law} ; I₁({v}) = {I}. Quelle est la borne de Cramér-Rao pour un estimateur sans biais de {v} ?', { law: ofLaw(M.law), v: M.sym, I: sm(M.I) }),
      right: sm(M.CR), wrongs: [{ html: sm(M.CR.replace('/n', '')), rule: 'p_fisher_per_obs' }, { html: sm(`-${M.CR}`), rule: 'p_fisher_sign' }],
      fillers: [{ html: sm(`${M.I}/n`) }, { html: sm(`n×${M.I}`) }] }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) {
      return tf({ skill: FC, key: 'const', exam: examTag(opts), truth: false, ruleIfTrue: 'p_cr_biased',
        statement: t('Pour X₁, …, Xₙ iid {law}, tout estimateur de {v}, biaisé ou non, a une variance au moins égale à {cr}.', { law: ofLaw(M.law), v: M.sym, cr: M.CR.replace('(1-p)', '(1 − p)') }),
        explanation: t('L\'estimateur constant (toujours 1) a une variance nulle : la borne de Cramér-Rao ne vaut que pour les estimateurs sans biais.'),
        counter: numCounter({ vars: [{ v: 'w', label: t('Variance de l\'estimateur constant θ̂ = 1 :') }], hyp: 'w=0', pred: 'w>0', answer: { w: '0' } }) });
    }
    return tf({ skill: FC, key: 'nI', exam: examTag(opts), truth: false, ruleIfTrue: 'p_fisher_per_obs',
      statement: t('L\'information de Fisher de n observations iid vaut I₁(θ), comme pour une seule.'),
      explanation: t('Les informations s\'additionnent : I(θ) = n·I₁(θ). Avec n = 2, I = 2I₁.'),
      counter: numCounter({ vars: [{ v: 'n', label: 'n =', dom: 'N*' }], hyp: 'n≥2', pred: 'n×1=1', answer: { n: '2' } }) });
  }
  const parts = fcParts(M, level);
  return statItem({ skill: FC, level, key: `${level}:${M.id}`, parts, subgoals: FC_SUB, keys: GK, exam: examTag(opts),
    prompt: level >= 2 ? t('X₁, …, Xₙ sont iid {law}. Calcule l\'information de Fisher I₁({v}) d\'une observation, puis la borne de Cramér-Rao.', { law: ofLaw(M.law), v: M.sym }) : t('X₁, …, Xₙ sont iid {law}. Calcule l\'information de Fisher I₁({v}) d\'une observation.', { law: ofLaw(M.law), v: M.sym }),
    interpret: level >= 3 ? FC_INTERPRET(M) : null,
    hints: H(t('Dérive deux fois ln f en {v}, puis prends l\'espérance de l\'opposé.', { v: M.sym }), `I₁(${M.sym}) = −E[${M.d2.replace(/×/g, '·')}] = □`, `I₁(${M.sym}) = ${M.I}`) });
}

export const GEN = {
  [MOM]: momItem,
  [MLE]: mleItem,
  [MS]: msItem,
  [BM]: bmItem,
  [FC]: fcItem,
};

void Phi; void FS; void qt;

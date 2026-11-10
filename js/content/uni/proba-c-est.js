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

const GK = ['calc', 'stat', 'greek', 'calcfn'];

// ======================================================================
// p-mom
// ======================================================================

const MOM = 'p-mom';
const MOM_SUB = [
  { id: 'th', label: 'moments théoriques', skill: 'p-moments' },
  { id: 'solve', label: 'résoudre', skill: MOM },
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
    { label: 'x̄', name: 'm', kind: 'prob', expect: `${d.s}/${d.n}`, action: 'Moment empirique : x̄ = Σxᵢ/n',
      lines: [L(`${d.s}/${d.n}`, 'x̄ = Σxᵢ/n', 'solve', [String(d.n)]), ...(m.d !== d.n ? [L(T(m), 'Calculer', 'solve', [T(m)])] : [])] },
  ];
  if (level >= 2) {
    parts.push({ label: 'E[X]', kind: 'prob', vars: [model.sym], domain: { [model.sym]: model.dom }, expect: model.E, action: 'Moment théorique en fonction du paramètre',
      lines: [L(model.E, `Espérance de ${model.law}`, 'th', [model.E])] });
  }
  parts.push({ label: `${model.sym}̂`, name: 'th', kind: 'prob', expect: model.hatT, action: `Égaler E[X] = x̄ et isoler ${model.sym}`,
    traps: model.id === 'exp' ? { p_exp_rate_mean: { values: [J(m)], ctx: { m: S(m), x: '' } } } : {},
    notes: level === 1 ? [`${exS} : on résout ${model.E.replace('-', '−')} = x̄.`] : [],
    lines: thenValue(model.hatLine(m), hat, `${model.E.replace('-', '−')} = x̄, puis isoler ${model.sym}`, 'solve', [T(m)]) });
  return {
    key: `${model.id}:${d.n}:${d.s}`, hat,
    prompt: `X₁, …, Xₙ (n = ${d.n}) sont iid de loi ${model.law}. On observe Σxᵢ = ${d.s}. Estime ${model.sym} par la méthode des moments.`,
    parts,
    hints: H('Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre.', `${model.E.replace('-', '−')} = ${S(m)}, donc ${model.sym} = □`, `${model.sym}̂ = ${S(hat)}`),
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
    { label: 'x̄', name: 'm', kind: 'prob', expect: `${d.sum}/${d.n}`, action: 'Premier moment empirique',
      lines: [L(`${d.sum}/${d.n}`, 'Somme des données / n', 'solve', [String(d.sum)]), L(String(d.m), 'x̄', 'solve', [String(d.m)])] },
    { label: 'σ̂²', name: 's', kind: 'prob', expect: `${d.ss}/${d.n}`, action: 'Second moment centré, diviseur n',
      traps: { p_mom_s2: { values: [J(q(d.ss, d.n - 1))], ctx: { n: d.n } } },
      decisions: [{ prompt: 'Quelle seconde équation ?', levels: [1, 2, 3, 4, 5], options: [
        { id: 'v', label: 'var(X) = σ̂² = (1/n)Σ(xᵢ − x̄)²', valid: true },
        { id: 'sq', label: 'E[X²] = x̄²', valid: false, rule: 'p_mom_wrong_moment', why: 'Le moment empirique d\'ordre 2 est la moyenne des carrés, pas le carré de la moyenne.' },
        { id: 's2', label: 'var(X) = s² = Σ(xᵢ − x̄)²/(n − 1)', valid: false, rule: 'p_mom_s2', why: `La méthode des moments égale au moment empirique : on divise par n = ${d.n}.` },
      ] }],
      wrongActions: [{ label: 'Diviser par n − 1', rule: 'p_mom_s2', why: 'Les moments empiriques divisent par n.' }],
      lines: [L(`${d.ss}/${d.n}`, `Σ(xᵢ − x̄)² = ${d.ss}`, 'solve', [String(d.ss)]), L(String(d.v), 'σ̂²', 'solve', [String(d.v)])] },
    { label: 'θ̂', name: 't', kind: 'prob', expect: '$s/$m', action: 'Diviser les deux équations : kθ² / kθ = θ',
      traps: { p_mom_s2: { values: [J(wrongTh)], ctx: { n: d.n } } },
      notes: ['E[X] = kθ et var(X) = kθ² pour Γ(k, θ).'],
      lines: [L(`${d.v}/${d.m}`, 'kθ = x̄ et kθ² = σ̂², donc θ = σ̂²/x̄', 'th', [String(d.v)]), ...(d.th.d !== d.m ? [L(T(d.th), 'θ̂', 'solve', [T(d.th)])] : [])] },
    { label: 'k̂', name: 'k', kind: 'prob', expect: '$m/$t', action: 'Isoler k : k = x̄/θ',
      lines: thenValue(`${d.m}/${d.th.d === 1 ? T(d.th) : `(${T(d.th)})`}`, d.k, 'k = x̄/θ̂', 'solve', [String(d.m)]) },
  ];
  return {
    key: `gamma:${d.xs.join(',')}`, hat: d.th, wrongTh,
    prompt: `Les données ${d.xs.join(' ; ')} viennent d'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²). Estime θ et k par la méthode des moments.`,
    parts,
    hints: H('Deux paramètres : deux équations, E[X] = x̄ et var(X) = σ̂² (diviseur n).', SM(`${d.v}/□`), `θ̂ = ${S(d.th)} ; k̂ = ${S(d.k)}`),
  };
}

function momItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') {
    const g = momGamma(4, rng);
    const d = g.parts;
    return choice({ skill: MOM, level: 4, key: `mcq:${g.key}`, exam: examTag(opts),
      prompt: `${g.prompt.replace('Estime θ et k', 'Que vaut θ̂')}`,
      right: S(g.hat), wrongs: [{ html: S(g.wrongTh), rule: 'p_mom_s2' }],
      fillers: [{ html: S(q(1).div(g.hat)) }, { html: S(g.hat.mul(2)) }, { html: S(g.hat.add(1)) }] }, rng);
    void d;
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) return tf({ skill: MOM, key: 'xbar', exam: examTag(opts), truth: true, statement: 'Pour estimer θ = E[X], la moyenne X̄ est l\'estimateur des moments, quel que soit le modèle.', explanation: 'La méthode des moments égale E[X] à x̄ : si θ = E[X], θ̂ = X̄.' });
    return tf({ skill: MOM, key: 'exp', exam: examTag(opts), truth: false, ruleIfTrue: 'p_exp_rate_mean',
      statement: 'Pour un échantillon de loi exp(λ) (espérance 1/λ), l\'estimateur des moments de λ est x̄.',
      explanation: 'E[X] = 1/λ = x̄ donne λ̂ = 1/x̄ : avec x̄ = 2, λ̂ = 1/2, pas 2.',
      counter: numCounter({ vars: [{ v: 'm', label: 'Une moyenne x̄ =' }], hyp: 'm>0', pred: '1/m=m', answer: { m: '2' } }) });
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
  { id: 'log', label: 'logarithme', skill: 'g2-log-rules' },
  { id: 'deriv', label: 'dériver', skill: 'g6-deriv-rules' },
  { id: 'solve', label: 'isoler', skill: 'iso-formula' },
  { id: 'mle', label: 'vraisemblance, θ̂, vérification', skill: MLE },
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
    Lnote: ({ s }) => `L(λ) = Π λ^(xᵢ)e^(−λ)/xᵢ! ∝ λ^${s}·e^(−nλ)`,
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
  prompt: `ℓ″(${sym}) < 0 : que peut-on conclure ?`,
  options: [
    { id: 'max', label: `ℓ est concave : ${sym}̂ est le maximum global`, valid: true },
    { id: 'zero', label: `Rien à vérifier : ℓ′(${sym}̂) = 0 suffit`, valid: false, rule: 'p_mle_no_check', why: 'Un point où ℓ′ s\'annule peut être un minimum : ℓ″ < 0 garantit le maximum.' },
    { id: 'min', label: `${sym}̂ est un minimum`, valid: false, why: 'ℓ″ < 0 : la courbe est tournée vers le bas, c\'est un maximum.' },
  ],
});

const MLE_INTERPRET = {
  prompt: 'Interpréter : sur quoi repose cet IC de Wald ?',
  options: [
    { html: 'Il est approché : valable si n est grand et si le modèle est régulier (le support ne dépend pas du paramètre).', correct: true },
    { html: 'Il est exact pour tout n.', correct: false },
    { html: 'Le paramètre est dans cet intervalle avec la probabilité 0,95.', correct: false, rule: 'p_ci_prob' },
    { html: '95 % des données sont dans cet intervalle.', correct: false, rule: 'p_ci_data' },
  ],
};

function mleParts(d, level, literal) {
  const { M } = d;
  const v = M.sym;
  const vars = literal ? [v, 'n', 'S'] : [v];
  const dom = literal ? { [v]: M.dom, n: [5, 60], S: [5, 120] } : { [v]: M.dom };
  const E = (key) => (literal ? M.lit[key] : M[key](d));
  const first = (t) => (/\d+/.exec(t) || [''])[0];
  const parts = literal ? [] : [
    { label: 'x̄', name: 'xb', kind: 'prob', expect: `${d.s}/${d.n}`, action: 'La moyenne des données',
      lines: [L(`${d.s}/${d.n}`, `x̄ = ${d.M.sumName.replace('le nombre de succès S', 'S')}/n`, 'mle', [String(d.n)]), ...(q(d.s, d.n).d !== d.n ? [L(T(q(d.s, d.n)), 'Calculer', 'mle')] : [])] },
  ];
  parts.push(
    { label: `ℓ(${v})`, kind: 'prob', vars, domain: dom, upToConstant: !literal, expect: E('ell'), action: 'Logarithme : le produit devient une somme',
      notes: [literal ? `${M.Lnote({ n: 'n', s: 'S' })} (on laisse tomber les termes sans ${v})` : `${M.Lnote(d)} (ℓ est comparée à une constante près : les termes sans ${v} peuvent rester ou partir)`],
      lines: [L(E('ell'), 'ℓ = ln L (à une constante près)', 'log', literal ? [] : [first(E('ell'))])] },
    { label: `ℓ′(${v})`, kind: 'prob', vars, domain: dom, expect: E('d1'), action: `Dériver en ${v} seulement`,
      wrongActions: [{ label: 'Dériver aussi les termes qui ne contiennent que les données (Σxᵢ, Σ ln xᵢ!)', rule: 'p_mle_constant_kept', why: 'Une donnée est une constante : sa dérivée est 0.' }],
      lines: [L(E('d1'), `Dériver en ${v}`, 'deriv', literal ? [] : [String(d.s)])] });
  if (literal) {
    parts.push({ label: `${v}̂`, kind: 'prob', vars: ['n', 'S'], domain: { n: [5, 60], S: [5, 120] }, expect: M.lit.hat, action: 'Annuler ℓ′ et isoler',
      lines: [L(M.lit.hat, `ℓ′(${v}̂) = 0`, 'solve')] });
    parts.push({ label: `ℓ″(${v})`, kind: 'prob', vars, domain: dom, expect: M.lit.d2, action: 'Dériver deux fois',
      lines: [L(M.lit.d2, 'Dériver encore', 'deriv')] });
    parts.push({ label: `J(${v}̂)`, kind: 'prob', vars: ['n', 'S'], domain: { n: [5, 60], S: [5, 120] }, expect: M.lit.J, action: 'J = −ℓ″ en l\'estimateur',
      decisions: [MAX_DECISION(v)],
      lines: [L(M.lit.J, `−ℓ″(${v}̂)`, 'wald')] });
    return parts;
  }
  const h = d.h;
  parts.push({ label: `${v}̂`, name: 'th', kind: 'prob', expect: d.M.hatLine(d), action: 'Annuler ℓ′ et isoler',
    traps: { p_mle_solve: { values: [J(q(1).div(h))].filter((x) => x !== J(h)), ctx: {} } },
    wrongActions: [{ label: 'Prendre l\'inverse de la solution', rule: 'p_mle_solve', why: 'Isole soigneusement : on multiplie, on ne renverse pas.' }],
    lines: thenValue(d.M.hatLine(d), h, `ℓ′(${v}̂) = 0`, 'solve', [String(d.s)]) });
  parts.push({ label: `ℓ″(${v})`, kind: 'prob', vars, domain: dom, expect: M.d2(d), action: 'Dériver deux fois',
    lines: [L(M.d2(d), 'Dériver encore', 'deriv', [`${v}^2`])] });
  parts.push({ label: `J(${v}̂)`, name: 'J', kind: 'prob', expect: M.Jexp(d), action: 'J = −ℓ″ en l\'estimateur',
    decisions: [MAX_DECISION(v)],
    traps: { p_wald_sign: { values: [J(d.Jv.neg())], ctx: { J: S(d.Jv) } } },
    wrongActions: [{ label: `Prendre ℓ″(${v}̂) tel quel`, rule: 'p_wald_sign', why: 'J = −ℓ″(θ̂) est positive.' }],
    lines: [L(M.Jline(d), `−ℓ″(${v}̂)`, 'wald'), L(T(d.Jv), 'Information observée', 'wald', [T(d.Jv)])] });
  if (level >= 3) {
    parts.push({ label: `se(${v}̂)`, name: 'se', kind: 'prob', expect: '1/√$J', action: 'Erreur standard : 1/√J',
      traps: { p_wald_var_inverse: { values: [J(d.Jv.sqrt() ?? d.Jv), J(d.Jv), J(q(1).div(d.Jv))].filter((x) => x !== J(d.se)), ctx: { J: S(d.Jv), se: S(d.se) } } },
      wrongActions: [{ label: 'se = √J', rule: 'p_wald_var_inverse', why: 'La variance asymptotique est l\'inverse de J.' }],
      lines: [L(`1/√${T(d.Jv)}`, 'Var ≈ 1/J', 'wald', [T(d.Jv)]), L(T(d.se), 'Erreur standard', 'wald', [T(d.se)])] });
  }
  if (level >= 4) {
    const lo = h.valueOf() - 1.96 * d.se.valueOf();
    const hi = h.valueOf() + 1.96 * d.se.valueOf();
    parts.push({ label: 'IC₉₅', name: 'ic', kind: 'stat', decimals: 3, expect: ['$th-1.96×$se', '$th+1.96×$se'], action: 'IC de Wald : θ̂ ± 1,96·se',
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
        prompt: `X₁, …, Xₙ (n = ${d.n}) iid de loi ${d.M.law} ; ${d.M.sumName} = ${d.s}. Que vaut le maximum de vraisemblance ${v}̂ ?`,
        right: S(d.h), wrongs: [{ html: S(q(1).div(d.h)), rule: 'p_mle_solve' }],
        fillers: [{ html: S(d.h.mul(2)) }, { html: S(d.h.div(2)) }, { html: S(d.h.add(1)) }] }, rng);
    }
    const ell = d.M.ell(d);
    return choice({ skill: MLE, level: 4, key: `mcqell:${d.kind}:${d.n}:${d.s}`, exam: examTag(opts),
      prompt: `X₁, …, Xₙ (n = ${d.n}) iid de loi ${d.M.law} ; ${d.M.sumName} = ${d.s}. Quelle est la log-vraisemblance (à une constante près) ?`,
      right: `ℓ(${v}) = ${SM(ell, { vars: [v] })}`,
      wrongs: [{ html: `ℓ(${v}) = ${SM(d.kind === 'pois' ? `ln(${v})^${d.s}-${d.n}${v}` : `ln(${v})^${d.n}-${d.s}${v}`, { vars: [v] })}`, rule: 'g2_log_power' },
        { html: `ℓ(${v}) = ${SM(d.kind === 'pois' ? `${d.s}ln(${v})-${d.n}` : `${d.n}ln(${v})-${d.s}`, { vars: [v] })}`, rule: 'p_mle_constant_kept' }],
      fillers: [{ html: `ℓ(${v}) = ${SM(d.kind === 'pois' ? `${d.s}${v}-${d.n}ln(${v})` : `${d.n}${v}-${d.s}ln(${v})`, { vars: [v] })}` }] }, rng);
  }
  if (opts.exam === 'tf') {
    return tf({ skill: MLE, key: 'cubic', exam: examTag(opts), truth: false, ruleIfTrue: 'p_mle_no_check',
      statement: 'Pour ℓ(θ) = θ³ − 3θ, tout θ où ℓ′(θ) = 0 est un maximum de ℓ.',
      explanation: 'ℓ′(1) = 0 mais ℓ″(1) = 6 > 0 : θ = 1 est un minimum local. Il faut vérifier le signe de ℓ″.',
      counter: numCounter({ vars: [{ v: 't', label: 'θ =' }], hyp: '3t^2-3=0', pred: '6t<0', answer: { t: '1' } }) });
  }
  const kinds = level <= 2 ? ['exp', 'pois'] : level === 5 || opts.exam === 'open' ? ['rain', 'exp', 'bern', 'geom'] : ['exp', 'pois', 'bern', 'rain', 'geom'];
  const d = mleData(rng, kinds);
  const literal = level === 4 && !opts.exam && !!d.M.lit && rng.chance(0.5);
  const v = d.M.sym;
  const parts = mleParts(d, opts.exam === 'open' ? 5 : opts.exam === 'coef' ? 2 : level, literal);
  const prompt = literal
    ? `X₁, …, Xₙ sont iid de loi ${d.M.law}, et S = ${d.M.sumName === 'Σxᵢ' ? 'Σxᵢ' : 'le nombre de succès'}. Trouve l'estimateur du maximum de vraisemblance de ${v} en fonction de n et S, vérifie que c'est un maximum, et donne J(${v}̂).`
    : `X₁, …, Xₙ (n = ${d.n}) sont iid de loi ${d.M.law}. On observe ${d.M.sumName} = ${d.s}. Trouve le maximum de vraisemblance ${v}̂${level >= 3 ? `, puis son erreur standard asymptotique${level >= 4 ? ' et l\'IC de Wald à 95 %' : ''}` : ''}.`;
  const o = {
    skill: MLE, level, key: `${level}:${d.kind}:${d.n}:${d.s}:${literal}`, prompt, parts, subgoals: MLE_SUB, keys: GK, exam: examTag(opts),
    interpret: !literal && level >= 4 ? MLE_INTERPRET : null,
    hints: H('Le logarithme transforme le produit en somme ; dérive ensuite en ' + v + ' seulement, annule, puis vérifie le signe de ℓ″.',
      literal ? `ℓ′(${v}) = ${SM(d.M.lit.d1, { vars: [v, 'n', 'S'] })} = 0, donc ${v} = □` : `ℓ′(${v}) = ${SM(d.M.d1(d), { vars: [v] })} = 0, donc ${v}̂ = □`,
      literal ? `${v}̂ = ${SM(d.M.lit.hat, { vars: ['n', 'S'] })}` : `${v}̂ = ${S(d.h)}`),
  };
  if (opts.exam === 'coef') return coefItem({ ...o, parts: parts.slice(0, 4) });
  if (opts.exam === 'open') return openItem({ ...o, interpret: MLE_INTERPRET, key: `open:${o.key}` }, 10, rng);
  return statItem(o);
}

// ======================================================================
// p-mle-special
// ======================================================================

const MS = 'p-mle-special';
const MS_SUB = [
  { id: 'lik', label: 'vraisemblance', skill: MLE },
  { id: 'support', label: 'support, invariance', skill: MS },
];

const intList = (rng, n, lo, hi) => Array.from({ length: n }, () => rng.int(lo, hi));
const SUPPORT_DECISION = (n, mx) => ({
  prompt: 'Peut-on annuler ℓ′ ?',
  options: [
    { id: 'edge', label: `Non : ℓ′(θ) = −${n}/θ ne s'annule pas ; L vaut 0 si θ < ${mx}, puis décroît : le maximum est au bord, en ${mx}`, valid: true },
    { id: 'none', label: 'ℓ′ ne s\'annule jamais : il n\'y a pas de maximum de vraisemblance', valid: false, rule: 'p_mle_support', why: `Le maximum est au bord : L vaut 0 si θ < ${mx} et décroît ensuite.` },
    { id: 'mm', label: 'On prend l\'estimateur des moments 2x̄', valid: false, rule: 'p_mle_support', why: 'Ce n\'est pas le maximum de vraisemblance : 2x̄ peut même être plus petit qu\'une donnée.' },
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
      { label: 'θ̂', name: 'th', kind: 'prob', expect: String(mx), action: sym ? 'Le maximum des |xᵢ|' : 'Le maximum des données',
        decisions: [SUPPORT_DECISION(n, mx)],
        traps: sym ? {} : { p_mle_support: { values: [J(mm)], ctx: { max: mx } } },
        notes: [`L(θ) = ${sym ? `(2θ)^(−${n})` : `θ^(−${n})`} si θ ≥ ${mx}, et 0 sinon.`],
        wrongActions: [{ label: 'Prendre 2x̄', rule: 'p_mle_support', why: 'L\'estimateur des moments n\'est pas le maximum de vraisemblance.' }],
        lines: [L(String(mx), sym ? 'θ̂ = max|xᵢ|' : 'θ̂ = max xᵢ', 'support', [String(mx)])] },
    ];
    if (level >= 2) {
      parts.push({ label: sym ? `Pr(|X| ≤ ${c})` : `Pr(X ≤ ${c})`, name: 'g', kind: 'prob', expect: `${c}/$th`, action: 'Invariance : g(θ̂)',
        traps: freq.eq(inv) ? {} : { p_mle_invariance_ignored: { values: [J(freq)] } },
        wrongActions: [{ label: 'Compter la part des données ≤ c', rule: 'p_mle_invariance_ignored', why: 'Le MLE de g(θ) est g(θ̂) : la fréquence empirique n\'utilise pas le modèle.' }],
        lines: thenValue(`${c}/${mx}`, inv, `Pr(${sym ? '|X|' : 'X'} ≤ c) = c/θ, en θ̂`, 'support', [String(mx)]) });
    }
    return {
      key: `${sym ? 'sym' : 'unif'}:${xs.join(',')}:${c}`,
      prompt: `Les données ${xs.join(' ; ').replace(/-/g, '−')} sont iid de loi ${sym ? 'U[−θ ; θ]' : 'U[0 ; θ]'}. Trouve le maximum de vraisemblance θ̂${level >= 2 ? `, puis celui de Pr(${sym ? '|X|' : 'X'} ≤ ${c})` : ''}.`,
      parts, mx, mm, freq, inv, c, xs,
      hints: H('Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu\'une donnée, puis décroît.', `L(θ) = θ^(−${n}) pour θ ≥ □`, `θ̂ = ${mx}`),
    };
  }
}

function msShift(level, rng) {
  const n = rng.int(5, 7);
  const xs = intList(rng, n, 2, 14);
  const mn = Math.min(...xs);
  return {
    key: `shift:${xs.join(',')}`,
    prompt: `Les données ${xs.join(' ; ')} sont iid de densité f(x ; θ) = e^(−(x − θ)) pour x ≥ θ (0 sinon). Trouve le maximum de vraisemblance θ̂.`,
    parts: [{ label: 'θ̂', name: 'th', kind: 'prob', expect: String(mn), action: 'Le minimum des données',
      notes: [`L(θ) = e^(nθ − Σxᵢ) si θ ≤ min xᵢ = ${mn}, et 0 sinon : L croît jusqu'au bord.`],
      decisions: [{ prompt: 'Où L est-elle maximale ?', options: [
        { id: 'edge', label: `Au bord : L croît tant que θ ≤ ${mn}, puis vaut 0`, valid: true },
        { id: 'none', label: 'ℓ′ = n ne s\'annule jamais : pas de maximum', valid: false, rule: 'p_mle_support', why: 'Le maximum est au bord du support.' },
      ] }],
      lines: [L(String(mn), 'θ̂ = min xᵢ', 'support', [String(mn)])] }],
    hints: H('Le support dépend de θ : regarde pour quels θ la vraisemblance n\'est pas nulle.', 'L(θ) croît sur ]−∞ ; □]', `θ̂ = ${mn}`),
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
      prompt: `Les durées ${xs.join(' ; ')} sont iid de loi exponentielle de moyenne θ. Le MLE de θ est x̄. Donne le maximum de vraisemblance de Pr(X ≤ ${c}).`,
      parts: [
        { label: 'θ̂', name: 'th', kind: 'prob', expect: J(m), action: 'θ̂ = x̄',
          lines: thenValue(`${xs.reduce((s, x) => s + x, 0)}/${n}`, m, 'θ̂ = x̄', 'lik') },
        { label: `Pr(X ≤ ${c})`, name: 'g', kind: 'stat', decimals: 3, expect: `1-e^(-${c}/$th)`, action: 'Invariance : remplacer θ par θ̂',
          traps: { p_mle_invariance_ignored: { values: [J(freq)] }, p_exp_rate_mean: { values: [FJ(1 - Math.exp(-c * m.valueOf()))] } },
          wrongActions: [{ label: 'La fréquence des données ≤ c', rule: 'p_mle_invariance_ignored', why: 'Le MLE de g(θ) est g(θ̂).' }],
          lines: [L(`1-e^(-${c}/${T(m)})`, `Pr(X ≤ c) = 1 − e^(−c/θ), en θ̂`, 'support'), L(F(val, 3), 'Calculer', 'support')] },
      ],
      hints: H('Invariance : le MLE de g(θ) est g(θ̂).', SM(`1-e^(-${c}/□)`), `≈ ${F(val, 3)}`),
    };
  }
}

function msItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') {
    return choice({ skill: MS, level: 4, key: 'mcqQ7', exam: examTag(opts),
      prompt: 'X₁, …, Xₙ iid de loi exponentielle de moyenne θ (le MLE de θ est X̄). Quel est le maximum de vraisemblance de Pr(X ≤ 2) ?',
      right: '1 − e^(−2/X̄)', wrongs: [{ html: '(1/n)·Σ 1{Xᵢ ≤ 2}', rule: 'p_mle_invariance_ignored' }, { html: '1 − e^(−2X̄)', rule: 'p_exp_rate_mean' }, { html: 'Il n\'existe pas', rule: 'p_mle_support' }],
      fillers: [] }, rng);
  }
  if (opts.exam === 'tf') {
    return tf({ skill: MS, key: '2xbar', exam: examTag(opts), truth: false, ruleIfTrue: 'p_mle_support',
      statement: 'Pour des données positives de U[0 ; θ], l\'estimateur 2x̄ est toujours au moins égal à max xᵢ (la vraisemblance y est donc non nulle).',
      explanation: 'Avec 0 ; 1 ; 9 : 2x̄ = 20/3 ≈ 6,7 < 9, et L(6,7) = 0. Le maximum de vraisemblance est max xᵢ = 9.',
      counter: numCounter({ vars: [{ v: 'a', label: 'x₁ =' }, { v: 'b', label: 'x₂ =' }, { v: 'c', label: 'x₃ =' }], hyp: 'a≥0∧b≥0∧c≥0', pred: '2×(a+b+c)/3≥max(a;max(b;c))', answer: { a: '0', b: '1', c: '9' } }) });
  }
  let d;
  if (level <= 3 || level === 5) d = msUnif(level, rng, level === 3 && rng.chance(0.3));
  else d = rng.pick([() => msUnif(level, rng, true), () => msShift(level, rng), () => msExp(level, rng), () => msUnif(level, rng)])();
  const o = { skill: MS, level, key: `${level}:${d.key}`, prompt: d.prompt, parts: d.parts, hints: d.hints, subgoals: MS_SUB, exam: examTag(opts) };
  if (opts.exam === 'coef') return coefItem({ ...o, parts: [d.parts[0]] });
  return statItem(o);
}

// ======================================================================
// p-bias-mse
// ======================================================================

const BM = 'p-bias-mse';
const BM_SUB = [
  { id: 'mom', label: 'moments', skill: 'p-moments' },
  { id: 'var', label: 'variance d\'une combinaison', skill: 'p-lin-combo' },
  { id: 'bias', label: 'biais, EQM', skill: BM },
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
  prompt: 'Interpréter : quelle phrase est juste ?',
  options: [
    { html: `θ̂ est sans biais et son EQM tend vers 0 quand n grandit : il est consistant.`, correct: true },
    { html: 'Un estimateur sans biais est toujours meilleur qu\'un estimateur biaisé.', correct: false, rule: 'p_unbiased_better' },
    { html: 'L\'EQM de Ȳ vaut var(Ȳ) + biais(Ȳ) (sans carré).', correct: false, rule: 'p_mse_bias_not_squared' },
    { html: `Ȳ est sans biais, puisque E[Y] = ${k + 1}θ/${k + 2} ≈ θ.`, correct: false },
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
    { label: 'E[Y]', kind: 'prob', vars: ['θ'], domain: BM_DOM, expect: mono(EY), action: 'Espérance : ∫ y·f(y) dy',
      lines: [L(mono(EY), `∫₀^θ ${k + 1}y^${k + 1}/θ^${k + 1} dy`, 'mom', [String(EY.n)])] },
    { label: 'biais(Ȳ)', kind: 'prob', vars: ['θ'], domain: BM_DOM, expect: mono(EY.sub(1)), action: 'Biais : E[Ȳ] − θ',
      lines: [L(mono(EY.sub(1)), 'E[Ȳ] = E[Y]', 'bias')] },
    { label: 'c', name: 'c', kind: 'prob', expect: J(c), action: 'Corriger : θ̂ = c·Ȳ avec E[θ̂] = θ',
      lines: [L(T(c), `c·${S(EY)}θ = θ`, 'bias', [T(c)])] },
  ];
  if (level >= 2) {
    parts.push({ label: 'E[Y²]', kind: 'prob', vars: ['θ'], domain: BM_DOM, expect: mono(EY2, 2), action: 'Second moment',
      lines: [L(mono(EY2, 2), `∫₀^θ ${k + 1}y^${k + 2}/θ^${k + 1} dy`, 'mom')] });
    parts.push({ label: 'var(Y)', kind: 'prob', vars: ['θ'], domain: BM_DOM, expect: mono(vY, 2), action: 'König-Huygens',
      lines: [L(`${mono(EY2, 2)}-(${mono(EY)})^2`, 'E[Y²] − E[Y]²', 'mom'), L(mono(vY, 2), 'Simplifier', 'mom')].slice(-1) });
    parts.push({ label: 'var(θ̂)', kind: 'prob', vars: ['θ', 'n'], domain: BM_DOM, expect: mono(vT, 2, true), action: 'c²·var(Y)/n',
      traps: { p_var_scale: { values: [mono(c.mul(vY), 2, true)] }, p_se_forgot_sqrt_n: { values: [mono(vT, 2)] } },
      wrongActions: [{ label: 'c·var(Y)/n', rule: 'p_var_scale', why: 'Une constante sort de la variance au carré.' }, { label: 'c²·var(Y), sans diviser par n', rule: 'p_se_forgot_sqrt_n', why: 'var(Ȳ) = var(Y)/n.' }],
      lines: [L(mono(vT, 2, true), `(${S(c)})² · var(Y)/n`, 'var', [`n`])] });
  }
  return {
    key: `dens:${k}`, k,
    prompt: `Y₁, …, Yₙ sont iid de densité f(y) = ${k + 1}y^${k}/θ^${k + 1} sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le${level >= 2 ? ' et calcule la variance de l\'estimateur corrigé θ̂ = c·Ȳ' : ''}.`,
    parts,
    hints: H('var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ.', `var(θ̂) = (${S(c)})² · ${S(vY)}θ²/□`, `var(θ̂) = ${mono(vT, 2, true).replace('-', '−')}`),
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
    prompt: `Y₁, …, Yₙ sont iid de densité ${k + 1}y^${k}/θ^${k + 1} sur ]0 ; θ[ : E[Y] = ${mono(EY)} et var(Y) = ${mono(vY, 2)}. Calcule l'erreur quadratique moyenne de Ȳ comme estimateur de θ.`,
    parts: [
      { label: 'biais(Ȳ)', kind: 'prob', vars: ['θ'], domain: BM_DOM, expect: mono(b), action: 'Biais : E[Ȳ] − θ',
        lines: [L(mono(b), 'E[Ȳ] − θ', 'bias')] },
      { label: 'var(Ȳ)', kind: 'prob', vars: ['θ', 'n'], domain: BM_DOM, expect: mono(vY, 2, true), action: 'var(Y)/n',
        traps: { p_se_forgot_sqrt_n: { values: [mono(vY, 2)] } },
        lines: [L(mono(vY, 2, true), 'var(Ȳ) = var(Y)/n', 'var')] },
      { label: 'EQM(Ȳ)', kind: 'prob', vars: ['θ', 'n'], domain: BM_DOM, expect: `${mono(vY, 2, true)}+${mono(b.mul(b), 2)}`, action: 'EQM = var + biais²',
        traps: { p_mse_bias_not_squared: { values: [`${mono(vY, 2, true)}${mono(b)}`] } },
        wrongActions: [{ label: 'EQM = var + biais', rule: 'p_mse_bias_not_squared', why: 'Le biais entre au carré.' }],
        lines: [L(`${mono(vY, 2, true)}+${mono(b.mul(b), 2)}`, 'EQM = var + biais²', 'bias')] },
    ],
    hints: H('EQM = var + biais².', `EQM = ${mono(vY, 2, true)} + (□)²`, `EQM = ${mono(vY, 2, true)} + ${mono(b.mul(b), 2)}`),
  };
}

// Level 5: U[0, θ], max xᵢ against 2x̄.
function bmUnif(level, rng) {
  return {
    key: 'unif',
    prompt: 'X₁, …, Xₙ sont iid de loi U[0 ; θ]. Compare les erreurs quadratiques moyennes de 2X̄ (sans biais) et de M = max Xᵢ, sachant que E[M] = nθ/(n + 1) et var(M) = nθ²/((n + 1)²(n + 2)).',
    parts: [
      { label: 'EQM(2X̄)', kind: 'prob', vars: ['θ', 'n'], domain: BM_DOM, expect: 'θ^2/(3n)', action: 'Sans biais : EQM = var = 4·var(X)/n',
        traps: { p_var_scale: { values: ['θ^2/(6n)'] } },
        lines: [L('θ^2/(3n)', '4 · (θ²/12)/n', 'var')] },
      { label: 'biais(M)', kind: 'prob', vars: ['θ', 'n'], domain: BM_DOM, expect: '-θ/(n+1)', action: 'Biais : E[M] − θ',
        lines: [L('-θ/(n+1)', 'nθ/(n + 1) − θ', 'bias')] },
      { label: 'EQM(M)', kind: 'prob', vars: ['θ', 'n'], domain: BM_DOM, expect: '2θ^2/((n+1)(n+2))', action: 'EQM = var + biais²',
        traps: { p_mse_bias_not_squared: { values: ['n×θ^2/((n+1)^2×(n+2))-θ/(n+1)'] } },
        lines: [L('2θ^2/((n+1)(n+2))', 'var(M) + biais(M)², simplifié', 'bias')] },
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
      prompt: `Y₁, …, Yₙ iid de densité ${k + 1}y^${k}/θ^${k + 1} sur ]0 ; θ[. On pose θ̂ = (${S(c)})·Ȳ, sans biais. Que vaut var(θ̂) ?`,
      right: mk(c.mul(c).mul(vY), true), wrongs: [{ html: mk(c.mul(vY), true), rule: 'p_var_scale' }, { html: mk(c.mul(c).mul(vY), false), rule: 'p_se_forgot_sqrt_n' }],
      fillers: [{ html: mk(vY, true) }, { html: mk(vY.mul(2), true) }] }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) {
      return tf({ skill: BM, key: 'better', exam: examTag(opts), truth: false, ruleIfTrue: 'p_unbiased_better',
        statement: 'Pour U[0 ; θ], l\'estimateur sans biais 2X̄ a toujours une EQM plus petite que M = max Xᵢ (biaisé), d\'EQM 2θ²/((n + 1)(n + 2)).',
        explanation: 'EQM(2X̄) = θ²/(3n). Pour n = 3 : θ²/9 ≈ 0,111θ² contre 2θ²/20 = 0,1θ² : l\'estimateur biaisé est meilleur.',
        counter: numCounter({ vars: [{ v: 'n', label: 'n =', dom: 'N*' }], hyp: 'n≥1', pred: '1/(3n)≤2/((n+1)(n+2))', answer: { n: '3' } }) });
    }
    return tf({ skill: BM, key: 'ybar', exam: examTag(opts), truth: false, ruleIfTrue: 'p_unbiased_better',
      statement: 'Si Y a pour densité 3y²/θ³ sur ]0 ; θ[, Ȳ est un estimateur sans biais de θ.',
      explanation: 'E[Ȳ] = E[Y] = 3θ/4 ≠ θ : Ȳ est biaisé (biais −θ/4). Avec θ = 1, E[Ȳ] = 3/4.',
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
  { id: 'deriv', label: 'dérivées', skill: MLE },
  { id: 'info', label: 'information, borne', skill: FC },
];
const FC_MODELS = [
  { id: 'pois', score: 'x/λ-1', lnfText: 'x·ln λ − λ − ln(x!)', sym: 'λ', law: 'Poiss(λ)', lnf: 'x×ln(λ)-λ', d2: '-x/λ^2', I: '1/λ', CR: 'λ/n', dom: [0.5, 5], est: 'X̄', eff: true, how: 'E[X] = λ' },
  { id: 'bern', score: 'x/p-(1-x)/(1-p)', lnfText: 'x·ln p + (1 − x)·ln(1 − p)', sym: 'p', law: 'Bernoulli de paramètre p', lnf: 'x×ln(p)+(1-x)×ln(1-p)', d2: '-x/p^2-(1-x)/(1-p)^2', I: '1/(p(1-p))', CR: 'p(1-p)/n', dom: [0.1, 0.9], est: 'X̄', eff: true, how: 'E[X] = p' },
  { id: 'exp', score: '1/λ-x', lnfText: 'ln λ − λx', sym: 'λ', law: 'exp(λ)', lnf: 'ln(λ)-λx', d2: '-1/λ^2', I: '1/λ^2', CR: 'λ^2/n', dom: [0.5, 5], est: null, eff: false, how: 'la dérivée seconde ne dépend pas de x' },
  { id: 'norm', score: '(x-μ)/4', lnfText: '−(x − μ)²/8', sym: 'μ', law: 'N(μ, 4) (variance connue)', lnf: '-(x-μ)^2/8', d2: '-1/4', I: '1/4', CR: '4/n', dom: [-3, 3], est: 'X̄', eff: true, how: 'la dérivée seconde est constante' },
  { id: 'var', score: '-1/(2v)+x^2/(2v^2)', lnfText: '−ln(v)/2 − x²/(2v)', sym: 'v', law: 'N(0, v) (v = σ² inconnue)', lnf: '-ln(v)/2-x^2/(2v)', d2: '1/(2v^2)-x^2/v^3', I: '1/(2v^2)', CR: '2v^2/n', dom: [0.5, 4], est: null, eff: false, how: 'E[X²] = v' },
];
const neg = (t) => (t.startsWith('-') ? t.slice(1) : `-(${t})`);

function fcParts(M, level) {
  const v = M.sym;
  const X = { [v]: M.dom, x: [0, 6] };
  const parts = [
    { label: `∂ln f/∂${v}`, kind: 'prob', vars: [v, 'x'], domain: X, expect: M.score, action: `Dériver ln f en ${v} : le score`,
      notes: [`ln f(x ; ${v}) = ${M.lnfText} (à une constante près).`],
      lines: [L(M.score, 'Le score d\'une observation', 'deriv', [M.score])] },
    { label: `∂²ln f/∂${v}²`, kind: 'prob', vars: [v, 'x'], domain: X, expect: M.d2, action: `Dériver deux fois en ${v}`,
      lines: [L(M.d2, 'Dériver deux fois', 'deriv')] },
    { label: `I₁(${v})`, kind: 'prob', vars: [v], domain: { [v]: M.dom }, expect: M.I, action: 'Espérance de l\'opposé',
      traps: { p_fisher_sign: { values: [neg(M.I)] } },
      wrongActions: [{ label: 'Garder le signe de la dérivée seconde', rule: 'p_fisher_sign', why: 'I₁ = −E[∂² ln f] est positive.' }],
      lines: [L(M.I, `I₁ = −E[∂² ln f], avec ${M.how}`, 'info')] },
  ];
  if (level >= 2) {
    parts.push({ label: 'borne de Cramér-Rao', kind: 'prob', vars: [v, 'n'], domain: { [v]: M.dom, n: [2, 50] }, expect: M.CR, action: 'Inverser n·I₁',
      decisions: [{ prompt: 'À quels estimateurs la borne s\'applique-t-elle ?', options: [
        { id: 'u', label: 'Aux estimateurs sans biais de ' + v, valid: true },
        { id: 'all', label: 'À tous les estimateurs, même biaisés', valid: false, rule: 'p_cr_biased', why: 'L\'estimateur constant a une variance nulle : la borne ne vaut que sans biais.' },
      ] }],
      traps: { p_fisher_per_obs: { values: [M.CR.replace('/n', '')] } },
      wrongActions: [{ label: 'Prendre 1/I₁ (une seule observation)', rule: 'p_fisher_per_obs', why: 'Pour n observations, l\'information est n·I₁.' }],
      lines: [L(M.CR, '1/(n·I₁)', 'info', ['n'])] });
  }
  return parts;
}

const FC_INTERPRET = (M) => ({
  prompt: 'Interpréter : que dit cette borne ?',
  options: [
    { html: M.eff ? `var(X̄) = ${M.CR.replace('(1-p)', '(1 − p)')} : X̄ atteint la borne, il est efficace.` : `Tout estimateur sans biais de ${M.sym} a une variance au moins égale à cette borne.`, correct: true },
    { html: 'Aucun estimateur, même biaisé, n\'a une variance plus petite.', correct: false, rule: 'p_cr_biased' },
    { html: 'La borne pour n observations est 1/I₁, la même que pour une seule.', correct: false, rule: 'p_fisher_per_obs' },
    { html: 'L\'information de Fisher peut être négative.', correct: false, rule: 'p_fisher_sign' },
  ],
});

function fcItem(level, rng, profile, opts = {}) {
  const M = level === 1 ? rng.pick(FC_MODELS.slice(0, 2)) : rng.pick(FC_MODELS);
  if (opts.exam === 'mcq') {
    const sm = (t) => SM(t, { vars: [M.sym, 'n'] });
    return choice({ skill: FC, level: 4, key: `mcq:${M.id}`, exam: examTag(opts),
      prompt: `X₁, …, Xₙ iid de loi ${M.law} ; I₁(${M.sym}) = ${sm(M.I)}. Quelle est la borne de Cramér-Rao pour un estimateur sans biais de ${M.sym} ?`,
      right: sm(M.CR), wrongs: [{ html: sm(M.CR.replace('/n', '')), rule: 'p_fisher_per_obs' }, { html: sm(`-${M.CR}`), rule: 'p_fisher_sign' }],
      fillers: [{ html: sm(`${M.I}/n`) }, { html: sm(`n×${M.I}`) }] }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) {
      return tf({ skill: FC, key: 'const', exam: examTag(opts), truth: false, ruleIfTrue: 'p_cr_biased',
        statement: `Pour X₁, …, Xₙ iid de loi ${M.law}, tout estimateur de ${M.sym}, biaisé ou non, a une variance au moins égale à ${M.CR.replace('(1-p)', '(1 − p)')}.`,
        explanation: 'L\'estimateur constant (toujours 1) a une variance nulle : la borne de Cramér-Rao ne vaut que pour les estimateurs sans biais.',
        counter: numCounter({ vars: [{ v: 'w', label: 'Variance de l\'estimateur constant θ̂ = 1 :' }], hyp: 'w=0', pred: 'w>0', answer: { w: '0' } }) });
    }
    return tf({ skill: FC, key: 'nI', exam: examTag(opts), truth: false, ruleIfTrue: 'p_fisher_per_obs',
      statement: 'L\'information de Fisher de n observations iid vaut I₁(θ), comme pour une seule.',
      explanation: 'Les informations s\'additionnent : I(θ) = n·I₁(θ). Avec n = 2, I = 2I₁.',
      counter: numCounter({ vars: [{ v: 'n', label: 'n =', dom: 'N*' }], hyp: 'n≥2', pred: 'n×1=1', answer: { n: '2' } }) });
  }
  const parts = fcParts(M, level);
  return statItem({ skill: FC, level, key: `${level}:${M.id}`, parts, subgoals: FC_SUB, keys: GK, exam: examTag(opts),
    prompt: `X₁, …, Xₙ sont iid de loi ${M.law}. Calcule l'information de Fisher I₁(${M.sym}) d'une observation${level >= 2 ? ', puis la borne de Cramér-Rao' : ''}.`,
    interpret: level >= 3 ? FC_INTERPRET(M) : null,
    hints: H(`Dérive deux fois ln f en ${M.sym}, puis prends l'espérance de l'opposé.`, `I₁(${M.sym}) = −E[${M.d2.replace(/×/g, '·')}] = □`, `I₁(${M.sym}) = ${M.I}`) });
}

export const GEN = {
  [MOM]: momItem,
  [MLE]: mleItem,
  [MS]: msItem,
  [BM]: bmItem,
  [FC]: fcItem,
};

void Phi; void FS; void qt;

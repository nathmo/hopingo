// Generators of module A1, part i: series with a parameter (a1-ser-param).
// Catalogue: docs/universite/A1-analyse-1.md, « Séries numériques », and
// the exam example E6 (9 points, model MT 2014).
//
// Levels 1–4: a geometric series Σ (aλ/(λ + b))ⁿ (or Σ (λ/(λ + b))ⁿ):
// |q| < 1 solved as an inequality in λ (judge `solset`), q at each bound
// (judge `value`), then the set of convergence once the bounds are decided
// (decisions at the head of the next part). Level 5 and the `open` exam
// variant: the problem E6, Σ (−1)ᵏ k^((m−1)α)/(αᵏ + kᵐ) for α > 0, in
// three cases (α > 1 : 4 points, 0 < α < 1 : 3, α = 1 : 2).

import { t } from '../../i18n.js';
import { MT, linesItem, mcq, tfItem, examTag } from './kit.js';
import { problemItem } from './kit-problem.js';
import {
  q, N, modeOf, H, E, blanked, partsScript, fr, LIM,
} from './analyse1-i-kit.js';

const PA = 'a1-ser-param';
const PA_SUB = [
  { id: 'ineq', label: t('inéquation'), skill: 'quad-formula' },
  { id: 'sign', label: t('signe du trinôme'), skill: 'g1-sign-table' },
  { id: 'bounds', label: t('bornes'), skill: PA },
];
const PA_CHOICES = [
  { id: 'abs', label: '|A/B| < 1 ⇔ |A| < |B|' },
  { id: 'square', label: t('Élever au carré : |A| < |B| ⇔ A² < B²') },
  { id: 'expand', label: t('Développer et ordonner') },
  { id: 'factor', label: t('Factoriser le trinôme') },
  { id: 'solve', label: t('Lire le signe et écrire l\'ensemble') },
  { id: 'bound', label: t('Calculer q à la borne') },
  { id: 'concl', label: t('Écrire l\'ensemble de convergence') },
  { id: 'dropabs', label: t('Enlever les valeurs absolues'), rule: 'a1_abs_square_ineq', why: t('|a| < |b| équivaut à a² < b², pas à a < b.') },
];
const L = { vars: ['λ'] };
const SS = { kind: 'solset', v: 'λ' };
const QT = (n) => `(${N(n)})`;
const iv = (lo, hi) => `]${N(lo)} ; ${hi === null ? '+∞' : N(hi)}[`;
const ivHtml = (x) => fr(x);
// (λ − r) written: λ − 3, λ + 1/2.
const lm = (r) => (r.n < 0 ? `λ+${N(r.neg())}` : `λ-${N(r)}`);

// {lin, a, b, lo, hi (null: +∞), q (text), lines}
function paData(rng) {
  if (rng.next() < 0.25) {
    const b = rng.int(1, 6);
    const lo = q(-b, 2);
    const qt = `λ/(λ+${b})`;
    return {
      lin: true, a: 1, b, lo, hi: null, qt,
      lines: [
        E(`|λ|<|λ+${b}|`, '|A/B| < 1 ⇔ |A| < |B|', 'ineq', 'abs'),
        E(`λ^2<(λ+${b})^2`, t('Élever au carré'), 'ineq', 'square'),
        E(`${2 * b}λ+${b * b}>0`, t('Développer : λ² se simplifie'), 'ineq', 'expand'),
        E(iv(lo, null), `λ > ${fr(N(lo))}`, 'sign', 'solve'),
      ],
    };
  }
  for (let i = 0; i < 200; i++) {
    const a = rng.pick([2, 2, 3, 3, 4, 5]);
    const b = rng.int(1, 12);
    const hi = q(b, a - 1);
    const lo = q(-b, a + 1);
    if (hi.d > 2 || lo.d > 2 || hi.n > 9 || lo.n < -9) continue;
    const A = a * a - 1;
    return {
      lin: false, a, b, lo, hi, qt: `${a}λ/(λ+${b})`,
      lines: [
        E(`|${a}λ|<|λ+${b}|`, '|A/B| < 1 ⇔ |A| < |B|', 'ineq', 'abs'),
        E(`${a * a}λ^2<(λ+${b})^2`, t('Élever au carré (deux membres positifs)'), 'ineq', 'square'),
        E(`${A}λ^2-${2 * b}λ-${b * b}<0`, t('Développer et ordonner'), 'ineq', 'expand'),
        E(`(${lm(hi)})(${lm(lo)})<0`, t('Racines {a} et {b}', { a: fr(N(lo)), b: N(hi) }), 'sign', 'factor'),
        E(iv(lo, hi), t('Négatif entre les racines'), 'sign', 'solve'),
      ],
    };
  }
  return null;
}
const FALLBACK = () => ({
  lin: false, a: 2, b: 3, lo: q(-1), hi: q(3), qt: '2λ/(λ+3)', fallback: true,
  lines: [
    E('|2λ|<|λ+3|', '|A/B| < 1 ⇔ |A| < |B|', 'ineq', 'abs'), E('4λ^2<(λ+3)^2', t('Élever au carré'), 'ineq', 'square'),
    E('3λ^2-6λ-9<0', t('Développer et ordonner'), 'ineq', 'expand'), E('(λ-3)(λ+1)<0', t('Racines {a} et {b}', { a: '−1', b: '3' }), 'sign', 'factor'),
    E(']-1 ; 3[', t('Négatif entre les racines'), 'sign', 'solve'),
  ],
});

// The series at a bound, where q = ±1.
function boundDecision(r, qv) {
  const series = qv === 1 ? 'Σ 1' : 'Σ (−1)ⁿ';
  return { kind: 'decision', prompt: t('En λ = {r}, q = {q} : la série {s}…', { r: fr(N(r)), q: fr(String(qv)), s: series }), options: [
    { id: 'div', label: t('diverge : son terme général ne tend pas vers 0'), valid: true },
    { id: 'conv', label: qv === 1 ? t('converge : la borne est dans l\'ensemble') : t('converge par Leibniz : la borne est dans l\'ensemble'), valid: false, rule: 'a1_param_bounds_untreated',
      why: t('|q| = 1 : qⁿ ne tend pas vers 0, la série {s} diverge. La borne λ = {r} est exclue.', { s: series, r: fr(N(r)) }) },
  ] };
}
function critDecision(d) {
  return { kind: 'decision', prompt: t('Quel critère pour Σ qⁿ ?'), options: [
    { id: 'geo', label: t('Série géométrique de raison q = {q} : converge si et seulement si |q| < 1', { q: fr(d.qt) }), valid: true, ref: true },
    { id: 'root', label: t('Cauchy : ⁿ√|qⁿ| = |q|, puis ρ < 1'), valid: true, quality: 'poor', why: t('Juste (ρ = |q|), mais c\'est une géométrique : |q| < 1 suffit, et elle dit aussi ce qui se passe aux bornes.') },
    { id: 'term', label: t('Le terme général qⁿ tend vers 0 : la série converge pour tout λ'), valid: false, rule: 'a1_series_term_to_zero', why: t('qⁿ → 0 seulement si |q| < 1, et cela ne suffit pas en général : ici, c\'est la règle des géométriques qui conclut.') },
  ] };
}

function paItem(level, rng, opts = {}) {
  if (opts.exam === 'open' || level === 5) return e6Problem(rng, level, opts);
  if (opts.exam === 'mcq') return paMcq(rng);
  if (opts.exam === 'tf') return paTf(rng);
  const d = paData(rng) || FALLBACK();
  const start = `|${d.qt}|<1`;
  const s1 = d.lines.map((l) => ({ ...l }));
  if (level === 1) { s1[s1.length - 1] = blanked(s1.at(-1), [s1.at(-1).math], L); if (!d.lin) s1[3] = blanked(s1[3], [lm(d.lo)], L); }
  if (level === 2) { s1[1] = blanked(s1[1], [`(λ+${d.b})^2`], L); s1[s1.length - 1] = blanked(s1.at(-1), [s1.at(-1).math], L); }
  const qAt = (r) => `${d.a === 1 ? '' : `${d.a}×`}${QT(r)}/(${QT(r)}+${d.b})`;
  const qLine = (v) => {
    const l = E(String(v), `q = ${fr(String(v))}`, 'bounds', 'bound');
    return level === 1 ? blanked(l, [String(v)], L) : l;
  };
  const parts = [{ start, judge: SS, pre: level === 2 || level === 3 ? [critDecision(d)] : [], lines: s1 }];
  parts.push({ html: t('Borne λ = {r} : que vaut la raison q ?', { r: fr(N(d.lo)) }), ask: 'q =', start: qAt(d.lo), judge: { kind: 'value', expect: '-1' }, lines: [qLine(-1)] });
  if (!d.lin) parts.push({ html: t('Borne λ = {r} : que vaut q ?', { r: N(d.hi) }), ask: 'q =', start: qAt(d.hi), judge: { kind: 'value', expect: '1' }, pre: [boundDecision(d.lo, -1)], lines: [qLine(1)] });
  const fin = E(iv(d.lo, d.hi), t('Bornes exclues'), 'bounds', 'concl');
  parts.push({ html: t('Ensemble de convergence :'), ask: 'S =', start, judge: SS, pre: [d.lin ? boundDecision(d.lo, -1) : boundDecision(d.hi, 1)], lines: [level === 1 ? blanked(fin, [fin.math], L) : fin] });
  const { start: st, judge, script } = partsScript(parts, level, PA_CHOICES);
  const given = level === 1 ? ` ${t('C\'est une géométrique : elle converge si et seulement si |q| < 1.')}` : '';
  return linesItem({
    skill: PA, level, mode: modeOf(level), start: st, judge, script,
    prompt: `${t('Pour quels λ ≠ −{b} la série {s} converge-t-elle ?', { b: d.b, s: MT(`sum((${d.qt})^n,n,0,∞)`, { vars: ['n', 'λ'] }) })}${given}`,
    hints: H(t('C\'est une géométrique : elle converge si et seulement si |q| < 1. Puis regarde les bornes à part.'),
      d.lin ? t('Développe (λ + {b})² : λ² se simplifie, et il reste {b2}λ + ▢ > 0.', { b: d.b, b2: 2 * d.b }) : `(${fr(lm(d.hi))})(λ ▢) < 0`,
      t('{s}, bornes exclues (|q| = 1).', { s: ivHtml(iv(d.lo, d.hi)) })),
    subgoals: PA_SUB, keys: ['calcx', 'greek', 'set', 'ineq'], tapActions: level === 3 ? 'steps' : null,
    key: `${PA}:${level}:${d.qt}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

function paMcq(rng) {
  const exam = { format: 'mcq', points: 1 };
  if (rng.next() < 0.35) {
    const options = [
      { html: ']−1 ; 1[', correct: true },
      { html: '[−1 ; 1]', correct: false, rule: 'a1_param_bounds_untreated' },
      { html: '[−1 ; 1[', correct: false, rule: 'a1_ratio_one' },
      { html: ']−1 ; 1]', correct: false, rule: 'a1_ratio_one' },
    ];
    return mcq({
      skill: PA, level: 4, prompt: t('Pour quels b ∈ ℝ la série {s} converge-t-elle ?', { s: MT('sum((b+1/k)^k,k,1,∞)', { vars: ['k', 'b'] }) }), options, key: `${PA}:mcq:b1k`, expectedSec: 240, exam,
      solution: [{ html: t('Cauchy : ᵏ√|aₖ| = |b + 1/k| → |b|. Converge si |b| < 1, diverge si |b| > 1. En b = 1 : aₖ = (1 + 1/k)ᵏ → e ≠ 0 ; en b = −1 : |aₖ| = (1 − 1/k)ᵏ → 1/e ≠ 0 : les deux divergent. Ensemble : ]−1 ; 1[.'), note: '' }],
    }, rng);
  }
  const d = paData(rng) || FALLBACK();
  if (d.lin) {
    const lo = N(d.lo);
    const options = [
      { html: ivHtml(iv(d.lo, null)), correct: true },
      { html: ivHtml(`[${lo} ; +∞[`), correct: false, rule: 'a1_param_bounds_untreated' },
      { html: 'ℝ ∖ {' + fr(String(-d.b)) + '}', correct: false, rule: 'a1_abs_square_ineq' },
      { html: ivHtml(`]−∞ ; ${lo}[`), correct: false },
    ];
    return mcq({
      skill: PA, level: 4, prompt: t('Ensemble des λ ≠ −{b} pour lesquels {s} converge :', { b: d.b, s: MT(`sum((${d.qt})^n,n,0,∞)`, { vars: ['n', 'λ'] }) }), options, key: `${PA}:mcq:${d.qt}`, expectedSec: 240, exam,
      solution: [{ html: t('Géométrique : |λ| < |λ + {b}| ⇔ λ² < (λ + {b})² ⇔ {b2}λ + {bb} > 0 ⇔ λ > {lo}. En λ = {lo}, q = −1 : diverge.', { b: d.b, b2: 2 * d.b, bb: d.b * d.b, lo: fr(lo) }), note: '' }],
    }, rng);
  }
  const wrongHi = q(d.b, d.a - 1);
  const options = [
    { html: ivHtml(iv(d.lo, d.hi)), correct: true },
    { html: ivHtml(`[${N(d.lo)} ; ${N(d.hi)}]`), correct: false, rule: 'a1_param_bounds_untreated' },
    { html: ivHtml(`]−∞ ; ${N(wrongHi)}[`), correct: false, rule: 'a1_abs_square_ineq' },
    { html: ivHtml(`]${N(d.lo)} ; ${N(d.hi)}]`), correct: false, rule: 'a1_ratio_one' },
  ];
  return mcq({
    skill: PA, level: 4, prompt: t('Ensemble des λ ≠ −{b} pour lesquels {s} converge :', { b: d.b, s: MT(`sum((${d.qt})^n,n,0,∞)`, { vars: ['n', 'λ'] }) }), options, key: `${PA}:mcq:${d.qt}`, expectedSec: 240, exam,
    solution: [{ html: t('Géométrique : |q| < 1 ⇔ {a2}λ² < (λ + {b})² ⇔ {lo} < λ < {hi}. Aux bornes, q = −1 et q = 1 : le terme général ne tend pas vers 0, les bornes sont exclues.', { a2: d.a * d.a, b: d.b, lo: fr(N(d.lo)), hi: N(d.hi) }), note: '' }],
  }, rng);
}

function paTf(rng) {
  const exam = { format: 'tf', points: 1 };
  const kind = rng.pick(['b1', 'geo', 'geo', 'half', 'b0']);
  if (kind === 'b1') {
    return tfItem({ skill: PA, level: 4, exam, statement: t('Pour tout b ∈ [−1 ; 1], la série Σ (b + 1/k)ᵏ converge.'), truth: false, key: 'b1',
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'b', dom: 'R' }], pred: '-1<b<1', hyp: '-1≤b≤1', ask: [{ v: 'b', label: 'b =' }], answer: { b: '1' } },
      ruleIfTrue: 'a1_param_bounds_untreated', explanation: t('Faux : en b = 1, le terme (1 + 1/k)ᵏ tend vers e ≠ 0, la série diverge (de même en b = −1).') });
  }
  if (kind === 'geo') {
    const d = paData(rng) || FALLBACK();
    if (!d.lin) {
      return tfItem({ skill: PA, level: 4, exam, statement: t('Σ ({a}λ/(λ + {b}))ⁿ converge pour tout λ ∈ ]{lo} ; {hi}].', { a: d.a, b: d.b, lo: fr(N(d.lo)), hi: N(d.hi) }), truth: false, key: `geo:${d.qt}`,
        counter: { kind: 'refute', quants: [{ q: '∀', v: 'λ', dom: 'R' }], pred: `${N(d.lo)}<λ<${N(d.hi)}`, hyp: `${N(d.lo)}<λ≤${N(d.hi)}`, ask: [{ v: 'λ', label: 'λ =' }], answer: { 'λ': N(d.hi) } },
        ruleIfTrue: 'a1_param_bounds_untreated', explanation: t('Faux : en λ = {hi}, la raison vaut 1, et Σ 1 diverge. Aux bornes, |q| = 1 : il faut les étudier à part.', { hi: N(d.hi) }) });
    }
  }
  if (kind === 'half' || kind === 'geo') {
    return tfItem({ skill: PA, level: 4, exam, statement: t('La série Σ (λ/(1 − λ))ⁿ (λ ≠ 1) converge si et seulement si λ < 1/2.'), truth: true, key: 'half',
      explanation: t('Vrai : géométrique, |λ| < |1 − λ| ⇔ λ² < (1 − λ)² ⇔ 2λ < 1. En λ = 1/2, q = 1 : diverge.') });
  }
  return tfItem({ skill: PA, level: 4, exam, statement: t('La série Σ (1/2 + 1/k)ᵏ converge.'), truth: true, key: 'b0',
    explanation: t('Vrai : critère de Cauchy, ᵏ√aₖ = 1/2 + 1/k → 1/2 < 1.') });
}

// ---------------------------------------------------------------------
// E6: Σ_{k≥1} (−1)ᵏ k^((m−1)α)/(αᵏ + kᵐ), α > 0 (catalogue: m = 3).
// ---------------------------------------------------------------------

function e6Problem(rng, level, opts) {
  const m = rng.pick([2, 3, 3, 4]);
  const b = m - 1;
  const ba = b === 1 ? 'α' : `${b}α`;
  const kba = b === 1 ? 'k^α' : `k^(${ba})`;
  const ka1 = b === 1 ? '(k+1)^α' : `(k+1)^(${ba})`;
  const kfrac = b === 1 ? '((k+1)/k)^α' : `((k+1)/k)^(${ba})`;
  const expoHtml = `${m} − ${ba}`;
  const kb = b === 1 ? 'k' : `k^${b}`;
  const sg = rng.pick(['(-1)^k', '(-1)^(k+1)']);
  const u = `${sg}×${kba}/(α^k+k^${m})`;
  const abs = `${kba}/(α^k+k^${m})`;
  const K = { vars: ['k', 'α'] };
  const eqv = (lo, hi) => ({ kind: 'equiv', vars: ['k', 'α'], domain: { k: [1, 20], α: [lo, hi] }, target: 'goal' });
  const P = (it) => it;
  // α > 1: d'Alembert on |uₖ|.
  const goalA = `${kfrac}×(1+k^${m}/α^k)/(α+(k+1)^${m}/α^k)`;
  const A1 = P(linesItem({
    skill: PA, level, mode: 'free', start: `${ka1}/(α^(k+1)+(k+1)^${m})×(α^k+k^${m})/${kba}`,
    judge: { ...eqv(1.2, 3), goal: goalA },
    script: [
      E(`${kfrac}×(α^k+k^${m})/(α^(k+1)+(k+1)^${m})`, t('Regrouper les puissances de k'), 'crit', 'simplify'),
      E(goalA, t('Diviser en haut et en bas par {p}', { p: 'αᵏ' }), 'crit', 'simplify'),
    ],
    prompt: t('Cas α > 1. Simplifie le rapport |uₖ₊₁|/|uₖ| de d\'Alembert jusqu\'à {g}.', { g: MT(goalA, K) }),
    hints: [], subgoals: [{ id: 'crit', label: t('d\'Alembert'), skill: 'a1-ser-ratio-root' }], keys: ['calcx', 'greek', 'seq'],
    key: `${PA}:e6:A:${m}`, noHints: true,
  }));
  const A2 = mcq({
    skill: PA, level, prompt: t('Cas α > 1 : quand k → +∞, ce rapport tend vers :'), key: `${PA}:e6:Alim:${m}`,
    options: [
      { html: '1/α', correct: true },
      { html: '1', correct: false },
      { html: 'α', correct: false },
      { html: '0', correct: false },
    ],
    solution: [{ html: t('((k + 1)/k)^({ba}) → 1, k{m}/αᵏ → 0 et (k + 1){m}/αᵏ → 0 (α > 1) : le rapport tend vers 1/α.', { ba, m: sup(m) }), note: '' }],
  }, rng);
  const verdict = (prompt, right, key, why, rules = {}) => mcq({
    skill: PA, level, prompt, key: `${PA}:e6:${key}:${m}`, keepOrder: true,
    options: [
      { html: t('absolument convergente'), correct: right === 'abs', ...(right !== 'abs' && rules.abs ? { rule: rules.abs } : {}) },
      { html: t('semi-convergente'), correct: right === 'semi', ...(right !== 'semi' && rules.semi ? { rule: rules.semi } : {}) },
      { html: t('divergente'), correct: right === 'div', ...(right !== 'div' && rules.div ? { rule: rules.div } : {}) },
      { html: t('on ne peut pas conclure'), correct: false, ...(rules.none ? { rule: rules.none } : {}) },
    ],
    solution: [{ html: why, note: '' }],
  }, rng);
  const A3 = verdict(t('Cas α > 1 : la série est'), 'abs', 'Av', t('ρ = 1/α < 1 : la série converge absolument (d\'Alembert).'), { none: 'a1_ratio_one' });
  // 0 < α < 1: comparison with 1/k^(m − (m−1)α).
  const expo = `${m}-${ba}`;
  const goalB = `1/(1+α^k/k^${m})`;
  const B1 = linesItem({
    skill: PA, level, mode: 'free', start: `k^(${expo})×${abs}`, judge: { ...eqv(0.2, 0.9), goal: goalB },
    script: [
      { kind: 'note', html: t('0 < α < 1 : αᵏ → 0, donc |uₖ| ~ {ka}/k{m} = 1/k^({e}).', { ka: b === 1 ? 'kᵅ' : `k^(${ba})`, m: sup(m), e: expoHtml }) },
      E(goalB, t('k^({e})·{ka} = k{m}, puis diviser par k{m} : → 1', { e: expoHtml, ka: b === 1 ? 'kᵅ' : `k^(${ba})`, m: sup(m) }), 'cmp', 'simplify'),
      { kind: 'segment', html: t('Pour quels α ∈ ]0 ; 1[ l\'exposant {e} est-il > 1 ?', { e: expoHtml }), ask: 'α ∈', start: { math: `${expo}>1` }, judge: { kind: 'solset', v: 'α', domain: ']0 ; 1[' } },
      E('α<1', t('Résoudre'), 'cmp', 'solve'),
      E(']0 ; 1[', t('Toujours, sur ]0 ; 1['), 'cmp', 'solve'),
    ],
    prompt: t('Cas 0 < α < 1. Compare |uₖ| à 1/k^({e}) : simplifie k^({e})·|uₖ| jusqu\'à {g}, puis étudie l\'exposant.', { e: expoHtml, g: MT(goalB, K) }),
    hints: [], subgoals: [{ id: 'cmp', label: t('comparaison'), skill: 'a1-ser-compare' }], keys: ['calcx', 'greek', 'seq', 'set'],
    key: `${PA}:e6:B:${m}`, noHints: true,
  });
  const B2 = verdict(t('Cas 0 < α < 1 : la série est'), 'abs', 'Bv', t('|uₖ| ~ 1/k^({e}) avec {e} > 1 : la série converge absolument (comparaison).', { e: expoHtml }), { semi: 'a1_abs_conv_confused' });
  // α = 1: k·|uₖ| → 1, then Leibniz.
  const xk = `${kb}/(1+k^${m})`;
  const xk1 = `${b === 1 ? '(k+1)' : `(k+1)^${b}`}/(1+(k+1)^${m})`;
  const C1 = linesItem({
    skill: PA, level, mode: 'free', start: `k×${xk}`, judge: { ...LIM, v: 'k' },
    script: [
      E(`1/(1/k^${m}+1)`, t('Diviser par {p}', { p: `k${sup(m)}` }), 'leib', 'simplify'),
      E('1', t('|uₖ| ~ 1/k : Σ |uₖ| diverge'), 'leib', 'lim'),
      { kind: 'segment', html: t('Leibniz : xₖ = {x} décroît pour k ≥ 2. Montre xₖ − xₖ₊₁ ≥ 0.', { x: MT(xk, K) }), ask: 'xₖ − xₖ₊₁ ≥', start: { math: `${xk}-${xk1}` }, judge: { kind: 'equiv', rel: '≥', vars: ['k'], from: 2 } },
      E('0', t('C\'est positif'), 'leib', 'sign'),
    ],
    prompt: t('Cas α = 1 : |uₖ| = {x}. Calcule la limite de k·|uₖ|, puis vérifie la décroissance de Leibniz.', { x: MT(xk, K) }),
    hints: [], subgoals: [{ id: 'leib', label: 'Leibniz', skill: 'a1-ser-leibniz-abs' }], keys: ['calcx', 'seq'],
    key: `${PA}:e6:C:${m}`, noHints: true,
  });
  const C2 = verdict(t('Cas α = 1 : la série est'), 'semi', 'Cv', t('Σ |uₖ| diverge (|uₖ| ~ 1/k), mais xₖ décroît vers 0 : Leibniz, la série est semi-convergente.'), { abs: 'a1_abs_conv_confused', div: 'a1_abs_conv_confused' });
  const parts = [
    { item: A1, points: 2, title: t('α > 1 : d\'Alembert sur |uₖ|') },
    { item: A2, points: 1, title: t('α > 1 : limite du rapport') },
    { item: A3, points: 1, title: t('α > 1 : conclusion') },
    { item: B1, points: [1, 1], title: t('0 < α < 1 : comparaison') },
    { item: B2, points: 1, title: t('0 < α < 1 : conclusion') },
    { item: C1, points: [0.5, 0.5], title: t('α = 1 : |uₖ| et Leibniz') },
    { item: C2, points: 1, title: t('α = 1 : conclusion') },
  ];
  return problemItem({
    skill: PA, level, prompt: t('Pour α > 0, étudie la nature de {s} : absolument convergente, semi-convergente ou divergente ? On note uₖ son terme général.', { s: MT(`sum(${u},k,1,∞)`, K) }),
    parts, key: `e6:${m}:${sg}`, exam: opts.exam ? { format: 'open', points: 9 } : false, expectedSec: 900,
  });
}
const sup = (m) => ({ 2: '²', 3: '³', 4: '⁴' }[m] || `^${m}`);

export const GEN = {
  [PA]: (level, rng, profile, opts = {}) => paItem(level, rng, opts),
};

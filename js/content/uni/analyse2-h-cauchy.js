// a2-ode-cauchy (module A2, part h, step U6): existence and uniqueness for
// y′ = f(t, y), y(0) = y₀ on R = {|t| ≤ a, |y − y₀| ≤ b}. Lines: ∂f/∂y
// (`equiv` in t, y), then M, K and the interval min(a, b/K) (`value` with
// expect); the theorem's hypotheses as true/false items whose
// counter-examples are checked by js/judges/a2-examples*.js.

import { MT, linesItem, examTag } from './kit.js';
import { partsScript, tpl } from './a2-kit.js';
import { q, qt, H, E, modeOf, mcq4, opt, tfOf, tfProblem, pickK } from './analyse2-h-kit.js';

const SK = 'a2-ode-cauchy';
const SUB = [
  { id: 'partial', label: 'dériver f par rapport à y', skill: 'a2-partials' },
  { id: 'lipschitz', label: 'constante de Lipschitz M', skill: SK },
  { id: 'bound', label: 'borne K de |f| sur R', skill: SK },
  { id: 'interval', label: 'intervalle min(a, b/K)', skill: SK },
];
const KEYS = ['calcx', 'calcfn', 'a2', 'anal'];
const TY = { vars: ['t', 'y'] };

// f(t, y), its ∂f/∂y and the natural bounds on |t| ≤ a, |y| ≤ B.
const FAMS = [
  { f: 't sin(y)+y^2', fy: 't cos(y)+2y', M: (a, B) => a + 2 * B, Mline: (a, B) => `${a}×1+2×${B}`, K: (a, B) => a + B * B, Kline: (a, B) => `${a}×1+${B}^2`, why: (a, B) => `|t| ≤ ${a}, |cos y| ≤ 1, |y| ≤ ${B}` },
  { f: 't y^2', fy: '2t y', M: (a, B) => 2 * a * B, Mline: (a, B) => `2×${a}×${B}`, K: (a, B) => a * B * B, Kline: (a, B) => `${a}×${B}^2`, why: (a, B) => `|t| ≤ ${a}, |y| ≤ ${B}` },
  { f: 'y cos(t)', fy: 'cos(t)', M: () => 1, Mline: () => '1', K: (a, B) => B, Kline: (a, B) => `${B}×1`, why: (a, B) => `|cos t| ≤ 1, |y| ≤ ${B}` },
  { f: 't cos(y)', fy: '-t sin(y)', M: (a) => a, Mline: (a) => `${a}×1`, K: (a) => a, Kline: (a) => `${a}×1`, why: (a) => `|t| ≤ ${a}, |sin y| ≤ 1, |cos y| ≤ 1` },
  { f: 'y sin(t)+t', fy: 'sin(t)', M: () => 1, Mline: () => '1', K: (a, B) => B + a, Kline: (a, B) => `${B}×1+${a}`, why: (a, B) => `|sin t| ≤ 1, |y| ≤ ${B}, |t| ≤ ${a}` },
  { f: 't^2+y^2', fy: '2y', M: (a, B) => 2 * B, Mline: (a, B) => `2×${B}`, K: (a, B) => a * a + B * B, Kline: (a, B) => `${a}^2+${B}^2`, why: (a, B) => `|t| ≤ ${a}, |y| ≤ ${B}` },
];

function data(rng) {
  const fam = rng.pick(FAMS);
  const a = rng.pick([1, 2]);
  const b = rng.pick([1, 2]);
  const y0 = rng.pick([0, 0, 1, -1]);
  const B = Math.abs(y0) + b;
  const M = fam.M(a, B);
  const K = fam.K(a, B);
  const h = q(b, K).cmp(a) < 0 ? q(b, K) : q(a);
  return { fam, a, b, y0, B, M, K, h };
}

const CHOICES = [
  { id: 'pd', label: 'Dériver f par rapport à y' },
  { id: 'lip', label: 'Majorer |∂f/∂y| sur R : constante de Lipschitz M' },
  { id: 'K', label: 'Majorer |f| sur R : borne K' },
  { id: 'h', label: 'Intervalle : min(a, b/K)' },
  { id: 'calc', label: 'Calculer' },
  { id: 'cont', label: 'f est continue : la solution est unique', rule: 'a2_ode_continuity_unique', why: 'La continuité donne l\'existence (Peano), pas l\'unicité : il faut Lipschitz en y.' },
  { id: 'hM', label: 'Intervalle : min(a, b/M)', why: 'L\'intervalle vient de la borne K de |f| : la solution ne peut pas quitter le rectangle avant le temps b/K.' },
];

const uniqueness = {
  kind: 'decision', prompt: 'Quelle hypothèse donne l\'unicité de la solution ?', options: [
    { id: 'lip', label: 'f est Lipschitz en y sur R (par exemple ∂f/∂y bornée)', valid: true },
    { id: 'cont', label: 'f est continue sur R', valid: false, rule: 'a2_ode_continuity_unique', why: 'Continue seule ne suffit pas : y′ = 3y^(2/3), y(0) = 0 a deux solutions, 0 et t³.' },
    { id: 'K', label: 'f est bornée par K sur R', valid: false, why: 'K donne la taille de l\'intervalle, pas l\'unicité.' },
  ],
};

function linesVariant(level, rng, opts) {
  const d = data(rng);
  const { fam, a, b, y0, B, M, K, h } = d;
  const mLine = fam.Mline(a, B);
  const kLine = fam.Kline(a, B);
  const hLine = `min(${a} ; ${b}/${K})`;
  const value = (expect) => ({ kind: 'value', expect: String(expect) });
  const two = (line, val, note, sub, act) => (line === String(val) ? [E(String(val), note, sub, act)] : [E(line, note, sub, act), E(String(val), 'Calculer', sub, 'calc')]);
  const parts = [
    { start: `pd(${fam.f},y)`, judge: { kind: 'equiv', ...TY, target: 'no-prime', domain: { t: [-a, a], y: [y0 - b, y0 + b] } }, lines: [E(fam.fy, 'Dériver en y (t est une constante)', 'partial', 'pd')] },
    { html: `Majore |∂f/∂y| sur R (${fam.why(a, B)}) : f est M-Lipschitz en y.`, ask: 'M =', start: 'M', judge: value(M), pre: level === 3 ? [uniqueness] : [], lines: two(mLine, M, 'Majorer chaque facteur', 'lipschitz', 'lip') },
    { html: `Majore |f| sur R : K =`, ask: 'K =', start: 'K', judge: value(K), lines: two(kLine, K, 'Majorer chaque terme', 'bound', 'K') },
    { html: 'Solution unique sur |t| ≤ h, avec h = min(a, b/K) :', ask: 'h =', start: 'h', judge: value(qt(h)), lines: [E(hLine, 'min(a, b/K)', 'interval', 'h'), E(qt(h), 'Calculer', 'interval', 'calc')] },
  ];
  if (level === 1) {
    parts[1].lines[0] = { ...parts[1].lines[0], ...tpl(parts[1].lines[0].math, [String(B), '1']) };
    parts[2].lines[0] = { ...parts[2].lines[0], ...tpl(parts[2].lines[0].math, [String(B)]) };
  }
  const { start, judge, script } = partsScript(parts, level, CHOICES);
  const R = `|t| ≤ ${a}, |y${y0 ? (y0 > 0 ? ` − ${y0}` : ` + ${-y0}`) : ''}| ≤ ${b}`;
  return linesItem({
    skill: SK, level, mode: modeOf(level), start, judge, script,
    prompt: `Problème de Cauchy y′ = f(t, y) = ${MT(fam.f, TY)}, y(0) = ${y0} sur le rectangle R : ${R}${y0 ? ` (donc |y| ≤ ${B})` : ''}. Trouve une constante de Lipschitz M, une borne K de |f| et l'intervalle |t| ≤ h où la solution existe et est unique.`,
    hints: H('Lipschitz : majore |∂f/∂y| sur R. Intervalle : min(a, b/K).', `Sur R : ${fam.why(a, B)}. Par exemple |∂f/∂y| ≤ ${mLine.replace(/×/g, '·')}.`, `M = ${M}, K = ${K}, h = min(${a}, ${b}/${K}) = ${qt(h)}.`),
    subgoals: SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${fam.f}:${a}:${b}:${y0}`, exam: examTag(opts),
  });
}

// ---------- statements (true/false) ----------

const T_KEYS = ['calcx', 'calcfn', 'anal'];
const STATEMENTS = [
  { key: 'int', truth: true, text: 'Si f est continue et bornée sur ℝ, le problème y′ = f(t), y(t₀) = y₀ a une unique solution.', why: 'Vrai : on intègre, y(t) = y₀ + ∫ de t₀ à t de f(s) ds, et deux solutions ont la même dérivée et la même valeur en t₀.', ruleIfFalse: null },
  {
    key: 'cont', truth: false, text: 'Si f est continue et bornée, le problème y′ = f(y), y(0) = 0 a une unique solution locale.', why: 'Faux : y′ = 3y^(2/3) (tronquée pour être bornée) a les solutions y = 0 et y = t³. La continuité ne donne que l\'existence ; l\'unicité demande f Lipschitz en y.', ruleIfTrue: 'a2_ode_continuity_unique',
    counter: { kind: 'a2', prop: 'odeTwoSolutions', params: { eq: "y'=3y^(2/3)", v: 't', ic: { x: 0, y: 0 }, domain: { t: [0.1, 2] } }, ask: [{ v: 'y1', label: 'Pour y′ = 3y^(2/3), y(0) = 0 : y₁(t) =', keys: T_KEYS }, { v: 'y2', label: 'y₂(t) =', keys: T_KEYS }], answer: { y1: '0', y2: 't^3' } },
  },
  {
    key: 'sqrt', truth: false, text: 'Si f est continue, le problème y′ = f(y), y(0) = 0 a une unique solution sur [0 ; 1].', why: 'Faux : y′ = 2√|y| a les solutions y = 0 et y = t² sur [0 ; 1]. √|y| n\'est pas Lipschitz près de 0.', ruleIfTrue: 'a2_ode_continuity_unique',
    counter: { kind: 'a2', prop: 'odeTwoSolutions', params: { eq: "y'=2√(|y|)", v: 't', ic: { x: 0, y: 0 }, domain: { t: [0.1, 1] } }, ask: [{ v: 'y1', label: 'Pour y′ = 2√|y|, y(0) = 0 : y₁(t) =', keys: T_KEYS }, { v: 'y2', label: 'y₂(t) =', keys: T_KEYS }], answer: { y1: '0', y2: 't^2' } },
  },
  { key: 'c1', truth: true, text: 'Si f ∈ C¹(ℝ²), le problème y′ = f(t, y), y(t₀) = y₀ a une unique solution locale.', why: 'Vrai : ∂f/∂y est continue, donc bornée sur un rectangle autour de (t₀, y₀) : f est Lipschitz en y, et le théorème s\'applique.' },
  {
    key: 'global', truth: false, text: 'Si f ∈ C¹(ℝ²), la solution de y′ = f(t, y), y(0) = 1 est définie pour tout t ∈ ℝ.', why: 'Faux : y′ = y², y(0) = 1 donne y = 1/(1 − t), qui explose en t = 1. Le théorème est local.', ruleIfTrue: 'a2_ode_local_global',
    counter: { kind: 'a2', prop: 'odeBlowUp', params: { v: 't', ic: { x: 0, y: 1 } }, ask: [{ v: 'f', label: 'f(t, y) =', keys: T_KEYS }, { v: 'y', label: 'y(t) =', keys: T_KEYS }], answer: { f: 'y^2', y: '1/(1-t)' } },
  },
  { key: 'order', truth: true, text: 'L\'équation y‴ = f(t, y, y′, y″) demande trois conditions initiales, y(t₀), y′(t₀) et y″(t₀), pour une solution unique.', why: 'Vrai : on la ramène au système d\'ordre 1 en (y, y′, y″), qui a trois inconnues, donc trois conditions initiales.' },
  { key: 'peano', truth: true, text: 'Si f est continue sur ℝ², le problème y′ = f(t, y), y(t₀) = y₀ a au moins une solution locale.', why: 'Vrai : c\'est le théorème d\'existence (Peano). L\'unicité, elle, demande plus.' },
];

function tfVariant(level, rng, opts, hints = true) {
  const s = rng.pick(STATEMENTS);
  return tfOf(SK, s, level, examTag(opts), hints && !opts?.exam ? H('Existence : f continue. Unicité locale : f Lipschitz en y. Rien de global.', 'Pense à y′ = 3y^(2/3) (deux solutions) et à y′ = y² (explosion).', s.truth ? 'L\'énoncé est vrai.' : `L'énoncé est faux : ${s.why}`) : undefined);
}

function mcqVariant(level, rng, opts) {
  if (rng.chance(0.5)) {
    return mcq4({
      skill: SK, level, key: `${SK}:mcq:third`, exam: examTag(opts),
      prompt: 'Une condition suffisante pour que y‴ = y″·f₂(x) + f₀(y), y(0) = a, y′(0) = b, y″(0) = c ait une unique solution locale est :',
      right: 'f₂ continue et f₀ Lipschitz',
      wrongs: [{ html: 'f₂ et f₀ continues', rule: 'a2_ode_continuity_unique' }, { html: 'f₂ et f₀ bornées', rule: null }, { html: 'f₀ Lipschitz, sans condition sur f₂', rule: null }],
      solution: [{ html: 'Le système (y, y′, y″)′ = (y′, y″, y″f₂(x) + f₀(y)) a un second membre continu en x et Lipschitz en (y, y′, y″) si f₂ est continue et f₀ Lipschitz.', note: '' }],
      expectedSec: 90,
    }, rng);
  }
  const d = data(rng);
  const hM = q(d.b, d.M).cmp(d.a) < 0 ? q(d.b, d.M) : q(d.a);
  return mcq4({
    skill: SK, level, key: `${SK}:mcq:${d.fam.f}:${d.a}:${d.b}:${d.y0}`, exam: examTag(opts),
    prompt: `y′ = ${MT(d.fam.f, TY)}, y(0) = ${d.y0}, sur R : |t| ≤ ${d.a}, |y${d.y0 ? (d.y0 > 0 ? ` − ${d.y0}` : ` + ${-d.y0}`) : ''}| ≤ ${d.b}. Le théorème de Cauchy-Lipschitz garantit une solution unique sur |t| ≤ h avec h =`,
    right: MT(qt(d.h)),
    wrongs: [opt(qt(hM)), opt(String(d.a)), opt(qt(q(d.b, d.K))), opt(qt(q(d.a, d.K))), opt(qt(q(d.b, d.K + 1)))],
    solution: [{ html: `M = ${d.M}, K = ${d.K} ; h = min(${d.a}, ${d.b}/${d.K}) = ${qt(d.h)}.`, note: '' }],
    expectedSec: 120,
  }, rng);
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'tf') return tfVariant(4, rng, opts, false);
    if (opts.exam === 'mcq') return mcqVariant(4, rng, opts);
    if (level === 5) { const ss = pickK(rng, STATEMENTS, 4); return tfProblem(SK, 5, ss, `${SK}:5:${ss.map((s) => s.key).join(',')}`); }
    if (level === 4 && rng.chance(0.5)) return tfVariant(4, rng, opts);
    return linesVariant(level, rng, opts);
  },
};

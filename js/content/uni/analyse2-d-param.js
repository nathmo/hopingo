// Generators of module A2, part d (unit `analyse2`, step U6): integrals
// with a parameter. Catalogue: docs/universite/A2-analyse-2.md,
// a2-param-int (fixed bounds: differentiate under ∫) and a2-param-int-bounds
// (Leibniz's rule), with the exam example E4.
//
// Parts and judges:
//   ∂f/∂t         `equiv` in (x, t), start pd(f, t)
//   F′(t)         `equiv` in t (x bound by ∫), target 'no-int' with the
//                 goal (no ∫, [F], d(…) left, terms collected): ∫ ∂f/∂t dx,
//                 [G]ₐᵇ, then the expression; start d(∫ f dx, t) when the
//                 student does it all (level 4), the rule of Leibniz then
//                 one line per term (upper bound, lower bound, integral)
//   F′(t₀)        `value` (form 'closed')
// cfg.leib = {noInt, sign, inner} names a wrong final line (rules/a2d.js).

import { parse } from '../../cas/parse.js';
import { toReadable } from '../../cas/print.js';
import { evalFloat } from '../../cas/numeric.js';
import { MT, linesItem, mcq, tfItem, examTag } from './kit.js';
import { modeOf, H, E, blanked, partsScript, fr, sup, A2_KEYS } from './a2-kit.js';
import { problemItem } from './kit-problem.js';

const K = { vars: ['x', 't'] };
const KT = { vars: ['t'] };
const KEYS = [...A2_KEYS, 'calc'];
const M = (s, display = false) => MT(s, K, display);
// t replaced by t₀ in a text.
// The value of a power of t at a whole t₀, as text: t^3 at 2 → 8.
const atNum = (s, t0) => String(Math.round(num(s, Number(t0))));
const atT = (s, t0) => s.replace(/ ?(?<![a-z])t(?![a-z])/g, (m, at) => {
  const before = s.slice(0, at).trimEnd().slice(-1);
  const v = String(t0).includes('/') ? `(${t0})` : String(t0);
  return /[\dπa-z)]/.test(before) ? `×${v}` : v;
});
const num = (s, t) => { try { return evalFloat(parse(s, K), { t }); } catch { return NaN; } };
const TS = [0.6, 1.1, 1.7];
// Two expressions of t that differ at the three test values (catalogue E4).
const differ = (a, b) => TS.every((t) => { const x = num(a, t); const y = num(b, t); return Number.isFinite(x) && Number.isFinite(y) && Math.abs(x - y) > 1e-6 * (1 + Math.abs(x)); });
// Options distinct at the three values of t, the right one first.
function distinctOptions(cands) {
  const out = [];
  for (const c of cands) {
    if (out.length >= 4 || !c.text) continue;
    if (out.some((o) => !differ(o.text, c.text))) continue;
    out.push(c);
  }
  return out.map((c) => ({ html: M(c.text), correct: !!c.correct, rule: c.rule || null }));
}
// A value of t where two expressions differ (a counter-example).
const witnessT = (a, b) => ['1', '2', '1/2', '3/2'].find((t) => { const v = Number(eval(t)); const x = num(a, v); const y = num(b, v); return Number.isFinite(x) && Number.isFinite(y) && Math.abs(x - y) > 1e-3; });
function vf(skill, statement, truth, rng, { key, why, ruleIfTrue = null, level = 4, exam = true }) {
  return mcq({
    skill, level, prompt: `Vrai ou faux ?<br>« ${statement} »`, keepOrder: true,
    options: [{ html: 'Vrai', correct: truth, rule: truth ? null : ruleIfTrue }, { html: 'Faux', correct: !truth }],
    key: `${skill}:tf:${key}`, solution: [{ html: why, note: '' }], expectedSec: 60, exam: exam ? { format: 'tf', points: 1 } : false,
  }, rng);
}

// ======================================================================
// a2-param-int
// ======================================================================

const PI = 'a2-param-int';
const PI_SUB = [
  { id: 'hyp', label: 'hypothèses : f et ∂f/∂t continues', skill: PI },
  { id: 'differentiate', label: 'dériver sous ∫ par rapport à t', skill: PI },
  { id: 'integrate', label: 'intégrer en x', skill: 'a1-int-direct' },
  { id: 'evaluate', label: 'évaluer en t₀', skill: PI },
];
const PI_CHOICES = [
  { id: 'dt', label: 'Dériver l\'intégrande par rapport à t (x fixé)' },
  { id: 'dx', label: 'Dériver l\'intégrande par rapport à x', rule: 'a2_leibniz_wrong_var', why: 'F dépend de t : x est la variable d\'intégration, on dérive en t.' },
  { id: 'prim', label: 'Primitive en x (t fixé)' },
  { id: 'eval', label: 'Évaluer entre les bornes et simplifier' },
  { id: 'value', label: 'Remplacer t par t₀' },
];

// f(x, t) on [a ; b]: ∂f/∂t, a primitive G of it in x, F′(t), F′(t₀) for
// the t₀ given, ∫ ∂f/∂x dx = f(b, t) − f(a, t) (a2_leibniz_wrong_var), and
// f(b, t) (the confusion F′ = f(b, t)).
const PI_DATA = [
  { f: 'arctan(t x)', a: '0', b: '1', df: 'x/(1+t^2x^2)', prim: 'ln(1+t^2x^2)/(2t^2)', Fp: 'ln(1+t^2)/(2t^2)', at: { 1: 'ln(2)/2', 2: 'ln(5)/8' }, wv: 'arctan(t)', fb: 'arctan(t)', how: 'u = 1 + t²x², du = 2t²x dx' },
  { f: 'x e^(-t x^2)', a: '0', b: '1', df: '-x^3 e^(-t x^2)', prim: '(t x^2+1)e^(-t x^2)/(2t^2)', Fp: '((t+1)e^(-t)-1)/(2t^2)', at: { 1: 'e^(-1)-1/2', 2: '(3e^(-2)-1)/8' }, wv: 'e^(-t)', fb: 'e^(-t)', how: 'par parties, après u = x²' },
  { f: 'ln(1+t x)', a: '0', b: '1', df: 'x/(1+t x)', prim: 'x/t-ln(1+t x)/t^2', Fp: '1/t-ln(1+t)/t^2', at: { 1: '1-ln(2)', 2: '1/2-ln(3)/4' }, wv: 'ln(1+t)', fb: 'ln(1+t)', how: 'x/(1 + tx) = 1/t − 1/(t(1 + tx))' },
  { f: 'sin(t x)/x', a: '0', b: '1', df: 'cos(t x)', prim: 'sin(t x)/t', Fp: 'sin(t)/t', at: { 1: 'sin(1)', 2: 'sin(2)/2' }, wv: 'sin(t)-t', fb: 'sin(t)', how: 'une primitive de cos(tx) en x est sin(tx)/t' },
  { f: 'sin(t x)/x', a: '0', b: 'π', df: 'cos(t x)', prim: 'sin(t x)/t', Fp: 'sin(π t)/t', at: { '1/2': '2', '3/2': '-2/3' }, wv: 'sin(π t)/π-t', fb: 'sin(π t)/π', how: 'une primitive de cos(tx) en x est sin(tx)/t' },
  { f: 'ln(t+x)', a: '0', b: '1', df: '1/(t+x)', prim: 'ln(t+x)', Fp: 'ln(t+1)-ln(t)', at: { 1: 'ln(2)', 2: 'ln(3)-ln(2)' }, wv: null, fb: 'ln(t+1)', how: 'une primitive de 1/(t + x) en x est ln(t + x)' },
  { f: 'ln(t+x)', a: '1', b: '2', df: '1/(t+x)', prim: 'ln(t+x)', Fp: 'ln(t+2)-ln(t+1)', at: { 1: 'ln(3)-ln(2)' }, wv: null, fb: 'ln(t+2)', how: 'une primitive de 1/(t + x) en x est ln(t + x)' },
  { f: 'e^(t x)', a: '0', b: '1', df: 'x e^(t x)', prim: 'x e^(t x)/t-e^(t x)/t^2', Fp: '((t-1)e^t+1)/t^2', at: { 1: '1', 2: '(e^2+1)/4' }, wv: 'e^t-1', fb: 'e^t', how: 'par parties : u = x, v′ = e^(tx)' },
];
// The catalogue's fallback: F(t) = ∫₀^π cos(tx) dx.
const PI_FALLBACK = { f: 'cos(t x)', a: '0', b: 'π', df: '-x sin(t x)', prim: 'x cos(t x)/t-sin(t x)/t^2', Fp: 'π cos(π t)/t-sin(π t)/t^2', at: { 1: '-π', 2: 'π/2' }, wv: 'cos(π t)-1', fb: 'cos(π t)', how: 'par parties : u = x, v′ = sin(tx)', fallback: true };

function piData(rng) {
  const d = rng.chance(0.06) ? PI_FALLBACK : rng.pick(PI_DATA);
  const t0 = rng.pick(Object.keys(d.at));
  return { ...d, fallback: false, t0, I: `int(${d.f},x,${d.a},${d.b})`, B: `bracket(${d.prim},x,${d.a},${d.b})` };
}
const interval = (d) => `[${fr(d.a)} ; ${fr(d.b)}]`;
const xDom = (d) => [Math.max(Number(d.a), 0) + 0.05, (d.b === 'π' ? Math.PI : Number(d.b)) - 0.05];
const dJudge = (d) => ({ kind: 'equiv', vars: ['x', 't'], domain: { x: xDom(d), t: [0.5, 2] }, target: 'no-prime' });
const tJudge = (goal, extra = {}) => ({ kind: 'equiv', vars: ['t'], domain: { t: [0.5, 2] }, target: 'no-int', goal, ...extra });
// The part F′(t₀): F′(t) with t₀ put in, then its value; when the two
// look the same (sin(2)/2), the part only asks the value.
const flat = (x) => x.replace(/[\s()×]/g, '');
const valueStart = (start, val) => (flat(start) === flat(val)
  ? { start: "F'", judge: { kind: 'value', expect: val, form: 'closed' } }
  : { start, judge: { kind: 'value', form: 'closed' } });
const t0Text = (t0) => fr(t0);

const hypDecision = (d) => ({
  kind: 'decision', prompt: 'Peut-on dériver sous le signe ∫ ?', options: [
    { id: 'yes', label: `Oui : f et ∂f/∂t sont continues sur ${interval(d)} × [1/2 ; 2]`, valid: true, ref: true },
    { id: 'cont', label: 'Oui : il suffit que f soit continue', valid: false, why: 'Il faut aussi ∂f/∂t continue. Avec f(x, t) = |t| (continue), F(t) = |t| n\'est pas dérivable en 0.' },
    { id: 'no', label: 'Non : les bornes ne dépendent pas de t', valid: false, why: 'Des bornes fixes simplifient : F′(t) = ∫ ∂f/∂t dx, sans terme de bord.' },
  ],
});

function piParts(d, level) {
  const diff = { start: `pd(${d.f},t)`, judge: dJudge(d), lines: [E(d.df, 'Dériver par rapport à t, x fixé', 'differentiate', 'dt')] };
  const integ = {
    html: `Intègre en x : F′(t) = ∫ ∂f/∂t dx sur ${interval(d)} (${d.how}).`, ask: 'F′(t) =', start: `int(${d.df},x,${d.a},${d.b})`, judge: tJudge(d.Fp),
    lines: [E(d.B, 'Primitive en x, t fixé', 'integrate', 'prim'), E(d.Fp, 'Évaluer entre les bornes', 'integrate', 'eval')],
  };
  const value = {
    html: `Calcule F′(${t0Text(d.t0)}) :`, ask: `F′(${t0Text(d.t0)}) =`, ...valueStart(atT(d.Fp, d.t0), d.at[d.t0]),
    lines: [E(d.at[d.t0], `t = ${t0Text(d.t0)}`, 'evaluate', 'value')],
  };
  if (level === 1) {
    diff.pre = [{ kind: 'note', html: `f(x, t) = ${M(d.f)} et ∂f/∂t sont continues sur ${interval(d)} × [1/2 ; 2] : on peut dériver sous ∫.` }];
    diff.lines = [blanked(diff.lines[0], [d.df.includes('/') ? d.df.split('/')[0] : d.df], K)];
    integ.lines = [blanked(integ.lines[0], [d.prim], K), integ.lines[1]];
    return [diff, integ];
  }
  if (level === 2) {
    diff.pre = [{ kind: 'note', html: `f et ∂f/∂t sont continues sur ${interval(d)} × [1/2 ; 2] : F′(t) = ∫ ∂f/∂t dx.` }];
    integ.lines = [blanked(integ.lines[0], [d.prim], K), integ.lines[1]];
    return [diff, integ, value];
  }
  if (level === 3) {
    diff.pre = [{
      kind: 'decision', prompt: 'Comment calcules-tu F′(t) ?', options: [
        { id: 'under', label: 'Dériver sous l\'intégrale, puis intégrer en x', valid: true, ref: true },
        { id: 'first', label: 'Calculer F(t), puis dériver', valid: true, quality: 'poor', why: 'Juste, mais une primitive de f en x est plus longue à trouver que celle de ∂f/∂t.' },
      ],
    }];
    return [diff, integ, value];
  }
  // Level 4: everything in one go from d/dt ∫ f dx, then F′(t₀).
  const chain = {
    start: `d(${d.I},t)`, judge: tJudge(d.Fp), pre: [hypDecision(d)],
    lines: [E(`int(${d.df},x,${d.a},${d.b})`, 'Dériver sous ∫', 'differentiate', 'dt'), ...integ.lines],
  };
  return [chain, value];
}

function piLines(level, rng, opts) {
  const d = piData(rng);
  const parts = piParts(d, level);
  const { start, judge, script } = partsScript(parts, level, PI_CHOICES);
  return linesItem({
    skill: PI, level, mode: modeOf(level), start, judge, script,
    prompt: `F(t) = ${M(d.I)} pour t ∈ [1/2 ; 2]. Dérive sous le signe ∫ pour trouver F′(t)${level >= 2 ? `, puis F′(${t0Text(d.t0)})` : ''}.`,
    hints: H('Dérive l\'intégrande par rapport à t (x reste fixe), puis intègre en x.',
      `∂f/∂t = ${M(d.df)} ; ∫ ${M(d.df)} dx : ${d.how}.`,
      `F′(t) = ${M(d.B)} = ${M(d.Fp)}`),
    subgoals: PI_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null, declares: K,
    key: `${PI}:${level}:${d.I}:${d.t0}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// Level 5: Feynman's trick, F(t) = ∫₀¹ (x^(at) − 1)/ln x dx or
// ∫₀¹ (x^t − x^b)/ln x dx: F′ then F from F(t₀) = 0.
function piFeynman(level, rng, opts) {
  const form = rng.pick(['a', 'a', 'b']);
  const k = rng.pick([1, 2, 3]);
  const at = k === 1 ? 't' : `${k}t`;
  const f = form === 'a' ? `(x^${k === 1 ? 't' : `(${at})`}-1)/ln(x)` : `(x^t-x${k === 1 ? '' : `^${k}`})/ln(x)`;
  const t0 = form === 'a' ? '0' : String(k);
  const df = form === 'a' ? (k === 1 ? 'x^t' : `${k}x^(${k}t)`) : 'x^t';
  const prim = form === 'a' ? `${k === 1 ? '' : k}x^(${at}+1)/(${at}+1)` : 'x^(t+1)/(t+1)';
  const Fp = form === 'a' ? `${k}/(${at}+1)` : '1/(t+1)';
  const Fs = form === 'a' ? `${k}/(${k === 1 ? 's' : `${k}s`}+1)` : '1/(s+1)';
  const G = form === 'a' ? `ln(${k === 1 ? 's' : `${k}s`}+1)` : 'ln(s+1)';
  const F = form === 'a' ? `ln(${at}+1)` : `ln(t+1)-ln(${k + 1})`;
  const I = `int(${f},x,0,1)`;
  const parts = [
    {
      start: `d(${I},t)`, judge: tJudge(Fp),
      pre: [{ kind: 'note', html: `f(x, t) = ${M(f)} se prolonge par continuité en x = 0 et x = 1, et ∂f/∂t = ${M(df)} est continue : on dérive sous ∫.` }],
      lines: [E(`int(${df},x,0,1)`, 'Dériver sous ∫ : le ln x se simplifie', 'differentiate', 'dt'), E(`bracket(${prim},x,0,1)`, 'Primitive en x', 'integrate', 'prim'), E(Fp, 'Évaluer', 'integrate', 'eval')],
    },
    {
      html: `F(${t0}) = 0 (l'intégrande est nul). Donc F(t) = F(${t0}) + ∫ de ${t0} à t de F′(s) ds :`, ask: 'F(t) =',
      start: `int(${Fs},s,${t0},t)`, judge: tJudge(F),
      lines: [E(`bracket(${G},s,${t0},t)`, 'Primitive', 'integrate', 'prim'), E(F, 'Évaluer', 'evaluate', 'eval')],
    },
  ];
  const { start, judge, script } = partsScript(parts, level, PI_CHOICES);
  return linesItem({
    skill: PI, level, mode: 'free', start, judge, script, noHints: true,
    prompt: `Astuce de Feynman : F(t) = ${M(I)} pour t ≥ 0. Calcule F′(t) en dérivant sous ∫, puis F(t) à l'aide de F(${t0}).`,
    hints: [], subgoals: PI_SUB, keys: KEYS, declares: K,
    key: `${PI}:5:${I}`, exam: examTag(opts),
  });
}

function piMcq(rng, level, opts) {
  // A draw where ∂f/∂x differs from ∂f/∂t (the trap's option exists).
  let d = piData(rng);
  for (let i = 0; i < 20 && !d.wv; i++) d = piData(rng);
  const options = distinctOptions([
    { text: d.Fp, correct: true },
    { text: d.wv, rule: 'a2_leibniz_wrong_var' },
    { text: d.fb },
    { text: `-(${d.Fp})` },
    { text: `2(${d.Fp})` },
  ]);
  return mcq({
    skill: PI, level, prompt: `Soit F(t) = ${M(d.I)} pour t ∈ [1/2 ; 2]. Alors F′(t) =`,
    options, key: `${PI}:mcq:${d.I}`, expectedSec: 180, exam: opts.exam ? { format: 'mcq', points: 1 } : false,
    solution: [{ html: `On dérive sous ∫ : ∂f/∂t = ${M(d.df)}, puis F′(t) = ${M(d.B)} = ${M(d.Fp)}.`, note: '' }],
    fallback: !!d.fallback,
  }, rng);
}

function piTf(rng, opts) {
  const kind = rng.pick(['cont', 'thm', 'wrongvar', 'wrongvar']);
  if (kind === 'cont') {
    return vf(PI, 'Si f est continue sur [0 ; 1] × ℝ, alors F(t) = ∫₀¹ f(x, t) dx est dérivable sur ℝ.', false, rng, {
      key: 'cont', why: 'Faux : il faut aussi ∂f/∂t continue. Avec f(x, t) = |t|, continue, F(t) = |t| n\'est pas dérivable en 0.',
    });
  }
  if (kind === 'thm') {
    return tfItem({
      skill: PI, level: 4, statement: 'Si f et ∂f/∂t sont continues sur [a ; b] × ]c ; d[, alors F(t) = ∫ₐᵇ f(x, t) dx est dérivable sur ]c ; d[ et F′(t) = ∫ₐᵇ ∂f/∂t(x, t) dx.',
      truth: true, key: 'thm', exam: { format: 'tf', points: 1 }, explanation: 'Vrai : c\'est le théorème de dérivation sous le signe ∫ (bornes fixes).',
    });
  }
  const d = { ...rng.pick(PI_DATA.filter((x) => x.wv)), t0: '1' };
  const I = `int(${d.f},x,${d.a},${d.b})`;
  const t = witnessT(d.Fp, d.wv);
  return tfItem({
    skill: PI, level: 4, statement: `Pour tout t ∈ ]0 ; 2], ${M(`d(${I},t)`)} = ${M(d.wv)}.`, truth: false,
    counter: { kind: 'refute', quants: [{ q: '∀', v: 't', dom: 'R+' }], pred: `${d.Fp}=${d.wv}`, ask: [{ v: 't', label: 't =' }], answer: { t } },
    ruleIfTrue: 'a2_leibniz_wrong_var', key: `wv:${I}`, exam: { format: 'tf', points: 1 },
    explanation: `Faux : ${M(d.wv)} = ∫ ∂f/∂x dx (dérivée en x). En dérivant en t : F′(t) = ${M(d.Fp)}, et les deux diffèrent en t = ${t}.`,
  });
}

function piItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return piMcq(rng, 4, opts);
  if (opts.exam === 'tf') return piTf(rng, opts);
  if (level === 5) return piFeynman(5, rng, opts);
  return piLines(level, rng, opts);
}

// ======================================================================
// a2-param-int-bounds
// ======================================================================

const PB = 'a2-param-int-bounds';
const PB_SUB = [
  { id: 'leibniz', label: 'règle de Leibniz à trois termes', skill: PB },
  { id: 'upper', label: 'borne du haut', skill: 'a1-ftc' },
  { id: 'lower', label: 'borne du bas', skill: 'a1-ftc' },
  { id: 'inner', label: 'intégrale de ∂f/∂t', skill: PI },
  { id: 'collect', label: 'regrouper', skill: 'rat-simplify' },
];
const PB_CHOICES = [
  { id: 'formula', label: 'Écrire les trois termes : f(b, t)·b′ − f(a, t)·a′ + ∫ ∂f/∂t dx' },
  { id: 'upper', label: 'Borne du haut : f(b(t), t)·b′(t)' },
  { id: 'lower', label: 'Borne du bas : f(a(t), t)·a′(t), retranché' },
  { id: 'inner', label: 'Intégrale de ∂f/∂t : dériver l\'intégrande en t' },
  { id: 'prim', label: 'Primitive en x, puis évaluer entre a(t) et b(t)' },
  { id: 'collect', label: 'Regrouper sur le dénominateur t' },
  { id: 'fbb', label: 'Borne du haut : f(b(t), t)·b(t)', why: 'On multiplie par la dérivée de la borne, b′(t), pas par b(t).' },
  { id: 'dfx', label: 'Intégrale de ∂f/∂x', rule: 'a2_leibniz_wrong_var', why: 'Le 3e terme dérive l\'intégrande par rapport au paramètre t.' },
];

// φ(u) = k0 + k1·g(u); f(x, t) = φ(tx)/x, ∂f/∂t = φ′(tx), a primitive in x.
const PHI = [
  { id: 'sin', k0: 0, k1: 1, g: (u) => `sin(${u})`, f: 'sin(t x)/x', df: 'cos(t x)', prim: 'sin(t x)/t' },
  { id: 'sin2', k0: 0, k1: 1, g: (u) => `sin(${u})^2`, f: 'sin(t x)^2/x', df: '2sin(t x)cos(t x)', prim: 'sin(t x)^2/t' },
  { id: 'cos', k0: 1, k1: -1, g: (u) => `cos(${u})`, f: '(1-cos(t x))/x', df: 'sin(t x)', prim: '-cos(t x)/t' },
  { id: 'exp', k0: 1, k1: -1, g: (u) => `e^(-${u.includes('+') || u.includes('-') ? `(${u})` : u})`, f: '(1-e^(-t x))/x', df: 'e^(-t x)', prim: '-e^(-t x)/t' },
];
// Bounds a(t), b(t), their derivatives, t·a and t·b, and cb = t·b′/b + 1,
// ca = t·a′/a + 1: F′(t) = (cb·φ(t·b) − ca·φ(t·a))/t.
const BOUNDS = [
  { a: 't', b: 't^2', da: '1', db: '2t', A: 't^2', B: 't^3', ca: 2, cb: 3 },
  { a: 't^2', b: 't', da: '2t', db: '1', A: 't^3', B: 't^2', ca: 3, cb: 2 },
  { a: 't', b: 't^3', da: '1', db: '3t^2', A: 't^2', B: 't^4', ca: 2, cb: 4 },
  { a: 't^2', b: 't^3', da: '2t', db: '3t^2', A: 't^3', B: 't^4', ca: 3, cb: 4 },
  { a: 't', b: '2t', da: '1', db: '2', A: 't^2', B: '2t^2', ca: 2, cb: 2 },
];

const cterm = (c, body) => (c === 1 ? body : c === -1 ? `-${body}` : `${c}${body}`);
// (c·φ(B) − e·φ(A))/den as text, collected: B, A the arguments (texts).
function lin(p, c, e, B, A, den = 't') {
  const k = (c - e) * p.k0;
  const gs = [];
  if (B === A) {
    if ((c - e) * p.k1) gs.push(cterm((c - e) * p.k1, p.g(B)));
  } else {
    if (c * p.k1) gs.push(cterm(c * p.k1, p.g(B)));
    if (-e * p.k1) gs.push(cterm(-e * p.k1, p.g(A)));
  }
  // The constant, then the positive terms: (2 + 2cos t² − 4cos t⁴)/t.
  gs.sort((x, y) => Number(x.startsWith('-')) - Number(y.startsWith('-')));
  const terms = [...(k ? [String(k)] : []), ...gs];
  const top = terms.reduce((s, x) => (s ? (x.startsWith('-') ? `${s}${x}` : `${s}+${x}`) : x), '') || '0';
  if (den === '1') return top;
  return terms.length > 1 ? `(${top})/${den}` : `${top}/${den}`;
}
const wrapP = (s) => (/[+-]/.test(s.replace(/^-/, '').replace(/\([^()]*\)/g, '')) ? `(${s})` : s);
const wrapD = (s) => (/^[a-z\d^]+$/.test(s) && !/^\d+[a-z]/.test(s) ? s : `(${s})`);

function pbData(rng) {
  const p = rng.pick(PHI);
  const bd = rng.pick(BOUNDS);
  return pbOf(p, bd);
}
function pbOf(p, bd, fallback = false) {
  const phiB = p.k0 ? `1-${p.g(bd.B)}` : p.g(bd.B);
  const phiA = p.k0 ? `1-${p.g(bd.A)}` : p.g(bd.A);
  const fB = `${wrapP(phiB)}/${wrapD(bd.b)}`;
  const fA = `${wrapP(phiA)}/${wrapD(bd.a)}`;
  const d = {
    p, bd, fallback,
    f: p.f, I: `int(${p.f},x,${bd.a},${bd.b})`,
    upRaw: `${fB}×${bd.db}`, lowRaw: `${fA}×${bd.da}`,
    up: lin(p, bd.cb - 1, 0, bd.B, bd.A), low: lin(p, bd.ca - 1, 0, bd.A, bd.A),
    innerInt: `int(pd(${p.f},t),x,${bd.a},${bd.b})`, innerDf: `int(${p.df},x,${bd.a},${bd.b})`,
    innerB: `bracket(${p.prim},x,${bd.a},${bd.b})`, inner: lin(p, 1, 1, bd.B, bd.A),
    final: lin(p, bd.cb, bd.ca, bd.B, bd.A),
    noInt: lin(p, bd.cb - 1, bd.ca - 1, bd.B, bd.A),
    sign: lin(p, bd.cb, 2 - bd.ca, bd.B, bd.A),
  };
  // a1_ftc_no_chain: f(b, t) − f(a, t) + the integral (no b′, a′).
  if (bd.a === 't') d.noChain = `${fB}+${lin(p, 1, 2, bd.B, bd.A)}`;
  else if (bd.b === 't') d.noChain = `${lin(p, 2, 1, bd.B, bd.A)}-${fA}`;
  else d.noChain = `${fB}-${fA}+${d.inner}`;
  d.formula = `${d.upRaw}-${d.lowRaw}+${d.innerInt}`;
  d.leib = { noInt: d.noInt, sign: d.sign, inner: d.inner };
  return d;
}
// The catalogue's fallback (2020 Q5) and the example E4.
const PB_FALLBACK = () => pbOf(PHI[3], BOUNDS[0], true);
const E4 = () => pbOf(PHI[2], BOUNDS[2]);

const bJudge = (goal, d, leib = false) => ({ kind: 'equiv', vars: ['t'], domain: { t: [0.3, 2] }, target: 'no-int', goal, ...(leib ? { leib: d.leib } : {}) });
const hypB = (d) => ({
  kind: 'decision', prompt: 'Peut-on appliquer la règle de Leibniz pour t > 0 ?', options: [
    { id: 'yes', label: `Oui : f(x, t) = ${toReadable(parse(d.f, K))} et ∂f/∂t sont continues pour x > 0, et les bornes sont dérivables et > 0`, valid: true, ref: true },
    { id: 'no', label: 'Non : les bornes dépendent de t', valid: false, why: 'Des bornes dérivables sont permises : elles donnent les deux termes de bord.' },
  ],
});

// The parts: formula, upper bound, lower bound, integral, sum (and F′(t₀)).
function pbParts(d, level, { value = null } = {}) {
  const { bd } = d;
  const formula = {
    start: `d(${d.I},t)`, judge: { ...bJudge(d.final, d, true), target: 'any' },
    lines: [E(d.formula, 'f(b, t)·b′ − f(a, t)·a′ + ∫ ∂f/∂t dx', 'leibniz', 'formula')],
  };
  const upper = {
    html: `Borne du haut : f(${sup(bd.b)}, t)·(${sup(bd.b)})′ =`, ask: '=', start: d.upRaw, judge: bJudge(d.up, d),
    lines: [E(d.up, 'Simplifier', 'upper', 'upper')],
  };
  const lower = {
    html: `Borne du bas : f(${sup(bd.a)}, t)·(${sup(bd.a)})′ =`, ask: '=', start: d.lowRaw, judge: bJudge(d.low, d),
    lines: [E(d.low, 'Simplifier', 'lower', 'lower')],
  };
  const inner = {
    html: `Intégrale : ∫ de ${sup(bd.a)} à ${sup(bd.b)} de ∂f/∂t dx =`, ask: '=', start: d.innerInt, judge: bJudge(d.inner, d),
    lines: [E(d.innerDf, `∂f/∂t = ${toReadable(parse(d.p.df, K))}`, 'inner', 'inner'), E(d.innerB, 'Primitive en x', 'inner', 'prim'), E(d.inner, 'Évaluer entre les bornes', 'inner', 'prim')],
  };
  const sum = {
    html: 'Somme des trois termes (le terme du bas est retranché) :', ask: 'F′(t) =', start: `${d.up}-${d.low}+${d.inner}`, judge: bJudge(d.final, d, true),
    lines: [E(d.final, 'Regrouper sur t', 'collect', 'collect')],
  };
  const parts = [formula, upper, lower, inner, sum];
  if (value) {
    parts.push({
      html: `Calcule F′(${value}) :`, ask: `F′(${value}) =`, ...valueStart(atT(d.final, value), lin(d.p, d.bd.cb, d.bd.ca, atNum(d.bd.B, value), atNum(d.bd.A, value), value)),
      lines: [E(lin(d.p, d.bd.cb, d.bd.ca, atNum(d.bd.B, value), atNum(d.bd.A, value), value), `t = ${value}`, null, 'value')],
    });
  }
  if (level === 1) {
    formula.lines = [blanked(formula.lines[0], [...(['1', '2'].includes(bd.db) ? [] : [bd.db]), `pd(${d.f},t)`], KT)];
    upper.lines = [blanked(upper.lines[0], [bd.B], KT)];
    lower.lines = [blanked(lower.lines[0], [bd.A], KT)];
    inner.lines = [inner.lines[0], blanked(inner.lines[1], [d.p.prim], K), inner.lines[2]];
  }
  if (level === 2) inner.lines = [inner.lines[0], blanked(inner.lines[1], [d.p.prim], K), inner.lines[2]];
  return parts;
}

function pbLines(level, rng, opts) {
  const d = pbData(rng);
  const { bd } = d;
  let parts;
  if (level <= 3) parts = pbParts(d, level);
  else {
    parts = [{
      start: `d(${d.I},t)`, judge: bJudge(d.final, d, true), pre: [hypB(d)],
      lines: [
        E(d.formula, 'Règle de Leibniz : trois termes', 'leibniz', 'formula'),
        E(`${d.up}-${d.low}+${d.innerDf}`, 'Bornes simplifiées ; ∂f/∂t', 'upper', 'upper'),
        E(`${d.up}-${d.low}+${d.innerB}`, 'Primitive en x', 'inner', 'prim'),
        E(`${d.up}-${d.low}+${d.inner}`, 'Évaluer entre les bornes', 'inner', 'prim'),
        E(d.final, 'Regrouper sur t', 'collect', 'collect'),
      ],
    }];
  }
  const { start, judge, script } = partsScript(parts, level, PB_CHOICES);
  return linesItem({
    skill: PB, level, mode: modeOf(level), start, judge, script,
    prompt: `F(t) = ${M(d.I)} pour t > 0. Calcule F′(t) par la règle de Leibniz${level === 1 ? ' : F′(t) = f(b(t), t)·b′(t) − f(a(t), t)·a′(t) + ∫ ∂f/∂t dx' : ''}.`,
    hints: H('Trois termes : borne du haut, borne du bas (retranchée), et l\'intégrale de la dérivée en t.',
      `Borne du haut : f(${sup(bd.b)}, t)·(${sup(bd.b)})′ = ${M(d.upRaw)} ; ∂f/∂t = ${M(d.p.df)}.`,
      `F′(t) = ${M(d.formula)}`),
    subgoals: PB_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null, declares: K,
    key: `${PB}:${level}:${d.I}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// Level 5: the exam example E4 (8 points), drawn like the others; the
// catalogue's own example one time in four.
function pbProblem(level, rng, opts) {
  const d = rng.chance(0.25) ? E4() : pbData(rng);
  const parts = pbParts(d, 4, { value: '1' });
  parts[0].pre = [hypB(d)];
  const { start, judge, script } = partsScript(parts, 4, PB_CHOICES);
  const item = linesItem({
    skill: PB, level, mode: 'free', start, judge, script, noHints: true,
    prompt: `Soit F(t) = ${M(d.I)} pour t > 0. Calcule F′(t) (hypothèses, formule, puis chaque terme), puis F′(1).`,
    hints: [], subgoals: PB_SUB, keys: KEYS, declares: K,
    key: `${PB}:e4:${d.I}`, fallback: !!d.fallback,
  });
  return problemItem({
    skill: PB, level, prompt: item.prompt, parts: [{ item, points: [1, 2, 1, 2, 1, 1], title: 'Hypothèses et formule' }],
    key: `e4:${d.I}`, exam: opts.exam === 'open' ? { format: 'open', points: 8 } : false, expectedSec: 900,
  });
}

function pbMcq(rng, level, opts) {
  const d = pbData(rng);
  const options = distinctOptions([
    { text: d.final, correct: true },
    { text: d.noInt, rule: 'a2_leibniz_no_integral' },
    { text: d.noChain, rule: 'a1_ftc_no_chain' },
    { text: d.sign, rule: 'a2_leibniz_sign' },
    { text: `-${wrapP(d.final)}` },
    { text: d.up },
  ]);
  return mcq({
    skill: PB, level, prompt: `Soit F(t) = ${M(d.I)} pour t > 0. Alors F′(t) =`,
    options, key: `${PB}:mcq:${d.I}`, expectedSec: 240, exam: opts.exam ? { format: 'mcq', points: 1 } : false,
    solution: [{ html: `F′(t) = ${M(d.upRaw)} − ${M(d.lowRaw)} + ${M(d.innerDf)} = ${M(d.up)} − ${M(d.low)} + ${M(d.inner)} = ${M(d.final)}.`, note: '' }],
    fallback: !!d.fallback,
  }, rng);
}

// « F′(t₀) vaut » (2019 Q7): a single value, in closed form.
function pbCoef(rng, opts) {
  const d = pbData(rng);
  const t0 = rng.pick(['1', '2']);
  const value = lin(d.p, d.bd.cb, d.bd.ca, atNum(d.bd.B, t0), atNum(d.bd.A, t0), t0);
  const item = linesItem({
    skill: PB, level: 4, mode: 'free', prompt: `Soit F(t) = ${M(d.I)} pour t > 0. F′(${t0}) vaut :`,
    start: "F'", judge: { kind: 'value', expect: value, form: 'closed' },
    script: [E(value, `F′(t) = ${toReadable(parse(d.final, KT))}`, 'collect', 'value')],
    hints: [], noHints: true, subgoals: PB_SUB, keys: KEYS,
    key: `${PB}:coef:${d.I}:${t0}`, exam: { format: 'coef', points: 1 }, fallback: !!d.fallback, expectedSec: 240,
    baits: ['a2_leibniz_no_integral', 'a2_leibniz_sign'],
  });
  item.final = { form: 'any', askCoef: { label: `F′(${t0})` } };
  return item;
}

function pbTf(rng, opts) {
  const kind = rng.pick(['thm', 'noInt', 'sign', 'chain']);
  if (kind === 'thm') {
    return tfItem({
      skill: PB, level: 4, statement: 'Si f est continue sur ℝ et F(t) = ∫₀ᵗ f(x) dx, alors F est dérivable et F′(t) = f(t).',
      truth: true, key: 'thm', exam: { format: 'tf', points: 1 }, explanation: 'Vrai : c\'est le théorème fondamental ; la règle de Leibniz avec b(t) = t et f sans t.',
    });
  }
  const d = pbData(rng);
  const wrong = d[kind === 'chain' ? 'noChain' : kind];
  const t = witnessT(d.final, wrong);
  const rule = { noInt: 'a2_leibniz_no_integral', sign: 'a2_leibniz_sign', chain: 'a1_ftc_no_chain' }[kind];
  return tfItem({
    skill: PB, level: 4, statement: `Pour tout t ∈ ]0 ; 2], ${M(`d(${d.I},t)`)} = ${M(wrong)}.`, truth: false,
    counter: { kind: 'refute', quants: [{ q: '∀', v: 't', dom: 'R+' }], pred: `${d.final}=${wrong}`, ask: [{ v: 't', label: 't =' }], answer: { t } },
    ruleIfTrue: rule, key: `${kind}:${d.I}`, exam: { format: 'tf', points: 1 },
    explanation: `Faux : F′(t) = ${M(d.final)} (trois termes : ${M(d.up)}, −${M(wrapP(d.low))} et ${M(d.inner)}). En t = ${t}, les deux membres diffèrent.`,
  });
}

function pbItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return pbMcq(rng, 4, opts);
  if (opts.exam === 'tf') return pbTf(rng, opts);
  if (opts.exam === 'coef') return pbCoef(rng, opts);
  if (level === 5) return pbProblem(5, rng, opts);
  return pbLines(level, rng, opts);
}

export const GEN = {
  [PI]: (level, rng, profile, opts = {}) => piItem(level, rng, opts),
  [PB]: (level, rng, profile, opts = {}) => pbItem(level, rng, opts),
};

// For the tests: every draw of a2-param-int-bounds, and the fixed-bound table.
export const ALL_PB = () => PHI.flatMap((p) => BOUNDS.map((bd) => pbOf(p, bd)));
export { PI_DATA, PI_FALLBACK, E4, PB_FALLBACK };

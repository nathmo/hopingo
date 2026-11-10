// Generators of module A1, part a (unit `analyse1`, step U2), spec §8.3.
// Catalogue: docs/universite/A1-analyse-1.md, « Dérivées ». Skills:
// js/content/uni/analyse1-a.skills.js. This file: the derivative by the
// definition and the BA1 rules; analyse1-a-inv.js: inverse functions and
// logarithmic derivatives; analyse1-a-c1.js: C¹, piecewise functions.
//
// Levels: 1–2 guided (lines with boxes, a decision at level 2), 3 « choose
// the action, then write the line » (a menu per reference line), 4 free
// lines with hints, 5 alone. Limits of difference quotients are judged by
// `limit` (v = h; the numeric fallback of js/cas/limit.js decides
// h·sin(1/h)), derivatives by `equiv`, numbers by `value`.
// opts.exam = 'mcq' | 'tf' | 'open' gives the exam variants.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { deriv, stripParen } from '../../cas/ast.js';
import { stepDeriv } from '../../cas/diff.js';
import { pretty, exactValue } from '../../cas/normal.js';
import { equivalent, seedOf } from '../../cas/equiv.js';
import { expandDerivs } from '../../cas/diff.js';
import { trapAnswers } from '../../judges/diagnose.js';
import { isFinal as equivFinal } from '../../judges/equiv.js';
import { MT, MM, linesItem, mcq, tfItem } from './kit.js';
import { N, modeOf, H, E, examOf, uniqOptions, blanked, boxed, withMenus, segment, frN } from './analyse1-a-kit.js';
import { GEN as INV } from './analyse1-a-inv.js';
import { GEN as C1 } from './analyse1-a-c1.js';
import { stubGen } from './stub.js';
import { SKILLS } from './analyse1-a.skills.js';

// A true/false question as a two-option multiple choice (the statement is
// about one function: no counter-example to type).
export function vfMcq(skill, statement, truth, rule, why, rng, key) {
  return mcq({
    skill, level: 4, prompt: `Vrai ou faux ?<br>« ${statement} »`, keepOrder: true,
    options: [{ html: 'Vrai', correct: truth, rule: truth ? null : rule }, { html: 'Faux', correct: !truth, rule: truth ? rule : null }],
    key: `tf:${key}`, exam: { format: 'tf', points: 1 }, expectedSec: 60, solution: [{ html: why, note: '' }],
  }, rng);
}

// ======================================================================
// a1-deriv-def
// ======================================================================

const DEF = 'a1-deriv-def';
const DEF_SUB = {
  deriv: { id: 'deriv', label: 'taux d\'accroissement', skill: DEF },
  squeeze: { id: 'squeeze', label: 'gendarmes', skill: 'a1-seq-squeeze' },
  sides: { id: 'sides', label: 'limites à gauche et à droite', skill: 'a1-fn-onesided' },
};
const DEF_CHOICES = [
  { id: 'simplify', label: 'Simplifier le taux d\'accroissement' },
  { id: 'squeeze', label: 'Gendarmes : majorer la partie bornée' },
  { id: 'equiv', label: 'Remplacer par un équivalent (eᵘ − 1 ~ u, sin u ~ u)' },
  { id: 'conclude', label: 'Conclure : calculer la limite' },
  { id: 'formula', label: 'Dériver la formule de f, puis remplacer x par 0', rule: 'a1_derivable_from_formula', why: 'La formule de f′ ne vaut pas en 0 : en 0, on passe par le taux d\'accroissement.' },
];
const LIMIT = (dir) => ({ kind: 'limit', v: 'h', to: '0', ...(dir ? { dir } : {}) });
const KEYS = ['calcx', 'calcfn', 'anal'];
const sub = (t, from, to) => t.replace(new RegExp(from, 'g'), to);
const hx = (t) => sub(t, 'x', 'h');
const Tname = (T) => T;

// An oscillating function c·x + xᵖ·T(1/x), f(0) = 0.
function oscData(rng) {
  const p = rng.pick([2, 3]);
  const c = rng.chance(0.5) ? 0 : rng.int(1, 5);
  // h·cos(1/h) alone is not decided by the numeric fallback of
  // js/cas/limit.js (h·sin(1/h) and 3 + h·cos(1/h) are).
  const T = c === 0 && p === 2 ? 'sin' : rng.pick(['sin', 'cos']);
  const osc = `x^${p}×${T}(1/x)`;
  const f = c ? `${c === 1 ? '' : c}x+${osc}` : osc;
  const rest = `${p === 2 ? 'h' : 'h^2'}×${T}(1/h)`;
  return {
    kind: 'osc', c, p, T, f, x0: '0', start: `(${hx(f)})/h`,
    lines: [
      E(c ? `${c}+${rest}` : rest, 'Simplifier par h', 'deriv', 'simplify'),
      E(String(c), `Gendarmes : |${p === 2 ? 'h' : 'h²'}·${T}(1/h)| ≤ ${p === 2 ? '|h|' : 'h²'} → 0`, 'squeeze', 'squeeze'),
    ],
    holes: [[p === 2 ? 'h' : 'h^2'], [rest]],
    fShow: `${MT(f)} si x ≠ 0, et f(0) = 0`,
    hint1: 'Écris (f(0 + h) − f(0))/h, simplifie par h, puis encadre la partie bornée.',
  };
}

// x|x|, |x|·x², |x|³, c·x + x|x|: one formula on both sides.
function absData(rng) {
  const k = rng.int(0, 3);
  const c = k === 3 ? rng.int(1, 5) : 0;
  const D = [
    { f: 'x×|x|', start: '(h×|h|)/h', S: '|h|' },
    { f: '|x|×x^2', start: '(|h|×h^2)/h', S: '|h|×h' },
    { f: '|x|^3', start: '|h|^3/h', S: 'h×|h|' },
    { f: `${c === 1 ? '' : c}x+x×|x|`, start: `(${c === 1 ? '' : c}h+h×|h|)/h`, S: `${c}+|h|` },
  ][k];
  return {
    kind: 'abs', c, f: D.f, x0: '0', start: D.start,
    lines: [E(D.S, 'Simplifier par h', 'deriv', 'simplify'), E(String(c), '|h| → 0', 'deriv', 'conclude')],
    holes: [[k === 3 ? '|h|' : D.S.includes('×') ? 'h' : '|h|'], [D.S]],
    fShow: MT(D.f),
    hint1: 'Écris (f(0 + h) − f(0))/h et simplifie par h : |h| reste, et |h| → 0.',
  };
}

// A piece through 0 with slope a at 0, written in x: [text, lines from (g(h))/h].
function piece(rng, a) {
  const kind = rng.int(0, 2);
  if (kind === 0) {
    const b = rng.pick([-3, -2, -1, 1, 2, 3]);
    const g = `${a === 1 ? '' : a === -1 ? '-' : a}x${b > 0 ? '+' : '-'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x^2`;
    const S = `${a}${b > 0 ? '+' : '-'}${Math.abs(b) === 1 ? '' : Math.abs(b)}h`;
    return { g, start: `(${hx(g)})/h`, lines: [E(S, 'Simplifier par h', 'deriv', 'simplify'), E(String(a), 'h → 0', 'sides', 'conclude')], hole: String(a) };
  }
  const k = a === 1 ? '' : a === -1 ? '-' : String(a);
  const g = kind === 1 ? (a === 1 ? 'e^x-1' : `e^(${k}x)-1`) : `sin(${k}x)`;
  return { g, start: `(${hx(g)})/h`, lines: [E(String(a), kind === 1 ? `eᵘ − 1 ~ u avec u = ${MT(`${k}h`)}` : `sin u ~ u avec u = ${MT(`${k}h`)}`, 'sides', 'equiv')], hole: null };
}

function sidesData(rng) {
  const a = rng.pick([-3, -2, -1, 1, 2, 3, 4]);
  const same = rng.chance(0.5);
  let b = a;
  while (!same && b === a) b = rng.pick([-3, -2, -1, 1, 2, 3, 4]);
  const R = piece(rng, a);
  let L = piece(rng, b);
  for (let i = 0; i < 10 && L.g === R.g; i++) L = piece(rng, b);
  return {
    kind: 'sides', a, b, R, L, x0: '0',
    fShow: `${MT(R.g)} si x ≥ 0, et ${MT(L.g)} si x < 0`,
    hint1: 'Deux formules : calcule la dérivée à droite (h > 0) avec le morceau de droite, puis la dérivée à gauche (h < 0) avec celui de gauche.',
  };
}

function defLines(level, rng, opts) {
  const pickKind = rng.pick(['osc', 'osc', 'abs', 'sides']);
  const d = pickKind === 'osc' ? oscData(rng) : pickKind === 'abs' ? absData(rng) : sidesData(rng);
  const mode = modeOf(level);
  const decision = level === 2 ? {
    kind: 'decision', prompt: 'Comment trouver la limite du taux ?', options: [
      { id: 'squeeze', label: 'Simplifier, puis gendarmes : la partie bornée est multipliée par une quantité qui tend vers 0', valid: d.kind === 'osc', why: 'Il n\'y a pas de partie bornée qui oscille ici.' },
      { id: 'direct', label: 'Simplifier par h (ou un équivalent), puis passer à la limite', valid: d.kind !== 'osc', why: 'Après simplification, il reste une partie qui oscille : il faut l\'encadrer.' },
      { id: 'bounded', label: '0 × (borné) est une forme indéterminée : la limite n\'existe pas', valid: false, rule: 'a1_bounded_times_zero', why: '0 × (borné) n\'est pas indéterminé : le produit tend vers 0.' },
      { id: 'formula', label: 'Dériver la formule de f, puis remplacer x par 0', valid: false, rule: 'a1_derivable_from_formula', why: 'La formule de f′(x) ne vaut que pour x ≠ 0 : en 0, on passe par le taux d\'accroissement.' },
    ],
  } : null;
  const prompt = d.kind === 'sides'
    ? `Soit f(x) = ${d.fShow}. Calcule les dérivées à droite et à gauche de f en 0 par la définition, puis conclus.`
    : rng.pick([
      `Soit f(x) = ${d.fShow}. Calcule f′(0) par la définition.`,
      `Soit f(x) = ${d.fShow}. Montre avec le taux d'accroissement que f est dérivable en 0, et donne f′(0).`,
    ]);
  const key = `${DEF}:${d.kind}:${d.f ?? `${d.R.g}|${d.L.g}`}:${level}`;
  if (d.kind !== 'sides') {
    const lines = d.lines;
    const script = level === 1
      ? [blanked(lines[0], d.holes[0]), lines[1]]
      : level === 2 ? [decision, blanked(lines[0], d.holes[1]), lines[1]] : lines;
    const subs = [DEF_SUB.deriv, ...(d.kind === 'osc' ? [DEF_SUB.squeeze] : [])];
    return linesItem({
      skill: DEF, level, prompt, start: d.start, judge: withMenus(LIMIT(), level, d.start, lines, DEF_CHOICES),
      mode, script, keys: KEYS, subgoals: subs, tapActions: level === 3 ? 'steps' : null,
      hints: H(d.hint1, `= ${boxed(blanked(lines[0], d.holes[0]))}`, `${MT(lines[0].math)}, puis ${MT(lines[1].math)} : f′(0) = ${frN(d.c)}`),
      key, exam: examOf(opts),
    });
  }
  // Two sides, then the conclusion.
  const { R, L, a, b } = d;
  const ok = a === b;
  const concl = ok ? E(String(a), `f′(0⁺) = f′(0⁻) = ${frN(a)}`, 'deriv', 'conclude') : E(String(a - b), `f′(0⁺) − f′(0⁻) = ${frN(a - b)} ≠ 0 : point anguleux`, 'deriv', 'conclude');
  const choose = {
    kind: 'decision', prompt: 'f est-elle dérivable en 0 ?', options: [
      { id: 'yes', label: `Oui : les deux dérivées latérales valent ${frN(a)}`, valid: ok, why: 'Les deux dérivées latérales ne sont pas égales.' },
      { id: 'no', label: 'Non : les dérivées à gauche et à droite sont différentes', valid: !ok, why: 'Les deux dérivées latérales sont égales : f est dérivable en 0.' },
      ...(ok ? [] : [{ id: 'mean', label: `Oui, et f′(0) = ${frN(new Q(a + b, 2))}, la moyenne des deux pentes`, valid: false, rule: 'a1_corner_missed', why: 'Deux pentes différentes : point anguleux, pas de dérivée.' }]),
    ],
  };
  const rLines = R.lines.map((l) => ({ ...l }));
  const lLines = L.lines.map((l) => ({ ...l }));
  const hole = (ls, p) => (level === 1 && p.hole && ls.length > 1 ? [blanked(ls[0], [p.hole]), ls[1]] : ls);
  const segR = withMenus(LIMIT('+'), level, R.start, rLines, DEF_CHOICES);
  const segL = withMenus(LIMIT('-'), level, L.start, lLines, DEF_CHOICES);
  const valStart = ok ? 'f\'(0)' : 'f\'(0⁺)-f\'(0⁻)';
  const valJ = withMenus({ kind: 'value', expect: String(ok ? a : a - b) }, level, valStart, [concl], DEF_CHOICES);
  const script = [
    ...hole(rLines, R),
    segment('Dérivée à gauche : h < 0, avec le morceau de gauche.', null, L.start, segL),
    ...hole(lLines, L),
    segment('Conclusion.', ok ? 'f′(0) =' : 'f′(0⁺) − f′(0⁻) =', valStart, valJ),
    ...(level <= 2 || level === 3 ? [choose] : []),
    concl,
  ];
  return linesItem({
    skill: DEF, level, prompt, start: R.start, judge: segR, mode, script, keys: KEYS,
    subgoals: [DEF_SUB.deriv, DEF_SUB.sides], tapActions: level === 3 ? 'steps' : null,
    hints: H(d.hint1, `f′(0⁺) = lim ${MT(R.start)} = ${MT(R.lines[0].math)}…`, `f′(0⁺) = ${frN(a)}, f′(0⁻) = ${frN(b)} : ${ok ? `f′(0) = ${frN(a)}` : 'pas dérivable en 0'}.`),
    key, exam: examOf(opts),
  });
}

// The level 5 and exam multiple choice: what can be said of f at 0.
const S_DER = (v) => `f est dérivable en 0 et f′(0) = ${frN(v)}`;
function defMcq(rng, opts = {}) {
  const k = rng.int(0, 5);
  let f;
  let options;
  let why;
  if (k === 0 || k === 1) {
    const T = rng.pick(['sin', 'cos']);
    const p = k === 0 ? 2 : 3;
    f = `x^${p}×${T}(1/x)`;
    const fp = p === 2
      ? (T === 'sin' ? '2x×sin(1/x)-cos(1/x)' : '2x×cos(1/x)+sin(1/x)')
      : (T === 'sin' ? '3x^2×sin(1/x)-x×cos(1/x)' : '3x^2×cos(1/x)+x×sin(1/x)');
    options = p === 2 ? [
      { html: 'f est dérivable sur ℝ et f′(0) = 0, mais f′ n\'est pas continue en 0', correct: true },
      { html: `f n'est pas dérivable en 0, car f′(x) = ${MT(fp)} n'a pas de limite en 0`, correct: false, rule: 'a1_derivable_from_formula' },
      { html: 'f est de classe C¹ sur ℝ, car elle est dérivable sur ℝ', correct: false, rule: 'a1_c1_def_missing_cont' },
      { html: `f n'est pas continue en 0, car ${T}(1/x) n'a pas de limite en 0`, correct: false, rule: 'a1_bounded_times_zero' },
    ] : [
      { html: 'f est de classe C¹ sur ℝ et f′(0) = 0', correct: true },
      { html: `f n'est pas dérivable en 0, car la formule f′(x) = ${MT(fp)} n'a pas de sens en 0`, correct: false, rule: 'a1_derivable_from_formula' },
      { html: 'f est dérivable en 0, mais f′ n\'est pas continue en 0', correct: false },
      { html: `f n'est pas continue en 0, car ${T}(1/x) n'a pas de limite en 0`, correct: false, rule: 'a1_bounded_times_zero' },
    ];
    why = p === 2
      ? `(f(h) − f(0))/h = h·${T}(1/h) → 0 (gendarmes) : f′(0) = 0. Pour x ≠ 0, f′(x) = ${MT(fp)} n'a pas de limite en 0 : f′ n'est pas continue en 0.`
      : `(f(h) − f(0))/h = h²·${T}(1/h) → 0 : f′(0) = 0. Et f′(x) = ${MT(fp)} → 0 = f′(0) : f′ est continue.`;
  } else if (k === 2) {
    const T = rng.pick(['sin', 'cos']);
    f = `x×${T}(1/x)`;
    options = [
      { html: 'f est continue en 0, mais pas dérivable en 0', correct: true },
      { html: `f n'est pas continue en 0, car ${T}(1/x) n'a pas de limite en 0`, correct: false, rule: 'a1_bounded_times_zero' },
      { html: S_DER(0), correct: false },
      { html: 'f est dérivable à droite en 0 seulement', correct: false },
    ];
    why = `|x·${T}(1/x)| ≤ |x| → 0 : f est continue en 0. Mais (f(h) − f(0))/h = ${T}(1/h) n'a pas de limite : f n'est pas dérivable en 0.`;
  } else if (k === 3) {
    const a = rng.pick([1, 2, 3]);
    const b = rng.pick([-2, -1, 0].filter((x) => x !== a));
    const R = `${a === 1 ? '' : a}x+x^2`;
    const L = b === 0 ? 'x^2' : `sin(${b === -1 ? '-' : b}x)`;
    f = `${R}|${L}`;
    options = [
      { html: `f n'est pas dérivable en 0 : f′(0⁺) = ${frN(a)} et f′(0⁻) = ${frN(b)}`, correct: true },
      { html: S_DER(new Q(a + b, 2)), correct: false, rule: 'a1_corner_missed' },
      { html: S_DER(a), correct: false, rule: 'a1_corner_missed' },
      { html: 'f n\'est pas continue en 0', correct: false },
    ];
    const show = `${MT(R)} si x ≥ 0, et ${MT(L)} si x < 0`;
    why = `À droite, (h² + ${a === 1 ? '' : a}h)/h → ${a} ; à gauche, ${MT(hx(L))}/h → ${frN(b)}. Les deux pentes sont différentes : point anguleux.`;
    return mcqOut(`Soit f(x) = ${show}. Que peut-on dire de f en 0 ?`, options, why, f, rng, opts);
  } else if (k === 4) {
    f = 'x×sin(e^(1/x)-1)';
    options = [
      { html: 'f est dérivable à gauche en 0, mais pas à droite', correct: true },
      { html: 'f est dérivable en 0', correct: false, rule: 'a1_corner_missed' },
      { html: 'f est dérivable à droite en 0, mais pas à gauche', correct: false },
      { html: 'f n\'est dérivable ni à gauche ni à droite en 0', correct: false, rule: 'a1_derivable_from_formula' },
    ];
    why = 'Le taux vaut sin(e^(1/h) − 1). Pour h → 0⁻, e^(1/h) → 0 et le taux tend vers sin(−1) : f′(0⁻) = −sin 1. Pour h → 0⁺, e^(1/h) → +∞ et le sinus oscille : pas de dérivée à droite.';
  } else {
    const p = rng.pick(['1/2', '2/3', '6/5', '3/2']);
    f = `|x|^(${p})×ln(|x|)`;
    const big = p === '6/5' || p === '3/2';
    options = [
      { html: S_DER(0), correct: big },
      { html: 'f n\'est pas dérivable en 0 : le taux tend vers +∞ d\'un côté et −∞ de l\'autre', correct: !big },
      { html: 'f n\'est pas dérivable en 0, car Log|x| → −∞', correct: false, rule: 'a1_derivable_from_formula' },
      { html: 'f n\'est pas continue en 0', correct: false },
    ];
    why = `Le taux vaut |h|^(${p})·Log|h|/h, de valeur absolue |h|^(${p} − 1)·|Log|h||. ${big ? 'L\'exposant est > 0 : les puissances l\'emportent sur le logarithme, le taux tend vers 0.' : 'L\'exposant est < 0 : le taux tend vers −∞ à droite et +∞ à gauche.'}`;
    return mcqOut(`Soit f(x) = ${MT(f)} si x ≠ 0, et f(0) = 0. Que peut-on dire de f en 0 ?`, options, why, f, rng, opts);
  }
  return mcqOut(`Soit f(x) = ${MT(f)} si x ≠ 0, et f(0) = 0. Que peut-on dire de f en 0 ?`, options, why, f, rng, opts);
}
function mcqOut(prompt, options, why, f, rng, opts) {
  return mcq({
    skill: DEF, level: opts.exam ? 4 : 5, prompt, options, key: `mcq:${f}`, exam: examOf(opts, 2), expectedSec: 240,
    solution: [{ html: why, note: '' }],
  }, rng);
}

const DEF_TF = [
  { s: 'Si f est dérivable en x₀, alors lim_{h→0} (f(x₀) − f(x₀ − 2h))/h = 2f′(x₀).', truth: true, why: 'Vrai : (f(x₀) − f(x₀ − 2h))/h = 2·(f(x₀ + k) − f(x₀))/k avec k = −2h → 0.' },
  { s: 'Si f est dérivable en x₀, alors x ↦ sin(f(x)) est dérivable en x₀.', truth: true, why: 'Vrai : composée de fonctions dérivables, de dérivée cos(f(x₀))·f′(x₀).' },
  { s: 'Si f est dérivable en x₀, alors f est continue en x₀.', truth: true, why: 'Vrai : f(x₀ + h) − f(x₀) = h·(f(x₀ + h) − f(x₀))/h → 0·f′(x₀) = 0.' },
  { s: 'g(x) = ∫₀^|x| 1 dt est dérivable en 0.', truth: false, rule: 'a1_corner_missed', why: 'Faux : g(x) = |x|, de dérivée −1 à gauche et 1 à droite en 0.' },
  { s: 'Si f est continue en x₀, alors f est dérivable en x₀.', truth: false, rule: 'a1_corner_missed', why: 'Faux : |x| est continue en 0, mais pas dérivable (dérivées latérales −1 et 1).' },
];
function defTf(rng) {
  const t = rng.pick(DEF_TF);
  if (!t.truth) return vfMcq(DEF, t.s, false, t.rule, t.why, rng, t.s);
  return tfItem({ skill: DEF, level: 4, statement: t.s, truth: true, key: t.s, explanation: t.why, exam: { format: 'tf', points: 1 } });
}

function derivDef(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq' || level === 5) return defMcq(rng, opts);
  if (opts.exam === 'tf') return defTf(rng);
  return defLines(level, rng, opts);
}

export const GEN = {
  ...stubGen(SKILLS.map((s) => s.id)),
  [DEF]: derivDef,
  ...INV,
  ...C1,
};

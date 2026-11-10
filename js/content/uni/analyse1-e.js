// Generators of module A1, part e (unit `analyse1`, step U2): bounding an
// integral, the fundamental theorem, improper integrals, applications.
// Catalogue: docs/universite/A1-analyse-1.md (« Intégrales », « Intégrales
// généralisées »). Skills: js/content/uni/analyse1-e.skills.js. The
// improper integrals are in analyse1-e-improper.js, the helpers in
// analyse1-e-kit.js.
//
// Levels (spec §8.3): 1–2 guided (lines with blanks; decisions shown, then
// one to choose), 3 « choose the action » (a menu per reference line), 4
// free lines with 3 hints, 5 alone. Each item is made of parts (segments)
// with their own judge: `equiv` for derivatives and simplifications,
// `definite` for numbers with ∫, [F] and lim, `limit` for limits.
// opts.exam = 'mcq' | 'tf' | 'open' gives the exam variants.

import { parse } from '../../cas/parse.js';
import { equivalent } from '../../cas/equiv.js';
import { expandDerivs } from '../../cas/diff.js';
import { pretty } from '../../cas/normal.js';
import { toText, toReadable } from '../../cas/print.js';
const RD = (t, o) => toReadable(parse(t, o));
import { MT, linesItem, mcq, tfItem, examTag } from './kit.js';
import {
  V, q, N, nz, modeOf, H, E, KEYS, tpl, blanked, partsScript, piText, joinSum, fac, fr, sup,
} from './analyse1-e-kit.js';
import { GEN as IMPROPER } from './analyse1-e-improper.js';

const uniq = (opts) => opts.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);
// V/F as a multiple choice (statements whose counter-example is a
// function: no checker kind fits, spec §6 « tfVariant »).
function vfMcq(skill, statement, truth, rng, { key, why, ruleIfTrue = null, ruleIfFalse = null }) {
  return mcq({
    skill, level: 4, prompt: `Vrai ou faux ?<br>« ${statement} »`, keepOrder: true,
    options: [{ html: 'Vrai', correct: truth, rule: truth ? null : ruleIfTrue }, { html: 'Faux', correct: !truth, rule: truth ? ruleIfFalse : null }],
    key: `${skill}:tf:${key}`, solution: [{ html: why, note: '' }], expectedSec: 60, exam: { format: 'tf', points: 1 },
  }, rng);
}

// ======================================================================
// a1-int-estimate
// ======================================================================

const IE = 'a1-int-estimate';
const IE_SUB = [
  { id: 'minmax', label: 'min et max de f sur [a ; b]', skill: 'a1-fn-image' },
  { id: 'estimate', label: 'intégrer l\'encadrement', skill: IE },
  { id: 'parity', label: 'parité', skill: IE },
];
const IE_CHOICES = [
  { id: 'deriv', label: 'Dériver f pour connaître son sens de variation' },
  { id: 'minmax', label: 'Min et max de f sur [a ; b]' },
  { id: 'times', label: 'Multiplier par b − a' },
  { id: 'parity', label: 'Parité : la partie impaire donne 0' },
  { id: 'eval', label: 'Calculer' },
  { id: 'prim', label: 'Chercher une primitive de f', rule: 'a1_int_exp_square_primitive', why: 'Pas de primitive élémentaire : on encadre f.' },
];

// A monotone f on [a ; b]: {f, df, a, b, inc, m, M, at(x)}.
function ieData(rng) {
  for (let i = 0; i < 200; i++) {
    const kind = rng.pick(['rat', 'rat', 'exp', 'sqrt']);
    if (kind === 'rat') {
      const c = rng.int(1, 5);
      const p = rng.pick([2, 3]);
      const [a, b] = rng.pick([[0, 1], [0, 1], [0, 2], [1, 2]]);
      if (1 + c * b ** p > 60) continue;
      const cx = `${c === 1 ? '' : c}x^${p}`;
      const den = (x) => 1 + c * x ** p;
      return {
        kind, f: `1/(1+${cx})`, df: `-${c * p === 1 ? '' : c * p}x${p - 1 === 1 ? '' : `^${p - 1}`}/(1+${cx})^2`, a, b, inc: false,
        at: (x) => `1/(1+${c === 1 ? '' : `${c}×`}${x}^${p})`, m: N(q(1, den(b))), M: N(q(1, den(a))), mQ: q(1, den(b)), MQ: q(1, den(a)),
      };
    }
    if (kind === 'exp') {
      const s = rng.pick([1, -1]);
      const b = rng.pick([1, 2]);
      const ex = (x) => (x === 0 ? '1' : `e^${s * x * x < 0 ? `(${s * x * x})` : s * x * x}`);
      return {
        kind, f: s > 0 ? 'e^(x^2)' : 'e^(-x^2)', df: s > 0 ? '2x×e^(x^2)' : '-2x×e^(-x^2)', a: 0, b, inc: s > 0, sign: s,
        at: (x) => `e^(${s > 0 ? '' : '-'}${x}^2)`, m: s > 0 ? '1' : ex(b), M: s > 0 ? ex(b) : '1',
      };
    }
    const [c, p, b] = rng.pick([[3, 2, 1], [8, 2, 1], [15, 3, 1], [24, 2, 1], [2, 2, 2], [6, 2, 2], [1, 3, 2], [3, 3, 2]]);
    const top = Math.round(Math.sqrt(1 + c * b ** p));
    const k = q(c * p, 2);
    return {
      kind, f: `√(1+${c === 1 ? '' : c}x^${p})`, df: `${k.d === 1 ? (k.eq(1) ? '' : k.n) : c * p}x${p - 1 === 1 ? '' : `^${p - 1}`}/(${k.d === 1 ? '' : 2}√(1+${c === 1 ? '' : c}x^${p}))`.replace('/(√', '/√').replace(/\)\)$/, k.d === 1 ? ')' : '))'), a: 0, b, inc: true,
      at: (x) => `√(1+${c === 1 ? '' : `${c}×`}${x}^${p})`, m: '1', M: String(top),
    };
  }
  return null;
}

// m·(b − a) written, and its value.
function times(m, a, b) {
  const L = b - a;
  const text = `${/^[\d/]+$/.test(m) && m.includes('/') ? `(${m})` : m}×(${b}-${a})`;
  if (/^\d+$/.test(m)) return { text, value: N(q(Number(m) * L)) };
  const v = /^1\/(\d+)$/.exec(m);
  if (v) return { text, value: N(q(L, Number(v[1]))) };
  return { text, value: L === 1 ? m : `${L}${m}` };
}

function ieMonotone(level, rng, opts) {
  const d = ieData(rng) || { kind: 'rat', f: '1/(1+2x^3)', df: '-6x^2/(1+2x^3)^2', a: 0, b: 1, inc: false, at: (x) => `1/(1+2×${x}^3)`, m: '1/3', M: '1', fallback: true };
  const L = d.b - d.a;
  const lo = d.inc ? d.a : d.b;
  const hi = d.inc ? d.b : d.a;
  const I = `int(${d.f},x,${d.a},${d.b})`;
  const mt = times(d.m, d.a, d.b);
  const Mt = times(d.M, d.a, d.b);
  const def = { kind: 'definite' };
  const ab = `[${d.a} ; ${d.b}]`;
  const word = d.inc ? 'croissante' : 'décroissante';
  // The two integrated bounds.
  const boundPart = (which) => {
    const t = which === 'm' ? mt : Mt;
    const val = which === 'm' ? d.m : d.M;
    const lines = level <= 3
      ? [E(t.text, `${which}·(b − a)`, 'estimate', 'times'), E(t.value, 'Calculer', 'estimate', 'eval')]
      : [E(t.value, `${which}·(b − a)`, 'estimate', 'times')];
    if (level === 1 && t.text !== t.value) lines[0] = blanked(lines[0], [val]);
    return {
      html: which === 'm' ? `Intègre l'encadrement : m(b − a) ≤ I ≤ M(b − a). Minorant de I :` : 'Majorant de I :',
      ask: which === 'm' ? 'm(b − a) =' : 'M(b − a) =',
      start: `int(${val},x,${d.a},${d.b})`, judge: def, lines,
    };
  };
  const minDecision = { kind: 'decision', prompt: `Sur ${ab}, f′ est ${d.inc ? 'positive' : 'négative'}. Où f atteint-elle son minimum ?`, options: [
    { id: 'lo', label: `En x = ${lo} : f est ${word}`, valid: true },
    { id: 'hi', label: `En x = ${hi}`, valid: false, why: `f est ${word} sur ${ab} : son minimum est en ${lo}, son maximum en ${hi}.` },
  ] };
  const parts = [];
  if (level >= 2) parts.push({ start: `d(${d.f})`, judge: { kind: 'equiv', vars: [V], domain: { x: [d.a + 0.05, d.b] }, target: 'no-prime' }, lines: [E(d.df, 'Dériver', 'minmax', 'deriv')] });
  parts.push({
    html: `Minimum m de f sur ${ab} :`, ask: 'm =', start: d.at(lo), judge: def,
    pre: level === 2 || level === 3 ? [minDecision] : [], lines: [E(d.m, `f est ${word} : m = f(${lo})`, 'minmax', 'minmax')],
  });
  parts.push({ html: `Maximum M de f sur ${ab} :`, ask: 'M =', start: d.at(hi), judge: def, lines: [E(d.M, `M = f(${hi})`, 'minmax', 'minmax')] });
  if (level === 1) parts.splice(0, 2);
  parts.push(boundPart('m'), boundPart('M'));
  const { start, judge, script } = partsScript(parts, level, IE_CHOICES);
  const given = level === 1 ? ` Sur ${ab}, f est ${word} : m = ${MT(d.m)}, M = ${MT(d.M)}.` : '';
  return linesItem({
    skill: IE, level, mode: modeOf(level), start, judge, script,
    prompt: `Encadre ${MT(`${I}`)} sans chercher de primitive : trouve m ≤ f(x) ≤ M sur ${ab}, puis intègre.${given}`,
    hints: H(`Pas de primitive simple : encadre f par ses valeurs extrêmes sur ${ab}. f est ${word}.`,
      `m = f(${lo}) = ▢ et M = f(${hi}) = ▢, puis m(b − a) ≤ I ≤ M(b − a).`,
      `${MT(mt.value)} ≤ I ≤ ${MT(Mt.value)}`),
    subgoals: IE_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${IE}:${level}:${I}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// ∫ from −a to a of (odd + even): the odd part gives 0.
const ODD = ['x^3×cos(x)', 'sin(x^3)', 'x×e^(x^2)', 'x^5×cos(x^2)', 'sin(x)×cos(x)^2', 'x^3×e^(x^2)'];
function ieParityData(rng) {
  for (let i = 0; i < 200; i++) {
    const odd = rng.pick(ODD);
    const a = rng.pick([1, 2, 3]);
    if (odd.includes('e^(x^2)') && a > 2) continue;
    const n = rng.pick([0, 2]);
    const k = n === 0 ? rng.int(1, 5) : rng.pick([1, 2, 3, 3, 6]);
    const even = n === 0 ? String(k) : `${k === 1 ? '' : k}x^2`;
    const half = n === 0 ? q(k * a) : q(k * a ** 3, 3);
    return { odd, even, a, k, n, value: half.mul(2) };
  }
  return { odd: 'x^3×cos(x)', even: '3x^2', a: 2, k: 3, n: 2, value: q(16), fallback: true };
}

function ieParity(level, rng, opts) {
  const d = ieParityData(rng);
  const I = `int(${d.odd}+${d.even},x,-${d.a},${d.a})`;
  const prim = d.n === 0 ? `${d.k === 1 ? '' : d.k}x` : `${d.k === 3 ? '' : d.k % 3 === 0 ? d.k / 3 : `${d.k}/3×`}x^3`;
  const primText = d.n === 0 ? prim : d.k % 3 === 0 ? prim : `${d.k}x^3/3`;
  const lines = [
    E(`int(${d.odd},x,-${d.a},${d.a})+int(${d.even},x,-${d.a},${d.a})`, 'Linéarité', 'parity', 'split'),
    E(`0+2int(${d.even},x,0,${d.a})`, 'Partie impaire : 0 ; partie paire : le double', 'parity', 'parity'),
    E(`2bracket(${primText},x,0,${d.a})`, 'Primitive', 'estimate', 'prim'),
    E(N(d.value), 'Calculer', 'estimate', 'eval'),
  ];
  const script = [...lines];
  if (level === 1) script[1] = blanked(lines[1], ['0']);
  if (level === 2) script[2] = blanked(lines[2], [primText]);
  if (level === 2 || level === 3) {
    script.unshift({ kind: 'decision', prompt: `La fonction x ↦ ${RD(d.odd)} est :`, options: [
      { id: 'odd', label: 'impaire : g(−x) = −g(x)', valid: true },
      { id: 'even', label: 'paire', valid: false, why: `Remplace x par −x : le signe change.` },
      { id: 'none', label: 'ni paire ni impaire', valid: false, why: `Remplace x par −x : tu obtiens −g(x).` },
    ] });
  }
  const choices = [
    { id: 'split', label: 'Séparer en deux intégrales (linéarité)' }, { id: 'parity', label: 'Parité : impaire → 0, paire → le double' },
    { id: 'prim', label: 'Primitive de la partie paire' }, { id: 'eval', label: 'Calculer' },
    { id: 'zero', label: 'Tout vaut 0 : l\'intervalle est symétrique', rule: 'a1_parity_misused', why: 'Seule la partie impaire donne 0.' },
  ];
  const judge = { kind: 'definite' };
  return linesItem({
    skill: IE, level, mode: modeOf(level), start: I, judge: { ...judge, ...(level === 3 ? { menus: partsScript([{ start: I, judge, lines }], 3, choices).judge.menus } : {}) }, script,
    prompt: `Calcule ${MT(I)} en utilisant la parité.`,
    hints: H(`${MT(d.odd)} est impaire : son intégrale sur [−${d.a} ; ${d.a}] est nulle. ${MT(d.even)} est paire.`,
      `${MT(`int(${d.odd}+${d.even},x,-${d.a},${d.a})`)} = 0 + 2·∫₀^${d.a} ▢ dx`, MT(lines[1].math)),
    subgoals: IE_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${IE}:${level}:${I}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

function ieMcq(rng) {
  if (rng.chance(0.35)) {
    const d = ieParityData(rng);
    const I = `int(${d.odd}+${d.even},x,-${d.a},${d.a})`;
    const v = d.value;
    return mcq({
      skill: IE, level: 5, prompt: `${MT(I)} =`,
      options: uniq([{ html: MT(N(v)), correct: true }, { html: MT('0'), correct: false, rule: 'a1_parity_misused' },
        { html: MT(N(v.div(2))), correct: false }, { html: MT(N(v.mul(2))), correct: false }]),
      key: `${IE}:mcq:${I}`, expectedSec: 240, exam: { format: 'mcq', points: 1 },
      solution: [{ html: `${MT(d.odd)} est impaire : son intégrale est nulle. Il reste 2·∫₀^${d.a} ${MT(d.even)} dx = ${MT(N(v))}.`, note: '' }],
    }, rng);
  }
  const b = rng.pick([1, 2]);
  const s = rng.pick([1, 1, -1]);
  const eb = (k) => (k === 0 ? '1' : `e^${k < 0 ? `(${k})` : k}`);
  const big = b === 1 ? eb(s) : `${b}${eb(s * b * b)}`;
  const opts = s > 0 ? [
    { html: `${MT(String(b))} ≤ I ≤ ${MT(big)}`, correct: true },
    { html: `I ≥ ${MT(big)}`, correct: false },
    { html: `I = ${MT(`e^(${N(q(b ** 3, 3))})-1`)}`, correct: false, rule: 'a1_int_exp_square_primitive' },
    { html: `0 ≤ I < ${MT(N(q(b).add(q(b ** 3, 3))))}`, correct: false },
  ] : [
    { html: `${MT(big)} ≤ I ≤ ${MT(String(b))}`, correct: true },
    { html: `I ≥ ${MT(String(b))}`, correct: false },
    { html: `I = ${MT(`1-e^(${N(q(-(b ** 3), 3))})`)}`, correct: false, rule: 'a1_int_exp_square_primitive' },
    { html: `I ≤ ${MT(big)}`, correct: false },
  ];
  const f = s > 0 ? 'e^(x^2)' : 'e^(-x^2)';
  return mcq({
    skill: IE, level: 5, prompt: `Soit I = ${MT(`int(${f},x,0,${b})`)}. Quelle affirmation est vraie ?`, options: opts,
    key: `${IE}:mcq:${f}:${b}`, expectedSec: 240, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `${MT(f)} n'a pas de primitive élémentaire (dérive ${MT(s > 0 ? 'e^(x^3/3)' : 'e^(-x^3/3)')} : ce n'est pas ${MT(f)}). Elle est ${s > 0 ? 'croissante' : 'décroissante'} sur [0 ; ${b}] : on intègre ses valeurs extrêmes.`, note: '' }],
  }, rng);
}

function ieTf(rng) {
  const kind = rng.pick(['odd', 'refute', 'refute', 'bij', 'seq']);
  if (kind === 'odd') {
    const k = rng.pick([5, 7, 9, 13]);
    const a = rng.pick(['π', '1', '2']);
    return tfItem({ skill: IE, level: 4, statement: `${MT(`int(sin(x^${k}),x,-${a},${a})`)} = 0.`, truth: true, key: `odd:${k}:${a}`, exam: { format: 'tf', points: 1 },
      explanation: `Vrai : x ↦ sin(x^${k}) est impaire et l'intervalle est symétrique.` });
  }
  if (kind === 'refute') {
    const c = rng.int(1, 4);
    const p = rng.pick([3, 5]);
    return tfItem({
      skill: IE, level: 4, statement: `Pour tout a > 0, ${MT(`int(x^${p}+${c},x,-a,a)`, { vars: ['a', 'x'] })} = 0, car l'intervalle est symétrique.`, truth: false,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R+' }], pred: `${2 * c}a=0`, ask: [{ v: 'a', label: 'a =' }], answer: { a: '1' } },
      ruleIfTrue: 'a1_parity_misused', key: `refute:${p}:${c}`, exam: { format: 'tf', points: 1 },
      explanation: `Faux : x^${p} est impaire, mais ${c} est paire : l'intégrale vaut 2·${c}·a = ${2 * c}a ≠ 0. Par exemple a = 1.`,
    });
  }
  if (kind === 'bij') {
    return vfMcq(IE, 'Si f : [−1 ; 1] → [−1 ; 1] est bijective et continue avec f(0) = 0, alors ∫₋₁¹ f(x) dx = 0.', false, rng, {
      key: 'bij', ruleIfTrue: 'a1_parity_misused',
      why: 'Faux : ∫₋₁¹ f = 0 demande f impaire. f(x) = x (x ≥ 0), −√(−x) (x < 0) est bijective, continue, nulle en 0, mais ∫₋₁¹ f = 1/2 − 2/3 = −1/6.',
    });
  }
  return tfItem({ skill: IE, level: 4, statement: 'Si aₙ → 1 et f est continue sur ℝ, alors la suite bₙ = ∫₀^(aₙ) f(x) dx converge.', truth: true, key: 'seq', exam: { format: 'tf', points: 1 },
    explanation: 'Vrai : F(t) = ∫₀ᵗ f est continue (et même dérivable), donc bₙ = F(aₙ) → F(1).' });
}

function ieItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq' || level === 5) {
    const it = ieMcq(rng);
    return opts.exam ? it : { ...it, exam: false, level: 5, noHints: true, hints: [] };
  }
  if (opts.exam === 'tf') return ieTf(rng);
  if (level >= 2 && rng.chance(0.3)) return ieParity(level, rng, opts);
  return ieMonotone(level, rng, opts);
}

// ======================================================================
// a1-ftc
// ======================================================================

const FT = 'a1-ftc';
const FT_SUB = [
  { id: 'ftc', label: 'théorème fondamental', skill: FT },
  { id: 'chain', label: 'règle de chaîne sur la borne', skill: 'a1-deriv-rules' },
  { id: 'value', label: 'évaluer', skill: FT },
];
const FT_CHOICES = [
  { id: 'ftc', label: 'Théorème fondamental : F′ = f, composer avec la borne' },
  { id: 'chain', label: 'Règle de chaîne : multiplier par la dérivée de la borne' },
  { id: 'eval', label: 'Calculer en x = 1' },
  { id: 'prim', label: 'Chercher une primitive de f', rule: 'a1_ftc_integrate_first', why: 'Inutile : seule F′ = f sert.' },
];
// f(t), its value at u (text), and its value written simply.
// u in brackets unless it is x.
const W = (u) => (u === 'x' ? 'x' : `(${u})`);
const FT_F = [
  { f: 'e^(-t^2)', at: (u) => `e^(-${W(u)}^2)`, simple: (g) => `e^(-${sq(g, 2)})`, noPrim: true },
  { f: 'ln(1+t^2)', at: (u) => `ln(1+${W(u)}^2)`, simple: (g) => `ln(1+${sq(g, 2)})`, noPrim: false },
  { f: '√(1+t^4)', at: (u) => `√(1+${W(u)}^4)`, simple: (g) => `√(1+${sq(g, 4)})`, noPrim: true },
  { f: 'sin(t)/t', at: (u) => `sin(${u})/${u}`, simple: (g) => `sin(${g.t})/${g.t === 'x' ? 'x' : `${g.t.includes('^') || g.t.includes('(') ? `(${g.t})` : g.t}`}`, noPrim: true, sinc: true },
];
// g(x)^k written simply.
function sq(g, k) {
  if (g.t === 'x') return `x^${k}`;
  if (g.pow) return `x^${g.pow * k}`;
  if (g.t === 'e^x') return `e^(${k}x)`;
  return `${g.t}^${k}`;
}
const FT_G = [
  { t: 'x^2', pow: 2, d: '2x', at1: 1, d1: 2 },
  { t: 'x^3', pow: 3, d: '3x^2', at1: 1, d1: 3 },
  { t: 'sin(x)', d: 'cos(x)' },
  { t: 'e^x', d: 'e^x' },
];

// A wrong primitive of f (a1_ftc_integrate_first), as a function of u.
const NAIVE = {
  'e^(-t^2)': (u) => `e^(-(${u})^3/3)`, 'ln(1+t^2)': (u) => `(${u})×ln(1+(${u})^2)-(${u})`,
  '√(1+t^4)': (u) => `(2/3)(1+(${u})^4)^(3/2)`, 'sin(t)/t': (u) => `-cos(${u})/(${u})`,
};

// The derivative written simply: g′·f(g), tidy.
function ftFinal(F, g) {
  if (F.sinc) {
    if (g.t === 'e^x') return 'sin(e^x)';
    if (g.pow) return `${g.pow}sin(${g.t})/x`;
    return `cos(x)×sin(sin(x))/sin(x)`;
  }
  const body = F.simple(g);
  return `${g.d}${body.startsWith('√') ? '' : '×'}${body}`;
}

function ftData(rng, { two = false, value = false } = {}) {
  for (let i = 0; i < 200; i++) {
    const F = rng.pick(FT_F);
    const g = rng.pick(FT_G);
    if (value && (F.sinc || !g.pow)) continue;
    if (F.sinc && g.t === 'sin(x)' && two) continue;
    const c = F.sinc ? 1 : rng.pick([0, 1]);
    return { F, g, lo: two ? 'x' : String(c), two };
  }
  return { F: FT_F[1], g: FT_G[1], lo: '1', two: false, fallback: true };
}

function ftItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return ftMcq(rng);
  if (opts.exam === 'tf') return ftTf(rng);
  const two = level === 5 || (level === 4 && rng.chance(0.4));
  const d = ftData(rng, { two, value: level === 5 });
  const { F, g } = d;
  const start = `d(int(${F.f},t,${d.lo},${g.t}))`;
  const fin = ftFinal(F, g);
  const fx = F.simple({ t: 'x' });
  const lines = d.two
    ? [E(`${F.at(g.t)}×d(${g.t})-${F.at('x')}×d(x)`, 'Théorème fondamental aux deux bornes', 'ftc', 'ftc'),
      E(`${fin}-${fx}`, 'Règle de chaîne : dériver les bornes', 'chain', 'chain')]
    : [E(`${F.at(g.t)}×d(${g.t})`, 'Théorème fondamental : F′(g(x))·g′(x)', 'ftc', 'ftc'),
      E(fin, `Règle de chaîne : (${sup(g.t)})′ = ${sup(g.d)}`, 'chain', 'chain')];
  const judge = { kind: 'equiv', vars: [V], domain: { x: [0.3, 1.4] }, target: 'no-prime' };
  const parts = [{ start, judge, lines: [...lines] }];
  if (level === 1) parts[0].lines = [blanked(lines[0], [g.t === 'x^2' || g.t === 'x^3' ? g.t : g.t]), blanked(lines[1], [g.d])];
  if (level === 2) parts[0].lines = [lines[0], blanked(lines[1], [g.d])];
  if (level === 2 || level === 3) {
    const prim = F.noPrim
      ? { id: 'prim', label: `Chercher d'abord une primitive de ${RD(F.f, { vars: ['t'] })}`, valid: false, rule: 'a1_ftc_integrate_first', why: `${MT(F.f, { vars: ['t'] })} n'a pas de primitive élémentaire, et c'est inutile : seule F′ = f sert.` }
      : { id: 'prim', label: `Chercher d'abord une primitive de ${RD(F.f, { vars: ['t'] })}`, valid: true, quality: 'poor', why: 'Juste (t·ln(1 + t²) − 2t + 2Arctg t), mais inutile : seule F′ = f sert.' };
    const options = [
      { id: 'ftc', label: `Appeler F une primitive : G(x) = F(${sup(g.t)}) − F(${d.lo}), puis dériver`, valid: true, ref: true },
      prim,
      ...(level === 3 ? [{ id: 'nochain', label: `G′(x) = f(${sup(g.t)}), sans autre facteur`, valid: false, rule: 'a1_ftc_no_chain', why: `La borne est ${sup(g.t)} : règle de chaîne, il faut multiplier par ${sup(g.d)}.` }] : []),
    ];
    parts[0].pre = [{ kind: 'decision', prompt: 'Comment dérives-tu G ?', options }];
  }
  if (level === 5) {
    const k = g.d1;
    const val = F.f === 'e^(-t^2)' ? (k - 1 === 1 ? 'e^(-1)' : `${k - 1}e^(-1)`) : F.f === 'ln(1+t^2)' ? `${k - 1 === 1 ? '' : k - 1}ln(2)` : `${k - 1 === 1 ? '' : k - 1}√2`;
    const startV = `${fin}-${fx}`.replace(/x/g, '(1)');
    parts.push({ html: 'Calcule G′(1) :', ask: 'G′(1) =', start: startV, judge: { kind: 'definite' }, lines: [E(val, 'Remplacer x par 1', 'value', 'eval')] });
  }
  const { start: s0, judge: j0, script } = partsScript(parts, level, FT_CHOICES);
  const Gtext = `int(${F.f},t,${d.lo},${g.t})`;
  return linesItem({
    skill: FT, level, mode: modeOf(level), start: s0, judge: j0, script,
    prompt: `G(x) = ${MT(Gtext)}. Calcule G′(x)${level === 5 ? ', puis G′(1)' : ''}.`,
    hints: H(`Appelle F une primitive de ${MT(F.f, { vars: ['t'] })} (sans la calculer) : G(x) = F(${sup(g.t)}) − F(${fr(d.lo)}), et F′ = f.`,
      `G′(x) = ${MT(F.at(g.t))}·▢`, MT(lines.at(-1).math)),
    subgoals: FT_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${FT}:${level}:${Gtext}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

function ftMcq(rng) {
  const d = ftData(rng, { two: rng.chance(0.3) });
  const { F, g } = d;
  const fin = ftFinal(F, g);
  const fx = F.simple({ t: 'x' });
  const right = d.two ? `${fin}-${fx}` : fin;
  const noChain = d.two ? `${F.simple(g)}-${fx}` : F.simple(g);
  // A wrong primitive of f, then differentiated (a1_ftc_integrate_first).
  const naive = NAIVE[F.f];
  const first = toText(pretty(expandDerivs(parse(`d(${naive(g.t)}${d.two ? `-${naive('x')}` : ''})`))));
  const wrongF = d.two ? `${g.d}×${fx}-${fx}` : `${g.d}${fx.startsWith('√') ? '' : '×'}${fx}`;
  const eqOpts = { vars: [V], domain: { x: [0.3, 1.4] }, seed: 5 };
  const cands = [
    { text: right, correct: true },
    { text: noChain, rule: 'a1_ftc_no_chain' },
    { text: first, rule: 'a1_ftc_integrate_first' },
    { text: wrongF },
    { text: d.two ? `${fin}+${fx}` : `${fin}-${F.simple({ t: d.lo })}`.replace(/\(0\)/g, '0') },
  ];
  const options = [];
  for (const c of cands) {
    if (options.length >= 4) break;
    const n = parse(c.text);
    if (options.some((o) => { try { return equivalent(o.n, n, eqOpts).equal; } catch { return false; } })) continue;
    options.push({ n, html: MT(c.text), correct: !!c.correct, rule: c.rule || null });
  }
  const Gtext = `int(${F.f},t,${d.lo},${g.t})`;
  return mcq({
    skill: FT, level: 4, prompt: `G(x) = ${MT(Gtext)}. G′(x) =`,
    options: options.map(({ html, correct, rule }) => ({ html, correct, rule })),
    key: `${FT}:mcq:${Gtext}`, expectedSec: 240, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `Avec F′ = f : G(x) = F(${sup(g.t)}) − F(${fr(d.lo)}), donc G′(x) = ${MT(right)}.`, note: '' }],
  }, rng);
}

function ftTf(rng) {
  const kind = rng.pick(['chain', 'chain', 'abs', 'thm', 'two']);
  if (kind === 'chain') {
    const F = rng.pick([FT_F[1], FT_F[2]]);
    const g = rng.pick([FT_G[0], FT_G[1]]);
    const wrong = F.simple(g);
    return tfItem({
      skill: FT, level: 4, statement: `Pour tout x > 0, ${MT(`d(int(${F.f},t,0,${g.t}))`)} = ${MT(wrong)}.`, truth: false,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R+' }], pred: `${ftFinal(F, g)}=${wrong}`, ask: [{ v: 'x', label: 'x =' }], answer: { x: '1' } },
      ruleIfTrue: 'a1_ftc_no_chain', key: `chain:${F.f}:${g.t}`, exam: { format: 'tf', points: 1 },
      explanation: `Faux : la règle de chaîne donne ${MT(ftFinal(F, g))}. En x = 1, les deux membres diffèrent d'un facteur ${g.d1}.`,
    });
  }
  if (kind === 'abs') {
    return vfMcq(FT, 'g(x) = ∫₀^|x| 1 dt est dérivable en 0.', false, rng, {
      key: 'abs', why: 'Faux : g(x) = |x|, qui n\'est pas dérivable en 0. La borne |x| n\'est pas dérivable en 0, la règle de chaîne ne s\'applique pas.',
    });
  }
  if (kind === 'thm') {
    return tfItem({ skill: FT, level: 4, statement: 'Si f est continue sur ℝ, alors F(x) = ∫₀ˣ f(t) dt est dérivable et F′ = f.', truth: true, key: 'thm', exam: { format: 'tf', points: 1 },
      explanation: 'Vrai : c\'est le théorème fondamental de l\'analyse.' });
  }
  return tfItem({ skill: FT, level: 4, statement: 'Si f est continue sur ℝ, alors d/dx ∫ₓ^(2x) f(t) dt = 2f(2x) − f(x).', truth: true, key: 'two', exam: { format: 'tf', points: 1 },
    explanation: 'Vrai : F(2x) − F(x) se dérive en 2F′(2x) − F′(x).' });
}

// ======================================================================
// a1-int-applications
// ======================================================================

const AP = 'a1-int-applications';
const AP_SUB = [
  { id: 'formula', label: 'choisir la formule', skill: AP },
  { id: 'deriv', label: 'dériver f', skill: AP },
  { id: 'simplify', label: 'simplifier la racine', skill: 'a1-int-hyper' },
  { id: 'integrate', label: 'intégrer', skill: 'a1-int-hyper' },
];
const AP_CHOICES = [
  { id: 'deriv', label: 'Dériver f' },
  { id: 'simplify', label: 'Simplifier (identité, carré parfait)' },
  { id: 'formula', label: 'Écrire la formule (volume, longueur ou aire)' },
  { id: 'prim', label: 'Primitive' },
  { id: 'eval', label: 'Calculer' },
  { id: 'nosq', label: 'V = π∫ f(x) dx', rule: 'a1_volume_no_square', why: 'Chaque tranche est un disque de rayon f(x), d\'aire π·f(x)².' },
];
const FORMULA = {
  V: 'V = π∫ f(x)² dx', L: 'L = ∫ √(1 + f′(x)²) dx', A: 'A = 2π∫ |f(x)|·√(1 + f′(x)²) dx',
};

// Each template: {what: 'V'|'L'|'A', f, a, b, …}.
function apData(rng, kinds) {
  const kind = rng.pick(kinds);
  if (kind === 'Lcosh' || kind === 'Acosh') {
    const k = rng.pick([2, 3, 4]);
    return { kind, what: kind[0], f: 'cosh(x)', a: '0', b: `ln(${k})`, k };
  }
  if (kind === 'Lpow') return { kind, what: 'L', f: 'x^(3/2)', a: '0', b: rng.pick(['4/3', '32/9']) };
  if (kind === 'Llog') return { kind, what: 'L', beta: rng.pick([q(1, 2), q(1), q(2)]), a: '1', b: rng.pick(['2', '3', 'e']) };
  if (kind === 'Asphere') return { kind, what: 'A', r: rng.int(1, 3) };
  if (kind === 'Vsqrt') return { kind, what: 'V', f: '√x', a: '0', b: String(rng.int(1, 4)) };
  if (kind === 'Vpow') return { kind, what: 'V', n: rng.pick([1, 2, 3]), a: '0', b: String(rng.pick([1, 1, 2])) };
  if (kind === 'Vsin') return { kind, what: 'V', f: 'sin(x)', a: '0', b: 'π' };
  if (kind === 'Vexp') return { kind, what: 'V', c: rng.int(1, 3), a: '0', b: '∞' };
  return { kind: 'Vball', what: 'V', r: rng.int(1, 3) };
}

// The parts of the solution: {deriv?: [f, f′], simp?: {start, lines, goal}, integral: {start, lines}, value}.
function apSolve(d) {
  const def = { kind: 'definite' };
  if (d.kind === 'Lcosh' || d.kind === 'Acosh') {
    const { k } = d;
    const b = `ln(${k})`;
    if (d.kind === 'Lcosh') {
      return {
        f: 'cosh(x)', a: '0', b, deriv: ['d(cosh(x))', 'sinh(x)'],
        simp: { html: 'Simplifie 1 + f′(x)² :', ask: '1 + f′(x)² =', start: '1+sinh(x)^2', goal: 'cosh(x)^2', note: '1 + sinh² = cosh²' },
        integral: { start: `int(√(1+sinh(x)^2),x,0,${b})`, lines: [
          E(`int(cosh(x),x,0,${b})`, '√(cosh²x) = cosh x', 'formula', 'formula'),
          E(`bracket(sinh(x),x,0,${b})`, 'Primitive', 'integrate', 'prim'),
          E(`(${k}-1/${k})/2`, `sinh(ln ${k}) = (${k} − 1/${k})/2`, 'integrate', 'eval'),
          E(N(q(k * k - 1, 2 * k)), 'Calculer', 'integrate', 'eval')] },
        judge: def,
      };
    }
    const c = q(k ** 4 - 1, 4 * k * k);
    return {
      f: 'cosh(x)', a: '0', b, deriv: ['d(cosh(x))', 'sinh(x)'],
      simp: { html: 'Simplifie |f(x)|·√(1 + f′(x)²) :', ask: '|f(x)|·√(1 + f′(x)²) =', start: 'cosh(x)×√(1+sinh(x)^2)', goal: 'cosh(x)^2', note: '1 + sinh² = cosh²' },
      integral: { start: `2π×int(cosh(x)×√(1+sinh(x)^2),x,0,${b})`, lines: [
        E(`2π×int(cosh(x)^2,x,0,${b})`, 'A = 2π∫ cosh²x dx', 'formula', 'formula'),
        E(`π×int(1+cosh(2x),x,0,${b})`, '2cosh²x = 1 + cosh 2x', 'integrate', 'simplify'),
        E(`π×bracket(x+sinh(2x)/2,x,0,${b})`, 'Primitive', 'integrate', 'prim'),
        E(`π×(ln(${k})+(${k * k}-1/${k * k})/4)`, `sinh(2ln ${k}) = (${k * k} − 1/${k * k})/2`, 'integrate', 'eval'),
        E(`π×ln(${k})+${piText(c)}`, 'Calculer', 'integrate', 'eval')] },
    };
  }
  if (d.kind === 'Lpow') {
    const B = d.b;
    const top = B === '4/3' ? 8 : 27;
    return {
      f: 'x^(3/2)', a: '0', b: B, deriv: ['d(x^(3/2))', '(3/2)√x'],
      simp: { html: 'Simplifie 1 + f′(x)² :', ask: '1 + f′(x)² =', start: '1+((3/2)√x)^2', goal: '1+9x/4', note: '((3/2)√x)² = 9x/4' },
      integral: { start: `int(√(1+((3/2)√x)^2),x,0,${B})`, lines: [
        E(`int(√(1+9x/4),x,0,${B})`, 'L = ∫ √(1 + 9x/4) dx', 'formula', 'formula'),
        E(`bracket((8/27)(1+9x/4)^(3/2),x,0,${B})`, 'Primitive de (1 + 9x/4)^(1/2)', 'integrate', 'prim'),
        E(`(8/27)×(${top}-1)`, `1 + 9x/4 vaut ${top === 8 ? 4 : 9} en ${B}`, 'integrate', 'eval'),
        E(N(q(8 * (top - 1), 27)), 'Calculer', 'integrate', 'eval')] },
    };
  }
  if (d.kind === 'Llog') {
    const be = d.beta;
    const f = be.eq(1) ? 'x^2/8-ln(x)' : be.eq(2) ? 'x^2/16-2ln(x)' : 'x^2/4-ln(x)/2';
    const df = be.eq(1) ? 'x/4-1/x' : be.eq(2) ? 'x/8-2/x' : 'x/2-1/(2x)';
    const sum = be.eq(1) ? 'x/4+1/x' : be.eq(2) ? 'x/8+2/x' : 'x/2+1/(2x)';
    const prim = be.eq(1) ? 'x^2/8+ln(x)' : be.eq(2) ? 'x^2/16+2ln(x)' : 'x^2/4+ln(x)/2';
    const B = d.b;
    const k2 = B === 'e' ? 'e^2' : String(Number(B) ** 2);
    const den = be.mul(8);
    const lnPart = B === 'e' ? N(be) : cl(be, `ln(${B})`);
    const valText = B === 'e'
      ? joinSum([`${'e^2'}/${N(den)}`.replace(/\/1$/, ''), N(be.sub(q(1).div(den)))])
      : joinSum([N(q(Number(B) ** 2 - 1).div(den)), lnPart]);
    return {
      f, a: '1', b: B, deriv: [`d(${f})`, df],
      simp: { html: 'Simplifie 1 + f′(x)² : c\'est un carré parfait.', ask: '1 + f′(x)² =', start: `1+(${df})^2`, goal: `(${sum})^2`, note: 'Carré parfait' },
      integral: { start: `int(√(1+(${df})^2),x,1,${B})`, lines: [
        E(`int(${sum},x,1,${B})`, 'La racine d\'un carré positif', 'formula', 'formula'),
        E(`bracket(${prim},x,1,${B})`, 'Primitive', 'integrate', 'prim'),
        E(`(${k2}-1)/${N(den)}+${lnPart}`.replace('+-', '-'), 'Évaluer', 'integrate', 'eval'),
        E(valText, 'Calculer', 'integrate', 'eval')] },
    };
  }
  if (d.kind === 'Asphere') {
    const { r } = d;
    return {
      f: `√(${r * r}-x^2)`, a: String(-r), b: String(r), deriv: [`d(√(${r * r}-x^2))`, `-x/√(${r * r}-x^2)`],
      simp: { html: 'Simplifie |f(x)|·√(1 + f′(x)²) :', ask: '|f(x)|·√(1 + f′(x)²) =', start: `√(${r * r}-x^2)×√(1+(-x/√(${r * r}-x^2))^2)`, goal: String(r), note: `1 + x²/(${r * r} − x²) = ${r * r}/(${r * r} − x²)`, domain: [-r + 0.1, r - 0.1] },
      integral: { start: `2π×int(√(${r * r}-x^2)×√(1+(-x/√(${r * r}-x^2))^2),x,-${r},${r})`, lines: [
        E(`2π×int(${r},x,-${r},${r})`, `A = 2π∫ ${r} dx`, 'formula', 'formula'),
        E(`2π×bracket(${r === 1 ? '' : r}x,x,-${r},${r})`, 'Primitive', 'integrate', 'prim'),
        E(piText(4 * r * r), `4πr² avec r = ${r}`, 'integrate', 'eval')] },
    };
  }
  // Volumes: one part, from π∫f² dx.
  if (d.kind === 'Vsqrt') {
    const b = Number(d.b);
    return { f: '√x', a: '0', b: d.b, integral: { start: `π×int((√x)^2,x,0,${b})`, lines: [
      E(`π×int(x,x,0,${b})`, '(√x)² = x', 'formula', 'formula'),
      E(`π×bracket(x^2/2,x,0,${b})`, 'Primitive', 'integrate', 'prim'),
      E(piText(q(b * b, 2)), 'Calculer', 'integrate', 'eval')] } };
  }
  if (d.kind === 'Vpow') {
    const { n } = d;
    const b = Number(d.b);
    const f = n === 1 ? 'x' : `x^${n}`;
    return { f, a: '0', b: d.b, integral: { start: `π×int((${f})^2,x,0,${b})`, lines: [
      ...(n === 1 ? [] : [E(`π×int(x^${2 * n},x,0,${b})`, sup(`(${f})² = x^${2 * n}`), 'formula', 'formula')]),
      E(`π×bracket(x^${2 * n + 1}/${2 * n + 1},x,0,${b})`, 'Primitive', 'integrate', 'prim'),
      E(piText(q(b ** (2 * n + 1), 2 * n + 1)), 'Calculer', 'integrate', 'eval')] } };
  }
  if (d.kind === 'Vsin') {
    return { f: 'sin(x)', a: '0', b: 'π', integral: { start: 'π×int(sin(x)^2,x,0,π)', lines: [
      E('π×int((1-cos(2x))/2,x,0,π)', 'sin²x = (1 − cos 2x)/2', 'integrate', 'simplify'),
      E('π×bracket(x/2-sin(2x)/4,x,0,π)', 'Primitive', 'integrate', 'prim'),
      E('π^2/2', 'Calculer', 'integrate', 'eval')] } };
  }
  if (d.kind === 'Vexp') {
    const { c } = d;
    const f = c === 1 ? 'e^(-x)' : `e^(-${c}x)`;
    return { f, a: '0', b: '∞', integral: { start: `π×int((${f})^2,x,0,∞)`, lines: [
      E(`π×int(e^(-${2 * c}x),x,0,∞)`, `(${f})² = e^(−${2 * c}x)`, 'formula', 'formula'),
      E(`π×lim(bracket(-e^(-${2 * c}x)/${2 * c},x,0,b),b,+∞)`, 'Intégrale généralisée : une limite', 'integrate', 'prim'),
      E(piText(q(1, 2 * c)), 'Calculer', 'integrate', 'eval')] } };
  }
  const { r } = d;
  return { f: `√(${r * r}-x^2)`, a: String(-r), b: String(r), integral: { start: `π×int((√(${r * r}-x^2))^2,x,-${r},${r})`, lines: [
    E(`π×int(${r * r}-x^2,x,-${r},${r})`, 'f(x)² = r² − x²', 'formula', 'formula'),
    E(`π×bracket(${r * r === 1 ? '' : r * r}x-x^3/3,x,-${r},${r})`, 'Primitive', 'integrate', 'prim'),
    E(piText(q(4 * r ** 3, 3)), '4πr³/3', 'integrate', 'eval')] } };
}
// c·body for a coefficient c (ln parts).
const cl = (c, body) => (c.eq(1) ? body : c.d === 1 ? `${c.n}${body}` : `${body}/${c.d}`.replace(/^/, c.n === 1 ? '' : `${c.n}`));

const AP_WHAT = { V: 'le volume du solide obtenu en faisant tourner autour de l\'axe Ox', L: 'la longueur de la courbe', A: 'l\'aire de la surface obtenue en faisant tourner autour de l\'axe Ox' };

function apItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return apMcq(rng);
  const kinds = level === 2 ? ['Lcosh', 'Lpow', 'Llog', 'Acosh', 'Asphere']
    : level === 5 || opts.exam === 'open' ? ['Acosh', 'Asphere', 'Llog', 'Lcosh']
      : ['Lcosh', 'Lpow', 'Llog', 'Acosh', 'Asphere', 'Vsqrt', 'Vpow', 'Vsin', 'Vexp', 'Vball'];
  const d = apData(rng, kinds);
  const s = apSolve(d);
  const curve = `y = ${MT(s.f)} sur [${fr(s.a === '0' ? '0' : s.a)} ; ${s.b === '∞' ? '+∞[' : `${MT(s.b)}]`}`.replace('[−', '[−');
  const parts = [];
  if (s.deriv) {
    parts.push({ start: s.deriv[0], judge: { kind: 'equiv', vars: [V], domain: { x: s.simp.domain || [0.3, 1.5] }, target: 'no-prime' }, lines: [E(s.deriv[1], 'Dériver', 'deriv', 'deriv')] });
    const simpLines = [E(s.simp.goal, s.simp.note, 'simplify', 'simplify')];
    const formulaDecision = { kind: 'decision', prompt: `Quelle formule donne ${AP_WHAT[d.what]} ?`, options: [
      { id: d.what, label: FORMULA[d.what], valid: true },
      ...(d.what === 'L' ? [{ id: 'nosqrt', label: 'L = ∫ (1 + f′(x)²) dx', valid: false, rule: 'a1_arc_length_no_sqrt', why: 'Un petit bout de courbe mesure √(dx² + dy²) = √(1 + f′²)·dx.' }]
        : [{ id: 'L', label: FORMULA.L, valid: false, why: 'C\'est la longueur de la courbe, pas l\'aire de la surface.' }]),
      { id: 'V', label: FORMULA.V, valid: false, why: 'C\'est le volume du solide, pas ce qui est demandé.' },
    ] };
    parts.push({ html: s.simp.html, ask: s.simp.ask, start: s.simp.start, judge: { kind: 'equiv', vars: [V], domain: { x: s.simp.domain || [1.05, 2.5] }, target: 'goal', goal: s.simp.goal }, pre: level === 2 || level === 3 ? [formulaDecision] : [], lines: simpLines });
    parts.push({ html: `${d.what} = ${s.what === 'A' ? '' : ''}${d.what === 'L' ? '∫ √(1 + f′(x)²) dx' : '2π∫ |f(x)|·√(1 + f′(x)²) dx'} :`, ask: `${d.what} =`, start: s.integral.start, judge: { kind: 'definite' }, lines: [...s.integral.lines] });
  } else {
    parts.push({ start: s.integral.start, judge: { kind: 'definite' }, lines: [...s.integral.lines] });
  }
  const last = parts.at(-1);
  if (level === 1) {
    last.lines = last.lines.map((l, i) => (i === 1 && l.math.includes('bracket(') ? blanked(l, [l.math.match(/bracket\((.*),x,/)?.[1] ?? '']) : l));
    if (parts.length > 1) parts[0].lines = [blanked(parts[0].lines[0], [s.deriv[1]])];
  }
  if (level === 2 && parts.length > 1) last.lines = last.lines.map((l, i) => (i === 0 ? blanked(l, [l.math.match(/int\((.*),x,/)?.[1] ?? '']) : l));
  const { start, judge, script } = partsScript(parts, level, AP_CHOICES);
  const val = last.lines.at(-1).math;
  const ask = d.what === 'V' ? `Calcule le volume V du solide obtenu en faisant tourner ${curve} autour de l'axe Ox.`
    : d.what === 'L' ? `Calcule la longueur L de la courbe ${curve}.`
      : `Calcule l'aire A de la surface obtenue en faisant tourner ${curve} autour de l'axe Ox.`;
  const formulaNote = level === 1 ? ` On utilise ${FORMULA[d.what]}.` : '';
  return linesItem({
    skill: AP, level, mode: modeOf(level), start, judge, script,
    prompt: `${ask}${formulaNote}`,
    hints: H(d.what === 'V' ? 'Chaque tranche est un disque de rayon f(x) : V = π∫ f(x)² dx.' : d.kind.endsWith('cosh') ? '1 + sinh² = cosh² : la racine disparaît.' : `${FORMULA[d.what]} : simplifie d'abord ce qu'il y a sous la racine.`,
      `${d.what} = ${MT(last.lines[0].math)}, puis une primitive.`,
      `${d.what} = ${MT(val)}`),
    subgoals: AP_SUB, keys: [...KEYS, 'letters'], tapActions: level === 3 ? 'steps' : null,
    key: `${AP}:${level}:${d.kind}:${s.f}:${s.b}`, exam: examTag(opts, 4),
  });
}

function apMcq(rng) {
  const kind = rng.pick(['Vsqrt', 'Vpow', 'Lcosh', 'Llin']);
  if (kind === 'Lcosh') {
    const k = rng.pick([2, 3, 4]);
    const right = q(k * k - 1, 2 * k);
    // ∫ (1 + sinh²) = ∫ cosh² = [x/2 + sinh(2x)/4].
    const noSqrt = `ln(${k})/2+${N(q(k ** 4 - 1, 8 * k * k))}`;
    return mcq({
      skill: AP, level: 4, prompt: `Longueur de la courbe y = cosh x sur [0 ; ${MT(`ln(${k})`)}] :`,
      options: [{ html: MT(N(right)), correct: true }, { html: MT(noSqrt), correct: false, rule: 'a1_arc_length_no_sqrt' },
        { html: MT(N(q(k * k + 1, 2 * k).sub(1))), correct: false }, { html: MT(`π×${fac(right)}`.replace('×(', '(')), correct: false }],
      key: `${AP}:mcq:Lcosh:${k}`, expectedSec: 240, exam: { format: 'mcq', points: 1 },
      solution: [{ html: `L = ∫₀^(ln ${k}) √(1 + sinh²x) dx = ∫ cosh x dx = sinh(ln ${k}) = ${MT(N(right))}.`, note: '' }],
    }, rng);
  }
  if (kind === 'Llin') {
    const m = rng.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13]]);
    const [a, bb, c] = m;
    const b = rng.int(1, 3);
    // y = (b/a)·x… slope s = bb/a, L = b·c/a.
    const s = q(bb, a);
    return mcq({
      skill: AP, level: 4, prompt: `Longueur du segment y = ${MT(`${N(s)}x`)} pour x ∈ [0 ; ${a * b}] :`,
      options: [{ html: MT(String(c * b)), correct: true }, { html: MT(N(q(a * b).mul(q(1).add(s.mul(s))))), correct: false, rule: 'a1_arc_length_no_sqrt' },
        { html: MT(String((a + bb) * b)), correct: false }, { html: MT(String(bb * b)), correct: false }],
      key: `${AP}:mcq:Llin:${a}:${b}`, expectedSec: 240, exam: { format: 'mcq', points: 1 },
      solution: [{ html: `L = ∫ √(1 + (${fr(N(s))})²) dx = ${N(q(c, a))}·${a * b} = ${c * b} (Pythagore).`, note: '' }],
    }, rng);
  }
  if (kind === 'Vsqrt') {
    const b = rng.int(1, 4);
    return mcq({
      skill: AP, level: 4, prompt: `Volume du solide obtenu en faisant tourner y = √x, x ∈ [0 ; ${b}], autour de l'axe Ox :`,
      options: [{ html: MT(piText(q(b * b, 2))), correct: true }, { html: MT(`${N(q(2, 3).mul(b))}√${b}π`.replace('√1', '').replace(/^1√/, '√')), correct: false, rule: 'a1_volume_no_square' },
        { html: MT(piText(q(b * b))), correct: false }, { html: MT(N(q(b * b, 2))), correct: false }],
      key: `${AP}:mcq:Vsqrt:${b}`, expectedSec: 240, exam: { format: 'mcq', points: 1 },
      solution: [{ html: `V = π∫₀^${b} (√x)² dx = π∫₀^${b} x dx = ${MT(piText(q(b * b, 2)))}.`, note: '' }],
    }, rng);
  }
  const n = rng.pick([1, 2, 3]);
  const f = n === 1 ? 'x' : `x^${n}`;
  return mcq({
    skill: AP, level: 4, prompt: `Volume du solide obtenu en faisant tourner y = ${MT(f)}, x ∈ [0 ; 1], autour de l'axe Ox :`,
    options: [{ html: MT(piText(q(1, 2 * n + 1))), correct: true }, { html: MT(piText(q(1, n + 1))), correct: false, rule: 'a1_volume_no_square' },
      { html: MT(N(q(1, 2 * n + 1))), correct: false }, { html: MT(piText(q(2, n + 2))), correct: false }],
    key: `${AP}:mcq:Vpow:${n}`, expectedSec: 240, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `V = π∫₀¹ (${MT(f)})² dx = π∫₀¹ x^${2 * n} dx = ${MT(piText(q(1, 2 * n + 1)))}.`, note: '' }],
  }, rng);
}

// ======================================================================

export const GEN = {
  [IE]: (level, rng, profile, opts = {}) => ieItem(level, rng, opts),
  [FT]: (level, rng, profile, opts = {}) => ftItem(opts.exam ? 4 : level, rng, opts),
  ...IMPROPER,
  [AP]: (level, rng, profile, opts = {}) => apItem(opts.exam === 'open' ? 5 : level, rng, opts),
};

// Generators of module A1, part i (unit `analyse1`, step U4): series,
// convergence tests. Catalogue: docs/universite/A1-analyse-1.md (« Séries
// numériques »). Skills: js/content/uni/analyse1-i.skills.js; helpers in
// analyse1-i-kit.js; the series with a parameter (a1-ser-param, exam
// example E6) in analyse1-i-param.js.
//
// A series item is made of parts (segments): limits of sequences (judge
// `limit`, n whole, n → +∞), Leibniz's decrease as a chain of lower bounds
// xₙ − xₙ₊₁ ≥ … ≥ 0 (`equiv` with rel '≥' and from), and a conclusion part
// opened by the verdict of convention 5 (« Nature ? », « Quel critère
// conclut ? », two decisions) where the key number is written once more
// (lim uₙ, ρ, or the exponent p of the Riemann series, judge `value`).
// Levels (spec §8.3): 1–2 guided (blanks), 3 « choose the action » (a menu
// per reference line), 4 free with 3 hints, 5 alone (mcq, tf or lines
// without help). opts.exam = 'mcq' | 'tf' gives the exam variants; a false
// true/false statement has a sequence counter-example (js/judges/counters.js).

import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { stripParen } from '../../cas/ast.js';
import { MT, linesItem, mcq, tfItem, examTag } from './kit.js';
import {
  q, N, modeOf, H, E, blanked, partsScript, fr, sup,
  LIM, KEYS_S, P_NUM, nPow, bHtml, natureDecision, criterionDecision, uniq, seqCounter, limitIs,
} from './analyse1-i-kit.js';
import { GEN as PARAM } from './analyse1-i-param.js';

const co = (k, s) => (k === 1 ? s : `${k}${s}`);
const SER = (u) => MT(`sum(${u},n,1,∞)`, { vars: ['n'] });
const SERX = (html) => `Σ<sub>n≥1</sub> ${html}`;
const VALUE_P = (p) => ({ kind: 'value', expect: String(p) });
// The last line before the value (the conclusion part restarts from it).
const beforeLast = (start, lines) => (lines.length > 1 ? lines[lines.length - 2].math : start);

// A part of a line blanked: the denominator of a fraction, else the right
// factor of a product, else the whole line.
function blankPart(line) {
  let n = stripParen(parse(line.math));
  if (n.t === 'frac') return blanked(line, [toText(stripParen(n.d))]);
  if (n.t === 'bin' && (n.op === '×' || n.op === '-' || n.op === '+')) return blanked(line, [toText(stripParen(n.r))]);
  return blanked(line, [line.math]);
}
const blankAll = (line) => blanked(line, [line.math]);

// L1: the value of each part blanked; L2: a part of the other lines too.
function guidedLines(lines, level) {
  if (level === 1) return lines.map((l, i) => (i === lines.length - 1 ? blankAll(l) : l));
  if (level === 2) return lines.map((l, i) => (i === lines.length - 1 ? blankAll(l) : blankPart(l)));
  return lines;
}

// ======================================================================
// a1-ser-necessary
// ======================================================================

const NE = 'a1-ser-necessary';
const NE_SUB = [
  { id: 'lim', label: 'limite du terme général', skill: 'a1-seq-limits' },
  { id: 'verdict', label: 'conclure', skill: NE },
];
const NE_CHOICES = [
  { id: 'divide', label: 'Diviser en haut et en bas par la plus grande puissance de n' },
  { id: 'exp', label: 'Écrire uₙ = e^(n·Log(…)) (forme 1^∞)' },
  { id: 'equiv', label: 'Faire apparaître sin u/u, avec u → 0' },
  { id: 'lim', label: 'Passer à la limite' },
  { id: 'conv0', label: 'uₙ → 0 : conclure que la série converge', rule: 'a1_series_term_to_zero', why: 'Σ 1/n diverge alors que 1/n → 0 : uₙ → 0 est nécessaire, pas suffisant.' },
];

// {u, html?, abs?, start, lines, L, zero}
function neData(rng, kind) {
  const k = rng.int(1, 3);
  const c = rng.int(1, 6);
  switch (kind) {
    case 'rat': {
      const a = rng.int(1, 5);
      const b = rng.int(2, 5);
      const u = `${co(a, 'n')}/(${b}n+${c})`;
      return { u, start: u, L: N(q(a, b)), lines: [E(`${a}/(${b}+${c}/n)`, 'Diviser en haut et en bas par n', 'lim', 'divide'), E(N(q(a, b)), 'Passer à la limite', 'lim', 'lim')] };
    }
    case 'rat2': {
      const a = rng.int(1, 4);
      const b = rng.int(2, 5);
      const d = rng.int(1, 5);
      const u = `(${co(a, 'n^2')}+${d})/(${b}n^2+${c}n)`;
      return { u, start: u, L: N(q(a, b)), lines: [E(`(${a}+${d}/n^2)/(${b}+${c}/n)`, 'Diviser en haut et en bas par n²', 'lim', 'divide'), E(N(q(a, b)), 'Passer à la limite', 'lim', 'lim')] };
    }
    case 'exp': {
      const u = `(1+${k}/n)^n`;
      const L = k === 1 ? 'e' : `e^${k}`;
      return { u, start: u, L, lines: [E(`e^(n×ln(1+${k}/n))`, `Forme 1^∞ : e^(n·Log(1 + ${k}/n))`, 'lim', 'exp'), E(L, `n·Log(1 + ${k}/n) → ${k}`, 'lim', 'lim')] };
    }
    case 'cos': {
      const u = `cos(${k}/n)`;
      return { u, start: u, L: '1', lines: [E('1', `${k}/n → 0 et cos 0 = 1`, 'lim', 'lim')] };
    }
    case 'sin': {
      const u = `n×sin(${k}/n)`;
      const r = k === 1 ? 'sin(1/n)/(1/n)' : `${k}×sin(${k}/n)/(${k}/n)`;
      return { u, start: u, L: String(k), lines: [E(r, 'Faire apparaître sin u/u, u → 0', 'lim', 'equiv'), E(String(k), 'sin u/u → 1', 'lim', 'lim')] };
    }
    case 'alt': {
      const u = `(-1)^n×n/(n+${c})`;
      return { u, abs: true, start: `n/(n+${c})`, L: '1', lines: [E(`1/(1+${c}/n)`, 'Diviser par n', 'lim', 'divide'), E('1', '|uₙ| → 1 : uₙ ne tend pas vers 0', 'lim', 'lim')] };
    }
    case 'z1': {
      const u = `${k}/(n+${c})`;
      return { u, start: u, L: '0', zero: true, lines: [E(`(${k}/n)/(1+${c}/n)`, 'Diviser par n', 'lim', 'divide'), E('0', 'Passer à la limite', 'lim', 'lim')] };
    }
    case 'z2': {
      const u = `n/(n^2+${c})`;
      return { u, start: u, L: '0', zero: true, lines: [E(`(1/n)/(1+${c}/n^2)`, 'Diviser par n²', 'lim', 'divide'), E('0', 'Passer à la limite', 'lim', 'lim')] };
    }
    case 'z3': {
      const u = rng.pick(['1/√n', '1/n', `sin(${k}/n)`, `ln(1+${k}/n)`]);
      return { u, start: u, L: '0', zero: true, lines: [E('0', 'Passer à la limite', 'lim', 'lim')] };
    }
    default: return null;
  }
}
const NE_DIV = ['rat', 'rat2', 'exp', 'cos', 'sin', 'alt'];
const NE_ZERO = ['z1', 'z2', 'z3'];

function neVerdict(d) {
  const div = !d.zero;
  return { kind: 'decision', prompt: 'Que dit la condition nécessaire ?', options: [
    { id: 'div', label: 'La série diverge : son terme général ne tend pas vers 0', valid: div, why: 'uₙ → 0 : la condition nécessaire est remplie, elle ne dit rien de plus.' },
    { id: 'unknown', label: 'On ne sait pas encore : uₙ → 0 ne suffit pas, il faut un autre critère', valid: !div, why: `${d.abs ? '|uₙ|' : 'uₙ'} → ${sup(d.L)} ≠ 0 : la série diverge, sans autre critère.` },
    { id: 'conv', label: 'La série converge, car uₙ → 0', valid: false, ...(div ? {} : { rule: 'a1_series_term_to_zero' }), why: div ? `uₙ ne tend pas vers 0 (${d.abs ? '|uₙ|' : 'uₙ'} → ${sup(d.L)}).` : 'Σ 1/n diverge alors que 1/n → 0 : uₙ → 0 est nécessaire, pas suffisant.' },
  ] };
}

function neItem(level, rng, opts = {}) {
  if (opts.exam === 'tf' || level === 5) return neTf(rng, level, opts);
  if (level === 4 && rng.next() < 0.5) return neMcq(rng);
  const d = neData(rng, rng.next() < 0.3 ? rng.pick(NE_ZERO) : rng.pick(NE_DIV));
  const lines = guidedLines(d.lines, level);
  const concl = [E(d.L, d.zero ? 'uₙ → 0 : il faudra un autre critère' : `Limite ${sup(d.L)} ≠ 0`, 'verdict', 'lim')];
  const parts = [
    { start: d.start, judge: LIM, lines },
    { html: 'Conclusion : rappelle la limite du terme général.', ask: d.abs ? 'lim |uₙ| =' : 'lim uₙ =', start: beforeLast(d.start, d.lines), judge: LIM, pre: [neVerdict(d)], lines: level === 1 ? concl.map(blankAll) : concl },
  ];
  const { start, judge, script } = partsScript(parts, level, NE_CHOICES);
  const what = d.abs ? `Calcule d'abord la limite de |uₙ| = ${MT(d.start, { vars: ['n'] })}.` : `Calcule d'abord la limite du terme général uₙ = ${MT(d.u, { vars: ['n'] })}.`;
  return linesItem({
    skill: NE, level, mode: modeOf(level), start, judge, script,
    prompt: `Que dit la condition nécessaire sur ${SER(d.u)} ? ${what}`,
    hints: H('Regarde d\'abord si le terme général tend vers 0.', `${d.abs ? '|uₙ|' : 'uₙ'} → ▢`,
      d.zero ? 'uₙ → 0 : la condition nécessaire ne dit rien, il faut un autre critère.' : `${d.abs ? '|uₙ|' : 'uₙ'} → ${sup(d.L)} ≠ 0 : la série diverge.`),
    subgoals: NE_SUB, keys: KEYS_S, tapActions: level === 3 ? 'steps' : null,
    key: `${NE}:${level}:${d.u}`, exam: examTag(opts),
  });
}

// L4: which of four series can be called divergent by the term test alone?
function neMcq(rng) {
  const oneDiv = rng.next() < 0.5;
  const picks = [];
  const add = (pool) => {
    for (let i = 0; i < 30; i++) {
      const d = neData(rng, rng.pick(pool));
      if (!picks.some((x) => x.u === d.u)) { picks.push(d); return; }
    }
  };
  add(oneDiv ? NE_DIV : NE_ZERO);
  for (let i = 0; i < 3; i++) add(oneDiv ? NE_ZERO : NE_DIV);
  const right = picks[0];
  const options = picks.map((d, i) => ({ html: SER(d.u), correct: i === 0, ...(i > 0 && !oneDiv ? {} : {}) }));
  const prompt = oneDiv
    ? 'Une seule de ces séries diverge par la condition nécessaire (son terme général ne tend pas vers 0). Laquelle ?'
    : 'Pour une seule de ces séries, la condition nécessaire ne permet pas de conclure. Laquelle ?';
  return mcq({
    skill: NE, level: 4, prompt, options, key: `${NE}:mcq:${picks.map((d) => d.u).join('|')}`, expectedSec: 90,
    solution: [{ html: `${right.abs ? '|uₙ|' : 'uₙ'} = ${MT(right.start, { vars: ['n'] })} → ${sup(right.L)}${oneDiv ? ' ≠ 0 : cette série diverge. Les autres termes tendent vers 0 : il faut un autre critère.' : ' : il faut un autre critère. Les autres termes ne tendent pas vers 0 : ces séries divergent.'}`, note: '' }],
  }, rng);
}

function neTf(rng, level, opts) {
  const exam = opts.exam ? { format: 'tf', points: 1 } : false;
  const T = (o) => tfItem({ skill: NE, level, exam, noHints: level === 5, hints: H('Une condition nécessaire n\'est pas suffisante.', 'Pense à Σ 1/n.', 'Cherche une suite simple qui vérifie l\'hypothèse et pas la conclusion.'), ...o });
  const kind = rng.pick(['zero', 'zero', 'nan', 'fn', 'prod', 'nec', 'contra']);
  if (kind === 'zero') {
    const k = rng.int(1, 3);
    return T({ statement: 'Si aₙ → 0, alors Σ aₙ converge.', truth: false, key: `zero${k}`,
      counter: seqCounter([{ p: 'toZero' }], { p: 'seriesConverges' }, { a: k === 1 ? '1/n' : `${k}/n` }),
      ruleIfTrue: 'a1_series_term_to_zero', explanation: 'Faux : 1/n → 0 et Σ 1/n diverge. uₙ → 0 est nécessaire, pas suffisant.' });
  }
  if (kind === 'nan') {
    return T({ statement: 'Si Σ aₙ converge, alors n·aₙ → 0.', truth: false, key: 'nan',
      counter: seqCounter([{ p: 'seriesConverges' }], { p: 'toZero', of: 'n×a', say: 'n·aₙ tend vers 0' }, { a: '(-1)^n/√n' }),
      explanation: 'Faux : aₙ = (−1)ⁿ/√n donne une série convergente (Leibniz), mais n·aₙ = (−1)ⁿ√n ne tend pas vers 0.' });
  }
  if (kind === 'fn') {
    return T({ statement: 'Si f(n) > n pour tout n ≥ 1, alors Σ 1/f(n) converge.', truth: false, key: 'fn',
      counter: { ...seqCounter([{ p: 'positive', of: 'a-n', say: 'f(n) − n est positif' }], { p: 'seriesConverges', of: '1/a', say: 'Σ 1/f(n) converge' }, { a: 'n+1' }), ask: [{ v: 'a', label: 'f(n) =', keys: ['calc', 'seq'] }] },
      ruleIfTrue: 'a1_series_term_to_zero', explanation: 'Faux : f(n) = n + 1 > n, et Σ 1/(n + 1) diverge comme Σ 1/n.' });
  }
  if (kind === 'prod') {
    return T({ statement: 'Si Σ aₙ diverge et bₙ → 0, alors Σ aₙbₙ converge.', truth: false, key: 'prod',
      counter: seqCounter([{ p: 'seriesDiverges', of: 'a' }, { p: 'toZero', of: 'b' }], { p: 'seriesConverges', of: 'a×b', say: 'Σ aₙbₙ converge' }, { a: '1', b: '1/n' }, { seqs: ['a', 'b'] }),
      ruleIfTrue: 'a1_series_term_to_zero', explanation: 'Faux : aₙ = 1, bₙ = 1/n : Σ 1 diverge, bₙ → 0, et Σ aₙbₙ = Σ 1/n diverge.' });
  }
  if (kind === 'nec') {
    return T({ statement: 'Si Σ aₙ converge, alors aₙ → 0.', truth: true, key: 'nec',
      explanation: 'Vrai : aₙ = Sₙ − Sₙ₋₁, et les deux sommes partielles tendent vers la même limite.' });
  }
  return T({ statement: 'Si aₙ ne tend pas vers 0, alors Σ aₙ diverge.', truth: true, key: 'contra',
    explanation: 'Vrai : c\'est la contraposée de « Σ aₙ converge ⇒ aₙ → 0 ».' });
}

// ======================================================================
// a1-ser-compare
// ======================================================================

const CP = 'a1-ser-compare';
const CP_SUB = [
  { id: 'quot', label: 'terme dominant, limite du quotient', skill: 'a1-seq-limits' },
  { id: 'criterion', label: 'critère de comparaison', skill: CP },
];
const CP_CHOICES = [
  { id: 'dominant', label: 'Diviser par la plus grande puissance de n (terme dominant)' },
  { id: 'conj', label: 'Multiplier par la quantité conjuguée' },
  { id: 'equiv', label: 'Faire apparaître sin u/u ou Log(1 + u)/u, avec u → 0' },
  { id: 'lim', label: 'Passer à la limite' },
  { id: 'riemann', label: 'Lire l\'exposant p de la série de Riemann' },
  { id: 'major', label: 'Majorer aₙ par une série divergente et conclure', rule: 'a1_compare_wrong_direction', why: 'Être plus petit qu\'une série divergente ne dit rien : on majore par une série convergente, ou on minore par une série divergente.' },
];
const P_LIST = ['1/2', '1', '3/2', '2', '3'];
const npw = (m) => (m === 1 ? 'n' : `n^${m}`);

// {a (aₙ), p, L, start (n^p·aₙ), lines, conv}
function cpData(rng, kind) {
  if (kind === 'rat') {
    const m = rng.pick([2, 3]);
    const lin = rng.next() < 0.6;
    const p = lin ? m - 1 : m;
    const b = rng.int(1, 6);
    const j = rng.pick([0, 1]);
    const den = `${npw(m)}+${j ? `${co(b, 'n')}` : b}`;
    const a = rng.int(1, 6);
    const k = rng.int(1, 5);
    const an = lin ? `(n+${a})/(${den})` : `${k}/(${den})`;
    const denQ = `(1+${b}/${npw(m - j)})`;
    const lines = [E(lin ? `(1+${a}/n)/${denQ}` : `${k}/${denQ}`, sup(`Diviser en haut et en bas par n^${m}`), 'quot', 'dominant'), E(lin ? '1' : String(k), 'Passer à la limite', 'quot', 'lim')];
    return { kind, a: an, p: String(p), L: lin ? '1' : String(k), start: `${nPow(String(p))}×${an}`, lines };
  }
  if (kind === 'sqrt') {
    const a = rng.int(1, 4);
    const half = rng.next() < 0.5;
    const an = half ? `√(n+${a})-√n` : `(√(n+${a})-√n)/n`;
    const p = half ? '1/2' : '3/2';
    const L = N(q(a, 2));
    const lines = [
      E(`${co(a, '√n')}/(√(n+${a})+√n)`, 'Multiplier par la quantité conjuguée', 'quot', 'conj'),
      E(`${a}/(√(1+${a}/n)+1)`, 'Diviser par √n', 'quot', 'dominant'),
      E(L, 'Passer à la limite', 'quot', 'lim'),
    ];
    return { kind, a: an, p, L, start: half ? `√n×(${an})` : `n^(3/2)×${an}`, lines };
  }
  if (kind === 'trig') {
    const m = rng.pick([1, 2, 2]);
    const k = rng.int(1, 4);
    const fn = rng.pick(['sin', 'ln']);
    const u = `${k}/${npw(m)}`;
    const an = fn === 'sin' ? `sin(${u})` : `ln(1+${u})`;
    const r = `${k === 1 ? '' : `${k}×`}${an}/(${u})`;
    return {
      kind, a: an, p: String(m), L: String(k), start: `${npw(m)}×${an}`,
      lines: [E(r, `${fn === 'sin' ? 'sin u/u' : 'Log(1 + u)/u'} avec u = ${sup(u)} → 0`, 'quot', 'equiv'), E(String(k), `${fn === 'sin' ? 'sin u/u' : 'Log(1 + u)/u'} → 1`, 'quot', 'lim')],
    };
  }
  if (kind === 'cos') {
    const k = rng.int(1, 2);
    const an = `1-cos(${k}/n)`;
    return { kind, a: an, p: '2', L: N(q(k * k, 2)), start: `n^2×(${an})`, lines: [E(N(q(k * k, 2)), '1 − cos u ~ u²/2, u → 0', 'quot', 'equiv')] };
  }
  // prod (L5): (√(n + a + c) − √(n + a))·sin(k/n) ~ ck/(2n^(3/2)).
  // Some differences of roots lose too many digits for the numeric limit
  // of the judge: they are drawn again.
  for (let i = 0; i < 30; i++) {
    const d = cpProd(rng);
    if (limitIs(d.start, d.L)) return d;
  }
  return cpProd(null);
}
function cpProd(rng) {
  const a = rng ? rng.int(0, 3) : 1;
  const c = rng ? rng.int(1, 2) : 1;
  const k = rng ? rng.int(1, 3) : 1;
  const s0 = a === 0 ? '√n' : `√(n+${a})`;
  const an = `(√(n+${a + c})-${s0})×sin(${k}/n)`;
  return {
    kind: 'prod', a: an, p: '3/2', L: N(q(c * k, 2)), start: `n^(3/2)×${an}`,
    lines: [
      E(`${co(c, '√n')}/(√(n+${a + c})+${s0})×sin(${k}/n)/(1/n)`, 'Conjuguée, et n^(3/2) = √n·n', 'quot', 'conj'),
      E(N(q(c * k, 2)), `√n/(√(n + …) + √(n + …)) → 1/2 et sin(${k}/n)/(1/n) → ${k}`, 'quot', 'lim'),
    ],
  };
}
const cpConv = (d) => P_NUM[d.p] > 1;

function bDecision(d) {
  const i = P_LIST.indexOf(d.p);
  const others = [P_LIST[i - 1], P_LIST[i + 1], P_LIST[i + 2]].filter(Boolean).slice(0, 2);
  return { kind: 'decision', prompt: 'À quelle série de Riemann Σ bₙ compares-tu Σ aₙ ?', options: [
    { id: 'b', label: `bₙ = ${bHtml(d.p)}`, valid: true, ref: true },
    ...others.map((p) => ({ id: `w${p}`, label: `bₙ = ${bHtml(p)}`, valid: false, why: `Avec bₙ = ${bHtml(p)}, aₙ/bₙ → ${P_NUM[p] < P_NUM[d.p] ? '0' : '+∞'} : la comparaison ne conclut pas. Garde le terme dominant de aₙ.` })),
  ] };
}

function cpNature(d) {
  const conv = cpConv(d);
  if (conv) {
    return natureDecision('abs', {
      rules: d.p === '3/2' ? { div: 'a1_riemann_p_boundary' } : {},
      whys: { div: `Σ 1/nᵖ converge si et seulement si p > 1 : ici p = ${fr(d.p)}.`, semi: 'Termes positifs : converger, c\'est converger absolument.' },
    });
  }
  return natureDecision('div', {
    rules: d.p === '1' ? { abs: 'a1_riemann_p_boundary', semi: 'a1_riemann_p_boundary' } : {},
    whys: { abs: `p = ${fr(d.p)} ≤ 1 : Σ 1/nᵖ diverge, et Σ aₙ a la même nature.`, semi: `p = ${fr(d.p)} ≤ 1 : Σ 1/nᵖ diverge, et Σ aₙ (termes positifs) aussi.` },
  });
}

function cpItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return cpMcq(rng, 4, true);
  if (opts.exam === 'tf') return cpTf(rng);
  if (level === 5 && rng.next() < 0.5) return cpMcq(rng, 5, false);
  const d = cpData(rng, level === 5 ? 'prod' : rng.pick(['rat', 'rat', 'sqrt', 'trig']));
  const lines = guidedLines(d.lines, level);
  const concl = [E(d.p, `bₙ = ${bHtml(d.p)} : p = ${fr(d.p)}${cpConv(d) ? ' > 1' : ' ≤ 1'}`, 'criterion', 'riemann')];
  const parts = [
    { start: d.start, judge: LIM, pre: level >= 2 && level <= 4 ? [bDecision(d)] : [], lines },
    { html: 'Conclusion : quel est l\'exposant p de la série de Riemann ?', ask: 'p =', start: 'p', judge: VALUE_P(d.p), pre: [cpNature(d), criterionDecision('cmp', ['term', 'ratio', 'leibniz'])], lines: level === 1 ? concl.map(blankAll) : concl },
  ];
  const { start, judge, script } = partsScript(parts, level, CP_CHOICES);
  const given = level === 1 ? ` Compare à bₙ = ${bHtml(d.p)} : calcule la limite de aₙ/bₙ.` : ' Calcule la limite de aₙ/bₙ pour la série de Riemann Σ bₙ qui convient.';
  return linesItem({
    skill: CP, level, mode: modeOf(level), start, judge, script,
    prompt: `Nature de ${SER(d.a)} (termes positifs) ?${given}`,
    hints: H('Garde les termes qui dominent (ou remplace sin u, Log(1 + u) par u) : à quelle série de Riemann cela ressemble-t-il ?',
      `aₙ/bₙ = ${MT(d.start, { vars: ['n'] })} → ▢`,
      `bₙ = ${bHtml(d.p)}, aₙ/bₙ → ${fr(d.L)}, p = ${fr(d.p)}${cpConv(d) ? ' > 1 : converge' : ' ≤ 1 : diverge'}.`),
    subgoals: CP_SUB, keys: KEYS_S, tapActions: level === 3 ? 'steps' : null,
    key: `${CP}:${level}:${d.a}`, exam: examTag(opts),
  });
}

function cpMcq(rng, level, exam) {
  const tag = exam ? { format: 'mcq', points: 1 } : false;
  if (rng.next() < 0.35) {
    // A difference where an equivalent replaced in a sum gives 0.
    const k = rng.int(1, 3);
    const sinCase = rng.next() < 0.6;
    const an = sinCase ? `${k}/n-sin(${k}/n)` : `${k}/n-ln(1+${k}/n)`;
    const c = sinCase ? N(q(k ** 3, 6)) : N(q(k * k, 2));
    const pw = sinCase ? 3 : 2;
    const eq = `${c === '1' ? '' : `${fr(c)}·`}1/n${pw === 3 ? '³' : '²'}`;
    const options = [
      { html: `Converge : aₙ ~ ${eq} (développement limité), p = ${pw} > 1.`, correct: true },
      { html: `On ne peut pas conclure : ${sinCase ? 'sin' : 'Log(1 + ·)'}(${k}/n) ~ ${k}/n, donc aₙ ~ ${k}/n − ${k}/n = 0.`, correct: false, rule: 'a1_ipe_in_sum' },
      { html: `Diverge : 0 ≤ aₙ ≤ ${k}/n, et Σ ${k}/n diverge.`, correct: false, rule: 'a1_compare_wrong_direction' },
      { html: 'Converge, car aₙ → 0.', correct: false, rule: 'a1_series_term_to_zero' },
    ];
    return mcq({
      skill: CP, level, prompt: `Nature de ${SER(an)} (termes positifs) ?`, options, key: `${CP}:mcq:${an}`, expectedSec: 240, exam: tag,
      solution: [{ html: `${sinCase ? `sin u = u − u³/6 + u³ε(u)` : 'Log(1 + u) = u − u²/2 + u²ε(u)'} avec u = ${k}/n : aₙ ~ ${eq}. Σ 1/n${pw === 3 ? '³' : '²'} converge, donc la série converge. On ne remplace pas par un équivalent dans une différence.`, note: '' }],
    }, rng);
  }
  const d = cpData(rng, rng.pick(['rat', 'rat', 'sqrt', 'trig']));
  const conv = cpConv(d);
  const pHtml = `p = ${fr(d.p)}`;
  const options = [
    { html: `${conv ? 'Converge' : 'Diverge'} : aₙ/(${bHtml(d.p)}) → ${fr(d.L)} ∈ ]0 ; +∞[, et ${pHtml}${conv ? ' > 1' : ' ≤ 1'}.`, correct: true },
    conv
      ? { html: `Diverge : 0 ≤ aₙ ≤ 1/√n pour n assez grand, et Σ 1/√n diverge.`, correct: false, rule: 'a1_compare_wrong_direction' }
      : { html: `Converge : aₙ ≥ 1/n³ pour n assez grand, et Σ 1/n³ converge.`, correct: false, rule: 'a1_compare_wrong_direction' },
  ];
  if (d.p === '1') options.push({ html: 'Converge : aₙ ~ c/n avec c > 0, et Σ 1/n converge.', correct: false, rule: 'a1_riemann_p_boundary' });
  else if (d.p === '3/2') options.push({ html: 'Diverge : aₙ ~ c/n^(3/2), et Σ 1/nᵖ ne converge que pour p ≥ 2.', correct: false, rule: 'a1_riemann_p_boundary' });
  else if (d.p === '1/2') options.push({ html: 'Converge : aₙ ~ c/√n, avec p = 1/2 > 0.', correct: false, rule: 'a1_riemann_p_boundary' });
  else options.push({ html: `Diverge : aₙ/(${bHtml(d.p)}) → ${fr(d.L)} ≠ 0, donc aₙ ne tend pas vers 0.`, correct: false });
  options.push(conv
    ? { html: `On ne peut pas conclure : aₙ/(1/n) → 0.`, correct: false }
    : { html: 'Converge, car aₙ → 0.', correct: false, rule: 'a1_series_term_to_zero' });
  return mcq({
    skill: CP, level, prompt: `Nature de ${SER(d.a)} (termes positifs) ?`, options: uniq(options), key: `${CP}:mcq:${d.a}`, expectedSec: 240, exam: tag,
    solution: [{ html: `bₙ = ${bHtml(d.p)} : aₙ/bₙ = ${MT(d.start, { vars: ['n'] })} → ${fr(d.L)}. Même nature que Σ ${bHtml(d.p)}, qui ${conv ? 'converge' : 'diverge'} (${pHtml}).`, note: '' }],
  }, rng);
}

function cpTf(rng) {
  const exam = { format: 'tf', points: 1 };
  const kind = rng.pick(['sin2', 'square', 'dir', 'dir', 'equiv', 'riemann']);
  if (kind === 'sin2') {
    const k = rng.int(1, 3);
    return tfItem({ skill: CP, level: 4, exam, statement: `Σ sin(${k}/n²) converge.`, truth: true, key: `sin2${k}`,
      explanation: `Vrai : sin(${k}/n²)/(1/n²) → ${k} ∈ ]0 ; +∞[, et Σ 1/n² converge (p = 2 > 1).` });
  }
  if (kind === 'square') {
    return tfItem({ skill: CP, level: 4, exam, statement: 'Si aₙ ≥ 0 et Σ aₙ converge, alors Σ aₙ² converge.', truth: true, key: 'square',
      explanation: 'Vrai : aₙ → 0, donc 0 ≤ aₙ ≤ 1 pour n assez grand, et alors aₙ² ≤ aₙ.' });
  }
  if (kind === 'dir') {
    return tfItem({ skill: CP, level: 4, exam, statement: 'Si 0 ≤ aₙ ≤ bₙ et Σ aₙ converge, alors Σ bₙ converge.', truth: false, key: 'dir',
      counter: seqCounter([{ p: 'positive', of: 'a' }, { p: 'positive', of: 'b-a', say: 'aₙ < bₙ' }, { p: 'seriesConverges', of: 'a' }], { p: 'seriesConverges', of: 'b' }, { a: '1/(2n^2)', b: '1/n' }, { seqs: ['a', 'b'] }),
      ruleIfTrue: 'a1_compare_wrong_direction', explanation: 'Faux : aₙ = 1/(2n²) ≤ bₙ = 1/n, Σ aₙ converge et Σ bₙ diverge. Le critère va dans l\'autre sens : on majore par une série convergente.' });
  }
  if (kind === 'equiv') {
    return tfItem({ skill: CP, level: 4, exam, statement: 'Si aₙ/bₙ → 1 et Σ bₙ converge, alors Σ aₙ converge (aₙ et bₙ de signe quelconque).', truth: false, key: 'equiv',
      counter: seqCounter([{ p: 'limit', of: 'a/b', value: '1', say: 'aₙ/bₙ tend vers 1' }, { p: 'seriesConverges', of: 'b' }], { p: 'seriesConverges', of: 'a' }, { a: '(-1)^n/√n+1/n', b: '(-1)^n/√n' }, { seqs: ['a', 'b'] }),
      explanation: 'Faux : bₙ = (−1)ⁿ/√n (Leibniz), aₙ = bₙ + 1/n : aₙ/bₙ = 1 + (−1)ⁿ/√n → 1, mais Σ aₙ diverge. La limite du quotient demande des termes positifs.' });
  }
  return tfItem({ skill: CP, level: 4, exam, statement: 'Σ 1/nᵖ converge pour tout p ≥ 1.', truth: false, key: 'riemann',
    counter: { kind: 'refute', quants: [{ q: '∀', v: 'p', dom: 'R' }], pred: 'p>1', hyp: 'p≥1', ask: [{ v: 'p', label: 'p =' }], answer: { p: '1' } },
    ruleIfTrue: 'a1_riemann_p_boundary', explanation: 'Faux : p = 1 donne la série harmonique Σ 1/n, qui diverge. Il faut p > 1 strictement.' });
}

// ======================================================================
// a1-ser-ratio-root
// ======================================================================

const RR = 'a1-ser-ratio-root';
const RR_SUB = [
  { id: 'simplify', label: 'former et simplifier le rapport', skill: 'a1-seq-ratio' },
  { id: 'lim1', label: 'limite 1^∞', skill: 'a1-seq-1inf' },
  { id: 'verdict', label: 'conclure', skill: RR },
];
const RR_CHOICES = [
  { id: 'simplify', label: 'Simplifier (factorielles, facteurs communs)' },
  { id: 'divide', label: 'Diviser par la plus grande puissance de n' },
  { id: 'onepow', label: 'Forme 1^∞ : (1 + 1/n)ⁿ → e' },
  { id: 'lim', label: 'Passer à la limite' },
  { id: 'termwise', label: 'Le rapport est < 1 pour tout n : conclure', rule: 'a1_ratio_lt1_termwise', why: 'Il faut la limite ρ (ou un q < 1 fixe) : 1/n vérifie aₙ₊₁/aₙ < 1 et Σ 1/n diverge.' },
];

// {kind: 'ratio' | 'root', html (aₙ), formed, lines, rho, conv}
function rrData(rng, kind) {
  if (kind === 'fact2') {
    const c = rng.pick([1, 2, 3, 5, 6, 7]);
    const rho = N(q(c, 4));
    return {
      kind: 'ratio', html: `${c === 1 ? '' : `${c}ⁿ`}(n!)²/(2n)!`, formed: `${co(c, '(n+1)^2')}/((2n+2)(2n+1))`, rho, conv: c < 4,
      lines: [E(`${co(c, '(n+1)')}/(2(2n+1))`, 'Simplifier par 2n + 2 = 2(n + 1)', 'simplify', 'simplify'), E(rho, 'Passer à la limite', 'simplify', 'lim')],
    };
  }
  if (kind === 'factpow') {
    const c = rng.pick([1, 2]);
    const rho = c === 1 ? 'e^(-1)' : 'e^(-1)/2';
    return {
      kind: 'ratio', html: `n!/${c === 1 ? 'nⁿ' : '(2n)ⁿ'}`, formed: `(n/(n+1))^n${c === 1 ? '' : '/2'}`, rho, conv: true,
      lines: [E(`1/(${c === 1 ? '' : '2'}(1+1/n)^n)`, '(n/(n + 1))ⁿ = 1/(1 + 1/n)ⁿ', 'lim1', 'onepow'), E(rho, '(1 + 1/n)ⁿ → e', 'lim1', 'lim')],
    };
  }
  if (kind === 'powfact') {
    const p = rng.pick([1, 2]);
    const c = rng.pick([2, 3, 5]);
    return {
      kind: 'ratio', html: `${p === 1 ? 'n' : 'n²'}·${c}ⁿ/n!`, formed: p === 1 ? `${c}(n+1)/(n(n+1))` : `${c}(n+1)^2/(n^2(n+1))`, rho: '0', conv: true,
      lines: [E(p === 1 ? `${c}/n` : `${c}(n+1)/n^2`, 'Simplifier par n + 1', 'simplify', 'simplify'), E('0', 'Passer à la limite', 'simplify', 'lim')],
    };
  }
  if (kind === 'rootfrac') {
    for (let i = 0; i < 50; i++) {
      const a = rng.int(1, 6);
      const b = rng.int(2, 6);
      if (a === b || q(a, b).d !== b) continue;
      const rho = N(q(a, b));
      return {
        kind: 'root', html: `(${co(a, 'n')}/(${b}n + 1))ⁿ`, formed: `${co(a, 'n')}/(${b}n+1)`, rho, conv: a < b,
        lines: [E(`${a}/(${b}+1/n)`, 'Diviser par n', 'simplify', 'divide'), E(rho, 'Passer à la limite', 'simplify', 'lim')],
      };
    }
  }
  const c = rng.pick([2, 3]);
  return {
    kind: 'root', html: `(1 + 1/n)^(n²)/${c}ⁿ`, formed: `(1+1/n)^n/${c}`, rho: `e/${c}`, conv: c === 3,
    lines: [E(`e^(n×ln(1+1/n))/${c}`, 'Forme 1^∞ : e^(n·Log(1 + 1/n))', 'lim1', 'onepow'), E(`e/${c}`, 'n·Log(1 + 1/n) → 1', 'lim1', 'lim')],
  };
}
const RR_KINDS = ['fact2', 'fact2', 'factpow', 'powfact', 'rootfrac', 'rootfrac', 'rooteuler'];
const rhoHtml = (rho) => fr(rho.replace('e^(-1)/2', '1/(2e)').replace('e^(-1)', '1/e'));

function rrCriterion(d) {
  return { kind: 'decision', prompt: 'Quel critère choisis-tu ?', options: [
    { id: 'ratio', label: 'd\'Alembert : |aₙ₊₁/aₙ|', valid: d.kind === 'ratio', ...(d.kind === 'ratio' ? { ref: true } : {}), why: 'Pas de factorielle, mais une puissance n-ième : prends la racine n-ième (Cauchy).' },
    { id: 'root', label: 'Cauchy : ⁿ√|aₙ|', valid: d.kind === 'root', ...(d.kind === 'root' ? { ref: true } : {}), why: 'Des factorielles : ⁿ√(n!) ne se simplifie pas. Forme aₙ₊₁/aₙ (d\'Alembert).' },
    { id: 'cmp', label: 'Comparer à une série de Riemann', valid: false, why: 'aₙ n\'a pas d\'équivalent simple en 1/nᵖ : factorielles et puissances n-ièmes demandent d\'Alembert ou Cauchy.' },
  ] };
}

function rrItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return rrMcq(rng, 4, true);
  if (opts.exam === 'tf') return rrTf(rng);
  if (level === 5 && rng.next() < 0.5) return rrMcq(rng, 5, false);
  const d = rrData(rng, rng.pick(RR_KINDS));
  const lines = guidedLines(d.lines, level);
  const rhoQ = d.rho;
  const nat = natureDecision(d.conv ? 'abs' : 'div', {
    whys: d.conv ? { semi: 'ρ < 1 donne la convergence absolue.', div: `ρ = ${rhoHtml(rhoQ)} < 1.` }
      : { abs: `ρ = ${rhoHtml(rhoQ)} > 1 : |aₙ| ne tend même pas vers 0.`, semi: `ρ = ${rhoHtml(rhoQ)} > 1 : la série diverge.` },
  });
  const concl = [E(rhoQ, d.conv ? 'ρ < 1' : 'ρ > 1', 'verdict', 'lim')];
  const parts = [
    { start: d.formed, judge: LIM, pre: level >= 2 ? [rrCriterion(d)] : [], lines },
    { html: 'Conclusion : rappelle ρ.', ask: 'ρ =', start: beforeLast(d.formed, d.lines), judge: LIM, pre: [nat, criterionDecision(d.kind, ['term', 'cmp', d.kind === 'ratio' ? 'root' : 'ratio'])], lines: level === 1 ? concl.map(blankAll) : concl },
  ];
  const { start, judge, script } = partsScript(parts, level, RR_CHOICES);
  const formedNote = level === 1
    ? ` Par ${d.kind === 'ratio' ? 'd\'Alembert : aₙ₊₁/aₙ' : 'Cauchy : ⁿ√|aₙ|'} = ${MT(d.formed, { vars: ['n'] })}.`
    : level === 2 ? ` Choisis le critère : la ligne de départ est alors ${d.kind === 'ratio' ? 'aₙ₊₁/aₙ' : 'ⁿ√|aₙ|'}, déjà formé.` : '';
  return linesItem({
    skill: RR, level, mode: modeOf(level), start, judge, script,
    prompt: `Nature de ${SERX(sup(d.html))} ?${formedNote}`,
    hints: H(d.kind === 'ratio' ? 'Des factorielles : d\'Alembert. (n + 1)! = (n + 1)·n! et (2n + 2)! = (2n + 2)(2n + 1)·(2n)!.' : 'Une puissance n-ième : Cauchy, la racine n-ième la fait disparaître.',
      `${d.kind === 'ratio' ? 'aₙ₊₁/aₙ' : 'ⁿ√|aₙ|'} = ${MT(d.formed, { vars: ['n'] })} → ▢`,
      `ρ = ${rhoHtml(rhoQ)} ${d.conv ? '< 1 : converge absolument' : '> 1 : diverge'}.`),
    subgoals: RR_SUB, keys: KEYS_S, tapActions: level === 3 ? 'steps' : null,
    key: `${RR}:${level}:${d.html}`, exam: examTag(opts),
  });
}

function rrMcq(rng, level, exam) {
  const tag = exam ? { format: 'mcq', points: 1 } : false;
  if (rng.next() < 0.4) {
    // ρ = 1: no conclusion.
    const [an, why] = rng.pick([
      ['1/n^2', 'Σ 1/n² converge'], ['1/n', 'Σ 1/n diverge'], ['n/(n^2+1)', 'n/(n² + 1) ~ 1/n : la série diverge'],
      ['1/(n√n)', 'Σ 1/n^(3/2) converge'], ['(n+1)/(n^3+1)', '(n + 1)/(n³ + 1) ~ 1/n² : la série converge'],
    ]);
    const options = [
      { html: 'Rien : avec ρ = 1, le critère ne permet pas de conclure.', correct: true },
      { html: 'La série converge, car ρ ≤ 1.', correct: false, rule: 'a1_ratio_one' },
      { html: 'La série diverge, car ρ n\'est pas < 1.', correct: false, rule: 'a1_ratio_one' },
      { html: 'La série converge, car aₙ₊₁/aₙ < 1 pour tout n.', correct: false, rule: 'a1_ratio_lt1_termwise' },
    ];
    return mcq({
      skill: RR, level, prompt: `Pour ${SER(an)}, le critère de d'Alembert donne aₙ₊₁/aₙ → 1. Que peut-on conclure par ce critère ?`, options, key: `${RR}:mcq:one:${an}`, expectedSec: 240, exam: tag,
      solution: [{ html: `ρ = 1 : aucune conclusion (Σ 1/n diverge et Σ 1/n² converge, toutes deux avec ρ = 1). Ici, par comparaison, ${why}.`, note: '' }],
    }, rng);
  }
  const d = rrData(rng, rng.pick(RR_KINDS));
  const options = [
    { html: 'Absolument convergente', correct: d.conv },
    { html: 'Convergente, mais pas absolument', correct: false },
    { html: 'Divergente, car |aₙ| → +∞', correct: !d.conv },
    { html: 'Divergente, car |aₙ| → 1', correct: false },
  ];
  return mcq({
    skill: RR, level, prompt: `Nature de ${SERX(sup(d.html))} ?`, options, key: `${RR}:mcq:${d.html}`, expectedSec: 240, exam: tag, keepOrder: true,
    solution: [{ html: `${d.kind === 'ratio' ? 'd\'Alembert : aₙ₊₁/aₙ' : 'Cauchy : ⁿ√|aₙ|'} = ${MT(d.formed, { vars: ['n'] })} → ρ = ${rhoHtml(d.rho)} ${d.conv ? '< 1 : la série converge absolument.' : '> 1 : |aₙ| → +∞, la série diverge.'}`, note: '' }],
  }, rng);
}

function rrTf(rng) {
  const exam = { format: 'tf', points: 1 };
  const kind = rng.pick(['ge1', 'lt1', 'lt1', 'root']);
  if (kind === 'ge1') {
    return tfItem({ skill: RR, level: 4, exam, statement: 'Si bₙ ≠ 0 et |bₙ₊₁/bₙ| ≥ 1 pour tout n, alors Σ bₙ diverge.', truth: true, key: 'ge1',
      explanation: 'Vrai : |bₙ| est croissante et non nulle, donc |bₙ| ≥ |b₁| > 0 : le terme général ne tend pas vers 0.' });
  }
  if (kind === 'lt1') {
    return tfItem({ skill: RR, level: 4, exam, statement: 'Si aₙ > 0 et aₙ₊₁/aₙ < 1 pour tout n, alors Σ aₙ converge.', truth: false, key: 'lt1',
      counter: seqCounter([{ p: 'positive' }, { p: 'decreasing', say: 'la suite est décroissante (aₙ₊₁/aₙ ≤ 1)' }], { p: 'seriesConverges' }, { a: '1/n' }),
      ruleIfTrue: 'a1_ratio_lt1_termwise', explanation: 'Faux : aₙ = 1/n vérifie aₙ₊₁/aₙ = n/(n + 1) < 1, et Σ 1/n diverge. Il faut un q < 1 fixe, ou une limite ρ < 1.' });
  }
  const r = rng.pick(['1/2', '1/3', '2/3']);
  return tfItem({ skill: RR, level: 4, exam, statement: `Si ⁿ√|aₙ| → ${r}, alors Σ aₙ converge absolument.`, truth: true, key: `root${r}`,
    explanation: `Vrai : critère de Cauchy, ρ = ${r} < 1.` });
}

// ======================================================================
// a1-ser-leibniz-abs
// ======================================================================

const LB = 'a1-ser-leibniz-abs';
const LB_SUB = [
  { id: 'cmp', label: 'comparer Σ |aₙ|', skill: 'a1-ser-compare' },
  { id: 'dec', label: 'Leibniz : décroissance', skill: LB },
  { id: 'leibniz', label: 'Leibniz : conclure', skill: LB },
];
const LB_CHOICES = [
  { id: 'dominant', label: 'Diviser par la plus grande puissance de n' },
  { id: 'equiv', label: 'Faire apparaître sin u/u ou Log(1 + u)/u' },
  { id: 'common', label: 'Réduire au même dénominateur' },
  { id: 'log', label: 'Regrouper les Log' },
  { id: 'sign', label: 'C\'est positif : conclure xₙ − xₙ₊₁ ≥ 0' },
  { id: 'lim', label: 'Passer à la limite' },
  { id: 'riemann', label: 'Lire l\'exposant p de la série de Riemann' },
  { id: 'nodec', label: 'Conclure par Leibniz sans vérifier la décroissance', rule: 'a1_leibniz_no_decrease', why: 'Leibniz demande trois choses : signes alternés, |aₙ| décroissante, |aₙ| → 0.' },
];

// {html, x, p, nature: 'abs' | 'semi' | 'div', cmp: {start, lines}, dec?: {start, lines}}
function lbData(rng, kind) {
  const sg = rng.next() < 0.7 ? '(−1)ⁿ' : '(−1)ⁿ⁺¹';
  if (kind === 'pow') {
    const p = rng.pick(['1/2', '1/2', '1', '1', '2']);
    const c = rng.int(1, 5);
    const np = nPow(p);
    const np1 = p === '1/2' ? '√(n+1)' : p === '1' ? 'n+1' : '(n+1)^2';
    const x = `1/(${np}+${c})`;
    const decLines = p === '1/2'
      ? [E(`(√(n+1)-√n)/((√n+${c})(√(n+1)+${c}))`, 'Même dénominateur', 'dec', 'common'), E('0', '√(n + 1) > √n : c\'est positif', 'dec', 'sign')]
      : [E(`1/((n+${c})(n+${c + 1}))`, 'Même dénominateur', 'dec', 'common'), E('0', 'C\'est positif', 'dec', 'sign')];
    return {
      kind, html: `${sg}/(${p === '1/2' ? '√n' : p === '1' ? 'n' : 'n²'} + ${c})`, x, p, nature: p === '2' ? 'abs' : 'semi',
      cmp: { start: `${np}/(${np}+${c})`, lines: [E(`1/(1+${c}/${np})`, `Diviser par ${p === '1/2' ? '√n' : p === '1' ? 'n' : 'n²'}`, 'cmp', 'dominant'), E('1', 'Passer à la limite', 'cmp', 'lim')] },
      dec: { start: `${x}-${p === '1' ? `1/(n+${c + 1})` : `1/(${np1}+${c})`}`, lines: decLines },
    };
  }
  if (kind === 'sin') {
    const p = rng.pick(['1', '1', '2']);
    const u = p === '1' ? '1/n' : '1/n^2';
    return {
      kind, html: `${sg}·sin(1/n${p === '2' ? '²' : ''})`, x: `sin(${u})`, p, nature: p === '2' ? 'abs' : 'semi',
      cmp: { start: `${nPow(p)}×sin(${u})`, lines: [E(`sin(${u})/(${u})`, `sin u/u avec u = ${sup(u)}`, 'cmp', 'equiv'), E('1', 'sin u/u → 1', 'cmp', 'lim')] },
      dec: { start: 'sin(1/n)-sin(1/(n+1))', lines: [E('0', 'sin croît sur [0 ; 1] et 1/(n + 1) < 1/n : c\'est positif', 'dec', 'sign')] },
    };
  }
  if (kind === 'ln') {
    return {
      kind, html: `${sg}·Log(1 + 1/n)`, x: 'ln(1+1/n)', p: '1', nature: 'semi',
      cmp: { start: 'n×ln(1+1/n)', lines: [E('1', 'Log(1 + u)/u → 1 avec u = 1/n', 'cmp', 'equiv')] },
      dec: { start: 'ln(1+1/n)-ln(1+1/(n+1))', lines: [E('ln((n+1)^2/(n(n+2)))', 'Regrouper les Log', 'dec', 'log'), E('0', '(n + 1)² > n(n + 2) : le Log est positif', 'dec', 'sign')] },
    };
  }
  const c = rng.int(1, 5);
  return {
    kind: 'div', html: `${sg}·n/(n + ${c})`, x: `n/(n+${c})`, p: null, nature: 'div',
    cmp: { start: `n/(n+${c})`, lines: [E(`1/(1+${c}/n)`, 'Diviser par n', 'cmp', 'dominant'), E('1', '|aₙ| → 1', 'cmp', 'lim')] },
  };
}

function lbFirst(d) {
  return { kind: 'decision', prompt: 'Par quoi commences-tu ?', options: [
    { id: 'abs', label: 'Étudier Σ |aₙ| (convergence absolue)', valid: true, ref: true },
    { id: 'leibniz', label: 'Appliquer Leibniz tout de suite', valid: d.nature !== 'div', quality: 'poor', why: 'Leibniz donne au mieux la convergence, pas la convergence absolue : commence par Σ |aₙ|.' },
    { id: 'term', label: 'aₙ → 0, donc la série converge', valid: false, ...(d.nature === 'div' ? {} : { rule: 'a1_series_term_to_zero' }), why: d.nature === 'div' ? '|aₙ| → 1 : aₙ ne tend pas vers 0.' : 'aₙ → 0 est nécessaire, pas suffisant : Σ 1/n diverge.' },
  ] };
}
function lbHyp() {
  return { kind: 'decision', prompt: 'Que demande le critère de Leibniz pour aₙ = (−1)ⁿxₙ ?', options: [
    { id: 'all', label: 'xₙ ≥ 0, xₙ décroissante et xₙ → 0', valid: true },
    { id: 'alt0', label: 'Des signes alternés et aₙ → 0', valid: false, rule: 'a1_leibniz_no_decrease', why: 'Il manque la décroissance de xₙ : Σ (−1)ⁿ/(√n + (−1)ⁿ) a des signes alternés, aₙ → 0, et diverge.' },
    { id: 'dec', label: 'xₙ décroissante', valid: false, why: 'Il faut aussi xₙ → 0 : xₙ = 1 + 1/n décroît, et Σ (−1)ⁿxₙ diverge.' },
  ] };
}
function lbAbs(d) {
  return { kind: 'decision', prompt: `|aₙ| ~ ${bHtml(d.p)} : Σ |aₙ| …`, options: [
    { id: 'div', label: `diverge (p = ${fr(d.p)} ≤ 1) : pas de convergence absolue`, valid: true },
    { id: 'conv', label: 'converge : la série converge absolument', valid: false, ...(d.p === '1' ? { rule: 'a1_riemann_p_boundary' } : {}), why: 'Σ 1/nᵖ converge seulement si p > 1.' },
  ] };
}

function lbItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return lbMcq(rng, 4, true);
  if (opts.exam === 'tf') return lbTf(rng);
  if (level === 5) return lbMcq(rng, 5, false);
  const d = lbData(rng, rng.pick(['pow', 'pow', 'sin', 'ln', level >= 3 ? 'div' : 'pow']));
  const parts = [{ start: d.cmp.start, judge: LIM, pre: level === 2 || level === 3 ? [lbFirst(d)] : [], lines: guidedLines(d.cmp.lines, level) }];
  if (d.nature === 'semi') {
    parts.push({
      html: `Leibniz : montre que xₙ = ${MT(d.x, { vars: ['n'] })} décroît, avec xₙ − xₙ₊₁ ≥ 0.`, ask: 'xₙ − xₙ₊₁ ≥',
      start: d.dec.start, judge: { kind: 'equiv', rel: '≥', vars: ['n'], from: 1 }, pre: [lbAbs(d), ...(level === 2 || level === 3 ? [lbHyp()] : [])], lines: guidedLines(d.dec.lines, level),
    });
    parts.push({
      html: 'Conclus, puis vérifie la dernière hypothèse de Leibniz : xₙ → 0.', ask: 'lim xₙ =', start: d.x, judge: LIM,
      pre: [natureDecision('semi', { rules: { abs: 'a1_abs_conv_confused', div: 'a1_abs_conv_confused' }, whys: { abs: 'Leibniz donne la convergence, pas la convergence absolue : Σ |aₙ| diverge.', div: 'Σ |aₙ| diverge, mais Leibniz s\'applique : la série converge.' } }), criterionDecision('leibniz', ['term', 'cmp', 'ratio'])],
      lines: guidedLines([E('0', 'xₙ → 0', 'leibniz', 'lim')], level),
    });
  } else if (d.nature === 'abs') {
    parts.push({
      html: 'Conclusion : quel est l\'exposant p de la série de Riemann ?', ask: 'p =', start: 'p', judge: VALUE_P(d.p),
      pre: [natureDecision('abs', { rules: { semi: 'a1_abs_conv_confused' }, whys: { semi: 'Σ |aₙ| converge : la convergence est absolue, Leibniz n\'est pas nécessaire.', div: 'Σ |aₙ| converge, donc Σ aₙ aussi.' } }), criterionDecision('cmp', ['term', 'ratio', 'leibniz'])],
      lines: guidedLines([E(d.p, 'p = 2 > 1 : Σ |aₙ| converge', 'cmp', 'riemann')], level),
    });
  } else {
    parts.push({
      html: 'Conclusion : rappelle la limite de |aₙ|.', ask: 'lim |aₙ| =', start: beforeLast(d.cmp.start, d.cmp.lines), judge: LIM,
      pre: [natureDecision('div', { whys: { abs: '|aₙ| → 1 : le terme général ne tend pas vers 0.', semi: '|aₙ| → 1 ≠ 0 : Leibniz ne s\'applique pas, et la série diverge.' } }), criterionDecision('term', ['cmp', 'ratio', 'leibniz'])],
      lines: guidedLines([E('1', '|aₙ| → 1 ≠ 0', 'leibniz', 'lim')], level),
    });
  }
  const { start, judge, script } = partsScript(parts, level, LB_CHOICES);
  const steps = level === 1 ? (d.nature === 'semi' ? ` Étape 1 : compare |aₙ| à ${bHtml(d.p)}. Étape 2 : Leibniz avec xₙ = |aₙ|.` : d.nature === 'abs' ? ` Compare |aₙ| à ${bHtml(d.p)}.` : ' Regarde la limite de |aₙ|.') : '';
  return linesItem({
    skill: LB, level, mode: modeOf(level), start, judge, script,
    prompt: `Nature de ${SERX(sup(d.html))} : converge-t-elle absolument, seulement, ou diverge-t-elle ?${steps}`,
    hints: H('Commence par les valeurs absolues ; si Σ |aₙ| diverge, essaie Leibniz et vérifie ses trois hypothèses.',
      d.p ? `|aₙ| ~ 1/n^▢` : '|aₙ| → ▢',
      d.nature === 'semi' ? `Pas absolument (p = ${fr(d.p)}), mais Leibniz : xₙ décroît vers 0.` : d.nature === 'abs' ? `|aₙ| ~ ${bHtml(d.p)} : converge absolument.` : '|aₙ| → 1 ≠ 0 : diverge.'),
    subgoals: LB_SUB, keys: KEYS_S, tapActions: level === 3 ? 'steps' : null,
    key: `${LB}:${level}:${d.html}`, exam: examTag(opts),
  });
}

function lbMcq(rng, level, exam) {
  const tag = exam ? { format: 'mcq', points: 1 } : false;
  if (rng.next() < 0.3) {
    const options = [
      { html: 'Diverge : aₙ = (−1)ⁿ√n/(n − 1) − 1/(n − 1), une série convergente moins une divergente.', correct: true },
      { html: 'Converge par Leibniz : les signes alternent et aₙ → 0.', correct: false, rule: 'a1_leibniz_no_decrease' },
      { html: 'Converge absolument : |aₙ| → 0.', correct: false, rule: 'a1_abs_conv_confused' },
      { html: 'Converge, car aₙ → 0.', correct: false, rule: 'a1_series_term_to_zero' },
    ];
    return mcq({
      skill: LB, level, prompt: `Nature de ${MT('sum((-1)^n/(√n+(-1)^n),n,2,∞)', { vars: ['n'] })} ?`, options, key: `${LB}:mcq:noDecrease`, expectedSec: 240, exam: tag,
      solution: [{ html: 'Leibniz ne s\'applique pas : |aₙ| n\'est pas décroissante (|a₂| = 1/(√2 + 1) ≈ 0,41 < |a₃| = 1/(√3 − 1) ≈ 1,37). En multipliant par la conjuguée : aₙ = (−1)ⁿ√n/(n − 1) − 1/(n − 1) ; la première série converge (Leibniz), la seconde diverge : la série diverge.', note: '' }],
    }, rng);
  }
  const d = lbData(rng, rng.pick(['pow', 'pow', 'sin', 'ln', 'div']));
  const R = {
    abs: { html: 'Converge absolument :' },
    semi: { html: 'Converge, mais pas absolument (semi-convergente) :' },
    div: { html: 'Diverge :' },
  };
  let options;
  if (d.nature === 'semi') {
    options = [
      { html: `${R.semi.html} Σ |aₙ| diverge (comme Σ ${bHtml(d.p)}), et Leibniz s'applique.`, correct: true },
      { html: `${R.abs.html} Leibniz s'applique.`, correct: false, rule: 'a1_abs_conv_confused' },
      { html: `${R.div.html} Σ |aₙ| diverge (comme Σ ${bHtml(d.p)}).`, correct: false, rule: 'a1_abs_conv_confused' },
      { html: `${R.abs.html} |aₙ| → 0.`, correct: false, rule: 'a1_series_term_to_zero' },
    ];
  } else if (d.nature === 'abs') {
    options = [
      { html: `${R.abs.html} |aₙ| ~ ${bHtml(d.p)} et Σ ${bHtml(d.p)} converge.`, correct: true },
      { html: `${R.semi.html} Leibniz s'applique.`, correct: false, rule: 'a1_abs_conv_confused' },
      { html: `${R.div.html} Σ |aₙ| diverge.`, correct: false, rule: 'a1_riemann_p_boundary' },
      { html: `${R.abs.html} |aₙ| → 0.`, correct: false, rule: 'a1_series_term_to_zero' },
    ];
  } else {
    options = [
      { html: `${R.div.html} |aₙ| → 1 : le terme général ne tend pas vers 0.`, correct: true },
      { html: `${R.semi.html} Les signes alternent (Leibniz).`, correct: false, rule: 'a1_leibniz_no_decrease' },
      { html: `${R.abs.html} |aₙ| est bornée.`, correct: false },
      { html: `${R.div.html} Σ |aₙ| diverge, donc Σ aₙ aussi.`, correct: false, rule: 'a1_abs_conv_confused' },
    ];
  }
  return mcq({
    skill: LB, level, prompt: `Nature de ${SERX(sup(d.html))} ?`, options, key: `${LB}:mcq:${d.html}`, expectedSec: 240, exam: tag,
    solution: [{ html: d.nature === 'semi' ? `|aₙ| ~ ${bHtml(d.p)} : Σ |aₙ| diverge (p = ${fr(d.p)} ≤ 1). xₙ = |aₙ| décroît vers 0 : Leibniz, la série converge, pas absolument.`
      : d.nature === 'abs' ? `|aₙ| ~ ${bHtml(d.p)}, et Σ ${bHtml(d.p)} converge : convergence absolue.` : '|aₙ| → 1 ≠ 0 : la série diverge.', note: '' }],
  }, rng);
}

function lbTf(rng) {
  const exam = { format: 'tf', points: 1 };
  const kind = rng.pick(['pos', 'conv', 'abspow', 'all', 'alt0']);
  if (kind === 'pos') {
    return tfItem({ skill: LB, level: 4, exam, statement: 'Si aₙ ≥ 0 et Σ aₙ converge, alors Σ (−1)ⁿaₙ converge.', truth: true, key: 'pos',
      explanation: 'Vrai : |(−1)ⁿaₙ| = aₙ, donc Σ (−1)ⁿaₙ converge absolument.' });
  }
  if (kind === 'conv') {
    return tfItem({ skill: LB, level: 4, exam, statement: 'Si Σ aₙ converge, alors Σ (−1)ⁿaₙ converge.', truth: false, key: 'conv',
      counter: seqCounter([{ p: 'seriesConverges' }], { p: 'seriesConverges', of: '(-1)^n×a', say: 'Σ (−1)ⁿaₙ converge' }, { a: '(-1)^n/n' }),
      ruleIfTrue: 'a1_abs_conv_confused', explanation: 'Faux : aₙ = (−1)ⁿ/n donne une série convergente (Leibniz), mais (−1)ⁿaₙ = 1/n donne la série harmonique.' });
  }
  if (kind === 'abspow') {
    return tfItem({ skill: LB, level: 4, exam, statement: 'Si Σ |bₙ| converge, alors Σ bₙᵖ converge absolument pour tout entier p ≥ 1.', truth: true, key: 'abspow',
      explanation: 'Vrai : |bₙ| → 0, donc |bₙ| ≤ 1 pour n assez grand, et |bₙ|ᵖ ≤ |bₙ|.' });
  }
  if (kind === 'all') {
    return tfItem({ skill: LB, level: 4, exam, statement: 'Toute série convergente est absolument convergente.', truth: false, key: 'all',
      counter: seqCounter([{ p: 'seriesConverges' }], { p: 'absConverges' }, { a: '(-1)^n/n' }),
      ruleIfTrue: 'a1_abs_conv_confused', explanation: 'Faux : Σ (−1)ⁿ/n converge (Leibniz), mais Σ 1/n diverge : elle est semi-convergente.' });
  }
  return tfItem({ skill: LB, level: 4, exam, statement: 'Si les signes de aₙ alternent et aₙ → 0, alors Σ aₙ converge (n ≥ 2).', truth: false, key: 'alt0',
    counter: seqCounter([{ p: 'alternating' }, { p: 'toZero' }], { p: 'seriesConverges' }, { a: '(-1)^n/(√n+(-1)^n)' }, { from: 2 }),
    ruleIfTrue: 'a1_leibniz_no_decrease', explanation: 'Faux : aₙ = (−1)ⁿ/(√n + (−1)ⁿ) alterne et tend vers 0, mais |aₙ| ne décroît pas, et la série diverge. Leibniz demande aussi la décroissance de |aₙ|.' });
}

export const GEN = {
  [NE]: (level, rng, profile, opts = {}) => neItem(level, rng, opts),
  [CP]: (level, rng, profile, opts = {}) => cpItem(level, rng, opts),
  [RR]: (level, rng, profile, opts = {}) => rrItem(level, rng, opts),
  [LB]: (level, rng, profile, opts = {}) => lbItem(level, rng, opts),
  ...PARAM,
};

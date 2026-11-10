// a1-seq-ratio (step U4): d'Alembert's test for sequences. Three parts:
// form and simplify aₙ₊₁/aₙ (`equiv` on whole n, to the simplified ratio),
// its limit q (`limit`, whole n), then the verdict « aₙ → 0 » or « → +∞ »
// (`limit` with cfg.value: the limit of aₙ, which the CAS cannot compute
// with n!). Templates of the catalogue: nᵖ·cⁿ/n!, cⁿ·(n!)²/(2n)!,
// c^(n²)/(n!)², cⁿ·n!/nⁿ, (2n)!/c^(n²). q = 1 is left out of the lines
// items (the catalogue keeps it for « critère non concluant »).

import { linesItem, mcq, tfItem } from './kit.js';
import { modeOf, H, E, assemble, blanked } from './analyse1-c-kit.js';
import { M, LIMN, EQN, q, qt, qh, coef, pw, seqCounter } from './analyse1-g-kit.js';

const RA = 'a1-seq-ratio';
const KEYS = ['calc', 'fact', 'calcfn'];
const SUB = [
  { id: 'simp', label: 'simplifier le rapport', skill: 'rat-simplify' },
  { id: 'lim', label: 'limite du rapport', skill: 'a1-seq-limits' },
  { id: 'concl', label: 'conclure par d\'Alembert', skill: RA },
];

const FACT1 = { prompt: '(n + 1)!/n! =', ok: 'n + 1', bad: [{ label: 'n!', why: '(n + 1)! = (n + 1)·n! : le quotient vaut n + 1.' }, { label: '1', why: '(n + 1)! = (n + 1)·n! : il reste le facteur n + 1.' }] };
const FACT2 = { prompt: '(2n + 2)!/(2n)! =', ok: '(2n + 2)(2n + 1)', bad: [{ label: '2n + 2', rule: 'a1_factorial_ratio', why: 'Entre (2n)! et (2n + 2)!, il y a deux facteurs : (2n + 1) et (2n + 2).' }, { label: '2', why: 'On ne simplifie pas les « n » d\'une factorielle : (2n + 2)! = (2n + 2)(2n + 1)·(2n)!.' }] };

// Each template: aₙ, the ratio as first written, the ratio rearranged (la),
// with the factorials simplified (lb), simplified (goal); its limit lines.
// Numerators of several factors are in brackets: « / » binds tighter than
// the product.
function t1(rng) {
  const c = rng.int(2, 7);
  const p = rng.int(0, 3);
  const n1p = p === 0 ? '' : p === 1 ? '(n+1)' : `(n+1)^${p}`;
  const a = p === 0 ? `${c}^n/n!` : `(${pw(p)}×${c}^n)/n!`;
  const a1 = p === 0 ? `${c}^(n+1)/(n+1)!` : `(${n1p}×${c}^(n+1))/(n+1)!`;
  const la = `(${c}^(n+1)${n1p}×n!)/((n+1)!×${c}^n${p ? `×${pw(p)}` : ''})`;
  const lb = p === 0 ? `${c}/(n+1)` : `(${c}${n1p})/((n+1)${pw(p)})`;
  const goal = p === 0 ? `${c}/(n+1)` : p === 1 ? `${c}/n` : `(${c}${p === 2 ? '(n+1)' : `(n+1)^${p - 1}`})/n^${p}`;
  const lim = p >= 2 ? [E(`(${c}${p === 2 ? '(1+1/n)' : `(1+1/n)^${p - 1}`})/n`, 'Diviser par la plus grande puissance', 'lim', 'divide'), E('0', 'Limite du rapport', 'lim', 'lim')] : [E('0', 'Limite du rapport', 'lim', 'lim')];
  return { kind: 't1', a, start: `(${a1})/(${a})`, la, lb, goal, lim, q: '0', verdict: '0', fact: FACT1, blank: p === 0 ? ['n+1'] : [`(n+1)${pw(p)}`], qWord: '0' };
}

function t2(rng) {
  const c = rng.pick([2, 3, 5, 6, 7]);
  const a = `(${c}^n(n!)^2)/(2n)!`;
  const L = q(c, 4);
  return {
    kind: 't2', a, start: `((${c}^(n+1)((n+1)!)^2)/(2n+2)!)/(${a})`,
    la: `(${c}^(n+1)((n+1)!)^2(2n)!)/((2n+2)!×${c}^n(n!)^2)`, lb: `(${c}(n+1)^2)/((2n+2)(2n+1))`, goal: `(${c}(n+1))/(4n+2)`,
    lim: [E(`(${c}(1+1/n))/(4+2/n)`, 'Diviser par n', 'lim', 'divide'), E(qt(L), 'Limite du rapport', 'lim', 'lim')],
    q: qt(L), qWord: qh(L), verdict: c < 4 ? '0' : '+∞', fact: FACT2, blank: ['(2n+2)(2n+1)'], two: true,
  };
}

function t3(rng) {
  const c = rng.pick([2, 3]);
  const a = `${c}^(n^2)/(n!)^2`;
  return {
    kind: 't3', a, start: `(${c}^((n+1)^2)/((n+1)!)^2)/(${a})`, la: `(${c}^((n+1)^2)(n!)^2)/(((n+1)!)^2×${c}^(n^2))`, lb: null,
    goal: `${c}^(2n+1)/(n+1)^2`, lim: [E('+∞', 'Croissances comparées', 'lim', 'lim')], q: '+∞', qWord: '+∞', verdict: '+∞', fact: FACT1, blank: ['2n+1'], dom: [1, 8],
  };
}

function t4(rng) {
  const c = rng.pick([1, 2, 3]);
  const C = coef(c);
  const a = c === 1 ? 'n!/n^n' : `(${c}^n×n!)/n^n`;
  const a1 = c === 1 ? '(n+1)!/(n+1)^(n+1)' : `(${c}^(n+1)(n+1)!)/(n+1)^(n+1)`;
  const la = `(${c === 1 ? '' : `${c}^(n+1)`}(n+1)!×n^n)/((n+1)^(n+1)${c === 1 ? '' : `×${c}^n`}×n!)`;
  const lb = `(${C}(n+1)n^n)/(n+1)^(n+1)`;
  const goal = `${C}(n/(n+1))^n`;
  const qq = c === 1 ? 'e^(-1)' : `${c}/e`;
  return {
    kind: 't4', a, start: `(${a1})/(${a})`, la, lb, goal,
    lim: [E(`${c}/(1+1/n)^n`, '(n/(n + 1))ⁿ = 1/(1 + 1/n)ⁿ', 'lim', 'divide'), E(qq, '(1 + 1/n)ⁿ → e', 'lim', 'lim')],
    q: qq, qWord: c === 1 ? '1/e' : `${c}/e`, verdict: c < 3 ? '0' : '+∞', fact: FACT1, blank: ['(n+1)^(n+1)'],
  };
}

function t5(rng) {
  const c = rng.int(2, 5);
  const a = `(2n)!/${c}^(n^2)`;
  return {
    kind: 't5', a, start: `((2n+2)!/${c}^((n+1)^2))/(${a})`, la: `((2n+2)!×${c}^(n^2))/(${c}^((n+1)^2)(2n)!)`, lb: null,
    goal: `((2n+2)(2n+1))/${c}^(2n+1)`, lim: [E('0', 'Croissances comparées : l\'exponentielle l\'emporte', 'lim', 'lim')], q: '0', qWord: '0', verdict: '0', fact: FACT2, blank: ['(2n+2)(2n+1)'], two: true,
  };
}

const TPL = { t1, t2, t3, t4, t5 };
const raData = (rng, kinds = ['t1', 't1', 't2', 't3', 't4', 't5']) => TPL[rng.pick(kinds)](rng);

const choicesOf = (d) => [
  { id: 'form', label: 'Former aₙ₊₁/aₙ et multiplier par l\'inverse' },
  { id: 'fact', label: 'Simplifier les factorielles' },
  { id: 'pow', label: 'Simplifier les puissances' },
  ...(d.two ? [{ id: 'one', label: '(2n + 2)!/(2n)! = 2n + 2', rule: 'a1_factorial_ratio', why: 'Il y a deux facteurs entre (2n)! et (2n + 2)!.' }] : []),
  { id: 'divide', label: 'Diviser par la plus grande puissance' },
  { id: 'lim', label: 'Limite du rapport' },
  { id: 'concl', label: 'Conclure par d\'Alembert' },
];

function verdictDecision(d) {
  const small = d.verdict === '0';
  return {
    kind: 'decision', prompt: `Le rapport tend vers q = ${d.qWord}. Que conclure ?`, options: [
      { id: 'zero', label: 'q < 1 : aₙ → 0', valid: small, ref: small, why: `q = ${d.qWord} n'est pas < 1.` },
      { id: 'inf', label: 'q > 1 : aₙ → +∞', valid: !small, ref: !small, why: `q = ${d.qWord} < 1 : les termes finissent par décroître comme une suite géométrique.` },
      { id: 'none', label: 'Le critère ne permet pas de conclure', valid: false, why: 'Il ne conclut pas seulement quand q = 1.' },
    ],
  };
}

function factDecision(d) {
  return {
    kind: 'decision', prompt: d.fact.prompt, options: [
      { id: 'ok', label: d.fact.ok, valid: true, ref: true },
      ...d.fact.bad.map((b, i) => ({ id: `bad${i}`, label: b.label, valid: false, why: b.why, ...(b.rule ? { rule: b.rule } : {}) })),
    ],
  };
}

function raLines(level, rng, opts = {}) {
  const d = raData(rng);
  const choices = choicesOf(d);
  const eq = EQN({ target: 'goal', goal: d.goal, ...(d.dom ? { domain: { n: { int: d.dom } } } : {}) });
  let s1 = [E(d.la, 'Former le rapport', 'simp', 'form')];
  if (d.lb && d.lb !== d.goal) s1.push(E(d.lb, 'Simplifier les factorielles et les puissances', 'simp', 'fact'));
  s1.push(E(d.goal, 'Simplifier', 'simp', d.lb && d.lb !== d.goal ? 'pow' : 'fact'));
  if (level === 1) s1 = s1.map((l, i) => (i === s1.length - 1 || (i > 0 && d.lb) ? blanked(l, d.blank) : l));
  let lim = d.lim;
  if (level <= 2) lim = [...lim.slice(0, -1), blanked(lim.at(-1), [lim.at(-1).math])];
  const parts = [
    { html: 'Le rapport :', start: d.start, judge: eq, lines: s1, pre: level === 2 ? [factDecision(d)] : [], choices },
    { html: 'Limite du rapport :', start: d.goal, judge: LIMN(), lines: lim, choices },
    {
      html: 'Conclusion :', start: d.a, judge: LIMN('n', { value: d.verdict }), lines: [E(d.verdict, 'D\'Alembert', 'concl', 'concl')],
      pre: level <= 3 ? [verdictDecision(d)] : [], choices,
    },
  ];
  const as = assemble(parts, level);
  return linesItem({
    skill: RA, level,
    prompt: `Soit aₙ = ${M(d.a)}. Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur ${M(`lim(a_n,n,∞)`)}.`,
    ...as, mode: modeOf(level), keys: KEYS, subgoals: SUB, tapActions: level === 3 ? 'steps' : null,
    hints: H(
      'Il y a une factorielle : forme aₙ₊₁/aₙ, beaucoup de choses se simplifient.',
      `${M(d.fact.prompt.replace(' =', '').replace(/ /g, ''))} = □`,
      `aₙ₊₁/aₙ = ${M(d.goal)} → ${d.qWord}`,
    ),
    key: `${RA}:${d.a}`, exam: opts.exam ? { format: opts.exam, points: 1 } : false,
  });
}

function raMcq(rng) {
  const d = raData(rng);
  const zero = d.verdict === '0';
  const opts = [
    { html: '0', correct: zero },
    { html: '+∞', correct: !zero, ...(zero && d.two ? { rule: 'a1_factorial_ratio' } : {}) },
    { html: '1', correct: false },
    { html: 'La limite n\'existe pas', correct: false },
  ];
  return mcq({
    skill: RA, level: 4, prompt: `${M(`lim(${d.a},n,∞)`)} =`, options: opts,
    key: `mcq:${d.a}`, exam: { format: 'mcq', points: 1 }, expectedSec: 240,
    solution: [{ html: `aₙ₊₁/aₙ = ${M(d.goal)} → ${d.qWord}, donc aₙ → ${d.verdict}.`, note: 'D\'Alembert' }],
  }, rng);
}

const TF = [
  {
    key: 'dec', truth: false, s: 'Si aₙ > 0 et aₙ₊₁/aₙ < 1 pour tout n, alors aₙ → 0.',
    counter: () => seqCounter({ hyp: [{ p: 'positive', say: 'aₙ > 0' }, { p: 'decreasing', say: 'aₙ₊₁/aₙ < 1' }], concl: { p: 'toZero' }, answer: { a: '1+1/n' } }),
    why: 'Faux : le critère demande la limite q du rapport, et q < 1. Avec aₙ = 1 + 1/n, le rapport est < 1 mais tend vers 1, et aₙ → 1.',
  },
  {
    key: 'dec2', truth: false, s: 'Si 0 < aₙ₊₁ < aₙ pour tout n, alors aₙ → 0.',
    counter: () => seqCounter({ hyp: [{ p: 'positive', say: 'aₙ > 0' }, { p: 'decreasing', say: 'aₙ₊₁ < aₙ' }], concl: { p: 'toZero' }, answer: { a: '2+1/n' } }),
    why: 'Faux : la suite décroît et converge, mais pas forcément vers 0. aₙ = 2 + 1/n → 2.',
  },
  { key: 'half', truth: true, s: 'Si aₙ ≠ 0 et |aₙ₊₁/aₙ| → 1/2, alors aₙ → 0.', why: 'Vrai : q = 1/2 < 1 (critère de d\'Alembert).' },
  { key: 'three', truth: true, s: 'Si aₙ ≠ 0 et |aₙ₊₁/aₙ| → 3, alors |aₙ| → +∞.', why: 'Vrai : q = 3 > 1 (critère de d\'Alembert).' },
  { key: 'nn', truth: true, s: 'lim n!/nⁿ = 0.', why: 'Vrai : aₙ₊₁/aₙ = (n/(n + 1))ⁿ → 1/e < 1.' },
];

function raTf(rng) {
  const t = rng.pick(TF);
  return tfItem({
    skill: RA, level: 4, truth: t.truth, key: t.key, statement: t.s, ruleIfTrue: null,
    counter: t.truth ? null : t.counter(), explanation: t.why, exam: { format: 'tf', points: 1 }, expectedSec: 60,
  });
}

export function raItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return raMcq(rng);
  if (opts.exam === 'tf') return raTf(rng);
  return raLines(level, rng, opts);
}

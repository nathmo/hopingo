// a1-seq-limsup (step U4): lim sup and lim inf by subsequences. For each
// subsequence: aₙ written at n = 2m (or 4m…) and simplified (`equiv` on
// whole m), then its limit (`limit`, whole m); then lim sup and lim inf
// (`value`; cfg.supTerms names the trap a1_limsup_as_sup). Templates of
// the catalogue: (a) (−1)ⁿ·pn/(n + q) + r/n, (b) ⁿ√c for n even and 1/nᵏ for
// n odd, (c) A(sin(π/4 + nπ/2) + cos(π/4 + nπ/2)) (modulo 4), (d)
// √(n + (−1)ⁿ) − √n. The catalogue's template (e) (sums Σ 2ᵏ/k! and
// (Σ 1/k!)^c by parity) is left out. Level 5: the exam multiple choice.

import { linesItem, mcq, tfItem } from './kit.js';
import { modeOf, H, E, assemble, blanked, uniq } from './analyse1-c-kit.js';
import { M, LIMN, q, qt, qh, coef, fr, seqCounter } from './analyse1-g-kit.js';

const LS = 'a1-seq-limsup';
const KEYS = ['calc', 'calcfn', 'fact'];
const SUB = [
  { id: 'lim', label: 'limites des sous-suites', skill: 'a1-seq-limits' },
  { id: 'concl', label: 'lim sup et lim inf', skill: LS },
];
const EQM = (goal) => ({ kind: 'equiv', vars: ['m'], domain: { m: { int: [1, 30] } }, target: 'goal', goal });
const VALF = (expect, form, extra = {}) => ({ kind: 'value', expect: String(expect), ...(form ? { form } : {}), ...extra });
const MM = (t) => M(t, ['m', 'n']);

// (a) (−1)ⁿ·pn/(n + q) + r/n.
function dataA(rng) {
  const p = rng.int(1, 5);
  const qq = rng.int(1, 4);
  const r = rng.int(1, 4);
  const a = `(-1)^n×${p === 1 ? 'n' : `(${p}n)`}/(n+${qq})+${r}/n`;
  const W = (t) => (p === 1 ? t : `(${p}${t})`);
  // The sup of the terms (exact): attained at a small even n when it
  // clearly exceeds p.
  let sup = null;
  for (let n = 1; n <= 60; n++) {
    const t = q((n % 2 ? -1 : 1) * p * n, n + qq).add(q(r, n));
    if (!sup || t.sub(sup).n > 0) sup = t;
  }
  const supOk = sup.sub(q(p)).sub(q(1, 10)).n > 0;
  return {
    kind: 'a', a, split: 2, hi: String(p), lo: String(-p), hiH: String(p), loH: fr(-p), sup: supOk ? qt(sup) : null, supH: supOk ? qh(sup) : null,
    subs: [
      {
        name: 'a₂ₘ', raw: `(-1)^(2m)×${W('(2m)')}/(2m+${qq})+${r}/(2m)`, simp: `(${2 * p}m)/(2m+${qq})+${r}/(2m)`,
        lim: [E(`${2 * p}/(2+${qq}/m)+${r}/(2m)`, 'Diviser par m', 'lim', 'divide'), E(String(p), 'Limite', 'lim', 'lim')], L: String(p), blank: [`${qq}/m`],
      },
      {
        name: 'a₂ₘ₊₁', raw: `(-1)^(2m+1)×${W('(2m+1)')}/(2m+1+${qq})+${r}/(2m+1)`, simp: `-${W('(2m+1)')}/(2m+${qq + 1})+${r}/(2m+1)`,
        lim: [E(`-${W('(2+1/m)')}/(2+${qq + 1}/m)+${r}/(2m+1)`, 'Diviser par m', 'lim', 'divide'), E(String(-p), 'Limite', 'lim', 'lim')], L: String(-p), blank: [`${qq + 1}/m`],
      },
    ],
    hints: ['(−1)ⁿ change selon la parité : regarde n = 2m et n = 2m + 1 séparément.', `a₂ₘ → □, a₂ₘ₊₁ → □`, `lim sup aₙ = ${p}, lim inf aₙ = ${fr(-p)}`],
  };
}

// (b) ⁿ√c for n even, 1/nᵏ for n odd.
function dataB(rng) {
  const c = rng.pick([2, 3, 5, 6, 7]);
  const k = rng.pick([1, 2, 3]);
  return {
    kind: 'b', def: `aₙ = ${M(`${c}^(1/n)`)} si n est pair, aₙ = ${M(k === 1 ? '1/n' : `1/n^${k}`)} si n est impair`, split: 2,
    hi: '1', lo: '0', hiH: '1', loH: '0', sup: `√${c}`, supH: `√${c}`,
    subs: [
      { name: 'a₂ₘ', raw: null, simp: `${c}^(1/(2m))`, lim: [E(`e^(ln(${c})/(2m))`, 'Écrire en exponentielle', 'lim', 'expo'), E('1', 'Limite', 'lim', 'lim')], L: '1', blank: [`ln(${c})`] },
      { name: 'a₂ₘ₊₁', raw: null, simp: k === 1 ? '1/(2m+1)' : `1/(2m+1)^${k}`, lim: [E('0', 'Limite', 'lim', 'lim')], L: '0', blank: [] },
    ],
    hints: ['La suite est définie selon la parité : étudie a₂ₘ et a₂ₘ₊₁.', `${M(`${c}^(1/(2m))`)} = e^(□/(2m)) → □`, `lim sup aₙ = 1, lim inf aₙ = 0 (et sup des termes = √${c}, atteint en n = 2).`],
  };
}

// (c) A(sin(π/4 + nπ/2) + cos(π/4 + nπ/2)), period 4.
function dataC(rng) {
  const A = rng.pick([1, 2, 3]);
  const C = coef(A);
  const body = (n) => `sin(π/4+${n}×π/2)+cos(π/4+${n}×π/2)`;
  const wrap = (n) => (A === 1 ? body(n) : `${A}(${body(n)})`);
  const top = A === 1 ? '√2' : `${A}√2`;
  return {
    kind: 'c', A, a: wrap('n'), split: 4, hi: top, lo: `-${top}`, hiH: top, loH: `−${top}`, sup: null, form: 'exact',
    subs: [
      { name: 'a₄ₘ', raw: wrap('4m'), simp: top, lim: null, L: top, blank: [] },
      { name: 'a₄ₘ₊₂', raw: wrap('(4m+2)'), simp: `-${top}`, lim: null, L: `-${top}`, blank: [] },
    ],
    note: 'a₄ₘ₊₁ = a₄ₘ₊₃ = 0 (sin(3π/4) + cos(3π/4) = 0).',
    hints: [`La suite a une période 4 : regarde n = 4m, 4m + 1, 4m + 2, 4m + 3.`, `a₄ₘ = ${C}(sin(π/4) + cos(π/4)) = □`, `lim sup aₙ = ${top}, lim inf aₙ = −${top}`],
  };
}

// (d) √(n + (−1)ⁿ) − √n: both subsequences tend to 0.
function dataD() {
  return {
    kind: 'd', a: '√(n+(-1)^n)-√n', split: 2, hi: '0', lo: '0', hiH: '0', loH: '0', sup: null,
    subs: [
      { name: 'a₂ₘ', raw: '√(2m+(-1)^(2m))-√(2m)', simp: '√(2m+1)-√(2m)', lim: [E('1/(√(2m+1)+√(2m))', 'Quantité conjuguée', 'lim', 'conj'), E('0', 'Limite', 'lim', 'lim')], L: '0', blank: ['√(2m+1)+√(2m)'] },
      { name: 'a₂ₘ₊₁', raw: '√(2m+1+(-1)^(2m+1))-√(2m+1)', simp: '√(2m)-√(2m+1)', lim: [E('-1/(√(2m)+√(2m+1))', 'Quantité conjuguée', 'lim', 'conj'), E('0', 'Limite', 'lim', 'lim')], L: '0', blank: ['√(2m)+√(2m+1)'] },
    ],
    hints: ['(−1)ⁿ vaut 1 ou −1 selon la parité : étudie a₂ₘ et a₂ₘ₊₁.', '√(2m + 1) − √(2m) = 1/(□)', 'Les deux sous-suites tendent vers 0 : lim sup = lim inf = 0, la suite converge vers 0.'],
  };
}

const DATA = { a: dataA, b: dataB, c: dataC, d: dataD };
const lsData = (rng, kinds = ['a', 'a', 'b', 'c', 'd']) => DATA[rng.pick(kinds)](rng);
const defOf = (d) => d.def || `aₙ = ${M(d.a)}`;

const CHOICES = [
  { id: 'sub', label: 'Écrire la sous-suite (remplacer n)' },
  { id: 'divide', label: 'Diviser par m' },
  { id: 'expo', label: 'Écrire en exponentielle' },
  { id: 'conj', label: 'Multiplier par la quantité conjuguée' },
  { id: 'lim', label: 'Calculer la limite de la sous-suite' },
  { id: 'max', label: 'lim sup : la plus grande limite' },
  { id: 'min', label: 'lim inf : la plus petite limite' },
  { id: 'sup', label: 'lim sup : le plus grand terme', rule: 'a1_limsup_as_sup', why: 'Le plus grand terme peut être atteint au début ; la lim sup ne regarde que les n grands.' },
];

function splitDecision(d) {
  const four = d.split === 4;
  return {
    kind: 'decision', prompt: 'Comment découper la suite ?', options: [
      { id: 'two', label: 'Selon la parité : n = 2m et n = 2m + 1', valid: !four, ref: !four, why: 'sin(π/4 + nπ/2) a une période 4 en n : la parité ne suffit pas.' },
      { id: 'four', label: 'Modulo 4 : n = 4m, 4m + 1, 4m + 2, 4m + 3', valid: true, ref: four, ...(four ? {} : { quality: 'poor', why: 'Juste, mais deux sous-suites suffisent : la suite ne dépend que de la parité.' }) },
      { id: 'none', label: 'Pas besoin : on calcule directement la limite de aₙ', valid: false, why: 'aₙ n\'a pas forcément de limite : on étudie les sous-suites.' },
    ],
  };
}

function supDecision(d) {
  return {
    kind: 'decision', prompt: 'La lim sup de (aₙ), c\'est :', options: [
      { id: 'max', label: `la plus grande limite des sous-suites, ${d.hiH}`, valid: true, ref: true },
      ...(d.sup ? [{ id: 'sup', label: `le plus grand terme de la suite, ${d.supH}`, valid: false, rule: 'a1_limsup_as_sup', why: 'Le plus grand terme est atteint au début ; la lim sup ne regarde que les n grands.' }] : []),
      { id: 'even', label: `la limite de ${d.subs[0].name}, quelle qu'elle soit`, valid: false, why: 'C\'est la plus grande des limites des sous-suites, pas celle d\'une sous-suite choisie d\'avance.' },
    ],
  };
}

function lsLines(level, rng, opts = {}) {
  const d = lsData(rng);
  const parts = [];
  d.subs.forEach((s, i) => {
    const pre = [];
    if (i === 0 && level === 2) pre.push(splitDecision(d));
    if (i === 0 && d.note) pre.push({ kind: 'note', html: d.note });
    const head = `${s.name} :`;
    if (s.raw && level >= 2) {
      const lines = [E(s.simp, 'Remplacer n, puis simplifier', 'lim', 'sub')];
      parts.push({ html: head, start: s.raw, judge: EQM(s.simp), lines, pre, choices: CHOICES });
      if (s.lim) parts.push({ html: `Limite de ${s.name} :`, start: s.simp, judge: LIMN('m'), lines: s.lim, choices: CHOICES });
    } else if (s.lim) {
      let lines = s.lim;
      if (level === 1) lines = [...(lines.length > 1 ? [blanked(lines[0], s.blank)] : []), blanked(lines.at(-1), [lines.at(-1).math])];
      parts.push({ html: `${s.name} = ${MM(s.simp)} :`, start: s.simp, judge: LIMN('m'), lines, pre, choices: CHOICES });
    } else {
      parts.push({ html: head, start: s.raw, judge: EQM(s.simp), lines: [E(s.simp, 'Périodicité', 'lim', 'sub')], pre, choices: CHOICES });
    }
  });
  const [L0, L1] = [d.subs[0].L, d.subs[1].L];
  parts.push({
    html: 'lim sup :', ask: 'lim sup aₙ =', start: `max(${L0};${L1})`, judge: VALF(d.hi, d.form, d.sup ? { supTerms: d.sup } : {}),
    lines: [E(d.hi, 'La plus grande limite', 'concl', 'max')], pre: level <= 3 ? [supDecision(d)] : [], choices: CHOICES,
  });
  parts.push({ html: 'lim inf :', ask: 'lim inf aₙ =', start: `min(${L0};${L1})`, judge: VALF(d.lo, d.form), lines: [E(d.lo, 'La plus petite limite', 'concl', 'min')], choices: CHOICES });
  const as = assemble(parts, level);
  return linesItem({
    skill: LS, level,
    prompt: `Soit ${defOf(d)}. Calcule la limite de chaque sous-suite, puis lim sup aₙ et lim inf aₙ.`,
    ...as, declares: { vars: ['m', 'n'] }, mode: modeOf(level), keys: KEYS, subgoals: SUB, tapActions: level === 3 ? 'steps' : null,
    hints: H(...d.hints), key: `${LS}:${d.kind}:${d.a || d.def}`, exam: opts.exam ? { format: opts.exam, points: 1 } : false,
  });
}

const both = (hi, lo) => `lim sup aₙ = ${hi}, lim inf aₙ = ${lo}`;

function lsMcq(level, rng, opts = {}) {
  const d = lsData(rng);
  const options = [
    { html: both(d.hiH, d.loH), correct: true },
    ...(d.sup ? [{ html: both(d.supH, d.loH), correct: false, rule: 'a1_limsup_as_sup' }] : []),
    { html: both(d.loH, d.hiH), correct: false },
    { html: both(d.hiH, d.hiH), correct: false },
    { html: both(d.A ? String(2 * d.A) : '1', d.A ? `−${2 * d.A}` : '−1'), correct: false },
    { html: 'lim sup et lim inf n\'existent pas : la suite oscille', correct: false },
  ];
  return mcq({
    skill: LS, level, prompt: `Soit ${defOf(d)}. Que valent lim sup aₙ et lim inf aₙ ?`, options: uniq(options).slice(0, 4),
    key: `mcq:${d.kind}:${d.a || d.def}`, exam: opts.exam ? { format: 'mcq', points: 1 } : false, expectedSec: 240,
    solution: [{ html: `${d.subs[0].name} → ${d.subs[0].L.replace('-', '−')}, ${d.subs[1].name} → ${d.subs[1].L.replace('-', '−')}${d.note ? ` ; ${d.note}` : ''}.`, note: 'Sous-suites' }, { html: both(d.hiH, d.loH), note: 'Plus grande et plus petite limite' }],
  }, rng);
}

const TF = [
  { key: 'inf', truth: true, s: 'Si xₙ → +∞, alors (xₙ) n\'a aucune sous-suite bornée.', why: 'Vrai : toute sous-suite tend aussi vers +∞.' },
  { key: 'bw', truth: true, s: 'Toute suite bornée a une sous-suite convergente.', why: 'Vrai : c\'est le théorème de Bolzano-Weierstrass.' },
  { key: 'both', truth: true, s: 'Si a₂ₘ → ℓ et a₂ₘ₊₁ → ℓ, alors aₙ → ℓ.', why: 'Vrai : les deux sous-suites recouvrent tous les indices, et ont la même limite.' },
  { key: 'sub', truth: true, s: 'Si aₙ → ℓ, alors toute sous-suite de (aₙ) tend vers ℓ.', why: 'Vrai : à partir d\'un rang N, tous les termes sont à moins de ε de ℓ, ceux de la sous-suite aussi.' },
  {
    key: 'bounded', truth: false, rule: 'a1_limsup_as_sup', s: 'Si (aₙ) est bornée, alors lim sup aₙ = lim inf aₙ.',
    counter: () => seqCounter({ hyp: [{ p: 'bounded' }], concl: { p: 'converges', say: 'lim sup aₙ = lim inf aₙ (la suite converge)' }, answer: { a: '(-1)^n' } }),
    why: 'Faux : lim sup = lim inf (finie) veut dire que la suite converge. (−1)ⁿ est bornée, lim sup = 1, lim inf = −1.',
  },
  {
    key: 'abs', truth: false, s: 'Si (|aₙ|) converge, alors (aₙ) converge.',
    counter: () => seqCounter({ hyp: [{ p: 'converges', of: 'abs(a)', say: '|aₙ| converge' }], concl: { p: 'converges' }, answer: { a: '(-1)^n' } }),
    why: 'Faux : |(−1)ⁿ| = 1 converge, mais (−1)ⁿ a deux sous-suites de limites 1 et −1.',
  },
];

function lsTf(rng) {
  const t = rng.pick(TF);
  return tfItem({
    skill: LS, level: 4, truth: t.truth, key: t.key, statement: t.s, ruleIfTrue: t.truth ? null : t.rule || null,
    counter: t.truth ? null : t.counter(), explanation: t.why, exam: { format: 'tf', points: 1 }, expectedSec: 60,
  });
}

export function lsItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return lsMcq(4, rng, opts);
  if (opts.exam === 'tf') return lsTf(rng);
  if (level === 5) return lsMcq(5, rng, opts);
  return lsLines(level, rng, opts);
}

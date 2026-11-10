// a1-seq-squeeze (step U4): a lower bound and an upper bound of aₙ, each an
// `equiv` part with rel '≥' or '≤' from n = 1 (cfg.squeeze: the part ends on
// a bound whose limit is ℓ, without Σ, sin or Log in n left), the limit of
// each bound (`limit`, whole n), then « lim aₙ = ℓ » (`value`). Templates of
// the catalogue: (a) Σ_{k=1}^{n} an/(bn² + k), (b) Log(e^(pn) + n^q)/(rn + s),
// (c) (an + c·sin n)/(dn + e). The template ⌊nx⌋/n is left out (no integer
// part in the CAS).

import { linesItem, mcq, tfItem } from './kit.js';
import { modeOf, H, E, assemble, blanked, uniq } from './analyse1-c-kit.js';
import { M, LIMN, VAL, q, qt, qh, cv, lin, coef, seqCounter } from './analyse1-g-kit.js';

const SQ = 'a1-seq-squeeze';
const KEYS = ['calc', 'calcfn', 'seq'];
const SUB = [
  { id: 'bound', label: 'minorer et majorer', skill: 'g1-bound' },
  { id: 'lim', label: 'limites des bornes', skill: 'a1-seq-limits' },
  { id: 'concl', label: 'conclure par les gendarmes', skill: SQ },
];

// The bound parts' judges: cfg.other is the other bound (trap
// a1_squeeze_wrong_direction), cfg.squeeze the limit to reach.
const BOUND = (rel, d, other) => ({ kind: 'equiv', vars: ['n'], from: 1, rel, squeeze: { L: qt(d.L), ...(d.gone ? { gone: d.gone } : {}) }, other, ...(d.kind === 'sum' ? { span: 60, maxN: 1000 } : {}) });

// ---------- templates ----------

function sumData(rng) {
  const a = rng.int(1, 5);
  const b = rng.int(1, 5);
  const A = coef(a);
  const B = coef(b);
  const L = q(a, b);
  const An = A ? `(${A}n)` : 'n';
  const An2 = A ? `(${A}n^2)` : 'n^2';
  const lo = `${An2}/(${B}n^2+n)`;
  const hi = `${An2}/(${B}n^2+1)`;
  return {
    kind: 'sum', name: 'S_n', nameH: 'Sₙ', L, lo, hi, zero: '0',
    start: `sum(${An}/(${B}n^2+k),k,1,n)`,
    lo1: `${An}/(${B}n^2+n)`, hi1: `${An}/(${B}n^2+1)`,
    loLines: [E(`sum(${An}/(${B}n^2+n),k,1,n)`, 'Chaque terme est au moins le plus petit (k = n)', 'bound', 'smallest'), E(lo, 'Il y a n termes égaux', 'bound', 'count')],
    hiLines: [E(`sum(${An}/(${B}n^2+1),k,1,n)`, 'Chaque terme est au plus le plus grand (k = 1)', 'bound', 'largest'), E(hi, 'Il y a n termes égaux', 'bound', 'count')],
    loLim: [E(`${a}/(${b}+1/n)`, 'Diviser par n²', 'lim', 'divide'), E(qt(L), 'Passer à la limite', 'lim', 'limit')],
    hiLim: [E(`${a}/(${b}+1/n^2)`, 'Diviser par n²', 'lim', 'divide'), E(qt(L), 'Passer à la limite', 'lim', 'limit')],
    blankLo: [`${B}n^2+n`], blankHi: [`${B}n^2+1`], blankLim: ['1/n', '1/n^2'],
    lowChoice: {
      prompt: 'Pour minorer Sₙ, on remplace chaque terme par :',
      ok: `le plus petit, ${M(`${An}/(${B}n^2+n)`)} (k = n)`,
      bad: `le plus grand, ${M(`${An}/(${B}n^2+1)`)} (k = 1)`,
    },
    hints: [
      'Chaque terme est entre le plus petit (k = n) et le plus grand (k = 1). Il y a n termes.',
      `${M(`n×${An}/(${B}n^2+□)`)} ≤ Sₙ ≤ ${M(`n×${An}/(${B}n^2+□)`)}`,
      `${M(lo)} ≤ Sₙ ≤ ${M(hi)}, et les deux bornes tendent vers ${qh(L)}.`,
    ],
    choices: [
      { id: 'smallest', label: 'Remplacer chaque terme par le plus petit (k = n)' },
      { id: 'largest', label: 'Remplacer chaque terme par le plus grand (k = 1)' },
      { id: 'count', label: 'Sommer les n termes égaux' },
      { id: 'one', label: 'Garder un seul terme', rule: 'a1_sum_n_terms_as_one', why: 'Il y a n termes : la somme vaut n fois le terme.' },
      { id: 'divide', label: 'Diviser le haut et le bas par n²' },
      { id: 'limit', label: 'Passer à la limite' },
      { id: 'conclude', label: 'Conclure par les gendarmes' },
    ],
  };
}

function logData(rng) {
  for (let i = 0; i < 200; i++) {
    const p = rng.int(1, 4);
    const qq = rng.int(1, Math.min(3, 2 * p));
    const r = rng.int(1, 4);
    const s = rng.int(1, 5);
    const P = coef(p);
    const R = coef(r);
    const den = `${R}n+${s}`;
    const L = q(p, r);
    const nq = qq === 1 ? 'n' : `n^${qq}`;
    const nqH = ['n', 'n', 'n²', 'n³'][qq];
    const lo = `${P ? `(${P}n)` : 'n'}/(${den})`;
    const hi = `(${P}n+ln(2))/(${den})`;
    return {
      kind: 'log', name: 'a_n', nameH: 'aₙ', L, lo, hi, zero: '0', gone: ['ln'],
      start: `ln(e^(${P}n)+${nq})/(${den})`,
      loLines: [E(`ln(e^(${P}n))/(${den})`, `Log est croissant et ${nqH} ≥ 0`, 'bound', 'logLow'), E(lo, `Log(e^(${P}n)) = ${cv(p)}`, 'bound', 'simplify')],
      hiLines: [E(`ln(2e^(${P}n))/(${den})`, `${nqH} ≤ e^(${cv(p)}) pour n ≥ 1`, 'bound', 'logHigh'), E(hi, `Log(2e^(${P}n)) = ${cv(p)} + Log 2`, 'bound', 'simplify')],
      loLim: [E(`${p}/(${r}+${s}/n)`, 'Diviser par n', 'lim', 'divide'), E(qt(L), 'Passer à la limite', 'lim', 'limit')],
      hiLim: [E(`(${p}+ln(2)/n)/(${r}+${s}/n)`, 'Diviser par n', 'lim', 'divide'), E(qt(L), 'Passer à la limite', 'lim', 'limit')],
      blankLo: [`${P}n`], blankHi: ['ln(2)'], blankLim: [`${s}/n`],
      lowChoice: {
        prompt: `Pour minorer ${M(`ln(e^(${P}n)+${nq})`)} :`,
        ok: `${M(`ln(e^(${P}n))`)}, en retirant ${M(nq)} ≥ 0`,
        bad: `${M(`ln(2e^(${P}n))`)}, car ${M(nq)} ≤ ${M(`e^(${P}n)`)}`,
      },
      hints: [
        `Coince ce qui est dans le Log : e^(${cv(p)}) ≤ e^(${cv(p)}) + ${nqH} ≤ 2e^(${cv(p)}), puis Log est croissant.`,
        `${M(`ln(e^(${P}n))/(${den})`)} ≤ aₙ ≤ ${M(`ln(□×e^(${P}n))/(${den})`)}`,
        `${M(lo)} ≤ aₙ ≤ ${M(hi)} : les deux bornes tendent vers ${qh(L)}.`,
      ],
      choices: [
        { id: 'logLow', label: `Retirer ${nqH} dans le Log` },
        { id: 'logHigh', label: `Majorer ${nqH} par e^(${cv(p)}) dans le Log` },
        { id: 'simplify', label: 'Simplifier Log(e^(…))' },
        { id: 'divide', label: 'Diviser le haut et le bas par n' },
        { id: 'limit', label: 'Passer à la limite' },
        { id: 'conclude', label: 'Conclure par les gendarmes' },
      ],
    };
  }
  return null;
}

function trigData(rng) {
  const T = rng.pick(['sin', 'cos']);
  const a = rng.int(1, 3);
  const c = rng.int(1, 5);
  const d = rng.int(1, 4);
  const e = rng.pick([-1, 1, 2, 3].filter((x) => d + x > 0));
  const A = coef(a);
  const den = lin(d, e);
  const L = q(a, d);
  const lo = `(${A}n-${c})/(${den})`;
  const hi = `(${A}n+${c})/(${den})`;
  const eTxt = `${e < 0 ? '-' : '+'}${Math.abs(e)}/n`;
  return {
    kind: 'trig', name: 'a_n', nameH: 'aₙ', L, lo, hi, zero: `-${c}/(${den})`, gone: ['sin', 'cos'], T,
    start: `(${A}n+${c}${T}(n))/(${den})`,
    loLines: [E(lo, `${T} n ≥ −1 (et ${coef(d)}n ${e < 0 ? '−' : '+'} ${Math.abs(e)} > 0)`, 'bound', 'trig')],
    hiLines: [E(hi, `${T} n ≤ 1`, 'bound', 'trig')],
    loLim: [E(`(${a}-${c}/n)/(${d}${eTxt})`, 'Diviser par n', 'lim', 'divide'), E(qt(L), 'Passer à la limite', 'lim', 'limit')],
    hiLim: [E(`(${a}+${c}/n)/(${d}${eTxt})`, 'Diviser par n', 'lim', 'divide'), E(qt(L), 'Passer à la limite', 'lim', 'limit')],
    blankLo: [`${A}n-${c}`], blankHi: [`${A}n+${c}`], blankLim: [`${c}/n`],
    lowChoice: {
      prompt: `Pour minorer aₙ, on remplace ${T} n par :`,
      ok: '−1', bad: '1', zero: true,
    },
    hints: [
      `−1 ≤ ${T} n ≤ 1, et le dénominateur est positif : remplace ${T} n par −1, puis par 1.`,
      `${M(`(${A}n-□)/(${den})`)} ≤ aₙ ≤ ${M(`(${A}n+□)/(${den})`)}`,
      `${M(lo)} ≤ aₙ ≤ ${M(hi)} : les deux bornes tendent vers ${qh(L)}.`,
    ],
    choices: [
      { id: 'trig', label: `Encadrer ${T} n entre −1 et 1` },
      { id: 'drop', label: `Dire que ${T} n n'a pas de limite`, rule: 'a1_bounded_times_zero', why: `${T} n est borné et il est divisé par une quantité qui tend vers l'infini : pas besoin de sa limite.` },
      { id: 'divide', label: 'Diviser le haut et le bas par n' },
      { id: 'limit', label: 'Passer à la limite' },
      { id: 'conclude', label: 'Conclure par les gendarmes' },
    ],
  };
}

function sqData(rng, kinds = ['sum', 'log', 'trig']) {
  const k = rng.pick(kinds);
  if (k === 'sum') return sumData(rng);
  if (k === 'trig') return trigData(rng);
  return logData(rng) || { ...sumData(rng), fallback: true };
}

// ---------- the lines item ----------

function lowDecision(d) {
  const c = d.lowChoice;
  return {
    kind: 'decision', prompt: c.prompt, options: [
      { id: 'low', label: c.ok, valid: true, ref: true },
      { id: 'high', label: c.bad, valid: false, rule: 'a1_squeeze_wrong_direction', why: 'Ce serait un majorant : pour minorer, il faut prendre plus petit.' },
      ...(c.zero ? [{ id: 'zero', label: '0', valid: false, why: `${d.T} n peut être négatif : 0 n'est pas un minorant.` }] : []),
    ],
  };
}

function concludeDecision(d) {
  return {
    kind: 'decision', prompt: `Que conclure pour ${d.nameH} ?`, options: [
      { id: 'squeeze', label: `${d.nameH} est coincée entre deux suites qui tendent toutes deux vers ${qh(d.L)}`, valid: true, ref: true },
      { id: 'diff', label: `${d.nameH} est entre deux suites convergentes : elle converge, même si leurs limites diffèrent`, valid: false, rule: 'a1_squeeze_different_limits', why: 'Il faut que les deux bornes aient la même limite : 1 + (−1)ⁿ est entre 0 et 2 sans converger.' },
      { id: 'bounded', label: `${d.nameH} est bornée, donc elle converge`, valid: false, rule: 'a1_bounded_implies_convergent', why: '(−1)ⁿ est bornée et ne converge pas : bornée ne suffit pas.' },
    ],
  };
}

function sqParts(d, level) {
  const guided = level <= 2;
  const loLines = guided ? [...d.loLines.slice(0, -1), blanked(d.loLines.at(-1), d.blankLo)] : d.loLines;
  const hiLines = guided ? [...d.hiLines.slice(0, -1), blanked(d.hiLines.at(-1), d.blankHi)] : d.hiLines;
  const lim = (ls) => (level === 1 ? [blanked(ls[0], d.blankLim), ...ls.slice(1)] : ls);
  const parts = [];
  const note = { kind: 'note', html: `Minorant donné : ${M(d.lo)} ≤ ${d.nameH} pour tout n ≥ 1.` };
  if (level >= 2) {
    parts.push({ html: `Minore ${d.nameH} :`, start: d.start, judge: BOUND('≥', d, d.hi), lines: loLines, pre: level === 2 ? [lowDecision(d)] : [], choices: d.choices });
  }
  parts.push({ html: `Majore ${d.nameH} :`, start: d.start, judge: BOUND('≤', d, d.lo), lines: hiLines, pre: level === 1 ? [note] : [], choices: d.choices });
  parts.push({ html: 'Limite du minorant :', start: d.lo, judge: LIMN(), lines: lim(d.loLim), choices: d.choices });
  parts.push({ html: 'Limite du majorant :', start: d.hi, judge: LIMN(), lines: lim(d.hiLim), choices: d.choices });
  parts.push({
    html: 'Conclusion :', start: `lim(${d.name},n,∞)`, judge: VAL(qt(d.L)),
    lines: [E(qt(d.L), 'Gendarmes', 'concl', 'conclude')], pre: level <= 3 ? [concludeDecision(d)] : [], choices: d.choices,
  });
  return parts;
}

function sqLines(level, rng, opts = {}) {
  const d = sqData(rng, level === 5 ? ['sum', 'log'] : ['sum', 'log', 'trig']);
  const as = assemble(sqParts(d, level), level);
  // The first part's judge is the item's: show « ≥ » from the start.
  return linesItem({
    skill: SQ, level,
    prompt: `Calcule la limite de ${d.nameH} = ${M(d.start)} par les gendarmes : minore, majore, puis passe à la limite des deux bornes.`,
    ...as, mode: modeOf(level), keys: KEYS, subgoals: SUB, tapActions: level === 3 ? 'steps' : null,
    hints: H(...d.hints),
    key: `${SQ}:${d.start}`, exam: opts.exam ? { format: opts.exam, points: 2 } : false, fallback: !!d.fallback,
  });
}

// ---------- exam variants ----------

const pair = (lo, mid, hi) => `${M(lo)} ≤ ${mid} ≤ ${M(hi)}`;

function sqMcq(rng) {
  const d = sqData(rng);
  const opts = [
    { html: pair(d.lo, d.nameH, d.hi), correct: true },
    { html: pair(d.hi, d.nameH, d.lo), correct: false, rule: 'a1_squeeze_wrong_direction' },
  ];
  if (d.kind === 'sum') opts.push({ html: pair(d.lo1, d.nameH, d.hi1), correct: false, rule: 'a1_sum_n_terms_as_one' });
  if (d.kind === 'trig') opts.push({ html: `Aucun : ${d.T} n n'a pas de limite, donc ${d.nameH} non plus`, correct: false, rule: 'a1_bounded_times_zero' });
  if (d.kind === 'log') opts.push({ html: `${d.nameH} ≤ ${M(d.hi)} suffit : le majorant tend vers ${qh(d.L)}`, correct: false });
  opts.push({ html: pair(d.zero, d.nameH, d.hi), correct: false, rule: 'a1_squeeze_different_limits' });
  return mcq({
    skill: SQ, level: 4, prompt: `Pour calculer la limite de ${d.nameH} = ${M(d.start)}, quel encadrement (pour tout n ≥ 1) permet de conclure par les gendarmes ?`,
    options: uniq(opts).slice(0, 4), key: `mcq:${d.start}`, exam: { format: 'mcq', points: 1 }, expectedSec: 240, fallback: !!d.fallback,
    solution: [{ html: `${pair(d.lo, d.nameH, d.hi)} : les deux bornes tendent vers ${qh(d.L)}, donc ${d.nameH} → ${qh(d.L)}.`, note: 'Gendarmes' }],
  }, rng);
}

// True/false: the hypotheses of the squeeze theorem.
const TF = [
  {
    key: 'diff', truth: false, rule: 'a1_squeeze_different_limits',
    s: 'Si −1/n < bₙ < 2 + 1/n pour tout n ≥ 1, alors (bₙ) converge.',
    counter: () => seqCounter({ seqs: ['b'], hyp: [{ p: 'positive', of: 'b+1/n', say: 'bₙ > −1/n' }, { p: 'positive', of: '2+1/n-b', say: 'bₙ < 2 + 1/n' }], concl: { p: 'converges', of: 'b' }, answer: { b: '1+(-1)^n' } }),
    why: 'Faux : les bornes tendent vers 0 et vers 2, elles ne coincent pas la suite. bₙ = 1 + (−1)ⁿ vaut 0, 2, 0, 2… sans converger.',
  },
  {
    key: 'below', truth: false, rule: 'a1_bounded_implies_convergent',
    s: 'Si 0 < bₙ < cₙ pour tout n et si (cₙ) converge, alors (bₙ) converge.',
    counter: () => seqCounter({ seqs: ['b', 'c'], hyp: [{ p: 'positive', of: 'b', say: 'bₙ > 0' }, { p: 'positive', of: 'c-b', say: 'bₙ < cₙ' }, { p: 'converges', of: 'c' }], concl: { p: 'converges', of: 'b' }, answer: { b: '(2+(-1)^n)/4', c: '1' } }),
    why: 'Faux : (bₙ) est seulement bornée. Avec cₙ = 1 et bₙ = (2 + (−1)ⁿ)/4, qui vaut 1/4, 3/4, 1/4…',
  },
  {
    key: 'oneside', truth: false, rule: 'a1_squeeze_different_limits',
    s: 'Si bₙ < 1/n pour tout n ≥ 1, alors bₙ → 0.',
    counter: () => seqCounter({ seqs: ['b'], hyp: [{ p: 'positive', of: '1/n-b', say: 'bₙ < 1/n' }], concl: { p: 'toZero', of: 'b' }, answer: { b: '-1' } }),
    why: 'Faux : il manque un minorant qui tend vers 0. bₙ = −1 vérifie bₙ < 1/n. Avec 0 ≤ bₙ ≤ 1/n, ce serait vrai.',
  },
  { key: 'same', truth: true, s: 'Si aₙ ≤ bₙ ≤ cₙ pour tout n, et si aₙ → 3 et cₙ → 3, alors bₙ → 3.', why: 'Vrai : c\'est le théorème des deux gendarmes.' },
  { key: 'abs', truth: true, s: 'Si |bₙ| ≤ 5/n pour tout n ≥ 1, alors bₙ → 0.', why: 'Vrai : −5/n ≤ bₙ ≤ 5/n et les deux bornes tendent vers 0.' },
  { key: 'pos', truth: true, s: 'Si 0 ≤ bₙ ≤ 1/√n pour tout n ≥ 1, alors bₙ → 0.', why: 'Vrai : 0 ≤ bₙ ≤ 1/√n, les deux bornes tendent vers 0 (un seul côté à chercher quand bₙ ≥ 0).' },
];

function sqTf(rng) {
  const t = rng.pick(TF);
  return tfItem({
    skill: SQ, level: 4, truth: t.truth, key: t.key, statement: t.s, ruleIfTrue: t.truth ? null : t.rule,
    counter: t.truth ? null : t.counter(), explanation: t.why, exam: { format: 'tf', points: 1 }, expectedSec: 60,
  });
}

export function sqItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return sqMcq(rng);
  if (opts.exam === 'tf') return sqTf(rng);
  if (opts.exam === 'open') return sqLines(4, rng, opts);
  return sqLines(level, rng, opts);
}


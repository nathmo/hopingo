// a1-seq-squeeze (step U4): a lower bound and an upper bound of aₙ, each an
// `equiv` part with rel '≥' or '≤' from n = 1 (cfg.squeeze: the part ends on
// a bound whose limit is ℓ, without Σ, sin or Log in n left), the limit of
// each bound (`limit`, whole n), then « lim aₙ = ℓ » (`value`). Templates of
// the catalogue: (a) Σ_{k=1}^{n} an/(bn² + k), (b) Log(e^(pn) + n^q)/(rn + s),
// (c) (an + c·sin n)/(dn + e). The template ⌊nx⌋/n is left out (no integer
// part in the CAS).

import { t } from '../../i18n.js';
import { linesItem, mcq, tfItem } from './kit.js';
import { modeOf, H, E, assemble, blanked, uniq } from './analyse1-c-kit.js';
import { M, LIMN, VAL, q, qt, qh, cv, lin, coef, seqCounter } from './analyse1-g-kit.js';

const SQ = 'a1-seq-squeeze';
const KEYS = ['calc', 'calcfn', 'seq'];
const SUB = [
  { id: 'bound', label: t('minorer et majorer'), skill: 'g1-bound' },
  { id: 'lim', label: t('limites des bornes'), skill: 'a1-seq-limits' },
  { id: 'concl', label: t('conclure par les gendarmes'), skill: SQ },
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
    loLines: [E(`sum(${An}/(${B}n^2+n),k,1,n)`, t('Chaque terme est au moins le plus petit (k = n)'), 'bound', 'smallest'), E(lo, t('Il y a n termes égaux'), 'bound', 'count')],
    hiLines: [E(`sum(${An}/(${B}n^2+1),k,1,n)`, t('Chaque terme est au plus le plus grand (k = 1)'), 'bound', 'largest'), E(hi, t('Il y a n termes égaux'), 'bound', 'count')],
    loLim: [E(`${a}/(${b}+1/n)`, t('Diviser par n²'), 'lim', 'divide'), E(qt(L), t('Passer à la limite'), 'lim', 'limit')],
    hiLim: [E(`${a}/(${b}+1/n^2)`, t('Diviser par n²'), 'lim', 'divide'), E(qt(L), t('Passer à la limite'), 'lim', 'limit')],
    blankLo: [`${B}n^2+n`], blankHi: [`${B}n^2+1`], blankLim: ['1/n', '1/n^2'],
    lowChoice: {
      prompt: t('Pour minorer Sₙ, on remplace chaque terme par :'),
      ok: t('le plus petit, {u} (k = n)', { u: M(`${An}/(${B}n^2+n)`) }),
      bad: t('le plus grand, {u} (k = 1)', { u: M(`${An}/(${B}n^2+1)`) }),
    },
    hints: [
      t('Chaque terme est entre le plus petit (k = n) et le plus grand (k = 1). Il y a n termes.'),
      `${M(`n×${An}/(${B}n^2+□)`)} ≤ Sₙ ≤ ${M(`n×${An}/(${B}n^2+□)`)}`,
      t('{lo} ≤ Sₙ ≤ {hi}, et les deux bornes tendent vers {L}.', { lo: M(lo), hi: M(hi), L: qh(L) }),
    ],
    choices: [
      { id: 'smallest', label: t('Remplacer chaque terme par le plus petit (k = n)') },
      { id: 'largest', label: t('Remplacer chaque terme par le plus grand (k = 1)') },
      { id: 'count', label: t('Sommer les n termes égaux') },
      { id: 'one', label: t('Garder un seul terme'), rule: 'a1_sum_n_terms_as_one', why: t('Il y a n termes : la somme vaut n fois le terme.') },
      { id: 'divide', label: t('Diviser le haut et le bas par n²') },
      { id: 'limit', label: t('Passer à la limite') },
      { id: 'conclude', label: t('Conclure par les gendarmes') },
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
      loLines: [E(`ln(e^(${P}n))/(${den})`, t('Log est croissant et {nq} ≥ 0', { nq: nqH }), 'bound', 'logLow'), E(lo, `Log(e^(${P}n)) = ${cv(p)}`, 'bound', 'simplify')],
      hiLines: [E(`ln(2e^(${P}n))/(${den})`, t('{nq} ≤ e^({p}) pour n ≥ 1', { nq: nqH, p: cv(p) }), 'bound', 'logHigh'), E(hi, `Log(2e^(${P}n)) = ${cv(p)} + Log 2`, 'bound', 'simplify')],
      loLim: [E(`${p}/(${r}+${s}/n)`, t('Diviser par n'), 'lim', 'divide'), E(qt(L), t('Passer à la limite'), 'lim', 'limit')],
      hiLim: [E(`(${p}+ln(2)/n)/(${r}+${s}/n)`, t('Diviser par n'), 'lim', 'divide'), E(qt(L), t('Passer à la limite'), 'lim', 'limit')],
      blankLo: [`${P}n`], blankHi: ['ln(2)'], blankLim: [`${s}/n`],
      lowChoice: {
        prompt: t('Pour minorer {u} :', { u: M(`ln(e^(${P}n)+${nq})`) }),
        ok: t('{u}, en retirant {nq} ≥ 0', { u: M(`ln(e^(${P}n))`), nq: M(nq) }),
        bad: t('{u}, car {nq} ≤ {e}', { u: M(`ln(2e^(${P}n))`), nq: M(nq), e: M(`e^(${P}n)`) }),
      },
      hints: [
        t('Coince ce qui est dans le Log : e^({p}) ≤ e^({p}) + {nq} ≤ 2e^({p}), puis Log est croissant.', { p: cv(p), nq: nqH }),
        `${M(`ln(e^(${P}n))/(${den})`)} ≤ aₙ ≤ ${M(`ln(□×e^(${P}n))/(${den})`)}`,
        t('{lo} ≤ aₙ ≤ {hi} : les deux bornes tendent vers {L}.', { lo: M(lo), hi: M(hi), L: qh(L) }),
      ],
      choices: [
        { id: 'logLow', label: t('Retirer {nq} dans le Log', { nq: nqH }) },
        { id: 'logHigh', label: t('Majorer {nq} par e^({p}) dans le Log', { nq: nqH, p: cv(p) }) },
        { id: 'simplify', label: t('Simplifier Log(e^(…))') },
        { id: 'divide', label: t('Diviser le haut et le bas par n') },
        { id: 'limit', label: t('Passer à la limite') },
        { id: 'conclude', label: t('Conclure par les gendarmes') },
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
    loLines: [E(lo, t('{T} n ≥ −1 (et {d}n {op} {e} > 0)', { T, d: coef(d), op: e < 0 ? '−' : '+', e: Math.abs(e) }), 'bound', 'trig')],
    hiLines: [E(hi, `${T} n ≤ 1`, 'bound', 'trig')],
    loLim: [E(`(${a}-${c}/n)/(${d}${eTxt})`, t('Diviser par n'), 'lim', 'divide'), E(qt(L), t('Passer à la limite'), 'lim', 'limit')],
    hiLim: [E(`(${a}+${c}/n)/(${d}${eTxt})`, t('Diviser par n'), 'lim', 'divide'), E(qt(L), t('Passer à la limite'), 'lim', 'limit')],
    blankLo: [`${A}n-${c}`], blankHi: [`${A}n+${c}`], blankLim: [`${c}/n`],
    lowChoice: {
      prompt: t('Pour minorer aₙ, on remplace {T} n par :', { T }),
      ok: '−1', bad: '1', zero: true,
    },
    hints: [
      t('−1 ≤ {T} n ≤ 1, et le dénominateur est positif : remplace {T} n par −1, puis par 1.', { T }),
      `${M(`(${A}n-□)/(${den})`)} ≤ aₙ ≤ ${M(`(${A}n+□)/(${den})`)}`,
      t('{lo} ≤ aₙ ≤ {hi} : les deux bornes tendent vers {L}.', { lo: M(lo), hi: M(hi), L: qh(L) }),
    ],
    choices: [
      { id: 'trig', label: t('Encadrer {T} n entre −1 et 1', { T }) },
      { id: 'drop', label: t('Dire que {T} n n\'a pas de limite', { T }), rule: 'a1_bounded_times_zero', why: t('{T} n est borné et il est divisé par une quantité qui tend vers l\'infini : pas besoin de sa limite.', { T }) },
      { id: 'divide', label: t('Diviser le haut et le bas par n') },
      { id: 'limit', label: t('Passer à la limite') },
      { id: 'conclude', label: t('Conclure par les gendarmes') },
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
      { id: 'high', label: c.bad, valid: false, rule: 'a1_squeeze_wrong_direction', why: t('Ce serait un majorant : pour minorer, il faut prendre plus petit.') },
      ...(c.zero ? [{ id: 'zero', label: '0', valid: false, why: t('{T} n peut être négatif : 0 n\'est pas un minorant.', { T: d.T }) }] : []),
    ],
  };
}

function concludeDecision(d) {
  return {
    kind: 'decision', prompt: t('Que conclure pour {u} ?', { u: d.nameH }), options: [
      { id: 'squeeze', label: t('{u} est coincée entre deux suites qui tendent toutes deux vers {L}', { u: d.nameH, L: qh(d.L) }), valid: true, ref: true },
      { id: 'diff', label: t('{u} est entre deux suites convergentes : elle converge, même si leurs limites diffèrent', { u: d.nameH }), valid: false, rule: 'a1_squeeze_different_limits', why: t('Il faut que les deux bornes aient la même limite : 1 + (−1)ⁿ est entre 0 et 2 sans converger.') },
      { id: 'bounded', label: t('{u} est bornée, donc elle converge', { u: d.nameH }), valid: false, rule: 'a1_bounded_implies_convergent', why: t('(−1)ⁿ est bornée et ne converge pas : bornée ne suffit pas.') },
    ],
  };
}

function sqParts(d, level) {
  const guided = level <= 2;
  const loLines = guided ? [...d.loLines.slice(0, -1), blanked(d.loLines.at(-1), d.blankLo)] : d.loLines;
  const hiLines = guided ? [...d.hiLines.slice(0, -1), blanked(d.hiLines.at(-1), d.blankHi)] : d.hiLines;
  const lim = (ls) => (level === 1 ? [blanked(ls[0], d.blankLim), ...ls.slice(1)] : ls);
  const parts = [];
  const note = { kind: 'note', html: t('Minorant donné : {lo} ≤ {u} pour tout n ≥ 1.', { lo: M(d.lo), u: d.nameH }) };
  if (level >= 2) {
    parts.push({ html: t('Minore {u} :', { u: d.nameH }), start: d.start, judge: BOUND('≥', d, d.hi), lines: loLines, pre: level === 2 ? [lowDecision(d)] : [], choices: d.choices });
  }
  parts.push({ html: t('Majore {u} :', { u: d.nameH }), start: d.start, judge: BOUND('≤', d, d.lo), lines: hiLines, pre: level === 1 ? [note] : [], choices: d.choices });
  parts.push({ html: t('Limite du minorant :'), start: d.lo, judge: LIMN(), lines: lim(d.loLim), choices: d.choices });
  parts.push({ html: t('Limite du majorant :'), start: d.hi, judge: LIMN(), lines: lim(d.hiLim), choices: d.choices });
  parts.push({
    html: t('Conclusion :'), start: `lim(${d.name},n,∞)`, judge: VAL(qt(d.L)),
    lines: [E(qt(d.L), t('Gendarmes'), 'concl', 'conclude')], pre: level <= 3 ? [concludeDecision(d)] : [], choices: d.choices,
  });
  return parts;
}

function sqLines(level, rng, opts = {}) {
  const d = sqData(rng, level === 5 ? ['sum', 'log'] : ['sum', 'log', 'trig']);
  const as = assemble(sqParts(d, level), level);
  // The first part's judge is the item's: show « ≥ » from the start.
  return linesItem({
    skill: SQ, level,
    prompt: t('Calcule la limite de {u} = {s} par les gendarmes : minore, majore, puis passe à la limite des deux bornes.', { u: d.nameH, s: M(d.start) }),
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
  if (d.kind === 'trig') opts.push({ html: t('Aucun : {T} n n\'a pas de limite, donc {u} non plus', { T: d.T, u: d.nameH }), correct: false, rule: 'a1_bounded_times_zero' });
  if (d.kind === 'log') opts.push({ html: t('{u} ≤ {hi} suffit : le majorant tend vers {L}', { u: d.nameH, hi: M(d.hi), L: qh(d.L) }), correct: false });
  opts.push({ html: pair(d.zero, d.nameH, d.hi), correct: false, rule: 'a1_squeeze_different_limits' });
  return mcq({
    skill: SQ, level: 4, prompt: t('Pour calculer la limite de {u} = {s}, quel encadrement (pour tout n ≥ 1) permet de conclure par les gendarmes ?', { u: d.nameH, s: M(d.start) }),
    options: uniq(opts).slice(0, 4), key: `mcq:${d.start}`, exam: { format: 'mcq', points: 1 }, expectedSec: 240, fallback: !!d.fallback,
    solution: [{ html: t('{pair} : les deux bornes tendent vers {L}, donc {u} → {L}.', { pair: pair(d.lo, d.nameH, d.hi), L: qh(d.L), u: d.nameH }), note: t('Gendarmes') }],
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
  const tf = rng.pick(TF);
  return tfItem({
    skill: SQ, level: 4, truth: tf.truth, key: tf.key, statement: t(tf.s), ruleIfTrue: tf.truth ? null : tf.rule,
    counter: tf.truth ? null : tf.counter(), explanation: t(tf.why), exam: { format: 'tf', points: 1 }, expectedSec: 60,
  });
}

export function sqItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return sqMcq(rng);
  if (opts.exam === 'tf') return sqTf(rng);
  if (opts.exam === 'open') return sqLines(4, rng, opts);
  return sqLines(level, rng, opts);
}


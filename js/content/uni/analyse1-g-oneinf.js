// a1-seq-1inf (step U4): uₙ^(vₙ) = e^(vₙ·Log uₙ). Three parts: the
// exponential form (`equiv` to a goal), the limit of the exponent with
// Log(1 + h) ≈ h (`limit`, whole n), then the limit of aₙ (`limit`).
// Templates of the catalogue: (a) ((n + a)/(n + b))^(cn), (b) (1 + p/n +
// q/n²)^(rn), (c) e^(n²·Log(1 + p/n) − pn) (a DL of order 2 of the Log),
// (d) ((mn + 1)/(mn))ⁿ, (e) (1 + (a + 1/n)/(bn))^(cn) (the catalogue's
// 1/√n is replaced by 1/n: the numeric limit of 1/√n terms is too slow).

import { t } from '../../i18n.js';
import { linesItem, mcq, tfItem } from './kit.js';
import { modeOf, H, E, assemble, blanked, uniq } from './analyse1-c-kit.js';
import { M, LIMN, EQN, q, qt, qh, cv, lin, coef, fr, seqCounter } from './analyse1-g-kit.js';

const OI = 'a1-seq-1inf';
const KEYS = ['calc', 'calcfn', 'seq'];
const SUB = [
  { id: 'exp', label: t('forme exponentielle'), skill: 'g2-real-powers' },
  { id: 'lim', label: t('limite de l\'exposant'), skill: 'a1-seq-limits' },
  { id: 'concl', label: t('continuité de exp'), skill: OI },
];
// e^K as text.
const eText = (K) => (K.d === 1 && K.n === 1 ? 'e' : K.d === 1 && K.n > 0 ? `e^${K.n}` : `e^(${qt(K)})`);
const sg = (x) => (x < 0 ? `-${Math.abs(x)}` : `+${x}`);

function dataA(rng) {
  const a = rng.int(-4, 4);
  const b = rng.pick([-4, -3, -2, -1, 0, 1, 2, 3, 4].filter((x) => x !== a && Math.abs(x - a) <= 3));
  const c = rng.pick([1, 2, 3].filter((x) => x * Math.abs(a - b) <= 6));
  const D = a - b;
  const nb = b === 0 ? 'n' : `(${lin(1, b)})`;
  const base = `(${lin(1, a)})/${nb}`;
  const cn = cv(c);
  return {
    kind: 'a', start: `(${base})^${c === 1 ? 'n' : `(${cn})`}`, exp: `e^(${cn}×ln(${base}))`, K: q(c * D),
    eStart: `${cn}×ln(${base})`,
    eLines: [
      E(`${cn}×ln(1${sg(D)}/${nb})`, t('Faire apparaître 1 + h, avec h → 0'), 'lim', 'oneh'),
      E(`${cn}×(${D})/${nb}`, 'Log(1 + h) = h + h·ε(h)', 'lim', 'equiv'),
      E(String(c * D), t('Limite de l\'exposant'), 'lim', 'lim'),
    ],
    blankH: [`${Math.abs(D)}/${nb}`],
    hints: [t('Base → 1, exposant → ∞ : passe en e^({cn}·Log(…)) et écris la base 1 + h.', { cn }), `${M(base)} = 1 + □/${M(nb)}`, `${M(`${cn}×ln(1${sg(D)}/${nb})`)} ~ ${M(`${cn}×(${D})/${nb}`)} → ${fr(c * D)}`],
  };
}

function dataB(rng) {
  const p = rng.pick([1, 2, 3]);
  const qq = rng.pick([-3, -2, -1, 1, 2, 3]);
  const r = rng.pick([1, 2, 3]);
  const inner = `1+${p}/n${sg(qq)}/n^2`;
  const rn = cv(r);
  return {
    kind: 'b', start: `(${inner})^${r === 1 ? 'n' : `(${rn})`}`, exp: `e^(${rn}×ln(${inner}))`, K: q(p * r),
    eStart: `${rn}×ln(${inner})`,
    eLines: [
      E(`${rn}×(${p}/n${sg(qq)}/n^2)`, 'Log(1 + h) = h + h·ε(h), h → 0', 'lim', 'equiv'),
      E(`${p * r}${sg(qq * r)}/n`, t('Développer'), 'lim', 'simplify'),
      E(String(p * r), t('Limite de l\'exposant'), 'lim', 'lim'),
    ],
    blankH: [`${p}/n${sg(qq)}/n^2`],
    hints: [t('La base est déjà 1 + h avec h = {h} → 0 : passe en exponentielle et remplace Log(1 + h) par h.', { h: `${p}/n ${qq < 0 ? '−' : '+'} ${Math.abs(qq)}/n²` }), `${M(`${rn}×ln(${inner})`)} ~ ${M(rn)}·(□)`, `${M(`${rn}×(${p}/n${sg(qq)}/n^2)`)} = ${M(`${p * r}${sg(qq * r)}/n`)} → ${p * r}`],
  };
}

function dataC(rng) {
  const p = rng.pick([1, 2, 3]);
  const P = coef(p);
  const K = q(-p * p, 2);
  const eStart = `n^2×ln(1+${p}/n)-${P}n`;
  return {
    kind: 'c', start: `e^(${eStart})`, exp: null, K, eStart, dl2: true,
    eLines: [
      E(`n^2×(${p}/n-${p * p}/(2n^2))-${P}n`, t('Log(1 + h) = h − h²/2 + h²·ε(h) : l\'ordre 2 est nécessaire'), 'lim', 'dl2'),
      E(qt(K), t('Simplifier'), 'lim', 'lim'),
    ],
    blankH: [`${p * p}/(2n^2)`],
    hints: [t('À l\'ordre 1, n²·({p}/n) − {pn} = 0 ne dit rien : il faut Log(1 + h) = h − h²/2 + h²·ε(h).', { p, pn: cv(p) }), `${M(`n^2×(${p}/n-□)-${P}n`)}`, `${M(`n^2×(${p}/n-${p * p}/(2n^2))-${P}n`)} = ${qh(K)}`],
  };
}

function dataD(rng) {
  const m = rng.int(2, 9);
  const base = `(${m}n+1)/(${m}n)`;
  return {
    kind: 'd', start: `(${base})^n`, exp: `e^(n×ln(${base}))`, K: q(1, m),
    eStart: `n×ln(${base})`,
    eLines: [
      E(`n×ln(1+1/(${m}n))`, t('Faire apparaître 1 + h, h = 1/({m}n)', { m }), 'lim', 'oneh'),
      E(`n×1/(${m}n)`, 'Log(1 + h) = h + h·ε(h)', 'lim', 'equiv'),
      E(`1/${m}`, t('Limite de l\'exposant'), 'lim', 'lim'),
    ],
    blankH: [`1/(${m}n)`],
    hints: [t('Base → 1, exposant → ∞ : passe en e^(n·Log(…)).'), `${M(base)} = 1 + □`, `${M(`n×ln(1+1/(${m}n))`)} ~ ${M(`n×1/(${m}n)`)} = 1/${m}`],
  };
}

function dataE(rng) {
  const a = rng.int(1, 5);
  const b = rng.int(2, 6);
  const c = rng.int(1, 4);
  const inner = `1+(${a}+1/n)/(${b}n)`;
  const cn = cv(c);
  const K = q(a * c, b);
  return {
    kind: 'e', start: `(${inner})^${c === 1 ? 'n' : `(${cn})`}`, exp: `e^(${cn}×ln(${inner}))`, K,
    eStart: `${cn}×ln(${inner})`,
    eLines: [
      E(`${cn}×(${a}+1/n)/(${b}n)`, 'Log(1 + h) = h + h·ε(h), h → 0', 'lim', 'equiv'),
      E(`${coef(c) === '' ? '' : c}(${a}+1/n)/${b}`, t('Simplifier par n'), 'lim', 'simplify'),
      E(qt(K), t('Limite de l\'exposant'), 'lim', 'lim'),
    ],
    blankH: [`(${a}+1/n)/(${b}n)`],
    hints: [t('h = ({a} + 1/n)/({b}n) → 0 : passe en exponentielle, puis Log(1 + h) ≈ h.', { a, b }), `${M(`${cn}×ln(${inner})`)} ~ ${M(cn)}·□`, `${M(`${cn}×(${a}+1/n)/(${b}n)`)} → ${qh(K)}`],
  };
}

const DATA = { a: dataA, b: dataB, c: dataC, d: dataD, e: dataE };
const oiData = (rng, kinds = ['a', 'a', 'b', 'c', 'd', 'e']) => DATA[rng.pick(kinds)](rng);

const CHOICES = [
  { id: 'expo', label: t('Écrire en exponentielle e^(v·Log u)') },
  { id: 'oneh', label: t('Faire apparaître 1 + h, h → 0') },
  { id: 'equiv', label: t('Remplacer Log(1 + h) par h') },
  { id: 'dl2', label: t('DL d\'ordre 2 du Log') },
  { id: 'simplify', label: t('Simplifier') },
  { id: 'lim', label: t('Passer à la limite') },
  { id: 'cont', label: t('Continuité de exp') },
  { id: 'one', label: t('La base tend vers 1, donc la suite tend vers 1'), rule: 'a1_indet_one_inf', why: t('1^∞ est indéterminé : l\'exposant explose.') },
];

function contDecision(d) {
  const opts = [
    { id: 'eK', label: t('{e}, par continuité de exp', { e: M(eText(d.K)) }), valid: true, ref: true },
    { id: 'one', label: t('1, car la base tend vers 1'), valid: false, rule: 'a1_indet_one_inf', why: t('1^∞ est indéterminé : seule la limite de l\'exposant compte.') },
    { id: 'K', label: t('{K}, la limite de l\'exposant', { K: qh(d.K) }), valid: false, why: t('La suite vaut e^(exposant) : elle tend vers e^({K}).', { K: qh(d.K) }) },
  ];
  return { kind: 'decision', prompt: t('L\'exposant tend vers {K}. Donc la suite tend vers :', { K: qh(d.K) }), options: opts };
}

function oiLines(level, rng, opts = {}) {
  const d = oiData(rng, level === 5 ? ['b', 'c', 'e'] : level === 1 ? ['a', 'b', 'd', 'e'] : undefined);
  const guided = level <= 2;
  const parts = [];
  if (d.exp && level >= 2) {
    parts.push({ html: t('Forme exponentielle :'), start: d.start, judge: EQN({ domain: { n: { int: [20, 60] } }, target: 'goal', goal: d.exp }), lines: [E(d.exp, 'uᵛ = e^(v·Log u)', 'exp', 'expo')], choices: CHOICES });
  }
  let eLines = d.eLines;
  if (level === 1) eLines = [blanked(eLines[0], d.blankH), ...eLines.slice(1, -1), blanked(eLines.at(-1), [eLines.at(-1).math])];
  else if (level === 2) eLines = [...eLines.slice(0, -1), blanked(eLines.at(-1), [eLines.at(-1).math])];
  const pre = [];
  if (level === 1 && d.exp) pre.push({ kind: 'note', html: t('Forme exponentielle : {s} = {e}.', { s: M(d.start), e: M(d.exp) }) });
  if (d.dl2 && (level === 2 || level === 3)) {
    pre.push({
      kind: 'decision', prompt: t('Quel développement de Log(1 + h) faut-il ?'), options: [
        { id: 'o1', label: 'Log(1 + h) = h + h·ε(h)', valid: false, rule: 'a1_dl_order_too_low', why: t('À l\'ordre 1, il reste n²·h − pn = 0 + n²·h·ε(h) : on ne peut pas conclure. Il faut l\'ordre 2.') },
        { id: 'o2', label: 'Log(1 + h) = h − h²/2 + h²·ε(h)', valid: true, ref: true },
      ],
    });
  }
  parts.push({ html: t('Limite de l\'exposant :'), start: d.eStart, judge: LIMN(), lines: eLines, pre, choices: CHOICES });
  parts.push({
    html: t('Conclusion :'), start: d.start, judge: LIMN(), lines: [E(eText(d.K), t('Continuité de exp'), 'concl', 'cont')],
    pre: level <= 3 ? [contDecision(d)] : [], choices: CHOICES,
  });
  const as = assemble(parts, level);
  return linesItem({
    skill: OI, level,
    prompt: d.kind === 'c' ? t('Calcule {l}. Tout est déjà en exponentielle : étudie l\'exposant.', { l: M(`lim(${d.start},n,∞)`) }) : t('Calcule {l}.', { l: M(`lim(${d.start},n,∞)`) }),
    ...as, mode: modeOf(level), keys: KEYS, subgoals: SUB, tapActions: level === 3 ? 'steps' : null,
    hints: H(...d.hints), key: `${OI}:${d.start}`, exam: opts.exam ? { format: opts.exam, points: 1 } : false,
  });
}

function oiMcq(rng) {
  const d = oiData(rng);
  const opts = [
    { html: M(eText(d.K)), correct: true },
    { html: '1', correct: false, rule: d.kind === 'c' ? 'a1_dl_order_too_low' : 'a1_indet_one_inf' },
    { html: M(eText(d.K.neg())), correct: false },
    { html: d.kind === 'c' ? M(eText(d.K.mul(q(2)))) : '+∞', correct: false },
    { html: M(qt(d.K)), correct: false },
  ];
  return mcq({
    skill: OI, level: 4, prompt: `${M(`lim(${d.start},n,∞)`)} =`, options: uniq(opts).slice(0, 4),
    key: `mcq:${d.start}`, exam: { format: 'mcq', points: 1 }, expectedSec: 240,
    solution: [{ html: t('{e} → {K}, donc la suite tend vers {l}.', { e: M(d.eStart), K: qh(d.K), l: M(eText(d.K)) }), note: t('Forme 1^∞') }],
  }, rng);
}

const TF = [
  {
    key: 'un', truth: false, s: 'Si uₙ → 1, alors uₙⁿ → 1.',
    counter: () => seqCounter({ seqs: ['u'], hyp: [{ p: 'limit', of: 'u', value: '1', say: 'uₙ → 1' }], concl: { p: 'limit', of: 'u^n', value: '1', say: 'uₙⁿ → 1' }, answer: { u: '1+1/n' } }),
    why: 'Faux : 1^∞ est indéterminé. Avec uₙ = 1 + 1/n, uₙⁿ = e^(n·Log(1 + 1/n)) → e.',
  },
  {
    key: 'uv', truth: false, s: 'Si uₙ → 1 et vₙ → +∞, alors uₙ^(vₙ) → 1.',
    counter: () => seqCounter({ seqs: ['u', 'v'], hyp: [{ p: 'limit', of: 'u', value: '1', say: 'uₙ → 1' }, { p: 'toInf', of: 'v' }], concl: { p: 'limit', of: 'u^v', value: '1', say: 'uₙ^(vₙ) → 1' }, answer: { u: '1+2/n', v: 'n' } }),
    why: 'Faux : uₙ^(vₙ) = e^(vₙ·Log uₙ) et vₙ·Log uₙ peut tendre vers n\'importe quoi. Avec uₙ = 1 + 2/n et vₙ = n : → e².',
  },
  {
    key: 'above', truth: false, s: 'Si uₙ > 1 pour tout n et uₙ → 1, alors uₙⁿ → 1.',
    counter: () => seqCounter({ seqs: ['u'], hyp: [{ p: 'positive', of: 'u-1', say: 'uₙ > 1' }, { p: 'limit', of: 'u', value: '1', say: 'uₙ → 1' }], concl: { p: 'limit', of: 'u^n', value: '1', say: 'uₙⁿ → 1' }, answer: { u: '1+1/n' } }),
    why: 'Faux : (1 + 1/n)ⁿ → e, pas 1 : la base s\'approche de 1, mais l\'exposant grandit.',
  },
  { key: 'e', truth: true, s: '(1 + 1/n)ⁿ → e.', why: 'Vrai : n·Log(1 + 1/n) → 1, donc (1 + 1/n)ⁿ = e^(n·Log(1 + 1/n)) → e.' },
  { key: 'cont', truth: true, s: 'Si uₙ → 2 et vₙ → 3, alors uₙ^(vₙ) → 8.', why: 'Vrai : 2³ n\'est pas une forme indéterminée ; e^(vₙ·Log uₙ) → e^(3·Log 2) = 8.' },
  { key: 'c', truth: true, s: 'Si uₙ → 1 et n(uₙ − 1) → c, alors uₙⁿ → eᶜ.', why: 'Vrai : n·Log uₙ = n(uₙ − 1)·(1 + ε) → c, puis continuité de exp.' },
];

function oiTf(rng) {
  const tf = rng.pick(TF);
  return tfItem({
    skill: OI, level: 4, truth: tf.truth, key: tf.key, statement: t(tf.s), ruleIfTrue: tf.truth ? null : 'a1_indet_one_inf',
    counter: tf.truth ? null : tf.counter(), explanation: t(tf.why), exam: { format: 'tf', points: 1 }, expectedSec: 60,
  });
}

export function oiItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return oiMcq(rng);
  if (opts.exam === 'tf') return oiTf(rng);
  return oiLines(level, rng, opts);
}

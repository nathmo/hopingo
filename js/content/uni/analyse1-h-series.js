// a1-ser-geo-tele (module A1, part h, step U4): sums of geometric and
// telescoping series. Kinds:
//   geo    Σ_{k≥k₀} c·qᵏ = c·q^(k₀)/(1 − q)   (definite: lines with Σ to ∞,
//          evaluated by partial sums, step U4)
//   combo  Σ_{k≥k₀} (aᵏ + bᵏ)/cᵏ: two geometric series
//   tele   Σ_{k≥1} p/((k + a)(k + a + p)): the decomposition (equiv in k),
//          the partial sum S_N (equiv in N, whole), its limit (limit, discrete)
//   ln     Σ_{k≥1} ln((k + 1)/k): S_N = ln(N + 1) → +∞, the series diverges
// Level 5: a sum mixing a telescoping and a geometric series (definite), or
// a multiple choice.

import { t } from '../../i18n.js';
import { Q } from '../../math/rational.js';
import { mcq, tfItem } from './kit.js';
import {
  q, N, H, E, examOf, joinSum, blanked, partsItem, mcqOf, P, MN, fr, geoTerm, part, lin,
} from './analyse1-h-kit.js';

const GT = 'a1-ser-geo-tele';
const KEYS = ['calc', 'seq', 'anal'];
const SUB = [
  { id: 'geo', label: t('série géométrique'), skill: 'g5-geom' },
  { id: 'des', label: t('décomposition en éléments simples'), skill: 'g0-pfd-simple' },
  { id: 'shift', label: t('changement d\'indice'), skill: 'g5-reindex' },
  { id: 'lim', label: t('limite des sommes partielles'), skill: GT },
];
const CHOICES = [
  { id: 'geo', label: t('Série géométrique : premier terme sur 1 − raison') },
  { id: 'split', label: t('Séparer en deux séries géométriques') },
  { id: 'des', label: t('Décomposer en éléments simples') },
  { id: 'sn', label: t('Écrire S_N et télescoper') },
  { id: 'lim', label: t('Passer à la limite') },
  { id: 'eval', label: t('Calculer') },
  { id: 'start0', label: t('Appliquer 1/(1 − q)'), rule: 'a1_geo_sum_start', why: t('1/(1 − q) est la somme à partir de k = 0 : regarde d\'abord le premier terme.') },
];

const DEF = { kind: 'definite' };
const LIMN = { kind: 'limit', v: 'N', vars: ['N'], to: '+∞', discrete: true };
const SN = { kind: 'equiv', vars: ['N'], domain: { N: { int: [1, 12] } }, target: 'no-sum' };
const DES = { kind: 'equiv', vars: ['k'], domain: { k: [1, 10] }, target: 'no-prime' };
const QS = [q(1, 2), q(-1, 2), q(1, 3), q(-1, 3), q(2, 3), q(-2, 3), q(3, 4), q(1, 4), q(-1, 4)];

// ---------- data ----------

function geoData(rng) {
  for (let i = 0; i < 200; i++) {
    const R = rng.pick(QS);
    const k0 = rng.int(0, 3);
    const c = rng.pick([1, 1, 2, 3, 4, 5, 6]) * rng.pick([1, 1, -1]);
    const first = R.pow(k0).mul(c);
    const sum = first.div(Q.of(1).sub(R));
    if (sum.d > 60 || first.d > 81) continue;
    return { kind: 'geo', R, k0, c, first, sum };
  }
  return { kind: 'geo', R: q(1, 3), k0: 2, c: 2, first: q(2, 9), sum: q(1, 3), fallback: true };
}

function comboData(rng) {
  for (let i = 0; i < 200; i++) {
    const cc = rng.int(3, 6);
    const a = rng.int(1, cc - 1);
    const b = rng.int(1, cc - 1);
    if (a >= b) continue;
    const k0 = rng.int(0, 1);
    const ra = q(a, cc);
    const rb = q(b, cc);
    const part = (r) => r.pow(k0).div(Q.of(1).sub(r));
    const sum = part(ra).add(part(rb));
    if (sum.d > 60) continue;
    return { kind: 'combo', cc, a, b, k0, ra, rb, sum, pa: part(ra), pb: part(rb) };
  }
  return { kind: 'combo', cc: 3, a: 1, b: 2, k0: 0, ra: q(1, 3), rb: q(2, 3), sum: q(9, 2), pa: q(3, 2), pb: Q.of(3), fallback: true };
}

function teleData(rng) {
  const a = rng.int(0, 3);
  const p = rng.pick([1, 2, 2]);
  const heads = [];
  for (let j = 1; j <= p; j++) heads.push(q(1, a + j));
  const sum = heads.reduce((s, x) => s.add(x), Q.of(0));
  return { kind: 'tele', a, p, heads, sum };
}

// ---------- texts ----------

const S = (e, lo, hi = '∞') => `sum(${e},k,${lo},${hi})`;
const kpa = (a) => lin(-a, 'k'); // k + a
const termText = (d) => (d.a === 0 ? `${d.p}/(k(k+${d.p}))` : `${d.p}/((${kpa(d.a)})(${kpa(d.a + d.p)}))`);
const desText = (d) => `1/${d.a === 0 ? 'k' : `(${kpa(d.a)})`}-1/(${kpa(d.a + d.p)})`;
function snText(d) {
  const heads = d.heads.map((h) => N(h));
  const tails = [];
  for (let j = 1; j <= d.p; j++) tails.push(`-1/(${lin(-(d.a + j), 'N')})`);
  return heads.join('+') + tails.join('');
}
const termsNote = (d) => {
  const u = (k) => `1/${d.a + k}`;
  if (d.p === 1) return `S_N = (${u(1)} − ${u(2)}) + (${u(2)} − ${u(3)}) + … + (1/(N${d.a ? ` + ${d.a}` : ''}) − 1/(N + ${d.a + 1}))`;
  return t('S_N = ({u1} − {u3}) + ({u2} − {u4}) + ({u3} − {u5}) + … : il reste {u1} et {u2}, et les deux derniers termes négatifs', { u1: u(1), u2: u(2), u3: u(3), u4: u(4), u5: u(5) });
};

// ---------- lines items ----------

function geoLines(level, rng, opts) {
  const d = geoData(rng);
  const start = S(geoTerm(d.c, d.R, 'k'), d.k0);
  const formula = `(${N(d.first)})/(1-${P(d.R)})`;
  const lines = level <= 3 ? [E(formula, t('Premier terme sur 1 − raison'), 'geo', 'geo'), E(N(d.sum), t('Calculer'), 'geo', 'eval')] : [E(N(d.sum), t('Premier terme sur 1 − raison'), 'geo', 'geo')];
  if (level === 1) lines[0] = blanked(lines[0], [`1-${P(d.R)}`]);
  if (level === 2) lines[0] = blanked(lines[0], [N(d.first)]);
  const given = level === 1 ? ` ${t('Le premier terme vaut {a} et la raison {q}.', { a: fr(d.first), q: fr(d.R) })}` : '';
  return partsItem({
    skill: GT, level, prompt: `${t('Calcule {s}.', { s: MN(start) })}${given}`, parts: [part(null, null, start, DEF, lines)], choices: CHOICES,
    hints: H(t('Une série géométrique de raison q, |q| < 1, vaut premier terme sur (1 − q).'), `${MN(start)} = ▢/(1 − ${fr(P(d.R))})`, `${MN(formula)} = ${fr(d.sum)}`),
    subgoals: SUB, keys: KEYS, key: `${GT}:${level}:${start}`, exam: examOf(opts), fallback: d.fallback,
  });
}

function comboLines(level, rng, opts) {
  const d = comboData(rng);
  const top = d.a === 1 ? `1+${d.b}^k` : `${d.a}^k+${d.b}^k`;
  const start = S(`(${top})/${d.cc}^k`, d.k0);
  const split = `${S(`(${d.a}/${d.cc})^k`, d.k0)}+${S(`(${d.b}/${d.cc})^k`, d.k0)}`;
  const fa = d.k0 ? `(${N(d.ra)})/(1-${N(d.ra)})` : `1/(1-${N(d.ra)})`;
  const fb = d.k0 ? `(${N(d.rb)})/(1-${N(d.rb)})` : `1/(1-${N(d.rb)})`;
  const lines = level <= 3
    ? [E(split, t('Séparer : deux séries géométriques'), 'geo', 'split'), E(`${fa}+${fb}`, t('Premier terme sur 1 − raison'), 'geo', 'geo'), E(N(d.sum), t('Calculer'), 'geo', 'eval')]
    : [E(split, t('Deux séries géométriques'), 'geo', 'split'), E(N(d.sum), t('Premier terme sur 1 − raison'), 'geo', 'geo')];
  if (level === 1) lines[1] = blanked(lines[1], [`1-${N(d.rb)}`]);
  if (level === 2) lines[0] = blanked(lines[0], [`(${d.b}/${d.cc})^k`]);
  return partsItem({
    skill: GT, level, prompt: t('Calcule {s}.', { s: MN(start) }), parts: [part(null, null, start, DEF, lines)], choices: CHOICES,
    hints: H(t('Sépare la fraction : ({top})/{c}ᵏ est une somme de deux puissances k-ièmes.', { top: top.replace('^k', 'ᵏ').replace('^k', 'ᵏ'), c: d.cc }), `${MN(start)} = ${MN(S(`(${d.a}/${d.cc})^k`, d.k0))} + ▢`, `${MN(`${fa}+${fb}`)} = ${fr(d.sum)}`),
    subgoals: SUB, keys: KEYS, key: `${GT}:${level}:${start}`, exam: examOf(opts), fallback: d.fallback,
  });
}

function teleLines(level, rng, opts) {
  const d = teleData(rng);
  const start = S(termText(d), 1);
  const sn = snText(d);
  const parts = [];
  if (level >= 2) {
    const l = [E(desText(d), t('Décomposition en éléments simples'), 'des', 'des')];
    if (level === 2) l[0] = blanked(l[0], [`1/(${kpa(d.a + d.p)})`]);
    parts.push(part(t('Décompose le terme général :'), `${d.p}/(…) =`, termText(d), DES, l));
  }
  const snLines = [E(sn, d.p === 1 ? t('Télescoper : il reste le premier et le dernier terme') : t('Télescoper : décalage de {p}, il reste {p} termes au début et {p} à la fin', { p: d.p }), 'shift', 'sn')];
  if (level <= 2) snLines[0] = blanked(snLines[0], [`1/(${lin(-(d.a + d.p), 'N')})`]);
  const snPart = part(t('Somme partielle :'), 'S_N =', S(desText(d), 1, 'N'), SN, snLines, level <= 3 ? [{ kind: 'note', html: termsNote(d) }] : null);
  parts.push(snPart);
  parts.push(part(t('Passe à la limite :'), 'lim S_N =', sn, LIMN, [E(N(d.sum), t('Les termes en N tendent vers 0'), 'lim', 'lim')]));
  const given = level === 1 ? ` ${t('On donne {a} = {b}.', { a: MN(termText(d)), b: MN(desText(d)) })}` : '';
  return partsItem({
    skill: GT, level, prompt: `${t('Calcule {s} à l\'aide des sommes partielles S_N.', { s: MN(start) })}${given}`, parts, choices: CHOICES,
    hints: H(t('Décompose en deux fractions, puis écris les premiers termes de S_N : beaucoup s\'annulent.'), `S_N = ${fr(N(d.heads[0]))} + … − 1/(N + ${d.a + 1}) − …`, `${MN(sn)} → ${fr(d.sum)}`),
    subgoals: SUB, keys: KEYS, key: `${GT}:${level}:${start}`, exam: examOf(opts), declares: { vars: ['k', 'N'] },
  });
}

// Divergent telescoping series: Σ ln((k + 1)/k) (S_N = ln(N + 1)) or
// Σ (√(k + 1) − √k) written 1/(√(k + 1) + √k) (S_N = √(N + 1) − 1).
const DIVERGENT = {
  ln: {
    term: 'ln((k+1)/k)', split: 'ln(k+1)-ln(k)', sn: 'ln(N+1)', splitNote: 'ln(a/b) = ln a − ln b', snNote: t('Télescoper : ln 1 = 0'), blank: 'N+1',
    hints: [t('ln((k + 1)/k) = ln(k + 1) − ln k : la somme télescope.'), 'S_N = ln(N + 1) − ln ▢', t('S_N = ln(N + 1) → +∞ : la série diverge, même si ses termes tendent vers 0.')],
  },
  sqrt: {
    term: '1/(√(k+1)+√(k))', split: '√(k+1)-√(k)', sn: '√(N+1)-1', splitNote: t('Multiplier par la quantité conjuguée √(k + 1) − √k'), snNote: t('Télescoper : il reste −√1 et √(N + 1)'), blank: '√(N+1)',
    hints: [t('Multiplie par la quantité conjuguée : 1/(√(k + 1) + √k) = √(k + 1) − √k, puis la somme télescope.'), 'S_N = ▢ − 1', t('S_N = √(N + 1) − 1 → +∞ : la série diverge, même si ses termes tendent vers 0.')],
  },
};

function lnLines(level, rng, opts) {
  const kind = rng.pick(['ln', 'sqrt']);
  const D = DIVERGENT[kind];
  const start = S(D.term, 1);
  const parts = [
    part(t('Somme partielle :'), 'S_N =', S(D.term, 1, 'N'), SN,
      level <= 3 ? [E(S(D.split, 1, 'N'), D.splitNote, 'shift', 'des'), E(D.sn, D.snNote, 'shift', 'sn')] : [E(D.sn, t('Télescoper'), 'shift', 'sn')]),
    part(t('Passe à la limite :'), 'lim S_N =', D.sn, LIMN, [E('+∞', t('S_N → +∞ : la série diverge'), 'lim', 'lim')]),
  ];
  if (level <= 2) parts[0].lines[1] = blanked(parts[0].lines[1], [D.blank]);
  return partsItem({
    skill: GT, level, prompt: t('La série {s} converge-t-elle ? Calcule ses sommes partielles S_N.', { s: MN(start) }), parts, choices: CHOICES,
    hints: H(...D.hints), subgoals: SUB, keys: KEYS, key: `${GT}:${level}:${kind}`, exam: examOf(opts),
  });
}

// Level 5: a telescoping and a geometric series in one sum (definite).
function mixedLines(rng, opts) {
  const tl = teleData(rng);
  const g = geoData(rng);
  const R = g.R;
  const geo = geoTerm(1, R, 'k');
  const start = S(`${termText(tl)}+${geo}`, 1);
  const gsum = R.div(Q.of(1).sub(R));
  const total = tl.sum.add(gsum);
  const lines = [
    E(`${S(desText(tl), 1)}+${S(geo, 1)}`, t('Séparer ; décomposer le premier terme'), 'des', 'des'),
    E(`${tl.heads.map((h) => N(h)).join('+')}+(${N(R)})/(1-${P(R)})`, t('Télescoper ; premier terme sur 1 − raison'), 'geo', 'sn'),
    E(N(total), t('Calculer'), 'lim', 'eval'),
  ];
  return partsItem({
    skill: GT, level: 5, prompt: t('Calcule {s}.', { s: MN(start) }), parts: [part(null, null, start, DEF, lines)],
    hints: [], subgoals: SUB, keys: KEYS, key: `${GT}:5:${start}`, exam: examOf(opts), fallback: g.fallback,
  });
}

// ---------- exam variants ----------

function seriesMcq(rng, opts, level = 4) {
  if (rng.chance(0.5)) {
    const d = geoData(rng);
    const start = S(geoTerm(d.c, d.R, 'k'), d.k0);
    const from0 = Q.of(d.c).div(Q.of(1).sub(d.R));
    const next = d.first.mul(d.R).div(Q.of(1).sub(d.R));
    const plus = d.first.div(Q.of(1).add(d.R));
    const options = [
      { html: fr(d.sum), correct: true },
      { html: fr(from0), correct: false, rule: d.k0 ? 'a1_geo_sum_start' : undefined },
      { html: fr(next), correct: false },
      { html: fr(plus), correct: false },
      { html: fr(d.first), correct: false },
      { html: t('La série diverge'), correct: false },
    ];
    for (const o of options) if (!o.rule) delete o.rule;
    return mcqOf({
      skill: GT, level, prompt: `${MN(start)} =`, options, key: `${GT}:mcq:${start}`, expectedSec: 240, exam: examOf(opts), fallback: d.fallback,
      solution: [{ html: t('Premier terme {a}, raison {q} : {a}/(1 − {qp}) = {s}.', { a: fr(d.first), q: fr(d.R), qp: fr(P(d.R)), s: fr(d.sum) }), note: '' }],
    }, rng);
  }
  const d = teleData(rng);
  const start = S(termText(d), 1);
  const options = [
    { html: fr(d.sum), correct: true },
    ...(d.p > 1 ? [{ html: fr(d.heads[0]), correct: false, rule: 'a1_tele_wrong_terms' }] : []),
    { html: fr(d.heads[0].add(q(1, d.a + d.p + 1))), correct: false },
    { html: fr(q(1, d.a + d.p)), correct: false },
    { html: fr(d.sum.mul(d.p)), correct: false },
    { html: fr(d.sum.mul(2)), correct: false },
    { html: fr(q(1, d.a + d.p + 1)), correct: false },
    { html: '1', correct: false },
    { html: t('La série diverge'), correct: false },
  ];
  return mcqOf({
    skill: GT, level, prompt: `${MN(start)} =`, options, key: `${GT}:mcq:${start}`, expectedSec: 240, exam: examOf(opts),
    solution: [{ html: `${MN(termText(d))} = ${MN(desText(d))} ; S_N = ${MN(snText(d))} → ${fr(d.sum)}.`, note: '' }],
  }, rng);
}

function seriesTf(rng, opts) {
  const kind = rng.pick(['partial', 'start', 'start', 'geo', 'zero']);
  if (kind === 'partial') {
    return tfItem({
      skill: GT, level: 4, truth: true, key: 'partial', exam: examOf(opts),
      statement: t('Si les sommes partielles sₙ d\'une série vérifient lim sₙ = 1, alors lim (s₂ₙ − sₙ) = 0.'),
      explanation: t('Vrai : s₂ₙ et sₙ tendent toutes deux vers 1 (s₂ₙ est une sous-suite de sₙ), donc leur différence tend vers 0.'),
    });
  }
  if (kind === 'start') {
    const k0 = rng.pick([1, 2]);
    return tfItem({
      skill: GT, level: 4, truth: false, key: `start:${k0}`, exam: examOf(opts), ruleIfTrue: 'a1_geo_sum_start',
      statement: t('Pour tout q ∈ ]0 ; 1[, {s} = 1/(1 − q).', { s: MN(S('q^k', k0)) }),
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'q', dom: 'R' }], pred: `0<q<1⇒q^${k0}/(1-q)=1/(1-q)`, hyp: '0<q<1', ask: [{ v: 'q', label: 'q =', keys: ['calc'] }], answer: { q: '1/2' } },
      explanation: t('Faux : la somme commence à k = {k0}, son premier terme est {qk} : elle vaut {qk}/(1 − q). Pour q = 1/2 : {v}, et pas 2.', { k0, qk: `q${k0 === 1 ? '' : '²'}`, v: k0 === 1 ? '1' : '1/2' }),
    });
  }
  if (kind === 'zero') {
    return tfItem({
      skill: GT, level: 4, truth: false, key: 'zero', exam: examOf(opts),
      statement: t('Si uₙ → 0, alors la série Σ uₙ converge.'),
      counter: { kind: 'sequence', v: 'n', from: 1, hyp: [{ p: 'toZero' }], concl: { p: 'seriesConverges' }, ask: [{ v: 'a', label: 'uₙ =', keys: ['calc', 'seq'] }], answer: { a: 'ln((n+1)/n)' } },
      explanation: t('Faux : uₙ = ln((n + 1)/n) → 0, mais la série télescope : S_N = ln(N + 1) → +∞.'),
    });
  }
  const d = geoData(rng);
  const start = S(geoTerm(d.c, d.R, 'k'), d.k0);
  return tfItem({
    skill: GT, level: 4, truth: true, key: `geo:${start}`, exam: examOf(opts), fallback: d.fallback,
    statement: `${MN(start)} = ${fr(d.sum)}.`,
    explanation: t('Vrai : premier terme {a}, raison {q} : {a}/(1 − {qp}) = {s}.', { a: fr(d.first), q: fr(d.R), qp: fr(P(d.R)), s: fr(d.sum) }),
  });
}

export function seriesItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return seriesMcq(rng, opts);
  if (opts.exam === 'tf') return seriesTf(rng, opts);
  if (level === 5) return rng.chance(0.3) ? seriesMcq(rng, opts, 5) : mixedLines(rng, opts);
  const kind = rng.pick(['geo', 'geo', 'geo', 'combo', 'combo', 'tele', 'tele', 'tele', 'tele', 'ln']);
  if (kind === 'geo') return geoLines(level, rng, opts);
  if (kind === 'combo') return comboLines(level, rng, opts);
  if (kind === 'ln') return lnLines(level, rng, opts);
  return teleLines(level, rng, opts);
}

// Generators of module G5 (unit `recurrence`), spec §8.3. Catalogue:
// docs/universite/G-gymnase-1.md, G5.
//
// Sums are typed sum(terme, k, début, fin) (the Σ key) and shown as Σ.
// Lines with n are judged by `equiv` at whole n (domain n ∈ [1 ; 12]), with
// the final form 'no-sum' (no Σ left; expanded or factored as asked);
// numbers by `value`. Inductions are proofs in blocks (the catalogue's scale
// for skills without calculation lines), except g5-induction-sum whose
// heredity is a `lines` item. Every generator starts from the answer.
// opts.exam = 'mcq' | 'tf' | 'open' gives the exam variants.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText, toReadable } from '../../cas/print.js';
import { exactValue } from '../../cas/normal.js';
import { lit } from '../../cas/ast.js';
import { polyOf, polyNode } from '../../cas/polyx.js';
import { blankLine } from '../../judges/lines.js';
import {
  MT, fr, linesItem, mcq, tfItem, blocksItem,
} from './kit.js';

const q = (n, d = 1) => new Q(n, d);
const QT = (x) => toText(lit(Q.of(x)));
const NO = { vars: ['n'] };
const RD = (t, vars = ['n', 'k', 'j']) => toReadable(parse(t, { vars }));
const MN = (t) => MT(t, NO);
const MK = (t) => MT(t, { vars: ['n', 'k'] });
const EQN = (extra = {}) => ({ kind: 'equiv', vars: ['n'], domain: { n: { int: [1, 12] } }, target: 'no-sum', ...extra });
const VAL = (extra = {}) => ({ kind: 'value', ...extra });
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
const KEYS = ['calc', 'seq'];
const examOf = (opts, points) => (opts.exam ? { format: opts.exam, points } : false);

// A polynomial in v as text, from a text: 3k^2-k+2.
const polyText = (text, v) => toText(polyNode(polyOf(parse(text, { vars: [v] })), v));
// The leaves of a sum a + b − c (for blanks): [a, b, c].
function leaves(n) {
  if (n.t === 'bin' && (n.op === '+' || n.op === '-')) return [...leaves(n.l), n.r];
  return [n];
}
// Terms joined with their signs: 3, −1, 5 → 3-1+5.
const joinSigned = (xs) => xs.map((x, i) => {
  const t = typeof x === 'string' ? x : QT(x);
  if (!i) return t;
  return t.startsWith('-') ? t : `+${t}`;
}).join('');
// c·inner with c = ±1 written as ±inner.
const times = (c, inner) => (c === 1 ? inner : c === -1 ? `-${inner}` : `${c}${inner}`);
const sumT = (e, lo, hi, k = 'k') => `sum(${e},${k},${lo},${hi})`;
// Σ_{k=lo}^{hi} e in MathML.
const SIG = (e, lo, hi) => MK(sumT(e, lo, hi));

// ======================================================================
// g5-sigma
// ======================================================================

const SIGMA = 'g5-sigma';
const SIG_SUB = [
  { id: 'develop', label: 'écrire les termes', skill: SIGMA },
  { id: 'linear', label: 'linéarité', skill: SIGMA },
  { id: 'formula', label: 'formules du cours', skill: SIGMA },
  { id: 'reduce', label: 'réduire', skill: 'lit-reduce' },
];
const SIG_HINTS = (lin, form) => [
  { level: 1, html: 'Sépare la somme en sommes de k², de k et de constantes. Σ d\'une constante c vaut c × (nombre de termes).' },
  { level: 2, html: lin },
  { level: 3, html: form },
];

// The term a·k² + b·k + c (a = 0 for degree 1), its sum from 1 to N.
function sigmaData(rng, deg) {
  const a = deg === 2 ? rng.int(1, 3) : 0;
  const b = deg === 2 ? rng.int(-3, 4) : rng.int(1, 4);
  let c = rng.int(-3, 5);
  if (c === 0 && (deg === 1 || b === 0)) c = 2;
  const term = polyText(`${a}k^2+${b}k+${c}`, 'k');
  return { a, b, c, term };
}

// a·Σk² + b·Σk + Σc, with the bound N (a number or n).
function sigmaLines(d, N) {
  const parts = [];
  if (d.a) parts.push(times(d.a, sumT('k^2', 1, N)));
  if (d.b) parts.push(times(d.b, sumT('k', 1, N)));
  if (d.c) parts.push(d.c > 0 ? sumT(d.c, 1, N) : `-${sumT(-d.c, 1, N)}`);
  const lin = joinSigned(parts);
  const f = [];
  if (N === 'n') {
    if (d.a) f.push(times(d.a, 'n(n+1)(2n+1)/6'));
    if (d.b) f.push(times(d.b, 'n(n+1)/2'));
    if (d.c) f.push(times(d.c, 'n'));
  } else {
    if (d.a) f.push(times(d.a, `(${N}×${N + 1}×${2 * N + 1}/6)`).replace(/^(-?\d+)\(/, '$1×('));
    if (d.b) f.push(times(d.b, `(${N}×${N + 1}/2)`).replace(/^(-?\d+)\(/, '$1×('));
    if (d.c) f.push(d.c === 1 ? `${N}` : d.c === -1 ? `-${N}` : `${d.c}×${N}`);
  }
  const form = joinSigned(f);
  return { lin, form };
}

const sigmaValue = (d, N) => q(d.a * N * (N + 1) * (2 * N + 1), 6).add(q(d.b * N * (N + 1), 2)).add(q(d.c * N));
const sigmaPoly = (d) => polyText(`${d.a}n(n+1)(2n+1)/6+${d.b}n(n+1)/2+${d.c}n`, 'n');

function sigmaItem(level, rng, opts = {}) {
  if (level === 1) {
    const a = rng.int(1, 4);
    const b = rng.int(-3, 5);
    const m = rng.int(3, 5);
    const lo = rng.pick([0, 1, 1, 2]);
    const hi = lo + m - 1;
    const term = polyText(`${a}k+${b}`, 'k');
    const terms = Array.from({ length: m }, (_, i) => q(a * (lo + i) + b));
    const line1 = joinSigned(terms);
    const total = terms.reduce((s, x) => s.add(x), q(0));
    const node = parse(line1);
    const lv = leaves(node);
    const start = sumT(term, lo, hi);
    return linesItem({
      skill: SIGMA, level, prompt: `Écris les termes de ${SIG(term, lo, hi)} un par un, puis calcule.`,
      start, judge: VAL(), mode: 'guided',
      script: [
        { kind: 'eq', ...blankLine(node, lv.slice(-2)), note: `k = ${lo}, ${lo + 1}, …, ${hi} : ${m} termes`, subgoal: 'develop' },
        { kind: 'eq', math: QT(total), note: 'Additionner', subgoal: 'reduce' },
      ],
      hints: [
        { level: 1, html: `Remplace k par ${lo}, puis ${lo + 1}, … jusqu'à ${hi}.` },
        { level: 2, html: `Pour k = ${lo} : ${fr(QT(terms[0]))}. Pour k = ${hi} : …` },
        { level: 3, html: MT(line1) },
      ],
      subgoals: SIG_SUB, keys: KEYS, key: `${SIGMA}:dev:${start}`,
    });
  }
  if (level === 2) {
    const a = rng.int(2, 5);
    const b = rng.int(-3, 5);
    const m = rng.int(6, 12);
    const term = polyText(`${a}k+${b}`, 'k');
    const terms = Array.from({ length: m }, (_, i) => a * (i + 1) + b);
    const shown = `${terms.slice(0, 3).map((x) => fr(x)).join(' + ')} + … + ${fr(terms[m - 1])}`.replace(/\+ −/g, '− ');
    const node = parse(sumT(term, 1, m));
    return linesItem({
      skill: SIGMA, level, prompt: `Écris avec Σ (au clavier : sum(terme, k, début, fin)) : S = ${shown}.`,
      start: 'S', judge: VAL({ terms: terms.map(String) }), mode: 'guided',
      script: [
        { kind: 'note', html: `On passe de ${fr(terms[0])} à ${fr(terms[1])} en ajoutant ${a} : le terme est de la forme ${a}k + …` },
        { kind: 'eq', ...blankLine(node, [node.e, node.lo, node.hi]), note: 'Terme général et bornes', subgoal: 'develop' },
      ],
      hints: [
        { level: 1, html: `Les termes augmentent de ${a} : le terme général est ${a}k + b. Trouve b avec le premier terme.` },
        { level: 2, html: `Avec k = 1 : ${a} + b = ${fr(terms[0])}. Combien de termes jusqu'à ${fr(terms[m - 1])} ?` },
        { level: 3, html: SIG(term, 1, m) },
      ],
      subgoals: SIG_SUB, keys: KEYS, key: `${SIGMA}:write:${term}:${m}`,
    });
  }
  if (level === 3) {
    const deg = rng.chance(0.5) ? 2 : 1;
    const d = sigmaData(rng, deg);
    const N = deg === 2 ? rng.int(5, 15) : rng.int(10, 30);
    const { lin, form } = sigmaLines(d, N);
    const start = sumT(d.term, 1, N);
    return linesItem({
      skill: SIGMA, level, prompt: `Calcule ${SIG(d.term, 1, N)}.`,
      start, judge: VAL({ form: 'irreducible' }), mode: 'tap', tapActions: 'sigma',
      script: [
        { kind: 'eq', math: lin, note: 'Linéarité', subgoal: 'linear' },
        { kind: 'eq', math: form, note: `Formules ; ${N} termes`, subgoal: 'formula' },
        { kind: 'eq', math: QT(sigmaValue(d, N)), note: 'Calculer', subgoal: 'reduce' },
      ],
      hints: SIG_HINTS(MK(lin), MT(form)),
      subgoals: SIG_SUB, keys: KEYS, key: `${SIGMA}:${start}`,
    });
  }
  // Levels 4 and 5: n symbolic; level 5 then the value for a given n.
  const d = sigmaData(rng, level === 5 ? 2 : rng.chance(0.5) ? 2 : 1);
  const { lin, form } = sigmaLines(d, 'n');
  const closed = sigmaPoly(d);
  const start = sumT(d.term, 1, 'n');
  const script = [
    { kind: 'eq', math: lin, note: 'Linéarité', subgoal: 'linear' },
    { kind: 'eq', math: form, note: 'Formules du cours', subgoal: 'formula' },
    { kind: 'eq', math: closed, note: 'Développer et réduire', subgoal: 'reduce' },
  ];
  let prompt = `Calcule ${SIG(d.term, 1, 'n')} en fonction de n (polynôme réduit).`;
  if (level === 5) {
    const N = rng.int(8, 20);
    script.push({ kind: 'segment', html: `Valeur pour n = ${N} :`, ask: `S(${N}) =`, start: { math: `S_${N}` }, judge: VAL({ expect: QT(sigmaValue(d, N)) }) },
      { kind: 'eq', math: QT(sigmaValue(d, N)), note: `n = ${N}`, subgoal: 'reduce' });
    prompt = `Calcule S(n) = ${SIG(d.term, 1, 'n')} en fonction de n (polynôme réduit), puis S(${N}).`;
  }
  return linesItem({
    skill: SIGMA, level, prompt, start, judge: EQN({ expanded: true }), mode: 'free',
    script, hints: SIG_HINTS(MK(lin), MN(form)),
    subgoals: SIG_SUB, keys: KEYS, key: `${SIGMA}:${level}:${start}`, exam: examOf(opts, 3),
  });
}

function sigmaMcq(rng) {
  const N = rng.int(10, 25);
  if (rng.chance(0.5)) {
    const a = rng.int(2, 4);
    const b = rng.int(1, 5);
    const term = polyText(`${a}k+${b}`, 'k');
    const right = q(a * N * (N + 1), 2).add(q(b * N));
    const options = [
      { html: fr(QT(right)), correct: true },
      { html: fr(QT(q(a * N * (N + 1), 2).add(q(b * (N - 1))))), correct: false, rule: 'g5_count_terms' },
      { html: fr(QT(q(a * N * (N + 1), 2).add(q(b)))), correct: false, rule: 'g5_count_terms' },
      { html: fr(QT(q(a * N * (N - 1), 2).add(q(b * N)))), correct: false },
    ];
    return mcq({
      skill: SIGMA, level: 4, prompt: `${SIG(term, 1, N)} =`, options: options.filter((o, i, x) => x.findIndex((y) => y.html === o.html) === i),
      key: `mcq:${term}:${N}`, exam: { format: 'mcq', points: 1 },
      solution: [{ html: `${a}·${N}·${N + 1}/2 + ${b}·${N} = ${fr(QT(right))}`, note: `${N} termes` }],
    }, rng);
  }
  const right = q(N * (N + 1) * (2 * N + 1), 6);
  const options = [
    { html: fr(QT(right)), correct: true },
    { html: fr(QT(q(N * (N + 1), 2).mul(q(N * (N + 1), 2)))), correct: false, rule: 'g5_sum_product' },
    { html: fr(QT(q((N - 1) * N * (2 * N - 1), 6))), correct: false, rule: 'g5_count_terms' },
    { html: fr(QT(q(N * (N + 1), 2))), correct: false },
  ];
  return mcq({
    skill: SIGMA, level: 4, prompt: `${SIG('k^2', 1, N)} =`, options, key: `mcq:k2:${N}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `${N}·${N + 1}·${2 * N + 1}/6 = ${fr(QT(right))}`, note: 'Formule de Σ k²' }],
  }, rng);
}

const SIGMA_TF = [
  { s: `${SIG('k^2', 1, 'n')} = (${SIG('k', 1, 'n')})²`, truth: false, pred: '(sum(k^2,k,1,n))=(sum(k,k,1,n))^2', answer: '2', why: 'Faux : pour n = 2, 1 + 4 = 5 mais (1 + 2)² = 9.', rule: 'g5_sum_product' },
  { s: `${SIG('k(k+1)', 1, 'n')} = ${SIG('k', 1, 'n')} · ${SIG('k+1', 1, 'n')}`, truth: false, pred: 'sum(k(k+1),k,1,n)=sum(k,k,1,n)×sum(k+1,k,1,n)', answer: '2', why: 'Faux : pour n = 2, 2 + 6 = 8 mais 3 · 5 = 15.', rule: 'g5_sum_product' },
  { s: `${SIG('1', 0, 'n')} = n`, truth: false, pred: 'sum(1,k,0,n)=n', answer: '1', why: 'Faux : de 0 à n, il y a n + 1 termes.', rule: 'g5_count_terms' },
  { s: `${SIG('2k', 1, 'n')} = 2${SIG('k', 1, 'n')}`, truth: true, why: 'Vrai : linéarité, la constante sort de la somme.' },
  { s: `${SIG('k+1', 1, 'n')} = ${MK('sum(j,j,2,n+1)')}`, truth: true, why: 'Vrai : avec j = k + 1, j va de 2 à n + 1.' },
  { s: `${SIG('5', 1, 'n')} = 5n`, truth: true, why: 'Vrai : n termes égaux à 5.' },
];

function sigmaTf(rng) {
  const t = rng.pick(SIGMA_TF);
  return tfItem({
    skill: SIGMA, level: 4, statement: `Pour tout n ≥ 1 : ${t.s}`, truth: t.truth, key: t.pred || t.s,
    counter: t.truth ? null : { kind: 'refute', quants: [{ q: '∀', v: 'n', dom: 'N*' }], pred: t.pred, ask: [{ v: 'n', label: 'n =', keys: ['calc'] }], answer: { n: t.answer } },
    ruleIfTrue: t.truth ? null : t.rule, explanation: t.why, exam: { format: 'tf', points: 1 },
  });
}

const GEN_SIGMA = {
  [SIGMA]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? sigmaMcq(rng) : opts.exam === 'tf' ? sigmaTf(rng) : sigmaItem(level, rng, opts)),
};


// ======================================================================
// g5-reindex
// ======================================================================

const REIDX = 'g5-reindex';
const REIDX_SUB = [
  { id: 'shift', label: 'changer d\'indice', skill: REIDX },
  { id: 'decompose', label: 'décomposer', skill: 'g0-pfd-simple' },
  { id: 'telescope', label: 'télescoper', skill: REIDX },
  { id: 'formula', label: 'formule du cours', skill: SIGMA },
  { id: 'reduce', label: 'réduire', skill: 'lit-reduce' },
];

// j or j² summed after a shift j = k − c.
function shiftData(rng) {
  const sq = rng.chance(0.5);
  const c = rng.pick([1, 2, -1]);
  const kc = c > 0 ? `k-${c}` : `k+${-c}`;
  const term = sq ? `(${kc})^2` : kc;
  const hi = c > 0 ? `n+${c}` : `n-${-c}`;
  const start = sumT(term, 1 + c, hi);
  return {
    c, kc, hi, start, sq,
    lines: [
      { math: sumT(sq ? 'j^2' : 'j', 1, 'n', 'j'), note: `j = ${RD(kc)} : k = ${1 + c} donne j = 1`, subgoal: 'shift' },
      { math: sq ? 'n(n+1)(2n+1)/6' : 'n(n+1)/2', note: 'Formule du cours', subgoal: 'formula' },
    ],
  };
}

// Telescoping sums: the start, the decomposed sum, the written terms, the result.
function teleData(rng, kinds = ['frac1', 'frac2', 'ln', 'sqrt']) {
  const kind = rng.pick(kinds);
  if (kind === 'frac1') {
    const m = rng.pick([1, 1, 2, 3]);
    return {
      kind, start: sumT(`${m}/(k(k+1))`, 1, 'n'), decomposed: sumT(`${m}/k-${m}/(k+1)`, 1, 'n'),
      terms: `(${m} − ${m}/2) + (${m}/2 − ${m}/3) + … + (${m}/n − ${m}/(n + 1))`,
      tele: `${m}-${m}/(n+1)`, final: `${m === 1 ? '' : m}n/(n+1)`, factored: true, value: (N) => q(m * N, N + 1),
      wrongEnd: `${m}-${m}/n`, decompNote: `${m}/(k(k + 1)) = ${m}/k − ${m}/(k + 1)`,
    };
  }
  if (kind === 'frac2') {
    return {
      kind, start: sumT('2/(k(k+2))', 1, 'n'), decomposed: sumT('1/k-1/(k+2)', 1, 'n'),
      terms: '(1 − 1/3) + (1/2 − 1/4) + (1/3 − 1/5) + … + (1/(n − 1) − 1/(n + 1)) + (1/n − 1/(n + 2))',
      tele: '3/2-1/(n+1)-1/(n+2)', final: '3/2-1/(n+1)-1/(n+2)', factored: false,
      value: (N) => q(3, 2).sub(q(1, N + 1)).sub(q(1, N + 2)), wrongEnd: '1-1/(n+2)', decompNote: '2/(k(k + 2)) = 1/k − 1/(k + 2)',
    };
  }
  if (kind === 'ln') {
    return {
      kind, start: sumT('ln(1+1/k)', 1, 'n'), decomposed: sumT('ln(k+1)-ln(k)', 1, 'n'),
      terms: '(ln 2 − ln 1) + (ln 3 − ln 2) + … + (ln(n + 1) − ln n)',
      tele: 'ln(n+1)-ln(1)', final: 'ln(n+1)', factored: true, value: null, decompNote: 'ln(1 + 1/k) = ln((k + 1)/k) = ln(k + 1) − ln k',
    };
  }
  return {
    kind, start: sumT('1/(sqrt(k+1)+sqrt(k))', 1, 'n'), decomposed: sumT('sqrt(k+1)-sqrt(k)', 1, 'n'),
    terms: '(√2 − √1) + (√3 − √2) + … + (√(n + 1) − √n)',
    tele: 'sqrt(n+1)-1', final: 'sqrt(n+1)-1', factored: false, value: null,
    decompNote: '1/(√(k + 1) + √k) = √(k + 1) − √k (multiplier par la quantité conjuguée)',
  };
}

const teleLines = (d) => [
  { kind: 'eq', math: d.decomposed, note: 'Décomposer', subgoal: 'decompose' },
  { kind: 'note', html: `Les termes : ${esc(d.terms)}` },
  { kind: 'eq', math: d.tele, note: 'Télescoper : il reste le début et la fin', subgoal: 'telescope' },
  ...(d.final !== d.tele ? [{ kind: 'eq', math: d.final, note: 'Réduire', subgoal: 'reduce' }] : []),
];

const teleHints = (d) => [
  { level: 1, html: `Écris le terme comme une différence : ${esc(d.decompNote)}.` },
  { level: 2, html: `Écris les premiers et les derniers termes : ${esc(d.terms)}. Presque tout s'annule.` },
  { level: 3, html: MN(d.tele) },
];

function reindexItem(level, rng, opts = {}) {
  if (level === 1 || (level === 4 && !opts.exam && rng.chance(0.3))) {
    const d = shiftData(rng);
    const node = parse(d.lines[0].math, NO);
    const first = level === 1 ? { ...d.lines[0], ...blankLine(node, [node.lo, node.hi], NO) } : d.lines[0];
    return linesItem({
      skill: REIDX, level, prompt: `Pose j = ${RD(d.kc)} pour écrire ${MN(d.start)} avec une formule du cours.`,
      start: d.start, judge: EQN({ factored: true }), mode: level === 1 ? 'guided' : 'free',
      script: [{ kind: 'eq', ...first }, { kind: 'eq', ...d.lines[1] }],
      hints: [
        { level: 1, html: 'Le terme change, et les bornes aussi : remplace k par j dans les deux.' },
        { level: 2, html: `Pour k = ${1 + d.c}, j = 1. Pour la dernière valeur de k, j = …` },
        { level: 3, html: MN(d.lines[0].math) },
      ],
      subgoals: REIDX_SUB, keys: KEYS, key: `${REIDX}:${level}:${d.start}`,
    });
  }
  if (level === 2) {
    const d = teleData(rng);
    const node = parse(d.tele, NO);
    const lv = leaves(node);
    return linesItem({
      skill: REIDX, level, prompt: `Calcule ${MN(d.start)}. La décomposition est donnée : ${esc(d.decompNote)}.`,
      start: d.decomposed, judge: EQN({ factored: d.factored }), mode: 'guided',
      script: [
        { kind: 'note', html: `Les termes : ${esc(d.terms)}` },
        { kind: 'eq', ...blankLine(node, lv.slice(-1), NO), note: 'Télescoper : il reste le début et la fin', subgoal: 'telescope' },
        ...(d.final !== d.tele ? [{ kind: 'eq', math: d.final, note: 'Réduire', subgoal: 'reduce' }] : []),
      ],
      hints: teleHints(d), subgoals: REIDX_SUB, keys: KEYS, key: `${REIDX}:2:${d.start}`,
    });
  }
  if (level === 5 || opts.exam) {
    const d = teleData(rng, ['frac1', 'frac2']);
    const N = rng.int(5, 20);
    return linesItem({
      skill: REIDX, level: opts.exam ? 4 : level, prompt: `Calcule S(n) = ${MN(d.start)} en fonction de n, puis S(${N}).`,
      start: d.start, judge: EQN({ factored: d.factored }), mode: 'free',
      script: [...teleLines(d), { kind: 'segment', html: `Valeur pour n = ${N} :`, ask: `S(${N}) =`, start: { math: `S_${N}` }, judge: VAL({ expect: QT(d.value(N)) }) },
        { kind: 'eq', math: QT(d.value(N)), note: `n = ${N}`, subgoal: 'reduce' }],
      hints: teleHints(d), subgoals: REIDX_SUB, keys: KEYS, key: `${REIDX}:5:${d.start}:${N}`, exam: examOf(opts, 4),
    });
  }
  const d = teleData(rng);
  return linesItem({
    skill: REIDX, level, prompt: `Calcule ${MN(d.start)} en fonction de n (somme télescopique).`, start: d.start,
    judge: EQN({ factored: d.factored }), mode: level === 3 ? 'tap' : 'free',
    tapActions: level === 3 ? 'telescope' : null, script: teleLines(d), hints: teleHints(d),
    subgoals: REIDX_SUB, keys: KEYS, key: `${REIDX}:${level}:${d.start}`,
  });
}

function reindexMcq(rng) {
  if (rng.chance(0.4)) {
    const d = shiftData(rng);
    const f = d.sq ? 'j^2' : 'j';
    const shifted = d.c > 0 ? `j-${d.c}` : `j+${-d.c}`;
    const g = d.sq ? `(${shifted})^2` : shifted;
    const options = [
      { html: MN(d.lines[0].math), correct: true },
      { html: MN(sumT(f, 1 + d.c, d.hi, 'j')), correct: false, rule: 'g5_reindex_half' },
      { html: MN(sumT(g, 1, 'n', 'j')), correct: false, rule: 'g5_reindex_half' },
      { html: MN(sumT(f, 1, 'n+1', 'j')), correct: false },
    ];
    return mcq({
      skill: REIDX, level: 4, prompt: `Avec j = ${RD(d.kc)}, ${MN(d.start)} =`, options: options.filter((o, i, x) => x.findIndex((y) => y.html === o.html) === i), key: `mcq:${d.start}`,
      exam: { format: 'mcq', points: 1 }, solution: [{ html: MN(d.lines[0].math), note: 'Le terme et les bornes changent' }],
    }, rng);
  }
  const d = teleData(rng, ['frac1', 'frac2']);
  const options = [
    { html: MN(d.final), correct: true },
    { html: MN(d.wrongEnd), correct: false, rule: 'g5_telescope_ends' },
    { html: MN(d.kind === 'frac2' ? '1-1/(n+1)' : `${d.tele.split('-')[0]}-${d.tele.split('-')[0]}/(n+2)`), correct: false },
    { html: MN(d.kind === 'frac2' ? '3/2-1/(n+2)' : `${d.tele.split('-')[0]}+${d.tele.split('-')[0]}/(n+1)`), correct: false },
  ];
  return mcq({
    skill: REIDX, level: 4, prompt: `${MN(d.start)} =`, options: options.filter((o, i, x) => x.findIndex((y) => y.html === o.html) === i),
    key: `mcq:${d.start}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `${MN(d.decomposed)} = ${MN(d.tele)}`, note: 'Télescoper' }],
  }, rng);
}

const GEN_REIDX = {
  [REIDX]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? reindexMcq(rng) : reindexItem(level, rng, opts)),
};


// ======================================================================
// g5-arith
// ======================================================================

const ARITH = 'g5-arith';
// x − y written with brackets around a negative y: 5 − (−3).
const minusT = (x, y) => `${x}-${Number(y) < 0 ? `(${y})` : y}`;
const timesT = (x, y) => `${x}×${Number(y) < 0 ? `(${y})` : y}`;
const plusT = (x, y) => `${x}+${String(y).startsWith('-') ? `(${y})` : y}`;
const SUBS = (k) => [...String(k)].map((c) => '₀₁₂₃₄₅₆₇₈₉'[c]).join('');
const uN = (k) => `u${SUBS(k)}`;

function arithData(rng) {
  return { u1: rng.int(-10, 10), r: nz(rng, -5, 7), n: rng.int(8, 40) };
}
const lastOf = (d) => d.u1 + (d.n - 1) * d.r;
const sumOf = (d) => q(d.n * (d.u1 + lastOf(d)), 2);

// The two parts: u_n, then S = n·(u₁ + u_n)/2.
function arithSegments(d, { blanks = false } = {}) {
  const un = lastOf(d);
  const termLine = plusT(d.u1, timesT(d.n - 1, d.r));
  const tn = parse(termLine);
  const sumLine = `${d.n}×(${plusT(d.u1, un)})/2`;
  return [
    {
      html: `${uN(d.n)} = ?`, start: `u_${d.n}`, judge: VAL({ expect: String(un), arith: { u1: d.u1, r: d.r, n: d.n } }),
      lines: [
        { kind: 'eq', ...(blanks ? blankLine(tn, [stripTimes(tn)]) : { math: termLine }), note: `De u₁ à ${uN(d.n)}, on ajoute ${d.n - 1} fois r`, subgoal: 'term' },
        { kind: 'eq', math: String(un), note: 'Calculer', subgoal: 'compute' },
      ],
    },
    {
      html: `S = u₁ + … + ${uN(d.n)} = ?`, start: 'S', judge: VAL({ expect: QT(sumOf(d)), arith: { u1: d.u1, r: d.r, n: d.n, sum: true } }),
      lines: [
        { kind: 'eq', math: sumLine, note: `${d.n} termes × (premier + dernier)/2`, subgoal: 'sum' },
        { kind: 'eq', math: QT(sumOf(d)), note: 'Calculer', subgoal: 'compute' },
      ],
    },
  ];
}
// The factor n − 1 of u₁ + (n − 1)·r (for a blank).
function stripTimes(n) {
  const r = n.r.t === 'paren' ? n.r.e : n.r;
  return r.l;
}

const ARITH_SUB = [
  { id: 'term', label: 'terme général', skill: ARITH },
  { id: 'sum', label: 'somme', skill: ARITH },
  { id: 'compute', label: 'calculer', skill: 'lit-reduce' },
];

// Lines items made of parts (segments): the first part is the item's own.
function partsItem(o) {
  const [first, ...rest] = o.parts;
  const script = [...(o.before || []), ...first.lines];
  for (const p of rest) script.push({ kind: 'segment', html: p.html, ask: p.ask ?? `${p.start.replace(/_(\d+)/, (m, k) => SUBS(k))} =`, start: { math: p.start }, judge: p.judge }, ...p.lines);
  return linesItem({ ...o, start: first.start, judge: first.judge, script, keys: o.keys || KEYS });
}

function arithItem(level, rng, opts = {}) {
  const d = arithData(rng);
  const hints = [
    { level: 1, html: `De u₁ à ${uN(d.n)}, on ajoute ${d.n - 1} fois r. Puis : nombre de termes × (premier + dernier)/2.` },
    { level: 2, html: `${uN(d.n)} = ${fr(d.u1)} + ${d.n - 1}·${d.r < 0 ? `(${fr(d.r)})` : d.r}` },
    { level: 3, html: MT(plusT(d.u1, timesT(d.n - 1, d.r))) },
  ];
  if (level === 1) {
    const [seg] = arithSegments(d, { blanks: true });
    return partsItem({
      skill: ARITH, level, prompt: `Suite arithmétique : u₁ = ${fr(d.u1)}, r = ${fr(d.r)}. Calcule ${uN(d.n)}.`,
      parts: [seg], mode: 'guided', hints, subgoals: ARITH_SUB, key: `${ARITH}:1:${d.u1}:${d.r}:${d.n}`,
    });
  }
  if (level === 2) {
    const a = rng.int(2, 6);
    const b = a + rng.int(2, 6);
    const ua = d.u1 + (a - 1) * d.r;
    const ub = d.u1 + (b - 1) * d.r;
    const rLine = `(${minusT(ub, ua)})/(${b}-${a})`;
    const rn = parse(rLine);
    return partsItem({
      skill: ARITH, level, prompt: `Suite arithmétique : ${uN(a)} = ${fr(ua)} et ${uN(b)} = ${fr(ub)}. Trouve la raison r, puis u₁.`,
      parts: [
        { start: 'r', judge: VAL({ expect: String(d.r) }), lines: [
          { kind: 'eq', ...blankLine(rn, [stripParenNode(rn.d)]), note: `De ${uN(a)} à ${uN(b)} : ${b - a} fois r`, subgoal: 'term' },
          { kind: 'eq', math: String(d.r), note: 'Calculer', subgoal: 'compute' },
        ] },
        { html: 'u₁ = ?', start: 'u_1', judge: VAL({ expect: String(d.u1) }), lines: [
          { kind: 'eq', math: minusT(ua, timesT(a - 1, d.r)), note: `De u₁ à ${uN(a)} : ${a - 1} fois r`, subgoal: 'term' },
          { kind: 'eq', math: String(d.u1), note: 'Calculer', subgoal: 'compute' },
        ] },
      ],
      mode: 'guided',
      hints: [
        { level: 1, html: `Entre ${uN(a)} et ${uN(b)}, on ajoute ${b - a} fois r.` },
        { level: 2, html: `r = (${fr(ub)} − ${ua < 0 ? `(${fr(ua)})` : ua})/(${b} − ${a})` },
        { level: 3, html: MT(rLine) },
      ],
      subgoals: ARITH_SUB, key: `${ARITH}:2:${a}:${b}:${ua}:${ub}`,
    });
  }
  if (level === 3) {
    const segs = arithSegments(d);
    return partsItem({
      skill: ARITH, level, prompt: `Suite arithmétique : u₁ = ${fr(d.u1)}, r = ${fr(d.r)}. Calcule ${uN(d.n)}, puis S = u₁ + u₂ + … + ${uN(d.n)}.`,
      before: [{ kind: 'decision', prompt: `Combien de termes dans u₁ + … + ${uN(d.n)} ?`, options: [
        { id: 'n', label: `${d.n}`, valid: true },
        { id: 'n-1', label: `${d.n - 1}`, valid: false, rule: 'g5_count_terms', why: `De 1 à ${d.n}, il y a ${d.n} valeurs.` },
        { id: 'n+1', label: `${d.n + 1}`, valid: false, rule: 'g5_count_terms', why: `De 1 à ${d.n}, il y a ${d.n} valeurs.` },
      ] }],
      parts: segs, mode: 'tap', hints, subgoals: ARITH_SUB, key: `${ARITH}:3:${d.u1}:${d.r}:${d.n}`,
    });
  }
  if (level === 4) {
    const seats = rng.chance(0.5);
    const e = seats ? { u1: rng.int(10, 30), r: rng.int(1, 4), n: rng.int(10, 30) } : { u1: 10 * rng.int(2, 10), r: 5 * rng.int(1, 4), n: rng.int(6, 24) };
    const segs = arithSegments(e);
    const prompt = seats
      ? `Une salle a ${e.n} rangées. La première a ${e.u1} sièges, et chaque rangée en a ${e.r} de plus que la précédente. Combien de sièges a la dernière rangée, et combien en tout ?`
      : `Le premier mois, tu épargnes ${e.u1} francs ; chaque mois, ${e.r} francs de plus que le mois précédent. Combien épargnes-tu le ${e.n}e mois, et combien en tout après ${e.n} mois ?`;
    return partsItem({
      skill: ARITH, level, prompt, parts: segs, mode: 'free',
      hints: [
        { level: 1, html: `C'est une suite arithmétique : u₁ = ${e.u1}, r = ${e.r}.` },
        { level: 2, html: `${uN(e.n)} = ${e.u1} + ${e.n - 1}·${e.r}` },
        { level: 3, html: MT(`${e.n}×(${e.u1}+${lastOf(e)})/2`) },
      ],
      subgoals: ARITH_SUB, key: `${ARITH}:4:${seats}:${e.u1}:${e.r}:${e.n}`,
    });
  }
  // Level 5: an arithmetic and a geometric placement compared.
  const N = rng.int(6, 9);
  const a1 = 10 * rng.int(5, 15);
  const ra = 10 * rng.int(1, 5);
  const g0 = rng.int(3, 12);
  const SA = q(N * (2 * a1 + (N - 1) * ra), 2);
  const SB = q(g0 * (2 ** N - 1));
  return partsItem({
    skill: ARITH, level, noHints: true,
    prompt: `Sur ${N} ans. Placement A : ${a1} francs la 1re année, puis ${ra} de plus chaque année. Placement B : ${g0} francs la 1re année, puis le double chaque année. Calcule le total de chaque placement, puis S_B − S_A.`,
    parts: [
      { start: 'S_A', judge: VAL({ expect: QT(SA), arith: { u1: a1, r: ra, n: N, sum: true } }), lines: [
        { kind: 'eq', math: `${N}×(${a1}+${a1 + (N - 1) * ra})/2`, note: 'Somme arithmétique', subgoal: 'sum' },
        { kind: 'eq', math: QT(SA), note: 'Calculer', subgoal: 'compute' }] },
      { html: 'Placement B :', start: 'S_B', judge: VAL({ expect: QT(SB), geom: { u0: g0, q: 2, n: N } }), lines: [
        { kind: 'eq', math: `${g0}(2^${N}-1)/(2-1)`, note: 'Somme géométrique', subgoal: 'geom' },
        { kind: 'eq', math: QT(SB), note: 'Calculer', subgoal: 'compute' }] },
      { html: 'Comparer :', ask: 'S_B − S_A =', start: 'D', judge: VAL({ expect: QT(SB.sub(SA)) }), lines: [
        { kind: 'eq', math: QT(SB.sub(SA)), note: SB.sub(SA).n > 0 ? 'B rapporte plus' : 'A rapporte plus', subgoal: 'compute' }] },
    ],
    mode: 'free', hints: [], subgoals: [...ARITH_SUB, { id: 'geom', label: 'somme géométrique', skill: 'g5-geom' }],
    key: `${ARITH}:5:${N}:${a1}:${ra}:${g0}`, exam: examOf(opts, 4),
  });
}
const stripParenNode = (n) => (n.t === 'paren' ? n.e : n);

function arithMcq(rng) {
  const d = arithData(rng);
  const un = lastOf(d);
  const S = sumOf(d);
  const options = [
    { html: fr(QT(S)), correct: true },
    { html: fr(QT(S.mul(q(2)))), correct: false, rule: 'g5_arith_half' },
    { html: fr(QT(q((d.n - 1) * (2 * d.u1 + (d.n - 2) * d.r), 2))), correct: false, rule: 'g5_count_terms' },
    { html: fr(QT(q(d.n * (2 * d.u1 + d.n * d.r), 2))), correct: false, rule: 'g5_arith_half' },
  ];
  return mcq({
    skill: ARITH, level: 4, prompt: `Suite arithmétique : u₁ = ${fr(d.u1)}, r = ${fr(d.r)}. Que vaut u₁ + u₂ + … + ${uN(d.n)} ?`,
    options: options.filter((o, i, x) => x.findIndex((y) => y.html === o.html) === i), key: `mcq:${d.u1}:${d.r}:${d.n}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `${uN(d.n)} = ${fr(un)} ; S = ${d.n}·(${fr(d.u1)} + ${fr(un)})/2 = ${fr(QT(S))}`, note: '' }],
  }, rng);
}

// ======================================================================
// g5-geom
// ======================================================================

const GEOM = 'g5-geom';
const GEOM_SUB = [
  { id: 'count', label: 'compter les termes', skill: GEOM },
  { id: 'powers', label: 'puissances', skill: 'pow-rules' },
  { id: 'compute', label: 'calculer', skill: 'lit-reduce' },
];
const RATIOS = [q(2), q(3), q(-2), q(1, 2), q(1, 3), q(2, 3), q(-1, 2)];
// q in a line: 2, (−2), (1/2).
const qT = (x) => (x.d === 1 && x.n > 0 ? String(x.n) : `(${QT(x)})`);
const termOf = (g, k) => q(g.u0).mul(g.q.pow(k));
const geomSum = (g, N) => q(g.u0).mul(g.q.pow(N).sub(q(1))).div(g.q.sub(q(1)));

function geomData(rng) {
  for (let i = 0; i < 200; i++) {
    const g = { u0: rng.int(1, 6), q: rng.pick(RATIOS), N: rng.int(4, 8) };
    const S = geomSum(g, g.N);
    if (S.d > 729 || Math.abs(S.valueOf()) > 20000) continue;
    return g;
  }
  return { u0: 5, q: q(2), N: 6, fallback: true };
}
// u₀ + u₀q + … + u₀q^(N − 1), shown with its first terms and its last one.
const SUPS = (k) => [...String(k)].map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join('');
const shownSum = (g) => `${fr(QT(termOf(g, 0)))} + ${fr(QT(termOf(g, 1)))} + … + ${g.u0 === 1 ? '' : `${g.u0}·`}${fr(qT(g.q))}${SUPS(g.N - 1)}`.replace(/\+ −/g, '− ');

function geomItem(level, rng, opts = {}) {
  const g = geomData(rng);
  const S = geomSum(g, g.N);
  const sumLine = `${g.u0}(${qT(g.q)}^${g.N}-1)/(${QT(g.q)}-1)`.replace(/^1\(/, '(');
  const sumJudge = VAL({ expect: QT(S), geom: { u0: g.u0, q: g.q, n: g.N } });
  const hints = [
    { level: 1, html: `Compte les termes : de q⁰ à q${SUPS(g.N - 1)}, il y en a ${g.N}.` },
    { level: 2, html: `S = u₀(q^N − 1)/(q − 1) avec N = …` },
    { level: 3, html: MT(sumLine) },
  ];
  const sumPrompt = `Suite géométrique de premier terme u₀ = ${g.u0} et de raison q = ${fr(QT(g.q))}. Calcule S = ${shownSum(g)}.`;
  if (level === 1) {
    const N = g.N;
    const line = `${g.u0}×${qT(g.q)}^${N}`;
    const node = parse(line);
    const val = termOf(g, N);
    return linesItem({
      skill: GEOM, level, prompt: `Suite géométrique : u₀ = ${g.u0}, q = ${fr(QT(g.q))}. Calcule ${uN(N)}.`,
      start: `u_${N}`, judge: VAL({ expect: QT(val), geom: { u0: g.u0, q: g.q, n: N, term: true } }), mode: 'guided',
      script: [
        { kind: 'eq', ...blankLine(node, [node.r.e]), note: `uₙ = u₀qⁿ avec n = ${N}`, subgoal: 'powers' },
        { kind: 'eq', math: QT(val), note: 'Calculer', subgoal: 'compute' },
      ],
      hints: [
        { level: 1, html: `De u₀ à ${uN(N)}, on multiplie ${N} fois par q.` },
        { level: 2, html: `${uN(N)} = ${g.u0}·${fr(qT(g.q))}^…` },
        { level: 3, html: MT(line) },
      ],
      subgoals: GEOM_SUB, keys: KEYS, key: `${GEOM}:1:${g.u0}:${QT(g.q)}:${N}`,
    });
  }
  if (level === 2 || level === 3 || (level === 4 && rng.chance(0.5)) || g.fallback) {
    const node = parse(sumLine);
    const exp = [];
    walkPow(node, exp);
    const before = level === 3 ? [{ kind: 'decision', prompt: 'Quel exposant dans u₀(q^N − 1)/(q − 1) ?', options: [
      { id: 'N', label: `N = ${g.N}`, valid: true },
      { id: 'N-1', label: `N = ${g.N - 1}`, valid: false, rule: 'g5_geom_offset', why: `De q⁰ à q${SUPS(g.N - 1)}, il y a ${g.N} termes.` },
      { id: 'N+1', label: `N = ${g.N + 1}`, valid: false, rule: 'g5_geom_offset', why: `De q⁰ à q${SUPS(g.N - 1)}, il y a ${g.N} termes, pas ${g.N + 1}.` },
    ] }] : [];
    return linesItem({
      skill: GEOM, level, prompt: sumPrompt, start: 'S', judge: sumJudge, mode: level === 2 ? 'guided' : level === 3 ? 'tap' : 'free',
      script: [...before,
        { kind: 'eq', ...(level === 2 ? blankLine(node, exp.slice(0, 1)) : { math: sumLine }), note: `${g.N} termes : N = ${g.N}`, subgoal: 'count' },
        { kind: 'eq', math: QT(S), note: 'Calculer', subgoal: 'compute' }],
      hints, subgoals: GEOM_SUB, keys: KEYS, key: `${GEOM}:${level}:${g.u0}:${QT(g.q)}:${g.N}`,
    });
  }
  if (level === 4) {
    const r = rng.pick([q(1, 2), q(1, 3), q(2, 3), q(-1, 2), q(3, 4)]);
    const u0 = rng.int(1, 9);
    const L = q(u0).div(q(1).sub(r));
    return linesItem({
      skill: GEOM, level, prompt: `Calcule la somme infinie ${fr(String(u0))} + ${fr(QT(q(u0).mul(r)))} + ${fr(QT(q(u0).mul(r).mul(r)))} + …`.replace(/\+ −/g, '− '),
      start: 'S', judge: VAL({ expect: QT(L) }), mode: 'free',
      script: [
        { kind: 'eq', math: `${u0}/(1-${qT(r)})`, note: `|q| = ${fr(QT(r.n < 0 ? r.neg() : r))} < 1 : u₀/(1 − q)`, subgoal: 'count' },
        { kind: 'eq', math: QT(L), note: 'Calculer', subgoal: 'compute' },
      ],
      hints: [
        { level: 1, html: 'Trouve la raison q : le quotient de deux termes qui se suivent. Si |q| < 1, la somme infinie vaut u₀/(1 − q).' },
        { level: 2, html: `q = ${fr(QT(r))}, donc S = ${u0}/(1 − …)` },
        { level: 3, html: MT(`${u0}/(1-${qT(r)})`) },
      ],
      subgoals: GEOM_SUB, keys: KEYS, key: `${GEOM}:inf:${u0}:${QT(r)}`,
    });
  }
  return ballItem(rng, opts);
}
function walkPow(n, out) {
  if (!n || typeof n !== 'object') return;
  if (n.t === 'pow') out.push(n.e);
  for (const k of ['l', 'r', 'e', 'n', 'd', 'b']) if (n[k] && typeof n[k] === 'object' && n[k].t) walkPow(n[k], out);
}

// Level 5 (MAN 2018, Q1): a ball falls from h, bounces back to ρ times the
// previous height. Distance at the n-th contact with the ground, then in all.
function ballItem(rng, opts = {}) {
  const [rho, mult] = rng.pick([[q(2, 3), 4], [q(1, 2), 2], [q(3, 4), 6], [q(3, 5), 3]]);
  const h = rng.int(2, 5);
  const C = h * mult; // 2hρ/(1 − ρ)
  const D = h + C;
  const r = QT(rho);
  return linesItem({
    skill: GEOM, level: opts.exam ? 4 : 5, noHints: true,
    prompt: `Une balle tombe d'une hauteur de ${h} m. Après chaque rebond, elle remonte aux ${fr(r)} de la hauteur précédente. (a) Écris la distance Dₙ parcourue jusqu'au n-ième contact avec le sol, sans Σ. (b) Quelle est la distance totale ?`,
    start: `${h}+2×sum(${h}×(${r})^k,k,1,n-1)`, judge: EQN({ domain: { n: { int: [1, 10] } } }), mode: 'free',
    script: [
      { kind: 'note', html: `Descente de ${h} m, puis pour chaque rebond k = 1, …, n − 1 : montée et descente de ${h}·(${fr(r)})ᵏ.` },
      { kind: 'eq', math: `${h}+2×${h}×(${r})×(1-(${r})^(n-1))/(1-${r})`, note: 'Somme géométrique de n − 1 termes', subgoal: 'count' },
      { kind: 'eq', math: `${h}+${C}(1-(${r})^(n-1))`, note: 'Simplifier', subgoal: 'compute' },
      { kind: 'segment', html: '(b) Distance totale (n → ∞) :', ask: 'D =', start: { math: 'D' }, judge: VAL({ expect: String(D) }) },
      { kind: 'eq', math: `${h}+${C}`, note: `|${fr(r)}| < 1 : (${fr(r)})ⁿ⁻¹ → 0`, subgoal: 'powers' },
      { kind: 'eq', math: String(D), note: 'Calculer', subgoal: 'compute' },
    ],
    hints: [], subgoals: GEOM_SUB, keys: KEYS, key: `${GEOM}:ball:${h}:${r}`, exam: examOf(opts, 6),
  });
}

function geomMcq(rng) {
  const g = geomData(rng);
  const S = geomSum(g, g.N);
  const options = [
    { html: fr(QT(S)), correct: true },
    { html: fr(QT(geomSum(g, g.N + 1))), correct: false, rule: 'g5_geom_offset' },
    { html: fr(QT(geomSum(g, g.N - 1))), correct: false, rule: 'g5_geom_offset' },
    { html: fr(QT(termOf(g, g.N))), correct: false },
  ];
  return mcq({
    skill: GEOM, level: 4, prompt: `Suite géométrique, u₀ = ${g.u0}, q = ${fr(QT(g.q))}. S = ${shownSum(g)} vaut :`,
    options: options.filter((o, i, x) => x.findIndex((y) => y.html === o.html) === i), key: `mcq:${g.u0}:${QT(g.q)}:${g.N}`,
    exam: { format: 'mcq', points: 1 }, solution: [{ html: `${g.N} termes : ${MT(`${g.u0}(${qT(g.q)}^${g.N}-1)/(${QT(g.q)}-1)`)} = ${fr(QT(S))}`, note: '' }],
  }, rng);
}

const GEN_SEQ = {
  [ARITH]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? arithMcq(rng) : arithItem(level, rng, opts)),
  [GEOM]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? geomMcq(rng) : opts.exam ? ballItem(rng, opts) : geomItem(level, rng, opts)),
};


// ======================================================================
// Inductions: g5-induction-frame, g5-induction-more (blocks), and
// g5-induction-sum (lines)
// ======================================================================

const FRAME = 'g5-induction-frame';
const HSUM = 'g5-induction-sum';
const MORE = 'g5-induction-more';
const S_HTML = (e, hi) => `Σ<sub>k=1</sub><sup>${hi}</sup> ${e}`;

const DECOYS = (b) => [
  { key: 'circ', html: b.circular, rule: 'g5_induction_circular', why: 'P(n + 1) est ce qu\'on veut montrer : on ne peut pas le supposer. On suppose P(n).' },
  { key: 'base', html: 'L\'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation.', rule: 'g5_induction_no_base', why: '« n > n + 1 » a une hérédité vraie, mais n\'est vraie pour aucun n. Il faut un point de départ.' },
  { key: 'ex', html: `C'est vrai pour n = ${b.n0}, ${b.n0 + 1} et ${b.n0 + 2}, donc pour tout n.`, rule: 'g9_proof_by_example', why: 'Des exemples ne prouvent pas un « pour tout ».' },
  // Iterates of x ↦ xᵖ: a power of a power adds the exponents (G2 trap).
  ...(/^iter\d$/.test(b.id) ? [{ key: 'pow', html: b.wrong, rule: 'g2_power_power', why: '(aᵐ)ᵖ = aᵐ·ᵖ : une puissance de puissance multiplie les exposants.' }] : []),
];

// Proofs of g5-induction-frame: the five blocks, the typed calculation.
function frameBank(rng) {
  const all = [
    {
      id: 'odd', n0: 1, statement: `${S_HTML('(2k − 1)', 'n')} = n² pour tout n ≥ 1`,
      steps: [
        `Initialisation : pour n = 1, ${S_HTML('(2k − 1)', '1')} = 1 = 1². ✓`,
        `Hérédité : supposons ${S_HTML('(2k − 1)', 'n')} = n² pour un n ≥ 1.`,
        `Alors ${S_HTML('(2k − 1)', 'n+1')} = n² + (2(n + 1) − 1) = n² + 2n + 1.`,
        'n² + 2n + 1 = (n + 1)² : P(n + 1) est vraie.',
        'Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.',
      ],
      input: { at: 2, kind: 'expr', vars: ['n'], expect: 'n^2+2(n+1)-1', ask: 'n² + (2(n + 1) − 1) =', answer: 'n^2+2n+1' },
      circular: `Hérédité : supposons ${S_HTML('(2k − 1)', 'n+1')} = (n + 1)².`,
      wrong: `Alors ${S_HTML('(2k − 1)', 'n+1')} = n² + (2n − 1).`,
    },
    {
      id: 'gauss', n0: 1, statement: `${S_HTML('k', 'n')} = n(n + 1)/2 pour tout n ≥ 1`,
      steps: [
        `Initialisation : pour n = 1, ${S_HTML('k', '1')} = 1 = 1·2/2. ✓`,
        `Hérédité : supposons ${S_HTML('k', 'n')} = n(n + 1)/2 pour un n ≥ 1.`,
        `Alors ${S_HTML('k', 'n+1')} = n(n + 1)/2 + (n + 1).`,
        'n(n + 1)/2 + (n + 1) = (n + 1)(n + 2)/2 : P(n + 1) est vraie.',
        'Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.',
      ],
      input: { at: 3, kind: 'expr', vars: ['n'], expect: 'n(n+1)/2+(n+1)', ask: 'n(n + 1)/2 + (n + 1) = (factorise)', answer: '(n+1)(n+2)/2' },
      circular: `Hérédité : supposons ${S_HTML('k', 'n+1')} = (n + 1)(n + 2)/2.`,
      wrong: `Alors ${S_HTML('k', 'n+1')} = n(n + 1)/2 + n.`,
    },
    {
      id: 'pow2', n0: 0, statement: '2ⁿ ≥ n + 1 pour tout n ≥ 0',
      steps: [
        'Initialisation : pour n = 0, 2⁰ = 1 ≥ 0 + 1. ✓',
        'Hérédité : supposons 2ⁿ ≥ n + 1 pour un n ≥ 0.',
        'Alors 2ⁿ⁺¹ = 2·2ⁿ ≥ 2(n + 1).',
        '2(n + 1) = 2n + 2 ≥ n + 2 : P(n + 1) est vraie.',
        'Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.',
      ],
      input: { at: 3, kind: 'expr', vars: ['n'], expect: '2(n+1)', ask: '2(n + 1) =', answer: '2n+2' },
      circular: 'Hérédité : supposons 2ⁿ⁺¹ ≥ n + 2.',
      wrong: 'Alors 2ⁿ⁺¹ = 2ⁿ + 1 ≥ n + 2.',
    },
    {
      id: 'nsq', n0: 1, statement: 'n ≤ n² pour tout n ≥ 1',
      steps: [
        'Initialisation : pour n = 1, 1 ≤ 1². ✓',
        'Hérédité : supposons n ≤ n² pour un n ≥ 1.',
        'Alors (n + 1)² = n² + 2n + 1 ≥ n + 2n + 1.',
        'n + 2n + 1 ≥ n + 1 : P(n + 1) est vraie.',
        'Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.',
      ],
      input: { at: 2, kind: 'expr', vars: ['n'], expect: '(n+1)^2', ask: '(n + 1)² =', answer: 'n^2+2n+1' },
      circular: 'Hérédité : supposons n + 1 ≤ (n + 1)².',
      wrong: 'Alors (n + 1)² = n² + 1 ≥ n + 1.',
    },
  ];
  return rng.pick(all);
}

// Proofs of g5-induction-more: inequalities, divisibility, iterates,
// recurrent sequences. tool: the right answer of the level 3 decision.
function moreBank(rng) {
  const kind = rng.pick(['bern', 'fact', 'div', 'cube', 'iterpow', 'iterlin', 'seq']);
  if (kind === 'bern') {
    const a = rng.pick([2, 3]);
    return {
      id: `bern${a}`, n0: 0, tool: 'bound', statement: `${a}ⁿ ≥ 1 + ${a - 1 === 1 ? '' : a - 1}n pour tout n ≥ 0 (Bernoulli)`,
      steps: [
        `Initialisation : pour n = 0, ${a}⁰ = 1 ≥ 1 + 0. ✓`,
        `Hérédité : supposons ${a}ⁿ ≥ 1 + ${a - 1 === 1 ? '' : a - 1}n pour un n ≥ 0.`,
        `Alors ${a}ⁿ⁺¹ = ${a}·${a}ⁿ ≥ ${a}(1 + ${a - 1 === 1 ? '' : a - 1}n) = ${a} + ${a * (a - 1)}n.`,
        `${a} + ${a * (a - 1)}n ≥ ${a} + ${a - 1 === 1 ? '' : a - 1}n = 1 + ${a - 1 === 1 ? '' : a - 1}(n + 1) : P(n + 1) est vraie.`,
        'Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.',
      ],
      input: { at: 2, kind: 'expr', vars: ['n'], expect: `${a}(1+${a - 1}n)`, ask: `${a}(1 + ${a - 1 === 1 ? '' : a - 1}n) =`, answer: `${a}+${a * (a - 1)}n` },
      circular: `Hérédité : supposons ${a}ⁿ⁺¹ ≥ 1 + ${a - 1 === 1 ? '' : a - 1}(n + 1).`,
      wrong: `Alors ${a}ⁿ⁺¹ = ${a}ⁿ + ${a} ≥ 1 + ${a - 1 === 1 ? '' : a - 1}n + ${a}.`,
      subgoals: [{ id: 'powers', label: 'puissances', skill: 'g2-real-powers' }],
    };
  }
  if (kind === 'fact') {
    return {
      id: 'fact', n0: 1, tool: 'bound', statement: 'n! ≥ 2ⁿ⁻¹ pour tout n ≥ 1',
      steps: [
        'Initialisation : pour n = 1, 1! = 1 ≥ 2⁰ = 1. ✓',
        'Hérédité : supposons n! ≥ 2ⁿ⁻¹ pour un n ≥ 1.',
        'Alors (n + 1)! = (n + 1)·n! ≥ (n + 1)·2ⁿ⁻¹.',
        'Comme n + 1 ≥ 2 : (n + 1)·2ⁿ⁻¹ ≥ 2·2ⁿ⁻¹ = 2ⁿ : P(n + 1) est vraie.',
        'Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.',
      ],
      input: { at: 3, kind: 'expr', vars: ['n'], expect: '2×2^(n-1)', ask: '2·2ⁿ⁻¹ =', answer: '2^n', domain: { n: { int: [1, 10] } } },
      circular: 'Hérédité : supposons (n + 1)! ≥ 2ⁿ.',
      wrong: 'Alors (n + 1)! = n! + 1 ≥ 2ⁿ⁻¹ + 1.',
      subgoals: [{ id: 'powers', label: 'puissances', skill: 'g2-real-powers' }],
    };
  }
  if (kind === 'div') {
    const a = rng.pick([4, 5, 8, 10]);
    return {
      id: `div${a}`, n0: 0, tool: 'rewrite', statement: `${a}ⁿ − 1 est divisible par ${a - 1} pour tout n ≥ 0`,
      steps: [
        `Initialisation : pour n = 0, ${a}⁰ − 1 = 0 = ${a - 1}·0. ✓`,
        `Hérédité : supposons ${a}ⁿ − 1 = ${a - 1}m, avec m entier, pour un n ≥ 0.`,
        `Alors ${a}ⁿ⁺¹ − 1 = ${a}(${a}ⁿ − 1) + ${a - 1}.`,
        `= ${a}·${a - 1}m + ${a - 1} = ${a - 1}(${a}m + 1) : P(n + 1) est vraie.`,
        'Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.',
      ],
      input: { at: 2, kind: 'expr', vars: ['n'], expect: `${a}^(n+1)-1`, ask: `${a}ⁿ⁺¹ − 1 = (écris-le avec ${a}ⁿ − 1)`, answer: `${a}(${a}^n-1)+${a - 1}`, domain: { n: { int: [0, 6] } } },
      circular: `Hérédité : supposons ${a}ⁿ⁺¹ − 1 divisible par ${a - 1}.`,
      wrong: `Alors ${a}ⁿ⁺¹ − 1 = ${a}(${a}ⁿ − 1).`,
      subgoals: [{ id: 'powers', label: 'puissances', skill: 'g2-real-powers' }],
    };
  }
  if (kind === 'cube') {
    return {
      id: 'cube', n0: 0, tool: 'rewrite', statement: 'n³ − n est divisible par 6 pour tout n ≥ 0',
      steps: [
        'Initialisation : pour n = 0, 0³ − 0 = 0 = 6·0. ✓',
        'Hérédité : supposons n³ − n = 6m, avec m entier, pour un n ≥ 0.',
        'Alors (n + 1)³ − (n + 1) = n³ − n + 3n(n + 1).',
        'n(n + 1) est pair, donc 3n(n + 1) = 6p ; (n + 1)³ − (n + 1) = 6(m + p) : P(n + 1) est vraie.',
        'Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.',
      ],
      input: { at: 2, kind: 'expr', vars: ['n'], expect: '(n+1)^3-(n+1)', ask: '(n + 1)³ − (n + 1) = (écris-le avec n³ − n)', answer: 'n^3-n+3n(n+1)' },
      circular: 'Hérédité : supposons (n + 1)³ − (n + 1) divisible par 6.',
      wrong: 'Alors (n + 1)³ − (n + 1) = n³ − n + 1.',
      subgoals: [],
    };
  }
  if (kind === 'iterpow') {
    const p = rng.pick([2, 3]);
    const P = ['', '', '²', '³'][p];
    return {
      id: `iter${p}`, n0: 1, tool: 'compose', statement: `f(x) = x${P}, f₁ = f et fₙ₊₁ = f ∘ fₙ : fₙ(x) = x^(${p}ⁿ) pour tout n ≥ 1 et tout x > 0`,
      steps: [
        `Initialisation : f₁(x) = x${P} = x^(${p}¹). ✓`,
        `Hérédité : supposons fₙ(x) = x^(${p}ⁿ) pour un n ≥ 1.`,
        `Alors fₙ₊₁(x) = f(fₙ(x)) = (x^(${p}ⁿ))${P}.`,
        `(x^(${p}ⁿ))${P} = x^(${p}·${p}ⁿ) = x^(${p}ⁿ⁺¹) : P(n + 1) est vraie.`,
        'Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.',
      ],
      input: { at: 3, kind: 'expr', vars: ['x', 'n'], expect: `(x^(${p}^n))^${p}`, ask: `(x^(${p}ⁿ))${P} =`, answer: `x^(${p}^(n+1))`, domain: { n: { int: [1, 3] }, x: [0.9, 1.1] } },
      circular: `Hérédité : supposons fₙ₊₁(x) = x^(${p}ⁿ⁺¹).`,
      wrong: `Alors fₙ₊₁(x) = f(fₙ(x)) = x^(${p}ⁿ + ${p}).`,
      subgoals: [{ id: 'compose', label: 'composer', skill: 'g1-compose' }, { id: 'powers', label: 'puissance d\'une puissance', skill: 'g2-real-powers' }],
    };
  }
  if (kind === 'iterlin') {
    const a = rng.pick([2, 3]);
    const b = rng.pick([1, 2]);
    // fₙ(x) = aⁿx + b(aⁿ − 1)/(a − 1)
    const c = b / (a - 1);
    const fn = c === 1 ? `${a}ⁿx + ${a}ⁿ − 1` : `${a}ⁿx + ${c}(${a}ⁿ − 1)`;
    const fn1 = c === 1 ? `${a}ⁿ⁺¹x + ${a}ⁿ⁺¹ − 1` : `${a}ⁿ⁺¹x + ${c}(${a}ⁿ⁺¹ − 1)`;
    const fnT = c === 1 ? `${a}^n×x+${a}^n-1` : `${a}^n×x+${c}(${a}^n-1)`;
    const fn1T = c === 1 ? `${a}^(n+1)×x+${a}^(n+1)-1` : `${a}^(n+1)×x+${c}(${a}^(n+1)-1)`;
    return {
      id: `lin${a}${b}`, n0: 1, tool: 'compose', statement: `f(x) = ${a}x + ${b}, f₁ = f et fₙ₊₁ = f ∘ fₙ : fₙ(x) = ${fn} pour tout n ≥ 1`,
      steps: [
        `Initialisation : f₁(x) = ${a}x + ${b} = ${a}¹x + ${c === 1 ? `${a}¹ − 1` : `${c}(${a}¹ − 1)`}. ✓`,
        `Hérédité : supposons fₙ(x) = ${fn} pour un n ≥ 1.`,
        `Alors fₙ₊₁(x) = f(fₙ(x)) = ${a}(${fn}) + ${b}.`,
        `= ${fn1} : P(n + 1) est vraie.`,
        'Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.',
      ],
      input: { at: 2, kind: 'expr', vars: ['x', 'n'], expect: `${a}(${fnT})+${b}`, ask: `f(fₙ(x)) = ${a}(${fn}) + ${b} =`, answer: fn1T, domain: { n: { int: [1, 6] }, x: [-2, 2] } },
      circular: `Hérédité : supposons fₙ₊₁(x) = ${fn1}.`,
      wrong: `Alors fₙ₊₁(x) = fₙ(f(x)) = ${fn} + ${b}.`,
      subgoals: [{ id: 'compose', label: 'composer', skill: 'g1-compose' }],
    };
  }
  const [a, b] = rng.pick([[2, 1], [3, 2]]);
  // u₀ = 1, uₙ₊₁ = a·uₙ + b: uₙ = 2·3ⁿ − 1 or 2ⁿ⁺¹ − 1.
  const un = a === 2 ? '2ⁿ⁺¹ − 1' : '2·3ⁿ − 1';
  const un1 = a === 2 ? '2ⁿ⁺² − 1' : '2·3ⁿ⁺¹ − 1';
  return {
    id: `seq${a}`, n0: 0, tool: 'rewrite', statement: `u₀ = 1 et uₙ₊₁ = ${a}uₙ + ${b} : uₙ = ${un} pour tout n ≥ 0`,
    steps: [
      `Initialisation : u₀ = 1 = ${a === 2 ? '2¹ − 1' : '2·3⁰ − 1'}. ✓`,
      `Hérédité : supposons uₙ = ${un} pour un n ≥ 0.`,
      `Alors uₙ₊₁ = ${a}uₙ + ${b} = ${a}(${un}) + ${b}.`,
      `= ${un1} : P(n + 1) est vraie.`,
      'Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.',
    ],
    input: { at: 2, kind: 'expr', vars: ['n'], expect: a === 2 ? '2(2^(n+1)-1)+1' : '3(2×3^n-1)+2', ask: `${a}(${un}) + ${b} =`, answer: a === 2 ? '2^(n+2)-1' : '2×3^(n+1)-1', domain: { n: { int: [0, 8] } } },
    circular: `Hérédité : supposons uₙ₊₁ = ${un1}.`,
    wrong: `Alors uₙ₊₁ = ${a}uₙ + ${b} = ${a}·${un} + ${b}.`,
    subgoals: [{ id: 'powers', label: 'puissances', skill: 'g2-real-powers' }],
  };
}

const TOOLS = [
  { id: 'bound', label: 'Majorer ou minorer avec l\'hypothèse' },
  { id: 'rewrite', label: 'Écrire le rang n + 1 avec le rang n' },
  { id: 'compose', label: 'Composer : fₙ₊₁ = f ∘ fₙ' },
];

// Level 1: the proof with one heredity block missing, two choices.
function holeMcq(skill, pr, rng, three = false) {
  const k = 2;
  const shown = pr.steps.map((s, i) => (i === k ? '<b>…</b>' : s)).map((s) => `<div class="proof-line">${s}</div>`).join('');
  const options = [{ html: pr.steps[k], correct: true }, { html: pr.circular, correct: false, rule: 'g5_induction_circular' }];
  if (three) options.push({ html: pr.wrong, correct: false });
  return mcq({
    skill, level: three ? 2 : 1, prompt: `Récurrence : ${pr.statement}.${shown}Quelle ligne manque ?`,
    options, key: `hole:${pr.id}:${three}`, solution: pr.steps.map((s) => ({ html: s, note: '' })),
  }, rng);
}

function inductionBlocks(skill, level, rng, opts = {}) {
  const pr = skill === FRAME ? frameBank(rng) : moreBank(rng);
  if (level === 1) return holeMcq(skill, pr, rng);
  if (level === 2 && skill === MORE) return holeMcq(skill, pr, rng, true);
  const withInput = level >= 4 || !!opts.exam;
  const needs = [[], [], ['b1'], ['b2'], ['b0', 'b3']];
  const blocks = pr.steps.map((html, i) => ({ id: `b${i}`, html, needs: needs[i] }));
  if (withInput) blocks[pr.input.at].input = { ...pr.input };
  const decoys = DECOYS(pr);
  const chosen = level === 2 ? [rng.pick(decoys)] : level === 3 ? decoys.slice(0, 2) : level === 4 ? rng.shuffle(decoys).slice(0, 2) : decoys;
  chosen.forEach((d, i) => blocks.push({ id: `d${i}`, html: d.html, needs: [], distractor: d.rule, why: d.why }));
  const decision = level === 3 && skill === MORE ? {
    prompt: 'Quel outil pour l\'hérédité ?',
    options: TOOLS.map((t) => ({ ...t, valid: t.id === pr.tool, why: t.id === pr.tool ? '' : 'Ce n\'est pas l\'outil de cette hérédité.' })),
  } : level === 3 ? {
    prompt: 'Que suppose-t-on dans l\'hérédité ?',
    options: [
      { id: 'pn', label: 'P(n), pour un n ≥ n₀', valid: true },
      { id: 'pn1', label: 'P(n + 1)', valid: false, rule: 'g5_induction_circular', why: 'P(n + 1) est ce qu\'on veut montrer.' },
      { id: 'all', label: 'P(n) pour tout n', valid: false, rule: 'g5_induction_circular', why: '« Pour tout n », c\'est la conclusion : on ne peut pas la supposer.' },
    ],
  } : null;
  return blocksItem({
    skill, level: opts.exam ? 4 : level, mode: withInput ? 'frame' : 'order',
    prompt: `Montre par récurrence : ${pr.statement}. Touche les blocs dans l'ordre de la preuve${withInput ? ' et complète le calcul' : ''}.`,
    blocks: rng.shuffle(blocks), goal: 'b4', order: ['b0', 'b1', 'b2', 'b3', 'b4'], decision,
    hints: [
      { level: 1, html: 'Initialisation, puis hérédité : on suppose P(n), pas P(n + 1), et on arrive à P(n + 1).' },
      { level: 2, html: pr.steps[1] },
      { level: 3, html: pr.steps[pr.input.at] },
    ],
    noHints: level === 5 || !!opts.exam,
    subgoals: pr.subgoals || [],
    key: `${pr.id}:${level}`, exam: examOf(opts, 5),
  });
}

function frameMcq(rng) {
  const pr = frameBank(rng);
  return mcq({
    skill: FRAME, level: 4, prompt: `On montre par récurrence : ${pr.statement}. Quelle phrase commence l'hérédité ?`,
    options: [
      { html: `Supposons P(n) vraie pour un n ≥ ${pr.n0}.`, correct: true },
      { html: 'Supposons P(n + 1) vraie.', correct: false, rule: 'g5_induction_circular' },
      { html: 'Supposons P(n) vraie pour tout n.', correct: false, rule: 'g5_induction_circular' },
      { html: `Vérifions P(${pr.n0}).`, correct: false },
    ],
    key: `mcq:${pr.id}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: pr.steps[1], note: 'On suppose P(n) pour un n, et on montre P(n + 1).' }],
  }, rng);
}

const MORE_TF = [
  { s: 'Si P(n) ⇒ P(n + 1) pour tout n ≥ 0, alors P(n) est vraie pour tout n ≥ 0.', truth: false, why: 'Faux : P(n) : « n > n + 1 » a une hérédité vraie, mais elle n\'est jamais vraie. Il faut l\'initialisation.' },
  { s: 'Si P(0) est vraie et que P(n) ⇒ P(n + 1) pour tout n ≥ 0, alors P(n) est vraie pour tout n ≥ 0.', truth: true, why: 'Vrai : c\'est le principe de récurrence.' },
  { s: 'Si P(0), P(1), …, P(10) sont vraies, alors P(n) est vraie pour tout n ≥ 0.', truth: false, why: 'Faux : P(n) : « n ≤ 10 » est vraie de 0 à 10, puis fausse.' },
];

function moreTf(rng) {
  const t = rng.pick(MORE_TF);
  const counter = t.truth ? null : t.s.startsWith('Si P(n)')
    ? { kind: 'heredity', v: 'n', from: 0, ask: [{ v: 'P', label: 'P(n) :', keys: ['calc', 'relation', 'seq'] }], answer: { P: 'n>n+1' } }
    : { kind: 'refute', quants: [{ q: '∀', v: 'n', dom: 'N' }], pred: 'n≤10', ask: [{ v: 'n', label: 'n =', keys: ['calc'] }], answer: { n: '11' } };
  return tfItem({
    skill: MORE, level: 4, statement: t.s, truth: t.truth, key: t.s, counter,
    ruleIfTrue: t.truth ? null : t.s.startsWith('Si P(n)') ? 'g5_induction_no_base' : 'g9_proof_by_example',
    explanation: t.why, exam: { format: 'tf', points: 1 },
  });
}

// ---------- g5-induction-sum: the heredity of a sum formula, in lines ----------

const HSUM_BANK = [
  { e: 'k', f: 'n(n+1)/2', next: '(n+1)(n+2)/2', eN: 'n', eN1: '(n+1)', hyp: 'n(n+1)/2+(n+1)', mid: '(n+1)(n/2+1)', hard: false },
  { e: '2k-1', f: 'n^2', next: '(n+1)^2', eN: '(2n-1)', eN1: '(2n+1)', hyp: 'n^2+2n+1', mid: null, hard: false },
  { e: '2k+1', f: 'n(n+2)', next: '(n+1)(n+3)', eN: '(2n+1)', eN1: '(2n+3)', hyp: 'n(n+2)+2n+3', mid: 'n^2+4n+3', hard: false },
  { e: 'k^2', f: 'n(n+1)(2n+1)/6', next: '(n+1)(n+2)(2n+3)/6', eN: 'n^2', eN1: '(n+1)^2', hyp: 'n(n+1)(2n+1)/6+(n+1)^2', mid: '(n+1)(2n^2+7n+6)/6', hard: true },
  { e: 'k(k+1)', f: 'n(n+1)(n+2)/3', next: '(n+1)(n+2)(n+3)/3', eN: 'n(n+1)', eN1: '(n+1)(n+2)', hyp: 'n(n+1)(n+2)/3+(n+1)(n+2)', mid: '(n+1)(n+2)(n/3+1)', hard: false },
  { e: 'k^3', f: '(n(n+1)/2)^2', next: '((n+1)(n+2)/2)^2', eN: 'n^3', eN1: '(n+1)^3', hyp: '(n(n+1)/2)^2+(n+1)^3', mid: '(n+1)^2(n^2+4n+4)/4', hard: true },
  { e: '1/(k(k+1))', f: 'n/(n+1)', next: '(n+1)/(n+2)', eN: '1/(n(n+1))', eN1: '1/((n+1)(n+2))', hyp: 'n/(n+1)+1/((n+1)(n+2))', mid: '(n^2+2n+1)/((n+1)(n+2))', hard: true },
];

const HSUM_SUB = [
  { id: 'init', label: 'initialisation', skill: FRAME },
  { id: 'split', label: 'séparer le dernier terme', skill: SIGMA },
  { id: 'hyp', label: 'hypothèse de récurrence', skill: HSUM },
  { id: 'factor', label: 'facteur commun', skill: 'fac-complete' },
];

function hsumItem(level, rng, opts = {}) {
  const pool = level >= 5 || opts.exam ? HSUM_BANK.filter((b) => b.hard) : level <= 2 ? HSUM_BANK.filter((b) => !b.hard) : HSUM_BANK;
  const b = rng.pick(pool);
  const top = sumT(b.e, 1, 'n+1');
  const split = `${sumT(b.e, 1, 'n')}+${b.eN1}`;
  const formula = `${MN(sumT(b.e, 1, 'n'))} = ${MN(b.f)}`;
  const heredity = [
    { kind: 'eq', math: split, note: 'Séparer le dernier terme (k = n + 1)', subgoal: 'split' },
    { kind: 'eq', math: b.hyp, note: 'Hypothèse de récurrence', subgoal: 'hyp' },
    ...(b.mid ? [{ kind: 'eq', math: b.mid, note: 'Mettre en facteur', subgoal: 'factor' }] : []),
    { kind: 'eq', math: b.next, note: 'C\'est la formule au rang n + 1', subgoal: 'factor' },
  ];
  const judge = EQN({ factored: true });
  const hints = [
    { level: 1, html: 'Sépare le terme k = n + 1, puis remplace la somme jusqu\'à n par la formule supposée.' },
    { level: 2, html: `${MN(top)} = ${MN(sumT(b.e, 1, 'n'))} + ${MN(b.eN1)}, puis mets en facteur ce qui est commun.` },
    { level: 3, html: MN(b.mid ?? b.hyp) },
  ];
  const prompt = `On montre par récurrence que ${formula} pour tout n ≥ 1. Hérédité : on suppose la formule vraie au rang n. Écris ${MN(top)} jusqu'à la formule au rang n + 1, ${MN(b.next)}.`;
  if (level === 1) {
    const node = parse(b.hyp, NO);
    return linesItem({
      skill: HSUM, level, prompt, start: split, judge, mode: 'guided',
      script: [
        { kind: 'note', html: `Le dernier terme est séparé : ${MN(top)} = ${MN(split)}.` },
        { kind: 'eq', ...blankLine(node, [leaves(node)[0]], NO), note: 'Hypothèse de récurrence', subgoal: 'hyp' },
        ...heredity.slice(2),
      ],
      hints, subgoals: HSUM_SUB, keys: KEYS, key: `${HSUM}:1:${b.e}`,
    });
  }
  if (level === 2) {
    const node = parse(split, NO);
    return linesItem({
      skill: HSUM, level, prompt, start: top, judge, mode: 'guided',
      script: [
        { kind: 'decision', prompt: `Quel terme sépare-t-on de ${MN(top)} ?`, options: [
          { id: 'n1', label: `Celui de k = n + 1 : ${toTextR(b.eN1)}`, valid: true },
          { id: 'n', label: `Celui de k = n : ${toTextR(b.eN)}`, valid: false, rule: 'g5_hered_wrong_term', why: 'Le dernier terme de la somme jusqu\'à n + 1 est celui de k = n + 1.' },
        ] },
        { kind: 'eq', ...blankLine(node, [node.r], NO), note: 'Séparer le dernier terme (k = n + 1)', subgoal: 'split' },
        ...heredity.slice(1),
      ],
      hints, subgoals: HSUM_SUB, keys: KEYS, key: `${HSUM}:2:${b.e}`,
    });
  }
  if (level === 3) {
    return linesItem({
      skill: HSUM, level, prompt, start: top, judge, mode: 'tap', tapActions: 'induction', script: heredity,
      hints, subgoals: HSUM_SUB, keys: KEYS, key: `${HSUM}:3:${b.e}`,
    });
  }
  // Levels 4 and 5: the initialisation, then the heredity; a closing note.
  const one = sumT(b.e, 1, 1);
  const f1 = exactValue(parse(b.f.replace(/n/g, '(1)')));
  return linesItem({
    skill: HSUM, level: opts.exam ? 4 : level, noHints: level === 5 || !!opts.exam,
    prompt: `Montre par récurrence que ${formula} pour tout n ≥ 1.`,
    start: one, judge: VAL(), mode: 'free',
    script: [
      { kind: 'note', html: `Initialisation : calcule ${MN(one)}, puis compare avec la formule pour n = 1.` },
      { kind: 'eq', math: QT(f1), note: `Initialisation : la formule donne aussi ${fr(QT(f1))} pour n = 1`, subgoal: 'init' },
      { kind: 'segment', html: `Hérédité : on suppose ${formula} pour un n ≥ 1. Écris la somme jusqu'à n + 1 jusqu'à ${MN(b.next)}.`, start: { math: top }, judge },
      ...heredity,
      { kind: 'note', html: 'Conclusion : par récurrence, la formule est vraie pour tout n ≥ 1.' },
    ],
    hints, subgoals: HSUM_SUB, keys: KEYS, key: `${HSUM}:${level}:${b.e}`, exam: examOf(opts, 4),
  });
}
const toTextR = (t) => toReadable(parse(t, NO));

const GEN_INDUCT = {
  [FRAME]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? frameMcq(rng) : inductionBlocks(FRAME, opts.exam ? 5 : level, rng, opts)),
  [HSUM]: (level, rng, profile, opts = {}) => hsumItem(opts.exam ? 5 : level, rng, opts),
  [MORE]: (level, rng, profile, opts = {}) => (opts.exam === 'tf' ? moreTf(rng) : inductionBlocks(MORE, opts.exam ? 5 : level, rng, opts)),
};

// ======================================================================

export const GEN = { ...GEN_SIGMA, ...GEN_REIDX, ...GEN_SEQ, ...GEN_INDUCT };

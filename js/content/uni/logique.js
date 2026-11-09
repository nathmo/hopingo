// Generators of module G9 (unit `logique`), spec §8.3. Catalogue:
// docs/universite/G-gymnase-1.md, G9.
//
// Sets and intervals are `lines` items judged by `solset`, with the usual
// scale (1–2 guided, 3 choose the action, 4 free, 5 alone). The other skills
// follow the catalogue's scale for skills without calculation lines
// (« Niveaux des compétences sans lignes de calcul »): 1 a multiple choice
// (one block or one formula to pick), 2 blocks or tokens with ready pieces,
// 3 tokens or blocks with decoys (or logic lines with the action menu),
// 4 free tokens, frame or free lines, 5 the exam question without help
// (`problem` comes with step U4: level 5 is the hardest item, without hints).
// opts.exam = 'mcq' | 'tf' | 'open' | 'coef' gives the exam variants.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { lit } from '../../cas/ast.js';
import { solutionSet, setToNode, setEqual } from '../../cas/sets.js';
import {
  lexFor, parseFormula, formulaText, strip, walkF, replaceF, nnf, equivalentLogic, size, truthOf,
} from '../../cas/logic.js';
import { blankLine, templateOf } from '../../judges/lines.js';
import { trapAnswers } from '../../judges/diagnose.js';
import { closedHolds } from '../../cas/sets.js';
import {
  MM, MT, FM, fr, linesItem, mcq, tfItem, tokensItem, blocksItem, tableItem,
} from './kit.js';

const T = (node) => toText(node);
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const setText = (S) => toText(setToNode(S));
const tpl = (line) => (line.blanks.length ? templateOf(line) : line.math);
const hintLine = (math) => MT(math);

// ======================================================================
// g9-sets
// ======================================================================

const SETS = 'g9-sets';
const SETS_SUB = [
  { id: 'solve', label: 'résoudre la condition', skill: 'eq-both-sides' },
  { id: 'list', label: 'lister les éléments', skill: SETS },
  { id: 'op', label: 'opérer sur les ensembles', skill: SETS },
];

// {n ∈ ℕ | an + b < c}: lines an < c − b, n < (c − b)/a, then the set.
function setsLinear(rng) {
  const a = rng.int(1, 4);
  const b = rng.int(-3, 5);
  const k = rng.int(3, 8);
  const strict = rng.chance(0.7);
  // n < (c − b)/a has k solutions in ℕ: (k − 1)·a < c − b ≤ k·a (strict).
  const cb = strict ? (k - 1) * a + rng.int(1, a) : (k - 1) * a + rng.int(0, a - 1);
  const c = b + cb;
  const op = strict ? '<' : '≤';
  const lhs = `${a === 1 ? '' : a}n${b > 0 ? `+${b}` : b < 0 ? `${b}` : ''}`;
  const lines = [];
  if (b !== 0) lines.push({ math: `${a === 1 ? '' : a}n${op}${cb}`, note: `${b > 0 ? 'Soustraire' : 'Ajouter'} ${Math.abs(b)}`, subgoal: 'solve' });
  if (a !== 1) lines.push({ math: `n${op}${toText(lit(new Q(cb, a)))}`, note: `Diviser par ${a}`, subgoal: 'solve' });
  const S = solutionSet(parse(`${lhs}${op}${c}`), { v: 'n', domain: 'N' });
  lines.push({ math: setText(S), note: 'Garder les entiers naturels', subgoal: 'list' });
  return { start: `{n∈ℕ|${lhs}${op}${c}}`, cond: `${lhs}${op}${c}`, lines, S, v: 'n', domain: 'N', kind: 'linear', bound: lines.length > 1 ? lines[lines.length - 2].math : null };
}

// {an + b | n ∈ ℕ ∧ n ≤ m}: the image set (trap g9_set_builder).
function setsImage(rng) {
  const a = rng.int(2, 4);
  const b = rng.int(-3, 5);
  const m = rng.int(2, 4);
  const head = `${a}n${b > 0 ? `+${b}` : b < 0 ? `${b}` : ''}`;
  const items = [];
  for (let n = 0; n <= m; n++) items.push(`${a}×${n}${b > 0 ? `+${b}` : b < 0 ? `${b}` : ''}`);
  const S = solutionSet(parse(`{${head}|n∈ℕ∧n≤${m}}`), { v: 'n', domain: 'Z' });
  return {
    start: `{${head}|n∈ℕ∧n≤${m}}`, lines: [
      { math: `{${items.join(';')}}`, note: 'Remplacer n par 0, 1, 2…', subgoal: 'list' },
      { math: setText(S), note: 'Calculer', subgoal: 'list' },
    ], S, v: 'n', domain: 'Z', kind: 'image', head, m,
  };
}

// {x ∈ ℤ | x² ≤ k}: −r ≤ x ≤ r with r = ⌊√k⌋.
function setsSquare(rng) {
  const k = rng.int(2, 20);
  const r = Math.floor(Math.sqrt(k));
  const S = solutionSet(parse(`x^2≤${k}`), { v: 'x', domain: 'Z' });
  return {
    start: `{x∈ℤ|x^2≤${k}}`, lines: [
      { math: `${-r}≤x≤${r}`, note: `x² ≤ ${k} et x entier : |x| ≤ ${r}`, subgoal: 'solve' },
      { math: setText(S), note: 'Lister', subgoal: 'list' },
    ], S, v: 'x', domain: 'Z', kind: 'square', k, r,
  };
}

const SETS_TEMPLATES = { linear: setsLinear, image: setsImage, square: setsSquare };

// A second set B and an operation with A, for levels 4–5.
function setsOperation(rng, A) {
  const n = A.parts.length;
  const top = A.parts[n - 1].lo.x;
  for (let i = 0; i < 50; i++) {
    const op = rng.pick(['∩', '∖', '∪']);
    let B;
    if (op === '∪' || rng.chance(0.4)) {
      const lo = rng.int(Math.max(0, top - 3), top + 1);
      B = `{n∈ℕ|${lo}≤n≤${lo + rng.int(2, 4)}}`;
    } else {
      const d = rng.pick([2, 3]);
      B = `{${d}k|k∈ℕ}`;
    }
    const cfg = { v: 'n', domain: 'N', sets: { A: setText(A), B } };
    const R = solutionSet(parse(`A${op}B`), cfg);
    const empty = !R.parts.length;
    if (setEqual(R, A) || (empty && !rng.chance(0.2))) continue;
    return { op, B, cfg, R };
  }
  const B = '{2k|k∈ℕ}';
  const cfg = { v: 'n', domain: 'N', sets: { A: setText(A), B } };
  return { op: '∖', B, cfg, R: solutionSet(parse('A∖B'), cfg), fallback: true };
}

const OP_WORD = { '∩': 'A ∩ B', '∪': 'A ∪ B', '∖': 'A ∖ B' };

function setsItem(level, rng, opts) {
  const kind = level <= 2 ? rng.pick(['linear', 'linear', 'square']) : rng.pick(['linear', 'image', 'square']);
  const d = SETS_TEMPLATES[kind](rng);
  const judge = { kind: 'solset', v: d.v, domain: d.domain };
  let script = d.lines.map((l) => ({ kind: 'eq', math: l.math, note: l.note, subgoal: l.subgoal }));
  let mode = level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free';
  const final = d.lines[d.lines.length - 1].math;
  if (level === 1 || level === 2) {
    // Level 1: the bound and two elements in boxes; level 2: the bound only.
    script = script.map((l, i) => {
      const node = parse(l.math);
      const last = i === script.length - 1;
      if (last && level === 2) return l;
      if (last) {
        const items = node.items;
        const holes = rng.shuffle(items).slice(0, Math.min(2, items.length));
        return { ...l, ...blankLine(node, holes) };
      }
      const holes = node.t === 'rel' ? [node.r] : node.t === 'chain' ? [node.items[0], node.items[2]] : [];
      return holes.length ? { ...l, ...blankLine(node, holes) } : l;
    });
  }
  const segs = [];
  let prompt = `Écris en extension ${MT(d.start)}.`;
  if (level >= 4 && d.kind === 'linear' && !opts.exam) {
    const op = setsOperation(rng, d.S);
    const opSet = setText(op.R);
    segs.push({ kind: 'segment', html: `Avec B = ${MT(op.B)}, calcule ${OP_WORD[op.op]}.`, ask: `${OP_WORD[op.op]} =`, start: { math: `A${op.op}B` }, judge: { kind: 'solset', ...op.cfg } });
    segs.push({ kind: 'eq', math: opSet, note: 'Opérer', subgoal: 'op' });
    prompt = `Soit A = ${MT(d.start)} et B = ${MT(op.B)}. Écris A en extension, puis calcule ${OP_WORD[op.op]}.`;
    if (level === 5) {
      const C = `{n∈ℕ|n≤${d.S.parts[d.S.parts.length - 1].lo.x + rng.int(1, 3)}}`;
      const cfg3 = { v: 'n', domain: 'N', sets: { A: setText(d.S), C } };
      const R3 = solutionSet(parse('C∖A'), cfg3);
      segs.push({ kind: 'segment', html: `Avec C = ${MT(C)}, calcule le complémentaire de A dans C.`, ask: 'C ∖ A =', start: { math: 'C∖A' }, judge: { kind: 'solset', ...cfg3 } });
      segs.push({ kind: 'eq', math: setText(R3), note: 'Complémentaire C_C(A) = C ∖ A', subgoal: 'op' });
      prompt = `Soit A = ${MT(d.start)}, B = ${MT(op.B)} et C = ${MT(C)}. Écris A en extension, puis calcule ${OP_WORD[op.op]} et le complémentaire de A dans C.`;
    }
  }
  const firstLine = d.lines[0];
  const hints = [
    { level: 1, html: d.kind === 'image' ? 'Remplace n par chaque entier permis : les éléments sont les valeurs obtenues, pas les n.' : 'Résous d\'abord la condition, puis garde les entiers permis.' },
    { level: 2, html: `${hintLine(tpl(blankLine(parse(firstLine.math), [parse(firstLine.math).r ?? parse(firstLine.math)].filter(Boolean))))}` },
    { level: 3, html: hintLine(final) },
  ];
  return linesItem({
    skill: SETS, level, prompt, start: d.start, judge, mode, script: [...script, ...segs],
    hints, subgoals: SETS_SUB, keys: ['calc', 'set', 'relation'], tapActions: level === 3 ? 'solset' : null,
    key: `${SETS}:${d.start}:${level}`, exam: opts.exam ? { format: opts.exam, points: 1 } : false,
  });
}

function setsMcq(rng) {
  const d = rng.chance(0.5) ? setsImage(rng) : setsLinear(rng);
  const right = d.S;
  const opts = [{ html: MM(setToNode(right)), correct: true }];
  const seen = [right];
  const add = (S, rule = null) => {
    if (opts.length >= 4 || seen.some((x) => setEqual(x, S))) return;
    seen.push(S);
    opts.push({ html: MM(setToNode(S)), correct: false, rule });
  };
  if (d.kind === 'image') add(solutionSet(parse(`n≤${d.m}`), { v: 'n', domain: 'N' }), 'g9_set_builder');
  const pts = right.parts.map((p) => p.lo.q);
  const asSet = (qs) => solutionSet(parse(`{${qs.map((q) => toText(lit(q))).join(';')}}`), { v: 'n', domain: 'Z' });
  add(asSet(pts.slice(1)));
  add(asSet([...pts, pts[pts.length - 1].add(d.kind === 'image' ? pts[1].sub(pts[0]) : 1)]));
  add(asSet(pts.slice(0, -1)));
  return { ...mcq({ skill: SETS, level: 4, prompt: `Quel est l'ensemble ${MT(d.start)} ?`, options: opts, key: `mcq:${d.start}`, exam: { format: 'mcq', points: 1 } }, rng) };
}

function setsTf(rng) {
  const kind = rng.pick(['contains', 'law', 'falseLaw', 'falseLaw']);
  if (kind === 'contains') {
    const a = rng.int(2, 4);
    const b = rng.int(1, 5);
    const n = rng.int(2, 5);
    const x = a * n + b;
    return tfItem({
      skill: SETS, level: 4, statement: `${MT(`{${a}n+${b}|n∈ℕ}`)} contient ${x}.`, truth: true, key: `contains:${a}:${b}:${x}`,
      explanation: `Vrai : n = ${n} donne ${a}·${n} + ${b} = ${x}.`, exam: { format: 'tf', points: 1 },
    });
  }
  const laws = [
    { s: 'A∖B=B∖A', truth: false, counter: { A: '{1}', B: '∅' }, why: 'Avec A = {1} et B = ∅ : A ∖ B = {1}, mais B ∖ A = ∅.' },
    { s: 'A∪B=A∩B', truth: false, counter: { A: '{1}', B: '∅' }, why: 'Avec A = {1} et B = ∅ : A ∪ B = {1}, mais A ∩ B = ∅.' },
    { s: '(A∪B)∖B=A', truth: false, counter: { A: '{1}', B: '{1}' }, why: 'Avec A = B = {1} : (A ∪ B) ∖ B = ∅, mais A = {1}.' },
    { s: 'A∖(A∖B)=A∩B', truth: true, why: 'Vrai : enlever de A ce qui n\'est pas dans B, c\'est garder ce qui est dans les deux.' },
    { s: '(A∩B)∪(A∖B)=A', truth: true, why: 'Vrai : chaque élément de A est dans B ou n\'y est pas.' },
  ];
  const L = rng.pick(laws.filter((l) => (kind === 'law' ? l.truth : !l.truth)));
  return tfItem({
    skill: SETS, level: 4, statement: `Pour tous ensembles A et B : ${MT(L.s)}.`, truth: L.truth, key: `law:${L.s}`,
    counter: L.truth ? null : {
      kind: 'refute', quants: [{ q: '∀', v: 'A', dom: 'sets' }, { q: '∀', v: 'B', dom: 'sets' }], pred: L.s,
      ask: [{ v: 'A', label: 'A =', keys: ['set'] }, { v: 'B', label: 'B =', keys: ['set'] }], answer: L.counter,
    },
    explanation: L.why, exam: { format: 'tf', points: 1 },
  });
}

// ======================================================================
// g9-intervals
// ======================================================================

const INTER = 'g9-intervals';
const INTER_SUB = [
  { id: 'abs', label: 'ôter la valeur absolue', skill: INTER },
  { id: 'solve', label: 'isoler x', skill: INTER },
  { id: 'translate', label: 'traduire en intervalles', skill: INTER },
  { id: 'op', label: 'intersecter ou réunir', skill: SETS },
];
const RCFG = { v: 'x', domain: 'R' };

// Bounds: whole numbers, sometimes halves, in [−6 ; 6].
function bound(rng) {
  return rng.chance(0.8) ? new Q(rng.int(-6, 6)) : new Q(2 * rng.int(-6, 5) + 1, 2);
}
const bt = (q) => toText(lit(q));
const distinct = (rng, k) => {
  for (;;) {
    const xs = Array.from({ length: k }, () => bound(rng));
    if (new Set(xs.map(String)).size === k) return xs.sort((a, b) => a.cmp(b));
  }
};

// Each template: {start, lines: [{math, note, subgoal}]}; the last line is
// the answer in final form.
const INTERVAL_TEMPLATES = {
  // a < x ≤ b ∧ x ≥ c, with a < c < b
  andChain(rng) {
    const [a, c, b] = distinct(rng, 3);
    const start = `${bt(a)}<x≤${bt(b)}∧x≥${bt(c)}`;
    return { start, lines: [
      { math: `]${bt(a)};${bt(b)}]∩[${bt(c)};+∞[`, note: 'Traduire en intervalles', subgoal: 'translate' },
      { math: setText(solutionSet(parse(start), RCFG)), note: 'Intersecter', subgoal: 'op' },
    ] };
  },
  // x < a ∨ x ≥ b
  orSplit(rng) {
    const [a, b] = distinct(rng, 2);
    const start = `x<${bt(a)}∨x≥${bt(b)}`;
    return { start, lines: [
      { math: `]-∞;${bt(a)}[∪[${bt(b)};+∞[`, note: 'Traduire : « ou » donne ∪', subgoal: 'translate' },
    ] };
  },
  // ¬(a ≤ x < b)
  notRange(rng) {
    const [a, b] = distinct(rng, 2);
    const start = `¬(${bt(a)}≤x<${bt(b)})`;
    return { start, lines: [
      { math: `x<${bt(a)}∨x≥${bt(b)}`, note: 'Nier : « non (a ≤ x < b) » donne « x < a ou x ≥ b »', subgoal: 'solve' },
      { math: `]-∞;${bt(a)}[∪[${bt(b)};+∞[`, note: 'Traduire en intervalles', subgoal: 'translate' },
    ] };
  },
  // |x − m| < r ∧ x ≥ c, with m − r < c < m + r
  absAnd(rng) {
    const m = rng.int(-3, 3);
    const r = rng.int(1, 4);
    const c = rng.int(m - r + 1, m + r - 1);
    const xm = m === 0 ? 'x' : `x${m > 0 ? '-' : '+'}${Math.abs(m)}`;
    const start = `|${xm}|<${r}∧x≥${c}`;
    return { start, lines: [
      { math: `${-r}<${xm}<${r}∧x≥${c}`, note: 'Ôter la valeur absolue', subgoal: 'abs' },
      ...(m === 0 ? [] : [{ math: `${m - r}<x<${m + r}∧x≥${c}`, note: `Isoler x : ${m > 0 ? 'ajouter' : 'soustraire'} ${Math.abs(m)}`, subgoal: 'solve' }]),
      { math: `]${m - r};${m + r}[∩[${c};+∞[`, note: 'Traduire en intervalles', subgoal: 'translate' },
      { math: setText(solutionSet(parse(start), RCFG)), note: 'Intersecter', subgoal: 'op' },
    ] };
  },
  // |x − m| ≤ r ∧ ¬(x < c) ∧ x ≠ d (level 5)
  three(rng) {
    const m = rng.int(-2, 2);
    const r = rng.int(2, 4);
    const c = rng.int(m - r + 1, m + r - 2);
    const dd = rng.int(c + 1, m + r - 1);
    const xm = m === 0 ? 'x' : `x${m > 0 ? '-' : '+'}${Math.abs(m)}`;
    const start = `|${xm}|≤${r}∧¬(x<${c})∧x≠${dd}`;
    return { start, lines: [
      { math: `${m - r}≤x≤${m + r}∧x≥${c}∧x≠${dd}`, note: 'Ôter la valeur absolue, nier x < c', subgoal: 'abs' },
      { math: `[${m - r};${m + r}]∩[${c};+∞[∖{${dd}}`, note: 'Traduire en ensembles', subgoal: 'translate' },
      { math: setText(solutionSet(parse(start), RCFG)), note: 'Calculer', subgoal: 'op' },
    ] };
  },
  // a < x ≤ b (level 2)
  simple(rng) {
    const [a, b] = distinct(rng, 2);
    const kind = rng.pick(['chain', 'chain', 'ge', 'lt']);
    const start = kind === 'chain' ? `${bt(a)}<x≤${bt(b)}` : kind === 'ge' ? `x≥${bt(a)}` : `x<${bt(b)}`;
    return { start, lines: [{ math: setText(solutionSet(parse(start), RCFG)), note: 'Traduire en intervalle', subgoal: 'translate' }] };
  },
};
const INTER_BY_LEVEL = { 2: ['simple'], 3: ['andChain', 'notRange', 'absAnd'], 4: ['andChain', 'notRange', 'absAnd', 'orSplit'], 5: ['three', 'absAnd'] };

// The answer has a closed and an open bound (catalogue).
function mixedBounds(text) {
  const S = solutionSet(parse(text), RCFG);
  const fin = S.parts.flatMap((p) => [[p.lo, p.loC], [p.hi, p.hiC]]).filter(([b]) => Number.isFinite(b.x) && S.parts.every((q) => q.lo.x !== q.hi.x));
  return fin.some(([, c]) => c) && fin.some(([, c]) => !c);
}

function interItem(level, rng, opts) {
  if (level === 1) return bracketMcq(rng, 1);
  let d;
  for (let i = 0; i < 100; i++) {
    d = INTERVAL_TEMPLATES[rng.pick(INTER_BY_LEVEL[level])](rng);
    if (level === 2 || mixedBounds(d.start)) break;
  }
  const mode = level === 2 ? 'guided' : level === 3 ? 'tap' : 'free';
  const script = d.lines.map((l) => ({ kind: 'eq', ...l }));
  const final = d.lines[d.lines.length - 1].math;
  const first = d.lines[0].math;
  const firstNode = parse(first);
  const hole = firstNode.t === 'setop' ? firstNode.r : firstNode.t === 'logic' ? firstNode.r : null;
  return linesItem({
    skill: INTER, level, prompt: `Écris l'ensemble des réels x tels que ${MT(d.start)} à l'aide d'intervalles.`,
    start: d.start, judge: { kind: 'solset', ...RCFG }, mode, script,
    hints: [
      { level: 1, html: 'Écris chaque condition comme un intervalle : « et » donne ∩, « ou » donne ∪. Un crochet tourné vers le nombre l\'inclut.' },
      { level: 2, html: hole ? MT(tpl(blankLine(firstNode, [hole]))) : MT(first) },
      { level: 3, html: MT(final) },
    ],
    subgoals: INTER_SUB, keys: ['calc', 'set', 'relation'], tapActions: level === 3 ? 'solset' : null,
    key: `${INTER}:${d.start}`, exam: opts.exam ? { format: opts.exam, points: 2 } : false,
  });
}

// Options: the right set and its traps (one bracket turned, ∩ for ∪).
function bracketMcq(rng, level, exam = false) {
  const d = level === 1 ? INTERVAL_TEMPLATES.simple(rng) : INTERVAL_TEMPLATES[rng.pick(['andChain', 'orSplit', 'absAnd', 'notRange'])](rng);
  const right = solutionSet(parse(d.start), RCFG);
  const options = [{ html: MM(setToNode(right)), correct: true }];
  const seen = [right];
  for (const t of rng.shuffle(trapAnswers('solset', parse(d.start), { kind: 'solset', ...RCFG }))) {
    if (options.length >= 4) break;
    let S;
    try { S = solutionSet(t.node, RCFG); } catch { continue; }
    if (seen.some((x) => setEqual(x, S))) continue;
    seen.push(S);
    options.push({ html: MM(setToNode(S)), correct: false, rule: t.rule });
  }
  // Each bound turned, if the traps gave too few options.
  for (const p of right.parts) for (const side of ['lo', 'hi']) {
    if (options.length >= 4 || !Number.isFinite(p[side].x)) continue;
    const S = { parts: right.parts.map((q) => (q === p ? { ...q, [`${side}C`]: !q[`${side}C`] } : q)) };
    if (seen.some((x) => setEqual(x, S))) continue;
    seen.push(S);
    options.push({ html: MM(setToNode(S)), correct: false, rule: 'g9_bracket' });
  }
  const bothTurned = { parts: right.parts.map((q) => ({ ...q, loC: Number.isFinite(q.lo.x) ? !q.loC : false, hiC: Number.isFinite(q.hi.x) ? !q.hiC : false })) };
  if (options.length < 4 && !seen.some((x) => setEqual(x, bothTurned))) options.push({ html: MM(setToNode(bothTurned)), correct: false, rule: 'g9_bracket' });
  return mcq({
    skill: INTER, level, prompt: `Quel ensemble décrit les réels x tels que ${MT(d.start)} ?`, options, key: `mcq:${d.start}`,
    solution: d.lines.map((l) => ({ html: MT(l.math), note: l.note })), exam,
  }, rng);
}

function interTf(rng) {
  const [a, b] = distinct(rng, 2);
  const right = `]-∞;${bt(a)}]∪]${bt(b)};+∞[`;
  const wrong = `]-∞;${bt(a)}[∪[${bt(b)};+∞[`;
  const truth = rng.chance(0.4);
  const claim = truth ? right : wrong;
  const lhs = `ℝ∖]${bt(a)};${bt(b)}]`;
  return tfItem({
    skill: INTER, level: 4, statement: MT(`${lhs}=${claim}`), truth, key: `${lhs}=${claim}`,
    counter: truth ? null : {
      kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: `x∈${lhs}⇔x∈${claim}`,
      ask: [{ v: 'x', label: 'Un réel dans un seul des deux ensembles : x =', keys: ['calc'] }], answer: { x: bt(a) },
    },
    ruleIfTrue: truth ? null : 'g9_bracket',
    explanation: `Le complémentaire de ]${fr(bt(a))} ; ${fr(bt(b))}] contient ${fr(bt(a))} (qui n'est pas dans ]${fr(bt(a))} ; …]) et pas ${fr(bt(b))} : c'est ${MT(right)}.`,
    exam: { format: 'tf', points: 1 },
  });
}

// ======================================================================
// Logic helpers
// ======================================================================

const not = (e) => ({ t: 'not', e });
const flip = (q) => (q === '∀' ? '∃' : '∀');

// One step of pushing ¬ in: the first ¬ (reading order) before a
// quantifier, a connective, ¬ or a table atom. merge: a table atom that a
// step negates is written negated at once (x ≥ 3, not ¬(x < 3)), and ¬¬
// disappears at once.
function negStep(f, lex, { merge = true } = {}) {
  let target = null;
  walkF(f, (n, path) => {
    if (target) return false;
    if (n.t === 'not') {
      const e = strip(n.e);
      if (e.t !== 'atom' || lex.atoms.get(e.key)?.table) { target = { path, e }; return false; }
    }
    return true;
  });
  if (!target) return null;
  const N = (x) => {
    const y = strip(x);
    if (merge && y.t === 'atom' && lex.atoms.get(y.key)?.table) return { ...y, neg: !y.neg };
    if (merge && y.t === 'not') return y.e;
    return not(x);
  };
  const { path, e } = target;
  let repl;
  switch (e.t) {
    case 'q': repl = { t: 'q', q: flip(e.q), bind: e.bind, body: N(e.body) }; break;
    case 'and': repl = { t: 'or', l: N(e.l), r: N(e.r) }; break;
    case 'or': repl = { t: 'and', l: N(e.l), r: N(e.r) }; break;
    case 'imp': repl = { t: 'and', l: e.l, r: N(e.r) }; break;
    case 'not': repl = e.e; break;
    default: repl = { ...e, neg: !e.neg };
  }
  return replaceF(f, path, repl);
}

function negSteps(f, lex, opts) {
  const out = [];
  let cur = f;
  for (let i = 0; i < 12; i++) {
    const next = negStep(cur, lex, opts);
    if (!next) break;
    out.push(next);
    cur = next;
  }
  return out;
}

function stepNote(prev) {
  let note = null;
  walkF(prev, (n) => {
    if (note) return false;
    if (n.t !== 'not') return true;
    const e = strip(n.e);
    note = e.t === 'q' ? `Franchir ${e.q}${e.bind.text}` : e.t === 'imp' ? 'Nier l\'implication : A ∧ ¬B' : e.t === 'and' || e.t === 'or' ? 'De Morgan' : e.t === 'not' ? 'Double négation' : 'Nier le morceau';
    return false;
  });
  return note;
}

// Pieces: the formula's own, plus decoys (strict negations, negated
// restrictions) so the palette does not give the answer away.
const STRICT = { '<': '>', '≤': '≥', '>': '<', '≥': '≤' };
const NEG = { '<': '≥', '≤': '>', '>': '≤', '≥': '<', '=': '≠', '≠': '=', '∈': '∉', '∉': '∈' };
function swapIn(text, table) {
  for (let i = 0; i < text.length; i++) if (table[text[i]]) return text.slice(0, i) + table[text[i]] + text.slice(i + 1);
  return null;
}
function paletteOf(pieces, binds, { decoys = true } = {}) {
  const out = [];
  const push = (t) => { if (t && !out.includes(t)) out.push(t); };
  for (const b of binds) push(b);
  for (const p of pieces) {
    push(p.text);
    if (p.neg) push(p.neg); else push(swapIn(p.text, NEG));
    if (decoys && !p.neg) push(swapIn(p.text, STRICT));
  }
  if (decoys) for (const b of binds) if (!/[∈⊂]/.test(b)) push(swapIn(b, NEG));
  return out;
}
const piecesOf = (palette, explicit = []) => {
  const out = [];
  for (const t of palette) {
    const p = explicit.find((x) => x.text === t || x.neg === t);
    const piece = p ?? { text: t };
    if (!out.some((q) => q.text === piece.text)) out.push(piece);
  }
  return out;
};

const fText = (f, cfg) => formulaText(f, lexFor(cfg));
const P = (text, cfg) => parseFormula(text, lexFor(cfg));

// The binds and the body of « ∀ε > 0 ∃δ > 0, body » (« x, y ∈ I » is one bind).
const PAIR = 'x, y ∈ I';
function splitQ(S) {
  const t = S.replace(PAIR, '§');
  const binds = [...t.matchAll(/[∀∃]([^∀∃,]+?)(?=\s*[∀∃,])/g)].map((m) => m[1].trim().replace('§', PAIR));
  const body = t.slice(t.lastIndexOf(', ') + 2).replace('§', PAIR);
  return { binds, body };
}

// ======================================================================
// g9-connectives
// ======================================================================

const CONN = 'g9-connectives';
const LETTERS = ['P', 'Q', 'R'];
const PQ = { letters: LETTERS };

const CONN_TARGETS = {
  two: ['P∨¬Q', '¬P∧Q', 'P∧¬Q', '¬P∨¬Q', '¬P∧¬Q', 'P∨Q'],
  imp: ['P⇒Q', 'Q⇒P', 'P⇒¬Q'],
  three: ['P∧(¬Q∨R)', '¬P∨(Q∧¬R)', '(P∨Q)∧¬R', '(¬P∧Q)∨R', 'P∨(Q∧R)', '¬P∧(Q∨¬R)'],
};

// The start: ¬N, where N is the negation of the target pushed in.
function connStart(target) {
  const N = nnf(P(target, PQ), true, { full: true });
  return fText(not(N), PQ);
}

function connLines(start, target, withImp) {
  const lex = lexFor(PQ);
  const f = P(start, PQ);
  const steps = negSteps(f, lex, { merge: false });
  const out = steps.map((g, i) => ({ math: fText(g, PQ), note: stepNote(i ? steps[i - 1] : f), subgoal: 'push' }));
  if (withImp) out.push({ math: target, note: 'Reconnaître l\'implication : ¬A ∨ B ≡ A ⇒ B', subgoal: 'imp' });
  return out;
}

const CONN_SUB = [
  { id: 'push', label: 'faire entrer la négation', skill: CONN },
  { id: 'imp', label: 'reconnaître l\'implication', skill: CONN },
];

function connLinesItem(level, rng, opts) {
  const withImp = level === 3 ? rng.chance(0.5) : level === 4 && rng.chance(0.3);
  const target = rng.pick(withImp ? CONN_TARGETS.imp : level >= 4 ? CONN_TARGETS.three : CONN_TARGETS.two);
  const start = connStart(target);
  const lines = connLines(start, target, withImp);
  const maxSize = size(P(target, PQ));
  const judge = { kind: 'logic', letters: LETTERS, maxSize };
  return linesItem({
    skill: CONN, level,
    prompt: withImp ? `Montre que ${FM(start, PQ)} ≡ ${FM(target, PQ)}, une règle par ligne.` : `Simplifie ${FM(start, PQ)} : fais entrer la négation, une règle par ligne.`,
    start, judge, mode: level === 3 ? 'tap' : 'free',
    script: lines.map((l) => ({ kind: 'eq', ...l })),
    hints: [
      { level: 1, html: 'Fais entrer la négation dans la parenthèse : ∧ devient ∨, ∨ devient ∧, et ¬¬A = A.' },
      { level: 2, html: `Première ligne : ${FM(lines[0].math, PQ)}` },
      { level: 3, html: FM(lines[lines.length - 1].math, PQ) },
    ],
    subgoals: CONN_SUB, keys: ['logic'], tapActions: level === 3 ? 'logic' : null,
    key: `${CONN}:${start}`, exam: opts.exam ? { format: opts.exam, points: 1 } : false,
  });
}

// A truth table (levels 1–2).
function truthTable(level, rng) {
  const cols = level === 1 ? [rng.pick(['P⇒Q', 'P∧Q', 'P∨Q', '¬P∨Q'])] : ['P⇒Q', 'Q⇒P', '(P⇒Q)∧(Q⇒P)'];
  const envs = [[true, true], [true, false], [false, true], [false, false]];
  const V = (b) => (b ? 'V' : 'F');
  const rows = envs.map(([p, q], i) => ({
    id: `r${i}`, label: '', env: { P: p, Q: q },
    cells: [{ given: V(p) }, { given: V(q) }, ...cols.map(() => ({ input: true, kind: 'tf' }))],
  }));
  const answers = {};
  for (const r of rows) answers[r.id] = [null, null, ...cols.map((c) => V(truthOf(P(c, PQ), r.env)))];
  const then = level === 2 ? mcq({
    skill: CONN, level: 2, prompt: 'La dernière colonne est la table de…',
    options: [{ html: FM('P⇔Q', PQ), correct: true }, { html: FM('P∧Q', PQ), correct: false }, { html: FM('P∨Q', PQ), correct: false }, { html: FM('P⇒Q', PQ), correct: false }],
    key: 'iff', solution: [{ html: 'P ⇔ Q est vrai quand P et Q ont la même valeur : c\'est (P ⇒ Q) ∧ (Q ⇒ P).', note: '' }],
  }, rng) : null;
  const last = cols.length + 1;
  return tableItem({
    skill: CONN, level, prompt: `Complète la table de vérité${cols.length > 1 ? '' : ` de ${FM(cols[0], PQ)}`} (V = vrai, F = faux).`,
    table: { cols: ['P', 'Q', ...cols.map((c) => FM(c, PQ))], rows },
    phi: { kind: 'truth', letters: ['P', 'Q'], columns: [null, null, ...cols] },
    answers, then, key: cols.join('|'),
    hints: [
      { level: 1, html: 'P ⇒ Q est faux seulement quand P est vrai et Q faux. P ∧ Q : vrai seulement si les deux le sont. P ∨ Q : faux seulement si les deux sont faux.' },
      { level: 2, html: 'Ligne P = V, Q = F : P ⇒ Q vaut F.' },
      { level: 3, html: `Dernière colonne : ${rows.map((r) => answers[r.id][last]).join(', ')}.` },
    ],
    solution: rows.map((r) => ({ html: `P = ${V(r.env.P)}, Q = ${V(r.env.Q)} : ${cols.map((c, j) => `${FM(c, PQ)} = ${answers[r.id][2 + j]}`).join(' ; ')}`, note: '' })),
  });
}

const CONN_TF = [
  { left: '¬(P⇒Q)', right: '¬P⇒¬Q', truth: false, answer: { P: true, Q: true }, rule: 'g9_neg_implication' },
  { left: '¬(P∧Q)', right: '¬P∧¬Q', truth: false, answer: { P: true, Q: false }, rule: 'g9_demorgan' },
  { left: '¬(P∨Q)', right: '¬P∨¬Q', truth: false, answer: { P: true, Q: false }, rule: 'g9_demorgan' },
  { left: 'P⇒Q', right: 'Q⇒P', truth: false, answer: { P: true, Q: false }, rule: 'g9_converse_contra' },
  { left: 'P⇒Q', right: '¬Q⇒¬P', truth: true },
  { left: '¬(P∨Q)', right: '¬P∧¬Q', truth: true },
  { left: '¬(P⇒Q)', right: 'P∧¬Q', truth: true },
  { left: 'P⇒Q', right: '¬P∨Q', truth: true },
];

function connTf(rng) {
  const c = rng.pick(CONN_TF);
  return tfItem({
    skill: CONN, level: 4, statement: `${FM(c.left, PQ)} ≡ ${FM(c.right, PQ)}`, truth: c.truth, key: `${c.left}=${c.right}`,
    counter: c.truth ? null : { kind: 'truth', left: c.left, right: c.right, letters: ['P', 'Q'], ask: [{ v: 'P' }, { v: 'Q' }], answer: c.answer },
    ruleIfTrue: c.truth ? null : c.rule,
    explanation: c.truth ? 'Vrai : les deux formules ont la même table de vérité.' : `Faux : avec P ${c.answer.P ? 'vrai' : 'faux'} et Q ${c.answer.Q ? 'vrai' : 'faux'}, les deux côtés n'ont pas la même valeur.`,
    exam: { format: 'tf', points: 1 },
  });
}

function connMcq(rng) {
  const start = rng.pick(['¬(P∧Q)', '¬(P∨Q)', '¬(P⇒Q)', '¬(P∧¬Q)', '¬(¬P∨Q)']);
  const f = P(start, PQ);
  const right = nnf(f);
  const options = [{ html: FM(fText(right, PQ), PQ), correct: true }];
  const shown = [right];
  const tryAdd = (g, rule) => {
    if (options.length >= 4 || shown.some((x) => equivalentLogic(x, g))) return;
    shown.push(g);
    options.push({ html: FM(fText(g, PQ), PQ), correct: false, rule });
  };
  for (const t of trapAnswers('logic', f, { kind: 'logic', letters: LETTERS })) tryAdd(t.node, t.rule);
  for (const w of ['P∧Q', 'P∨Q', '¬P∧Q', 'P∨¬Q', '¬P⇒Q']) tryAdd(P(w, PQ), null);
  return mcq({
    skill: CONN, level: 4, prompt: `Quelle formule est équivalente à ${FM(start, PQ)} ?`, options, key: `mcq:${start}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `${FM(start, PQ)} ≡ ${FM(fText(right, PQ), PQ)}`, note: 'Faire entrer la négation' }],
  }, rng);
}

function connItem(level, rng, opts) {
  if (opts.exam === 'tf') return connTf(rng);
  if (opts.exam === 'mcq') return connMcq(rng);
  if (level <= 2) return truthTable(level, rng);
  return connLinesItem(level, rng, opts);
}

// ======================================================================
// g9-implication
// ======================================================================

const IMPL = 'g9-implication';

// Bank of implications A ⇒ B: pieces (with their negations), the bound
// variable, truth, and a counter-example when false.
function implBank(rng) {
  const k = rng.pick([2, 3, 5]);
  const a = rng.int(1, 5);
  return [
    { id: 'mult', bind: 'n ∈ ℤ', A: { text: `n² est multiple de ${k}`, neg: `n² n'est pas multiple de ${k}` }, B: { text: `n est multiple de ${k}`, neg: `n n'est pas multiple de ${k}` }, sentence: `si n² est multiple de ${k}, alors n est multiple de ${k}` },
    { id: 'pair', bind: 'n ∈ ℤ', A: { text: 'n² est pair', neg: 'n² est impair' }, B: { text: 'n est pair', neg: 'n est impair' }, sentence: 'si n² est pair, alors n est pair' },
    { id: 'sq', bind: 'x ∈ ℝ', A: { text: `x² > ${a * a}` }, B: { text: `x > ${a}` }, sentence: `si x² > ${a * a}, alors x > ${a}` },
    { id: 'sq2', bind: 'x ∈ ℝ', A: { text: `x > ${a}` }, B: { text: `x² > ${a * a}` }, sentence: `si x > ${a}, alors x² > ${a * a}` },
    { id: 'sets', bind: 'A, B, C ⊂ ℕ', A: { text: 'A ∩ C = B ∩ C' }, B: { text: 'A = B' }, sentence: 'si A ∩ C = B ∩ C, alors A = B' },
  ];
}

const negText = (p) => p.neg ?? swapIn(p.text, NEG);

function implForms(I, withQ) {
  const pre = withQ ? `∀${I.bind}, ` : '';
  const preE = withQ ? `∃${I.bind}, ` : '';
  return {
    S: `${pre}${I.A.text} ⇒ ${I.B.text}`,
    contra: `${pre}${negText(I.B)} ⇒ ${negText(I.A)}`,
    converse: `${pre}${I.B.text} ⇒ ${I.A.text}`,
    inverse: `${pre}${negText(I.A)} ⇒ ${negText(I.B)}`,
    neg: `${preE}${I.A.text} ∧ ${negText(I.B)}`,
    negWrong: `${preE}${negText(I.A)} ⇒ ${negText(I.B)}`,
  };
}

const TASK = {
  contra: { word: 'la contraposée', hint: 'On nie les deux côtés et on les échange : ¬B ⇒ ¬A.' },
  converse: { word: 'la réciproque', hint: 'On échange les deux côtés : B ⇒ A.' },
  neg: { word: 'la négation', hint: 'Une implication est fausse quand A est vrai et B faux : sa négation est A ∧ ¬B. Le ∀ devient ∃.' },
};

function implPieces(I, withQ, decoys) {
  const explicit = [I.A, I.B].filter((p) => p.neg);
  const palette = paletteOf([I.A, I.B], withQ ? [I.bind] : [], { decoys });
  return { palette, pieces: piecesOf(palette, explicit) };
}

// The two sides of the implication under the quantifiers.
function sidesOf(text, cfg) {
  let m = strip(P(text, cfg));
  while (m.t === 'q') m = strip(m.body);
  return m.t === 'imp' ? { l: fText(m.l, cfg), r: fText(m.r, cfg) } : null;
}

function implTokens(level, rng, opts = {}) {
  const bank = implBank(rng);
  const I = rng.pick(level >= 4 ? bank : bank.filter((x) => x.id !== 'sets'));
  const withQ = level >= 3 || !!opts.exam;
  const task = opts.exam === 'open' || level === 5 ? 'neg' : rng.pick(['contra', 'converse', 'neg']);
  const F = implForms(I, withQ);
  const { palette, pieces } = implPieces(I, withQ, level >= 4);
  const cfg = { pieces };
  const target = F[task];
  return tokensItem({
    skill: IMPL, level,
    prompt: `Écris ${TASK[task].word} de l'énoncé ${FM(F.S, cfg)}${withQ ? '' : ` (« ${I.sentence} »)`}.`,
    pieces, palette, target, start: task === 'neg' ? `¬(${F.S})` : F.S, sides: task === 'neg' ? null : sidesOf(target, cfg), task,
    hints: [
      { level: 1, html: TASK[task].hint },
      { level: 2, html: task === 'neg' ? `${withQ ? `∃${I.bind}, ` : ''}${I.A.text} ∧ …` : `… ⇒ ${task === 'contra' ? negText(I.A) : I.A.text}` },
      { level: 3, html: FM(target, cfg) },
    ],
    noHints: level === 5 || !!opts.exam,
    baits: task === 'neg' ? ['g9_neg_implication'] : ['g9_converse_contra'],
    solution: [{ html: FM(target, cfg), note: TASK[task].word }],
    key: `${I.id}:${task}:${withQ}:${I.A.text}`, exam: opts.exam ? { format: opts.exam, points: 2 } : false,
  });
}

function implMcq(rng, level = 1, exam = false) {
  const I = rng.pick(implBank(rng));
  const withQ = level > 1;
  const F = implForms(I, withQ);
  const { pieces } = implPieces(I, withQ, false);
  const cfg = { pieces };
  const task = level === 1 ? 'contra' : rng.pick(['contra', 'neg']);
  const all = withQ ? `∀${I.bind}, ` : '';
  const some = withQ ? `∃${I.bind}, ` : '';
  const options = task === 'contra'
    ? [{ html: FM(F.contra, cfg), correct: true }, { html: FM(F.converse, cfg), correct: false, rule: 'g9_converse_contra' },
      { html: FM(F.inverse, cfg), correct: false, rule: 'g9_converse_contra' }, { html: FM(`${all}${I.A.text} ⇒ ${negText(I.B)}`, cfg), correct: false }]
    : [{ html: FM(F.neg, cfg), correct: true }, { html: FM(F.negWrong, cfg), correct: false, rule: 'g9_neg_implication' },
      { html: FM(`${all}${I.A.text} ∧ ${negText(I.B)}`, cfg), correct: false, rule: 'g9_neg_one_quant' },
      { html: FM(`${some}${I.A.text} ⇒ ${negText(I.B)}`, cfg), correct: false, rule: 'g9_neg_implication' }];
  return mcq({
    skill: IMPL, level, prompt: `Laquelle est ${TASK[task].word} de ${FM(F.S, cfg)} ?`, options, key: `mcq:${I.id}:${task}:${withQ}`, exam,
    solution: [{ html: FM(F[task], cfg), note: TASK[task].hint }],
  }, rng);
}

function implTf(rng) {
  const a = rng.int(2, 5);
  if (rng.chance(0.4)) {
    return tfItem({
      skill: IMPL, level: 4, statement: `« ∀x ∈ ℝ, x > ${a} ⇒ x² > ${a * a} » est vraie. Sa contraposée est donc vraie aussi.`, truth: true,
      key: `contra:${a}`, explanation: 'Vrai : la contraposée est équivalente à l\'implication.', exam: { format: 'tf', points: 1 },
    });
  }
  return tfItem({
    skill: IMPL, level: 4, statement: `« ∀x ∈ ℝ, x > ${a} ⇒ x² > ${a * a} » est vraie. Sa réciproque « ∀x ∈ ℝ, x² > ${a * a} ⇒ x > ${a} » est donc vraie aussi.`,
    truth: false, key: `conv:${a}`, ruleIfTrue: 'g9_converse_contra',
    counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: `x^2>${a * a}⇒x>${a}`, hyp: `x^2>${a * a}`, ask: [{ v: 'x', label: 'Contre-exemple à la réciproque : x =' }], answer: { x: String(-a - 1) } },
    explanation: `Faux : x = ${-a - 1} vérifie x² > ${a * a} mais pas x > ${a}. La réciproque d'une implication vraie peut être fausse.`,
    exam: { format: 'tf', points: 1 },
  });
}

function implItem(level, rng, opts) {
  if (opts.exam === 'mcq') return implMcq(rng, 4, { format: 'mcq', points: 1 });
  if (opts.exam === 'tf') return implTf(rng);
  if (opts.exam === 'open') return implTokens(5, rng, opts);
  if (level === 1) return implMcq(rng, 1);
  return implTokens(level, rng, opts);
}

// ======================================================================
// g9-quant-read
// ======================================================================

const QREAD = 'g9-quant-read';
const PRED_KINDS = [
  { text: (c) => `x² + y < ${c}`, cas: (c) => `x^2+y<${c}`, cs: [4, 30] },
  { text: (c) => `x + 2y < ${c}`, cas: (c) => `x+2y<${c}`, cs: [3, 16] },
  { text: (c) => `x·y ≥ ${c}`, cas: (c) => `x×y≥${c}`, cs: [1, 20] },
];

const holdsAt = (pred, x, y) => closedHolds(parse(pred.replace(/x/g, `(${x})`).replace(/y/g, `(${y})`)), {});

// A finite domain A and a predicate where ∀x∃y and ∃y∀x often differ.
function finiteQuant(rng) {
  for (let i = 0; i < 200; i++) {
    const A = rng.shuffle([1, 2, 3, 4, 5]).slice(0, 3).sort((a, b) => a - b);
    const K = rng.pick(PRED_KINDS);
    const c = rng.int(K.cs[0], K.cs[1]);
    const pred = K.cas(c);
    const tab = A.map((x) => A.map((y) => holdsAt(pred, x, y)));
    const ae = A.every((x, i2) => A.some((y, j) => tab[i2][j]));
    const ea = A.some((y, j) => A.every((x, i2) => tab[i2][j]));
    if (tab.flat().every(Boolean) || !tab.flat().some(Boolean)) continue;
    if (ae === ea && rng.chance(0.5)) continue;
    // A uniform counter-example x when ∃y ∀x is false.
    const block = A.find((x, i2) => A.every((y, j) => !tab[i2][j]));
    return { A, K, c, pred, tab, ae, ea, block, text: K.text(c) };
  }
  return null;
}

function finiteTf(d, which, level, rng, opts = {}) {
  const As = `{${d.A.join(' ; ')}}`;
  const cfg = { pieces: [{ text: 'x ∈ A' }, { text: 'y ∈ A' }, { text: d.text }] };
  const ae = which === 'ae';
  const statement = ae ? `∀x ∈ A ∃y ∈ A, ${d.text}` : `∃y ∈ A ∀x ∈ A, ${d.text}`;
  const truth = ae ? d.ae : d.ea;
  const swapped = ae ? d.ea : d.ae;
  let counter = null;
  if (!truth) {
    if (ae) {
      const x = d.A.find((xx, i) => d.tab[i].every((v) => !v));
      counter = { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: d.A }, { q: '∃', v: 'y', dom: d.A }], pred: d.pred, ask: [{ v: 'x', label: 'Un x pour lequel aucun y ne marche : x =' }], answer: { x: String(x) } };
    } else {
      counter = { kind: 'refute', quants: [{ q: '∃', v: 'y', dom: d.A }, { q: '∀', v: 'x', dom: d.A }], pred: d.pred, ask: [{ v: 'x', label: 'Un x qui fait échouer chaque y : x =' }], answer: { x: String(d.block) } };
    }
  }
  return tfItem({
    skill: QREAD, level, statement: `A = ${As}. ${FM(statement, cfg)}`, truth, counter,
    ruleIfTrue: !truth && swapped ? 'g9_quant_order' : null, ruleIfFalse: truth && !swapped ? 'g9_quant_order' : null,
    hints: [
      { level: 1, html: ae ? 'Pour ∀x ∃y : prends chaque x et cherche un y qui marche.' : 'Pour ∃y ∀x : cherche un seul y qui marche pour tous les x à la fois.' },
      { level: 2, html: `Teste x = ${d.A[d.A.length - 1]} avec le plus petit y.` },
      { level: 3, html: truth ? 'L\'énoncé est vrai.' : `L'énoncé est faux : x = ${counter.answer.x}.` },
    ],
    noHints: level === 5 || !!opts.exam,
    explanation: d.A.map((x, i) => `x = ${x} : ${d.A.filter((y, j) => d.tab[i][j]).map((y) => `y = ${y}`).join(', ') || 'aucun y'}`).join(' ; '),
    key: `${statement}:${As}`, exam: opts.exam ? { format: opts.exam, points: 1 } : false,
    fallback: !!d.fallback,
  });
}

// Classic pairs on ℝ or ℕ: the statement, its truth, a counter-example.
const QBANK = [
  { s: '∀x ∈ ℝ ∃y ∈ ℝ, x + y = 0', truth: true },
  { s: '∃y ∈ ℝ ∀x ∈ ℝ, x + y = 0', truth: false, quants: [['∃', 'y', 'R'], ['∀', 'x', 'R']], pred: 'x+y=0', answer: { x: '1-y' }, ask: 'x (en fonction de y) =' },
  { s: '∀x ∈ ℝ ∃y ∈ ℝ, y > x', truth: true },
  { s: '∃y ∈ ℝ ∀x ∈ ℝ, y > x', truth: false, quants: [['∃', 'y', 'R'], ['∀', 'x', 'R']], pred: 'y>x', answer: { x: 'y+1' }, ask: 'x (en fonction de y) =' },
  { s: '∀x ∈ ℝ ∃y ∈ ℝ, y² = x', truth: false, quants: [['∀', 'x', 'R'], ['∃', 'y', 'R']], pred: 'y^2=x', answer: { x: '-1' }, ask: 'x =' },
  { s: '∀n ∈ ℕ ∃m ∈ ℕ, m > n', truth: true },
  { s: '∃m ∈ ℕ ∀n ∈ ℕ, m > n', truth: false, quants: [['∃', 'm', 'N'], ['∀', 'n', 'N']], pred: 'm>n', answer: { n: 'm' }, ask: 'n (en fonction de m) =' },
  { s: '∃y ∈ ℝ ∀x ∈ ℝ, x·y = 0', truth: true },
  { s: '∀x ∈ ℝ ∃y ∈ ℝ, x·y = 1', truth: false, quants: [['∀', 'x', 'R'], ['∃', 'y', 'R']], pred: 'x×y=1', answer: { x: '0' }, ask: 'x =' },
  { s: '∃y ∈ ℝ ∀x ∈ ℝ, y < x²', truth: true },
  { s: '∀x ∈ ℝ ∃y ∈ ℝ, y < x²', truth: true },
  { s: '∃x ∈ ℝ ∀y ∈ ℝ, x ≤ y²', truth: true },
];

function bankCfg(s) {
  const binds = [...s.matchAll(/[∀∃]([a-z] ∈ [ℝℕ])/g)].map((m) => m[1]);
  const body = s.split(', ').slice(1).join(', ');
  return { pieces: [...binds.map((b) => ({ text: b })), { text: body }] };
}

function bankTf(level, rng, opts = {}) {
  const b = rng.pick(QBANK);
  const cfg = bankCfg(b.s);
  const counter = b.truth ? null : {
    kind: 'refute', quants: b.quants.map(([q, v, dom]) => ({ q, v, dom })), pred: b.pred,
    ask: Object.keys(b.answer).map((v) => ({ v, label: `Contre-exemple : ${b.ask}` })), answer: b.answer,
  };
  return tfItem({
    skill: QREAD, level, statement: FM(b.s, cfg), truth: b.truth, counter, key: b.s,
    ruleIfTrue: b.truth ? null : 'g9_quant_order', ruleIfFalse: b.truth ? 'g9_quant_order' : null,
    hints: [
      { level: 1, html: '∀x ∃y : y peut dépendre de x. ∃y ∀x : un même y pour tous les x.' },
      { level: 2, html: b.truth ? 'Essaie de trouver le y (ou le x) qui marche.' : 'Essaie de faire échouer chaque choix possible.' },
      { level: 3, html: b.truth ? 'Vrai.' : `Faux : ${Object.entries(b.answer).map(([v, t]) => `${v} = ${fr(t)}`).join(', ')}.` },
    ],
    noHints: level === 5 || !!opts.exam,
    explanation: b.truth ? 'Vrai.' : `Faux. Contre-exemple : ${Object.entries(b.answer).map(([v, t]) => `${v} = ${fr(t)}`).join(', ')}.`,
    exam: opts.exam ? { format: opts.exam, points: 1 } : false,
  });
}

function gridTable(rng) {
  const d = finiteQuant(rng) ?? { A: [1, 2, 3], K: PRED_KINDS[0], c: 10, pred: 'x^2+y<10', text: 'x^2 + y < 10', tab: [[true, true, true], [true, true, true], [false, false, false]], ae: false, ea: false, block: 3, fallback: true };
  const V = (b) => (b ? 'V' : 'F');
  const rows = d.A.map((x, i) => ({ id: `x${i}`, label: `x = ${x}`, cells: d.A.map(() => ({ input: true, kind: 'tf' })) }));
  const answers = Object.fromEntries(rows.map((r, i) => [r.id, d.tab[i].map(V)]));
  const which = rng.pick(['ae', 'ea']);
  return tableItem({
    skill: QREAD, level: 1, prompt: `A = {${d.A.join(' ; ')}}. Coche les cases où ${MT(d.pred)} est vraie.`,
    table: { cols: d.A.map((y) => `y = ${y}`), rows }, phi: { kind: 'grid', xs: d.A, ys: d.A, pred: d.pred }, answers,
    then: finiteTf(d, which, 1, rng), key: `${d.pred}:${d.A.join()}`,
    hints: [
      { level: 1, html: 'Remplace x et y par leurs valeurs et calcule.' },
      { level: 2, html: `Pour x = ${d.A[0]}, y = ${d.A[0]} : ${MT(d.pred.replace(/x/g, `(${d.A[0]})`).replace(/y/g, `(${d.A[0]})`))} ?` },
      { level: 3, html: rows.map((r, i) => `${r.label} : ${answers[r.id].join(' ')}`).join(' ; ') },
    ],
    fallback: !!d.fallback,
  });
}

// Sentences to write as formulas (level 4).
const QSENT = [
  { phrase: 'Pour tout réel x, il existe un réel y tel que x + y = 0.', target: '∀x ∈ ℝ ∃y ∈ ℝ, x + y = 0', pieces: ['x ∈ ℝ', 'y ∈ ℝ', 'x + y = 0', 'x + y ≠ 0'] },
  { phrase: 'Il existe un réel y tel que, pour tout réel x, y > x.', target: '∃y ∈ ℝ ∀x ∈ ℝ, y > x', pieces: ['x ∈ ℝ', 'y ∈ ℝ', 'y > x', 'y ≤ x'] },
  { phrase: 'Tout entier naturel n a un entier m plus grand que lui.', target: '∀n ∈ ℕ ∃m ∈ ℕ, m > n', pieces: ['n ∈ ℕ', 'm ∈ ℕ', 'm > n', 'm ≤ n'] },
  { phrase: 'Il existe un entier m plus grand que tous les entiers naturels n.', target: '∃m ∈ ℕ ∀n ∈ ℕ, m > n', pieces: ['n ∈ ℕ', 'm ∈ ℕ', 'm > n', 'm ≤ n'] },
];

function sentenceTokens(level, rng) {
  const q = rng.pick(QSENT);
  const pieces = q.pieces.map((t) => ({ text: t }));
  return tokensItem({
    skill: QREAD, level, prompt: `Écris avec des quantificateurs : « ${q.phrase} »`, pieces, target: q.target,
    hints: [
      { level: 1, html: '« Pour tout » donne ∀, « il existe » donne ∃. Garde l\'ordre de la phrase.' },
      { level: 2, html: `${q.target.slice(0, 1)}…` },
      { level: 3, html: FM(q.target, { pieces }) },
    ],
    baits: ['g9_quant_order'], start: q.target, key: q.target,
    solution: [{ html: FM(q.target, { pieces }), note: '' }],
  });
}

function qreadMcq(rng) {
  const q = rng.pick(QSENT);
  const pieces = q.pieces.map((t) => ({ text: t }));
  const cfg = { pieces };
  const f = P(q.target, cfg);
  const sw = { t: 'q', q: strip(f.body).q, bind: strip(f.body).bind, body: { t: 'q', q: f.q, bind: f.bind, body: strip(f.body).body } };
  return mcq({
    skill: QREAD, level: 4, prompt: `Quelle phrase dit la même chose que ${FM(q.target, cfg)} ?`,
    options: [
      { html: rephrase(f, cfg), correct: true },
      { html: rephrase(sw, cfg), correct: false, rule: 'g9_quant_order' },
      { html: rephrase({ ...f, q: flip(f.q) }, cfg), correct: false },
      { html: rephrase({ ...f, body: { ...strip(f.body), q: flip(strip(f.body).q) } }, cfg), correct: false },
    ].filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i),
    key: `mcq:${q.target}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: q.phrase, note: '' }],
  }, rng);
}

// A formula with two quantifiers read aloud.
function rephrase(f, cfg) {
  const lex = lexFor(cfg);
  const [v1, s1] = f.bind.text.split(' ∈ ');
  const inner = strip(f.body);
  const [v2, s2] = inner.bind.text.split(' ∈ ');
  const set = (s) => (s === 'ℝ' ? 'réel' : 'entier naturel');
  const word = (q, v, s) => (q === '∀' ? `pour tout ${set(s)} ${v}` : `il existe un ${set(s)} ${v}`);
  const body = formulaText(strip(inner.body), lex);
  const a = word(f.q, v1, s1);
  return `${a.charAt(0).toUpperCase()}${a.slice(1)}, ${word(inner.q, v2, s2)}${inner.q === '∃' ? ' tel que' : ','} ${body}.`;
}

function qreadItem(level, rng, opts) {
  if (opts.exam === 'mcq') return qreadMcq(rng);
  if (opts.exam === 'tf') return rng.chance(0.5) ? bankTf(4, rng, opts) : finiteTf(finiteQuant(rng), rng.pick(['ae', 'ea']), 4, rng, opts);
  if (level === 1) return gridTable(rng);
  if (level === 2) {
    const d = finiteQuant(rng);
    return finiteTf(d, rng.pick(['ae', 'ea']), 2, rng);
  }
  if (level === 3) return bankTf(3, rng);
  if (level === 4) return sentenceTokens(4, rng);
  return rng.chance(0.5) ? bankTf(5, rng) : finiteTf(finiteQuant(rng), rng.pick(['ae', 'ea']), 5, rng);
}

// ======================================================================
// g9-quant-write
// ======================================================================

const QWRITE = 'g9-quant-write';

// Definitions: the formula, its pieces, and decoy pieces.
const DEFS = [
  { name: 'f est majorée sur ℝ', target: '∃M ∈ ℝ ∀x ∈ ℝ, f(x) ≤ M', decoys: ['f(x) < M', '∀M ∈ ℝ'] },
  { name: 'f est minorée sur ℝ', target: '∃m ∈ ℝ ∀x ∈ ℝ, f(x) ≥ m', decoys: ['f(x) > m', '∀m ∈ ℝ'] },
  { name: 'f est bornée sur ℝ', target: '∃M ∈ ℝ ∀x ∈ ℝ, |f(x)| ≤ M', decoys: ['f(x) ≤ M', '|f(x)| < M'] },
  { name: 'f est croissante sur I', target: '∀x, y ∈ I, x < y ⇒ f(x) ≤ f(y)', decoys: ['f(x) ≥ f(y)', 'x ≤ y'] },
  { name: 'f est décroissante sur I', target: '∀x, y ∈ I, x < y ⇒ f(x) ≥ f(y)', decoys: ['f(x) ≤ f(y)', 'x ≤ y'] },
  { name: 'f est injective sur I', target: '∀x, y ∈ I, f(x) = f(y) ⇒ x = y', decoys: ['f(x) ≠ f(y)', 'x ≠ y'] },
  { name: 'f est paire', target: '∀x ∈ ℝ, f(-x) = f(x)', decoys: ['f(-x) = -f(x)', '∃x ∈ ℝ'] },
  { name: 'f est périodique', target: '∃T > 0 ∀x ∈ ℝ, f(x + T) = f(x)', decoys: ['∀T > 0', 'T ≥ 0'] },
  { name: 'A ⊂ B', target: '∀x ∈ A, x ∈ B', decoys: ['∃x ∈ A', 'x ∉ B'] },
  { name: 'A = B (dans E)', target: '∀x ∈ E, x ∈ A ⇔ x ∈ B', decoys: ['x ∈ A ⇒ x ∈ B', '∃x ∈ E'] },
  { name: '(uₙ) converge vers L', target: '∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |u_n − L| < ε', decoys: ['|u_n − L| ≤ ε', '∀N ∈ ℕ', 'ε ≥ 0'] },
];

// Pieces of a definition: binds and atoms as written in the target.
function defPieces(D, decoys) {
  const texts = [];
  const add = (t) => { if (!texts.includes(t)) texts.push(t); };
  const { binds, body } = splitQ(D.target);
  for (const b of binds) add(b);
  for (const part of body.split(/\s*[⇒⇔]\s*/)) add(part.trim());
  if (decoys) for (const d of D.decoys) for (const part of d.split(/\s*[⇒⇔]\s*/)) add(part.replace(/^[∀∃]/, '').trim());
  return texts.map((t) => ({ text: t }));
}

function defTokens(level, rng, opts = {}) {
  const D = level === 5 ? DEFS[DEFS.length - 1] : opts.exam === 'open' ? DEFS[5] : rng.pick(DEFS);
  const pieces = defPieces(D, level >= 4 || !!opts.exam);
  const cfg = { pieces };
  return tokensItem({
    skill: QWRITE, level, prompt: `Écris avec des quantificateurs : « ${D.name} ».`, pieces, target: D.target,
    hints: [
      { level: 1, html: 'Qui est choisi en premier ? Une borne, un seuil (∃) vient avant les x (∀) qu\'elle contrôle.' },
      { level: 2, html: `${D.target.split(',')[0]}, …` },
      { level: 3, html: FM(D.target, cfg) },
    ],
    noHints: level === 5 || !!opts.exam, baits: ['g9_quant_order'], start: D.target, key: `${D.name}:${level}`,
    solution: [{ html: FM(D.target, cfg), note: D.name }],
    exam: opts.exam ? { format: opts.exam, points: 1 } : false,
  });
}

// The definition cut in blocks: quantifiers in order, then the property.
function defBlocks(level, rng) {
  const D = rng.pick(DEFS.filter((d) => /[∀∃].*[∀∃]/.test(d.target)));
  const { binds, body } = splitQ(D.target);
  const parts = binds.map((b, i) => `${[...D.target.replace(PAIR, '§').matchAll(/[∀∃]/g)][i][0]}${b}`);
  const cfg = { pieces: defPieces(D, true) };
  const blocks = parts.map((p, i) => ({
    id: `q${i}`, html: `<span class="blk-math">${p}</span>`, needs: i ? [`q${i - 1}`] : [],
    orderRule: i ? 'g9_quant_order' : null, earlyWhy: i ? `Pas encore : « ${p} » dépend de ce qui est choisi avant.` : undefined,
  }));
  blocks.push({ id: 'body', html: `<span class="blk-math">, ${body}</span>`, needs: [`q${parts.length - 1}`], earlyWhy: 'Place d\'abord tous les quantificateurs.' });
  blocks[0].earlyWhy = undefined;
  // The first block must come first: the others need it.
  const decoy = D.decoys.find((x) => /^[∀∃]/.test(x)) ?? D.decoys[0];
  blocks.push({ id: 'd1', html: `<span class="blk-math">${/^[∀∃]/.test(decoy) ? decoy : `, ${decoy}`}</span>`, needs: [], distractor: /^[∀∃]/.test(decoy) ? 'g9_quant_order' : 'g9_neg_strict', why: 'Ce morceau ne donne pas la bonne définition.' });
  return blocksItem({
    skill: QWRITE, level, mode: 'define', prompt: `Construis la définition : « ${D.name} ». Touche les morceaux dans l'ordre.`,
    blocks: rng.shuffle(blocks), goal: 'body', order: [...parts.map((_, i) => `q${i}`), 'body'],
    hints: [
      { level: 1, html: 'Qui est choisi en premier : la borne ou x ?' },
      { level: 2, html: `${parts[0]} …` },
      { level: 3, html: FM(D.target, cfg) },
    ],
    key: D.name,
  });
}

function defMcq(rng, level = 4, exam = { format: 'mcq', points: 1 }) {
  const D = rng.pick(DEFS.filter((d) => /[∀∃].*[∀∃]/.test(d.target)));
  const pieces = defPieces(D, true);
  const cfg = { pieces };
  const f = P(D.target, cfg);
  const inner = strip(f.body);
  const swapped = inner.t === 'q' ? { t: 'q', q: inner.q, bind: inner.bind, body: { t: 'q', q: f.q, bind: f.bind, body: inner.body } } : null;
  const options = [{ html: FM(D.target, cfg), correct: true }];
  if (swapped) options.push({ html: FM(fText(swapped, cfg), cfg), correct: false, rule: 'g9_quant_order' });
  // A decoy property that reads like the right one (same left side).
  const { body } = splitQ(D.target);
  const parts = body.split(/\s*[⇒⇔]\s*/);
  const last = parts[parts.length - 1];
  const lhs = (t) => t.split(/[<>=≤≥≠∈∉]/)[0].trim();
  const decoyBody = D.decoys.find((x) => !/^[∀∃]/.test(x) && lhs(x) === lhs(last));
  if (decoyBody) options.push({ html: FM(D.target.replace(last, decoyBody), cfg), correct: false });
  options.push({ html: FM(fText({ ...f, q: flip(f.q) }, cfg), cfg), correct: false });
  return mcq({
    skill: QWRITE, level, prompt: `Quelle formule dit « ${D.name} » ?`, options: options.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i),
    key: `mcq:${D.name}`, exam, solution: [{ html: FM(D.target, cfg), note: D.name }],
  }, rng);
}

function qwriteItem(level, rng, opts) {
  if (opts.exam === 'mcq') return defMcq(rng);
  if (opts.exam === 'open') return defTokens(4, rng, opts);
  if (level === 1) return defMcq(rng, 1, false);
  if (level === 2) return defBlocks(2, rng);
  return defTokens(level, rng);
}

// ======================================================================
// g9-negate
// ======================================================================

const NEGATE = 'g9-negate';

// Statements to negate: pieces, explicit negation pairs.
function negBank(rng) {
  const a = rng.int(1, 5);
  const L = rng.pick([1, 2, 3, -1, -2]);
  const uL = L > 0 ? `|u_n − ${L}|` : `|u_n + ${-L}|`;
  const c = rng.int(6, 14);
  return [
    { id: 'cont', q: 3, imp: true, name: `f est continue en ${a}`, S: `∀ε > 0 ∃δ > 0 ∀x ∈ ℝ, |x − ${a}| < δ ⇒ |f(x) − f(${a})| < ε` },
    { id: 'lim', q: 3, imp: false, name: `(uₙ) tend vers ${L}`, S: `∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, ${uL} < ε` },
    { id: 'maj', q: 2, imp: false, name: 'f est majorée', S: '∃M ∈ ℝ ∀x ∈ ℝ, f(x) ≤ M' },
    { id: 'crois', q: 1, imp: true, name: 'f est croissante sur I', S: '∀x, y ∈ I, x < y ⇒ f(x) ≤ f(y)' },
    { id: 'fin1', q: 2, imp: false, name: 'A = {1 ; 2 ; 3}', S: `∀x ∈ A ∃y ∈ A, x² + y < ${c}` },
    { id: 'fin2', q: 2, imp: false, name: 'A = {1 ; 2 ; 3}', S: `∃y ∈ A ∀x ∈ A, x + 2y < ${Math.min(c, 9)}` },
    { id: 'sq', q: 1, imp: false, name: '', S: `∀x ∈ ℝ, x² ≥ ${a}` },
    { id: 'par', q: 1, imp: false, name: '', S: '∀n ∈ ℕ, n² + n est pair', explicit: [{ text: 'n² + n est pair', neg: 'n² + n est impair' }] },
    { id: 'inj', q: 1, imp: true, name: 'f est injective sur I', S: '∀x, y ∈ I, f(x) = f(y) ⇒ x = y' },
    { id: 'nonmaj', q: 2, imp: false, name: 'f n\'est pas majorée', S: '∀M ∈ ℝ ∃x ∈ ℝ, f(x) > M' },
  ];
}

// The pieces of a statement: binds and atoms as written, with negations
// and decoys.
function negPieces(B, decoys) {
  const { binds, body } = splitQ(B.S);
  const atoms = body.split(/\s*[⇒⇔∧∨]\s*/).map((t) => B.explicit?.find((p) => p.text === t) ?? { text: t });
  const palette = paletteOf(atoms, binds, { decoys });
  return { palette, pieces: piecesOf(palette, B.explicit || []) };
}

const NEG_SUB = [
  { id: 'cross', label: 'franchir les quantificateurs', skill: NEGATE },
  { id: 'imp', label: 'nier l\'implication', skill: 'g9-implication' },
];

function negLines(level, rng, opts = {}) {
  const bank = negBank(rng);
  const pool = level === 3 ? bank.filter((b) => b.q >= 2) : bank.filter((b) => b.imp || b.q === 3);
  const B = rng.pick(pool);
  const { pieces } = negPieces(B, true);
  const cfg = { pieces };
  const lex = lexFor(cfg);
  const start = `¬(${B.S})`;
  const steps = negSteps(P(start, cfg), lex, { merge: true });
  let prev = P(start, cfg);
  const script = steps.map((g) => {
    const note = stepNote(prev);
    prev = g;
    return { kind: 'eq', math: fText(g, cfg), note, subgoal: /implication/.test(note) ? 'imp' : 'cross' };
  });
  return linesItem({
    skill: NEGATE, level, prompt: `Écris la négation de ${FM(B.S, cfg)}${B.name ? ` (« ${B.name} »)` : ''} : fais entrer ¬, un symbole par ligne.`,
    start, judge: { kind: 'logic', pieces }, mode: level === 3 ? 'tap' : 'free', script,
    hints: [
      { level: 1, html: 'Un symbole à la fois, de gauche à droite : ∀ devient ∃, ∃ devient ∀, la restriction (ε > 0) reste, et la propriété à la fin est niée.' },
      { level: 2, html: `Première ligne : ${FM(script[0].math, cfg)}` },
      { level: 3, html: FM(script[script.length - 1].math, cfg) },
    ],
    subgoals: NEG_SUB, keys: ['logic'], tapActions: level === 3 ? 'logic' : null,
    key: `${NEGATE}:${B.S}`, exam: opts.exam ? { format: opts.exam, points: 2 } : false,
  });
}

function negTokens(level, rng) {
  const bank = negBank(rng);
  const B = rng.pick(bank.filter((b) => b.q <= 2));
  const { palette, pieces } = negPieces(B, true);
  const cfg = { pieces };
  const target = fText(nnf(P(`¬(${B.S})`, cfg)), cfg);
  return tokensItem({
    skill: NEGATE, level, prompt: `Écris la négation de ${FM(B.S, cfg)}.`, pieces, palette, target, start: `¬(${B.S})`,
    hints: [
      { level: 1, html: 'Chaque ∀ devient ∃, chaque ∃ devient ∀, et la propriété à la fin est niée.' },
      { level: 2, html: `${target.split(',')[0]}, …` },
      { level: 3, html: FM(target, cfg) },
    ],
    baits: ['g9_neg_one_quant', 'g9_neg_pred_kept', 'g9_neg_strict'], key: B.S,
    solution: [{ html: FM(target, cfg), note: 'Négation' }],
  });
}

// Level 1: the ¬ has crossed the first quantifier; which line comes next?
function negNextMcq(rng, level = 1, exam = false) {
  const B = rng.pick(negBank(rng).filter((b) => b.q >= 2));
  const { pieces } = negPieces(B, true);
  const cfg = { pieces };
  const lex = lexFor(cfg);
  const f0 = P(`¬(${B.S})`, cfg);
  const s1 = negStep(f0, lex);
  const s2 = negStep(s1, lex);
  const options = [{ html: FM(fText(s2, cfg), cfg), correct: true }];
  const seen = [s2];
  for (const t of rng.shuffle(trapAnswers('logic', s1, { kind: 'logic', pieces }))) {
    if (options.length >= 4) break;
    if (seen.some((x) => equivalentLogic(x, t.node))) continue;
    seen.push(t.node);
    options.push({ html: FM(fText(t.node, cfg), cfg), correct: false, rule: t.rule });
  }
  return mcq({
    skill: NEGATE, level, prompt: `On nie ${FM(B.S, cfg)}. Première ligne : ${FM(fText(s1, cfg), cfg)}. Quelle est la ligne suivante ?`,
    options, key: `next:${B.S}`, exam, solution: [{ html: FM(fText(s2, cfg), cfg), note: 'Franchir le quantificateur suivant' }],
  }, rng);
}

function negMcq(rng) {
  const B = rng.pick(negBank(rng).filter((b) => b.q >= 2 || b.imp));
  const { pieces } = negPieces(B, true);
  const cfg = { pieces };
  const f0 = P(`¬(${B.S})`, cfg);
  const right = nnf(f0);
  const options = [{ html: FM(fText(right, cfg), cfg), correct: true }];
  const seen = [right];
  for (const t of rng.shuffle(trapAnswers('logic', f0, { kind: 'logic', pieces }))) {
    if (options.length >= 4) break;
    const g = nnf(t.node);
    if (seen.some((x) => equivalentLogic(x, g))) continue;
    seen.push(g);
    options.push({ html: FM(fText(g, cfg), cfg), correct: false, rule: t.rule });
  }
  return mcq({
    skill: NEGATE, level: 4, prompt: `Quelle est la négation de ${FM(B.S, cfg)} ?`, options, key: `mcq:${B.S}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: FM(fText(right, cfg), cfg), note: 'Négation' }],
  }, rng);
}

function negateItem(level, rng, opts) {
  if (opts.exam === 'mcq') return negMcq(rng);
  if (opts.exam === 'open') return negLines(5, rng, opts);
  if (level === 1) return negNextMcq(rng);
  if (level === 2) return negTokens(2, rng);
  return negLines(level, rng);
}

// ======================================================================
// g9-counterexample
// ======================================================================

const COUNTER = 'g9-counterexample';

function counterBank(rng) {
  const a = rng.int(1, 5);
  const k = rng.pick([11, 17, 41]);
  return [
    { s: '∀x ∈ ℝ, x² ≥ x', truth: false, quants: [['∀', 'x', 'R']], pred: 'x^2≥x', answer: { x: '1/2' }, why: 'x = 1/2 donne 1/4 < 1/2.' },
    { s: '∀x ∈ ℝ, √(x²) = x', truth: false, quants: [['∀', 'x', 'R']], pred: '√(x^2)=x', answer: { x: '-1' }, why: 'x = −1 donne √1 = 1 ≠ −1.' },
    { s: '∀a, b ∈ ℝ, (a + b)² = a² + b²', truth: false, quants: [['∀', 'a', 'R'], ['∀', 'b', 'R']], pred: '(a+b)^2=a^2+b^2', answer: { a: '1', b: '1' }, why: 'a = b = 1 : 4 ≠ 2.' },
    { s: '∀x > 0, 1/x < 1', truth: false, quants: [['∀', 'x', 'R+']], pred: '1/x<1', answer: { x: '1/2' }, why: 'x = 1/2 donne 2, qui n\'est pas < 1.' },
    { s: `∀n ∈ ℕ, n² + n + ${k} est premier`, truth: false, composite: { expr: `n^2+n+${k}`, v: 'n' }, answer: { n: String(k - 1) }, why: `n = ${k - 1} donne ${k}², qui n'est pas premier.`, rule: 'g9_proof_by_example' },
    { s: `∀x ∈ ℝ, x² > ${a * a} ⇒ x > ${a}`, truth: false, quants: [['∀', 'x', 'R']], pred: `x^2>${a * a}⇒x>${a}`, hyp: `x^2>${a * a}`, answer: { x: String(-a - 1) }, why: `x = ${-a - 1} : x² = ${(a + 1) ** 2} > ${a * a}, mais x ≤ ${a}.`, imp: true },
    { s: '∀x ∈ ℝ, x² ≥ x ⇒ x ≥ 1', truth: false, quants: [['∀', 'x', 'R']], pred: 'x^2≥x⇒x≥1', hyp: 'x^2≥x', answer: { x: '-1' }, why: 'x = −1 : 1 ≥ −1, mais −1 < 1.', imp: true },
    { s: `∀x ∈ ℝ, x < ${a} ⇒ x² < ${a * a}`, truth: false, quants: [['∀', 'x', 'R']], pred: `x<${a}⇒x^2<${a * a}`, hyp: `x<${a}`, answer: { x: String(-a - 1) }, why: `x = ${-a - 1} < ${a}, mais x² = ${(a + 1) ** 2} ≥ ${a * a}.`, imp: true },
    { s: '∀x ∈ ℝ, x² ≥ 0', truth: true, why: 'Vrai : un carré est toujours positif ou nul.' },
    { s: '∀x ∈ ℝ, |x| ≥ x', truth: true, why: 'Vrai : |x| = x si x ≥ 0, et |x| > 0 > x sinon.' },
    { s: '∀a, b ∈ ℝ, (a + b)² = a² + 2ab + b²', truth: true, why: 'Vrai : c\'est une identité remarquable.' },
    { s: `∀x ∈ ℝ, x > ${a} ⇒ x² > ${a * a}`, truth: true, why: `Vrai : si x > ${a} > 0, alors x² > ${a * a}.`, imp: true },
    { s: '∀x ∈ ℝ, x² + 1 > 0', truth: true, why: 'Vrai : x² + 1 ≥ 1.' },
  ];
}

const SETS_COUNTER = [
  { s: 'Pour tous ensembles A, B : A ∪ B = A ⇒ B = ∅', pred: 'A∪B=A⇒B=∅', hyp: 'A∪B=A', answer: { A: '{1}', B: '{1}' }, why: 'A = B = {1} : A ∪ B = A, mais B ≠ ∅.' },
  { s: 'Pour tous ensembles A, B : (A ∪ B) ∖ B = A', pred: '(A∪B)∖B=A', answer: { A: '{1}', B: '{1}' }, why: 'A = B = {1} : (A ∪ B) ∖ B = ∅ ≠ A.' },
  { s: 'Pour tous ensembles A, B : A ∖ B = B ∖ A', pred: 'A∖B=B∖A', answer: { A: '{1}', B: '∅' }, why: 'A = {1}, B = ∅ : A ∖ B = {1}, B ∖ A = ∅.' },
];

function counterOf(c) {
  if (c.composite) return { kind: 'composite', ...c.composite, ask: [{ v: 'n', label: 'n =' }], answer: c.answer };
  return {
    kind: 'refute', quants: c.quants.map(([q, v, dom]) => ({ q, v, dom })), pred: c.pred, hyp: c.hyp,
    ask: Object.keys(c.answer).map((v) => ({ v, label: `${v} =`, keys: c.quants.find((x) => x[1] === v)?.[2] === 'sets' ? ['set'] : ['calc'] })), answer: c.answer,
  };
}

function counterTf(level, rng, opts = {}) {
  let c;
  if (level === 4 && !opts.exam) {
    const s = rng.pick(SETS_COUNTER);
    c = { ...s, truth: false, quants: [['∀', 'A', 'sets'], ['∀', 'B', 'sets']] };
  } else {
    const bank = counterBank(rng);
    const pool = level === 2 ? bank.filter((x) => !x.truth && !x.imp) : level === 3 ? bank.filter((x) => x.imp) : bank;
    c = rng.pick(pool);
  }
  return tfItem({
    skill: COUNTER, level, statement: esc(c.s), truth: c.truth, decided: level === 2,
    counter: c.truth ? null : counterOf(c),
    ruleIfTrue: c.truth ? null : c.rule ?? 'g9_proof_by_example',
    hints: [
      { level: 1, html: c.imp ? 'Cherche un x qui vérifie l\'hypothèse mais pas la conclusion.' : 'Un seul exemple qui ne marche pas suffit à montrer qu\'un « pour tout » est faux.' },
      { level: 2, html: c.truth ? 'Essaie quelques valeurs : trouves-tu un exemple qui ne marche pas ?' : 'Essaie une valeur négative, ou entre 0 et 1.' },
      { level: 3, html: c.truth ? esc(c.why) : `${Object.entries(c.answer).map(([v, t]) => `${v} = ${fr(t)}`).join(', ')}` },
    ],
    noHints: level === 5 || !!opts.exam,
    explanation: esc(c.truth ? c.why : `Faux : ${c.why}`), key: `${c.s}:${level}`,
    exam: opts.exam ? { format: opts.exam, points: 1 } : false,
  });
}

function counterMcq(rng, level = 1, exam = false) {
  const a = rng.int(2, 5);
  const right = rng.pick([-a - 1, -a - 2]);
  const notHyp = rng.pick([0, 1, a - 1].filter((x) => x * x <= a * a));
  const holds = a + 1;
  const options = [
    { html: `x = ${fr(right)}`, correct: true },
    { html: `x = ${fr(notHyp)}`, correct: false, rule: 'g9_counter_not_hyp' },
    { html: `x = ${holds}`, correct: false },
    { html: `x = ${fr(-a)}`, correct: false, rule: 'g9_counter_not_hyp' },
  ].filter((o, i, all) => all.findIndex((x) => x.html === o.html) === i);
  return mcq({
    skill: COUNTER, level, prompt: `Lequel est un contre-exemple à « ∀x ∈ ℝ, x² > ${a * a} ⇒ x > ${a} » ?`, options, key: `mcq:${a}:${right}`, exam,
    solution: [{ html: `x = ${fr(right)} : x² = ${right * right} > ${a * a}, mais x ≤ ${a}. Avec x = ${fr(notHyp)}, l'hypothèse est fausse.`, note: '' }],
  }, rng);
}

function counterItem(level, rng, opts) {
  if (opts.exam === 'mcq') return counterMcq(rng, 4, { format: 'mcq', points: 1 });
  if (opts.exam === 'tf') return counterTf(4, rng, opts);
  if (level === 1) return counterMcq(rng, 1);
  return counterTf(level, rng);
}

// ======================================================================
// g9-proof-contra and g9-proof-absurd: blocks
// ======================================================================

const CONTRA = 'g9-proof-contra';
const ABSURD = 'g9-proof-absurd';

// Proofs: blocks in order (each needs the previous one), decoys, an input
// for the frame mode, a decision for level 3.
function contraProofs(rng) {
  const p = rng.pick([2, 3]);
  return [
    p === 2 ? {
      id: 'pair', statement: 'si n² est pair, alors n est pair (n ∈ ℤ)',
      steps: [
        'Montrons la contraposée : si n est impair, alors n² est impair.',
        'Soit n impair : n = 2k + 1, avec k ∈ ℤ.',
        'n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1.',
        'Donc n² est impair.',
        'La contraposée est vraie, donc l\'énoncé l\'est aussi.',
      ],
      input: { at: 2, kind: 'expr', vars: ['k'], expect: '(2k+1)^2', mod: 2, rem: 1, ask: 'n² = (2k + 1)² =', answer: '2(2k^2+2k)+1' },
      decoys: [
        { html: '2² = 4 et 4² = 16 sont pairs, donc c\'est vrai.', rule: 'g9_proof_by_example', why: 'Des exemples ne prouvent pas un « pour tout ».' },
        { html: 'Soit n pair : n = 2k, donc n² = 4k² est pair.', rule: 'g9_converse_contra', why: 'Tu prouves la réciproque (n pair ⇒ n² pair), pas l\'énoncé.' },
      ],
    } : {
      id: 'mult3', statement: 'si n² est multiple de 3, alors n est multiple de 3 (n ∈ ℤ)',
      steps: [
        'Montrons la contraposée : si n n\'est pas multiple de 3, alors n² n\'est pas multiple de 3.',
        'n n\'est pas multiple de 3 : n = 3k + 1 ou n = 3k + 2, avec k ∈ ℤ.',
        'Si n = 3k + 1 : n² = 9k² + 6k + 1 = 3(3k² + 2k) + 1.',
        'Si n = 3k + 2 : n² = 9k² + 12k + 4 = 3(3k² + 4k + 1) + 1.',
        'Dans les deux cas, n² = 3m + 1 : n² n\'est pas multiple de 3.',
        'La contraposée est vraie, donc l\'énoncé l\'est aussi.',
      ],
      input: { at: 2, kind: 'expr', vars: ['k'], expect: '(3k+1)^2', mod: 3, rem: 1, ask: 'n² = (3k + 1)² =', answer: '3(3k^2+2k)+1' },
      decoys: [
        { html: '3² = 9 et 6² = 36 sont multiples de 3, donc c\'est vrai.', rule: 'g9_proof_by_example', why: 'Des exemples ne prouvent pas un « pour tout ».' },
        { html: 'Soit n = 3k : n² = 9k² est multiple de 3.', rule: 'g9_converse_contra', why: 'Tu prouves la réciproque, pas l\'énoncé.' },
      ],
    },
    {
      id: 'sum', statement: 'si n + m est impair, alors n ou m est pair (n, m ∈ ℤ)',
      steps: [
        'Montrons la contraposée : si n et m sont impairs, alors n + m est pair.',
        'Soit n = 2k + 1 et m = 2l + 1, avec k, l ∈ ℤ.',
        'n + m = 2k + 2l + 2 = 2(k + l + 1).',
        'Donc n + m est pair.',
        'La contraposée est vraie, donc l\'énoncé l\'est aussi.',
      ],
      input: { at: 2, kind: 'expr', vars: ['k', 'l'], expect: '(2k+1)+(2l+1)', mod: 2, rem: 0, ask: 'n + m = (2k + 1) + (2l + 1) =', answer: '2(k+l+1)' },
      decoys: [
        { html: '3 + 4 = 7 est impair et 4 est pair, donc c\'est vrai.', rule: 'g9_proof_by_example', why: 'Un exemple ne prouve pas un « pour tout ».' },
        { html: 'Soit n pair : alors n + m a la parité de m.', rule: 'g9_converse_contra', why: 'Tu supposes la conclusion au lieu de sa négation.' },
      ],
    },
    {
      id: 'abs', statement: 'si x² < 1, alors |x| < 1 (x ∈ ℝ)',
      steps: [
        'Montrons la contraposée : si |x| ≥ 1, alors x² ≥ 1.',
        'Soit x avec |x| ≥ 1.',
        'x² = |x|² ≥ 1² = 1, car t ↦ t² est croissante sur [0 ; +∞[.',
        'Donc x² ≥ 1.',
        'La contraposée est vraie, donc l\'énoncé l\'est aussi.',
      ],
      decoys: [
        { html: 'x = 1/2 donne x² = 1/4 < 1 et |x| < 1, donc c\'est vrai.', rule: 'g9_proof_by_example', why: 'Un exemple ne prouve pas un « pour tout ».' },
        { html: 'Soit |x| < 1 : alors x² < 1.', rule: 'g9_converse_contra', why: 'Tu prouves la réciproque, pas l\'énoncé.' },
      ],
    },
  ];
}

function absurdProofs(rng) {
  const p = rng.pick([2, 3, 5, 7]);
  return [
    {
      id: `sqrt${p}`, statement: `√${p} est irrationnel`,
      steps: [
        `Supposons √${p} = a/b, avec a, b ∈ ℕ* et pgcd(a, b) = 1.`,
        `Alors a² = ${p}b².`,
        `${p} divise a², et ${p} est premier, donc ${p} divise a : a = ${p}c.`,
        `${p * p}c² = ${p}b², donc b² = ${p}c², donc ${p} divise b.`,
        `${p} divise a et b : contradiction avec pgcd(a, b) = 1.`,
        `Donc √${p} est irrationnel.`,
      ],
      input: { at: 1, kind: 'rel', vars: ['a', 'b'], expect: `a^2=${p}b^2`, ask: `En élevant √${p} = a/b au carré :`, answer: `a^2=${p}b^2` },
      decoys: [
        { html: `Supposons √${p} irrationnel.`, rule: 'g9_absurd_wrong_assumption', why: 'Par l\'absurde, on suppose le contraire de ce qu\'on veut montrer.' },
        { html: `√${p} ≈ ${Math.sqrt(p).toFixed(4).replace('.', ',')}… n'a pas de période visible, donc il est irrationnel.`, rule: 'g9_proof_by_example', why: 'Quelques décimales ne prouvent rien.' },
      ],
    },
    {
      id: 'maxint', statement: 'il n\'existe pas de plus grand entier',
      steps: [
        'Supposons qu\'il existe un plus grand entier N.',
        'Alors N + 1 est aussi un entier.',
        'N + 1 > N : N n\'est pas le plus grand, contradiction.',
        'Donc il n\'existe pas de plus grand entier.',
      ],
      decoys: [
        { html: 'Supposons qu\'il n\'existe pas de plus grand entier.', rule: 'g9_absurd_wrong_assumption', why: 'Par l\'absurde, on suppose le contraire de ce qu\'on veut montrer.' },
        { html: '10, 100 et 1000 ont tous un entier plus grand, donc c\'est vrai.', rule: 'g9_proof_by_example', why: 'Des exemples ne prouvent pas un « pour tout ».' },
      ],
    },
    {
      id: 'log23', statement: 'log₂ 3 est irrationnel',
      steps: [
        'Supposons log₂ 3 = a/b, avec a, b ∈ ℕ*.',
        'Alors 2^(a/b) = 3, donc 2^a = 3^b.',
        '2^a est pair et 3^b est impair : contradiction.',
        'Donc log₂ 3 est irrationnel.',
      ],
      decoys: [
        { html: 'Supposons log₂ 3 irrationnel.', rule: 'g9_absurd_wrong_assumption', why: 'Par l\'absurde, on suppose le contraire de ce qu\'on veut montrer.' },
        { html: 'log₂ 3 ≈ 1,585 n\'est pas une fraction simple, donc il est irrationnel.', rule: 'g9_proof_by_example', why: 'Une valeur approchée ne prouve rien.' },
      ],
    },
  ];
}

const DECISIONS = {
  [CONTRA]: (pr) => ({
    prompt: 'Preuve directe ou par contraposée ?',
    options: [
      { id: 'contra', label: 'Par contraposée', valid: true },
      { id: 'direct', label: 'Preuve directe', valid: true, quality: 'poor', why: pr.id === 'abs' ? 'Possible, mais la contraposée donne un calcul plus simple.' : 'En partant de l\'hypothèse, on ne sait pas écrire n : la contraposée donne n = 2k + 1, une écriture utile.' },
    ],
  }),
  [ABSURD]: () => ({
    prompt: 'Que suppose-t-on ?',
    options: [
      { id: 'neg', label: 'La négation de l\'énoncé', valid: true },
      { id: 'stmt', label: 'L\'énoncé lui-même', valid: false, rule: 'g9_absurd_wrong_assumption', why: 'Par l\'absurde, on suppose le contraire de ce qu\'on veut montrer.' },
      { id: 'conv', label: 'La réciproque', valid: false, why: 'La réciproque n\'a rien à voir ici : on suppose la négation.' },
      { id: 'ex', label: 'Un exemple', valid: false, rule: 'g9_proof_by_example', why: 'Un exemple ne prouve rien.' },
    ],
  }),
};

function proofBlocks(skill, level, rng, opts = {}) {
  const bank = skill === CONTRA ? contraProofs(rng) : absurdProofs(rng);
  const withInput = level >= 4 || !!opts.exam;
  const pool = withInput ? bank.filter((b) => b.input) : bank;
  const pr = rng.pick(pool);
  if (level === 1) return proofHoleMcq(skill, pr, rng);
  const blocks = pr.steps.map((h, i) => ({ id: `b${i}`, html: esc(h), needs: i ? [`b${i - 1}`] : [] }));
  if (withInput && pr.input) blocks[pr.input.at].input = { ...pr.input };
  const nDecoys = level === 2 ? 1 : 2;
  pr.decoys.slice(0, nDecoys).forEach((d, i) => blocks.push({ id: `d${i}`, html: esc(d.html), needs: [], distractor: d.rule, why: d.why }));
  return blocksItem({
    skill, level, mode: withInput ? 'frame' : 'order',
    prompt: `Montre que ${esc(pr.statement)}. Touche les blocs dans l'ordre de la preuve.`,
    blocks: rng.shuffle(blocks), goal: `b${pr.steps.length - 1}`, order: pr.steps.map((_, i) => `b${i}`),
    decision: level >= 3 ? DECISIONS[skill](pr) : null,
    hints: [
      { level: 1, html: skill === CONTRA ? 'Essaie la contraposée : que veut dire la conclusion niée, en formule ?' : 'Suppose le contraire de ce qu\'on veut montrer.' },
      { level: 2, html: esc(pr.steps[1]) },
      { level: 3, html: esc(pr.steps[pr.input?.at ?? 2]) },
    ],
    noHints: level === 5 || !!opts.exam,
    key: `${pr.id}:${level}`, exam: opts.exam ? { format: opts.exam, points: 3 } : false,
    subgoals: skill === CONTRA && pr.input ? [{ id: 'calc', label: 'calculer', skill: 'lit-identities' }] : [],
  });
}

// Level 1: the proof with one block missing, two choices.
function proofHoleMcq(skill, pr, rng) {
  const k = rng.int(1, pr.steps.length - 2);
  const shown = pr.steps.map((s, i) => (i === k ? '<b>…</b>' : esc(s))).map((s) => `<div class="proof-line">${s}</div>`).join('');
  const d = rng.pick(pr.decoys);
  return mcq({
    skill, level: 1, prompt: `Preuve : ${esc(pr.statement)}.${shown}Quel bloc manque ?`,
    options: [{ html: esc(pr.steps[k]), correct: true }, { html: esc(d.html), correct: false, rule: d.rule }],
    key: `hole:${pr.id}:${k}`, solution: pr.steps.map((s) => ({ html: esc(s), note: '' })),
  }, rng);
}

// ======================================================================

export const GEN = {
  [SETS]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return setsMcq(rng);
    if (opts.exam === 'tf') return setsTf(rng);
    return setsItem(level, rng, opts);
  },
  [INTER]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return bracketMcq(rng, 4, { format: 'mcq', points: 1 });
    if (opts.exam === 'tf') return interTf(rng);
    return interItem(level, rng, opts);
  },
  [CONN]: (level, rng, profile, opts = {}) => connItem(level, rng, opts),
  [IMPL]: (level, rng, profile, opts = {}) => implItem(level, rng, opts),
  [QREAD]: (level, rng, profile, opts = {}) => qreadItem(level, rng, opts),
  [QWRITE]: (level, rng, profile, opts = {}) => qwriteItem(level, rng, opts),
  [NEGATE]: (level, rng, profile, opts = {}) => negateItem(level, rng, opts),
  [COUNTER]: (level, rng, profile, opts = {}) => counterItem(level, rng, opts),
  [CONTRA]: (level, rng, profile, opts = {}) => proofBlocks(CONTRA, opts.exam ? 4 : level, rng, opts),
  [ABSURD]: (level, rng, profile, opts = {}) => proofBlocks(ABSURD, opts.exam ? 4 : level, rng, opts),
};

// Item constructors shared by the university generators (spec §6): lines,
// multiple choice, true/false with a counter-example, tokens, blocks and
// tables. Each fills the common fields (key, baits, solution, hints,
// expectedSec, exam) the same way.

import { parse } from '../../cas/parse.js';
import { toMathML } from '../../cas/mathml.js';
import { lexFor, parseFormula, formulaML } from '../../cas/logic.js';
import { trapAnswers } from '../../judges/diagnose.js';
import { readWith, showWith } from '../../judges/index.js';
import { segmentsOf } from '../../judges/lines.js';
import { mcqItem } from '../items.js';

export const MM = (node, display = false) => toMathML(node, { display: display ? 'block' : 'inline' });
export const MT = (text, opts = {}, display = false) => MM(parse(text, opts), display);
export const FM = (text, cfg, display = false) => formulaML(parseFormula(text, lexFor(cfg)), lexFor(cfg), { display });
export const fr = (x) => String(x).replace(/-/g, '−');

export const examTag = (opts, points = 1) => (opts?.exam ? { format: opts.exam, points } : false);

// The reference solution of a lines item, line by line.
function linesSolution(item) {
  const out = [];
  segmentsOf(item).forEach((seg, k) => {
    if (k > 0 && seg.html) out.push({ html: `<b>${seg.html}</b>`, note: '' });
    out.push({ html: showWith(seg.judge, readWith(seg.judge, seg.start.math)), note: k === 0 ? 'Départ' : '' });
    for (const l of seg.lines) {
      if (l.kind === 'eq') out.push({ html: `<span class="eq">${seg.judge.kind === 'equiv' || seg.judge.kind === 'value' ? '=' : '→'}</span> ${showWith(seg.judge, readWith(seg.judge, l.math))}`, note: l.note || '' });
      if (l.kind === 'note') out.push({ html: l.html, note: '' });
    }
  });
  return out;
}

export function linesItem(o) {
  const level = o.level;
  const exam = o.exam || false;
  const noHints = o.noHints ?? (level >= 5 || !!exam);
  const startNode = readWith(o.judge, o.start);
  const item = {
    skill: o.skill, level, type: 'lines', prompt: o.prompt,
    start: { math: o.start },
    judge: o.judge,
    declares: o.declares || { vars: o.judge.vars || [o.judge.v || 'x'] },
    mode: o.mode,
    script: o.script,
    final: o.final || { form: 'any' },
    followError: o.followError ?? (!exam && (level === 3 || level === 4)),
    hints: noHints ? [] : o.hints,
    noHints,
    subgoals: o.subgoals || [],
    tapActions: o.tapActions || null,
    keys: o.keys || ['calc'],
    expectedSec: o.expectedSec || 30 + 30 * o.script.filter((l) => l.kind === 'eq').length,
    key: o.key,
    exam,
    fallback: !!o.fallback,
  };
  // Baits: the traps that replay on the first line, and the traps named by
  // the decision options.
  const decided = o.script.filter((l) => l.kind === 'decision').flatMap((l) => l.options.map((x) => x.rule)).filter(Boolean);
  item.baits = o.baits || [...new Set([...trapAnswers(o.judge.kind, startNode, o.judge).map((t) => t.rule), ...decided])];
  item.solution = o.solution || linesSolution(item);
  item.answerHtml = o.answerHtml || item.solution[item.solution.length - 1]?.html.replace(/^<span class="eq">[^<]*<\/span> /, '');
  return item;
}

// options: [{html, correct, rule?}]
export function mcq(o, rng) {
  const it = mcqItem(o.skill, o.level, o.prompt, o.options, rng, {
    key: o.key, solution: o.solution || [], expectedSec: o.expectedSec || 40, keepOrder: o.keepOrder,
  });
  return { ...it, multi: !!o.multi, exam: o.exam || false, fallback: !!o.fallback };
}

// True or false, with a counter-example asked when the statement is false
// and the student says so (js/judges/examples.js). decided: the statement
// is known to be false, only the counter-example is asked.
export function tfItem(o) {
  return {
    skill: o.skill, level: o.level, type: 'tf',
    prompt: o.prompt || (o.decided ? 'Cet énoncé est faux. Donne un contre-exemple.' : 'Vrai ou faux ?'),
    statement: o.statement,
    truth: o.truth,
    decided: !!o.decided,
    counter: o.counter || null,
    ruleIfTrue: o.ruleIfTrue || null,
    ruleIfFalse: o.ruleIfFalse || null,
    explanation: o.explanation || '',
    solution: o.solution || (o.explanation ? [{ html: o.explanation, note: '' }] : []),
    hints: o.noHints || o.exam ? [] : o.hints || [],
    noHints: !!o.noHints || !!o.exam,
    baits: [...new Set([o.ruleIfTrue, o.ruleIfFalse, ...(o.baits || [])].filter(Boolean))],
    key: `${o.skill}:tf:${o.key}`,
    expectedSec: o.expectedSec || 40,
    exam: o.exam || false,
    fallback: !!o.fallback,
  };
}

// A formula built from tokens (judge `logic`).
export const LOGIC_OPS = ['∀', '∃', '¬', '⇒', '⇔', '∧', '∨', '(', ')', ','];
export function tokensItem(o) {
  return {
    skill: o.skill, level: o.level, type: 'tokens', prompt: o.prompt,
    judge: { kind: 'logic', pieces: o.pieces, letters: o.letters || [] },
    palette: o.palette || o.pieces.map((p) => (typeof p === 'string' ? p : p.text)),
    ops: o.ops || LOGIC_OPS,
    target: o.target,
    start: o.start || null,
    sides: o.sides || null,
    task: o.task || null,
    answer: o.answer || o.target,
    hints: o.noHints || o.exam ? [] : o.hints || [],
    noHints: !!o.noHints || !!o.exam,
    solution: o.solution || [],
    baits: o.baits || [],
    key: `${o.skill}:tokens:${o.key}`,
    expectedSec: o.expectedSec || 60,
    exam: o.exam || false,
    answerHtml: o.answerHtml || FM(o.answer || o.target, { pieces: o.pieces, letters: o.letters || [] }),
    fallback: !!o.fallback,
  };
}

export function blocksItem(o) {
  return {
    skill: o.skill, level: o.level, type: 'blocks', prompt: o.prompt, mode: o.mode || 'order',
    blocks: o.blocks, goal: o.goal, order: o.order, placed: o.placed || [],
    decision: o.decision || null,
    hints: o.noHints || o.exam ? [] : o.hints || [],
    noHints: !!o.noHints || !!o.exam,
    solution: o.solution || o.order.map((id) => ({ html: o.blocks.find((b) => b.id === id).html, note: '' })),
    baits: [...new Set([...o.blocks.filter((b) => b.distractor).map((b) => b.distractor), ...o.blocks.filter((b) => b.orderRule).map((b) => b.orderRule), ...(o.decision?.options || []).map((x) => x.rule).filter(Boolean)])],
    subgoals: o.subgoals || [],
    key: `${o.skill}:blocks:${o.key}`,
    expectedSec: o.expectedSec || 30 + 15 * o.order.length,
    exam: o.exam || false,
    fallback: !!o.fallback,
  };
}

export function tableItem(o) {
  return {
    skill: o.skill, level: o.level, type: 'table', prompt: o.prompt,
    table: o.table, judge: { kind: 'iter', phi: o.phi }, answers: o.answers,
    then: o.then || null,
    hints: o.noHints || o.exam ? [] : o.hints || [],
    noHints: !!o.noHints || !!o.exam,
    solution: o.solution || [],
    baits: o.baits || [],
    subgoals: o.subgoals || [],
    key: `${o.skill}:table:${o.key}`,
    expectedSec: o.expectedSec || 60,
    exam: o.exam || false,
    fallback: !!o.fallback,
  };
}

// A short numeric answer (the `coef` exam variant, §16.3): the school
// `answer` item, which reads fractions and negative numbers.
export function answerItem(o) {
  return {
    skill: o.skill, level: o.level, type: 'answer', prompt: o.prompt,
    expected: String(o.expected), form: 'any', keys: 'relfrac', traps: o.traps || [],
    solution: o.solution || [], baits: [...new Set((o.traps || []).map((t) => t.rule))],
    key: `${o.skill}:coef:${o.key}`, expectedSec: o.expectedSec || 90,
    exam: o.exam || false, fallback: !!o.fallback,
  };
}

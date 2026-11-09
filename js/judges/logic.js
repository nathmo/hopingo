// Judge `logic` (spec §5.2, §16.2, step U1): formulas built from tokens (∀ ∃
// ¬ ⇒ ⇔ ∧ ∨, brackets, and the item's pieces). A line is right if it is
// equivalent to the previous one (js/cas/logic.js: negations pushed in,
// quantifier blocks compared without expanding their restrictions, truth
// table on the atoms).
// cfg: {pieces: [{text, neg?}], letters: ['P', 'Q'], maxSize?}
// Final form: no ¬ before a quantifier or a connective, atoms negated by
// the table (x ≥ 3, not ¬(x < 3)); with maxSize, at most that many symbols
// (« the shortest form »).
//
// Also the `tokens` item (§6): judgeTokens(item, text) compares one formula
// with item.target.

import {
  lexFor, parseFormula, formulaText, formulaML, equivalentLogic, finalIssue, size, sameFormula, LogicError, strip,
} from '../cas/logic.js';
import { diagnoseLine } from './diagnose.js';

export const parseLine = (cfg, text) => parseFormula(text, lexFor(cfg));
export const show = (cfg, node, opts) => formulaML(node, lexFor(cfg), opts);
export const text = (cfg, node) => formulaText(node, lexFor(cfg));

export function isFinal(cfg, node) {
  const lex = lexFor(cfg);
  const issue = finalIssue(node, lex);
  if (issue?.kind === 'atom') return issue.message;
  if (issue) return false;
  if (cfg.maxSize && size(node) > cfg.maxSize) return false;
  return true;
}

export const start = (cfg) => cfg.start;

function read(cfg, input) {
  if (input && typeof input === 'object') return { node: input };
  try {
    return { node: parseLine(cfg, String(input ?? '')) };
  } catch (e) {
    if (e instanceof LogicError) return { error: { kind: 'parse', message: e.message } };
    throw e;
  }
}

const same = (a, b) => equivalentLogic(a, b);

export function judgeLine(cfg, prev, input) {
  const r = read(cfg, input);
  if (r.error) return r.error;
  const { node } = r;
  const lex = lexFor(cfg);
  if (sameFormula(node, prev, lex)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  if (!equivalentLogic(prev, node)) {
    const diag = diagnoseLine('logic', prev, node, cfg, same);
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: 'Ta formule ne dit pas la même chose que la ligne précédente.' };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais : ${fin}` };
  return { kind: 'ok', node };
}

// A `tokens` item: {cfg (pieces), target (text), start? (text, for the
// diagnosis: the statement the traps start from)}.
// → {kind: 'done'|'wrong'|'stay'|'parse', rule?, diag?, message?}
export function judgeTokens(item, input) {
  const cfg = item.judge;
  const r = read(cfg, input);
  if (r.error) return r.error;
  const { node } = r;
  const target = parseLine(cfg, item.target);
  if (!equivalentLogic(node, target)) {
    const start = item.start ? parseLine(cfg, item.start) : target;
    const diag = diagnoseLine('logic', start, node, { ...cfg, task: item.task }, same);
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: item.wrongMessage || 'Ce n\'est pas la formule demandée.' };
  }
  // A contraposée or a réciproque must have that shape, not only its meaning.
  if (item.sides) {
    let m = strip(node);
    while (m.t === 'q') m = strip(m.body);
    const lex = lexFor(cfg);
    const okShape = m.t === 'imp' && equivalentLogic(m.l, parseFormula(item.sides.l, lex)) && equivalentLogic(m.r, parseFormula(item.sides.r, lex));
    if (!okShape) return { kind: 'stay', node, message: 'C\'est équivalent, mais ce n\'est pas la forme demandée : écris une implication « … ⇒ … » avec les bons côtés.' };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais : ${fin}` };
  return { kind: 'stay', node, message: item.unfinished || 'C\'est juste, mais il reste un ¬ à faire entrer.' };
}

// Judging a student's line or answer.

import { Q } from './rational.js';
import {
  tryParse, tryEvaluate, evaluate, isFinal, isIrreducible, litParts, opCounts, print, tidy,
} from './expr.js';
import { diagnose } from './diagnose.js';
import { t } from '../i18n.js';

// Which operations a valid step performed, by comparing operator counts.
export function performedOps(prev, next) {
  const a = opCounts(prev);
  const b = opCounts(next);
  const out = [];
  for (const op of Object.keys(a)) for (let i = 0; i < a[op] - (b[op] || 0); i++) out.push(op);
  return out;
}

// prev: the previous line (tree). input: keypad text.
// Returns {kind, node, ops, diag, message}:
//   parse     unreadable
//   same      nothing changed
//   ok        valid step, keep going
//   simplify  right value and finished, but not irreducible
//   done      finished
//   wrong     value changed; diag names the mistake if known
export function judgeLine(prev, input, { requireIrreducible = true } = {}) {
  const node = tryParse(input);
  if (!node) return { kind: 'parse', message: t('Je n\'arrive pas à lire cette écriture.') };
  const v = tryEvaluate(node);
  if (!v) return { kind: 'parse', node, message: t('Ce calcul est impossible (division par zéro ?).') };
  const pv = evaluate(prev);
  if (!v.eq(pv)) return { kind: 'wrong', node, value: v, diag: diagnose(prev, v) };
  const ops = performedOps(prev, node);
  if (isFinal(node)) {
    if (requireIrreducible && !isIrreducible(node)) return { kind: 'simplify', node, ops };
    return { kind: 'done', node, ops };
  }
  if (print(tidy(node)) === print(tidy(prev))) return { kind: 'same', node };
  return { kind: 'ok', node, ops };
}

// Final answer to a question whose correct value is `expected`.
// form: 'any' | 'irreducible' | 'integer' | 'decimal' | 'fraction'
// tree: the question expression, if any, for diagnosis.
export function judgeAnswer(expected, input, { form = 'any', tree = null } = {}) {
  const node = tryParse(input);
  if (!node) return { kind: 'parse', message: t('Je n\'arrive pas à lire cette réponse.') };
  const v = tryEvaluate(node);
  if (!v) return { kind: 'parse', node, message: t('Ce calcul est impossible.') };
  if (!v.eq(Q.of(expected))) return { kind: 'wrong', node, value: v, diag: tree ? diagnose(tree, v) : null };
  if (!isFinal(node)) return { kind: 'unfinished', node, message: t('C\'est juste, mais termine le calcul.') };
  const p = litParts(node);
  if (form === 'irreducible' && !isIrreducible(node)) return { kind: 'simplify', node };
  if (form === 'decimal' && !(p.decimal || p.int)) return { kind: 'form', node, message: t('Écris ce nombre sous forme décimale.') };
  if (form === 'fraction' && (p.decimal)) return { kind: 'form', node, message: t('Écris ce nombre sous forme de fraction.') };
  return { kind: 'done', node };
}

// Judge `mat` (step U3): values that are matrices, vectors or numbers, and
// matrix expressions with named matrices (A, P, D, E_1…). A line keeps the
// value of the previous one (products, inverses, P·D·P⁻¹ computed); with
// cfg.expect, it must have that value whatever the previous line (« A⁻¹ = ? »).
//
// cfg: {kind:'mat', names: {A: '[[…]]'}, vars?, complex?, expect?: text,
//       form?: 'literal' (default: the answer is written out) | 'any'}
// Its traps (judges: ['mat']) replay on the previous line or on cfg.

import { evalAst, sameValue, isLiteralAst, parseExpr, envOf, valueText } from '../cas/matexpr.js';
import { exactValue } from '../cas/normal.js';
import { diagnoseLine } from './diagnose.js';
import { readMat, mopts, wrongV, parseLine, show, text, input, litNum } from './matcommon.js';

export { parseLine, show, text, input };

const CACHE = new WeakMap();
export function expected(cfg) {
  if (cfg.expect === undefined) return null;
  if (!CACHE.has(cfg)) CACHE.set(cfg, evalAst(parseExpr(String(cfg.expect), mopts(cfg)), { ...envOf(cfg) }, mopts(cfg)));
  return CACHE.get(cfg);
}

// A literal whose entries are written out (no 2 + 3 left in a case).
function tidy(value) {
  const entries = value.k === 's' ? [value.n] : value.k === 'm' ? value.rows.flat() : value.items.flatMap((x) => (x.k === 's' ? [x.n] : x.rows.flat()));
  return entries.every((n) => !exactValue(n) || litNum(n));
}

export function isFinal(cfg, node) {
  if (!node.value) return false;
  if ((cfg.form ?? 'literal') === 'any') return true;
  if (node.assigns?.length > 1) return node.assigns.every((a) => isLiteralAst(a.ast));
  if (!isLiteralAst(node.body)) return false;
  return tidy(node.value) ? true : 'C\'est juste : calcule encore chaque case.';
}

export const start = (cfg) => cfg.start;

export function judgeLine(cfg, prev, input) {
  const read = readMat(cfg, input);
  if (read.error) return read.error;
  const node = read.node;
  const opts = mopts(cfg);
  if (!node.value) return { kind: 'form', node, message: 'Écris une matrice, un vecteur ou un nombre.' };
  const want = expected(cfg) ?? prev.value;
  if (cfg.expect === undefined && node.text === prev.text) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  if (!sameValue(node.value, want, opts)) {
    const diag = diagnoseLine('mat', prev, node, cfg, (c, n) => sameValue(c.value ?? c, n.value, opts));
    const dims = (v) => (v.k === 'm' ? `${v.rows.length}×${v.rows[0].length}` : null);
    const msg = want.k === 'm' && node.value.k === 'm' && dims(want) !== dims(node.value)
      ? `Le résultat doit être de taille ${dims(want)}.`
      : 'Ce n\'est pas la bonne valeur.';
    return wrongV(node, msg, diag);
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: fin };
  return { kind: 'ok', node };
}

export { valueText };

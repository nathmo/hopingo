// Judge `value` (spec §5.2): a line is right if it keeps the exact value of
// the previous one. Lines made of numbers only are handed to the school
// judge (js/math/judge.js), with its diagnosis of calculation traps; the
// others (π, sin 0, √2) are compared exactly when possible, else in
// floating point. cfg: {form: 'irreducible' (default) | 'any'}.

import { parse as parseSchool, tryParse as tryParseSchool, isLiteral as isSchoolLiteral } from '../math/expr.js';
import { judgeLine as schoolJudge } from '../math/judge.js';
import { toText } from '../cas/print.js';
import { numValue, stripParen } from '../cas/ast.js';
import { exactValue } from '../cas/normal.js';
import { evalFloat } from '../cas/numeric.js';
import { close } from '../cas/equiv.js';
import { readLine, sameLine } from './common.js';

const KIND = { parse: 'parse', same: 'same', ok: 'ok', done: 'done', wrong: 'wrong', simplify: 'stay' };

// A number written out: 3, −3, 3/4, 0,5.
function isLiteral(n) {
  n = stripParen(n);
  if (n.t === 'neg') n = stripParen(n.e);
  return n.t === 'num' || (n.t === 'frac' && n.n.t === 'num' && n.d.t === 'num');
}

export function isFinal(cfg, node) {
  if (!isLiteral(node)) return false;
  if ((cfg.form ?? 'irreducible') === 'any') return true;
  const n = stripParen(node.t === 'neg' ? node.e : node);
  if (n.t === 'frac') {
    const v = numValue(n);
    return v && v.d === n.d.v.n ? true : 'Simplifie encore la fraction.';
  }
  return true;
}

export const start = (cfg) => cfg.start;

function valueOf(node) {
  const q = exactValue(node);
  if (q) return { q, x: q.valueOf() };
  return { q: null, x: evalFloat(node, {}) };
}

export function judgeLine(cfg, prev, input) {
  const read = readLine({ ...cfg, vars: [] }, input);
  if (read.error) return read.error;
  const { node } = read;
  // Numbers only: the school judge, which names the calculation traps.
  const prevText = toText(prev);
  const text = toText(node);
  if (tryParseSchool(prevText) && tryParseSchool(text)) {
    const r = schoolJudge(parseSchool(prevText), text, { requireIrreducible: (cfg.form ?? 'irreducible') !== 'any' });
    const kind = KIND[r.kind] ?? r.kind;
    const out = { kind, node, diag: r.diag ?? null, rule: r.diag?.rules?.[0] ?? null };
    if (kind === 'stay') out.message = 'C\'est juste, mais simplifie encore.';
    if (kind === 'done' && !isSchoolLiteral(r.node)) out.kind = 'ok';
    if (kind === 'wrong') out.message = 'Ce n\'est pas la même valeur.';
    if (kind === 'parse') out.message = r.message;
    return out;
  }
  if (sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  const a = valueOf(prev);
  const b = valueOf(node);
  const equal = a.q && b.q ? a.q.eq(b.q) : Number.isFinite(a.x) && Number.isFinite(b.x) && close(a.x, b.x);
  if (!equal) return { kind: 'wrong', node, rule: null, diag: null, message: 'Ce n\'est pas la même valeur.' };
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: fin };
  return { kind: 'ok', node };
}

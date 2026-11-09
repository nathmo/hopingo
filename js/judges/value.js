// Judge `value` (spec §5.2): a line is right if it keeps the exact value of
// the previous one. Lines made of numbers only are handed to the school
// judge (js/math/judge.js), with its diagnosis of calculation traps; the
// others (π, sin 0, √2) are compared exactly when possible, else in
// floating point. cfg: {form: 'irreducible' (default) | 'any' | 'log', expect?}.
// form 'log': a number or the logarithm of a whole number (ln 2, −ln 3) is final.
// Step U1b (G3): forms 'exact' and 'deg', tol, tolDeg: 'exact' ends on a number
// written out with radicals and π (−(√2 + √6)/4, 4π/3, js/cas/exactform.js);
// 'deg' on an angle in degrees (38,21°); tol (absolute) or tolDeg (in
// degrees) accepts rounded values (triangles).
// With cfg.expect (text), a line is right if it has that value, whatever
// the previous line: the segment asks for a number (« A = ? »).
// With cfg.terms (texts of numbers), the line must be a Σ whose terms are
// exactly these, in order (writing 2 + 5 + … + 29 with Σ, G5).
// When the school judge names no trap, the traps of the university modules
// that list `value` in their judges are tried (g0_rem_sign…).

import { parse as parseSchool, tryParse as tryParseSchool, isLiteral as isSchoolLiteral } from '../math/expr.js';
import { judgeLine as schoolJudge } from '../math/judge.js';
import { toText } from '../cas/print.js';
import { parse } from '../cas/parse.js';
import { numValue, stripParen, lit } from '../cas/ast.js';
import { exactValue, atIndex } from '../cas/normal.js';
import { evalFloat } from '../cas/numeric.js';
import { close } from '../cas/equiv.js';
import { readLine, sameLine } from './common.js';
import { exactForm } from '../cas/exactform.js';
import { diagnoseLine } from './diagnose.js';

const KIND = { parse: 'parse', same: 'same', ok: 'ok', done: 'done', wrong: 'wrong', simplify: 'stay' };

// A number written out: 3, −3, 3/4, 0,5.
function isLiteral(n) {
  n = stripParen(n);
  if (n.t === 'neg') n = stripParen(n.e);
  return n.t === 'num' || (n.t === 'frac' && n.n.t === 'num' && n.d.t === 'num');
}

// ln(2), −ln(3), 3·ln(2): a logarithm of a whole number (form 'log', G2).
function isLogLiteral(n) {
  n = stripParen(n);
  if (n.t === 'neg') n = stripParen(n.e);
  if (n.t === 'bin' && n.op === '×' && isLiteral(n.l)) n = stripParen(n.r);
  if (n.t === 'frac' && isLiteral(n.d)) n = stripParen(n.n);
  if (n.t !== 'fn' || !['ln', 'log', 'Log'].includes(n.name)) return false;
  const k = numValue(stripParen(n.args[0]));
  return !!k && k.isInt() && k.n >= 2;
}

const isDegLiteral = (n) => {
  n = stripParen(n);
  if (n.t === 'neg') n = stripParen(n.e);
  return n.t === 'bin' && n.deg && isLiteral(n.l);
};

export function isFinal(cfg, node) {
  if (cfg.terms) return !!sumTerms(node);
  if (cfg.form === 'log' && !isLiteral(node)) return isLogLiteral(node);
  if (cfg.form === 'exact') return exactForm(node);
  if (cfg.form === 'deg') return isDegLiteral(node) || (isLiteral(node) && stripParen(node).t !== 'frac' ? "Écris l'unité : ° pour des degrés." : false);
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

const tolOf = (cfg) => (cfg?.tol ?? (cfg?.tolDeg ? (cfg.tolDeg * Math.PI) / 180 : 0));

const sameValue = (a, b, cfg) => {
  const x = valueOf(a);
  const y = valueOf(b);
  if (x.q && y.q) return x.q.eq(y.q);
  if (!Number.isFinite(x.x) || !Number.isFinite(y.x)) return false;
  const tol = tolOf(cfg);
  return close(x.x, y.x) || (tol > 0 && Math.abs(x.x - y.x) <= tol);
};

function moduleTrap(cfg, prev, node) {
  return diagnoseLine('value', prev, node, cfg, (a, b) => sameValue(a, b, cfg));
}

function judgeExpect(cfg, prev, node) {
  if (sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  const want = parse(String(cfg.expect));
  if (!sameValue(node, want, cfg)) {
    const diag = moduleTrap(cfg, prev, node);
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: 'Ce n\'est pas la bonne valeur.' };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: fin };
  return { kind: 'ok', node };
}

// The terms of a Σ with whole-number bounds, as exact numbers (or null).
export function sumTerms(node) {
  const n = stripParen(node);
  if (n.t !== 'sum') return null;
  const lo = exactValue(n.lo);
  const hi = exactValue(n.hi);
  if (!lo || !hi || !lo.isInt() || !hi.isInt() || hi.n - lo.n > 200) return null;
  const out = [];
  for (let j = lo.n; j <= hi.n; j++) {
    const q = exactValue(atIndex(n, j));
    if (!q) return null;
    out.push(q);
  }
  return out;
}

function judgeTerms(cfg, prev, node) {
  if (sameLine(node, prev)) return { kind: 'same', node, message: "Avance d'au moins une étape." };
  const want = cfg.terms.map((t) => exactValue(parse(String(t))));
  const got = sumTerms(node);
  if (!got) {
    // Not a Σ: wrong if its value is not the sum's, else to rewrite with Σ.
    const v = exactValue(node);
    const total = want.reduce((acc, x) => acc.add(x), want[0].sub(want[0]));
    if (v && !v.eq(total)) return { kind: 'wrong', node, message: 'Ta ligne ne vaut pas la somme demandée.' };
    return { kind: 'form', node, message: 'Écris la somme avec Σ : sum(terme, k, début, fin), avec des bornes entières.' };
  }
  const same = (a, b) => a.length === b.length && a.every((q, i) => q.eq(b[i]));
  if (same(got, want)) return { kind: 'done', node };
  // One term too many or too few: the count of the terms.
  const off = (got.length === want.length - 1 && same(got, want.slice(0, -1))) || (got.length === want.length + 1 && same(got.slice(0, -1), want))
    || (got.length === want.length - 1 && same(got, want.slice(1)));
  const shown = (q) => toText(lit(q)).replace('-', '−');
  let message;
  if (got.length !== want.length) message = `Ta somme a ${got.length} termes, il en faut ${want.length}.`;
  else {
    const i = got.findIndex((q, k) => !q.eq(want[k]));
    message = `Le terme n° ${i + 1} de ta somme vaut ${shown(got[i])}, il faut ${shown(want[i])}.`;
  }
  const rule = off ? 'g5_count_terms' : null;
  return { kind: 'wrong', node, rule, diag: rule ? { rules: [rule], ambiguous: 1, ctx: { got: got.length, want: want.length } } : null, message };
}

export function judgeLine(cfg, prev, input) {
  const read = readLine({ ...cfg, vars: [] }, input);
  if (read.error) return read.error;
  const { node } = read;
  if (cfg.terms) return judgeTerms(cfg, prev, node);
  if (cfg.expect !== undefined) return judgeExpect(cfg, prev, node);
  // Numbers only: the school judge, which names the calculation traps.
  const prevText = toText(prev);
  const text = toText(node);
  if (!['exact', 'deg'].includes(cfg.form) && !tolOf(cfg) && tryParseSchool(prevText) && tryParseSchool(text)) {
    let r;
    try {
      r = schoolJudge(parseSchool(prevText), text, { requireIrreducible: (cfg.form ?? 'irreducible') !== 'any' });
    } catch { return casJudge(cfg, prev, node); }
    const kind = KIND[r.kind] ?? r.kind;
    // The school evaluator knows no real powers (8^(1/3)): the CAS decides.
    if (kind === 'parse') return casJudge(cfg, prev, node);
    const out = { kind, node, diag: r.diag ?? null, rule: r.diag?.rules?.[0] ?? null };
    if (kind === 'stay') out.message = 'C\'est juste, mais simplifie encore.';
    if (kind === 'done' && !isSchoolLiteral(r.node)) out.kind = 'ok';
    if (kind === 'wrong') {
      out.message = 'Ce n\'est pas la même valeur.';
      // A trap of the module (P(a) instead of P(−a)) says more than a
      // calculation slip.
      const diag = moduleTrap(cfg, prev, node);
      if (diag) Object.assign(out, { rule: diag.rules[0], diag });
    }
    return out;
  }
  return casJudge(cfg, prev, node);
}

// Exact comparison by the CAS, else in floating point.
function casJudge(cfg, prev, node) {
  if (sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  const a = valueOf(prev);
  const b = valueOf(node);
  const equal = sameValue(prev, node, cfg);
  if (!equal) {
    const diag = moduleTrap(cfg, prev, node);
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: 'Ce n\'est pas la même valeur.' };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: fin };
  return { kind: 'ok', node };
}

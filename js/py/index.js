// The Python interpreter's API for items (spec §12, step U9).
//   runProgram(src, {prelude, maxSteps})  → {ok, output, error}   (interp.js)
//   runTests({prelude, source, tests, maxSteps})
//     → {ok, results: [{n, expr, got, expect, ok, error?}], error?, failed?}
//     Each test {setup?, expr, expect, tol?, atol?} runs in a fresh
//     interpreter: prelude, then the student's program, then setup, then
//     expr. expect is a Python literal (text) or a JS value. Numbers are
//     equal within tol (relative, default 1e-9) or atol (absolute);
//     lists and tuples element by element. The first failed test is in
//     `failed`, with a French message (`failed.text`).
//   sameValue(got, expect, {tol, atol}), show(v) (Python repr), toJs(v).

import { Interp, errorOf, runProgram } from './interp.js';
import { parseExpr } from './parser.js';
import { repr, isNum, toF, isInt } from './builtins.js';
import { PyError } from './lexer.js';

export { runProgram, Interp, PyError };
export const show = (v) => repr(v);

// Plain JS (numbers, arrays, booleans, null, strings).
export function toJs(v) {
  if (typeof v === 'bigint') return Number(v);
  if (Array.isArray(v)) return v.map(toJs);
  if (v && v.k === 'range') return toJs([...Array(0)]);
  return v;
}

// A JS expectation as a Python value (numbers become floats, integers too:
// the comparison is numeric anyway).
function fromJs(v) {
  if (Array.isArray(v)) return v.map(fromJs);
  return v;
}

// The value of an expected literal.
export function expectedValue(expect) {
  if (typeof expect !== 'string') return fromJs(expect);
  const it = new Interp({ maxSteps: 10000 });
  it.run('import math');
  return it.evalSource(expect);
}

export function sameValue(got, want, { tol = 1e-9, atol = 0 } = {}) {
  if (isNum(got) && isNum(want) && typeof got !== 'boolean' && typeof want !== 'boolean') {
    const a = toF(got);
    const b = toF(want);
    if (Number.isNaN(a) || Number.isNaN(b)) return Number.isNaN(a) && Number.isNaN(b);
    if (!Number.isFinite(b) || !Number.isFinite(a)) return a === b;
    if (isInt(got) && isInt(want) && !tol && !atol) return a === b;
    return Math.abs(a - b) <= Math.max(atol, tol * Math.max(Math.abs(a), Math.abs(b)));
  }
  if (typeof got === 'boolean' || typeof want === 'boolean') return got === want;
  if (Array.isArray(got) && Array.isArray(want)) {
    return got.length === want.length && got.every((x, i) => sameValue(x, want[i], { tol, atol }));
  }
  if (got === null || want === null) return got === want;
  return got === want;
}

// Short display of a value in a message (long lists cut).
function brief(v) {
  const s = repr(v);
  return s.length > 120 ? `${s.slice(0, 117)}…` : s;
}

export function runTests({ prelude = '', source, tests, maxSteps = 200000 }) {
  const results = [];
  // The program alone first: a syntax error or an error at the top level
  // is reported once, with the line of the shown program.
  const base = runProgram(source, { prelude, maxSteps });
  if (!base.ok) {
    const e = base.error;
    return { ok: false, results, error: e, failed: { n: 0, text: e.kind === 'limit' ? e.message : `Erreur ${e.line ? `ligne ${e.line}` : ''} : ${e.message}`.replace('Erreur  :', 'Erreur :') } };
  }
  let failed = null;
  tests.forEach((t, k) => {
    const n = k + 1;
    const it = new Interp({ maxSteps });
    let got;
    let want;
    try {
      want = expectedValue(t.expect);
    } catch (e) {
      throw new Error(`test ${n} : valeur attendue illisible ${t.expect} (${e.message})`);
    }
    try {
      if (prelude) it.run(prelude);
      it.run(source);
      if (t.setup) it.run(t.setup, { lineOffset: 10000 });
      got = it.evalSource(t.expr);
    } catch (e) {
      const err = errorOf(e);
      const where = err.line && err.line < 10000 ? ` (ligne ${err.line})` : '';
      const text = err.kind === 'limit'
        ? `Test ${n} : ${t.expr} — ${err.message}`
        : `Test ${n} : ${t.expr} — erreur${where} : ${err.message}`;
      results.push({ n, expr: t.expr, ok: false, error: err, text });
      failed ||= results[results.length - 1];
      return;
    }
    const ok = sameValue(got, want, { tol: t.tol ?? 1e-9, atol: t.atol ?? 0 });
    const text = ok ? '' : `Test ${n} : ${t.expr} donne ${brief(got)}, attendu ${brief(want)}`;
    results.push({ n, expr: t.expr, got, expect: want, ok, text });
    if (!ok) failed ||= results[results.length - 1];
  });
  return { ok: !failed, results, error: null, failed };
}

// Parses an expression only (to check that a hole is an expression).
export function isExpression(text) {
  try { parseExpr(text); return true; } catch { return false; }
}

// Pieces shared by the linear-algebra judges (step U3): reading a line with
// js/cas/matexpr.js, showing it, the line node, float helpers and ranks.
//
// A line node: {t:'mline', ops, assigns:[{name, ast, value}], label, body,
//   value, ml?, text}. `value` is the evaluated body (a matrix, a vector, a
//   number or a list); `ml` overrides how the body is shown (the det judge
//   shows what the student wrote, det(…) included).

import { ParseError, parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { toText } from '../cas/print.js';
import {
  parseMatLine, evalAst, envOf, lineML, lineText, valueText, toQ, normalizeMatText, exprML, S,
} from '../cas/matexpr.js';
import { evalFloat } from '../cas/numeric.js';
import { stripParen } from '../cas/ast.js';
import * as M from '../cas/matrix.js';
import { t } from '../i18n.js';

export const mopts = (cfg = {}) => ({ vars: cfg.vars || [], complex: !!cfg.complex, names: cfg.names, ints: cfg.ints });

// Is the text a plain scalar expression (no matrix, vector, name or det)?
const plainScalar = (t) => !/[[\]{};|←↔]|det|diag|\btr\b|[A-ZΣ]/.test(t) && !/\(\s*[^()]*;/.test(t);

// Read a line: {node} or {error: parse verdict}.
export function readMat(cfg, input) {
  if (input && typeof input === 'object') return { node: input };
  const text = normalizeMatText(String(input ?? '').replace(/^\s*=/, ''));
  try {
    return { node: buildLine(cfg, text) };
  } catch (e) {
    return { error: { kind: 'parse', message: e instanceof ParseError || e instanceof RangeError || e instanceof SyntaxError ? e.message : t('Je n\'arrive pas à lire cette ligne ({m}).', { m: e.message }) } };
  }
}

export function buildLine(cfg, text) {
  const opts = mopts(cfg);
  if (plainScalar(text)) {
    const n = parse(text, { vars: opts.vars, complex: opts.complex });
    return { t: 'mline', ops: [], assigns: [], label: null, body: { op: 'num', n }, value: S(n), ml: toMathML(n).replace(/^<math[^>]*>|<\/math>$/g, ''), raw: true, text };
  }
  const line = parseMatLine(text, opts);
  const env = { ...envOf(cfg) };
  for (const a of line.assigns) { a.value = evalAst(a.ast, env, opts); env[a.name] = a.value; }
  if (line.body) line.value = line.assigns.length === 1 && line.assigns[0].ast === line.body ? line.assigns[0].value : evalAst(line.body, env, opts);
  return { t: 'mline', ...line, text };
}

// Start and shown lines: a line that does not evaluate (« A⁻¹ = ? », a
// name the item does not define) is shown as written.
export function parseLine(cfg, text) {
  const t = normalizeMatText(text);
  try {
    return buildLine(cfg, t);
  } catch {
    let ml;
    try { ml = exprML(parseMatLine(t, { ...mopts(cfg), vars: undefined }).body); } catch { ml = `<mtext>${t.replace(/</g, '&lt;')}</mtext>`; }
    return { t: 'mline', ops: [], assigns: [], label: null, body: null, value: null, ml, raw: true, text: t };
  }
}
export const show = (cfg, node, opts = {}) => lineML(node, opts);
export const text = (cfg, node) => lineText(node);
// The input the screen offers for a line of this judge (ui/matrix-input.js).
export const input = 'matrix';

export const isMatrix = (v) => v?.k === 'm';
export const shapeOf = (v) => (isMatrix(v) ? [v.rows.length, v.rows[0]?.length ?? 0] : null);
export const verdict = (kind, node, extra = {}) => ({ kind, node, ...extra });
export const wrongV = (node, message, diag = null) => ({ kind: 'wrong', node, message, rule: diag?.rules?.[0] ?? null, diag });
export const parseV = (node, message) => ({ kind: 'parse', node, message });

// Floats of a value (NaN where an entry does not evaluate).
export const toF = (v, env = {}) => v.rows.map((r) => r.map((x) => evalFloat(x, env)));

export const fRank = (A, tol = 1e-9) => {
  const R = A.map((r) => [...r]);
  const m = R.length;
  const n = R[0]?.length ?? 0;
  const scale = Math.max(1, ...R.flat().map(Math.abs));
  let rank = 0;
  for (let c = 0; c < n && rank < m; c++) {
    let p = rank;
    for (let i = rank + 1; i < m; i++) if (Math.abs(R[i][c]) > Math.abs(R[p][c])) p = i;
    if (Math.abs(R[p][c]) <= tol * scale) continue;
    [R[rank], R[p]] = [R[p], R[rank]];
    for (let i = rank + 1; i < m; i++) {
      const f = R[i][c] / R[rank][c];
      for (let j = c; j < n; j++) R[i][j] -= f * R[rank][j];
    }
    rank++;
  }
  return rank;
};

// Rank of a set of column vectors (values), exact when possible.
export function rankOfVectors(vecs) {
  if (!vecs.length) return 0;
  const cols = vecs.map((v) => v.rows.map((r) => r[0]));
  const qs = toQ({ k: 'm', rows: M.transpose(cols) });
  if (qs) return M.rank(qs);
  const F = M.transpose(cols.map((c) => c.map((x) => evalFloat(x, {}))));
  if (F.flat().some((x) => !Number.isFinite(x))) return null;
  return fRank(F);
}

export const fmul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
export const ftr = (A) => A[0].map((_, j) => A.map((r) => r[j]));
export const fclose = (A, B, tol = 1e-8) => A.length === B.length && A.every((r, i) => r.length === B[i].length && r.every((x, j) => Math.abs(x - B[i][j]) <= tol * (1 + Math.abs(x) + Math.abs(B[i][j]))));
export const fident = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));

// A number written out: 3, −3, 3/4.
export const litNum = (n) => {
  let x = stripParen(n);
  if (x.t === 'neg') x = stripParen(x.e);
  return x.t === 'num' || (x.t === 'frac' && stripParen(x.n).t === 'num' && stripParen(x.d).t === 'num');
};

export { valueText, exprML, toText };

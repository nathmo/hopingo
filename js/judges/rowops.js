// Judge `rowops` (spec §5.2, §16.2, step U3): Gaussian elimination. A line is
// a row operation the app applies (« L2 ← L2 − 3L1 »), an operation with
// the matrix it gives (« … : [[…]] », which must be its exact result), or a
// matrix alone (one elementary operation is recognised; with cfg.multi,
// any row-equivalent matrix).
//
// cfg: {kind:'rowops', vars?: ['a'] (parameters: entries in ℚ(a)),
//   goal: 'echelon' | 'rref' | 'col1' (below the first pivot) |
//         'triangular' | 'none',
//   cols?: pivots only among the first cols columns (default: left of « | »),
//   multi?: several operations in one matrix line,
//   lowerOnly?: only Lᵢ ← Lᵢ − kLⱼ with j < i (LU),
//   track?: 'det' (lines « k·det[[…]] »: the factor follows the operations;
//           a number equal to det A ends), factored?: with a parameter, the
//           final determinant must be factored}
// The traps of `rowops` get the announced (or likely) operations in
// ctx.cfg._ops; candidateOps(rows) gives the likely ones.

import { Q } from '../math/rational.js';
import * as MX from '../cas/matrix.js';
import {
  applyRowOp, identifyOp, nIsEchelon, nIsRref, sameValue, sameScalar, isZeroScalar, toQ, Mx, S, simp, ndet,
  ONE, qn, opReadable,
} from '../cas/matexpr.js';
import { div, mul, neg, num, stripParen, contains } from '../cas/ast.js';
import { exactValue } from '../cas/normal.js';
import { diagnoseLine } from './diagnose.js';
import {
  readMat, mopts, isMatrix, wrongV, parseLine as parseMatLineNode, show, text, input,
} from './matcommon.js';
import * as polyJudge from './poly.js';
import { ACTIONS } from './actions.js';

export { show, text, input };

// section det: with track 'det', a line « k·det[[…]] » reads as a det line
// (shown as written, its matrix kept for the menu and the next line).
export function parseLine(cfg, t) {
  const node = parseMatLineNode(cfg, t);
  return cfg.track === 'det' && node.body ? detLine(node, cfg) : node;
}

const colsOf = (cfg, v) => cfg.cols ?? v.aug ?? v.rows[0]?.length ?? 0;

// Rational values of the parameters where the row equivalence is tested.
const PARAM_SAMPLES = [[7, 3], [-5, 2], [11, 5]];

function atSample(v, cfg, s) {
  const env = Object.fromEntries((cfg.vars || []).map((x, i) => [x, PARAM_SAMPLES[(s + i) % 3]]));
  const rows = v.rows.map((r) => r.map((n) => {
    const sub = (node) => (node.t === 'sym' && env[node.name] ? { t: 'paren', e: { t: 'num', v: new Q(env[node.name][0], env[node.name][1]) } } : node);
    const mapped = mapDeep(n, sub);
    return exactValue(mapped);
  }));
  return rows.every((r) => r.every(Boolean)) ? rows : null;
}

function mapDeep(node, fn) {
  if (!node || typeof node !== 'object') return node;
  const out = fn(node);
  if (out !== node) return out;
  const copy = { ...node };
  for (const k of Object.keys(copy)) {
    if (Array.isArray(copy[k])) copy[k] = copy[k].map((x) => (x && typeof x === 'object' && x.t ? mapDeep(x, fn) : x));
    else if (copy[k] && typeof copy[k] === 'object' && copy[k].t) copy[k] = mapDeep(copy[k], fn);
  }
  return copy;
}

export function rowEquivalentV(a, b, cfg) {
  if (a.rows.length !== b.rows.length || a.rows[0].length !== b.rows[0].length) return false;
  if (!(cfg.vars || []).length) {
    const A = toQ(a);
    const B = toQ(b);
    if (A && B) return MX.rowEquivalent(A, B);
  }
  for (let s = 0; s < 3; s++) {
    const A = atSample(a, cfg, s);
    const B = atSample(b, cfg, s);
    if (!A || !B || !MX.rowEquivalent(A, B)) return false;
  }
  return true;
}

// The operations a student is likely to do next: clear each entry under (or
// above) a pivot with that pivot's row.
export function candidateOps(rows, opts = {}) {
  const out = [];
  const piv = rows.map((r) => r.findIndex((x) => !isZeroScalar(x, opts)));
  rows.forEach((rj, j) => {
    const c = piv[j];
    if (c < 0) return;
    rows.forEach((ri, i) => {
      if (i === j || isZeroScalar(ri[c], opts)) return;
      // Only pivots that are the first non-zero entry of row i's column
      // position or later (forward), or a back substitution.
      if (piv[i] >= 0 && piv[i] < c && i > j) return;
      out.push({ kind: 'add', i, j, k: simp(neg(div(ri[c], rj[c]))) });
    });
  });
  return out.slice(0, 12);
}

// The final shape asked by cfg.goal.
export function goalReached(cfg, v) {
  const opts = mopts(cfg);
  const cols = colsOf(cfg, v);
  switch (cfg.goal || 'echelon') {
    case 'echelon': return nIsEchelon(v.rows, { cols, opts });
    case 'rref': return nIsRref(v.rows, { cols, opts });
    case 'triangular': return v.rows.every((r, i) => r.every((x, j) => j >= i || isZeroScalar(x, opts)));
    case 'col1': {
      const c = [...Array(cols).keys()].find((k) => v.rows.some((r) => !isZeroScalar(r[k], opts)));
      if (c === undefined) return true;
      return !isZeroScalar(v.rows[0][c], opts) && v.rows.slice(1).every((r) => isZeroScalar(r[c], opts));
    }
    default: return false;
  }
}

export function isFinal(cfg, node) {
  if (cfg.track === 'det') return node.value?.k === 's' && !node.det ? finalNumber(cfg, node) : false;
  return isMatrix(node.value) && goalReached(cfg, node.value);
}

function finalNumber(cfg, node) {
  if (!(cfg.vars || []).length || !cfg.factored) return true;
  const v = cfg.vars[0];
  return polyJudge.isFinal({ v, target: 'factored-R' }, node.value.n) === true ? true : 'Juste. Factorise le déterminant pour lire ses racines.';
}

export const start = (cfg) => cfg.start;

// An operation that divides by an expression of the parameter.
function dividesByParam(op, cfg, opts) {
  if (!(cfg.vars || []).length) return null;
  const k = op.kind === 'scale' ? op.k : op.kind === 'combo' ? op.c : null;
  if (!k) return null;
  if (!contains(k, (x) => x.t === 'sym')) return null;
  return k;
}

function legal(op, rows, cfg, opts) {
  const m = rows.length;
  const bad = (i) => !Number.isInteger(i) || i < 0 || i >= m;
  if (bad(op.i) || (op.j !== undefined && bad(op.j))) return `La matrice n'a que ${m} lignes.`;
  if (op.j !== undefined && op.j === op.i && op.kind !== 'swap') return 'Ajoute à une ligne le multiple d\'une autre ligne.';
  if (op.kind === 'scale' && isZeroScalar(op.k, opts)) return 'Multiplier une ligne par 0 perd l\'équation : ce n\'est pas une opération permise.';
  if (op.kind === 'combo' && isZeroScalar(op.c, opts)) return 'Multiplier une ligne par 0 perd l\'équation : ce n\'est pas une opération permise.';
  if (cfg.lowerOnly && !(op.kind === 'add' && op.j < op.i)) return 'Pour LU, on ne fait que Lᵢ ← Lᵢ − k·Lⱼ avec j < i : pas d\'échange ni de multiplication.';
  return null;
}

const diagnose = (cfg, prev, node, ops) => diagnoseLine('rowops', prev, node, { ...cfg, _ops: ops }, (cand, n) => sameValue(cand.value, n.value, mopts(cfg)) && sameDetFactor(cand, n, cfg));
const sameDetFactor = (a, b, cfg) => (cfg.track !== 'det' ? true : !!a.det === !!b.det && (!a.det || sameScalar(a.factor, b.factor, mopts(cfg))));

// ---------- determinant lines (track: 'det') ----------

// « −2·det[[…]] » → {factor, matrix}; a plain matrix counts as det of it.
function detParts(node) {
  const b = node.body;
  if (!b) return null;
  const strip = (a) => (a.op === 'paren' ? strip(a.e) : a);
  const a = strip(b);
  if (a.op === 'det') return { factor: ONE, mat: a.e };
  if (a.op === 'neg' && strip(a.e).op === 'det') return { factor: qn(-1), mat: strip(a.e).e };
  // section det: « −2·det[[…]] » reads as −(2·det[[…]]).
  if (a.op === 'neg' && strip(a.e).op === 'mul' && strip(strip(a.e).b).op === 'det' && strip(strip(a.e).a).op === 'num') return { factor: simp(neg(strip(strip(a.e).a).n)), mat: strip(strip(a.e).b).e };
  if (a.op === 'mul' && strip(a.b).op === 'det' && strip(a.a).op === 'num') return { factor: strip(a.a).n, mat: strip(a.b).e };
  if (a.op === 'lit') return { factor: ONE, mat: a, plain: true };
  return null;
}

export function detLine(node, cfg) {
  const parts = detParts(node);
  if (!parts) return node;
  const opts = mopts(cfg);
  const mat = Mx(parts.mat.rows, { aug: parts.mat.aug });
  return { ...node, det: true, factor: parts.factor, value: mat, detValue: simp(mul(parts.factor, ndet(mat.rows))), opts };
}

function judgeDet(cfg, prev, node, state) {
  const opts = mopts(cfg);
  const P = prev.det ? prev : detLine(prev, cfg);
  const target = state.detA ??= simp(mul(P.factor ?? ONE, ndet(P.value.rows)));
  // A number: the determinant itself.
  if (!node.ops.length && node.value?.k === 's' && !node.body?.op?.startsWith?.('det') && !detParts(node)) {
    if (!sameScalar(node.value.n, target, opts)) {
      const diag = diagnoseLine('rowops', prev, node, cfg, (c, n) => c.value?.k === 's' && sameScalar(c.value.n, n.value.n, opts));
      return wrongV(node, 'Ce n\'est pas la valeur du déterminant.', diag);
    }
    const fin = finalNumber(cfg, node);
    return fin === true ? { kind: 'done', node } : { kind: 'stay', node, message: fin };
  }
  let D = detLine(node, cfg);
  let ops = node.ops;
  if (ops.length) {
    for (const op of ops) { const why = legal(op, P.value.rows, cfg, opts); if (why) return { kind: 'form', node, message: why }; }
    const rows = ops.reduce((r, op) => applyRowOp(r, op), P.value.rows);
    const factor = ops.reduce((f, op) => simp(div(f, detFactorN(op))), P.factor);
    if (!D.det) D = { ...node, det: true, factor, value: Mx(rows, { aug: P.value.aug }) };
    else if (!sameValue(D.value, Mx(rows), opts)) return wrongV(D, `Ta matrice n'est pas le résultat de ${ops.map(opReadable).join(' ; ')}.`, diagnose(cfg, P, D, ops));
  } else {
    if (!D.det) return { kind: 'form', node, message: 'Écris la ligne comme « facteur · det[[…]] », ou la valeur du déterminant.' };
    if (sameValue(D.value, P.value, opts) && sameScalar(D.factor, P.factor, opts)) return { kind: 'same', node: D, message: 'Avance d\'au moins une étape.' };
    const op = identifyOp(P.value.rows, D.value.rows, opts);
    if (!op && !sameValue(D.value, P.value, opts)) return wrongV(D, 'Je ne reconnais pas une opération sur les lignes de la matrice précédente.', diagnose(cfg, P, D, candidateOps(P.value.rows, opts)));
    ops = op ? [op] : [];
  }
  const want = ops.reduce((f, op) => simp(div(f, detFactorN(op))), P.factor);
  if (!sameScalar(D.factor, want, opts)) {
    return wrongV(D, `Le facteur devant det ne suit pas l'opération : il faut ${toTextN(want)}.`, diagnose(cfg, P, D, ops));
  }
  D = { ...D, ops };
  return { kind: 'ok', node: D };
}

const toTextN = (n) => { const q = exactValue(n); return q ? String(q).replace('-', '−') : 'un autre facteur'; };
const detFactorN = (op) => (op.kind === 'swap' ? qn(-1) : op.kind === 'scale' ? op.k : op.kind === 'combo' ? op.c : ONE);

// ---------- the judge ----------

export function judgeLine(cfg, prev, input, state = {}) {
  const read = readMat(cfg, input);
  if (read.error) return read.error;
  const node = read.node;
  if (cfg.track === 'det') return judgeDet(cfg, prev, node, state);
  const opts = mopts(cfg);
  const P = prev.value;
  if (!isMatrix(P)) return { kind: 'parse', message: 'La ligne précédente n\'est pas une matrice.' };
  let out = node;
  if (node.ops.length) {
    for (const op of node.ops) {
      const why = legal(op, P.rows, cfg, opts);
      if (why) return { kind: 'form', node, message: why };
      const k = dividesByParam(op, cfg, opts);
      if (k) {
        const diag = { rules: ['l_param_divide_zero'], ambiguous: 1, ctx: { k } };
        return wrongV(node, 'Tu multiplies une ligne par une expression du paramètre, qui peut valoir 0 : traite ce cas à part.', diag);
      }
    }
    const rows = node.ops.reduce((r, op) => applyRowOp(r, op), P.rows);
    const R = Mx(rows, { aug: P.aug });
    if (node.value) {
      if (!isMatrix(node.value) || node.value.rows.length !== rows.length || node.value.rows[0].length !== rows[0].length) {
        return { kind: 'parse', node, message: `Après les opérations, écris une matrice ${rows.length}×${rows[0].length}.` };
      }
      if (!sameValue(node.value, R, opts)) {
        return wrongV(node, `Ta matrice n'est pas le résultat de ${node.ops.map(opReadable).join(' ; ')}.`, diagnose(cfg, prev, node, node.ops));
      }
    }
    out = { ...node, value: R };
  } else {
    const V = node.value;
    if (!isMatrix(V)) return { kind: 'form', node, message: 'Écris une opération (L2 ← L2 − 3L1) ou la matrice obtenue.' };
    if (V.rows.length !== P.rows.length || V.rows[0].length !== P.rows[0].length) {
      return { kind: 'parse', node, message: `La matrice doit rester de taille ${P.rows.length}×${P.rows[0].length}.` };
    }
    if (P.aug && !V.aug) out = { ...node, value: { ...V, aug: P.aug } };
    if (sameValue(V, P, opts)) return { kind: 'same', node: out, message: 'Avance d\'au moins une étape.' };
    const op = identifyOp(P.rows, V.rows, opts);
    if (op) {
      const why = legal(op, P.rows, cfg, opts);
      if (why) return { kind: 'form', node, message: why };
      const k = dividesByParam(op, cfg, opts);
      if (k) return wrongV(node, 'Tu as multiplié une ligne par une expression du paramètre, qui peut valoir 0 : traite ce cas à part.', { rules: ['l_param_divide_zero'], ambiguous: 1, ctx: { k } });
      out = { ...out, inferred: [op] };
    } else if (!(cfg.multi && rowEquivalentV(P, V, cfg))) {
      const message = cfg.multi
        ? 'Cette matrice n\'est pas équivalente à la précédente : une opération a changé l\'ensemble des solutions.'
        : 'Je ne reconnais pas une seule opération élémentaire : fais une opération par ligne.';
      return wrongV(out, message, diagnose(cfg, prev, out, candidateOps(P.rows, opts)));
    }
  }
  return goalReached(cfg, out.value) ? { kind: 'done', node: out } : { kind: 'ok', node: out };
}

export { S };

// ---------- the menu of the « choose the action » mode (level 3) ----------

// From the student's matrix: the operations that clear an entry under or
// above a pivot (valid), the same with the wrong sign, and an operation
// that would undo a zero already obtained.
ACTIONS.rowops = (prev, cfg) => {
  const v = prev?.value;
  if (!isMatrix(v) || cfg.track === 'det' && v.k !== 'm') return [];
  const opts = mopts(cfg);
  const rows = v.rows;
  const cols = colsOf(cfg, v);
  const out = [];
  const ops = candidateOps(rows.map((r) => r.slice(0, cols)), opts)
    .filter((op) => !cfg.lowerOnly || op.j < op.i);
  const forward = ops.filter((op) => op.i > op.j);
  const useful = (cfg.goal === 'rref' ? ops : forward).slice(0, 3);
  for (const op of useful) out.push({ id: `op${out.length}`, label: opReadable(op), valid: true, op });
  // A pivot to bring to 1 (reduced form).
  if (cfg.goal === 'rref') {
    rows.forEach((r, i) => {
      const c = r.slice(0, cols).findIndex((x) => !isZeroScalar(x, opts));
      if (c >= 0 && !sameScalar(r[c], ONE, opts) && out.length < 4) {
        const op = { kind: 'scale', i, k: simp(div(ONE, r[c])) };
        out.push({ id: `op${out.length}`, label: opReadable(op), valid: true, op });
      }
    });
  }
  // A zero pivot: exchange.
  const firstNon = rows.map((r) => r.slice(0, cols).findIndex((x) => !isZeroScalar(x, opts)));
  for (let i = 0; i + 1 < rows.length; i++) {
    if (firstNon[i] < 0 || (firstNon[i + 1] >= 0 && firstNon[i + 1] < firstNon[i])) {
      const op = { kind: 'swap', i, j: i + 1 };
      if (!cfg.lowerOnly) out.push({ id: `sw${i}`, label: opReadable(op), valid: true, op });
      break;
    }
  }
  const wrong = useful[0] ?? ops[0];
  if (wrong) {
    const bad = { ...wrong, k: simp(neg(wrong.k)) };
    out.push({ id: 'sign', label: opReadable(bad), valid: false, rule: 'l_rowop_sign', why: 'Avec ce signe, la case ne devient pas 0 : elle double.' });
  }
  if (!out.some((o) => o.valid)) out.push({ id: 'done', label: 'C\'est déjà échelonné', valid: true });
  return out;
};

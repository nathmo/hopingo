// Tables (spec §5.2 `iter`, §6 `table`, step U1): each cell is judged from
// the student's own cells (error carried forward), like a line from the
// previous line.
//
// item = {type:'table', table: {cols: [label], rows: [{id, label, cells: [cell]}],
//         root?: cell}, judge: {kind:'iter', phi}, answers: {rowId: [text], root?}, then?}
// cell = {given: text} | {input: true, kind?: 'num'|'tf'} | null (empty)
// phi:
//   {kind:'horner', root, coeffs}   rows coef (aₖ), prod (a·bₖ₋₁), b; b₀ = a₀,
//                                   bₖ = aₖ + a·bₖ₋₁; the last b is P(a)
//   {kind:'horner-repeat', root, coeffs, passes}
//                                   rows coef, b1 … bm: Horner in a again on
//                                   the quotient of the previous row
//   {kind:'truth', letters, columns: [formula | null]}
//                                   rows are the values of the letters
//   {kind:'grid', xs, ys, pred}     cell (x, y): is pred(x, y) true?
// checkTable(item, values) → {ok, cells: {rowId: [true|false|null]}, rule?, message?}

import { Q } from '../math/rational.js';
import { tryParse, parse } from '../cas/parse.js';
import { exactValue } from '../cas/normal.js';
import { mapNode, lit } from '../cas/ast.js';
import { lexicon, parseFormula, truthOf } from '../cas/logic.js';
import { closedHolds } from '../cas/sets.js';

export const num = (t) => {
  if (t === null || t === undefined || String(t).trim() === '') return null;
  const n = tryParse(String(t));
  return n ? exactValue(n) : null;
};

const TRUE = new Set(['V', 'v', 'vrai', '1', 'T', 'true']);
const FALSE = new Set(['F', 'f', 'faux', '0', 'false']);
export const bool = (t) => (TRUE.has(String(t).trim()) ? true : FALSE.has(String(t).trim()) ? false : null);

// The student's value of each cell (given cells included).
function grid(item, values) {
  const out = {};
  for (const r of item.table.rows) {
    out[r.id] = r.cells.map((c, j) => {
      if (!c) return null;
      if (c.given !== undefined) return c.given;
      return values?.[r.id]?.[j] ?? null;
    });
  }
  return out;
}

const eqQ = (a, b) => !!a && !!b && a.eq(b);

function checkHorner(item, values) {
  const phi = item.judge.phi;
  const g = grid(item, values);
  const rootCell = item.table.root;
  const rootText = rootCell?.given ?? values?.root ?? null;
  const root = num(rootText);
  const a = Q.of(num(phi.root));
  const cells = {};
  let rule = null;
  let message = null;
  const coefs = phi.coeffs.map((c) => num(c));
  const n = coefs.length;
  const mark = (row, j, ok) => { (cells[row] ||= Array(n).fill(null))[j] = ok; };
  // The root.
  if (rootCell?.input) {
    cells.root = eqQ(root, a);
    if (!cells.root && root && root.eq(a.neg())) { rule = 'g0_horner_sign'; message = `Pour diviser par x − (${a}), on utilise ${a}.`; }
  }
  // The coefficients.
  const coefRow = g.coef.map(num);
  const coefInputs = item.table.rows.find((r) => r.id === 'coef').cells.some((c) => c?.input);
  if (coefInputs) {
    coefRow.forEach((c, j) => mark('coef', j, eqQ(c, coefs[j])));
    const nonzero = coefs.filter((c) => c.n !== 0);
    if (nonzero.length < n && nonzero.every((c, j) => eqQ(coefRow[j], c))) { rule ||= 'g0_horner_zero'; message ||= 'Il manque un coefficient nul : chaque puissance de x a sa case, même avec un 0.'; }
  }
  const r = root ?? a;
  if (phi.kind === 'horner') {
    const prod = g.prod.map(num);
    const b = g.b.map(num);
    const prodIn = item.table.rows.find((x) => x.id === 'prod').cells;
    const bIn = item.table.rows.find((x) => x.id === 'b').cells;
    for (let k = 0; k < n; k++) {
      if (k >= 1 && prodIn[k]?.input) mark('prod', k, eqQ(prod[k], b[k - 1] ? r.mul(b[k - 1]) : null));
      if (bIn[k]?.input) {
        const want = k === 0 ? coefRow[0] : coefRow[k] && prod[k] ? coefRow[k].add(prod[k]) : null;
        mark('b', k, eqQ(b[k], want));
      }
    }
  } else {
    let prevRow = coefRow;
    for (let p = 1; p <= phi.passes; p++) {
      const id = `b${p}`;
      const row = g[id].map(num);
      const ins = item.table.rows.find((x) => x.id === id).cells;
      const len = n - p + 1;
      for (let k = 0; k < len; k++) {
        if (!ins[k]?.input) continue;
        const want = k === 0 ? prevRow[0] : prevRow[k] && row[k - 1] ? prevRow[k].add(r.mul(row[k - 1])) : null;
        mark(id, k, eqQ(row[k], want));
      }
      prevRow = row.slice(0, len - 1);
    }
  }
  const ok = Object.values(cells).every((x) => (Array.isArray(x) ? x.every((y) => y !== false) : x !== false));
  return { ok: ok && allFilled(item, values), cells, rule, message };
}

function allFilled(item, values) {
  for (const r of item.table.rows) {
    for (let j = 0; j < r.cells.length; j++) {
      const c = r.cells[j];
      if (c?.input && (values?.[r.id]?.[j] ?? '').toString().trim() === '') return false;
    }
  }
  if (item.table.root?.input && !String(values?.root ?? '').trim()) return false;
  return true;
}

function checkTruth(item, values) {
  const phi = item.judge.phi;
  const lex = lexicon({ letters: phi.letters });
  const forms = phi.columns.map((f) => (f ? parseFormula(f, lex) : null));
  const cells = {};
  for (const r of item.table.rows) {
    const env = r.env;
    cells[r.id] = r.cells.map((c, j) => {
      if (!c?.input) return null;
      const v = bool(values?.[r.id]?.[j]);
      return v !== null && v === truthOf(forms[j], env);
    });
  }
  const ok = Object.values(cells).every((row) => row.every((x) => x !== false)) && allFilled(item, values);
  return { ok, cells, rule: null };
}

function checkGrid(item, values) {
  const phi = item.judge.phi;
  const pred = parse(phi.pred);
  const cells = {};
  item.table.rows.forEach((r, i) => {
    cells[r.id] = r.cells.map((c, j) => {
      if (!c?.input) return null;
      const v = bool(values?.[r.id]?.[j]);
      const env = { x: phi.xs[i], y: phi.ys[j] };
      const at = mapNode(pred, (n) => (n.t === 'sym' && n.name in env ? { t: 'paren', e: lit(new Q(env[n.name])) } : n));
      return v !== null && v === closedHolds(at, {});
    });
  });
  const ok = Object.values(cells).every((row) => row.every((x) => x !== false)) && allFilled(item, values);
  return { ok, cells, rule: null };
}

export function checkTable(item, values) {
  switch (item.judge.phi.kind) {
    case 'horner': case 'horner-repeat': return checkHorner(item, values);
    case 'truth': return checkTruth(item, values);
    case 'grid': return checkGrid(item, values);
    default: throw new Error(`table: phi inconnu ${item.judge.phi.kind}`);
  }
}

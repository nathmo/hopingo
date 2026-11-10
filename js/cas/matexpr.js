// Lines of the linear-algebra judges (step U3): matrices, vectors, row
// operations, named matrices and matrix expressions. Entries are js/cas
// nodes (numbers, a parameter a or λ, √2), so the same code serves ℚ,
// ℚ(a) and the orthogonal matrices with roots.
//
// Text of a line (what the grid and the keypad write):
//   [[1,2,-1|3],[2,5,1|7]]          matrix, « | » before the right-hand side
//   (1 ; -2 ; 3)                     column vector
//   (1 ; 0), (0 ; 1)  {…}  Span{…}   a family of vectors
//   L2 ← L2 - 2L1 ; L3 ← L3 + L1    row operations (also <-, ↔, <->)
//   L2 ← L2 - 2L1 : [[…]]           operations and the matrix they give
//   L = [[…]] ; U = [[…]]           named matrices (factorisations)
//   A = P·D·P^(-1)    2A - I    E_1^(-1)E_2^(-1)    diag(1, 3)    Aᵀ  A⁻¹
//   -4·det[[2,3],[3,1]]    (2-λ)·det(A-λI)    a scalar with determinants
// A label before « = » (T(e_2) = …, x = …, det A = …) is kept as text.
//
// parseMatLine(text, opts) → line {ops, assigns, body, label}   (throws ParseError)
// evalAst(ast, env, opts) → value: {k:'s', n} | {k:'m', rows, aug?, vec?} | {k:'list', items}
// opts: {vars: [params], complex, names: {A: text}}

import { Q } from '../math/rational.js';
import { parse, ParseError } from './parse.js';
import { toText } from './print.js';
import { toMathML } from './mathml.js';
import {
  num, sym, add, sub, mul, div, neg, pow, lit, sqrt as sqrtNode, stripParen, numValue, contains,
} from './ast.js';
import { normalize, equalExact, exactValue, pretty } from './normal.js';
import { evalFloat } from './numeric.js';
import { close } from './equiv.js';
import { polyOf } from './polyx.js';

const fail = (msg) => { throw new ParseError(msg, 0); };

// ---------- scalars ----------

export const ZERO = num(0);
export const ONE = num(1);
export const qn = (x) => lit(Q.of(x));

// A simpler node with the same value (rational expressions are normalised).
export function simp(n) {
  const v = exactValue(n);
  if (v) return lit(v);
  if (!contains(n, isRadical)) { try { return normalize(n); } catch { return n; } }
  if (!contains(n, (x) => x.t === 'sym')) {
    const r = radicalNode(evalFloat(n, {}));
    if (r) return r;
  }
  try { return pretty(n); } catch { return n; }
}

const isRadical = (x) => x.t === 'sqrt' || x.t === 'root' || x.t === 'const' || (x.t === 'pow' && !numValue(x.e)?.isInt?.());

// ±(a/b)·√c for a float, or null (c square-free, b ≤ 10⁴).
export function radicalNode(x) {
  if (!Number.isFinite(x)) return null;
  const y = x * x;
  // Continued fraction of y.
  let [h0, h1, k0, k1] = [0, 1, 1, 0];
  let r = y;
  let p = null;
  let qd = null;
  for (let i = 0; i < 20; i++) {
    const a = Math.floor(r);
    [h0, h1] = [h1, a * h1 + h0];
    [k0, k1] = [k1, a * k1 + k0];
    if (k1 > 10000) break;
    if (Math.abs(h1 / k1 - y) <= 1e-9 * (1 + y)) { p = h1; qd = k1; break; }
    if (r - a < 1e-12) break;
    r = 1 / (r - a);
  }
  if (p === null) return null;
  let m = p * qd;
  let out = 1;
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; out *= f; }
  const coef = new Q(x < 0 ? -out : out, qd);
  if (m === 1) return lit(coef);
  const root = sqrtNode(num(m));
  const top = Math.abs(coef.n) === 1 ? root : mul(num(Math.abs(coef.n)), root);
  const body = coef.d === 1 ? top : div(top, num(coef.d));
  return coef.n < 0 ? neg(body) : body;
}

const SAMPLE = [0.37, -1.29, 2.03, 0.81, -0.53];
// Section eig: letters that are whole numbers (opts.ints: the k of
// Aᵏ = PDᵏP⁻¹, where (−2)ᵏ has no real value at k = 0.37).
const INT_SAMPLE = [3, 2, 5, 4, 7];

// Equal scalars: exactly when the CAS decides, else in floating point at a
// few values of the parameters. With complex entries, as polynomials in i.
export function sameScalar(a, b, opts = {}) {
  if (opts.complex) {
    const p = polyOf(sub(a, b), { complex: true });
    if (p) return p.isZero;
  }
  const e = equalExact(a, b);
  if (e !== null) return e;
  const vars = opts.vars || [];
  let valid = 0;
  for (let s = 0; s < 4; s++) {
    const env = {};
    vars.forEach((v, i) => { env[v] = SAMPLE[(s + i) % SAMPLE.length]; });
    for (const v of opts.ints || []) env[v] = INT_SAMPLE[s % INT_SAMPLE.length];
    const x = evalFloat(a, env);
    const y = evalFloat(b, env);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    valid++;
    if (!close(x, y) && Math.abs(x - y) > 1e-9) return false;
  }
  return valid > 0;
}

export const isZeroScalar = (n, opts) => sameScalar(n, ZERO, opts);

// The exact rational value of a scalar, or null.
export const qOf = (n) => exactValue(n);

// ---------- values ----------

export const S = (n) => ({ k: 's', n });
export const Mx = (rows, extra = {}) => ({ k: 'm', rows, ...extra });
export const isVec = (v) => v.k === 'm' && v.rows.every((r) => r.length === 1);
export const fromQ = (A, extra) => Mx(A.map((r) => r.map((x) => lit(Q.of(x)))), extra);
export const vecOf = (items) => Mx(items.map((x) => [x]), { vec: true });

// Q entries, or null (parameters, roots).
export function toQ(v) {
  if (v.k !== 'm') return null;
  const out = [];
  for (const r of v.rows) {
    const row = [];
    for (const x of r) { const q = exactValue(x); if (!q) return null; row.push(q); }
    out.push(row);
  }
  return out;
}

export function sameValue(a, b, opts = {}) {
  if (!a || !b) return false;
  if (a.k === 's' && b.k === 's') return sameScalar(a.n, b.n, opts);
  if (a.k === 'list' && b.k === 'list') return a.items.length === b.items.length && a.items.every((x, i) => sameValue(x, b.items[i], opts));
  if (a.k !== 'm' || b.k !== 'm') return false;
  if (a.rows.length !== b.rows.length) return false;
  return a.rows.every((r, i) => r.length === b.rows[i].length && r.every((x, j) => sameScalar(x, b.rows[i][j], opts)));
}

export const dimsOf = (v) => [v.rows.length, v.rows[0]?.length ?? 0];
export const tr = (v) => Mx(v.rows[0].map((_, j) => v.rows.map((r) => r[j])));

export function mmul(a, b) {
  if (a.k === 's' && b.k === 's') return S(simp(mul(a.n, b.n)));
  if (a.k === 's') return Mx(b.rows.map((r) => r.map((x) => simp(mul(a.n, x)))), { vec: b.vec });
  if (b.k === 's') return Mx(a.rows.map((r) => r.map((x) => simp(mul(x, b.n)))), { vec: a.vec });
  const [m, p] = dimsOf(a);
  const [p2, n] = dimsOf(b);
  if (p !== p2) fail(`Produit impossible : ${m}×${p} fois ${p2}×${n}.`);
  const rows = [];
  for (let i = 0; i < m; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      let s = ZERO;
      for (let k = 0; k < p; k++) s = add(s, mul(a.rows[i][k], b.rows[k][j]));
      row.push(simp(s));
    }
    rows.push(row);
  }
  return Mx(rows, { vec: n === 1 && b.vec });
}

export function madd(a, b, sign = 1) {
  const op = sign > 0 ? add : sub;
  if (a.k === 's' && b.k === 's') return S(simp(op(a.n, b.n)));
  if (a.k === 's' || b.k === 's') fail('On ne peut pas additionner un nombre et une matrice.');
  const [m, n] = dimsOf(a);
  const [m2, n2] = dimsOf(b);
  if (m !== m2 || n !== n2) fail(`Somme impossible : ${m}×${n} et ${m2}×${n2}.`);
  return Mx(a.rows.map((r, i) => r.map((x, j) => simp(op(x, b.rows[i][j])))), { vec: a.vec });
}

export const identityV = (n) => Mx(Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? ONE : ZERO))));
export const diagV = (items) => Mx(items.map((x, i) => items.map((_, j) => (i === j ? x : ZERO))));

// Determinant by cofactors along the sparsest row (nodes; n ≤ 6).
export function ndet(rows) {
  const n = rows.length;
  if (rows.some((r) => r.length !== n)) fail('Le déterminant demande une matrice carrée.');
  if (n === 0) return ONE;
  if (n === 1) return rows[0][0];
  if (n === 2) return simp(sub(mul(rows[0][0], rows[1][1]), mul(rows[0][1], rows[1][0])));
  const zeros = (r) => r.filter((x) => isZeroScalar(x)).length;
  let best = 0;
  for (let i = 1; i < n; i++) if (zeros(rows[i]) > zeros(rows[best])) best = i;
  let s = ZERO;
  for (let j = 0; j < n; j++) {
    const a = rows[best][j];
    if (isZeroScalar(a)) continue;
    const minor = rows.filter((_, i) => i !== best).map((r) => r.filter((_, c) => c !== j));
    const t = mul(a, ndet(minor));
    s = (best + j) % 2 ? sub(s, t) : add(s, t);
  }
  return simp(s);
}

// Inverse by Gauss-Jordan on nodes (null if singular).
export function ninverse(v, opts = {}) {
  const n = v.rows.length;
  const M = v.rows.map((r, i) => [...r, ...Array.from({ length: n }, (_, j) => (i === j ? ONE : ZERO))]);
  for (let c = 0; c < n; c++) {
    const p = M.findIndex((r, i) => i >= c && !isZeroScalar(r[c], opts));
    if (p < 0) return null;
    [M[c], M[p]] = [M[p], M[c]];
    const piv = M[c][c];
    M[c] = M[c].map((x) => simp(div(x, piv)));
    for (let i = 0; i < n; i++) {
      if (i === c || isZeroScalar(M[i][c], opts)) continue;
      const f = M[i][c];
      M[i] = M[i].map((x, j) => simp(sub(x, mul(f, M[c][j]))));
    }
  }
  return Mx(M.map((r) => r.slice(n)));
}

// ---------- row operations on node matrices ----------

// op: {kind:'swap', i, j} | {kind:'scale', i, k} | {kind:'add', i, j, k} | {kind:'combo', i, c, j, k}
// (k and c are nodes; i, j count from 0).
export function applyRowOp(rows, op) {
  const R = rows.map((r) => [...r]);
  switch (op.kind) {
    case 'swap': [R[op.i], R[op.j]] = [R[op.j], R[op.i]]; break;
    case 'scale': R[op.i] = R[op.i].map((x) => simp(mul(op.k, x))); break;
    case 'add': R[op.i] = R[op.i].map((x, c) => simp(add(x, mul(op.k, rows[op.j][c])))); break;
    case 'combo': R[op.i] = R[op.i].map((x, c) => simp(add(mul(op.c, x), mul(op.k, rows[op.j][c])))); break;
    default: fail('Opération inconnue.');
  }
  return R;
}

const rowsSame = (a, b, opts) => a.every((x, c) => sameScalar(x, b[c], opts));
const rowZero = (a, opts) => a.every((x) => isZeroScalar(x, opts));

// k with a = k·b, or null (nodes).
function nratio(a, b, opts) {
  const c = b.findIndex((x) => !isZeroScalar(x, opts));
  if (c < 0) return null;
  const k = simp(div(a[c], b[c]));
  return a.every((x, i) => sameScalar(x, mul(k, b[i]), opts)) ? k : null;
}

// One elementary operation turning A into B (rows of nodes), or null.
export function identifyOp(A, B, opts = {}) {
  if (A.length !== B.length || A.some((r, i) => r.length !== B[i].length)) return null;
  const diff = [];
  for (let i = 0; i < A.length; i++) if (!rowsSame(A[i], B[i], opts)) diff.push(i);
  if (diff.length === 2) {
    const [i, j] = diff;
    return rowsSame(A[i], B[j], opts) && rowsSame(A[j], B[i], opts) ? { kind: 'swap', i, j } : null;
  }
  if (diff.length !== 1) return null;
  const i = diff[0];
  if (rowZero(A[i], opts)) return null;
  const k = nratio(B[i], A[i], opts);
  if (k && !isZeroScalar(k, opts)) return { kind: 'scale', i, k };
  const d = B[i].map((x, c) => simp(sub(x, A[i][c])));
  for (let j = 0; j < A.length; j++) {
    if (j === i || rowZero(A[j], opts)) continue;
    const kk = nratio(d, A[j], opts);
    if (kk && !isZeroScalar(kk, opts)) return { kind: 'add', i, j, k: kk };
  }
  // Lᵢ ← cLᵢ + kLⱼ: solve on two columns, check on all.
  for (let j = 0; j < A.length; j++) {
    if (j === i || rowZero(A[j], opts)) continue;
    const x = A[i];
    const y = A[j];
    for (let p = 0; p < x.length; p++) {
      for (let r = p + 1; r < x.length; r++) {
        const det2 = simp(sub(mul(x[p], y[r]), mul(x[r], y[p])));
        if (isZeroScalar(det2, opts)) continue;
        const c = simp(div(sub(mul(B[i][p], y[r]), mul(B[i][r], y[p])), det2));
        const k = simp(div(sub(mul(x[p], B[i][r]), mul(x[r], B[i][p])), det2));
        const ok = B[i].every((v, t) => sameScalar(v, add(mul(c, x[t]), mul(k, y[t])), opts));
        if (ok && !isZeroScalar(c, opts) && !isZeroScalar(k, opts) && !sameScalar(c, ONE, opts)) return { kind: 'combo', i, c, j, k };
        p = x.length;
        break;
      }
    }
  }
  return null;
}

// Echelon shape on nodes: a pivot is an entry not identically zero.
export function nIsEchelon(rows, { cols, opts } = {}) {
  let last = -1;
  let zeroSeen = false;
  const n = cols ?? rows[0]?.length ?? 0;
  for (const r of rows) {
    const c = r.slice(0, n).findIndex((x) => !isZeroScalar(x, opts));
    if (c < 0) { zeroSeen = true; continue; }
    if (zeroSeen || c <= last) return false;
    last = c;
  }
  return true;
}

export function nIsRref(rows, { cols, opts } = {}) {
  if (!nIsEchelon(rows, { cols, opts })) return false;
  const n = cols ?? rows[0]?.length ?? 0;
  for (let i = 0; i < rows.length; i++) {
    const c = rows[i].slice(0, n).findIndex((x) => !isZeroScalar(x, opts));
    if (c < 0) continue;
    if (!sameScalar(rows[i][c], ONE, opts)) return false;
    for (let k = 0; k < rows.length; k++) if (k !== i && !isZeroScalar(rows[k][c], opts)) return false;
  }
  return true;
}

export const pivotsOf = (rows, { cols, opts } = {}) => rows
  .map((r) => r.slice(0, cols ?? r.length).findIndex((x) => !isZeroScalar(x, opts)))
  .filter((c) => c >= 0);

// ---------- tokens ----------

const SUBDIGITS = '₀₁₂₃₄₅₆₇₈₉';
const SUPMAP = { '⁻¹': '^(-1)', 'ᵀ': '^T', '²': '^2', '³': '^3' };

export function normalizeMatText(text) {
  let t = String(text ?? '')
    .replace(/[−–]/g, '-').replace(/ /g, ' ')
    .replace(/<->|⇔/g, '↔').replace(/<-|⟵|←/g, '←')
    .replace(/\*/g, '·').replace(/×/g, '·')
    .replace(/[₀-₉]/g, (c) => `_${SUBDIGITS.indexOf(c)}`)
    .replace(/_(\d)_(\d)/g, '_$1$2');
  for (const [k, v] of Object.entries(SUPMAP)) t = t.split(k).join(v);
  return t.trim();
}

// Split at depth 0 on any char of seps.
export function splitTop(text, seps) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const c of text) {
    if ('([{'.includes(c)) depth++;
    if (')]}'.includes(c)) depth--;
    if (depth === 0 && seps.includes(c)) { out.push(cur); cur = ''; continue; }
    cur += c;
  }
  out.push(cur);
  return out;
}

function matching(text, i) {
  const open = text[i];
  const close = { '(': ')', '[': ']', '{': '}' }[open];
  let depth = 0;
  for (let k = i; k < text.length; k++) {
    if ('([{'.includes(text[k])) depth++;
    if (')]}'.includes(text[k])) depth--;
    if (depth === 0) {
      if (text[k] !== close) fail(`Parenthèse mal fermée : « ${text[k]} ».`);
      return k;
    }
  }
  fail(`Il manque « ${close} ».`);
}

const FNS = ['det', 'diag', 'tr', 'Span', 'Vect', 'span', 'vect', 'rang', 'rg'];

function tokenizeM(text) {
  const toks = [];
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (/\s/.test(c)) { i++; continue; }
    if (c === '[') {
      const j = matching(text, i);
      const inner = text.slice(i + 1, j).trim();
      toks.push({ k: 'mat', text: inner });
      i = j + 1;
      continue;
    }
    if (c === '(') {
      const j = matching(text, i);
      const inner = text.slice(i + 1, j);
      toks.push(splitTop(inner, ';').length > 1 ? { k: 'vec', text: inner } : { k: 'grp', text: inner });
      i = j + 1;
      continue;
    }
    if (c === '{') {
      const j = matching(text, i);
      toks.push({ k: 'set', text: text.slice(i + 1, j) });
      i = j + 1;
      continue;
    }
    const word = /^[A-Za-zΣΛ][A-Za-z]*/.exec(text.slice(i));
    if (word) {
      const w = word[0];
      const fnName = FNS.find((f) => w === f);
      if (fnName) { toks.push({ k: 'fn', s: fnName.toLowerCase() === 'vect' ? 'span' : fnName.toLowerCase() }); i += w.length; continue; }
      // One letter at a time: AB is A·B, 2a is 2·a.
      let s = text[i];
      i++;
      const subm = /^_(\d+|\([^)]*\)|[a-z])/.exec(text.slice(i));
      if (subm) { s += `_${subm[1].replace(/^\(|\)$/g, '')}`; i += subm[0].length; }
      toks.push(/^[A-ZΣΛ]/.test(s) ? { k: 'name', s } : { k: 'sym', s });
      continue;
    }
    if (/[α-ωλμθ]/.test(c)) { toks.push({ k: 'sym', s: c }); i++; continue; }
    const n = /^\d+/.exec(text.slice(i));
    if (n) { toks.push({ k: 'num', s: n[0] }); i += n[0].length; continue; }
    if (c === '√') { toks.push({ k: 'op', s: '√' }); i++; continue; }
    if ('+-·/^,='.includes(c)) { toks.push({ k: 'op', s: c }); i++; continue; }
    if (c === 'π') { toks.push({ k: 'sym', s: 'π' }); i++; continue; }
    fail(`Je ne sais pas lire « ${c} » ici.`);
  }
  return toks;
}

// ---------- parsing expressions ----------

// Entries and scalar groups go to the CAS parser.
const scalarNode = (text, opts) => {
  const t = text.trim();
  if (!t) fail('Une case est vide.');
  if (/[[\]]/.test(t)) fail('Une case contient une matrice.');
  return parse(t, { vars: opts.vars, complex: opts.complex });
};

// [[a,b|c],[d,e|f]] or [a, b, c] (one row).
function matLiteral(inner, opts) {
  const parts = inner.startsWith('[') ? splitTop(inner, ',').map((s) => s.trim()) : [`[${inner}]`];
  let aug = null;
  const rows = parts.map((p) => {
    if (!p.startsWith('[') || !p.endsWith(']')) fail('Écris chaque ligne entre crochets : [[1, 2], [3, 4]].');
    const body = p.slice(1, -1);
    const halves = splitTop(body, '|');
    if (halves.length > 2) fail('Une seule barre | par ligne.');
    const left = splitTop(halves[0], ',');
    if (halves.length === 2) {
      if (aug !== null && aug !== left.length) fail('La barre | doit être au même endroit dans chaque ligne.');
      aug = left.length;
    }
    const cells = [...left, ...(halves.length === 2 ? splitTop(halves[1], ',') : [])];
    return cells.map((c) => scalarNode(c, opts));
  });
  if (rows.some((r) => r.length !== rows[0].length)) fail('Toutes les lignes doivent avoir le même nombre de cases.');
  return { op: 'lit', rows, aug };
}

class P {
  constructor(toks, opts) { this.t = toks; this.i = 0; this.opts = opts; }
  peek(o = 0) { return this.t[this.i + o]; }
  next() { return this.t[this.i++]; }
  isOp(s, o = 0) { const t = this.peek(o); return t && t.k === 'op' && t.s === s; }

  list() {
    const items = [this.sum()];
    while (this.isOp(',')) { this.next(); items.push(this.sum()); }
    return items.length > 1 ? { op: 'list', items } : items[0];
  }

  sum() {
    let left;
    if (this.isOp('-')) { this.next(); left = { op: 'neg', e: this.product() }; } else if (this.isOp('+')) { this.next(); left = this.product(); } else left = this.product();
    while (this.isOp('+') || this.isOp('-')) {
      const s = this.next().s;
      const right = this.product();
      left = { op: s === '+' ? 'add' : 'sub', a: left, b: right };
    }
    return left;
  }

  startsFactor() {
    const t = this.peek();
    if (!t) return false;
    return ['mat', 'vec', 'grp', 'set', 'name', 'sym', 'num', 'fn'].includes(t.k) || (t.k === 'op' && t.s === '√');
  }

  product() {
    let left = this.power();
    for (;;) {
      if (this.isOp('·')) { this.next(); left = { op: 'mul', a: left, b: this.power() }; continue; }
      if (this.isOp('/')) { this.next(); left = { op: 'div', a: left, b: this.power() }; continue; }
      if (this.startsFactor()) { left = { op: 'mul', a: left, b: this.power(), implicit: true }; continue; }
      return left;
    }
  }

  power() {
    let base = this.atom();
    while (this.isOp('^')) {
      this.next();
      const t = this.next();
      if (!t) fail('Il manque l\'exposant.');
      if (t.k === 'name' && (t.s === 'T')) base = { op: 'T', e: base };
      else if (t.k === 'sym' && t.s === 't') base = { op: 'T', e: base };
      else if (t.k === 'grp' && t.text.replace(/\s/g, '') === '-1') base = { op: 'inv', e: base };
      else if (t.k === 'op' && t.s === '-') {
        const n = this.next();
        if (!n || n.k !== 'num') fail('Exposant illisible.');
        base = n.s === '1' ? { op: 'inv', e: base } : { op: 'pow', e: { op: 'inv', e: base }, k: num(Number(n.s)) };
      } else if (t.k === 'num') base = { op: 'pow', e: base, k: num(Number(t.s)) };
      else if (t.k === 'sym') base = { op: 'pow', e: base, k: sym(t.s) };
      else if (t.k === 'grp') base = { op: 'pow', e: base, k: scalarNode(t.text, this.opts) };
      else fail('Exposant illisible.');
    }
    return base;
  }

  atom() {
    const t = this.next();
    if (!t) fail('La ligne s\'arrête trop tôt.');
    switch (t.k) {
      case 'mat': return matLiteral(t.text, this.opts);
      case 'vec': return { op: 'vec', items: splitTop(t.text, ';').map((s) => scalarNode(s, this.opts)) };
      case 'grp': {
        // A group with a matrix inside is an expression; else a scalar.
        if (/[[\]A-ZΣ(;]/.test(t.text.replace(/\b(det|tr|diag)\b/g, ''))) {
          const inner = new P(tokenizeM(t.text), this.opts);
          const e = inner.list();
          if (inner.peek()) fail('Je n\'arrive pas à lire la parenthèse.');
          return { op: 'paren', e };
        }
        return { op: 'num', n: { t: 'paren', e: scalarNode(t.text, this.opts) } };
      }
      case 'set': {
        const inner = new P(tokenizeM(t.text), this.opts);
        const e = inner.list();
        return { op: 'list', items: e.op === 'list' ? e.items : [e], braces: true };
      }
      case 'num': {
        // a/b written with numbers is one fraction (binds tighter than ·).
        if (this.isOp('/') && this.peek(1)?.k === 'num') {
          this.next();
          const d = this.next();
          return { op: 'num', n: lit(new Q(Number(t.s), Number(d.s))) };
        }
        return { op: 'num', n: num(Number(t.s)) };
      }
      case 'sym': {
        if (t.s === 'π') return { op: 'num', n: { t: 'const', name: 'pi' } };
        if (t.s === 'i' && this.opts.complex) return { op: 'num', n: { t: 'const', name: 'i' } };
        const [name, subs] = t.s.split('_');
        if (this.opts.vars && !this.opts.vars.includes(t.s) && !this.opts.vars.includes(name)) fail(`Je ne connais pas la lettre « ${t.s} » ici.`);
        return { op: 'num', n: subs ? sym(name, subs) : sym(name) };
      }
      case 'name': return t.s === 'I' || /^I_\d+$/.test(t.s) ? { op: 'I', n: t.s.includes('_') ? Number(t.s.split('_')[1]) : null } : { op: 'name', name: t.s };
      case 'fn': {
        const a = this.peek();
        if (t.s === 'span') {
          if (!a || (a.k !== 'set' && a.k !== 'grp')) fail('Écris Span{u, v}.');
          return this.atom();
        }
        if (t.s === 'diag') {
          const g = this.next();
          if (!g || g.k !== 'grp') fail('Écris diag(1, 3).');
          return { op: 'diag', items: splitTop(g.text, ',;').map((s) => scalarNode(s, this.opts)) };
        }
        const arg = this.power();
        return { op: t.s === 'rg' ? 'rang' : t.s, e: arg };
      }
      case 'op':
        if (t.s === '√') {
          // √2/2 is (√2)/2: a number right after √ is its whole radicand.
          if (this.peek()?.k === 'num') return { op: 'num', n: sqrtNode(num(Number(this.next().s))) };
          const a = this.atom();
          if (a.op !== 'num') fail('√ s\'applique à un nombre.');
          return { op: 'num', n: sqrtNode(a.n) };
        }
        if (t.s === '-') return { op: 'neg', e: this.power() };
        fail(`Je ne m'attendais pas à « ${t.s} » ici.`);
        break;
      default: fail('Ligne illisible.');
    }
    return null;
  }
}

export function parseExpr(text, opts = {}) {
  const t = normalizeMatText(text);
  const p = new P(tokenizeM(t), opts);
  const e = p.list();
  if (p.peek()) fail(`Je n'arrive pas à lire la fin : « ${p.peek().s ?? p.peek().text ?? ''} ».`);
  return e;
}

// ---------- row operations ----------

const ROW = /^L_?(\d+)$/;

function parseCoef(text, opts) {
  const t = text.replace(/·$/, '').trim();
  if (t === '' || t === '+') return ONE;
  if (t === '-') return qn(-1);
  return scalarNode(t.replace(/^\+/, ''), opts);
}

// « L2 ← L2 - 2L1 », « L1 ↔ L3 », « L2 ← (1/2)L2 », « L2 ← L2/2 », « L3 ← 2L3 - L1 ».
export function parseRowOp(text, opts = {}) {
  const t = text.replace(/\s+/g, '');
  const sw = /^L_?(\d+)↔L_?(\d+)$/.exec(t);
  if (sw) return { kind: 'swap', i: Number(sw[1]) - 1, j: Number(sw[2]) - 1 };
  const m = /^L_?(\d+)←(.+)$/.exec(t);
  if (!m) fail('Écris une opération comme L2 ← L2 − 3L1 ou L1 ↔ L3.');
  const i = Number(m[1]) - 1;
  // Terms of the right side: coefficient · L_k (/ divisor).
  const terms = [];
  let cur = '';
  let depth = 0;
  for (const c of m[2]) {
    if (c === '(') depth++;
    if (c === ')') depth--;
    if (depth === 0 && (c === '+' || c === '-') && cur && !/[·/^(]$/.test(cur)) { terms.push(cur); cur = c; continue; }
    cur += c;
  }
  terms.push(cur);
  const coefs = new Map();
  for (const term of terms) {
    const tm = /^(.*?)L_?(\d+)(?:\/(.+))?$/.exec(term);
    if (!tm) fail(`Je n'arrive pas à lire « ${term} » : écris par exemple 3L1.`);
    let k = parseCoef(tm[1], opts);
    if (tm[3]) k = div(k, scalarNode(tm[3], opts));
    const r = Number(tm[2]) - 1;
    coefs.set(r, coefs.has(r) ? simp(add(coefs.get(r), k)) : simp(k));
  }
  const others = [...coefs.keys()].filter((r) => r !== i);
  if (others.length > 1) fail('Une opération combine au plus deux lignes.');
  const c = coefs.has(i) ? coefs.get(i) : null;
  if (!c) fail(`La ligne ${i + 1} doit apparaître à droite de la flèche.`);
  if (!others.length) return { kind: 'scale', i, k: c };
  const j = others[0];
  const k = coefs.get(j);
  if (sameScalar(c, ONE, opts)) return { kind: 'add', i, j, k };
  return { kind: 'combo', i, c, j, k };
}

// ---------- a whole line ----------

export function parseMatLine(text, opts = {}) {
  const t = normalizeMatText(text);
  if (!t) fail('La ligne est vide.');
  const line = { ops: [], assigns: [], body: null, label: null };
  let rest = t;
  // Operations first, then « : » and what they give.
  if (/^L_?\d+\s*[←↔]/.test(t)) {
    const colon = splitTop(t, ':');
    const opsText = colon[0];
    rest = colon.slice(1).join(':').trim();
    for (const part of splitTop(opsText, ';,').map((s) => s.trim()).filter(Boolean)) line.ops.push(parseRowOp(part, opts));
    if (!rest) return line;
  }
  const parts = splitTop(rest, ';').map((s) => s.trim()).filter(Boolean);
  // « L = … ; U = … »: several named matrices. Else one expression,
  // possibly after a label (T(e_2) = …).
  const named = parts.length > 1 && parts.every((p) => /^[A-ZΣ](_\w+)?\s*=/.test(p));
  if (named) {
    for (const p of parts) {
      const eq = p.indexOf('=');
      line.assigns.push({ name: p.slice(0, eq).trim(), ast: parseExpr(p.slice(eq + 1), opts) });
    }
    return line;
  }
  if (parts.length > 1) fail('Sépare les vecteurs par des virgules, les composantes par « ; » entre parenthèses.');
  const sides = splitTop(rest, '=');
  if (sides.length > 1) {
    line.label = sides.slice(0, -1).join('=').trim();
    line.body = parseExpr(sides[sides.length - 1], opts);
    if (/^[A-ZΣ](_\w+)?$/.test(line.label)) line.assigns.push({ name: line.label, ast: line.body });
  } else line.body = parseExpr(rest, opts);
  return line;
}

// ---------- evaluation ----------

const envCache = new WeakMap();
// The named matrices of a cfg, evaluated once.
export function envOf(cfg = {}) {
  if (envCache.has(cfg)) return envCache.get(cfg);
  const env = {};
  for (const [k, txt] of Object.entries(cfg.names || {})) env[k] = evalAst(parseExpr(txt, cfg), env, cfg);
  envCache.set(cfg, env);
  return env;
}

export function evalAst(ast, env = {}, opts = {}, size = null) {
  const E = (a, s = size) => evalAst(a, env, opts, s);
  switch (ast.op) {
    case 'lit': return Mx(ast.rows, { aug: ast.aug });
    case 'vec': return vecOf(ast.items);
    case 'num': return S(ast.n);
    case 'paren': return E(ast.e);
    case 'name': {
      const v = env[ast.name];
      if (!v) fail(`Je ne connais pas ${ast.name.replace(/_(\w+)/, '$1')} ici.`);
      return v;
    }
    case 'I': {
      const n = ast.n ?? size;
      if (!n) fail('Je ne connais pas la taille de I : écris I_3.');
      return identityV(n);
    }
    case 'diag': return diagV(ast.items);
    case 'list': return { k: 'list', items: ast.items.map((x) => E(x)), braces: ast.braces };
    case 'neg': { const v = E(ast.e); return mmul(S(qn(-1)), v); }
    case 'add': case 'sub': {
      // The size of I comes from the other term.
      let a;
      let b;
      if (ast.a.op === 'I' || (ast.a.op === 'mul' && ast.a.b.op === 'I')) { b = E(ast.b); a = E(ast.a, b.k === 'm' ? b.rows.length : size); } else { a = E(ast.a); b = E(ast.b, a.k === 'm' ? a.rows.length : size); }
      return madd(a, b, ast.op === 'add' ? 1 : -1);
    }
    case 'mul': {
      const a = E(ast.a);
      const b = E(ast.b, a.k === 'm' ? a.rows[0].length : size);
      return mmul(a, b);
    }
    case 'div': {
      const a = E(ast.a);
      const b = E(ast.b);
      if (b.k !== 's') fail('On ne divise pas par une matrice : multiplie par son inverse.');
      if (isZeroScalar(b.n, opts)) fail('Division par zéro.');
      return a.k === 's' ? S(simp(div(a.n, b.n))) : Mx(a.rows.map((r) => r.map((x) => simp(div(x, b.n)))), { vec: a.vec });
    }
    case 'T': { const v = E(ast.e); if (v.k !== 'm') return v; return tr(v); }
    case 'inv': {
      const v = E(ast.e);
      if (v.k === 's') { if (isZeroScalar(v.n, opts)) fail('Division par zéro.'); return S(simp(div(ONE, v.n))); }
      const [m, n] = dimsOf(v);
      if (m !== n) fail('Seule une matrice carrée peut avoir un inverse.');
      const inv = ninverse(v, opts);
      if (!inv) fail('Cette matrice n\'est pas inversible.');
      return inv;
    }
    case 'pow': {
      const v = E(ast.e);
      if (v.k === 's') return S(simp(pow(v.n, ast.k)));
      const k = numValue(ast.k);
      if (k && k.isInt() && k.n >= 0 && k.n <= 30) {
        let out = identityV(v.rows.length);
        for (let i = 0; i < k.n; i++) out = mmul(out, v);
        return out;
      }
      // A symbolic power: only for a diagonal matrix.
      const [m, n] = dimsOf(v);
      if (m === n && v.rows.every((r, i) => r.every((x, j) => i === j || isZeroScalar(x, opts)))) {
        return diagV(v.rows.map((r, i) => simp(pow(r[i], ast.k))));
      }
      fail('Une puissance k d\'une matrice se calcule par Aᵏ = PDᵏP⁻¹.');
      break;
    }
    case 'det': { const v = E(ast.e); if (v.k !== 'm') fail('det s\'applique à une matrice.'); return S(ndet(v.rows)); }
    case 'tr': { const v = E(ast.e); if (v.k !== 'm') fail('tr s\'applique à une matrice.'); return S(simp(v.rows.reduce((s, r, i) => add(s, r[i]), ZERO))); }
    case 'rang': {
      const v = E(ast.e);
      const Aq = toQ(v);
      if (!Aq) fail('Le rang se calcule sur une matrice de nombres.');
      return S(num(pivotsOf(Aq.map((r) => r.map((x) => lit(x)))).length));
    }
    default: fail('Expression illisible.');
  }
  return null;
}

// Does the expression hold a determinant still to compute?
export const hasDet = (ast) => !!ast && (ast.op === 'det' || ['e', 'a', 'b'].some((k) => ast[k] && hasDet(ast[k])) || (ast.items || []).some?.((x) => x && typeof x === 'object' && x.op && hasDet(x)));
// Is it a literal (a matrix, a vector, a number, or a list of them)?
export function isLiteralAst(ast) {
  if (!ast) return false;
  if (['lit', 'vec', 'num', 'diag'].includes(ast.op)) return true;
  if (ast.op === 'neg') return ast.e.op === 'num';
  if (ast.op === 'list') return ast.items.every(isLiteralAst);
  if (ast.op === 'paren') return isLiteralAst(ast.e);
  return false;
}

// ---------- printing ----------

const SUBS = (s) => String(s).replace(/\d/g, (d) => SUBDIGITS[d]);
const entryText = (n) => toText(n).replace(/,/g, '.');
const entryML = (n) => toMathML(stripParen(n)).replace(/^<math[^>]*>/, '').replace(/<\/math>$/, '');

export function valueText(v) {
  if (v.k === 's') return toText(v.n);
  if (v.k === 'list') return v.items.map(valueText).join(', ');
  if (v.vec || (v.rows[0]?.length === 1 && v.rows.length > 1)) return `(${v.rows.map((r) => entryText(r[0])).join(' ; ')})`;
  return `[${v.rows.map((r) => `[${r.map((x, j) => `${v.aug && j === v.aug ? '|' : ''}${entryText(x)}`).join(',').replace(/,\|/g, '|')}]`).join(',')}]`;
}

export function valueML(v) {
  if (v.k === 's') return entryML(v.n);
  if (v.k === 'list') return v.items.map(valueML).join('<mo>,</mo>');
  const vec = v.vec || (v.rows[0]?.length === 1 && v.rows.length > 1);
  const rows = v.rows.map((r) => `<mtr>${r.map((x, j) => `${v.aug && j === v.aug ? '<mtd><mo>|</mo></mtd>' : ''}<mtd>${entryML(x)}</mtd>`).join('')}</mtr>`).join('');
  const [o, c] = vec ? ['(', ')'] : ['[', ']'];
  return `<mrow><mo>${o}</mo><mtable>${rows}</mtable><mo>${c}</mo></mrow>`;
}

const opsText = (ops) => ops.map(opText).join(' ; ');
// A coefficient before L_j: 2, -3, a, (1/2), -(a-1).
const coefText = (k, first) => {
  if (sameScalar(k, ONE)) return first ? '' : '+';
  if (sameScalar(k, qn(-1))) return '-';
  let t = toText(k);
  let sign = first ? '' : '+';
  if (t.startsWith('-')) {
    const m = toText(simp(neg(k)));
    if (!m.startsWith('-')) { t = m; sign = '-'; }
  }
  const simple = /^(\d+|[a-zα-ω])$/.test(t);
  return `${sign}${simple ? t : `(${t})`}`;
};

export function opText(op) {
  const L = (i) => `L${i + 1}`;
  if (op.kind === 'swap') return `${L(op.i)} ↔ ${L(op.j)}`;
  if (op.kind === 'scale') return `${L(op.i)} ← ${coefText(op.k, true)}${L(op.i)}`;
  if (op.kind === 'add') return `${L(op.i)} ← ${L(op.i)} ${coefText(op.k, false).replace(/^([+-])/, '$1 ')}${L(op.j)}`;
  return `${L(op.i)} ← ${coefText(op.c, true)}${L(op.i)} ${coefText(op.k, false).replace(/^([+-])/, '$1 ')}${L(op.j)}`;
}

export const opReadable = (op) => opText(op).replace(/L(\d+)/g, (_, d) => `L${SUBS(d)}`).replace(/-/g, '−');
export const opML = (op) => `<mtext>${opReadable(op)}</mtext>`;

// A line as text (it reads back with parseMatLine), and as MathML.
// line.det: « factor·det[[…]] » (judge rowops with track 'det'); line.raw:
// the student's text is shown as written (det judge, scalar lines).
function factorText(f) {
  if (sameScalar(f, ONE)) return '';
  if (sameScalar(f, qn(-1))) return '-';
  const t = toText(f);
  return /^-?\d+(\/\d+)?$/.test(t) ? `${t}·` : `(${t})·`;
}

export function lineText(line) {
  const parts = [];
  if (line.ops?.length) parts.push(opsText(line.ops));
  if (line.det && line.value) parts.push(`${factorText(line.factor)}det${valueText(line.value)}`);
  else if (line.raw && line.text) parts.push(line.text);
  else if (line.assigns?.length && (!line.body || line.assigns.length > 1)) parts.push(line.assigns.map((a) => `${a.name} = ${a.value ? valueText(a.value) : ''}`).join(' ; '));
  else if (line.value) parts.push(`${line.label ? `${line.label} = ` : ''}${valueText(line.value)}`);
  return parts.join(line.ops?.length && parts.length > 1 ? ' : ' : ' ');
}

const labelML = (label) => `<mtext>${String(label).replace(/_(\w+)/g, (_, s) => SUBS(s)).replace(/</g, '&lt;')}</mtext><mo>=</mo>`;

export function lineML(line, { display } = {}) {
  const parts = [];
  if (line.ops?.length) parts.push(line.ops.map(opML).join('<mo>;</mo>'));
  if (line.det && line.value) {
    const f = factorText(line.factor);
    const fml = f === '' ? '' : f === '-' ? '<mo>−</mo>' : `${entryML(line.factor)}<mo>·</mo>`;
    parts.push(`${fml}<mi>det</mi>${valueML(line.value)}`);
  } else if (line.ml) parts.push(`${line.label ? labelML(line.label) : ''}${line.ml}`);
  else if (line.assigns?.length && (!line.body || line.assigns.length > 1)) {
    parts.push(line.assigns.map((a) => `${labelML(a.name)}${a.value ? valueML(a.value) : ''}`).join('<mspace width="1em"/>'));
  } else if (line.value) parts.push(`${line.label ? labelML(line.label) : ''}${valueML(line.value)}`);
  const body = parts.join(line.ops?.length && parts.length > 1 ? '<mo>:</mo>' : '');
  let alt = '';
  try { alt = lineText(line); } catch { alt = ''; }
  const esc = alt.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  return `<math${display ? ' display="block"' : ''}${esc ? ` alttext="${esc}"` : ''}><mrow>${body}</mrow></math>`;
}

// The MathML of a text the judges read, without evaluating.
export function exprML(ast) {
  const W = (a) => exprML(a);
  switch (ast.op) {
    case 'lit': return valueML(Mx(ast.rows, { aug: ast.aug }));
    case 'vec': return valueML(vecOf(ast.items));
    case 'num': return entryML(ast.n);
    case 'paren': return `<mrow><mo>(</mo>${W(ast.e)}<mo>)</mo></mrow>`;
    case 'name': return ast.name.includes('_') ? `<msub><mi>${ast.name.split('_')[0]}</mi><mn>${ast.name.split('_')[1]}</mn></msub>` : `<mi>${ast.name}</mi>`;
    case 'I': return ast.n ? `<msub><mi>I</mi><mn>${ast.n}</mn></msub>` : '<mi>I</mi>';
    case 'diag': return `<mi>diag</mi><mrow><mo>(</mo>${ast.items.map(entryML).join('<mo>,</mo>')}<mo>)</mo></mrow>`;
    case 'list': return `${ast.braces ? '<mo>{</mo>' : ''}${ast.items.map(W).join('<mo>,</mo>')}${ast.braces ? '<mo>}</mo>' : ''}`;
    case 'neg': return `<mo>−</mo>${W(ast.e)}`;
    case 'add': return `${W(ast.a)}<mo>+</mo>${W(ast.b)}`;
    case 'sub': return `${W(ast.a)}<mo>−</mo>${W(ast.b)}`;
    case 'mul': return `${W(ast.a)}${ast.implicit ? '' : '<mo>·</mo>'}${W(ast.b)}`;
    case 'div': return `<mfrac><mrow>${W(ast.a)}</mrow><mrow>${W(ast.b)}</mrow></mfrac>`;
    case 'T': return `<msup><mrow>${W(ast.e)}</mrow><mi>T</mi></msup>`;
    case 'inv': return `<msup><mrow>${W(ast.e)}</mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup>`;
    case 'pow': return `<msup><mrow>${W(ast.e)}</mrow>${entryML(ast.k)}</msup>`;
    case 'det': case 'tr': case 'rang': return `<mi>${ast.op}</mi>${W(ast.e)}`;
    default: return '<mi>?</mi>';
  }
}

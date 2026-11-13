// Shared pieces of the generators of module A1, part c (développements
// limités): DLs written as text from js/cas/series.js, guided blanks, the
// menus of level 3, and `fitLines`, which replays a list of reference lines
// with their judge and keeps those the mode accepts (a line that is right
// but untidy, such as x³/2 − x³/6, is `stay`: fine in the guided mode, where
// the next line tidies it, dropped in the free modes).

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { walk, stripParen } from '../../cas/ast.js';
import { series } from '../../cas/series.js';
import { blankLine } from '../../judges/lines.js';
import { JUDGES, readWith } from '../../judges/index.js';
import { t } from '../../i18n.js';

export const V = 'x';
export const q = (n, d = 1) => new Q(n, d);
export const isQ = (c) => c instanceof Q;
export const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const E = (math, note, subgoal, act) => ({ kind: 'eq', math, note, subgoal, act });
export const KEYS = ['calcx', 'calcfn', 'anal'];
export const examOf = (opts, points = 1) => (opts?.exam ? { format: opts.exam, points } : false);
export const N = (c) => (isQ(c) ? c.toString() : String(c));
export const fact = (k) => { let f = 1; for (let i = 2; i <= k; i++) f *= i; return f; };
export const qPow = (c, k) => { let r = q(1); for (let i = 0; i < k; i++) r = r.mul(c); return r; };

// ---------- DLs as text ----------

// Coefficients a₀ … aₙ of the DL of `text` at 0 (Q, or floats).
export function coefs(text, n) {
  const s = series(typeof text === 'string' ? parse(text) : text, V, 0, n);
  const out = [];
  for (let k = 0; k <= n; k++) out.push(s.coef(k));
  return out;
}
export const isZero = (c) => (isQ(c) ? c.n === 0 : Math.abs(c) < 1e-12);
export const maxDen = (cs) => Math.max(1, ...cs.filter(isQ).map((c) => c.d));
export const maxNum = (cs) => Math.max(0, ...cs.filter(isQ).map((c) => Math.abs(c.n)));

const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
// xᵏ for the student: x³, x¹⁰.
export const xp = (k) => (k === 1 ? 'x' : `x${String(k).split('').map((d) => SUP[d]).join('')}`);
export const mono = (k, v = V) => (k === 0 ? '' : k === 1 ? v : `${v}^${k}`);
export const remText = (n, v = V) => (n === 0 ? `ε(${v})` : `${mono(n, v)}ε(${v})`);

// One term c·xᵏ (c a Q), without its sign: x^2/2, (4/3)x^3, 3x, 1/2.
// K: a factor written with the coefficient (e: 3e/2).
export function termAbs(c, k, K = '') {
  const a = c.n < 0 ? c.neg() : c;
  const m = mono(k);
  if (K) {
    const top = a.n === 1 ? K : `${a.n}${K}`;
    const co = a.d === 1 ? top : `(${top}/${a.d})`;
    return k === 0 ? co : `${co}×${m}`;
  }
  if (k === 0) return a.toString();
  if (a.d === 1) return a.n === 1 ? m : `${a.n}${m}`;
  if (a.n === 1) return `${m}/${a.d}`;
  return `(${a.n}/${a.d})${m}`;
}

// A sum of signed pieces: [{neg, text}] → text.
export function joinTerms(parts) {
  let s = '';
  for (const p of parts) {
    if (!s) s = p.neg ? `-${p.text}` : p.text;
    else s += p.neg ? `-${p.text}` : `+${p.text}`;
  }
  return s;
}

// The polynomial Σ cs[k]·xᵏ (k from `from` to `to`), then the remainder
// x^rem·ε(x) when rem is a number.
export function polyText(cs, { from = 0, to = cs.length - 1, rem = null, K = '' } = {}) {
  const parts = [];
  for (let k = from; k <= to; k++) {
    const c = cs[k];
    if (!c || isZero(c)) continue;
    parts.push({ neg: c.n < 0, text: termAbs(c, k, K) });
  }
  if (rem !== null) parts.push({ neg: false, text: remText(rem) });
  return joinTerms(parts) || '0';
}

// The DL of `text` at order n, as text (exact coefficients).
export const dlText = (text, n, opts = {}) => polyText(coefs(text, n), { rem: n, ...opts });
// Its polynomial part only.
export const polyOf = (text, n) => polyText(coefs(text, n));
// Number of non-zero terms of degree ≤ n.
export const termCount = (cs, n = cs.length - 1) => cs.slice(0, n + 1).filter((c) => !isZero(c)).length;
// The valuation (first non-zero coefficient), or null.
export const valuation = (cs) => { const k = cs.findIndex((c) => !isZero(c)); return k < 0 ? null : k; };

// Product of two coefficient lists, truncated at n.
export function mulCoefs(a, b, n) {
  const out = Array.from({ length: n + 1 }, () => q(0));
  for (let i = 0; i <= n; i++) for (let j = 0; i + j <= n; j++) if (a[i] && b[j]) out[i + j] = out[i + j].add(a[i].mul(b[j]));
  return out;
}

// ---------- guided blanks ----------

// The terms of a sum, as nodes of `node` (same objects).
export function sumNodes(node) {
  const out = [];
  const visit = (n) => {
    const s = stripParen(n);
    if (s.t === 'bin' && (s.op === '+' || s.op === '-') && s === n) { visit(s.l); visit(s.r); return; }
    if (n.t === 'neg') { visit(n.e); return; }
    out.push(n);
  };
  visit(node);
  return out;
}

// The coefficient of a term c·xᵏ (a node to leave blank), or the term.
function coefNode(t) {
  const s = stripParen(t);
  if (s.t === 'frac') return s.d;
  if (s.t === 'bin' && s.op === '×') return s.l;
  return t;
}

// A DL line with the coefficients of some terms left blank: which(i, node)
// says, for the i-th term, 'coef', 'term' or false. The remainder stays.
export function blankDL(math, which) {
  const node = parse(math);
  const holes = [];
  sumNodes(node).forEach((t, i) => {
    if (t.t === 'eps' || (stripParen(t).t === 'bin' && toText(t).includes('ε'))) return;
    const w = which(i, t);
    if (w === 'coef') holes.push(coefNode(t));
    else if (w === 'term') holes.push(t);
  });
  return holes.length ? { math, ...blankLine(node, holes) } : { math };
}

// The sub-expressions written in `texts` left blank (first match each).
export function tpl(math, texts) {
  const node = parse(math);
  const holes = [];
  for (const t of texts) {
    const want = toText(parse(t));
    let found = null;
    walk(node, (n) => {
      if (found) return false;
      if (n.t !== 'paren' && !holes.includes(n) && toText(n) === want) { found = n; return false; }
      return true;
    });
    if (found) holes.push(found);
  }
  return holes.length ? blankLine(node, holes) : { math };
}
export const blanked = (line, texts) => ({ ...line, ...tpl(line.math, texts) });

// ---------- replaying the reference lines ----------

// The lines the judge accepts in this mode: a `stay` line is kept in the
// guided mode only; the first `done` line ends the part. Throws when a
// line is wrong (a bug of the generator) or when no line ends the part.
export function fitLines(cfg, start, lines, guided) {
  const J = JUDGES[cfg.kind];
  let prev = readWith(cfg, start);
  const out = [];
  for (const l of lines) {
    if (l.kind !== 'eq') { out.push(l); continue; }
    const v = J.judgeLine(cfg, prev, l.math, {});
    const kind = guided && v.kind === 'stay' ? 'ok' : v.kind;
    if (kind === 'done') { out.push(l); return out; }
    if (kind === 'ok') { out.push(l); prev = v.node; continue; }
    if (kind === 'stay' || kind === 'same') continue;
    throw new Error(`a1c: ${start} → ${l.math}: ${v.kind} ${v.message ?? ''}`);
  }
  throw new Error(`a1c: no final line after ${start}`);
}

// Level 3: one menu per reference line; the action of the line is right.
export function stepMenus(start, lines, choices) {
  const eqs = lines.filter((l) => l.kind === 'eq');
  return eqs.map((l, i) => ({
    at: i === 0 ? start : eqs[i - 1].math,
    options: choices.map((c) => ({
      id: c.id, label: c.label, valid: c.id === l.act,
      why: c.why || t('Ce n\'est pas l\'étape à faire maintenant.'),
      ...(c.rule && c.id !== l.act ? { rule: c.rule } : {}),
    })),
  }));
}

// Parts → the fields of a lines item: the first part is the item's start
// and judge, each other part a segment. part = {html?, ask?, start, judge,
// lines, pre?: [decision lines], choices?}. Lines are fitted to the mode.
export function assemble(parts, level) {
  const guided = level <= 2;
  const script = [];
  let first = null;
  parts.forEach((p, i) => {
    const lines = fitLines(p.judge, p.start, p.lines, guided);
    const judge = level === 3 && p.choices ? { ...p.judge, menus: stepMenus(p.start, lines, p.choices) } : p.judge;
    if (i === 0) first = { start: p.start, judge };
    else script.push({ kind: 'segment', html: p.html || '', ask: p.ask, start: { math: p.start }, judge });
    script.push(...(p.pre || []), ...lines);
  });
  return { ...first, script };
}

// Options of a multiple choice without duplicates (same html).
export const uniq = (opts) => opts.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);

// Helpers of module G6, part c (unit `analyse0`, step U2): texts of
// polynomials and affine functions with rational coefficients, values at a
// point, guided blanks, parts (segments) and the menus of level 3.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText, toReadable } from '../../cas/print.js';
import { walk, lit, mapNode } from '../../cas/ast.js';
import { evalFloat } from '../../cas/numeric.js';
import { blankLine } from '../../judges/lines.js';

export const q = (n, d = 1) => new Q(n, d);
export const N = (x) => toText(lit(Q.of(x)));
// Plain text of a formula, for decision prompts and labels (not HTML).
export const RT = (text, opts = {}) => toReadable(parse(text, opts));
export const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
export const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const E = (math, note, subgoal, act) => ({ kind: 'eq', math, note, subgoal, act });
export const D = (prompt, options) => ({ kind: 'decision', prompt, options });
export const NOTE = (html) => ({ kind: 'note', html });

// A coefficient written in front of a letter: '', '-', '3', '(3/4)', '-(3/4)'.
export function coefText(k) {
  const K = Q.of(k);
  if (K.eq(1)) return '';
  if (K.eq(-1)) return '-';
  if (K.d === 1) return String(K.n);
  return `${K.n < 0 ? '-' : ''}(${Math.abs(K.n)}/${K.d})`;
}

// Σ cs[i]·vⁱ, highest power first: [−4, 3, 1] → x^2+3x-4.
export function polyText(cs, v = 'x') {
  let out = '';
  for (let i = cs.length - 1; i >= 0; i--) {
    const c = Q.of(cs[i]);
    if (c.n === 0) continue;
    let t;
    if (i === 0) t = N(c);
    else t = `${coefText(c)}${v}${i > 1 ? `^${i}` : ''}`;
    out += out && !t.startsWith('-') ? `+${t}` : t;
  }
  return out || '0';
}
// m·v + h.
export const affText = (m, h, v = 'x') => polyText([h, m], v);
// v − a (v + 3, v).
export const minusText = (a, v = 'x') => polyText([Q.of(a).neg(), 1], v);

// Values of polynomials (coefficients by increasing power), exact.
export const pEval = (cs, x) => cs.reduce((acc, c, i) => acc.add(Q.of(c).mul(Q.of(x).pow(i))), q(0));
export const pDeriv = (cs) => cs.slice(1).map((c, i) => Q.of(c).mul(q(i + 1)));
export const pAdd = (a, b) => Array.from({ length: Math.max(a.length, b.length) }, (_, i) => Q.of(a[i] ?? 0).add(Q.of(b[i] ?? 0)));
export const pScale = (a, k) => a.map((c) => Q.of(c).mul(Q.of(k)));
export const pMul = (a, b) => {
  const out = Array(a.length + b.length - 1).fill(q(0));
  a.forEach((x, i) => b.forEach((y, j) => { out[i + j] = out[i + j].add(Q.of(x).mul(Q.of(y))); }));
  return out;
};

// The text of an expression of v at a number: 3x at 2 → 3×2, x² at −1 →
// (−1)². atBlank: the same line with the inserted numbers left blank.
function substituted(text, v, value, opts) {
  const holes = [];
  // Nodes that contain an inserted number: 3t² at 2 must print 3×2².
  const tainted = new Set();
  const node = mapNode(parse(text, opts), (n) => {
    if (n.t === 'sym' && n.name === v && !n.sub) {
      const x = lit(Q.of(value));
      holes.push(x);
      tainted.add(x);
      return x;
    }
    let out = n;
    if (n.t === 'bin' && n.op === '×' && n.implicit && tainted.has(n.r)) out = { ...n, implicit: false };
    const kids = Object.values(n).flatMap((c) => (Array.isArray(c) ? c : [c]));
    if (kids.some((c) => c && typeof c === 'object' && tainted.has(c))) tainted.add(out);
    return out;
  });
  return { node, holes };
}
export const atText = (text, v, value, opts = {}) => toText(substituted(text, v, value, opts).node);
export function atBlank(text, v, value, opts = {}) {
  const { node, holes } = substituted(text, v, value, opts);
  return blankLine(node, holes, opts);
}
export const valueAt = (text, v, value) => evalFloat(parse(text), { [v]: Q.of(value).valueOf() });

// A line with sub-expressions left blank. texts: 'text' (first match) or
// ['text', k] (the k-th match, from 0; -1 for the last one).
export function tpl(math, texts, opts = {}) {
  const node = parse(math, opts);
  const holes = [];
  for (const t of texts) {
    const [text, k] = Array.isArray(t) ? t : [t, 0];
    const want = toText(parse(text, opts));
    const found = [];
    walk(node, (n) => {
      if (n.t !== 'paren' && !holes.includes(n) && toText(n) === want) found.push(n);
      return true;
    });
    const pick = k < 0 ? found[found.length + k] : found[k];
    if (pick) holes.push(pick);
  }
  return holes.length ? blankLine(node, holes, opts) : { math };
}
export const blanked = (line, texts, opts) => ({ ...line, ...tpl(line.math, texts, opts) });

// Level 3: one menu per reference line of a part; the action of the line is
// right, the others say why (and name their trap).
export function stepMenus(start, lines, choices) {
  const eqs = lines.filter((l) => l.kind === 'eq');
  return eqs.map((l, i) => ({
    at: i === 0 ? start : eqs[i - 1].math,
    options: choices.map((c) => ({
      id: c.id, label: c.label, valid: c.id === l.act,
      why: c.why || 'Ce n\'est pas l\'étape à faire maintenant.',
      ...(c.rule && c.id !== l.act ? { rule: c.rule } : {}),
    })),
  }));
}

// A part of a lines item: {html, ask, start, judge, lines, pre}. The first
// part is the item's start and judge; the others are segments. At level 3
// every part's judge gets its menus.
export const part = (html, ask, start, judge, lines, pre = []) => ({ html, ask, start, judge, lines, pre });
export function partsScript(parts, level, choices, before = []) {
  const withM = (p) => (level === 3 && choices ? { ...p.judge, menus: stepMenus(p.start, p.lines, choices) } : p.judge);
  const [first, ...rest] = parts;
  const script = [...before, ...(first.html ? [NOTE(`<b>${first.html}</b>`)] : []), ...first.pre, ...first.lines];
  for (const p of rest) script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge: withM(p) }, ...p.pre, ...p.lines);
  return { start: first.start, judge: withM(first), script, ask: first.ask };
}

// Sub-goals actually used by a script.
export const usedSubgoals = (all, script) => {
  const ids = new Set(script.filter((l) => l.subgoal).map((l) => l.subgoal));
  return all.filter((s) => ids.has(s.id));
};

// Distinct options of a multiple choice, the right one first.
export function distinctOptions(list, n = 4) {
  const out = [];
  for (const o of list) if (out.length < n && !out.some((x) => x.html === o.html)) out.push(o);
  return out;
}

export const KEYS = ['calcx', 'calcfn', 'anal'];
export const KEYS_SET = ['calcx', 'set', 'relation', 'anal'];

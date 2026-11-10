// Helpers shared by the generators of part b of module G6 (unit
// `analyse0`, step U2): analyse0-b.js (primitives, areas) and
// analyse0-b-implicit.js (implicit derivatives, imposed tangents).

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { walk } from '../../cas/ast.js';
import { blankLine } from '../../judges/lines.js';

export const q = (n, d = 1) => new Q(n, d);
export const qText = (x) => { const v = Q.of(x); return v.d === 1 ? String(v.n) : `${v.n}/${v.d}`; };
// A number inside a line: 3, (-3), (3/4), (-3/4).
export const qPar = (x) => { const v = Q.of(x); return v.n >= 0 && v.d === 1 ? String(v.n) : `(${qText(v)})`; };
export const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
export const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const E = (math, note, subgoal, act) => ({ kind: 'eq', math, note, subgoal, act });
export const examOf = (opts, points = 1) => (opts?.exam ? { format: opts.exam, points } : false);
export const seg = (html, ask, start, judge) => ({ kind: 'segment', html, ask, start: { math: start }, judge });

// x − r as text: x + 3, x − 2, x.
export const xMinus = (r, v = 'x') => { const R = Q.of(r); return R.n === 0 ? v : R.n < 0 ? `${v}+${qText(R.neg())}` : `${v}-${qText(R)}`; };

// A polynomial in v from its coefficients [c0, c1, c2, …] (Q): 3x^2-x+1.
export function polyText(cs, v = 'x') {
  const out = [];
  for (let k = cs.length - 1; k >= 0; k--) {
    const c = Q.of(cs[k]);
    if (c.n === 0) continue;
    const body = k === 0 ? '' : k === 1 ? v : `${v}^${k}`;
    const a = c.n < 0 ? c.neg() : c;
    let t;
    if (!body) t = qText(a);
    else if (a.eq(1)) t = body;
    else if (a.d === 1) t = `${a.n}${body}`;
    else t = `${a.n === 1 ? '' : a.n}${body}/${a.d}`;
    out.push(c.n < 0 ? `-${t}` : out.length ? `+${t}` : t);
  }
  return out.join('') || '0';
}

// Product of polynomials given by coefficient lists.
export function polyMul(a, b) {
  const out = Array(a.length + b.length - 1).fill(null).map(() => q(0));
  a.forEach((x, i) => b.forEach((y, j) => { out[i + j] = out[i + j].add(Q.of(x).mul(Q.of(y))); }));
  return out;
}
export const polyAdd = (a, b) => Array.from({ length: Math.max(a.length, b.length) }, (_, i) => Q.of(a[i] ?? 0).add(Q.of(b[i] ?? 0)));
export const polyScale = (a, k) => a.map((x) => Q.of(x).mul(Q.of(k)));
export const polyEval = (a, x) => a.reduce((s, c, i) => s.add(Q.of(c).mul(Q.of(x).pow(i))), q(0));
export const polyPrim = (a) => [q(0), ...a.map((c, i) => Q.of(c).div(i + 1))];
export const polyTrim = (a) => { const b = [...a]; while (b.length > 1 && Q.of(b[b.length - 1]).n === 0) b.pop(); return b; };

// A line with the sub-expressions written in `texts` left blank (the first
// node of each text, not already taken).
export function tpl(math, texts, opts = {}) {
  const node = parse(math, opts);
  const holes = [];
  for (const t of texts) {
    const want = toText(parse(t, opts));
    let found = null;
    walk(node, (n) => {
      if (found) return false;
      if (n.t !== 'paren' && !holes.includes(n) && toText(n) === want) { found = n; return false; }
      return true;
    });
    if (found) holes.push(found);
  }
  return holes.length ? blankLine(node, holes, opts) : { math };
}
export const blanked = (line, texts, opts) => ({ ...line, ...tpl(line.math, texts, opts) });
// A line with the nodes chosen by pick(node) left blank (at most max).
// The nodes are those of parse(line.math), or of `node` when given.
export function blankWhere(line, pick, opts = {}, max = 3, node = null) {
  node = node && typeof node === 'object' ? node : parse(line.math, opts);
  const holes = [];
  walk(node, (n) => {
    if (holes.length >= max) return false;
    if (pick(n)) { holes.push(n); return false; }
    return true;
  });
  return holes.length ? { ...line, ...blankLine(node, holes, opts) } : line;
}

// Level 3: one menu per reference line of a part; the action of the line
// is the right one.
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
export const withMenus = (judge, level, start, lines, choices) => (level === 3 ? { ...judge, menus: stepMenus(start, lines, choices) } : judge);

// A true/false question as a two-option multiple choice (the pilot's form).
export function vfOptions(truth, rule) {
  return [{ html: 'Vrai', correct: truth, rule: truth ? null : rule || null }, { html: 'Faux', correct: !truth }];
}

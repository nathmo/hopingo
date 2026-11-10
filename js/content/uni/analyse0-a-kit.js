// Helpers of module G6, part a (unit `analyse0`, step U2): guided blanks,
// menus of the « choose the action » level, items made of parts, and
// polynomials written from their coefficients. Used by analyse0-a.js and
// analyse0-a-study.js.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { walk, lit, mapNode } from '../../cas/ast.js';
import { exactValue } from '../../cas/normal.js';
import { blankLine } from '../../judges/lines.js';
import { linesItem } from './kit.js';

export const V = 'x';
export const q = (n, d = 1) => new Q(n, d);
export const N = (x) => toText(lit(Q.of(x)));
export const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
export const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
export const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const E = (math, note, subgoal, act) => ({ kind: 'eq', math, note, subgoal, act });
export const NOTE = (html) => ({ kind: 'note', html });
export const examOf = (opts, points = 1) => (opts?.exam ? { format: opts.exam, points } : false);
// A number for the screen: −3, 5/2.
export const fr = (x) => String(x).replace(/-/g, '−');

// A line with the sub-expressions written in `texts` left blank.
export function tpl(math, texts, opts = {}) {
  const node = parse(math, opts);
  const holes = [];
  const find = (want) => {
    let found = null;
    walk(node, (n) => {
      if (found) return false;
      if (n.t !== 'paren' && !holes.includes(n) && toText(n) === want) { found = n; return false; }
      return true;
    });
    return found;
  };
  for (const t of texts) {
    const want = toText(parse(t, opts));
    // A term after a minus sign: −12x is written « − 12x » in a sum.
    const found = find(want) ?? (want.startsWith('-') ? find(want.slice(1)) : null);
    if (found) holes.push(found);
  }
  return holes.length ? blankLine(node, holes, opts) : { math };
}
export const blanked = (line, texts, opts) => ({ ...line, ...tpl(line.math, texts, opts) });

// Level 3: one menu per reference line; the action of the line is right.
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

// A lines item made of parts: the first part is the item's start and judge,
// the others are segments with their own judge. part = {start, judge,
// lines, html?, ask?, pre?}. At level 3 each part gets the menus of
// o.choices (or part.choices), one per reference line.
export function partsItem(o) {
  const level = o.level;
  const menus = (p) => (level === 3 && !o.exam ? { ...p.judge, menus: stepMenus(p.start, p.lines, p.choices || o.choices) } : p.judge);
  const [first, ...rest] = o.parts;
  const script = [...(o.before || []), ...(first.html ? [NOTE(`<b>${first.html}</b>`)] : []), ...(first.pre || []), ...first.lines];
  for (const p of rest) script.push({ kind: 'segment', html: p.html || '', ask: p.ask, start: { math: p.start }, judge: menus(p) }, ...(p.pre || []), ...p.lines);
  return linesItem({
    ...o, start: first.start, judge: menus(first), script, mode: o.mode || modeOf(level),
    tapActions: level === 3 && !o.exam ? 'steps' : null,
  });
}

// ---------- polynomials ----------

// A monomial c·x^k as text, c a Q or a number.
function mono(c, k, v = V) {
  const C = Q.of(c);
  const xs = k === 0 ? '' : k === 1 ? v : `${v}^${k}`;
  if (!xs) return N(C);
  if (C.eq(1)) return xs;
  if (C.eq(-1)) return `-${xs}`;
  if (C.d !== 1) return `${C.n < 0 ? '-' : ''}(${N(C.n < 0 ? C.neg() : C)})${xs}`;
  return `${N(C)}${xs}`;
}
export const joinSum = (terms) => terms.filter(Boolean).reduce((s, t) => (s ? (t.startsWith('-') ? `${s}${t}` : `${s}+${t}`) : t), '') || '0';

// coeffs from the highest degree down: [1, -3, -9, 2] → x^3-3x^2-9x+2.
export function polyText(coeffs, v = V) {
  const n = coeffs.length - 1;
  return joinSum(coeffs.map((c, i) => (Q.of(c).n === 0 ? '' : mono(c, n - i, v))));
}

// Coefficients (high → low) of Π (x − r)^m times k: roots [[r, m]].
export function fromRoots(k, roots) {
  let p = [Q.of(k)];
  for (const [r, m] of roots) {
    for (let j = 0; j < m; j++) {
      const out = Array(p.length + 1).fill(null).map(() => q(0));
      p.forEach((c, i) => { out[i] = out[i].add(c); out[i + 1] = out[i + 1].sub(c.mul(Q.of(r))); });
      p = out;
    }
  }
  return p;
}
// Derivative and primitive (constant c0) of coefficients high → low.
export const dPoly = (cs) => cs.slice(0, -1).map((c, i) => Q.of(c).mul(cs.length - 1 - i));
export const iPoly = (cs, c0 = 0) => [...cs.map((c, i) => Q.of(c).div(cs.length - i)), Q.of(c0)];
export const evalPoly = (cs, x) => cs.reduce((acc, c) => acc.mul(Q.of(x)).add(Q.of(c)), q(0));

// x − r as text: x + 3, x − 2, x.
export const lin = (r, v = V) => { const R = Q.of(r); return R.n === 0 ? v : R.n < 0 ? `${v}+${N(R.neg())}` : `${v}-${N(R)}`; };
// k·Π(x − r)^m written factored: 3(x+1)(x-3), -4x^2(x-3), 12(x-1)^2.
export function factoredText(k, roots, v = V) {
  // A lone x comes first: 4x²(x − 3), not 4(x − 3)x².
  roots = [...roots].sort((u, w) => (Q.of(u[0]).n === 0 ? -1 : 0) - (Q.of(w[0]).n === 0 ? -1 : 0));
  const fs = roots.map(([r, m]) => {
    const b = lin(r, v);
    const base = Q.of(r).n === 0 ? b : `(${b})`;
    return m === 1 ? base : `${base}^${m}`;
  });
  const K = Q.of(k);
  const pre = K.eq(1) ? '' : K.eq(-1) ? '-' : N(K);
  return `${pre}${fs.join('')}` || '1';
}

// The text of node with v replaced by a number (a line « f(2) = … »).
export function at(text, x, v = V) {
  const X = Q.of(x);
  const node = mapNode(parse(text), (n) => (n.t === 'sym' && n.name === v && !n.sub ? (X.n < 0 || X.d !== 1 ? { t: 'paren', e: lit(X) } : lit(X)) : n));
  // 2x becomes 2×1, not 21: the printer decides again where × is needed.
  return toText(mapNode(node, (n) => (n.t === 'bin' && n.op === '×' ? { ...n, implicit: undefined } : n)));
}
export const valueAt = (text, x) => exactValue(parse(at(text, x)));

// A coefficient in front of a term: '', '-', 3, -(1/2).
export const pre = (k) => { const K = Q.of(k); return K.eq(1) ? '' : K.eq(-1) ? '-' : K.d === 1 ? N(K) : `${K.n < 0 ? '-' : ''}(${N(K.n < 0 ? K.neg() : K)})`; };
// k/x^j and k/√x… : a number over something, sign in front.
export const over = (k, den) => { const K = Q.of(k); return `${K.n < 0 ? '-' : ''}${N(K.n < 0 ? K.neg() : K)}/${den}`; };

// ---------- tangents ----------

// y = f(a) + f′(a)(x − a) as text, and its expanded form y = mx + p.
export function tangentText(fa, dfa, a) {
  const slope = Q.of(a).n === 0 ? `${pre(dfa)}x` : `${pre(dfa)}(${lin(a)})`;
  return joinSum([Q.of(fa).n ? N(fa) : '', slope]);
}
export const tangentFinal = (fa, dfa, a) => polyText([dfa, Q.of(fa).sub(Q.of(dfa).mul(a))]);

// The part « y = »: the letter y stands for the tangent (any writing of
// it is right, the final one is expanded); cfg.tangent feeds the trap
// g6_tangent_slope_function. d = {fa, dfa, a, df (f′(x) as text), dom}.
export function tangentCfg(d) {
  return {
    kind: 'equiv', vars: [V, 'y'], subst: { y: tangentText(d.fa, d.dfa, d.a) }, domain: { x: d.dom }, target: 'expanded',
    tangent: { fa: N(d.fa), dfx: d.df, dfa: N(d.dfa), a: N(d.a) },
  };
}

// The lines of « y = »: the formula, then y = mx + p; the formula alone
// when it is already expanded (a = 0 or f(a) = 0).
export function tangentLines(fa, dfa, a, subgoal, word = 'f') {
  const fin = tangentFinal(fa, dfa, a);
  const rule = `y = ${word}(a) + ${word}′(a)(x − a)`;
  if (Q.of(a).n === 0 || Q.of(fa).n === 0) return [E(fin, rule, subgoal, 'line')];
  return [E(tangentText(fa, dfa, a), rule, subgoal, 'line'), E(fin, 'Développer', subgoal, 'expand')];
}

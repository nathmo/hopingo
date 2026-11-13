// Helpers of the generators of module G8, part b (unit `complexes`, step
// U4): complex numbers as text and MathML, lines with blanks, the menus of
// the « choose the action » mode, items made of parts, and the true/false
// questions asked as a multiple choice.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText, toReadable } from '../../cas/print.js';
import { walk, lit, contains } from '../../cas/ast.js';
import { CQ, cText } from '../../cas/complex.js';
import { qNode } from '../../cas/polyx.js';
import { blankLine } from '../../judges/lines.js';
import { judgeFor, readWith } from '../../judges/index.js';
import { MT, mcq } from './kit.js';
import { t } from '../../i18n.js';

export { CQ };
export const q = (n, d = 1) => new Q(n, d);
export const N = (x) => toText(lit(Q.of(x)));
export const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
export const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const E = (math, note, subgoal, act) => ({ kind: 'eq', math, note, subgoal, act });
export const CX = { complex: true };
export const fr = (s) => String(s).replace(/-/g, '−');

// ---------- complex numbers ----------

export const cq = (a, b = 0) => new CQ(Q.of(a), Q.of(b));
// a + bi as typed text: 3-2i, i, -i, 2i/3.
export const ct = (z) => toText(CQ.of(z).toNode());
// As a factor or after a minus sign: (3-2i), (-2), 2i, 5.
export function cp(z) {
  z = CQ.of(z);
  const atom = (z.im.n === 0 && z.re.n >= 0 && z.re.d === 1) || (z.re.n === 0 && z.im.n > 0 && z.im.d === 1);
  return atom ? ct(z) : `(${ct(z)})`;
}
// x − w written: x-(2-i), x-2i, x+3, x.
export function xMinus(v, w) {
  w = CQ.of(w);
  if (w.isZero()) return v;
  if (w.isReal()) return w.re.n > 0 ? `${v}-${N(w.re)}` : `${v}+${N(w.re.neg())}`;
  if (w.re.n === 0) return w.im.n > 0 ? `${v}-${ct(w)}` : `${v}+${ct(w.neg())}`;
  return `${v}-(${ct(w)})`;
}
// Plain text (decision prompts and options are text, not HTML): 3 − 2i,
// |z − (2 + i)| = 2·|z + 1|.
export const cw = (z) => cText(CQ.of(z));
export const rd = (text) => toReadable(parse(text, { complex: true, vars: ['z', 'w', 'x', 'y', 'ω'] }));
// c·v as text: v, -v, 3v, 2iv, (1+i)v (sep '×' before a function: 2i×conj(w)).
export function coefText(c, v, sep = '') {
  c = CQ.of(c);
  if (c.eq(1)) return v;
  if (c.eq(-1)) return `-${v}`;
  const atom = (c.isReal() && c.re.d === 1) || (c.re.n === 0 && c.im.d === 1);
  return atom ? `${ct(c)}${sep}${v}` : `(${ct(c)})${v}`;
}
// MathML of a complex number or of a text.
export const cm = (z) => MT(ct(z), CX);
export const mt = (text) => MT(text, CX);
// A point of the plane: (2 ; −1).
export const ptText = (z) => `(${fr(N(CQ.of(z).re))} ; ${fr(N(CQ.of(z).im))})`;
export const gauss = (rng, lo, hi) => cq(rng.int(lo, hi), rng.int(lo, hi));

// A polynomial in v from complex coefficients, highest degree first:
// z^3-(1+2i)z^2+(-2+2i)z+4i.
export function cpolyText(cs, v) {
  const n = cs.length - 1;
  let out = '';
  cs.forEach((c, i) => {
    c = CQ.of(c);
    const k = n - i;
    if (c.isZero()) return;
    const mono = k === 0 ? '' : k === 1 ? v : `${v}^${k}`;
    let tq;
    if (c.isReal() || c.re.n === 0) {
      const neg = c.isReal() ? c.re.n < 0 : c.im.n < 0;
      const m = neg ? c.neg() : c;
      const body = k === 0 ? ct(m) : (m.eq(1) ? '' : ct(m)) + mono;
      tq = neg ? `-${body}` : `+${body}`;
    } else if (k === 0) tq = `+${ct(c)}`.replace('+-', '-');
    else if (c.re.n < 0 && c.im.n < 0) tq = `-(${ct(c.neg())})${mono}`;
    else tq = `+(${ct(c)})${mono}`;
    out += tq;
  });
  return out.replace(/^\+/, '') || '0';
}
// A rational polynomial (numbers, lowest degree first) as text.
export const qpolyText = (cs, v) => toText(qNode(cs.map((c) => Q.of(c)), v));

// ---------- lines with blanks, menus, parts ----------

// A line with the sub-expressions written in `texts` left blank (the last
// occurrence of each: constants come last, exponents first).
export function tpl(math, texts, opts = CX, first = false) {
  const node = parse(math, opts);
  const holes = [];
  for (const tq of texts) {
    const want = toText(parse(tq, opts));
    let found = null;
    walk(node, (n) => {
      if (n.t !== 'paren' && !holes.includes(n) && toText(n) === want && !(first && found)) found = n;
      return true;
    });
    if (found && !holes.some((h) => contains(h, (x) => x === found) || contains(found, (x) => x === h))) holes.push(found);
  }
  return holes.length ? blankLine(node, holes, opts) : { math };
}
export const blanked = (line, texts, opts = CX, first = false) => ({ ...line, ...tpl(line.math, texts, opts, first) });

// A segment: a new part with its own judge.
export const SEG = (html, ask, start, judge) => ({ kind: 'segment', html, ask, start: { math: start }, judge });

// Level 3: one menu per reference line of a part; the line's action is
// right. choices: [{id, label, rule?, why?}].
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

// The script of an item made of parts [{html, ask, start, judge, pre:
// [decisions…], lines}], the first part being the item's own start. Level 3
// adds each part's menu. Returns {start, judge, script}.
export function partsScript(parts, level, choices) {
  // A middle line already final (|z| = |z − b| developed, ω − aω with small
  // numbers) would end its part: it is left out. Above the guided levels, a
  // right but untidy line (stay) is refused, so it is left out too.
  for (const p of parts) {
    if (p.judge.kind === 'poly' && (p.judge.mode === 'identity' || p.judge.mode === 'div')) continue;
    const eqs = p.lines.filter((l) => l.kind === 'eq');
    const drop = new Set(eqs.slice(0, -1).filter((l) => {
      const f = judgeFor(p.judge).isFinal(p.judge, readWith(p.judge, l.math));
      return f === true || (typeof f === 'string' && level >= 3);
    }));
    p.lines = p.lines.filter((l) => !drop.has(l));
  }
  const menuOf = (p) => (level === 3 ? { ...p.judge, menus: stepMenus(p.start, p.lines, choices) } : p.judge);
  const [first, ...rest] = parts;
  const script = [...(first.pre || []), ...first.lines];
  for (const p of rest) script.push(SEG(p.html, p.ask, p.start, menuOf(p)), ...(p.pre || []), ...p.lines);
  return { start: first.start, judge: menuOf(first), script };
}

// A decision line.
export const decision = (prompt, options) => ({ kind: 'decision', prompt, options });

// Options of a multiple choice without duplicates (the first one kept).
export const uniq = (opts) => opts.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);

// A true/false statement as a two-option multiple choice (exam format
// 'tf'): used when no counter-example checker fits (a locus, a geometric
// statement, a complex root).
export function vfMcq(skill, statement, truth, rng, { key, why, ruleIfTrue = null, ruleIfFalse = null }) {
  return mcq({
    skill, level: 4, prompt: t('Vrai ou faux ?<br>« {statement} »', { statement }), keepOrder: true,
    options: [{ html: t('Vrai'), correct: truth, rule: truth ? null : ruleIfTrue }, { html: t('Faux'), correct: !truth, rule: truth ? ruleIfFalse : null }],
    key: `${skill}:tf:${key}`, solution: [{ html: why, note: '' }], expectedSec: 60, exam: { format: 'tf', points: 1 },
  }, rng);
}

// ---------- moduli and arguments ----------

// c·π as text: π, −π, 3π/4, −π/2, 0.
export function piText(c) {
  const C = Q.of(c);
  if (C.n === 0) return '0';
  const s = C.n < 0 ? '-' : '';
  const a = Math.abs(C.n);
  const top = a === 1 ? 'π' : `${a}π`;
  return C.d === 1 ? `${s}${top}` : `${s}${top}/${C.d}`;
}
// √r for a rational r ≥ 0, simplified: 2, √2, 2√2, √2/2, 3/2.
export function surd(r) {
  const R = Q.of(r);
  let m = R.n * R.d;
  const d = R.d;
  let k = 1;
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; k *= f; }
  const g = gcdN(k, d);
  const [K, D] = [k / g, d / g];
  const body = m === 1 ? String(K) : `${K === 1 ? '' : K}√${m}`;
  return D === 1 ? body : `${body}/${D}`;
}
const gcdN = (a, b) => { while (b) [a, b] = [b, a % b]; return Math.abs(a); };
// The argument of z ∈ ℚ(i) as a multiple of π/4 (or null).
export function argPi(z) {
  z = CQ.of(z);
  const tq = Math.atan2(z.im.valueOf() + 0, z.re.valueOf());
  const k = Math.round(tq / (Math.PI / 4));
  return Math.abs(k * (Math.PI / 4) - tq) < 1e-12 ? q(k, 4) : null;
}
// As a denominator: 5, (2i), (4+2i), (-3).
export function cd(z) {
  z = CQ.of(z);
  return z.isReal() && z.re.n > 0 && z.re.d === 1 ? ct(z) : `(${ct(z)})`;
}

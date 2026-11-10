// Tools shared by the generators of module V, part a (step U10): a small
// algebra of terms in x, y, z (c·x^a·y^b·z^c, times sin, cos or exp of a
// monomial), with derivatives, texts for the CAS and MathML for the screen;
// the parts builder of the part (geo-kit's partsItem, with decisions that
// can stay decisions at level 1); multiple choices with distinct options.
//
// A term: {c: Q, e: [a, b, c], f?: 'sin' | 'cos' | 'exp', m?: {k, e}}: the
// coefficient, the monomial, and an optional function of k·monomial.
// A sum: an array of terms (like terms merged by sum()).

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toMathML } from '../../cas/mathml.js';
import { toReadable } from '../../cas/print.js';
import { JUDGES, readWith } from '../../judges/index.js';
import { MT, mcq, linesItem, examTag, tfItem, blocksItem } from './kit.js';
import { blanks, H, nz, modeOf } from './geo-kit.js';
import { problemItem, asProblem } from './kit-problem.js';

export { MT, mcq, linesItem, examTag, tfItem, blocksItem, blanks, H, nz, modeOf, problemItem, asProblem };

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const qt = (x) => String(q(x));
export const fq = (x) => qt(x).replace(/-/g, '−');
export const VARS = ['x', 'y', 'z'];
const PVARS = ['x', 'y', 'z', 't', 'λ', 'r', 'θ', 'φ', 'R'];
export const FUNCS = ['α', 'β', 'γ'];

// Keypads: numbers and x, functions, x y z ∂, ∫ and t, σ γ ∈ [ ].
export const KEYS = ['calcx', 'calcfn', 'a2', 'anal', 'vecto', 'greek'];

// ---------- terms ----------

export const T = (c, e, f = null, m = null) => ({ c: q(c), e: [...e], ...(f ? { f, m: { k: q(m.k), e: [...m.e] } } : {}) });
const keyOf = (t) => `${t.e.join(',')}|${t.f || ''}|${t.f ? `${t.m.k}:${t.m.e.join(',')}` : ''}`;

// Like terms merged, zeros removed, a stable order (degree, then x, y, z; functions last).
export function sum(...lists) {
  const map = new Map();
  for (const t of lists.flat()) {
    const k = keyOf(t);
    const old = map.get(k);
    map.set(k, old ? { ...old, c: old.c.add(t.c) } : { ...t });
  }
  const deg = (t) => t.e.reduce((s, x) => s + x, 0);
  return [...map.values()].filter((t) => t.c.n !== 0).sort((a, b) => (!!a.f - !!b.f) || (deg(b) - deg(a)) || (b.e[0] - a.e[0]) || (b.e[1] - a.e[1]) || (b.e[2] - a.e[2]));
}
export const neg = (s) => s.map((t) => ({ ...t, c: t.c.neg() }));
export const sub = (a, b) => sum(a, neg(b));
export const scale = (s, k) => sum(s.map((t) => ({ ...t, c: t.c.mul(q(k)) })));
const unit = (i) => [0, 0, 0].map((_, j) => (j === i ? 1 : 0));
const addE = (a, b) => a.map((x, i) => x + b[i]);
const D1 = { sin: ['cos', 1], cos: ['sin', -1], exp: ['exp', 1] };

// ∂s/∂v_i.
export function d(s, i) {
  const out = [];
  for (const t of s) {
    if (t.e[i] > 0) out.push({ ...t, c: t.c.mul(t.e[i]), e: t.e.map((x, j) => (j === i ? x - 1 : x)) });
    if (t.f && t.m.e[i] > 0) {
      const [g, sg] = D1[t.f];
      out.push({ c: t.c.mul(t.m.k).mul(t.m.e[i]).mul(sg), e: addE(t.e, t.m.e.map((x, j) => (j === i ? x - 1 : x))), f: g, m: t.m });
    }
  }
  return sum(out);
}
export const dependsOn = (t, i) => t.e[i] > 0 || (!!t.f && t.m.e[i] > 0);
export const sDepends = (s, i) => s.some((t) => dependsOn(t, i));
export const isZero = (s) => s.length === 0;
export const isPoly = (s) => s.every((t) => !t.f);
export const nVars = (t) => [0, 1, 2].filter((i) => dependsOn(t, i)).length;

export function monoT(e, vars = VARS) {
  return e.map((k, i) => (k === 0 ? '' : k === 1 ? vars[i] : `${vars[i]}^${k}`)).filter(Boolean).join('');
}
function argT(m, vars) {
  const mono = monoT(m.e, vars);
  const k = q(m.k);
  if (k.eq(1)) return mono;
  if (k.eq(-1)) return `-${mono}`;
  return `${k.d === 1 ? qt(k) : `(${qt(k)})`}${mono}`;
}
// The body of a term (without its coefficient): 'x^2y', 'z cos(xz)', ''.
function bodyT(t, vars) {
  const mono = monoT(t.e, vars);
  if (!t.f) return mono;
  const fn = t.f === 'exp' ? `e^(${argT(t.m, vars)})` : `${t.f}(${argT(t.m, vars)})`;
  return mono ? `${mono} ${fn}` : fn;
}
// The sum as CAS text: 3x^2y-2z cos(xz)+e^(xy) ('0' when empty).
export function text(s, vars = VARS) {
  let out = '';
  for (const t of s) {
    const a = t.c;
    const body = bodyT(t, vars);
    const abs = a.n < 0 ? a.neg() : a;
    const sign = a.n < 0 ? '-' : out ? '+' : '';
    const coef = !body ? qt(abs) : abs.eq(1) ? '' : abs.d === 1 ? `${qt(abs)}` : `(${qt(abs)})`;
    out += sign + coef + body;
  }
  return out || '0';
}
// The value of a sum at a point, exactly (functions of 0 only; else null).
export function at(s, p) {
  let v = q(0);
  for (const t of s) {
    let m = t.c;
    t.e.forEach((k, i) => { for (let j = 0; j < k; j++) m = m.mul(q(p[i])); });
    if (t.f) {
      let a = q(t.m.k);
      t.m.e.forEach((k, i) => { for (let j = 0; j < k; j++) a = a.mul(q(p[i])); });
      if (a.n !== 0) return null;
      m = m.mul(t.f === 'sin' ? 0 : 1);
    }
    v = v.add(m);
  }
  return v;
}
// A random polynomial: `count` monomials of degree 1..maxDeg in the first n variables.
export function randPoly(rng, n, count, { maxDeg = 3, coefs = [-3, -2, -1, 1, 2, 3], minDeg = 1 } = {}) {
  const out = [];
  const keys = new Set();
  for (let t = 0; out.length < count && t < 60; t++) {
    const e = [0, 1, 2].map((i) => (i < n ? rng.int(0, maxDeg) : 0));
    const deg = e.reduce((s, k) => s + k, 0);
    if (deg < minDeg || deg > maxDeg || keys.has(e.join())) continue;
    keys.add(e.join());
    out.push(T(rng.pick(coefs), e));
  }
  return sum(out);
}

// ---------- display ----------

const inner = (ml) => ml.replace(/^<math[^>]*>|<\/math>$/g, '');
export const ML = (t, vars = PVARS) => MT(t, { vars, funcs: FUNCS });
export const RD = (t, vars = PVARS) => toReadable(parse(t, { vars, funcs: FUNCS }));
// (a ; b ; c) as one MathML, each component read by the CAS.
export function tupML(texts, vars = PVARS) {
  const parts = texts.map((t) => inner(toMathML(parse(String(t), { vars, funcs: FUNCS }))));
  return `<math><mrow><mo>(</mo>${parts.join('<mo>;</mo>')}<mo>)</mo></mrow></math>`;
}
// The field F(x, y(, z)) = (…) as MathML.
export function fieldML(comps, name = 'F') {
  const args = comps.length === 2 ? 'x, y' : 'x, y, z';
  return `${name}(${args}) = ${tupML(comps)}`;
}
export const ptT = (p) => `(${p.map(fq).join(' ; ')})`;

// ---------- items ----------

// A lines item made of parts, each with its own judge (geo-kit's partsItem,
// spec §16.2): parts: [{html, ask, start, judge, notes?, decisions?
// (keep1: true keeps a decision a decision at level 1; levels: [..] to
// restrict), menu? (level 3), lines: [{math, note, subgoal, blank? (level 1),
// blank2? (level 2), from?}]}].
// The reference lines of a part that its judge takes one after the other:
// a middle line must be `ok` (or `stay` in guided mode), the last `done`;
// a middle line the judge already finds final (or untidy) is left out.
export function prune(p, guided) {
  if (p.lines.length < 2) return p;
  const J = JUDGES[p.judge.kind];
  let prev = readWith(p.judge, p.start);
  const state = {};
  const kept = [];
  p.lines.forEach((l, i) => {
    const last = i === p.lines.length - 1;
    let v;
    try { v = J.judgeLine(p.judge, prev, l.math, state); } catch { v = { kind: 'error' }; }
    const good = last || v.kind === 'ok' || (guided && v.kind === 'stay');
    if (good) { kept.push(l); prev = v.node ?? prev; }
  });
  return { ...p, lines: kept };
}

export function vParts(o) {
  const { level } = o;
  const guided = level <= 2;
  const parts = o.parts.map((p) => prune(p, guided));
  const judgeAt = (p) => (level === 3 && p.menu ? { ...p.judge, menu: p.menu } : p.judge);
  const script = [];
  parts.forEach((p, k) => {
    if (k > 0) script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge: judgeAt(p) });
    else if (p.html) script.push({ kind: 'note', html: p.html });
    for (const n of p.notes || []) script.push({ kind: 'note', html: n });
    for (const dec of p.decisions || []) {
      if (o.exam || (dec.levels && !dec.levels.includes(level))) continue;
      if (level === 1 && !dec.keep1) {
        const ok = dec.options.find((x) => x.ref) ?? dec.options.find((x) => x.valid && x.quality !== 'poor');
        script.push({ kind: 'note', html: `${dec.prompt} ${ok.label}.` });
      } else {
        const { levels, keep1, ...line } = dec;
        script.push(line);
      }
    }
    for (const l of p.lines) {
      if (l.from && level < l.from) continue;
      const line = { kind: 'eq', math: l.math, note: l.note || '', subgoal: l.subgoal };
      const b = level === 1 ? l.blank : (l.blank2 ?? l.blank);
      if (guided && b?.length) Object.assign(line, blanks(l.math, b));
      const pre = level === 1 ? l.pre1 : (l.pre2 ?? l.pre1);
      if (guided && pre?.blanks) line.blanks = pre.blanks;
      script.push(line);
    }
  });
  const item = linesItem({
    skill: o.skill, level, prompt: o.prompt, start: parts[0].start, judge: judgeAt(parts[0]),
    mode: modeOf(level), script, hints: o.hints, subgoals: o.subgoals, keys: o.keys || KEYS,
    key: o.key, tapActions: level === 3 ? 'menu' : null, fallback: o.fallback, exam: o.exam || false, noHints: o.noHints,
    baits: o.baits, expectedSec: o.expectedSec,
  });
  // Traps the parts offer without a candidate line (named by their judge).
  const extra = parts.flatMap((p) => p.baits || []);
  if (extra.length) item.baits = [...new Set([...item.baits, ...extra])];
  return item;
}

// Multiple choice with distinct options (the right one first in `right`).
export function mcqD(o, rng) {
  const options = [{ html: o.right, correct: true }];
  for (const w of [...(o.wrongs || []), ...(o.fillers || [])]) {
    if (options.length >= (o.count || 4)) break;
    if (!w || w.html === undefined || w.html === null || options.some((x) => x.html === w.html)) continue;
    options.push({ html: w.html, correct: false, rule: w.rule ?? null });
  }
  const it = mcq({ ...o, options, expectedSec: o.expectedSec || 90 }, rng);
  return { ...it, hints: o.exam || o.noHints ? [] : o.hints || [], noHints: !!(o.exam || o.noHints) };
}
export const opt = (html, rule = null) => ({ html, rule });

// A decision line.
export const decision = (prompt, options, extra = {}) => ({ kind: 'decision', prompt, options, ...extra });
// Menu options of the « choose the action » mode: the right one, then traps.
export const act = (id, label, valid = true, extra = {}) => ({ id, label, valid, ...extra });

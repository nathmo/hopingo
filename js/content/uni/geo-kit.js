// Tools shared by the generators of modules G4 and G10 (step U5): exact
// vectors (arrays of Q), texts of points, lines, planes and conics in the
// line languages of the judges `vector`, `geom` and `conic`, MathML of those
// lines, and guided blanks.
//
// Texts for the judges use « - » (vt, linT, eqT); texts for the screen use
// « − » (vr, fq). ML helpers show a line as its judge does.

import { Q } from '../../math/rational.js';
import { tokenize } from '../../cas/parse.js';
import { readWith, showWith } from '../../judges/index.js';
import { linesItem, mcq, tfItem, examTag, MT } from './kit.js';

export { linesItem, mcq, tfItem, examTag, MT };

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const qt = (x) => String(q(x));
export const fq = (x) => qt(x).replace(/-/g, '−');
export const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
export const pickW = (rng, list) => list[rng.int(0, list.length - 1)];

// ---------- vectors (arrays of Q) ----------

export const V = (...xs) => xs.map((x) => q(x));
export const add = (u, v) => u.map((x, i) => q(x).add(q(v[i])));
export const sub = (u, v) => u.map((x, i) => q(x).sub(q(v[i])));
export const scale = (u, k) => u.map((x) => q(x).mul(q(k)));
export const dot = (u, v) => u.reduce((s, x, i) => s.add(q(x).mul(q(v[i]))), new Q(0));
export const norm2 = (u) => dot(u, u);
export const cross = (u, v) => [q(u[1]).mul(q(v[2])).sub(q(u[2]).mul(q(v[1]))), q(u[2]).mul(q(v[0])).sub(q(u[0]).mul(q(v[2]))), q(u[0]).mul(q(v[1])).sub(q(u[1]).mul(q(v[0])))];
export const det2 = (u, v) => q(u[0]).mul(q(v[1])).sub(q(u[1]).mul(q(v[0])));
export const isZero = (u) => u.every((x) => q(x).n === 0);
export const eqV = (u, v) => u.every((x, i) => q(x).eq(q(v[i])));
export const mid = (A, B) => A.map((x, i) => q(x).add(q(B[i])).div(2));
export const isInt = (u) => u.every((x) => q(x).d === 1);
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
// The primitive whole vector of the same direction (first nonzero positive when sign).
export function prim(u, sign = false) {
  const den = u.reduce((l, x) => { const d = q(x).d; return (l * d) / gcd(l, d); }, 1);
  let w = u.map((x) => q(x).mul(den).n);
  const g = w.reduce((s, x) => gcd(s, x), 0) || 1;
  w = w.map((x) => x / g);
  if (sign) { const f = w.find((x) => x !== 0); if (f < 0) w = w.map((x) => -x); }
  return w.map((x) => q(x));
}
export const colinear = (u, v) => (u.length === 2 ? det2(u, v).n === 0 : isZero(cross(u, v)));

// ---------- texts ----------

export const vt = (v) => `(${v.map(qt).join(' ; ')})`;
export const vr = (v) => vt(v).replace(/-/g, '−');
export const ptR = (name, v) => `${name}${vr(v)}`;

// a·x as text: '', '-', '3', '(1/2)', for a coefficient before a letter.
function coefT(c, first) {
  const a = q(c);
  const abs = a.n < 0 ? a.neg() : a;
  const sign = a.n < 0 ? '-' : first ? '' : '+';
  const body = abs.eq(1) ? '' : abs.d === 1 ? qt(abs) : `(${qt(abs)})`;
  return { sign, body };
}
// Σ cᵢ·monoᵢ (constant: mono ''), text for the CAS: 2x^2-3xy+4.
export function sumT(terms) {
  const out = [];
  for (const [c, mono] of terms) {
    const a = q(c);
    if (a.n === 0) continue;
    const first = out.length === 0;
    if (!mono) { out.push(`${a.n < 0 ? '-' : first ? '' : '+'}${qt(a.n < 0 ? a.neg() : a)}`); continue; }
    const { sign, body } = coefT(a, first);
    out.push(`${sign}${body}${mono}`);
  }
  return out.length ? out.join('') : '0';
}
// The cartesian equation of a row [a, b, (c,) d]: ax + by + cz + d = 0.
export function linT(row, rhs = '0') {
  const vars = row.length === 3 ? ['x', 'y'] : ['x', 'y', 'z'];
  return `${sumT([...vars.map((v, i) => [row[i], v]), [row[row.length - 1], '']])} = ${rhs}`;
}
// The same, readable (− and spaces).
export const readable = (t) => t.replace(/([+\-=])/g, ' $1 ').replace(/\s+/g, ' ').replace(/^ - /, '−').replace(/-/g, '−').replace(/\^2/g, '²').replace(/\( /g, '(').trim();
// ax² + bxy + cy² + dx + ey + f = 0.
export const eqT = ([a, b, c, d, e, f]) => `${sumT([[a, 'x^2'], [b, 'xy'], [c, 'y^2'], [d, 'x'], [e, 'y'], [f, '']])} = 0`;
// (x ; y) = P + t·u (+ s·v).
export function paramT(P, dirs, names = ['t', 's']) {
  const coords = P.length === 2 ? '(x ; y)' : '(x ; y ; z)';
  return `${coords} = ${vt(P)}${dirs.map((d, i) => ` + ${names[i]}${vt(d)}`).join('')}`;
}

// √(x) of a rational, as text: '3', '3√6', '3√2/2', '√5' (and its value is exact).
export function rootT(x) {
  const r = q(x);
  // √(n/d) = √(n·d)/d.
  let m = r.n * r.d;
  let out = 1;
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; out *= f; }
  const c = new Q(out, r.d);
  if (m === 1) return qt(c);
  const num = c.n === 1 ? `√${m}` : `${c.n}√${m}`;
  return c.d === 1 ? num : `${num}/${c.d}`;
}
export const rootR = (x) => rootT(x).replace(/-/g, '−');

// ---------- MathML of a line, as its judge shows it ----------

export function LML(cfg, text) {
  try { return showWith(cfg, readWith(cfg, text)); } catch { return text; }
}
export const VML = (text, symbols = {}) => LML({ kind: 'vector', symbols, params: ['t', 's', 'k'] }, text);
export const GML = (text, dim = 2) => LML({ kind: 'geom', object: dim === 3 ? 'line3' : 'line2' }, text);
export const CML = (text) => LML({ kind: 'conic', equation: text }, text);

// ---------- guided blanks ----------

// Blanks on the given substrings of math (left to right), as token ranges
// of js/cas/parse.js's tokenizer (the judges' templates are drawn by the
// judge: vector, geom, conic). A substring not found is skipped.
export function blanks(math, parts) {
  const toks = tokenize(math, {});
  // The tokens side by side (the tokenizer's own spelling), and where each starts.
  const starts = [];
  let compact = '';
  for (const t of toks) { starts.push(compact.length); compact += t.s; }
  const out = [];
  // A label « u_2 = … » is never blanked.
  const lab = /^([A-Za-zΩα-ω_0-9']+)=/.exec(compact);
  let from = lab ? lab[0].length : 0;
  for (const p of parts) {
    let pc;
    try { pc = tokenize(p, {}).map((t) => t.s).join(''); } catch { continue; }
    const at = compact.indexOf(pc, from);
    if (at < 0 || !pc) continue;
    const i = starts.indexOf(at);
    if (i < 0) continue;
    let j = i;
    while (j < toks.length && starts[j] < at + pc.length) j++;
    if (j < toks.length && starts[j] !== at + pc.length && j > i) continue;
    out.push([i, j]);
    from = at + pc.length;
  }
  return out.length ? { math, blanks: out } : { math };
}

// ---------- items ----------

// A lines item made of parts, each with its own judge (§16.2):
// parts: [{html, ask, start, judge, notes?: [html], decisions?: [decision line]
//          (level 1: shown as a note; levels: [2, 3] to restrict), menu?: [options]
//          (level 3), lines: [{math, note, subgoal, blank?: [texts] (level 1),
//          blank2?: [texts] (level 2, else blank), from?: level (shown from it on)}]}]
export function partsItem(o) {
  const { level, parts } = o;
  const guided = level <= 2;
  const judgeAt = (p) => (level === 3 && p.menu ? { ...p.judge, menu: p.menu } : p.judge);
  const script = [];
  parts.forEach((p, k) => {
    if (k > 0) script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge: judgeAt(p) });
    else if (p.html) script.push({ kind: 'note', html: p.html });
    for (const n of p.notes || []) script.push({ kind: 'note', html: n });
    for (const dec of p.decisions || []) {
      if (o.exam || (dec.levels && !dec.levels.includes(level))) continue;
      if (level === 1) {
        const ok = dec.options.find((x) => x.ref) ?? dec.options.find((x) => x.valid && x.quality !== 'poor');
        script.push({ kind: 'note', html: `${dec.prompt} ${ok.label}.` });
      } else {
        const { levels, ...line } = dec;
        script.push(line);
      }
    }
    for (const l of p.lines) {
      if (l.from && level < l.from) continue;
      const line = { kind: 'eq', math: l.math, note: l.note || '', subgoal: l.subgoal };
      const b = level === 1 ? l.blank : (l.blank2 ?? l.blank);
      if (guided && b?.length) Object.assign(line, blanks(l.math, b));
      const cells = level === 1 ? l.cells : (l.cells2 ?? l.cells);
      if (guided && cells?.length) line.cells = cells; // grid of a matrix judge
      script.push(line);
    }
  });
  return linesItem({
    skill: o.skill, level, prompt: o.prompt, start: parts[0].start, judge: judgeAt(parts[0]),
    mode: modeOf(level), script, hints: o.hints, subgoals: o.subgoals, keys: o.keys || ['calc', 'geo', 'pts'],
    key: o.key, tapActions: level === 3 ? 'menu' : null, fallback: o.fallback, exam: o.exam || false, noHints: o.noHints,
    baits: o.baits,
  });
}

// Multiple choice with four distinct options (the right one first).
export function mcqD(o, rng) {
  const options = [{ html: o.right, correct: true }];
  for (const w of [...(o.wrongs || []), ...(o.fillers || [])]) {
    if (options.length >= (o.count || 4)) break;
    if (!w || w.html === undefined || options.some((x) => x.html === w.html)) continue;
    options.push({ html: w.html, correct: false, rule: w.rule ?? null });
  }
  return mcq({ ...o, options }, rng);
}
export const tfG = (o) => tfItem({ level: 4, ...o });
// A counter-example of analytic geometry (js/judges/geo-examples.js).
export const geoCounter = (want, ask, answer, params = {}) => ({ kind: 'geo', want, params, ask: ask.map(([v, label]) => ({ v, label, text: true })), answer });

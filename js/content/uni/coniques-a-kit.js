// Tools of the generators of module G10, part a (step U5): circles and the
// three conics in reduced form, as texts for the judges geom, conic and
// vector, and the `plot` items (js/judges/plot.js).

import { Q } from '../../math/rational.js';
import { q, qt, fq, sumT, readable, linesItem, modeOf } from './geo-kit.js';
import { referenceAnswer } from '../../judges/plot.js';
import { analyzeConic, coefsOfText } from '../../cas/conic.js';
import { tokenize } from '../../cas/parse.js';

// (x − h)² as text: x^2, (x-2)^2, (x+3)^2.
export function sqT(v, h) {
  const c = q(h);
  if (c.n === 0) return `${v}^2`;
  return `(${v}${c.n > 0 ? '-' : '+'}${qt(c.n > 0 ? c : c.neg())})^2`;
}
// (y − k) as text: y, (y-1), (y+3).
export function linT1(v, k) {
  const c = q(k);
  if (c.n === 0) return v;
  return `(${v}${c.n > 0 ? '-' : '+'}${qt(c.n > 0 ? c : c.neg())})`;
}
// x − h as text without brackets.
export const diffT = (v, h) => linT1(v, h).replace(/^\((.*)\)$/, '$1');

// Circle (x − h)² + (y − k)² = r², expanded and multiplied by m: text « … = 0 ».
export function circleEq(h, k, r2, m = 1) {
  const [H, K, R, M] = [q(h), q(k), q(r2), q(m)];
  return `${sumT([[M, 'x^2'], [M, 'y^2'], [H.mul(-2).mul(M), 'x'], [K.mul(-2).mul(M), 'y'], [H.mul(H).add(K.mul(K)).sub(R).mul(M), '']])} = 0`;
}
export const circleRed = (h, k, r2) => `${sqT('x', h)} + ${sqT('y', k)} = ${qt(r2)}`;
// The completed squares, constants not yet gathered: (x − 2)² − 4 + (y + 3)² − 9 − 12 = 0.
export function circleCompleted(h, k, F) {
  const parts = [sqT('x', h)];
  if (q(h).n !== 0) parts.push(`- ${qt(q(h).mul(q(h)))}`);
  parts.push(`+ ${sqT('y', k)}`);
  if (q(k).n !== 0) parts.push(`- ${qt(q(k).mul(q(k)))}`);
  if (q(F).n !== 0) parts.push(q(F).n > 0 ? `+ ${qt(F)}` : `- ${qt(q(F).neg())}`);
  return `${parts.join(' ')} = 0`;
}

// Readable equation text (with − and ²).
export const R = (t) => readable(t);

// A number as the judges write it in a product: 3, (-3).
export const par = (x) => (q(x).n < 0 ? `(${qt(x)})` : qt(x));
export const parR = (x) => par(x).replace(/-/g, '−');

// Whole vectors of norm r (r ≤ 13), all signs and orders.
const PYTH = { 1: [[1, 0]], 2: [[2, 0]], 3: [[3, 0]], 4: [[4, 0]], 5: [[5, 0], [3, 4], [4, 3]], 6: [[6, 0]], 7: [[7, 0]], 10: [[10, 0], [6, 8], [8, 6]], 13: [[13, 0], [5, 12], [12, 5]] };
export function normVecs(r) {
  const out = [];
  for (const [a, b] of PYTH[r] || []) {
    for (const [x, y] of [[a, b], [b, a]]) for (const s of [1, -1]) for (const t of [1, -1]) {
      const v = [s * x, t * y];
      if (!out.some((w) => w[0] === v[0] && w[1] === v[1])) out.push(v);
    }
  }
  return out;
}

// A cartesian line ax + by + c = 0 (whole, coprime, first coefficient > 0).
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
export function lineRow(a, b, c) {
  let r = [q(a), q(b), q(c)];
  const den = r.reduce((l, x) => (l * x.d) / gcd(l, x.d), 1);
  r = r.map((x) => x.mul(den));
  const g = r.reduce((s, x) => gcd(s, x.n), 0) || 1;
  r = r.map((x) => x.div(g));
  const first = r.find((x) => x.n !== 0);
  if (first && first.n < 0) r = r.map((x) => x.neg());
  return r;
}
export const lineText = (row) => `${sumT([[row[0], 'x'], [row[1], 'y'], [row[2], '']])} = 0`;

// The line Ax + By + C = 0 of the analysis (floats) as numbers for plot.
export const toQ = (x) => {
  for (let d = 1; d <= 60; d++) { const n = Math.round(x * d); if (Math.abs(n / d - x) < 1e-9) return new Q(n, d); }
  return null;
};

// A `plot` item of a conic: place Ω (or S), the vertices, foci, asymptotes…
// place: [{id, label, short, kind, count}], from the analysis of the equation.
export function conicPlot(o) {
  const an = analyzeConic(coefsOfText(o.equation));
  const expect = {};
  for (const p of o.place) {
    if (p.id === 'center') expect.center = [an.center];
    if (p.id === 'vertex') expect.vertex = [an.vertex];
    if (p.id === 'vertices') expect.vertices = an.vertices;
    if (p.id === 'foci') expect.foci = an.foci;
    if (p.id === 'asymptotes') expect.asymptotes = an.asymptotes;
    if (p.id === 'axis') expect.axis = [an.axis];
    if (p.id === 'directrix') expect.directrix = an.directrices.slice(0, 1);
  }
  for (const p of o.place) p.count = expect[p.id].length;
  const item = {
    skill: o.skill, level: o.level, type: 'plot', task: 'conic', prompt: o.prompt,
    view: o.view, place: o.place, expect, tol: { pos: 0.15, line: 0.25 }, equation: o.equation,
    rules: o.rules || {},
    hints: o.noHints || o.exam ? [] : o.hints, noHints: !!o.noHints || !!o.exam,
    solution: o.solution || [], baits: o.baits || [], subgoals: o.subgoals || [],
    key: `${o.skill}:plot:${o.key}`, expectedSec: o.expectedSec || 120,
    exam: o.exam || false, fallback: !!o.fallback,
    answerHtml: o.answerHtml || '',
  };
  item.answer = referenceAnswer(item);
  return item;
}

// Guided blanks, like geo-kit's blanks(), where a part may say what comes
// just before it: {after: '(x-1)^2', text: '1'}. Texts are compared as the
// tokenizer spells them.
export function blanksAt(math, specs) {
  const toks = tokenize(math, {});
  const starts = [];
  let compact = '';
  for (const t of toks) { starts.push(compact.length); compact += t.s; }
  const spell = (s) => { try { return tokenize(s, {}).map((t) => t.s).join(''); } catch { return null; } };
  const lab = /^([A-Za-zΩα-ω_0-9']+)=/.exec(compact);
  let from = lab ? lab[0].length : 0;
  const out = [];
  for (const sp of specs) {
    const { after, text } = typeof sp === 'string' ? { text: sp } : sp;
    if (after) {
      const a = spell(after);
      const ai = a ? compact.indexOf(a, from) : -1;
      if (ai < 0) continue;
      from = ai + a.length;
    }
    const pc = spell(text);
    if (!pc) continue;
    const at = compact.indexOf(pc, from);
    if (at < 0) continue;
    const i = starts.indexOf(at);
    if (i < 0) continue;
    let j = i;
    while (j < toks.length && starts[j] < at + pc.length) j++;
    if (j < toks.length && starts[j] !== at + pc.length) continue;
    out.push([i, j]);
    from = at + pc.length;
  }
  return out.length ? { math, blanks: out } : { math };
}

export { q, qt, fq };

// geo-kit's partsItem, with blanksAt (a blank may say what precedes it).
export function partsG(o) {
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
      if (guided && b?.length) Object.assign(line, blanksAt(l.math, b));
      script.push(line);
    }
  });
  return linesItem({
    skill: o.skill, level, prompt: o.prompt, start: parts[0].start, judge: judgeAt(parts[0]),
    mode: modeOf(level), script, hints: o.hints, subgoals: o.subgoals, keys: o.keys || ['calc', 'geo', 'pts'],
    key: o.key, tapActions: level === 3 ? 'menu' : null, fallback: o.fallback, exam: o.exam || false, noHints: o.noHints,
  });
}

// Tools of module G4, part a (step U5): an item made of parts whose
// decisions may sit between two lines, and texts of products, sums of
// squares and parametric coordinates. See geo-kit.js for the shared tools.

import { Q } from '../../math/rational.js';
import { linesItem, modeOf, blanks, q, qt, sumT, prim, dot, isZero } from './geo-kit.js';

// A number inside a product: 3, (−2), (1/2) — text for the judges.
export const par = (x) => (q(x).n < 0 || q(x).d !== 1 ? `(${qt(x)})` : qt(x));
// u₁·v₁ + u₂·v₂ (+ u₃·v₃) as text.
export const dotT = (u, v) => u.map((x, i) => `${par(x)}·${par(v[i])}`).join(' + ');
// u₁² + u₂² (+ u₃²) as text.
export const sqT = (u) => u.map((x) => `${par(x)}^2`).join(' + ');
// The coordinate a + b·t as text: (1+3t), 2t, 1.
export const coordT = (a, b, t) => { const s = sumT([[a, ''], [b, t]]); return /[+-]/.test(s.slice(1)) ? `(${s})` : s; };
// The row [n…, −n·P]: the line or plane through P with normal n, primitive.
export const rowThrough = (n, P) => prim([...n, dot(n, P).neg()], true);
// Σ mᵢ·(Aᵢ + vᵢt) + c = 0: a line or a plane with the parametric substituted.
export function substT(m, A, v, c, t = 't') {
  const terms = [];
  m.forEach((mi, i) => {
    const k = q(mi);
    if (k.n === 0) return;
    const coef = k.eq(1) ? '' : k.eq(-1) ? '-' : `${par(k)}·`;
    terms.push(`${coef}${coordT(A[i], v[i], t)}`);
  });
  if (q(c).n !== 0) terms.push(par(c));
  return `${terms.join(' + ').replace(/\+ -/g, '- ')} = 0`;
}
// x − 3, y + 2, z: the coordinate minus a number.
export const minusT = (v, a) => (q(a).n === 0 ? v : `${v}${q(a).n < 0 ? '+' : '-'}${qt(q(a).n < 0 ? q(a).neg() : q(a))}`);
// Small whole vectors orthogonal to v (space): (v₂ ; −v₁ ; 0), (0 ; v₃ ; −v₂), (v₃ ; 0 ; −v₁), nonzero.
export const orthoOf = (v) => [[v[1], q(v[0]).neg(), q(0)], [q(0), v[2], q(v[1]).neg()], [v[2], q(0), q(v[0]).neg()]].map((w) => w.map((x) => q(x))).filter((w) => !isZero(w)).map((w) => prim(w));
export const gcdN = (a, b) => (b ? gcdN(b, a % b) : Math.abs(a));
export const vecInt = (rng, n, lo, hi) => Array.from({ length: n }, () => q(rng.int(lo, hi)));
export const isPrim = (v) => v.reduce((g, x) => gcdN(g, q(x).n), 0) === 1;
export const QQ = (n, d = 1) => new Q(n, d);

// A lines item made of parts, each with its own judge (§16.2); a step is a
// line {math, note, subgoal, blank?, blank2?, cells?, from?} or a decision
// {decision: {prompt, options}, levels?} (level 1: shown as a note; levels:
// default 2 to 5). parts: [{html, ask, start, judge, menu?, steps}].
export function stepsItem(o) {
  const { level, parts } = o;
  const guided = level <= 2;
  const judgeAt = (p) => (level === 3 && p.menu ? { ...p.judge, menu: p.menu } : p.judge);
  const script = [];
  parts.forEach((p, k) => {
    if (k > 0) script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge: judgeAt(p) });
    else if (p.html) script.push({ kind: 'note', html: p.html });
    // A line equal to the one before it (as written) is left out.
    const flat = (t) => String(t).replace(/\s+/g, '');
    let before = p.start;
    for (const s of p.steps) {
      if (s.decision) {
        const levels = s.levels || [2, 3, 4, 5];
        if (level === 1) {
          const ok = s.decision.options.find((x) => x.ref) ?? s.decision.options.find((x) => x.valid && x.quality !== 'poor');
          script.push({ kind: 'note', html: `${s.decision.prompt} ${ok.label}.` });
        } else if (levels.includes(level)) script.push({ kind: 'decision', ...s.decision });
        continue;
      }
      if (s.note && !s.math) { script.push({ kind: 'note', html: s.note }); continue; }
      if (s.from && level < s.from) continue;
      if (s.upTo && level > s.upTo) continue;
      if (flat(s.math) === flat(before)) continue;
      before = s.math;
      const line = { kind: 'eq', math: s.math, note: s.note || '', subgoal: s.subgoal };
      const b = level === 1 ? s.blank : (s.blank2 ?? s.blank);
      if (guided && b?.length) Object.assign(line, blanks(s.math, b));
      const cells = level === 1 ? s.cells : (s.cells2 ?? s.cells);
      if (guided && cells?.length) line.cells = cells;
      script.push(line);
    }
  });
  return linesItem({
    skill: o.skill, level, prompt: o.prompt, start: parts[0].start, judge: judgeAt(parts[0]),
    mode: modeOf(level), script, hints: o.hints, subgoals: o.subgoals, keys: o.keys || ['calc', 'geo', 'pts'],
    key: o.key, tapActions: level === 3 ? 'menu' : null, fallback: o.fallback, exam: o.exam || false, noHints: o.noHints,
  });
}

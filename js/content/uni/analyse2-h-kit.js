// Helpers of module A2, part h (unit `analyse2`, step U6): texts of
// coefficients and sums for the lines of the `ode` judge, sums of terms
// [Q, monomial], the true/false items with a counter-example of the part,
// multiple choice with four distinct options, problems made of V/F parts.

import { Q } from '../../math/rational.js';
import { MT, mcq, tfItem } from './kit.js';
import { problemItem } from './kit-problem.js';
import { t } from '../../i18n.js';

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const qt = (x) => String(q(x));
// c·body as text: 'x', '-x', '3x', '(3/2)x', '-(3/2)x'; body '' gives the number.
export function term(c, body) {
  const C = q(c);
  if (C.n === 0) return '';
  if (!body) return qt(C);
  if (C.eq(1)) return body;
  if (C.eq(-1)) return `-${body}`;
  if (C.d === 1) return `${C.n}${body}`;
  return `${C.n < 0 ? '-' : ''}(${Math.abs(C.n)}/${C.d})${body}`;
}
// Terms joined into a sum, empty ones skipped ('0' if none).
export const sumT = (terms) => terms.filter((u) => u && u !== '0').reduce((s, u) => (s ? (u.startsWith('-') ? `${s}${u}` : `${s}+${u}`) : u), '') || '0';
// A sum of [c, mono] pairs.
export const polyT = (pairs) => sumT(pairs.map(([c, m]) => term(c, m)));
export const scaleP = (pairs, k) => pairs.map(([c, m]) => [q(c).mul(q(k)), m]);
// A factor before a letter or a bracket: '' for 1, '-' for −1, '3', '(3/2)'.
export const fac = (c) => { const C = q(c); if (C.eq(1)) return ''; if (C.eq(-1)) return '-'; return C.d === 1 ? String(C.n) : `(${qt(C)})`; };
// A number as a factor in a product: 3, (−1/2).
export const num = (c) => { const s = qt(c); return /^\d+$/.test(s) ? s : `(${s})`; };
// e^(k·v) as text: e^x, e^(-2x), 1 for k = 0.
export const expT = (k, v = 'x') => { const K = q(k); if (K.n === 0) return '1'; const u = term(K, v); return /^[a-z]$/.test(u) ? `e^${u}` : `e^(${u})`; };
// Readable text for the screen: − and spaces around + and =.
export const rd = (s) => String(s).replace(/-/g, '−');
export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
export const E = (math, note, subgoal, act) => ({ kind: 'eq', math, note, subgoal, act });

// Four distinct options (§16.3): the right one, then wrongs in order, then
// fillers, each wrong option with its rule.
export function mcq4(o, rng) {
  const options = [{ html: o.right, correct: true }];
  for (const w of [...(o.wrongs || []), ...(o.fillers || [])]) {
    if (options.length >= 4) break;
    if (!w || w.html === undefined || options.some((x) => x.html === w.html)) continue;
    options.push({ html: w.html, correct: false, rule: w.rule ?? null });
  }
  return mcq({ ...o, options }, rng);
}
// An option written as a formula.
export const opt = (text, rule = null) => ({ html: MT(text), rule });

// A true/false statement: s = {key, text, truth, why, counter?, ruleIfTrue?,
// ruleIfFalse?}.
export function tfOf(skill, s, level, exam, hints) {
  return tfItem({
    skill, level, truth: s.truth, key: s.key, statement: s.text,
    counter: s.counter || null, ruleIfTrue: s.ruleIfTrue || null, ruleIfFalse: s.ruleIfFalse || null,
    explanation: s.why, exam, hints, expectedSec: 60,
  });
}

// A problem made of several V/F (level 5: « 4 V/F au format des QCM »).
export function tfProblem(skill, level, statements, key) {
  return problemItem({
    skill, level, prompt: t('Vrai ou faux ? {n} énoncés, un point chacun.', { n: statements.length }),
    parts: statements.map((s, i) => ({ item: tfOf(skill, s, level, false, []), points: 1, title: t('Énoncé {n}', { n: i + 1 }) })),
    key, expectedSec: 60 * statements.length,
  });
}

// k distinct items of a list, in a random order.
export function pickK(rng, list, k) {
  const pool = [...list];
  const out = [];
  while (out.length < k && pool.length) out.push(pool.splice(rng.int(0, pool.length - 1), 1)[0]);
  return out;
}

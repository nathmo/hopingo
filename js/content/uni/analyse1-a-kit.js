// Helpers of the generators of module A1, part a (step U2): guided blanks,
// the « choose the action » menus of level 3, hints, numbers as text.
// The same shapes as js/content/uni/explog.js (U1b style).

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { walk, lit } from '../../cas/ast.js';
import { blankLine, templateOf } from '../../judges/lines.js';
import { MT, mcq } from './kit.js';

export const N = (x) => toText(lit(Q.of(x)));
export const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const E = (math, note, subgoal, act) => ({ kind: 'eq', math, note, subgoal, act });
export const examOf = (opts, points = 1) => (opts?.exam ? { format: opts.exam, points } : false);
export const uniqOptions = (opts) => opts.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);

// A line with the sub-expressions written in `texts` left blank.
export function tpl(math, texts, opts = {}) {
  const node = parse(math, opts);
  const holes = [];
  for (const t of texts) {
    const want = toText(parse(t, opts));
    let found = null;
    walk(node, (n) => {
      if (found || holes.includes(n)) return false;
      if (n.t !== 'paren' && !holes.includes(n) && toText(n) === want) { found = n; return false; }
      return true;
    });
    if (found) holes.push(found);
  }
  return holes.length ? blankLine(node, holes, opts) : { math };
}
export const blanked = (line, texts, opts) => ({ ...line, ...tpl(line.math, texts, opts) });

// The template of a line with boxes, as MathML (hint 2).
export const boxed = (line, opts = {}) => MT(line.blanks?.length ? templateOf(line, opts) : line.math, opts);

// Level 3: one menu per reference line of a part; the action of the line
// is right. choices: [{id, label, why?, rule?}].
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

// A segment of a lines item: {kind:'segment', …} followed by its lines.
export const segment = (html, ask, start, judge) => ({ kind: 'segment', html, ask, start: { math: start }, judge });

// Signed text: a + b with b a number (x+3, x−2, x).
export const plus = (a, b) => (b === 0 ? a : b > 0 ? `${a}+${N(b)}` : `${a}-${N(-b)}`);
// k·t as text: t, −t, 3t, (1/2)t.
export function times(k, t) {
  const K = Q.of(k);
  if (K.eq(1)) return t;
  if (K.eq(-1)) return `-${t}`;
  if (K.d === 1) return `${K.n}${/^[a-z(√|]/i.test(t) ? '' : '×'}${t}`;
  return `${K.n < 0 ? '-' : ''}(${Math.abs(K.n)}/${K.d})${t}`;
}
// French number in text (−3/4).
export const frN = (x) => N(x).replace(/-/g, '−');

// A true/false question as a two-option multiple choice (the statement is
// about one function: no counter-example to type).
export function vfMcq(skill, statement, truth, rule, why, rng, key) {
  return mcq({
    skill, level: 4, prompt: `Vrai ou faux ?<br>« ${statement} »`, keepOrder: true,
    options: [{ html: 'Vrai', correct: truth, rule: truth ? null : rule }, { html: 'Faux', correct: !truth, rule: truth ? rule : null }],
    key: `tf:${key}`, exam: { format: 'tf', points: 1 }, expectedSec: 60, solution: [{ html: why, note: '' }],
  }, rng);
}


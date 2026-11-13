// Helpers shared by the generators of module A1, part b (step U2): guided
// blanks, the level-3 menus, items made of parts (segments), the exam tags
// and small text helpers. Same style as js/content/uni/explog.js.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText, toReadable } from '../../cas/print.js';
import { walk, lit } from '../../cas/ast.js';
import { blankLine } from '../../judges/lines.js';
import { linesItem, mcq, MT } from './kit.js';
import { t } from '../../i18n.js';

export const q = (n, d = 1) => new Q(n, d);
export const N = (x) => toText(lit(Q.of(x)));
export const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
export const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const E = (math, note, subgoal, act) => ({ kind: 'eq', math, note, subgoal, act });
export const examOf = (opts, points = 1) => (opts?.exam ? { format: opts.exam, points } : false);
export const SEC = { 1: 60, 2: 90, 3: 120, 4: 180, 5: 300 };
// Readable text of a number or an expression (French minus sign).
export const RD = (t, opts = {}) => toReadable(parse(String(t), opts));
// MathML of a text with the variables of opts.
export const ML = (t, vars = ['x']) => MT(String(t), { vars });
// A number written as a coefficient: 3, (−1/2).
export const ex = (k) => { const s = N(k); return /^\d+$/.test(s) ? s : `(${s})`; };
// k·word as text: x, −x, 3x, (1/2)x.
export function kx(k, w = 'x') {
  const K = Q.of(k);
  if (K.n === 0) return '0';
  if (K.eq(1)) return w;
  if (K.eq(-1)) return `-${w}`;
  if (K.d === 1) return `${K.n}${w}`;
  return `${K.n < 0 ? '-' : ''}(${Math.abs(K.n)}/${K.d})${w}`;
}
// A sum of terms written as text, signs merged: x+1-2, x-3.
export const joinSum = (terms) => terms.filter((t) => t && t !== '0').reduce((s, t) => (s ? (t.startsWith('-') ? `${s}${t}` : `${s}+${t}`) : t), '') || '0';
// x − r as text (x + 3, x − 2, x).
export const lin = (r, v = 'x') => { const R = Q.of(r); return R.n === 0 ? v : R.n < 0 ? `${v}+${N(R.neg())}` : `${v}-${N(R)}`; };
// A number inside an expression: 3, (−2).
export const P = (k) => (Q.of(k).n < 0 ? `(${N(k)})` : N(k));

// A line with the sub-expressions written in `texts` left blank.
export function tpl(math, texts, opts = {}) {
  const node = parse(math, opts);
  const holes = [];
  for (const t of texts) {
    const want = toText(parse(t, opts));
    let found = null;
    walk(node, (n) => {
      if (found) return false;
      if (n.t !== 'paren' && !holes.includes(n) && toText(n) === want) { found = n; return false; }
      return !(n.t === 'neg' && !want.startsWith('-'));
    });
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
      why: c.why || t('Ce n\'est pas l\'étape à faire maintenant.'),
      ...(c.rule && c.id !== l.act ? { rule: c.rule } : {}),
    })),
  }));
}

// An item made of parts: part = {start, judge, html?, ask?, pre?: [lines],
// lines}. At level 3 each part's judge gets its menus from `choices`.
export function partsItem(o) {
  const parts = o.parts.map((p) => ({ ...p, judge: o.level === 3 && o.choices ? { ...p.judge, menus: stepMenus(p.start, p.lines, o.choices) } : p.judge }));
  const [first, ...rest] = parts;
  const script = [...(o.before || []), ...(first.html ? [{ kind: 'note', html: `<b>${first.html}</b>` }] : []), ...(first.pre || []), ...first.lines];
  for (const p of rest) script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge: p.judge }, ...(p.pre || []), ...p.lines);
  const exam = o.exam || false;
  const used = new Set(script.filter((l) => l.subgoal).map((l) => l.subgoal));
  return linesItem({
    skill: o.skill, level: o.level, prompt: o.prompt,
    start: first.start, judge: first.judge, mode: o.mode || modeOf(o.level), script,
    hints: o.hints, noHints: o.noHints, subgoals: (o.subgoals || []).filter((g) => used.has(g.id)), tapActions: o.level === 3 && o.choices ? 'steps' : null,
    keys: o.keys, key: o.key, exam, fallback: o.fallback, baits: o.baits,
    expectedSec: o.expectedSec || (exam ? 600 : SEC[o.level]),
    declares: o.declares,
  });
}

// A multiple choice with distinct options (the first `n` distinct ones).
export function mcqOf(o, rng) {
  const seen = new Set();
  const options = [];
  for (const x of o.options) {
    if (seen.has(x.html) || options.length >= (o.n || 4)) continue;
    if (!x.correct && options.length >= (o.n || 4) - 1 && !options.some((y) => y.correct)) continue;
    seen.add(x.html);
    options.push(x);
  }
  return mcq({ ...o, options }, rng);
}

// A true/false question asked as a two-option multiple choice (the pilot's
// tfVariant): for statements about functions, which no counter-example
// checker reads yet.
export function vfItem(o, rng) {
  return mcq({
    skill: o.skill, level: o.level ?? 4, keepOrder: true,
    prompt: t('Vrai ou faux ?<br>« {statement} »', { statement: o.statement }),
    options: [{ html: t('Vrai'), correct: o.truth, rule: o.truth ? null : o.rule || null }, { html: t('Faux'), correct: !o.truth, rule: o.truth ? o.rule || null : null }],
    key: `tf:${o.key}`, solution: [{ html: o.why, note: '' }], expectedSec: 60,
    exam: o.exam || false, fallback: o.fallback,
  }, rng);
}

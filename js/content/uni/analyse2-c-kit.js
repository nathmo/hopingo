// Helpers shared by the generators of module A2, part c (step U6):
// polynomials in x, y (z) with whole or rational coefficients (text,
// derivative, value), texts of numbers and shifts, the items of the part
// (parts with their own judge from geo-kit.js, exam multiple choices,
// « Vrai / Faux » choices, a coefficient asked alone).

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toReadable } from '../../cas/print.js';
import { MT, mcq, linesItem, examTag, tfItem } from './kit.js';
import { partsItem as geoParts, H, nz, modeOf } from './geo-kit.js';
import { A2_KEYS } from './a2-kit.js';
import { t } from '../../i18n.js';

export { MT, mcq, linesItem, examTag, tfItem, H, nz, modeOf, A2_KEYS };

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
// A rational as CAS text: 3, -3, 3/4, -3/4.
export const qt = (x) => String(q(x));
// The same for the screen: − instead of -.
export const fq = (x) => qt(x).replace(/-/g, '−');
// As a factor: 3, (-3), (3/4).
export const qf = (x) => { const s = qt(x); return /^\d+$/.test(s) ? s : `(${s})`; };
// Readable text of a CAS text (− and ·), for prompts and notes.
export const RD = (t, vars = ['x', 'y', 'z']) => toReadable(parse(t, { vars }));
export const ML = (t, vars = ['x', 'y', 'z', 'u', 'v', 'r', 'φ', 'α']) => MT(t, { vars });
export const pickW = (rng, list) => list[rng.int(0, list.length - 1)];

// ---------- polynomials: [{c: Q, e: [i, j(, k)]}] ----------

const VARS = ['x', 'y', 'z'];
export function monoT(e, vars = VARS) {
  return e.map((k, i) => (k === 0 ? '' : k === 1 ? vars[i] : `${vars[i]}^${k}`)).filter(Boolean).join('');
}
// Σ c·mono as text for the CAS: 3x^2y-2y^3+x (0 for an empty sum).
export function polyT(terms, vars = VARS) {
  let out = '';
  for (const { c, e } of terms) {
    const a = q(c);
    if (a.n === 0) continue;
    const m = monoT(e, vars);
    const abs = a.n < 0 ? a.neg() : a;
    const sign = a.n < 0 ? '-' : out ? '+' : '';
    const body = !m ? qt(abs) : abs.eq(1) ? m : abs.d === 1 ? `${qt(abs)}${m}` : `(${qt(abs)})${m}`;
    out += sign + body;
  }
  return out || '0';
}
export const polyD = (terms, i) => terms.filter((t) => t.e[i] > 0).map((t) => ({ c: q(t.c).mul(t.e[i]), e: t.e.map((k, j) => (j === i ? k - 1 : k)) }));
export const polyAt = (terms, p) => terms.reduce((s, t) => s.add(t.e.reduce((m, k, i) => m.mul(powQ(q(p[i]), k)), q(t.c))), q(0));
function powQ(x, k) { let r = q(1); for (let i = 0; i < k; i++) r = r.mul(x); return r; }
export const degOf = (terms) => Math.max(0, ...terms.map((t) => t.e.reduce((s, k) => s + k, 0)));

// x − a as text: 'x', 'x-1', 'x+2'.
export const shiftT = (v, a) => { const A = q(a); return A.n === 0 ? v : A.n > 0 ? `${v}-${qt(A)}` : `${v}+${qt(A.neg())}`; };
// c·(x − a) as a term after others: '+3(x-1)', '-(y+2)', '+(1/2)x'.
export function termT(c, body, first = false) {
  const a = q(c);
  if (a.n === 0) return '';
  const wrapped = /^[a-z]$/.test(body) ? body : `(${body})`;
  const abs = a.n < 0 ? a.neg() : a;
  const sign = a.n < 0 ? '-' : first ? '' : '+';
  const coef = abs.eq(1) ? '' : abs.d === 1 ? qt(abs) : `(${qt(abs)})`;
  return `${sign}${coef}${wrapped}`;
}
// The point (a ; b) for the screen.
export const ptT = (p) => `(${p.map(fq).join(' ; ')})`;
// The same as CAS / matexpr text.
export const vecT = (p) => `(${p.map(qt).join(' ; ')})`;
export const rowT = (rows) => `[${rows.map((r) => `[${r.map(qt).join(',')}]`).join(',')}]`;

// ---------- items ----------

// A lines item in parts (geo-kit's partsItem) with the keypads of A2.
export const partsItem = (o) => geoParts({ keys: A2_KEYS, ...o });

// Four distinct options (the right one first in `right`); exam tag, or
// level 5 without hints.
export function examMcq(o, rng, opts = {}) {
  const options = [{ html: o.right, correct: true }];
  for (const w of [...(o.wrongs || []), ...(o.fillers || [])]) {
    if (options.length >= 4) break;
    if (!w || w.html === undefined || options.some((x) => x.html === w.html)) continue;
    options.push({ html: w.html, correct: false, rule: w.rule ?? null });
  }
  const it = mcq({ ...o, options, level: opts.exam ? 4 : o.level ?? 5, expectedSec: o.expectedSec || 150, exam: opts.exam ? { format: 'mcq', points: 1 } : false }, rng);
  return { ...it, noHints: true, hints: [], fallback: !!o.fallback };
}

// « Vrai / Faux » as a two-option choice (exam format tf), when no checker
// of counter-examples fits the statement.
export function vfMcq(skill, statement, truth, rng, { key, why, ruleIfTrue = null, ruleIfFalse = null }) {
  return mcq({
    skill, level: 4, prompt: t('Vrai ou faux ?<br>« {s} »', { s: statement }), keepOrder: true,
    options: [{ html: t('Vrai'), correct: truth, rule: truth ? null : ruleIfTrue }, { html: t('Faux'), correct: !truth, rule: truth ? ruleIfFalse : null }],
    key: `${skill}:tf:${key}`, solution: [{ html: why, note: '' }], expectedSec: 60, exam: { format: 'tf', points: 1 },
  }, rng);
}

// A true/false with a counter-example of module A2 (js/judges/a2-examples.js).
export const a2Counter = (prop, params, ask, answer) => ({ kind: 'a2', prop, params, ask: ask.map(([v, label]) => ({ v, label, keys: ['calcx', 'calcfn', 'a2'] })), answer });

// One number asked alone (exam variant `coef`, or the last question of a
// level 5): a lines item whose only line is the value, judged by `value`
// with the extra fields the traps read (judge).
export function coefLines(o) {
  const value = String(o.value);
  const radical = /√|π|e/.test(value);
  const item = linesItem({
    skill: o.skill, level: o.level ?? 4, prompt: o.prompt, start: o.label,
    judge: { kind: 'value', expect: value, form: radical ? 'exact' : 'irreducible', ...(o.judge || {}) },
    mode: 'free', script: [{ kind: 'eq', math: value, note: o.note || '' }],
    hints: [], noHints: true, subgoals: o.subgoals || [], keys: ['calc'],
    key: `${o.skill}:coef:${o.key}`, exam: o.exam ?? false, fallback: o.fallback,
    baits: o.baits, solution: o.solution, expectedSec: o.expectedSec || 150,
  });
  item.final = { form: 'any', askCoef: { label: o.label } };
  return item;
}

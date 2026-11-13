// Helpers shared by the generators of module A1, part e (unit `analyse1`,
// step U2): lines with blanks, menus of the « choose the action » mode,
// numbers written as text, verdict lines of convention 5 (catalogue A1).

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { walk, lit } from '../../cas/ast.js';
import { blankLine } from '../../judges/lines.js';
import { t } from '../../i18n.js';

export const V = 'x';
export const q = (n, d = 1) => new Q(n, d);
export const N = (x) => toText(lit(Q.of(x)));
export const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
export const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const E = (math, note, subgoal, act) => ({ kind: 'eq', math, note, subgoal, act });
export const KEYS = ['calcx', 'calcfn', 'anal'];

// A segment (a new part with its own judge).
export const SEG = (html, ask, start, judge) => ({ kind: 'segment', html, ask, start: { math: start }, judge });

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
      return true;
    });
    if (found) holes.push(found);
  }
  return holes.length ? blankLine(node, holes, opts) : { math };
}
export const blanked = (line, texts, opts) => ({ ...line, ...tpl(line.math, texts, opts) });

// Level 3: one menu per reference line of a part; the action of the line
// is right. choices: [{id, label, rule?, why?}].
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
export const withMenus = (judge, level, start, lines, choices) => (level === 3 ? { ...judge, menus: stepMenus(start, lines, choices) } : judge);

// Builds the script of an item made of parts: [{html, ask, start, judge,
// pre: [decisions…], lines}], the first part being the item's own start.
// Returns {start, judge, script}; level 3 adds each part's menu.
export function partsScript(parts, level, choices) {
  const [first, ...rest] = parts;
  const menuOf = (p) => withMenus(p.judge, level, p.start, p.lines, choices);
  const script = [...(first.pre || []), ...first.lines];
  for (const p of rest) script.push(SEG(p.html, p.ask, p.start, menuOf(p)), ...(p.pre || []), ...p.lines);
  return { start: first.start, judge: menuOf(first), script };
}

// c·body as text: 3ln(u), −ln(u), (1/2)ln(u), −(3/2)ln(u); '' for c = 0.
export function cterm(c, body) {
  const C = Q.of(c);
  if (C.n === 0) return '';
  if (C.eq(1)) return body;
  if (C.eq(-1)) return `-${body}`;
  if (C.d === 1) return `${C.n}${body}`;
  return `${C.n < 0 ? '-' : ''}(${Math.abs(C.n)}/${C.d})${body}`;
}
// c·π as text: π, −π, 3π, π/2, 3π/4, −π/4.
export function piText(c) {
  const C = Q.of(c);
  if (C.n === 0) return '0';
  const s = C.n < 0 ? '-' : '';
  const a = Math.abs(C.n);
  const top = a === 1 ? 'π' : `${a}π`;
  return C.d === 1 ? `${s}${top}` : `${s}${top}/${C.d}`;
}
// Terms joined into a sum (empty terms skipped).
export const joinSum = (terms) => terms.filter((t) => t && t !== '0').reduce((s, t) => (s ? (t.startsWith('-') ? `${s}${t}` : `${s}+${t}`) : t), '') || '0';
// A number as a factor: 3, (−1/2).
export const fac = (x) => { const s = N(x); return /^\d+$/.test(s) ? s : `(${s})`; };
export const fr = (s) => String(s).replace(/-/g, '−');
// Exponents written as superscripts in plain text: x^3 → x³, (x+1)^2 → (x+1)².
const SUPS = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
export const sup = (s) => fr(String(s).replace(/\^(-?\d+)/g, (m, d) => [...d].map((c) => SUPS[c]).join('')).replace(/\^\(([-\d/]+)\)/g, '^($1)'));

// The verdict of convention 5 (catalogue A1): a decision « Nature ? »
// followed by a self-explanation « Quel critère ? ».
// right: 'abs' | 'semi' | 'div'; rules: {abs?, semi?, div?} trap ids of
// the wrong options; whys: their explanations.
export function verdictLines(right, { rules = {}, whys = {}, criteria, correct }) {
  const opt = (id, label) => ({
    id, label, valid: id === right,
    ...(id !== right && rules[id] ? { rule: rules[id] } : {}),
    why: whys[id] || (id === 'semi' ? t('f garde un signe constant : |f| = ±f, la convergence est absolue.') : t('Relis le calcul ou la comparaison.')),
  });
  return [
    { kind: 'decision', prompt: t('Nature de l\'intégrale ?'), options: [opt('abs', t('converge absolument')), opt('semi', t('converge, pas absolument')), opt('div', t('diverge'))] },
    { kind: 'rule', ask: t('Quel critère ?'), correct, options: criteria },
  ];
}

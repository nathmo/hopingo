// Tools of module F, part d (unit `fourier`, step U10): the partial
// differential equations (heat, waves, Laplace).
//
// Lines are named values: each part asks one quantity (the modes Xₙ, the
// rate λₙ, a coefficient bₙ(0), a mode bₖ(t), the solution u) and is judged
// by the `prob` judge with `vars` (js/judges/statjudge.js): every member of
// a line is compared by the core's `equivalent` with the reference (cfg.expect)
// on samples of its variables (n whole, x in the interval, t in [0 ; ½]…).
// A part may carry its own judge instead (the `transform` judge for f̂ by the
// table). The traps of the part are wrong texts in cfg.traps (rules/fd.js).
//
// fdItem(o): a lines item made of such parts (built by partsItem of
//   geo-kit.js, like statItem of proba-kit.js, but with readable labels and
//   any judge per part). o = {skill, level, prompt, key, parts, hints, subgoals,
//   exam?, noHints?, keys?, baits?, fallback?, pde?}
//   part = {label (typed: 'X_n', 'b_n(0)'), shown? (unicode: 'Xₙ(x)'),
//     labels?, expect, vars, domain, traps?: {id: [texts]}, judge? (instead
//     of prob), title?, notes?, decisions?, action?, wrongActions?, lines}
// mcqMulti(o, rng): the exam multiple choice of module F (several right
//   options, « plusieurs »).
// The numeric check of the PDE and its conditions is fourier-d-pde.js.

import { Q } from '../../math/rational.js';
import { partsItem, H, modeOf } from './geo-kit.js';
import { mcq, MT } from './kit.js';
import { problemItem } from './kit-problem.js';
import { t } from '../../i18n.js';

export { H, modeOf, MT, problemItem };

export const KEYS = ['calc', 'calcfn', 'seq', 'greek', 'anal'];
export const KEYS_POLAR = ['calc', 'calcfn', 'a2', 'greek', 'seq'];
export const KEYS_FT = ['calc', 'calcfn', 'transf', 'greek', 'seq'];

// ---------- numbers and texts ----------

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const qt = (x) => String(q(x));
// c·body as text: 'x', '-x', '3x', '(3/2)x'; body '' gives the number.
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
export const sumT = (terms) => terms.filter((tt) => tt && tt !== '0').reduce((s, tt) => (s ? (tt.startsWith('-') ? `${s}${tt}` : `${s}+${tt}`) : tt), '') || '0';
// Readable text: − for -.
export const rd = (tt) => String(tt).replace(/-/g, '−');
// A rational times π^p as text: 'π', '3π', '9π^2/4', '(1/4)'… (p = 0: the number).
export function piT(c, p = 1) {
  const C = q(c);
  if (C.n === 0) return '0';
  const pi = p === 0 ? '' : p === 1 ? 'π' : `π^${p}`;
  if (!pi) return qt(C);
  const num = Math.abs(C.n) === 1 ? pi : `${Math.abs(C.n)}${pi}`;
  const body = C.d === 1 ? num : `${num}/${C.d}`;
  return C.n < 0 ? `-${body}` : body;
}
// e^(−r·t) as text, r a text ('16', 'n^2', '9π^2/4+1'); brackets only
// around a sum or a fraction.
export function decay(r, tt = 't') {
  if (r === '0') return '';
  if (r === '1') return `e^(-${tt})`;
  return /[+\-/]/.test(r.replace(/^-/, '')) ? `e^(-(${r})${tt})` : `e^(-${r}${tt})`;
}
// c·f as a product text with the factor in front ('3sin(x)', '-cos(2x)').
export const times = (c, f) => term(c, f);
// A whole multiple of x in a function: 'x', '3x', 'πx', '3πx/2'.
export function argT(c, v = 'x') {
  const C = q(c);
  // C·π (the frequency of a mode): '3πx/2'.
  return C.d === 1 ? `${C.n === 1 ? '' : C.n === -1 ? '-' : C.n}${v}` : `${C.n === 1 ? '' : C.n}${v}/${C.d}`;
}

// ---------- items ----------

// The prob judge of a part (named value with variables).
function cfgOf(p) {
  const cfg = {
    kind: 'prob', name: p.name ?? null, label: p.label, labels: [...(p.shown ? [p.shown] : []), ...(p.labels || [])],
    rel: `${p.shown ?? p.label} =`, start: p.shown ?? p.label, expect: p.expect, vars: p.vars, domain: p.domain,
  };
  if (p.traps && Object.keys(p.traps).length) cfg.traps = p.traps;
  return cfg;
}

// The menu of level 3 for part k: its action, the others' (not now), and
// the wrong actions it names (at most 4 options).
function menuOf(parts, k) {
  const p = parts[k];
  if (!p.action) return null;
  const out = [{ id: `a${k}`, label: p.action, valid: true }];
  const others = [];
  parts.forEach((o, i) => {
    if (i === k || !o.action || o.action === p.action) return;
    others.push({ id: `a${i}`, label: o.action, valid: false, why: i < k ? t('C\'est déjà fait.') : t('Pas encore : il faut d\'abord la grandeur demandée maintenant.') });
  });
  const wrong = (p.wrongActions || []).map((w, j) => ({ id: `w${j}`, label: w.label, valid: false, why: w.why, ...(w.rule ? { rule: w.rule } : {}) }));
  return [...out, ...[...wrong, ...others].slice(0, 3)];
}

export function fdItem(o) {
  const { level } = o;
  const exam = o.exam || false;
  const parts = o.parts.map((p, k) => ({
    html: k > 0 ? `<b>${p.title ?? p.shown ?? p.label}</b>` : (p.title ? `<b>${p.title}</b>` : null),
    ask: p.ask,
    start: p.judge ? p.start : (p.shown ?? p.label),
    judge: p.judge ?? cfgOf(p),
    notes: p.notes,
    decisions: (p.decisions || []).map((d) => ({ kind: 'decision', ...d })),
    menu: menuOf(o.parts, k),
    lines: p.lines,
  }));
  const baits = [...new Set([
    ...o.parts.flatMap((p) => Object.keys(p.traps || p.judge?.traps || {})),
    ...(exam ? [] : o.parts.flatMap((p) => (p.decisions || []).flatMap((d) => d.options.map((x) => x.rule)).filter(Boolean))),
    ...(level === 3 && !exam ? o.parts.flatMap((p) => (p.wrongActions || []).map((w) => w.rule)).filter(Boolean) : []),
    ...(o.baits || []),
  ])];
  const item = partsItem({
    skill: o.skill, level, prompt: o.prompt, parts, hints: o.hints, subgoals: o.subgoals,
    keys: o.keys || KEYS, key: `${o.skill}:${o.key}`, fallback: o.fallback, exam, noHints: o.noHints, baits,
  });
  if (o.expectedSec) item.expectedSec = o.expectedSec;
  if (o.pde) item.pde = o.pde;
  return item;
}

// A problem made of one fdItem (its parts are the steps): points per step.
// o.item: an item already built (else o.parts are built here). extra: other
// parts [{item, points, title?, before?}].
export function fdProblem(o, points, extra = []) {
  const lines = o.item ?? fdItem({ ...o, level: o.level ?? 5, noHints: true });
  const p = problemItem({
    skill: o.skill, level: o.level ?? 5, prompt: o.prompt,
    parts: [...extra.filter((e) => e.before).map((e) => ({ item: e.item, points: e.points, title: e.title })),
      { item: { ...lines, prompt: o.partPrompt ?? '' }, points, title: o.title },
      ...extra.filter((e) => !e.before).map((e) => ({ item: e.item, points: e.points, title: e.title }))],
    key: `${o.key}`, exam: o.exam || false, fallback: o.fallback, expectedSec: o.expectedSec,
  });
  if (o.pde ?? lines.pde) p.pde = o.pde ?? lines.pde;
  return p;
}

// The exam multiple choice of module F: several right options (« plusieurs »).
// right: [html], wrongs: [{html, rule?}]; count options in all (4 or 5).
export function mcqMulti(o, rng) {
  const options = [];
  for (const h of o.right) if (!options.some((x) => x.html === h)) options.push({ html: h, correct: true });
  for (const w of o.wrongs) {
    if (options.length >= (o.count || 5)) break;
    if (!w || options.some((x) => x.html === w.html)) continue;
    options.push({ html: w.html, correct: false, rule: w.rule ?? null });
  }
  const it = mcq({ ...o, options, multi: true, prompt: t('{prompt} <i>(plusieurs réponses possibles)</i>', { prompt: o.prompt }) }, rng);
  it.baits = [...new Set(options.map((x) => x.rule).filter(Boolean))];
  return it;
}

// One right option among four (lessons and problem parts).
export function mcqOne(o, rng) {
  const options = [{ html: o.right, correct: true }];
  for (const w of o.wrongs) {
    if (options.length >= 4) break;
    if (!w || options.some((x) => x.html === w.html)) continue;
    options.push({ html: w.html, correct: false, rule: w.rule ?? null });
  }
  const it = mcq({ ...o, options }, rng);
  it.baits = [...new Set(options.map((x) => x.rule).filter(Boolean))];
  return it;
}

// Item constructors of modules G7 (unit combi) and P (unit proba), step U7.
//
// statItem(o): a lines item made of parts, one named value per part (x̄,
//   s², Pr(M | +), t_obs…), each judged by `prob` (exact) or `stat`
//   (approximate) with errors carried forward (js/judges/statjudge.js).
//   o = {skill, level, prompt, key, parts, hints: H(…), subgoals, exam?,
//        interpret?: {prompt, options: [{html, correct, rule?}]},
//        simulate?: spec (js/engine/simulate.js), keys?, fallback?, baits?}
//   part = {label, name?, kind: 'prob' | 'stat', expect, decimals?, symbols?,
//           accept?, traps?: {trapId: [values]}, sig?, sigAlt?, ciRule?,
//           digits?, digitsFrom?, vars?, domain?, upToConstant?, ref?,
//           html? (heading of a later part), start? (line 0, default the label),
//           notes?: [html], decisions?: [decision lines, with levels?],
//           action?: label of the action (menu of level 3), menu?: [options],
//           wrongActions?: [{label, rule?, why}],
//           lines: [{math, note, subgoal, blank?: [texts], blank2?, from?}]}
//   Levels: 1–2 guided (blanks), 3 « choose the action » (the parts'
//   actions), 4 free with three hints, 5 alone.
// coefItem(o): one part, the exam variant `coef` (a short answer).
// openItem(o, points): the exam variant `open` (a problem; the
//   interpretation becomes a multiple-choice part).
// choice(o, rng): a multiple choice with four distinct options (mcqD).
// tf(o): a true/false item; numCounter(…): a counter-example made of numbers.
// Number texts: num(x, d) for the screen (0,977), val(x) for the judges.

import { partsItem, mcqD, H, modeOf, pickW } from './geo-kit.js';
import { tfItem, examTag, answerItem, MT } from './kit.js';
import { problemItem } from './kit-problem.js';
import { mcq } from './kit.js';
import { Q } from '../../math/rational.js';
import { readStat, statML, labelML } from '../../judges/statline.js';

export { H, modeOf, pickW, examTag, mcqD };

export const KEYS = ['calc', 'stat', 'calcfn'];

// ---------- numbers ----------

// A value for the screen: 0,977 ; −1,5 ; 15/28 (a Q is written as a fraction).
export function num(x, d = 4) {
  if (x instanceof Q) return (x.d === 1 ? String(x.n) : `${x.n}/${x.d}`).replace('-', '−');
  const r = Number(Number(x).toFixed(d));
  return String(r).replace('.', ',').replace('-', '−');
}
// A value for the judges (point decimal is read too): '0.977', '15/28'.
export function val(x, d = 10) {
  if (x instanceof Q) return x.d === 1 ? String(x.n) : `${x.n}/${x.d}`;
  return String(Number(Number(x).toFixed(d)));
}
// A decimal for a line of the corrigé, with a comma: 0,977.
export const dec = (x, d = 4) => String(Number(Number(x).toFixed(d))).replace('.', ',');
// A Q as a decimal text if finite (0,35), else as a fraction.
export const qdec = (q) => q.toDecimal() ?? `${q.n}/${q.d}`;
export const qq = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
// MathML of a line in the language of prob and stat (for prompts and notes).
export function SM(text, cfg = {}) {
  try { return statML(cfg, readStat(cfg, text)); } catch { return text; }
}
export const LM = (label) => `<math>${labelML(label)}</math>`;

// ---------- the judge of a part ----------

const CFG_KEYS = ['expect', 'decimals', 'tol', 'symbols', 'accept', 'acceptTol', 'traps', 'sig', 'sigAlt', 'ciRule', 'digits', 'digitsFrom', 'vars', 'domain', 'upToConstant', 'ref', 'labels', 'final'];
export function judgeOf(p) {
  const cfg = { kind: p.kind || 'prob', name: p.name ?? null, label: p.label, rel: p.label ? `${p.label} =` : undefined, start: p.start ?? p.label };
  for (const k of CFG_KEYS) if (p[k] !== undefined) cfg[k] = p[k];
  if (!cfg.rel) delete cfg.rel;
  return cfg;
}

// The menu of level 3 for part k: its action, the others' (not now), and
// the wrong actions it names.
function menuOf(parts, k) {
  const p = parts[k];
  if (p.menu) return p.menu;
  if (!p.action) return null;
  const out = [{ id: `a${k}`, label: p.action, valid: true }];
  parts.forEach((o, i) => {
    if (i === k || !o.action || o.action === p.action) return;
    out.push({ id: `a${i}`, label: o.action, valid: false, why: i < k ? 'C\'est déjà fait.' : 'Pas encore : il faut d\'abord la valeur demandée maintenant.' });
  });
  for (const [j, w] of (p.wrongActions || []).entries()) out.push({ id: `w${j}`, label: w.label, valid: false, why: w.why, rule: w.rule ?? undefined });
  // At most 4 options: the right one, then the wrong actions first.
  const right = out[0];
  const wrong = [...out.filter((x) => x.id.startsWith('w')), ...out.filter((x) => x.id.startsWith('a') && x !== right)];
  return [right, ...wrong.slice(0, 3)];
}

const trapIds = (p) => Object.keys(p.traps || {});

export function statItem(o) {
  const { level } = o;
  const exam = o.exam || false;
  // The values of the earlier parts (their expect), for a part whose expect
  // names them ($xbar) when the student's own value is not there (exam coef).
  const ref = {};
  for (const p of o.parts) if (p.name && typeof p.expect === 'string') ref[p.name] = p.expect;
  o = { ...o, parts: o.parts.map((p) => (Object.keys(ref).length && !p.ref ? { ...p, ref } : p)) };
  const parts = o.parts.map((p, k) => ({
    html: p.html ?? (k > 0 ? `<b>${p.title ?? `${LM(p.label)}`}</b>` : null),
    start: p.start ?? p.label,
    judge: judgeOf(p),
    notes: p.notes,
    decisions: (p.decisions || []).map((d) => ({ kind: 'decision', ...d })),
    menu: menuOf(o.parts, k),
    lines: p.lines,
  }));
  const decisionRules = o.parts.flatMap((p) => (p.decisions || []).flatMap((d) => d.options.map((x) => x.rule))).filter(Boolean);
  const baits = [...new Set([
    ...o.parts.flatMap(trapIds),
    ...decisionRules,
    ...(o.interpret?.options || []).map((x) => x.rule).filter(Boolean),
    ...o.parts.flatMap((p) => (p.wrongActions || []).map((w) => w.rule)).filter(Boolean),
    ...(o.baits || []),
  ])];
  const item = partsItem({
    skill: o.skill, level, prompt: o.prompt, parts, hints: o.hints, subgoals: o.subgoals,
    keys: o.keys || KEYS, key: `${o.skill}:${o.key}`, fallback: o.fallback, exam, noHints: o.noHints, baits,
  });
  item.final = { form: 'any', ...(o.interpret && !exam ? { interpret: o.interpret } : {}) };
  if (o.simulate && !exam) item.simulate = o.simulate;
  if (o.expectedSec) item.expectedSec = o.expectedSec;
  else if (o.interpret) item.expectedSec += 30;
  return item;
}

// The exam variant `coef`: one value to give (judged as the part's last line).
export function coefItem(o) {
  const ref = {};
  for (const p of o.parts || []) if (p.name && typeof p.expect === 'string') ref[p.name] = p.expect;
  const part = o.part ?? o.parts[o.parts.length - 1];
  return statItem({ ...o, level: 4, parts: [{ ...part, ref: part.ref ?? ref }], exam: o.exam || { format: 'coef', points: 1 }, noHints: true, interpret: null, simulate: null });
}

// The exam variant `open`: a problem of `points` points; the lines item
// (all its parts are steps), then the interpretation as a multiple choice.
export function openItem(o, points, rng) {
  const lines = statItem({ ...o, level: 5, exam: o.exam || { format: 'open', points }, noHints: true });
  // The first step is named by the problem's title, else by the first value asked (not by the whole statement).
  const parts = [{ item: lines, points: o.interpret ? points - 1 : points, title: o.title ?? o.parts[0]?.title ?? o.parts[0]?.label }];
  if (o.interpret) {
    const it = mcq({ skill: o.skill, level: 5, prompt: o.interpret.prompt || 'Interpréter : quelle phrase est juste ?', options: o.interpret.options, key: `${o.key}:interpret`, exam: lines.exam }, rng);
    parts.push({ item: it, points: 1, title: 'Interpréter' });
  }
  return problemItem({ skill: o.skill, level: o.level ?? 5, prompt: o.prompt, parts, key: o.key, exam: lines.exam, fallback: o.fallback });
}

// A multiple choice: right (html), wrongs [{html, rule}], fillers [{html}].
// Plain numbers are written alike: decimals when the right option is a
// decimal (rounded to 4 decimals at least if they do not end), fractions
// otherwise (0,25 → 1/4), so that the format never gives the answer away.
const NUM_FRAC = /^\s*([−-]?)(\d+)\/(\d+)\s*$/;
const NUM_DEC = /^\s*([−-]?)(\d+),(\d+)\s*$/;
const NUM_INT = /^\s*[−-]?\d+\s*$/;
function asQ(t) {
  let m = NUM_FRAC.exec(t);
  if (m) return new Q((m[1] ? -1 : 1) * Number(m[2]), Number(m[3]));
  m = NUM_DEC.exec(t);
  if (m && m[3].length <= 9) return new Q((m[1] ? -1 : 1) * Number(m[2] + m[3]), 10 ** m[3].length);
  return null;
}
function sameFormat(o) {
  const right = String(o.right ?? '');
  const all = [right, ...(o.wrongs || []).map((w) => String(w?.html ?? '')), ...(o.fillers || []).map((w) => String(w?.html ?? ''))];
  const kinds = all.map((t) => (NUM_FRAC.test(t) ? 'f' : NUM_DEC.test(t) ? 'd' : NUM_INT.test(t) ? 'i' : 'x'));
  if (!(kinds.includes('f') && kinds.includes('d'))) return o;
  const toDec = NUM_DEC.test(right);
  const rd = toDec ? NUM_DEC.exec(right)[3].length : 0;
  const conv = (t) => {
    const q = asQ(t);
    if (!q) return t;
    if (toDec) {
      if (!NUM_FRAC.test(t)) return t;
      const ex = q.toDecimal();
      if (ex && ex.split(',')[1]?.length <= Math.max(rd, 4) + 2) return ex.replace('-', '−');
      return num(q.valueOf(), Math.max(rd, 4));
    }
    if (!NUM_DEC.test(t)) return t;
    return (q.d === 1 ? String(q.n) : `${q.n}/${q.d}`).replace('-', '−');
  };
  const fix = (w) => (w && w.html !== undefined ? { ...w, html: conv(String(w.html)) } : w);
  return { ...o, right: conv(right), wrongs: (o.wrongs || []).map(fix), fillers: (o.fillers || []).map(fix) };
}

export function choice(o, rng) {
  return mcqD({ ...sameFormat(o), key: `${o.skill}:${o.key}` }, rng);
}

export function tf(o) {
  return tfItem({ level: o.level ?? 4, ...o, key: o.key });
}

// A counter-example made of numbers (js/judges/examples.js, kind refute):
// vars [{v, label, dom = 'R'}], pred (a relation that the statement says
// always holds), hyp? (what the numbers must satisfy), answer {v: text}.
export function numCounter({ vars, pred, hyp, answer }) {
  return {
    kind: 'refute',
    quants: vars.map((x) => ({ q: '∀', v: x.v, dom: x.dom ?? 'R' })),
    // The statement is « hyp ⇒ pred »: the numbers must make hyp true and pred false.
    pred: hyp ? `(${hyp})⇒(${pred})` : pred, hyp,
    ask: vars.map((x) => ({ v: x.v, label: x.label ?? `${x.v} =`, keys: ['calc'] })),
    answer,
  };
}

// The three hints of a level (none at level 5 or in an exam: the kit's
// linesItem drops them).
export const hints3 = H;

// A short answer typed as a number (the school `answer` item).
export { answerItem };
export { MT };

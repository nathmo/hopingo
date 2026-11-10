// Helpers of module A2, part e (unit `analyse2`, step U6): extrema.
// Exact polynomials in x, y (, z) (to build f from its stationary points and
// write its derivatives), texts of points and systems for the judge
// `system`, items made of parts whose level-3 menus also work on `system`
// lines (each menu carries the key of its line), and the « Vrai / Faux »
// multiple choice.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toReadable } from '../../cas/print.js';
import { readWith, showWith } from '../../judges/index.js';
import { linesItem, mcq, tfItem, examTag, MT } from './kit.js';
import { partsScript, SEG, modeOf, H, E } from './analyse1-e-kit.js';

export { linesItem, mcq, tfItem, examTag, MT, modeOf, H, E, SEG };
export { problemItem, asProblem } from './kit-problem.js';

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const XY = ['x', 'y'];
export const XYZ = ['x', 'y', 'z'];
export const KEYS = ['calcx', 'calcfn', 'a2', 'anal'];

// ---------- polynomials: Map 'i,j(,k)' → Q ----------

const keyOf = (e) => e.join(',');
const expOf = (k) => k.split(',').map(Number);
function clean(m) {
  for (const [k, c] of m) if (c.n === 0) m.delete(k);
  return m;
}
export function poly(terms) {
  const m = new Map();
  for (const [c, e] of terms) {
    const k = keyOf(e);
    m.set(k, (m.get(k) || q(0)).add(q(c)));
  }
  return clean(m);
}
export const pvar = (n, i) => poly([[1, Array.from({ length: n }, (_, j) => (j === i ? 1 : 0))]]);
export const pconst = (n, c) => poly([[c, Array(n).fill(0)]]);
export function padd(a, b) {
  const m = new Map(a);
  for (const [k, c] of b) m.set(k, (m.get(k) || q(0)).add(c));
  return clean(m);
}
export const pscale = (a, c) => clean(new Map([...a].map(([k, x]) => [k, x.mul(q(c))])));
export const psub = (a, b) => padd(a, pscale(b, -1));
export function pmul(a, b) {
  const m = new Map();
  for (const [ka, ca] of a) {
    for (const [kb, cb] of b) {
      const e = expOf(ka).map((x, i) => x + expOf(kb)[i]);
      const k = keyOf(e);
      m.set(k, (m.get(k) || q(0)).add(ca.mul(cb)));
    }
  }
  return clean(m);
}
export function ppow(a, k) {
  const n = expOf([...a.keys()][0] || '0,0').length;
  let out = pconst(n, 1);
  for (let i = 0; i < k; i++) out = pmul(out, a);
  return out;
}
// ∂/∂(variable i).
export function pd(a, i) {
  const m = new Map();
  for (const [k, c] of a) {
    const e = expOf(k);
    if (!e[i]) continue;
    const f = e.map((x, j) => (j === i ? x - 1 : x));
    m.set(keyOf(f), c.mul(e[i]));
  }
  return clean(m);
}
// Value at a point of Q.
export function pat(a, pt) {
  let s = q(0);
  for (const [k, c] of a) s = s.add(expOf(k).reduce((p, x, i) => p.mul(q(pt[i]).pow(x)), c));
  return s;
}
// Variable i replaced by the polynomial b.
export function psubst(a, i, b) {
  const n = expOf([...a.keys()][0] || '0,0').length;
  let out = new Map();
  for (const [k, c] of a) {
    const e = expOf(k);
    const rest = poly([[c, e.map((x, j) => (j === i ? 0 : x))]]);
    out = padd(out, pmul(rest, e[i] ? ppow(b, e[i]) : pconst(n, 1)));
  }
  return out;
}
export const pdeg = (a, i) => Math.max(0, ...[...a.keys()].map((k) => expOf(k)[i]));
export const pzero = (a) => a.size === 0;

const qt = (x) => String(q(x));
// A coefficient before letters: '', '-', '3', '(3/2)', '-(3/2)'.
function coefT(c, first) {
  const abs = c.n < 0 ? c.neg() : c;
  const sign = c.n < 0 ? '-' : first ? '' : '+';
  const body = abs.eq(1) ? '' : abs.d === 1 ? qt(abs) : `(${qt(abs)})`;
  return sign + body;
}
const monoT = (e, vars) => e.map((x, i) => (x === 0 ? '' : x === 1 ? vars[i] : `${vars[i]}^${x}`)).join('');
// Text for the CAS, by decreasing degree: x^3+3xy^2-15x-12y.
export function ptxt(a, vars = XYZ) {
  const ks = [...a.keys()].sort((u, v) => {
    const eu = expOf(u);
    const ev = expOf(v);
    const du = eu.reduce((s, x) => s + x, 0);
    const dv = ev.reduce((s, x) => s + x, 0);
    if (du !== dv) return dv - du;
    for (let i = 0; i < eu.length; i++) if (eu[i] !== ev[i]) return ev[i] - eu[i];
    return 0;
  });
  if (!ks.length) return '0';
  return ks.map((k, idx) => {
    const c = a.get(k);
    const e = expOf(k);
    const m = monoT(e, vars);
    if (!m) return `${c.n < 0 ? '-' : idx ? '+' : ''}${qt(c.n < 0 ? c.neg() : c)}`;
    return coefT(c, idx === 0) + m;
  }).join('');
}

// ---------- numbers and points ----------

export const N = (x) => qt(x);
// A factor in a product: 3, (−2), (1/2).
export const fac = (x) => (q(x).n >= 0 && q(x).d === 1 ? qt(x) : `(${qt(x)})`);
// √x of a rational as text ('2', '√2', '3√2/2', '-√6'); sign: ±1.
export function rootT(x, sign = 1) {
  const r = q(x);
  let m = r.n * r.d;
  let out = 1;
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; out *= f; }
  const c = new Q(out, r.d);
  const s = sign < 0 ? '-' : '';
  if (m === 1) return sign < 0 ? qt(c.neg()) : qt(c);
  const top = c.n === 1 ? `√${m}` : `${c.n}√${m}`;
  return s + (c.d === 1 ? top : `${top}/${c.d}`);
}
// The text of a coordinate, read: −√2 for « -√2 ».
export const rd = (t) => String(t).replace(/-/g, '−');
// A line of the judge `system` as plain text (decision prompts): x² + y² = 5 ; xy = 2.
export const sysR = (t) => rd(String(t).replace(/\^2/g, '²').replace(/\^3/g, '³').replace(/\^4/g, '⁴').replace(/([^ ])([+=])/g, '$1 $2').replace(/([+=])([^ ])/g, '$1 $2').replace(/([\wλ)²³⁴])-/g, '$1 - '));
export const ptT = (p) => `(${p.map(String).join(' ; ')})`;
export const ptR = (p) => rd(ptT(p));
export const listT = (pts) => pts.map(ptT).join(', ');
// A text of the CAS, readable (x², −, ·).
export const RD = (t, vars = XYZ) => toReadable(parse(t, { vars }));
// Value of a CAS text (no letters).
export const numOf = (t) => {
  const s = String(t);
  return Number.isFinite(Number(s)) ? Number(s) : null;
};

// Each variable replaced by a number: 36×2^2-36×(-1)^2 (texts of the CAS).
export function substT(text, env, vars = XYZ) {
  let out = '';
  let lastVal = false;
  for (const c of String(text)) {
    if (vars.includes(c) && env[c] !== undefined) {
      const v = String(env[c]);
      if (out && /[\d)A-Za-zλ√]/.test(out[out.length - 1])) out += '×';
      out += /^\d+$/.test(v) ? v : `(${v})`;
      lastVal = true;
    } else {
      // A letter, a bracket or a number right after a value: x y → 2×3.
      if (lastVal && /[A-Za-zλ(√\d]/.test(c)) out += '×';
      out += c;
      lastVal = false;
    }
  }
  return out;
}

// ---------- the judge `system` ----------

export const sysCfg = (vars, solutions, extra = {}) => ({ kind: 'system', vars, solutions: solutions.map((s) => s.map(String)), ...extra });
export const SML = (cfg, text) => showWith(cfg, readWith(cfg, text));

// ---------- items made of parts ----------

// partsScript (analyse1-e-kit.js) with the keys of the level-3 menus of
// `system` and matrix lines (js/judges/actions.js, ACTIONS.steps).
export function partsOf(parts, level, choices) {
  const out = partsScript(parts, level, choices);
  const fix = (judge) => {
    if (!judge?.menus || !['system', 'mat', 'det'].includes(judge.kind)) return;
    for (const m of judge.menus) {
      const node = readWith(judge, m.at);
      if (node?.t === 'sys' || node?.t === 'mline') m.key = node.text;
    }
  };
  fix(out.judge);
  for (const l of out.script) if (l.kind === 'segment') fix(l.judge);
  return out;
}

// One line of a part: E(math, note, subgoal, act) with blanks at level 1/2.
export { blanked, tpl } from './analyse1-e-kit.js';

// A lines item from parts. o: {skill, level, prompt, parts, choices, hints,
// subgoals, key, exam?, fallback?, keys?, baits?}
export function partsLines(o) {
  const { start, judge, script } = partsOf(o.parts, o.level, o.choices || []);
  return linesItem({
    skill: o.skill, level: o.level, mode: modeOf(o.level), start, judge, script,
    prompt: o.prompt, hints: o.hints, subgoals: o.subgoals, keys: o.keys || KEYS,
    tapActions: o.level === 3 ? 'steps' : null, key: o.key, exam: o.exam || false,
    fallback: !!o.fallback, noHints: o.noHints, baits: o.baits,
  });
}

// « Vrai / Faux » as a two-option multiple choice (a statement whose
// counter-example has no checker), with the exam tag tf.
export function vfMcq(skill, statement, truth, rng, { key, why, ruleIfTrue = null, ruleIfFalse = null, level = 4, exam = true }) {
  return mcq({
    skill, level, prompt: `Vrai ou faux ?<br>« ${statement} »`, keepOrder: true,
    options: [{ html: 'Vrai', correct: truth, rule: truth ? null : ruleIfTrue }, { html: 'Faux', correct: !truth, rule: truth ? ruleIfFalse : null }],
    key: `${skill}:tf:${key}`, solution: [{ html: why, note: '' }], expectedSec: 60, exam: exam ? { format: 'tf', points: 1 } : false,
  }, rng);
}

// Four distinct options, the right one first (alglin-kit.js mcqDistinct).
export function mcq4(o, rng) {
  const options = [{ html: o.right, correct: true }];
  for (const w of [...(o.wrongs || []), ...(o.fillers || [])]) {
    if (options.length >= (o.count || 4)) break;
    if (!w || w.html === undefined || options.some((x) => x.html === w.html)) continue;
    options.push({ html: w.html, correct: false, rule: w.rule ?? null });
  }
  return mcq({ ...o, options }, rng);
}

// A decision line « Nature de … ? ».
export function natureDecision(prompt, right, rules = {}, whys = {}) {
  const NAT = [
    ['min', 'minimum local'], ['max', 'maximum local'], ['saddle', 'point selle'], ['none', 'la hessienne ne permet pas de conclure'],
  ];
  return {
    kind: 'decision', prompt,
    options: NAT.map(([id, label]) => ({
      id, label, valid: id === right,
      ...(id !== right && rules[id] ? { rule: rules[id] } : {}),
      why: whys[id] || 'Relis les signes de det H et de f_xx.',
    })),
  };
}

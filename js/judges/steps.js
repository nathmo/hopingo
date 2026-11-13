// Free steps before the final answer of an `answer` item (spec §17,
// « Étapes libres et saisie 2D »), without the DOM. The student may write
// as many lines as they want before the answer. When the item knows its
// start (`item.start = {math}`, the equation or expression to transform),
// each line is judged against the previous one:
//   eq       an equation in x (parameters allowed): same solution set, on
//            the domain of the start (judge `solset` with onDomain), so
//            x + 12/x = 7 → x² + 12 = 7x is right; « ; » reads « ou »
//   expr     an expression with letters: same value (judge `equiv`)
//   value    a number: same exact value (js/math/judge.js, with diagnosis)
//   system   x and y: every equation of the line holds at the solution
//   formula  a formula solved for a letter (isoler): the line holds when
//            the letter is replaced by the answer, for any other values
// Without a start the lines are « brouillon »: drawn and kept, not checked.
// The final answer is still judged by the item's own checker.

import { JUDGES } from './index.js';
import { t } from '../i18n.js';
import { parse } from '../cas/parse.js';
import { tryParseAlg, evalAt, varsIn, printAlg } from '../math/algebra.js';
import { judgeEquationLine, solutionSet } from '../math/equations.js';
import { judgeLine as judgeValueLine } from '../math/judge.js';
import { tryParse as tryParseNum } from '../math/expr.js';

const close = (a, b) => Math.abs(a - b) <= 1e-7 * Math.max(1, Math.abs(a), Math.abs(b));
// « x = 3 ; x = 4 » is « x = 3 ou x = 4 » in a line of solutions.
const orText = (s) => String(s).replace(/−/g, '-').replace(/\s*;\s*/g, ' ou ');
// Letters of a school text (π is a number).
const lettersOf = (text) => [...new Set((String(text).match(/[a-zA-Z]/g) || []))];

// What the steps of an item are judged with, or null (brouillon).
export function stepSpecOf(item) {
  const start = item.start?.math ?? null;
  if (item.type !== 'answer' || start == null) return null;
  const kind = item.start.kind || ({
    solset: 'eq', paramset: 'eq', eqzero: 'eq', system: 'system', isolate: 'formula', alg: 'expr', surd: 'expr',
  }[item.checker] ?? 'value');
  const spec = { kind, start, item };
  if (kind === 'eq') {
    const v = item.unknown || 'x';
    const params = {};
    for (const [name, lo, hi] of item.params || []) params[name] = `[${Math.ceil(lo)} ; ${Math.floor(hi)}]`;
    // Letters of the start that are not the unknown: parameters in ℝ.
    for (const l of lettersOf(start)) if (l !== v && !(l in params)) params[l] = 'ℝ';
    spec.cfg = { kind: 'solset', v, domain: 'R', onDomain: true, ...(Object.keys(params).length ? { params } : {}) };
  } else if (kind === 'expr') {
    spec.cfg = { kind: 'equiv', vars: lettersOf(start).length ? lettersOf(start) : ['x'] };
  }
  return spec;
}

// The sign written before a line.
export const stepSign = (spec) => (!spec ? '' : spec.kind === 'expr' || spec.kind === 'value' ? '=' : '⇔');

// ---------- naming the mistake of a wrong line (school traps) ----------

// Additive terms of a school node: [{neg, node}].
function terms(n, neg = false, out = []) {
  if (n.t === 'bin' && (n.op === '+' || n.op === '-')) {
    terms(n.l, neg, out);
    terms(n.r, n.op === '-' ? !neg : neg, out);
  } else if (n.t === 'neg') terms(n.e, !neg, out);
  else if (n.t === 'paren' && n.e.t === 'bin' && (n.e.op === '+' || n.e.op === '-')) out.push({ neg, node: n });
  else out.push({ neg, node: n });
  return out;
}
const denOf = (n) => (n.t === 'frac' ? n.d : n.t === 'bin' && n.op === '×' ? denOf(n.r) ?? denOf(n.l) : null);
const sumText = (ts) => ts.map(({ neg, text }, i) => `${neg ? '-' : i ? '+' : ''}${text}`).join('') || '0';

// Two equations in x that are the same up to a constant factor.
function proportional(a, b, names) {
  const da = { t: 'bin', op: '-', l: a.l, r: a.r };
  const db = { t: 'bin', op: '-', l: b.l, r: b.r };
  let ratio = null;
  let seen = 0;
  for (const x of [0.731, 1.618, 2.236, 3.1416, -1.414, 4.477]) {
    const env = Object.fromEntries(names.map((n, j) => [n, x + 0.37 * j]));
    let p; let q;
    try { p = evalAt(da, env); q = evalAt(db, env); } catch { return false; }
    if (!Number.isFinite(p) || !Number.isFinite(q)) continue;
    if (Math.abs(q) < 1e-12) { if (Math.abs(p) > 1e-9) return false; continue; }
    const r = p / q;
    if (ratio == null) ratio = r;
    else if (!close(r, ratio)) return false;
    seen += 1;
  }
  return seen >= 3 && ratio != null && Math.abs(ratio) > 1e-12;
}

// Clearing denominators and forgetting one term: x + 12/x = 7 → x² + 12 = 7.
// → the rule id, or null.
export function multOneTerm(prevText, lineText) {
  const prev = tryParseAlg(prevText);
  const line = tryParseAlg(lineText);
  if (!prev || !line || prev.t !== 'eq' || line.t !== 'eq') return null;
  const sides = [terms(prev.l), terms(prev.r)];
  const dens = [];
  for (const t of [...sides[0], ...sides[1]]) {
    const d = denOf(t.node);
    if (d && varsIn(d).size && !dens.some((x) => printAlg(x) === printAlg(d))) dens.push(d);
  }
  if (!dens.length) return null;
  const m = dens.map((d) => `(${printAlg(d)})`).join('×');
  const names = [...new Set([...varsIn(prev), ...varsIn(line)])];
  const all = sides.flat();
  for (let k = 0; k < all.length; k++) {
    let i = 0;
    const side = (ts) => sumText(ts.map((t) => ({ neg: t.neg, text: i++ === k ? `(${printAlg(t.node)})` : `(${printAlg(t.node)})×${m}` })));
    const cand = tryParseAlg(`${side(sides[0])}=${side(sides[1])}`);
    if (cand && proportional(cand, line, names)) return 'eq_mult_one_term';
  }
  return null;
}

// Values of a line of solutions « x = 3 ; x = −3 » (school parser).
function lineValues(text, x) {
  const out = [];
  for (const part of String(text).replace(/−/g, '-').split(/;|\sou\s/)) {
    const n = tryParseAlg(part.trim());
    if (!n || n.t !== 'eq') return null;
    let s;
    try { s = solutionSet(n, x); } catch { return null; }
    if (s.kind !== 'set') return null;
    out.push(...s.values.map((v) => (typeof v === 'number' ? v : v.n / v.d)));
  }
  return out;
}

function nameEqMistake(spec, prev, input) {
  const { item } = spec;
  const x = spec.cfg.v;
  // The classic wrong moves on a linear equation (Kieran).
  if (!spec.cfg.params) {
    try {
      const r = judgeEquationLine(prev, input, { x, original: spec.start });
      if (r.kind === 'wrong' && r.rule) return r.rule;
    } catch { /* not a school equation */ }
  }
  const r = multOneTerm(prev, input);
  if (r) return r;
  // A wrong set of solutions that the item knows (forbidden value kept…).
  const vals = lineValues(input, x);
  if (vals?.length) for (const t of item.setTraps || []) if (t.values.length && t.values.every((w) => vals.some((v) => close(v, w)))) return t.rule;
  return null;
}

function nameExprMistake(spec, input) {
  const node = tryParseAlg(input);
  if (!node) return null;
  for (const t of spec.item.algTraps || []) {
    const trap = tryParseAlg(t.expr);
    if (!trap) continue;
    const names = [...new Set([...varsIn(node), ...varsIn(trap)])];
    let same = true;
    let seen = 0;
    for (const x of [0.731, 1.618, 2.236, 3.1416]) {
      const env = Object.fromEntries(names.map((n, j) => [n, x + 0.41 * j]));
      let p; let q;
      try { p = evalAt(node, env); q = evalAt(trap, env); } catch { same = false; break; }
      if (!Number.isFinite(p) || !Number.isFinite(q)) continue;
      seen += 1;
      if (!close(p, q)) { same = false; break; }
    }
    if (same && seen) return t.rule;
  }
  return null;
}

// ---------- judging one step ----------

// A line of a 2×2 system: each equation holds at the solution.
function judgeSystem(spec, prev, input) {
  const parts = String(input).replace(/−/g, '-').split(/;|\set\s/).map((p) => p.trim()).filter(Boolean);
  const nodes = parts.map((p) => tryParseAlg(p));
  if (!nodes.length || nodes.some((n) => !n)) return { kind: 'parse', message: t('Je n\'arrive pas à lire cette ligne.') };
  if (nodes.some((n) => n.t !== 'eq')) return { kind: 'parse', message: t('Écris des équations, avec « = » ; sépare-les par « ; ».') };
  if (String(input).replace(/\s/g, '') === String(prev).replace(/\s/g, '')) return { kind: 'same', message: t('C\'est la même ligne : fais une transformation.') };
  const [X, Y] = spec.item.pair;
  const holds = (n, env) => { try { return close(evalAt(n.l, env), evalAt(n.r, env)); } catch { return false; } };
  const bad = nodes.find((n) => !holds(n, { x: X, y: Y }));
  if (bad) {
    const swapped = nodes.every((n) => holds(n, { x: Y, y: X })) && X !== Y;
    return { kind: 'wrong', rule: swapped ? 'graph_xy_swap' : null, message: t('La solution du système ne vérifie plus {eq} : cette ligne n\'est pas une conséquence des équations.', { eq: printAlg(bad).replace(/-/g, '−') }) };
  }
  return { kind: 'ok' };
}

// A formula rewritten (isoler) : the line holds when the letter is replaced
// by the answer, for random positive values of the other letters.
function judgeFormula(spec, prev, input) {
  const v = spec.item.variable;
  const node = tryParseAlg(input);
  if (!node) return { kind: 'parse', message: t('Je n\'arrive pas à lire cette ligne.') };
  if (node.t !== 'eq') return { kind: 'parse', message: t('Écris une égalité, avec « = ».') };
  if (String(input).replace(/\s/g, '') === String(prev).replace(/\s/g, '')) return { kind: 'same', message: t('C\'est la même ligne : fais une transformation.') };
  if (!varsIn(node).has(v)) return { kind: 'parse', message: t('Garde la lettre {v} dans ta ligne.', { v }) };
  const holdsWith = (expr) => {
    const target = tryParseAlg(expr);
    if (!target) return false;
    const names = [...new Set([...varsIn(node), ...varsIn(target)])].filter((n) => n !== v);
    let seen = 0;
    for (let i = 0; i < 4; i++) {
      const env = Object.fromEntries(names.map((n, j) => [n, 1.3 + ((i * 7 + j * 3) % 11) * 0.73]));
      let val;
      try { val = evalAt(target, env); } catch { return false; }
      if (!Number.isFinite(val)) continue;
      env[v] = val;
      let a; let b;
      try { a = evalAt(node.l, env); b = evalAt(node.r, env); } catch { return false; }
      if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
      if (!close(a, b)) return false;
      seen += 1;
    }
    return seen > 0;
  };
  if (holdsWith(spec.item.target)) return { kind: 'ok' };
  // The item's own traps, then the quotient upside down (x = 2a/c for c/(2a)).
  const trap = (spec.item.isoTraps || []).find((t) => holdsWith(t.expr))
    || (holdsWith(`1/(${spec.item.target})`) ? { rule: 'iso_flip_quotient' } : null);
  return { kind: 'wrong', rule: trap?.rule ?? null, message: t('Cette égalité n\'est plus vraie avec la bonne valeur de {v} : une opération n\'a pas été faite des deux côtés.', { v }) };
}

// One step. → {kind: ok|wrong|parse|same, rule?, diag?, message?, note?}
export function judgeStep(spec, prev, input) {
  if (!spec) return { kind: 'draft' };
  const text = String(input);
  if (spec.kind === 'system') return judgeSystem(spec, prev, text);
  if (spec.kind === 'formula') return judgeFormula(spec, prev, text);
  if (spec.kind === 'value') {
    const p = tryParseNum(prev);
    if (p) {
      const r = judgeValueLine(p, text, { requireIrreducible: false });
      if (r.kind === 'wrong') return { kind: 'wrong', rule: r.diag?.rules?.[r.diag.rules.length - 1] ?? null, diag: r.diag ?? null, message: t('Cette ligne n\'a plus la même valeur que la précédente.') };
      if (r.kind === 'same') return { kind: 'same', message: t('C\'est la même ligne : fais au moins un calcul.') };
      if (r.kind !== 'parse') return { kind: 'ok' };
    }
    // Roots that are not whole: compared by the symbolic core.
    return judgeStep({ ...spec, kind: 'expr', cfg: { kind: 'equiv', vars: ['x'] } }, prev, input);
  }
  const cfg = spec.cfg;
  const line = spec.kind === 'eq' ? orText(text) : text;
  let prevNode;
  try { prevNode = parse(spec.kind === 'eq' ? orText(prev) : prev, { vars: [cfg.v || cfg.vars?.[0] || 'x', ...Object.keys(cfg.params || {}), ...(cfg.vars || [])] }); } catch { return { kind: 'draft' }; }
  spec.state = spec.state || {};
  if (!spec.state.start) spec.state.start = parse(spec.kind === 'eq' ? orText(spec.start) : spec.start, { vars: [cfg.v || cfg.vars?.[0] || 'x', ...Object.keys(cfg.params || {}), ...(cfg.vars || [])] });
  let v;
  try { v = JUDGES[cfg.kind].judgeLine(cfg, prevNode, line, spec.kind === 'eq' ? spec.state : {}); } catch { return { kind: 'draft' }; }
  if (v.kind === 'stay' || v.kind === 'done') return { kind: 'ok', note: v.note };
  if (v.kind !== 'wrong') return { kind: v.kind, message: v.message, note: v.note };
  const rule = (spec.kind === 'eq' ? nameEqMistake(spec, prev, text) : nameExprMistake(spec, text)) ?? v.rule ?? null;
  // A number without letters (√540 = 6√15): no « en x = … » in the message.
  const message = spec.kind === 'expr' && !lettersOf(spec.start).length ? t('Cette ligne n\'a plus la même valeur que la précédente.') : v.message;
  return { kind: 'wrong', rule, diag: rule === v.rule ? v.diag : null, message };
}

// The steps of one answer: the lines kept so far, judged one by one.
export class StepChain {
  constructor(item) {
    this.item = item;
    this.spec = stepSpecOf(item);
    this.lines = []; // {text, how: 'ok' | 'draft'}
    this.rules = [];
    this.mistakes = 0;
  }

  get checked() { return !!this.spec; }
  get start() { return this.spec?.start ?? null; }
  // The line the next one is compared with.
  get prev() { return this.lines.length ? this.lines[this.lines.length - 1].text : this.start; }

  submit(input) {
    const text = String(input ?? '').trim();
    if (!text) return { kind: 'parse', message: t('Écris d\'abord une ligne.') };
    let v = this.spec ? judgeStep(this.spec, this.prev, text) : { kind: 'draft' };
    // A line the judge cannot read is kept as brouillon only if no start is known.
    if (v.kind === 'draft' && this.spec) v = { kind: 'draft', message: t('Je ne peux pas vérifier cette ligne : elle reste au brouillon.') };
    if (v.kind === 'wrong') {
      this.mistakes += 1;
      if (v.rule) this.rules.push(v.rule);
      return v;
    }
    if (v.kind === 'ok' || v.kind === 'draft') this.lines.push({ text, how: v.kind });
    return v;
  }
}

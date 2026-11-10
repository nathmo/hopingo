// Shared pieces of the A1 integration generators (step U2, part a1d):
// exact values in closed form, coefficients written as text, and the
// assembly of a `lines` item along the scale of §8.3 with the decision
// line of the catalogue's convention 4 (taken and shown at level 1, one of
// 2 at level 2, one of 4 at level 3, left out at levels 4 and 5).

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { walk } from '../../cas/ast.js';
import { blankLine } from '../../judges/lines.js';
import { linesItem, tfItem } from './kit.js';

export const q = (n, d = 1) => new Q(n, d);
export const N = (x) => Q.of(x).toString();
export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const uniq = (opts) => opts.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);
export const KEYS = ['calcx', 'calcfn', 'anal'];

// k·body as text: body, −body, 3body, (1/2)body, −(3/4)body; a × before a
// body that starts with a digit.
export function cm(k, body) {
  const K = Q.of(k);
  if (K.eq(1)) return body;
  if (K.eq(-1)) return `-${body}`;
  const sep = /^[\d.]/.test(body) ? '×' : '';
  if (K.d === 1) return `${K.n}${sep}${body}`;
  return `${K.n < 0 ? '-' : ''}(${Math.abs(K.n)}/${K.d})${sep}${body}`;
}
// Terms joined with + and − (a term may start with −).
export const joinSum = (terms) => terms.filter((t) => t && t !== '0').reduce((s, t) => (s ? (t.startsWith('-') ? `${s}${t}` : `${s}+${t}`) : t), '') || '0';
// x − a as text: x + 3, x − 2, x.
export const lin = (a, v = 'x') => { const A = Q.of(a); return A.n === 0 ? v : A.n < 0 ? `${v}+${N(A.neg())}` : `${v}-${N(A)}`; };
// x + h as text.
export const shift = (h, v = 'x') => lin(Q.of(h).neg(), v);

// ---------- exact values: sums of q·atom ----------

const isqrt = (m) => { const r = Math.round(Math.sqrt(m)); return r * r === m ? r : null; };
// m = s²·m′ with m′ squarefree.
function sqfree(m) {
  let s = 1;
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; s *= f; }
  return { s, m };
}
// q·√m as text (√3, 2√3/3, −√2/2).
export function surdText(c, m) {
  const C = Q.of(c);
  if (m === 1) return N(C);
  const num = Math.abs(C.n) === 1 ? `√${m}` : `${Math.abs(C.n)}√${m}`;
  return `${C.n < 0 ? '-' : ''}${num}${C.d === 1 ? '' : `/${C.d}`}`;
}

export class Val {
  constructor() { this.terms = new Map(); this.lns = new Map(); }
  static of(x) { return new Val().rat(x); }
  put(key, c, f) {
    const C = Q.of(c);
    if (C.n === 0) return this;
    const old = this.terms.get(key);
    const sum = old ? old.c.add(C) : C;
    if (sum.n === 0) this.terms.delete(key); else this.terms.set(key, { c: sum, f });
    return this;
  }
  rat(c) { return this.put('1', c, 1); }
  pi(c, k = 1) { return this.put(k === 1 ? 'π' : `π^${k}`, c, Math.PI ** k); }
  // c·e^k (k an integer or a fraction; e⁰ = 1).
  exp(c, k) {
    const K = Q.of(k);
    if (K.n === 0) return this.rat(c);
    return this.put(K.eq(1) ? 'e' : K.eq(-1) ? 'e^(-1)' : K.d === 1 ? `e^${K.n}` : `e^(${N(K)})`, c, Math.exp(K.valueOf()));
  }
  // c·ln(x), x > 0 rational: kept as c·Σ eₚ·ln p over the primes p.
  ln(c, x) {
    const X = Q.of(x);
    if (X.eq(1) || Q.of(c).n === 0) return this;
    for (const [p, e] of [...primes(X.n), ...primes(X.d).map(([pp, ee]) => [pp, -ee])]) {
      const old = this.lns.get(p);
      const sum = (old ? old.c : q(0)).add(Q.of(c).mul(e));
      if (sum.n === 0) this.lns.delete(p); else this.lns.set(p, { c: sum, x: q(p) });
    }
    return this;
  }
  // c·√x, x ≥ 0 rational: √(n/d) = √(nd)/d.
  sqrt(c, x) {
    const X = Q.of(x);
    if (X.n === 0) return this;
    const { s, m } = sqfree(X.n * X.d);
    const C = Q.of(c).mul(new Q(s, X.d));
    return m === 1 ? this.rat(C) : this.put(`√${m}`, C, Math.sqrt(m));
  }
  // c·arctan(r·√m) (m = 1 or 3): the known values become multiples of π.
  arctan(c, r, m = 1) {
    const R = Q.of(r);
    if (R.n === 0) return this;
    if (R.n < 0) return this.arctan(Q.of(c).neg(), R.neg(), m);
    if (m === 1 && R.eq(1)) return this.pi(Q.of(c).div(4));
    if (m === 3 && R.eq(1)) return this.pi(Q.of(c).div(3));
    if (m === 3 && R.eq(q(1, 3))) return this.pi(Q.of(c).div(6));
    const arg = surdText(R, m);
    return this.put(`arctan(${arg})`, c, Math.atan(R.valueOf() * Math.sqrt(m)));
  }
  arcsin(c, r) {
    const R = Q.of(r);
    if (R.n === 0) return this;
    if (R.n < 0) return this.arcsin(Q.of(c).neg(), R.neg());
    if (R.eq(1)) return this.pi(Q.of(c).div(2));
    if (R.eq(q(1, 2))) return this.pi(Q.of(c).div(6));
    return this.put(`arcsin(${N(R)})`, c, Math.asin(R.valueOf()));
  }
  plus(v, c = 1) {
    const C = Q.of(c);
    for (const [k, t] of v.terms) this.put(k, t.c.mul(C), t.f);
    for (const [, t] of v.lns) this.ln(t.c.mul(C), t.x);
    return this;
  }
  times(c) { return new Val().plus(this, c); }
  get value() {
    let s = 0;
    for (const t of this.terms.values()) s += t.c.valueOf() * t.f;
    for (const t of this.lns.values()) s += t.c.valueOf() * Math.log(t.x.valueOf());
    return s;
  }
  get isZero() { return !this.terms.size && !this.lns.size; }

  // The logarithms: c·ln(x) with one rational x when the coefficients are
  // integer multiples of the smallest one (2ln(3/2), (2/3)ln(16/7)).
  lnTerms() {
    const ls = [...this.lns.values()].sort((a, b) => a.x.n - b.x.n);
    if (!ls.length) return [];
    const c = ls.map((t) => (t.c.n < 0 ? t.c.neg() : t.c)).reduce((m, a) => (a.valueOf() < m.valueOf() ? a : m));
    if (ls.every((t) => t.c.div(c).isInt())) {
      let x = new Q(1);
      for (const t of ls) x = x.mul(t.x.pow(t.c.div(c).n));
      if (x.n < 10000 && x.d < 10000) return [lnTerm(c, x)];
    }
    return ls.map((t) => lnTerm(t.c, t.x));
  }

  text() {
    const atoms = [];
    let rat = null;
    for (const [k, t] of this.terms) {
      if (k === '1') rat = t.c;
      else atoms.push(term(t.c, k));
    }
    atoms.push(...this.lnTerms());
    if (!atoms.length) return rat ? N(rat) : '0';
    if (!rat) return joinSum(atoms);
    const r = N(rat);
    // 6 − 2e, 1 − 2/e: the number first when it is positive and the next
    // term negative.
    return rat.n > 0 && atoms[0].startsWith('-') ? joinSum([r, ...atoms]) : joinSum([...atoms, r]);
  }
}

// The prime factors of n > 0: [[p, e]].
function primes(n) {
  const out = [];
  for (let p = 2; p * p <= n; p++) { let e = 0; while (n % p === 0) { n /= p; e++; } if (e) out.push([p, e]); }
  if (n > 1) out.push([n, 1]);
  return out;
}

// ln(x) with c, written with x > 1 when x = 1/k.
function lnTerm(c, x) {
  if (x.n === 1) return term(c.neg(), `ln(${x.d})`);
  return term(c, `ln(${N(x)})`);
}

// c·atom as text: π/4, 3ln(2)/4, −2e, 2/e, √3/2.
function term(c, atom) {
  const C = Q.of(c);
  const s = C.n < 0 ? '-' : '';
  const n = Math.abs(C.n);
  if (atom === 'e^(-1)') return C.d === 1 ? `${s}${n}/e` : `${s}${n === 1 ? '' : n}e^(-1)/${C.d}`;
  const head = n === 1 ? atom : `${n}${atom}`;
  return `${s}${head}${C.d === 1 ? '' : `/${C.d}`}`;
}

// ---------- lines, blanks, decisions ----------

// A reference line: math, its note, its sub-goal, its action (level 3) and
// the texts left blank at levels 1 and 2.
export const E = (math, note, subgoal, act, b1 = [], b2 = []) => ({ kind: 'eq', math, note, subgoal, act, b1, b2 });

// A line with the sub-expressions written in `texts` left blank.
export function tpl(math, texts, opts = {}) {
  const node = parse(math, opts);
  const holes = [];
  for (const t of texts) {
    // {bound: 'lo' | 'hi'}: a bound of the first integral of the line.
    // {num: text}: the numerator of that fraction (−a/b: a).
    if (typeof t === 'object' && t.num) {
      const want = toText(parse(t.num, opts));
      let found = null;
      walk(node, (n) => { if (!found && n.t !== 'paren' && toText(n) === want) found = n; return !found; });
      let f = found && (found.t === 'neg' ? found.e : found);
      if (f && f.t === 'paren') f = f.e;
      if (f && f.t === 'frac') holes.push(f.n.t === 'paren' ? f.n.e : f.n);
      continue;
    }
    if (typeof t === 'object') {
      let I = null;
      walk(node, (n) => { if (!I && (n.t === 'int' || n.t === 'bracket') && n.lo) I = n; return !I; });
      if (I && !holes.includes(I[t.bound])) holes.push(I[t.bound]);
      continue;
    }
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

// Level 3: one menu per reference line; the action of the line is right.
function stepMenus(start, lines, choices) {
  return lines.map((l, i) => ({
    at: i === 0 ? start : lines[i - 1].math,
    options: choices.map((c) => ({
      id: c.id, label: c.label, valid: c.id === l.act,
      why: c.why || 'Ce n\'est pas l\'étape à faire maintenant.',
      ...(c.rule && c.id !== l.act ? { rule: c.rule } : {}),
    })),
  }));
}

const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
const SEC = { 1: 60, 2: 90, 3: 120, 4: 180, 5: 300 };

// A decision line (§5.3) with some of its options, in a random order. The
// first option of `dec.options` is the one of the reference solution.
function decisionLine(dec, ids, rng) {
  const opts = dec.options.filter((o) => ids.includes(o.id)).map((o, i) => (o.id === dec.options[0].id ? { ...o, ref: true } : o));
  return { kind: 'decision', prompt: dec.prompt, options: rng.shuffle(opts) };
}

// The item. s = {skill, prompt, parts: [{html?, ask?, start, judge, lines,
//   dec?: {prompt, options, l2: [ids], taken}, dec2?: decision for level 2,
//   note?, choices}], hints, subgoals, keys, key, vars, points, baits?,
//   fallback}
// A primitive is a second part: the first part of an item is checked with
// « last line + 1 » refused (tests/uni-check.js), which a primitive F + C
// + 1 is not. So a primitive comes after a short first part judged by
// `equiv` (u′, dx = φ′(t) dt, the decomposition).
// exam: opts.exam (the variant `open`): like level 5, with exam points.
export function intItem(s, level, rng, opts = {}) {
  const exam = opts.exam ? { format: opts.exam, points: s.points || 2 } : false;
  const lv = exam ? 5 : level;
  const vopts = { vars: s.vars || ['x', 't'] };
  const script = [];
  let first = null;
  s.parts.forEach((p, i) => {
    let judge = p.judge;
    const plain = p.lines.map((l) => ({ kind: 'eq', math: l.math, note: l.note, subgoal: l.subgoal, act: l.act }));
    if (lv === 3 && p.choices) judge = { ...judge, menus: stepMenus(p.start, plain, p.choices) };
    if (i === 0) first = judge;
    else script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge });
    if (p.dec) {
      if (lv === 1) script.push({ kind: 'note', html: `Méthode : ${p.dec.taken || p.dec.options[0].label}` });
      else if (lv === 2) script.push(p.dec2 ? decisionLine(p.dec2, p.dec2.options.map((o) => o.id), rng) : decisionLine(p.dec, [p.dec.options[0].id, ...p.dec.l2], rng));
      else if (lv === 3) script.push(decisionLine(p.dec, p.dec.options.map((o) => o.id), rng));
    }
    if (p.note) script.push({ kind: 'note', html: p.note });
    for (const [k, l] of plain.entries()) {
      const holes = lv === 1 ? p.lines[k].b1 : lv === 2 ? p.lines[k].b2 : [];
      script.push(holes?.length ? { ...l, ...tpl(l.math, holes, vopts) } : l);
    }
  });
  const it = linesItem({
    skill: s.skill, level: exam ? 4 : level, prompt: s.prompt,
    start: s.parts[0].start, judge: first, mode: modeOf(lv), script,
    declares: { vars: vopts.vars },
    hints: s.hints, noHints: lv >= 5 || !!exam,
    subgoals: s.subgoals, keys: s.keys || KEYS, tapActions: lv === 3 ? 'steps' : null,
    expectedSec: exam ? 300 * Math.max(1, (s.points || 2) / 2) : SEC[lv] + (s.parts.length - 1) * 60,
    key: `${s.skill}:${s.key}`, exam, fallback: !!s.fallback,
  });
  // Antiderivative items also bait the forgotten constant (the judge
  // answers `stay`), and the items may add traps they offer elsewhere.
  const extra = [...(s.baits || []), ...(s.parts.some((p) => p.judge.kind === 'antideriv') ? ['a1_int_no_constant'] : [])];
  it.baits = [...new Set([...it.baits, ...extra])];
  return it;
}

// The true/false exam variant from a bank [{s, truth, counter?, rule?, why}].
export function examTf(bank, skill, rng) {
  const b = rng.pick(bank);
  return tfItem({
    skill, level: 4, statement: b.s, truth: b.truth, counter: b.counter || null, ruleIfTrue: b.truth ? null : b.rule || null,
    key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 }, expectedSec: 60,
  });
}

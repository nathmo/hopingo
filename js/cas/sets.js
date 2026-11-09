// Sets of real numbers (spec §4.3, step U1): the solution set of a
// condition (relations, chains, ∧ ∨ ¬ ⇒, ∈) or the value of a set
// expression (intervals, finite sets, ℝ ℕ ℤ ∅, ∪ ∩ ∖, set-builder
// notation), as a union of disjoint intervals.
//
//   solutionSet(node, {v, domain, sets}) → RSet
//   setEqual(a, b) → boolean        setWitness(a, b) → {x, inA, inB} | null
//   setToNode(S) → node in final form (union of intervals, finite set, ∅)
//   finalForm(node, cfg) → true | false | message
//
// RSet = {parts: [{lo, hi, loC, hiC}]}: bounds are {x, q?, node?}, x a
// number (±Infinity at the ends), q its exact value when known, node its
// exact writing (√2…). A point a is [a ; a]. The parts are sorted, disjoint
// and never touch.
//
// domain: 'R' (default), 'N' or 'Z' (integers, within [−60 ; 60]: answers
// are finite sets there), or a node/text of a set of ℝ (the cases of §16.2).
// sets: {A: node, …} the named sets of the item.
// Boundaries are found exactly for rational functions (rational roots, then
// the quadratic formula), and otherwise numerically (sign changes on a fine
// grid, bisection, then a snap to fractions with small denominators).

import { Q } from '../math/rational.js';
import { parse } from './parse.js';
import { mapNode, stripParen, lit, neg, add, sub, mul, sqrt, num, contains } from './ast.js';
import { exactValue, toRatFun } from './normal.js';
import { evalFloat } from './numeric.js';
import { qCoeffs, rationalRoots, discriminant } from './polyx.js';

const TOL = 1e-9;
const RANGE = 60; // integers of ℕ, ℤ considered
const SCAN = 120; // numeric scan of [−SCAN ; SCAN]
const near = (a, b) => a === b || (Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= TOL * (1 + Math.abs(a) + Math.abs(b)));

const INF = { x: Infinity };
const NINF = { x: -Infinity };
export const EMPTY = { parts: [] };
export const REALS = { parts: [{ lo: NINF, hi: INF, loC: false, hiC: false }] };

const bq = (q) => ({ x: q.n / q.d, q });

// ---------- operations on RSets ----------

const lt = (a, b) => a < b && !near(a, b);
const cmpX = (a, b) => (near(a, b) ? 0 : a < b ? -1 : 1);

function normalize(parts) {
  const ps = parts.filter((p) => lt(p.lo.x, p.hi.x) || (near(p.lo.x, p.hi.x) && p.loC && p.hiC && Number.isFinite(p.lo.x)))
    .map((p) => ({ ...p, loC: p.loC && Number.isFinite(p.lo.x), hiC: p.hiC && Number.isFinite(p.hi.x) }))
    .sort((a, b) => cmpX(a.lo.x, b.lo.x) || (b.loC - a.loC));
  const out = [];
  for (const p of ps) {
    const last = out[out.length - 1];
    if (last && (lt(p.lo.x, last.hi.x) || (near(p.lo.x, last.hi.x) && (p.loC || last.hiC)))) {
      if (lt(last.hi.x, p.hi.x)) { last.hi = p.hi; last.hiC = p.hiC; } else if (near(p.hi.x, last.hi.x)) last.hiC ||= p.hiC;
      if (near(p.lo.x, last.lo.x)) last.loC ||= p.loC;
    } else out.push({ ...p });
  }
  return { parts: out };
}

export const union = (a, b) => normalize([...a.parts, ...b.parts]);

export function complement(a) {
  const out = [];
  let lo = NINF;
  let loC = false;
  for (const p of a.parts) {
    out.push({ lo, hi: p.lo, loC, hiC: !p.loC });
    lo = p.hi;
    loC = !p.hiC;
  }
  out.push({ lo, hi: INF, loC, hiC: false });
  return normalize(out);
}

export const intersect = (a, b) => complement(union(complement(a), complement(b)));
export const minus = (a, b) => intersect(a, complement(b));

export function contains01(S, x) {
  return S.parts.some((p) => (p.lo.x < x || (near(p.lo.x, x) && p.loC)) && (x < p.hi.x || (near(p.hi.x, x) && p.hiC)) && !(near(p.lo.x, x) && !p.loC) && !(near(p.hi.x, x) && !p.hiC));
}

export function setEqual(a, b) {
  if (a.parts.length !== b.parts.length) return false;
  return a.parts.every((p, i) => {
    const q = b.parts[i];
    return near(p.lo.x, q.lo.x) && near(p.hi.x, q.hi.x) && p.loC === q.loC && p.hiC === q.hiC;
  });
}

// A number in one set and not in the other: bounds, then midpoints.
export function setWitness(a, b) {
  const xs = [];
  for (const S of [a, b]) for (const p of S.parts) { xs.push(p.lo, p.hi); }
  const fin = xs.filter((x) => Number.isFinite(x.x)).sort((u, w) => u.x - w.x);
  const tries = [...fin];
  for (let i = 0; i + 1 < fin.length; i++) tries.push({ x: (fin[i].x + fin[i + 1].x) / 2 });
  if (fin.length) tries.push({ x: fin[0].x - 1 }, { x: fin[fin.length - 1].x + 1 });
  else tries.push({ x: 0 });
  // Prefer whole numbers: they read better in a message.
  const ints = [];
  for (const t of tries) if (Number.isFinite(t.x)) for (const d of [0, -1, 1]) ints.push({ x: Math.round(t.x) + d });
  for (const t of [...ints, ...tries]) {
    const inA = contains01(a, t.x);
    const inB = contains01(b, t.x);
    if (inA !== inB) return { x: t.x, q: t.q, inA, inB };
  }
  return null;
}

export const isFiniteSet = (S) => S.parts.every((p) => near(p.lo.x, p.hi.x));
export const points = (S) => S.parts.map((p) => p.lo);

// ---------- evaluation ----------

const universeOf = (domain) => (domain === 'N' ? { lo: 0, hi: RANGE } : domain === 'Z' ? { lo: -RANGE, hi: RANGE } : null);

function integersIn(lo, hi) {
  const out = [];
  for (let k = lo; k <= hi; k++) out.push({ lo: bq(new Q(k)), hi: bq(new Q(k)), loC: true, hiC: true });
  return { parts: out };
}

// The value of a bound: exact if possible.
function boundOf(node) {
  const n = stripParen(node);
  if (n.t === 'const' && n.name === 'inf') return INF;
  if (n.t === 'neg' && stripParen(n.e).t === 'const' && stripParen(n.e).name === 'inf') return NINF;
  const q = exactValue(n);
  if (q) return bq(q);
  const x = evalFloat(n, {});
  if (!Number.isFinite(x)) throw new SetError('Une borne n\'est pas un nombre.');
  return { x, node: n };
}

export class SetError extends Error {}

const SET_NODES = new Set(['set', 'setop']);
// Does this node denote a set (rather than a condition or a number)?
export function isSetNode(node, cfg = {}) {
  const n = stripParen(node);
  if (SET_NODES.has(n.t)) return true;
  return n.t === 'sym' && !n.sub && !!cfg.sets?.[n.name];
}

function namedSet(name, ctx) {
  if (name === '∅') return EMPTY;
  if (name === 'ℝ' || name === 'ℚ' || name === 'ℂ') return ctx.universe ? integersIn(ctx.universe.lo, ctx.universe.hi) : REALS;
  if (name === 'ℕ') return integersIn(0, RANGE);
  if (name === 'ℤ') return integersIn(-RANGE, RANGE);
  throw new SetError(`Ensemble inconnu : ${name}`);
}

function evalSet(node, ctx) {
  const n = stripParen(node);
  if (n.t === 'sym' && ctx.sets?.[n.name]) return evalSet(ctx.sets[n.name], ctx);
  if (n.t === 'setop') {
    const a = evalSet(n.l, ctx);
    const b = evalSet(n.r, ctx);
    return n.op === '∪' ? union(a, b) : n.op === '∩' ? intersect(a, b) : minus(a, b);
  }
  if (n.t !== 'set') throw new SetError('Ce n\'est pas un ensemble.');
  if (n.kind === 'named') return namedSet(n.name, ctx);
  if (n.kind === 'interval') {
    const S = normalize([{ lo: boundOf(n.lo), hi: boundOf(n.hi), loC: !n.loOpen, hiC: !n.hiOpen }]);
    return ctx.universe ? intersect(S, integersIn(ctx.universe.lo, ctx.universe.hi)) : S;
  }
  if (n.kind === 'finite') return normalize(n.items.map((it) => { const b = boundOf(it); return { lo: b, hi: b, loC: true, hiC: true }; }));
  // builder: {v ∈ S | cond} or {expr | cond}
  const head = stripParen(n.head);
  if (head.t === 'in' && stripParen(head.l).t === 'sym') {
    const v = stripParen(head.l).name;
    const of = evalSet(head.r, ctx);
    const inner = { ...ctx, v, universe: isDiscrete(of) ? null : ctx.universe };
    return intersect(of, solveCond(n.cond, inner, of));
  }
  // Image set: the variable is the one bound by « n ∈ ℕ » in the condition,
  // else the letter of the expression.
  const v = boundVar(n.cond) ?? [...letters(head)][0];
  if (!v) throw new SetError('Je ne trouve pas la variable de l\'ensemble.');
  const base = integersIn(-RANGE, RANGE);
  const E = solveCond(n.cond, { ...ctx, v, universe: { lo: -RANGE, hi: RANGE } }, base);
  if (!isFiniteSet(E)) throw new SetError('Ensemble image trop grand.');
  const items = [];
  for (const b of points(E)) {
    const val = valueAt(head, v, b);
    if (val) items.push({ lo: val, hi: val, loC: true, hiC: true });
  }
  return normalize(items);
}

const isDiscrete = (S) => isFiniteSet(S) && S.parts.length > 0;

function boundVar(cond) {
  let v = null;
  const visit = (n) => {
    n = stripParen(n);
    if (v) return;
    if (n.t === 'in' && stripParen(n.l).t === 'sym') { v = stripParen(n.l).name; return; }
    if (n.t === 'logic') { visit(n.l); visit(n.r); }
  };
  visit(cond);
  return v;
}

function letters(node) {
  const out = new Set();
  mapNode(node, (x) => { if (x.t === 'sym' && !x.sub) out.add(x.name); return x; });
  return out;
}

// The exact (or float) value of node with v = b.
function valueAt(node, v, b) {
  const env = { [v]: b.x };
  if (b.q) {
    const at = mapNode(node, (x) => (x.t === 'sym' && x.name === v && !x.sub ? lit(b.q) : x));
    const q = exactValue(at);
    if (q) return bq(q);
  }
  const x = evalFloat(node, env);
  return Number.isFinite(x) ? { x } : null;
}

// Sign of l − r at b: −1, 0, 1, or NaN where undefined.
function signAt(l, r, v, b) {
  if (b.q) {
    const at = (n) => mapNode(n, (x) => (x.t === 'sym' && x.name === v && !x.sub ? lit(b.q) : x));
    const a = exactValue(at(l));
    const c = exactValue(at(r));
    if (a && c) return a.cmp(c);
  }
  const x = evalFloat(l, { [v]: b.x });
  const y = evalFloat(r, { [v]: b.x });
  if (!Number.isFinite(x) || !Number.isFinite(y)) return NaN;
  if (Math.abs(x - y) <= 1e-9 * (1 + Math.abs(x) + Math.abs(y))) return 0;
  return x < y ? -1 : 1;
}

function relHolds(op, s) {
  if (Number.isNaN(s)) return false;
  switch (op) {
    case '=': return s === 0;
    case '≠': return s !== 0;
    case '<': return s < 0;
    case '≤': return s <= 0;
    case '>': return s > 0;
    case '≥': return s >= 0;
    default: return false;
  }
}

// Is the condition true at b? Undefined parts make it false.
export function holds(node, ctx, b) {
  const n = stripParen(node);
  switch (n.t) {
    case 'rel': {
      if (isSetNode(n.l, ctx) || isSetNode(n.r, ctx)) {
        if (n.op !== '=' && n.op !== '≠') throw new SetError('relation between sets');
        const same = setEqual(evalSet(n.l, ctx), evalSet(n.r, ctx));
        return n.op === '=' ? same : !same;
      }
      return relHolds(n.op, signAt(n.l, n.r, ctx.v, b));
    }
    case 'chain': return n.ops.every((op, i) => relHolds(op, signAt(n.items[i], n.items[i + 1], ctx.v, b)));
    case 'in': {
      const val = valueAt(n.l, ctx.v, b);
      if (!val) return false;
      const inside = contains01(evalSet(n.r, ctx), val.x);
      return n.op === '∈' ? inside : !inside;
    }
    case 'not': return !holds(n.e, ctx, b);
    case 'logic': {
      const a = holds(n.l, ctx, b);
      const c = holds(n.r, ctx, b);
      if (n.op === 'and') return a && c;
      if (n.op === 'or') return a || c;
      if (n.op === 'imp') return !a || c;
      return a === c;
    }
    case 'list': return n.items.every((x) => holds(x, ctx, b));
    default: throw new SetError('Ce n\'est pas une condition.');
  }
}

// ---------- boundaries of a condition ----------

function numericRoots(f, v) {
  const out = [];
  const N = 24000;
  const h = (2 * SCAN) / N;
  const F = (x) => evalFloat(f, { [v]: x });
  let x0 = -SCAN;
  let y0 = F(x0);
  for (let i = 1; i <= N; i++) {
    const x1 = -SCAN + i * h;
    const y1 = F(x1);
    const d0 = Number.isFinite(y0);
    const d1 = Number.isFinite(y1);
    if (d0 && d1 && y1 === 0) out.push(x1);
    else if (d0 && d1 && y0 * y1 < 0) out.push(bisect(F, x0, x1, (y) => y < 0, y0 < 0));
    else if (d0 !== d1) out.push(bisect(F, x0, x1, (y) => Number.isFinite(y), d0));
    x0 = x1;
    y0 = y1;
  }
  return out;
}

function bisect(F, a, b, test, atA) {
  for (let k = 0; k < 80; k++) {
    const m = (a + b) / 2;
    if (test(F(m)) === atA) a = m; else b = m;
  }
  return (a + b) / 2;
}

// A nice exact value near x: a fraction with a small denominator.
function snap(x) {
  for (let d = 1; d <= 12; d++) {
    const n = Math.round(x * d);
    if (Math.abs(n / d - x) < 1e-7) return new Q(n, d);
  }
  return null;
}

// Zeros and poles of f(v), exact when f is rational in v.
function breakpoints(f, v) {
  const out = [];
  try {
    const { rf, opaque, atoms } = toRatFun(f);
    const others = [...atoms.keys()].filter((k) => k !== v);
    if (!opaque && !others.length) {
      for (const p of [rf.n, rf.d]) {
        const cs = qCoeffs(p, v);
        if (!cs || cs.length < 2) continue;
        const { roots, rest } = rationalRoots(cs);
        for (const { q } of roots) out.push(bq(q));
        if (rest.length === 3) {
          const D = discriminant(rest);
          if (D.n >= 0) out.push(...surdRoots(rest, D));
        } else if (rest.length > 3) {
          for (const x of numericRoots(f, v)) out.push(snapped(x));
        }
      }
      return out;
    }
  } catch { /* not rational: numeric */ }
  for (const x of numericRoots(f, v)) out.push(snapped(x));
  // Kinks and edges inside |…| and √: zeros of their arguments.
  mapNode(f, (n) => {
    if ((n.t === 'abs' || n.t === 'sqrt') && contains(n.e, (y) => y.t === 'sym' && y.name === v)) out.push(...breakpoints(n.e, v));
    return n;
  });
  return out;
}

// (−b ± √Δ)/(2a) = A ± B√m, with √Δ simplified: exact node, float value.
function surdRoots([, c1, c2], D) {
  let N = D.n * D.d;
  let k = 1;
  for (let f = 2; f * f <= N; f++) while (N % (f * f) === 0) { N /= f * f; k *= f; }
  const A = c1.neg().div(c2.mul(2));
  const B = new Q(k, D.d).div(c2.mul(2));
  const Bp = B.n < 0 ? B.neg() : B;
  const root = N === 1 ? null : sqrt(num(N));
  return [-1, 1].map((s) => {
    const surd = root ? (Bp.eq(1) ? root : mul(lit(Bp), root)) : lit(Bp);
    const node = A.n === 0 ? (s < 0 ? neg(surd) : surd) : s < 0 ? sub(lit(A), surd) : add(lit(A), surd);
    return { x: A.n / A.d + s * (Bp.n / Bp.d) * Math.sqrt(N), node };
  });
}

function snapped(x) {
  const q = snap(x);
  return q ? bq(q) : { x };
}

function condBreakpoints(node, ctx) {
  const n = stripParen(node);
  const out = [];
  switch (n.t) {
    case 'rel': out.push(...breakpoints(sub(n.l, n.r), ctx.v)); break;
    case 'chain': for (let i = 0; i + 1 < n.items.length; i++) out.push(...breakpoints(sub(n.items[i], n.items[i + 1]), ctx.v)); break;
    case 'in': {
      const S = evalSet(n.r, ctx);
      for (const p of S.parts) out.push(p.lo, p.hi);
      if (!(stripParen(n.l).t === 'sym')) out.push(...breakpoints(n.l, ctx.v));
      break;
    }
    case 'not': out.push(...condBreakpoints(n.e, ctx)); break;
    case 'logic': out.push(...condBreakpoints(n.l, ctx), ...condBreakpoints(n.r, ctx)); break;
    case 'list': for (const x of n.items) out.push(...condBreakpoints(x, ctx)); break;
    default: break;
  }
  return out.filter((b) => Number.isFinite(b.x));
}

// The solution set of a condition, within `within` (an RSet) if given.
function solveCond(node, ctx, within = null) {
  if (ctx.universe || (within && isFiniteSet(within))) {
    const base = within ?? integersIn(ctx.universe.lo, ctx.universe.hi);
    return normalize(points(base).filter((b) => holds(node, ctx, b)).map((b) => ({ lo: b, hi: b, loC: true, hiC: true })));
  }
  const bs = condBreakpoints(node, ctx).sort((a, b) => a.x - b.x);
  const uniq = [];
  for (const b of bs) {
    const last = uniq[uniq.length - 1];
    if (last && near(last.x, b.x)) { if (!last.q && b.q) uniq[uniq.length - 1] = b; } else uniq.push(b);
  }
  const parts = [];
  const gap = (a, c) => {
    const x = a === null ? (c === null ? 0 : c.x - 1) : c === null ? a.x + 1 : (a.x + c.x) / 2;
    const q = snap(x);
    return holds(node, ctx, q ? bq(q) : { x });
  };
  let prev = null;
  for (let i = 0; i <= uniq.length; i++) {
    const c = i < uniq.length ? uniq[i] : null;
    if (gap(prev, c)) parts.push({ lo: prev ?? NINF, hi: c ?? INF, loC: false, hiC: false });
    if (c && holds(node, ctx, c)) parts.push({ lo: c, hi: c, loC: true, hiC: true });
    prev = c;
  }
  const S = normalize(parts);
  return within ? intersect(S, within) : S;
}

// ---------- the entry point ----------

const asNode = (x) => (typeof x === 'string' ? parse(x) : x);

export function makeCtx(cfg = {}) {
  const sets = {};
  for (const [k, t] of Object.entries(cfg.sets || {})) sets[k] = asNode(t);
  const ctx = { v: cfg.v || 'x', sets, universe: universeOf(cfg.domain), isCtx: true };
  if (cfg.domain && !ctx.universe && cfg.domain !== 'R') ctx.within = evalSet(asNode(cfg.domain), { ...ctx });
  return ctx;
}

// What a line says, as a set: a set expression, « A = {…} », « x ∈ … » or
// a condition on v.
export function solutionSet(node, cfg = {}) {
  const ctx = cfg.isCtx ? cfg : makeCtx(cfg);
  let n = stripParen(node);
  if (n.t === 'rel' && n.op === '=' && isSetNode(n.r, ctx)) n = stripParen(n.r); // « A ∖ B = {1 ; 3} »
  if (n.t === 'in' && stripParen(n.l).t === 'sym' && stripParen(n.l).name === ctx.v && isSetNode(n.r, ctx)) n = stripParen(n.r);
  let S = isSetNode(n, ctx) ? evalSet(n, ctx) : solveCond(n, ctx);
  if (ctx.within) S = intersect(S, ctx.within);
  return S;
}

// ---------- final form ----------

function boundNode(b) {
  if (b.x === Infinity) return { t: 'const', name: 'inf' };
  if (b.x === -Infinity) return neg({ t: 'const', name: 'inf' });
  if (b.q) return lit(b.q);
  if (b.node) return b.node;
  return { t: 'float', x: b.x };
}

// The set written in final form: ∅, {a ; b}, ]a ; b] ∪ {c} ∪ …
export function setToNode(S) {
  if (!S.parts.length) return { t: 'set', kind: 'named', name: '∅' };
  const pieces = [];
  let pts = [];
  const flush = () => { if (pts.length) { pieces.push({ t: 'set', kind: 'finite', items: pts }); pts = []; } };
  for (const p of S.parts) {
    if (near(p.lo.x, p.hi.x)) { pts.push(boundNode(p.lo)); continue; }
    flush();
    if (p.lo.x === -Infinity && p.hi.x === Infinity) { pieces.push({ t: 'set', kind: 'named', name: 'ℝ' }); continue; }
    pieces.push({ t: 'set', kind: 'interval', lo: boundNode(p.lo), hi: boundNode(p.hi), loOpen: !p.loC, hiOpen: !p.hiC });
  }
  flush();
  return pieces.reduce((acc, x) => (acc ? { t: 'setop', op: '∪', l: acc, r: x } : x), null);
}

// A number written out: 3, −3, 3/4, √2, (1 + √5)/2, ±∞.
function isNumberWritten(n) {
  n = stripParen(n);
  if (n.t === 'neg') return isNumberWritten(n.e);
  if (n.t === 'const') return true;
  if (n.t === 'num') return true;
  if (contains(n, (x) => x.t === 'sym')) return false;
  return exactValue(n) !== null ? (n.t === 'frac' && stripParen(n.n).t === 'num' && stripParen(n.d).t === 'num') : Number.isFinite(evalFloat(n, {}));
}

function unionParts(n, out = []) {
  n = stripParen(n);
  if (n.t === 'setop' && n.op === '∪') { unionParts(n.l, out); unionParts(n.r, out); } else out.push(n);
  return out;
}

// Is the line a set in final form? true, false (go on), or a message
// (right, but to tidy).
export function finalForm(node, cfg = {}) {
  let n = stripParen(node);
  const v = cfg.v || 'x';
  if (n.t === 'rel' && n.op === '=' && isSetNode(n.r, cfg)) n = stripParen(n.r);
  if (n.t === 'in' && stripParen(n.l).t === 'sym' && stripParen(n.l).name === v) n = stripParen(n.r);
  // v = 3, or v = 1 ∨ v = 2
  const eqs = [];
  const collect = (x) => {
    x = stripParen(x);
    if (x.t === 'logic' && x.op === 'or') return collect(x.l) && collect(x.r);
    if (x.t === 'rel' && x.op === '=' && stripParen(x.l).t === 'sym' && stripParen(x.l).name === v && isNumberWritten(x.r)) { eqs.push(x.r); return true; }
    return false;
  };
  if (collect(n)) return true;
  if (!isSetNode(n, cfg) || (n.t === 'sym')) return false;
  const parts = unionParts(n);
  if (parts.some((p) => p.t !== 'set' || p.kind === 'builder')) return false;
  if (parts.some((p) => p.kind === 'named' && !['∅', 'ℝ'].includes(p.name))) return false;
  if (parts.length > 1 && parts.some((p) => p.kind === 'named')) return 'Simplifie la réunion : ∅ ou ℝ ne s\'écrivent pas avec d\'autres morceaux.';
  for (const p of parts) {
    if (p.kind === 'finite' && !p.items.every(isNumberWritten)) return false;
    if (p.kind === 'interval') {
      if (!isNumberWritten(p.lo) || !isNumberWritten(p.hi)) return false;
      const infClosed = (b, open) => !open && stripParen(b.t === 'neg' ? b.e : b).t === 'const' && stripParen(b.t === 'neg' ? b.e : b).name === 'inf';
      if (infClosed(p.lo, p.loOpen) || infClosed(p.hi, p.hiOpen)) return '∞ n\'est pas un nombre : le crochet est toujours ouvert de son côté, ]−∞ ou +∞[.';
    }
  }
  // Disjoint, sorted, not touching: each piece read alone, in order.
  const ctx = cfg.isCtx ? cfg : makeCtx(cfg);
  const sets = parts.map((p) => evalSet(p, ctx));
  if (sets.some((S, i) => !S.parts.length && parts[i].kind !== 'named')) return 'Un des morceaux est vide : enlève-le.';
  for (let i = 0; i + 1 < sets.length; i++) {
    const a = sets[i];
    const b = sets[i + 1];
    if (!a.parts.length || !b.parts.length) continue;
    if (a.parts[0].lo.x > b.parts[0].lo.x && !isFiniteSet(a) && !isFiniteSet(b)) return 'Range les intervalles dans l\'ordre croissant.';
    const joined = union(a, b);
    if (joined.parts.length < a.parts.length + b.parts.length) return 'Des morceaux se chevauchent ou se touchent : réunis-les en un seul intervalle.';
  }
  if (sets.length > 1) {
    const all = sets.reduce((acc, S) => union(acc, S), EMPTY);
    const count = sets.reduce((s, S) => s + S.parts.length, 0);
    if (all.parts.length < count) return 'Des morceaux se chevauchent ou se touchent : réunis-les en un seul intervalle.';
  }
  return true;
}

export const toSet = (text, cfg) => solutionSet(asNode(text), cfg);

// A set expression's value; and whether a closed condition (numbers and
// named sets only, no variable left) is true.
export const setValue = (node, cfg = {}) => evalSet(asNode(node), cfg.isCtx ? cfg : makeCtx(cfg));
export function closedHolds(node, cfg = {}) {
  const ctx = cfg.isCtx ? cfg : makeCtx({ ...cfg, v: '_' });
  return holds(asNode(node), ctx, { x: 0, q: new Q(0) });
}

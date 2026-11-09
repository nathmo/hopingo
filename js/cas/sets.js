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
import { toText } from './print.js';
import { mapNode, stripParen, lit, neg, add, sub, mul, sqrt, num, contains } from './ast.js';
import { exactValue, toRatFun } from './normal.js';
import { evalFloat, compileFloat } from './numeric.js';
import { diff } from './diff.js';
import { qCoeffs, rationalRoots, discriminant } from './polyx.js';

const TOL = 1e-9;
const RANGE = 60; // integers of ℕ, ℤ considered
const SCAN = 120; // numeric scan of [−SCAN ; SCAN]
const SCAN_STEPS = 24000;
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
  return n.t === 'sym' && !!cfg.sets?.[setName(n)];
}

// The name of a set letter: A, or S_1 for S₁.
export const setName = (n) => (n.sub ? `${n.name}_${n.sub.s ?? n.sub.name ?? ''}` : n.name);

function namedSet(name, ctx) {
  if (name === '∅') return EMPTY;
  if (name === 'ℝ' || name === 'ℚ' || name === 'ℂ') return ctx.universe ? integersIn(ctx.universe.lo, ctx.universe.hi) : REALS;
  if (name === 'ℕ') return integersIn(0, RANGE);
  if (name === 'ℤ') return integersIn(-RANGE, RANGE);
  throw new SetError(`Ensemble inconnu : ${name}`);
}

function evalSet(node, ctx) {
  const n = stripParen(node);
  if (n.t === 'sym' && ctx.sets?.[setName(n)]) return evalSet(ctx.sets[setName(n)], ctx);
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
  const x = evalFloat(l, { [v]: b.x });
  const y = evalFloat(r, { [v]: b.x });
  // Undefined stays undefined, even when an exact factor 0 hides it (0·√(−1)).
  if (Number.isNaN(x) || Number.isNaN(y)) return NaN;
  if (b.q) {
    const at = (n) => mapNode(n, (z) => (z.t === 'sym' && z.name === v && !z.sub ? lit(b.q) : z));
    const a = exactValue(at(l));
    const c = exactValue(at(r));
    if (a && c) return a.cmp(c);
  }
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

// The scanned interval: [−SCAN ; SCAN], or the hull of the domain (plus a
// margin of 1) when the item gives a bounded one (periodic cfgs).
let scanRange = null;

function numericRoots(f, v) {
  const out = [];
  const [lo, hi] = scanRange ?? [-SCAN, SCAN];
  const N = Math.max(400, Math.min(SCAN_STEPS, Math.round((hi - lo) / (scanRange ? 0.02 : 0.04))));
  const h = (hi - lo) / N;
  const G = compileFloat(f);
  const F = (x) => G({ [v]: x });
  let x0 = lo;
  let y0 = F(x0);
  let xm = NaN; // the point before x0, for double roots (tangencies)
  let ym = NaN;
  for (let i = 1; i <= N; i++) {
    const x1 = lo + i * h;
    const y1 = F(x1);
    const d0 = Number.isFinite(y0);
    const d1 = Number.isFinite(y1);
    if (d0 && d1 && y1 === 0) out.push(x1);
    else if (d0 && d1 && y0 * y1 < 0) out.push(bisect(F, x0, x1, (y) => y < 0, y0 < 0));
    else if (d0 !== d1) out.push(bisect(F, x0, x1, (y) => Number.isFinite(y), d0));
    else if (d0 && d1 && Number.isFinite(ym) && y0 !== 0 && Math.abs(y0) < 1e-2 && Math.abs(y0) < Math.abs(ym) && Math.abs(y0) <= Math.abs(y1) && ym * y0 > 0 && y0 * y1 > 0) {
      // |f| has a small local minimum: a root where f touches 0 (sin x = 1).
      const t = touch(F, xm, x1, f, v);
      if (t !== null) out.push(t);
    }
    xm = x0;
    ym = y0;
    x0 = x1;
    y0 = y1;
  }
  return out;
}

// A root of f in ]a ; b[ where f does not change sign: the minimum of |f|
// (golden section), kept if f vanishes there.
function touch(F, a, b, f, v) {
  // First the sign change of f′ (exact to the last digit), else the minimum.
  try {
    const d = diff(f, v);
    const DC = compileFloat(d);
    const D = (x) => DC({ [v]: x });
    const da = D(a);
    const db = D(b);
    if (Number.isFinite(da) && Number.isFinite(db) && da * db < 0) {
      const x = bisect(D, a, b, (y) => y < 0, da < 0);
      if (Math.abs(F(x)) < 1e-11) return x;
    }
  } catch { /* no derivative: golden section */ }
  const g = (Math.sqrt(5) - 1) / 2;
  let c = b - g * (b - a);
  let d = a + g * (b - a);
  for (let k = 0; k < 90; k++) {
    if (Math.abs(F(c)) < Math.abs(F(d))) b = d; else a = c;
    c = b - g * (b - a);
    d = a + g * (b - a);
  }
  const x = (a + b) / 2;
  return Math.abs(F(x)) < 1e-11 ? x : null;
}

function bisect(F, a, b, test, atA) {
  for (let k = 0; k < 80 && b - a > 1e-15 * (1 + Math.abs(a)); k++) {
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
  const fit = lowDegreeRoots(f, v);
  if (fit) return fit.map(snapped);
  for (const x of numericRoots(f, v)) out.push(snapped(x));
  // Kinks and edges inside |…| and √: zeros of their arguments.
  mapNode(f, (n) => {
    if ((n.t === 'abs' || n.t === 'sqrt') && contains(n.e, (y) => y.t === 'sym' && y.name === v)) out.push(...breakpoints(n.e, v));
    return n;
  });
  return out;
}

// f of degree ≤ 2 in v with constant coefficients that are not rational
// (π, √3): read by sampling, its roots solved directly. null otherwise.
function lowDegreeRoots(f, v) {
  const vIn = (e) => contains(e, (y) => y.t === 'sym' && y.name === v && !y.sub);
  const bad = contains(f, (n) => (['fn', 'abs', 'sqrt', 'root'].includes(n.t) && vIn(n)) || (n.t === 'frac' && vIn(n.d)) || (n.t === 'bin' && n.op === '÷' && vIn(n.r)) || (n.t === 'pow' && (vIn(n.e) || (vIn(n.b) && stripParen(n.e).t !== 'num'))));
  if (bad) return null;
  const F = (x) => evalFloat(f, { [v]: x });
  const f0 = F(0);
  const f1 = F(1);
  const fm = F(-1);
  if (![f0, f1, fm].every(Number.isFinite)) return null;
  const a = (f1 + fm) / 2 - f0;
  const b = (f1 - fm) / 2;
  const c = f0;
  const P = (x) => a * x * x + b * x + c;
  for (const x of [2, -3, 0.5, 7.25, -11.5]) {
    const y = F(x);
    if (!Number.isFinite(y) || Math.abs(y - P(x)) > 1e-9 * (1 + Math.abs(y) + Math.abs(a * x * x) + Math.abs(b * x) + Math.abs(c))) return null;
  }
  const scale = Math.abs(a) + Math.abs(b) + Math.abs(c);
  if (Math.abs(a) <= 1e-12 * scale) return Math.abs(b) <= 1e-12 * scale ? [] : [-c / b];
  const D = b * b - 4 * a * c;
  if (D < -1e-12 * b * b) return [];
  if (Math.abs(D) <= 1e-12 * (b * b + Math.abs(4 * a * c))) return [-b / (2 * a)];
  return [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)];
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

// k·π written as in the course: π/2, −3π/4, 2π.
export function piNode(k) {
  const PI = { t: 'const', name: 'pi' };
  const a = Math.abs(k.n);
  const top = a === 1 ? PI : { t: 'bin', op: '×', l: num(a), r: PI, implicit: true };
  const body = k.d === 1 ? top : { t: 'frac', n: top, d: num(k.d) };
  return k.n < 0 ? neg(body) : body;
}

function snapped(x) {
  const q = snap(x);
  if (q) return bq(q);
  // A rational multiple of π (trigonometry): exact writing kept.
  const k = snap(x / Math.PI);
  if (k && k.n !== 0) return { x, node: piNode(k) };
  return { x };
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
  const hull = ctx.within && ctx.within.parts.length ? [ctx.within.parts[0].lo.x, ctx.within.parts[ctx.within.parts.length - 1].hi.x] : null;
  const saved = scanRange;
  if (hull && Number.isFinite(hull[0]) && Number.isFinite(hull[1])) scanRange = [hull[0] - 1, hull[1] + 1];
  let bs;
  try { bs = condBreakpoints(node, ctx).sort((a, b) => a.x - b.x); } finally { scanRange = saved; }
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

// ---------- where an expression is defined ----------

const depends = (n, v) => contains(n, (x) => x.t === 'sym' && x.name === v && !x.sub);
const R = (op, l, r) => ({ t: 'rel', op, l, r });
const ZERO = num(0);
const ONE = num(1);

// The conditions for node to be defined, as relations in v: denominators
// ≠ 0, radicands ≥ 0, logarithms > 0, tan and cot away from their poles,
// arcsin and arccos in [−1 ; 1], real powers of a positive base.
export function domainConds(node, v = 'x') {
  const out = [];
  const visit = (n) => {
    if (!n || typeof n !== 'object') return;
    switch (n.t) {
      case 'frac': if (depends(n.d, v)) out.push(R('≠', n.d, ZERO)); break;
      case 'bin': if (n.op === '÷' && depends(n.r, v)) out.push(R('≠', n.r, ZERO)); break;
      case 'sqrt': if (depends(n.e, v)) out.push(R('≥', n.e, ZERO)); break;
      case 'root': {
        const k = exactValue(n.n);
        if (depends(n.e, v) && (!k || k.n % 2 === 0)) out.push(R('≥', n.e, ZERO));
        break;
      }
      case 'pow': {
        if (!depends(n.b, v)) {
          if (depends(n.e, v)) {
            const b = exactValue(n.b);
            if (b && b.n <= 0) out.push(R('>', n.b, ZERO));
          }
          break;
        }
        const e = exactValue(n.e);
        if (e === null) { out.push(R('>', n.b, ZERO)); break; }
        if (e.d % 2 === 0) out.push(R(e.n < 0 ? '>' : '≥', n.b, ZERO));
        else if (e.n < 0) out.push(R('≠', n.b, ZERO));
        break;
      }
      case 'fn': {
        const name = n.name === 'logb' ? 'logb' : canonFnName(n.name);
        const a = n.name === 'logb' ? n.args[1] : n.args[0];
        if (name === 'logb' && depends(n.args[0], v)) out.push(R('>', n.args[0], ZERO), R('≠', n.args[0], ONE));
        if (!a || !depends(a, v)) break;
        if (name === 'ln' || name === 'logb') out.push(R('>', a, ZERO));
        else if (name === 'tan') out.push(R('≠', { t: 'fn', name: 'cos', args: [a] }, ZERO));
        else if (name === 'cot') out.push(R('≠', { t: 'fn', name: 'sin', args: [a] }, ZERO));
        else if (name === 'arcsin' || name === 'arccos') out.push({ t: 'chain', items: [neg(ONE), a, ONE], ops: ['≤', '≤'] });
        else if (name === 'argch') out.push(R('≥', a, ONE));
        else if (name === 'argth') out.push({ t: 'chain', items: [neg(ONE), a, ONE], ops: ['<', '<'] });
        break;
      }
      default: break;
    }
  };
  mapNode(node, (n) => { visit(n); return n; });
  return out;
}

const FN_CANON = { Log: 'ln', log: 'ln', tg: 'tan', cotan: 'cot', Arctg: 'arctan', arctg: 'arctan', Arctan: 'arctan', Arcsin: 'arcsin', Arccos: 'arccos', sh: 'sinh', ch: 'cosh', th: 'tanh' };
const canonFnName = (name) => FN_CANON[name] ?? name;

// The conjunction of the conditions, or null when node is defined on ℝ.
export function domainNode(node, v = 'x') {
  const cs = domainConds(node, v);
  return cs.length ? cs.reduce((acc, c) => (acc ? { t: 'logic', op: 'and', l: acc, r: c } : c), null) : null;
}

// The set where node (an expression, or each side of a condition) is defined.
export function domainOf(node, cfg = {}) {
  const ctx = cfg.isCtx ? cfg : makeCtx(cfg);
  const cond = domainNode(node, ctx.v);
  const S = cond ? solveCond(cond, ctx) : (ctx.universe ? integersIn(ctx.universe.lo, ctx.universe.hi) : REALS);
  return ctx.within ? intersect(S, ctx.within) : S;
}

// Letters standing for an expression of the variable (t = eˣ): replaced
// before the set is computed. map: {t: node}.
export function substSyms(node, map) {
  if (!map || !Object.keys(map).length) return node;
  return mapNode(node, (n) => (n.t === 'sym' && !n.sub && map[n.name] ? { t: 'paren', e: map[n.name] } : n));
}

// Functions declared by the item (f(x) = √x, g(x) = 1 − x²): each call
// f(a) is replaced by the definition with v replaced by (a). defs: {f: node
// or text}. The expansion keeps the raw writing, so the domain of g(f(x))
// is the domain of 1 − (√x)², not of 1 − x.
export function expandFns(node, defs, v = 'x') {
  if (!defs || !Object.keys(defs).length) return node;
  const D = Object.fromEntries(Object.entries(defs).map(([k, d]) => [k, asNode(d)]));
  return mapNode(node, (n) => {
    if (n.t !== 'fn' || !D[n.name] || n.args.length !== 1) return n;
    const a = n.args[0];
    return { t: 'paren', e: mapNode(D[n.name], (y) => (y.t === 'sym' && y.name === v && !y.sub ? { t: 'paren', e: a } : y)) };
  });
}

// ---------- the entry point ----------

const asNode = (x) => (typeof x === 'string' ? parse(x) : x);

export function makeCtx(cfg = {}) {
  const sets = {};
  for (const [k, t] of Object.entries(cfg.sets || {})) sets[k] = asNode(t);
  const ctx = { v: cfg.v || 'x', sets, universe: universeOf(cfg.domain), isCtx: true };
  if (cfg.domain && !ctx.universe && cfg.domain !== 'R') ctx.within = evalSet(asNode(cfg.domain), { ...ctx });
  // Periodic sets (trigonometry): the letter k is an integer, and sets on ℝ
  // are compared on the window [−W ; W].
  if (cfg.periodic) {
    ctx.k = cfg.kVar || 'k';
    if (!ctx.within && !ctx.universe) ctx.within = { parts: [{ lo: { x: -(cfg.window || WINDOW) }, hi: { x: cfg.window || WINDOW }, loC: true, hiC: true }] };
  }
  return ctx;
}

const WINDOW = 13; // not a nice multiple of π: no family point falls on its ends

// A family (k ∈ ℤ): the union over k of the set with k replaced, for every
// k whose part meets the window. Two empty k in a row end each side.
function familySet(node, ctx) {
  const n = stripParen(node);
  // One family at a time: the parts of « ou », of a union, of a finite set.
  const split = (parts) => parts.reduce((S, p) => union(S, hasK(p, ctx.k) ? familySet(p, ctx) : solutionSetIn(p, { ...ctx, k: null })), EMPTY);
  if (n.t === 'logic' && n.op === 'or') return split([n.l, n.r]);
  if (n.t === 'setop' && n.op === '∪') return split([n.l, n.r]);
  if (n.t === 'set' && n.kind === 'finite' && n.items.length > 1) return split(n.items.map((it) => ({ t: 'set', kind: 'finite', items: [it] })));
  const subK = (k, within) => solutionSetIn(mapNode(n, (x) => (x.t === 'sym' && !x.sub && x.name === ctx.k ? { t: 'paren', e: lit(new Q(k)) } : x)), { ...ctx, k: null, within });
  // A family whose set moves by T when k grows by 1: translate the set of
  // k = 0 (computed on all of ℝ) instead of solving again for each k.
  const S0 = subK(0, null);
  const S1 = subK(1, null);
  const T = S0.parts.length && S1.parts.length ? S1.parts[0].lo.x - S0.parts[0].lo.x : NaN;
  const shift = (S, t) => ({ parts: S.parts.map((p) => ({ ...p, lo: shiftB(p.lo, t), hi: shiftB(p.hi, t) })) });
  const bounded = S0.parts.every((p) => Number.isFinite(p.lo.x) && Number.isFinite(p.hi.x));
  if (Number.isFinite(T) && Math.abs(T) > 1e-9 && bounded && setEqual(shift(S0, T), S1) && setEqual(shift(S0, -T), subK(-1, null)) && ctx.within) {
    const W = ctx.within.parts;
    const lo = W[0].lo.x;
    const hi = W[W.length - 1].hi.x;
    const a = S0.parts[0].lo.x;
    const b = S0.parts[S0.parts.length - 1].hi.x;
    const step = Math.abs(T);
    const j0 = Math.floor((lo - b) / step) - 1;
    const j1 = Math.ceil((hi - a) / step) + 1;
    const parts = [];
    for (let j = j0; j <= j1; j++) parts.push(...shift(S0, j * step).parts);
    return intersect(normalize(parts), ctx.within);
  }
  // Otherwise: k by k, until two k in a row give nothing in the window.
  const at = (k) => subK(k, ctx.within);
  let S = at(0);
  for (const dir of [1, -1]) {
    let empty = 0;
    for (let j = 1; j <= 160 && (empty < 2 || j <= 3); j++) {
      const P = at(dir * j);
      if (P.parts.length) { S = union(S, P); empty = 0; } else empty++;
    }
  }
  return S;
}
const shiftB = (b, t) => (Number.isFinite(b.x) ? { x: b.x + t } : b);

export const hasK = (node, k = 'k') => contains(node, (x) => x.t === 'sym' && !x.sub && x.name === k);

// What a line says, as a set: a set expression, « A = {…} », « x ∈ … » or
// a condition on v.
const CACHE = new Map();
const CACHE_MAX = 600;

export function solutionSet(node, cfg = {}) {
  if (cfg.isCtx) return solutionSetIn(node, cfg);
  let key = null;
  try { key = `${JSON.stringify(cfg)}§${toText(node)}`; } catch { key = null; }
  if (key && CACHE.has(key)) return CACHE.get(key);
  const S = solutionSetIn(node, makeCtx(cfg));
  if (key) {
    if (CACHE.size >= CACHE_MAX) CACHE.delete(CACHE.keys().next().value);
    CACHE.set(key, S);
  }
  return S;
}

function solutionSetIn(node, ctx) {
  let n = stripParen(node);
  if (ctx.k && hasK(n, ctx.k)) return familySet(n, ctx);
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
function isNumberWritten(n, loose = false) {
  n = stripParen(n);
  if (loose && stripParen(n.t === 'neg' ? n.e : n).t === 'const') return true;
  if (loose) return !contains(n, (x) => x.t === 'sym') && (exactValue(n) !== null || Number.isFinite(evalFloat(n, {})));
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
  if (cfg.periodic && hasK(n, cfg.kVar || 'k')) return familyFinal(n, cfg);
  if (n.t === 'rel' && n.op === '=' && isSetNode(n.r, cfg)) n = stripParen(n.r);
  if (n.t === 'in' && stripParen(n.l).t === 'sym' && stripParen(n.l).name === v) n = stripParen(n.r);
  // v = 3, or v = 1 ∨ v = 2
  const eqs = [];
  const collect = (x) => {
    x = stripParen(x);
    if (x.t === 'logic' && x.op === 'or') return collect(x.l) && collect(x.r);
    if (x.t === 'rel' && x.op === '=' && stripParen(x.l).t === 'sym' && stripParen(x.l).name === v && isNumberWritten(x.r, cfg.loose)) { eqs.push(x.r); return true; }
    return false;
  };
  if (collect(n)) return true;
  if (!isSetNode(n, cfg) || (n.t === 'sym')) return false;
  const parts = unionParts(n);
  if (parts.some((p) => p.t !== 'set' || p.kind === 'builder')) return false;
  if (parts.some((p) => p.kind === 'named' && !['∅', 'ℝ'].includes(p.name))) return false;
  if (parts.length > 1 && parts.some((p) => p.kind === 'named')) return 'Simplifie la réunion : ∅ ou ℝ ne s\'écrivent pas avec d\'autres morceaux.';
  for (const p of parts) {
    if (p.kind === 'finite' && !p.items.every((x) => isNumberWritten(x, cfg.loose))) return false;
    if (p.kind === 'interval') {
      if (!isNumberWritten(p.lo, cfg.loose) || !isNumberWritten(p.hi, cfg.loose)) return false;
      const infClosed = (b, open) => !open && stripParen(b.t === 'neg' ? b.e : b).t === 'const' && stripParen(b.t === 'neg' ? b.e : b).name === 'inf';
      if (infClosed(p.lo, p.loOpen) || infClosed(p.hi, p.hiOpen)) return '∞ n\'est pas un nombre : le crochet est toujours ouvert de son côté, ]−∞ ou +∞[.';
    }
  }
  // Disjoint, sorted, not touching: each piece read alone, in order.
  const ctx = cfg.isCtx ? cfg : makeCtx(cfg);
  const sets = parts.map((p) => evalSet(p, ctx));
  // On a given interval (periodic cfgs), nothing written outside it.
  if (cfg.periodic && ctx.within && cfg.domain && cfg.domain !== 'R' && minus(sets.reduce((acc, S) => union(acc, S), EMPTY), ctx.within).parts.length) return "Garde seulement la partie qui est dans l'intervalle.";
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

// Families written out: x = π/6 + 2kπ ou x = 5π/6 + 2kπ ; {π/6 + 2kπ ; …} ;
// ]π/6 + 2kπ ; 5π/6 + 2kπ[ ∪ … ; π/6 + 2kπ < x < 5π/6 + 2kπ ; « k ∈ ℤ »
// may follow. On a bounded domain, the solutions are listed without k.
function familyFinal(node, cfg) {
  const v = cfg.v || 'x';
  const k = cfg.kVar || 'k';
  const bounded = cfg.domain && cfg.domain !== 'R';
  const isKinZ = (x) => { x = stripParen(x); return x.t === 'in' && stripParen(x.l).t === 'sym' && stripParen(x.l).name === k; };
  let n = stripParen(node);
  if (n.t === 'list') { const items = n.items.filter((x) => !isKinZ(x)); if (items.length !== 1) return false; n = stripParen(items[0]); }
  if (n.t === 'logic' && n.op === 'and' && isKinZ(n.r)) n = stripParen(n.l);
  const at0 = (e) => mapNode(e, (x) => (x.t === 'sym' && !x.sub && x.name === k ? num(0) : x));
  const written = (e) => !contains(e, (x) => x.t === 'sym' && !x.sub && x.name === v) && isNumberWritten(at0(e), true);
  const isV = (e) => stripParen(e).t === 'sym' && stripParen(e).name === v && !stripParen(e).sub;
  const piece = (x) => {
    x = stripParen(x);
    if (x.t === 'logic' && x.op === 'or') return piece(x.l) && piece(x.r);
    if (x.t === 'rel' && x.op === '=' && isV(x.l)) return written(x.r);
    if (x.t === 'chain' && x.items.length === 3 && isV(x.items[1])) return written(x.items[0]) && written(x.items[2]);
    return false;
  };
  let ok = piece(n);
  if (!ok) {
    if (n.t === 'rel' && n.op === '=' && isSetNode(n.r, cfg)) n = stripParen(n.r);
    if (n.t === 'in' && isV(n.l)) n = stripParen(n.r);
    const parts = unionParts(n);
    ok = parts.every((p) => p.t === 'set' && ((p.kind === 'finite' && p.items.every(written)) || (p.kind === 'interval' && written(p.lo) && written(p.hi))));
  }
  if (ok && bounded) return false; // on an interval: the solutions are listed without k
  return ok;
}

export const toSet = (text, cfg) => solutionSet(asNode(text), cfg);

// A set expression's value; and whether a closed condition (numbers and
// named sets only, no variable left) is true.
export const setValue = (node, cfg = {}) => evalSet(asNode(node), cfg.isCtx ? cfg : makeCtx(cfg));
export function closedHolds(node, cfg = {}) {
  const ctx = cfg.isCtx ? cfg : makeCtx({ ...cfg, v: '_' });
  return holds(asNode(node), ctx, { x: 0, q: new Q(0) });
}

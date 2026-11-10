// Nodes of the symbolic core (spec §4.1): shapes, smart constructors that
// fold numbers and drop ·1 / +0, structural comparison, walking and mapping.
//
// Shapes used so far (later phases add more, see docs/universite/README.md):
//   {t:'num', v:Q, s}            exact number, s = how it was written ("1,5")
//   {t:'const', name}            'pi' | 'e' | 'i' | 'inf'
//   {t:'sym', name, sub?}        variable; sub is a node (x_k, x_(k+1))
//   {t:'neg', e}  {t:'paren', e}
//   {t:'bin', op:'+'|'-'|'×'|'÷', l, r, implicit?}   implicit: 2x, x(x+1)
//   {t:'frac', n, d}  {t:'pow', b, e}  {t:'sqrt', e}  {t:'root', n, e}
//   {t:'abs', e}  {t:'fn', name, args:[…]}
//   {t:'deriv', e, v, n}         nth derivative of e with respect to v
//   {t:'rel', op, l, r}          = < ≤ > ≥ ≠
//   {t:'blank', id}              a hole in a guided line (display only)
//   {t:'sum', e, k, lo, hi}      Σ_{k=lo}^{hi} e; k (a name) is bound inside e (step U1b)
// Sets and conditions (step U1, js/cas/sets.js):
//   {t:'set', kind:'interval', lo, hi, loOpen, hiOpen}   ]a ; b]
//   {t:'set', kind:'finite', items}                       {1 ; 2 ; 3}
//   {t:'set', kind:'named', name}                         ℝ ℕ ℤ ℚ ℂ ∅
//   {t:'set', kind:'builder', head, cond}                 {n ∈ ℕ | 2n + 1 < 12}, {3n + 1 | n ≤ 3}
//   {t:'setop', op:'∪'|'∩'|'∖', l, r}   {t:'in', op:'∈'|'∉', l, r}
//   {t:'chain', items, ops}      −2 < x ≤ 4 (inequalities in one direction)
//   {t:'not', e}  {t:'logic', op:'and'|'or'|'imp'|'iff', l, r}   ¬ ∧ ∨ ⇒ ⇔
//   {t:'list', items}            a = 2 ; b = 1 (a system, or several answers)
// Calculus (step U2, js/cas/series.js, judges antideriv, definite, limit, series):
//   {t:'int', e, v, lo?, hi?}    ∫ e dv, definite when lo and hi are given; v is
//                                bound in e for a definite integral
//   {t:'bracket', e, v, lo, hi}  [e] from lo to hi = e(hi) − e(lo)
//   {t:'lim', e, v, to}          lim of e when v → to (to may be a side node)
//   {t:'side', e, dir:'+'|'-'}   0⁺, 1⁻: a bound approached from one side
//   {t:'eps', v}                 ε(x), the remainder factor of a DL; o(xⁿ) is xⁿ·ε(x)
// Parsed trees keep `paren` nodes; trees built by the constructors below
// have none, and printers add brackets where precedence needs them.

import { Q } from '../math/rational.js';

const CHILD_KEYS = {
  neg: ['e'], paren: ['e'], bin: ['l', 'r'], frac: ['n', 'd'], pow: ['b', 'e'], sqrt: ['e'],
  root: ['n', 'e'], abs: ['e'], deriv: ['e'], rel: ['l', 'r'], sum: ['e', 'lo', 'hi'],
  not: ['e'], logic: ['l', 'r'], setop: ['l', 'r'], in: ['l', 'r'],
  bracket: ['e', 'lo', 'hi'], lim: ['e', 'to'], side: ['e'],
};
// Nodes whose children are a list: key → field.
const LIST_KEY = { chain: 'items', list: 'items' };

// The children of a node as [key, child] pairs ('args.0' for function arguments).
export function children(node) {
  if (node.t === 'fn') return node.args.map((a, i) => [`args.${i}`, a]);
  if (LIST_KEY[node.t]) return node.items.map((a, i) => [`items.${i}`, a]);
  if (node.t === 'set') {
    if (node.kind === 'interval') return [['lo', node.lo], ['hi', node.hi]];
    if (node.kind === 'finite') return node.items.map((a, i) => [`items.${i}`, a]);
    if (node.kind === 'builder') return [['head', node.head], ['cond', node.cond]];
    return [];
  }
  if (node.t === 'int') return node.lo ? [['e', node.e], ['lo', node.lo], ['hi', node.hi]] : [['e', node.e]];
  const out = [];
  for (const k of CHILD_KEYS[node.t] || []) out.push([k, node[k]]);
  if (node.t === 'sym' && node.sub && typeof node.sub === 'object') out.push(['sub', node.sub]);
  return out;
}

const setChild = (node, key, child) => {
  const dot = key.indexOf('.');
  if (dot > 0) {
    const field = key.slice(0, dot);
    const list = [...node[field]];
    list[Number(key.slice(dot + 1))] = child;
    return { ...node, [field]: list };
  }
  return { ...node, [key]: child };
};

// Depth-first, parents before children. fn(node, path) may return false to
// skip the children.
export function walk(node, fn, path = []) {
  if (fn(node, path) === false) return;
  for (const [k, c] of children(node)) walk(c, fn, [...path, k]);
}

export function getAt(node, path) {
  return path.reduce((n, k) => {
    const dot = k.indexOf('.');
    return dot > 0 ? n[k.slice(0, dot)][Number(k.slice(dot + 1))] : n[k];
  }, node);
}

export function replaceAt(node, path, repl) {
  if (!path.length) return repl;
  const [k, ...rest] = path;
  return setChild(node, k, replaceAt(getAt(node, [k]), rest, repl));
}

// Bottom-up map: children first, then fn(rebuilt node).
export function mapNode(node, fn) {
  let out = node;
  for (const [k, c] of children(node)) {
    const m = mapNode(c, fn);
    if (m !== c) out = setChild(out, k, m);
  }
  return fn(out);
}

// Spellings of the same function (spec §1 and §16.1): Arctg = arctan, Log = ln…
const FN_ALIASES = {
  Log: 'ln', log: 'ln', tg: 'tan', cotan: 'cot', Arctg: 'arctan', arctg: 'arctan', Arctan: 'arctan',
  Arcsin: 'arcsin', Arccos: 'arccos', sh: 'sinh', ch: 'cosh', th: 'tanh',
};
export const canonFn = (name) => FN_ALIASES[name] ?? name;

export const unparen = (n) => mapNode(n, (x) => (x.t === 'paren' ? x.e : x));
export const stripParen = (n) => (n.t === 'paren' ? stripParen(n.e) : n);

export function contains(node, pred) {
  let found = false;
  walk(node, (n) => { if (found) return false; if (pred(n)) { found = true; return false; } return true; });
  return found;
}

// Does the node depend on the variable v?
// A variable bound by a definite integral, a bracket, a limit or a Σ does
// not count; ε(x) depends on x.
export function dependsOn(node, v) {
  let found = false;
  walk(node, (n) => {
    if (found) return false;
    if ((n.t === 'sym' && n.name === v && !n.sub) || (n.t === 'eps' && n.v === v)) { found = true; return false; }
    // ∫ h dv (indefinite) is a function of v, even when h is a number (∫1 dx = x).
    if (n.t === 'int' && !n.lo && n.v === v) { found = true; return false; }
    if ((((n.t === 'int' && n.lo) || n.t === 'bracket' || n.t === 'lim') && n.v === v) || (n.t === 'sum' && n.k === v)) {
      found = ['lo', 'hi', 'to'].some((k) => n[k] && dependsOn(n[k], v));
      return false;
    }
    return true;
  });
  return found;
}

export function symbolsIn(node, out = new Set()) {
  walk(node, (n) => {
    if (n.t === 'sym') out.add(n.sub ? `${n.name}_` : n.name);
    if (n.t === 'sum') {
      // The index of a Σ is bound: it is not a letter of the line.
      symbolsIn(n.lo, out);
      symbolsIn(n.hi, out);
      const inner = symbolsIn(n.e);
      inner.delete(n.k);
      for (const x of inner) out.add(x);
      return false;
    }
    // The variable of a definite integral, of a bracket [F] from a to b and
    // of a limit is bound too (step U2); a primitive ∫ f dx keeps x free.
    if ((n.t === 'int' && n.lo) || n.t === 'bracket' || n.t === 'lim') {
      for (const k of ['lo', 'hi', 'to']) if (n[k]) symbolsIn(n[k], out);
      const inner = symbolsIn(n.e);
      inner.delete(n.v);
      for (const x of inner) out.add(x);
      return false;
    }
    return true;
  });
  return out;
}

// Same tree. opts.parens = false ignores brackets; the `s` of numbers and
// the `implicit` flag never matter.
export function equalsStructural(a, b, { parens = true } = {}) {
  if (!parens) { a = stripParen(a); b = stripParen(b); }
  if (a.t !== b.t) return false;
  switch (a.t) {
    case 'num': return a.v.eq(b.v);
    case 'float': return a.x === b.x;
    case 'const': return a.name === b.name;
    case 'sym':
      if (a.name !== b.name || !!a.sub !== !!b.sub) return false;
      if (!a.sub) return true;
      if (typeof a.sub !== 'object' || typeof b.sub !== 'object') return a.sub === b.sub;
      return equalsStructural(a.sub, b.sub, { parens });
    case 'bin': case 'rel': case 'logic': case 'setop': case 'in': if (a.op !== b.op) return false; break;
    case 'chain': if (a.ops.join() !== b.ops.join()) return false; break;
    case 'set':
      if (a.kind !== b.kind || a.name !== b.name || a.loOpen !== b.loOpen || a.hiOpen !== b.hiOpen) return false;
      break;
    case 'fn': if (a.name !== b.name || a.args.length !== b.args.length) return false; break;
    case 'deriv': if (a.v !== b.v || a.n !== b.n) return false; break;
    case 'sum': if (a.k !== b.k) return false; break;
    case 'blank': return a.id === b.id;
    case 'int': if (a.v !== b.v || !a.lo !== !b.lo) return false; break;
    case 'bracket': case 'lim': if (a.v !== b.v) return false; break;
    case 'side': if (a.dir !== b.dir) return false; break;
    case 'eps': return a.v === b.v;
    default: break;
  }
  const ca = children(a);
  const cb = children(b);
  return ca.length === cb.length && ca.every(([, c], i) => equalsStructural(c, cb[i][1], { parens }));
}

// ---------- constructors ----------

export const num = (k, s) => {
  const v = Q.of(k);
  if (v.n < 0 || v.d !== 1) throw new RangeError('num() takes a whole number ≥ 0; use lit()');
  return { t: 'num', v, s: s ?? String(v.n) };
};
export const sym = (name, sub) => (sub ? { t: 'sym', name, sub } : { t: 'sym', name });
export const cst = (name) => ({ t: 'const', name });
export const fn = (name, ...args) => ({ t: 'fn', name, args });
export const deriv = (e, v = 'x', n = 1) => ({ t: 'deriv', e, v, n });
export const rel = (op, l, r) => ({ t: 'rel', op, l, r });

// A rational value as a node: 3, −3, 3/4, −3/4.
export function lit(q) {
  q = Q.of(q);
  const abs = q.n < 0 ? q.neg() : q;
  const node = abs.d === 1 ? num(abs.n) : { t: 'frac', n: num(abs.n), d: num(abs.d) };
  return q.n < 0 ? { t: 'neg', e: node } : node;
}

// The exact value of a number node (num, frac of nums, negations), or null.
export function numValue(node) {
  switch (node.t) {
    case 'num': return node.v;
    case 'paren': return numValue(node.e);
    case 'neg': { const v = numValue(node.e); return v && v.neg(); }
    case 'frac': {
      const n = numValue(node.n);
      const d = numValue(node.d);
      return n && d && d.n !== 0 ? n.div(d) : null;
    }
    case 'bin': {
      if (node.op !== '×') return null;
      const l = numValue(node.l);
      const r = numValue(node.r);
      return l && r ? l.mul(r) : null;
    }
    default: return null;
  }
}

const isZero = (n) => numValue(n)?.n === 0 && numValue(n) !== null;
const isOne = (n) => { const v = numValue(n); return !!v && v.eq(1); };

export function neg(a) {
  const v = numValue(a);
  if (v) return lit(v.neg());
  if (a.t === 'neg') return a.e;
  return { t: 'neg', e: a };
}

export function add(a, b) {
  const va = numValue(a);
  const vb = numValue(b);
  if (va && vb) return lit(va.add(vb));
  if (va?.n === 0) return b;
  if (vb?.n === 0) return a;
  if (b.t === 'neg') return { t: 'bin', op: '-', l: a, r: b.e };
  return { t: 'bin', op: '+', l: a, r: b };
}

export function sub(a, b) {
  const va = numValue(a);
  const vb = numValue(b);
  if (va && vb) return lit(va.sub(vb));
  if (vb?.n === 0) return a;
  if (va?.n === 0) return neg(b);
  if (b.t === 'neg') return { t: 'bin', op: '+', l: a, r: b.e };
  return { t: 'bin', op: '-', l: a, r: b };
}

// Products keep the number in front: mul(cos(3x), 3) is 3·cos(3x).
export function mul(a, b) {
  const va = numValue(a);
  const vb = numValue(b);
  if (va && vb) return lit(va.mul(vb));
  if (isZero(a) || isZero(b)) return num(0);
  if (isOne(a)) return b;
  if (isOne(b)) return a;
  if (va?.eq(-1)) return neg(b);
  if (vb?.eq(-1)) return neg(a);
  if (a.t === 'neg') return neg(mul(a.e, b));
  if (b.t === 'neg') return neg(mul(a, b.e));
  if (vb) return mul(b, a);
  // A number times a product that starts with a number: fold them.
  if (va && b.t === 'bin' && b.op === '×' && numValue(b.l)) return mul(lit(va.mul(numValue(b.l))), b.r);
  // Move a number out of the right factor: x·(3·cos) = 3·x·cos.
  if (!va && b.t === 'bin' && b.op === '×' && numValue(b.l)) {
    // e^(2x)·2x = 2x·e^(2x): a letter or its power goes first.
    const simple = b.r.t === 'sym' || (b.r.t === 'pow' && b.r.b.t === 'sym');
    return mul(b.l, simple ? mul(b.r, a) : mul(a, b.r));
  }
  if (!va && a.t === 'bin' && a.op === '×' && numValue(a.l)) return mul(a.l, mul(a.r, b));
  return { t: 'bin', op: '×', l: a, r: b };
}

export function div(a, b) {
  const va = numValue(a);
  const vb = numValue(b);
  if (vb && vb.n === 0) throw new RangeError('Division par zéro');
  if (va && vb) return lit(va.div(vb));
  if (isZero(a)) return num(0);
  if (isOne(b)) return a;
  if (a.t === 'neg') return neg(div(a.e, b));
  return { t: 'frac', n: a, d: b };
}

export function pow(b, e) {
  const ve = numValue(e);
  if (ve && ve.n === 0) return num(1);
  if (ve && ve.eq(1)) return b;
  const vb = numValue(b);
  if (vb && ve && ve.isInt() && Math.abs(ve.n) <= 12) {
    try { return lit(vb.pow(ve.n)); } catch { /* too big: keep the power */ }
  }
  return { t: 'pow', b, e };
}

export const sqrt = (e) => ({ t: 'sqrt', e });
export const abs = (e) => ({ t: 'abs', e });

// Sum and product of several nodes.
export const addAll = (xs) => xs.reduce((s, x) => add(s, x), num(0));
export const mulAll = (xs) => xs.reduce((p, x) => mul(p, x), num(1));

// The same tree rebuilt with the constructors above: 1·u → u, 0·u → 0,
// numbers multiplied and put in front. Nodes in `keep` are left as they are.
export function rebuild(node, keep = new Set()) {
  if (keep.has(node)) return node;
  const R = (n) => rebuild(n, keep);
  switch (node.t) {
    case 'paren': { const e = R(node.e); return e.t === 'bin' || e.t === 'neg' ? { t: 'paren', e } : e; }
    case 'neg': return neg(R(node.e));
    case 'bin': {
      const l = R(node.l);
      const r = R(node.r);
      if (node.op === '+') return add(l, r);
      if (node.op === '-') return sub(l, r);
      if (node.op === '×') return mul(l, r);
      return { ...node, l, r };
    }
    case 'frac': return div(R(node.n), R(node.d));
    case 'pow': return pow(R(node.b), R(node.e));
    case 'fn': return { ...node, args: node.args.map(R) };
    case 'sqrt': case 'abs': case 'deriv': return { ...node, e: R(node.e) };
    case 'root': return { ...node, n: R(node.n), e: R(node.e) };
    case 'sum': return { ...node, e: R(node.e), lo: R(node.lo), hi: R(node.hi) };
    case 'int': return node.lo ? { ...node, e: R(node.e), lo: R(node.lo), hi: R(node.hi) } : { ...node, e: R(node.e) };
    case 'bracket': return { ...node, e: R(node.e), lo: R(node.lo), hi: R(node.hi) };
    case 'lim': return { ...node, e: R(node.e), to: R(node.to) };
    case 'side': return { ...node, e: R(node.e) };
    default: return node;
  }
}

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
// Parsed trees keep `paren` nodes; trees built by the constructors below
// have none, and printers add brackets where precedence needs them.

import { Q } from '../math/rational.js';

const CHILD_KEYS = {
  neg: ['e'], paren: ['e'], bin: ['l', 'r'], frac: ['n', 'd'], pow: ['b', 'e'], sqrt: ['e'],
  root: ['n', 'e'], abs: ['e'], deriv: ['e'], rel: ['l', 'r'],
};

// The children of a node as [key, child] pairs ('args.0' for function arguments).
export function children(node) {
  if (node.t === 'fn') return node.args.map((a, i) => [`args.${i}`, a]);
  const out = [];
  for (const k of CHILD_KEYS[node.t] || []) out.push([k, node[k]]);
  if (node.t === 'sym' && node.sub && typeof node.sub === 'object') out.push(['sub', node.sub]);
  return out;
}

const setChild = (node, key, child) => {
  if (key.startsWith('args.')) {
    const args = [...node.args];
    args[Number(key.slice(5))] = child;
    return { ...node, args };
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
  return path.reduce((n, k) => (k.startsWith('args.') ? n.args[Number(k.slice(5))] : n[k]), node);
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
export const dependsOn = (node, v) => contains(node, (n) => n.t === 'sym' && n.name === v && !n.sub);

export function symbolsIn(node, out = new Set()) {
  walk(node, (n) => { if (n.t === 'sym') out.add(n.sub ? `${n.name}_` : n.name); });
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
    case 'bin': case 'rel': if (a.op !== b.op) return false; break;
    case 'fn': if (a.name !== b.name || a.args.length !== b.args.length) return false; break;
    case 'deriv': if (a.v !== b.v || a.n !== b.n) return false; break;
    case 'blank': return a.id === b.id;
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
    default: return node;
  }
}

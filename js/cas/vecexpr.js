// Points and vectors (step U5, modules G4 and G10): the line language of
// the judge `vector` (spec §16.2, « value avec form point | vector »), also
// used by `geom` (parametric lines) and `conic` (points of elements).
//
//   (6 ; 3)   (1 ; -2 ; 3)          a point or a vector (« ; » between the components)
//   2M - A    (A + B)/2   M + t·u    combinations of named points and vectors
//   vec(A,B)  AB                     the vector from A to B (two point names side by side)
//   u·v       u∧v  (u×v)             dot product (a number), cross product (3D)
//   ‖u‖  ‖AB‖²   |k|                 norm, square of a norm, absolute value of a number
//   √5  1/2  π  arccos(1/2)          numbers are js/cas nodes (exact when possible)
//   C = 2M - A = (6 ; 3)             a label, then equal members (each one is checked)
//
// parseVec(text, opts) → ast        opts: {params: ['t', 's'], names: {A: 'point'|'vector'|'scalar'}}
// evalVec(ast, env, opts) → value   {k:'s', n} | {k:'v', items: [n]}; env: {A: value}
// envFrom(symbols, opts) → env      symbols: {A: '(2 ; 1)', k: '3'} (texts)
// sameVal(a, b, opts), isZeroVal, isMultiple(a, b) (b = c·a, c ≠ 0), vText, vML.

import { parse, ParseError } from './parse.js';
import { toMathML } from './mathml.js';
import { toText } from './print.js';
import {
  num, sym, add, sub, mul, div, neg, pow, sqrt as sqrtNode, lit, stripParen, fn,
} from './ast.js';
import { exactValue } from './normal.js';
import { evalFloat } from './numeric.js';
import { simp, sameScalar } from './matexpr.js';
import { Q } from '../math/rational.js';

const fail = (msg, pos = 0) => { throw new ParseError(msg, pos); };

const SUBDIG = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
const FNAMES = ['arccos', 'arcsin', 'arctan', 'Arctg', 'cos', 'sin', 'tan', 'sqrt', 'ln'];
const GREEK_SCALARS = ['λ', 'μ', 'α', 'β', 'θ', 'δ'];

// Normalised text: − → -, subscript digits → _1, ' → ′ kept as ', × kept.
export function normVecText(text) {
  return String(text)
    .replace(/[−–]/g, '-')
    .replace(/[₀-₉]+/g, (m) => `_${[...m].map((c) => SUBDIG[c]).join('')}`)
    .replace(/′/g, "'")
    .replace(/\|\|/g, '‖')
    .replace(/⃗/g, '')
    .replace(/\*/g, '·')
    .trim();
}

// ---------- parsing ----------

class VP {
  constructor(text, opts) { this.s = text; this.i = 0; this.opts = opts; }
  ws() { while (this.i < this.s.length && /\s/.test(this.s[this.i])) this.i++; }
  peek() { this.ws(); return this.s[this.i]; }
  eat(c) { if (this.peek() === c) { this.i++; return true; } return false; }
  rest() { this.ws(); return this.s.slice(this.i); }

  sum() {
    let left;
    if (this.eat('-')) left = { op: 'neg', e: this.prod() };
    else { this.eat('+'); left = this.prod(); }
    for (;;) {
      const c = this.peek();
      if (c === '+' || c === '-') { this.i++; const r = this.prod(); left = { op: c === '+' ? 'add' : 'sub', a: left, b: r }; continue; }
      return left;
    }
  }

  startsAtom() {
    const c = this.peek();
    if (c === undefined) return false;
    return /[0-9(‖|√πA-Za-zΩα-ω□]/.test(c);
  }

  prod() {
    let left = this.power();
    for (;;) {
      const c = this.peek();
      if (c === '·' || c === '×' || c === '∧' || c === '/') {
        this.i++;
        const r = this.power();
        left = c === '/' ? { op: 'div', a: left, b: r } : { op: 'mul', a: left, b: r, how: c };
        continue;
      }
      if (this.startsAtom()) { left = { op: 'mul', a: left, b: this.power(), how: 'implicit' }; continue; }
      return left;
    }
  }

  power() {
    let base = this.atom();
    for (;;) {
      const c = this.peek();
      if (c === '²') { this.i++; base = { op: 'pow', e: base, k: 2 }; continue; }
      if (c === '³') { this.i++; base = { op: 'pow', e: base, k: 3 }; continue; }
      if (c === '^') {
        this.i++;
        if (this.eat('(')) {
          const inner = this.group(')');
          base = { op: 'pow', e: base, kNode: parse(inner) };
        } else {
          const m = /^-?\d+/.exec(this.rest());
          if (!m) fail('Exposant illisible.', this.i);
          this.i += m[0].length;
          base = { op: 'pow', e: base, k: Number(m[0]) };
        }
        continue;
      }
      return base;
    }
  }

  // The text up to the matching closing bracket (the opening one is eaten).
  group(close) {
    const open = close === ')' ? '(' : close === ']' ? '[' : null;
    let depth = 0;
    const start = this.i;
    for (; this.i < this.s.length; this.i++) {
      const c = this.s[this.i];
      if (c === open) depth++;
      else if (c === close) {
        if (depth === 0) { const t = this.s.slice(start, this.i); this.i++; return t; }
        depth--;
      }
    }
    fail(`Il manque « ${close} ».`, start);
    return '';
  }

  atom() {
    const c = this.peek();
    if (c === undefined) fail('La ligne s\'arrête trop tôt.', this.i);
    const start = this.i;
    if (/[0-9]/.test(c)) {
      const m = /^\d+([.,]\d+)?/.exec(this.rest());
      this.i += m[0].length;
      const n = parse(m[0].replace('.', ','));
      // 3/4 written with numbers is one fraction (binds tighter than ·).
      const mm = /^\s*\/\s*(\d+)(?![.,\d])/.exec(this.s.slice(this.i));
      if (mm && !m[1]) {
        this.i += mm[0].length;
        return { op: 'num', n: { t: 'frac', n: num(Number(m[0])), d: num(Number(mm[1])) } };
      }
      return { op: 'num', n };
    }
    if (c === '(') {
      this.i++;
      const inner = this.group(')');
      const parts = splitTop(inner, ';');
      if (parts.length > 1) return { op: 'tuple', items: parts.map((p) => subParse(p, this.opts)) };
      return { op: 'paren', e: subParse(inner, this.opts) };
    }
    if (c === '‖') {
      this.i++;
      const end = this.s.indexOf('‖', this.i);
      if (end < 0) fail('Ferme la norme avec ‖.', start);
      const inner = this.s.slice(this.i, end);
      this.i = end + 1;
      return { op: 'norm', e: subParse(inner, this.opts) };
    }
    if (c === '|') {
      this.i++;
      const end = this.s.indexOf('|', this.i);
      if (end < 0) fail('Ferme la valeur absolue avec |.', start);
      const inner = this.s.slice(this.i, end);
      this.i = end + 1;
      return { op: 'abs', e: subParse(inner, this.opts) };
    }
    if (c === '√') {
      this.i++;
      if (/[0-9]/.test(this.peek())) {
        const m = /^\d+/.exec(this.rest());
        this.i += m[0].length;
        return { op: 'sqrt', e: { op: 'num', n: num(Number(m[0])) } };
      }
      return { op: 'sqrt', e: this.atom() };
    }
    if (c === 'π') { this.i++; return { op: 'num', n: { t: 'const', name: 'pi' } }; }
    // A blank of a guided line (shown only, never computed).
    if (c === '□') { this.i++; const b = this.opts._blanks || (this.opts._blanks = { n: 0 }); return { op: 'num', n: { t: 'blank', id: b.n++ } }; }
    const rest = this.rest();
    const f = FNAMES.find((w) => rest.startsWith(`${w}(`));
    if (f) {
      this.i += f.length + 1;
      const inner = this.group(')');
      return { op: 'fn', name: f === 'Arctg' ? 'arctan' : f, e: subParse(inner, this.opts) };
    }
    if (rest.startsWith('vec(')) {
      this.i += 4;
      const inner = this.group(')');
      const [a, b] = inner.split(',').map((x) => x.trim());
      if (!a || !b) fail('Écris vec(A, B).', start);
      return { op: 'vecAB', a: this.nameOf(a), b: this.nameOf(b) };
    }
    const m = /^([A-Za-zΩα-ω])('*)(_\d+|_[a-z])?/.exec(rest);
    if (!m) fail(`Je ne sais pas lire « ${c} » ici.`, this.i);
    this.i += m[0].length;
    const name = m[0];
    // Two point names side by side: the vector AB.
    const names = this.opts.names || {};
    if (names[name] === 'point') {
      const m2 = /^([A-ZΩ])('*)(_\d+)?/.exec(this.s.slice(this.i));
      if (m2 && names[m2[0]] === 'point') {
        this.i += m2[0].length;
        return { op: 'vecAB', a: name, b: m2[0] };
      }
    }
    return { op: 'name', name };
  }

  nameOf(t) {
    const n = normVecText(t);
    if (!(this.opts.names || {})[n]) fail(`Je ne connais pas le point ${n.replace(/_(\d+)/, '$1')}.`);
    return n;
  }
}

// Top-level split (outside brackets and bars).
export function splitTop(text, seps) {
  const out = [];
  let depth = 0;
  let bar = false;
  let cur = '';
  for (const c of text) {
    if (c === '(' || c === '[' || c === '{') depth++;
    if (c === ')' || c === ']' || c === '}') depth--;
    if (c === '‖') bar = !bar;
    if (depth === 0 && !bar && seps.includes(c)) { out.push(cur); cur = ''; continue; }
    cur += c;
  }
  out.push(cur);
  return out;
}

function subParse(text, opts) {
  const p = new VP(text, opts);
  const e = p.sum();
  if (p.peek() !== undefined) fail(`Je n'arrive pas à lire « ${p.rest()} ».`);
  return e;
}

export function parseVec(text, opts = {}) {
  const t = normVecText(text);
  if (!t) fail('La ligne est vide.');
  return subParse(t, opts);
}

// ---------- values ----------

export const S = (n) => ({ k: 's', n });
export const V = (items) => ({ k: 'v', items });
const isV = (x) => x.k === 'v';

function dot(a, b) { return simp(a.items.reduce((s, x, i) => add(s, mul(x, b.items[i])), num(0))); }
function cross(a, b) {
  const [a1, a2, a3] = a.items;
  const [b1, b2, b3] = b.items;
  return V([sub(mul(a2, b3), mul(a3, b2)), sub(mul(a3, b1), mul(a1, b3)), sub(mul(a1, b2), mul(a2, b1))].map(simp));
}

export function evalVec(ast, env = {}, opts = {}) {
  const E = (a) => evalVec(a, env, opts);
  switch (ast.op) {
    case 'num': return S(ast.n);
    case 'paren': return E(ast.e);
    case 'tuple': {
      const items = ast.items.map((x) => {
        const v = E(x);
        if (isV(v)) fail('Une composante doit être un nombre.');
        return simp(v.n);
      });
      if (items.length > 3) fail('Au plus trois composantes.');
      return V(items);
    }
    case 'name': {
      if (env[ast.name]) return env[ast.name];
      const base = ast.name.split('_')[0];
      if ((opts.params || []).includes(ast.name) || (opts.params || []).includes(base)) return S(sym(base, ast.name.includes('_') ? ast.name.split('_')[1] : undefined));
      if (ast.name === 'e' && opts.euler) return S({ t: 'const', name: 'e' });
      fail(`Je ne connais pas ${ast.name.replace(/_(\w+)/, '$1')} ici.`);
      break;
    }
    case 'vecAB': {
      const a = env[ast.a];
      const b = env[ast.b];
      if (!a || !b || !isV(a) || !isV(b)) fail(`Je ne connais pas les points ${ast.a} et ${ast.b}.`);
      return V(b.items.map((x, i) => simp(sub(x, a.items[i]))));
    }
    case 'neg': { const v = E(ast.e); return isV(v) ? V(v.items.map((x) => simp(neg(x)))) : S(neg(v.n)); }
    case 'add': case 'sub': {
      const a = E(ast.a);
      const b = E(ast.b);
      const f = ast.op === 'add' ? add : sub;
      if (isV(a) !== isV(b)) fail('On n\'additionne pas un nombre et un vecteur.');
      if (!isV(a)) return S(f(a.n, b.n));
      if (a.items.length !== b.items.length) fail('Ces vecteurs n\'ont pas le même nombre de composantes.');
      return V(a.items.map((x, i) => simp(f(x, b.items[i]))));
    }
    case 'mul': {
      const a = E(ast.a);
      const b = E(ast.b);
      if (!isV(a) && !isV(b)) return S(mul(a.n, b.n));
      if (!isV(a)) return V(b.items.map((x) => simp(mul(a.n, x))));
      if (!isV(b)) return V(a.items.map((x) => simp(mul(x, b.n))));
      if (a.items.length !== b.items.length) fail('Ces vecteurs n\'ont pas le même nombre de composantes.');
      if (ast.how === '·') return S(dot(a, b));
      if (ast.how === '∧' || ast.how === '×') {
        if (a.items.length !== 3) fail('Le produit vectoriel se calcule dans l\'espace (3 composantes).');
        return cross(a, b);
      }
      fail('Entre deux vecteurs, écris · (produit scalaire) ou ∧ (produit vectoriel).');
      break;
    }
    case 'div': {
      const a = E(ast.a);
      const b = E(ast.b);
      if (isV(b)) fail('On ne divise pas par un vecteur.');
      if (sameScalar(b.n, num(0), { vars: opts.params })) fail('Division par zéro.');
      return isV(a) ? V(a.items.map((x) => simp(div(x, b.n)))) : S(div(a.n, b.n));
    }
    case 'pow': {
      const v = E(ast.e);
      if (isV(v)) {
        if (ast.k === 2) return S(dot(v, v));
        fail('Un vecteur n\'a pas de puissance (sauf u² = u·u).');
      }
      return S(pow(v.n, ast.kNode ?? num(ast.k)));
    }
    case 'norm': {
      const v = E(ast.e);
      if (!isV(v)) return S({ t: 'abs', e: v.n });
      return S(sqrtNode(dot(v, v)));
    }
    case 'abs': {
      const v = E(ast.e);
      if (isV(v)) return S(sqrtNode(dot(v, v)));
      return S({ t: 'abs', e: v.n });
    }
    case 'sqrt': {
      const v = E(ast.e);
      if (isV(v)) fail('√ s\'applique à un nombre.');
      return S(sqrtNode(v.n));
    }
    case 'fn': {
      const v = E(ast.e);
      if (isV(v)) fail(`${ast.name} s'applique à un nombre.`);
      return S(ast.name === 'sqrt' ? sqrtNode(v.n) : fn(ast.name, v.n));
    }
    default: fail('Expression illisible.');
  }
  return null;
}

// The named points and vectors of an item, from their texts.
export function envFrom(symbols = {}, opts = {}) {
  const env = {};
  for (const [k, t] of Object.entries(symbols)) env[normVecText(k)] = evalVec(parseVec(String(t), opts), env, opts);
  return env;
}

// names: {A: 'point', u: 'vector', k: 'scalar'} from the env (for AB).
export function namesOf(env) {
  const out = {};
  for (const [k, v] of Object.entries(env)) out[k] = v.k === 'v' ? (/^[A-ZΩ]/.test(k) ? 'point' : 'vector') : 'scalar';
  return out;
}

export function sameVal(a, b, opts = {}) {
  if (!a || !b || a.k !== b.k) return false;
  if (a.k === 's') return sameScalar(a.n, b.n, { vars: opts.params });
  return a.items.length === b.items.length && a.items.every((x, i) => sameScalar(x, b.items[i], { vars: opts.params }));
}

const fl = (n, env = {}) => evalFloat(n, env);

export const isZeroVal = (v) => (v.k === 's' ? Math.abs(fl(v.n)) < 1e-12 : v.items.every((x) => Math.abs(fl(x)) < 1e-12));

// b = c·a with c ≠ 0 (a normal vector, a direction: any nonzero multiple).
export function isMultiple(a, b) {
  if (a.k !== 'v' || b.k !== 'v' || a.items.length !== b.items.length) return false;
  const x = a.items.map((n) => fl(n));
  const y = b.items.map((n) => fl(n));
  if (y.every((t) => Math.abs(t) < 1e-12)) return false;
  const i = x.findIndex((t) => Math.abs(t) > 1e-12);
  if (i < 0) return false;
  const c = y[i] / x[i];
  return x.every((t, k) => Math.abs(t * c - y[k]) <= 1e-9 * (1 + Math.abs(y[k])));
}

export const floats = (v) => (v.k === 'v' ? v.items.map((n) => fl(n)) : [fl(v.n)]);

// ---------- printing ----------

const nodeText = (n) => toText(n).replace(/,/g, '.');
export function vText(v) {
  if (v.k === 's') return nodeText(v.n);
  return `(${v.items.map(nodeText).join(' ; ')})`;
}

const inner = (n, bl) => toMathML(stripParen(n), { blanks: bl || {} }).replace(/^<math[^>]*>/, '').replace(/<\/math>$/, '');
const nameML = (name) => {
  const m = /^([^_']+)('*)(?:_(\w+))?$/.exec(name);
  if (!m) return `<mi>${name}</mi>`;
  let base = `<mi>${m[1]}</mi>`;
  if (m[3]) base = `<msub>${base}<mn>${m[3]}</mn></msub>`;
  if (m[2]) base = `<msup>${base}<mo>${'′'.repeat(m[2].length)}</mo></msup>`;
  return base;
};
const arrow = (ml) => `<mover accent="true"><mrow>${ml}</mrow><mo>→</mo></mover>`;
const PREC = { add: 1, sub: 1, neg: 1, mul: 2, div: 2, pow: 3 };
const precOf = (a) => PREC[a.op] ?? 4;

// MathML of an ast (shown as written).
export function astML(ast, bl = {}) {
  const A = (a) => astML(a, bl);
  const W = (a, p = 0) => (precOf(a) < p ? `<mrow><mo>(</mo>${A(a)}<mo>)</mo></mrow>` : A(a));
  switch (ast.op) {
    case 'num': return inner(ast.n, bl);
    case 'paren': return `<mrow><mo>(</mo>${A(ast.e)}<mo>)</mo></mrow>`;
    case 'tuple': return `<mrow><mo>(</mo>${ast.items.map((x) => A(x)).join('<mo>;</mo>')}<mo>)</mo></mrow>`;
    case 'name': return /^[a-z]/.test(ast.name) && !['t', 's', 'k'].includes(ast.name.split('_')[0]) && ast.vec ? arrow(nameML(ast.name)) : nameML(ast.name);
    case 'vecAB': return arrow(`${nameML(ast.a)}${nameML(ast.b)}`);
    case 'neg': return `<mo>−</mo>${W(ast.e, 2)}`;
    case 'add': return `${A(ast.a)}<mo>+</mo>${W(ast.b, 1)}`;
    case 'sub': return `${A(ast.a)}<mo>−</mo>${W(ast.b, 2)}`;
    case 'mul': {
      const op = ast.how === 'implicit' ? '' : ast.how === '×' ? '<mo>∧</mo>' : `<mo>${ast.how}</mo>`;
      return `${W(ast.a, 2)}${op}${W(ast.b, 3)}`;
    }
    case 'div': return `<mfrac><mrow>${A(ast.a)}</mrow><mrow>${A(ast.b)}</mrow></mfrac>`;
    case 'pow': return `<msup><mrow>${W(ast.e, 4)}</mrow><mn>${ast.k ?? toText(ast.kNode)}</mn></msup>`;
    case 'norm': return `<mrow><mo>‖</mo>${A(ast.e)}<mo>‖</mo></mrow>`;
    case 'abs': return `<mrow><mo>|</mo>${A(ast.e)}<mo>|</mo></mrow>`;
    case 'sqrt': return `<msqrt>${A(ast.e)}</msqrt>`;
    case 'fn': return `<mi>${ast.name}</mi><mrow><mo>(</mo>${A(ast.e)}<mo>)</mo></mrow>`;
    default: return '<mi>?</mi>';
  }
}

// A label before « = »: C, θ, cos θ, ‖AB‖, d(P, α), n⃗ …, as MathML.
export function labelML(label) {
  const t = normVecText(label);
  const m = /^([A-Za-zΩα-ω])('*)(_\d+)?$/.exec(t);
  if (m) return nameML(t);
  return `<mtext>${t.replace(/_(\d+)/g, (_, d) => [...d].map((x) => '₀₁₂₃₄₅₆₇₈₉'[x]).join('')).replace(/</g, '&lt;')}</mtext>`;
}

// The exact rational value of a scalar value, or null.
export const qOfVal = (v) => (v.k === 's' ? exactValue(v.n) : null);

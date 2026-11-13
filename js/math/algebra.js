// Algebra with letters: parsing, exact polynomial arithmetic, equivalence,
// and the form checks the exercises need ("développé réduit", "factorisé").
//
// Syntax typed on the keypad: 3x, 2(x+1), (x+1)(x-2), x^2, 3/4x = (3/4)x,
// ab, √x, = for equations. Implicit multiplication binds like ×.
//
// AST nodes: num {v: Q, s}, var {name}, bin {op: + - × ÷, l, r, implicit},
// neg {e}, pow {b, e}, frac {n, d}, paren {e}, sqrt {e}, eq {l, r}.

import { Q, gcd } from './rational.js';
import { t } from '../i18n.js';

export class AlgError extends Error {}

// ---------- parsing ----------

function tokenize(src) {
  const s = String(src).replace(/\s+/g, '').replace(/−/g, '-').replace(/[*·]/g, '×').replace(/:/g, '÷').replace(/²/g, '^2').replace(/³/g, '^3');
  const out = [];
  for (let i = 0; i < s.length;) {
    const c = s[i];
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9,.]/.test(s[j])) j++;
      out.push({ k: 'num', s: s.slice(i, j).replace('.', ',') });
      i = j;
    } else if (/[a-zA-Zπ]/.test(c)) { out.push({ k: 'var', s: c }); i++; } else if ('+-×÷/^()=√±'.includes(c)) { out.push({ k: c }); i++; } else throw new AlgError(`Symbole inattendu : ${c}`);
  }
  return out;
}

const numNode = (s) => {
  const [a, b = ''] = s.split(',');
  return { t: 'num', s, v: new Q(Number(a + b), 10 ** b.length) };
};

export function parseAlg(src) {
  const toks = tokenize(src);
  let p = 0;
  const peek = () => toks[p];
  const eat = (k) => { if (toks[p]?.k !== k) throw new AlgError(`« ${k} » attendu`); p++; };
  const startsFactor = (t) => t && (t.k === 'num' || t.k === 'var' || t.k === '(' || t.k === '√');

  function equation() {
    const l = sum();
    if (peek()?.k === '=') { p++; const r = sum(); return { t: 'eq', l, r }; }
    return l;
  }
  function sum() {
    let n = product();
    while (peek()?.k === '+' || peek()?.k === '-' || peek()?.k === '±') {
      const op = toks[p++].k;
      n = { t: 'bin', op, l: n, r: product() };
    }
    return n;
  }
  function product() {
    let n = unary();
    for (;;) {
      const t = peek();
      if (t?.k === '×' || t?.k === '÷') { p++; n = { t: 'bin', op: t.k, l: n, r: unary() }; } else if (startsFactor(t)) n = { t: 'bin', op: '×', l: n, r: frac(), implicit: true };
      else return n;
    }
  }
  function unary() {
    if (peek()?.k === '-') { p++; return { t: 'neg', e: unary() }; }
    if (peek()?.k === '+') { p++; return unary(); }
    return frac();
  }
  // The fraction bar binds tighter than ×: 3/4x = (3/4)x.
  function frac() {
    let n = power();
    while (peek()?.k === '/') { p++; n = { t: 'frac', n, d: power() }; }
    return n;
  }
  function power() {
    const b = atom();
    if (peek()?.k === '^') {
      p++;
      if (peek()?.k === '-') { p++; return { t: 'pow', b, e: { t: 'neg', e: atom() } }; }
      return { t: 'pow', b, e: atom() };
    }
    return b;
  }
  function atom() {
    const t = toks[p++];
    if (!t) throw new AlgError('Expression incomplète.');
    if (t.k === 'num') return numNode(t.s);
    if (t.k === 'var') return { t: 'var', name: t.s };
    if (t.k === '(') { const e = sum(); eat(')'); return { t: 'paren', e }; }
    if (t.k === '√') return { t: 'sqrt', e: atom() };
    throw new AlgError(`Symbole inattendu : ${t.k}`);
  }
  const tree = equation();
  if (p < toks.length) throw new AlgError(`Symbole inattendu : ${toks[p].k}`);
  return tree;
}

export const tryParseAlg = (s) => { try { return parseAlg(s); } catch { return null; } };

// ---------- polynomials ----------
// A polynomial is a Map from a monomial key ("x2y1", "" for constants) to a
// non-zero Q coefficient.

const keyOf = (vars) => Object.keys(vars).sort().filter((v) => vars[v]).map((v) => `${v}${vars[v]}`).join('');
const varsOf = (key) => {
  const out = {};
  for (const [, v, k] of key.matchAll(/([a-zπ])(\d+)/gi)) out[v] = Number(k);
  return out;
};

export class Poly {
  constructor(map = new Map()) { this.m = map; }
  static const(q) { const m = new Map(); if (!Q.of(q).eq(0)) m.set('', Q.of(q)); return new Poly(m); }
  static variable(name) { return new Poly(new Map([[`${name}1`, new Q(1)]])); }
  get isZero() { return this.m.size === 0; }
  add(o) {
    const m = new Map(this.m);
    for (const [k, c] of o.m) {
      const s = (m.get(k) || new Q(0)).add(c);
      if (s.eq(0)) m.delete(k); else m.set(k, s);
    }
    return new Poly(m);
  }
  neg() { return new Poly(new Map([...this.m].map(([k, c]) => [k, c.neg()]))); }
  sub(o) { return this.add(o.neg()); }
  scale(q) { return Q.of(q).eq(0) ? new Poly() : new Poly(new Map([...this.m].map(([k, c]) => [k, c.mul(q)]))); }
  mul(o) {
    let r = new Poly();
    for (const [k1, c1] of this.m) {
      for (const [k2, c2] of o.m) {
        const v = varsOf(k1);
        for (const [x, e] of Object.entries(varsOf(k2))) v[x] = (v[x] || 0) + e;
        r = r.add(new Poly(new Map([[keyOf(v), c1.mul(c2)]])));
      }
    }
    return r;
  }
  pow(n) { let r = Poly.const(1); for (let i = 0; i < n; i++) r = r.mul(this); return r; }
  eq(o) { return this.sub(o).isZero; }
  get isConst() { return [...this.m.keys()].every((k) => k === ''); }
  constValue() { return this.m.get('') || new Q(0); }
  degreeIn(x) { let d = 0; for (const k of this.m.keys()) d = Math.max(d, varsOf(k)[x] || 0); return d; }
  get vars() { const s = new Set(); for (const k of this.m.keys()) Object.keys(varsOf(k)).forEach((v) => s.add(v)); return [...s].sort(); }
  // Coefficients in one variable, highest degree first: x² − 3x + 2 → [1, −3, 2].
  coeffs(x) {
    const n = this.degreeIn(x);
    const out = Array.from({ length: n + 1 }, () => new Q(0));
    for (const [k, c] of this.m) {
      const v = varsOf(k);
      if (Object.keys(v).some((y) => y !== x)) throw new AlgError('Plusieurs lettres');
      out[n - (v[x] || 0)] = c;
    }
    return out;
  }
  terms() { return [...this.m].map(([k, c]) => ({ vars: varsOf(k), c })); }
}

// Rational function n / d.
class Rat {
  constructor(n, d = Poly.const(1)) { this.n = n; this.d = d; }
  add(o) { return new Rat(this.n.mul(o.d).add(o.n.mul(this.d)), this.d.mul(o.d)); }
  sub(o) { return new Rat(this.n.mul(o.d).sub(o.n.mul(this.d)), this.d.mul(o.d)); }
  mul(o) { return new Rat(this.n.mul(o.n), this.d.mul(o.d)); }
  div(o) { if (o.n.isZero) throw new AlgError('Division par zéro'); return new Rat(this.n.mul(o.d), this.d.mul(o.n)); }
  neg() { return new Rat(this.n.neg(), this.d); }
  eq(o) { return this.n.mul(o.d).eq(o.n.mul(this.d)); }
}

export class NotPolynomial extends Error {}

export function toRat(node) {
  switch (node.t) {
    case 'num': return new Rat(Poly.const(node.v));
    case 'var': return new Rat(Poly.variable(node.name));
    case 'paren': return toRat(node.e);
    case 'neg': return toRat(node.e).neg();
    case 'frac': return toRat(node.n).div(toRat(node.d));
    case 'bin': {
      const a = toRat(node.l);
      const b = toRat(node.r);
      if (node.op === '+') return a.add(b);
      if (node.op === '-') return a.sub(b);
      if (node.op === '×') return a.mul(b);
      if (node.op === '÷') return a.div(b);
      throw new NotPolynomial('±');
    }
    case 'pow': {
      const e = toRat(node.e);
      if (!e.n.isConst || !e.d.isConst) throw new NotPolynomial('exposant');
      const k = e.n.constValue().div(e.d.constValue());
      if (k.d !== 1) throw new NotPolynomial('exposant');
      const b = toRat(node.b);
      if (k.n >= 0) return new Rat(b.n.pow(k.n), b.d.pow(k.n));
      return new Rat(b.d.pow(-k.n), b.n.pow(-k.n));
    }
    default: throw new NotPolynomial(node.t);
  }
}

export const toPoly = (node) => {
  const r = toRat(node);
  if (!r.d.isConst) throw new NotPolynomial('fraction');
  return r.n.scale(new Q(1).div(r.d.constValue()));
};

// Numeric value at a point, for expressions with roots.
export function evalAt(node, env) {
  switch (node.t) {
    case 'num': return node.v.n / node.v.d;
    case 'var': if (node.name === 'π') return Math.PI; if (!(node.name in env)) throw new AlgError(`Valeur de ${node.name} ?`); return env[node.name];
    case 'paren': return evalAt(node.e, env);
    case 'neg': return -evalAt(node.e, env);
    case 'frac': return evalAt(node.n, env) / evalAt(node.d, env);
    case 'sqrt': return Math.sqrt(evalAt(node.e, env));
    case 'pow': return evalAt(node.b, env) ** evalAt(node.e, env);
    case 'bin': {
      const a = evalAt(node.l, env);
      const b = evalAt(node.r, env);
      return { '+': a + b, '-': a - b, '×': a * b, '÷': a / b }[node.op];
    }
    default: throw new AlgError(node.t);
  }
}

export function varsIn(node, out = new Set()) {
  if (node.t === 'var' && node.name !== 'π') out.add(node.name);
  for (const k of ['e', 'l', 'r', 'b', 'n', 'd']) if (node[k] && typeof node[k] === 'object' && node[k].t) varsIn(node[k], out);
  return out;
}

// Same value for every value of the letters (where both are defined).
export function equivalent(a, b) {
  try {
    return toRat(a).eq(toRat(b));
  } catch (e) {
    if (!(e instanceof NotPolynomial)) throw e;
  }
  const names = [...new Set([...varsIn(a), ...varsIn(b)])];
  const points = [0.7312, 1.618, 2.2361, 3.1416, 4.477];
  let checked = 0;
  for (let i = 0; i < points.length; i++) {
    const env = Object.fromEntries(names.map((n, j) => [n, points[(i + j) % points.length] + j * 0.37]));
    const x = evalAt(a, env);
    const y = evalAt(b, env);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    checked += 1;
    if (Math.abs(x - y) > 1e-9 * Math.max(1, Math.abs(x), Math.abs(y))) return false;
  }
  return checked > 0;
}

// ---------- printing and rendering ----------

const strip = (n) => (n.t === 'paren' ? strip(n.e) : n);

export function printAlg(n) {
  switch (n.t) {
    case 'num': return n.s;
    case 'var': return n.name;
    case 'paren': return `(${printAlg(n.e)})`;
    case 'neg': return `-${printAlg(n.e)}`;
    case 'frac': return `${printAlg(n.n)}/${printAlg(n.d)}`;
    case 'sqrt': return `√${printAlg(n.e)}`;
    case 'pow': return `${printAlg(n.b)}^${printAlg(n.e)}`;
    case 'eq': return `${printAlg(n.l)}=${printAlg(n.r)}`;
    case 'bin': return `${printAlg(n.l)}${n.implicit ? '' : n.op}${printAlg(n.r)}`;
    default: return '?';
  }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

export function renderAlg(n) {
  switch (n.t) {
    case 'num': return `<span class="m-num">${n.s}</span>`;
    case 'var': return `<i class="m-var">${esc(n.name)}</i>`;
    case 'paren': return `<span class="m-paren">(</span>${renderAlg(n.e)}<span class="m-paren">)</span>`;
    case 'neg': return `<span class="m-op m-neg">−</span>${renderAlg(n.e)}`;
    case 'frac': return `<span class="m-frac"><span class="m-n">${renderAlg(strip(n.n))}</span><span class="m-d">${renderAlg(strip(n.d))}</span></span>`;
    case 'sqrt': return `<span class="m-rad">√</span><span class="m-under">${renderAlg(strip(n.e))}</span>`;
    case 'pow': return `${renderAlg(n.b)}<sup class="m-sup">${renderAlg(n.e)}</sup>`;
    case 'eq': return `${renderAlg(n.l)}<span class="m-op">=</span>${renderAlg(n.r)}`;
    case 'bin':
      if (n.implicit) return `${renderAlg(n.l)}${renderAlg(n.r)}`;
      return `${renderAlg(n.l)}<span class="m-op">${{ '-': '−', '±': '±' }[n.op] || n.op}</span>${renderAlg(n.r)}`;
    default: return '?';
  }
}

export const algHtml = (s) => `<span class="m">${renderAlg(parseAlg(s))}</span>`;

// A polynomial written in the usual order (highest degree first), as
// keypad text: 2x^2-3x+1.
export function polyText(p, order) {
  const vars = order || p.vars;
  const terms = p.terms().sort((a, b) => {
    const da = Object.values(a.vars).reduce((s, x) => s + x, 0);
    const db = Object.values(b.vars).reduce((s, x) => s + x, 0);
    if (da !== db) return db - da;
    for (const v of vars) if ((a.vars[v] || 0) !== (b.vars[v] || 0)) return (b.vars[v] || 0) - (a.vars[v] || 0);
    return 0;
  });
  if (!terms.length) return '0';
  return terms.map(({ vars: vs, c }, i) => {
    const letters = Object.keys(vs).sort().map((v) => (vs[v] > 1 ? `${v}^${vs[v]}` : v)).join('');
    const abs = c.n < 0 ? c.neg() : c;
    let coef = abs.d === 1 ? String(abs.n) : `${abs.n}/${abs.d}`;
    if (letters && abs.eq(1)) coef = '';
    const sign = c.n < 0 ? '-' : i ? '+' : '';
    return `${sign}${coef}${letters}`;
  }).join('');
}

// ---------- forms ----------

// Flattens a sum into signed terms: a − (b) + c → [a, −b, c].
function sumTerms(n, sign = 1, out = []) {
  if (n.t === 'bin' && (n.op === '+' || n.op === '-')) {
    sumTerms(n.l, sign, out);
    sumTerms(n.r, n.op === '-' ? -sign : sign, out);
  } else if (n.t === 'neg' && out.length === 0) {
    sumTerms(n.e, -sign, out);
  } else out.push({ node: n, sign });
  return out;
}

// A term like 3x²y, −x, 2/3x: at most one number, then letters, each once.
function monomialOf(n) {
  const factors = [];
  const walk = (x) => {
    if (x.t === 'bin' && x.op === '×') { walk(x.l); walk(x.r); } else factors.push(x);
  };
  let node = n;
  let neg = false;
  if (node.t === 'neg') { neg = true; node = node.e; }
  walk(node);
  let coefs = 0;
  const vars = {};
  for (const f0 of factors) {
    // −10x is read as (−10)·x: a negative number is still a coefficient.
    const f = f0.t === 'neg' && factors.indexOf(f0) === 0 ? f0.e : f0;
    if (f.t === 'num' || (f.t === 'frac' && f.n.t === 'num' && f.d.t === 'num')) {
      if (coefs++ || factors.indexOf(f0) !== 0) return null;
    } else if (f.t === 'var') {
      if (vars[f.name]) return null;
      vars[f.name] = 1;
    } else if (f.t === 'pow' && f.b.t === 'var' && f.e.t === 'num' && f.e.v.d === 1 && f.e.v.n > 1) {
      if (vars[f.b.name]) return null;
      vars[f.b.name] = f.e.v.n;
    } else return null;
  }
  return { key: keyOf(vars), neg };
}

// "Développé et réduit": a sum of monomials, each kind once, no brackets.
export function isReducedForm(node) {
  const seen = new Set();
  for (const { node: t } of sumTerms(node)) {
    const mono = monomialOf(t);
    if (!mono || seen.has(mono.key)) return false;
    seen.add(mono.key);
  }
  return true;
}

const intContent = (p) => {
  let g = 0;
  for (const { c } of p.terms()) {
    if (c.d !== 1) return 1;
    g = gcd(g, Math.abs(c.n));
  }
  return g || 1;
};
const commonVar = (p) => {
  const ts = p.terms();
  if (ts.length < 2) return null;
  return p.vars.find((v) => ts.every((t) => (t.vars[v] || 0) > 0)) || null;
};

// Factors of a product, with exponents: 2x(x−1)² → [2, x, (x−1)²].
function productFactors(n) {
  const out = [];
  const walk = (x) => {
    if (x.t === 'bin' && x.op === '×') { walk(x.l); walk(x.r); } else if (x.t === 'neg') { out.push({ t: 'num', v: new Q(-1), s: '-1' }); walk(x.e); } else out.push(x);
  };
  walk(n);
  return out;
}

const isRationalRootQuadratic = ([a, b, c]) => {
  const disc = b.mul(b).sub(a.mul(c).mul(4));
  if (disc.n < 0) return false;
  const r = disc.sqrt?.();
  return !!r;
};

// "Factorisé". With complete: every bracket is irreducible (no common
// factor left, no square difference or trinomial that still splits).
// Returns null if fine, or a message saying what is left to do.
export function factoredProblem(node, { complete = true } = {}) {
  const fs = productFactors(strip(node));
  const sums = fs.map((f) => (f.t === 'pow' ? f.b : f)).filter((f) => strip(f).t === 'bin' && ['+', '-'].includes(strip(f).op));
  const poweredSum = fs.length === 1 && fs[0].t === 'pow' && sums.length === 1;
  if (fs.length < 2 && !poweredSum) return t('Écris l\'expression comme un produit de facteurs.');
  for (const f of fs) {
    if (f.t === 'num' || f.t === 'var' || (f.t === 'pow' && strip(f.b).t === 'var')) continue;
    const inner = f.t === 'pow' ? f.b : f;
    if (strip(inner).t !== 'bin' || !['+', '-'].includes(strip(inner).op)) {
      if (strip(inner).t === 'bin' && strip(inner).op === '×') continue;
      continue;
    }
    let p;
    try { p = toPoly(inner); } catch { return null; }
    if (intContent(p) > 1) return t('On peut encore mettre {k} en évidence dans {e}.', { k: intContent(p), e: printAlg(inner) });
    const v = commonVar(p);
    if (v) return t('On peut encore mettre {k} en évidence dans {e}.', { k: v, e: printAlg(inner) });
    if (complete && p.vars.length === 1) {
      const x = p.vars[0];
      if (p.degreeIn(x) === 2 && isRationalRootQuadratic(p.coeffs(x))) return t('{e} peut encore se factoriser.', { e: printAlg(inner) });
      if (p.degreeIn(x) > 2) return t('{e} peut encore se factoriser.', { e: printAlg(inner) });
    }
  }
  return null;
}

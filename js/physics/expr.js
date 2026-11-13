// Physics expressions: E_p = m g h, v = √(2 g h), h = c ΔT / g.
//
// Read the way the keypad draws them (js/ui/keypad.js): a bar takes the
// factor just before it and the factor just after it (m v^2/2 is m·(v²/2)),
// ^ takes one atom, √ one atom, letters side by side multiply. Symbols are
// those of the item (E_p, ΔT, ρ…): a run of letters is cut into the
// longest symbols first, so « mgh » is m·g·h and « E_p » one symbol.
//
// Values are floats: lines are checked numerically, on situations where
// every relation of the problem holds (js/physics/relations.js).
//
// Nodes: num {v, s}, sym {s}, add/sub/mul/div {a, b, implicit}, pow {a, b},
// neg {a}, sqrt {a}, eq {sides: [..]}.

import { dimMul, dimDiv, dimPow, dimEq, DIMENSIONLESS } from './units.js';
import { symHtml } from './quantities.js';

export class ExprError extends Error {}
export class DimError extends Error {}

const isLetter = (c) => /[\p{L}_ΔℓΩ]/u.test(c);

function cutSymbols(run, symbols) {
  const out = [];
  let i = 0;
  const sorted = [...symbols].sort((a, b) => b.length - a.length);
  while (i < run.length) {
    const s = sorted.find((x) => run.startsWith(x, i));
    if (!s) throw new ExprError(`Lettre inconnue : ${run.slice(i)}`);
    out.push({ k: 'sym', s });
    i += s.length;
  }
  return out;
}

// src: a string, or the characters of a keypad line (a key of several
// characters, « E_p » or « √( », is one piece).
export function tokenize(src, symbols) {
  const pieces = Array.isArray(src) ? src : [...String(src)];
  const toks = [];
  let run = '';
  const flush = () => { if (run) { toks.push(...cutSymbols(run, symbols)); run = ''; } };
  for (let i = 0; i < pieces.length; i++) {
    let c = pieces[i];
    if (c === '√(') { flush(); toks.push({ k: '√' }, { k: '(' }); continue; }
    if (c.length > 1 && symbols.includes(c)) { flush(); toks.push({ k: 'sym', s: c }); continue; }
    if (c.length > 1) { flush(); toks.push(...tokenize([...c], symbols)); continue; }
    if (c === 'π') { flush(); toks.push({ k: 'num', v: Math.PI, s: 'π' }); continue; }
    if (isLetter(c)) { run += c; continue; }
    // A digit right after « _ » is a subscript (m_1).
    if (/[0-9]/.test(c) && /_[0-9]*$/.test(run)) { run += c; continue; }
    flush();
    if (c === ' ') continue;
    if (/[0-9]/.test(c)) {
      let s = c;
      while (/[0-9.,]/.test(pieces[i + 1] ?? '')) s += pieces[++i];
      toks.push({ k: 'num', v: Number(s.replace(',', '.')), s });
      continue;
    }
    if (c === '²' || c === '³') { toks.push({ k: '^' }, { k: 'num', v: c === '²' ? 2 : 3, s: c === '²' ? '2' : '3' }); continue; }
    if (c === '−') c = '-';
    if ('*·'.includes(c)) c = '×';
    if (c === ':') c = '÷';
    if ('+-×÷/^()√='.includes(c)) { toks.push({ k: c }); continue; }
    throw new ExprError(`Symbole inattendu : ${c}`);
  }
  flush();
  return toks;
}

export function parse(src, symbols = []) {
  const toks = tokenize(src, symbols);
  let p = 0;
  const peek = () => toks[p];
  const starts = (t) => t && (t.k === 'num' || t.k === 'sym' || t.k === '(' || t.k === '√');

  function equation() {
    const sides = [sum()];
    while (peek()?.k === '=') { p++; sides.push(sum()); }
    return sides.length > 1 ? { t: 'eq', sides } : sides[0];
  }
  function sum() {
    let n;
    if (peek()?.k === '-') { p++; n = { t: 'neg', a: term() }; } else if (peek()?.k === '+') { p++; n = term(); } else n = term();
    while (peek()?.k === '+' || peek()?.k === '-') {
      const op = toks[p++].k;
      n = { t: op === '+' ? 'add' : 'sub', a: n, b: term() };
    }
    return n;
  }
  function term() {
    let n = frac();
    for (;;) {
      const t = peek();
      if (t?.k === '×') { p++; n = { t: 'mul', a: n, b: frac() }; } else if (t?.k === '÷') { p++; n = { t: 'div', a: n, b: frac() }; } else if (starts(t)) n = { t: 'mul', a: n, b: frac(), implicit: true };
      else return n;
    }
  }
  function frac() {
    let n = power();
    while (peek()?.k === '/') { p++; n = { t: 'div', a: n, b: power() }; }
    return n;
  }
  function power() {
    let n = atom();
    while (peek()?.k === '^') {
      p++;
      if (peek()?.k === '-') { p++; n = { t: 'pow', a: n, b: { t: 'neg', a: atom() } }; } else n = { t: 'pow', a: n, b: atom() };
    }
    return n;
  }
  function atom() {
    const t = toks[p++];
    if (!t) throw new ExprError('Ligne incomplète');
    if (t.k === 'num') return { t: 'num', v: t.v, s: t.s };
    if (t.k === 'sym') return { t: 'sym', s: t.s };
    if (t.k === '√') return { t: 'sqrt', a: atom() };
    if (t.k === '(') {
      const e = sum();
      if (peek()?.k !== ')') throw new ExprError('« ) » attendue');
      p++;
      return { t: 'paren', a: e };
    }
    if (t.k === '-') return { t: 'neg', a: power() };
    throw new ExprError(`« ${t.k} » mal placé`);
  }

  if (!toks.length) throw new ExprError('Ligne vide');
  const e = equation();
  if (p < toks.length) throw new ExprError(`« ${toks[p].k === 'sym' ? toks[p].s : toks[p].k} » mal placé`);
  return e;
}

export const tryParse = (src, symbols) => { try { return parse(src, symbols); } catch { return null; } };

// ---------- values ----------

export function evaluate(n, env) {
  switch (n.t) {
    case 'num': return n.v;
    case 'sym': {
      if (!(n.s in env)) throw new ExprError(`Valeur inconnue : ${n.s}`);
      return env[n.s];
    }
    case 'paren': return evaluate(n.a, env);
    case 'neg': return -evaluate(n.a, env);
    case 'add': return evaluate(n.a, env) + evaluate(n.b, env);
    case 'sub': return evaluate(n.a, env) - evaluate(n.b, env);
    case 'mul': return evaluate(n.a, env) * evaluate(n.b, env);
    case 'div': return evaluate(n.a, env) / evaluate(n.b, env);
    case 'pow': return evaluate(n.a, env) ** evaluate(n.b, env);
    case 'sqrt': return Math.sqrt(evaluate(n.a, env));
    default: throw new ExprError('Une équation n\'a pas de valeur');
  }
}

// ---------- dimensions ----------

// dims: symbol → dimension vector (js/physics/units.js). Adding a mass to a
// length throws DimError: that is what step 4 catches.
export function dimension(n, dims) {
  switch (n.t) {
    case 'num': return DIMENSIONLESS;
    case 'sym': {
      if (!dims[n.s]) throw new ExprError(`Unité inconnue pour ${n.s}`);
      return dims[n.s];
    }
    case 'paren': case 'neg': return dimension(n.a, dims);
    case 'add': case 'sub': {
      const a = dimension(n.a, dims);
      const b = dimension(n.b, dims);
      if (!dimEq(a, b)) throw new DimError('On ne peut additionner que des grandeurs de même unité.');
      return a;
    }
    case 'mul': return dimMul(dimension(n.a, dims), dimension(n.b, dims));
    case 'div': return dimDiv(dimension(n.a, dims), dimension(n.b, dims));
    case 'pow': {
      if (!dimEq(dimension(n.b, dims), DIMENSIONLESS) || symbolsIn(n.b).size) throw new DimError('Un exposant est un nombre sans unité.');
      return dimPow(dimension(n.a, dims), evaluate(n.b, {}));
    }
    case 'sqrt': return dimPow(dimension(n.a, dims), 0.5);
    default: throw new ExprError('Une équation n\'a pas d\'unité');
  }
}

// ---------- reading a node ----------

export function symbolsIn(n, out = new Set()) {
  if (!n) return out;
  if (n.t === 'sym') out.add(n.s);
  if (n.t === 'eq') n.sides.forEach((s) => symbolsIn(s, out));
  for (const k of ['a', 'b']) if (n[k]) symbolsIn(n[k], out);
  return out;
}

export function numbersIn(n, out = []) {
  if (!n) return out;
  if (n.t === 'num' && n.s !== 'π') out.push(n.v);
  if (n.t === 'eq') n.sides.forEach((s) => numbersIn(s, out));
  for (const k of ['a', 'b']) if (n[k]) numbersIn(n[k], out);
  return out;
}

// « inconnue = expression »: the symbol alone on one side → {sym, expr}.
export function isolated(n) {
  if (n?.t !== 'eq' || n.sides.length !== 2) return null;
  const [l, r] = n.sides;
  if (l.t === 'sym' && !symbolsIn(r).has(l.s)) return { sym: l.s, expr: r };
  if (r.t === 'sym' && !symbolsIn(l).has(r.s)) return { sym: r.s, expr: l };
  return null;
}

// ---------- drawing (same classes as the keypad, css/style.css) ----------


const numHtml = (n) => (n.s === 'π' ? 'π' : String(n.s ?? n.v).replace('.', ','));
const PREC = { eq: 0, add: 1, sub: 1, neg: 2, mul: 3, div: 3, pow: 5, sqrt: 6, num: 6, sym: 6, paren: 6 };
const wrap = (n, min) => ((PREC[n.t] ?? 6) < min ? `<span class="m-par">(</span>${toHtml(n)}<span class="m-par">)</span>` : toHtml(n));
const box = (n) => toHtml(n.t === 'paren' ? n.a : n);

export function toHtml(n) {
  switch (n.t) {
    case 'num': return `<span>${numHtml(n)}</span>`;
    case 'sym': return symHtml(n.s);
    case 'paren': return `<span class="m-par">(</span>${toHtml(n.a)}<span class="m-par">)</span>`;
    case 'neg': return `<span class="m-op">−</span>${wrap(n.a, 3)}`;
    case 'add': return `${toHtml(n.a)}<span class="m-op">+</span>${wrap(n.b, 2)}`;
    case 'sub': return `${toHtml(n.a)}<span class="m-op">−</span>${wrap(n.b, 2)}`;
    case 'mul': {
      const num = (x) => x.t === 'num' || (x.t === 'pow' && x.a.t === 'num');
      const dot = !n.implicit || (num(n.b)) ? '<span class="m-op">·</span>' : '<span class="m-thin"></span>';
      return `${wrap(n.a, 3)}${dot}${wrap(n.b, 3)}`;
    }
    case 'div': return `<span class="m-frac"><span class="m-n">${box(n.a)}</span><span class="m-d">${box(n.b)}</span></span>`;
    case 'pow': return `${wrap(n.a, 6)}<sup class="m-sup">${box(n.b)}</sup>`;
    case 'sqrt': return `<span class="m-sqrt"><span class="m-rad">√</span><span class="m-under">${box(n.a)}</span></span>`;
    case 'eq': return n.sides.map(toHtml).join('<span class="m-op">=</span>');
    default: return '';
  }
}

export const html = (src, symbols) => `<span class="m">${toHtml(parse(src, symbols))}</span>`;

// Keypad text → AST (spec §4.2). A superset of js/math/expr.js, which stays
// as it is for the school units.
//
// Grammar, loosest to tightest:
//   list      formula {; formula}              a system, or several answers
//   formula   disj [(⇒|⇔) formula]             « et », « ou », « non » are read as ∧ ∨ ¬
//   disj      conj {∨ conj}     conj  lneg {∧ lneg}     lneg  ¬ lneg | relation
//   relation  setexpr [rel setexpr]            one relation per line, except a
//                                              chain of inequalities −2 < x ≤ 4;
//             setexpr (∈|∉) setexpr
//   setexpr   setterm {∪ setterm}   setterm  sum {(∩|∖) sum}
//   sum       term {(+|-) term}
//   term      unary {(×|÷) unary | implicit factor}   2x, x(x+1), 3sin(x)
//   unary     - unary | + unary | fraction
//   fraction  power {/ power}                 "/" is the fraction bar and binds
//                                             tighter than ×, as in expr.js
//   power     atom [^ [-] atom]               x^2, e^(2x), x^-1
//   atom      number | (formula) | |sum| | √atom | name | call, then primes ′
//             | interval ]a ; b[ | {a ; b} | {head | cond} | ℝ ℕ ℤ ℚ ℂ ∅
// Numbers take a decimal comma ("1,5") or point. Inside the arguments of
// a function with several arguments (d, root) the comma separates them.
// Names: known functions are read first (sinx = sin x), the other letters
// are single-letter variables (xy = x·y). A function takes (…), or a single
// number or letter (sin x); sin^2(x) = (sin x)². d(f) and d(f, x) are
// derivatives, f′ and (…)′ too; π, e, ∞ are constants, i only if
// opts.complex. x_k and x_(k+1) are indices.

import { Q } from '../math/rational.js';

export class ParseError extends Error {
  constructor(message, pos = 0) {
    super(message);
    this.pos = pos;
  }
}

// Function names, longest first so the lexer reads "sinh" before "sin".
export const FUNCS = [
  'arcsin', 'arccos', 'arctan', 'Arcsin', 'Arccos', 'Arctan', 'Arctg', 'arctg', 'argsh', 'argch', 'argth',
  'cotan', 'sinh', 'cosh', 'tanh', 'sqrt', 'root', 'conj', 'sin', 'cos', 'tan', 'cot', 'exp', 'Log', 'log', 'abs',
  'ln', 'Re', 'Im', 'arg',
];
// Read as functions only when "(" follows: they also look like products of letters.
const SHORT_FUNCS = ['sh', 'ch', 'th', 'tg', 'd'];
const MULTI_ARG = new Set(['d', 'root']);
const GREEK = 'αβγδεζηθικλμνξρστυφχψωΓΔΘΛΞΠΣΦΨΩ';
const RELOPS = new Set(['=', '<', '>', '≤', '≥', '≠']);
// Set and logic symbols (step U1).
const SET_NAMES = new Set(['ℝ', 'ℕ', 'ℤ', 'ℚ', 'ℂ', '∅']);
const SYMBOL_OPS = '[]{}∪∩∖∈∉⊂∧∨¬⇒⇔ℝℕℤℚℂ∅';

export function normalizeText(text) {
  return String(text)
    .replace(/<=>/g, '⇔').replace(/=>/g, '⇒')
    .replace(/\s+et\s+/g, '∧').replace(/\s+ou\s+/g, '∨').replace(/(^|[\s(])non\s*(?=\()/g, '$1¬')
    .replace(/\\/g, '∖')
    .replace(/\s+/g, '')
    .replace(/[−–]/g, '-')
    .replace(/[*·⋅]/g, '×')
    .replace(/:/g, '÷')
    .replace(/²/g, '^2').replace(/³/g, '^3').replace(/⁴/g, '^4')
    .replace(/[₀-₉]+/g, (m) => `_${[...m].map((c) => c.charCodeAt(0) - 0x2080).join('')}`)
    .replace(/″/g, "''").replace(/[′’]/g, "'")
    .replace(/<=/g, '≤').replace(/>=/g, '≥').replace(/!=/g, '≠');
}

// Tokens of a normalized text; joining their `s` gives the text back.
// Kinds: num, name, op. opts.funcs lists the item's own functions (f, g).
export function tokenize(text, opts = {}) {
  const s = normalizeText(text);
  const userFuncs = new Set(opts.funcs || []);
  const out = [];
  const stack = []; // per open bracket: 'args' (multi-argument call) or 'group'
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9]/.test(s[j])) j++;
      const sep = s[j];
      const decimalComma = sep === ',' && stack[stack.length - 1] !== 'args';
      if ((sep === '.' || decimalComma) && /[0-9]/.test(s[j + 1] ?? '')) {
        j++;
        while (j < s.length && /[0-9]/.test(s[j])) j++;
      }
      out.push({ k: 'num', s: s.slice(i, j), pos: i });
      i = j;
      continue;
    }
    if (/[A-Za-z]/.test(c)) {
      let j = i;
      while (j < s.length && /[A-Za-z]/.test(s[j])) j++;
      const run = s.slice(i, j);
      let p = 0;
      while (p < run.length) {
        const rest = run.slice(p);
        const atEnd = (name) => p + name.length === run.length && s[j] === '(';
        let name = FUNCS.find((f) => rest.startsWith(f))
          || [...userFuncs].find((f) => rest === f && s[j] === '(')
          || SHORT_FUNCS.find((f) => rest === f && atEnd(f))
          || (rest.startsWith('pi') ? 'pi' : null)
          || rest[0];
        if (rest.startsWith('pi') && name.length < 2) name = 'pi';
        out.push({ k: 'name', s: name, pos: i + p });
        p += name.length;
      }
      i = j;
      continue;
    }
    if (GREEK.includes(c) || c === 'π' || c === '∞') { out.push({ k: 'name', s: c, pos: i }); i++; continue; }
    if ('+-×÷/^()|\'√_,;□'.includes(c) || RELOPS.has(c) || SYMBOL_OPS.includes(c)) {
      if (c === '(') {
        const prev = out[out.length - 1];
        stack.push(prev?.k === 'name' && MULTI_ARG.has(prev.s) ? 'args' : 'group');
      }
      if (c === ')') stack.pop();
      out.push({ k: 'op', s: c, pos: i });
      i++;
      continue;
    }
    throw new ParseError(`Je ne connais pas le symbole « ${c} ».`, i);
  }
  return out;
}

const SNIP = (toks, p) => toks.slice(Math.max(0, p - 2), p + 2).map((t) => t.s).join('');

export function parse(text, opts = {}) {
  const toks = tokenize(text, opts);
  const userFuncs = new Set(opts.funcs || []);
  const dvar = opts.dvar || (opts.vars && opts.vars[0]) || 'x';
  let p = 0;
  let blanks = 0;
  const peek = (o = 0) => toks[p + o];
  const isOp = (t, s) => t && t.k === 'op' && t.s === s;
  const fail = (msg, at = p) => {
    const pos = toks[at]?.pos ?? (toks.length ? toks[toks.length - 1].pos + 1 : 0);
    throw new ParseError(at < toks.length ? `${msg} (près de « ${SNIP(toks, at)} »)` : msg, pos);
  };
  const expect = (s, msg) => { if (!isOp(peek(), s)) fail(msg); p++; };

  function list() {
    const first = formula();
    if (!isOp(peek(), ';')) return first;
    const items = [first];
    while (isOp(peek(), ';')) { p++; items.push(formula()); }
    return { t: 'list', items };
  }
  function formula() {
    const l = disj();
    if (isOp(peek(), '⇒') || isOp(peek(), '⇔')) {
      const op = toks[p++].s === '⇒' ? 'imp' : 'iff';
      return { t: 'logic', op, l, r: formula() };
    }
    return l;
  }
  function disj() {
    let n = conj();
    while (isOp(peek(), '∨')) { p++; n = { t: 'logic', op: 'or', l: n, r: conj() }; }
    return n;
  }
  function conj() {
    let n = lneg();
    while (isOp(peek(), '∧')) { p++; n = { t: 'logic', op: 'and', l: n, r: lneg() }; }
    return n;
  }
  function lneg() {
    if (isOp(peek(), '¬')) { p++; return { t: 'not', e: lneg() }; }
    return relation();
  }
  const UP = new Set(['<', '≤']);
  const DOWN = new Set(['>', '≥']);
  function relation() {
    const l = setexpr();
    const t = peek();
    if (isOp(t, '∈') || isOp(t, '∉')) { p++; return { t: 'in', op: t.s, l, r: setexpr() }; }
    if (t && t.k === 'op' && RELOPS.has(t.s)) {
      p++;
      const r = setexpr();
      if (!(peek() && peek().k === 'op' && RELOPS.has(peek().s))) return { t: 'rel', op: t.s, l, r };
      // A chain of inequalities in one direction: −2 < x ≤ 4.
      const items = [l, r];
      const ops = [t.s];
      while (peek() && peek().k === 'op' && RELOPS.has(peek().s)) { ops.push(toks[p++].s); items.push(setexpr()); }
      if (!(ops.every((o) => UP.has(o)) || ops.every((o) => DOWN.has(o)))) fail('Écris une seule relation par ligne.');
      return { t: 'chain', items, ops };
    }
    return l;
  }
  function setexpr() {
    let n = setterm();
    while (isOp(peek(), '∪')) { p++; n = { t: 'setop', op: '∪', l: n, r: setterm() }; }
    return n;
  }
  function setterm() {
    let n = sum();
    while (isOp(peek(), '∩') || isOp(peek(), '∖')) { const op = toks[p++].s; n = { t: 'setop', op, l: n, r: sum() }; }
    return n;
  }
  function interval(open) {
    const lo = sum();
    expect(';', 'Sépare les deux bornes par « ; ».');
    const hi = sum();
    const c = peek();
    if (!(isOp(c, ']') || isOp(c, '['))) fail("Ferme l'intervalle avec ] ou [.");
    p++;
    return { t: 'set', kind: 'interval', lo, hi, loOpen: open, hiOpen: c.s === '[' };
  }
  function braces() {
    if (isOp(peek(), '}')) { p++; return { t: 'set', kind: 'finite', items: [] }; }
    const first = formula();
    if (isOp(peek(), '|')) {
      p++;
      const cond = formula();
      expect('}', "Une accolade n'est pas fermée.");
      return { t: 'set', kind: 'builder', head: first, cond };
    }
    const items = [first];
    while (isOp(peek(), ';')) { p++; items.push(formula()); }
    expect('}', "Une accolade n'est pas fermée. Sépare les éléments par « ; ».");
    return { t: 'set', kind: 'finite', items };
  }
  function sum() {
    let n = term();
    while (isOp(peek(), '+') || isOp(peek(), '-')) {
      const op = toks[p++].s;
      n = { t: 'bin', op, l: n, r: term() };
    }
    return n;
  }
  const startsFactor = (t) => t && ((t.k === 'name') || (t.k === 'op' && ['(', '√', '□'].includes(t.s)));
  function term() {
    let n = unary();
    for (;;) {
      const t = peek();
      if (isOp(t, '×') || isOp(t, '÷')) {
        p++;
        n = { t: 'bin', op: t.s, l: n, r: unary(), implicit: false };
      } else if (startsFactor(t)) {
        n = { t: 'bin', op: '×', l: n, r: fraction(), implicit: true };
      } else return n;
    }
  }
  function unary() {
    if (isOp(peek(), '-')) { p++; return { t: 'neg', e: unary() }; }
    if (isOp(peek(), '+')) { p++; return unary(); }
    return fraction();
  }
  function fraction() {
    let n = power();
    while (isOp(peek(), '/')) { p++; n = { t: 'frac', n, d: power() }; }
    return n;
  }
  function power() {
    const b = atom();
    if (!isOp(peek(), '^')) return b;
    p++;
    if (!peek()) fail('Il manque l\'exposant.');
    const e = isOp(peek(), '-') ? (p++, { t: 'neg', e: atom() }) : atom();
    if (isOp(peek(), '^')) fail('Mets l\'exposant entre parenthèses : x^(a^b).');
    return { t: 'pow', b, e };
  }
  const primes = (node) => {
    let n = 0;
    while (isOp(peek(), "'")) { p++; n++; }
    return n ? { t: 'deriv', e: node, v: dvar, n } : node;
  };
  function args(name) {
    expect('(', `Il faut une parenthèse après ${name}.`);
    const out = [sum()];
    while (isOp(peek(), ',')) { p++; out.push(sum()); }
    expect(')', 'Une parenthèse n\'est pas fermée.');
    return out;
  }
  function call(name) {
    const at = p - 1;
    // log_2(x), log_10(x), log_(1/3)(x): the logarithm in base a (step U1).
    if (name === 'log' && isOp(peek(), '_')) {
      p++;
      const s = toks[p];
      if (!s) fail('Il manque la base du logarithme.');
      let base;
      if (isOp(s, '(')) {
        p++;
        base = { t: 'paren', e: sum() };
        expect(')', 'Une parenthèse n\'est pas fermée.');
      } else if (s.k === 'num') {
        p++;
        base = { t: 'num', s: s.s, v: Q.fromDecimal(s.s.replace('.', ',')) };
      } else if (s.k === 'name' && !FUNCS.includes(s.s)) {
        p++;
        base = s.s === 'e' ? { t: 'const', name: 'e' } : { t: 'sym', name: s.s };
      } else fail('Écris la base du logarithme : log_2(x).');
      let arg;
      if (isOp(peek(), '(')) {
        p++;
        arg = sum();
        expect(')', 'Une parenthèse n\'est pas fermée.');
      } else arg = bareArg('log').args[0];
      return primes({ t: 'fn', name: 'logb', args: [base, arg] });
    }
    if (name === 'd') {
      const a = args('d');
      if (a.length > 3) fail('d(f, x) prend au plus trois arguments.', at);
      const v = a[1] ? a[1] : null;
      if (v && (v.t !== 'sym' || v.sub)) fail('Dans d(f, x), le 2e argument est la variable.', at);
      const n = a[2] ? a[2] : null;
      if (n && (n.t !== 'num' || !n.v.isInt() || n.v.n < 1)) fail('Dans d(f, x, n), n est un entier ≥ 1.', at);
      return primes({ t: 'deriv', e: a[0], v: v ? v.name : dvar, n: n ? n.v.n : 1 });
    }
    if (name === 'root') {
      const a = args('root');
      if (a.length !== 2) fail('Écris root(3, x) pour la racine cubique de x.', at);
      return primes({ t: 'root', n: a[0], e: a[1] });
    }
    if (isOp(peek(), '^')) {
      p++;
      if (isOp(peek(), '-') || (isOp(peek(), '(') && isOp(peek(1), '-'))) fail(`Pour la fonction réciproque, écris arc${name.replace(/^arc/, '')} (pas ${name}^(-1)).`, at);
      const e = atom();
      const inner = isOp(peek(), '(') ? callArgs(name) : bareArg(name);
      return { t: 'pow', b: inner, e };
    }
    return isOp(peek(), '(') ? primes(callArgs(name)) : bareArg(name);
  }
  function callArgs(name) {
    const a = args(name);
    if (name === 'sqrt') { if (a.length !== 1) fail('sqrt prend un seul argument.'); return { t: 'sqrt', e: { t: 'paren', e: a[0] } }; }
    if (name === 'abs') { if (a.length !== 1) fail('abs prend un seul argument.'); return { t: 'abs', e: a[0] }; }
    if (a.length !== 1 && !userFuncs.has(name)) fail(`${name} prend un seul argument.`);
    return { t: 'fn', name, args: a };
  }
  // sin x: only a single number or letter, never more.
  function bareArg(name) {
    const t = peek();
    if (!t || !(t.k === 'num' || (t.k === 'name' && !FUNCS.includes(t.s)))) fail(`Écris ${name}(…) avec des parenthèses.`);
    const arg = atom();
    const nx = peek();
    if (isOp(nx, '^') || startsFactor(nx) || isOp(nx, '/') || isOp(nx, '_')) fail(`Écris ${name}(…) avec des parenthèses.`);
    if (name === 'sqrt') return { t: 'sqrt', e: arg };
    if (name === 'abs') return { t: 'abs', e: arg };
    return { t: 'fn', name, args: [arg] };
  }
  function atom() {
    const t = toks[p++];
    if (!t) fail('L\'expression est incomplète.', p - 1);
    if (t.k === 'num') {
      const s = t.s.replace('.', ',');
      return { t: 'num', s, v: Q.fromDecimal(s) };
    }
    if (t.k === 'op') {
      if (t.s === '(') {
        const e = formula();
        expect(')', 'Une parenthèse n\'est pas fermée.');
        return primes({ t: 'paren', e });
      }
      if (t.s === '|') {
        const e = sum();
        expect('|', 'Une barre de valeur absolue n\'est pas fermée.');
        return primes({ t: 'abs', e });
      }
      if (t.s === '√') {
        if (!peek()) fail('Il manque ce qui est sous la racine.');
        return { t: 'sqrt', e: atom() };
      }
      if (t.s === '□') return { t: 'blank', id: blanks++ };
      if (t.s === '[' || t.s === ']') return interval(t.s === ']');
      if (t.s === '{') return braces();
      if (SET_NAMES.has(t.s)) return { t: 'set', kind: 'named', name: t.s };
      if (t.s === ')') fail('Il y a une parenthèse fermante de trop.', p - 1);
      fail(`Il manque quelque chose avant « ${t.s} ».`, p - 1);
    }
    const name = t.s;
    if (name === 'pi' || name === 'π') return { t: 'const', name: 'pi' };
    if (name === '∞') return { t: 'const', name: 'inf' };
    if (name === 'e') return { t: 'const', name: 'e' };
    if (name === 'i' && opts.complex) return { t: 'const', name: 'i' };
    if (FUNCS.includes(name) || SHORT_FUNCS.includes(name)) {
      if (SHORT_FUNCS.includes(name) && !isOp(peek(), '(')) return symbol(name);
      return call(name);
    }
    if (userFuncs.has(name) && (isOp(peek(), '(') || isOp(peek(), "'"))) {
      let n = 0;
      while (isOp(peek(), "'")) { p++; n++; }
      const node = { t: 'fn', name, args: args(name) };
      return n ? { t: 'deriv', e: node, v: dvar, n } : node;
    }
    return symbol(name);
  }
  function symbol(name) {
    let node = { t: 'sym', name };
    if (isOp(peek(), '_')) {
      p++;
      const s = peek();
      if (!s) fail('Il manque l\'indice.');
      if (isOp(s, '(')) { p++; node.sub = sum(); expect(')', 'Une parenthèse n\'est pas fermée.'); node.sub = { t: 'paren', e: node.sub }; } else {
        p++;
        if (s.k === 'num') node.sub = { t: 'num', s: s.s, v: Q.fromDecimal(s.s.replace('.', ',')) };
        else if (s.k === 'name') node.sub = { t: 'sym', name: s.s };
        else fail('Indice illisible.');
      }
      node = { ...node };
    }
    return primes(node);
  }

  if (!toks.length) throw new ParseError('Rien à lire.', 0);
  const node = list();
  if (p < toks.length) {
    const t = toks[p];
    if (isOp(t, ')')) fail('Il y a une parenthèse fermante de trop.');
    if (isOp(t, ',')) fail('Pour un nombre décimal, écris la virgule entre deux chiffres.');
    fail(`Je ne m'attendais pas à « ${t.s} ».`);
  }
  return node;
}

export function tryParse(text, opts) {
  try { return parse(text, opts); } catch { return null; }
}

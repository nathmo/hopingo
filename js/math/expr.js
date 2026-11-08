// Expressions: parsing from keypad text, exact evaluation, tree edits, rendering.
//
// Keypad text uses these characters: digits , / + - × ÷ ( ) ^ √
// "/" is the fraction bar and binds tighter than every operator, so
// "2/3+1/4×8/5" reads as (2/3) + (1/4) × (8/5), as on paper.
//
// Nodes:
//   {t:'num', s:'12', v:Q}           literal number as written
//   {t:'frac', n:Node, d:Node}       fraction bar
//   {t:'bin', op:'+-×÷', l, r}
//   {t:'neg', e}                     unary minus
//   {t:'paren', e}
//   {t:'pow', b, e}
//   {t:'sqrt', e}

import { Q } from './rational.js';

export class ParseError extends Error {}

const OPS = '+-×÷';

export function normalizeInput(str) {
  return String(str)
    .replace(/\s+/g, '')
    .replace(/[−–]/g, '-')
    .replace(/\*/g, '×')
    .replace(/:/g, '÷')
    .replace(/\./g, ',');
}

export function parse(input) {
  const s = normalizeInput(input);
  let i = 0;
  const peek = () => s[i];
  const eat = (c) => {
    if (s[i] === c) { i++; return true; }
    return false;
  };

  function expr() {
    let node = term();
    while (peek() === '+' || peek() === '-') {
      const op = s[i++];
      node = { t: 'bin', op, l: node, r: term() };
    }
    return node;
  }
  function term() {
    let node = unary();
    while (peek() === '×' || peek() === '÷') {
      const op = s[i++];
      node = { t: 'bin', op, l: node, r: unary() };
    }
    return node;
  }
  function unary() {
    if (eat('-')) return { t: 'neg', e: unary() };
    if (eat('+')) return unary(); // "+12" is 12
    return frac();
  }
  function frac() {
    const n = power();
    if (eat('/')) return { t: 'frac', n, d: power() };
    return n;
  }
  function power() {
    const b = atom();
    if (eat('^')) {
      const e = peek() === '-' ? (i++, { t: 'neg', e: atom() }) : atom();
      return { t: 'pow', b, e };
    }
    return b;
  }
  function atom() {
    const c = peek();
    if (c === undefined) throw new ParseError('Expression incomplète');
    if (eat('(')) {
      const e = expr();
      if (!eat(')')) throw new ParseError('Parenthèse non fermée');
      return { t: 'paren', e };
    }
    if (eat('√')) return { t: 'sqrt', e: atom() };
    const m = /^\d+(,\d+)?/.exec(s.slice(i));
    if (!m) throw new ParseError(`Symbole inattendu : ${c}`);
    i += m[0].length;
    return { t: 'num', s: m[0], v: Q.fromDecimal(m[0]) };
  }

  if (!s.length) throw new ParseError('Rien à lire');
  const node = expr();
  if (i < s.length) throw new ParseError(`Symbole inattendu : ${s[i]}`);
  return node;
}

export function tryParse(input) {
  try { return parse(input); } catch { return null; }
}

// ---------- evaluation ----------

export function evaluate(node) {
  switch (node.t) {
    case 'num': return node.v;
    case 'frac': return evaluate(node.n).div(evaluate(node.d));
    case 'paren': return evaluate(node.e);
    case 'neg': return evaluate(node.e).neg();
    case 'pow': {
      const e = evaluate(node.e);
      if (!e.isInt()) throw new RangeError('Exposant non entier');
      // (√7)² = 7 even though √7 itself is not a fraction.
      const b = stripParen(node.b);
      if (b.t === 'sqrt' && e.n % 2 === 0 && e.n > 0 && !tryEvaluate(b)) {
        const r = evaluate(b.e);
        if (r.n < 0) throw new RangeError('Racine d’un nombre négatif');
        return r.pow(e.n / 2);
      }
      return evaluate(node.b).pow(e.n);
    }
    case 'sqrt': {
      const r = evaluate(node.e).sqrt();
      if (!r) throw new RangeError('Racine non exacte');
      return r;
    }
    case 'bin': {
      // √2 × √8 = √16 = 4: products and quotients of roots, when exact.
      const sl = stripParen(node.l);
      const sr = stripParen(node.r);
      if ((node.op === '×' || node.op === '÷') && sl.t === 'sqrt' && sr.t === 'sqrt' && !(tryEvaluate(sl) && tryEvaluate(sr))) {
        const x = evaluate(sl.e);
        const y = evaluate(sr.e);
        if (x.n < 0 || y.n < 0) throw new RangeError('Racine d’un nombre négatif');
        const r = (node.op === '×' ? x.mul(y) : x.div(y)).sqrt();
        if (!r) throw new RangeError('Racine non exacte');
        return r;
      }
      const a = evaluate(node.l);
      const b = evaluate(node.r);
      if (node.op === '+') return a.add(b);
      if (node.op === '-') return a.sub(b);
      if (node.op === '×') return a.mul(b);
      return a.div(b);
    }
  }
  throw new Error(`Nœud inconnu ${node.t}`);
}

export function tryEvaluate(node) {
  try { return evaluate(node); } catch { return null; }
}

// ---------- building ----------

export const num = (k) => ({ t: 'num', s: String(k), v: new Q(k) });

// A literal for a value, written as an integer or a fraction.
export function lit(value, { forceFraction = false } = {}) {
  const v = Q.of(value);
  const pos = v.n < 0 ? v.neg() : v;
  const node = pos.isInt() && !forceFraction ? num(pos.n) : { t: 'frac', n: num(pos.n), d: num(pos.d) };
  return v.n < 0 ? { t: 'neg', e: node } : node;
}

// A fraction literal written exactly as n/d, without simplifying.
export const fracLit = (n, d) => ({ t: 'frac', n: num(n), d: num(d) });

// ---------- inspection ----------

// Literal number as written: integer, decimal, or integer/integer fraction,
// possibly negated or in parentheses.
export function isLiteral(node) {
  if (node.t === 'num') return true;
  if (node.t === 'frac') return node.n.t === 'num' && node.d.t === 'num' && node.n.v.isInt() && node.d.v.isInt();
  if (node.t === 'paren') return isLiteral(node.e);
  // −(−3) is still an operation: the opposite of a negative number.
  if (node.t === 'neg') return stripParen(node.e).t !== 'neg' && isLiteral(node.e);
  return false;
}

// √2 × √8 or (√7)²: roots that are not whole numbers, combined by a rule.
export function isRootRule(node) {
  const plainRoot = (n) => n.t === 'sqrt' && isLiteral(n.e);
  if (node.t === 'bin' && (node.op === '×' || node.op === '÷')) {
    const l = stripParen(node.l);
    const r = stripParen(node.r);
    return plainRoot(l) && plainRoot(r) && !(tryEvaluate(l) && tryEvaluate(r)) && tryEvaluate(node) !== null;
  }
  if (node.t === 'pow') {
    const b = stripParen(node.b);
    return plainRoot(b) && !tryEvaluate(b) && tryEvaluate(node) !== null;
  }
  return false;
}

// A node the solver computes in one go: an operation on plain numbers,
// a power or a root of a plain number, or the opposite of a negative number.
export function isComputable(node) {
  if (isRootRule(node)) return true;
  switch (node.t) {
    case 'bin': return isLiteral(node.l) && isLiteral(node.r);
    case 'pow': return isLiteral(node.b) && isLiteral(node.e) && Q.of(tryEvaluate(node.e) ?? new Q(1, 2)).isInt() && tryEvaluate(node) !== null;
    case 'sqrt': return isLiteral(node.e) && tryEvaluate(node) !== null;
    case 'neg': return stripParen(node.e).t === 'neg' && isLiteral(stripParen(node.e));
    default: return false;
  }
}

// How a literal is written: {n, d, int, neg}. Decimals are read as their value.
export function litParts(node) {
  if (node.t === 'paren') return litParts(node.e);
  if (node.t === 'neg') {
    const p = litParts(node.e);
    return { ...p, n: -p.n, neg: !p.neg };
  }
  if (node.t === 'num') {
    return node.v.isInt()
      ? { n: node.v.n, d: 1, int: true, neg: false }
      : { n: node.v.n, d: node.v.d, int: false, neg: false, decimal: true, s: node.s };
  }
  if (node.t === 'frac') return { n: node.n.v.n, d: node.d.v.n, int: false, neg: false };
  return null;
}

export function isIrreducible(node) {
  const p = litParts(node);
  if (!p) return false;
  if (p.int) return true;
  const v = new Q(p.n, p.d);
  return v.d === p.d && v.d !== 1;
}

// Final answers: one literal, no operations left.
export const isFinal = (node) => isLiteral(node);

export function children(node) {
  switch (node.t) {
    case 'bin': return [['l', node.l], ['r', node.r]];
    case 'frac': return [['n', node.n], ['d', node.d]];
    case 'pow': return [['b', node.b], ['e', node.e]];
    case 'neg': case 'paren': case 'sqrt': return [['e', node.e]];
    default: return [];
  }
}

// Visits every node with its path (array of child keys).
export function walk(node, fn, path = []) {
  fn(node, path);
  for (const [k, c] of children(node)) walk(c, fn, [...path, k]);
}

export function getAt(node, path) {
  return path.reduce((n, k) => n[k], node);
}

export function replaceAt(node, path, repl) {
  if (!path.length) return repl;
  const [k, ...rest] = path;
  return { ...node, [k]: replaceAt(node[k], rest, repl) };
}

// Removes parentheses that no longer group anything: "(3/4)" -> "3/4".
export function tidy(node) {
  const out = { ...node };
  for (const [k, c] of children(node)) out[k] = tidy(c);
  if (out.t === 'paren') {
    const e = out.e;
    if (e.t === 'paren') return e;
    if (e.t === 'num' || e.t === 'frac') return e;
  }
  // A power of anything but a plain number needs its brackets: (3/4)², (−2)³.
  if (out.t === 'pow' && out.b.t !== 'num' && out.b.t !== 'paren') out.b = { t: 'paren', e: out.b };
  // −−3 is written −(−3).
  if (out.t === 'neg' && out.e.t === 'neg') out.e = { t: 'paren', e: out.e };
  return out;
}

// Operators in the expression, e.g. {'+': 1, '×': 2}.
export function opCounts(node) {
  const c = {};
  walk(node, (n) => {
    if (n.t === 'bin') c[n.op] = (c[n.op] || 0) + 1;
    if (n.t === 'pow') c['^'] = (c['^'] || 0) + 1;
    if (n.t === 'sqrt') c['√'] = (c['√'] || 0) + 1;
  });
  return c;
}

// The operation to do next: the first operation, left to right, whose
// operands are already plain numbers. Priority and parentheses are respected
// because the tree already encodes them.
export function nextOperationPath(node) {
  let found = null;
  walk(node, (n, path) => {
    if (found) return;
    if (isComputable(n)) found = path;
  });
  return found;
}

export function computablePaths(node) {
  const out = [];
  walk(node, (n, path) => {
    if (isComputable(n)) out.push(path);
  });
  return out;
}

// ---------- printing ----------

function needsGroup(node) {
  return !(node.t === 'num' || node.t === 'paren' || node.t === 'frac' || node.t === 'sqrt' || node.t === 'pow');
}

// Linear keypad text, parseable again.
export function print(node) {
  switch (node.t) {
    case 'num': return node.s;
    case 'frac': {
      const n = node.n.t === 'num' ? print(node.n) : `(${print(stripParen(node.n))})`;
      const d = node.d.t === 'num' ? print(node.d) : `(${print(stripParen(node.d))})`;
      return `${n}/${d}`;
    }
    case 'paren': return `(${print(node.e)})`;
    case 'neg': return `-${needsGroup(node.e) && node.e.t !== 'neg' ? `(${print(node.e)})` : print(node.e)}`;
    case 'pow': {
      const b = node.b.t === 'num' || node.b.t === 'paren' ? print(node.b) : `(${print(node.b)})`;
      const e = node.e.t === 'num' || node.e.t === 'paren' || (node.e.t === 'neg' && node.e.e.t === 'num') ? print(node.e) : `(${print(node.e)})`;
      return `${b}^${e}`;
    }
    case 'sqrt': return node.e.t === 'num' || node.e.t === 'paren' ? `√${print(node.e)}` : `√(${print(node.e)})`;
    case 'bin': {
      const r = node.r.t === 'neg' ? `(${print(node.r)})` : print(node.r);
      return `${print(node.l)}${node.op}${r}`;
    }
  }
  return '?';
}

const stripParen = (n) => (n.t === 'paren' ? n.e : n);

// Fully bracketed structure, to tell trees apart even when print() can't.
export function sig(node) {
  if (node.t === 'num') return node.s;
  if (node.t === 'bin') return `[${sig(node.l)}${node.op}${sig(node.r)}]`;
  return `${node.t}(${children(node).map(([, c]) => sig(c)).join(',')})`;
}

// Human text with spaced operators, for review files and plain-text feedback.
export function text(node) {
  return print(node)
    .replace(/([+×÷])/g, ' $1 ')
    .replace(/([^\s(^-])-/g, '$1 − ')
    .replace(/-/g, '−');
}

// ---------- HTML rendering ----------

const OP_SHOW = { '+': '+', '-': '−', '×': '×', '÷': '÷' };

export function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

// opts.tap: render operators as buttons carrying their path (tap-then-solve).
export function render(node, opts = {}, path = []) {
  const r = (child, key) => render(child, opts, [...path, key]);
  switch (node.t) {
    case 'blank':
      return `<span class="m-blank" data-blank="${node.id}"></span>`;
    case 'num':
      return `<span class="m-num${opts.fresh && node.fresh ? ' m-fresh' : ''}">${esc(node.s)}</span>`;
    case 'frac':
      return `<span class="m-frac"><span class="m-n">${r(stripParen(node.n), node.n.t === 'paren' ? 'n.e' : 'n')}</span><span class="m-d">${r(stripParen(node.d), node.d.t === 'paren' ? 'd.e' : 'd')}</span></span>`;
    case 'paren':
      return `<span class="m-par">(</span>${r(node.e, 'e')}<span class="m-par">)</span>`;
    case 'neg': {
      // In tap mode, −(−3) is an operation to tap like the others.
      const minus = opts.tap && isComputable(node)
        ? `<button class="m-op m-neg m-tap" data-path="${path.join('.')}">−</button>`
        : '<span class="m-op m-neg">−</span>';
      return `${minus}${r(node.e, 'e')}`;
    }
    case 'pow': {
      const sup = `<sup class="m-sup">${r(node.e, 'e')}</sup>`;
      const exp = opts.tap ? `<button class="m-tap m-tap-pow" data-path="${path.join('.')}">${sup}</button>` : sup;
      return `${r(node.b, 'b')}${exp}`;
    }
    case 'sqrt': {
      const rad = opts.tap ? `<button class="m-rad m-tap m-tap-rad" data-path="${path.join('.')}">√</button>` : '<span class="m-rad">√</span>';
      return `<span class="m-sqrt">${rad}<span class="m-under">${r(stripParen(node.e), node.e.t === 'paren' ? 'e.e' : 'e')}</span><!--/u--></span>`;
    }
    case 'bin': {
      const op = OP_SHOW[node.op];
      const opHtml = opts.tap
        ? `<button class="m-op m-tap" data-path="${path.join('.')}">${op}</button>`
        : `<span class="m-op">${op}</span>`;
      const right = node.r.t === 'neg' ? `<span class="m-par">(</span>${r(node.r, 'r')}<span class="m-par">)</span>` : r(node.r, 'r');
      return `${r(node.l, 'l')}${opHtml}${right}`;
    }
  }
  return '';
}

// Paths in rendered tap buttons may contain "n.e" segments; split on dots.
export const parsePath = (s) => (s ? s.split('.') : []);

// Renders a value as a fraction or integer.
export const renderValue = (v, opts) => render(lit(v, opts));

export const renderText = (str) => {
  const node = tryParse(str);
  return node ? render(node) : esc(str);
};

export { OPS, stripParen };

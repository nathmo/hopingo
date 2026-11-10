// Exact numbers in final form for the calculus judges (step U2): the value
// of an integral or a limit, written as a sum of terms q·A where q is a
// fraction and A a product of « atoms » — π, e, eᵠ, √m, ln q, arctan q,
// arcsin q… — each product once, and at most one plain fraction:
// 2π + ln(4/5) − 4arctan(2), (2√2 − 1)/3, e − 1, 3/4, ln(3)/2.
//
//   closedNumber(node) → true | false (not a number yet, keep going) |
//     message (right but to tidy: an atom to compute, terms to group)
// It extends exactForm (js/cas/exactform.js), which handles radicals and π.

import { Q } from '../math/rational.js';
import { stripParen, contains, numValue, canonFn } from './ast.js';
import { exactForm } from './exactform.js';
import { exactValue } from './normal.js';
import { toText } from './print.js';
import { evalFloat } from './numeric.js';

const literal = (n) => { n = stripParen(n); if (n.t === 'neg') n = stripParen(n.e); return n.t === 'num' || (n.t === 'frac' && stripParen(n.n).t === 'num' && stripParen(n.d).t === 'num'); };
const qOf = (n) => (literal(n) ? numValue(stripParen(n)) : null);
const squarefree = (m) => { for (let f = 2; f * f <= m; f++) if (m % (f * f) === 0) return false; return true; };

// Values of the arc functions that must be written out.
const R2 = Math.SQRT2 / 2;
const R3 = Math.sqrt(3);
const NICE = {
  arctan: [0, 1, -1, R3, -R3, 1 / R3, -1 / R3], arcsin: [0, 1, -1, 0.5, -0.5, R2, -R2, R3 / 2, -R3 / 2],
  arccos: [0, 1, -1, 0.5, -0.5, R2, -R2, R3 / 2, -R3 / 2], argsh: [0], argth: [0], sinh: [0], cosh: [0], tanh: [0],
  sin: [], cos: [], tan: [],
};

// The key of an atom, a message, or null (not an atom).
function atomKey(x) {
  x = stripParen(x);
  if (x.t === 'const' && (x.name === 'pi' || x.name === 'e')) return x.name;
  if (x.t === 'sqrt' || x.t === 'root') {
    const q = qOf(x.e);
    if (!q || q.d !== 1 || q.n < 2) return q && q.d !== 1 ? 'Écris la racine sans fraction dedans.' : null;
    if (x.t === 'sqrt') {
      const r = Math.round(Math.sqrt(q.n));
      if (r * r === q.n) return `Calcule la racine : √${q.n} = ${r}.`;
      if (!squarefree(q.n)) return 'Simplifie la racine : sors les carrés (√8 = 2√2).';
    }
    return toText(x);
  }
  if (x.t === 'pow') {
    const b = stripParen(x.b);
    const k = qOf(x.e);
    if (b.t === 'const' && b.name === 'e') {
      if (!k) return null;
      if (k.n === 0) return 'e⁰ = 1.';
      return toText(x);
    }
    if (k && k.isInt() && k.n >= 2) {
      const inner = atomKey(b);
      if (inner === null || inner.endsWith('.')) return inner;
      return `${inner}^${k.n}`;
    }
    return null;
  }
  if (x.t === 'fn') {
    const name = canonFn(x.name);
    if (x.args.length !== 1) return null;
    const a = stripParen(x.args[0]);
    if (name === 'ln') {
      const q = qOf(a);
      if (!q) {
        if (a.t === 'const' && a.name === 'e') return 'ln e = 1.';
        // ln((e + 1)/(e − 1)), ln(1 + √2): the logarithm of an exact number.
        const free = !contains(a, (y) => ['sym', 'int', 'bracket', 'lim', 'deriv', 'eps', 'side', 'float'].includes(y.t));
        return free && evalFloat(a, {}) > 0 ? toText(x) : null;
      }
      if (q.n <= 0) return null;
      if (q.eq(1)) return 'ln 1 = 0.';
      return `ln(${q})`;
    }
    if (name === 'exp') {
      const q = qOf(a);
      return q ? (q.n === 0 ? 'e⁰ = 1.' : `e^${q}`) : null;
    }
    if (name in NICE) {
      const q = qOf(a);
      const ok = q || closedNumber(a) === true;
      if (!ok || name === 'sin' || name === 'cos' || name === 'tan') return null;
      const y = evalFloat(a, {});
      if (NICE[name].some((z) => Math.abs(z - y) < 1e-12)) return `Calcule ${toText(x)} : c'est une valeur connue.`;
      return toText(x);
    }
  }
  return null;
}

// One term: {q, key} or a message or null.
function termOf(t) {
  let x = stripParen(t);
  let sign = 1;
  while (x.t === 'neg') { sign = -sign; x = stripParen(x.e); }
  const ups = [];
  const downs = [];
  const walk = (n, below) => {
    n = stripParen(n);
    if (n.t === 'bin' && n.op === '×') { walk(n.l, below); walk(n.r, below); return; }
    if (n.t === 'frac') { walk(n.n, below); walk(n.d, !below); return; }
    (below ? downs : ups).push(n);
  };
  walk(x, false);
  let q = new Q(sign);
  let nums = 0;
  const keys = [];
  for (const [list, below] of [[ups, false], [downs, true]]) {
    for (const f of list) {
      const v = qOf(f);
      if (v) {
        if (!(v.eq(1) && !below && list.length > 1)) nums++;
        if (v.n === 0) return below ? null : 'Un produit par 0 vaut 0.';
        q = below ? q.div(v) : q.mul(v);
        continue;
      }
      const k = atomKey(f);
      if (k === null) return null;
      if (k.endsWith('.')) return k;
      keys.push(below ? `/${k}` : k);
    }
  }
  if (nums > 2 || (nums === 2 && !(ups.some((f) => qOf(f)) && downs.length === 1 && qOf(downs[0])))) return 'Multiplie les nombres entre eux.';
  return { q, key: keys.sort().join('·') };
}

function sumTerms(n, sign = 1, out = []) {
  n = stripParen(n);
  if (n.t === 'bin' && (n.op === '+' || n.op === '-')) {
    sumTerms(n.l, sign, out);
    sumTerms(n.r, n.op === '-' ? -sign : sign, out);
  } else out.push(sign < 0 ? { t: 'neg', e: n } : n);
  return out;
}

export function closedNumber(node) {
  if (contains(node, (x) => ['sym', 'int', 'bracket', 'lim', 'deriv', 'eps', 'side', 'float'].includes(x.t))) return false;
  if (literal(node)) {
    let f = stripParen(node);
    if (f.t === 'neg') f = stripParen(f.e);
    if (f.t === 'frac') {
      const a = numValue(stripParen(f.n)).n;
      const b = numValue(stripParen(f.d)).n;
      const g = (x, y) => (y ? g(y, x % y) : Math.abs(x));
      if (b === 1 || g(a, b) !== 1) return 'Simplifie la fraction.';
    }
    return true;
  }
  const q = exactValue(node);
  if (q) return false;
  const ex = exactForm(node);
  if (ex === true || typeof ex === 'string') return ex;
  // A sum over one denominator: (2√2 − 1)/3.
  let n = stripParen(node);
  let sign = false;
  if (n.t === 'neg') { sign = true; n = stripParen(n.e); }
  let body = n;
  if (n.t === 'frac' && qOf(n.d) && stripParen(n.n).t === 'bin' && ['+', '-'].includes(stripParen(n.n).op)) body = n.n;
  const ts = sumTerms(body).map(termOf);
  for (const t of ts) if (!t || typeof t === 'string') return t ?? false;
  const keys = new Set();
  for (const t of ts) {
    if (keys.has(t.key)) return t.key ? 'Regroupe les termes semblables.' : 'Additionne les nombres entre eux.';
    keys.add(t.key);
  }
  void sign;
  return true;
}

// Exact numbers in final form (step U1b, G3): integers, reduced fractions,
// c·√m with m squarefree, c·π, and sums of such terms, each kind once,
// possibly over one denominator: −(√2 + √6)/4, 3√3/2, 2π/3, 1 − √2.
//   exactForm(node) → true | false (not a number written out) | message
// trigForm(node, v) → true | false: a single trigonometric function of the
// variable, with a sign and a coefficient (−cos x, 2 sin x), or an exact number.

import { stripParen, contains } from './ast.js';
import { numValue } from './ast.js';

const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));

function intOf(n) {
  const q = numValue(stripParen(n));
  return q && q.d === 1 ? q.n : null;
}

function squarefree(m) {
  for (let f = 2; f * f <= m; f++) if (m % (f * f) === 0) return false;
  return true;
}

// The radical or π of a term: '√m', 'π', or a message, or null.
function kindOf(x) {
  x = stripParen(x);
  if (x.t === 'const' && x.name === 'pi') return 'π';
  if (x.t === 'sqrt') {
    const e = stripParen(x.e);
    const m = intOf(e);
    if (m === null) return e.t === 'frac' ? 'Écris la racine sans fraction dedans : √(a/b) = √a/√b, puis enlève la racine du dénominateur.' : null;
    if (m < 0) return null;
    const r = Math.round(Math.sqrt(m));
    if (r * r === m) return `Calcule la racine : √${m} = ${r}.`;
    if (!squarefree(m)) return 'Simplifie la racine : sors les carrés (√8 = 2√2).';
    return `√${m}`;
  }
  return null;
}

const isKind = (k) => k === 'π' || /^√\d+$/.test(k ?? '');

// One term: {c, d, kind} with c, d whole numbers, or a message, or null.
function termOf(t) {
  let x = stripParen(t);
  let sign = 1;
  if (x.t === 'neg') { sign = -1; x = stripParen(x.e); }
  const q = numValue(x);
  if (q) {
    if (x.t === 'frac' && gcd(q.n, q.d) === 1 && intOf(x.d) !== q.d) return 'Simplifie la fraction.';
    return { c: sign * q.n, d: q.d, kind: '1' };
  }
  if (x.t === 'frac') {
    const d = intOf(x.d);
    if (d === null) return contains(x.d, (y) => y.t === 'sqrt') ? 'Enlève la racine du dénominateur : multiplie en haut et en bas par cette racine.' : null;
    const top = termOf(x.n);
    if (!top || typeof top === 'string') return top;
    if (top.d !== 1) return null;
    if (gcd(top.c, d) !== 1) return 'Simplifie la fraction.';
    if (d === 1) return 'Enlève le « /1 ».';
    return { c: sign * top.c, d, kind: top.kind };
  }
  if (x.t === 'bin' && x.op === '×') {
    const c = intOf(x.l);
    if (c === null) return null;
    if (c === 1 || c === 0) return 'Enlève le facteur 1 ou 0.';
    const r = stripParen(x.r);
    if (r.t === 'frac') {
      // 4π/3 is read 4·(π/3); 2√2/3 is 2·(√2/3).
      const d = intOf(r.d);
      const k = kindOf(r.n);
      if (d === null || !isKind(k)) return isKind(k) ? null : k;
      if (gcd(c, d) !== 1) return 'Simplifie la fraction.';
      return { c: sign * c, d, kind: k };
    }
    const k = kindOf(x.r);
    if (!isKind(k)) return k;
    return { c: sign * c, d: 1, kind: k };
  }
  const k = kindOf(x);
  if (!isKind(k)) return k;
  return { c: sign, d: 1, kind: k };
}

// Terms of a sum with their signs.
function terms(n, sign = 1, out = []) {
  n = stripParen(n);
  if (n.t === 'bin' && (n.op === '+' || n.op === '-')) {
    terms(n.l, sign, out);
    terms(n.r, n.op === '-' ? -sign : sign, out);
  } else out.push(sign < 0 ? { t: 'neg', e: n } : n);
  return out;
}

function sumOf(n) {
  const ts = terms(n).map(termOf);
  for (const t of ts) if (!t || typeof t === 'string') return t;
  const kinds = new Set();
  for (const t of ts) {
    if (kinds.has(t.kind)) return 'Regroupe les termes semblables.';
    kinds.add(t.kind);
  }
  return ts;
}

export function exactForm(node) {
  if (contains(node, (x) => ['sym', 'fn', 'deriv', 'float', 'pow', 'abs', 'root'].includes(x.t))) return false;
  let n = stripParen(node);
  if (n.t === 'neg') n = stripParen(n.e);
  if (n.t === 'frac' && stripParen(n.n).t === 'bin' && ['+', '-'].includes(stripParen(n.n).op)) {
    const d = intOf(n.d);
    if (d === null) return contains(n.d, (y) => y.t === 'sqrt') ? 'Enlève la racine du dénominateur.' : false;
    const ts = sumOf(n.n);
    if (!Array.isArray(ts)) return ts ?? false;
    if (ts.some((t) => t.d !== 1)) return 'Écris une seule fraction.';
    if (ts.reduce((g, t) => gcd(g, t.c), d) !== 1) return 'Simplifie la fraction.';
    return true;
  }
  const ts = sumOf(n);
  if (!Array.isArray(ts)) return ts ?? false;
  return true;
}

const TRIG = new Set(['sin', 'cos', 'tan', 'cot']);
export function trigForm(node, v = 'x') {
  let n = stripParen(node);
  if (!contains(n, (x) => x.t === 'sym')) return exactForm(n) === true;
  if (n.t === 'neg') n = stripParen(n.e);
  if (n.t === 'bin' && n.op === '×' && intOf(n.l) !== null) n = stripParen(n.r);
  return n.t === 'fn' && TRIG.has(n.name) && stripParen(n.args[0]).t === 'sym' && stripParen(n.args[0]).name === v;
}

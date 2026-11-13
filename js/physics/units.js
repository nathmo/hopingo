// Units of measurement: names, dimensions, factors to SI.
//
// A unit is {f, d}: its factor to the SI unit of the same dimension, and
// its dimension, the exponents of the 7 base units [kg, m, s, K, A, mol, cd].
// 1 km/h = {f: 1/3,6, d: [0, 1, -1, 0, 0, 0, 0]}.
//
// Units are typed on the keypad as keys (« kg », « km/h » is km, / and h),
// or written in data as text: « J/(kg·K) », « m/s^2 », « m² », « kWh ».
// The bar takes the unit just before it and the unit just after it, as the
// keypad draws it (js/ui/keypad.js): J/kg·K is (J/kg)·K. Brackets group.

export const BASE = ['kg', 'm', 's', 'K', 'A', 'mol', 'cd'];
const ZERO = [0, 0, 0, 0, 0, 0, 0];

const dim = (o) => BASE.map((b) => o[b] || 0);
const U = {};
const PREFIXABLE = new Set();
const def = (name, f, d, { prefix = false } = {}) => {
  U[name] = { f, d: dim(d) };
  if (prefix) PREFIXABLE.add(name);
};

// Base units (the gram carries the prefixes of the kilogram).
def('g', 1e-3, { kg: 1 }, { prefix: true });
U.kg = { f: 1, d: dim({ kg: 1 }) };
def('m', 1, { m: 1 }, { prefix: true });
def('s', 1, { s: 1 }, { prefix: true });
def('K', 1, { K: 1 });
def('A', 1, { A: 1 }, { prefix: true });
def('mol', 1, { mol: 1 }, { prefix: true });
def('cd', 1, { cd: 1 });
// Derived SI units.
def('N', 1, { kg: 1, m: 1, s: -2 }, { prefix: true });
def('J', 1, { kg: 1, m: 2, s: -2 }, { prefix: true });
def('W', 1, { kg: 1, m: 2, s: -3 }, { prefix: true });
def('Pa', 1, { kg: 1, m: -1, s: -2 }, { prefix: true });
def('V', 1, { kg: 1, m: 2, s: -3, A: -1 }, { prefix: true });
def('C', 1, { A: 1, s: 1 }, { prefix: true });
def('Ω', 1, { kg: 1, m: 2, s: -3, A: -2 }, { prefix: true });
def('Hz', 1, { s: -1 }, { prefix: true });
// Everyday units.
def('L', 1e-3, { m: 3 }, { prefix: true });
def('t', 1e3, { kg: 1 });
def('min', 60, { s: 1 });
def('h', 3600, { s: 1 });
def('j', 86400, { s: 1 });
def('an', 3.15e7, { s: 1 });
def('Wh', 3600, { kg: 1, m: 2, s: -2 }, { prefix: true });
def('Ah', 3600, { A: 1, s: 1 }, { prefix: true });
def('ha', 1e4, { m: 2 });
def('bar', 1e5, { kg: 1, m: -1, s: -2 }, { prefix: true });
def('cal', 4.18, { kg: 1, m: 2, s: -2 }, { prefix: true });
// Temperatures: only differences are converted (1 °C of difference = 1 K).
def('°C', 1, { K: 1 });
// Non-metric units (data sheets of the teacher).
def('in', 0.0254, { m: 1 });
def('ft', 0.3048, { m: 1 });
def('mi', 1609, { m: 1 });
def('lb', 0.4536, { kg: 1 });
def('gal', 3.785e-3, { m: 3 });
def('hp', 746, { kg: 1, m: 2, s: -3 });
def('nd', 1852 / 3600, { m: 1, s: -1 });
// French names written out in data: 1 pouce, 1 pied.
U.pouce = U.in;
U.pouces = U.in;
U.pied = U.ft;
U.pieds = U.ft;

const PREFIX = { T: 1e12, G: 1e9, M: 1e6, k: 1e3, h: 1e2, da: 10, d: 0.1, c: 0.01, m: 1e-3, µ: 1e-6, μ: 1e-6, n: 1e-9 };

// The unit of one name, prefix included (« km », « mWh »), or null.
export function unitOf(name, { prefixes = true } = {}) {
  if (U[name]) return U[name];
  if (!prefixes) return null;
  for (const [p, f] of Object.entries(PREFIX)) {
    if (name.startsWith(p) && PREFIXABLE.has(name.slice(p.length))) {
      const u = U[name.slice(p.length)];
      return { f: f * u.f, d: u.d };
    }
  }
  return null;
}

export const isUnitName = (name, opts) => !!unitOf(name, opts);

// ---------- dimension arithmetic ----------

export const dimMul = (a, b) => a.map((x, i) => x + b[i]);
export const dimDiv = (a, b) => a.map((x, i) => x - b[i]);
export const dimPow = (a, k) => a.map((x) => x * k);
export const dimEq = (a, b) => a.every((x, i) => Math.abs(x - b[i]) < 1e-9);
export const isDimensionless = (a) => dimEq(a, ZERO);
export const DIMENSIONLESS = ZERO;

// ---------- parsing ----------

export class UnitError extends Error {}

const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };
const isNameChar = (c) => /[\p{L}°Ωµμ]/u.test(c);

// Splits a run of letters typed one by one into unit names: the longest
// name first (« kWh », then « kW »·« h » would be wrong: kWh is a name).
function splitNames(run, opts) {
  const out = [];
  let i = 0;
  while (i < run.length) {
    let j = run.length;
    while (j > i && !isUnitName(run.slice(i, j), opts)) j--;
    if (j === i) throw new UnitError(`Unité inconnue : ${run.slice(i)}`);
    out.push(run.slice(i, j));
    i = j;
  }
  return out;
}

// Pieces: a string (read character by character) or the characters of a
// keypad line, where a key of several characters (« kg ») is one piece.
// opts.prefixes = false: no prefixes (lines typed in SI, where « ms » is
// m·s and not a millisecond).
export function tokenizeUnits(src, opts = {}) {
  const pieces = Array.isArray(src) ? src : [...String(src)];
  const toks = [];
  let run = '';
  const flush = () => { if (run) { for (const n of splitNames(run, opts)) toks.push({ k: 'u', s: n }); run = ''; } };
  for (let i = 0; i < pieces.length; i++) {
    const c = pieces[i];
    if (c.length > 1 && isUnitName(c, opts)) { flush(); toks.push({ k: 'u', s: c }); continue; }
    if (c.length > 1) { flush(); toks.push(...tokenizeUnits([...c], opts)); continue; }
    if (isNameChar(c)) { run += c; continue; }
    flush();
    if (c === ' ') continue;
    if (SUP[c] != null) {
      let e = '';
      while (i < pieces.length && SUP[pieces[i]] != null) e += SUP[pieces[i++]];
      i--;
      toks.push({ k: '^' }, { k: 'n', v: Number(e) });
      continue;
    }
    if (/[0-9]/.test(c)) {
      let e = c;
      while (/[0-9]/.test(pieces[i + 1] ?? '')) e += pieces[++i];
      toks.push({ k: 'n', v: Number(e) });
      continue;
    }
    if ('·*×.'.includes(c)) { toks.push({ k: '·' }); continue; }
    if ('/÷'.includes(c)) { toks.push({ k: '/' }); continue; }
    if ('^()-'.includes(c)) { toks.push({ k: c }); continue; }
    if (c === '[' || c === ']') continue;
    throw new UnitError(`Symbole inattendu : ${c}`);
  }
  flush();
  return toks;
}

// → {f, d}. An empty line, or « 1 », is dimensionless.
export function parseUnit(src, opts = {}) {
  const toks = tokenizeUnits(src, opts);
  let p = 0;
  const peek = () => toks[p];
  const one = () => ({ f: 1, d: ZERO });
  const mul = (a, b) => ({ f: a.f * b.f, d: dimMul(a.d, b.d) });
  const div = (a, b) => ({ f: a.f / b.f, d: dimDiv(a.d, b.d) });

  function product() {
    let u = frac();
    for (;;) {
      const t = peek();
      if (!t || t.k === ')') return u;
      if (t.k === '·') { p++; u = mul(u, frac()); continue; }
      if (t.k === '/') { p++; u = div(u, power()); continue; }
      // Juxtaposition: N m, kg m².
      u = mul(u, frac());
    }
  }
  function frac() {
    let u = power();
    while (peek()?.k === '/') { p++; u = div(u, power()); }
    return u;
  }
  function power() {
    const u = atom();
    if (peek()?.k !== '^') return u;
    p++;
    let sign = 1;
    if (peek()?.k === '-') { sign = -1; p++; }
    let k;
    if (peek()?.k === '(') {
      p++;
      if (peek()?.k === '-') { sign = -sign; p++; }
      k = peek()?.k === 'n' ? toks[p++].v : null;
      if (peek()?.k !== ')') throw new UnitError('« ) » attendu');
      p++;
    } else k = peek()?.k === 'n' ? toks[p++].v : null;
    if (k == null) throw new UnitError('Exposant attendu');
    return { f: u.f ** (sign * k), d: dimPow(u.d, sign * k) };
  }
  function atom() {
    const t = toks[p++];
    if (!t) throw new UnitError('Unité attendue');
    if (t.k === 'u') return unitOf(t.s, opts);
    if (t.k === 'n' && t.v === 1) return one();
    if (t.k === '(') {
      const u = product();
      if (peek()?.k !== ')') throw new UnitError('« ) » attendu');
      p++;
      return u;
    }
    throw new UnitError('Unité attendue');
  }

  if (!toks.length) return one();
  const u = product();
  if (p < toks.length) throw new UnitError('Unité mal écrite');
  return u;
}

export const dimOf = (src) => parseUnit(src).d;
export const sameDimension = (a, b) => dimEq(parseUnit(a).d, parseUnit(b).d);
export const toSI = (value, unit) => value * parseUnit(unit).f;
export const fromSI = (value, unit) => value / parseUnit(unit).f;

// The unit names typed in a line (for the keypad).
export const unitNamesIn = (src) => tokenizeUnits(src).filter((t) => t.k === 'u').map((t) => t.s);

// ---------- writing a dimension ----------

// Named SI units, tried first: a dimension that is exactly one of them is
// written with its name (kg·m²/s² → J).
const NAMED = ['N', 'J', 'W', 'Pa', 'V', 'C', 'Ω', 'Hz'];
const SUPS = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (k) => (k === 1 ? '' : String(k).split('').map((c) => SUPS[c] ?? c).join(''));

export function formatDim(d, { named = true } = {}) {
  if (isDimensionless(d)) return '1';
  if (named) for (const n of NAMED) if (dimEq(U[n].d, d)) return n;
  const up = [];
  const down = [];
  BASE.forEach((b, i) => {
    if (d[i] > 0) up.push(b + sup(d[i]));
    if (d[i] < 0) down.push(b + sup(-d[i]));
  });
  const top = up.join('·') || '1';
  if (!down.length) return top;
  return `${top}/${down.length > 1 ? `(${down.join('·')})` : down[0]}`;
}

// ---------- quantities written in data: « 72 km/h », « 3,6·10^6 J » ----------

const NUM = /^\s*(-?\d[\d\s']*(?:[.,]\d+)?)(?:\s*[×x·*]\s*10\s*\^?\s*\(?\s*([-−]?\d+)\s*\)?)?/;

export function parseNumber(s) {
  const m = String(s).match(NUM);
  if (!m) return null;
  const v = Number(m[1].replace(/[\s']/g, '').replace(',', '.'));
  return { v: m[2] != null ? v * 10 ** Number(m[2].replace('−', '-')) : v, rest: String(s).slice(m[0].length) };
}

// → {value (in the unit written), unit, si (value in SI), d}
export function parseQuantity(s) {
  const n = parseNumber(s);
  if (!n) throw new UnitError(`Nombre attendu : ${s}`);
  const unit = n.rest.trim();
  const u = parseUnit(unit);
  return { value: n.v, unit, si: n.v * u.f, d: u.d };
}

// Loci of the complex plane (step U4, G8 « lieux » and « inversion »): the
// mode 'locus' of the `poly` judge, until the `geom` judge of step U5
// (complexVar). A line is an equation or an inequality in the complex
// letter (|z − 2i| = |z + 4|, z(z̄ − 3) < 6Re(z) + 3z̄ + 5, Re(1/w̄) = 1) or
// in its coordinates (x² + (y − 2)² = (x + 4)² + y², u² + v² − u = 0).
//
// cfg = {kind: 'poly', mode: 'locus', cv: 'z', xy: ['x', 'y'],
//        locus: {kind: 'circle', c: [a, b], r2} | {kind: 'line', a, b, c},
//        exclude?: [[x, y]], target?: 'circle' | 'line' | 'any'}
//   locus    the expected set (a line is ax + by + c = 0), used when
//            neither line is a circle or a line written as a polynomial
//   exclude  points left out (0 for an inversion)
//   target   final form: 'circle' (x − a)² + (y − b)² = r², 'line' a
//            collected first-degree equation (2x + y + 3 = 0, y = −2x − 3,
//            x = 1/2), with < ≤ > ≥ for a region
// Two lines are the same locus when, on 16 points of the reference object
// (the circle or the line of a line written as a polynomial of degree ≤ 2,
// else cfg.locus), both vanish, and on about 40 points of the grid off the
// object both are non-zero (or, for an inequality, both true or both
// false). An inequality must keep its strictness.
// A line in z is read as a polynomial in x and y when it is one (Re, Im,
// z̄, products), or when both sides are |…| or c·|…| (both squared).
// Traps: rules listing 'poly' in `judges`, compared as loci.

import { Q } from '../math/rational.js';
import { parse } from '../cas/parse.js';
import { stripParen, symbolsIn, contains, canonFn } from '../cas/ast.js';
import { Poly } from '../cas/poly.js';
import { exactValue } from '../cas/normal.js';
import { evalComplex } from '../cas/complex.js';
import { polyOf, sumTerms } from '../cas/polyx.js';
import { diagnoseLine } from './diagnose.js';
import { sameLine, frNum } from './common.js';

const CV = (cfg) => cfg.cv || 'z';
const XY = (cfg) => cfg.xy || ['x', 'y'];
const OPS = new Set(['=', '<', '≤', '>', '≥']);
const strict = (op) => op === '<' || op === '>';

export function parseLine(cfg, text) {
  return parse(String(text).replace(/^\s*=/, ''), { complex: true, vars: [CV(cfg), ...XY(cfg)] });
}

// ---------- a line as a polynomial in x and y ----------

class NotPoly extends Error {}
const P0 = new Poly();
const PC = (q) => Poly.const(q);

// [Re, Im] of a node as two real polynomials in x and y.
function ri(n, cfg) {
  const [x, y] = XY(cfg);
  switch (n.t) {
    case 'num': return [PC(n.v), P0];
    case 'const': if (n.name === 'i') return [P0, PC(1)]; throw new NotPoly();
    case 'sym':
      if (n.sub) throw new NotPoly();
      if (n.name === x || n.name === y) return [Poly.variable(n.name), P0];
      if (n.name === CV(cfg)) return [Poly.variable(x), Poly.variable(y)];
      throw new NotPoly();
    case 'paren': return ri(n.e, cfg);
    case 'neg': { const [a, b] = ri(n.e, cfg); return [a.neg(), b.neg()]; }
    case 'bin': case 'frac': {
      const op = n.t === 'frac' ? '÷' : n.op;
      const [a, b] = ri(n.t === 'frac' ? n.n : n.l, cfg);
      const [c, d] = ri(n.t === 'frac' ? n.d : n.r, cfg);
      if (op === '+') return [a.add(c), b.add(d)];
      if (op === '-') return [a.sub(c), b.sub(d)];
      if (op === '×') return [a.mul(c).sub(b.mul(d)), a.mul(d).add(b.mul(c))];
      // A constant denominator only: (a + bi)(c − di)/(c² + d²).
      if (!c.isConst || !d.isConst) throw new NotPoly();
      const m = c.constValue().mul(c.constValue()).add(d.constValue().mul(d.constValue()));
      if (m.n === 0) throw new NotPoly();
      const k = new Q(1).div(m);
      return [a.mul(c).add(b.mul(d)).scale(k), b.mul(c).sub(a.mul(d)).scale(k)];
    }
    case 'pow': {
      const e = stripParen(n.e);
      if (e.t !== 'num' || e.v.d !== 1 || e.v.n < 0 || e.v.n > 6) throw new NotPoly();
      const base = stripParen(n.b);
      // |E|² = Re(E)² + Im(E)².
      if (base.t === 'abs' && e.v.n % 2 === 0) {
        const [a, b] = ri(base.e, cfg);
        return [a.mul(a).add(b.mul(b)).pow(e.v.n / 2), P0];
      }
      let out = [PC(1), P0];
      const z = ri(n.b, cfg);
      for (let k = 0; k < e.v.n; k++) out = [out[0].mul(z[0]).sub(out[1].mul(z[1])), out[0].mul(z[1]).add(out[1].mul(z[0]))];
      return out;
    }
    case 'fn': {
      const name = canonFn(n.name);
      if (n.args.length !== 1) throw new NotPoly();
      const [a, b] = ri(n.args[0], cfg);
      if (name === 'conj') return [a, b.neg()];
      if (name === 'Re') return [a, P0];
      if (name === 'Im') return [b, P0];
      throw new NotPoly();
    }
    default: throw new NotPoly();
  }
}

// The square of a side that is |E|, c·|E| or a number ≥ 0 (c ≥ 0), else null.
function sideSquare(n, cfg) {
  n = stripParen(n);
  const vars = new Set([CV(cfg), ...XY(cfg)]);
  const free = (x) => ![...symbolsIn(x)].some((s) => vars.has(s));
  const sq = (c) => {
    const v = exactValue({ t: 'bin', op: '×', l: c, r: c });
    const f = evalComplex(c);
    return v && f && f.re >= 0 && Math.abs(f.im) < 1e-12 ? v : null;
  };
  if (free(n)) { const v = sq(n); return v ? PC(v) : null; }
  if (n.t === 'abs') { const [a, b] = ri(n.e, cfg); return a.mul(a).add(b.mul(b)); }
  if (n.t === 'bin' && n.op === '×') {
    const [c, e] = free(n.l) ? [n.l, n.r] : free(n.r) ? [n.r, n.l] : [null, null];
    if (!c || stripParen(e).t !== 'abs') return null;
    const v = sq(c);
    const [a, b] = ri(stripParen(e).e, cfg);
    return v ? a.mul(a).add(b.mul(b)).scale(v) : null;
  }
  return null;
}

// L − R as a real polynomial in x and y (both sides squared when they are
// moduli), or null.
export function polyRel(node, cfg) {
  const n = stripParen(node);
  if (n.t !== 'rel' || !OPS.has(n.op)) return null;
  try {
    const [lr, li] = ri(n.l, cfg);
    const [rr, rim] = ri(n.r, cfg);
    // Both sides may share an imaginary part (z(z̄ − 3) < 6Re z + 3z̄ + 5).
    if (li.sub(rim).isZero) return lr.sub(rr);
  } catch { /* not a polynomial: try the moduli */ }
  try {
    const a = sideSquare(n.l, cfg);
    const b = sideSquare(n.r, cfg);
    if (a && b) return a.sub(b);
  } catch { /* neither */ }
  return null;
}

// {A, B, C, D, E, F} of A·x² + B·xy + C·y² + D·x + E·y + F, or null.
function quadCoeffs(p, cfg) {
  const [x, y] = XY(cfg);
  const out = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
  for (const { m, c } of p.terms.values()) {
    const ex = Object.fromEntries(m);
    if (Object.keys(ex).some((v) => v !== x && v !== y)) return null;
    const i = ex[x] || 0;
    const j = ex[y] || 0;
    const key = { '2,0': 'A', '1,1': 'B', '0,2': 'C', '1,0': 'D', '0,1': 'E', '0,0': 'F' }[`${i},${j}`];
    if (!key) return null;
    out[key] = c.valueOf();
  }
  return out;
}

// The circle or the line of a polynomial line, or null.
export function objectOf(node, cfg) {
  const p = polyRel(node, cfg);
  if (!p || p.isZero) return null;
  const k = quadCoeffs(p, cfg);
  if (!k || k.B !== 0 || k.A !== k.C) return null;
  if (k.A === 0) return k.D === 0 && k.E === 0 ? null : { kind: 'line', a: k.D, b: k.E, c: k.F };
  const cx = -k.D / (2 * k.A);
  const cy = -k.E / (2 * k.A);
  const r2 = cx * cx + cy * cy - k.F / k.A;
  return r2 > 1e-12 ? { kind: 'circle', c: [cx, cy], r2 } : null;
}

// ---------- points on and off an object ----------

function onPoints(obj) {
  const out = [];
  if (obj.kind === 'circle') {
    const r = Math.sqrt(obj.r2);
    for (let k = 0; k < 16; k++) { const t = 0.3 + (2 * Math.PI * k) / 16; out.push([obj.c[0] + r * Math.cos(t), obj.c[1] + r * Math.sin(t)]); }
  } else {
    const n2 = obj.a * obj.a + obj.b * obj.b;
    const p0 = [(-obj.a * obj.c) / n2, (-obj.b * obj.c) / n2];
    const d = [-obj.b / Math.sqrt(n2), obj.a / Math.sqrt(n2)];
    for (let k = 0; k < 16; k++) { const t = -7.3 + 0.97 * k; out.push([p0[0] + t * d[0], p0[1] + t * d[1]]); }
  }
  return out;
}

const distTo = (obj, [x, y]) => (obj.kind === 'circle'
  ? Math.abs(Math.hypot(x - obj.c[0], y - obj.c[1]) - Math.sqrt(obj.r2))
  : Math.abs(obj.a * x + obj.b * y + obj.c) / Math.hypot(obj.a, obj.b));

// Grid points (whole and half numbers) off the object: some on both sides
// near it, the others spread.
function offPoints(obj) {
  const out = [];
  const seen = new Set();
  const push = (p) => {
    const q = [Math.round(p[0] * 2) / 2, Math.round(p[1] * 2) / 2];
    const key = q.join(',');
    if (seen.has(key) || distTo(obj, q) < 0.2) return;
    seen.add(key);
    out.push(q);
  };
  if (obj.kind === 'circle') {
    const r = Math.sqrt(obj.r2);
    for (const f of [0, 0.5, 1.5, 2]) for (let k = 0; k < 6; k++) { const t = 0.7 + k; push([obj.c[0] + f * r * Math.cos(t), obj.c[1] + f * r * Math.sin(t)]); }
  } else {
    const h = Math.hypot(obj.a, obj.b);
    for (const p of onPoints(obj).filter((_, k) => k % 3 === 0)) for (const s of [-1.5, 1.5]) push([p[0] + (s * obj.a) / h, p[1] + (s * obj.b) / h]);
  }
  for (let k = 0; k < 30; k++) push([((k * 7) % 17) - 8, ((k * 11) % 17) - 8]);
  return out;
}

// ---------- comparing two lines ----------

function valueAt(node, cfg, [px, py]) {
  const [x, y] = XY(cfg);
  const env = { [x]: px, [y]: py, [CV(cfg)]: { re: px, im: py } };
  const L = evalComplex(node.l, env);
  const R = evalComplex(node.r, env);
  if (!L || !R) return null;
  const s = 1 + Math.hypot(L.re, L.im) + Math.hypot(R.re, R.im);
  if (Math.abs(L.im - R.im) > 1e-9 * s) return null;
  return { d: L.re - R.re, s };
}
const vanishes = (v) => Math.abs(v.d) <= 1e-8 * v.s;
const holds = (op, v) => (op === '<' ? v.d < 0 && !vanishes(v) : op === '≤' ? v.d < 0 || vanishes(v) : op === '>' ? v.d > 0 && !vanishes(v) : v.d > 0 || vanishes(v));

const excluded = (cfg, p) => (cfg.exclude || []).some((e) => Math.hypot(p[0] - e[0], p[1] - e[1]) < 1e-6);

function expected(cfg) {
  const L = cfg.locus;
  if (!L) return null;
  return L.kind === 'circle' ? { kind: 'circle', c: L.c.map(Number), r2: Number(L.r2) } : { kind: 'line', a: Number(L.a), b: Number(L.b), c: Number(L.c) };
}

// {same, witness?: {p, on, a, b}}: a and b are relations.
export function sameLocus(cfg, a, b) {
  a = stripParen(a);
  b = stripParen(b);
  if (a.t !== 'rel' || b.t !== 'rel' || !OPS.has(a.op) || !OPS.has(b.op)) return { same: false };
  if (sameLine(a, b)) return { same: true };
  if ((a.op === '=') !== (b.op === '=')) return { same: false, kind: 'op' };
  if (a.op !== '=' && strict(a.op) !== strict(b.op)) return { same: false, kind: 'strict' };
  const obj = objectOf(a, cfg) || objectOf(b, cfg) || expected(cfg);
  if (!obj) return { same: false };
  let n = 0;
  for (const p of onPoints(obj)) {
    if (excluded(cfg, p)) continue;
    const va = valueAt(a, cfg, p);
    const vb = valueAt(b, cfg, p);
    if (!va || !vb) continue;
    n++;
    if (vanishes(va) !== vanishes(vb)) return { same: false, witness: { p, on: true, a: vanishes(va) } };
    if (!vanishes(va)) return { same: false, witness: { p, on: true, a: false } };
  }
  if (n < 6) return { same: false };
  let m = 0;
  for (const p of offPoints(obj)) {
    if (excluded(cfg, p)) continue;
    const va = valueAt(a, cfg, p);
    const vb = valueAt(b, cfg, p);
    if (!va || !vb) continue;
    m++;
    const ta = a.op === '=' ? vanishes(va) : holds(a.op, va);
    const tb = b.op === '=' ? vanishes(vb) : holds(b.op, vb);
    if (ta !== tb) return { same: false, witness: { p, on: false, a: ta } };
  }
  return m >= 10 ? { same: true } : { same: false };
}

// ---------- final forms ----------

const isNumber = (n) => {
  n = stripParen(n);
  if (n.t === 'neg') n = stripParen(n.e);
  if (n.t === 'num') return true;
  return n.t === 'frac' && stripParen(n.n).t === 'num' && stripParen(n.d).t === 'num';
};

// x, (x − a), (x + a) with a number a: the letter, or null.
function squareOf(t, cfg) {
  t = stripParen(t);
  if (t.t !== 'pow' || stripParen(t.e).t !== 'num' || !stripParen(t.e).v.eq(2)) return null;
  const b = stripParen(t.b);
  if (b.t === 'sym' && XY(cfg).includes(b.name)) return b.name;
  if (b.t === 'bin' && (b.op === '+' || b.op === '-') && stripParen(b.l).t === 'sym' && XY(cfg).includes(stripParen(b.l).name) && isNumber(b.r)) return stripParen(b.l).name;
  return null;
}

function circleForm(n, cfg) {
  const terms = sumTerms(n.l);
  if (terms.length !== 2 || terms.some((t) => t.t === 'neg')) return false;
  const names = terms.map((t) => squareOf(t, cfg));
  if (!names[0] || !names[1] || names[0] === names[1]) return false;
  if (!isNumber(n.r)) return false;
  const r2 = exactValue(n.r);
  return !!r2 && r2.n > 0;
}

function lineForm(n, cfg) {
  const p = polyRel(n, cfg);
  if (!p) return false;
  const k = quadCoeffs(p, cfg);
  if (!k || k.A || k.B || k.C || (!k.D && !k.E)) return false;
  const seen = new Set();
  for (const t of [...sumTerms(n.l), ...sumTerms(n.r)]) {
    if (contains(t, (x) => x.t === 'bin' && (x.op === '+' || x.op === '-'))) return false;
    const q = polyOf(t);
    if (!q || q.terms.size > 1) return false;
    if (q.isZero) continue;
    const key = [...q.terms.keys()][0];
    if (seen.has(key)) return false;
    seen.add(key);
  }
  const cs = [k.D, k.E, k.F].filter((c) => c !== 0);
  if (cs.every(Number.isInteger)) {
    const g = cs.reduce((a, c) => { let [u, v] = [Math.abs(a), Math.abs(c)]; while (v) [u, v] = [v, u % v]; return u; });
    if (g > 1) return `Simplifie : tous les coefficients sont divisibles par ${g}.`;
  }
  return true;
}

export function isFinal(cfg, node) {
  const n = stripParen(node);
  if (n.t !== 'rel' || !OPS.has(n.op)) return false;
  if (contains(n, (x) => (x.t === 'const' && x.name === 'i') || (x.t === 'sym' && x.name === CV(cfg)) || x.t === 'abs' || x.t === 'fn')) return false;
  const target = cfg.target || 'any';
  if (target === 'circle') return circleForm(n, cfg);
  if (target === 'line') return lineForm(n, cfg);
  return true;
}

// ---------- judging a line ----------

const pt = ([x, y]) => `(${frNum(x)} ; ${frNum(y)})`;

export function judgeLine(cfg, prev, input) {
  let node;
  if (input && typeof input === 'object') node = input;
  else {
    try { node = parseLine(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  const letters = new Set([CV(cfg), ...XY(cfg)]);
  const unknown = [...symbolsIn(node)].filter((s) => !letters.has(s));
  if (unknown.length) return { kind: 'parse', node, message: `Je ne connais pas la lettre « ${unknown[0].replace(/_$/, '')} » ici : écris avec ${[CV(cfg), ...XY(cfg)].join(', ')}.` };
  const n = stripParen(node);
  if (n.t !== 'rel' || !OPS.has(n.op)) return { kind: 'parse', node, message: `Écris une équation (ou une inéquation) en ${XY(cfg).join(' et ')}.` };
  if (sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  const r = sameLocus(cfg, prev, node);
  if (!r.same) {
    const diag = diagnoseLine('poly', prev, node, cfg, (cand, line) => sameLocus(cfg, cand, line).same);
    let message = 'Ta ligne ne décrit pas le même ensemble de points que la précédente.';
    if (r.kind === 'op') message = 'Une égalité est devenue une inégalité (ou l\'inverse) : garde la même relation.';
    if (r.kind === 'strict') message = 'Une inégalité stricte doit le rester (et une large aussi) : le bord du lieu a changé.';
    if (r.witness) message = r.witness.a ? `Le point ${pt(r.witness.p)} vérifie la ligne précédente, mais pas la tienne.` : `Le point ${pt(r.witness.p)} vérifie ta ligne, mais pas la précédente.`;
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais : ${fin}` };
  return { kind: 'ok', node };
}

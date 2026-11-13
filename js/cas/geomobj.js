// Geometric objects of the plane and of space (step U5): lines, planes,
// circles, spheres, conics and unions of two of them, read from the lines
// the judges `geom` and `conic` accept, and compared as sets of points.
//
//   2x - 3y - 8 = 0      y = 2x + 1      x = -3                 cartesian
//   (x ; y) = (1 ; -2) + t(3 ; 2)    (x ; y ; z) = A + s·u + t·v  parametric
//   x = 1 + 3t ; y = -2 + 2t                                     parametric, one coordinate per equation
//   (x - 1)/2 = (y + 2)/1 = (z - 3)/(-1)                         chained equalities (each « = » is an equation)
//   x - 2y - 5 = 0 ; y + z - 1 = 0    (or « et »)                 a system: a line of space
//   3x + 4y - 19 = 0 ou x = -3        |3x - 4y + 1|/5 = |4x + 3y - 7|/5    a union of two objects
//   (x - 2)^2 + (y + 3)^2 = 25        x^2 + y^2 + z^2 - 2x = 3     circles, spheres, conics
//
// readObject(text, {dim, params, symbols}) → object (throws ParseError):
//   {kind: 'affine', dim, rows}   rows: Q[][] in rref, a row [a, b, c, d] is ax + by + cz + d = 0
//   {kind: 'poly', dim, coefs}    a polynomial of degree ≤ 2 (numeric coefficients on MONO[dim])
//   {kind: 'empty' | 'all'}
// plus `shape` ('cartesian' | 'param' | 'union' | 'system'…) and `parts` for the
// final-form checks of the judges.
// sameObject(a, b) → boolean; polyOfObject(o) → float coefficients.

import { parse, ParseError } from './parse.js';
import { mapNode, sub as subN, stripParen, symbolsIn, lit, contains } from './ast.js';
import { toRatFun, exactValue } from './normal.js';
import { compileFloat } from './numeric.js';
import { parseVec, evalVec, envFrom, namesOf, splitTop, normVecText } from './vecexpr.js';
import { Q } from '../math/rational.js';
import * as MX from './matrix.js';
import { t as tr } from '../i18n.js';

const fail = (msg) => { throw new ParseError(msg, 0); };
export const COORDS = { 2: ['x', 'y'], 3: ['x', 'y', 'z'] };
export const PARAMS = ['t', 's', 'k', 'λ', 'μ', 'r'];

// Monomials of degree ≤ 2 (exponent vectors).
export const MONO = {
  2: [[2, 0], [1, 1], [0, 2], [1, 0], [0, 1], [0, 0]],
  3: [[2, 0, 0], [0, 2, 0], [0, 0, 2], [1, 1, 0], [1, 0, 1], [0, 1, 1], [1, 0, 0], [0, 1, 0], [0, 0, 1], [0, 0, 0]],
};

// ---------- text ----------

export function normGeomText(text) {
  return normVecText(text)
    .replace(/\s+ou\s+/g, '∨')
    .replace(/\s+et\s+/g, '∧')
    .replace(/\s*,\s*(?=[a-z(]\s*[=+\-]|[xyz]\b)/g, ';');
}

const splitBy = (text, seps) => splitTop(text, seps).map((s) => s.trim()).filter((s) => s.length);

// ---------- one equation ----------

const coordsOf = (dim) => COORDS[dim];

// Exact linear row of L − R ([a, b, (c,) d]) or null.
function linearRow(node, dim) {
  let r;
  try { r = toRatFun(node); } catch { return null; }
  if (r.opaque || !r.rf.d.isConst) return null;
  const dc = r.rf.d.constValue();
  const vars = coordsOf(dim);
  const row = Array.from({ length: dim + 1 }, () => new Q(0));
  for (const { m, c } of r.rf.n.terms.values()) {
    if (!m.length) { row[dim] = row[dim].add(c.div(dc)); continue; }
    if (m.length > 1 || m[0][1] !== 1) return null;
    const i = vars.indexOf(m[0][0]);
    if (i < 0) return null;
    row[i] = row[i].add(c.div(dc));
  }
  return row;
}

// Sample points (deterministic) for the numeric fit.
const PTS = [];
{
  let s = 12345;
  const rnd = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
  for (let i = 0; i < 40; i++) PTS.push([rnd() * 7.3 - 3.1, rnd() * 6.9 - 3.4, rnd() * 7.1 - 3.6]);
}

function solveLinear(A, b) {
  const n = A.length;
  const M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < 1e-12) return null;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((r, i) => r[n] / r[i]);
}

const monoVal = (e, p) => e.reduce((s, k, i) => s * p[i] ** k, 1);

// Coefficients of a function of degree ≤ 2 (numeric), or null.
export function fitPoly(f, dim) {
  const mono = MONO[dim];
  const m = mono.length;
  const pts = PTS.slice(0, m);
  const A = pts.map((p) => mono.map((e) => monoVal(e, p)));
  const b = pts.map((p) => f(p));
  if (b.some((x) => !Number.isFinite(x))) return null;
  const c = solveLinear(A, b);
  if (!c) return null;
  const scale = Math.max(1, ...c.map(Math.abs));
  for (const p of PTS.slice(m, m + 8)) {
    const y = f(p);
    const z = mono.reduce((s, e, i) => s + c[i] * monoVal(e, p), 0);
    if (!Number.isFinite(y) || Math.abs(y - z) > 1e-7 * scale * (1 + Math.abs(y))) return null;
  }
  return c.map((x) => (Math.abs(x) < 1e-10 * scale ? 0 : x));
}

const envAt = (p, dim) => Object.fromEntries(coordsOf(dim).map((v, i) => [v, p[i]]));

// |e| replaced by e (to square an equation |A|·c = |B|·d).
const unAbs = (n) => mapNode(n, (x) => (x.t === 'abs' ? { t: 'paren', e: x.e } : x));

// The numeric polynomial of one equation L = R (null if not of degree ≤ 2).
function polyOfEq(l, r, dim) {
  const hasAbs = contains(l, (x) => x.t === 'abs') || contains(r, (x) => x.t === 'abs');
  if (!hasAbs) {
    const f = compileFloat(subN(l, r));
    return fitPoly((p) => f(envAt(p, dim)), dim);
  }
  // Square both sides: valid when each side is ± its version without bars.
  const fl = compileFloat(l);
  const fr = compileFloat(r);
  const gl = compileFloat(unAbs(l));
  const gr = compileFloat(unAbs(r));
  for (const p of PTS.slice(0, 10)) {
    const e = envAt(p, dim);
    if (Math.abs(Math.abs(fl(e)) - Math.abs(gl(e))) > 1e-9 * (1 + Math.abs(fl(e))) || Math.abs(Math.abs(fr(e)) - Math.abs(gr(e))) > 1e-9 * (1 + Math.abs(fr(e)))) return null;
    if (fl(e) < -1e-12 || fr(e) < -1e-12) return null;
  }
  return fitPoly((p) => { const e = envAt(p, dim); return gl(e) ** 2 - gr(e) ** 2; }, dim);
}

// ---------- reading ----------

// One equation, or a chain a = b = c (each « = »).
function readEquations(text, dim, opts) {
  const sides = splitBy(text, '=');
  if (sides.length < 2) fail(tr('Écris une équation, avec « = ».'));
  const nodes = sides.map((s) => parse(s, { vars: [...coordsOf(dim), ...(opts.extraVars || [])] }));
  const out = [];
  for (let i = 1; i < nodes.length; i++) out.push({ l: nodes[i - 1], r: nodes[i] });
  return out;
}

// (x ; y) = A + t·u: point and directions, exact.
function readParam(lhs, rhs, dim, opts) {
  const want = coordsOf(dim);
  const left = lhs.replace(/[()\s]/g, '').split(';');
  if (left.length !== dim || left.some((v, i) => v !== want[i])) fail(tr('À gauche, écris ({names}).', { names: want.join(' ; ') }));
  const env = envFrom(opts.symbols || {}, { params: PARAMS });
  const vo = { params: PARAMS, names: namesOf(env) };
  const val = evalVec(parseVec(rhs, vo), env, vo);
  if (val.k !== 'v' || val.items.length !== dim) fail(tr('À droite, il faut un point à {dim} coordonnées.', { dim }));
  return paramFromItems(val.items, dim);
}

// Items: CAS nodes affine in the parameters.
function paramFromItems(items, dim) {
  const ps = [...new Set(items.flatMap((n) => [...symbolsIn(n)]))];
  const bad = ps.find((p) => !PARAMS.includes(p));
  if (bad) fail(tr('Je ne connais pas la lettre « {c} » ici : le paramètre s\'écrit t, s, k ou λ.', { c: bad }));
  const at = (vals) => items.map((n) => {
    const m = mapNode(n, (x) => (x.t === 'sym' && vals[x.name] !== undefined ? { t: 'paren', e: lit(vals[x.name]) } : x));
    const q = exactValue(m);
    if (!q) fail(tr('Les coordonnées de ta paramétrisation doivent être des nombres rationnels.'));
    return q;
  });
  const zero = Object.fromEntries(ps.map((p) => [p, new Q(0)]));
  const point = at(zero);
  const dirs = ps.map((p) => at({ ...zero, [p]: new Q(1) }).map((x, i) => x.sub(point[i])));
  // Affine in each parameter (no t²).
  for (const p of ps) {
    const two = at({ ...zero, [p]: new Q(2) });
    if (two.some((x, i) => !x.eq(point[i].add(dirs[ps.indexOf(p)][i].mul(2))))) fail(tr('Une paramétrisation de droite ou de plan est du 1er degré en t.'));
  }
  for (let a = 0; a < ps.length; a++) for (let b = a + 1; b < ps.length; b++) {
    const both = at({ ...zero, [ps[a]]: new Q(1), [ps[b]]: new Q(1) });
    if (both.some((x, i) => !x.eq(point[i].add(dirs[a][i]).add(dirs[b][i])))) fail(tr('Les paramètres ne doivent pas être multipliés entre eux.'));
  }
  return affineFromParam(point, dirs.filter((d) => d.some((x) => x.n !== 0)), dim);
}

function affineFromParam(point, dirs, dim) {
  if (!dirs.length) return { kind: 'affine', dim, rows: rrefRows(MX.identity(dim).map((r, i) => [...r, point[i].neg()]), dim), dirs: [], point };
  const D = dirs.map((d) => [...d]);
  const normals = MX.kernel(D); // vectors n with n·d = 0
  const rows = normals.map((n) => [...n, MX.dot(n, point).neg()]);
  return { kind: 'affine', dim, rows: rrefRows(rows, dim), point, dirs };
}

function rrefRows(rows, dim) {
  if (!rows.length) return [];
  const { R } = MX.rref(rows.map((r) => r.map((x) => (x instanceof Q ? x : new Q(x)))));
  return R.filter((r) => r.some((x) => x.n !== 0));
}

// The object of a system of equations (all exact and linear: affine).
function objectOfSystem(eqs, dim) {
  const rows = [];
  let linear = true;
  for (const { l, r } of eqs) {
    const free = !coordsOf(dim).some((v) => symbolsIn(l).has(v) || symbolsIn(r).has(v));
    if (free) {
      // A closed equality: true (dropped) or false (empty).
      const a = exactValue(l);
      const b = exactValue(r);
      if (a && b) { if (!a.eq(b)) return { kind: 'empty', dim }; continue; }
      const fa = compileFloat(l)({});
      const fb = compileFloat(r)({});
      if (Math.abs(fa - fb) > 1e-9 * (1 + Math.abs(fa))) return { kind: 'empty', dim };
      continue;
    }
    const row = linearRow(subN(l, r), dim);
    if (!row) { linear = false; break; }
    rows.push(row);
  }
  if (linear) {
    const R = rrefRows(rows, dim);
    if (R.some((r) => r.slice(0, dim).every((x) => x.n === 0))) return { kind: 'empty', dim };
    if (!R.length) return { kind: 'all', dim };
    return { kind: 'affine', dim, rows: R };
  }
  const nonClosed = eqs.filter(({ l, r }) => coordsOf(dim).some((v) => symbolsIn(l).has(v) || symbolsIn(r).has(v)));
  if (nonClosed.length !== 1) fail(tr('Je ne sais comparer qu\'une seule équation du 2e degré.'));
  const coefs = polyOfEq(nonClosed[0].l, nonClosed[0].r, dim);
  if (!coefs) fail(tr('Cette équation n\'est pas du 2e degré au plus en x et y.'));
  return { kind: 'poly', dim, coefs };
}

// A part without « ou »: a system, a parametric form, or equations.
function readPart(text, dim, opts) {
  const items = splitBy(text, '∧;');
  const shapes = [];
  const eqs = [];
  const paramDefs = {};
  for (const it of items) {
    const m = /^\(\s*x\s*;[^)]*\)\s*=(.*)$/.exec(it);
    if (m) {
      if (items.length > 1) fail(tr('Une paramétrisation s\'écrit seule sur sa ligne.'));
      const o = readParam(it.slice(0, it.indexOf('=')), m[1], dim, opts);
      return { ...o, shape: 'param' };
    }
    const e = readEquations(it, dim, opts);
    // x = 1 + 3t: a coordinate defined with a parameter.
    if (e.length === 1) {
      const l = stripParen(e[0].l);
      const ps = [...symbolsIn(e[0].r)].filter((s) => PARAMS.includes(s));
      if (l.t === 'sym' && coordsOf(dim).includes(l.name) && ps.length && !coordsOf(dim).some((v) => symbolsIn(e[0].r).has(v))) {
        paramDefs[l.name] = e[0].r;
        continue;
      }
    }
    shapes.push(e.length > 1 ? 'chain' : 'eq');
    eqs.push(...e);
  }
  if (Object.keys(paramDefs).length) {
    if (eqs.length || Object.keys(paramDefs).length !== dim) fail(tr('Donne les {dim} coordonnées en fonction du paramètre.', { dim }));
    return { ...paramFromItems(coordsOf(dim).map((v) => paramDefs[v]), dim), shape: 'param' };
  }
  const extra = [...new Set(eqs.flatMap(({ l, r }) => [...symbolsIn(l), ...symbolsIn(r)]))].filter((s) => !coordsOf(dim).includes(s));
  if (extra.length) fail(tr('Je ne connais pas la lettre « {c} » ici.', { c: extra[0] }));
  const o = objectOfSystem(eqs, dim);
  return { ...o, shape: shapes.length === 1 ? (shapes[0] === 'chain' ? 'chain' : 'eq') : 'system', eqs };
}

export function readObject(text, opts = {}) {
  const dim = opts.dim || 2;
  const t = normGeomText(text).replace(/^[A-Za-zΩγΓπαβδ](_\d+|')?\s*:\s*/, '');
  const parts = splitBy(t, '∨');
  if (parts.length === 1) return readPart(parts[0], dim, opts);
  const objs = parts.map((p) => readPart(p, dim, opts));
  return unionOf(objs, dim);
}

// A union: the product of the parts' polynomials (each of degree 1 here).
function unionOf(objs, dim) {
  const polys = objs.map((o) => polyOfObject(o));
  if (polys.some((p) => !p)) fail(tr('Chaque morceau de la réunion doit être une droite (ou un plan).'));
  const f = (p) => polys.reduce((s, c) => s * evalMono(c, p, dim), 1);
  const coefs = fitPoly(f, dim);
  if (!coefs) fail(tr('Je ne sais comparer que la réunion de deux droites.'));
  return { kind: 'poly', dim, coefs, shape: 'union', parts: objs };
}

const evalMono = (c, p, dim) => MONO[dim].reduce((s, e, i) => s + c[i] * monoVal(e, p), 0);

// Numeric coefficients of an object of codimension 1 (or a poly).
export function polyOfObject(o) {
  if (o.kind === 'poly') return o.coefs;
  if (o.kind !== 'affine' || o.rows.length !== 1) return null;
  const row = o.rows[0].map((x) => x.valueOf());
  const dim = o.dim;
  return MONO[dim].map((e) => {
    const deg = e.reduce((s, k) => s + k, 0);
    if (deg === 2) return 0;
    if (deg === 0) return row[dim];
    return row[e.indexOf(1)];
  });
}

// Proportional coefficient vectors (≠ 0).
export function proportional(a, b) {
  const na = Math.max(...a.map(Math.abs));
  const nb = Math.max(...b.map(Math.abs));
  if (na < 1e-12 || nb < 1e-12) return false;
  const i = a.findIndex((x) => Math.abs(x) === na);
  const c = b[i] / a[i];
  return a.every((x, k) => Math.abs(x * c - b[k]) <= 1e-7 * nb);
}

export function sameObject(a, b) {
  if (!a || !b || a.dim !== b.dim) return false;
  if (a.kind !== b.kind && !(['affine', 'poly'].includes(a.kind) && ['affine', 'poly'].includes(b.kind))) return false;
  if (a.kind === 'empty' || a.kind === 'all') return a.kind === b.kind;
  if (a.kind === 'affine' && b.kind === 'affine') {
    return a.rows.length === b.rows.length && a.rows.every((r, i) => r.every((x, j) => x.eq(b.rows[i][j])));
  }
  const pa = polyOfObject(a);
  const pb = polyOfObject(b);
  return !!pa && !!pb && proportional(pa, pb);
}

// Dimension of an affine object (1 for a line, 2 for a plane), or null.
export const affineDim = (o) => (o.kind === 'affine' ? o.dim - o.rows.length : null);

// A direction vector of a line given by rows (Q[]), and one of its points.
export function lineData(o) {
  if (o.kind !== 'affine' || affineDim(o) !== 1) return null;
  const A = o.rows.map((r) => r.slice(0, o.dim));
  const dir = MX.kernel(A)[0];
  // A point: solve with the free coordinate at 0.
  const R = MX.rref(o.rows.map((r) => [...r.slice(0, o.dim), r[o.dim].neg()])).R;
  const point = Array.from({ length: o.dim }, () => new Q(0));
  for (const r of R) {
    const j = r.findIndex((x) => x.n !== 0);
    if (j >= 0 && j < o.dim) point[j] = r[o.dim];
  }
  return { dir, point };
}

// The normal (a ; b (; c)) of a line of the plane or of a plane, and d.
export function normalOf(o) {
  if (o.kind !== 'affine' || o.rows.length !== 1) return null;
  return { n: o.rows[0].slice(0, o.dim), d: o.rows[0][o.dim] };
}

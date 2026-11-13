// Iteration tables of module N (step U9; spec §5.2 `iter`, §16.2 `phi`
// kinds, catalogue N « Items table »). Like iter.js and iter-power.js, each
// cell is judged from the student's own cells (error carried forward).
//
// item.table = {cols: [html], rows: [{id, label, cells: [cell]}]}
// cell = {given: text} | {input: true} | {auto: true} (computed and shown by
//        the app from the student's cells, never judged) | null
// phi.cols: the meaning of each column, in order (ids below).
//
// phi kinds:
//   {kind:'scalar', phi: 'x - (x^2-2)/(2x)', v?: 'x', x0, alpha?, f?}
//        fixed point and Newton. Column 'x': row 0 = x0, row k = φ(x of the
//        student's row k − 1).
//   {kind:'secant', f, x0, x1}  'x': rows 0, 1 given values, row k from the
//        student's rows k − 1 and k − 2.
//   {kind:'bisect', f, a0, b0}  columns 'a', 'b', 'x' (midpoint), 'sign'
//        (sign of f(x), + or −); the next [a ; b] is the half of the
//        student's row where f changes sign.
//   {kind:'jacobi' | 'gs', A, b, x0}  columns 'x1' … 'xn' (and 'res');
//        row k from the student's row k − 1 (and, for Gauss-Seidel, the
//        components of row k already computed).
//   {kind:'ode', scheme: 'EP'|'ER'|'CN'|'Heun'|'RK4', f: 'expr in t, u', t0,
//        u0, h}  columns 't', 'u' (and 'k1', 'k2' for Heun: k1 = f(tₙ₋₁, uₙ₋₁),
//        k2 = f(tₙ, uₙ₋₁ + h·k1) from the student's row; then uₙ). ER and CN
//        are solved exactly when f is affine in u, by Newton otherwise.
//   {kind:'gradient', A, b, x0, step: 'optimal' | number}  columns 'x1' … 'xn',
//        'r1' … 'rn', 'alpha': rᵏ = b − Axᵏ, αₖ = rᵀr/rᵀAr (or the fixed
//        step), xᵏ⁺¹ = xᵏ + αₖrᵏ, each from the student's cells.
//   {kind:'divdiff', xs, ys}  triangular table: row i holds x_i, f[x_i],
//        f[x_{i−1}, x_i], … (columns 'x', 'd0', 'd1', 'd2', …); a cell of
//        order k is (cell(i, k−1) − cell(i−1, k−1))/(x_i − x_{i−k}) of the
//        student's cells.
// Derived columns, from the student's cells of the same table:
//   'inc' |x_k − x_{k−1}| (δ_{k−1}), 'r1', 'r2', 'r3' inc_k/inc_{k−1}^p,
//   'err' |x_k − alpha|, 'fx' f(x_k), 'res' ‖b − Ax_k‖∞, 'k' (given).
// Tolerances: phi.tol (relative, default 1e-6) for the iterates, exact
// when both are fractions; phi.sig (significant digits, default 2) for the
// derived columns a student computes by hand.
//
// checkNum(item, values) → {ok, cells, rule, message}
// referenceRows(phi, n) → [{col: value}] (Q or number), for generators
// autoCells(item, values) → {rowId: [text | null]} (the app's columns)
// fmt(x, digits) French text of a value (fractions kept)

import { Q } from '../math/rational.js';
import { tryParse, parse } from '../cas/parse.js';
import { exactValue } from '../cas/normal.js';
import { evalFloat } from '../cas/numeric.js';
import { mapNode, lit } from '../cas/ast.js';
import { t } from '../i18n.js';

export const NUM_KINDS = new Set(['scalar', 'secant', 'bisect', 'jacobi', 'gs', 'ode', 'gradient', 'divdiff']);

// ---------- numbers ----------

export const num = (tq) => {
  if (tq === null || tq === undefined) return null;
  if (tq instanceof Q || typeof tq === 'number') return tq;
  const raw = String(tq).trim().replace(/−/g, '-');
  // A long decimal (more digits than an exact fraction holds), or 1.5e-3.
  if (/^-?\d*[.,]?\d+([eE][+-]?\d+)?$/.test(raw) && (raw.replace(/\D/g, '').length > 14 || /[eE]/.test(raw))) return Number(raw.replace(',', '.'));
  const s = raw;
  if (s === '') return null;
  const n = tryParse(s);
  if (!n) return null;
  try { const q = exactValue(n); if (q) return q; } catch { /* float */ }
  const f = evalFloat(n, {});
  return Number.isFinite(f) ? f : null;
};
export const fv = (x) => (x === null || x === undefined ? NaN : typeof x === 'number' ? x : x.valueOf());
const isQ = (x) => x instanceof Q;

// Exact when possible (a fraction overflowing goes to floats).
const Qop = (op, a, b) => {
  if (a === null || b === null || a === undefined || b === undefined) return null;
  if (isQ(a) && isQ(b)) {
    try {
      switch (op) {
        case '+': return a.add(b);
        case '-': return a.sub(b);
        case '*': return a.mul(b);
        case '/': return b.n === 0 ? null : a.div(b);
        default: break;
      }
    } catch { /* overflow: floats */ }
  }
  const x = fv(a);
  const y = fv(b);
  switch (op) {
    case '+': return x + y;
    case '-': return x - y;
    case '*': return x * y;
    case '/': return y === 0 ? null : x / y;
    default: return null;
  }
};
const add = (a, b) => Qop('+', a, b);
const sub = (a, b) => Qop('-', a, b);
const mul = (a, b) => Qop('*', a, b);
const div = (a, b) => Qop('/', a, b);
const absv = (a) => (a === null ? null : isQ(a) ? (a.n < 0 ? a.neg() : a) : Math.abs(a));

export function same(a, b, tol = 1e-6) {
  if (a === null || b === null || a === undefined || b === undefined) return false;
  if (isQ(a) && isQ(b) && a.eq(b)) return true;
  const x = fv(a);
  const y = fv(b);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
  return Math.abs(x - y) <= tol * Math.max(Math.abs(y), 1e-300) + 1e-14;
}

// Equal at `sig` significant digits (one unit of the last digit).
export function sameSig(a, b, sig = 2) {
  if (a === null || b === null || a === undefined || b === undefined) return false;
  const x = fv(a);
  const y = fv(b);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
  if (y === 0) return Math.abs(x) < 1e-12;
  const unit = 10 ** (Math.floor(Math.log10(Math.abs(y))) - sig + 1);
  return Math.abs(x - y) <= unit * 1.0001;
}

// A CAS expression of the item, evaluated at a point (Q exactly if it can).
const parsed = new Map();
function nodeOf(text, vars) {
  const key = `${text}|${vars.join(',')}`;
  if (!parsed.has(key)) parsed.set(key, parse(String(text), { vars }));
  return parsed.get(key);
}
export function evalAt(text, env, vars = Object.keys(env)) {
  if (Object.values(env).some((x) => x === null || x === undefined)) return null;
  const node = nodeOf(text, vars);
  if (Object.values(env).every(isQ)) {
    try {
      const sub = mapNode(node, (n) => (n.t === 'sym' && !n.sub && n.name in env ? { t: 'paren', e: lit(env[n.name]) } : n));
      const q = exactValue(sub);
      if (q) return q;
    } catch { /* floats */ }
  }
  const fenv = Object.fromEntries(Object.entries(env).map(([k, v]) => [k, fv(v)]));
  const x = evalFloat(node, fenv);
  return Number.isFinite(x) ? x : null;
}

// French text: fractions kept, decimals with a comma (at most `digits`
// significant digits for a float).
export function fmt(x, digits = 6) {
  if (x === null || x === undefined) return '';
  if (isQ(x)) return x.toString().replace('-', '−');
  if (!Number.isFinite(x)) return String(x);
  const r = Number(x.toPrecision(digits));
  return String(r).replace('.', ',').replace('-', '−');
}

// The exam display of a number: 2.032035e-02 (%e with `d` decimals).
export const expText = (x, d = 6) => {
  const s = fv(x).toExponential(d);
  const [m, e] = s.split('e');
  const n = Number(e);
  return `${m}e${n < 0 ? '-' : '+'}${String(Math.abs(n)).padStart(2, '0')}`;
};

// ---------- reading the student's table ----------

function valuesOf(item, values) {
  const out = {};
  for (const r of item.table.rows) {
    out[r.id] = r.cells.map((c, j) => {
      if (!c) return null;
      if (c.given !== undefined) return num(c.given);
      if (c.auto) return null;
      return num(values?.[r.id]?.[j]);
    });
  }
  return out;
}
function filledAll(item, values) {
  for (const r of item.table.rows) {
    for (let j = 0; j < r.cells.length; j++) {
      const c = r.cells[j];
      if (c?.input && String(values?.[r.id]?.[j] ?? '').trim() === '') return false;
    }
  }
  return true;
}
const col = (phi, id) => phi.cols.indexOf(id);

// ---------- one step of each method ----------

function stepScalar(phi, x) {
  return evalAt(phi.phi, { [phi.v || 'x']: x });
}
function stepSecant(phi, x0, x1) {
  const v = phi.v || 'x';
  const f0 = evalAt(phi.f, { [v]: x0 });
  const f1 = evalAt(phi.f, { [v]: x1 });
  const d = sub(f1, f0);
  if (d === null || fv(d) === 0) return null;
  return sub(x1, div(mul(f1, sub(x1, x0)), d));
}
function stepLinear(phi, x, kind) {
  const A = phi.A.map((r) => r.map(num));
  const b = phi.b.map(num);
  const n = A.length;
  const y = x.slice();
  const out = [];
  for (let i = 0; i < n; i++) {
    let s = b[i];
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      const xj = kind === 'gs' && j < i ? out[j] : x[j];
      s = sub(s, mul(A[i][j], xj));
    }
    out[i] = div(s, A[i][i]);
    if (kind === 'gs') y[i] = out[i];
  }
  return out;
}
const fAt = (phi, tq, u) => evalAt(phi.f, { t: tq, u }, ['t', 'u']);
// Solves u = c + w·f(t, u) (implicit schemes): exactly if f is affine in u.
function solveImplicit(phi, tq, c, w) {
  const f0 = fAt(phi, tq, isQ(c) ? new Q(0) : 0);
  const f1 = fAt(phi, tq, isQ(c) ? new Q(1) : 1);
  const f2 = fAt(phi, tq, isQ(c) ? new Q(2) : 2);
  if (f0 === null || f1 === null || f2 === null) return null;
  const a = sub(f1, f0);
  if (same(sub(f2, f1), a, 1e-12)) {
    // u = c + w(a u + f0) → u = (c + w f0)/(1 − w a)
    return div(add(c, mul(w, f0)), sub(isQ(w) ? new Q(1) : 1, mul(w, a)));
  }
  let u = fv(c);
  for (let k = 0; k < 60; k++) {
    const F = u - fv(c) - fv(w) * fv(fAt(phi, fv(tq), u));
    const h = 1e-7 * Math.max(1, Math.abs(u));
    const dF = 1 - fv(w) * (fv(fAt(phi, fv(tq), u + h)) - fv(fAt(phi, fv(tq), u - h))) / (2 * h);
    const du = F / dF;
    u -= du;
    if (Math.abs(du) < 1e-15 * Math.max(1, Math.abs(u))) break;
  }
  return u;
}
// One ODE step from (t, u): {k1, k2, u} (k1, k2 for Heun / RK).
export function stepOde(phi, tq, u, k1In = null, k2In = null) {
  const h = num(phi.h);
  const t1 = add(tq, h);
  const half = div(h, isQ(h) ? new Q(2) : 2);
  switch (phi.scheme) {
    case 'EP': return { t: t1, u: add(u, mul(h, fAt(phi, tq, u))) };
    case 'ER': return { t: t1, u: solveImplicit(phi, t1, u, h) };
    case 'CN': return { t: t1, u: solveImplicit(phi, t1, add(u, mul(half, fAt(phi, tq, u))), half) };
    case 'Heun': {
      const k1 = fAt(phi, tq, u);
      const k1u = k1In ?? k1;
      const k2 = fAt(phi, t1, add(u, mul(h, k1u)));
      const k2u = k2In ?? k2;
      return { t: t1, k1, k2, u: add(u, mul(half, add(k1u, k2u))) };
    }
    case 'RK4': {
      const ht = fv(h);
      const T = fv(tq);
      const U = fv(u);
      const f = (a, b) => fv(fAt(phi, a, b));
      const a1 = f(T, U);
      const a2 = f(T + ht / 2, U + (ht / 2) * a1);
      const a3 = f(T + ht / 2, U + (ht / 2) * a2);
      const a4 = f(T + ht, U + ht * a3);
      return { t: t1, k1: a1, k2: a2, u: U + (ht / 6) * (a1 + 2 * a2 + 2 * a3 + a4) };
    }
    default: throw new Error(`ode: schéma ${phi.scheme}`);
  }
}
function residual(phi, x) {
  const A = phi.A.map((r) => r.map(num));
  const b = phi.b.map(num);
  return A.map((row, i) => row.reduce((s, a, j) => sub(s, mul(a, x[j])), b[i]));
}
function stepGradient(phi, x, r, alpha) {
  return x.map((xi, i) => add(xi, mul(alpha, r[i])));
}
function alphaOf(phi, r) {
  if (phi.step !== 'optimal' && phi.step !== undefined) return num(phi.step);
  const A = phi.A.map((row) => row.map(num));
  const Ar = A.map((row) => row.reduce((s, a, j) => add(s, mul(a, r[j])), isQ(r[0]) ? new Q(0) : 0));
  const rr = r.reduce((s, x) => add(s, mul(x, x)), isQ(r[0]) ? new Q(0) : 0);
  const rAr = r.reduce((s, x, i) => add(s, mul(x, Ar[i])), isQ(r[0]) ? new Q(0) : 0);
  return div(rr, rAr);
}
const sgn = (x) => (x === null ? null : Math.sign(fv(x)));
export const signText = (x) => (sgn(x) > 0 ? '+' : sgn(x) < 0 ? '−' : '0');
const signOf = (tq) => {
  const s = String(tq ?? '').trim();
  return s === '+' ? 1 : s === '−' || s === '-' ? -1 : s === '0' ? 0 : null;
};

// ---------- reference rows ----------

// Rows of exact (or float) values {colId: value}, n rows.
export function referenceRows(phi, n) {
  const rows = [];
  const derive = (r, k) => {
    if (phi.alpha !== undefined && r.x !== undefined) r.err = absv(sub(r.x, num(phi.alpha)));
    if (phi.f && r.x !== undefined && phi.kind === 'scalar') r.fx = evalAt(phi.f, { [phi.v || 'x']: r.x });
    if (k >= 1 && r.x !== undefined) {
      r.inc = absv(sub(r.x, rows[k - 1].x));
      if (k >= 2) for (const p of [1, 2, 3]) r[`r${p}`] = ratio(r.inc, rows[k - 1].inc, p);
    }
  };
  switch (phi.kind) {
    case 'scalar': {
      let x = num(phi.x0);
      for (let k = 0; k < n; k++) {
        const r = { x };
        rows.push(r);
        derive(r, k);
        x = stepScalar(phi, x);
      }
      return rows;
    }
    case 'secant': {
      const xs = [num(phi.x0), num(phi.x1)];
      for (let k = 2; k < n; k++) xs.push(stepSecant(phi, xs[k - 2], xs[k - 1]));
      xs.slice(0, n).forEach((x, k) => { const r = { x }; rows.push(r); derive(r, k); });
      return rows;
    }
    case 'bisect': {
      let a = num(phi.a0);
      let b = num(phi.b0);
      for (let k = 0; k < n; k++) {
        const x = div(add(a, b), isQ(a) ? new Q(2) : 2);
        const fx = evalAt(phi.f, { [phi.v || 'x']: x });
        rows.push({ a, b, x, sign: fx, fx });
        const fa = evalAt(phi.f, { [phi.v || 'x']: a });
        if (sgn(fx) === sgn(fa)) a = x; else b = x;
      }
      return rows;
    }
    case 'jacobi': case 'gs': {
      let x = phi.x0.map(num);
      for (let k = 0; k < n; k++) {
        const r = Object.fromEntries(x.map((v, i) => [`x${i + 1}`, v]));
        r.res = residual(phi, x).reduce((m, v) => Math.max(m, Math.abs(fv(v))), 0);
        rows.push(r);
        x = stepLinear(phi, x, phi.kind);
      }
      return rows;
    }
    case 'ode': {
      let tq = num(phi.t0);
      let u = num(phi.u0);
      rows.push({ t: tq, u });
      for (let k = 1; k < n; k++) {
        const s = stepOde(phi, tq, u);
        rows.push(s);
        tq = s.t;
        u = s.u;
      }
      return rows;
    }
    case 'gradient': {
      let x = phi.x0.map(num);
      for (let k = 0; k < n; k++) {
        const r = residual(phi, x);
        const alpha = alphaOf(phi, r);
        const row = { alpha };
        x.forEach((v, i) => { row[`x${i + 1}`] = v; });
        r.forEach((v, i) => { row[`r${i + 1}`] = v; });
        rows.push(row);
        x = stepGradient(phi, x, r, alpha);
      }
      return rows;
    }
    case 'divdiff': {
      const xs = phi.xs.map(num);
      const c = phi.ys.map((y) => [num(y)]);
      for (let i = 0; i < xs.length; i++) {
        for (let k = 1; k <= i; k++) c[i][k] = div(sub(c[i][k - 1], c[i - 1][k - 1]), sub(xs[i], xs[i - k]));
      }
      return xs.map((x, i) => Object.fromEntries([['x', x], ...c[i].map((v, k) => [`d${k}`, v])]));
    }
    default: throw new Error(`iter: phi ${phi.kind}`);
  }
}

function ratio(inc, prevInc, p) {
  if (inc === null || prevInc === null || inc === undefined || prevInc === undefined || fv(prevInc) === 0) return null;
  let d = prevInc;
  for (let k = 1; k < p; k++) d = mul(d, prevInc);
  return div(inc, d);
}

// ---------- the check ----------

export function checkNum(item, values) {
  const phi = item.judge.phi;
  const tol = phi.tol ?? 1e-6;
  const sig = phi.sig ?? 2;
  const g = valuesOf(item, values);
  const rows = item.table.rows;
  const cells = {};
  let rule = null;
  let message = null;
  const vec = (rowVals, prefix, m) => Array.from({ length: m }, (_, i) => rowVals[`${prefix}${i + 1}`] ?? null);
  const want = rows.map(() => ({})); // expected value of each column, per row
  const mine = rows.map((r) => Object.fromEntries(phi.cols.map((c, j) => [c, g[r.id][j]])));
  const n = phi.A ? phi.A.length : 0;

  rows.forEach((r, k) => {
    const w = want[k];
    const prev = k > 0 ? mine[k - 1] : null;
    switch (phi.kind) {
      case 'scalar':
        w.x = k === 0 ? num(phi.x0) : stepScalar(phi, prev.x);
        break;
      case 'secant':
        w.x = k === 0 ? num(phi.x0) : k === 1 ? num(phi.x1) : stepSecant(phi, mine[k - 2].x, prev.x);
        if (k >= 2 && !rule && mine[k].x !== null && !same(mine[k].x, w.x, tol) && k >= 3) {
          const frozen = stepSecant(phi, num(phi.x0), prev.x);
          if (same(mine[k].x, frozen, tol)) { rule = 'n_secant_update'; message = t('La sécante utilise les deux derniers points.'); }
        }
        break;
      case 'bisect': {
        if (k === 0) { w.a = num(phi.a0); w.b = num(phi.b0); } else if (prev.a !== null && prev.b !== null && prev.x !== null) {
          const fa = evalAt(phi.f, { [phi.v || 'x']: prev.a });
          const fx = evalAt(phi.f, { [phi.v || 'x']: prev.x });
          if (sgn(fa) === sgn(fx)) { w.a = prev.x; w.b = prev.b; } else { w.a = prev.a; w.b = prev.x; }
          if (!rule && mine[k].a !== null && mine[k].b !== null && !(same(mine[k].a, w.a, tol) && same(mine[k].b, w.b, tol))) {
            const other = sgn(fa) === sgn(fx) ? [prev.a, prev.x] : [prev.x, prev.b];
            if (same(mine[k].a, other[0], tol) && same(mine[k].b, other[1], tol)) { rule = 'n_bisect_wrong_half'; message = t('Garde la moitié où f change de signe : compare le signe de f(x) à celui de f(a).'); }
          }
        }
        w.x = mine[k].a !== null && mine[k].b !== null ? div(add(mine[k].a, mine[k].b), isQ(mine[k].a) ? new Q(2) : 2) : null;
        w.sign = mine[k].x !== null ? sgn(evalAt(phi.f, { [phi.v || 'x']: mine[k].x })) : null;
        break;
      }
      case 'jacobi': case 'gs': {
        const xPrev = k === 0 ? phi.x0.map(num) : vec(prev, 'x', n);
        if (k === 0) xPrev.forEach((v, i) => { w[`x${i + 1}`] = v; });
        else if (xPrev.every((v) => v !== null)) {
          // Gauss-Seidel uses the student's components of this row.
          const A = phi.A.map((rw) => rw.map(num));
          const b = phi.b.map(num);
          const cur = vec(mine[k], 'x', n);
          for (let i = 0; i < n; i++) {
            let s = b[i];
            for (let j = 0; j < n; j++) {
              if (j === i) continue;
              s = sub(s, mul(A[i][j], phi.kind === 'gs' && j < i ? cur[j] : xPrev[j]));
            }
            w[`x${i + 1}`] = div(s, A[i][i]);
          }
          if (!rule && phi.kind === 'jacobi') {
            const gsRow = stepLinear(phi, xPrev, 'gs');
            if (cur.every((v, i) => v !== null && same(v, gsRow[i], tol)) && !cur.every((v, i) => same(v, w[`x${i + 1}`], tol))) {
              rule = 'n_jacobi_uses_new'; message = t('Jacobi n\'utilise que les valeurs de l\'itération précédente.');
            }
          }
        }
        break;
      }
      case 'ode': {
        if (k === 0) { w.t = num(phi.t0); w.u = num(phi.u0); break; }
        if (prev.t === null || prev.u === null) break;
        const s = stepOde(phi, prev.t, prev.u, mine[k].k1 ?? null, mine[k].k2 ?? null);
        Object.assign(w, s);
        if (phi.scheme === 'Heun' && col(phi, 'k2') >= 0 && mine[k].k1 !== null) {
          // k2 from the student's k1.
          const h = num(phi.h);
          w.k2 = fAt(phi, add(prev.t, h), add(prev.u, mul(h, mine[k].k1)));
          if (!rule && mine[k].k2 !== null && !same(mine[k].k2, w.k2, tol)) {
            const noH = fAt(phi, add(prev.t, h), add(prev.u, mine[k].k1));
            if (same(mine[k].k2, noH, tol)) { rule = 'n_heun_k2'; message = t('La prédiction est un pas d\'Euler : u + h·k₁.'); }
          }
        }
        if (!rule && mine[k].u !== null && w.u !== null && !same(mine[k].u, w.u, tol)) {
          const h = num(phi.h);
          if (phi.scheme === 'ER' || phi.scheme === 'CN') {
            const ep = add(prev.u, mul(h, fAt(phi, prev.t, prev.u)));
            if (same(mine[k].u, ep, tol)) { rule = 'n_implicit_as_explicit'; message = t('Ce schéma est implicite : f est évaluée au nouveau point, il faut résoudre une équation en uₙ₊₁.'); }
          }
          if (phi.scheme === 'EP') {
            const shifted = add(prev.u, mul(h, fAt(phi, add(prev.t, h), prev.u)));
            if (same(mine[k].u, shifted, tol) && !same(shifted, w.u, tol)) { rule = 'n_euler_time_index'; message = t('Euler progressif : le temps et la valeur du même instant tₙ.'); }
          }
        }
        break;
      }
      case 'gradient': {
        const x = k === 0 ? phi.x0.map(num) : null;
        if (k === 0) x.forEach((v, i) => { w[`x${i + 1}`] = v; });
        else {
          const xp = vec(prev, 'x', n);
          const rp = vec(prev, 'r', n);
          const ap = prev.alpha ?? (phi.step !== 'optimal' && phi.step !== undefined ? num(phi.step) : null);
          if ([...xp, ...rp, ap].every((v) => v !== null)) {
            const nx = stepGradient(phi, xp, rp, ap);
            nx.forEach((v, i) => { w[`x${i + 1}`] = v; });
            if (!rule) {
              const back = xp.map((xi, i) => sub(xi, mul(ap, rp[i])));
              const cur = vec(mine[k], 'x', n);
              if (cur.every((v, i) => v !== null && same(v, back[i], tol)) && !cur.every((v, i) => same(v, nx[i], tol))) {
                rule = 'n_gradient_sign'; message = t('r = b − Ax = −∇Φ : on avance dans le sens de r, x + αr.');
              }
            }
          }
        }
        const xs = vec(mine[k], 'x', n);
        if (xs.every((v) => v !== null)) residual(phi, xs).forEach((v, i) => { w[`r${i + 1}`] = v; });
        const rs = vec(mine[k], 'r', n);
        if (rs.every((v) => v !== null) && col(phi, 'alpha') >= 0) {
          w.alpha = alphaOf(phi, rs);
          if (!rule && mine[k].alpha !== null && !same(mine[k].alpha, w.alpha, tol) && same(mine[k].alpha, div(isQ(w.alpha) ? new Q(1) : 1, w.alpha), tol)) {
            rule = 'n_optimal_step_inverted'; message = t('α = (r·r)/(r·Ar), pas l\'inverse.');
          }
        }
        break;
      }
      case 'divdiff': {
        const xs = phi.xs.map(num);
        w.x = xs[k];
        w.d0 = num(phi.ys[k]);
        for (let o = 1; o <= k; o++) {
          const a = mine[k][`d${o - 1}`];
          const b = mine[k - 1][`d${o - 1}`];
          w[`d${o}`] = a !== null && b !== null ? div(sub(a, b), sub(xs[k], xs[k - o])) : null;
          if (!rule && o >= 2 && mine[k][`d${o}`] !== null && w[`d${o}`] !== null && !same(mine[k][`d${o}`], w[`d${o}`], tol)) {
            const bad = div(sub(a, b), sub(xs[k], xs[k - 1]));
            if (same(mine[k][`d${o}`], bad, tol)) { rule = 'n_divdiff_denominator'; message = t('On divise par l\'écart des abscisses extrêmes.'); }
          }
        }
        break;
      }
      default: throw new Error(`iter: phi ${phi.kind}`);
    }
    // Derived columns, from the student's iterates.
    const x = mine[k].x;
    if (phi.alpha !== undefined && x !== undefined) w.err = x !== null ? absv(sub(x, num(phi.alpha))) : null;
    if (phi.f && phi.kind === 'scalar') w.fx = x !== null ? evalAt(phi.f, { [phi.v || 'x']: x }) : null;
    if (k >= 1 && x !== undefined) {
      w.inc = x !== null && prev.x !== null ? absv(sub(x, prev.x)) : null;
      const prevInc = k >= 2 && prev.x !== null && mine[k - 2].x !== null ? absv(sub(prev.x, mine[k - 2].x)) : null;
      for (const p of [1, 2, 3]) w[`r${p}`] = ratio(w.inc, prevInc, p);
    }
    if (phi.kind === 'jacobi' || phi.kind === 'gs') {
      const xs = vec(mine[k], 'x', n);
      w.res = xs.every((v) => v !== null) ? residual(phi, xs).reduce((m, v) => Math.max(m, Math.abs(fv(v))), 0) : null;
    }
  });

  const DERIVED = new Set(['inc', 'r1', 'r2', 'r3', 'err', 'fx', 'res']);
  rows.forEach((r, k) => {
    cells[r.id] = r.cells.map((c, j) => {
      if (!c?.input) return null;
      const id = phi.cols[j];
      if (id === 'sign') return signOf(values?.[r.id]?.[j]) !== null && signOf(values?.[r.id]?.[j]) === want[k].sign;
      const v = mine[k][id];
      const w = want[k][id];
      if (DERIVED.has(id)) return sameSig(v, w, sig) || same(v, w, tol);
      return same(v, w, tol);
    });
  });
  const ok = filledAll(item, values) && Object.values(cells).every((row) => row.every((x) => x !== false));
  return { ok, cells, rule, message };
}

// The columns the app computes ({auto: true}), from the student's cells.
export function autoCells(item, values) {
  const phi = item.judge.phi;
  const out = {};
  const g = valuesOf(item, values);
  const mine = item.table.rows.map((r) => Object.fromEntries(phi.cols.map((c, j) => [c, g[r.id][j]])));
  item.table.rows.forEach((r, k) => {
    out[r.id] = r.cells.map((c, j) => {
      if (!c?.auto) return null;
      const id = phi.cols[j];
      const x = mine[k].x;
      let v = null;
      if (id === 'inc' && k >= 1) v = x !== null && mine[k - 1].x !== null ? absv(sub(x, mine[k - 1].x)) : null;
      else if (/^r[123]$/.test(id) && phi.kind !== 'gradient' && k >= 2) {
        const inc = x !== null && mine[k - 1].x !== null ? absv(sub(x, mine[k - 1].x)) : null;
        const pi = mine[k - 1].x !== null && mine[k - 2].x !== null ? absv(sub(mine[k - 1].x, mine[k - 2].x)) : null;
        v = ratio(inc, pi, Number(id[1]));
      } else if (id === 'err' && x !== null && x !== undefined) v = absv(sub(x, num(phi.alpha)));
      else if (id === 'fx' && x !== null && x !== undefined) v = evalAt(phi.f, { [phi.v || 'x']: x });
      else if (id === 'res') {
        const n = phi.A.length;
        const xs = Array.from({ length: n }, (_, i) => mine[k][`x${i + 1}`]);
        v = xs.every((y) => y !== null) ? residual(phi, xs).reduce((m, y) => Math.max(m, Math.abs(fv(y))), 0) : null;
      }
      return v === null || v === undefined ? null : (isQ(v) && Math.abs(v.d) <= 10000 ? fmt(v) : expText(v, 3));
    });
  });
  return out;
}

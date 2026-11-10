// Tools of module N, part c (interpolation and least squares, step U9):
// interpolants evaluated in double precision (Lagrange, piecewise linear,
// natural cubic spline), Chebyshev nodes, and the error tables of the
// catalogue recomputed (max-norm on a fine grid).

import { Q } from '../../math/rational.js';
import { expText } from '../../judges/iter-num.js';

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const R = (s) => String(s).replace(/-/g, '−');
export const fq = (x) => R(String(q(x)));
export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export { expText };

// Lagrange form evaluated at x (doubles).
export function lagrangeEval(xs, ys, x) {
  let p = 0;
  for (let i = 0; i < xs.length; i++) {
    let phi = 1;
    for (let j = 0; j < xs.length; j++) if (j !== i) phi *= (x - xs[j]) / (xs[i] - xs[j]);
    p += ys[i] * phi;
  }
  return p;
}

export const equiNodes = (n, a, b) => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n);
export const chebNodes = (n, a, b) => Array.from({ length: n + 1 }, (_, i) => (a + b) / 2 + ((b - a) / 2) * Math.cos(((2 * i + 1) * Math.PI) / (2 * (n + 1))));

// max |f − g| on [a ; b], on `m` + 1 points.
export function maxErr(f, g, a, b, m = 20000) {
  let e = 0;
  for (let k = 0; k <= m; k++) {
    const x = a + ((b - a) * k) / m;
    e = Math.max(e, Math.abs(f(x) - g(x)));
  }
  return e;
}

// Piecewise linear interpolant on nodes xs.
export function p1h(xs, ys, x) {
  for (let i = 0; i < xs.length - 1; i++) {
    if (xs[i] <= x && x <= xs[i + 1]) return ys[i] + ((ys[i + 1] - ys[i]) * (x - xs[i])) / (xs[i + 1] - xs[i]);
  }
  return NaN;
}

// Natural cubic spline through (xs, ys): returns s(x).
export function naturalSpline(xs, ys) {
  const n = xs.length - 1;
  const h = Array.from({ length: n }, (_, i) => xs[i + 1] - xs[i]);
  // Second derivatives M_0 = M_n = 0; tridiagonal system for M_1 … M_{n−1}.
  const M = new Array(n + 1).fill(0);
  if (n >= 2) {
    const a = []; const b = []; const c = []; const d = [];
    for (let i = 1; i < n; i++) {
      a.push(h[i - 1]); b.push(2 * (h[i - 1] + h[i])); c.push(h[i]);
      d.push(6 * ((ys[i + 1] - ys[i]) / h[i] - (ys[i] - ys[i - 1]) / h[i - 1]));
    }
    const m = n - 1;
    for (let i = 1; i < m; i++) { const w = a[i] / b[i - 1]; b[i] -= w * c[i - 1]; d[i] -= w * d[i - 1]; }
    const sol = new Array(m);
    sol[m - 1] = d[m - 1] / b[m - 1];
    for (let i = m - 2; i >= 0; i--) sol[i] = (d[i] - c[i] * sol[i + 1]) / b[i];
    for (let i = 1; i < n; i++) M[i] = sol[i - 1];
  }
  return (x) => {
    let i = Math.min(n - 1, Math.max(0, xs.findIndex((t, k) => k < n && x <= xs[k + 1])));
    if (i < 0) i = n - 1;
    const t0 = xs[i]; const t1 = xs[i + 1]; const hi = h[i];
    const A = (t1 - x) / hi; const B = (x - t0) / hi;
    return A * ys[i] + B * ys[i + 1] + ((A ** 3 - A) * M[i] + (B ** 3 - B) * M[i + 1]) * (hi * hi) / 6;
  };
}

// Runge: 1/(1 + x²) on [−5 ; 5], equispaced and Chebyshev nodes.
export function rungeRows(ns = [4, 8, 12, 16]) {
  const f = (x) => 1 / (1 + x * x);
  return ns.map((n) => {
    const e = equiNodes(n, -5, 5);
    const c = chebNodes(n, -5, 5);
    return {
      n,
      equi: maxErr(f, (x) => lagrangeEval(e, e.map(f), x), -5, 5),
      cheb: maxErr(f, (x) => lagrangeEval(c, c.map(f), x), -5, 5),
    };
  });
}

export function p1Rows(ns = [4, 8, 16, 32]) {
  return ns.map((n) => {
    const xs = equiNodes(n, 0, Math.PI);
    const h = Math.PI / n;
    return { n, err: maxErr(Math.sin, (x) => p1h(xs, xs.map(Math.sin), x), 0, Math.PI, 40000), bound: (h * h) / 8 };
  });
}

export function splineRows(ns = [4, 8, 16, 32]) {
  return ns.map((n) => {
    const xs = equiNodes(n, 0, Math.PI);
    const s = naturalSpline(xs, xs.map(Math.sin));
    return { n, err: maxErr(Math.sin, s, 0, Math.PI, 40000) };
  });
}

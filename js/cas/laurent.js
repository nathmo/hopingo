// Laurent coefficients and residues (step U10, module C; re-exported by
// js/cas/series.js). The coefficients of f around z₀ are the Fourier
// coefficients of f on a small circle (Cauchy's formula, trapezoid rule):
//   a_k = (1/2πi) ∮ f(z) (z − z₀)^(−k−1) dz = (1/N) Σ_j f(z₀ + r e^(iθⱼ)) r^(−k) e^(−ikθⱼ),
// exact up to aliasing (a_(k ± N) r^(±N)), which is negligible for N = 256
// on a circle that leaves out every other singularity. The radius is
// shrunk until two radii agree. f is evaluated as a complex (evalComplex),
// so poles in ℚ(i), e^(iαz), sin(1/(2i − 3z)), z^a with its branch all work.
//
//   laurentCoefs(node, v, z0, {from, to, env, r}) → [{re, im}] for k = from … to
//   residue(node, v, z0, {env, r}) → {re, im, exact?: Q}     the coefficient a₋₁
//   singularityType(node, v, z0, {env, r}) → {kind: 'removable'|'pole'|'essential', order?}
//   zeroOrder(node, v, z0, {env}) → order of the zero of f at z₀ (0 if f(z₀) ≠ 0)
// z0: a number, {re, im}, a CQ or a node (2i/3, 1 + i). env: values of the
// other letters (t in e^(zt)). Exact residues: at a rational real point, by
// the series of js/cas/series.js when its coefficients are exact.

import { Q } from '../math/rational.js';
import { CQ, C, evalComplex, exactComplex, cabs } from './complex.js';
import { series } from './series.js';
import { t } from '../i18n.js';

const N = 256;

export function toC(z0) {
  if (z0 === undefined || z0 === null) return C(0);
  if (typeof z0 === 'number') return C(z0);
  if (z0 instanceof CQ) return z0.toFloat();
  if (z0 instanceof Q) return C(z0.valueOf());
  if (typeof z0 === 'object' && 're' in z0 && 'im' in z0 && typeof z0.re === 'number') return C(z0.re, z0.im);
  if (typeof z0 === 'object' && z0.t) {
    const e = exactComplex(z0, {});
    if (e) return e.toFloat();
    const z = evalComplex(z0, {});
    if (z) return z;
  }
  throw new Error(t('Point de développement illisible.'));
}

// Samples f(z₀ + r e^(iθⱼ)), or null if f is undefined somewhere on the circle.
function circle(node, v, z, r, env) {
  const out = [];
  for (let j = 0; j < N; j++) {
    const th = (2 * Math.PI * j) / N;
    const w = C(z.re + r * Math.cos(th), z.im + r * Math.sin(th));
    const f = evalComplex(node, { ...env, [v]: w });
    if (!f || !Number.isFinite(f.re) || !Number.isFinite(f.im)) return null;
    out.push(f);
  }
  return out;
}

// Fourier coefficients b_k = a_k r^k of the samples, k = from … to.
function fourier(samples, from, to) {
  const out = [];
  for (let k = from; k <= to; k++) {
    let re = 0;
    let im = 0;
    for (let j = 0; j < N; j++) {
      const th = (2 * Math.PI * j * k) / N;
      const c = Math.cos(th);
      const s = Math.sin(th);
      // f · e^(−ikθ)
      re += samples[j].re * c + samples[j].im * s;
      im += samples[j].im * c - samples[j].re * s;
    }
    out.push(C(re / N, im / N));
  }
  return out;
}

const RADII = [0.5, 0.3, 0.17, 0.1, 0.06, 0.035, 0.02, 0.012, 0.007];

// a_k for k = from … to, at the first radius where two radii agree.
export function laurentCoefs(node, v = 'z', z0 = 0, { from = -1, to = -1, env = {}, r = null } = {}) {
  const z = toC(z0);
  const radii = r ? [r, r * 0.6, r * 0.36] : RADII;
  let prev = null;
  let prevR = null;
  for (const rad of radii) {
    const s = circle(node, v, z, rad, env);
    if (!s) { prev = null; continue; }
    const b = fourier(s, from, to);
    const a = b.map((x, i) => { const k = from + i; const f = rad ** -k; return C(x.re * f, x.im * f); });
    if (prev) {
      const scale = 1 + Math.max(...a.map(cabs), ...prev.map(cabs));
      const agree = a.every((x, i) => Math.abs(x.re - prev[i].re) <= 1e-8 * scale && Math.abs(x.im - prev[i].im) <= 1e-8 * scale);
      if (agree) return a;
    }
    prev = a;
    prevR = rad;
  }
  if (prev && prevR) return prev;
  throw new Error(t('Développement de Laurent impossible ici.'));
}

const tidy = (x) => (Math.abs(x) < 1e-11 ? 0 : x);

export function residue(node, v = 'z', z0 = 0, opts = {}) {
  // Exact at a rational real point when the series is exact.
  let exact = null;
  const z = toC(z0);
  if (z.im === 0 && !Object.keys(opts.env || {}).length) {
    const q = z0 instanceof Q ? z0 : Number.isInteger(z.re) ? new Q(z.re) : null;
    if (q) {
      try {
        const s = series(node, v, q, 1);
        const c = s.coef(-1);
        if (c instanceof Q) exact = c;
      } catch { exact = null; }
    }
  }
  const [a] = laurentCoefs(node, v, z0, { ...opts, from: -1, to: -1 });
  const out = C(tidy(a.re), tidy(a.im));
  if (exact) out.exact = exact;
  return out;
}

// Removable, pole of order m, or essential: from the Fourier coefficients on
// a small circle, b_k = a_k r^k. A pole of order m has b_k ≈ 0 for k < −m;
// an essential singularity has b_(−k) far from 0 for many k (r^(−k)/k! at
// small r).
export function singularityType(node, v = 'z', z0 = 0, { env = {}, r = null, depth = 24 } = {}) {
  const z = toC(z0);
  const radii = r ? [r] : [0.05, 0.03, 0.015];
  for (const rad of radii) {
    const s = circle(node, v, z, rad, env);
    if (!s) continue;
    const b = fourier(s, -depth, 0);
    const big = Math.max(...b.map(cabs), ...s.map(cabs));
    const tol = 1e-9 * big;
    // b[i] is k = −depth + i.
    let low = null;
    for (let i = 0; i < b.length; i++) if (cabs(b[i]) > tol) { low = -depth + i; break; }
    if (low === null || low >= 0) return { kind: 'removable' };
    if (low <= -depth + 2) return { kind: 'essential' };
    return { kind: 'pole', order: -low };
  }
  throw new Error(t('Singularité impossible à classer ici.'));
}

// Order of the zero of f at z₀: the first k ≥ 0 with a_k ≠ 0 (f holomorphic at z₀).
export function zeroOrder(node, v = 'z', z0 = 0, { env = {}, max = 12 } = {}) {
  const a = laurentCoefs(node, v, z0, { from: 0, to: max, env, r: 0.2 });
  const scale = 1 + Math.max(...a.map(cabs));
  for (let k = 0; k < a.length; k++) if (cabs(a[k]) > 1e-8 * scale) return k;
  return Infinity;
}

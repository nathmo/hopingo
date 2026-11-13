// The table of the power method (step U8, catalogue M, m-power-method;
// the `iter` judge of spec §5.2 with phi {kind: 'power'}). Reused by module
// N (step U9). One row per step k, each cell judged from the student's own
// cells (error carried forward):
//   y_k     row 0: y0; row k ≥ 1: z_{k−1}/μ_{k−1} (the student's z and μ)
//   z_k     A·y_k, or with inverse: the solution of (A − σI)z = y_k
//   μ_k     the entry of the student's z_k of largest modulus (the first of
//           two equal ones), so that y_{k+1} has a 1 there.
// phi: {kind: 'power', A: [['3', '1'], ['1', '3']], y0: ['1', '0'],
//       shift?: '0', inverse?: false, tol?: 1e-6}
// Row cells: n cells of y, n cells of z, then μ (cell = {given} | {input:
// true} | null). Numbers are exact (fractions); a decimal is accepted within
// tol, relative. checkPower(item, values) → {ok, cells, rule, message}.

import { Q } from '../math/rational.js';
import { tryParse } from '../cas/parse.js';
import { exactValue } from '../cas/normal.js';
import { evalFloat } from '../cas/numeric.js';
import * as MX from '../cas/matrix.js';
import { t } from '../i18n.js';

const num = (t) => {
  if (t === null || t === undefined || String(t).trim() === '') return null;
  const n = tryParse(String(t).replace(/−/g, '-'));
  if (!n) return null;
  const q = exactValue(n);
  if (q) return q;
  const f = evalFloat(n, {});
  return Number.isFinite(f) ? f : null;
};
const fv = (x) => (x === null ? NaN : typeof x === 'number' ? x : x.valueOf());
const same = (a, b, tol) => {
  if (a === null || b === null || a === undefined || b === undefined) return false;
  if (a instanceof Q && b instanceof Q) return a.eq(b) || Math.abs(fv(a) - fv(b)) <= tol * (1 + Math.abs(fv(b)));
  return Math.abs(fv(a) - fv(b)) <= tol * (1 + Math.abs(fv(b)));
};
const qOf = (x) => (x instanceof Q ? x : null);

// The entry of largest modulus (the first of equal ones).
export function maxEntry(z) {
  let best = null;
  for (const x of z) if (x !== null && (best === null || Math.abs(fv(x)) > Math.abs(fv(best)) + 1e-12)) best = x;
  return best;
}

// The matrix the method multiplies by: A, or (A − σI)⁻¹ (exact).
function operator(phi) {
  const A = MX.mat(phi.A.map((r) => r.map(String)));
  if (!phi.inverse) return A;
  const s = MX.q(String(phi.shift ?? '0'));
  return MX.inverse(A.map((r, i) => r.map((x, j) => (i === j ? x.sub(s) : x))));
}

// z = M·y, exact when every entry of y is a fraction, else in floats.
// (Exact fractions overflow after many steps: then floats.)
function apply(M, y) {
  if (y.some((x) => x === null)) return y.map(() => null);
  if (y.every((x) => x instanceof Q)) { try { return MX.matVec(M, y); } catch { /* floats */ } }
  return M.map((r) => r.reduce((s, a, k) => s + fv(a) * fv(y[k]), 0));
}
function divide(z, mu) {
  if (z.some((x) => x === null) || mu === null || fv(mu) === 0) return z.map(() => null);
  return z.map((x) => { try { return x instanceof Q && mu instanceof Q ? x.div(mu) : fv(x) / fv(mu); } catch { return fv(x) / fv(mu); } });
}

export function checkPower(item, values) {
  const phi = item.judge.phi;
  const tol = phi.tol ?? 1e-6;
  const n = phi.A.length;
  const M = operator(phi);
  const cells = {};
  let message = null;
  let rule = null;
  let prev = null;
  let filled = true;
  for (const r of item.table.rows) {
    const vals = r.cells.map((c, j) => {
      if (!c) return null;
      const cell = c.given !== undefined ? c.given : values?.[r.id]?.[j];
      if (c.input && (cell === null || cell === undefined || String(cell).trim() === '')) filled = false;
      return num(cell);
    });
    const y = vals.slice(0, n);
    const z = vals.slice(n, 2 * n);
    const mu = vals[2 * n];
    const wantY = prev ? divide(prev.z, prev.mu) : phi.y0.map((x) => num(x));
    const wantZ = apply(M, y);
    const wantMu = maxEntry(z);
    cells[r.id] = r.cells.map((c, j) => {
      if (!c?.input) return null;
      if (j < n) return same(y[j], wantY[j], tol);
      if (j < 2 * n) return same(z[j - n], wantZ[j - n], tol);
      return same(mu, wantMu, tol);
    });
    // Divided by the norm, or by the wrong entry.
    if (prev && !message && r.cells.slice(0, n).some((c) => c?.input) && !wantY.every((w, k) => same(y[k], w, tol))) {
      const z0 = prev.z;
      if (z0.every((x) => x !== null)) {
        const nz = Math.hypot(...z0.map(fv));
        if (y.every((x, k) => x !== null && Math.abs(fv(x) - fv(z0[k]) / nz) < 1e-6)) message = t('Le cours divise par la composante de plus grand module (μ), pas par la norme : ainsi y a un 1 et μ tend vers λ₁.');
      }
    }
    if (!message && r.cells[2 * n]?.input && mu !== null && wantMu !== null && !same(mu, wantMu, tol) && z.some((x) => same(mu, x, tol))) {
      message = t('μ est la composante de plus grand module de z (en valeur absolue), avec son signe.');
    }
    if (!message && phi.inverse && r.cells.slice(n, 2 * n).some((c) => c?.input) && y.every((x) => x !== null)) {
      const direct = apply(MX.mat(phi.A.map((rw) => rw.map(String))), y);
      if (z.every((x, k) => same(x, direct[k], tol))) { message = t('Pour la puissance inverse, z résout (A − σI)z = y : on ne multiplie pas par A.'); rule = 'm_inverse_power_value'; }
    }
    prev = { y, z, mu };
  }
  const ok = filled && Object.values(cells).every((row) => row.every((x) => x !== false));
  return { ok, cells, rule, message };
}

// The reference table: rows of exact values [y…, z…, μ] for k = 0 … steps−1
// (floats once the fractions get too big).
export function powerRows(phi, steps) {
  const M = operator(phi);
  let y = phi.y0.map((x) => MX.q(String(x)));
  const out = [];
  for (let k = 0; k < steps; k++) {
    const z = apply(M, y);
    const mu = maxEntry(z);
    out.push({ y, z, mu });
    y = divide(z, mu);
  }
  return out;
}

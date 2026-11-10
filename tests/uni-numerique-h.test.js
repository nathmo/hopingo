// Items of the university unit `numerique` (module N), part h (helpers and
// checks: tests/uni-check.js), and the tables of the catalogue recomputed
// with the reference programs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { heatData, trData, WAVE_RUNS, EXPLICIT_RUNS } from '../js/content/uni/numerique-h-heat.js';
import { CV_TABLES } from '../js/content/uni/numerique-h-bvp.js';
import { eText } from '../js/content/uni/numerique-h-kit.js';

const IDS = ['n-bvp-fd', 'n-bvp-convergence', 'n-bvp-newton', 'n-heat-implicit', 'n-pde-cfl', 'n-fem-hat', 'n-opt-kkt'];
const COUNTS = { 'n-bvp-fd': 20, 'n-bvp-newton': 15, 'n-heat-implicit': 15, 'n-pde-cfl': 20 };

test('unit numerique (h): every skill, 5 levels and exam variants', () => checkSkills(IDS, 17, COUNTS));

// −u″ = f with u(0) = u(1) = 0, centred scheme solved by Thomas (JS).
function bvpErr(N, f, u) {
  const h = 1 / (N + 1);
  const a = Array(N).fill(2 / h / h);
  const c = Array(N - 1).fill(-1 / h / h);
  const d = Array(N - 1).fill(-1 / h / h);
  const b = Array.from({ length: N }, (_, i) => f((i + 1) * h));
  c[0] /= a[0];
  for (let i = 1; i < N - 1; i++) { a[i] -= d[i - 1] * c[i - 1]; c[i] /= a[i]; }
  a[N - 1] -= d[N - 2] * c[N - 2];
  b[0] /= a[0];
  for (let i = 0; i < N - 1; i++) b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1];
  for (let i = N - 2; i >= 0; i--) b[i] -= c[i] * b[i + 1];
  return Math.max(...b.map((x, i) => Math.abs(x - u((i + 1) * h))));
}
function heatExplicit(N, M, tau) {
  const h = 1 / (N + 1);
  const r = tau / h / h;
  let u = Array.from({ length: N }, (_, i) => Math.sin(Math.PI * (i + 1) * h));
  let t = 0;
  for (let n = 0; n < M; n++) { t += tau; u = u.map((x, i) => x + r * ((i > 0 ? u[i - 1] : 0) - 2 * x + (i < N - 1 ? u[i + 1] : 0))); }
  return Math.max(...u.map((x, i) => Math.abs(x - Math.exp(-(Math.PI ** 2) * t) * Math.sin(Math.PI * (i + 1) * h))));
}
function wave(N, M, tau) {
  const h = 1 / (N + 1);
  const lam = (tau * tau) / (h * h);
  const g = (u, i) => (i < 0 || i >= N ? 0 : u[i]);
  const u0 = Array.from({ length: N }, (_, i) => Math.sin(Math.PI * (i + 1) * h));
  let uo = u0;
  let un = u0.map((x, i) => (1 - lam) * x + (lam / 2) * (g(u0, i - 1) + g(u0, i + 1)));
  let t = tau;
  for (let n = 1; n < M; n++) { t += tau; const w = un.map((x, i) => 2 * (1 - lam) * x + lam * (g(un, i - 1) + g(un, i + 1)) - uo[i]); uo = un; un = w; }
  return Math.max(...un.map((x, i) => Math.abs(x - Math.cos(Math.PI * t) * Math.sin(Math.PI * (i + 1) * h))));
}
const e3 = (x) => eText(x, 3);

test('the tables of the catalogue, recomputed', () => {
  // Heat, backward Euler (exams 2019 and 2022; exam example 1, table A).
  assert.deepEqual(heatData(1).order.map((r) => r[3]), ['2.032035e-02', '5.238880e-03', '1.320115e-03', '3.306863e-04']);
  assert.deepEqual(heatData(2).order.map((r) => r[3]), ['3.352212e-02', '8.971245e-03', '2.252158e-03', '5.636110e-04']);
  // Stability tables: tiny errors only (their digits are rounding noise).
  for (const k of [1, 2]) assert.ok(heatData(k).stab.every((r) => Number(r[3]) < 1e-20));
  // Transport (2019).
  assert.deepEqual(trData().table.rows.map((r) => r[3]), ['6.435000e-02', '3.465000e-02', '1.794375e-02', '9.126562e-03']);
  // −u″ = π² sin(πx) and −u″ = eˣ (2020).
  for (const [N, err, bound] of CV_TABLES.sin.rows) {
    assert.equal(e3(bvpErr(N, (x) => Math.PI ** 2 * Math.sin(Math.PI * x), (x) => Math.sin(Math.PI * x))), err);
    assert.equal(e3((Math.PI ** 4) / 96 / (N + 1) ** 2), bound);
  }
  for (const [N, err, bound] of CV_TABLES.exp.rows) {
    assert.equal(eText(bvpErr(N, (x) => Math.exp(x), (x) => 1 - Math.exp(x) + (Math.E - 1) * x), 6), err);
    assert.equal(e3(Math.E / 96 / (N + 1) ** 2), bound);
  }
  // Explicit heat (contrast) and waves.
  for (const [N, M, tau, err] of EXPLICIT_RUNS) assert.equal(e3(heatExplicit(N, M, Number(tau))), err);
  for (const [N, M, tau, err] of WAVE_RUNS) assert.equal(eText(wave(N, M, Number(tau)), 6), err);
});

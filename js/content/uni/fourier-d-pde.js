// The numeric check of a solution of a partial differential equation
// (module F, part d, step U10; catalogue: « contrôle numérique de l'EDP et
// des conditions », spec §16.2 « mode EDP »). The `ode` judge has no PDE
// mode: the lines of part d are compared with the reference by `prob`
// (equivalent), and this file checks that the reference itself (or any text)
// satisfies the equation, the boundary conditions and the initial ones.
// Used by the generators' tests (tests/uni-fourier-d.test.js); items carry
// the spec in item.pde = {spec, u}.
//
// pdeIssue(spec, text) → null, or a message naming what fails. spec:
//   {kind: 'heat', k, c?, a? (text in t: u_t = a(t)u_xx), src? (text in x),
//    L, bc: 'D' | 'N', ic (text in x)}     u_t = k u_xx − c u + src, on ]0 ; L[
//   {kind: 'wave', c, L? (null: ℝ), ic, ic1}   u_tt = c² u_xx, u(x,0), u_t(x,0)
//   {kind: 'disk', g (text in θ), vars: ['r', 'θ'] | ['x', 'y']}   Δu = 0, r < 1
//   {kind: 'half', g (text in y)}           Δu = 0 for x > 0, u(0, y) = g, bounded
// Derivatives are central differences; a residual counts against the size
// of the terms (relative 1e−4). Series (sum to ∞) are evaluated by the core;
// the initial condition of a series is checked a little after t = 0.

import { parse } from '../../cas/parse.js';
import { evalFloat } from '../../cas/numeric.js';

const VARS = { heat: ['x', 't'], wave: ['x', 't'], half: ['x', 'y'] };

function fnOf(text, vars) {
  const node = parse(text, { vars });
  return (env) => evalFloat(node, env);
}

const close = (a, b, scale) => Math.abs(a - b) <= 1e-4 * Math.max(1, scale);

function heatIssue(s, u, series) {
  const L = s.L;
  const ic = fnOf(s.ic, ['x']);
  const src = s.src ? fnOf(s.src, ['x']) : () => 0;
  const a = s.a ? fnOf(s.a, ['t']) : () => s.k ?? 1;
  const c = s.c || 0;
  const h1 = 1e-4;
  const h2 = 2e-3;
  for (const [fx, t] of [[0.23, 0.07], [0.41, 0.19], [0.66, 0.31], [0.87, 0.45]]) {
    const x = fx * L;
    const U = u({ x, t });
    const ut = (u({ x, t: t + h1 }) - u({ x, t: t - h1 })) / (2 * h1);
    const uxx = (u({ x: x + h2, t }) - 2 * U + u({ x: x - h2, t })) / (h2 * h2);
    const rhs = a({ t }) * uxx - c * U + src({ x });
    if (!Number.isFinite(ut + rhs)) return 'La fonction ne se calcule pas dans la bande.';
    if (!close(ut, rhs, Math.abs(ut) + Math.abs(a({ t }) * uxx) + Math.abs(c * U))) return `L'équation n'est pas vérifiée en (x ; t) = (${x.toFixed(2)} ; ${t}).`;
  }
  for (const t of [0.05, 0.3]) {
    if (s.bc === 'D') {
      if (!close(u({ x: 0, t }), 0, 1) || !close(u({ x: L, t }), 0, 1)) return `La condition de Dirichlet n'est pas vérifiée en t = ${t}.`;
    } else {
      for (const x of [0, L]) {
        const ux = (u({ x: x + h1, t }) - u({ x: x - h1, t })) / (2 * h1);
        if (!close(ux, 0, 1)) return `La condition de Neumann n'est pas vérifiée en x = ${x}, t = ${t}.`;
      }
    }
  }
  // Initial condition (a series converges slowly at t = 0: a little later).
  const t0 = series ? 1e-6 : 0;
  for (const fx of [0.3, 0.5, 0.7]) {
    const x = fx * L;
    const tol = series ? 2e-2 : 1e-6;
    if (Math.abs(u({ x, t: t0 }) - ic({ x })) > tol * Math.max(1, Math.abs(ic({ x })))) return `La condition initiale n'est pas vérifiée en x = ${x.toFixed(2)}.`;
  }
  return null;
}

function waveIssue(s, u) {
  const L = s.L;
  const c2 = s.c * s.c;
  const ic = fnOf(s.ic, ['x']);
  const ic1 = fnOf(s.ic1 ?? '0', ['x']);
  const h = 2e-3;
  const xs = L ? [0.21 * L, 0.48 * L, 0.77 * L] : [-1.3, 0.2, 0.9];
  for (const x of xs) {
    for (const t of [0.13, 0.42]) {
      const U = u({ x, t });
      const utt = (u({ x, t: t + h }) - 2 * U + u({ x, t: t - h })) / (h * h);
      const uxx = (u({ x: x + h, t }) - 2 * U + u({ x: x - h, t })) / (h * h);
      if (!Number.isFinite(utt + uxx)) return 'La fonction ne se calcule pas.';
      if (!close(utt, c2 * uxx, Math.abs(utt) + Math.abs(c2 * uxx))) return `L'équation des ondes n'est pas vérifiée en (x ; t) = (${x.toFixed(2)} ; ${t}).`;
    }
    if (!close(u({ x, t: 0 }), ic({ x }), 1)) return `u(x, 0) n'est pas la condition initiale en x = ${x.toFixed(2)}.`;
    const ut = (u({ x, t: h }) - u({ x, t: -h })) / (2 * h);
    if (Math.abs(ut - ic1({ x })) > 1e-3 * Math.max(1, Math.abs(ic1({ x })))) return `u_t(x, 0) n'est pas la condition donnée en x = ${x.toFixed(2)}.`;
  }
  if (L) for (const t of [0.2, 0.7]) if (!close(u({ x: 0, t }), 0, 1) || !close(u({ x: L, t }), 0, 1)) return `La condition de Dirichlet n'est pas vérifiée en t = ${t}.`;
  return null;
}

function diskIssue(s, u, vars) {
  const g = fnOf(s.g, ['θ']);
  const polar = vars[0] === 'r';
  const at = (r, th) => (polar ? u({ r, 'θ': th }) : u({ x: r * Math.cos(th), y: r * Math.sin(th) }));
  const h = 2e-3;
  for (const [x, y] of [[0.2, 0.1], [-0.3, 0.4], [0.5, -0.2]]) {
    const r = Math.hypot(x, y);
    const th = Math.atan2(y, x);
    const C = (dx, dy) => at(Math.hypot(x + dx, y + dy), Math.atan2(y + dy, x + dx));
    const lap = (C(h, 0) + C(-h, 0) + C(0, h) + C(0, -h) - 4 * at(r, th)) / (h * h);
    if (!Number.isFinite(lap) || Math.abs(lap) > 1e-3) return `Δu ≠ 0 en (x ; y) = (${x} ; ${y}).`;
  }
  for (const th of [0.3, 1.7, 4]) if (!close(at(1, th), g({ 'θ': th }), 1)) return `u(1, θ) n'est pas la condition au bord en θ = ${th}.`;
  return null;
}

function halfIssue(s, u) {
  const g = fnOf(s.g, ['y']);
  const h = 2e-3;
  for (const [x, y] of [[0.3, 0.2], [1.1, -0.7], [2.2, 1.4]]) {
    const U = u({ x, y });
    const lap = (u({ x: x + h, y }) + u({ x: x - h, y }) + u({ x, y: y + h }) + u({ x, y: y - h }) - 4 * U) / (h * h);
    if (!Number.isFinite(lap) || Math.abs(lap) > 1e-3) return `Δu ≠ 0 en (x ; y) = (${x} ; ${y}).`;
  }
  for (const y of [-1.2, 0, 0.8]) if (!close(u({ x: 0, y }), g({ y }), 1)) return `u(0, y) n'est pas la condition au bord en y = ${y}.`;
  if (!(Math.abs(u({ x: 40, y: 0.5 })) < 1)) return 'La solution n\'est pas bornée quand x → ∞.';
  return null;
}

export function pdeIssue(spec, text) {
  const vars = spec.vars || VARS[spec.kind] || ['x', 't'];
  let u;
  try { u = fnOf(text, [...vars, 'n', 'k']); } catch (e) { return `Illisible : ${e.message}`; }
  const series = /sum\(/.test(text);
  if (spec.kind === 'heat') return heatIssue(spec, u, series);
  if (spec.kind === 'wave') return waveIssue(spec, u);
  if (spec.kind === 'disk') return diskIssue(spec, u, vars);
  if (spec.kind === 'half') return halfIssue(spec, u);
  return `Sorte d'EDP inconnue : ${spec.kind}`;
}

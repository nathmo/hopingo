// Tools of module N, part g (step U9: equations différentielles): the
// problem u′ = λu + g(t) with nice numbers, its exact solution, the tables
// of the catalogue recomputed in double precision, French texts.

import { Q } from '../../math/rational.js';
import { referenceRows, stepOde, fmt, expText, fv } from '../../judges/iter-num.js';

export { referenceRows, stepOde, fmt, expText, fv };

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const R = (s) => String(s).replace(/-/g, '−');
// A fraction or a short decimal, as the screen writes it.
export function nice(x) {
  if (x instanceof Q) {
    const d = x.toDecimal?.();
    if (d && d.replace(/\D/g, '').length <= 5) return d.replace('-', '−');
    return R(String(x));
  }
  return fmt(x);
}

// g(t) ∈ {0, 1, t}: CAS text of f(t, u), and its display.
export const G_TEXT = { 0: '', 1: '+1', t: '+t' };
export function fText(lam, g) { return `${lam}u${G_TEXT[g]}`; }
export function fShow(lam, g) {
  const a = lam === -1 ? '−u' : `${R(lam)}u`;
  return `${a}${g === 0 ? '' : g === 1 ? ' + 1' : ' + t'}`;
}
// g at a time (Q).
export const gAt = (g, t) => (g === 0 ? q(0) : g === 1 ? q(1) : q(t));

const smallQ = (x, d = 1000) => x instanceof Q && Math.abs(x.d) <= d && Math.abs(x.n) <= 100000;

// u′ = λu + g(t), u(0) = u0, step h: EP and ER rows exact, with small
// denominators over `steps` steps. scheme rows of each kind on demand.
export function odeData(rng, { steps = 2, schemes = ['EP', 'ER'], gs = [0, 1, 't'], maxD = 1000 } = {}) {
  for (let t = 0; t < 300; t++) {
    const lam = rng.pick([-1, -2, -5, -10]);
    const g = rng.pick(gs);
    const h = rng.pick([q(1, 10), q(1, 20), q(1, 5)]);
    const u0 = rng.pick([1, 2]);
    const z = h.mul(lam).valueOf();
    if (z <= -1) continue;
    const f = fText(lam, g);
    const rows = {};
    let ok = true;
    for (const s of schemes) {
      const phi = { kind: 'ode', scheme: s, f, t0: '0', u0: String(u0), h: String(h) };
      try { rows[s] = referenceRows(phi, steps + 1); } catch { ok = false; break; }
      if (!rows[s].every((r) => ['u', 'k1', 'k2'].every((c) => r[c] === undefined || smallQ(r[c], maxD)))) { ok = false; break; }
    }
    if (!ok) continue;
    // Not the equilibrium (u′ = −u + 1, u(0) = 1 stays at 1), not 0.
    if (Object.values(rows).some((r) => r[1].u instanceof Q && (r[1].u.eq(q(u0)) || r[1].u.n === 0))) continue;
    return { lam, g, h, u0, f, rows, phiOf: (s) => ({ kind: 'ode', scheme: s, f, t0: '0', u0: String(u0), h: String(h) }) };
  }
  const f = '-2u';
  const rows = {};
  for (const s of schemes) rows[s] = referenceRows({ kind: 'ode', scheme: s, f, t0: '0', u0: '1', h: '1/10' }, steps + 1);
  return { lam: -2, g: 0, h: q(1, 10), u0: 1, f, rows, fallback: true, phiOf: (s) => ({ kind: 'ode', scheme: s, f, t0: '0', u0: '1', h: '1/10' }) };
}

// Exact solution of u′ = λu + g, u(0) = u0, at t (float).
export function exactSol(d, t) {
  const L = d.lam;
  if (d.g === 0) return d.u0 * Math.exp(L * t);
  if (d.g === 1) return -1 / L + (d.u0 + 1 / L) * Math.exp(L * t);
  return -t / L - 1 / (L * L) + (d.u0 + 1 / (L * L)) * Math.exp(L * t);
}

export const problemText = (d) => `u′ = ${fShow(d.lam, d.g)}, u(0) = ${d.u0}, h = ${nice(d.h)}`;

// ---------- the catalogue's tables, recomputed ----------

// u′ = √u/(1 + t²) on [0 ; 20], u(0) = 1, exact (1 + arctan(t)/2)²: max error
// of EP, ER (a quadratic in √u at each step) and Heun.
export function sqrtTable(Ns = [50, 100, 200, 400]) {
  const ex = (t) => (1 + 0.5 * Math.atan(t)) ** 2;
  const f = (t, u) => Math.sqrt(u) / (1 + t * t);
  return Ns.map((N) => {
    const h = 20 / N;
    let ue = 1; let ui = 1; let uh = 1; let Ee = 0; let Ei = 0; let Eh = 0;
    for (let n = 0; n < N; n++) {
      const t = n * h;
      const t1 = t + h;
      ue += h * f(t, ue);
      const c = h / (1 + t1 * t1);
      const s = (c + Math.sqrt(c * c + 4 * ui)) / 2;
      ui = s * s;
      const k1 = f(t, uh);
      const k2 = f(t1, uh + h * k1);
      uh += (h / 2) * (k1 + k2);
      Ee = Math.max(Ee, Math.abs(ex(t1) - ue));
      Ei = Math.max(Ei, Math.abs(ex(t1) - ui));
      Eh = Math.max(Eh, Math.abs(ex(t1) - uh));
    }
    return { N, EP: Ee, ER: Ei, Heun: Eh };
  });
}

// u′ = −λ(u − cos t), u(0) = 0 on [0 ; 1] (λ = 50 in the catalogue): u_N by
// EP and ER.
export function stiffTable(lam = 50, Ns = [20, 24, 26, 50, 100]) {
  return Ns.map((N) => {
    const h = 1 / N;
    let ue = 0;
    let ui = 0;
    for (let n = 0; n < N; n++) {
      const t = n * h;
      ue += h * (-lam * (ue - Math.cos(t)));
      ui = (ui + lam * h * Math.cos(t + h)) / (1 + lam * h);
    }
    return { N, h, EP: ue, ER: ui };
  });
}

// u′ = −u, u(0) = 1 on [0 ; T]: |u(T) − (1 − h)^N| and the bound T·h/2.
export function globalTable(T = 1, Ns = [10, 20, 40, 80]) {
  return Ns.map((N) => { const h = T / N; return { N, h, err: Math.abs(Math.exp(-T) - (1 - h) ** N), bound: (T * h) / 2 }; });
}

export const e4 = (x) => expText(x, 3);
export const hShow = (h) => String(Number(h.toPrecision(3))).replace(/^0\./, '0.');

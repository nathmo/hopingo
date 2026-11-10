// Counter-example properties of module A2, part e (step U6): {name: (params,
// answers) → {ok, message?, rule?}}, used by tf items with counter
// {kind: 'a2', prop: name, params, ask, answer} (js/judges/a2-examples.js).
//
//   stationaryNotExtremum {}  answers {f}: ∇f(0, 0) = 0 and (0, 0) is not a
//       local extremum (f above and below f(0, 0) on small circles)
//   degenerateExtremum {}  answers {f}: ∇f(0, 0) = 0, det H(0, 0) = 0, and
//       (0, 0) is a local extremum all the same
//   lagrangeNotExtremum {}  answers {f, g}: g(0, 0) = 0, ∇g(0, 0) ≠ 0,
//       ∇f(0, 0) parallel to ∇g(0, 0), and f is not extremal at (0, 0) on
//       the curve g = 0
//   hess3 {fxx, det, claim: 'max' | 'min'}  answers {H}: a symmetric 3 × 3
//       matrix with H₁₁ = fxx and det H = det that is not definite of the
//       claimed sign (not negative definite for 'max', not positive for 'min')
// Numbers by finite differences and sampling: every function the students
// type here is a polynomial or close to one.

import { parse } from '../cas/parse.js';
import { evalFloat } from '../cas/numeric.js';
import { parseMatLine, evalAst } from '../cas/matexpr.js';

const VARS = ['x', 'y'];
function fnOf(text) {
  const s = String(text ?? '').trim();
  if (!s) return null;
  const n = parse(s, { vars: VARS });
  return (x, y) => evalFloat(n, { x, y });
}
const gradAt = (f, h = 1e-5) => [(f(h, 0) - f(-h, 0)) / (2 * h), (f(0, h) - f(0, -h)) / (2 * h)];
function hessAt(f, h = 1e-3) {
  const f0 = f(0, 0);
  const fxx = (f(h, 0) - 2 * f0 + f(-h, 0)) / (h * h);
  const fyy = (f(0, h) - 2 * f0 + f(0, -h)) / (h * h);
  const fxy = (f(h, h) - f(h, -h) - f(-h, h) + f(-h, -h)) / (4 * h * h);
  return [fxx, fxy, fyy];
}
// Signs of f − f(0, 0) on circles of radius 0.05, 0.01, 0.002.
function around(f) {
  const f0 = f(0, 0);
  let above = false;
  let below = false;
  for (const r of [0.05, 0.01, 0.002]) {
    for (let k = 0; k < 96; k++) {
      const t = (2 * Math.PI * (k + 0.5)) / 96;
      const d = f(r * Math.cos(t), r * Math.sin(t)) - f0;
      if (!Number.isFinite(d)) continue;
      const tol = 1e-12 * (1 + Math.abs(f0));
      if (d > tol) above = true;
      if (d < -tol) below = true;
    }
  }
  return { above, below };
}

function stationary(f) {
  if (!Number.isFinite(f(0, 0))) return 'Ta fonction n\'est pas définie en (0, 0).';
  const g = gradAt(f);
  if (!g.every(Number.isFinite) || Math.hypot(...g) > 1e-6) return 'Avec ta fonction, ∇f(0, 0) ≠ 0 : (0, 0) n\'est pas un point stationnaire.';
  return null;
}

export const PROPS = {
  stationaryNotExtremum: (p, ans) => {
    const f = fnOf(ans.f);
    if (!f) return { ok: false, message: 'Donne une fonction f(x, y).' };
    const bad = stationary(f);
    if (bad) return { ok: false, message: bad };
    const { above, below } = around(f);
    if (above && below) return { ok: true };
    return { ok: false, rule: 'a2_stationary_is_extremum', message: `(0, 0) est ${above ? 'un minimum' : below ? 'un maximum' : 'un extremum'} local de ta fonction : ce n'est pas un contre-exemple. Pense à x² − y².` };
  },
  degenerateExtremum: (p, ans) => {
    const f = fnOf(ans.f);
    if (!f) return { ok: false, message: 'Donne une fonction f(x, y).' };
    const bad = stationary(f);
    if (bad) return { ok: false, message: bad };
    const [a, b, c] = hessAt(f);
    if (Math.abs(a * c - b * b) > 1e-4) return { ok: false, message: `Avec ta fonction, det H(0, 0) ≈ ${Math.round((a * c - b * b) * 1000) / 1000} ≠ 0.` };
    const { above, below } = around(f);
    if (above && below) return { ok: false, rule: 'a2_hess_degenerate', message: '(0, 0) n\'est pas un extremum de ta fonction : l\'énoncé est vrai pour elle. Cherche une fonction à hessienne nulle qui a un minimum, comme x⁴ + y⁴.' };
    return { ok: true };
  },
  lagrangeNotExtremum: (p, ans) => {
    const f = fnOf(ans.f);
    const g = fnOf(ans.g);
    if (!f || !g) return { ok: false, message: 'Donne f(x, y) et g(x, y).' };
    if (!(Math.abs(g(0, 0)) < 1e-9)) return { ok: false, message: 'Il faut g(0, 0) = 0 : (0, 0) doit être sur la contrainte.' };
    const gg = gradAt(g);
    const n2 = gg[0] * gg[0] + gg[1] * gg[1];
    if (!(n2 > 1e-8)) return { ok: false, message: 'Il faut ∇g(0, 0) ≠ 0.' };
    const gf = gradAt(f);
    if (Math.abs(gf[0] * gg[1] - gf[1] * gg[0]) > 1e-6 * (1 + Math.hypot(...gf))) return { ok: false, message: 'Avec ta fonction, ∇f(0, 0) n\'est pas un multiple de ∇g(0, 0).' };
    // Points of the curve near (0, 0): along the tangent, then back on g = 0.
    const t = [-gg[1], gg[0]].map((x) => x / Math.sqrt(n2));
    const f0 = f(0, 0);
    let above = false;
    let below = false;
    for (const s of [0.05, -0.05, 0.02, -0.02, 0.005, -0.005]) {
      let P = [s * t[0], s * t[1]];
      for (let k = 0; k < 30; k++) {
        const v = g(...P);
        const d = gradAt((x, y) => g(P[0] + x, P[1] + y));
        const m = d[0] * d[0] + d[1] * d[1];
        if (!(m > 0)) break;
        P = [P[0] - (v * d[0]) / m, P[1] - (v * d[1]) / m];
      }
      if (!(Math.abs(g(...P)) < 1e-9)) continue;
      const diff = f(...P) - f0;
      if (diff > 1e-12) above = true;
      if (diff < -1e-12) below = true;
    }
    if (above && below) return { ok: true };
    return { ok: false, rule: 'a2_lagrange_no_compare', message: '(0, 0) est un extremum de f sur ta courbe : l\'énoncé est vrai pour cet exemple. Essaie f = y³ et g = y − x.' };
  },
  hess3: (p, ans) => {
    let H;
    try {
      const line = parseMatLine(String(ans.H ?? ''), {});
      const v = evalAst(line.body, {}, {});
      if (v.k !== 'm') throw new Error('not a matrix');
      H = v.rows.map((r) => r.map((n) => evalFloat(n, {})));
    } catch {
      return { ok: false, message: 'Écris une matrice 3 × 3, par exemple [[−2, 0, 0], [0, 3, 0], [0, 0, 1/2]].' };
    }
    if (H.length !== 3 || H.some((r) => r.length !== 3)) return { ok: false, message: 'Il faut une matrice 3 × 3.' };
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (Math.abs(H[i][j] - H[j][i]) > 1e-12) return { ok: false, message: 'Une hessienne est symétrique.' };
    const d1 = H[0][0];
    const d2 = H[0][0] * H[1][1] - H[0][1] * H[1][0];
    const d3 = H[0][0] * (H[1][1] * H[2][2] - H[1][2] * H[2][1]) - H[0][1] * (H[1][0] * H[2][2] - H[1][2] * H[2][0]) + H[0][2] * (H[1][0] * H[2][1] - H[1][1] * H[2][0]);
    if (Math.abs(d1 - Number(p.fxx)) > 1e-9) return { ok: false, message: `Il faut f_xx = H₁₁ = ${p.fxx}.` };
    if (Math.abs(d3 - Number(p.det)) > 1e-9) return { ok: false, message: `Il faut det H = ${p.det} ; ta matrice a det H = ${Math.round(d3 * 1000) / 1000}.` };
    const negDef = d1 < 0 && d2 > 0 && d3 < 0;
    const posDef = d1 > 0 && d2 > 0 && d3 > 0;
    if (p.claim === 'max' && negDef) return { ok: false, rule: 'a2_hess_partial_minors', message: 'Ta matrice est définie négative (Δ₁ < 0, Δ₂ > 0, Δ₃ < 0) : le point est bien un maximum. Prends Δ₂ < 0.' };
    if (p.claim === 'min' && posDef) return { ok: false, rule: 'a2_hess_det_only', message: 'Ta matrice est définie positive : le point est bien un minimum. Prends deux valeurs propres négatives.' };
    return { ok: true };
  },
};

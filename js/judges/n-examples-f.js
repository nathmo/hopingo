// Counter-examples of module N, part f (see js/judges/n-examples.js).
// PROPS: {name: (params, answers) => {ok, message?, rule?}}.
//   jacobiNotGs        {A}: Jacobi converges (ρ(B_J) < 1), Gauss-Seidel does
//                      not (ρ(B_GS) ≥ 1)
//   normNotRadius      {B}: ‖B‖₁, ‖B‖∞ and ‖B‖₂ are all ≥ 1, but ρ(B) < 1
//   gradientNotFinite  {A, b}: A symmetric positive definite n × n, the
//                      gradient with optimal step from 0 has not reached
//                      the solution after n steps

import { matrixOf } from './n-examples-util.js';
import * as LF from '../cas/linalg-float.js';
import { t } from '../i18n.js';

// B_J = I − D⁻¹A, B_GS = I − (D + L)⁻¹A (float).
function iterMatrix(A, gs) {
  const n = A.length;
  const P = A.map((r, i) => r.map((x, j) => (j === i || (gs && j < i) ? x : 0)));
  const Pi = LF.inv(P);
  if (!Pi) return null;
  const PA = LF.matmul(Pi, A);
  return PA.map((r, i) => r.map((x, j) => (i === j ? 1 : 0) - x));
}

export const PROPS = {
  jacobiNotGs(params, a) {
    const A = matrixOf(a.A);
    if (!A || A.length !== A[0].length || A.length < 2) return { ok: false, message: t('Donne une matrice carrée.') };
    if (A.some((r, i) => r[i] === 0)) return { ok: false, message: t('Les coefficients diagonaux doivent être non nuls.') };
    const BJ = iterMatrix(A, false);
    const BG = iterMatrix(A, true);
    if (!BJ || !BG) return { ok: false, message: t('Je ne peux pas former les matrices d\'itération.') };
    const rJ = LF.spectralRadius(BJ);
    const rG = LF.spectralRadius(BG);
    if (rJ >= 1 - 1e-9) return { ok: false, message: t('Ici ρ(B_J) ≈ {v1} ≥ 1 : Jacobi ne converge pas.', { v1: rJ.toFixed(3).replace('.', ',') }) };
    if (rG < 1 - 1e-9) return { ok: false, message: t('Ici ρ(B_GS) ≈ {v1} < 1 : Gauss-Seidel converge aussi.', { v1: rG.toFixed(3).replace('.', ',') }) };
    return { ok: true };
  },
  normNotRadius(params, a) {
    const B = matrixOf(a.B);
    if (!B || B.length !== B[0].length) return { ok: false, message: t('Donne une matrice carrée B.') };
    const r = LF.spectralRadius(B);
    if (r >= 1 - 1e-9) return { ok: false, message: t('ρ(B) ≈ {v1} ≥ 1 : la méthode diverge bien.', { v1: r.toFixed(3).replace('.', ',') }), rule: 'n_norm_vs_radius' };
    const norms = [LF.norm(B, 1), LF.norm(B, Infinity), LF.norm(B, 2)];
    if (norms.some((x) => x < 1)) return { ok: false, message: t('Une des normes de B est < 1 : il faut ‖B‖ ≥ 1.') };
    return { ok: true };
  },
  gradientNotFinite(params, a) {
    const A = matrixOf(a.A);
    const bm = matrixOf(`[${String(a.b).replace(/[()]/g, '').replace(/;/g, ',').replace(/^\[?/, '[').replace(/\]?$/, ']')}]`);
    const b = bm ? bm[0] : null;
    if (!A || !b || A.length !== b.length || A.length !== A[0].length) return { ok: false, message: t('Donne A carrée et b de même taille.') };
    if (A.some((r, i) => r.some((x, j) => Math.abs(x - A[j][i]) > 1e-12)) || !LF.cholesky(A)) return { ok: false, message: t('A doit être symétrique définie positive.') };
    const n = A.length;
    let x = Array(n).fill(0);
    for (let k = 0; k < n; k++) {
      const r = b.map((bi, i) => bi - A[i].reduce((s, v, j) => s + v * x[j], 0));
      const rr = r.reduce((s, v) => s + v * v, 0);
      if (rr < 1e-24) break;
      const Ar = A.map((row) => row.reduce((s, v, j) => s + v * r[j], 0));
      const al = rr / r.reduce((s, v, i) => s + v * Ar[i], 0);
      x = x.map((xi, i) => xi + al * r[i]);
    }
    const res = Math.hypot(...b.map((bi, i) => bi - A[i].reduce((s, v, j) => s + v * x[j], 0)));
    if (res < 1e-9 * (1 + Math.hypot(...b))) return { ok: false, message: t('Avec ces données, le gradient atteint la solution en {n} pas (r⁽⁰⁾ est vecteur propre, ou n = 1).', { n }) };
    return { ok: true };
  },
};

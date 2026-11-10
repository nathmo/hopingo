// Counter-examples of module M, part b (kind `mx`, js/judges/m-examples.js).
// PROPS: {name: (params, answers) → {ok, message?, rule?}}.
//   symInvNoChol   answers {A}: symmetric, invertible, and no Cholesky
//                  factorisation (not positive definite)
//   gradNot2Mx     answers {M}: a square matrix with ∇(xᵀMx) ≠ 2Mx, that is
//                  M ≠ Mᵀ
//   rayleighOutside answers {A, x}: real eigenvalues, and R(x) = xᵀAx/xᵀx
//                  outside [λ_min ; λ_max] (A not symmetric)
//   varNotXtX      answers {X}: a design matrix (free columns) with
//                  σ²XᵀX ≠ σ²(XᵀX)⁻¹

import * as MX from '../cas/matrix.js';
import { readQ } from './linalg-examples.js';
import { eig, rayleigh } from '../cas/linalg-float.js';

const need = (message) => ({ ok: false, message });
const sq = (A) => A.length === A[0].length;

export const PROPS = {
  symInvNoChol(params, answers) {
    const A = readQ(answers.A)?.mat;
    if (!A) return need('Écris la matrice A, case par case.');
    if (params.n && A.length !== params.n) return need(`A doit être ${params.n}×${params.n}.`);
    if (!sq(A) || !MX.isSymmetric(A)) return need('A doit être symétrique.');
    if (MX.det(A).n === 0) return need('A doit être inversible.');
    for (let k = 1; k <= A.length; k++) if (MX.det(A.slice(0, k).map((r) => r.slice(0, k))).n <= 0) return { ok: true };
    return need('Cette matrice est définie positive : elle a une factorisation de Cholesky.');
  },
  gradNot2Mx(params, answers) {
    const M = readQ(answers.M)?.mat;
    if (!M) return need('Écris la matrice M, case par case.');
    if (!sq(M)) return need('M doit être carrée.');
    return MX.isSymmetric(M) ? need('Pour M symétrique, ∇(xᵀMx) = (M + Mᵀ)x = 2Mx : choisis M non symétrique.') : { ok: true };
  },
  rayleighOutside(params, answers) {
    const A = readQ(answers.A)?.mat;
    const x = readQ(answers.x)?.vec;
    if (!A || !sq(A)) return need('Écris une matrice carrée A.');
    if (!x || x.length !== A.length || x.every((v) => v.n === 0)) return need(`Écris un vecteur x ≠ 0 à ${A.length} composantes.`);
    const ls = eig(MX.toNumbers(A));
    if (ls.some((z) => Math.abs(z.im) > 1e-9)) return need('Choisis A à valeurs propres réelles.');
    const re = ls.map((z) => z.re);
    const R = rayleigh(MX.toNumbers(A), MX.toNumbers([x])[0]);
    const lo = Math.min(...re);
    const hi = Math.max(...re);
    if (R < lo - 1e-9 || R > hi + 1e-9) return { ok: true };
    return need(`Ici R(x) = ${String(Math.round(R * 1000) / 1000).replace('.', ',')} est entre λ_min et λ_max. Prends A non symétrique (triangulaire).`);
  },
  varNotXtX(params, answers) {
    const X = readQ(answers.X)?.mat;
    if (!X) return need('Écris la matrice X, case par case.');
    if (MX.rank(X) < X[0].length) return need('Les colonnes de X doivent être libres (sinon XᵀX n\'est pas inversible).');
    const G = MX.mul(MX.transpose(X), X);
    return MX.equal(G, MX.inverse(G)) ? need('Pour ce X, XᵀX = (XᵀX)⁻¹ : choisis-en un autre (avec plus d\'observations).') : { ok: true };
  },
};

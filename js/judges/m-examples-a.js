// Counter-examples of module M, part a (kind `mx`, js/judges/m-examples.js).
// PROPS: {name: (params, answers) → {ok, message?, rule?}}.
//   schurDetA22 {n}          a matrix A (n × n, A₁₁ the top left (n−1) × (n−1)
//                            block, invertible) with det A ≠ det A₁₁ · aₙₙ
//   projNotInvertible {n}    an orthogonal projector P (P² = P, Pᵀ = P) that
//                            is not invertible
//   symNegEig {n}            a symmetric matrix with a negative eigenvalue
//                            (it has no real symmetric square root)
//   minorsNotSemidef {n}     a symmetric matrix whose leading minors are all
//                            ≥ 0 but which is not positive semi-definite

import * as MX from '../cas/matrix.js';
import { readQ } from './linalg-examples.js';
import { eigSym } from '../cas/linalg-float.js';

const need = (message) => ({ ok: false, message });
function mat(answers, n) {
  const A = readQ(answers?.A)?.mat;
  if (!A) return { error: need('Écris la matrice, case par case.') };
  if (n && (A.length !== n || A[0].length !== n)) return { error: need(`La matrice doit être ${n}×${n}.`) };
  if (A.length !== A[0].length) return { error: need('La matrice doit être carrée.') };
  return { A };
}
const minor = (A, k) => MX.det(A.slice(0, k).map((r) => r.slice(0, k)));

export const PROPS = {
  schurDetA22: (p, answers) => {
    const { A, error } = mat(answers, p.n);
    if (error) return error;
    const n = A.length;
    const A11 = A.slice(0, n - 1).map((r) => r.slice(0, n - 1));
    if (MX.det(A11).n === 0) return need('Le bloc A₁₁ doit être inversible.');
    return !MX.det(A).eq(MX.det(A11).mul(A[n - 1][n - 1])) ? { ok: true } : need('Avec cette matrice, det A = det A₁₁ · det A₂₂ : prends A₂₁ et A₁₂ non nuls.');
  },
  projNotInvertible: (p, answers) => {
    const { A, error } = mat(answers, p.n);
    if (error) return error;
    if (!MX.isSymmetric(A)) return need('Un projecteur orthogonal est symétrique : Pᵀ = P.');
    if (!MX.equal(MX.mul(A, A), A)) return need('Il faut P² = P.');
    return MX.det(A).n === 0 ? { ok: true } : need('Ce projecteur est inversible (c\'est I) : prends-en un autre, par exemple ½[[1, 1], [1, 1]].');
  },
  symNegEig: (p, answers) => {
    const { A, error } = mat(answers, p.n);
    if (error) return error;
    if (!MX.isSymmetric(A)) return need('La matrice doit être symétrique.');
    return eigSym(A).values[0] < -1e-12 ? { ok: true } : need('Toutes ses valeurs propres sont ≥ 0 : elle a une racine carrée symétrique.');
  },
  minorsNotSemidef: (p, answers) => {
    const { A, error } = mat(answers, p.n);
    if (error) return error;
    if (!MX.isSymmetric(A)) return need('La matrice doit être symétrique.');
    for (let k = 1; k <= A.length; k++) if (minor(A, k).n < 0) return need(`Ici Δ${'₀₁₂₃₄'[k]} < 0 : il faut tous les mineurs dominants ≥ 0.`);
    return eigSym(A).values[0] < -1e-12 ? { ok: true } : need('Cette matrice est bien semi-définie positive.');
  },
};

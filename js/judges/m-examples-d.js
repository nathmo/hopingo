// Counter-examples of module M, part d (kind `mx`, js/judges/m-examples.js):
// x′ = Ax, x_{k+1} = Ax_k and e^{At}. The matrices are entered in the grid
// (asks with a shape), read over ℚ, and checked in floating point
// (js/cas/linalg-float.js).
//   absLessOneUnstable      {A}: all |λ| < 1, yet ẋ = Ax is not stable (some Re λ ≥ 0)
//   traceNegUnstable        {A}: tr A < 0, yet ẋ = Ax is not stable
//   reNegDiscreteUnstable   {A}: all Re λ < 0, yet x_{k+1} = Ax_k is not stable (ρ(A) ≥ 1)
//   expSumFails             {A, B}: e^{A+B} ≠ e^A·e^B
//   expEntrywise            {A}: e^A is not the matrix of the e^{aᵢⱼ}
// PROPS: {name: (params, answers) → {ok, message?, rule?}}.

import * as LF from '../cas/linalg-float.js';
import * as MX from '../cas/matrix.js';
import { readQ } from './linalg-examples.js';

const need = (message, rule = null) => ({ ok: false, message, rule });
const square = (text, n) => {
  const A = readQ(text)?.mat;
  if (!A) return null;
  if (A.length !== A[0].length || (n && A.length !== n)) return null;
  return A;
};
const eigs = (A) => LF.eig(MX.toNumbers(A));
const maxRe = (A) => Math.max(...eigs(A).map((z) => z.re));
const rho = (A) => Math.max(...eigs(A).map((z) => Math.hypot(z.re, z.im)));
const TOL = 1e-9;
const differ = (X, Y) => X.some((r, i) => r.some((x, j) => Math.abs(x - Y[i][j]) > 1e-7 * (1 + Math.abs(x) + Math.abs(Y[i][j]))));

export const PROPS = {
  absLessOneUnstable: (p, ans) => {
    const A = square(ans.A, p.n);
    if (!A) return need(`Écris une matrice carrée A${p.n ? ` ${p.n}×${p.n}` : ''}, case par case.`);
    if (rho(A) >= 1 - TOL) return need('Il faut que toutes les valeurs propres vérifient |λ| < 1.');
    if (maxRe(A) < -TOL) return need('Avec cette matrice, toutes les Re λ sont < 0 : ẋ = Ax est stable. Prends une valeur propre positive, comme 1/2.', 'm_stab_discrete_in_cont');
    return { ok: true };
  },
  traceNegUnstable: (p, ans) => {
    const A = square(ans.A, p.n);
    if (!A) return need('Écris une matrice carrée A, case par case.');
    if (!(MX.trace(A).valueOf() < 0)) return need('Il faut tr A < 0.');
    if (maxRe(A) < -TOL) return need('Avec cette matrice, toutes les Re λ sont < 0 : ẋ = Ax est stable. Essaie des valeurs propres −3 et 1.');
    return { ok: true };
  },
  reNegDiscreteUnstable: (p, ans) => {
    const A = square(ans.A, p.n);
    if (!A) return need('Écris une matrice carrée A, case par case.');
    if (maxRe(A) >= -TOL) return need('Il faut que toutes les valeurs propres aient Re λ < 0.');
    if (rho(A) < 1 - TOL) return need('Avec cette matrice, toutes les |λ| < 1 : x_{k+1} = Ax_k est stable. Prends une valeur propre comme −2.', 'm_stab_cont_in_discrete');
    return { ok: true };
  },
  expSumFails: (p, ans) => {
    const A = square(ans.A, p.n);
    const B = square(ans.B, p.n);
    if (!A || !B || A.length !== B.length) return need('Écris deux matrices carrées A et B de même taille.');
    const lhs = LF.expm(MX.toNumbers(MX.add(A, B)));
    const rhs = LF.matmul(LF.expm(MX.toNumbers(A)), LF.expm(MX.toNumbers(B)));
    if (!differ(lhs, rhs)) {
      const commute = MX.equal(MX.mul(A, B), MX.mul(B, A));
      return need(commute ? 'Ces matrices commutent (AB = BA) : alors e^{A+B} = e^A e^B. Prends-en qui ne commutent pas.' : 'Avec ces matrices, e^{A+B} = e^A e^B.', commute ? 'm_expm_sum' : null);
    }
    return { ok: true };
  },
  expEntrywise: (p, ans) => {
    const A = square(ans.A, p.n);
    if (!A) return need('Écris une matrice carrée A, case par case.');
    const F = MX.toNumbers(A);
    const E = LF.expm(F);
    return differ(E, F.map((r) => r.map(Math.exp))) ? { ok: true } : need('Pour cette matrice, e^A est bien la matrice des e^{aᵢⱼ}.');
  },
};

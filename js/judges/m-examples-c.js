// Counter-examples of module M, part c (kind `mx`, js/judges/m-examples.js):
// power method, low rank, norms, condition number, Gershgorin.
// PROPS: {name: (params, answers) → {ok, message?, rule?}}. Matrices are
// read over ℚ (readQ); the spectral facts are checked in floats
// (js/cas/linalg-float.js).
//   powerDominant      A 2 × 2, real eigenvalues of different moduli (the
//                      power method then converges to the larger one)
//   powerFails         A symmetric 2 × 2, eigenvalues λ and −λ (λ ≠ 0)
//   norm1NeInf         A with ‖A‖₁ ≠ ‖A‖∞
//   frobNeTwo          A with ‖A‖_F ≠ ‖A‖₂
//   smallDetGoodCond   |det A| < 1/100 and κ₂(A) ≤ 100
//   condNotEigRatio    A invertible with real eigenvalues, κ₂ ≠ |λmax|/|λmin|
//   lowRankNotZeroing  A 2 × 2 with one entry of largest modulus: keeping it
//                      alone is not the best rank-1 approximation
//   frobNotSigma       A 3 × 3 of rank 3: ‖A − A₁‖_F ≠ σ₂
//   gershEmptyDisc     A 2 × 2 with a row disc that holds no eigenvalue

import { readQ } from './linalg-examples.js';
import * as MX from '../cas/matrix.js';
import * as LF from '../cas/linalg-float.js';

const need = (message) => ({ ok: false, message });
const matOf = (answers, n) => {
  const A = readQ(answers.A)?.mat;
  if (!A) return { error: need('Écris la matrice A, case par case.') };
  if (n && (A.length !== n || A[0].length !== n)) return { error: need(`A doit être ${n}×${n}.`) };
  return { A, F: MX.toNumbers(A) };
};
const close = (a, b) => Math.abs(a - b) <= 1e-9 * (1 + Math.abs(a) + Math.abs(b));

export const PROPS = {
  powerDominant: (p, ans) => {
    const r = matOf(ans, 2);
    if (r.error) return r.error;
    const e = LF.eig(r.F);
    if (e.some((z) => Math.abs(z.im) > 1e-9)) return need('Choisis une matrice à valeurs propres réelles (symétrique, par exemple).');
    return Math.abs(Math.abs(e[0].re) - Math.abs(e[1].re)) > 1e-9 ? { ok: true } : need('Ses deux valeurs propres ont le même module : prends-en de modules différents.');
  },
  powerFails: (p, ans) => {
    const r = matOf(ans, 2);
    if (r.error) return r.error;
    if (!MX.isSymmetric(r.A)) return need('A doit être symétrique.');
    if (MX.trace(r.A).n !== 0 || MX.det(r.A).n >= 0) return need('Il faut deux valeurs propres opposées, λ et −λ (trace nulle, det < 0).');
    return { ok: true };
  },
  norm1NeInf: (p, ans) => {
    const r = matOf(ans);
    if (r.error) return r.error;
    return close(LF.norm(r.F, 1), LF.norm(r.F, Infinity)) ? need('Pour cette matrice, ‖A‖₁ = ‖A‖∞.') : { ok: true };
  },
  frobNeTwo: (p, ans) => {
    const r = matOf(ans);
    if (r.error) return r.error;
    return close(LF.norm(r.F, 'fro'), LF.norm(r.F, 2)) ? need('Pour cette matrice, ‖A‖_F = ‖A‖₂ (elle est de rang 1, par exemple).') : { ok: true };
  },
  smallDetGoodCond: (p, ans) => {
    const r = matOf(ans);
    if (r.error) return r.error;
    if (r.A.length !== r.A[0].length) return need('A doit être carrée.');
    const d = MX.det(r.A);
    if (d.n === 0) return need('A doit être inversible.');
    if (!(Math.abs(d.valueOf()) < 0.01)) return need('Il faut |det A| < 1/100.');
    return LF.cond(r.F) <= 100 ? { ok: true, rule: null } : need('Ici κ₂(A) > 100 : prends une matrice bien conditionnée, comme un petit multiple de I.');
  },
  condNotEigRatio: (p, ans) => {
    const r = matOf(ans, 2);
    if (r.error) return r.error;
    if (MX.det(r.A).n === 0) return need('A doit être inversible.');
    const e = LF.eig(r.F);
    if (e.some((z) => Math.abs(z.im) > 1e-9)) return need('Choisis une matrice à valeurs propres réelles (triangulaire, par exemple).');
    const ratio = Math.abs(e[0].re) / Math.abs(e[1].re);
    return close(LF.cond(r.F), ratio) ? need('Pour cette matrice, κ₂ est bien le rapport des valeurs propres (elle est symétrique, par exemple).') : { ok: true };
  },
  lowRankNotZeroing: (p, ans) => {
    const r = matOf(ans, 2);
    if (r.error) return r.error;
    const flat = r.F.flat().map(Math.abs);
    const m = Math.max(...flat);
    if (m === 0 || flat.filter((x) => x === m).length > 1) return need('Il faut une seule case de plus grand module.');
    const i = flat.indexOf(m);
    const B = r.F.map((row, a) => row.map((x, b) => (a * 2 + b === i ? 0 : x)));
    const s = LF.singularValues(r.F);
    return LF.norm(B, 2) > (s[1] ?? 0) + 1e-9 ? { ok: true } : need('Pour cette matrice, garder la plus grande case donne bien la meilleure approximation de rang 1.');
  },
  frobNotSigma: (p, ans) => {
    const r = matOf(ans, 3);
    if (r.error) return r.error;
    const s = LF.singularValues(r.F);
    return s[2] > 1e-9 ? { ok: true } : need('Il faut une matrice de rang 3 : sinon ‖A − A₁‖_F = σ₂.');
  },
  gershEmptyDisc: (p, ans) => {
    const r = matOf(ans, 2);
    if (r.error) return r.error;
    const e = LF.eig(r.F);
    const discs = LF.gershgorin(r.F);
    const empty = discs.some((dsc) => e.every((z) => Math.hypot(z.re - dsc.center, z.im) > dsc.radius + 1e-9));
    return empty ? { ok: true } : need('Ici chaque disque contient une valeur propre : prends des disques qui se chevauchent, de rayons différents.');
  },
};

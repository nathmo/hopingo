// Counter-examples of linear algebra (catalogue L, « Contre-exemples »;
// spec §6 `tf` and `example`, step U3). The student enters matrices and
// vectors in the grid; everything is checked exactly over ℚ.
//
// counter = {kind, params, ask:[{v, label, keys, shape?}], answer: {v: text}}
//   matPair    {n | sizes: [[m, n], [p, q]], test}: two matrices A, B for
//              which the identity `test` fails (TESTS_PAIR below).
//   matOne     {want, n?, …}: one matrix (and sometimes more) with a
//              property (WANT_ONE below).
//   vecFamily  {want, n?}: vectors (« (1 ; 0), (0 ; 1) ») and sometimes
//              scalars (WANT_FAMILY below).
//   setWitness {n, member, poly?, matrix?}: elements x, y (and a scalar c)
//              of the set H = {x : member} (a relation in x_1 … x_n, the
//              entries of a vector, of a matrix row by row, or the
//              coefficients of a polynomial in t, constant first) with x + y
//              or c·x outside H; or x = 0 when 0 ∉ H (answer x only).
//   mapWitness {A}: x ≠ y with Ax = Ay.
//   dims       {conds: ['m<n', …]}: whole numbers m, n, r (rank, r ≤ min(m, n))
//              meeting the conditions.
// checkLinalg(counter, answers) → {ok, message?, rule?} | null (other kind).

import { Q } from '../math/rational.js';
import * as MX from '../cas/matrix.js';
import { parseExpr, evalAst, toQ, isVec } from '../cas/matexpr.js';
import { parse, tryParse } from '../cas/parse.js';
import { mapNode, lit } from '../cas/ast.js';
import { closedHolds } from '../cas/sets.js';
import { polyOf, qCoeffs } from '../cas/polyx.js';

const q = (n, d = 1) => new Q(n, d);
const KINDS = ['matPair', 'matOne', 'vecFamily', 'setWitness', 'mapWitness', 'dims'];
export const isLinalgCounter = (c) => KINDS.includes(c?.kind);

// A matrix or a vector typed by the student, over ℚ (null if unreadable).
export function readQ(text) {
  if (text === undefined || text === null || String(text).trim() === '') return null;
  try {
    const v = evalAst(parseExpr(String(text).replace(/^\s*[A-Za-zΣ](_?\w+)?\s*=/, ''), { vars: [] }), {}, { vars: [] });
    if (v.k === 's') { const s = toQ({ k: 'm', rows: [[v.n]] }); return s ? { scalar: s[0][0] } : null; }
    if (v.k === 'list') {
      const items = v.items.map((x) => toQ(x));
      return items.every(Boolean) ? { list: items.map((m) => m.map((r) => r[0])) } : null;
    }
    const A = toQ(v);
    if (!A) return null;
    return isVec(v) ? { vec: A.map((r) => r[0]), mat: A } : { mat: A };
  } catch { return null; }
}

const need = (msg) => ({ ok: false, message: msg });
const sq = (A) => A.length === A[0].length;
const isZeroM = (A) => A.every((r) => r.every((x) => x.n === 0));
const eqM = (A, B) => A.length === B.length && A[0].length === B[0].length && MX.equal(A, B);
const sizeOk = (A, n) => !n || (A.length === n && A[0].length === n);

function pairMats(counter, answers) {
  const A = readQ(answers?.A)?.mat;
  const B = readQ(answers?.B)?.mat;
  if (!A || !B) return { error: need('Écris deux matrices A et B, case par case.') };
  const { n, sizes } = counter.params || {};
  if (sizes) {
    if (A.length !== sizes[0][0] || A[0].length !== sizes[0][1] || B.length !== sizes[1][0] || B[0].length !== sizes[1][1]) {
      return { error: need(`A doit être ${sizes[0][0]}×${sizes[0][1]} et B ${sizes[1][0]}×${sizes[1][1]}.`) };
    }
  } else if (!sizeOk(A, n) || !sizeOk(B, n) || !sq(A) || !sq(B) || A.length !== B.length) {
    return { error: need(`A et B doivent être carrées de taille ${n ?? 'égale'}.`) };
  }
  return { A, B };
}

// Rational eigenvalues with multiplicities, when the polynomial splits over ℚ.
function splitEig(A) {
  const r = MX.rationalEigen(A);
  return r.rest.length <= 1 ? r.roots : null;
}

const shift = (A, l) => A.map((r, i) => r.map((x, j) => (i === j ? x.sub(l) : x)));
const geomDim = (A, l) => A.length - MX.rank(shift(A, l));

function diagonalisable(A) {
  const e = splitEig(A);
  if (!e) return null;
  return e.every(({ value, mult }) => geomDim(A, value) === mult);
}

// Jordan structure from the ranks of (A − λI)^k.
function similarQ(A, B) {
  if (A.length !== B.length) return false;
  const ca = MX.charpoly(A);
  const cb = MX.charpoly(B);
  if (!ca.every((c, i) => c.eq(cb[i]))) return false;
  const e = splitEig(A);
  if (!e) return null;
  for (const { value } of e) {
    let PA = MX.identity(A.length);
    let PB = MX.identity(B.length);
    for (let k = 1; k <= A.length; k++) {
      PA = MX.mul(PA, shift(A, value));
      PB = MX.mul(PB, shift(B, value));
      if (MX.rank(PA) !== MX.rank(PB)) return false;
    }
  }
  return true;
}

const TESTS_PAIR = {
  'AB=BA': ({ A, B }) => !eqM(MX.mul(A, B), MX.mul(B, A)) || 'Avec ces matrices, AB = BA : choisis-en qui ne commutent pas.',
  '(AB)^-1=A^-1B^-1': ({ A, B }) => {
    const Ai = MX.inverse(A); const Bi = MX.inverse(B);
    if (!Ai || !Bi) return 'A et B doivent être inversibles.';
    return !eqM(MX.inverse(MX.mul(A, B)), MX.mul(Ai, Bi)) || 'Avec ces matrices, (AB)⁻¹ = A⁻¹B⁻¹ : prends-en qui ne commutent pas.';
  },
  'det(A+B)=detA+detB': ({ A, B }) => !MX.det(MX.add(A, B)).eq(MX.det(A).add(MX.det(B))) || 'Avec ces matrices, det(A + B) = det A + det B.',
  '(A+B)^2=A^2+2AB+B^2': ({ A, B }) => {
    const S = MX.add(A, B);
    return !eqM(MX.mul(S, S), MX.add(MX.add(MX.mul(A, A), MX.scale(MX.mul(A, B), 2)), MX.mul(B, B))) || 'Avec ces matrices, l\'identité est vraie (elles commutent).';
  },
  'AB=0⇒A=0ouB=0': ({ A, B }) => {
    if (isZeroM(A) || isZeroM(B)) return 'A et B doivent être non nulles toutes les deux.';
    return isZeroM(MX.mul(A, B)) || 'Il faut AB = 0.';
  },
  '(AB)^T=A^TB^T': ({ A, B }) => !eqM(MX.transpose(MX.mul(A, B)), MX.mul(MX.transpose(A), MX.transpose(B))) || 'Avec ces matrices, (AB)ᵀ = AᵀBᵀ.',
  'AB=I⇒BA=I': ({ A, B }) => {
    const AB = MX.mul(A, B);
    if (!eqM(AB, MX.identity(AB.length))) return 'Il faut AB = I.';
    const BA = MX.mul(B, A);
    return !eqM(BA, MX.identity(BA.length)) || 'Avec ces matrices, BA = I aussi.';
  },
  'elemProduct': ({ A, B }) => {
    const n = A.length;
    const elem = (E) => !!MX.identifyRowOp(MX.identity(n), E) && MX.identifyRowOp(MX.identity(n), E).kind !== 'combo';
    if (!elem(A) || !elem(B)) return 'A et B doivent être des matrices élémentaires (I après une seule opération).';
    return !elem(MX.mul(A, B)) || 'Ce produit est encore élémentaire.';
  },
  sameRref: ({ A, B }) => (eqM(A, B) ? 'A et B doivent être différentes.' : MX.equal(MX.rref(A).R, MX.rref(B).R) || 'A et B n’ont pas la même forme réduite.'),
  'eig(A+B)=eig(A)+eig(B)': ({ A, B }) => {
    const ea = splitEig(A); const eb = splitEig(B);
    if (!ea || !eb) return 'Choisis des matrices à valeurs propres rationnelles (triangulaires, par exemple).';
    const la = ea.flatMap(({ value, mult }) => Array(mult).fill(value));
    const lb = eb.flatMap(({ value, mult }) => Array(mult).fill(value));
    const cs = MX.charpoly(MX.add(A, B));
    const perms = (xs) => (xs.length <= 1 ? [xs] : xs.flatMap((x, i) => perms([...xs.slice(0, i), ...xs.slice(i + 1)]).map((p) => [x, ...p])));
    const evalP = (l) => cs.reduceRight((s, c) => s.mul(l).add(c), q(0));
    const fits = perms(lb).some((p) => {
      const sums = la.map((x, i) => x.add(p[i]));
      // Same polynomial: the sums are all roots, with multiplicity (n ≤ 4).
      return sums.every((s) => evalP(s).n === 0) && MX.charpoly(MX.diag(sums)).every((c, i) => c.eq(cs[i]));
    });
    return !fits || 'Ici, les valeurs propres de A + B sont bien des sommes : choisis A et B sans vecteurs propres communs.';
  },
  // section mat
  'A,B inv⇒A+B inv': ({ A, B }) => {
    if (MX.det(A).n === 0 || MX.det(B).n === 0) return 'A et B doivent être inversibles.';
    return MX.det(MX.add(A, B)).n === 0 || 'Ici A + B est inversible.';
  },
};

const WANT_ONE = {
  nilpotent: ({ A }) => (isZeroM(A) ? 'A ne doit pas être nulle.' : isZeroM(MX.mul(A, A)) || 'Il faut A² = 0.'),
  notDiag: ({ A }) => {
    if (!sq(A)) return 'A doit être carrée.';
    const d = diagonalisable(A);
    if (d === null) {
      const cs = MX.charpoly(A);
      if (A.length === 2 && cs[1].mul(cs[1]).sub(cs[2].mul(cs[0]).mul(4)).n < 0) return true;
      return 'Choisis une matrice à valeurs propres entières (triangulaire, par exemple).';
    }
    return !d || 'Cette matrice est diagonalisable.';
  },
  diagRepeated: ({ A }) => {
    if (!sq(A)) return 'A doit être carrée.';
    const e = splitEig(A);
    if (!e) return 'Choisis une matrice à valeurs propres entières.';
    if (!e.some((x) => x.mult >= 2)) return 'Il faut une valeur propre multiple.';
    return diagonalisable(A) || 'Cette matrice n\'est pas diagonalisable.';
  },
  noRealEig: ({ A }) => {
    if (A.length !== 2 || !sq(A)) return 'Prends une matrice 2×2.';
    const cs = MX.charpoly(A);
    return cs[1].mul(cs[1]).sub(cs[2].mul(cs[0]).mul(4)).n < 0 || 'Cette matrice a une valeur propre réelle.';
  },
  orthCols: ({ A }) => {
    const C = MX.transpose(A);
    if (C.some((c) => c.every((x) => x.n === 0))) return 'Les colonnes doivent être non nulles.';
    if (C.some((u, i) => C.some((v, j) => j > i && MX.dot(u, v).n !== 0))) return 'Les colonnes doivent être orthogonales deux à deux.';
    return !eqM(MX.mul(MX.transpose(A), A), MX.identity(A[0].length)) || 'Ces colonnes sont orthonormées : AᵀA = I.';
  },
  detMinus1Orth: ({ A }) => {
    if (!sq(A) || !eqM(MX.mul(MX.transpose(A), A), MX.identity(A.length))) return 'A doit être orthogonale (AᵀA = I).';
    return MX.det(A).eq(-1) || 'Ici det A = 1.';
  },
  eigspaceDim: ({ A }, p) => {
    if (!sq(A) || (p.n && A.length !== p.n)) return `A doit être ${p.n}×${p.n}.`;
    // det(λI − A) = ∏(λ − r)^m, so det(A − λI) = (−1)ⁿ·that.
    let want = [q(1)];
    for (const [r, m] of p.poly) for (let i = 0; i < m; i++) want = polyMulLin(want, q(r));
    const cs = MX.charpoly(A);
    const sign = A.length % 2 ? q(-1) : q(1);
    if (want.length !== cs.length || !want.every((c, i) => c.mul(sign).eq(cs[i]))) return 'Ton polynôme caractéristique n’est pas celui de l’énoncé.';
    return geomDim(A, q(p.lambda)) !== p.dim || `Ici, l'espace propre de ${p.lambda} est bien de dimension ${p.dim}.`;
  },
  singularAtA: ({ A }) => MX.det(MX.mul(MX.transpose(A), A)).n === 0 || 'Ici AᵀA est inversible.',
  symNotPD: ({ A }) => {
    if (!MX.isSymmetric(A)) return 'A doit être symétrique.';
    if (A.some((r, i) => r[i].n <= 0)) return 'La diagonale doit être positive.';
    for (let k = 1; k <= A.length; k++) if (MX.det(A.slice(0, k).map((r) => r.slice(0, k))).n <= 0) return true;
    return 'Cette matrice est définie positive.';
  },
  sameEigNotSimilar: ({ A }, p) => {
    const B = readQ(p.B).mat;
    if (!sq(A) || A.length !== B.length) return `A doit être ${B.length}×${B.length}.`;
    const ca = MX.charpoly(A);
    const cb = MX.charpoly(B);
    if (!ca.every((c, i) => c.eq(cb[i]))) return 'A doit avoir les mêmes valeurs propres (avec multiplicités) que la matrice de l\'énoncé.';
    const s = similarQ(A, B);
    if (s === null) return 'Choisis une matrice à valeurs propres entières.';
    return !s || 'Ces deux matrices sont semblables.';
  },
  notLUable: ({ A }) => {
    if (!sq(A) || MX.det(A).n === 0) return 'A doit être carrée et inversible.';
    return !MX.lu(A) || 'Cette matrice a une factorisation LU sans échange.';
  },
  // Two echelon forms of the same matrix (answers A, E1, E2).
  echelonNotUnique: ({ A }, p, ans) => {
    const E1 = readQ(ans.E1)?.mat; const E2 = readQ(ans.E2)?.mat;
    if (!E1 || !E2) return 'Écris A et deux formes échelonnées E1 et E2.';
    if (!MX.isEchelon(E1) || !MX.isEchelon(E2)) return 'E1 et E2 doivent être échelonnées.';
    if (!MX.rowEquivalent(A, E1) || !MX.rowEquivalent(A, E2)) return 'E1 et E2 doivent s\'obtenir de A par des opérations sur les lignes.';
    return !eqM(E1, E2) || 'E1 et E2 sont égales.';
  },
  // The pivot columns of R do not span Col A.
  rrefColsNotBasis: ({ A }) => {
    const { R, pivots } = MX.rref(A);
    const cols = pivots.map((j) => MX.col(R, j));
    const span = MX.rank(MX.fromCols([...MX.transpose(A), ...cols])) === MX.rank(A) && MX.rank(MX.fromCols(cols)) === MX.rank(A);
    return !span || 'Pour cette matrice, les colonnes pivots de R engendrent bien Col A.';
  },
  // A and an echelon form E with different eigenvalues (answers A, E).
  echelonEigen: ({ A }, p, ans) => {
    const E = readQ(ans.E)?.mat;
    if (!E || !sq(A)) return 'Écris une matrice carrée A et une forme échelonnée E de A.';
    if (!MX.isEchelon(E) || !MX.rowEquivalent(A, E)) return 'E doit être une forme échelonnée de A.';
    const ca = MX.charpoly(A); const ce = MX.charpoly(E);
    return !ca.every((c, i) => c.eq(ce[i])) || 'Ici, A et E ont les mêmes valeurs propres.';
  },
  // v is an eigenvector of A but not of Aᵀ (answers A, v).
  transposeEigvec: ({ A }, p, ans) => {
    const v = readQ(ans.v)?.vec;
    if (!v || !sq(A) || v.length !== A.length || v.every((x) => x.n === 0)) return 'Écris A carrée et un vecteur v non nul de la bonne taille.';
    const prop = (M) => { const w = MX.matVec(M, v); return MX.rank(MX.fromCols([v, w])) <= 1; };
    if (!prop(A)) return 'v doit être un vecteur propre de A.';
    return !prop(MX.transpose(A)) || 'v est aussi un vecteur propre de Aᵀ.';
  },
  colPerpNotKer: ({ A }) => {
    if (A.length !== A[0].length) return true;
    const K = MX.kernel(A);
    const P = MX.kernel(MX.transpose(A));
    const span = (U, V) => U.length === V.length && (U.length === 0 || MX.rank(MX.fromCols([...U, ...V])) === U.length);
    return !span(K, P) || 'Pour cette matrice, (Col A)⊥ = Ker A.';
  },
  blockDet: ({ A }) => {
    if (A.length !== 4 || A[0].length !== 4) return 'Écris une matrice 4×4.';
    const blk = (r, c) => A.slice(r, r + 2).map((row) => row.slice(c, c + 2));
    const f = MX.det(blk(0, 0)).mul(MX.det(blk(2, 2))).sub(MX.det(blk(0, 2)).mul(MX.det(blk(2, 0))));
    return !MX.det(A).eq(f) || 'Pour cette matrice, la formule donne le bon déterminant.';
  },
  // u ≠ 0 with Au = 0 (answers A, u).
  innerNotPD: ({ A }, p, ans) => {
    const u = readQ(ans.u)?.vec;
    if (!u || u.length !== A[0].length) return 'Écris A et un vecteur u de la bonne taille.';
    if (u.every((x) => x.n === 0)) return 'u doit être non nul.';
    return MX.matVec(A, u).every((x) => x.n === 0) || 'Il faut Au = 0 : alors ⟨u, u⟩ = ‖Au‖² = 0.';
  },
  // B = EA (E invertible) whose rows have other relations than those of A.
  rowRelations: ({ A }, p, ans) => {
    const B = readQ(ans.B)?.mat;
    if (!B || B.length !== A.length || B[0].length !== A[0].length) return 'Écris A et B de même taille.';
    if (!MX.rowEquivalent(A, B)) return 'B doit s\'obtenir de A par des opérations sur les lignes.';
    const ka = MX.kernel(MX.transpose(A));
    const kb = MX.kernel(MX.transpose(B));
    const same = ka.length === kb.length && (ka.length === 0 || MX.rank(MX.fromCols([...ka, ...kb])) === ka.length);
    return !same || 'Les lignes de A et de B ont ici les mêmes relations.';
  },
  // section sys
  // Pivots in every row or not (rowsAll), in every column or not (colsAll),
  // and the shape: 'wide' (m < n), 'tall' (m > n), 'square'.
  pivots: ({ A }, p) => {
    const [m, n] = [A.length, A[0].length];
    if (p.shape === 'wide' && m >= n) return 'A doit avoir moins de lignes que de colonnes.';
    if (p.shape === 'tall' && m <= n) return 'A doit avoir plus de lignes que de colonnes.';
    if (p.shape === 'square' && m !== n) return 'A doit être carrée.';
    const r = MX.rank(A);
    if (p.rowsAll === true && r < m) return 'Il faut un pivot dans chaque ligne : Ax = b doit avoir une solution pour tout b.';
    if (p.rowsAll === false && r === m) return 'Ici, chaque ligne a un pivot : Ax = b a une solution pour tout b.';
    if (p.colsAll === true && r < n) return 'Il faut un pivot dans chaque colonne : Ax = 0 ne doit avoir que la solution nulle.';
    if (p.colsAll === false && r === n) return 'Ici, chaque colonne a un pivot : Ax = 0 n\'a que la solution nulle.';
    return true;
  },
  // Ax = 0 has infinitely many solutions and Ax = b none (answers A, b);
  // wide: m < n.
  kerNoSolution: ({ A }, p, ans) => {
    const b = readQ(ans.b)?.vec;
    if (!b || b.length !== A.length) return `Écris b avec ${A.length} composantes.`;
    if (p.wide && A.length >= A[0].length) return 'A doit avoir moins de lignes que de colonnes.';
    const r = MX.rank(A);
    if (r === A[0].length) return 'Ici, Ax = 0 n\'a que la solution nulle.';
    return MX.rank(MX.hcat(A, b.map((x) => [x]))) > r || 'Ici, Ax = b a des solutions.';
  },
  // section mat
  singular: ({ A }) => (!sq(A) ? 'A doit être carrée.' : MX.det(A).n === 0 || 'Cette matrice est inversible.'),
};

// (λ − r)·P, P as coefficients from λ⁰.
function polyMulLin(P, r) {
  const out = Array(P.length + 1).fill(q(0));
  P.forEach((c, k) => { out[k + 1] = out[k + 1].add(c); out[k] = out[k].sub(c.mul(r)); });
  return out;
}

function readFamily(text) {
  const r = readQ(text);
  if (!r) return null;
  if (r.list) return r.list;
  if (r.vec) return [r.vec];
  return null;
}

const WANT_FAMILY = {
  scaledDependent: (ans) => {
    const vs = readFamily(ans.F);
    const al = String(ans.alpha ?? '').split(/[;,]/).map((s) => s.trim()).filter(Boolean).map((s) => readQ(s)?.scalar);
    if (!vs || !vs.length) return 'Écris des vecteurs v₁, v₂, … séparés par des virgules.';
    if (al.length !== vs.length || al.some((x) => !x)) return `Écris ${vs.length} nombres α, séparés par « ; ».`;
    if (MX.rank(MX.fromCols(vs)) !== vs.length) return 'Les vᵢ doivent être libres.';
    const ws = vs.map((v, i) => v.map((x) => x.mul(al[i])));
    return MX.rank(MX.fromCols(ws)) < ws.length || 'Les αᵢvᵢ sont encore libres.';
  },
  orthNotTransitive: (ans) => {
    const [u, v, w] = ['u', 'v', 'w'].map((k) => readQ(ans[k])?.vec);
    if (!u || !v || !w || u.length !== v.length || v.length !== w.length) return 'Écris trois vecteurs u, v, w de même taille.';
    if (MX.dot(u, v).n !== 0 || MX.dot(v, w).n !== 0) return 'Il faut u ⊥ v et v ⊥ w.';
    return MX.dot(u, w).n !== 0 || 'Ici u ⊥ w aussi.';
  },
  spanNotPlane: (ans) => {
    const vs = readFamily(ans.F);
    if (!vs || vs.length !== 2) return 'Écris deux vecteurs u, v.';
    return MX.rank(MX.fromCols(vs)) < 2 || 'Ces deux vecteurs engendrent un plan.';
  },
  spanNotBasis: (ans, p) => {
    const vs = readFamily(ans.F);
    if (!vs || vs.length !== p.n || vs.some((v) => v.length !== p.n)) return `Écris ${p.n} vecteurs de ℝ${'⁰¹²³⁴⁵⁶'[p.n]}.`;
    return MX.rank(MX.fromCols(vs)) < p.n || 'Ces vecteurs forment une base.';
  },
  indepNotBasis: (ans, p) => {
    const vs = readFamily(ans.F);
    if (!vs || vs.some((v) => v.length !== p.n)) return `Écris des vecteurs de ℝ${'⁰¹²³⁴⁵⁶'[p.n]}.`;
    if (MX.rank(MX.fromCols(vs)) !== vs.length) return 'La famille doit être libre.';
    return vs.length < p.n || 'Cette famille est une base.';
  },
  // section sys
  // Three vectors, no two of them proportional, and yet linked.
  pairwiseFreeDependent: (ans) => {
    const vs = readFamily(ans.F);
    if (!vs || vs.length !== 3 || vs.some((v) => v.length !== vs[0].length)) return 'Écris trois vecteurs de même taille.';
    for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) if (MX.rank(MX.fromCols([vs[i], vs[j]])) < 2) return 'Deux de tes vecteurs sont colinéaires.';
    return MX.rank(MX.fromCols(vs)) < 3 || 'Ces trois vecteurs sont libres.';
  },
  // T(x) = (params.T: components in x_1 … x_n) is not linear: u, v with
  // T(u + v) ≠ T(u) + T(v); or u and a number c with T(cu) ≠ cT(u); or
  // u = 0 alone with T(0) ≠ 0 (answers u, v, c).
  notLinear: (ans, p) => {
    const T = (x) => p.T.map((c) => readQ(c.replace(/x_(\d+)/g, (_, i) => `(${x[Number(i) - 1]})`))?.scalar);
    const same = (a, b) => a.every((x, i) => x && b[i] && x.eq(b[i]));
    const u = readQ(ans.u)?.vec;
    if (!u || u.length !== p.n) return `Écris u avec ${p.n} composantes.`;
    const cText = String(ans.c ?? '').trim();
    if (cText) {
      const c = readQ(cText)?.scalar;
      if (!c) return 'Je n\'arrive pas à lire c.';
      return !same(T(u.map((x) => x.mul(c))), T(u).map((y) => y.mul(c))) || 'Ici T(cu) = cT(u).';
    }
    const vText = String(ans.v ?? '').trim();
    if (!vText) return u.every((x) => x.n === 0) ? (!same(T(u), u.map(() => q(0))) ? true : 'Ici T(0) = 0.') : 'Donne u et v (ou u et un nombre c).';
    const v = readQ(vText)?.vec;
    if (!v || v.length !== p.n) return `Écris v avec ${p.n} composantes.`;
    return !same(T(u.map((x, i) => x.add(v[i]))), T(u).map((y, i) => y.add(T(v)[i]))) || 'Ici T(u + v) = T(u) + T(v).';
  },
};

// The coordinates of an element of H: a vector, a matrix row by row, or a
// polynomial in t (constant first).
function coordsOf(text, p) {
  if (p.poly) {
    const node = tryParse(String(text ?? '').replace(/^\s*\w+\s*=/, ''), { vars: ['t'] });
    const P = node && polyOf(mapNode(node, (x) => (x.t === 'sym' && x.name === 't' ? { t: 'sym', name: 'x' } : x)));
    const cs = P && qCoeffs(P);
    if (!cs || cs.length > p.n) return null;
    return [...cs, ...Array(p.n - cs.length).fill(q(0))];
  }
  const r = readQ(text);
  if (!r) return null;
  const flat = r.vec ?? r.mat?.flat();
  return flat && flat.length === p.n ? flat : null;
}

function inSet(xs, p) {
  const rel = parse(p.member, { vars: xs.map((_, i) => `x_${i + 1}`) });
  const node = mapNode(rel, (n) => (n.t === 'sym' && n.name === 'x' && n.sub ? { t: 'paren', e: lit(xs[Number(typeof n.sub === 'object' ? n.sub.v?.n ?? n.sub.name : n.sub) - 1] ?? q(0)) } : n));
  return closedHolds(node, {});
}

function checkSetWitness(counter, ans) {
  const p = counter.params;
  const x = coordsOf(ans.x, p);
  if (!x) return need('Je n\'arrive pas à lire x.');
  const hasY = ans.y !== undefined && String(ans.y).trim() !== '';
  const c = ans.c !== undefined && String(ans.c).trim() !== '' ? readQ(ans.c)?.scalar : null;
  // 0 ∉ H.
  if (!hasY && !c) {
    if (x.some((v) => v.n !== 0)) return need('Donne deux éléments x et y de H (et éventuellement un nombre c).');
    return inSet(x, p) ? need('Le vecteur nul est dans H.') : { ok: true };
  }
  if (!inSet(x, p)) return need('x n\'est pas dans H.');
  if (c) return inSet(x.map((v) => v.mul(c)), p) ? need('c·x est encore dans H.') : { ok: true };
  const y = coordsOf(ans.y, p);
  if (!y) return need('Je n\'arrive pas à lire y.');
  if (!inSet(y, p)) return need('y n\'est pas dans H.');
  return inSet(x.map((v, i) => v.add(y[i])), p) ? need('x + y est encore dans H : ce n\'est pas un contre-exemple.') : { ok: true };
}

function checkDims(counter, ans) {
  const vals = {};
  for (const k of ['m', 'n', 'r']) {
    if (ans[k] === undefined || String(ans[k]).trim() === '') continue;
    const v = Number(String(ans[k]).trim());
    if (!Number.isInteger(v) || v < 0) return need(`${k} doit être un entier naturel.`);
    vals[k] = v;
  }
  if (vals.m !== undefined && vals.m < 1) return need('m ≥ 1.');
  if (vals.n !== undefined && vals.n < 1) return need('n ≥ 1.');
  if (vals.r !== undefined && vals.r > Math.min(vals.m ?? Infinity, vals.n ?? Infinity)) return need('Le rang est au plus min(m, n).');
  for (const cond of counter.params.conds || []) {
    const node = mapNode(parse(cond, { vars: ['m', 'n', 'r'] }), (x) => (x.t === 'sym' && x.name in vals ? { t: 'paren', e: lit(q(vals[x.name])) } : x));
    let ok = false;
    try { ok = closedHolds(node, {}); } catch { ok = false; }
    if (!ok) return need(`Il faut ${cond.replace(/<=/g, '≤').replace(/>=/g, '≥')}.`);
  }
  return { ok: true };
}

export function checkLinalg(counter, answers = {}) {
  const p = counter.params || {};
  switch (counter.kind) {
    case 'matPair': {
      const r = pairMats(counter, answers);
      if (r.error) return r.error;
      const t = TESTS_PAIR[p.test];
      if (!t) return need('Test inconnu.');
      const v = t(r);
      return v === true ? { ok: true } : need(v);
    }
    case 'matOne': {
      const A = readQ(answers.A)?.mat;
      if (!A) return need('Écris la matrice A, case par case.');
      if (p.n && (A.length !== p.n || A[0].length !== (p.cols ?? p.n))) return need(`A doit être ${p.n}×${p.cols ?? p.n}.`);
      const t = WANT_ONE[p.want];
      if (!t) return need('Propriété inconnue.');
      const v = t({ A }, p, answers);
      return v === true ? { ok: true } : need(v);
    }
    case 'vecFamily': {
      const t = WANT_FAMILY[p.want];
      if (!t) return need('Propriété inconnue.');
      const v = t(answers, p);
      return v === true ? { ok: true } : need(v);
    }
    case 'setWitness': return checkSetWitness(counter, answers);
    case 'mapWitness': {
      const A = readQ(p.A).mat;
      const x = readQ(answers.x)?.vec;
      const y = readQ(answers.y)?.vec;
      if (!x || !y || x.length !== A[0].length || y.length !== A[0].length) return need(`Écris deux vecteurs x et y à ${A[0].length} composantes.`);
      if (x.every((v, i) => v.eq(y[i]))) return need('x et y doivent être différents.');
      const ax = MX.matVec(A, x); const ay = MX.matVec(A, y);
      return ax.every((v, i) => v.eq(ay[i])) ? { ok: true } : need('Ici T(x) ≠ T(y).');
    }
    case 'dims': return checkDims(counter, answers);
    default: return null;
  }
}

export const LINALG_TESTS = { pair: Object.keys(TESTS_PAIR), one: Object.keys(WANT_ONE), family: Object.keys(WANT_FAMILY) };

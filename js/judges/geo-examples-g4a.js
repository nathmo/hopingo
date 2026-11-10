// Counter-examples of module G4, part a (step U5): see js/judges/geo-examples.js.
// WANT[want](values, params) → true, or a message.

import { isVec, subF, det2F, isZeroF, dotF, crossF } from './geo-examples.js';

const near = (x) => Math.abs(x) < 1e-9;

export const WANT = {
  // AB⃗ = DC⃗ but A, B, C, D aligned (a flat « parallelogram »).
  flatParallelogram: ({ A, B, C, D }) => {
    if (![A, B, C, D].every((P) => isVec(P, 2))) return 'Donne quatre points du plan, comme (1 ; 2).';
    const ab = subF(B.xs, A.xs);
    const dc = subF(C.xs, D.xs);
    if (isZeroF(ab)) return 'A et B doivent être distincts.';
    if (!isZeroF(subF(ab, dc))) return "Il faut AB⃗ = DC⃗ : sinon l'hypothèse est fausse.";
    if (Math.abs(det2F(ab, subF(C.xs, A.xs))) > 1e-9) return 'A, B et C ne sont pas alignés : ABCD est alors un vrai parallélogramme.';
    return true;
  },
  // A point on both lines a x + b y + c = 0 (params.rows): they are not distinct.
  commonPoint: ({ P }, { rows }) => {
    if (!isVec(P, 2)) return 'Donne un point du plan, comme (1 ; 2).';
    const bad = rows.find((r) => !near(r[0] * P.xs[0] + r[1] * P.xs[1] + r[2]));
    return bad ? "Ce point n'est pas sur les deux droites." : true;
  },
  // u⃗·v⃗ = 0 with u⃗ ≠ 0⃗ and v⃗ ≠ 0⃗.
  orthNonzero: ({ u, v }) => {
    if (!isVec(u) || !isVec(v) || u.xs.length !== v.xs.length) return 'Donne deux vecteurs de même dimension, comme (1 ; 2).';
    if (isZeroF(u.xs) || isZeroF(v.xs)) return "Avec un vecteur nul, la conclusion est vraie : ce n'est pas un contre-exemple.";
    return near(dotF(u.xs, v.xs)) ? true : "u⃗·v⃗ ≠ 0 : l'hypothèse est fausse.";
  },
  // A point of the plane params.row, not on the line A + t·v.
  pointOnPlaneOffLine: ({ P }, { row, A, v }) => {
    if (!isVec(P, 3)) return "Donne un point de l'espace, comme (1 ; 2 ; 3).";
    if (!near(row[0] * P.xs[0] + row[1] * P.xs[1] + row[2] * P.xs[2] + row[3])) return "Ce point n'est pas dans le plan de l'équation.";
    return isZeroF(crossF(subF(P.xs, A), v)) ? 'Ce point est sur la droite : il en faut un hors de la droite.' : true;
  },
  // Three distinct aligned points of space.
  threeAligned: ({ A, B, C }) => {
    if (![A, B, C].every((P) => isVec(P, 3))) return "Donne trois points de l'espace, comme (1 ; 2 ; 3).";
    const u = subF(B.xs, A.xs);
    const w = subF(C.xs, A.xs);
    if (isZeroF(u) || isZeroF(w) || isZeroF(subF(C.xs, B.xs))) return 'Les trois points doivent être distincts.';
    return isZeroF(crossF(u, w)) ? true : 'Ces points ne sont pas alignés : ils définissent bien un plan.';
  },
  // Two lines A + s·u, B + t·v, not parallel and without common point.
  skewLines: ({ A, u, B, v }) => {
    if (![A, u, B, v].every((P) => isVec(P, 3))) return "Donne des points et des vecteurs de l'espace, comme (1 ; 2 ; 3).";
    if (isZeroF(u.xs) || isZeroF(v.xs)) return 'Une direction ne peut pas être nulle.';
    const n = crossF(u.xs, v.xs);
    if (isZeroF(n)) return 'Ces droites sont parallèles : il en faut deux non parallèles.';
    return near(dotF(subF(B.xs, A.xs), n)) ? 'Ces droites sont sécantes.' : true;
  },
};

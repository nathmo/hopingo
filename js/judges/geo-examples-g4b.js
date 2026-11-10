// Counter-examples of module G4, part b (step U5): see js/judges/geo-examples.js.
// WANT[want](values, params) → true, or a message.

import { isVec, dotF, crossF, isZeroF, subF } from './geo-examples.js';

const det3 = (u, v, w) => dotF(crossF(u, v), w);
const colinearF = (u, v) => isZeroF(crossF(u, v).map((x) => (Math.abs(x) < 1e-12 ? 0 : x)));
const normF = (u) => Math.sqrt(dotF(u, u));

export const WANT = {
  // u ∧ v ≠ v ∧ u: any u, v not colinear.
  crossNotCommute: ({ u, v }) => {
    if (!isVec(u, 3) || !isVec(v, 3)) return 'Donne deux vecteurs de l\'espace, comme (1 ; 0 ; 0).';
    if (colinearF(u.xs, v.xs)) return 'Avec ces vecteurs, u ∧ v = 0⃗ = v ∧ u : choisis-les non colinéaires.';
    return true;
  },
  // [u, v, w] = 0 with no two of them colinear.
  coplanarNoColinear: ({ u, v, w }) => {
    if (![u, v, w].every((x) => isVec(x, 3))) return 'Donne trois vecteurs de l\'espace.';
    if (Math.abs(det3(u.xs, v.xs, w.xs)) > 1e-9) return 'Leur produit mixte n\'est pas nul : l\'hypothèse est fausse.';
    if (colinearF(u.xs, v.xs) || colinearF(u.xs, w.xs) || colinearF(v.xs, w.xs)) return 'Deux de tes vecteurs sont colinéaires : ce n\'est pas un contre-exemple.';
    return true;
  },
  // The true foot H of P on the plane n·x + d = 0, different from the point proposed.
  footOfPlane: ({ H }, { n, d, P, wrong }) => {
    if (!isVec(H, 3)) return 'Donne un point de l\'espace.';
    if (Math.abs(dotF(n, H.xs) + d) > 1e-9) return 'Ce point n\'est pas dans le plan.';
    if (!colinearF(subF(P, H.xs), n)) return 'PH⃗ n\'est pas orthogonal au plan : ce n\'est pas le pied.';
    if (isZeroF(subF(H.xs, wrong).map((x) => (Math.abs(x) < 1e-12 ? 0 : x)))) return 'C\'est le point proposé : il faut montrer qu\'il ne convient pas.';
    return true;
  },
  // Two points of the lines closer than the base points.
  skewCloser: ({ P, Q }, { A, u, B, v }) => {
    if (!isVec(P, 3) || !isVec(Q, 3)) return 'Donne deux points de l\'espace.';
    if (!colinearF(subF(P.xs, A), u)) return 'P n\'est pas sur d₁.';
    if (!colinearF(subF(Q.xs, B), v)) return 'Q n\'est pas sur d₂.';
    if (normF(subF(Q.xs, P.xs)) >= normF(subF(B, A)) - 1e-9) return 'PQ n\'est pas plus court que AB.';
    return true;
  },
  // r² ≤ 0: not a sphere (the value of r² is asked).
  radiusSquared: ({ r2 }, { value }) => {
    if (!r2 || r2.k !== 's') return 'Donne la valeur de r².';
    if (Math.abs(r2.x - value) > 1e-9) return 'Ce n\'est pas la valeur de r² : complète les carrés.';
    return true;
  },
};

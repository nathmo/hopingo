// Counter-examples of module G4, part a (step U5): see js/judges/geo-examples.js.
// WANT[want](values, params) → true, or a message.

import { isVec, subF, det2F, isZeroF } from './geo-examples.js';

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
};

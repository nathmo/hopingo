// Counter-examples of module N, part g (see js/judges/n-examples.js).
// PROPS: {name: (params, answers) => {ok, message?, rule?}}.
//   epNotDecreasing  {lambda, h}: λ < 0, h > 0 and |1 + hλ| ≥ 1: Euler
//                    progressif on u′ = λu does not make |uₙ| decrease.
//   heunUnstable     {z}: z = hλ < 0 with |1 + z + z²/2| ≥ 1 (Heun is not
//                    stable for this step).
//   absOneMinusH     {h}: h > 0 with |1 − h| > 1.

import { numberOf } from './n-examples-util.js';

export const PROPS = {
  epNotDecreasing(params, a) {
    const L = numberOf(a.lambda);
    const h = numberOf(a.h);
    if (L === null || h === null) return { ok: false, message: 'Donne deux nombres λ et h.' };
    if (!(L < 0)) return { ok: false, message: 'L\'énoncé suppose λ < 0.' };
    if (!(h > 0)) return { ok: false, message: 'Le pas h doit être > 0.' };
    if (Math.abs(1 + h * L) >= 1) return { ok: true };
    return { ok: false, message: `Ici |1 + hλ| = ${String(Math.abs(1 + h * L)).replace('.', ',')} < 1 : |uₙ| décroît. Prends h plus grand.`, rule: 'n_stab_factor2' };
  },
  heunUnstable(params, a) {
    const z = numberOf(a.z);
    if (z === null) return { ok: false, message: 'Donne un nombre z = hλ.' };
    if (!(z < 0)) return { ok: false, message: 'Pour le problème modèle, z = hλ < 0.' };
    const R = 1 + z + (z * z) / 2;
    if (Math.abs(R) >= 1) return { ok: true };
    return { ok: false, message: `Ici R(z) = ${String(Number(R.toPrecision(4))).replace('.', ',')} : |R| < 1, Heun est stable pour ce pas.` };
  },
  absOneMinusH(params, a) {
    const h = numberOf(a.h);
    if (h === null) return { ok: false, message: 'Donne un nombre h.' };
    if (!(h > 0)) return { ok: false, message: 'Le pas h doit être > 0.' };
    if (Math.abs(1 - h) > 1) return { ok: true };
    return { ok: false, message: `Ici |1 − h| = ${String(Math.abs(1 - h)).replace('.', ',')} ≤ 1.`, rule: 'n_h_le_2_forgotten' };
  },
};

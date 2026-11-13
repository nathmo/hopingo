// Counter-examples of module G10, part b (step U5): see js/judges/geo-examples.js.
// WANT[want](values, params) → true, or a message.

import { isVec } from './geo-examples.js';
import { t } from '../i18n.js';
import { analyzeConic } from '../cas/conic.js';

export const WANT = {
  // δ = ac − b²/4 > 0, but no real ellipse (empty set or a point).
  deltaPosNotEllipse: ({ A, L }) => {
    if (!isVec(A, 3) || !isVec(L, 3)) return t('Donne (a ; b ; c) et (d ; e ; f), trois nombres chacun.');
    const co = [...A.xs, ...L.xs];
    const delta = co[0] * co[2] - (co[1] * co[1]) / 4;
    if (!(delta > 1e-12)) return t('Il faut δ = ac − b²/4 > 0 : sinon l\'hypothèse est fausse.');
    const an = analyzeConic(co);
    if (an.type === 'ellipse' || an.type === 'circle') return t('Cette conique est une vraie ellipse : ce n\'est pas un contre-exemple.');
    return true;
  },
};

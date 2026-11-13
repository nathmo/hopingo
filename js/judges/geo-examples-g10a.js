// Counter-examples of module G10, part a (step U5): see js/judges/geo-examples.js.
// WANT[want](values, params) → true, or a message.

import { isVec } from './geo-examples.js';
import { t } from '../i18n.js';

const isNum = (v) => v?.k === 's' && Number.isFinite(v.x);
const near = (a, b) => Math.abs(a - b) < 1e-9;

export const WANT = {
  // « … est un cercle » is false: r² < 0 (the value of the equation's r²).
  r2Negative: ({ r2 }, { value }) => {
    if (!isNum(r2)) return t('Donne la valeur de r², un nombre.');
    if (!near(r2.x, Number(value))) return t('Complète les carrés : ce n\'est pas la valeur de r² de cette équation.');
    return r2.x < 0 ? true : t('Avec r² ≥ 0, ce serait un cercle (ou un point).');
  },
  // From Q, outside the circle (Ω, r), the vertical line x = x_Q is a tangent:
  // only one slope m.
  verticalTangent: ({ Q }, { h, k, r }) => {
    if (!isVec(Q, 2)) return t('Donne un point du plan, comme (1 ; 2).');
    const [x, y] = Q.xs;
    if (Math.hypot(x - h, y - k) <= r + 1e-9) return t('Q doit être à l\'extérieur du cercle.');
    return near(Math.abs(x - h), r) ? true : t('Depuis ce point, les deux tangentes ont une pente : la droite x = x_Q n\'est pas tangente.');
  },
  // Two circles with no common point: the radical axis is no chord.
  disjointCircles: ({ O1, r1, O2, r2 }) => {
    if (!isVec(O1, 2) || !isVec(O2, 2)) return t('Donne les centres, comme (1 ; 2).');
    if (!isNum(r1) || !isNum(r2) || r1.x <= 0 || r2.x <= 0) return t('Les rayons doivent être des nombres positifs.');
    const d = Math.hypot(O1.xs[0] - O2.xs[0], O1.xs[1] - O2.xs[1]);
    if (d < 1e-9) return t('Deux cercles concentriques n\'ont pas d\'axe radical.');
    if (d > r1.x + r2.x + 1e-9 || d < Math.abs(r1.x - r2.x) - 1e-9) return true;
    return t('Ces cercles se coupent (ou se touchent) : l\'axe radical passe par leurs points communs.');
  },
  // A point inside the circle (Ω, r), not Ω: its polar does not cut the circle.
  interiorPolar: ({ P }, { h, k, r }) => {
    if (!isVec(P, 2)) return t('Donne un point du plan, comme (1 ; 2).');
    const d = Math.hypot(P.xs[0] - h, P.xs[1] - k);
    if (d < 1e-9) return t('Le centre n\'a pas de polaire.');
    return d < r - 1e-9 ? true : t('Ce point n\'est pas à l\'intérieur du cercle.');
  },
  // An ellipse x²/a² + y²/b² = 1 (a > b > 0): its foci are not at √(a² + b²).
  ellipseFoci: ({ a, b }) => {
    if (!isNum(a) || !isNum(b)) return t('Donne deux nombres a et b.');
    return a.x > b.x && b.x > 0 ? true : t('Il faut a > b > 0.');
  },
  // The focus of the parabola: the right one.
  parabolaFocus: ({ F }, { fx, fy }) => {
    if (!isVec(F, 2)) return t('Donne un point du plan, comme (0 ; 1).');
    return near(F.xs[0], Number(fx)) && near(F.xs[1], Number(fy)) ? true : t('Ce n\'est pas le foyer : il est à p/2 du sommet.');
  },
};

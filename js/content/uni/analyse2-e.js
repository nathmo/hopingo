// Generators of module A2, part e (unit `analyse2`, step U6): extrema.
// Catalogue: docs/universite/A2-analyse-2.md. Skills: analyse2-e.skills.js;
// traps: js/cas/rules/a2e.js. GEN[id] = (level, rng, profile, opts) => item.
// Stationary points and the 2 × 2 Hessian: analyse2-e-crit.js; the 3 × 3
// Hessian: analyse2-e-hess3.js; extrema on a compact set:
// analyse2-e-compact.js; Lagrange: analyse2-e-lagrange.js; helpers:
// analyse2-e-kit.js.

import { critPoints, hessian2 } from './analyse2-e-crit.js';

export const GEN = {
  'a2-crit-points': critPoints,
  'a2-hessian-2x2': hessian2,
};

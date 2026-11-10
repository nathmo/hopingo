// Generators of module N, part e (unit `numerique`, step U9): quadrature,
// énoncés d'erreur, Richardson. Catalogue: docs/universite/N-analyse-numerique.md.
// GEN[id] = (level, rng, profile, opts) => item (spec §8.3); shared tools
// in numerique-kit.js and numerique-e-kit.js. Files: numerique-e-comp.js
// (n-quad-composite, n-richardson), numerique-e-exact.js (n-quad-exactness,
// n-quad-order), numerique-e-proof.js (n-quad-proof, n-error-statements).

import { GEN as COMP } from './numerique-e-comp.js';
import { GEN as EXACT } from './numerique-e-exact.js';
import { GEN as PROOF } from './numerique-e-proof.js';

export const GEN = { ...COMP, ...EXACT, ...PROOF };

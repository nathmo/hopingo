// Generators of module N, part f (unit `numerique`, step U9): systèmes linéaires.
// Catalogue: docs/universite/N-analyse-numerique.md. GEN[id] = (level, rng,
// profile, opts) => item (spec §8.3); shared tools in numerique-kit.js.
// One file per skill: numerique-f-lu.js, -thomas.js, -iter.js (Jacobi,
// Gauss-Seidel, convergence), -grad.js (gradient).

import { GEN as LU } from './numerique-f-lu.js';
import { GEN as THOMAS } from './numerique-f-thomas.js';
import { GEN as ITER } from './numerique-f-iter.js';
import { GEN as GRAD } from './numerique-f-grad.js';

export const GEN = { ...LU, ...THOMAS, ...ITER, ...GRAD };

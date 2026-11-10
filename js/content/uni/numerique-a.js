// Generators of module N, part a (unit `numerique`, step U9): erreurs,
// bissection, point fixe. Catalogue: docs/universite/N-analyse-numerique.md.
// GEN[id] = (level, rng, profile, opts) => item (spec §8.3); shared tools in
// numerique-kit.js. numerique-a-err.js: n-err-abs-rel, n-err-float;
// numerique-a-bisect.js: n-bisection; numerique-a-fp.js: n-fp-converge,
// n-fp-order.

import { genErrAbsRel, genErrFloat } from './numerique-a-err.js';
import { genBisection } from './numerique-a-bisect.js';
import { genFpConverge, genFpOrder } from './numerique-a-fp.js';

export const GEN = {
  'n-err-abs-rel': genErrAbsRel,
  'n-err-float': genErrFloat,
  'n-bisection': genBisection,
  'n-fp-converge': genFpConverge,
  'n-fp-order': genFpOrder,
};

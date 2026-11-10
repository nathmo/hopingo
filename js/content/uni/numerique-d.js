// Generators of module N, part d (unit `numerique`, step U9): finite
// differences (n-fd-basic, n-fd-roundoff, n-fd-build, n-fd-proof).
// Catalogue: docs/universite/N-analyse-numerique.md. GEN[id] = (level, rng,
// profile, opts) => item (spec §8.3); shared tools in numerique-kit.js and
// numerique-d-kit.js.

import { GEN as BASIC } from './numerique-d-basic.js';
import { GEN as ROUND } from './numerique-d-round.js';
import { GEN as BUILD } from './numerique-d-build.js';
import { GEN as PROOF } from './numerique-d-proof.js';

export const GEN = { ...BASIC, ...ROUND, ...BUILD, ...PROOF };

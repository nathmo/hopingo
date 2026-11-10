// Generators of module N, part c (unit `numerique`, step U9): interpolation, moindres carrés.
// Catalogue: docs/universite/N-analyse-numerique.md. GEN[id] = (level, rng,
// profile, opts) => item (spec §8.3); shared tools in numerique-kit.js and
// numerique-c-kit.js.

import { GEN as LAGRANGE } from './numerique-c-lagrange.js';
import { GEN as ERROR } from './numerique-c-error.js';
import { GEN as PIECE } from './numerique-c-piece.js';
import { GEN as LSQ } from './numerique-c-lsq.js';

export const GEN = { ...LAGRANGE, ...ERROR, ...PIECE, ...LSQ };

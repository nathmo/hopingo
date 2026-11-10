// Generators of module N, part g (unit `numerique`, step U9): équations différentielles.
// Catalogue: docs/universite/N-analyse-numerique.md. GEN[id] = (level, rng,
// profile, opts) => item (spec §8.3); shared tools in numerique-kit.js and
// numerique-g-kit.js; one file per skill (numerique-g-<skill>.js).

import { GEN as EULER } from './numerique-g-euler.js';
import { GEN as RK } from './numerique-g-rk.js';
import { GEN as STAB } from './numerique-g-stab.js';
import { GEN as GLOBAL } from './numerique-g-global.js';
import { GEN as IMPLICIT } from './numerique-g-implicit.js';
import { GEN as STIFF } from './numerique-g-stiff.js';

export const GEN = { ...EULER, ...RK, ...STAB, ...GLOBAL, ...IMPLICIT, ...STIFF };

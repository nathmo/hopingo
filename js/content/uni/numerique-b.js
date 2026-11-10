// Generators of module N, part b (unit `numerique`, step U9): Newton, ordre, sécante.
// Catalogue: docs/universite/N-analyse-numerique.md. GEN[id] = (level, rng,
// profile, opts) => item (spec §8.3); shared tools in numerique-kit.js.
// One file per skill: numerique-b-newton.js, -order.js, -multiple.js,
// -system.js, -secant.js.

import { GEN as NEWTON } from './numerique-b-newton.js';
import { GEN as ORDER } from './numerique-b-order.js';
import { GEN as MULTIPLE } from './numerique-b-multiple.js';
import { GEN as SYSTEM } from './numerique-b-system.js';
import { GEN as SECANT } from './numerique-b-secant.js';

export const GEN = { ...NEWTON, ...ORDER, ...MULTIPLE, ...SYSTEM, ...SECANT };

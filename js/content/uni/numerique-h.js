// Generators of module N, part h (unit `numerique`, step U9): problèmes aux limites, EDP, éléments finis, KKT.
// Catalogue: docs/universite/N-analyse-numerique.md. GEN[id] = (level, rng,
// profile, opts) => item (spec §8.3); shared tools in numerique-kit.js,
// those of the part in numerique-h-kit.js.
//   numerique-h-bvp.js     n-bvp-fd, n-bvp-convergence
//   numerique-h-newton.js  n-bvp-newton
//   numerique-h-heat.js    n-heat-implicit, n-pde-cfl
//   numerique-h-fem.js     n-fem-hat, n-opt-kkt

import { GEN as BVP } from './numerique-h-bvp.js';
import { GEN as NEWTON } from './numerique-h-newton.js';
import { GEN as HEAT } from './numerique-h-heat.js';
import { GEN as FEM } from './numerique-h-fem.js';

export const GEN = { ...BVP, ...NEWTON, ...HEAT, ...FEM };

// Generators of module F, part c (unit `fourier`, step U10): the Laplace transform: table, abscissa, inverses, ODE, integro-differential equations, the long problem.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Skills: fourier-c.skills.js;
// traps: js/cas/rules/fc.js. GEN[id] = (level, rng, profile, opts) => item.
// Helpers: fourier-c-kit.js (exact partial fractions and residues),
// fourier-c-table.js, fourier-c-inv.js, fourier-c-ode.js.

import { genTable, genAbscissa } from './fourier-c-table.js';

export const GEN = {
  'f-lap-table': genTable,
  'f-lap-abscissa': genAbscissa,
};

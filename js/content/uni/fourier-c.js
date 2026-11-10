// Generators of module F, part c (unit `fourier`, step U10): the Laplace transform: table, abscissa, inverses, ODE, integro-differential equations, the long problem.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Skills: fourier-c.skills.js;
// traps: js/cas/rules/fc.js. GEN[id] = (level, rng, profile, opts) => item.
// Helpers: fourier-c-kit.js (exact partial fractions and residues),
// fourier-c-table.js, fourier-c-inv.js, fourier-c-ode.js.

import { genTable, genAbscissa } from './fourier-c-table.js';
import { genInvDes, genInvRes } from './fourier-c-inv.js';
import { genOde, genIntegro, genProblem } from './fourier-c-ode.js';

export const GEN = {
  'f-lap-table': genTable,
  'f-lap-abscissa': genAbscissa,
  'f-lap-inv-des': genInvDes,
  'f-lap-inv-res': genInvRes,
  'f-lap-ode': genOde,
  'f-lap-integro': genIntegro,
  'f-lap-problem': genProblem,
};

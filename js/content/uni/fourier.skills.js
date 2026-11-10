// Module F (unit `fourier`, step U10). Catalogue:
// docs/universite/VCF-analyse-3-4.md. Parts fourier-a, fourier-b, fourier-c, fourier-d
// (.skills.js and .js), listed here in the catalogue's order.

import { SKILLS as PART_A } from './fourier-a.skills.js';
import { SKILLS as PART_B } from './fourier-b.skills.js';
import { SKILLS as PART_C } from './fourier-c.skills.js';
import { SKILLS as PART_D } from './fourier-d.skills.js';

export const UNIT = { id: 'fourier', title: 'Fourier, Laplace, EDP', color: '#f76707', ready: true };

// The catalogue's order.
const ORDER = ["f-coef", "f-coef-complex", "f-sine-cosine", "f-dirichlet", "f-parseval", "f-coef-relations", "f-series-problem", "f-ft-direct", "f-ft-table", "f-ft-eq", "f-plancherel", "f-periodic-ode", "f-sturm-liouville", "f-lap-table", "f-lap-abscissa", "f-lap-inv-des", "f-lap-inv-res", "f-lap-ode", "f-lap-integro", "f-lap-problem", "f-heat-sep", "f-heat-source", "f-wave", "f-laplace-eq", "f-distrib-def", "f-distrib-deriv", "f-distrib-eq"];

export const SKILLS = [...PART_A, ...PART_B, ...PART_C, ...PART_D]
  .sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

// Generators of module F, part b (unit `fourier`, step U10): the Fourier transform: definition, table and properties, equations, Plancherel; distributions.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Skills: fourier-b.skills.js;
// traps: js/cas/rules/fb.js. GEN[id] = (level, rng, profile, opts) => item.
// One file per skill or group: fourier-b-direct.js (f-ft-direct),
// fourier-b-table.js (f-ft-table), fourier-b-eq.js (f-ft-eq),
// fourier-b-planch.js (f-plancherel), fourier-b-distrib.js (the three
// skills on distributions); helpers in fourier-b-kit.js.

import { GEN as DIRECT } from './fourier-b-direct.js';
import { GEN as TABLE } from './fourier-b-table.js';

export const GEN = { ...DIRECT, ...TABLE };

// Generators of module F, part d (unit `fourier`, step U10): partial differential equations: heat (with and without source), waves, Laplace.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Skills: fourier-d.skills.js;
// traps: js/cas/rules/fd.js. GEN[id] = (level, rng, profile, opts) => item.
// Files: fourier-d-heat.js (f-heat-sep, f-heat-source), fourier-d-wave.js
// (f-wave), fourier-d-laplace.js (f-laplace-eq); tools: fourier-d-kit.js;
// numeric check of a PDE solution: fourier-d-pde.js.

import { GEN as HEAT } from './fourier-d-heat.js';
import { GEN as WAVE } from './fourier-d-wave.js';
import { GEN as LAPLACE } from './fourier-d-laplace.js';

export const GEN = { ...HEAT, ...WAVE, ...LAPLACE };

// Generators of module F, part a (unit `fourier`, step U10): Fourier series: coefficients, sine and cosine series, Dirichlet, Parseval, relations, the series problem, periodic ODE, Sturm-Liouville.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Skills: fourier-a.skills.js;
// traps: js/cas/rules/fa.js. GEN[id] = (level, rng, profile, opts) => item.
// One file per group of skills: fourier-a-coef.js (f-coef), fourier-a-complex.js
// (f-coef-complex), fourier-a-sine.js (f-sine-cosine, f-dirichlet,
// f-series-problem), fourier-a-parseval.js (f-parseval, f-coef-relations),
// fourier-a-ode.js (f-periodic-ode, f-sturm-liouville); shared tools in
// fourier-a-kit.js.

import { GEN_COEF } from './fourier-a-coef.js';
import { GEN_COMPLEX } from './fourier-a-complex.js';

export const GEN = { ...GEN_COEF, ...GEN_COMPLEX };

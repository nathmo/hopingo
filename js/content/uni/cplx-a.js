// Generators of module C, part a (unit `cplx`, step U10): elementary functions, equations, Cauchy-Riemann, harmonic conjugates, contour integrals, Cauchy, Taylor, Laurent, singularities.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Skills: cplx-a.skills.js;
// traps: js/cas/rules/ca.js; judges cvalue and cfamily:
// js/judges/cplx-ca.js. GEN[id] = (level, rng, profile, opts) => item.
// One file per group of skills: cplx-a-elem.js (c-elem-fn, c-equations),
// cplx-a-cr.js (c-cauchy-riemann, c-harmonic-conj), cplx-a-contour.js
// (c-contour-param, c-cauchy-thm, c-cauchy-formula), cplx-a-series.js
// (c-taylor, c-laurent, c-singularities); helpers: cplx-a-kit.js.

import { GEN as ELEM } from './cplx-a-elem.js';
import { GEN as CR } from './cplx-a-cr.js';

export const GEN = { ...ELEM, ...CR };

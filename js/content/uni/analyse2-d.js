// Generators of module A2, part d (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skills: analyse2-d.skills.js; traps:
// js/cas/rules/a2d.js. GEN[id] = (level, rng, profile, opts) => item.
// Implicit functions: analyse2-d-implicit.js; integrals with a parameter
// (fixed bounds, Leibniz's rule, the exam example E4): analyse2-d-param.js.

import { GEN as IMPLICIT } from './analyse2-d-implicit.js';
import { GEN as PARAM } from './analyse2-d-param.js';

export const GEN = { ...IMPLICIT, ...PARAM };

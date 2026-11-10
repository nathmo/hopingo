// Generators of module A2, part h (unit `analyse2`, step U6): first-order
// equations (Cauchy-Lipschitz, separable, linear, homogeneous y = xv) and
// linear equations of order 2 (structure, constant coefficients,
// Wronskian). Catalogue: docs/universite/A2-analyse-2.md. Skills:
// analyse2-h.skills.js; traps: js/cas/rules/a2h.js; counter-examples:
// js/judges/a2-examples-h.js. GEN[id] = (level, rng, profile, opts) => item.

import { GEN as CAUCHY } from './analyse2-h-cauchy.js';
import { GEN as SEP } from './analyse2-h-sep.js';
import { GEN as LINEAR } from './analyse2-h-linear.js';
import { GEN as HOMOG } from './analyse2-h-homog.js';
import { GEN as CONST2 } from './analyse2-h-const2.js';
import { GEN as STRUCT } from './analyse2-h-struct.js';
import { GEN as WRONSK } from './analyse2-h-wronsk.js';

export const GEN = { ...CAUCHY, ...SEP, ...LINEAR, ...HOMOG, ...CONST2, ...STRUCT, ...WRONSK };

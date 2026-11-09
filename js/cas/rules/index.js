// All traps of the university modules (spec §7). js/math/malrules.js adds
// them to RULES and RULE_BY_ID. A new module adds its file here.

import { RULES as G6 } from './g6.js';
import { RULES as G9 } from './g9.js';
import { RULES as G0 } from './g0.js';
import { RULES as G2 } from './g2.js';
import { RULES as G3 } from './g3.js';
import { RULES as G5 } from './g5.js';
import { RULES as G1B } from './g1b.js';

// G1 before G9: a closed bracket at a forbidden value is named g1_pole_closed.
export const CAS_RULES = [...G6, ...G1B, ...G9, ...G0, ...G2, ...G3, ...G5];

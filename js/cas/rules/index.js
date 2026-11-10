// All traps of the university modules (spec §7). js/math/malrules.js adds
// them to RULES and RULE_BY_ID. A new module adds its file here.

import { RULES as G6 } from './g6.js';
import { RULES as G9 } from './g9.js';
import { RULES as G0 } from './g0.js';
import { RULES as G2 } from './g2.js';
import { RULES as G3 } from './g3.js';
import { RULES as G5 } from './g5.js';
import { RULES as G1, EARLY as G1_EARLY } from './g1.js';

// The G1 traps of inequalities come before G9: a closed bracket at a
// forbidden value is named g1_pole_closed, not g9_bracket.
export const CAS_RULES = [...G6, ...G1_EARLY, ...G9, ...G0, ...G2, ...G3, ...G5, ...G1];

// Step U2: module G6 (parts a, b, c) and A1 (derivatives, DL, integrals).
import { RULES as G6A } from './g6a.js';
import { RULES as G6B } from './g6b.js';
import { RULES as G6C } from './g6c.js';
import { RULES as A1A } from './a1a.js';
import { RULES as A1B } from './a1b.js';
import { RULES as A1C } from './a1c.js';
import { RULES as A1D } from './a1d.js';
import { RULES as A1E } from './a1e.js';

// The DL traps (A1C) come before those of l'Hôpital (A1B): with the limit
// judge, a line « 0 » after (x − sin x)/x³ is a sine replaced in a sum,
// although (f/g)′ has the same limit.
CAS_RULES.push(...G6A, ...G6B, ...G6C, ...A1A, ...A1C, ...A1B, ...A1D, ...A1E);

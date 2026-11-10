// Generators of the university modules, merged into GEN by
// js/content/generators.js. A new module adds its file here.

import { GEN as LOGIQUE } from './logique.js';
import { GEN as POLYNOMES } from './polynomes.js';
import { GEN as ANALYSE0 } from './analyse0.js';
import { GEN as EXPLOG } from './explog.js';
import { GEN as TRIGO } from './trigo.js';
import { GEN as TRIGO_EQ } from './trigo-eq.js';
import { GEN as TRIGO_TRI } from './trigo-tri.js';
import { GEN as RECURRENCE } from './recurrence.js';
import { GEN as FONCTIONSG } from './fonctions-g.js';
import { GEN as FONCTIONSG_INEQ } from './fonctions-g-ineq.js';

export const UNI_GEN = { ...LOGIQUE, ...POLYNOMES, ...ANALYSE0, ...EXPLOG, ...TRIGO, ...TRIGO_EQ, ...TRIGO_TRI, ...RECURRENCE, ...FONCTIONSG, ...FONCTIONSG_INEQ };

// Step U2: module G6 (parts a, b, c) and A1 (derivatives, DL, integrals).
import { GEN as ANALYSE0_A } from './analyse0-a.js';
import { GEN as ANALYSE0_B } from './analyse0-b.js';
import { GEN as ANALYSE0_C } from './analyse0-c.js';
import { GEN as ANALYSE1_A } from './analyse1-a.js';
import { GEN as ANALYSE1_B } from './analyse1-b.js';
import { GEN as ANALYSE1_C } from './analyse1-c.js';
import { GEN as ANALYSE1_D } from './analyse1-d.js';
import { GEN as ANALYSE1_E } from './analyse1-e.js';

Object.assign(UNI_GEN, ANALYSE0_A, ANALYSE0_B, ANALYSE0_C, ANALYSE1_A, ANALYSE1_B, ANALYSE1_C, ANALYSE1_D, ANALYSE1_E);

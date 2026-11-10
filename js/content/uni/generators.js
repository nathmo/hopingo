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

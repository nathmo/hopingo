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
import { GEN as ALGLIN } from './alglin.js';

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
Object.assign(UNI_GEN, ALGLIN); // step U3

// Step U5: modules G4 and G10.
import { GEN as GEOAN } from './geoan.js';
import { GEN as CONIQUES } from './coniques.js';

Object.assign(UNI_GEN, GEOAN, CONIQUES);

// Step U4: A1 (parts f to l) and G8 (unit complexes, parts a and b).
import { GEN as ANALYSE1_F } from './analyse1-f.js';
import { GEN as ANALYSE1_G } from './analyse1-g.js';
import { GEN as ANALYSE1_H } from './analyse1-h.js';
import { GEN as ANALYSE1_I } from './analyse1-i.js';
import { GEN as ANALYSE1_J } from './analyse1-j.js';
import { GEN as ANALYSE1_K } from './analyse1-k.js';
import { GEN as ANALYSE1_L } from './analyse1-l.js';
import { GEN as COMPLEXES_A } from './complexes-a.js';
import { GEN as COMPLEXES_B } from './complexes-b.js';

Object.assign(UNI_GEN, ANALYSE1_F, ANALYSE1_G, ANALYSE1_H, ANALYSE1_I, ANALYSE1_J, ANALYSE1_K, ANALYSE1_L, COMPLEXES_A, COMPLEXES_B);

// Step U6: module A2.
import { GEN as ANALYSE2 } from './analyse2.js';

Object.assign(UNI_GEN, ANALYSE2);

// Step U7: modules G7 (combi) and P (proba).
import { GEN as COMBI } from './combi.js';
import { GEN as PROBA } from './proba.js';

Object.assign(UNI_GEN, COMBI, PROBA);

// Step U8: module M.
import { GEN as MATRICES } from './matrices.js';

Object.assign(UNI_GEN, MATRICES);

// Step U9: module N.
import { GEN as NUMERIQUE } from './numerique.js';

Object.assign(UNI_GEN, NUMERIQUE);

// Step U9: code and readtable variants of earlier skills (P, M).
import { GEN as U9_VARIANTS } from './u9-variants.js';

Object.assign(UNI_GEN, U9_VARIANTS);

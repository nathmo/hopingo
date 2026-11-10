// Module G10, cercles et coniques (unit `coniques`). Catalogue:
// docs/universite/G-gymnase-2.md, section G10. Built at step U5, in two
// parts (coniques-a, coniques-b: .skills.js and .js). Year 12.5:
// needsSolo true.
//
// Prerequisites of the catalogue resolved to the school skills:
// @alg:H-completer-carre = quad-complete, @alg:H-discriminant = quad-formula,
// @alg:E-systemes-2x2 = eq-systems, @alg:I-second-degre-parametres =
// param-quadratic. The reduction uses the eigenvalues of module L.

import { SKILLS as PART_A } from './coniques-a.skills.js';
import { SKILLS as PART_B } from './coniques-b.skills.js';

export const UNIT = { id: 'coniques', title: 'Cercles et coniques', color: '#a61e4d', ready: true };

export const SKILLS = [...PART_A, ...PART_B];

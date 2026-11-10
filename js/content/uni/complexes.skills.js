// Module G8, nombres complexes (unit `complexes`; the id `cplx` is kept for
// module C, analyse complexe). Catalogue: docs/universite/G-gymnase-2.md,
// « G8 ». Step U4 builds it in two parts, complexes-a and complexes-b
// (.skills.js and .js). Prerequisites of the algebra plan:
// @alg:C-identites = lit-identities, @alg:E-systemes-2x2 = eq-systems,
// @alg:H-discriminant = quad-formula. G4 and G10 (step U5) go through
// UNBUILT (js/content/uni/index.js).

import { SKILLS as PART_A } from './complexes-a.skills.js';
import { SKILLS as PART_B } from './complexes-b.skills.js';

export const UNIT = { id: 'complexes', title: 'Nombres complexes', color: '#a61e4d', ready: true };

export const SKILLS = [...PART_A, ...PART_B];

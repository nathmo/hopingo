// The university modules (spec §3, §8): each one is a pair of files,
// <unit>.skills.js (skills, plain data) and <unit>.js (generators). A new
// module adds one line to each list below.
//
// Prerequisites written in the catalogues may name skills of modules not
// built yet. Until they are, UNBUILT says which built skills stand for
// them: their own prerequisites in the catalogue, resolved down to skills
// that exist. js/content/skills.js applies it; a prerequisite that is
// neither built nor listed here is an error.

import * as logique from './logique.skills.js';
import * as polynomes from './polynomes.skills.js';
import * as analyse0 from './analyse0.skills.js';
import * as explog from './explog.skills.js';
import * as trigo from './trigo.skills.js';
import * as recurrence from './recurrence.skills.js';
import * as fonctionsg from './fonctions-g.skills.js';
import * as analyse1 from './analyse1.skills.js';
import * as alglin from './alglin.skills.js';
import * as geoan from './geoan.skills.js';
import * as coniques from './coniques.skills.js';

// Step U4: module G8 (unit complexes).
import * as complexes from './complexes.skills.js';

const MODULES = [logique, polynomes, analyse0, explog, trigo, recurrence, fonctionsg, analyse1];
MODULES.push(complexes); // step U4
MODULES.push(alglin); // step U3
MODULES.push(geoan, coniques); // step U5

export const UNI_UNITS = MODULES.map((m) => m.UNIT);
export const UNI_SKILLS = MODULES.flatMap((m) => m.SKILLS);

// Empty since steps U3, U4 and U5: every prerequisite of the built modules
// (L, A1, G4, G8, G10) is now built.
export const UNBUILT = {};

// Step U6: module A2 (analyse II).
import * as analyse2 from './analyse2.skills.js';

UNI_UNITS.push(analyse2.UNIT);
UNI_SKILLS.push(...analyse2.SKILLS);

// Step U8: module M (analyse matricielle). Until module P (step U7) is
// merged, p-lin-combo (m-normal-eq) stands for its prerequisites resolved
// down to built skills (p-moments ← p-disc-pmf, p-cont-density).
import * as matrices from './matrices.skills.js';

UNI_UNITS.push(matrices.UNIT);
UNI_SKILLS.push(...matrices.SKILLS);
if (!UNI_SKILLS.some((s) => s.id === 'p-lin-combo')) UNBUILT['p-lin-combo'] = ['a1-int-direct', 'a1-improper-calc', 'a1-ser-geo-tele'];

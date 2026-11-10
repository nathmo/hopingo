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
// Step U4: module G8 (unit complexes).
import * as complexes from './complexes.skills.js';

const MODULES = [logique, polynomes, analyse0, explog, trigo, recurrence, fonctionsg, analyse1];
MODULES.push(complexes);

export const UNI_UNITS = MODULES.map((m) => m.UNIT);
export const UNI_SKILLS = MODULES.flatMap((m) => m.SKILLS);

export const UNBUILT = {
  // Step U2: module G4 (step U5) for g6-tangent: g4-line2 ← g4-vectors,
  // @alg:L-affine = fn-affine, @alg:E-systemes-2x2 = eq-systems.
  'g4-line2': ['g4-vectors', 'fn-affine', 'eq-systems'],
  'g4-vectors': ['eq-systems'],
  // Step U4: modules G4 and G10 (step U5) for g8-locus: g4-bisectors ←
  // g4-line2, g4-dot, g1-abs-eq; g4-dot ← g4-vectors, @alg:M-pythagore =
  // geo-pythagore, g3-arc-def; g10-circle-eq ← g4-bisectors,
  // @alg:H-completer-carre = quad-complete.
  'g4-bisectors': ['g4-line2', 'g4-dot', 'g1-abs-eq'],
  'g4-dot': ['g4-vectors', 'geo-pythagore', 'g3-arc-def'],
  'g10-circle-eq': ['g4-bisectors', 'quad-complete'],
};

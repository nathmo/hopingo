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

const MODULES = [logique, polynomes, analyse0, explog, trigo, recurrence, fonctionsg, analyse1];

export const UNI_UNITS = MODULES.map((m) => m.UNIT);
export const UNI_SKILLS = MODULES.flatMap((m) => m.SKILLS);

export const UNBUILT = {
  // g8-algebraic ← @alg:C-identites = lit-identities (step U4 builds G8).
  'g8-algebraic': ['lit-identities'],
  // Step U2: module G4 (step U5) for g6-tangent: g4-line2 ← g4-vectors,
  // @alg:L-affine = fn-affine, @alg:E-systemes-2x2 = eq-systems.
  'g4-line2': ['g4-vectors', 'fn-affine', 'eq-systems'],
  'g4-vectors': ['eq-systems'],
  // Step U2: the A1 skills of step U4 that the derivatives, DL and
  // integrals need. @alg:G-simplifier = rat-simplify.
  'a1-seq-limits': ['rat-simplify', 'g2-log-rules'],
  'a1-seq-squeeze': ['a1-seq-limits', 'g1-bound'],
  'a1-fn-limits': ['a1-seq-limits', 'g3-identities'],
  'a1-fn-onesided': ['a1-fn-limits'],
  'a1-fn-extension': ['a1-fn-onesided', 'rat-simplify'],
  'a1-fn-ivt': ['a1-fn-extension', 'a1-deriv-rules'],
  'a1-fn-image': ['a1-fn-ivt', 'g6-deriv-rules'],
  'a1-ser-compare': ['a1-seq-limits'],
};

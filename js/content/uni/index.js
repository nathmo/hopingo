// The university modules (spec §3, §8): each one is a pair of files,
// <unit>.skills.js (skills, plain data) and <unit>.js (generators). A new
// module adds one line to each list below.
//
// Prerequisites written in the catalogues may name skills of modules not
// built yet. Until they are, UNBUILT says which built skills stand for
// them: their own prerequisites in the catalogue, resolved down to skills
// that exist. js/content/skills.js applies it; a prerequisite that is
// neither built nor listed here is an error.

import * as analyse0 from './analyse0.skills.js';

const MODULES = [analyse0];

export const UNI_UNITS = MODULES.map((m) => m.UNIT);
export const UNI_SKILLS = MODULES.flatMap((m) => m.SKILLS);

export const UNBUILT = {
  // g6-deriv-usual ← g2-real-powers ← pow-rules, root-rules (and g3-radians,
  // which the derivative exercises of U0 do not use).
  'g6-deriv-usual': ['pow-rules', 'root-rules'],
  // g1-compose ← g1-domain ← @alg:G-valeurs-interdites = rat-domain.
  'g1-compose': ['rat-domain'],
};

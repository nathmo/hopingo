// Generators of module A2, part g (unit `analyse2`, step U6): polar,
// cylindrical and spherical integrals, improper integrals on ℝ² and ℝ³,
// volumes, centres of mass. Catalogue: docs/universite/A2-analyse-2.md.
// Skills: analyse2-g.skills.js; traps: js/cas/rules/a2g.js. GEN[id] =
// (level, rng, profile, opts) => item. One file per skill:
// analyse2-g-polar.js (with the exam example E5), helpers in
// analyse2-g-kit.js.

import { polarInt } from './analyse2-g-polar.js';
import { cylSph } from './analyse2-g-space.js';
import { improperMulti } from './analyse2-g-improper.js';
import { volume } from './analyse2-g-volume.js';
import { massCenter } from './analyse2-g-mass.js';

export const GEN = {
  'a2-polar-int': (level, rng, profile, opts = {}) => polarInt(level, rng, opts),
  'a2-cyl-sph': (level, rng, profile, opts = {}) => cylSph(level, rng, opts),
  'a2-improper-multi': (level, rng, profile, opts = {}) => improperMulti(level, rng, opts),
  'a2-volume': (level, rng, profile, opts = {}) => volume(level, rng, opts),
  // No exam variant (catalogue): exam weight 0.
  'a2-mass-center': (level, rng) => massCenter(level, rng),
};

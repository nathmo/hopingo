// Generators of module A2, part i (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skills: analyse2-i.skills.js; traps:
// js/cas/rules/a2i.js. GEN[id] = (level, rng, profile, opts) => item.
// The generators are in analyse2-i-part.js (particular solution, E1),
// analyse2-i-stab.js (stability), analyse2-i-choose.js (method, Bernoulli
// and Euler) and analyse2-i-exact.js (exact equations, systems X′ = AX);
// the helpers in analyse2-i-kit.js.

import { genParticular } from './analyse2-i-part.js';
import { genStability } from './analyse2-i-stab.js';
import { genChoose, genSubstOther } from './analyse2-i-choose.js';
import { genExact, genSystem } from './analyse2-i-exact.js';

export const GEN = {
  'a2-ode-particular': genParticular,
  'a2-ode-choose': genChoose,
  'a2-ode-stability': genStability,
  'a2-ode-subst-other': genSubstOther,
  'a2-ode-exact': genExact,
  'a2-ode-system': genSystem,
};

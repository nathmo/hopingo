// Generators of module A2, part f (unit `analyse2`, step U6): multiple
// integrals by Fubini. Catalogue: docs/universite/A2-analyse-2.md.
// Skills: analyse2-f.skills.js; traps: js/cas/rules/a2f.js.
// GEN[id] = (level, rng, profile, opts) => item.
//
// One file per group of skills: analyse2-f-rect.js (a2-fubini-rect),
// analyse2-f-domain.js (a2-domain-describe, a2-fubini-swap),
// analyse2-f-triple.js (a2-triple-int), analyse2-f-change.js
// (a2-change-var); helpers in analyse2-f-kit.js.

import { fubiniRect } from './analyse2-f-rect.js';
import { domainDescribe, fubiniSwap } from './analyse2-f-domain.js';

export const GEN = {
  'a2-fubini-rect': fubiniRect,
  'a2-domain-describe': domainDescribe,
  'a2-fubini-swap': fubiniSwap,
};

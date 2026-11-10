// Generators of module A1, part e (unit `analyse1`, step U2). Catalogue:
// docs/universite/A1-analyse-1.md. Skills: js/content/uni/analyse1-e.skills.js.

import { SKILLS } from './analyse1-e.skills.js';
import { stubGen } from './stub.js';

export const GEN = { ...stubGen(SKILLS.map((s) => s.id)) };

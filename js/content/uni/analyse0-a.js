// Generators of module G6, part a (unit `analyse0`, step U2). Catalogue:
// docs/universite/G-gymnase-2.md, G6. Skills: js/content/uni/analyse0-a.skills.js.

import { SKILLS } from './analyse0-a.skills.js';
import { stubGen } from './stub.js';

export const GEN = { ...stubGen(SKILLS.map((s) => s.id)) };

// Generators of module A1, part c (unit `analyse1`, step U2): développements
// limités, limits by DL, reading f⁽ᵏ⁾(a), Taylor's remainder. Catalogue:
// docs/universite/A1-analyse-1.md, « Développements limités ». Skills:
// js/content/uni/analyse1-c.skills.js. Traps: js/cas/rules/a1c.js.
//   analyse1-c-kit.js  DLs as text, blanks, menus, fitLines, assemble
//   analyse1-c-dl.js   a1-dl-usual
//   analyse1-c-ops.js  a1-dl-ops, a1-dl-compose
//   analyse1-c-lim.js  a1-dl-limits, a1-dl-read, a1-taylor-rest

import { GEN as DL } from './analyse1-c-dl.js';
import { GEN as OPS } from './analyse1-c-ops.js';
import { GEN as LIM } from './analyse1-c-lim.js';
import { stubGen } from './stub.js';

export const GEN = { ...stubGen(['a1-dl-limits', 'a1-dl-read', 'a1-taylor-rest']), ...DL, ...OPS, ...LIM };

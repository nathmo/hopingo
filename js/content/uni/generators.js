// Generators of the university modules, merged into GEN by
// js/content/generators.js. A new module adds its file here.

import { GEN as LOGIQUE } from './logique.js';
import { GEN as POLYNOMES } from './polynomes.js';
import { GEN as ANALYSE0 } from './analyse0.js';
import { GEN as TRIGO } from './trigo.js';

export const UNI_GEN = { ...LOGIQUE, ...POLYNOMES, ...ANALYSE0, ...TRIGO };

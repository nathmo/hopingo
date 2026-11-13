// Physics (docs/plan-physique.md): units, skills and generators, added to the
// school ones by js/content/skills.js and js/content/generators.js.
import { GEN as OUTILS } from './outils.js';
import { GEN as ENERGIE } from './energie.js';
import { GEN as INCERTITUDES } from './incertitudes.js';
import { GEN as RECETTE } from './recette.js';

export { PHYS_UNITS, PHYS_SKILLS } from './skills.js';
export const PHYS_GEN = { ...OUTILS, ...ENERGIE, ...INCERTITUDES, ...RECETTE };

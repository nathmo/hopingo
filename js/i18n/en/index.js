// English dictionary: French text → English text. Each part covers a
// group of files; a text present in several parts keeps the first one
// (in the order of PARTS or CATALOG_PARTS below).

import uiShell from './ui-shell.js';
import uiScreens from './ui-screens.js';
import uiItems from './ui-items.js';
import skillsSchool from './skills-school.js';
import skillsUni1 from './skills-uni-1.js';
import skillsUni2 from './skills-uni-2.js';
import skillsUni3 from './skills-uni-3.js';
import trapsSchool from './traps-school.js';
import genSchool1 from './gen-school-1.js';
import genSchool2 from './gen-school-2.js';
import uni1 from './uni-1.js';
import uni2 from './uni-2.js';
import uni3 from './uni-3.js';
import uni4 from './uni-4.js';
import uni5 from './uni-5.js';
import uni6 from './uni-6.js';
import uni7 from './uni-7.js';
import uni8 from './uni-8.js';
import uni9 from './uni-9.js';
import uni10 from './uni-10.js';
import uni11 from './uni-11.js';
import uni12 from './uni-12.js';
import uni13 from './uni-13.js';
import uni14 from './uni-14.js';
import uni15 from './uni-15.js';
import uni16 from './uni-16.js';
import uni17 from './uni-17.js';

// Texts of questions, corrections and screens: their own parts first, so a
// short word (« Simplifier ») reads as an instruction (Simplify).
const PARTS = [uiShell, uiScreens, uiItems, trapsSchool, genSchool1, genSchool2, uni1, uni2, uni3, uni4, uni5, uni6, uni7, uni8, uni9, uni10, uni11, uni12, uni13, uni14, uni15, uni16, uni17, skillsSchool, skillsUni1, skillsUni2, skillsUni3];
// Texts of the skill catalogue (titles, intro cards): its parts first, so
// the same word reads as a title (Simplifying). Used by localize().
const CATALOG_PARTS = [skillsSchool, skillsUni1, skillsUni2, skillsUni3, uiShell, uiScreens, uiItems, trapsSchool, genSchool1, genSchool2, uni1, uni2, uni3, uni4, uni5, uni6, uni7, uni8, uni9, uni10, uni11, uni12, uni13, uni14, uni15, uni16, uni17];

const merge = (parts) => {
  const out = {};
  for (const part of parts) for (const [k, v] of Object.entries(part)) if (!(k in out)) out[k] = v;
  return out;
};
export const CATALOG = merge(CATALOG_PARTS);
export default merge(PARTS);

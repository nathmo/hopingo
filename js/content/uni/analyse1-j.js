// Generators of module A1, part j (unit `analyse1`, step U4): limits of
// functions, one-sided limits, continuous extension, the ε-δ definition
// and δ(ε). Catalogue: docs/universite/A1-analyse-1.md, « Fonctions :
// limites et continuité ». Skills: js/content/uni/analyse1-j.skills.js.
// Traps: js/cas/rules/a1j.js.
//   analyse1-j-kit.js   numbers as text, √(p/q), shared helpers
//   analyse1-j-lim.js   a1-fn-limits
//   analyse1-j-side.js  a1-fn-onesided, a1-fn-extension
//   analyse1-j-eps.js   a1-fn-epsdelta-def, a1-fn-epsdelta

import { GEN as LIM } from './analyse1-j-lim.js';
import { GEN as SIDE } from './analyse1-j-side.js';
import { GEN as EPS } from './analyse1-j-eps.js';

export const GEN = { ...LIM, ...SIDE, ...EPS };

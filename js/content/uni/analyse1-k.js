// Generators of module A1, part k (unit `analyse1`, step U4). Catalogue:
// docs/universite/A1-analyse-1.md. Skills: js/content/uni/analyse1-k.skills.js.
// Traps: js/cas/rules/a1k.js.
//   analyse1-k-kit.js  helpers (lines of part e, decimals, options)
//   analyse1-k-ivt.js  a1-fn-ivt, a1-fn-image
//   analyse1-k-bis.js  a1-bisection-fixpoint
//   analyse1-k-pow.js  a1-pow-domain, a1-pow-sums

import { GEN as IVT } from './analyse1-k-ivt.js';
import { GEN as BIS } from './analyse1-k-bis.js';
import { GEN as POW } from './analyse1-k-pow.js';

export const GEN = { ...IVT, ...BIS, ...POW };

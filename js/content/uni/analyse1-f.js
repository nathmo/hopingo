// Generators of module A1, part f (unit `analyse1`, step U4): sup and inf
// (analyse1-f-sup.js), sequences: the ε-N definition, N(ε) and limits
// (analyse1-f-seq.js). Catalogue: docs/universite/A1-analyse-1.md.

import { GEN as SUP } from './analyse1-f-sup.js';
import { GEN as SEQ } from './analyse1-f-seq.js';

export const GEN = { ...SUP, ...SEQ };

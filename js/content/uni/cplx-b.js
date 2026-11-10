// Generators of module C, part b (unit `cplx`, step U10): residues, the residue theorem, arc estimates, real integrals by residues, branch cuts, Fourier transforms by residues, conformal maps.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Skills: cplx-b.skills.js;
// traps: js/cas/rules/cb.js. GEN[id] = (level, rng, profile, opts) => item.
// Helpers: cplx-b-kit.js; judges cval and arcb: js/judges/cplx-cb.js.

import { GEN as RES } from './cplx-b-res.js';
import { GEN as LAU } from './cplx-b-laurent.js';
import { GEN as THM } from './cplx-b-thm.js';
import { GEN as ARC } from './cplx-b-arc.js';
import { GEN as REAL } from './cplx-b-real.js';
import { GEN as FOU } from './cplx-b-fourier.js';

export const GEN = { ...RES, ...LAU, ...THM, ...ARC, ...REAL, ...FOU };

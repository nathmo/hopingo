// Module C (unit `cplx`, step U10). Catalogue:
// docs/universite/VCF-analyse-3-4.md. Parts cplx-a, cplx-b
// (.skills.js and .js), listed here in the catalogue's order.

import { SKILLS as PART_A } from './cplx-a.skills.js';
import { SKILLS as PART_B } from './cplx-b.skills.js';

export const UNIT = { id: 'cplx', title: 'Analyse complexe', color: '#7048e8', ready: true };

// The catalogue's order.
const ORDER = ["c-elem-fn", "c-equations", "c-cauchy-riemann", "c-harmonic-conj", "c-contour-param", "c-cauchy-thm", "c-cauchy-formula", "c-taylor", "c-laurent", "c-singularities", "c-res-simple", "c-res-multiple", "c-res-laurent", "c-res-theorem", "c-arc-estimate", "c-int-rational", "c-int-trig", "c-int-fourier", "c-int-branch", "c-fourier-residues", "c-conformal"];

export const SKILLS = [...PART_A, ...PART_B]
  .sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

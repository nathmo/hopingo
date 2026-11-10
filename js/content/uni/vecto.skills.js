// Module V (unit `vecto`, step U10). Catalogue:
// docs/universite/VCF-analyse-3-4.md. Parts vecto-a, vecto-b
// (.skills.js and .js), listed here in the catalogue's order.

import { SKILLS as PART_A } from './vecto-a.skills.js';
import { SKILLS as PART_B } from './vecto-b.skills.js';

export const UNIT = { id: 'vecto', title: 'Analyse vectorielle', color: '#0b7285', ready: true };

// The catalogue's order.
const ORDER = ["v-ops", "v-identities", "v-curve-param", "v-line-scalar", "v-line-vector", "v-domain-topo", "v-pot-test", "v-pot-find", "v-pot-lambda", "v-pot-none", "v-pot-domain", "v-green", "v-green-flux", "v-surf-param", "v-surf-area", "v-flux", "v-boundary", "v-div-thm", "v-stokes", "v-verify-stokes", "v-verify-div", "v-proof-identity"];

export const SKILLS = [...PART_A, ...PART_B]
  .sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

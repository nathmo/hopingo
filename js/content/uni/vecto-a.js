// Generators of module V, part a (unit `vecto`, step U10): operators, identities, curves and line integrals, domains, potentials.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Skills: vecto-a.skills.js;
// traps: js/cas/rules/va.js. GEN[id] = (level, rng, profile, opts) => item.
// One file per group of skills: vecto-a-ops.js (v-ops, v-identities),
// vecto-a-curves.js (v-curve-param, v-line-scalar, v-line-vector),
// vecto-a-topo.js (v-domain-topo, v-pot-test), vecto-a-pot.js (v-pot-find,
// v-pot-lambda), vecto-a-none.js (v-pot-none, v-pot-domain); helpers in
// vecto-a-kit.js and vecto-a-curve-kit.js.

import { GEN as OPS } from './vecto-a-ops.js';
import { GEN as CURVES } from './vecto-a-curves.js';
import { GEN as TOPO } from './vecto-a-topo.js';
import { GEN as POT } from './vecto-a-pot.js';
import { GEN as NONE } from './vecto-a-none.js';

export const GEN = { ...OPS, ...CURVES, ...TOPO, ...POT, ...NONE };

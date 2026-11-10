// Generators of module V, part a (unit `vecto`, step U10): operators, identities, curves and line integrals, domains, potentials.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Skills: vecto-a.skills.js;
// traps: js/cas/rules/va.js. GEN[id] = (level, rng, profile, opts) => item.
// One file per group of skills: vecto-a-ops.js (v-ops, v-identities),
// helpers in vecto-a-kit.js.

import { GEN as OPS } from './vecto-a-ops.js';
import { GEN as CURVES } from './vecto-a-curves.js';

export const GEN = { ...OPS, ...CURVES };

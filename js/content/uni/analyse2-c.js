// Generators of module A2, part c (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skills: analyse2-c.skills.js; traps:
// js/cas/rules/a2c.js. GEN[id] = (level, rng, profile, opts) => item.
//   analyse2-c-kit.js       helpers (polynomials, parts, exam choices)
//   analyse2-c-partials.js  a2-partials, a2-tangent-graph, a2-tangent-level
//   analyse2-c-chain.js     a2-chain, a2-chain-polar, a2-laplacian-radial
//   analyse2-c-taylor.js    a2-taylor2

import { GEN as PARTIALS } from './analyse2-c-partials.js';
import { GEN as CHAIN } from './analyse2-c-chain.js';
import { GEN as TAYLOR } from './analyse2-c-taylor.js';

export const GEN = { ...PARTIALS, ...CHAIN, ...TAYLOR };

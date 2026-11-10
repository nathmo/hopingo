// Generators of module V, part b (unit `vecto`, step U10): Green, surfaces, flux, oriented boundaries, divergence and Stokes theorems, short proofs.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Skills: vecto-b.skills.js;
// traps: js/cas/rules/vb.js. GEN[id] = (level, rng, profile, opts) => item.
// Helpers: vecto-b-kit.js; one file per group of skills.

import { GEN as GREEN } from './vecto-b-green.js';
import { GEN as SURF } from './vecto-b-surf.js';
import { GEN as BOUND } from './vecto-b-bound.js';
import { GEN as DIV } from './vecto-b-div.js';
import { GEN as VERIFY } from './vecto-b-verify.js';
import { GEN as PROOF } from './vecto-b-proof.js';

export const GEN = { ...GREEN, ...SURF, ...BOUND, ...DIV, ...VERIFY, ...PROOF };

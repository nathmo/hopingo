// Module A1, analyse I (unit `analyse1`). Catalogue:
// docs/universite/A1-analyse-1.md. Step U2 built the derivatives, the
// développements limités and the integrals, in five parts whose
// definitions and generators are in analyse1-a … analyse1-e (.skills.js
// and .js); step U4 builds the rest (reals, complex numbers, sequences,
// series, limits of functions, ε-δ, power series, definitions, proofs).
//
// Prerequisites of the catalogue resolved to the school skills:
// @alg:E-systemes = eq-systems, @alg:C-developper = lit-polynomial,
// @alg:H-discriminant = quad-formula (credit), @alg:G-simplifier =
// rat-simplify. The A1 skills of step U4 (a1-fn-limits, a1-fn-onesided,
// a1-fn-extension, a1-fn-image, a1-seq-squeeze, a1-ser-compare…) go
// through UNBUILT (js/content/uni/index.js).

import { SKILLS as PART_A } from './analyse1-a.skills.js';
import { SKILLS as PART_B } from './analyse1-b.skills.js';
import { SKILLS as PART_C } from './analyse1-c.skills.js';
import { SKILLS as PART_D } from './analyse1-d.skills.js';
import { SKILLS as PART_E } from './analyse1-e.skills.js';
// Step U4: the rest of the catalogue, in parts f to l.
import { SKILLS as PART_F } from './analyse1-f.skills.js';
import { SKILLS as PART_G } from './analyse1-g.skills.js';
import { SKILLS as PART_H } from './analyse1-h.skills.js';
import { SKILLS as PART_I } from './analyse1-i.skills.js';
import { SKILLS as PART_J } from './analyse1-j.skills.js';
import { SKILLS as PART_K } from './analyse1-k.skills.js';
import { SKILLS as PART_L } from './analyse1-l.skills.js';

export const UNIT = { id: 'analyse1', title: 'Analyse I', color: '#5c940d', ready: true };

export const SKILLS = [...PART_A, ...PART_B, ...PART_C, ...PART_D, ...PART_E];
SKILLS.push(...PART_F, ...PART_G, ...PART_H, ...PART_I, ...PART_J, ...PART_K, ...PART_L);

// Module G4, géométrie analytique du plan et de l'espace (unit `geoan`).
// Catalogue: docs/universite/G-gymnase-2.md, section G4. Built at step U5,
// in two parts (geoan-a, geoan-b: .skills.js and .js). Years 12 and 12.5:
// needsSolo true (catalogue convention).
//
// Prerequisites of the catalogue resolved to the school skills:
// @alg:E-systemes-2x2 = eq-systems, @alg:L-affine = fn-affine,
// @alg:M-pythagore = geo-pythagore, @alg:H-completer-carre = quad-complete.

import { SKILLS as PART_A } from './geoan-a.skills.js';
import { SKILLS as PART_B } from './geoan-b.skills.js';

export const UNIT = { id: 'geoan', title: 'Géométrie analytique', color: '#f08c00', ready: true };

export const SKILLS = [...PART_A, ...PART_B];

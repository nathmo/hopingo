// Module M, analyse matricielle (unit `matrices`, step U8). Catalogue:
// docs/universite/L-M-algebre-lineaire.md, part M. Four parts
// (matrices-a … matrices-d, .skills.js and .js), listed here in the
// catalogue's order. Year 16 (BA4).
//
// Module N (step U9) reuses m-cholesky, m-power-method, m-rayleigh,
// m-norms and m-cond (prerequisites, and extraSkills of ba4-numerique).
// p-lin-combo (module P, step U7) goes through UNBUILT until P is merged.

import { SKILLS as PART_A } from './matrices-a.skills.js';
import { SKILLS as PART_B } from './matrices-b.skills.js';
import { SKILLS as PART_C } from './matrices-c.skills.js';
import { SKILLS as PART_D } from './matrices-d.skills.js';

export const UNIT = { id: 'matrices', title: 'Analyse matricielle', color: '#3b5bdb', ready: true };

const ORDER = ["m-blocks-schur", "m-rank1-proj", "m-spectral", "m-posdef", "m-cholesky", "m-quad-gradient", "m-normal-eq", "m-rayleigh", "m-power-method", "m-svd-lowrank", "m-norms", "m-cond", "m-gershgorin", "m-ode-modes", "m-expm", "m-discrete"];

export const SKILLS = [...PART_A, ...PART_B, ...PART_C, ...PART_D]
  .sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

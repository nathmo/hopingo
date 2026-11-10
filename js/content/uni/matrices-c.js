// Generators of module M, part c (unit `matrices`, step U8), spec §8.3.
// Catalogue: docs/universite/L-M-algebre-lineaire.md, part M.
// Skills: m-power-method, m-svd-lowrank, m-norms, m-cond, m-gershgorin.
// One file per skill family: matrices-c-power.js, matrices-c-svd.js,
// matrices-c-norms.js (norms and condition number), matrices-c-gersh.js;
// tools in matrices-c-kit.js.

import { genPower } from './matrices-c-power.js';
import { genLowRank } from './matrices-c-svd.js';
import { genNorms, genCond } from './matrices-c-norms.js';

export const GEN = {
  'm-power-method': genPower,
  'm-svd-lowrank': genLowRank,
  'm-norms': genNorms,
  'm-cond': genCond,
};

// Generators of module M, part b (unit `matrices`, step U8), spec §8.3.
// Catalogue: docs/universite/L-M-algebre-lineaire.md, part M.
// Skills: m-cholesky, m-quad-gradient, m-normal-eq, m-rayleigh, one file
// each (matrices-b-chol.js, -quad.js, -normal.js, -ray.js); tools in
// matrices-b-kit.js; traps in js/cas/rules/mb.js.

import { GEN as CHOL } from './matrices-b-chol.js';
import { GEN as RAY } from './matrices-b-ray.js';
import { GEN as QUAD } from './matrices-b-quad.js';

export const GEN = { ...CHOL, ...QUAD, ...RAY };

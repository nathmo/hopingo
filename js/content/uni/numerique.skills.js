// Module N, analyse numérique (unit `numerique`, step U9). Catalogue:
// docs/universite/N-analyse-numerique.md. Eight parts (numerique-a …
// numerique-h, .skills.js and .js), listed here in the catalogue's order.
// Year 16 (BA4). Cholesky, the power method, the norms, the condition
// number and the SVD belong to module M (unit `matrices`); N uses them as
// prerequisites and the exam ba4-numerique draws them (extraSkills).

import { SKILLS as PART_A } from './numerique-a.skills.js';
import { SKILLS as PART_B } from './numerique-b.skills.js';
import { SKILLS as PART_C } from './numerique-c.skills.js';
import { SKILLS as PART_D } from './numerique-d.skills.js';
import { SKILLS as PART_E } from './numerique-e.skills.js';
import { SKILLS as PART_F } from './numerique-f.skills.js';
import { SKILLS as PART_G } from './numerique-g.skills.js';
import { SKILLS as PART_H } from './numerique-h.skills.js';

export const UNIT = { id: 'numerique', title: 'Analyse numérique', color: '#087f5b', ready: true };

const ORDER = ["n-err-abs-rel", "n-err-float", "n-bisection", "n-fp-converge", "n-fp-order", "n-newton", "n-order-read", "n-newton-multiple", "n-newton-system", "n-secant", "n-interp-lagrange", "n-interp-error", "n-divided-diff", "n-chebyshev", "n-interp-piecewise", "n-spline", "n-least-squares", "n-fd-basic", "n-fd-roundoff", "n-fd-build", "n-fd-proof", "n-quad-composite", "n-quad-exactness", "n-quad-order", "n-quad-proof", "n-error-statements", "n-richardson", "n-lu", "n-thomas", "n-iter-jacobi-gs", "n-iter-convergence", "n-gradient-spd", "n-ode-euler", "n-ode-rk", "n-ode-stability", "n-ode-euler-global", "n-ode-implicit-newton", "n-ode-stiff", "n-bvp-fd", "n-bvp-convergence", "n-bvp-newton", "n-heat-implicit", "n-pde-cfl", "n-fem-hat", "n-opt-kkt"];

export const SKILLS = [...PART_A, ...PART_B, ...PART_C, ...PART_D, ...PART_E, ...PART_F, ...PART_G, ...PART_H]
  .sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

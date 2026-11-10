// Module A2, analyse II (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Nine parts (analyse2-a … analyse2-i,
// .skills.js and .js), listed here in the catalogue's order.
//
// Prerequisites of the catalogue resolved to the school skills:
// @alg:G-simplifier = rat-simplify, @alg:E-systemes-2x2 = eq-systems,
// @alg:D-trinome = fac-trinomial, @alg:H-discriminant = quad-formula,
// @alg:I-parametres = param-quadratic (inequalities with a parameter of
// degree 2).

import { SKILLS as PART_A } from './analyse2-a.skills.js';
import { SKILLS as PART_B } from './analyse2-b.skills.js';
import { SKILLS as PART_C } from './analyse2-c.skills.js';
import { SKILLS as PART_D } from './analyse2-d.skills.js';
import { SKILLS as PART_E } from './analyse2-e.skills.js';
import { SKILLS as PART_F } from './analyse2-f.skills.js';
import { SKILLS as PART_G } from './analyse2-g.skills.js';
import { SKILLS as PART_H } from './analyse2-h.skills.js';
import { SKILLS as PART_I } from './analyse2-i.skills.js';

export const UNIT = { id: 'analyse2', title: 'Analyse II', color: '#1098ad', ready: true };

// The catalogue's order (blocks: ℝⁿ and curves, limits, differentiability,
// extrema, parametric integrals, multiple integrals, ODE).
const ORDER = ["a2-rn-topology", "a2-rn-boundary", "a2-rn-sequences", "a2-curve-param", "a2-curve-length", "a2-lim-paths", "a2-lim-polar", "a2-continuity", "a2-compact-extreme", "a2-partials", "a2-dir-deriv-def", "a2-diff-def", "a2-diff-implications", "a2-tangent-graph", "a2-tangent-level", "a2-chain", "a2-chain-polar", "a2-laplacian-radial", "a2-taylor2", "a2-implicit-2var", "a2-implicit-3var", "a2-crit-points", "a2-hessian-2x2", "a2-hessian-3x3", "a2-extrema-compact", "a2-lagrange", "a2-lagrange-3d", "a2-param-int", "a2-param-int-bounds", "a2-fubini-rect", "a2-domain-describe", "a2-fubini-swap", "a2-triple-int", "a2-change-var", "a2-polar-int", "a2-cyl-sph", "a2-improper-multi", "a2-volume", "a2-mass-center", "a2-ode-cauchy", "a2-ode-separable", "a2-ode-linear1", "a2-ode-homog-subst", "a2-ode-structure", "a2-ode-const2", "a2-ode-wronskian", "a2-ode-particular", "a2-ode-choose", "a2-ode-stability", "a2-ode-subst-other", "a2-ode-exact", "a2-ode-system"];

export const SKILLS = [...PART_A, ...PART_B, ...PART_C, ...PART_D, ...PART_E, ...PART_F, ...PART_G, ...PART_H, ...PART_I]
  .sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

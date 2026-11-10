// Generators of module P, part b (unit `proba`, step U7): see
// proba-b.skills.js. Items in proba-b-cont.js (densities, quantiles,
// uniform and exponential laws, moments, families), proba-b-norm.js (normal
// law, normal quantiles, transformations) and proba-b-joint.js (joint laws,
// linear combinations); traps in js/cas/rules/pb.js.

import { GEN as CONT } from './proba-b-cont.js';
import { GEN as LAW } from './proba-b-law.js';
import { GEN as NORM } from './proba-b-norm.js';
import { GEN as JOINT } from './proba-b-joint.js';

export const GEN = { ...CONT, ...LAW, ...NORM, ...JOINT };

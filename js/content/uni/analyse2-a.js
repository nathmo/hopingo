// Generators of module A2, part a (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skills: analyse2-a.skills.js; traps:
// js/cas/rules/a2a.js. GEN[id] = (level, rng, profile, opts) => item.
// Topology and boundary: analyse2-a-topo.js; sequences of ℝⁿ:
// analyse2-a-seq.js; curves and arc length: analyse2-a-curve.js;
// continuous functions on a compact: analyse2-a-compact.js.

import { topologyItem, boundaryItem } from './analyse2-a-topo.js';
import { sequencesItem } from './analyse2-a-seq.js';
import { curveParamItem, curveLengthItem } from './analyse2-a-curve.js';
import { compactItem } from './analyse2-a-compact.js';

export const GEN = {
  'a2-rn-topology': topologyItem,
  'a2-rn-boundary': boundaryItem,
  'a2-rn-sequences': sequencesItem,
  'a2-curve-param': curveParamItem,
  'a2-curve-length': curveLengthItem,
  'a2-compact-extreme': compactItem,
};

// Generators of module A1, part b (unit `analyse1`, step U2). Catalogue:
// docs/universite/A1-analyse-1.md. Skills: js/content/uni/analyse1-b.skills.js.
// One file per skill or pair of skills: analyse1-b-mvt.js (mean value
// theorem), -bh.js (Bernoulli-l'Hôpital), -extrema.js (global extrema),
// -study.js (study of a function), -curves.js (parametric and polar
// curves); shared helpers in analyse1-b-common.js.

import { mvtItem } from './analyse1-b-mvt.js';
import { bhItem } from './analyse1-b-bh.js';
import { extremaItem } from './analyse1-b-extrema.js';
import { fnStudyItem } from './analyse1-b-study.js';
import { paramCurveItem, polarCurveItem } from './analyse1-b-curves.js';

export const GEN = {
  'a1-mvt': mvtItem,
  'a1-bh': bhItem,
  'a1-extrema-global': extremaItem,
  'a1-fn-study': fnStudyItem,
  'a1-param-curve': paramCurveItem,
  'a1-polar-curve': polarCurveItem,
};

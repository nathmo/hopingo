// Generators of module G8, part b (unit `complexes`, step U4). Catalogue:
// docs/universite/G-gymnase-2.md, « G8 ». Skills:
// js/content/uni/complexes-b.skills.js.
//
// Levels (spec §8.3): 1–2 guided (lines with blanks; decisions shown, then
// one to choose), 3 « choose the action » (a menu per reference line), 4
// free lines with 3 hints, 5 alone. opts.exam = 'mcq' | 'tf' | 'open'.
// Files: complexes-b-poly.js (g8-poly), complexes-b-locus.js (g8-locus,
// g8-inversion), complexes-b-geo.js (g8-ratio-angle, g8-transform), helpers
// in complexes-b-kit.js.

import { genPoly } from './complexes-b-poly.js';
import { genLocus, genInversion } from './complexes-b-locus.js';
import { genRatio, genTransform } from './complexes-b-geo.js';

export const GEN = {
  'g8-poly': genPoly,
  'g8-locus': genLocus,
  'g8-ratio-angle': genRatio,
  'g8-transform': genTransform,
  'g8-inversion': genInversion,
};

// Generators of module A1, part h (unit `analyse1`, step U4): recursive
// sequences and geometric or telescoping series. Catalogue:
// docs/universite/A1-analyse-1.md (« Réels » for the sequences, « Séries
// numériques »). Skills: js/content/uni/analyse1-h.skills.js. Traps:
// js/cas/rules/a1h.js.
//   analyse1-h-kit.js     helpers (U2 part b helpers, b·qⁿ as text)
//   analyse1-h-seq.js     a1-seq-affine
//   analyse1-h-fixed.js   a1-seq-rec-fixed
//   analyse1-h-study.js   a1-seq-rec-study (the 13-point problem, E1)
//   analyse1-h-series.js  a1-ser-geo-tele
//
// Levels (spec §8.3): 1–2 guided (blanks; decisions shown), 3 « choose the
// action » (a menu per reference line), 4 free lines with 3 hints, 5 alone
// (lines without hints, a multiple choice, or the `problem` of E1).

import { affineItem } from './analyse1-h-seq.js';
import { fixedItem } from './analyse1-h-fixed.js';
import { studyItem } from './analyse1-h-study.js';
import { seriesItem } from './analyse1-h-series.js';

export const GEN = {
  'a1-seq-affine': affineItem,
  'a1-seq-rec-fixed': fixedItem,
  'a1-seq-rec-study': studyItem,
  'a1-ser-geo-tele': seriesItem,
};

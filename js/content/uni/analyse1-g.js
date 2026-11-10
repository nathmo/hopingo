// Generators of module A1, part g (unit `analyse1`, step U4): sequences.
// Catalogue: docs/universite/A1-analyse-1.md, « Suites ». Skills:
// js/content/uni/analyse1-g.skills.js. Traps: js/cas/rules/a1g.js.
//   analyse1-g-kit.js       judges of sequences, writers, counter-examples
//   analyse1-g-squeeze.js   a1-seq-squeeze
//   analyse1-g-oneinf.js    a1-seq-1inf
//   analyse1-g-ratio.js     a1-seq-ratio
//   analyse1-g-monotone.js  a1-seq-monotone
//   analyse1-g-limsup.js    a1-seq-limsup

import { sqItem } from './analyse1-g-squeeze.js';
import { oiItem } from './analyse1-g-oneinf.js';
import { raItem } from './analyse1-g-ratio.js';
import { moItem } from './analyse1-g-monotone.js';
import { lsItem } from './analyse1-g-limsup.js';

export const GEN = {
  'a1-seq-squeeze': sqItem,
  'a1-seq-1inf': oiItem,
  'a1-seq-ratio': raItem,
  'a1-seq-monotone': moItem,
  'a1-seq-limsup': lsItem,
};

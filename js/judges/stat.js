// Judge `stat` (spec §5.2, §16.2, step U7): approximate values of
// statistics. A line is a chain « [label =] member = member … »
// (js/judges/statline.js) whose members all have the value the part asks
// within ½·10^(−decimals) (3 by default), or one of the readings a table
// allows (cfg.accept, convention 3 of docs/universite/P-probabilites.md).
// Intervals [a ; b] are compared bound by bound; with ciRule 'outward' the
// bounds must be rounded outward (EE-209, part 3b). The common engine and
// its cfg are described in js/judges/statjudge.js.

import { makeJudge } from './statjudge.js';

const J = makeJudge('stat');
export const { judgeLine, isFinal, start, parseLine, show, text, templateML, sign } = J;

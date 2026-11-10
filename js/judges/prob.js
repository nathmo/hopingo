// Judge `prob` (spec §5.2, step U7): exact probabilities and counts. A line
// is a chain « [label =] member = member … » (js/judges/statline.js) whose
// members all have the value the part asks (cfg.expect, exact), with the
// symbols of the item (cfg.symbols: {'Pr(M)': '1/100'}) replaced by their
// values and C(n, k), A(n, k), n! computed exactly. Final form: a whole
// number, a finite decimal or an irreducible fraction. The common engine
// and its cfg are described in js/judges/statjudge.js.

import { makeJudge } from './statjudge.js';

const J = makeJudge('prob');
export const { judgeLine, isFinal, start, parseLine, show, text, templateML, sign } = J;

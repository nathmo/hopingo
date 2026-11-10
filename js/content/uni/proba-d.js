// Generators of module P, part d (unit `proba`, step U7): confidence
// intervals (proba-d-ci.js) and tests of a mean or a proportion
// (proba-d-test.js). Skills: proba-d.skills.js; traps: js/cas/rules/pd.js.

import { GEN as CI } from './proba-d-ci.js';
import { GEN as TESTS } from './proba-d-test.js';

export const GEN = { ...CI, ...TESTS };

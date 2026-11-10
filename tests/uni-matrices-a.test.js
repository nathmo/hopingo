// Items of the university unit `matrices` (module M), part a (helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit matrices (a): every skill, 5 levels and exam variants', () => checkSkills(['m-blocks-schur', 'm-rank1-proj', 'm-spectral', 'm-posdef'], 17, {}));

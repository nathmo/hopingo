// Items of the university unit `matrices` (module M), part b (helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit matrices (b): every skill, 5 levels and exam variants', () => checkSkills(['m-cholesky', 'm-quad-gradient', 'm-normal-eq', 'm-rayleigh'], 17, {}));

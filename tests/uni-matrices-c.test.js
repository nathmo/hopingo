// Items of the university unit `matrices` (module M), part c (helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit matrices (c): every skill, 5 levels and exam variants', () => checkSkills(['m-power-method'], 17, { 'm-power-method': 20 }));

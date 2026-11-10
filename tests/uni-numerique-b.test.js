// Items of the university unit `numerique` (module N), part b (helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit numerique (b): every skill, 5 levels and exam variants', () => checkSkills(['n-newton'], 17, { 'n-newton': 20 }));

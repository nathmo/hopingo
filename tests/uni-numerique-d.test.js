// Items of the university unit `numerique` (module N), part d: finite
// differences (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit numerique (d): every skill, 5 levels and exam variants', () => checkSkills(['n-fd-basic', 'n-fd-roundoff', 'n-fd-build', 'n-fd-proof'], 17, { 'n-fd-proof': 20 }));

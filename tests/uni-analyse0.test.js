// Items of the university unit `analyse0` (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills, skillsOf } from './uni-check.js';

test('unit analyse0: the pilot g6-deriv-rules, 5 levels and exam variants', () => checkSkills(['g6-deriv-rules']));

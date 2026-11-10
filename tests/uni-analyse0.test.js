// Items of the university unit `analyse0` (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills, skillsOf } from './uni-check.js';

test('unit analyse0: every skill, 5 levels and exam variants', () => checkSkills(skillsOf('analyse0')));

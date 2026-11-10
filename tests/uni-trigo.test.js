// Items of the university unit `trigo` (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills, skillsOf } from './uni-check.js';

test('unit trigo: every skill, 5 levels and exam variants', () => checkSkills(skillsOf('trigo')));

// Items of the university unit `recurrence` (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills, skillsOf } from './uni-check.js';

test('unit recurrence: every skill, 5 levels and exam variants', () => checkSkills(skillsOf('recurrence')));

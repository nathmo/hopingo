// Items of the university unit `logique` (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills, skillsOf } from './uni-check.js';

test('unit logique: every skill, 5 levels and exam variants', () => checkSkills(skillsOf('logique')));

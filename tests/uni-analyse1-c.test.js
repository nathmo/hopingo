// Items of the university unit `analyse1`, part c (step U2; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-c.skills.js';

test('unit analyse1, part c: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id)));

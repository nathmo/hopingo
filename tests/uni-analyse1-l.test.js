// Items of the university unit `analyse1`, part l (step U4; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-l.skills.js';

test('unit analyse1, part l: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id)));

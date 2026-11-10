// Items of the university unit `analyse1`, part g (step U4; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-g.skills.js';

test('unit analyse1, part g: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id)));

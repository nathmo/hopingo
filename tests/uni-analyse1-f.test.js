// Items of the university unit `analyse1`, part f (step U4; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-f.skills.js';

test('unit analyse1, part f: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id)));

// Items of the university unit `analyse1`, part h (step U4; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-h.skills.js';

test('unit analyse1, part h: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id)));

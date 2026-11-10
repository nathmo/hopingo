// Items of the university unit `analyse1`, part a (step U2; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-a.skills.js';

test('unit analyse1, part a: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id)));

// Items of the university unit `complexes`, part b (step U4; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/complexes-b.skills.js';

test('unit complexes, part b: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id)));

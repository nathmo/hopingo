// Items of the university unit `analyse2`, part c (step U6; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse2-c.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set([]);
// Items per level (spec: 20 for the skills of step U6, never under 15).
const COUNTS = Object.fromEntries(SKILLS.map((s) => [s.id, 20]));

test('unit analyse2, part c: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

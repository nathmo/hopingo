// Items of the university unit `analyse2`, part g (step U6; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse2-g.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(["a2-polar-int", "a2-cyl-sph", "a2-improper-multi", "a2-volume", "a2-mass-center"]);
// Items per level for heavy skills (never under 15).
const COUNTS = {};

test('unit analyse2, part g: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

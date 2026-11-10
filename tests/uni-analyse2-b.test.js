// Items of the university unit `analyse2`, part b (step U6; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse2-b.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(["a2-lim-paths", "a2-lim-polar", "a2-continuity", "a2-dir-deriv-def", "a2-diff-def", "a2-diff-implications"]);
// Items per level for heavy skills (never under 15).
const COUNTS = {};

test('unit analyse2, part b: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

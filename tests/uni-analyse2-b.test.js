// Items of the university unit `analyse2`, part b (step U6; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse2-b.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set([]);
// Items per level for heavy skills (never under 15).
const COUNTS = { 'a2-lim-paths': 20, 'a2-lim-polar': 20, 'a2-continuity': 20, 'a2-dir-deriv-def': 20, 'a2-diff-def': 20, 'a2-diff-implications': 20 };

test('unit analyse2, part b: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

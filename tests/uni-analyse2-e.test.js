// Items of the university unit `analyse2`, part e (step U6; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse2-e.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set([]);
// Items per level for heavy skills (never under 15).
const COUNTS = { 'a2-crit-points': 20, 'a2-hessian-2x2': 20, 'a2-hessian-3x3': 20, 'a2-extrema-compact': 20, 'a2-lagrange': 15, 'a2-lagrange-3d': 20 };

test('unit analyse2, part e: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

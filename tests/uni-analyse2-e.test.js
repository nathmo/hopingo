// Items of the university unit `analyse2`, part e (step U6; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse2-e.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(["a2-crit-points", "a2-hessian-2x2", "a2-hessian-3x3", "a2-extrema-compact", "a2-lagrange", "a2-lagrange-3d"]);
// Items per level for heavy skills (never under 15).
const COUNTS = {};

test('unit analyse2, part e: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

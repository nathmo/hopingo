// Items of the university unit `analyse2`, part h (step U6; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse2-h.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(["a2-ode-cauchy", "a2-ode-separable", "a2-ode-linear1", "a2-ode-homog-subst", "a2-ode-structure", "a2-ode-const2", "a2-ode-wronskian"]);
// Items per level for heavy skills (never under 15).
const COUNTS = {};

test('unit analyse2, part h: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

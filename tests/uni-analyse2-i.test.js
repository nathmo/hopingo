// Items of the university unit `analyse2`, part i (step U6; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse2-i.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(["a2-ode-particular", "a2-ode-choose", "a2-ode-stability", "a2-ode-subst-other", "a2-ode-exact", "a2-ode-system"]);
// Items per level for heavy skills (never under 15).
const COUNTS = {};

test('unit analyse2, part i: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

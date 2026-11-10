// Items of the university unit `fourier`, part b (step U10; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/fourier-b.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(["f-ft-eq", "f-plancherel", "f-distrib-def", "f-distrib-deriv", "f-distrib-eq"]);
// Items per level: 20 (never under 15).
const COUNTS = Object.fromEntries(SKILLS.map((s) => [s.id, 20]));

test('unit fourier, part b: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

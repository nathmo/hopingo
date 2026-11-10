// Items of the university unit `fourier`, part a (step U10; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/fourier-a.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(["f-coef", "f-coef-complex", "f-sine-cosine", "f-dirichlet", "f-parseval", "f-coef-relations", "f-series-problem", "f-periodic-ode", "f-sturm-liouville"]);
// Items per level: 20 (never under 15).
const COUNTS = Object.fromEntries(SKILLS.map((s) => [s.id, 20]));

test('unit fourier, part a: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

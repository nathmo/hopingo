// Items of the university unit `vecto`, part a (step U10; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/vecto-a.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(["v-ops", "v-identities", "v-curve-param", "v-line-scalar", "v-line-vector", "v-domain-topo", "v-pot-test", "v-pot-find", "v-pot-lambda", "v-pot-none", "v-pot-domain"]);
// Items per level: 20 (never under 15).
const COUNTS = Object.fromEntries(SKILLS.map((s) => [s.id, 20]));

test('unit vecto, part a: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

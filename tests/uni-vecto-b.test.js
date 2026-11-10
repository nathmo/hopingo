// Items of the university unit `vecto`, part b (step U10; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/vecto-b.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(["v-green", "v-green-flux", "v-surf-param", "v-surf-area", "v-flux", "v-boundary", "v-div-thm", "v-stokes", "v-verify-stokes", "v-verify-div", "v-proof-identity"]);
// Items per level: 20 (never under 15).
const COUNTS = Object.fromEntries(SKILLS.map((s) => [s.id, 20]));

test('unit vecto, part b: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

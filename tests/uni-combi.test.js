// Items of the university unit `combi` (module G7, step U7; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills, skillsOf } from './uni-check.js';

test('unit combi: every skill, 5 levels and exam variants', () => checkSkills(skillsOf('combi').filter((id) => id === 'g7-mult-principle'), 17, {}));

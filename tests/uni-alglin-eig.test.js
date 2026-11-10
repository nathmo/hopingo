// Items of the university unit `alglin` (module L), section « eig », first
// half (helpers and checks: tests/uni-check.js; second half in
// uni-alglin-eig2.test.js, so that node --test runs them in parallel).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit alglin (eig, 1/2): every skill, 5 levels and exam variants', () => checkSkills(['l-eig-check', 'l-eig-charpoly', 'l-eig-space', 'l-eig-related']));

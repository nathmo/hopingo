// Items of the university unit `fonctions-g`, in two files so that they run
// in parallel: domain to sign table here, inequations in
// tests/uni-fonctions-g-ineq.test.js (helpers: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills, skillsOf } from './uni-check.js';

test('unit fonctions-g (domain to sign table): 5 levels and exam variants', () => checkSkills(skillsOf('fonctions-g').slice(0, 8)));

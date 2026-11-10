// Items of the university unit `alglin` (module L), section « eig »
// (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit alglin (eig): every skill, 5 levels and exam variants', () => checkSkills(['l-eig-check', 'l-eig-charpoly', 'l-eig-space', 'l-eig-related', 'l-eig-diag', 'l-eig-diag-param', 'l-eig-powers', 'l-eig-markov', 'l-eig-complex']));

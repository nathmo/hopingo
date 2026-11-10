// Items of the university unit `alglin` (module L), section « eig », second half.
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit alglin (eig, 2/2): every skill, 5 levels and exam variants', () => checkSkills(['l-eig-diag', 'l-eig-diag-param', 'l-eig-powers', 'l-eig-markov', 'l-eig-complex']));

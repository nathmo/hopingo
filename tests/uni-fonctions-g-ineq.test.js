// Items of the university unit `fonctions-g`, second half: rational,
// parametric, absolute-value and irrational inequations, bounds.
import { test } from 'node:test';
import { checkSkills, skillsOf } from './uni-check.js';

test('unit fonctions-g (inequations, bounds): 5 levels and exam variants', () => checkSkills(skillsOf('fonctions-g').slice(8)));

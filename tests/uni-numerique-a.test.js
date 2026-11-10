// Items of the university unit `numerique` (module N), part a (helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit numerique (a): every skill, 5 levels and exam variants', () => checkSkills(['n-err-abs-rel', 'n-err-float', 'n-bisection', 'n-fp-converge', 'n-fp-order'], 17));

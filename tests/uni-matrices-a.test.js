// Items of the university unit `matrices` (module M), part a (helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

const N = 20;
test('unit matrices (a): every skill, 5 levels and exam variants', () => checkSkills(['m-blocks-schur', 'm-rank1-proj', 'm-spectral', 'm-posdef'], 17, { 'm-blocks-schur': N, 'm-rank1-proj': N, 'm-spectral': N, 'm-posdef': N }));

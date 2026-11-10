// Items of the university unit `numerique` (module N), part c: interpolation
// and least squares (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

const IDS = ['n-interp-lagrange', 'n-interp-error', 'n-divided-diff', 'n-chebyshev', 'n-interp-piecewise', 'n-spline', 'n-least-squares'];
test('unit numerique (c): every skill, 5 levels and exam variants', () => checkSkills(IDS, 17));

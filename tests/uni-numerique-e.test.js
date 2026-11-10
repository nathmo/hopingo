// Items of the university unit `numerique` (module N), part e: quadrature,
// error statements, Richardson (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit numerique (e): every skill, 5 levels and exam variants', () => checkSkills(['n-quad-composite', 'n-quad-exactness', 'n-quad-order', 'n-quad-proof', 'n-error-statements', 'n-richardson'], 17, { 'n-quad-proof': 20 }));

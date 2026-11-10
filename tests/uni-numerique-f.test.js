// Items of the university unit `numerique` (module N), part f: LU, Thomas,
// Jacobi and Gauss-Seidel, convergence, gradient (helpers and checks:
// tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit numerique (f): n-lu, n-thomas', () => checkSkills(['n-lu', 'n-thomas'], 17, { 'n-lu': 20, 'n-thomas': 20 }));
test('unit numerique (f): Jacobi, Gauss-Seidel, convergence', () => checkSkills(['n-iter-jacobi-gs', 'n-iter-convergence'], 17, { 'n-iter-jacobi-gs': 20, 'n-iter-convergence': 20 }));
test('unit numerique (f): n-gradient-spd', () => checkSkills(['n-gradient-spd'], 17, { 'n-gradient-spd': 20 }));

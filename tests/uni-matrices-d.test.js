// Items of the university unit `matrices` (module M), part d: x′ = Ax,
// e^{At}, x_{k+1} = Ax_k (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit matrices (d): every skill, 5 levels and exam variants', () => checkSkills(['m-ode-modes', 'm-expm', 'm-discrete']));

// Items of the university unit `numerique` (module N), part g: equations
// différentielles (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

const IDS = ['n-ode-euler', 'n-ode-rk', 'n-ode-stability', 'n-ode-euler-global', 'n-ode-implicit-newton', 'n-ode-stiff'];

test('unit numerique (g): every skill, 5 levels and exam variants', () => checkSkills(IDS, 17));

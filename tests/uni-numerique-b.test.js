// Items of the university unit `numerique` (module N), part b: Newton, the
// order read on increments, multiple roots, systems, the secant (helpers
// and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit numerique (b): every skill, 5 levels and exam variants', () => checkSkills(
  ['n-newton', 'n-order-read', 'n-newton-multiple', 'n-newton-system', 'n-secant'], 17,
  { 'n-newton': 20, 'n-order-read': 30, 'n-newton-multiple': 20, 'n-newton-system': 20, 'n-secant': 20 },
));

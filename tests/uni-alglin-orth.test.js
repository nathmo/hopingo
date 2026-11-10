// Items of the university unit `alglin` (module L), section « orth »
// (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit alglin (orth): every skill, 5 levels and exam variants', () => checkSkills(['l-orth-dot', 'l-orth-complement', 'l-orth-proj', 'l-orth-matrices', 'l-orth-gs', 'l-orth-qr', 'l-orth-lsq', 'l-orth-inner'], 17, { 'l-orth-gs': 25, 'l-orth-complement': 30, 'l-orth-lsq': 30 }));

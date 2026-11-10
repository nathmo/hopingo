// Items of the university unit `alglin` (module L), section « sym »
// (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit alglin (sym): every skill, 5 levels and exam variants', () => checkSkills(['l-sym-orthodiag', 'l-sym-quadform', 'l-svd-compute', 'l-svd-sphere', 'l-proof-matrices', 'l-proof-spectral']));

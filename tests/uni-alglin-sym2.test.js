// Items of the university unit `alglin` (module L), section « sym », second half.
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit alglin (sym, 2/2): every skill, 5 levels and exam variants', () => checkSkills(['l-svd-compute', 'l-svd-sphere', 'l-proof-matrices', 'l-proof-spectral']));

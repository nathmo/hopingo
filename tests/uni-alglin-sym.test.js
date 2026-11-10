// Items of the university unit `alglin` (module L), section « sym », first
// half (helpers and checks: tests/uni-check.js; second half in
// uni-alglin-sym2.test.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit alglin (sym, 1/2): every skill, 5 levels and exam variants', () => checkSkills(['l-sym-orthodiag', 'l-sym-quadform']));

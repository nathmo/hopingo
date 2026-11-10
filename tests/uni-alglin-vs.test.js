// Items of the university unit `alglin` (module L), section « vs »
// (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit alglin (vs): every skill, 5 levels and exam variants', () => checkSkills(['l-vs-subspace', 'l-vs-kernel', 'l-vs-col-row', 'l-vs-basis', 'l-vs-rank', 'l-vs-coords', 'l-vs-map-matrix', 'l-vs-change-basis', 'l-vs-similar']));

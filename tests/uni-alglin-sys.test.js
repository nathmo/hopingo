// Items of the university unit `alglin` (module L), section « sys »
// (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit alglin (sys): every skill, 5 levels and exam variants', () => checkSkills(['l-sys-augmented', 'l-sys-echelon', 'l-sys-rref', 'l-sys-solution', 'l-sys-param', 'l-vec-span', 'l-vec-indep', 'l-sys-pivots-theory', 'l-map-std-matrix', 'l-map-inj-surj']));

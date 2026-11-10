// Items of the university unit `alglin` (module L), section « mat »
// (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit alglin (mat): every skill, 5 levels and exam variants', () => checkSkills(['l-mat-product', 'l-mat-inverse', 'l-map-geom', 'l-mat-imt', 'l-mat-elementary', 'l-mat-lu', 'l-mat-blocks']));

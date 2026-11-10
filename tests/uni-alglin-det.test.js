// Items of the university unit `alglin` (module L), section « det »
// (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';

test('unit alglin (det): every skill, 5 levels and exam variants', () => checkSkills(['l-det-cofactor', 'l-det-rowops', 'l-det-props', 'l-det-area', 'l-det-cramer']));

// Items of the university unit `analyse2`, part d (step U6; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse2-d.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(["a2-implicit-2var", "a2-implicit-3var", "a2-param-int", "a2-param-int-bounds"]);
// Items per level for heavy skills (never under 15).
const COUNTS = {};

test('unit analyse2, part d: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

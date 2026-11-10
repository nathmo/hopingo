// Items of the university unit `analyse2`, part d (step U6; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse2-d.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set([]);
// Items per level for heavy skills (never under 15).
const COUNTS = { "a2-implicit-2var": 20, "a2-implicit-3var": 20, "a2-param-int": 20, "a2-param-int-bounds": 15 };

test('unit analyse2, part d: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

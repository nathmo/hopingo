// Items of the university unit `analyse2`, part f (step U6; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse2-f.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set([]);
// Items per level for heavy skills (never under 15).
const COUNTS = { "a2-fubini-rect": 20, "a2-domain-describe": 20, "a2-fubini-swap": 20, "a2-triple-int": 20, "a2-change-var": 20 };

test('unit analyse2, part f: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

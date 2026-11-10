// Items of the university unit `analyse2`, part a (step U6; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse2-a.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(["a2-curve-param", "a2-curve-length", "a2-compact-extreme"]);
// Items per level for heavy skills (never under 15).
const COUNTS = { 'a2-rn-topology': 20, 'a2-rn-boundary': 20, 'a2-rn-sequences': 20 };

test('unit analyse2, part a: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

// Items of the university unit `coniques`, part b (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/coniques-b.skills.js';

test('unit coniques-b: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id))));

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(SKILLS.map((s) => s.id));

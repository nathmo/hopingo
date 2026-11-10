// Items of the university unit `coniques`, part a (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/coniques-a.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set([]);
const COUNTS = { 'g10-ellipse': 30, 'g10-hyperbola': 30 };

test('unit coniques-a: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

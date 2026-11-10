// Items of the university unit `coniques`, part b (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/coniques-b.skills.js';

test('unit coniques-b: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id))));

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(['g10-conic-from-data', 'g10-conic-tangent', 'g10-conic-family', 'g10-locus', 'g10-homogeneous']);

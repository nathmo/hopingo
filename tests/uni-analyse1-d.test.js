// Items of the university unit `analyse1`, part d (step U2; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-d.skills.js';

const ONLY = process.env.A1D_ONLY ? process.env.A1D_ONLY.split(',') : null;
test('unit analyse1, part d: every skill, 5 levels and exam variants', () => checkSkills(ONLY || SKILLS.map((s) => s.id)));

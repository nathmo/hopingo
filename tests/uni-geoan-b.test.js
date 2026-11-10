// Items of the university unit `geoan`, part b (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/geoan-b.skills.js';

test('unit geoan-b: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id), 17, COUNTS));

// Long items (many parts): fewer items per level, never under 20.
const COUNTS = { 'g4-common-perp': 20, 'g4-dist-skew': 25 };

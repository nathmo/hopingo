// Items of the university unit `proba`, part c (module P, step U7; helpers
// and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/proba-c.skills.js';
import { GEN } from '../js/content/uni/proba-c.js';

// Heavy skills: fewer items per level (never under 15).
const COUNTS = {};

test('unit proba, part c: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => GEN[id]), 17, COUNTS));

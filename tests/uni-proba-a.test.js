// Items of the university unit `proba`, part a (module P, step U7; helpers
// and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/proba-a.skills.js';
import { GEN } from '../js/content/uni/proba-a.js';

// Heavy skills: fewer items per level (never under 15).
const COUNTS = {};

test('unit proba, part a: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => GEN[id]), 17, COUNTS));

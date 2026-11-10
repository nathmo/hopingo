// Items of the university unit `proba`, part b (module P, step U7; helpers
// and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/proba-b.skills.js';
import { GEN } from '../js/content/uni/proba-b.js';
import { RULES } from '../js/cas/rules/pb.js';
import { checkTraps } from './uni-check-stat.js';

// Heavy skills: fewer items per level (never under 15).
const COUNTS = {};

test('unit proba, part b: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => GEN[id]), 17, COUNTS));

test('unit proba, part b: the traps name their examples or are offered as baits', () => checkTraps(RULES));

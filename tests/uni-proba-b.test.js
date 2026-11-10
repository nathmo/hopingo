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
const ONLY = process.env.PB_ONLY ? process.env.PB_ONLY.split(',') : null;
const ids = SKILLS.map((s) => s.id).filter((id) => GEN[id] && (!ONLY || ONLY.includes(id)));

test('unit proba, part b: every skill, 5 levels and exam variants', () => checkSkills(ids, 17, COUNTS));

test('unit proba, part b: the traps name their examples or are offered as baits', () => checkTraps(RULES.filter((r) => !ONLY || ONLY.includes(r.skill))));

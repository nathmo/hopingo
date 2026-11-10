// Items of the university unit `combi` (module G7, step U7; helpers and
// checks: tests/uni-check.js), and its traps (tests/uni-check-stat.js).
import { test } from 'node:test';
import { checkSkills, skillsOf } from './uni-check.js';
import { checkTraps } from './uni-check-stat.js';
import { GEN } from '../js/content/uni/combi-gen.js';
import { RULES } from '../js/cas/rules/g7.js';

// Heavy skills: fewer items per level (never under 15).
const COUNTS = {};

test('unit combi: every skill, 5 levels and exam variants', () => checkSkills(skillsOf('combi').filter((id) => GEN[id]), 17, COUNTS));

test('unit combi: the traps name their examples or are offered as baits', () => checkTraps(RULES));

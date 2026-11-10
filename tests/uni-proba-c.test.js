// Items of the university unit `proba`, part c (module P, step U7; helpers
// and checks: tests/uni-check.js), its traps, and corrected solutions of the
// catalogue replayed through the judges prob and stat.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/proba-c.skills.js';
import { GEN } from '../js/content/uni/proba-c.js';
import { RULES } from '../js/cas/rules/pc.js';
import { checkTraps } from './uni-check-stat.js';
import { JUDGES } from '../js/judges/index.js';

// Heavy skills: fewer items per level (never under 15).
const COUNTS = { 'p-mle': 15, 'p-fisher-cr': 15, 'p-bias-mse': 15, 'p-sum-mixture': 20, 'p-mom': 20, 'p-mle-special': 20 };

test('unit proba, part c: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => GEN[id]), 17, COUNTS));

test('unit proba, part c: the traps name their examples or are offered as baits', () => checkTraps(RULES));

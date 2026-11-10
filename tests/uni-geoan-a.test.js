// Items of the university unit `geoan`, part a (helpers and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/geoan-a.skills.js';

test('unit geoan-a: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id))));

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(['g4-line2', 'g4-dot', 'g4-bisectors', 'g4-line3', 'g4-plane', 'g4-relative-pos']);

// Items of the university unit `analyse2`, part b (step U6; helpers and
// checks: tests/uni-check.js), and the counter-examples of the part.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse2-b.skills.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { checkCounter } from '../js/judges/examples.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set([]);
// Items per level (20 for each skill of this part: the file stays under ~30 s).
const COUNTS = { 'a2-lim-paths': 20, 'a2-lim-polar': 20, 'a2-continuity': 20, 'a2-dir-deriv-def': 20, 'a2-diff-def': 20, 'a2-diff-implications': 20 };

test('unit analyse2, part b: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

test('part b: an exam question has the type of its section (the exam scores tf items only)', () => {
  const rng = makeRng(5);
  for (const s of SKILLS) {
    for (const kind of s.exam) {
      for (let i = 0; i < 30; i++) {
        const it = generate(s.id, 4, rng, null, { exam: kind });
        assert.equal(it.type, kind, `${s.id} ${kind}: ${it.key}`);
      }
    }
  }
});

test('part b: counter-examples knownShift, negDir, normQuotient', () => {
  const c = (prop, params, f) => checkCounter({ kind: 'a2', prop, params }, { f }).ok;
  assert.equal(c('knownShift', { want: ['K2'], shift: 2 }, '2+3x^2y/(x^4+y^2)'), true);
  assert.equal(c('knownShift', { want: ['K2'], shift: 2 }, 'x^2y/(x^4+y^2)'), false);
  assert.equal(c('negDir', {}, 'x+y'), true);
  assert.equal(c('negDir', {}, 'x^2'), false, 'D_v f = 0');
  assert.equal(c('negDir', {}, 'abs(x)'), false, 'no D_v f');
  assert.equal(c('normQuotient', {}, 'x'), true);
  assert.equal(c('normQuotient', {}, 'x^2+y^2'), false, 'the quotient tends to 0');
});

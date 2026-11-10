// Items of the university unit `cplx`, part b (step U10; helpers and
// checks: tests/uni-check.js). Every reference residue the generators build
// is also checked against the numeric Laurent coefficient a₋₁ of
// js/cas/series.js (VERIFY, js/content/uni/cplx-b-kit.js).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/cplx-b.skills.js';
import { VERIFY } from '../js/content/uni/cplx-b-kit.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set(["c-int-branch", "c-fourier-residues", "c-conformal"]);
// Items per level: 20 (never under 15).
const COUNTS = Object.fromEntries(SKILLS.map((s) => [s.id, 20]));

test('unit cplx, part b: every skill, 5 levels and exam variants', () => {
  VERIFY.on = true;
  checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS);
  assert.ok(VERIFY.count > 0, 'reference residues checked');
});

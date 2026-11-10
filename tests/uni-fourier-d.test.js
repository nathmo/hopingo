// Items of the university unit `fourier`, part d (step U10; helpers and
// checks: tests/uni-check.js), and the numeric check of the PDE solutions
// (js/content/uni/fourier-d-pde.js): the reference u of every item satisfies
// its equation, its boundary conditions and its initial ones.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/fourier-d.skills.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { pdeIssue } from '../js/content/uni/fourier-d-pde.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set([]);
// Items per level: 20 (never under 15).
const COUNTS = Object.fromEntries(SKILLS.map((s) => [s.id, 20]));

test('unit fourier, part d: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

test('unit fourier, part d: the reference u satisfies the PDE and its conditions', () => {
  const rng = makeRng(23);
  let checked = 0;
  for (const s of SKILLS) {
    for (const run of [1, 2, 3, 4, 5, 'open']) {
      for (let i = 0; i < 6; i++) {
        const it = generate(s.id, run === 'open' ? 4 : run, rng, null, run === 'open' ? { exam: 'open' } : undefined);
        if (!it.pde) continue;
        assert.equal(pdeIssue(it.pde.spec, it.pde.u), null, `${it.key}: ${it.pde.u}`);
        checked++;
      }
    }
  }
  assert.ok(checked > 60, `${checked} solutions checked`);
});

test('unit fourier, part d: the PDE check refuses a wrong solution', () => {
  const heat = { kind: 'heat', k: 1, c: 0, L: Math.PI, bc: 'D', ic: '3sin(x)-sin(4x)' };
  assert.equal(pdeIssue(heat, '3e^(-t)sin(x)-e^(-16t)sin(4x)'), null);
  assert.match(pdeIssue(heat, '3e^(-t)sin(x)-e^(-4t)sin(4x)'), /équation/);
  assert.match(pdeIssue({ ...heat, bc: 'N', ic: '3cos(x)' }, '3e^(-t)sin(x)'), /Neumann|initiale/);
  const wave = { kind: 'wave', c: 0.5, L: null, ic: 'e^(-x^2)', ic1: '0' };
  assert.equal(pdeIssue(wave, '(e^(-(x+t/2)^2)+e^(-(x-t/2)^2))/2'), null);
  assert.ok(pdeIssue(wave, '(e^(-(x+t/2)^2)+e^(-(x-t/2)^2))/4'));
  assert.equal(pdeIssue({ kind: 'half', g: '2/(y^2+4)' }, '(x+2)/(y^2+(x+2)^2)'), null);
  assert.ok(pdeIssue({ kind: 'half', g: '2/(y^2+4)' }, '(x+2)/(y^2+(x+2)^2)+x'));
  assert.equal(pdeIssue({ kind: 'disk', g: '1+3cos(2θ)', vars: ['x', 'y'] }, '1+3(x^2-y^2)'), null);
  assert.ok(pdeIssue({ kind: 'disk', g: '1+3cos(2θ)', vars: ['x', 'y'] }, '1+3x^2'));
});

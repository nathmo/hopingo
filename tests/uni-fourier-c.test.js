// Items of the university unit `fourier`, part c (step U10; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/fourier-c.skills.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set([]);
// Items per level: 20 (never under 15).
const COUNTS = Object.fromEntries(SKILLS.map((s) => [s.id, 20]));

test('unit fourier, part c: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

// The exact residues of the generators (f-lap-inv-res, f-lap-problem)
// agree with the numeric Laurent coefficients of js/cas/series.js, the
// integro-differential equations hold at 6 values of t.
import assert from 'node:assert/strict';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { segmentsOf } from '../js/judges/lines.js';
import { parse } from '../js/cas/parse.js';
import { residue } from '../js/cas/series.js';
import { evalComplex } from '../js/cas/complex.js';
import { integroResidual } from '../js/content/uni/fourier-c-kit.js';

test('residues of F(z)e^(zt) match the Laurent coefficients', () => {
  const rng = makeRng(5);
  let n = 0;
  for (const [id, level] of [['f-lap-inv-res', 4], ['f-lap-problem', 4]]) {
    for (let i = 0; i < 6; i++) {
      const it = generate(id, level, rng);
      const F = segmentsOf(it).find((s) => s.judge.kind === 'transform' && s.judge.F).judge.F;
      for (const seg of segmentsOf(it).filter((s) => s.judge.kind === 'lapres')) {
        const z0 = parse(seg.judge.z0, { complex: true });
        for (const t of [0.4, 1.3]) {
          const want = residue(parse(`(${F})e^(z t)`, { vars: ['z', 't'], complex: true }), 'z', z0, { env: { t } });
          const got = evalComplex(parse(seg.judge.value, { vars: ['t'], complex: true }), { t });
          assert.ok(Math.hypot(want.re - got.re, want.im - got.im) < 1e-6 * (1 + Math.hypot(got.re, got.im)), `${it.key} at ${seg.judge.z0}`);
          n++;
        }
      }
    }
  }
  assert.ok(n > 20);
});

test('integro-differential equations: the answer satisfies the equation', () => {
  assert.ok(integroResidual({ a: 2, c: 20, K: 10, A: 1, B: 2, w: 4 }) < 1e-6, 'catalogue example (GC 2022)');
  assert.ok(integroResidual({ a: 2, c: 20, K: 10, A: 1, B: 3, w: 4 }) > 1e-3, 'a wrong answer is seen');
});

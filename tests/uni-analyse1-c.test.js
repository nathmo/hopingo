// Items of the university unit `analyse1`, part c (step U2: développements
// limités, limits by DL, f⁽ᵏ⁾(a) read on a DL, Taylor's remainder; helpers
// and checks: tests/uni-check.js). One test per skill.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-c.skills.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { LinesRun } from '../js/judges/lines.js';

for (const s of SKILLS) {
  test(`unit analyse1, part c: ${s.id}, 5 levels and exam variants`, () => checkSkills([s.id]));
}

// A typical wrong line of each DL skill is named by its trap.
test('unit analyse1, part c: the traps name the typical wrong lines', () => {
  const rng = makeRng(5);
  const named = new Set();
  for (let i = 0; i < 30; i++) {
    const it = generate('a1-dl-usual', 4, rng);
    if (!/^e\^\(/.test(it.start.math) || !it.start.math.endsWith('x)')) continue;
    // e^(ax) with the factorials forgotten: 1 + ax + a²x² + a³x³ …
    const a = Number(it.start.math.slice(3, -2).replace(/^-$/, '-1') || 1);
    if (!Number.isInteger(a)) continue;
    const n = it.judge.order;
    const terms = Array.from({ length: n + 1 }, (_, k) => `(${a ** k})x^${k}`).join('+');
    const v = new LinesRun(it).submit(`${terms}+x^${n}ε(x)`);
    assert.equal(v.kind, 'wrong');
    named.add(v.rule);
  }
  assert.ok(named.has('a1_dl_factorial_missing'), [...named].join());
});

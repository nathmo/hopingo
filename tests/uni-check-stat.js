// Checks of the traps of modules G7 and P (step U7), per part: the same
// replay as tests/judges.test.js (« every university trap names its own
// example »), run by each tests/uni-<unit>-<part>.test.js on its own
// traps: a wrong value diagnosed as the trap, or a bait offered by the
// items of its skill.
import assert from 'node:assert/strict';
import { JUDGES, readWith } from '../js/judges/index.js';
import { RULE_BY_ID, FAMILIES } from '../js/math/malrules.js';
import { SKILL_BY_ID } from '../js/content/skills.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';

export function checkTraps(rules) {
  for (const r of rules) {
    assert.ok(RULE_BY_ID[r.id], `${r.id} is in RULE_BY_ID`);
    assert.ok(FAMILIES[r.family], `${r.id}: family ${r.family}`);
    assert.ok(SKILL_BY_ID[r.skill] && SKILL_BY_ID[r.repair], `${r.id}: skills exist`);
    assert.ok(r.explain().length > 20, `${r.id}: general explanation`);
    const c = r.check;
    if (c?.judge) {
      const v = JUDGES[c.judge.kind].judgeLine(c.judge, readWith(c.judge, c.prev), c.line);
      assert.equal(v.kind, 'wrong', `${r.id}: example is wrong`);
      assert.equal(v.rule, r.id, `${r.id}: diagnosed as ${v.diag?.all}`);
      assert.ok(r.explain(v.diag.ctx).length > 20, r.id);
    } else if (c?.bait) {
      const rng = makeRng(3);
      let found = false;
      for (let i = 0; i < 40 && !found; i++) {
        const it = generate(c.bait.skill, c.bait.level ?? 4, rng, null, c.bait.exam ? { exam: c.bait.exam } : undefined);
        found = it.baits.includes(r.id);
      }
      assert.ok(found, `${r.id}: offered as a bait by ${c.bait.skill}`);
    } else assert.fail(`${r.id}: check`);
  }
}

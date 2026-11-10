// Items of the university unit `analyse1`, part j (step U4; helpers and
// checks: tests/uni-check.js). a1-fn-limits is checked on 25 items per
// level: each wrong line is diagnosed through every `limit` trap, whose
// candidates need series or numeric limits.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-j.skills.js';
import { JUDGES, readWith } from '../js/judges/index.js';
import { judgeTokens } from '../js/judges/logic.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';

test('unit analyse1, part j: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id), 17, { 'a1-fn-limits': 25 }));

test('part j: the traps name the typical lines of its items', () => {
  const lim = JUDGES.limit;
  const L = (cfg, prev, line) => lim.judgeLine(cfg, readWith(cfg, prev), line, {}).rule;
  // A remarkable limit without its scale, |x − 2| = x − 2 on the left,
  // one side taken for the limit.
  assert.equal(L({ kind: 'limit', v: 'x', to: '0' }, 'sin(4x)/x', '1'), 'a1_remarkable_limit_scale');
  assert.equal(L({ kind: 'limit', v: 'x', to: '0' }, 'ln(1+3x)/sin(2x)', '1/2'), 'a1_remarkable_limit_scale');
  assert.equal(L({ kind: 'limit', v: 'x', to: '3', dir: '-' }, '(x^2-9)/abs(x-3)', '6'), 'a1_abs_removed');
  assert.equal(L({ kind: 'limit', v: 'x', to: '0' }, 'arctan(1/x)', 'π/2'), 'a1_onesided_ignored');
  // δ: inverted, or written with x.
  const d = JUDGES.delta;
  const aff = { kind: 'delta', mode: 'delta', f: '2x+1', a: '3', L: '7', k: '2', rules: { dependsOnVar: 'a1_delta_depends_on_x' } };
  assert.equal(d.judgeLine(aff, null, '2ε').rule, 'a1_delta_inverted');
  assert.equal(d.judgeLine(aff, null, 'ε/2').kind, 'done');
  const quad = { kind: 'delta', mode: 'delta', f: 'x^2+x', a: '2', L: '6', k: '6', dep: 'ε/abs(x+3)', rules: { dependsOnVar: 'a1_delta_depends_on_x' } };
  assert.equal(d.judgeLine(quad, null, 'ε/abs(x+3)').rule, 'a1_delta_depends_on_x');
  assert.equal(d.judgeLine(quad, null, 'min(1 ; ε/6)').kind, 'done');
  // ε and δ swapped in a definition built from tokens.
  const rng = makeRng(2);
  for (let i = 0; i < 20; i++) {
    const it = generate('a1-fn-epsdelta-def', 4, rng);
    const swapped = it.judge.pieces.some((p) => p.text === '|f(x) − L| ≤ δ') && /0 < \|x − x₀\| ≤ δ ⇒ \|f\(x\) − L\| ≤ ε$/.test(it.target);
    if (!swapped) continue;
    const line = it.target.replace('0 < |x − x₀| ≤ δ ⇒ |f(x) − L| ≤ ε', '0 < |x − x₀| ≤ ε ⇒ |f(x) − L| ≤ δ');
    assert.equal(judgeTokens(it, line).rule, 'a1_epsdelta_swapped', it.key);
    return;
  }
  assert.fail('no limit definition drawn');
});

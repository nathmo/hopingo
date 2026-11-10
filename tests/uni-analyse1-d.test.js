// Items of the university unit `analyse1`, part d (step U2; helpers and
// checks: tests/uni-check.js): methods of integration. Also: the worked
// examples of the skills replay with the judges, the decisions' `then`
// (« t = », « u = ») accepts the right choice and refuses a wrong one, and
// the definite judge ends a recurrence part (cfg.recurrence).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-d.skills.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { LinesRun, segmentsOf } from '../js/judges/lines.js';
import { JUDGES } from '../js/judges/index.js';
import { parse } from '../js/cas/parse.js';

const IDS = SKILLS.map((s) => s.id);

test('unit analyse1, part d: every skill, 5 levels and exam variants', () => checkSkills(IDS));

// The judge of each worked example (intro.lines), part by part: a line
// with noEq starts a new part.
const INTRO = {
  'a1-int-direct': [{ kind: 'antideriv', v: 'x', domain: { x: [-3, 3] } }],
  'a1-int-subst': [{ kind: 'definite' }],
  'a1-int-parts': [{ kind: 'antideriv', v: 'x', domain: { x: [-2, 2] } }],
  'a1-int-reduction': [{ kind: 'definite', seq: { J: 'int(x^n×e^x,x,0,1)' }, param: 'n', recurrence: true }, { kind: 'definite', seq: { J: 'int(x^n×e^x,x,0,1)' } }],
  'a1-int-rational': [{ kind: 'antideriv', v: 'x', domain: { x: [1.5, 4] } }],
  'a1-int-trig': [{ kind: 'antideriv', v: 'x', domain: { x: [0.2, 3] }, subst: { t: 'cos(x)' } }],
  'a1-int-hyper': [{ kind: 'antideriv', v: 'x', domain: { x: [-3, 3] }, subst: { t: 'argsh(x/2)' } }],
};

test('the worked examples of part d replay with the judges, ending in a final line', () => {
  for (const s of SKILLS) {
    const cfgs = INTRO[s.id];
    let part = -1;
    let prev = null;
    let last = null;
    for (const l of s.intro.lines) {
      if (l.noEq) {
        if (last) assert.equal(last, 'done', `${s.id}: part ${part} ends`);
        part++;
        prev = parse(l.cas, { vars: ['x', 't', 'n'] });
        last = null;
        continue;
      }
      const cfg = cfgs[part];
      const v = JUDGES[cfg.kind].judgeLine(cfg, prev, l.cas, {});
      assert.ok(v.kind === 'ok' || v.kind === 'done', `${s.id}: ${l.cas} ${v.kind} ${v.message ?? ''}`);
      prev = v.node;
      last = v.kind;
    }
    assert.equal(last, 'done', `${s.id}: the example ends with a final line`);
  }
});

test('decisions with `then`: the right choice is stored, a wrong one refused', () => {
  const rng = makeRng(5);
  let seen = 0;
  for (const id of ['a1-int-subst', 'a1-int-parts', 'a1-int-trig']) {
    for (let i = 0; i < 30; i++) {
      const it = generate(id, 3, rng);
      const seg = segmentsOf(it)[0];
      const dec = seg.lines.find((l) => l.kind === 'decision');
      const opt = dec?.options.find((o) => o.then);
      if (!opt) continue;
      seen++;
      const run = new LinesRun(it);
      assert.equal(run.answerThen(opt, 'x^3+7').kind, 'wrong', `${it.key}: a wrong « ${opt.then.ask} »`);
      assert.equal(run.answerThen(opt, opt.then.expect).kind, 'ok', `${it.key}: ${opt.then.expect}`);
      // A poor option lets the student go on; its reason comes later.
      const poor = dec.options.find((o) => o.valid && o.quality === 'poor');
      if (poor) assert.ok(poor.why, `${it.key}: a poor option says why`);
    }
  }
  assert.ok(seen > 20, `decisions with then: ${seen}`);
});

test('definite judge: a recurrence part ends on Jₙ = … Jₙ₋₁ (cfg.recurrence)', () => {
  const cfg = { kind: 'definite', seq: { J: 'int(x^n×e^x,x,0,1)' }, param: 'n', recurrence: true };
  const J = (prev, line) => JUDGES.definite.judgeLine(cfg, parse(prev), line, {}).kind;
  const ipp = 'bracket(x^n×e^x,x,0,1)-n×int(x^(n-1)×e^x,x,0,1)';
  assert.equal(J('J_n', ipp), 'ok', 'an integral left');
  assert.equal(J(ipp, 'e-n×J_(n-1)'), 'done');
  assert.equal(J(ipp, 'e-(n-1)×J_(n-1)'), 'wrong');
  assert.equal(J(ipp, 'e-n×J_(n-1)+J_n-J_n'), 'ok', 'Jₙ still written');
  assert.equal(JUDGES.definite.judgeLine({ ...cfg, recurrence: false }, parse(ipp), 'e-n×J_(n-1)', {}).kind, 'ok', 'without the flag: unchanged');
});

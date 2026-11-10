// Items of the university unit `analyse1`, part l (step U4; helpers and
// checks: tests/uni-check.js), and the traps of a1l.js inside real items.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-l.skills.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { LinesRun, segmentsOf } from '../js/judges/lines.js';
import { checkCounter } from '../js/judges/examples.js';

test('unit analyse1, part l: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id)));

// Plays the reference up to part `seg` (its decisions taken), then submits `line`.
function wrongAt(item, seg, line) {
  const run = new LinesRun(item);
  for (let s = 0; s <= seg; s++) {
    for (const l of run.segments[s].lines) {
      if (l.kind === 'decision') run.decide(l, (l.options.find((o) => o.ref) ?? l.options.find((o) => o.valid)).id);
      if (l.kind === 'eq' && s < seg) run.submit(l.math);
    }
  }
  return run.submit(line);
}

test('part l: the traps name the wrong lines of real items', () => {
  const rng = makeRng(4);
  let seen = 0;
  for (let i = 0; i < 30; i++) {
    const it = generate('a1-cplx-zn-conj', 4, rng);
    if (it.type !== 'lines') continue;
    // z̄ written r·e^(iφ); r³ = r divided by r; the solution 0 forgotten.
    const segs = segmentsOf(it);
    if (it.start.math.startsWith('conj')) assert.equal(wrongAt(it, 0, 're^(iφ)').rule, 'a1_conj_arg_sign', it.key);
    const rLast = segs[1].lines.filter((l) => l.kind === 'eq').at(-1).math;
    if (rLast.startsWith('r=0 ou ')) {
      assert.equal(wrongAt(it, 1, rLast.replace('r=0 ou ', '')).rule, 'a1_zn_conj_r0', it.key);
      const set = segs[3].lines.find((l) => l.kind === 'eq').math;
      assert.equal(wrongAt(it, 3, set.replace('{0 ; ', '{')).rule, 'a1_zn_conj_r0', it.key);
      seen++;
    }
  }
  assert.ok(seen > 5);
  // iᵏ reduced modulo 3 in the first line of a quotient.
  for (let i = 0; i < 20; i++) {
    const it = generate('a1-cplx-exam', 4, rng);
    if (!it.start.math.includes('i^')) continue;
    const wrong = it.start.math.replace(/i\^(\d+)/g, (m, k) => `i^${Number(k) % 3}`);
    const v = new LinesRun(it).submit(wrong);
    if (v.kind === 'wrong') { assert.equal(v.rule, 'a1_cplx_ik_mod', `${it.key}: ${wrong}`); seen++; }
  }
  assert.ok(seen > 8);
});

test('part l: multiple choices have four options; Cauchy refuted by a shifted term', () => {
  const rng = makeRng(8);
  for (const id of ['a1-cplx-exam', 'a1-cplx-zn-conj']) {
    for (let i = 0; i < 40; i++) {
      const it = generate(id, 4, rng, null, { exam: 'mcq' });
      assert.equal(it.options.length, 4, `${it.key}: ${it.options.map((o) => o.html).join(' | ')}`);
    }
  }
  const cauchy = { kind: 'sequence', v: 'n', from: 1, seqs: ['a'], hyp: [{ p: 'toZero', of: 'a_(n+1)-a' }], concl: { p: 'converges' } };
  assert.equal(checkCounter(cauchy, { a: 'ln(n)' }).ok, true);
  assert.equal(checkCounter(cauchy, { a: 'sqrt(n)' }).ok, true);
  assert.equal(checkCounter(cauchy, { a: '1/n' }).ok, false);
  assert.equal(checkCounter(cauchy, { a: 'n' }).ok, false);
});

// University content (spec §13): the skill graph stays sound, level 5 is
// done alone, the browser modules parse. The items of each unit are
// checked by tests/uni-<unit>.test.js (helpers in tests/uni-check.js).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { SKILLS, UNITS, isOptional } from '../js/content/skills.js';
import { UNI_SKILLS } from '../js/content/uni/index.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { segmentsOf } from '../js/judges/lines.js';
import { JUDGES } from '../js/judges/index.js';
import { UNI } from './uni-check.js';

test('every university unit has its test file', () => {
  const files = new Set(readdirSync('tests'));
  for (const u of new Set(UNI_SKILLS.map((s) => s.unit))) assert.ok([...files].some((f) => f.startsWith(`uni-${u}`) && f.endsWith('.test.js')), `tests/uni-${u}.test.js`);
});

test('level 5 is done alone and ends with f′(a)', () => {
  const rng = makeRng(4);
  for (let i = 0; i < 20; i++) {
    const it = generate('g6-deriv-rules', 5, rng);
    assert.ok(it.noHints);
    const segs = segmentsOf(it);
    assert.equal(segs.length, 2, it.key);
    assert.equal(segs[1].judge.kind, 'value');
  }
});

test('level 5 items have no hints', () => {
  const rng = makeRng(8);
  for (const id of UNI) {
    for (let i = 0; i < 5; i++) {
      const it = generate(id, 5, rng);
      assert.ok(it.type === 'mcq' || it.noHints || it.hints?.length === 0, `${id} L5: ${it.key}`);
    }
  }
});

test('skill graph: no cycle, optional skills block nothing, prerequisites are justified', () => {
  const ids = new Set(SKILLS.map((s) => s.id));
  assert.equal(ids.size, SKILLS.length, 'unique ids');
  for (const s of SKILLS) {
    for (const p of s.prereqs) {
      assert.ok(ids.has(p), `${s.id} needs ${p}`);
      if (!s.optional) assert.ok(!isOptional(p), `${s.id} (core) depends on the optional ${p}`);
    }
  }
  for (const s of UNI_SKILLS) {
    assert.match(s.id, /^[a-z0-9]+-[a-z0-9-]+$/);
    assert.ok(UNITS.some((u) => u.id === s.unit), `${s.id}: unit`);
    // Each prerequisite of the catalogue is a sub-goal or has a reason.
    const it = generate(s.id, 4, makeRng(1));
    const credited = new Set((it.subgoals || []).map((g) => g.skill));
    for (const p of s.prereqs) {
      assert.ok(credited.has(p) || s.prereqWhy?.[p], `${s.id}: why ${p}?`);
    }
  }
  // Unit ids do not clash with the school units.
  const unitIds = UNITS.map((u) => u.id);
  assert.equal(new Set(unitIds).size, unitIds.length, 'unique unit ids');
});

test('browser modules parse, and the core imports without a DOM', async () => {
  const files = [
    ...readdirSync('js/ui').filter((f) => f.endsWith('.js')).map((f) => `js/ui/${f}`),
    ...readdirSync('js/ui/screens').map((f) => `js/ui/screens/${f}`),
    'js/main.js', 'js/store.js',
  ];
  for (const f of files) {
    const r = spawnSync(process.execPath, ['--check', f], { encoding: 'utf8' });
    assert.equal(r.status, 0, `${f}: ${r.stderr}`);
  }
  for (const dir of ['js/cas', 'js/cas/rules', 'js/judges', 'js/content/uni']) {
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.js'))) await import(`../${dir}/${f}`);
  }
  for (const k of ['equiv', 'value', 'solset', 'logic', 'poly']) assert.ok(JUDGES[k], k);
});

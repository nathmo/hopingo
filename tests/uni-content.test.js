// University content (spec §13): every university skill, levels 1 to 5 and
// each exam variant it declares, 40 items each. The reference solution
// passes its own judge line by line and ends with `done`; a typical wrong
// line is refused; baits exist; the skill graph stays sound.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { SKILLS, SKILL_BY_ID, UNITS, isOptional } from '../js/content/skills.js';
import { UNI_SKILLS, UNBUILT } from '../js/content/uni/index.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { RULE_BY_ID } from '../js/math/malrules.js';
import { LinesRun, checkScript, segmentsOf, templateOf, blankAnswers } from '../js/judges/lines.js';
import { parseOpts } from '../js/judges/common.js';
import { trapAnswers } from '../js/judges/diagnose.js';
import { JUDGES } from '../js/judges/index.js';
import { parse } from '../js/cas/parse.js';
import { expandDerivs } from '../js/cas/diff.js';
import { pretty } from '../js/cas/normal.js';

const UNI = UNI_SKILLS.map((s) => s.id);

function checkLinesItem(it, where) {
  const r = checkScript(it);
  assert.ok(r.ok, `${where}: reference solution ${JSON.stringify(r.log)}`);
  const segs = segmentsOf(it);
  const opts = parseOpts(it.judge);
  // Guided blanks are readable and not empty.
  for (const seg of segs) {
    for (const l of seg.lines.filter((x) => x.kind === 'eq' && x.blanks?.length)) {
      assert.ok(parse(templateOf(l, opts), opts), `${where}: template`);
      assert.ok(blankAnswers(l, opts).every((a) => a.length > 0), `${where}: empty blank`);
    }
    for (const l of seg.lines.filter((x) => x.kind === 'decision')) {
      assert.ok(l.options.some((o) => o.valid), `${where}: a decision needs a valid option`);
    }
  }
  // A typical wrong line is refused: a trap's answer, and the answer + 1.
  const start = parse(it.start.math, opts);
  const final = segs[0].lines.filter((l) => l.kind === 'eq').at(-1).math;
  const wrongs = [`${final}+1`];
  const trap = trapAnswers(it.judge.kind, start, it.judge, (n) => pretty(expandDerivs(n)))[0];
  for (const w of wrongs) assert.equal(new LinesRun(it).submit(w).kind, 'wrong', `${where}: ${w} accepted`);
  if (trap) {
    const v = new LinesRun(it).submit(trap.node);
    assert.equal(v.kind, 'wrong', `${where}: trap answer accepted`);
    assert.ok(v.rule, `${where}: trap answer not diagnosed`);
  }
  // Hints: none without help, three otherwise.
  if (it.noHints) assert.equal(it.hints.length, 0, where);
  else assert.equal(it.hints.length, 3, `${where}: three hints`);
  // Sub-goals credit real skills, or skills of modules still to build.
  for (const sg of it.subgoals) assert.ok(SKILL_BY_ID[sg.skill] || UNBUILT[sg.skill], `${where}: sub-goal ${sg.skill}`);
}

test('every university skill: 5 levels and exam variants, 40 items each', () => {
  const rng = makeRng(17);
  for (const id of UNI) {
    const s = SKILL_BY_ID[id];
    let fallbacks = 0;
    let total = 0;
    const runs = [...[1, 2, 3, 4, 5].map((level) => ({ level })), ...(s.exam || []).map((exam) => ({ level: 4, exam }))];
    for (const { level, exam } of runs) {
      const modes = new Set();
      for (let i = 0; i < 40; i++) {
        const it = generate(id, level, rng, null, exam ? { exam } : undefined);
        const where = `${id} L${level}${exam ? ` ${exam}` : ''}: ${it.key}`;
        total++;
        if (it.fallback) fallbacks++;
        assert.equal(it.skill, id, where);
        assert.ok(it.prompt && it.key && it.expectedSec > 0, where);
        for (const b of it.baits) assert.ok(RULE_BY_ID[b], `${where}: unknown bait ${b}`);
        if (exam) assert.equal(it.exam?.format, exam, where);
        if (it.type === 'lines') { modes.add(it.mode); checkLinesItem(it, where); }
        if (it.type === 'mcq') {
          assert.equal(it.options.filter((o) => o.correct).length, 1, `${where}: one right option`);
          assert.equal(new Set(it.options.map((o) => o.html)).size, it.options.length, `${where}: duplicate options`);
          assert.ok(it.options.length >= 2, where);
        }
      }
      if (!exam) {
        const want = { 1: 'guided', 2: 'guided', 3: 'tap', 4: 'free', 5: 'free' }[level];
        assert.ok(modes.has(want), `${id} L${level}: mode ${want}`);
      }
    }
    assert.ok(fallbacks / total < 0.01, `${id}: fallback example used ${fallbacks}/${total}`);
  }
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
    const credited = new Set(it.subgoals.map((g) => g.skill));
    for (const p of s.prereqs) {
      assert.ok(credited.has(p) || s.prereqWhy?.[p], `${s.id}: why ${p}?`);
    }
  }
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
  assert.ok(JUDGES.equiv && JUDGES.value);
});

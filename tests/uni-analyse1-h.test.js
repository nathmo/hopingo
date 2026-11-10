// Items of the university unit `analyse1`, part h (step U4; helpers and
// checks: tests/uni-check.js), and the acceptance criterion of step U4: the
// 13-point recursive sequence (catalogue A1, E1) is played, saved in the
// profile, reloaded from JSON and finished.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-h.skills.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { ProblemRun, pendingOf, resumeRun, referenceLog } from '../js/judges/problem.js';

test('unit analyse1, part h: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id)));

// Where each entry of the reference log is played: [part, segment].
function stepsOfLog(item, log) {
  const run = new ProblemRun(item);
  return log.map((e) => {
    const at = [run.part, run.linesRun ? run.linesRun.seg : 0];
    run.apply(e);
    return at;
  });
}

test('U4 criterion: the 13-point recursive sequence is played, saved, reloaded and finished', () => {
  const rng = makeRng(2026);
  for (let i = 0; i < 6; i++) {
    const item = generate('a1-seq-rec-study', 5, rng);
    assert.equal(item.type, 'problem');
    assert.equal(item.total, 13);
    assert.deepEqual(item.points.map((p) => p.reduce((a, b) => a + b, 0)), [1, 7, 2, 1, 1, 1], 'barème (a) 1, (b) 7, (c) 2, (d) 3');
    // The parts are of different types: lines with solset, equiv, value
    // and limit segments, and multiple choices for the case discussion.
    const kinds = new Set(item.parts.flatMap((p) => (p.type === 'lines' ? [p.judge.kind, ...p.script.filter((l) => l.kind === 'segment').map((l) => l.judge.kind)] : [p.type])));
    for (const k of ['solset', 'equiv', 'value', 'limit', 'mcq']) assert.ok(kinds.has(k), `a part judged by ${k}`);

    const log = referenceLog(item);
    const half = Math.floor(log.length / 2);
    const run = new ProblemRun(item);
    for (const e of log.slice(0, half)) run.apply(e);
    assert.ok(!run.done);
    // Saved in the profile, then the app is closed and opened again.
    const profile = { pending: pendingOf(run) };
    const reloaded = JSON.parse(JSON.stringify(profile));
    const back = resumeRun(reloaded.pending);
    assert.equal(back.part, run.part, 'same part after the reload');
    assert.equal(back.linesRun?.seg, run.linesRun?.seg, 'same segment after the reload');
    assert.deepEqual(back.score(), run.score(), 'same points so far');
    for (const e of log.slice(half)) back.apply(e);
    assert.ok(back.done);
    assert.deepEqual([back.score().got, back.score().max], [13, 13]);
    assert.equal(back.outcome().correct, true);
    assert.equal(back.outcome().solo, true);
  }
});

test('U4 criterion: a skipped step of the long problem loses only its own points', () => {
  const rng = makeRng(7);
  const item = generate('a1-seq-rec-study', 5, rng);
  const log = referenceLog(item);
  const at = stepsOfLog(item, log);
  // Every step in turn: skip it, play the rest of the reference.
  item.points.forEach((pts, part) => pts.forEach((p, seg) => {
    const run = new ProblemRun(item);
    let skipped = false;
    log.forEach((e, i) => {
      if (at[i][0] === part && at[i][1] === seg) {
        if (!skipped) { run.skip(); skipped = true; }
        return;
      }
      run.apply(e);
    });
    assert.ok(run.done, `part ${part + 1}, step ${seg + 1}`);
    assert.equal(run.score().got, 13 - p, `part ${part + 1}, step ${seg + 1}: ${p} point(s) lost`);
    assert.equal(run.outcome().correct, false);
  }));
});

test('the open exam variant of a1-seq-rec-study is the same 13-point problem', () => {
  const item = generate('a1-seq-rec-study', 4, makeRng(3), null, { exam: 'open' });
  assert.equal(item.type, 'problem');
  assert.deepEqual(item.exam, { format: 'open', points: 13 });
  assert.equal(item.total, 13);
});

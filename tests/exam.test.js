// Exam mode (spec §10, §13): each blueprint produces a complete exam, the
// marks are right (negative ones and multiple answers included), the grade
// stays between 1 and 6, and a run is recorded without changing levels.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EXAMS, EXAM_BY_ID } from '../js/content/uni/exams.js';
import { SKILL_BY_ID } from '../js/content/skills.js';
import {
  buildExam, scoreExam, scoreQuestion, gradeOf, verdictOf, maxScore, sectionPool, examsForUnit,
  startRun, answerRun, finishRun,
} from '../js/engine/exam.js';
import { makeRng } from '../js/content/random.js';
import { newProfileData } from '../js/engine/rewards.js';
import { skillState } from '../js/engine/learner.js';

const BA1 = EXAM_BY_ID['ba1-alglin'];
const profile = () => ({ id: 'x', name: 'Test', year: 13, track: 'mid', createdAt: 0, ...newProfileData() });

// The right answer of a question: the right option, or the truth.
const right = (q) => (q.kind === 'tf' ? q.item.truth : q.item.options.findIndex((o) => o.correct));
const wrong = (q) => (q.kind === 'tf' ? !q.item.truth : q.item.options.findIndex((o) => !o.correct));

test('every blueprint produces a complete exam', () => {
  for (const bp of EXAMS) {
    for (const seed of [1, 2, 3]) {
      const exam = buildExam(bp, { rng: makeRng(seed), now: 0 });
      assert.equal(exam.questions.length, bp.sections.reduce((s, x) => s + x.count, 0), bp.id);
      assert.equal(exam.endsAt - exam.startedAt, bp.durationMin * 60000);
      exam.questions.forEach((q, i) => {
        const section = bp.sections[q.section];
        assert.equal(q.kind, section.kind);
        assert.equal(q.item.exam.format, section.kind, `${bp.id} Q${q.n}: ${q.item.key}`);
        assert.ok(!q.item.stub, `${q.skill} is built`);
        assert.ok(q.item.noHints || !q.item.hints?.length, `${q.item.key}: no hints in an exam`);
        assert.ok((SKILL_BY_ID[q.skill].examWeight ?? 1) > 0, `${q.skill} has an exam weight`);
        if (q.kind === 'mcq') assert.equal(q.item.type, 'mcq');
        if (q.kind === 'tf') assert.equal(q.item.type, 'tf');
        // Never the same skill twice in a row.
        if (i) assert.notEqual(q.skill, exam.questions[i - 1].skill, `${bp.id}: two ${q.skill} in a row`);
      });
      // JSON-safe (the run is saved in the profile).
      assert.deepEqual(JSON.parse(JSON.stringify(exam)).questions.length, exam.questions.length);
    }
  }
  // ba1-alglin: 16 multiple choice +3/0/−1, 16 true/false +1/0/−1, 144 min.
  const exam = buildExam(BA1, { rng: makeRng(9), now: 0 });
  assert.equal(exam.questions.filter((q) => q.kind === 'mcq').length, 16);
  assert.equal(exam.questions.filter((q) => q.kind === 'tf').length, 16);
  assert.equal(BA1.durationMin, 144);
  assert.equal(maxScore(exam), 64);
  assert.ok(new Set(exam.questions.map((q) => q.skill)).size >= 10, 'a varied exam');
  assert.deepEqual(examsForUnit('alglin').map((e) => e.id), ['ba1-alglin']);
  assert.ok(sectionPool(BA1.sections[0]).every((p) => SKILL_BY_ID[p.id].exam.includes('mcq')));
  assert.ok(!sectionPool(BA1.sections[0]).some((p) => p.id === 'l-mat-blocks'), 'examWeight 0 is never drawn');
});

test('the marks: negative ones, blanks, and the estimated grade', () => {
  const exam = buildExam(BA1, { rng: makeRng(4), now: 0 });
  const qs = exam.questions;
  const all = scoreExam(exam, qs.map(right));
  assert.equal(all.score, 64);
  assert.equal(all.grade, 6);
  assert.equal(all.verdict.id, 'ready');
  const none = scoreExam(exam, qs.map(() => null));
  assert.equal(none.score, 0);
  assert.equal(none.grade, 1);
  const bad = scoreExam(exam, qs.map(wrong));
  assert.equal(bad.score, -32);
  assert.equal(bad.grade, 1, 'a negative score gives 1');
  // 10 right, 2 wrong, 4 blank MCQ; 12 right, 4 wrong T/F: 30 − 2 + 12 − 4 = 36.
  const mixed = qs.map((q, i) => {
    if (q.kind === 'mcq') return i < 10 ? right(q) : i < 12 ? wrong(q) : null;
    return i - 16 < 12 ? right(q) : wrong(q);
  });
  const r = scoreExam(exam, mixed);
  assert.equal(r.score, 36);
  assert.equal(r.grade, 3.75, '1 + 5·36/64 = 3.8125 → 3.75');
  assert.equal(r.verdict.label, 'Pas encore');
  assert.ok(r.toWork.length > 0);
  const counts = Object.values(r.perSkill).reduce((s, x) => ({ right: s.right + x.right, wrong: s.wrong + x.wrong, blank: s.blank + x.blank }), { right: 0, wrong: 0, blank: 0 });
  assert.deepEqual(counts, { right: 22, wrong: 6, blank: 4 });
  // A wrong option names its trap.
  const named = qs.findIndex((q) => q.kind === 'mcq' && q.item.options.some((o) => !o.correct && o.rule));
  if (named >= 0) {
    const q = qs[named];
    const k = q.item.options.findIndex((o) => !o.correct && o.rule);
    const one = qs.map((x, i) => (i === named ? k : null));
    assert.equal(scoreExam(exam, one).traps[0].rule, q.item.options[k].rule);
  }
});

test('the grade is between 1 and 6, by quarters, and the verdict follows it', () => {
  const rng = makeRng(5);
  const exam = buildExam(BA1, { rng: makeRng(6), now: 0 });
  for (let t = 0; t < 200; t++) {
    const resp = exam.questions.map((q) => [right(q), wrong(q), null][rng.int(0, 2)]);
    const { grade } = scoreExam(exam, resp);
    assert.ok(grade >= 1 && grade <= 6, `grade ${grade}`);
    assert.equal(grade * 4, Math.round(grade * 4));
  }
  assert.equal(gradeOf(48, 64), 4.75);
  assert.equal(gradeOf(-10, 64), 1);
  assert.equal(gradeOf(80, 64), 6);
  assert.equal(verdictOf(4.5).label, 'Prêt');
  assert.equal(verdictOf(4.25).label, 'Presque');
  assert.equal(verdictOf(4).label, 'Presque');
  assert.equal(verdictOf(3.75).label, 'Pas encore');
});

test('multiple answers: +1/N per right box, −1/M per wrong box, floor 0', () => {
  const q = { kind: 'mcq', item: { multi: true, options: [{ correct: true }, { correct: true }, { correct: false, rule: 'l_det_sum' }, { correct: false }, { correct: false }] } };
  const scoring = { perRight: '1/N', perWrong: '-1/M', floor: 0 };
  assert.equal(scoreQuestion(q, scoring, [0, 1]).points, 1);
  assert.equal(scoreQuestion(q, scoring, [0, 1]).state, 'right');
  assert.equal(scoreQuestion(q, scoring, [0]).points, 0.5);
  assert.ok(Math.abs(scoreQuestion(q, scoring, [0, 2]).points - (0.5 - 1 / 3)) < 1e-12);
  assert.equal(scoreQuestion(q, scoring, [2, 3]).points, 0, 'floor 0');
  assert.equal(scoreQuestion(q, scoring, [2]).rule, 'l_det_sum');
  assert.equal(scoreQuestion(q, scoring, []).state, 'blank');
});

test('a run: saved answers, history, mastery updated but not the level, prediction', () => {
  const p = profile();
  const run = startRun(p, BA1, { rng: makeRng(11), now: 1000 });
  assert.equal(p.examRun, run);
  run.exam.questions.forEach((q, i) => answerRun(p, i, i % 3 ? right(q) : wrong(q)));
  const skill = run.exam.questions[0].skill;
  const st = skillState(p, skill);
  const level = st.level;
  // Mastery 0.99 on every skill: the prediction is almost the maximum.
  for (const q of run.exam.questions) skillState(p, q.skill).p = 0.99;
  const before = scoreExam(run.exam, run.responses, p);
  assert.equal(before.prediction.score, 63.25, '0.99 × 64 = 63.36, by quarters');
  assert.equal(before.prediction.grade, 6);
  const { result } = finishRun(p, 2000);
  assert.equal(p.examRun, undefined);
  assert.equal(p.exams.length, 1);
  assert.equal(p.exams[0].id, 'ba1-alglin');
  assert.equal(p.exams[0].score, result.score);
  assert.ok(p.exams[0].grade >= 1 && p.exams[0].grade <= 6);
  assert.equal(skillState(p, skill).level, level, 'an exam does not change the level');
  assert.notEqual(skillState(p, skill).p, 0.99, 'the mastery is updated');
  assert.ok(result.overestimated, 'predicted 6, got less');
});

// Step U5: the CMS test, four long problems (5 points each, 105 minutes)
// drawn from several G units, G4 and G10 among them.
test('cms-controle: four open problems drawn from several G units', () => {
  const bp = EXAM_BY_ID['cms-controle'];
  const units = new Set();
  for (const seed of [1, 2, 3, 4, 5, 6]) {
    const exam = buildExam(bp, { rng: makeRng(seed), now: 0 });
    assert.equal(exam.questions.length, 4);
    assert.equal(maxScore(exam), 20);
    assert.equal(exam.endsAt - exam.startedAt, 105 * 60000);
    for (const q of exam.questions) {
      assert.equal(q.kind, 'open');
      assert.equal(q.item.exam.format, 'open', q.item.key);
      assert.ok(q.item.noHints, `${q.item.key}: no hints`);
      units.add(SKILL_BY_ID[q.skill].unit);
    }
  }
  assert.ok(units.size >= 3, `several units: ${[...units]}`);
  assert.ok(units.has('geoan') && units.has('coniques'), `G4 and G10 in the draw: ${[...units]}`);
  assert.ok(examsForUnit('coniques').some((e) => e.id === 'cms-controle'));
  assert.ok(examsForUnit('geoan').some((e) => e.id === 'cms-controle'));
});

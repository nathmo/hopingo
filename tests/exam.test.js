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
import { ProblemRun, referenceLog } from '../js/judges/problem.js';
import { LONG_PROBLEMS_ANALYSE1 } from '../js/content/uni/exams-analyse1.js';

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

// Step U4: Analyse I, 12 multiple choice, 12 true/false and 3 open problems
// of 2 to 7 points, each worth its own points (scoring.byStep).
test('ba1-analyse1: a complete exam, open problems of 2 to 7 points', () => {
  const bp = EXAM_BY_ID['ba1-analyse1'];
  assert.ok(EXAMS.includes(bp));
  assert.ok(examsForUnit('analyse1').some((e) => e.id === 'ba1-analyse1'));
  for (const seed of [1, 2, 3, 4]) {
    const exam = buildExam(bp, { rng: makeRng(seed), now: 0 });
    assert.equal(exam.questions.filter((q) => q.kind === 'mcq').length, 12);
    assert.equal(exam.questions.filter((q) => q.kind === 'tf').length, 12);
    const open = exam.questions.filter((q) => q.kind === 'open');
    assert.equal(open.length, 3);
    for (const q of open) {
      assert.equal(q.item.type, 'problem', q.item.key);
      assert.ok(q.max >= 2 && q.max <= 7, `${q.item.key}: ${q.max} points`);
      assert.equal(q.max, q.item.total);
      assert.ok(!LONG_PROBLEMS_ANALYSE1.includes(q.skill), `${q.skill}: a long MT problem`);
      assert.ok(bp.sections[2].pool.skills.includes(q.skill));
    }
    assert.equal(maxScore(exam), 12 * 3 + 12 + open.reduce((s, q) => s + q.max, 0));
    assert.ok(exam.questions.every((q) => SKILL_BY_ID[q.skill].unit === 'analyse1'));
  }
});

// An open question answered with the reference solution scores its full
// points; half of it scores part of them; a blank scores 0. The response
// is the log of the problem run, as the exam screen saves it.
test('open questions are marked step by step from the problem run', () => {
  for (const id of ['ba1-analyse1', 'cms-controle']) {
    const bp = EXAM_BY_ID[id];
    for (const seed of [5, 6]) {
      const exam = buildExam(bp, { rng: makeRng(seed), now: 0 });
      const responses = exam.questions.map((q) => (q.kind === 'open' ? referenceLog(q.item) : right(q)));
      const all = scoreExam(exam, responses);
      assert.equal(all.score, maxScore(exam), `${id}: every point`);
      assert.equal(all.grade, 6);
      for (const q of exam.questions.filter((x) => x.kind === 'open')) {
        const sc = exam.sections[q.section].scoring;
        const log = referenceLog(q.item);
        const full = scoreQuestion(q, sc, log);
        assert.deepEqual([full.state, full.points], ['right', q.max], q.item.key);
        assert.equal(scoreQuestion(q, sc, null).points, 0);
        assert.equal(scoreQuestion(q, sc, []).state, 'blank');
        // The log up to the first step that earns points, then nothing:
        // some points, not all (unless the problem has a single step).
        const run = new ProblemRun(q.item);
        const first = [];
        for (const e of log) {
          if (run.score().got > 0) break;
          run.apply(e);
          first.push(e);
        }
        const part = scoreQuestion(q, sc, JSON.parse(JSON.stringify(first)));
        assert.ok(part.points > 0, `${q.item.key}: no point for the first step`);
        if (q.item.points.flat().length > 1) {
          assert.ok(part.points < q.max, `${q.item.key}: ${part.points} / ${q.max}`);
          assert.equal(part.state, 'partial');
        }
      }
    }
  }
  // cms-controle: 5 points per problem, the run's score scaled to them.
  const exam = buildExam(EXAM_BY_ID['cms-controle'], { rng: makeRng(8), now: 0 });
  assert.ok(exam.questions.every((q) => q.max === 5));
});

// Step U6: Analyse II, 18 multiple choice (+3/0/−1) and 10 true/false
// (+1/0/−1) in 144 minutes; a « Vrai / Faux » multiple choice becomes a tf.
test('ba2-analyse2: a complete Analyse II exam, marked', () => {
  const BA2 = EXAM_BY_ID['ba2-analyse2'];
  for (const seed of [4, 5, 6]) {
    const exam = buildExam(BA2, { rng: makeRng(seed), now: 0 });
    assert.equal(exam.questions.filter((q) => q.kind === 'mcq').length, 18);
    assert.equal(exam.questions.filter((q) => q.kind === 'tf').length, 10);
    assert.ok(exam.questions.every((q) => q.skill.startsWith('a2-')));
    assert.equal(maxScore(exam), 64);
    const all = scoreExam(exam, exam.questions.map(right), profile());
    assert.equal(all.score, 64);
    assert.equal(all.grade, 6);
    const none = scoreExam(exam, exam.questions.map(wrong), profile());
    assert.equal(none.score, -28);
    assert.equal(none.grade, 1);
  }
  assert.equal(BA2.durationMin, 144);
});

// Step U7: the two exams of module P. ba3-proba (MATH-234): 6 short
// calculations, 4 multiple choice, 2 problems of 8 to 15 points; ba4-stat
// (EE-209): 20 multiple choice +3/0/−1 and 10 true/false +1/0/−1. Every
// question answered with its reference earns all its points.
test('ba3-proba and ba4-stat produce complete exams, marked right with the references', () => {
  const answer = (q) => {
    if (q.kind === 'mcq') return q.item.options.findIndex((o) => o.correct);
    if (q.kind === 'tf') return q.item.truth;
    if (q.kind === 'coef') return q.item.type === 'lines' ? q.item.script.filter((l) => l.kind === 'eq').at(-1).math : q.item.expected;
    return referenceLog(q.item);
  };
  for (const id of ['ba3-proba', 'ba4-stat']) {
    const bp = EXAM_BY_ID[id];
    for (const seed of [1, 2]) {
      const exam = buildExam(bp, { rng: makeRng(seed), now: 0 });
      assert.equal(exam.questions.length, bp.sections.reduce((s, x) => s + x.count, 0), id);
      for (const q of exam.questions) {
        assert.ok(!q.item.stub, `${q.skill} is built`);
        assert.ok(['proba', 'combi'].includes(SKILL_BY_ID[q.skill].unit), q.skill);
        if (q.kind === 'open') assert.ok(q.item.type === 'problem' && q.item.total >= 8 && q.item.total <= 15, `${q.item.key}: ${q.item.total} points`);
        const r = scoreQuestion(q, bp.sections[q.section].scoring, answer(q));
        assert.equal(r.state, 'right', `${id} ${q.kind} ${q.item.key}`);
      }
    }
  }
  const stat = EXAM_BY_ID['ba4-stat'];
  assert.deepEqual(stat.sections.map((s) => [s.kind, s.count, s.scoring.right, s.scoring.wrong]), [['mcq', 20, 3, -1], ['tf', 10, 1, -1]]);
  // EE-209 draws only its own skills; MATH-234 its own, and G7.
  assert.ok(stat.sections.every((s) => s.pool.skills.every((sk) => SKILL_BY_ID[sk].tags.includes('EE-209'))));
  assert.ok(EXAM_BY_ID['ba3-proba'].sections.every((s) => s.pool.skills.every((sk) => SKILL_BY_ID[sk].unit === 'combi' || SKILL_BY_ID[sk].tags.includes('MATH-234'))));
  assert.deepEqual(examsForUnit('proba').map((e) => e.id), ['ba3-proba', 'ba4-stat']);
});

// Step U10: Analyse III (V and C: single-answer multiple choice +2/0, open
// problems of 3 to 14 points) and Analyse IV (F, and C in the multiple
// choice: several answers +1/N, −1/M, floor 0; three open problems of 3 to
// 12 points). Every question answered with its reference earns all its
// points; a multiple-answer question with one wrong box ticked does not.
test('ba3-analyse3 and ba4-analyse4 produce complete exams, marked right with the references', () => {
  const answer = (q) => {
    if (q.kind === 'mcq' && q.item.multi) return q.item.options.map((o, i) => (o.correct ? i : -1)).filter((i) => i >= 0);
    if (q.kind === 'mcq') return q.item.options.findIndex((o) => o.correct);
    return referenceLog(q.item);
  };
  const units = { 'ba3-analyse3': ['vecto', 'cplx'], 'ba4-analyse4': ['fourier', 'cplx'] };
  for (const id of ['ba3-analyse3', 'ba4-analyse4']) {
    const bp = EXAM_BY_ID[id];
    for (const seed of [1, 2, 3]) {
      const exam = buildExam(bp, { rng: makeRng(seed), now: 0 });
      assert.equal(exam.questions.length, bp.sections.reduce((s, x) => s + x.count, 0), id);
      let max = 0;
      let got = 0;
      for (const q of exam.questions) {
        const section = bp.sections[q.section];
        assert.ok(!q.item.stub, `${q.skill} is built`);
        assert.ok(units[id].includes(SKILL_BY_ID[q.skill].unit), `${id}: ${q.skill}`);
        if (q.kind === 'mcq') assert.equal(!!q.item.multi, !!section.multi, `${q.item.key}: multi`);
        if (q.kind === 'open') {
          const [lo, hi] = section.pool.points;
          assert.ok(q.item.type === 'problem' && q.item.total >= lo && q.item.total <= hi, `${q.item.key}: ${q.item.total} points`);
          if (id === 'ba4-analyse4') assert.equal(SKILL_BY_ID[q.skill].unit, 'fourier');
        }
        const r = scoreQuestion(q, section.scoring, answer(q));
        assert.equal(r.state, 'right', `${id} ${q.kind} ${q.item.key}`);
        max += q.max;
        got += r.points;
        if (q.kind === 'mcq' && q.item.multi) {
          const bad = q.item.options.findIndex((o) => !o.correct);
          if (bad >= 0) assert.ok(scoreQuestion(q, section.scoring, [...answer(q), bad]).points < r.points, `${q.item.key}: a wrong box costs`);
        }
      }
      assert.ok(Math.abs(got - max) < 1e-9, `${id}: ${got}/${max}`);
      assert.equal(gradeOf(got, max), 6);
    }
  }
  assert.deepEqual(EXAM_BY_ID['ba3-analyse3'].sections.map((s) => [s.kind, s.count, !!s.multi]), [['mcq', 10, false], ['open', 3, false]]);
  assert.deepEqual(EXAM_BY_ID['ba4-analyse4'].sections.map((s) => [s.kind, s.count, !!s.multi]), [['mcq', 10, true], ['open', 3, false]]);
  assert.deepEqual(examsForUnit('vecto').map((e) => e.id), ['ba3-analyse3']);
  assert.deepEqual(examsForUnit('fourier').map((e) => e.id), ['ba4-analyse4']);
});

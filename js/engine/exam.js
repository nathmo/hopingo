// Exam mode (spec §10.2, step U3): a mock exam built from a blueprint of
// js/content/uni/exams.js, answered against a timer without hints, then
// scored with the exam's own marks (negative ones included) and turned
// into a readiness report. Pure logic, no DOM: js/ui/screens/exam.js draws it.
//
// buildExam(blueprint, {rng, profile, now}) → exam
//   exam = {id, title, durationMin, documents, startedAt, endsAt,
//           sections: [{kind, count, scoring, multi}],
//           questions: [{n, section, kind, skill, item, max}]}
// scoreQuestion(question, scoring, response) → {state: 'right'|'wrong'|'blank'|'partial', points, rule}
//   responses: mcq → index of the option (or [indices] if multi); tf → true/false;
//   coef → the typed text; open → the log of the problem run (js/judges/
//   problem.js), replayed to score it step by step; null or undefined → blank.
// An open question is worth scoring.right points, the problem's score
// got/max scaled to them; with scoring.byStep it is worth the problem's own
// points (item.total) and scores what the run got.
// Section pools: the skills of pool.units and pool.extraSkills whose exam
// variants include the section's kind; pool.skills, if given, keeps only
// those; pool.points: [min, max] bounds the points of an open problem.
// scoreExam(exam, responses, profile) → result {score, max, pct, grade,
//   verdict, perSkill, traps, toWork, prediction, questions}
// gradeOf(score, max) = 1 + 5·max(0, score)/max, rounded to the quarter.
// verdictOf(grade): 'ready' (≥ 4.5), 'almost' (≥ 4), 'notyet'.
// startRun / answerRun / finishRun keep a run in profile.examRun (it
// survives a reload); finishRun records each answer with recordAnswer
// (kind 'exam': mastery is updated, not the level) and keeps the history
// in profile.exams.

import { SKILLS, SKILL_BY_ID } from '../content/skills.js';
import { generate } from '../content/generators.js';
import { EXAM_BY_ID } from '../content/uni/exams.js';
import { recordAnswer } from './learner.js';
import { judgeFor, readWith } from '../judges/index.js';
import { now as clock } from './time.js';
import { ProblemRun } from '../judges/problem.js';
import { t } from '../i18n.js';

// « Vrai » / « Faux » options, in French or in the interface's language.
const isVrai = (s) => /^\s*Vrai\s*$/.test(s) || String(s).trim() === t('Vrai');
const isFaux = (s) => /^\s*Faux\s*$/.test(s) || String(s).trim() === t('Faux');
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// The « Vrai ou faux ? » that opens the prompt of such an item.
const TF_HEAD = new RegExp(`^\\s*(?:Vrai ou faux\\s*\\?|${escapeRe(t('Vrai ou faux ?'))})\\s*(?:<br\\s*\\/?>)?\\s*`);

// ---------- the pool of a section ----------

// Skills that can give an item of this kind, with their weight.
export function sectionPool(section) {
  const units = new Set(section.pool?.units || []);
  const extra = new Set(section.pool?.extraSkills || []);
  const only = section.pool?.skills ? new Set(section.pool.skills) : null;
  return SKILLS
    .filter((s) => (units.has(s.unit) || extra.has(s.id)) && (!only || only.has(s.id)) && (s.exam || []).includes(section.kind))
    .map((s) => ({ id: s.id, weight: s.examWeight ?? 1 }))
    .filter((s) => s.weight > 0);
}

// The blueprints whose pools draw from this unit.
export function examsForUnit(unitId, exams = Object.values(EXAM_BY_ID)) {
  return exams.filter((e) => e.sections.some((s) => (s.pool?.units || []).includes(unitId)));
}

// Weighted draw of `count` skills, never the same skill twice in a row
// (avoid: the skill just before), each skill at most ⌈count·w/W⌉ + 1 times.
function drawSkills(pool, count, rng, avoid = null) {
  const total = pool.reduce((s, p) => s + p.weight, 0);
  const cap = Object.fromEntries(pool.map((p) => [p.id, Math.ceil((count * p.weight) / total) + 1]));
  const used = {};
  const out = [];
  let last = avoid;
  for (let k = 0; k < count; k++) {
    const cands = pool.filter((p) => p.id !== last && (used[p.id] || 0) < cap[p.id]);
    const list = cands.length ? cands : pool.filter((p) => p.id !== last).length ? pool.filter((p) => p.id !== last) : pool;
    const w = list.reduce((s, p) => s + p.weight, 0);
    let x = rng.next() * w;
    let pick = list[list.length - 1];
    for (const p of list) { x -= p.weight; if (x <= 0) { pick = p; break; } }
    out.push(pick.id);
    used[pick.id] = (used[pick.id] || 0) + 1;
    last = pick.id;
  }
  return out;
}

// The points of a problem: its total, else the sum of its steps.
const problemTotal = (item) => item.total ?? (item.points || []).flat().reduce((s, x) => s + x, 0);

function maxOf(section, item) {
  if (section.kind === 'open' && section.scoring.byStep) return problemTotal(item);
  return section.multi ? 1 : section.scoring.right;
}

// Some true/false variants of steps U1–U4 are multiple choice « Vrai » /
// « Faux » with the statement in the prompt: a tf item for the exam.
function asTf(item) {
  const [v, f] = item.options;
  const prompt = item.prompt || '';
  const rest = TF_HEAD.test(prompt) ? prompt.replace(TF_HEAD, '') : '';
  return {
    ...item, type: 'tf', prompt: t('Vrai ou faux ?'), statement: rest || item.prompt,
    truth: !!v.correct, ruleIfTrue: v.rule ?? null, ruleIfFalse: f.rule ?? null, options: undefined,
  };
}
const isVfMcq = (item) => item.type === 'mcq' && item.options?.length === 2 && isVrai(item.options[0].html) && isFaux(item.options[1].html);

// An open question must be a problem, within pool.points if given.
function fits(section, item) {
  if (section.kind !== 'open') return true;
  if (item.type !== 'problem') return false;
  const [lo, hi] = section.pool?.points || [0, Infinity];
  const t = problemTotal(item);
  return t >= lo && t <= hi;
}

export function buildExam(blueprint, { rng, profile = null, now = clock() } = {}) {
  const bp = typeof blueprint === 'string' ? EXAM_BY_ID[blueprint] : blueprint;
  const questions = [];
  let last = null;
  bp.sections.forEach((section, si) => {
    const pool = sectionPool(section);
    if (!pool.length) throw new Error(`Examen ${bp.id} : aucune compétence pour la section ${section.kind}.`);
    for (const skill of drawSkills(pool, section.count, rng, last)) {
      let item = null;
      // A generator that fails (or a problem of the wrong size) gives its
      // place to another skill of the pool.
      for (let t = 0; t < 8 && !item; t++) {
        const id = t === 0 ? skill : pool[Math.floor(rng.next() * pool.length)].id;
        try {
          // Step U10: a multiple-answer section asks for multi items (opts.multi).
          let it = generate(id, 4, rng, profile, section.multi ? { exam: section.kind, multi: true } : { exam: section.kind });
          if (section.kind === 'tf' && it && isVfMcq(it)) it = asTf(it);
          // Step U9: in a section of multiple-answer questions, a question with one
          // right answer is marked the same way (+1/N, −1/M with N = 1).
          if (section.multi && it && it.type === 'mcq' && !it.multi) it = { ...it, multi: true };
          const multiOk = section.kind !== 'mcq' || !!it?.multi === !!section.multi;
          if (it && !it.stub && it.exam?.format === section.kind && fits(section, it) && multiOk) item = it;
        } catch { item = null; }
      }
      if (!item) throw new Error(`Examen ${bp.id} : impossible de produire une question ${section.kind}.`);
      questions.push({ n: questions.length + 1, section: si, kind: section.kind, skill: item.skill, item, max: maxOf(section, item) });
      last = item.skill;
    }
  });
  return {
    id: bp.id, title: bp.title, durationMin: bp.durationMin, documents: bp.documents,
    startedAt: now, endsAt: now + bp.durationMin * 60 * 1000,
    sections: bp.sections.map((s) => ({ kind: s.kind, count: s.count, scoring: s.scoring, multi: !!s.multi })),
    questions,
  };
}

// Step U6: a true/false written as a two-option « Vrai / Faux » multiple
// choice (no checker fits its counter-example, as in A2) becomes a `tf`
// question of the exam: only the choice is marked there.
export function vfAsTf(item) {
  const v = item.options?.find((o) => isVrai(o.html));
  const f = item.options?.find((o) => isFaux(o.html));
  if (!v || !f || item.options.length !== 2) return item;
  return {
    ...item, type: 'tf', prompt: t('Vrai ou faux ?'),
    statement: String(item.prompt).replace(TF_HEAD, ''),
    truth: !!v.correct, decided: false, counter: null,
    ruleIfTrue: v.correct ? null : v.rule ?? null, ruleIfFalse: f.correct ? null : f.rule ?? null,
    explanation: item.solution?.map((x) => x.html).join(' ') || '',
  };
}

// ---------- marks ----------

const frac = (t, N) => {
  // '1/N', '-1/M' with N and M given.
  const m = /^(-?\d+)\/([A-Z]|\d+)$/.exec(String(t).trim());
  if (!m) return Number(t);
  const d = /\d/.test(m[2]) ? Number(m[2]) : N;
  return Number(m[1]) / d;
};

export function scoreQuestion(question, scoring, response) {
  const it = question.item;
  const blank = response === null || response === undefined || response === '' || (Array.isArray(response) && !response.length);
  if (blank) return { state: 'blank', points: scoring.blank ?? 0, rule: null };
  if (question.kind === 'mcq' && it.multi) {
    const rights = it.options.map((o, i) => (o.correct ? i : -1)).filter((i) => i >= 0);
    const N = rights.length;
    const M = it.options.length - N;
    const chosen = new Set(response);
    const good = [...chosen].filter((i) => rights.includes(i)).length;
    const bad = chosen.size - good;
    const raw = good * frac(scoring.perRight ?? '1/N', N) + bad * frac(scoring.perWrong ?? '-1/M', M);
    const points = Math.max(scoring.floor ?? 0, raw);
    const exact = bad === 0 && good === N;
    const rule = [...chosen].map((i) => it.options[i]).find((o) => !o.correct && o.rule)?.rule ?? null;
    return { state: exact ? 'right' : good > 0 && points > 0 ? 'partial' : 'wrong', points, rule };
  }
  if (question.kind === 'mcq') {
    const o = it.options[response];
    if (!o) return { state: 'blank', points: scoring.blank ?? 0, rule: null };
    return o.correct ? { state: 'right', points: scoring.right, rule: null } : { state: 'wrong', points: scoring.wrong, rule: o.rule ?? null };
  }
  if (question.kind === 'tf') {
    if (response === it.truth) return { state: 'right', points: scoring.right, rule: null };
    return { state: 'wrong', points: scoring.wrong, rule: (response ? it.ruleIfTrue : it.ruleIfFalse) ?? null };
  }
  if (question.kind === 'coef' && it.type === 'lines') {
    // The value typed for the coefficient, judged by the item's own judge.
    let done = false;
    try {
      const cfg = it.judge;
      done = judgeFor(cfg).judgeLine(cfg, readWith(cfg, it.start.math), String(response), {}).kind === 'done';
    } catch { done = false; }
    return done ? { state: 'right', points: scoring.right, rule: null } : { state: 'wrong', points: scoring.wrong, rule: null };
  }
  if (question.kind === 'open' && it.type === 'problem' && Array.isArray(response)) {
    // The run replayed from its log: the points of the steps done right.
    let sc;
    let rule = null;
    try {
      const run = new ProblemRun(it, response);
      sc = run.score();
      rule = run.rules[0] ?? null;
    } catch {
      sc = { got: 0, max: problemTotal(it) };
    }
    const points = scoring.byStep ? sc.got : sc.max > 0 ? Math.round((4 * question.max * sc.got) / sc.max) / 4 : 0;
    const state = sc.max > 0 && sc.got >= sc.max ? 'right' : sc.got > 0 ? 'partial' : 'wrong';
    return { state, points, rule };
  }
  return { state: 'wrong', points: 0, rule: null };
}

export const maxScore = (exam) => exam.questions.reduce((s, q) => s + q.max, 0);

// 1 + 5·max(0, score)/max, rounded to the quarter, between 1 and 6.
export function gradeOf(score, max) {
  if (!(max > 0)) return 1;
  const raw = 1 + (5 * Math.max(0, score)) / max;
  return Math.min(6, Math.max(1, Math.round(raw * 4) / 4));
}

export function verdictOf(grade) {
  if (grade >= 4.5) return { id: 'ready', label: t('Prêt') };
  if (grade >= 4) return { id: 'almost', label: t('Presque') };
  return { id: 'notyet', label: t('Pas encore') };
}

// The probability of mastery of a skill (BKT), 0 for a skill never seen.
const pOf = (profile, id) => profile?.skills?.[id]?.p ?? 0;

export function scoreExam(exam, responses = [], profile = null) {
  const perSkill = {};
  const traps = [];
  let score = 0;
  let predicted = 0;
  const questions = exam.questions.map((q, i) => {
    const scoring = exam.sections[q.section].scoring;
    const r = scoreQuestion(q, scoring, responses[i]);
    score += r.points;
    // Prediction (§10.2): Σ probability of mastery × points of the question.
    predicted += pOf(profile, q.skill) * q.max;
    const s = (perSkill[q.skill] ||= { right: 0, wrong: 0, blank: 0, partial: 0, points: 0, max: 0 });
    s[r.state] += 1;
    s.points += r.points;
    s.max += q.max;
    if (r.rule) traps.push({ n: q.n, skill: q.skill, rule: r.rule });
    return { n: q.n, skill: q.skill, kind: q.kind, ...r };
  });
  const max = maxScore(exam);
  const grade = gradeOf(score, max);
  const order = new Map(SKILLS.map((s, i) => [s.id, i]));
  // Skills to work on: any wrong or blank answer, in prerequisite order.
  const toWork = Object.entries(perSkill)
    .filter(([, s]) => s.wrong + s.blank + s.partial > 0)
    .map(([id]) => id)
    .sort((a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0));
  const prediction = { score: Math.round(predicted * 4) / 4, grade: gradeOf(predicted, max) };
  return {
    score, max, pct: max ? Math.round((100 * Math.max(0, score)) / max) : 0, grade, verdict: verdictOf(grade),
    perSkill, traps, toWork, questions, prediction,
    // A grade predicted one point or more above the real one: mastery overestimated.
    overestimated: prediction.grade - grade >= 1,
  };
}

// ---------- a run kept in the profile ----------

export function startRun(profile, blueprint, { rng, now = clock() } = {}) {
  const exam = buildExam(blueprint, { rng, profile, now });
  profile.examRun = { exam, responses: Array(exam.questions.length).fill(null), flags: Array(exam.questions.length).fill(false), times: Array(exam.questions.length).fill(0) };
  return profile.examRun;
}

export function answerRun(profile, i, response) {
  const run = profile.examRun;
  if (!run) return;
  run.responses[i] = response;
}

export const timeLeft = (run, now = clock()) => Math.max(0, run.exam.endsAt - now);

// Score the run, record each answer (BKT only: kind 'exam'), keep the
// history, and close the run. Returns {result, events}.
export function finishRun(profile, now = clock()) {
  const run = profile.examRun;
  if (!run) return null;
  const { exam } = run;
  const result = scoreExam(exam, run.responses, profile);
  // The prediction is taken before the answers update the mastery.
  const events = [];
  exam.questions.forEach((q, i) => {
    if (!SKILL_BY_ID[q.skill]) return;
    const r = result.questions[i];
    events.push(...recordAnswer(profile, {
      skill: q.skill, level: q.item.level ?? 4, correct: r.state === 'right', kind: 'exam',
      rtSec: (run.times?.[i] ?? 0) / 1000 || q.item.expectedSec || 60, expectedSec: q.item.expectedSec || 60,
      rules: r.rule ? [r.rule] : [], ambiguous: 1, baits: q.item.baits || [], hintsUsed: 0,
    }));
  });
  const perSkill = Object.fromEntries(Object.entries(result.perSkill).map(([id, s]) => [id, { right: s.right, wrong: s.wrong, blank: s.blank }]));
  (profile.exams ||= []).push({ id: exam.id, at: now, score: result.score, max: result.max, grade: result.grade, perSkill, predicted: result.prediction.grade });
  profile.lastExam = { exam, responses: run.responses, result };
  delete profile.examRun;
  return { result, events };
}

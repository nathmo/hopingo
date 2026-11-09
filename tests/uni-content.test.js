// University content (spec §13): every university skill, levels 1 to 5 and
// each exam variant it declares, 40 items each. The reference solution
// passes its own judge line by line and ends with `done`; a typical wrong
// line is refused; baits exist; a multiple choice has one right option
// unless marked « plusieurs »; a false true/false statement has a
// counter-example its checker accepts; tokens, blocks and tables replay
// their reference answer; the skill graph stays sound.
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
import { actionsFor } from '../js/judges/actions.js';
import { JUDGES, readWith } from '../js/judges/index.js';
import { checkCounter, judgeTf } from '../js/judges/examples.js';
import { judgeTokens } from '../js/judges/logic.js';
import { checkBlocks, placeBlock } from '../js/judges/blocks.js';
import { checkTable } from '../js/judges/iter.js';
import { parse } from '../js/cas/parse.js';
import { expandDerivs } from '../js/cas/diff.js';
import { pretty } from '../js/cas/normal.js';
import { solutionSet, contains01, isSetNode } from '../js/cas/sets.js';
import { toText } from '../js/cas/print.js';
import { parse as parseSchool, evaluate } from '../js/math/expr.js';

const UNI = UNI_SKILLS.map((s) => s.id);

// A line every judge must refuse, built from the last line of the first part.
function wrongLine(cfg, final) {
  if (cfg.kind === 'logic') return `¬(${final})`;
  if (cfg.kind === 'solset') {
    const S = solutionSet(parse(final, parseOpts(cfg)), cfg);
    // A number the judge looks at (inside the domain or the window of a
    // periodic cfg) and outside the set.
    const W = solutionSet(parse('ℝ'), cfg);
    const val = (x) => (x.includes('/') ? Number(x.split('/')[0]) / Number(x.split('/')[1]) : Number(x));
    const CANDS = ['1000', '-1000', '1/7', '-55', '7/3', '-5/2', '11/9', '4', '-4', '3', '1', '-1', '5/2', '7/2', '9/2', '11/2', '6', '0'];
    const out = CANDS.find((x) => !contains01(S, val(x)) && contains01(W, val(x)));
    const inside = CANDS.find((x) => contains01(S, val(x)));
    // Written from the final line itself (its set may hold numbers that
    // only print as long decimals).
    const v = cfg.v || 'x';
    const asSet = isSetNode(parse(final, parseOpts(cfg)), cfg);
    if (!out) return asSet ? `(${final})∖{${inside ?? 0}}` : `(${final})∧${v}≠${inside ?? 0}`;
    return asSet ? `(${final})∪{${out}}` : `(${final})∨${v}=${out}`;
  }
  return `${final}+1`;
}

function checkLinesItem(it, where) {
  const r = checkScript(it);
  assert.ok(r.ok, `${where}: reference solution ${JSON.stringify(r.log)}`);
  const segs = segmentsOf(it);
  // Guided blanks are readable and not empty.
  for (const seg of segs) {
    const opts = parseOpts(seg.judge);
    for (const l of seg.lines.filter((x) => x.kind === 'eq' && x.blanks?.length)) {
      assert.ok(parse(templateOf(l, opts), opts), `${where}: template`);
      assert.ok(blankAnswers(l, opts).every((a) => a.length > 0), `${where}: empty blank`);
    }
    for (const l of seg.lines.filter((x) => x.kind === 'decision')) {
      assert.ok(l.options.some((o) => o.valid), `${where}: a decision needs a valid option`);
      for (const o of l.options) if (o.rule) assert.ok(RULE_BY_ID[o.rule], `${where}: decision rule ${o.rule}`);
    }
  }
  // In the « choose the action » mode, each reference line has a valid action.
  if (it.mode === 'tap' && it.tapActions) {
    for (const seg of segs) {
      let prev = seg.start.math;
      for (const l of seg.lines.filter((x) => x.kind === 'eq')) {
        const menu = actionsFor(it.tapActions, readWith(seg.judge, prev), seg.judge);
        if (menu.length) assert.ok(menu.some((o) => o.valid), `${where}: no valid action before ${l.math}`);
        prev = l.math;
      }
    }
  }
  // A typical wrong line is refused, and the traps' answers are named.
  const start = readWith(it.judge, it.start.math);
  const final = segs[0].lines.filter((l) => l.kind === 'eq').at(-1).math;
  const w = wrongLine(it.judge, final);
  assert.equal(new LinesRun(it).submit(w).kind, 'wrong', `${where}: ${w} accepted`);
  const finish = it.judge.kind === 'equiv' ? (n) => pretty(expandDerivs(n)) : (n) => n;
  for (const trap of trapAnswers(it.judge.kind, start, it.judge, finish).slice(0, 4)) {
    const v = new LinesRun(it).submit(trap.node);
    if (v.kind === 'wrong') assert.ok(v.rule, `${where}: trap ${trap.rule} not diagnosed`);
  }
  // Hints: none without help, three otherwise.
  if (it.noHints) assert.equal(it.hints.length, 0, where);
  else assert.equal(it.hints.length, 3, `${where}: three hints`);
  // Sub-goals credit real skills, or skills of modules still to build.
  for (const sg of it.subgoals) assert.ok(SKILL_BY_ID[sg.skill] || UNBUILT[sg.skill], `${where}: sub-goal ${sg.skill}`);
}

function checkItem(it, where) {
  for (const b of it.baits || []) assert.ok(RULE_BY_ID[b], `${where}: unknown bait ${b}`);
  if (!it.noHints && it.type !== 'mcq' && it.type !== 'answer') assert.equal(it.hints?.length, 3, `${where}: three hints`);
  switch (it.type) {
    case 'lines': checkLinesItem(it, where); break;
    case 'mcq':
      if (!it.multi) assert.equal(it.options.filter((o) => o.correct).length, 1, `${where}: one right option`);
      assert.equal(new Set(it.options.map((o) => o.html)).size, it.options.length, `${where}: duplicate options`);
      assert.ok(it.options.length >= 2, where);
      break;
    case 'tf':
      assert.ok(it.statement && typeof it.truth === 'boolean', where);
      assert.equal(judgeTf(it, !it.truth).correct, false, `${where}: the wrong choice is refused`);
      if (!it.truth) {
        assert.ok(it.counter, `${where}: a false statement needs a counter-example`);
        const r = checkCounter(it.counter, it.counter.answer);
        assert.ok(r.ok, `${where}: counter-example refused: ${r.message}`);
        assert.equal(judgeTf(it, false, it.counter.answer).correct, true, where);
      } else assert.equal(judgeTf(it, true).correct, true, where);
      if (it.decided) assert.equal(it.truth, false, where);
      break;
    case 'tokens': {
      const r = judgeTokens(it, it.answer);
      assert.equal(r.kind, 'done', `${where}: reference formula ${r.kind} ${r.message ?? ''}`);
      assert.equal(judgeTokens(it, `¬(${it.answer})`).kind, 'wrong', `${where}: the negation is refused`);
      for (const p of it.palette) assert.ok(it.judge.pieces.some((x) => x.text === p || x.neg === p) || (it.judge.letters || []).includes(p), `${where}: piece ${p}`);
      break;
    }
    case 'blocks': {
      const r = checkBlocks(it);
      assert.ok(r.ok, `${where}: reference proof ${JSON.stringify(r)}`);
      for (const b of it.blocks.filter((x) => x.distractor)) {
        const v = placeBlock(it, [], b.id);
        assert.equal(v.kind, 'wrong', where);
        assert.equal(v.rule, b.distractor, where);
      }
      if (it.decision) assert.ok(it.decision.options.some((o) => o.valid), where);
      break;
    }
    case 'table': {
      const r = checkTable(it, it.answers);
      assert.ok(r.ok, `${where}: reference table ${JSON.stringify(r.cells)}`);
      // One wrong cell is seen.
      const row = it.table.rows.find((x) => x.cells.some((c) => c?.input));
      const j = row.cells.findIndex((c) => c?.input);
      const bad = { ...it.answers, [row.id]: it.answers[row.id].map((x, k) => (k === j ? (row.cells[j].kind === 'tf' ? (x === 'V' ? 'F' : 'V') : row.cells[j].kind === 'sign' ? (x === '+' ? '−' : '+') : `${x}+1`) : x)) };
      assert.equal(checkTable(it, bad).ok, false, `${where}: a wrong cell is accepted`);
      if (it.then) checkItem(it.then, `${where} (puis)`);
      break;
    }
    case 'answer':
      assert.ok(evaluate(parseSchool(it.expected)), where);
      break;
    default: assert.fail(`${where}: type ${it.type}`);
  }
}

// Items per level: 40, fewer (never under 15) for skills whose lines are
// all judged by the numeric scan of sets.js.
const COUNT = { 'g2-exp-eq': 25, 'g2-ineq': 25 };

test('every university skill: 5 levels and exam variants, 40 items each', () => {
  const rng = makeRng(17);
  for (const id of UNI) {
    const s = SKILL_BY_ID[id];
    let fallbacks = 0;
    let total = 0;
    const runs = [...[1, 2, 3, 4, 5].map((level) => ({ level })), ...(s.exam || []).map((exam) => ({ level: 4, exam }))];
    for (const { level, exam } of runs) {
      const modes = new Set();
      for (let i = 0; i < (COUNT[id] ?? 40); i++) {
        const it = generate(id, level, rng, null, exam ? { exam } : undefined);
        const where = `${id} L${level}${exam ? ` ${exam}` : ''}: ${it.key}`;
        total++;
        if (it.fallback) fallbacks++;
        assert.equal(it.skill, id, where);
        assert.ok(it.prompt && it.key && it.expectedSec > 0, where);
        if (exam) assert.equal(it.exam?.format, exam, where);
        if (it.type === 'lines') modes.add(it.mode);
        checkItem(it, where);
      }
      // The scale of §8.3 for lines items; the catalogue's own scale for
      // skills without calculation lines.
      if (!exam && modes.size) {
        const want = { 1: 'guided', 2: 'guided', 3: 'tap', 4: 'free', 5: 'free' }[level];
        assert.ok(modes.has(want), `${id} L${level}: mode ${want} (${[...modes]})`);
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

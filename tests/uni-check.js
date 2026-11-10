// Checks shared by the university content tests (spec §13): for each skill,
// levels 1 to 5 and each exam variant it declares, 40 items (fewer for the
// skills listed in COUNT, never under 15). The reference solution passes
// its own judge line by line and ends with `done`; a typical wrong line is
// refused; baits exist; a multiple choice has one right option unless
// marked « plusieurs »; a false true/false statement has a counter-example
// its checker accepts; tokens, blocks and tables replay their reference
// answer. One test file per unit (tests/uni-<unit>.test.js) calls
// checkSkills, so that node --test runs the units in parallel.
import assert from 'node:assert/strict';
import { SKILL_BY_ID } from '../js/content/skills.js';
import { UNI_SKILLS, UNBUILT } from '../js/content/uni/index.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { RULE_BY_ID } from '../js/math/malrules.js';
import { LinesRun, checkScript, segmentsOf, templateOf, blankAnswers } from '../js/judges/lines.js';
import { parseOpts } from '../js/judges/common.js';
import { trapAnswers } from '../js/judges/diagnose.js';
import { actionsFor } from '../js/judges/actions.js';
import { readWith } from '../js/judges/index.js';
import { checkCounter, judgeTf } from '../js/judges/examples.js';
import { judgeTokens } from '../js/judges/logic.js';
import { checkBlocks, placeBlock } from '../js/judges/blocks.js';
import { checkTable } from '../js/judges/iter.js';
import { checkProblem, ProblemRun, pendingOf, resumeRun } from '../js/judges/problem.js';
import { parse } from '../js/cas/parse.js';
import { mapNode, lit } from '../js/cas/ast.js';
import { paramSamples } from '../js/judges/solset.js';
import { expandDerivs } from '../js/cas/diff.js';
import { pretty } from '../js/cas/normal.js';
import { solutionSet, contains01, isSetNode } from '../js/cas/sets.js';
import { toText } from '../js/cas/print.js';
import { parse as parseSchool, evaluate } from '../js/math/expr.js';
import { judgeMatrixItem } from '../js/judges/matrix-item.js';
import { reference as spanRef, familyOf, sameSpan } from '../js/judges/span.js';
import { valueText, vecOf, Mx, isZeroScalar } from '../js/cas/matexpr.js';


export const UNI = UNI_SKILLS.map((s) => s.id);
export const skillsOf = (unit) => UNI_SKILLS.filter((s) => s.unit === unit).map((s) => s.id);

// Step U5: judges with their own line language (tests/uni-check-geo.js).
import { JUDGES } from '../js/judges/index.js';
import { GEO_JUDGES, wrongGeo, checkOwnTemplate, checkPlotItem } from './uni-check-geo.js';
// Step U6: the judges of module A2 (tests/uni-check-a2.js).
import { A2_JUDGES, wrongA2, checkDomainItem } from './uni-check-a2.js';
// Step U9: items `code` and `readtable` (tests/uni-check-num.js).
import { checkCode, checkReadtable } from './uni-check-num.js';

// Step U3: the first number of a matrix or a vector, plus one.
const MATRIX_JUDGES = ['rowops', 'mat', 'eigvec', 'span', 'factor'];
function perturb(text) {
  const colon = text.lastIndexOf(':');
  const head = colon >= 0 ? text.slice(0, colon + 1) : '';
  const body = colon >= 0 ? text.slice(colon + 1) : text;
  const out = body.replace(/(\[\[\s*|\(\s*|=\s*)(-?\d+)/, (m, a, n) => `${a}${Number(n) + 1}`);
  return out === body ? `${text}+1` : head + out;
}

// A family that spans another space (judge span): a vector outside W
// replaces the first one; with W = ℝⁿ, one vector is dropped.
function wrongSpanLine(cfg, final) {
  const ref = spanRef(cfg);
  const fam = familyOf(readWith(cfg, final).value, cfg);
  const n = ref.n;
  const e = (k) => vecOf(Array.from({ length: n }, (_, i) => lit(i === k ? 1 : 0)));
  const out = [...Array(n).keys()].map(e).find((v) => !sameSpan([...ref.basis, v], ref.basis));
  const vecs = fam.vecs;
  if (cfg.affine) {
    const shift = out ?? e(0);
    const p = vecOf(fam.p.rows.map((r, i) => ({ t: 'bin', op: '+', l: r[0], r: shift.rows[i][0] })));
    if (!out) return valueText(p);
    return `${valueText(p)}${vecs.map((v, i) => `+${['t', 's', 'r', 'u'][i]}${valueText(v)}`).join('')}`;
  }
  if (!out) return vecs.length > 1 ? vecs.slice(1).map(valueText).join(', ') : valueText(e(0));
  return [out, ...vecs.slice(1)].map(valueText).join(', ');
}

// A line every judge must refuse, built from the last line of the first part.
function wrongLine(cfg, final) {
  if (GEO_JUDGES.includes(cfg.kind)) return wrongGeo(cfg, final); // step U5
  if (A2_JUDGES.includes(cfg.kind)) return wrongA2(cfg, final); // step U6
  if (cfg.kind === 'eigvec') return `(${final.replace(/^.*=\s*/, '').replace(/[()]/g, '').split(';').map(() => '0').join(' ; ')})`;
  if (cfg.kind === 'span') return wrongSpanLine(cfg, final);
  if (cfg.kind === 'rowops' && cfg.track === 'det' && !/det|\[/.test(final)) return `${final}+1`;
  if (MATRIX_JUDGES.includes(cfg.kind)) return perturb(final);
  if (cfg.kind === 'logic') return `¬(${final})`;
  // A bound (equiv with rel): a constant far below or above.
  if (cfg.rel) return cfg.rel === '≥' ? `${final}+1000` : `${final}-1000`;
  if (cfg.kind === 'solset' && cfg.params) {
    // Parameters in the bounds: the line written for the first sample of m.
    const env = paramSamples(cfg)[0];
    const n = mapNode(parse(final, parseOpts(cfg)), (x) => (x.t === 'sym' && !x.sub && env[x.name] ? { t: 'paren', e: lit(env[x.name]) } : x));
    return wrongLine({ ...cfg, params: undefined }, toText(n));
  }
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
  // A primitive plus 1 is still a primitive (step U2): add x instead.
  if (cfg.kind === 'antideriv') return `${final}+${cfg.v || 'x'}`;
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
      if (JUDGES[seg.judge.kind].templateML) { checkOwnTemplate(seg.judge, l, where); continue; } // step U5
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
    // Step U3: a single grid answer, and an example to give.
    case 'matrix': {
      const r = judgeMatrixItem(it, it.answer);
      assert.ok(r.correct, `${where}: reference answer ${r.verdict?.kind} ${r.verdict?.message ?? ''}`);
      const bad = it.judge.kind === 'eigvec' ? wrongLine(it.judge, it.answer) : perturb(it.answer);
      assert.equal(judgeMatrixItem(it, bad).correct, false, `${where}: ${bad} accepted`);
      break;
    }
    case 'plot': checkPlotItem(it, where); break; // step U5
    case 'domain': checkDomainItem(it, where); break; // step U6
    case 'example': {
      const r = checkCounter(it.property, it.answer);
      assert.ok(r.ok, `${where}: reference example refused: ${r.message}`);
      break;
    }
    case 'problem': checkProblemItem(it, where); break;
    case 'code': checkCode(it, where, checkItem); break; // step U9
    case 'readtable': checkReadtable(it, where, checkItem); break; // step U9
    default: assert.fail(`${where}: type ${it.type}`);
  }
}

// A problem (step U4): each part is a sound item, the points fit the steps,
// the reference earns every point, and a run saved halfway (JSON, as in
// profile.pending) and resumed ends the same way.
function checkProblemItem(it, where) {
  assert.ok(it.parts.length >= 1 && it.points.length === it.parts.length, `${where}: parts and points`);
  assert.ok(it.noHints && it.hints.length === 0 && it.resumable, `${where}: a problem has no hints`);
  it.parts.forEach((p, i) => {
    const steps = p.type === 'lines' ? segmentsOf(p).length : 1;
    assert.equal(it.points[i].length, steps, `${where}: points of part ${i + 1}`);
    checkItem(p, `${where} (partie ${i + 1})`);
  });
  const r = checkProblem(it);
  assert.ok(r.ok, `${where}: reference play ${JSON.stringify(r.score ?? r.why)}`);
  const half = Math.floor(r.log.length / 2);
  const run = new ProblemRun(it);
  for (const e of r.log.slice(0, half)) run.apply(e);
  const saved = JSON.parse(JSON.stringify(pendingOf(run)));
  const back = resumeRun(saved);
  for (const e of r.log.slice(half)) back.apply(e);
  assert.ok(back.done && back.score().got === back.score().max, `${where}: resumed run`);
}

// Items per level: 40, fewer (never under 15) for skills whose lines are
// all judged by the numeric scan of sets.js.
const COUNT = { 'g2-exp-eq': 25, 'g2-ineq': 25, 'g1-abs-ineq': 20, 'g1-irr-ineq': 25 };

// counts (step U2): items per level for some skills of one test file,
// never under 20 (heavy skills whose lines need quadrature or series).
export function checkSkills(ids, seed = 17, counts = {}) {
  const rng = makeRng(seed);
  for (const id of ids) {
    const s = SKILL_BY_ID[id];
    let fallbacks = 0;
    let total = 0;
    const runs = [...[1, 2, 3, 4, 5].map((level) => ({ level })), ...(s.exam || []).map((exam) => ({ level: 4, exam }))];
    for (const { level, exam } of runs) {
      const modes = new Set();
      for (let i = 0; i < (counts[id] ?? COUNT[id] ?? 40); i++) {
        const it = generate(id, level, rng, null, exam ? { exam } : undefined);
        const where = `${id} L${level}${exam ? ` ${exam}` : ''}: ${it.key}`;
        total++;
        if (it.fallback) fallbacks++;
        assert.equal(it.skill, id, where);
        assert.ok(!it.stub, `${id}: not built yet`);
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
}

// The 6-step problem: the judge (js/physics/recipe.js) on every template,
// with the reference work and typical mistakes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TEMPLATES, TEMPLATE_BY_ID, drawProblem, situationsOf } from '../js/content/physique/problems.js';
import {
  step1Targets, judgePick, judgeStep1, judgeSI, judgeRemove, expectedRoles, judgeStep2,
  judgeAlgebraLine, dimOfExpr, judgeUnitLine, judgeUnitVerdict, judgeEstimateLine, judgeEstimate,
  valueOf, judgeVerdict, minEnds,
} from '../js/physics/recipe.js';
import { parse } from '../js/physics/expr.js';
import { formatDim, dimEq } from '../js/physics/units.js';
import { estimateOf, GEN, mutate } from '../js/content/physique/recette.js';
import { generate } from '../js/content/generators.js';
import { RULE_BY_ID } from '../js/math/malrules.js';
import { makeRng } from '../js/content/random.js';
import { typed } from '../js/content/physique/format.js';
import { checkPhys } from '../js/physics/checker.js';

test('the reference work passes every step, on every case', () => {
  const rng = makeRng(5);
  for (const tp of TEMPLATES) {
    tp.cases.forEach((cs, i) => {
      const pb = drawProblem(tp, rng, { level: 5, caseIndex: i, nonSI: true });
      const where = `${tp.id}#${i}`;
      // 1: the targets are accepted, and step 1 passes with them.
      const targets = step1Targets(pb);
      for (const f of targets) assert.ok(judgePick(pb, f).ok, `${where} pick ${f}`);
      assert.ok(judgeStep1(pb, targets).ok, where);
      for (const d of pb.data) assert.ok(judgeSI(d, typed(d.si, 6)).ok, `${where} SI ${d.sym}: ${typed(d.si, 6)}`);
      // 2: formulas of the path cannot be removed; decoys can.
      for (const f of pb.formulas) assert.ok(!judgeRemove(pb, f).ok, `${where} remove ${f}`);
      const marks = Object.fromEntries(Object.entries(expectedRoles(pb)).filter(([, r]) => r !== 'libre'));
      assert.ok(judgeStep2(pb, [...pb.formulas], marks).ok, `${where} step 2: ${judgeStep2(pb, [...pb.formulas], marks).message}`);
      if (pb.bridges.length) {
        const wrong = { ...marks, [pb.bridges[0]]: 'connue' };
        assert.equal(judgeStep2(pb, [...pb.formulas], wrong).rule, 'ph_bridge_missed', where);
      }
      const decoy = pb.sheet.find((f) => !f.path && targets.includes(f.src));
      if (decoy) assert.ok(!judgeStep2(pb, [...pb.formulas, decoy.src], marks).ok, `${where} decoy kept`);
      // 3: the reference lines, the last one final.
      const sits = situationsOf(pb);
      pb.lines.forEach((l, k) => {
        const r = judgeAlgebraLine(pb, sits, l);
        assert.ok(r.kind === 'ok' || r.kind === 'final', `${where} line ${l}: ${r.kind} ${r.message}`);
        if (k === pb.lines.length - 1) assert.equal(r.kind, 'final', `${where} ${l}`);
      });
      const expr = parse(pb.ref, pb.symbols).sides[1];
      // 4: the units of the expression, and the verdict.
      const dim = dimOfExpr(pb, expr);
      assert.ok(dim.d, where);
      assert.equal(judgeUnitLine(dim.d, formatDim(dim.d)).kind, 'ok', `${where} unit ${formatDim(dim.d)}`);
      assert.ok(judgeUnitVerdict(pb, dim.d, true).ok, where);
      // A broken expression: its units betray it (or it is not even a sum of like units).
      const betrayed = (n) => { const x = dimOfExpr(pb, n); return !x.d || !dimEq(x.d, dim.d); };
      const bad = mutate(expr, rng, betrayed);
      const badDim = dimOfExpr(pb, bad.node);
      if (badDim.d && bad.rule && betrayed(bad.node)) assert.ok(!judgeUnitVerdict(pb, badDim.d, true).ok, `${where}: ${bad.rule} not caught by units`);
      // 5 and 6: the estimate of the correction is coherent with the value.
      const v = valueOf(pb, expr);
      const est = Number(estimateOf(pb, expr).toPrecision(1));
      assert.ok(judgeEstimate(est, v).ok, `${where}: estimate ${est} vs ${v}`);
      assert.ok(judgeVerdict(v, est, true).ok, where);
      assert.equal(judgeVerdict(v, est * 100, true).rule, 'ph_verdict_ignored', where);
      assert.equal(checkPhys({ value: pb.answerValue, minSig: 2 }, typed(pb.answerValue, 3)).kind, 'done', `${where} answer ${typed(pb.answerValue, 3)}`);
    });
  }
});

test('typical mistakes are named', () => {
  const rng = makeRng(8);
  const luge = drawProblem(TEMPLATE_BY_ID.luge, rng, { level: 2, caseIndex: 0 });
  const sits = situationsOf(luge);
  assert.equal(judgeAlgebraLine(luge, sits, 'v = 2 g h').rule, 'ph_forget_sqrt');
  assert.equal(judgeAlgebraLine(luge, sits, 'v = 10 h').kind, 'numbers');
  assert.equal(judgeAlgebraLine(luge, sits, 'm g h = m v^2').rule, null);
  assert.equal(judgeAlgebraLine(luge, sits, 'v = √(2 g h m/m)').kind, 'final');
  const patate = drawProblem(TEMPLATE_BY_ID.patate, rng, { level: 2, caseIndex: 0 });
  const ps = situationsOf(patate);
  assert.equal(judgeAlgebraLine(patate, ps, 'h = g/(c ΔT)').rule, 'ph_iso_flip');
  assert.equal(judgeAlgebraLine(patate, ps, 'h = m c ΔT/(m g)').rule, 'ph_not_simplified');
  // A decoy tapped at step 1, a needed formula removed at step 2.
  const lonely = luge.sheet.find((f) => f.src === 'P = U I');
  assert.equal(judgePick(luge, lonely.src).rule, 'ph_decoy_formula');
  assert.equal(judgeRemove(luge, 'E = m g h').rule, 'ph_needed_removed');
  // Step 1 conversions.
  assert.equal(judgeSI({ sym: 'v', shown: 72, unit: 'km/h', si: 20 }, '72').rule, 'ph_kmh_not_converted');
  assert.equal(judgeSI({ sym: 'v', shown: 72, unit: 'km/h', si: 20 }, '259,2').rule, 'speed_factor_wrong_way');
  assert.equal(judgeSI({ sym: 'm', shown: 450, unit: 'g', si: 0.45 }, '450').rule, 'ph_gram_as_kg');
  // Step 5: too precise, then off by 10.
  assert.equal(judgeEstimateLine('3500×80/1,6').kind, 'ok');
  assert.equal(judgeEstimateLine('3517×80').kind, 'precise');
  assert.equal(judgeEstimate(2e4, 1.75e5).rule, 'ph_estimate_power10');
  // Ranges: under the bar, the largest value gives the smallest result.
  const tp = TEMPLATE_BY_ID.charrue;
  const ch = drawProblem(tp, rng, { level: 2, caseIndex: 0 });
  const ends = minEnds(ch, parse('F d/t', ch.symbols), ['F', 'd', 't']);
  assert.deepEqual(ends, { F: -1, d: -1, t: 1 });
});

test('recipe items: every skill, every level', () => {
  const rng = makeRng(13);
  for (const skill of Object.keys(GEN)) {
    for (let level = 1; level <= 5; level++) {
      for (let i = 0; i < 15; i++) {
        const it = generate(skill, level, rng);
        assert.equal(it.type, 'recipe');
        assert.ok(it.prompt && !it.prompt.includes('{'), `${skill}: ${it.prompt}`);
        for (const b of it.baits) assert.ok(RULE_BY_ID[b], `${skill} unknown bait ${b}`);
        assert.ok(it.solution.length > 3, skill);
        if (it.shown) assert.ok(parse(it.shown.exprText, it.problem.symbols), skill);
      }
    }
  }
});

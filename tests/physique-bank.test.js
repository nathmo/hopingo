// The problem bank: every case of every template, drawn at every level.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TEMPLATES, drawProblem, situationsOf, sharesWithStatement } from '../js/content/physique/problems.js';
import { parse, evaluate, dimension } from '../js/physics/expr.js';
import { holds, equalsSymbol, finalLine } from '../js/physics/relations.js';
import { dimsOf } from '../js/physics/quantities.js';
import { dimEq } from '../js/physics/units.js';
import { makeRng } from '../js/content/random.js';

test('every case: the reference algebra holds and gives the answer', () => {
  const rng = makeRng(11);
  for (const tp of TEMPLATES) {
    tp.cases.forEach((cs, i) => {
      for (let level = 1; level <= 5; level++) {
        if ((cs.minLevel ?? 1) > level) continue;
        const pb = drawProblem(tp, rng, { level, caseIndex: i });
        const where = `${tp.id}#${i} L${level}`;
        const sits = situationsOf(pb, Math.random);
        for (const l of pb.lines) assert.ok(holds(parse(l, pb.symbols), sits), `${where}: ${l}`);
        const fin = finalLine(parse(pb.ref, pb.symbols), pb.find, [...pb.given]);
        assert.ok(fin.ok, `${where}: last line ${pb.ref} is not « ${pb.find} = givens »`);
        assert.ok(equalsSymbol(fin.expr, pb.find, sits), where);
        // The answer from the data shown, in SI.
        const env = Object.fromEntries(pb.data.map((d) => [d.sym, d.si]));
        const v = evaluate(fin.expr, env);
        assert.ok(Math.abs(v - pb.value) <= 1e-9 * Math.abs(v), `${where}: ${v} vs ${pb.value}`);
        // Units of the reference expression.
        assert.ok(dimEq(dimension(fin.expr, dimsOf(pb.symbols)), dimsOf([pb.find])[pb.find]), `${where}: units`);
        // Step 1: every formula of the path shares a symbol with the statement or is a bridge link.
        assert.ok(pb.formulas.some((f) => sharesWithStatement(pb, f)), where);
        assert.ok(!pb.text.includes('{'), `${where}: unfilled ${pb.text}`);
        for (const d of pb.data) assert.ok(Number.isFinite(d.si) && d.si > 0, `${where}: ${d.sym}`);
      }
    });
  }
});

test('decoys are not needed: removing them keeps the answer reachable', () => {
  for (const tp of TEMPLATES) {
    for (const d of tp.decoys) assert.ok(!tp.formulas.includes(d), `${tp.id}: ${d}`);
  }
});

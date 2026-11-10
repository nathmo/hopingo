// The engine of step U9 (module N): simulated p-digit arithmetic (fp.js)
// and the judge value {arith: 'fp'}; the new kinds of phi of the judge
// iter (a right row, a typical wrong row, convergence); the judge of the
// `code` items; the code traps (a trap's text typed in a hole is named).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fl, fpOp, fpEval, fpText, fpSqrt, lostDigits, machineEps, relErr } from '../js/cas/fp.js';
import { parse } from '../js/cas/parse.js';
import { JUDGES } from '../js/judges/index.js';
import { checkTable } from '../js/judges/iter.js';
import { referenceRows, fv, sameSig, autoCells } from '../js/judges/iter-num.js';
import { judgeCode, normalize, fill } from '../js/judges/code.js';
import { RULES } from '../js/cas/rules/n.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { Q } from '../js/math/rational.js';

test('fp.js: rounding to p significant digits, cancellation and absorption', () => {
  assert.equal(fl(31.6386, 4), 31.64);
  assert.equal(fl(31.635, 4), 31.64, 'half away from zero, on the decimal writing');
  assert.equal(fl(-0.0158113, 4), -0.01581);
  assert.equal(fl(999.96, 4), 1000);
  assert.equal(fpSqrt(1001, 4), 31.64);
  assert.equal(fpOp('-', 31.64, 31.62, 4), 0.02);
  // √1001 − √1000 at 4 digits: 0,02, wrong at the first digit (0,01581).
  const naive = fpEval(parse('√1001-√1000'), 4);
  const stable = fpEval(parse('1/(√1001+√1000)'), 4);
  assert.equal(naive, 0.02);
  assert.equal(stable, 0.01581);
  assert.ok(relErr(Math.sqrt(1001) - Math.sqrt(1000), naive) > 0.2);
  assert.ok(relErr(Math.sqrt(1001) - Math.sqrt(1000), stable) < 1e-3);
  // Absorption: 1000 + 0,4 = 1000 at 4 digits.
  assert.equal(fpOp('+', 1000, 0.4, 4), 1000);
  assert.equal(fpText(0.0158113, 4), '0,01581');
  assert.equal(fpText(-31.64, 4), '−31,64');
  assert.equal(lostDigits(31.64, 31.62), 3);
  assert.equal(machineEps(4), 5e-4);
  // In double precision, (1 + 1e-17) − 1 = 0.
  assert.equal((1 + 1e-17) - 1, 0);
});

test('judge value {arith: fp}: each line is the p-digit value of the previous one', () => {
  const J = JUDGES.value;
  const cfg = { kind: 'value', arith: 'fp', digits: 4 };
  const P = (t) => parse(t);
  assert.equal(J.judgeLine(cfg, P('√1001-√1000'), '31,64-31,62').kind, 'ok');
  assert.equal(J.judgeLine(cfg, P('31,64-31,62'), '0,02').kind, 'done');
  const w = J.judgeLine(cfg, P('√1001-√1000'), '0,01581');
  assert.equal(w.kind, 'wrong', 'the exact value is not the 4-digit computation');
  assert.match(w.message, /0,02/);
  assert.equal(J.judgeLine(cfg, P('1/(√1001+√1000)'), '1/63,26').kind, 'ok');
  assert.equal(J.judgeLine(cfg, P('1/63,26'), '0,01581').kind, 'done');
  assert.equal(J.judgeLine(cfg, P('1/63,26'), '0,015808').kind, 'stay', 'more digits than the arithmetic keeps');
  assert.equal(J.judgeLine({ ...cfg, expect: '√1001-√1000' }, P('a'), '0,02').kind, 'done');
});

// A table of one column of each kind, rows 1 … n − 1 to fill.
function table(phi, cols, n, given = (k) => k === 0) {
  const ref = referenceRows({ ...phi, cols: cols.map((c) => c.id) }, n);
  const rows = [];
  const answers = {};
  for (let k = 0; k < n; k++) {
    rows.push({ id: `r${k}`, cells: cols.map((c) => (ref[k][c.id] === undefined ? null : c.auto ? { auto: true } : given(k, c.id) ? { given: String(ref[k][c.id]) } : { input: true, ...(c.id === 'sign' ? { kind: 'sign' } : {}) })) });
    answers[`r${k}`] = cols.map((c) => {
      const v = ref[k][c.id];
      if (v === undefined) return null;
      if (c.id === 'sign') return fv(v) > 0 ? '+' : '−';
      return v instanceof Q ? String(v) : String(v);
    });
  }
  return { item: { type: 'table', judge: { kind: 'iter', phi: { ...phi, cols: cols.map((c) => c.id) } }, table: { cols: cols.map((c) => c.id), rows } }, answers, ref };
}
const setCell = (answers, row, j, v) => ({ ...answers, [row]: answers[row].map((x, k) => (k === j ? v : x)) });

test('iter phi scalar (fixed point, Newton): right row, wrong row, convergence, derived columns', () => {
  const { item, answers, ref } = table({ kind: 'scalar', phi: 'x-(x^2-2)/(2x)', x0: '1' }, [{ id: 'x' }, { id: 'inc' }, { id: 'r2' }], 4);
  assert.ok(checkTable(item, answers).ok);
  assert.equal(String(ref[3].x), '577/408');
  assert.equal(String(ref[3].r2), '6/17');
  const bad = checkTable(item, setCell(answers, 'r2', 0, '3/4'));
  assert.equal(bad.ok, false);
  assert.equal(bad.cells.r2[0], false);
  // Error carried forward: row 3 judged from the student's wrong row 2.
  const carried = setCell(setCell(answers, 'r2', 0, '3/2'), 'r3', 0, '17/12');
  assert.equal(checkTable(item, carried).cells.r3[0], true);
  // Derived cells at 2 significant digits.
  assert.equal(checkTable(item, setCell(answers, 'r3', 2, '0,35')).cells.r3[2], true);
  assert.ok(sameSig(0.35, 6 / 17, 2) && !sameSig(0.4, 6 / 17, 2));
  // Convergence: x_k → √2 quadratically.
  const far = referenceRows({ kind: 'scalar', phi: 'x-(x^2-2)/(2x)', x0: '1' }, 7);
  assert.ok(Math.abs(fv(far[6].x) - Math.SQRT2) < 1e-14);
  // Columns the app computes.
  const auto = table({ kind: 'scalar', phi: '2x/(1+x)', x0: '2' }, [{ id: 'x' }, { id: 'inc', auto: true }], 3);
  assert.deepEqual(autoCells(auto.item, auto.answers).r2, [null, '4/21']);
});

test('iter phi secant: two previous rows of the student, n_secant_update', () => {
  const { item, answers, ref } = table({ kind: 'secant', f: 'x^2-2', x0: '1', x1: '2' }, [{ id: 'x' }], 5, (k) => k <= 1);
  assert.deepEqual(ref.map((r) => String(r.x)).slice(0, 4), ['1', '2', '4/3', '7/5']);
  assert.ok(checkTable(item, answers).ok);
  // x0 kept instead of the last two points.
  const frozen = 4 / 3 - ((16 / 9 - 2) * (4 / 3 - 1)) / ((16 / 9 - 2) - (1 - 2)); // secant from x0 = 1 and x2 = 4/3
  const r = checkTable({ ...item, judge: { kind: 'iter', phi: { ...item.judge.phi, tol: 1e-9 } } }, setCell(answers, 'r3', 0, String(frozen)));
  assert.equal(r.ok, false);
  assert.equal(r.rule, 'n_secant_update');
  const far = referenceRows({ kind: 'secant', f: 'x^2-2', x0: '1', x1: '2' }, 9);
  assert.ok(Math.abs(fv(far[8].x) - Math.SQRT2) < 1e-12);
});

test('iter phi bisect: the half where f changes sign, n_bisect_wrong_half', () => {
  const { item, answers } = table({ kind: 'bisect', f: 'x^2-2', a0: '1', b0: '2' }, [{ id: 'a' }, { id: 'b' }, { id: 'x' }, { id: 'sign' }], 4, (k, id) => k === 0 && id !== 'sign');
  assert.ok(checkTable(item, answers).ok);
  assert.equal(answers.r0[3], '+');
  const wrong = setCell(setCell(answers, 'r1', 0, '3/2'), 'r1', 1, '2');
  const r = checkTable(item, wrong);
  assert.equal(r.ok, false);
  assert.equal(r.rule, 'n_bisect_wrong_half');
  const far = referenceRows({ kind: 'bisect', f: 'x^2-2', a0: '1', b0: '2' }, 30);
  assert.ok(Math.abs(fv(far[29].x) - Math.SQRT2) < 1e-8);
});

test('iter phi jacobi and gs: n_jacobi_uses_new, convergence', () => {
  const A = [['4', '-1', '0'], ['-1', '4', '-1'], ['0', '-1', '4']];
  const b = ['3', '2', '3'];
  const cols = [{ id: 'x1' }, { id: 'x2' }, { id: 'x3' }, { id: 'res', auto: true }];
  const J = table({ kind: 'jacobi', A, b, x0: ['0', '0', '0'] }, cols, 3);
  assert.deepEqual(J.answers.r2.slice(0, 3), ['7/8', '7/8', '7/8']);
  assert.ok(checkTable(J.item, J.answers).ok);
  const r = checkTable(J.item, { ...J.answers, r1: ['3/4', '11/16', '59/64', null] });
  assert.equal(r.ok, false);
  assert.equal(r.rule, 'n_jacobi_uses_new');
  const G = table({ kind: 'gs', A, b, x0: ['0', '0', '0'] }, cols, 2);
  assert.deepEqual(G.answers.r1.slice(0, 3), ['3/4', '11/16', '59/64']);
  assert.ok(checkTable(G.item, G.answers).ok);
  // Gauss-Seidel uses the student's own new components.
  assert.equal(checkTable(G.item, { ...G.answers, r1: ['1', '3/4', '15/16', null] }).cells.r1.slice(0, 3).join(), 'false,true,true');
  const far = referenceRows({ kind: 'gs', A, b, x0: ['0', '0', '0'] }, 25);
  assert.ok(far[24].res < 1e-10);
});

test('iter phi ode: EP, ER, CN, Heun, RK4; implicit taken for explicit, Heun without h', () => {
  const base = { kind: 'ode', f: '-2u', t0: '0', u0: '1', h: '1/10' };
  const EP = table({ ...base, scheme: 'EP' }, [{ id: 't' }, { id: 'u' }], 3);
  assert.deepEqual(EP.answers.r2, ['1/5', '16/25']);
  assert.ok(checkTable(EP.item, EP.answers).ok);
  const ER = table({ ...base, scheme: 'ER' }, [{ id: 't' }, { id: 'u' }], 2);
  assert.equal(ER.answers.r1[1], '5/6');
  const r = checkTable(ER.item, setCell(ER.answers, 'r1', 1, '4/5'));
  assert.equal(r.rule, 'n_implicit_as_explicit');
  const CN = table({ ...base, scheme: 'CN' }, [{ id: 't' }, { id: 'u' }], 2);
  assert.equal(CN.answers.r1[1], '9/11');
  const He = table({ ...base, scheme: 'Heun' }, [{ id: 't' }, { id: 'k1' }, { id: 'k2' }, { id: 'u' }], 2);
  assert.deepEqual(He.answers.r1, ['1/10', '-2', '-8/5', '41/50']);
  assert.ok(checkTable(He.item, He.answers).ok);
  const h = checkTable(He.item, setCell(He.answers, 'r1', 2, String(-2 * (1 - 2))));
  assert.equal(h.rule, 'n_heun_k2');
  // A non-linear f: ER solved by Newton.
  const nl = referenceRows({ kind: 'ode', scheme: 'ER', f: '-u^2', t0: '0', u0: '1', h: '1/10' }, 2);
  const u1 = fv(nl[1].u);
  assert.ok(Math.abs(u1 - 1 + 0.1 * u1 * u1) < 1e-12);
  // Convergence: RK4 at h = 0,1 on u' = −2u, error < 1e-5 at t = 1.
  const rk = referenceRows({ ...base, scheme: 'RK4' }, 11);
  assert.ok(Math.abs(fv(rk[10].u) - Math.exp(-2)) < 1e-5);
  // Stability: EP explodes for h > 2/|λ|, ER does not.
  const ep = referenceRows({ kind: 'ode', scheme: 'EP', f: '-50u', t0: '0', u0: '1', h: '1/20' }, 30);
  const er = referenceRows({ kind: 'ode', scheme: 'ER', f: '-50u', t0: '0', u0: '1', h: '1/20' }, 30);
  assert.ok(Math.abs(fv(ep[29].u)) > 1e3 && Math.abs(fv(er[29].u)) < 1e-6);
});

test('iter phi gradient: optimal step, n_gradient_sign, n_optimal_step_inverted', () => {
  const phi = { kind: 'gradient', A: [['2', '-1'], ['-1', '2']], b: ['1', '0'], x0: ['0', '0'], step: 'optimal' };
  const cols = ['x1', 'x2', 'r1', 'r2', 'alpha'].map((id) => ({ id }));
  const G = table(phi, cols, 3, (k, id) => k === 0 && id.startsWith('x'));
  assert.deepEqual(G.answers.r2, ['1/2', '1/4', '1/4', '0', '1/2']);
  assert.ok(checkTable(G.item, G.answers).ok);
  const s = checkTable(G.item, { ...G.answers, r1: ['-1/2', '0', '2', '-1/2', '1/2'] });
  assert.equal(s.rule, 'n_gradient_sign');
  const inv = checkTable(G.item, setCell(G.answers, 'r0', 4, '2'));
  assert.equal(inv.rule, 'n_optimal_step_inverted');
  const far = referenceRows(phi, 60);
  assert.ok(Math.abs(fv(far[59].x1) - 2 / 3) < 1e-12 && Math.abs(fv(far[59].x2) - 1 / 3) < 1e-12);
});

test('iter phi divdiff: a triangle judged from the student\'s cells, n_divdiff_denominator', () => {
  const phi = { kind: 'divdiff', xs: ['0', '1', '2', '3'], ys: ['12', '18', '6', '0'] };
  const cols = ['x', 'd0', 'd1', 'd2', 'd3'].map((id) => ({ id }));
  const D = table(phi, cols, 4, (k, id) => id === 'x' || id === 'd0');
  assert.deepEqual(D.answers.r3, ['3', '0', '-6', '3', '4']);
  assert.ok(checkTable(D.item, D.answers).ok);
  const r = checkTable(D.item, setCell(D.answers, 'r2', 3, '-18'));
  assert.equal(r.ok, false);
  assert.equal(r.rule, 'n_divdiff_denominator');
});

test('judge of code items: tests, holes, traps', () => {
  const item = {
    type: 'code', source: 'def f(x):\n    return ???\n\ndef g(x):\n    return ??? * 2\n',
    holes: [{ answer: 'x + 1', traps: [{ text: 'x - 1', rule: 'n_newton_sign' }] }, { answer: 'f(x)' }],
    prelude: '', tests: [{ expr: 'f(1)', expect: '2' }, { expr: 'g(3)', expect: '8' }],
  };
  assert.ok(judgeCode(item, ['x+1', '(f(x))']).ok);
  const t = judgeCode(item, ['( x - 1 )', 'f(x)']);
  assert.equal(t.ok, false);
  assert.equal(t.rule, 'n_newton_sign');
  assert.deepEqual(t.holes, [false, true]);
  const w = judgeCode(item, ['x + 1', 'x']);
  assert.deepEqual(w.holes, [true, false]);
  assert.match(w.message, /^Test 2 : g\(3\) donne 6, attendu 8$/);
  assert.equal(judgeCode(item, ['x +', 'f(x)']).ok, false);
  assert.match(judgeCode(item, ['x +', 'f(x)']).message, /syntaxe|incomplète/);
  assert.equal(judgeCode(item, ['', 'f(x)']).empty, true);
  assert.equal(normalize(' ( (a + b) ) '), 'a+b');
  assert.equal(normalize('(a)+(b)'), '(a)+(b)');
  assert.equal(fill('a ??? b ???', ['1', '2']), 'a 1 b 2');
});

// Each code trap of module N: its wrong text, typed in a hole of an item of
// its skill that knows it, is named by the judge (the example of §13).
test('code traps of module N are named when typed in their hole', () => {
  for (const r of RULES.filter((x) => x.code && !x.stub)) {
    const rng = makeRng(5);
    let found = false;
    for (let i = 0; i < 60 && !found; i++) {
      for (const level of r.code.levels || [1, 5]) {
        const it = generate(r.code.skill, level, rng);
        const items = [it, it.then].filter((x) => x?.type === 'code');
        for (const c of items) {
          const k = c.holes.findIndex((h) => [...(h.traps || []), ...(h.options || [])].some((t) => normalize(t.text) === normalize(r.code.text)));
          if (k < 0) continue;
          const ans = c.holes.map((h, j) => (j === k ? r.code.text : h.answer));
          const v = judgeCode(c, ans);
          assert.equal(v.ok, false, `${r.id}: ${r.code.text} passes`);
          assert.equal(v.rule, r.id, `${r.id}: named ${v.rule}`);
          found = true;
        }
      }
    }
    assert.ok(found, `${r.id}: no item of ${r.code.skill} has the hole « ${r.code.text} »`);
  }
});

// The criterion of step U9 (spec §14): every skill of module N has at
// least one item `code` or `readtable` (at some level, possibly after a
// table, a program or inside a problem).
test('U9 criterion: every skill of N has a code or a readtable item', async () => {
  const { UNI_SKILLS } = await import('../js/content/uni/index.js');
  const kinds = (it) => (!it ? [] : [it.type, ...kinds(it.then), ...kinds(it.question), ...(it.parts || []).flatMap(kinds)]);
  for (const s of UNI_SKILLS.filter((x) => x.unit === 'numerique')) {
    const rng = makeRng(11);
    const seen = new Set();
    for (let level = 1; level <= 5; level++) for (let i = 0; i < 8; i++) kinds(generate(s.id, level, rng)).forEach((k) => seen.add(k));
    assert.ok(seen.has('code') || seen.has('readtable'), `${s.id}: no code or readtable item (${[...seen]})`);
  }
});

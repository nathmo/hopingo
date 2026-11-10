// Judges of step U8 (module M): `odevec` (x′ = Ax and x_{k+1} = Ax_k with
// vector and matrix lines, e^(At)) and the power-method table (`iter`,
// phi 'power'). A right line is accepted, a typical wrong one refused, the
// final form recognised.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JUDGES, readWith } from '../js/judges/index.js';
import { checkTable } from '../js/judges/iter.js';
import { powerRows } from '../js/judges/iter-power.js';

const run = (cfg, lines) => {
  const st = {};
  let prev = readWith(cfg, cfg.start);
  return lines.map((l) => {
    const v = JUDGES.odevec.judgeLine(cfg, prev, l, st);
    if (v.kind !== 'wrong' && v.kind !== 'parse') prev = v.node;
    return v.kind;
  });
};

test('odevec: modes, constants from x(0), the solution', () => {
  const cfg = { kind: 'odevec', A: '[[0,1],[-6,-5]]', x0: '(1 ; 0)', want: 'solution', start: 'x(t)' };
  assert.deepEqual(run(cfg, [
    'x(t) = c_1e^(-2t)(1 ; -2) + c_2e^(-3t)(1 ; -3)',
    'c_1 = 3 ; c_2 = -2',
    'x(t) = 3e^(-2t)(1 ; -2) - 2e^(-3t)(1 ; -3)',
  ]), ['ok', 'ok', 'done']);
  assert.deepEqual(run(cfg, ['x(t) = c_1e^(-2t)(1 ; -2) + c_2e^(-3t)(1 ; -3)', 'c_1 = 1 ; c_2 = 0']), ['ok', 'wrong'], 'c = x(0)');
  assert.deepEqual(run(cfg, ['x(t) = 3e^(-2t)(1 ; -2) + 2e^(-3t)(1 ; -3)']), ['wrong'], 'x(0) wrong');
  assert.deepEqual(run(cfg, ['x(t) = c_1e^(2t)(1 ; -2) + c_2e^(-3t)(1 ; -3)']), ['wrong'], 'not a solution');
  assert.deepEqual(run(cfg, ['x(t) = c_1e^(-2t)(1 ; -2)']), ['wrong'], 'one constant');
  assert.deepEqual(run(cfg, ['x = (3e^(-2t)-2e^(-3t) ; -6e^(-2t)+6e^(-3t))']), ['done'], 'components written out');
  assert.equal(run(cfg, ['x = (1 ; ']).at(-1), 'parse');
  const gen = { kind: 'odevec', A: '[[0,1],[-6,-5]]', want: 'general', start: 'x(t)' };
  assert.deepEqual(run(gen, ['x(t) = c_1e^(-2t)(1 ; -2) + c_2e^(-3t)(1 ; -3)']), ['done']);
  // Complex eigenvalues −1 ± 2i: real modes.
  const osc = { kind: 'odevec', A: '[[-1,-2],[2,-1]]', want: 'general', start: 'x(t)' };
  assert.deepEqual(run(osc, ['x(t) = c_1e^(-t)(cos(2t) ; sin(2t)) + c_2e^(-t)(-sin(2t) ; cos(2t))']), ['done']);
});

test('odevec: e^(At) for a double eigenvalue (M(0) = I, M′ = AM)', () => {
  const cfg = { kind: 'odevec', A: '[[1,1],[-1,3]]', want: 'expm', names: { N: '[[-1,1],[-1,1]]' }, start: 'e^(At)' };
  assert.deepEqual(run(cfg, ['e^(At) = e^(2t)(I + tN)', 'e^(2t)·[[1-t, t],[-t,1+t]]']), ['ok', 'done']);
  assert.deepEqual(run(cfg, ['e^(2t)·I']), ['wrong'], 'the term tN forgotten');
  assert.deepEqual(run(cfg, ['[[e^t, e^t],[e^(-t), e^(3t)]]']), ['wrong'], 'entrywise');
  assert.equal(JUDGES.odevec.isFinal(cfg, readWith(cfg, 'e^(2t)(I + tN)')), false);
  // Diagonalisable: P·diag(e^(λt))·P⁻¹.
  const d = { kind: 'odevec', A: '[[0,1],[-6,-5]]', want: 'expm', names: { P: '[[1,1],[-2,-3]]' }, start: 'e^(At)' };
  assert.deepEqual(run(d, ['P·diag(e^(-2t), e^(-3t))·P^(-1)', '[[3e^(-2t)-2e^(-3t), e^(-2t)-e^(-3t)],[-6e^(-2t)+6e^(-3t), -2e^(-2t)+3e^(-3t)]]']), ['ok', 'done']);
});

test('odevec: discrete x_{k+1} = Ax_k', () => {
  const cfg = { kind: 'odevec', A: '[[5/4,-3/4],[3/2,-1]]', discrete: true, x0: '(1 ; 0)', want: 'solution', start: 'x_k' };
  assert.deepEqual(run(cfg, ['x_k = c_1(1/2)^k(1 ; 1) + c_2(-1/4)^k(1 ; 2)', 'c_1 = 2 ; c_2 = -1', 'x_k = 2(1/2)^k(1 ; 1) - (-1/4)^k(1 ; 2)']), ['ok', 'ok', 'done']);
  assert.deepEqual(run(cfg, ['x_k = 2e^(k/2)(1 ; 1) - e^(-k/4)(1 ; 2)']), ['wrong'], 'continuous modes');
});

test('power table: each cell from the student\'s cells, inverse power', () => {
  const phi = { kind: 'power', A: [['3', '1'], ['1', '3']], y0: ['1', '0'] };
  const rows = powerRows(phi, 4);
  assert.deepEqual(rows.map((r) => String(r.mu)), ['3', '10/3', '18/5', '34/9']);
  const text = (r) => [...r.y, ...r.z, r.mu].map(String);
  const item = { judge: { kind: 'iter', phi }, table: { rows: rows.map((r, k) => ({ id: `r${k}`, cells: text(r).map((x) => (k < 2 ? { given: x } : { input: true })) })) } };
  const vals = { r2: text(rows[2]), r3: text(rows[3]) };
  assert.equal(checkTable(item, vals).ok, true);
  assert.equal(checkTable(item, { ...vals, r2: vals.r2.map((x, j) => (j === 2 ? '4' : x)) }).ok, false);
  // Error carried forward: a wrong row 2 followed by a row 3 computed from it.
  const y2 = ['1', '1/2'];
  const z2 = ['7/2', '5/2'];
  const r3 = ['1', '5/7', '26/7', '22/7', '26/7'];
  const r = checkTable(item, { r2: [...y2, ...z2, '7/2'], r3 });
  assert.deepEqual(r.cells.r3, [true, true, true, true, true]);
  assert.equal(r.cells.r2[1], false);
  // Divided by the norm: named.
  const n = checkTable(item, { r2: ['5/√34', '3/√34', ...vals.r2.slice(2)], r3: vals.r3 });
  assert.match(n.message, /plus grand module/);
  // Inverse power with σ = 1 on [[6, 2], [2, 3]]: μ → 1, λ = 2.
  const inv = powerRows({ kind: 'power', A: [['6', '2'], ['2', '3']], y0: ['1', '0'], inverse: true, shift: '1' }, 12);
  assert.ok(Math.abs(inv.at(-1).mu.valueOf() - 1) < 1e-6);
});

// Physics core: units, expressions, situations (js/physics/).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseUnit, parseQuantity, dimEq, formatDim, toSI, fromSI, dimOf } from '../js/physics/units.js';
import { parse, evaluate, dimension, DimError, isolated, numbersIn } from '../js/physics/expr.js';
import { QUANTITIES } from '../js/physics/quantities.js';
import { formula, situations, holds, equalsSymbol, finalLine, solveFor } from '../js/physics/relations.js';

const near = (a, b, rel = 1e-9) => assert.ok(Math.abs(a - b) <= rel * Math.max(1, Math.abs(b)), `${a} ≠ ${b}`);

test('units: names, prefixes, conversions', () => {
  near(toSI(72, 'km/h'), 20);
  near(fromSI(15, 'km/h'), 54);
  near(toSI(1.5, 'h'), 5400);
  near(toSI(2500, 'cm^2'), 0.25);
  near(toSI(2500, 'cm²'), 0.25);
  near(toSI(0.4, 'L'), 4e-4);
  near(toSI(2, 'kWh'), 7.2e6);
  near(toSI(9, 'pouces^2'), 9 * 0.0254 ** 2);
  near(toSI(2, 'ha'), 2e4);
  near(toSI(1, 'mWh'), 3.6);
  near(toSI(10, 'Ah'), 36000);
  near(toSI(920, 'kg/m^3'), 920);
  near(fromSI(920, 'kg/L'), 0.92);
  assert.ok(dimEq(dimOf('J'), dimOf('kg·m^2/s^2')));
  assert.ok(dimEq(dimOf('W'), dimOf('J/s')));
  assert.ok(dimEq(dimOf('J/(kg·K)·K/(N/kg)'), dimOf('m')));
  assert.ok(dimEq(dimOf('N·m/N'), dimOf('m')));
  assert.equal(formatDim(dimOf('kg·m^2/s^3')), 'W');
  assert.equal(formatDim(dimOf('m/s^2')), 'm/s²');
  assert.equal(formatDim(dimOf('J/(kg·K)'), { named: false }), 'm²/(s²·K)');
  // Typed in SI: « m s » is m·s, not a millisecond.
  assert.ok(dimEq(parseUnit(['m', 's'], { prefixes: false }).d, dimOf('m·s')));
  assert.ok(dimEq(parseUnit(['kg', 'm'], { prefixes: false }).d, dimOf('kg·m')));
  near(parseQuantity('3,6·10^6 J').si, 3.6e6);
  near(parseQuantity('72 km/h').si, 20);
  near(parseQuantity('2 500 cm^2').si, 0.25);
});

test('every quantity has a valid SI unit', () => {
  for (const q of Object.values(QUANTITIES)) assert.ok(q.d.length === 7, q.sym);
});

const S = ['E', 'E_p', 'E_c', 'm', 'g', 'h', 'v', 'c', 'ΔT'];

test('expressions: reading, values, units', () => {
  const env = { m: 2, g: 10, h: 5, v: 3, c: 4200, ΔT: 80 };
  near(evaluate(parse('m g h', S), env), 100);
  near(evaluate(parse('mgh', S), env), 100);
  near(evaluate(parse('1/2 m v^2', S), env), 9);
  near(evaluate(parse('m v^2/2', S), env), 9);
  near(evaluate(parse('√(2 g h)', S), env), 10);
  near(evaluate(parse(['√(', '2', 'g', 'h', ')'], S), env), 10);
  near(evaluate(parse('c ΔT / g', S), env), 33600);
  near(evaluate(parse('c×ΔT÷g', S), env), 33600);
  const dims = Object.fromEntries(S.map((s) => [s, QUANTITIES[s].d]));
  assert.ok(dimEq(dimension(parse('c ΔT / g', S), dims), dimOf('m')));
  assert.ok(dimEq(dimension(parse('√(2 g h)', S), dims), dimOf('m/s')));
  assert.throws(() => dimension(parse('m + h', S), dims), DimError);
  assert.deepEqual(isolated(parse('h = c ΔT/g', S)).sym, 'h');
  assert.deepEqual(numbersIn(parse('1/2 m v^2', S)), [1, 2, 2]);
  assert.throws(() => parse('m g z', S));
});

test('situations: lines that hold, final line', () => {
  const F = ['E = m g h', 'E = 1/2 m v^2'].map((f) => formula(f, S));
  near(solveFor(F[1].node, 'v', { E: 9, m: 2 }), 3);
  const sits = situations(F, ['m', 'g', 'h'], Math.random);
  assert.ok(holds(parse('m g h = 1/2 m v^2', S), sits));
  assert.ok(holds(parse('g h = v^2/2', S), sits));
  assert.ok(holds(parse('v^2 = 2 g h', S), sits));
  assert.ok(!holds(parse('v^2 = g h', S), sits), 'forgot the 2');
  assert.ok(!holds(parse('v = 2 g h', S), sits), 'forgot the root');
  assert.ok(equalsSymbol(parse('√(2gh)', S), 'v', sits));
  const fin = finalLine(parse('v = √(2 g h)', S), 'v', ['g', 'h', 'm']);
  assert.ok(fin.ok);
  assert.ok(!finalLine(parse('v = √(2 E/m)', S), 'v', ['g', 'h', 'm']).ok);
});

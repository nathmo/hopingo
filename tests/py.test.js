// The Python interpreter (spec §12, §13, step U9): reference programs
// (Newton, Horner, tridiagonal LU, Simpson), the French error messages with
// their line, and the limits (operations, recursion, list size).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runProgram, runTests, sameValue, Interp } from '../js/py/index.js';
import { PRELUDE_VEC, PRELUDE_MAT } from '../js/content/uni/numerique-kit.js';
import { LIMIT_MESSAGE } from '../js/py/interp.js';

const run = (src, opts) => runProgram(src, opts);
const out = (src) => { const r = run(src); assert.ok(r.ok, r.error?.text); return r.output.join('\n'); };
const errorOf = (src, opts) => { const r = run(src, opts); assert.equal(r.ok, false, `no error for ${src}`); return r.error; };
const value = (src, expr, prelude = '') => { const it = new Interp(); if (prelude) it.run(prelude); it.run(src); return it.evalSource(expr); };

test('reference program: Newton', () => {
  const src = `def newton(f, df, x0, tol, nmax):
    x = x0
    for k in range(nmax):
        incr = f(x) / df(x)
        x = x - incr
        if abs(incr) < tol:
            return [x, k + 1]
    return [x, nmax]
`;
  const r = runTests({
    prelude: PRELUDE_VEC, source: src, tests: [
      { setup: 'def f(x): return x*x - 2\ndef df(x): return 2*x', expr: 'newton(f, df, 1.1, 1e-10, 100)', expect: '[1.4142135623730951, 5]', tol: 1e-12 },
      { setup: 'def f(x): return x**3 - 2\ndef df(x): return 3*x*x', expr: 'newton(f, df, 2.0, 1e-12, 100)', expect: '[1.2599210498948732, 6]', tol: 1e-12 },
    ],
  });
  assert.ok(r.ok, r.failed?.text);
  // A wrong program fails with the value obtained and the value expected.
  const bad = runTests({ prelude: PRELUDE_VEC, source: src.replace('x = x - incr', 'x = x + incr'), tests: [{ setup: 'def f(x): return x*x - 2\ndef df(x): return 2*x', expr: 'newton(f, df, 1.1, 1e-10, 20)', expect: '[1.4142135623730951, 5]' }] });
  assert.equal(bad.ok, false);
  assert.match(bad.failed.text, /^Test 1 : newton\(f, df, 1\.1, 1e-10, 20\) donne \[.*\], attendu \[1\.4142135623730951, 5\]$/);
});

test('reference program: Horner', () => {
  const src = `def horner(coeffs, a):
    # coeffs du plus haut degré au plus bas
    b = coeffs[0]
    for c in coeffs[1:]:
        b = b * a + c
    return b

def horner_quotient(coeffs, a):
    q = [coeffs[0]]
    for i in range(1, len(coeffs)):
        q.append(q[i - 1] * a + coeffs[i])
    return q
`;
  assert.equal(value(src, 'horner([2, -3, 0, 5], 2)'), 9n);
  assert.deepEqual(value(src, 'horner_quotient([1, -6, 11, -6], 1)'), [1n, -5n, 6n, 0n]);
  assert.equal(value(src, 'horner([1.0, 0.5], 2)'), 2.5);
});

test('reference program: tridiagonal LU (Thomas)', () => {
  const src = `def thomas(a, c, d, b):
    N = len(a)
    c[0] = c[0] / a[0]
    for i in range(1, N - 1):
        a[i] = a[i] - d[i - 1] * c[i - 1]
        c[i] = c[i] / a[i]
    a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    b[0] = b[0] / a[0]
    for i in range(N - 1):
        b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    for i in range(N - 2, -1, -1):
        b[i] = b[i] - c[i] * b[i + 1]
    return b
`;
  const r = runTests({
    prelude: PRELUDE_VEC, source: src, tests: [
      { expr: 'thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1])', expect: '[1, 1, 1]', tol: 1e-12 },
      { expr: 'thomas([3, 3], [-1], [-1], [2, 2])', expect: '[1, 1]', tol: 1e-12 },
      { expr: 'thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19])', expect: '[1, 2, 3, 4]', tol: 1e-12 },
    ],
  });
  assert.ok(r.ok, r.failed?.text);
  // c and d swapped: the non-symmetric test catches it.
  const swapped = src.replace('a[i] - d[i - 1] * c[i - 1]', 'a[i] - c[i - 1] * c[i - 1]');
  assert.equal(runTests({ prelude: PRELUDE_VEC, source: swapped, tests: [{ expr: 'thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19])', expect: '[1, 2, 3, 4]' }] }).ok, false);
});

test('reference program: Simpson, and the preludes', () => {
  const src = `def simpson(f, a, b, n):
    h = (b - a) / n
    s = 0.0
    for i in range(n):
        x0 = a + i * h
        x1 = x0 + h
        c = (x0 + x1) / 2
        s = s + h / 6 * (f(x0) + 4 * f(c) + f(x1))
    return s
`;
  const r = runTests({
    prelude: PRELUDE_VEC, source: src, tests: [
      { setup: 'def f(x): return x*x - 4*x + math.exp(x)', expr: 'simpson(f, 0, 5, 1000)', expect: '139.0798257692752', tol: 1e-12 },
      { setup: 'def g(x): return x**3', expr: 'simpson(g, 0, 2, 2)', expect: '4.0', tol: 1e-12 },
      { expr: 'simpson(math.sin, 0, math.pi, 10)', expect: 2.0000067844418012, tol: 1e-12 },
    ],
  });
  assert.ok(r.ok, r.failed?.text);
  // solve (PRELUDE_MAT) plays the role of A\b.
  assert.deepEqual(value('x = solve([[2, 1], [1, 3]], [3, 5])', '[round(x[0], 12), round(x[1], 12)]', PRELUDE_VEC + PRELUDE_MAT), [0.8, 1.4]);
});

test('the language of §12', () => {
  assert.equal(out('print(7 // 2, -7 // 2, 7 % 3, -7 % 3, 2 ** 10, 2 ** -1, 7 / 2)'), '3 -4 1 2 1024 0.5 3.5');
  assert.equal(out('print(1e-8, 2.0, 0.1 + 0.2, 1e16, 123.0)'), '1e-08 2.0 0.30000000000000004 1e+16 123.0');
  assert.equal(out('a, b = 1, 2\na, b = b, a\nprint(a, b)'), '2 1');
  assert.equal(out('x = [1, 2, 3, 4]\nprint(x[-1], x[1:3], x[::-1], len(x))'), '4 [2, 3] [4, 3, 2, 1] 4');
  assert.equal(out('s = 0\nfor i in range(10, 0, -2):\n    s += i\nprint(s)'), '30');
  assert.equal(out('print(1 < 2 < 3, 1 < 3 < 2, not 0, 0 or 5, 2 and 3)'), 'True False True 5 3');
  assert.equal(out('v = [0] * 3\nv[1] = 2\nprint(v, [0.0] * 2)'), '[0, 2, 0] [0.0, 0.0]');
  assert.equal(out('def f(g, x):\n    return g(x) + 1\ndef sq(t): return t * t\nprint(f(sq, 3))'), '10');
  assert.equal(out('i = 0\nwhile True:\n    i += 1\n    if i < 3:\n        continue\n    break\nprint(i)'), '3');
  assert.equal(out('from math import *\nprint(sqrt(16), floor(2.5), pi > 3)'), '4.0 2 True');
  assert.equal(out('A = [[1, 2], [3, 4]]\nA[1][0] = 9\nprint(A[1][0] + A[0][1], max(0.0, -1), min([3, 1, 2]), sum([1, 2, 3]), abs(-2.5))'), '11 0.0 1 6 2.5');
  assert.equal(out('x = 3\nif x > 5:\n    print("a")\nelif x > 2:\n    print("b")\nelse:\n    print("c")'), 'b');
  assert.equal(out('print(int(2.9), int(-2.9), float(3), round(2.5), round(3.14159, 2))'), '2 -2 3.0 2 3.14');
  assert.ok(sameValue([1.0, [2]], [1, [2.0000000001]], { tol: 1e-9 }));
  assert.ok(!sameValue([1.0, 2], [1, 2.1], { tol: 1e-9 }));
  assert.ok(sameValue(1e-13, 0, { atol: 1e-12 }));
});

test('French error messages, with their line', () => {
  let e = errorOf('x = 1\nprint(y)');
  assert.equal(e.text, 'ligne 2 : nom inconnu : y');
  e = errorOf('a = [1, 2]\nb = a[2]');
  assert.equal(e.line, 2);
  assert.match(e.message, /^indice hors de la liste/);
  e = errorOf('x = 0\ny = 1 / x');
  assert.equal(e.text, 'ligne 2 : division par zéro');
  e = errorOf('def f(x):\n    return x\n  y = 2');
  assert.equal(e.line, 3);
  assert.match(e.message, /^indentation/);
  e = errorOf('if True:\nprint(1)');
  assert.match(e.message, /^indentation/);
  assert.match(errorOf('x = (1 + 2').message, /parenthèse ou un crochet n'est pas fermé/);
  assert.match(errorOf('import numpy').message, /numpy n'est pas disponible/);
  assert.match(errorOf('import os').message, /seul le module math/);
  assert.match(errorOf('f = lambda x: x').message, /lambda/);
  assert.match(errorOf('v = [i for i in range(3)]').message, /compréhensions/);
  assert.match(errorOf('for i in range(2.5):\n    pass').message, /range demande des entiers/);
  assert.match(errorOf('x = [1, 2]\ny = x[0.0]').message, /indice doit être un entier/);
  assert.match(errorOf('print(sqrt(2))').message, /nom inconnu : sqrt \(écris math\.sqrt\)/);
  assert.match(errorOf('def f(x):\n    x = x + 1\ny = f(1) + 2').message, /None/);
  assert.match(errorOf('def f(a, b):\n    return a\nf(1)').message, /f\(\) demande 2 arguments, 1 donné/);
  assert.match(errorOf('import math\nx = math.sqrt(-1)').message, /hors du domaine/);
  assert.match(errorOf('x = [1] + 2').message, /liste \+ nombre/);
});

test('limits: operations, recursion, list size', () => {
  const e = errorOf('x = 0\nwhile x >= 0:\n    x = x + 1');
  assert.equal(e.kind, 'limit');
  assert.equal(e.message, LIMIT_MESSAGE);
  assert.equal(LIMIT_MESSAGE, 'Le programme ne s\'arrête pas (boucle infinie ?)');
  // A small budget stops a long loop too.
  assert.equal(errorOf('s = 0\nfor i in range(100000):\n    s += i', { maxSteps: 1000 }).kind, 'limit');
  assert.ok(run('s = 0\nfor i in range(1000):\n    s += i', { maxSteps: 200000 }).ok);
  assert.match(errorOf('def f(n):\n    return f(n + 1)\nf(0)').message, /trop d'appels imbriqués/);
  assert.match(errorOf('v = []\nfor i in range(20000):\n    v.append(i)').message, /liste trop longue/);
  assert.match(errorOf('v = [0] * 20000').message, /liste trop longue/);
  // A test that never ends is reported as such, with its expression.
  const r = runTests({ source: 'def f():\n    while True:\n        pass\n', tests: [{ expr: 'f()', expect: '0' }], maxSteps: 5000 });
  assert.equal(r.ok, false);
  assert.equal(r.failed.text, `Test 1 : f() — ${LIMIT_MESSAGE}`);
});

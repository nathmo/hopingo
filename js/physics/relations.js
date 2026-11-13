// Relations of a problem: its formulas, and the situations where they hold.
//
// A situation gives a value to every symbol so that every formula holds.
// It starts from values of the given symbols (and of the free ones, like
// a mass that cancels), then solves the formulas one by one: a formula with
// a single symbol left gets it by a numeric search. A line the student
// writes (« m g h = ½ m v² ») is right when it holds on several random
// situations: that checks algebra without asking for one written form.

import { parse, evaluate, symbolsIn, isolated, ExprError } from './expr.js';

export function formula(src, symbols) {
  const node = parse(src, symbols);
  if (node.t !== 'eq') throw new ExprError(`Pas une formule : ${src}`);
  return { src, node, syms: [...symbolsIn(node)] };
}

const side = (eq, env) => evaluate(eq.sides[0], env) - evaluate(eq.sides[1], env);

// The value of x for which the formula holds, positive first.
export function solveFor(eq, x, env) {
  const g = (v) => side(eq, { ...env, [x]: v });
  for (const sign of [1, -1]) {
    let prevV = null;
    let prevG = null;
    for (let e = -9; e <= 13; e += 0.05) {
      const v = sign * 10 ** e;
      const y = g(v);
      if (!Number.isFinite(y)) { prevV = null; continue; }
      if (y === 0) return v;
      if (prevV != null && Math.sign(y) !== Math.sign(prevG)) {
        let a = prevV;
        let b = v;
        let ga = prevG;
        for (let k = 0; k < 200; k++) {
          const m = (a + b) / 2;
          const gm = g(m);
          if (gm === 0 || Math.abs(b - a) <= 1e-15 * Math.abs(m)) return m;
          if (Math.sign(gm) === Math.sign(ga)) { a = m; ga = gm; } else b = m;
        }
        return (a + b) / 2;
      }
      prevV = v;
      prevG = y;
    }
  }
  throw new ExprError(`Impossible de trouver ${x} dans ${eq.sides.length}`);
}

// Every symbol of the formulas from the values in env.
export function solveAll(formulas, env) {
  const out = { ...env };
  let progress = true;
  while (progress) {
    progress = false;
    for (const f of formulas) {
      const miss = f.syms.filter((s) => !(s in out));
      if (miss.length === 1) {
        out[miss[0]] = solveFor(f.node, miss[0], out);
        progress = true;
      }
    }
  }
  return out;
}

// Random situations: the starting symbols get values between 0,3 and 3 (not
// the numbers of the question: a line that only fits them is not algebra).
export function situations(formulas, start, rng = Math.random, n = 4) {
  const out = [];
  for (let k = 0; k < n; k++) {
    const env = {};
    for (const s of start) env[s] = 0.3 + 2.7 * rng();
    out.push(solveAll(formulas, env));
  }
  return out;
}

const close = (a, b) => Math.abs(a - b) <= 1e-7 * Math.max(1, Math.abs(a), Math.abs(b));

// An equation holds on every situation (all its sides equal).
export function holds(node, sits) {
  if (node.t !== 'eq') return false;
  try {
    return sits.every((env) => {
      const vals = node.sides.map((s) => evaluate(s, env));
      return vals.every((v) => Number.isFinite(v) && close(v, vals[0]));
    });
  } catch { return false; }
}

// An expression has the value of `sym` on every situation.
export function equalsSymbol(expr, sym, sits) {
  try {
    return sits.every((env) => close(evaluate(expr, env), env[sym]));
  } catch { return false; }
}

// « h = c ΔT / g » with only given symbols on the right → {ok, expr}.
export function finalLine(node, unknown, allowed) {
  const iso = isolated(node);
  if (!iso || iso.sym !== unknown) return { ok: false, why: 'notIsolated' };
  const extra = [...symbolsIn(iso.expr)].filter((s) => !allowed.includes(s));
  return { ok: !extra.length, extra, expr: iso.expr, why: extra.length ? 'extra' : null };
}

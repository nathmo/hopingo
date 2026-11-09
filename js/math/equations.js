// Equations in one unknown: solution sets, line-by-line checking, the next
// move for hints, and the classic wrong moves (Kieran 1981: inverse
// operation, one side only, dividing one term only…).

import { Q } from './rational.js';
import { parseAlg, tryParseAlg, toRat, Poly, printAlg, varsIn } from './algebra.js';

const toNum = (q) => q.n / q.d;

// Real roots of a polynomial in x (degree ≤ 2 exactly, else none found).
function roots(p, x) {
  if (p.isZero) return { kind: 'all' };
  const d = p.degreeIn(x);
  const c = p.coeffs(x);
  if (d === 0) return { kind: 'none' };
  if (d === 1) return { kind: 'set', values: [c[1].neg().div(c[0])] };
  if (d === 2) {
    const [a, b, k] = c;
    const disc = b.mul(b).sub(a.mul(k).mul(4));
    if (disc.n < 0) return { kind: 'set', values: [] };
    const r = disc.sqrt();
    if (r) {
      const s1 = b.neg().sub(r).div(a.mul(2));
      const s2 = b.neg().add(r).div(a.mul(2));
      return { kind: 'set', values: s1.eq(s2) ? [s1] : [s1, s2] };
    }
    const sq = Math.sqrt(toNum(disc));
    return { kind: 'set', values: [(-toNum(b) - sq) / (2 * toNum(a)), (-toNum(b) + sq) / (2 * toNum(a))] };
  }
  throw new Error('degré trop grand');
}

const val = (v) => (v instanceof Q ? toNum(v) : v);

// The solution set of an equation in x: {kind: all|none|set, values}.
// Values that make a denominator zero are removed.
export function solutionSet(eqNode, x = 'x') {
  const diff = toRat({ t: 'bin', op: '-', l: eqNode.l, r: eqNode.r });
  const res = roots(diff.n, x);
  if (res.kind !== 'set') {
    if (res.kind === 'all' && !diff.d.isConst) {
      // Defined everywhere except where the denominator vanishes.
      return { kind: 'all', forbidden: roots(diff.d, x).values || [] };
    }
    return res;
  }
  const forbidden = diff.d.isConst ? [] : (roots(diff.d, x).values || []);
  const values = res.values.filter((v) => !forbidden.some((f) => Math.abs(val(f) - val(v)) < 1e-9));
  return { kind: 'set', values, removed: res.values.length - values.length };
}

export function sameSet(a, b) {
  if (a.kind !== b.kind) return false;
  if (a.kind !== 'set') return true;
  if (a.values.length !== b.values.length) return false;
  const xs = a.values.map(val).sort((p, q) => p - q);
  const ys = b.values.map(val).sort((p, q) => p - q);
  return xs.every((v, i) => Math.abs(v - ys[i]) < 1e-9);
}

// "x = 3", "3 = x", "x = −2/5": the unknown is isolated.
export function isolatedValue(eqNode, x = 'x') {
  const isX = (n) => n.t === 'var' && n.name === x;
  const isNum = (n) => !varsIn(n).size;
  if (isX(eqNode.l) && isNum(eqNode.r)) return eqNode.r;
  if (isX(eqNode.r) && isNum(eqNode.l)) return eqNode.l;
  return null;
}

// Linear form of each side: a·x + b (only when both sides are linear).
function linear(node, x) {
  const r = toRat(node);
  if (!r.d.isConst) return null;
  const p = r.n.scale(new Q(1).div(r.d.constValue()));
  if (p.degreeIn(x) > 1 || p.vars.some((v) => v !== x)) return null;
  const c = p.degreeIn(x) === 1 ? p.coeffs(x) : [new Q(0), p.constValue()];
  return { a: c[0], b: c[1] };
}

const fmt = (q) => {
  const s = q.n < 0 ? `−${-q.n}` : `${q.n}`;
  return q.d === 1 ? s : `${s}/${q.d}`;
};
const hasStructure = (n) => {
  // Brackets or fractions that still need expanding or clearing.
  let found = false;
  const walk = (m) => {
    if (!m || typeof m !== 'object') return;
    if (m.t === 'paren' || m.t === 'frac' || (m.t === 'bin' && m.op === '÷')) found = true;
    ['l', 'r', 'e', 'b', 'n', 'd'].forEach((k) => walk(m[k]));
  };
  walk(n);
  return found;
};

// The next move on a linear equation, as a short instruction.
export function nextMove(eqNode, x = 'x') {
  if (hasStructure(eqNode.l) || hasStructure(eqNode.r)) {
    const fracs = JSON.stringify(eqNode).includes('"t":"frac"');
    return fracs ? 'Multiplie les deux membres par le dénominateur commun, pour enlever les fractions.' : 'Développe d\'abord les parenthèses.';
  }
  const L = linear(eqNode.l, x);
  const R = linear(eqNode.r, x);
  if (!L || !R) return null;
  if (!R.a.eq(0)) return `${R.a.n > 0 ? 'Soustrais' : 'Ajoute'} ${fmt(R.a.n < 0 ? R.a.neg() : R.a)}x des deux côtés, pour rassembler les ${x} à gauche.`;
  if (!L.b.eq(0)) return `${L.b.n > 0 ? 'Soustrais' : 'Ajoute'} ${fmt(L.b.n < 0 ? L.b.neg() : L.b)} des deux côtés.`;
  if (!L.a.eq(1)) return `Divise les deux côtés par ${fmt(L.a)}.`;
  return null;
}

// Values a student gets with a classic wrong move on a·x + b = c·x + d.
export function wrongMoves(eqNode, x = 'x') {
  const L = linear(eqNode.l, x);
  const R = linear(eqNode.r, x);
  if (!L || !R) return [];
  const out = [];
  const add = (v, rule) => { if (v && Number.isFinite(val(v))) out.push({ value: val(v), rule }); };
  const { a, b } = L;
  const { a: c, b: d } = R;
  const k = a.sub(c);
  const safeDiv = (p, q) => (q.eq(0) ? null : p.div(q));
  // Moving a term without changing its sign: ax + b = d → ax = d + b.
  add(safeDiv(d.add(b), k), 'eq_move_no_sign');
  // Collecting x terms with the wrong sign: ax = cx + … → (a + c)x.
  if (!c.eq(0)) add(safeDiv(d.sub(b), a.add(c)), 'eq_move_no_sign');
  // Inverse operation wrong for the last step k·x = m: x = m − k, x = k/m, x = −m/k.
  const m = d.sub(b);
  if (!k.eq(1) && !k.eq(0)) {
    add(m.sub(k), 'eq_inverse_op');
    add(m.add(k), 'eq_inverse_op');
    add(safeDiv(k, m), 'eq_inverse_op');
    add(m.mul(k), 'eq_inverse_op');
    add(safeDiv(m.neg(), k), 'eq_change_side_sign_mult');
  }
  // Dividing only the x term: ax + b = d → x + b = d/a.
  if (!a.eq(1) && !a.eq(0) && c.eq(0)) add(safeDiv(d, a).sub(b), 'eq_divide_one_term');
  // One side only: subtracting b on the left but not on the right.
  if (!b.eq(0)) add(safeDiv(d.add(b).add(b), k), 'eq_one_side_only');
  return out;
}

// Judges one new line against the previous one.
// → {kind: parse|same|ok|done|wrong, message, rule, value}
export function judgeEquationLine(prevSrc, input, { x = 'x', original = prevSrc } = {}) {
  const node = tryParseAlg(input);
  if (!node) return { kind: 'parse', message: 'Je n\'arrive pas à lire cette ligne.' };
  if (node.t !== 'eq') return { kind: 'parse', message: 'Écris une équation complète, avec « = ».' };
  const prev = parseAlg(prevSrc);
  let target;
  let got;
  try {
    target = solutionSet(parseAlg(original), x);
    got = solutionSet(node, x);
  } catch {
    return { kind: 'parse', message: 'Cette équation est trop compliquée ici.' };
  }
  if (!sameSet(target, got)) {
    const v = got.kind === 'set' && got.values.length === 1 ? val(got.values[0]) : null;
    const move = v == null ? null : wrongMoves(prev, x).find((w) => Math.abs(w.value - v) < 1e-9);
    return { kind: 'wrong', rule: move?.rule ?? null };
  }
  if (printAlg(node) === printAlg(prev)) return { kind: 'same', message: 'C\'est la même ligne : fais une transformation.' };
  if (isolatedValue(node, x)) return { kind: 'done', node };
  return { kind: 'ok', node };
}

// Solving an equation completely, line by line, for worked solutions.
export function solveLines(src, x = 'x') {
  const lines = [];
  let cur = parseAlg(src);
  for (let i = 0; i < 6; i++) {
    const move = nextMove(cur, x);
    if (!move) break;
    const s = solutionSet(cur, x);
    if (s.kind !== 'set' || s.values.length !== 1 || !(s.values[0] instanceof Q)) break;
    // Next line in normal form a·x + b = c·x + d, after the move.
    const L = linear(cur.l, x);
    const R = linear(cur.r, x);
    let next;
    if (/Développe|Multiplie/.test(move)) {
      let A = L;
      let B = R;
      if (!A || !B) {
        const pl = toRat(cur.l);
        const pr = toRat(cur.r);
        if (!pl.d.isConst || !pr.d.isConst) break;
        A = linOf(pl.n.scale(new Q(1).div(pl.d.constValue())), x);
        B = linOf(pr.n.scale(new Q(1).div(pr.d.constValue())), x);
      }
      if (/Multiplie/.test(move)) {
        const m = [A.a, A.b, B.a, B.b].reduce((acc, q) => lcmInt(acc, q.d), 1);
        A = { a: A.a.mul(m), b: A.b.mul(m) };
        B = { a: B.a.mul(m), b: B.b.mul(m) };
      }
      next = `${lin(A)}=${lin(B)}`;
    } else if (!R.a.eq(0)) next = `${lin({ a: L.a.sub(R.a), b: L.b })}=${lin({ a: new Q(0), b: R.b })}`;
    else if (!L.b.eq(0)) next = `${lin({ a: L.a, b: new Q(0) })}=${lin({ a: new Q(0), b: R.b.sub(L.b) })}`;
    else next = `${x}=${qText(R.b.div(L.a))}`;
    lines.push({ math: next, note: move });
    cur = parseAlg(next);
  }
  return lines;
}

const lcmInt = (a, b) => { let x = a; let y = b; while (y) [x, y] = [y, x % y]; return (a / x) * b; };
const qText = (q) => (q.d === 1 ? `${q.n}` : `${q.n < 0 ? '-' : ''}${Math.abs(q.n)}/${q.d}`);
function linOf(p, x) {
  const c = p.degreeIn(x) === 1 ? p.coeffs(x) : [new Q(0), p.constValue()];
  return { a: c[0], b: c[1] };
}
function lin({ a, b }) {
  const parts = [];
  if (!a.eq(0)) parts.push(a.eq(1) ? 'x' : a.eq(-1) ? '-x' : `${qText(a)}x`);
  if (!b.eq(0) || !parts.length) parts.push(parts.length && b.n > 0 ? `+${qText(b)}` : qText(b));
  return parts.join('');
}

export { Poly };

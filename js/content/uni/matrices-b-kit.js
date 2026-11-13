// Tools of module M, part b (Cholesky, quadratic forms, normal equations,
// Rayleigh; unit `matrices`, step U8): parts of a lines item (one judge per
// part, like js/content/uni/alglin-orth.js), texts, symmetric matrices with
// whole eigenvalues built backwards.

import * as MX from '../../cas/matrix.js';
import { parse } from '../../cas/parse.js';
import { walk } from '../../cas/ast.js';
import { blankLine } from '../../judges/lines.js';
import { q, qt, fq, matLines } from './alglin-kit.js';
import { t } from '../../i18n.js';

export const SUBS = '₀₁₂₃₄₅₆₇₈₉';
export const sub = (n) => String(n).split('').map((d) => SUBS[d] ?? d).join('');
export const Qv = (v) => v.map((x) => q(x));
export const vR = (v) => `(${v.map(fq).join(' ; ')})`;
// A number in a product: (−1), (3/2).
export const par = (x) => (q(x).n < 0 || q(x).d !== 1 ? `(${qt(x)})` : qt(x));
export const maxAbs = (A) => Math.max(...A.flat().map((x) => Math.abs(q(x).valueOf())));

// a√b for a whole n ≥ 0: 45 → 3√5.
export function rootT(n0) {
  const n = Number(q(n0).valueOf());
  let out = 1;
  let m = n;
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; out *= f; }
  if (m === 1) return String(out);
  return out === 1 ? `√${m}` : `${out}√${m}`;
}

// One line of a part; with idx, some numbers of the line are blanks
// (guided levels; negative indices count from the end).
export function holes(math, idx) {
  const n = parse(math);
  const leaves = [];
  walk(n, (x) => { if (x.t === 'num') leaves.push(x); return true; });
  const pick = [...new Set(idx.map((i) => leaves[(i + leaves.length) % leaves.length]))].filter(Boolean);
  return blankLine(n, pick);
}
export const eq = (math, note, subgoal) => ({ kind: 'eq', math, note, subgoal });
export const eqG = (math, idx, note, subgoal) => (idx ? { kind: 'eq', ...holes(math, idx), note, subgoal } : eq(math, note, subgoal));
export const seg = (html, ask, start, judge) => ({ kind: 'segment', html, ask, start: { math: start }, judge });
// Options of a decision or a menu: the valid one first.
export const menu = (valid, wrongs) => [{ id: 'ok', label: valid, valid: true }, ...wrongs.map(([label, why, rule], k) => ({ id: `w${k}`, label, valid: false, why, rule: rule ?? undefined }))];
export const hints3 = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
export const withMenu = (p, m) => ({ ...p, judge: { ...p.judge, menu: m } });
// Menus of the tap mode: one valid action per part (the part's own id).
export function menuOf(items, active) {
  return items.map((o) => ({ id: o.id, label: o.label, valid: o.id === active, why: o.id === active ? undefined : o.why || t('Pas maintenant : ce n\'est pas l\'étape suivante.') }));
}

// A lines item made of parts {judge, start, html, ask, lines, pre?}: the
// first part is the item's own judge and start.
export function partsItem(o, parts) {
  const [first, ...rest] = parts;
  const script = [...(o.before || []), ...(first.html ? [{ kind: 'note', html: first.html }] : []), ...(first.pre || []), ...first.lines];
  for (const p of rest) script.push(seg(p.html, p.ask, p.start, p.judge), ...(p.pre || []), ...p.lines);
  const grid = parts.some((p) => ['mat', 'rowops', 'span', 'factor'].includes(p.judge.kind));
  return matLines({ ...o, start: first.start, judge: first.judge, script, keys: o.keys || (grid ? ['mat', 'calc'] : ['calc']) });
}

// A whole symmetric matrix A = cI + Σ μᵢvᵢvᵢᵀ with whole vectors vᵢ
// pairwise orthogonal: eigenvalues c + μᵢ‖vᵢ‖² (and c), eigenvectors vᵢ.
const V2 = [[1, 1], [1, 2], [2, 1], [1, 3], [3, 1], [1, -1], [1, -2]];
const V3 = [[[1, 1, 1], [1, -1, 0]], [[1, 2, 2], [2, 1, -2]], [[1, 1, 0], [1, -1, 1]], [[1, 0, 1], [1, 1, -1]], [[2, 1, 2], [1, 0, -1]], [[1, 1, 2], [1, 1, -1]]];
export function symWhole(n, rng, { pos = false, max = 12, distinctAbs = false, nonDiag = true } = {}) {
  for (let tries = 0; tries < 300; tries++) {
    let vs;
    if (n === 2) {
      const u = rng.pick(V2);
      vs = [u, [-u[1], u[0]]];
    } else {
      const [u, v] = rng.pick(V3);
      const w = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
      const g = Math.abs(w.reduce((a, b) => { let x = Math.abs(a); let y = Math.abs(b); while (y) [x, y] = [y, x % y]; return x; }, 0)) || 1;
      vs = [u, v, w.map((x) => x / g)];
    }
    // A = Σ λᵢ vᵢvᵢᵀ/‖vᵢ‖² must be whole: choose λ's so that it is.
    const c = rng.int(-3, 4);
    const mus = vs.map(() => rng.int(-2, 2));
    if (n === 3) mus[2] = 0;
    const A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => {
      let s = i === j ? c : 0;
      vs.forEach((v, k) => { s += mus[k] * v[i] * v[j]; });
      return q(s);
    }));
    const lams = vs.map((v, k) => c + mus[k] * v.reduce((s, x) => s + x * x, 0));
    if (new Set(lams).size < Math.min(n, 2)) continue;
    if (pos && lams.some((l) => l <= 0)) continue;
    if (lams.some((l) => l === 0)) continue;
    if (distinctAbs && new Set(lams.map(Math.abs)).size < n) continue;
    if (maxAbs(A) > max) continue;
    if (nonDiag && MX.isDiagonal(A)) continue;
    return { A, lams, vecs: vs.map((v) => v.map((x) => q(x))) };
  }
  const A = MX.mat(n === 2 ? [[3, 1], [1, 3]] : [[2, 1, 1], [1, 2, 1], [1, 1, 2]]);
  return { A, lams: n === 2 ? [4, 2] : [4, 1, 1], vecs: (n === 2 ? [[1, 1], [-1, 1]] : [[1, 1, 1], [1, -1, 0], [1, 1, -2]]).map(Qv), fallback: true };
}

// Tools of module M, part d (x′ = Ax, e^{At}, x_{k+1} = Ax_k; step U8):
// systems built backwards from their answer, texts of modes in the line
// language of js/cas/matexpr.js (judge odevec), and the item made of parts.
//
// A system: {A (Q rows), eigs: [Q], P (columns eigenvectors), c (whole
// coefficients), x0 = P·c}. Texts: modeT(λ) = e^(-2t) or (1/2)^k;
// combo([{c, l, v}]) = 3e^(-2t)(1 ; -2) - 2e^(-3t)(1 ; -3).

import * as MX from '../../cas/matrix.js';
import { parse } from '../../cas/parse.js';
import { toMathML } from '../../cas/mathml.js';
import { blankLine } from '../../judges/lines.js';
import { parseMatLine, evalAst, lineML, exprML, isLiteralAst } from '../../cas/matexpr.js';
import { q, mt, vt, fq, qt, unimodular, matLines, pickCells } from './alglin-kit.js';
import { eig2 } from './alglin-eig.js';

export { q, mt, vt, fq, qt };

const maxAbs = (A) => Math.max(...A.flat().map((x) => Math.abs(q(x).valueOf())));
export const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };

// ---------- texts ----------

// The exponent of e^(λt): t, -t, 2t, (1/2)t.
export const expoT = (l, v = 't') => { const x = q(l); if (x.eq(1)) return v; if (x.eq(-1)) return `-${v}`; return x.d === 1 ? `${qt(x)}${v}` : `(${qt(x)})${v}`; };
// A mode: e^(-2t) (continuous), (1/2)^k (discrete; '' for λ = 1).
export function modeT(l, discrete = false) {
  const x = q(l);
  if (discrete) return x.eq(1) ? '' : `(${qt(x)})^k`;
  return x.n === 0 ? '' : `e^(${expoT(x)})`;
}
// c₁·mode·v + …, c a Q or a name (c_1).
export function combo(terms, discrete = false) {
  let s = '';
  terms.forEach(({ c, l, v, m }, i) => {
    const mode = m ?? modeT(l, discrete);
    const vec = typeof v === 'string' ? v : vt(v);
    if (typeof c === 'string') { s += `${i ? '+' : ''}${c}${mode}${vec}`; return; }
    const x = q(c);
    if (x.n === 0) return;
    const a = x.n < 0 ? x.neg() : x;
    const coef = a.eq(1) ? '' : a.d === 1 ? qt(a) : `(${qt(a)})`;
    s += `${x.n < 0 ? '-' : s ? '+' : ''}${coef}${mode}${coef && !mode ? '·' : ''}${vec}`;
  });
  return s || vt([0, 0]);
}
// A linear combination of texts: 3e^(-2t)-2e^(-3t), with coefficients Q.
export function lin(pairs) {
  let s = '';
  for (const [c0, m] of pairs) {
    const c = q(c0);
    if (c.n === 0) continue;
    const a = c.n < 0 ? c.neg() : c;
    const coef = m ? (a.eq(1) ? '' : a.d === 1 ? qt(a) : `(${qt(a)})`) : qt(a);
    s += `${c.n < 0 ? '-' : s ? '+' : ''}${coef}${m}`;
  }
  return s || '0';
}
// Readable: −2, 1/2.
export const R = (t) => String(t).replace(/-/g, '−');
const VARS = ['t', 'c', 'k', 'λ'];
// MathML of a matrix line, shown as written.
export function ML(text, vars = VARS) {
  try {
    const line = parseMatLine(text, { vars });
    if (line.body) line.value = evalAst(line.body, {}, { vars }, 2);
    if (line.body && !isLiteralAst(line.body)) line.ml = exprML(line.body);
    return lineML(line);
  } catch { return text; }
}
export const MLm = (A) => ML(mt(A));
// MathML of a CAS text.
export const CM = (t, vars = ['λ', 't', 'y', 'c', 'k', 'α', 'ρ']) => { try { return toMathML(parse(t, { vars })); } catch { return t; } };
export const setR = (xs) => xs.map(fq).join(' et ');
export const listFr = (xs) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} et ${xs.at(-1)}`);

// (λ − r₁)(λ − r₂), (λ − r)², λ² + 2λ + 5.
const linF = (r) => (q(r).n === 0 ? 'λ' : q(r).n < 0 ? `λ+${qt(q(r).neg())}` : `λ-${qt(r)}`);
export function factoredT(roots) {
  const [a, b] = [...roots].sort((x, y) => q(x).valueOf() - q(y).valueOf());
  if (q(a).eq(q(b))) return q(a).n === 0 ? 'λ^2' : `(${linF(a)})^2`;
  return [a, b].map((r) => (q(r).n === 0 ? 'λ' : `(${linF(r)})`)).join('');
}
// λ² − (tr)λ + det.
export function polyT(tr, det) {
  return `λ^2${lin([[q(tr).neg(), 'λ'], [q(det), '']]).replace(/^(?=[^-])/, '+').replace(/^\+0$/, '')}`;
}
const lamC = (a) => (q(a).n === 0 ? '-λ' : `${qt(a)}-λ`);
export const shiftT = (A) => `[${A.map((r, i) => `[${r.map((x, j) => (i === j ? lamC(x) : qt(x))).join(',')}]`).join(',')}]`;
// The lines of det(A − λI) for a 2 × 2: det[[…]], (a−λ)(d−λ) − bc, expanded, factored.
export function charLines(A, roots, { factored = true, subgoal = 'charpoly' } = {}) {
  const [[a, b], [c, d]] = A;
  const bc = b.mul(c);
  const out = [
    { math: `det${shiftT(A)}`, note: 'λ soustrait sur la diagonale', subgoal },
    { math: `(${lamC(a)})(${lamC(d)})${bc.n >= 0 ? '-' : '+'}${qt(bc.n >= 0 ? bc : bc.neg())}`, note: 'Diagonale moins antidiagonale', subgoal },
    { math: polyT(a.add(d), MX.det(A)), note: 'λ² − (tr A)λ + det A', subgoal },
  ];
  if (factored && roots) out.push({ math: factoredT(roots), note: 'Factoriser', subgoal });
  // (−λ)(−λ) + 4 already reads as λ² + 4.
  return a.n === 0 && d.n === 0 ? out.filter((_, i) => i !== 1) : out;
}

// Blank numbers of a CAS line (guided levels).
export function blankNums(math, vars, k, rng) {
  let node;
  try { node = parse(math, { vars }); } catch { return { math }; }
  const nums = [];
  const walk = (n) => {
    if (!n || typeof n !== 'object') return;
    if (n.t === 'num') { nums.push(n); return; }
    for (const key of Object.keys(n)) {
      if (n.t === 'pow' && key === 'e') continue;
      const c = n[key];
      if (Array.isArray(c)) c.forEach(walk); else if (c && typeof c === 'object' && c.t) walk(c);
    }
  };
  walk(node);
  const holes = rng.shuffle(nums.filter((x) => String(x.v ?? '') !== '1')).slice(0, k);
  if (!holes.length) return { math };
  const b = blankLine(node, holes, { vars });
  return b.blanks.length ? b : { math };
}

// ---------- systems built backwards ----------

const sortDesc = (xs) => [...xs].sort((a, b) => q(b).valueOf() - q(a).valueOf());

// Two distinct eigenvalues from pool; companion: A = [[0, 1], [−b, −a]]
// (ÿ + aẏ + by = 0), P = [[1, 1], [λ₁, λ₂]]; else A = PDP⁻¹ (eig2).
// c whole ≠ 0, x0 = P·c small.
export function realSystem(rng, { companion = false, pool = [-4, -3, -2, -1, 1, 2, 3], max = 6, x0max = 6, discrete = false } = {}) {
  for (let t = 0; t < 200; t++) {
    const [l1, l2] = sortDesc(rng.shuffle(pool).slice(0, 2).map((x) => q(x)));
    let A;
    let P;
    if (companion) {
      P = MX.mat([[1, 1], [0, 0]]);
      P[1] = [l1, l2];
      A = [[q(0), q(1)], [l1.mul(l2).neg(), l1.add(l2)]];
    } else {
      const d = eig2(rng, [l1, l2], { max });
      if (d.fallback) continue;
      A = d.A;
      P = d.P;
    }
    const c = [q(nz(rng, -3, 3)), q(nz(rng, -3, 3))];
    const x0 = MX.matVec(P, c);
    if (maxAbs([x0]) > x0max || x0.every((x) => x.n === 0)) continue;
    if (!discrete && x0.some((x) => x.d !== 1)) continue;
    return { A, eigs: [l1, l2], P, c, x0, companion, ab: companion ? [l1.add(l2).neg(), l1.mul(l2)] : null };
  }
  const P = MX.mat([[1, 1], [-2, -3]]);
  return { A: MX.mat([[0, 1], [-6, -5]]), eigs: [q(-2), q(-3)], P, c: [q(3), q(-2)], x0: [q(1), q(0)], companion: true, ab: [q(5), q(6)], fallback: true };
}

// A = S·[[a, −b], [b, a]]·S⁻¹, eigenvalues a ± ib; real modes
// e^{at}·S(cos bt ; sin bt) and e^{at}·S(−sin bt ; cos bt); x0 = S·c.
export function complexSystem(rng, { as = [-2, -1, 0, 1], bs = [1, 2], max = 7 } = {}) {
  for (let t = 0; t < 200; t++) {
    const a = rng.pick(as);
    const b = rng.pick(bs);
    const S = rng.chance(0.25) ? MX.identity(2) : unimodular(2, rng, { max: 2, swaps: false });
    const Rm = MX.mat([[a, -b], [b, a]]);
    const A = MX.mul(MX.mul(S, Rm), MX.inverse(S));
    if (maxAbs(A) > max) continue;
    const c = [q(nz(rng, -2, 2)), q(rng.int(-2, 2))];
    const x0 = MX.matVec(S, c);
    if (maxAbs([x0]) > 5) continue;
    return { A, a: q(a), b: q(b), S, c, x0 };
  }
  return { A: MX.mat([[-1, -2], [2, -1]]), a: q(-1), b: q(2), S: MX.identity(2), c: [q(1), q(0)], x0: [q(1), q(0)], fallback: true };
}

// The two real modes of a complex system: vectors of texts.
export function complexModes(d) {
  const bt = expoT(d.b);
  const C = `cos(${bt})`;
  const Sn = `sin(${bt})`;
  const [[s11, s12], [s21, s22]] = d.S;
  const m1 = [lin([[s11, C], [s12, Sn]]), lin([[s21, C], [s22, Sn]])];
  const m2 = [lin([[s11.neg(), Sn], [s12, C]]), lin([[s21.neg(), Sn], [s22, C]])];
  const ea = modeT(d.a);
  return { ea, m1: `(${m1.join(' ; ')})`, m2: `(${m2.join(' ; ')})` };
}

// A double eigenvalue λ of a 2 × 2 not diagonalisable: A = λI + N,
// N = S·[[0, 1], [0, 0]]·S⁻¹ ≠ 0 (N² = 0). tri: N may be upper triangular.
export function doubleSystem(rng, { lams = [-3, -2, -1, 1, 2], tri = true, max = 6 } = {}) {
  for (let t = 0; t < 200; t++) {
    const l = q(rng.pick(lams));
    const S = rng.chance(tri ? 0.2 : 0) ? MX.identity(2) : unimodular(2, rng, { max: 2, swaps: false });
    const N = MX.mul(MX.mul(S, MX.mat([[0, rng.pick([1, 1, 2, -1])], [0, 0]])), MX.inverse(S));
    if (maxAbs(N) > 3) continue;
    if (!tri && N[1][0].n === 0) continue;
    const A = N.map((r, i) => r.map((x, j) => (i === j ? x.add(l) : x)));
    if (maxAbs(A) > max) continue;
    const x0 = [q(rng.int(-2, 3)), q(rng.int(-2, 3))];
    if (MX.matVec(N, x0).every((x) => x.n === 0)) continue; // x0 not an eigenvector
    return { A, l, N, x0 };
  }
  const N = MX.mat([[-1, 1], [-1, 1]]);
  return { A: MX.mat([[1, 1], [-1, 3]]), l: q(2), N, x0: [q(1), q(2)], fallback: true };
}

// e^{At} = e^{λt}(I + tN) written out: e^(2t)·[[1-t,t],[-t,1+t]].
export function expmDoubleT(d) {
  const e = (i, j) => lin([...(i === j ? [[1, '']] : []), [d.N[i][j], 't']]);
  return `${modeT(d.l)}·[[${e(0, 0)},${e(0, 1)}],[${e(1, 0)},${e(1, 1)}]]`;
}
// x(t) = e^{λt}(x0 + tNx0).
export function solDoubleT(d) {
  const Nx = MX.matVec(d.N, d.x0);
  return `${modeT(d.l)}·(${d.x0.map((x, i) => lin([[x, ''], [Nx[i], 't']])).join(' ; ')})`;
}
// e^{At} = P·diag(e^{λt})·P⁻¹ written out (2 × 2, distinct λ).
export function expmDiagT(d) {
  const Pi = MX.inverse(d.P);
  const e = (i, j) => lin(d.eigs.map((l, k) => [d.P[i][k].mul(Pi[k][j]), modeT(l)]));
  return `[[${e(0, 0)},${e(0, 1)}],[${e(1, 0)},${e(1, 1)}]]`;
}
// The entry (i, j) of e^{A} (t = 1) as text.
export function expmEntryAt1(d, i, j, double) {
  if (double) {
    const v = (i === j ? q(1) : q(0)).add(d.N[i][j]);
    return lin([[v, d.l.eq(1) ? 'e' : `e^(${qt(d.l)})`]]);
  }
  const Pi = MX.inverse(d.P);
  return lin(d.eigs.map((l, k) => [d.P[i][k].mul(Pi[k][j]), l.eq(1) ? 'e' : `e^(${qt(l)})`]));
}

// ---------- items made of parts ----------

// A part: {html, ask, start, judge, lines: [{math, note, subgoal, cells,
// blanks, bmath}], decisions, menu}. Level 1 shows the decisions as notes;
// level 3 gives each part its menu (tapActions 'menu').
export function partsItem(o) {
  const { level, parts } = o;
  const guided = level <= 2;
  const judgeAt = (p) => (level === 3 && p.menu ? { ...p.judge, menu: p.menu } : p.judge);
  const script = [];
  parts.forEach((p, k) => {
    if (k > 0) script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge: judgeAt(p) });
    else if (p.html) script.push({ kind: 'note', html: p.html });
    for (const dec of p.decisions || []) {
      if (o.exam && !o.keepDecisions) continue;
      if (level === 1) {
        const ok = dec.options.find((x) => x.valid && x.quality !== 'poor');
        script.push({ kind: 'note', html: `${dec.prompt} ${ok.label}.` });
      } else script.push(dec);
    }
    for (const l of p.lines) {
      const line = { kind: 'eq', math: l.math, note: l.note, subgoal: l.subgoal };
      if (guided && l.cells?.length) line.cells = l.cells;
      if (guided && l.blanks?.length) { line.math = l.bmath; line.blanks = l.blanks; }
      script.push(line);
    }
  });
  return matLines({
    skill: o.skill, level, prompt: o.prompt, start: parts[0].start, judge: judgeAt(parts[0]),
    mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script, hints: o.hints, subgoals: o.subgoals,
    key: o.key, tapActions: level === 3 ? 'menu' : null, fallback: o.fallback, exam: o.exam, noHints: o.noHints,
    keys: ['calc', 'calcfn', 'greek'], baits: o.baits,
  });
}

export const vcells = (v, k, rng) => pickCells(v.map((x) => [x]), v.map((_, i) => i), k, rng);
export const mcells = (M, k, rng) => pickCells(M, M.map((_, i) => i), k, rng);
export function withBlanks(l, vars, k, rng) {
  const b = blankNums(l.math, vars, k, rng);
  return b.blanks ? { ...l, bmath: b.math, blanks: b.blanks } : l;
}

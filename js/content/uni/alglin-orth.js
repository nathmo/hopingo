// Generators of module L, section « orth » (Lay 6: dot product, W⊥,
// projections, orthogonal matrices, Gram-Schmidt, QR, least squares, other
// inner products), spec §8.3. Catalogue: docs/universite/L-M-algebre-lineaire.md.
//
// Lines: numbers (dot products, norms, coefficients, cos θ, distances) are
// `value` lines (roots allowed, form 'exact'); the dot products that a
// student may leave as a vector, the vectors and the matrices are `mat`
// lines; W⊥ is `rowops` then `span`; Gram-Schmidt is one `mat` part per
// vector, then the family by `span` {nested, require: 'orthogonal'}; QR is
// `factor` {of: 'QR'}; least squares: `mat` for AᵀA and Aᵀb, then `rowops`
// on [AᵀA | Aᵀb]. The `mat` and `value` parts carry what the traps of
// js/cas/rules/l-orth.js need (cfg.dot, cfg.proj, cfg.pc, cfg.gs, cfg.lsq,
// cfg.qrc, cfg.perp).
//
// Levels: 1–2 guided (CAS lines with `blanks`, matrix lines with `cells`;
// a family's cells are [component, vector]), 3 choose the action (a menu
// per part, or the row operations), 4 free, 5 alone. Every item is built
// from its answer (orthogonal bases first, then the question).

import * as MX from '../../cas/matrix.js';
import { parse } from '../../cas/parse.js';
import { walk } from '../../cas/ast.js';
import { blankLine } from '../../judges/lines.js';
import {
  q, mt, vt, ML, MLm, opR, fq, qt, sub, rrefWith, orthRational, gsReverse, lsqReverse, opLines, pickCells,
  withCells, matLines, coefItem, mcqDistinct, tfL, examTag, rowHoles,
} from './alglin-kit.js';
import { MT } from './kit.js';

// ---------- small tools ----------

const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
const Qv = (v) => v.map((x) => q(x));
const dotQ = (u, v) => MX.dot(Qv(u), Qv(v));
const n2 = (u) => dotQ(u, u);
const addV = (u, v, k = 1) => u.map((x, i) => q(x).add(q(v[i]).mul(q(k))));
const scaleV = (u, k) => u.map((x) => q(x).mul(q(k)));
const isZeroV = (v) => v.every((x) => q(x).n === 0);
const eqV = (u, v) => u.length === v.length && u.every((x, i) => q(x).eq(q(v[i])));
const maxAbs = (vs) => Math.max(...vs.flat().map((x) => Math.abs(q(x).valueOf())));
const lcm = (a, b) => { const g = (x, y) => (y ? g(y, x % y) : x); return (a / g(a, b)) * b; };
const denOf = (xs) => xs.flat().reduce((d, x) => lcm(d, q(x).d), 1);
// A vector to read: (1 ; −2 ; 2).
const vR = (v) => `(${v.map(fq).join(' ; ')})`;
const famR = (vs) => vs.map(vR).join(', ');
const SUBS = '₀₁₂₃₄₅₆₇₈₉';
const xi = (i) => `x${SUBS[i + 1]}`;
const vi = (i) => `v${SUBS[i + 1]}`;
const ui = (i) => `u${SUBS[i + 1]}`;
// MathML of a CAS text.
const C = (t) => MT(t);

// √n written out: 3, 2√11 (text for the CAS) — n a whole number ≥ 0.
function rootT(n0) {
  const n = Number(q(n0).valueOf());
  let out = 1;
  let m = n;
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; out *= f; }
  if (m === 1) return String(out);
  return out === 1 ? `√${m}` : `${out}√${m}`;
}
const isSquare = (n0) => { const n = q(n0).valueOf(); const r = Math.round(Math.sqrt(n)); return r * r === n; };
const rootR = (n) => rootT(n);

// A sum of numbers as text: 3+0-8.
const sumT = (xs) => xs.map((x, i) => { const s = qt(x); return i === 0 ? s : s.startsWith('-') ? s : `+${s}`; }).join('');
// The same, to read: −2 − 12 + 6.
const sumR = (xs) => xs.map((x, i) => { const s = fq(x); return i === 0 ? s : s.startsWith('−') ? ` − ${s.slice(1)}` : ` + ${s}`; }).join('');
// The terms of a dot product: u₁v₁, u₂v₂…
const prods = (u, v) => u.map((x, i) => q(x).mul(q(v[i])));
const squares = (u) => u.map((x) => q(x).mul(q(x)));

// Σ cₖ·vₖ as text (judges) and to read: (1 ; 2) - 2·(0 ; 1), 2·u₁ − u₂.
function combT(cs, vs, show = vt) {
  return cs.map((c0, k) => {
    const c = q(c0);
    const abs = c.n < 0 ? c.neg() : c;
    const term = abs.eq(1) ? show(vs[k]) : `${show === vt ? qt(abs) : fq(abs)}·${show(vs[k])}`;
    const sg = show === vt ? '-' : '−';
    return k === 0 ? (c.n < 0 ? `${sg}${term}` : term) : `${c.n < 0 ? ` ${sg} ` : ' + '}${term}`;
  }).join('');
}
const combR = (cs, names) => combT(cs, names, (x) => x);

// A guided CAS line: the numbers at positions idx (negative: from the end) blank.
function holes(math, idx) {
  const n = parse(math);
  const leaves = [];
  walk(n, (x) => { if (x.t === 'num') leaves.push(x); return true; });
  const pick = [...new Set(idx.map((i) => leaves[(i + leaves.length) % leaves.length]))].filter(Boolean);
  return blankLine(n, pick);
}
const eqG = (math, idx, note, subgoal) => ({ kind: 'eq', ...holes(math, idx), note, subgoal });
const eq = (math, note, subgoal) => ({ kind: 'eq', math, note, subgoal });
const seg = (html, ask, start, judge) => ({ kind: 'segment', html, ask, start: { math: start }, judge });
const menu = (valid, wrongs) => [{ id: 'ok', label: valid, valid: true }, ...wrongs.map(([label, why, rule], k) => ({ id: `w${k}`, label, valid: false, why, rule }))];
const hints3 = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
// Cells of a vector line (column vector: [row, 0]).
const vecCells = (v, k, rng) => rng.shuffle(v.map((_, i) => [i, 0])).slice(0, k).sort((a, b) => a[0] - b[0]);
// Cells of a family line: [component, vector].
const famCells = (vs, k, rng) => rng.shuffle(vs.flatMap((v, j) => v.map((_, i) => [i, j]))).slice(0, k).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
// Integer vectors of ℝⁿ (entries in [−2 ; 2], at least two non-zero) whose
// norm is whole (‖v‖² ∈ {4, 9}): the nice bases of QR and of the multiple
// choices (no root in ‖v‖).
const NICE = {};
function niceVectors(n) {
  if (NICE[n]) return NICE[n];
  const out = [];
  const rec = (pre) => {
    if (pre.length === n) {
      const s = pre.reduce((a, x) => a + x * x, 0);
      if ((s === 4 || s === 9) && pre.filter((x) => x).length >= 2) out.push(pre);
      return;
    }
    for (let x = -2; x <= 2; x++) rec([...pre, x]);
  };
  rec([]);
  NICE[n] = out;
  return out;
}
// k pairwise orthogonal vectors of whole norm (≤ 3).
function niceOrth(n, k, rng) {
  const all = niceVectors(n);
  for (let t = 0; t < 400; t++) {
    const vs = [];
    for (let j = 0; j < k; j++) {
      const cands = all.filter((v) => vs.every((u) => dotQ(u, v).n === 0));
      if (!cands.length) break;
      vs.push(rng.pick(cands));
    }
    if (vs.length === k) return vs.map(Qv);
  }
  return [[1, 1, 1, 1], [1, -1, 1, -1], [1, 1, -1, -1]].slice(0, k).map(Qv);
}
// k pairwise orthogonal whole vectors (entries in [−3 ; 3], ‖v‖² ≤ max,
// at least two non-zero entries each).
function orthInts(n, k, rng, { max = 14 } = {}) {
  for (let t = 0; t < 300; t++) {
    const vs = [];
    for (let j = 0; j < k && vs.length === j; j++) {
      for (let s = 0; s < 60; s++) {
        const v = Array.from({ length: n }, () => q(rng.int(-3, 3)));
        if (v.filter((x) => x.n).length < 2 || n2(v).valueOf() > max) continue;
        if (vs.some((u) => dotQ(u, v).n !== 0)) continue;
        vs.push(v);
        break;
      }
    }
    if (vs.length === k) return vs;
  }
  return null;
}
// A whole non-zero vector of Ker [u₁ᵀ ; … ] (entries ≤ 4 in absolute value).
function kerInt(us, rng) {
  const K = MX.kernel(us.map(Qv));
  if (!K.length) return null;
  for (let t = 0; t < 60; t++) {
    let z = us[0].map(() => q(0));
    for (const v of K) {
      const d = denOf(v);
      z = addV(z, scaleV(v, d), rng.int(-1, 1));
    }
    if (!isZeroV(z) && maxAbs(z) <= 4) return z;
  }
  const v = K[0];
  return scaleV(v, denOf(v));
}

// ======================================================================
// l-orth-dot
// ======================================================================

const DOT = 'l-orth-dot';
const DOT_SUB = [
  { id: 'dot', label: 'produit scalaire', skill: DOT },
  { id: 'norm', label: 'norme', skill: DOT },
  { id: 'angle', label: 'angle et distance', skill: DOT },
];
// Vectors of whole norm (catalogue: Pythagorean triples and quadruples).
const POOL = {
  3: [[1, 2, 2], [2, 3, 6], [1, 4, 8], [4, 4, 7], [2, 6, 9], [0, 3, 4], [6, 6, 7]],
  4: [[1, 1, 1, 1], [1, 2, 2, 4], [2, 2, 4, 5], [1, 1, 3, 5], [0, 1, 2, 2], [0, 2, 3, 6]],
};
const scramble = (v, rng) => rng.shuffle(v).map((x) => q(rng.chance(0.4) ? -x : x));

function dotData(rng, n) {
  for (let t = 0; t < 200; t++) {
    const u = scramble(rng.pick(POOL[n]), rng);
    const v = scramble(rng.pick(POOL[n]), rng);
    const d = dotQ(u, v);
    if (d.n === 0 || Math.abs(d.valueOf()) >= Math.sqrt(n2(u).valueOf() * n2(v).valueOf()) - 1e-9) continue;
    if (eqV(u, v) || maxAbs([u, v]) > 9) continue;
    const w = addV(u, v, -1);
    if (maxAbs([w]) > 12) continue;
    return { u, v, d, nu: Math.round(Math.sqrt(n2(u).valueOf())), nv: Math.round(Math.sqrt(n2(v).valueOf())), w, n };
  }
  const u = Qv([1, 2, 2]);
  const v = Qv([3, 0, -4]);
  return { u, v, d: q(-5), nu: 3, nv: 5, w: addV(u, v, -1), n: 3, fallback: true };
}

const cosOf = (d) => d.d.div(q(d.nu * d.nv));

// Parts of an item (value judge unless said).
const dotPart = (d, { mat = false, html = 'Produit scalaire u · v', guided = null } = {}) => {
  const terms = sumT(prods(d.u, d.v));
  const judge = mat ? { kind: 'mat', expect: qt(d.d), dot: [d.u.map(qt), d.v.map(qt)] } : { kind: 'value', expect: qt(d.d) };
  // A `mat` line of numbers is final only when computed: one line.
  if (mat) return { judge, start: 'u·v', html, ask: 'u · v =', lines: [eq(qt(d.d), `${sumR(prods(d.u, d.v))} : la somme, un nombre`, 'dot')] };
  return { judge, start: 'u·v', html, ask: 'u · v =', lines: [guided ? eqG(terms, guided, 'Produits terme à terme', 'dot') : eq(terms, 'Produits terme à terme', 'dot'), eq(qt(d.d), 'La somme : un nombre', 'dot')] };
};
const normPart = (w, name, guided = null) => {
  const s = `√(${sumT(squares(w))})`;
  return {
    judge: { kind: 'value', expect: rootT(n2(w)), form: 'exact' }, start: `√(${name}·${name})`, html: `Norme ‖${name}‖`, ask: `‖${name}‖ =`,
    lines: [guided ? eqG(s, guided, 'Somme des carrés', 'norm') : eq(s, 'Somme des carrés', 'norm'), eq(rootT(n2(w)), 'Racine', 'norm')],
  };
};
const cosPart = (d, guided = null) => {
  const s = `${qt(d.d)}/(${d.nu}·${d.nv})`;
  return {
    judge: { kind: 'value', expect: qt(cosOf(d)), form: 'exact' }, start: 'cos(θ)', html: 'Angle : cos θ', ask: 'cos θ =',
    lines: [guided ? eqG(s, guided, 'u · v / (‖u‖‖v‖)', 'angle') : eq(s, 'u · v / (‖u‖‖v‖)', 'angle'), eq(qt(cosOf(d)), '', 'angle')],
  };
};
const distPart = (d, guided = null) => {
  const s = `√(${sumT(squares(d.w))})`;
  return {
    judge: { kind: 'value', expect: rootT(n2(d.w)), form: 'exact' }, start: '√((u-v)·(u-v))', html: 'Distance : dist(u, v) = ‖u − v‖', ask: 'dist(u, v) =',
    lines: [guided ? eqG(s, guided, 'Norme de u − v', 'angle') : eq(s, 'Norme de u − v', 'angle'), eq(rootT(n2(d.w)), '', 'angle')],
  };
};
const diffPart = (d, rng = null) => ({
  judge: { kind: 'mat', expect: vt(d.w) }, start: 'u-v', html: 'Le vecteur u − v', ask: 'u − v =',
  lines: [rng ? withCells(eq(vt(d.w), 'Composante par composante', 'angle'), vecCells(d.w, 2, rng)) : eq(vt(d.w), 'Composante par composante', 'angle')],
});

// Parts → a lines item: the first part is the item's own judge.
function partsItem(o, parts) {
  const [first, ...rest] = parts;
  const script = [...(o.before || []), ...first.lines];
  for (const p of rest) script.push(seg(p.html, p.ask, p.start, p.judge), ...(p.pre || []), ...p.lines);
  return matLines({ ...o, start: first.start, judge: first.judge, script, keys: o.keys || ['mat'] });
}
const withMenu = (p, m) => ({ ...p, judge: { ...p.judge, menu: m } });

function dotItem(level, rng) {
  const n = level >= 4 ? 4 : rng.pick([3, 3, 4]);
  const d = dotData(rng, n);
  const uv = `u = ${vR(d.u)} et v = ${vR(d.v)}`;
  const key = `${DOT}:${vt(d.u)}${vt(d.v)}`;
  const hints = hints3(
    'Multiplie terme à terme, puis additionne : u · v est un nombre. ‖u‖ = √(u · u).',
    `u · v = ${sumR(prods(d.u, d.v)).replace(/\d+$/, '□')}`,
    `u · v = ${fq(d.d)}, ‖u‖ = ${d.nu}, ‖v‖ = ${d.nv}`,
  );
  const base = { skill: DOT, level, subgoals: DOT_SUB, key: `${key}:${level}`, fallback: d.fallback, hints, mode: modeOf(level) };
  if (level === 1) {
    return partsItem({ ...base, prompt: `Soit ${uv}. Calcule u · v, ‖u‖, ‖v‖, puis cos θ.` },
      [dotPart(d, { guided: [-1] }), normPart(d.u, 'u', [1]), normPart(d.v, 'v', [-1]), cosPart(d, [1, 2])]);
  }
  if (level === 2) {
    const askDist = rng.chance(0.5);
    const decision = askDist
      ? { kind: 'decision', prompt: 'Quelle formule donne la distance de u à v ?', options: rng.shuffle(menu('dist(u, v) = ‖u − v‖', [
        ['dist(u, v) = ‖u‖ − ‖v‖', 'La distance est la longueur du vecteur u − v ; ‖u‖ − ‖v‖ ne compare que les longueurs.'],
        ['dist(u, v) = u · v', 'u · v mesure un angle (avec les normes), pas un écart entre deux points.'],
      ])) }
      : { kind: 'decision', prompt: 'Quelle formule donne l\'angle θ entre u et v ?', options: rng.shuffle(menu('cos θ = u · v / (‖u‖‖v‖)', [
        ['cos θ = u · v', 'u · v dépend des longueurs : il faut diviser par ‖u‖‖v‖ pour obtenir un cosinus.'],
        ['cos θ = ‖u‖‖v‖ / (u · v)', 'C\'est l\'inverse : cos θ = u · v / (‖u‖‖v‖), un nombre entre −1 et 1.'],
      ])) };
    const parts = askDist ? [diffPart(d, rng), distPart(d, [0, -1])] : [dotPart(d, { guided: [0, -1] }), normPart(d.u, 'u', [0, 1]), normPart(d.v, 'v', [0, -1]), cosPart(d, [0, 1, 2])];
    return partsItem({ ...base, prompt: `Soit ${uv}. ${askDist ? 'Calcule la distance de u à v.' : 'Calcule cos θ, où θ est l\'angle entre u et v.'}`, before: [decision] }, parts);
  }
  if (level === 3) {
    const unit = scaleV(d.u, q(1, d.nu));
    const unitPart = {
      judge: { kind: 'mat', expect: vt(unit) }, start: 'u/‖u‖', html: 'Vecteur unitaire de même direction que u', ask: 'u / ‖u‖ =',
      lines: [eq(`(1/${d.nu})·${vt(d.u)}`, 'Diviser par la norme', 'norm'), eq(vt(unit), '', 'norm')],
    };
    const parts = [
      withMenu(normPart(d.u, 'u'), menu('‖u‖ = √(u · u)', [['‖u‖ = u · u', 'u · u est le carré de la norme : il manque la racine.'], ['‖u‖ = somme des composantes', 'La norme est la racine de la somme des <b>carrés</b>.']])),
      withMenu(unitPart, menu('Diviser u par ‖u‖', [['Diviser u par ‖u‖²', 'Diviser par ‖u‖² donne un vecteur de norme 1/‖u‖, pas 1.'], ['Diviser u par sa plus grande composante', 'Le vecteur obtenu n\'a pas une norme 1 en général.']])),
      withMenu(dotPart(d, { mat: true }), menu('Multiplier terme à terme, puis additionner', [['Multiplier terme à terme et garder le vecteur', 'Le produit scalaire est un nombre : il faut additionner les produits.', 'l_dot_no_sum']])),
      withMenu(cosPart(d), menu('cos θ = u · v / (‖u‖‖v‖)', [['cos θ = u · v', 'Il faut diviser par ‖u‖‖v‖ pour obtenir un cosinus.']])),
    ];
    return partsItem({ ...base, prompt: `Soit ${uv}, avec ‖v‖ = ${d.nv}. Calcule ‖u‖, le vecteur unitaire u/‖u‖, puis cos θ, où θ est l'angle entre u et v.`, tapActions: 'menu' }, parts);
  }
  if (level === 4) return dotParam(rng, base);
  // Level 5: distance and angle, alone.
  return partsItem({ ...base, prompt: `Soit ${uv}. Calcule dist(u, v), puis cos θ, où θ est l'angle entre u et v.` },
    [diffPart(d), distPart(d), dotPart(d, { mat: true }), cosPart(d)]);
}

// « Pour quel a u ⊥ v ? » in ℝ⁴, then dist(u, v) by Pythagoras.
function dotParam(rng, base) {
  for (let t = 0; t < 200; t++) {
    const v = scramble(rng.pick(POOL[4]), rng);
    const p = v.findIndex((x, i) => x.n !== 0 && Math.abs(x.valueOf()) <= 2 && i >= 0);
    if (p < 0) continue;
    const u = Array.from({ length: 4 }, () => q(rng.int(-3, 3)));
    let s = q(0);
    u.forEach((x, i) => { if (i !== p) s = s.add(x.mul(v[i])); });
    const a = s.neg().div(v[p]);
    if (a.d !== 1 || a.n === 0 || Math.abs(a.n) > 5) continue;
    const uT = u.map((x, i) => (i === p ? 'a' : qt(x)));
    const uRt = `(${u.map((x, i) => (i === p ? 'a' : fq(x))).join(' ; ')})`;
    const uA = u.map((x, i) => (i === p ? a : x));
    const expr = `${qt(v[p])}a${s.n < 0 ? '' : '+'}${qt(s)}`.replace(/^1a/, 'a').replace(/^-1a/, '-a');
    const terms = u.map((x, i) => (i === p ? `${qt(v[p])}a` : qt(x.mul(v[i])))).map((x, i) => (i && !x.startsWith('-') ? `+${x}` : x)).join('');
    const d2 = n2(uA).add(n2(v));
    const dist = rootT(d2);
    const parts = [
      { judge: { kind: 'mat', vars: ['a'], expect: expr, dot: [uT, v.map(qt)] }, start: 'u·v', html: '', ask: 'u · v =', lines: [eq(terms.replace(/\b1a/, 'a').replace(/-1a/, '-a'), 'Produits terme à terme', 'dot')] },
      { judge: { kind: 'solset', v: 'a' }, start: `${expr}=0`, html: 'u ⊥ v ⇔ u · v = 0', ask: '', lines: [eq(`a=${qt(a)}`, 'Résoudre', 'dot')] },
      { judge: { kind: 'value', expect: dist, form: 'exact' }, start: '√((u-v)·(u-v))', html: `Avec a = ${fq(a)} : dist(u, v) = ‖u − v‖ (u ⊥ v : Pythagore)`, ask: 'dist(u, v) =', lines: [eq(`√(${qt(n2(uA))}+${qt(n2(v))})`, '‖u − v‖² = ‖u‖² + ‖v‖² car u ⊥ v', 'angle'), eq(dist, '', 'angle')] },
    ];
    return partsItem({
      ...base, key: `${DOT}:param:${uRt}${vt(v)}`, prompt: `Soit u = ${uRt} et v = ${vR(v)}. Pour quelle valeur de a les vecteurs u et v sont-ils orthogonaux ? Calcule ensuite dist(u, v) pour cette valeur.`,
      hints: hints3('u ⊥ v ⇔ u · v = 0 : écris u · v en fonction de a.', `u · v = ${C(expr)}`, `a = ${fq(a)}`),
    }, parts);
  }
  return dotItem(5, rng);
}

function dotExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 2);
    if (which === 0) {
      return tfL({
        skill: DOT, key: 'pm', truth: true, exam: examTag({ exam }),
        statement: 'Pour u, v ∈ ℝⁿ : si ‖u + v‖ = ‖u − v‖, alors u ⊥ v.',
        explanation: 'Vrai : ‖u + v‖² − ‖u − v‖² = 4 u · v, donc u · v = 0.',
      });
    }
    if (which === 1) {
      return tfL({
        skill: DOT, key: 'pyth', truth: true, exam: examTag({ exam }),
        statement: 'Pour u, v ∈ ℝⁿ : u ⊥ v si et seulement si ‖u + v‖² = ‖u‖² + ‖v‖².',
        explanation: 'Vrai : ‖u + v‖² = ‖u‖² + 2 u · v + ‖v‖² (Pythagore).',
      });
    }
    const [u, v, w] = rng.pick([[[1, 0], [0, 1], [1, 0]], [[1, 0], [0, 1], [2, 0]], [[1, 1], [1, -1], [1, 1]], [[1, 0, 0], [0, 1, 0], [1, 0, 1]]]);
    const s = u.length;
    return tfL({
      skill: DOT, key: `trans:${vt(u)}${vt(w)}`, truth: false, exam: examTag({ exam }), ruleIfTrue: 'l_orth_transitive',
      statement: 'Pour u, v, w ∈ ℝⁿ : si u ⊥ v et v ⊥ w, alors u ⊥ w.',
      counter: {
        kind: 'vecFamily', params: { want: 'orthNotTransitive' },
        ask: [{ v: 'u', label: 'u =', shape: [s, 1] }, { v: 'v', label: 'v =', shape: [s, 1] }, { v: 'w', label: 'w =', shape: [s, 1] }],
        answer: { u: vt(u), v: vt(v), w: vt(w) },
      },
      explanation: `Faux : u = ${vR(u)}, v = ${vR(v)}, w = ${vR(w)} donnent u · v = v · w = 0 mais u · w = ${fq(dotQ(u, w))}.`,
    });
  }
  const d = dotData(rng, rng.pick([3, 4]));
  const uv = `u = ${vR(d.u)} et v = ${vR(d.v)}`;
  if (rng.chance(0.5)) {
    const p = prods(d.u, d.v);
    const abs = p.reduce((s, x) => s.add(x.n < 0 ? x.neg() : x), q(0));
    return mcqDistinct({
      skill: DOT, level: 4, key: `mcq:dot:${vt(d.u)}${vt(d.v)}`, exam: examTag({ exam }),
      prompt: `Soit ${uv}. Que vaut u · v ?`,
      right: fq(d.d),
      wrongs: [{ html: vR(p), rule: 'l_dot_no_sum' }, { html: fq(abs), rule: null }],
      fillers: [{ html: fq(d.d.neg()) }, { html: fq(d.d.add(2)) }, { html: fq(d.d.sub(2)) }],
      solution: [{ html: `u · v = ${C(sumT(p))} = ${fq(d.d)}`, note: 'La somme des produits terme à terme : un nombre' }],
    }, rng);
  }
  const w2 = n2(d.w);
  const alt = Math.abs(d.nu - d.nv);
  return mcqDistinct({
    skill: DOT, level: 4, key: `mcq:dist:${vt(d.u)}${vt(d.v)}`, exam: examTag({ exam }),
    prompt: `Soit ${uv}. Que vaut dist(u, v) ?`,
    right: C(rootT(w2)),
    wrongs: [{ html: C(qt(w2)), rule: null }, { html: C(String(alt)), rule: null }],
    fillers: [{ html: C(rootT(n2(d.u).add(n2(d.v)))) }, { html: C(rootT(n2(addV(d.u, d.v)))) }],
    solution: [{ html: `u − v = ${vR(d.w)}`, note: '' }, { html: `dist(u, v) = ‖u − v‖ = ${C(`√(${qt(w2)})`)} = ${C(rootT(w2))}`, note: 'Ne pas oublier la racine' }],
  }, rng);
}

// ======================================================================
// l-orth-complement
// ======================================================================

const PERP = 'l-orth-complement';
const PERP_SUB = [
  { id: 'reduce', label: 'réduire', skill: 'l-sys-rref' },
  { id: 'param', label: 'paramétrer', skill: 'l-vs-kernel' },
  { id: 'perp', label: 'W⊥', skill: PERP },
];

// W = Span{w₁, w₂} ⊂ ℝ⁴: M (rows wᵢ) = unimodular · R, R reduced with whole
// free entries, so that Ker M has a whole basis.
function perpData(rng) {
  for (let t = 0; t < 200; t++) {
    const pivots = rng.pick([[0, 1], [0, 1], [0, 2], [1, 2]]);
    const { A, R, fallback } = rrefWith(2, 4, pivots, rng, { lo: -3, hi: 3, max: 2 });
    if (fallback || A.some((r) => r.filter((x) => x.n).length < 2) || maxAbs(A) > 6) continue;
    const red = MX.rref(A);
    if (red.ops.length < 1 || red.ops.length > 4 || red.ops.some((op) => op.k && op.k.d !== 1)) continue;
    let M = A;
    let ok = true;
    for (const op of red.ops) { M = MX.applyOp(M, op); if (M.flat().some((x) => x.d > 2 || Math.abs(x.valueOf()) > 12)) ok = false; }
    if (!ok) continue;
    const K = MX.kernel(A);
    if (maxAbs(K) > 4) continue;
    return { W: A, R, ops: red.ops, K, pivots };
  }
  const W = MX.mat([[1, 1, 0, 2], [0, 1, 1, -1]]);
  const red = MX.rref(W);
  return { W, R: red.R, ops: red.ops, K: MX.kernel(W), pivots: red.pivots, fallback: true };
}

const spanT = (vs) => `Span{${vs.map(vt).join(', ')}}`;
const paramT = (vs) => `x = ${vs.map((v, i) => `${['s', 't', 'r'][i]}${vt(v)}`).join(' + ')}`;

function perpParts(d, level, rng, { Ttext = null } = {}) {
  const Mtext = mt(d.W);
  const lines = opLines(d.W, d.ops, { note: (op) => (op.kind === 'scale' ? 'Pivot à 1' : `Réduire : ${opR(op)}`), subgoal: 'reduce' });
  const guided = level <= 2;
  const red = { judge: { kind: 'rowops', goal: 'rref' }, start: Mtext, html: 'Réduis M (W⊥ = Ker M).', ask: '', lines: guided ? lines.map((l) => withCells(l, pickCells(l.result, l.op.kind === 'swap' ? [l.op.i] : [l.op.i], 2, rng))) : lines };
  const fam = { kind: 'eq', math: spanT(d.K), note: 'Une variable libre par vecteur', subgoal: 'perp' };
  const spanPart = {
    judge: { kind: 'span', basis: d.K.map(vt), require: 'basis', perp: d.W.map((r) => r.map(qt)) }, start: 'W⊥', html: 'Une base de W⊥ (= Ker M).', ask: 'W⊥ =',
    lines: [level === 3 ? { kind: 'eq', math: paramT(d.K), note: 'Paramétrer : une variable libre par vecteur', subgoal: 'param' } : guided ? withCells(fam, famCells(d.K, 2, rng)) : fam],
  };
  const matPart = { judge: { kind: 'mat', expect: Mtext }, start: 'M', html: '', ask: 'M =', lines: [guided ? withCells(eq(Mtext, Ttext || 'w₁ et w₂ en lignes', 'perp'), pickCells(d.W, [0, 1], 2, rng)) : eq(Mtext, Ttext || 'w₁ et w₂ en lignes', 'perp')] };
  return { matPart, red, spanPart };
}

function perpItem(level, rng) {
  const tpl = level >= 4 ? rng.pick(['basis', 'eq', 'col']) : 'basis';
  if (tpl === 'eq') return perpEquation(level, rng);
  const d = perpData(rng);
  const W = `W = Span{${famR(d.W)}}`;
  const key = `${PERP}:${mt(d.W)}`;
  const hints = hints3(
    'x ∈ W⊥ ⇔ x · w₁ = 0 et x · w₂ = 0 : c\'est le système homogène de matrice M = [w₁ᵀ ; w₂ᵀ] (vecteurs en lignes).',
    `Forme réduite : ${MLm(d.R)} ; les variables sans pivot sont libres.`,
    `W⊥ = ${ML(spanT(d.K))}`,
  );
  const base = { skill: PERP, level, subgoals: PERP_SUB, key: `${key}:${level}`, fallback: d.fallback, hints, mode: modeOf(level) };
  if (tpl === 'col') {
    const A = MX.transpose(d.W);
    const { matPart, red, spanPart } = perpParts(d, level, rng, { Ttext: 'Aᵀ : les colonnes de A en lignes' });
    matPart.ask = 'Aᵀ =';
    matPart.start = 'A^T';
    matPart.judge = { ...matPart.judge, names: { A: mt(A) } };
    spanPart.html = 'Une base de (Col A)⊥ = Ker Aᵀ.';
    red.html = 'Réduis Aᵀ.';
    spanPart.ask = '(Col A)⊥ =';
    return partsItem({
      ...base, key: `${PERP}:col:${mt(A)}`, prompt: `Soit A = ${MLm(A)}. Donne une base de (Col A)⊥.`,
      hints: hints3('(Col A)⊥ = Ker Aᵀ : les colonnes de A deviennent les lignes de Aᵀ.', `Aᵀ = ${MLm(d.W)}`, `(Col A)⊥ = ${ML(spanT(d.K))}`),
    }, [matPart, red, spanPart]);
  }
  const { matPart, red, spanPart } = perpParts(d, level, rng);
  const before = level === 2 ? [{
    kind: 'decision', prompt: 'Comment poser la matrice M dont W⊥ est le noyau ?', options: rng.shuffle(menu('w₁ et w₂ en lignes', [
      ['w₁ et w₂ en colonnes', 'En colonnes, Ker M contient les coefficients des combinaisons nulles de w₁ et w₂, pas les vecteurs orthogonaux à W. Les équations x · wᵢ = 0 sont les lignes.', 'l_matrix_rows_cols'],
    ])),
  }] : [];
  if (level >= 3) {
    // The matrix M is given: reduce, then the basis.
    return partsItem({ ...base, prompt: `Soit ${W} ⊂ ℝ⁴. Donne une base de W⊥ : réduis M = ${MLm(d.W)}${level === 3 ? ' (choisis chaque opération)' : ''}, puis paramètre son noyau.`, tapActions: level === 3 ? 'rowops' : null }, [red, spanPart]);
  }
  return partsItem({ ...base, prompt: `Soit ${W} ⊂ ℝ⁴. Pose la matrice M, réduis-la, puis donne une base de W⊥.`, before }, [matPart, red, spanPart]);
}

// W = {x : a · x = 0} (a hyperplane): W⊥ is the normal line.
function perpEquation(level, rng) {
  const a = scramble(rng.pick([[1, 2, -1, 3], [2, -1, 1, 1], [1, 1, 1, 2], [3, 1, -2, 1], [1, -2, 2, 0]]), rng);
  const eqText = a.map((c, i) => ({ c, i })).filter((t) => t.c.n).map((t, k) => {
    const abs = t.c.n < 0 ? t.c.neg() : t.c;
    return `${t.c.n < 0 ? (k ? ' − ' : '−') : k ? ' + ' : ''}${abs.eq(1) ? '' : qt(abs)}x${SUBS[t.i + 1]}`;
  }).join('');
  return partsItem({
    skill: PERP, level, subgoals: PERP_SUB, key: `${PERP}:eq:${vt(a)}:${level}`, mode: 'free',
    prompt: `Soit W = {x ∈ ℝ⁴ : ${eqText} = 0}. Donne une base de W⊥.`,
    hints: hints3('L\'équation dit a · x = 0 avec a le vecteur des coefficients : W est l\'ensemble des vecteurs orthogonaux à a.', 'W est de dimension 3, donc W⊥ est de dimension 1.', `W⊥ = ${ML(spanT([a]))}`),
  }, [{ judge: { kind: 'span', basis: [vt(a)], require: 'basis' }, start: 'W⊥', html: '', ask: 'W⊥ =', lines: [eq(spanT([a]), 'Le vecteur des coefficients de l\'équation', 'perp')] }]);
}

function perpExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 2);
    if (which === 0) {
      return tfL({
        skill: PERP, key: 'dim', truth: true, exam: examTag({ exam }),
        statement: 'Si W est un sous-espace de ℝⁿ, alors dim W + dim W⊥ = n.',
        explanation: 'Vrai : W⊥ = Ker M, où M (k × n) a pour lignes une base de W ; le théorème du rang donne dim Ker M = n − k.',
      });
    }
    if (which === 1) {
      return tfL({
        skill: PERP, key: 'row', truth: true, exam: examTag({ exam }),
        statement: 'Pour toute matrice A, (Lgn A)⊥ = Ker A.',
        explanation: 'Vrai : Ax = 0 dit exactement que x est orthogonal à chaque ligne de A.',
      });
    }
    const A = rng.pick([[[1, 1], [0, 0]], [[1, 2], [0, 0]], [[1, 0], [1, 0]], [[0, 1], [0, 0]]]);
    return tfL({
      skill: PERP, key: `col:${mt(MX.mat(A))}`, truth: false, exam: examTag({ exam }),
      statement: 'Pour toute matrice carrée A, (Col A)⊥ = Ker A.',
      counter: { kind: 'matOne', params: { want: 'colPerpNotKer', n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(MX.mat(A)) } },
      explanation: `Faux : (Col A)⊥ = Ker Aᵀ. Avec A = ${MLm(MX.mat(A))}, Ker A = ${ML(spanT(MX.kernel(MX.mat(A))))} et Ker Aᵀ = ${ML(spanT(MX.kernel(MX.transpose(MX.mat(A)))))}.`,
    });
  }
  const d = perpData(rng);
  // l_ker_sign: the free entries copied without their sign.
  const sign = d.K.map((v) => v.map((x, c) => (d.pivots.includes(c) ? x.neg() : x)));
  const one = MX.kernel([d.W[0]]);
  const ints = (vs) => vs.map((v) => scaleV(v, denOf(v)));
  return mcqDistinct({
    skill: PERP, level: 4, key: `mcq:${mt(d.W)}`, exam: examTag({ exam }),
    prompt: `Soit W = Span{${famR(d.W)}} ⊂ ℝ⁴. Laquelle de ces familles est une base de W⊥ ?`,
    right: famR(d.K),
    wrongs: [{ html: famR(sign), rule: 'l_ker_sign' }, { html: famR(ints(one)), rule: 'l_perp_one_vector' }, { html: famR(d.W), rule: null }],
    fillers: [{ html: famR([d.K[0], d.W[0]]) }, { html: famR([d.K[0]]) }],
    solution: [{ html: `M = ${MLm(d.W)} → ${MLm(d.R)}`, note: 'Vecteurs en lignes, puis forme réduite' }, { html: `W⊥ = Ker M = ${ML(spanT(d.K))}`, note: '' }],
  }, rng);
}

// ======================================================================
// l-orth-proj
// ======================================================================

const PROJ = 'l-orth-proj';
const PROJ_SUB = [
  { id: 'check', label: 'vérifier l\'orthogonalité', skill: DOT },
  { id: 'coef', label: 'coefficients', skill: PROJ },
  { id: 'proj', label: 'projection', skill: PROJ },
  { id: 'decomp', label: 'décomposer, distance', skill: PROJ },
];
const comb2 = (terms) => terms.reduce((s, [c, v]) => addV(s, v, c), terms[0][1].map(() => q(0)));

// W = Span{u₁, u₂} ⊂ ℝ⁴ (orthogonal, whole), y = c₁u₁ + c₂u₂ + z with z ∈ W⊥
// whole and non-zero. nice: ‖uᵢ‖ whole (the multiple choices show
// y · uᵢ/‖uᵢ‖). nonorth: the basis given is x₁ = u₁, x₂ = u₂ + c·u₁.
function projData(rng, { nice = false, nonorth = false } = {}) {
  for (let t = 0; t < 200; t++) {
    const us = nice ? niceOrth(4, 2, rng) : orthInts(4, 2, rng, { max: 6 });
    if (!us) continue;
    const z = kerInt(us, rng);
    if (!z) continue;
    const cs = [nz(rng, -2, 2), nz(rng, -2, 2)];
    const yhat = addV(scaleV(us[0], cs[0]), us[1], cs[1]);
    const y = addV(yhat, z);
    if (maxAbs([y]) > 9 || maxAbs([yhat]) > 9) continue;
    const xs = nonorth ? gsReverse(us, rng, { lo: -2, hi: 2 }).xs : us;
    if (nonorth && maxAbs(xs) > 6) continue;
    return { us, xs, cs: cs.map((x) => q(x)), y, yhat, z };
  }
  const us = [[1, 1, 1, 0], [1, -1, 0, 1]].map(Qv);
  const y = Qv([3, 1, 2, 4]);
  return { us, xs: nonorth ? [us[0], addV(us[1], us[0])] : us, cs: [q(2), q(2)], y, yhat: Qv([4, 0, 2, 2]), z: Qv([-1, 1, 0, 2]), fallback: true };
}

const nameT = (k, name) => `${name}_${k + 1}`;
// The coefficient y · uₖ / uₖ · uₖ (value).
const coefPart = (d, k, { name = 'u', guided = null, us = d.us } = {}) => {
  const u = us[k];
  const s = `(${sumT(prods(d.y, u))})/(${sumT(squares(u))})`;
  const nm = `${name}${SUBS[k + 1]}`;
  return {
    judge: { kind: 'value', expect: qt(d.cs[k]), pc: { y: d.y.map(qt), u: u.map(qt) } }, start: `y·${nameT(k, name)}/(${nameT(k, name)}·${nameT(k, name)})`,
    html: `Coefficient de ${nm} : y · ${nm} / ${nm} · ${nm}`, ask: `c${SUBS[k + 1]} =`,
    lines: [guided ? eqG(s, guided, 'Produits scalaires', 'coef') : eq(s, 'Produits scalaires', 'coef'), eq(qt(d.cs[k]), '', 'coef')],
  };
};
const yhatPart = (d, rng = null, { name = 'u', us = d.us } = {}) => ({
  judge: { kind: 'mat', expect: vt(d.yhat), proj: { y: d.y.map(qt), basis: d.xs.map((v) => v.map(qt)), orth: us.map((v) => v.map(qt)) } },
  start: 'ŷ', html: `Projection ŷ = c₁${name}₁ + c₂${name}₂`, ask: 'ŷ =',
  lines: [
    eq(combT(d.cs, us), 'Combinaison des vecteurs de la base', 'proj'),
    rng ? withCells(eq(vt(d.yhat), '', 'proj'), vecCells(d.yhat, 2, rng)) : eq(vt(d.yhat), '', 'proj'),
  ],
});
const zPart = (d, rng = null) => ({
  judge: { kind: 'mat', expect: vt(d.z) }, start: 'z', html: 'Composante orthogonale z = y − ŷ (dans W⊥)', ask: 'z =',
  lines: [eq(`${vt(d.y)} - ${vt(d.yhat)}`, 'z = y − ŷ', 'decomp'), rng ? withCells(eq(vt(d.z), 'z est orthogonal à W', 'decomp'), vecCells(d.z, 2, rng)) : eq(vt(d.z), 'z est orthogonal à W', 'decomp')],
});
const distYW = (z, guided = null, html = 'Distance de y à W : ‖z‖') => {
  const s = `√(${sumT(squares(z))})`;
  return {
    judge: { kind: 'value', expect: rootT(n2(z)), form: 'exact' }, start: '√(z·z)', html, ask: 'dist(y, W) =',
    lines: [guided ? eqG(s, guided, 'Norme', 'decomp') : eq(s, 'Norme', 'decomp'), eq(rootT(n2(z)), '', 'decomp')],
  };
};
const checkPart = (d, guided = null) => {
  const s = sumT(prods(d.us[0], d.us[1]));
  return {
    judge: { kind: 'value', expect: '0' }, start: 'u_1·u_2', html: 'u₁ · u₂ : la base est-elle orthogonale ?', ask: 'u₁ · u₂ =',
    lines: [guided ? eqG(s, guided, 'Produits terme à terme', 'check') : eq(s, 'Produits terme à terme', 'check'), eq('0', 'Base orthogonale : la formule s\'applique', 'check')],
  };
};
// Gram-Schmidt on (x₁, x₂): v₂ = x₂ − c·v₁ (mat, with the traps' data).
const gs2Part = (d, rng = null) => {
  const c = dotQ(d.xs[1], d.us[0]).div(n2(d.us[0]));
  return {
    judge: { kind: 'mat', expect: vt(d.us[1]), gs: { xs: d.xs.map((v) => v.map(qt)), vs: d.us.map((v) => v.map(qt)), j: 1 } },
    start: 'v_2', html: 'Gram-Schmidt : v₁ = x₁, v₂ = x₂ − (x₂ · v₁ / v₁ · v₁) v₁', ask: 'v₂ =',
    lines: [
      eq(combT([1, c.neg()], [d.xs[1], d.us[0]]), `x₂ · v₁ / v₁ · v₁ = ${fq(dotQ(d.xs[1], d.us[0]))}/${fq(n2(d.us[0]))}`, 'coef'),
      rng ? withCells(eq(vt(d.us[1]), '', 'coef'), vecCells(d.us[1], 2, rng)) : eq(vt(d.us[1]), '', 'coef'),
    ],
  };
};

function projItem(level, rng) {
  if (level >= 4 && rng.chance(0.4)) return projPlane(level, rng);
  const nonorth = level >= 4 || (level === 2 && rng.chance(0.5));
  const d = projData(rng, { nonorth });
  const name = nonorth ? 'v' : 'u';
  const W = nonorth ? `W = Span{x₁, x₂}, x₁ = ${vR(d.xs[0])}, x₂ = ${vR(d.xs[1])}` : `W = Span{u₁, u₂}, u₁ = ${vR(d.us[0])}, u₂ = ${vR(d.us[1])}`;
  const key = `${PROJ}:${vt(d.xs[0])}${vt(d.xs[1])}${vt(d.y)}`;
  const hints = hints3(
    nonorth ? 'La formule de projection ne marche qu\'avec une base orthogonale : orthogonalise d\'abord (Gram-Schmidt), puis projette sur v₁, v₂.' : 'La formule ne marche qu\'avec une base orthogonale : ici u₁ · u₂ = 0. Puis ŷ = Σ (y · uᵢ / uᵢ · uᵢ) uᵢ.',
    `ŷ = □·${name}₁ + □·${name}₂`,
    `ŷ = ${combR(d.cs, [`${name}₁`, `${name}₂`])} = ${vR(d.yhat)}`,
  );
  const base = { skill: PROJ, level, subgoals: PROJ_SUB, key: `${key}:${level}`, fallback: d.fallback, hints, mode: modeOf(level) };
  const yR = `y = ${vR(d.y)}`;
  const ask = 'Calcule la projection orthogonale ŷ de y sur W, la composante z = y − ŷ, puis la distance de y à W.';
  const vOpts = { name, us: d.us };
  if (level === 1) {
    return partsItem({ ...base, prompt: `Soit ${W} et ${yR}. ${ask}` },
      [checkPart(d, [0, -1]), coefPart(d, 0, { guided: [0, -1] }), coefPart(d, 1, { guided: [1, -2] }), yhatPart(d, rng), zPart(d, rng), distYW(d.z, [0])]);
  }
  if (level === 2) {
    const d12 = fq(dotQ(d.xs[0], d.xs[1]));
    const decision = nonorth
      ? { kind: 'decision', prompt: 'Peut-on appliquer la formule ŷ = Σ (y · xᵢ / xᵢ · xᵢ) xᵢ ?', options: rng.shuffle(menu('Non : x₁ · x₂ ≠ 0, il faut d\'abord Gram-Schmidt', [['Oui, avec x₁ et x₂ tels quels', `x₁ · x₂ = ${d12} ≠ 0 : la base n'est pas orthogonale, la formule donnerait un faux ŷ.`, 'l_proj_nonorth']])) }
      : { kind: 'decision', prompt: 'Peut-on appliquer la formule ŷ = Σ (y · uᵢ / uᵢ · uᵢ) uᵢ ?', options: rng.shuffle(menu('Oui : u₁ · u₂ = 0, la base est orthogonale', [['Non, il faut d\'abord Gram-Schmidt', 'u₁ · u₂ = 0 : la base est déjà orthogonale, Gram-Schmidt la laisserait telle quelle.']])) };
    const parts = nonorth
      ? [gs2Part(d, rng), coefPart(d, 0, { name, guided: [0, -1, 1] }), coefPart(d, 1, { name, guided: [0, -1] }), yhatPart(d, rng, vOpts), zPart(d, rng), distYW(d.z, [0, -1])]
      : [coefPart(d, 0, { guided: [0, -1, 1] }), coefPart(d, 1, { guided: [0, -1] }), yhatPart(d, rng), zPart(d, rng), distYW(d.z, [0, -1])];
    return partsItem({ ...base, prompt: `Soit ${W} et ${yR}. ${ask}`, before: [decision] }, parts);
  }
  if (level === 3) {
    const m = [
      menu('y · uᵢ / uᵢ · uᵢ', [['y · uᵢ / ‖uᵢ‖', 'Diviser une fois par ‖uᵢ‖ donne une longueur : pour le coefficient du vecteur uᵢ, il faut diviser par ‖uᵢ‖² = uᵢ · uᵢ.', 'g4_proj_no_square'], ['y · uᵢ', 'Il manque la division par uᵢ · uᵢ (sauf si uᵢ est unitaire).', 'g4_proj_no_square']]),
      menu('ŷ = c₁u₁ + c₂u₂', [['ŷ = c₁ + c₂', 'ŷ est un vecteur de W : une combinaison de u₁ et u₂.'], ['ŷ = y − c₁u₁ − c₂u₂', 'Ça, c\'est z, la composante orthogonale.']]),
      menu('z = y − ŷ', [['z = y + ŷ', 'y = ŷ + z, donc z = y − ŷ.']]),
      menu('dist(y, W) = ‖z‖', [['dist(y, W) = ‖ŷ‖', '‖ŷ‖ est la longueur de la projection, pas l\'écart entre y et W.'], ['dist(y, W) = ‖y‖ − ‖ŷ‖', 'La distance est ‖y − ŷ‖ = ‖z‖ ; on ne soustrait pas les longueurs.']]),
    ];
    const parts = [withMenu(coefPart(d, 0), m[0]), withMenu(coefPart(d, 1), m[0]), withMenu(yhatPart(d), m[1]), withMenu(zPart(d), m[2]), withMenu(distYW(d.z), m[3])];
    return partsItem({ ...base, prompt: `Soit ${W} et ${yR}. ${ask}`, tapActions: 'menu' }, parts);
  }
  // Levels 4–5: a basis that is not orthogonal: Gram-Schmidt first.
  return partsItem({ ...base, prompt: `Soit ${W} et ${yR}. ${ask}` }, [gs2Part(d), yhatPart(d, null, vOpts), zPart(d), distYW(d.z)]);
}

// W = {x : a · x = 0}: project y on the normal a, and subtract.
function projPlane(level, rng) {
  for (let t = 0; t < 200; t++) {
    const a = scramble(rng.pick([[1, 1, 1, 1], [1, 2, 0, 2], [1, 1, 0, 1], [2, 1, 1, 1], [1, 2, 1, 1], [0, 1, 1, 1], [1, 1, 2, 3]]), rng);
    const w = kerInt([a], rng);
    if (!w) continue;
    const k = nz(rng, -2, 2);
    const p = scaleV(a, k);
    const y = addV(w, p);
    if (maxAbs([y]) > 9) continue;
    const nn = n2(a);
    const dd = dotQ(y, a);
    const eqText = a.map((c, i) => ({ c, i })).filter((x) => x.c.n).map((x, j) => {
      const abs = x.c.n < 0 ? x.c.neg() : x.c;
      return `${x.c.n < 0 ? (j ? ' − ' : '−') : j ? ' + ' : ''}${abs.eq(1) ? '' : qt(abs)}x${SUBS[x.i + 1]}`;
    }).join('');
    const parts = [
      { judge: { kind: 'mat', expect: vt(p), proj: { y: y.map(qt), basis: [a.map(qt)] } }, start: 'p', html: 'Projection de y sur la normale a', ask: 'proj_a y =', lines: [eq(`(${qt(dd)}/${qt(nn)})·${vt(a)}`, '(y · a / a · a) a', 'coef'), eq(vt(p), '', 'coef')] },
      { judge: { kind: 'mat', expect: vt(w) }, start: 'ŷ', html: 'Projection sur W : ŷ = y − proj_a y', ask: 'ŷ =', lines: [eq(`${vt(y)} - ${vt(p)}`, 'On retire la composante normale', 'proj'), eq(vt(w), '', 'proj')] },
      distYW(p, null, 'Distance de y à W : ‖y − ŷ‖ = ‖proj_a y‖'),
    ];
    return partsItem({
      skill: PROJ, level, subgoals: PROJ_SUB, key: `${PROJ}:plane:${vt(a)}${vt(y)}:${level}`, mode: 'free',
      prompt: `Soit W = {x ∈ ℝ⁴ : ${eqText} = 0} et y = ${vR(y)}. Calcule la projection orthogonale ŷ de y sur W, puis la distance de y à W.`,
      hints: hints3(`W est l'orthogonal de a = ${vR(a)} : projette y sur a, puis retire cette composante.`, `proj_a y = (□/${fq(nn)})·a`, `ŷ = ${vR(w)}`),
    }, parts);
  }
  return projItem(5, rng);
}

function projExam(rng, exam) {
  if (exam === 'tf') {
    if (rng.chance(0.3)) {
      const [u1, u2] = orthInts(3, 2, rng, { max: 6 }) || [Qv([1, 0, 1]), Qv([1, 1, -1])];
      const nrm = MX.kernel([u1, u2])[0];
      const n = scaleV(nrm, denOf(nrm));
      const outer = (u) => MX.scale(MX.mul(u.map((x) => [x]), [u]), q(1).div(n2(u)));
      const P = MX.add(outer(u1), outer(u2));
      return tfL({
        skill: PROJ, key: `inj:${vt(u1)}${vt(u2)}`, truth: false, exam: examTag({ exam }),
        statement: `Soit W = Span{${famR([u1, u2])}} ⊂ ℝ³. L'application x ↦ proj_W x est injective.`,
        counter: { kind: 'mapWitness', params: { A: mt(P) }, ask: [{ v: 'x', label: 'x =', shape: [3, 1] }, { v: 'y', label: 'y =', shape: [3, 1] }], answer: { x: vt([0, 0, 0]), y: vt(n) } },
        explanation: `Faux : tout vecteur de W⊥ est envoyé sur 0. Par exemple proj_W ${vR(n)} = proj_W 0 = 0.`,
      });
    }
    const d = projData(rng, { nice: true });
    const truth = rng.chance(0.5);
    const g4 = comb2(d.us.map((u) => [dotQ(d.y, u).div(q(Math.round(Math.sqrt(n2(u).valueOf())))), u]));
    const bad = rng.pick([g4, addV(d.yhat, d.us[0], rng.pick([1, -1]))].filter((v) => !eqV(v, d.yhat)));
    const w = truth ? d.yhat : bad;
    return tfL({
      skill: PROJ, key: `closest:${vt(d.y)}${vt(w)}`, truth, exam: examTag({ exam }), ruleIfTrue: !truth && eqV(w, g4) ? 'g4_proj_no_square' : null,
      statement: `Soit W = Span{${famR(d.us)}} et y = ${vR(d.y)}. Le point de W le plus proche de y est w = ${vR(w)}.`,
      counter: truth ? null : {
        kind: 'vecFamily', params: { want: 'closerInW', basis: d.us.map(vt), y: vt(d.y), w: vt(w) },
        ask: [{ v: 'x', label: 'x =', shape: [4, 1] }], answer: { x: vt(d.yhat) },
      },
      explanation: `${truth ? 'Vrai' : 'Faux'} : la base est orthogonale, le point le plus proche est ŷ = ${combR(d.cs, ['u₁', 'u₂'])} = ${vR(d.yhat)}.`,
    });
  }
  const nonorth = rng.chance(0.6);
  const d = projData(rng, { nice: true, nonorth });
  const nonO = comb2(d.xs.map((x) => [dotQ(d.y, x).div(n2(x)), x]));
  const g4 = comb2(d.us.map((u) => [dotQ(d.y, u).div(q(Math.round(Math.sqrt(n2(u).valueOf())))), u]));
  const flip = addV(scaleV(d.us[0], d.cs[0].neg()), d.us[1], d.cs[1]);
  const nm = nonorth ? 'v' : 'u';
  return mcqDistinct({
    skill: PROJ, level: 4, key: `mcq:${vt(d.xs[0])}${vt(d.xs[1])}${vt(d.y)}`, exam: examTag({ exam }),
    prompt: `Soit W = Span{${famR(d.xs)}} et y = ${vR(d.y)}. La projection orthogonale de y sur W est :`,
    right: vR(d.yhat),
    wrongs: [nonorth ? { html: vR(nonO), rule: 'l_proj_nonorth' } : null, { html: vR(g4), rule: 'g4_proj_no_square' }, { html: vR(d.z), rule: null }].filter(Boolean),
    fillers: [{ html: vR(flip) }, { html: vR(scaleV(d.yhat, 2)) }],
    solution: [
      ...(nonorth ? [{ html: `v₁ = x₁, v₂ = ${vR(d.us[1])}`, note: 'Gram-Schmidt d\'abord' }] : []),
      { html: `ŷ = ${combR(d.cs, [`${nm}₁`, `${nm}₂`])} = ${vR(d.yhat)}`, note: '' },
    ],
  }, rng);
}

// ======================================================================

export const GEN = {
  [DOT]: (level, rng, profile, opts = {}) => (opts.exam ? dotExam(rng, opts.exam) : dotItem(level, rng)),
  [PERP]: (level, rng, profile, opts = {}) => (opts.exam ? perpExam(rng, opts.exam) : perpItem(level, rng)),
  [PROJ]: (level, rng, profile, opts = {}) => (opts.exam ? projExam(rng, opts.exam) : projItem(level, rng)),
};

export { dotQ, n2, rootT, Qv };

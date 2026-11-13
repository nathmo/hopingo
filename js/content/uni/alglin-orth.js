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
import { exprML, parseExpr } from '../../cas/matexpr.js';
import { blankLine } from '../../judges/lines.js';
import {
  q, mt, vt, ML, MLm, opR, fq, qt, polyT, polyR, rrefWith, orthRational, gsReverse, opLines, pickCells,
  withCells, matLines, coefItem, mcqDistinct, tfL, examTag, rowHoles,
} from './alglin-kit.js';
import { MT } from './kit.js';
import { t } from '../../i18n.js';

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
const C = (s) => MT(s);

// √n written out: 3, 2√11 (text for the CAS) — n a whole number ≥ 0.
function rootT(n0) {
  const n = Number(q(n0).valueOf());
  let out = 1;
  let m = n;
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; out *= f; }
  if (m === 1) return String(out);
  return out === 1 ? `√${m}` : `${out}√${m}`;
}

// A sum of numbers as text: 3+0-8.
const sumT = (xs) => xs.map((x, i) => { const s = qt(x); return i === 0 ? s : s.startsWith('-') ? s : `+${s}`; }).join('');
// The same, to read: −2 − 12 + 6.
const sumR = (xs) => xs.map((x, i) => { const s = fq(x); return i === 0 ? s : s.startsWith('−') ? ` − ${s.slice(1)}` : ` + ${s}`; }).join('');
// The terms of a dot product: u₁v₁, u₂v₂…
const prods = (u, v) => u.map((x, i) => q(x).mul(q(v[i])));
const squares = (u) => u.map((x) => q(x).mul(q(x)));

// Σ cₖ·vₖ as text (judges) and to read: (1 ; 2) - 2·(0 ; 1), 2·u₁ − u₂.
function combT(cs0, vs0, show = vt) {
  const keep = cs0.map((c, k) => k === 0 || q(c).n !== 0);
  const cs = cs0.filter((_, k) => keep[k]);
  const vs = vs0.filter((_, k) => keep[k]);
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
  { id: 'dot', label: t('produit scalaire'), skill: DOT },
  { id: 'norm', label: t('norme'), skill: DOT },
  { id: 'angle', label: t('angle et distance'), skill: DOT },
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
const dotPart = (d, { mat = false, html = t('Produit scalaire u · v'), guided = null } = {}) => {
  const terms = sumT(prods(d.u, d.v));
  const judge = mat ? { kind: 'mat', expect: qt(d.d), dot: [d.u.map(qt), d.v.map(qt)] } : { kind: 'value', expect: qt(d.d) };
  // A `mat` line of numbers is final only when computed: one line.
  if (mat) return { judge, start: 'u·v', html, ask: 'u · v =', lines: [eq(qt(d.d), t('{s} : la somme, un nombre', { s: sumR(prods(d.u, d.v)) }), 'dot')] };
  return { judge, start: 'u·v', html, ask: 'u · v =', lines: [guided ? eqG(terms, guided, t('Produits terme à terme'), 'dot') : eq(terms, t('Produits terme à terme'), 'dot'), eq(qt(d.d), t('La somme : un nombre'), 'dot')] };
};
const normPart = (w, name, guided = null) => {
  const s = `√(${sumT(squares(w))})`;
  return {
    judge: { kind: 'value', expect: rootT(n2(w)), form: 'exact' }, start: `√(${name}·${name})`, html: t('Norme ‖{name}‖', { name }), ask: `‖${name}‖ =`,
    lines: [guided ? eqG(s, guided, t('Somme des carrés'), 'norm') : eq(s, t('Somme des carrés'), 'norm'), eq(rootT(n2(w)), t('Racine'), 'norm')],
  };
};
const cosPart = (d, guided = null) => {
  const s = `${qt(d.d)}/(${d.nu}·${d.nv})`;
  return {
    judge: { kind: 'value', expect: qt(cosOf(d)), form: 'exact' }, start: 'cos(θ)', html: t('Angle : cos θ'), ask: 'cos θ =',
    lines: [guided ? eqG(s, guided, 'u · v / (‖u‖‖v‖)', 'angle') : eq(s, 'u · v / (‖u‖‖v‖)', 'angle'), eq(qt(cosOf(d)), '', 'angle')],
  };
};
const distPart = (d, guided = null) => {
  const s = `√(${sumT(squares(d.w))})`;
  return {
    judge: { kind: 'value', expect: rootT(n2(d.w)), form: 'exact' }, start: '√((u-v)·(u-v))', html: t('Distance : dist(u, v) = ‖u − v‖'), ask: 'dist(u, v) =',
    lines: [guided ? eqG(s, guided, t('Norme de u − v'), 'angle') : eq(s, t('Norme de u − v'), 'angle'), eq(rootT(n2(d.w)), '', 'angle')],
  };
};
const diffPart = (d, rng = null) => ({
  judge: { kind: 'mat', expect: vt(d.w) }, start: 'u-v', html: t('Le vecteur u − v'), ask: 'u − v =',
  lines: [rng ? withCells(eq(vt(d.w), t('Composante par composante'), 'angle'), vecCells(d.w, 2, rng)) : eq(vt(d.w), t('Composante par composante'), 'angle')],
});

// Parts → a lines item: the first part is the item's own judge.
function partsItem(o, parts) {
  const [first, ...rest] = parts;
  const script = [...(o.before || []), ...first.lines];
  for (const p of rest) script.push(seg(p.html, p.ask, p.start, p.judge), ...(p.pre || []), ...p.lines);
  const grid = parts.some((p) => ['mat', 'rowops', 'span', 'factor'].includes(p.judge.kind));
  // A part solved for a letter (« a = −1 ») needs the letters and « = ».
  const letters = parts.some((p) => p.judge.kind === 'solset') ? ['letters'] : [];
  return matLines({ ...o, start: first.start, judge: first.judge, script, keys: o.keys || [grid ? 'mat' : 'calc', ...letters] });
}
const withMenu = (p, m) => ({ ...p, judge: { ...p.judge, menu: m } });

function dotItem(level, rng) {
  const n = level >= 4 ? 4 : rng.pick([3, 3, 4]);
  const d = dotData(rng, n);
  const uv = { u: vR(d.u), v: vR(d.v) };
  const key = `${DOT}:${vt(d.u)}${vt(d.v)}`;
  const hints = hints3(
    t('Multiplie terme à terme, puis additionne : u · v est un nombre. ‖u‖ = √(u · u).'),
    `u · v = ${sumR(prods(d.u, d.v)).replace(/\d+$/, '□')}`,
    `u · v = ${fq(d.d)}, ‖u‖ = ${d.nu}, ‖v‖ = ${d.nv}`,
  );
  const base = { skill: DOT, level, subgoals: DOT_SUB, key: `${key}:${level}`, fallback: d.fallback, hints, mode: modeOf(level) };
  if (level === 1) {
    return partsItem({ ...base, prompt: t('Soit u = {u} et v = {v}. Calcule u · v, ‖u‖, ‖v‖, puis cos θ.', uv) },
      [dotPart(d, { guided: [-1] }), normPart(d.u, 'u', [1]), normPart(d.v, 'v', [-1]), cosPart(d, [1, 2])]);
  }
  if (level === 2) {
    const askDist = rng.chance(0.5);
    const decision = askDist
      ? { kind: 'decision', prompt: t('Quelle formule donne la distance de u à v ?'), options: rng.shuffle(menu('dist(u, v) = ‖u − v‖', [
        ['dist(u, v) = ‖u‖ − ‖v‖', t('La distance est la longueur du vecteur u − v ; ‖u‖ − ‖v‖ ne compare que les longueurs.')],
        ['dist(u, v) = u · v', t('u · v mesure un angle (avec les normes), pas un écart entre deux points.')],
      ])) }
      : { kind: 'decision', prompt: t('Quelle formule donne l\'angle θ entre u et v ?'), options: rng.shuffle(menu('cos θ = u · v / (‖u‖‖v‖)', [
        ['cos θ = u · v', t('u · v dépend des longueurs : il faut diviser par ‖u‖‖v‖ pour obtenir un cosinus.')],
        ['cos θ = ‖u‖‖v‖ / (u · v)', t('C\'est l\'inverse : cos θ = u · v / (‖u‖‖v‖), un nombre entre −1 et 1.')],
      ])) };
    const parts = askDist ? [diffPart(d, rng), distPart(d, [0, -1])] : [dotPart(d, { guided: [0, -1] }), normPart(d.u, 'u', [0, 1]), normPart(d.v, 'v', [0, -1]), cosPart(d, [0, 1, 2])];
    return partsItem({ ...base, prompt: askDist ? t('Soit u = {u} et v = {v}. Calcule la distance de u à v.', uv) : t('Soit u = {u} et v = {v}. Calcule cos θ, où θ est l\'angle entre u et v.', uv), before: [decision] }, parts);
  }
  if (level === 3) {
    const unit = scaleV(d.u, q(1, d.nu));
    const unitPart = {
      judge: { kind: 'mat', expect: vt(unit) }, start: 'u/‖u‖', html: t('Vecteur unitaire de même direction que u'), ask: 'u / ‖u‖ =',
      lines: [eq(`(1/${d.nu})·${vt(d.u)}`, t('Diviser par la norme'), 'norm'), eq(vt(unit), '', 'norm')],
    };
    const parts = [
      withMenu(normPart(d.u, 'u'), menu('‖u‖ = √(u · u)', [['‖u‖ = u · u', t('u · u est le carré de la norme : il manque la racine.')], [t('‖u‖ = somme des composantes'), t('La norme est la racine de la somme des <b>carrés</b>.')]])),
      withMenu(unitPart, menu(t('Diviser u par ‖u‖'), [[t('Diviser u par ‖u‖²'), t('Diviser par ‖u‖² donne un vecteur de norme 1/‖u‖, pas 1.')], [t('Diviser u par sa plus grande composante'), t('Le vecteur obtenu n\'a pas une norme 1 en général.')]])),
      withMenu(dotPart(d, { mat: true }), menu(t('Multiplier terme à terme, puis additionner'), [[t('Multiplier terme à terme et garder le vecteur'), t('Le produit scalaire est un nombre : il faut additionner les produits.'), 'l_dot_no_sum']])),
      withMenu(cosPart(d), menu('cos θ = u · v / (‖u‖‖v‖)', [['cos θ = u · v', t('Il faut diviser par ‖u‖‖v‖ pour obtenir un cosinus.')]])),
    ];
    return partsItem({ ...base, prompt: t('Soit u = {u} et v = {v}, avec ‖v‖ = {nv}. Calcule ‖u‖, le vecteur unitaire u/‖u‖, puis cos θ, où θ est l\'angle entre u et v.', { ...uv, nv: d.nv }), tapActions: 'menu' }, parts);
  }
  if (level === 4) return dotParam(rng, base);
  // Level 5: distance and angle, alone.
  return partsItem({ ...base, prompt: t('Soit u = {u} et v = {v}. Calcule dist(u, v), puis cos θ, où θ est l\'angle entre u et v.', uv) },
    [diffPart(d), distPart(d), dotPart(d, { mat: true }), cosPart(d)]);
}

// « Pour quel a u ⊥ v ? » in ℝ⁴, then dist(u, v) by Pythagoras.
function dotParam(rng, base) {
  for (let tr = 0; tr < 200; tr++) {
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
      { judge: { kind: 'mat', vars: ['a'], expect: expr, dot: [uT, v.map(qt)] }, start: 'u·v', html: '', ask: 'u · v =', lines: [eq(terms.replace(/\b1a/, 'a').replace(/-1a/, '-a'), t('Produits terme à terme'), 'dot')] },
      { judge: { kind: 'solset', v: 'a' }, start: `${expr}=0`, html: 'u ⊥ v ⇔ u · v = 0', ask: '', lines: [eq(`a=${qt(a)}`, t('Résoudre'), 'dot')] },
      { judge: { kind: 'value', expect: dist, form: 'exact' }, start: '√((u-v)·(u-v))', html: t('Avec a = {a} : dist(u, v) = ‖u − v‖ (u ⊥ v : Pythagore)', { a: fq(a) }), ask: 'dist(u, v) =', lines: [eq(`√(${qt(n2(uA))}+${qt(n2(v))})`, t('‖u − v‖² = ‖u‖² + ‖v‖² car u ⊥ v'), 'angle'), eq(dist, '', 'angle')] },
    ];
    return partsItem({
      ...base, key: `${DOT}:param:${uRt}${vt(v)}`, prompt: t('Soit u = {u} et v = {v}. Pour quelle valeur de a les vecteurs u et v sont-ils orthogonaux ? Calcule ensuite dist(u, v) pour cette valeur.', { u: uRt, v: vR(v) }),
      hints: hints3(t('u ⊥ v ⇔ u · v = 0 : écris u · v en fonction de a.'), `u · v = ${C(expr)}`, `a = ${fq(a)}`),
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
        statement: t('Pour u, v ∈ ℝⁿ : si ‖u + v‖ = ‖u − v‖, alors u ⊥ v.'),
        explanation: t('Vrai : ‖u + v‖² − ‖u − v‖² = 4 u · v, donc u · v = 0.'),
      });
    }
    if (which === 1) {
      return tfL({
        skill: DOT, key: 'pyth', truth: true, exam: examTag({ exam }),
        statement: t('Pour u, v ∈ ℝⁿ : u ⊥ v si et seulement si ‖u + v‖² = ‖u‖² + ‖v‖².'),
        explanation: t('Vrai : ‖u + v‖² = ‖u‖² + 2 u · v + ‖v‖² (Pythagore).'),
      });
    }
    const [u, v, w] = rng.pick([[[1, 0], [0, 1], [1, 0]], [[1, 0], [0, 1], [2, 0]], [[1, 1], [1, -1], [1, 1]], [[1, 0, 0], [0, 1, 0], [1, 0, 1]]]);
    const s = u.length;
    return tfL({
      skill: DOT, key: `trans:${vt(u)}${vt(w)}`, truth: false, exam: examTag({ exam }), ruleIfTrue: 'l_orth_transitive',
      statement: t('Pour u, v, w ∈ ℝⁿ : si u ⊥ v et v ⊥ w, alors u ⊥ w.'),
      counter: {
        kind: 'vecFamily', params: { want: 'orthNotTransitive' },
        ask: [{ v: 'u', label: 'u =', shape: [s, 1] }, { v: 'v', label: 'v =', shape: [s, 1] }, { v: 'w', label: 'w =', shape: [s, 1] }],
        answer: { u: vt(u), v: vt(v), w: vt(w) },
      },
      explanation: t('Faux : u = {u}, v = {v}, w = {w} donnent u · v = v · w = 0 mais u · w = {uw}.', { u: vR(u), v: vR(v), w: vR(w), uw: fq(dotQ(u, w)) }),
    });
  }
  const d = dotData(rng, rng.pick([3, 4]));
  const uv = { u: vR(d.u), v: vR(d.v) };
  if (rng.chance(0.5)) {
    const p = prods(d.u, d.v);
    const abs = p.reduce((s, x) => s.add(x.n < 0 ? x.neg() : x), q(0));
    return mcqDistinct({
      skill: DOT, level: 4, key: `mcq:dot:${vt(d.u)}${vt(d.v)}`, exam: examTag({ exam }),
      prompt: t('Soit u = {u} et v = {v}. Que vaut u · v ?', uv),
      right: fq(d.d),
      wrongs: [{ html: vR(p), rule: 'l_dot_no_sum' }, { html: fq(abs), rule: null }],
      fillers: [{ html: fq(d.d.neg()) }, { html: fq(d.d.add(2)) }, { html: fq(d.d.sub(2)) }],
      solution: [{ html: `u · v = ${C(sumT(p))} = ${fq(d.d)}`, note: t('La somme des produits terme à terme : un nombre') }],
    }, rng);
  }
  const w2 = n2(d.w);
  const alt = Math.abs(d.nu - d.nv);
  return mcqDistinct({
    skill: DOT, level: 4, key: `mcq:dist:${vt(d.u)}${vt(d.v)}`, exam: examTag({ exam }),
    prompt: t('Soit u = {u} et v = {v}. Que vaut dist(u, v) ?', uv),
    right: C(rootT(w2)),
    wrongs: [{ html: C(qt(w2)), rule: null }, { html: C(String(alt)), rule: null }],
    fillers: [{ html: C(rootT(n2(d.u).add(n2(d.v)))) }, { html: C(rootT(n2(addV(d.u, d.v)))) }],
    solution: [{ html: `u − v = ${vR(d.w)}`, note: '' }, { html: `dist(u, v) = ‖u − v‖ = ${C(`√(${qt(w2)})`)} = ${C(rootT(w2))}`, note: t('Ne pas oublier la racine') }],
  }, rng);
}

// ======================================================================
// l-orth-complement
// ======================================================================

const PERP = 'l-orth-complement';
const PERP_SUB = [
  { id: 'reduce', label: t('réduire'), skill: 'l-sys-rref' },
  { id: 'param', label: t('paramétrer'), skill: 'l-vs-kernel' },
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
  const lines = opLines(d.W, d.ops, { note: (op) => (op.kind === 'scale' ? t('Pivot à 1') : t('Réduire : {op}', { op: opR(op) })), subgoal: 'reduce' });
  const guided = level <= 2;
  const red = { judge: { kind: 'rowops', goal: 'rref' }, start: Mtext, html: t('Réduis M (W⊥ = Ker M).'), ask: '', lines: guided ? lines.map((l) => withCells(l, pickCells(l.result, l.op.kind === 'swap' ? [l.op.i] : [l.op.i], 2, rng))) : lines };
  const fam = { kind: 'eq', math: spanT(d.K), note: t('Une variable libre par vecteur'), subgoal: 'perp' };
  const spanPart = {
    judge: { kind: 'span', basis: d.K.map(vt), require: 'basis', perp: d.W.map((r) => r.map(qt)) }, start: 'W⊥', html: t('Une base de W⊥ (= Ker M).'), ask: 'W⊥ =',
    lines: [level === 3 ? { kind: 'eq', math: paramT(d.K), note: t('Paramétrer : une variable libre par vecteur'), subgoal: 'param' } : guided ? withCells(fam, famCells(d.K, 2, rng)) : fam],
  };
  const matPart = { judge: { kind: 'mat', expect: Mtext }, start: 'M', html: '', ask: 'M =', lines: [guided ? withCells(eq(Mtext, Ttext || t('w₁ et w₂ en lignes'), 'perp'), pickCells(d.W, [0, 1], 2, rng)) : eq(Mtext, Ttext || t('w₁ et w₂ en lignes'), 'perp')] };
  return { matPart, red, spanPart };
}

function perpItem(level, rng) {
  const tpl = level >= 4 ? rng.pick(['basis', 'eq', 'col']) : 'basis';
  if (tpl === 'eq') return perpEquation(level, rng);
  const d = perpData(rng);
  const W = `W = Span{${famR(d.W)}}`;
  const key = `${PERP}:${mt(d.W)}`;
  const hints = hints3(
    t('x ∈ W⊥ ⇔ x · w₁ = 0 et x · w₂ = 0 : c\'est le système homogène de matrice M = [w₁ᵀ ; w₂ᵀ] (vecteurs en lignes).'),
    t('Forme réduite : {R} ; les variables sans pivot sont libres.', { R: MLm(d.R) }),
    `W⊥ = ${ML(spanT(d.K))}`,
  );
  const base = { skill: PERP, level, subgoals: PERP_SUB, key: `${key}:${level}`, fallback: d.fallback, hints, mode: modeOf(level) };
  if (tpl === 'col') {
    const A = MX.transpose(d.W);
    const { matPart, red, spanPart } = perpParts(d, level, rng, { Ttext: t('Aᵀ : les colonnes de A en lignes') });
    matPart.ask = 'Aᵀ =';
    matPart.start = 'A^T';
    matPart.judge = { ...matPart.judge, names: { A: mt(A) } };
    spanPart.html = t('Une base de (Col A)⊥ = Ker Aᵀ.');
    red.html = t('Réduis Aᵀ.');
    spanPart.ask = '(Col A)⊥ =';
    return partsItem({
      ...base, key: `${PERP}:col:${mt(A)}`, prompt: t('Soit A = {A}. Donne une base de (Col A)⊥.', { A: MLm(A) }),
      hints: hints3(t('(Col A)⊥ = Ker Aᵀ : les colonnes de A deviennent les lignes de Aᵀ.'), `Aᵀ = ${MLm(d.W)}`, `(Col A)⊥ = ${ML(spanT(d.K))}`),
    }, [matPart, red, spanPart]);
  }
  const { matPart, red, spanPart } = perpParts(d, level, rng);
  const before = level === 2 ? [{
    kind: 'decision', prompt: t('Comment poser la matrice M dont W⊥ est le noyau ?'), options: rng.shuffle(menu(t('w₁ et w₂ en lignes'), [
      [t('w₁ et w₂ en colonnes'), t('En colonnes, Ker M contient les coefficients des combinaisons nulles de w₁ et w₂, pas les vecteurs orthogonaux à W. Les équations x · wᵢ = 0 sont les lignes.'), 'l_matrix_rows_cols'],
    ])),
  }] : [];
  if (level >= 3) {
    // The matrix M is given: reduce, then the basis.
    return partsItem({ ...base, prompt: level === 3 ? t('Soit {W} ⊂ ℝ⁴. Donne une base de W⊥ : réduis M = {M} (choisis chaque opération), puis paramètre son noyau.', { W, M: MLm(d.W) }) : t('Soit {W} ⊂ ℝ⁴. Donne une base de W⊥ : réduis M = {M}, puis paramètre son noyau.', { W, M: MLm(d.W) }), tapActions: level === 3 ? 'rowops' : null }, [red, spanPart]);
  }
  return partsItem({ ...base, prompt: t('Soit {W} ⊂ ℝ⁴. Pose la matrice M, réduis-la, puis donne une base de W⊥.', { W }), before }, [matPart, red, spanPart]);
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
    prompt: t('Soit W = {x ∈ ℝ⁴ : {e} = 0}. Donne une base de W⊥.', { e: eqText }),
    hints: hints3(t('L\'équation dit a · x = 0 avec a le vecteur des coefficients : W est l\'ensemble des vecteurs orthogonaux à a.'), t('W est de dimension 3, donc W⊥ est de dimension 1.'), `W⊥ = ${ML(spanT([a]))}`),
  }, [{ judge: { kind: 'span', basis: [vt(a)], require: 'basis' }, start: 'W⊥', html: '', ask: 'W⊥ =', lines: [eq(spanT([a]), t('Le vecteur des coefficients de l\'équation'), 'perp')] }]);
}

function perpExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 2);
    if (which === 0) {
      return tfL({
        skill: PERP, key: 'dim', truth: true, exam: examTag({ exam }),
        statement: t('Si W est un sous-espace de ℝⁿ, alors dim W + dim W⊥ = n.'),
        explanation: t('Vrai : W⊥ = Ker M, où M (k × n) a pour lignes une base de W ; le théorème du rang donne dim Ker M = n − k.'),
      });
    }
    if (which === 1) {
      return tfL({
        skill: PERP, key: 'row', truth: true, exam: examTag({ exam }),
        statement: t('Pour toute matrice A, (Lgn A)⊥ = Ker A.'),
        explanation: t('Vrai : Ax = 0 dit exactement que x est orthogonal à chaque ligne de A.'),
      });
    }
    const A = rng.pick([[[1, 1], [0, 0]], [[1, 2], [0, 0]], [[1, 0], [1, 0]], [[0, 1], [0, 0]]]);
    return tfL({
      skill: PERP, key: `col:${mt(MX.mat(A))}`, truth: false, exam: examTag({ exam }),
      statement: t('Pour toute matrice carrée A, (Col A)⊥ = Ker A.'),
      counter: { kind: 'matOne', params: { want: 'colPerpNotKer', n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(MX.mat(A)) } },
      explanation: t('Faux : (Col A)⊥ = Ker Aᵀ. Avec A = {A}, Ker A = {K} et Ker Aᵀ = {KT}.', { A: MLm(MX.mat(A)), K: ML(spanT(MX.kernel(MX.mat(A)))), KT: ML(spanT(MX.kernel(MX.transpose(MX.mat(A))))) }),
    });
  }
  const d = perpData(rng);
  // l_ker_sign: the free entries copied without their sign.
  const sign = d.K.map((v) => v.map((x, c) => (d.pivots.includes(c) ? x.neg() : x)));
  const one = MX.kernel([d.W[0]]);
  const ints = (vs) => vs.map((v) => scaleV(v, denOf(v)));
  return mcqDistinct({
    skill: PERP, level: 4, key: `mcq:${mt(d.W)}`, exam: examTag({ exam }),
    prompt: t('Soit W = Span{{F}} ⊂ ℝ⁴. Laquelle de ces familles est une base de W⊥ ?', { F: famR(d.W) }),
    right: famR(d.K),
    wrongs: [{ html: famR(sign), rule: 'l_ker_sign' }, { html: famR(ints(one)), rule: 'l_perp_one_vector' }, { html: famR(d.W), rule: null }],
    fillers: [{ html: famR([d.K[0], d.W[0]]) }, { html: famR([d.K[0]]) }],
    solution: [{ html: `M = ${MLm(d.W)} → ${MLm(d.R)}`, note: t('Vecteurs en lignes, puis forme réduite') }, { html: `W⊥ = Ker M = ${ML(spanT(d.K))}`, note: '' }],
  }, rng);
}

// ======================================================================
// l-orth-proj
// ======================================================================

const PROJ = 'l-orth-proj';
const PROJ_SUB = [
  { id: 'check', label: t('vérifier l\'orthogonalité'), skill: DOT },
  { id: 'coef', label: t('coefficients'), skill: PROJ },
  { id: 'proj', label: t('projection'), skill: PROJ },
  { id: 'decomp', label: t('décomposer, distance'), skill: PROJ },
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
    html: t('Coefficient de {nm} : y · {nm} / {nm} · {nm}', { nm }), ask: `c${SUBS[k + 1]} =`,
    lines: [guided ? eqG(s, guided, t('Produits scalaires'), 'coef') : eq(s, t('Produits scalaires'), 'coef'), eq(qt(d.cs[k]), '', 'coef')],
  };
};
const yhatPart = (d, rng = null, { name = 'u', us = d.us } = {}) => ({
  judge: { kind: 'mat', expect: vt(d.yhat), proj: { y: d.y.map(qt), basis: d.xs.map((v) => v.map(qt)), orth: us.map((v) => v.map(qt)) } },
  start: 'ŷ', html: t('Projection ŷ = c₁{name}₁ + c₂{name}₂', { name }), ask: 'ŷ =',
  lines: [
    eq(combT(d.cs, us), t('Combinaison des vecteurs de la base'), 'proj'),
    rng ? withCells(eq(vt(d.yhat), '', 'proj'), vecCells(d.yhat, 2, rng)) : eq(vt(d.yhat), '', 'proj'),
  ],
});
const zPart = (d, rng = null) => ({
  judge: { kind: 'mat', expect: vt(d.z) }, start: 'z', html: t('Composante orthogonale z = y − ŷ (dans W⊥)'), ask: 'z =',
  lines: [eq(`${vt(d.y)} - ${vt(d.yhat)}`, 'z = y − ŷ', 'decomp'), rng ? withCells(eq(vt(d.z), t('z est orthogonal à W'), 'decomp'), vecCells(d.z, 2, rng)) : eq(vt(d.z), t('z est orthogonal à W'), 'decomp')],
});
const distYW = (z, guided = null, html = t('Distance de y à W : ‖z‖')) => {
  const s = `√(${sumT(squares(z))})`;
  return {
    judge: { kind: 'value', expect: rootT(n2(z)), form: 'exact' }, start: '√(z·z)', html, ask: 'dist(y, W) =',
    lines: [guided ? eqG(s, guided, t('Norme'), 'decomp') : eq(s, t('Norme'), 'decomp'), eq(rootT(n2(z)), '', 'decomp')],
  };
};
const checkPart = (d, guided = null) => {
  const s = sumT(prods(d.us[0], d.us[1]));
  return {
    judge: { kind: 'value', expect: '0' }, start: 'u_1·u_2', html: t('u₁ · u₂ : la base est-elle orthogonale ?'), ask: 'u₁ · u₂ =',
    lines: [guided ? eqG(s, guided, t('Produits terme à terme'), 'check') : eq(s, t('Produits terme à terme'), 'check'), eq('0', t('Base orthogonale : la formule s\'applique'), 'check')],
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
    nonorth ? t('La formule de projection ne marche qu\'avec une base orthogonale : orthogonalise d\'abord (Gram-Schmidt), puis projette sur v₁, v₂.') : t('La formule ne marche qu\'avec une base orthogonale : ici u₁ · u₂ = 0. Puis ŷ = Σ (y · uᵢ / uᵢ · uᵢ) uᵢ.'),
    `ŷ = □·${name}₁ + □·${name}₂`,
    `ŷ = ${combR(d.cs, [`${name}₁`, `${name}₂`])} = ${vR(d.yhat)}`,
  );
  const base = { skill: PROJ, level, subgoals: PROJ_SUB, key: `${key}:${level}`, fallback: d.fallback, hints, mode: modeOf(level) };
  const yR = `y = ${vR(d.y)}`;
  const ask = t('Calcule la projection orthogonale ŷ de y sur W, la composante z = y − ŷ, puis la distance de y à W.');
  const prompt = `${t('Soit {W} et {y}.', { W, y: yR })} ${ask}`;
  const vOpts = { name, us: d.us };
  if (level === 1) {
    return partsItem({ ...base, prompt },
      [checkPart(d, [0, -1]), coefPart(d, 0, { guided: [0, -1] }), coefPart(d, 1, { guided: [1, -2] }), yhatPart(d, rng), zPart(d, rng), distYW(d.z, [0])]);
  }
  if (level === 2) {
    const d12 = fq(dotQ(d.xs[0], d.xs[1]));
    const decision = nonorth
      ? { kind: 'decision', prompt: t('Peut-on appliquer la formule ŷ = Σ (y · xᵢ / xᵢ · xᵢ) xᵢ ?'), options: rng.shuffle(menu(t('Non : x₁ · x₂ ≠ 0, il faut d\'abord Gram-Schmidt'), [[t('Oui, avec x₁ et x₂ tels quels'), t('x₁ · x₂ = {d} ≠ 0 : la base n\'est pas orthogonale, la formule donnerait un faux ŷ.', { d: d12 }), 'l_proj_nonorth']])) }
      : { kind: 'decision', prompt: t('Peut-on appliquer la formule ŷ = Σ (y · uᵢ / uᵢ · uᵢ) uᵢ ?'), options: rng.shuffle(menu(t('Oui : u₁ · u₂ = 0, la base est orthogonale'), [[t('Non, il faut d\'abord Gram-Schmidt'), t('u₁ · u₂ = 0 : la base est déjà orthogonale, Gram-Schmidt la laisserait telle quelle.')]])) };
    const parts = nonorth
      ? [gs2Part(d, rng), coefPart(d, 0, { name, guided: [0, -1, 1] }), coefPart(d, 1, { name, guided: [0, -1] }), yhatPart(d, rng, vOpts), zPart(d, rng), distYW(d.z, [0, -1])]
      : [coefPart(d, 0, { guided: [0, -1, 1] }), coefPart(d, 1, { guided: [0, -1] }), yhatPart(d, rng), zPart(d, rng), distYW(d.z, [0, -1])];
    return partsItem({ ...base, prompt, before: [decision] }, parts);
  }
  if (level === 3) {
    const m = [
      menu('y · uᵢ / uᵢ · uᵢ', [['y · uᵢ / ‖uᵢ‖', t('Diviser une fois par ‖uᵢ‖ donne une longueur : pour le coefficient du vecteur uᵢ, il faut diviser par ‖uᵢ‖² = uᵢ · uᵢ.'), 'g4_proj_no_square'], ['y · uᵢ', t('Il manque la division par uᵢ · uᵢ (sauf si uᵢ est unitaire).'), 'g4_proj_no_square']]),
      menu('ŷ = c₁u₁ + c₂u₂', [['ŷ = c₁ + c₂', t('ŷ est un vecteur de W : une combinaison de u₁ et u₂.')], ['ŷ = y − c₁u₁ − c₂u₂', t('Ça, c\'est z, la composante orthogonale.')]]),
      menu('z = y − ŷ', [['z = y + ŷ', t('y = ŷ + z, donc z = y − ŷ.')]]),
      menu('dist(y, W) = ‖z‖', [['dist(y, W) = ‖ŷ‖', t('‖ŷ‖ est la longueur de la projection, pas l\'écart entre y et W.')], ['dist(y, W) = ‖y‖ − ‖ŷ‖', t('La distance est ‖y − ŷ‖ = ‖z‖ ; on ne soustrait pas les longueurs.')]]),
    ];
    const parts = [withMenu(coefPart(d, 0), m[0]), withMenu(coefPart(d, 1), m[0]), withMenu(yhatPart(d), m[1]), withMenu(zPart(d), m[2]), withMenu(distYW(d.z), m[3])];
    return partsItem({ ...base, prompt, tapActions: 'menu' }, parts);
  }
  // Levels 4–5: a basis that is not orthogonal: Gram-Schmidt first.
  return partsItem({ ...base, prompt }, [gs2Part(d), yhatPart(d, null, vOpts), zPart(d), distYW(d.z)]);
}

// W = {x : a · x = 0}: project y on the normal a, and subtract.
function projPlane(level, rng) {
  for (let tr = 0; tr < 200; tr++) {
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
      { judge: { kind: 'mat', expect: vt(p), proj: { y: y.map(qt), basis: [a.map(qt)] } }, start: 'p', html: t('Projection de y sur la normale a'), ask: 'proj_a y =', lines: [eq(`(${qt(dd)}/${qt(nn)})·${vt(a)}`, '(y · a / a · a) a', 'coef'), eq(vt(p), '', 'coef')] },
      { judge: { kind: 'mat', expect: vt(w) }, start: 'ŷ', html: t('Projection sur W : ŷ = y − proj_a y'), ask: 'ŷ =', lines: [eq(`${vt(y)} - ${vt(p)}`, t('On retire la composante normale'), 'proj'), eq(vt(w), '', 'proj')] },
      distYW(p, null, t('Distance de y à W : ‖y − ŷ‖ = ‖proj_a y‖')),
    ];
    return partsItem({
      skill: PROJ, level, subgoals: PROJ_SUB, key: `${PROJ}:plane:${vt(a)}${vt(y)}:${level}`, mode: 'free',
      prompt: t('Soit W = {x ∈ ℝ⁴ : {e} = 0} et y = {y}. Calcule la projection orthogonale ŷ de y sur W, puis la distance de y à W.', { e: eqText, y: vR(y) }),
      hints: hints3(t('W est l\'orthogonal de a = {a} : projette y sur a, puis retire cette composante.', { a: vR(a) }), `proj_a y = (□/${fq(nn)})·a`, `ŷ = ${vR(w)}`),
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
        statement: t('Soit W = Span{{F}} ⊂ ℝ³. L\'application x ↦ proj_W x est injective.', { F: famR([u1, u2]) }),
        counter: { kind: 'mapWitness', params: { A: mt(P) }, ask: [{ v: 'x', label: 'x =', shape: [3, 1] }, { v: 'y', label: 'y =', shape: [3, 1] }], answer: { x: vt([0, 0, 0]), y: vt(n) } },
        explanation: t('Faux : tout vecteur de W⊥ est envoyé sur 0. Par exemple proj_W {n} = proj_W 0 = 0.', { n: vR(n) }),
      });
    }
    const d = projData(rng, { nice: true });
    const truth = rng.chance(0.5);
    const g4 = comb2(d.us.map((u) => [dotQ(d.y, u).div(q(Math.round(Math.sqrt(n2(u).valueOf())))), u]));
    const bad = rng.pick([g4, addV(d.yhat, d.us[0], rng.pick([1, -1]))].filter((v) => !eqV(v, d.yhat)));
    const w = truth ? d.yhat : bad;
    return tfL({
      skill: PROJ, key: `closest:${vt(d.y)}${vt(w)}`, truth, exam: examTag({ exam }), ruleIfTrue: !truth && eqV(w, g4) ? 'g4_proj_no_square' : null,
      statement: t('Soit W = Span{{F}} et y = {y}. Le point de W le plus proche de y est w = {w}.', { F: famR(d.us), y: vR(d.y), w: vR(w) }),
      counter: truth ? null : {
        kind: 'vecFamily', params: { want: 'closerInW', basis: d.us.map(vt), y: vt(d.y), w: vt(w) },
        ask: [{ v: 'x', label: 'x =', shape: [4, 1] }], answer: { x: vt(d.yhat) },
      },
      explanation: truth
        ? t('Vrai : la base est orthogonale, le point le plus proche est ŷ = {c} = {y}.', { c: combR(d.cs, ['u₁', 'u₂']), y: vR(d.yhat) })
        : t('Faux : la base est orthogonale, le point le plus proche est ŷ = {c} = {y}.', { c: combR(d.cs, ['u₁', 'u₂']), y: vR(d.yhat) }),
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
    prompt: t('Soit W = Span{{F}} et y = {y}. La projection orthogonale de y sur W est :', { F: famR(d.xs), y: vR(d.y) }),
    right: vR(d.yhat),
    wrongs: [nonorth ? { html: vR(nonO), rule: 'l_proj_nonorth' } : null, { html: vR(g4), rule: 'g4_proj_no_square' }, { html: vR(d.z), rule: null }].filter(Boolean),
    fillers: [{ html: vR(flip) }, { html: vR(scaleV(d.yhat, 2)) }],
    solution: [
      ...(nonorth ? [{ html: `v₁ = x₁, v₂ = ${vR(d.us[1])}`, note: t('Gram-Schmidt d\'abord') }] : []),
      { html: `ŷ = ${combR(d.cs, [`${nm}₁`, `${nm}₂`])} = ${vR(d.yhat)}`, note: '' },
    ],
  }, rng);
}

// ======================================================================
// l-orth-matrices
// ======================================================================

const MATS = 'l-orth-matrices';
const MATS_SUB = [
  { id: 'dots', label: t('produits scalaires des colonnes'), skill: DOT },
  { id: 'inv', label: t('inverse'), skill: MATS },
];

// U = (1/d)·D, D whole (orthRational); its columns cᵢ = Dᵢ/d.
function matsData(rng, n = 3) {
  const U = orthRational(n, rng);
  const d = denOf(U);
  const D = U.map((r) => r.map((x) => x.mul(q(d))));
  return { U, d, D, n, uT: `(1/${d})·${mt(D)}`, cols: MX.transpose(D) };
}
// A matrix expression as written, (1/3)·[[1, 2, 2], …] (not computed).
const MLx = (text) => { try { return `<math>${exprML(parseExpr(text))}</math>`; } catch { return ML(text); } };
const uML = (m) => MLx(m.uT);
const colDot = (m, i, j, guided = null) => {
  const s = `(${sumT(prods(m.cols[i], m.cols[j]))})/${m.d * m.d}`;
  const want = i === j ? '1' : '0';
  return {
    judge: { kind: 'value', expect: want }, start: `c_${i + 1}·c_${j + 1}`, html: i === j ? `‖c${SUBS[i + 1]}‖² = c${SUBS[i + 1]} · c${SUBS[i + 1]}` : `c${SUBS[i + 1]} · c${SUBS[j + 1]}`, ask: i === j ? `‖c${SUBS[i + 1]}‖² =` : `c${SUBS[i + 1]} · c${SUBS[j + 1]} =`,
    lines: [guided ? eqG(s, guided, t('Produits des colonnes, sur {d}', { d: m.d * m.d }), 'dots') : eq(s, t('Produits des colonnes, sur {d}', { d: m.d * m.d }), 'dots'), eq(want, i === j ? t('Norme 1') : t('Orthogonales'), 'dots')],
  };
};
const utuPart = (m, rng = null, names = true) => {
  const I = mt(MX.identity(m.n));
  return {
    judge: { kind: 'mat', expect: I, ...(names ? { names: { U: m.uT } } : {}) }, start: 'UᵀU', html: t('Le test : UᵀU'), ask: 'UᵀU =',
    lines: [rng ? withCells(eq(I, t('Colonnes orthonormées'), 'dots'), pickCells(MX.identity(m.n), [0, 1], 2, rng)) : eq(I, t('Colonnes orthonormées'), 'dots')],
  };
};
const invPart = (m, rng = null) => {
  const Ut = MX.transpose(m.U);
  return {
    judge: { kind: 'mat', expect: mt(Ut), names: { U: m.uT } }, start: 'U^(-1)', html: t('L\'inverse : U⁻¹ = Uᵀ'), ask: 'U⁻¹ =',
    lines: [rng ? withCells(eq(mt(Ut), t('Transposer'), 'inv'), pickCells(Ut, [0, 1], 3, rng)) : eq(mt(Ut), t('Transposer'), 'inv')],
  };
};
// Ux = b ⇒ x = Uᵀb (b whole, x as simple as possible).
function solvePart(m, rng) {
  let b = null;
  let x = null;
  for (let t = 0; t < 60; t++) {
    const bb = Array.from({ length: m.n }, () => q(rng.int(-3, 3)));
    if (isZeroV(bb)) continue;
    const xx = MX.matVec(MX.transpose(m.U), bb);
    if (!x || denOf(xx) < denOf(x)) { b = bb; x = xx; }
    if (denOf(xx) === 1) break;
  }
  return {
    b, x,
    part: {
      judge: { kind: 'mat', expect: vt(x), names: { U: m.uT } }, start: 'x', html: t('Résoudre Ux = {b} sans Gauss : x = Uᵀb', { b: vR(b) }), ask: 'x =',
      lines: [eq(`U^T·${vt(b)}`, 'x = U⁻¹b = Uᵀb', 'inv'), eq(vt(x), '', 'inv')],
    },
  };
}

function matsItem(level, rng) {
  if (level === 5 && rng.chance(0.5)) return matsExam(rng, 'mcq', 5);
  if (level === 4) return matsComplete(rng);
  const m = matsData(rng, 3);
  const key = `${MATS}:${m.uT}:${level}`;
  const hints = hints3(
    t('Teste UᵀU = I : les produits scalaires des colonnes (0 pour deux colonnes différentes, 1 pour une colonne avec elle-même).'),
    `c₁ · c₂ = (${sumR(prods(m.cols[0], m.cols[1])).replace(/\d+$/, '□')})/${m.d * m.d}`,
    t('UᵀU = I : U est orthogonale, et U⁻¹ = Uᵀ.'),
  );
  const base = { skill: MATS, level, subgoals: MATS_SUB, key, hints, mode: modeOf(level) };
  const U = `U = ${uML(m)}`;
  if (level === 1) {
    return partsItem({ ...base, prompt: t('Soit {U}. Vérifie que ses colonnes c₁, c₂, c₃ sont orthonormées (quelques produits scalaires), puis donne U⁻¹.', { U }) },
      [colDot(m, 0, 1, [1, -1]), colDot(m, 1, 2, [0, -1]), colDot(m, 0, 0, [1, 2]), invPart(m, rng)]);
  }
  if (level === 2) {
    const decision = {
      kind: 'decision', prompt: t('Comment savoir si U est orthogonale ?'), options: rng.shuffle(menu(t('Vérifier UᵀU = I (colonnes orthogonales et de norme 1)'), [
        [t('Vérifier que les colonnes sont orthogonales deux à deux'), t('Il faut aussi des colonnes de norme 1 : avec U = 2I, les colonnes sont orthogonales mais UᵀU = 4I.'), 'l_orth_cols_only'],
        [t('Vérifier que det U = 1'), t('det U = ±1 pour une matrice orthogonale, mais la réciproque est fausse : [[2, 0], [0, 1/2]] a det 1.'), 'l_orth_det_one'],
      ])),
    };
    return partsItem({ ...base, prompt: t('Soit {U}. Est-elle orthogonale ? Fais le test, puis donne U⁻¹.', { U }), before: [decision] }, [utuPart(m, rng), invPart(m, rng)]);
  }
  const s = solvePart(m, rng);
  const parts = [utuPart(m, null, level !== 3), invPart(m), s.part];
  if (level === 3) {
    parts[0] = withMenu(parts[0], menu(t('Calculer UᵀU'), [[t('Calculer det U'), t('det U = ±1 ne suffit pas : il faut UᵀU = I.'), 'l_orth_det_one'], [t('Vérifier seulement c₁ · c₂ = 0'), t('Il faut toutes les paires de colonnes, et des colonnes de norme 1.'), 'l_orth_cols_only']]));
    parts[1] = withMenu(parts[1], menu('U⁻¹ = Uᵀ', [['U⁻¹ = (1/det U)·U', t('Cette formule n\'existe pas ; pour une matrice orthogonale, U⁻¹ = Uᵀ.')]]));
    parts[2] = withMenu(parts[2], menu('x = Uᵀb', [['x = Ub', t('Ux = b donne x = U⁻¹b = Uᵀb.')]]));
  }
  return partsItem({ ...base, prompt: t('Soit {U}. Vérifie qu\'elle est orthogonale, donne U⁻¹, puis résous Ux = {b}.', { U, b: vR(s.b) }), tapActions: level === 3 ? 'menu' : null }, parts);
}

// Level 4: complete an orthonormal family into an orthonormal basis.
function matsComplete(rng) {
  const n = rng.chance(0.7) ? 3 : 4;
  const m = matsData(rng, n);
  const cols = MX.transpose(m.U);
  const given = cols.slice(0, n - 1 - (n === 4 ? 1 : 0));
  const rest = cols.slice(given.length);
  const ints = rest.map((c) => scaleV(c, denOf(c)));
  const parts = [
    { judge: { kind: 'span', basis: rest.map(vt), require: n === 3 ? 'basis' : 'orthogonal' }, start: 'w', html: t('Des vecteurs orthogonaux à la famille donnée'), ask: n === 3 ? 'w =' : 'w₁, w₂ =', lines: [eq(ints.map(vt).join(', '), n === 3 ? t('Orthogonal à c₁ et c₂ : un système homogène') : t('Une base orthogonale du complément'), 'dots')] },
    { judge: { kind: 'span', basis: rest.map(vt), require: 'orthonormal' }, start: 'c', html: t('Normaliser'), ask: n === 3 ? 'c₃ =' : 'c₃, c₄ =', lines: [eq(rest.map(vt).join(', '), t('Diviser par la norme'), 'inv')] },
  ];
  return partsItem({
    skill: MATS, level: 4, subgoals: MATS_SUB, key: `${MATS}:complete:${m.uT}`, mode: 'free',
    prompt: n === 3
      ? t('Les vecteurs {F} forment une famille orthonormée de ℝ³. Complète-la en une base orthonormée de ℝ³ : trouve un vecteur orthogonal aux deux, puis normalise.', { F: famR(given) })
      : t('Les vecteurs {F} forment une famille orthonormée de ℝ⁴. Complète-la en une base orthonormée de ℝ⁴ : trouve deux vecteurs orthogonaux entre eux et aux deux autres, puis normalise.', { F: famR(given) }),
    hints: hints3(t('Un vecteur w orthogonal à la famille vérifie cᵢ · w = 0 pour chaque cᵢ : résous ce système homogène, puis divise par la norme.'), t('Par exemple w = {w}', { w: vR(ints[0]).replace(/\d+\)$/, '□)') }), `${famR(rest)}`),
  }, parts);
}

const ORTH_TRUE = ['U⁻¹ = Uᵀ', '‖Ux‖ = ‖x‖ pour tout x', 'Les lignes de U sont orthonormées', '(Ux) · (Uy) = x · y pour tous x, y', 'UUᵀ = I', '|det U| = 1'];
function matsExam(rng, exam, level = 4) {
  const tag = level === 5 ? false : examTag({ exam });
  if (exam === 'tf') {
    const which = rng.int(0, 2);
    if (which === 0) {
      const A = rng.pick([[[1, 0], [0, -1]], [[0, 1], [1, 0]], [[-1, 0], [0, 1]]]);
      return tfL({
        skill: MATS, key: `det:${mt(MX.mat(A))}`, truth: false, exam: tag, ruleIfTrue: 'l_orth_det_one',
        statement: t('Une matrice orthogonale a un déterminant égal à 1.'),
        counter: { kind: 'matOne', params: { want: 'detMinus1Orth' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(MX.mat(A)) } },
        explanation: t('Faux : det U = ±1. {A} est orthogonale (une symétrie) et son déterminant vaut −1.', { A: MLm(MX.mat(A)) }),
      });
    }
    if (which === 1) {
      const k = rng.pick([2, 3]);
      return tfL({
        skill: MATS, key: `cols:${k}`, truth: false, exam: tag, ruleIfTrue: 'l_orth_cols_only',
        statement: t('Si les colonnes d\'une matrice carrée A sont orthogonales deux à deux et non nulles, alors A⁻¹ = Aᵀ.'),
        counter: { kind: 'matOne', params: { want: 'orthCols' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt([[k, 0], [0, k]]) } },
        explanation: t('Faux : il faut aussi des colonnes de norme 1. Avec A = {k}I, AᵀA = {kk}I, donc A⁻¹ = (1/{k})I ≠ Aᵀ.', { k, kk: k * k }),
      });
    }
    return tfL({
      skill: MATS, key: 'prod', truth: true, exam: tag,
      statement: t('Le produit de deux matrices orthogonales n × n est une matrice orthogonale.'),
      explanation: t('Vrai : (UV)ᵀ(UV) = VᵀUᵀUV = VᵀV = I.'),
    });
  }
  // 2019 Q5: which one is not always true? (ORTH_TRUE stays French: the keys are built from it.)
  const trueOnes = rng.shuffle(ORTH_TRUE).slice(0, 3);
  if (rng.chance(0.5)) {
    return mcqDistinct({
      skill: MATS, level, key: `mcq:notalways:${trueOnes.join('|')}`, exam: tag,
      prompt: t('Soit U une matrice n × n orthogonale. Laquelle de ces affirmations n\'est <b>pas</b> forcément vraie ?'),
      right: 'det U = 1',
      wrongs: trueOnes.map((html) => ({ html: t(html), rule: null })),
      solution: [{ html: t('det U = ±1 : une symétrie, comme [[1, 0], [0, −1]], est orthogonale de déterminant −1. Les trois autres affirmations sont toujours vraies.'), note: '' }],
    }, rng);
  }
  return mcqDistinct({
    skill: MATS, level, key: `mcq:always:${trueOnes[0]}`, exam: tag,
    prompt: t('Soit U une matrice n × n orthogonale. Laquelle de ces affirmations est toujours vraie ?'),
    right: t(trueOnes[0]),
    wrongs: [{ html: 'det U = 1', rule: 'l_orth_det_one' }, { html: t('U est symétrique'), rule: null }, { html: 'U + Uᵀ = 2I', rule: null }, { html: t('Les valeurs propres de U valent 1'), rule: null }],
    solution: [{ html: t('{s} : vrai pour toute matrice orthogonale. det U vaut ±1, pas forcément 1.', { s: t(trueOnes[0]) }), note: '' }],
  }, rng);
}

// ======================================================================
// l-orth-gs
// ======================================================================

const GS = 'l-orth-gs';
const GS_SUB = [
  { id: 'proj', label: t('projeter'), skill: PROJ },
  { id: 'sub', label: t('soustraire'), skill: GS },
  { id: 'check', label: t('vérifier'), skill: DOT },
];

// x₁, x₂, x₃ ∈ ℝ⁴ from an orthogonal family (gsReverse): Gram-Schmidt gives
// back v₁, v₂, v₃ with whole coefficients cᵢⱼ. nice: ‖vᵢ‖ whole.
function gsData(rng, { nice = false, k = 3 } = {}) {
  for (let t = 0; t < 200; t++) {
    const vs = nice ? niceOrth(4, k, rng) : orthInts(4, k, rng, { max: 8 });
    if (!vs) continue;
    const { xs, C } = gsReverse(vs, rng, { lo: -2, hi: 2 });
    if (maxAbs(xs) > 7) continue;
    if (k === 3 && (C[0][2] === 0 || C[1][2] === 0)) continue;
    return { vs, xs, C: C.map((r) => r.map((x) => q(x))) };
  }
  const vs = [[1, 1, 0, 1], [2, -1, 1, -1], [0, 1, 0, -1]].map(Qv).slice(0, k);
  const C = [[0, 2, 1], [0, 0, -1], [0, 0, 0]].map((r) => r.map((x) => q(x)));
  const xs = [Qv([1, 1, 0, 1]), Qv([4, 1, 1, 1]), Qv([-1, 3, -1, 1])].slice(0, k);
  return { vs, xs, C, fallback: true };
}
const gsCfg = (d, j) => ({ xs: d.xs.map((v) => v.map(qt)), vs: d.vs.map((v) => v.map(qt)), j });
// vⱼ = xⱼ − Σ cᵢⱼ vᵢ (mat).
const gsVecPart = (d, j, rng = null) => ({
  judge: { kind: 'mat', expect: vt(d.vs[j]), gs: gsCfg(d, j) }, start: `v_${j + 1}`, html: `${vi(j)} = ${xi(j)} − ${d.vs.slice(0, j).map((_, i) => `(${xi(j)} · ${vi(i)} / ${vi(i)} · ${vi(i)}) ${vi(i)}`).join(' − ')}`, ask: `${vi(j)} =`,
  lines: [
    eq(combT([1, ...d.vs.slice(0, j).map((_, i) => d.C[i][j].neg())], [d.xs[j], ...d.vs.slice(0, j)]), t('Retirer les projections sur les vᵢ déjà obtenus'), 'sub'),
    rng ? withCells(eq(vt(d.vs[j]), '', 'sub'), vecCells(d.vs[j], 2, rng)) : eq(vt(d.vs[j]), '', 'sub'),
  ],
});
// cᵢⱼ = xⱼ · vᵢ / vᵢ · vᵢ (value).
const gsCoefPart = (d, i, j, guided = null) => {
  const s = `(${sumT(prods(d.xs[j], d.vs[i]))})/(${sumT(squares(d.vs[i]))})`;
  return {
    judge: { kind: 'value', expect: qt(d.C[i][j]), pc: { y: d.xs[j].map(qt), u: d.vs[i].map(qt) } }, start: `x_${j + 1}·v_${i + 1}/(v_${i + 1}·v_${i + 1})`,
    html: t('Coefficient {c}', { c: `${xi(j)} · ${vi(i)} / ${vi(i)} · ${vi(i)}` }), ask: `c${SUBS[i + 1]}${SUBS[j + 1]} =`,
    lines: [guided ? eqG(s, guided, t('Produits scalaires'), 'proj') : eq(s, t('Produits scalaires'), 'proj'), eq(qt(d.C[i][j]), '', 'proj')],
  };
};
const gsFamPart = (d, rng = null, normalize = false) => {
  const fam = normalize ? d.vs.map((v) => scaleV(v, q(1).div(q(Math.round(Math.sqrt(n2(v).valueOf())))))) : d.vs;
  const line = eq(fam.map(vt).join(', '), normalize ? t('Chaque vᵢ divisé par sa norme') : t('Base orthogonale, dans l\'ordre'), 'check');
  return {
    judge: { kind: 'span', basis: d.xs.map(vt), require: normalize ? 'orthonormal' : 'orthogonal', nested: true }, start: 'B', html: normalize ? t('La base orthonormée (u₁, u₂, u₃)') : t('La base orthogonale (v₁, v₂, v₃)'), ask: normalize ? '(u₁, u₂, u₃) =' : '(v₁, v₂, v₃) =',
    lines: [rng ? withCells(line, famCells(fam, 2, rng)) : line],
  };
};

function gsItem(level, rng) {
  const normalize = level >= 4 && rng.chance(0.3);
  const d = gsData(rng, { nice: normalize });
  const X = `x₁ = ${vR(d.xs[0])}, x₂ = ${vR(d.xs[1])}, x₃ = ${vR(d.xs[2])}`;
  const key = `${GS}:${d.xs.map(vt).join('')}:${level}`;
  const hints = hints3(
    t('v₁ = x₁. Retire de x₂ sa projection sur v₁, puis de x₃ ses projections sur v₁ et sur v₂ (pas sur x₁, x₂).'),
    `v₃ = x₃ − (□/${fq(n2(d.vs[0]))})v₁ − (□/${fq(n2(d.vs[1]))})v₂`,
    `v₂ = ${vR(d.vs[1])}, v₃ = ${vR(d.vs[2])}`,
  );
  const base = { skill: GS, level, subgoals: GS_SUB, key, fallback: d.fallback, hints, mode: modeOf(level) };
  const prompt = normalize ? t('Applique Gram-Schmidt à {X}, puis normalise.', { X }) : t('Applique Gram-Schmidt à {X} (sans normaliser).', { X });
  if (level === 1) {
    return partsItem({ ...base, prompt: `${prompt} v₁ = x₁ ; v₁ · v₁ = ${fq(n2(d.vs[0]))}.` },
      [gsCoefPart(d, 0, 1, [0, -1]), gsVecPart(d, 1, rng), gsCoefPart(d, 0, 2, [0, -2]), gsCoefPart(d, 1, 2, [1, -1]), gsVecPart(d, 2, rng), gsFamPart(d, rng)]);
  }
  if (level === 2) {
    const decision = {
      kind: 'decision', prompt: t('Pour obtenir v₃, sur quels vecteurs projette-t-on x₃ ?'), options: rng.shuffle(menu(t('Sur v₁ et v₂, déjà orthogonaux'), [
        [t('Sur x₁ et x₂'), t('x₁ et x₂ ne sont pas orthogonaux entre eux : les deux projections se recouvrent, et le résultat n\'est pas orthogonal à v₂.'), 'l_gs_use_x'],
      ])),
    };
    const parts = [gsCoefPart(d, 0, 1, [0, 1, -1]), gsVecPart(d, 1, rng), gsCoefPart(d, 0, 2, [0, 1, -1]), gsCoefPart(d, 1, 2, [0, 1, -1]), gsVecPart(d, 2, rng), gsFamPart(d, rng)];
    parts[2] = { ...parts[2], pre: [decision] };
    return partsItem({ ...base, prompt: `${prompt} v₁ = x₁.` }, parts);
  }
  if (level === 3) {
    const m2 = menu('v₂ = x₂ − (x₂ · v₁ / v₁ · v₁) v₁', [
      ['v₂ = x₂ + (x₂ · v₁ / v₁ · v₁) v₁', t('On retire la composante selon v₁ : avec +, v₂ · v₁ ≠ 0.'), 'l_gs_sign'],
      ['v₂ = x₂ − (x₂ · v₁ / ‖v₁‖) v₁', t('Il faut diviser par ‖v₁‖² = v₁ · v₁.'), 'g4_proj_no_square'],
    ]);
    const m3 = menu(t('Retirer de x₃ ses projections sur v₁ et v₂'), [
      [t('Retirer de x₃ ses projections sur x₁ et x₂'), t('x₁ et x₂ ne sont pas orthogonaux : on projette sur v₁ et v₂.'), 'l_gs_use_x'],
      [t('Retirer de x₃ sa projection sur v₂ seulement'), t('Il faut aussi retirer la composante selon v₁.')],
    ]);
    const m4 = menu(t('Écrire la famille (v₁, v₂, v₃)'), [[t('Écrire (x₁, x₂, x₃)'), t('Les xᵢ ne sont pas orthogonaux.')]]);
    return partsItem({ ...base, prompt: `${prompt} ${t('Choisis chaque étape.')}`, tapActions: 'menu' }, [withMenu(gsVecPart(d, 1), m2), withMenu(gsVecPart(d, 2), m3), withMenu(gsFamPart(d), m4)]);
  }
  return partsItem({ ...base, prompt }, [gsVecPart(d, 1), gsVecPart(d, 2), gsFamPart(d, null, normalize)]);
}

function gsExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 2);
    if (which === 0) {
      const F = rng.pick([[[1, 1, 0], [0, 1, 0], [0, 0, 1]], [[1, 2, 0], [0, 1, 0], [0, 0, 1]], [[0, 1, 0], [1, 0, 0], [0, 0, 1]], [[1, 0, 1], [0, 1, 0], [0, 0, 1]]]);
      return tfL({
        skill: GS, key: `canon:${F.map(vt).join('')}`, truth: false, exam: examTag({ exam }),
        statement: t('Gram-Schmidt (suivi d\'une normalisation) transforme toute base de ℝ³ en la base canonique (e₁, e₂, e₃).'),
        counter: { kind: 'vecFamily', params: { want: 'gsNotCanonical', n: 3 }, ask: [{ v: 'F', label: 'x₁, x₂, x₃ =', keys: ['mat'] }], answer: { F: F.map(vt).join(', ') } },
        explanation: t('Faux : v₁ = x₁ garde la direction de x₁. Avec x₁ = {x}, le premier vecteur obtenu est {x}/‖x₁‖ ≠ e₁ (ou l\'ordre des eᵢ change).', { x: vR(F[0]) }),
      });
    }
    return tfL({
      skill: GS, key: `true:${which}`, truth: true, exam: examTag({ exam }),
      statement: which === 1 ? t('Appliqué à une base {x₁, x₂} d\'un plan W, Gram-Schmidt donne une base orthogonale de W.') : t('Gram-Schmidt sur (x₁, …, x_k) donne des vᵢ tels que Span{v₁, …, vⱼ} = Span{x₁, …, xⱼ} pour chaque j.'),
      explanation: t('Vrai : chaque vⱼ est xⱼ moins une combinaison des vecteurs précédents, donc les espaces engendrés restent les mêmes à chaque étape.'),
    });
  }
  const d = gsData(rng, { nice: true });
  const x3 = d.xs[2];
  const [v1, v2] = d.vs;
  const nrm = (v) => q(Math.round(Math.sqrt(n2(v).valueOf())));
  const useX = comb2([[1, x3], ...d.xs.slice(0, 2).map((x) => [dotQ(x3, x).div(n2(x)).neg(), x])]);
  const sign = comb2([[1, x3], [d.C[0][2], v1], [d.C[1][2], v2]]);
  const g4 = comb2([[1, x3], [dotQ(x3, v1).div(nrm(v1)).neg(), v1], [dotQ(x3, v2).div(nrm(v2)).neg(), v2]]);
  if (rng.chance(0.5)) {
    return mcqDistinct({
      skill: GS, level: 4, key: `mcq:v3:${d.xs.map(vt).join('')}`, exam: examTag({ exam }),
      prompt: t('Gram-Schmidt sur x₁ = {x1}, x₂ = {x2}, x₃ = {x3}, sans changer l\'ordre et sans normaliser, donne v₁ = x₁, v₂ = {v2} et v₃ =', { x1: vR(d.xs[0]), x2: vR(d.xs[1]), x3: vR(x3), v2: vR(v2) }),
      right: vR(d.vs[2]),
      wrongs: [{ html: vR(useX), rule: 'l_gs_use_x' }, { html: vR(sign), rule: 'l_gs_sign' }, { html: vR(g4), rule: 'g4_proj_no_square' }],
      fillers: [{ html: vR(addV(d.vs[2], v1)) }, { html: vR(scaleV(d.vs[2], -2)) }],
      solution: [{ html: `v₃ = x₃ − (${fq(dotQ(x3, v1))}/${fq(n2(v1))})v₁ − (${fq(dotQ(x3, v2))}/${fq(n2(v2))})v₂ = ${vR(d.vs[2])}`, note: t('Projeter sur v₁ et v₂') }],
    }, rng);
  }
  // 2018 Q4: v₃ = x₃ + a·v₁ + b·v₂.
  const ab = (a, b) => `a = ${fq(a)}, b = ${fq(b)}`;
  const ux = d.xs.slice(0, 2).map((x) => dotQ(x3, x).div(n2(x)).neg());
  return mcqDistinct({
    skill: GS, level: 4, key: `mcq:ab:${d.xs.map(vt).join('')}`, exam: examTag({ exam }),
    prompt: t('Gram-Schmidt sur x₁ = {x1}, x₂ = {x2}, x₃ = {x3} donne v₁ = x₁, v₂ = {v2}, puis v₃ = x₃ + a·v₁ + b·v₂ avec :', { x1: vR(d.xs[0]), x2: vR(d.xs[1]), x3: vR(x3), v2: vR(v2) }),
    right: ab(d.C[0][2].neg(), d.C[1][2].neg()),
    wrongs: [{ html: ab(d.C[0][2], d.C[1][2]), rule: 'l_gs_sign' }, { html: ab(dotQ(x3, v1).div(nrm(v1)).neg(), dotQ(x3, v2).div(nrm(v2)).neg()), rule: 'g4_proj_no_square' }, { html: ab(ux[0], ux[1]), rule: 'l_gs_use_x' }],
    fillers: [{ html: ab(d.C[1][2].neg(), d.C[0][2].neg()) }, { html: ab(d.C[0][2].neg(), d.C[1][2]) }],
    solution: [{ html: `a = −x₃ · v₁ / v₁ · v₁ = ${fq(d.C[0][2].neg())}, b = −x₃ · v₂ / v₂ · v₂ = ${fq(d.C[1][2].neg())}`, note: '' }],
  }, rng);
}

// ======================================================================
// l-orth-qr
// ======================================================================

const QR = 'l-orth-qr';
const QR_SUB = [
  { id: 'gs', label: 'Gram-Schmidt', skill: GS },
  { id: 'norm', label: t('normaliser'), skill: MATS },
  { id: 'r', label: 'R = QᵀA', skill: QR },
];

// A = [x₁ x₂ x₃] (4 × 3) from an orthogonal family of whole norms (2 or 3):
// Q has entries k/2, k/3 and R is whole (rᵢⱼ = cᵢⱼ‖vᵢ‖, rᵢᵢ = ‖vᵢ‖).
function qrData(rng) {
  const d = gsData(rng, { nice: true });
  const r = d.vs.map((v) => q(Math.round(Math.sqrt(n2(v).valueOf()))));
  const A = MX.fromCols(d.xs);
  const R = d.vs.map((_, i) => d.vs.map((__, j) => (j < i ? q(0) : j === i ? r[i] : d.C[i][j].mul(r[i]))));
  const Q = MX.fromCols(d.vs.map((v, i) => scaleV(v, q(1).div(r[i]))));
  return { ...d, r, A, R, Q };
}
const rName = (i, j) => `r${SUBS[i + 1]}${SUBS[j + 1]}`;
const qrNormPart = (d, i, guided = null) => {
  const s = `√(${sumT(squares(d.vs[i]))})`;
  return {
    judge: { kind: 'value', expect: qt(d.r[i]), form: 'exact' }, start: `√(v_${i + 1}·v_${i + 1})`, html: `${rName(i, i)} = ‖${vi(i)}‖`, ask: `‖${vi(i)}‖ =`,
    lines: [guided ? eqG(s, guided, t('Somme des carrés'), 'norm') : eq(s, t('Somme des carrés'), 'norm'), eq(qt(d.r[i]), '', 'norm')],
  };
};
// rᵢⱼ = qᵢ · xⱼ = (vᵢ · xⱼ)/‖vᵢ‖.
const qrRPart = (d, i, j, guided = null) => {
  const s = `(${sumT(prods(d.vs[i], d.xs[j]))})/${qt(d.r[i])}`;
  return {
    judge: { kind: 'value', expect: qt(d.R[i][j]), qrc: { A: d.A.map((row) => row.map(qt)), i, j } }, start: `q_${i + 1}·x_${j + 1}`, html: `${rName(i, j)} = q${SUBS[i + 1]} · ${xi(j)} = ${vi(i)} · ${xi(j)} / ‖${vi(i)}‖`, ask: `${rName(i, j)} =`,
    lines: [guided ? eqG(s, guided, 'qᵢ = vᵢ/‖vᵢ‖', 'r') : eq(s, 'qᵢ = vᵢ/‖vᵢ‖', 'r'), eq(qt(d.R[i][j]), '', 'r')],
  };
};
const qrFactorPart = (d, rng = null) => ({
  judge: { kind: 'factor', A: mt(d.A), of: 'QR' }, start: 'A', html: t('La factorisation A = QR'), ask: '',
  lines: [eq(`Q = ${mt(d.Q)}`, t('Colonnes vᵢ/‖vᵢ‖'), 'norm'), rng ? withCells(eq(`R = ${mt(d.R)}`, t('R = QᵀA, triangulaire supérieure'), 'r'), pickCells(d.R, [0, 1], 2, rng)) : eq(`R = ${mt(d.R)}`, t('R = QᵀA, triangulaire supérieure'), 'r')],
});

function qrItem(level, rng) {
  if (level === 5) return qrCoef(rng, 5);
  const d = qrData(rng);
  const key = `${QR}:${mt(d.A)}:${level}`;
  const hints = hints3(
    t('Q : les vecteurs de Gram-Schmidt divisés par leur norme. R = QᵀA : rᵢⱼ = qᵢ · xⱼ ; les cases diagonales sont les normes ‖vᵢ‖.'),
    `${rName(1, 2)} = q₂ · x₃ = □`,
    `R = ${MLm(d.R)}`,
  );
  const base = { skill: QR, level, subgoals: QR_SUB, key, fallback: d.fallback, hints, mode: modeOf(level) };
  const A = `A = ${MLm(d.A)}`;
  const vsR = `v₁ = ${vR(d.vs[0])}, v₂ = ${vR(d.vs[1])}, v₃ = ${vR(d.vs[2])}`;
  if (level === 1) {
    return partsItem({ ...base, prompt: t('Soit {A}. Gram-Schmidt sur ses colonnes a donné {V}. Calcule les normes, {r}, puis écris A = QR.', { A, V: vsR, r: rName(1, 2) }) },
      [qrNormPart(d, 0, [0, -1]), qrNormPart(d, 1, [1]), qrNormPart(d, 2, [-1]), qrRPart(d, 1, 2, [0, -1]), qrFactorPart(d, rng)]);
  }
  if (level === 2) {
    const decision = {
      kind: 'decision', prompt: t('Comment calculer rᵢⱼ (i < j) ?'), options: rng.shuffle(menu(t('rᵢⱼ = qᵢ · xⱼ (avec qᵢ = vᵢ/‖vᵢ‖)'), [
        [t('rᵢⱼ = cᵢⱼ, le coefficient de Gram-Schmidt'), t('Avec Q normée, rᵢⱼ = cᵢⱼ·‖vᵢ‖ : le coefficient de Gram-Schmidt doit être multiplié par la norme.'), 'l_qr_r_from_gs'],
        ['rᵢⱼ = vᵢ · xⱼ', t('vᵢ n\'est pas unitaire : il faut qᵢ = vᵢ/‖vᵢ‖, donc diviser par ‖vᵢ‖.')],
      ])),
    };
    return partsItem({ ...base, prompt: t('Soit {A}. Gram-Schmidt sur ses colonnes a donné {V}, de normes {N}. Calcule les rᵢⱼ, puis écris A = QR.', { A, V: vsR, N: d.r.map(fq).join(', ') }), before: [decision] },
      [qrRPart(d, 0, 1, [0, 1, -1]), qrRPart(d, 0, 2, [0, 1, -1]), qrRPart(d, 1, 2, [0, 1, -1]), qrFactorPart(d, rng)]);
  }
  if (level === 3) {
    const m2 = menu('v₂ = x₂ − (x₂ · v₁ / v₁ · v₁) v₁', [['v₂ = x₂ + (x₂ · v₁ / v₁ · v₁) v₁', t('On retire la composante selon v₁.'), 'l_gs_sign']]);
    const m3 = menu(t('Retirer de x₃ ses projections sur v₁ et v₂'), [[t('Retirer de x₃ ses projections sur x₁ et x₂'), t('x₁ et x₂ ne sont pas orthogonaux : on projette sur v₁ et v₂.'), 'l_gs_use_x']]);
    const mf = menu(t('Normaliser les vᵢ, puis R = QᵀA'), [[t('R = la matrice des coefficients de Gram-Schmidt'), t('Avec Q normée, rᵢⱼ = cᵢⱼ·‖vᵢ‖ et rᵢᵢ = ‖vᵢ‖.'), 'l_qr_r_from_gs']]);
    return partsItem({ ...base, prompt: t('Soit {A}. Fais Gram-Schmidt sur ses colonnes, normalise, puis écris A = QR.', { A }), tapActions: 'menu' },
      [withMenu(gsVecPart(d, 1), m2), withMenu(gsVecPart(d, 2), m3), withMenu(qrFactorPart(d), mf)]);
  }
  return partsItem({ ...base, prompt: t('Soit {A}. Calcule la factorisation A = QR (Gram-Schmidt sur les colonnes, puis R = QᵀA).', { A }) }, [gsFamPart(d), qrFactorPart(d)]);
}

// One coefficient of R (exam `coef`, level 5).
function qrCoef(rng, level, exam = null) {
  const d = qrData(rng);
  const [i, j] = level === 5 && rng.chance(0.6) ? [2, 2] : rng.pick([[0, 1], [0, 2], [1, 2], [2, 2], [1, 1]]);
  const it = coefItem({
    skill: QR, level: exam ? 4 : 5, prompt: t('Soit A = {A}, et A = QR sa factorisation QR (Q à colonnes orthonormées, R triangulaire supérieure à diagonale positive). Que vaut {r} ?', { A: MLm(d.A), r: rName(i, j) }),
    label: `r_${i + 1}${j + 1}`, value: qt(d.R[i][j]), key: `${mt(d.A)}:${i}${j}`, exam: exam ? examTag({ exam }) : false,
    askCoef: { label: rName(i, j), path: [i, j], factor: 'R', convention: { diag: 'positive' } },
    traps: [{ rule: 'l_qr_r_from_gs' }], subgoals: QR_SUB, fallback: d.fallback,
    solution: [{ html: `Gram-Schmidt : ${famR(d.vs)}`, note: '' }, { html: `R = ${MLm(d.R)}`, note: 'rᵢⱼ = qᵢ · xⱼ, rᵢᵢ = ‖vᵢ‖' }],
  });
  it.judge.qrc = { A: d.A.map((row) => row.map(qt)), i, j };
  return it;
}

function qrExam(rng, exam) {
  if (exam === 'coef') return qrCoef(rng, 4, exam);
  if (exam === 'tf') {
    if (rng.chance(0.5)) {
      return tfL({
        skill: QR, key: 'qta', truth: true, exam: examTag({ exam }),
        statement: t('Si A = QR avec Q à colonnes orthonormées, alors R = QᵀA.'),
        explanation: t('Vrai : QᵀQ = I, donc QᵀA = QᵀQR = R.'),
      });
    }
    const A = rng.pick([[[1, 2, 0], [1, 2, 1], [0, 0, 1], [1, 2, 0]], [[1, 1, 2], [0, 1, 1], [1, 0, 1], [1, 1, 2]], [[1, 0, 1], [1, 1, 2], [0, 1, 1], [2, 0, 2]]]);
    return tfL({
      skill: QR, key: `free:${mt(MX.mat(A))}`, truth: false, exam: examTag({ exam }),
      statement: t('Toute matrice A de taille 4 × 3 s\'écrit A = QR, avec Q à colonnes orthonormées et R triangulaire supérieure à diagonale strictement positive.'),
      counter: { kind: 'matOne', params: { want: 'singularAtA', n: 4, cols: 3 }, ask: [{ v: 'A', label: 'A =', shape: [4, 3] }], answer: { A: mt(MX.mat(A)) } },
      explanation: t('Faux : il faut des colonnes libres. Si A = QR avec R inversible, AᵀA = RᵀR est inversible ; avec {A}, les colonnes sont liées et AᵀA est singulière.', { A: MLm(MX.mat(A)) }),
    });
  }
  const d = qrData(rng);
  if (rng.chance(0.6)) {
    const x3 = d.xs[2];
    return mcqDistinct({
      skill: QR, level: 4, key: `mcq:r33:${mt(d.A)}`, exam: examTag({ exam }),
      prompt: t('Soit A = {A}. A possède une factorisation QR (Q à colonnes orthonormées, R triangulaire supérieure à diagonale positive) telle que :', { A: MLm(d.A) }),
      right: `r₃₃ = ${fq(d.r[2])}`,
      wrongs: [{ html: 'r₃₃ = 1', rule: 'l_qr_r_from_gs' }, { html: `r₃₃ = ${fq(n2(d.vs[2]))}`, rule: null }, { html: `r₃₃ = ${rootT(n2(x3)).replace('-', '−')}`, rule: null }],
      fillers: [{ html: `r₃₃ = ${fq(d.r[2].add(1))}` }, { html: `r₃₃ = ${fq(d.r[2].neg())}` }],
      solution: [{ html: `v₃ = ${vR(d.vs[2])}`, note: 'Gram-Schmidt' }, { html: `r₃₃ = ‖v₃‖ = ${fq(d.r[2])}`, note: '' }],
    }, rng);
  }
  const [i, j] = rng.pick([[0, 1], [0, 2], [1, 2]]);
  const c = d.C[i][j];
  return mcqDistinct({
    skill: QR, level: 4, key: `mcq:r${i}${j}:${mt(d.A)}`, exam: examTag({ exam }),
    prompt: t('Soit A = {A} et A = QR sa factorisation QR (diagonale de R positive). Que vaut {r} ?', { A: MLm(d.A), r: rName(i, j) }),
    right: fq(d.R[i][j]),
    wrongs: [{ html: fq(c), rule: 'l_qr_r_from_gs' }, { html: fq(c.mul(n2(d.vs[i]))), rule: null }],
    fillers: [{ html: fq(d.R[i][j].neg()) }, { html: fq(d.R[i][j].add(1)) }, { html: fq(d.R[i][j].sub(1)) }],
    solution: [{ html: `${rName(i, j)} = q${SUBS[i + 1]} · ${xi(j)} = ${fq(c)}·‖${vi(i)}‖ = ${fq(d.R[i][j])}`, note: '' }],
  }, rng);
}

// ======================================================================
// l-orth-lsq
// ======================================================================

const LSQ = 'l-orth-lsq';
const LSQ_SUB = [
  { id: 'normal', label: t('équations normales'), skill: LSQ },
  { id: 'reduce', label: t('réduire'), skill: 'l-sys-rref' },
  { id: 'check', label: t('vérifier'), skill: PERP },
];
const LINE_XS = { 4: [[0, 1, 2, 3], [-1, 0, 1, 2], [-2, -1, 1, 2], [0, 1, 2, 4], [-1, 0, 2, 3], [1, 2, 3, 4], [0, 2, 3, 5]], 5: [[-2, -1, 0, 1, 2], [0, 1, 2, 3, 4], [-1, 0, 1, 2, 3], [0, 1, 2, 3, 5]] };

// A (m × n) whole, x̂ whole, r ∈ Ker Aᵀ whole and non-zero, b = Ax̂ + r.
// kind: 'line' (columns 1 and x), 'gen2' (4 × 2), 'gen3' (4 × 3).
function lsqData(rng, kind) {
  for (let t = 0; t < 200; t++) {
    let A;
    let xs = null;
    if (kind === 'line') {
      xs = rng.pick(LINE_XS[rng.chance(0.6) ? 4 : 5]);
      A = xs.map((x) => [q(1), q(x)]);
    } else {
      const n = kind === 'gen3' ? 3 : 2;
      A = Array.from({ length: 4 }, () => Array.from({ length: n }, () => q(rng.int(-2, 2))));
      if (MX.rank(A) < n || A.some((r) => r.every((x) => x.n === 0))) continue;
    }
    const n = A[0].length;
    const xhat = Array.from({ length: n }, () => q(rng.int(-3, 3)));
    if (xhat.some((x) => x.n === 0)) continue;
    const r = kerInt(MX.transpose(A), rng);
    if (!r || maxAbs([r]) > 3) continue;
    const b = addV(MX.matVec(A, xhat), r);
    if (maxAbs([b]) > 12) continue;
    const At = MX.transpose(A);
    const AtA = MX.mul(At, A);
    const Atb = MX.matVec(At, b);
    if (maxAbs([AtA.flat(), Atb]) > 60 || AtA[0][1].n === 0) continue;
    const M = AtA.map((row, i) => [...row, Atb[i]]);
    const red = MX.rref(M);
    if (red.ops.length > (n === 2 ? 5 : 8)) continue;
    let X = M;
    let ok = true;
    for (const op of red.ops) { X = MX.applyOp(X, op); if ((op.kind === 'add' && op.k.d > 4) || X.flat().some((x) => x.d > 4 || Math.abs(x.valueOf()) > 99)) ok = false; }
    if (!ok) continue;
    // The first n equations must have one solution, other than x̂ (trap).
    const sq = A.slice(0, n);
    if (MX.det(sq).n === 0) continue;
    return { A, b, xhat, r, AtA, Atb, M, ops: red.ops, xs, kind, n };
  }
  const A = MX.mat([[1, 0], [1, 1], [1, 2], [1, 3]]);
  const b = Qv([2, 1, 2, 5]);
  const AtA = MX.mul(MX.transpose(A), A);
  const Atb = MX.matVec(MX.transpose(A), b);
  const M = AtA.map((row, i) => [...row, Atb[i]]);
  return { A, b, xhat: Qv([1, 1]), r: Qv([1, -1, -1, 1]), AtA, Atb, M, ops: MX.rref(M).ops, xs: [0, 1, 2, 3], kind: 'line', n: 2, fallback: true };
}
const lsqCfg = (d, ask, extra = {}) => ({ A: d.A.map((r) => r.map(qt)), b: d.b.map(qt), ask, line: d.kind === 'line', ...extra });
function lineText(b0, b1) {
  const c1 = q(b1);
  if (c1.n === 0) return `y = ${fq(b0)}`;
  const s1 = c1.eq(1) ? 'x' : c1.eq(-1) ? '−x' : `${fq(c1)}x`;
  if (q(b0).n === 0) return `y = ${s1}`;
  return `y = ${fq(b0)} ${s1.startsWith('−') ? `− ${s1.slice(1)}` : `+ ${s1}`}`;
}
const ptsR = (d) => d.xs.map((x, i) => `(${fq(x)} ; ${fq(d.b[i])})`).join(', ');

const lsqAtAPart = (d, rng = null, names = true) => ({
  judge: { kind: 'mat', expect: mt(d.AtA), lsq: lsqCfg(d, 'AtA'), ...(names ? { names: { A: mt(d.A) } } : {}) }, start: 'AᵀA', html: t('Équations normales : AᵀA'), ask: 'AᵀA =',
  lines: [...(names && !rng ? [eq('A^T·A', t('Aᵀ à gauche'), 'normal')] : []), rng ? withCells(eq(mt(d.AtA), '', 'normal'), pickCells(d.AtA, [0, 1], 2, rng)) : eq(mt(d.AtA), t('Produits des colonnes de A'), 'normal')],
});
const lsqAtbPart = (d, rng = null, names = true) => ({
  judge: { kind: 'mat', expect: vt(d.Atb), ...(names ? { names: { A: mt(d.A) } } : {}) }, start: 'Aᵀb', html: t('Équations normales : Aᵀb'), ask: 'Aᵀb =',
  lines: [...(names && !rng ? [eq(`A^T·${vt(d.b)}`, '', 'normal')] : []), rng ? withCells(eq(vt(d.Atb), t('Colonnes de A · b'), 'normal'), vecCells(d.Atb, 1, rng)) : eq(vt(d.Atb), t('Colonnes de A · b'), 'normal')],
});
const lsqRedPart = (d, rng = null, multi = false) => {
  const lines = opLines(d.M, d.ops, { bar: d.n, note: (op) => (op.kind === 'scale' ? t('Pivot à 1') : op.kind === 'swap' ? t('Échange') : t('Réduire : {op}', { op: opR(op) })), subgoal: 'reduce' });
  return {
    judge: { kind: 'rowops', goal: 'rref', multi }, start: mt(d.M, d.n), html: t('Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].'), ask: '',
    lines: rng ? lines.map((l) => withCells(l, pickCells(l.result, [l.op.i], 2, rng))) : lines,
  };
};
const lsqXPart = (d, rng = null) => {
  const note = d.kind === 'line' ? t('Droite {l}', { l: lineText(d.xhat[0], d.xhat[1]) }) : t('Lue sur la forme réduite');
  return {
    judge: { kind: 'mat', expect: vt(d.xhat), lsq: lsqCfg(d, 'x') }, start: 'x̂', html: d.kind === 'line' ? t('La solution x̂ = (β₀ ; β₁)') : t('La solution aux moindres carrés x̂'), ask: 'x̂ =',
    lines: [rng ? withCells(eq(vt(d.xhat), note, 'normal'), vecCells(d.xhat, 1, rng)) : eq(vt(d.xhat), note, 'normal')],
  };
};
const lsqResPart = (d) => ({
  judge: { kind: 'mat', expect: vt(d.r), names: { A: mt(d.A) } }, start: 'b - Ax̂', html: t('Le résidu b − Ax̂ (orthogonal aux colonnes de A)'), ask: 'b − Ax̂ =',
  lines: [eq(`${vt(d.b)} - A·${vt(d.xhat)}`, '', 'check'), eq(vt(d.r), 'Aᵀ(b − Ax̂) = 0', 'check')],
});
const lsqErrPart = (d) => ({
  judge: { kind: 'value', expect: rootT(n2(d.r)), form: 'exact' }, start: '√(r·r)', html: t('L\'erreur ‖b − Ax̂‖'), ask: '‖b − Ax̂‖ =',
  lines: [eq(`√(${sumT(squares(d.r))})`, '', 'check'), eq(rootT(n2(d.r)), '', 'check')],
});

// The prompt, one whole sentence per variant: l1, l2, l3 (levels), end
// (« … x̂. »), err (« …, puis l'erreur »), coef (one component, extra.name).
function lsqPrompt(d, v, extra = {}) {
  if (d.kind === 'line') {
    const o = { pts: ptsR(d), ...extra };
    const ab = { ...o, A: MLm(d.A), b: vR(d.b) };
    if (v === 'l1') return t('Trouve la droite des moindres carrés y = β₀ + β₁x pour les points {pts}. Ici A = {A} (colonne de 1, colonne des x) et b = {b}. Calcule AᵀA et Aᵀb, puis résous les équations normales.', ab);
    if (v === 'l2') return t('Trouve la droite des moindres carrés y = β₀ + β₁x pour les points {pts}. Ici A = {A} (colonne de 1, colonne des x) et b = {b}.', ab);
    if (v === 'l3') return t('Trouve la droite des moindres carrés y = β₀ + β₁x pour les points {pts} : pose A et b, calcule AᵀA et Aᵀb, puis réduis (choisis chaque opération).', o);
    if (v === 'coef') return t('On cherche la droite des moindres carrés y = β₀ + β₁x pour les points {pts}. Que vaut {name} ?', o);
    return t('Trouve la droite des moindres carrés y = β₀ + β₁x pour les points {pts}.', o);
  }
  const o = { A: MLm(d.A), b: vR(d.b), ...extra };
  if (v === 'l1') return t('Soit A = {A} et b = {b}. Le système Ax = b est incompatible. Trouve la solution aux moindres carrés x̂. Calcule AᵀA et Aᵀb, puis résous les équations normales.', o);
  if (v === 'l3') return t('Soit A = {A} et b = {b}. Le système Ax = b est incompatible. Trouve la solution aux moindres carrés x̂ : équations normales, puis réduction (choisis chaque opération).', o);
  if (v === 'err') return t('Soit A = {A} et b = {b}. Le système Ax = b est incompatible. Trouve la solution aux moindres carrés x̂, puis l\'erreur ‖b − Ax̂‖.', o);
  if (v === 'coef') return t('Soit A = {A} et b = {b}. Le système Ax = b est incompatible. Soit x̂ la solution aux moindres carrés. Que vaut {name} ?', o);
  return t('Soit A = {A} et b = {b}. Le système Ax = b est incompatible. Trouve la solution aux moindres carrés x̂.', o);
}

function lsqItem(level, rng) {
  if (level === 5 && rng.chance(0.5)) return lsqCoef(rng, 5);
  const kind = level === 4 ? rng.pick(['gen3', 'gen2', 'line']) : level === 5 ? 'line' : rng.pick(['line', 'line', 'gen2']);
  const d = lsqData(rng, kind);
  const key = `${LSQ}:${mt(d.A)}${vt(d.b)}:${level}`;
  const hints = hints3(t('Multiplie Ax = b à gauche par Aᵀ : les équations normales AᵀAx = Aᵀb ont une solution.'), `AᵀA = ${rowHoles(d.AtA, 0, null, 1).replace(/^\[/, '[[')}, …]`, `[AᵀA | Aᵀb] = ${MLm(d.M, d.n)} ; x̂ = ${vR(d.xhat)}`);
  const base = { skill: LSQ, level, subgoals: LSQ_SUB, key, fallback: d.fallback, hints, mode: modeOf(level) };
  if (level === 1) {
    return partsItem({ ...base, prompt: lsqPrompt(d, 'l1') },
      [lsqAtAPart(d, rng), lsqAtbPart(d, rng), lsqRedPart(d, rng), lsqXPart(d, rng)]);
  }
  if (level === 2) {
    const decision = {
      kind: 'decision', prompt: t('Comment trouver x̂ ?'), options: rng.shuffle(menu(t('Résoudre les équations normales AᵀAx = Aᵀb'), [
        [t('Résoudre Ax = b'), t('Ax = b est incompatible : b n\'est pas dans Col A. On cherche le x̂ qui rend Ax̂ le plus proche de b.')],
        [t('Résoudre AAᵀx = Ab'), t('On multiplie Ax = b à gauche par Aᵀ : AᵀA a la taille de x, AAᵀ celle de b.'), 'l_lsq_normal_aat'],
      ])),
    };
    return partsItem({ ...base, prompt: lsqPrompt(d, 'l2'), before: [decision] }, [lsqAtAPart(d, rng), lsqAtbPart(d, rng), lsqRedPart(d, rng), lsqXPart(d, rng)]);
  }
  if (level === 3) {
    const parts = [lsqAtAPart(d, null, false), lsqAtbPart(d, null, false), lsqRedPart(d), lsqXPart(d)];
    if (d.kind === 'line') {
      parts.unshift(
        { judge: { kind: 'mat', expect: mt(d.A) }, start: 'A', html: '', ask: 'A =', lines: [eq(mt(d.A), t('Une colonne de 1, une colonne des x'), 'normal')] },
        { judge: { kind: 'mat', expect: vt(d.b) }, start: 'b', html: t('Le second membre'), ask: 'b =', lines: [eq(vt(d.b), t('Les y des points'), 'normal')] },
      );
    }
    return partsItem({ ...base, prompt: lsqPrompt(d, 'l3'), tapActions: 'rowops' }, parts);
  }
  const parts = [lsqAtAPart(d), lsqAtbPart(d), lsqRedPart(d, null, level >= 4), lsqXPart(d)];
  if (level === 4 && d.kind !== 'line') parts.push(lsqResPart(d), lsqErrPart(d));
  return partsItem({ ...base, prompt: lsqPrompt(d, level === 4 && d.kind !== 'line' ? 'err' : 'end') }, parts);
}

// One component of x̂ (exam `coef`, level 5).
function lsqCoef(rng, level, exam = null) {
  const d = lsqData(rng, rng.pick(['gen2', 'gen3', 'line']));
  const i = rng.int(0, d.n - 1);
  const label = d.kind === 'line' ? `β_${i}` : `x_${i + 1}`;
  const name = d.kind === 'line' ? `β${SUBS[i]}` : `x̂${SUBS[i + 1]}`;
  const it = coefItem({
    skill: LSQ, level: exam ? 4 : 5, prompt: lsqPrompt(d, 'coef', { name }),
    label, value: qt(d.xhat[i]), key: `${mt(d.A)}${vt(d.b)}:${i}`, exam: exam ? examTag({ exam }) : false,
    askCoef: { label: name, path: [i] },
    traps: [{ rule: 'l_lsq_square_subsystem' }, ...(d.kind === 'line' ? [{ rule: 'l_lsq_line_swap' }] : [])], subgoals: LSQ_SUB, fallback: d.fallback,
    solution: [{ html: `[AᵀA | Aᵀb] = ${MLm(d.M, d.n)}`, note: t('Équations normales') }, { html: `x̂ = ${vR(d.xhat)}`, note: '' }],
  });
  it.judge.lsq = lsqCfg(d, 'x', { i });
  return it;
}

function lsqExam(rng, exam) {
  if (exam === 'coef') return lsqCoef(rng, 4, exam);
  if (exam === 'tf') {
    const which = rng.int(0, 2);
    if (which === 0) {
      return tfL({
        skill: LSQ, key: 'min', truth: true, exam: examTag({ exam }),
        statement: t('Si w est une solution de AᵀAx = Aᵀb, alors ‖b − Aw‖ ≤ ‖b − Au‖ pour tout u.'),
        explanation: t('Vrai : Aw est alors la projection orthogonale de b sur Col A, le point de Col A le plus proche de b.'),
      });
    }
    if (which === 1) {
      return tfL({
        skill: LSQ, key: 'same', truth: true, exam: examTag({ exam }),
        statement: t('Si x̂ et x̃ sont deux solutions aux moindres carrés de Ax = b, alors Ax̂ = Ax̃.'),
        explanation: t('Vrai : Ax̂ et Ax̃ sont tous deux la projection orthogonale de b sur Col A, qui est unique.'),
      });
    }
    const A = rng.pick([[[1, 2], [1, 2], [1, 2]], [[1, 1], [2, 2], [0, 0]], [[1, 0], [0, 0], [0, 0]], [[2, 4], [1, 2], [0, 0]]]);
    return tfL({
      skill: LSQ, key: `ata:${mt(MX.mat(A))}`, truth: false, exam: examTag({ exam }),
      statement: t('Pour toute matrice A, la matrice AᵀA est inversible.'),
      counter: { kind: 'matOne', params: { want: 'singularAtA' }, ask: [{ v: 'A', label: 'A =', shape: [A.length, 2] }], answer: { A: mt(MX.mat(A)) } },
      explanation: t('Faux : AᵀA est inversible si et seulement si les colonnes de A sont libres. Avec A = {A}, elles sont liées.', { A: MLm(MX.mat(A)) }),
    });
  }
  const d = lsqData(rng, rng.chance(0.6) ? 'line' : 'gen2');
  const sub2 = MX.matVec(MX.inverse(d.A.slice(0, 2)), d.b.slice(0, 2));
  if (d.kind === 'line') {
    return mcqDistinct({
      skill: LSQ, level: 4, key: `mcq:${vt(d.b)}${d.xs.join(',')}`, exam: examTag({ exam }),
      prompt: t('La droite des moindres carrés y = β₀ + β₁x pour les points {pts} est :', { pts: ptsR(d) }),
      right: lineText(d.xhat[0], d.xhat[1]),
      wrongs: [{ html: lineText(d.xhat[1], d.xhat[0]), rule: 'l_lsq_line_swap' }, { html: lineText(sub2[0], sub2[1]), rule: 'l_lsq_square_subsystem' }],
      fillers: [{ html: lineText(d.xhat[0].neg(), d.xhat[1]) }, { html: lineText(d.xhat[0], d.xhat[1].neg()) }, { html: lineText(d.xhat[0].add(1), d.xhat[1]) }],
      solution: [{ html: `[AᵀA | Aᵀb] = ${MLm(d.M, d.n)}`, note: t('Équations normales') }, { html: `β₀ = ${fq(d.xhat[0])}, β₁ = ${fq(d.xhat[1])}`, note: '' }],
    }, rng);
  }
  return mcqDistinct({
    skill: LSQ, level: 4, key: `mcq:${mt(d.A)}${vt(d.b)}`, exam: examTag({ exam }),
    prompt: t('Soit A = {A} et b = {b}. La solution aux moindres carrés de Ax = b est :', { A: MLm(d.A), b: vR(d.b) }),
    right: vR(d.xhat),
    wrongs: [{ html: vR(sub2), rule: 'l_lsq_square_subsystem' }],
    fillers: [{ html: vR([d.xhat[1], d.xhat[0]]) }, { html: vR(scaleV(d.xhat, -1)) }, { html: vR(addV(d.xhat, [1, 0])) }, { html: vR(addV(d.xhat, [0, 1])) }],
    solution: [{ html: `[AᵀA | Aᵀb] = ${MLm(d.M, d.n)}`, note: t('Équations normales') }, { html: `x̂ = ${vR(d.xhat)}`, note: '' }],
  }, rng);
}

// ======================================================================
// l-orth-inner
// ======================================================================

const INNER = 'l-orth-inner';
const INNER_SUB = [
  { id: 'eval', label: t('évaluer'), skill: INNER },
  { id: 'proj', label: t('projection'), skill: PROJ },
];
// p(t) for p given by its coefficients (constant first).
const evalP = (cs, t) => cs.reduceRight((s, c) => s.mul(q(t)).add(q(c)), q(0));
const ipP = (p, r, pts) => pts.reduce((s, t) => s.add(evalP(p, t).mul(evalP(r, t))), q(0));
const par = (x) => (q(x).n < 0 || q(x).d !== 1 ? `(${qt(x)})` : qt(x));
// p(t₁)·r(t₁) + … as text.
const ipText = (p, r, pts) => pts.map((t) => `${par(evalP(p, t))}·${par(evalP(r, t))}`).join('+');
const ptsDef = (pts) => pts.map((t) => `p(${fq(t)})q(${fq(t)})`).join(' + ');
const polyD = (cs) => polyR(cs.map((c) => q(c)));

const ipPart = (p, r, pts, names, guided = null) => {
  const s = ipText(p, r, pts);
  const v = ipP(p, r, pts);
  return {
    judge: { kind: 'value', expect: qt(v) }, start: `${names[0]}·${names[1]}`, html: `⟨${names[0]}, ${names[1]}⟩`, ask: `⟨${names[0]}, ${names[1]}⟩ =`,
    lines: [guided ? eqG(s, guided, t('Valeurs aux points, multipliées'), 'eval') : eq(s, t('Valeurs aux points, multipliées'), 'eval'), eq(qt(v), '', 'eval')],
  };
};
const randPoly = (rng) => { for (;;) { const cs = [rng.int(-2, 2), rng.int(-2, 2), rng.int(-2, 2)]; if (cs[1] || cs[2]) return cs; } };

function innerItem(level, rng) {
  if (level === 2) return innerAxiom(rng);
  if (level === 3 || (level === 5 && rng.chance(0.5))) return innerProj(level, rng);
  if (level === 4) return innerGS(rng);
  if (level === 5) return innerSingular(rng);
  // Level 1: one inner product, then a norm.
  const pts = rng.pick([[-1, 0, 1], [-1, 0, 1], [0, 1, 2], [-2, 0, 2], [-1, 1, 2]]);
  let p;
  let r;
  for (let t = 0; t < 100; t++) {
    p = randPoly(rng);
    r = randPoly(rng);
    if (ipP(p, r, pts).n !== 0 && p.join() !== r.join() && ipP(p, p, pts).valueOf() <= 40) break;
  }
  const np = ipP(p, p, pts);
  const normPart = {
    judge: { kind: 'value', expect: rootT(np), form: 'exact' }, start: '√(p·p)', html: '‖p‖ = √⟨p, p⟩', ask: '‖p‖ =',
    lines: [eqG(`√(${pts.map((x) => `${par(evalP(p, x))}^2`).join('+')})`, [0, 2], t('Somme des carrés des valeurs'), 'eval'), eq(rootT(np), '', 'eval')],
  };
  return partsItem({
    skill: INNER, level, subgoals: INNER_SUB, key: `${INNER}:${p}:${r}:${pts}`, mode: 'guided', keys: ['calc'],
    prompt: t('Sur P₂, on pose ⟨p, q⟩ = {def}. Soit p = {p} et q = {q}. Calcule ⟨p, q⟩, puis ‖p‖.', { def: ptsDef(pts), p: polyD(p), q: polyD(r) }),
    hints: hints3(t('Calcule les valeurs de p et de q aux points, multiplie-les deux à deux, puis additionne.'), `p : ${pts.map((x) => `p(${fq(x)}) = ${fq(evalP(p, x))}`).join(', ')}`, `⟨p, q⟩ = ${fq(ipP(p, r, pts))}`),
  }, [ipPart(p, r, pts, ['p', 'q'], [0, 3]), normPart]);
}

// Level 2: two points on P₂: which axiom fails?
function innerAxiom(rng) {
  const [a, b] = rng.pick([[0, 1], [-1, 1], [0, 2], [1, 2], [-1, 0], [-1, 2]]);
  const r = [a * b, -(a + b), 1];
  const ip = `p(${fq(a)})q(${fq(a)}) + p(${fq(b)})q(${fq(b)})`;
  const decision = {
    kind: 'decision', prompt: t('Quel axiome tombe ?'), options: rng.shuffle(menu(t('Défini positif : un polynôme non nul peut avoir ⟨p, p⟩ = 0'), [
      [t('La symétrie'), t('{e} ne change pas si on échange p et q.', { e: ip })],
      [t('La linéarité'), t('Chaque terme est linéaire en p (et en q) : la somme aussi.')],
    ])),
  };
  return partsItem({
    skill: INNER, level: 2, subgoals: INNER_SUB, key: `${INNER}:axiom:${a},${b}`, mode: 'guided', keys: ['calc'],
    prompt: t('Sur P₂, on pose ⟨p, q⟩ = {def}. Est-ce un produit scalaire ? Teste p = {p}.', { def: ip, p: polyD(r) }),
    before: [decision],
    hints: hints3(t('Un produit scalaire vérifie ⟨p, p⟩ > 0 pour tout p ≠ 0. Cherche un polynôme non nul qui s\'annule aux deux points.'), `p(${fq(a)}) = □, p(${fq(b)}) = □`, t('⟨p, p⟩ = 0 alors que p ≠ 0')),
  }, [ipPart(r, r, [a, b], ['p', 'p'], [0, -1])]);
}

// Projection of q on Span{1, t} (symmetric points: 1 ⊥ t).
function innerProj(level, rng) {
  const pts = rng.pick([[-1, 0, 1], [-2, 0, 2]]);
  let r;
  for (let t = 0; t < 50; t++) { r = randPoly(rng); if (r[2]) break; }
  const one = [1, 0, 0];
  const tt = [0, 1, 0];
  const a = ipP(r, one, pts);
  const n0 = ipP(one, one, pts);
  const b = ipP(r, tt, pts);
  const n1 = ipP(tt, tt, pts);
  const c0 = a.div(n0);
  const c1 = b.div(n1);
  const coefP = (num, den, c, nm) => ({
    judge: { kind: 'value', expect: qt(c), ...(level === 3 ? { menu: menu(`⟨q, ${nm}⟩ / ⟨${nm}, ${nm}⟩`, [[`⟨q, ${nm}⟩`, t('Il faut diviser par ⟨{nm}, {nm}⟩ = {v}.', { nm, v: fq(num === a ? n0 : n1) }), 'g4_proj_no_square'], [`⟨q, ${nm}⟩ / ‖${nm}‖`, t('Il faut diviser par ‖{nm}‖² = ⟨{nm}, {nm}⟩.', { nm }), 'g4_proj_no_square']]) } : {}) },
    start: `q·${nm}/(${nm}·${nm})`, html: t('Coefficient de {nm} : ⟨q, {nm}⟩ / ⟨{nm}, {nm}⟩', { nm }), ask: `c${nm === '1' ? '₀' : '₁'} =`,
    lines: [eq(`(${ipText(r, nm === '1' ? one : tt, pts)})/(${ipText(nm === '1' ? one : tt, nm === '1' ? one : tt, pts)})`, t('Valeurs aux points'), 'proj'), eq(qt(c), '', 'proj')],
  });
  const proj = polyT([c0, c1].map((x) => q(x)));
  const parts = [
    { judge: { kind: 'value', expect: '0', ...(level === 3 ? { menu: menu(t('Vérifier que ⟨1, t⟩ = 0'), [[t('Projeter directement sur 1 et t'), t('La formule de projection demande une base orthogonale : vérifie d\'abord ⟨1, t⟩ = 0.'), 'l_proj_nonorth']]) } : {}) }, start: '1·t', html: t('⟨1, t⟩ : la base (1, t) est-elle orthogonale ?'), ask: '⟨1, t⟩ =', lines: [eq(ipText(one, tt, pts), '', 'eval'), eq('0', t('Base orthogonale'), 'eval')] },
    coefP(a, n0, c0, '1'),
    coefP(b, n1, c1, 't'),
    { judge: { kind: 'poly', v: 't', target: 'expanded', ...(level === 3 ? { menu: menu('proj = c₀·1 + c₁·t', [['proj = c₀ + c₁', t('La projection est un polynôme : c₀·1 + c₁·t.')]]) } : {}) }, start: `(${qt(a)}/${qt(n0)})+(${qt(b)}/${qt(n1)})·t`, html: t('La projection c₀·1 + c₁·t'), ask: 'proj =', lines: [eq(proj, '', 'proj')] },
  ];
  return partsItem({
    skill: INNER, level, subgoals: INNER_SUB, key: `${INNER}:proj:${r}:${pts}:${level}`, mode: level === 3 ? 'tap' : 'free', keys: ['calc'], tapActions: level === 3 ? 'menu' : null,
    prompt: t('Sur P₂, on pose ⟨p, q⟩ = {def}. Projette q = {q} sur Span{1, t}.', { def: ptsDef(pts), q: polyD(r) }),
    hints: hints3(t('Vérifie que 1 et t sont orthogonaux pour ce produit, puis applique la formule de projection avec ⟨ , ⟩.'), `proj = (□/${fq(n0)})·1 + (□/${fq(n1)})·t`, `proj = ${polyR([c0, c1].map((x) => q(x)))}`),
  }, parts);
}

// Level 4: Gram-Schmidt on (1, t, t²) with ⟨p, q⟩ = Σ p(tᵢ)q(tᵢ).
function innerGS(rng) {
  for (let tr = 0; tr < 100; tr++) {
    const pts = rng.shuffle([-2, -1, 0, 1, 2]).slice(0, 3).sort((x, y) => x - y);
    const one = [1, 0, 0];
    const tt = [0, 1, 0];
    const t2 = [0, 0, 1];
    const s1 = ipP(tt, one, pts);
    const m = s1.div(q(3));
    const v1 = [m.neg(), q(1), q(0)];
    const a = ipP(t2, one, pts);
    const b = ipP(t2, v1, pts);
    const c = ipP(v1, v1, pts);
    const k = b.div(c);
    const v2 = [a.div(q(3)).neg().sub(k.mul(v1[0])), k.neg(), q(1)];
    if (v2.some((x) => x.d > 9) || m.d > 3) continue;
    const parts = [
      { judge: { kind: 'value', expect: qt(s1) }, start: 't·1', html: t('⟨t, 1⟩ (et ⟨1, 1⟩ = 3)'), ask: '⟨t, 1⟩ =', lines: [eq(ipText(tt, one, pts), '', 'eval'), eq(qt(s1), '', 'eval')] },
      { judge: { kind: 'poly', v: 't', target: 'expanded' }, start: `t-(${qt(s1)}/3)`, html: 'v₁ = t − (⟨t, 1⟩/⟨1, 1⟩)·1', ask: 'v₁ =', lines: [eq(polyT(v1), '', 'proj')] },
      { judge: { kind: 'value', expect: qt(b) }, start: 'q·v_1', html: t('⟨t², v₁⟩ (et ⟨t², 1⟩ = {a})', { a: fq(a) }), ask: '⟨t², v₁⟩ =', lines: [eq(ipText(t2, v1, pts), '', 'eval'), eq(qt(b), '', 'eval')] },
      { judge: { kind: 'value', expect: qt(c) }, start: 'v_1·v_1', html: '⟨v₁, v₁⟩', ask: '⟨v₁, v₁⟩ =', lines: [eq(ipText(v1, v1, pts), '', 'eval'), eq(qt(c), '', 'eval')] },
      { judge: { kind: 'poly', v: 't', target: 'expanded' }, start: `t^2-(${qt(a)}/3)-((${qt(b)})/(${qt(c)}))·(${polyT(v1)})`, html: 'v₂ = t² − (⟨t², 1⟩/⟨1, 1⟩)·1 − (⟨t², v₁⟩/⟨v₁, v₁⟩)·v₁', ask: 'v₂ =', lines: [eq(polyT(v2), '', 'proj')] },
    ];
    return partsItem({
      skill: INNER, level: 4, subgoals: INNER_SUB, key: `${INNER}:gs:${pts}`, mode: 'free', keys: ['calc'],
      prompt: t('Sur P₂, on pose ⟨p, q⟩ = {def}. Applique Gram-Schmidt à (1, t, t²) : v₀ = 1, puis v₁, puis v₂.', { def: ptsDef(pts) }),
      hints: hints3(t('Mêmes formules que dans ℝⁿ, avec ce produit scalaire : vⱼ = xⱼ − Σ (⟨xⱼ, vᵢ⟩/⟨vᵢ, vᵢ⟩)·vᵢ.'), `v₁ = t − (□/3)·1`, `v₁ = ${polyR(v1)}, v₂ = ${polyR(v2)}`),
    }, parts);
  }
  return innerProj(4, rng);
}

// Level 5: ⟨u, v⟩ = uᵀAᵀAv with A singular.
const SINGULAR = [[[1, 2], [2, 4]], [[1, -1], [-2, 2]], [[2, 1], [4, 2]], [[1, 3], [2, 6]], [[3, 1], [-3, -1]], [[1, -2], [1, -2]]];
function innerSingular(rng) {
  const A = MX.mat(rng.pick(SINGULAR));
  const u = MX.kernel(A)[0];
  const ui = scaleV(u, denOf(u));
  const decision = {
    kind: 'decision', prompt: t('⟨u, v⟩ = uᵀAᵀAv est-il un produit scalaire sur ℝ² ?'), options: rng.shuffle(menu(t('Non : A n\'est pas inversible'), [
      [t('Oui : uᵀAᵀAu = ‖Au‖² ≥ 0'), t('‖Au‖² ≥ 0, mais il faut ⟨u, u⟩ > 0 pour tout u ≠ 0 : si A est singulière, un u ≠ 0 donne Au = 0.'), 'l_inner_positivity'],
    ])),
  };
  return partsItem({
    skill: INNER, level: 5, subgoals: INNER_SUB, key: `${INNER}:sing:${mt(A)}`, mode: 'free', keys: ['mat'],
    prompt: t('Soit A = {A} et ⟨u, v⟩ = uᵀAᵀAv sur ℝ². Est-ce un produit scalaire ? Si non, donne u ≠ 0 avec ⟨u, u⟩ = 0.', { A: MLm(A) }),
    before: [decision], hints: [],
  }, [
    { judge: { kind: 'span', basis: [vt(u)], require: 'basis' }, start: 'u', html: '', ask: 'u =', lines: [eq(vt(ui), t('Au = 0 : un vecteur du noyau'), 'eval')] },
    { judge: { kind: 'mat', expect: '0', names: { A: mt(A) } }, start: '⟨u,u⟩', html: '⟨u, u⟩ = (Au) · (Au) = ‖Au‖²', ask: '⟨u, u⟩ =', lines: [eq('0', 'Au = 0', 'eval')] },
  ]);
}

function innerExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 2);
    if (which === 0) {
      const A = MX.mat(rng.pick(SINGULAR));
      const u = MX.kernel(A)[0];
      return tfL({
        skill: INNER, key: `sing:${mt(A)}`, truth: false, exam: examTag({ exam }), ruleIfTrue: 'l_inner_positivity',
        statement: t('Pour toute matrice A de taille 2 × 2, ⟨u, v⟩ = uᵀAᵀAv est un produit scalaire sur ℝ².'),
        counter: { kind: 'matOne', params: { want: 'innerNotPD', n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }, { v: 'u', label: 'u =', shape: [2, 1] }], answer: { A: mt(A), u: vt(scaleV(u, denOf(u))) } },
        explanation: t('Faux : avec A = {A} et u = {u}, Au = 0, donc ⟨u, u⟩ = ‖Au‖² = 0 alors que u ≠ 0.', { A: MLm(A), u: vR(scaleV(u, denOf(u))) }),
      });
    }
    if (which === 1) {
      return tfL({
        skill: INNER, key: 'three', truth: true, exam: examTag({ exam }),
        statement: t('⟨p, q⟩ = p(−1)q(−1) + p(0)q(0) + p(1)q(1) est un produit scalaire sur P₂.'),
        explanation: t('Vrai : symétrique et bilinéaire, et ⟨p, p⟩ = p(−1)² + p(0)² + p(1)² = 0 force trois racines, donc p = 0 (degré ≤ 2).'),
      });
    }
    const [a, b] = rng.pick([[0, 1], [-1, 1], [0, 2], [1, 2]]);
    const r = [a * b, -(a + b), 1];
    return tfL({
      skill: INNER, key: `two:${a},${b}`, truth: false, exam: examTag({ exam }),
      statement: t('{e} est un produit scalaire sur P₂.', { e: `⟨p, q⟩ = p(${fq(a)})q(${fq(a)}) + p(${fq(b)})q(${fq(b)})` }),
      counter: { kind: 'vecFamily', params: { want: 'polyNullAtPoints', points: [a, b], deg: 2 }, ask: [{ v: 'p', label: 'p(t) =', keys: ['calc'] }], answer: { p: polyT(r.map((x) => q(x))) } },
      explanation: t('Faux : p = {p} est non nul mais ⟨p, p⟩ = {e} = 0.', { p: polyD(r), e: `p(${fq(a)})² + p(${fq(b)})²` }),
    });
  }
  const pts = rng.pick([[-1, 0, 1], [0, 1, 2], [-2, 0, 2], [-1, 1, 2]]);
  let p;
  let r;
  for (let t = 0; t < 100; t++) { p = randPoly(rng); r = randPoly(rng); if (ipP(p, r, pts).n !== 0 && p.join() !== r.join()) break; }
  const v = ipP(p, r, pts);
  const coefDot = p.reduce((s, c, k) => s.add(q(c).mul(q(r[k]))), q(0));
  const two = ipP(p, r, pts.slice(0, 2));
  return mcqDistinct({
    skill: INNER, level: 4, key: `mcq:${p}:${r}:${pts}`, exam: examTag({ exam }),
    prompt: t('Sur P₂, on pose ⟨p, q⟩ = {def}. Avec p = {p} et q = {q}, ⟨p, q⟩ vaut :', { def: ptsDef(pts), p: polyD(p), q: polyD(r) }),
    right: fq(v),
    wrongs: [{ html: fq(coefDot), rule: null }, { html: fq(two), rule: null }],
    fillers: [{ html: fq(v.neg()) }, { html: fq(v.add(1)) }, { html: fq(v.sub(2)) }],
    solution: [{ html: `⟨p, q⟩ = ${C(ipText(p, r, pts))} = ${fq(v)}`, note: t('Valeurs aux points, pas les coefficients') }],
  }, rng);
}

// ======================================================================

export const GEN = {
  [DOT]: (level, rng, profile, opts = {}) => (opts.exam ? dotExam(rng, opts.exam) : dotItem(level, rng)),
  [PERP]: (level, rng, profile, opts = {}) => (opts.exam ? perpExam(rng, opts.exam) : perpItem(level, rng)),
  [PROJ]: (level, rng, profile, opts = {}) => (opts.exam ? projExam(rng, opts.exam) : projItem(level, rng)),
  [MATS]: (level, rng, profile, opts = {}) => (opts.exam ? matsExam(rng, opts.exam) : matsItem(level, rng)),
  [GS]: (level, rng, profile, opts = {}) => (opts.exam ? gsExam(rng, opts.exam) : gsItem(level, rng)),
  [QR]: (level, rng, profile, opts = {}) => (opts.exam ? qrExam(rng, opts.exam) : qrItem(level, rng)),
  [LSQ]: (level, rng, profile, opts = {}) => (opts.exam ? lsqExam(rng, opts.exam) : lsqItem(level, rng)),
  [INNER]: (level, rng, profile, opts = {}) => (opts.exam ? innerExam(rng, opts.exam) : innerItem(level, rng)),
};

export { dotQ, n2, rootT, Qv };

// Generators of module G4, part b (spec §8.3; step U5): cross and triple
// products, distances of a point to a plane or a line, skew lines (distance,
// common perpendicular, a line meeting both), spheres. Catalogue:
// docs/universite/G-gymnase-2.md, G4. Tools: geo-kit.js, geoan-b-kit.js.
//
// Judges: `vector` (u ∧ v, points H, P, Q, normals; cfg.symbols names the
// given points and vectors), `value` (areas, volumes, distances, exact),
// `geom` (planes, lines of space, spheres), `equiv` (the two conditions of
// the common perpendicular), `solset` (a parameter m). Levels: 1–2 guided,
// 3 choose the action (cfg.menu per part), 4 free, 5 alone (a long problem
// in parts, without help: the type `problem` comes with step U4). Every
// figure is built backwards from whole answers (normals of whole norm,
// feet and distances whole).

import {
  q, qt, fq, nz, H, add, sub, scale, dot, norm2, cross, isZero, prim, vt, vr, ptR, linT, paramT,
  sumT, readable, rootT, rootR, GML, MT, mcqD, tfG, examTag, geoCounter,
} from './geo-kit.js';
import {
  niceVec, normI, randVec, orthTo, par, parR, crossT, crossComps, dotT, squaresT, squarefree, partsB,
} from './geoan-b-kit.js';
import { coefItem } from './alglin-kit.js';
import { asProblem } from './kit-problem.js';
import { t } from '../../i18n.js';

const txt = (v) => v.map(qt);
const absQ = (x) => (q(x).n < 0 ? q(x).neg() : q(x));
const inBox = (v, m) => v.every((x) => Math.abs(q(x).valueOf()) <= m);
const zeros = (v) => v.filter((x) => q(x).n === 0).length;
const ML3 = (t) => GML(t, 3);
const plane = (n, P) => linT([...n, dot(n, P).neg()]);
// « −3 + 2t − 4s »: an affine expression with whole coefficients.
const affT = (c, terms) => sumT([[c, ''], ...terms]);

// ======================================================================
// g4-cross
// ======================================================================

const CR = 'g4-cross';
const CR_SUB = [
  { id: 'det', label: t('écrire les trois déterminants 2 × 2'), skill: CR },
  { id: 'check', label: t('contrôle par le produit scalaire'), skill: 'g4-dot' },
  { id: 'area', label: t('aire'), skill: CR },
];
const CR_MENU = {
  vec: [
    { id: 'c1', label: t('1re composante : u₂v₃ − u₃v₂'), valid: true },
    { id: 'c2', label: t('2e composante : u₃v₁ − u₁v₃'), valid: true },
    { id: 'c3', label: t('3e composante : u₁v₂ − u₂v₁'), valid: true },
    { id: 'c2bad', label: t('2e composante : u₁v₃ − u₃v₁'), valid: false, rule: 'g4_cross_middle_sign', why: t('Le cofacteur du milieu porte un signe − : la 2e composante est u₃v₁ − u₁v₃ (on tourne : 2, 3, 1).') },
  ],
  check: [
    { id: 'dot', label: t('Contrôle : (u⃗ ∧ v⃗)·u⃗ = 0'), valid: true },
    { id: 'norm', label: t('Norme'), valid: false, why: t('Ici, on contrôle d\'abord que le produit vectoriel est orthogonal à u⃗.') },
  ],
  area: [
    { id: 'norm', label: t('Aire du parallélogramme : ‖u⃗ ∧ v⃗‖'), valid: true },
    { id: 'half', label: t('Aire du triangle : ½‖u⃗ ∧ v⃗‖'), valid: true },
    { id: 'sum', label: t('Somme des composantes'), valid: false, why: t('Une aire est une norme : la racine de la somme des carrés.') },
  ],
  bilin: [
    { id: 'bil', label: t('Bilinéarité : développer comme un produit'), valid: true },
    { id: 'anti', label: 'u⃗ ∧ u⃗ = 0⃗ et v⃗ ∧ u⃗ = −u⃗ ∧ v⃗', valid: true },
    { id: 'comm', label: 'v⃗ ∧ u⃗ = u⃗ ∧ v⃗', valid: false, rule: 'g4_cross_commute', why: t('Le produit vectoriel change de signe quand on échange les facteurs.') },
  ],
};

function crossPair(rng) {
  for (let t = 0; t < 300; t++) {
    const u = randVec(rng, -4, 4);
    const v = randVec(rng, -4, 4);
    const n = cross(u, v);
    if (isZero(n) || zeros(u) > 1 || zeros(v) > 1 || zeros(n) > 1 || n[1].n === 0) continue;
    if (squarefree(norm2(n).valueOf()) > 50) continue;
    return { u, v, n };
  }
  const u = [q(2), q(-1), q(3)];
  const v = [q(1), q(0), q(-2)];
  return { u, v, n: cross(u, v), fallback: true };
}

// The parts « u ∧ v », « contrôle » and « aire ».
function crossParts(d, level, { label = 'u ∧ v', symbols, sides = null, tri = true }) {
  const { u, v, n } = d;
  const first = sides ? `${label} = ${vt(u)} ∧ ${vt(v)}` : `${label} = ${crossT(u, v)}`;
  const comps = crossComps(u, v);
  const parts = [{
    start: label, judge: { kind: 'vector', symbols, expect: label, cross: [txt(u), txt(v)] }, menu: CR_MENU.vec,
    lines: [
      { math: first, note: sides ? sides : t('Trois déterminants 2 × 2 : (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁)'), subgoal: 'det', blank: [], blank2: sides ? [] : [comps[1]] },
      ...(sides ? [{ math: crossT(u, v), note: t('Trois déterminants 2 × 2'), subgoal: 'det', blank: [], blank2: [comps[1]], from: 1 }] : []),
      { math: vt(n), note: '', subgoal: 'det', blank: txt(n), blank2: [qt(n[1])] },
    ],
  }];
  parts.push({
    html: t('Contrôle : {v1} doit être orthogonal à {v2}.', { v1: vr(n), v2: sides ? 'AB⃗' : 'u⃗' }), ask: t('produit scalaire :'), start: `${vt(n)}·${vt(u)}`,
    judge: { kind: 'vector', expect: '0' }, menu: CR_MENU.check,
    lines: [{ math: `${dotT(n, u)} = 0`, note: t('Le produit scalaire est nul'), subgoal: 'check', end: true, blank: ['0'], blank2: [] }],
  });
  const n2 = norm2(n);
  const area = tri ? rootT(n2.div(4)) : rootT(n2);
  parts.push({
    html: tri ? (sides ? t('L\'aire S du triangle ABC ?') : t('L\'aire S du triangle construit sur u⃗ et v⃗ ?')) : t('L\'aire S du parallélogramme construit sur u⃗ et v⃗ ?'), ask: 'S =', start: 'S',
    judge: { kind: 'value', expect: area, form: 'exact' }, menu: CR_MENU.area,
    lines: [
      { math: `${tri ? '(1/2)·' : ''}√(${squaresT(n)})`, note: tri ? t('Aire du triangle = ½‖u⃗ ∧ v⃗‖') : t('Aire = ‖u⃗ ∧ v⃗‖'), subgoal: 'area', blank: [squaresT(n)], blank2: [] },
      { math: area, note: '', subgoal: 'area' },
    ],
  });
  return { parts, area };
}

function crossItem(level, rng, opts = {}) {
  const kind = level <= 3 ? 'uv' : level === 5 || opts.exam ? 'height' : rng.pick(['uv', 'tri', 'bilin']);
  const d = crossPair(rng);
  const { u, v, n } = d;
  let parts;
  let prompt;
  let key;
  if (kind === 'uv') {
    ({ parts } = crossParts(d, level, { symbols: { u: vt(u), v: vt(v) } }));
    prompt = t('On donne u⃗ = {v1} et v⃗ = {v2}. Calcule u⃗ ∧ v⃗, contrôle-le par un produit scalaire, puis calcule l\'aire du triangle construit sur u⃗ et v⃗.', { v1: vr(u), v2: vr(v) });
    key = `${vt(u)}${vt(v)}`;
  } else if (kind === 'tri' || kind === 'height') {
    const A = randVec(rng, -3, 3);
    const B = add(A, u);
    const C = add(A, v);
    ({ parts } = crossParts(d, level, { label: 'AB ∧ AC', symbols: { A: vt(A), B: vt(B), C: vt(C) }, sides: 'AB⃗ = B − A, AC⃗ = C − A' }));
    prompt = t('On donne les points {v1}, {v2} et {v3}. Calcule AB⃗ ∧ AC⃗, puis l\'aire du triangle ABC.', { v1: ptR('A', A), v2: ptR('B', B), v3: ptR('C', C) });
    key = `tri:${vt(A)}${vt(B)}${vt(C)}`;
    if (kind === 'height') {
      const ab2 = norm2(u);
      parts.push({
        html: t('La hauteur h du triangle issue de C (relative au côté [AB]) ?'), ask: 'h =', start: 'h',
        judge: { kind: 'value', expect: rootT(norm2(n).div(ab2)), form: 'exact' },
        lines: [{ math: rootT(norm2(n).div(ab2)), note: t('h = 2S/AB = ‖AB⃗ ∧ AC⃗‖/‖AB⃗‖, avec AB = {v1}', { v1: rootR(ab2) }), subgoal: 'area' }],
      });
      prompt = t('On donne les points {v1}, {v2} et {v3}. Calcule l\'aire du triangle ABC, puis sa hauteur relative au côté [AB].', { v1: ptR('A', A), v2: ptR('B', B), v3: ptR('C', C) });
    }
  } else {
    // (au + bv) ∧ (cu + dv) = (ad − bc)·u ∧ v.
    let a; let b; let c; let e;
    do { [a, b, c, e] = [nz(rng, -3, 3), nz(rng, -3, 3), nz(rng, -3, 3), nz(rng, -3, 3)]; } while (a * e - b * c === 0 || a * e + b * c === 0);
    const k = a * e - b * c;
    const start = `(${sumT([[a, 'u'], [b, 'v']])}) ∧ (${sumT([[c, 'u'], [e, 'v']])})`;
    parts = [{
      start, judge: { kind: 'vector', symbols: { u: vt(u), v: vt(v) }, expect: start, bilin: { kWrong: String(a * e + b * c), n: txt(n) } }, menu: CR_MENU.bilin,
      lines: [
        { math: `${k}·(u ∧ v)`, note: t('Bilinéarité : u⃗ ∧ u⃗ = v⃗ ∧ v⃗ = 0⃗ et v⃗ ∧ u⃗ = −u⃗ ∧ v⃗, d\'où ({v1}·{v2} − {v3}·{v4})·u⃗ ∧ v⃗', { v1: fq(a), v2: parR(e), v3: parR(b), v4: parR(c) }), subgoal: 'det' },
        { math: `${k}·${vt(n)}`, note: `u⃗ ∧ v⃗ = ${vr(n)}`, subgoal: 'det' },
        { math: vt(scale(n, k)), note: '', subgoal: 'det' },
      ],
    }];
    prompt = t('On donne u⃗ = {v1} et v⃗ = {v2}. Calcule {v3} en développant par bilinéarité.', { v1: vr(u), v2: vr(v), v3: readable(start).replace(/u/g, 'u⃗').replace(/v/g, 'v⃗').replace(/\(\s*−\s*/g, '(−') });
    key = `bil:${start}:${vt(u)}${vt(v)}`;
  }
  return partsB({
    skill: CR, level, parts, subgoals: CR_SUB, prompt, key: `${CR}:${kind}:${key}`, fallback: d.fallback,
    hints: H(t('2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). Contrôle : le résultat est orthogonal à u⃗ et à v⃗.'), `(${fq(n[0])} ; □ ; ${fq(n[2])})`, vr(n)),
    exam: opts.exam ? examTag(opts) : false,
  });
}

function crossExam(rng, exam) {
  const d = crossPair(rng);
  const { u, v, n } = d;
  if (exam === 'tf') {
    const w = rng.int(0, 2);
    if (w === 0) {
      return tfG({
        skill: CR, key: 'commute', truth: false, exam: examTag({ exam }), ruleIfTrue: 'g4_cross_commute',
        statement: t('Pour tous vecteurs u⃗ et v⃗ de l\'espace, u⃗ ∧ v⃗ = v⃗ ∧ u⃗.'),
        counter: geoCounter('crossNotCommute', [['u', 'u⃗ ='], ['v', 'v⃗ =']], { u: '(1 ; 0 ; 0)', v: '(0 ; 1 ; 0)' }),
        explanation: t('Faux : v⃗ ∧ u⃗ = −u⃗ ∧ v⃗. Avec u⃗ = (1 ; 0 ; 0) et v⃗ = (0 ; 1 ; 0) : u⃗ ∧ v⃗ = (0 ; 0 ; 1) et v⃗ ∧ u⃗ = (0 ; 0 ; −1).'),
      });
    }
    const st = [
      [t('Pour tous vecteurs u⃗ et v⃗, le vecteur u⃗ ∧ v⃗ est orthogonal à u⃗ et à v⃗.'), t('Vrai : (u⃗ ∧ v⃗)·u⃗ = (u⃗ ∧ v⃗)·v⃗ = 0, c\'est un déterminant avec deux colonnes égales.')],
      [t('‖u⃗ ∧ v⃗‖ est l\'aire du parallélogramme construit sur u⃗ et v⃗.'), t('Vrai : ‖u⃗ ∧ v⃗‖ = ‖u⃗‖‖v⃗‖ sin θ, la base fois la hauteur.')],
    ][w - 1];
    return tfG({ skill: CR, key: `true:${w}`, truth: true, exam: examTag({ exam }), statement: st[0], explanation: st[1] });
  }
  if (exam === 'coef') {
    return coefItem({
      skill: CR, key: `${vt(u)}${vt(v)}`, exam: examTag({ exam }), label: 'n_2',
      prompt: t('On donne u⃗ = {v1} et v⃗ = {v2}, et n⃗ = u⃗ ∧ v⃗. Que vaut n₂, la 2e composante de n⃗ ?', { v1: vr(u), v2: vr(v) }),
      value: qt(n[1]), traps: [{ rule: 'g4_cross_middle_sign' }],
      solution: [{ html: `n₂ = u₃v₁ − u₁v₃ = ${parR(u[2])}·${parR(v[0])} − ${parR(u[0])}·${parR(v[2])} = ${fq(n[1])} ; u⃗ ∧ v⃗ = ${vr(n)}`, note: '' }],
      fallback: d.fallback,
    });
  }
  return mcqD({
    skill: CR, level: 4, key: `mcq:${vt(u)}${vt(v)}`, exam: examTag({ exam }),
    prompt: t('On donne u⃗ = {v1} et v⃗ = {v2}. Que vaut u⃗ ∧ v⃗ ?', { v1: vr(u), v2: vr(v) }),
    right: vr(n),
    wrongs: [{ html: vr([n[0], n[1].neg(), n[2]]), rule: 'g4_cross_middle_sign' }, { html: vr(n.map((x) => x.neg())), rule: 'g4_cross_commute' }],
    fillers: [{ html: vr(u.map((x, i) => x.mul(v[i]))) }, { html: vr([n[2], n[1], n[0]]) }, { html: vr(add(n, [q(1), q(0), q(0)])) }],
    solution: [{ html: `u⃗ ∧ v⃗ = (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁) = ${vr(n)}`, note: '' }],
    fallback: d.fallback,
  }, rng);
}

// ======================================================================
// g4-triple
// ======================================================================

const TR = 'g4-triple';
const TR_SUB = [
  { id: 'cross', label: t('produit vectoriel'), skill: CR },
  { id: 'mixte', label: t('produit mixte'), skill: TR },
  { id: 'vol', label: t('volume'), skill: TR },
];
const TR_MENU = {
  cross: [
    { id: 'vec', label: t('Vecteurs AB⃗, AC⃗, AD⃗ issus de A'), valid: true },
    { id: 'cross', label: t('Produit vectoriel AB⃗ ∧ AC⃗'), valid: true },
    { id: 'pts', label: t('Produit vectoriel des points B ∧ C'), valid: false, why: t('Un point n\'est pas une arête : prends des vecteurs issus du même sommet.') },
  ],
  mixte: [
    { id: 'dot', label: t('Produit scalaire avec AD⃗'), valid: true },
    { id: 'cross2', label: t('Encore un produit vectoriel'), valid: false, why: t('Le produit mixte est un nombre : (AB⃗ ∧ AC⃗)·AD⃗.') },
  ],
  vol: [
    { id: 'six', label: t('Valeur absolue et 1/6'), valid: true },
    { id: 'abs', label: t('Valeur absolue seulement'), valid: true },
    { id: 'half', label: t('Diviser par 2'), valid: false, rule: 'g4_tetra_factor', why: t('Le tétraèdre est le sixième du parallélépipède : ½ pour la base, ⅓ pour la pyramide.') },
  ],
};

function tripleData(rng, { divisible = true } = {}) {
  for (let t = 0; t < 400; t++) {
    const A = randVec(rng, -3, 3);
    const [u, v, w] = [0, 1, 2].map(() => randVec(rng, -3, 3));
    if ([u, v, w].some((x) => zeros(x) > 1)) continue;
    const n = cross(u, v);
    const m = dot(n, w);
    if (m.n === 0 || Math.abs(m.valueOf()) > 60) continue;
    if (divisible && m.n % 6 !== 0 && t < 350) continue;
    const [B, C, D] = [u, v, w].map((x) => add(A, x));
    if (![B, C, D].every((P) => inBox(P, 6))) continue;
    return { A, B, C, D, u, v, w, n, m };
  }
  const [A, B, C, D] = [[1, 1, 0], [3, 2, 1], [2, 4, 1], [1, 2, 5]].map((p) => p.map((x) => q(x)));
  const [u, v, w] = [B, C, D].map((P) => sub(P, A));
  return { A, B, C, D, u, v, w, n: cross(u, v), m: dot(cross(u, v), w), fallback: true };
}

const symsOf = (d) => ({ A: vt(d.A), B: vt(d.B), C: vt(d.C), D: vt(d.D) });

function tripleParts(d, level, { box = false } = {}) {
  const { u, v, w, n, m } = d;
  const sym = symsOf(d);
  const vol = box ? absQ(m) : absQ(m).div(6);
  const parts = [];
  const vecs = `AB⃗ = ${vr(u)}, AC⃗ = ${vr(v)}, AD⃗ = ${vr(w)}`;
  if (level >= 2) {
    parts.push({
      html: vecs, start: 'AB ∧ AC', judge: { kind: 'vector', symbols: sym, expect: 'AB ∧ AC', cross: [txt(u), txt(v)] }, menu: TR_MENU.cross,
      lines: [
        { math: `AB ∧ AC = ${vt(u)} ∧ ${vt(v)}`, note: t('Les arêtes issues de A'), subgoal: 'cross' },
        { math: vt(n), note: t('Trois déterminants 2 × 2'), subgoal: 'cross', blank: txt(n), blank2: [qt(n[1])] },
      ],
    });
  }
  parts.push({
    html: level === 1 ? t('{vecs} et AB⃗ ∧ AC⃗ = {v1}. Le produit mixte ?', { vecs, v1: vr(n) }) : t('Le produit mixte [AB⃗, AC⃗, AD⃗] = (AB⃗ ∧ AC⃗)·AD⃗ ?'), ask: '[AB⃗, AC⃗, AD⃗] =', start: '[AB, AC, AD]',
    judge: { kind: 'vector', symbols: sym, expect: '(AB ∧ AC)·AD' }, menu: TR_MENU.mixte,
    lines: [{ math: `${dotT(n, w)} = ${qt(m)}`, note: '', subgoal: 'mixte', end: true, blank: [qt(m)], blank2: [qt(m)] }],
  });
  parts.push({
    html: box ? t('Le volume V du parallélépipède construit sur AB⃗, AC⃗ et AD⃗ ?') : t('Le volume V du tétraèdre ABCD ?'), ask: 'V =', start: 'V',
    judge: { kind: 'value', expect: qt(vol), ...(box ? {} : { tetra: { m: qt(m) } }) }, menu: TR_MENU.vol,
    decisions: box ? [] : [{
      levels: [2], kind: 'decision', prompt: t('Le volume du tétraèdre est |[AB⃗, AC⃗, AD⃗]| multiplié par…'), options: [
        { id: 'six', label: '1/6', valid: true, ref: true },
        { id: 'three', label: '1/3', valid: false, rule: 'g4_tetra_factor', why: t('Aire de la base triangulaire = ½‖AB⃗ ∧ AC⃗‖, puis ⅓·base·hauteur : en tout 1/6.') },
        { id: 'two', label: '1/2', valid: false, rule: 'g4_tetra_factor', why: t('Le ½ donne l\'aire du triangle de base ; il faut encore le ⅓ de la pyramide : 1/6.') },
      ],
    }],
    lines: [
      { math: box ? `|${qt(m)}|` : `|${qt(m)}|/6`, note: box ? t('Volume = |produit mixte|') : t('Un tétraèdre : le sixième du parallélépipède'), subgoal: 'vol', end: true, blank: box ? [] : ['6'], blank2: [] },
      { math: qt(vol), note: '', subgoal: 'vol' },
    ],
  });
  return { parts, vol };
}

function tripleItem(level, rng, opts = {}) {
  if (level === 5 || opts.exam === 'open') return tripleCoplanar(level, rng, opts);
  const box = level >= 4 && rng.chance(0.3);
  const d = tripleData(rng, { divisible: !box && rng.int(0, 2) > 0 });
  const { parts } = tripleParts(d, level, { box });
  return partsB({
    skill: TR, level, parts, subgoals: TR_SUB,
    prompt: box
      ? t('On donne {v1}, {v2}, {v3} et {v4}. Calcule le volume du parallélépipède construit sur AB⃗, AC⃗ et AD⃗.', { v1: ptR('A', d.A), v2: ptR('B', d.B), v3: ptR('C', d.C), v4: ptR('D', d.D) })
      : t('On donne {v1}, {v2}, {v3} et {v4}. Calcule le volume du tétraèdre ABCD.', { v1: ptR('A', d.A), v2: ptR('B', d.B), v3: ptR('C', d.C), v4: ptR('D', d.D) }),
    key: `${TR}:${box ? 'box' : 'tet'}:${vt(d.A)}${vt(d.B)}${vt(d.C)}${vt(d.D)}`, fallback: d.fallback,
    hints: H(t('Le volume du tétraèdre est le sixième du parallélépipède : |[AB⃗, AC⃗, AD⃗]|/6.'), `V = |${fq(d.m)}|/□`, `V = ${fq(box ? absQ(d.m) : absQ(d.m).div(6))}`),
  });
}

// « Pour quel m les points sont-ils coplanaires ? », then a volume.
function tripleCoplanar(level, rng, opts = {}) {
  for (let tries = 0; tries < 300; tries++) {
    const d = tripleData(rng, { divisible: false });
    const { A, B, C, n } = d;
    if (n[2].n === 0) continue;
    // D = (d1 ; d2 ; m): [AB, AC, AD] = n1 w1 + n2 w2 + n3 (m − a3) = a·m + b.
    const [d1, d2] = [d.D[0], d.D[1]];
    const a = n[2];
    const b = n[0].mul(d1.sub(A[0])).add(n[1].mul(d2.sub(A[1]))).sub(n[2].mul(A[2]));
    const r = b.neg().div(a);
    if (r.d !== 1 || Math.abs(r.valueOf()) > 8) continue;
    const k = nz(rng, -3, 3);
    const m2 = r.add(k);
    const mixte2 = a.mul(k);
    if (Math.abs(mixte2.valueOf()) > 60) continue;
    const vol2 = absQ(mixte2).div(6);
    const sym = { A: vt(A), B: vt(B), C: vt(C), D: `(${qt(d1)} ; ${qt(d2)} ; m)` };
    const am = sumT([[a, 'm'], [b, '']]);
    const parts = [
      {
        html: `AB⃗ = ${vr(d.u)}, AC⃗ = ${vr(d.v)}.`, start: 'AB ∧ AC', judge: { kind: 'vector', symbols: sym, params: ['m'], expect: 'AB ∧ AC', cross: [txt(d.u), txt(d.v)] },
        lines: [{ math: `AB ∧ AC = ${vt(d.u)} ∧ ${vt(d.v)}`, note: '', subgoal: 'cross' }, { math: vt(n), note: '', subgoal: 'cross' }],
      },
      {
        html: t('AD⃗ = ({v1} ; {v2} ; m {v3} {v4}). Le produit mixte, en fonction de m ?', { v1: fq(d1.sub(A[0])), v2: fq(d2.sub(A[1])), v3: A[2].n < 0 ? '+' : '−', v4: fq(absQ(A[2])) }), ask: '[AB⃗, AC⃗, AD⃗] =', start: '[AB, AC, AD]',
        judge: { kind: 'vector', symbols: sym, params: ['m'], expect: '(AB ∧ AC)·AD', form: 'any' },
        lines: [{ math: am, note: '(AB⃗ ∧ AC⃗)·AD⃗', subgoal: 'mixte' }],
      },
      {
        html: t('Les quatre points sont coplanaires si et seulement si le produit mixte est nul.'), ask: 'm :', start: `${am} = 0`,
        judge: { kind: 'solset', v: 'm' }, lines: [{ math: `m = ${qt(r)}`, note: '', subgoal: 'mixte' }],
      },
      {
        html: t('Pour m = {v1}, le volume V du tétraèdre ABCD ?', { v1: fq(m2) }), ask: 'V =', start: 'V',
        judge: { kind: 'value', expect: qt(vol2), tetra: { m: qt(mixte2) } },
        lines: [{ math: `|${qt(mixte2)}|/6`, note: `[AB⃗, AC⃗, AD⃗] = ${fq(a)}·${parR(m2)} ${b.n < 0 ? '−' : '+'} ${fq(absQ(b))} = ${fq(mixte2)}`, subgoal: 'vol' }, { math: qt(vol2), note: '', subgoal: 'vol' }],
      },
    ];
    return partsB({
      skill: TR, level: opts.exam ? 4 : level, parts, subgoals: TR_SUB, noHints: true,
      prompt: t('On donne {v1}, {v2}, {v3} et D({v4} ; {v5} ; m). Pour quelle valeur de m les quatre points sont-ils coplanaires ? Calcule ensuite le volume du tétraèdre ABCD pour m = {v6}.', { v1: ptR('A', A), v2: ptR('B', B), v3: ptR('C', C), v4: fq(d1), v5: fq(d2), v6: fq(m2) }),
      key: `${TR}:cop:${vt(A)}${vt(B)}${vt(C)}${qt(d1)},${qt(d2)}:${qt(m2)}`, hints: [],
      exam: opts.exam ? examTag(opts, 4) : false,
    });
  }
  return tripleItem(4, rng);
}

function tripleExam(rng, exam) {
  if (exam === 'open') return tripleCoplanar(4, rng, { exam });
  if (exam === 'tf') {
    if (rng.chance(0.5)) {
      return tfG({
        skill: TR, key: 'coplanar', truth: false, exam: examTag({ exam }),
        statement: t('Si [u⃗, v⃗, w⃗] = 0, alors deux des trois vecteurs sont colinéaires.'),
        counter: geoCounter('coplanarNoColinear', [['u', 'u⃗ ='], ['v', 'v⃗ ='], ['w', 'w⃗ =']], { u: '(1 ; 0 ; 0)', v: '(0 ; 1 ; 0)', w: '(1 ; 1 ; 0)' }),
        explanation: t('Faux : le produit mixte est nul dès que les trois vecteurs sont coplanaires. (1 ; 0 ; 0), (0 ; 1 ; 0) et (1 ; 1 ; 0) sont dans le plan z = 0, et deux à deux non colinéaires.'),
      });
    }
    return tfG({
      skill: TR, key: 'true', truth: true, exam: examTag({ exam }),
      statement: t('Quatre points A, B, C, D sont coplanaires si et seulement si [AB⃗, AC⃗, AD⃗] = 0.'),
      explanation: t('Vrai : le produit mixte est le volume (signé) du parallélépipède construit sur AB⃗, AC⃗, AD⃗ ; il est nul si et seulement si ces trois vecteurs sont dans un même plan.'),
    });
  }
  const d = tripleData(rng);
  const m = absQ(d.m);
  const bad = dot([d.n[0], d.n[1].neg(), d.n[2]], d.w);
  return mcqD({
    skill: TR, level: 4, key: `mcq:${vt(d.A)}${vt(d.B)}${vt(d.C)}${vt(d.D)}`, exam: examTag({ exam }),
    prompt: t('Quel est le volume du tétraèdre de sommets {v1}, {v2}, {v3} et {v4} ?', { v1: ptR('A', d.A), v2: ptR('B', d.B), v3: ptR('C', d.C), v4: ptR('D', d.D) }),
    right: fq(m.div(6)),
    wrongs: [{ html: fq(m), rule: 'g4_tetra_factor' }, { html: fq(m.div(3)), rule: 'g4_tetra_factor' }, { html: fq(m.div(2)), rule: 'g4_tetra_factor' }, { html: fq(absQ(bad).div(6)), rule: 'g4_cross_middle_sign' }],
    fillers: [{ html: fq(m.div(6).add(1)) }, { html: fq(m.mul(6)) }],
    solution: [{ html: `AB⃗ ∧ AC⃗ = ${vr(d.n)}, [AB⃗, AC⃗, AD⃗] = ${fq(d.m)}, V = |${fq(d.m)}|/6 = ${fq(m.div(6))}`, note: '' }],
    fallback: d.fallback,
  }, rng);
}

// ======================================================================
// g4-dist-point
// ======================================================================

const DP = 'g4-dist-point';
const DP_SUB = [
  { id: 'eval', label: t('évaluer l\'équation en P'), skill: 'g4-plane' },
  { id: 'dist', label: t('distance'), skill: DP },
  { id: 'foot', label: t('pied de la perpendiculaire'), skill: 'g4-dot' },
];
const DP_MENU = {
  eval: [
    { id: 'eval', label: t('Évaluer l\'équation du plan en P'), valid: true },
    { id: 'proj', label: t('Projeter AP⃗ sur la direction'), valid: true },
    { id: 'pyth', label: t('Distance de P à l\'origine'), valid: false, why: t('On cherche la distance au plan (ou à la droite), pas à O.') },
  ],
  dist: [
    { id: 'norm', label: t('Diviser par ‖n⃗‖ (valeur absolue)'), valid: true },
    { id: 'len', label: t('Longueur PH'), valid: true },
    { id: 'raw', label: t('Garder la valeur de l\'équation'), valid: false, rule: 'g4_dist_no_norm', why: t('La valeur de l\'équation devient une distance après division par ‖n⃗‖.') },
  ],
  foot: [
    { id: 'foot', label: t('Pied H : P moins la projection sur n⃗ (ou A + t·v⃗)'), valid: true },
    { id: 'check', label: t('Contrôle : H dans le plan'), valid: true },
    { id: 'nosq', label: 'H = P − (e/‖n⃗‖)·n⃗', valid: false, rule: 'g4_proj_no_square', why: t('Pour un vecteur, on divise par ‖n⃗‖² : H = P − (e/‖n⃗‖²)·n⃗.') },
  ],
};

function planeData(rng) {
  for (let t = 0; t < 200; t++) {
    const n = niceVec(rng, { maxNorm: 7 });
    const H0 = randVec(rng, -4, 4);
    const k = nz(rng, -3, 3);
    const P = add(H0, scale(n, k));
    if (!inBox(P, 12)) continue;
    const d0 = dot(n, H0).neg();
    const N = normI(n);
    const e = dot(n, P).add(d0); // = k·N²
    return { n, H: H0, P, k, d0, N, e, dist: q(Math.abs(k) * N) };
  }
  const n = [q(2), q(-1), q(2)];
  return { n, H: [q(3), q(1), q(2)], P: [q(5), q(0), q(4)], k: 1, d0: q(-9), N: 3, e: q(9), dist: q(3), fallback: true };
}

function lineData(rng) {
  for (let t = 0; t < 300; t++) {
    const v = niceVec(rng, { maxNorm: 7 });
    const w = niceVec(rng, { maxNorm: 7 });
    if (dot(v, w).n !== 0) continue;
    const A = randVec(rng, -4, 4);
    const t0 = nz(rng, -2, 2);
    const H0 = add(A, scale(v, t0));
    const P = add(H0, w);
    if (!inBox(P, 12) || !inBox(H0, 12)) continue;
    return { A, v, w, t0, H: H0, P, dist: q(normI(w)) };
  }
  const v = [q(1), q(2), q(2)];
  return { A: [q(1), q(0), q(0)], v, w: [q(2), q(1), q(-2)], t0: 1, H: [q(2), q(2), q(2)], P: [q(4), q(3), q(0)], dist: q(3), fallback: true };
}

// « 2·5 − 0 + 2·4 − 9 »: the plane's equation at P.
const evalT = (n, P, d0) => `${n.map((x, i) => `${par(x)}·${par(P[i])}`).join(' + ')} + ${par(d0)}`;

function planeParts(d, level, { check = true } = {}) {
  const { n, P, H: H0, d0, N, e } = d;
  const N2 = norm2(n);
  const pl = plane(n, H0);
  const parts = [
    {
      html: t("On remplace P dans le membre de gauche de l'équation du plan : e = ax₀ + by₀ + cz₀ + d."), start: 'e', judge: { kind: 'vector', expect: qt(e) }, menu: DP_MENU.eval,
      lines: [{ math: `${evalT(n, P, d0)} = ${qt(e)}`, note: t('Remplacer P dans l\'équation du plan'), subgoal: 'eval', end: true, blank: [qt(e)], blank2: [qt(e)] }],
    },
    {
      html: t('La distance d de P au plan ?'), ask: 'd =', start: 'd', judge: { kind: 'value', expect: qt(d.dist), form: 'exact', dist: { e: qt(e), n: String(N) } }, menu: DP_MENU.dist,
      lines: [
        { math: `|${qt(e)}|/√(${squaresT(n)})`, note: `‖n⃗‖ = √(${squaresT(n)}) = ${N}`, subgoal: 'dist', blank: [squaresT(n)], blank2: [] },
        { math: qt(d.dist), note: '', subgoal: 'dist' },
      ],
    },
    {
      html: t('Le pied H de la perpendiculaire issue de P (n⃗ = {v1}) ?', { v1: vr(n) }), ask: 'H =', start: 'H',
      judge: { kind: 'vector', symbols: { P: vt(P), n: vt(n) }, expect: vt(H0) }, menu: DP_MENU.foot,
      lines: [
        { math: `H = P - (${qt(e)}/${qt(N2)})·n`, note: 'H = P − (e/‖n⃗‖²)·n⃗', subgoal: 'foot', blank: [qt(N2)], blank2: [] },
        { math: vt(H0), note: '', subgoal: 'foot', blank: txt(H0), blank2: [] },
      ],
    },
  ];
  if (check) {
    parts.push({
      html: t('Contrôle : H est dans le plan.'), ask: t('en H :'), start: 'e_H', judge: { kind: 'vector', expect: '0' }, menu: DP_MENU.foot,
      lines: [{ math: `${evalT(n, H0, d0)} = 0`, note: '', subgoal: 'foot' }],
    });
  }
  return { parts, pl };
}

function lineParts(d) {
  const { A, v, P, t0, H: H0, w } = d;
  const ap = sub(P, A);
  const apv = dot(ap, v);
  const v2 = norm2(v);
  const sym = { A: vt(A), P: vt(P), v: vt(v) };
  return [
    {
      html: t('Le pied H = A + t·v⃗ de la perpendiculaire issue de P, avec A{v1} et v⃗ = {v2} : t ?', { v1: vr(A), v2: vr(v) }), start: 't', judge: { kind: 'vector', symbols: sym, expect: String(t0) }, menu: DP_MENU.eval,
      lines: [
        { math: 't = AP·v/(v·v)', note: t('AP⃗ = {v1} : H = A + t·v⃗ avec t = AP⃗·v⃗/‖v⃗‖²', { v1: vr(ap) }), subgoal: 'foot' },
        { math: String(t0), note: `t = ${fq(apv)}/${fq(v2)}`, subgoal: 'foot', blank: [String(t0)], blank2: [String(t0)] },
      ],
    },
    {
      html: t('t = {v1}. Le pied H ?', { v1: fq(t0) }), ask: 'H =', start: 'H', judge: { kind: 'vector', symbols: sym, expect: vt(H0) }, menu: DP_MENU.foot,
      lines: [
        { math: `H = A ${t0 < 0 ? '-' : '+'} ${Math.abs(t0)}·v`, note: '', subgoal: 'foot' },
        { math: vt(H0), note: '', subgoal: 'foot', blank: txt(H0), blank2: [] },
      ],
    },
    {
      html: t('La distance d = PH ?'), ask: 'd =', start: 'd', judge: { kind: 'value', expect: qt(d.dist), form: 'exact' }, menu: DP_MENU.dist,
      lines: [
        { math: `√(${squaresT(w)})`, note: `PH⃗ = ${vr(w.map((x) => x.neg()))}`, subgoal: 'dist', blank: [squaresT(w)], blank2: [] },
        { math: qt(d.dist), note: '', subgoal: 'dist' },
      ],
    },
  ];
}

const DP_DECISION = (isPlane) => ({
  levels: [2], kind: 'decision', prompt: t('Quelle méthode ?'), options: [
    { id: 'plane', label: t('Point-plan : la formule |ax₀ + by₀ + cz₀ + d|/‖n⃗‖'), valid: isPlane, ref: isPlane, why: t('Ici, c\'est une droite : il n\'y a pas d\'équation à évaluer, on projette.') },
    { id: 'line', label: t('Point-droite : le pied H par projection sur la direction'), valid: !isPlane, ref: !isPlane, why: t('Ici, c\'est un plan : la formule avec la normale donne la distance directement.') },
  ],
});

function distPointItem(level, rng, opts = {}) {
  const isPlane = level === 1 ? true : level === 5 || opts.exam ? false : rng.chance(0.55);
  if (isPlane) {
    const d = planeData(rng);
    const { parts, pl } = planeParts(d, level, { check: level <= 4 });
    parts[0].decisions = [DP_DECISION(true)];
    return partsB({
      skill: DP, level, parts, subgoals: DP_SUB,
      prompt: t('Calcule la distance du point {v1} au plan {v2}, puis le pied H de la perpendiculaire issue de P.', { v1: ptR('P', d.P), v2: ML3(pl) }),
      key: `${DP}:plane:${vt(d.P)}:${pl}`, fallback: d.fallback,
      hints: H(t('Remplace P dans l\'équation, puis divise par la norme de la normale.'), `d = |${fq(d.e)}|/□`, `d = ${fq(d.dist)}, H = ${vr(d.H)}`),
    });
  }
  const d = lineData(rng);
  const parts = lineParts(d);
  parts[0].decisions = [DP_DECISION(false)];
  let prompt = t('Calcule la distance du point {v1} à la droite d : {v2}, en passant par le pied H de la perpendiculaire.', { v1: ptR('P', d.P), v2: ML3(paramT(d.A, [d.v])) });
  if (level === 5 || opts.exam) {
    // Vrai ou faux justifié: is the projection of P on d the point K?
    const truth = rng.chance(0.5);
    const K = truth ? d.H : add(d.A, scale(d.v, d.t0 + (rng.chance(0.5) ? 1 : -1)));
    parts[2].decisions = [{
      kind: 'decision', prompt: t('La projection orthogonale de P sur d est-elle K{v1} ?', { v1: vr(K) }), options: [
        { id: 'yes', label: t('Oui'), valid: truth, ref: truth, why: t('Non : le pied est H = {v1}.', { v1: vr(d.H) }) },
        { id: 'no', label: t('Non'), valid: !truth, ref: !truth, why: t('Si : le pied calculé est H = {v1} = K.', { v1: vr(d.H) }) },
      ],
    }];
    prompt = t('On donne le point {v1} et la droite d : {v2}. La projection orthogonale de P sur d est-elle le point K{v3} ? Justifie en calculant le pied H, puis donne la distance de P à d.', { v1: ptR('P', d.P), v2: ML3(paramT(d.A, [d.v])), v3: vr(K) });
  }
  return partsB({
    skill: DP, level: opts.exam ? 4 : level, parts, subgoals: DP_SUB, prompt,
    key: `${DP}:line:${vt(d.P)}:${vt(d.A)}${vt(d.v)}${level === 5 || opts.exam ? ':vf' : ''}`, fallback: d.fallback,
    hints: H(t('Le pied H = A + t·v⃗ rend PH⃗ orthogonal à v⃗ : t = AP⃗·v⃗/‖v⃗‖².'), `t = □/${fq(norm2(d.v))}`, `H = ${vr(d.H)}, d = ${fq(d.dist)}`),
    exam: opts.exam ? examTag(opts, 5) : false,
  });
}

function distPointExam(rng, exam) {
  if (exam === 'open') return distPointItem(5, rng, { exam });
  const d = planeData(rng);
  const pl = plane(d.n, d.H);
  if (exam === 'coef') {
    const i = rng.int(0, 2);
    return coefItem({
      skill: DP, key: `${vt(d.P)}:${pl}:${i}`, exam: examTag({ exam }), label: `${'xyz'[i]}_H`,
      prompt: t('H est le pied de la perpendiculaire issue de {v1} sur le plan {v2}. Que vaut sa coordonnée {v3} ?', { v1: ptR('P', d.P), v2: ML3(pl), v3: 'xyz'[i] }),
      value: qt(d.H[i]), traps: [{ rule: 'g4_proj_no_square' }],
      solution: [{ html: `H = P − (${fq(d.e)}/${fq(norm2(d.n))})·n⃗ = ${vr(d.H)}`, note: '' }],
      fallback: d.fallback,
    });
  }
  if (exam === 'tf') {
    // A proposed foot: right, or P − (e/‖n‖)·n (g4_proj_no_square), or P − e·n.
    const w = rng.int(0, 2);
    const K = w === 0 ? d.H : w === 1 ? sub(d.P, scale(d.n, d.e.div(d.N))) : sub(d.P, scale(d.n, d.e));
    const truth = w === 0 || d.N === 1;
    const st = t('Le pied de la perpendiculaire issue de {v1} sur le plan {v2} est le point {v3}.', { v1: ptR('P', d.P), v2: ML3(pl), v3: vr(K) });
    if (truth) return tfG({ skill: DP, key: `foot:${vt(d.P)}:${pl}:${vt(K)}`, truth: true, exam: examTag({ exam }), statement: st, explanation: t('Vrai : H = P − ({v1}/{v2})·n⃗ = {v3}, et H est dans le plan.', { v1: fq(d.e), v2: fq(norm2(d.n)), v3: vr(d.H) }) });
    return tfG({
      skill: DP, key: `foot:${vt(d.P)}:${pl}:${vt(K)}`, truth: false, exam: examTag({ exam }), statement: st, ruleIfTrue: 'g4_proj_no_square',
      counter: geoCounter('footOfPlane', [['H', t('le vrai pied H =')]], { H: vt(d.H) }, { n: d.n.map((x) => x.valueOf()), d: d.d0.valueOf(), P: d.P.map((x) => x.valueOf()), wrong: K.map((x) => x.valueOf()) }),
      explanation: t('Faux : le pied est H = P − (e/‖n⃗‖²)·n⃗ avec e = {v1} et ‖n⃗‖² = {v2}, soit H = {v3}.', { v1: fq(d.e), v2: fq(norm2(d.n)), v3: vr(d.H) }),
    });
  }
  return mcqD({
    skill: DP, level: 4, key: `mcq:${vt(d.P)}:${pl}`, exam: examTag({ exam }),
    prompt: t('Quelle est la distance du point {v1} au plan {v2} ?', { v1: ptR('P', d.P), v2: ML3(pl) }),
    right: fq(d.dist),
    wrongs: [{ html: fq(absQ(d.e)), rule: 'g4_dist_no_norm' }, { html: fq(d.e), rule: 'g4_dist_no_norm' }, { html: fq(absQ(d.e).div(norm2(d.n))), rule: 'g4_proj_no_square' }],
    fillers: [{ html: fq(d.dist.add(1)) }, { html: fq(d.dist.mul(2)) }],
    solution: [{ html: `d = |${fq(d.e)}|/‖n⃗‖ = |${fq(d.e)}|/${d.N} = ${fq(d.dist)}`, note: '' }],
    fallback: d.fallback,
  }, rng);
}

// ======================================================================
// Skew lines: data of g4-dist-skew and g4-common-perp
// ======================================================================

// n of whole norm, u, v orthogonal to n (u ∧ v = λn), P = A + s₀u,
// Q = P + k·n, B = Q + t₀v: PQ is the common perpendicular, d = |k|·‖n‖.
function skewData(rng) {
  for (let t = 0; t < 300; t++) {
    const n = niceVec(rng, { maxNorm: 7 });
    const u = orthTo(rng, n);
    const v = orthTo(rng, n, { avoid: u });
    const A = randVec(rng, -3, 3);
    const s0 = nz(rng, -2, 2);
    const t0 = nz(rng, -2, 2);
    const k = rng.pick([1, -1, 2, -2]);
    if (normI(n) > 3 && Math.abs(k) === 2) continue;
    const P = add(A, scale(u, s0));
    const Q = add(P, scale(n, k));
    const B = add(Q, scale(v, t0));
    if (![A, B, P, Q].every((X) => inBox(X, 8))) continue;
    if (zeros(u) > 1 || zeros(v) > 1) continue;
    return { n, u, v, A, B, P, Q, s0, t: -t0, k, nn: cross(u, v), dist: q(Math.abs(k) * normI(n)) };
  }
  const [A, u, B, v] = [[-1, 1, 0], [2, -1, 0], [4, 2, 1], [2, 0, -1]].map((p) => p.map((x) => q(x)));
  return { n: [q(1), q(2), q(2)], u, v, A, B, P: [q(1), q(0), q(0)], Q: [q(2), q(2), q(2)], s0: 1, t: -1, k: 1, nn: cross(u, v), dist: q(3), fallback: true };
}
const lineT = (P, v, name = 't') => paramT(P, [v], [name]);

// ======================================================================
// g4-dist-skew
// ======================================================================

const DS = 'g4-dist-skew';
const DS_SUB = [
  { id: 'normal', label: t('normale commune'), skill: CR },
  { id: 'mixte', label: t('produit mixte'), skill: TR },
  { id: 'dist', label: t('distance'), skill: DS },
];
const DS_MENU = [
  { id: 'cross', label: 'n⃗ = u⃗ ∧ v⃗', valid: true },
  { id: 'ab', label: t('AB⃗ entre les points de base'), valid: true },
  { id: 'dot', label: t('Produit scalaire AB⃗·n⃗'), valid: true },
  { id: 'div', label: t('Diviser par ‖n⃗‖'), valid: true },
  { id: 'len', label: t('La longueur AB'), valid: false, rule: 'g4_skew_any_points', why: t('A et B sont des points quelconques : la distance est la projection de AB⃗ sur n⃗.') },
];

function skewParts(d, level, { line2 = null } = {}) {
  const { u, v, A, B, nn } = d;
  const ab = sub(B, A);
  const abn = dot(ab, nn);
  const nn2 = norm2(nn);
  const sym = { A: vt(A), B: vt(B), u: vt(u), v: vt(v) };
  const parts = [];
  if (line2) {
    parts.push({
      html: t('D\'abord une paramétrisation de d₂.'), ask: 'd₂ :', start: 'd_2',
      judge: { kind: 'geom', object: 'line3', ref: lineT(B, v), form: 'param' },
      lines: [{ math: lineT(B, v), note: t('B{v1} est sur les deux plans ; v⃗ est orthogonal à leurs deux normales', { v1: vr(B) }), subgoal: 'normal' }],
    });
  }
  if (level >= 2) {
    parts.push({
      html: line2 ? t('La normale commune ?') : null, ask: 'n⃗ =', start: 'n', judge: { kind: 'vector', symbols: sym, expect: 'u ∧ v', cross: [txt(u), txt(v)] }, menu: DS_MENU,
      lines: [
        { math: `n = u ∧ v = ${vt(u)} ∧ ${vt(v)}`, note: t('Orthogonal aux deux droites'), subgoal: 'normal' },
        { math: vt(nn), note: '', subgoal: 'normal', blank: txt(nn), blank2: [qt(nn[1])] },
      ],
    });
  }
  parts.push({
    html: level === 1 ? t('n⃗ = u⃗ ∧ v⃗ = {v1}. Le vecteur AB⃗ ?', { v1: vr(nn) }) : t('Le vecteur AB⃗ entre les points de base ?'), ask: 'AB⃗ =', start: 'AB',
    judge: { kind: 'vector', symbols: sym, expect: 'vec(A,B)' }, menu: DS_MENU,
    lines: [{ math: vt(ab), note: 'B − A', subgoal: 'mixte', blank: txt(ab), blank2: [] }],
  });
  parts.push({
    html: t('Le produit mixte AB⃗·n⃗ ?'), ask: 'AB⃗·n⃗ =', start: 'AB·n', judge: { kind: 'vector', expect: qt(abn) }, menu: DS_MENU,
    decisions: [{
      levels: [2], kind: 'decision', prompt: t('Que vérifie le produit mixte [AB⃗, u⃗, v⃗] = AB⃗·n⃗ ?'), options: [
        { id: 'skew', label: t('S\'il est non nul, les droites sont gauches'), valid: true, ref: true },
        { id: 'par', label: t('S\'il est nul, les droites sont gauches'), valid: false, why: t('Un produit mixte nul veut dire AB⃗, u⃗, v⃗ coplanaires : les droites sont dans un même plan (sécantes ou parallèles).') },
      ],
    }],
    lines: [{ math: `${dotT(ab, nn)} = ${qt(abn)}`, note: t('{v1} ≠ 0 : les droites sont gauches', { v1: fq(abn) }), subgoal: 'mixte', end: true, blank: [qt(abn)], blank2: [qt(abn)] }],
  });
  parts.push({
    html: t('La distance d entre les deux droites ?'), ask: 'd =', start: 'd',
    judge: { kind: 'value', expect: qt(d.dist), form: 'exact', dist: { e: qt(abn), n: rootT(nn2) }, skew: { ab2: qt(norm2(ab)) } }, menu: DS_MENU,
    lines: [
      { math: `|${qt(abn)}|/√(${squaresT(nn)})`, note: 'd = |AB⃗·n⃗|/‖n⃗‖', subgoal: 'dist', blank: [squaresT(nn)], blank2: [] },
      { math: qt(d.dist), note: '', subgoal: 'dist' },
    ],
  });
  return parts;
}

// Two planes through B whose intersection is the line (B, v).
function twoPlanes(rng, B, v) {
  const n1 = prim(orthTo(rng, v), true);
  const n2 = prim(cross(v, n1), true);
  return `${plane(n1, B)} ; ${plane(n2, B)}`;
}

function distSkewItem(level, rng, opts = {}) {
  const d = skewData(rng);
  const cart = level === 4 && rng.chance(0.4) ? twoPlanes(rng, d.B, d.v) : null;
  const parts = skewParts(d, level, { line2: cart });
  let prompt = t('Calcule la distance entre les droites gauches d₁ : {v1} et d₂ : {v2}.', { v1: ML3(lineT(d.A, d.u, 's')), v2: cart ? ML3(cart) : ML3(lineT(d.B, d.v)) });
  if (level === 5 || opts.exam) {
    parts.push(...perpParts(d, 4).slice(0));
    prompt = t('On donne les droites d₁ : {v1} et d₂ : {v2}. Montre qu\'elles sont gauches et calcule leur distance, puis trouve les points P ∈ d₁ et Q ∈ d₂ de leur perpendiculaire commune, et une équation de celle-ci.', { v1: ML3(lineT(d.A, d.u, 's')), v2: ML3(lineT(d.B, d.v)) });
  }
  return partsB({
    skill: DS, level: opts.exam ? 4 : level, parts, subgoals: level === 5 || opts.exam ? [...DS_SUB, ...CP_SUB] : DS_SUB, prompt,
    key: `${DS}:${vt(d.A)}${vt(d.u)}${vt(d.B)}${vt(d.v)}${cart ? ':cart' : ''}${level === 5 || opts.exam ? ':pb' : ''}`, fallback: d.fallback,
    hints: H(t('Projette AB⃗ sur la direction n⃗ = u⃗ ∧ v⃗, perpendiculaire aux deux droites.'), `d = |AB⃗·n⃗|/□`, `d = ${fq(d.dist)}`),
    exam: opts.exam ? examTag(opts, 6) : false, noHints: level === 5 || !!opts.exam,
  });
}

function distSkewExam(rng, exam) {
  if (exam === 'open') return distSkewItem(5, rng, { exam });
  const d = skewData(rng);
  const ab = sub(d.B, d.A);
  const abn = dot(ab, d.nn);
  if (exam === 'tf') {
    return tfG({
      skill: DS, key: `ab:${vt(d.A)}${vt(d.B)}`, truth: false, exam: examTag({ exam }), ruleIfTrue: 'g4_skew_any_points',
      statement: t('La distance entre les droites gauches d₁ : {v1} et d₂ : {v2} est la distance AB entre leurs points de base A{v3} et B{v4}.', { v1: ML3(lineT(d.A, d.u, 's')), v2: ML3(lineT(d.B, d.v)), v3: vr(d.A), v4: vr(d.B) }),
      counter: geoCounter('skewCloser', [['P', t('un point P de d₁ =')], ['Q', t('un point Q de d₂ =')]], { P: vt(d.P), Q: vt(d.Q) }, { A: d.A.map(Number), u: d.u.map(Number), B: d.B.map(Number), v: d.v.map(Number) }),
      explanation: t('Faux : AB = {v1}, mais P{v2} ∈ d₁ et Q{v3} ∈ d₂ sont à la distance {v4} : la distance est |AB⃗·n⃗|/‖n⃗‖ = {v4}.', { v1: rootR(norm2(ab)), v2: vr(d.P), v3: vr(d.Q), v4: fq(d.dist) }),
    });
  }
  return mcqD({
    skill: DS, level: 4, key: `mcq:${vt(d.A)}${vt(d.u)}${vt(d.B)}${vt(d.v)}`, exam: examTag({ exam }),
    prompt: t('Quelle est la distance entre les droites gauches d₁ : {v1} et d₂ : {v2} ?', { v1: ML3(lineT(d.A, d.u, 's')), v2: ML3(lineT(d.B, d.v)) }),
    right: fq(d.dist),
    wrongs: [{ html: fq(absQ(abn)), rule: 'g4_dist_no_norm' }, { html: rootR(norm2(ab)), rule: 'g4_skew_any_points' }],
    fillers: [{ html: fq(d.dist.mul(2)) }, { html: fq(d.dist.add(1)) }, { html: fq(absQ(abn).div(norm2(d.nn))) }],
    solution: [{ html: `n⃗ = u⃗ ∧ v⃗ = ${vr(d.nn)}, AB⃗ = ${vr(ab)}, d = |${fq(abn)}|/${rootR(norm2(d.nn))} = ${fq(d.dist)}`, note: '' }],
    fallback: d.fallback,
  }, rng);
}

// ======================================================================
// g4-common-perp
// ======================================================================

const CP = 'g4-common-perp';
const CP_SUB = [
  { id: 'pq', label: t('vecteur PQ⃗(s, t)'), skill: CP },
  { id: 'sys', label: t('résoudre le système en s et t'), skill: 'eq-systems' },
  { id: 'ctrl', label: t('contrôle : ‖PQ⃗‖ est la distance'), skill: DS },
];
const CP_MENU = [
  { id: 'cur', label: t('Point courant sur chaque droite, deux paramètres'), valid: true },
  { id: 'pq', label: 'PQ⃗ = Q − P', valid: true },
  { id: 'two', label: t('Deux conditions : PQ⃗·u⃗ = 0 et PQ⃗·v⃗ = 0'), valid: true },
  { id: 'solve', label: t('Résoudre en s et t'), valid: true },
  { id: 'one', label: t('Une condition PQ⃗·u⃗ = 0 suffit'), valid: false, rule: 'g4_common_perp_one_condition', why: t('PQ⃗ doit être perpendiculaire aux deux droites : deux conditions.') },
  { id: 'same', label: t('Le même paramètre t sur les deux droites'), valid: false, rule: 'g4_param_same_letter', why: t('P et Q sont deux points différents, chacun sur sa droite : il faut deux paramètres, s et t.') },
];

function perpParts(d, level, { line = true } = {}) {
  const { u, v, A, B, P, Q, s0, t: t0 } = d;
  const ab = sub(B, A);
  const sym = { A: vt(A), B: vt(B), u: vt(u), v: vt(v) };
  const perp = { A: txt(A), u: txt(u), B: txt(B), v: txt(v) };
  const comps = [0, 1, 2].map((i) => affT(ab[i], [[v[i], 't'], [u[i].neg(), 's']]));
  const pqT = `(${comps.join(' ; ')})`;
  const cond = (w) => {
    const startT = w.map((x, i) => `${par(x)}·(${comps[i]})`).join(' + ');
    const goal = affT(dot(ab, w), [[dot(v, w), 't'], [dot(u, w).neg(), 's']]);
    return { startT, goal };
  };
  const cu = cond(u);
  const cv = cond(v);
  const parts = [{
    html: level === 1 ? t('P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ : PQ⃗ = ({v1}).', { v1: comps.map(readable).join(' ; ') }) : t('P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?'), ask: 'PQ⃗ =', start: 'PQ',
    judge: { kind: 'vector', symbols: sym, params: ['s', 't'], expect: 'B + t·v - (A + s·u)', form: 'any' }, menu: CP_MENU,
    lines: [{ math: `PQ = ${pqT}`, note: 'AB⃗ + t·v⃗ − s·u⃗', subgoal: 'pq', blank: [comps[0]], blank2: [comps[1]] }],
  }, {
    html: t('1re condition : PQ⃗·u⃗ = 0.'), ask: 'PQ⃗·u⃗ =', start: cu.startT,
    judge: { kind: 'equiv', vars: ['s', 't'], target: 'goal', goal: cu.goal }, menu: CP_MENU,
    lines: [{ math: cu.goal, note: '= 0', subgoal: 'sys', blank: [qt(dot(ab, u))], blank2: [] }],
  }, {
    html: t('2e condition : PQ⃗·v⃗ = 0.'), ask: 'PQ⃗·v⃗ =', start: cv.startT,
    judge: { kind: 'equiv', vars: ['s', 't'], target: 'goal', goal: cv.goal }, menu: CP_MENU,
    lines: [{ math: cv.goal, note: '= 0', subgoal: 'sys', blank: [qt(dot(ab, v))], blank2: [] }],
  }, {
    html: t('Le système {v1} = 0 et {v2} = 0. s ?', { v1: readable(cu.goal), v2: readable(cv.goal) }), ask: 's =', start: 's',
    judge: { kind: 'value', expect: String(s0), perp: { ...perp, ask: 's' } }, menu: CP_MENU,
    lines: [{ math: String(s0), note: t('Par combinaison des deux équations'), subgoal: 'sys', blank: [String(s0)], blank2: [String(s0)] }],
  }, {
    html: t('Et t ?'), ask: 't =', start: 't',
    judge: { kind: 'value', expect: String(t0), perp: { ...perp, ask: 't' } }, menu: CP_MENU,
    lines: [{ math: String(t0), note: '', subgoal: 'sys', blank: [String(t0)], blank2: [String(t0)] }],
  }, {
    html: t('s = {v1}. Le point P ?', { v1: fq(s0) }), ask: 'P =', start: 'P',
    judge: { kind: 'vector', symbols: sym, expect: vt(P), perp }, menu: CP_MENU,
    lines: [{ math: vt(P), note: `P = A ${s0 < 0 ? '−' : '+'} ${Math.abs(s0)}·u⃗`, subgoal: 'sys', blank: txt(P), blank2: [] }],
  }, {
    html: t('t = {v1}. Le point Q ?', { v1: fq(t0) }), ask: 'Q =', start: 'Q',
    judge: { kind: 'vector', symbols: sym, expect: vt(Q), perp }, menu: CP_MENU,
    lines: [{ math: vt(Q), note: t('Q = B {v1} {v2}·v⃗ ; ‖PQ⃗‖ = {v3}, la distance des droites', { v1: t0 < 0 ? '−' : '+', v2: Math.abs(t0), v3: fq(d.dist) }), subgoal: 'ctrl', blank: txt(Q), blank2: [] }],
  }];
  if (line) {
    const dir = prim(sub(Q, P), true);
    parts.push({
      html: t('Une équation de la perpendiculaire commune (PQ) ?'), ask: '(PQ) :', start: 'p',
      judge: { kind: 'geom', object: 'line3', ref: lineT(P, dir, 'k') }, menu: CP_MENU,
      lines: [{ math: lineT(P, dir, 'k'), note: t('Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)'), subgoal: 'pq' }],
    });
  }
  return parts;
}

function commonPerpItem(level, rng, opts = {}) {
  const d = skewData(rng);
  const withLine = level === 5 || opts.exam || rng.chance(0.6);
  let parts = perpParts(d, level, { line: withLine });
  let prompt = t('On donne les droites gauches d₁ : {v1} et d₂ : {v2}. {v3}', { v1: ML3(lineT(d.A, d.u, 's')), v2: ML3(lineT(d.B, d.v)), v3: withLine ? t('Trouve leur perpendiculaire commune : les points P ∈ d₁ et Q ∈ d₂, puis une équation de la droite (PQ).') : t('Trouve les points P ∈ d₁ et Q ∈ d₂ les plus proches.') });
  if (level === 5 || opts.exam) {
    parts = [...skewParts(d, 4), ...parts];
    prompt = t('On donne les droites d₁ : {v1} et d₂ : {v2}. Calcule leur distance, puis trouve leur perpendiculaire commune (P ∈ d₁, Q ∈ d₂, et la droite (PQ)).', { v1: ML3(lineT(d.A, d.u, 's')), v2: ML3(lineT(d.B, d.v)) });
  }
  return partsB({
    skill: CP, level: opts.exam ? 4 : level, parts, subgoals: level === 5 || opts.exam ? [...CP_SUB, ...DS_SUB] : CP_SUB, prompt,
    key: `${CP}:${vt(d.A)}${vt(d.u)}${vt(d.B)}${vt(d.v)}${withLine ? ':line' : ''}${level === 5 || opts.exam ? ':pb' : ''}`, fallback: d.fallback,
    hints: H(t('Écris un point courant sur chaque droite, avec deux paramètres différents : PQ⃗ doit être orthogonal à u⃗ et à v⃗.'), `PQ⃗·u⃗ = ${readable(perpParts(d, 1)[1].lines[0].math)} = 0, PQ⃗·v⃗ = □`, `s = ${fq(d.s0)}, t = ${fq(d.t)}`),
    exam: opts.exam ? examTag(opts, 7) : false, noHints: level === 5 || !!opts.exam,
  });
}

function commonPerpExam(rng, exam) {
  if (exam === 'open') return commonPerpItem(5, rng, { exam });
  const d = skewData(rng);
  const i = rng.int(0, 2);
  return coefItem({
    skill: CP, key: `${vt(d.A)}${vt(d.u)}${vt(d.B)}${vt(d.v)}:${i}`, exam: examTag({ exam }), label: `${'xyz'[i]}_P`,
    prompt: t('La perpendiculaire commune aux droites d₁ : {v1} et d₂ : {v2} coupe d₁ en P. Que vaut la coordonnée {v3} de P ?', { v1: ML3(lineT(d.A, d.u, 's')), v2: ML3(lineT(d.B, d.v)), v3: 'xyz'[i] }),
    value: qt(d.P[i]), traps: [{ rule: 'g4_common_perp_one_condition' }],
    solution: [{ html: t('PQ⃗·u⃗ = PQ⃗·v⃗ = 0 donne s = {v1} et t = {v2} : P = {v3}, Q = {v4}.', { v1: fq(d.s0), v2: fq(d.t), v3: vr(d.P), v4: vr(d.Q) }), note: '' }],
    fallback: d.fallback,
  });
}

// ======================================================================
// g4-line-two-skew
// ======================================================================

const LS = 'g4-line-two-skew';
const LS_SUB = [
  { id: 'normal', label: t('normale de π'), skill: CR },
  { id: 'inter', label: 'π ∩ b', skill: 'g4-relative-pos' },
  { id: 'line', label: t('la droite n'), skill: LS },
];
const LS_MENU = [
  { id: 'nrm', label: t('Normale de π : u⃗ ∧ w⃗'), valid: true },
  { id: 'eq', label: t('Équation de π (contient a, de direction w⃗)'), valid: true },
  { id: 'inter', label: t('π ∩ b : remplacer la paramétrique de b'), valid: true },
  { id: 'line', label: t('La droite n : par Q, de direction w⃗'), valid: true },
  { id: 'wn', label: t('Normale de π : w⃗'), valid: false, rule: 'g4_normal_as_direction', why: t('π contient la direction w⃗ : w⃗ est dans le plan, pas normal à lui.') },
];

// P, w; Q = P + k·w; a = (P, u), b = (Q, v) with [u, v, w] ≠ 0; base points shifted.
function twoSkewData(rng, kind = 'one') {
  for (let t = 0; t < 400; t++) {
    const P = randVec(rng, -3, 3);
    const w = randVec(rng, -2, 2);
    const u = randVec(rng, -2, 2);
    if (isZero(w) || isZero(u) || zeros(cross(u, w)) > 1 || zeros(u) > 1) continue;
    let v;
    if (kind === 'one') {
      v = randVec(rng, -2, 2);
      if (isZero(v) || zeros(v) > 1 || dot(cross(u, w), v).n === 0) continue;
    } else {
      // v in the plane of u and w: b ∥ π (kind 'none') or b ⊂ π ('inf').
      const [a1, a2] = [nz(rng, -2, 2), nz(rng, -2, 2)];
      v = add(scale(u, a1), scale(w, a2));
      if (zeros(v) > 1 || !inBox(v, 4)) continue;
    }
    const k = nz(rng, -2, 2);
    let Q = add(P, scale(w, k));
    if (kind === 'none') Q = add(Q, cross(u, w).map((x) => x.div(Math.max(1, ...cross(u, w).map((y) => Math.abs(y.valueOf())))))).map((x) => q(Math.round(x.valueOf())));
    const s1 = nz(rng, -2, 2);
    const t1 = nz(rng, -2, 2);
    const Pa = add(P, scale(u, s1));
    const Qb = add(Q, scale(v, t1));
    const nn = prim(cross(u, w), true);
    if (kind === 'none' && dot(nn, sub(Q, P)).n === 0) continue;
    if (![P, Q, Pa, Qb].every((X) => inBox(X, 8))) continue;
    if (kind === 'one' && dot(cross(u, v), sub(Q, P)).n === 0) continue;
    const tq = q(-t1);
    return { P, Q, w, u, v, k, Pa, Qb, nn, tq };
  }
  const [P, w, u, v] = [[1, 2, 0], [1, -1, 2], [1, 0, 1], [0, 1, 1]].map((p) => p.map((x) => q(x)));
  return { P, Q: [q(2), q(1), q(2)], w, u, v, k: 1, Pa: [q(-1), q(2), q(-2)], Qb: [q(2), q(2), q(3)], nn: [q(1), q(-1), q(-1)], tq: q(-1), fallback: true };
}

function twoSkewItem(level, rng, opts = {}) {
  const d = twoSkewData(rng, 'one');
  const { Pa, Qb, u, v, w, nn, Q, tq } = d;
  const pi = plane(nn, Pa);
  const asNormal = level >= 4 && rng.chance(0.5);
  const alpha = asNormal ? plane(prim(w), [q(rng.int(-2, 2)), q(rng.int(-2, 2)), q(rng.int(-2, 2))]) : null;
  const sym = { u: vt(u), w: vt(w), B: vt(Qb), v: vt(v) };
  const parts = [];
  if (level >= 2) {
    parts.push({
      html: null, ask: 'n⃗_π =', start: 'n_π', judge: { kind: 'vector', symbols: sym, expect: 'u ∧ w', multiple: true }, menu: LS_MENU,
      decisions: [{
        levels: [2], kind: 'decision', prompt: t('Quelle méthode ?'), options: [
          { id: 'planes', label: t('Méthode des plans : π contient a et la direction w⃗, puis π ∩ b'), valid: true, quality: 'good', ref: true },
          { id: 'params', label: t('Méthode des paramètres : Q(t) − P(s) = k·w⃗'), valid: true, quality: 'good' },
        ],
      }],
      lines: [{ math: `n = u ∧ w = ${vt(u)} ∧ ${vt(w)}`, note: t('Orthogonal à a et à w⃗'), subgoal: 'normal' }, { math: vt(cross(u, w)), note: '', subgoal: 'normal', blank: txt(cross(u, w)), blank2: [] }],
    });
  }
  parts.push({
    html: level === 1 ? t('π contient a et la direction w⃗ ; sa normale est u⃗ ∧ w⃗ = {v1}. Une équation de π ?', { v1: vr(cross(u, w)) }) : t('Une équation du plan π qui contient a, de direction w⃗ ?'), ask: 'π :', start: 'π',
    judge: { kind: 'geom', object: 'plane', ref: pi }, menu: LS_MENU,
    lines: [{ math: pi, note: t('Par le point {v1} de a', { v1: vr(Pa) }), subgoal: 'normal' }],
  });
  parts.push({
    html: t('π ∩ b : on remplace B + t·v⃗ dans l\'équation de π. t ?'), ask: 't =', start: 't', judge: { kind: 'value', expect: qt(tq) }, menu: LS_MENU,
    lines: [{ math: qt(tq), note: `${readable(sumT([[dot(nn, Qb), ''], [dot(nn, v), 't']]))} ${dot(nn, Pa).neg().n < 0 ? '−' : '+'} ${fq(absQ(dot(nn, Pa)))} = 0`, subgoal: 'inter', blank: [qt(tq)], blank2: [qt(tq)] }],
  });
  parts.push({
    html: t('t = {v1}. Le point Q = π ∩ b ?', { v1: fq(tq) }), ask: 'Q =', start: 'Q', judge: { kind: 'vector', symbols: sym, expect: vt(Q) }, menu: LS_MENU,
    lines: [{ math: vt(Q), note: '', subgoal: 'inter', blank: txt(Q), blank2: [] }],
  });
  parts.push({
    html: t('La droite n, par Q, de direction w⃗ ?'), ask: 'n :', start: 'n', judge: { kind: 'geom', object: 'line3', ref: lineT(Q, w, 'k') }, menu: LS_MENU,
    lines: [{ math: lineT(Q, w, 'k'), note: t('Contrôle : pour k = {v1}, on retrouve un point de a', { v1: fq(q(-d.k)) }), subgoal: 'line' }],
  });
  if (level === 5 || opts.exam) {
    parts[0].decisions = [{
      kind: 'decision', prompt: t('Combien de droites de direction w⃗ s\'appuient sur a et b ?'), options: [
        { id: 'one', label: t('Une seule : b n\'est pas parallèle à π'), valid: true, ref: true },
        { id: 'none', label: t('Aucune'), valid: false, why: t('Il n\'y en a aucune seulement si b est parallèle à π sans y être ; ici v⃗·n⃗ = {v1} ≠ 0.', { v1: fq(dot(v, nn)) }) },
        { id: 'inf', label: t('Une infinité'), valid: false, why: t('Il y en a une infinité seulement si b est dans π ; ici v⃗·n⃗ = {v1} ≠ 0.', { v1: fq(dot(v, nn)) }) },
      ],
    }];
  }
  const lines = { v1: ML3(lineT(Pa, u, 's')), v2: ML3(lineT(Qb, v, 't')) };
  return partsB({
    skill: LS, level: opts.exam ? 4 : level, parts, subgoals: LS_SUB,
    prompt: (asNormal
      ? t('On donne les droites gauches a : {v1} et b : {v2}. Trouve la droite n, normale au plan α : {v3}, qui coupe a et b.', { ...lines, v3: ML3(alpha) })
      : t('On donne les droites gauches a : {v1} et b : {v2}. Trouve la droite n, de direction w⃗ = {v3}, qui coupe a et b.', { ...lines, v3: vr(w) }))
      + (level === 5 || opts.exam ? t(' Commence par dire combien il y a de solutions.') : ''),
    key: `${LS}:${vt(Pa)}${vt(u)}${vt(Qb)}${vt(v)}${vt(w)}${asNormal ? ':alpha' : ''}`, fallback: d.fallback,
    hints: H(t('La droite n et la droite a sont dans un même plan π, qui contient la direction w⃗.'), t('normale de π = u⃗ ∧ □'), `π : ${readable(pi)}`),
    exam: opts.exam ? examTag(opts, 6) : false, noHints: level === 5 || !!opts.exam,
  });
}

function twoSkewExam(rng, exam) {
  if (exam === 'open') return twoSkewItem(5, rng, { exam });
  const kind = rng.pick(['one', 'none', 'inf']);
  const d = twoSkewData(rng, kind);
  const right = { one: t('Une seule'), none: t('Aucune'), inf: t('Une infinité') }[kind];
  const why = { one: t('b coupe le plan π qui contient a et la direction w⃗ : une seule droite, par le point d\'intersection.'), none: t('b est parallèle au plan π (qui contient a et la direction w⃗) sans y être : aucune droite.'), inf: t('b est contenue dans le plan π qui contient a et la direction w⃗ : chaque point de b donne une droite.') }[kind];
  return mcqD({
    skill: LS, level: 4, key: `mcq:${kind}:${vt(d.Pa)}${vt(d.u)}${vt(d.Qb)}${vt(d.v)}${vt(d.w)}`, exam: examTag({ exam }),
    prompt: t('On donne a : {v1}, b : {v2} et w⃗ = {v3}. Combien y a-t-il de droites de direction w⃗ qui coupent a et b ?', { v1: ML3(lineT(d.Pa, d.u, 's')), v2: ML3(lineT(d.Qb, d.v, 't')), v3: vr(d.w) }),
    right, wrongs: [t('Une seule'), t('Aucune'), t('Une infinité'), t('Deux')].filter((x) => x !== right).map((html) => ({ html })),
    solution: [{ html: t('Le plan π contient a et la direction w⃗ : normale u⃗ ∧ w⃗ = {v1}. {why}', { v1: vr(cross(d.u, d.w)), why }), note: '' }],
    fallback: d.fallback, keepOrder: false,
  }, rng);
}

// ======================================================================
// g4-sphere
// ======================================================================

const SP = 'g4-sphere';
const SP_SUB = [
  { id: 'sq', label: t('compléter les carrés'), skill: 'quad-complete' },
  { id: 'cr', label: t('centre et rayon'), skill: SP },
  { id: 'tan', label: t('plan tangent'), skill: 'g4-plane' },
  { id: 'sec', label: t('section : distance du centre au plan'), skill: 'g4-dist-point' },
];
const SP_MENU = [
  { id: 'cx', label: t('Compléter le carré en x'), valid: true },
  { id: 'cy', label: t('Compléter le carré en y'), valid: true },
  { id: 'cz', label: t('Compléter le carré en z'), valid: true },
  { id: 'r', label: t('Lire le centre et le rayon'), valid: true },
  { id: 'tan', label: t('Plan tangent : normale CT⃗'), valid: true },
  { id: 'sec', label: t('Section : √(r² − δ²)'), valid: true },
  { id: 'nosub', label: t('Écrire (x − h)² sans retirer h²'), valid: false, rule: 'g4_square_constant', why: t('(x − h)² = x² − 2hx + h² : la constante h² ajoutée doit être retirée.') },
];
// Whole vectors of each whole norm (for T = C + w).
const NORM_VEC = { 1: [1, 0, 0], 2: [2, 0, 0], 3: [1, 2, 2], 4: [0, 0, 4], 5: [0, 3, 4], 6: [2, 4, 4], 7: [2, 3, 6] };
const PERM3 = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
const vecOfNorm = (rng, r) => { const b = NORM_VEC[r]; const p = rng.pick(PERM3); return p.map((i) => q(b[i] * (rng.chance(0.5) ? -1 : 1))); };

// x² + y² + z² − 2ax − 2by − 2cz + (a² + b² + c² − r²) = 0, times k.
const sphereEq = (C, r2, k = 1) => `${sumT([[k, 'x^2'], [k, 'y^2'], [k, 'z^2'], ...C.map((c, i) => [q(c).mul(-2 * k), 'xyz'[i]]), [norm2(C).sub(r2).mul(k), '']])} = 0`;
const reducedT = (C, r2) => `${C.map((c, i) => (q(c).n === 0 ? `${'xyz'[i]}^2` : `(${'xyz'[i]} ${q(c).n > 0 ? '-' : '+'} ${qt(absQ(c))})^2`)).join(' + ')} = ${qt(r2)}`;
// (x − 1)² − 1 + (y + 2)² − 4 + …: the squares completed, constants kept.
const completedT = (C, r2) => {
  const k = norm2(C).sub(r2);
  return `${C.map((c, i) => (q(c).n === 0 ? `${'xyz'[i]}^2` : `(${'xyz'[i]} ${q(c).n > 0 ? '-' : '+'} ${qt(absQ(c))})^2 - ${qt(q(c).mul(q(c)))}`)).join(' + ')}${k.n === 0 ? '' : ` ${k.n < 0 ? '-' : '+'} ${qt(absQ(k))}`} = 0`;
};

function sphereData(rng, { degenerate = false } = {}) {
  const C = randVec(rng, -5, 5);
  if (degenerate) {
    const r2 = q(rng.pick([0, -1, -4, -9, -2]));
    return { C, r: null, r2 };
  }
  const r = rng.int(1, 7);
  return { C, r, r2: q(r * r) };
}

function sphereParts(d, level, k) {
  const { C, r2 } = d;
  const eq0 = sphereEq(C, r2, k);
  const ref = sphereEq(C, r2);
  const parts = [{
    html: null, start: eq0,
    judge: { kind: 'geom', object: 'sphere', ref }, menu: SP_MENU,
    lines: [
      ...(k > 1 ? [{ math: ref, note: t('Diviser par {k}', { k }), subgoal: 'sq' }] : []),
      { math: completedT(C, r2), note: t('Compléter un carré par variable'), subgoal: 'sq', blank: C.filter((c) => q(c).n !== 0).map((c) => qt(q(c).mul(q(c)))), blank2: [] },
      { math: reducedT(C, r2), note: t('Forme réduite'), subgoal: 'sq', blank: [qt(r2)], blank2: [] },
    ],
  }];
  return { parts, eq0 };
}

function sphereItem(level, rng, opts = {}) {
  const degenerate = level >= 2 && level <= 4 && !opts.exam && rng.int(0, 5) === 0;
  const d = sphereData(rng, { degenerate });
  const k = level >= 4 && rng.chance(0.3) ? rng.pick([2, 3]) : 1;
  const { parts, eq0 } = sphereParts(d, level, k);
  const sym = { C: vt(d.C) };
  if (degenerate) {
    const kind = d.r2.n === 0 ? 'point' : 'vide';
    parts.push({
      html: t('r² = {v1}. Quel ensemble ?', { v1: fq(d.r2) }), ask: 'r² =', start: 'r^2', judge: { kind: 'value', expect: qt(d.r2) },
      decisions: [{
        kind: 'decision', prompt: t('L\'équation décrit…'), options: [
          { id: 'sph', label: t('une sphère (r² > 0)'), valid: false, why: t('r² = {v1} n\'est pas positif.', { v1: fq(d.r2) }) },
          { id: 'pt', label: t('un seul point, le centre (r² = 0)'), valid: kind === 'point', ref: kind === 'point', why: `r² = ${fq(d.r2)} < 0.` },
          { id: 'vide', label: t('l\'ensemble vide (r² < 0)'), valid: kind === 'vide', ref: kind === 'vide', why: t('r² = 0 : seul le centre convient.') },
        ],
      }],
      lines: [{ math: qt(d.r2), note: kind === 'point' ? t('Un seul point : C{v1}', { v1: vr(d.C) }) : t('Une somme de carrés n\'est jamais négative : aucun point'), subgoal: 'cr' }],
    });
  } else {
    parts.push({
      html: t('Le centre C ?'), ask: 'C =', start: 'C', judge: { kind: 'vector', expect: vt(d.C), circleEq: eq0 }, menu: SP_MENU,
      lines: [{ math: vt(d.C), note: '', subgoal: 'cr', blank: txt(d.C), blank2: [] }],
    });
    parts.push({
      html: t('Le rayon r ?'), ask: 'r =', start: 'r', judge: { kind: 'value', expect: String(d.r) }, menu: SP_MENU,
      lines: [{ math: String(d.r), note: `r² = ${d.r * d.r}`, subgoal: 'cr', blank: [String(d.r)], blank2: [] }],
    });
    const gab = level === 5 || opts.exam ? 'both' : level >= 3 ? rng.pick(['cr', 'tan', 'sec']) : 'cr';
    if (gab === 'tan' || gab === 'both') {
      const w = vecOfNorm(rng, d.r);
      const T = add(d.C, w);
      const nT = prim(w, true);
      parts.push({
        html: t('Le plan tangent en {v1} : sa normale est CT⃗.', { v1: ptR('T', T) }), ask: 'n⃗ =', start: 'n', judge: { kind: 'vector', symbols: { C: vt(d.C), T: vt(T) }, expect: 'vec(C,T)', multiple: true }, menu: SP_MENU,
        lines: [{ math: `n = CT = ${vt(w)}`, note: t('Le rayon CT est perpendiculaire au plan tangent'), subgoal: 'tan' }],
      });
      parts.push({
        html: t('Une équation du plan tangent ?'), ask: 'π :', start: 'π', judge: { kind: 'geom', object: 'plane', ref: plane(nT, T) }, menu: SP_MENU,
        lines: [{ math: plane(nT, T), note: t('Par T, de normale {v1}', { v1: vr(nT) }), subgoal: 'tan' }],
      });
      d.T = T;
    }
    if (gab === 'sec' || gab === 'both') {
      // A plane at distance δ < r from C: n of whole norm, δ whole.
      const n = niceVec(rng, { maxNorm: 7 });
      const N = normI(n);
      const delta = rng.int(0, d.r - 1);
      const sgn = rng.chance(0.5) ? 1 : -1;
      const Hc = add(d.C, scale(n, q(sgn * delta, N)));
      const pl = plane(n.map((x) => x.mul(1)), Hc);
      const plI = linT(prim([...n, dot(n, Hc).neg()].map((x) => x.mul(N)), true));
      const rho2 = q(d.r * d.r - delta * delta);
      parts.push({
        html: t('La section par le plan {v1}. La distance δ du centre au plan ?', { v1: ML3(plI) }), ask: 'δ =', start: 'δ',
        judge: { kind: 'value', expect: String(delta), form: 'exact' }, menu: SP_MENU,
        lines: [{ math: String(delta), note: 'δ = |n⃗·C + d|/‖n⃗‖', subgoal: 'sec' }],
      });
      parts.push({
        html: t('δ = {delta} < r = {r} : la section est un cercle. Son rayon ρ ?', { delta, r: d.r }), ask: 'ρ =', start: 'ρ',
        judge: { kind: 'value', expect: rootT(rho2), form: 'exact' }, menu: SP_MENU,
        lines: [{ math: `√(${d.r}^2 - ${delta}^2)`, note: 'ρ² = r² − δ²', subgoal: 'sec' }, { math: rootT(rho2), note: '', subgoal: 'sec' }],
      });
      d.sec = { plane: plI, delta, rho: rootT(rho2), pl };
    }
    d.gab = gab;
  }
  const task = degenerate ? t('Quel ensemble décrit cette équation ?') : d.gab === 'tan' ? t('Donne son centre, son rayon, puis le plan tangent en T{v1}.', { v1: vr(d.T) }) : d.gab === 'sec' ? t('Donne son centre, son rayon, puis la section par le plan {v1}.', { v1: ML3(d.sec.plane) }) : d.gab === 'both' ? t('Donne son centre et son rayon, le plan tangent en T{v1}, puis la section par le plan {v2}.', { v1: vr(d.T), v2: ML3(d.sec.plane) }) : t('Donne son centre et son rayon.');
  return partsB({
    skill: SP, level: opts.exam ? 4 : level, parts, subgoals: SP_SUB,
    prompt: t('On donne {v1}. {task}', { v1: ML3(eq0), task }),
    key: `${SP}:${eq0}:${d.gab ?? 'deg'}${d.T ? vt(d.T) : ''}${d.sec ? d.sec.plane : ''}`,
    hints: H(t('Complète un carré par variable, comme pour un cercle : (x − h)² − h².'), (() => { const i = Math.max(0, d.C.findIndex((c) => q(c).n !== 0)); const c = d.C[i]; return `(${'xyz'[i]} ${q(c).n > 0 ? '−' : '+'} ${fq(absQ(c))})² − □ + …`; })(), `${readable(reducedT(d.C, d.r2))}`),
    exam: opts.exam ? examTag(opts, 5) : false, noHints: level === 5 || !!opts.exam,
  });
}

function sphereExam(rng, exam) {
  if (exam === 'open') return sphereItem(5, rng, { exam });
  if (exam === 'tf') {
    if (rng.chance(0.5)) {
      const a = rng.int(1, 3);
      const c = a * a + rng.int(1, 4);
      const eq = `x^2 + y^2 + z^2 + ${2 * a}x + ${c} = 0`;
      return tfG({
        skill: SP, key: `empty:${a}:${c}`, truth: false, exam: examTag({ exam }),
        statement: t('L\'équation {v1} est celle d\'une sphère.', { v1: ML3(eq) }),
        counter: geoCounter('radiusSquared', [['r2', 'r² =']], { r2: String(a * a - c) }, { value: a * a - c }),
        explanation: t('Faux : (x + {a})² + y² + z² = {v1}, et r² = {v1} < 0 : l\'ensemble est vide.', { a, v1: a * a - c }),
      });
    }
    return tfG({
      skill: SP, key: 'tangent', truth: true, exam: examTag({ exam }),
      statement: t('Le plan tangent en un point T d\'une sphère de centre C est perpendiculaire à la droite (CT).'),
      explanation: t('Vrai : le plan tangent en T a pour normale CT⃗ : (CT⃗)·(X − T) = 0.'),
    });
  }
  const d = sphereData(rng);
  const k = rng.pick([1, 2, 3]);
  const eq0 = sphereEq(d.C, d.r2, k);
  const wrongR2 = d.r2.add(norm2(d.C)); // the constants not taken away
  const wrongs = [{ html: `C${vr(d.C)}, r = ${rootR(wrongR2)}`, rule: 'g4_square_constant' }];
  if (k > 1) wrongs.push({ html: `C${vr(d.C.map((x) => x.mul(k)))}, r = ${rootR(norm2(d.C.map((x) => x.mul(k))).sub(norm2(d.C).sub(d.r2).mul(k)))}`, rule: 'g4_not_normalized' });
  return mcqD({
    skill: SP, level: 4, key: `mcq:${eq0}`, exam: examTag({ exam }),
    prompt: t('Quels sont le centre et le rayon de la sphère {v1} ?', { v1: ML3(eq0) }),
    right: `C${vr(d.C)}, r = ${d.r}`,
    wrongs,
    fillers: [{ html: `C${vr(d.C.map((x) => x.neg()))}, r = ${d.r}` }, { html: `C${vr(d.C)}, r = ${d.r * d.r}` }, { html: `C${vr(d.C.map((x) => x.mul(2)))}, r = ${d.r}` }],
    solution: [{ html: `${readable(reducedT(d.C, d.r2))} : C${vr(d.C)}, r = ${d.r}`, note: '' }],
  }, rng);
}

// ======================================================================

export const GEN = {
  [CR]: (level, rng, profile, opts = {}) => (opts.exam ? crossExam(rng, opts.exam) : crossItem(level, rng)),
  [TR]: (level, rng, profile, opts = {}) => (opts.exam ? tripleExam(rng, opts.exam) : tripleItem(level, rng)),
  [DP]: (level, rng, profile, opts = {}) => (opts.exam ? distPointExam(rng, opts.exam) : distPointItem(level, rng)),
  // Level 5 is the long problem of the catalogue (E7), a `problem` item since
  // step U4, with the points of its open variant.
  [DS]: (level, rng, profile, opts = {}) => (opts.exam ? distSkewExam(rng, opts.exam) : level === 5 ? asProblem(distSkewItem(5, rng), 6) : distSkewItem(level, rng)),
  [CP]: (level, rng, profile, opts = {}) => (opts.exam ? commonPerpExam(rng, opts.exam) : commonPerpItem(level, rng)),
  [LS]: (level, rng, profile, opts = {}) => (opts.exam ? twoSkewExam(rng, opts.exam) : twoSkewItem(level, rng)),
  [SP]: (level, rng, profile, opts = {}) => (opts.exam ? sphereExam(rng, opts.exam) : sphereItem(level, rng)),
};

export { MT };

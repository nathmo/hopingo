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
  { id: 'det', label: 'écrire les trois déterminants 2 × 2', skill: CR },
  { id: 'check', label: 'contrôle par le produit scalaire', skill: 'g4-dot' },
  { id: 'area', label: 'aire', skill: CR },
];
const CR_MENU = {
  vec: [
    { id: 'c1', label: '1re composante : u₂v₃ − u₃v₂', valid: true },
    { id: 'c2', label: '2e composante : u₃v₁ − u₁v₃', valid: true },
    { id: 'c3', label: '3e composante : u₁v₂ − u₂v₁', valid: true },
    { id: 'c2bad', label: '2e composante : u₁v₃ − u₃v₁', valid: false, rule: 'g4_cross_middle_sign', why: 'Le cofacteur du milieu porte un signe − : la 2e composante est u₃v₁ − u₁v₃ (on tourne : 2, 3, 1).' },
  ],
  check: [
    { id: 'dot', label: 'Contrôle : (u⃗ ∧ v⃗)·u⃗ = 0', valid: true },
    { id: 'norm', label: 'Norme', valid: false, why: `Ici, on contrôle d'abord que le produit vectoriel est orthogonal à u⃗.` },
  ],
  area: [
    { id: 'norm', label: 'Aire du parallélogramme : ‖u⃗ ∧ v⃗‖', valid: true },
    { id: 'half', label: 'Aire du triangle : ½‖u⃗ ∧ v⃗‖', valid: true },
    { id: 'sum', label: 'Somme des composantes', valid: false, why: 'Une aire est une norme : la racine de la somme des carrés.' },
  ],
  bilin: [
    { id: 'bil', label: 'Bilinéarité : développer comme un produit', valid: true },
    { id: 'anti', label: 'u⃗ ∧ u⃗ = 0⃗ et v⃗ ∧ u⃗ = −u⃗ ∧ v⃗', valid: true },
    { id: 'comm', label: 'v⃗ ∧ u⃗ = u⃗ ∧ v⃗', valid: false, rule: 'g4_cross_commute', why: 'Le produit vectoriel change de signe quand on échange les facteurs.' },
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
      { math: first, note: sides ? sides : 'Trois déterminants 2 × 2 : (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁)', subgoal: 'det', blank: [], blank2: sides ? [] : [comps[1]] },
      ...(sides ? [{ math: crossT(u, v), note: 'Trois déterminants 2 × 2', subgoal: 'det', blank: [], blank2: [comps[1]], from: 1 }] : []),
      { math: vt(n), note: '', subgoal: 'det', blank: txt(n), blank2: [qt(n[1])] },
    ],
  }];
  parts.push({
    html: `Contrôle : ${vr(n)} doit être orthogonal à ${sides ? 'AB⃗' : 'u⃗'}.`, ask: 'produit scalaire :', start: `${vt(n)}·${vt(u)}`,
    judge: { kind: 'vector', expect: '0' }, menu: CR_MENU.check,
    lines: [{ math: `${dotT(n, u)} = 0`, note: 'Le produit scalaire est nul', subgoal: 'check', end: true, blank: ['0'], blank2: [] }],
  });
  const n2 = norm2(n);
  const area = tri ? rootT(n2.div(4)) : rootT(n2);
  parts.push({
    html: tri ? `L'aire S du triangle ${sides ? 'ABC' : 'construit sur u⃗ et v⃗'} ?` : `L'aire S du parallélogramme construit sur u⃗ et v⃗ ?`, ask: 'S =', start: 'S',
    judge: { kind: 'value', expect: area, form: 'exact' }, menu: CR_MENU.area,
    lines: [
      { math: `${tri ? '(1/2)·' : ''}√(${squaresT(n)})`, note: tri ? 'Aire du triangle = ½‖u⃗ ∧ v⃗‖' : 'Aire = ‖u⃗ ∧ v⃗‖', subgoal: 'area', blank: [squaresT(n)], blank2: [] },
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
    prompt = `On donne u⃗ = ${vr(u)} et v⃗ = ${vr(v)}. Calcule u⃗ ∧ v⃗, contrôle-le par un produit scalaire, puis calcule l'aire du triangle construit sur u⃗ et v⃗.`;
    key = `${vt(u)}${vt(v)}`;
  } else if (kind === 'tri' || kind === 'height') {
    const A = randVec(rng, -3, 3);
    const B = add(A, u);
    const C = add(A, v);
    ({ parts } = crossParts(d, level, { label: 'AB ∧ AC', symbols: { A: vt(A), B: vt(B), C: vt(C) }, sides: 'AB⃗ = B − A, AC⃗ = C − A' }));
    prompt = `On donne les points ${ptR('A', A)}, ${ptR('B', B)} et ${ptR('C', C)}. Calcule AB⃗ ∧ AC⃗, puis l'aire du triangle ABC.`;
    key = `tri:${vt(A)}${vt(B)}${vt(C)}`;
    if (kind === 'height') {
      const ab2 = norm2(u);
      parts.push({
        html: 'La hauteur h du triangle issue de C (relative au côté [AB]) ?', ask: 'h =', start: 'h',
        judge: { kind: 'value', expect: rootT(norm2(n).div(ab2)), form: 'exact' },
        lines: [{ math: rootT(norm2(n).div(ab2)), note: `h = 2S/AB = ‖AB⃗ ∧ AC⃗‖/‖AB⃗‖, avec AB = ${rootR(ab2)}`, subgoal: 'area' }],
      });
      prompt = `On donne les points ${ptR('A', A)}, ${ptR('B', B)} et ${ptR('C', C)}. Calcule l'aire du triangle ABC, puis sa hauteur relative au côté [AB].`;
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
        { math: `${k}·(u ∧ v)`, note: `Bilinéarité : u⃗ ∧ u⃗ = v⃗ ∧ v⃗ = 0⃗ et v⃗ ∧ u⃗ = −u⃗ ∧ v⃗, d'où (${fq(a)}·${parR(e)} − ${parR(b)}·${parR(c)})·u⃗ ∧ v⃗`, subgoal: 'det' },
        { math: `${k}·${vt(n)}`, note: `u⃗ ∧ v⃗ = ${vr(n)}`, subgoal: 'det' },
        { math: vt(scale(n, k)), note: '', subgoal: 'det' },
      ],
    }];
    prompt = `On donne u⃗ = ${vr(u)} et v⃗ = ${vr(v)}. Calcule ${readable(start).replace(/u/g, 'u⃗').replace(/v/g, 'v⃗').replace(/\(\s*−\s*/g, '(−')} en développant par bilinéarité.`;
    key = `bil:${start}:${vt(u)}${vt(v)}`;
  }
  return partsB({
    skill: CR, level, parts, subgoals: CR_SUB, prompt, key: `${CR}:${kind}:${key}`, fallback: d.fallback,
    hints: H('2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). Contrôle : le résultat est orthogonal à u⃗ et à v⃗.', `(${fq(n[0])} ; □ ; ${fq(n[2])})`, vr(n)),
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
        statement: 'Pour tous vecteurs u⃗ et v⃗ de l\'espace, u⃗ ∧ v⃗ = v⃗ ∧ u⃗.',
        counter: geoCounter('crossNotCommute', [['u', 'u⃗ ='], ['v', 'v⃗ =']], { u: '(1 ; 0 ; 0)', v: '(0 ; 1 ; 0)' }),
        explanation: 'Faux : v⃗ ∧ u⃗ = −u⃗ ∧ v⃗. Avec u⃗ = (1 ; 0 ; 0) et v⃗ = (0 ; 1 ; 0) : u⃗ ∧ v⃗ = (0 ; 0 ; 1) et v⃗ ∧ u⃗ = (0 ; 0 ; −1).',
      });
    }
    const st = [
      ['Pour tous vecteurs u⃗ et v⃗, le vecteur u⃗ ∧ v⃗ est orthogonal à u⃗ et à v⃗.', 'Vrai : (u⃗ ∧ v⃗)·u⃗ = (u⃗ ∧ v⃗)·v⃗ = 0, c\'est un déterminant avec deux colonnes égales.'],
      ['‖u⃗ ∧ v⃗‖ est l\'aire du parallélogramme construit sur u⃗ et v⃗.', 'Vrai : ‖u⃗ ∧ v⃗‖ = ‖u⃗‖‖v⃗‖ sin θ, la base fois la hauteur.'],
    ][w - 1];
    return tfG({ skill: CR, key: `true:${w}`, truth: true, exam: examTag({ exam }), statement: st[0], explanation: st[1] });
  }
  if (exam === 'coef') {
    return coefItem({
      skill: CR, key: `${vt(u)}${vt(v)}`, exam: examTag({ exam }), label: 'n_2',
      prompt: `On donne u⃗ = ${vr(u)} et v⃗ = ${vr(v)}, et n⃗ = u⃗ ∧ v⃗. Que vaut n₂, la 2e composante de n⃗ ?`,
      value: qt(n[1]), traps: [{ rule: 'g4_cross_middle_sign' }],
      solution: [{ html: `n₂ = u₃v₁ − u₁v₃ = ${parR(u[2])}·${parR(v[0])} − ${parR(u[0])}·${parR(v[2])} = ${fq(n[1])} ; u⃗ ∧ v⃗ = ${vr(n)}`, note: '' }],
      fallback: d.fallback,
    });
  }
  return mcqD({
    skill: CR, level: 4, key: `mcq:${vt(u)}${vt(v)}`, exam: examTag({ exam }),
    prompt: `On donne u⃗ = ${vr(u)} et v⃗ = ${vr(v)}. Que vaut u⃗ ∧ v⃗ ?`,
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
  { id: 'cross', label: 'produit vectoriel', skill: CR },
  { id: 'mixte', label: 'produit mixte', skill: TR },
  { id: 'vol', label: 'volume', skill: TR },
];
const TR_MENU = {
  cross: [
    { id: 'vec', label: 'Vecteurs AB⃗, AC⃗, AD⃗ issus de A', valid: true },
    { id: 'cross', label: 'Produit vectoriel AB⃗ ∧ AC⃗', valid: true },
    { id: 'pts', label: 'Produit vectoriel des points B ∧ C', valid: false, why: 'Un point n\'est pas une arête : prends des vecteurs issus du même sommet.' },
  ],
  mixte: [
    { id: 'dot', label: 'Produit scalaire avec AD⃗', valid: true },
    { id: 'cross2', label: 'Encore un produit vectoriel', valid: false, why: 'Le produit mixte est un nombre : (AB⃗ ∧ AC⃗)·AD⃗.' },
  ],
  vol: [
    { id: 'six', label: 'Valeur absolue et 1/6', valid: true },
    { id: 'abs', label: 'Valeur absolue seulement', valid: true },
    { id: 'half', label: 'Diviser par 2', valid: false, rule: 'g4_tetra_factor', why: 'Le tétraèdre est le sixième du parallélépipède : ½ pour la base, ⅓ pour la pyramide.' },
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
        { math: `AB ∧ AC = ${vt(u)} ∧ ${vt(v)}`, note: 'Les arêtes issues de A', subgoal: 'cross' },
        { math: vt(n), note: 'Trois déterminants 2 × 2', subgoal: 'cross', blank: txt(n), blank2: [qt(n[1])] },
      ],
    });
  }
  parts.push({
    html: level === 1 ? `${vecs} et AB⃗ ∧ AC⃗ = ${vr(n)}. Le produit mixte ?` : 'Le produit mixte [AB⃗, AC⃗, AD⃗] = (AB⃗ ∧ AC⃗)·AD⃗ ?', ask: '[AB⃗, AC⃗, AD⃗] =', start: '[AB, AC, AD]',
    judge: { kind: 'vector', symbols: sym, expect: '(AB ∧ AC)·AD' }, menu: TR_MENU.mixte,
    lines: [{ math: `${dotT(n, w)} = ${qt(m)}`, note: '', subgoal: 'mixte', end: true, blank: [qt(m)], blank2: [qt(m)] }],
  });
  parts.push({
    html: box ? 'Le volume V du parallélépipède construit sur AB⃗, AC⃗ et AD⃗ ?' : 'Le volume V du tétraèdre ABCD ?', ask: 'V =', start: 'V',
    judge: { kind: 'value', expect: qt(vol), ...(box ? {} : { tetra: { m: qt(m) } }) }, menu: TR_MENU.vol,
    decisions: box ? [] : [{
      levels: [2], kind: 'decision', prompt: 'Le volume du tétraèdre est |[AB⃗, AC⃗, AD⃗]| multiplié par…', options: [
        { id: 'six', label: '1/6', valid: true, ref: true },
        { id: 'three', label: '1/3', valid: false, rule: 'g4_tetra_factor', why: 'Aire de la base triangulaire = ½‖AB⃗ ∧ AC⃗‖, puis ⅓·base·hauteur : en tout 1/6.' },
        { id: 'two', label: '1/2', valid: false, rule: 'g4_tetra_factor', why: 'Le ½ donne l\'aire du triangle de base ; il faut encore le ⅓ de la pyramide : 1/6.' },
      ],
    }],
    lines: [
      { math: box ? `|${qt(m)}|` : `|${qt(m)}|/6`, note: box ? 'Volume = |produit mixte|' : 'Un tétraèdre : le sixième du parallélépipède', subgoal: 'vol', end: true, blank: box ? [] : ['6'], blank2: [] },
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
    prompt: `On donne ${ptR('A', d.A)}, ${ptR('B', d.B)}, ${ptR('C', d.C)} et ${ptR('D', d.D)}. Calcule le volume ${box ? 'du parallélépipède construit sur AB⃗, AC⃗ et AD⃗' : 'du tétraèdre ABCD'}.`,
    key: `${TR}:${box ? 'box' : 'tet'}:${vt(d.A)}${vt(d.B)}${vt(d.C)}${vt(d.D)}`, fallback: d.fallback,
    hints: H('Le volume du tétraèdre est le sixième du parallélépipède : |[AB⃗, AC⃗, AD⃗]|/6.', `V = |${fq(d.m)}|/□`, `V = ${fq(box ? absQ(d.m) : absQ(d.m).div(6))}`),
  });
}

// « Pour quel m les points sont-ils coplanaires ? », then a volume.
function tripleCoplanar(level, rng, opts = {}) {
  for (let t = 0; t < 300; t++) {
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
        html: `AD⃗ = (${fq(d1.sub(A[0]))} ; ${fq(d2.sub(A[1]))} ; m ${A[2].n < 0 ? '+' : '−'} ${fq(absQ(A[2]))}). Le produit mixte, en fonction de m ?`, ask: '[AB⃗, AC⃗, AD⃗] =', start: '[AB, AC, AD]',
        judge: { kind: 'vector', symbols: sym, params: ['m'], expect: '(AB ∧ AC)·AD', form: 'any' },
        lines: [{ math: am, note: '(AB⃗ ∧ AC⃗)·AD⃗', subgoal: 'mixte' }],
      },
      {
        html: 'Les quatre points sont coplanaires si et seulement si le produit mixte est nul.', ask: 'm :', start: `${am} = 0`,
        judge: { kind: 'solset', v: 'm' }, lines: [{ math: `m = ${qt(r)}`, note: '', subgoal: 'mixte' }],
      },
      {
        html: `Pour m = ${fq(m2)}, le volume V du tétraèdre ABCD ?`, ask: 'V =', start: 'V',
        judge: { kind: 'value', expect: qt(vol2), tetra: { m: qt(mixte2) } },
        lines: [{ math: `|${qt(mixte2)}|/6`, note: `[AB⃗, AC⃗, AD⃗] = ${fq(a)}·${parR(m2)} ${b.n < 0 ? '−' : '+'} ${fq(absQ(b))} = ${fq(mixte2)}`, subgoal: 'vol' }, { math: qt(vol2), note: '', subgoal: 'vol' }],
      },
    ];
    return partsB({
      skill: TR, level: opts.exam ? 4 : level, parts, subgoals: TR_SUB, noHints: true,
      prompt: `On donne ${ptR('A', A)}, ${ptR('B', B)}, ${ptR('C', C)} et D(${fq(d1)} ; ${fq(d2)} ; m). Pour quelle valeur de m les quatre points sont-ils coplanaires ? Calcule ensuite le volume du tétraèdre ABCD pour m = ${fq(m2)}.`,
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
        statement: 'Si [u⃗, v⃗, w⃗] = 0, alors deux des trois vecteurs sont colinéaires.',
        counter: geoCounter('coplanarNoColinear', [['u', 'u⃗ ='], ['v', 'v⃗ ='], ['w', 'w⃗ =']], { u: '(1 ; 0 ; 0)', v: '(0 ; 1 ; 0)', w: '(1 ; 1 ; 0)' }),
        explanation: 'Faux : le produit mixte est nul dès que les trois vecteurs sont coplanaires. (1 ; 0 ; 0), (0 ; 1 ; 0) et (1 ; 1 ; 0) sont dans le plan z = 0, et deux à deux non colinéaires.',
      });
    }
    return tfG({
      skill: TR, key: 'true', truth: true, exam: examTag({ exam }),
      statement: 'Quatre points A, B, C, D sont coplanaires si et seulement si [AB⃗, AC⃗, AD⃗] = 0.',
      explanation: 'Vrai : le produit mixte est le volume (signé) du parallélépipède construit sur AB⃗, AC⃗, AD⃗ ; il est nul si et seulement si ces trois vecteurs sont dans un même plan.',
    });
  }
  const d = tripleData(rng);
  const m = absQ(d.m);
  const bad = dot([d.n[0], d.n[1].neg(), d.n[2]], d.w);
  return mcqD({
    skill: TR, level: 4, key: `mcq:${vt(d.A)}${vt(d.B)}${vt(d.C)}${vt(d.D)}`, exam: examTag({ exam }),
    prompt: `Quel est le volume du tétraèdre de sommets ${ptR('A', d.A)}, ${ptR('B', d.B)}, ${ptR('C', d.C)} et ${ptR('D', d.D)} ?`,
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
  { id: 'eval', label: 'évaluer l\'équation en P', skill: 'g4-plane' },
  { id: 'dist', label: 'distance', skill: DP },
  { id: 'foot', label: 'pied de la perpendiculaire', skill: 'g4-dot' },
];
const DP_MENU = {
  eval: [
    { id: 'eval', label: 'Évaluer l\'équation du plan en P', valid: true },
    { id: 'proj', label: 'Projeter AP⃗ sur la direction', valid: true },
    { id: 'pyth', label: 'Distance de P à l\'origine', valid: false, why: 'On cherche la distance au plan (ou à la droite), pas à O.' },
  ],
  dist: [
    { id: 'norm', label: 'Diviser par ‖n⃗‖ (valeur absolue)', valid: true },
    { id: 'len', label: 'Longueur PH', valid: true },
    { id: 'raw', label: 'Garder la valeur de l\'équation', valid: false, rule: 'g4_dist_no_norm', why: 'La valeur de l\'équation devient une distance après division par ‖n⃗‖.' },
  ],
  foot: [
    { id: 'foot', label: 'Pied H : P moins la projection sur n⃗ (ou A + t·v⃗)', valid: true },
    { id: 'check', label: 'Contrôle : H dans le plan', valid: true },
    { id: 'nosq', label: 'H = P − (e/‖n⃗‖)·n⃗', valid: false, rule: 'g4_proj_no_square', why: 'Pour un vecteur, on divise par ‖n⃗‖² : H = P − (e/‖n⃗‖²)·n⃗.' },
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
      html: "On remplace P dans le membre de gauche de l'équation du plan : e = ax₀ + by₀ + cz₀ + d.", start: 'e', judge: { kind: 'vector', expect: qt(e) }, menu: DP_MENU.eval,
      lines: [{ math: `${evalT(n, P, d0)} = ${qt(e)}`, note: 'Remplacer P dans l\'équation du plan', subgoal: 'eval', end: true, blank: [qt(e)], blank2: [qt(e)] }],
    },
    {
      html: `La distance d de P au plan ?`, ask: 'd =', start: 'd', judge: { kind: 'value', expect: qt(d.dist), form: 'exact', dist: { e: qt(e), n: String(N) } }, menu: DP_MENU.dist,
      lines: [
        { math: `|${qt(e)}|/√(${squaresT(n)})`, note: `‖n⃗‖ = √(${squaresT(n)}) = ${N}`, subgoal: 'dist', blank: [squaresT(n)], blank2: [] },
        { math: qt(d.dist), note: '', subgoal: 'dist' },
      ],
    },
    {
      html: `Le pied H de la perpendiculaire issue de P (n⃗ = ${vr(n)}) ?`, ask: 'H =', start: 'H',
      judge: { kind: 'vector', symbols: { P: vt(P), n: vt(n) }, expect: vt(H0) }, menu: DP_MENU.foot,
      lines: [
        { math: `H = P - (${qt(e)}/${qt(N2)})·n`, note: 'H = P − (e/‖n⃗‖²)·n⃗', subgoal: 'foot', blank: [qt(N2)], blank2: [] },
        { math: vt(H0), note: '', subgoal: 'foot', blank: txt(H0), blank2: [] },
      ],
    },
  ];
  if (check) {
    parts.push({
      html: 'Contrôle : H est dans le plan.', ask: 'en H :', start: 'e_H', judge: { kind: 'vector', expect: '0' }, menu: DP_MENU.foot,
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
      html: `Le pied H = A + t·v⃗ de la perpendiculaire issue de P, avec A${vr(A)} et v⃗ = ${vr(v)} : t ?`, start: 't', judge: { kind: 'vector', symbols: sym, expect: String(t0) }, menu: DP_MENU.eval,
      lines: [
        { math: 't = AP·v/(v·v)', note: `AP⃗ = ${vr(ap)} : H = A + t·v⃗ avec t = AP⃗·v⃗/‖v⃗‖²`, subgoal: 'foot' },
        { math: String(t0), note: `t = ${fq(apv)}/${fq(v2)}`, subgoal: 'foot', blank: [String(t0)], blank2: [String(t0)] },
      ],
    },
    {
      html: `t = ${fq(t0)}. Le pied H ?`, ask: 'H =', start: 'H', judge: { kind: 'vector', symbols: sym, expect: vt(H0) }, menu: DP_MENU.foot,
      lines: [
        { math: `H = A ${t0 < 0 ? '-' : '+'} ${Math.abs(t0)}·v`, note: '', subgoal: 'foot' },
        { math: vt(H0), note: '', subgoal: 'foot', blank: txt(H0), blank2: [] },
      ],
    },
    {
      html: 'La distance d = PH ?', ask: 'd =', start: 'd', judge: { kind: 'value', expect: qt(d.dist), form: 'exact' }, menu: DP_MENU.dist,
      lines: [
        { math: `√(${squaresT(w)})`, note: `PH⃗ = ${vr(w.map((x) => x.neg()))}`, subgoal: 'dist', blank: [squaresT(w)], blank2: [] },
        { math: qt(d.dist), note: '', subgoal: 'dist' },
      ],
    },
  ];
}

const DP_DECISION = (isPlane) => ({
  levels: [2], kind: 'decision', prompt: 'Quelle méthode ?', options: [
    { id: 'plane', label: 'Point-plan : la formule |ax₀ + by₀ + cz₀ + d|/‖n⃗‖', valid: isPlane, ref: isPlane, why: 'Ici, c\'est une droite : il n\'y a pas d\'équation à évaluer, on projette.' },
    { id: 'line', label: 'Point-droite : le pied H par projection sur la direction', valid: !isPlane, ref: !isPlane, why: 'Ici, c\'est un plan : la formule avec la normale donne la distance directement.' },
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
      prompt: `Calcule la distance du point ${ptR('P', d.P)} au plan ${ML3(pl)}, puis le pied H de la perpendiculaire issue de P.`,
      key: `${DP}:plane:${vt(d.P)}:${pl}`, fallback: d.fallback,
      hints: H('Remplace P dans l\'équation, puis divise par la norme de la normale.', `d = |${fq(d.e)}|/□`, `d = ${fq(d.dist)}, H = ${vr(d.H)}`),
    });
  }
  const d = lineData(rng);
  const parts = lineParts(d);
  parts[0].decisions = [DP_DECISION(false)];
  let prompt = `Calcule la distance du point ${ptR('P', d.P)} à la droite d : ${ML3(paramT(d.A, [d.v]))}, en passant par le pied H de la perpendiculaire.`;
  if (level === 5 || opts.exam) {
    // Vrai ou faux justifié: is the projection of P on d the point K?
    const truth = rng.chance(0.5);
    const K = truth ? d.H : add(d.A, scale(d.v, d.t0 + (rng.chance(0.5) ? 1 : -1)));
    parts[2].decisions = [{
      kind: 'decision', prompt: `La projection orthogonale de P sur d est-elle K${vr(K)} ?`, options: [
        { id: 'yes', label: 'Oui', valid: truth, ref: truth, why: `Non : le pied est H = ${vr(d.H)}.` },
        { id: 'no', label: 'Non', valid: !truth, ref: !truth, why: `Si : le pied calculé est H = ${vr(d.H)} = K.` },
      ],
    }];
    prompt = `On donne le point ${ptR('P', d.P)} et la droite d : ${ML3(paramT(d.A, [d.v]))}. La projection orthogonale de P sur d est-elle le point K${vr(K)} ? Justifie en calculant le pied H, puis donne la distance de P à d.`;
  }
  return partsB({
    skill: DP, level: opts.exam ? 4 : level, parts, subgoals: DP_SUB, prompt,
    key: `${DP}:line:${vt(d.P)}:${vt(d.A)}${vt(d.v)}${level === 5 || opts.exam ? ':vf' : ''}`, fallback: d.fallback,
    hints: H('Le pied H = A + t·v⃗ rend PH⃗ orthogonal à v⃗ : t = AP⃗·v⃗/‖v⃗‖².', `t = □/${fq(norm2(d.v))}`, `H = ${vr(d.H)}, d = ${fq(d.dist)}`),
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
      prompt: `H est le pied de la perpendiculaire issue de ${ptR('P', d.P)} sur le plan ${ML3(pl)}. Que vaut sa coordonnée ${'xyz'[i]} ?`,
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
    const st = `Le pied de la perpendiculaire issue de ${ptR('P', d.P)} sur le plan ${ML3(pl)} est le point ${vr(K)}.`;
    if (truth) return tfG({ skill: DP, key: `foot:${vt(d.P)}:${pl}:${vt(K)}`, truth: true, exam: examTag({ exam }), statement: st, explanation: `Vrai : H = P − (${fq(d.e)}/${fq(norm2(d.n))})·n⃗ = ${vr(d.H)}, et H est dans le plan.` });
    return tfG({
      skill: DP, key: `foot:${vt(d.P)}:${pl}:${vt(K)}`, truth: false, exam: examTag({ exam }), statement: st, ruleIfTrue: 'g4_proj_no_square',
      counter: geoCounter('footOfPlane', [['H', 'le vrai pied H =']], { H: vt(d.H) }, { n: d.n.map((x) => x.valueOf()), d: d.d0.valueOf(), P: d.P.map((x) => x.valueOf()), wrong: K.map((x) => x.valueOf()) }),
      explanation: `Faux : le pied est H = P − (e/‖n⃗‖²)·n⃗ avec e = ${fq(d.e)} et ‖n⃗‖² = ${fq(norm2(d.n))}, soit H = ${vr(d.H)}.`,
    });
  }
  return mcqD({
    skill: DP, level: 4, key: `mcq:${vt(d.P)}:${pl}`, exam: examTag({ exam }),
    prompt: `Quelle est la distance du point ${ptR('P', d.P)} au plan ${ML3(pl)} ?`,
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
  { id: 'normal', label: 'normale commune', skill: CR },
  { id: 'mixte', label: 'produit mixte', skill: TR },
  { id: 'dist', label: 'distance', skill: DS },
];
const DS_MENU = [
  { id: 'cross', label: 'n⃗ = u⃗ ∧ v⃗', valid: true },
  { id: 'ab', label: 'AB⃗ entre les points de base', valid: true },
  { id: 'dot', label: 'Produit scalaire AB⃗·n⃗', valid: true },
  { id: 'div', label: 'Diviser par ‖n⃗‖', valid: true },
  { id: 'len', label: 'La longueur AB', valid: false, rule: 'g4_skew_any_points', why: 'A et B sont des points quelconques : la distance est la projection de AB⃗ sur n⃗.' },
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
      html: 'D\'abord une paramétrisation de d₂.', ask: 'd₂ :', start: 'd_2',
      judge: { kind: 'geom', object: 'line3', ref: lineT(B, v), form: 'param' },
      lines: [{ math: lineT(B, v), note: `B${vr(B)} est sur les deux plans ; v⃗ est orthogonal à leurs deux normales`, subgoal: 'normal' }],
    });
  }
  if (level >= 2) {
    parts.push({
      html: line2 ? 'La normale commune ?' : null, ask: 'n⃗ =', start: 'n', judge: { kind: 'vector', symbols: sym, expect: 'u ∧ v', cross: [txt(u), txt(v)] }, menu: DS_MENU,
      lines: [
        { math: `n = u ∧ v = ${vt(u)} ∧ ${vt(v)}`, note: 'Orthogonal aux deux droites', subgoal: 'normal' },
        { math: vt(nn), note: '', subgoal: 'normal', blank: txt(nn), blank2: [qt(nn[1])] },
      ],
    });
  }
  parts.push({
    html: level === 1 ? `n⃗ = u⃗ ∧ v⃗ = ${vr(nn)}. Le vecteur AB⃗ ?` : 'Le vecteur AB⃗ entre les points de base ?', ask: 'AB⃗ =', start: 'AB',
    judge: { kind: 'vector', symbols: sym, expect: 'vec(A,B)' }, menu: DS_MENU,
    lines: [{ math: vt(ab), note: 'B − A', subgoal: 'mixte', blank: txt(ab), blank2: [] }],
  });
  parts.push({
    html: 'Le produit mixte AB⃗·n⃗ ?', ask: 'AB⃗·n⃗ =', start: 'AB·n', judge: { kind: 'vector', expect: qt(abn) }, menu: DS_MENU,
    decisions: [{
      levels: [2], kind: 'decision', prompt: 'Que vérifie le produit mixte [AB⃗, u⃗, v⃗] = AB⃗·n⃗ ?', options: [
        { id: 'skew', label: 'S\'il est non nul, les droites sont gauches', valid: true, ref: true },
        { id: 'par', label: 'S\'il est nul, les droites sont gauches', valid: false, why: 'Un produit mixte nul veut dire AB⃗, u⃗, v⃗ coplanaires : les droites sont dans un même plan (sécantes ou parallèles).' },
      ],
    }],
    lines: [{ math: `${dotT(ab, nn)} = ${qt(abn)}`, note: `${fq(abn)} ≠ 0 : les droites sont gauches`, subgoal: 'mixte', end: true, blank: [qt(abn)], blank2: [qt(abn)] }],
  });
  parts.push({
    html: 'La distance d entre les deux droites ?', ask: 'd =', start: 'd',
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
  let prompt = `Calcule la distance entre les droites gauches d₁ : ${ML3(lineT(d.A, d.u, 's'))} et d₂ : ${cart ? ML3(cart) : ML3(lineT(d.B, d.v))}.`;
  if (level === 5 || opts.exam) {
    parts.push(...perpParts(d, 4).slice(0));
    prompt = `On donne les droites d₁ : ${ML3(lineT(d.A, d.u, 's'))} et d₂ : ${ML3(lineT(d.B, d.v))}. Montre qu'elles sont gauches et calcule leur distance, puis trouve les points P ∈ d₁ et Q ∈ d₂ de leur perpendiculaire commune, et une équation de celle-ci.`;
  }
  return partsB({
    skill: DS, level: opts.exam ? 4 : level, parts, subgoals: level === 5 || opts.exam ? [...DS_SUB, ...CP_SUB] : DS_SUB, prompt,
    key: `${DS}:${vt(d.A)}${vt(d.u)}${vt(d.B)}${vt(d.v)}${cart ? ':cart' : ''}${level === 5 || opts.exam ? ':pb' : ''}`, fallback: d.fallback,
    hints: H('Projette AB⃗ sur la direction n⃗ = u⃗ ∧ v⃗, perpendiculaire aux deux droites.', `d = |AB⃗·n⃗|/□`, `d = ${fq(d.dist)}`),
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
      statement: `La distance entre les droites gauches d₁ : ${ML3(lineT(d.A, d.u, 's'))} et d₂ : ${ML3(lineT(d.B, d.v))} est la distance AB entre leurs points de base A${vr(d.A)} et B${vr(d.B)}.`,
      counter: geoCounter('skewCloser', [['P', 'un point P de d₁ ='], ['Q', 'un point Q de d₂ =']], { P: vt(d.P), Q: vt(d.Q) }, { A: d.A.map(Number), u: d.u.map(Number), B: d.B.map(Number), v: d.v.map(Number) }),
      explanation: `Faux : AB = ${rootR(norm2(ab))}, mais P${vr(d.P)} ∈ d₁ et Q${vr(d.Q)} ∈ d₂ sont à la distance ${fq(d.dist)} : la distance est |AB⃗·n⃗|/‖n⃗‖ = ${fq(d.dist)}.`,
    });
  }
  return mcqD({
    skill: DS, level: 4, key: `mcq:${vt(d.A)}${vt(d.u)}${vt(d.B)}${vt(d.v)}`, exam: examTag({ exam }),
    prompt: `Quelle est la distance entre les droites gauches d₁ : ${ML3(lineT(d.A, d.u, 's'))} et d₂ : ${ML3(lineT(d.B, d.v))} ?`,
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
  { id: 'pq', label: 'vecteur PQ⃗(s, t)', skill: CP },
  { id: 'sys', label: 'résoudre le système en s et t', skill: 'eq-systems' },
  { id: 'ctrl', label: 'contrôle : ‖PQ⃗‖ est la distance', skill: DS },
];
const CP_MENU = [
  { id: 'cur', label: 'Point courant sur chaque droite, deux paramètres', valid: true },
  { id: 'pq', label: 'PQ⃗ = Q − P', valid: true },
  { id: 'two', label: 'Deux conditions : PQ⃗·u⃗ = 0 et PQ⃗·v⃗ = 0', valid: true },
  { id: 'solve', label: 'Résoudre en s et t', valid: true },
  { id: 'one', label: 'Une condition PQ⃗·u⃗ = 0 suffit', valid: false, rule: 'g4_common_perp_one_condition', why: 'PQ⃗ doit être perpendiculaire aux deux droites : deux conditions.' },
  { id: 'same', label: 'Le même paramètre t sur les deux droites', valid: false, rule: 'g4_param_same_letter', why: 'P et Q sont deux points différents, chacun sur sa droite : il faut deux paramètres, s et t.' },
];

function perpParts(d, level, { line = true } = {}) {
  const { u, v, A, B, P, Q, s0, t } = d;
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
    html: level === 1 ? `P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ : PQ⃗ = (${comps.map(readable).join(' ; ')}).` : 'P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?', ask: 'PQ⃗ =', start: 'PQ',
    judge: { kind: 'vector', symbols: sym, params: ['s', 't'], expect: 'B + t·v - (A + s·u)', form: 'any' }, menu: CP_MENU,
    lines: [{ math: `PQ = ${pqT}`, note: 'AB⃗ + t·v⃗ − s·u⃗', subgoal: 'pq', blank: [comps[0]], blank2: [comps[1]] }],
  }, {
    html: '1re condition : PQ⃗·u⃗ = 0.', ask: 'PQ⃗·u⃗ =', start: cu.startT,
    judge: { kind: 'equiv', vars: ['s', 't'], target: 'goal', goal: cu.goal }, menu: CP_MENU,
    lines: [{ math: cu.goal, note: '= 0', subgoal: 'sys', blank: [qt(dot(ab, u))], blank2: [] }],
  }, {
    html: '2e condition : PQ⃗·v⃗ = 0.', ask: 'PQ⃗·v⃗ =', start: cv.startT,
    judge: { kind: 'equiv', vars: ['s', 't'], target: 'goal', goal: cv.goal }, menu: CP_MENU,
    lines: [{ math: cv.goal, note: '= 0', subgoal: 'sys', blank: [qt(dot(ab, v))], blank2: [] }],
  }, {
    html: `Le système ${readable(cu.goal)} = 0 et ${readable(cv.goal)} = 0. s ?`, ask: 's =', start: 's',
    judge: { kind: 'value', expect: String(s0), perp: { ...perp, ask: 's' } }, menu: CP_MENU,
    lines: [{ math: String(s0), note: 'Par combinaison des deux équations', subgoal: 'sys', blank: [String(s0)], blank2: [String(s0)] }],
  }, {
    html: 'Et t ?', ask: 't =', start: 't',
    judge: { kind: 'value', expect: String(t), perp: { ...perp, ask: 't' } }, menu: CP_MENU,
    lines: [{ math: String(t), note: '', subgoal: 'sys', blank: [String(t)], blank2: [String(t)] }],
  }, {
    html: `s = ${fq(s0)}. Le point P ?`, ask: 'P =', start: 'P',
    judge: { kind: 'vector', symbols: sym, expect: vt(P), perp }, menu: CP_MENU,
    lines: [{ math: vt(P), note: `P = A ${s0 < 0 ? '−' : '+'} ${Math.abs(s0)}·u⃗`, subgoal: 'sys', blank: txt(P), blank2: [] }],
  }, {
    html: `t = ${fq(t)}. Le point Q ?`, ask: 'Q =', start: 'Q',
    judge: { kind: 'vector', symbols: sym, expect: vt(Q), perp }, menu: CP_MENU,
    lines: [{ math: vt(Q), note: `Q = B ${t < 0 ? '−' : '+'} ${Math.abs(t)}·v⃗ ; ‖PQ⃗‖ = ${fq(d.dist)}, la distance des droites`, subgoal: 'ctrl', blank: txt(Q), blank2: [] }],
  }];
  if (line) {
    const dir = prim(sub(Q, P), true);
    parts.push({
      html: 'Une équation de la perpendiculaire commune (PQ) ?', ask: '(PQ) :', start: 'p',
      judge: { kind: 'geom', object: 'line3', ref: lineT(P, dir, 'k') }, menu: CP_MENU,
      lines: [{ math: lineT(P, dir, 'k'), note: `Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)`, subgoal: 'pq' }],
    });
  }
  return parts;
}

function commonPerpItem(level, rng, opts = {}) {
  const d = skewData(rng);
  const withLine = level === 5 || opts.exam || rng.chance(0.6);
  let parts = perpParts(d, level, { line: withLine });
  let prompt = `On donne les droites gauches d₁ : ${ML3(lineT(d.A, d.u, 's'))} et d₂ : ${ML3(lineT(d.B, d.v))}. ${withLine ? 'Trouve leur perpendiculaire commune : les points P ∈ d₁ et Q ∈ d₂, puis une équation de la droite (PQ).' : 'Trouve les points P ∈ d₁ et Q ∈ d₂ les plus proches.'}`;
  if (level === 5 || opts.exam) {
    parts = [...skewParts(d, 4), ...parts];
    prompt = `On donne les droites d₁ : ${ML3(lineT(d.A, d.u, 's'))} et d₂ : ${ML3(lineT(d.B, d.v))}. Calcule leur distance, puis trouve leur perpendiculaire commune (P ∈ d₁, Q ∈ d₂, et la droite (PQ)).`;
  }
  return partsB({
    skill: CP, level: opts.exam ? 4 : level, parts, subgoals: level === 5 || opts.exam ? [...CP_SUB, ...DS_SUB] : CP_SUB, prompt,
    key: `${CP}:${vt(d.A)}${vt(d.u)}${vt(d.B)}${vt(d.v)}${withLine ? ':line' : ''}${level === 5 || opts.exam ? ':pb' : ''}`, fallback: d.fallback,
    hints: H('Écris un point courant sur chaque droite, avec deux paramètres différents : PQ⃗ doit être orthogonal à u⃗ et à v⃗.', `PQ⃗·u⃗ = ${readable(perpParts(d, 1)[1].lines[0].math)} = 0, PQ⃗·v⃗ = □`, `s = ${fq(d.s0)}, t = ${fq(d.t)}`),
    exam: opts.exam ? examTag(opts, 7) : false, noHints: level === 5 || !!opts.exam,
  });
}

function commonPerpExam(rng, exam) {
  if (exam === 'open') return commonPerpItem(5, rng, { exam });
  const d = skewData(rng);
  const i = rng.int(0, 2);
  return coefItem({
    skill: CP, key: `${vt(d.A)}${vt(d.u)}${vt(d.B)}${vt(d.v)}:${i}`, exam: examTag({ exam }), label: `${'xyz'[i]}_P`,
    prompt: `La perpendiculaire commune aux droites d₁ : ${ML3(lineT(d.A, d.u, 's'))} et d₂ : ${ML3(lineT(d.B, d.v))} coupe d₁ en P. Que vaut la coordonnée ${'xyz'[i]} de P ?`,
    value: qt(d.P[i]), traps: [{ rule: 'g4_common_perp_one_condition' }],
    solution: [{ html: `PQ⃗·u⃗ = PQ⃗·v⃗ = 0 donne s = ${fq(d.s0)} et t = ${fq(d.t)} : P = ${vr(d.P)}, Q = ${vr(d.Q)}.`, note: '' }],
    fallback: d.fallback,
  });
}

// ======================================================================
// g4-line-two-skew
// ======================================================================

const LS = 'g4-line-two-skew';
const LS_SUB = [
  { id: 'normal', label: 'normale de π', skill: CR },
  { id: 'inter', label: 'π ∩ b', skill: 'g4-relative-pos' },
  { id: 'line', label: 'la droite n', skill: LS },
];
const LS_MENU = [
  { id: 'nrm', label: 'Normale de π : u⃗ ∧ w⃗', valid: true },
  { id: 'eq', label: 'Équation de π (contient a, de direction w⃗)', valid: true },
  { id: 'inter', label: 'π ∩ b : remplacer la paramétrique de b', valid: true },
  { id: 'line', label: 'La droite n : par Q, de direction w⃗', valid: true },
  { id: 'wn', label: 'Normale de π : w⃗', valid: false, rule: 'g4_normal_as_direction', why: 'π contient la direction w⃗ : w⃗ est dans le plan, pas normal à lui.' },
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
        levels: [2], kind: 'decision', prompt: 'Quelle méthode ?', options: [
          { id: 'planes', label: 'Méthode des plans : π contient a et la direction w⃗, puis π ∩ b', valid: true, quality: 'good', ref: true },
          { id: 'params', label: 'Méthode des paramètres : Q(t) − P(s) = k·w⃗', valid: true, quality: 'good' },
        ],
      }],
      lines: [{ math: `n = u ∧ w = ${vt(u)} ∧ ${vt(w)}`, note: 'Orthogonal à a et à w⃗', subgoal: 'normal' }, { math: vt(cross(u, w)), note: '', subgoal: 'normal', blank: txt(cross(u, w)), blank2: [] }],
    });
  }
  parts.push({
    html: level === 1 ? `π contient a et la direction w⃗ ; sa normale est u⃗ ∧ w⃗ = ${vr(cross(u, w))}. Une équation de π ?` : 'Une équation du plan π qui contient a, de direction w⃗ ?', ask: 'π :', start: 'π',
    judge: { kind: 'geom', object: 'plane', ref: pi }, menu: LS_MENU,
    lines: [{ math: pi, note: `Par le point ${vr(Pa)} de a`, subgoal: 'normal' }],
  });
  parts.push({
    html: `π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?`, ask: 't =', start: 't', judge: { kind: 'value', expect: qt(tq) }, menu: LS_MENU,
    lines: [{ math: qt(tq), note: `${readable(sumT([[dot(nn, Qb), ''], [dot(nn, v), 't']]))} ${dot(nn, Pa).neg().n < 0 ? '−' : '+'} ${fq(absQ(dot(nn, Pa)))} = 0`, subgoal: 'inter', blank: [qt(tq)], blank2: [qt(tq)] }],
  });
  parts.push({
    html: `t = ${fq(tq)}. Le point Q = π ∩ b ?`, ask: 'Q =', start: 'Q', judge: { kind: 'vector', symbols: sym, expect: vt(Q) }, menu: LS_MENU,
    lines: [{ math: vt(Q), note: '', subgoal: 'inter', blank: txt(Q), blank2: [] }],
  });
  parts.push({
    html: 'La droite n, par Q, de direction w⃗ ?', ask: 'n :', start: 'n', judge: { kind: 'geom', object: 'line3', ref: lineT(Q, w, 'k') }, menu: LS_MENU,
    lines: [{ math: lineT(Q, w, 'k'), note: `Contrôle : pour k = ${fq(q(-d.k))}, on retrouve un point de a`, subgoal: 'line' }],
  });
  if (level === 5 || opts.exam) {
    parts[0].decisions = [{
      kind: 'decision', prompt: 'Combien de droites de direction w⃗ s\'appuient sur a et b ?', options: [
        { id: 'one', label: 'Une seule : b n\'est pas parallèle à π', valid: true, ref: true },
        { id: 'none', label: 'Aucune', valid: false, why: `Il n'y en a aucune seulement si b est parallèle à π sans y être ; ici v⃗·n⃗ = ${fq(dot(v, nn))} ≠ 0.` },
        { id: 'inf', label: 'Une infinité', valid: false, why: `Il y en a une infinité seulement si b est dans π ; ici v⃗·n⃗ = ${fq(dot(v, nn))} ≠ 0.` },
      ],
    }];
  }
  const dirText = asNormal ? `normale au plan α : ${ML3(alpha)}` : `de direction w⃗ = ${vr(w)}`;
  return partsB({
    skill: LS, level: opts.exam ? 4 : level, parts, subgoals: LS_SUB,
    prompt: `On donne les droites gauches a : ${ML3(lineT(Pa, u, 's'))} et b : ${ML3(lineT(Qb, v, 't'))}. Trouve la droite n, ${dirText}, qui coupe a et b.${level === 5 || opts.exam ? ' Commence par dire combien il y a de solutions.' : ''}`,
    key: `${LS}:${vt(Pa)}${vt(u)}${vt(Qb)}${vt(v)}${vt(w)}${asNormal ? ':alpha' : ''}`, fallback: d.fallback,
    hints: H('La droite n et la droite a sont dans un même plan π, qui contient la direction w⃗.', 'normale de π = u⃗ ∧ □', `π : ${readable(pi)}`),
    exam: opts.exam ? examTag(opts, 6) : false, noHints: level === 5 || !!opts.exam,
  });
}

function twoSkewExam(rng, exam) {
  if (exam === 'open') return twoSkewItem(5, rng, { exam });
  const kind = rng.pick(['one', 'none', 'inf']);
  const d = twoSkewData(rng, kind);
  const right = { one: 'Une seule', none: 'Aucune', inf: 'Une infinité' }[kind];
  const why = { one: 'b coupe le plan π qui contient a et la direction w⃗ : une seule droite, par le point d\'intersection.', none: 'b est parallèle au plan π (qui contient a et la direction w⃗) sans y être : aucune droite.', inf: 'b est contenue dans le plan π qui contient a et la direction w⃗ : chaque point de b donne une droite.' }[kind];
  return mcqD({
    skill: LS, level: 4, key: `mcq:${kind}:${vt(d.Pa)}${vt(d.u)}${vt(d.Qb)}${vt(d.v)}${vt(d.w)}`, exam: examTag({ exam }),
    prompt: `On donne a : ${ML3(lineT(d.Pa, d.u, 's'))}, b : ${ML3(lineT(d.Qb, d.v, 't'))} et w⃗ = ${vr(d.w)}. Combien y a-t-il de droites de direction w⃗ qui coupent a et b ?`,
    right, wrongs: ['Une seule', 'Aucune', 'Une infinité', 'Deux'].filter((x) => x !== right).map((html) => ({ html })),
    solution: [{ html: `Le plan π contient a et la direction w⃗ : normale u⃗ ∧ w⃗ = ${vr(cross(d.u, d.w))}. ${why}`, note: '' }],
    fallback: d.fallback, keepOrder: false,
  }, rng);
}

// ======================================================================
// g4-sphere
// ======================================================================

const SP = 'g4-sphere';
const SP_SUB = [
  { id: 'sq', label: 'compléter les carrés', skill: 'quad-complete' },
  { id: 'cr', label: 'centre et rayon', skill: SP },
  { id: 'tan', label: 'plan tangent', skill: 'g4-plane' },
  { id: 'sec', label: 'section : distance du centre au plan', skill: 'g4-dist-point' },
];
const SP_MENU = [
  { id: 'cx', label: 'Compléter le carré en x', valid: true },
  { id: 'cy', label: 'Compléter le carré en y', valid: true },
  { id: 'cz', label: 'Compléter le carré en z', valid: true },
  { id: 'r', label: 'Lire le centre et le rayon', valid: true },
  { id: 'tan', label: 'Plan tangent : normale CT⃗', valid: true },
  { id: 'sec', label: 'Section : √(r² − δ²)', valid: true },
  { id: 'nosub', label: 'Écrire (x − h)² sans retirer h²', valid: false, rule: 'g4_square_constant', why: '(x − h)² = x² − 2hx + h² : la constante h² ajoutée doit être retirée.' },
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
      ...(k > 1 ? [{ math: ref, note: `Diviser par ${k}`, subgoal: 'sq' }] : []),
      { math: completedT(C, r2), note: 'Compléter un carré par variable', subgoal: 'sq', blank: C.filter((c) => q(c).n !== 0).map((c) => qt(q(c).mul(q(c)))), blank2: [] },
      { math: reducedT(C, r2), note: 'Forme réduite', subgoal: 'sq', blank: [qt(r2)], blank2: [] },
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
      html: `r² = ${fq(d.r2)}. Quel ensemble ?`, ask: 'r² =', start: 'r^2', judge: { kind: 'value', expect: qt(d.r2) },
      decisions: [{
        kind: 'decision', prompt: 'L\'équation décrit…', options: [
          { id: 'sph', label: 'une sphère (r² > 0)', valid: false, why: `r² = ${fq(d.r2)} n'est pas positif.` },
          { id: 'pt', label: 'un seul point, le centre (r² = 0)', valid: kind === 'point', ref: kind === 'point', why: `r² = ${fq(d.r2)} < 0.` },
          { id: 'vide', label: 'l\'ensemble vide (r² < 0)', valid: kind === 'vide', ref: kind === 'vide', why: 'r² = 0 : seul le centre convient.' },
        ],
      }],
      lines: [{ math: qt(d.r2), note: kind === 'point' ? `Un seul point : C${vr(d.C)}` : 'Une somme de carrés n\'est jamais négative : aucun point', subgoal: 'cr' }],
    });
  } else {
    parts.push({
      html: 'Le centre C ?', ask: 'C =', start: 'C', judge: { kind: 'vector', expect: vt(d.C), circleEq: eq0 }, menu: SP_MENU,
      lines: [{ math: vt(d.C), note: '', subgoal: 'cr', blank: txt(d.C), blank2: [] }],
    });
    parts.push({
      html: 'Le rayon r ?', ask: 'r =', start: 'r', judge: { kind: 'value', expect: String(d.r) }, menu: SP_MENU,
      lines: [{ math: String(d.r), note: `r² = ${d.r * d.r}`, subgoal: 'cr', blank: [String(d.r)], blank2: [] }],
    });
    const gab = level === 5 || opts.exam ? 'both' : level >= 3 ? rng.pick(['cr', 'tan', 'sec']) : 'cr';
    if (gab === 'tan' || gab === 'both') {
      const w = vecOfNorm(rng, d.r);
      const T = add(d.C, w);
      const nT = prim(w, true);
      parts.push({
        html: `Le plan tangent en ${ptR('T', T)} : sa normale est CT⃗.`, ask: 'n⃗ =', start: 'n', judge: { kind: 'vector', symbols: { C: vt(d.C), T: vt(T) }, expect: 'vec(C,T)', multiple: true }, menu: SP_MENU,
        lines: [{ math: `n = CT = ${vt(w)}`, note: 'Le rayon CT est perpendiculaire au plan tangent', subgoal: 'tan' }],
      });
      parts.push({
        html: 'Une équation du plan tangent ?', ask: 'π :', start: 'π', judge: { kind: 'geom', object: 'plane', ref: plane(nT, T) }, menu: SP_MENU,
        lines: [{ math: plane(nT, T), note: `Par T, de normale ${vr(nT)}`, subgoal: 'tan' }],
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
        html: `La section par le plan ${ML3(plI)}. La distance δ du centre au plan ?`, ask: 'δ =', start: 'δ',
        judge: { kind: 'value', expect: String(delta), form: 'exact' }, menu: SP_MENU,
        lines: [{ math: String(delta), note: 'δ = |n⃗·C + d|/‖n⃗‖', subgoal: 'sec' }],
      });
      parts.push({
        html: `δ = ${delta} < r = ${d.r} : la section est un cercle. Son rayon ρ ?`, ask: 'ρ =', start: 'ρ',
        judge: { kind: 'value', expect: rootT(rho2), form: 'exact' }, menu: SP_MENU,
        lines: [{ math: `√(${d.r}^2 - ${delta}^2)`, note: 'ρ² = r² − δ²', subgoal: 'sec' }, { math: rootT(rho2), note: '', subgoal: 'sec' }],
      });
      d.sec = { plane: plI, delta, rho: rootT(rho2), pl };
    }
    d.gab = gab;
  }
  const task = degenerate ? 'Quel ensemble décrit cette équation ?' : d.gab === 'tan' ? `Donne son centre, son rayon, puis le plan tangent en T${vr(d.T)}.` : d.gab === 'sec' ? `Donne son centre, son rayon, puis la section par le plan ${ML3(d.sec.plane)}.` : d.gab === 'both' ? `Donne son centre et son rayon, le plan tangent en T${vr(d.T)}, puis la section par le plan ${ML3(d.sec.plane)}.` : 'Donne son centre et son rayon.';
  return partsB({
    skill: SP, level: opts.exam ? 4 : level, parts, subgoals: SP_SUB,
    prompt: `On donne ${ML3(eq0)}. ${task}`,
    key: `${SP}:${eq0}:${d.gab ?? 'deg'}${d.T ? vt(d.T) : ''}${d.sec ? d.sec.plane : ''}`,
    hints: H('Complète un carré par variable, comme pour un cercle : (x − h)² − h².', (() => { const i = Math.max(0, d.C.findIndex((c) => q(c).n !== 0)); const c = d.C[i]; return `(${'xyz'[i]} ${q(c).n > 0 ? '−' : '+'} ${fq(absQ(c))})² − □ + …`; })(), `${readable(reducedT(d.C, d.r2))}`),
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
        statement: `L'équation ${ML3(eq)} est celle d'une sphère.`,
        counter: geoCounter('radiusSquared', [['r2', 'r² =']], { r2: String(a * a - c) }, { value: a * a - c }),
        explanation: `Faux : (x + ${a})² + y² + z² = ${a * a - c}, et r² = ${a * a - c} < 0 : l'ensemble est vide.`,
      });
    }
    return tfG({
      skill: SP, key: 'tangent', truth: true, exam: examTag({ exam }),
      statement: 'Le plan tangent en un point T d\'une sphère de centre C est perpendiculaire à la droite (CT).',
      explanation: 'Vrai : le plan tangent en T a pour normale CT⃗ : (CT⃗)·(X − T) = 0.',
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
    prompt: `Quels sont le centre et le rayon de la sphère ${ML3(eq0)} ?`,
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
  [DS]: (level, rng, profile, opts = {}) => (opts.exam ? distSkewExam(rng, opts.exam) : distSkewItem(level, rng)),
  [CP]: (level, rng, profile, opts = {}) => (opts.exam ? commonPerpExam(rng, opts.exam) : commonPerpItem(level, rng)),
  [LS]: (level, rng, profile, opts = {}) => (opts.exam ? twoSkewExam(rng, opts.exam) : twoSkewItem(level, rng)),
  [SP]: (level, rng, profile, opts = {}) => (opts.exam ? sphereExam(rng, opts.exam) : sphereItem(level, rng)),
};

export { MT };

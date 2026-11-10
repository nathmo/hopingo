// Generators of module G4, part a (step U5): dot product, angles and
// projection (g4-dot). Catalogue: docs/universite/G-gymnase-2.md, G4.
// Judge `vector` for every part (a dot product, a product of norms, cos θ,
// θ, a projected vector, a point); traps read cfg.proj2 (projection) and
// cfg.obtuse (the angle of two lines).

import {
  q, qt, fq, H, add, sub, scale, dot, vt, vr, ptR, rootT, rootR, mcqD, tfG, examTag, geoCounter, VML, isZero,
} from './geo-kit.js';
import { stepsItem, par, dotT, sqT, vecInt } from './geoan-a-kit.js';
import { coefItem } from './alglin-kit.js';
import { Q } from '../../math/rational.js';

const DOT = 'g4-dot';
const DOT_SUB = [
  { id: 'dot', label: 'produit scalaire', skill: DOT },
  { id: 'norm', label: 'normes', skill: 'geo-pythagore' },
  { id: 'cos', label: 'cos θ', skill: DOT },
  { id: 'theta', label: 'θ = arccos(…)', skill: 'g3-arc-def' },
  { id: 'proj', label: 'projection', skill: DOT },
  { id: 'vec', label: 'composantes des vecteurs', skill: 'g4-vectors' },
];

// cos θ (exact text) and θ (text) from u·v and ‖u‖²‖v‖².
const KNOWN = { '0': 'π/2', '1/2': 'π/3', '-1/2': '2π/3', '√2/2': 'π/4', '-√2/2': '3π/4', '√3/2': 'π/6', '-√3/2': '5π/6' };
function cosOf(d, n1n2) {
  const c2 = d.mul(d).div(n1n2);
  const t = d.n === 0 ? '0' : `${d.n < 0 ? '-' : ''}${rootT(c2)}`;
  return { text: t, theta: KNOWN[t] ?? `arccos(${t})`, known: !!KNOWN[t] };
}

// u, v whole, not colinear; want: 'known' (a remarkable angle) or 'other'.
function pair(rng, dim, want) {
  for (let t = 0; t < 600; t++) {
    const u = vecInt(rng, dim, -3, 3);
    const v = vecInt(rng, dim, -3, 3);
    if (isZero(u) || isZero(v)) continue;
    const n1 = dot(u, u);
    const n2 = dot(v, v);
    const d = dot(u, v);
    if (d.mul(d).eq(n1.mul(n2))) continue; // colinear
    const c = cosOf(d, n1.mul(n2));
    if ((want === 'known') !== c.known) continue;
    return { u, v, n1, n2, d, c };
  }
  const u = [q(1), q(1), q(0)].slice(0, dim);
  const v = dim === 3 ? [q(1), q(0), q(1)] : [q(1), q(0)];
  const n1 = dot(u, u); const n2 = dot(v, v); const d = dot(u, v);
  return { u, v, n1, n2, d, c: cosOf(d, n1.mul(n2)), fallback: true };
}

const DOT_MENU = [
  { id: 'dot', label: 'Produit scalaire u₁v₁ + u₂v₂ + u₃v₃', valid: true },
  { id: 'norm', label: 'Normes ‖u⃗‖ = √(u₁² + u₂² + u₃²)', valid: true },
  { id: 'cos', label: 'cos θ = u⃗·v⃗ / (‖u⃗‖‖v⃗‖)', valid: true },
  { id: 'theta', label: 'θ = arccos(cos θ)', valid: true },
  { id: 'proj', label: 'Projection (u⃗·v⃗ / ‖v⃗‖²)·v⃗', valid: true },
  { id: 'nosq', label: 'Projection (u⃗·v⃗ / ‖v⃗‖)·v⃗', valid: false, rule: 'g4_proj_no_square', why: 'u⃗·v⃗/‖v⃗‖ est une longueur ; pour le vecteur, il faut diviser par ‖v⃗‖ deux fois.' },
];

// The parts « dot, norms, cos θ, θ » (lines: a pair of lines, |cos θ|).
function angleParts(D, { sym, U, V, lines = false }) {
  const { u, v, n1, n2, d } = D;
  const c = lines ? cosOf(d.n < 0 ? d.neg() : d, n1.mul(n2)) : D.c;
  const prodT = `${U}·${V}`;
  const parts = [
    { start: prodT, judge: { kind: 'vector', symbols: sym }, menu: DOT_MENU,
      steps: [
        { math: `${vt(u)}·${vt(v)}`, note: 'Les composantes', subgoal: 'vec', upTo: 3 },
        { math: dotT(u, v), note: 'Produit scalaire', subgoal: 'dot', blank: [par(v[0]), par(v[1])] },
        { math: qt(d), note: '', subgoal: 'dot', blank: [qt(d)] },
      ] },
    { html: `${U}·${V} = ${fq(d)}. Les normes ?`, ask: `‖${U}‖·‖${V}‖ =`, start: `‖${U}‖·‖${V}‖`, judge: { kind: 'vector', symbols: sym }, menu: DOT_MENU,
      steps: [
        { math: `√(${sqT(u)})·√(${sqT(v)})`, note: 'Pythagore', subgoal: 'norm', blank: [sqT(u)] },
        { math: rootT(n1.mul(n2)), note: `‖${U}‖ = ${rootR(n1)}, ‖${V}‖ = ${rootR(n2)}`, subgoal: 'norm', blank: [rootT(n1.mul(n2))] },
      ] },
    { html: lines ? 'L\'angle de deux droites est le plus petit : on prend |cos θ|.' : 'Alors cos θ ?', ask: 'cos θ =', start: 'cos θ',
      judge: { kind: 'vector', symbols: sym, expect: c.text }, menu: DOT_MENU,
      steps: [
        { math: lines ? `cos θ = |${prodT}|/(‖${U}‖·‖${V}‖)` : `cos θ = ${prodT}/(‖${U}‖·‖${V}‖)`, note: lines ? '|cos θ| pour deux droites' : 'cos θ = u⃗·v⃗/(‖u⃗‖‖v⃗‖)', subgoal: 'cos', upTo: 3 },
        { math: `cos θ = ${c.text}`, note: `${fq(lines ? (d.n < 0 ? d.neg() : d) : d)}/(${rootR(n1.mul(n2))})`, subgoal: 'cos', blank: [c.text] },
      ] },
    { html: `cos θ = ${c.text.replace(/-/g, '−')}. L'angle ?`, ask: 'θ =', start: 'θ',
      judge: { kind: 'vector', expect: c.theta, angle: true, ...(lines && D.c.theta !== c.theta ? { obtuse: { wrong: D.c.theta } } : {}) }, menu: DOT_MENU,
      steps: [{ math: `θ = ${c.theta}`, note: c.known ? 'Un angle remarquable' : 'Pas un angle remarquable : arccos', subgoal: 'theta', blank: [c.theta] }] },
  ];
  return { parts, c };
}

function triData(rng, want) {
  const D = pair(rng, 3, want);
  const A = vecInt(rng, 3, -4, 4);
  return { ...D, A, B: add(A, D.u), C: add(A, D.v) };
}

function dotItem(level, rng, opts = {}) {
  if (level === 5 || opts.exam === 'open') return dotProblem(level, rng, opts);
  const gab = level <= 2 ? rng.pick(['tri', 'tri', 'lines']) : rng.pick(['tri', 'lines', 'proj']);
  const want = rng.chance(0.25) ? 'other' : 'known';
  if (gab === 'proj') return projItem(level, rng);
  if (gab === 'lines') {
    const dim = rng.pick([2, 3]);
    const D = pair(rng, dim, want);
    const sym = { u: vt(D.u), v: vt(D.v) };
    const { parts, c } = angleParts(D, { sym, U: 'u', V: 'v', lines: true });
    if (level === 2) parts[2].steps.unshift({ decision: { prompt: 'Angle de deux vecteurs, ou de deux droites ?', options: [
      { id: 'lines', label: 'De deux droites : on prend |cos θ|', valid: true, ref: true },
      { id: 'vecs', label: 'De deux vecteurs : cos θ tel quel', valid: false, rule: D.d.n < 0 ? 'g4_angle_obtuse' : undefined, why: 'Deux droites font deux angles, θ et π − θ : on donne le plus petit, avec |cos θ|.' },
    ] } });
    return stepsItem({
      skill: DOT, level, parts, subgoals: DOT_SUB, key: `${DOT}:lines:${vt(D.u)}${vt(D.v)}`, fallback: D.fallback,
      prompt: `Deux droites ont pour vecteurs directeurs u⃗ = ${vr(D.u)} et v⃗ = ${vr(D.v)}. Calcule l'angle θ entre ces droites (en radians, valeur exacte ou arccos(…)).`,
      hints: H('cos θ = |u⃗·v⃗| / (‖u⃗‖‖v⃗‖) pour deux droites.', `cos θ = |${fq(D.d)}| / ${rootR(D.n1.mul(D.n2))}`, `cos θ = ${c.text.replace(/-/g, '−')}, θ = ${c.theta}`),
    });
  }
  const D = triData(rng, want);
  const sym = { A: vt(D.A), B: vt(D.B), C: vt(D.C) };
  const { parts, c } = angleParts(D, { sym, U: 'AB', V: 'AC' });
  if (level === 2) parts[2].steps.unshift({ decision: { prompt: 'Angle de deux vecteurs, ou de deux droites ?', options: [
    { id: 'vecs', label: 'Des vecteurs AB⃗ et AC⃗ : cos θ tel quel', valid: true, ref: true },
    { id: 'lines', label: 'De deux droites : |cos θ|', valid: false, why: 'L\'angle en A du triangle est l\'angle des vecteurs AB⃗ et AC⃗ ; il peut être obtus.' },
  ] } });
  return stepsItem({
    skill: DOT, level, parts, subgoals: DOT_SUB, key: `${DOT}:tri:${vt(D.A)}${vt(D.B)}${vt(D.C)}`, fallback: D.fallback,
    prompt: `Le triangle ABC a pour sommets ${ptR('A', D.A)}, ${ptR('B', D.B)} et ${ptR('C', D.C)}. Calcule l'angle θ du triangle en A (en radians, valeur exacte ou arccos(…)).${level <= 2 ? ` On a AB⃗ = ${vr(D.u)} et AC⃗ = ${vr(D.v)}.` : ''}`,
    hints: H('cos θ = AB⃗·AC⃗ / (‖AB⃗‖‖AC⃗‖).', `cos θ = ${fq(D.d)} / (□·□)`, `cos θ = ${c.text.replace(/-/g, '−')}, donc θ = ${c.theta}`),
  });
}

// The projection of u on v.
function projData(rng, dim = null) {
  for (let t = 0; t < 300; t++) {
    const D = pair(rng, dim ?? rng.pick([2, 3]), rng.chance(0.5) ? 'known' : 'other');
    if (D.d.n === 0) continue;
    const k = D.d.div(D.n2);
    const p = D.v.map((x) => x.mul(k));
    if (p.some((x) => x.d > 14) || k.eq(1)) continue;
    return { ...D, k, p };
  }
  const D = pair(rng, 3, 'known');
  return { ...D, k: D.d.div(D.n2), p: D.v.map((x) => x.mul(D.d.div(D.n2))), fallback: true };
}

function projParts(D) {
  const sym = { u: vt(D.u), v: vt(D.v) };
  return [
    { start: 'u·v', judge: { kind: 'vector', symbols: sym }, menu: DOT_MENU,
      steps: [{ math: dotT(D.u, D.v), note: 'Produit scalaire', subgoal: 'dot', blank: [par(D.v[0])] }, { math: qt(D.d), note: '', subgoal: 'dot', blank: [qt(D.d)] }] },
    { html: `u⃗·v⃗ = ${fq(D.d)}. Et ‖v⃗‖² ?`, ask: '‖v⃗‖² =', start: '‖v‖^2', judge: { kind: 'vector', symbols: sym }, menu: DOT_MENU,
      steps: [{ math: sqT(D.v), note: 'Sans racine : le carré de la norme', subgoal: 'norm', blank: [sqT(D.v)] }, { math: qt(D.n2), note: '', subgoal: 'norm', blank: [qt(D.n2)] }] },
    { html: `‖v⃗‖² = ${fq(D.n2)}. La projection p⃗ de u⃗ sur v⃗ ?`, ask: 'p⃗ =', start: 'p', judge: { kind: 'vector', symbols: sym, expect: vt(D.p), proj2: { u: D.u.map(qt), v: D.v.map(qt) } }, menu: DOT_MENU,
      steps: [{ math: `p = (${qt(D.d)}/${qt(D.n2)})·v`, note: 'p⃗ = (u⃗·v⃗ / ‖v⃗‖²)·v⃗', subgoal: 'proj', blank: [qt(D.n2)] }, { math: vt(D.p), note: '', subgoal: 'proj' }] },
  ];
}

function projItem(level, rng) {
  const D = projData(rng);
  return stepsItem({
    skill: DOT, level, parts: projParts(D), subgoals: DOT_SUB, key: `${DOT}:proj:${vt(D.u)}${vt(D.v)}`, fallback: D.fallback,
    prompt: `Calcule la projection orthogonale p⃗ du vecteur u⃗ = ${vr(D.u)} sur v⃗ = ${vr(D.v)}.`,
    hints: H('p⃗ = (u⃗·v⃗ / ‖v⃗‖²)·v⃗ : on divise par le carré de la norme.', `p⃗ = (${fq(D.d)}/□)·${vr(D.v)}`, `p⃗ = ${vr(D.p)}`),
  });
}

// Level 5: the angle of a triangle, then the foot H of the altitude from C.
function dotProblem(level, rng, opts) {
  for (let t = 0; t < 200; t++) {
    const D = triData(rng, 'known');
    if (D.d.n === 0) continue;
    const k = D.d.div(D.n1);
    if (k.d > 6) continue;
    const H0 = add(D.A, D.u.map((x) => x.mul(k)));
    const sym = { A: vt(D.A), B: vt(D.B), C: vt(D.C) };
    const { parts } = angleParts(D, { sym, U: 'AB', V: 'AC' });
    parts.push({
      html: 'Le pied H de la hauteur issue de C : H = A + (AC⃗·AB⃗ / ‖AB⃗‖²)·AB⃗. Que vaut H ?', ask: 'H =', start: 'H',
      judge: { kind: 'vector', symbols: sym, expect: vt(H0) },
      steps: [{ math: `H = A + (${qt(D.d)}/${qt(D.n1)})·AB`, note: 'Projection de AC⃗ sur AB⃗', subgoal: 'proj' }, { math: `H = ${vt(H0)}`, note: '', subgoal: 'proj' }],
    });
    return stepsItem({
      skill: DOT, level, parts, subgoals: DOT_SUB, key: `${DOT}:pb:${vt(D.A)}${vt(D.B)}${vt(D.C)}`, noHints: true, hints: [],
      prompt: `Le triangle ABC a pour sommets ${ptR('A', D.A)}, ${ptR('B', D.B)} et ${ptR('C', D.C)}. Calcule l'angle du triangle en A, puis le pied H de la hauteur issue de C (projection orthogonale de C sur la droite (AB)).`,
      exam: opts.exam ? examTag(opts, 4) : false,
    });
  }
  return dotItem(4, rng);
}

function dotExam(rng, exam) {
  if (exam === 'tf') {
    if (rng.chance(0.5)) {
      const a = rng.int(1, 4);
      const b = rng.int(1, 4);
      return tfG({
        skill: DOT, key: `orth:${a}:${b}`, truth: false, exam: examTag({ exam }),
        statement: 'Si u⃗·v⃗ = 0, alors u⃗ = 0⃗ ou v⃗ = 0⃗.',
        counter: geoCounter('orthNonzero', [['u', 'u⃗ ='], ['v', 'v⃗ =']], { u: `(${a} ; ${b})`, v: `(${-b} ; ${a})` }),
        explanation: `Faux : (${a} ; ${b})·(${-b} ; ${a}) = 0 avec deux vecteurs non nuls (ils sont orthogonaux).`.replace(/\(-/g, '(−'),
      });
    }
    return tfG({
      skill: DOT, key: 'cs-eq', truth: true, exam: examTag({ exam }),
      statement: 'Si u⃗·v⃗ = ‖u⃗‖‖v⃗‖ avec u⃗, v⃗ non nuls, alors u⃗ et v⃗ sont colinéaires et de même sens.',
      explanation: 'Vrai : cos θ = 1, donc θ = 0.',
    });
  }
  if (exam === 'coef') {
    const D = projData(rng);
    const i = rng.int(0, D.p.length - 1);
    return coefItem({
      skill: DOT, key: `${vt(D.u)}${vt(D.v)}:${i}`, exam: examTag({ exam }), label: `p_${i + 1}`,
      prompt: `p⃗ est la projection orthogonale de u⃗ = ${vr(D.u)} sur v⃗ = ${vr(D.v)}. Que vaut sa composante n° ${i + 1} ?`,
      value: qt(D.p[i]), traps: [{ rule: 'g4_proj_no_square' }],
      solution: [{ html: `p⃗ = (${fq(D.d)}/${fq(D.n2)})·${vr(D.v)} = ${vr(D.p)}`, note: '' }], fallback: D.fallback,
    });
  }
  if (exam === 'open') return dotItem(5, rng, { exam });
  // mcq: the angle of two lines (π − θ), or a projection (‖v‖ instead of ‖v‖²).
  if (rng.chance(0.5)) {
    let D;
    for (let t = 0; t < 50; t++) { D = pair(rng, 3, 'known'); if (D.d.n < 0) break; }
    const acute = cosOf(D.d.n < 0 ? D.d.neg() : D.d, D.n1.mul(D.n2));
    return mcqD({
      skill: DOT, level: 4, key: `mcq:lines:${vt(D.u)}${vt(D.v)}`, exam: examTag({ exam }),
      prompt: `Quel est l'angle entre deux droites de vecteurs directeurs u⃗ = ${vr(D.u)} et v⃗ = ${vr(D.v)} ?`,
      right: acute.theta,
      wrongs: [{ html: D.c.theta, rule: D.c.theta !== acute.theta ? 'g4_angle_obtuse' : null }],
      fillers: ['π/6', 'π/4', 'π/3', 'π/2', '2π/3', '3π/4'].map((x) => ({ html: x })),
      solution: [{ html: `|cos θ| = |${fq(D.d)}|/${rootR(D.n1.mul(D.n2))} = ${acute.text.replace(/-/g, '−')}, θ = ${acute.theta}`, note: '' }],
      fallback: D.fallback,
    }, rng);
  }
  const D = projData(rng);
  const nosq = D.v.map((x) => `${x.mul(D.d).n < 0 ? '−' : ''}${rootR(x.mul(x).mul(D.d).mul(D.d).div(D.n2))}`);
  return mcqD({
    skill: DOT, level: 4, key: `mcq:proj:${vt(D.u)}${vt(D.v)}`, exam: examTag({ exam }),
    prompt: `Quelle est la projection orthogonale de u⃗ = ${vr(D.u)} sur v⃗ = ${vr(D.v)} ?`,
    right: vr(D.p),
    wrongs: [{ html: `(${nosq.join(' ; ')})`, rule: 'g4_proj_no_square' }, { html: vr(D.v.map((x) => x.mul(D.d))), rule: 'g4_proj_no_square' }],
    fillers: [{ html: vr(D.u.map((x) => x.mul(D.d).div(D.n1))) }, { html: vr(D.p.map((x) => x.neg())) }, { html: vr(D.v) }],
    solution: [{ html: `p⃗ = (${fq(D.d)}/${fq(D.n2)})·${vr(D.v)} = ${vr(D.p)}`, note: '' }],
    fallback: D.fallback,
  }, rng);
}

export const GEN = {
  [DOT]: (level, rng, profile, opts = {}) => (opts.exam ? dotExam(rng, opts.exam) : dotItem(level, rng)),
};

export { VML, sub, scale };

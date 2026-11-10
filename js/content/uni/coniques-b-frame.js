// g10-conic-frame-back (module G10, part b; step U5): from the reduced frame
// Ru = (Ω ; u₁, u₂) back to Re. A point (X ; Y) of Ru is Ω + X·u₁ + Y·u₂.
// The conics are those of g10-conic-reduce (coniques-b-kit.js reduceData),
// kept when the asked points have rational coordinates (c·u or a·u
// rational). Gabarits: foci in Re (value c, then vector F, F′, geom axis),
// vertices and axes, and the sketch: a `plot` item (place Ω, the axes, the
// vertices and, for a hyperbola, the asymptotes).

import { Q } from '../../math/rational.js';
import {
  q, qt, fq, H, add, sub, scale, vt, vr, sumT, eqT, rootT, partsItem, mcqD, examTag, MT, prim, linT,
} from './geo-kit.js';
import { reduceData } from './coniques-b-kit.js';
import { asProblem } from './kit-problem.js';
import { coefItem } from './alglin-kit.js';
import { analyzeConic } from '../../cas/conic.js';
import { referenceAnswer } from '../../judges/plot.js';

const FB = 'g10-conic-frame-back';
const FB_SUB = [
  { id: 'ru', label: 'éléments dans Ru', skill: 'g10-ellipse' },
  { id: 'back', label: 'revenir dans Re', skill: FB },
];

// √x for a rational x, or null.
function rootQ(x) {
  const r = q(x);
  if (r.n < 0) return null;
  const a = Math.round(Math.sqrt(r.n));
  const b = Math.round(Math.sqrt(r.d));
  return a * a === r.n && b * b === r.d ? new Q(a, b) : null;
}

// need: 'foci' | 'vertices' | 'sketch'.
export function frameData(rng, need, kind = null) {
  for (let t = 0; t < 300; t++) {
    const k = kind ?? rng.pick(['hyp', 'ell']);
    const d = reduceData(rng, k, { fociQ: need === 'foci' });
    if (d.fallback && t < 290) continue;
    const a2X = new Q(d.k, d.l1);
    const a2Y = new Q(d.k, d.l2);
    // The focal axis: the larger positive denominator (ellipse), the positive one (hyperbola).
    const fx = d.kind === 'hyp' ? a2X.n > 0 : a2X.sub(a2Y).n > 0;
    const A2 = fx ? a2X : a2Y;
    const B2 = fx ? a2Y : a2X;
    const c2 = d.kind === 'hyp' ? A2.sub(B2) : A2.sub(B2);
    const w = fx ? d.w1 : d.w2;
    const wo = fx ? d.w2 : d.w1;
    const rc = rootQ(c2.div(d.n));
    const ra = rootQ(A2.div(d.n));
    if (need === 'foci' && !rc) continue;
    if (need === 'vertices' && !ra) continue;
    if (need === 'sketch' && d.O.some((x) => Math.abs(x.valueOf()) > 3)) continue;
    const an = analyzeConic(d.coefs.map((x) => x.valueOf()));
    if (need === 'sketch' && an.vertices.some((P) => P.some((x, i) => Math.abs(x - d.O[i].valueOf()) > 5.5))) continue;
    return { ...d, a2X, a2Y, fx, A2, B2, c2, w, wo, rc, ra, an };
  }
  return null;
}

const uT = (w, n) => `${vt(w)}/√${n}`;
const uR = (w, n) => `${vr(w)}/√${n}`;
// The reduced equation in Ru: X²/A + Y²/B = 1 (A or B < 0 for a hyperbola).
const sq = (L, A, first) => {
  const inv = new Q(1).div(A);
  const neg = A.n < 0;
  const abs = neg ? A.neg() : A;
  const body = inv.d === 1 && !inv.eq(1) && !inv.eq(-1) ? `${Math.abs(inv.n)}${L}^2` : abs.eq(1) ? `${L}^2` : `${L}^2/${abs.d === 1 ? qt(abs) : `(${qt(abs)})`}`;
  return `${neg ? '-' : first ? '' : '+'}${body}`;
};
export const reducedT = (d) => `${sq('X', d.a2X, true)}${sq('Y', d.a2Y, false)} = 1`;
const name = (d) => (d.fx ? 'u_1' : 'u_2');
const nameR = (d) => (d.fx ? 'u₁' : 'u₂');
// Line through P with direction w (row a, b, c, whole and coprime).
const axisRow = (P, w) => prim([w[1].neg(), w[0], w[0].mul(P[1]).sub(w[1].mul(P[0]))], true);

function framePrompt(d, what) {
  const eq = eqT(d.coefs);
  return `La conique ${MT(eq, { vars: ['x', 'y'] })} a pour équation réduite ${MT(reducedT(d), { vars: ['X', 'Y'] })} dans le repère Ru = (Ω ; u₁, u₂), avec Ω = ${vr(d.O)}, u₁ = ${uR(d.w1, d.n)} et u₂ = ${uR(d.w2, d.n)}. ${what}`;
}

const FB_MENU = [
  { id: 'ru', label: 'Calculer l\'élément dans Ru', valid: true },
  { id: 'back', label: 'Transporter : Ω + X·u₁ + Y·u₂', valid: true },
  { id: 'ruonly', label: 'Donner les coordonnées de Ru', valid: false, rule: 'g10_foci_reduced_frame', why: 'La question demande les coordonnées dans Re : il faut transporter avec Ω + X·u₁ + Y·u₂.' },
  { id: 'transpose', label: 'Transporter avec Ω + Pᵀ·(X ; Y)', valid: false, rule: 'g10_frame_back_transpose', why: 'Les colonnes de P sont u₁ et u₂ : x = Ω + P·(X ; Y).' },
];

// Wrong points of the traps for the point (X ; Y) of Ru.
function trapPts(d, XY) {
  const s = Math.sqrt(d.n);
  const Pt = [d.w1[0].valueOf() * XY[0] + d.w1[1].valueOf() * XY[1], d.w2[0].valueOf() * XY[0] + d.w2[1].valueOf() * XY[1]].map((x) => x / s);
  const fl = (x) => { for (let den = 1; den <= 60; den++) { const m = Math.round(x * den); if (Math.abs(m / den - x) < 1e-9) return qt(new Q(m, den)); } return null; };
  const tr = [d.O[0].valueOf() + Pt[0], d.O[1].valueOf() + Pt[1]].map(fl);
  return tr.every(Boolean) ? `(${tr.join(' ; ')})` : null;
}

function pointParts(d, which, level, sign) {
  // which: 'F' (focus, distance c) or 'S' (vertex, distance a).
  const r = which === 'F' ? d.rc : d.ra;
  const dist = rootT(which === 'F' ? d.c2 : d.A2);
  const P = add(d.O, scale(d.w, r.mul(sign)));
  const lbl = which === 'F' ? (sign > 0 ? 'F' : 'F\'') : (sign > 0 ? 'S' : 'S\'');
  const ruT = d.fx ? `(${sign < 0 ? '-' : ''}${dist} ; 0)` : `(0 ; ${sign < 0 ? '-' : ''}${dist})`;
  const XY = d.fx ? [sign * Math.sqrt(which === 'F' ? d.c2.valueOf() : d.A2.valueOf()), 0] : [0, sign * Math.sqrt(which === 'F' ? d.c2.valueOf() : d.A2.valueOf())];
  const tp = trapPts(d, XY);
  const wrong = { g10_foci_reduced_frame: [ruT], g10_frame_back_transpose: tp ? [tp] : [] };
  const symbols = { Ω: vt(d.O), u_1: uT(d.w1, d.n), u_2: uT(d.w2, d.n) };
  const step = vt(scale(d.w, r.mul(sign)));
  return {
    html: `${lbl} est en ${ruT.replace(/-/g, '−')} dans Ru. Ses coordonnées dans Re ?`, ask: `${lbl} =`, start: lbl,
    judge: { kind: 'vector', symbols, expect: vt(P), trapPts: wrong }, menu: FB_MENU,
    lines: [
      { math: `${lbl} = Ω ${sign < 0 ? '-' : '+'} ${dist}·${name(d)}`, note: `Ω + X·u₁ + Y·u₂ avec ${ruT.replace(/-/g, '−')}`, subgoal: 'back', blank: [dist] },
      { math: `${lbl} = ${vt(d.O)} + ${step}`, note: `${dist.replace(/-/g, '−')}·${nameR(d)} = ${vr(scale(d.w, r.mul(sign)))}`, subgoal: 'back', blank: [step], blank2: [step] },
      { math: vt(P), note: '', subgoal: 'back', blank: [qt(P[0]), qt(P[1])] },
    ],
  };
}

function cPart(d) {
  const ell = d.kind === 'ell';
  const A = qt(d.A2);
  const B = qt(ell ? d.B2 : d.B2.neg());
  return {
    html: `Dans Ru, ${ell ? 'c² = a² − b²' : 'c² = a² + b²'}, avec a² = ${fq(d.A2)} et b² = ${fq(ell ? d.B2 : d.B2.neg())}.`, ask: 'c =', start: 'c',
    judge: { kind: 'value', expect: rootT(d.c2), form: 'exact', trapValues: {} },
    lines: [
      { math: `√(${A} ${ell ? '-' : '+'} ${B})`, note: ell ? 'Ellipse : c² = a² − b²' : 'Hyperbole : c² = a² + b²', subgoal: 'ru', blank: [B] },
      { math: rootT(d.c2), note: 'Les foyers sont sur l\'axe focal, à c du centre', subgoal: 'ru', blank: [rootT(d.c2)] },
    ],
  };
}

function axisPart(d, both = false) {
  const r1 = axisRow(d.O, d.w);
  const r2 = axisRow(d.O, d.wo);
  const ref = both ? `${linT(r1)} ou ${linT(r2)}` : linT(r1);
  return {
    html: both ? 'Les deux axes de symétrie dans Re ?' : `L'axe ${d.kind === 'hyp' ? 'réel' : 'focal'} dans Re : la droite par Ω de direction ${nameR(d)} ?`,
    ask: both ? 'axes :' : 'axe :', start: both ? 'axes' : 'axe',
    judge: { kind: 'geom', object: 'line2', ref, ...(both ? { count: 2 } : {}) },
    lines: [{ math: ref, note: `Direction ${vr(d.w)}${both ? ` et ${vr(d.wo)}` : ''}, par Ω`, subgoal: 'back' }],
  };
}

// The sketch (plot): Ω, the axes, the focal vertices, the asymptotes.
function sketchItem(level, rng, opts = {}) {
  const d = frameData(rng, 'sketch');
  const an = d.an;
  const cx = Math.round(d.O[0].valueOf());
  const cy = Math.round(d.O[1].valueOf());
  const view = { x: [cx - 7, cx + 7], y: [cy - 7, cy + 7] };
  const place = [
    { id: 'center', label: 'Ω', short: 'Ω', kind: 'point', count: 1 },
    { id: 'axes', label: 'axes', short: 'axe', kind: 'line', count: 2 },
    { id: 'vertices', label: 'sommets (axe focal)', short: 'S', kind: 'point', count: 2 },
  ];
  const expect = { center: [an.center], axes: [an.axis, an.minorAxis], vertices: an.vertices };
  if (an.type === 'hyperbola') { place.push({ id: 'asymptotes', label: 'asymptotes', short: 'as', kind: 'line', count: 2 }); expect.asymptotes = an.asymptotes; }
  const item = {
    skill: FB, level, type: 'plot', task: 'conic', view, place, expect, tol: { pos: 0.15, line: 0.25 },
    equation: eqT(d.coefs),
    prompt: framePrompt(d, `Esquisse-la dans Re : place le centre Ω, les deux axes, les sommets de l'axe ${d.kind === 'hyp' ? 'réel' : 'focal'}${an.type === 'hyperbola' ? ' et les asymptotes' : ''}. (Les points se placent au quart d'unité près.)`),
    hints: opts.exam || level >= 5 ? [] : H(
      'Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂ : les axes passent par Ω, de directions u₁ et u₂.',
      `Les sommets sont Ω ± a·u, avec a² = ${fq(d.A2)} et u = ${uR(d.w, d.n)}.`,
      `Ω = ${vr(d.O)}, sommets ≈ ${an.vertices.map((P) => `(${P.map((x) => x.toFixed(2).replace('.', ',').replace('-', '−')).join(' ; ')})`).join(' et ')}.`,
    ),
    noHints: !!opts.exam || level >= 5,
    rules: { center: null, vertices: 'g10_foci_reduced_frame' },
    solution: [{ html: `Ω = ${vr(d.O)}, axes de directions ${vr(d.w)} et ${vr(d.wo)}, sommets Ω ± ${rootT(d.A2).replace(/-/g, '−')}·${nameR(d)}${an.type === 'hyperbola' ? ', asymptotes par Ω de directions a·u ± b·v' : ''}.`, note: '' }],
    answerHtml: `Ω = ${vr(d.O)}`,
    baits: ['g10_foci_reduced_frame'], subgoals: FB_SUB,
    key: `${FB}:plot:${eqT(d.coefs)}`, expectedSec: 150, exam: opts.exam ? examTag(opts) : false,
  };
  item.answer = referenceAnswer(item);
  return item;
}

function frameItem(level, rng, opts = {}) {
  const g = opts.exam === 'open' || level === 5 ? 'pb' : level <= 2 ? 'foci' : level === 3 ? rng.pick(['foci', 'vertices']) : rng.pick(['foci', 'vertices', 'sketch']);
  if (g === 'sketch') return sketchItem(level, rng, opts);
  const d = frameData(rng, g === 'vertices' ? 'vertices' : 'foci');
  const parts = [];
  if (g === 'foci' || g === 'pb') {
    parts.push(cPart(d), pointParts(d, 'F', level, 1), pointParts(d, 'F', level, -1));
    if (level >= 3) parts.push(axisPart(d));
  }
  if (g === 'pb' && d.ra) parts.push(pointParts(d, 'S', level, 1), pointParts(d, 'S', level, -1));
  if (g === 'vertices') parts.push(pointParts(d, 'S', level, 1), pointParts(d, 'S', level, -1), axisPart(d, true));
  const what = g === 'vertices' ? 'Donne ses sommets de l\'axe focal et ses deux axes dans Re.' : g === 'pb' ? 'Donne ses foyers, son axe focal' + (d.ra ? ' et ses sommets' : '') + ' dans Re.' : 'Donne ses foyers dans Re.';
  const F = add(d.O, scale(d.w, d.rc ?? q(0)));
  return partsItem({
    skill: FB, level, parts, subgoals: FB_SUB,
    prompt: framePrompt(d, what),
    hints: H(
      'Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂.',
      `F = ${vr(d.O)} + ${rootT(d.c2).replace(/-/g, '−')}·(□)`,
      d.rc ? `F = ${vr(F)}` : `S = ${vr(add(d.O, scale(d.w, d.ra)))}`,
    ),
    key: `${FB}:${g}:${eqT(d.coefs)}`, exam: opts.exam ? examTag(opts, opts.exam === 'open' ? 3.5 : 1) : false,
  });
}

function frameExam(rng, exam) {
  if (exam === 'open') return frameItem(5, rng, { exam });
  const d = frameData(rng, 'foci');
  const F1 = add(d.O, scale(d.w, d.rc));
  const F2 = sub(d.O, scale(d.w, d.rc));
  if (exam === 'coef') {
    const big = F1[0].sub(F2[0]).n >= 0 ? F1 : F2;
    const tie = F1[0].eq(F2[0]);
    return coefItem({
      skill: FB, key: `${eqT(d.coefs)}`, exam: examTag({ exam }), label: tie ? 'y' : 'x',
      prompt: framePrompt(d, tie ? 'Quelle est l\'ordonnée du foyer le plus haut, dans Re ?' : 'Quelle est l\'abscisse du foyer le plus à droite, dans Re ?'),
      value: qt(tie ? (F1[1].sub(F2[1]).n >= 0 ? F1[1] : F2[1]) : big[0]),
      traps: [{ rule: 'g10_foci_reduced_frame' }],
      solution: [{ html: `c = ${rootT(d.c2).replace(/-/g, '−')}, F = Ω ± c·${nameR(d)} : ${vr(F1)} et ${vr(F2)}.`, note: '' }],
    });
  }
  const dist = rootT(d.c2).replace(/-/g, '−');
  const ru = d.fx ? `(${dist} ; 0) et (−${dist} ; 0)` : `(0 ; ${dist}) et (0 ; −${dist})`;
  const XY = d.fx ? [Math.sqrt(d.c2.valueOf()), 0] : [0, Math.sqrt(d.c2.valueOf())];
  const t1 = trapPts(d, XY);
  const t2 = trapPts(d, XY.map((x) => -x));
  return mcqD({
    skill: FB, level: 4, key: `mcq:${eqT(d.coefs)}`, exam: examTag({ exam }),
    prompt: framePrompt(d, 'Quels sont ses foyers dans Re ?'),
    right: `${vr(F1)} et ${vr(F2)}`,
    wrongs: [{ html: ru, rule: 'g10_foci_reduced_frame' }, t1 && t2 ? { html: `${t1.replace(/-/g, '−')} et ${t2.replace(/-/g, '−')}`, rule: 'g10_frame_back_transpose' } : null,
      { html: `${vr(add(d.O, scale(d.wo, d.rc)))} et ${vr(sub(d.O, scale(d.wo, d.rc)))}`, rule: null }],
    fillers: [{ html: `${vr(add(F1, [q(1), q(0)]))} et ${vr(add(F2, [q(1), q(0)]))}` }, { html: `${vr(scale(d.w, d.rc))} et ${vr(scale(d.w, d.rc.neg()))}` }],
    solution: [{ html: `c = ${dist}, F = Ω ± c·${nameR(d)} = ${vr(F1)} et ${vr(F2)}.`, note: '' }],
  }, rng);
}

export const GEN = {
  // Level 5 is the long problem of the catalogue (E2 c), a `problem` item since
  // step U4, with the points of its open variant.
  [FB]: (level, rng, profile, opts = {}) => (opts.exam ? frameExam(rng, opts.exam) : level === 5 ? asProblem(frameItem(5, rng), 3.5) : frameItem(level, rng)),
};

// Generators of module G10, part a (spec §8.3; step U5): circles (equation,
// tangents, power and radical axis, pole and polar) and the three conics in
// reduced form. Catalogue: docs/universite/G-gymnase-2.md, G10. Tools:
// geo-kit.js and coniques-a-kit.js.
//
// Judges: `geom` (circles, tangents, polars, radical axes; count 2 for two
// tangents), `conic` (completing the squares to the reduced form, target
// 'standard'; elements Ω, a, b, c, F, e, asymptotes, directrices, S, axe,
// with `ask`), `vector` (centres, poles, points of contact), `value`,
// `solset` (equations in a slope m, a constant c, an abscissa). Levels: 1–2
// guided (blanks), 3 choose the action (cfg.menu of each part), 4 free, 5
// alone (a long problem in parts, without help: the type `problem` comes
// with step U4). Every figure is built from its answer: whole centres,
// radii and points of contact (vectors of whole norm), Pythagorean (a, b, c).

import { Q } from '../../math/rational.js';
import {
  q, qt, fq, nz, H, sumT, vt, vr, ptR, rootT, readable, MT, mcqD, tfG, examTag, geoCounter, pickW,
} from './geo-kit.js';
import {
  sqT, linT1, diffT, circleEq, circleRed, circleCompleted, par, parR, normVecs, lineRow, lineText, partsG, conicPlot,
} from './coniques-a-kit.js';
import { coefItem } from './alglin-kit.js';

const KEYS = ['calc', 'geo', 'pts'];
const Rd = (t) => readable(t);
const M = (t) => MT(t, { vars: ['x', 'y'] });
const sq = (x) => x * x;

// ======================================================================
// g10-circle-eq
// ======================================================================

const CEQ = 'g10-circle-eq';
const CEQ_SUB = [
  { id: 'norm', label: 'normaliser l\'équation', skill: CEQ },
  { id: 'sq', label: 'compléter les carrés', skill: 'quad-complete' },
  { id: 'read', label: 'lire Ω et r', skill: CEQ },
  { id: 'med', label: 'médiatrices', skill: 'g4-bisectors' },
];

const CEQ_MENU = {
  sq: (m) => [
    { id: 'norm', label: `Diviser par le coefficient de x²`, valid: m !== 1, why: 'Le coefficient de x² vaut déjà 1.' },
    { id: 'sq', label: 'Compléter un carré en x et un en y', valid: true },
    { id: 'read', label: 'Lire Ω = (−D/2 ; −E/2) tout de suite', valid: m === 1, rule: m === 1 ? null : 'g4_not_normalized', why: 'Le centre se lit sur une équation normalisée (1 devant x²) : divise d\'abord.' },
  ],
  read: [
    { id: 'read', label: 'Lire Ω sur la forme réduite (x − h)² + (y − k)² = r²', valid: true },
    { id: 'sign', label: 'Ω = (−h ; −k)', valid: false, why: 'Dans (x − h)², le centre a pour abscisse h : (x − 2)² donne 2, (x + 3)² donne −3.' },
  ],
  r: [
    { id: 'root', label: 'r = √(second membre)', valid: true },
    { id: 'same', label: 'r = second membre', valid: false, why: 'Le second membre de la forme réduite vaut r², pas r.' },
  ],
  med: [
    { id: 'med', label: 'Médiatrice : PQ⃗·(M − I) = 0, avec I le milieu', valid: true },
    { id: 'line', label: 'La droite (PQ)', valid: false, why: 'Le centre est à égale distance de P et de Q : il est sur la médiatrice, pas sur la droite (PQ).' },
  ],
  centre: [
    { id: 'inter', label: 'Intersection des deux médiatrices', valid: true },
    { id: 'mid', label: 'Milieu de [AB]', valid: false, why: 'Le milieu de [AB] n\'est le centre que si [AB] est un diamètre.' },
  ],
};

function circleData(rng, { r2 = null } = {}) {
  for (;;) {
    const h = rng.int(-6, 6);
    const k = rng.int(-6, 6);
    if (h === 0 && k === 0) continue;
    const rr = r2 ?? sq(rng.int(1, 7));
    if (h * h + k * k - rr === 0) continue; // F ≠ 0
    return { h, k, r2: rr };
  }
}

// Gabarit 1: the general equation → reduced form, Ω and r.
function ceqGeneral(level, rng, opts = {}) {
  const odd = !opts.exam && level >= 3 && rng.int(0, 7) === 0;
  const d = circleData(rng, odd ? { r2: rng.pick([0, -1, -4, -9]) } : {});
  const { h, k, r2 } = d;
  const m = level === 1 ? 1 : level === 2 ? rng.pick([2, 3, 5]) : rng.pick([1, 2, 3, 5]);
  const eq0 = circleEq(h, k, r2, m);
  const eqN = circleEq(h, k, r2, 1);
  const F = h * h + k * k - r2;
  const sqLines = [];
  if (m !== 1) sqLines.push({ math: eqN, note: `Diviser par ${m}`, subgoal: 'norm' });
  sqLines.push(
    { math: circleCompleted(h, k, F), note: 'Compléter les carrés', subgoal: 'sq', blank: [{ after: sqT('x', h), text: qt(h * h) }, { after: sqT('y', k), text: qt(k * k) }].filter((b) => b.text !== '0') },
    { math: circleRed(h, k, r2), note: 'Forme réduite', subgoal: 'sq', blank: [{ after: '=', text: qt(r2) }] },
  );
  const parts = [{
    html: null, start: eq0,
    judge: r2 >= 0 ? { kind: 'geom', object: 'circle', ref: eqN, circleEq: eq0 } : { kind: 'conic', equation: eqN, target: 'standard' },
    menu: CEQ_MENU.sq(m),
    decisions: m !== 1 ? [{
      levels: [2], kind: 'decision', prompt: 'Par quoi commencer ?', options: [
        { id: 'div', label: `Diviser toute l'équation par ${m}`, valid: true, ref: true },
        { id: 'read', label: 'Lire tout de suite Ω = (−D/2 ; −E/2)', valid: false, rule: 'g4_not_normalized', why: `Le centre se lit sur x² + y² + Dx + Ey + F = 0, avec 1 devant x² : ici il y a ${m}.` },
      ],
    }] : [],
    lines: sqLines,
  }];
  if (r2 >= 0) {
    parts.push({
      html: 'Le centre ?', ask: 'Ω =', start: 'Ω',
      judge: { kind: 'vector', expect: vt([h, k]), circleEq: eq0 }, menu: CEQ_MENU.read,
      lines: [{ math: `Ω = ${vt([h, k])}`, note: '(x − h)² + (y − k)² = r² : Ω = (h ; k)', subgoal: 'read', blank: [qt(h), qt(k)] }],
    });
  }
  const nature = {
    kind: 'decision', prompt: `r² = ${fq(r2)} : l'ensemble est…`, options: [
      { id: 'circle', label: 'un cercle', valid: r2 > 0, ref: r2 > 0, why: r2 > 0 ? '' : 'Un rayon au carré ne peut pas être négatif ou nul.' },
      { id: 'point', label: 'un seul point, Ω', valid: r2 === 0, ref: r2 === 0, why: 'Seul (x − h)² + (y − k)² = 0 réduit l\'ensemble au point Ω.' },
      { id: 'empty', label: 'vide', valid: r2 < 0, ref: r2 < 0, why: r2 < 0 ? '' : 'Une somme de carrés peut valoir un nombre positif ou nul.' },
    ],
  };
  if (r2 > 0) {
    parts.push({
      html: 'Le rayon ?', ask: 'r =', start: 'r', judge: { kind: 'value', expect: String(Math.sqrt(r2)) }, menu: CEQ_MENU.r,
      decisions: [{ ...nature, levels: [2, 3] }],
      lines: [{ math: String(Math.sqrt(r2)), note: `r = √${r2}`, subgoal: 'read', blank: [String(Math.sqrt(r2))] }],
    });
  } else {
    parts.push({
      html: 'Que vaut r² ?', ask: 'r² =', start: 'r^2', judge: { kind: 'value', expect: String(r2) },
      decisions: [nature],
      lines: [{ math: String(r2), note: 'Le second membre de la forme réduite', subgoal: 'read' }],
    });
  }
  return partsG({
    skill: CEQ, level, parts, subgoals: CEQ_SUB, keys: KEYS,
    prompt: level <= 2 && r2 > 0
      ? `Trouve le centre Ω et le rayon r du cercle γ : ${M(eq0)}.`
      : `Mets γ : ${M(eq0)} sous forme réduite, puis donne son centre et son rayon (ou dis pourquoi ce n'est pas un cercle).`,
    hints: H(
      m !== 1 ? `Divise par ${m}, puis complète un carré en x et un en y.` : 'Complète un carré en x et un en y : x² − 2hx = (x − h)² − h².',
      Rd(`${circleCompleted(h, k, F).replace(/- \d+ \+/, '- □ +')}`),
      Rd(circleRed(h, k, r2)),
    ),
    key: `${CEQ}:gen:${eq0}`, exam: opts.exam ? examTag(opts, 4) : false,
  });
}

// Gabarit 2: the circle through three points (two perpendicular bisectors).
function threePoints(rng) {
  const h = rng.int(-4, 4);
  const k = rng.int(-4, 4);
  const r = rng.pick([5, 5, 5, 10, 13]);
  const vs = rng.shuffle(normVecs(r)).slice(0, 3);
  const [A, B, C] = vs.map(([x, y]) => [h + x, k + y]);
  return { h, k, r, A, B, C };
}

function bisectorPart(P, Qp, names, html) {
  const u = [Qp[0] - P[0], Qp[1] - P[1]];
  const I = [q(P[0] + Qp[0], 2), q(P[1] + Qp[1], 2)];
  const row = lineRow(u[0], u[1], I[0].mul(-u[0]).sub(I[1].mul(u[1])));
  const terms = [];
  const dT = (v, c) => (c.n === 0 ? `${v} - 0` : diffT(v, c));
  if (u[0]) terms.push(`${par(u[0])}(${dT('x', I[0])})`);
  if (u[1]) terms.push(`${par(u[1])}(${dT('y', I[1])})`);
  return {
    html, ask: `médiatrice de [${names}] :`, start: 'm',
    judge: { kind: 'geom', object: 'line2', ref: lineText(row) }, menu: CEQ_MENU.med,
    lines: [
      ...(terms.length === 2 ? [{ math: `${terms.join(' + ')} = 0`, note: `${names[0]}${names[1]}⃗ = ${vr(u)}, milieu I = ${vr(I)}`, subgoal: 'med', blank: [qt(u[0]), qt(u[1])] }] : []),
      { math: lineText(row), note: terms.length === 2 ? 'Forme cartésienne' : `${names[0]}${names[1]}⃗ = ${vr(u)}, milieu I = ${vr(I)}`, subgoal: 'med' },
    ],
  };
}

function ceqThree(level, rng, opts = {}) {
  const d = threePoints(rng);
  const { h, k, r, A, B, C } = d;
  const ref = circleEq(h, k, r * r);
  const parts = [
    bisectorPart(A, B, 'AB', 'Le centre est à égale distance de A et de B : il est sur la médiatrice de [AB].'),
    bisectorPart(A, C, 'AC', 'Et sur la médiatrice de [AC].'),
    {
      html: 'Le centre est l\'intersection des deux médiatrices.', ask: 'Ω =', start: 'Ω',
      judge: { kind: 'vector', expect: vt([h, k]) }, menu: CEQ_MENU.centre,
      lines: [{ math: `Ω = ${vt([h, k])}`, note: 'Résoudre le système des deux médiatrices', subgoal: 'read', blank: [qt(h), qt(k)] }],
    },
    {
      html: 'Le rayon : r² = ΩA².', ask: 'r² =', start: 'r^2', judge: { kind: 'value', expect: String(r * r) },
      lines: [
        { math: `(${qt(A[0])}-${par(h)})^2+(${qt(A[1])}-${par(k)})^2`, note: 'r² = (x_A − h)² + (y_A − k)²', subgoal: 'read', blank: [{ after: '(', text: qt(A[0]) }] },
        { math: String(r * r), note: '', subgoal: 'read' },
      ],
    },
    {
      html: 'L\'équation du cercle.', ask: 'γ :', start: 'γ',
      judge: { kind: 'geom', object: 'circle', ref },
      lines: [{ math: circleRed(h, k, r * r), note: '(x − h)² + (y − k)² = r²', subgoal: 'read', blank: [{ after: '=', text: qt(r * r) }] }],
    },
  ];
  return partsG({
    skill: CEQ, level, parts, subgoals: CEQ_SUB, keys: KEYS,
    prompt: `Trouve l'équation du cercle qui passe par ${ptR('A', A)}, ${ptR('B', B)} et ${ptR('C', C)}.`,
    hints: H('Le centre est à égale distance des trois points : il est sur les médiatrices de [AB] et de [AC].', `Médiatrice de [AB] : ${vr([B[0] - A[0], B[1] - A[1]])}·(M − I) = 0, I = □`, Rd(circleRed(h, k, r * r))),
    key: `${CEQ}:three:${vt(A)}${vt(B)}${vt(C)}`, exam: opts.exam ? examTag(opts, 5) : false,
  });
}

// Gabarit 3: the circle of diameter [AB].
function ceqDiameter(level, rng) {
  let A; let B;
  do {
    A = [rng.int(-6, 6), rng.int(-6, 6)];
    B = [A[0] + 2 * nz(rng, -4, 4), A[1] + 2 * rng.int(-4, 4)];
  } while (Math.abs(B[0]) > 8 || Math.abs(B[1]) > 8);
  const h = (A[0] + B[0]) / 2;
  const k = (A[1] + B[1]) / 2;
  const r2 = (sq(B[0] - A[0]) + sq(B[1] - A[1])) / 4;
  const parts = [
    {
      html: null, start: 'Ω', judge: { kind: 'vector', symbols: { A: vt(A), B: vt(B) }, expect: vt([h, k]) }, menu: CEQ_MENU.centre.map((o) => ({ ...o, valid: o.id === 'mid', why: o.id === 'inter' ? 'Ici, [AB] est un diamètre : son milieu est le centre.' : '' })),
      lines: [{ math: 'Ω = (A + B)/2', note: 'Le centre est le milieu du diamètre', subgoal: 'read' }, { math: `Ω = ${vt([h, k])}`, note: '', subgoal: 'read', blank: [qt(h), qt(k)] }],
    },
    {
      html: 'Le rayon : r² = ΩA².', ask: 'r² =', start: 'r^2', judge: { kind: 'value', expect: String(r2) },
      lines: [
        { math: `(${qt(A[0])}-${par(h)})^2+(${qt(A[1])}-${par(k)})^2`, note: 'r² = (x_A − h)² + (y_A − k)²', subgoal: 'read' },
        { math: String(r2), note: '', subgoal: 'read' },
      ],
    },
    {
      html: 'L\'équation du cercle.', ask: 'γ :', start: 'γ', judge: { kind: 'geom', object: 'circle', ref: circleEq(h, k, r2) },
      lines: [{ math: circleRed(h, k, r2), note: '', subgoal: 'read' }],
    },
  ];
  return partsG({
    skill: CEQ, level, parts, subgoals: CEQ_SUB, keys: KEYS,
    prompt: `Trouve l'équation du cercle de diamètre [AB], avec ${ptR('A', A)} et ${ptR('B', B)}.`,
    hints: H('Le centre est le milieu de [AB], le rayon la moitié de AB.', 'Ω = (A + B)/2, r² = ΩA² = □', Rd(circleRed(h, k, r2))),
    key: `${CEQ}:diam:${vt(A)}${vt(B)}`,
  });
}

function ceqItem(level, rng) {
  if (level <= 2) return ceqGeneral(level, rng);
  if (level === 3) return rng.chance(0.6) ? ceqGeneral(level, rng) : ceqThree(level, rng);
  if (level === 4) return pickW(rng, [ceqGeneral, ceqThree, ceqDiameter])(level, rng);
  return ceqThree(level, rng);
}

function ceqExam(rng, exam) {
  if (exam === 'open') return ceqThree(5, rng, { exam });
  if (exam === 'tf') {
    if (rng.chance(0.5)) {
      const d = circleData(rng, { r2: -rng.pick([1, 2, 4, 9]) });
      const eq = circleEq(d.h, d.k, d.r2);
      return tfG({
        skill: CEQ, key: `empty:${eq}`, truth: false, exam: examTag({ exam }), ruleIfTrue: 'g4_square_constant',
        statement: `${M(eq)} est l'équation d'un cercle.`,
        counter: geoCounter('r2Negative', [['r2', 'r² =']], { r2: String(d.r2) }, { value: d.r2 }),
        explanation: `Faux : en complétant les carrés, ${M(circleRed(d.h, d.k, d.r2))}. Une somme de carrés ne vaut pas ${fq(d.r2)} : l'ensemble est vide.`,
      });
    }
    const d = circleData(rng);
    const eq = circleEq(d.h, d.k, d.r2);
    return tfG({
      skill: CEQ, key: `circle:${eq}`, truth: true, exam: examTag({ exam }),
      statement: `${M(eq)} est l'équation du cercle de centre ${ptR('Ω', [d.h, d.k])} et de rayon ${Math.sqrt(d.r2)}.`,
      explanation: `Vrai : ${M(circleRed(d.h, d.k, d.r2))}.`,
    });
  }
  const d = circleData(rng);
  const m = rng.pick([2, 3]);
  const eq0 = circleEq(d.h, d.k, d.r2, m);
  const F = d.h * d.h + d.k * d.k - d.r2;
  const opt = (O, r2) => `Ω = ${vr(O)}, r² = ${fq(r2)}`;
  const Ob = [d.h * m, d.k * m];
  return mcqD({
    skill: CEQ, level: 4, key: `mcq:${eq0}`, exam: examTag({ exam }),
    prompt: `Quels sont le centre Ω et le carré du rayon r² du cercle ${M(eq0)} ?`,
    right: opt([d.h, d.k], d.r2),
    wrongs: [
      { html: opt(Ob, sq(Ob[0]) + sq(Ob[1]) - m * F), rule: 'g4_not_normalized' },
      { html: opt([d.h, d.k], -F), rule: 'g4_square_constant' },
      { html: opt([-d.h, -d.k], d.r2), rule: null },
    ],
    fillers: [{ html: opt([d.h, d.k], Math.sqrt(d.r2)) }, { html: opt([d.k, d.h], d.r2) }],
    solution: [{ html: `On divise par ${m}, puis ${Rd(circleRed(d.h, d.k, d.r2))}.`, note: '' }],
  }, rng);
}

// ======================================================================
// g10-circle-tangent
// ======================================================================

const TAN = 'g10-circle-tangent';
const TAN_SUB = [
  { id: 'pos', label: 'position du point', skill: TAN },
  { id: 'dist', label: 'distance au centre = r', skill: 'g4-bisectors' },
  { id: 'solve', label: 'résoudre l\'équation', skill: 'quad-formula' },
  { id: 'tan', label: 'écrire les tangentes', skill: TAN },
];
const dT = (v, c) => (q(c).n === 0 ? `${v} - 0` : diffT(v, c));
const mT = (x) => qt(x); // a slope as text

function tanMethod(kind) {
  return {
    levels: [3], kind: 'decision', prompt: 'Quelle méthode ?', options: [
      { id: 'dbl', label: 'En T : dédoubler l\'équation du cercle', valid: kind === 'at', ref: kind === 'at', why: 'Le point donné n\'est pas sur le cercle : on ne peut pas dédoubler en ce point.' },
      { id: 'dist', label: 'Depuis Q : distance au centre = r', valid: kind !== 'at', ref: kind !== 'at', quality: 'good', why: 'Le point est sur le cercle : la tangente en T se trouve directement, en dédoublant.' },
      { id: 'disc', label: 'Depuis Q : discriminant nul de l\'intersection', valid: kind !== 'at', quality: 'good', why: 'Le point est sur le cercle : dédouble l\'équation en T.' },
    ],
  };
}
const TAN_MENU = {
  at: [
    { id: 'dbl', label: '(x_T − h)(x − h) + (y_T − k)(y − k) = r²', valid: true },
    { id: 'radius', label: 'La droite par T de direction ΩT⃗', valid: false, rule: 'g10_tangent_radius_direction', why: 'ΩT⃗ est le rayon : la tangente lui est perpendiculaire, ΩT⃗ en est un vecteur normal.' },
  ],
  pos: [
    { id: 'd2', label: 'Calculer ΩQ² et comparer à r²', valid: true },
    { id: 'eq', label: 'Remplacer Q dans l\'équation de la droite', valid: false, why: 'On ne connaît pas encore la droite : compare d\'abord ΩQ² et r².' },
  ],
  m: [
    { id: 'dist', label: 'Distance du centre à la droite = r', valid: true },
    { id: 'sq', label: 'Élever au carré (les deux membres sont positifs)', valid: true },
    { id: 'solve', label: 'Résoudre l\'équation du 2e degré', valid: true },
  ],
  both: [
    { id: 'both', label: 'Écrire toutes les tangentes, verticale comprise', valid: true },
    { id: 'one', label: 'Seulement les droites y − y_Q = m(x − x_Q)', valid: false, rule: 'g10_vertical_tangent_lost', why: 'Cette écriture exclut la droite verticale x = x_Q : teste-la à part.' },
  ],
};

// The tangent at T = Ω + w: w·(X − Ω) = r².
function tanAt(level, rng, opts = {}) {
  let h; let k;
  do { h = rng.int(-5, 5); k = rng.int(-5, 5); } while (h === 0 && k === 0);
  const r = rng.pick([5, 5, 5, 10, 13]);
  const w = rng.pick(normVecs(r).filter((v) => v[0] && v[1]));
  const T = [h + w[0], k + w[1]];
  const r2 = r * r;
  const row = lineRow(w[0], w[1], -(w[0] * h + w[1] * k + r2));
  const eq = circleRed(h, k, r2);
  const terms = [`${par(w[0])}(${dT('x', h)})`, `${par(w[1])}(${dT('y', k)})`];
  const parts = [{
    start: 't', judge: { kind: 'geom', object: 'line2', ref: lineText(row), tangentAt: { T, w } }, menu: TAN_MENU.at,
    decisions: [tanMethod('at')],
    lines: [
      { math: `${terms.join(' + ')} = ${r2}`, note: `Dédoubler : ΩT⃗ = ${vr(w)}`, subgoal: 'tan', blank: [qt(w[0]), { after: '+', text: qt(w[1]) }] },
      { math: lineText(row), note: 'Développer', subgoal: 'tan' },
    ],
  }];
  return partsG({
    skill: TAN, level, parts, subgoals: TAN_SUB, keys: KEYS,
    prompt: `Écris l'équation de la tangente au cercle γ : ${M(eq)} au point ${ptR('T', T)}.`,
    hints: H('En T, dédouble : (x_T − h)(x − h) + (y_T − k)(y − k) = r². La tangente est perpendiculaire au rayon ΩT⃗.', Rd(`${par(w[0])}(${diffT('x', h)}) + □(${diffT('y', k)}) = ${r2}`), Rd(lineText(row))),
    key: `${TAN}:at:${eq}:${vt(T)}`, exam: opts.exam ? examTag(opts, 4) : false,
  });
}

// Two contact points Ω + w₁, Ω + w₂ (|wᵢ| = 5) whose tangents meet at a whole Q.
function fromQData(rng, { vertical = false, slanted = false } = {}) {
  const vs = normVecs(5);
  for (let t = 0; t < 400; t++) {
    const h = rng.int(-4, 4);
    const k = rng.int(-4, 4);
    const w1 = vertical ? rng.pick([[5, 0], [-5, 0]]) : rng.pick(vs.filter((v) => v[1] !== 0));
    const w2 = rng.pick(vs.filter((v) => v[1] !== 0 && (!slanted || v[0] !== 0)));
    const det = w1[0] * w2[1] - w1[1] * w2[0];
    if (!det) continue;
    const dx = (25 * (w2[1] - w1[1])) / det;
    const dy = (25 * (w1[0] - w2[0])) / det;
    if (!Number.isInteger(dx) || !Number.isInteger(dy)) continue;
    const Qp = [h + dx, k + dy];
    if (Math.abs(Qp[0]) > 12 || Math.abs(Qp[1]) > 12) continue;
    return { h, k, r: 5, w1, w2, Q: Qp };
  }
  return { h: 2, k: -3, r: 5, w1: [-5, 0], w2: [3, 4], Q: [-3, 7], fallback: true };
}

function tanFromQ(level, rng, opts = {}) {
  const vertical = opts.vertical ?? rng.int(0, 2) === 0;
  const d = fromQData(rng, { vertical });
  const { h, k, r, w1, w2, Q: Qp } = d;
  const r2 = r * r;
  const eq = circleRed(h, k, r2);
  const ws = [w1, w2];
  const rows = ws.map((w) => lineRow(w[0], w[1], -(w[0] * h + w[1] * k + r2)));
  const vert = ws.findIndex((w) => w[1] === 0);
  const lineOf = (i) => (i === vert ? `x = ${Qp[0]}` : lineText(rows[i]));
  const slopes = ws.filter((w) => w[1] !== 0).map((w) => q(-w[0], w[1])).sort((a, b) => a.valueOf() - b.valueOf());
  const a = h - Qp[0];
  const b = Qp[1] - k;
  const lin = sumT([[a, 'm'], [b, '']]);
  const d2 = a * a + b * b;
  const final = `${lineOf(0)} ou ${lineOf(1)}`;
  const tangents = vert >= 0 ? { others: [lineOf(1 - vert)], vertical: `x = ${Qp[0]}` } : null;
  const dist = `|${lin}|/√(m^2+1) = ${r}`;
  const parts = [
    {
      html: null, start: 'ΩQ^2', judge: { kind: 'value', expect: String(d2) }, menu: TAN_MENU.pos,
      decisions: [tanMethod('from')],
      lines: [
        { math: `(${qt(Qp[0])}-${par(h)})^2+(${qt(Qp[1])}-${par(k)})^2`, note: 'Position de Q : ΩQ²', subgoal: 'pos' },
        { math: String(d2), note: `${d2} > ${r2} = r² : Q est extérieur`, subgoal: 'pos', blank: [String(d2)] },
      ],
    },
    {
      html: `Les droites non verticales par Q : ${Rd(diffT('y', Qp[1]))} = m(${Rd(diffT('x', Qp[0]))}). Elles sont tangentes si leur distance au centre vaut r = ${r}.`,
      ask: 'm :', start: dist, judge: { kind: 'solset', v: 'm' }, menu: TAN_MENU.m,
      notes: level === 2 ? [`La droite verticale x = ${fq(Qp[0])} est à la distance |${fq(Qp[0])} − ${parR(h)}| = ${Math.abs(a)} du centre : ${Math.abs(a) === r ? 'c\'est une tangente.' : 'ce n\'est pas une tangente.'}`] : [],
      decisions: [{
        levels: [1, 3, 4, 5], kind: 'decision', prompt: `La droite verticale x = ${fq(Qp[0])} est-elle tangente ? Sa distance au centre vaut |${fq(Qp[0])} − ${parR(h)}| = ${Math.abs(a)}.`,
        options: [
          { id: 'yes', label: `Oui : ${Math.abs(a)} = r`, valid: vert >= 0, ref: vert >= 0, why: `${Math.abs(a)} ≠ ${r} : elle n'est pas tangente.` },
          { id: 'no', label: `Non : ${Math.abs(a)} ≠ r`, valid: vert < 0, ref: vert < 0, rule: vert >= 0 ? 'g10_vertical_tangent_lost' : null, why: `${Math.abs(a)} = ${r} = r : la droite verticale est tangente, et l'écriture y − y_Q = m(x − x_Q) l'exclut.` },
        ],
      }],
      lines: [
        { math: `(${lin})^2 = ${r2}(m^2+1)`, note: 'Élever au carré', subgoal: 'dist', blank: [String(r2)] },
        { math: `${sumT([[a * a - r2, 'm^2'], [2 * a * b, 'm'], [b * b - r2, '']])} = 0`, note: 'Développer', subgoal: 'solve' },
        { math: slopes.map((s) => `m = ${mT(s)}`).join(' ou '), note: slopes.length === 1 ? 'Une seule pente : l\'autre tangente est verticale' : 'Deux pentes', subgoal: 'solve', blank: slopes.map((s) => mT(s)) },
      ],
    },
    {
      html: 'Les tangentes issues de Q.', ask: 'tangentes :', start: 'T',
      judge: { kind: 'geom', object: 'line2', count: 2, ref: final, ...(tangents ? { tangents } : {}) }, menu: TAN_MENU.both,
      lines: [{ math: final, note: 'y − y_Q = m(x − x_Q), mis sous forme cartésienne', subgoal: 'tan' }],
    },
  ];
  return partsG({
    skill: TAN, level, parts, subgoals: TAN_SUB, keys: [...KEYS, 'ineq'],
    prompt: `Trouve les tangentes au cercle γ : ${M(eq)} issues du point ${ptR('Q', Qp)}.`,
    hints: H('Une tangente est à la distance r du centre. Pense à la droite verticale x = x_Q.', `|${Rd(lin)}| = ${r}·√(□)`, Rd(final)),
    key: `${TAN}:q:${eq}:${vt(Qp)}`, fallback: d.fallback, exam: opts.exam ? examTag(opts, 5) : false,
  });
}

// Tangents with a given normal n (parallel to n·X = 0): |n·Ω + c| = r‖n‖.
function tanSlope(level, rng, opts = {}) {
  const n = rng.pick([[3, 4], [4, 3], [3, -4], [4, -3], [1, 0], [0, 1], [5, 12]]);
  const nn = Math.round(Math.hypot(...n));
  const r = rng.int(1, nn === 1 ? 6 : 4);
  let h; let k;
  do { h = rng.int(-5, 5); k = rng.int(-5, 5); } while (h === 0 && k === 0);
  const s = n[0] * h + n[1] * k;
  const cs = [-s - r * nn, -s + r * nn].sort((x, y) => x - y);
  const eq = circleRed(h, k, r * r);
  const lineC = (c) => lineText(lineRow(n[0], n[1], c));
  const final = `${lineC(cs[0])} ou ${lineC(cs[1])}`;
  const absT = `|${sumT([[1, 'c'], [s, '']])}|`;
  const parts = [
    {
      html: `Les droites parallèles : ${Rd(`${sumT([[n[0], 'x'], [n[1], 'y']])} + c = 0`)}. Leur distance au centre vaut r.`,
      start: nn === 1 ? `${absT} = ${r}` : `${absT}/${nn} = ${r}`, judge: { kind: 'solset', v: 'c' }, menu: TAN_MENU.m,
      lines: [
        ...(nn === 1 ? [] : [{ math: `${absT} = ${r * nn}`, note: `Multiplier par ‖n⃗‖ = ${nn}`, subgoal: 'dist' }]),
        { math: `c = ${cs[0]} ou c = ${cs[1]}`, note: 'Deux cas : ± dans la valeur absolue', subgoal: 'solve' },
      ],
    },
    {
      html: 'Les deux tangentes.', ask: 'tangentes :', start: 'T',
      judge: { kind: 'geom', object: 'line2', count: 2, ref: final },
      lines: [{ math: final, note: '', subgoal: 'tan' }],
    },
  ];
  return partsG({
    skill: TAN, level, parts, subgoals: TAN_SUB, keys: [...KEYS, 'ineq'],
    prompt: `Trouve les tangentes au cercle γ : ${M(eq)} parallèles à la droite ${M(`${sumT([[n[0], 'x'], [n[1], 'y']])} = 0`)}.`,
    hints: H('Une parallèle s\'écrit ax + by + c = 0 avec les mêmes a et b ; elle est tangente si sa distance au centre vaut r.', `${Rd(absT)} = □`, Rd(final)),
    key: `${TAN}:slope:${eq}:${vt(n)}`, exam: opts.exam ? examTag(opts, 5) : false,
  });
}

function tanItem(level, rng) {
  if (level === 1) return tanAt(level, rng);
  if (level === 2) return tanFromQ(level, rng);
  if (level === 3) return rng.chance(0.5) ? tanAt(level, rng) : tanFromQ(level, rng);
  if (level === 4) return pickW(rng, [tanAt, tanFromQ, tanFromQ, tanSlope])(level, rng);
  return rng.chance(0.5) ? tanSlope(level, rng) : tanFromQ(level, rng);
}

function tanExam(rng, exam) {
  if (exam === 'open') return tanFromQ(5, rng, { exam });
  if (exam === 'tf') {
    const h = rng.int(-4, 4);
    const k = rng.int(-4, 4);
    const r = rng.int(2, 5);
    const yq = k + rng.pick([-1, 1]) * (r + rng.int(1, 4));
    return tfG({
      skill: TAN, key: `vert:${h}:${k}:${r}`, truth: false, exam: examTag({ exam }), ruleIfTrue: 'g10_vertical_tangent_lost',
      statement: `Pour tout point Q extérieur au cercle γ : ${M(circleRed(h, k, r * r))}, on trouve deux pentes m telles que la droite y − y_Q = m(x − x_Q) soit tangente à γ.`,
      counter: geoCounter('verticalTangent', [['Q', 'Q =']], { Q: vt([h + r, yq]) }, { h, k, r }),
      explanation: `Faux : depuis Q${vr([h + r, yq])}, l'une des deux tangentes est la droite verticale x = ${fq(h + r)}, qui n'a pas de pente : on ne trouve qu'une valeur de m.`,
    });
  }
  const d = fromQData(rng, { vertical: true, slanted: true });
  const { h, k, w1, w2, Q: Qp } = d;
  const ws = [w1, w2];
  const vert = ws.findIndex((w) => w[1] === 0);
  const other = ws[1 - vert];
  const t1 = Rd(lineText(lineRow(other[0], other[1], -(other[0] * h + other[1] * k + 25))));
  const tv = `x = ${fq(Qp[0])}`;
  const T = [h + other[0], k + other[1]];
  const radial = Rd(lineText(lineRow(-other[1], other[0], other[1] * T[0] - other[0] * T[1])));
  return mcqD({
    skill: TAN, level: 4, key: `mcq:${h}:${k}:${vt(Qp)}`, exam: examTag({ exam }),
    prompt: `Quelles sont les tangentes au cercle ${M(circleRed(h, k, 25))} issues du point ${ptR('Q', Qp)} ?`,
    right: `${t1} et ${tv}`,
    wrongs: [
      { html: `${t1} seulement`, rule: 'g10_vertical_tangent_lost' },
      { html: `${radial} et ${tv}`, rule: 'g10_tangent_radius_direction' },
      { html: `${t1} et y = ${fq(Qp[1])}`, rule: null },
    ],
    solution: [{ html: `La droite x = ${fq(Qp[0])} est à la distance ${d.r} du centre : elle est tangente. L'autre tangente a une pente : ${t1}.`, note: '' }],
    fallback: d.fallback,
  }, rng);
}

// ======================================================================

export const GEN = {
  [CEQ]: (level, rng, profile, opts = {}) => (opts.exam ? ceqExam(rng, opts.exam) : ceqItem(level, rng)),
  [TAN]: (level, rng, profile, opts = {}) => (opts.exam ? tanExam(rng, opts.exam) : tanItem(level, rng)),
};

export { Q, sqT, linT1, conicPlot, coefItem, rootT, sumT, parR };

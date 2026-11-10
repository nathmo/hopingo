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
  q, qt, fq, nz, H, sumT, vt, vr, ptR, rootT, rootR, readable, MT, mcqD, tfG, examTag, geoCounter, pickW,
} from './geo-kit.js';
import {
  sqT, linT1, diffT, circleEq, circleRed, circleCompleted, par, parR, normVecs, lineRow, lineText, partsG, conicPlot,
} from './coniques-a-kit.js';
import { coefItem } from './alglin-kit.js';

const KEYS = ['calc', 'geo', 'pts'];
const Rd = (t) => readable(t).replace(/\(− /g, '(−').replace(/= − /g, '= −').replace(/^− /, '−');
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
// g10-power-radical
// ======================================================================

const POW = 'g10-power-radical';
const POW_SUB = [
  { id: 'norm', label: 'normaliser les équations', skill: POW },
  { id: 'sub', label: 'soustraire les équations', skill: POW },
  { id: 'cr', label: 'centres et rayons', skill: CEQ },
  { id: 'cmp', label: 'comparer Ω₁Ω₂² et r₁² + r₂²', skill: POW },
];
const lhs = (eq) => eq.replace(/\s*=\s*0$/, '');
const gcdA = (xs) => xs.reduce((g, x) => { let [a, b] = [Math.abs(g), Math.abs(x)]; while (b) [a, b] = [b, a % b]; return a; }, 0);

const POW_MENU = {
  sub: [
    { id: 'norm', label: 'Normaliser chaque équation (1 devant x²)', valid: true },
    { id: 'sub', label: 'Soustraire γ₁ − γ₂', valid: true },
    { id: 'raw', label: 'Soustraire les équations telles qu\'elles sont écrites', valid: false, rule: 'g10_radical_unnormalized', why: 'Si les coefficients de x² diffèrent, les carrés ne disparaissent pas : normalise d\'abord.' },
  ],
  pow: [
    { id: 'eval', label: 'Remplacer P dans l\'équation normalisée', valid: true },
    { id: 'dist', label: 'Calculer seulement ΩP', valid: false, why: 'La puissance est ΩP² − r² : c\'est la valeur de l\'équation normalisée en P.' },
  ],
  ortho: [
    { id: 'read', label: 'Lire le centre et le rayon', valid: true },
    { id: 'cmp', label: 'Comparer Ω₁Ω₂² et r₁² + r₂²', valid: true },
    { id: 'sum', label: 'Comparer Ω₁Ω₂ et r₁ + r₂', valid: false, rule: 'g10_orthogonal_sum', why: 'Ω₁Ω₂ = r₁ + r₂ veut dire tangents. Orthogonaux : Ω₁Ω₂² = r₁² + r₂² (Pythagore).' },
  ],
};

function twoCircles(rng) {
  for (;;) {
    const c1 = circleData(rng);
    const c2 = circleData(rng);
    if (c1.h === c2.h && c1.k === c2.k) continue;
    return [c1, c2];
  }
}

// The radical axis: lines (normalized subtraction, difference, cartesian).
function axisLines(c1, c2) {
  const e1 = lhs(circleEq(c1.h, c1.k, c1.r2));
  const e2 = lhs(circleEq(c2.h, c2.k, c2.r2));
  const F1 = c1.h * c1.h + c1.k * c1.k - c1.r2;
  const F2 = c2.h * c2.h + c2.k * c2.k - c2.r2;
  const diff = [2 * (c2.h - c1.h), 2 * (c2.k - c1.k), F1 - F2];
  const row = lineRow(...diff);
  const diffT = `${sumT([[diff[0], 'x'], [diff[1], 'y'], [diff[2], '']])} = 0`;
  const lines = [{ math: `(${e1}) - (${e2}) = 0`, note: 'γ₁ − γ₂ = 0 : les carrés disparaissent', subgoal: 'sub' }];
  if (gcdA(diff) === 1) lines.push({ math: diffT, note: 'Réduire', subgoal: 'sub', blank: diff[0] ? [qt(diff[0])] : [qt(diff[1])] });
  else {
    // Reduced, the common factor put in front (not yet the final form).
    const i = diff[0] ? 0 : 1;
    const f = diff[i] / row[i].valueOf();
    if (row.filter((x) => x.n !== 0).length > 1) lines.push({ math: `${f}(${lhs(lineText(row))}) = 0`, note: `Réduire : ${Rd(diffT)}`, subgoal: 'sub', blank: [String(f)] });
    lines.push({ math: lineText(row), note: `Réduire, puis diviser par ${fq(f)}`, subgoal: 'sub' });
  }
  return { lines, ref: lineText(row), row, e1, e2 };
}

function powAxis(level, rng, opts = {}) {
  const [c1, c2] = twoCircles(rng);
  const m = level === 1 ? 1 : level === 2 ? rng.pick([2, 3]) : rng.pick([1, 2, 3]);
  const g1 = circleEq(c1.h, c1.k, c1.r2);
  const g2 = circleEq(c2.h, c2.k, c2.r2, m);
  const ax = axisLines(c1, c2);
  const parts = [{
    start: 'Δ', judge: { kind: 'geom', object: 'line2', ref: ax.ref, ...(m !== 1 ? { radical: { g1: lhs(g1), g2: lhs(g2) } } : {}) }, menu: POW_MENU.sub,
    decisions: [{
      levels: [2, 3], kind: 'decision', prompt: 'Les deux équations sont-elles normalisées (1 devant x² et y²) ?', options: [
        { id: 'yes', label: 'Oui : on peut soustraire', valid: m === 1, ref: m === 1, rule: m === 1 ? null : 'g10_radical_unnormalized', why: `Non : γ₂ a ${m} devant x². Divise-la d'abord par ${m}, sinon les carrés ne disparaissent pas.` },
        { id: 'no', label: m === 1 ? 'Non' : `Non : diviser γ₂ par ${m}, puis soustraire`, valid: m !== 1, ref: m !== 1, why: 'Les deux ont déjà 1 devant x² et y².' },
      ],
    }],
    lines: ax.lines,
  }];
  return partsG({
    skill: POW, level, parts, subgoals: POW_SUB, keys: KEYS,
    prompt: `Trouve l'axe radical des cercles γ₁ : ${M(g1)} et γ₂ : ${M(g2)}.`,
    hints: H('Normalise les deux équations, puis soustrais-les : les carrés disparaissent, il reste une droite.', `(${Rd(ax.e1)}) − (□) = 0`, Rd(ax.ref)),
    key: `${POW}:axis:${g1}:${g2}`, exam: opts.exam ? examTag(opts, 4) : false,
  });
}

function powPoint(level, rng) {
  const c = circleData(rng);
  const P = [rng.int(-8, 8), rng.int(-8, 8)];
  const eq = circleEq(c.h, c.k, c.r2);
  const [D, E, F] = [-2 * c.h, -2 * c.k, c.h * c.h + c.k * c.k - c.r2];
  const val = P[0] * P[0] + P[1] * P[1] + D * P[0] + E * P[1] + F;
  const subst = `${par(P[0])}^2+${par(P[1])}^2+(${D})·${par(P[0])}+(${E})·${par(P[1])}+(${F})`;
  const pos = val < 0 ? 'in' : val === 0 ? 'on' : 'out';
  const parts = [{
    start: 'γ(P)', judge: { kind: 'value', expect: String(val) }, menu: POW_MENU.pow,
    decisions: [{
      levels: [2, 3, 4, 5], kind: 'decision', prompt: 'Que dit le signe de la puissance ?', options: [
        { id: 'sign', label: 'γ(P) = ΩP² − r² : négatif à l\'intérieur, nul sur le cercle, positif à l\'extérieur', valid: true, ref: true },
        { id: 'dist', label: 'γ(P) est la distance de P au cercle', valid: false, why: 'γ(P) = ΩP² − r², une différence de carrés, pas une distance.' },
      ],
    }],
    lines: [
      { math: subst, note: 'Remplacer x et y par les coordonnées de P', subgoal: 'cr' },
      { math: String(val), note: { in: 'Négatif : P est à l\'intérieur', on: 'Nul : P est sur le cercle', out: 'Positif : P est à l\'extérieur' }[pos], subgoal: 'cmp', blank: [String(val)] },
    ],
  }];
  return partsG({
    skill: POW, level, parts, subgoals: POW_SUB, keys: KEYS,
    prompt: `Calcule la puissance du point ${ptR('P', P)} par rapport au cercle γ : ${M(eq)}. P est-il à l'intérieur ou à l'extérieur ?`,
    hints: H('La puissance de P est la valeur de l\'équation normalisée en P : γ(P) = ΩP² − r².', `γ(P) = ${parR(P[0])}² + ${parR(P[1])}² + □`, String(val).replace('-', '−')),
    key: `${POW}:pt:${eq}:${vt(P)}`,
  });
}

const ORTHO = [[13, [[3, 2], [2, 3]]], [25, [[3, 4], [4, 3]]], [50, [[1, 7], [7, 1], [5, 5]]], [10, [[1, 3], [3, 1]]], [17, [[1, 4], [4, 1]]], [20, [[2, 4], [4, 2]]]];
function vecOfNorm2(rng, n2) {
  const out = [];
  for (let a = -8; a <= 8; a++) for (let b = -8; b <= 8; b++) if (a * a + b * b === n2) out.push([a, b]);
  return out.length ? rng.pick(out) : null;
}
function powOrtho(level, rng, opts = {}) {
  const kind = rng.pick(['ortho', 'ortho', 'tangent', 'no']);
  let h1; let k1; let r1; let r2; let v;
  for (;;) {
    h1 = rng.int(-4, 4); k1 = rng.int(-4, 4);
    if (kind === 'ortho') {
      const [n2, rs] = rng.pick(ORTHO);
      [r1, r2] = rng.pick(rs);
      v = vecOfNorm2(rng, n2);
    } else if (kind === 'tangent') {
      r1 = rng.int(1, 4); r2 = 5 - r1; v = rng.pick(normVecs(5));
    } else {
      r1 = rng.int(1, 5); r2 = rng.int(1, 5); v = [nz(rng, -6, 6), rng.int(-6, 6)];
      if (v[0] * v[0] + v[1] * v[1] === r1 * r1 + r2 * r2) continue;
    }
    if (v) break;
  }
  const [h2, k2] = [h1 + v[0], k1 + v[1]];
  const d2 = v[0] * v[0] + v[1] * v[1];
  const s = r1 * r1 + r2 * r2;
  const g1 = circleRed(h1, k1, r1 * r1);
  const g2 = circleEq(h2, k2, r2 * r2);
  const parts = [
    {
      html: 'Le centre de γ₂.', start: 'Ω_2', judge: { kind: 'vector', expect: vt([h2, k2]), circleEq: g2 }, menu: POW_MENU.ortho,
      lines: [{ math: `Ω_2 = ${vt([h2, k2])}`, note: 'Compléter les carrés', subgoal: 'cr', blank: [qt(h2), qt(k2)] }],
    },
    {
      html: 'Le carré de son rayon.', ask: 'r₂² =', start: 'r_2^2', judge: { kind: 'value', expect: String(r2 * r2) }, menu: POW_MENU.ortho,
      lines: [{ math: String(r2 * r2), note: `(x − ${fq(h2)})² + (y − ${fq(k2)})² = ${r2 * r2}`.replace(/− −/g, '+ '), subgoal: 'cr', blank: [String(r2 * r2)] }],
    },
    {
      html: `Avec Ω₁ = ${vr([h1, k1])} et r₁² = ${r1 * r1} : orthogonaux ?`, ask: 'Ω₁Ω₂² − (r₁² + r₂²) =', start: 'Ω_1Ω_2^2-(r_1^2+r_2^2)',
      judge: { kind: 'value', expect: String(d2 - s) }, menu: POW_MENU.ortho,
      decisions: [{
        levels: [2, 3, 4, 5], kind: 'decision', prompt: 'Deux cercles sont orthogonaux si…', options: [
          { id: 'pyth', label: 'Ω₁Ω₂² = r₁² + r₂² (les rayons aux points communs sont perpendiculaires)', valid: true, ref: true },
          { id: 'sum', label: 'Ω₁Ω₂ = r₁ + r₂', valid: false, rule: 'g10_orthogonal_sum', why: 'Ω₁Ω₂ = r₁ + r₂ veut dire tangents extérieurement.' },
        ],
      }],
      lines: [
        { math: `(${qt(h2)}-${par(h1)})^2+(${qt(k2)}-${par(k1)})^2-(${r1 * r1}+${r2 * r2})`, note: 'Ω₁Ω₂² − (r₁² + r₂²)', subgoal: 'cmp' },
        { math: String(d2 - s), note: d2 === s ? 'Nul : les cercles sont orthogonaux' : 'Non nul : les cercles ne sont pas orthogonaux', subgoal: 'cmp', blank: [String(d2 - s)] },
      ],
    },
  ];
  return partsG({
    skill: POW, level, parts, subgoals: POW_SUB, keys: KEYS,
    prompt: `Les cercles γ₁ : ${M(g1)} et γ₂ : ${M(g2)} sont-ils orthogonaux ?`,
    hints: H('Deux cercles sont orthogonaux si Ω₁Ω₂² = r₁² + r₂².', `Ω₁Ω₂² = (${fq(h2)} − ${parR(h1)})² + (□)²`, `Ω₁Ω₂² = ${d2}, r₁² + r₂² = ${s} : ${d2 === s ? 'orthogonaux' : 'pas orthogonaux'}`),
    key: `${POW}:ortho:${g1}:${g2}`, exam: opts.exam ? examTag(opts, 4) : false,
  });
}

// A circle orthogonal to γ₁ and γ₂, centred on the line d: Ω is on the
// radical axis of γ₁, γ₂ (γ₁(Ω) = γ₂(Ω) = r²).
function powBuild(level, rng, opts = {}) {
  for (let t = 0; t < 400; t++) {
    const O = [rng.int(-3, 3), rng.int(-3, 3)];
    const r = rng.int(1, 4);
    const pick = () => {
      for (let u = 0; u < 60; u++) {
        const v = [rng.int(-7, 7), rng.int(-7, 7)];
        const ri2 = v[0] * v[0] + v[1] * v[1] - r * r;
        const ri = Math.round(Math.sqrt(Math.max(ri2, 0)));
        if (ri >= 1 && ri * ri === ri2) return { v, ri };
      }
      return null;
    };
    const a = pick();
    const b = pick();
    if (!a || !b || a.v[0] * b.v[1] - a.v[1] * b.v[0] === 0) continue;
    const c1 = { h: O[0] + a.v[0], k: O[1] + a.v[1], r2: a.ri * a.ri };
    const c2 = { h: O[0] + b.v[0], k: O[1] + b.v[1], r2: b.ri * b.ri };
    if ([c1, c2].some((c) => Math.abs(c.h) > 8 || Math.abs(c.k) > 8)) continue;
    const ax = axisLines(c1, c2);
    // d through O, not parallel to the axis.
    const dir = rng.pick([[1, 0], [0, 1], [1, 1], [1, -1], [1, 2], [2, 1]]);
    if (ax.row[0].valueOf() * dir[0] + ax.row[1].valueOf() * dir[1] === 0) continue;
    const drow = lineRow(-dir[1], dir[0], dir[1] * O[0] - dir[0] * O[1]);
    const g1 = circleEq(c1.h, c1.k, c1.r2);
    const g2 = circleEq(c2.h, c2.k, c2.r2);
    const [D, E, F] = [-2 * c1.h, -2 * c1.k, c1.h * c1.h + c1.k * c1.k - c1.r2];
    const parts = [
      { html: 'Le centre Ω a la même puissance par rapport aux deux cercles (r²) : il est sur leur axe radical.', start: 'Δ', judge: { kind: 'geom', object: 'line2', ref: ax.ref }, lines: ax.lines },
      { html: `Ω est aussi sur d : ${Rd(lineText(drow))}.`, ask: 'Ω =', start: 'Ω', judge: { kind: 'vector', expect: vt(O) }, lines: [{ math: `Ω = ${vt(O)}`, note: 'Intersection de l\'axe radical et de d', subgoal: 'cmp' }] },
      {
        html: 'r² est la puissance de Ω par rapport à γ₁.', ask: 'r² =', start: 'r^2', judge: { kind: 'value', expect: String(r * r) },
        lines: [{ math: `${par(O[0])}^2+${par(O[1])}^2+(${D})·${par(O[0])}+(${E})·${par(O[1])}+(${F})`, note: 'γ₁(Ω)', subgoal: 'cmp' }, { math: String(r * r), note: '', subgoal: 'cmp' }],
      },
      { html: 'Le cercle cherché.', ask: 'γ :', start: 'γ', judge: { kind: 'geom', object: 'circle', ref: circleEq(O[0], O[1], r * r) }, lines: [{ math: circleRed(O[0], O[1], r * r), note: '', subgoal: 'cr' }] },
    ];
    return partsG({
      skill: POW, level, parts, subgoals: POW_SUB, keys: KEYS,
      prompt: `Trouve le cercle γ orthogonal aux cercles γ₁ : ${M(g1)} et γ₂ : ${M(g2)}, dont le centre est sur la droite d : ${M(lineText(drow))}.`,
      hints: H('γ est orthogonal à γᵢ si la puissance de son centre Ω par rapport à γᵢ vaut r².', 'Ω est sur l\'axe radical de γ₁ et γ₂ et sur d.', Rd(circleRed(O[0], O[1], r * r))),
      key: `${POW}:build:${g1}:${g2}:${lineText(drow)}`, exam: opts.exam ? examTag(opts, 5) : false,
    });
  }
  return powAxis(level, rng, opts);
}

function powItem(level, rng) {
  if (level <= 2) return powAxis(level, rng);
  if (level === 3) return rng.chance(0.5) ? powAxis(level, rng) : powOrtho(level, rng);
  if (level === 4) return pickW(rng, [powAxis, powPoint, powOrtho])(level, rng);
  return powBuild(level, rng);
}

function powExam(rng, exam) {
  if (exam === 'open') return powBuild(5, rng, { exam });
  if (exam === 'tf') {
    if (rng.chance(0.3)) {
      return tfG({
        skill: POW, key: 'perp', truth: true, exam: examTag({ exam }),
        statement: 'L\'axe radical de deux cercles de centres distincts est perpendiculaire à la droite des centres.',
        explanation: 'Vrai : γ₁ − γ₂ = 2(h₂ − h₁)x + 2(k₂ − k₁)y + … : son vecteur normal est Ω₁Ω₂⃗.',
      });
    }
    const h = rng.int(-3, 3);
    const k = rng.int(-3, 3);
    return tfG({
      skill: POW, key: `chord:${h}:${k}`, truth: false, exam: examTag({ exam }),
      statement: 'L\'axe radical de deux cercles de centres distincts est toujours la droite qui passe par leurs deux points communs.',
      counter: geoCounter('disjointCircles', [['O1', 'Ω₁ ='], ['r1', 'r₁ ='], ['O2', 'Ω₂ ='], ['r2', 'r₂ =']], { O1: vt([h, k]), r1: '1', O2: vt([h + 5, k]), r2: '2' }),
      explanation: `Faux : deux cercles disjoints, comme ceux de centres ${vr([h, k])} et ${vr([h + 5, k])} et de rayons 1 et 2, ont un axe radical, mais pas de point commun.`,
    });
  }
  const [c1, c2] = twoCircles(rng);
  const m = rng.pick([2, 3]);
  const g1 = circleEq(c1.h, c1.k, c1.r2);
  const g2 = circleEq(c2.h, c2.k, c2.r2, m);
  const ax = axisLines(c1, c2);
  const raw = `${lhs(g1)} - (${lhs(g2)}) = 0`;
  const rawEq = (() => {
    const t = [[1 - m, 'x^2'], [1 - m, 'y^2']];
    const a1 = [-2 * c1.h, -2 * c1.k, c1.h * c1.h + c1.k * c1.k - c1.r2];
    const a2 = [-2 * c2.h * m, -2 * c2.k * m, (c2.h * c2.h + c2.k * c2.k - c2.r2) * m];
    return `${sumT([...t, [a1[0] - a2[0], 'x'], [a1[1] - a2[1], 'y'], [a1[2] - a2[2], '']])} = 0`;
  })();
  const centres = lineText(lineRow(c2.k - c1.k, c1.h - c2.h, c1.k * (c2.h - c1.h) - c1.h * (c2.k - c1.k)));
  return mcqD({
    skill: POW, level: 4, key: `mcq:${g1}:${g2}`, exam: examTag({ exam }),
    prompt: `Quel est l'axe radical des cercles γ₁ : ${M(g1)} et γ₂ : ${M(g2)} ?`,
    right: M(ax.ref),
    wrongs: [{ html: M(rawEq), rule: 'g10_radical_unnormalized' }, { html: M(centres), rule: null }],
    fillers: [{ html: M(lineText(lineRow(ax.row[1], ax.row[0].neg(), ax.row[2]))) }, { html: M(lineText(lineRow(ax.row[0], ax.row[1], ax.row[2].add(1)))) }],
    solution: [{ html: `On divise γ₂ par ${m}, puis on soustrait : ${M(ax.ref)}. (Sans diviser : ${M(raw)} garde des x².)`, note: '' }],
  }, rng);
}

// ======================================================================
// g10-pole-polar
// ======================================================================

const POL = 'g10-pole-polar';
const POL_SUB = [
  { id: 'dbl', label: 'dédoubler l\'équation', skill: POL },
  { id: 'inter', label: 'intersecter avec le cercle', skill: 'quad-formula' },
  { id: 'tan', label: 'tangentes par les points de contact', skill: TAN },
];
// ΩP⃗ = d, w with w·d = ‖w‖² = r², w' = 2(r²/‖d‖²)d − w whole: the two
// points of contact Ω + w, Ω + w' of the tangents from P.
const POLAR_TABLE = [];
for (let p = -5; p <= 5; p++) {
  for (let s = -5; s <= 5; s++) {
    const d2 = p * p + s * s;
    if (!d2) continue;
    for (let a = -5; a <= 5; a++) {
      for (let b = -5; b <= 5; b++) {
        const r2 = a * a + b * b;
        if (!r2 || r2 > 26 || r2 >= d2 || a * p + b * s !== r2) continue;
        const w2 = [(2 * r2 * p) / d2 - a, (2 * r2 * s) / d2 - b];
        if (!w2.every(Number.isInteger) || (w2[0] === a && w2[1] === b)) continue;
        POLAR_TABLE.push({ d: [p, s], w: [a, b], w2, r2 });
      }
    }
  }
}
const POL_MENU = {
  dbl: [
    { id: 'dbl', label: 'Dédoubler : (x₀ − h)(x − h) + (y₀ − k)(y − k) = r²', valid: true },
    { id: 'origin', label: 'x₀x + y₀y = r²', valid: false, rule: 'g10_polar_origin_formula', why: 'Cette formule ne vaut que pour un cercle centré à l\'origine.' },
  ],
  pole: [
    { id: 'id', label: 'Identifier : P − Ω est proportionnel au vecteur normal de la droite', valid: true },
    { id: 'normal', label: 'Prendre P = vecteur normal de la droite', valid: false, why: 'P − Ω est proportionnel à (a ; b), et le coefficient se lit sur la constante.' },
  ],
  inter: [
    { id: 'sub', label: 'Remplacer y (ou x) de la polaire dans l\'équation du cercle', valid: true },
    { id: 'solve', label: 'Résoudre l\'équation du 2e degré', valid: true },
  ],
  pt: [{ id: 'pt', label: 'Calculer l\'autre coordonnée sur la polaire', valid: true }, { id: 'circle', label: 'Prendre le centre', valid: false, why: 'Les points de contact sont sur le cercle et sur la polaire.' }],
  tan: [{ id: 'pt', label: 'Les droites (PT₁) et (PT₂)', valid: true }, { id: 'polar', label: 'La polaire elle-même', valid: false, why: 'La polaire passe par les points de contact : ce n\'est pas une tangente.' }],
};

function polarData(rng) {
  const t = rng.pick(POLAR_TABLE);
  let h; let k;
  do { h = rng.int(-4, 4); k = rng.int(-4, 4); } while (h === 0 && k === 0);
  const P = [h + t.d[0], k + t.d[1]];
  const row = lineRow(t.d[0], t.d[1], -(t.d[0] * h + t.d[1] * k + t.r2));
  const T = [[h + t.w[0], k + t.w[1]], [h + t.w2[0], k + t.w2[1]]].sort((A, B) => A[0] - B[0] || A[1] - B[1]);
  return { h, k, r2: t.r2, d: t.d, P, row, T };
}

// The halved equation as text, the coefficient of y left blank (hints).
const dblHint = (d) => Rd([d.d[0] ? `${par(d.d[0])}(${diffT('x', d.h)})` : null, d.d[1] ? `(□)(${diffT('y', d.k)})` : null].filter(Boolean).join(' + ') + ` = ${d.r2}`);

function polarPart(d, extra = {}) {
  const terms = [];
  if (d.d[0]) terms.push(`${par(d.d[0])}(${dT('x', d.h)})`);
  if (d.d[1]) terms.push(`${par(d.d[1])}(${dT('y', d.k)})`);
  return {
    start: 'p', judge: { kind: 'geom', object: 'line2', ref: lineText(d.row), polar: { P: d.P, r2: d.r2 } }, menu: POL_MENU.dbl,
    lines: [
      { math: `${terms.join(' + ')} = ${d.r2}`, note: `Dédoubler : x₀ − h = ${fq(d.d[0])}, y₀ − k = ${fq(d.d[1])}`, subgoal: 'dbl', blank: d.d.filter((x) => x).map((x) => qt(x)) },
      { math: lineText(d.row), note: 'Développer', subgoal: 'dbl' },
    ],
    ...extra,
  };
}

function polPolar(level, rng, opts = {}) {
  const d = polarData(rng);
  const eq = circleRed(d.h, d.k, d.r2);
  const parts = [polarPart(d, {
    decisions: [{
      levels: [2], kind: 'decision', prompt: 'On cherche…', options: [
        { id: 'polar', label: 'la polaire d\'un point : dédoubler', valid: true, ref: true },
        { id: 'pole', label: 'le pôle d\'une droite : identifier', valid: false, why: 'Le point P est donné : on cherche sa polaire.' },
      ],
    }],
  })];
  return partsG({
    skill: POL, level, parts, subgoals: POL_SUB, keys: KEYS,
    prompt: `Écris l'équation de la polaire du point ${ptR('P', d.P)} par rapport au cercle γ : ${M(eq)}.`,
    hints: H('Remplace un des deux x par x₀ et un des deux y par y₀ dans la forme réduite.', dblHint(d), Rd(lineText(d.row))),
    key: `${POL}:polar:${eq}:${vt(d.P)}`, exam: opts.exam ? examTag(opts, 3) : false,
  });
}

function polPole(level, rng) {
  const d = polarData(rng);
  const eq = circleRed(d.h, d.k, d.r2);
  const lam = q(d.d[0] || d.d[1], d.d[0] ? d.row[0].valueOf() : d.row[1].valueOf());
  const parts = [{
    start: 'P', judge: { kind: 'vector', expect: vt(d.P) }, menu: POL_MENU.pole,
    decisions: [{
      levels: [2], kind: 'decision', prompt: 'On cherche…', options: [
        { id: 'pole', label: 'le pôle d\'une droite : identifier', valid: true, ref: true },
        { id: 'polar', label: 'la polaire d\'un point : dédoubler', valid: false, why: 'La droite est donnée : on cherche son pôle P.' },
      ],
    }],
    lines: [
      { math: `P = ${vt([d.h, d.k])} + ${par(lam)}·${vt([d.row[0], d.row[1]])}`, note: `La polaire de P est (x₀ − h)(x − h) + (y₀ − k)(y − k) = r² : P − Ω est proportionnel à ${vr([d.row[0], d.row[1]])}, et la constante donne le coefficient`, subgoal: 'dbl', blank: [par(lam)] },
      { math: `P = ${vt(d.P)}`, note: '', subgoal: 'dbl' },
    ],
  }];
  return partsG({
    skill: POL, level, parts, subgoals: POL_SUB, keys: KEYS,
    prompt: `Trouve le pôle P de la droite ${M(lineText(d.row))} par rapport au cercle γ : ${M(eq)}.`,
    hints: H('Écris la polaire d\'un point P(x₀ ; y₀) quelconque et identifie ses coefficients avec ceux de la droite.', `P = ${vr([d.h, d.k])} + □·${vr([d.row[0], d.row[1]])}`, `P = ${vr(d.P)}`),
    key: `${POL}:pole:${eq}:${lineText(d.row)}`,
  });
}

// The polar, its intersection with the circle, the points of contact, the tangents.
function polTangents(level, rng, opts = {}) {
  const d = polarData(rng);
  const { h, k, r2, row, T, P } = d;
  const eq = circleRed(h, k, r2);
  const [a, b, c] = row.map((x) => x.valueOf());
  // Solve in x (y read on the polar), or in y when the polar is vertical.
  const v = b !== 0 ? 'x' : 'y';
  let [A1, B1, C1] = v === 'x' ? [a, b, c + k * b] : [b, a, c + h * a];
  if (B1 < 0) [A1, B1, C1] = [-A1, -B1, -C1];
  const [u0] = v === 'x' ? [h] : [k];
  // (v − u0)² + ((−A1·v − C1)/B1)² = r2, times B1²: whole coefficients.
  const qa = B1 * B1 + A1 * A1;
  const qb = -2 * u0 * B1 * B1 + 2 * A1 * C1;
  const qc = u0 * u0 * B1 * B1 + C1 * C1 - r2 * B1 * B1;
  const g = gcdA([qa, qb, qc]);
  const other = v === 'x' ? 'y' : 'x';
  const inner = sumT([[-A1, v], [-C1, '']]);
  const start = `${sqT(v, u0)} + (${B1 === 1 ? inner : B1 === -1 ? `-(${inner})` : `(${inner})/${B1}`})^2 = ${r2}`;
  const roots = [...new Set(T.map((X) => (v === 'x' ? X[0] : X[1])))].sort((x, y) => x - y);
  const Ts = T.slice().sort((A, B) => (v === 'x' ? A[0] - B[0] : A[1] - B[1]));
  const tanRow = (X) => lineRow(X[0] - h, X[1] - k, -((X[0] - h) * h + (X[1] - k) * k + r2));
  const final = `${lineText(tanRow(Ts[0]))} ou ${lineText(tanRow(Ts[1]))}`;
  const parts = [
    polarPart(d, { html: 'La polaire de P passe par les deux points de contact.' }),
    {
      html: `On remplace ${other} de la polaire dans l'équation du cercle.`, ask: `${v} :`, start, judge: { kind: 'solset', v }, menu: POL_MENU.inter,
      lines: [
        { math: `${sumT([[qa / g, `${v}^2`], [qb / g, v], [qc / g, '']])} = 0`, note: 'Développer', subgoal: 'inter' },
        { math: roots.map((x) => `${v} = ${x}`).join(' ou '), note: 'Résoudre', subgoal: 'inter', blank: roots.map(String) },
      ],
    },
    { html: `Le premier point de contact (${v} = ${fq(roots[0])}).`, ask: 'T₁ =', start: 'T_1', judge: { kind: 'vector', expect: vt(Ts[0]) }, menu: POL_MENU.pt, lines: [{ math: `T_1 = ${vt(Ts[0])}`, note: `${other} se lit sur la polaire`, subgoal: 'inter' }] },
    { html: 'Le second.', ask: 'T₂ =', start: 'T_2', judge: { kind: 'vector', expect: vt(Ts[1]) }, menu: POL_MENU.pt, lines: [{ math: `T_2 = ${vt(Ts[1])}`, note: '', subgoal: 'inter' }] },
    {
      html: 'Les tangentes issues de P sont les droites (PT₁) et (PT₂).', ask: 'tangentes :', start: 't',
      judge: { kind: 'geom', object: 'line2', count: 2, ref: final }, menu: POL_MENU.tan,
      lines: [{ math: final, note: 'En Tᵢ : (x_T − h)(x − h) + (y_T − k)(y − k) = r²', subgoal: 'tan' }],
    },
  ];
  return partsG({
    skill: POL, level, parts, subgoals: POL_SUB, keys: KEYS,
    prompt: `Par la polaire, trouve les points de contact et les tangentes au cercle γ : ${M(eq)} issues du point ${ptR('P', P)}.`,
    hints: H('La polaire de P coupe le cercle aux points de contact des tangentes issues de P.', `Polaire : ${dblHint(d)}`, Rd(final)),
    key: `${POL}:tan:${eq}:${vt(P)}`, exam: opts.exam ? examTag(opts, 5) : false,
  });
}

function polItem(level, rng) {
  if (level === 1) return polPolar(level, rng);
  if (level === 2) return rng.chance(0.5) ? polPolar(level, rng) : polPole(level, rng);
  if (level === 3) return rng.chance(0.5) ? polPolar(level, rng) : polTangents(level, rng);
  if (level === 4) return pickW(rng, [polPolar, polPole, polTangents])(level, rng);
  return polTangents(level, rng);
}

function polExam(rng, exam) {
  if (exam === 'open') return polTangents(5, rng, { exam });
  if (exam === 'tf') {
    const h = rng.int(-3, 3);
    const k = rng.int(-3, 3);
    const r = rng.int(2, 4);
    return tfG({
      skill: POL, key: `interior:${h}:${k}:${r}`, truth: false, exam: examTag({ exam }),
      statement: `La polaire de tout point P ≠ Ω par rapport au cercle γ : ${M(circleRed(h, k, r * r))} coupe ce cercle.`,
      counter: geoCounter('interiorPolar', [['P', 'P =']], { P: vt([h + 1, k]) }, { h, k, r }),
      explanation: `Faux : pour P = ${vr([h + 1, k])}, à l'intérieur, la polaire est ${M(lineText(lineRow(1, 0, -(h + r * r))))}, à la distance ${r * r} > ${r} du centre : elle ne coupe pas γ.`,
    });
  }
  const d = polarData(rng);
  const eq = circleRed(d.h, d.k, d.r2);
  const origin = lineText(lineRow(d.P[0], d.P[1], -d.r2));
  const radial = lineText(lineRow(-d.d[1], d.d[0], d.d[1] * d.h - d.d[0] * d.k));
  return mcqD({
    skill: POL, level: 4, key: `mcq:${eq}:${vt(d.P)}`, exam: examTag({ exam }),
    prompt: `Quelle est la polaire du point ${ptR('P', d.P)} par rapport au cercle ${M(eq)} ?`,
    right: M(lineText(d.row)),
    wrongs: [{ html: M(origin), rule: 'g10_polar_origin_formula' }, { html: M(radial), rule: null }],
    fillers: [{ html: M(lineText(lineRow(d.row[0], d.row[1], d.row[2].add(1)))) }, { html: M(lineText(lineRow(d.row[0], d.row[1], d.row[2].neg()))) }],
    solution: [{ html: `On dédouble : ${Rd(`${par(d.d[0])}(${diffT('x', d.h)}) + ${par(d.d[1])}(${diffT('y', d.k)}) = ${d.r2}`)}, soit ${M(lineText(d.row))}.`, note: '' }],
  }, rng);
}

// ======================================================================
// The conics in reduced form: tools
// ======================================================================

const gcdN = (xs) => xs.reduce((g, x) => { let [a, b] = [Math.abs(g), Math.abs(x)]; while (b) [a, b] = [b, a % b]; return a; }, 0) || 1;
// α(x − h)² + β(y − k)² + γ = 0, expanded, divided by the gcd, first coefficient > 0.
function axisConic(alpha, beta, h, k, gamma) {
  let c = [alpha, 0, beta, -2 * alpha * h, -2 * beta * k, alpha * h * h + beta * k * k + gamma];
  const g = gcdN(c);
  c = c.map((x) => x / g);
  if (c.find((x) => x !== 0) < 0) c = c.map((x) => -x);
  return c;
}
const eqOf = (c) => `${sumT([[c[0], 'x^2'], [c[1], 'xy'], [c[2], 'y^2'], [c[3], 'x'], [c[4], 'y'], [c[5], '']])} = 0`;
// The squares completed, constants not gathered: 4(x−2)² − 16 + 9(y+3)² − 81 + 61 = 0.
function completedOf(c, h, k) {
  const terms = [];
  if (c[0]) terms.push([c[0], sqT('x', h)], [-c[0] * h * h, '']);
  else if (c[3]) terms.push([c[3], 'x']);
  if (c[2]) terms.push([c[2], sqT('y', k)], [-c[2] * k * k, '']);
  else if (c[4]) terms.push([c[4], 'y']);
  terms.push([c[5], '']);
  return `${sumT(terms.filter(([x]) => x !== 0))} = 0`;
}
// h ± √x2 as text (x2 ≥ 0 rational): 5, 2 + √5, −√5, 2 − 9√5/5.
function plusRoot(h, x2, sign) {
  const r = rootT(x2);
  if (!/√/.test(r)) { const [n, d] = r.split('/').map(Number); return qt(q(h).add(new Q(n, d || 1).mul(sign))); }
  if (q(h).n === 0) return sign > 0 ? r : `-${r}`;
  return `${qt(h)} ${sign > 0 ? '+' : '-'} ${r}`;
}
const pt2 = (P) => `(${P[0]} ; ${P[1]})`;
const viewAround = (h, k, span) => ({ x: [Math.floor(h - span), Math.ceil(h + span)], y: [Math.floor(k - span), Math.ceil(k + span)] });
const conicPart = (o) => ({ ...o, judge: { kind: 'conic', equation: o.eq, ...(o.els ? { ask: o.els } : { target: 'standard' }) } });

const AXIS_DEC = (vertical, what) => ({
  levels: [2], kind: 'decision', prompt: `${what} est…`, options: [
    { id: 'h', label: 'horizontal', valid: !vertical, ref: !vertical, rule: vertical ? 'g10_axis_swap' : null, why: `Non : regarde de quel côté est ${what === 'Le grand axe' ? 'le plus grand dénominateur' : 'le terme positif'}.` },
    { id: 'v', label: 'vertical', valid: vertical, ref: vertical, rule: vertical ? null : 'g10_axis_swap', why: `Non : regarde de quel côté est ${what === 'Le grand axe' ? 'le plus grand dénominateur' : 'le terme positif'}.` },
  ],
});
const STD_MENU = [
  { id: 'sq', label: 'Compléter les carrés', valid: true },
  { id: 'div', label: 'Diviser par le second membre', valid: true },
  { id: 'read', label: 'Lire les éléments sur l\'équation développée', valid: false, why: 'Les éléments se lisent sur la forme réduite : complète d\'abord les carrés.' },
];

// ======================================================================
// g10-ellipse
// ======================================================================

const ELL = 'g10-ellipse';
const ELL_SUB = [
  { id: 'sq', label: 'compléter les carrés', skill: 'quad-complete' },
  { id: 'el', label: 'lire les éléments', skill: ELL },
];

function ellData(rng) {
  const pyth = rng.int(0, 2) > 0;
  const [A, B] = pyth ? rng.pick([[5, 4], [5, 3]]) : rng.pick([[3, 2], [4, 2], [3, 1], [2, 1], [4, 3], [4, 1]]);
  const vertical = rng.chance(0.5);
  let h; let k;
  do { h = rng.int(-5, 5); k = rng.int(-5, 5); } while (h === 0 && k === 0);
  const [ax, ay] = vertical ? [B, A] : [A, B];
  const c = axisConic(ay * ay, ax * ax, h, k, -ax * ax * ay * ay);
  const c2 = A * A - B * B;
  const foc = (s) => (vertical ? [qt(h), plusRoot(k, c2, s)] : [plusRoot(h, c2, s), qt(k)]);
  const dirV = q(A ** 4, c2);
  const dirT = (s) => `${vertical ? 'y' : 'x'} = ${plusRoot(vertical ? k : h, dirV, s)}`;
  return {
    A, B, vertical, h, k, ax, ay, coefs: c, eq: eqOf(c), c2,
    std: `${sqT('x', h)}/${ax * ax} + ${sqT('y', k)}/${ay * ay} = 1`,
    cT: rootT(c2), eT: rootT(q(c2, A * A)), F: [foc(1), foc(-1)], dirs: [dirT(1), dirT(-1)],
  };
}

const ELL_MENU = {
  el: [
    { id: 'read', label: 'Lire Ω, a et b : a sous le plus grand dénominateur', valid: true },
    { id: 'small', label: 'a sous le premier dénominateur écrit', valid: false, rule: 'g10_axis_swap', why: 'Le grand axe est du côté du plus grand dénominateur, pas du premier écrit.' },
  ],
  foc: [
    { id: 'minus', label: 'c² = a² − b², foyers sur le grand axe', valid: true },
    { id: 'plus', label: 'c² = a² + b²', valid: false, rule: 'g10_c_wrong_formula', why: 'Pour une ellipse, les foyers sont à l\'intérieur : c < a, donc c² = a² − b².' },
  ],
  dir: [
    { id: 'e', label: 'e = c/a, directrices à a²/c du centre', valid: true },
    { id: 'inv', label: 'e = a/c', valid: false, why: 'Pour une ellipse, e = c/a < 1.' },
  ],
};

function ellParts(d, level, kind) {
  const eq = d.eq;
  const parts = [];
  if (level > 1) {
    parts.push(conicPart({
      start: eq, eq, menu: STD_MENU,
      lines: [
        { math: completedOf(d.coefs, d.h, d.k), note: 'Compléter les carrés', subgoal: 'sq', blank: [{ after: sqT('x', d.h), text: qt(d.coefs[0] * d.h * d.h) }, { after: sqT('y', d.k), text: qt(d.coefs[2] * d.k * d.k) }].filter((b) => b.text !== '0') },
        { math: d.std, note: 'Diviser par le second membre', subgoal: 'sq', blank: [String(d.ax * d.ax), String(d.ay * d.ay)] },
      ],
    }));
  }
  const first = (o) => (parts.length ? o : { ...o, start: d.std, html: null });
  parts.push(conicPart(first({
    html: 'Le centre et les demi-axes.', ask: 'Ω, a, b :', start: 'E', eq, els: ['Ω', 'a', 'b'], menu: ELL_MENU.el,
    decisions: [AXIS_DEC(d.vertical, 'Le grand axe')],
    lines: [{ math: `Ω = ${pt2([d.h, d.k])} ; a = ${d.A} ; b = ${d.B}`, note: `Grand axe ${d.vertical ? 'vertical' : 'horizontal'} : a² = ${d.A * d.A} sous ${d.vertical ? 'y' : 'x'}`, subgoal: 'el', blank: [String(d.A), String(d.B)] }],
  })));
  parts.push(conicPart({
    html: 'Les foyers.', ask: 'c, F, F′ :', start: 'E', eq, els: kind === 'foci' ? ['c', 'F', 'e'] : ['c', 'F'], menu: ELL_MENU.foc,
    lines: [
      { math: `c = ${d.cT}`, note: `c² = a² − b² = ${d.c2}`, subgoal: 'el', blank: [d.cT] },
      { math: `F = ${pt2(d.F[0])} ; F' = ${pt2(d.F[1])}`, note: `Sur le grand axe, à c du centre`, subgoal: 'el' },
      ...(kind === 'foci' ? [{ math: `e = ${d.eT}`, note: 'e = c/a', subgoal: 'el' }] : []),
    ],
  }));
  if (kind === 'all') {
    parts.push(conicPart({
      html: 'L\'excentricité et les directrices.', ask: 'e, directrices :', start: 'E', eq, els: ['e', 'directrices'], menu: ELL_MENU.dir,
      lines: [
        { math: `e = ${d.eT}`, note: 'e = c/a', subgoal: 'el', blank: [d.eT] },
        { math: `directrices : ${d.dirs[0]} ou ${d.dirs[1]}`, note: `À a²/c = ${rootR(q(d.A ** 4, d.c2))} du centre, perpendiculaires au grand axe`, subgoal: 'el' },
      ],
    }));
  }
  return parts;
}

function ellItem(level, rng, opts = {}) {
  const d = ellData(rng);
  if (level === 4 && !opts.exam && !opts.lines && rng.int(0, 3) === 0) return ellPlot(level, rng, d);
  const kind = level === 5 || opts.exam || level <= 2 ? 'all' : rng.pick(['all', 'foci']);
  return partsG({
    skill: ELL, level, parts: ellParts(d, level, kind), subgoals: ELL_SUB, keys: KEYS,
    prompt: level === 1
      ? `L'ellipse E a pour forme réduite ${M(d.std)}. Donne son centre, a et b, ses foyers${kind === 'all' ? ', son excentricité et ses directrices' : ''}.`
      : `Pour l'ellipse E : ${M(d.eq)}, trouve la forme réduite, le centre, a et b, les foyers${kind === 'all' ? ', l\'excentricité et les directrices' : ' et l\'excentricité'}.`,
    hints: H(`Mets ${d.coefs[0]} en facteur dans les x, ${d.coefs[2]} dans les y, complète, puis divise par le second membre.`, `c² = a² − b² = □`, `F = ${Rd(pt2(d.F[0]))} et F′ = ${Rd(pt2(d.F[1]))}`),
    key: `${ELL}:${kind}:${d.eq}`, exam: opts.exam ? examTag(opts, 5) : false,
  });
}

// Gabarit 3: the sketch (plot): Ω, the vertices of the major axis, the foci.
function ellPlot(level, rng, d = ellData(rng)) {
  const span = d.A + 1.5;
  return conicPlot({
    skill: ELL, level, equation: d.eq, view: viewAround(d.h, d.k, span), key: d.eq,
    prompt: `Esquisse l'ellipse E : ${M(d.std)}. Place son centre Ω, les sommets du grand axe et les foyers.`,
    place: [{ id: 'center', label: 'Ω', short: 'Ω', kind: 'point' }, { id: 'vertices', label: 'Sommets', short: 'S', kind: 'point' }, { id: 'foci', label: 'Foyers', short: 'F', kind: 'point' }],
    hints: H('Le centre se lit sur la forme réduite ; les sommets sont à a du centre sur le grand axe.', `a = ${d.A}, sur l'axe ${d.vertical ? 'vertical' : 'horizontal'} ; c = □`, `Foyers ${Rd(pt2(d.F[0]))} et ${Rd(pt2(d.F[1]))}`),
    solution: [{ html: `Ω = ${Rd(pt2([d.h, d.k]))}, a = ${d.A}, b = ${d.B}, c = ${Rd(d.cT)} ; foyers ${Rd(pt2(d.F[0]))} et ${Rd(pt2(d.F[1]))}.`, note: '' }],
    rules: { foci: 'g10_c_wrong_formula', vertices: 'g10_axis_swap' },
    baits: ['g10_c_wrong_formula', 'g10_axis_swap'],
    noHints: level === 5,
  });
}

function ellExam(rng, exam) {
  if (exam === 'open') return ellItem(5, rng, { exam });
  const d = ellData(rng);
  if (exam === 'coef') {
    const right = d.vertical ? d.F[0][1] : d.F[0][0];
    return coefItem({
      skill: ELL, key: `${d.eq}`, exam: examTag({ exam }), label: d.vertical ? 'y_F' : 'x_F',
      prompt: `L'ellipse ${M(d.eq)} a un foyer F ${d.vertical ? 'au-dessus de l\'autre' : 'à droite de l\'autre'}. Que vaut ${d.vertical ? 'son ordonnée' : 'son abscisse'} ?`,
      value: right, traps: [{ rule: 'g10_c_wrong_formula' }, { rule: 'g10_axis_swap' }],
      solution: [{ html: `${M(d.std)} : a = ${d.A}, b = ${d.B}, c = ${Rd(d.cT)}, F = ${Rd(pt2(d.F[0]))}.`, note: '' }],
    });
  }
  if (exam === 'tf') {
    if (rng.chance(0.4)) {
      return tfG({
        skill: ELL, key: 'e<1', truth: true, exam: examTag({ exam }),
        statement: 'L\'excentricité e d\'une ellipse (qui n\'est pas un cercle) vérifie 0 < e < 1.',
        explanation: 'Vrai : e = c/a et c² = a² − b² < a², donc c < a.',
      });
    }
    return tfG({
      skill: ELL, key: 'foci', truth: false, exam: examTag({ exam }), ruleIfTrue: 'g10_c_wrong_formula',
      statement: 'Les foyers de l\'ellipse x²/a² + y²/b² = 1 (avec a > b > 0) sont à la distance √(a² + b²) du centre.',
      counter: geoCounter('ellipseFoci', [['a', 'a ='], ['b', 'b =']], { a: '5', b: '3' }),
      explanation: 'Faux : c² = a² − b². Pour a = 5 et b = 3, les foyers sont à 4 du centre, pas à √34.',
    });
  }
  const c2w = d.A * d.A + d.B * d.B;
  const fw = (s) => (d.vertical ? [qt(d.h), plusRoot(d.k, c2w, s)] : [plusRoot(d.h, c2w, s), qt(d.k)]);
  const fs = (s) => (d.vertical ? [plusRoot(d.h, d.c2, s), qt(d.k)] : [qt(d.h), plusRoot(d.k, d.c2, s)]);
  const opt = (P, Qq) => `${Rd(pt2(P))} et ${Rd(pt2(Qq))}`;
  return mcqD({
    skill: ELL, level: 4, key: `mcq:${d.eq}`, exam: examTag({ exam }),
    prompt: `Quels sont les foyers de l'ellipse ${M(d.eq)} ?`,
    right: opt(d.F[0], d.F[1]),
    wrongs: [{ html: opt(fw(1), fw(-1)), rule: 'g10_c_wrong_formula' }, { html: opt(fs(1), fs(-1)), rule: 'g10_axis_swap' }],
    fillers: [{ html: opt(d.vertical ? [qt(d.h), qt(d.k + d.A)] : [qt(d.h + d.A), qt(d.k)], d.vertical ? [qt(d.h), qt(d.k - d.A)] : [qt(d.h - d.A), qt(d.k)]) }, { html: opt(d.F[0].map((x) => x.replace(/^-/, '')), d.F[1]) }],
    solution: [{ html: `${M(d.std)} : c² = a² − b² = ${d.c2}.`, note: '' }],
  }, rng);
}

// ======================================================================
// g10-hyperbola
// ======================================================================

const HYP = 'g10-hyperbola';
const HYP_SUB = ELL_SUB.map((s) => (s.id === 'el' ? { ...s, skill: HYP } : s));

function hypData(rng, kind = 'all') {
  const [a, b] = kind === 'eq' ? rng.pick([[1, 1], [2, 2], [3, 3]])
    : rng.int(0, 3) > 0 ? rng.pick([[4, 3], [3, 4], [8, 6], [6, 8]]) : rng.pick([[2, 1], [1, 2], [3, 1], [1, 3], [2, 3]]);
  const vertical = rng.chance(0.5);
  let h; let k;
  do { h = rng.int(-5, 5); k = rng.int(-5, 5); } while (h === 0 && k === 0);
  // Real axis horizontal: b²(x − h)² − a²(y − k)² − a²b² = 0.
  const coefs = vertical ? axisConic(-a * a, b * b, h, k, -a * a * b * b) : axisConic(b * b, -a * a, h, k, -a * a * b * b);
  const c2 = a * a + b * b;
  const foc = (s) => (vertical ? [qt(h), plusRoot(k, c2, s)] : [plusRoot(h, c2, s), qt(k)]);
  const dirV = q(a ** 4, c2);
  const dirT = (s) => `${vertical ? 'y' : 'x'} = ${plusRoot(vertical ? k : h, dirV, s)}`;
  // Asymptotes: b(x − h) = ±a(y − k) (horizontal), a(x − h) = ±b(y − k) (vertical).
  const [p, r] = vertical ? [a, b] : [b, a];
  const asym = [lineRow(p, -r, -p * h + r * k), lineRow(p, r, -p * h - r * k)];
  const std = vertical ? `${sqT('y', k)}/${a * a} - ${sqT('x', h)}/${b * b} = 1` : `${sqT('x', h)}/${a * a} - ${sqT('y', k)}/${b * b} = 1`;
  // Before dividing: α(x − h)² + β(y − k)² = rhs.
  const sides = `${sumT([[coefs[0], sqT('x', h)], [coefs[2], sqT('y', k)]])} = ${qt(-(coefs[5] - coefs[0] * h * h - coefs[2] * k * k))}`;
  return {
    a, b, vertical, h, k, coefs, eq: eqOf(coefs), c2, std, sides,
    cT: rootT(c2), eT: rootT(q(c2, a * a)), F: [foc(1), foc(-1)], dirs: [dirT(1), dirT(-1)], asym,
    asymT: `${lineText(asym[0])} ou ${lineText(asym[1])}`,
    S: vertical ? [[h, k + a], [h, k - a]] : [[h + a, k], [h - a, k]],
  };
}

const HYP_MENU = {
  el: [
    { id: 'pos', label: 'L\'axe réel est du côté du terme positif (second membre +1)', valid: true },
    { id: 'big', label: 'L\'axe réel est du côté du plus grand dénominateur', valid: false, rule: 'g10_axis_swap', why: 'Pour une hyperbole, c\'est le signe qui compte : le terme positif quand le second membre vaut 1.' },
  ],
  foc: [
    { id: 'plus', label: 'c² = a² + b²', valid: true },
    { id: 'minus', label: 'c² = a² − b²', valid: false, rule: 'g10_c_wrong_formula', why: 'Pour une hyperbole, c > a : c² = a² + b².' },
  ],
  asy: [
    { id: 'ba', label: 'y − k = ±(b/a)(x − h) pour l\'axe réel horizontal', valid: true },
    { id: 'ab', label: 'y − k = ±(a/b)(x − h) pour l\'axe réel horizontal', valid: false, rule: 'g10_asymptote_ratio', why: 'x²/a² − y²/b² = 0 donne y = ±(b/a)x.' },
  ],
  dir: [{ id: 'dir', label: 'Directrices à a²/c du centre, perpendiculaires à l\'axe réel', valid: true }, { id: 'c', label: 'À c du centre', valid: false, why: 'À c du centre, ce sont les foyers.' }],
};

function hypParts(d, level, kind) {
  const parts = [];
  if (level > 1) {
    parts.push(conicPart({
      start: d.eq, eq: d.eq, menu: STD_MENU,
      lines: [
        { math: completedOf(d.coefs, d.h, d.k), note: 'Compléter les carrés', subgoal: 'sq', blank: [{ after: sqT('x', d.h), text: qt(Math.abs(d.coefs[0] * d.h * d.h)) }, { after: sqT('y', d.k), text: qt(Math.abs(d.coefs[2] * d.k * d.k)) }].filter((b) => b.text !== '0') },
        { math: d.std, note: `${Rd(d.sides).replace(/\^2/g, '²')}, puis diviser par le second membre (qui devient +1)`, subgoal: 'sq', blank: [String(d.a * d.a), String(d.b * d.b)] },
      ],
    }));
  }
  const first = (o) => (parts.length ? o : { ...o, start: d.std, html: null });
  if (kind !== 'asym') {
    parts.push(conicPart(first({
      html: 'Le centre, a, b et c.', ask: 'Ω, a, b, c :', start: 'H', eq: d.eq, els: ['Ω', 'a', 'b', 'c'], menu: HYP_MENU.el,
      decisions: [AXIS_DEC(d.vertical, 'L\'axe réel')],
      lines: [{ math: `Ω = ${pt2([d.h, d.k])} ; a = ${d.a} ; b = ${d.b} ; c = ${d.cT}`, note: `Axe réel ${d.vertical ? 'vertical' : 'horizontal'} ; c² = a² + b² = ${d.c2}`, subgoal: 'el', blank: [String(d.a), String(d.b)] }],
    })));
    parts.push(conicPart({
      html: 'Les foyers et l\'excentricité.', ask: 'F, F′, e :', start: 'H', eq: d.eq, els: ['F', 'e'], menu: HYP_MENU.foc,
      lines: [
        { math: `F = ${pt2(d.F[0])} ; F' = ${pt2(d.F[1])}`, note: 'Sur l\'axe réel, à c du centre', subgoal: 'el' },
        { math: `e = ${d.eT}`, note: 'e = c/a > 1', subgoal: 'el', blank: [d.eT] },
      ],
    }));
  }
  parts.push(conicPart(first({
    html: 'Les asymptotes.', ask: 'asymptotes :', start: 'H', eq: d.eq, els: ['asymptotes'], menu: HYP_MENU.asy,
    lines: [{ math: `asymptotes : ${d.asymT}`, note: d.vertical ? `y − k = ±(a/b)(x − h) : l'axe réel est vertical` : 'y − k = ±(b/a)(x − h)', subgoal: 'el' }],
  })));
  if (kind === 'all' && level >= 4) {
    parts.push(conicPart({
      html: 'Les directrices.', ask: 'directrices :', start: 'H', eq: d.eq, els: ['directrices'], menu: HYP_MENU.dir,
      lines: [{ math: `directrices : ${d.dirs[0]} ou ${d.dirs[1]}`, note: `À a²/c = ${rootR(q(d.a ** 4, d.c2))} du centre`, subgoal: 'el' }],
    }));
  }
  return parts;
}

function hypItem(level, rng, opts = {}) {
  if (level === 5 && !opts.exam && rng.chance(0.5)) return hypPlot(level, rng);
  const kind = level === 5 || opts.exam || level <= 2 ? 'all' : rng.pick(['all', 'asym', 'eq']);
  const d = hypData(rng, kind === 'eq' ? 'eq' : 'all');
  const kk = kind === 'eq' ? 'all' : kind;
  return partsG({
    skill: HYP, level, parts: hypParts(d, level, kk), subgoals: HYP_SUB, keys: KEYS,
    prompt: level === 1
      ? `L'hyperbole H a pour forme réduite ${M(d.std)}. Donne son centre, a, b, c, ses foyers, son excentricité et ses asymptotes.`
      : `Pour l'hyperbole H : ${M(d.eq)}, trouve la forme réduite${kk === 'asym' ? ' et les asymptotes' : ', le centre, a, b, c, les foyers, l\'excentricité, les asymptotes'}${kk === 'all' && level >= 4 ? ' et les directrices' : ''}.`,
    hints: H('Pour une hyperbole, c² = a² + b² ; l\'axe réel est du côté du terme positif quand le second membre vaut +1.', `${d.vertical ? 'y − k = ±(□/□)(x − h)' : 'y − k = ±(□/□)(x − h)'}, Ω = ${Rd(pt2([d.h, d.k]))}`, `asymptotes : ${Rd(d.asymT)}`),
    key: `${HYP}:${kind}:${d.eq}`, exam: opts.exam ? examTag(opts, 5) : false,
  });
}

// L5: the sketch: centre, vertices, asymptotes (CMS contrôle 4, Q3 a).
function hypPlot(level, rng) {
  const d = hypData(rng);
  return conicPlot({
    skill: HYP, level, equation: d.eq, view: viewAround(d.h, d.k, Math.sqrt(d.c2) + 1.5), key: d.eq,
    prompt: `Esquisse l'hyperbole H : ${M(d.eq)}. Place son centre Ω, ses sommets et ses deux asymptotes (chacune par deux points).`,
    place: [{ id: 'center', label: 'Ω', short: 'Ω', kind: 'point' }, { id: 'vertices', label: 'Sommets', short: 'S', kind: 'point' }, { id: 'asymptotes', label: 'Asymptotes', short: '', kind: 'line' }],
    hints: [], noHints: true,
    solution: [{ html: `${M(d.std)} : Ω = ${Rd(pt2([d.h, d.k]))}, sommets ${d.S.map((P) => Rd(pt2(P))).join(' et ')}, asymptotes ${Rd(d.asymT)}.`, note: '' }],
    rules: { asymptotes: 'g10_asymptote_ratio', vertices: 'g10_axis_swap' },
    baits: ['g10_asymptote_ratio', 'g10_axis_swap'],
  });
}

function hypExam(rng, exam) {
  if (exam === 'open') return hypItem(5, rng, { exam });
  if (exam === 'tf') {
    return tfG({
      skill: HYP, key: 'perp', truth: true, exam: examTag({ exam }),
      statement: 'Les asymptotes de l\'hyperbole x²/a² − y²/b² = 1 sont perpendiculaires si et seulement si a = b.',
      explanation: 'Vrai : leurs pentes ±b/a ont pour produit −b²/a², qui vaut −1 si et seulement si a = b (hyperbole équilatère).',
    });
  }
  let d;
  do d = hypData(rng); while (d.a === d.b);
  const [p, r] = d.vertical ? [d.b, d.a] : [d.a, d.b];
  const swap = `${lineText(lineRow(p, -r, -p * d.h + r * d.k))} ou ${lineText(lineRow(p, r, -p * d.h - r * d.k))}`;
  const opt = (t) => Rd(t.replace(' ou ', ' et '));
  return mcqD({
    skill: HYP, level: 4, key: `mcq:${d.eq}`, exam: examTag({ exam }),
    prompt: `Quelles sont les asymptotes de l'hyperbole ${M(d.eq)} ?`,
    right: opt(d.asymT),
    wrongs: [{ html: opt(swap), rule: 'g10_asymptote_ratio' }],
    fillers: [
      { html: opt(`${lineText(lineRow(d.asym[0][0], d.asym[0][1], d.asym[0][2].neg()))} ou ${lineText(lineRow(d.asym[1][0], d.asym[1][1], d.asym[1][2].neg()))}`) },
      { html: opt(`${lineText(lineRow(1, -1, -d.h + d.k))} ou ${lineText(lineRow(1, 1, -d.h - d.k))}`) },
    ],
    solution: [{ html: `${M(d.std)} : les asymptotes passent par Ω = ${Rd(pt2([d.h, d.k]))}, ${Rd(d.asymT.replace(' ou ', ' et '))}.`, note: '' }],
  }, rng);
}

// ======================================================================
// g10-parabola
// ======================================================================

const PAR = 'g10-parabola';
const PAR_SUB = ELL_SUB.map((s) => (s.id === 'el' ? { ...s, skill: PAR } : s));

function parData(rng, { small = false } = {}) {
  const p = rng.pick(small ? [1, 2] : [1, 2, 3, 4, 6]) * rng.pick([1, -1]);
  const vertical = rng.chance(0.5);
  let h; let k;
  do { h = rng.int(-5, 5); k = rng.int(-5, 5); } while ((vertical ? h : k) === 0);
  // Vertical: (x − h)² = 2p(y − k).
  const coefs = vertical ? [1, 0, 0, -2 * h, -2 * p, h * h + 2 * p * k] : [0, 0, 1, -2 * p, -2 * k, k * k + 2 * p * h];
  const half = q(p, 2);
  const std = vertical ? `${sqT('x', h)} = ${2 * p}${linT1('y', k)}` : `${sqT('y', k)} = ${2 * p}${linT1('x', h)}`;
  const completed = vertical
    ? `${sumT([[1, sqT('x', h)], [-h * h, ''], [-2 * p, 'y'], [coefs[5], '']].filter(([x]) => x !== 0))} = 0`
    : `${sumT([[1, sqT('y', k)], [-k * k, ''], [-2 * p, 'x'], [coefs[5], '']].filter(([x]) => x !== 0))} = 0`;
  return {
    p, vertical, h, k, coefs, eq: eqOf(coefs), std, completed,
    F: vertical ? [qt(h), qt(q(k).add(half))] : [qt(q(h).add(half)), qt(k)],
    Fq: vertical ? [q(h), q(k).add(half)] : [q(h).add(half), q(k)],
    dq: vertical ? q(k).sub(half) : q(h).sub(half),
    dir: vertical ? `y = ${qt(q(k).sub(half))}` : `x = ${qt(q(h).sub(half))}`,
    axe: vertical ? `x = ${h}` : `y = ${k}`,
  };
}

const PAR_MENU = {
  S: [{ id: 'read', label: 'Lire le sommet et l\'axe sur la forme réduite', valid: true }, { id: 'focus', label: 'Le sommet est le foyer', valid: false, why: 'Le foyer est à p/2 du sommet, sur l\'axe.' }],
  p: [{ id: 'half', label: '2p est le coefficient devant (y − k)', valid: true }, { id: 'p', label: 'p est le coefficient devant (y − k)', valid: false, why: 'La forme est (x − h)² = 2p(y − k) : ce coefficient vaut 2p.' }],
  F: [
    { id: 'half', label: 'F à p/2 du sommet, directrice à p/2 de l\'autre côté', valid: true },
    { id: 'p', label: 'F à p du sommet', valid: false, rule: 'g10_parabola_p_half', why: 'Le foyer est à p/2 du sommet, pas à p.' },
  ],
  def: [{ id: 'def', label: 'MF² = d(M, D)², puis développer', valid: true }, { id: 'mf', label: 'MF = d(M, D) sans élever au carré', valid: true, quality: 'poor', why: 'Juste, mais avec les racines, on ne peut pas réduire : élève au carré.' }],
};

function parElements(d, first) {
  const st = first ? d.std : 'P';
  return [
    conicPart({
      html: first ? null : 'Le sommet et l\'axe.', ask: 'S, axe :', start: st, eq: d.eq, els: ['S', 'axe'], menu: PAR_MENU.S,
      lines: [{ math: `S = ${pt2([d.h, d.k])} ; axe : ${d.axe}`, note: `Axe ${d.vertical ? 'vertical' : 'horizontal'} : le carré porte sur ${d.vertical ? 'x' : 'y'}`, subgoal: 'el', blank: [String(d.h), String(d.k)] }],
    }),
    {
      html: 'Le paramètre p.', ask: 'p =', start: 'p', judge: { kind: 'value', expect: String(d.p) }, menu: PAR_MENU.p,
      lines: [{ math: String(d.p), note: `2p = ${d.p * 2}`, subgoal: 'el', blank: [String(d.p)] }],
    },
    conicPart({
      html: 'Le foyer et la directrice.', ask: 'F, directrice :', start: 'P', eq: d.eq, els: ['F', 'directrice'], menu: PAR_MENU.F,
      lines: [{ math: `F = ${pt2(d.F)} ; directrice : ${d.dir}`, note: 'À p/2 du sommet, de part et d\'autre', subgoal: 'el', blank: [d.vertical ? d.F[1] : d.F[0]] }],
    }),
  ];
}

function parItem(level, rng, opts = {}) {
  const gab = level === 5 || opts.exam ? rng.pick(['fd', 'pts']) : level === 4 ? rng.pick(['eq', 'fd', 'pts']) : 'eq';
  const d = parData(rng, { small: gab === 'pts' });
  const parts = [];
  let prompt;
  if (gab === 'eq') {
    if (level > 1) {
      parts.push(conicPart({
        start: d.eq, eq: d.eq, menu: STD_MENU.slice(0, 1).concat([{ id: 'iso', label: 'Isoler le carré, mettre 2p en facteur', valid: true }]),
        decisions: [{
          levels: [2], kind: 'decision', prompt: 'L\'axe de la parabole est…', options: [
            { id: 'v', label: 'vertical (le carré porte sur x)', valid: d.vertical, ref: d.vertical, why: 'Le terme au carré est en y : l\'axe est horizontal.' },
            { id: 'h', label: 'horizontal (le carré porte sur y)', valid: !d.vertical, ref: !d.vertical, why: 'Le terme au carré est en x : l\'axe est vertical.' },
          ],
        }],
        lines: [
          { math: d.completed, note: 'Compléter le carré', subgoal: 'sq', blank: [{ after: d.vertical ? sqT('x', d.h) : sqT('y', d.k), text: qt((d.vertical ? d.h : d.k) ** 2) }].filter((b) => b.text !== '0') },
          { math: d.std, note: 'Isoler le carré et mettre 2p en facteur', subgoal: 'sq', blank: [String(2 * d.p)] },
        ],
      }));
    }
    parts.push(...parElements(d, level === 1));
    prompt = level === 1 ? `La parabole P a pour forme réduite ${M(d.std)}. Donne son sommet, son axe, p, son foyer et sa directrice.` : `Pour la parabole P : ${M(d.eq)}, trouve la forme réduite, le sommet, l'axe, p, le foyer et la directrice.`;
  } else if (gab === 'fd') {
    const [fx, fy] = d.Fq;
    const dv = d.dq;
    const sq1 = d.vertical ? `${sqT('x', fx)} + ${sqT('y', fy)} = ${sqT('y', dv)}` : `${sqT('x', fx)} + ${sqT('y', fy)} = ${sqT('x', dv)}`;
    parts.push(conicPart({
      start: 'P', eq: d.eq, menu: PAR_MENU.def,
      lines: [
        { math: sq1, note: 'MF² = d(M, D)²', subgoal: 'sq' },
        { math: d.std, note: 'Développer et réduire', subgoal: 'sq' },
      ],
    }));
    parts.push(parElements(d, false)[0]);
    prompt = `Trouve l'équation de la parabole P de foyer F${Rd(pt2(d.F))} et de directrice D : ${Rd(d.dir)}, sous la forme réduite, puis son sommet et son axe.`;
  } else {
    // Axis and two points: (x − h)² = 2p(y − k), h known.
    let A; let B;
    for (;;) {
      const ts = [rng.int(-6, 6), rng.int(-6, 6)];
      if (ts.some((t) => !t) || ts[0] * ts[0] === ts[1] * ts[1]) continue;
      if (ts.some((t) => (t * t) % (2 * d.p) !== 0)) continue;
      const P = (t) => (d.vertical ? [d.h + t, d.k + (t * t) / (2 * d.p)] : [d.h + (t * t) / (2 * d.p), d.k + t]);
      [A, B] = ts.map(P);
      if ([A, B].every((X) => X.every((x) => Math.abs(x) <= 14))) break;
    }
    const [u, v, w] = d.vertical ? [0, 1, d.h] : [1, 0, d.k];
    const dA = A[u] - w;
    const dB = B[u] - w;
    parts.push(
      {
        start: '2p', judge: { kind: 'value', expect: String(2 * d.p) },
        notes: [`A et B donnent ${Rd(`${par(dA)}^2 = 2p(${A[v]} - k)`)} et ${Rd(`${par(dB)}^2 = 2p(${B[v]} - k)`)}.`.replace(/\^2/g, '²')],
        lines: [{ math: `(${par(dA)}^2-${par(dB)}^2)/(${A[v]}-${par(B[v])})`, note: 'Soustraire les deux équations', subgoal: 'sq' }, { math: String(2 * d.p), note: '', subgoal: 'sq' }],
      },
      {
        html: 'Puis k.', ask: 'k =', start: 'k', judge: { kind: 'value', expect: String(d.vertical ? d.k : d.h) },
        lines: [{ math: `${A[v]}-${par(dA)}^2/${par(2 * d.p)}`, note: `De ${Rd(`${par(dA)}^2`).replace('^2', '²')} = 2p(${A[v]} − k)`, subgoal: 'sq' }, { math: String(d.vertical ? d.k : d.h), note: '', subgoal: 'sq' }],
      },
      conicPart({ html: 'L\'équation.', ask: 'P :', start: 'P', eq: d.eq, lines: [{ math: d.std, note: '', subgoal: 'sq' }] }),
    );
    prompt = `Une parabole P d'axe ${Rd(d.axe)} passe par ${ptR('A', A)} et ${ptR('B', B)}. Trouve son équation sous la forme ${d.vertical ? `(x − ${fq(d.h)})² = 2p(y − k)` : `(y − ${fq(d.k)})² = 2p(x − h)`}.`.replace(/− −/g, '+ ');
  }
  return partsG({
    skill: PAR, level, parts, subgoals: PAR_SUB, keys: KEYS,
    prompt,
    hints: H('Isole le carré d\'un côté, mets le coefficient de l\'autre variable en facteur : (x − h)² = 2p(y − k).', `F = ${Rd(pt2(d.vertical ? [d.h, `${d.k} + □`] : [`${d.h} + □`, d.k]))}`, `${Rd(d.std)} ; F = ${Rd(pt2(d.F))} ; directrice ${Rd(d.dir)}`),
    key: `${PAR}:${gab}:${d.eq}`, exam: opts.exam ? examTag(opts, 4) : false,
  });
}

function parExam(rng, exam) {
  if (exam === 'open') return parItem(5, rng, { exam });
  if (exam === 'tf') {
    const tp = rng.pick([2, 4, 6, 8, 12]);
    if (rng.chance(0.35)) {
      return tfG({
        skill: PAR, key: `true:${tp}`, truth: true, exam: examTag({ exam }),
        statement: `Le foyer de la parabole x² = ${tp}y est (0 ; ${fq(q(tp, 4))}).`,
        explanation: `Vrai : 2p = ${tp}, p = ${fq(q(tp, 2))}, et le foyer est à p/2 = ${fq(q(tp, 4))} du sommet O.`,
      });
    }
    return tfG({
      skill: PAR, key: `false:${tp}`, truth: false, exam: examTag({ exam }), ruleIfTrue: 'g10_parabola_p_half',
      statement: `Le foyer de la parabole x² = ${tp}y est (0 ; ${tp}).`,
      counter: geoCounter('parabolaFocus', [['F', 'le vrai foyer F =']], { F: `(0 ; ${qt(q(tp, 4))})` }, { fx: 0, fy: tp / 4 }),
      explanation: `Faux : 2p = ${tp}, donc p = ${fq(q(tp, 2))} et le foyer est à p/2 du sommet : F = (0 ; ${fq(q(tp, 4))}).`,
    });
  }
  const d = parData(rng);
  const pF = (k) => (d.vertical ? [qt(d.h), qt(q(d.k).add(q(d.p).mul(q(k))))] : [qt(q(d.h).add(q(d.p).mul(q(k)))), qt(d.k)]);
  return mcqD({
    skill: PAR, level: 4, key: `mcq:${d.eq}`, exam: examTag({ exam }),
    prompt: `Quel est le foyer de la parabole ${M(d.eq)} ?`,
    right: Rd(pt2(d.F)),
    wrongs: [{ html: Rd(pt2(pF(1))), rule: 'g10_parabola_p_half' }, { html: Rd(pt2(pF(2))), rule: 'g10_parabola_p_half' }, { html: Rd(pt2(pF(q(-1, 2)))), rule: null }],
    fillers: [{ html: Rd(pt2([d.h, d.k])) }],
    solution: [{ html: `${M(d.std)} : 2p = ${2 * d.p}, le foyer est à p/2 = ${fq(q(d.p, 2))} du sommet.`, note: '' }],
  }, rng);
}

// ======================================================================

export const GEN = {
  [ELL]: (level, rng, profile, opts = {}) => (opts.exam ? ellExam(rng, opts.exam) : ellItem(level, rng)),
  [HYP]: (level, rng, profile, opts = {}) => (opts.exam ? hypExam(rng, opts.exam) : hypItem(level, rng)),
  [PAR]: (level, rng, profile, opts = {}) => (opts.exam ? parExam(rng, opts.exam) : parItem(level, rng)),
  [POL]: (level, rng, profile, opts = {}) => (opts.exam ? polExam(rng, opts.exam) : polItem(level, rng)),
  [POW]: (level, rng, profile, opts = {}) => (opts.exam ? powExam(rng, opts.exam) : powItem(level, rng)),
  [CEQ]: (level, rng, profile, opts = {}) => (opts.exam ? ceqExam(rng, opts.exam) : ceqItem(level, rng)),
  [TAN]: (level, rng, profile, opts = {}) => (opts.exam ? tanExam(rng, opts.exam) : tanItem(level, rng)),
};

export { Q, sqT, linT1, conicPlot, coefItem, rootT, sumT, parR };

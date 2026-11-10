// Generators of module G4, part a (step U5): lines of the plane (g4-line2)
// and bisectors (g4-bisectors). Catalogue: docs/universite/G-gymnase-2.md,
// G4. Judges: geom (line2, count 2 for the pair of bisectors), solset (the
// parameter t), vector (a point, a norm).

import {
  q, qt, fq, nz, H, add, sub, scale, dot, vt, vr, ptR, linT, paramT, sumT, readable, prim,
  mcqD, tfG, examTag, geoCounter, GML, det2,
} from './geo-kit.js';
import { stepsItem, par, coordT, rowThrough, minusT, gcdN, isPrim, substT } from './geoan-a-kit.js';

const gR = (t) => GML(t, 2);

// ======================================================================
// g4-line2
// ======================================================================

const L2 = 'g4-line2';
const L2_SUB = [
  { id: 'param', label: 'écrire la paramétrique A + t·v⃗', skill: 'g4-vectors' },
  { id: 'elim', label: 'éliminer t : la cartésienne', skill: L2 },
  { id: 'solve', label: 'résoudre l\'équation en t', skill: 'eq-systems' },
  { id: 'inter', label: 'le point d\'intersection', skill: L2 },
];

// d through A with direction v (primitive), g through I = A + t₀v with a
// normal m not colinear with the normal n of d.
function line2Data(rng) {
  for (let t = 0; t < 300; t++) {
    const A = [q(rng.int(-5, 5)), q(rng.int(-5, 5))];
    const v = [q(rng.int(-4, 4)), q(rng.int(-4, 4))];
    if (v.every((x) => x.n === 0) || gcdN(v[0].n, v[1].n) !== 1) continue;
    const n = [v[1], v[0].neg()];
    const row = rowThrough(n, A);
    const t0 = nz(rng, -3, 3);
    const I = add(A, scale(v, t0));
    if (I.some((x) => Math.abs(x.valueOf()) > 9)) continue;
    const m = prim([q(rng.int(-3, 3)), q(rng.int(-3, 3))], true);
    if (m.every((x) => x.n === 0) || det2(m, n).n === 0) continue;
    const g = rowThrough(m, I);
    if ([...row, ...g].some((x) => Math.abs(x.valueOf()) > 30)) continue;
    return { A, v, n: row.slice(0, 2), row, t0, I, m: g.slice(0, 2), g };
  }
  const A = [q(1), q(-2)];
  return { A, v: [q(3), q(2)], n: [q(2), q(-3)], row: [q(2), q(-3), q(-8)], t0: 1, I: [q(4), q(0)], m: [q(1), q(1)], g: [q(1), q(1), q(-4)], fallback: true };
}

// « 2x − 3y = 2·1 − 3·(−2) »: the cartesian before computing the constant.
const elimT = (n, A) => `${sumT([[n[0], 'x'], [n[1], 'y']])} = ${par(n[0])}·${par(A[0])} + ${par(n[1])}·${par(A[1])}`;

const L2_MENU = {
  line: [
    { id: 'param', label: 'Écrire la paramétrique A + t·v⃗', valid: true },
    { id: 'elim', label: 'Éliminer t (ou prendre la normale (v₂ ; −v₁))', valid: true },
    { id: 'normal', label: 'Prendre v⃗ comme vecteur normal', valid: false, rule: 'g4_normal_as_direction', why: 'v⃗ est un vecteur directeur : il est parallèle à la droite. Un vecteur normal est (v₂ ; −v₁).' },
  ],
  solve: [
    { id: 'subst', label: 'Remplacer x et y de la paramétrique dans l\'autre équation', valid: true },
    { id: 'solve', label: 'Résoudre en t', valid: true },
    { id: 'add', label: 'Additionner les deux équations cartésiennes', valid: false, why: 'Ici, une droite est paramétrique : on remplace, c\'est plus court.' },
  ],
  point: [
    { id: 'back', label: 'Remplacer t dans la paramétrique', valid: true },
    { id: 'tvec', label: 'Le point est (t ; t)', valid: false, why: 't est le paramètre, pas une coordonnée : le point est A + t·v⃗.' },
  ],
};

function line2Item(level, rng, opts = {}) {
  const d = line2Data(rng);
  const { A, v, n, row, t0, I, m, g } = d;
  const kind = level <= 2 || level === 5 || opts.exam ? 'dir' : rng.pick(['dir', 'two', 'par', 'perp']);
  let prompt;
  let given = '';
  const lineCfg = { kind: 'geom', object: 'line2', ref: linT(row), lineData: { A: A.map(qt), n: n.map(qt) } };
  if (kind === 'dir') given = `la droite d passe par ${ptR('A', A)} et a pour direction v⃗ = ${vr(v)}`;
  if (kind === 'two') given = `la droite d passe par ${ptR('A', A)} et ${ptR('B', add(A, v))}`;
  let h = null;
  if (kind === 'par' || kind === 'perp') {
    const c = rng.int(-9, 9);
    h = kind === 'par' ? [n[0], n[1], q(c)] : [v[0], v[1], q(c)];
    if (dot(h.slice(0, 2), A).add(h[2]).n === 0) h[2] = h[2].add(1);
    given = `la droite d passe par ${ptR('A', A)} et est ${kind === 'par' ? 'parallèle' : 'perpendiculaire'} à la droite h : ${gR(linT(h))}`;
  }
  const gText = linT(g);
  prompt = `Dans le plan, ${given}. Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : ${gR(gText)}.`;
  const pT = paramT(A, [v]);
  const steps1 = [];
  if (kind === 'two') steps1.push({ note: `Une direction : v⃗ = AB⃗ = ${vr(v)}.` });
  if (kind === 'par') steps1.push({ note: `d est parallèle à h : une direction de h est (−b ; a) = ${vr(v)}.` });
  if (kind === 'perp') steps1.push({ note: `d est perpendiculaire à h : le vecteur normal de h, ${vr(v)}, dirige d.` });
  steps1.push(
    { decision: { prompt: 'Comment passer à la cartésienne ?', options: [{ id: 'elim', label: 'Éliminer t entre x et y', valid: true, quality: 'good', ref: true }, { id: 'normal', label: `Prendre la normale (v₂ ; −v₁) = ${vr(n)}, puis la constante`, valid: true, quality: 'good' }, { id: 'dir', label: `Prendre ${vr(v)} comme normale`, valid: false, rule: 'g4_normal_as_direction', why: `${vr(v)} est un vecteur directeur : il est parallèle à la droite. La normale est (v₂ ; −v₁) = ${vr(n)}.` }] }, levels: [2] },
    { math: pT, note: 'Paramétrique', subgoal: 'param', blank: [vt(A)], blank2: [vt(A), vt(v)] },
    { math: elimT(n, A), note: `${fq(n[0])}·x et ${fq(n[1])}·y : t disparaît`, subgoal: 'elim', blank: [par(A[0]), par(A[1])], blank2: [sumT([[n[0], 'x'], [n[1], 'y']])] },
    { math: linT(row), note: 'Cartésienne', subgoal: 'elim', blank: [qt(row[2].n < 0 ? row[2].neg() : row[2])] },
  );
  // Substituting the parametric into g.
  const sub0 = substT(m, A, v, g[2]);
  const mv = dot(m, v);
  const k = dot(m, A).add(g[2]);
  const red = `${sumT([[mv, 't'], [k, '']])} = 0`;
  const parts = [
    { start: 'd', judge: lineCfg, menu: L2_MENU.line, steps: steps1 },
    {
      html: `d : ${gR(linT(row))}. Remplace la paramétrique de d dans g.`, ask: 'équation en t :', start: sub0,
      judge: { kind: 'solset', v: 't', vars: ['t'] }, menu: L2_MENU.solve,
      steps: [
        { math: red, note: 'Développer', subgoal: 'solve', blank: [qt(mv)] },
        { math: `t = ${t0}`, note: '', subgoal: 'solve', blank: [String(t0)] },
      ],
    },
    {
      html: `t = ${fq(t0)}. Le point d'intersection ?`, ask: 'I =', start: 'I',
      judge: { kind: 'vector', symbols: { A: vt(A), v: vt(v) }, expect: vt(I) }, menu: L2_MENU.point,
      steps: [
        { math: `I = (${qt(A[0])} + ${par(v[0])}·${par(t0)} ; ${qt(A[1])} + ${par(v[1])}·${par(t0)})`, note: 'Remplacer t', subgoal: 'inter', upTo: 2 },
        { math: `I = ${vt(I)}`, note: '', subgoal: 'inter', blank: [qt(I[0]), qt(I[1])] },
      ],
    },
  ];
  if (level === 5 || opts.exam) {
    parts[1].steps.unshift({ decision: { prompt: `Les normales ${vr(n)} et ${vr(m)} sont-elles colinéaires ?`, options: [
      { id: 'sec', label: 'Non : les droites sont sécantes', valid: true, ref: true },
      { id: 'par', label: 'Oui : parallèles (sans point commun)', valid: false, why: `${fq(n[0])}·${fq(m[1])} − ${fq(n[1])}·${fq(m[0])} = ${fq(det2(n, m))} ≠ 0 : les normales ne sont pas colinéaires.` },
      { id: 'same', label: 'Oui : confondues', valid: false, why: 'Des droites confondues ont des normales colinéaires ; ce n\'est pas le cas.' },
    ] } });
  }
  return stepsItem({
    skill: L2, level, prompt, parts, subgoals: L2_SUB, key: `${L2}:${kind}:${vt(A)}${vt(v)}${gText}`, fallback: d.fallback,
    hints: [
      { level: 1, html: `Écris d sous forme paramétrique A + t·v⃗, puis élimine t : la normale (v₂ ; −v₁) = ${vr(n)} donne ${readable(sumT([[n[0], 'x'], [n[1], 'y']]))} = ${readable(sumT([[n[0], 'x_A'], [n[1], 'y_A']]))}.` },
      { level: 2, html: `${readable(sumT([[n[0], 'x'], [n[1], 'y']]))} = ${par(n[0]).replace(/-/g, '−')}·(□) + ${par(n[1]).replace(/-/g, '−')}·(□)` },
      { level: 3, html: gR(linT(row)) },
    ],
    exam: opts.exam ? examTag(opts, 4) : false,
  });
}

function line2Exam(rng, exam) {
  if (exam === 'open') return line2Item(5, rng, { exam });
  const d = line2Data(rng);
  if (exam === 'tf') {
    const k = rng.pick([2, 3, -2]);
    const r = d.row;
    if (rng.chance(0.5)) {
      const c = r[2].mul(k).add(nz(rng, -3, 3));
      return tfG({
        skill: L2, key: `par:${linT(r)}:${k}`, truth: true, exam: examTag({ exam }),
        statement: `Les droites ${gR(linT(r))} et ${gR(linT([r[0].mul(k), r[1].mul(k), c]))} sont parallèles et distinctes.`,
        explanation: `Vrai : les normales sont colinéaires (facteur ${k}), mais les constantes ne le sont pas dans le même rapport.`,
      });
    }
    const r2 = r.map((x) => x.mul(k));
    return tfG({
      skill: L2, key: `same:${linT(r)}:${k}`, truth: false, exam: examTag({ exam }), ruleIfTrue: 'g4_line_constant',
      statement: `Les droites ${gR(linT(r))} et ${gR(linT(r2))} sont parallèles et distinctes.`,
      counter: geoCounter('commonPoint', [['P', 'un point commun P =']], { P: vt(d.A) }, { rows: [r.map(Number), r2.map(Number)] }),
      explanation: `Faux : la seconde équation est la première multipliée par ${k}, les droites sont confondues. Par exemple ${ptR('A', d.A)} est sur les deux.`,
    });
  }
  const { A, v, row } = d;
  const nd = rowThrough(v, A);
  return mcqD({
    skill: L2, level: 4, key: `mcq:${vt(A)}${vt(v)}`, exam: examTag({ exam }),
    prompt: `Quelle est une équation cartésienne de la droite passant par ${ptR('A', A)}, de direction v⃗ = ${vr(v)} ?`,
    right: gR(linT(row)),
    wrongs: [
      { html: gR(linT(nd)), rule: 'g4_normal_as_direction' },
      row[2].n !== 0 ? { html: gR(linT([row[0], row[1], row[2].neg()])), rule: 'g4_line_constant' } : null,
      row[2].n !== 0 ? { html: gR(linT([row[0], row[1], q(0)])), rule: 'g4_line_constant' } : null,
    ],
    fillers: [{ html: gR(linT(prim([row[0], row[1].neg(), row[2]]))) }, { html: gR(linT([row[0], row[1], row[2].add(1)])) }, { html: gR(linT([row[1], row[0], row[2]])) }],
    solution: [{ html: `Normale (v₂ ; −v₁) = ${vr(row.slice(0, 2))}, puis la constante avec A : ${gR(linT(row))}.`, note: '' }],
    fallback: d.fallback,
  }, rng);
}

// ======================================================================
// g4-bisectors
// ======================================================================

const BIS = 'g4-bisectors';
const BIS_SUB = [
  { id: 'norm', label: 'normes des vecteurs normaux', skill: 'g4-dot' },
  { id: 'eq', label: 'égalité des distances', skill: BIS },
  { id: 'cases', label: 'cas + et cas −', skill: 'g1-abs-eq' },
  { id: 'line', label: 'équations cartésiennes', skill: 'g4-line2' },
];

// Normals of whole norm: (3 ; 4) → 5, (5 ; 12) → 13, (8 ; 15) → 17, (1 ; 0) → 1.
const NORMALS = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [1, 0, 1]];
function normalOf(rng, fam = null) {
  const [a, b, N] = fam ?? rng.pick(NORMALS);
  let w = rng.chance(0.5) ? [a, b] : [b, a];
  w = w.map((x) => (rng.chance(0.5) ? -x : x));
  return { n: w.map((x) => q(x)), N };
}
const absT = (row) => sumT([[row[0], 'x'], [row[1], 'y'], [row[2], '']]);

function bisData(rng, { equal = null } = {}) {
  for (let t = 0; t < 300; t++) {
    const P = [q(rng.int(-4, 4)), q(rng.int(-4, 4))];
    const eq = equal ?? rng.chance(0.5);
    const f1 = eq ? NORMALS[0] : rng.pick(NORMALS);
    const a = normalOf(rng, f1);
    const b = normalOf(rng, eq ? NORMALS[0] : rng.pick(NORMALS.filter((x) => x !== f1)));
    if (det2(a.n, b.n).n === 0) continue;
    const r1 = prim([...a.n, dot(a.n, P).neg()], true);
    const r2 = prim([...b.n, dot(b.n, P).neg()], true);
    const plus = prim(r1.map((x, i) => x.mul(b.N).sub(r2[i].mul(a.N))), true);
    const minus = prim(r1.map((x, i) => x.mul(b.N).add(r2[i].mul(a.N))), true);
    if ([...plus, ...minus].some((x) => Math.abs(x.valueOf()) > 60)) continue;
    return { P, r1, r2, N1: a.N, N2: b.N, plus, minus };
  }
  const P = [q(1), q(1)];
  return { P, r1: [q(3), q(-4), q(1)], r2: [q(4), q(3), q(-7)], N1: 5, N2: 5, plus: [q(1), q(7), q(-8)], minus: [q(7), q(-1), q(-6)], fallback: true };
}

const pairT = (a, b) => `${linT(a)} ou ${linT(b)}`;
const BIS_MENU = [
  { id: 'norm', label: 'Calculer les normes des vecteurs normaux', valid: true },
  { id: 'dist', label: 'Égaler les distances |…|/‖n₁‖ = |…|/‖n₂‖', valid: true },
  { id: 'cases', label: 'Séparer les cas + et −', valid: true },
  { id: 'nonorm', label: 'Égaler |a₁x + b₁y + c₁| et |a₂x + b₂y + c₂| sans les normes', valid: false, rule: 'g4_bisector_unnormalized', why: 'a x + b y + c n\'est une distance qu\'après division par √(a² + b²).' },
];

function bisLinesSteps(d, level) {
  const { r1, r2, N1, N2, plus, minus } = d;
  const L1 = absT(r1);
  const L2t = absT(r2);
  const same = N1 === N2;
  const f = (N) => (N === 1 ? '' : String(N));
  const casesT = same ? `${L1} - (${L2t}) = 0 ou ${L1} + (${L2t}) = 0` : `${f(N2)}(${L1}) - ${f(N1)}(${L2t}) = 0 ou ${f(N2)}(${L1}) + ${f(N1)}(${L2t}) = 0`;
  return [
    { decision: { prompt: 'Comment écrire l\'égalité des distances ?', options: [
      { id: 'div', label: 'Diviser chaque valeur absolue par la norme de sa normale', valid: true, ref: true },
      { id: 'direct', label: 'Égaler directement les deux valeurs absolues', valid: same, quality: same ? 'poor' : undefined, rule: same ? undefined : 'g4_bisector_unnormalized', why: same ? `Juste ici, parce que les deux normes valent ${N1} ; en général il faut diviser par chaque norme.` : `Les normes diffèrent (${N1} et ${N2}) : a x + b y + c n'est une distance qu'après division par √(a² + b²).` },
    ] }, levels: [2] },
    { math: `|${L1}|/${N1} = |${L2t}|/${N2}`, note: 'Égalité des distances', subgoal: 'eq', blank: [String(N1), String(N2)], blank2: [] },
    { math: casesT, note: '|A| = |B| ⇔ A = B ou A = −B', subgoal: 'cases', from: 1 },
    { math: pairT(plus, minus), note: 'Les deux bissectrices', subgoal: 'line', blank: [qt(plus[2].n < 0 ? plus[2].neg() : plus[2])], blank2: [] },
  ];
}

function bisItem(level, rng, opts = {}) {
  if (level === 5 || opts.exam) return bisInterior(level, rng, opts);
  const gab = level >= 3 && rng.chance(0.3) ? 'mediator' : 'pair';
  if (gab === 'mediator') return mediatorItem(level, rng);
  const d = bisData(rng, { equal: level <= 2 ? rng.chance(0.6) : null });
  const { r1, r2, N1, N2, plus, minus } = d;
  const parts = [];
  const normStep = (n, N, name) => ({
    html: `La norme de ${name} = ${vr(n)} ?`, ask: `‖${name}‖ =`, start: `‖${vt(n)}‖`,
    judge: { kind: 'vector', expect: String(N) }, menu: BIS_MENU,
    steps: [{ math: `√(${sqTN(n)})`, note: 'Pythagore', subgoal: 'norm' }, { math: String(N), note: '', subgoal: 'norm' }],
  });
  if (level >= 2) parts.push(normStep(r1.slice(0, 2), N1, 'n⃗₁'), normStep(r2.slice(0, 2), N2, 'n⃗₂'));
  parts.push({
    html: level >= 2 ? `‖n⃗₁‖ = ${N1}, ‖n⃗₂‖ = ${N2}. Les bissectrices ?` : `Les normes valent ‖n⃗₁‖ = ${N1} et ‖n⃗₂‖ = ${N2}.`, ask: 'bissectrices :', start: 'b',
    judge: { kind: 'geom', object: 'line2', count: 2, ref: pairT(plus, minus), bis: { r1: r1.map(qt), r2: r2.map(qt), N1, N2 } }, menu: BIS_MENU,
    steps: bisLinesSteps(d, level),
  });
  return stepsItem({
    skill: BIS, level, parts, subgoals: BIS_SUB, key: `${BIS}:${linT(r1)}|${linT(r2)}`, fallback: d.fallback,
    prompt: `Donne les équations des deux bissectrices des droites d₁ : ${gR(linT(r1))} et d₂ : ${gR(linT(r2))}, à coefficients entiers.`,
    hints: [
      { level: 1, html: 'Un point de la bissectrice est à la même distance des deux droites : |a₁x + b₁y + c₁|/‖n⃗₁‖ = |a₂x + b₂y + c₂|/‖n⃗₂‖.' },
      { level: 2, html: `${readable(absT(r1))} = ±(□) (après avoir multiplié par les normes)` },
      { level: 3, html: gR(pairT(plus, minus)) },
    ],
  });
}
const sqTN = (n) => n.map((x) => `${par(x)}^2`).join(' + ');

// The perpendicular bisector of [AB] (whole midpoint).
function mediatorItem(level, rng) {
  let A; let B;
  for (let t = 0; t < 100; t++) {
    A = [q(rng.int(-5, 5)), q(rng.int(-5, 5))];
    B = [q(A[0].n + 2 * rng.int(-3, 3)), q(A[1].n + 2 * rng.int(-3, 3))];
    // AB⃗ and the midpoint with nonzero coordinates (no flat line before the end).
    if (A[0].n !== B[0].n && A[1].n !== B[1].n && A[0].n + B[0].n !== 0 && A[1].n + B[1].n !== 0) break;
  }
  const I = [A[0].add(B[0]).div(2), A[1].add(B[1]).div(2)];
  const u = sub(B, A);
  const row = rowThrough(u, I);
  const lineT = `${par(u[0])}(${minusT('x', I[0])}) + ${par(u[1])}(${minusT('y', I[1])}) = 0`;
  return stepsItem({
    skill: BIS, level, subgoals: BIS_SUB, key: `${BIS}:med:${vt(A)}${vt(B)}`,
    prompt: `Donne une équation cartésienne (coefficients entiers) de la médiatrice de [AB], avec ${ptR('A', A)} et ${ptR('B', B)}.`,
    parts: [
      { html: `Le milieu de [AB] est I${vr(I)}, et AB⃗ = ${vr(u)} est normal à la médiatrice.`, start: 'm', judge: { kind: 'geom', object: 'line2', ref: linT(row) },
        menu: [{ id: 'mid', label: 'AB⃗·(X − I) = 0, avec I le milieu', valid: true }, { id: 'dir', label: 'La droite par I de direction AB⃗', valid: false, rule: 'g4_normal_as_direction', why: 'La médiatrice est perpendiculaire à [AB] : AB⃗ est un vecteur normal, pas directeur.' }],
        steps: [
          { math: lineT, note: 'AB⃗·(X − I) = 0', subgoal: 'eq' },
          { math: linT(row), note: 'Développer et simplifier', subgoal: 'line' },
        ] },
    ],
    hints: [
      { level: 1, html: 'Un point M de la médiatrice vérifie MA = MB, ou AB⃗·(M − I) = 0 avec I le milieu de [AB].' },
      { level: 2, html: `${fq(u[0])}(x − □) ${q(u[1]).n < 0 ? '−' : '+'} ${fq(q(u[1]).n < 0 ? q(u[1]).neg() : u[1])}(y − □) = 0` },
      { level: 3, html: gR(linT(row)) },
    ],
  });
}

// Level 5 and the problem: the interior bisector of the angle A of a triangle.
function bisInterior(level, rng, opts) {
  for (let t = 0; t < 300; t++) {
    const A = [q(rng.int(-4, 4)), q(rng.int(-4, 4))];
    const fa = rng.pick(NORMALS);
    const a = normalOf(rng, fa);
    const b = normalOf(rng, fa === NORMALS[3] ? rng.pick(NORMALS.slice(0, 3)) : rng.pick(NORMALS));
    // Directions of AB and AC: the normals turned (whole norms), times 1 or 2.
    const k1 = rng.int(1, 2);
    const k2 = rng.int(1, 2);
    const u = [a.n[1].neg(), a.n[0]].map((x) => x.mul(k1));
    const w = [b.n[1].neg(), b.n[0]].map((x) => x.mul(k2));
    if (det2(u, w).n === 0) continue;
    const B = add(A, u);
    const C = add(A, w);
    if ([...B, ...C].some((x) => Math.abs(x.valueOf()) > 12)) continue;
    const r1 = rowThrough(a.n, A);
    const r2 = rowThrough(b.n, A);
    const N1 = a.N; const N2 = b.N;
    const s1 = prim(r1.map((x, i) => x.mul(N2).sub(r2[i].mul(N1))), true);
    const s2 = prim(r1.map((x, i) => x.mul(N2).add(r2[i].mul(N1))), true);
    if ([...s1, ...s2, ...r1, ...r2].some((x) => Math.abs(x.valueOf()) > 60)) continue;
    // Interior: B and C on either side.
    const side = (r, P) => dot(r.slice(0, 2), P).add(r[2]).valueOf();
    const interior = side(s1, B) * side(s1, C) < 0 ? s1 : s2;
    const exterior = interior === s1 ? s2 : s1;
    const d = { r1, r2, N1, N2, plus: s1, minus: s2 };
    const steps = bisLinesSteps(d, 4).filter((s) => !s.decision);
    const label = (r) => readable(linT(r));
    return stepsItem({
      skill: BIS, level, subgoals: BIS_SUB, key: `${BIS}:int:${vt(A)}${vt(B)}${vt(C)}`, exam: opts.exam ? examTag(opts, 4) : false,
      prompt: `Le triangle ABC a pour sommets ${ptR('A', A)}, ${ptR('B', B)} et ${ptR('C', C)}. Donne une équation de la bissectrice intérieure de l'angle en A.`,
      parts: [
        { start: '(AB)', judge: { kind: 'geom', object: 'line2', ref: linT(r1) }, steps: [{ math: linT(r1), note: `Normale ${vr(r1.slice(0, 2))}, par A`, subgoal: 'line' }] },
        { html: 'La droite (AC) ?', ask: '(AC) :', start: '(AC)', judge: { kind: 'geom', object: 'line2', ref: linT(r2) }, steps: [{ math: linT(r2), note: `Normale ${vr(r2.slice(0, 2))}, par A`, subgoal: 'line' }] },
        { html: 'Les deux bissectrices de (AB) et (AC) ?', ask: 'bissectrices :', start: 'b', judge: { kind: 'geom', object: 'line2', count: 2, ref: pairT(s1, s2), bis: { r1: r1.map(qt), r2: r2.map(qt), N1, N2 } }, steps },
        { html: 'Laquelle est intérieure ?', ask: 'bissectrice intérieure :', start: 'b_A', judge: { kind: 'geom', object: 'line2', ref: linT(interior) },
          steps: [
            { decision: { prompt: 'La bissectrice intérieure sépare B et C. Laquelle est-ce ?', options: [
              { id: 'in', label: label(interior), valid: true, ref: true },
              { id: 'out', label: label(exterior), valid: false, why: `B et C sont du même côté de cette droite (même signe en remplaçant leurs coordonnées) : c'est la bissectrice extérieure.` },
            ] } },
            { math: linT(interior), note: 'Signes opposés en B et en C', subgoal: 'eq' },
          ] },
      ],
      hints: [], noHints: true,
    });
  }
  return bisItem(4, rng);
}

function bisExam(rng, exam) {
  if (exam === 'open') return bisItem(5, rng, { exam });
  if (exam === 'tf') {
    const st = rng.pick([
      ['Les deux bissectrices de deux droites sécantes sont perpendiculaires.', 'Vrai : leurs normales N₂n⃗₁ − N₁n⃗₂ et N₂n⃗₁ + N₁n⃗₂ ont un produit scalaire N₂²‖n⃗₁‖² − N₁²‖n⃗₂‖² = 0.'],
      ['Un point de la médiatrice de [AB] est à égale distance de A et de B.', 'Vrai : c\'est la définition de la médiatrice (MA = MB).'],
    ]);
    return tfG({ skill: BIS, key: `true:${st[0].length}`, truth: true, exam: examTag({ exam }), statement: st[0], explanation: st[1] });
  }
  const d = bisData(rng, { equal: false });
  const { r1, r2, plus, minus } = d;
  const un1 = prim(r1.map((x, i) => x.sub(r2[i])), true);
  const un2 = prim(r1.map((x, i) => x.add(r2[i])), true);
  return mcqD({
    skill: BIS, level: 4, key: `mcq:${linT(r1)}|${linT(r2)}`, exam: examTag({ exam }),
    prompt: `Quelles sont les bissectrices des droites d₁ : ${gR(linT(r1))} et d₂ : ${gR(linT(r2))} ?`,
    right: gR(pairT(plus, minus)),
    wrongs: [{ html: gR(pairT(un1, un2)), rule: 'g4_bisector_unnormalized' }, { html: gR(linT(plus)), rule: 'g4_bisector_one_sign' }],
    fillers: [{ html: gR(pairT(plus, [minus[0], minus[1], minus[2].add(1)])) }, { html: gR(pairT([plus[1], plus[0], plus[2]], minus)) }],
    solution: [{ html: `|${readable(absT(r1))}|/${d.N1} = |${readable(absT(r2))}|/${d.N2}, d'où ${gR(pairT(plus, minus))}.`, note: '' }],
    fallback: d.fallback,
  }, rng);
}

export const GEN = {
  [L2]: (level, rng, profile, opts = {}) => (opts.exam ? line2Exam(rng, opts.exam) : line2Item(level, rng)),
  [BIS]: (level, rng, profile, opts = {}) => (opts.exam ? bisExam(rng, opts.exam) : bisItem(level, rng)),
};

export { isPrim };

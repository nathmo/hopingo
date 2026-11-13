// Generators of module G4, part a (step U5): lines of space (g4-line3),
// planes (g4-plane) and relative positions (g4-relative-pos). Catalogue:
// docs/universite/G-gymnase-2.md, G4. Judges: geom (line3, plane), vector
// (a normal vector, any nonzero multiple; a point), solset (a parameter, the
// constant d), value (s, t of a system; a third equation).

import {
  q, qt, fq, nz, H, add, sub, scale, dot, cross, vt, vr, ptR, linT, paramT, sumT, readable, prim, isZero, colinear,
  mcqD, tfG, examTag, geoCounter, GML,
} from './geo-kit.js';
import { stepsItem, par, coordT, rowThrough, minusT, orthoOf, vecInt, isPrim, substT } from './geoan-a-kit.js';
import { Q } from '../../math/rational.js';
import { t } from '../../i18n.js';

const g3 = (t) => GML(t, 3);
const rows2T = (r1, r2) => `${linT(r1)} ; ${linT(r2)}`;

// A direction of space: whole, primitive, in [−3 ; 3]³; zeros: a zero component wanted.
function dirOf(rng, zeros = false) {
  for (let t = 0; t < 200; t++) {
    const v = vecInt(rng, 3, -3, 3);
    if (isZero(v) || !isPrim(v)) continue;
    const z = v.filter((x) => x.n === 0).length;
    if (zeros ? z !== 1 : z !== 0) continue;
    return v;
  }
  return [q(2), q(1), q(-1)];
}
// Two independent planes through A containing the direction v (whole normals).
function planesOf(v, A) {
  const ws = orthoOf(v);
  const n1 = ws[0];
  const n2 = ws.find((w) => !colinear(w, n1));
  return [rowThrough(n1, A), rowThrough(n2, A)];
}

// ======================================================================
// g4-line3
// ======================================================================

const L3 = 'g4-line3';
const L3_SUB = [
  { id: 'param', label: t('paramétrique'), skill: 'g4-line2' },
  { id: 'elim', label: t('éliminer t (deux fois)'), skill: L3 },
];
const L3_MENU = [
  { id: 'param', label: t('Écrire la paramétrique A + t·v⃗'), valid: true },
  { id: 'elim', label: t('Éliminer t (deux équations)'), valid: true },
  { id: 'free', label: t('Poser z = t (sens inverse)'), valid: true },
  { id: 'one', label: t('Une seule équation suffit'), valid: false, rule: 'g4_line3_one_equation', why: t('Une seule équation en x, y, z décrit un plan : il en faut deux pour une droite.') },
];
// (x − 1)/2 = (y + 2)/1 = (z − 3)/(−1).
const symT = (A, v) => ['x', 'y', 'z'].map((c, i) => `(${minusT(c, A[i])})/${par(v[i])}`).join(' = ');

function line3Item(level, rng, opts = {}) {
  if (level === 5 || opts.exam === 'open') return line3Problem(level, rng, opts);
  const gab = level <= 2 ? 'dir' : rng.pick(['dir', 'two', 'planes']);
  const zeros = level >= 3 && rng.chance(0.25);
  const v = dirOf(rng, zeros);
  const A = vecInt(rng, 3, -5, 5);
  const [r1, r2] = planesOf(v, A);
  const ref = paramT(A, [v]);
  const l3 = { rows: [r1, r2].map((r) => r.map(qt)), A: A.map(qt) };
  if (gab === 'planes') {
    // Planes given (a combination, to hide the work), the parametric asked.
    const s1 = prim(r1.map((x, i) => x.add(r2[i])));
    const prompt = t('La droite d est l\'intersection des plans {v1} et {v2}. Donne une représentation paramétrique de d.', { v1: g3(linT(s1)), v2: g3(linT(r2)) });
    return stepsItem({
      skill: L3, level, subgoals: L3_SUB, key: `${L3}:planes:${vt(A)}${vt(v)}`, prompt,
      parts: [{ start: 'd', judge: { kind: 'geom', object: 'line3', ref, form: 'param', l3 }, menu: L3_MENU,
        steps: [
          { math: rows2T(s1, r2), note: t('Le système des deux plans'), subgoal: 'elim', upTo: 3 },
          { math: ref, note: t('Un point {v1} (une inconnue fixée) ; une direction orthogonale aux deux normales : {v2}', { v1: ptR('A', A), v2: vr(v) }), subgoal: 'param' },
        ] }],
      hints: H(t('Fixe une inconnue (z = t, ou une valeur), résous les deux autres : un point et une direction.'), `(x ; y ; z) = ${vr(A)} + t(□ ; □ ; □)`, g3(ref)),
    });
  }
  const B = add(A, v);
  const prompt = gab === 'two'
    ? t('Donne deux équations cartésiennes de la droite d passant par {v1} et {v2}.', { v1: ptR('A', A), v2: ptR('B', B) })
    : t('Donne deux équations cartésiennes de la droite d passant par {v1}, de direction v⃗ = {v2}.', { v1: ptR('A', A), v2: vr(v) });
  const steps = [];
  if (gab === 'two') steps.push({ note: t('Une direction : AB⃗ = {v1}.', { v1: vr(v) }) });
  steps.push({ math: ref, note: t('Paramétrique'), subgoal: 'param', blank: [qt(A[0])], blank2: [vt(A)] });
  if (!zeros) steps.push({ math: symT(A, v), note: t('Isoler t dans chaque coordonnée'), subgoal: 'elim', blank: [par(v[0])], blank2: [par(v[0]), par(v[1]), par(v[2])] });
  steps.push({ math: rows2T(r1, r2), note: zeros ? t('Une composante de v⃗ est nulle : cette coordonnée est constante') : t('Deux égalités, deux équations'), subgoal: 'elim' });
  return stepsItem({
    skill: L3, level, subgoals: L3_SUB, key: `${L3}:${gab}:${vt(A)}${vt(v)}`, prompt,
    parts: [{ start: 'd', judge: { kind: 'geom', object: 'line3', ref, form: 'cartesian', l3 }, menu: L3_MENU, steps }],
    hints: H(t('Isole t dans chaque coordonnée, puis égale deux à deux : deux équations.'), zeros ? t('La coordonnée dont la composante est nulle est constante.') : t('({v1})/{v2} = ({v3})/{v4}, donc …', { v1: readable(minusT('x', A[0])), v2: par(v[0]).replace(/-/g, '−'), v3: readable(minusT('y', A[1])), v4: par(v[1]).replace(/-/g, '−') }), g3(rows2T(r1, r2))),
  });
}

// Level 5: the line through M parallel to a line given by two planes.
function line3Problem(level, rng, opts) {
  const v = dirOf(rng, false);
  const P = vecInt(rng, 3, -4, 4);
  const [r1, r2] = planesOf(v, P);
  const s1 = prim(r1.map((x, i) => x.add(r2[i])));
  const M = vecInt(rng, 3, -5, 5);
  const ref = paramT(M, [v]);
  const n1 = s1.slice(0, 3);
  const n2 = r2.slice(0, 3);
  return stepsItem({
    skill: L3, level, subgoals: L3_SUB, key: `${L3}:pb:${vt(M)}${vt(v)}${linT(s1)}`, noHints: true, hints: [],
    exam: opts.exam ? examTag(opts, 4) : false,
    prompt: t('La droite g est l\'intersection des plans {v1} et {v2}. Donne une représentation paramétrique de la droite d parallèle à g passant par {v3}.', { v1: g3(linT(s1)), v2: g3(linT(r2)), v3: ptR('M', M) }),
    parts: [
      { start: 'v', judge: { kind: 'vector', expect: vt(v), multiple: true },
        steps: [{ math: vt(v), note: t('v⃗ orthogonal aux normales {v1} et {v2} : un système à deux équations', { v1: vr(n1), v2: vr(n2) }), subgoal: 'elim' }] },
      { html: t('La droite d ?'), ask: 'd :', start: 'd', judge: { kind: 'geom', object: 'line3', ref, form: 'any' },
        steps: [{ math: ref, note: t('Par M, de direction v⃗'), subgoal: 'param' }] },
    ],
  });
}

function line3Exam(rng, exam) {
  if (exam === 'open') return line3Item(5, rng, { exam });
  const v = dirOf(rng);
  const A = vecInt(rng, 3, -4, 4);
  const [r1, r2] = planesOf(v, A);
  if (exam === 'tf') {
    const P = add(A, cross(r1.slice(0, 3), v));
    return tfG({
      skill: L3, key: `one:${linT(r1)}`, truth: false, exam: examTag({ exam }), ruleIfTrue: 'g4_line3_one_equation',
      statement: t('La droite d de représentation {v1} est décrite par la seule équation {v2}.', { v1: g3(paramT(A, [v])), v2: g3(linT(r1)) }),
      counter: geoCounter('pointOnPlaneOffLine', [['P', t('un point P de ce plan, hors de d =')]], { P: vt(P) }, { row: r1.map(Number), A: A.map(Number), v: v.map(Number) }),
      explanation: t('Faux : une seule équation décrit un plan. Par exemple {v1} la vérifie, mais n\'est pas sur d.', { v1: ptR('P', P) }),
    });
  }
  return mcqD({
    skill: L3, level: 4, key: `mcq:${vt(A)}${vt(v)}`, exam: examTag({ exam }),
    prompt: t('Quelle description est celle de la droite passant par {v1}, de direction v⃗ = {v2} ?', { v1: ptR('A', A), v2: vr(v) }),
    right: g3(rows2T(r1, r2)),
    wrongs: [{ html: g3(linT(r1)), rule: 'g4_line3_one_equation' }, { html: g3(paramT(A, [r1.slice(0, 3)])), rule: 'g4_normal_as_direction' }],
    fillers: [{ html: g3(rows2T(r1, [r2[0], r2[1], r2[2], r2[3].add(1)])) }, { html: g3(paramT(v, [A])) }],
    solution: [{ html: t('{v1}, puis on élimine t : {v2}', { v1: g3(paramT(A, [v])), v2: g3(rows2T(r1, r2)) }), note: '' }],
  }, rng);
}

// ======================================================================
// g4-plane
// ======================================================================

const PL = 'g4-plane';
const PL_SUB = [
  { id: 'dirs', label: t('directions du plan'), skill: 'g4-vectors' },
  { id: 'normal', label: t('résoudre le système de la normale'), skill: 'eq-systems' },
  { id: 'const', label: t('la constante d'), skill: PL },
  { id: 'eq', label: t('l\'équation cartésienne'), skill: PL },
];

function planeData(rng) {
  for (let t = 0; t < 300; t++) {
    const n = vecInt(rng, 3, -5, 5);
    if (isZero(n) || !isPrim(n) || n.filter((x) => x.n === 0).length > 1) continue;
    const ws = orthoOf(n);
    if (ws.length < 2) continue;
    const c = () => q(rng.int(-2, 2));
    const [a1, b1, a2, b2] = [c(), c(), c(), c()];
    const u = prim(add(scale(ws[0], a1), scale(ws[1], b1)));
    const v = prim(add(scale(ws[0], a2), scale(ws[ws.length - 1], b2)));
    if (isZero(u) || isZero(v) || colinear(u, v)) continue;
    if ([...u, ...v].some((x) => Math.abs(x.valueOf()) > 4)) continue;
    const A = vecInt(rng, 3, -4, 4);
    const row = rowThrough(n, A);
    if (Math.abs(row[3].valueOf()) > 40) continue;
    return { n: row.slice(0, 3), A, u, v, B: add(A, u), C: add(A, v), row };
  }
  const n = [q(4), q(-3), q(5)];
  return { n, A: [q(1), q(0), q(2)], u: [q(2), q(1), q(-1)], v: [q(-1), q(2), q(2)], B: [q(3), q(1), q(1)], C: [q(0), q(2), q(4)], row: [q(4), q(-3), q(5), q(-14)], fallback: true };
}

const PL_MENU = {
  normal: [
    { id: 'dirs', label: t('Deux directions du plan'), valid: true },
    { id: 'cond', label: t('Conditions n⃗·u⃗ = 0 et n⃗·v⃗ = 0'), valid: true },
    { id: 'pick', label: t('Choisir une solution non nulle'), valid: true },
    { id: 'sum', label: t('Prendre n⃗ = u⃗ + v⃗'), valid: false, rule: 'g4_normal_sum', why: t('u⃗ + v⃗ est dans le plan : il n\'est pas perpendiculaire au plan.') },
  ],
  const: [{ id: 'sub', label: t('Remplacer A dans ax + by + cz + d = 0'), valid: true }, { id: 'zero', label: t('Prendre d = 0'), valid: false, rule: 'g4_line_constant', why: t('Le plan doit passer par A : la constante se calcule avec A.') }],
  eq: [{ id: 'write', label: t('Écrire ax + by + cz + d = 0'), valid: true }],
};

function planeParts(D) {
  const { n, A, u, v, row } = D;
  const sys = `${readable(sumT([[u[0], 'a'], [u[1], 'b'], [u[2], 'c']]))} = 0 et ${readable(sumT([[v[0], 'a'], [v[1], 'b'], [v[2], 'c']]))} = 0`;
  const dEq = `${par(n[0])}·${par(A[0])} + ${par(n[1])}·${par(A[1])} + ${par(n[2])}·${par(A[2])} + d = 0`;
  const planeData = { A: A.map(qt), u: u.map(qt), v: v.map(qt) };
  return [
    { html: t('Directions : u⃗ = {v1}, v⃗ = {v2}. La normale n⃗ = (a ; b ; c) vérifie {sys}.', { v1: vr(u), v2: vr(v), sys }), start: 'n', judge: { kind: 'vector', expect: vt(n), multiple: true, planeData }, menu: PL_MENU.normal,
      steps: [
        { decision: { prompt: t('Comment trouver la normale ?'), options: [
          { id: 'sys', label: t('Résoudre n⃗·u⃗ = 0 et n⃗·v⃗ = 0'), valid: true, ref: true },
          { id: 'cross', label: t('Produit vectoriel u⃗ ∧ v⃗'), valid: false, why: t('Pas encore vu : résous le système.') },
          { id: 'sum', label: 'n⃗ = u⃗ + v⃗', valid: false, rule: 'g4_normal_sum', why: t('u⃗ + v⃗ est dans le plan, pas perpendiculaire.') },
        ] }, levels: [2] },
        { math: `n = ${vt(n)}`, note: t('Une solution non nulle du système'), subgoal: 'normal', blank: [qt(n[2])], blank2: [qt(n[1]), qt(n[2])] },
      ] },
    { html: t('n⃗ = {v1}. La constante d ?', { v1: vr(n) }), ask: 'd :', start: dEq, judge: { kind: 'solset', v: 'd', vars: ['d'] }, menu: PL_MENU.const,
      steps: [{ math: `d = ${qt(row[3])}`, note: t('A est dans le plan'), subgoal: 'const', blank: [qt(row[3])] }] },
    { html: t('d = {v1}. L\'équation du plan ?', { v1: fq(row[3]) }), ask: 'π :', start: 'π', judge: { kind: 'geom', object: 'plane', ref: linT(row), planeData }, menu: PL_MENU.eq,
      steps: [{ math: linT(row), note: t('Cartésienne'), subgoal: 'eq', blank: [qt(row[0])] }] },
  ];
}

function planeItem(level, rng, opts = {}) {
  const D = planeData(rng);
  const gab = level <= 2 ? 'three' : level === 5 || opts.exam ? 'line' : rng.pick(['three', 'dirs', 'line']);
  const { A, B, C, u, v } = D;
  const prompt = {
    three: t('Donne une équation cartésienne du plan passant par {v1}, {v2} et {v3}.', { v1: ptR('A', A), v2: ptR('B', B), v3: ptR('C', C) }),
    dirs: t('Donne une équation cartésienne du plan passant par {v1}, de directions u⃗ = {v2} et v⃗ = {v3}.', { v1: ptR('A', A), v2: vr(u), v3: vr(v) }),
    line: t('Donne une équation cartésienne du plan qui contient le point {v1} et la droite {v2}.', { v1: ptR('A', A), v2: g3(paramT(B, [v])) }),
  }[gab];
  const parts = planeParts(D);
  if (gab === 'three') parts[0].html = `AB⃗ = ${vr(u)}, AC⃗ = ${vr(v)}. ${parts[0].html.split('. ').slice(1).join('. ')}`;
  if (gab === 'line') parts[0].html = t('La droite passe par B{v1} avec la direction v⃗ = {v2} ; u⃗ = AB⃗ = {v3}. {v4}', { v1: vr(B), v2: vr(v), v3: vr(u), v4: parts[0].html.split('. ').slice(1).join('. ') });
  const last = level === 5 || opts.exam;
  return stepsItem({
    skill: PL, level, parts, subgoals: PL_SUB, key: `${PL}:${gab}:${vt(A)}${vt(u)}${vt(v)}`, prompt, fallback: D.fallback,
    noHints: last ? true : undefined,
    hints: last ? [] : H(t('La normale est orthogonale aux deux directions : n⃗·u⃗ = 0 et n⃗·v⃗ = 0.'), `n⃗ = (□ ; □ ; ${fq(D.n[2])})`, t('n⃗ = {v1}, puis {v2}', { v1: vr(D.n), v2: g3(linT(D.row)) })),
    exam: opts.exam ? examTag(opts, 4) : false,
  });
}

function planeExam(rng, exam) {
  if (exam === 'open') return planeItem(5, rng, { exam });
  if (exam === 'tf') {
    if (rng.chance(0.5)) {
      const A = vecInt(rng, 3, -3, 3);
      const w = dirOf(rng);
      return tfG({
        skill: PL, key: `aligned:${vt(A)}${vt(w)}`, truth: false, exam: examTag({ exam }),
        statement: t('Trois points distincts de l\'espace définissent toujours un plan unique.'),
        counter: geoCounter('threeAligned', [['A', 'A ='], ['B', 'B ='], ['C', 'C =']], { A: vt(A), B: vt(add(A, w)), C: vt(add(A, scale(w, 2))) }),
        explanation: t('Faux : trois points alignés, comme {v1}, {v2}, {v3}, sont dans une infinité de plans.', { v1: ptR('A', A), v2: ptR('B', add(A, w)), v3: ptR('C', add(A, scale(w, 2))) }),
      });
    }
    return tfG({ skill: PL, key: 'normal', truth: true, exam: examTag({ exam }), statement: t('Le vecteur (a ; b ; c) est normal au plan ax + by + cz + d = 0.'), explanation: t('Vrai : pour deux points P, Q du plan, a(x_Q − x_P) + b(y_Q − y_P) + c(z_Q − z_P) = 0.') });
  }
  const D = planeData(rng);
  const s = prim(add(D.u, D.v));
  return mcqD({
    skill: PL, level: 4, key: `mcq:${vt(D.A)}${vt(D.u)}${vt(D.v)}`, exam: examTag({ exam }),
    prompt: t('Quelle est une équation du plan passant par {v1}, {v2} et {v3} ?', { v1: ptR('A', D.A), v2: ptR('B', D.B), v3: ptR('C', D.C) }),
    right: g3(linT(D.row)),
    wrongs: [
      { html: g3(linT(rowThrough(s, D.A))), rule: 'g4_normal_sum' },
      D.row[3].n !== 0 ? { html: g3(linT([...D.n, D.row[3].neg()])), rule: 'g4_line_constant' } : null,
      D.row[3].n !== 0 ? { html: g3(linT([...D.n, q(0)])), rule: 'g4_line_constant' } : null,
    ],
    fillers: [{ html: g3(linT([...D.n, D.row[3].add(1)])) }, { html: g3(linT(rowThrough(prim(sub(D.u, D.v)), D.A))) }],
    solution: [{ html: t('n⃗ = {v1} (orthogonal à AB⃗ et AC⃗), puis d avec A : {v2}', { v1: vr(D.n), v2: g3(linT(D.row)) }), note: '' }],
    fallback: D.fallback,
  }, rng);
}

// ======================================================================
// g4-relative-pos
// ======================================================================

const RP = 'g4-relative-pos';
const RP_SUB = [
  { id: 'sub', label: t('substituer la droite dans le plan'), skill: RP },
  { id: 'sys', label: t('résoudre en s et t'), skill: 'eq-systems' },
  { id: 'plane', label: t('équation du plan'), skill: 'g4-plane' },
  { id: 'line', label: t('paramétrique de la droite'), skill: 'g4-line3' },
];
const RP_MENU = [
  { id: 'dirs', label: t('Comparer les directions'), valid: true },
  { id: 'sub', label: t('Substituer la droite dans le plan'), valid: true },
  { id: 'solve', label: t('Résoudre en s et t (deux équations)'), valid: true },
  { id: 'third', label: t('Vérifier la 3e équation'), valid: true },
  { id: 'same', label: t('Prendre le même paramètre pour les deux droites'), valid: false, rule: 'g4_param_same_letter', why: t('Avec la même lettre, on cherche deux mobiles au même instant ; le point commun peut être atteint à des instants différents.') },
];

// Line A + λu and plane n·X + d0 = 0: kind 'in' | 'par' | 'sec'.
function lpData(rng, kind) {
  for (let t = 0; t < 300; t++) {
    const n = vecInt(rng, 3, -3, 3);
    if (isZero(n) || !isPrim(n)) continue;
    const A = vecInt(rng, 3, -4, 4);
    let u;
    if (kind === 'sec') { u = dirOf(rng); if (dot(n, u).n === 0) continue; } else {
      const ws = orthoOf(n);
      u = prim(add(scale(ws[0], q(rng.int(-1, 1))), ws[ws.length - 1]));
      if (isZero(u) || u.some((x) => Math.abs(x.valueOf()) > 4)) continue;
    }
    const nu = dot(n, u);
    let d0;
    let l0 = null;
    if (kind === 'sec') {
      l0 = nz(rng, -3, 3);
      d0 = dot(n, add(A, scale(u, l0))).neg();
    } else d0 = dot(n, A).neg().add(kind === 'par' ? nz(rng, -6, 6) : 0);
    if (Math.abs(d0.valueOf()) > 30) continue;
    return { n, A, u, d0, nu, k: dot(n, A).add(d0), l0, row: [...n, d0], kind };
  }
  return lpData(rng, 'sec');
}

function lpParts(D) {
  const { n, A, u, row, nu, k, l0, kind } = D;
  const subst = substT(n, A, u, row[3], 'λ');
  const red = nu.n === 0 ? `0λ ${k.n < 0 ? '-' : '+'} ${qt(k.n < 0 ? k.neg() : k)} = 0` : `${sumT([[nu, 'λ'], [k, '']])} = 0`;
  const final = kind === 'in' ? 'ℝ' : kind === 'par' ? '∅' : `λ = ${l0}`;
  const opts = [
    { id: 'in', label: t('Vrai pour tout λ : d ⊂ α'), valid: kind === 'in', why: t('Il faudrait 0·λ = 0.') },
    { id: 'par', label: t('Aucun λ : d ∥ α (sans point commun)'), valid: kind === 'par', why: kind === 'in' ? t('0 = 0 est vrai pour tout λ : la droite est dans le plan.') : t('Il y a une solution λ : la droite coupe le plan.') },
    { id: 'sec', label: t('Une seule valeur de λ : d coupe α'), valid: kind === 'sec', why: t('Le coefficient de λ est nul : il n\'y a pas une seule solution.') },
  ].map((o) => ({ ...o, ref: o.valid || undefined }));
  const parts = [{
    start: subst, judge: { kind: 'solset', v: 'λ', vars: ['λ'] }, menu: RP_MENU,
    steps: [
      { math: red, note: t('Développer et réduire'), subgoal: 'sub', blank: [qt(nu)] },
      { decision: { prompt: t('Conclure : la droite et le plan sont…'), options: opts } },
      { math: final, note: kind === 'sec' ? t('Une solution') : kind === 'in' ? t('Tout λ convient') : t('Aucun λ'), subgoal: 'sub' },
    ],
  }];
  if (kind === 'sec') {
    const I = add(A, scale(u, l0));
    parts.push({ html: t('λ = {l0}. Le point d\'intersection ?', { l0 }), ask: 'I =', start: 'I', judge: { kind: 'vector', symbols: { A: vt(A), u: vt(u) }, expect: vt(I) },
      steps: [{ math: `I = A + ${par(l0)}·u`, note: '', subgoal: 'line', upTo: 3 }, { math: `I = ${vt(I)}`, note: t('Remplacer λ'), subgoal: 'line' }] });
  }
  return parts;
}

// Lines A + s·u and B + t·v: kind 'sec' | 'skew' | 'par' | 'same'.
function llData(rng, kind) {
  for (let t = 0; t < 300; t++) {
    const A = vecInt(rng, 3, -4, 4);
    const u = dirOf(rng);
    let v;
    let B;
    let s0 = null;
    let t0 = null;
    if (kind === 'par' || kind === 'same') {
      v = scale(u, rng.pick([1, -1, 2]));
      B = kind === 'same' ? add(A, scale(u, nz(rng, -2, 2))) : add(A, vecInt(rng, 3, -2, 2));
      if (kind === 'par' && colinear(sub(B, A), u)) continue;
    } else {
      v = dirOf(rng);
      if (colinear(u, v)) continue;
      s0 = nz(rng, -3, 3);
      t0 = nz(rng, -3, 3);
      B = sub(add(A, scale(u, s0)), scale(v, t0));
      if (kind === 'skew') {
        B = add(B, prim(cross(u, v)));
        if (dot(sub(B, A), cross(u, v)).n === 0) continue;
      }
    }
    if (B.some((x) => Math.abs(x.valueOf()) > 9)) continue;
    // Two coordinates i, j with u_i v_j − u_j v_i ≠ 0 (the system in s, t).
    const pairs = [[0, 1], [0, 2], [1, 2]];
    const ij = pairs.find(([i, j]) => u[i].mul(v[j]).sub(u[j].mul(v[i])).n !== 0) ?? null;
    let sol = null;
    if (ij) {
      const [i, j] = ij;
      // s·u_i − t·v_i = B_i − A_i (Cramer).
      const det = u[i].mul(v[j].neg()).sub(u[j].mul(v[i].neg()));
      const bi = B[i].sub(A[i]);
      const bj = B[j].sub(A[j]);
      const s = bi.mul(v[j].neg()).sub(bj.mul(v[i].neg())).div(det);
      const tt = u[i].mul(bj).sub(u[j].mul(bi)).div(det);
      if (s.d !== 1 || tt.d !== 1) continue;
      const k = [0, 1, 2].find((x) => x !== i && x !== j);
      const diff = A[k].add(u[k].mul(s)).sub(B[k].add(v[k].mul(tt)));
      sol = { i, j, k, s, t: tt, diff };
    }
    return { A, u, B, v, kind, sol, s0, t0 };
  }
  return llData(rng, 'sec');
}

const eqT = (A, u, B, v, i, s = 's', t = 't') => `${readable(sumT([[A[i], ''], [u[i], s]]))} = ${readable(sumT([[B[i], ''], [v[i], t]]))}`;

function llParts(D) {
  const { A, u, B, v, kind, sol } = D;
  const parallel = kind === 'par' || kind === 'same';
  const dirDec = { decision: { prompt: t('Les directions {v1} et {v2} sont-elles colinéaires ?', { v1: vr(u), v2: vr(v) }), options: [
    { id: 'col', label: t('Oui'), valid: parallel, ref: parallel || undefined, why: t('Aucun réel k ne donne v⃗ = k·u⃗.') },
    { id: 'noncol', label: t('Non'), valid: !parallel, ref: !parallel || undefined, why: t('v⃗ est un multiple de u⃗ : elles sont colinéaires.') },
  ] } };
  if (parallel) {
    // Is B on d₁? s from one coordinate, then the others.
    const i = [0, 1, 2].find((x) => u[x].n !== 0);
    const s = B[i].sub(A[i]).div(u[i]);
    const k = [0, 1, 2].find((x) => x !== i && u[x].n !== 0) ?? [0, 1, 2].find((x) => x !== i);
    const diff = A[k].add(u[k].mul(s)).sub(B[k]);
    const expr = `${par(A[k])} + ${par(u[k])}·${par(s)} - ${par(B[k])}`;
    return [
      { html: t('Un point de d₂ est-il sur d₁ ? Cherche s tel que A + s·u⃗ ait la coordonnée n° {v1} de B : {v2} = {v3}.', { v1: i + 1, v2: readable(sumT([[A[i], ''], [u[i], 's']])), v3: fq(B[i]) }), start: 's', judge: { kind: 'value', expect: qt(s) },
        steps: [dirDec, { math: qt(s), note: t('Une seule coordonnée'), subgoal: 'sys' }] },
      { html: t('s = {v1}. Les autres coordonnées de A + s·u⃗ et de B sont-elles égales ? Calcule la différence pour la coordonnée n° {v2}.', { v1: fq(s), v2: k + 1 }), ask: t('différence ='), start: expr, judge: { kind: 'value', expect: qt(diff) },
        steps: [
          { math: `${qt(A[k].add(u[k].mul(s)))} - ${par(B[k])}`, note: t('Chaque membre'), subgoal: 'sys' },
          { decision: { prompt: t('Les droites sont…'), options: [
            { id: 'same', label: t('confondues (B est sur d₁)'), valid: kind === 'same', ref: kind === 'same' || undefined, why: t('B n\'est pas sur d₁ : une coordonnée ne correspond pas.') },
            { id: 'par', label: t('parallèles distinctes'), valid: kind === 'par', ref: kind === 'par' || undefined, why: t('B est sur d₁ : les droites sont confondues.') },
          ] } },
          { math: qt(diff), note: diff.n === 0 ? t('Nulle : B est sur d₁') : t('Non nulle : B n\'est pas sur d₁'), subgoal: 'sys' },
        ] },
    ];
  }
  const { i, j, k, s, t: t0, diff } = sol;
  const sysT = `${eqT(A, u, B, v, i)} et ${eqT(A, u, B, v, j)}`;
  const expr = `${par(A[k])} + ${par(u[k])}·${par(s)} - (${par(B[k])} + ${par(v[k])}·${par(t0)})`;
  const parts = [
    { html: t('Le système A + s·u⃗ = B + t·v⃗, deux paramètres différents. Ses deux premières équations utiles : {sysT}. Que vaut s ?', { sysT }), start: 's', judge: { kind: 'value', expect: qt(s) }, menu: RP_MENU,
      steps: [dirDec, { math: qt(s), note: t('Combinaison des deux équations'), subgoal: 'sys', blank: [qt(s)] }] },
    { html: t('s = {v1}. Et t ?', { v1: fq(s) }), ask: 't =', start: 't', judge: { kind: 'value', expect: qt(t0) }, menu: RP_MENU,
      steps: [{ math: qt(t0), note: '', subgoal: 'sys', blank: [qt(t0)] }] },
    { html: t('Vérifie la 3e équation : x_{v1}(A + s·u⃗) − x_{v1}(B + t·v⃗) = ?', { v1: k + 1 }), ask: t('différence ='), start: expr, judge: { kind: 'value', expect: qt(diff) }, menu: RP_MENU,
      steps: [
        { math: `${qt(A[k].add(u[k].mul(s)))} - ${par(B[k].add(v[k].mul(t0)))}`, note: t('Chaque membre'), subgoal: 'sys' },
        { decision: { prompt: t('La 3e équation décide. Les droites sont…'), options: [
          { id: 'sec', label: t('sécantes (3e équation vérifiée)'), valid: kind === 'sec', ref: kind === 'sec' || undefined, rule: kind === 'skew' ? 'g4_skew_as_secant' : undefined, why: t('La 3e équation n\'est pas vérifiée : pas de point commun. Dans l\'espace, deux droites non parallèles peuvent être gauches.') },
          { id: 'skew', label: t('gauches (3e équation fausse)'), valid: kind === 'skew', ref: kind === 'skew' || undefined, why: t('La 3e équation est vérifiée : s et t donnent un point commun.') },
        ] } },
        { math: qt(diff), note: diff.n === 0 ? t('Vérifiée : sécantes') : t('{v1} ≠ 0 : gauches', { v1: fq(diff) }), subgoal: 'sys', blank: [qt(diff)] },
      ] },
  ];
  if (kind === 'sec') {
    const I = add(A, scale(u, s));
    parts.push({ html: t('Les droites sont sécantes. Le point commun ?'), ask: 'I =', start: 'I', judge: { kind: 'vector', symbols: { A: vt(A), u: vt(u) }, expect: vt(I) }, menu: RP_MENU,
      steps: [{ math: `I = ${vt(I)}`, note: 'A + s·u⃗', subgoal: 'line' }] });
  }
  return parts;
}

// Two planes: the line of intersection (parametric).
function ppParts(rng) {
  const v = dirOf(rng);
  const A = vecInt(rng, 3, -4, 4);
  const [r1, r2] = planesOf(v, A);
  return { r1, r2, parts: [{ start: 'd', judge: { kind: 'geom', object: 'line3', ref: paramT(A, [v]), form: 'param' }, menu: RP_MENU,
    steps: [
      { decision: { prompt: t('Les normales {v1} et {v2} sont-elles colinéaires ?', { v1: vr(r1.slice(0, 3)), v2: vr(r2.slice(0, 3)) }), options: [{ id: 'no', label: t('Non : les plans se coupent selon une droite'), valid: true, ref: true }, { id: 'yes', label: t('Oui : parallèles'), valid: false, why: t('Les normales ne sont pas proportionnelles.') }] } },
      { math: paramT(A, [v]), note: t('Un point commun {v1} ; une direction orthogonale aux deux normales', { v1: ptR('A', A) }), subgoal: 'line' },
    ] }], A, v };
}

const RP_TEXT = {
  lp: (D) => t('On donne la droite d : {v1} et le plan α : {v2}. Quelle est leur position relative ? Donne le point commun s\'il y en a un seul.', { v1: g3(paramT(D.A, [D.u], ['λ'])), v2: g3(linT(D.row)) }),
  ll: (D) => t('On donne les droites d₁ : {v1} et d₂ : {v2}. Quelle est leur position relative ?', { v1: g3(paramT(D.A, [D.u], ['s'])), v2: g3(paramT(D.B, [D.v], ['t'])) }),
};

function rpItem(level, rng, opts = {}) {
  let kind;
  if (level === 1) kind = 'lp';
  else if (level === 2) kind = 'll';
  else if (level === 3) kind = rng.pick(['lp', 'll']);
  else kind = rng.pick(['lp', 'll', 'll', 'pp']);
  if (level === 5 || opts.exam) return rpProblem(level, rng, opts);
  let parts;
  let prompt;
  let key;
  let hint;
  if (kind === 'lp') {
    const D = lpData(rng, level <= 2 ? rng.pick(['in', 'par', 'sec']) : rng.pick(['in', 'par', 'sec', 'sec']));
    parts = lpParts(D);
    prompt = RP_TEXT.lp(D);
    key = `lp:${D.kind}:${vt(D.A)}${vt(D.u)}${linT(D.row)}`;
    hint = [t('Remplace x, y, z de la droite dans l\'équation du plan.'), t('{v1}, donc □·λ + □ = 0', { v1: parts[0].start.replace(/-/g, '−') }), t('Le coefficient de λ et la constante disent la position.')];
  } else if (kind === 'll') {
    const D = llData(rng, level === 2 ? rng.pick(['sec', 'skew']) : rng.pick(['sec', 'skew', 'skew', 'par', 'same']));
    parts = llParts(D);
    prompt = RP_TEXT.ll(D);
    key = `ll:${D.kind}:${vt(D.A)}${vt(D.u)}${vt(D.B)}${vt(D.v)}`;
    hint = [t('Compare d\'abord les directions ; sinon résous A + s·u⃗ = B + t·v⃗ avec deux paramètres différents.'), t('Deux équations donnent s et t, la troisième décide.'), t('Si la 3e équation n\'est pas vérifiée : droites gauches.')];
  } else {
    const P = ppParts(rng);
    parts = P.parts;
    prompt = t('Donne une représentation paramétrique de la droite d\'intersection des plans {v1} et {v2}.', { v1: g3(linT(P.r1)), v2: g3(linT(P.r2)) });
    key = `pp:${linT(P.r1)}${linT(P.r2)}`;
    hint = [t('Fixe une inconnue, résous les deux autres : un point ; puis une direction orthogonale aux deux normales.'), `(x ; y ; z) = ${vr(P.A)} + t(□ ; □ ; □)`, g3(paramT(P.A, [P.v]))];
  }
  return stepsItem({ skill: RP, level, parts, prompt, subgoals: RP_SUB, key: `${RP}:${key}`, hints: H(...hint) });
}

// Level 5 (MAN 2A Q1 modified): is P on d? Is d in the plane α?
function rpProblem(level, rng, opts) {
  const kind = rng.pick(['in', 'par', 'sec']);
  const D = lpData(rng, kind);
  const on = rng.chance(0.5);
  const lam = nz(rng, -3, 3);
  const off = colinear(D.u, [q(0), q(0), q(1)]) ? [q(1), q(0), q(0)] : [q(0), q(0), q(nz(rng, -2, 2))];
  const P = on ? add(D.A, scale(D.u, lam)) : add(add(D.A, scale(D.u, lam)), off);
  const i = [0, 1, 2].find((x) => D.u[x].n !== 0);
  const s = P[i].sub(D.A[i]).div(D.u[i]);
  const others = [0, 1, 2].filter((x) => x !== i);
  const diffs = others.map((k) => D.A[k].add(D.u[k].mul(s)).sub(P[k]));
  const onLine = diffs.every((x) => x.n === 0);
  const k = others.find((x) => diffs[others.indexOf(x)].n !== 0) ?? others[0];
  const diff = diffs[others.indexOf(k)];
  const parts = [
    { start: 'λ_P', judge: { kind: 'value', expect: qt(s) },
      steps: [{ math: qt(s), note: t('Coordonnée n° {v1} : {v2} = {v3}', { v1: i + 1, v2: readable(sumT([[D.A[i], ''], [D.u[i], 'λ']])), v3: fq(P[i]) }), subgoal: 'sys' }] },
    { html: t('λ = {v1}. Différence pour la coordonnée n° {v2} entre A + λ·u⃗ et P ?', { v1: fq(s), v2: k + 1 }), ask: t('différence ='), start: `${par(D.A[k])} + ${par(D.u[k])}·${par(s)} - ${par(P[k])}`, judge: { kind: 'value', expect: qt(diff) },
      steps: [
        { decision: { prompt: t('La droite d passe-t-elle par P ?'), options: [
          { id: 'yes', label: t('Oui'), valid: onLine, ref: onLine || undefined, why: t('Une coordonnée ne correspond pas.') },
          { id: 'no', label: t('Non'), valid: !onLine, ref: !onLine || undefined, why: t('Toutes les coordonnées correspondent.') },
        ] } },
        { math: qt(diff), note: onLine ? t('Nulle (et les autres aussi)') : t('Non nulle'), subgoal: 'sys' },
      ] },
    ...lpParts(D).map((p, n) => (n === 0 ? { ...p, html: t('Est-elle contenue dans α ? Substitue d dans α.'), ask: t('équation en λ :') } : p)),
  ];
  return stepsItem({
    skill: RP, level, parts, subgoals: RP_SUB, key: `${RP}:pb:${vt(D.A)}${vt(D.u)}${linT(D.row)}${vt(P)}`, noHints: true, hints: [],
    exam: opts.exam ? examTag(opts, 4) : false,
    prompt: t('On donne la droite d : {v1}, le point {v2} et le plan α : {v3}. La droite d passe-t-elle par P ? Est-elle contenue dans α ? Sinon, la coupe-t-elle ?', { v1: g3(paramT(D.A, [D.u], ['λ'])), v2: ptR('P', P), v3: g3(linT(D.row)) }),
  });
}

const POS = { sec: t('sécantes'), skew: t('gauches'), par: t('parallèles distinctes'), same: t('confondues') };
const POS_SENTENCE = {
  sec: () => t('Les droites sont sécantes.'), skew: () => t('Les droites sont gauches.'),
  par: () => t('Les droites sont parallèles distinctes.'), same: () => t('Les droites sont confondues.'),
};
function rpExam(rng, exam) {
  if (exam === 'open') return rpItem(5, rng, { exam });
  if (exam === 'tf') {
    const D = llData(rng, 'skew');
    return tfG({
      skill: RP, key: `skew:${vt(D.A)}${vt(D.u)}${vt(D.B)}${vt(D.v)}`, truth: false, exam: examTag({ exam }), ruleIfTrue: 'g4_skew_as_secant',
      statement: t('Deux droites de l\'espace qui ne sont pas parallèles sont sécantes.'),
      counter: geoCounter('skewLines', [['A', t('un point A de d₁ =')], ['u', t('une direction u⃗ de d₁ =')], ['B', t('un point B de d₂ =')], ['v', t('une direction v⃗ de d₂ =')]], { A: vt(D.A), u: vt(D.u), B: vt(D.B), v: vt(D.v) }),
      explanation: t('Faux : d₁ par {v1} de direction {v2} et d₂ par {v3} de direction {v4} ne sont pas parallèles, et le système A + s·u⃗ = B + t·v⃗ n\'a pas de solution : elles sont gauches.', { v1: ptR('A', D.A), v2: vr(D.u), v3: ptR('B', D.B), v4: vr(D.v) }),
    });
  }
  const kind = rng.pick(['sec', 'skew', 'skew', 'par', 'same']);
  const D = llData(rng, kind);
  const sameLetter = kind === 'sec' ? 'skew' : null;
  return mcqD({
    skill: RP, level: 4, key: `mcq:${kind}:${vt(D.A)}${vt(D.u)}${vt(D.B)}${vt(D.v)}`, exam: examTag({ exam }),
    prompt: `${RP_TEXT.ll(D)}`,
    right: POS[kind],
    wrongs: Object.keys(POS).filter((k) => k !== kind).map((k) => ({ html: POS[k], rule: kind === 'skew' && k === 'sec' ? 'g4_skew_as_secant' : k === sameLetter ? 'g4_param_same_letter' : null })),
    solution: [{ html: POS_SENTENCE[kind](), note: '' }],
  }, rng);
}

export const GEN = {
  [L3]: (level, rng, profile, opts = {}) => (opts.exam ? line3Exam(rng, opts.exam) : line3Item(level, rng)),
  [PL]: (level, rng, profile, opts = {}) => (opts.exam ? planeExam(rng, opts.exam) : planeItem(level, rng)),
  [RP]: (level, rng, profile, opts = {}) => (opts.exam ? rpExam(rng, opts.exam) : rpItem(level, rng)),
};

export { Q, readable };

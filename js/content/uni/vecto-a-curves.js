// v-curve-param, v-line-scalar, v-line-vector (module V, part a, step
// U10): oriented parametrisations, ∫ f dl and the work ∫ F · dl.
// Catalogue: docs/universite/VCF-analyse-3-4.md.
//
// Parts: `param` (the curve and its bounds; the judge names the reversed
// orientation and the wrong bounds itself, the radius R² comes from
// cfg.traps), `vector` for γ′(t) (params t), `equiv` in t for |γ′(t)|, and
// `definite` for the integral: its start is a letter (I, L, W) whose exact
// value the generator gives (cfg.known), so the first line is the integral
// the student sets up. cfg.traps holds the wrong integrals (without
// |γ′(t)|, with it in a work, with γ instead of γ′, sign of sin t cosᵏt).

import {
  T, sum, text, randPoly, ML, tupML, fieldML, d as dS, isZero,
  vParts, mcqD, opt, decision, act, H, examTag, q, fq,
} from './vecto-a-kit.js';
import {
  segment, axisSeg, arc, graph, ellipse, helix, squareCurve, paramBlanks, compose, ptext, pmul, padd, pscale,
  integrate, vText, vR, vadd, vscale, vzero, veq, vnum, pc, pt,
} from './vecto-a-curve-kit.js';
import { LML } from './geo-kit.js';
import { t } from '../../i18n.js';

const CP = 'v-curve-param';
const LS = 'v-line-scalar';
const LV = 'v-line-vector';
const tup = (xs) => `(${xs.join(' ; ')})`;
const SUBN = ['₁', '₂', '₃', '₄'];

// ---------- parts ----------

export function paramPart(c, level, { html = null, ask = 'γ(t) =', name = 'Γ', rng = null } = {}) {
  const guided = level <= 2;
  // The judge names the reversed curve and the wrong bounds itself; only
  // the radius R² needs a candidate (each costs a comparison of curves).
  const traps = c.radius2 ? { v_radius_squared: [{ line: c.radius2, ctx: { R2: c.R * c.R, R: c.R } }] } : {};
  const judge = { ...c.judge, traps };
  // The first part of an item writes « γ = … » (the wrong line of the
  // content test moves the first bracket of the line).
  const lab = (x) => (html ? x : x.replace(/^γ\(t\) = /, 'γ = '));
  const pline = lab(c.pline);
  const full = lab(c.line);
  const lines = guided
    ? [
      { math: pline, note: t('La paramétrisation'), subgoal: 'param', pre1: paramBlanks(pline, [c.comps[0]]), pre2: paramBlanks(pline, c.comps) },
      { math: full, note: t('Les bornes : t parcourt Γ une fois, dans le bon sens'), subgoal: 'bounds', pre1: paramBlanks(full, [], true) },
    ]
    : [{ math: full, note: t('La paramétrisation et ses bornes'), subgoal: 'param' }];
  const show = (l) => LML(judge, l);
  const options = [
    act('right', show(c.line), true),
    act('rev', show(c.rev), false, { rule: 'v_orientation_reversed', why: t('Cette courbe est parcourue dans l\'autre sens.') }),
    act('bounds', show(c.bounds), false, { rule: 'v_param_bounds', why: t('Avec ces bornes, la courbe va trop loin.') }),
    ...(c.radius2 ? [act('r2', show(c.radius2), false, { rule: 'v_radius_squared', why: t('Le rayon est {R}, pas {a}.', { R: c.R, a: c.R * c.R }) })] : []),
  ];
  return { html, ask, start: name, judge, lines, menu: rng ? rng.shuffle(options) : options, baits: ['v_orientation_reversed', 'v_param_bounds'] };
}

export function derivPart(c, { html = t('La vitesse :'), ask = 'γ′(t) =' } = {}) {
  const line = `γ'(t) = ${tup(c.dT)}`;
  return {
    html, ask, start: "γ'(t)", judge: { kind: 'vector', params: ['t'], expect: tup(c.dT), form: 'any' },
    lines: [{ math: line, note: t('On dérive chaque composante'), subgoal: 'deriv', pre1: paramBlanks(line, [c.dT[0]]), pre2: paramBlanks(line, c.dT) }],
    menu: [act('derive', t('Dériver chaque composante en t')), act('norm', t('Prendre la norme de γ(t)'), false, { why: t('γ′(t) est un vecteur : on dérive chaque composante.') })],
  };
}

export function speedPart(c, { html = t('La norme de la vitesse :') } = {}) {
  const sq = c.dT.map((x) => `(${x})^2`).join('+');
  const expanded = ptext(c.dP.reduce((s, p) => padd(s, pmul(p, p)), pc(0)));
  const lo = Number(c.lo);
  const hi = Number(c.hi);
  const judge = { kind: 'equiv', vars: ['t'], domain: { t: [lo + (hi - lo) * 0.01, hi] }, target: 'goal', goal: c.speed };
  return {
    html, ask: '|γ′(t)| =', start: `sqrt(${sq})`, judge,
    lines: [
      { math: `sqrt(${expanded})`, note: t('On développe les carrés'), subgoal: 'speed' },
      { math: c.speed, note: t('On simplifie : c\'est la vitesse'), subgoal: 'speed', blank: [c.speed] },
    ],
    menu: [act('norm', t('Simplifier √(x′² + y′² …)')), act('sum', t('Additionner les composantes de γ′(t)'), false, { rule: 'a2_arc_sum_components', why: t('La vitesse est la norme du vecteur γ′(t), pas la somme de ses composantes.') })],
  };
}

// The integral part: start a letter of known value.
function intPart(letter, value, lines, { html, ask, traps = {}, menu, decisions } = {}) {
  return {
    html, ask, start: letter, judge: { kind: 'definite', vars: [letter], known: { [letter]: vText(value) }, traps },
    lines, menu, decisions,
  };
}
const intT = (body, c) => `int(${body}, t, ${c.loT}, ${c.hiT})`;
// f(γ(t)) as written: x, y, z replaced by the components.
const substT = (fText, c) => fText.replace(/[xyz]/g, (v) => `(${c.comps['xyz'.indexOf(v)]})`);
// F(γ(t)) · γ′(t) as written (terms with γᵢ′ = 0 left out).
const dotT = (FT, c) => FT.map((f, i) => (c.dT[i] === '0' ? null : `(${substT(f, c)})×(${c.dT[i]})`)).filter(Boolean).join('+') || '0';

// ---------- v-curve-param ----------

const CP_SUB = [
  { id: 'param', label: t('paramétrisation'), skill: CP },
  { id: 'bounds', label: t('bornes et sens'), skill: CP },
  { id: 'deriv', label: 'γ′(t)', skill: 'a2-curve-param' },
  { id: 'speed', label: '|γ′(t)|', skill: 'a2-curve-param' },
];
const TYPE_LABELS = {
  segment: t('Un segment : A + t(B − A), t ∈ [0 ; 1]'),
  arc: t('Un arc de cercle : c + R(cos t ; sin t)'),
  graph: t('Un graphe y = g(x) : (t ; g(t))'),
  ellipse: t('Une ellipse : (a cos t ; b sin t)'),
};
const typeDecision = (kind) => decision(t('Quel type de courbe ?'), Object.entries(TYPE_LABELS).map(([k, label]) => ({ id: k, label, valid: k === kind, ...(k === kind ? { ref: true } : { why: t('Regarde la forme de Γ dans l\'énoncé.') }) })), { levels: [2] });

function pickPt(rng) { return [rng.int(-2, 2), rng.int(-2, 2)]; }
function randCurve(rng, level) {
  const kinds = level === 1 ? ['segment', 'arc', 'arc'] : ['segment', 'arc', 'arc', 'graph', 'ellipse'];
  const kind = rng.pick(kinds);
  if (kind === 'segment') {
    for (;;) { const A = pickPt(rng); const B = pickPt(rng); if (A[0] !== B[0] || A[1] !== B[1]) return segment(A, B); }
  }
  if (kind === 'arc') {
    const R = rng.pick([2, 3, 2]);
    const c = level === 1 ? [0, 0] : rng.pick([[0, 0], [0, 0], pickPt(rng)]);
    return arc(c, R, rng.int(0, 3), rng.pick([1, 2, 4]), rng.chance(0.75) ? 1 : -1);
  }
  if (kind === 'graph') {
    const k = rng.pick([2, 3]);
    const [a, b] = rng.pick([[0, 1], [0, 2], [1, 0], [-1, 1], [2, 0]]);
    return graph(k, a, b);
  }
  const [a, b] = rng.pick([[3, 2], [2, 1], [3, 1], [1, 2]]);
  return ellipse(a, b, rng.pick([2, 4, 1]));
}
const NOTE_OF = {
  segment: t('Segment de A à B : γ(t) = A + t(B − A), t ∈ [0 ; 1].'),
  arc: t('Cercle de centre c et de rayon R : γ(t) = c + R(cos t ; sin t) dans le sens positif ; (cos t ; −sin t) dans le sens négatif.'),
  graph: t('Graphe y = g(x) : γ(t) = (t ; g(t)) ; pour aller dans l\'autre sens, on remplace t par a + b − t.'),
  ellipse: t('Ellipse x²/a² + y²/b² = 1 : γ(t) = (a cos t ; b sin t), sens positif.'),
  helix: t('Hélice : (cos t ; sin t) tourne autour de l\'axe z, et z monte proportionnellement à t.'),
};

function cpItem(level, rng, opts) {
  if (level === 4 && rng.chance(0.4)) return cpTriangle(level, rng, opts);
  if (level === 5) return cpBoundary(level, rng, opts);
  const c = level === 4 && rng.chance(0.3) ? helix(rng.pick([1, 2])) : randCurve(rng, level);
  const parts = [paramPart(c, level, { rng })];
  if (level <= 1) parts[0].notes = [NOTE_OF[c.kind]];
  if (level === 2 && TYPE_LABELS[c.kind]) parts[0].decisions = [typeDecision(c.kind)];
  parts.push(derivPart(c));
  if (c.speed && level !== 3) parts.push(speedPart(c));
  return vParts({
    skill: CP, level, parts, subgoals: CP_SUB, exam: examTag(opts),
    prompt: t('Paramètre {desc} : donne γ(t) avec ses bornes, puis γ′(t){a}.', { desc: c.desc, a: parts.length > 2 ? t(' et |γ′(t)|') : '' }),
    key: `${CP}:${level}:${c.line}`,
    hints: H(NOTE_OF[c.kind], `${LML(c.judge, c.pline)}, t ∈ [${c.loT.replace(/-/g, '−')} ; …]`, LML(c.judge, c.line)),
  });
}

function triangle(rng) {
  for (let tt = 0; tt < 200; tt++) {
    const P3 = [pickPt(rng), pickPt(rng), pickPt(rng)];
    const det = (P3[1][0] - P3[0][0]) * (P3[2][1] - P3[0][1]) - (P3[1][1] - P3[0][1]) * (P3[2][0] - P3[0][0]);
    if (det === 0 || Math.abs(det) < 3) continue;
    return det > 0 ? P3 : [P3[0], P3[2], P3[1]];
  }
  return [[0, 0], [2, 0], [0, 2]];
}
const ptR = (p) => `(${p.map(fq).join(' ; ')})`;

function cpTriangle(level, rng, opts) {
  const [A, B, C] = triangle(rng);
  const segs = [segment(A, B), segment(B, C), segment(C, A)];
  const parts = segs.map((c, i) => ({ ...paramPart(c, level, { rng, name: `Γ${SUBN[i]}`, ask: `Γ${SUBN[i]} : γ(t) =`, html: i ? t('Le côté Γ{a}, de {b} à {c} :', { a: SUBN[i], b: ['A', 'B', 'C'][i], c: ['B', 'C', 'A'][i] }) : null }) }));
  return vParts({
    skill: CP, level, parts, subgoals: CP_SUB, exam: examTag(opts),
    prompt: t('Paramètre le bord du triangle de sommets A{a}, B{b}, C{c}, parcouru dans le sens positif (le triangle à gauche) : un côté après l\'autre, de A à B, de B à C, puis de C à A.', { a: ptR(A), b: ptR(B), c: ptR(C) }),
    key: `${CP}:tri:${level}:${A}:${B}:${C}`,
    hints: H(t('Chaque côté est un segment : γ(t) = P + t(Q − P), t ∈ [0 ; 1].'), `Γ₁ : ${LML(segs[0].judge, segs[0].pline)}`, LML(segs[0].judge, segs[0].line)),
  });
}

// The positively oriented boundary of a domain, piece by piece, with γ′.
function boundaryPieces(rng) {
  const kind = rng.pick(['half', 'tri', 'annulus']);
  if (kind === 'half') {
    const R = rng.pick([1, 2, 3]);
    return { desc: t('du demi-disque D = {x² + y² ≤ {a}, y ≥ 0}', { a: R * R }), pieces: [[axisSeg('x', -R, R), t('le diamètre, de (−{R} ; 0) à ({R} ; 0)', { R })], [arc([0, 0], R, 0, 2, 1), t('le demi-cercle')]], key: `half${R}` };
  }
  if (kind === 'tri') {
    const [A, B, C] = triangle(rng);
    return { desc: t('du triangle de sommets A{a}, B{b}, C{c}', { a: ptR(A), b: ptR(B), c: ptR(C) }), pieces: [[segment(A, B), t('de A à B')], [segment(B, C), t('de B à C')], [segment(C, A), t('de C à A')]], key: `tri${A}${B}${C}` };
  }
  const [r1, r2] = rng.pick([[1, 2], [1, 3], [2, 3]]);
  return {
    desc: t('du quart de couronne D = {{a} ≤ x² + y² ≤ {b}, x ≥ 0, y ≥ 0}', { a: r1 * r1, b: r2 * r2 }),
    pieces: [[axisSeg('x', r1, r2), t('de ({r1} ; 0) à ({r2} ; 0)', { r1, r2 })], [arc([0, 0], r2, 0, 1, 1), t('le grand arc')], [axisSeg('y', r2, r1), t('de (0 ; {r2}) à (0 ; {r1})', { r2, r1 })], [arc([0, 0], r1, 1, 1, -1), t('le petit arc, dans le sens horaire')]],
    key: `ann${r1}${r2}`,
  };
}

function cpBoundary(level, rng, opts) {
  const B = boundaryPieces(rng);
  const parts = [];
  B.pieces.forEach(([c, label], i) => {
    parts.push(paramPart(c, level, { rng, name: `Γ${SUBN[i]}`, ask: `Γ${SUBN[i]} : γ(t) =`, html: i ? t('Γ{n}, {label} :', { n: SUBN[i], label }) : null }));
    parts.push(derivPart(c, { html: t('γ′ sur Γ{a} :', { a: SUBN[i] }), ask: 'γ′(t) =' }));
  });
  return vParts({
    skill: CP, level, parts, subgoals: CP_SUB, exam: examTag(opts), noHints: true,
    prompt: t('Paramètre le bord {desc}, orienté positivement (le domaine à gauche), morceau par morceau : {a}. Donne aussi γ′(t) sur chaque morceau.', { desc: B.desc, a: B.pieces.map(([, l], i) => `Γ${SUBN[i]} ${l}`).join(', ') }),
    key: `${CP}:bd:${B.key}`,
  });
}

function cpMcq(level, rng, opts) {
  const R = rng.pick([2, 3]);
  const c = arc(rng.pick([[0, 0], [0, 0], pickPt(rng)]), R, rng.int(0, 3), rng.pick([1, 2]), rng.chance(0.7) ? 1 : -1);
  const show = (l) => LML(c.judge, l);
  return mcqD({
    skill: CP, level, exam: examTag(opts), key: `${CP}:mcq:${c.line}`,
    prompt: t('Soit Γ {desc}. Quelle paramétrisation décrit Γ, parcourue de A à B ?', { desc: c.desc }),
    right: show(c.line),
    wrongs: [opt(show(c.rev), 'v_orientation_reversed'), opt(show(c.bounds), 'v_param_bounds'), opt(show(c.radius2), 'v_radius_squared')],
    solution: [{ html: t('{a} : en t = {b}, on est en A ; en t = {c}, en B, et la courbe tourne dans le bon sens.', { a: show(c.line), b: c.loT.replace(/-/g, '−'), c: c.hiT.replace(/-/g, '−') }), note: '' }],
  }, rng);
}

// ---------- v-line-scalar ----------

const LS_SUB = [
  { id: 'param', label: t('paramétrisation'), skill: CP },
  { id: 'speed', label: '|γ′(t)|', skill: LS },
  { id: 'integrand', label: 'f(γ(t))·|γ′(t)|', skill: LS },
  { id: 'value', label: t('intégrale en t'), skill: 'a1-int-direct' },
];
const LS_DECISION = decision(t('Que faut-il intégrer en t ?'), [
  { id: 'speed', label: t('f(γ(t))·|γ′(t)|, avec la vitesse (un nombre)'), valid: true, ref: true },
  { id: 'vec', label: 'f(γ(t))·γ′(t)', valid: false, why: t('γ′(t) est un vecteur : pour ∫ f dl, on multiplie par sa norme |γ′(t)|.') },
  { id: 'none', label: t('f(γ(t)) seul'), valid: false, rule: 'v_speed_forgot', why: t('Il manque la longueur |γ′(t)| dt de chaque petit morceau.') },
], { levels: [3] });

function lsData(rng) {
  for (let k = 0; k < 200; k++) {
    if (rng.chance(0.5)) {
      const D = rng.pick([[3, 4], [4, 3], [-3, 4], [4, -3], [3, -4], [0, 2], [2, 0], [-4, 3]]);
      const A = pickPt(rng);
      const c = segment(A, [A[0] + D[0], A[1] + D[1]]);
      const f = rng.chance(0.3) ? [T(rng.pick([1, 2, -1]), [1, 1, 0])] : sum([T(rng.int(-2, 3), [1, 0, 0]), T(rng.int(-2, 3), [0, 1, 0]), T(rng.int(-2, 2), [0, 0, 0])]);
      if (isZero(f)) continue;
      const fg = compose(f, c.P[0], c.P[1]);
      const integrand = pscale(fg, c.speedQ);
      const v = integrate(integrand, 0, 1);
      if (vzero(v)) continue;
      return { c, f, fg, integrand, v, kind: 'seg' };
    }
    const R = rng.pick([1, 2, 3]);
    const span = rng.pick([4, 4, 2]);
    const c = arc([0, 0], R, 0, span, 1);
    const f = sum([T(rng.pick([0, 1, 2, -1]), [2, 0, 0]), T(rng.pick([0, 1, -1, 2]), [1, 1, 0]), T(rng.pick([0, 1, 2]), [1, 0, 0]), T(rng.pick([0, 1, -1]), [0, 1, 0]), T(rng.pick([1, 2, 3, -1]), [0, 0, 0])]);
    if (f.length < 2) continue;
    const fg = compose(f, c.P[0], c.P[1]);
    const integrand = pscale(fg, R);
    const v = integrate(integrand, 0, 0, c.range);
    if (!v || vzero(v)) continue;
    return { c, f, fg, integrand, v, kind: 'circle' };
  }
  const c = segment([0, 0], [3, 4]);
  const f = sum([T(1, [1, 0, 0]), T(1, [0, 1, 0])]);
  const fg = compose(f, c.P[0], c.P[1]);
  return { c, f, fg, integrand: pscale(fg, 5), v: integrate(pscale(fg, 5), 0, 1), kind: 'seg', fallback: true };
}

function lsTraps(D) {
  const { c, f } = D;
  const out = {};
  // Exact values (cheap to compare) rather than integrals.
  const at01 = (p) => integrate(p, c.lo, c.hi, c.range || null);
  if (!c.speedQ.eq(1)) { const w = at01(D.fg); if (w) out.v_speed_forgot = [{ line: vText(w), ctx: { speed: c.speed, integrand: `f(γ(t)) = ${ML(ptext(D.fg))}` } }]; }
  if (c.kind === 'arc' && c.R > 1) {
    const R2 = c.R * c.R;
    const g = compose(f, pscale(c.P[0], c.R), pscale(c.P[1], c.R));
    const w = at01(pscale(g, R2));
    if (w) out.v_radius_squared = [{ line: vText(w), ctx: { R2, R: c.R } }];
  }
  return out;
}

function lsItem(level, rng, opts) {
  const D = lsData(rng);
  const { c, f } = D;
  const fT = text(f);
  const raw = `(${substT(fT, c)})×${c.speed}`;
  const parts = [];
  if (level >= 2) parts.push(paramPart(c, level, { rng }));
  parts.push(speedPart(c, { html: level >= 2 ? t('La norme de la vitesse :') : null }));
  const lines = [
    { math: intT(raw, c), note: t('f(γ(t)) multiplié par la vitesse'), subgoal: 'integrand', pre1: paramBlanks(intT(raw, c), [{ s: `×${c.speed}`, last: true, skip: 1 }]) },
    { math: intT(ptext(D.integrand), c), note: t('On développe'), subgoal: 'integrand' },
    { math: vText(D.v), note: t('On intègre'), subgoal: 'value', blank: [vText(D.v)] },
  ];
  parts.push(intPart('I', D.v, lines, {
    html: t('L\'intégrale curviligne :'), ask: '∫_Γ f dl =', traps: lsTraps(D),
    decisions: [LS_DECISION],
    menu: [act('int', t('Écrire ∫ f(γ(t))·|γ′(t)| dt, puis intégrer')), act('noSpeed', t('Écrire ∫ f(γ(t)) dt'), false, { rule: 'v_speed_forgot', why: t('Il manque |γ′(t)|.') })],
  }));
  if (level === 1) parts[0].notes = [t('Γ est paramétrée par {a}.', { a: LML(c.judge, c.line) })];
  return vParts({
    skill: LS, level, parts, subgoals: LS_SUB, exam: examTag(opts), fallback: D.fallback,
    prompt: t('Soit Γ {desc} et f(x, y) = {a}. Calcule ∫<sub>Γ</sub> f dl{b} calcule |γ′(t)|, puis l\'intégrale en t.', { desc: c.desc, a: ML(fT), b: level >= 2 ? t(' : paramètre Γ, puis') : t(' :') }),
    key: `${LS}:${level}:${c.line}:${fT}`,
    hints: H(t('Paramètre, puis multiplie f(γ(t)) par la vitesse |γ′(t)| : ∫<sub>Γ</sub> f dl = ∫ f(γ(t))·|γ′(t)| dt.'), `|γ′(t)| = ${ML(c.speed)} ; ∫ ${ML(substT(fT, c))} · … dt`, LML(parts[parts.length - 1].judge, lines[0].math)),
  });
}

// The perfect-square curve (2021): its length, then (level 5) ∫ f dl.
const SQ = [[q(1, 2), [0, 1]], [q(2), [-1, 1]], [q(2), [0, 1]], [q(8), [0, 1]], [q(1, 2), [-1, 1]], [q(2), [0, 2]]];
function lsSquare(level, rng, opts) {
  const [cq, [lo, hi]] = rng.pick(SQ);
  const c = squareCurve(cq, lo, hi);
  const L = integrate(c.speedP, lo, hi);
  const parts = [speedPart(c, { html: null })];
  parts.push(intPart('L', L, [
    { math: intT(c.speed, c), note: t('La longueur : ∫ |γ′(t)| dt'), subgoal: 'integrand' },
    { math: vText(L), note: t('On intègre'), subgoal: 'value' },
  ], { html: t('La longueur :'), ask: t('long(Γ) =') }));
  let extra = '';
  if (level === 5) {
    // f = z/s, so that f(γ(t)) = t² (γ₃ = s·t²).
    const sq = q(Math.sqrt(2 * cq.valueOf())).div(2);
    const fT = sq.eq(1) ? 'z' : sq.d === 1 ? `z/${sq.n}` : `${sq.d}z`;
    const fP = pt(1, 2);
    const I = integrate(pmul(fP, c.speedP), lo, hi);
    parts.push(intPart('I', I, [
      { math: intT(`t^2×(${c.speed})`, c), note: t('f(γ(t)) = t², multiplié par |γ′(t)|'), subgoal: 'integrand' },
      { math: vText(I), note: t('On intègre'), subgoal: 'value' },
    ], { html: t('Puis ∫<sub>Γ</sub> f dl pour f(x, y, z) = {a} :', { a: ML(fT) }), ask: '∫_Γ f dl =', traps: { v_speed_forgot: [{ line: vText(integrate(fP, lo, hi)), ctx: { speed: ML(c.speed) } }] } }));
    extra = t(', puis ∫<sub>Γ</sub> f dl avec f(x, y, z) = {a}', { a: ML(fT) });
  }
  return vParts({
    skill: LS, level, parts, subgoals: LS_SUB, exam: examTag(opts, 4),
    prompt: t('Soit Γ la courbe γ(t) = {a}, t ∈ [{b} ; {c}]. Calcule la longueur de Γ{extra}.', { a: tupML(c.comps), b: fq(lo), c: fq(hi), extra }),
    key: `${LS}:sq:${level}:${cq}:${lo}:${hi}`,
    hints: H(t('long(Γ) = ∫ |γ′(t)| dt. Développe |γ′(t)|² : c\'est un carré parfait.'), `|γ′(t)|² = ${ML(ptext(c.dP.reduce((s, p) => padd(s, pmul(p, p)), pc(0))))}`, `|γ′(t)| = ${ML(c.speed)}`),
  });
}

function lsMcq(level, rng, opts) {
  const R = rng.pick([2, 3, 4]);
  const a = rng.pick([1, 2, -1]);
  const b = rng.pick([1, 2, 3]);
  const e = rng.pick([1, 2, 3]);
  const f = sum([T(a, [1, 1, 0]), T(b, [1, 0, 0]), T(e, [0, 0, 0])]);
  const v = { r: q(0), p: q(2 * e * R) };
  return mcqD({
    skill: LS, level, exam: examTag(opts), key: `${LS}:mcq:${R}:${text(f)}`,
    prompt: t('Soit Γ le cercle x² + y² = {a}. Alors ∫<sub>Γ</sub> ({b}) dl =', { a: R * R, b: ML(text(f)) }),
    right: ML(vText(v)),
    wrongs: [opt(ML(vText({ r: q(0), p: q(2 * e) })), 'v_speed_forgot'), opt(ML(vText({ r: q(0), p: q(2 * e * R * R) })), 'v_radius_squared'), opt(ML(String(a * R * R + b * R + e)))],
    fillers: [opt(ML('0'))],
    solution: [{ html: t('γ(t) = ({R} cos t ; {R} sin t), |γ′(t)| = {R}. Les termes en cos t, sin t et sin t cos t ont une intégrale nulle sur [0 ; 2π] : il reste ∫₀^{2π} {e}·{R} dt = {a}.', { R, e, a: vR(v) }), note: '' }],
  }, rng);
}

// ---------- v-line-vector ----------

const LV_SUB = [
  { id: 'param', label: t('paramétrisation'), skill: CP },
  { id: 'deriv', label: 'γ′(t)', skill: CP },
  { id: 'integrand', label: 'F(γ(t)) · γ′(t)', skill: LV },
  { id: 'value', label: t('intégrale en t'), skill: 'a1-int-direct' },
];

function lvCurve(rng, trig) {
  if (trig) return arc([0, 0], rng.pick([1, 2]), 0, rng.pick([1, 2, 4]), 1);
  const k = rng.int(0, 3);
  if (k === 0) { for (;;) { const A = pickPt(rng); const B = pickPt(rng); if (A[0] !== B[0] && A[1] !== B[1]) return segment(A, B); } }
  if (k === 1) return graph(rng.pick([2, 3]), ...rng.pick([[0, 1], [1, 0], [0, 2]]));
  return arc([0, 0], rng.pick([1, 2]), 0, rng.pick([1, 2]), 1);
}
function lvField(rng, trig) {
  if (trig) {
    const a = rng.pick([0, 1, 2, -1]);
    const b = rng.pick([1, 2, 3, -1]);
    const cc = rng.pick([0, 1, -1, 2]);
    const dd = rng.pick([0, 1, 2]);
    return [sum([T(a, [2, 0, 0]), T(cc, [0, 1, 0])]), sum([T(b, [1, 1, 0]), T(dd, [1, 0, 0])])];
  }
  return [randPoly(rng, 2, rng.int(1, 2), { maxDeg: 2 }), randPoly(rng, 2, rng.int(1, 2), { maxDeg: 2 })];
}
const rot2 = (F) => sum(dS(F[1], 0), dS(F[0], 1).map((tt) => ({ ...tt, c: tt.c.neg() })));

function lvData(rng, { trig = false, notConservative = false } = {}) {
  for (let k = 0; k < 200; k++) {
    const c = lvCurve(rng, trig);
    const F = lvField(rng, trig);
    if (F.some(isZero)) continue;
    if (notConservative && isZero(rot2(F))) continue;
    const Fg = F.map((Fi) => compose(Fi, c.P[0], c.P[1]));
    const integrand = padd(pmul(Fg[0], c.dP[0]), pmul(Fg[1], c.dP[1]));
    const v = integrate(integrand, c.lo, c.hi, c.range || null);
    if (!v || vzero(v) || Math.abs(vnum(v)) > 60) continue;
    if (v.r.d > 60) continue;
    return { c, F, Fg, integrand, v };
  }
  const c = graph(2, 0, 1);
  const F = [[T(1, [0, 2, 0])], [T(1, [1, 0, 0])]];
  const Fg = F.map((Fi) => compose(Fi, c.P[0], c.P[1]));
  const integrand = padd(pmul(Fg[0], c.dP[0]), pmul(Fg[1], c.dP[1]));
  return { c, F, Fg, integrand, v: integrate(integrand, 0, 1), fallback: true };
}

function lvTraps(D) {
  const { c, Fg, v } = D;
  const out = { v_orientation_reversed: [{ line: vText(vscale(v, -1)), ctx: {} }] };
  // Exact values (cheap to compare) rather than integrals.
  const val = (p) => integrate(p, c.lo, c.hi, c.range || null);
  const used = val(padd(pmul(Fg[0], c.P[0]), pmul(Fg[1], c.P[1])));
  const ones = val(padd(Fg[0], Fg[1]));
  out.v_gamma_prime_forgot = [
    ...(used ? [{ line: vText(used), ctx: { gp: tupML(c.dT), used: 'γ(t)' } }] : []),
    ...(ones ? [{ line: vText(ones), ctx: { gp: tupML(c.dT), used: '(1 ; 1)' } }] : []),
  ];
  if (c.speed && c.speed !== '1') out.v_speed_in_work = [{ line: `(${vText(v)})×${c.speed}`, ctx: { speed: ML(c.speed) } }];
  if (c.range) {
    const odd = integrate(D.integrand, 0, 0, c.range, 'odd');
    if (odd && !vzero(odd)) {
      const w = vadd(v, vscale(odd, -2));
      if (!veq(w, vscale(v, -1))) out.v_sincos_sign = [{ line: vText(w), ctx: { got: vR(w), want: vR(v) } }];
    }
  }
  return out;
}

const LV_DECISION = (D) => decision(t('Comment calcules-tu le travail ?'), [
  { id: 'param', label: t('Paramétrer Γ, puis ∫ F(γ(t)) · γ′(t) dt'), valid: true, ref: true },
  { id: 'pot', label: t('Chercher un potentiel φ, puis φ(B) − φ(A)'), valid: false, why: t('rot F = {a} ≠ 0 : F ne dérive pas d\'un potentiel.', { a: ML(text(rot2(D.F))) }) },
  { id: 'speed', label: t('Paramétrer Γ, puis ∫ F(γ(t)) · γ′(t) |γ′(t)| dt'), valid: false, rule: 'v_speed_in_work', why: t('γ′(t) contient déjà la longueur : pas de |γ′(t)| en plus.') },
], { levels: [3] });

function lvItem(level, rng, opts) {
  const trig = level === 4 ? rng.chance(0.6) : !!opts.exam;
  const D = lvData(rng, { trig, notConservative: level === 3 });
  const { c, F } = D;
  const FT = F.map((x) => text(x));
  const raw = dotT(FT, c);
  const parts = [];
  if (level >= 3) parts.push(paramPart(c, level, { rng }));
  if (level >= 2) parts.push(derivPart(c, { html: level >= 3 ? t('La vitesse :') : null }));
  const lines = [
    { math: intT(raw, c), note: 'F(γ(t)) · γ′(t)', subgoal: 'integrand', blank: [c.dT[0], c.dT[1]].filter((x) => x !== '0'), blank2: [substT(FT[0], c), substT(FT[1], c)] },
    { math: intT(ptext(D.integrand), c), note: t('On développe'), subgoal: 'integrand' },
    { math: vText(D.v), note: t('On intègre'), subgoal: 'value', blank: [vText(D.v)] },
  ];
  parts.push(intPart('W', D.v, lines, {
    html: level >= 2 ? t('Le travail :') : null, ask: '∫_Γ F · dl =', traps: lvTraps(D),
    menu: [act('dot', t('Remplacer x et y par γ(t), faire le produit scalaire avec γ′(t), puis intégrer')), act('gamma', t('Faire le produit scalaire avec γ(t)'), false, { rule: 'v_gamma_prime_forgot', why: t('C\'est γ′(t), la vitesse, qui compte.') })],
  }));
  if (level === 3) parts[0].decisions = [LV_DECISION(D)];
  if (level === 1) parts[0].notes = [t('Γ : {a}, et {b} = {c}.', { a: LML(c.judge, c.line), b: ML(`γ'(t)`), c: tupML(c.dT) })];
  if (level === 2) parts[0].notes = [`Γ : ${LML(c.judge, c.line)}.`];
  const ex = opts.exam ? examTag(opts, 3) : false;
  return vParts({
    skill: LV, level, parts, subgoals: LV_SUB, exam: ex, fallback: D.fallback,
    prompt: t('Soit Γ {desc} et {a}. Calcule le travail ∫<sub>Γ</sub> F · dl{b}.', { desc: c.desc, a: fieldML(FT), b: level >= 3 ? t(' : paramètre Γ, calcule γ′(t), puis l\'intégrale en t') : '' }),
    key: `${LV}:${level}:${c.line}:${FT.join('|')}`,
    hints: H(t('Remplace x et y par γ(t), puis fais le produit scalaire avec γ′(t) : ∫<sub>Γ</sub> F · dl = ∫ F(γ(t)) · γ′(t) dt.'), t('F(γ(t)) = {a} et γ′(t) = {b}', { a: tupML(D.Fg.map(ptext)), b: tupML(c.dT) }), LML(parts[parts.length - 1].judge, lines[0].math)),
  });
}

// Level 5: the circulation on the boundary of a half disc, piece by piece.
function lvClosed(level, rng, opts) {
  for (let k = 0; k < 200; k++) {
    const R = rng.pick([1, 2]);
    const pieces = [axisSeg('x', -R, R), arc([0, 0], R, 0, 2, 1)];
    const F = lvField(rng, rng.chance(0.5));
    if (F.some(isZero)) continue;
    const Ws = pieces.map((c) => {
      const Fg = F.map((Fi) => compose(Fi, c.P[0], c.P[1]));
      const integrand = padd(pmul(Fg[0], c.dP[0]), pmul(Fg[1], c.dP[1]));
      return { c, Fg, integrand, v: integrate(integrand, c.lo, c.hi, c.range || null) };
    });
    if (Ws.some((w) => !w)) continue;
    const total = vadd(Ws[0].v, Ws[1].v);
    if (vzero(total) || Ws.some((w) => w.v === null)) continue;
    const FT = F.map((x) => text(x));
    const parts = [];
    Ws.forEach((w, i) => {
      const c = w.c;
      parts.push(paramPart(c, level, { name: `Γ${SUBN[i]}`, ask: `Γ${SUBN[i]} : γ(t) =`, html: i ? t('Le demi-cercle Γ₂ :') : null }));
      const raw = dotT(FT, c);
      parts.push(intPart(['I', 'J'][i], w.v, [
        { math: intT(raw, c), note: 'F(γ(t)) · γ′(t)', subgoal: 'integrand' },
        { math: intT(ptext(w.integrand), c), note: t('On développe'), subgoal: 'integrand' },
        { math: vText(w.v), note: t('On intègre'), subgoal: 'value' },
      ], { html: t('Le travail sur Γ{a} :', { a: SUBN[i] }), ask: `∫_Γ${SUBN[i]} F · dl =`, traps: lvTraps({ c, Fg: w.Fg, integrand: w.integrand, v: w.v }) }));
    });
    parts.push(intPart('W', total, [{ math: `${vText(Ws[0].v)}+(${vText(Ws[1].v)})`, note: t('On additionne'), subgoal: 'value' }, { math: vText(total), note: '∮ F · dl', subgoal: 'value' }], { html: t('La circulation sur tout le bord :'), ask: '∮_∂D F · dl =' }));
    return vParts({
      skill: LV, level, parts, subgoals: LV_SUB, exam: examTag(opts), noHints: true,
      prompt: t('Soit D le demi-disque {x² + y² ≤ {a}, y ≥ 0} et {b}. Calcule la circulation ∮<sub>∂D</sub> F · dl sur le bord orienté positivement : Γ₁ le diamètre de ({c} ; 0) à ({R} ; 0), puis Γ₂ le demi-cercle.', { a: R * R, b: fieldML(FT), c: -R, R }).replace(`(${-R} ;`, `(−${R} ;`),
      key: `${LV}:closed:${R}:${FT.join('|')}`,
    });
  }
  return lvItem(4, rng, opts);
}

function lvMcq(level, rng, opts) {
  const R = rng.pick([1, 2, 3]);
  const k = rng.pick([1, 2, 3]);
  if (rng.chance(0.5)) {
    return mcqD({
      skill: LV, level, exam: examTag(opts), key: `${LV}:mcq:rad:${R}:${k}`,
      prompt: t('Soit Γ le cercle x² + y² = {a}, parcouru une fois dans le sens positif. Alors ∮<sub>Γ</sub> ({b} ; {c}) · dl =', { a: R * R, b: ML(`${k === 1 ? '' : k}x`), c: ML(`${k === 1 ? '' : k}y`) }),
      right: ML('0'),
      wrongs: [opt(ML(vText({ r: q(0), p: q(2 * k * R) })), 'v_speed_forgot'), opt(ML(vText({ r: q(0), p: q(k * R * R) }))), opt(ML(vText({ r: q(0), p: q(2 * k * R * R) })), 'v_speed_in_work')],
      solution: [{ html: t('F(γ(t)) · γ′(t) = {k}R²(cos t·(−sin t) + sin t·cos t) = 0 : le travail est nul (F est le gradient de {k}(x² + y²)/2).', { k }), note: '' }],
    }, rng);
  }
  const v = { r: q(0), p: q(2 * k * R * R) };
  return mcqD({
    skill: LV, level, exam: examTag(opts), key: `${LV}:mcq:rot:${R}:${k}`,
    prompt: t('Soit Γ le cercle x² + y² = {a}, parcouru une fois dans le sens positif. Alors ∮<sub>Γ</sub> ({b} ; {c}) · dl =', { a: R * R, b: ML(`-${k === 1 ? '' : k}y`), c: ML(`${k === 1 ? '' : k}x`) }),
    right: ML(vText(v)),
    wrongs: [opt(ML(vText(vscale(v, -1))), 'v_orientation_reversed'), opt(ML(vText({ r: q(0), p: q(2 * k * R) })), 'v_speed_forgot'), opt(ML('0'), 'v_rot_closed_zero')],
    fillers: [opt(ML(vText({ r: q(0), p: q(k * R * R) })))],
    solution: [{ html: t('F(γ(t)) · γ′(t) = {k}R²(sin²t + cos²t) = {a} : le travail vaut {b}.', { k, a: k * R * R, b: vR(v) }), note: '' }],
  }, rng);
}

export const GEN = {
  [CP]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? cpMcq(4, rng, opts) : cpItem(level, rng, opts)),
  [LS]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return lsMcq(4, rng, opts);
    if (opts.exam === 'open') return lsSquare(4, rng, opts);
    if (level === 5) return lsSquare(5, rng, opts);
    if (level === 4 && rng.chance(0.3)) return lsSquare(4, rng, opts);
    return lsItem(level, rng, opts);
  },
  [LV]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return lvMcq(4, rng, opts);
    if (level === 5) return lvClosed(5, rng, opts);
    return lvItem(opts.exam ? 4 : level, rng, opts);
  },
};

// v-ops and v-identities (module V, part a, step U10): gradient,
// divergence, rotationnel, laplacien, and the product identities.
// Catalogue: docs/universite/VCF-analyse-3-4.md.
//
// One `equiv` part per scalar (each component of rot F, div F, Δf), from
// the formula written with ∂ (pd(F₃, y) − pd(F₂, z)) to the expanded
// result (target 'goal': the line must reach the form of the generator's
// result). The parts of rot F set cfg.rot (trap v_rot_sign reads the
// previous line in the other order) and cfg.traps (the component with its
// sign changed); Δf has the mixed terms (v_lap_mixed).

import { parse } from '../../cas/parse.js';
import { JUDGES } from '../../judges/index.js';
import {
  T, sum, sub, d, text, at, randPoly, isZero, ML, tupML, fieldML, ptT, fq, q,
  vParts, mcqD, opt, decision, act, H, examTag,
} from './vecto-a-kit.js';

const XYZ = ['x', 'y', 'z'];
const DOM3 = { x: [-3, 3], y: [-3, 3], z: [-3, 3] };
const eqJ = (goal, extra = {}) => ({ kind: 'equiv', vars: XYZ, domain: DOM3, target: 'no-int', goal, ...extra });
// Lines with ∂ are never final: the expanded result with no more terms than the goal.
const eqN = (goal, extra = {}) => ({ kind: 'equiv', vars: XYZ, domain: DOM3, target: 'no-int', goal, ...extra });
const finalFor = (cfg, line) => JUDGES.equiv.isFinal(cfg, parse(line, { vars: cfg.vars })) === true;
const par = (t) => (/^[^+-]*$/.test(t) ? t : `(${t})`);
const parNeg = par;
const P = (t) => `(${t})`;

// ---------- fields ----------

const SPECIAL = [
  { f: 'sin', m: [1, 0, 1] }, { f: 'sin', m: [0, 1, 1] }, { f: 'exp', m: [1, 1, 0] }, { f: 'sin', m: [1, 1, 0] }, { f: 'exp', m: [0, 1, 1] },
];
const rotOf = ([P, Q, R]) => [sub(d(R, 1), d(Q, 2)), sub(d(P, 2), d(R, 0)), sub(d(Q, 0), d(P, 1))];
const divOf = ([P, Q, R]) => sum(d(P, 0), d(Q, 1), d(R, 2));

// A field F of ℝ³: 1 or 2 monomials per component; with `special`, a term
// c·sin(m) or c·e^(m) in one component. Every component of rot F nonzero
// when `full`; rot F ≠ 0 always.
function field(rng, { special = false, full = false } = {}) {
  for (let t = 0; t < 200; t++) {
    const F = [0, 1, 2].map(() => randPoly(rng, 3, rng.int(1, 2), { maxDeg: 3 }));
    if (F.some(isZero)) continue;
    if (special) {
      const s = rng.pick(SPECIAL);
      const k = rng.int(0, 2);
      F[k] = sum(F[k], [T(rng.pick([1, 2, -1]), [0, 0, 0], s.f, { k: 1, e: s.m })]);
    }
    const rot = rotOf(F);
    if (rot.every(isZero)) continue;
    if (full && rot.some(isZero)) continue;
    if (special && !rot.some((r) => r.some((x) => x.f))) continue;
    if (rot.some((r) => r.length > 4) || divOf(F).length > 4) continue;
    return { F, rot, div: divOf(F) };
  }
  const F = [[T(1, [2, 1, 0])], [T(1, [0, 1, 1])], [T(1, [1, 0, 2])]];
  return { F, rot: rotOf(F), div: divOf(F), fallback: true };
}

// ---------- parts ----------

const ROT_IDX = [[2, 1, 1, 2], [0, 2, 2, 0], [1, 0, 0, 1]]; // component i: ∂_{a}F_{b} − ∂_{c}F_{e}: [b, a, e, c]
const SUBS = ['₁', '₂', '₃'];
const ROT_NOTE = 'rot F = (∂F₃/∂y − ∂F₂/∂z ; ∂F₁/∂z − ∂F₃/∂x ; ∂F₂/∂x − ∂F₁/∂y)';

// The part of the i-th component of rot F.
function rotPart(F, i, level, { first = false } = {}) {
  const [b, a, e, c] = ROT_IDX[i];
  const A = text(F[b]);
  const B = text(F[e]);
  const dA = text(d(F[b], a));
  const dB = text(d(F[e], c));
  const goal = text(rotOf(F)[i]);
  const start = `pd(${A},${XYZ[a]})-pd(${B},${XYZ[c]})`;
  const wrong = text(sub(d(F[e], c), d(F[b], a)));
  const judge = eqJ(goal, { rot: true, traps: { v_rot_sign: [{ line: wrong, ctx: { i: i + 1, want: goal.replace(/-/g, '−') } }] } });
  const mid = `${dA}-${parNeg(dB)}`;
  const lines = [];
  if (!finalFor(judge, mid) && mid !== goal) lines.push({ math: mid, note: `∂F${SUBS[b]}/∂${XYZ[a]} − ∂F${SUBS[e]}/∂${XYZ[c]}`, subgoal: 'partials', blank: [dA, dB], blank2: [dA, dB] });
  lines.push({ math: goal, note: lines.length ? 'On simplifie' : 'Les deux dérivées partielles, puis la différence', subgoal: lines.length ? 'simplify' : 'partials', blank2: lines.length ? [goal] : [dA, dB].filter((x) => x !== '0') });
  return {
    html: first ? null : `Composante ${i + 1} de rot F :`, ask: `(rot F)${SUBS[i]} =`, start, judge, lines,
    menu: [
      act('derive', `Calculer ∂F${SUBS[b]}/∂${XYZ[a]} et ∂F${SUBS[e]}/∂${XYZ[c]}, puis la différence`),
      act('swap', `Écrire ∂F${SUBS[e]}/∂${XYZ[c]} − ∂F${SUBS[b]}/∂${XYZ[a]}`, false, { rule: 'v_rot_sign', why: 'L\'ordre est fixé : x → y → z → x. Dans l\'autre ordre, on obtient l\'opposé.' }),
      act('add', 'Additionner les deux dérivées', false, { why: 'Chaque composante de rot F est une différence.' }),
    ],
  };
}

function divPart(F, { html = 'La divergence :', ask = 'div F =', name = 'F' } = {}) {
  const start = `pd(${text(F[0])},x)+pd(${text(F[1])},y)+pd(${text(F[2])},z)`;
  const ds = [0, 1, 2].map((i) => text(d(F[i], i)));
  const goal = text(divOf(F));
  const judge = eqJ(goal);
  const mid = ds.map((s, i) => (i ? `+${par(s)}` : s)).join('');
  const lines = [];
  if (!finalFor(judge, mid) && mid !== goal) lines.push({ math: mid, note: `∂${name}₁/∂x + ∂${name}₂/∂y + ∂${name}₃/∂z`, subgoal: 'partials', blank: ds.filter((x) => x !== '0') });
  lines.push({ math: goal, note: lines.length ? 'On regroupe' : 'Somme des trois dérivées', subgoal: 'div', blank2: [goal] });
  return {
    html, ask, start, judge, lines,
    menu: [act('derive', 'Dériver chaque composante par rapport à sa variable, puis additionner'), act('cross', 'Faire le produit vectoriel ∇ ∧ F', false, { why: 'div F = ∇ · F est un produit scalaire : un nombre, pas un vecteur.' })],
  };
}

// Δf: the start with the three second derivatives; the trap adds the mixed ones.
function lapPart(f, { html = null } = {}) {
  const ft = text(f);
  const start = `pd(${ft},x,x)+pd(${ft},y,y)+pd(${ft},z,z)`;
  const second = [0, 1, 2].map((i) => text(d(d(f, i), i)));
  const lap = sum(...[0, 1, 2].map((i) => d(d(f, i), i)));
  const mixed = sum(d(d(f, 0), 1), d(d(f, 0), 2), d(d(f, 1), 2));
  const goal = text(lap);
  const judge = eqJ(goal, isZero(mixed) ? {} : { traps: { v_lap_mixed: [{ line: text(sum(lap, mixed)), ctx: { mixed: text(mixed).replace(/-/g, '−') } }] } });
  const mid = second.map((s, i) => (i ? `+${par(s)}` : s)).join('');
  const lines = [];
  if (!finalFor(judge, mid) && mid !== goal) lines.push({ math: mid, note: '∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z²', subgoal: 'partials', blank: second.filter((x) => x !== '0') });
  lines.push({ math: goal, note: 'On regroupe', subgoal: 'lap', blank2: [goal] });
  return {
    html, ask: 'Δf =', start, judge, lines, lap, mixed,
    menu: [act('second', 'Additionner les trois dérivées secondes ∂²f/∂x², ∂²f/∂y², ∂²f/∂z²'), act('mixed', 'Ajouter aussi les dérivées croisées ∂²f/∂x∂y…', false, { rule: 'v_lap_mixed', why: 'Le laplacien ne contient pas de dérivée croisée.' })],
  };
}

// The value of an expression at a point, as a part (equiv without letters).
function atPart(expr, p, { ask, html }) {
  const t = text(expr);
  const subst = t.replace(/[xyz]/g, (v) => `(${p[XYZ.indexOf(v)]})`);
  const val = at(expr, p);
  const judge = { kind: 'equiv', vars: [], target: 'constant' };
  return { html, ask, start: t === '0' ? '0+0' : subst, judge, lines: [{ math: String(val), note: 'On remplace x, y, z par les coordonnées', subgoal: 'value', blank: [String(val)] }], val };
}

const isConst = (s) => s.every((t) => !t.f && t.e.every((k) => k === 0));

// ---------- v-ops ----------

const OPS = 'v-ops';
const OPS_SUB = [
  { id: 'partials', label: 'dérivées partielles', skill: 'a2-partials' },
  { id: 'simplify', label: 'composante de rot F', skill: OPS },
  { id: 'div', label: 'divergence', skill: OPS },
  { id: 'lap', label: 'laplacien', skill: OPS },
  { id: 'value', label: 'valeur au point', skill: OPS },
];
const OP_CHOICES = {
  rot: { label: 'Le rotationnel rot F = ∇ ∧ F (un vecteur)', why: 'Irrotationnel veut dire rot F = 0.' },
  div: { label: 'La divergence div F = ∇ · F (un nombre)', why: 'À divergence nulle veut dire div F = 0.' },
  grad: { label: 'Le gradient ∇f (un vecteur)', why: 'Le gradient s\'applique à une fonction f à valeurs réelles, pas au champ F.' },
  lap: { label: 'Le laplacien Δf = div ∇f', why: 'Le laplacien s\'applique à une fonction f à valeurs réelles.' },
};
function opDecision(want) {
  return decision('Quel opérateur faut-il calculer ?', ['rot', 'div', 'grad', 'lap'].map((k) => ({
    id: k, label: OP_CHOICES[k].label, valid: k === want, ...(k === want ? { ref: true } : { why: OP_CHOICES[want].why }),
  })), { levels: [3] });
}

function rotItem(level, rng, opts) {
  const fd = field(rng, { special: level >= 4, full: level <= 2 });
  const parts = [0, 1, 2].map((i) => rotPart(fd.F, i, level, { first: i === 0 }));
  let prompt = `Soit ${fieldML(fd.F.map((c) => text(c)))}. Calcule rot F, composante par composante.`;
  if (level === 3) {
    parts[0].decisions = [opDecision('rot')];
    prompt = `Soit ${fieldML(fd.F.map((c) => text(c)))}. Le champ F est-il irrotationnel ? Calcule ce qu'il faut, composante par composante.`;
  }
  if (level >= 4) {
    parts.push(divPart(fd.F));
    prompt = `Soit ${fieldML(fd.F.map((c) => text(c)))}. Calcule rot F, puis div F.`;
  }
  if (level === 5) {
    const R = fd.rot;
    const dr = [0, 1, 2].map((i) => text(d(R[i], i)));
    const start = `pd(${text(R[0])},x)+pd(${text(R[1])},y)+pd(${text(R[2])},z)`;
    const judge = eqJ('0');
    const mid = dr.map((s, i) => (i ? `+${par(s)}` : s)).join('');
    parts.push({ html: 'Vérifie que div(rot F) = 0 sur ce champ :', ask: 'div(rot F) =', start, judge, lines: [...(finalFor(judge, mid) || mid === '0' ? [] : [{ math: mid, note: 'On dérive chaque composante de rot F', subgoal: 'partials' }]), { math: '0', note: 'Tout se simplifie : div(rot F) = 0', subgoal: 'div' }] });
    prompt = `Soit ${fieldML(fd.F.map((c) => text(c)))}. Calcule rot F et div F, puis vérifie que div(rot F) = 0 sur ce champ.`;
  }
  if (level <= 2) parts[0].notes = [`${ROT_NOTE} : une ligne par composante.`];
  return vParts({
    skill: OPS, level, parts, subgoals: OPS_SUB, prompt, fallback: fd.fallback, exam: examTag(opts),
    key: `${OPS}:rot:${level}:${fd.F.map((c) => text(c)).join('|')}`,
    hints: H('rot F est un vecteur : écris ses trois composantes, chacune est une différence de deux dérivées partielles.',
      `rot F = (∂<sub>y</sub>(${ML(text(fd.F[2]))}) − ∂<sub>z</sub>(${ML(text(fd.F[1]))}) ; …)`,
      `rot F = ${tupML(fd.rot.map((r) => text(r)))}`),
  });
}

function divItem(level, rng, opts) {
  const fd = field(rng, { special: level >= 4 });
  const p = [rng.int(-2, 2), rng.int(-2, 2), rng.int(-2, 2)];
  const parts = [divPart(fd.F, { html: null })];
  const ok = !isConst(fd.div) && at(fd.div, p) !== null;
  if (level >= 2 && ok) parts.push(atPart(fd.div, p, { ask: `div F${ptT(p)} =`, html: `Au point P = ${ptT(p)} :` }));
  if (level === 3) parts[0].decisions = [opDecision('div')];
  return vParts({
    skill: OPS, level, parts, subgoals: OPS_SUB, fallback: fd.fallback, exam: examTag(opts),
    prompt: `Soit ${fieldML(fd.F.map((c) => text(c)))}. ${level === 3 ? 'Le champ F est-il à divergence nulle ? Calcule ce qu\'il faut' : 'Calcule div F'}${parts.length > 1 ? `, puis sa valeur en P = ${ptT(p)}` : ''}.`,
    key: `${OPS}:div:${level}:${fd.F.map((c) => text(c)).join('|')}:${p}`,
    hints: H('div F = ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z : un nombre en chaque point.', `div F = ${ML(parts[0].lines[0].math)}`, `div F = ${ML(text(fd.div))}`),
  });
}

function lapF(rng) {
  for (let t = 0; t < 200; t++) {
    const f = randPoly(rng, 3, rng.int(2, 3), { maxDeg: 3, minDeg: 2 });
    const lap = sum(...[0, 1, 2].map((i) => d(d(f, i), i)));
    const mixed = sum(d(d(f, 0), 1), d(d(f, 0), 2), d(d(f, 1), 2));
    if (isZero(lap) || isZero(mixed) || f.length < 2) continue;
    return { f };
  }
  return { f: sum([T(1, [2, 0, 0]), T(1, [0, 3, 0]), T(1, [1, 1, 0])]), fallback: true };
}

function lapItem(level, rng, opts) {
  const { f, fallback } = lapF(rng);
  const p = [rng.int(-2, 2), rng.int(-2, 2), rng.int(-2, 2)];
  const lp = lapPart(f);
  const parts = [lp, ...(isConst(lp.lap) ? [] : [atPart(lp.lap, p, { ask: `Δf${ptT(p)} =`, html: `Au point ${ptT(p)} :` })])];
  if (level === 3) parts[0].decisions = [opDecision('lap')];
  return vParts({
    skill: OPS, level, parts, subgoals: OPS_SUB, fallback, exam: examTag(opts),
    prompt: `Soit f(x, y, z) = ${ML(text(f))}. Calcule Δf${parts.length > 1 ? `, puis Δf${ptT(p)}` : ''}.`,
    key: `${OPS}:lap:${level}:${text(f)}:${p}`,
    hints: H('Δf = ∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z² : seulement les dérivées secondes « pures ».', `Δf = ${ML(lp.lines[0].math)}`, `Δf = ${ML(text(lp.lap))}`),
  });
}

// Exam: Δ(f) (2022) or rot F, four options.
function opsMcq(level, rng, opts) {
  if (rng.chance(0.5)) {
    const a = rng.pick([1, 2, 3, -1]);
    const b = rng.pick([1, 2, -1]);
    const c = rng.pick([1, 2, 3, -2]);
    const f = sum([T(a, [2, 0, 0]), T(b, [0, 3, 0]), T(c, [1, 1, 0])]);
    const lap = sum(d(d(f, 0), 0), d(d(f, 1), 1));
    const mixed = d(d(f, 0), 1);
    const grad = [d(f, 0), d(f, 1)];
    return mcqD({
      skill: OPS, level, exam: examTag(opts), key: `${OPS}:mcq:lap:${text(f)}`,
      prompt: `Soit f(x, y) = ${ML(text(f))}. Alors Δf(x, y) =`,
      right: ML(text(lap)),
      wrongs: [opt(ML(text(sum(lap, mixed))), 'v_lap_mixed'), opt(ML(text(sum(lap, mixed, mixed))), 'v_lap_mixed'), opt(tupML(grad.map((g) => text(g))))],
      fillers: [opt(ML(text(sum(...grad)))), opt(ML(text(sub(lap, [T(2, [0, 0, 0])]))))],
      solution: [{ html: `∂²f/∂x² = ${ML(text(d(d(f, 0), 0)))}, ∂²f/∂y² = ${ML(text(d(d(f, 1), 1)))} : Δf = ${ML(text(lap))}. La dérivée croisée ∂²f/∂x∂y n'en fait pas partie.`, note: '' }],
    }, rng);
  }
  const fd = field(rng, { full: true });
  const R = fd.rot.map((r) => text(r));
  const negAll = fd.rot.map((r) => text(sub([], r)));
  const negOne = R.map((r, i) => (i === 0 ? negAll[0] : r));
  const negTwo = R.map((r, i) => (i === 2 ? negAll[2] : r));
  return mcqD({
    skill: OPS, level, exam: examTag(opts), key: `${OPS}:mcq:rot:${R.join('|')}`, fallback: fd.fallback,
    prompt: `Soit ${fieldML(fd.F.map((c) => text(c)))}. Alors rot F =`,
    right: tupML(R),
    wrongs: [opt(tupML(negAll), 'v_rot_sign'), opt(tupML(negOne), 'v_rot_sign'), opt(tupML(negTwo), 'v_rot_sign')],
    fillers: [opt(ML(text(fd.div)))],
    solution: [{ html: `${ROT_NOTE} = ${tupML(R)}.`, note: '' }],
  }, rng);
}

// ---------- v-identities ----------

const ID = 'v-identities';
const ID_SUB = [
  { id: 'product', label: 'le produit fF', skill: OPS },
  { id: 'lhs', label: 'div(fF)', skill: OPS },
  { id: 'rhs', label: 'f div F + F · ∇f', skill: OPS },
  { id: 'conclude', label: 'les deux membres sont égaux', skill: ID },
];

function idData(rng) {
  for (let t = 0; t < 200; t++) {
    const f = randPoly(rng, 3, rng.int(1, 2), { maxDeg: 2, coefs: [1, 2, 3, -1, -2] });
    const F = [0, 1, 2].map(() => randPoly(rng, 3, rng.int(1, 2), { maxDeg: 1, coefs: [-2, -1, 1, 2, 3] }));
    if (F.some(isZero)) continue;
    const divF = divOf(F);
    const fF = F.map((c) => mulS(f, c));
    const lhs = divOf(fF);
    const grad = [0, 1, 2].map((i) => d(f, i));
    const dot = sum(...F.map((c, i) => mulS(c, grad[i])));
    if (isZero(divF) || isZero(dot) || isZero(lhs) || lhs.length > 5) continue;
    return { f, F, divF, fF, lhs, grad, dot, fdiv: mulS(f, divF) };
  }
  const f = [T(1, [1, 1, 0])];
  const F = [[T(1, [1, 0, 0])], [T(1, [0, 1, 0])], [T(1, [0, 0, 1])]];
  const grad = [0, 1, 2].map((i) => d(f, i));
  return { f, F, divF: divOf(F), fF: F.map((c) => mulS(f, c)), lhs: divOf(F.map((c) => mulS(f, c))), grad, dot: sum(...F.map((c, i) => mulS(c, grad[i]))), fdiv: mulS(f, divOf(F)), fallback: true };
}
// Product of two polynomial sums.
function mulS(a, b) {
  const out = [];
  for (const s of a) for (const t of b) out.push(T(s.c.mul(t.c), s.e.map((x, i) => x + t.e[i])));
  return sum(out);
}

const ID_DECISION = decision('Quelle identité vas-tu vérifier ?', [
  { id: 'prod', label: 'div(fF) = f div F + F · ∇f', valid: true, ref: true },
  { id: 'drop', label: 'div(fF) = f div F', valid: false, rule: 'v_identity_drop_term', why: 'C\'est une règle du produit : il manque le terme F · ∇f.' },
  { id: 'rot', label: 'rot(fF) = f rot F + ∇f ∧ F', valid: false, why: 'Juste, mais c\'est l\'identité du rotationnel : ici on calcule une divergence.' },
  { id: 'lap', label: 'div(∇f) = Δf', valid: false, why: 'Juste, mais elle ne parle pas du produit fF.' },
], { levels: [3] });

function idItem(level, rng, opts) {
  const D = idData(rng);
  const fT = text(D.f);
  const FT = D.F.map((c) => text(c));
  const fFT = D.fF.map((c) => text(c));
  const lhsT = text(D.lhs);
  // div(fF): the products first, then their derivatives.
  const startL = `pd(${P(fT)}${P(FT[0])},x)+pd(${P(fT)}${P(FT[1])},y)+pd(${P(fT)}${P(FT[2])},z)`;
  const prodLine = `pd(${fFT[0]},x)+pd(${fFT[1]},y)+pd(${fFT[2]},z)`;
  const jL = eqN(lhsT);
  const dl = [0, 1, 2].map((i) => text(d(D.fF[i], i)));
  const midL = dl.map((s, i) => (i ? `+${par(s)}` : s)).join('');
  const linesL = [{ math: prodLine, note: `fF = ${tupML(fFT)}`, subgoal: 'product', blank: fFT.filter((x) => x !== '0') }];
  if (!finalFor(jL, midL) && midL !== lhsT) linesL.push({ math: midL, note: 'On dérive chaque composante', subgoal: 'lhs', blank: dl.filter((x) => x !== '0') });
  linesL.push({ math: lhsT, note: 'On regroupe', subgoal: 'lhs', blank2: [lhsT] });
  // f div F + F · ∇f.
  const startR = `${P(fT)}(pd(${FT[0]},x)+pd(${FT[1]},y)+pd(${FT[2]},z))+${P(FT[0])}pd(${fT},x)+${P(FT[1])}pd(${fT},y)+${P(FT[2])}pd(${fT},z)`;
  const gT = D.grad.map((g) => text(g));
  const midR = `${P(fT)}${P(text(D.divF))}+${FT.map((c, i) => `${P(c)}${P(gT[i])}`).join('+')}`;
  const jR = eqN(lhsT, { traps: { v_identity_drop_term: [{ line: text(D.fdiv), ctx: { missing: `F · ∇f = ${ML(text(D.dot))}` } }] } });
  const linesR = [{ math: midR, note: `div F = ${ML(text(D.divF))} et ∇f = ${tupML(gT)}`, subgoal: 'rhs', blank: [text(D.divF), ...gT.filter((x) => x !== '0')] }, { math: lhsT, note: 'On développe', subgoal: 'rhs', blank2: [lhsT] }];
  const jC = eqN('0');
  const parts = [
    { start: startL, judge: jL, lines: linesL, decisions: [ID_DECISION], menu: [act('prod', 'Calculer fF, puis sa divergence'), act('fdiv', 'Écrire div(fF) = f div F', false, { rule: 'v_identity_drop_term', why: 'Règle du produit : deux termes.' })] },
    { html: 'Le membre de droite :', ask: 'f div F + F · ∇f =', start: startR, judge: jR, lines: linesR, menu: [act('both', 'Calculer div F et ∇f, puis les deux termes'), act('one', 'Garder seulement f div F', false, { rule: 'v_identity_drop_term', why: 'Il manque F · ∇f.' })] },
    { html: 'On compare les deux membres :', ask: 'div(fF) − (f div F + F · ∇f) =', start: `(${lhsT})-(${midR})`, judge: jC, lines: [{ math: '0', note: 'Les deux membres sont égaux : l\'identité est vérifiée', subgoal: 'conclude' }] },
  ];
  return vParts({
    skill: ID, level, parts, subgoals: ID_SUB, fallback: D.fallback, exam: examTag(opts), noHints: level === 5 ? true : undefined,
    prompt: `Soit f(x, y, z) = ${ML(fT)} et ${fieldML(FT)}. Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.`,
    key: `${ID}:${level}:${fT}:${FT.join('|')}`,
    hints: H('Calcule chaque membre séparément, puis compare.', `∇f = ${tupML(gT)} et div F = ${ML(text(D.divF))}`, `f div F + F · ∇f = ${ML(midR)}`),
  });
}

// Level 5 (one item in two): which identity is false?
const TRUE_IDS = ['rot(∇f) = 0', 'div(rot F) = 0', 'div(∇f) = Δf', 'div(fF) = f div F + F · ∇f', 'rot(fF) = f rot F + ∇f ∧ F'];
const FALSE_IDS = [
  { html: 'div(fF) = f div F', rule: 'v_identity_drop_term' },
  { html: 'rot(fF) = f rot F', rule: 'v_identity_drop_term' },
  { html: 'rot(∇f) = Δf', rule: null },
  { html: 'div(rot F) = Δ F₁ + Δ F₂ + Δ F₃', rule: null },
];
function falseIdMcq(level, rng) {
  const bad = rng.pick(FALSE_IDS);
  const goods = rng.shuffle(TRUE_IDS.filter((t) => !(bad.html.startsWith('div(fF)') && t.startsWith('div(fF)')) && !(bad.html.startsWith('rot(fF)') && t.startsWith('rot(fF)')))).slice(0, 3);
  return mcqD({
    skill: ID, level, noHints: true, key: `${ID}:false:${bad.html}:${goods.join('|')}`,
    prompt: 'Une seule de ces identités est fausse (f et F de classe C²). Laquelle ?',
    right: bad.html, wrongs: goods.map((g) => opt(g)),
    solution: [{ html: `${bad.html} est fausse. ${bad.rule ? 'C\'est une règle du produit : il manque un terme (F · ∇f, ou ∇f ∧ F).' : 'Les deux membres ne sont même pas de même nature.'}`, note: '' }],
  }, rng);
}

// Exam (série de révision 2021-22): F = g(|x|)·x, or div(fF) on an example.
function idMcq(level, rng, opts) {
  if (rng.chance(0.5)) {
    const n = rng.pick([2, 3]);
    const sp = n === 2 ? 'ℝ²' : 'ℝ³';
    return mcqD({
      skill: ID, level, exam: examTag(opts), key: `${ID}:mcq:radial:${n}`,
      prompt: `Soit g : ]0 ; +∞[ → ℝ de classe C¹ et F(x) = g(|x|)·x sur ${sp} \\ {0}. Alors :`,
      right: 'F dérive du potentiel φ(x) = G(|x|), où G est une primitive de t ↦ t·g(t)',
      wrongs: [opt(`div F = ${n}·g(|x|) pour toute fonction g`, 'v_identity_drop_term'), opt('div F = 0 pour toute fonction g'), opt('∮ F · dl = 1 sur le cercle unité pour une fonction g bien choisie', 'v_rot_closed_zero')],
      solution: [{ html: `∇(G(|x|)) = G′(|x|)·x/|x| = |x| g(|x|)·x/|x| = g(|x|)·x = F. Par la règle du produit, div F = ${n} g(|x|) + |x| g′(|x|) : le second terme manque si on l'oublie. Un champ qui dérive d'un potentiel a ∮ F · dl = 0 sur toute courbe fermée.`, note: '' }],
    }, rng);
  }
  const D = idData(rng);
  return mcqD({
    skill: ID, level, exam: examTag(opts), key: `${ID}:mcq:div:${text(D.f)}:${D.F.map((c) => text(c)).join('|')}`, fallback: D.fallback,
    prompt: `Soit f(x, y, z) = ${ML(text(D.f))} et ${fieldML(D.F.map((c) => text(c)))}. Alors div(fF) =`,
    right: ML(text(D.lhs)),
    wrongs: [opt(ML(text(D.fdiv)), 'v_identity_drop_term'), opt(ML(text(D.dot)), 'v_identity_drop_term'), opt(ML(text(sub(D.fdiv, D.dot))))],
    fillers: [opt(ML(text(sum(D.lhs, D.dot))))],
    solution: [{ html: `div(fF) = f div F + F · ∇f = ${ML(text(D.fdiv))} + ${ML(par(text(D.dot)))} = ${ML(text(D.lhs))}.`, note: '' }],
  }, rng);
}

export const GEN = {
  [OPS]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return opsMcq(4, rng, opts);
    if (level === 1 || level === 5) return rotItem(level, rng, opts);
    if (level === 2) return rng.pick([rotItem, rotItem, lapItem])(level, rng, opts);
    if (level === 3) return rng.pick([rotItem, divItem, lapItem])(level, rng, opts);
    return rng.pick([rotItem, rotItem, divItem, lapItem])(level, rng, opts);
  },
  [ID]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return idMcq(4, rng, opts);
    if (level === 5 && rng.chance(0.5)) return falseIdMcq(5, rng);
    return idItem(level, rng, opts);
  },
};
export { q, fq };

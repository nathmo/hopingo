// Generators of module G6, part c (unit `analyse0`, step U2). Catalogue:
// docs/universite/G-gymnase-2.md, G6. Skills: js/content/uni/analyse0-c.skills.js.
// This file: angular points and asymptotes; the full study is in
// analyse0-c-study.js, the parametric arcs in analyse0-c-param.js.
//
// Levels (spec §8.3): 1–2 guided (lines with boxes, decisions to choose),
// 3 choose the action then write the line (`tapActions: 'steps'`), 4 free
// lines with hints, 5 alone. Pieces of a function with |…| are judged by
// `equiv` on the interval where the piece holds; lateral derivatives,
// m and h by `limit`; an asymptote « y = mx + h » by `equiv` with m and h
// given as letters (`subst`); the position and the nature of a point are
// decisions. opts.exam = 'mcq' | 'tf' | 'open' gives the exam variants.

import { MT, fr, linesItem, mcq, tfItem, examTag } from './kit.js';
import {
  q, N, RT, nz, modeOf, H, E, D, NOTE, coefText, polyText, affText, minusText, pEval, pDeriv, pAdd, pScale,
  atText, atBlank, blanked, part, partsScript, usedSubgoals, distinctOptions, KEYS, KEYS_SET,
} from './analyse0-c-util.js';
import { GEN as STUDY } from './analyse0-c-study.js';
import { GEN as PARAM } from './analyse0-c-param.js';

const V = 'x';
const sup = (side) => (side === '-' ? '⁻' : '⁺');
const sideWord = (side) => (side === '-' ? 'à gauche' : 'à droite');
const sgnTerm = (t) => (t.startsWith('-') ? t : `+${t}`);
const withBaits = (item, extra) => ({ ...item, baits: [...new Set([...item.baits, ...extra])] });

// ======================================================================
// g6-angular-points
// ======================================================================

const AP = 'g6-angular-points';
const AP_SUB = [
  { id: 'pieces', label: 'écrire f par morceaux', skill: 'g1-abs-eq' },
  { id: 'derive', label: 'dériver chaque morceau', skill: 'g6-deriv-rules' },
  { id: 'lateral', label: 'dérivées latérales', skill: 'g6-limits' },
  { id: 'value', label: 'nature du point, extremum', skill: 'g6-sign-variation' },
  { id: 'param', label: 'discuter selon le paramètre', skill: AP },
];
const AP_CHOICES = [
  { id: 'pieces', label: 'Écrire f sans valeur absolue sur ce morceau' },
  { id: 'derive', label: 'Dériver le morceau de ce côté' },
  { id: 'lateral', label: 'Dérivée latérale : remplacer x par le point dans la dérivée de ce côté' },
  { id: 'value', label: 'Calculer f au point' },
  { id: 'abs', label: 'Dériver |u| en |u′|', rule: 'g6_abs_derivative', why: 'La dérivée de |u| dépend du signe de u : c\'est u′ ou −u′.' },
  { id: 'one', label: 'Prendre la même dérivée des deux côtés', rule: 'g6_angular_not_seen', why: 'Au point de raccord, f change de formule : chaque côté a sa propre dérivée.' },
];

// f(x) = |x² − sx + P| + cx + d, roots r1 < r2: two junctions.
function apDataA(rng, level) {
  for (let i = 0; i < 200; i++) {
    const r1 = rng.int(-4, 3);
    const r2 = rng.int(r1 + 1, Math.min(4, r1 + 5));
    const dl = r2 - r1;
    const c = nz(rng, -6, 6);
    const d = rng.int(-4, 4);
    if (Math.abs(c) === dl && (level < 4 || rng.chance(0.6))) continue;
    if (Math.abs(r1 * r2 + d) > 12 || Math.abs(r1 * r2 - d) > 12) continue;
    return apA(r1, r2, c, d);
  }
  return { ...apA(-2, 2, 3, 0), fallback: true };
}
function apA(r1, r2, c, d) {
  const s = r1 + r2;
  const P = r1 * r2;
  const p = polyText([P, -s, 1]);
  const qx = affText(c, d);
  const f = `|${p}|${sgnTerm(qx)}`;
  const out = pAdd([P, -s, 1], [d, c]);
  const inn = pAdd([-P, s, -1], [d, c]);
  return {
    kind: 'A', f, p, absArg: p,
    pieces: {
      out: { cs: out, cond: `x &lt; ${fr(r1)} ou x > ${fr(r2)}`, dom: [r2 + 0.2, r2 + 3], sign: `${MT(p)} ≥ 0`, neg: false },
      in: { cs: inn, cond: `${fr(r1)} &lt; x &lt; ${fr(r2)}`, dom: [r1 + 0.1, r2 - 0.1], sign: `${MT(p)} &lt; 0`, neg: true },
    },
    points: [{ r: r2, left: 'in', right: 'out' }, { r: r1, left: 'out', right: 'in' }],
  };
}
// f(x) = |x − a|·(x − b): one junction.
function apDataB(rng) {
  for (let i = 0; i < 200; i++) {
    const a = rng.int(-4, 4);
    const b = rng.int(-4, 4);
    if (a === b || b === 0) continue;
    const xa = minusText(a);
    const xb = minusText(b);
    const right = [a * b, -(a + b), 1];
    return {
      kind: 'B', f: `|${xa}|(${xb})`, absArg: xa,
      pieces: {
        R: { cs: right, cond: `x > ${fr(a)}`, dom: [a + 0.2, a + 3], sign: `${MT(xa)} > 0`, neg: false },
        L: { cs: pScale(right, -1), cond: `x &lt; ${fr(a)}`, dom: [a - 3, a - 0.2], sign: `${MT(xa)} &lt; 0`, neg: true },
      },
      points: [{ r: a, left: 'L', right: 'R' }],
    };
  }
  return null;
}

// Lateral derivatives, value and nature at a junction.
function junction(d, pt) {
  const L = d.pieces[pt.left];
  const R = d.pieces[pt.right];
  const dL = pDeriv(L.cs);
  const dR = pDeriv(R.cs);
  const eps = q(1, 1000);
  const r = q(pt.r);
  const sL = Math.sign(pEval(dL, r.sub(eps)).valueOf());
  const sR = Math.sign(pEval(dR, r.add(eps)).valueOf());
  const kind = sL < 0 && sR > 0 ? 'min' : sL > 0 && sR < 0 ? 'max' : 'none';
  return {
    ...pt, L, R, dL, dR, lv: pEval(dL, r), rv: pEval(dR, r), fv: pEval(R.cs, r), sL, sR, kind,
    limitCase: pEval(dL, r).n === 0 || pEval(dR, r).n === 0,
  };
}

const KIND_WORD = { min: 'un minimum local', max: 'un maximum local', none: 'pas un extremum' };
const signWord = (s) => (s < 0 ? 'f′ &lt; 0 : f décroît' : 'f′ > 0 : f croît');

function natureDecision(j) {
  const r = fr(j.r);
  return D(`En x = ${r} : f′(${r}⁻) = ${fr(N(j.lv))} et f′(${r}⁺) = ${fr(N(j.rv))}. Le point d'abscisse ${r} est :`, [
    { id: 'angular', label: 'un point anguleux : f n\'est pas dérivable en ce point', valid: true },
    { id: 'smooth', label: 'un point où f est dérivable', valid: false, rule: 'g6_angular_not_seen', why: 'Les deux dérivées latérales diffèrent : la courbe change brusquement de direction, f n\'y est pas dérivable.' },
    { id: 'cusp', label: 'un point de rebroussement', valid: false, why: 'Les dérivées latérales sont finies. Un rebroussement demande f′ → ±∞ des deux côtés, avec des signes opposés.' },
  ]);
}
function extremumDecision(j) {
  const r = fr(j.r);
  const why = `Juste à gauche de ${r}, ${signWord(j.sL)} ; juste à droite, ${signWord(j.sR)}. Donc ${KIND_WORD[j.kind]}.`;
  const rule = j.limitCase ? { rule: 'g6_angular_boundary' } : {};
  return D(`Ce point est-il un extremum local de f ?${j.limitCase ? ' (Une des dérivées latérales est nulle.)' : ''}`, [
    { id: 'min', label: 'oui, un minimum local', valid: j.kind === 'min', why, ...rule },
    { id: 'max', label: 'oui, un maximum local', valid: j.kind === 'max', why, ...rule },
    { id: 'none', label: 'non, ce n\'est pas un extremum', valid: j.kind === 'none', why, ...rule },
  ]);
}

function piecePart(d, pc, level) {
  const exp = polyText(pc.cs);
  let line = E(exp, `Ici ${pc.sign} : on enlève les barres${pc.neg ? ' en changeant le signe' : ''}`, 'pieces', 'pieces');
  // Guided: the last coefficient (constant term, else the one of x) is a box.
  const low = [pc.cs[0], pc.cs[1]].map((c) => Math.abs(q(0).add(c).valueOf())).filter((c) => c && c !== 1);
  if (level <= 2 && low.length) line = blanked(line, [[String(low[0]), -1]]);
  return part(`Pour ${pc.cond} :`, 'f(x) =', d.f, { kind: 'equiv', vars: [V], domain: { x: pc.dom }, target: 'expanded' }, [line]);
}
function derivPart(d, pc) {
  const lines = [
    E(`d(${polyText(pc.cs)})`, 'Dériver le morceau de ce côté', 'derive', 'derive'),
    E(polyText(pDeriv(pc.cs)), 'Dérivées usuelles', 'derive', 'derive'),
  ];
  return part(`Pour ${pc.cond} :`, 'f′(x) =', `d(${d.f})`, { kind: 'equiv', vars: [V], domain: { x: pc.dom }, target: 'no-prime' }, lines);
}
function latPart(d, j, side, level) {
  const pc = side === '-' ? j.dL : j.dR;
  const other = side === '-' ? j.dR : j.dL;
  const der = polyText(pc);
  const val = side === '-' ? j.lv : j.rv;
  const subLine = E(atText(der, V, j.r), `x = ${fr(j.r)} dans la dérivée du morceau ${side === '-' ? 'de gauche' : 'de droite'}`, 'lateral', 'lateral');
  const lines = [level === 1 ? { ...subLine, ...atBlank(der, V, j.r) } : subLine, E(N(val), 'Calculer', 'lateral', 'lateral')];
  return part(`Dérivée ${sideWord(side)} en ${fr(j.r)} : la limite de f′(x) quand x → ${fr(j.r)}${sup(side)}.`, `f′(${fr(j.r)}${sup(side)}) =`, der,
    { kind: 'limit', v: V, to: String(j.r), dir: side, other: polyText(other) }, lines);
}
function valuePart(d, j) {
  return part(`Le point A(${fr(j.r)} ; f(${fr(j.r)})) :`, `f(${fr(j.r)}) =`, atText(d.f, V, j.r), { kind: 'value' },
    [E(N(j.fv), 'Calculer', 'value', 'value')], [natureDecision(j), extremumDecision(j)]);
}

function apItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return apMcq(rng);
  if (opts.exam === 'tf') return apTf(rng);
  if (level === 5 || opts.exam === 'open') return apParam(level, rng, opts);
  const d = (level >= 4 ? rng.chance(0.65) : rng.chance(0.6)) ? apDataA(rng, level) : apDataB(rng);
  const js = d.points.map((pt) => junction(d, pt));
  const chosen = level >= 4 ? js : [rng.pick(js)];
  const j0 = chosen[0];
  const pieceIds = Object.keys(d.pieces);
  const pieceList = pieceIds.map((id) => `${MT(polyText(d.pieces[id].cs))} si ${d.pieces[id].cond}`).join(' ; ');
  const derivList = pieceIds.map((id) => `${MT(polyText(pDeriv(d.pieces[id].cs)))} si ${d.pieces[id].cond}`).join(' ; ');
  const parts = [];
  const before = [];
  if (level === 1) {
    before.push(NOTE(`Par morceaux : f(x) = ${pieceList}.<br>Donc f′(x) = ${derivList}.`));
  } else {
    for (const id of pieceIds) parts.push(piecePart(d, d.pieces[id], level));
    if (level >= 3) for (const id of pieceIds) parts.push(derivPart(d, d.pieces[id]));
  }
  for (const j of chosen) parts.push(latPart(d, j, '-', level), latPart(d, j, '+', level), valuePart(d, j));
  // Level 2: the derivatives come as a note before the lateral limits.
  if (level === 2) {
    const k = pieceIds.length;
    parts[k].pre.unshift(NOTE(`Les dérivées : f′(x) = ${derivList}.`));
  }
  const { start, judge, script } = partsScript(parts, level, AP_CHOICES, before);
  const r = fr(j0.r);
  const item = linesItem({
    skill: AP, level,
    prompt: `Soit f(x) = ${MT(d.f)}. ${chosen.length > 1 ? `Étudie les points ${chosen.map((j) => `x = ${fr(j.r)}`).join(' et ')}` : `Étudie le point x = ${r}`} : dérivées latérales, nature du point, extremum.`,
    start, judge, mode: modeOf(level), script,
    hints: H(
      `Écris f sans valeur absolue de chaque côté de ${r} (le signe de ${MT(d.absArg)} décide), dérive chaque morceau, puis compare f′(${r}⁻) et f′(${r}⁺).`,
      `f′(${r}⁻) = ${MT(atText(polyText(j0.dL), V, j0.r))} = □`,
      `f′(${r}⁻) = ${fr(N(j0.lv))} et f′(${r}⁺) = ${fr(N(j0.rv))} : ${KIND_WORD[j0.kind]}.`,
    ),
    subgoals: usedSubgoals(AP_SUB, script), keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${AP}:${level}:${d.f}:${chosen.map((j) => j.r).join(',')}`, exam: examTag(opts), fallback: d.fallback,
  });
  return withBaits(item, level === 3 ? ['g6_abs_derivative', 'g6_angular_not_seen'] : []);
}

// Level 5 and the open variant (E4): f(x) = |x³ − a³| + σ·3b²·x.
function apParamData(rng) {
  const b = rng.pick([1, 2, 3]);
  const sg = rng.pick([-1, 1]);
  const c = 3 * b * b;
  const cx = `${sg < 0 ? '-' : '+'}${c}x`;
  const set1 = `]-∞;${-b}[∪]${b};+∞[`;
  // The limit cases a = ±b: the lateral derivative on one side is 0.
  const cases = [b, -b].map((a0) => {
    const right = [-(a0 ** 3), sg * c, 0, 1];
    const left = [a0 ** 3, sg * c, 0, -1];
    const j = junction({ pieces: { L: { cs: left }, R: { cs: right } } }, { r: a0, left: 'L', right: 'R' });
    return { a0, j, zeroSide: j.lv.n === 0 ? '-' : '+' };
  });
  const kept = cases.filter((x) => x.j.kind !== 'none').map((x) => x.a0);
  const answer = sg < 0 ? `]-∞;${-b}[∪[${b};+∞[` : `]-∞;${-b}]∪]${b};+∞[`;
  return { b, sg, c, cx, f: `|x^3-a^3|${cx}`, set1, cases, kept, answer };
}

function apParam(level, rng, opts) {
  const d = apParamData(rng);
  const vars = ['x', 'a'];
  const right = `x^3-a^3${d.cx}`;
  const left = `a^3-x^3${d.cx}`;
  const dl = `-3a^2${d.sg < 0 ? '-' : '+'}${d.c}`;
  const dr = `3a^2${d.sg < 0 ? '-' : '+'}${d.c}`;
  const lat = (side, piece, dx, da) => part(`f′(a${sup(side)}) : dérive le morceau ${side === '-' ? 'de gauche' : 'de droite'}, puis fais tendre x vers a.`, `f′(a${sup(side)}) =`, `d(${piece})`,
    { kind: 'equiv', vars, subst: { x: 'a' }, target: 'only', finalVars: ['a'] },
    [E(dx, 'Dériver le morceau', 'lateral'), E(da, 'x → a', 'lateral')]);
  const caseDecisions = d.cases.map(({ a0, j, zeroSide }) => {
    const why = `Pour a = ${fr(a0)}, juste à gauche de ${fr(a0)} ${signWord(j.sL)} ; juste à droite, ${signWord(j.sR)} : ${j.kind === 'none' ? 'pas d\'extremum' : KIND_WORD[j.kind]}.`;
    return D(`Cas limite a = ${fr(a0)} : f′(${fr(a0)}${sup(zeroSide)}) = 0. Le point anguleux est-il un extremum ?`, [
      { id: 'yes', label: 'oui', valid: j.kind !== 'none', why, ...(j.kind === 'none' ? { rule: 'g6_angular_boundary' } : {}) },
      { id: 'no', label: 'non', valid: j.kind === 'none', why, ...(j.kind !== 'none' ? { rule: 'g6_angular_boundary' } : {}) },
    ]);
  });
  const parts = [
    part('Pour x > a :', 'f(x) =', d.f, { kind: 'equiv', vars, domain: { x: [2.2, 4], a: [-3, 1.8] }, target: 'short', goal: right, slack: 0 }, [E(right, 'x³ − a³ > 0 quand x > a', 'pieces')]),
    part('Pour x < a :', 'f(x) =', d.f, { kind: 'equiv', vars, domain: { x: [-4, -2.2], a: [-1.8, 3] }, target: 'short', goal: left, slack: 0 }, [E(left, 'x³ − a³ < 0 quand x < a', 'pieces')]),
    lat('-', left, `-3x^2${d.sg < 0 ? '-' : '+'}${d.c}`, dl),
    lat('+', right, `3x^2${d.sg < 0 ? '-' : '+'}${d.c}`, dr),
    part('Les dérivées latérales diffèrent dès que a ≠ 0. Sans les cas limites, le point anguleux est un extremum quand elles sont de signes opposés : f′(a⁻)·f′(a⁺) < 0.', 'a ∈', `(${dl})(${dr})<0`,
      { kind: 'solset', v: 'a' }, [E(`a^2>${d.b * d.b}`, `${d.sg < 0 ? 'f′(a⁻) < 0 pour tout a' : 'f′(a⁺) > 0 pour tout a'}`, 'param'), E(d.set1, 'S₁', 'param')]),
    part(`Réponse : réunis S₁ = ${MT(d.set1)} et S₂, les cas limites qui donnent un extremum.`, 'a ∈', 'S_1∪S_2',
      { kind: 'solset', v: 'a', sets: { S_1: d.set1, S_2: `{${d.kept.join(';')}}` } }, [E(d.answer, 'Réunir', 'param')], caseDecisions),
  ];
  const { start, judge, script } = partsScript(parts, 5, null);
  const item = linesItem({
    skill: AP, level: opts.exam ? 4 : 5,
    prompt: `Soit f(x) = ${MT(d.f, { vars })}, avec a ∈ ℝ. Écris f par morceaux, calcule f′(a⁻) et f′(a⁺), puis trouve pour quels a le graphe a en x = a un point anguleux qui est un extremum (attention aux cas limites).`,
    start, judge, mode: 'free', script, noHints: true, hints: [],
    declares: { vars }, subgoals: usedSubgoals(AP_SUB, script), keys: [...KEYS, 'letters', 'set', 'relation'],
    key: `${AP}:param:${d.f}`, exam: examTag(opts, 6),
  });
  return withBaits(item, ['g6_angular_boundary']);
}

function apMcq(rng) {
  if (rng.chance(0.5)) {
    const d = apParamData(rng);
    const b = d.b;
    const options = distinctOptions([
      { html: MT(d.answer), correct: true },
      { html: MT(`]-∞;${-b}[∪]${b};+∞[`), correct: false, rule: 'g6_angular_boundary' },
      { html: MT(`]-∞;${-b}]∪[${b};+∞[`), correct: false, rule: 'g6_angular_boundary' },
      { html: MT(`]${-b};${b}[`), correct: false },
    ]);
    return mcq({
      skill: AP, level: 4, prompt: `Soit f(x) = ${MT(d.f, { vars: ['x', 'a'] })}. Pour quels a le graphe a-t-il en x = a un point anguleux qui est un extremum ?`,
      options, key: `${AP}:mcq:${d.f}`, exam: { format: 'mcq', points: 1 },
      solution: [{ html: `f′(a⁻) = ${MT(`-3a^2${d.sg < 0 ? '-' : '+'}${d.c}`, { vars: ['a'] })}, f′(a⁺) = ${MT(`3a^2${d.sg < 0 ? '-' : '+'}${d.c}`, { vars: ['a'] })} : signes opposés si |a| > ${b}. Cas limites : seul a = ${fr(d.kept[0])} donne un extremum. Réponse : ${MT(d.answer)}.`, note: '' }],
    }, rng);
  }
  const d = rng.chance(0.7) ? apDataA(rng, 3) : apDataB(rng);
  const j = junction(d, rng.pick(d.points));
  const r = fr(j.r);
  const L = fr(N(j.lv));
  const R = fr(N(j.rv));
  // |u|′ taken as |u′| gives f′(r⁺) on both sides here; one formula for
  // both sides gives f′(r⁻) twice.
  const options = distinctOptions([
    { html: `f′(${r}⁻) = ${L} et f′(${r}⁺) = ${R} : point anguleux`, correct: true },
    { html: `f′(${r}⁻) = f′(${r}⁺) = ${R} : f est dérivable en ${r}`, correct: false, rule: 'g6_abs_derivative' },
    { html: `f′(${r}⁻) = f′(${r}⁺) = ${L} : f est dérivable en ${r}`, correct: false, rule: 'g6_angular_not_seen' },
    { html: `f′(${r}⁻) = ${R} et f′(${r}⁺) = ${L} : point anguleux`, correct: false },
  ]);
  return mcq({
    skill: AP, level: 4, prompt: `Soit f(x) = ${MT(d.f)}. Que se passe-t-il en x = ${r} ?`,
    options, key: `${AP}:mcq:${d.f}:${j.r}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `À gauche de ${r}, f(x) = ${MT(polyText(j.L.cs))} ; à droite, f(x) = ${MT(polyText(j.R.cs))}. Donc f′(${r}⁻) = ${L} et f′(${r}⁺) = ${R} : point anguleux.`, note: '' }],
  }, rng);
}

function apTf(rng) {
  const kind = rng.pick(['lin', 'prod', 'min', 'gen']);
  const refute = (v, pred, val) => ({ kind: 'refute', quants: [{ q: '∀', v, dom: 'R' }], pred, ask: [{ v, label: `${v} =` }], answer: { [v]: String(val) } });
  if (kind === 'lin') {
    const k = rng.pick([1, 2, 3]);
    const a0 = rng.int(-3, 3);
    const f = `${k === 1 ? '' : `${k}×`}|${minusText(a0)}|+cx`;
    return tfItem({
      skill: AP, level: 4, statement: `Pour tout réel c, la fonction f(x) = ${MT(f, { vars: ['x', 'c'] })} a un extremum local en x = ${fr(a0)}.`,
      truth: false, counter: refute('c', `c^2≤${k * k}`, k + 1), key: `lin:${f}`, exam: { format: 'tf', points: 1 },
      explanation: `Faux : f′(${fr(a0)}⁻) = c − ${k} et f′(${fr(a0)}⁺) = c + ${k} diffèrent toujours (point anguleux), mais pour c = ${k + 1} elles sont toutes deux positives : f croît, pas d'extremum.`,
    });
  }
  if (kind === 'prod') {
    const a0 = nz(rng, -3, 3);
    const f = `|${minusText(a0)}|(x-c)`;
    return tfItem({
      skill: AP, level: 4, statement: `Pour tout réel c, la fonction f(x) = ${MT(f, { vars: ['x', 'c'] })} a un point anguleux en x = ${fr(a0)}.`,
      truth: false, counter: refute('c', `c≠${a0}`, a0), key: `prod:${f}`, exam: { format: 'tf', points: 1 },
      explanation: `Faux : f′(${fr(a0)}⁻) = c − ${fr(a0)} et f′(${fr(a0)}⁺) = ${fr(a0)} − c. Pour c = ${fr(a0)}, les deux valent 0 : f(x) = (x − ${fr(a0)})·|x − ${fr(a0)}| est dérivable en ${fr(a0)}.`,
    });
  }
  if (kind === 'min') {
    return tfItem({
      skill: AP, level: 4, statement: 'Si f est continue en a, avec f′(a⁻) < 0 et f′(a⁺) > 0, alors f a un minimum local en a.',
      truth: true, key: 'min', exam: { format: 'tf', points: 1 },
      explanation: 'Vrai : f décroît juste à gauche de a et croît juste à droite.',
    });
  }
  const d = apDataA(rng, 3);
  const j = junction(d, d.points[0]);
  return tfItem({
    skill: AP, level: 4, statement: `La fonction f(x) = ${MT(d.f)} a un point anguleux en x = ${fr(j.r)}.`,
    truth: true, key: `gen:${d.f}`, exam: { format: 'tf', points: 1 },
    explanation: `Vrai : f′(${fr(j.r)}⁻) = ${fr(N(j.lv))} et f′(${fr(j.r)}⁺) = ${fr(N(j.rv))} sont finies et différentes.`,
  });
}

// ======================================================================
// g6-asymptotes
// ======================================================================

const AS = 'g6-asymptotes';
const AS_SUB = [
  { id: 'vertical', label: 'asymptote verticale', skill: 'g6-limits' },
  { id: 'slope', label: 'pente m = lim f(x)/x', skill: 'g6-limits' },
  { id: 'intercept', label: 'h = lim (f(x) − mx)', skill: 'g6-limits' },
  { id: 'division', label: 'division euclidienne', skill: 'g0-long-div' },
  { id: 'asym', label: 'écrire l\'asymptote', skill: AS },
  { id: 'position', label: 'position par rapport à l\'asymptote', skill: AS },
];
const AS_CHOICES = [
  { id: 'domain', label: 'Domaine : les valeurs interdites' },
  { id: 'vertical', label: 'Limite en la valeur interdite : asymptote verticale ?' },
  { id: 'slope', label: 'm = lim f(x)/x' },
  { id: 'intercept', label: 'h = lim (f(x) − mx)' },
  { id: 'position', label: 'Position : simplifier f(x) − (mx + h)' },
  { id: 'asym', label: 'Écrire l\'asymptote y = mx + h' },
  { id: 'hforgot', label: 'L\'asymptote est y = mx', rule: 'g6_oblique_h_forgot', why: 'm ne donne que la direction : il faut encore h.' },
];
const asymJudge = (m, h) => ({ kind: 'equiv', vars: ['x', 'm', 'h'], subst: { m: N(m), h: N(h) }, target: 'only', finalVars: ['x'] });
const asymStart = (m) => (Q0(m) ? 'h' : 'mx+h');
const Q0 = (m) => q(0).eq(m);

// f(x) = mx + h + k/(x − a), written as one fraction.
function asRat(rng) {
  for (let i = 0; i < 200; i++) {
    const m = rng.pick([1, 1, 2, -1, 3, -2]);
    const h = rng.int(-4, 4);
    const a = nz(rng, -3, 3);
    const k = nz(rng, -5, 5);
    const Nn = [k - h * a, h - m * a, m];
    if (Math.abs(Nn[0]) > 15 || Math.abs(Nn[1]) > 12) continue;
    return asRatOf(m, h, a, k);
  }
  return { ...asRatOf(1, 2, 1, 1), fallback: true };
}
function asRatOf(m, h, a, k) {
  const num = polyText([k - h * a, h - m * a, m]);
  const xa = minusText(a);
  return { kind: 'rat', m, h, a, k, num, xa, f: `(${num})/(${xa})`, aff: affText(m, h), rest: `${k}/(${xa})` };
}

function ratParts(d, level, side) {
  const { m, h, a, k, f, xa } = d;
  const mText = `${m > 0 ? '-' : '+'}${coefText(Math.abs(m))}x`;
  const dom = part('Domaine de f :', 'D =', f, { kind: 'solset', v: V, exprDomain: true }, [E(`]-∞;${a}[∪]${a};+∞[`, `${fr(a)} annule le dénominateur`, 'vertical', 'domain')]);
  const vert = part(`En x = ${fr(a)} (valeur interdite) : la limite de f quand x → ${fr(a)}⁺.`, `lim f =`, f, { kind: 'limit', v: V, to: String(a), dir: '+' },
    [E(`${k}/(${xa})`, `Le numérateur tend vers ${fr(k)} ≠ 0`, 'vertical', 'vertical'), E(k > 0 ? '+∞' : '-∞', `Asymptote verticale x = ${fr(a)}`, 'vertical', 'vertical')]);
  const slope = part('Pente : m = lim f(x)/x quand x → ±∞.', 'm =', `(${f})/x`, { kind: 'limit', v: V, to: '+∞' },
    [E(`(${d.num})/(${polyText([0, -a, 1])})`, 'f(x)/x', 'slope', 'slope'), E(N(m), 'Termes de plus haut degré', 'slope', 'slope')]);
  const hNum = polyText([k - h * a, h]);
  const inter = part(`Ordonnée à l'origine : h = lim (f(x) − ${MT(affText(m, 0))}) quand x → ±∞.`, 'h =', `${f}${mText}`, { kind: 'limit', v: V, to: '+∞' },
    [level === 1 ? blanked(E(`(${hNum})/(${xa})`, 'Même dénominateur', 'intercept', 'intercept'), [hNum]) : E(`(${hNum})/(${xa})`, 'Même dénominateur', 'intercept', 'intercept'),
      E(N(h), 'Termes de plus haut degré', 'intercept', 'intercept')]);
  const diff = part(`Position : f(x) − (${MT(d.aff)}) =`, 'f(x) − (mx + h) =', `${f}-(${d.aff})`, { kind: 'equiv', vars: [V], domain: { x: [a + 0.3, a + 4] }, target: 'short', goal: d.rest, slack: 1 },
    [E(d.rest, 'Même dénominateur', 'position', 'position')]);
  const above = (side === '+' ? k > 0 : k < 0);
  const posDecision = D(`Pour x ${side === '+' ? '>' : '<'} ${fr(a)}, ${RT(d.rest)} est ${above ? 'positif' : 'négatif'}. La courbe de f est :`, [
    { id: 'above', label: 'au-dessus de l\'asymptote', valid: above, ...(above ? {} : { rule: 'g6_sketch_crosses_asymptote' }), why: 'f(x) − (mx + h) < 0 : la courbe est en dessous de l\'asymptote.' },
    { id: 'below', label: 'en dessous de l\'asymptote', valid: !above, ...(above ? { rule: 'g6_sketch_crosses_asymptote' } : {}), why: 'f(x) − (mx + h) > 0 : la courbe est au-dessus de l\'asymptote.' },
  ]);
  const affLine = E(d.aff, 'y = mx + h', 'asym', 'asym');
  const asym = part(`Asymptote oblique en +∞ et en −∞, avec m = ${fr(N(m))} et h = ${fr(N(h))} :`, 'y =', asymStart(m), asymJudge(m, h),
    [level === 1 && h !== 0 ? blanked(affLine, [[String(Math.abs(h)), -1]]) : affLine], [posDecision]);
  return { dom, vert, slope, inter, diff, asym };
}

// √(x² + 2βx + c) + p·x: an asymptote on each side.
function asSqrt(rng) {
  for (let i = 0; i < 200; i++) {
    const be = nz(rng, -3, 3);
    const c = rng.int(-6, 9);
    if (c === be * be) continue;
    const p = rng.pick([0, 0, 1]);
    return asSqrtOf(be, c, p);
  }
  return { ...asSqrtOf(2, 0, 1), fallback: true };
}
function asSqrtOf(be, c, p) {
  const R = polyText([c, 2 * be, 1]);
  const f = `√(${R})${p ? '+x' : ''}`;
  const inner = `√(1${sgnTerm(`${2 * be}/x`)}${c ? sgnTerm(`${c}/x^2`) : ''})`;
  return { kind: 'sqrt', be, c, p, R, f, inner, lin: polyText([c, 2 * be]) };
}
function sqrtParts(d, side, level) {
  const { be, p, R, f, inner } = d;
  const plus = side === '+';
  const to = plus ? '+∞' : '-∞';
  const m = plus ? 1 + p : p - 1;
  const h = plus ? be : -be;
  const where = plus ? 'en +∞' : 'en −∞';
  const slope = part(`${plus ? 'En +∞' : 'En −∞'} : m = lim f(x)/x.`, 'm =', `(${f})/x`, { kind: 'limit', v: V, to },
    [E(`${plus ? '' : '-'}${inner}${p ? '+1' : ''}`, plus ? 'x > 0 : √(x²) = x' : 'x < 0 : √(x²) = |x| = −x', 'slope', 'slope'), E(N(m), 'Calculer', 'slope', 'slope')]);
  // f − mx = √R − x (in +∞) or √R + x (in −∞) in both cases p = 0, 1.
  const fm = plus ? `√(${R})-x` : `√(${R})+x`;
  const startH = m === 0 ? f : `${f}${m > 0 ? '-' : '+'}${coefText(Math.abs(m))}x`;
  const hLines = [];
  if (startH !== fm) hLines.push(E(fm, 'Réduire', 'intercept', 'intercept'));
  hLines.push(E(`(${d.lin})/(√(${R})${plus ? '+x' : '-x'})`, 'Multiplier par la quantité conjuguée', 'intercept', 'intercept'));
  hLines.push(E(N(h), 'Diviser par x', 'intercept', 'intercept'));
  const inter = part(`${plus ? 'En +∞' : 'En −∞'} : h = lim (f(x) − mx).`, 'h =', startH, { kind: 'limit', v: V, to }, hLines);
  const asym = part(`Asymptote ${m === 0 ? 'horizontale' : 'oblique'} ${where} :`, 'y =', asymStart(m), asymJudge(m, h), [E(affText(m, h), 'y = mx + h', 'asym', 'asym')]);
  return [slope, inter, asym];
}

// m·x + k·g(x) with g = √x or ln x: a parabolic branch of direction y = mx.
function asParab(rng) {
  const m = rng.pick([1, 2, -1, 3]);
  const k = rng.pick([1, 2, -1, -2, 3]);
  const g = rng.pick(['√x', 'ln(x)']);
  const kg = `${coefText(k)}${g}`;
  return { kind: 'parab', m, k, g, f: `${affText(m, 0)}${sgnTerm(kg)}`, kg };
}
function parabParts(d) {
  const { m, k, g, f } = d;
  const ratio = g === '√x' ? `${k}/√x` : `${k}ln(x)/x`;
  const slope = part('En +∞ : m = lim f(x)/x.', 'm =', `(${f})/x`, { kind: 'limit', v: V, to: '+∞' },
    [E(`${m}${sgnTerm(ratio)}`, 'Diviser chaque terme par x', 'slope', 'slope'), E(N(m), g === '√x' ? '1/√x → 0' : 'ln(x)/x → 0', 'slope', 'slope')]);
  const mText = `${m > 0 ? '-' : '+'}${coefText(Math.abs(m))}x`;
  const inter = part('En +∞ : h = lim (f(x) − mx).', 'h =', `${f}${mText}`, { kind: 'limit', v: V, to: '+∞' },
    [E(d.kg, 'Réduire', 'intercept', 'intercept'), E(k > 0 ? '+∞' : '-∞', 'h est infini', 'intercept', 'intercept')]);
  const nature = D('m est fini, mais f(x) − mx tend vers l\'infini. En +∞, la courbe a :', [
    { id: 'parab', label: 'une branche parabolique de direction y = mx', valid: true },
    { id: 'oblique', label: 'l\'asymptote oblique y = mx', valid: false, rule: 'g6_oblique_h_forgot', why: 'Une asymptote demande h fini : ici f(x) − mx → ∞, la courbe s\'éloigne de toute droite de pente m.' },
    { id: 'oy', label: 'une branche parabolique de direction Oy', valid: false, why: 'La direction Oy, c\'est quand f(x)/x → ∞. Ici m est fini.' },
    { id: 'horiz', label: 'une asymptote horizontale', valid: false, why: 'f tend vers l\'infini : pas d\'asymptote horizontale.' },
  ]);
  const dir = part('Direction de la branche parabolique :', 'y =', 'mx', { kind: 'equiv', vars: ['x', 'm'], subst: { m: N(m) }, target: 'only', finalVars: ['x'] },
    [E(affText(m, 0), 'y = mx', 'asym', 'asym')], [nature]);
  return [slope, inter, dir];
}

function asItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return asMcq(rng);
  if (opts.exam === 'tf') return asTf(rng);
  const lv = opts.exam === 'open' ? rng.pick([4, 5]) : level;
  const kind = lv === 5 ? 'sqrt'
    : lv === 4 ? rng.pick(['rat', 'rat', 'rat', 'parab', 'parab', 'sqrt'])
      : lv === 2 ? (rng.chance(0.8) ? 'rat' : 'sqrt') : 'rat';
  let parts;
  let d;
  let prompt;
  let hints;
  const before = [];
  if (kind === 'rat') {
    d = asRat(rng);
    const side = rng.pick(['+', '-']);
    const p = ratParts(d, lv, side);
    if (lv === 1) {
      before.push(NOTE(`m = lim f(x)/x = ${fr(N(d.m))} en ±∞ (déjà calculé).`));
      parts = [p.inter, p.diff, p.asym];
    } else if (lv === 2) {
      const div = part('Division euclidienne :', 'f(x) =', d.f, { kind: 'equiv', vars: [V], domain: { x: [d.a + 0.3, d.a + 4] }, target: 'partial-fractions' },
        [blanked(E(`${d.aff}+${d.rest}`, 'Quotient et reste', 'division', 'division'), [d.aff])],
        [D('Comment trouver l\'asymptote oblique ?', [
          { id: 'div', label: 'Division euclidienne : f(x) = mx + h + reste/(x − a)', valid: true, ref: true },
          { id: 'mh', label: 'm = lim f(x)/x, puis h = lim (f(x) − mx)', valid: true, quality: 'poor', why: 'Juste aussi ; mais pour une fraction rationnelle, la division donne m, h et la position d\'un coup.' },
        ])]);
      const asym = { ...p.asym, html: 'Asymptote oblique en ±∞ (le quotient de la division) :' };
      parts = [p.dom, p.vert, div, asym];
    } else parts = [p.dom, p.vert, p.slope, p.inter, p.diff, p.asym];
    prompt = `Soit f(x) = ${MT(d.f)}. Trouve ses asymptotes${lv === 1 ? ' obliques' : ''} et la position de la courbe par rapport à l'asymptote oblique.`;
    hints = H('m = lim f(x)/x, puis h = lim (f(x) − mx). Ou bien la division euclidienne.', `h = lim ${MT(`(□)/(${d.xa})`)}`, `y = ${MT(d.aff)}`);
  } else if (kind === 'sqrt') {
    d = asSqrt(rng);
    const decision = D('Comment trouver l\'asymptote oblique ?', [
      { id: 'div', label: 'Division euclidienne', valid: false, why: 'f n\'est pas une fraction rationnelle : il y a une racine. On calcule m, puis h.' },
      { id: 'mh', label: 'm = lim f(x)/x, puis h = lim (f(x) − mx), de chaque côté', valid: true },
    ]);
    const plus = sqrtParts(d, '+', lv);
    if (lv === 2) plus[0].pre.push(decision);
    parts = lv >= 4 ? [...plus, ...sqrtParts(d, '-', lv)] : plus;
    prompt = `Soit f(x) = ${MT(d.f)}. Trouve ${lv >= 4 ? 'ses asymptotes en +∞ et en −∞' : 'son asymptote en +∞'}.`;
    hints = H('m = lim f(x)/x, puis h = lim (f(x) − mx). Pour une différence avec une racine, multiplie par la quantité conjuguée. En −∞, √(x²) = −x.', `h = lim ${MT(`(□)/(√(${d.R})+x)`)}`, `En +∞ : y = ${MT(affText(1 + d.p, d.be))}`);
  } else {
    d = asParab(rng);
    parts = parabParts(d);
    prompt = `Soit f(x) = ${MT(d.f)}, x > 0. Étudie la branche infinie de f en +∞.`;
    hints = H('m = lim f(x)/x, puis h = lim (f(x) − mx). Si h est infini, ce n\'est pas une asymptote.', `m = ${fr(N(d.m))}, puis f(x) − ${MT(affText(d.m, 0))} = □`, `Branche parabolique de direction y = ${MT(affText(d.m, 0))}.`);
  }
  const { start, judge, script } = partsScript(parts, lv, AS_CHOICES, before);
  const item = linesItem({
    skill: AS, level: lv, prompt, start, judge, mode: modeOf(lv), script, hints: lv >= 5 || opts.exam ? [] : hints,
    subgoals: usedSubgoals(AS_SUB, script), keys: KEYS, tapActions: lv === 3 ? 'steps' : null,
    key: `${AS}:${lv}:${d.f}`, exam: examTag(opts, 4), fallback: d.fallback,
  });
  return withBaits(item, ['g6_oblique_h_forgot']);
}

function asMcq(rng) {
  if (rng.chance(0.5)) {
    const d = asRat(rng);
    const aff = (m, h) => `y = ${MT(affText(m, h))}`;
    const options = distinctOptions([
      { html: aff(d.m, d.h), correct: true },
      { html: aff(d.m, 0), correct: false, rule: 'g6_oblique_h_forgot' },
      { html: aff(d.m, d.m), correct: false, rule: 'g6_oblique_h_forgot' },
      { html: aff(d.m, -d.h), correct: false },
      { html: aff(d.h || 1, d.m), correct: false },
      { html: aff(d.m, d.h + d.k), correct: false },
    ]);
    return mcq({
      skill: AS, level: 4, prompt: `Quelle est l'asymptote oblique de f(x) = ${MT(d.f)} en ±∞ ?`, options,
      key: `${AS}:mcq:${d.f}`, exam: { format: 'mcq', points: 1 },
      solution: [{ html: `f(x) = ${MT(`${d.aff}+${d.rest}`)} : m = ${fr(N(d.m))}, h = ${fr(N(d.h))}, asymptote y = ${MT(d.aff)}.`, note: '' }],
    }, rng);
  }
  // A common zero of numerator and denominator is a hole, not an asymptote.
  let a; let b; let c;
  do { a = nz(rng, -4, 4); b = nz(rng, -4, 4); c = rng.int(-4, 4); } while (a === b || c === a || c === b);
  const num = polyText([b * c, -(b + c), 1]);
  const den = polyText([a * b, -(a + b), 1]);
  const f = `(${num})/(${den})`;
  const options = [
    { html: `x = ${fr(a)} seulement`, correct: true },
    { html: `x = ${fr(Math.min(a, b))} et x = ${fr(Math.max(a, b))}`, correct: false, rule: 'g6_vertical_any_zero' },
    { html: `x = ${fr(b)} seulement`, correct: false },
    { html: 'aucune', correct: false },
  ];
  return mcq({
    skill: AS, level: 4, prompt: `Quelles sont les asymptotes verticales de la courbe de f(x) = ${MT(f)} ?`, options,
    key: `${AS}:mcq:v:${f}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `f(x) = ${MT(`((${minusText(b)})(${minusText(c)}))/((${minusText(b)})(${minusText(a)}))`)} = ${MT(`(${minusText(c)})/(${minusText(a)})`)} pour x ≠ ${fr(b)}. En ${fr(b)} : un trou ; en ${fr(a)} : asymptote verticale.`, note: '' }],
  }, rng);
}

function asTf(rng) {
  const kind = rng.pick(['h', 'v', 'true', 'pos']);
  const refute = (v, pred, val) => ({ kind: 'refute', quants: [{ q: '∀', v, dom: 'R' }], pred, ask: [{ v, label: `${v} =` }], answer: { [v]: String(val) } });
  if (kind === 'h') {
    const m = rng.pick([1, 2, 3]);
    const f = `${affText(m, 0)}+p√x`;
    return tfItem({
      skill: AS, level: 4, statement: `Pour tout réel p, la fonction f(x) = ${MT(f, { vars: ['x', 'p'] })} vérifie lim f(x)/x = ${m} en +∞, donc la droite y = ${MT(affText(m, 0))} est asymptote à sa courbe en +∞.`,
      truth: false, counter: refute('p', 'p=0', 1), ruleIfTrue: 'g6_oblique_h_forgot', key: `h:${f}`, exam: { format: 'tf', points: 1 },
      explanation: `Faux : m = ${m}, mais f(x) − ${MT(affText(m, 0))} = p√x → ±∞ dès que p ≠ 0 (par exemple p = 1) : branche parabolique, pas d'asymptote.`,
    });
  }
  if (kind === 'v') {
    const b = nz(rng, -3, 3);
    const f = `(x^2-c)/(${minusText(b)})`;
    return tfItem({
      skill: AS, level: 4, statement: `Pour tout réel c, la courbe de f(x) = ${MT(f, { vars: ['x', 'c'] })} a une asymptote verticale d'équation x = ${fr(b)}.`,
      truth: false, counter: refute('c', `c≠${b * b}`, b * b), ruleIfTrue: 'g6_vertical_any_zero', key: `v:${b}`, exam: { format: 'tf', points: 1 },
      explanation: `Faux : pour c = ${b * b}, f(x) = ${MT(`(x^2-${b * b})/(${minusText(b)})`)} = ${MT(minusText(-b))} pour x ≠ ${fr(b)} : un trou, pas d'asymptote.`,
    });
  }
  const d = asRat(rng);
  if (kind === 'pos' && d.k > 0) {
    return tfItem({
      skill: AS, level: 4, statement: `Pour x > ${fr(d.a)}, la courbe de f(x) = ${MT(`${d.aff}+${d.rest}`)} est au-dessus de son asymptote oblique.`,
      truth: true, key: `pos:${d.f}`, exam: { format: 'tf', points: 1 },
      explanation: `Vrai : f(x) − (${MT(d.aff)}) = ${MT(d.rest)} > 0 pour x > ${fr(d.a)}.`,
    });
  }
  return tfItem({
    skill: AS, level: 4, statement: `La droite y = ${MT(d.aff)} est asymptote à la courbe de f(x) = ${MT(d.f)} en +∞ et en −∞.`,
    truth: true, key: `t:${d.f}`, exam: { format: 'tf', points: 1 },
    explanation: `Vrai : f(x) = ${MT(`${d.aff}+${d.rest}`)}, et ${MT(d.rest)} → 0.`,
  });
}

export const GEN = {
  [AP]: (level, rng, profile, opts = {}) => apItem(level, rng, opts),
  [AS]: (level, rng, profile, opts = {}) => asItem(level, rng, opts),
  ...STUDY,
  ...PARAM,
};

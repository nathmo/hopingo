// Generators of module A2, part a (step U6): a2-compact-extreme (continuous
// functions on a compact set, true or false). Catalogue:
// docs/universite/A2-analyse-2.md.
//
// A bank of statements, drawn from the truth: the theorem (D closed and
// bounded: true) or the theorem with a hypothesis removed (D open, only
// bounded, only closed: false). A false statement asks for a function as
// counter-example, checked numerically by js/judges/a2-examples-a.js
// (fnDomain: continuous on sample points of D, and unbounded, bounded, or
// without a maximum / minimum along points that approach what D lacks;
// imageNotOpen: f(ℝ²) has a minimum or a maximum).
// The scale of the catalogue: L1 which hypothesis makes the theorem work
// (mcq), L2 true or false with three proposed counter-examples (mcq), L3
// which hypothesis is missing (mcq), L4 true or false with a counter-example
// to write (tf), L5 five of them (problem). Exam: tf.

import { MT, mcq, tfItem } from './kit.js';
import { problemItem } from './kit-problem.js';
import { PROPS } from '../../judges/a2-examples-a.js';

const SK = 'a2-compact-extreme';
const XY = { vars: ['x', 'y'] };
const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];

// Sets: html, compact, and for the others the counter-examples of each test
// (valid functions, and functions that are not counter-examples).
const DOMS = [
  { id: 'disk', compact: true, html: (r) => `le disque fermé {(x, y) : ${MT(`x^2+y^2 ≤ ${r * r}`, XY)}}` },
  { id: 'square', compact: true, html: (r) => `le carré fermé [−${r} ; ${r}] × [−${r} ; ${r}]` },
  { id: 'ellipse', compact: true, html: () => `l'ellipse pleine {(x, y) : ${MT('x^2+4y^2 ≤ 4', XY)}}` },
  { id: 'ring', compact: true, html: (r) => `l'anneau fermé {(x, y) : ${MT(`1 ≤ x^2+y^2 ≤ ${(r + 1) * (r + 1)}`, XY)}}` },
  {
    id: 'openDisk', compact: false, missing: 'fermé', kind: 'openDisk', html: (r) => `le disque ouvert {(x, y) : ${MT(`x^2+y^2 < ${r * r}`, XY)}}`,
    unbounded: (r) => `1/(${r * r}-x^2-y^2)`, noMax: () => 'x', noMin: () => 'x',
  },
  {
    id: 'punct', compact: false, missing: 'fermé', kind: 'punct', html: (r) => `le disque épointé {(x, y) : ${MT(`0 < x^2+y^2 ≤ ${r * r}`, XY)}}`,
    unbounded: () => '1/(x^2+y^2)', noMax: () => '-(x^2+y^2)', noMin: () => 'x^2+y^2',
  },
  {
    id: 'R2', compact: false, missing: 'borné', kind: 'R2', html: () => 'le plan ℝ²',
    unbounded: () => 'x', noMax: () => 'x', noMin: () => 'x',
  },
  {
    id: 'half', compact: false, missing: 'borné', kind: 'half', html: () => `le demi-plan fermé {(x, y) : ${MT('y ≥ 0', XY)}}`,
    unbounded: () => 'y', noMax: () => 'y', noMin: () => '-y',
  },
  {
    id: 'interval', compact: false, missing: 'fermé', kind: 'interval', one: true, html: () => 'l\'intervalle ouvert ]0 ; 1[ ⊂ ℝ',
    unbounded: () => '1/x', noMax: () => 'x', noMin: () => 'x',
  },
];
// Functions that are not counter-examples (they satisfy the conclusion on
// any of these sets, or are not defined on D): for the proposed options.
const NOT_COUNTERS = {
  unbounded: [{ f: 'sin(x)' }, { f: 'e^(-x^2-y^2)' }, { f: 'cos(x y)' }, { f: '1' }],
  noMax: [{ f: '-(x^2+y^2+1)' }, { f: 'cos(x)' }, { f: 'e^(-x^2-y^2)' }, { f: '1' }, { f: 'sin(y)^2' }],
  noMin: [{ f: 'x^2+y^2+1' }, { f: 'cos(x)' }, { f: '1+sin(x)^2' }, { f: '1' }, { f: '-sin(y)^2' }],
};
const NOT_COUNTERS_1 = {
  unbounded: [{ f: 'x^2' }, { f: 'sin(x)' }, { f: '1' }, { f: 'e^x' }],
  noMax: [{ f: 'x(1-x)' }, { f: 'sin(πx)' }, { f: '1' }, { f: '-(x-1/2)^2' }],
  noMin: [{ f: '(x-1/2)^2' }, { f: '-sin(πx)' }, { f: '1' }, { f: 'x^2-x' }],
};
const CONCL = {
  unbounded: { text: 'est bornée', not: 'n\'est pas bornée', thm: 'bornée' },
  noMax: { text: 'atteint son maximum sur D', not: 'n\'atteint pas son maximum', thm: 'atteint son maximum' },
  noMin: { text: 'atteint son minimum sur D', not: 'n\'atteint pas son minimum', thm: 'atteint son minimum' },
};
const fML = (f, one) => MT(f, one ? { vars: ['x'] } : XY);

function drawDomain(rng, wantCompact) {
  const D = rng.pick(DOMS.filter((d) => (wantCompact === null ? true : d.compact === wantCompact)));
  const r = rng.int(1, 3);
  return { ...D, r, text: D.html(r) };
}

// « Toute fonction continue f : D → ℝ est bornée / atteint son max / min. »
function genStatement(rng, wantCompact = null) {
  const D = drawDomain(rng, wantCompact);
  const test = rng.pick(['unbounded', 'noMax', 'noMin']);
  const C = CONCL[test];
  const truth = D.compact;
  const statement = `Soit D ${D.text}. Toute fonction continue f : D → ℝ ${C.text}.`;
  const counter = truth ? null : {
    kind: 'a2', prop: 'fnDomain', params: { domain: D.one ? { kind: 'interval', a: '0', b: '1' } : { kind: D.kind, r: D.r }, test },
    ask: [{ v: 'f', label: D.one ? 'f(x) =' : 'f(x, y) =', keys: ['calc', 'calcfn'] }], answer: { f: D[test](D.r) },
  };
  const why = truth
    ? `Vrai : D est fermé et borné, donc compact ; une fonction continue sur un compact non vide est bornée et atteint son minimum et son maximum.`
    : `Faux : D n'est pas ${D.missing}. Par exemple f(${D.one ? 'x' : 'x, y'}) = ${fML(D[test](D.r), D.one)} est continue sur D et ${C.not}.`;
  return { D, test, truth, statement, counter, why, key: `${D.id}:${D.r}:${test}`, rule: truth ? null : 'a2_compact_open' };
}

// Fixed statements of the exams (2016 Q10, 2019 Q24, 2020 Q23-26, 2021 Q20, Q22).
const FIXED = [
  {
    id: 'openUnb', truth: false, s: 'Si D ⊂ ℝ² est ouvert et f : D → ℝ continue, alors f n\'est pas bornée.', rule: 'a2_compact_open',
    counter: { prop: 'fnDomain', params: { domain: { kind: 'R2' }, test: 'bounded' }, label: 'Sur D = ℝ² (ouvert) : f(x, y) =', answer: '0' },
    why: 'Faux : f ≡ 0 est continue et bornée sur l\'ouvert ℝ².',
  },
  {
    id: 'image', truth: false, s: 'Si U ⊂ ℝ² est ouvert et f : ℝ² → ℝ continue, alors f(U) est ouvert.', rule: 'a2_open_image',
    counter: { prop: 'imageNotOpen', params: {}, label: 'Avec U = ℝ² : f(x, y) =', answer: '0' },
    why: 'Faux : f = 0 est continue et f(ℝ²) = {0} n\'est pas ouvert. C\'est l\'image réciproque d\'un ouvert qui est ouverte.',
  },
  {
    id: 'image2', truth: false, s: 'L\'image d\'un ouvert de ℝ² par une fonction continue f : ℝ² → ℝ est un ouvert de ℝ.', rule: 'a2_open_image',
    counter: { prop: 'imageNotOpen', params: {}, label: 'Avec l\'ouvert ℝ² : f(x, y) =', answer: 'x^2+y^2' },
    why: 'Faux : f(x, y) = x² + y² envoie l\'ouvert ℝ² sur [0 ; +∞[, qui n\'est pas ouvert.',
  },
  {
    id: 'closedMax', truth: false, s: 'Si D ⊂ ℝ² est fermé et f : D → ℝ continue, alors f atteint son maximum sur D.', rule: 'a2_compact_open',
    counter: { prop: 'fnDomain', params: { domain: { kind: 'R2' }, test: 'noMax' }, label: 'Sur D = ℝ² (fermé) : f(x, y) =', answer: 'x' },
    why: 'Faux : D doit aussi être borné. f(x, y) = x sur le fermé ℝ² n\'a pas de maximum.',
  },
  {
    id: 'boundedUnb', truth: false, s: 'Si D ⊂ ℝ² est borné et f : D → ℝ continue, alors f est bornée.', rule: 'a2_compact_open',
    counter: { prop: 'fnDomain', params: { domain: { kind: 'punct', r: 1 }, test: 'unbounded' }, label: 'Sur le disque épointé 0 < x² + y² ≤ 1 : f(x, y) =', answer: '1/(x^2+y^2)' },
    why: 'Faux : D doit aussi être fermé. 1/(x² + y²) est continue et non bornée sur le disque épointé, borné.',
  },
  { id: 'preimage', truth: true, s: 'Si f : ℝ² → ℝ est continue et V ⊂ ℝ ouvert, alors f⁻¹(V) est un ouvert de ℝ².', why: 'Vrai : c\'est la caractérisation de la continuité par les ouverts.' },
  { id: 'punctured', truth: true, s: 'Il existe une fonction continue et non bornée sur le disque épointé {(x, y) : 0 < x² + y² ≤ 1}.', why: 'Vrai : f(x, y) = 1/(x² + y²). Le disque épointé n\'est pas fermé.', ruleIfFalse: 'a2_compact_open' },
  { id: 'interval', truth: true, s: 'Si f est continue sur le disque fermé D = {x² + y² ≤ 1}, alors f(D) = [m ; M], où m = min f et M = max f.', why: 'Vrai : D est compact (bornes atteintes) et connexe par arcs (valeurs intermédiaires).' },
  { id: 'c2', truth: true, s: 'Si D ⊂ ℝ² est fermé, borné et non vide, et f de classe C² sur D, alors f atteint son minimum absolu sur D.', why: 'Vrai : f est continue (C² l\'implique) sur un compact non vide.' },
  { id: 'coercive', truth: true, s: 'Si f : ℝ² → ℝ est continue et f(x, y) → +∞ quand ‖(x, y)‖ → +∞, alors f atteint son minimum sur ℝ².', why: 'Vrai : hors d\'un grand disque fermé, f > f(0, 0) ; sur ce disque (compact), f atteint son minimum, qui est le minimum global.' },
];
const FIXED_FN = ['cos(cos(x-y^2))', 'e^(x y)×sin(x)', 'ln(1+x^2+y^2)', 'arctan(x+y^3)', 'x^3-3x y^2'];

function statementOf(rng, { pGen = 0.55, wantCompact = null } = {}) {
  if (rng.chance(pGen)) {
    const g = genStatement(rng, wantCompact);
    return { id: g.key, s: g.statement, truth: g.truth, counter: g.counter, why: g.why, rule: g.rule, gen: g };
  }
  if (rng.chance(0.15)) {
    const f = rng.pick(FIXED_FN);
    const D = drawDomain(rng, true);
    return { id: `fn:${f}:${D.id}`, s: `Soit D ${D.text}. La fonction f(x, y) = ${fML(f)} atteint son maximum sur D.`, truth: true, why: `Vrai : f est continue et D est fermé et borné.`, ruleIfFalse: 'a2_compact_open' };
  }
  const T = rng.pick(FIXED);
  const counter = T.counter ? { kind: 'a2', prop: T.counter.prop, params: T.counter.params, ask: [{ v: 'f', label: T.counter.label, keys: ['calc', 'calcfn'] }], answer: { f: T.counter.answer } } : null;
  return { id: T.id, s: T.s, truth: T.truth, counter, why: T.why, rule: T.rule || null, ruleIfFalse: T.ruleIfFalse || null };
}

function tfOf(level, T, { exam = false, noHints = false } = {}) {
  return tfItem({
    skill: SK, level, statement: T.s, truth: T.truth, counter: T.counter,
    prompt: T.truth ? undefined : 'Vrai ou faux ? Si c\'est faux, donne une fonction qui le montre.',
    ruleIfTrue: T.truth ? null : T.rule, ruleIfFalse: T.truth ? T.ruleIfFalse || null : null,
    hints: H('Le théorème des bornes atteintes demande D fermé, borné, non vide, et f continue.',
      T.truth ? 'Vérifie chaque hypothèse du théorème.' : 'Une hypothèse manque : essaie une fonction constante, 1/x, x, ou une fonction qui explose au bord.',
      T.why),
    noHints: noHints || level === 5,
    explanation: T.why, exam: exam ? { format: 'tf', points: 1 } : false, key: T.id,
  });
}

// L1: which hypothesis on D makes the theorem work, or which D works.
function hypMcq(level, rng) {
  if (rng.chance(0.5)) {
    const options = [
      { html: 'D fermé et borné', correct: true },
      { html: 'D ouvert et borné', correct: false, rule: 'a2_compact_open' },
      { html: 'D fermé', correct: false, rule: 'a2_compact_open' },
      { html: 'D borné', correct: false, rule: 'a2_compact_open' },
    ];
    return mcq({
      skill: SK, level, prompt: 'Théorème des bornes atteintes : soit D ⊂ ℝⁿ non vide et f : D → ℝ continue. Si … , alors f est bornée et atteint son minimum et son maximum. Quelle hypothèse sur D ?', options,
      key: 'thm', solution: [{ html: 'D doit être fermé et borné (compact). Sans « fermé » : 1/x sur ]0 ; 1[. Sans « borné » : x sur ℝ.', note: '' }],
    }, rng);
  }
  const C = drawDomain(rng, true);
  const others = rng.shuffle(DOMS.filter((d) => !d.compact)).slice(0, 3).map((d) => ({ ...d, r: C.r, text: d.html(C.r) }));
  const options = [{ html: C.text, correct: true }, ...others.map((d) => ({ html: d.text, correct: false, rule: 'a2_compact_open' }))];
  return mcq({
    skill: SK, level, prompt: 'Sur lequel de ces ensembles toute fonction continue atteint-elle son maximum ?', options,
    key: `which:${C.id}:${others.map((d) => d.id).join(',')}`, solution: [{ html: `${C.text} est fermé et borné. Les autres ne sont pas fermés, ou pas bornés.`, note: '' }],
  }, rng);
}

// L2: true or false, with three proposed counter-examples.
function proposedMcq(level, rng) {
  const g = genStatement(rng, rng.chance(0.3));
  const one = g.D.one;
  const fT = (f) => `Faux : f(${one ? 'x' : 'x, y'}) = ${fML(f, one)} est un contre-exemple`;
  // Proposed functions that the checker refuses (not counter-examples on this D).
  const pool = one ? NOT_COUNTERS_1[g.test] : NOT_COUNTERS[g.test];
  const bad = rng.shuffle(pool).filter((b) => g.truth || !PROPS.fnDomain(g.counter.params, { f: b.f }).ok);
  const options = [{ html: 'Vrai', correct: g.truth, rule: g.truth ? null : 'a2_compact_open' }];
  if (!g.truth) options.push({ html: fT(g.counter.answer.f), correct: true });
  for (const b of bad) {
    if (options.length >= 4) break;
    const html = fT(b.f);
    if (!options.some((o) => o.html === html)) options.push({ html, correct: false });
  }
  return mcq({
    skill: SK, level, prompt: `Vrai ou faux ?<br>« ${g.statement} »`, options,
    key: `prop:${g.key}`, solution: [{ html: g.why, note: '' }], expectedSec: 60,
  }, rng);
}

// L3: which hypothesis is missing (the statement is false).
function missingMcq(level, rng) {
  const g = genStatement(rng, false);
  const options = [
    { html: 'D devrait être borné', correct: g.D.missing === 'borné' },
    { html: 'D devrait être fermé', correct: g.D.missing === 'fermé' },
    { html: 'f devrait être dérivable', correct: false },
    { html: 'D devrait être ouvert', correct: false, rule: 'a2_compact_open' },
  ];
  return mcq({
    skill: SK, level, prompt: `« ${g.statement} » Cet énoncé est faux. Quelle hypothèse du théorème des bornes atteintes manque ?`, options,
    key: `miss:${g.key}`, solution: [{ html: g.why, note: '' }], expectedSec: 50,
  }, rng);
}

function compactProblem(level, rng) {
  const seen = new Set();
  const parts = [];
  for (let i = 0; parts.length < 5 && i < 60; i++) {
    const T = statementOf(rng, { pGen: 0.5 });
    if (seen.has(T.id)) continue;
    seen.add(T.id);
    parts.push({ item: tfOf(5, T, { noHints: true }), points: 1, title: `Énoncé ${parts.length + 1}` });
  }
  return problemItem({ skill: SK, level, prompt: 'Cinq énoncés : vrai ou faux ? Quand c\'est faux, donne un contre-exemple.', parts, key: parts.map((p) => p.item.key).join('+'), expectedSec: 420 });
}

export function compactItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return tfOf(4, statementOf(rng, { pGen: 0.45 }), { exam: true });
  if (level === 1) return hypMcq(1, rng);
  if (level === 2) return proposedMcq(2, rng);
  if (level === 3) return missingMcq(3, rng);
  if (level === 4) return tfOf(4, statementOf(rng));
  return compactProblem(5, rng);
}

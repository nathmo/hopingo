// Generators of module G4, part a (spec §8.3; step U5): vectors, lines of
// the plane, dot product, bisectors, lines of space, planes, relative
// positions. Catalogue: docs/universite/G-gymnase-2.md, G4. Tools: geo-kit.js.
//
// Judges: `vector` (points, vectors, numbers: cfg.symbols names the given
// points), `geom` (lines and planes), `value`. Levels: 1–2 guided (blanks in
// the reference lines, the relation given or chosen), 3 choose the action
// (cfg.menu of each part), 4 free, 5 alone (a long problem in parts, without
// help: the type `problem` comes with step U4).

import {
  q, qt, fq, nz, H, modeOf, sumT, readable, add, sub, scale, det2, mid, isInt, vt, vr, ptR, blanks,
  linesItem, mcqD, tfG, examTag, geoCounter, VML,
} from './geo-kit.js';

const KEYS = ['calc', 'geo', 'pts'];

// ======================================================================
// g4-vectors
// ======================================================================

const VEC = 'g4-vectors';
const VEC_SUB = [
  { id: 'rel', label: 'écrire la relation vectorielle', skill: VEC },
  { id: 'calc', label: 'calculer les coordonnées', skill: VEC },
  { id: 'sys', label: 'résoudre le système en α et β', skill: 'eq-systems' },
];

// A, B, D whole in [−6 ; 6]², AB⃗ and AD⃗ not colinear; C = B + D − A; the
// centre M = (A + C)/2 (whole or half).
function parallelogram(rng) {
  for (let t = 0; t < 200; t++) {
    const A = [rng.int(-6, 6), rng.int(-6, 6)].map((x) => q(x));
    const B = [rng.int(-6, 6), rng.int(-6, 6)].map((x) => q(x));
    const D = [rng.int(-6, 6), rng.int(-6, 6)].map((x) => q(x));
    const u = sub(B, A);
    const v = sub(D, A);
    if (Math.abs(det2(u, v).valueOf()) < 3) continue;
    const C = sub(add(B, D), A);
    if (C.some((x) => Math.abs(x.valueOf()) > 9)) continue;
    const M = mid(A, C);
    if (!isInt(M) && t < 150) continue; // a whole centre most of the time
    return { A, B, C, D, M };
  }
  return { A: [q(2), q(1)], B: [q(5), q(-3)], C: [q(6), q(3)], D: [q(3), q(7)], M: [q(4), q(2)], fallback: true };
}

// « 2·4 − 2 » for the component k of 2M − A (texts for the judge).
const twoMinus = (M, A, k) => `2·${par(M[k])} - ${par(A[k])}`;
const par = (x) => (q(x).n < 0 || q(x).d !== 1 ? `(${qt(x)})` : qt(x));
const plusMinus = (P, Q, R, k) => `${par(P[k])} + ${par(Q[k])} - ${par(R[k])}`;

const VEC_MENU = (kind) => [
  { id: 'mid', label: 'Milieu : M est le milieu de [AC], donc C = 2M − A', valid: kind === 'centre', why: 'Le centre n\'est pas donné ici.' },
  { id: 'transl', label: 'Translation : D = A + BC⃗ (ABCD parallélogramme ⇔ AD⃗ = BC⃗)', valid: kind === 'fourth', why: 'Ici, on connaît le centre : utilise le milieu des diagonales.' },
  { id: 'chasles', label: 'Chasles : AC⃗ = AB⃗ + BC⃗', valid: false, why: 'Chasles décompose un vecteur, mais ne donne pas le point cherché ici.' },
  { id: 'det', label: 'Colinéarité : déterminant nul', valid: false, why: 'La colinéarité sert à tester un alignement, pas à trouver un sommet.' },
  { id: 'half', label: 'C = M − A', valid: false, rule: 'g4_midpoint_half', why: 'M − A est le vecteur AM⃗, pas un point. Le centre est le milieu : M = (A + C)/2, donc C = 2M − A.' },
];

// One part « point = ? » of a vectors item.
function vecPart(o) {
  return { kind: 'segment', html: o.html, ask: `${o.name} =`, start: { math: o.name }, judge: o.judge };
}

function vecItem(level, rng, opts = {}) {
  const d = parallelogram(rng);
  const { A, B, C, D, M } = d;
  const kind = level === 5 || opts.exam ? 'centre' : level >= 3 ? rng.pick(['centre', 'fourth']) : 'centre';
  const script = [];
  let prompt;
  let first;
  const hints = [];
  const symbols = { A: vt(A), B: vt(B), M: vt(M) };
  if (kind === 'centre') {
    prompt = `Le parallélogramme ABCD a pour sommets ${ptR('A', A)} et ${ptR('B', B)}, et pour centre ${ptR('M', M)}. Calcule les coordonnées de C, puis de D.`;
    const judgeC = { kind: 'vector', symbols, expect: vt(C), via: '2M - A', ...(level === 3 ? { menu: VEC_MENU('centre') } : {}) };
    const judgeD = { kind: 'vector', symbols, expect: vt(D), via: '2M - B', ...(level === 3 ? { menu: VEC_MENU('centre') } : {}) };
    const calcC = `C = (${twoMinus(M, A, 0)} ; ${twoMinus(M, A, 1)})`;
    const calcD = `D = (${twoMinus(M, B, 0)} ; ${twoMinus(M, B, 1)})`;
    first = { judge: judgeC, start: 'C' };
    if (level === 1) script.push({ kind: 'note', html: `M est le milieu de [AC] : C = 2M − A.` });
    if (level === 2) {
      script.push({
        kind: 'decision', prompt: 'Quelle relation donne C ?', options: rng.shuffle([
          { id: 'ok', label: 'C = 2M − A', valid: true, ref: true },
          { id: 'half', label: 'C = M − A', valid: false, rule: 'g4_midpoint_half', why: 'M − A est le vecteur AM⃗. Comme M est le milieu de [AC], M = (A + C)/2, donc C = 2M − A.' },
          { id: 'plus', label: 'C = 2M + A', valid: false, rule: 'g4_midpoint_half', why: 'De M = (A + C)/2, on tire 2M = A + C, donc C = 2M − A (on retranche A).' },
        ]),
      });
    }
    if (level >= 3) script.push({ kind: 'eq', math: 'C = 2M - A', subgoal: 'rel', note: 'M est le milieu de [AC]' });
    script.push(
      { kind: 'eq', math: calcC, subgoal: 'calc', note: 'Coordonnée par coordonnée', ...(level <= 2 ? blanks(calcC, level === 1 ? [par(M[0]), par(M[1])] : [twoMinus(M, A, 0), twoMinus(M, A, 1)]) : {}) },
      { kind: 'eq', math: vt(C), subgoal: 'calc', note: '', ...(level <= 2 ? blanks(vt(C), [qt(C[0]), qt(C[1])]) : {}) },
    );
    script.push(vecPart({ name: 'D', html: `C = ${vr(C)}. Et D ?`, judge: judgeD }));
    if (level >= 3) script.push({ kind: 'eq', math: 'D = 2M - B', subgoal: 'rel', note: 'M est aussi le milieu de [BD]' });
    else script.push({ kind: 'note', html: 'M est aussi le milieu de [BD] : D = 2M − B.' });
    script.push(
      { kind: 'eq', math: calcD, subgoal: 'calc', note: '', ...(level <= 2 ? blanks(calcD, [twoMinus(M, B, 0), twoMinus(M, B, 1)]) : {}) },
      { kind: 'eq', math: vt(D), subgoal: 'calc', note: '', ...(level === 1 ? blanks(vt(D), [qt(D[0]), qt(D[1])]) : {}) },
    );
    hints.push('Le centre d\'un parallélogramme est le milieu de chaque diagonale : M = (A + C)/2.', `C = 2M − □ = (2·${par(M[0]).replace(/-/g, '−')} − □ ; 2·${par(M[1]).replace(/-/g, '−')} − □)`, `C = 2M − A = ${vr(C)}`);
  } else {
    prompt = `Les points ${ptR('A', A)}, ${ptR('B', B)} et ${ptR('C', C)} sont trois sommets du parallélogramme ABCD. Calcule les coordonnées de D.`;
    const sym = { A: vt(A), B: vt(B), C: vt(C) };
    first = { judge: { kind: 'vector', symbols: sym, expect: vt(D), via: 'A + vec(B,C)', ...(level === 3 ? { menu: VEC_MENU('fourth') } : {}) }, start: 'D' };
    script.push(
      { kind: 'eq', math: 'D = A + vec(B,C)', subgoal: 'rel', note: 'ABCD parallélogramme ⇔ AD⃗ = BC⃗' },
      { kind: 'eq', math: `D = (${plusMinus(A, C, B, 0)} ; ${plusMinus(A, C, B, 1)})`, subgoal: 'calc', note: 'BC⃗ = C − B' },
      { kind: 'eq', math: vt(D), subgoal: 'calc', note: '' },
    );
    hints.push('Dans un parallélogramme ABCD, AD⃗ = BC⃗ : D = A + BC⃗.', `D = A + (C − B) = (${fq(A[0])} + □ ; ${fq(A[1])} + □)`, `D = ${vr(D)}`);
  }
  if (level === 5 || opts.exam) {
    // Problem: the vertices, the check AB⃗ = DC⃗, then w⃗ = αu⃗ + βv⃗.
    const u = sub(B, A);
    const v = sub(D, A);
    const al = nz(rng, -4, 4);
    const be = nz(rng, -4, 4);
    const w = add(scale(u, al), scale(v, be));
    const sym2 = { A: vt(A), B: vt(B), C: vt(C), D: vt(D) };
    script.push(
      { kind: 'segment', html: 'Vérifie que AB⃗ = DC⃗.', ask: 'AB⃗ =', start: { math: 'vec(D,C)' }, judge: { kind: 'vector', symbols: sym2 } },
      { kind: 'eq', math: `vec(A,B) = ${vt(u)}`, subgoal: 'calc', note: 'Les deux vecteurs sont égaux' },
      { kind: 'segment', html: `Écris w⃗ = ${vr(w)} comme combinaison αu⃗ + βv⃗ de u⃗ = AB⃗ = ${vr(u)} et v⃗ = AD⃗ = ${vr(v)}. Le système : ${readable(sumT([[u[0], 'α'], [v[0], 'β']]))} = ${fq(w[0])} et ${readable(sumT([[u[1], 'α'], [v[1], 'β']]))} = ${fq(w[1])}. Que vaut α ?`, ask: 'α =', start: { math: 'α' }, judge: { kind: 'value', expect: String(al) } },
      { kind: 'eq', math: String(al), subgoal: 'sys', note: 'Par combinaison des deux équations' },
      { kind: 'segment', html: 'Et β ?', ask: 'β =', start: { math: 'β' }, judge: { kind: 'value', expect: String(be) } },
      { kind: 'eq', math: String(be), subgoal: 'sys', note: '' },
    );
    prompt += ` Vérifie ensuite que AB⃗ = DC⃗, puis décompose un vecteur dans la base (AB⃗, AD⃗).`;
  }
  return linesItem({
    skill: VEC, level, prompt, start: first.start, judge: first.judge, mode: modeOf(level), script,
    hints: H(...hints), subgoals: VEC_SUB, keys: KEYS, tapActions: level === 3 ? 'menu' : null,
    key: `${VEC}:${kind}:${vt(A)}${vt(B)}${vt(D)}${level === 5 || opts.exam ? ':pb' : ''}`, fallback: d.fallback,
    exam: opts.exam ? examTag(opts, 4) : false,
  });
}

function vecExam(rng, exam) {
  if (exam === 'open') return vecItem(5, rng, { exam });
  if (exam === 'tf') {
    if (rng.int(0, 2) === 0) {
      return tfG({
        skill: VEC, key: 'mid-true', truth: true, exam: examTag({ exam }),
        statement: 'M est le milieu de [AB] si et seulement si AM⃗ = MB⃗.',
        explanation: 'Vrai : AM⃗ = MB⃗ ⇔ M − A = B − M ⇔ M = (A + B)/2.',
      });
    }
    // Four aligned points with AB⃗ = DC⃗ (the answer of the counter-example).
    const a = rng.int(-3, 2);
    const k = rng.int(1, 3);
    const P = (x) => `(${x} ; ${2 * x - 1})`;
    return tfG({
      skill: VEC, key: `para:${a}:${k}`, truth: false, exam: examTag({ exam }),
      statement: 'Si AB⃗ = DC⃗, alors ABCD est un parallélogramme (non aplati).',
      counter: geoCounter('flatParallelogram', [['A', 'A ='], ['B', 'B ='], ['C', 'C ='], ['D', 'D =']], { A: P(a), B: P(a + k), C: P(a + 3 * k), D: P(a + 2 * k) }),
      explanation: `Faux : quatre points alignés peuvent vérifier AB⃗ = DC⃗, par exemple A${P(a).replace(/-/g, '−')}, B${P(a + k).replace(/-/g, '−')}, C${P(a + 3 * k).replace(/-/g, '−')}, D${P(a + 2 * k).replace(/-/g, '−')} sur la droite y = 2x − 1. Il faut aussi que A, B, C ne soient pas alignés.`,
    });
  }
  const d = parallelogram(rng);
  const { A, B, C, M } = d;
  return mcqD({
    skill: VEC, level: 4, key: `mcq:${vt(A)}${vt(B)}${vt(M)}`, exam: examTag({ exam }),
    prompt: `Le parallélogramme ABCD a pour sommets ${ptR('A', A)}, ${ptR('B', B)} et pour centre ${ptR('M', M)}. Quelles sont les coordonnées de C ?`,
    right: vr(C),
    wrongs: [
      { html: vr(sub(M, A)), rule: 'g4_midpoint_half' },
      { html: vr(add(scale(M, 2), A)), rule: 'g4_midpoint_half' },
      { html: vr(mid(A, M)), rule: 'g4_midpoint_half' },
      { html: vr(sub(scale(A, 2), M)), rule: 'g4_vector_reversed' },
    ],
    fillers: [{ html: vr(add(C, [q(1), q(0)])) }, { html: vr([C[1], C[0]]) }],
    solution: [{ html: `M est le milieu de [AC] : C = 2M − A = ${vr(C)}.`, note: '' }],
    fallback: d.fallback,
  }, rng);
}

// ======================================================================

export const GEN = {
  [VEC]: (level, rng, profile, opts = {}) => (opts.exam ? vecExam(rng, opts.exam) : vecItem(level, rng)),
};

export { VML };

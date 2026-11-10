// Generators of module G8, part a (unit `complexes`, step U4): algebraic
// form, polar form, Moivre (this file); n-th roots, square roots in
// algebraic form, quadratics (complexes-a-roots.js). Catalogue:
// docs/universite/G-gymnase-2.md, G8. Skills: complexes-a.skills.js;
// helpers: complexes-a-kit.js.
//
// Levels (spec §8.3): 1–2 guided (lines with blanks; decisions shown, then
// one to choose), 3 « choose the action » (a menu per reference line), 4
// free lines with 3 hints, 5 alone. Each item is made of parts (segments)
// judged by `complex` (a + bi, r·e^(iθ), real numbers, sets of solutions),
// `value` (a number asked: x², |z|, n) or `solset` (the arguments of the
// n-th roots). opts.exam = 'mcq' | 'tf' | 'coef' | 'open' gives the exam
// variants.

import { CQ } from '../../cas/complex.js';
import { linesItem, mcq, tfItem, answerItem, examTag } from './kit.js';
import {
  q, nz, modeOf, H, E, partsScript, M, fr, frs, ALG, EXP, ARG, ASK, KEYS, Sd, cz, czText, cqText,
  cosT, sinT, polarToCz, principalT, piT, iPiT, expText, trigText, unitText, options, clean, bl, cq, iT, joinT, par,
} from './complexes-a-kit.js';
import { GEN as ROOTS } from './complexes-a-roots.js';

const n2 = (z) => z.abs2().valueOf();
const zt = cqText;

// Lines of a part: cleaned for the judge, blanks at levels 1–2.
function prep(judge, lines, level, blanks = [], start = null) {
  const mode = modeOf(level);
  let out = clean(judge, lines, mode, start);
  if (mode === 'guided') out = out.map((l, i) => (l.kind === 'eq' ? bl(l, blanks[i] ?? [l.math], judge) : l));
  return out;
}

// ======================================================================
// g8-algebraic
// ======================================================================

const AL = 'g8-algebraic';
const AL_SUB = [
  { id: 'expand', label: 'développer', skill: 'lit-identities' },
  { id: 'isq', label: 'i² = −1', skill: AL },
  { id: 'group', label: 'regrouper', skill: AL },
  { id: 'conj', label: 'conjugué du dénominateur', skill: AL },
  { id: 'mod', label: 'module', skill: AL },
];
const AL_CHOICES = [
  { id: 'expand', label: 'Développer' },
  { id: 'isq', label: 'Remplacer i² par −1' },
  { id: 'group', label: 'Regrouper les parties réelles et imaginaires' },
  { id: 'conj', label: 'Multiplier en haut et en bas par le conjugué du dénominateur' },
  { id: 'split', label: 'Diviser partie par partie', rule: 'g8_div_componentwise', why: 'On ne divise pas partie par partie : multiplie en haut et en bas par le conjugué du dénominateur.' },
  { id: 'cycle', label: 'Utiliser i⁴ = 1 (cycle de 4)' },
  { id: 'mod', label: 'Module : √(a² + b²)' },
];

const randZ = (rng, m = 5) => cq(nz(rng, -m, m), nz(rng, -m, m));

// z₁·z₂ (+ z₃), (a + bi)², q·d/d, iⁿ, |a + bi|: {kind, start, lines, value, …}.
function alData(kind, rng) {
  if (kind === 'prod') {
    const z1 = randZ(rng);
    const z2 = randZ(rng);
    const z3 = rng.chance(0.6) ? randZ(rng) : null;
    const [a, b, c, d] = [z1.re.n, z1.im.n, z2.re.n, z2.im.n];
    const tail = z3 ? termsOf3(z3) : [];
    const value = z1.mul(z2).add(z3 || 0);
    return {
      kind, value, z1, z2, z3, isq: String(Math.abs(b * d)),
      start: `${par(z1)}${par(z2)}${z3 ? `+(${zt(z3)})` : ''}`,
      lines: [
        E(joinT([String(a * c), iT(a * d), iT(b * c), iT(b * d, '^2'), ...tail]), 'Développer', 'expand', 'expand'),
        E(joinT([String(a * c), iT(a * d), iT(b * c), String(-b * d), ...tail]), 'i² = −1', 'isq', 'isq'),
        E(zt(value), 'Regrouper', 'group', 'group'),
      ],
    };
  }
  if (kind === 'square') {
    const z = randZ(rng, 6);
    const [a, b] = [z.re.n, z.im.n];
    const value = z.mul(z);
    return {
      kind, value, z, isq: String(b * b),
      start: `(${zt(z)})^2`,
      lines: [
        E(joinT([String(a * a), iT(2 * a * b), iT(b * b, '^2')]), '(a + b)² = a² + 2ab + b²', 'expand', 'expand'),
        E(joinT([String(a * a), iT(2 * a * b), String(-b * b)]), 'i² = −1', 'isq', 'isq'),
        E(zt(value), 'Regrouper', 'group', 'group'),
      ],
    };
  }
  if (kind === 'quot') {
    for (let k = 0; k < 200; k++) {
      const value = cq(nz(rng, -4, 4), rng.int(-4, 4));
      const d = randZ(rng, 3);
      if (n2(d) > 13) continue;
      const n = value.mul(d);
      const cd = d.conj();
      const N = n.mul(cd);
      const D = d.abs2().n;
      const top = n.re.n && n.im.n ? `(${zt(n)})` : zt(n);
      return {
        kind, value, n, d, cd, N, D,
        start: `${top}/(${zt(d)})`,
        lines: [
          E(`(${par(n)}(${zt(cd)}))/((${zt(d)})(${zt(cd)}))`, 'Conjugué du dénominateur', 'conj', 'conj'),
          E(`${N.re.n && N.im.n ? `(${zt(N)})` : zt(N)}/${D}`, `(${zt(d)})(${zt(cd)}) = ${D}`.replace(/-/g, '−'), 'expand', 'expand'),
          E(zt(value), 'Diviser', 'group', 'group'),
        ],
      };
    }
  }
  if (kind === 'pow') {
    const n = rng.int(10, 2030);
    const r = n % 4;
    const k = (n - r) / 4;
    const value = new CQ(0, 1).pow(r);
    const lines = [E(r ? `(i^4)^${k}×i${r > 1 ? `^${r}` : ''}` : `(i^4)^${k}`, `${n} = 4·${k} + ${r}`, 'isq', 'cycle')];
    if (r >= 2) lines.push(E(`i^${r}`, 'i⁴ = 1', 'isq', 'cycle'));
    lines.push(E(zt(value), r >= 2 ? 'i² = −1' : 'i⁴ = 1', 'isq', r >= 2 ? 'isq' : 'cycle'));
    return { kind, value, n, r, k, start: `i^${n}`, lines };
  }
  // |a + bi| with a Pythagorean triple.
  const [a0, b0, c] = rng.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 6, 10], [8, 15, 17], [15, 8, 17]]);
  const z = cq(rng.pick([-1, 1]) * a0, rng.pick([-1, 1]) * b0);
  return {
    kind: 'mod', value: cq(c), z, start: `|${zt(z)}|`,
    lines: [
      E(`√(${a0 * a0}+${b0 * b0})`, '|a + bi| = √(a² + b²)', 'mod', 'mod'),
      E(`√${c * c}`, 'Additionner', 'mod', 'mod'),
      E(String(c), 'Racine', 'mod', 'mod'),
    ],
  };
}
const termsOf3 = (z) => [z.re.n ? String(z.re.n) : '', z.im.n ? iT(z.im.n) : ''];

function alHints(d) {
  if (d.kind === 'quot') return H('Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur.', `${M(`(${par(d.n)}(□))/${d.D}`)}`, M(zt(d.value)));
  if (d.kind === 'pow') return H('Les puissances de i se répètent tous les 4 : i, −1, −i, 1. Écris l\'exposant n = 4k + r.', `${M(`(i^4)^${d.k}×i^${d.r}`)} = ${M(`1×i^${d.r}`)} = □`, M(zt(d.value)));
  if (d.kind === 'mod') return H('|a + bi| = √(a² + b²) : c\'est une longueur (Pythagore).', `${M(d.lines[0].math)} = √□`, M(zt(d.value)));
  return H('Développe comme avec des polynômes en i, puis remplace i² par −1.', `${M(d.lines[0].math)}, et ${M(d.kind === 'square' ? `${d.z.im.n * d.z.im.n}i^2` : 'i^2')} = □`, M(zt(d.value)));
}

const AL_ASK = {
  prod: 'Calcule et écris sous la forme a + bi :',
  square: 'Développe et écris sous la forme a + bi :',
  quot: 'Écris sous la forme a + bi :',
  pow: 'Simplifie :',
  mod: 'Calcule le module :',
};

function alItem(level, rng, opts = {}) {
  const kinds = level === 1 ? ['prod', 'square', 'quot', 'mod'] : level === 2 ? ['quot', 'quot', 'prod', 'square'] : ['prod', 'square', 'quot', 'quot', 'pow', 'mod'];
  if (level === 5) return alCombined(rng, opts);
  const d = alData(rng.pick(kinds), rng);
  const judge = ALG;
  const mode = modeOf(level);
  const blanks = {
    prod: [[iT(Math.abs(d.z1?.im.n * d.z2?.im.n) || 1, '^2')], [d.isq], []],
    square: [[iT(Math.abs(2 * (d.z?.im.n ?? 1) * (d.z?.re.n ?? 1)))], [d.isq], []],
    quot: [[zt(d.cd ?? cq(0))], [d.N ? zt(d.N) : ''], []],
    pow: [[String(d.k)], [], []],
    mod: [[`${(d.z?.im.n || 0) ** 2}`], [], []],
  }[d.kind];
  const lines = prep(judge, d.lines, level, blanks);
  const pre = [];
  if (level === 2 && d.kind === 'quot') {
    pre.push({ kind: 'decision', prompt: 'Comment se débarrasser de i au dénominateur ?', options: [
      { id: 'conj', label: `Multiplier en haut et en bas par le conjugué ${frs(zt(d.cd))}`, valid: true },
      { id: 'split', label: 'Diviser la partie réelle par la partie réelle, et la partie imaginaire par la partie imaginaire', valid: false, rule: 'g8_div_componentwise', why: `Contrôle : le résultat fois ${frs(zt(d.d))} ne redonne pas ${frs(zt(d.n))}. On ne divise pas partie par partie.` },
      { id: 'same', label: `Multiplier en haut et en bas par ${frs(zt(d.d))}`, valid: false, why: `(${frs(zt(d.d))})² n'est pas réel : il reste du i au dénominateur. C'est le conjugué qui donne un réel.` },
    ] });
  }
  const { start, judge: j, script } = partsScript([{ start: d.start, judge, pre, lines }], level, AL_CHOICES);
  return linesItem({
    skill: AL, level, mode, start, judge: j, script,
    prompt: `${AL_ASK[d.kind]} ${M(d.start)}`,
    hints: alHints(d), subgoals: AL_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${AL}:${level}:${d.kind}:${d.start}`, exam: examTag(opts),
  });
}

// Level 5 (CMS série 14): a quotient plus iⁿ, or a product plus iⁿ.
function alCombined(rng, opts) {
  const a = alData(rng.pick(['quot', 'prod']), rng);
  const p = alData('pow', rng);
  const value = a.value.add(p.value);
  const start = `${a.start}+i^${p.n}`;
  const first = a.kind === 'quot' ? a.lines[0].math : a.lines[0].math;
  const lines = clean(ALG, [
    E(`${a.kind === 'quot' ? first : `(${first})`}+(i^4)^${p.k}×i^${p.r}`, a.kind === 'quot' ? 'Conjugué ; cycle de 4' : 'Développer ; cycle de 4', 'expand'),
    E(`${par(a.value)}+i^${p.r}`, 'Calculer', 'isq'),
    E(zt(value), 'Regrouper', 'group'),
  ], 'free');
  return linesItem({
    skill: AL, level: 5, mode: 'free', start, judge: ALG, script: lines,
    prompt: `Écris sous la forme a + bi, sans aide : ${M(start)}`,
    hints: [], subgoals: AL_SUB, keys: KEYS,
    key: `${AL}:5:${start}`, exam: examTag(opts),
  });
}

// mcq: a quotient (componentwise, i² = 1), a product (i² = 1) or a modulus.
function alMcq(rng) {
  const kind = rng.pick(['quot', 'prod', 'mod']);
  const d = alData(kind, rng);
  const right = { html: M(zt(d.value)) };
  const wrongs = [];
  if (kind === 'quot') {
    const { n, d: den } = d;
    if (den.re.n && den.im.n) wrongs.push({ html: M(zt(new CQ(n.re.div(den.re), n.im.div(den.im)))), rule: 'g8_div_componentwise' });
    // i² = +1 in numerator and denominator.
    const top = cq(n.re.mul(d.cd.re).add(n.im.mul(d.cd.im)), n.re.mul(d.cd.im).add(n.im.mul(d.cd.re)));
    const bot = den.re.mul(den.re).sub(den.im.mul(den.im));
    if (bot.n) wrongs.push({ html: M(zt(top.div(cq(bot)))), rule: 'g8_i_squared' });
    wrongs.push({ html: M(zt(d.value.conj())) });
  } else if (kind === 'prod') {
    const { z1, z2, z3 } = d;
    const plus = cq(z1.re.mul(z2.re).add(z1.im.mul(z2.im)), z1.re.mul(z2.im).add(z1.im.mul(z2.re))).add(z3 || 0);
    wrongs.push({ html: M(zt(plus)), rule: 'g8_i_squared' });
    wrongs.push({ html: M(zt(cq(z1.re.mul(z2.re), z1.im.mul(z2.im)).add(z3 || 0))) });
    wrongs.push({ html: M(zt(d.value.conj())) });
  } else {
    const [a, b] = [Math.abs(d.z.re.n), Math.abs(d.z.im.n)];
    wrongs.push({ html: M(String(a + b)), rule: 'g8_modulus_no_square' });
    wrongs.push({ html: M(`√${a + b}`), rule: 'g8_modulus_no_square' });
    wrongs.push({ html: M(String(a * a + b * b)) });
  }
  const fill = [d.value.neg(), d.value.add(1), d.value.add(cq(0, 1)), d.value.mul(2)].map((z) => ({ html: M(zt(z)) }));
  return mcq({
    skill: AL, level: 4, prompt: `${AL_ASK[kind]} ${M(d.start)}`,
    options: options(right, wrongs, fill),
    key: `${AL}:mcq:${d.start}`, expectedSec: 90, exam: { format: 'mcq', points: 1 },
    solution: d.lines.map((l, i) => ({ html: `${i ? '= ' : `${M(d.start)} = `}${M(l.math)}`, note: l.note || '' })),
  }, rng);
}

// True or false: statements on z₁, z₂ ∈ ℂ; the false ones are refuted by
// complex values (js/judges/counters-complex.js).
const AL_TF = [
  { s: '|z₁ + z₂| = |z₁| + |z₂|', pred: '|z+w|=|z|+|w|', truth: false, answer: { z: '1', w: '-1' }, why: 'Avec z₁ = 1 et z₂ = −1 : |0| = 0, mais |1| + |−1| = 2. Seule l\'inégalité |z₁ + z₂| ≤ |z₁| + |z₂| est vraie.' },
  { s: '|z₁ − z₂| = |z₁| − |z₂|', pred: '|z-w|=|z|-|w|', truth: false, answer: { z: '1', w: '-1' }, why: 'Avec z₁ = 1 et z₂ = −1 : |2| = 2, mais |1| − |−1| = 0.' },
  { s: '|z₁·z₂| = |z₁|·|z₂|', truth: true, why: 'Les modules se multiplient : |z₁z₂|² = z₁z₂·z̄₁z̄₂ = |z₁|²·|z₂|².' },
  { s: 'z₁·z̄₁ = |z₁|²', truth: true, why: '(a + bi)(a − bi) = a² − (bi)² = a² + b².' },
  { s: 'Re(z₁·z₂) = Re(z₁)·Re(z₂)', pred: 'Re(z×w)=Re(z)×Re(w)', truth: false, answer: { z: 'i', w: 'i' }, why: 'Avec z₁ = z₂ = i : Re(i·i) = Re(−1) = −1, mais Re(i)·Re(i) = 0.' },
  { s: 'conj(z₁ + z₂) = z̄₁ + z̄₂ et conj(z₁z₂) = z̄₁·z̄₂', truth: true, why: 'Le conjugué change le signe de i partout : il respecte les sommes et les produits.' },
  { s: '|z₁|² = z₁²', pred: '|z|^2=z^2', truth: false, one: true, answer: { z: 'i' }, why: 'Avec z₁ = i : |i|² = 1, mais i² = −1. C\'est z₁·z̄₁ qui vaut |z₁|².' },
];

function alTf(rng) {
  const t = rng.pick(AL_TF);
  const vars = t.one ? ['z'] : ['z', 'w'];
  const ask = vars.map((v, k) => ({ v, label: `z${k ? '₂' : t.one ? '₁' : '₁'} =`, keys: ['calc', 'cplx'] }));
  return tfItem({
    skill: AL, level: 4, statement: `Pour tous ${t.one ? 'z₁' : 'z₁, z₂'} ∈ ℂ : ${t.s}.`, truth: t.truth,
    counter: t.truth ? null : { kind: 'complex', vars, pred: t.pred, ask, answer: t.answer },
    ruleIfTrue: t.s.startsWith('|z₁ + z₂|') || t.s.startsWith('|z₁ −') ? 'g8_modulus_no_square' : null,
    explanation: t.why, key: `${AL}:${t.s}`, exam: { format: 'tf', points: 1 },
  });
}

// coef: the real (or imaginary) part of a product plus a number, or of a quotient.
function alCoef(rng) {
  const d = alData(rng.pick(['prod', 'quot', 'square']), rng);
  const re = rng.chance(0.6);
  const v = re ? d.value.re : d.value.im;
  const wrong = [];
  if (d.kind === 'prod' || d.kind === 'square') {
    const z1 = d.z1 ?? d.z;
    const z2 = d.z2 ?? d.z;
    const plus = cq(z1.re.mul(z2.re).add(z1.im.mul(z2.im)), z1.re.mul(z2.im).add(z1.im.mul(z2.re))).add(d.z3 || 0);
    const w = re ? plus.re : plus.im;
    if (!w.eq(v)) wrong.push({ value: w.toString(), rule: 'g8_i_squared' });
  }
  if (d.kind === 'quot' && d.d.re.n && d.d.im.n) {
    const w = re ? d.n.re.div(d.d.re) : d.n.im.div(d.d.im);
    if (!w.eq(v)) wrong.push({ value: w.toString(), rule: 'g8_div_componentwise' });
  }
  return answerItem({
    skill: AL, level: 4, prompt: `Donne la partie ${re ? 'réelle' : 'imaginaire'} de ${M(d.start)}.`,
    expected: v.toString(), traps: wrong,
    solution: [{ html: `${M(d.start)} = ${M(zt(d.value))} : partie ${re ? 'réelle' : 'imaginaire'} ${M(v.toString())}.`, note: '' }],
    key: d.start, exam: { format: 'coef', points: 1 },
  });
}

// ======================================================================
// g8-polar
// ======================================================================

const PO = 'g8-polar';
const PO_SUB = [
  { id: 'mod', label: 'module', skill: PO },
  { id: 'cossin', label: 'cos θ et sin θ', skill: 'g3-exact' },
  { id: 'arg', label: 'quadrant, argument', skill: PO },
  { id: 'exp', label: 'forme exponentielle', skill: PO },
];
const PO_CHOICES = [
  { id: 'mod', label: 'Module r = √(a² + b²)' },
  { id: 'cossin', label: 'cos θ = a/r et sin θ = b/r' },
  { id: 'arg', label: 'Lire le quadrant, puis θ' },
  { id: 'atan', label: 'θ = arctan(b/a), sans regarder le quadrant', rule: 'g8_arg_quadrant', why: 'arctan(b/a) ne donne le bon angle que si a > 0.' },
  { id: 'exp', label: 'Écrire r·e^(iθ)' },
  { id: 'trig', label: 'Écrire r(cos θ + i sin θ)' },
  { id: 'eval', label: 'Valeurs exactes de cos θ et sin θ, puis forme a + bi' },
  { id: 'rules', label: 'Multiplier les modules, additionner les arguments' },
];

// r and θ = tπ with an exact a + bi.
const PI4 = [[new Sd(1, 2), [1, 3, -1, -3]], [new Sd(2, 2), [1, 3, -1, -3]], [new Sd(2), [1, 3, -1, -3]]];
const PI6 = [[new Sd(2), [1, 2, 4, 5, -1, -2, -4, -5]], [new Sd(4), [1, 2, 4, 5, -1, -2, -4, -5]], [new Sd(2, 3), [1, 2, 4, 5, -1, -2, -4, -5]]];
function polarData(rng, { left = false, axes = true } = {}) {
  for (let k = 0; k < 200; k++) {
    let r;
    let t;
    if (axes && rng.chance(0.08)) {
      r = new Sd(rng.int(2, 4));
      t = rng.pick([q(1, 2), q(-1, 2), q(1)]);
    } else if (rng.chance(0.45)) {
      const [rr, ks] = rng.pick(PI4);
      r = rr;
      t = q(rng.pick(ks), 4);
    } else {
      const [rr, ks] = rng.pick(PI6);
      r = rr;
      t = q(rng.pick(ks), 6);
    }
    const z = polarToCz(r, t);
    if (left && !(z.re.sign() < 0 && !z.im.isZero())) continue;
    return { r, t, z };
  }
  return { r: new Sd(2), t: q(2, 3), z: polarToCz(2, q(2, 3)), fallback: true };
}
const QUAD = (z) => (z.re.sign() > 0 ? (z.im.sign() >= 0 ? '1er' : '4e') : z.re.sign() < 0 ? (z.im.sign() >= 0 ? '2e' : '3e') : null);

// Module part: r = |z| = √(a² + b²).
function modPart(z, r, level, html = 'Module : r = |z| =') {
  const a2 = z.re.mul(z.re).p;
  const b2 = z.im.mul(z.im).p;
  const lines = prep(ALG, [E(`√(${a2}+${b2})`, 'r = √(a² + b²)', 'mod', 'mod'), E(r.text(), 'Calculer', 'mod', 'mod')], level, [[], [r.text()]]);
  return { html, ask: 'r =', start: `|${czText(z)}|`, judge: ALG, lines };
}

function poAlgToExp(level, rng, opts) {
  const d = polarData(rng, { left: level === 2 || rng.chance(0.5) });
  const { r, t, z } = d;
  const zs = czText(z);
  const c = cosT(t);
  const s = sinT(t);
  const quad = QUAD(z);
  const parts = [];
  if (level !== 1) parts.push(modPart(z, r, level));
  if (level === 1 || level === 3) {
    parts.push({ html: `cos θ = a/r =`, ask: 'cos θ =', start: 'cos(θ)', judge: ASK(c.text()), lines: prep(ASK(c.text()), [E(c.text(), 'a/r', 'cossin', 'cossin')], level) });
    parts.push({ html: `sin θ = b/r =`, ask: 'sin θ =', start: 'sin(θ)', judge: ASK(s.text()), lines: prep(ASK(s.text()), [E(s.text(), 'b/r', 'cossin', 'cossin')], level) });
  }
  const pre = [];
  if (level === 2 && quad) {
    const wrongT = principalT(t.add(1));
    pre.push({ kind: 'decision', prompt: `cos θ = ${fr(c.text())} et sin θ = ${fr(s.text())}. Dans quel quadrant est z ?`, options: [
      { id: 'q', label: `${quad} quadrant`, valid: true },
      ...['1er', '2e', '3e', '4e'].filter((x) => x !== quad).slice(0, 2).map((x) => ({ id: x, label: `${x} quadrant`, valid: false, why: `Le signe de a = ${fr(z.re.text())} et celui de b = ${fr(z.im.text())} donnent le ${quad} quadrant.` })),
      ...(z.re.sign() < 0 ? [{ id: 'atan', label: `θ = arctan(b/a) = ${fr(piT(wrongT))}`, valid: false, rule: 'g8_arg_quadrant', why: `arctan donne un angle entre −π/2 et π/2 : ici a < 0, il faut ajouter ou retirer π.` }] : []),
    ] });
  }
  parts.push({ html: level === 1 ? 'Argument : θ (dans ]−π ; π]) =' : 'Argument : θ = arg z (dans ]−π ; π]) =', ask: 'θ =', start: `arg(${zs})`, judge: ARG, pre, lines: prep(ARG, [E(piT(t), `${quad ?? 'Axe'} : θ = ${fr(piT(t))}`, 'arg', 'arg')], level) });
  parts.push({ html: 'Forme exponentielle :', ask: 'z =', start: zs, judge: EXP, lines: prep(EXP, [E(expText(r, t), 'z = r·e^(iθ)', 'exp', 'exp')], level) });
  const given = level === 1 ? ` On donne r = |z| = ${M(r.text())}.` : '';
  const { start, judge, script } = partsScript(parts, level, PO_CHOICES);
  return linesItem({
    skill: PO, level, mode: modeOf(level), start, judge, script,
    prompt: `Écris z = ${M(zs)} sous forme exponentielle r·e^(iθ), avec θ dans ]−π ; π].${given}`,
    hints: H('Calcule r = |z|, puis cos θ = a/r et sin θ = b/r : le signe de a et celui de b disent le quadrant.', `cos θ = ${M(c.text())} et sin θ = ${M(s.text())} : θ = □`, M(expText(r, t))),
    subgoals: PO_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${PO}:${level}:a2e:${zs}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

function poExpToAlg(level, rng, opts) {
  const d = polarData(rng);
  const { r, t, z } = d;
  const ex = expText(r, t);
  const lines = prep(ALG, [
    E(trigText(r, t), 'e^(iθ) = cos θ + i sin θ', 'cossin', 'trig'),
    E(r.eq(1) ? unitText(t) : `${r.factor()}(${unitText(t)})`, 'Valeurs exactes', 'cossin', 'eval'),
    E(czText(z), 'Développer', 'exp', 'eval'),
  ], level, [[piT(t)], [unitText(t)], []]);
  const { start, judge, script } = partsScript([{ start: ex, judge: ALG, lines }], level, PO_CHOICES);
  return linesItem({
    skill: PO, level, mode: modeOf(level), start, judge, script,
    prompt: `Écris z = ${M(ex)} sous la forme a + bi.`,
    hints: H('r·e^(iθ) = r(cos θ + i sin θ) : remplace cos θ et sin θ par leurs valeurs exactes.', `${M(ex)} = ${M(r.eq(1) ? 'cos(□)+i sin(□)' : `${r.factor()}(cos(□)+i sin(□))`)}`, M(czText(z))),
    subgoals: PO_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${PO}:${level}:e2a:${ex}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// Product or quotient of two exponential forms, the sum (difference) of
// the arguments staying in ]−π ; π].
function poRules(level, rng, opts) {
  for (let k = 0; k < 200; k++) {
    const r1 = rng.int(1, 4);
    const r2 = rng.int(1, 4);
    const den = rng.pick([4, 6, 12]);
    const t1 = q(rng.int(-den + 1, den), den);
    const t2 = q(rng.int(-den + 1, den), den);
    if (t1.n === 0 || t2.n === 0 || t1.eq(t2)) continue;
    const div = rng.chance(0.4);
    if (div && r1 % r2 !== 0) continue;
    const t = div ? t1.sub(t2) : t1.add(t2);
    if (t.n === 0 || t.valueOf() <= -1 || t.valueOf() > 1) continue;
    const r = div ? r1 / r2 : r1 * r2;
    const e1 = expText(r1, t1);
    const e2 = expText(r2, t2);
    const start = div ? `(${e1})/(${e2})` : `${e1}×${e2}`;
    const sumT = `${piT(t1)}${div ? '-' : '+'}${t2.n < 0 ? `(${piT(t2)})` : piT(t2)}`;
    const lines = prep(EXP, [
      E(`(${r1}${div ? '/' : '×'}${r2})e^(i(${sumT}))`, div ? 'Diviser les modules, soustraire les arguments' : 'Multiplier les modules, additionner les arguments', 'exp', 'rules'),
      E(expText(r, t), 'Calculer', 'exp', 'rules'),
    ], level, [[String(r2)], [piT(t)]]);
    const { start: s0, judge, script } = partsScript([{ start, judge: EXP, lines }], level, PO_CHOICES);
    return linesItem({
      skill: PO, level, mode: modeOf(level), start: s0, judge, script,
      prompt: `Écris sous forme exponentielle r·e^(iθ), avec θ dans ]−π ; π] : ${M(start)}`,
      hints: H(`e^(iθ)·e^(iφ) = e^(i(θ + φ))${div ? ' et e^(iθ)/e^(iφ) = e^(i(θ − φ))' : ''} : on ${div ? 'divise' : 'multiplie'} les modules et on ${div ? 'soustrait' : 'additionne'} les arguments.`, `${M(start)} = ${M(`${r === 1 ? '' : r}e^(i(□))`)}`, M(expText(r, t))),
      subgoals: PO_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
      key: `${PO}:${level}:rules:${start}`, exam: examTag(opts),
    });
  }
  return poAlgToExp(level, rng, opts);
}

// Level 5: a quotient or a product of two numbers in algebraic form,
// written in exponential form (the CMS item in α is left out).
function poCombined(rng, opts) {
  for (let k = 0; k < 200; k++) {
    const a = polarData(rng, { axes: false });
    const b = polarData(rng, { axes: false });
    const div = rng.chance(0.6);
    const t = div ? a.t.sub(b.t) : a.t.add(b.t);
    if (t.n === 0 || t.valueOf() <= -1 || t.valueOf() > 1) continue;
    const r = div ? (a.r.isRational() && b.r.isRational() ? new Sd(a.r.p.div(b.r.p)) : a.r.s === b.r.s ? new Sd(a.r.p.div(b.r.p)) : null) : a.r.mul(b.r);
    if (!r) continue;
    const za = czText(a.z);
    const zb = czText(b.z);
    const start = div ? `(${za})/(${zb})` : `(${za})(${zb})`;
    const ea = expText(a.r, a.t);
    const eb = expText(b.r, b.t);
    const lines = clean(EXP, [
      E(div ? `(${ea})/(${eb})` : `${ea}×${eb}`, 'Forme exponentielle de chaque facteur', 'exp'),
      E(expText(r, t), div ? 'Diviser les modules, soustraire les arguments' : 'Multiplier les modules, additionner les arguments', 'exp'),
    ], 'free');
    return linesItem({
      skill: PO, level: 5, mode: 'free', start, judge: EXP, script: lines,
      prompt: `Écris z = ${M(start)} sous forme exponentielle r·e^(iθ), θ dans ]−π ; π], sans aide.`,
      hints: [], subgoals: PO_SUB, keys: KEYS,
      key: `${PO}:5:${start}`, exam: examTag(opts),
    });
  }
  return poAlgToExp(4, rng, opts);
}

function poItem(level, rng, opts = {}) {
  if (level === 5) return poCombined(rng, opts);
  if (level <= 2) return level === 1 && rng.chance(0.35) ? poExpToAlg(level, rng, opts) : poAlgToExp(level, rng, opts);
  const g = rng.next();
  if (g < 0.5) return poAlgToExp(level, rng, opts);
  if (g < 0.8) return poExpToAlg(level, rng, opts);
  return poRules(level, rng, opts);
}

function poMcq(rng) {
  const { r, t, z } = polarData(rng, { left: true, axes: false });
  const right = { html: M(expText(r, t)) };
  const wrongs = [
    { html: M(expText(r, principalT(t.add(1)))), rule: 'g8_arg_quadrant' },
    { html: M(expText(r.mul(r), t)) },
    { html: M(expText(r, t.neg())) },
    { html: M(expText(r, q(1, 2).sub(t))) },
  ];
  return mcq({
    skill: PO, level: 4, prompt: `Forme exponentielle de z = ${M(czText(z))} (θ dans ]−π ; π]) :`,
    options: options(right, wrongs),
    key: `${PO}:mcq:${czText(z)}`, expectedSec: 90, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `r = ${M(r.text())}, cos θ = ${M(cosT(t).text())}, sin θ = ${M(sinT(t).text())} : ${QUAD(z)} quadrant, θ = ${M(piT(t))}.`, note: '' }],
  }, rng);
}

const PO_TF = [
  { s: 'Pour tout z = a + bi avec a ≠ 0 : arg z = arctan(b/a).', vars: ['z'], hyp: 'Re(z)≠0', pred: 'arg(z)=arctan(Im(z)/Re(z))', truth: false, answer: { z: '-1+i' }, rule: 'g8_arg_quadrant', why: 'Faux quand a < 0 : arg(−1 + i) = 3π/4, mais arctan(−1) = −π/4. Il faut corriger de π.' },
  { s: 'Pour tous réels θ et φ : e^(iθ)·e^(iφ) = e^(i(θ + φ)).', truth: true, why: 'C\'est la règle d\'addition : cos(θ + φ) + i sin(θ + φ).' },
  { s: 'Pour tout réel θ : |e^(iθ)| = 1.', truth: true, why: '|cos θ + i sin θ| = √(cos²θ + sin²θ) = 1.' },
  { s: 'Pour tout z ≠ 0 : z = |z|·e^(i·arg z).', truth: true, why: 'C\'est la forme exponentielle : r = |z| et θ = arg z.' },
  { s: 'Pour tout réel θ : e^(iθ) + e^(−iθ) = 2cos θ.', truth: true, why: 'Les parties imaginaires i sin θ et −i sin θ s\'annulent.' },
  { s: 'Pour tous z, w ≠ 0 : arg(z·w) = arg z + arg w (arguments dans ]−π ; π]).', vars: ['z', 'w'], pred: 'arg(z×w)=arg(z)+arg(w)', truth: false, answer: { z: '-1', w: '-1' }, why: 'Avec z = w = −1 : arg(1) = 0, mais π + π = 2π. L\'égalité n\'est vraie qu\'à 2π près.' },
  { s: 'Pour tout z ≠ 0 : arg(−z) = arg z + π (arguments dans ]−π ; π]).', vars: ['z'], pred: 'arg(-z)=arg(z)+π', truth: false, answer: { z: 'i' }, why: 'Avec z = i : arg(−i) = −π/2, mais π/2 + π = 3π/2, qui n\'est pas dans ]−π ; π]. L\'égalité n\'est vraie qu\'à 2π près.' },
];

function poTf(rng) {
  const t = rng.pick(PO_TF);
  const labels = { z: 'z =', w: 'w =' };
  return tfItem({
    skill: PO, level: 4, statement: t.s, truth: t.truth,
    counter: t.truth ? null : { kind: 'complex', vars: t.vars, hyp: t.hyp, pred: t.pred, ask: t.vars.map((v) => ({ v, label: labels[v], keys: ['calc', 'cplx'] })), answer: t.answer },
    ruleIfTrue: t.rule || null,
    explanation: t.why, key: `${PO}:${t.s}`, exam: { format: 'tf', points: 1 },
  });
}

// coef: θ = arg z alone.
function poCoef(rng) {
  const { t, z } = polarData(rng, { left: rng.chance(0.6) });
  const zs = czText(z);
  return linesItem({
    skill: PO, level: 4, mode: 'free', start: `arg(${zs})`, judge: ARG,
    script: [E(piT(t), `${QUAD(z) ?? 'axe'}`, 'arg')],
    prompt: `Donne θ = arg z, dans ]−π ; π], pour z = ${M(zs)}.`,
    hints: [], subgoals: PO_SUB, keys: KEYS,
    key: `${PO}:coef:${zs}`, exam: { format: 'coef', points: 1 },
  });
}

// ======================================================================
// g8-moivre
// ======================================================================

const MO = 'g8-moivre';
const MO_SUB = [
  { id: 'exp', label: 'forme exponentielle', skill: 'g8-polar' },
  { id: 'pow', label: 'élever module et argument', skill: MO },
  { id: 'reduce', label: 'réduire l\'argument', skill: MO },
  { id: 'alg', label: 'forme algébrique', skill: MO },
];
const MO_CHOICES = [
  { id: 'exp', label: 'Écrire z sous forme exponentielle' },
  { id: 'pow', label: 'Élever : rⁿ et nθ' },
  { id: 'powarg', label: 'Multiplier l\'argument par n, garder le module', rule: 'g8_moivre_modulus', why: 'Le module aussi est élevé à la puissance n.' },
  { id: 'reduce', label: 'Ramener l\'argument dans ]−π ; π]' },
  { id: 'alg', label: 'Revenir à la forme a + bi' },
];

const MO_Z = [
  ...[1, 3, -1, -3].map((k) => [new Sd(1, 2), q(k, 4)]),
  ...[1, 2, 4, 5, -1, -2, -4, -5].map((k) => [new Sd(2), q(k, 6)]),
  ...[1, 2, 4, 5, -1, -2, -4, -5].map((k) => [new Sd(1), q(k, 6)]),
  ...[1, 3, -1, -3].map((k) => [new Sd(1), q(k, 4)]),
];
// 15π/2 − 8π = −π/2, −10π/3 + 4π = 2π/3.
const turnsNote = (nt, tp) => { const k = nt.sub(tp); return `${fr(piT(nt))} ${k.n > 0 ? '−' : '+'} ${fr(piT(k.n > 0 ? k : k.neg()))} = ${fr(piT(tp))}`; };
const powSd = (r, n) => { let o = new Sd(1); for (let k = 0; k < n; k++) o = o.mul(r); return o; };
const rPow = (r, n) => (r.eq(1) ? '' : r.isRational() ? `${r.text()}^${n}` : `(${r.text()})^${n}`);

function moData(rng) {
  for (let k = 0; k < 200; k++) {
    const [r, t] = rng.pick(MO_Z);
    const n = rng.int(5, 12);
    const rn = powSd(r, n);
    if (rn.value > 1024) continue;
    const nt = t.mul(n);
    const tp = principalT(nt);
    return { r, t, n, rn, nt, tp, z: polarToCz(r, t), w: polarToCz(rn, tp) };
  }
  return null;
}

function moPower(level, rng, opts) {
  const d = moData(rng) || { r: new Sd(1, 2), t: q(3, 4), n: 10, rn: new Sd(32), nt: q(15, 2), tp: q(-1, 2), z: cz(-1, 1), w: cz(0, -32), fallback: true };
  const zs = czText(d.z);
  const start = `(${zs})^${d.n}`;
  const ex = expText(d.r, d.t);
  const raw = [
    E(`(${ex})^${d.n}`, 'Forme exponentielle', 'exp', 'exp'),
    ...(d.r.eq(1) ? [] : [E(expText(rPow(d.r, d.n), d.nt), '(r·e^(iθ))ⁿ = rⁿ·e^(inθ)', 'pow', 'pow')]),
    E(expText(d.rn, d.nt), d.r.eq(1) ? '(e^(iθ))ⁿ = e^(inθ)' : 'Calculer rⁿ', 'pow', 'pow'),
    ...(d.nt.eq(d.tp) ? [] : [E(expText(d.rn, d.tp), turnsNote(d.nt, d.tp), 'reduce', 'reduce')]),
    E(czText(d.w), 'Forme algébrique', 'alg', 'alg'),
  ];
  const blanks = raw.map((l) => {
    if (l.act === 'exp') return [iPiT(d.t)];
    if (l.note === 'Calculer rⁿ') return [d.rn.text()];
    if (l.note === '(e^(iθ))ⁿ = e^(inθ)') return [iPiT(d.nt)];
    if (l.act === 'pow') return [iPiT(d.nt)];
    if (l.act === 'reduce') return [iPiT(d.tp)];
    return [];
  });
  const lines = prep(ALG, raw, level, blanks);
  const pre = [];
  if (level === 2 && !d.nt.eq(d.tp)) {
    const turns = d.nt.sub(d.tp);
    pre.push({ kind: 'decision', prompt: `Quel multiple de 2π faut-il retirer à ${fr(piT(d.nt))} pour arriver dans ]−π ; π] ?`, options: [
      { id: 'ok', label: fr(piT(turns)), valid: true },
      { id: 'half', label: fr(piT(turns.sub(1))), valid: false, why: `On ne peut retirer que des tours entiers, des multiples de 2π. ${fr(piT(turns.sub(1)))} n'en est pas un : le signe change.` },
      { id: 'one', label: '2π', valid: false, why: `${fr(piT(d.nt.sub(2)))} n'est pas encore dans ]−π ; π] : il faut retirer ${fr(piT(turns))}.` },
    ].filter((o, i, a) => a.findIndex((x) => x.label === o.label) === i) });
  }
  // The decision comes just before the reduction (or the last line).
  if (pre.length) {
    const at = lines.findIndex((l) => l.act === 'reduce');
    lines.splice(at < 0 ? lines.length - 1 : at, 0, ...pre);
  }
  const { start: s0, judge, script } = partsScript([{ start, judge: ALG, lines }], level, MO_CHOICES);
  return linesItem({
    skill: MO, level, mode: modeOf(level), start: s0, judge, script,
    prompt: `Calcule ${M(start)} et écris le résultat sous la forme a + bi.${level === 1 ? ` On donne ${M(zs)} = ${M(ex)}.` : ''}`,
    hints: H('Passe en forme exponentielle : la puissance élève le module et multiplie l\'argument.', `${M(`(${ex})^${d.n}`)} = ${M(expText(d.r.eq(1) ? '' : '□', d.nt))}`, M(czText(d.w))),
    subgoals: MO_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${MO}:${level}:pow:${start}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// (z₁)^n₁/(z₂)^n₂ with |z₁| = |z₂|.
function moQuotient(level, rng, opts) {
  for (let k = 0; k < 200; k++) {
    const [r, t1] = rng.pick(MO_Z);
    const t2 = rng.pick(MO_Z.filter(([rr, tt]) => rr.eq(r) && !tt.eq(t1)))?.[1];
    if (!t2) continue;
    const n1 = rng.int(4, 9);
    const n2 = rng.int(3, n1);
    const m = n1 - n2;
    const rm = powSd(r, m);
    if (powSd(r, n1).value > 1024) continue;
    const nt = t1.mul(n1).sub(t2.mul(n2));
    const tp = principalT(nt);
    if (!cosT(tp)) continue;
    const w = polarToCz(rm, tp);
    const z1 = czText(polarToCz(r, t1));
    const z2 = czText(polarToCz(r, t2));
    const start = `((${z1})^${n1})/((${z2})^${n2})`;
    const e1 = expText(r, t1);
    const e2 = expText(r, t2);
    const raw = [
      E(`((${e1})^${n1})/((${e2})^${n2})`, 'Formes exponentielles', 'exp', 'exp'),
      E(expText(m ? rPow(r, m) : '', nt), 'Moivre : modules et arguments', 'pow', 'pow'),
      ...(nt.eq(tp) ? [] : [E(expText(rm, tp), 'Réduire l\'argument', 'reduce', 'reduce')]),
      E(czText(w), 'Forme algébrique', 'alg', 'alg'),
    ];
    const lines = prep(ALG, raw, level, raw.map((l) => (l.act === 'pow' ? [iPiT(nt)] : l.act === 'reduce' ? [iPiT(tp)] : l.act === 'exp' ? [iPiT(t1)] : [])));
    const { start: s0, judge, script } = partsScript([{ start, judge: ALG, lines }], level, MO_CHOICES);
    return linesItem({
      skill: MO, level, mode: modeOf(level), start: s0, judge, script,
      prompt: `Calcule ${M(start)} et écris le résultat sous la forme a + bi${level === 5 ? ', sans aide' : ''}.`,
      hints: H('Écris chaque nombre sous forme exponentielle : les modules se simplifient, les arguments se soustraient.', `${M(start)} = ${M(expText(m && !r.eq(1) ? '□' : '', nt))}`, M(czText(w))),
      subgoals: MO_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
      key: `${MO}:${level}:quot:${start}`, exam: examTag(opts),
    });
  }
  return moPower(level, rng, opts);
}

// The smallest n ≥ 1 such that zⁿ is a positive real.
function moWhichN(level, rng, opts) {
  const [r, t] = rng.pick(MO_Z.filter(([, tt]) => tt.d > 2));
  const z = polarToCz(r, t);
  const zs = czText(z);
  // n·t ∈ 2ℤ: n = 2d/gcd(n_t, 2d).
  const g = (a, b) => (b ? g(b, a % b) : Math.abs(a));
  const n = (2 * t.d) / g(t.n, 2 * t.d);
  const ex = expText(r, t);
  const nT = `n·${t.n < 0 ? `(${fr(piT(t))})` : fr(piT(t))}`;
  const pre = level === 2 || level === 3 ? [{ kind: 'decision', prompt: `zⁿ = ${r.eq(1) ? '' : `${fr(r.text())}ⁿ·`}e^(inθ), avec θ = ${fr(piT(t))}. C'est un réel positif quand :`, options: [
    { id: 'two', label: `${nT} est un multiple de 2π`, valid: true },
    { id: 'pi', label: `${nT} est un multiple de π`, valid: false, why: 'Un multiple impair de π donne e^(iπ) = −1 : un réel négatif.' },
    { id: 'half', label: `${nT} = π/2`, valid: false, why: 'e^(iπ/2) = i : c\'est un imaginaire pur.' },
  ] }] : [];
  const parts = [
    { start: zs, judge: EXP, lines: prep(EXP, [E(ex, 'Forme exponentielle', 'exp', 'exp')], level) },
    { html: `Plus petit entier n ≥ 1 tel que zⁿ soit un réel positif :`, ask: 'n =', start: 'n', judge: ASK(n), pre, lines: prep(ASK(n), [E(String(n), `${nT.replace('n', n)} = ${fr(piT(t.mul(n)))}`, 'pow', 'pow')], level) },
  ];
  const { start, judge, script } = partsScript(parts, level, MO_CHOICES);
  return linesItem({
    skill: MO, level, mode: modeOf(level), start, judge, script,
    prompt: `Soit z = ${M(zs)}. Écris z sous forme exponentielle, puis trouve le plus petit entier n ≥ 1 tel que zⁿ soit un réel positif${level === 5 ? ', sans aide' : ''}.`,
    hints: H('zⁿ = rⁿ·e^(inθ) est un réel positif quand nθ est un multiple de 2π.', `θ = ${M(piT(t))} : ${nT} = 2kπ, donc n = □`, `n = ${n}`),
    subgoals: MO_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${MO}:${level}:n:${zs}`, exam: examTag(opts),
  });
}

function moItem(level, rng, opts = {}) {
  if (level <= 2) return level === 2 && rng.chance(0.3) ? moQuotient(level, rng, opts) : moPower(level, rng, opts);
  if (level === 5) return rng.chance(0.6) ? moQuotient(5, rng, opts) : moWhichN(5, rng, opts);
  const g = rng.next();
  if (g < 0.55) return moPower(level, rng, opts);
  if (g < 0.8) return moQuotient(level, rng, opts);
  return moWhichN(level, rng, opts);
}

function moMcq(rng) {
  const d = moData(rng);
  const start = `(${czText(d.z)})^${d.n}`;
  const right = { html: M(czText(d.w)) };
  const keep = polarToCz(d.r, d.tp);
  const wrongs = [
    { html: M(czText(keep)), rule: 'g8_moivre_modulus' },
    { html: M(czText(polarToCz(d.r.mul(d.n), d.tp))), rule: 'g8_moivre_modulus' },
    ...(d.z.re.sign() < 0 && d.n % 2 ? [{ html: M(czText({ re: d.w.re.neg(), im: d.w.im.neg() })), rule: 'g8_arg_quadrant' }] : []),
    { html: M(czText({ re: d.w.re, im: d.w.im.neg() })) },
    { html: M(czText({ re: d.w.im.neg(), im: d.w.re })) },
  ];
  return mcq({
    skill: MO, level: 4, prompt: `${M(start)} =`,
    options: options(right, wrongs, [{ html: M(czText({ re: d.w.re.neg(), im: d.w.im.neg() })) }]),
    key: `${MO}:mcq:${start}`, expectedSec: 120, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `${M(czText(d.z))} = ${M(expText(d.r, d.t))}, donc ${M(start)} = ${M(expText(d.rn, d.nt))} = ${M(expText(d.rn, d.tp))} = ${M(czText(d.w))}.`, note: '' }],
  }, rng);
}

const MO_TF = [
  { s: 'Pour tout z ∈ ℂ et tout n ∈ ℕ* : |zⁿ| = |z|ⁿ.', truth: true, why: 'Les modules se multiplient : |z·z·…·z| = |z|·|z|·…·|z|.' },
  { s: 'Pour tout z ∈ ℂ et tout n ∈ ℕ* : conj(zⁿ) = (z̄)ⁿ.', truth: true, why: 'Le conjugué respecte les produits.' },
  { s: 'Pour tout z ≠ 0 et tout n ∈ ℕ* : arg(zⁿ) = n·arg z (arguments dans ]−π ; π]).', vars: ['z', 'n'], pred: 'arg(z^n)=n×arg(z)', truth: false, answer: { z: '-1', n: '2' }, why: 'Avec z = −1 et n = 2 : arg(1) = 0, mais 2·π = 2π. L\'égalité n\'est vraie qu\'à 2π près : il faut réduire.' },
  { s: 'Pour tout n ∈ ℕ* : (1 + i)ⁿ n\'est pas réel.', vars: ['n'], pred: 'Im((1+i)^n)≠0', truth: false, answer: { n: '4' }, why: 'Avec n = 4 : (1 + i)⁴ = (√2)⁴·e^(iπ) = −4, réel.' },
  { s: 'Pour tout n ∈ ℕ* : |(1 + i)ⁿ| = 2ⁿ.', vars: ['n'], pred: '|(1+i)^n|=2^n', truth: false, answer: { n: '1' }, why: '|1 + i| = √2 : |(1 + i)ⁿ| = (√2)ⁿ, et pas 2ⁿ (n = 1 : √2 ≠ 2).' },
  { s: '(1 + i)⁴ est réel.', truth: true, why: '(1 + i)⁴ = (√2·e^(iπ/4))⁴ = 4e^(iπ) = −4.' },
  { s: '(1 + i√3)³ est réel.', truth: true, why: '(1 + i√3)³ = (2e^(iπ/3))³ = 8e^(iπ) = −8.' },
  { s: '(√3 + i)⁶ est réel.', truth: true, why: '(√3 + i)⁶ = (2e^(iπ/6))⁶ = 64e^(iπ) = −64.' },
];

function moTf(rng) {
  const t = rng.pick(MO_TF);
  const labels = { z: 'z =', n: 'n =' };
  return tfItem({
    skill: MO, level: 4, statement: t.s, truth: t.truth,
    counter: t.truth ? null : { kind: 'complex', vars: t.vars, doms: { n: 'N*' }, pred: t.pred, ask: t.vars.map((v) => ({ v, label: labels[v], keys: ['calc', 'cplx'] })), answer: t.answer },
    ruleIfTrue: t.s.includes('2ⁿ') ? 'g8_moivre_modulus' : null,
    explanation: t.why, key: `${MO}:${t.s}`, exam: { format: 'tf', points: 1 },
  });
}

// coef: a rational part of zⁿ.
function moCoef(rng) {
  for (let k = 0; k < 200; k++) {
    const d = moData(rng);
    const ok = [['réelle', d.w.re], ['imaginaire', d.w.im]].filter(([, x]) => x.isRational());
    if (!ok.length) continue;
    const [name, x] = rng.pick(ok);
    const start = `(${czText(d.z)})^${d.n}`;
    return answerItem({
      skill: MO, level: 4, prompt: `Donne la partie ${name} de ${M(start)}.`,
      expected: x.p.toString(),
      solution: [{ html: `${M(start)} = ${M(expText(d.rn, d.tp))} = ${M(czText(d.w))}.`, note: '' }],
      key: start, exam: { format: 'coef', points: 1 },
    });
  }
  return null;
}

// ======================================================================

export const GEN = {
  [AL]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return alMcq(rng);
    if (opts.exam === 'tf') return alTf(rng);
    if (opts.exam === 'coef') return alCoef(rng);
    return alItem(level, rng, opts);
  },
  [PO]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return poMcq(rng);
    if (opts.exam === 'tf') return poTf(rng);
    if (opts.exam === 'coef') return poCoef(rng);
    return poItem(level, rng, opts);
  },
  [MO]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return moMcq(rng);
    if (opts.exam === 'tf') return moTf(rng);
    if (opts.exam === 'coef') return moCoef(rng);
    return moItem(level, rng, opts);
  },
  ...ROOTS,
};


// Generator of g8-poly (module G8, part b, step U4): complex polynomials,
// the conjugate root of a real polynomial, a pure imaginary root of a
// polynomial with complex coefficients. Catalogue: G-gymnase-2.md, G8.
//
// Gabarits: (1) P real, monic, of degree 3, from a complex root and a
// condition (P(x₀) or a remainder); (2) every root of a real cubic knowing
// a complex one; (3) coefficients not all real, a pure imaginary root iy:
// P(iy) = 0 gives a real system in y. Judges: `poly` (real factor,
// condition by identification, division, expansion), `complex` with
// form 'set' (the roots). The open exam variant is the problem E7.

import { MT, linesItem, mcq, examTag } from './kit.js';
import { problemItem } from './kit-problem.js';
import {
  CQ, cq, N, nz, modeOf, H, E, CX, fr, ct, cm, mt, cw, xMinus, cpolyText, qpolyText, blanked, partsScript, decision, uniq, vfMcq,
} from './complexes-b-kit.js';
import { t } from '../../i18n.js';

const ID = 'g8-poly';
const KEYS = ['calc', 'cplx', 'letters'];
const SUB = [
  { id: 'conj', label: t('racine conjuguée'), skill: ID },
  { id: 'factor', label: t('facteur réel'), skill: ID },
  { id: 'cond', label: t('condition (théorème du reste)'), skill: 'g0-long-div' },
  { id: 'expand', label: t('développer'), skill: ID },
  { id: 'divide', label: t('division par le facteur'), skill: 'g0-long-div' },
  { id: 'roots', label: t('racines du facteur du 2e degré'), skill: 'g8-quadratic' },
  { id: 'pureim', label: t('parties réelle et imaginaire'), skill: 'g8-algebraic' },
];
const CHOICES = [
  { id: 'factor', label: t('Facteur réel (x − w)(x − w̄)') },
  { id: 'cond', label: t('Condition : reste de la division = P(x₀)') },
  { id: 'expand', label: t('Développer') },
  { id: 'divide', label: t('Diviser P par le facteur connu') },
  { id: 'roots', label: t('Écrire toutes les racines') },
  { id: 'pureim', label: t('Séparer partie réelle et partie imaginaire') },
  { id: 'conjnr', label: t('Ajouter la conjuguée de chaque racine'), rule: 'g8_conj_root_nonreal', why: t('La règle de la conjuguée demande des coefficients réels.') },
];

// Complex polynomials (coefficients CQ, lowest degree first).
const cmul = (a, b) => {
  const out = Array.from({ length: a.length + b.length - 1 }, () => cq(0));
  a.forEach((x, i) => b.forEach((y, j) => { out[i + j] = out[i + j].add(x.mul(y)); }));
  return out;
};
const linF = (w) => [CQ.of(w).neg(), cq(1)]; // x − w
const hi = (cs) => [...cs].reverse(); // highest degree first, for cpolyText
const atQ = (cs, x) => cs.reduceRight((s, c) => s.mul(x).add(c), cq(0));

// Real data: root w = p + qi, real root r, condition point x₀.
function realData(rng) {
  for (let k = 0; k < 200; k++) {
    const p = rng.int(-3, 3);
    const qq = nz(rng, -3, 3);
    const r = nz(rng, -4, 4);
    const x0 = rng.pick([-1, 1, 2, 0]);
    if (r === x0) continue;
    const F = [p * p + qq * qq, -2 * p, 1];
    const P = [-r * F[0], F[0] - r * F[1], F[1] - r, 1];
    if (P.some((c) => Math.abs(c) > 60)) continue;
    const Fx0 = x0 * x0 - 2 * p * x0 + F[0];
    return { p, qq, r, x0, F, P, Fx0, val: Fx0 * (x0 - r), w: cq(p, qq), wb: cq(p, -qq), rem: rng.chance(0.5) };
  }
  return { p: 2, qq: -1, r: -1, x0: 1, F: [5, -4, 1], P: [5, 1, -3, 1], Fx0: 2, val: 4, w: cq(2, -1), wb: cq(2, 1), rem: true, fallback: true };
}

const Ftext = (d) => qpolyText(d.F, 'x');
const Ptext = (d) => qpolyText(d.P, 'x');
const num = (x) => (x < 0 ? `(${x})` : String(x));
// (x − p)² + q², the step between the product and the expanded factor.
const shifted = (d) => `${d.p === 0 ? 'x' : `(${xMinus('x', d.p)})`}^2+${d.qq * d.qq}`;
// The factor at x₀: (1^2-4×1+5).
function factorAt(d) {
  const X = num(d.x0);
  const lin = d.p === 0 ? '' : `${-2 * d.p < 0 ? '-' : '+'}${Math.abs(2 * d.p)}×${X}`;
  return `${X}^2${lin}+${d.F[0]}`;
}
// (x² + bx + c)(x − r) distributed, before collecting.
function distributed(d) {
  const terms = [[1, 3], [-d.r, 2], [d.F[1], 2], [-d.r * d.F[1], 1], [d.F[0], 1], [-d.r * d.F[0], 0]];
  let out = '';
  for (const [c, k] of terms) {
    if (!c) continue;
    const mono = k === 0 ? '' : k === 1 ? 'x' : `x^${k}`;
    const body = k === 0 ? String(Math.abs(c)) : `${Math.abs(c) === 1 ? '' : Math.abs(c)}${mono}`;
    out += `${c < 0 ? '-' : '+'}${body}`;
  }
  return out.replace(/^\+/, '');
}

const condWords = (d) => (d.rem ? t('le reste de sa division par {v1} vaut {val}', { v1: MT(xMinus('x', d.x0)), val: fr(d.val) }) : `${MT(`P(${d.x0})`)} = ${fr(d.val)}`);

function conjDecision(d) {
  return decision(t('P est à coefficients réels et {w} est racine. Que peut-on dire de {wb} ?', { w: cw(d.w), wb: cw(d.wb) }), [
    { id: 'yes', label: t('{wb} est aussi racine : P est réel', { wb: cw(d.wb) }), valid: true },
    { id: 'no', label: t('Rien : il faut le calculer'), valid: false, rule: 'g0_conj_missing', why: t('P est réel : P(w̄) est le conjugué de P(w) = 0, donc {wb} est racine.', { wb: cw(d.wb) }) },
    { id: 'monic', label: t('Seulement si P est unitaire'), valid: false, why: t('Le coefficient dominant ne joue aucun rôle : il suffit que les coefficients soient réels.') },
  ]);
}

// Part « facteur réel ».
function factorPart(d, level) {
  const two = level <= 3 && d.p !== 0;
  const lines = two ? [E(shifted(d), '(x − p)² − (qi)² = (x − p)² + q²', 'factor', 'factor'), E(Ftext(d), t('Développer'), 'factor', 'expand')] : [E(Ftext(d), t('Facteur réel : (x − Re w)² + (Im w)²'), 'factor', 'factor')];
  if (level === 1 && two) lines[0] = blanked(lines[0], [String(d.qq * d.qq)]);
  if (level === 2) lines[lines.length - 1] = blanked(lines[lines.length - 1], [String(d.F[0]), String(Math.abs(2 * d.p))].filter((tq) => tq !== '0'));
  return {
    html: t('Facteur réel :'), ask: '(x − w)(x − w̄) =',
    start: `(${xMinus('x', d.w)})(${xMinus('x', d.wb)})`,
    judge: { kind: 'poly', v: 'x', complex: true, target: 'expanded', realCoeffs: true }, lines,
  };
}

function condPart(d, level) {
  const lines = [E(`${d.Fx0 === 1 ? '' : d.Fx0}(${d.x0}-r)=${d.val}`.replace(/^\((.*)\)=/, '$1='), t('Calculer le facteur en x₀'), 'cond', 'cond'), E(`r=${d.r}`, t('Résoudre'), 'cond', 'cond')];
  if (level >= 4) lines.shift();
  if (level <= 2) lines[0] = blanked(lines[0], [String(d.Fx0)].filter((tq) => tq !== '1'), {}, true);
  return {
    html: d.rem
      ? t('Troisième facteur : P(x) = ({F})(x − r). Condition (le reste de la division par x − x₀ est P(x₀)) :', { F: MT(Ftext(d)) })
      : t('Troisième facteur : P(x) = ({F})(x − r). Condition :', { F: MT(Ftext(d)) }), ask: 'r =',
    start: `(${factorAt(d)})(${d.x0}-r)=${d.val}`,
    judge: { kind: 'poly', mode: 'identity', v: 'x', params: ['r'], solution: { r: String(d.r) } }, lines,
  };
}

function expandPart(d, level) {
  const two = level <= 3 && distributed(d) !== Ptext(d);
  const lines = two ? [E(distributed(d), t('Distribuer'), 'expand', 'expand'), E(Ptext(d), t('Regrouper'), 'expand', 'expand')] : [E(Ptext(d), t('Développer'), 'expand', 'expand')];
  if (level <= 2 && two) lines[1] = blanked(lines[1], [String(Math.abs(d.P[0]))], {});
  return { html: t('Développe P :'), ask: 'P(x) =', start: `(${Ftext(d)})(${xMinus('x', d.r)})`, judge: { kind: 'poly', v: 'x', target: 'expanded' }, lines };
}

function dividePart(d, level) {
  const rest = qpolyText(d.F.map((c) => -d.r * c), 'x');
  const lines = [E(`(${Ftext(d)})×x${rest.startsWith('-') || rest === '0' ? '' : '+'}${rest === '0' ? '' : rest}`, t('Premier terme du quotient : x'), 'divide', 'divide'), E(`(${Ftext(d)})(${xMinus('x', d.r)})`, t('Quotient x − r, reste 0'), 'divide', 'divide')];
  if (level >= 4 || d.r === 0) lines.shift();
  return {
    html: t('Divise P par {v1} :', { v1: MT(Ftext(d)) }), ask: 'P(x) =', start: Ptext(d),
    judge: { kind: 'poly', mode: 'div', v: 'x', dividend: Ptext(d), divisor: Ftext(d) }, lines,
  };
}

function rootsPart(d, factored) {
  return {
    html: t('Toutes les racines de P :'), ask: 'P(x) = 0 ⇔', start: `${factored}=0`,
    judge: { kind: 'complex', form: 'set', unknown: 'x', complex: true },
    lines: [E(`x=${ct(d.w)} ou x=${ct(d.wb)} ou x=${d.r}`, t('Racines'), 'roots', 'roots')],
  };
}

function realItem(level, rng, opts, gab) {
  const d = realData(rng);
  const parts = [];
  if (gab === 1) {
    if (level >= 2) parts.push(factorPart(d, level));
    parts.push(condPart(d, level), expandPart(d, level));
  } else parts.push(factorPart(d, level), dividePart(d, level), rootsPart(d, `(${Ftext(d)})(${xMinus('x', d.r)})`));
  if (level >= 2 && level <= 4) parts[0].pre = [conjDecision(d)];
  const { start, judge, script } = partsScript(parts, level, CHOICES);
  const given = gab === 1 && level === 1 ? t(' Son facteur réel est {v1} = {v2}, donc P(x) = ({v2})(x − r).', { v1: MT(`(${xMinus('x', d.w)})(${xMinus('x', d.wb)})`, CX), v2: MT(Ftext(d)) }) : '';
  const prompt = gab === 1
    ? t('P est un polynôme à coefficients réels, unitaire, de degré 3. Il a pour racine {w}, et {d}. Trouve P(x).{given}', { w: cm(d.w), d: condWords(d), given })
    : t('P(x) = {v1} est à coefficients réels, et {w} est une de ses racines. Trouve toutes ses racines dans ℂ.', { v1: MT(Ptext(d)), w: cm(d.w) });
  const hints = gab === 1
    ? H(t('Pour un polynôme réel, la conjuguée d\'une racine est racine : (x − w)(x − w̄) est un facteur réel de P.'),
      t('{v1} = {v2}, puis P({x0}) = {Fx0}·({x0} − r) = {val}.', { v1: MT(shifted(d)), v2: MT(Ftext(d)), x0: fr(d.x0), Fx0: fr(d.Fx0), val: fr(d.val) }),
      `P(x) = (${MT(Ftext(d))})(${MT(xMinus('x', d.r))}) = ${MT(Ptext(d))}`)
    : H(t('P est réel : {wb} est aussi racine, et (x − w)(x − w̄) divise P.', { wb: cm(d.wb) }),
      `(x − w)(x − w̄) = ${MT(Ftext(d))} ; P(x) = (${MT(Ftext(d))})(x − □).`,
      t('Racines : {w}, {wb} et {r}.', { w: cm(d.w), wb: cm(d.wb), r: fr(d.r) }));
  return linesItem({
    skill: ID, level, mode: modeOf(level), start, judge, script, prompt, hints,
    subgoals: SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    declares: { vars: ['x', 'r'], complex: true }, baits: level >= 2 && level <= 4 ? ['g0_conj_missing'] : [],
    key: `${ID}:${level}:${gab}:${Ptext(d)}:${d.x0}:${d.val}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// ---------- gabarit 3: coefficients not all real, root ti ----------

function imagData(rng) {
  for (let k = 0; k < 200; k++) {
    const tq = nz(rng, -3, 3);
    const r1 = nz(rng, -4, 4);
    const r2 = nz(rng, -4, 4);
    if (r1 >= r2 || r1 + r2 === 0) continue;
    const cs = cmul(cmul(linF(cq(0, tq)), linF(cq(r1))), linF(cq(r2)));
    if (cs.some((c) => Math.abs(c.re.valueOf()) > 30 || Math.abs(c.im.valueOf()) > 30)) continue;
    return { t: tq, r1, r2, cs, quad: [r1 * r2, -(r1 + r2), 1] };
  }
  return { t: 2, r1: -1, r2: 2, cs: cmul(cmul(linF(cq(0, 2)), linF(cq(-1))), linF(cq(2))), quad: [-2, -1, 1], fallback: true };
}

function imagItem(level, rng, opts) {
  const d = imagData(rng);
  const P = cpolyText(hi(d.cs), 'z');
  const ti = cq(0, d.t);
  const [c0, c1, c2] = d.cs;
  // P(iy) = −iy³ − c₂y² + i·c₁·y + c₀.
  const re = qpolyText([c0.re, c1.im.neg(), c2.re.neg()], 'y');
  const im = qpolyText([c0.im, c1.re, c2.im.neg(), -1], 'y');
  const quad = qpolyText(d.quad, 'z');
  const parts = [
    {
      start: `${cpolyText(hi(d.cs), '(iy)')}=0`,
      judge: { kind: 'poly', mode: 'identity', v: 'z', params: ['y'], solution: { y: String(d.t) }, complex: true },
      lines: [E(`${re}=0 ; ${im}=0`, t('Partie réelle et partie imaginaire nulles'), 'pureim', 'pureim'), E(`y=${d.t}`, t('Racine commune'), 'pureim', 'pureim')],
    },
    {
      html: t('Divise P par {v1} :', { v1: MT(xMinus('z', ti), CX) }), ask: 'P(z) =', start: P,
      judge: { kind: 'poly', mode: 'div', v: 'z', complex: true, dividend: P, divisor: xMinus('z', ti) },
      lines: [E(`(${xMinus('z', ti)})(${quad})`, 'Quotient', 'divide', 'divide')],
    },
    {
      html: t('Toutes les racines de P :'), ask: 'P(z) = 0 ⇔', start: `(${xMinus('z', ti)})(${quad})=0`,
      judge: { kind: 'complex', form: 'set', unknown: 'z', complex: true },
      lines: [E(`z=${ct(ti)} ou z=${d.r1} ou z=${d.r2}`, t('Racines'), 'roots', 'roots')],
    },
  ];
  const at = atQ(d.cs, ti.neg());
  if (level <= 4) {
    parts[0].pre = [decision(t('Les coefficients de P ne sont pas tous réels. Si {ti} est racine, {v1} l\'est-elle ?', { ti: cw(ti), v1: cw(ti.neg()) }), [
      { id: 'no', label: t('Pas forcément : la règle de la conjuguée demande des coefficients réels'), valid: true },
      { id: 'yes', label: t('Oui : la conjuguée d\'une racine est toujours racine'), valid: false, rule: 'g8_conj_root_nonreal', why: t('Les coefficients ne sont pas réels : P({v1}) = {at} ≠ 0.', { v1: cw(ti.neg()), at: cw(at) }) },
    ])];
  }
  const { start, judge, script } = partsScript(parts, level, CHOICES);
  return linesItem({
    skill: ID, level, mode: modeOf(level), start, judge, script,
    prompt: t('P(z) = {P} a une racine imaginaire pure iy (y réel). Pose z = iy, trouve y, puis toutes les racines de P.', { P: mt(P) }),
    hints: H(t('P(iy) = 0 : la partie réelle et la partie imaginaire sont nulles toutes les deux. Cherche le y commun.'),
      t('Partie réelle : {re} = 0 ; partie imaginaire : {im} = 0.', { re: MT(re), im: MT(im) }),
      t('y = {v1} ; P(z) = ({v2})({v3}) ; racines {ti}, {r1}, {r2}.', { v1: fr(d.t), v2: mt(xMinus('z', ti)), v3: MT(quad, { vars: ['z'] }), ti: cm(ti), r1: fr(d.r1), r2: fr(d.r2) })),
    subgoals: SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    declares: { vars: ['z', 'y'], complex: true }, baits: level <= 4 ? ['g8_conj_root_nonreal'] : [],
    key: `${ID}:${level}:3:${P}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// ---------- exam variants ----------

function mcqItem(rng, opts) {
  if (rng.chance(0.5)) {
    const d = realData(rng);
    const wrongF = qpolyText([d.F[0], -d.F[1], 1], 'x');
    const opt = (html, correct, rule = null) => ({ html, correct, rule });
    const options = uniq([
      opt(`P(x) = ${MT(Ptext(d))}`, true),
      opt(`P(x) = ${mt(`(${xMinus('x', d.w)})(${xMinus('x', d.r)})`)}`, false, 'g0_conj_missing'),
      opt(`P(x) = ${MT(`(${wrongF})(${xMinus('x', d.r)})`)}`, false),
      opt(`P(x) = ${MT(`(${Ftext(d)})(${xMinus('x', -d.r)})`)}`, false),
    ]);
    return mcq({
      skill: ID, level: 4, prompt: t('P est réel, unitaire, de degré 3, et {w} et {r} sont des racines de P. Que vaut P(x) ?', { w: cm(d.w), r: fr(d.r) }), options,
      key: `${ID}:mcq:${Ptext(d)}`, exam: examTag(opts), fallback: !!d.fallback,
      solution: [{ html: t('P réel : {wb} est aussi racine ; (x − w)(x − w̄) = {v1}, donc P(x) = ({v1})({v2}) = {v3}.', { wb: cm(d.wb), v1: MT(Ftext(d)), v2: MT(xMinus('x', d.r)), v3: MT(Ptext(d)) }), note: '' }],
    }, rng);
  }
  const d = imagData(rng);
  const ti = cq(0, d.t);
  const P = cpolyText(hi(d.cs), 'z');
  const set = (xs) => `{${xs.map((x) => cw(x)).join(' ; ')}}`;
  const options = uniq([
    { html: set([ti, cq(d.r1), cq(d.r2)]), correct: true },
    { html: set([ti, ti.neg(), cq(d.r1), cq(d.r2)]), correct: false, rule: 'g8_conj_root_nonreal' },
    { html: set([ti.neg(), cq(d.r1), cq(d.r2)]), correct: false },
    { html: set([ti, cq(-d.r1), cq(-d.r2)]), correct: false },
  ]);
  return mcq({
    skill: ID, level: 4, prompt: t('{ti} est racine de P(z) = {P}. Quelles sont toutes les racines de P ?', { ti: cm(ti), P: mt(P) }), options,
    key: `${ID}:mcq:${P}`, exam: examTag(opts), fallback: !!d.fallback,
    solution: [{ html: t('Les coefficients ne sont pas réels : {v1} n\'est pas forcément racine. P(z) = ({v2})({v3}), racines {ti}, {r1} et {r2}.', { v1: cm(ti.neg()), v2: mt(xMinus('z', ti)), v3: MT(qpolyText(d.quad, 'z'), { vars: ['z'] }), ti: cm(ti), r1: fr(d.r1), r2: fr(d.r2) }), note: '' }],
  }, rng);
}

const TF = [
  { s: t('Si i est racine d\'un polynôme P, alors −i est aussi racine de P.'), t: false, rule: 'g8_conj_root_nonreal', why: t('Faux sans coefficients réels : P(z) = z − i a la racine i, mais pas −i.') },
  { s: t('Si P est à coefficients réels et 1 + 2i est racine de P, alors 1 − 2i est racine de P.'), t: true, why: t('Vrai : P(w̄) est le conjugué de P(w) quand les coefficients sont réels.') },
  { s: t('Un polynôme à coefficients réels de degré 3 a au moins une racine réelle.'), t: true, why: t('Vrai : les racines non réelles vont par paires conjuguées ; il en reste une réelle.') },
  { s: t('Un polynôme de degré 4 a 4 racines distinctes dans ℂ.'), t: false, why: t('Faux : 4 racines comptées avec multiplicité ; (z − 1)⁴ n\'en a qu\'une.') },
  { s: t('Si P(z) = z² + iz + 2 a la racine i, alors −i est aussi racine.'), t: false, rule: 'g8_conj_root_nonreal', why: t('Faux : P(−i) = −1 + 1 + 2 = 2 ≠ 0. Le coefficient i n\'est pas réel.') },
];
function tfItem(rng) {
  const k = rng.int(0, TF.length - 1);
  const s = TF[k];
  return vfMcq(ID, s.s, s.t, rng, { key: String(k), why: s.why, ruleIfTrue: s.rule || null });
}

// ---------- the problem E7 (open variant) ----------

function e7(rng, opts) {
  const d = realData(rng);
  const solveParts = [factorPart(d, 4), condPart(d, 4), expandPart(d, 4)];
  solveParts[0].pre = [conjDecision(d)];
  const a = partsScript(solveParts, 4, CHOICES);
  const part1 = linesItem({
    skill: ID, level: 5, mode: 'free', ...a,
    prompt: t('(a) Trouve P(x) développé.'), hints: [], subgoals: SUB, keys: KEYS,
    declares: { vars: ['x', 'r'], complex: true }, baits: ['g0_conj_missing'], key: `${ID}:e7a:${Ptext(d)}`,
  });
  const facR = `(${xMinus('x', d.r)})(${Ftext(d)})`;
  const part2 = linesItem({
    skill: ID, level: 5, mode: 'free', start: Ptext(d), judge: { kind: 'poly', v: 'x', target: 'factored-R' },
    script: [
      E(facR, t('Factorisation dans ℝ'), 'factor'),
      { kind: 'segment', html: t('Dans ℂ :'), ask: 'P(x) =', start: { math: facR }, judge: { kind: 'poly', v: 'x', complex: true, target: 'factored-C' } },
      E(`(${xMinus('x', d.r)})(${xMinus('x', d.w)})(${xMinus('x', d.wb)})`, t('Factorisation dans ℂ'), 'roots'),
    ],
    prompt: t('(b) Factorise P dans ℝ, puis dans ℂ.'), hints: [], subgoals: SUB, keys: KEYS,
    declares: { vars: ['x'], complex: true }, baits: [], key: `${ID}:e7b:${Ptext(d)}`,
  });
  return problemItem({
    skill: ID, level: 4,
    prompt: t('P est un polynôme à coefficients réels, unitaire, de degré 3. On sait que {w} est racine de P et que {d}.', { w: cm(d.w), d: condWords(d) }),
    parts: [{ item: part1, points: [2, 2, 1], title: t('(a) Trouver P') }, { item: part2, points: [1, 1], title: t('(b) Factoriser') }],
    key: `${Ptext(d)}:${d.x0}`, exam: examTag(opts, 7), fallback: !!d.fallback, expectedSec: 900,
  });
}

export function genPoly(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return mcqItem(rng, opts);
  if (opts.exam === 'tf') return tfItem(rng);
  if (opts.exam === 'open') return e7(rng, opts);
  if (level <= 2) return realItem(level, rng, opts, level === 1 || rng.chance(0.5) ? 1 : 2);
  if (level === 3) return realItem(level, rng, opts, rng.pick([1, 2]));
  if (level === 4) return rng.chance(1 / 3) ? imagItem(level, rng, opts) : realItem(level, rng, opts, rng.pick([1, 2]));
  return rng.chance(0.5) ? imagItem(level, rng, opts) : realItem(level, rng, opts, 2);
}

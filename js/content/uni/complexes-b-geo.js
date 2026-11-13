// Generators of g8-ratio-angle and g8-transform (module G8, part b, step
// U4): the quotient (c − a)/(b − a), and the maps z ↦ az + b. Catalogue:
// G-gymnase-2.md, G8. Judge `complex` in segments: a quotient or a number
// in algebraic form, |q| and arg q as real numbers, the fixed point ω as
// the solution of ω = aω + b (form 'set', unknown ω).
//
// g8-ratio-angle gabarits: (1) rapport et angle; (2) alignement (q réel
// or not); (3) troisième sommet d'un triangle équilatéral direct.
// g8-transform gabarits: (1) z ↦ az + b → centre, rapport, angle; (2)
// centre, rapport, angle → z′ = az + b; (3) composée de deux.

import { parse } from '../../cas/parse.js';
import { sameLine } from '../../judges/common.js';
import { linesItem, mcq, examTag } from './kit.js';
import {
  q, N, modeOf, H, E, fr, ct, cp, cd, cm, coefText, cw, rd, mt, cq, CQ, gauss, blanked, partsScript, decision, uniq, vfMcq, piText, surd, argPi,
} from './complexes-b-kit.js';
import { t } from '../../i18n.js';

const KEYS = ['calc', 'cplx', 'greek'];
const CXP = { complex: true };
const CJ = (extra = {}) => ({ kind: 'complex', form: 'algebraic', complex: true, ...extra });
const RJ = (extra = {}) => ({ kind: 'complex', form: 'real', complex: true, ...extra });
// z − a written: (5+3i)-(1+i).
const diff = (z, a) => `${cp(z)}-${cp(a)}`;
const modT = (z) => surd(CQ.of(z).abs2());
// A number to square: 3, (−2), (1/2).
const sqT = (x) => (x.n >= 0 && x.d === 1 ? N(x) : `(${N(x)})`);
const argT = (z) => piText(argPi(z));

// ======================================================================
// g8-ratio-angle
// ======================================================================

const RA = 'g8-ratio-angle';
const RA_SUB = [
  { id: 'diff', label: t('différences'), skill: RA },
  { id: 'quot', label: 'quotient', skill: 'g8-algebraic' },
  { id: 'mod', label: t('rapport (module)'), skill: RA },
  { id: 'arg', label: t('angle (argument)'), skill: 'g8-polar' },
];
const RA_CHOICES = [
  { id: 'diff', label: 'Calculer c − a et b − a' },
  { id: 'conj', label: t('Multiplier par le conjugué du dénominateur') },
  { id: 'calc', label: t('Calculer, forme a + bi') },
  { id: 'mod', label: t('Module : √(a² + b²)') },
  { id: 'arg', label: t('Argument (le quadrant de q)') },
  { id: 'swap', label: 'Calculer (b − a)/(c − a)', rule: 'g8_ratio_order', why: t('L\'angle de AB⃗ vers AC⃗ et le rapport AC/AB sont donnés par (c − a)/(b − a).') },
  { id: 'parts', label: t('Diviser partie réelle par partie réelle, partie imaginaire par partie imaginaire'), rule: 'g8_div_componentwise', why: t('On ne divise pas partie par partie : on multiplie par le conjugué du dénominateur.') },
];
// Quotients with a remarkable argument.
const QS = [[1, 1], [1, -1], [-1, 1], [-1, -1], [0, 2], [0, -2], [0, 1], [0, -1], [2, 2], [-2, 2], [q(1, 2), q(1, 2)], [q(1, 2), q(-1, 2)], [0, 3], [-3, 3]];
const QREAL = [2, -1, 3, -2, q(1, 2), q(-1, 2), q(3, 2)];

function ratioData(rng, list) {
  for (let i = 0; i < 200; i++) {
    const a = gauss(rng, -4, 4);
    if (a.isZero() || a.re.n === 0 || a.im.n === 0) continue;
    const u = gauss(rng, -3, 3);
    if (u.isZero()) continue;
    const pick = rng.pick(list);
    const qq = Array.isArray(pick) ? cq(...pick) : cq(pick);
    const c = a.add(qq.mul(u));
    if (c.re.d !== 1 || c.im.d !== 1 || Math.abs(c.re.n) > 9 || Math.abs(c.im.n) > 9) continue;
    const b = a.add(u);
    if (c.eq(b)) continue;
    return { a, b, c, u, w: c.sub(a), qq };
  }
  return { a: cq(1, 1), b: cq(5, 3), c: cq(3, 7), u: cq(4, 2), w: cq(2, 6), qq: cq(1, 1), fallback: true };
}

// The quotient part: (c − a)/(b − a) down to a + bi.
function quotientPart(d, level) {
  const start = `(${diff(d.c, d.a)})/(${diff(d.b, d.a)})`;
  const plain = `${cp(d.w)}/${cd(d.u)}`;
  const lines = [E(plain, t('Différences c − a et b − a'), 'diff', 'diff')];
  if (!d.u.isReal() && level <= 3) {
    const ub = d.u.conj();
    lines.push(E(`(${ct(d.w)})(${ct(ub)})/((${ct(d.u)})(${ct(ub)}))`, t('Multiplier par le conjugué'), 'quot', 'conj'));
    lines.push(E(`(${ct(d.w.mul(ub))})/${N(d.u.abs2())}`, t('Calculer'), 'quot', 'calc'));
  }
  lines.push(E(ct(d.qq), t('q sous forme a + bi'), 'quot', 'calc'));
  if (level === 1) lines[0] = blanked(lines[0], [ct(d.u)]);
  if (level === 2 && lines.length > 2) lines[2] = blanked(lines[2], [N(d.u.abs2())]);
  return { start, judge: CJ({ ratio: true }), lines };
}
const modPart = (d, level) => ({
  html: t('Rapport : AC/AB = |q| ='), ask: '|q| =', start: `|${ct(d.qq)}|`, judge: RJ({ ratio: true }),
  lines: level <= 2 && modT(d.qq) !== '1' ? [E(`√(${sqT(d.qq.re)}^2+${sqT(d.qq.im)}^2)`, t('Module'), 'mod', 'mod'), E(modT(d.qq), t('Simplifier'), 'mod', 'mod')] : [E(modT(d.qq), t('Module'), 'mod', 'mod')],
});
const argPart = (d, pre = []) => ({
  html: t('Angle : (AB⃗, AC⃗) = arg q ='), ask: 'arg q =', start: `arg(${ct(d.qq)})`, judge: RJ({ ratio: true }), pre,
  lines: [E(argT(d.qq), t('Argument (quadrant)'), 'arg', 'arg')],
});
const orderDecision = () => decision(t('Quel quotient donne l\'angle (AB⃗, AC⃗) et le rapport AC/AB ?'), [
  { id: 'right', label: '(c − a)/(b − a)', valid: true },
  { id: 'swap', label: '(b − a)/(c − a)', valid: false, rule: 'g8_ratio_order', why: t('Ce quotient donne l\'angle de AC⃗ vers AB⃗ (l\'opposé) et le rapport AB/AC.') },
  { id: 'other', label: '(c − b)/(a − b)', valid: false, why: t('Ce quotient regarde l\'angle en B, pas en A.') },
]);

function ratioItem(level, rng, opts) {
  const d = ratioData(rng, QS);
  const q0 = quotientPart(d, level);
  if (level === 2 || level === 3) q0.pre = [orderDecision()];
  const parts = [q0, modPart(d, level), argPart(d)];
  const { start, judge, script } = partsScript(parts, level, RA_CHOICES);
  return linesItem({
    skill: RA, level, mode: modeOf(level), start, judge, script,
    prompt: t('A, B et C ont pour affixes a = {a}, b = {b} et c = {c}. Calcule q = (c − a)/(b − a), puis le rapport AC/AB et l\'angle orienté (AB⃗, AC⃗).', { a: cm(d.a), b: cm(d.b), c: cm(d.c) }),
    hints: H(t('Le quotient (c − a)/(b − a) contient le rapport (son module) et l\'angle (son argument).'),
      t('q = {v1} : multiplie en haut et en bas par {v2}.', { v1: mt(`${cp(d.w)}/${cd(d.u)}`), v2: cm(d.u.conj()) }),
      t('q = {qq} : AC/AB = {v1}, angle {v2}.', { qq: cm(d.qq), v1: fr(modT(d.qq)), v2: fr(argT(d.qq)) })),
    subgoals: RA_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    declares: { vars: [], complex: true }, baits: ['g8_ratio_order', 'g8_div_componentwise'],
    key: `${RA}:${level}:1:${ct(d.a)}:${ct(d.b)}:${ct(d.c)}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

function alignItem(level, rng, opts) {
  const real = rng.chance(0.5);
  const d = ratioData(rng, real ? QREAL : QS);
  const pre = [decision(t('Que dit q sur A, B et C ?'), [
    { id: 'yes', label: t('q est réel : A, B et C sont alignés'), valid: real, why: t('q n\'est pas réel : son argument n\'est ni 0 ni π.') },
    { id: 'no', label: t('q n\'est pas réel : A, B et C ne sont pas alignés'), valid: !real, why: t('q est réel : son argument est 0 ou π, les vecteurs AB⃗ et AC⃗ sont colinéaires.') },
  ])];
  const parts = [quotientPart(d, level), argPart(d, pre)];
  const { start, judge, script } = partsScript(parts, level, RA_CHOICES);
  return linesItem({
    skill: RA, level, mode: modeOf(level), start, judge, script,
    prompt: t('A, B et C ont pour affixes a = {a}, b = {b} et c = {c}. Calcule q = (c − a)/(b − a), puis son argument : A, B et C sont-ils alignés ?', { a: cm(d.a), b: cm(d.b), c: cm(d.c) }),
    hints: H(t('A, B et C sont alignés exactement quand q = (c − a)/(b − a) est réel (argument 0 ou π).'),
      `q = ${mt(`${cp(d.w)}/${cd(d.u)}`)}.`,
      real ? t('q = {q}, arg q = {a} : alignés.', { q: cm(d.qq), a: fr(argT(d.qq)) }) : t('q = {q}, arg q = {a} : pas alignés.', { q: cm(d.qq), a: fr(argT(d.qq)) })),
    subgoals: RA_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    declares: { vars: [], complex: true }, baits: ['g8_ratio_order', 'g8_div_componentwise'],
    key: `${RA}:${level}:2:${ct(d.a)}:${ct(d.b)}:${ct(d.c)}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// r + s√3 as text: 3, 2√3, 1-√3, -2+2√3.
function s3(r, s) {
  const R = q(r);
  const S = q(s);
  const sq3 = S.n === 0 ? '' : `${S.eq(1) ? '' : S.eq(-1) ? '-' : N(S)}√3`;
  if (R.n === 0) return sq3 || '0';
  return sq3 ? `${N(R)}${sq3.startsWith('-') ? '' : '+'}${sq3}` : N(R);
}
// x + yi with x = r + s√3, y = t + u√3.
function s3c(r, s, tq, u) {
  const re = s3(r, s);
  let im;
  if (q(u).n === 0) im = q(tq).n === 0 ? '' : ct(cq(0, tq));
  else if (q(tq).n === 0) im = `${q(u).eq(1) ? '' : q(u).eq(-1) ? '-' : N(u)}i√3`;
  else im = `(${s3(tq, u)})i`;
  if (!im) return re;
  if (re === '0') return im;
  return `${re}${im.startsWith('-') ? '' : '+'}${im}`;
}

function equilateralItem(level, rng, opts) {
  // AB horizontal, or vertical with a on the imaginary axis: each part of c
  // is one term (a + bi with a, b in ℚ(√3)).
  const k = 2 * rng.pick([-2, -1, 1, 2]);
  const vert = rng.chance(0.3);
  let a = vert ? cq(0, rng.int(-3, 3)) : gauss(rng, -3, 3);
  if (a.isZero()) a = vert ? cq(0, 1) : cq(1, 1);
  const u = vert ? cq(0, k) : cq(k);
  const d = { a, u, b: a.add(u) };
  const [u1, u2] = [d.u.re.n, d.u.im.n];
  // c = a + (1/2 + i√3/2)(u₁ + iu₂).
  const final = s3c(d.a.re.n + u1 / 2, -u2 / 2, d.a.im.n + u2 / 2, u1 / 2);
  const ue = d.u.mul(q(1, 2));
  const start = `${cp(d.a)}+e^(iπ/3)(${diff(d.b, d.a)})`;
  const lines = [
    E(`${cp(d.a)}+e^(iπ/3)×${cp(d.u)}`, 'b − a', 'diff', 'diff'),
    E(`${cp(d.a)}+(1/2+i√3/2)×${cp(d.u)}`, 'e^(iπ/3) = 1/2 + i√3/2', 'arg', 'polar'),
    E(`${cp(d.a)}+${cp(ue)}${ue.isReal() ? (ue.re.n > 0 ? '+' : '') + coefText(ue, 'i√3') : `${ue.im.n > 0 ? '-' : '+'}${coefText(cq(Math.abs(ue.im.n)), '√3')}`}`, t('Développer'), 'quot', 'calc'),
    E(final, t('Regrouper : c = x + iy'), 'quot', 'calc'),
  ];
  if (level >= 4) lines.splice(0, 1);
  if (level >= 4) lines.splice(1, 1);
  if (level === 1) lines[1] = blanked(lines[1], ['1/2']);
  const pre = level === 2 || level === 3 ? [decision(t('ABC est équilatéral d\'orientation positive (de AB⃗ vers AC⃗ : +π/3). Que vaut (c − a)/(b − a) ?'), [
    { id: 'p3', label: 'e^(iπ/3)', valid: true },
    { id: 'm3', label: 'e^(−iπ/3)', valid: false, why: t('C\'est le triangle d\'orientation négative.') },
    { id: 'swap', label: '(b − a)/(c − a) = e^(iπ/3)', valid: false, rule: 'g8_ratio_order', why: t('Ce quotient tourne de AC⃗ vers AB⃗ : il donne le triangle d\'orientation négative.') },
  ])] : [];
  const choices = [
    { id: 'diff', label: 'Calculer b − a' }, { id: 'polar', label: t('Écrire e^(iπ/3) = 1/2 + i√3/2') },
    { id: 'calc', label: t('Développer et regrouper') }, RA_CHOICES[5],
  ];
  const { start: s0, judge, script } = partsScript([{ start, judge: CJ({ ratio: true }), lines, pre }], level, choices);
  return linesItem({
    skill: RA, level, mode: modeOf(level), start: s0, judge, script,
    prompt: t('A et B ont pour affixes a = {a} et b = {b}. Trouve l\'affixe c du point C tel que ABC soit un triangle équilatéral d\'orientation positive : c = a + e^(iπ/3)(b − a).', { a: cm(d.a), b: cm(d.b) }),
    hints: H(t('(c − a)/(b − a) = e^(iπ/3) : on tourne AB⃗ de π/3 autour de A.'),
      `c = ${mt(`${cp(d.a)}+(1/2+i√3/2)×${cp(d.u)}`)}`,
      `c = ${mt(final)}`),
    subgoals: RA_SUB, keys: [...KEYS, 'calcfn'], tapActions: level === 3 ? 'steps' : null,
    declares: { vars: [], complex: true }, baits: ['g8_ratio_order', 'g8_div_componentwise'],
    key: `${RA}:${level}:3:${ct(d.a)}:${ct(d.b)}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

function ratioMcq(rng, opts) {
  const d = ratioData(rng, QS.filter((x) => !(x[0] === 0 && Math.abs(x[1]) === 1)));
  const inv = cq(1).div(d.qq);
  const opt = (m, a) => t('AC/AB = {m}, angle (AB⃗, AC⃗) = {a}', { m: fr(m), a: fr(a) });
  const options = uniq([
    { html: opt(modT(d.qq), argT(d.qq)), correct: true },
    { html: opt(modT(inv), argT(inv)), correct: false, rule: 'g8_ratio_order' },
    { html: opt(modT(d.qq), argT(inv)), correct: false },
    { html: opt(surd(d.qq.abs2().mul(d.qq.abs2())), argT(d.qq)), correct: false },
  ]);
  return mcq({
    skill: RA, level: 4, prompt: t('A, B et C ont pour affixes a = {a}, b = {b} et c = {c}. Que valent le rapport AC/AB et l\'angle (AB⃗, AC⃗) ?', { a: cm(d.a), b: cm(d.b), c: cm(d.c) }), options,
    key: `${RA}:mcq:${ct(d.a)}:${ct(d.b)}:${ct(d.c)}`, exam: examTag(opts), fallback: !!d.fallback,
    solution: [{ html: `q = (c − a)/(b − a) = ${cm(d.qq)} : |q| = ${fr(modT(d.qq))} et arg q = ${fr(argT(d.qq))}.`, note: '' }],
  }, rng);
}

const RA_TF = [
  { s: t('Si (c − a)/(b − a) est imaginaire pur, l\'angle en A du triangle ABC est droit.'), t: true, why: t('Vrai : son argument est ±π/2.') },
  { s: t('Si (c − a)/(b − a) est réel, les points A, B et C sont alignés.'), t: true, why: t('Vrai : son argument est 0 ou π, AB⃗ et AC⃗ sont colinéaires.') },
  { s: t('Si (c − a)/(b − a) = 2i, alors AC = 2AB et l\'angle (AB⃗, AC⃗) vaut π/2.'), t: true, why: t('Vrai : |2i| = 2 et arg(2i) = π/2.') },
  { s: t('Si (c − a)/(b − a) = 1 + i, alors AB/AC = √2.'), t: false, rule: 'g8_ratio_order', why: t('Faux : |q| = √2 est le rapport AC/AB ; AB/AC = 1/√2.') },
  { s: t('Si (c − a)/(b − a) = e^(iπ/3), le triangle ABC est équilatéral.'), t: true, why: t('Vrai : AC = AB et l\'angle en A vaut π/3.') },
  { s: t('Si (c − a)/(b − a) = i, alors l\'angle (AC⃗, AB⃗) vaut π/2.'), t: false, rule: 'g8_ratio_order', why: t('Faux : arg q est l\'angle de AB⃗ vers AC⃗ ; (AC⃗, AB⃗) = −π/2.') },
];

export function genRatio(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return ratioMcq(rng, opts);
  if (opts.exam === 'open') return { ...(rng.chance(0.6) ? ratioItem(4, rng, {}) : equilateralItem(4, rng, {})), exam: { format: 'open', points: 4 } };
  if (opts.exam === 'tf') {
    const k = rng.int(0, RA_TF.length - 1);
    return vfMcq(RA, RA_TF[k].s, RA_TF[k].t, rng, { key: String(k), why: RA_TF[k].why, ruleIfTrue: RA_TF[k].rule || null });
  }
  if (level === 5) return equilateralItem(level, rng, opts);
  const r = rng.next();
  if (r < 0.55) return ratioItem(level, rng, opts);
  return r < 0.8 ? alignItem(level, rng, opts) : equilateralItem(level, rng, opts);
}

// ======================================================================
// g8-transform
// ======================================================================

const TR = 'g8-transform';
const TR_SUB = [
  { id: 'fixed', label: t('point fixe'), skill: 'g8-algebraic' },
  { id: 'mod', label: t('rapport |a|'), skill: 'g8-polar' },
  { id: 'arg', label: t('angle arg a'), skill: 'g8-polar' },
  { id: 'write', label: t('écrire z′ = az + b'), skill: TR },
];
const TR_CHOICES = [
  { id: 'fixed', label: t('Point fixe : regrouper les ω') },
  { id: 'solve', label: 'Diviser : ω = …' },
  { id: 'mod', label: t('Rapport : |a|') },
  { id: 'arg', label: t('Angle : arg a') },
  { id: 'a', label: t('a = r·e^(iθ) sous forme a + bi') },
  { id: 'b', label: 'b = ω − aω' },
  { id: 'origin', label: 'Prendre b = ω', rule: 'g8_rotation_about_origin', why: t('Avec b = ω, le centre ω n\'est pas fixe.') },
];
// a: [re, im] of ℚ(i), with |a| and arg a remarkable; translations excluded.
const AS = [[0, 1], [0, -1], [2, 0], [3, 0], [-2, 0], [q(1, 2), 0], [1, 1], [1, -1], [-1, 1], [0, 2], [0, -2], [q(1, 2), q(1, 2)], [-1, -1]];
const natureOf = (a) => (a.abs2().eq(1) ? 'rotation' : a.isReal() ? 'homothétie' : 'similitude');
const NAT_NAME = (n) => ({ rotation: t('rotation'), homothétie: t('homothétie'), similitude: t('similitude') }[n]);

function trData(rng) {
  for (let i = 0; i < 200; i++) {
    const a = cq(...rng.pick(AS));
    const w = gauss(rng, -3, 3);
    if (w.isZero()) continue;
    const b = w.sub(a.mul(w));
    if (b.re.d !== 1 || b.im.d !== 1 || b.isZero()) continue;
    return { a, w, b };
  }
  return { a: cq(1, 1), w: cq(1, 2), b: cq(2, -1), fallback: true };
}
// az + b as text: iz+1-i, -iz+3, (1+i)z-2, 2z.
function mapText(a, b) {
  const neg = a.neg();
  const lead = ct(a) === '1' ? '' : ct(a) === '-1' ? '-' : !cp(neg).startsWith('(') ? `-${ct(neg)}` : cp(a);
  return `${lead}z${b.isZero() ? '' : ct(b).startsWith('-') ? ct(b) : `+${ct(b)}`}`;
}

function natureDecision(d) {
  const nat = natureOf(d.a);
  const opts = [
    { id: 'rotation', label: t('une rotation (|a| = 1)') },
    { id: 'homothétie', label: t('une homothétie (a réel)') },
    { id: 'similitude', label: t('une similitude (|a| ≠ 1, a non réel)') },
    { id: 'translation', label: t('une translation') },
  ].map((o) => ({ ...o, valid: o.id === nat, why: o.id === 'translation' ? t('a ≠ 1 : ce n\'est pas une translation.') : (d.a.isReal() ? t('a = {a} : |a| = {m}, a réel.', { a: cw(d.a), m: fr(modT(d.a)) }) : `a = ${cw(d.a)} : |a| = ${fr(modT(d.a))}.`) }));
  opts.push({ id: 'origin', label: t('une transformation de centre 0'), valid: false, rule: 'g8_rotation_about_origin', why: t('b = {b} ≠ 0 : 0 n\'est pas fixe. Le centre est la solution de ω = aω + b.', { b: cw(d.b) }) });
  return decision(t('z ↦ {v1} : a = {a}. C\'est…', { v1: rd(mapText(d.a, d.b)), a: cw(d.a) }), opts);
}

function fixedPart(d, level) {
  const one = cq(1).sub(d.a);
  const lines = [E(`${coefText(one, 'ω')}=${ct(d.b)}`, t('Regrouper les ω : (1 − a)ω = b'), 'fixed', 'fixed')];
  if (level <= 2) lines.push(E(`ω=(${ct(d.b)})/${cd(one)}`, t('Diviser'), 'fixed', 'solve'));
  lines.push(E(`ω=${ct(d.w)}`, t('Calculer'), 'fixed', 'solve'));
  if (level === 1) lines[0] = blanked(lines[0], [ct(one)]);
  return { start: `ω=${mapText(d.a, d.b).replace(/z/g, 'ω')}`, judge: { kind: 'complex', form: 'set', unknown: 'ω', complex: true }, lines };
}

function elementsItem(level, rng, opts) {
  const d = trData(rng);
  const parts = [
    fixedPart(d, level),
    { html: t('Rapport :'), ask: '|a| =', start: `|${ct(d.a)}|`, judge: RJ(), lines: [E(modT(d.a), t('Rapport |a|'), 'mod', 'mod')] },
    { html: t('Angle :'), ask: 'arg a =', start: `arg(${ct(d.a)})`, judge: RJ(), lines: [E(argT(d.a), t('Angle arg a'), 'arg', 'arg')], pre: level >= 2 && level <= 4 ? [natureDecision(d)] : [] },
  ];
  const { start, judge, script } = partsScript(parts, level, TR_CHOICES);
  return linesItem({
    skill: TR, level, mode: modeOf(level), start, judge, script,
    prompt: t('Trouve le centre ω, le rapport et l\'angle de la transformation z ↦ {v1}.', { v1: mt(mapText(d.a, d.b)) }),
    hints: H(t('Le centre est le point fixe : résous ω = aω + b. Le rapport est |a|, l\'angle arg a.'),
      t('{v1}, donc ω = □.', { v1: mt(`${coefText(cq(1).sub(d.a), 'ω')}=${ct(d.b)}`) }),
      t('ω = {w}, rapport {v1}, angle {v2} : {a}.', { w: cm(d.w), v1: fr(modT(d.a)), v2: fr(argT(d.a)), a: NAT_NAME(natureOf(d.a)) })),
    subgoals: TR_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    declares: { vars: ['ω'], complex: true }, baits: level >= 2 && level <= 4 ? ['g8_rotation_about_origin'] : [],
    key: `${TR}:${level}:1:${mapText(d.a, d.b)}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// Elements → z′ = az + b, with a = r·e^(iθ) in ℚ(i).
function writeItem(level, rng, opts) {
  const d = trData(rng);
  const nat = natureOf(d.a);
  const r = modT(d.a);
  const th = argT(d.a);
  const what = nat === 'rotation' ? t('la rotation de centre {w} et d\'angle {th}', { w: cm(d.w), th: fr(th) })
    : nat === 'homothétie' ? t('l\'homothétie de centre {w} et de rapport {v1}', { w: cm(d.w), v1: fr(N(d.a.re)) })
      : t('la similitude de centre {w}, de rapport {r} et d\'angle {th}', { w: cm(d.w), r: fr(r), th: fr(th) });
  const parts = [];
  if (nat !== 'homothétie') {
    const expA = `${r === '1' ? '' : `${r}×`}e^(${th === 'π' ? 'iπ' : `${th.replace('π', 'iπ')}`})`.replace('e^(-iπ', 'e^(-iπ');
    parts.push({ start: expA, judge: CJ(), lines: [E(ct(d.a), t('a = r·e^(iθ) en forme algébrique'), 'arg', 'a')] });
  }
  const aw = d.a.mul(d.w);
  const bStart = `${cp(d.w)}-${cp(d.a)}×${cp(d.w)}`;
  const bLines = level <= 3 ? [E(`${cp(d.w)}-${cp(aw)}`, t('Calculer aω'), 'write', 'b'), E(ct(d.b), 'b = ω − aω', 'write', 'b')] : [E(ct(d.b), 'b = ω − aω', 'write', 'b')];
  if (level === 1) bLines[0] = blanked(bLines[0], [ct(aw)]);
  const pre = level === 2 || level === 3 ? [decision(nat === 'homothétie' ? t('Quelle écriture a cette homothétie de centre ω ?') : t('Quelle écriture a cette transformation de centre ω ?'), [
    { id: 'right', label: t('z′ − ω = a(z − ω), donc b = ω − aω'), valid: true },
    { id: 'origin', label: t('z′ = az + ω, donc b = ω'), valid: false, rule: 'g8_rotation_about_origin', why: t('Avec z′ = az + ω, le point ω n\'est pas fixe : aω + ω ≠ ω.') },
    { id: 'plus', label: t('z′ = a(z + ω), donc b = aω'), valid: false, rule: 'g8_rotation_about_origin', why: t('Avec z′ = a(z + ω), le point ω n\'est pas fixe.') },
  ])] : [];
  parts.push({ html: t('Puis b = ω − aω :'), ask: 'b =', start: bStart, judge: CJ({ center: true }), lines: bLines, pre });
  const { start, judge, script } = partsScript(parts, level, TR_CHOICES);
  return linesItem({
    skill: TR, level, mode: modeOf(level), start, judge, script,
    prompt: nat === 'homothétie'
      ? t('Écris {what} sous la forme z′ = az + b : a est le rapport, puis b = ω − aω (car z′ − ω = a(z − ω)).', { what })
      : t('Écris {what} sous la forme z′ = az + b : a = r·e^(iθ), puis b = ω − aω (car z′ − ω = a(z − ω)).', { what }),
    hints: H(t('z′ − ω = a(z − ω) : le centre ω reste fixe. Donc z′ = az + (ω − aω).'),
      `a = ${cm(d.a)} ; b = ${mt(`${cp(d.w)}-${cp(aw)}`)} = □`,
      `z′ = ${mt(mapText(d.a, d.b))}`),
    subgoals: TR_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    declares: { vars: [], complex: true }, baits: ['g8_rotation_about_origin'],
    key: `${TR}:${level}:2:${mapText(d.a, d.b)}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// f₂ ∘ f₁, then its centre and nature.
function composeItem(level, rng, opts) {
  let d = null;
  for (let i = 0; i < 200 && !d; i++) {
    const a1 = cq(...rng.pick(AS));
    const a2 = cq(...rng.pick(AS));
    const a = a1.mul(a2);
    if (a.eq(1) || a.re.d !== 1 || a.im.d !== 1 || a.abs2().valueOf() > 9) continue;
    if (sameLine(parse(`${cp(a2)}×${cp(a1)}`, CXP), parse(ct(a), CXP))) continue;
    const w = gauss(rng, -3, 3);
    const b1 = gauss(rng, -3, 3);
    if (w.isZero() || b1.isZero()) continue;
    const b = w.sub(a.mul(w));
    const b2 = b.sub(a2.mul(b1));
    if (b2.re.d !== 1 || b2.im.d !== 1 || b2.isZero() || Math.abs(b2.re.n) > 9 || Math.abs(b2.im.n) > 9) continue;
    d = { a1, a2, b1, b2, a, b, w };
  }
  d = d || { a1: cq(0, 1), a2: cq(2), b1: cq(1), b2: cq(-1, 1), a: cq(0, 2), b: cq(1, 1), w: cq(-1, 3).div(5), fallback: true };
  const parts = [
    { start: `${cp(d.a2)}×${cp(d.a1)}`, judge: CJ(), lines: [E(ct(d.a), 'a = a₂a₁', 'write', 'a')] },
    { html: t('f₂(f₁(z)) = a₂(a₁z + b₁) + b₂, donc b = a₂b₁ + b₂ :'), ask: 'b =', start: `${cp(d.a2)}×${cp(d.b1)}+${cp(d.b2)}`, judge: CJ(), lines: [E(ct(d.b), 'b = a₂b₁ + b₂', 'write', 'b')] },
    { html: t('Centre de f₂ ∘ f₁ :'), ask: 'ω', start: `ω=${mapText(d.a, d.b).replace(/z/g, 'ω')}`, judge: { kind: 'complex', form: 'set', unknown: 'ω', complex: true }, lines: fixedPart(d, 4).lines, pre: level <= 4 ? [natureDecision(d)] : [] },
  ];
  const { start, judge, script } = partsScript(parts, level, TR_CHOICES);
  return linesItem({
    skill: TR, level, mode: modeOf(level), start, judge, script,
    prompt: t('f₁(z) = {v1} et f₂(z) = {v2}. Écris f₂ ∘ f₁ sous la forme z ↦ az + b, puis trouve son centre ω.', { v1: mt(mapText(d.a1, d.b1)), v2: mt(mapText(d.a2, d.b2)) }),
    hints: H(t('f₂(f₁(z)) = a₂(a₁z + b₁) + b₂ : a = a₂a₁ et b = a₂b₁ + b₂. Le centre résout ω = aω + b.'),
      `a = ${cm(d.a)}, b = ${cm(d.b)} ; ${mt(`${coefText(cq(1).sub(d.a), 'ω')}=${ct(d.b)}`)}.`,
      t('f₂ ∘ f₁ : z ↦ {v1}, centre ω = {w}.', { v1: mt(mapText(d.a, d.b)), w: cm(d.w) })),
    subgoals: TR_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    declares: { vars: ['ω'], complex: true }, baits: level <= 4 ? ['g8_rotation_about_origin'] : [],
    key: `${TR}:${level}:3:${mapText(d.a1, d.b1)}:${mapText(d.a2, d.b2)}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

function trMcq(rng, opts) {
  const d = trData(rng);
  if (rng.chance(0.5)) {
    const options = uniq([
      { html: `z′ = ${mt(mapText(d.a, d.b))}`, correct: true },
      { html: `z′ = ${mt(mapText(d.a, d.w))}`, correct: false, rule: 'g8_rotation_about_origin' },
      { html: `z′ = ${mt(mapText(d.a, d.a.mul(d.w)))}`, correct: false, rule: 'g8_rotation_about_origin' },
      { html: `z′ = ${mt(mapText(d.a, d.b.neg()))}`, correct: false },
    ]);
    const nat = natureOf(d.a);
    return mcq({
      skill: TR, level: 4, prompt: t('Quelle est l\'écriture complexe de la transformation de centre {w}, de rapport {v1} et d\'angle {v2} ({nat}) ?', { w: cm(d.w), v1: fr(modT(d.a)), v2: fr(argT(d.a)), nat: NAT_NAME(nat) }), options,
      key: `${TR}:mcq:w:${mapText(d.a, d.b)}`, exam: examTag(opts), fallback: !!d.fallback,
      solution: [{ html: `a = ${cm(d.a)} et z′ − ω = a(z − ω) : b = ω − aω = ${cm(d.b)}.`, note: '' }],
    }, rng);
  }
  const options = uniq([
    { html: cm(d.w), correct: true },
    { html: '0', correct: false, rule: 'g8_rotation_about_origin' },
    { html: cm(d.b), correct: false, rule: 'g8_rotation_about_origin' },
    { html: cm(d.b.div(cq(1).add(d.a).isZero() ? cq(2) : cq(1).add(d.a))), correct: false },
  ]);
  return mcq({
    skill: TR, level: 4, prompt: t('Quel est le centre de la transformation z ↦ {v1} ?', { v1: mt(mapText(d.a, d.b)) }), options,
    key: `${TR}:mcq:c:${mapText(d.a, d.b)}`, exam: examTag(opts), fallback: !!d.fallback,
    solution: [{ html: `ω = aω + b ⇔ ω = b/(1 − a) = ${cm(d.w)}.`, note: '' }],
  }, rng);
}

const TR_TF = [
  { s: t('z ↦ iz + 1 est une rotation de centre 0.'), t: false, rule: 'g8_rotation_about_origin', why: t('Faux : c\'est une rotation d\'angle π/2, mais de centre (1 + i)/2 (ω = iω + 1).') },
  { s: t('z ↦ 2z + 3 est une homothétie de rapport 2.'), t: true, why: t('Vrai : a = 2 est réel ; son centre est −3.') },
  { s: t('z ↦ (1 + i)z est une rotation.'), t: false, why: t('Faux : |1 + i| = √2 ≠ 1, c\'est une similitude de centre 0, de rapport √2 et d\'angle π/4.') },
  { s: t('z ↦ −z + 4 est la symétrie de centre 2.'), t: true, why: t('Vrai : a = −1 (rotation d\'angle π), et ω = −ω + 4 donne ω = 2.') },
  { s: t('z ↦ z + 2i est une rotation.'), t: false, why: t('Faux : a = 1, c\'est la translation de vecteur 2i.') },
  { s: t('La rotation de centre 1 et d\'angle π/2 est z ↦ iz + 1.'), t: false, rule: 'g8_rotation_about_origin', why: t('Faux : z′ − 1 = i(z − 1), donc z′ = iz + 1 − i.') },
];

export function genTransform(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return trMcq(rng, opts);
  if (opts.exam === 'open') return { ...(rng.chance(0.5) ? elementsItem(4, rng, {}) : composeItem(4, rng, {})), exam: { format: 'open', points: 4 } };
  if (opts.exam === 'tf') {
    const k = rng.int(0, TR_TF.length - 1);
    return vfMcq(TR, TR_TF[k].s, TR_TF[k].t, rng, { key: String(k), why: TR_TF[k].why, ruleIfTrue: TR_TF[k].rule || null });
  }
  if (level <= 2) return rng.chance(0.65) ? elementsItem(level, rng, opts) : writeItem(level, rng, opts);
  if (level === 5) return rng.chance(0.6) ? composeItem(level, rng, opts) : writeItem(level, rng, opts);
  const r = rng.next();
  return r < 0.45 ? elementsItem(level, rng, opts) : r < 0.8 ? writeItem(level, rng, opts) : composeItem(level, rng, opts);
}


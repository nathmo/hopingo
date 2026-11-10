// a1-seq-rec-study (module A1, part h, step U4): the 13-point problem of
// the MT exam (catalogue, exam example E1). aₙ₊₁ = f(aₙ) with
//   gabarit 1 (σ = 1):  f(x) = x + (x − p)/(γ(x − v)),  v = p + 1/γ
//   gabarit 2 (σ = −1): f(x) = x − (x − p)/(γ(x − v)),  v = p − 1/γ
// p whole in [−3 ; 2], γ ∈ {1, 2}: f′(x) = 1 − 1/(γx − γv)² vanishes at p
// and c = p + 2σ/γ; f(p) = p is a local max (σ = 1) or min (σ = −1), f(c) =
// p + 4σ/γ; f″(x) = 2γ/(γx − γv)³; asymptotes x = v and y = x + σ/γ. The
// sequence converges (to p) if and only if σ·a₁ < σ·v.
//
// Level 5 and the `open` variant are `problem` items (js/content/uni/
// kit-problem.js) with the catalogue's barème (13 points): (a) 1; (b) f′ 2,
// f″ 1, monotony 1 (the set ½, the extremum ½), convexity 1, vertical
// asymptote 1 (½ per side), oblique asymptote 1; (c) 2; (d) 3, one
// multiple choice per case. Levels 1 to 4 are lines items: (c) alone
// (L1, the study of f given), every part with blanks (L2), the cases with
// a menu (L3), every part free with hints (L4). In lines, the case
// discussion is a decision per case before a computed line (the maximum of
// f, lim aₙ), then the cases are joined into one set (solset).

import { Q } from '../../math/rational.js';
import { mcq } from './kit.js';
import { problemItem } from './kit-problem.js';
import {
  q, N, H, E, examOf, lin, blanked, partsItem, RD, P, MN, fr, part, decision,
} from './analyse1-h-kit.js';

const RS = 'a1-seq-rec-study';
const KEYS = ['calcx', 'anal', 'set', 'seq'];
const SUB = [
  { id: 'deriv', label: 'dérivées', skill: 'a1-deriv-rules' },
  { id: 'study', label: 'convexité, asymptotes', skill: 'a1-fn-study' },
  { id: 'sign', label: 'signe de f(x) − x', skill: 'a1-seq-rec-fixed' },
  { id: 'disc', label: 'discussion selon a₁', skill: RS },
];
const CHOICES = [
  { id: 'solve', label: 'Résoudre L = f(L)' },
  { id: 'sign', label: 'Étudier le signe de f(x) − x' },
  { id: 'extremum', label: 'Utiliser l\'extremum local de f qui est un point fixe' },
  { id: 'limit', label: 'Monotone et bornée : la limite est un point fixe' },
  { id: 'merge', label: 'Réunir les cas' },
  { id: 'fixed', label: 'Le point fixe est la limite pour tout a₁', rule: 'a1_rec_limit_without_convergence', why: 'Le point fixe n\'est que la limite possible : selon a₁, la suite peut partir à l\'infini.' },
];

function draw(rng) {
  for (let i = 0; i < 200; i++) {
    const sig = rng.pick([1, -1]);
    const p = rng.int(-3, 2);
    const gam = rng.pick([1, 2]);
    const v = Q.of(p).add(q(sig, gam));
    if (v.n === 0) continue;
    // Not the exam's own numbers (MT 2014: p = −1, γ = 2).
    if (sig === 1 && p === -1 && gam === 2) continue;
    return { sig, p, gam, v };
  }
  return { sig: 1, p: -2, gam: 1, v: Q.of(-1), fallback: true };
}

// Every text of the problem.
function texts(d) {
  const { sig, p, gam: G, v } = d;
  const GV = v.mul(G).n; // γv, a whole number
  const den = (u, times = false) => `${G === 1 ? '' : `${G}${times ? '×' : ''}`}${u}${GV > 0 ? `-${GV}` : `+${-GV}`}`;
  const numer = (u) => (p === 0 ? u : `(${lin(p, u)})`);
  const frac = (u, times) => `${numer(u)}/(${den(u, times)})`;
  const f = (u = 'x', times = false) => `${u}${sig > 0 ? '+' : '-'}${frac(u, times)}`;
  const c = p + (2 * sig) / G; // the other critical point (whole)
  const m = p + (4 * sig) / G; // f(c)
  const lo = Math.min(p, c);
  const hi = Math.max(p, c);
  const factor = (r) => (r === 0 ? 'x' : `(${lin(r)})`);
  const V = N(v);
  return {
    f: f(), rec: `a_(n+1)=${f('a_n')}`, fL: `L=${f('L')}`, aMid: `${frac('L')}=0`, aEnd: `L=${p}`,
    den: den('x'), fp: `1-1/(${den('x')})^2`,
    fpFact: `${G * G === 1 ? '' : G * G}${factor(p)}${factor(c)}/(${den('x')})^2`,
    inc: `]-∞;${lo}[∪]${hi};+∞[`,
    c, m, fc: f(P(c), true),
    f2: `${2 * G}/(${den('x')})^3`, convex: `]${V};+∞[`,
    ao: N(q(sig, G)), aoStart: `${f()}-x`, aoMid: `${sig > 0 ? '' : '-'}${frac('x')}`,
    gt: `${f()}>x`, lt: `${f()}<x`, gtMid: `${sig > 0 ? '' : '-'}${frac('x')}>0`, ltMid: `${sig > 0 ? '' : '-'}${frac('x')}<0`,
    gtSet: sig > 0 ? `]-∞;${p}[∪]${V};+∞[` : `]${V};${p}[`,
    ltSet: sig > 0 ? `]${p};${V}[` : `]-∞;${V}[∪]${p};+∞[`,
    cases: sig > 0 ? `x<${p}∨x=${p}∨(${p}<x∧x<${V})` : `x>${p}∨x=${p}∨(${V}<x∧x<${p})`,
    conv: sig > 0 ? `]-∞;${V}[` : `]${V};+∞[`,
    v: V, vr: fr(V), pr: fr(p),
  };
}

// ---------- decisions ----------

const extDecision = (d) => decision(`f′ s'annule en x = ${fr(d.p)} et change de signe. En x = ${fr(d.p)}, f a :`, [
  { id: 'ok', label: `un ${d.sig > 0 ? 'maximum' : 'minimum'} local, f(${fr(d.p)}) = ${fr(d.p)}`, valid: true },
  { id: 'other', label: `un ${d.sig > 0 ? 'minimum' : 'maximum'} local`, valid: false, why: `f′ passe de ${d.sig > 0 ? '+ à −' : '− à +'} en ${fr(d.p)}.` },
  { id: 'none', label: 'pas d\'extremum', valid: false, why: 'f′ change de signe en ce point : c\'est un extremum local.' },
]);

const avDecision = (T) => decision('Asymptote verticale :', [
  { id: 'ok', label: `x = ${T.vr} : f n'y est pas définie et |f(x)| → +∞`, valid: true },
  { id: 'p', label: `x = ${T.pr}`, valid: false, why: `f(${T.pr}) = ${T.pr} : f est définie en ${T.pr}.` },
  { id: 'none', label: 'il n\'y en a pas', valid: false, why: `Le dénominateur s'annule en ${T.vr} et pas le numérateur.` },
]);

const aoDecision = () => decision('f(x)/x → 1 en ±∞ : la pente de l\'asymptote oblique est 1. Pour son équation y = x + p :', [
  { id: 'ok', label: 'il faut encore p = lim (f(x) − x)', valid: true },
  { id: 'slope', label: 'y = x suffit : la pente est connue', valid: false, rule: 'a1_oblique_asymptote_slope_only', why: 'La pente ne suffit pas : il faut encore p = lim (f(x) − x).' },
]);

// The three cases of (d): [{prompt, options}] (options with one right).
function cases(d, T) {
  const { sig } = d;
  const p = T.pr;
  const v = T.vr;
  const m = fr(T.m);
  const up = sig > 0;
  const div = {
    prompt: `Si a₁ ${up ? '>' : '<'} ${v} :`,
    options: [
      { id: 'ok', label: up ? `f(x) > x et f(x) ≥ ${m} > ${v} sur ]${v} ; +∞[ : (aₙ) croît ; une limite serait un point fixe > ${v}, il n'y en a pas : aₙ → +∞` : `f(x) < x et f(x) ≤ ${m} < ${v} sur ]−∞ ; ${v}[ : (aₙ) décroît ; une limite serait un point fixe < ${v}, il n'y en a pas : aₙ → −∞`, valid: true },
      { id: 'fixed', label: `aₙ → ${p}, le seul point fixe`, valid: false, rule: 'a1_rec_limit_without_convergence', why: `${p} n'est que la limite possible. Ici la suite ${up ? 'croît et reste > ' : 'décroît et reste < '}${v} : elle s'éloigne de ${p}.` },
      { id: 'bound', label: `(aₙ) ${up ? 'croît et elle est minorée' : 'décroît et elle est majorée'} par ${m} : elle converge`, valid: false, why: up ? 'Croissante et minorée ne suffit pas : il faudrait qu\'elle soit majorée.' : 'Décroissante et majorée ne suffit pas : il faudrait qu\'elle soit minorée.' },
    ],
  };
  const near = {
    prompt: `Si a₁ ${up ? '<' : '>'} ${p} :`,
    options: [
      { id: 'ok', label: up ? `aₙ < ${p} pour tout n (${p} est le maximum de f sur ]−∞ ; ${v}[) et f(x) > x : (aₙ) croît, majorée par ${p}, donc aₙ → ${p}` : `aₙ > ${p} pour tout n (${p} est le minimum de f sur ]${v} ; +∞[) et f(x) < x : (aₙ) décroît, minorée par ${p}, donc aₙ → ${p}`, valid: true },
      up
        ? { id: 'inf', label: `f est croissante sur ]−∞ ; ${p}] : (aₙ) croît sans borne, aₙ → +∞`, valid: false, why: `f(x) ≤ ${p} pour x < ${v} : la suite reste sous ${p}.` }
        : { id: 'fup', label: `f est croissante sur [${p} ; +∞[, donc (aₙ) croît`, valid: false, rule: 'a1_monotone_by_f_increasing', why: `f croissante dit seulement que la suite est monotone. Ici f(x) < x : a₂ < a₁, elle décroît.` },
      { id: 'away', label: `(aₙ) ${up ? 'décroît et tend vers −∞' : 'croît et tend vers +∞'}`, valid: false, why: `f(x) ${up ? '> x' : '< x'} sur cet intervalle : la suite ${up ? 'croît' : 'décroît'}.` },
      { id: 'v', label: `(aₙ) ${up ? 'croît' : 'décroît'} et converge vers ${v}`, valid: false, why: `${v} n'est pas un point fixe : f n'y est même pas définie.` },
    ],
  };
  const mid = {
    prompt: `Si a₁ est entre ${up ? `${p} et ${v}` : `${v} et ${p}`} :`,
    options: [
      { id: 'ok', label: `a₂ = f(a₁) ${up ? '<' : '>'} ${p} : on est ramené au cas a₁ ${up ? '<' : '>'} ${p}, donc aₙ → ${p}`, valid: true },
      { id: 'away', label: `f(x) ${up ? '< x' : '> x'} sur cet intervalle : (aₙ) ${up ? 'décroît et tend vers −∞' : 'croît et tend vers +∞'}`, valid: false, why: `Seul a₁ est dans cet intervalle : a₂ = f(a₁) ${up ? '<' : '>'} ${p}, et là f(x) ${up ? '> x' : '< x'}.` },
      { id: 'bound', label: `(aₙ) ${up ? 'décroît et elle est minorée' : 'croît et elle est majorée'} par ${p} : aₙ → ${p}`, valid: false, why: `a₂ ${up ? '<' : '>'} ${p} : la suite passe de l'autre côté de ${p}, puis ${up ? 'remonte' : 'redescend'}.` },
    ],
  };
  return { div, near, mid };
}

// ---------- the parts ----------

const SOL = { kind: 'solset', v: 'x' };
const EQ = { kind: 'equiv', vars: ['x'], domain: { x: [-5, 5] }, target: 'no-prime' };
const LIMX = (to, dir) => ({ kind: 'limit', v: 'x', vars: ['x'], to, ...(dir ? { dir } : {}) });

function partsOf(d, level) {
  const T = texts(d);
  const g = level <= 2;
  const mids = level <= 3;
  const C = cases(d, T);
  const P2 = {};
  P2.A = part('(a) Seule limite possible : résous L = f(L).', 'L ∈', T.fL, { kind: 'solset', v: 'L' },
    mids ? [E(T.aMid, 'Retrancher L', 'disc', 'solve'), E(T.aEnd, 'Une fraction est nulle si son numérateur l\'est', 'disc', 'solve')] : [E(T.aEnd, 'Le seul point fixe', 'disc', 'solve')]);
  if (g) P2.A.lines[1] = blanked(P2.A.lines[1], [String(d.p)]);
  P2.b1 = part('(b) Dérive f :', 'f′(x) =', `d(${T.f})`, EQ, [E(T.fp, 'Dériver', 'deriv', 'deriv')]);
  if (g) P2.b1.lines[0] = blanked(P2.b1.lines[0], [`(${T.den})^2`]);
  P2.b2 = part('f est croissante là où f′(x) > 0 :', 'f′(x) > 0 ⇔', `${T.fp}>0`, SOL,
    mids ? [E(`${T.fpFact}>0`, 'Même dénominateur, factoriser', 'study', 'sign'), E(T.inc, 'Signe des facteurs', 'study', 'sign')] : [E(T.inc, 'Signe de f′', 'study', 'sign')]);
  if (g) P2.b2.lines[1] = blanked(P2.b2.lines[1], [String(Math.max(d.p, T.c))]);
  P2.b3 = part(`Valeur de l'autre extremum local, en x = ${fr(T.c)} :`, `f(${fr(T.c)}) =`, T.fc, { kind: 'value', form: 'irreducible' }, [E(N(T.m), 'Calculer', 'study', 'eval')], [extDecision(d)]);
  P2.b4 = part('Dérive encore :', 'f″(x) =', `d(${T.fp})`, EQ, [E(T.f2, 'Dériver', 'deriv', 'deriv')]);
  if (g) P2.b4.lines[0] = blanked(P2.b4.lines[0], [String(2 * d.gam)]);
  P2.b5 = part('f est convexe là où f″(x) > 0 :', 'f″(x) > 0 ⇔', `${T.f2}>0`, SOL, [E(T.convex, `Signe de (${RD(T.den)})³`, 'study', 'sign')]);
  P2.b6 = part(`Asymptote verticale : limite quand x → ${T.vr}⁺`, 'lim f =', T.f, LIMX(T.v, '+'), [E('+∞', 'Le numérateur tend vers un nombre ≠ 0, le dénominateur vers 0', 'study', 'lim')], [avDecision(T)]);
  P2.b7 = part(`Puis quand x → ${T.vr}⁻`, 'lim f =', T.f, LIMX(T.v, '-'), [E('-∞', 'Le dénominateur tend vers 0 de l\'autre côté', 'study', 'lim')]);
  P2.b8 = part('Asymptote oblique en ±∞ : limite de f(x) − x', 'lim (f(x) − x) =', T.aoStart, LIMX('+∞'),
    mids ? [E(T.aoMid, 'Simplifier', 'study', 'lim'), E(T.ao, 'Termes de plus haut degré', 'study', 'lim')] : [E(T.ao, `Asymptote y = ${RD(`x+${T.ao}`.replace('+-', '-'))}`, 'study', 'lim')], [aoDecision()]);
  P2.c1 = part('(c) Où le graphe de f est-il au-dessus de la droite y = x ?', 'f(x) > x ⇔', T.gt, SOL,
    mids ? [E(T.gtMid, 'Retrancher x', 'sign', 'sign'), E(T.gtSet, 'Signe du quotient', 'sign', 'sign')] : [E(T.gtSet, 'Signe de f(x) − x', 'sign', 'sign')]);
  P2.c2 = part('Et en dessous ?', 'f(x) < x ⇔', T.lt, SOL,
    mids ? [E(T.ltMid, 'Retrancher x', 'sign', 'sign'), E(T.ltSet, 'Signe du quotient', 'sign', 'sign')] : [E(T.ltSet, 'Signe de f(x) − x', 'sign', 'sign')]);
  if (g) {
    P2.c1.lines[1] = blanked(P2.c1.lines[1], [T.v]);
    P2.c2.lines[1] = blanked(P2.c2.lines[1], [String(d.p)]);
  }
  const dec = (c) => (level === 1 ? { kind: 'note', html: `${c.prompt} ${c.options[0].label}.` } : decision(c.prompt, c.options));
  const up = d.sig > 0;
  P2.d1 = part(`(d) Pour a₁ ${up ? '<' : '>'} ${T.vr} : le ${up ? 'maximum' : 'minimum'} de f sur ${up ? `]−∞ ; ${T.vr}[` : `]${T.vr} ; +∞[`} vaut`, up ? 'M =' : 'm =', up ? 'M' : 'm',
    { kind: 'value', expect: String(d.p) }, [E(String(d.p), `f(${T.pr}) = ${T.pr}, extremum local et point fixe`, 'disc', 'extremum')], [dec(C.div)]);
  P2.d2 = part(`Si a₁ ${up ? '<' : '>'} ${T.pr}, la limite de la suite :`, 'lim aₙ =', 'lim(a_n,n,∞)',
    { kind: 'value', expect: String(d.p) }, [E(String(d.p), 'Monotone et bornée : la limite est le point fixe', 'disc', 'limit')], [dec(C.near), dec(C.mid)]);
  P2.d3 = part(`Conclusion : réunis les cas où la suite converge (x = a₁ ; a₁ = ${T.pr} donne une suite constante).`, 'a₁ ∈', T.cases, SOL, [E(T.conv, 'Réunir les cas', 'disc', 'merge')]);
  return { T, C, P: P2 };
}

function prompt(T, more = '') {
  return `On étudie la suite définie par a₁ ∈ ℝ et ${MN(T.rec)}, avec f(x) = ${MN(T.f)} (a₁ ≠ ${T.vr}).${more}`;
}

function givenStudy(d, T) {
  const up = d.sig > 0;
  return ` On sait que : la seule limite possible est ${T.pr} ; f′(x) = ${MN(T.fpFact)} ; f croît sur ${RD(T.inc)} et décroît ailleurs (hors de ${T.vr}) ; ${up ? 'max' : 'min'} local f(${T.pr}) = ${T.pr}, ${up ? 'min' : 'max'} local f(${fr(T.c)}) = ${fr(T.m)} ; asymptotes x = ${T.vr} et ${RD(`y=x+${T.ao}`.replace('+-', '-'))}.`;
}

function hints(d, T) {
  const up = d.sig > 0;
  return H('Compare le graphe de f à la droite y = x : c\'est ce qui dit si la suite monte (f(aₙ) > aₙ) ou descend.',
    `Sur ${up ? `]−∞ ; ${T.vr}[` : `]${T.vr} ; +∞[`}, le ${up ? 'maximum' : 'minimum'} de f vaut ▢ : c'est un point fixe.`,
    `f(x) ${up ? '≤' : '≥'} ${T.pr} pour x ${up ? '<' : '>'} ${T.vr}, donc dès a₂ la suite reste ${up ? 'sous' : 'au-dessus de'} ${T.pr}, et elle converge vers ${T.pr}.`);
}

const SEQ = {
  1: ['c1', 'c2'],
  2: ['A', 'b1', 'b2', 'b4', 'b5', 'c1', 'c2', 'd1', 'd2', 'd3'],
  3: ['A', 'c1', 'c2', 'd1', 'd2', 'd3'],
  4: ['A', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'c1', 'c2', 'd1', 'd2', 'd3'],
};

function studyLines(level, rng, opts) {
  const d = draw(rng);
  const { T, P: parts } = partsOf(d, level);
  const seq = SEQ[level].map((k) => ({ ...parts[k] }));
  const more = level === 1 ? `${givenStudy(d, T)} (c) Compare le graphe de f à la droite y = x.`
    : level === 3 ? ` On sait que f ${d.sig > 0 ? 'a un maximum local en' : 'a un minimum local en'} ${T.pr}, f(${T.pr}) = ${T.pr}, et que x = ${T.vr} est asymptote verticale. Trouve la limite possible, compare f à y = x, puis discute selon a₁.`
      : ' (a) Seule limite possible ; (b) étude de f ; (c) position par rapport à y = x ; (d) discussion selon a₁.';
  return partsItem({
    skill: RS, level, prompt: prompt(T, more), parts: seq, choices: CHOICES, hints: hints(d, T), subgoals: SUB, keys: KEYS,
    key: `${RS}:${level}:${T.f}`, exam: false, fallback: d.fallback, expectedSec: { 1: 120, 2: 400, 3: 300, 4: 600 }[level],
  });
}

// ---------- level 5 and the open variant: the problem ----------

export const BAREME = [[1], [2, 0.5, 0.5, 1, 1, 0.5, 0.5, 1], [1, 1], [1], [1], [1]];

function caseMcq(d, T, c, which, rng, level) {
  return mcq({
    skill: RS, level, prompt: `(d) ${c.prompt.replace(/ :$/, '')}, que fait la suite ?`,
    options: c.options.map((o) => ({ html: o.label, correct: o.valid, ...(o.rule ? { rule: o.rule } : {}) })),
    key: `${RS}:case:${which}:${T.f}`, expectedSec: 120,
    solution: [{ html: c.options[0].label, note: '' }],
  }, rng);
}

function conclusionMcq(d, T, C, rng, level) {
  const up = d.sig > 0;
  const options = [
    { html: `${C.mid.options[0].label}. Avec a₁ = ${T.pr} (suite constante), la suite converge, vers ${T.pr}, si et seulement si a₁ ${up ? '<' : '>'} ${T.vr}`, correct: true },
    { html: `${C.mid.options[1].label}. La suite converge si et seulement si a₁ ${up ? '≤' : '≥'} ${T.pr}`, correct: false },
    { html: `${C.mid.options[2].label}. La suite converge pour tout a₁ ≠ ${T.vr}`, correct: false, rule: 'a1_rec_limit_without_convergence' },
    { html: `La suite converge seulement si a₁ = ${T.pr} (suite constante)`, correct: false },
  ];
  return mcq({
    skill: RS, level, prompt: `(d) Si a₁ est entre ${up ? `${T.pr} et ${T.vr}` : `${T.vr} et ${T.pr}`}, que fait la suite ? Conclus : pour quels a₁ converge-t-elle ?`,
    options, key: `${RS}:conclusion:${T.f}`, expectedSec: 150,
    solution: [{ html: options[0].html, note: '' }],
  }, rng);
}

function studyProblem(level, rng, opts) {
  const d = draw(rng);
  const { T, C, P: parts } = partsOf(d, 5);
  const one = (prompt, keys, sub) => partsItem({
    skill: RS, level, prompt, parts: keys.map((k) => ({ ...parts[k] })), hints: [], noHints: true, subgoals: sub || SUB, keys: KEYS,
    key: `${RS}:${keys.join('')}:${T.f}`, exam: false, fallback: d.fallback,
  });
  const A = one('(a) Quelle est la seule limite possible de la suite ?', ['A']);
  const B = one('(b) Étudie f : f′ et f″, monotonie et extrema, convexité, asymptotes.', ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8']);
  const Cp = one('(c) Compare le graphe de f à la droite y = x.', ['c1', 'c2']);
  return problemItem({
    skill: RS, level, prompt: prompt(T, ' Problème en 13 points : (a) seule limite possible, (b) étude de f, (c) position par rapport à y = x, (d) discussion selon a₁.'),
    parts: [
      { item: A, points: BAREME[0], title: '(a) Seule limite possible' },
      { item: B, points: BAREME[1], title: '(b) Étude de f' },
      { item: Cp, points: BAREME[2], title: '(c) Position par rapport à y = x' },
      { item: caseMcq(d, T, C.div, 'div', rng, level), points: BAREME[3][0], title: '(d) Premier cas' },
      { item: caseMcq(d, T, C.near, 'near', rng, level), points: BAREME[4][0], title: '(d) Deuxième cas' },
      { item: conclusionMcq(d, T, C, rng, level), points: BAREME[5][0], title: '(d) Dernier cas et conclusion' },
    ],
    key: `${level}:${T.f}`, exam: examOf(opts, 13), expectedSec: 900, fallback: d.fallback,
  });
}

export function studyItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'open' || level === 5) return studyProblem(opts.exam ? 4 : 5, rng, opts);
  return studyLines(level, rng, opts);
}

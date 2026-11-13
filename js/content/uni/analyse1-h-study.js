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

import { t } from '../../i18n.js';
import { Q } from '../../math/rational.js';
import { mcq } from './kit.js';
import { problemItem } from './kit-problem.js';
import {
  q, N, H, E, examOf, lin, blanked, partsItem, RD, P, MN, fr, part, decision,
} from './analyse1-h-kit.js';

const RS = 'a1-seq-rec-study';
const KEYS = ['calcx', 'anal', 'set', 'seq'];
const SUB = [
  { id: 'deriv', label: t('dérivées'), skill: 'a1-deriv-rules' },
  { id: 'study', label: t('convexité, asymptotes'), skill: 'a1-fn-study' },
  { id: 'sign', label: t('signe de f(x) − x'), skill: 'a1-seq-rec-fixed' },
  { id: 'disc', label: t('discussion selon a₁'), skill: RS },
];
const CHOICES = [
  { id: 'solve', label: t('Résoudre L = f(L)') },
  { id: 'sign', label: t('Étudier le signe de f(x) − x') },
  { id: 'extremum', label: t('Utiliser l\'extremum local de f qui est un point fixe') },
  { id: 'limit', label: t('Monotone et bornée : la limite est un point fixe') },
  { id: 'merge', label: t('Réunir les cas') },
  { id: 'fixed', label: t('Le point fixe est la limite pour tout a₁'), rule: 'a1_rec_limit_without_convergence', why: t('Le point fixe n\'est que la limite possible : selon a₁, la suite peut partir à l\'infini.') },
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

const extDecision = (d) => decision(t('f′ s\'annule en x = {p} et change de signe. En x = {p}, f a :', { p: fr(d.p) }), [
  { id: 'ok', label: d.sig > 0 ? t('un maximum local, f({p}) = {p}', { p: fr(d.p) }) : t('un minimum local, f({p}) = {p}', { p: fr(d.p) }), valid: true },
  { id: 'other', label: d.sig > 0 ? t('un minimum local') : t('un maximum local'), valid: false, why: t('f′ passe de {s} en {p}.', { s: d.sig > 0 ? t('+ à −') : t('− à +'), p: fr(d.p) }) },
  { id: 'none', label: t('pas d\'extremum'), valid: false, why: t('f′ change de signe en ce point : c\'est un extremum local.') },
]);

const avDecision = (T) => decision(t('Asymptote verticale :'), [
  { id: 'ok', label: t('x = {v} : f n\'y est pas définie et |f(x)| → +∞', { v: T.vr }), valid: true },
  { id: 'p', label: `x = ${T.pr}`, valid: false, why: t('f({p}) = {p} : f est définie en {p}.', { p: T.pr }) },
  { id: 'none', label: t('il n\'y en a pas'), valid: false, why: t('Le dénominateur s\'annule en {v} et pas le numérateur.', { v: T.vr }) },
]);

const aoDecision = () => decision(t('f(x)/x → 1 en ±∞ : la pente de l\'asymptote oblique est 1. Pour son équation y = x + p :'), [
  { id: 'ok', label: t('il faut encore p = lim (f(x) − x)'), valid: true },
  { id: 'slope', label: t('y = x suffit : la pente est connue'), valid: false, rule: 'a1_oblique_asymptote_slope_only', why: t('La pente ne suffit pas : il faut encore p = lim (f(x) − x).') },
]);

// The three cases of (d): [{prompt, options}] (options with one right).
function cases(d, T) {
  const { sig } = d;
  const p = T.pr;
  const v = T.vr;
  const m = fr(T.m);
  const up = sig > 0;
  const w = { p, v, m };
  // prompt: the case before a decision; ask: the same case as a question.
  const divC = { c: `a₁ ${up ? '>' : '<'} ${v}` };
  const div = {
    prompt: t('Si {c} :', divC), ask: t('(d) Si {c}, que fait la suite ?', divC),
    options: [
      { id: 'ok', label: up ? t('f(x) > x et f(x) ≥ {m} > {v} sur ]{v} ; +∞[ : (aₙ) croît ; une limite serait un point fixe > {v}, il n\'y en a pas : aₙ → +∞', w) : t('f(x) < x et f(x) ≤ {m} < {v} sur ]−∞ ; {v}[ : (aₙ) décroît ; une limite serait un point fixe < {v}, il n\'y en a pas : aₙ → −∞', w), valid: true },
      { id: 'fixed', label: t('aₙ → {p}, le seul point fixe', w), valid: false, rule: 'a1_rec_limit_without_convergence', why: up ? t('{p} n\'est que la limite possible. Ici la suite croît et reste > {v} : elle s\'éloigne de {p}.', w) : t('{p} n\'est que la limite possible. Ici la suite décroît et reste < {v} : elle s\'éloigne de {p}.', w) },
      { id: 'bound', label: up ? t('(aₙ) croît et elle est minorée par {m} : elle converge', w) : t('(aₙ) décroît et elle est majorée par {m} : elle converge', w), valid: false, why: up ? t('Croissante et minorée ne suffit pas : il faudrait qu\'elle soit majorée.') : t('Décroissante et majorée ne suffit pas : il faudrait qu\'elle soit minorée.') },
    ],
  };
  const nearC = { c: `a₁ ${up ? '<' : '>'} ${p}` };
  const near = {
    prompt: t('Si {c} :', nearC), ask: t('(d) Si {c}, que fait la suite ?', nearC),
    options: [
      { id: 'ok', label: up ? t('aₙ < {p} pour tout n ({p} est le maximum de f sur ]−∞ ; {v}[) et f(x) > x : (aₙ) croît, majorée par {p}, donc aₙ → {p}', w) : t('aₙ > {p} pour tout n ({p} est le minimum de f sur ]{v} ; +∞[) et f(x) < x : (aₙ) décroît, minorée par {p}, donc aₙ → {p}', w), valid: true },
      up
        ? { id: 'inf', label: t('f est croissante sur ]−∞ ; {p}] : (aₙ) croît sans borne, aₙ → +∞', w), valid: false, why: t('f(x) ≤ {p} pour x < {v} : la suite reste sous {p}.', w) }
        : { id: 'fup', label: t('f est croissante sur [{p} ; +∞[, donc (aₙ) croît', w), valid: false, rule: 'a1_monotone_by_f_increasing', why: t('f croissante dit seulement que la suite est monotone. Ici f(x) < x : a₂ < a₁, elle décroît.') },
      { id: 'away', label: up ? t('(aₙ) décroît et tend vers −∞') : t('(aₙ) croît et tend vers +∞'), valid: false, why: up ? t('f(x) > x sur cet intervalle : la suite croît.') : t('f(x) < x sur cet intervalle : la suite décroît.') },
      { id: 'v', label: up ? t('(aₙ) croît et converge vers {v}', w) : t('(aₙ) décroît et converge vers {v}', w), valid: false, why: t('{v} n\'est pas un point fixe : f n\'y est même pas définie.', w) },
    ],
  };
  const midC = up ? { a: p, b: v } : { a: v, b: p };
  const mid = {
    prompt: t('Si a₁ est entre {a} et {b} :', midC), ask: t('(d) Si a₁ est entre {a} et {b}, que fait la suite ?', midC),
    options: [
      { id: 'ok', label: t('a₂ = f(a₁) {rel} {p} : on est ramené au cas a₁ {rel} {p}, donc aₙ → {p}', { rel: up ? '<' : '>', p }), valid: true },
      { id: 'away', label: up ? t('f(x) < x sur cet intervalle : (aₙ) décroît et tend vers −∞') : t('f(x) > x sur cet intervalle : (aₙ) croît et tend vers +∞'), valid: false, why: up ? t('Seul a₁ est dans cet intervalle : a₂ = f(a₁) < {p}, et là f(x) > x.', w) : t('Seul a₁ est dans cet intervalle : a₂ = f(a₁) > {p}, et là f(x) < x.', w) },
      { id: 'bound', label: up ? t('(aₙ) décroît et elle est minorée par {p} : aₙ → {p}', w) : t('(aₙ) croît et elle est majorée par {p} : aₙ → {p}', w), valid: false, why: up ? t('a₂ < {p} : la suite passe de l\'autre côté de {p}, puis remonte.', w) : t('a₂ > {p} : la suite passe de l\'autre côté de {p}, puis redescend.', w) },
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
  P2.A = part(t('(a) Seule limite possible : résous L = f(L).'), 'L ∈', T.fL, { kind: 'solset', v: 'L' },
    mids ? [E(T.aMid, t('Retrancher L'), 'disc', 'solve'), E(T.aEnd, t('Une fraction est nulle si son numérateur l\'est'), 'disc', 'solve')] : [E(T.aEnd, t('Le seul point fixe'), 'disc', 'solve')]);
  if (g) P2.A.lines[1] = blanked(P2.A.lines[1], [String(d.p)]);
  P2.b1 = part(t('(b) Dérive f :'), 'f′(x) =', `d(${T.f})`, EQ, [E(T.fp, t('Dériver'), 'deriv', 'deriv')]);
  if (g) P2.b1.lines[0] = blanked(P2.b1.lines[0], [`(${T.den})^2`]);
  P2.b2 = part(t('f est croissante là où f′(x) > 0 :'), 'f′(x) > 0 ⇔', `${T.fp}>0`, SOL,
    mids ? [E(`${T.fpFact}>0`, t('Même dénominateur, factoriser'), 'study', 'sign'), E(T.inc, t('Signe des facteurs'), 'study', 'sign')] : [E(T.inc, t('Signe de f′'), 'study', 'sign')]);
  if (g) P2.b2.lines[1] = blanked(P2.b2.lines[1], [String(Math.max(d.p, T.c))]);
  P2.b3 = part(t('Valeur de l\'autre extremum local, en x = {c} :', { c: fr(T.c) }), `f(${fr(T.c)}) =`, T.fc, { kind: 'value', form: 'irreducible' }, [E(N(T.m), t('Calculer'), 'study', 'eval')], [extDecision(d)]);
  P2.b4 = part(t('Dérive encore :'), 'f″(x) =', `d(${T.fp})`, EQ, [E(T.f2, t('Dériver'), 'deriv', 'deriv')]);
  if (g) P2.b4.lines[0] = blanked(P2.b4.lines[0], [String(2 * d.gam)]);
  P2.b5 = part(t('f est convexe là où f″(x) > 0 :'), 'f″(x) > 0 ⇔', `${T.f2}>0`, SOL, [E(T.convex, t('Signe de ({d})³', { d: RD(T.den) }), 'study', 'sign')]);
  P2.b6 = part(t('Asymptote verticale : limite quand x → {v}⁺', { v: T.vr }), 'lim f =', T.f, LIMX(T.v, '+'), [E('+∞', t('Le numérateur tend vers un nombre ≠ 0, le dénominateur vers 0'), 'study', 'lim')], [avDecision(T)]);
  P2.b7 = part(t('Puis quand x → {v}⁻', { v: T.vr }), 'lim f =', T.f, LIMX(T.v, '-'), [E('-∞', t('Le dénominateur tend vers 0 de l\'autre côté'), 'study', 'lim')]);
  P2.b8 = part(t('Asymptote oblique en ±∞ : limite de f(x) − x'), 'lim (f(x) − x) =', T.aoStart, LIMX('+∞'),
    mids ? [E(T.aoMid, t('Simplifier'), 'study', 'lim'), E(T.ao, t('Termes de plus haut degré'), 'study', 'lim')] : [E(T.ao, t('Asymptote y = {y}', { y: RD(`x+${T.ao}`.replace('+-', '-')) }), 'study', 'lim')], [aoDecision()]);
  P2.c1 = part(t('(c) Où le graphe de f est-il au-dessus de la droite y = x ?'), 'f(x) > x ⇔', T.gt, SOL,
    mids ? [E(T.gtMid, t('Retrancher x'), 'sign', 'sign'), E(T.gtSet, t('Signe du quotient'), 'sign', 'sign')] : [E(T.gtSet, t('Signe de f(x) − x'), 'sign', 'sign')]);
  P2.c2 = part(t('Et en dessous ?'), 'f(x) < x ⇔', T.lt, SOL,
    mids ? [E(T.ltMid, t('Retrancher x'), 'sign', 'sign'), E(T.ltSet, t('Signe du quotient'), 'sign', 'sign')] : [E(T.ltSet, t('Signe de f(x) − x'), 'sign', 'sign')]);
  if (g) {
    P2.c1.lines[1] = blanked(P2.c1.lines[1], [T.v]);
    P2.c2.lines[1] = blanked(P2.c2.lines[1], [String(d.p)]);
  }
  const dec = (c) => (level === 1 ? { kind: 'note', html: `${c.prompt} ${c.options[0].label}.` } : decision(c.prompt, c.options));
  const up = d.sig > 0;
  const z = { v: T.vr, p: T.pr };
  P2.d1 = part(up ? t('(d) Pour a₁ < {v} : le maximum de f sur ]−∞ ; {v}[ vaut', z) : t('(d) Pour a₁ > {v} : le minimum de f sur ]{v} ; +∞[ vaut', z), up ? 'M =' : 'm =', up ? 'M' : 'm',
    { kind: 'value', expect: String(d.p) }, [E(String(d.p), t('f({p}) = {p}, extremum local et point fixe', z), 'disc', 'extremum')], [dec(C.div)]);
  P2.d2 = part(t('Si a₁ {rel} {p}, la limite de la suite :', { rel: up ? '<' : '>', p: T.pr }), 'lim aₙ =', 'lim(a_n,n,∞)',
    { kind: 'value', expect: String(d.p) }, [E(String(d.p), t('Monotone et bornée : la limite est le point fixe'), 'disc', 'limit')], [dec(C.near), dec(C.mid)]);
  P2.d3 = part(t('Conclusion : réunis les cas où la suite converge (x = a₁ ; a₁ = {p} donne une suite constante).', z), 'a₁ ∈', T.cases, SOL, [E(T.conv, t('Réunir les cas'), 'disc', 'merge')]);
  return { T, C, P: P2 };
}

function prompt(T, more = '') {
  return `${t('On étudie la suite définie par a₁ ∈ ℝ et {rec}, avec f(x) = {f} (a₁ ≠ {v}).', { rec: MN(T.rec), f: MN(T.f), v: T.vr })}${more}`;
}

function givenStudy(d, T) {
  const up = d.sig > 0;
  return ` ${t('On sait que : la seule limite possible est {p} ; f′(x) = {fp} ; f croît sur {inc} et décroît ailleurs (hors de {v}) ; {e1} local f({p}) = {p}, {e2} local f({c}) = {m} ; asymptotes x = {v} et {ao}.', {
    p: T.pr, fp: MN(T.fpFact), inc: RD(T.inc), v: T.vr, e1: up ? 'max' : 'min', e2: up ? 'min' : 'max', c: fr(T.c), m: fr(T.m), ao: RD(`y=x+${T.ao}`.replace('+-', '-')),
  })}`;
}

function hints(d, T) {
  const up = d.sig > 0;
  const z = { v: T.vr, p: T.pr };
  return H(t('Compare le graphe de f à la droite y = x : c\'est ce qui dit si la suite monte (f(aₙ) > aₙ) ou descend.'),
    up ? t('Sur ]−∞ ; {v}[, le maximum de f vaut ▢ : c\'est un point fixe.', z) : t('Sur ]{v} ; +∞[, le minimum de f vaut ▢ : c\'est un point fixe.', z),
    up ? t('f(x) ≤ {p} pour x < {v}, donc dès a₂ la suite reste sous {p}, et elle converge vers {p}.', z) : t('f(x) ≥ {p} pour x > {v}, donc dès a₂ la suite reste au-dessus de {p}, et elle converge vers {p}.', z));
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
  const z = { v: T.vr, p: T.pr };
  const more = level === 1 ? `${givenStudy(d, T)} ${t('(c) Compare le graphe de f à la droite y = x.')}`
    : level === 3 ? ` ${d.sig > 0 ? t('On sait que f a un maximum local en {p}, f({p}) = {p}, et que x = {v} est asymptote verticale. Trouve la limite possible, compare f à y = x, puis discute selon a₁.', z) : t('On sait que f a un minimum local en {p}, f({p}) = {p}, et que x = {v} est asymptote verticale. Trouve la limite possible, compare f à y = x, puis discute selon a₁.', z)}`
      : ` ${t('(a) Seule limite possible ; (b) étude de f ; (c) position par rapport à y = x ; (d) discussion selon a₁.')}`;
  return partsItem({
    skill: RS, level, prompt: prompt(T, more), parts: seq, choices: CHOICES, hints: hints(d, T), subgoals: SUB, keys: KEYS,
    key: `${RS}:${level}:${T.f}`, exam: false, fallback: d.fallback, expectedSec: { 1: 120, 2: 400, 3: 300, 4: 600 }[level],
  });
}

// ---------- level 5 and the open variant: the problem ----------

export const BAREME = [[1], [2, 0.5, 0.5, 1, 1, 0.5, 0.5, 1], [1, 1], [1], [1], [1]];

function caseMcq(d, T, c, which, rng, level) {
  return mcq({
    skill: RS, level, prompt: c.ask,
    options: c.options.map((o) => ({ html: o.label, correct: o.valid, ...(o.rule ? { rule: o.rule } : {}) })),
    key: `${RS}:case:${which}:${T.f}`, expectedSec: 120,
    solution: [{ html: c.options[0].label, note: '' }],
  }, rng);
}

function conclusionMcq(d, T, C, rng, level) {
  const up = d.sig > 0;
  const options = [
    { html: `${C.mid.options[0].label}. ${t('Avec a₁ = {p} (suite constante), la suite converge, vers {p}, si et seulement si a₁ {rel} {v}', { p: T.pr, rel: up ? '<' : '>', v: T.vr })}`, correct: true },
    { html: `${C.mid.options[1].label}. ${t('La suite converge si et seulement si a₁ {rel} {p}', { rel: up ? '≤' : '≥', p: T.pr })}`, correct: false },
    { html: `${C.mid.options[2].label}. ${t('La suite converge pour tout a₁ ≠ {v}', { v: T.vr })}`, correct: false, rule: 'a1_rec_limit_without_convergence' },
    { html: t('La suite converge seulement si a₁ = {p} (suite constante)', { p: T.pr }), correct: false },
  ];
  return mcq({
    skill: RS, level, prompt: t('(d) Si a₁ est entre {a} et {b}, que fait la suite ? Conclus : pour quels a₁ converge-t-elle ?', up ? { a: T.pr, b: T.vr } : { a: T.vr, b: T.pr }),
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
  const A = one(t('(a) Quelle est la seule limite possible de la suite ?'), ['A']);
  const B = one(t('(b) Étudie f : f′ et f″, monotonie et extrema, convexité, asymptotes.'), ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8']);
  const Cp = one(t('(c) Compare le graphe de f à la droite y = x.'), ['c1', 'c2']);
  return problemItem({
    skill: RS, level, prompt: prompt(T, ` ${t('Problème en 13 points : (a) seule limite possible, (b) étude de f, (c) position par rapport à y = x, (d) discussion selon a₁.')}`),
    parts: [
      { item: A, points: BAREME[0], title: t('(a) Seule limite possible') },
      { item: B, points: BAREME[1], title: t('(b) Étude de f') },
      { item: Cp, points: BAREME[2], title: t('(c) Position par rapport à y = x') },
      { item: caseMcq(d, T, C.div, 'div', rng, level), points: BAREME[3][0], title: t('(d) Premier cas') },
      { item: caseMcq(d, T, C.near, 'near', rng, level), points: BAREME[4][0], title: t('(d) Deuxième cas') },
      { item: conclusionMcq(d, T, C, rng, level), points: BAREME[5][0], title: t('(d) Dernier cas et conclusion') },
    ],
    key: `${level}:${T.f}`, exam: examOf(opts, 13), expectedSec: 900, fallback: d.fallback,
  });
}

export function studyItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'open' || level === 5) return studyProblem(opts.exam ? 4 : 5, rng, opts);
  return studyLines(level, rng, opts);
}

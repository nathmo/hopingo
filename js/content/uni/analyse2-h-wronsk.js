// a2-ode-wronskian (module A2, part h, step U6): y″ + p(t)y′ + q(t)y = 0,
// one solution y₁ known. Parts: y₁ checked (`equiv`, down to 0), p read
// after dividing by the coefficient of y″ (`equiv`), Abel's W = e^(−∫p)
// (`ode` with unknown W and final 'one': W is defined up to a factor),
// (y₂/y₁)′ = W/y₁² (`equiv`), then y₂ and the general solution (`ode` of
// order 2). Built from the pair (y₁, y₂) of the catalogue.

import { MT, linesItem, examTag, mcq } from './kit.js';
import { parse } from '../../cas/parse.js';
import { toMathML } from '../../cas/mathml.js';
import { partsScript, tpl, sup } from './a2-kit.js';
import { H, E, modeOf } from './analyse2-h-kit.js';
import { t } from '../../i18n.js';

const SK = 'a2-ode-wronskian';
const SUB = [
  { id: 'check', label: t('vérifier que y₁ est solution'), skill: 'a2-ode-structure' },
  { id: 'normalize', label: t('normaliser : lire p(t)'), skill: SK },
  { id: 'abel', label: t('formule d\'Abel'), skill: SK },
  { id: 'reduce', label: t('réduction d\'ordre : (y₂/y₁)′ = W/y₁²'), skill: SK },
  { id: 'final', label: t('solution générale'), skill: 'a2-ode-structure' },
];
const KEYS = ['calcx', 'calcfn', 'a2', 'anal'];

// eq (with its leading coefficient), lead, pRaw (coefficient of y′), p, W,
// the wrong W of the traps, W/y₁², y₂, the general solution, y₁ checked.
const PAIRS = [
  { y1: 'e^t', eq: "t y''+(1-2t)y'+(t-1)y=0", lead: 't', pRaw: '1-2t', p: '1/t-2', W: 'e^(2t)/t', Wsign: 't e^(-2t)', Wraw: 'e^(t^2-t)', red: '1/t', y2: 'e^t ln(t)', gen: '(C_1+C_2 ln(t))e^t', chk: ['t d(d(e^t))+(1-2t)d(e^t)+(t-1)e^t', 't e^t+(1-2t)e^t+(t-1)e^t'], dom: [0.2, 4], wrongGen: '(C_1+C_2 t)e^t', notSol: 'e^(-t)' },
  { y1: 't', eq: "t^2 y''-t y'+y=0", lead: 't^2', pRaw: '-t', p: '-1/t', W: 't', Wsign: '1/t', Wraw: 'e^(t^2/2)', red: '1/t', y2: 't ln(t)', gen: '(C_1+C_2 ln(t))t', chk: ['t^2 d(d(t))-t d(t)+t', 't^2×0-t×1+t'], dom: [0.2, 4], wrongGen: 'C_1 t+C_2 t^2', notSol: 't^2' },
  { y1: 't', eq: "t^2 y''-2t y'+2y=0", lead: 't^2', pRaw: '-2t', p: '-2/t', W: 't^2', Wsign: '1/t^2', Wraw: 'e^(t^2)', red: '1', y2: 't^2', gen: 'C_1 t+C_2 t^2', chk: ['t^2 d(d(t))-2t d(t)+2t', 't^2×0-2t×1+2t'], dom: [0.2, 4], wrongGen: 'C_1 t+C_2 t ln(t)', notSol: 't^3' },
  { y1: 'e^t', eq: "y''-2y'+y=0", lead: null, pRaw: '-2', p: '-2', W: 'e^(2t)', Wsign: 'e^(-2t)', Wraw: null, red: '1', y2: 't e^t', gen: '(C_1+C_2 t)e^t', chk: ['d(d(e^t))-2d(e^t)+e^t', 'e^t-2e^t+e^t'], dom: [-2, 2], wrongGen: 'C_1 e^t+C_2 e^(-t)', notSol: 'e^(-t)' },
  { y1: 't', eq: "t^2 y''+t y'-y=0", lead: 't^2', pRaw: 't', p: '1/t', W: '1/t', Wsign: 't', Wraw: 'e^(-t^2/2)', red: '1/t^3', y2: '-1/(2t)', gen: 'C_1 t+C_2/t', chk: ['t^2 d(d(t))+t d(t)-t', 't^2×0+t×1-t'], dom: [0.2, 4], wrongGen: 'C_1 t+C_2 t ln(t)', notSol: 't^2' },
  { y1: 't^2', eq: "t^2 y''-3t y'+4y=0", lead: 't^2', pRaw: '-3t', p: '-3/t', W: 't^3', Wsign: '1/t^3', Wraw: 'e^(3t^2/2)', red: '1/t', y2: 't^2 ln(t)', gen: '(C_1+C_2 ln(t))t^2', chk: ['t^2 d(d(t^2))-3t d(t^2)+4t^2', 't^2×2-3t×2t+4t^2'], dom: [0.2, 4], wrongGen: 'C_1 t^2+C_2 t^3', notSol: 't^3' },
  { y1: 't', eq: "(t-1)y''-t y'+y=0", lead: 't-1', pRaw: '-t', p: '-t/(t-1)', W: '(t-1)e^t', Wsign: 'e^(-t)/(t-1)', Wraw: 'e^(t^2/2)', red: '(t-1)e^t/t^2', y2: 'e^t', gen: 'C_1 t+C_2 e^t', chk: ['(t-1)d(d(t))-t d(t)+t', '(t-1)×0-t×1+t'], dom: [1.2, 4], wrongGen: 'C_1 t+C_2 t e^t', notSol: 't^2' },
  { y1: 'e^t', eq: "y''-3y'+2y=0", lead: null, pRaw: '-3', p: '-3', W: 'e^(3t)', Wsign: 'e^(-3t)', Wraw: null, red: 'e^t', y2: 'e^(2t)', gen: 'C_1 e^t+C_2 e^(2t)', chk: ['d(d(e^t))-3d(e^t)+2e^t', 'e^t-3e^t+2e^t'], dom: [-2, 2], wrongGen: 'C_1 e^t+C_2 e^(-2t)', notSol: 'e^(-t)' },
];
const TT = { vars: ['t'], dvar: 't' };
const M = (s) => MT(s, TT);
// An equation in y(t), shown with y′ and y″ (not d/dt).
const ME = (s) => toMathML(parse(s, { dvar: 't' }), { dvar: 't' });

const CHOICES = [
  { id: 'check', label: t('Vérifier que y₁ est solution') },
  { id: 'norm', label: t('Diviser par le coefficient de y″ : lire p') },
  { id: 'abel', label: t('Formule d\'Abel : W = e^(−∫p)') },
  { id: 'reduce', label: t('Réduction d\'ordre : (y₂/y₁)′ = W/y₁²') },
  { id: 'y2', label: t('Intégrer : y₂ = y₁·∫W/y₁²') },
  { id: 'gen', label: t('Solution générale y = C₁y₁ + C₂y₂') },
  { id: 'calc', label: t('Calculer') },
  { id: 'plus', label: 'Abel : W = e^(+∫p)', rule: 'a2_wronskian_abel_sign', why: t('W′ = −pW : la formule d\'Abel a un signe −.') },
];

function linesVariant(level, rng, opts) {
  const d = rng.pick(PAIRS);
  const dom = { t: d.dom };
  const eqv = (target, goal) => ({ kind: 'equiv', vars: ['t'], dvar: 't', domain: dom, target, ...(goal ? { goal } : {}) });
  const parts = [];
  const chkLines = [E(d.chk[1], t('Dériver y₁'), 'check', 'check'), E('0', t('Simplifier'), 'check', 'calc')];
  parts.push({ start: d.chk[0], judge: eqv('goal', '0'), lines: chkLines });
  if (level >= 2) {
    if (d.lead) parts.push({ html: t('Divise par {c} : p(t) est le coefficient de y′ dans y″ + p(t)y′ + q(t)y = 0.', { c: sup(d.lead) }), ask: 'p(t) =', start: `(${d.pRaw})/(${d.lead})`, judge: eqv('no-prime'), lines: [E(d.p, t('Simplifier'), 'normalize', 'norm')] });
    const abelDecision = {
      kind: 'decision', prompt: t('Comment trouver une deuxième solution y₂ ?'), options: [
        { id: 'abel', label: t('Formule d\'Abel, puis (y₂/y₁)′ = W/y₁²'), valid: true, ref: true },
        { id: 'u', label: t('Poser y = y₁·u et remplacer dans l\'équation'), valid: true, quality: 'poor', why: t('Juste aussi : on obtient une équation linéaire du 1er ordre en u′. Mais Abel donne W directement, c\'est plus court.') },
      ],
    };
    parts.push({
      html: t('Formule d\'Abel : W = e^(−∫p) (à une constante près).'), ask: 'W =', start: `W = e^(-int(${d.p},t))`,
      judge: { kind: 'ode', eq: `W'=-(${d.p})W`, unknown: 'W', v: 't', order: 1, final: 'one', domain: dom, traps: { a2_wronskian_abel_sign: [`W = ${d.Wsign}`], ...(d.Wraw ? { a2_ode_if_not_normalized: [{ line: `W = ${d.Wraw}`, ctx: { coef: sup(d.lead), a: sup(d.p) } }] } : {}) } },
      pre: level === 3 ? [abelDecision] : [], lines: [E(`W = ${d.W}`, 'W = e^(−∫p)', 'abel', 'abel')],
    });
  }
  parts.push({ html: t('Réduction d\'ordre : (y₂/y₁)′ = W/y₁².'), ask: '(y₂/y₁)′ =', start: `(${d.W})/(${d.y1})^2`, judge: eqv('no-prime'), lines: [E(d.red, t('Simplifier'), 'reduce', 'reduce')] });
  const yLines = [E(`y_2 = ${d.y2}`, t('y₂ = y₁·∫ W/y₁² (sans constante)'), 'final', 'y2'), E(`y = ${d.gen}`, 'y = C₁y₁ + C₂y₂', 'final', 'gen')];
  if (level <= 2) yLines[0] = { ...yLines[0], ...tpl(yLines[0].math, [d.y2], { dvar: 't' }) };
  parts.push({ html: t('Une deuxième solution, puis la solution générale.'), ask: 'y =', start: d.eq, judge: { kind: 'ode', eq: d.eq, unknown: 'y', v: 't', order: 2, domain: dom }, lines: yLines });
  const { start, judge, script } = partsScript(parts, level, CHOICES);
  return linesItem({
    skill: SK, level, mode: modeOf(level), start, judge, script,
    prompt: t('On considère {eq}{dom}. Vérifie que y₁ = {y1} est une solution, puis trouve une deuxième solution y₂ et la solution générale.', { eq: ME(d.eq), dom: d.dom[0] > 0 ? ` (t > ${d.dom[0] >= 1 ? '1' : '0'})` : '', y1: M(d.y1) })
      + (level === 1 ? ` ${t('Le wronskien (formule d\'Abel) vaut W = {W}.', { W: M(d.W) })}` : ''),
    hints: H(t('Divise par le coefficient de y″ pour lire p, puis W = e^(−∫p) et (y₂/y₁)′ = W/y₁².'),
      `p = ${sup(d.p)}, W = ${M(d.W)} ; (y₂/y₁)′ = W/y₁² = ${M(`(${d.W})/(${d.y1})^2`)}.`,
      t('(y₂/y₁)′ = {red}, donc y₂ = {y2}.', { red: M(d.red), y2: M(d.y2) })),
    subgoals: SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${d.eq}`, exam: examTag(opts),
  });
}

// ---------- QCM 13: « A : y₁ est solution. B : la solution générale est … » ----------

function mcqVariant(level, rng, opts) {
  const d = rng.pick(PAIRS);
  const A = rng.chance(0.7);
  const B = rng.chance(0.6);
  const y1 = A ? d.y1 : d.notSol;
  const gen = B ? d.gen : d.wrongGen;
  const opt = (a, b) => ({ html: a ? (b ? t('A vraie, B vraie') : t('A vraie, B fausse')) : (b ? t('A fausse, B vraie') : t('A fausse, B fausse')), correct: a === A && b === B });
  return mcq({
    skill: SK, level, key: `${SK}:mcq:${d.eq}:${A}:${B}`, exam: examTag(opts), keepOrder: true,
    prompt: t('On considère {eq}{dom}.<br>A : {y1} est une solution.<br>B : la solution générale est y = {gen}.', { eq: ME(d.eq), dom: d.dom[0] > 0 ? ` (t > ${d.dom[0] >= 1 ? '1' : '0'})` : '', y1: M(y1), gen: M(gen) }),
    options: [opt(true, true), opt(true, false), opt(false, true), opt(false, false)],
    solution: [{ html: t('{y1} est une solution ; p = {p}, W = {W}, (y₂/y₁)′ = {red}, y₂ = {y2} : y = {gen}.', { y1: M(d.y1), p: sup(d.p), W: M(d.W), red: M(d.red), y2: M(d.y2), gen: M(d.gen) }), note: '' }],
    expectedSec: 180,
  }, rng);
}

// ---------- V/F (no counter-example checker fits: 2-option multiple choice) ----------

const VF = [
  { key: 'zero', truth: true, text: t('Si y₁ et y₂ sont des solutions de y″ + p(t)y′ + q(t)y = 0 (p, q continues sur I) et W(y₁, y₂)(t₀) = 0 en un point t₀ de I, alors W ≡ 0 sur I.'), why: t('Vrai : par Abel, W(t) = W(t₀)·e^(−∫p) = 0.') },
  { key: 'sign', truth: false, text: t('Pour y″ + p(t)y′ + q(t)y = 0, W(t) = W(t₀)·e^(+∫ de t₀ à t de p).'), ruleIfTrue: 'a2_wronskian_abel_sign', why: t('Faux : W′ = −pW, donc W(t) = W(t₀)·e^(−∫p).') },
  { key: 'abs', truth: false, text: t('t² et t|t| ont un wronskien nul sur ℝ, donc elles sont linéairement dépendantes sur [−1 ; 1].'), why: t('Faux : W = 0, mais t|t| = t² sur [0 ; 1] et −t² sur [−1 ; 0] : aucune constante c ne donne t|t| = c·t² sur tout [−1 ; 1]. W ≡ 0 ne prouve la dépendance que pour deux solutions d\'une même équation.') },
  { key: 'norm', truth: false, text: t('Pour t·y″ + y′ + y = 0 (t > 0), la formule d\'Abel donne W = W₀·e^(−∫ 1 dt) = W₀e^(−t).'), ruleIfTrue: 'a2_ode_if_not_normalized', why: t('Faux : il faut diviser par t, p(t) = 1/t, donc W = W₀·e^(−ln t) = W₀/t.') },
  { key: 'indep', truth: true, text: t('Deux solutions de y″ + p(t)y′ + q(t)y = 0 dont le wronskien ne s\'annule pas forment une base de l\'espace des solutions.'), why: t('Vrai : elles sont indépendantes, et l\'espace est de dimension 2.') },
];
function vfMcq(level, rng, opts) {
  const s = rng.pick(VF);
  return mcq({
    skill: SK, level, prompt: t('Vrai ou faux ?<br>« {statement} »', { statement: s.text }), keepOrder: true,
    options: [{ html: t('Vrai'), correct: s.truth, rule: s.truth ? null : s.ruleIfTrue || null }, { html: t('Faux'), correct: !s.truth, rule: null }],
    key: `${SK}:tf:${s.key}`, solution: [{ html: s.why, note: '' }], expectedSec: 60, exam: opts?.exam ? { format: 'tf', points: 1 } : false,
  }, rng);
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'tf') return vfMcq(4, rng, opts);
    if (opts.exam === 'mcq') return mcqVariant(4, rng, opts);
    if (level === 5 && rng.chance(0.5)) return mcqVariant(5, rng, opts);
    if (level === 4 && rng.chance(0.3)) return vfMcq(4, rng, {});
    return linesVariant(level, rng, opts);
  },
};

// Generators of module G6, part a (unit `analyse0`, step U2), spec §8.3.
// Catalogue: docs/universite/G-gymnase-2.md, G6. Skills:
// js/content/uni/analyse0-a.skills.js. This file: g6-deriv-usual,
// g6-tangent, g6-limits; analyse0-a-study.js: g6-sign-variation,
// g6-convexity, g6-optim. Helpers: analyse0-a-kit.js.
//
// Levels: 1–2 guided (lines with boxes, decisions), 3 choose the action
// then write the line (a menu per reference line, `tapActions: 'steps'`),
// 4 free lines with hints, 5 alone. Derivatives are judged by `equiv`
// (target no-prime), values by `value`, limits by `limit`. A tangent is a
// part « y = » judged by `equiv` with the letter y standing for the right
// line (cfg.subst): any writing of that line is right, the final one is
// y = mx + p expanded. Every generator starts from the answer (§8.4).
// opts.exam = 'mcq' | 'tf' | 'coef' | 'open' gives the exam variants.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { exactValue } from '../../cas/normal.js';
import { equivalent } from '../../cas/equiv.js';
import { trapAnswers } from '../../judges/diagnose.js';
import { templateOf } from '../../judges/lines.js';
import { MT, linesItem, mcq, tfItem, answerItem } from './kit.js';
import {
  V, q, N, nz, modeOf, H, E, NOTE, examOf, fr, blanked, partsItem, stepMenus, fromRoots, polyText, dPoly, evalPoly, joinSum, at, valueAt, lin,
  pre, over, tangentText, tangentFinal, tangentCfg,
} from './analyse0-a-kit.js';
import { GEN as STUDY } from './analyse0-a-study.js';
import { t } from '../../i18n.js';

// {name} filled in French: a key built from a statement stays French.
const frFill = (s, v) => s.replace(/\{(\w+)\}/g, (m, k) => (k in v ? String(v[k]) : m));

const KEYS = ['calcx', 'calcfn'];
const LKEYS = ['calcx', 'calcfn', 'anal'];
const tmpl = (line) => MT(line.blanks?.length ? templateOf(line) : line.math);

// ======================================================================
// g6-deriv-usual
// ======================================================================

const DU = 'g6-deriv-usual';
const DU_SUB = [
  { id: 'powers', label: t('réécrire en puissances'), skill: 'g2-real-powers' },
  { id: 'table', label: t('table des dérivées'), skill: DU },
  { id: 'value', label: t('évaluer f′(a)'), skill: DU },
];

// x^m written c·x^m for a whole or fractional m (power form).
function powForm(k, m) {
  const M = Q.of(m);
  if (M.n === 0) return N(k);
  if (M.d === 1 && M.n > 0) return `${pre(k)}${M.n === 1 ? 'x' : `x^${M.n}`}`;
  return `${pre(k)}x^(${N(M)})`;
}
// c·x^m written nicely: 3x^2, -5/x^2, 3/√x, (3/2)√x, -1/(x√x).
function niceForm(k, m) {
  const M = Q.of(m);
  if (M.d === 1 && M.n >= 0) return powForm(k, M);
  if (M.d === 1) return over(k, M.n === -1 ? 'x' : `x^${-M.n}`);
  if (M.eq(q(1, 2))) return `${pre(k)}√x`;
  if (M.eq(q(3, 2))) return `${pre(k)}x√x`;
  if (M.eq(q(-1, 2))) return over(k, '√x');
  if (M.eq(q(-3, 2))) return over(k, '(x√x)');
  return powForm(k, M);
}

// The table: g with its power form, its writing in the statement and its
// derivative. n: the exponent for powers. kind: the table entry.
const POWERS = [2, 3, 4, 5, -1, -2, -3, q(1, 2), q(-1, 2), q(3, 2)];
const FUNCS = ['exp', 'two', 'ln', 'sin', 'cos', 'tan', 'arctan', 'sinh', 'cosh'];
const ENTRY = {
  pow: '(xⁿ)′ = nxⁿ⁻¹', exp: '(eˣ)′ = eˣ', two: '(aˣ)′ = aˣ·ln a', ln: '(ln x)′ = 1/x', sin: '(sin x)′ = cos x', cos: '(cos x)′ = −sin x',
  tan: '(tan x)′ = 1/cos² x', arctan: '(arctan x)′ = 1/(1 + x²)', sinh: '(sinh x)′ = cosh x', cosh: '(cosh x)′ = sinh x',
};
const WRONG_ENTRY = {
  two: { label: '(2ˣ)′ = x·2ˣ⁻¹', rule: 'g6_power_rule_exp' }, exp: { label: '(eˣ)′ = x·eˣ⁻¹', rule: 'g6_power_rule_exp' },
  cos: { label: '(cos x)′ = sin x', rule: 'g6_cos_sign' }, sin: { label: '(sin x)′ = −cos x', rule: 'g6_cos_sign' },
};

// A term c·g: {kind, n?, c, show, form (inside d()), d (nice derivative),
// dPow (derivative in power form), rewrite}
function term(kind, c, n) {
  const C = Q.of(c);
  if (kind === 'pow') {
    const Nn = Q.of(n);
    const k = C.mul(Nn);
    const m = Nn.sub(1);
    const show = niceForm(C, Nn);
    const form = Nn.d === 1 && Nn.n > 0 ? `x^${Nn.n}` : `x^(${N(Nn)})`;
    return { kind, n: Nn, c: C, show, form, d: niceForm(k, m), dPow: powForm(k, m), rewrite: show !== powForm(C, Nn) };
  }
  const p = pre(C);
  const fx = { exp: 'e^x', two: '2^x', ln: 'ln(x)', sin: 'sin(x)', cos: 'cos(x)', tan: 'tan(x)', arctan: 'arctan(x)', sinh: 'sinh(x)', cosh: 'cosh(x)' }[kind];
  const show = kind === 'two' ? (C.eq(1) ? '2^x' : C.eq(-1) ? '-2^x' : `${N(C)}×2^x`) : `${p}${fx}`;
  const d = {
    exp: `${p}e^x`, two: C.eq(1) ? '2^x×ln(2)' : C.eq(-1) ? '-2^x×ln(2)' : `${N(C)}×2^x×ln(2)`, ln: over(C, 'x'),
    sin: `${p}cos(x)`, cos: `${pre(C.neg())}sin(x)`, tan: over(C, 'cos(x)^2'), arctan: over(C, '(1+x^2)'),
    sinh: `${p}cosh(x)`, cosh: `${p}sinh(x)`,
  }[kind];
  return { kind, c: C, show, form: fx, d, dPow: d, rewrite: false };
}
// c·d(form): 3d(x^4), -d(e^x).
const dTerm = (tm) => `${pre(tm.c)}d(${tm.form})`;
const sumOf = (xs) => joinSum(xs);

function duTerms(rng, tpl) {
  const n = tpl === 'poly' ? rng.int(2, 4) : rng.int(2, 3);
  const out = [];
  const used = new Set();
  for (let guard = 0; out.length < n && guard < 50; guard++) {
    const kind = tpl === 'poly' || (tpl === 'mix' && out.length === n - 1 && rng.chance(0.5)) ? 'pow' : rng.pick(FUNCS);
    const nn = kind === 'pow' ? rng.pick(POWERS) : null;
    const id = kind === 'pow' ? `pow${N(nn)}` : kind;
    if (used.has(id)) continue;
    // Half powers: an even coefficient keeps the derivative whole.
    let c = nz(rng, -6, 6);
    if (nn && Q.of(nn).d === 2 && c % 2) c *= 2;
    if (Math.abs(c) > 8) continue;
    used.add(id);
    out.push(term(kind, c, nn));
  }
  // Highest powers first, as written in a course.
  return out.sort((a, b) => (b.n ? b.n.valueOf() : -10) - (a.n ? a.n.valueOf() : -10));
}

function duDraw(rng, tpl) {
  for (let i = 0; i < 200; i++) {
    const ts = duTerms(rng, tpl);
    if (ts.length < 2) continue;
    if (tpl === 'poly' && !ts.some((tm) => tm.rewrite)) continue;
    if (tpl === 'mix' && ts.every((tm) => tm.kind === 'pow')) continue;
    return { ts };
  }
  return { ts: [term('pow', 3, 4), term('pow', -2, q(1, 2)), term('pow', 5, -1)], fallback: true };
}

const duJudge = (ts) => ({ kind: 'equiv', vars: [V], dvar: V, target: 'no-prime', domain: { x: ts.some((tm) => tm.kind === 'tan') ? [0.2, 1.4] : [0.2, 3] } });

// The rewrite in powers, for the note of level 1: √x = x^(1/2), 5/x = 5x⁻¹.
const rewriteNote = (ts) => ts.filter((tm) => tm.rewrite).map((tm) => `${MT(tm.show)} = ${MT(powForm(tm.c, tm.n))}`).join(', ');

const DU_CHOICES = (ts) => [
  { id: 'split', label: t('Séparer les termes et sortir les constantes (racines et fractions écrites en puissances)') },
  { id: 'table', label: t('Dériver chaque terme avec la table') },
  { id: 'product', label: t('Règle du produit'), why: t('Il n\'y a pas de produit de deux fonctions de x : seulement des constantes devant les termes.') },
  ...(ts.some((tm) => tm.kind === 'two') ? [{ id: 'powexp', label: '(2ˣ)′ = x·2ˣ⁻¹', rule: 'g6_power_rule_exp', why: t('L\'exposant n\'est pas constant : (aˣ)′ = aˣ·ln a.') }] : []),
  { id: 'simplify', label: t('Simplifier'), why: t('Il reste des dérivées à calculer.') },
];

function duItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return duMcq(rng);
  if (opts.exam === 'tf') return duTf(rng);
  if (level === 5) return duSeries(rng);
  const tpl = level === 1 ? 'poly' : rng.pick(['poly', 'mix', 'mix']);
  const { ts, fallback } = duDraw(rng, tpl);
  const f = sumOf(ts.map((tm) => tm.show));
  const start = `d(${f})`;
  const judge = duJudge(ts);
  const lineSplit = E(sumOf(ts.map(dTerm)), ts.some((tm) => tm.rewrite) ? t('Linéarité, réécrire en puissances') : t('Linéarité : les constantes sortent'), 'powers', 'split');
  const final = sumOf(ts.map((tm) => tm.d));
  const lineD = E(final, t('Table des dérivées'), 'table', 'table');
  let script;
  if (level === 1) {
    const finalPow = sumOf(ts.map((tm) => tm.dPow));
    const exps = ts.filter((tm) => tm.kind === 'pow').map((tm) => (tm.n.sub(1).d === 1 && tm.n.sub(1).n > 0 ? String(tm.n.sub(1).n) : N(tm.n.sub(1))));
    script = [
      NOTE(t('En puissances : {r}.', { r: rewriteNote(ts) })),
      blanked(lineSplit, ts.filter((tm) => tm.rewrite).map((tm) => N(tm.n))),
      blanked(E(finalPow, t('Table : (xⁿ)′ = nxⁿ⁻¹'), 'table'), exps),
    ];
  } else if (level === 2) {
    // One term at a time; a decision on the table entry of a term.
    const pick = ts.find((tm) => WRONG_ENTRY[tm.kind]) ?? ts[0];
    const lines = ts.map((_, k) => E(sumOf(ts.map((s, j) => (j <= k ? s.d : dTerm(s)))), k === 0 ? t('Table, premier terme') : t('Terme suivant'), 'table'));
    const others = Object.keys(ENTRY).filter((x) => x !== pick.kind && !WRONG_ENTRY[pick.kind]?.label.includes(x));
    const wrong = WRONG_ENTRY[pick.kind] ? { id: 'trap', label: WRONG_ENTRY[pick.kind].label, valid: false, rule: WRONG_ENTRY[pick.kind].rule, why: t('Non : {e}.', { e: ENTRY[pick.kind] }) }
      : { id: 'other', label: ENTRY[rng.pick(others)], valid: false, why: t('Non : {e}.', { e: ENTRY[pick.kind] }) };
    const decision = {
      kind: 'decision', prompt: t('Quelle règle pour dériver {f} ?', { f: MT(pick.show) }),
      options: rng.shuffle([{ id: 'right', label: ENTRY[pick.kind], valid: true }, wrong, { id: 'pow', label: pick.kind === 'pow' ? '(xⁿ)′ = xⁿ⁻¹' : ENTRY.pow, valid: false, why: t('Non : {e}.', { e: ENTRY[pick.kind] }) }]),
    };
    const k = ts.indexOf(pick);
    script = [blanked(lineSplit, ts.filter((tm) => tm.rewrite).map((tm) => tm.form)), ...lines.flatMap((l, j) => [
      ...(j === k ? [decision] : []), blanked(l, [ts[j].d]),
    ])];
  } else {
    script = [lineSplit, lineD];
  }
  // Template 3 (level 4): f′(a) at a point where the value is exact.
  let prompt = rng.pick([t('Dérive f(x) = {f}.', { f: MT(f) }), t('Calcule f′(x) pour f(x) = {f}, à l\'aide de la table.', { f: MT(f) })]);
  if (level === 4 && rng.chance(0.4)) {
    const nice = (v) => v && Math.abs(v.n) <= 300 && v.d <= 16;
    const a = rng.shuffle([4, 1, 1, 0]).find((x) => ts.every((tm) => (tm.kind === 'two' ? false : tm.kind === 'pow' || tm.kind === 'ln' ? x > 0 : true)) && nice(valueAt(final, x)));
    if (a !== undefined) {
      script.push({ kind: 'segment', html: t('Calcule f′({a}).', { a }), ask: `f′(${a}) =`, start: { math: at(final, a) }, judge: { kind: 'value', form: 'irreducible' } },
        E(N(valueAt(final, a)), `f′(${a})`, 'value'));
      prompt = t('Soit f(x) = {f}. Dérive f, puis calcule {label}.', { f: MT(f), label: `f′(${a})` });
    }
  }
  return linesItem({
    skill: DU, level, prompt, start, judge: level === 3 ? { ...judge, menus: stepMenus(start, [lineSplit, lineD], DU_CHOICES(ts)) } : judge,
    mode: modeOf(level), script,
    hints: H(ts.some((tm) => tm.rewrite) ? t('Écris chaque terme comme une puissance de x, puis utilise (xⁿ)′ = nxⁿ⁻¹.') : t('Dérive terme par terme avec la table ; les constantes restent devant.'),
      `= ${tmpl(blanked(lineD, [ts[ts.length - 1].d]))}`, `= ${MT(final)}`),
    subgoals: DU_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${DU}:${level}:${f}`, exam: examOf(opts), fallback,
  });
}

// Level 5: a fast series of derivatives, one function per part, no help.
function duSeries(rng) {
  const kinds = rng.shuffle(['pow', 'pow', ...FUNCS]).slice(0, 6);
  const used = new Set();
  const fs = [];
  for (const kind of kinds) {
    let tm;
    for (let g = 0; g < 20; g++) {
      const nn = kind === 'pow' ? rng.pick(POWERS) : null;
      let c = nz(rng, -5, 5);
      if (nn && Q.of(nn).d === 2 && c % 2) c *= 2;
      tm = term(kind, c, nn);
      if (!used.has(tm.form)) break;
    }
    used.add(tm.form);
    // Half the functions get a second term (a power) to keep linearity in play.
    const two = rng.chance(0.4) && kind !== 'pow' ? [tm, term('pow', nz(rng, -4, 4), rng.pick([2, 3]))] : [tm];
    fs.push(two);
  }
  const parts = fs.map((ts, i) => ({
    html: `f${'₁₂₃₄₅₆'[i]}(x) = ${MT(sumOf(ts.map((tm) => tm.show)))}`, ask: `f${'₁₂₃₄₅₆'[i]}′(x) =`,
    start: `d(${sumOf(ts.map((tm) => tm.show))})`, judge: duJudge(ts),
    lines: [E(sumOf(ts.map((tm) => tm.d)), t('Table'), 'table')],
  }));
  return partsItem({
    skill: DU, level: 5, prompt: t('Série rapide, sans aide : dérive les six fonctions.'), parts, hints: [], subgoals: DU_SUB, keys: KEYS,
    key: `${DU}:5:${parts.map((p) => p.start).join('|')}`, exam: false, expectedSec: 150,
  });
}

function duMcq(rng) {
  let ts;
  let fallback = false;
  for (let i = 0; i < 200 && !ts; i++) {
    const c1 = nz(rng, -5, 5);
    const c2 = nz(rng, -5, 5);
    const nn = rng.pick([2, 3, 4, -1, -2]);
    const cand = [term('pow', nz(rng, -4, 6), nn), term(rng.pick(['two', 'exp']), c1), term(rng.pick(['cos', 'sin']), c2)];
    if (cand[1].kind === 'exp' && rng.chance(0.5)) continue;
    ts = cand;
  }
  if (!ts) { ts = [term('pow', 3, 2), term('two', 1), term('cos', 2)]; fallback = true; }
  const f = sumOf(ts.map((tm) => tm.show));
  const start = parse(`d(${f})`);
  const judge = duJudge(ts);
  const right = sumOf(ts.map((tm) => tm.d));
  const wrongExp = ts.map((tm) => (tm.kind === 'two' ? `${pre(tm.c)}x×2^(x-1)` : tm.kind === 'exp' ? `${pre(tm.c)}x×e^(x-1)` : tm.d));
  const wrongTrig = ts.map((tm) => (tm.kind === 'cos' ? `${pre(tm.c)}sin(x)` : tm.kind === 'sin' ? `${pre(tm.c.neg())}cos(x)` : tm.d));
  const both = ts.map((tm, i) => (tm.kind === 'cos' || tm.kind === 'sin' ? wrongTrig[i] : wrongExp[i]));
  const options = [
    { html: MT(right), correct: true },
    { html: MT(sumOf(wrongExp)), correct: false, rule: 'g6_power_rule_exp' },
    { html: MT(sumOf(wrongTrig)), correct: false, rule: 'g6_cos_sign' },
    { html: MT(sumOf(both)), correct: false, rule: 'g6_power_rule_exp' },
  ];
  const sol = [{ html: `${MT(`d(${f})`)} = ${MT(right)}`, note: ts.map((tm) => ENTRY[tm.kind]).join(' ; ') }];
  void start; void judge;
  return { ...mcq({ skill: DU, level: 4, prompt: t('Quelle est la dérivée de f(x) = {f} ?', { f: MT(f) }), options, key: `${DU}:mcq:${f}`, solution: sol, exam: { format: 'mcq', points: 1 } }, rng), fallback };
}

// True or false on one entry of the table (a false one has a counter-example x).
function duTf(rng) {
  const c = rng.int(2, 5);
  const bank = [
    { s: 'Pour tout x : (2ˣ)′ = x·2ˣ⁻¹.', truth: false, pred: '2^x×ln(2)=x×2^(x-1)', x: '0', rule: 'g6_power_rule_exp', why: t('Faux : (2ˣ)′ = 2ˣ·ln 2. En x = 0, la vraie dérivée vaut ln 2 ≠ 0, mais x·2ˣ⁻¹ vaut 0.') },
    { s: 'Pour tout x : (eˣ)′ = x·eˣ⁻¹.', truth: false, pred: 'e^x=x×e^(x-1)', x: '0', rule: 'g6_power_rule_exp', why: t('Faux : (eˣ)′ = eˣ. En x = 0, eˣ vaut 1, mais x·eˣ⁻¹ vaut 0.') },
    { s: `Pour tout x : (${c} cos x)′ = ${c} sin x.`, st: t('Pour tout x : ({c} cos x)′ = {c} sin x.', { c }), truth: false, pred: `-${c}sin(x)=${c}sin(x)`, x: '1', rule: 'g6_cos_sign', why: t('Faux : (cos x)′ = −sin x. En x = 1, −{c} sin 1 ≠ {c} sin 1.', { c }) },
    { s: 'Pour tout x : (sin x)′ = −cos x.', truth: false, pred: 'cos(x)=-cos(x)', x: '0', rule: 'g6_cos_sign', why: t('Faux : (sin x)′ = cos x. En x = 0 : 1 ≠ −1.') },
    { s: 'Pour tout x > 0 : (1/x)′ = 1/x².', truth: false, pred: '-1/x^2=1/x^2', x: '1', dom: 'R+', why: t('Faux : 1/x = x⁻¹, donc (1/x)′ = −x⁻² = −1/x². En x = 1 : −1 ≠ 1.') },
    { s: 'Pour tout x > 0 : (√x)′ = 1/(2√x).', truth: true, why: t('Vrai : √x = x^(1/2), et (1/2)·x^(−1/2) = 1/(2√x).') },
    { s: 'Pour tout x > 0 : (ln x)′ = 1/x.', truth: true, why: t('Vrai : c\'est une ligne de la table.') },
    { s: 'Pour tout x : (arctan x)′ = 1/(1 + x²).', truth: true, why: t('Vrai : c\'est une ligne de la table.') },
    { s: 'Pour tout x : (cosh x)′ = sinh x.', truth: true, why: t('Vrai : cosh x = (eˣ + e⁻ˣ)/2 se dérive en (eˣ − e⁻ˣ)/2 = sinh x, sans signe moins.') },
  ];
  const b = rng.pick(bank);
  const dom = b.dom || 'R';
  return tfItem({
    skill: DU, level: 4, statement: b.st ?? t(b.s), truth: b.truth,
    counter: b.truth ? null : { kind: 'refute', quants: [{ q: '∀', v: 'x', dom }], pred: b.pred, ask: [{ v: 'x', label: 'x =' }], answer: { x: b.x } },
    ruleIfTrue: b.truth ? null : b.rule || null, key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 },
  });
}

// ======================================================================
// g6-tangent
// ======================================================================

const TG = 'g6-tangent';
const TG_SUB = [
  { id: 'deriv', label: t('dériver'), skill: 'g6-deriv-rules' },
  { id: 'value', label: t('valeur et pente en a'), skill: TG },
  { id: 'line', label: t('écrire la droite'), skill: 'g4-line2' },
  { id: 'approx', label: t('approximation linéaire'), skill: TG },
];
const VAL = { kind: 'value', form: 'irreducible' };
const YV = { vars: [V, 'y'] };
const dec = (x) => { const X = Q.of(x); return X.toDecimal() ?? N(X); };

// A function with a point a where f(a) and f′(a) are nice:
// {f, df, a, fa, dfa, dom, family}.
function tgFunction(rng, family) {
  if (family === 'cubic') {
    for (let i = 0; i < 200; i++) {
      const cs = [rng.pick([1, 1, -1, 2]), rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)];
      const a = rng.pick([-2, -1, 1, 2, 3]);
      const d = dPoly(cs);
      const fa = evalPoly(cs, a);
      const dfa = evalPoly(d, a);
      if (dfa.n === 0 || fa.n === 0 || Math.abs(fa.n) > 30 || Math.abs(dfa.n) > 30 || fa.sub(dfa.mul(a)).n === 0) continue;
      return { f: polyText(cs), df: polyText(d), a, fa, dfa, dom: [-3, 3], family };
    }
    return { f: 'x^3-2x+1', df: '3x^2-2', a: 2, fa: q(5), dfa: q(10), dom: [-3, 3], family, fallback: true };
  }
  if (family === 'exp') {
    const k = rng.pick([2, 3, -1, -2]);
    const e = `e^(${pre(k)}x${k > 0 ? '-' : '+'}${Math.abs(k)})`;
    return { f: e, df: `${pre(k)}${e}`, a: 1, fa: q(1), dfa: q(k), dom: [-2, 3], family };
  }
  if (family === 'ln') {
    for (;;) {
      const k = nz(rng, -3, 3);
      const m = nz(rng, -3, 3);
      if (k + m === 0) continue;
      return { f: joinSum([`${pre(k)}ln(x)`, `${pre(m)}x`]), df: joinSum([over(k, 'x'), N(m)]), a: 1, fa: q(m), dfa: q(k + m), dom: [0.2, 3], family };
    }
  }
  // √(x + c) at a = m² − c.
  for (;;) {
    const m = rng.pick([1, 2, 2, 3]);
    const c = rng.int(-3, 5);
    const a = m * m - c;
    if (a === 0 || Math.abs(a) > 9) continue;
    const u = c === 0 ? 'x' : lin(-c);
    return { f: `√(${u})`, df: `1/(2√(${u}))`, a, fa: q(m), dfa: q(1, 2 * m), dom: [-c + 0.2, -c + 6], family: 'sqrt' };
  }
}

const derivCfg = (dom) => ({ kind: 'equiv', vars: [V], dvar: V, target: 'no-prime', domain: { x: dom } });

const TG_CHOICES = [
  { id: 'deriv', label: t('Dériver f') },
  { id: 'fa', label: t('Calculer f(a)') },
  { id: 'dfa', label: t('Calculer la pente f′(a)') },
  { id: 'solve', label: t('Résoudre f′(x) = m') },
  { id: 'line', label: t('Écrire y = f(a) + f′(a)(x − a)') },
  { id: 'slopefn', label: t('Écrire y = f(a) + f′(x)(x − a)'), rule: 'g6_tangent_slope_function', why: t('La pente d\'une droite est un nombre : f′(a), pas f′(x).') },
  { id: 'expand', label: t('Développer : y = mx + p') },
  { id: 'approx', label: 'f(a + h) ≈ f(a) + f′(a)·h' },
  { id: 'compute', label: t('Calculer') },
];

// The parts of « tangent at a »: f′(x), f(a), f′(a), y = …
function tgParts(d, { given = false } = {}) {
  const A = fr(N(d.a));
  const formula = tangentText(d.fa, d.dfa, d.a);
  const final = tangentFinal(d.fa, d.dfa, d.a);
  return [
    ...(given ? [] : [{ html: t('Dérive f.'), ask: 'f′(x) =', start: `d(${d.f})`, judge: derivCfg(d.dom), lines: [E(d.df, t('Dériver'), 'deriv', 'deriv')] }]),
    { html: t('Valeur en a = {a} :', { a: A }), ask: `f(${A}) =`, start: at(d.f, d.a), judge: VAL, lines: [E(N(d.fa), t('Remplacer x par a'), 'value', 'fa')] },
    { html: t('Pente de la tangente :'), ask: `f′(${A}) =`, start: at(d.df, d.a), judge: VAL, lines: [E(N(d.dfa), t('Pente en a'), 'value', 'dfa')] },
    { html: t('Tangente :'), ask: 'y =', start: 'y', judge: tangentCfg(d), lines: [E(formula, 'y = f(a) + f′(a)(x − a)', 'line', 'line'), E(final, t('Développer'), 'line', 'expand')] },
  ];
}

function tgItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return tgMcq(rng);
  if (opts.exam === 'coef') return tgCoef(rng);
  if (level === 5) return tgLevel5(rng, opts);
  const gab = opts.exam === 'open' ? rng.pick(['tangent', 'parallel']) : level <= 2 ? 'tangent' : rng.pick(['tangent', 'tangent', 'parallel', 'approx']);
  if (gab === 'parallel') return tgParallel(level, rng, opts);
  if (gab === 'approx') return tgApprox(level, rng, opts);
  const d = tgFunction(rng, rng.pick(['cubic', 'cubic', 'exp', 'ln', 'sqrt']));
  const parts = tgParts(d, { given: level === 1 });
  const A = fr(N(d.a));
  const p = d.fa.sub(d.dfa.mul(d.a));
  if (level <= 2) {
    const tp = parts[parts.length - 1];
    tp.lines = [blanked(tp.lines[0], [N(d.fa), N(d.dfa)], YV), blanked(tp.lines[1], [N(p)], YV)];
  }
  return partsItem({
    skill: TG, level, parts, choices: TG_CHOICES,
    before: level === 1 ? [NOTE(t('On donne f′(x) = {df}.', { df: MT(d.df) }))] : [],
    prompt: rng.pick([
      t('Équation de la tangente au graphe de f(x) = {f} en a = {a}.', { f: MT(d.f), a: A }),
      t('Soit f(x) = {f}. Donne la tangente à son graphe au point d\'abscisse {a}, sous la forme y = mx + p.', { f: MT(d.f), a: A }),
    ]),
    hints: H(t('y = f(a) + f′(a)(x − a) : calcule f(a) et f′(a) <b>en a</b>, puis écris la droite.'), `y = ${tmpl(blanked(E(tangentText(d.fa, d.dfa, d.a)), [N(d.dfa)], YV))}`, `y = ${MT(tangentFinal(d.fa, d.dfa, d.a), YV)}`),
    subgoals: TG_SUB, keys: KEYS, key: `${TG}:${level}:${d.f}:${d.a}`, exam: examOf(opts, 3), fallback: d.fallback,
    answerHtml: `y = ${MT(tangentFinal(d.fa, d.dfa, d.a), YV)}`, expectedSec: 150,
  });
}

// Gabarit 2: the tangent parallel to y = mx + p0.
function tgParallel(level, rng, opts) {
  let d;
  for (let i = 0; i < 200 && !d; i++) {
    const a = nz(rng, -3, 3);
    const b = rng.int(-4, 4);
    const c = rng.int(-4, 4);
    const m = 2 * a + b;
    const cs = [1, b, c];
    const fa = evalPoly(cs, a);
    if (m === 0 || fa.n === 0 || b === 0) continue;
    d = { f: polyText(cs), df: polyText([2, b]), a, fa, dfa: q(m), dom: [-3, 3], m, p0: nz(rng, -5, 5) };
    if (fa.sub(q(m).mul(a)).eq(d.p0)) d = null;
  }
  d ||= { f: 'x^2-2x+3', df: '2x-2', a: 2, fa: q(3), dfa: q(2), dom: [-3, 3], m: 2, p0: 1, fallback: true };
  const lineText = polyText([d.m, d.p0]);
  const parts = [
    { html: t('Dérive f.'), ask: 'f′(x) =', start: `d(${d.f})`, judge: derivCfg(d.dom), lines: [E(d.df, t('Dériver'), 'deriv', 'deriv')] },
    { html: t('Même pente que la droite : f′(x) = {m}.', { m: fr(d.m) }), start: `${d.df}=${d.m}`, judge: { kind: 'solset', v: V }, lines: [E(`x=${d.a}`, t('Résoudre'), 'value', 'solve')] },
    ...tgParts(d).slice(1).filter((p) => p.html !== t('Pente de la tangente :')),
  ];
  if (level <= 2) parts[1].lines = [blanked(parts[1].lines[0], [String(d.a)])];
  return partsItem({
    skill: TG, level, parts, choices: TG_CHOICES,
    prompt: t('Soit f(x) = {f}. En quel point la tangente au graphe de f est-elle parallèle à la droite y = {l} ? Donne l\'équation de cette tangente.', { f: MT(d.f), l: MT(lineText) }),
    hints: H(t('Deux droites parallèles ont la même pente : résous f′(x) = {m}.', { m: fr(d.m) }), t('x = {a}, puis y = f({a}) {op} {m}({l}) avec f({a}) = □', { a: fr(d.a), op: d.m < 0 ? '−' : '+', m: fr(Math.abs(d.m)) === '1' ? '' : fr(Math.abs(d.m)), l: MT(lin(d.a)) }), `y = ${MT(tangentFinal(d.fa, d.dfa, d.a), YV)}`),
    subgoals: TG_SUB, keys: [...KEYS, 'relation'], key: `${TG}:par:${level}:${d.f}:${d.m}`, exam: examOf(opts, 3), fallback: d.fallback, expectedSec: 150,
  });
}

// Gabarit 3: √(a + h) ≈ √a + h/(2√a).
function tgApprox(level, rng, opts) {
  const m = rng.pick([2, 3, 4, 5, 10]);
  const a = m * m;
  const h = rng.pick([q(1, 10), q(-1, 10), q(1, 5), q(1, 2), q(-1, 5)]);
  const slope = q(1, 2 * m);
  const val = slope.mul(h).add(m);
  const parts = [
    { html: t('Dérive f(x) = √x.'), ask: 'f′(x) =', start: 'd(√x)', judge: derivCfg([0.2, 4]), lines: [E('1/(2√x)', t('Table'), 'deriv', 'deriv')] },
    { html: t('Pente en a = {a} :', { a }), ask: `f′(${a}) =`, start: at('1/(2√x)', a), judge: VAL, lines: [E(N(slope), t('Pente en a'), 'value', 'dfa')] },
    {
      html: t('Approximation linéaire, avec h = {h} :', { h: fr(dec(h)) }), ask: `√(${dec(h.add(a))}) ≈`, start: `√(${dec(h.add(a))})`, judge: { ...VAL, expect: N(val) },
      lines: [E(`${m}+${N(slope)}×(${N(h)})`, 'f(a) + f′(a)·h', 'approx', 'approx'), E(N(val), t('Calculer'), 'approx', 'compute')],
    },
  ];
  if (level <= 2) parts[2].lines[0] = blanked(parts[2].lines[0], [N(slope)]);
  return partsItem({
    skill: TG, level, parts, choices: TG_CHOICES,
    prompt: t('Donne une valeur approchée de √({x}) (fraction exacte) par l\'approximation linéaire de f(x) = √x en a = {a}.', { x: dec(h.add(a)), a }),
    hints: H(t('f(a + h) ≈ f(a) + f′(a)·h, avec f′(x) = 1/(2√x).'), `√(${dec(h.add(a))}) ≈ ${m} + □·(${fr(N(h))})`, `${m} + ${fr(N(slope))}·(${fr(N(h))}) = ${fr(N(val))}`),
    subgoals: TG_SUB, keys: KEYS, key: `${TG}:approx:${level}:${a}:${h}`, exam: examOf(opts), expectedSec: 120,
  });
}

// Level 5: the tangent, then f(a ± 1/10) approximated by it.
function tgLevel5(rng, opts) {
  const d = tgFunction(rng, rng.pick(['cubic', 'cubic', 'exp', 'ln']));
  const h = rng.pick([q(1, 10), q(-1, 10)]);
  const x1 = h.add(d.a);
  const val = d.fa.add(d.dfa.mul(h));
  const parts = [
    ...tgParts(d),
    {
      html: t('Avec la tangente, donne une valeur approchée de f({x}).', { x: dec(x1) }), ask: `f(${dec(x1)}) ≈`, start: `f(${dec(x1)})`, judge: { ...VAL, expect: N(val) },
      lines: [E(N(val), 'f(a + h) ≈ f(a) + f′(a)·h', 'approx', 'approx')],
    },
  ];
  return partsItem({
    skill: TG, level: 5, parts, prompt: t('Soit f(x) = {f}. Donne la tangente à son graphe en a = {a}, puis une valeur approchée de f({x}) (fraction exacte).', { f: MT(d.f), a: fr(N(d.a)), x: dec(x1) }),
    hints: [], subgoals: TG_SUB, keys: KEYS, key: `${TG}:5:${d.f}:${d.a}:${h}`, exam: examOf(opts, 3), fallback: d.fallback, expectedSec: 180,
  });
}

function tgMcq(rng) {
  const d = tgFunction(rng, 'cubic');
  const right = tangentFinal(d.fa, d.dfa, d.a);
  const Y = (s) => MT(`y=${s}`, YV);
  const cands = [
    { html: Y(right), correct: true },
    { html: Y(`${N(d.fa)}+(${d.df})(${lin(d.a)})`), correct: false, rule: 'g6_tangent_slope_function' },
    { html: Y(polyText([d.dfa, d.fa])), correct: false },
    { html: Y(polyText([d.fa, d.dfa.sub(d.fa.mul(d.a))])), correct: false },
    { html: Y(polyText([d.dfa, d.fa.add(d.dfa.mul(d.a))])), correct: false },
  ];
  const options = cands.filter((o, i) => cands.findIndex((x) => x.html === o.html) === i).slice(0, 4);
  return mcq({
    skill: TG, level: 4, prompt: t('Quelle est la tangente au graphe de f(x) = {f} en a = {a} ?', { f: MT(d.f), a: fr(N(d.a)) }), options, key: `${TG}:mcq:${d.f}:${d.a}`,
    solution: [{ html: `f(${fr(N(d.a))}) = ${fr(N(d.fa))}, f′(x) = ${MT(d.df)}, f′(${fr(N(d.a))}) = ${fr(N(d.dfa))}`, note: '' }, { html: `y = ${MT(tangentText(d.fa, d.dfa, d.a))} = ${MT(right)}`, note: 'y = f(a) + f′(a)(x − a)' }],
    exam: { format: 'mcq', points: 1 }, fallback: d.fallback,
  }, rng);
}

function tgCoef(rng) {
  const d = tgFunction(rng, rng.pick(['cubic', 'cubic', 'exp', 'ln']));
  const p = d.fa.sub(d.dfa.mul(d.a));
  return answerItem({
    skill: TG, level: 4, prompt: t('La tangente au graphe de f(x) = {f} en a = {a} s\'écrit y = mx + p. Donne p (l\'ordonnée à l\'origine).', { f: MT(d.f), a: fr(N(d.a)) }),
    expected: N(p), key: `${d.f}:${d.a}`, exam: { format: 'coef', points: 1 }, fallback: d.fallback,
    traps: [], solution: [{ html: `y = ${MT(tangentText(d.fa, d.dfa, d.a))} = ${MT(tangentFinal(d.fa, d.dfa, d.a))}`, note: `p = ${fr(N(p))}` }],
  });
}

// ======================================================================
// g6-limits
// ======================================================================

const LI = 'g6-limits';
const LI_SUB = [
  { id: 'dominant', label: t('mettre en évidence'), skill: LI },
  { id: 'conj', label: t('expression conjuguée'), skill: 'rat-simplify' },
  { id: 'simplify', label: t('simplifier'), skill: 'rat-simplify' },
  { id: 'sign', label: t('signe au voisinage du pôle'), skill: LI },
  { id: 'limit', label: t('passer à la limite'), skill: LI },
];
const LIM = (to, dir) => ({ kind: 'limit', v: V, to, ...(dir ? { dir } : {}) });
const INF_T = (s) => (s > 0 ? '+∞' : '-∞');
const toWord = (to, dir) => `${fr(to)}${dir === '-' ? '⁻' : dir === '+' ? '⁺' : ''}`;
const LI_CHOICES = [
  { id: 'dominant', label: t('Mettre en évidence le terme dominant') },
  { id: 'conj', label: t('Multiplier et diviser par l\'expression conjuguée') },
  { id: 'divide', label: t('Diviser en haut et en bas par x (signe de x !)') },
  { id: 'simplify', label: t('Simplifier') },
  { id: 'num', label: t('Calculer le numérateur au pôle') },
  { id: 'limit', label: t('Passer à la limite') },
  { id: 'zero', label: '∞ − ∞ = 0', rule: 'g6_infinity_minus_infinity', why: t('∞ − ∞ est une forme indéterminée : il faut transformer l\'expression.') },
];

// c_k/x^j terms of a polynomial divided by its leading power.
function overPowers(cs) {
  return joinSum(cs.map((c, j) => {
    const C = Q.of(c);
    if (C.n === 0) return '';
    if (j === 0) return N(C);
    return over(C, j === 1 ? 'x' : `x^${j}`);
  }));
}
const xPow = (k) => (k === 0 ? '' : k === 1 ? 'x' : `x^${k}`);
const wrapP = (s) => (/[+-]/.test(s.slice(1)) ? `(${s})` : s);

// A polynomial with whole roots: lead·Π(x − r), coefficients within 9.
function rootsPoly(rng, deg, lead, avoid = []) {
  for (let i = 0; i < 100; i++) {
    const roots = Array.from({ length: deg }, () => rng.int(-4, 4));
    if (roots.some((r) => avoid.includes(r))) continue;
    const cs = fromRoots(lead, roots.map((r) => [r, 1]));
    if (cs.some((c) => Math.abs(c.valueOf()) > 9) || cs.filter((c) => c.n !== 0).length < 2) continue;
    return { cs, roots };
  }
  return null;
}

// Gabarit A: N/D at ±∞, deg N ≤ deg D (a finite limit).
function liRational(rng) {
  for (let i = 0; i < 200; i++) {
    const m = rng.int(1, 3);
    const n = rng.chance(0.7) ? m : rng.int(1, m);
    if (n > m) continue;
    const Np = rootsPoly(rng, n, nz(rng, -4, 4));
    const Dp = rootsPoly(rng, m, rng.pick([1, 1, 2, 3]), Np?.roots || []);
    if (!Np || !Dp) continue;
    const to = rng.pick(['+∞', '-∞']);
    const value = n === m ? Np.cs[0].div(Dp.cs[0]) : q(0);
    return { N: Np.cs, D: Dp.cs, n, m, to, value };
  }
  return { N: [q(2), q(-3), q(1)], D: [q(1), q(0), q(4)], n: 2, m: 2, to: '+∞', value: q(2), fallback: true };
}

function liRationalLines(d) {
  const f = `(${polyText(d.N)})/(${polyText(d.D)})`;
  const iN = overPowers(d.N);
  const iD = overPowers(d.D);
  const l1 = `${xPow(d.n)}(${iN})/(${xPow(d.m)}(${iD}))`;
  const l2 = d.n === d.m ? `${wrapP(iN)}/${wrapP(iD)}` : `${wrapP(iN)}/(${xPow(d.m - d.n)}(${iD}))`;
  return {
    f,
    lines: [
      E(l1, t('Mettre en évidence le terme dominant'), 'dominant', 'dominant'),
      E(l2, t('Simplifier par {p}', { p: xPow(d.n).replace('^2', '²').replace('^3', '³') }), 'simplify', 'simplify'),
      E(N(d.value), d.n === d.m ? t('Les termes en 1/x tendent vers 0') : t('Le dénominateur tend vers l\'infini'), 'limit', 'limit'),
    ],
    holes: [[xPow(d.n)], [N(d.N[0])], [N(d.value)]],
  };
}

// Gabarit C: √(x² + bx + c) ∓ x at ±∞, limit ±b/2.
function liConj(rng, to) {
  const b = rng.pick([2, 4, 6, 8, -2, -4, -6]);
  const c = rng.chance(0.5) ? 0 : nz(rng, -5, 5);
  to ||= rng.pick(['+∞', '+∞', '-∞']);
  const P = polyText([1, b, c]);
  const plus = to === '+∞';
  const f = `√(${P})${plus ? '-' : '+'}x`;
  const top = polyText([b, c]);
  const inner = joinSum(['1', over(b, 'x'), c ? over(c, 'x^2') : '']);
  const nTop = joinSum([N(b), c ? over(c, 'x') : '']);
  const value = q(plus ? b : -b, 2);
  return {
    f, to, value, b, c,
    lines: [
      E(`(${top})/(√(${P})${plus ? '+' : '-'}x)`, t('Multiplier et diviser par la conjuguée'), 'conj', 'conj'),
      E(`${wrapP(nTop)}/(${plus ? '' : '-'}√(${inner})${plus ? '+' : '-'}1)`, plus ? t('Diviser par x (x > 0)') : t('Diviser par x : x < 0, donc √(x²) = −x'), 'simplify', 'divide'),
      E(N(value), t('Passer à la limite'), 'limit', 'limit'),
    ],
    holes: [[top], [N(b)], [N(value)]],
  };
}

// Gabarit D: √(a²x² + c)/(bx + d) at ±∞, limit ±a/b.
function liSqrtRatio(rng, to) {
  for (let i = 0; i < 100; i++) {
    const a = rng.pick([1, 2, 3]);
    const b = rng.pick([1, 2, 3, -1, -2]);
    const c = nz(rng, -5, 5);
    const dd = nz(rng, -5, 5);
    to ||= rng.pick(['-∞', '-∞', '+∞']);
    const plus = to === '+∞';
    const value = q(plus ? a : -a, b);
    const f = `√(${polyText([a * a, 0, c])})/(${polyText([b, dd])})`;
    const iP = joinSum([String(a * a), over(c, 'x^2')]);
    const iQ = joinSum([N(b), over(dd, 'x')]);
    return {
      f, to, value, a, b,
      lines: [
        E(`√(x^2(${iP}))/(x(${iQ}))`, t('Mettre en évidence x² sous la racine, x en bas'), 'dominant', 'dominant'),
        E(`${plus ? '' : '-'}√(${iP})/(${iQ})`, plus ? t('√(x²) = x pour x > 0') : t('√(x²) = |x| = −x pour x < 0'), 'simplify', 'simplify'),
        E(N(value), t('Passer à la limite'), 'limit', 'limit'),
      ],
      holes: [[iP], [iQ], [N(value)]],
    };
  }
  return null;
}

// Gabarit B: a pole r with N(r) ≠ 0: N/((x − r)·k) or N/(x − r)².
function liPoleData(rng) {
  for (let i = 0; i < 200; i++) {
    const r = nz(rng, -3, 3);
    const double = rng.chance(0.3);
    const s = double ? r : rng.chance(0.5) ? null : rng.int(-3, 3);
    if (s === r && !double) continue;
    const Np = rootsPoly(rng, rng.int(1, 2), nz(rng, -3, 3), [r]);
    if (!Np) continue;
    const Nr = evalPoly(Np.cs, r);
    const facs = double ? `(${lin(r)})^2` : s === null ? `${lin(r)}` : `(${lin(r)})(${lin(s)})`;
    const Dat = (x) => (double ? (x - r) ** 2 : s === null ? x - r : (x - r) * (x - s));
    const sl = Math.sign(Dat(r - 1e-3));
    const sr = Math.sign(Dat(r + 1e-3));
    const sN = Math.sign(Nr.valueOf());
    return { N: Np.cs, r, Nr, f: `(${polyText(Np.cs)})/(${facs})`, sl, sr, sN, left: INF_T(sN * sl), right: INF_T(sN * sr), double };
  }
  return { N: [q(1), q(1)], r: 2, Nr: q(3), f: '(x+1)/(x-2)', sl: -1, sr: 1, sN: 1, left: '-∞', right: '+∞', fallback: true };
}

function poleParts(d, level) {
  const R = fr(String(d.r));
  const side = (dir) => {
    const sd = dir === '-' ? d.sl : d.sr;
    const sign = {
      kind: 'decision', prompt: t('Quand x → {x}, le dénominateur tend vers 0 par valeurs…', { x: `${R}${dir === '-' ? '⁻' : '⁺'}` }),
      options: [{ id: 'pos', label: t('positives (0⁺)'), valid: sd > 0, why: t('Regarde le signe de chaque facteur juste à côté du pôle.') }, { id: 'neg', label: t('négatives (0⁻)'), valid: sd < 0, why: t('Regarde le signe de chaque facteur juste à côté du pôle.') }],
    };
    const res = dir === '-' ? d.left : d.right;
    return {
      html: t('Limite quand x → {x} :', { x: `${R}${dir === '-' ? '⁻' : '⁺'}` }), start: d.f, judge: LIM(String(d.r), dir),
      pre: level === 1 ? [NOTE(t('Le dénominateur tend vers {z}, le numérateur vers {n}.', { z: `0${sd > 0 ? '⁺' : '⁻'}`, n: fr(N(d.Nr)) }))] : level === 2 ? [sign] : [],
      lines: [E(res, `${fr(N(d.Nr))}/0${sd > 0 ? '⁺' : '⁻'}`, 'sign', 'limit')],
    };
  };
  return [
    { html: t('Le numérateur en x = {r} :', { r: R }), ask: `N(${R}) =`, start: at(polyText(d.N), d.r), judge: { kind: 'value', form: 'irreducible' }, lines: [E(N(d.Nr), t('Pas nul : le pôle donne ±∞'), 'sign', 'num')] },
    side('-'), side('+'),
  ];
}

function liItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return liMcq(rng);
  if (opts.exam === 'tf') return liTf(rng);
  if (level === 5) return liLevel5(rng);
  const gab = rng.pick(level === 1 ? ['rat', 'conj', 'sqrt'] : ['rat', 'conj', 'sqrt', 'pole']);
  if (gab === 'pole') {
    const d = liPoleData(rng);
    const parts = poleParts(d, level);
    return partsItem({
      skill: LI, level, parts, choices: LI_CHOICES,
      prompt: t('Soit f(x) = {f}. Calcule les limites de f à gauche et à droite de {r}.', { f: MT(d.f), r: fr(String(d.r)) }),
      hints: H(t('Le numérateur ne s\'annule pas au pôle : la limite est ±∞, avec le signe du numérateur fois le signe du dénominateur.'), t('N({r}) = {n}, et le dénominateur tend vers {z} à gauche', { r: fr(String(d.r)), n: fr(N(d.Nr)), z: `0${d.sl > 0 ? '⁺' : '⁻'}` }), t('À gauche : {l} ; à droite : {r}.', { l: fr(d.left), r: fr(d.right) })),
      subgoals: LI_SUB, keys: LKEYS, key: `${LI}:pole:${level}:${d.f}`, exam: examOf(opts), fallback: d.fallback, expectedSec: 120,
    });
  }
  let d;
  if (gab === 'rat') {
    const r = liRational(rng);
    d = { ...r, ...liRationalLines(r) };
  } else if (gab === 'conj') d = liConj(rng);
  else d = liSqrtRatio(rng);
  let lines = d.lines;
  if (level === 1) lines = lines.map((l, k) => blanked(l, d.holes[k]));
  const methodId = gab === 'conj' ? 'conj' : 'dominant';
  const decision = {
    kind: 'decision', prompt: t('Quelle méthode ?'),
    options: [
      { id: 'dominant', label: t('Mettre en évidence le terme dominant'), valid: methodId === 'dominant', why: gab === 'conj' ? t('Mettre x en évidence donne x·(√(1 + …) − 1) : encore ∞·0. Avec une différence de racine, prends la conjuguée.') : t('Oui.') },
      { id: 'conj', label: t('Expression conjuguée'), valid: methodId === 'conj', why: t('Il n\'y a pas de différence ∞ − ∞ avec une racine ici.') },
      { id: 'zero', label: t('∞ − ∞ = 0, c\'est fini'), valid: false, rule: gab === 'conj' ? 'g6_infinity_minus_infinity' : undefined, why: t('∞ − ∞ est une forme indéterminée.') },
    ].filter((o) => gab === 'conj' || o.id !== 'zero'),
  };
  if (level === 2) lines = [decision, ...lines.map((l, k) => (k === 2 ? l : blanked(l, d.holes[k])))];
  const methodHint = { rat: t('En ±∞ : mets en évidence la plus grande puissance de x en haut et en bas.'), conj: t('∞ − ∞ avec une racine : multiplie et divise par l\'expression conjuguée.'), sqrt: t('Mets x² en évidence sous la racine : √(x²) = |x|, et |x| = −x quand x → −∞.') }[gab];
  const eqs = d.lines;
  return linesItem({
    skill: LI, level, prompt: rng.pick([t('Calcule {e}.', { e: MT(`lim(${d.f},x,${d.to})`) }), t('Calcule la limite de f(x) = {f} quand x → {to}.', { f: MT(d.f), to: fr(d.to) })]),
    start: d.f, judge: level === 3 ? { ...LIM(d.to), menus: stepMenus(d.f, eqs, LI_CHOICES) } : LIM(d.to), mode: modeOf(level), script: lines,
    hints: H(methodHint, `= ${tmpl(blanked(eqs[0], d.holes[0]))}`, t('= {e}, et la limite vaut {v}.', { e: MT(eqs[0].math), v: fr(N(d.value)) })),
    subgoals: LI_SUB, keys: LKEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${LI}:${gab}:${level}:${d.f}:${d.to}`, exam: examOf(opts), fallback: d.fallback, expectedSec: 120,
  });
}

// Level 5: the four limits of a rational function (±∞ and both sides of its pole).
function liLevel5(rng) {
  let d = null;
  for (let i = 0; i < 200 && !d; i++) {
    const r = nz(rng, -3, 3);
    const double = rng.chance(0.4);
    const Np = rootsPoly(rng, double ? 2 : 1, nz(rng, -3, 3), [r]);
    if (!Np) continue;
    const Dcs = fromRoots(1, [[r, double ? 2 : 1]]);
    if (Dcs.some((c) => Math.abs(c.valueOf()) > 9)) continue;
    const Nr = evalPoly(Np.cs, r);
    const sN = Math.sign(Nr.valueOf());
    d = { N: Np.cs, D: Dcs, r, Nr, n: double ? 2 : 1, m: double ? 2 : 1, value: Np.cs[0], double, sN };
  }
  d ||= { N: [q(2), q(1)], D: [q(1), q(-1)], r: 1, Nr: q(3), n: 1, m: 1, value: q(2), double: false, sN: 1, fallback: true };
  const den = d.double ? `(${lin(d.r)})^2` : lin(d.r);
  const f = `(${polyText(d.N)})/(${den})`;
  const rl = liRationalLines({ ...d, to: '+∞' });
  const R = String(d.r);
  const left = INF_T(d.double ? d.sN : -d.sN);
  const right = INF_T(d.sN);
  const parts = [
    { html: t('En +∞ :'), start: f, judge: LIM('+∞'), lines: [rl.lines[0], rl.lines[1], rl.lines[2]].map((l) => ({ ...l, math: l.math })) },
    { html: t('En −∞ :'), start: f, judge: LIM('-∞'), lines: [E(N(d.value), t('Même calcul : les termes en 1/x tendent vers 0'), 'limit', 'limit')] },
    { html: t('Quand x → {x} :', { x: `${fr(R)}⁻` }), start: f, judge: LIM(R, '-'), lines: [E(left, `${fr(N(d.Nr))}/0${d.double ? '⁺' : '⁻'}`, 'sign', 'limit')] },
    { html: t('Quand x → {x} :', { x: `${fr(R)}⁺` }), start: f, judge: LIM(R, '+'), lines: [E(right, `${fr(N(d.Nr))}/0⁺`, 'sign', 'limit')] },
  ];
  // The first line must be written from the item's own function.
  parts[0].lines[0] = E(`${xPow(d.n)}(${overPowers(d.N)})/(${xPow(d.m)}(${overPowers(d.D)}))`, t('Mettre en évidence le terme dominant'), 'dominant', 'dominant');
  return partsItem({
    skill: LI, level: 5, parts, prompt: t('Soit f(x) = {f}. Calcule ses limites en +∞, en −∞, et à gauche et à droite de {r}.', { f: MT(f), r: fr(R) }),
    hints: [], subgoals: LI_SUB, keys: LKEYS, key: `${LI}:5:${f}`, exam: false, fallback: d.fallback, expectedSec: 200,
  });
}

function liMcq(rng) {
  const gab = rng.pick(['conj', 'conj', 'sqrt']);
  const options = [];
  let d;
  if (gab === 'conj') {
    d = liConj(rng);
    const half = q(d.b, 2);
    options.push({ html: MT(N(d.value)), correct: true }, { html: '0', correct: false, rule: 'g6_infinity_minus_infinity' });
    if (d.to === '+∞') options.push({ html: MT(N(d.b)), correct: false }, { html: '+∞', correct: false });
    else options.push({ html: '−∞', correct: false, rule: 'g6_sqrt_x2_abs' }, { html: MT(N(half)), correct: false });
  } else {
    d = liSqrtRatio(rng, '-∞');
    options.push({ html: MT(N(d.value)), correct: true }, { html: MT(N(d.value.neg())), correct: false, rule: 'g6_sqrt_x2_abs' }, { html: '0', correct: false }, { html: MT(N(q(d.a * d.a, d.b).neg())), correct: false }, { html: MT(N(q(d.a * d.a, d.b))), correct: false }, { html: '−∞', correct: false });
  }
  const uniq = options.filter((o, i) => options.findIndex((x) => x.html === o.html) === i).slice(0, 4);
  return mcq({
    skill: LI, level: 4, prompt: t('Que vaut {e} ?', { e: MT(`lim(${d.f},x,${d.to})`) }), options: uniq, key: `${LI}:mcq:${d.f}:${d.to}`,
    solution: [{ html: MT(d.f), note: t('Départ') }, ...d.lines.map((l) => ({ html: `= ${MT(l.math)}`, note: l.note }))], exam: { format: 'mcq', points: 1 },
  }, rng);
}

// True or false: a Vrai/Faux choice (no checker fits a limit counter-example).
function liTf(rng) {
  const kind = rng.pick(['conj', 'sqrt', 'pole', 'rat']);
  // The statement: a French template and its values (the key stays French).
  let sk;
  let sv;
  let truth;
  let rule = null;
  let why;
  if (kind === 'conj') {
    const d = liConj(rng, '+∞');
    sk = 'lim ({f}) en +∞ vaut 0, car {r} ≈ x.';
    sv = { f: MT(d.f), r: MT(`√(${polyText([1, d.b, d.c])})`) };
    truth = false; rule = 'g6_infinity_minus_infinity';
    why = t('Faux : ∞ − ∞ est indéterminé. Avec la conjuguée, la limite vaut {v}.', { v: fr(N(d.value)) });
  } else if (kind === 'sqrt') {
    const d = liSqrtRatio(rng, '-∞');
    const claim = rng.chance(0.5) ? d.value.neg() : d.value;
    truth = claim.eq(d.value);
    rule = truth ? null : 'g6_sqrt_x2_abs';
    sk = 'lim {f} en −∞ vaut {c}.';
    sv = { f: MT(d.f), c: fr(N(claim)) };
    why = truth ? t('Vrai : en −∞, √(x²) = |x| = −x, donc la limite vaut {v}.', { v: fr(N(d.value)) }) : t('Faux : en −∞, √(x²) = |x| = −x, donc la limite vaut {v}.', { v: fr(N(d.value)) });
  } else if (kind === 'pole') {
    const d = liPoleData(rng);
    const dir = rng.pick(['-', '+']);
    const res = dir === '-' ? d.left : d.right;
    const claim = rng.chance(0.5) ? res : res === '+∞' ? '-∞' : '+∞';
    truth = claim === res;
    sk = 'Quand x → {x}, {f} tend vers {c}.';
    sv = { x: `${fr(String(d.r))}${dir === '-' ? '⁻' : '⁺'}`, f: MT(d.f), c: fr(claim) };
    const wv = { n: fr(N(d.Nr)), z: `0${(dir === '-' ? d.sl : d.sr) > 0 ? '⁺' : '⁻'}`, v: fr(res) };
    why = truth ? t('Vrai : le numérateur tend vers {n} et le dénominateur vers {z}, donc la limite est {v}.', wv) : t('Faux : le numérateur tend vers {n} et le dénominateur vers {z}, donc la limite est {v}.', wv);
  } else {
    const r = liRational(rng);
    const claim = rng.chance(0.5) ? r.value : r.value.add(1);
    truth = claim.eq(r.value);
    sk = 'lim {f} en {to} vaut {c}.';
    sv = { f: MT(`(${polyText(r.N)})/(${polyText(r.D)})`), to: fr(r.to), c: fr(N(claim)) };
    why = truth ? t('Vrai : on met en évidence le terme dominant, la limite vaut {v}.', { v: fr(N(r.value)) }) : t('Faux : on met en évidence le terme dominant, la limite vaut {v}.', { v: fr(N(r.value)) });
  }
  return mcq({
    skill: LI, level: 4, prompt: t('Vrai ou faux ?<br>« {s} »', { s: t(sk, sv) }),
    options: [{ html: t('Vrai'), correct: truth, rule: truth ? null : rule }, { html: t('Faux'), correct: !truth }],
    keepOrder: true, key: `${LI}:tf:${frFill(sk, sv)}`, solution: [{ html: why, note: '' }], exam: { format: 'tf', points: 1 }, expectedSec: 40,
  }, rng);
}

export const GEN = {
  [LI]: (level, rng, profile, opts = {}) => liItem(level, rng, opts),
  [TG]: (level, rng, profile, opts = {}) => tgItem(level, rng, opts),
  [DU]: (level, rng, profile, opts = {}) => duItem(level, rng, opts),
  ...STUDY,
};

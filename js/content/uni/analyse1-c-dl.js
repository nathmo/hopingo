// Generators of module A1, part c (unit `analyse1`, step U2): the DLs
// themselves (js/content/uni/analyse1-c.js gathers the part).
//
// Levels (§8.3): 1–2 guided (lines with boxes), 3 choose the action then
// write the line (`tapActions: 'steps'`), 4 free lines with hints, 5 alone.
// DL lines are judged by `series` (js/judges/series.js): a reference line
// is a DL with its remainder xⁿ·ε(x), or a product, a substitution, a
// quotient of DLs. Every generator starts from the function and the order,
// and keeps the draws whose coefficients are « beaux » (§8.4).
// This file: a1-dl-usual, a1-dl-ops, a1-dl-compose, and the products and
// quotients that analyse1-c-lim.js reuses.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { trapAnswers } from '../../judges/diagnose.js';
import { templateOf } from '../../judges/lines.js';
import { toReadable } from '../../cas/print.js';
import { MT, linesItem, mcq, tfItem, answerItem } from './kit.js';
import {
  V, q, isQ, modeOf, H, E, KEYS, examOf, fact, qPow, coefs, isZero, maxDen, maxNum, mono, remText, termAbs, joinTerms,
  polyText, dlText, polyOf, termCount, valuation, blankDL, tpl, blanked, assemble, fitLines, uniq,
} from './analyse1-c-kit.js';
import { series } from '../../cas/series.js';

// Text for the student: x^2/2 → x²/2, − signs.
export const rd = (t) => toReadable(parse(t));
// A guided line as readable text, the blanks as boxes (hints).
export function boxText(line) {
  const t = line.blanks ? templateOf(line) : line.math;
  const sup = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  return t.replace(/\^(\d)/g, (_, d) => sup[d]).replace(/×/g, '·').replace(/([^(])-/g, '$1 − ').replace(/\+/g, ' + ').replace(/^-/, '−');
}
// The options of a multiple choice: a DL node (or text) as MathML.
export function dlHtml(node) {
  const n = typeof node === 'string' ? parse(node) : node;
  return MT(polyFromNode(n));
}
// A DL written again with our coefficients (the trap candidates print 1/3×x^3).
export function polyFromNode(node, n = 8) {
  try {
    const cs = coefs(node, n);
    if (!cs.every(isQ)) return null;
    const s = series(node, V, 0, n);
    return polyText(cs.slice(0, s.order + 1), { rem: s.remainder ? s.order : null });
  } catch { return null; }
}

// ======================================================================
// Usual functions
// ======================================================================

const SIGN = (k) => (k % 2 ? -1 : 1);
const binom = (alpha, k) => { let c = q(1); for (let i = 0; i < k; i++) c = c.mul(alpha.sub(i)).div(i + 1); return c; };
export const USUAL = {
  exp: { c: (k) => q(1, fact(k)), formula: 'eᵘ = 1 + u + u²/2! + u³/3! + … + uⁿ/n! + uⁿ·ε(u)', name: 'eᵘ' },
  sin: { c: (k) => (k % 2 ? q(SIGN((k - 1) / 2), fact(k)) : q(0)), formula: 'sin u = u − u³/3! + u⁵/5! − … + uⁿ·ε(u)', name: 'sin u', odd: true },
  cos: { c: (k) => (k % 2 ? q(0) : q(SIGN(k / 2), fact(k))), formula: 'cos u = 1 − u²/2! + u⁴/4! − … + uⁿ·ε(u)', name: 'cos u' },
  sinh: { c: (k) => (k % 2 ? q(1, fact(k)) : q(0)), formula: 'sinh u = u + u³/3! + u⁵/5! + … + uⁿ·ε(u)', name: 'sinh u', odd: true },
  cosh: { c: (k) => (k % 2 ? q(0) : q(1, fact(k))), formula: 'cosh u = 1 + u²/2! + u⁴/4! + … + uⁿ·ε(u)', name: 'cosh u' },
  arctan: { c: (k) => (k % 2 ? q(SIGN((k - 1) / 2), k) : q(0)), formula: 'Arctg u = u − u³/3 + u⁵/5 − … + uⁿ·ε(u)', name: 'Arctg u', odd: true },
  ln: { c: (k) => (k === 0 ? q(0) : q(SIGN(k + 1), k)), formula: 'Log(1 + u) = u − u²/2 + u³/3 − … + uⁿ·ε(u)', name: 'Log(1 + u)' },
  geom: { c: () => q(1), formula: '1/(1 − u) = 1 + u + u² + u³ + … + uⁿ + uⁿ·ε(u)', name: '1/(1 − u)' },
  pow: { c: null, formula: '(1 + u)^α = 1 + αu + α(α − 1)/2!·u² + α(α − 1)(α − 2)/3!·u³ + … + uⁿ·ε(u)', name: '(1 + u)^α' },
};
export const coefOf = (F, alpha) => (F === 'pow' ? (k) => binom(alpha, k) : USUAL[F].c);

// a·x^p as text: 2x, −x, x/2, 3x^2, −x^2/2.
export function uText(a, p = 1) {
  const m = mono(p);
  const abs = a.n < 0 ? a.neg() : a;
  let t;
  if (abs.d === 1) t = abs.n === 1 ? m : `${abs.n}${m}`;
  else t = abs.n === 1 ? `${m}/${abs.d}` : `${abs.n}${m}/${abs.d}`;
  return a.n < 0 ? `-${t}` : t;
}
export const plusU = (u) => (u.startsWith('-') ? u : `+${u}`);
export const minusU = (u) => (u.startsWith('-') ? `+${u.slice(1)}` : `-${u}`);
// f(u) as text.
export function fText(F, u, alpha) {
  switch (F) {
    case 'exp': return u === 'x' ? 'e^x' : `e^(${u})`;
    case 'ln': return `ln(1${plusU(u)})`;
    case 'geom': return `1/(1${minusU(u)})`;
    case 'pow': {
      const B = `1${plusU(u)}`;
      if (alpha.eq(q(1, 2))) return `√(${B})`;
      if (alpha.eq(-1)) return `1/(${B})`;
      if (alpha.eq(q(-1, 2))) return `1/√(${B})`;
      if (alpha.d === 1 && alpha.n < 0) return `1/(${B})^${-alpha.n}`;
      return `(${B})^(${alpha.toString()})`;
    }
    default: return `${F}(${u})`;
  }
}
const ALPHA_WORD = (alpha) => (alpha.eq(q(1, 2)) ? '√(1 + u) = (1 + u)^(1/2)' : alpha.eq(-1) ? '1/(1 + u) = (1 + u)^(−1)' : `(1 + u)^α avec α = ${alpha.toString().replace('-', '−')}`);
export const familyWord = (F, alpha) => (F === 'pow' ? ALPHA_WORD(alpha) : USUAL[F].name);

// c·(U)^k as text, without its sign.
function powTerm(c, U, k) {
  const a = c.n < 0 ? c.neg() : c;
  const p = k === 1 ? `(${U})` : `(${U})^${k}`;
  if (a.d === 1) return a.n === 1 ? p : `${a.n}${p}`;
  if (a.n === 1) return `${p}/${a.d}`;
  return `(${a.n}/${a.d})${p}`;
}
// The DL of f written in u, u replaced: Σ cₖ·(U)^k + xⁿ·ε(x), k·p ≤ n.
export function substText(c, U, p, n) {
  const parts = [];
  for (let k = 0; k * p <= n; k++) {
    const a = c(k);
    if (isZero(a)) continue;
    parts.push(k === 0 ? { neg: a.n < 0, text: termAbs(a, 0) } : { neg: a.n < 0, text: powTerm(a, U, k) });
  }
  parts.push({ neg: false, text: remText(n) });
  return joinTerms(parts);
}

// ======================================================================
// a1-dl-usual
// ======================================================================

const US = 'a1-dl-usual';
const US_SUB = [{ id: 'coef', label: 'coefficients', skill: US }];
const AS = [q(-3), q(-2), q(-1), q(1, 2), q(2), q(3)];
const ALPHAS = [q(-1), q(-2), q(1, 2), q(-1, 2), q(1, 3)];
const FAMS = ['exp', 'sin', 'cos', 'ln', 'pow', 'geom', 'arctan', 'sinh', 'cosh'];
const US_FALLBACK = { F: 'pow', alpha: q(1, 2), a: q(2), p: 1, n: 3 };

function usData(rng, avoid = []) {
  for (let i = 0; i < 200; i++) {
    const F = rng.pick(FAMS.filter((f) => !avoid.includes(f)));
    const alpha = F === 'pow' ? rng.pick(ALPHAS) : null;
    const p = rng.chance(0.3) ? 2 : 1;
    const a = rng.pick(['cos', 'cosh'].includes(F) ? AS.filter((x) => x.n > 0) : AS);
    let n = p === 2 ? rng.int(4, 6) : rng.int(2, 5);
    if (p === 2 && USUAL[F].odd) n = 6;
    const d = { F, alpha, a, p, n };
    if (usOk(d)) return d;
  }
  return { ...US_FALLBACK, fallback: true };
}

function usBuild(d) {
  const U = uText(d.a, d.p);
  const f = fText(d.F, U, d.alpha);
  const c = coefOf(d.F, d.alpha);
  const sub = substText(c, U, d.p, d.n);
  const fin = dlText(f, d.n);
  const cs = coefs(f, d.n);
  return { U, f, c, sub, fin, cs };
}

function usOk(d) {
  const { c, cs } = usBuild(d);
  if (maxDen(cs) > 720 || maxNum(cs) > 243) return false;
  if (termCount(cs) < 2) return false;
  // The substitution shows at least one power u² or more.
  let powers = 0;
  for (let k = 2; k * d.p <= d.n; k++) if (!isZero(c(k))) powers++;
  return powers > 0;
}

const US_CHOICES = (d, U) => [
  { id: 'subst', label: `Remplacer u par ${rd(U)} dans le DL de ${familyWord(d.F, d.alpha)}` },
  { id: 'trunc', label: `Calculer les puissances et garder les termes jusqu'à x^${d.n}` },
  { id: 'deriv', label: 'Calculer f′(0), f″(0)… une à une', why: 'Possible, mais bien plus long : le DL usuel donne tous les coefficients d\'un coup.' },
  { id: 'rem', label: `Écrire le reste x^${d.n - 1}·ε(x)`, rule: 'a1_dl_remainder_wrong_order', why: `Le reste se met à l'ordre demandé : x^${d.n}·ε(x).` },
];

function usLines(d, level) {
  const b = usBuild(d);
  let l1 = E(b.sub, `DL de ${familyWord(d.F, d.alpha)} avec u = ${rd(b.U)}`, 'coef', 'subst');
  let l2 = E(b.fin, `Puissances calculées, termes jusqu'à x^${d.n}`, 'coef', 'trunc');
  if (level === 1) {
    l1 = { ...l1, ...tpl(b.sub, [b.U]) };
    l2 = { ...l2, ...blankDL(b.fin, (i) => (i > 0 || isZero(b.cs[0]) ? 'coef' : false)) };
  } else if (level === 2) {
    l1 = { ...l1, ...blankDL(b.sub, (i) => (i >= 1 ? 'term' : false)) };
    l2 = { ...l2, ...blankDL(b.fin, () => 'term') };
  }
  return { b, lines: [l1, l2] };
}

function usItem(level, rng, profile, opts) {
  opts = opts || {};
  if (opts.exam === 'mcq') return usMcq(rng);
  if (opts.exam === 'tf') return usTf(rng);
  if (level === 5) return usSeries(rng, opts);
  const d = usData(rng);
  const { b, lines } = usLines(d, level);
  const judge = { kind: 'series', v: V, at: 0, order: d.n };
  const parts = [{ start: b.f, judge, lines, choices: US_CHOICES(d, b.U) }];
  const as = assemble(parts, level);
  return linesItem({
    skill: US, level,
    prompt: `Écris le DL d'ordre ${d.n} de ${MT(b.f)} en 0.${level <= 2 ? `<br>Rappel : ${USUAL[d.F].formula}${d.F === 'pow' ? `, ici α = ${d.alpha.toString().replace('-', '−')}` : ''}.` : ''}`,
    ...as, mode: modeOf(level),
    hints: H(`C'est ${familyWord(d.F, d.alpha)} avec u = ${rd(b.U)} : écris son DL, puis remplace u.`, `${boxText(blankDL(b.fin, (i) => (i > 0 ? 'coef' : false)))}`, MT(b.fin)),
    subgoals: US_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${US}:${b.f}:${d.n}`, exam: examOf(opts), fallback: !!d.fallback,
  });
}

// Level 5: three usual DLs in a row, alone.
function usSeries(rng, opts) {
  const ds = [];
  for (let i = 0; i < 3; i++) ds.push(usData(rng, ds.map((x) => x.F)));
  const parts = ds.map((d, i) => {
    const b = usBuild(d);
    return { html: i ? `DL d'ordre ${d.n} de ${MT(b.f)} en 0 :` : '', start: b.f, judge: { kind: 'series', v: V, at: 0, order: d.n }, lines: [E(b.fin, 'DL usuel', 'coef')] };
  });
  const as = assemble(parts, 5);
  const f0 = parts[0].start;
  return linesItem({
    skill: US, level: 5, prompt: `Trois DL usuels en 0, sans aide. D'abord ${MT(f0)} à l'ordre ${ds[0].n}.`,
    ...as, mode: 'free', hints: [], subgoals: US_SUB, keys: KEYS,
    key: `${US}:L5:${parts.map((p) => p.start).join('|')}`, exam: examOf(opts), fallback: ds.some((d) => d.fallback),
  });
}

// Options of a multiple choice from the traps of the start line.
export function trapOptions(start, judge, rightHtml) {
  const out = [];
  for (const t of trapAnswers('series', parse(start), judge)) {
    const text = polyFromNode(t.node);
    if (!text || /^x(\^\d+)?ε/.test(text)) continue;
    out.push({ html: MT(text), correct: false, rule: t.rule });
  }
  return uniq(out).filter((o) => o.html !== rightHtml);
}

function usMcq(rng) {
  if (rng.chance(0.5)) {
    // 1/(b + cx) at order 2 or 3 (examen 2022).
    let d = null;
    for (let i = 0; i < 200 && !d; i++) {
      const b = rng.int(2, 5);
      const c = rng.pick([-3, -2, -1, 1, 2, 3]);
      const n = rng.pick([2, 2, 3]);
      if (Math.abs(c) === b) continue;
      const f = `1/(${b}${c < 0 ? '-' : '+'}${Math.abs(c) === 1 ? '' : Math.abs(c)}x)`;
      const cs = coefs(f, n);
      if (maxDen(cs) > 720) continue;
      d = { b, c, n, f, cs };
    }
    d ||= { b: 4, c: 3, n: 2, f: '1/(4+3x)', cs: coefs('1/(4+3x)', 2), fallback: true };
    const judge = { kind: 'series', v: V, at: 0, order: d.n };
    const right = polyText(d.cs, { rem: d.n });
    const rightHtml = MT(right);
    const wrong = trapOptions(d.f, judge, rightHtml).filter((o) => o.rule === 'a1_dl_factor_out_constant');
    // Alternating sign forgotten: 1/b·(1 + u + u² …) with u = cx/b.
    const noSign = polyText(Array.from({ length: d.n + 1 }, (_, k) => q(1, d.b).mul(qPow(q(d.c, d.b), k))), { rem: d.n });
    const options = uniq([{ html: rightHtml, correct: true }, ...wrong, { html: MT(noSign), correct: false }]).slice(0, 4);
    return mcq({
      skill: US, level: 4, prompt: `Le DL d'ordre ${d.n} de ${MT(d.f)} en 0 est :`, options, key: `mcq:${d.f}:${d.n}`,
      exam: { format: 'mcq', points: 1 }, expectedSec: 240, fallback: !!d.fallback,
      solution: [{ html: `${MT(d.f)} = (1/${d.b})·1/(1 + ${uText(q(d.c, d.b)).replace(/-/g, '−')}) = ${rightHtml}`, note: 'Mettre la constante en facteur' }],
    }, rng);
  }
  let d = usData(rng);
  for (let i = 0; i < 50 && (!['exp', 'sin', 'cos', 'sinh', 'cosh', 'pow'].includes(d.F) || d.p !== 1); i++) d = usData(rng);
  const b = usBuild(d);
  const judge = { kind: 'series', v: V, at: 0, order: d.n };
  const rightHtml = MT(b.fin);
  const wrong = trapOptions(b.f, judge, rightHtml);
  // All signes +.
  const plus = polyText(b.cs.map((c) => (isQ(c) && c.n < 0 ? c.neg() : c)), { rem: d.n });
  const minus = polyText(b.cs.map((c, k) => (k % 2 ? c.neg() : c)), { rem: d.n });
  const pick = [...wrong.filter((o) => o.rule === 'a1_dl_factorial_missing'), { html: MT(plus), correct: false }, { html: MT(minus), correct: false }, ...wrong];
  const options = uniq([{ html: rightHtml, correct: true }, ...pick]).filter((o, i) => i === 0 || o.html !== rightHtml).slice(0, 4);
  return mcq({
    skill: US, level: 4, prompt: `Le DL d'ordre ${d.n} de ${MT(b.f)} en 0 est :`, options, key: `mcq:${b.f}:${d.n}`,
    exam: { format: 'mcq', points: 1 }, expectedSec: 240, fallback: !!d.fallback,
    solution: [{ html: `${MT(b.f)} = ${MT(b.sub)} = ${rightHtml}`, note: `DL de ${familyWord(d.F, d.alpha)}` }],
  }, rng);
}

function usTf(rng) {
  const kind = rng.pick(['taylor', 'even', 'false', 'false']);
  if (kind === 'taylor') {
    return tfItem({
      skill: US, level: 4, truth: true, key: 'taylor',
      statement: 'Si f est infiniment dérivable au voisinage de 0 et si pₙ est la partie polynomiale de son DL d\'ordre n en 0, alors f⁽ᵏ⁾(0) = pₙ⁽ᵏ⁾(0) pour tout k ≤ n.',
      explanation: 'Vrai (examen 2022) : par Taylor, le coefficient de xᵏ est f⁽ᵏ⁾(0)/k!, et c\'est aussi pₙ⁽ᵏ⁾(0)/k!.',
      exam: { format: 'tf', points: 1 }, expectedSec: 60,
    });
  }
  if (kind === 'even') {
    return tfItem({
      skill: US, level: 4, truth: true, key: 'even',
      statement: 'Si f est paire et admet un DL d\'ordre 4 en 0, alors les coefficients de x et de x³ de ce DL sont nuls.',
      explanation: 'Vrai : f(−x) = f(x) donne un DL qui ne change pas quand on remplace x par −x ; par unicité du DL, les coefficients des puissances impaires sont nuls.',
      exam: { format: 'tf', points: 1 }, expectedSec: 60,
    });
  }
  // A false general statement: a value of the parameter refutes it.
  const bank = [
    { s: 'Pour tout réel a, le DL d\'ordre 2 de e^(ax) en 0 est 1 + ax + a²x² + x²·ε(x).', pred: 'a^2=a^2/2', v: 'a', dom: 'R', ans: '1', rule: 'a1_dl_factorial_missing', why: 'Faux : le coefficient de x² est a²/2! = a²/2. Avec a = 1 : 1 ≠ 1/2.' },
    { s: 'Pour tout réel a, le DL d\'ordre 2 de cos(ax) en 0 est 1 − a²x² + x²·ε(x).', pred: 'a^2=a^2/2', v: 'a', dom: 'R', ans: '1', rule: 'a1_dl_factorial_missing', why: 'Faux : cos u = 1 − u²/2 + …, donc le coefficient de x² est −a²/2. Avec a = 1 : −1 ≠ −1/2.' },
    { s: 'Pour tout réel b > 0, le DL d\'ordre 1 de 1/(b + x) en 0 est 1 − x + x·ε(x).', pred: '1/b=1∧1/b^2=1', v: 'b', dom: 'R+', ans: '2', rule: 'a1_dl_factor_out_constant', why: 'Faux : 1/(b + x) = (1/b)·1/(1 + x/b) = 1/b − x/b² + x·ε(x). Avec b = 2 : 1/2 ≠ 1.' },
    { s: 'Pour tout réel a, le DL d\'ordre 2 de Log(1 + ax) en 0 est ax − a²x² + x²·ε(x).', pred: 'a^2=a^2/2', v: 'a', dom: 'R', ans: '1', rule: 'a1_dl_factorial_missing', why: 'Faux : Log(1 + u) = u − u²/2 + …, donc le coefficient de x² est −a²/2. Avec a = 1 : −1 ≠ −1/2.' },
  ];
  const b = rng.pick(bank);
  return tfItem({
    skill: US, level: 4, truth: false, key: b.s, statement: b.s, ruleIfTrue: b.rule,
    counter: { kind: 'refute', quants: [{ q: '∀', v: b.v, dom: b.dom }], pred: b.pred, ask: [{ v: b.v, label: `${b.v} =` }], answer: { [b.v]: b.ans } },
    explanation: b.why, exam: { format: 'tf', points: 1 }, expectedSec: 60,
  });
}

export const GEN = {
  [US]: usItem,
};

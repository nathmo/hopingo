// Generators of module G6, part b (unit `analyse0`, step U2). Catalogue:
// docs/universite/G-gymnase-2.md, G6. Skills: js/content/uni/analyse0-b.skills.js.
//
// g6-antideriv-usual: judge `antideriv` (start ∫ f dx, lines compared by
// differentiation, final with + C); the table of primitives is in
// js/cas/rules/g6b.js (tableTerms, primText), shared with the traps.
// g6-area: intersections by `solset`, then ∫ₐᵇ |f − g| dx by `definite`:
// the student removes the absolute value (the courbe du haut), writes the
// primitive in brackets and evaluates. A start with a kink inside the
// interval is never written (the quadrature would not settle): two pieces
// start as ∫ₐᵇ |f − g| + ∫ᵇᶜ |f − g|.
// Implicit derivatives and imposed tangents: analyse0-b-implicit.js.
//
// Levels: 1–2 guided, 3 choose the action (menus per reference line), 4
// free with hints, 5 alone. opts.exam = 'mcq' | 'tf' | 'open'.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { stripParen, walk } from '../../cas/ast.js';
import { substVar } from '../../cas/diff.js';
import { exactValue } from '../../cas/normal.js';
import { tableTerms, termText, primTerm, primText, sumText } from '../../cas/rules/g6b.js';
import { MT, fr, linesItem, mcq } from './kit.js';
import { trapAnswers } from '../../judges/diagnose.js';
import {
  q, qText, qPar, nz, modeOf, H, E, examOf, seg, xMinus, polyText, polyMul, polyAdd, polyScale, polyEval, polyPrim, polyTrim,
  blanked, blankWhere, withMenus, vfOptions,
} from './analyse0-b-kit.js';
import { GEN as IMPLICIT } from './analyse0-b-implicit.js';

const V = 'x';
const KEYS = ['calcx', 'calcfn', 'anal'];

// ======================================================================
// g6-antideriv-usual
// ======================================================================

const AD = 'g6-antideriv-usual';
const AD_SUB = [
  { id: 'rewrite', label: 'réécrire en puissances', skill: 'pow-rules' },
  { id: 'linear', label: 'linéarité', skill: AD },
  { id: 'table', label: 'table des primitives, + C', skill: AD },
  { id: 'const', label: 'calculer C', skill: AD },
];
const AD_CHOICES = [
  { id: 'rewrite', label: 'Réécrire en puissances : 1/xⁿ = x⁻ⁿ, √x = x^(1/2)' },
  { id: 'linear', label: 'Linéarité : sortir les constantes, une ∫ par terme' },
  { id: 'table', label: 'Lire la table des primitives, et ajouter + C' },
  { id: 'check', label: 'Contrôler en dérivant', why: 'On contrôle à la fin, quand la primitive est écrite : dérive-la, tu dois retrouver f.' },
  { id: 'deriv', label: 'Dériver chaque terme', rule: 'g6_antideriv_power_minus_one', why: 'On cherche une primitive : on ne dérive pas, on monte l\'exposant et on divise.' },
];

const POW = (c, n) => ({ c: Q.of(c), kind: 'pow', n: Q.of(n) });
const isIrregular = (t) => t.kind === 'pow' && !(t.n.isInt() && t.n.n >= 0) && !t.n.eq(-1);
const keyOf = (t) => `${t.kind}:${t.n ?? ''}:${t.a ?? ''}`;
const ORDER = (t) => {
  if (t.kind === 'pow') return t.n.n > 0 ? 10 - t.n.valueOf() : t.n.n === 0 ? 10 : 20 - t.n.valueOf();
  return { exp: 40, cos: 41, sin: 42, atan: 43 }[t.kind];
};

// A coefficient c for the term so that its primitive coefficient is nice.
function niceCoef(rng, t) {
  for (let i = 0; i < 40; i++) {
    const c = nz(rng, -6, 6);
    const p = primTerm({ ...t, c: q(c) });
    if (p.c.d <= 4 && Math.abs(p.c.n) <= 12 && (p.c.d === 1 || rng.chance(0.4))) return q(c);
  }
  return null;
}

// Terms of the integrand. kind 'poly' (gabarit 1: powers, roots, 1/xⁿ)
// or 'mix' (gabarit 2: with 1/x, eᵃˣ, cos, sin, 1/(1 + x²)). need: a
// list of term shapes that must appear.
function adTerms(rng, kind, count, need = []) {
  for (let i = 0; i < 200; i++) {
    const shapes = [...need];
    const pool = kind === 'poly'
      ? [() => POW(1, rng.int(0, 4)), () => POW(1, rng.int(1, 4)), () => POW(1, rng.pick([-2, -3])), () => POW(1, rng.pick([q(1, 2), q(-1, 2)]))]
      : [() => POW(1, rng.int(0, 3)), () => POW(1, rng.int(1, 3)), () => POW(1, -1), () => ({ c: q(1), kind: 'exp', a: q(rng.pick([1, 2, 3, -1, -2])) }),
        () => ({ c: q(1), kind: rng.pick(['cos', 'sin']), a: q(rng.pick([1, 2, 3])) }), () => ({ c: q(1), kind: 'atan' })];
    while (shapes.length < count) shapes.push(rng.pick(pool)());
    const keys = shapes.map(keyOf);
    if (new Set(keys).size !== keys.length) continue;
    const terms = [];
    for (const s of shapes) {
      const c = s.kind === 'atan' ? q(rng.pick([1, 2, 3, -1, -2])) : niceCoef(rng, s);
      if (!c) break;
      terms.push({ ...s, c });
    }
    if (terms.length !== shapes.length) continue;
    // At most one fractional coefficient in the primitive.
    if (terms.filter((t) => primTerm(t).c.d !== 1).length > 1) continue;
    terms.sort((a, b) => ORDER(a) - ORDER(b));
    if (terms[0].kind === 'pow' && terms[0].n.n === 0) continue;
    // The integrand reads back as the same terms (the traps need it).
    const f = sumText(terms.map((t) => termText(t)));
    const back = tableTerms(parse(f));
    if (!back || back.length !== terms.length) continue;
    return { terms };
  }
  return null;
}
const AD_FALLBACK = () => ({ terms: [POW(3, 2), POW(-4, -1), { c: q(2), kind: 'exp', a: q(1) }, { c: q(1), kind: 'cos', a: q(1) }], fallback: true });

function adData(rng, kind, count, need) {
  return adTerms(rng, kind, count, need) || AD_FALLBACK();
}

// f written so that it must first be rewritten as a sum of terms of the
// table: a fraction over x to split (« frac »), a product to expand
// (« factor »), or roots and 1/xⁿ to write as powers (« powers »).
// → {packed, goal, how} or null.
const gcdInt = (a, b) => (b ? gcdInt(b, a % b) : Math.abs(a));
function pack(terms) {
  const natural = sumText(terms.map((t) => termText(t)));
  const pw = terms.filter((t) => t.kind === 'pow' && t.n.isInt() && t.n.n >= 0);
  const inv = terms.find((t) => t.kind === 'pow' && t.n.eq(-1));
  const others = (used) => terms.filter((t) => !used.includes(t)).map((t) => termText(t));
  if (inv && pw.length) {
    const top = Math.max(...pw.map((t) => t.n.n)) + 1;
    const cs = Array.from({ length: top + 1 }, () => q(0));
    for (const t of [...pw, inv]) cs[t.n.n + 1] = t.c;
    return { packed: sumText([`(${polyText(cs)})/x`, ...others([...pw, inv])]), goal: natural, how: 'frac' };
  }
  if (terms.some(isIrregular)) return { packed: natural, goal: sumText(terms.map((t) => termText(t, V, 'power'))), how: 'powers' };
  const pos = pw.filter((t) => t.n.n >= 1);
  if (pos.length >= 2 && pos.every((t) => t.c.d === 1)) {
    const m = Math.min(...pos.map((t) => t.n.n));
    const top = Math.max(...pos.map((t) => t.n.n)) - m;
    const cs = Array.from({ length: top + 1 }, () => q(0));
    for (const t of pos) cs[t.n.n - m] = t.c;
    // A common factor in front: 2x(x − 3), −x(3x + 2).
    const g = pos.reduce((acc, t) => gcdInt(acc, t.c.n), 0) * (cs[top].n < 0 ? -1 : 1);
    const inner = polyText(cs.map((c) => c.div(g)));
    const out = `${g === 1 ? '' : g === -1 ? '-' : g}${m === 1 ? 'x' : `x^${m}`}`;
    return { packed: sumText([`${out}(${inner})`, ...others(pos)]), goal: natural, how: 'factor' };
  }
  return null;
}
const REWRITE_NOTE = { frac: 'Séparer la fraction : (a + b)/x = a/x + b/x', factor: 'Développer', powers: 'Réécrire en puissances' };

function adShape(d) {
  const f = sumText(d.terms.map((t) => termText(t)));
  const pk = pack(d.terms) || { packed: f, goal: f, how: 'none' };
  const style = pk.how === 'powers' ? 'power' : 'natural';
  const intOf = (t) => {
    const body = termText({ ...t, c: q(1) }, V, style);
    const a = t.c.n < 0 ? t.c.neg() : t.c;
    const pre = a.eq(1) ? '' : a.d === 1 ? String(a.n) : `(${qText(a)})`;
    return `${t.c.n < 0 ? '-' : ''}${pre}int(${body},x)`;
  };
  const lin = sumText(d.terms.map(intOf));
  const F = primText(d.terms);
  const domain = d.terms.some((t) => t.kind === 'pow' && !t.n.isInt()) ? { x: [0.2, 3] } : { x: [-3, 3] };
  return { terms: d.terms, f, ...pk, lin, F, intOf, domain, start: `int(${f},x)`, start1: `int(${pk.goal},x)` };
}

const adJudge = (s) => ({ kind: 'antideriv', v: V, domain: s.domain });
const rwJudge = (s) => ({ kind: 'equiv', vars: [V], target: 'goal', goal: s.goal, domain: s.domain });
const adPrompt = (rng, s) => rng.pick([
  `Calcule ${MT(`int(${s.packed},x)`)}.`,
  `Trouve les primitives de f(x) = ${MT(s.packed)}.`,
]);

function templateText(s) {
  // The answer with its last term replaced by a box.
  const pieces = s.terms.map((t, i) => (i === s.terms.length - 1 ? (primTerm(t).c.n < 0 ? '-□' : '□') : termText(primTerm(t))));
  return `${sumText(pieces)}+C`;
}
const adHints = (s) => H(
  'Écris d\'abord f comme une somme de termes de la table, puis intègre terme par terme (∫xⁿ dx = xⁿ⁺¹/(n + 1), ∫dx/x = ln|x|…) ; vérifie en dérivant.',
  `= ${MT(templateText(s))}`,
  `= ${MT(`${s.F}+C`)}`,
);

// Draws terms until f can be packed (a rewrite to do first).
function adDraw(rng, make) {
  for (let i = 0; i < 200; i++) {
    const d = make();
    if (d && pack(d.terms)) return d;
  }
  return AD_FALLBACK();
}

// The item: part 1 rewrites f (equiv, target goal), part 2 integrates
// (antideriv), part 3 (level 5) finds C. rw: the rewrite line (with its
// blanks); intLines: the lines of part 2, decisions and notes first.
function adItemOf(level, rng, opts, s, { rw, intLines, extra = [], prompt, key, fallback }) {
  const j1 = withMenus(rwJudge(s), level, s.packed, [rw], AD_CHOICES);
  const j2 = withMenus(adJudge(s), level, s.start1, intLines, AD_CHOICES);
  const script = [rw, seg('Intègre terme par terme :', null, s.start1, j2), ...intLines, ...extra];
  const decided = script.filter((l) => l.kind === 'decision').flatMap((l) => l.options.map((x) => x.rule)).filter(Boolean);
  const baits = [...new Set([...trapAnswers('antideriv', parse(s.start1), adJudge(s)).map((t) => t.rule), ...decided])];
  return linesItem({
    skill: AD, level, prompt: prompt || `${adPrompt(rng, s)} Écris d'abord f(x) comme une somme de termes de la table.`,
    start: s.packed, judge: j1, mode: opts.exam ? 'free' : modeOf(level), script, baits,
    tapActions: level === 3 && !opts.exam ? 'steps' : null,
    hints: adHints(s), subgoals: AD_SUB, keys: KEYS, key: key || `${AD}:${s.packed}`, exam: examOf(opts, level === 5 ? 2 : 1), fallback: !!fallback,
  });
}

const rwLine = (s) => E(s.goal, REWRITE_NOTE[s.how] || 'Réécrire', 'rewrite', 'rewrite');
const adLines = (s) => [E(s.lin, 'Linéarité', 'linear', 'linear'), E(`${s.F}+C`, 'Table des primitives, + C', 'table', 'table')];

// Level 1: powers to rewrite, holes in the exponents.
function adLevel1(rng, opts) {
  const d = adDraw(rng, () => adTerms(rng, 'poly', 3, [POW(1, rng.pick([-2, -3, q(1, 2), q(-1, 2)]))]));
  const s = adShape(d);
  // Holes on the exponents of x^(…) (all of them in the answer).
  const expHoles = (node, all) => {
    const exps = new Set();
    walk(node, (n) => { if (n.t === 'pow' && stripParen(n.b).t === 'sym' && (all || stripParen(n.e).t !== 'num')) exps.add(n.e); return true; });
    return exps;
  };
  const fin = `${primText(d.terms, V, () => 'right', 'power')}+C`;
  const rwNode = parse(s.goal);
  const finNode = parse(fin);
  const rwSet = expHoles(rwNode, false);
  const finSet = expHoles(finNode, true);
  const rw = blankWhere(rwLine(s), (n) => rwSet.has(n), {}, 3, rwNode);
  const finalLine = blankWhere(E(fin, 'Monter l\'exposant, diviser ; + C', 'table'), (n) => finSet.has(n), {}, 3, finNode);
  return adItemOf(1, rng, opts, s, {
    rw,
    intLines: [{ kind: 'note', html: '∫xⁿ dx = xⁿ⁺¹/(n + 1) : on monte l\'exposant de 1, et on divise par le nouvel exposant.' }, finalLine],
    prompt: `${adPrompt(rng, s)} 1/xⁿ = x⁻ⁿ et √x = x^(1/2) : écris d'abord chaque terme comme une puissance de x.`,
    fallback: d.fallback,
  });
}

// Level 2: one term at a time, the other ∫ kept; a decision first.
function adLevel2(rng, opts) {
  const withLn = rng.chance(0.6);
  const d = adDraw(rng, () => adTerms(rng, 'mix', rng.int(2, 3), withLn ? [POW(1, -1), POW(1, rng.int(0, 2))] : [POW(1, rng.int(2, 3)), POW(1, 1)]));
  const s = adShape(d);
  const T = d.terms;
  const linNode = parse(s.lin);
  const bodies = new Set();
  walk(linNode, (n) => { if (n.t === 'int' && bodies.size < 2) bodies.add(n.e); return true; });
  const lines = [blankWhere(E(s.lin, 'Linéarité : une ∫ par terme', 'linear'), (n) => bodies.has(n), {}, 2, linNode)];
  for (let k = 1; k <= T.length; k++) {
    const pieces = T.map((t, i) => (i < k ? termText(primTerm(t)) : s.intOf(t)));
    const last = k === T.length;
    const math = last ? `${sumText(pieces)}+C` : sumText(pieces);
    const p = primTerm(T[k - 1]);
    const hole = termText({ ...p, c: p.c.n < 0 ? p.c.neg() : p.c });
    const line = blanked(E(math, last ? 'Dernier terme, + C' : 'Un terme avec la table', 'table'), [hole]);
    lines.push(line.blanks ? line : blanked(line, [termText(p)]));
  }
  const ln = T.find((t) => t.kind === 'pow' && t.n.eq(-1));
  const pw = T.find((t) => t.kind === 'pow' && t.n.n >= 2);
  const decision = ln || !pw
    ? { kind: 'decision', prompt: 'Une primitive de 1/x, c\'est…', options: [
      { id: 'abs', label: MT('ln(|x|)'), valid: true, ref: true },
      { id: 'ln', label: MT('ln(x)'), valid: false, rule: 'g6_ln_abs', why: 'ln x n\'existe que pour x > 0, alors que 1/x existe aussi pour x < 0 : écris ln|x|.' },
      { id: 'pow', label: MT('x^0/0'), valid: false, rule: 'g6_antideriv_power_minus_one', why: 'xⁿ⁺¹/(n + 1) ne marche pas pour n = −1 : on diviserait par 0. La primitive de 1/x est ln|x|.' },
    ] }
    : { kind: 'decision', prompt: `Une primitive de ${MT(`x^${pw.n.n}`)}, c'est…`, options: [
      { id: 'up', label: MT(`x^${pw.n.n + 1}/${pw.n.n + 1}`), valid: true, ref: true },
      { id: 'down', label: MT(`${pw.n.n}x^${pw.n.n - 1}`), valid: false, rule: 'g6_antideriv_power_minus_one', why: `C'est la dérivée. Pour une primitive, on monte l'exposant : ${pw.n.n} → ${pw.n.n + 1}, et on divise par ${pw.n.n + 1}.` },
      { id: 'nodiv', label: MT(`x^${pw.n.n + 1}`), valid: false, why: `Dérive x^${pw.n.n + 1} : tu obtiens ${pw.n.n + 1}x^${pw.n.n}. Il faut encore diviser par ${pw.n.n + 1}.` },
    ] };
  // The rewrite with one term left blank.
  const first = T[0];
  const rw = blanked(rwLine(s), [termText({ ...first, c: first.c.n < 0 ? first.c.neg() : first.c })]);
  return adItemOf(2, rng, opts, s, { rw, intLines: [decision, ...lines], fallback: d.fallback });
}

function adFree(level, rng, opts) {
  const d = rng.chance(0.4)
    ? adDraw(rng, () => adTerms(rng, 'poly', 3, [POW(1, rng.pick([-2, -3, q(1, 2), q(-1, 2)]))]))
    : adDraw(rng, () => adTerms(rng, 'mix', rng.int(3, 4), rng.chance(0.7) ? [POW(1, -1), POW(1, rng.int(1, 3))] : [POW(1, rng.int(2, 3)), POW(1, 1)]));
  const s = adShape(d);
  return adItemOf(level, rng, opts, s, { rw: rwLine(s), intLines: adLines(s), fallback: d.fallback });
}

// Level 5 (gabarit 3): the primitive with F(x₀) = y₀.
function adLevel5(rng, opts) {
  let pick = null;
  for (let i = 0; i < 200 && !pick; i++) {
    const at0 = rng.chance(0.5);
    const d = at0
      ? adTerms(rng, 'mix', 3, [POW(1, rng.int(2, 3)), POW(1, 1), rng.chance(0.5) ? { c: q(1), kind: 'exp', a: q(rng.pick([1, 2, -1])) } : { c: q(1), kind: rng.pick(['cos', 'sin']), a: q(rng.pick([1, 2])) }])
      : adTerms(rng, 'poly', 3, [POW(1, rng.pick([-2, q(1, 2), q(-1, 2)])), POW(1, rng.int(1, 3))]);
    if (!d || !pack(d.terms)) continue;
    const x0 = at0 ? 0 : 1;
    if (at0 && d.terms.some((t) => t.kind === 'pow' && t.n.n < 0)) continue;
    if (!at0 && d.terms.some((t) => t.kind !== 'pow')) continue;
    const F0 = exactValue(substVar(parse(primText(d.terms)), V, parse(String(x0))));
    if (!F0 || F0.d > 6) continue;
    const C = q(nz(rng, -5, 5));
    const y0 = F0.add(C);
    if (!y0.isInt()) {
      // y₀ a whole number, C a fraction.
      const y = q(Math.round(y0.valueOf()) || 1);
      pick = { d, x0, F0, y0: y, C: y.sub(F0) };
    } else pick = { d, x0, F0, y0, C };
  }
  pick ||= { d: { terms: [POW(3, 2), POW(2, 1), { c: q(2), kind: 'exp', a: q(1) }] }, x0: 0, F0: q(2), y0: q(5), C: q(3), fallback: true };
  const s = adShape(pick.d);
  const at = sumText(pick.d.terms.map((t) => termText(primTerm(t), `(${pick.x0})`))).replace(/\(\((-?\d+)\)\)/g, '($1)');
  const extra = [
    seg(`F(${pick.x0}) = ${fr(qText(pick.y0))} : trouve C.`, null, `${at}+C=${qText(pick.y0)}`, { kind: 'solset', v: 'C' }),
    ...(pick.F0.n === 0 ? [] : [E(`${qText(pick.F0)}+C=${qText(pick.y0)}`, 'Calculer F(x₀)', 'const')]),
    E(`C=${qText(pick.C)}`, 'Isoler C', 'const'),
  ];
  return adItemOf(5, rng, opts, s, {
    rw: rwLine(s), intLines: adLines(s), extra, fallback: pick.fallback,
    prompt: `Trouve la primitive F de f(x) = ${MT(s.packed)} telle que F(${pick.x0}) = ${fr(qText(pick.y0))}.`,
    key: `${AD}:${s.packed}:${pick.x0}:${qText(pick.y0)}`,
  });
}

function adMcq(rng) {
  const d = adData(rng, 'mix', 3, [POW(1, rng.int(2, 3)), POW(1, -1), rng.chance(0.5) ? { c: q(1), kind: 'exp', a: q(rng.pick([2, 3, -2])) } : { c: q(1), kind: rng.pick(['cos', 'sin']), a: q(rng.pick([2, 3])) }]);
  const s = adShape(d);
  const T = d.terms;
  const right = `${primText(T)}+C`;
  // Without dividing by a in eᵃˣ, cos(ax), sin(ax).
  const noA = `${sumText(T.map((t) => (t.a && !t.a.eq(1) ? termText({ ...primTerm(t), c: primTerm(t).c.mul(t.a) }) : termText(primTerm(t)))))}+C`;
  const options = [
    { text: right, correct: true },
    { text: `${primText(T, V, () => 'noabs')}+C`, correct: false, rule: 'g6_ln_abs' },
    { text: `${primText(T, V, (i, t) => (t.kind === 'pow' && t.n.n !== 0 ? 'deriv' : 'right'))}+C`, correct: false, rule: 'g6_antideriv_power_minus_one' },
    { text: noA, correct: false },
  ];
  const seen = new Set();
  const opts = options.filter((o) => { const k = toText(parse(o.text)); if (seen.has(k)) return false; seen.add(k); return true; });
  return mcq({
    skill: AD, level: 4, prompt: `Quelles sont les primitives de f(x) = ${MT(s.f)} ?`,
    options: opts.map((o) => ({ html: MT(o.text), correct: o.correct, rule: o.rule })),
    key: `mcq:${s.start}`, exam: { format: 'mcq', points: 1 }, fallback: !!d.fallback,
    solution: [{ html: `${MT(s.start)} = ${MT(s.lin)} = ${MT(right)}`, note: '' }],
  }, rng);
}

function adTf(rng) {
  const kind = rng.pick(['bank', 'gen', 'gen']);
  if (kind === 'bank') {
    const bank = [
      { s: `Sur ]−∞ ; 0[, ${MT('ln(x)')} est une primitive de ${MT('1/x')}.`, truth: false, rule: 'g6_ln_abs', why: `Faux : ln x n'existe pas pour x < 0. Sur ]−∞ ; 0[, une primitive de 1/x est ${MT('ln(|x|)')} = ln(−x).` },
      { s: `Sur ]−∞ ; 0[, ${MT('ln(|x|)')} est une primitive de ${MT('1/x')}.`, truth: true, why: 'Vrai : pour x < 0, ln|x| = ln(−x), dont la dérivée est −1/(−x) = 1/x.' },
      { s: `Une primitive de ${MT('x^3')} est ${MT('3x^2')}.`, truth: false, rule: 'g6_antideriv_power_minus_one', why: `Faux : 3x² est la dérivée de x³. Une primitive est ${MT('x^4/4')} : sa dérivée est x³.` },
      { s: `Une primitive de ${MT('e^(2x)')} est ${MT('e^(2x)/2')}.`, truth: true, why: 'Vrai : la dérivée de e^(2x)/2 est 2·e^(2x)/2 = e^(2x).' },
      { s: 'Si F est une primitive de f, alors F + 5 aussi.', truth: true, why: 'Vrai : (F + 5)′ = F′ = f. C\'est pour cela qu\'on écrit + C.' },
      { s: `Une primitive de ${MT('cos(3x)')} est ${MT('sin(3x)')}.`, truth: false, why: `Faux : (sin 3x)′ = 3cos 3x. Une primitive de cos 3x est ${MT('sin(3x)/3')}.` },
      { s: `Une primitive de ${MT('1/x^2')} est ${MT('-1/x')}.`, truth: true, why: 'Vrai : 1/x² = x⁻², et x⁻¹/(−1) = −1/x. Contrôle : (−1/x)′ = 1/x².' },
    ];
    const i = rng.int(0, bank.length - 1);
    const b = bank[i];
    return mcq({
      skill: AD, level: 4, prompt: `Vrai ou faux ?<br>« ${b.s} »`, options: vfOptions(b.truth, b.rule), keepOrder: true,
      key: `tf:bank${i}`, exam: { format: 'tf', points: 1 }, solution: [{ html: b.why, note: '' }], expectedSec: 30,
    }, rng);
  }
  const d = adData(rng, 'mix', 3, [rng.chance(0.5) ? POW(1, -1) : POW(1, rng.int(2, 3))]);
  const s = adShape(d);
  const right = `${s.F}+C`;
  const traps = [
    d.terms.some((t) => t.kind === 'pow' && t.n.eq(-1)) ? { text: `${primText(d.terms, V, () => 'noabs')}+C`, rule: 'g6_ln_abs' } : null,
    { text: `${primText(d.terms, V, (i, t) => (t.kind === 'pow' && t.n.n !== 0 ? 'deriv' : 'right'))}+C`, rule: 'g6_antideriv_power_minus_one' },
  ].filter(Boolean);
  const truth = rng.chance(0.4);
  const claim = truth ? { text: right } : rng.pick(traps);
  const where = d.terms.some((t) => t.kind === 'pow' && !t.n.isInt()) ? 'Sur ]0 ; +∞[' : d.terms.some((t) => t.kind === 'pow' && t.n.n < 0) ? 'Sur chaque intervalle de ℝ*' : 'Sur ℝ';
  return mcq({
    skill: AD, level: 4, prompt: `Vrai ou faux ? ${where} :<br>${MT(`${s.start}=${claim.text}`, {}, true)}`,
    options: vfOptions(truth, claim.rule), keepOrder: true, key: `tf:${s.start}:${truth}`, exam: { format: 'tf', points: 1 }, fallback: !!d.fallback,
    solution: [{ html: `${MT(s.start)} = ${MT(right)}. Contrôle en dérivant.`, note: '' }], expectedSec: 40,
  }, rng);
}

function adItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return adMcq(rng);
  if (opts.exam === 'tf') return adTf(rng);
  if (level === 1) return adLevel1(rng, opts);
  if (level === 2) return adLevel2(rng, opts);
  if (level === 5) return adLevel5(rng, opts);
  return adFree(level, rng, opts);
}

// ======================================================================
// g6-area
// ======================================================================

const AR = 'g6-area';
const AR_SUB = [
  { id: 'inter', label: 'intersections', skill: 'quad-formula' },
  { id: 'top', label: 'courbe du haut', skill: AR },
  { id: 'prim', label: 'primitive', skill: AD },
  { id: 'eval', label: 'évaluer aux bornes', skill: AR },
];
const AR_INTER = [
  { id: 'inter', label: 'Chercher les intersections : f(x) = g(x)' },
  { id: 'top', label: 'Choisir la courbe du haut' },
  { id: 'prim', label: 'Écrire une primitive entre crochets' },
  { id: 'eval', label: 'Évaluer aux bornes : F(b) − F(a)' },
];
const AR_INT = [
  { id: 'inter', label: 'Chercher les intersections' },
  { id: 'top', label: 'Enlever la valeur absolue : intégrer (haut − bas) sur chaque morceau' },
  { id: 'prim', label: 'Écrire une primitive entre crochets' },
  { id: 'eval', label: 'Évaluer aux bornes : F(b) − F(a)' },
  { id: 'abs', label: 'Enlever la valeur absolue sans regarder le signe', rule: 'g6_area_signed', why: 'Une aire est positive : regarde quelle courbe est au-dessus sur chaque morceau.' },
];

// The two curves: f − g = k·(x − r₁)(x − r₂)[(x − r₃)]. kind 'line'
// (parabola and line), 'para' (two parabolas), 'axis' (curve and Ox),
// 'cubic' (three intersections, two pieces).
function arData(rng, kind) {
  for (let i = 0; i < 200; i++) {
    const cubic = kind === 'cubic' || kind === 'cubicAxis';
    let roots;
    if (cubic) {
      const r = [rng.int(-3, 2)];
      r.push(r[0] + rng.int(1, 2));
      r.push(r[1] + rng.int(1, 2));
      if (rng.chance(0.6) && !r.includes(0)) continue;
      roots = r;
    } else {
      const a = rng.int(-3, 2);
      roots = [a, a + rng.int(2, 4)];
    }
    const k = cubic ? rng.pick([1, -1]) : rng.pick([1, -1, 1, -1, 2, -2]);
    let diffP = [q(k)];
    for (const r of roots) diffP = polyMul(diffP, [q(-r), q(1)]);
    let g;
    if (kind === 'line' || kind === 'cubic') g = [q(rng.int(-4, 4)), q(nz(rng, -3, 3))];
    else if (kind === 'para') g = [q(rng.int(-3, 3)), q(rng.int(-3, 3)), q(nz(rng, -2, 2))];
    else g = [q(0)];
    const f = polyTrim(polyAdd(g, diffP));
    if (kind === 'para' && (f.length < 3 || f[2].n === 0)) continue;
    if (f.some((c) => Math.abs(c.n) > 12)) continue;
    if (kind === 'line' && g[1].n === 0) continue;
    return { kind, roots, k, f, g: polyTrim(g), diffP };
  }
  return { kind: 'line', roots: [-1, 3], k: 1, f: [q(0), q(0), q(1)], g: [q(3), q(2)], diffP: [q(-3), q(-2), q(1)], fallback: true };
}

// The reference solution: intersections (solset), then the area (definite).
function arShape(d) {
  const fT = polyText(d.f);
  const gT = polyText(d.g);
  const axis = d.g.length === 1 && d.g[0].n === 0;
  const eq = axis ? `${fT}=0` : `${fT}=${gT}`;
  const diffT = polyText(d.diffP);
  const lead = d.k === 1 ? '' : d.k === -1 ? '-' : `${d.k}`;
  const factored = `${lead}${d.roots.map((r) => (r === 0 ? 'x' : `(${xMinus(r)})`)).join('')}`.replace(/^(-?\d*)x\(/, '$1x(');
  const sols = d.roots.map((r) => `x=${r}`).join(' ou ');
  const inter = [
    ...(axis ? [] : [E(`${diffT}=0`, 'Tout du même côté', 'inter', 'inter')]),
    E(`${factored}=0`, 'Factoriser', 'inter', 'inter'),
    E(sols, 'Produit nul', 'inter', 'inter'),
  ];
  // Pieces between consecutive roots: on each, top − bottom = s·(f − g).
  const pieces = [];
  for (let j = 0; j + 1 < d.roots.length; j++) {
    const [a, b] = [d.roots[j], d.roots[j + 1]];
    const mid = (a + b) / 2;
    const sgn = Math.sign(polyEval(d.diffP, q(Math.round(mid * 2), 2)).valueOf());
    const integrand = polyScale(d.diffP, sgn);
    const P = polyPrim(integrand);
    const Fb = polyEval(P, b);
    const Fa = polyEval(P, a);
    pieces.push({ a, b, sgn, integrand, P, Fb, Fa, value: Fb.sub(Fa), top: sgn > 0 ? 'f' : 'g' });
  }
  const area = pieces.reduce((s, p) => s.add(p.value), q(0));
  const absText = axis ? `|${fT}|` : `|${fT}-(${gT})|`;
  const start = pieces.map((p) => `int(${absText},x,${p.a},${p.b})`).join('+');
  const intLine = pieces.map((p) => `int(${polyText(p.integrand)},x,${p.a},${p.b})`).join('+');
  const brLine = pieces.map((p) => `bracket(${polyText(p.P)},x,${p.a},${p.b})`).join('+');
  const negPar = (x) => (x.n < 0 ? `(${qText(x)})` : qText(x));
  const pieceText = (p) => (p.Fa.n === 0 ? qText(p.Fb) : `${qText(p.Fb)}-${negPar(p.Fa)}`);
  const numLine = pieces.length === 1 ? pieceText(pieces[0])
    : pieces.map((p, j) => (j > 0 || /.-/.test(pieceText(p)) ? `(${pieceText(p)})` : pieceText(p))).join('+');
  const areaLines = [
    E(intLine, pieces.length > 1 ? 'Courbe du haut sur chaque morceau' : 'Courbe du haut : intégrer (haut − bas)', 'top', 'top'),
    E(brLine, 'Primitive', 'prim', 'prim'),
    ...(numLine !== qText(area) ? [E(numLine, 'F(b) − F(a)', 'eval', 'eval')] : []),
    E(qText(area), 'Calculer', 'eval', 'eval'),
  ];
  return { fT, gT, axis, eq, inter, pieces, area, start, areaLines, absText, intLine };
}

const arPrompt = (rng, s) => (s.axis
  ? rng.pick([
    `Calcule l'aire du domaine limité par la courbe y = ${MT(s.fT)} et l'axe Ox.`,
    `Quelle est l'aire comprise entre le graphe de f(x) = ${MT(s.fT)} et l'axe des x ?`,
  ])
  : rng.pick([
    `Calcule l'aire du domaine limité par les courbes y = ${MT(s.fT)} et y = ${MT(s.gT)}.`,
    `Soient f(x) = ${MT(s.fT)} et g(x) = ${MT(s.gT)}. Calcule l'aire du domaine compris entre leurs graphes.`,
  ]));

const curveName = (s, which) => (which === 'f' ? `y = ${MT(s.fT)}` : s.axis ? 'l\'axe Ox' : `y = ${MT(s.gT)}`);

function arTopDecision(s) {
  const p = s.pieces[0];
  const t = Math.floor((p.a + p.b) / 2) === p.a ? p.a + 0.5 : Math.floor((p.a + p.b) / 2);
  const tT = Number.isInteger(t) ? String(t) : qText(q(2 * t, 2));
  const other = p.top === 'f' ? 'g' : 'f';
  return {
    kind: 'decision', prompt: `Sur ]${fr(p.a)} ; ${fr(p.b)}[, quelle courbe est au-dessus ?`, options: [
      { id: 'top', label: curveName(s, p.top), valid: true, ref: true, why: `Teste un point, par exemple x = ${fr(tT)}.` },
      { id: 'bottom', label: curveName(s, other), valid: false, rule: 'g6_area_signed', why: `Teste un point, par exemple x = ${fr(tT)} : c'est l'autre courbe qui est au-dessus. Avec (bas − haut), l'intégrale serait négative.` },
    ],
  };
}

function arCutDecision(s) {
  const [p1, p2] = s.pieces;
  const iv = (p) => `]${fr(p.a)} ; ${fr(p.b)}[`;
  const name = (w) => (w === 'f' ? MT(s.fT) : s.axis ? 'Ox' : MT(s.gT));
  return {
    kind: 'decision', prompt: `${s.axis ? 'La courbe coupe l’axe Ox' : 'Les courbes se croisent'} en x = ${fr(p1.b)}. Qui est au-dessus sur chaque morceau ?`, options: [
      { id: 'swap', label: `${name(p1.top)} sur ${iv(p1)}, puis ${name(p2.top)} sur ${iv(p2)}`, valid: true, ref: true },
      { id: 'same', label: `${name(p1.top)} sur les deux morceaux`, valid: false, rule: 'g6_area_signed', why: `Teste un point de chaque morceau : la courbe du haut change en x = ${fr(p1.b)}. Avec le même ordre partout, le second morceau compterait négativement.` },
      { id: 'same2', label: `${name(p2.top)} sur les deux morceaux`, valid: false, rule: 'g6_area_signed', why: `Teste un point de chaque morceau : la courbe du haut change en x = ${fr(p1.b)}. Avec le même ordre partout, le premier morceau compterait négativement.` },
    ],
  };
}

const arHints = (s) => H(
  'Trouve les intersections, puis intègre (haut − bas) sur chaque morceau : une aire est positive.',
  `${s.pieces.map((p) => `[${MT(polyText(p.P))}] de ${fr(p.a)} à ${fr(p.b)}`).join(' + ').replace(/de -?\d+ à/, 'de □ à')}`,
  MT(qText(s.area)),
);

function arPick(level, rng) {
  if (level === 5) return rng.pick(['cubic', 'cubic', 'cubicAxis', 'axis']);
  if (level === 4) return rng.chance(1 / 3) ? 'cubic' : rng.pick(['line', 'para', 'axis']);
  return rng.pick(['line', 'line', 'para', 'axis']);
}

function arItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return arMcq(rng);
  if (opts.exam === 'tf') return arTf(rng);
  const lv = opts.exam === 'open' ? 5 : level;
  const d = arData(rng, arPick(lv, rng));
  const s = { ...arShape(d), f: d.f };
  const solJudge = { kind: 'solset', v: V };
  const defJudge = { kind: 'definite' };
  const key = `${AR}:${s.eq}`;
  if (level === 1 && !opts.exam) {
    // Bounds and the top curve given; the primitive with holes.
    const p = s.pieces[0];
    const start = `int(${polyText(p.integrand)},x,${p.a},${p.b})`;
    const lines = s.areaLines.slice(1).map((l, i) => (i === 0 ? blankWhere(l, (n) => n.t === 'frac' || (n.t === 'bin' && n.op === '×' && stripParen(n.r).t === 'pow'), {}, 2) : l));
    return linesItem({
      skill: AR, level, prompt: `Les courbes y = ${MT(s.fT)} et ${s.axis ? 'l\'axe Ox' : `y = ${MT(s.gT)}`} se coupent en x = ${fr(p.a)} et x = ${fr(p.b)} ; entre les deux, ${curveName(s, p.top)} est au-dessus. Calcule l'aire du domaine qu'elles limitent.`,
      start, judge: defJudge, mode: 'guided',
      script: [{ kind: 'note', html: `Aire = ∫ (haut − bas) dx = ${MT(start)}.` }, ...lines],
      hints: arHints(s), subgoals: AR_SUB, keys: KEYS, key, exam: false, fallback: !!d.fallback,
    });
  }
  const interLines = level === 2 ? s.inter.map((l, i) => (i === s.inter.length - 2 ? blankWhere(l, (n) => n.t === 'paren', {}, 2) : l)) : s.inter;
  const decisions = s.pieces.length > 1 ? [arCutDecision(s)] : [arTopDecision(s)];
  const areaLines = level === 2 ? s.areaLines.map((l, i) => (i === 1 ? blankWhere(l, (n) => n.t === 'frac', {}, 2) : l)) : s.areaLines;
  const script = [
    ...interLines,
    seg(s.pieces.length > 1 ? 'L\'aire est la somme des aires des deux morceaux :' : 'L\'aire vaut :', 'A =', s.start, withMenus(defJudge, level, s.start, s.areaLines, AR_INT)),
    ...(level <= 3 || opts.exam ? decisions : decisions),
    ...areaLines,
  ];
  // Decisions come right after the segment marker (shown before its first line).
  const ordered = [...interLines, script[interLines.length], ...decisions, ...areaLines];
  return linesItem({
    skill: AR, level, prompt: arPrompt(rng, s), start: s.eq, judge: withMenus(solJudge, level, s.eq, s.inter, AR_INTER),
    mode: opts.exam ? 'free' : modeOf(level), script, tapActions: level === 3 && !opts.exam ? 'steps' : null,
    hints: arHints(s), subgoals: AR_SUB, keys: [...KEYS, 'relation'], key, exam: examOf(opts, 3), fallback: !!d.fallback,
  });
}

function arMcq(rng) {
  const d = arData(rng, rng.pick(['line', 'para', 'axis', 'cubic']));
  const s = arShape(d);
  const A = s.area;
  const signed = s.pieces.length > 1
    ? s.pieces.reduce((t, p) => t.add(p.value.mul(p.sgn)), q(0))
    : A.neg();
  const cands = [
    { v: A, correct: true },
    { v: signed, rule: 'g6_area_signed' },
    { v: A.neg(), rule: 'g6_area_signed' },
    { v: s.pieces.reduce((t, p) => t.add(p.Fb.add(p.Fa)), q(0)) },
    { v: A.mul(2) },
    { v: A.div(2) },
  ];
  const seen = new Set();
  const options = [];
  for (const c of cands) {
    const k = qText(c.v);
    if (seen.has(k) || options.length >= 4) continue;
    seen.add(k);
    options.push({ html: MT(k), correct: !!c.correct, rule: c.rule || null });
  }
  const what = s.axis ? `la courbe y = ${MT(s.fT)} et l'axe Ox` : `les courbes y = ${MT(s.fT)} et y = ${MT(s.gT)}`;
  return mcq({
    skill: AR, level: 4, prompt: `Quelle est l'aire du domaine limité par ${what} ?`, options,
    key: `mcq:${s.eq}`, exam: { format: 'mcq', points: 1 }, fallback: !!d.fallback,
    solution: [{ html: `Intersections : ${s.pieces.map((p) => `x = ${fr(p.a)}`).join(', ')}, x = ${fr(s.pieces.at(-1).b)}. Aire = ${MT(s.intLine)} = ${MT(qText(A))}.`, note: '' }],
  }, rng);
}

function arTf(rng) {
  const kind = rng.pick(['bank', 'gen']);
  if (kind === 'bank') {
    const bank = [
      { s: `${MT('int(x^3,x,-1,1)=0')}, donc l'aire entre la courbe y = x³ et l'axe Ox sur [−1 ; 1] est nulle.`, truth: false, rule: 'g6_area_signed', why: `Faux : les deux morceaux se compensent dans l'intégrale, mais l'aire est ${MT('int(-x^3,x,-1,0)+int(x^3,x,0,1)')} = 1/4 + 1/4 = 1/2.` },
      { s: `L'aire entre y = x² et y = x sur [0 ; 1] vaut ${MT('int(x-x^2,x,0,1)')}.`, truth: true, why: 'Vrai : sur [0 ; 1], x ≥ x², donc on intègre (haut − bas) = x − x², ce qui donne 1/6.' },
      { s: `L'aire entre y = x² et y = x sur [0 ; 1] vaut ${MT('int(x^2-x,x,0,1)')}.`, truth: false, rule: 'g6_area_signed', why: 'Faux : sur [0 ; 1], x est au-dessus de x². Cette intégrale vaut −1/6 : une aire n\'est jamais négative.' },
      { s: 'Si f(x) ≥ g(x) sur [a ; b], l\'aire entre les deux courbes est ∫ₐᵇ (f − g) dx.', truth: true, why: 'Vrai : f est la courbe du haut sur tout l\'intervalle.' },
      { s: `${MT('int(sin(x),x,0,2π)=0')}, donc la courbe de sin et l'axe Ox ne limitent aucune aire sur [0 ; 2π].`, truth: false, rule: 'g6_area_signed', why: 'Faux : l\'aire vaut 2 + 2 = 4 ; dans l\'intégrale, le morceau sous l\'axe compte négativement.' },
    ];
    const i = rng.int(0, bank.length - 1);
    const b = bank[i];
    return mcq({
      skill: AR, level: 4, prompt: `Vrai ou faux ?<br>« ${b.s} »`, options: vfOptions(b.truth, b.rule), keepOrder: true,
      key: `tf:bank${i}`, exam: { format: 'tf', points: 1 }, solution: [{ html: b.why, note: '' }], expectedSec: 30,
    }, rng);
  }
  const d = arData(rng, rng.pick(['line', 'para']));
  const s = arShape(d);
  const p = s.pieces[0];
  const truth = rng.chance(0.5);
  const integrand = truth ? p.integrand : polyScale(p.integrand, -1);
  return mcq({
    skill: AR, level: 4,
    prompt: `Vrai ou faux ? Les courbes y = ${MT(s.fT)} et y = ${MT(s.gT)} se coupent en x = ${fr(p.a)} et x = ${fr(p.b)}, et l'aire qu'elles limitent vaut<br>${MT(`int(${polyText(integrand)},x,${p.a},${p.b})`, {}, true)}`,
    options: vfOptions(truth, 'g6_area_signed'), keepOrder: true, key: `tf:${s.eq}:${truth}`, exam: { format: 'tf', points: 1 }, fallback: !!d.fallback,
    solution: [{ html: `Sur ]${fr(p.a)} ; ${fr(p.b)}[, ${curveName(s, p.top)} est au-dessus : l'aire vaut ${MT(`int(${polyText(p.integrand)},x,${p.a},${p.b})`)} = ${MT(qText(s.area))}.`, note: '' }], expectedSec: 45,
  }, rng);
}

export const GEN = {
  [AD]: adItem,
  [AR]: arItem,
  ...IMPLICIT,
};

// n-order-read (module N, part b, step U9): read the order of a method on
// the ratios of its increments. Catalogue: docs/universite/N-analyse-numerique.md,
// n-order-read.
//
// Data: a reference method run in double precision (JS), as the programs
// print it: Newton on x² − c or x³ − c (order 2, constant |f″/(2f′)|),
// the fixed point x − ω(x² − 4) (order 1, constant |1 − 4ω|), Newton on a
// double root (order 1, constant 1/2), the secant (order ≈ 1,618: r₁ → 0,
// r₂ → ∞). Increments δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾|; rows with δ ∈ [10⁻¹³ ; 10⁻¹] are
// usable, at least 3, and the last two ratios of the true order agree to
// 10 %. The last printed row may be one of round-off (δ ≈ 10⁻¹⁶).
// L1 the ratios given, choose p (readtable); L2 two ratios to compute, then
// p (guided lines); L3 keep or ignore the round-off row, then p and the
// constant (choose the action); L4 raw increments: p and the constant, or
// the program `ratios`; L5 two methods side by side, several answers.
// Exam: mcq (a table, several answers), tf (statements, Vrai/Faux).

import { linesItem, examTag } from './kit.js';
import { partsItem, modeOf } from './geo-kit.js';
import {
  refCode, codeItem, holesFor, readtableItem, multiMcq, tableHtml, expText, H, blankBy, dec, vfMcq,
} from './numerique-kit.js';
import { mcq } from './kit.js';

export const OR = 'n-order-read';
const SUB = [
  { id: 'ratio', label: 'un rapport rₚ', skill: OR },
  { id: 'compare', label: 'p trop petit, p trop grand', skill: OR },
  { id: 'conclude', label: 'l\'ordre et la constante', skill: OR },
  { id: 'newton', label: 'les itérés de Newton', skill: 'n-newton' },
];
const KEYS = ['calc'];

// ---------- the reference runs ----------

function run(step, x0, x1 = null) {
  const d = [];
  let x = x0;
  let prev = x1 === null ? null : x0;
  if (x1 !== null) x = x1;
  if (x1 !== null) d.push(Math.abs(x1 - x0));
  for (let k = 0; k < 60; k++) {
    const nx = step(x, prev);
    if (!Number.isFinite(nx)) break;
    const inc = Math.abs(nx - x);
    prev = x;
    x = nx;
    if (inc === 0) break;
    d.push(inc);
    if (inc < 1e-14) break;
  }
  return d;
}

const ratio = (d, k, p) => d[k] / d[k - 1] ** p;

// method: {kind, label, f (text), p (1 | 2 | 'sec'), C (limit), d (increments)}
const METHODS = {
  sq(rng) {
    const c = rng.pick([2, 3, 5, 6, 7]);
    const x0 = rng.pick([3, 4, 5]);
    const a = Math.sqrt(c);
    return { kind: 'sq', p: 2, C: 1 / (2 * a), label: `la méthode de Newton sur f(x) = x² − ${c}, avec x⁽⁰⁾ = ${x0}`, short: `Newton, x² − ${c}`, d: run((x) => x - (x * x - c) / (2 * x), x0) };
  },
  cube(rng) {
    const c = rng.pick([2, 3, 5, 7, 10]);
    const x0 = rng.pick([2, 3]);
    const a = Math.cbrt(c);
    return { kind: 'cube', p: 2, C: 1 / a, label: `la méthode de Newton sur f(x) = x³ − ${c}, avec x⁽⁰⁾ = ${x0}`, short: `Newton, x³ − ${c}`, d: run((x) => x - (x ** 3 - c) / (3 * x * x), x0) };
  },
  fixed(rng) {
    const w = rng.pick([0.1, 0.15, 0.2, 0.3, 0.35]);
    return { kind: 'fixed', p: 1, C: Math.abs(1 - 4 * w), label: `l'itération de point fixe x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − ${dec(w)}(x⁽ᵏ⁾² − 4), avec x⁽⁰⁾ = 2,5`, short: `point fixe, ω = ${dec(w)}`, d: run((x) => x - w * (x * x - 4), 2.5) };
  },
  double(rng) {
    const g = rng.pick([{ g: (x) => Math.exp(x), dg: (x) => Math.exp(x), t: 'eˣ' }, { g: (x) => x + 2, dg: () => 1, t: '(x + 2)' }, { g: (x) => 1 + x * x, dg: (x) => 2 * x, t: '(1 + x²)' }]);
    const a = rng.pick([1, 2]);
    const x0 = a + rng.pick([1, 2]);
    const f = (x) => (x - a) ** 2 * g.g(x);
    const df = (x) => 2 * (x - a) * g.g(x) + (x - a) ** 2 * g.dg(x);
    return { kind: 'double', p: 1, C: 0.5, label: `la méthode de Newton sur f(x) = (x − ${a})²·${g.t}, avec x⁽⁰⁾ = ${x0}`, short: `Newton, racine double`, d: run((x) => x - f(x) / df(x), x0) };
  },
  secant(rng) {
    const c = rng.pick([2, 3, 5, 7]);
    const x0 = Math.floor(Math.sqrt(c));
    const f = (x) => x * x - c;
    return { kind: 'secant', p: 'sec', C: null, label: `la méthode de la sécante sur f(x) = x² − ${c}, avec x⁽⁰⁾ = ${x0} et x⁽¹⁾ = ${x0 + 1}`, short: `sécante, x² − ${c}`, d: run((x, xp) => x - (f(x) * (x - xp)) / (f(x) - f(xp)), x0, x0 + 1) };
  },
};

const usable = (d) => d.map((x, k) => ({ x, k })).filter(({ x }) => x >= 1e-13 && x <= 1e-1);

function method(rng, kinds, { roundoff = null } = {}) {
  for (let t = 0; t < 200; t++) {
    const m = METHODS[rng.pick(kinds)](rng);
    const u = usable(m.d);
    if (u.length < 3) continue;
    if (m.p !== 'sec') {
      const ks = u.map((z) => z.k).filter((k) => k >= 1);
      if (ks.length < 2) continue;
      const [a, b] = ks.slice(-2).map((k) => ratio(m.d, k, m.p));
      if (Math.abs(a - b) > 0.1 * Math.abs(b)) continue;
      m.Cread = b;
    }
    if (m.d.length > 9) m.d = m.d.slice(0, 9);
    const last = m.d[m.d.length - 1];
    if (roundoff === true && !(last < 1e-14)) continue;
    if (roundoff === false && last < 1e-13) m.d = m.d.slice(0, -1);
    // The values shown (4 significant digits) are the ones the student uses.
    m.d = m.d.map((x) => Number(x.toPrecision(4)));
    if (m.p !== 'sec') {
      const ks = usable(m.d).map((z) => z.k).filter((k) => k >= 1);
      m.Cread = ratio(m.d, ks[ks.length - 1], m.p);
    }
    return m;
  }
  const d = [5e-1, 2.037e-1, 3.536e-2, 1.010e-3, 8.107e-7, 5.216e-13];
  return { kind: 'cube', p: 2, C: 0.79, Cread: 0.794, label: 'la méthode de Newton sur f(x) = x³ − 2, avec x⁽⁰⁾ = 2', short: 'Newton, x³ − 2', d, fallback: true };
}

// The table: k, δₖ, and the ratios asked.
function table(m, ps = [1, 2, 3]) {
  const columns = ['k', 'δₖ', ...ps.map((p) => `r${'₀₁₂₃'[p]} = δₖ/δₖ₋₁${p === 1 ? '' : '⁰¹²³'[p]}`)];
  const rows = m.d.map((x, k) => [String(k), expText(x, 3), ...ps.map((p) => (k === 0 ? '' : dec(ratio(m.d, k, p), 3)))]);
  return { columns, rows };
}
const rawTable = (m) => table(m, []);

const pText = (m) => (m.p === 'sec' ? 'strictement entre 1 et 2' : `ordre ${m.p}`);

function orderOptions(m) {
  const opts = [
    { key: 1, html: 'Ordre 1 : r₁ se stabilise' },
    { key: 2, html: 'Ordre 2 : r₂ se stabilise' },
    { key: 3, html: 'Ordre 3 : r₃ se stabilise' },
    { key: 'sec', html: 'Entre 1 et 2 : r₁ → 0 et r₂ → ∞' },
  ];
  return opts.map((o) => ({
    html: o.html, correct: o.key === m.p,
    ...(o.key === 1 && m.p !== 1 ? { html: 'Ordre 1 : r₁ tend vers une constante (0)', rule: 'n_order_simple_ratio' } : {}),
  }));
}

// ---------- L1: read the ratios ----------

function level1(rng) {
  const m = method(rng, ['sq', 'cube', 'fixed', 'double', 'secant'], { roundoff: false });
  const t = table(m);
  return readtableItem({
    skill: OR, level: 1, key: `1:${m.kind}:${m.d[0]}`,
    prompt: `On applique ${m.label}. Le programme affiche les incréments δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| et leurs rapports :`,
    table: t,
    question: mcq({
      skill: OR, level: 1, key: `${OR}:1q:${m.kind}`, keepOrder: true,
      prompt: 'Quel est l\'ordre de la méthode ?',
      options: orderOptions(m),
      solution: [{ html: m.p === 'sec' ? 'r₁ tend vers 0 (p = 1 est trop petit) et r₂ vers l\'infini (p = 2 est trop grand) : l\'ordre est entre 1 et 2.' : `r${'₀₁₂₃'[m.p]} se stabilise vers ${dec(m.Cread, 2)} ≠ 0 : ${pText(m)}. Pour p plus petit, le rapport tend vers 0 ; pour p plus grand, vers l'infini.`, note: '' }],
    }, rng),
    hints: H('Cherche le p pour lequel δₖ/δₖ₋₁ᵖ ne tend ni vers 0 ni vers l\'infini.',
      'Regarde la dernière colonne qui ne tend ni vers 0 ni vers l\'infini : r₁ ? r₂ ? r₃ ?',
      m.p === 'sec' ? 'r₁ → 0 et r₂ → ∞ : l\'ordre est entre 1 et 2.' : `r${'₀₁₂₃'[m.p]} ≈ ${dec(m.Cread, 2)} : ${pText(m)}.`),
    subgoals: SUB, baits: ['n_order_simple_ratio'], fallback: m.fallback,
  });
}

// ---------- L2: compute two ratios, then p ----------

const sci = (x) => { const [a, e] = x.toExponential(3).split('e'); return `${a.replace('.', ',')}×10^(${Number(e)})`; };
// A ratio rounded to 2 significant digits, and the tolerance of that rounding.
const r2s = (x) => Number(x.toPrecision(2));
const tolOf = (x) => 10 ** (Math.floor(Math.log10(Math.abs(x))) - 1) * 0.6;

function ratioParts(m, p, ks, level) {
  return ks.map((k, i) => {
    const r = ratio(m.d, k, p);
    const expr = `${sci(m.d[k])}/(${sci(m.d[k - 1])})${p === 1 ? '' : `^${p}`}`;
    const v = dec(r2s(r), 2).replace('−', '-');
    return {
      ...(i === 0 ? {} : { html: `Le rapport suivant, k = ${k} :` }), ask: `r${'₀₁₂₃'[p]} (k = ${k}) =`, start: `r_${k}`,
      judge: { kind: 'stat', expect: String(r2s(r)), tol: tolOf(r) },
      menu: [{ id: 'ratio', label: `Diviser δ${'₀₁₂₃₄₅₆₇₈₉'[k]} par δ${'₀₁₂₃₄₅₆₇₈₉'[k - 1]}${p === 1 ? '' : '²'}`, valid: true }, { id: 'inv', label: `Diviser δ${'₀₁₂₃₄₅₆₇₈₉'[k - 1]} par δ${'₀₁₂₃₄₅₆₇₈₉'[k]}`, valid: false, why: 'Le rapport compare le nouvel incrément au précédent : δₖ au numérateur.' }],
      lines: [
        { math: expr, note: `δₖ/δₖ₋₁${p === 1 ? '' : '²'}`, subgoal: 'ratio', from: level <= 2 ? 1 : 9 },
        { math: v, note: '2 chiffres significatifs suffisent', subgoal: 'ratio', blank: [v] },
      ],
    };
  });
}

function orderPart(m, level) {
  const p = m.p;
  return {
    html: 'Conclusion :', ask: 'p =', start: 'p', judge: { kind: 'value', expect: String(p), form: 'any' },
    decisions: [{
      kind: 'decision', prompt: 'Que montrent les rapports ?', levels: [2, 3], options: p === 2 ? [
        { id: 'two', label: 'r₂ se stabilise vers une constante non nulle : ordre 2', valid: true, ref: true },
        { id: 'one', label: 'δₖ/δₖ₋₁ tend vers 0, donc la méthode est d\'ordre 1', valid: false, rule: 'n_order_simple_ratio', why: 'Pour p trop petit, le rapport tend vers 0 : il faut une constante non nulle.' },
        { id: 'three', label: 'Ordre 3 : il faut que r₃ soit petit', valid: false, why: 'r₃ tend vers l\'infini : p = 3 est trop grand.' },
      ] : [
        { id: 'one', label: 'r₁ se stabilise vers une constante non nulle (< 1) : ordre 1', valid: true, ref: true },
        { id: 'two', label: 'Ordre 2 : les incréments diminuent vite', valid: false, why: 'Avec p = 2, le rapport tend vers l\'infini : p = 2 est trop grand.' },
      ],
    }],
    menu: [{ id: 'p', label: 'Conclure l\'ordre', valid: true }, { id: 'more', label: 'Calculer un autre rapport', valid: false, why: 'Deux rapports qui se stabilisent suffisent.' }],
    lines: [{ math: String(p), note: p === 2 ? 'r₂ → constante non nulle' : 'r₁ → constante non nulle, < 1', subgoal: 'conclude', blank: [String(p)] }],
  };
}

function constPart(m) {
  const C = m.Cread;
  const v = dec(r2s(C), 2).replace('−', '-');
  return {
    html: 'La constante : la limite du rapport.', ask: 'C ≈', start: 'C', judge: { kind: 'stat', expect: String(r2s(C)), tol: Math.max(0.12 * C, tolOf(C)) },
    menu: [{ id: 'C', label: 'Lire la limite du rapport', valid: true }, { id: 'first', label: 'Prendre le premier rapport', valid: false, why: 'Le premier rapport est loin de la limite : on lit les dernières lignes utilisables.' }],
    lines: [{ math: v, note: `les dernières lignes utilisables (r${'₀₁₂₃'[m.p]} ≈ ${dec(C, 3)})`, subgoal: 'conclude' }],
  };
}

function level2(rng) {
  const m = method(rng, ['sq', 'cube', 'fixed', 'double'], { roundoff: false });
  const u = usable(m.d).map((z) => z.k).filter((k) => k >= 1);
  const ks = u.slice(-2);
  const parts = [...ratioParts(m, m.p, ks, 2), orderPart(m, 2)];
  return partsItem({
    skill: OR, level: 2, parts, subgoals: SUB, keys: KEYS, key: `${OR}:2:${m.kind}:${m.d[0]}`, fallback: m.fallback,
    prompt: `On applique ${m.label}. Le programme affiche les incréments :${tableHtml(rawTable(m))}Calcule r${'₀₁₂₃'[m.p]} = δₖ/δₖ₋₁${m.p === 1 ? '' : '²'} sur deux lignes (2 chiffres significatifs), puis donne l'ordre p.`,
    hints: H('Cherche le p pour lequel δₖ/δₖ₋₁ᵖ ne tend ni vers 0 ni vers l\'infini.',
      `r = δ${'₀₁₂₃₄₅₆₇₈₉'[ks[0]]}/(□)${m.p === 1 ? '' : '²'}`,
      `r ≈ ${dec(ratio(m.d, ks[0], m.p), 2)} puis ${dec(ratio(m.d, ks[1], m.p), 2)} : ordre ${m.p}.`),
  });
}

// ---------- L3: the round-off row, then p and C ----------

function level3(rng) {
  const m = method(rng, ['sq', 'cube'], { roundoff: true });
  const t = table(m, [2]);
  const last = m.d.length - 1;
  const parts = [orderPart(m, 3), constPart(m)];
  parts[0].html = null;
  parts[0].decisions = [{
    kind: 'decision', prompt: `La dernière ligne : δ${'₀₁₂₃₄₅₆₇₈₉'[last]} = ${expText(m.d[last], 3)}, r₂ = ${dec(ratio(m.d, last, 2), 2)}. Que faire ?`, options: [
      { id: 'ignore', label: 'L\'ignorer : à δ ≈ 10⁻¹⁵, l\'arrondi domine', valid: true, ref: true },
      { id: 'keep', label: 'La garder : c\'est la ligne la plus précise', valid: false, rule: 'n_order_roundoff_rows', why: 'À δ ≈ 10⁻¹⁵, la double précision ne garde plus de chiffre exact : le rapport n\'y a plus de sens.' },
    ],
  }, parts[0].decisions[0]];
  return partsItem({
    skill: OR, level: 3, parts, subgoals: SUB, keys: KEYS, key: `${OR}:3:${m.kind}:${m.d[0]}`, fallback: m.fallback,
    prompt: `On applique ${m.label}. Le programme affiche :${tableHtml(t)}Décide quelles lignes lire, puis donne l'ordre p et la constante C. Choisis d'abord chaque action.`,
    hints: H('Ne lis l\'ordre que sur les lignes où δ est bien au-dessus de 10⁻¹⁵.',
      'r₂ se stabilise vers □ sur les lignes utilisables.',
      `Ordre 2, C ≈ ${dec(m.Cread, 2)} (la dernière ligne est dominée par l'arrondi).`),
    baits: ['n_order_roundoff_rows', 'n_order_simple_ratio'],
  });
}

// ---------- L4: raw increments, or the program ----------

const RATIOS = refCode(`def ratios(inc, p):
    r = []
    for k in range(«len(inc) - 1»):
        r.append(«inc[k + 1] / inc[k] ** p»)
    return r
`);
const R_TRAPS = { 1: [{ text: 'inc[k + 1] / inc[k]', rule: 'n_order_simple_ratio' }] };
const R_FILL = { 0: ['len(inc)', 'len(inc) + 1'], 1: ['inc[k] / inc[k + 1] ** p', '(inc[k + 1] / inc[k]) ** p'] };
const R_WRONG = { 0: 'len(inc)' };
const R_TESTS = [
  { expr: 'ratios([0.5, 0.25, 0.125], 1)', expect: '[0.5, 0.5]' },
  { expr: 'ratios([0.5, 0.08333333333333333, 0.002450980392156932], 2)', expect: '[0.3333333333333333, 0.35294117647059825]', tol: 1e-9 },
  { expr: 'ratios([0.5, 0.2, 0.04], 3)', expect: '[1.6, 5.000000000000001]', tol: 1e-9 },
];

function codeLevel(rng, level) {
  return codeItem({
    skill: OR, level, ref: RATIOS, blanks: level === 1 ? [1] : holesFor(level, RATIOS, { focus: 1 }), choice: level === 1 ? 1 : undefined,
    traps: R_TRAPS, fillers: R_FILL, wrong: R_WRONG, rng,
    prompt: 'La fonction ratios reçoit la liste des incréments inc = [δ₀, δ₁, …] et un exposant p ; elle renvoie la liste des rapports rₚ = δₖ/δₖ₋₁ᵖ.',
    tests: R_TESTS,
    hints: H('Le rapport compare chaque incrément au précédent élevé à la puissance p.',
      'r.append(inc[k + 1] / □)',
      'r.append(inc[k + 1] / inc[k] ** p), pour k de 0 à len(inc) − 2.'),
    subgoals: SUB, key: `${level}`,
  });
}

function level4(rng) {
  if (rng.chance(1 / 3)) return codeLevel(rng, 4);
  const m = method(rng, ['sq', 'cube', 'fixed', 'double'], { roundoff: false });
  const parts = [orderPart(m, 4), constPart(m)];
  parts[0].html = null;
  return partsItem({
    skill: OR, level: 4, parts, subgoals: SUB, keys: KEYS, key: `${OR}:4:${m.kind}:${m.d[0]}`, fallback: m.fallback,
    prompt: `On applique ${m.label}. Le programme affiche les incréments :${tableHtml(rawTable(m))}Donne l'ordre p de la méthode et la constante C = lim δₖ/δₖ₋₁ᵖ (2 chiffres significatifs).`,
    hints: H('Calcule r₁ puis r₂ sur les dernières lignes : lequel se stabilise vers une constante non nulle ?',
      `r${'₀₁₂₃'[m.p]} sur les dernières lignes ≈ □`,
      `Ordre ${m.p}, C ≈ ${dec(m.Cread, 2)}.`),
    baits: ['n_order_simple_ratio'],
  });
}

// ---------- L5: two methods ----------

function twoMethods(rng) {
  const a = method(rng, ['sq', 'cube'], { roundoff: false });
  const b = method(rng, ['fixed', 'double', 'secant'], { roundoff: false });
  const n = Math.max(a.d.length, b.d.length);
  const rows = Array.from({ length: n }, (_, k) => [String(k), a.d[k] !== undefined ? expText(a.d[k], 3) : '', b.d[k] !== undefined ? expText(b.d[k], 3) : '']);
  return { a, b, table: { columns: ['k', `δₖ (A : ${a.short})`, `δₖ (B : ${b.short})`], rows } };
}
function twoOptions(t) {
  const bOrder = t.b.p === 'sec' ? 'entre 1 et 2' : 'd\'ordre 1';
  return [
    { html: 'A est d\'ordre 2', correct: true },
    { html: `B est ${bOrder}`, correct: true },
    { html: 'A est d\'ordre 1, puisque δₖ₊₁/δₖ tend vers 0', correct: false, rule: 'n_order_simple_ratio' },
    { html: t.b.p === 'sec' ? 'B est d\'ordre 2' : 'B est d\'ordre 2', correct: false },
    { html: 'Les deux méthodes ont le même ordre', correct: false },
  ];
}

function level5(rng) {
  const t = twoMethods(rng);
  return readtableItem({
    skill: OR, level: 5, key: `5:${t.a.kind}:${t.b.kind}:${t.a.d[0]}`,
    prompt: `Deux méthodes, A (${t.a.label}) et B (${t.b.label}), donnent ces incréments :`,
    table: t.table,
    question: multiMcq({
      skill: OR, level: 5, key: `${OR}:5q`, prompt: 'Que peut-on en déduire ?', options: twoOptions(t),
      solution: [{ html: `A : δₖ/δₖ₋₁² se stabilise, ordre 2. B : ${t.b.p === 'sec' ? 'δₖ/δₖ₋₁ → 0 mais δₖ/δₖ₋₁² → ∞, ordre entre 1 et 2 (sécante, ≈ 1,618)' : `δₖ/δₖ₋₁ → ${dec(t.b.C, 2)}, ordre 1`}.`, note: '' }],
    }, rng),
    subgoals: SUB, fallback: t.a.fallback || t.b.fallback,
  });
}

// ---------- exam ----------

function examMcq(rng, opts) {
  const m = method(rng, ['sq', 'cube', 'fixed', 'double'], { roundoff: false });
  const t = { columns: ['k', ...m.d.map((_, k) => String(k))], rows: [['δₖ', ...m.d.map((x) => expText(x, 3))]] };
  const options = m.p === 2 ? [
    { html: 'La méthode converge quadratiquement pour ce point de départ', correct: true },
    { html: 'La méthode converge quadratiquement quel que soit le point de départ', correct: false },
    { html: 'La méthode est d\'ordre 1, puisque δₖ₊₁/δₖ tend vers 0', correct: false, rule: 'n_order_simple_ratio' },
    { html: 'La méthode diverge', correct: false },
  ] : [
    { html: 'La méthode converge linéairement (ordre 1)', correct: true },
    { html: `Le rapport δₖ₊₁/δₖ tend vers environ ${dec(m.C, 1)}`, correct: true },
    { html: 'La méthode converge quadratiquement', correct: false },
    { html: 'La méthode diverge', correct: false },
  ];
  return multiMcq({
    skill: OR, level: 4, key: `${OR}:exam:${m.kind}:${m.d[0]}`, exam: examTag(opts),
    prompt: `Un programme affiche les incréments δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| d'une méthode itérative :${tableHtml(t)}Que peut-on en déduire ?`,
    options,
    solution: [{ html: m.p === 2 ? 'δₖ₊₁/δₖ² se stabilise : convergence quadratique pour ce départ ; le tableau ne dit rien des autres départs.' : `δₖ₊₁/δₖ → ${dec(m.C, 2)} : convergence linéaire.`, note: '' }],
  }, rng);
}

function examTf(rng, opts) {
  return rng.chance(0.5)
    ? vfMcq({
      skill: OR, key: `${OR}:tf:r1`, exam: examTag(opts), truth: false, ruleIfTrue: 'n_order_simple_ratio',
      statement: 'Si δₖ₊₁/δₖ → 0, la méthode est d\'ordre 1.',
      explanation: 'Faux : pour Newton (ordre 2), δₖ₊₁/δₖ → 0 aussi. L\'ordre est le p pour lequel δₖ₊₁/δₖᵖ tend vers une constante non nulle ; un rapport qui tend vers 0 dit seulement que l\'ordre est > 1.',
    }, rng)
    : vfMcq({
      skill: OR, key: `${OR}:tf:slow`, exam: examTag(opts), truth: false,
      statement: 'Une méthode d\'ordre 1 dont le rapport δₖ₊₁/δₖ tend vers 1 converge vite.',
      explanation: 'Faux : l\'erreur n\'est multipliée que par ≈ 1 à chaque pas ; avec un rapport 0,99, il faut environ 230 pas pour gagner un facteur 10.',
    }, rng);
}

export const GEN = {
  [OR]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return examMcq(rng, opts);
    if (opts.exam === 'tf') return examTf(rng, opts);
    switch (level) {
      case 1: return rng.chance(0.25) ? codeLevel(rng, 1) : level1(rng);
      case 2: return level2(rng);
      case 3: return level3(rng);
      case 4: return level4(rng);
      default: return level5(rng);
    }
  },
};

export { modeOf, linesItem };

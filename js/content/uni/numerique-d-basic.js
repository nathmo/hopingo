// n-fd-basic (module N, part d, step U9): forward, backward and centred
// differences. Catalogue: docs/universite/N-analyse-numerique.md, n-fd-basic.
//
// Data: f a polynomial of degree 3 or 4 with whole coefficients in
// [−3 ; 3], x̄ ∈ {−1, 0, 1, 2}, h ∈ {0,1 ; 0,2 ; 0,5}; f″(x̄) ≠ 0 and
// f‴(x̄) ≠ 0, so that no formula is exact. The values f(x̄ ± h) are exact
// decimals (at most 4 decimals); the quotients too.
// L1 the three quotients with the value as a blank; L2 the student writes
// each quotient (guided blanks in the formula); L3 choose each formula,
// then its order; L4 free: δ⁺, δᶜ, f′(x̄) and the error δᶜ − f′(x̄), which
// equals h²f‴(x̄)/6 exactly for a polynomial of degree ≤ 4; L5 the program
// (four formulas), then a table of errors to read.
// Exam: mcq (δᶜ, with the denominator h of n_fd_centered_h; or the table of
// errors, several answers), tf (centred exact on degree 2: true; forward of
// order 2: false, counter-example f = x² at 0).

import { Q } from '../../math/rational.js';
import { linesItem, mcq, tfItem, examTag } from './kit.js';
import { refCode, codeItem, holesFor, readtableItem, multiMcq, tableHtml, expText, blankBy } from './numerique-kit.js';
import { q, dt, fd, evalPoly, derivPoly, polyCas, polyHtml, H, KEYS, FUNCS, fwd, cent } from './numerique-d-kit.js';

const SK = 'n-fd-basic';
const SUB = [
  { id: 'eval', label: 'calculer un quotient', skill: SK },
  { id: 'order', label: 'ordre d\'une formule', skill: SK },
  { id: 'taylor', label: 'Taylor de f(x̄ ± h)', skill: 'a1-dl-usual' },
];
const HS = [q(1, 10), q(1, 5), q(1, 2)];

// ---------- data ----------

function data(rng) {
  for (let t = 0; t < 200; t++) {
    const deg = rng.pick([3, 3, 4]);
    const c = Array.from({ length: deg + 1 }, () => rng.int(-3, 3));
    if (!c[deg]) continue;
    const x = rng.pick([-1, 0, 1, 2]);
    const h = rng.pick(HS);
    const d1 = derivPoly(c);
    const d2 = derivPoly(d1);
    const d3 = derivPoly(d2);
    const f2 = evalPoly(d2, x);
    const f3 = evalPoly(d3, x);
    if (f2.n === 0 || f3.n === 0) continue;
    const f0 = evalPoly(c, x);
    const fp = evalPoly(c, q(x).add(h));
    const fm = evalPoly(c, q(x).sub(h));
    if ([f0, fp, fm].some((v) => Math.abs(v.valueOf()) > 150 || v.toDecimal() === null)) continue;
    const dp = fp.sub(f0).div(h);
    const dm = f0.sub(fm).div(h);
    const dc = fp.sub(fm).div(h.mul(2));
    const df = evalPoly(d1, x);
    if (new Set([dp, dm, dc, df].map(String)).size < 4) continue;
    return { c, x, h, f0, fp, fm, dp, dm, dc, df, f2, f3, errC: dc.sub(df) };
  }
  // The catalogue's example: x³, x̄ = 1, h = 0,1.
  const c = [0, 0, 0, 1];
  const h = q(1, 10);
  return { c, x: 1, h, f0: q(1), fp: q(1331, 1000), fm: q(729, 1000), dp: q(331, 100), dm: q(271, 100), dc: q(301, 100), df: q(3), f2: q(6), f3: q(6), errC: q(1, 100), fallback: true };
}

const fT = (d) => `f(x) = ${polyHtml(d.c)}`;
const xp = (d) => fd(q(d.x).add(d.h));
const xm = (d) => fd(q(d.x).sub(d.h));
const minus = (a, b) => (q(b).n < 0 ? `${dt(a)}+${dt(q(b).neg())}` : `${dt(a)}-${dt(b)}`);
const given = (d) => `f(${xm(d)}) = ${fd(d.fm)}, f(${fd(d.x)}) = ${fd(d.f0)}, f(${xp(d)}) = ${fd(d.fp)}`;
const intro = (d) => `${fT(d)}, x̄ = ${fd(d.x)}, h = ${fd(d.h)}. On donne ${given(d)}.`;

// The three formulas, as lines of the judge value.
const PLUS = (d) => `(${minus(d.fp, d.f0)})/${dt(d.h)}`;
const MINUS = (d) => `(${minus(d.f0, d.fm)})/${dt(d.h)}`;
const CENT = (d) => `(${minus(d.fp, d.fm)})/${dt(d.h.mul(2))}`;
const centCfg = (d, extra = {}) => ({ kind: 'value', form: 'any', fd: { fp: dt(d.fp), fm: dt(d.fm), h: dt(d.h) }, ...extra });

// ---------- L1: the values ----------

function level1(rng) {
  const d = data(rng);
  const seg = (html, ask, start, val, judge = { kind: 'value', form: 'any' }) => [
    { kind: 'segment', html, ask, start: { math: start }, judge },
    { kind: 'eq', math: dt(val), ...blankBy(dt(val), [dt(val)]), note: 'Le quotient', subgoal: 'eval' },
  ];
  const [first, ...rest] = [
    ...seg('Différence progressive δ⁺f = (f(x̄ + h) − f(x̄))/h :', 'δ⁺f =', PLUS(d), d.dp),
    ...seg('Différence rétrograde δ⁻f = (f(x̄) − f(x̄ − h))/h :', 'δ⁻f =', MINUS(d), d.dm),
    ...seg('Différence centrée δᶜf = (f(x̄ + h) − f(x̄ − h))/(2h) :', 'δᶜf =', CENT(d), d.dc, centCfg(d)),
  ];
  return linesItem({
    skill: SK, level: 1, mode: 'guided', keys: KEYS,
    prompt: `${intro(d)} Calcule les trois quotients.`,
    start: first.start.math, judge: first.judge,
    script: [{ kind: 'note', html: first.html }, ...rest],
    hints: H('Progressive : vers l\'avant ; rétrograde : vers l\'arrière ; centrée : des deux côtés, divisée par 2h.',
      `δᶜf = (${fd(d.fp)} − ${fd(d.fm)})/□`,
      `δ⁺f = ${fd(d.dp)}, δ⁻f = ${fd(d.dm)}, δᶜf = ${fd(d.dc)}.`),
    subgoals: SUB, key: `${SK}:1:${polyCas(d.c)}:${d.x}:${d.h}`, baits: ['n_fd_centered_h'], fallback: d.fallback,
  });
}

// ---------- L2: the student writes the formulas ----------

function level2(rng) {
  const d = data(rng);
  const seg = (html, ask, expr, holes, val, extra = {}) => [
    { kind: 'segment', html, ask, start: { math: 'δ' }, judge: { kind: 'value', form: 'any', expect: dt(val), ...extra } },
    { kind: 'eq', math: expr, ...blankBy(expr, holes), note: 'La formule, avec les valeurs', subgoal: 'eval' },
    { kind: 'eq', math: dt(val), note: '', subgoal: 'eval' },
  ];
  const h2 = dt(d.h.mul(2));
  const [first, ...rest] = [
    ...seg('Différence progressive δ⁺f :', 'δ⁺f =', PLUS(d), [dt(d.h)], d.dp),
    ...seg('Différence rétrograde δ⁻f :', 'δ⁻f =', MINUS(d), [dt(d.h)], d.dm),
    ...seg('Différence centrée δᶜf :', 'δᶜf =', CENT(d), [h2], d.dc, { fd: centCfg(d).fd }),
  ];
  return linesItem({
    skill: SK, level: 2, mode: 'guided', keys: KEYS,
    prompt: `${intro(d)} Écris chaque quotient avec ces valeurs, puis calcule-le.`,
    start: first.start.math, judge: first.judge,
    script: [{ kind: 'note', html: first.html }, ...rest],
    hints: H('Le dénominateur est la distance entre les deux points utilisés : h, ou 2h pour la centrée.',
      `δᶜf = (f(${xp(d)}) − f(${xm(d)}))/(2·${fd(d.h)})`,
      `δᶜf = (${fd(d.fp)} − ${fd(d.fm)})/${fd(d.h.mul(2))} = ${fd(d.dc)}.`),
    subgoals: SUB, key: `${SK}:2:${polyCas(d.c)}:${d.x}:${d.h}`, baits: ['n_fd_centered_h'], fallback: d.fallback,
  });
}

// ---------- L3: choose the formula, then its order ----------

function level3(rng) {
  const d = data(rng);
  const script = [
    {
      kind: 'decision', prompt: 'Quelle est la différence centrée ?', options: [
        { id: 'ok', label: '(f(x̄ + h) − f(x̄ − h))/(2h)', valid: true, ref: true },
        { id: 'h', label: '(f(x̄ + h) − f(x̄ − h))/h', valid: false, rule: 'n_fd_centered_h', why: 'Les deux points sont à 2h l\'un de l\'autre : on divise par 2h.' },
        { id: 'half', label: '(f(x̄ + h) − f(x̄))/(2h)', valid: false, why: 'C\'est la moitié de la progressive : elle n\'approche pas f′(x̄).' },
      ],
    },
    { kind: 'eq', math: CENT(d), note: `2h = ${fd(d.h.mul(2))}`, subgoal: 'eval' },
    { kind: 'eq', math: dt(d.dc), note: 'δᶜf', subgoal: 'eval' },
    { kind: 'segment', html: 'Ordre de la différence centrée : son erreur se comporte comme hᵖ.', ask: 'p =', start: { math: 'p' }, judge: { kind: 'value', expect: '2', form: 'any' } },
    {
      kind: 'decision', prompt: 'Pourquoi ?', options: [
        { id: 'two', label: 'Les termes en h·f″ se compensent : l\'erreur est (h²/6)·f‴(ξ)', valid: true, ref: true },
        { id: 'one', label: 'Comme la progressive, l\'erreur est (h/2)·f″(ξ)', valid: false, why: 'Dans f(x̄ + h) − f(x̄ − h), les termes en h² se compensent : il reste h³, divisé par 2h.' },
        { id: 'pts', label: 'Elle utilise deux points, donc elle est d\'ordre 2', valid: false, why: 'La progressive utilise aussi deux points, et elle est d\'ordre 1 : c\'est la symétrie qui compte.' },
      ],
    },
    { kind: 'eq', math: '2', note: 'Ordre 2', subgoal: 'order' },
  ];
  return linesItem({
    skill: SK, level: 3, mode: 'tap', keys: KEYS,
    prompt: `${intro(d)} Choisis la formule de la différence centrée, calcule-la, puis donne son ordre.`,
    start: 'δ', judge: { kind: 'value', expect: dt(d.dc), form: 'any', fd: centCfg(d).fd },
    script,
    hints: H('Centrée : les deux points sont de part et d\'autre de x̄, à la distance 2h l\'un de l\'autre.',
      `δᶜf = (${fd(d.fp)} − ${fd(d.fm)})/□`,
      `δᶜf = ${fd(d.dc)} ; ordre 2.`),
    subgoals: SUB, key: `${SK}:3:${polyCas(d.c)}:${d.x}:${d.h}`, baits: ['n_fd_centered_h'], fallback: d.fallback,
  });
}

// ---------- L4: values, f′(x̄) and the error ----------

function level4(rng) {
  const d = data(rng);
  const h2 = d.h.mul(d.h);
  const script = [
    { kind: 'eq', math: PLUS(d), note: '', subgoal: 'eval' },
    { kind: 'eq', math: dt(d.dp), note: 'δ⁺f', subgoal: 'eval' },
    { kind: 'segment', html: 'Différence centrée :', ask: 'δᶜf =', start: { math: 'δ' }, judge: centCfg(d, { expect: dt(d.dc) }) },
    { kind: 'eq', math: CENT(d), note: '', subgoal: 'eval' },
    { kind: 'eq', math: dt(d.dc), note: 'δᶜf', subgoal: 'eval' },
    { kind: 'segment', html: 'La vraie dérivée :', ask: 'f′(x̄) =', start: { math: 'y' }, judge: { kind: 'value', expect: dt(d.df), form: 'any' } },
    { kind: 'eq', math: dt(d.df), note: `f′(x) = ${polyHtml(derivPoly(d.c))}`, subgoal: 'taylor' },
    { kind: 'segment', html: 'L\'erreur de la centrée :', ask: 'δᶜf − f′(x̄) =', start: { math: 'r' }, judge: { kind: 'value', expect: dt(d.errC), form: 'any' } },
    { kind: 'eq', math: `${dt(d.dc)}-(${dt(d.df)})`, note: '', subgoal: 'order' },
    { kind: 'eq', math: dt(d.errC), note: `= h²·f‴(x̄)/6 = ${fd(h2)}·(${fd(d.f3)})/6 : exact pour un polynôme de degré ≤ 4`, subgoal: 'order' },
  ];
  return linesItem({
    skill: SK, level: 4, mode: 'free', keys: KEYS,
    prompt: `${intro(d)} Calcule δ⁺f et δᶜf, la vraie dérivée f′(x̄), puis l'erreur δᶜf − f′(x̄).`,
    start: 'δ', judge: { kind: 'value', expect: dt(d.dp), form: 'any' },
    script: [{ kind: 'note', html: 'Différence progressive :' }, ...script],
    hints: H('Calcule les quotients, puis dérive f. L\'erreur de la centrée vaut h²·f‴(x̄)/6 pour un polynôme de degré ≤ 4.',
      `δᶜf − f′(x̄) = ${fd(d.dc)} − □`,
      `δᶜf − f′(x̄) = ${fd(d.errC)} = h²·f‴(x̄)/6, alors que δ⁺f − f′(x̄) = ${fd(d.dp.sub(d.df))} ≈ h·f″(x̄)/2 = ${fd(d.h.mul(d.f2).div(2))}.`),
    subgoals: SUB, key: `${SK}:4:${polyCas(d.c)}:${d.x}:${d.h}`, baits: ['n_fd_centered_h'], fallback: d.fallback,
  });
}

// ---------- L5: the program, then a table ----------

export const FD_CODE = refCode(`def fd_forward(f, x, h):
    return «(f(x + h) - f(x)) / h»

def fd_backward(f, x, h):
    return «(f(x) - f(x - h)) / h»

def fd_centered(f, x, h):
    return «(f(x + h) - f(x - h)) / (2 * h)»

def fd_second(f, x, h):
    return «(f(x + h) - 2 * f(x) + f(x - h)) / (h * h)»
`);
export const FD_TRAPS = {
  0: [],
  1: [],
  2: [{ text: '(f(x + h) - f(x - h)) / h', rule: 'n_fd_centered_h' }],
  3: [],
};
const FD_WRONG = { 0: '(f(x + h) - f(x - h)) / h', 1: '(f(x - h) - f(x)) / h', 3: '(f(x + h) - f(x) + f(x - h)) / (h * h)' };
const FD_TESTS = [
  { setup: 'def f(x): return x**3', expr: 'fd_forward(f, 1, 0.1)', expect: '3.31', tol: 1e-9 },
  { setup: 'def f(x): return x**3', expr: 'fd_backward(f, 1, 0.1)', expect: '2.71', tol: 1e-9 },
  { setup: 'def f(x): return x**3', expr: 'fd_centered(f, 1, 0.1)', expect: '3.01', tol: 1e-9 },
  { setup: 'def f(x): return x**3', expr: 'fd_second(f, 1, 0.1)', expect: '6.0', tol: 1e-9 },
];

// The table of the errors |f′(x̄) − D_h f| (double precision).
function errTable(rng) {
  const F = rng.pick(FUNCS.filter((x) => x.id !== 'cube'));
  const hs = [1e-1, 1e-2, 1e-3, 1e-4];
  const rows = hs.map((h, i) => [`1e-${i + 1}`, expText(Math.abs(F.d(F.x) - fwd(F.f, F.x, h)), 3), expText(Math.abs(F.d(F.x) - cent(F.f, F.x, h)), 3)]);
  return { F, table: { columns: ['h', 'progressive', 'centrée'], rows } };
}
function tableQuestion(rng, t, level, prefix = '') {
  return multiMcq({
    skill: SK, level, key: `${SK}:read:${t.F.id}`,
    prompt: `${prefix}Erreurs |f′(${t.F.xh}) − Dₕf| pour f = ${t.F.html}, quand h est divisé par 10. Que peut-on en déduire ?`,
    options: [
      { html: 'La différence progressive est d\'ordre 1 (erreur divisée par 10)', correct: true },
      { html: 'La différence centrée est d\'ordre 2 (erreur divisée par 100)', correct: true },
      { html: 'La différence progressive est d\'ordre 2', correct: false },
      { html: 'La différence centrée est d\'ordre 1, comme la progressive', correct: false },
    ],
    solution: [{ html: 'Quand h est divisé par 10, l\'erreur de la progressive est divisée par 10 (= 10¹) et celle de la centrée par 100 (= 10²) : ordres 1 et 2.', note: '' }],
  }, rng);
}

function level5(rng) {
  const t = errTable(rng);
  const then = readtableItem({
    skill: SK, level: 5, key: `${t.F.id}`,
    prompt: `Le programme est appelé pour f = ${t.F.html} en x̄ = ${t.F.xh} ; voici les erreurs obtenues.`,
    table: t.table, question: tableQuestion(rng, t, 5),
  });
  return codeItem({
    skill: SK, level: 5, ref: FD_CODE, blanks: holesFor(5, FD_CODE), traps: FD_TRAPS, wrong: FD_WRONG, rng,
    prompt: 'Complète les quatre formules : progressive, rétrograde, centrée pour f′(x), et centrée pour f″(x).',
    tests: FD_TESTS, then, hints: [], subgoals: SUB, key: `5:${t.F.id}`,
  });
}

// ---------- exam variants ----------

function examMcq(rng, opts) {
  if (rng.chance(0.5)) {
    const t = errTable(rng);
    const it = tableQuestion(rng, t, 4, tableHtml(t.table));
    return { ...it, exam: examTag(opts) };
  }
  const d = data(rng);
  const wrongH = d.fp.sub(d.fm).div(d.h);
  return mcq({
    skill: SK, level: 4, key: `${SK}:mcq:${polyCas(d.c)}:${d.x}:${d.h}`, exam: examTag(opts),
    prompt: `${intro(d)} Que vaut la différence centrée δᶜf(x̄) ?`,
    options: (() => {
      const out = [{ html: fd(d.dc), correct: true }];
      const cands = [[wrongH, 'n_fd_centered_h'], [d.dp], [d.dm], [d.dp.div(2)], [d.dc.add(d.h)], [d.dc.neg()]];
      for (const [v, rule] of cands) {
        if (out.length >= 4 || out.some((o) => o.html === fd(v))) continue;
        out.push({ html: fd(v), correct: false, ...(rule ? { rule } : {}) });
      }
      return out;
    })(),
    solution: [{ html: `δᶜf = (${fd(d.fp)} − ${fd(d.fm)})/(2·${fd(d.h)}) = ${fd(d.dc)}.`, note: '' }],
  }, rng);
}

function examTf(rng, opts) {
  if (rng.chance(0.5)) {
    return tfItem({
      skill: SK, level: 4, key: 'cent-deg2', exam: examTag(opts),
      statement: 'La différence centrée (f(x̄ + h) − f(x̄ − h))/(2h) donne exactement f′(x̄) quand f est un polynôme de degré ≤ 2.',
      truth: true,
      explanation: 'Vrai : son erreur est (h²/6)·f‴(ξ), et f‴ = 0 pour un polynôme de degré ≤ 2.',
    });
  }
  return tfItem({
    skill: SK, level: 4, key: 'fwd-order2', exam: examTag(opts),
    statement: 'La différence progressive (f(x̄ + h) − f(x̄))/h est d\'ordre 2 : son erreur est majorée par C·h².',
    truth: false,
    counter: {
      kind: 'num', prop: 'fdForwardNotOrder2', params: {},
      ask: [{ v: 'f', label: 'f(x) =' }, { v: 'x0', label: 'x̄ =' }],
      answer: { f: 'x^2', x0: '0' },
    },
    explanation: 'Faux : elle est d\'ordre 1. Pour f(x) = x² en x̄ = 0, δ⁺f = h alors que f′(0) = 0 : l\'erreur vaut h, pas O(h²).',
  });
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return examMcq(rng, opts);
    if (opts.exam === 'tf') return examTf(rng, opts);
    switch (level) {
      case 1: return level1(rng);
      case 2: return level2(rng);
      case 3: return level3(rng);
      case 4: return level4(rng);
      default: return level5(rng);
    }
  },
};

export { Q };

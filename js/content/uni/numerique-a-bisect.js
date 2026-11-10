// n-bisection (module N, part a, step U9): the number of iterations, and
// the table of the intervals. Catalogue: docs/universite/N-analyse-numerique.md.
//
// f ∈ {x² − c (c ∈ {2, 3, 5, 7}), x³ − x − 2, cos x − x}, [a ; b] of length 1,
// 2 or 4 around the zero, tol ∈ {10⁻², 10⁻³, 10⁻⁵, 10⁻⁶, 10⁻¹⁰} with
// log₂((b − a)/tol) at distance ≥ 0,05 of a whole number. k_min is the
// smallest k with (b − a)/2^(k+1) ≤ tol, that is ⌊log₂((b − a)/tol)⌋.
// The table: judge iter, phi 'bisect' (columns a, b, x, sign of f(x)); the
// midpoints are dyadic, so exact.
// L1 guided lines up to k_min, or the table with its first row given;
// L2 the table; L3 « keep [a ; x] or [x ; b] » line by line (menus), then
// k_min; L4 the table, then k_min in free lines; L5 the program, then the
// exam question « towards which zero, in at most how many iterations ».
// Exam: mcq (GM 2012: a cubic with 3 zeros on [−2 ; 2]), tf (the error
// does not decrease at each step, counter-example x − 0,51 on [0 ; 1]; or
// « bisection applies to (x − 1)² on [0 ; 3] », a two-option choice).

import { Q } from '../../math/rational.js';
import { linesItem, mcq, tfItem, examTag } from './kit.js';
import { refCode, codeItem, iterTable, holesFor, H, blankBy, vfMcq, codeMcq, fmt, fv } from './numerique-kit.js';

const BI = 'n-bisection';
const KEYS = ['calc', 'explog'];
const SUB = [
  { id: 'bound', label: 'la borne (b − a)/2^(k+1)', skill: BI },
  { id: 'log', label: 'le logarithme en base 2', skill: 'g2-log-rules' },
  { id: 'kmin', label: 'k_min', skill: BI },
  { id: 'iterate', label: 'garder la bonne moitié', skill: BI },
  { id: 'ivt', label: 'f change de signe : un zéro existe', skill: 'a1-fn-ivt' },
];
const fr = (s) => String(s).replace(/\./g, ',').replace(/-/g, '−');
const menuOf = (items, active) => items.map((o) => ({ id: o.id, label: o.label, valid: o.id === active, why: o.id === active ? undefined : o.why || 'Pas maintenant.' }));

const FUNCS = [
  { f: 'x^2-2', show: 'x² − 2', root: Math.SQRT2 },
  { f: 'x^2-3', show: 'x² − 3', root: Math.sqrt(3) },
  { f: 'x^2-5', show: 'x² − 5', root: Math.sqrt(5) },
  { f: 'x^2-7', show: 'x² − 7', root: Math.sqrt(7) },
  { f: 'x^3-x-2', show: 'x³ − x − 2', root: 1.5213797068045676 },
  { f: 'cos(x)-x', show: 'cos x − x', root: 0.7390851332151607 },
];
const TOLS = [[2, '10^(-2)', '10⁻²'], [3, '10^(-3)', '10⁻³'], [5, '10^(-5)', '10⁻⁵'], [6, '10^(-6)', '10⁻⁶'], [10, '10^(-10)', '10⁻¹⁰']];

function data(rng) {
  for (let t = 0; t < 200; t++) {
    const F = rng.pick(FUNCS);
    const L = rng.pick([1, 2, 4]);
    // A whole a ≥ 0 with the root inside [a ; a + L].
    const lows = Array.from({ length: L }, (_, j) => Math.floor(F.root) - j).filter((x) => x >= 0);
    const lo = rng.pick(lows);
    const [e, tolT, tolS] = rng.pick(TOLS);
    const y = Math.log2(L * 10 ** e);
    if (Math.abs(y - Math.round(y)) < 0.05) continue;
    const kmin = Math.floor(y);
    return { ...F, a: lo, b: lo + L, L, e, tolT, tolS, y, kmin, N: L * 10 ** e };
  }
  const F = FUNCS[0];
  return { ...F, a: 1, b: 2, L: 1, e: 3, tolT: '10^(-3)', tolS: '10⁻³', y: Math.log2(1000), kmin: 9, N: 1000, fallback: true };
}

const Nt = (d) => String(d.N);
const bisectCfg = (d) => ({ L: String(d.L), tol: d.tolT });

// The lines of k_min: 2^(k+1) ≥ N, log₂ N − 1, k_min.
function kminScript(d, { guided, menu }) {
  const yT = fr((Math.floor((d.y - 1) * 100) / 100).toFixed(2));
  const yLine = (Math.floor((d.y - 1) * 100) / 100).toFixed(2).replace('.', ',');
  const M = (id) => (menu ? { menu: menuOf(KMENU, id) } : {});
  return [
    { kind: 'eq', math: Nt(d), ...(guided ? blankBy(Nt(d), [Nt(d)]) : {}), note: `(b − a)/2^(k+1) ≤ tol ⇔ 2^(k+1) ≥ (b − a)/tol = ${d.L}/${d.tolS}`, subgoal: 'bound' },
    { kind: 'segment', html: 'Donc k + 1 ≥ log₂((b − a)/tol), c\'est-à-dire k ≥ log₂((b − a)/tol) − 1 (deux décimales).', ask: 'k ≥', start: { math: `log_2(${Nt(d)})-1` }, judge: { kind: 'value', tol: 0.011, form: 'any', ...M('log') } },
    { kind: 'eq', math: yLine, ...(guided ? blankBy(yLine, [yLine]) : {}), note: `log₂(${fr(Nt(d))}) = log(${fr(Nt(d))})/log 2 ≈ ${fr(d.y.toFixed(2))} (2¹⁰ ≈ 10³)`, subgoal: 'log' },
    { kind: 'segment', html: 'Le plus petit entier k qui convient :', ask: 'k_min =', start: { math: 'k_min' }, judge: { kind: 'value', expect: String(d.kmin), form: 'any', bisect: bisectCfg(d), ...M('kmin') } },
    { kind: 'eq', math: String(d.kmin), ...(guided ? blankBy(String(d.kmin), [String(d.kmin)]) : {}), note: `le plus petit entier > ${yT}`, subgoal: 'kmin' },
  ];
}
const KMENU = [
  { id: 'bound', label: 'Écrire la borne (b − a)/2^(k+1) ≤ tol' },
  { id: 'log', label: 'Prendre log₂', why: 'D\'abord la borne.' },
  { id: 'log10', label: 'Prendre log₁₀', why: 'L\'intervalle est divisé par 2 à chaque pas : c\'est log₂, pas log₁₀.' },
  { id: 'kmin', label: 'Prendre le plus petit entier', why: 'D\'abord le logarithme.' },
];

const prompt0 = (d) => `Bissection pour f(x) = ${d.show} sur [${d.a} ; ${d.b}], avec la tolérance tol = ${d.tolS}`;

function kminLines(rng, level, d = data(rng)) {
  const guided = level <= 2;
  const mode = guided ? 'guided' : level === 3 ? 'tap' : 'free';
  return linesItem({
    skill: BI, level, mode, keys: KEYS, tapActions: level === 3 ? 'menu' : null,
    prompt: `${prompt0(d)}. Combien d'itérations k_min garantissent |α − x⁽ᵏ⁾| ≤ tol, sachant que |α − x⁽ᵏ⁾| ≤ (b − a)/2^(k+1) ? Calcule (b − a)/tol, puis log₂ de ce nombre moins 1, puis k_min.`,
    start: `${d.L}/${d.tolT}`,
    judge: { kind: 'value', form: 'any', ...(level === 3 ? { menu: menuOf(KMENU, 'bound') } : {}) },
    script: kminScript(d, { guided, menu: level === 3 }),
    hints: H('À l\'étape k, le milieu est à au plus (b − a)/2^(k+1) du zéro : impose cette borne ≤ tol.',
      `(b − a)/2^(k+1) ≤ tol ⇔ k ≥ log₂(□) − 1`,
      `k > log₂(${fr(Nt(d))}) − 1 ≈ ${fr((d.y - 1).toFixed(2))}, donc k_min = ${d.kmin}.`),
    subgoals: SUB, key: `${BI}:k${level}:${d.f}:${d.a}:${d.L}:${d.e}`, baits: ['n_bisect_no_minus1', 'n_bisect_log10'], fallback: d.fallback,
  });
}

// The table (phi 'bisect').
const COLS = [{ id: 'a', label: 'a' }, { id: 'b', label: 'b' }, { id: 'x', label: 'x⁽ᵏ⁾ = (a + b)/2' }, { id: 'sign', label: 'signe de f(x⁽ᵏ⁾)' }];

function table(rng, level, d = data(rng)) {
  const n = level === 1 ? 3 : 4;
  const then = level === 4 ? kminLines(rng, 4, d) : null;
  if (then) { then.prompt = `Combien d'itérations garantissent |α − x⁽ᵏ⁾| ≤ ${d.tolS} ? Écris (b − a)/tol, log₂(…) − 1, puis k_min.`; then.noHints = true; then.hints = []; }
  const item = iterTable({
    skill: BI, level, key: `t${level}:${d.f}:${d.a}:${d.L}:${d.e}`, n, cols: COLS,
    prompt: `${prompt0(d).replace(/, avec la tolérance.*$/, '')}. f(${d.a}) et f(${d.b}) sont de signes opposés. À chaque ligne, x⁽ᵏ⁾ est le milieu de [a ; b] ; on garde la moitié où f change de signe. Remplis le tableau (signe : + ou −).`,
    phi: { kind: 'bisect', f: d.f, a0: String(d.a), b0: String(d.b), tol: 1e-12 },
    show: (v, id) => (id === 'sign' ? (fv(v) > 0 ? '+' : '−') : fmt(v, 12)),
    given: (k, id) => (level === 1 ? k === 0 : k === 0 && (id === 'a' || id === 'b')),
    then,
    hints: H('Compare le signe de f(x) à celui de f(a) : s\'ils sont égaux, le zéro est dans [x ; b].',
      `x⁽⁰⁾ = (${d.a} + ${d.b})/2 = ${fr(String((d.a + d.b) / 2))} ; f(${fr(String((d.a + d.b) / 2))}) est □ ; on garde …`,
      'Ligne suivante : a et b sont les extrémités de la moitié gardée, puis leur milieu.'),
    subgoals: SUB, baits: ['n_bisect_wrong_half'], fallback: d.fallback,
  });
  return item;
}

// L3: keep [a ; x] or [x ; b], line by line (menus), then k_min.
const HMENU = [
  { id: 'left', label: 'Garder [a ; x⁽ᵏ⁾]' },
  { id: 'right', label: 'Garder [x⁽ᵏ⁾ ; b]' },
  { id: 'stop', label: 'Arrêter', why: 'La tolérance n\'est pas encore garantie : continue.' },
];
function level3(rng) {
  const d = data(rng);
  const fv = (x) => (d.f === 'cos(x)-x' ? Math.cos(x) - x : d.f === 'x^3-x-2' ? x ** 3 - x - 2 : x * x - Number(d.f.slice(4)));
  let a = new Q(d.a);
  let b = new Q(d.b);
  const script = [];
  for (let k = 0; k < 3; k++) {
    const x = a.add(b).div(2);
    const sx = Math.sign(fv(x.valueOf()));
    const sa = Math.sign(fv(a.valueOf()));
    const keepRight = sx === sa;
    const [na, nb] = keepRight ? [x, b] : [a, x];
    const nx = na.add(nb).div(2);
    const seg = {
      kind: 'segment', html: `x⁽${'⁰¹²³'[k]}⁾ = ${fr(x.toDecimal())}, et f(${fr(x.toDecimal())}) ${sx > 0 ? '> 0' : '< 0'}, f(${fr(a.toDecimal())}) ${sa > 0 ? '> 0' : '< 0'}. Choisis la moitié, puis donne le milieu suivant.`,
      ask: `x⁽${'¹²³'[k]}⁾ =`, start: { math: `x_${k + 1}` },
      judge: { kind: 'value', expect: String(nx), form: 'any', menu: HMENU.map((o) => ({ id: o.id, label: o.label, valid: o.id === (keepRight ? 'right' : 'left'), why: o.id === (keepRight ? 'right' : 'left') ? undefined : o.why || `f change de signe sur [${keepRight ? fr(x.toDecimal()) : fr(a.toDecimal())} ; ${keepRight ? fr(b.toDecimal()) : fr(x.toDecimal())}] : c'est là qu'est le zéro.` })) },
    };
    script.push(seg, { kind: 'eq', math: fr(nx.toDecimal()).replace('−', '-'), note: `[${fr(na.toDecimal())} ; ${fr(nb.toDecimal())}]`, subgoal: 'iterate' });
    a = na;
    b = nb;
  }
  const km = kminScript(d, { guided: false, menu: true });
  const segK = { kind: 'segment', html: `Combien d'itérations garantissent la tolérance ${d.tolS} ? D'abord (b − a)/tol.`, ask: '(b − a)/tol =', start: { math: `${d.L}/${d.tolT}` }, judge: { kind: 'value', form: 'any', menu: menuOf(KMENU, 'bound') } };
  const [first, ...rest] = script;
  return linesItem({
    skill: BI, level: 3, mode: 'tap', keys: KEYS, tapActions: 'menu',
    prompt: `${prompt0(d)}. Fais trois pas de bissection (choisis la moitié à garder), puis calcule le nombre d'itérations k_min qui garantit la tolérance.`,
    start: first.start.math, judge: first.judge,
    script: [{ kind: 'note', html: first.html }, ...rest, segK, ...km],
    hints: H('On garde la moitié où f change de signe.',
      `Si f(x) et f(a) ont le même signe, le zéro est dans [x ; □].`,
      `Puis k > log₂(${fr(Nt(d))}) − 1, donc k_min = ${d.kmin}.`),
    subgoals: SUB, key: `${BI}:3:${d.f}:${d.a}:${d.L}:${d.e}`, baits: ['n_bisect_wrong_half', 'n_bisect_no_minus1', 'n_bisect_log10'], fallback: d.fallback,
  });
}

// ---------- the program ----------

const BISECT = refCode(`def bisection(f, a, b, tol):
    kmin = int(«math.log((b - a) / tol) / math.log(2)»)   # plus petit entier > log2(...) - 1
    x = (a + b) / 2
    for k in range(kmin):
        if f(x) * f(a) < 0:
            b = «x»
        else:
            a = «x»
        x = «(a + b) / 2»
    return [x, kmin]
`);
const TRAPS = {
  0: [{ text: 'math.log10((b - a) / tol)', rule: 'n_bisect_log10' }, { text: 'math.log((b - a) / tol) / math.log(2) + 1', rule: 'n_bisect_no_minus1' }],
  1: [],
  2: [],
  3: [],
};
const FILLERS = { 0: ['math.log(b - a) / math.log(2)'], 3: ['(b - a) / 2', 'a + b / 2'] };
const TESTS = [
  { setup: 'def f(x): return x*x - 2', expr: 'bisection(f, 1, 2, 1e-3)', expect: '[1.4150390625, 9]', tol: 1e-12 },
  { setup: 'def f(x): return x**3 - x - 2', expr: 'bisection(f, 1, 2, 1e-6)', expect: '[1.5213804244995117, 19]', tol: 1e-12 },
  { setup: 'def f(x): return math.cos(x) - x', expr: 'bisection(f, 0, 1, 1e-4)', expect: '[0.73907470703125, 13]', tol: 1e-12 },
];

// The exam question (GM 2012): a cubic with 3 zeros on [−2 ; 2].
const ZEROS = [-3, -2, -1, 1, 2, 3].map((n) => new Q(n, 2));
function cubicData(rng) {
  for (let t = 0; t < 200; t++) {
    const z = rng.shuffle(ZEROS.slice()).slice(0, 3).sort((p, q) => p.valueOf() - q.valueOf());
    const f = (x) => z.reduce((s, r) => s * (x - r.valueOf()), 1);
    const [e, , tolS] = rng.pick([[5, '', '10⁻⁵'], [4, '', '10⁻⁴'], [6, '', '10⁻⁶'], [3, '', '10⁻³']]);
    const y = Math.log2(4 * 10 ** e);
    if (Math.abs(y - Math.round(y)) < 0.05) continue;
    let a = -2;
    let b = 2;
    for (let k = 0; k < 60; k++) {
      const x = (a + b) / 2;
      if (Math.sign(f(x)) === Math.sign(f(a))) a = x; else b = x;
    }
    const lim = (a + b) / 2;
    const reached = z.find((r) => Math.abs(r.valueOf() - lim) < 1e-9);
    if (!reached) continue;
    const other = z.find((r) => r !== reached);
    return { z, reached, other, e, tolS, y, k: Math.floor(y), k1: Math.floor(y) + 1, k10: Math.floor(Math.log10(4 * 10 ** e)) };
  }
  throw new Error('bissection : pas de polynôme');
}
const zT = (r) => fr(String(r));
const factT = (r) => (r.n > 0 ? `(x − ${zT(r)})` : `(x + ${zT(r.neg())})`);
function cubicMcq(rng, level, opts) {
  const c = cubicData(rng);
  const opt = (r, k, rule) => ({ html: `vers ${zT(r)}, en au plus ${k} itérations`, correct: !rule && r === c.reached && k === c.k, ...(rule ? { rule } : {}) });
  return mcq({
    skill: BI, level, key: `${BI}:zero:${c.z.join(',')}:${c.e}`, exam: examTag(opts),
    prompt: `On applique la bissection à f(x) = ${c.z.map(factT).join('')} sur [−2 ; 2], avec tol = ${c.tolS} (le premier milieu est 0). Vers quel zéro converge-t-elle, et en au plus combien d'itérations la tolérance est-elle garantie ?`,
    options: [opt(c.reached, c.k), opt(c.reached, c.k1, 'n_bisect_no_minus1'), opt(c.reached, c.k10, 'n_bisect_log10'), { html: `vers ${zT(c.other)}, en au plus ${c.k} itérations`, correct: false }],
    solution: [{ html: `f(0) = ${fr(String(c.z.reduce((s, r) => s.mul(r.neg()), new Q(1))))} : on garde chaque fois la moitié où f change de signe, et la suite tend vers ${zT(c.reached)}. log₂(4/${c.tolS}) − 1 ≈ ${fr((c.y - 1).toFixed(1))}, donc ${c.k} itérations suffisent.`, note: '' }],
  }, rng);
}

function level5(rng) {
  return codeItem({
    skill: BI, level: 5, ref: BISECT, blanks: holesFor(5, BISECT), traps: TRAPS, fillers: FILLERS, rng,
    prompt: 'Complète la bissection : kmin est le plus petit entier k tel que (b − a)/2^(k+1) ≤ tol ; la fonction renvoie [x⁽ᵏᵐⁱⁿ⁾, kmin].',
    tests: TESTS, then: cubicMcq(rng, 5, {}), hints: [], subgoals: SUB, key: '5',
  });
}

// ---------- exam ----------

function examMcq(rng, opts) {
  if (rng.chance(0.25)) {
    return codeMcq({ skill: BI, ref: BISECT, hole: 0, traps: TRAPS, fillers: FILLERS, key: 'kmin', exam: examTag(opts), prompt: 'La fonction Python ci-dessous applique la bissection.' }, rng);
  }
  return cubicMcq(rng, 4, opts);
}

function examTf(rng, opts) {
  if (rng.chance(0.5)) {
    return tfItem({
      skill: BI, level: 4, key: 'errup', exam: examTag(opts),
      statement: 'Pour la bissection, l\'erreur |α − x⁽ᵏ⁾| diminue à chaque itération.',
      truth: false,
      counter: { kind: 'num', prop: 'bisectErrorUp', params: {}, ask: [{ v: 'f', label: 'f(x) =' }, { v: 'a', label: 'a =' }, { v: 'b', label: 'b =' }], answer: { f: 'x-0,51', a: '0', b: '1' } },
      explanation: 'Faux : c\'est la borne (b − a)/2^(k+1) qui est divisée par 2. Pour f(x) = x − 0,51 sur [0 ; 1], x⁽⁰⁾ = 0,5 (erreur 0,01), puis x⁽¹⁾ = 0,75 (erreur 0,24).',
    });
  }
  return vfMcq({
    skill: BI, key: `${BI}:tf:square`, exam: examTag(opts), truth: false,
    statement: 'La bissection s\'applique à f(x) = (x − 1)² sur [0 ; 3].',
    explanation: 'Faux : f(0) = 1 et f(3) = 4 sont de même signe ; (x − 1)² ne change jamais de signe, et la bissection ne peut pas commencer.',
  }, rng);
}

export function genBisection(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return examMcq(rng, opts);
  if (opts.exam === 'tf') return examTf(rng, opts);
  switch (level) {
    case 1: return rng.chance(0.5) ? kminLines(rng, 1) : table(rng, 1);
    case 2: return rng.chance(0.5) ? kminLines(rng, 2) : table(rng, 2);
    case 3: return level3(rng);
    case 4: return table(rng, 4);
    default: return level5(rng);
  }
}

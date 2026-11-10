// f-sine-cosine (module F, part a, step U10): sine and cosine series of f on
// [0 ; L] (odd or even extension, period 2L): bₙ = (2/L)∫₀^L f sin(nπx/L),
// a₀ and aₙ = (2/L)∫₀^L f cos(nπx/L). Catalogue
// docs/universite/VCF-analyse-3-4.md.
//
// Families (multiplier c ∈ {1, 2, 3}): c·x, the constant c, c·x², c·x(L − x),
// c(2πx − x²) (2021), and the triangle 2x / 2π − 2x (2019) on [0 ; π];
// c·x, c, c·x(L − x) on [0 ; L], L ∈ {1, 2}. The coefficient is a part
// `equiv` in n (integrations by parts of fourier-a-kit.js), followed by the
// odd terms n = 2k + 1 when the even ones vanish. The families and their
// parts are shared with f-series-problem (fourier-a-problem.js).

import { MT, H, q, fr, V, P, vMul, vScale, vText, vZero, vEven, pAt, ipp, ipvWrong, freq, build, COEF, COEFK, atN, kText, vOddText, KEYS, mcqMulti } from './fourier-a-kit.js';
import { examTag } from './kit.js';

const SK = 'f-sine-cosine';
const SUB = [
  { id: 'formula', label: 'formule de bₙ (prolongement impair)', skill: SK },
  { id: 'ipp', label: 'intégration par parties', skill: 'a1-int-parts' },
  { id: 'assemble', label: 'assembler bₙ', skill: SK },
];

export const SINE_CHOICES = [
  { id: 'ipp', label: 'Intégrer par parties, u = le polynôme' },
  { id: 'prim', label: 'Écrire une primitive' },
  { id: 'eval', label: 'Évaluer aux bornes : sin(nπ) = 0, cos(nπ) = (−1)ⁿ' },
  { id: 'simp', label: 'Simplifier' },
  { id: 'odd', label: 'Remplacer n par 2k + 1 et simplifier' },
  { id: 'sign', label: 'Primitive de sin(nx) : cos(nx)/n', rule: 'f_ipp_sign', why: 'La dérivée de cos(nx) est −n sin(nx) : une primitive de sin(nx) est −cos(nx)/n.' },
  { id: 'half', label: 'Prendre le facteur 1/L devant l\'intégrale', rule: 'f_sine_wrong_factor', why: 'Le prolongement impair double l\'intégrale sur [0 ; L] : le facteur est 2/L.' },
];

const cx = (c, body) => (c === 1 ? body : `${c}${body}`);

// A family on [0 ; L]: {kind, c, L, p (polynomial, or null for the triangle), show, id}.
export function sineFamily(rng, { kinds, Ls = ['π'] } = {}) {
  const c = rng.pick([1, 2, 3]);
  const L = rng.pick(Ls);
  const pool = kinds || (L === 'π' ? ['x', 'one', 'x2', 'xpx', 'quad2', 'tri'] : ['x', 'one', 'xpx']);
  const kind = rng.pick(pool);
  return famOf(kind, c, L);
}

export function famOf(kind, c, L) {
  const Lt = L === 'π' ? 'π' : String(L);
  const Lv = L === 'π' ? V([[c, 1]]) : V([[c * L]]);
  const p = {
    x: P(0, c), one: P(c), x2: P(0, 0, c), xpx: P(0, Lv, -c), quad2: P(0, V([[2 * c, 1]]), -c), tri: null,
  }[kind];
  const show = {
    x: cx(c, 'x'), one: String(c), x2: cx(c, 'x²'), xpx: cx(c, `x(${Lt} − x)`), quad2: c === 1 ? '2πx − x²' : `${c}(2πx − x²)`,
    tri: c === 1 ? '2x sur [0 ; π/2] et 2π − 2x sur [π/2 ; π]' : `${2 * c}x sur [0 ; π/2] et ${2 * c}π − ${2 * c}x sur [π/2 ; π]`,
  }[kind];
  // f(0) and f(L), for the comparison at the ends (Dirichlet).
  const at0 = '0';
  const atL = { x: L === 'π' ? cx(c, 'π') : String(c * L), one: String(c), x2: L === 'π' ? cx(c, 'π^2') : String(c * L * L), xpx: '0', quad2: cx(c, 'π^2'), tri: '0' }[kind];
  return { kind, c, L, Lt, p, show, at0: kind === 'one' ? String(c) : at0, atL, id: `${kind}:${c}:${L}` };
}

const Kof = (L) => (L === 'π' ? { K: '2/π', Kv: V([[2, -1]]) } : L === 1 ? { K: '2', Kv: V([[2]]) } : { K: '1', Kv: V([[1]]) });
const Kp = (K) => (K === '1' ? '' : `(${K}) `);

// bₙ of the sine series: {start, lines: [{math, act, piece?}], goal, value?, odd: {start, goal} | null, traps}.
export function sineCoef(f) {
  const { K, Kv } = Kof(f.L);
  if (f.kind === 'tri') {
    const a = 2 * f.c;
    const ax = `${a}x`;
    const b = `${a}π-${a}x`;
    const s1 = `${a}/n`;
    const goal = `${4 * a}sin(nπ/2)/(π n^2)`;
    return {
      start: `(2/π)(int(${ax} sin(n x), x, 0, π/2)+int((${b}) sin(n x), x, π/2, π))`,
      lines: [
        { math: `(2/π)(bracket(-${ax} cos(n x)/n, x, 0, π/2)+(${s1})int(cos(n x), x, 0, π/2)+bracket((${a}x-${a}π) cos(n x)/n, x, π/2, π)-(${s1})int(cos(n x), x, π/2, π))`, act: 'ipp', piece: `-${ax} cos(n x)/n` },
        { math: `(2/π)(-${f.c === 1 ? '' : f.c}π cos(nπ/2)/n+${a}sin(nπ/2)/n^2+${f.c === 1 ? '' : f.c}π cos(nπ/2)/n+${a}sin(nπ/2)/n^2)`, act: 'eval', piece: `${a}sin(nπ/2)/n^2` },
        { math: goal, act: 'simp' },
      ],
      goal,
      wrongHalf: `${2 * a}sin(nπ/2)/(π n^2)`,
      wrongSign: `-${4 * a}sin(nπ/2)/(π n^2)`,
      wrong02: `(1/π)(int(${ax} sin(n x), x, 0, π/2)+int((${b}) sin(n x), x, π/2, 2π))`,
      odd: { start: `${4 * a}sin((2k+1)π/2)/(π (2k+1)^2)`, goal: `${4 * a}(-1)^k/(π (2k+1)^2)` },
      oddK: `${4 * a}(-1)^k/(π (2k+1)^2)`,
    };
  }
  const ch = ipp({ K, Kv, p: f.p, trig: 'sin', L: f.L });
  const goal = vText(ch.value);
  const pattern = vZero(vEven(ch.value));
  const intOf = ch.start.replace(/^\([^)]*\) /, '');
  return {
    start: ch.start, lines: ch.lines, goal, value: ch.value,
    wrongHalf: vText(vScale(ch.value, q(1, 2))),
    wrongSign: vText(vMul(Kv, ipvWrong(f.p, 'sin', f.L))),
    wrong02: f.L === 'π' ? `(1/π) ${intOf.replace(', x, 0, π)', ', x, 0, 2π)')}` : null,
    odd: pattern ? { start: atN(goal, '2k+1'), goal: vOddText(ch.value) } : null,
    oddK: vOddText(ch.value),
  };
}

// The parts of a sine coefficient: bₙ (equiv in n), then n = 2k + 1.
export function sineParts(f, { level, sub = { formula: 'formula', ipp: 'ipp', assemble: 'assemble' } }) {
  const sc = sineCoef(f);
  const traps = {
    f_sine_wrong_factor: [sc.wrongHalf],
    f_ipp_sign: [sc.wrongSign],
    ...(sc.wrong02 ? { f_interval_02pi: [{ line: sc.wrong02, ctx: { f: f.show } }] } : {}),
  };
  const lines = sc.lines.map((l, i) => {
    const last = i === sc.lines.length - 1;
    const line = { math: l.math, note: { ipp: 'Par parties', prim: 'Primitive', eval: 'Aux bornes', simp: 'Simplifier' }[l.act], subgoal: last ? sub.assemble : sub.ipp, act: l.act };
    if (l.piece) line.blank = [l.piece];
    if (last) { line.blank = [l.math]; line.blank2 = [l.math]; }
    return line;
  });
  const parts = [{ html: 'bₙ :', ask: 'bₙ =', start: sc.start, judge: COEF(sc.goal, { traps }), lines }];
  if (sc.odd && level !== 1) {
    parts.push({
      html: f.kind === 'tri' ? 'n pair : sin(nπ/2) = 0, donc bₙ = 0. Pour n = 2k + 1, sin((2k + 1)π/2) = (−1)ᵏ :' : 'n pair : bₙ = 0. Pour n impair, n = 2k + 1 :',
      ask: 'b_(2k+1) =', start: sc.odd.start, judge: COEFK(sc.odd.goal),
      lines: [{ math: sc.odd.goal, note: f.kind === 'tri' ? 'sin((2k + 1)π/2) = (−1)ᵏ' : '(−1)^(2k+1) = −1', subgoal: sub.assemble, act: 'odd', blank: [sc.odd.goal] }],
    });
  }
  return { parts, sc };
}

// The decision « which formula? » of a sine series.
export function formulaDecision(f, kind = 'sin') {
  const Lt = f.Lt;
  const arg = f.L === 'π' ? 'nx' : f.L === 1 ? 'nπx' : 'nπx/2';
  const K = f.L === 'π' ? '2/π' : f.L === 1 ? '2' : '1';
  const half = f.L === 'π' ? '1/π' : f.L === 1 ? '1' : '1/2';
  if (kind === 'sin') {
    return { kind: 'decision', prompt: 'Série en sinus : quelle formule ?', options: [
      { id: 'ok', label: `Prolongement impair : bₙ = (${K})∫₀^${Lt} f(x) sin(${arg}) dx`, valid: true },
      { id: 'half', label: `bₙ = (${half})∫₀^${Lt} f(x) sin(${arg}) dx`, valid: false, rule: 'f_sine_wrong_factor', why: `Le prolongement impair a la période ${f.L === 'π' ? '2π' : 2 * f.L} : sur [−${Lt} ; ${Lt}], f(x) sin(${arg}) est paire, l'intégrale vaut deux fois celle sur [0 ; ${Lt}]. Le facteur est 2/L.` },
      { id: 'cos', label: `aₙ = (${K})∫₀^${Lt} f(x) cos(${arg}) dx`, valid: false, why: 'C\'est la série en cosinus (prolongement pair). La série en sinus n\'a que des bₙ.' },
      ...(f.L === 'π' ? [{ id: 'twopi', label: 'bₙ = (1/π)∫₀^2π f(x) sin(nx) dx', valid: false, rule: 'f_interval_02pi', why: 'f n\'est donnée que sur [0 ; π] : sur ]π ; 2π[, le prolongement impair vaut −f(2π − x), pas la formule de f.' }] : []),
    ] };
  }
  return { kind: 'decision', prompt: 'Série en cosinus : quelle formule ?', options: [
    { id: 'ok', label: `Prolongement pair : a₀ et aₙ = (${K})∫₀^${Lt} f(x) cos(${arg}) dx`, valid: true },
    { id: 'half', label: `aₙ = (${half})∫₀^${Lt} f(x) cos(${arg}) dx`, valid: false, rule: 'f_sine_wrong_factor', why: 'Le prolongement pair double l\'intégrale sur [0 ; L] : le facteur est 2/L.' },
    { id: 'sin', label: `bₙ = (${K})∫₀^${Lt} f(x) sin(${arg}) dx`, valid: false, why: 'C\'est la série en sinus (prolongement impair). La série en cosinus n\'a que a₀ et des aₙ.' },
  ] };
}

// ---------- the cosine series: a₀, aₙ ----------

function cosineParts(f, level) {
  const { K, Kv } = Kof(f.L);
  const { Lv } = freq(f.L);
  // a₀ = (2/L)∫₀^L p dx.
  const prim = [V(), ...f.p.map((c, j) => vScale(c, q(1, j + 1)))];
  const a0 = vText(vMul(Kv, pAt(prim, Lv)));
  const pT = { x: cx(f.c, 'x'), x2: `${f.c === 1 ? '' : f.c}x^2`, xpx: `${f.c === 1 ? '' : f.c}x(${f.Lt}-x)` }[f.kind];
  const primT = { x: `${f.c === 1 ? '' : f.c}x^2/2`, x2: `${f.c === 1 ? '' : f.c}x^3/3`, xpx: `${f.c === 1 ? '' : f.c}(${f.Lt}x^2/2-x^3/3)` }[f.kind];
  const ch = ipp({ K, Kv, p: f.p, trig: 'cos', L: f.L });
  const goal = vText(ch.value);
  const lines = ch.lines.map((l, i) => {
    const last = i === ch.lines.length - 1;
    const line = { math: l.math, note: { ipp: 'Par parties', prim: 'Primitive', eval: 'Aux bornes', simp: 'Simplifier' }[l.act], subgoal: last ? 'assemble' : 'ipp', act: l.act };
    if (l.piece) line.blank = [l.piece];
    if (last) { line.blank = [l.math]; line.blank2 = [l.math]; }
    return line;
  });
  const parts = [
    {
      html: 'a₀ à part :', ask: 'a₀ =', start: `${Kp(K)}int(${pT}, x, 0, ${f.Lt})`, judge: { kind: 'definite' },
      lines: [
        { math: `${Kp(K)}bracket(${primT}, x, 0, ${f.Lt})`, note: 'Primitive', subgoal: 'formula', act: 'prim', blank: [primT] },
        { math: a0, note: 'a₀', subgoal: 'formula', act: 'eval', blank: [a0] },
      ],
    },
    { html: 'aₙ :', ask: 'aₙ =', start: ch.start, judge: COEF(goal, { traps: { f_sine_wrong_factor: [vText(vScale(ch.value, q(1, 2)))], f_ipp_sign: [vText(vMul(Kv, ipvWrong(f.p, 'cos', f.L)))] } }), lines },
  ];
  if (/\(1-\(-1\)\^n\)|\(\(-1\)\^n-1\)/.test(goal) && level !== 1) {
    const g = vOddText(ch.value);
    parts.push({ html: 'n pair : aₙ = 0. Pour n impair, n = 2k + 1 :', ask: 'a_(2k+1) =', start: atN(goal, '2k+1'), judge: COEFK(g), lines: [{ math: g, note: '(−1)^(2k+1) = −1', subgoal: 'assemble', act: 'odd', blank: [g] }] });
  }
  return { parts, goal };
}

function linesVariant(level, rng, opts) {
  let f;
  if (level === 5) f = famOf(rng.pick(['quad2', 'quad2', 'xpx', 'tri']), rng.pick([1, 2]), 'π');
  else if (level === 4) f = sineFamily(rng, { Ls: ['π', 'π', 1, 2], kinds: undefined });
  else f = sineFamily(rng, { Ls: ['π', 'π', 'π', 1], kinds: ['x', 'one', 'x2', 'xpx'] });
  if (f.kind === 'tri' && f.L !== 'π') f = famOf('x', f.c, f.L);
  const cosine = level <= 4 && ['x', 'x2', 'xpx'].includes(f.kind) && rng.chance(0.3);
  const built = cosine ? cosineParts(f, level) : sineParts(f, { level });
  const parts = built.parts;
  const dec = formulaDecision(f, cosine ? 'cos' : 'sin');
  const ext = {
    kind: 'decision', prompt: `On demande la série en ${cosine ? 'cosinus' : 'sinus'} de f : quel prolongement à [−${f.Lt} ; ${f.Lt}] ?`, levels: [3], options: [
      { id: 'odd', label: 'Impair', valid: !cosine, why: 'Le prolongement impair donne une série en sinus ; on demande les cosinus.' },
      { id: 'even', label: 'Pair', valid: cosine, why: 'Le prolongement pair donne une série en cosinus ; on demande les sinus.' },
    ],
  };
  parts[0].pre = level === 1 ? [{ kind: 'note', html: `Formule : ${dec.options[0].label}.` }] : [ext, dec];
  const T = f.L === 'π' ? '2π' : String(2 * f.L);
  const name = cosine ? 'en cosinus' : 'en sinus';
  return build({
    skill: SK, level, parts, subgoals: SUB, keys: KEYS, choices: SINE_CHOICES,
    prompt: `f(x) = ${fr(f.show)}${f.kind === 'tri' ? '' : ` sur [0 ; ${f.Lt}]`}. Calcule les coefficients de sa série ${name} (${cosine ? 'prolongement pair' : 'prolongement impair'}, période ${T}).`,
    hints: H(cosine ? 'Prolongement pair : seulement a₀ et des aₙ, avec le facteur 2/L et l\'intégrale sur [0 ; L].' : 'Prolongement impair : seulement des bₙ, intégrale sur [0 ; L] avec le facteur 2/L.',
      `${cosine ? 'aₙ' : 'bₙ'} = ${MT(parts[cosine ? 1 : 0].start)}`,
      MT(parts[cosine ? 1 : 0].lines[0].math)),
    key: `${SK}:${level}:${cosine ? 'c' : 's'}:${f.id}`, exam: examTag(opts, 5),
  });
}

// Exam: « bₙ = ? », several writings and the traps' values (plusieurs réponses).
function mcqVariant(rng, opts) {
  const f = sineFamily(rng, { Ls: ['π', 'π', 1], kinds: ['x', 'one', 'x2', 'xpx', 'quad2'] });
  const sc = sineCoef(f.kind === 'tri' ? famOf('x2', f.c, f.L) : f);
  const right2 = sc.value ? vText(sc.value, { split: true }) : null;
  const options = [
    { html: `bₙ = ${MT(sc.goal)}`, correct: true },
    right2 && right2 !== sc.goal ? { html: `bₙ = ${MT(right2)}`, correct: true } : null,
    { html: `bₙ = ${MT(sc.wrongHalf)}`, correct: false, rule: 'f_sine_wrong_factor' },
    sc.wrongSign !== sc.goal ? { html: `bₙ = ${MT(sc.wrongSign)}`, correct: false, rule: 'f_ipp_sign' } : null,
    sc.odd ? { html: `b₂ₖ = 0 et b₂ₖ₊₁ = ${MT(sc.odd.goal)}`, correct: true } : { html: 'bₙ = 0 pour n pair', correct: false },
  ];
  return mcqMulti({
    skill: SK, level: 4, key: `${SK}:mcq:${f.id}`, exam: examTag(opts, 1), options,
    prompt: `f(x) = ${fr(f.show)} sur [0 ; ${f.Lt}]. Les coefficients de sa série en sinus vérifient :`,
    solution: [{ html: `bₙ = ${MT(sc.start)} = ${MT(sc.goal)}.`, note: '' }],
    expectedSec: 300,
  }, rng);
}

export const GEN_SINE = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return mcqVariant(rng, opts);
    if (opts.exam === 'open') return linesVariant(4, rng, opts);
    return linesVariant(level, rng, opts);
  },
};
void kText;

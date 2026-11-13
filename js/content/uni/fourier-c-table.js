// f-lap-table and f-lap-abscissa (module F, part c, step U10): the
// Laplace transform by the table (L1 to L14) and the properties (shift
// LP4, −F′ for t·f LP5, delay LP7), with the half-plane Re z > γ₀; the
// abscissa of convergence of a sum of table terms or of a rational F.

import { blanks, partsItem } from './geo-kit.js';
import { asProblem } from './kit-problem.js';
import {
  MT, examTag, term, sumT, qt, q, H, KEYS, TABLE, rd, lap, opt, mcqMulti, mcqOne,
  P, pmul, lin, zpoly, cText,
} from './fourier-c-kit.js';
import { CQ } from '../../cas/complex.js';
import { Q } from '../../math/rational.js';
import { t } from '../../i18n.js';

const SK = 'f-lap-table';
const SKA = 'f-lap-abscissa';
const SUB = [
  { id: 'table', label: t('lignes de la table'), skill: SK },
  { id: 'property', label: t('propriété (décalage, −F′, retard)'), skill: SK },
  { id: 'abscissa', label: t('demi-plan Re z > γ₀'), skill: SKA },
  { id: 'expand', label: t('développer f'), skill: SK },
];
const SUBA = [{ id: 'value', label: t('abscisse γ₀'), skill: SKA }, { id: 'poles', label: t('pôles de F'), skill: SKA }];

// e^(k t) as text.
const ex = (k) => (k === 0 ? '' : k === 1 ? 'e^t' : `e^(${term(k, 't')})`);
const wt = (w) => term(w, 't');
const zs = (b) => (b === 0 ? 'z' : b > 0 ? `(z-${b})` : `(z+${-b})`); // z − b
// A table term c·g(t): {f, F (in z), g0, line}.
function tableTerm(kind, c, w) {
  switch (kind) {
    case 'const': return { f: qt(c), F: `${c}/z`, g0: 0, line: 'L2' };
    case 'pow': { const n = w; const F = [1, 1, 2, 6, 24][n] * c; return { f: term(c, n === 1 ? 't' : `t^${n}`), F: `${F}/z^${n + 1}`, g0: 0, line: 'L8' }; }
    case 'exp': return { f: term(c, ex(w)), F: `${c}/${zs(w)}`, g0: w, line: 'L3' };
    case 'sin': return { f: term(c, `sin(${wt(w)})`), F: `${c * w}/(z^2+${w * w})`, g0: 0, line: 'L4' };
    case 'cos': return { f: term(c, `cos(${wt(w)})`), F: `${term(c, 'z')}/(z^2+${w * w})`, g0: 0, line: 'L5' };
    case 'cosh': return { f: term(c, `cosh(${wt(w)})`), F: `${term(c, 'z')}/(z^2-${w * w})`, g0: w, line: 'L10' };
    case 'sinh': return { f: term(c, `sinh(${wt(w)})`), F: `${c * w}/(z^2-${w * w})`, g0: w, line: 'L11' };
    case 'texp': return { f: term(c, `t ${ex(w)}`.trim()), F: `${c}/${zs(w)}^2`, g0: w, line: 'L9' };
    default: throw new Error(kind);
  }
}
const joinF = (ts) => sumT(ts.map((tt) => (tt.F.startsWith('-') ? tt.F : `+${tt.F}`).replace(/^\+/, '')));
const joinf = (ts) => sumT(ts.map((tt) => tt.f));
const neg = (x) => (x.startsWith('-') ? x.slice(1) : `-${x}`);

// ---------- the data of an item ----------

// Shift: f = e^(bt)(c₁ cos ω₁t + c₂ sin ω₂t), F = G(z − b).
function tShift(rng) {
  const b = rng.pick([-3, -2, -1, 1, 2, 3]);
  const k1 = rng.pick(['cos', 'sin', 'pow', 'const']);
  const k2 = rng.pick(['sin', 'cos']);
  const w1 = k1 === 'pow' ? rng.pick([1, 2]) : rng.int(1, 5);
  const w2 = rng.int(1, 5);
  if ((k1 === k2 && w1 === w2)) return null;
  const c1 = rng.pick([1, 2, 3, 4, -2]);
  const c2 = rng.pick([1, 2, 3, -1, -3, -7]);
  const ts = [tableTerm(k1, c1, w1), tableTerm(k2, c2, w2)];
  const inner = joinf(ts);
  const G = joinF(ts);
  const sub = (s) => G.replace(/z/g, s);
  return {
    id: `shift:${b}:${inner}`, kind: 'shift', inner, G, b,
    f: `${ex(b)}(${inner})`, F: sub(zs(b)), g0: b, lines: ts.map((tt) => tt.line),
    wrong: { f_lap_shift_sign: sub(zs(-b)), none: G },
    prop: t('décalage (LP4) : {a} ↦ G(z {b} {c})', { a: MT(`${ex(b)}g(t)`), b: b > 0 ? '−' : '+', c: Math.abs(b) }),
    shiftBlank: zs(b).replace(/^\(|\)$/g, ''),
  };
}
// t·g(t): F = −G′(z).
function tTimes(rng) {
  const kind = rng.pick(['sin', 'cos', 'exp', 'sinh']);
  const w = kind === 'exp' ? rng.pick([-3, -2, -1, 1, 2]) : rng.int(1, 4);
  const c = rng.pick([1, 1, 2, 3, -1]);
  const g = tableTerm(kind, c, w);
  const body = tableTerm(kind, 1, w).f;
  const w2 = w * w;
  const F = {
    sin: `${2 * w * c}z/(z^2+${w2})^2`,
    cos: `${c === 1 ? '' : c === -1 ? '-' : c}(z^2-${w2})/(z^2+${w2})^2`,
    exp: `${c}/${zs(w)}^2`,
    sinh: `${2 * w * c}z/(z^2-${w2})^2`,
  }[kind];
  const g0 = kind === 'sinh' ? w : kind === 'exp' ? w : 0;
  return {
    id: `times:${kind}:${w}:${c}`, kind: 'times', inner: g.f, G: g.F, b: null,
    f: term(c, `t ${body}`), F, g0, lines: [g.line],
    wrong: { f_lap_tf_sign: neg(F), none: g.F },
    prop: t('multiplication par t (LP5) : {a} ↦ −G′(z)', { a: MT('t g(t)') }),
  };
}
// A sum of 2 or 3 table terms (no property).
function tSum(rng) {
  const kinds = ['const', 'pow', 'exp', 'sin', 'cos', 'cosh', 'sinh', 'texp'];
  const n = rng.pick([2, 3]);
  const ts = [];
  const used = new Set();
  while (ts.length < n) {
    const k = rng.pick(kinds);
    if (used.has(k)) continue;
    used.add(k);
    const w = k === 'pow' ? rng.pick([1, 2, 3]) : k === 'exp' || k === 'texp' ? rng.pick([-3, -2, -1, 1, 2, 3]) : rng.int(1, 4);
    ts.push(tableTerm(k, rng.pick([1, 2, 3, -1, -2, 5]), w));
  }
  const g0 = Math.max(...ts.map((tt) => tt.g0));
  const others = [...new Set(ts.map((tt) => tt.g0))].filter((x) => x !== g0);
  return { id: `sum:${joinf(ts)}`, kind: 'sum', f: joinf(ts), F: joinF(ts), g0, terms: ts, others, lines: ts.map((tt) => tt.line) };
}
// (t^n + e^(at))² or (1 + e^(at))², to expand first.
function tSquare(rng) {
  const a = rng.pick([-2, -1, 1, 2]);
  const n = rng.pick([0, 1, 2]);
  const P0 = n === 0 ? '1' : n === 1 ? 't' : 't^2';
  const ts = [
    n === 0 ? tableTerm('const', 1, 0) : tableTerm('pow', 1, 2 * n),
    n === 0 ? tableTerm('exp', 2, a) : n === 1 ? tableTerm('texp', 2, a) : { f: `2t^2 ${ex(a)}`, F: `4/${zs(a)}^3`, g0: a },
    tableTerm('exp', 1, 2 * a),
  ];
  const g0 = Math.max(0, a, 2 * a);
  return { id: `sq:${n}:${a}`, kind: 'square', f: `(${P0}+${ex(a)})^2`, expanded: joinf(ts), F: joinF(ts), g0, terms: ts, lines: ['L8', 'L9', 'L3'] };
}
// Delay (LP7): f = H(t − a)·e^(b(t − a)) sin(ω(t − a)).
function tDelay(rng) {
  const a = rng.pick([1, 2, 3]);
  const b = rng.pick([-2, -1, 1, 2, 3]);
  const w = rng.int(1, 4);
  const s = `t-${a}`;
  const f = `H(${s})e^(${b === 1 ? s : b === -1 ? `-(${s})` : `${b}(${s})`})sin(${w === 1 ? s : `${w}(${s})`})`;
  const F = `${w}e^(-${a === 1 ? '' : a}z)/(${zs(b)}^2+${w * w})`;
  return {
    id: `delay:${a}:${b}:${w}`, kind: 'delay', f, F, g0: b, a, b, w,
    inner: `${ex(b)}sin(${wt(w)})`, G: `${w}/(${zs(b)}^2+${w * w})`,
    wrong: { f_lap_shift_sign: `${w}e^(${a === 1 ? '' : a}z)/(${zs(b)}^2+${w * w})`, none: `${w}/(${zs(b)}^2+${w * w})` },
    lines: ['L6'], prop: t('retard (LP7) : g(t − {a})H(t − {a}) ↦ e^(−{b}z)G(z)', { a, b: a === 1 ? '' : a }),
  };
}

function data(rng, kinds) {
  for (let i = 0; i < 200; i++) {
    const d = ({ shift: tShift, times: tTimes, sum: tSum, square: tSquare, delay: tDelay })[rng.pick(kinds)](rng);
    if (d) return d;
  }
  return { ...tShift({ pick: (l) => l[0], int: (lo) => lo + 1 }), fallback: true };
}

const fHtml = (d) => MT(d.f.replace(/H\(/g, 'H('), { funcs: ['H'] });
const promptOf = (d) => (d.kind === 'delay'
  ? t('Calcule la transformée de Laplace F(z) de {a} retardée de {a2}, f(t) = {b} (H : Heaviside), et donne le demi-plan où elle existe.{c}', { a: MT(`${ex(d.b)}sin(${wt(d.w)})`), a2: d.a, b: fHtml(d), c: TABLE() })
  : t('Calcule la transformée de Laplace F(z) de f(t) = {a} et donne le demi-plan où elle existe.{b}', { a: fHtml(d), b: TABLE() }));
const halfLine = (g) => `Re z > ${g}`;
const lignes = (ls) => { const u = [...new Set(ls)]; return u.length > 1 ? t('Lignes {a}', { a: u.join(t(' et ')) }) : t('Ligne {a}', { a: u.join(t(' et ')) }); };

// ---------- lines ----------

function propertyDecision(d) {
  if (d.kind === 'delay') {
    return {
      kind: 'decision', prompt: t('Quelle propriété ?'), options: [
        { id: 'delay', label: t('Retard : multiplier G par e^(−{a}z)', { a: d.a === 1 ? '' : d.a }), valid: true },
        { id: 'wrong', label: t('Retard : multiplier G par e^({a}z)', { a: d.a === 1 ? '' : d.a }), valid: false, rule: 'f_lap_shift_sign', why: t('Retarder de {a} multiplie la transformée par e^(−{b}z) (LP7).', { a: d.a, b: d.a === 1 ? '' : d.a }) },
        { id: 'shift', label: t('Remplacer z par z + {a} dans G', { a: d.a }), valid: false, why: t('Ce serait la multiplication par e^(−at) (LP4), pas le retard.') },
      ],
    };
  }
  if (d.kind === 'shift') {
    return {
      kind: 'decision', prompt: t('Quelle propriété ?'), options: [
        { id: 'shift', label: t('Décalage : remplacer z par {a} dans G', { a: rd(zs(d.b).replace(/^\(|\)$/g, '')) }), valid: true },
        { id: 'wrong', label: t('Décalage : remplacer z par {a} dans G', { a: rd(zs(-d.b).replace(/^\(|\)$/g, '')) }), valid: false, rule: 'f_lap_shift_sign', why: t('{a} g(t) a pour transformée G(z {b} {c}) : e^(−bt) f ↦ F(z + b).', { a: rd(ex(d.b)), b: d.b > 0 ? '−' : '+', c: Math.abs(d.b) }) },
        { id: 'prod', label: t('Multiplier G par {a}', { a: rd(`ℒ(${ex(d.b)})`) }), valid: false, why: t('La transformée d\'un produit n\'est pas le produit des transformées (c\'est celle d\'une convolution).') },
      ],
    };
  }
  return {
    kind: 'decision', prompt: t('Quelle propriété ?'), options: [
      { id: 'deriv', label: 'ℒ(t g) = −G′(z)', valid: true },
      { id: 'plus', label: 'ℒ(t g) = G′(z)', valid: false, rule: 'f_lap_tf_sign', why: t('ℒ(t f) = −F′(z) : on dérive sous l\'intégrale, d/dz e^(−tz) = −t e^(−tz).') },
      { id: 'prod', label: 'ℒ(t g) = G(z)/z²', valid: false, why: t('La transformée d\'un produit n\'est pas le produit des transformées.') },
    ],
  };
}

function propItem(level, d, opts) {
  const seg2Traps = Object.fromEntries(Object.entries(d.wrong).filter(([k]) => k.startsWith('f_')).map(([k, v]) => [k, [v]]));
  const parts = [
    {
      start: `ℒ(${d.inner})`, judge: lap({ f: d.inner, F: d.G }),
      notes: level === 1 ? [t('{a} de la table.', { a: lignes(d.lines) })] : [],
      decisions: [{
        kind: 'decision', prompt: t('Que fait-on d\'abord ?'), levels: [2, 3], options: [
          { id: 'inner', label: t('Transformer {inner} avec la table', { inner: rd(d.inner) }), valid: true },
          { id: 'direct', label: t('Calculer l\'intégrale ∫₀^∞ f(t)e^(−tz) dt directement'), valid: true, quality: 'poor', why: t('Juste, mais la table et les propriétés vont beaucoup plus vite.') },
        ],
      }],
      lines: [{ math: d.G, note: t('Table : {a}', { a: [...new Set(d.lines)].join(', ') }), subgoal: 'table', blank: (d.G.match(/\d+/g) || []).filter((x) => x.length > 1 || Number(x) > 2).slice(0, 2), blank2: [d.G] }],
    },
    {
      html: d.kind === 'shift' ? t('Puis le décalage :') : d.kind === 'delay' ? t('Puis le retard :') : t('Puis la propriété :'), ask: 'F(z) =', start: 'F(z)',
      judge: lap({ f: d.f, F: d.F, gamma0: d.g0, halfPlane: true, traps: seg2Traps }),
      notes: level === 1 ? [d.prop] : [],
      decisions: level >= 2 ? [{ ...propertyDecision(d), levels: [2, 3] }] : [],
      lines: [
        { math: halfLine(d.g0), note: d.kind === 'shift' ? t('{a} déplace l\'abscisse de {b}', { a: rd(ex(d.b)), b: rd(d.b) }) : t('Même abscisse que g'), subgoal: 'abscissa' },
        { math: `F(z) = ${d.F}`, note: d.kind === 'shift' ? 'LP4' : d.kind === 'delay' ? 'LP7' : 'LP5 : −G′(z)', subgoal: 'property', blank: d.kind === 'shift' ? [d.shiftBlank, d.shiftBlank] : [d.F], blank2: [d.F] },
      ],
    },
  ];
  return partsItem({
    skill: SK, level, prompt: promptOf(d), parts, keys: KEYS,
    hints: H(d.kind === 'shift' ? t('Transforme d\'abord la parenthèse avec la table, puis remplace z par {a}.', { a: rd(zs(d.b).replace(/^\(|\)$/g, '')) }) : d.kind === 'delay' ? t('Transforme d\'abord la fonction sans retard, puis multiplie par e^(−az).') : t('Transforme d\'abord g avec la table, puis ℒ(t g) = −G′(z).'),
      `ℒ(${MT(d.inner)}) = ${MT(d.G)}`, `${MT(`F(z) = ${d.F}`)}, Re z > ${rd(d.g0)}`),
    subgoals: SUB, key: `${SK}:${level}:${d.id}`, exam: examTag(opts, 4), fallback: d.fallback, noHints: level >= 5 || !!opts.exam,
  });
}

function directItem(level, d, opts) {
  const lines = [];
  if (d.kind === 'square') lines.push({ math: `f(t) = ${d.expanded}`, note: t('Développer le carré'), subgoal: 'expand' });
  lines.push({ math: halfLine(d.g0), note: d.kind === 'sum' ? t('Le maximum des abscisses des termes') : t('Abscisse'), subgoal: 'abscissa' });
  lines.push({ math: `F(z) = ${d.F}`, note: d.kind === 'delay' ? t('Retard (LP7) : e^(−az)G(z)') : `${lignes(d.lines)}`, subgoal: d.kind === 'delay' ? 'property' : 'table' });
  const traps = d.wrong ? Object.fromEntries(Object.entries(d.wrong).filter(([k]) => k.startsWith('f_')).map(([k, v]) => [k, [v]])) : {};
  const judge = lap({ f: d.f, F: d.F, gamma0: d.g0, halfPlane: true, traps });
  return partsItem({
    skill: SK, level, prompt: promptOf(d),
    parts: [{ start: d.kind === 'delay' ? 'F(z)' : `ℒ(${d.f})`, judge, lines }],
    keys: KEYS,
    hints: H(d.kind === 'square' ? t('Développe le carré, puis transforme terme à terme.') : d.kind === 'delay' ? t('Transforme la fonction sans retard, puis multiplie par e^(−az).') : t('Linéarité : une ligne de la table par terme ; l\'abscisse est la plus grande.'),
      `Re z > ${rd(d.g0)}`, MT(`F(z) = ${d.F}`)),
    subgoals: SUB, key: `${SK}:${level}:${d.id}`, exam: examTag(opts, 4), fallback: d.fallback, noHints: level >= 5 || !!opts.exam,
  });
}

function mcqTable(rng, opts) {
  const d = data(rng, ['shift', 'times']);
  const w = d.kind === 'shift' ? 'f_lap_shift_sign' : 'f_lap_tf_sign';
  const wrongHalf = d.g0 === 0 ? (d.kind === 'shift' ? -d.b : 1) : 0;
  return mcqMulti({
    skill: SK, level: 4, key: `mcq:${d.id}`, exam: examTag(opts),
    prompt: t('Soit f(t) = {a} et F = ℒ(f). Coche les affirmations justes.{b}', { a: fHtml(d), b: TABLE() }),
    options: [
      opt(MT(`F(z) = ${d.F}`), true),
      opt(MT(`F(z) = ${d.wrong[w]}`), false, w),
      opt(MT(`F(z) = ${d.wrong.none}`), false),
      opt(t('F(z) existe pour Re z > {g0}', { g0: rd(d.g0) }), true),
      opt(t('F(z) existe seulement pour Re z > {wrongHalf}', { wrongHalf: rd(wrongHalf) }), false, 'f_lap_abscissa'),
    ],
    solution: [{ html: `${MT(`F(z) = ${d.F}`)}, Re z > ${rd(d.g0)}`, note: d.kind === 'shift' ? 'LP4' : 'LP5' }],
    expectedSec: 150,
  }, rng);
}

export function genTable(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return mcqTable(rng, opts);
  if (opts.exam === 'open') {
    const d = data(rng, ['shift', 'times', 'square']);
    const it = d.kind === 'square' ? directItem(4, d, opts) : propItem(4, d, opts);
    return asProblem(it, 4);
  }
  if (level <= 3) return propItem(level, data(rng, ['shift', 'times']), opts);
  if (level === 4) {
    const d = data(rng, ['shift', 'times', 'sum', 'square']);
    return d.kind === 'shift' || d.kind === 'times' ? propItem(4, d, opts) : directItem(4, d, opts);
  }
  const d = data(rng, ['delay', 'square', 'delay']);
  return d.kind === 'delay' ? propItem(5, d, opts) : directItem(5, d, opts);
}

// ---------- f-lap-abscissa ----------

// A rational F with real or complex poles: F = 1/(z^m q(z)).
function ratData(rng) {
  const m = rng.pick([1, 2]);
  const a = rng.pick([-2, -1, 1, 2]);
  const b = rng.pick([1, 2]);
  const cplx = rng.chance(0.6);
  const r2 = rng.pick([-3, -2, -1, 1, 2, 3].filter((x) => x !== a));
  const p = cplx ? P(a * a + b * b, -2 * a, 1) : pmul(lin(a), lin(r2));
  const D = pmul(m === 2 ? P(0, 0, 1) : P(0, 1), p);
  const res = cplx ? [0, a] : [0, a, r2];
  const g0 = Math.max(...res);
  const polesText = cplx ? `z = 0 ou z = ${cText(new CQ(new Q(a), new Q(b)))} ou z = ${cText(new CQ(new Q(a), new Q(-b)))}` : `z = 0 ou z = ${a} ou z = ${r2}`;
  return { id: `rat:${zpoly(D)}`, kind: 'rat', F: `1/(${zpoly(D)})`, D: zpoly(D), g0, res, polesText };
}

function abscItem(level, rng, opts) {
  const rat = level === 5 || (level === 4 && rng.chance(0.4)) || (level === 3 && rng.chance(0.3));
  const d = rat ? ratData(rng) : data(rng, ['sum', 'sum', 'square']);
  const terms = d.terms || [];
  const absc = rat ? d.res : terms.map((tt) => tt.g0);
  const maxLine = absc.length > 1 ? `max(${absc.join(' ; ')})` : String(absc[0]);
  const traps = { f_lap_abscissa: [...new Set([String(Math.min(...absc)), '0'].filter((x) => Number(x) !== d.g0))] };
  const parts = [];
  if (rat && level >= 4) {
    parts.push({ start: `${d.D} = 0`, judge: { kind: 'complex', form: 'set' }, lines: [{ math: d.polesText, note: t('Pôles de F'), subgoal: 'poles' }] });
  }
  const vJudge = { kind: 'value', expect: String(d.g0), traps };
  const vPart = {
    html: parts.length ? t('Puis l\'abscisse :') : null, ask: 'γ₀ =', start: 'γ₀', judge: vJudge,
    notes: level === 1 ? [rat ? t('Pôles de F : {polesText} ; parties réelles {a}.', { polesText: rd(d.polesText), a: absc.map(rd).join(', ') }) : t('Abscisses des termes : {a}.', { a: terms.map((tt) => `${MT(tt.f)} : ${rd(tt.g0)}`).join(' ; ') })] : [],
    decisions: [{
      kind: 'decision', prompt: t('Comment trouver γ₀ ?'), levels: [2, 3], options: rat ? [
        { id: 'poles', label: t('La plus grande partie réelle des pôles de F'), valid: true },
        { id: 'zero', label: t('Toujours 0, comme pour les lignes de la table en sin et cos'), valid: false, rule: 'f_lap_abscissa', why: t('Chaque pôle compte : γ₀ est la plus grande partie réelle des pôles.') },
      ] : [
        { id: 'terms', label: t('Le maximum des abscisses des termes'), valid: true },
        { id: 'min', label: t('Le minimum des abscisses des termes'), valid: false, rule: 'f_lap_abscissa', why: t('Il faut que chaque terme converge : on prend le plus grand γ₀.') },
        { id: 'zero', label: t('Toujours 0'), valid: false, rule: 'f_lap_abscissa', why: t('e^(αt) déplace l\'abscisse de α : ce n\'est pas toujours 0.') },
      ],
    }],
    lines: [
      ...(absc.length > 1 ? [{ math: maxLine, note: rat ? t('Parties réelles des pôles') : t('Abscisse de chaque terme'), subgoal: 'value', blank: absc.map(String).slice(0, 1), blank2: absc.map(String) }] : []),
      { math: String(d.g0), note: t('Le maximum'), subgoal: 'value' },
    ],
  };
  parts.push(vPart);
  const what = rat ? t('de la fonction f dont la transformée est F(z) = {F}', { F: MT(d.F) }) : t('de f(t) = {f}', { f: MT(d.f) });
  return partsItem({
    skill: SKA, level, prompt: rat ? t('Donne l\'abscisse de convergence γ₀ {what} (F est rationnelle).', { what }) : t('Donne l\'abscisse de convergence γ₀ {what}.{a}', { what, a: TABLE() }),
    parts, keys: KEYS,
    hints: H(rat ? t('Pour F rationnelle, γ₀ est la plus grande partie réelle des pôles.') : t('Quelle est l\'abscisse de chaque terme ? e^(αt) donne α, tⁿ, sin et cos donnent 0, cosh(ωt) donne |ω|.'),
      `γ₀ = ${rd(maxLine)}`, `γ₀ = ${rd(d.g0)}`),
    subgoals: SUBA, key: `${SKA}:${level}:${d.id}`, fallback: d.fallback, noHints: level >= 5,
  });
}

function mcqAbsc(rng, opts) {
  const d = data(rng, ['sum']);
  const lo = Math.min(...d.terms.map((tt) => tt.g0));
  return mcqMulti({
    skill: SKA, level: 4, key: `mcq:${d.id}`, exam: examTag(opts),
    prompt: t('Soit f(t) = {f} et F = ℒ(f). Coche les affirmations justes.', { f: MT(d.f) }),
    options: [
      opt(t('L\'abscisse de convergence est γ₀ = {g0}.', { g0: rd(d.g0) }), true),
      opt(t('F(z) est définie pour Re z > {a}.', { a: rd(d.g0 + 1) }), true),
      ...(d.g0 !== 0 ? [opt(t('L\'abscisse de convergence est 0, comme pour toute la table.'), false, 'f_lap_abscissa')] : []),
      ...(lo !== d.g0 ? [opt(t('L\'abscisse de convergence est γ₀ = {lo}.', { lo: rd(lo) }), false, 'f_lap_abscissa')] : []),
      opt(t('F(z) est définie pour Re z > {a}.', { a: rd(d.g0 - 1) }), false, 'f_lap_abscissa'),
      opt(t('F(z) est définie pour tout z ∈ ℂ.'), false),
    ],
    solution: [{ html: t('Abscisses des termes : {a} ; γ₀ = {g0}.', { a: d.terms.map((tt) => rd(tt.g0)).join(', '), g0: rd(d.g0) }), note: '' }],
    expectedSec: 90,
  }, rng);
}

export function genAbscissa(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return mcqAbsc(rng, opts);
  if (level === 5 && rng.chance(0.3)) {
    const d = data(rng, ['sum']);
    const lo = Math.min(...d.terms.map((tt) => tt.g0));
    return mcqOne({
      skill: SKA, level, key: `one:${d.id}`, prompt: t('Quelle est l\'abscisse de convergence de f(t) = {f} ?', { f: MT(d.f) }),
      right: `γ₀ = ${rd(d.g0)}`,
      wrongs: [opt(`γ₀ = ${rd(lo)}`, false, 'f_lap_abscissa'), opt(`γ₀ = ${rd(d.g0 === 0 ? 1 : 0)}`, false, 'f_lap_abscissa'), opt(`γ₀ = ${rd(d.g0 + 1)}`, false), opt(`γ₀ = ${rd(d.g0 - 1)}`, false)],
      solution: [{ html: t('Le maximum des abscisses des termes : {g0}.', { g0: rd(d.g0) }), note: '' }],
    }, rng);
  }
  return abscItem(level, rng, opts);
}
void q;

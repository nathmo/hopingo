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

const SK = 'f-lap-table';
const SKA = 'f-lap-abscissa';
const SUB = [
  { id: 'table', label: 'lignes de la table', skill: SK },
  { id: 'property', label: 'propriété (décalage, −F′, retard)', skill: SK },
  { id: 'abscissa', label: 'demi-plan Re z > γ₀', skill: SKA },
  { id: 'expand', label: 'développer f', skill: SK },
];
const SUBA = [{ id: 'value', label: 'abscisse γ₀', skill: SKA }, { id: 'poles', label: 'pôles de F', skill: SKA }];

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
const joinF = (ts) => sumT(ts.map((t) => (t.F.startsWith('-') ? t.F : `+${t.F}`).replace(/^\+/, '')));
const joinf = (ts) => sumT(ts.map((t) => t.f));
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
    f: `${ex(b)}(${inner})`, F: sub(zs(b)), g0: b, lines: ts.map((t) => t.line),
    wrong: { f_lap_shift_sign: sub(zs(-b)), none: G },
    prop: `décalage (LP4) : ${MT(`${ex(b)}g(t)`)} ↦ G(z ${b > 0 ? '−' : '+'} ${Math.abs(b)})`,
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
    prop: `multiplication par t (LP5) : ${MT('t g(t)')} ↦ −G′(z)`,
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
  const g0 = Math.max(...ts.map((t) => t.g0));
  const others = [...new Set(ts.map((t) => t.g0))].filter((x) => x !== g0);
  return { id: `sum:${joinf(ts)}`, kind: 'sum', f: joinf(ts), F: joinF(ts), g0, terms: ts, others, lines: ts.map((t) => t.line) };
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
    lines: ['L6'], prop: `retard (LP7) : g(t − ${a})H(t − ${a}) ↦ e^(−${a === 1 ? '' : a}z)G(z)`,
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
const promptOf = (d) => `Calcule la transformée de Laplace F(z) de ${d.kind === 'delay' ? `${MT(`${ex(d.b)}sin(${wt(d.w)})`)} retardée de ${d.a}, f(t) = ${fHtml(d)} (H : Heaviside),` : `f(t) = ${fHtml(d)}`} et donne le demi-plan où elle existe.${TABLE()}`;
const halfLine = (g) => `Re z > ${g}`;
const lignes = (ls) => { const u = [...new Set(ls)]; return `${u.length > 1 ? 'Lignes' : 'Ligne'} ${u.join(' et ')}`; };

// ---------- lines ----------

function propertyDecision(d) {
  if (d.kind === 'delay') {
    return {
      kind: 'decision', prompt: 'Quelle propriété ?', options: [
        { id: 'delay', label: `Retard : multiplier G par e^(−${d.a === 1 ? '' : d.a}z)`, valid: true },
        { id: 'wrong', label: `Retard : multiplier G par e^(${d.a === 1 ? '' : d.a}z)`, valid: false, rule: 'f_lap_shift_sign', why: `Retarder de ${d.a} multiplie la transformée par e^(−${d.a === 1 ? '' : d.a}z) (LP7).` },
        { id: 'shift', label: `Remplacer z par z + ${d.a} dans G`, valid: false, why: 'Ce serait la multiplication par e^(−at) (LP4), pas le retard.' },
      ],
    };
  }
  if (d.kind === 'shift') {
    return {
      kind: 'decision', prompt: 'Quelle propriété ?', options: [
        { id: 'shift', label: `Décalage : remplacer z par ${rd(zs(d.b).replace(/^\(|\)$/g, ''))} dans G`, valid: true },
        { id: 'wrong', label: `Décalage : remplacer z par ${rd(zs(-d.b).replace(/^\(|\)$/g, ''))} dans G`, valid: false, rule: 'f_lap_shift_sign', why: `${rd(ex(d.b))} g(t) a pour transformée G(z ${d.b > 0 ? '−' : '+'} ${Math.abs(d.b)}) : e^(−bt) f ↦ F(z + b).` },
        { id: 'prod', label: `Multiplier G par ${rd(`ℒ(${ex(d.b)})`)}`, valid: false, why: 'La transformée d\'un produit n\'est pas le produit des transformées (c\'est celle d\'une convolution).' },
      ],
    };
  }
  return {
    kind: 'decision', prompt: 'Quelle propriété ?', options: [
      { id: 'deriv', label: 'ℒ(t g) = −G′(z)', valid: true },
      { id: 'plus', label: 'ℒ(t g) = G′(z)', valid: false, rule: 'f_lap_tf_sign', why: 'ℒ(t f) = −F′(z) : on dérive sous l\'intégrale, d/dz e^(−tz) = −t e^(−tz).' },
      { id: 'prod', label: 'ℒ(t g) = G(z)/z²', valid: false, why: 'La transformée d\'un produit n\'est pas le produit des transformées.' },
    ],
  };
}

function propItem(level, d, opts) {
  const seg2Traps = Object.fromEntries(Object.entries(d.wrong).filter(([k]) => k.startsWith('f_')).map(([k, v]) => [k, [v]]));
  const parts = [
    {
      start: `ℒ(${d.inner})`, judge: lap({ f: d.inner, F: d.G }),
      notes: level === 1 ? [`${lignes(d.lines)} de la table.`] : [],
      decisions: [{
        kind: 'decision', prompt: 'Que fait-on d\'abord ?', levels: [2, 3], options: [
          { id: 'inner', label: `Transformer ${rd(d.inner)} avec la table`, valid: true },
          { id: 'direct', label: 'Calculer l\'intégrale ∫₀^∞ f(t)e^(−tz) dt directement', valid: true, quality: 'poor', why: 'Juste, mais la table et les propriétés vont beaucoup plus vite.' },
        ],
      }],
      lines: [{ math: d.G, note: `Table : ${[...new Set(d.lines)].join(', ')}`, subgoal: 'table', blank: (d.G.match(/\d+/g) || []).filter((x) => x.length > 1 || Number(x) > 2).slice(0, 2), blank2: [d.G] }],
    },
    {
      html: d.kind === 'shift' ? 'Puis le décalage :' : d.kind === 'delay' ? 'Puis le retard :' : 'Puis la propriété :', ask: 'F(z) =', start: 'F(z)',
      judge: lap({ f: d.f, F: d.F, gamma0: d.g0, halfPlane: true, traps: seg2Traps }),
      notes: level === 1 ? [d.prop] : [],
      decisions: level >= 2 ? [{ ...propertyDecision(d), levels: [2, 3] }] : [],
      lines: [
        { math: halfLine(d.g0), note: d.kind === 'shift' ? `${rd(ex(d.b))} déplace l'abscisse de ${rd(d.b)}` : 'Même abscisse que g', subgoal: 'abscissa' },
        { math: `F(z) = ${d.F}`, note: d.kind === 'shift' ? 'LP4' : d.kind === 'delay' ? 'LP7' : 'LP5 : −G′(z)', subgoal: 'property', blank: d.kind === 'shift' ? [d.shiftBlank, d.shiftBlank] : [d.F], blank2: [d.F] },
      ],
    },
  ];
  return partsItem({
    skill: SK, level, prompt: promptOf(d), parts, keys: KEYS,
    hints: H(d.kind === 'shift' ? `Transforme d'abord la parenthèse avec la table, puis remplace z par ${rd(zs(d.b).replace(/^\(|\)$/g, ''))}.` : d.kind === 'delay' ? 'Transforme d\'abord la fonction sans retard, puis multiplie par e^(−az).' : 'Transforme d\'abord g avec la table, puis ℒ(t g) = −G′(z).',
      `ℒ(${MT(d.inner)}) = ${MT(d.G)}`, `${MT(`F(z) = ${d.F}`)}, Re z > ${rd(d.g0)}`),
    subgoals: SUB, key: `${SK}:${level}:${d.id}`, exam: examTag(opts, 4), fallback: d.fallback, noHints: level >= 5 || !!opts.exam,
  });
}

function directItem(level, d, opts) {
  const lines = [];
  if (d.kind === 'square') lines.push({ math: `f(t) = ${d.expanded}`, note: 'Développer le carré', subgoal: 'expand' });
  lines.push({ math: halfLine(d.g0), note: d.kind === 'sum' ? 'Le maximum des abscisses des termes' : 'Abscisse', subgoal: 'abscissa' });
  lines.push({ math: `F(z) = ${d.F}`, note: d.kind === 'delay' ? 'Retard (LP7) : e^(−az)G(z)' : `${lignes(d.lines)}`, subgoal: d.kind === 'delay' ? 'property' : 'table' });
  const traps = d.wrong ? Object.fromEntries(Object.entries(d.wrong).filter(([k]) => k.startsWith('f_')).map(([k, v]) => [k, [v]])) : {};
  const judge = lap({ f: d.f, F: d.F, gamma0: d.g0, halfPlane: true, traps });
  return partsItem({
    skill: SK, level, prompt: promptOf(d),
    parts: [{ start: d.kind === 'delay' ? 'F(z)' : `ℒ(${d.f})`, judge, lines }],
    keys: KEYS,
    hints: H(d.kind === 'square' ? 'Développe le carré, puis transforme terme à terme.' : d.kind === 'delay' ? 'Transforme la fonction sans retard, puis multiplie par e^(−az).' : 'Linéarité : une ligne de la table par terme ; l\'abscisse est la plus grande.',
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
    prompt: `Soit f(t) = ${fHtml(d)} et F = ℒ(f). Coche les affirmations justes.${TABLE()}`,
    options: [
      opt(MT(`F(z) = ${d.F}`), true),
      opt(MT(`F(z) = ${d.wrong[w]}`), false, w),
      opt(MT(`F(z) = ${d.wrong.none}`), false),
      opt(`F(z) existe pour Re z > ${rd(d.g0)}`, true),
      opt(`F(z) existe seulement pour Re z > ${rd(wrongHalf)}`, false, 'f_lap_abscissa'),
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
  const absc = rat ? d.res : terms.map((t) => t.g0);
  const maxLine = absc.length > 1 ? `max(${absc.join(' ; ')})` : String(absc[0]);
  const traps = { f_lap_abscissa: [...new Set([String(Math.min(...absc)), '0'].filter((x) => Number(x) !== d.g0))] };
  const parts = [];
  if (rat && level >= 4) {
    parts.push({ start: `${d.D} = 0`, judge: { kind: 'complex', form: 'set' }, lines: [{ math: d.polesText, note: 'Pôles de F', subgoal: 'poles' }] });
  }
  const vJudge = { kind: 'value', expect: String(d.g0), traps };
  const vPart = {
    html: parts.length ? 'Puis l\'abscisse :' : null, ask: 'γ₀ =', start: 'γ₀', judge: vJudge,
    notes: level === 1 ? [rat ? `Pôles de F : ${rd(d.polesText)} ; parties réelles ${absc.map(rd).join(', ')}.` : `Abscisses des termes : ${terms.map((t) => `${MT(t.f)} : ${rd(t.g0)}`).join(' ; ')}.`] : [],
    decisions: [{
      kind: 'decision', prompt: 'Comment trouver γ₀ ?', levels: [2, 3], options: rat ? [
        { id: 'poles', label: 'La plus grande partie réelle des pôles de F', valid: true },
        { id: 'zero', label: 'Toujours 0, comme pour les lignes de la table en sin et cos', valid: false, rule: 'f_lap_abscissa', why: 'Chaque pôle compte : γ₀ est la plus grande partie réelle des pôles.' },
      ] : [
        { id: 'terms', label: 'Le maximum des abscisses des termes', valid: true },
        { id: 'min', label: 'Le minimum des abscisses des termes', valid: false, rule: 'f_lap_abscissa', why: 'Il faut que chaque terme converge : on prend le plus grand γ₀.' },
        { id: 'zero', label: 'Toujours 0', valid: false, rule: 'f_lap_abscissa', why: 'e^(αt) déplace l\'abscisse de α : ce n\'est pas toujours 0.' },
      ],
    }],
    lines: [
      ...(absc.length > 1 ? [{ math: maxLine, note: rat ? 'Parties réelles des pôles' : 'Abscisse de chaque terme', subgoal: 'value', blank: absc.map(String).slice(0, 1), blank2: absc.map(String) }] : []),
      { math: String(d.g0), note: 'Le maximum', subgoal: 'value' },
    ],
  };
  parts.push(vPart);
  const what = rat ? `de la fonction f dont la transformée est F(z) = ${MT(d.F)}` : `de f(t) = ${MT(d.f)}`;
  return partsItem({
    skill: SKA, level, prompt: `Donne l'abscisse de convergence γ₀ ${what}${rat ? ' (F est rationnelle)' : ''}.${rat ? '' : TABLE()}`,
    parts, keys: KEYS,
    hints: H(rat ? 'Pour F rationnelle, γ₀ est la plus grande partie réelle des pôles.' : 'Quelle est l\'abscisse de chaque terme ? e^(αt) donne α, tⁿ, sin et cos donnent 0, cosh(ωt) donne |ω|.',
      `γ₀ = ${rd(maxLine)}`, `γ₀ = ${rd(d.g0)}`),
    subgoals: SUBA, key: `${SKA}:${level}:${d.id}`, fallback: d.fallback, noHints: level >= 5,
  });
}

function mcqAbsc(rng, opts) {
  const d = data(rng, ['sum']);
  const lo = Math.min(...d.terms.map((t) => t.g0));
  return mcqMulti({
    skill: SKA, level: 4, key: `mcq:${d.id}`, exam: examTag(opts),
    prompt: `Soit f(t) = ${MT(d.f)} et F = ℒ(f). Coche les affirmations justes.`,
    options: [
      opt(`L'abscisse de convergence est γ₀ = ${rd(d.g0)}.`, true),
      opt(`F(z) est définie pour Re z > ${rd(d.g0 + 1)}.`, true),
      ...(d.g0 !== 0 ? [opt('L\'abscisse de convergence est 0, comme pour toute la table.', false, 'f_lap_abscissa')] : []),
      ...(lo !== d.g0 ? [opt(`L'abscisse de convergence est γ₀ = ${rd(lo)}.`, false, 'f_lap_abscissa')] : []),
      opt(`F(z) est définie pour Re z > ${rd(d.g0 - 1)}.`, false, 'f_lap_abscissa'),
      opt(`F(z) est définie pour tout z ∈ ℂ.`, false),
    ],
    solution: [{ html: `Abscisses des termes : ${d.terms.map((t) => rd(t.g0)).join(', ')} ; γ₀ = ${rd(d.g0)}.`, note: '' }],
    expectedSec: 90,
  }, rng);
}

export function genAbscissa(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return mcqAbsc(rng, opts);
  if (level === 5 && rng.chance(0.3)) {
    const d = data(rng, ['sum']);
    const lo = Math.min(...d.terms.map((t) => t.g0));
    return mcqOne({
      skill: SKA, level, key: `one:${d.id}`, prompt: `Quelle est l'abscisse de convergence de f(t) = ${MT(d.f)} ?`,
      right: `γ₀ = ${rd(d.g0)}`,
      wrongs: [opt(`γ₀ = ${rd(lo)}`, false, 'f_lap_abscissa'), opt(`γ₀ = ${rd(d.g0 === 0 ? 1 : 0)}`, false, 'f_lap_abscissa'), opt(`γ₀ = ${rd(d.g0 + 1)}`, false), opt(`γ₀ = ${rd(d.g0 - 1)}`, false)],
      solution: [{ html: `Le maximum des abscisses des termes : ${rd(d.g0)}.`, note: '' }],
    }, rng);
  }
  return abscItem(level, rng, opts);
}
void q;

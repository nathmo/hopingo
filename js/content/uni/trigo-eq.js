// Generators of module G3 (unit `trigo`), the equations and inequations:
// g3-basic-eq, g3-eq, g3-asinbcos, g3-bioche, g3-ineq. Catalogue:
// docs/universite/G-gymnase-1.md, G3. Judge `solset` with `periodic: true`
// (families with the integer k, compared on a window), `subst` for
// X = cos x and t = tan(x/2), and a bounded `domain` for the restriction
// to an interval (a part of its own).

import { Q } from '../../math/rational.js';
import { MT, fr, linesItem, mcq, tfItem } from './kit.js';
import {
  q, PERIODIC, KEYS, lit0, tpl, piT, famT, famsT, famsHtml, modQ, valueFloat, trigVal, IDS,
} from './trigo.js';

// ======================================================================
// shared pieces
// ======================================================================

// arccos, arcsin, arctan of the remarkable values, as multiples of π.
const ACOS = { 1: q(0), '√3/2': q(1, 6), '√2/2': q(1, 4), '1/2': q(1, 3), 0: q(1, 2), '-1/2': q(2, 3), '-√2/2': q(3, 4), '-√3/2': q(5, 6), '-1': q(1) };
const ASIN = { 1: q(1, 2), '√3/2': q(1, 3), '√2/2': q(1, 4), '1/2': q(1, 6), 0: q(0), '-1/2': q(-1, 6), '-√2/2': q(-1, 4), '-√3/2': q(-1, 3), '-1': q(-1, 2) };
const ATAN = { 0: q(0), '√3/3': q(1, 6), 1: q(1, 4), '√3': q(1, 3), '-√3/3': q(-1, 6), '-1': q(-1, 4), '-√3': q(-1, 3) };

// The families in u of f(u) = a: [[base, period]] (multiples of π).
export function baseFams(f, a) {
  if (f === 'cos') {
    const al = ACOS[a];
    if (a === '1' || a === '-1') return [[al, q(2)]];
    if (a === '0') return [[q(1, 2), q(1)]];
    return [[al, q(2)], [al.neg(), q(2)]];
  }
  if (f === 'sin') {
    const al = ASIN[a];
    if (a === '1' || a === '-1') return [[al, q(2)]];
    if (a === '0') return [[q(0), q(1)]];
    return [[al, q(2)], [q(1).sub(al), q(2)]];
  }
  return [[ATAN[a], q(1)]];
}

// u = m·x + φ as text.
const mxT = (m) => (m.eq(1) ? 'x' : m.d === 1 ? `${m.n}x` : m.n === 1 ? `x/${m.d}` : `(${m.n}x)/${m.d}`);
export const uT = (m, phi) => `${mxT(m)}${phi.n === 0 ? '' : phi.n > 0 ? `+${piT(phi)}` : `-${piT(phi.neg())}`}`;
const famRel = (lhs, fams) => fams.map(([b, p]) => `${lhs}=${famT(b, p)}`).join('∨');
// From the families in u = m·x + φ: the lines « m·x = … » and « x = … ».
function isolate(m, phi, fams) {
  const lines = [];
  const shifted = fams.map(([b, p]) => [b.sub(phi), p]);
  if (phi.n !== 0) lines.push({ math: famRel(mxT(m), shifted), note: `Isoler ${mxT(m)}`, subgoal: 'isolate' });
  const xs = shifted.map(([b, p]) => [b.div(m), p.div(m)]);
  if (!m.eq(1)) lines.push({ math: famRel('x', xs), note: 'Diviser aussi la période', subgoal: 'isolate' });
  return { lines, xs };
}

// The points of families in an interval [lo ; hi] (multiples of π).
function pointsIn(fams, lo, hi, loOpen = false, hiOpen = false) {
  const out = [];
  for (const [b, p] of fams) {
    const k0 = Math.ceil(lo.sub(b).div(p).valueOf()) - 1;
    const k1 = Math.floor(hi.sub(b).div(p).valueOf()) + 1;
    for (let k = k0; k <= k1; k++) {
      const v = b.add(p.mul(k));
      const c1 = v.cmp(lo);
      const c2 = v.cmp(hi);
      if (c1 < 0 || c2 > 0 || (loOpen && c1 === 0) || (hiOpen && c2 === 0)) continue;
      if (!out.some((w) => w.eq(v))) out.push(v);
    }
  }
  return out.sort((a, b) => a.cmp(b));
}
const setT = (pts) => (pts.length ? `{${pts.map(piT).join(';')}}` : '∅');
export const INTERVALS = [
  { text: '[0;2π[', lo: q(0), hi: q(2), loOpen: false, hiOpen: true, html: '[0 ; 2π[' },
  { text: '[-π;π]', lo: q(-1), hi: q(1), loOpen: false, hiOpen: false, html: '[−π ; π]' },
  { text: '[0;2π]', lo: q(0), hi: q(2), loOpen: false, hiOpen: false, html: '[0 ; 2π]' },
];
const restrictSeg = (I, startMath, fams, extra = {}) => [
  { kind: 'segment', html: `Solutions dans ${I.html} :`, start: { math: startMath }, judge: PERIODIC({ domain: I.text, ...extra }) },
  { kind: 'eq', math: setT(pointsIn(fams, I.lo, I.hi, I.loOpen, I.hiOpen)), note: 'Garder les k qui tombent dans l\'intervalle', subgoal: 'restrict' },
];
const XK = { vars: ['x', 'k'] };

// ======================================================================
// g3-basic-eq
// ======================================================================

const BASIC = 'g3-basic-eq';
const BASIC_SUB = [
  { id: 'base', label: 'deux familles', skill: BASIC },
  { id: 'isolate', label: 'isoler x', skill: BASIC },
  { id: 'restrict', label: 'restreindre à un intervalle', skill: 'g9-intervals' },
];
const VALS = { cos: Object.keys(ACOS), sin: Object.keys(ASIN), tan: Object.keys(ATAN) };
const FORMULA = {
  cos: 'cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ',
  sin: 'sin u = sin α ⇔ u = α + 2kπ ou u = π − α + 2kπ',
  tan: 'tan u = tan α ⇔ u = α + kπ',
};

function basicData(rng, level) {
  const f = level === 1 ? rng.pick(['cos', 'sin']) : rng.pick(['cos', 'sin', 'cos', 'sin', 'tan']);
  let a;
  for (;;) {
    a = rng.pick(VALS[f]);
    const single = a === '1' || a === '-1' || a === '0';
    if (level === 1 && single) continue;
    if (single && !rng.chance(1 / 4)) continue;
    break;
  }
  const m = level <= 2 ? q(1) : rng.pick([q(2), q(3), q(1, 2), q(2)]);
  const phi = level === 1 ? q(0) : rng.pick([q(1, 6), q(-1, 6), q(1, 4), q(-1, 4), q(1, 3), q(-1, 3), q(1, 2)].concat(level >= 3 ? [q(0)] : []));
  return { f, a, m, phi, U: uT(m, phi), fams: baseFams(f, a) };
}

function basicLines(d) {
  const lines = [{ math: famRel(d.U, d.fams), note: d.fams.length > 1 ? 'Deux familles' : 'Une famille', subgoal: 'base' }];
  const iso = isolate(d.m, d.phi, d.fams);
  lines.push(...iso.lines);
  return { lines, xs: iso.xs };
}

function basicItem(level, rng, opts = {}) {
  const exam = opts.exam ? { format: opts.exam, points: 3 } : false;
  if (level === 5) return basicTwo(rng, exam);
  const d = basicData(rng, level);
  const start = `${d.f}(${d.U})=${d.a}`;
  const { lines, xs } = basicLines(d);
  const script = [];
  if (level === 1) script.push({ kind: 'note', html: `${FORMULA[d.f]}.` });
  if (level === 3) {
    script.push({ kind: 'decision', prompt: 'Quelle formule ?', options: ['cos', 'sin', 'tan'].map((g) => ({
      id: g, label: FORMULA[g], valid: g === d.f, why: `L'équation porte sur ${d.f}.`, rule: d.f === 'sin' && g === 'cos' ? 'g3_sin_family' : undefined,
    })) });
  }
  lines.forEach((l, i) => {
    const line = { kind: 'eq', ...l };
    if (level === 1 && i === 0 && d.fams.length > 1) Object.assign(line, tpl(l.math, (n) => [n.r.r.t === 'bin' && n.r.r.op === '+' ? n.r.r.l : n.r.r], XK));
    script.push(line);
  });
  let I = null;
  if (level === 4) {
    I = rng.pick(INTERVALS);
    script.push(...restrictSeg(I, famsT(xs), xs));
  }
  return linesItem({
    skill: BASIC, level, prompt: `Résous ${MT(start)}${I ? `, puis donne les solutions dans ${I.html}` : ' dans ℝ'} (k désigne un entier).`,
    start, judge: PERIODIC(), mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints: [
      { level: 1, html: `${FORMULA[d.f]}${d.m.eq(1) ? '' : ' ; puis on divise aussi la période'}.` },
      { level: 2, html: MT(lines[0].math, XK) },
      { level: 3, html: MT(lines[lines.length - 1].math, XK) },
    ],
    subgoals: BASIC_SUB, keys: KEYS, tapActions: level === 3 ? 'solset' : null, key: `${BASIC}:${start}:${I?.text ?? ''}`, exam,
  });
}

// Level 5: sin(ax) = sin(bx) or cos(ax) = cos(bx) on an interval.
function basicTwo(rng, exam) {
  const f = rng.pick(['sin', 'cos']);
  const [a, b] = rng.pick([[2, 1], [3, 1], [3, 2], [2, 1]]);
  const I = rng.pick(INTERVALS);
  const ax = (k) => (k === 1 ? 'x' : `${k}x`);
  const start = `${f}(${ax(a)})=${f}(${ax(b)})`;
  // sin: ax = bx + 2kπ or ax = π − bx + 2kπ ; cos: ax = ±bx + 2kπ
  const l1 = f === 'sin' ? `${ax(a)}=${ax(b)}+2kπ∨${ax(a)}=π-${ax(b)}+2kπ` : `${ax(a)}=${ax(b)}+2kπ∨${ax(a)}=-${ax(b)}+2kπ`;
  const fams = f === 'sin' ? [[q(0), q(2, a - b)], [q(1, a + b), q(2, a + b)]] : [[q(0), q(2, a - b)], [q(0), q(2, a + b)]];
  const script = [
    { kind: 'eq', math: l1, note: f === 'sin' ? 'sin u = sin v : u = v + 2kπ ou u = π − v + 2kπ' : 'cos u = cos v : u = ±v + 2kπ', subgoal: 'base' },
    { kind: 'eq', math: famsT(fams), note: 'Isoler x', subgoal: 'isolate' },
    ...restrictSeg(I, famsT(fams), fams),
  ];
  return linesItem({
    skill: BASIC, level: 5, prompt: `Résous ${MT(start)} dans ${I.html}.`,
    start, judge: PERIODIC(), mode: 'free', script, hints: [], subgoals: BASIC_SUB, keys: KEYS, key: `${BASIC}:two:${start}:${I.text}`, exam,
  });
}

function basicExam(rng, exam) {
  if (exam === 'tf') {
    const bank = [
      { s: 'Pour tous x, y réels, si cos x = cos y, alors x = y.', truth: false, pred: 'cos(x)=cos(y)⇒x=y', hyp: 'cos(x)=cos(y)', ans: { x: 'π/3', y: '-π/3' }, expl: 'Faux : cos(π/3) = cos(−π/3), mais π/3 ≠ −π/3.' },
      { s: 'Pour tous x, y réels, si sin x = sin y, alors x = y.', truth: false, pred: 'sin(x)=sin(y)⇒x=y', hyp: 'sin(x)=sin(y)', ans: { x: 'π/6', y: '(5π)/6' }, expl: 'Faux : sin(π/6) = sin(5π/6) = 1/2.' },
      { s: 'Pour tous x, y réels, si tan x = tan y, alors x = y.', truth: false, pred: 'tan(x)=tan(y)⇒x=y', hyp: 'tan(x)=tan(y)', ans: { x: '0', y: 'π' }, expl: 'Faux : tan 0 = tan π = 0.' },
      { s: 'L\'équation sin x = 1/2 a exactement deux solutions dans [0 ; 2π[.', truth: true, expl: 'Vrai : π/6 et 5π/6.' },
      { s: 'L\'équation tan x = 1 a exactement deux solutions dans [0 ; 2π[.', truth: true, expl: 'Vrai : π/4 et 5π/4.' },
    ];
    const b = rng.pick(bank);
    return tfItem({
      skill: BASIC, level: 4, statement: b.s, truth: b.truth, key: b.s, explanation: b.expl,
      counter: b.truth ? null : { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }, { q: '∀', v: 'y', dom: 'R' }], pred: b.pred, hyp: b.hyp, ask: [{ v: 'x', label: 'x =' }, { v: 'y', label: 'y =' }], answer: b.ans },
      ruleIfTrue: b.truth ? null : 'g3_family_missing', exam: { format: 'tf', points: 1 },
    });
  }
  let d;
  do { d = basicData(rng, 3); } while (d.fams.length < 2);
  const { xs } = basicLines(d);
  const start = `${d.f}(${d.U})=${d.a}`;
  const options = [{ html: famsHtml(xs), correct: true }];
  const add = (fams, rule) => { const h = famsHtml(fams); if (!options.some((o) => o.html === h)) options.push({ html: h, correct: false, rule }); };
  add([xs[0]], 'g3_family_missing');
  add(d.fams.map(([b, p]) => [b.sub(d.phi).div(d.m), p]), 'g3_period_divide');
  if (d.f === 'sin') add(isolate(d.m, d.phi, [d.fams[0], [d.fams[0][0].neg(), q(2)]]).xs, 'g3_sin_family');
  add(xs.map(([b, p]) => [b.neg(), p]), null);
  add(xs.map(([b, p]) => [b.add(q(1, 2)), p]), null);
  return mcq({
    skill: BASIC, level: 4, prompt: `Les solutions de ${MT(start)} sont…`, options: options.slice(0, 4), key: `mcq:${start}`,
    exam: { format: 'mcq', points: 1 }, solution: basicLines(d).lines.map((l) => ({ html: MT(l.math, XK), note: l.note })),
  }, rng);
}

// ======================================================================
// g3-eq
// ======================================================================

const EQ = 'g3-eq';
const EQ_SUB = [
  { id: 'rewrite', label: 'une seule fonction', skill: IDS },
  { id: 'factor', label: 'factoriser', skill: 'fac-trinomial' },
  { id: 'product', label: 'produit nul', skill: 'eq-product' },
  { id: 'base', label: 'équations de base', skill: BASIC },
  { id: 'restrict', label: 'restreindre', skill: 'g9-intervals' },
];
const VAL_T = ['0', '1/2', '-1/2', '1', '-1', '2', '-2'];
const parseQ = (t) => { const [n, d] = t.split('/'); return q(Number(n), Number(d ?? 1)); };

// (d₁X − n₁)(d₂X − n₂) with Xᵢ = nᵢ/dᵢ: a trinomial with whole coefficients.
function trinomial(rng) {
  for (;;) {
    const v1 = parseQ(rng.pick(VAL_T));
    const v2 = parseQ(rng.pick(VAL_T));
    if (v1.eq(v2)) continue;
    if (Math.abs(v1.valueOf()) > 1 && Math.abs(v2.valueOf()) > 1) continue;
    const A = v1.d * v2.d;
    if (A === 1 && rng.chance(0.5)) continue; // prefer 2X² − 3X + 1
    const B = -(v1.n * v2.d + v2.n * v1.d);
    const C = v1.n * v2.n;
    return { v1, v2, A, B, C };
  }
}
const coefT = (c, x, first = false) => {
  if (c === 0) return '';
  const s = c < 0 ? '-' : first ? '' : '+';
  const a = Math.abs(c);
  return x ? `${s}${a === 1 ? '' : a}${x}` : `${s}${a}`;
};
const polyT = (A, B, C, X) => `${coefT(A, `${X}^2`, true)}${coefT(B, X)}${coefT(C, '')}` || '0';
const facT = (v, X) => (v.n === 0 ? X : v.d === 1 ? `(${X}${v.n > 0 ? '-' : '+'}${Math.abs(v.n)})` : `(${v.d}${X}${v.n > 0 ? '-' : '+'}${Math.abs(v.n)})`);
const valFams = (f, v) => (Math.abs(v.valueOf()) > 1 ? [] : baseFams(f, lit0(v)));

function eqTrinomial(rng, level) {
  const f = rng.pick(['cos', 'sin']);
  const g = f === 'cos' ? 'sin' : 'cos';
  const { v1, v2, A, B, C } = trinomial(rng);
  const fx = `${f}(x)`;
  const fams = [...valFams(f, v1), ...valFams(f, v2)];
  const lines = [];
  // Written with g² = 1 − f²: −A g² + B f + (A + C) = 0.
  const start = `${coefT(-A, `${g}(x)^2`, true)}${coefT(B, fx)}${coefT(A + C, '')}=0`;
  if (level !== 1) {
    lines.push({ math: `${A === 1 ? '-' : `-${A}`}(1-${fx}^2)${coefT(B, fx)}${coefT(A + C, '')}=0`, note: `${g}²x = 1 − ${f}²x`, subgoal: 'rewrite' });
    lines.push({ math: `${polyT(A, B, C, fx)}=0`, note: 'Réduire', subgoal: 'rewrite' });
    lines.push({ math: `${polyT(A, B, C, 'X')}=0`, note: `Posons X = ${f} x`, subgoal: 'rewrite' });
  }
  lines.push({ math: `${facT(v1, 'X')}${facT(v2, 'X')}=0`, note: 'Factoriser', subgoal: 'factor' });
  lines.push({ math: `${fx}=${lit0(v1)}∨${fx}=${lit0(v2)}`, note: 'Revenir à x', subgoal: 'product' });
  lines.push({ math: fams.length ? famsT(fams) : '∅', note: 'Équations de base', subgoal: 'base' });
  return {
    start: level === 1 ? `${polyT(A, B, C, 'X')}=0` : start, display: level === 1 ? `${polyT(A, B, C, fx)}=0` : start,
    lines, fams, subst: { X: fx }, kind: 'one', f,
  };
}

function eqHomogeneous(rng) {
  for (;;) {
    const t1 = rng.pick([1, -1, 2, -2, 3]);
    const t2 = rng.pick([1, -1, 2, -2, 3, 0]);
    if (t1 === t2) continue;
    const S = t1 + t2;
    const P = t1 * t2;
    const start = `sin(x)^2${coefT(-S, 'sin(x)cos(x)')}${coefT(P, 'cos(x)^2')}=0`;
    const nice = (t) => Math.abs(t) <= 1;
    const famTxt = (t) => (nice(t) ? `x=${famT(q(t, 4), q(1))}` : `x=arctan(${t})+kπ`);
    const lines = [
      { math: `tan(x)^2${coefT(-S, 'tan(x)')}${coefT(P, '')}=0`, note: 'cos x = 0 n\'est pas solution ; diviser par cos²x', subgoal: 'rewrite' },
      { math: `tan(x)=${t1}∨tan(x)=${t2}`, note: 'Factoriser', subgoal: 'factor' },
      { math: `${famTxt(t1)}∨${famTxt(t2)}`, note: 'Équations de base', subgoal: 'base' },
    ];
    const fams = [t1, t2].every(nice) ? [t1, t2].map((t) => [q(t, 4), q(1)]) : null;
    return { start, lines, fams, kind: 'homog' };
  }
}

function eqFactor(rng) {
  const [c, s] = rng.pick([['1', '1/2'], ['√2', '√2/2'], ['√3', '√3/2'], ['-1', '-1/2'], ['-√2', '-√2/2']]);
  const neg = c.startsWith('-');
  const abs = neg ? c.slice(1) : c;
  const fams = [[q(1, 2), q(1)], ...baseFams('sin', s)];
  const lines = [
    { math: `2sin(x)cos(x)${neg ? '+' : '-'}${abs === '1' ? '' : abs}cos(x)=0`, note: 'sin 2x = 2 sin x cos x, tout à gauche', subgoal: 'rewrite' },
    { math: `cos(x)(2sin(x)${neg ? '+' : '-'}${abs})=0`, note: 'Factoriser par cos x (ne pas diviser !)', subgoal: 'factor' },
    { math: `cos(x)=0∨sin(x)=${s}`, note: 'Produit nul', subgoal: 'product' },
    { math: famsT(fams), note: 'Équations de base', subgoal: 'base' },
  ];
  return { start: `sin(2x)=${c === '1' ? '' : c === '-1' ? '-' : c}cos(x)`, lines, fams, kind: 'factor' };
}

const METHODS = {
  one: { label: 'Une seule fonction, puis X = cos x ou X = sin x', why: 'On peut tout écrire avec une seule fonction (cos² = 1 − sin²).' },
  factor: { label: 'Factoriser, puis produit nul', why: 'Un facteur commun apparaît après sin 2x = 2 sin x cos x.' },
  homog: { label: 'Diviser par cos²x (après avoir vérifié cos x = 0)', why: 'Chaque terme est de degré 2 en sin et cos : l\'équation est homogène.' },
};

function eqItem(level, rng, opts = {}) {
  const exam = opts.exam ? { format: opts.exam, points: 4 } : false;
  const kind = level <= 2 ? 'one' : rng.pick(['one', 'factor', 'homog']);
  const d = kind === 'one' ? eqTrinomial(rng, level) : kind === 'factor' ? eqFactor(rng) : eqHomogeneous(rng);
  const script = [];
  if (level === 3) {
    script.push({ kind: 'decision', prompt: 'Quelle méthode ?', options: Object.entries(METHODS).map(([id, m]) => ({
      id, label: m.label, valid: id === kind, why: METHODS[kind].why, rule: id === 'homog' && kind === 'factor' ? 'g3_divide_zero' : undefined,
    })) });
    if (kind === 'homog') {
      script.push({ kind: 'decision', prompt: 'cos x = 0 donne-t-il des solutions ?', options: [
        { id: 'no', label: 'Non : alors sin²x = 1, et l\'équation donne 1 = 0', valid: true },
        { id: 'yes', label: 'Oui : x = π/2 + kπ', valid: false, why: 'Si cos x = 0, il reste sin²x = 0, impossible car sin²x = 1.' },
        { id: 'skip', label: 'Pas besoin de vérifier', valid: false, rule: 'g3_divide_zero', why: 'On ne divise par cos²x qu\'après avoir vérifié que cos x = 0 ne donne pas de solution.' },
      ] });
    }
  }
  if (level === 1) script.push({ kind: 'note', html: `On a posé X = ${d.f} x.` });
  script.push(...d.lines.map((l) => ({ kind: 'eq', ...l })));
  let I = null;
  if (level === 5 && d.fams) {
    I = rng.pick(INTERVALS);
    script.push(...restrictSeg(I, d.lines[d.lines.length - 1].math, d.fams));
  }
  const shown = d.display ?? d.start;
  const vars = { vars: ['x', 'X', 'k'] };
  return linesItem({
    skill: EQ, level, prompt: `Résous ${MT(shown)}${I ? ` dans ${I.html}` : ' dans ℝ'}.`,
    start: d.start, judge: PERIODIC(d.subst ? { subst: d.subst } : {}), mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints: level >= 5 ? [] : [
      { level: 1, html: kind === 'one' ? 'C\'est un trinôme en cos x (ou sin x) : pose X = cos x.' : kind === 'factor' ? 'Écris sin 2x = 2 sin x cos x, puis mets cos x en facteur : ne divise pas.' : 'Vérifie que cos x = 0 n\'est pas solution, puis divise par cos²x.' },
      { level: 2, html: MT(d.lines[Math.max(0, d.lines.length - 3)].math, vars) },
      { level: 3, html: MT(d.lines[d.lines.length - 2].math, vars) },
    ],
    subgoals: EQ_SUB, keys: KEYS, tapActions: level === 3 ? 'solset' : null, key: `${EQ}:${d.start}:${I?.text ?? ''}`, exam,
    declares: vars,
  });
}

function eqExam(rng, exam) {
  if (exam === 'open') return eqItem(5, rng, { exam });
  const d = eqFactor(rng);
  const options = [{ html: famsHtml(d.fams), correct: true }];
  const add = (fams, rule) => { const h = famsHtml(fams); if (fams.length && !options.some((o) => o.html === h)) options.push({ html: h, correct: false, rule }); };
  add(d.fams.slice(1), 'g3_divide_zero');
  add(d.fams.slice(0, 2), 'g3_family_missing');
  add([[q(1, 2), q(2)], ...d.fams.slice(1)], 'g3_period_divide');
  return mcq({
    skill: EQ, level: 4, prompt: `Les solutions de ${MT(d.start)} sont…`, options, key: `mcq:${d.start}`,
    exam: { format: 'mcq', points: 1 }, solution: d.lines.map((l) => ({ html: MT(l.math, XK), note: l.note })),
  }, rng);
}

// ======================================================================
// g3-asinbcos
// ======================================================================

const ASB = 'g3-asinbcos';
const ASB_SUB = [
  { id: 'divide', label: 'diviser par R', skill: ASB },
  { id: 'formula', label: 'formule d\'addition', skill: IDS },
  { id: 'base', label: 'équation de base', skill: BASIC },
  { id: 'restrict', label: 'restreindre', skill: 'g9-intervals' },
];
// a sin x + b cos x = R sin(x + φ): cos φ = a/R, sin φ = b/R.
export const ABS = [
  { a: '1', b: '√3', R: '2', Rf: 2, phi: q(1, 3) }, { a: '√3', b: '1', R: '2', Rf: 2, phi: q(1, 6) },
  { a: '1', b: '1', R: '√2', Rf: Math.SQRT2, phi: q(1, 4) }, { a: '√3', b: '-1', R: '2', Rf: 2, phi: q(-1, 6) },
  { a: '1', b: '-1', R: '√2', Rf: Math.SQRT2, phi: q(-1, 4) }, { a: '1', b: '-√3', R: '2', Rf: 2, phi: q(-1, 3) },
  { a: '-1', b: '√3', R: '2', Rf: 2, phi: q(2, 3) }, { a: '2', b: '2√3', R: '4', Rf: 4, phi: q(1, 3) },
  { a: '2√3', b: '-2', R: '4', Rf: 4, phi: q(-1, 6) }, { a: '-√3', b: '-1', R: '2', Rf: 2, phi: q(-5, 6) },
];
// c = R·s written out.
const CANDS = ['0', '1', '-1', '2', '-2', '3', '-3', '4', '-4', '√2', '-√2', '√3', '-√3', '√6/2', '-√6/2', '√2/2', '-√2/2', '2√2', '-2√2', '2√3', '-2√3', '1/2', '-1/2', '√3/2', '-√3/2', '5', '-5'];
export const textOf = (x) => CANDS.find((t) => Math.abs(valueFloat(t) - x) < 1e-9);
export const termT = (c, fn, first) => (c === '1' ? `${first ? '' : '+'}${fn}` : c === '-1' ? `-${fn}` : `${c.startsWith('-') || first ? '' : '+'}${c}${fn}`);

function asbData(rng, level) {
  for (let i = 0; i < 200; i++) {
    const e = rng.pick(ABS);
    const m = level === 5 ? rng.pick([2, 3]) : level === 4 && rng.chance(0.5) ? rng.pick([2, 3]) : 1;
    const none = level === 4 && rng.chance(1 / 8) && e.Rf !== Math.SQRT2;
    const s = none ? null : rng.pick(['0', '1/2', '-1/2', '√2/2', '-√2/2', '√3/2', '-√3/2', '1', '-1']);
    const c = none ? textOf(e.Rf + 1) : textOf(e.Rf * valueFloat(s));
    if (!c) continue;
    const X = m === 1 ? 'x' : `${m}x`;
    return { ...e, m: q(m), s, c, X, none };
  }
  return { ...ABS[1], m: q(1), s: '√2/2', c: '√2', X: 'x', none: false, fallback: true };
}

function asbLines(d) {
  const cphi = trigVal('cos', d.phi);
  const sphi = trigVal('sin', d.phi);
  const lines = [{ math: `(${cphi})sin(${d.X})+(${sphi})cos(${d.X})=${d.none ? `${d.c}/${d.R}` : d.s}`, note: `Diviser par R = ${fr(d.R)}`, subgoal: 'divide' }];
  if (d.none) {
    lines.push({ math: `sin(${uT(d.m, d.phi)})=${d.c}/${d.R}`, note: 'Formule d\'addition', subgoal: 'formula' });
    lines.push({ math: '∅', note: `${fr(d.c)}/${fr(d.R)} > 1 : pas de solution`, subgoal: 'base' });
    return { lines, xs: [], fams: [] };
  }
  lines.push({ math: `sin(${uT(d.m, d.phi)})=${d.s}`, note: `Formule d'addition, φ = ${fr(piT(d.phi))}`, subgoal: 'formula' });
  const fams = baseFams('sin', d.s);
  lines.push({ math: famRel(uT(d.m, d.phi), fams), note: 'Équation de base', subgoal: 'base' });
  const iso = isolate(d.m, d.phi, fams);
  lines.push(...iso.lines.map((l) => ({ ...l, subgoal: 'base' })));
  return { lines, xs: iso.xs, fams };
}
export const asbStart = (d) => `${termT(d.a, `sin(${d.X})`, true)}${termT(d.b, `cos(${d.X})`, false)}`;

function asbItem(level, rng, opts = {}) {
  const exam = opts.exam ? { format: opts.exam, points: 4 } : false;
  const d = asbData(rng, level);
  const start = `${asbStart(d)}=${d.c}`;
  const { lines, xs } = asbLines(d);
  const script = [];
  if (level === 1) script.push({ kind: 'note', html: `R = ${fr(d.R)} et ${MT(asbStart(d))} = ${MT(`${d.R}sin(${uT(d.m, d.phi)})`)}.` });
  if (level === 2) {
    script.push({ kind: 'note', html: `R = √(a² + b²) = ${fr(d.R)}.` });
    const turned = modQ(d.phi.add(q(1)), q(2));
    const quad = turned.valueOf() > 1 ? turned.sub(q(2)) : turned;
    script.push({ kind: 'decision', prompt: 'φ vérifie cos φ = a/R et sin φ = b/R. Donc φ =', options: [
      { id: 'right', label: fr(piT(d.phi)), valid: true },
      { id: 'quad', label: fr(piT(quad)), valid: false, rule: 'g3_rphi', why: 'Vérifie le quadrant : R cos φ doit valoir a et R sin φ doit valoir b.' },
      { id: 'neg', label: fr(piT(d.phi.neg())), valid: false, rule: 'g3_rphi', why: 'Le signe : sin φ = b/R.' },
    ].filter((o, i, a) => a.findIndex((x) => x.label === o.label) === i) });
  }
  if (level === 3) {
    script.push({ kind: 'decision', prompt: 'Quelle forme ?', options: [
      { id: 'sin', label: 'R sin(x + φ)', valid: true },
      { id: 'cos', label: 'R cos(x − ψ)', valid: true, why: 'Les deux formes sont justes.' },
      { id: 'sum', label: '(|a| + |b|) sin(x + φ)', valid: false, rule: 'g3_rphi', why: 'R = √(a² + b²), pas |a| + |b|.' },
    ] });
  }
  script.push(...lines.map((l, i) => ({ kind: 'eq', ...l, ...(level === 1 && i === 1 && !d.none ? tpl(l.math, (n) => [n.l.args[0]], { vars: ['x'] }) : {}) })));
  let I = null;
  if (level === 5 && !d.none) {
    I = rng.pick(INTERVALS);
    script.push(...restrictSeg(I, famsT(xs), xs));
  }
  return linesItem({
    skill: ASB, level, prompt: `Résous ${MT(start)}${I ? ` dans ${I.html}` : ' dans ℝ'}.`,
    start, judge: PERIODIC(), mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints: level >= 5 ? [] : [
      { level: 1, html: `Divise par √(a² + b²) = ${fr(d.R)}.` },
      { level: 2, html: `cos(φ) sin x + sin(φ) cos x = sin(x + φ), avec φ = ${fr(piT(d.phi))}` },
      { level: 3, html: MT(lines[1].math) },
    ],
    subgoals: ASB_SUB, keys: KEYS, tapActions: level === 3 ? 'solset' : null, key: `${ASB}:${start}:${I?.text ?? ''}`, exam, fallback: d.fallback,
  });
}

function asbExam(rng, exam) {
  if (exam === 'open') return asbItem(5, rng, { exam });
  let d;
  do { d = asbData(rng, 3); } while (!d.s || ['1', '-1', '0'].includes(d.s));
  const start = `${asbStart(d)}=${d.c}`;
  const { xs, fams } = asbLines(d);
  const options = [{ html: famsHtml(xs), correct: true }];
  const add = (f2, rule) => { const h = famsHtml(f2); if (!options.some((o) => o.html === h)) options.push({ html: h, correct: false, rule }); };
  add(isolate(q(1), d.phi.add(q(1)), fams).xs, 'g3_rphi');
  add(isolate(q(1), d.phi, [fams[0], [fams[0][0].neg(), q(2)]]).xs, 'g3_sin_family');
  add(isolate(q(1), d.phi.neg(), fams).xs, 'g3_rphi');
  add([xs[0]], 'g3_family_missing');
  return mcq({
    skill: ASB, level: 4, prompt: `Les solutions de ${MT(start)} sont…`, options: options.slice(0, 4), key: `mcq:${start}`,
    exam: { format: 'mcq', points: 1 }, solution: asbLines(d).lines.map((l) => ({ html: MT(l.math, XK), note: l.note })),
  }, rng);
}

// ======================================================================
// g3-bioche
// ======================================================================

const BIO = 'g3-bioche';
const BIO_SUB = [
  { id: 'subst', label: 'substituer', skill: BIO },
  { id: 'teq', label: 'équation en t', skill: 'rat-equation' },
  { id: 'back', label: 'revenir à x', skill: BASIC },
];
const TROOTS = [q(1), q(-1), q(2), q(-2), q(1, 2), q(-1, 2), q(3), q(-3), q(1, 3)];
const gcd = (x, y) => (y ? gcd(y, x % y) : Math.abs(x));

// a sin x + b cos x = c → (b + c)t² − 2at + (c − b) = 0.
function bioData(rng) {
  for (let i = 0; i < 400; i++) {
    const pi = rng.chance(0.5);
    let a;
    let b;
    let c;
    let roots;
    if (pi) {
      // c = −b: x = π is a solution, and t = −b/a.
      const r = rng.pick(TROOTS);
      a = rng.pick([1, 2, 3, -1, -2]) * r.d;
      b = -r.n * (a / r.d);
      c = -b;
      roots = [r];
    } else {
      const r1 = rng.pick(TROOTS);
      const r2 = rng.pick(TROOTS);
      if (r1.eq(r2)) continue;
      const S = r1.add(r2);
      const P = r1.mul(r2);
      const den = [S.d, P.d, 2].reduce((x, y) => (x * y) / gcd(x, y));
      const s = den * rng.pick([1, 2]);
      a = (s * S.valueOf()) / 2;
      b = (s * (1 - P.valueOf())) / 2;
      c = (s * (1 + P.valueOf())) / 2;
      roots = [r1, r2];
    }
    if (![a, b, c].every(Number.isInteger) || !a || !b || [a, b, c].some((x) => Math.abs(x) > 9)) continue;
    if (b + c === 0 && !pi) continue;
    return { a, b, c, roots, pi: c === -b };
  }
  return { a: 2, b: -1, c: 1, roots: [q(1, 2)], pi: true, fallback: true };
}
const xOfT = (r) => (r.eq(1) ? 'π/2' : r.eq(-1) ? '-π/2' : `2arctan(${lit0(r)})`);
const intT = (c) => (c === 1 ? '' : c === -1 ? '-' : String(c));

function bioLines(d) {
  const { a, b, c } = d;
  const lines = [
    { math: `${intT(2 * a)}t/(1+t^2)${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}(1-t^2)/(1+t^2)=${c}`, note: 'sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²)', subgoal: 'subst' },
    { math: `${polyT(b + c, -2 * a, c - b, 't')}=0`, note: 'Multiplier par 1 + t²', subgoal: 'teq' },
    { math: d.roots.map((r) => `t=${lit0(r)}`).join('∨'), note: 'Résoudre en t', subgoal: 'teq' },
    { math: [...d.roots.map((r) => `x=${xOfT(r)}+2kπ`), ...(d.pi ? ['x=π+2kπ'] : [])].join('∨'), note: 'tan(x/2) = t : x = 2 arctan t + 2kπ', subgoal: 'back' },
  ];
  return lines;
}
const bioStart = (d) => `${termT(String(d.a), 'sin(x)', true)}${termT(String(d.b), 'cos(x)', false)}=${d.c}`;

function bioItem(level, rng, opts = {}) {
  const exam = opts.exam ? { format: opts.exam, points: 6 } : false;
  const d = bioData(rng);
  const start = bioStart(d);
  const lines = bioLines(d);
  const piVal = -d.b;
  const piNote = `x = π + 2kπ : sin x = 0 et cos x = −1, donc le membre de gauche vaut ${fr(String(piVal))}${piVal === d.c ? ` = ${fr(String(d.c))} : ce sont des solutions` : ` ≠ ${fr(String(d.c))} : pas des solutions`}.`;
  const script = [];
  if (level === 3) {
    script.push({ kind: 'decision', prompt: 'Que faire des x = π + 2kπ, où tan(x/2) n\'existe pas ?', options: [
      { id: 'before', label: 'Les tester à part, avant de substituer', valid: true },
      { id: 'after', label: 'Les tester à part, à la fin', valid: true },
      { id: 'skip', label: 'Rien : la substitution donne toutes les solutions', valid: false, rule: 'g3_bioche_pi', why: 'tan(x/2) n\'existe pas en x = π : la substitution oublie ces valeurs.' },
    ] });
  }
  if (level <= 3) script.push({ kind: 'note', html: piNote });
  if (level === 1) script.push({ kind: 'note', html: `Avec t = tan(x/2) : ${MT(lines[0].math, { vars: ['t'] })}` });
  const body = lines.map((l) => ({ kind: 'eq', ...l }));
  if (level === 1) body.shift();
  script.push(...body);
  let I = null;
  if (level === 5) {
    const nice = d.roots.every((r) => r.eq(1) || r.eq(-1));
    if (nice) {
      I = INTERVALS[1];
      const fams = [...d.roots.map((r) => [q(r.n, 2), q(2)]), ...(d.pi ? [[q(1), q(2)]] : [])];
      script.push(...restrictSeg(I, lines[lines.length - 1].math, fams));
    }
  }
  return linesItem({
    skill: BIO, level, prompt: `Résous ${MT(start)}${I ? ` dans ${I.html}` : ' dans ℝ'} avec t = tan(x/2).`,
    start, judge: PERIODIC({ subst: { t: 'tan(x/2)' }, onDomain: true, onDomainOf: 'tan(x/2)' }),
    mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints: level >= 5 ? [] : [
      { level: 1, html: 'La substitution oublie x = π + 2kπ : teste-les d\'abord. Puis sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²).' },
      { level: 2, html: MT(lines[1].math, { vars: ['t'] }) },
      { level: 3, html: MT(lines[2].math, { vars: ['t'] }) },
    ],
    subgoals: BIO_SUB, keys: KEYS, tapActions: level === 3 ? 'solset' : null, key: `${BIO}:${start}:${I?.text ?? ''}`, exam, fallback: d.fallback,
    declares: { vars: ['x', 't', 'k'] },
  });
}

function bioExam(rng, exam) {
  if (exam === 'open') return bioItem(4, rng, { exam });
  let d;
  do { d = bioData(rng); } while (!d.pi);
  const start = bioStart(d);
  const fx = (t) => MT(t, XK);
  const pi = fx('x=π+2kπ');
  const options = [
    { html: [...d.roots.map((r) => fx(`x=${xOfT(r)}+2kπ`)), pi].join(' ou '), correct: true },
    { html: d.roots.map((r) => fx(`x=${xOfT(r)}+2kπ`)).join(' ou '), correct: false, rule: 'g3_bioche_pi' },
    { html: [...d.roots.map((r) => fx(`x=arctan(${lit0(r)})+kπ`)), pi].join(' ou '), correct: false },
    { html: [...d.roots.map((r) => fx(`x=${xOfT(r.neg())}+2kπ`)), pi].join(' ou '), correct: false },
  ].filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);
  return mcq({
    skill: BIO, level: 4, prompt: `Les solutions de ${MT(start)} sont…`, options, key: `mcq:${start}`,
    exam: { format: 'mcq', points: 1 }, solution: bioLines(d).map((l) => ({ html: MT(l.math, { vars: ['x', 't', 'k'] }), note: l.note })),
  }, rng);
}

export const GEN = {
  [BASIC]: (level, rng, profile, opts = {}) => (opts.exam ? basicExam(rng, opts.exam) : basicItem(level, rng, opts)),
  [EQ]: (level, rng, profile, opts = {}) => (opts.exam ? eqExam(rng, opts.exam) : eqItem(level, rng, opts)),
  [ASB]: (level, rng, profile, opts = {}) => (opts.exam ? asbExam(rng, opts.exam) : asbItem(level, rng, opts)),
  [BIO]: (level, rng, profile, opts = {}) => (opts.exam ? bioExam(rng, opts.exam) : bioItem(level, rng, opts)),
};
export { pointsIn, setT, isolate, famRel, XK, restrictSeg, BASIC, ASB };

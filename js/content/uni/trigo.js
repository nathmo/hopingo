// Generators of module G3 (unit `trigo`), spec §8.3. Catalogue:
// docs/universite/G-gymnase-1.md, G3.
//
// Levels: 1–2 guided (lines with boxes, notes, decisions), 3 choose the
// action then write the line, 4 free lines with hints, 5 alone. Angles are
// rational multiples of π, written as the course does (π/6, (5π)/6); the
// equations are judged by `solset` with `periodic: true` (the letter k is an
// integer, families are compared on a window), numbers by `value` (form
// 'exact', 'deg' with a tolerance for triangles) or `equiv` (target
// 'exact', 'one-trig', 'goal'). Every generator starts from the answer.
// opts.exam = 'mcq' | 'tf' | 'open' gives the exam variants.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { blankLine } from '../../judges/lines.js';
import { evalFloat } from '../../cas/numeric.js';
import { MT, fr, linesItem, mcq, tfItem } from './kit.js';
import { t } from '../../i18n.js';

const q = (n, d = 1) => new Q(n, d);
const PERIODIC = (extra = {}) => ({ kind: 'solset', v: 'x', periodic: true, ...extra });
const KEYS = ['calc', 'calcfn', 'trig', 'set', 'relation'];
const lit0 = (x) => { const v = Q.of(x); return v.d === 1 ? String(v.n) : `${v.n}/${v.d}`; };
const tpl = (math, pick, opts = {}) => { const node = parse(math, opts); return blankLine(node, pick(node), opts); };

// ---------- angles, multiples of π ----------

// k·π as text the parser reads back: 0, π, −π, 2π, π/6, (5π)/6, −(3π)/4.
export function piT(k) {
  k = Q.of(k);
  if (k.n === 0) return '0';
  const a = Math.abs(k.n);
  const top = a === 1 ? 'π' : `${a}π`;
  const body = k.d === 1 ? top : a === 1 ? `π/${k.d}` : `(${top})/${k.d}`;
  return k.n < 0 ? `-${body}` : body;
}
// The period part of a family: 2kπ, kπ, kπ/2, 2kπ/3.
const perT = (p) => { p = Q.of(p); return `${p.n === 1 ? '' : p.n}kπ${p.d > 1 ? `/${p.d}` : ''}`; };
// base + period·k: π/3+2kπ, −π/3+kπ, kπ.
export const famT = (base, per) => (Q.of(base).n === 0 ? perT(per) : `${piT(base)}+${perT(per)}`);
// x = … ∨ x = …
const famsT = (fams, v = 'x') => fams.map(([b, p]) => `${v}=${famT(b, p)}`).join('∨');
const famsHtml = (fams) => fams.map(([b, p]) => MT(`x=${famT(b, p)}`)).join(t(' ou '));
// Reduce a multiple of π into [0 ; m).
const modQ = (k, m) => { k = Q.of(k); m = Q.of(m); const t = Math.floor(k.div(m).valueOf()); return k.sub(m.mul(t)); };

// ---------- exact values ----------

const SINV = ['0', '1/2', '√2/2', '√3/2', '1'];
const TANV = ['0', '√3/3', '1', '√3'];
const SINF = [0, 0.5, Math.SQRT1_2, Math.sqrt(3) / 2, 1];
const TANF = [0, 1 / Math.sqrt(3), 1, Math.sqrt(3)];
const neg = (t) => (t === '0' ? '0' : t.startsWith('-') ? t.slice(1) : `-${t}`);
function lookup(x, floats, texts) {
  const i = floats.findIndex((f) => Math.abs(Math.abs(x) - f) < 1e-9);
  if (i < 0) return null;
  return x < 0 ? neg(texts[i]) : texts[i];
}
// The exact value of f(kπ) as text, null if undefined.
export function trigVal(f, k) {
  const x = Q.of(k).valueOf() * Math.PI;
  const s = Math.sin(x);
  const c = Math.cos(x);
  if (f === 'sin') return lookup(s, SINF, SINV);
  if (f === 'cos') return lookup(c, SINF, SINV);
  if (f === 'tan') return Math.abs(c) < 1e-9 ? null : lookup(s / c, TANF, TANV);
  if (f === 'cot') return Math.abs(s) < 1e-9 ? null : lookup(c / s, TANF, TANV);
  return null;
}
const valueFloat = (t) => evalFloat(parse(t), {});

// Associated angle (reference angle in [0 ; π/2]) and the sign of f.
function assoc(f, k) {
  const P = f === 'tan' || f === 'cot' ? q(1) : q(2);
  const r = modQ(k, P);
  let ref;
  if (r.valueOf() <= 0.5) ref = r;
  else if (r.valueOf() <= 1) ref = q(1).sub(r);
  else if (r.valueOf() <= 1.5) ref = r.sub(q(1));
  else ref = q(2).sub(r);
  const val = valueFloat(trigVal(f, r) ?? '0');
  const refVal = valueFloat(trigVal(f, ref) ?? '0');
  const sign = Math.abs(refVal) < 1e-12 ? 1 : Math.sign(val / refVal);
  return { r, ref, sign };
}

// ======================================================================
// g3-radians
// ======================================================================

const RAD = 'g3-radians';

function degToRad(deg) {
  // deg° = deg/180·π
  const k = q(deg, 180);
  return { k, start: `${deg}°`, line: `${deg}/180×π`, final: piT(k) };
}

function radItem(level, rng, opts = {}) {
  const exam = opts.exam ? { format: opts.exam, points: 2 } : false;
  if (level <= 3) {
    const pool = level === 1 ? [30, 45, 60, 90, 120, 135, 150] : [210, 225, 240, 270, 300, 315, 330, 390, 420, -30, -45, -120];
    const deg = rng.pick(pool);
    const c = degToRad(deg);
    if (level <= 2) {
      const script = [
        { kind: 'eq', ...(level === 1 ? tpl(c.line, (n) => [n.l.d]) : { math: c.line }), note: t('Multiplier par π/180'), subgoal: 'convert' },
        { kind: 'eq', math: c.final, note: t('Simplifier la fraction'), subgoal: 'simplify' },
      ];
      return linesItem({
        skill: RAD, level, prompt: t('Convertis {d}° en radians.', { d: fr(String(deg)) }),
        start: c.start, judge: { kind: 'value', form: 'exact' }, mode: 'guided', script,
        hints: [
          { level: 1, html: t('180° = π rad : on multiplie par π/180.') },
          { level: 2, html: `${fr(String(deg))}° = ${MT(`${deg}/180×π`)}` },
          { level: 3, html: MT(c.final) },
        ],
        subgoals: RAD_SUB, keys: KEYS, key: `${RAD}:${deg}`,
      });
    }
    // Level 3: both ways, the operation chosen first.
    const k = rng.pick([q(5, 6), q(7, 4), q(2, 3), q(11, 6), q(3, 4), q(5, 3), q(7, 6), q(5, 4)]);
    const back = k.mul(180).valueOf();
    const menu = [
      { id: 'to-rad', label: t('Multiplier par π/180'), valid: true },
      { id: 'to-deg', label: t('Multiplier par 180/π'), valid: false, why: t('On passe de degrés à radians : π rad pour 180°.') },
      { id: 'two-pi', label: t('Multiplier par 2π'), valid: false, why: t('Un tour, c\'est 360° : 1° vaut π/180, pas 2π.') },
    ];
    const menu2 = menu.map((o) => ({ ...o, valid: o.id === 'to-deg', why: o.id === 'to-rad' ? t('L\'angle est en radians : pour des degrés, on multiplie par 180/π.') : o.why }));
    const script = [
      { kind: 'eq', math: c.final, note: t('En radians'), subgoal: 'convert' },
      { kind: 'segment', html: t('Et {k} en degrés :', { k: MT(piT(k)) }), ask: 'θ =', start: { math: piT(k) }, judge: { kind: 'value', form: 'deg', menu: menu2 } },
      { kind: 'eq', math: `${back}°`, note: t('Multiplier par 180/π'), subgoal: 'convert' },
    ];
    return linesItem({
      skill: RAD, level, prompt: t('Convertis {d}° en radians, puis {k} en degrés.', { d: fr(String(deg)), k: MT(piT(k)) }),
      start: c.start, judge: { kind: 'value', form: 'exact', menu }, mode: 'tap', script,
      hints: [
        { level: 1, html: t('Degrés → radians : × π/180. Radians → degrés : × 180/π.') },
        { level: 2, html: `${MT(piT(k))} = ${MT(`(${k.n}×180/${k.d})°`)}` },
        { level: 3, html: t('{a} puis {b}°', { a: MT(c.final), b: fr(String(back)) }) },
      ],
      subgoals: RAD_SUB, keys: KEYS, tapActions: 'menu', key: `${RAD}:${deg}:${toText(parse(piT(k)))}`,
    });
  }
  if (level === 4) {
    // Arc length or sector area, θ given in degrees.
    const deg = rng.pick([30, 45, 60, 90, 120, 135, 150, 20, 40, 72]);
    const r = rng.int(2, 20);
    const k = q(deg, 180);
    const sector = rng.chance(0.35);
    const L = sector ? k.mul(r * r).div(2) : k.mul(r);
    const script = [
      { kind: 'eq', math: piT(k), note: t('Convertir en radians'), subgoal: 'convert' },
      { kind: 'segment', html: sector ? t('Aire du secteur A = r²θ/2 :') : t('Longueur L = rθ :'), ask: sector ? 'A =' : 'L =', start: { math: sector ? `${r}^2×${deg}°/2` : `${r}×${deg}°` }, judge: { kind: 'value', form: 'exact' } },
      { kind: 'eq', math: sector ? `${r * r}/2×${piT(k)}` : `${r}×${piT(k)}`, note: sector ? 'A = r²θ/2' : 'L = rθ', subgoal: 'arc' },
      { kind: 'eq', math: piT(L), note: t('Calculer'), subgoal: 'arc' },
    ].filter((l, i, a) => !(i === 2 && !sector && k.n === 1 && L.d === k.d));
    return linesItem({
      skill: RAD, level, prompt: sector
        ? t('Aire du secteur d\'un disque de rayon {r} cm et d\'angle {deg}° (en cm², valeur exacte).', { r, deg })
        : t('Longueur de l\'arc d\'un cercle de rayon {r} cm sous-tendu par un angle de {deg}° (en cm, valeur exacte).', { r, deg }),
      start: `${deg}°`, judge: { kind: 'value', form: 'exact' }, mode: 'free', script,
      hints: [
        { level: 1, html: sector ? t('A = r²θ/2 demande θ en radians.') : t('L = rθ demande θ en radians.') },
        { level: 2, html: `${deg}° = ${MT(`${deg}/180×π`)} = …` },
        { level: 3, html: MT(piT(k)) },
      ],
      subgoals: RAD_SUB, keys: KEYS, key: `${RAD}:arc:${deg}:${r}:${sector}`, exam,
    });
  }
  // Level 5: interior angle of a regular polygon.
  const n = rng.pick([5, 6, 8, 9, 10, 12]);
  const k = q(n - 2, n);
  const script = [
    { kind: 'eq', math: `(${n}-2)×π/${n}`, note: t('Somme des angles (n − 2)π, partagée en n'), subgoal: 'arc' },
    { kind: 'eq', math: piT(k), note: t('Simplifier'), subgoal: 'simplify' },
  ];
  return linesItem({
    skill: RAD, level, prompt: t('Un polygone régulier a {n} côtés. Quel est chacun de ses angles intérieurs, en radians ?', { n }),
    start: 'θ', judge: { kind: 'value', form: 'exact', expect: piT(k) }, mode: 'free', script,
    hints: [], subgoals: RAD_SUB, keys: KEYS, key: `${RAD}:poly:${n}`, exam,
  });
}

const RAD_SUB = [
  { id: 'convert', label: t('convertir'), skill: 'prop-rule3' },
  { id: 'simplify', label: t('simplifier'), skill: RAD },
  { id: 'arc', label: 'L = rθ', skill: RAD },
];

function radExam(rng) {
  const deg = rng.pick([30, 45, 60, 120, 150, 20, 40]);
  const r = rng.pick([6, 9, 12, 15, 18]);
  const k = q(deg, 180);
  const L = k.mul(r);
  const options = [
    { html: `${MT(piT(L))} cm`, correct: true },
    { html: `${r * deg} cm`, correct: false, rule: 'g3_deg_rad' },
    { html: `${MT(piT(k))} cm`, correct: false },
    { html: `${MT(piT(L.mul(2)))} cm`, correct: false },
  ].filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);
  return mcq({
    skill: RAD, level: 4, prompt: t('Longueur de l\'arc d\'un cercle de rayon {r} cm sous-tendu par un angle de {deg}° ?', { r, deg }), options,
    key: `mcq:${deg}:${r}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `θ = ${MT(piT(k))}, L = rθ = ${MT(piT(L))} cm`, note: '' }],
  }, rng);
}

// ======================================================================
// g3-reduce
// ======================================================================

const RED = 'g3-reduce';
const FN_NAME = { sin: 'sin', cos: 'cos', tan: 'tan', cot: 'cot' };

// The lines that reduce f(kπ): remove turns, associated angle, value.
function reduceLines(f, k) {
  const P = f === 'tan' || f === 'cot' ? q(1) : q(2);
  const { r, ref, sign } = assoc(f, k);
  const lines = [];
  if (!r.eq(Q.of(k))) lines.push({ math: `${f}(${piT(r)})`, note: P.eq(1) ? t('Retirer des multiples de π') : t('Retirer des tours de 2π'), subgoal: 'turns' });
  if (!ref.eq(r)) lines.push({ math: `${sign < 0 ? '-' : ''}${f}(${piT(ref)})`, note: t('Angle associé'), subgoal: 'assoc' });
  lines.push({ math: trigVal(f, k), note: t('Valeur connue'), subgoal: 'value' });
  return { lines, r, ref, sign };
}

function redAngle(rng, big, f) {
  for (let i = 0; i < 200; i++) {
    const d = rng.pick([3, 4, 6]);
    const n = rng.int(1, 2 * d - 1);
    const base = q(n, d);
    if (base.d === 1 || base.mul(2).d === 1) continue; // not on an axis
    const P = f === 'tan' || f === 'cot' ? 1 : 2;
    const turns = big ? rng.int(2, 8) * (rng.chance(0.25) ? -1 : 1) : 0;
    const k = base.add(q(P * turns));
    if (trigVal(f, k) === null) continue;
    return k;
  }
  return q(5, 6);
}

// cos(7π − x): the expression in x, reduced. kπ/2 + s·x.
function redExpr(rng) {
  const f = rng.pick(['sin', 'cos']);
  let k = rng.int(-9, 9);
  if (((k % 4) + 4) % 4 === 0) k += rng.pick([1, 2, 3]);
  const s = rng.pick([1, -1]);
  const m = ((k % 4) + 4) % 4;
  const y = s > 0 ? 'x' : '-x';
  const argT = (kk) => `${kk === 0 ? '' : piT(q(kk, 2))}${s > 0 ? (kk === 0 ? 'x' : '+x') : '-x'}`;
  // sin(mπ/2 + y), cos(mπ/2 + y)
  const table = f === 'sin' ? [['', 'sin'], ['', 'cos'], ['-', 'sin'], ['-', 'cos']] : [['', 'cos'], ['-', 'sin'], ['-', 'cos'], ['', 'sin']];
  let [sg, g] = table[m];
  // g(−x): sin is odd
  if (s < 0 && g === 'sin') sg = sg === '-' ? '' : '-';
  const final = `${sg}${g}(x)`;
  const lines = [];
  if (k !== m) lines.push({ math: `${f}(${argT(m)})`, note: t('Retirer des tours de 2π'), subgoal: 'turns' });
  lines.push({ math: final, note: m % 2 ? t('Autour de π/2 : sin et cos s\'échangent') : t('Angle associé'), subgoal: 'assoc' });
  return { start: `${f}(${argT(k)})`, lines, final, f, k, y };
}

function redItem(level, rng, opts = {}) {
  const exam = opts.exam ? { format: opts.exam, points: 2 } : false;
  const expr = level >= 4 && rng.chance(0.4);
  if (expr) {
    const e = redExpr(rng);
    return linesItem({
      skill: RED, level, prompt: t('Écris {e} avec une seule fonction de x.', { e: MT(e.start) }),
      start: e.start, judge: { kind: 'equiv', vars: ['x'], target: 'one-trig', domain: { x: [-1.4, 1.4] } }, mode: 'free',
      script: e.lines.map((l) => ({ kind: 'eq', ...l })),
      hints: level >= 5 ? [] : [
        { level: 1, html: t('Retire des multiples de 2π, puis utilise un angle associé.') },
        { level: 2, html: MT(e.lines[0].math) },
        { level: 3, html: MT(e.final) },
      ],
      subgoals: RED_SUB, keys: KEYS, key: `${RED}:${e.start}`, exam,
    });
  }
  const f = rng.pick(level <= 2 ? ['sin', 'cos'] : ['sin', 'cos', 'tan', 'cos', 'sin', 'cot']);
  const k = redAngle(rng, level >= 2, f);
  const { lines, ref } = reduceLines(f, k);
  const start = `${f}(${piT(k)})`;
  let script = lines.map((l) => ({ kind: 'eq', ...l }));
  if (level === 1) {
    // The angle is already reduced: read the associated angle, then the value.
    script = script.map((l, i) => (i === script.length - 1 ? { ...l, ...tpl(l.math, (n) => [n]) } : l));
  }
  const mode = level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free';
  return linesItem({
    skill: RED, level, prompt: t('Calcule {e} sans calculatrice.', { e: MT(start) }),
    start, judge: { kind: 'equiv', vars: [], target: 'exact' }, mode, script,
    hints: level >= 5 ? [] : [
      { level: 1, html: f === 'tan' || f === 'cot' ? t('{f} a pour période π : retire des multiples de π, puis lis le quadrant.', { f }) : t('Retire des tours de 2π, puis lis le quadrant.') },
      { level: 2, html: lines.length > 1 ? MT(lines[lines.length - 2].math) : `${MT(`${f}(${piT(ref)})`)} = …` },
      { level: 3, html: MT(lines[lines.length - 1].math) },
    ],
    subgoals: RED_SUB, keys: KEYS, tapActions: mode === 'tap' ? 'trig' : null, key: `${RED}:${start}`, exam,
  });
}

const RED_SUB = [
  { id: 'turns', label: t('retirer des tours'), skill: RED },
  { id: 'assoc', label: t('angle associé'), skill: RED },
  { id: 'value', label: t('valeur connue'), skill: RED },
];

function redExam(rng, exam) {
  if (exam === 'tf') {
    const bank = [
      { s: 'tan(x+π)=-tan(x)', truth: false, counter: 'π/4', pred: 'cos(x)=0 ∨ tan(x+π)=-tan(x)', expl: t('Faux : tan a pour période π, donc tan(x + π) = tan x. Avec x = π/4 : tan(5π/4) = 1, pas −1.') },
      { s: 'cos(π-x)=cos(x)', truth: false, counter: '0', pred: 'cos(π-x)=cos(x)', expl: t('Faux : cos(π − x) = −cos x. Avec x = 0 : cos π = −1, pas 1.') },
      { s: 'sin(π/2+x)=sin(x)', truth: false, counter: '0', pred: 'sin(π/2+x)=sin(x)', expl: t('Faux : sin(π/2 + x) = cos x. Avec x = 0 : sin(π/2) = 1, mais sin 0 = 0.') },
      { s: 'cos(x+2π)=cos(x)', truth: true, expl: t('Vrai : cos a pour période 2π.') },
      { s: 'sin(π-x)=sin(x)', truth: true, expl: t('Vrai : x et π − x sont symétriques par rapport à l\'axe vertical.') },
    ];
    const b = rng.pick(bank);
    return tfItem({
      skill: RED, level: 4, statement: t('Pour tout x réel, {s}.', { s: MT(b.s) }), truth: b.truth, key: b.s, explanation: b.expl,
      counter: b.truth ? null : { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: b.pred, ask: [{ v: 'x', label: 'x =' }], answer: { x: b.counter } },
      ruleIfTrue: b.s.includes('π/2') ? 'g3_reduce_swap' : b.truth ? null : 'g3_reduce_sign',
      exam: { format: 'tf', points: 1 },
    });
  }
  const f = rng.pick(['sin', 'cos', 'tan']);
  const k = redAngle(rng, true, f);
  const { ref, sign } = reduceLines(f, k);
  const right = trigVal(f, k);
  const options = [{ html: MT(right), correct: true }];
  const add = (t, rule) => { if (t && !options.some((o) => o.html === MT(t))) options.push({ html: MT(t), correct: false, rule }); };
  add(sign < 0 ? neg(right) : null, 'g3_reduce_sign');
  if (f !== 'tan') add(`${sign < 0 ? '-' : ''}${trigVal(f === 'sin' ? 'cos' : 'sin', ref)}`, 'g3_reduce_swap');
  add(neg(right), 'g3_reduce_sign');
  for (const t of ['1/2', '-1/2', '√3/2', '-√2/2', '1', '√3']) if (options.length < 4) add(t, null);
  return mcq({
    skill: RED, level: 4, prompt: `${MT(`${f}(${piT(k)})`)} = ?`, options: options.slice(0, 4), key: `mcq:${f}:${toText(parse(piT(k)))}`,
    exam: { format: 'mcq', points: 1 }, solution: reduceLines(f, k).lines.map((l) => ({ html: MT(l.math), note: l.note })),
  }, rng);
}

// ======================================================================
// g3-identities
// ======================================================================

const IDS = 'g3-identities';
const FORMULAS = {
  double: t('Angle double : sin 2u = 2 sin u cos u, cos 2u = 2cos²u − 1 = 1 − 2sin²u'),
  add: t('Addition : cos(a ± b), sin(a ± b)'),
  pyth: 'cos²u + sin²u = 1',
  quot: 'tan u = sin u / cos u',
  sumprod: t('Somme-produit : sin p ± sin q, cos p ± cos q'),
  expand: t('Développer (identité remarquable)'),
  factor: t('Factoriser a² − b² = (a − b)(a + b)'),
};

// A bank of identities, u = x, 2x or 3x where it reads well. Each line has
// the formula it uses.
function identity(rng) {
  const u = rng.pick(['x', 'x', '2x', '3x']);
  const U = (t) => t.replace(/U/g, u);
  const D = (t) => t.replace(/D/g, u === 'x' ? '2x' : u === '2x' ? '4x' : '6x');
  const pick = rng.int(0, 11);
  const b = rng.pick([['π/3', '1', ''], ['π/4', '√2', '√2'], ['π/6', '√3', '√3']]);
  const bank = [
    () => ({ start: D('sin(D)/(1+cos(D))'), goal: U('tan(U)'), lines: [
      [U(D('2sin(U)cos(U)/(1+cos(D))')), 'double'], [U('2sin(U)cos(U)/(2cos(U)^2)'), 'double'], [U('sin(U)/cos(U)'), 'quot'], [U('tan(U)'), 'quot']] }),
    () => ({ start: U('cos(U)^4-sin(U)^4'), goal: D('cos(D)'), lines: [
      [U('(cos(U)^2-sin(U)^2)(cos(U)^2+sin(U)^2)'), 'factor'], [U('cos(U)^2-sin(U)^2'), 'pyth'], [D('cos(D)'), 'double']] }),
    () => ({ start: 'sin(3x)', goal: '3sin(x)-4sin(x)^3', lines: [
      ['sin(2x)cos(x)+cos(2x)sin(x)', 'add'], ['2sin(x)cos(x)^2+(1-2sin(x)^2)sin(x)', 'double'], ['2sin(x)(1-sin(x)^2)+sin(x)-2sin(x)^3', 'pyth'], ['3sin(x)-4sin(x)^3', 'pyth']] }),
    () => ({ start: U('(sin(U)+cos(U))^2'), goal: D('1+sin(D)'), lines: [
      [U('sin(U)^2+2sin(U)cos(U)+cos(U)^2'), 'expand'], [U('1+2sin(U)cos(U)'), 'pyth'], [D('1+sin(D)'), 'double']] }),
    () => ({ start: D('(1-cos(D))/sin(D)'), goal: U('tan(U)'), lines: [
      [U('2sin(U)^2/sin(') + D('D)'), 'double'], [U('2sin(U)^2/(2sin(U)cos(U))'), 'double'], [U('sin(U)/cos(U)'), 'quot'], [U('tan(U)'), 'quot']] }),
    () => ({ start: `cos(x+${b[0]})+cos(x-${b[0]})`, goal: `${b[2]}cos(x)`, lines: [
      [`cos(x)cos(${b[0]})-sin(x)sin(${b[0]})+cos(x)cos(${b[0]})+sin(x)sin(${b[0]})`, 'add'], [`2cos(x)cos(${b[0]})`, 'add'], [`${b[2]}cos(x)`, 'add']].filter((l, i, a) => i < 2 || l[0] !== a[1][0]) }),
    () => ({ start: `sin(x+${b[0] === 'π/3' ? 'π/6' : b[0] === 'π/6' ? 'π/3' : 'π/4'})-sin(x-${b[0] === 'π/3' ? 'π/6' : b[0] === 'π/6' ? 'π/3' : 'π/4'})`, goal: `${b[2]}cos(x)`, lines: (() => {
      const c = b[0] === 'π/3' ? 'π/6' : b[0] === 'π/6' ? 'π/3' : 'π/4';
      return [[`sin(x)cos(${c})+cos(x)sin(${c})-sin(x)cos(${c})+cos(x)sin(${c})`, 'add'], [`2cos(x)sin(${c})`, 'add'], [`${b[2]}cos(x)`, 'add']];
    })() }),
    () => ({ start: D('(1+cos(D))/2'), goal: U('cos(U)^2'), lines: [
      [U('(1+2cos(U)^2-1)/2'), 'double'], [U('cos(U)^2'), 'double']] }),
    () => ({ start: 'tan(x)+1/tan(x)', goal: '2/sin(2x)', lines: [
      ['sin(x)/cos(x)+cos(x)/sin(x)', 'quot'], ['(sin(x)^2+cos(x)^2)/(sin(x)cos(x))', 'quot'], ['1/(sin(x)cos(x))', 'pyth'], ['2/sin(2x)', 'double']] }),
    () => ({ start: 'sin(3x)+sin(x)', goal: '2sin(2x)cos(x)', lines: [['2sin((3x+x)/2)cos((3x-x)/2)', 'sumprod'], ['2sin(2x)cos(x)', 'sumprod']] }),
    () => ({ start: 'cos(3x)+cos(x)', goal: '2cos(2x)cos(x)', lines: [['2cos((3x+x)/2)cos((3x-x)/2)', 'sumprod'], ['2cos(2x)cos(x)', 'sumprod']] }),
    () => ({ start: 'cos(x)-cos(3x)', goal: '2sin(2x)sin(x)', lines: [['-2sin((x+3x)/2)sin((x-3x)/2)', 'sumprod'], ['2sin(2x)sin(x)', 'sumprod']] }),
  ];
  const id = bank[pick]();
  return { ...id, key: `${pick}:${u}:${b[0]}` };
}

const ID_RULE = { double: t('Angle double'), add: t('Formule d\'addition'), pyth: 'cos² + sin² = 1', quot: 'tan = sin/cos', sumprod: t('Somme-produit'), expand: t('Développer'), factor: t('Factoriser a² − b²') };

function idItem(level, rng, opts = {}) {
  const exam = opts.exam ? { format: opts.exam, points: 3 } : false;
  if (level === 5) return idSolve(rng, exam);
  const d = identity(rng);
  const judge = { kind: 'equiv', vars: ['x'], target: 'goal', goal: d.goal, domain: { x: [-1.4, 1.4] } };
  const script = [];
  const first = d.lines[0][1];
  if (level === 2) {
    const opts2 = [first, ...Object.keys(FORMULAS).filter((k) => k !== first).slice(0, 3)];
    script.push({ kind: 'decision', prompt: t('Quelle formule pour commencer ?'), options: opts2.map((k) => ({ id: k, label: FORMULAS[k], valid: k === first, why: t('Ce n\'est pas la formule qui fait avancer ici.'), rule: k === 'add' && first !== 'add' ? 'g3_linear' : undefined })) });
  }
  if (level === 1) script.push({ kind: 'note', html: t('Formule : {f}.', { f: FORMULAS[first] }) });
  d.lines.forEach(([math, f], i) => {
    const line = { kind: 'eq', math, note: ID_RULE[f], subgoal: f === 'add' || f === 'double' || f === 'sumprod' ? 'formula' : 'develop' };
    if (level === 1 && i === 0) Object.assign(line, tpl(math, (n) => [blankable(n)]));
    script.push(line);
    if (level === 3 && i === 0) {
      const keys = Object.keys(ID_RULE).filter((k) => k === f).concat(Object.keys(ID_RULE).filter((k) => k !== f).slice(0, 3));
      script.push({ kind: 'rule', ask: t('Quelle formule as-tu utilisée ?'), options: keys.map((k) => ({ id: k, label: ID_RULE[k] })), correct: f });
    }
  });
  const menu = Object.keys(FORMULAS).map((k) => ({ id: k, label: FORMULAS[k], valid: d.lines.some((l) => l[1] === k), why: t('Cette formule ne sert pas dans ce calcul.') }));
  return linesItem({
    skill: IDS, level, prompt: t('Montre que {e} (transforme le membre de gauche).', { e: MT(`${d.start}=${d.goal}`) }),
    start: d.start, judge: level === 3 ? { ...judge, menu } : judge, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints: [
      { level: 1, html: t('Commence par : {f}.', { f: FORMULAS[first] }) },
      { level: 2, html: MT(d.lines[0][0]) },
      { level: 3, html: MT(d.lines[Math.min(1, d.lines.length - 1)][0]) },
    ],
    subgoals: ID_SUB, keys: KEYS, tapActions: level === 3 ? 'menu' : null, key: `${IDS}:${d.key}`, exam,
  });
}

// The node to blank in a first line: its first trig factor.
function blankable(node) {
  let found = null;
  const visit = (n) => {
    if (found || !n || typeof n !== 'object') return;
    if (n.t === 'fn') { found = n; return; }
    for (const k of ['l', 'r', 'e', 'n', 'd', 'b']) if (n[k]) visit(n[k]);
  };
  visit(node);
  return found ?? node;
}

const ID_SUB = [
  { id: 'formula', label: t('formule'), skill: IDS },
  { id: 'develop', label: t('développer'), skill: 'lit-polynomial' },
];

// Level 5: a sum turned into a product to solve sin(px) ± sin(qx) = 0.
function idSolve(rng, exam) {
  for (;;) {
    const p = rng.int(2, 5);
    const qq = rng.int(1, p - 1);
    if ((p + qq) % 2) continue;
    const a = (p + qq) / 2;
    const c = (p - qq) / 2;
    const plus = rng.chance(0.5);
    const start = `sin(${p}x)${plus ? '+' : '-'}sin(${qq === 1 ? '' : qq}x)=0`;
    const ax = (m) => `${m === 1 ? '' : m}x`;
    const prod = plus ? `2sin(${ax(a)})cos(${ax(c)})=0` : `2cos(${ax(a)})sin(${ax(c)})=0`;
    // sin(mx) = 0: x = kπ/m ; cos(mx) = 0: x = π/(2m) + kπ/m
    const sinF = (m) => [q(0), q(1, m)];
    const cosF = (m) => [q(1, 2 * m), q(1, m)];
    const fams = plus ? [sinF(a), cosF(c)] : [cosF(a), sinF(c)];
    const zero = plus ? `sin(${ax(a)})=0∨cos(${ax(c)})=0` : `cos(${ax(a)})=0∨sin(${ax(c)})=0`;
    const script = [
      { kind: 'eq', math: prod, note: t('Somme-produit'), subgoal: 'formula' },
      { kind: 'eq', math: zero, note: t('Produit nul'), subgoal: 'formula' },
      { kind: 'eq', math: famsT(fams), note: t('Équations de base'), subgoal: 'formula' },
    ];
    return linesItem({
      skill: IDS, level: 5, prompt: t('Résous {e} dans ℝ (k désigne un entier).', { e: MT(start) }),
      start, judge: PERIODIC(), mode: 'free', script, hints: [], subgoals: ID_SUB, keys: KEYS, key: `${IDS}:solve:${start}`, exam,
    });
  }
}

function idExam(rng, exam) {
  if (exam === 'tf') {
    const bank = [
      { s: 'sin(a+b)=sin(a)+sin(b)', truth: false, ans: { a: 'π/2', b: 'π/2' }, rule: 'g3_linear', expl: t('Faux : avec a = b = π/2, sin π = 0 mais sin(π/2) + sin(π/2) = 2.') },
      { s: 'cos(2a)=2cos(a)', truth: false, ans: { a: '0', b: '0' }, rule: 'g3_linear', expl: t('Faux : avec a = 0, cos 0 = 1 mais 2 cos 0 = 2.') },
      { s: 'cos(a+b)=cos(a)cos(b)+sin(a)sin(b)', truth: false, ans: { a: 'π/4', b: 'π/4' }, rule: 'g3_add_sign', expl: t('Faux : avec a = b = π/4, cos(π/2) = 0 mais 1/2 + 1/2 = 1. C\'est un moins.') },
      { s: 'cos(2a)=1-2sin(a)^2', truth: true, expl: t('Vrai : cos 2a = cos²a − sin²a = 1 − 2sin²a.') },
      { s: 'sin(2a)=2sin(a)cos(a)', truth: true, expl: t('Vrai : c\'est sin(a + a).') },
    ];
    const b = rng.pick(bank);
    return tfItem({
      skill: IDS, level: 4, statement: t('Pour tous a, b réels, {s}.', { s: MT(b.s, { vars: ['a', 'b'] }) }), truth: b.truth, key: b.s, explanation: b.expl,
      counter: b.truth ? null : { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R' }, { q: '∀', v: 'b', dom: 'R' }], pred: b.s, ask: [{ v: 'a', label: 'a =' }, { v: 'b', label: 'b =' }], answer: b.ans },
      ruleIfTrue: b.truth ? null : b.rule, exam: { format: 'tf', points: 1 },
    });
  }
  const [aa, bb] = rng.pick([['x', 'y'], ['a', 'b'], ['2x', 'x']]);
  const which = rng.pick(['cos+', 'cos-', 'sin+', 'sin-']);
  const s = which.endsWith('+') ? '+' : '-';
  const o = s === '+' ? '-' : '+';
  const right = which.startsWith('cos') ? `cos(${aa})cos(${bb})${o}sin(${aa})sin(${bb})` : `sin(${aa})cos(${bb})${s}cos(${aa})sin(${bb})`;
  const flip = which.startsWith('cos') ? `cos(${aa})cos(${bb})${s}sin(${aa})sin(${bb})` : `sin(${aa})cos(${bb})${o}cos(${aa})sin(${bb})`;
  const lin = which.startsWith('cos') ? `cos(${aa})${s}cos(${bb})` : `sin(${aa})${s}sin(${bb})`;
  const swap = which.startsWith('cos') ? `cos(${aa})sin(${bb})${o}sin(${aa})cos(${bb})` : `sin(${aa})sin(${bb})${s}cos(${aa})cos(${bb})`;
  const vars = { vars: ['x', 'y', 'a', 'b'] };
  const options = [
    { html: MT(right, vars), correct: true },
    { html: MT(flip, vars), correct: false, rule: 'g3_add_sign' },
    { html: MT(lin, vars), correct: false, rule: 'g3_linear' },
    { html: MT(swap, vars), correct: false },
  ];
  const lhs = `${which.slice(0, 3)}(${aa}${s}${bb})`;
  return mcq({
    skill: IDS, level: 4, prompt: `${MT(lhs, vars)} = ?`, options, key: `mcq:${lhs}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `${MT(lhs, vars)} = ${MT(right, vars)}`, note: t('Formulaire') }],
  }, rng);
}

// ======================================================================
// g3-exact
// ======================================================================

const EXACT = 'g3-exact';
const KNOWN = [q(1, 6), q(1, 4), q(1, 3), q(1, 2), q(2, 3), q(3, 4), q(5, 6)];
// The final forms of the values at kπ/12: ±(√6 ± √2)/4, ±(2 ± √3).
const FORMS12 = ['(√6+√2)/4', '(√6-√2)/4', '-(√6+√2)/4', '-(√6-√2)/4', '2+√3', '2-√3', '-2-√3', '-2+√3', '√2/2', '-√2/2', '1/2', '-1/2', '√3/2', '-√3/2', '1', '-1', '0', '√3', '-√3', '√3/3', '-√3/3'];
const exactVal = (f, k) => { const x = Q.of(k).valueOf() * Math.PI; return formOf(f === 'cos' ? Math.cos(x) : f === 'sin' ? Math.sin(x) : Math.tan(x)); };
const formOf = (x) => FORMS12.find((t) => Math.abs(valueFloat(t) - x) < 1e-9) ?? null;

function exactData(rng) {
  for (let i = 0; i < 200; i++) {
    const f = rng.pick(['cos', 'sin', 'cos', 'sin', 'tan']);
    const n = rng.pick([1, 5, 7, 11, 13, 17, 19, 23, -1, -5]);
    const k = q(n, 12);
    // a ± b with a, b known
    const pairs = [];
    for (const a of KNOWN) for (const b of KNOWN) { if (a.add(b).eq(k) && a.cmp(b) >= 0) pairs.push([a, b, '+']); if (a.sub(b).eq(k)) pairs.push([a, b, '-']); }
    // Small angles first: π/3 + π/4 rather than 3π/4 + 5π/6.
    pairs.sort((u, w) => Math.max(u[0].valueOf(), u[1].valueOf()) - Math.max(w[0].valueOf(), w[1].valueOf()));
    // Larger angles: reduce first by 2π (k ∈ ]0 ; 2π[).
    const r = modQ(k, q(2));
    for (const a of KNOWN) for (const b of KNOWN) { if (!r.eq(k) && a.add(b).eq(r)) pairs.push([a, b, '+', true]); }
    if (!pairs.length) continue;
    const ok = pairs.filter((p) => f !== 'tan' || (trigVal('tan', p[0]) !== null && trigVal('tan', p[1]) !== null));
    if (!ok.length) continue;
    const best = Math.max(ok[0][0].valueOf(), ok[0][1].valueOf());
    const [a, b, s, reduced] = rng.pick(ok.filter((p) => Math.max(p[0].valueOf(), p[1].valueOf()) === best));
    return { f, k, a, b, s, reduced, val: exactVal(f, k) };
  }
  return { f: 'cos', k: q(11, 12), a: q(2, 3), b: q(1, 4), s: '+', val: '-(√6+√2)/4', fallback: true };
}

function exactLines(d) {
  const A = piT(d.a);
  const B = piT(d.b);
  const s = d.s;
  const o = s === '+' ? '-' : '+';
  const vA = (f) => trigVal(f, d.a);
  const vB = (f) => trigVal(f, d.b);
  const P = (t) => `(${t})`;
  const lines = [];
  if (d.reduced) lines.push({ math: `${d.f}(${piT(modQ(d.k, q(2)))})`, note: t('Retirer un tour'), subgoal: 'decompose' });
  lines.push({ math: `${d.f}(${A}${s}${B})`, note: t('Décomposer'), subgoal: 'decompose' });
  if (d.f === 'cos') {
    lines.push({ math: `cos(${A})cos(${B})${o}sin(${A})sin(${B})`, note: t('Formule d\'addition'), subgoal: 'formula' });
    lines.push({ math: `${P(vA('cos'))}${P(vB('cos'))}${o}${P(vA('sin'))}${P(vB('sin'))}`, note: t('Valeurs connues'), subgoal: 'value' });
  } else if (d.f === 'sin') {
    lines.push({ math: `sin(${A})cos(${B})${s}cos(${A})sin(${B})`, note: t('Formule d\'addition'), subgoal: 'formula' });
    lines.push({ math: `${P(vA('sin'))}${P(vB('cos'))}${s}${P(vA('cos'))}${P(vB('sin'))}`, note: t('Valeurs connues'), subgoal: 'value' });
  } else {
    lines.push({ math: `(tan(${A})${s}tan(${B}))/(1${o}tan(${A})tan(${B}))`, note: t('Formule d\'addition'), subgoal: 'formula' });
    lines.push({ math: `(${vA('tan')}${s}${P(vB('tan'))})/(1${o}${P(vA('tan'))}${P(vB('tan'))})`, note: t('Valeurs connues'), subgoal: 'value' });
  }
  lines.push({ math: d.val, note: t('Simplifier'), subgoal: 'simplify' });
  return lines;
}

function exactItem(level, rng, opts = {}) {
  const exam = opts.exam ? { format: opts.exam, points: 2 } : false;
  if (level === 5) return exactDouble(rng, exam);
  const d = exactData(rng);
  if (d.f === 'tan' && level <= 2) { d.f = 'cos'; d.val = exactVal('cos', d.k); }
  const lines = exactLines(d);
  const start = `${d.f}(${piT(d.k)})`;
  let script = lines.map((l) => ({ kind: 'eq', ...l }));
  if (level === 1) {
    script = script.map((l, i) => (l.subgoal === 'value' ? { ...l, ...tpl(l.math, (n) => [n.r.t === 'bin' ? n.r.r : n.r]) } : l));
  }
  if (level === 2) {
    script.unshift({ kind: 'decision', prompt: t('Comment écrire {k} ?', { k: fr(piT(d.k)) }), options: [
      { id: 'sum', label: `${fr(piT(d.a))} ${d.s === '+' ? '+' : '−'} ${fr(piT(d.b))}`, valid: true },
      { id: 'half', label: t('La moitié de {k}', { k: fr(piT(d.k.mul(2))) }), valid: false, why: t('C\'est possible, mais la bissection donne une racine dans une racine : la somme d\'angles connus est plus simple ici.') },
      { id: 'lin', label: `${d.f}(${fr(piT(d.a))}) ${d.s === '+' ? '+' : '−'} ${d.f}(${fr(piT(d.b))})`, valid: false, rule: 'g3_linear', why: t('{f} n\'est pas linéaire : il faut la formule d\'addition.', { f: d.f }) },
    ] });
  }
  const mode = level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free';
  return linesItem({
    skill: EXACT, level, prompt: t('Calcule {e} sans calculatrice (valeur exacte).', { e: MT(start) }),
    start, judge: { kind: 'equiv', vars: [], target: 'exact' }, mode, script,
    hints: [
      { level: 1, html: `${MT(piT(d.k))} = ${MT(`${piT(d.a)}${d.s}${piT(d.b)}`)}.` },
      { level: 2, html: d.f === 'cos' ? 'cos(a + b) = cos a cos b − sin a sin b' : d.f === 'sin' ? 'sin(a + b) = sin a cos b + cos a sin b' : 'tan(a + b) = (tan a + tan b)/(1 − tan a tan b)' },
      { level: 3, html: MT(lines.find((l) => l.subgoal === 'formula').math) },
    ],
    subgoals: EXACT_SUB, keys: KEYS, tapActions: mode === 'tap' ? 'exact' : null, key: `${EXACT}:${start}`, exam, fallback: d.fallback,
  });
}

const EXACT_SUB = [
  { id: 'decompose', label: t('décomposer'), skill: EXACT },
  { id: 'formula', label: t('formule d\'addition'), skill: IDS },
  { id: 'value', label: t('valeurs connues'), skill: RED },
  { id: 'simplify', label: t('simplifier'), skill: 'root-rules' },
];

// Level 5: sin x given with its quadrant; sin 2x and cos 2x.
function exactDouble(rng, exam) {
  const [a, b, c] = rng.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]);
  const swap = rng.chance(0.5);
  const s = swap ? b : a;
  const co = swap ? a : b;
  const quad = rng.pick([2, 3, 4]);
  const sinS = quad === 2 ? 1 : -1;
  const cosS = quad === 4 ? 1 : -1;
  const sinV = q(sinS * s, c);
  const cosV = q(cosS * co, c);
  const dom = { 2: '[π/2 ; π]', 3: '[π ; 3π/2]', 4: '[3π/2 ; 2π]' }[quad];
  const sin2 = sinV.mul(cosV).mul(2);
  const cos2 = q(1).sub(sinV.mul(sinV).mul(2));
  const script = [
    { kind: 'eq', math: `${cosS < 0 ? '-' : ''}√(1-${s * s}/${c * c})`, note: t('cos x {c} sur {dom}', { c: cosS < 0 ? '< 0' : '> 0', dom }), subgoal: 'value' },
    { kind: 'eq', math: lit0(cosV), note: 'cos x', subgoal: 'value' },
    { kind: 'segment', html: 'sin 2x = 2 sin x cos x :', ask: 'sin(2x) =', start: { math: `2×(${lit0(sinV)})×(${lit0(cosV)})` }, judge: { kind: 'value', form: 'exact' } },
    { kind: 'eq', math: lit0(sin2), note: t('Angle double'), subgoal: 'formula' },
    { kind: 'segment', html: 'cos 2x = 1 − 2sin²x :', ask: 'cos(2x) =', start: { math: `1-2×(${lit0(sinV)})^2` }, judge: { kind: 'value', form: 'exact' } },
    { kind: 'eq', math: lit0(cos2), note: t('Angle double'), subgoal: 'formula' },
  ];
  return linesItem({
    skill: EXACT, level: 5, prompt: t('On sait que sin x = {s} et x ∈ {dom}. Calcule cos x, sin 2x et cos 2x.', { s: fr(lit0(sinV)), dom }),
    start: 'cos(x)', judge: { kind: 'value', form: 'exact', expect: lit0(cosV) }, mode: 'free', script, hints: [],
    subgoals: EXACT_SUB, keys: KEYS, key: `${EXACT}:double:${lit0(sinV)}:${quad}`, exam,
  });
}

function exactExam(rng, exam) {
  if (exam === 'open') return exactItem(5, rng, { exam });
  const d = exactData(rng);
  if (d.f === 'tan') { d.f = 'cos'; d.val = exactVal('cos', d.k); }
  // Wrong sign in the addition formula; the value of the other sign.
  const A = d.a.valueOf() * Math.PI;
  const B = (d.s === '+' ? 1 : -1) * d.b.valueOf() * Math.PI;
  const flipped = d.f === 'cos' ? Math.cos(A) * Math.cos(B) + Math.sin(A) * Math.sin(B) : Math.sin(A) * Math.cos(B) - Math.cos(A) * Math.sin(B);
  const options = [{ html: MT(d.val), correct: true }];
  const add = (t, rule) => { if (t && !options.some((o) => o.html === MT(t))) options.push({ html: MT(t), correct: false, rule }); };
  add(formOf(flipped), 'g3_add_sign');
  add(neg(d.val), 'g3_half_sign');
  for (const t of ['(√6+√2)/4', '(√6-√2)/4', '-(√6+√2)/4', '-(√6-√2)/4']) if (options.length < 4) add(t, null);
  return mcq({
    skill: EXACT, level: 4, prompt: `${MT(`${d.f}(${piT(d.k)})`)} = ?`, options, key: `mcq:${d.f}:${toText(parse(piT(d.k)))}`,
    exam: { format: 'mcq', points: 1 }, solution: exactLines(d).map((l) => ({ html: MT(l.math), note: l.note })),
  }, rng);
}


export const GEN = {
  [RAD]: (level, rng, profile, opts = {}) => (opts.exam ? radExam(rng) : radItem(level, rng, opts)),
  [RED]: (level, rng, profile, opts = {}) => (opts.exam ? redExam(rng, opts.exam) : redItem(level, rng, opts)),
  [IDS]: (level, rng, profile, opts = {}) => (opts.exam ? idExam(rng, opts.exam) : idItem(level, rng, opts)),
  [EXACT]: (level, rng, profile, opts = {}) => (opts.exam ? exactExam(rng, opts.exam) : exactItem(level, rng, opts)),
};
// Shared with trigo-eq.js and trigo-tri.js (the other G3 generators).
export { q, PERIODIC, KEYS, lit0, tpl, famsT, famsHtml, modQ, valueFloat, assoc, neg, RED, IDS, EXACT };

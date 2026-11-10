// a1-extrema-global (module A1, part b, step U2): global extrema of a
// continuous function on a segment [a ; b]. Parts: (well defined: Δ of a
// quadratic denominator), derive (equiv), zeros of f′ (solset), the
// candidates (decision with a decoy outside [a ; b]), the values f(a),
// f(c), f(b) (value), then max and min (value with `expect`; the trap
// a1_extrema_bounds_forgotten replays on cfg.extrema).
// Templates: (x² + s)/(x + r) (exam GM 2019), a cubic, and
// (x² + px + q)/(x² + rx + s) (the catalogue's worked example).

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { exactValue } from '../../cas/normal.js';
import { N, H, E, examOf, kx, joinSum, lin, blanked, partsItem, mcqOf, ML, RD } from './analyse1-b-common.js';

const SK = 'a1-extrema-global';
const KEYS = ['calcx', 'relation'];
const SUB = [
  { id: 'defined', label: 'bien définie : discriminant', skill: 'quad-formula' },
  { id: 'deriv', label: 'dériver', skill: 'a1-deriv-rules' },
  { id: 'crit', label: 'points critiques', skill: SK },
  { id: 'values', label: 'évaluer les candidats', skill: SK },
  { id: 'compare', label: 'comparer', skill: SK },
];
const CHOICES = [
  { id: 'defined', label: 'Vérifier que f est définie et continue sur [a ; b]' },
  { id: 'deriv', label: 'Dériver f' },
  { id: 'crit', label: 'Résoudre f′(x) = 0' },
  { id: 'eval', label: 'Évaluer f en un candidat' },
  { id: 'compare', label: 'Comparer les valeurs des candidats' },
  { id: 'sign', label: 'Conclure avec le seul signe de f′', why: 'Le signe de f′ donne les extrema locaux ; pour les extrema globaux, on compare les valeurs de tous les candidats, bornes comprises.' },
];

const fac = (c) => (c === 0 ? 'x' : `(${lin(c)})`);
// Two factors, x first: x(x − 2), (x − 1)(x + 3).
const facs = (c1, c2) => (c2 === 0 ? `x${fac(c1)}` : `${fac(c1)}${fac(c2)}`);
// Brackets around a sum only.
const br = (t) => (/[+-]/.test(t.slice(1)) ? `(${t})` : t);
const nice = (v) => v.d <= 30 && Math.abs(v.n) <= 300;
// f(a) as text: the variable replaced by the number.
const atText = (f, a) => f.replace(/(\d)x/g, '$1×x').replace(/x/g, a < 0 ? `(${N(a)})` : N(a));
const val = (f, a) => exactValue(parse(atText(f, a)));

// The interval [a ; b] around c1, avoiding c2 and the pole.
function interval(rng, c1, avoid) {
  for (let i = 0; i < 20; i++) {
    const a = c1 - rng.int(1, 3);
    const b = c1 + rng.int(1, 3);
    if (b - a > 4) continue;
    if (avoid.some((z) => z >= a && z <= b)) continue;
    return { a, b };
  }
  return null;
}

function linData(rng) {
  const c1 = rng.int(-3, 3);
  const c2 = rng.int(-6, 6);
  if (c1 === c2 || (c1 + c2) % 2) return null;
  const r = -(c1 + c2) / 2;
  const s = -c1 * c2;
  if (r * r + s === 0) return null;
  const I = interval(rng, c1, [c2, -r]);
  if (!I) return null;
  const den = joinSum(['x', N(r)]);
  return { kind: 'lin', c1, c2, ...I, f: `${br(joinSum(['x^2', N(s)]))}/${br(den)}`, num: joinSum(['x^2', kx(2 * r), N(-s)]), A: 1, den, fp: `(${facs(c1, c2)})/${den === 'x' ? 'x^2' : `(${den})^2`}`, pole: -r };
}
function cubicData(rng) {
  const c1 = rng.int(-3, 3);
  const c2 = rng.int(-5, 5);
  if (c1 === c2 || (c1 + c2) % 2) return null;
  const p = (-3 * (c1 + c2)) / 2;
  const qq = 3 * c1 * c2;
  const e = rng.int(-5, 5);
  const I = interval(rng, c1, [c2]);
  if (!I) return null;
  return { kind: 'cubic', c1, c2, ...I, f: joinSum(['x^3', kx(p, 'x^2'), kx(qq), N(e)]), num: joinSum(['3x^2', kx(2 * p), N(qq)]), A: 3, fp: `3${facs(c1, c2)}` };
}
function quadData(rng) {
  const p = rng.int(-4, 4);
  const qq = rng.int(-4, 4);
  const r = rng.int(-3, 3);
  const s = rng.int(1, 5);
  if (r * r >= 4 * s) return null;
  const A = r - p;
  const B = 2 * (s - qq);
  const C = p * s - qq * r;
  if (!A) return null;
  const D = B * B - 4 * A * C;
  const sq = Math.round(Math.sqrt(D));
  if (D <= 0 || sq * sq !== D) return null;
  const roots = [(-B - sq) / (2 * A), (-B + sq) / (2 * A)];
  if (!roots.every(Number.isInteger) || roots.some((x) => Math.abs(x) > 4)) return null;
  const [c1, c2] = rng.shuffle(roots);
  const I = interval(rng, c1, [c2]);
  if (!I) return null;
  const den = joinSum(['x^2', kx(r), N(s)]);
  return {
    kind: 'quad', c1, c2, ...I, f: `${br(joinSum(['x^2', kx(p), N(qq)]))}/(${den})`, num: joinSum([kx(A, 'x^2'), kx(B), N(C)]), A, den,
    fp: `(${kx(A, facs(c1, c2))})/(${den})^2`, delta: { r, s, D: r * r - 4 * s },
  };
}

const FALLBACK = () => ({ kind: 'lin', c1: 1, c2: -3, a: 0, b: 3, f: '(x^2+3)/(x+1)', num: 'x^2+2x-3', A: 1, den: 'x+1', fp: '((x-1)(x+3))/(x+1)^2', pole: -1, fallback: true });

function draw(rng, kinds) {
  for (let i = 0; i < 400; i++) {
    const k = rng.pick(kinds);
    const d = k === 'lin' ? linData(rng) : k === 'cubic' ? cubicData(rng) : quadData(rng);
    if (!d) continue;
    const ys = [d.a, d.c1, d.b].map((x) => val(d.f, x));
    if (!ys.every((y) => y && nice(y))) continue;
    const [fa, fc, fb] = ys;
    if (fc.eq(fa) || fc.eq(fb)) continue;
    return { ...d, fa, fc, fb };
  }
  const d = FALLBACK();
  return { ...d, fa: val(d.f, 0), fc: val(d.f, 1), fb: val(d.f, 3) };
}

function extremes(d) {
  const pts = [{ x: d.a, y: d.fa }, { x: d.c1, y: d.fc }, { x: d.b, y: d.fb }];
  const max = pts.reduce((u, w) => (w.y.cmp(u.y) > 0 ? w : u));
  const min = pts.reduce((u, w) => (w.y.cmp(u.y) < 0 ? w : u));
  const at = (m) => pts.filter((p) => p.y.eq(m.y)).map((p) => RD(p.x)).join(' et en ');
  return { pts, max, min, atMax: at(max), atMin: at(min) };
}

const S = (d) => `[${RD(d.a)} ; ${RD(d.b)}]`;

function candidatesDecision(d) {
  const L = (xs) => xs.map((x) => RD(x)).join(', ');
  return {
    kind: 'decision', prompt: `Quels sont les candidats sur ${S(d)} ?`,
    options: [
      { id: 'all', label: `x = ${L([d.a, d.c1, d.b])}`, valid: true },
      { id: 'crit', label: `x = ${RD(d.c1)} seulement`, valid: false, rule: 'a1_extrema_bounds_forgotten', why: 'Les bornes du segment sont aussi des candidats.' },
      { id: 'out', label: `x = ${L([d.a, d.c1, d.b, d.c2].sort((u, w) => u - w))}`, valid: false, why: `${RD(d.c2)} n'est pas dans ${S(d)}.` },
      { id: 'ends', label: `x = ${L([d.a, d.b])} seulement`, valid: false, why: `f′(${RD(d.c1)}) = 0 avec ${RD(d.c1)} dans le segment : c'est un candidat.` },
    ],
  };
}

function continuityDecision(d) {
  return {
    kind: 'decision', prompt: `Pourquoi f est-elle continue sur ${S(d)} ?`,
    options: [
      { id: 'pole', label: `Le dénominateur ne s'annule qu'en ${RD(d.pole)}, hors de ${S(d)}`, valid: true },
      { id: 'rat', label: 'Une fraction rationnelle est continue sur ℝ', valid: false, why: `Elle n'est pas définie en ${RD(d.pole)}. Ici ce point est hors du segment, c'est cela qu'il faut dire.` },
      { id: 'deriv', label: 'Parce que f′ existe', valid: false, why: 'C\'est vrai mais circulaire : f′ n\'existe que là où f est définie.' },
    ],
  };
}

function extremaParts(d, level, { open = false } = {}) {
  const { max, min } = extremes(d);
  const guided = level <= 2;
  const parts = [];
  const before = [];
  if ((level >= 4 || open) && d.kind === 'quad') {
    parts.push({
      start: `${d.delta.r < 0 ? `(${d.delta.r})` : d.delta.r}^2-4×${d.delta.s}`,
      judge: { kind: 'value', form: 'irreducible' }, html: `f est-elle définie sur ${S(d)} ? Discriminant du dénominateur ${ML(d.den)} :`, ask: 'Δ =',
      lines: [E(N(d.delta.D), 'Δ < 0 : le dénominateur ne s\'annule pas', 'defined', 'defined')],
    });
  }
  if ((level >= 4 || open) && d.kind === 'lin') before.push(continuityDecision(d));
  if (level >= 2) {
    const line = E(d.fp, d.kind === 'cubic' ? 'Dériver, factoriser' : 'Règle du quotient, factoriser', 'deriv', 'deriv');
    parts.push({ start: `d(${d.f})`, judge: { kind: 'equiv', vars: ['x'], domain: { x: [d.a, d.b] }, target: 'no-prime' }, html: 'Dérive f :', lines: [level === 2 ? blanked(line, [lin(d.c1)]) : line] });
  }
  const [r1, r2] = [d.c1, d.c2].sort((u, w) => u - w);
  const roots = E(`x=${N(r1)} ou x=${N(r2)}`, 'Racines', 'crit', 'crit');
  parts.push({
    start: `${d.num}=0`, judge: { kind: 'solset', v: 'x' }, html: level === 1 ? `f′(x) = ${ML(d.fp)}. Résous f′(x) = 0 :` : 'Résous f′(x) = 0 :',
    lines: guided ? [E(`${d.kind === 'quad' ? kx(d.A, facs(d.c1, d.c2)) : d.kind === 'cubic' ? `3${facs(d.c1, d.c2)}` : facs(d.c1, d.c2)}=0`, 'Factoriser', 'crit', 'crit'), level === 1 ? blanked(roots, [N(r1), N(r2)]) : roots] : [roots],
  });
  const pre = level === 2 || level >= 4 || open ? [candidatesDecision(d)] : [{ kind: 'note', html: `Candidats : les bornes ${RD(d.a)} et ${RD(d.b)}, et ${RD(d.c1)} (${RD(d.c2)} est hors de ${S(d)}).` }];
  [d.a, d.c1, d.b].forEach((x, i) => {
    parts.push({
      start: atText(d.f, x), judge: { kind: 'value', form: 'irreducible' }, html: i === 0 ? 'Évalue f aux candidats :' : 'Candidat suivant :', ask: `f(${RD(x)}) =`,
      pre: i === 0 ? pre : [], lines: [E(N([d.fa, d.fc, d.fb][i]), 'Calculer', 'values', 'eval')],
    });
  });
  const crit = [{ x: N(d.c1), y: N(d.fc) }];
  const ends = [{ x: N(d.a), y: N(d.fa) }, { x: N(d.b), y: N(d.fb) }];
  parts.push({ start: 'M', judge: { kind: 'value', expect: N(max.y), extrema: { kind: 'max', crit, ends } }, html: `Maximum global de f sur ${S(d)} :`, ask: 'max f =', lines: [E(N(max.y), 'Comparer', 'compare', 'compare')] });
  parts.push({ start: 'm', judge: { kind: 'value', expect: N(min.y), extrema: { kind: 'min', crit, ends } }, html: `Minimum global de f sur ${S(d)} :`, ask: 'min f =', lines: [E(N(min.y), 'Comparer', 'compare', 'compare')] });
  return { parts, before };
}

function extremaLines(level, rng, opts) {
  const kinds = level === 1 ? ['lin', 'cubic'] : level === 2 ? ['lin', 'cubic', 'quad'] : ['lin', 'cubic', 'quad', 'quad'];
  const d = draw(rng, kinds);
  const open = opts.exam === 'open';
  const { parts, before } = extremaParts(d, open ? 5 : level, { open });
  const ex = extremes(d);
  const prompt = rng.chance(0.5)
    ? `Soit f(x) = ${ML(d.f)} sur ${S(d)}. Trouve ses extrema globaux.`
    : `Trouve le maximum et le minimum de f(x) = ${ML(d.f)} sur le segment ${S(d)}${open ? ' : montre d\'abord que f y est bien définie et continue' : ''}.`;
  return partsItem({
    skill: SK, level: open ? 4 : level, prompt, parts, before, choices: CHOICES,
    hints: H('Trois sortes de candidats : les bornes, les points où f′ = 0, les points où f′ n\'existe pas.', `f′(x) = ${d.fp.replace(fac(d.c1), '▢').replace(/\^2/g, '²').replace(/-/g, ' − ').replace(/\+/g, ' + ')}`, `Compare f(${RD(d.a)}) = ${RD(N(d.fa))}, f(${RD(d.c1)}) = ${RD(N(d.fc))} et f(${RD(d.b)}) = ${RD(N(d.fb))} : max ${RD(N(ex.max.y))}, min ${RD(N(ex.min.y))}.`),
    subgoals: SUB, keys: KEYS, key: `${SK}:${d.f}:${d.a}:${d.b}:${level}`,
    exam: open ? examOf(opts, 7) : false, noHints: open || level === 5, fallback: d.fallback,
    expectedSec: open ? 600 : undefined,
  });
}

// ---------- exam variants ----------

function mcqVariant(rng, opts) {
  if (rng.chance(0.25)) {
    return mcqOf({
      skill: SK, level: 4, prompt: 'f est deux fois dérivable sur ℝ et admet un minimum local en 0. Que peut-on affirmer ?',
      options: [
        { html: 'f′(0) = 0 et f″(0) ≥ 0', correct: true },
        { html: 'f′(0) = 0 et f″(0) > 0', correct: false },
        { html: 'f″(0) > 0, sans rien sur f′(0)', correct: false },
        { html: 'f′(0) = 0 et f″(0) ≤ 0', correct: false },
      ],
      key: 'mcq:local-min', expectedSec: 240, exam: examOf(opts),
      solution: [{ html: 'Un extremum local intérieur donne f′(0) = 0. Si f″(0) < 0, ce serait un maximum strict : donc f″(0) ≥ 0. Mais f″(0) peut valoir 0 (x⁴ en 0).', note: '' }],
    }, rng);
  }
  const d = draw(rng, ['lin', 'cubic', 'quad']);
  const ex = extremes(d);
  // Ask for the extremum reached at a bound: forgetting the bounds gives f(c).
  const kind = ex.max.x === d.c1 ? 'min' : 'max';
  const right = kind === 'max' ? ex.max.y : ex.min.y;
  const c2y = val(d.f, d.c2);
  const options = [
    { html: RD(N(right)), correct: true },
    { html: RD(N(d.fc)), correct: false, rule: 'a1_extrema_bounds_forgotten' },
    ...(c2y ? [{ html: RD(N(c2y)), correct: false }] : []),
    ...[d.fa, d.fb].map((y) => ({ html: RD(N(y)), correct: false })),
    { html: RD(N(right.add(1))), correct: false },
    { html: RD(N(right.neg())), correct: false },
  ];
  return mcqOf({
    skill: SK, level: 4, prompt: `Quel est le ${kind === 'max' ? 'maximum' : 'minimum'} global de f(x) = ${ML(d.f)} sur ${S(d)} ?`,
    options, key: `mcq:${d.f}:${d.a}:${d.b}`, expectedSec: 240, exam: examOf(opts),
    solution: [{ html: `f′(x) = ${ML(d.fp)} s'annule en ${RD(d.c1)} (et en ${RD(d.c2)}, hors du segment). f(${RD(d.a)}) = ${RD(N(d.fa))}, f(${RD(d.c1)}) = ${RD(N(d.fc))}, f(${RD(d.b)}) = ${RD(N(d.fb))}.`, note: '' }],
    fallback: d.fallback,
  }, rng);
}

export function extremaItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return mcqVariant(rng, opts);
  return extremaLines(level, rng, opts);
}

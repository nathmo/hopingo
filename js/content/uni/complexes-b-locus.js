// Generators of g8-locus and g8-inversion (module G8, part b, step U4):
// loci of the complex plane and their images by w = 1/z̄. Catalogue:
// G-gymnase-2.md, G8.
//
// The geom judge (complexVar) comes with step U5: a locus line is judged by
// the mode 'locus' of the poly judge (js/judges/locus.js), which compares
// the sets of points of an equation or inequality in z (or w) and in x, y.
// Final form: (x − a)² + (y − b)² = r² for a circle or a disk, a collected
// equation (2x + y + 3 = 0) for a line or a half-plane.
//
// g8-locus gabarits: (1) médiatrice |z − a| = |z − b|; (2) cercle
// d'Apollonius |z − a| = k|z − b|; (3) région: z(z̄ − p) < m·Re z + p·z̄ + c
// (a disk) or |z − a| < |z − b| (a half-plane).
// g8-inversion gabarits: (1) a line not through 0 → a circle through 0
// (privé de 0); (2) a circle through 0 → a line; (3) the image of a point.

import { Q } from '../../math/rational.js';
import { isFinal as locusFinal, parseLine as locusRead } from '../../judges/locus.js';
import { MT, linesItem, mcq, examTag } from './kit.js';
import {
  q, N, nz, modeOf, H, E, fr, ct, cp, cm, mt, cq, xMinus, ptText, blanked, partsScript, decision, uniq, vfMcq, rd, coefText, surd,
} from './complexes-b-kit.js';

const KEYS = ['calc', 'cplx', 'ineq', 'relation'];
const XYV = { vars: ['x', 'y'] };
const mxy = (t) => MT(t, XYV);
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };

// ---------- writing equations ----------

// c·x + c·y + c as text: 2x+y+3, -4y+4, 0.
export function lin([cx, cy, c0], [x, y] = ['x', 'y']) {
  let out = '';
  const add = (c, v) => {
    c = Q.of(c);
    if (c.n === 0) return;
    const a = c.n < 0 ? c.neg() : c;
    const body = v ? (a.eq(1) ? v : a.d === 1 ? `${a.n}${v}` : `(${N(a)})${v}`) : N(a);
    out += `${c.n < 0 ? '-' : '+'}${body}`;
  };
  add(cx, x);
  add(cy, y);
  add(c0, '');
  return out.replace(/^\+/, '') || '0';
}
// (x − h)², x², (x + 1/2)².
const sq = (v, h) => { h = Q.of(h); return h.n === 0 ? `${v}^2` : `(${v}${h.n > 0 ? '-' : '+'}${N(h.n > 0 ? h : h.neg())})^2`; };
const circleText = (c, r2, op = '=') => `${sq('x', c[0])}+${sq('y', c[1])}${op}${N(r2)}`;
// A line ax + by + c (op) 0 with whole coefficients, divided by their gcd.
function lineText(a, b, c, op = '=') {
  const g = [a, b, c].filter(Boolean).reduce((s, x) => gcd(s, x), 0) || 1;
  return `${lin([a / g, b / g, c / g])}${op}0`;
}
const signed = (s) => (s === '0' ? '' : s.startsWith('-') ? s : `+${s}`);
const absT = (n) => surd(n);
const dist = (v, a) => `|${xMinus(v, a)}|`;
const flipOp = (op) => ({ '<': '>', '≤': '≥', '>': '<', '≥': '≤', '=': '=' }[op]);
const locusCfg = (locus, target, extra = {}) => ({ kind: 'poly', mode: 'locus', cv: 'z', xy: ['x', 'y'], vars: ['z', 'x', 'y'], complex: true, locus, target, ...extra });

// ======================================================================
// g8-locus
// ======================================================================

const LO = 'g8-locus';
const LO_SUB = [
  { id: 'read', label: 'lecture géométrique', skill: 'g4-bisectors' },
  { id: 'square', label: 'module au carré', skill: 'g8-algebraic' },
  { id: 'expand', label: 'développer', skill: LO },
  { id: 'circle', label: 'cercle : centre et rayon', skill: 'g10-circle-eq' },
];
const LO_CHOICES = [
  { id: 'square', label: 'Poser z = x + iy et élever les modules au carré' },
  { id: 'expand', label: 'Développer et simplifier' },
  { id: 'gather', label: 'Tout passer d\'un côté' },
  { id: 'divide', label: 'Diviser par le coefficient de x²' },
  { id: 'circle', label: 'Compléter les carrés : centre et rayon' },
  { id: 'line', label: 'Écrire l\'équation de la droite' },
  { id: 'flip', label: 'Remplacer |z + a| par la distance au point +a', rule: 'g8_locus_sign', why: '|z + a| = |z − (−a)| : c\'est la distance au point −a.' },
  { id: 'nosq', label: 'Écrire |z − a| = (x − a₁) + (y − a₂), sans carrés', rule: 'g8_modulus_no_square', why: 'Le module est une longueur : |z − a|² = (x − a₁)² + (y − a₂)² (Pythagore).' },
];

// Médiatrice or half-plane: |z − a| (op) |z − b|.
function bisectorData(rng) {
  for (let k = 0; k < 200; k++) {
    const a = cq(rng.int(-5, 5), rng.int(-5, 5));
    const b = cq(rng.int(-5, 5), rng.int(-5, 5));
    if (a.eq(b) || (a.re.n !== 0 && a.im.n !== 0 && b.re.n !== 0 && b.im.n !== 0)) continue;
    const [a1, a2, b1, b2] = [a.re.n, a.im.n, b.re.n, b.im.n];
    const D = 2 * (b1 - a1);
    const E2 = 2 * (b2 - a2);
    const F = a1 * a1 + a2 * a2 - b1 * b1 - b2 * b2;
    const g = [D, E2, F].filter(Boolean).reduce((s, x) => gcd(s, x), 0);
    const s = D < 0 || (D === 0 && E2 < 0) ? -1 : 1;
    const co = [D, E2, F].map((x) => (s * x) / g);
    if (co.some((x) => Math.abs(x) > 30)) continue;
    return { a, b, a1, a2, b1, b2, co, s };
  }
  const a = cq(0, 2);
  const b = cq(-4, 0);
  return { a, b, a1: 0, a2: 2, b1: -4, b2: 0, co: [2, 1, 3], s: 1, fallback: true };
}

function bisectorItem(level, rng, opts, region) {
  const d = bisectorData(rng);
  const op0 = region ? rng.pick(['<', '≤']) : '=';
  // |z − a|² − |z − b|² = s·g·(co·(x, y, 1)): the final relation keeps op when s > 0.
  const opF = d.s > 0 ? op0 : flipOp(op0);
  const sqA = `${sq('x', d.a1)}+${sq('y', d.a2)}`;
  const sqB = `${sq('x', d.b1)}+${sq('y', d.b2)}`;
  const left = lin([-2 * d.a1, -2 * d.a2, d.a1 * d.a1 + d.a2 * d.a2]);
  const right = lin([-2 * d.b1, -2 * d.b2, d.b1 * d.b1 + d.b2 * d.b2]);
  const final = `${lin(d.co)}${opF}0`;
  const lines = [E(`${sqA}${op0}${sqB}`, 'Module au carré (les deux côtés sont positifs)', 'square', 'square')];
  const cfg = locusCfg({ kind: 'line', a: d.co[0], b: d.co[1], c: d.co[2] }, 'line');
  const developed = `${left}${op0}${right}`;
  // The developed line may already be final (|z| = |z − b|): then it is the last one.
  const devFinal = locusFinal(cfg, locusRead(cfg, developed)) !== false;
  if (level <= 3 && !devFinal) lines.push(E(developed, 'Développer : x² et y² disparaissent', 'expand', 'expand'));
  lines.push(E(final, region ? 'Inéquation du demi-plan' : 'Équation de la droite', 'expand', 'line'));
  if (level === 1) lines[0] = blanked(lines[0], [String(Math.abs(d.a1)), String(Math.abs(d.a2)), String(Math.abs(d.b1)), String(Math.abs(d.b2))].filter((t) => t !== '0').slice(0, 2), XYV);
  if (level === 2 && !devFinal) lines[1] = blanked(lines[1], [left], XYV);
  const start = `${dist('z', d.a)}${op0}${dist('z', d.b)}`;
  const A = `A${ptText(d.a)}`;
  const B = `B${ptText(d.b)}`;
  const pre = [];
  if (level <= 3) {
    const bb = d.b.neg();
    pre.push(decision(`Que décrit ${rd(`${dist('z', d.a)}=${dist('z', d.b)}`)} ?`, [
      { id: 'med', label: `La médiatrice de [AB], avec ${A} et ${B}`, valid: true },
      ...(d.b.isZero() ? [] : [{ id: 'flip', label: `La médiatrice de [AB′], avec ${A} et B′${ptText(bb)}`, valid: false, rule: 'g8_locus_sign', why: `${rd(dist('z', d.b))} est la distance au point ${ptText(d.b)}.` }]),
      { id: 'circle', label: 'Le cercle de centre A passant par B', valid: false, why: 'Les deux côtés sont des distances à deux points différents : on cherche les points à égale distance de A et de B.' },
      { id: 'ab', label: 'La droite (AB)', valid: false, why: 'Seul le milieu de [AB] est sur (AB) à égale distance de A et B.' },
    ]));
  }
  const { start: s0, judge, script } = partsScript([{ start, judge: cfg, lines, pre }], level, LO_CHOICES);
  const side = region ? ` C'est le demi-plan des points plus proches de A que de B${op0 === '≤' ? ', bord compris' : ''}.` : '';
  return linesItem({
    skill: LO, level, mode: modeOf(level), start: s0, judge, script,
    prompt: `Pose z = x + iy et trouve ${region ? 'l\'inéquation' : 'l\'équation'} en x et y du lieu des points z tels que ${mt(start)}.`,
    hints: H(`${mt(dist('z', d.a))} est la distance de z au point ${A}. Élève au carré : |z − a|² = (x − a₁)² + (y − a₂)².`,
      `${mxy(`${sqA}${op0}${sqB}`)}, puis développe : x² et y² disparaissent.`,
      `${mxy(final)}.${side}`),
    subgoals: LO_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    declares: { vars: ['z', 'x', 'y'], complex: true }, baits: ['g8_locus_sign', ...(level === 3 ? ['g8_modulus_no_square'] : [])],
    key: `${LO}:${level}:bis:${start}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// Apollonius: |z − a| = k|z − b|, centre (k²b − a)/(k² − 1) with whole parts.
function apolloData(rng) {
  for (let i = 0; i < 200; i++) {
    const k = rng.chance(0.8) ? 2 : 3;
    const m = k * k - 1;
    const b = cq(rng.int(-4, 4), rng.int(-4, 4));
    const a = cq(b.re.n + m * rng.int(-1, 1), b.im.n + m * rng.int(-1, 1));
    if (a.eq(b) || Math.abs(a.re.n) > 6 || Math.abs(a.im.n) > 6) continue;
    const c = b.mul(k * k).sub(a).div(m);
    const r2 = a.sub(b).abs2().mul(k * k).div(m * m);
    if (r2.valueOf() > 80) continue;
    return { k, m, a, b, c: [c.re, c.im], r2 };
  }
  return { k: 2, m: 3, a: cq(1), b: cq(-2, 3), c: [q(-3), q(4)], r2: q(8), fallback: true };
}

function apolloItem(level, rng, opts) {
  const d = apolloData(rng);
  const [a1, a2, b1, b2] = [d.a.re.n, d.a.im.n, d.b.re.n, d.b.im.n];
  const K = d.k * d.k;
  const start = `${dist('z', d.a)}=${d.k}×${dist('z', d.b)}`;
  const sqA = `${sq('x', a1)}+${sq('y', a2)}`;
  const sqB = `${sq('x', b1)}+${sq('y', b2)}`;
  const Dx = 2 * a1 - 2 * K * b1;
  const Ey = 2 * a2 - 2 * K * b2;
  const F0 = K * (b1 * b1 + b2 * b2) - (a1 * a1 + a2 * a2);
  const gathered = `${d.m}x^2+${d.m}y^2${signed(lin([Dx, Ey, F0]))}=0`;
  const divided = `x^2+y^2${signed(lin([q(Dx, d.m), q(Ey, d.m), q(F0, d.m)]))}=0`;
  const final = circleText(d.c, d.r2);
  const lines = [
    E(`${sqA}=${K}(${sqB})`, 'Module au carré', 'square', 'square'),
    E(`x^2+y^2${signed(lin([-2 * a1, -2 * a2, a1 * a1 + a2 * a2]))}=${K}x^2+${K}y^2${signed(lin([-2 * K * b1, -2 * K * b2, K * (b1 * b1 + b2 * b2)]))}`, 'Développer', 'expand', 'expand'),
    E(gathered, 'Tout regrouper d\'un côté', 'expand', 'gather'),
    E(divided, `Diviser par ${d.m}`, 'circle', 'divide'),
    E(final, 'Compléter les carrés', 'circle', 'circle'),
  ];
  if (level >= 4) { lines.splice(1, 2); lines[1] = { ...lines[1], note: `Développer, tout regrouper d'un côté, diviser par ${d.m}` }; }
  if (level === 1) lines[4] = blanked(lines[4], [N(d.r2)], XYV);
  if (level === 2) lines[3] = blanked(lines[3], [String(d.m)], XYV);
  const pre = level <= 3 ? [decision(`Que décrit ${rd(start)} (k = ${d.k}) ?`, [
    { id: 'circle', label: 'Un cercle : k ≠ 1 (cercle d\'Apollonius)', valid: true },
    { id: 'med', label: 'La médiatrice de [AB]', valid: false, why: `Avec le facteur ${d.k}, les distances ne sont pas égales : ce n'est une médiatrice que pour k = 1.` },
    { id: 'line', label: 'Une droite', valid: false, why: `Les termes en x² ne se simplifient pas (1 ≠ ${K}) : c'est un cercle.` },
  ])] : [];
  const { start: s0, judge, script } = partsScript([{ start, judge: locusCfg({ kind: 'circle', c: d.c.map(Number), r2: Number(d.r2) }, 'circle'), lines, pre }], level, LO_CHOICES);
  return linesItem({
    skill: LO, level, mode: modeOf(level), start: s0, judge, script,
    prompt: `Pose z = x + iy et trouve l'équation du lieu des points z tels que ${mt(start)}. Donne-la sous la forme (x − a)² + (y − b)² = r².`,
    hints: H('Élève au carré : |z − a|² = (x − a₁)² + (y − a₂)², et le facteur k devient k². Puis tout d\'un côté, et complète les carrés.',
      `${mxy(`${sqA}=${K}(${sqB})`)}, puis ${mxy(divided)}.`,
      `${mxy(final)} : cercle de centre ${fr(`(${N(d.c[0])} ; ${N(d.c[1])})`)} et de rayon ${fr(absT(Number(d.r2)))}.`),
    subgoals: LO_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    declares: { vars: ['z', 'x', 'y'], complex: true }, baits: ['g8_locus_sign', ...(level === 3 ? ['g8_modulus_no_square'] : [])],
    key: `${LO}:${level}:apo:${start}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// Disk (CMS série 16): z(z̄ − p) < m·Re(z) + p·z̄ + c, or with Im.
function diskData(rng) {
  for (let i = 0; i < 200; i++) {
    const p = rng.int(1, 3);
    const m = rng.int(-6, 6);
    const c = rng.int(1, 12);
    if ((2 * p + m) % 2 || 2 * p + m === 0) continue;
    const h = (2 * p + m) / 2;
    const R = c + h * h;
    if (R > 60) continue;
    return { p, m, c, h, R, im: rng.chance(0.4), op: rng.pick(['<', '≤', '>']) };
  }
  return { p: 3, m: 6, c: 5, h: 6, R: 41, im: false, op: '<', fallback: true };
}

function diskItem(level, rng, opts) {
  const d = diskData(rng);
  const mTerm = (fn) => (d.m === 0 ? '' : `${d.m === 1 ? '' : d.m === -1 ? '-' : d.m}${fn}(z)`);
  const P = d.p === 1 ? '' : d.p;
  const start = d.im
    ? `z(conj(z)+${P}i)${d.op}${mTerm('Im')}${d.m === 0 ? '' : '+'}${P}i×conj(z)+${d.c}`.replace('+-', '-')
    : `z(conj(z)-${d.p})${d.op}${mTerm('Re')}${d.m === 0 ? '' : '+'}${P}conj(z)+${d.c}`.replace('+-', '-');
  const k = 2 * d.p + d.m;
  const center = d.im ? [0, d.h] : [d.h, 0];
  const mv = d.m === 0 ? '' : `${lin(d.im ? [0, d.m, 0] : [d.m, 0, 0])}+`;
  const line1 = d.im
    ? `x^2+y^2+${P}i(x+iy)${d.op}${mv}${P}i(x-iy)+${d.c}`
    : `x^2+y^2-${P}(x+iy)${d.op}${mv}${P}(x-iy)+${d.c}`;
  const line2 = `x^2+y^2${signed(lin(d.im ? [0, -k, -d.c] : [-k, 0, -d.c]))}${d.op}0`;
  const final = circleText(center, d.R, d.op);
  const lines = [
    E(line1, 'z·z̄ = x² + y², z = x + iy, z̄ = x − iy', 'square', 'square'),
    E(line2, 'Développer : les parties imaginaires s\'annulent', 'expand', 'expand'),
    E(final, 'Compléter le carré', 'circle', 'circle'),
  ];
  if (level >= 4) lines.shift();
  if (level === 1) lines[2] = blanked(lines[2], [String(d.R)], XYV);
  if (level === 2) lines[1] = blanked(lines[1], [String(Math.abs(k))], XYV);
  const where = { '<': 'l\'intérieur (bord exclu) du disque', '≤': 'le disque fermé (bord compris)', '>': 'l\'extérieur du disque' }[d.op];
  const pre = level <= 3 ? [decision('Avec z = x + iy, que vaut z·z̄ ?', [
    { id: 'mod', label: 'x² + y² = |z|²', valid: true },
    { id: 'diff', label: 'x² − y²', valid: false, why: '(x + iy)(x − iy) = x² − (iy)² = x² + y².' },
    { id: 'two', label: 'x² + 2ixy − y²', valid: false, why: 'C\'est z², pas z·z̄.' },
  ])] : [];
  const { start: s0, judge, script } = partsScript([{ start, judge: locusCfg({ kind: 'circle', c: center, r2: d.R }, 'circle'), lines, pre }], level, LO_CHOICES);
  return linesItem({
    skill: LO, level, mode: modeOf(level), start: s0, judge, script,
    prompt: `Pose z = x + iy et décris la région des points z tels que ${mt(start)} : écris-la sous la forme (x − a)² + (y − b)² ${fr(d.op)} r².`,
    hints: H('Remplace z par x + iy et z̄ par x − iy : z·z̄ = x² + y², et les parties imaginaires des deux côtés s\'annulent.',
      `${mxy(line2)}, puis complète le carré.`,
      `${mxy(final)} : ${where} de centre ${fr(`(${center[0]} ; ${center[1]})`)} et de rayon ${fr(absT(d.R))}.`),
    subgoals: LO_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    declares: { vars: ['z', 'x', 'y'], complex: true }, baits: level === 3 ? ['g8_modulus_no_square'] : [],
    key: `${LO}:${level}:disk:${start}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

function locusMcq(rng, opts) {
  const d = bisectorData(rng);
  const start = `${dist('z', d.a)}=${dist('z', d.b)}`;
  const eq = (a, b) => { // médiatrice of [a, b] as text
    const [a1, a2, b1, b2] = [a.re.n, a.im.n, b.re.n, b.im.n];
    const D = 2 * (b1 - a1);
    const E2 = 2 * (b2 - a2);
    const F = a1 * a1 + a2 * a2 - b1 * b1 - b2 * b2;
    const s = D < 0 || (D === 0 && E2 < 0) ? -1 : 1;
    return lineText(s * D, s * E2, s * F);
  };
  // The line (AB): (b2 − a2)x − (b1 − a1)y + … = 0.
  const ab = (() => {
    const A = d.b2 - d.a2;
    const B = -(d.b1 - d.a1);
    const C = -(A * d.a1 + B * d.a2);
    const s = A < 0 || (A === 0 && B < 0) ? -1 : 1;
    return lineText(s * A, s * B, s * C);
  })();
  const options = uniq([
    { html: mxy(eq(d.a, d.b)), correct: true },
    { html: mxy(eq(d.a, d.b.neg())), correct: false, rule: 'g8_locus_sign' },
    { html: mxy(eq(d.a.neg(), d.b)), correct: false, rule: 'g8_locus_sign' },
    { html: mxy(ab), correct: false },
  ]);
  return mcq({
    skill: LO, level: 4, prompt: `Quel est le lieu des points z = x + iy tels que ${mt(start)} ?`, options,
    key: `${LO}:mcq:${start}`, exam: examTag(opts), fallback: !!d.fallback,
    solution: [{ html: `C'est la médiatrice de [AB], A${ptText(d.a)}, B${ptText(d.b)} : ${mxy(eq(d.a, d.b))}.`, note: '' }],
  }, rng);
}

function locusTf(rng) {
  const a = rng.int(1, 4);
  const k = rng.pick([2, 3]);
  const r = rng.int(1, 5);
  const all = [
    { s: `|z − ${a}| = ${k}|z + ${a}| est une droite.`, t: false, why: `Faux : k = ${k} ≠ 1, les termes en x² ne s'annulent pas : c'est un cercle (d'Apollonius).` },
    { s: `|z − ${a}i| = |z + ${a}| est la médiatrice du segment d'extrémités ${a}i et −${a}.`, t: true, why: 'Vrai : |z − u| est la distance au point d\'affixe u ; on cherche les points à égale distance des deux.' },
    { s: `|z + ${a}| = ${r} est le cercle de centre ${a} et de rayon ${r}.`, t: false, rule: 'g8_locus_sign', why: `Faux : |z + ${a}| = |z − (−${a})|, le centre est −${a}.` },
    { s: `z·z̄ = ${r * r} est le cercle de centre 0 et de rayon ${r}.`, t: true, why: `Vrai : z·z̄ = |z|² = x² + y² = ${r * r}.` },
    { s: `|z − ${a}i| < |z + ${a}i| est le demi-plan Im(z) > 0.`, t: true, why: `Vrai : les points plus proches de ${a}i que de −${a}i sont au-dessus de l'axe réel (y > 0).` },
  ];
  const i = rng.int(0, all.length - 1);
  return vfMcq(LO, all[i].s, all[i].t, rng, { key: `${i}:${a}:${k}:${r}`, why: all[i].why, ruleIfTrue: all[i].rule || null });
}

export function genLocus(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return locusMcq(rng, opts);
  if (opts.exam === 'tf') return locusTf(rng);
  if (opts.exam === 'open') return { ...genLocus(4, rng, profile), exam: { format: 'open', points: 3 } };
  if (level === 1) return rng.chance(0.7) ? bisectorItem(level, rng, opts, false) : apolloItem(level, rng, opts);
  if (level === 5) return rng.chance(0.5) ? diskItem(level, rng, opts) : apolloItem(level, rng, opts);
  return rng.pick([() => bisectorItem(level, rng, opts, false), () => apolloItem(level, rng, opts), () => diskItem(level, rng, opts), () => bisectorItem(level, rng, opts, true)])();
}

// ======================================================================
// g8-inversion
// ======================================================================

const IN = 'g8-inversion';
const IN_SUB = [
  { id: 'express', label: 'exprimer z en w', skill: IN },
  { id: 'replace', label: 'remplacer dans le lieu', skill: 'g8-locus' },
  { id: 'clear', label: 'multiplier par |w|²', skill: IN },
  { id: 'circle', label: 'reconnaître le cercle', skill: 'g10-circle-eq' },
];
const IN_CHOICES = [
  { id: 'replace', label: 'Remplacer z par 1/w̄ = w/|w|² (w = x + iy)' },
  { id: 'clear', label: 'Multiplier par |w|² = x² + y² (w ≠ 0)' },
  { id: 'square', label: 'Élever les modules au carré' },
  { id: 'expand', label: 'Développer et simplifier' },
  { id: 'circle', label: 'Compléter les carrés : centre et rayon' },
  { id: 'line', label: 'Écrire l\'équation de la droite' },
  { id: 'nobar', label: 'Remplacer z par 1/w', rule: 'g8_inversion_conj', why: 'w = 1/z̄ donne z = 1/w̄, pas 1/w.' },
];
const invCfg = (locus, target) => ({ ...locusCfg(locus, target, { cv: 'w', vars: ['w', 'x', 'y'], inversion: true, exclude: [[0, 0]] }) });
const K_LIST = [q(1), q(-1), q(2), q(-2), q(1, 2), q(-1, 2)];

// A line a·Re z + b·Im z = c (c ≠ 0): image c(x² + y²) = ax + by.
function lineData(rng, { asym = false } = {}) {
  for (let i = 0; i < 200; i++) {
    const kind = rng.pick(asym ? ['Im', 'gen'] : ['Re', 'Im', 'gen', 'Im']);
    let a;
    let b;
    let c;
    if (kind === 'gen') { a = q(nz(rng, -2, 2)); b = q(nz(rng, -2, 2)); c = q(nz(rng, -2, 2)); } else { a = q(kind === 'Re' ? 1 : 0); b = q(kind === 'Im' ? 1 : 0); c = rng.pick(K_LIST); }
    const center = [a.div(c.mul(2)), b.div(c.mul(2))];
    const r2 = a.mul(a).add(b.mul(b)).div(c.mul(c).mul(4));
    return { kind, a, b, c, center, r2 };
  }
  return null;
}

function lineItem(level, rng, opts) {
  const d = lineData(rng, { asym: level <= 3 });
  const Z = '1/conj(w)';
  const term = (k, fn) => (k.n === 0 ? '' : `${k.eq(1) ? '' : k.eq(-1) ? '-' : N(k)}${fn}(${Z})`);
  const startZ = d.kind === 'Re' ? `Re(z)=${N(d.c)}` : d.kind === 'Im' ? `Im(z)=${N(d.c)}` : `${lin([d.a, d.b, 0], ['Re(z)', 'Im(z)'])}=${N(d.c)}`;
  const start = d.kind === 'Re' ? `Re(${Z})=${N(d.c)}` : d.kind === 'Im' ? `Im(${Z})=${N(d.c)}` : `${term(d.a, 'Re')}${d.b.n > 0 ? '+' : ''}${term(d.b, 'Im')}=${N(d.c)}`;
  const num = lin([d.a, d.b, 0]);
  const line1 = `${d.kind === 'gen' ? `(${num})` : num}/(x^2+y^2)=${N(d.c)}`;
  const line2 = `${num}=${coefText(d.c, '(x^2+y^2)').replace(/^\((x\^2\+y\^2)\)$/, '$1')}`;
  const final = circleText(d.center, d.r2);
  const lines = [
    E(line1, d.kind === 'Re' ? 'Re z = Re(w)/|w|²' : d.kind === 'Im' ? 'Im z = Im(w)/|w|²' : 'Re z = x/|w|², Im z = y/|w|²', 'replace', 'replace'),
    E(line2, 'Multiplier par |w|² (w ≠ 0)', 'clear', 'clear'),
    { kind: 'decision', prompt: 'Le point w = 0 est-il dans l\'image ?', options: [
      { id: 'no', label: 'Non : w = 1/z̄ n\'est jamais nul ; on retire 0 du cercle', valid: true },
      { id: 'yes', label: 'Oui : il vérifie l\'équation', valid: false, why: 'w = 1/z̄ ne vaut jamais 0 : le cercle passe par 0, mais 0 n\'est l\'image d\'aucun point. On le retire.' },
    ] },
    E(final, 'Compléter les carrés', 'circle', 'circle'),
  ];
  if (level >= 4) lines.splice(1, 1);
  if (level === 1) lines[0] = blanked(lines[0], ['x^2+y^2'], XYV);
  if (level === 2) lines[3] = blanked(lines[3], [N(d.r2)], XYV);
  const pre = level === 2 || level === 3 ? [decision('Avant le calcul : la droite ne passe pas par 0. Son image par w = 1/z̄ est…', [
    { id: 'circle', label: 'un cercle qui passe par 0 (privé de 0)', valid: true },
    { id: 'line', label: 'une droite', valid: false, why: 'Seules les droites qui passent par 0 restent des droites.' },
    { id: 'circle2', label: 'un cercle qui ne passe pas par 0', valid: false, why: 'Les points très loin sur la droite ont une image proche de 0 : le cercle passe par 0.' },
  ])] : [];
  const { start: s0, judge, script } = partsScript([{ start, judge: invCfg({ kind: 'circle', c: d.center.map(Number), r2: Number(d.r2) }, 'circle'), lines, pre }], level, IN_CHOICES);
  return linesItem({
    skill: IN, level, mode: modeOf(level), start: s0, judge, script,
    prompt: `Trouve l'image de la droite ${mt(startZ)} par w = 1/z̄. On pose w = x + iy ; comme z = 1/w̄ = w/|w|², la droite s'écrit ${mt(start)}.${level === 1 ? ' Re(1/w̄) = x/(x² + y²), Im(1/w̄) = y/(x² + y²).' : ''}`,
    hints: H('Exprime z en w : z = 1/w̄ = w/|w|². Remplace, puis multiplie par |w|² = x² + y².',
      `${mxy(line1)}, donc ${mxy(line2)}.`,
      `${mxy(final)} : cercle privé de 0.`),
    subgoals: IN_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    declares: { vars: ['w', 'x', 'y'], complex: true }, baits: d.kind === 'Re' ? [] : ['g8_inversion_conj'],
    key: `${IN}:${level}:line:${start}`, exam: examTag(opts), fallback: false,
  });
}

// A circle through 0, |z − c| = |c|: image 2(c₁x + c₂y) = 1.
function circleItem(level, rng, opts) {
  let c = cq(rng.int(-3, 3), rng.int(-3, 3));
  if (c.isZero()) c = cq(1, 2);
  const [c1, c2] = [c.re.n, c.im.n];
  const n = c1 * c1 + c2 * c2;
  const Z = '1/conj(w)';
  const startZ = `${dist('z', c)}=${absT(n)}`;
  const start = `|${Z}-${cp(c)}|=${absT(n)}`;
  const line1 = `|1-${coefText(c, 'conj(w)', '×')}|=${n === 1 ? '' : `${absT(n)}×`}|w|`;
  const re = lin([-c1, -c2, 1]);
  const im = lin([c2, -c1, 0]);
  const line2 = `(${re})^2+(${im})^2=${n === 1 ? '' : n}(x^2+y^2)`;
  const final = `${lin([2 * c1, 2 * c2, 0])}=1`;
  const lines = [
    E(line1, 'Multiplier par |w̄| = |w|', 'clear', 'clear'),
    E(line2, `1 − c·w̄ = (${rd(re)}) − i(${rd(lin([c2, -c1, 0]))}) ; module au carré`, 'replace', 'square'),
    E(final, 'Développer : x² et y² disparaissent', 'clear', 'line'),
  ];
  if (level >= 4) lines.splice(1, 1);
  if (level === 1) lines[1] = blanked(lines[1], [String(n)].filter((t) => t !== '1'), XYV);
  if (level === 2) lines[2] = blanked(lines[2], [lin([2 * c1, 2 * c2, 0])], XYV);
  const pre = level === 2 || level === 3 ? [decision('Le cercle passe par 0. Son image par w = 1/z̄ est…', [
    { id: 'line', label: 'une droite (qui ne passe pas par 0)', valid: true },
    { id: 'circle', label: 'un cercle qui passe par 0', valid: false, why: 'Le point 0 du cercle part à l\'infini : l\'image est une droite.' },
    { id: 'circle2', label: 'un cercle qui ne passe pas par 0', valid: false, why: 'Le point 0 du cercle part à l\'infini : l\'image n\'est pas bornée, c\'est une droite.' },
  ])] : [];
  const { start: s0, judge, script } = partsScript([{ start, judge: invCfg({ kind: 'line', a: 2 * c1, b: 2 * c2, c: -1 }, 'line'), lines, pre }], level, IN_CHOICES);
  return linesItem({
    skill: IN, level, mode: modeOf(level), start: s0, judge, script,
    prompt: `Trouve l'image du cercle ${mt(startZ)} (il passe par 0) par w = 1/z̄. On pose w = x + iy ; avec z = 1/w̄, le cercle s'écrit ${mt(start)}.`,
    hints: H('Multiplie par |w̄| = |w| pour enlever la fraction, puis élève au carré avec w = x + iy.',
      `${mt(line1)}, puis ${mxy(line2)}.`,
      `${mxy(final)} : une droite.`),
    subgoals: IN_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    declares: { vars: ['w', 'x', 'y'], complex: true }, baits: c2 === 0 ? [] : ['g8_inversion_conj'],
    key: `${IN}:${level}:circle:${start}`, exam: examTag(opts), fallback: false,
  });
}

// The image of a point: w = 1/z̄ = z/|z|².
function pointItem(level, rng, opts) {
  const z = cq(nz(rng, -3, 3), nz(rng, -3, 3));
  const n = z.abs2().n;
  const zb = z.conj();
  const w = z.div(n);
  const lines = [
    E(`1/(${ct(zb)})`, 'Conjugué', 'express', 'replace'),
    E(`(${ct(z)})/((${ct(zb)})(${ct(z)}))`, 'Multiplier par le conjugué du dénominateur', 'express', 'clear'),
    E(`(${ct(z)})/${n}`, `z·z̄ = |z|² = ${n}`, 'express', 'clear'),
    E(ct(w), 'Forme algébrique', 'express', 'expand'),
  ];
  if (level >= 4) lines.splice(1, 2);
  if (level === 1) lines[2] = blanked(lines[2], [String(n)]);
  if (level === 2) lines[3] = blanked(lines[3], [N(w.re)]);
  const judge = { kind: 'complex', form: 'algebraic', complex: true };
  const { start: s0, judge: j, script } = partsScript([{ start: `1/conj(${ct(z)})`, judge, lines }], level, [
    { id: 'replace', label: 'Écrire le conjugué de z' }, { id: 'clear', label: 'Multiplier en haut et en bas par le conjugué' },
    { id: 'expand', label: 'Écrire a + bi' }, { id: 'nobar', label: 'Calculer 1/z', rule: 'g8_inversion_conj', why: 'w = 1/z̄, pas 1/z.' },
  ]);
  return linesItem({
    skill: IN, level, mode: modeOf(level), start: s0, judge: j, script,
    prompt: `Calcule l'image w = 1/z̄ du point z = ${cm(z)}, sous forme algébrique.`,
    hints: H('1/z̄ = z/(z·z̄) = z/|z|² : même argument que z, module inversé.', `w = ${mt(`(${ct(z)})/${n}`)} = □`, `w = ${cm(w)}`),
    subgoals: IN_SUB, keys: ['calc', 'cplx'], tapActions: level === 3 ? 'steps' : null,
    declares: { vars: [], complex: true }, baits: [],
    key: `${IN}:${level}:point:${ct(z)}`, exam: examTag(opts), fallback: false,
  });
}

function inversionMcq(rng, opts) {
  const d = lineData(rng, { asym: true });
  const startZ = d.kind === 'Im' ? `Im(z)=${N(d.c)}` : `${lin([d.a, d.b, 0], ['Re(z)', 'Im(z)'])}=${N(d.c)}`;
  const options = uniq([
    { html: mxy(circleText(d.center, d.r2)), correct: true },
    { html: mxy(circleText([d.center[0], d.center[1].neg()], d.r2)), correct: false, rule: 'g8_inversion_conj' },
    { html: mxy(circleText([d.center[0].mul(2), d.center[1].mul(2)], d.r2.mul(4))), correct: false },
    { html: mxy(`${lin([d.a, d.b, 0])}=${N(new Q(1).div(d.c))}`), correct: false },
  ]);
  return mcq({
    skill: IN, level: 4, prompt: `Quelle est l'image de la droite ${mt(startZ)} par w = 1/z̄ (w = x + iy, privée de 0) ?`, options,
    key: `${IN}:mcq:${startZ}`, exam: examTag(opts),
    solution: [{ html: `z = 1/w̄ = w/|w|², donc ${mxy(`${lin([d.a, d.b, 0])}=${coefText(d.c, '(x^2+y^2)')}`)} : ${mxy(circleText(d.center, d.r2))}.`, note: '' }],
  }, rng);
}

export function genInversion(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return inversionMcq(rng, opts);
  if (opts.exam === 'open') return { ...(rng.chance(0.5) ? lineItem(4, rng, {}) : circleItem(4, rng, {})), exam: { format: 'open', points: 4 } };
  if (level === 5) return circleItem(level, rng, opts);
  if (level <= 3 && rng.chance(0.2)) return pointItem(level, rng, opts);
  return rng.chance(0.65) ? lineItem(level, rng, opts) : circleItem(level, rng, opts);
}

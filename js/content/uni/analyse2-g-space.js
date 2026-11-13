// a2-cyl-sph (module A2, part g, step U6): triple integrals in cylindrical
// and spherical coordinates. Catalogue docs/universite/A2-analyse-2.md,
// entry `a2-cyl-sph`. Spherical coordinates (r, θ, φ), θ measured from the
// z-axis: x = r sin θ cos φ, y = r sin θ sin φ, z = r cos θ, dV = r² sin θ.
//
// Parts: the bounds (judge `domain`, coords 'sph' or 'cyl'), the integrand
// with its jacobian (`equiv` with cfg.jac), the value (`definite`: the
// iterated integral, separated or integrated in z first, the brackets, the
// number). Level 5 and the exam QCM: « the integral equals » with four
// iterated integrals; the exam V/F: statements on the coordinates.

import { MT, linesItem, mcq, examTag, A2_KEYS, H, E, modeOf, partsScript, tpl } from './a2-kit.js';
import {
  q, cn, cmul, cscale, cfloat, ctext, czero, closedOk, angInt, piText, powInt, fr, prod, rk, trig,
  jacJudge, domJudge, defKnown, blankChain, jacBlank, vfItem, integrandML, polyText, polyMul, polyPrim, polyInt0,
} from './analyse2-g-kit.js';
import { angPrim } from './analyse2-g-polar.js';
import { t } from '../../i18n.js';

const SK = 'a2-cyl-sph';
const SV = { vars: ['r', 'θ', 'φ'] };
const CV = { vars: ['r', 'φ', 'z'] };
const XYZ = { vars: ['x', 'y', 'z'] };

// ---------- spherical ----------
// f = r^k·cos^i θ·sin^j θ once multiplied by r² sin θ.
export const SPH_F = [
  { id: 'one', cart: '1', sub: '1', k: 2, i: 0, j: 1 },
  { id: 'z', cart: 'z', sub: 'r×cos(θ)', k: 3, i: 1, j: 1 },
  { id: 'z2', cart: 'z^2', sub: '(r×cos(θ))^2', k: 4, i: 2, j: 1 },
  { id: 'inv', cart: '1/√(x^2+y^2+z^2)', sub: '1/r', k: 1, i: 0, j: 1 },
  { id: 'r2', cart: 'x^2+y^2+z^2', sub: 'r^2', k: 4, i: 0, j: 1 },
  { id: 'rho2', cart: 'x^2+y^2', sub: '(r×sin(θ))^2', k: 4, i: 0, j: 3 },
  { id: 'r1', cart: '√(x^2+y^2+z^2)', sub: 'r', k: 3, i: 0, j: 1 },
];
// θ from tθ[0]·π to tθ[1]·π, φ from p[0]·π to p[1]·π.
export const SPH_D = [
  { id: 'ball', t: [q(0), q(1)], p: [q(0), q(2)], cond: [], name: 'boule' },
  { id: 'up', t: [q(0), q(1, 2)], p: [q(0), q(2)], cond: ['z ≥ 0'], name: 'demi-boule' },
  { id: 'down', t: [q(1, 2), q(1)], p: [q(0), q(2)], cond: ['z ≤ 0'], name: 'demi-boule' },
  { id: 'cone', t: [q(0), q(1, 4)], p: [q(0), q(2)], cond: ['z ≥ √(x^2+y^2)'], name: 'cornet' },
  { id: 'outcone', t: [q(1, 4), q(1, 2)], p: [q(0), q(2)], cond: ['0 ≤ z ≤ √(x^2+y^2)'], name: 'hors du cône' },
  { id: 'oct', t: [q(0), q(1, 2)], p: [q(0), q(1, 2)], cond: ['x ≥ 0', 'y ≥ 0', 'z ≥ 0'], name: 'octant' },
  { id: 'conequart', t: [q(0), q(1, 4)], p: [q(0), q(1, 2)], cond: ['x ≥ 0', 'y ≥ 0', 'z ≥ √(x^2+y^2)'], name: 'cornet, octant' },
];
const SPH_R = [[0, 1], [0, 2], [0, 3], [1, 2]];

export const sphF = (f) => prod(rk(f.k), trig('cos', f.i, 'θ'), trig('sin', f.j, 'θ'));
const sq = (R) => String(R * R);
export const sphRegion = (d) => [d.R1 ? `${sq(d.R1)} ≤ x^2+y^2+z^2 ≤ ${sq(d.R2)}` : `x^2+y^2+z^2 ≤ ${sq(d.R2)}`, ...d.dom.cond];
export const sphLine = (d) => `${d.R1} ≤ r ≤ ${d.R2} ; ${piText(d.dom.t[0])} ≤ θ ≤ ${piText(d.dom.t[1])} ; ${piText(d.dom.p[0])} ≤ φ ≤ ${piText(d.dom.p[1])}`;
// Box around the region: points of the spherical boundary.
function sphBox(d) {
  const P = [[0, 0, 0]];
  for (let a = 0; a <= 16; a++) {
    for (let b = 0; b <= 16; b++) {
      const th = Math.PI * (d.dom.t[0].valueOf() + ((d.dom.t[1].valueOf() - d.dom.t[0].valueOf()) * a) / 16);
      const p = Math.PI * (d.dom.p[0].valueOf() + ((d.dom.p[1].valueOf() - d.dom.p[0].valueOf()) * b) / 16);
      for (const r of [d.R1, d.R2]) P.push([r * Math.sin(th) * Math.cos(p), r * Math.sin(th) * Math.sin(p), r * Math.cos(th)]);
    }
  }
  return [0, 1, 2].map((k) => [Math.floor((Math.min(...P.map((x) => x[k])) - 0.2) * 10) / 10, Math.ceil((Math.max(...P.map((x) => x[k])) + 0.2) * 10) / 10]);
}
export const sphValue = (k, i, j, d, th = d.dom.t) => cmul(powInt(k, d.R1, d.R2), angInt(i, j, th[0], th[1]), cn(d.dom.p[1].sub(d.dom.p[0]), 'π'));

function drawSph(rng) {
  for (let n = 0; n < 200; n++) {
    const f = rng.pick(SPH_F);
    const dom = rng.pick(SPH_D);
    const [R1, R2] = rng.pick(SPH_R);
    if (f.id === 'one' && R1 === 0 && dom.id === 'ball') continue;
    const d = { kind: 'sph', f, dom, R1, R2 };
    d.value = sphValue(f.k, f.i, f.j, d);
    if (czero(d.value) || !closedOk(d.value)) continue;
    return d;
  }
  const d = { kind: 'sph', f: SPH_F[0], dom: SPH_D[0], R1: 0, R2: 1, fallback: true };
  d.value = sphValue(2, 0, 1, d);
  return d;
}

function sphParts(d, level) {
  const { f } = d;
  const region = sphRegion(d);
  const ref = sphLine(d);
  const dom = domJudge('sph', region, sphBox(d), ref);
  let bl = E(ref, t('r entre les sphères, θ depuis l\'axe z, φ autour de l\'axe z'), 'bounds', 'bounds');
  if (level === 1) bl = { ...bl, ...blankChain(ref, [[0, 'hi'], [1, 'hi']], SV.vars) };
  const bounds = { html: t('Décris D en coordonnées sphériques (θ mesuré depuis l\'axe z) :'), ask: t('D̃ :'), start: region.join(' ; '), judge: dom, lines: [bl] };
  const jac = jacJudge('sph', f.cart);
  const F = sphF(f);
  let jl = E(F, 'x = r sin θ cos φ, y = r sin θ sin φ, z = r cos θ ; dV = r² sin θ dr dθ dφ', 'jacobian', 'jac');
  if (level <= 2) jl = { ...jl, ...jacBlank(f.sub, 'r^2×sin(θ)', jac.vars) };
  const integrand = { html: t('Écris l\'intégrande en sphériques, jacobien compris :'), ask: 'f·r² sin θ =', start: f.cart, judge: jac, lines: [jl] };
  const [t0, t1] = d.dom.t.map(piText);
  const [p0, p1] = d.dom.p.map(piText);
  const H0 = prod(trig('cos', f.i, 'θ'), trig('sin', f.j, 'θ'));
  const lines = [
    E(`int(${rk(f.k)},r,${d.R1},${d.R2})×int(${H0},θ,${t0},${t1})×int(1,φ,${p0},${p1})`, t('Bornes constantes et intégrande produit : trois intégrales'), 'separate', 'sep'),
    E(`bracket(r^${f.k + 1}/${f.k + 1},r,${d.R1},${d.R2})×bracket(${angPrim(f.i, f.j, 'θ')},θ,${t0},${t1})×bracket(φ,φ,${p0},${p1})`, t('Primitives'), 'compute', 'prim'),
    E(ctext(d.value), t('Évaluer'), 'compute', 'eval'),
  ];
  if (level === 1) lines[1] = { ...lines[1], ...tplOf(lines[1].math, [angPrim(f.i, f.j, 'θ')]) };
  const sStart = `int(int(int(${F},r,${d.R1},${d.R2}),θ,${t0},${t1}),φ,${p0},${p1})`;
  const value = { html: t('Calcule l\'intégrale :'), ask: 'I =', start: sStart, judge: defKnown(sStart, d.value, { jacFactor: 'r^2×sin(θ)' }), lines };
  return [bounds, integrand, value];
}

// ---------- cylindrical ----------
// f·r = r^m·z^e; region: z from z1(r) to z2(r) over a disk sector.
export const CYL_F = [
  { id: 'one', cart: '1', sub: '1', m: 1, e: 0 },
  { id: 'z', cart: 'z', sub: 'z', m: 1, e: 1 },
  { id: 'rho2', cart: 'x^2+y^2', sub: 'r^2', m: 3, e: 0 },
];
const PHI = [[q(0), q(2), []], [q(0), q(1), ['y ≥ 0']], [q(0), q(1, 2), ['x ≥ 0', 'y ≥ 0']]];
// z between: {lo, hi} polynomials in r, with their texts in r and in x, y.
function cylShapes(rng) {
  const s = rng.pick(['cyl', 'cyl', 'parab', 'cone']);
  if (s === 'cyl') {
    const R = rng.pick([1, 2, 3]);
    const h = rng.pick([1, 2, 3, 4]);
    return { s, R, lo: { 0: q(0) }, hi: { 0: q(h) }, cond: [`x^2+y^2 ≤ ${R * R}`, `0 ≤ z ≤ ${h}`], zlo: '0', zhi: String(h), zmax: h, name: 'cylindre' };
  }
  if (s === 'parab') {
    const R = rng.pick([1, 2, 3]);
    return { s, R, lo: { 0: q(0) }, hi: { 0: q(R * R), 2: q(-1) }, cond: ['z ≥ 0', `z ≤ ${R * R}-x^2-y^2`], zlo: '0', zhi: `${R * R}-r^2`, zmax: R * R, name: 'paraboloïde' };
  }
  const h = rng.pick([1, 2, 3]);
  return { s, R: h, lo: { 1: q(1) }, hi: { 0: q(h) }, cond: [`√(x^2+y^2) ≤ z ≤ ${h}`], zlo: 'r', zhi: String(h), zmax: h, name: 'cône' };
}
// ∫ from z1 to z2 of r^m z^e dz, a polynomial in r.
const pSub = (a, b) => { const o = { ...a }; for (const [k, c] of Object.entries(b)) o[k] = (o[k] || q(0)).sub(c); return o; };
function innerZ(f, sh) {
  const rm = { [f.m]: q(1) };
  if (f.e === 0) return polyMul(rm, pSub(sh.hi, sh.lo));
  const d2 = pSub(polyMul(sh.hi, sh.hi), polyMul(sh.lo, sh.lo));
  return polyMul(rm, Object.fromEntries(Object.entries(d2).map(([k, c]) => [k, c.mul(q(1, 2))])));
}
const cylF = (f) => prod(rk(f.m), f.e ? 'z' : '');

function drawCyl(rng) {
  for (let n = 0; n < 200; n++) {
    const f = rng.pick(CYL_F);
    const sh = cylShapes(rng);
    const [a, b, cond] = sh.s === 'cyl' ? rng.pick(PHI) : rng.pick(PHI.slice(0, 2));
    const G = innerZ(f, sh);
    const rad = polyInt0(G, sh.R);
    const value = cmul(cn(rad), cn(b.sub(a), 'π'));
    if (czero(value) || !closedOk(value)) continue;
    return { kind: 'cyl', f, sh, a, b, cond, G, value };
  }
  return null;
}
const cylRegion = (d) => [...d.sh.cond, ...d.cond];
export const cylLine = (d) => `${piText(d.a)} ≤ φ ≤ ${piText(d.b)} ; 0 ≤ r ≤ ${d.sh.R} ; ${d.sh.zlo} ≤ z ≤ ${d.sh.zhi}`;
const cylBox = (d) => [[-d.sh.R - 0.2, d.sh.R + 0.2], [d.cond.length ? -0.2 : -d.sh.R - 0.2, d.sh.R + 0.2], [-0.2, d.sh.zmax + 0.2]];

function cylParts(d, level) {
  const { f, sh } = d;
  const region = cylRegion(d);
  const ref = cylLine(d);
  let bl = E(ref, t('φ et r décrivent l\'ombre de D sur le plan xy, puis z va du bas au haut'), 'bounds', 'bounds');
  if (level === 1) bl = { ...bl, ...blankChain(ref, [[1, 'hi'], [2, 'hi']], CV.vars) };
  const bounds = { html: t('Décris D en coordonnées cylindriques :'), ask: t('D̃ :'), start: region.join(' ; '), judge: domJudge('cyl', region, cylBox(d), ref), lines: [bl] };
  const jac = jacJudge('cyl', f.cart, { rMax: sh.R + 0.5 });
  const F = cylF(f);
  let jl = E(F, 'x = r cos φ, y = r sin φ, z = z ; dV = r dr dφ dz', 'jacobian', 'jac');
  if (level <= 2) jl = { ...jl, ...jacBlank(f.sub, 'r', jac.vars) };
  const integrand = { html: t('Écris l\'intégrande en cylindriques, jacobien compris :'), ask: 'f·r =', start: f.cart, judge: jac, lines: [jl] };
  const A = piText(d.a);
  const B = piText(d.b);
  const start = `int(int(int(${F},z,${sh.zlo},${sh.zhi}),r,0,${sh.R}),φ,${A},${B})`;
  const Gt = polyText(d.G);
  const lines = sh.s === 'cyl'
    ? [
      E(`int(${rk(f.m)},r,0,${sh.R})×int(1,φ,${A},${B})×int(${f.e ? 'z' : '1'},z,0,${sh.zhi})`, t('Bornes constantes : trois intégrales'), 'separate', 'sep'),
      E(`bracket(r^${f.m + 1}/${f.m + 1},r,0,${sh.R})×bracket(φ,φ,${A},${B})×bracket(${f.e ? 'z^2/2' : 'z'},z,0,${sh.zhi})`, t('Primitives'), 'compute', 'prim'),
      E(ctext(d.value), t('Évaluer'), 'compute', 'eval'),
    ]
    : [
      E(`int(int(${Gt},r,0,${sh.R}),φ,${A},${B})`, t('On intègre d\'abord en z, de {lo} à {hi}', { lo: fr(sh.zlo), hi: fr(sh.zhi) }), 'separate', 'inner'),
      E(`int(${Gt},r,0,${sh.R})×int(1,φ,${A},${B})`, t('Plus rien ne dépend de φ : produit'), 'separate', 'sep'),
      E(`bracket(${polyText(polyPrim(d.G))},r,0,${sh.R})×bracket(φ,φ,${A},${B})`, t('Primitives'), 'compute', 'prim'),
      E(ctext(d.value), t('Évaluer'), 'compute', 'eval'),
    ];
  if (level === 1) lines[lines.length - 2] = { ...lines[lines.length - 2], ...tplOf(lines[lines.length - 2].math, [sh.s === 'cyl' ? `r^${f.m + 1}/${f.m + 1}` : polyText(polyPrim(d.G))]) };
  const value = { html: t('Calcule l\'intégrale :'), ask: 'I =', start, judge: defKnown(start, d.value, { jacFactor: 'r' }), lines };
  return [bounds, integrand, value];
}

// ---------- items ----------
const tplOf = (math, texts) => tpl(math, texts, {});

export const CS_SUB = [
  { id: 'bounds', label: t('bornes en cylindriques ou sphériques'), skill: SK },
  { id: 'jacobian', label: t('intégrande et jacobien'), skill: 'a2-change-var' },
  { id: 'separate', label: t('séparer, intégrer de l\'intérieur'), skill: 'a2-fubini-rect' },
  { id: 'compute', label: t('primitives et valeur'), skill: 'a2-fubini-rect' },
];
const CS_CHOICES = [
  { id: 'bounds', label: t('Décrire D : les bornes de chaque coordonnée') },
  { id: 'jac', label: t('Remplacer x, y, z et multiplier par le jacobien') },
  { id: 'inner', label: t('Intégrer d\'abord en z') },
  { id: 'sep', label: t('Séparer en un produit d\'intégrales') },
  { id: 'prim', label: t('Écrire les primitives') },
  { id: 'eval', label: t('Évaluer') },
  { id: 'cosjac', label: t('Multiplier par r² cos θ'), rule: 'a2_sph_theta_from_plane', why: t('θ part de l\'axe z : dV = r² sin θ dr dθ dφ.') },
];
const decision = (sph) => ({
  kind: 'decision', prompt: t('Quelles coordonnées ?'), options: [
    { id: 'sph', label: t('Sphériques : boule, coquille, cône depuis l\'origine'), valid: sph, why: sph ? '' : t('Les bornes de D parlent de x² + y² et de z séparément : un cylindre, un paraboloïde ou un cône à sommet en bas se décrit en cylindriques.') },
    { id: 'cyl', label: t('Cylindriques : cylindre, paraboloïde, z entre deux surfaces'), valid: !sph, why: !sph ? '' : t('D est bordé par des sphères x² + y² + z² = R² (et des cônes depuis l\'origine) : en sphériques, toutes les bornes sont constantes.') },
  ],
});

export function cylSph(level, rng, opts = {}) {
  if (opts.exam === 'tf') return csTf(rng, opts);
  if (level === 5 || opts.exam === 'mcq') return csMcq(level, rng, opts);
  const sph = rng.next() < 0.6;
  const d = sph ? drawSph(rng) : (drawCyl(rng) || drawSph(rng));
  const isSph = d.kind === 'sph';
  const parts = isSph ? sphParts(d, level) : cylParts(d, level);
  if (level === 3) parts[0].pre = [decision(isSph)];
  const { start, judge, script } = partsScript(parts, level, CS_CHOICES);
  const region = isSph ? sphRegion(d) : cylRegion(d);
  const given = level <= 2 ? ` ${isSph ? t('En coordonnées sphériques (θ depuis l\'axe z).') : t('En coordonnées cylindriques.')}` : '';
  return linesItem({
    skill: SK, level, mode: modeOf(level), start, judge, script,
    prompt: t('Calcule ∭<sub>D</sub> {f} dV, avec D = {{D}}.', { f: integrandML(d.f.cart, XYZ.vars), D: MT(region.join(' ; '), XYZ) }) + given,
    hints: isSph
      ? H(t('Une boule, une coquille ou un cône depuis l\'origine : sphériques, avec dV = r² sin θ dr dθ dφ.'),
        t('θ part de l\'axe z : {b} ; l\'intégrande devient {F}.', { b: MT(`${piText(d.dom.t[0])} ≤ θ ≤ ${piText(d.dom.t[1])}`, SV), F: MT(sphF(d.f), SV) }),
        `${MT(sphLine(d), SV)}`)
      : H(t('z entre deux surfaces au-dessus d\'un disque : cylindriques, avec dV = r dr dφ dz.'),
        t('z va de {lo} à {hi} ; l\'intégrande devient {F}.', { lo: MT(d.sh.zlo, CV), hi: MT(d.sh.zhi, CV), F: MT(cylF(d.f), CV) }),
        `${MT(cylLine(d), CV)}`),
    subgoals: CS_SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${d.kind}:${d.f.id}:${isSph ? `${d.dom.id}:${d.R1}:${d.R2}` : `${d.sh.s}:${d.sh.R}:${d.sh.zhi}:${piText(d.b)}`}`,
    exam: examTag(opts), fallback: !!d.fallback,
  });
}

// « The integral equals »: four iterated integrals (2018 Q17, 2020 Q8, 2021 Q8).
const NEXT_T = { '1/4': q(1, 2), '1/2': q(1, 4), '1': q(1, 2) };
function csMcq(level, rng, opts) {
  const d = drawSph(rng);
  const { f } = d;
  const [p0, p1] = d.dom.p.map(piText);
  const iter = (F, t, R1 = d.R1, R2 = d.R2) => `int(int(int(${F},r,${R1},${R2}),θ,${piText(t[0])},${piText(t[1])}),φ,${p0},${p1})`;
  const right = { html: MT(iter(sphF(f), d.dom.t), SV), correct: true, x: cfloat(d.value) };
  const cands = [];
  const tryAdd = (F, k, i, j, t, rule) => {
    try {
      const v = sphValue(k, i, j, d, t);
      cands.push({ html: MT(iter(F, t), SV), correct: false, rule, x: cfloat(v) });
    } catch { /* an angle integral outside the table */ }
  };
  // θ from the plane: sin ↔ cos, θ bounds complementary.
  const tc = [q(1, 2).sub(d.dom.t[1]), q(1, 2).sub(d.dom.t[0])];
  if (tc[0].n >= 0) tryAdd(prod(rk(f.k), trig('sin', f.i, 'θ'), trig('cos', f.j, 'θ')), f.k, f.j, f.i, tc, 'a2_sph_theta_from_plane');
  tryAdd(prod(rk(f.k), trig('sin', f.i, 'θ'), trig('cos', f.j, 'θ')), f.k, f.j, f.i, d.dom.t, 'a2_sph_theta_from_plane');
  // Jacobian: r² sin θ forgotten, or r in its place.
  tryAdd(prod(rk(f.k - 2), trig('cos', f.i, 'θ'), trig('sin', f.j - 1, 'θ')), f.k - 2, f.i, f.j - 1, d.dom.t, 'a2_jacobian_forgot');
  tryAdd(prod(rk(f.k - 1), trig('cos', f.i, 'θ'), trig('sin', f.j - 1, 'θ')), f.k - 1, f.i, f.j - 1, d.dom.t, 'a2_jacobian_forgot');
  // A wrong bound of θ, or of φ.
  const nt = NEXT_T[d.dom.t[1].toString()];
  if (nt && nt.cmp(d.dom.t[0]) > 0) tryAdd(sphF(f), f.k, f.i, f.j, [d.dom.t[0], nt], 'a2_polar_angle_bounds');
  const np = d.dom.p[1].eq(2) ? q(1) : q(1);
  try {
    const v = cmul(powInt(f.k, d.R1, d.R2), angInt(f.i, f.j, d.dom.t[0], d.dom.t[1]), cn(np.sub(d.dom.p[0]), 'π'));
    cands.push({ html: MT(`int(int(int(${sphF(f)},r,${d.R1},${d.R2}),θ,${piText(d.dom.t[0])},${piText(d.dom.t[1])}),φ,${p0},${piText(np)})`, SV), correct: false, rule: 'a2_polar_angle_bounds', x: cfloat(v) });
  } catch { /* skip */ }
  const options = [right];
  for (const c of rng.shuffle(cands)) {
    if (options.length >= 4) break;
    if (options.some((o) => o.html === c.html || Math.abs(o.x - c.x) < 1e-9 * (1 + Math.abs(c.x)))) continue;
    options.push(c);
  }
  return mcq({
    skill: SK, level, prompt: t('Soit D = {{D}}. En sphériques (θ mesuré depuis l\'axe z), ∭<sub>D</sub> {f} dV est égale à :', { D: MT(sphRegion(d).join(' ; '), XYZ), f: integrandML(f.cart, XYZ.vars) }),
    options: options.map(({ x, ...o }) => o),
    solution: [{ html: MT(sphLine(d), SV), note: t('Bornes') }, { html: MT(sphF(f), SV), note: 'f·r² sin θ' }, { html: `= ${MT(ctext(d.value))}`, note: t('Valeur') }],
    key: `mcq:${f.id}:${d.dom.id}:${d.R1}:${d.R2}`, exam: examTag(opts, 3), fallback: !!d.fallback,
  }, rng);
}

// V/F on the coordinates (the counter-example would be a formula: a
// two-option multiple choice, exam format tf).
const STATEMENTS = [
  { s: t('En sphériques, dV = r² sin θ dr dθ dφ.'), truth: true, why: t('θ est mesuré depuis l\'axe z : |det J| = r² sin θ.') },
  { s: t('En sphériques, dV = r² cos θ dr dθ dφ.'), truth: false, rule: 'a2_sph_theta_from_plane', why: t('Avec θ mesuré depuis l\'axe z (convention du cours), z = r cos θ et dV = r² sin θ dr dθ dφ. r² cos θ est la formule d\'un angle mesuré depuis le plan xy.') },
  { s: t('En sphériques, z = r sin θ.'), truth: false, rule: 'a2_sph_theta_from_plane', why: t('θ part de l\'axe z : z = r cos θ.') },
  { s: t('En sphériques, dV = r dr dθ dφ.'), truth: false, rule: 'a2_jacobian_forgot', why: t('Le jacobien des sphériques est r² sin θ.') },
  { s: t('En cylindriques, dV = r dr dφ dz.'), truth: true, why: t('Les cylindriques sont les polaires en (x, y), et z ne change pas : le jacobien est r.') },
  { s: t('En cylindriques, dV = dr dφ dz.'), truth: false, rule: 'a2_jacobian_forgot', why: t('Le jacobien des cylindriques est r : dV = r dr dφ dz.') },
  { s: t('En sphériques, le cône z ≥ √(x² + y²) devient 0 ≤ θ ≤ π/4.'), truth: true, why: t('Sur le cône, z = √(x² + y²), donc cos θ = sin θ : θ = π/4 ; au-dessus, θ est plus petit.') },
  { s: t('En sphériques, le cône z ≥ √(x² + y²) devient π/4 ≤ θ ≤ π/2.'), truth: false, rule: 'a2_sph_theta_from_plane', why: t('θ part de l\'axe z : au-dessus du cône, θ ≤ π/4. π/4 ≤ θ ≤ π/2 décrit l\'extérieur du cône (z ≥ 0).') },
  { s: t('En sphériques, le demi-espace z ≥ 0 devient 0 ≤ θ ≤ π/2.'), truth: true, why: t('z = r cos θ ≥ 0 ⇔ cos θ ≥ 0 ⇔ θ ≤ π/2 (θ ∈ [0 ; π]).') },
  { s: t('En sphériques, le premier octant x, y, z ≥ 0 devient 0 ≤ θ ≤ π/2, 0 ≤ φ ≤ π.'), truth: false, rule: 'a2_polar_angle_bounds', why: t('x ≥ 0 et y ≥ 0 donnent 0 ≤ φ ≤ π/2, pas π.') },
  { s: t('Pour la boule entière, θ va de 0 à 2π et φ de 0 à π.'), truth: false, rule: 'a2_polar_angle_bounds', why: t('θ ∈ [0 ; π] (de l\'axe z vers le bas), φ ∈ [0 ; 2π] (un tour complet).') },
  { s: t('Le volume de la boule de rayon R vaut ∫₀^{2π}∫₀^π∫₀^R r² sin θ dr dθ dφ = 4πR³/3.'), truth: true, why: '(R³/3)·2·2π = 4πR³/3.' },
];
function csTf(rng, opts) {
  const st = rng.pick(STATEMENTS);
  return vfItem(mcq, { skill: SK, statement: st.s, truth: st.truth, rule: st.rule, why: st.why, key: STATEMENTS.indexOf(st) }, rng);
}

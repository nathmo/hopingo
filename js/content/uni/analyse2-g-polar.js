// a2-polar-int (module A2, part g, step U6): double integrals in polar
// coordinates. Catalogue docs/universite/A2-analyse-2.md, entry
// `a2-polar-int` and exam example E5 (level 5 problem, QCM version).
//
// An item is made of parts: the bounds in (r, φ) (judge `domain`), the
// integrand with its jacobian (`equiv` with cfg.jac: the start « y » stands
// for y·r), then the value (`definite`: the iterated integral, separated,
// the primitives as brackets, the number). E5 adds a primitive by parts
// (`antideriv`) and the separation « π·∫₁² 2r ln r dr » (`equiv` on numbers).

import { MT, linesItem, mcq, examTag, A2_KEYS, H, E, modeOf, tpl, blanked, partsScript } from './a2-kit.js';
import { asProblem } from './kit-problem.js';
import {
  q, cn, cadd, csub, cmul, cscale, cfloat, ctext, cfac, closedOk, czero, angInt, piText, rPow, powInt, rLn, cln,
  fr, prod, rk, trig, jacJudge, domJudge, DEF, defKnown, SAME, blankChain, jacBlank,
} from './analyse2-g-kit.js';


const SK = 'a2-polar-int';
const PV = { vars: ['r', 'φ'] };

// ---------- domains ----------
// The angular part of D: φ from aπ to bπ, and its cartesian conditions.
export const SECTORS = [
  { id: 'disk', a: q(0), b: q(2), cond: [] },
  { id: 'up', a: q(0), b: q(1), cond: ['y ≥ 0'] },
  { id: 'right', a: q(-1, 2), b: q(1, 2), cond: ['x ≥ 0'] },
  { id: 'q1', a: q(0), b: q(1, 2), cond: ['x ≥ 0', 'y ≥ 0'] },
  { id: 'q2', a: q(1, 2), b: q(1), cond: ['x ≤ 0', 'y ≥ 0'] },
  { id: 'oct', a: q(0), b: q(1, 4), cond: ['0 ≤ y ≤ x'] },
  { id: 'oct2', a: q(1, 4), b: q(1, 2), cond: ['0 ≤ x ≤ y'] },
  { id: 'six', a: q(0), b: q(1, 6), cond: ['0 ≤ y ≤ x/√3'], radialOnly: true },
  { id: 'third', a: q(0), b: q(1, 3), cond: ['0 ≤ y ≤ √3×x'], radialOnly: true },
];
export const SECTOR = Object.fromEntries(SECTORS.map((s) => [s.id, s]));

const sq = (R) => (R === 'e' ? 'e^2' : String(R * R));
// The cartesian conditions of D: x² + y² between R1² and R2², then the sector.
export function regionOf(R1, R2, sector) {
  const ring = R1 === 0 ? `x^2+y^2 ≤ ${sq(R2)}` : `${sq(R1)} ≤ x^2+y^2 ≤ ${sq(R2)}`;
  return [ring, ...sector.cond];
}
// The box where the domain judge draws its points: around the sector.
export function boxOf(R2, sector) {
  const R = R2 === 'e' ? Math.E : R2;
  const xs = [0];
  const ys = [0];
  for (let k = 0; k <= 64; k++) {
    const t = Math.PI * (sector.a.valueOf() + ((sector.b.valueOf() - sector.a.valueOf()) * k) / 64);
    xs.push(R * Math.cos(t));
    ys.push(R * Math.sin(t));
  }
  const pad = (lo, hi) => [Math.floor((lo - 0.2) * 10) / 10, Math.ceil((hi + 0.2) * 10) / 10];
  return [pad(Math.min(...xs), Math.max(...xs)), pad(Math.min(...ys), Math.max(...ys))];
}
export const polarLine = (R1, R2, sector) => `${piText(sector.a)} ≤ φ ≤ ${piText(sector.b)} ; ${R1} ≤ r ≤ ${R2}`;

// ---------- integrands ----------
// f(x, y) = r^p·cos^i φ·sin^j φ, or a radial special (ln, exp, rat).
export const INTEGRANDS = [
  { id: 'x', cart: 'x', i: 1, j: 0, p: 1, sub: 'r×cos(φ)' },
  { id: 'y', cart: 'y', i: 0, j: 1, p: 1, sub: 'r×sin(φ)' },
  { id: 'x2', cart: 'x^2', i: 2, j: 0, p: 2, sub: '(r×cos(φ))^2' },
  { id: 'y2', cart: 'y^2', i: 0, j: 2, p: 2, sub: '(r×sin(φ))^2' },
  { id: 'xy', cart: 'x×y', i: 1, j: 1, p: 2, sub: 'r×cos(φ)×r×sin(φ)' },
  { id: 'r2', cart: 'x^2+y^2', i: 0, j: 0, p: 2, sub: 'r^2' },
  { id: 'r1', cart: '√(x^2+y^2)', i: 0, j: 0, p: 1, sub: 'r' },
  { id: 'one', cart: '1', i: 0, j: 0, p: 0, sub: '1' },
  { id: 'yr2', cart: 'y(x^2+y^2)', i: 0, j: 1, p: 3, sub: 'r×sin(φ)×r^2' },
  { id: 'xr2', cart: 'x(x^2+y^2)', i: 1, j: 0, p: 3, sub: 'r×cos(φ)×r^2' },
  { id: 'ln', cart: 'ln(x^2+y^2)', special: 'ln', sub: 'ln(r^2)', i: 0, j: 0 },
  { id: 'exp', cart: 'e^(-(x^2+y^2))', special: 'exp', sub: 'e^(-r^2)', i: 0, j: 0 },
  { id: 'rat', cart: '1/(1+x^2+y^2)', special: 'rat', sub: '1/(1+r^2)', i: 0, j: 0 },
];
export const INTEGRAND = Object.fromEntries(INTEGRANDS.map((f) => [f.id, f]));

// Primitives of the angular factors cos^i·sin^j (in φ or θ).
export function angPrim(i, j, v = 'φ') {
  const P = {
    '0,0': v, '1,0': `sin(${v})`, '0,1': `-cos(${v})`, '2,0': `${v}/2+sin(2${v})/4`, '0,2': `${v}/2-sin(2${v})/4`,
    '1,1': `sin(${v})^2/2`, '2,1': `-cos(${v})^3/3`, '0,3': `-cos(${v})+cos(${v})^3/3`,
  };
  return P[`${i},${j}`];
}
const angFactor = (i, j, v = 'φ') => prod(trig('cos', i, v), trig('sin', j, v));

// The radial part with the jacobian: {G (integrand in r), prim, value(R1, R2)}.
export function radialOf(f) {
  if (f.special === 'ln') return { G: '2r×ln(r)', prim: 'r^2×ln(r)-r^2/2', value: (a, b) => cadd(csub(cmul(rPow(b, 2), rLn(b)), cscale(rPow(b, 2), q(1, 2))), cneg2(csub(cmul(rPow(a, 2), rLn(a)), cscale(rPow(a, 2), q(1, 2))))) };
  if (f.special === 'exp') return { G: 'r×e^(-r^2)', prim: '-e^(-r^2)/2', value: (a, b) => cscale(csub(expNeg(a), expNeg(b)), q(1, 2)) };
  if (f.special === 'rat') return { G: 'r/(1+r^2)', prim: 'ln(1+r^2)/2', value: (a, b) => cscale(csub(cln(1 + b * b), cln(1 + a * a)), q(1, 2)) };
  const n = f.p + 1;
  return { G: rk(n), prim: `r^${n + 1}/${n + 1}`, value: (a, b) => powInt(n, a, b) };
}
const cneg2 = (a) => cscale(a, -1);
const expNeg = (R) => (R === 0 ? cn(1) : cn(1, `e^${-R * R}`));

// The integrand in polar coordinates with its jacobian (tidy form).
export const polarIntegrand = (f) => (f.special ? radialOf(f).G : prod(rk(f.p + 1), trig('cos', f.i), trig('sin', f.j)));

// ---------- drawing an item ----------
const RADII = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3], [0, 'e'], [1, 'e']];
function draw(rng, { only } = {}) {
  for (let t = 0; t < 200; t++) {
    const f = only ? INTEGRAND[rng.pick(only)] : rng.pick(INTEGRANDS);
    const sector = rng.pick(SECTORS);
    if (sector.radialOnly && (f.i || f.j)) continue;
    const [R1, R2] = rng.pick(RADII);
    if (f.special === 'ln' && R1 < 1) continue;
    if (f.special === 'exp' && (R1 !== 0 || R2 === 'e' || R2 > 2)) continue;
    if (f.special === 'rat' && (R2 === 'e' || R1 > 1)) continue;
    if (!f.special && R2 === 'e' && f.p > 2) continue;
    if (f.id === 'one' && R1 === 0 && sector.id === 'disk') continue;
    const rad = radialOf(f).value(R1, R2);
    const ang = angInt(f.i, f.j, sector.a, sector.b);
    const value = cmul(rad, ang);
    if (czero(value) || czero(rad) || czero(ang) || !closedOk(value)) continue;
    return { f, sector, R1, R2, rad, ang, value };
  }
  return null;
}
const FALLBACK = () => {
  const f = INTEGRAND.r2;
  const sector = SECTOR.disk;
  const rad = radialOf(f).value(0, 2);
  const ang = angInt(0, 0, sector.a, sector.b);
  return { f, sector, R1: 0, R2: 2, rad, ang, value: cmul(rad, ang), fallback: true };
};

// D as shown: {(x, y) : 1 ≤ x² + y² ≤ 4, y ≥ 0}.
export const regionML = (d) => MT(regionOf(d.R1, d.R2, d.sector).join(' ; '), { vars: ['x', 'y'] });

// The parts of the item.
export function polarParts(d, level) {
  const { f, sector, R1, R2 } = d;
  const A = piText(sector.a);
  const B = piText(sector.b);
  const region = regionOf(R1, R2, sector);
  const ref = polarLine(R1, R2, sector);
  const dom = domJudge('polar', region, boxOf(R2, sector), ref);
  const bounds = { html: 'Décris D en coordonnées polaires :', ask: 'D̃ :', start: region.join(' ; '), judge: dom,
    lines: [E(ref, 'Rayon entre les cercles, angle entre les demi-droites', 'bounds', 'bounds')] };
  if (level === 2) bounds.lines[0] = { ...bounds.lines[0], ...blankChain(ref, [[0, 'hi'], [1, 'hi']], PV.vars) };
  const F = polarIntegrand(f);
  const jac = jacJudge('polar', f.cart, { rMax: Math.max(3, R2 === 'e' ? 3 : R2) });
  let jl = E(F, 'x = r cos φ, y = r sin φ, et dx dy = r dr dφ', 'jacobian', 'jac');
  if (level === 1) jl = { ...jl, ...jacBlank(f.sub, 'r', jac.vars) }; else if (level === 2 && !f.special && f.p + 1 > 0) jl = blanked(jl, [rk(f.p + 1)], { vars: jac.vars });
  const integrand = { html: 'Écris l\'intégrande en polaires, jacobien compris :', ask: 'f(r cos φ, r sin φ)·r =', start: f.cart, judge: jac, lines: [jl] };
  const rad = radialOf(f);
  const H0 = angFactor(f.i, f.j);
  const start = `int(int(${F},r,${R1},${R2}),φ,${A},${B})`;
  const sep = `int(${rad.G},r,${R1},${R2})×int(${H0},φ,${A},${B})`;
  const brk = `bracket(${rad.prim},r,${R1},${R2})×bracket(${angPrim(f.i, f.j)},φ,${A},${B})`;
  const fin = ctext(d.value);
  const vals = [
    E(sep, 'Bornes constantes, produit g(r)·h(φ) : produit de deux intégrales', 'separate', 'sep'),
    E(brk, 'Primitives', 'compute', 'prim'),
    E(fin, `${fr(ctext(d.rad))} · ${fr(ctext(d.ang))}`, 'compute', 'eval'),
  ];
  if (level === 1) {
    vals[0] = blanked(vals[0], [rad.G]);
    vals[1] = blanked(vals[1], [rad.prim]);
  }
  if (level === 2) vals[1] = blanked(vals[1], [angPrim(f.i, f.j)]);
  const value = { html: 'Calcule l\'intégrale :', ask: 'I =', start, judge: defKnown(start, d.value, { jacFactor: 'r' }), lines: vals };
  return level === 1 ? [integrand, value] : [bounds, integrand, value];
}

export const PI_SUB = [
  { id: 'bounds', label: 'bornes en (r, φ)', skill: 'a2-domain-describe' },
  { id: 'jacobian', label: 'intégrande et jacobien r', skill: 'a2-change-var' },
  { id: 'separate', label: 'séparer en produit', skill: 'a2-fubini-rect' },
  { id: 'compute', label: 'primitives et valeur', skill: 'a1-int-direct' },
];
const PI_CHOICES = [
  { id: 'bounds', label: 'Décrire D en polaires : bornes de φ et de r' },
  { id: 'jac', label: 'Remplacer x = r cos φ, y = r sin φ et multiplier par r' },
  { id: 'sep', label: 'Séparer en un produit de deux intégrales' },
  { id: 'prim', label: 'Écrire les primitives' },
  { id: 'eval', label: 'Évaluer et multiplier' },
  { id: 'nojac', label: 'Remplacer x et y, sans facteur r', rule: 'a2_jacobian_forgot', why: 'dx dy = r dr dφ : sans le r, l\'aire d\'une petite case est fausse.' },
];
const COORD_DECISION = {
  kind: 'decision', prompt: 'Quelles coordonnées ?', options: [
    { id: 'polar', label: 'Polaires : D est un morceau de disque ou d\'anneau', valid: true },
    { id: 'cart', label: 'Cartésiennes', valid: false, why: 'Les bornes de y seraient des racines √(R² − x²) : en polaires, elles sont constantes.' },
  ],
};

export function polarInt(level, rng, opts = {}) {
  if (level === 5) return e5Problem(rng, opts);
  if (opts.exam === 'mcq') return polarMcq(rng, opts);
  const d = draw(rng) || FALLBACK();
  const parts = polarParts(d, level);
  if (level === 3) parts[0].pre = [COORD_DECISION];
  const { start, judge, script } = partsScript(parts, level, PI_CHOICES);
  const given = level === 1 ? ` En polaires : ${MT(polarLine(d.R1, d.R2, d.sector), PV)}.` : '';
  const F = polarIntegrand(d.f);
  return linesItem({
    skill: SK, level, mode: modeOf(level), start, judge, script,
    prompt: `Calcule I = ∬<sub>D</sub> ${MT(d.f.cart, { vars: ['x', 'y'] })} dx dy, avec D = {${regionML(d)}}.${given}`,
    hints: H('D est un morceau de disque : passe en polaires, sans oublier r (dx dy = r dr dφ).',
      `${MT(`int(int(${F},r,${d.R1},${d.R2}),φ,${piText(d.sector.a)},${piText(d.sector.b)})`, PV)}, puis sépare en produit.`,
      `${MT(polarLine(d.R1, d.R2, d.sector), PV)} et l'intégrande ${MT(F, PV)}.`),
    subgoals: PI_SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${d.f.id}:${d.sector.id}:${d.R1}:${d.R2}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// ---------- E5: Log(x² + y²) on a piece of annulus (8 points) ----------
const E5_SECTORS = ['up', 'right', 'q1', 'q2', 'disk'];
function e5Data(rng) {
  const sector = SECTOR[rng.pick(E5_SECTORS)];
  const R2 = rng.pick([2, 2, 3, 'e']);
  const f = INTEGRAND.ln;
  const rad = radialOf(f).value(1, R2);
  const ang = angInt(0, 0, sector.a, sector.b);
  return { f, sector, R1: 1, R2, rad, ang, value: cmul(rad, ang) };
}

export function e5Item(d, level, opts = {}) {
  const parts = polarParts(d, 4);
  const L = ctext(d.ang);
  const [bounds, integrand] = parts;
  bounds.lines[0].subgoal = 'bounds';
  const sepStart = `int(int(2r×ln(r),r,1,${d.R2}),φ,${piText(d.sector.a)},${piText(d.sector.b)})`;
  const separation = { html: 'Sépare : l\'intégrale en φ se calcule tout de suite.', ask: 'I =', start: sepStart, judge: SAME,
    lines: [E(`${cfac(d.ang)}×int(2r×ln(r),r,1,${d.R2})`, `∫ dφ = ${fr(L)}`, 'separate', 'sep')] };
  const primitive = { html: 'Primitive de 2r ln r (par parties, u = ln r, v′ = 2r) :', ask: 'F(r) =', start: 'int(2r×ln(r),r)',
    judge: { kind: 'antideriv', v: 'r', domain: { r: [0.5, 3] } },
    lines: [E('r^2×ln(r)-int(r,r)', 'u = ln r, v = r² : ∫ uv′ = uv − ∫ u′v', 'parts', 'parts'), E('r^2×ln(r)-r^2/2+C', 'Primitive de r', 'parts', 'prim')] };
  const value = { html: 'Valeur de l\'intégrale :', ask: 'I =', start: `${cfac(d.ang)}×bracket(r^2×ln(r)-r^2/2,r,1,${d.R2})`, judge: DEF({ jacFactor: 'r' }),
    lines: [E(ctext(d.value), 'F(R) − F(1)', 'value', 'eval')] };
  const { start, judge, script } = partsScript([bounds, integrand, separation, primitive, value], level, PI_CHOICES);
  return linesItem({
    skill: SK, level, mode: 'free', start, judge, script,
    prompt: `Calcule ∬<sub>D</sub> ${MT('ln(x^2+y^2)', { vars: ['x', 'y'] })} dx dy, avec D = {${regionML(d)}}.`,
    hints: [], noHints: true,
    subgoals: [...PI_SUB.slice(0, 3), { id: 'parts', label: 'primitive par parties', skill: 'a1-int-parts' }, { id: 'value', label: 'valeur', skill: SK }],
    keys: A2_KEYS, key: `${SK}:E5:${d.sector.id}:${d.R2}`, exam: examTag(opts, 8),
  });
}

function e5Problem(rng, opts) {
  const d = e5Data(rng);
  return asProblem(e5Item(d, 5, opts), 8, { points: [1.5, 1.5, 1, 2, 2] });
}

// ---------- multiple choice (E5's QCM, and any integrand) ----------
// The value with the angle bound moved to its neighbour (π ↔ π/2…).
const NEXT_B = { '2': [q(1)], '1': [q(1, 2), q(2)], '1/2': [q(1, 4), q(1)], '1/4': [q(1, 2)], '1/6': [q(1, 3)], '1/3': [q(1, 6), q(1, 2)] };
function wrongAngle(d) {
  for (const b of NEXT_B[d.sector.b.toString()] || []) {
    if (b.cmp(d.sector.a) <= 0) continue;
    try {
      const v = cmul(radialOf(d.f).value(d.R1, d.R2), angInt(d.f.i, d.f.j, d.sector.a, b));
      if (!czero(v)) return v;
    } catch { /* skip */ }
  }
  return null;
}
// Without r: ∫ f̃ dr (monomials, and ln: ∫ 2 ln r = 2r ln r − 2r).
function withoutR(d) {
  const { f, R1, R2 } = d;
  if (f.special === 'ln') {
    const F = (R) => csub(cscale(cmul(cn(1), R === 'e' ? cn(1, 'e^1') : cn(R), rLn(R)), 2), cscale(R === 'e' ? cn(1, 'e^1') : cn(R), 2));
    return cmul(csub(F(R2), F(R1)), d.ang);
  }
  if (f.special) return null;
  return cmul(powInt(f.p, R1, R2), d.ang);
}

export function polarMcq(rng, opts = {}) {
  const e5 = rng.next() < 0.5;
  const d = e5 ? e5Data(rng) : (draw(rng) || FALLBACK());
  const wrongs = [];
  const add = (v, rule) => { if (v && !czero(v) && closedOk(v)) wrongs.push({ v, rule }); };
  add(withoutR(d), 'a2_jacobian_forgot');
  add(wrongAngle(d), 'a2_polar_angle_bounds');
  if (d.f.special === 'ln') add(cscale(d.value, q(1, 2)), 'g2_log_power');
  add(cscale(d.value, 2), 'a2_polar_angle_bounds');
  add(cscale(d.value, q(1, 2)), 'a2_polar_angle_bounds');
  const options = [{ html: MT(ctext(d.value)), correct: true, x: cfloat(d.value) }];
  for (const w of wrongs) {
    if (options.length >= 4) break;
    const x = cfloat(w.v);
    if (options.some((o) => Math.abs(o.x - x) < 1e-9 * (1 + Math.abs(x)))) continue;
    options.push({ html: MT(ctext(w.v)), correct: false, rule: w.rule, x });
  }
  const F = polarIntegrand(d.f);
  return mcq({
    skill: SK, level: 4, prompt: `∬<sub>D</sub> ${MT(d.f.cart, { vars: ['x', 'y'] })} dx dy, avec D = {${regionML(d)}}, vaut :`,
    options: options.map(({ x, ...o }) => o),
    solution: [
      { html: `D̃ : ${MT(polarLine(d.R1, d.R2, d.sector), PV)}`, note: 'Bornes en polaires' },
      { html: MT(`int(int(${F},r,${d.R1},${d.R2}),φ,${piText(d.sector.a)},${piText(d.sector.b)})`, PV), note: 'Avec le jacobien r' },
      { html: `= ${MT(ctext(d.value))}`, note: '' },
    ],
    key: `mcq:${d.f.id}:${d.sector.id}:${d.R1}:${d.R2}`, exam: examTag(opts, 3), fallback: !!d.fallback,
  }, rng);
}

// a2-volume (module A2, part g, step U6): volumes between two surfaces.
// Catalogue docs/universite/A2-analyse-2.md, entry `a2-volume`.
//
// Parts: the projection R (judge `domain`: the surfaces meet on a circle,
// or the triangle under a plane), D between the surfaces (`domain` in
// cylindrical or cartesian coordinates, cfg.volume: a swapped top and
// bottom is the trap a2_volume_surfaces_swapped), the height times the
// jacobian (`equiv` with cfg.jac), the value (`definite`).

import { MT, linesItem, mcq, examTag, A2_KEYS, H, E, modeOf, partsScript, tpl } from './a2-kit.js';
import {
  q, cn, cadd, cmul, cscale, ctext, cfloat, czero, closedOk, fr, jacJudge, domJudge, defKnown, blankChain, jacBlank,
  polyText, polyMul, polyPrim, polyInt0,
} from './analyse2-g-kit.js';

const SK = 'a2-volume';
const PV = { vars: ['r', 'φ'] };
const XYZ = { vars: ['x', 'y', 'z'] };

// A round solid: top and bottom in x, y and in r, the height in r (a
// polynomial `poly`, or a text with its primitive), the radius R, the
// exact volume.
function roundShape(rng) {
  const s = rng.pick(['p1', 'p2', 'p3', 'c1', 'c2', 's1']);
  const R = rng.pick([1, 2, 3]);
  const R2 = R * R;
  const N = 'x^2+y^2';
  const polyVol = (p) => cmul(cn(polyInt0(polyMul(p, { 1: q(1) }), R)), cn(2, 'π'));
  if (s === 'p1') {
    const p = { 0: q(R2), 2: q(-1) };
    return { s, R, top: `${R2}-x^2-y^2`, bot: '0', topR: `${R2}-r^2`, botR: '0', height: `${R2}-x^2-y^2`, poly: p, value: polyVol(p), zmax: R2, zmin: 0, names: ['le paraboloïde', 'le plan z = 0'] };
  }
  if (s === 'p2') {
    const k = rng.pick([1, 2]);
    const m = rng.pick([1, 2]);
    const c = rng.pick([0, 1, 2]);
    const d = c + (k + m) * R2;
    const kk = (u) => (u === 1 ? '' : u);
    const p = { 0: q((k + m) * R2), 2: q(-(k + m)) };
    return {
      s, R, top: `${d}-${kk(m)}(${N})`, bot: `${c ? `${c}+` : ''}${kk(k)}(${N})`, topR: `${d}-${kk(m)}r^2`, botR: `${c ? `${c}+` : ''}${kk(k)}r^2`,
      height: `${(k + m) * R2}-${k + m}(${N})`, poly: p, value: polyVol(p), zmax: d, zmin: c, names: ['les deux paraboloïdes', ''],
    };
  }
  if (s === 'p3') {
    const p = { 0: q(R2), 2: q(-1) };
    return { s, R, top: String(R2), bot: N, topR: String(R2), botR: 'r^2', height: `${R2}-(${N})`, poly: p, value: polyVol(p), zmax: R2, zmin: 0, names: ['le plan', 'le paraboloïde'] };
  }
  if (s === 'c1') {
    const p = { 0: q(R), 1: q(-1) };
    return { s, R, top: String(R), bot: `√(${N})`, topR: String(R), botR: 'r', height: `${R}-√(${N})`, poly: p, value: polyVol(p), zmax: R, zmin: 0, names: ['le plan', 'le cône'] };
  }
  if (s === 'c2') {
    // Ice cream: cone below, sphere x² + y² + z² = 2R² above; they meet at r = R.
    const value = cadd(cn(q(R ** 3 * 4, 3), '√2', 'π'), cn(q(-4 * R ** 3, 3), 'π'));
    return {
      s, R, top: `√(${2 * R2}-x^2-y^2)`, bot: `√(${N})`, topR: `√(${2 * R2}-r^2)`, botR: 'r', height: `√(${2 * R2}-x^2-y^2)-√(${N})`,
      F: `(√(${2 * R2}-r^2)-r)×r`, prim: `-(${2 * R2}-r^2)^(3/2)/3-r^3/3`, value, zmax: Math.SQRT2 * R, zmin: 0, names: ['la sphère', 'le cône'],
    };
  }
  // A ball of radius R: z between −√(R² − r²) and √(R² − r²).
  return {
    s, R, top: `√(${R2}-x^2-y^2)`, bot: `-√(${R2}-x^2-y^2)`, topR: `√(${R2}-r^2)`, botR: `-√(${R2}-r^2)`, height: `2√(${R2}-x^2-y^2)`,
    F: `2√(${R2}-r^2)×r`, prim: `-(2/3)(${R2}-r^2)^(3/2)`, value: cn(q(4 * R ** 3, 3), 'π'), zmax: R, zmin: -R, names: ['la demi-sphère du haut', 'celle du bas'],
  };
}

// A tetrahedron under the plane z = c − p·x − q·y, in the first octant.
function tetraShape(rng) {
  for (let t = 0; t < 50; t++) {
    const p = rng.pick([1, 2, 3]);
    const qq = rng.pick([1, 2, 3]);
    const c = rng.pick([2, 3, 4, 6]);
    if (c % p || c % qq) continue;
    const a = c / p;
    const b = c / qq;
    const lin = (u, v) => `${u === 1 ? '' : u}${v}`;
    const plane = `${c}-${lin(p, 'x')}-${lin(qq, 'y')}`;
    const yHi = qq === 1 ? `${c}-${lin(p, 'x')}` : `(${c}-${lin(p, 'x')})/${qq}`;
    return { s: 't', p, q: qq, c, a, b, plane, yHi, value: cn(q(a * b * c, 6)), zmax: c };
  }
  return { s: 't', p: 1, q: 1, c: 2, a: 2, b: 2, plane: '2-x-y', yHi: '2-x', value: cn(q(8, 6)), zmax: 2, fallback: true };
}

const heightR = (sh) => (sh.poly ? polyText(sh.poly) : null);

function roundParts(sh, level) {
  const R = sh.R;
  const disk = `x^2+y^2 ≤ ${R * R}`;
  const box2 = [[-R - 0.2, R + 0.2], [-R - 0.2, R + 0.2]];
  const start = `z = ${sh.top} ; z = ${sh.bot}`;
  const proj = `0 ≤ φ ≤ 2π ; 0 ≤ r ≤ ${R}`;
  let rl = E(proj, `Les surfaces se coupent en r = ${R} : R est le disque x² + y² ≤ ${R * R}`, 'region', 'region');
  if (level === 2) rl = { ...rl, ...blankChain(proj, [[1, 'hi']], PV.vars) };
  const region = { html: 'Les surfaces se coupent au-dessus d\'un disque R. Décris R en polaires :', ask: 'R :', start, judge: domJudge('polar', [disk], box2, proj, { volume: true }), lines: [rl] };
  const D = `${proj} ; ${sh.botR} ≤ z ≤ ${sh.topR}`;
  const cylRegion = [`z ≥ ${sh.bot}`, `z ≤ ${sh.top}`];
  let sl = E(D, `Sur R, ${fr(sh.topR)} ≥ ${fr(sh.botR)} : z va du dessous au dessus`, 'setup', 'setup');
  if (level === 2) sl = { ...sl, ...blankChain(D, [[2, 'lo'], [2, 'hi']], ['r', 'φ', 'z']) };
  const box3 = [...box2, [Math.floor(sh.zmin - 0.3), Math.ceil(sh.zmax + 0.3)]];
  const setup = { html: 'Décris le solide D en cylindriques : z entre la surface du dessous et celle du dessus.', ask: 'D :', start, judge: domJudge('cyl', cylRegion, box3, D, { volume: true }), lines: [sl] };
  const jac = jacJudge('polar', sh.height, { rMax: R, extra: { volume: true } });
  const F = sh.F || `(${heightR(sh)})×r`;
  let jl = E(F, 'Hauteur dessus − dessous, en polaires, fois r', 'polar', 'jac');
  if (level <= 2) jl = { ...jl, ...jacBlank(sh.F ? sh.F.replace(/×r$/, '') : heightR(sh), 'r', jac.vars) };
  const integrand = { html: 'La hauteur est dessus − dessous. Écris-la en polaires, jacobien compris :', ask: '(h − g)·r =', start: sh.height, judge: jac, lines: [jl] };
  const vStart = `int(int(${F},r,0,${R}),φ,0,2π)`;
  const prim = sh.prim || polyText(polyPrim(polyMul(sh.poly, { 1: q(1) })));
  const vlines = [
    E(`int(${F},r,0,${R})×int(1,φ,0,2π)`, 'Bornes constantes : produit', 'compute', 'sep'),
    E(`bracket(${prim},r,0,${R})×bracket(φ,φ,0,2π)`, 'Primitives', 'compute', 'prim'),
    E(ctext(sh.value), 'Évaluer', 'compute', 'eval'),
  ];
  if (level <= 2) vlines[1] = { ...vlines[1], ...tpl(vlines[1].math, [prim], {}) };
  const value = { html: 'Calcule le volume :', ask: 'Vol =', start: vStart, judge: defKnown(vStart, sh.value, { jacFactor: 'r', volume: true }), lines: vlines };
  return level === 1 ? [integrand, value] : [region, setup, integrand, value];
}

function tetraParts(sh, level) {
  const box2 = [[-0.2, sh.a + 0.2], [-0.2, sh.b + 0.2]];
  const start = `z = ${sh.plane} ; z = 0 ; x ≥ 0 ; y ≥ 0`;
  const tri = `0 ≤ x ≤ ${sh.a} ; 0 ≤ y ≤ ${sh.yHi}`;
  let rl = E(tri, `Le plan coupe z = 0 sur la droite ${fr(sh.plane)} = 0 : un triangle`, 'region', 'region');
  if (level === 2) rl = { ...rl, ...blankChain(tri, [[0, 'hi'], [1, 'hi']], ['x', 'y']) };
  const region = { html: 'Le plan coupe le premier quadrant du plan z = 0 selon un triangle R. Décris R (x à l\'extérieur) :', ask: 'R :', start,
    judge: domJudge('cart', [`x ≥ 0`, 'y ≥ 0', `${sh.plane} ≥ 0`], box2, tri, { volume: true, order: ['x', 'y'], shape: 'typeI' }), lines: [rl] };
  const D = `${tri} ; 0 ≤ z ≤ ${sh.plane}`;
  let sl = E(D, 'z va du plan z = 0 au plan incliné', 'setup', 'setup');
  if (level === 2) sl = { ...sl, ...blankChain(D, [[2, 'hi']], ['x', 'y', 'z']) };
  const box3 = [...box2, [-0.2, sh.c + 0.2]];
  const setup = { html: 'Décris le solide D : z entre le dessous et le dessus.', ask: 'D :', start,
    judge: domJudge('cart', ['x ≥ 0', 'y ≥ 0', 'z ≥ 0', `z ≤ ${sh.plane}`], box3, D, { volume: true, dim: 3, order: ['x', 'y', 'z'], shape: 'typeI3' }), lines: [sl] };
  const vStart = `int(int(${sh.plane},y,0,${sh.yHi}),x,0,${sh.a})`;
  const inner = `(${sh.c}-${sh.p === 1 ? '' : sh.p}x)^2/${2 * sh.q}`;
  const vlines = [
    E(`int(${inner},x,0,${sh.a})`, 'On intègre d\'abord en y', 'compute', 'inner'),
    E(`bracket(-(${sh.c}-${sh.p === 1 ? '' : sh.p}x)^3/${6 * sh.p * sh.q},x,0,${sh.a})`, 'Primitive en x', 'compute', 'prim'),
    E(ctext(sh.value), 'Évaluer', 'compute', 'eval'),
  ];
  if (level <= 2) vlines[0] = { ...vlines[0], ...tpl(vlines[0].math, [String(2 * sh.q)], {}) };
  const value = { html: 'Vol = ∬_R (dessus − dessous) dx dy :', ask: 'Vol =', start: vStart, judge: defKnown(vStart, sh.value, { volume: true }), lines: vlines };
  return level === 1 ? [value] : [region, setup, value];
}

export const VOL_SUB = [
  { id: 'region', label: 'la projection R', skill: 'a2-domain-describe' },
  { id: 'setup', label: 'dessus − dessous', skill: SK },
  { id: 'polar', label: 'passer en polaires', skill: 'a2-polar-int' },
  { id: 'compute', label: 'calculer l\'intégrale', skill: 'a2-fubini-rect' },
];
const CHOICES = [
  { id: 'region', label: 'Égaler les deux surfaces pour trouver R' },
  { id: 'setup', label: 'z entre la surface du dessous et celle du dessus' },
  { id: 'jac', label: 'Hauteur en polaires, fois r' },
  { id: 'inner', label: 'Intégrer d\'abord en y' },
  { id: 'sep', label: 'Séparer en produit' },
  { id: 'prim', label: 'Primitives' },
  { id: 'eval', label: 'Évaluer' },
  { id: 'swap', label: 'z de la surface du dessus à celle du dessous', rule: 'a2_volume_surfaces_swapped', why: 'Le volume serait négatif : z va du dessous vers le dessus.' },
];
const topDecision = (sh) => ({
  kind: 'decision', prompt: 'Au-dessus de R, quelle surface est en haut ?', options: [
    { id: 'top', label: `z = ${fr(sh.top)}`, valid: true },
    { id: 'bot', label: `z = ${fr(sh.bot)}`, valid: false, rule: 'a2_volume_surfaces_swapped', why: `Au centre de R (x = y = 0), ${fr(sh.top)} vaut plus que ${fr(sh.bot)}.` },
  ],
});
const coordDecision = (round) => ({
  kind: 'decision', prompt: 'Quelles coordonnées pour R ?', options: [
    { id: 'polar', label: 'Polaires', valid: round, why: round ? '' : 'R est un triangle : ses côtés sont des droites, les cartésiennes vont mieux.' },
    { id: 'cart', label: 'Cartésiennes', valid: !round, why: round ? 'R est un disque : en polaires, les bornes sont constantes.' : '' },
  ],
});

export function volume(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return volMcq(rng, opts);
  const round = level === 1 ? rng.next() < 0.8 : rng.next() < 0.75;
  const sh = round ? roundShape(rng) : tetraShape(rng);
  const ps = round ? roundParts(sh, level) : tetraParts(sh, level);
  if (level === 3) ps[0].pre = [coordDecision(round), ...(sh.s === 't' ? [] : [topDecision(sh)])];
  const { start, judge, script } = partsScript(ps, level, CHOICES);
  const what = round
    ? `du solide compris entre les surfaces ${MT(`z = ${sh.top}`, XYZ)} et ${MT(`z = ${sh.bot}`, XYZ)}`
    : `du tétraèdre sous le plan ${MT(`z = ${sh.plane}`, XYZ)}, dans le premier octant (x, y, z ≥ 0)`;
  const given = level === 1 ? (round ? ` La projection est le disque R : ${MT(`x^2+y^2 ≤ ${sh.R * sh.R}`, XYZ)}, et ${MT(`z = ${sh.top}`, XYZ)} est au-dessus.` : ` R : ${MT(`0 ≤ x ≤ ${sh.a} ; 0 ≤ y ≤ ${sh.yHi}`, XYZ)}.`) : '';
  return linesItem({
    skill: SK, level, mode: modeOf(level), start, judge, script,
    prompt: `Calcule le volume ${what}.${given}`,
    hints: H('Volume = ∬ (dessus − dessous) sur la projection R ; on trouve R en égalant les deux surfaces.',
      round ? `R est le disque x² + y² ≤ ${sh.R * sh.R} ; la hauteur est ${MT(sh.height, XYZ)}.` : `R : 0 ≤ x ≤ ${sh.a}, 0 ≤ y ≤ ${fr(sh.yHi)} ; la hauteur est ${MT(sh.plane, XYZ)}.`,
      round ? MT(`int(int(${sh.F || `(${heightR(sh)})×r`},r,0,${sh.R}),φ,0,2π)`, PV) : MT(`int(int(${sh.plane},y,0,${sh.yHi}),x,0,${sh.a})`, XYZ)),
    subgoals: VOL_SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${sh.s}:${sh.R ?? `${sh.p}${sh.q}${sh.c}`}:${sh.top ?? ''}`, exam: examTag(opts), fallback: !!sh.fallback,
  });
}

function volMcq(rng, opts) {
  const sh = roundShape(rng);
  const options = [{ html: MT(ctext(sh.value)), correct: true, x: cfloat(sh.value) }];
  const add = (v, rule) => {
    if (!v || czero(v) || !closedOk(v)) return;
    const x = cfloat(v);
    if (options.some((o) => Math.abs(o.x - x) < 1e-9 * (1 + Math.abs(x)))) return;
    if (options.length < 4) options.push({ html: MT(ctext(v)), correct: false, rule, x });
  };
  // Without r: 2π∫ h dr (polynomial heights).
  if (sh.poly) add(cmul(cn(polyInt0(sh.poly, sh.R)), cn(2, 'π')), 'a2_jacobian_forgot');
  add(cscale(sh.value, -1), 'a2_volume_surfaces_swapped');
  add(cscale(sh.value, 2), 'a2_jacobian_forgot');
  add(cscale(sh.value, q(1, 2)), 'a2_volume_surfaces_swapped');
  add(cscale(sh.value, 4), 'a2_jacobian_forgot');
  return mcq({
    skill: SK, level: 4, prompt: `Le volume du solide compris entre ${MT(`z = ${sh.top}`, XYZ)} et ${MT(`z = ${sh.bot}`, XYZ)} vaut :`,
    options: options.map(({ x, ...o }) => o),
    solution: [{ html: `R : x² + y² ≤ ${sh.R * sh.R} ; Vol = ${MT(`int(int(${sh.F || `(${heightR(sh)})×r`},r,0,${sh.R}),φ,0,2π)`, PV)} = ${MT(ctext(sh.value))}`, note: '' }],
    key: `mcq:${sh.s}:${sh.R}:${sh.top}`, exam: examTag(opts, 3),
  }, rng);
}

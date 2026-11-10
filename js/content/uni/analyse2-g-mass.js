// a2-mass-center (module A2, part g, step U6): mass and centre of mass.
// Catalogue docs/universite/A2-analyse-2.md, entry `a2-mass-center` (no
// exam variant, exam weight 0).
//
// Parts: the mass M = ∬ ρ (`definite`), a decision on the symmetry, the
// moment's integrand with its jacobian (`equiv` with cfg.jac), the moment
// (`definite`), then ȳ = moment / M (`definite`). Half-disks and quarter
// disks in polar coordinates (ρ = 1, y or r), triangles in cartesian
// coordinates (ρ = 1 or x); level 5 adds the half-ball (z̄ = 3R/8).

import { MT, linesItem, A2_KEYS, H, E, modeOf, partsScript, tpl } from './a2-kit.js';
import { q, cn, cmul, ctext, powInt, angInt, prod, rk, trig, piText, jacJudge, defKnown, defText, jacBlank } from './analyse2-g-kit.js';
import { angPrim } from './analyse2-g-polar.js';

const SK = 'a2-mass-center';
const XY = { vars: ['x', 'y'] };

// {q, e}: q·π^e from a one-term closed number.
function qpi(v) {
  if (!v.length) return { q: q(0), e: 0 };
  const [t] = v;
  return { q: t.q, e: t.f.length };
}
const qpiText = ({ q: c, e }) => {
  if (e === 0) return c.toString();
  if (e === 1) return ctext(cn(c, 'π'));
  // c/π
  const n = c.n;
  return c.d === 1 ? `${n}/π` : `${n}/(${c.d}π)`;
};
const ratio = (a, b) => ({ q: a.q.div(b.q), e: a.e - b.e });
const asFac = (t) => (/^[0-9]+$/.test(t) ? t : `(${t})`);

// ---------- polar shapes ----------
// A density: its text in x, y and its polar factor (r^a·sin^b φ).
const RHO = {
  1: { cart: '1', a: 0, s: 0, name: 'ρ = 1' },
  y: { cart: 'y', a: 1, s: 1, name: 'ρ(x, y) = y' },
  r: { cart: '√(x^2+y^2)', a: 1, s: 0, name: 'ρ(x, y) = √(x² + y²)' },
};
const SHAPES = {
  half: { a: q(0), b: q(1), cond: 'y ≥ 0', rhos: ['1', 'y', 'r'], name: 'le demi-disque' },
  quarter: { a: q(0), b: q(1, 2), cond: 'x ≥ 0 ; y ≥ 0', rhos: ['1', 'r'], name: 'le quart de disque' },
};

// The polar integrand r^k·cos^i φ·sin^j φ (jacobian included) and its integral.
function polarPiece(k, i, j, R, sh) {
  const F = prod(rk(k), trig('cos', i), trig('sin', j));
  const start = `int(int(${F},r,0,${R}),φ,${piText(sh.a)},${piText(sh.b)})`;
  const value = cmul(powInt(k, 0, R), angInt(i, j, sh.a, sh.b));
  const lines = [
    E(`int(${rk(k)},r,0,${R})×int(${prod(trig('cos', i), trig('sin', j))},φ,${piText(sh.a)},${piText(sh.b)})`, 'Produit de deux intégrales', null, 'sep'),
    E(`bracket(r^${k + 1}/${k + 1},r,0,${R})×bracket(${angPrim(i, j)},φ,${piText(sh.a)},${piText(sh.b)})`, 'Primitives', null, 'prim'),
    E(ctext(value), 'Évaluer', null, 'eval'),
  ];
  return { F, start, value, lines };
}

function polarItem(level, rng) {
  const shId = rng.pick(['half', 'half', 'quarter']);
  const sh = SHAPES[shId];
  const rhoId = rng.pick(sh.rhos);
  const rho = RHO[rhoId];
  const R = rng.pick([1, 2, 3]);
  const coord = shId === 'half' ? 'y' : 'x';
  // Mass: ρ·r = r^(1 + a)·sin^s φ ; moment of y: r^(2 + a)·sin^(s + 1) ; of x: r^(2 + a)·cos·sin^s.
  const mass = polarPiece(1 + rho.a, 0, rho.s, R, sh);
  const mom = coord === 'y' ? polarPiece(2 + rho.a, 0, rho.s + 1, R, sh) : polarPiece(2 + rho.a, 1, rho.s, R, sh);
  const M = qpi(mass.value);
  const Mo = qpi(mom.value);
  const bar = ratio(Mo, M);
  const region = `x^2+y^2 ≤ ${R * R} ; ${sh.cond}`;
  const sub = (l, sg) => ({ ...l, subgoal: sg });
  const massLines = mass.lines.map((l) => sub(l, 'mass'));
  const momLines = mom.lines.map((l) => sub(l, 'moment'));
  if (level <= 2) momLines[1] = { ...momLines[1], ...tpl(momLines[1].math, [`r^${2 + rho.a + 1}/${2 + rho.a + 1}`], {}) };
  const parts = [];
  if (level >= 2) parts.push({ html: 'La masse M = ∬ ρ dx dy, en polaires :', ask: 'M =', start: mass.start, judge: defKnown(mass.start, mass.value, { jacFactor: 'r' }), lines: massLines });
  const cartMom = rhoId === '1' ? coord : rhoId === 'y' ? (coord === 'y' ? 'y^2' : 'x×y') : `${coord}√(x^2+y^2)`;
  const jac = jacJudge('polar', cartMom, { rMax: R });
  let jl = E(mom.F, `${coord} = r ${coord === 'y' ? 'sin' : 'cos'} φ, et le jacobien r`, 'moment', 'jac');
  if (level <= 2) {
    const subs = { x: 'r×cos(φ)', y: 'r×sin(φ)' };
    const cartSub = cartMom.replace(/√\(x\^2\+y\^2\)/, 'r').replace(/x/g, subs.x).replace(/y/g, subs.y).replace('^2', '^2');
    jl = { ...jl, ...jacBlank(cartMom === 'y^2' ? '(r×sin(φ))^2' : cartSub, 'r', jac.vars) };
  }
  parts.push({ html: `Le moment ∬ ${coord}·ρ dx dy : écris l'intégrande en polaires, jacobien compris.`, ask: `${coord}·ρ·r =`, start: cartMom, judge: jac, lines: [jl] });
  parts.push({ html: `Calcule le moment ∬ ${coord}·ρ dx dy :`, ask: `M_${coord} =`, start: mom.start, judge: defKnown(mom.start, mom.value, { jacFactor: 'r' }), lines: momLines });
  const div = `${asFac(qpiText(Mo))}/${asFac(qpiText(M))}`;
  let dl = E(qpiText(bar), 'Moment divisé par la masse', 'divide', 'div');
  if (level === 1) dl = { ...dl, ...tpl(dl.math, [qpiText(bar)], {}) };
  parts.push({ html: `${coord === 'y' ? 'ȳ' : 'x̄'} = moment / masse :`, ask: `${coord === 'y' ? 'ȳ' : 'x̄'} =`, start: div, judge: defText(div, qpiText(bar)), lines: [dl] });
  const sym = shId === 'half'
    ? { kind: 'decision', prompt: 'Quelle coordonnée du centre de masse est nulle par symétrie ?', options: [
      { id: 'x', label: 'x̄ = 0', valid: true, why: '' },
      { id: 'y', label: 'ȳ = 0', valid: false, why: `D et ρ sont symétriques par rapport à l'axe y (x ↦ −x), pas par rapport à l'axe x : D est au-dessus de l'axe x, donc ȳ > 0.` },
      { id: 'none', label: 'Aucune', valid: false, why: `x ↦ −x laisse D et ρ inchangés : les moments en x s'annulent, x̄ = 0.` },
    ] }
    : { kind: 'decision', prompt: 'Que dit la symétrie de D et ρ par rapport à la droite y = x ?', options: [
      { id: 'eq', label: 'x̄ = ȳ', valid: true, why: '' },
      { id: 'zero', label: 'x̄ = ȳ = 0', valid: false, why: 'D est dans le premier quadrant : x et y y sont positifs, les moments aussi.' },
      { id: 'none', label: 'Rien', valid: false, why: 'Échanger x et y laisse D et ρ inchangés : x̄ = ȳ.' },
    ] };
  if (level === 2 || level === 3) parts[0].pre = [sym];
  const note = shId === 'half' ? 'Par symétrie (x ↦ −x), x̄ = 0 : il reste ȳ.' : 'Par symétrie (x ↔ y), ȳ = x̄ : il suffit de calculer x̄.';
  if (level === 1 || level >= 4) parts[0].pre = [{ kind: 'note', html: note }];
  const { start, judge, script } = partsScript(parts, level, CHOICES);
  const given = level === 1 ? ` La masse est M = ${MT(qpiText(M))}.` : '';
  const ask = shId === 'half' ? 'son centre de masse (x̄, ȳ)' : 'son centre de masse (x̄, ȳ)';
  return linesItem({
    skill: SK, level, mode: modeOf(level), start, judge, script,
    prompt: `Une plaque occupe ${sh.name} D = {${MT(region, XY)}}, avec la densité ${rho.name}. Trouve ${ask}.${given}`,
    hints: H('Centre = moment divisé par la masse ; une coordonnée est donnée par la symétrie.',
      `${MT(mom.start, { vars: ['r', 'φ'] })} = ${MT(ctext(mom.value))}`,
      `M = ${MT(qpiText(M))} et le moment vaut ${MT(qpiText(Mo))}.`),
    subgoals: SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${shId}:${rhoId}:${R}`,
  });
}

// ---------- triangles (cartesian) ----------
// 0 ≤ y ≤ x ≤ a, ρ = 1 or x: M, the moments in x and y.
function triangleItem(level, rng) {
  const a = rng.pick([1, 2, 3, 6]);
  const rhoX = rng.next() < 0.4;
  const rho = rhoX ? 'x' : '1';
  const piece = (f, inner, prim, value, sg) => {
    const start = `int(int(${f},y,0,x),x,0,${a})`;
    return { start, value, lines: [E(`int(${inner},x,0,${a})`, 'On intègre d\'abord en y, de 0 à x', sg, 'inner'), E(`bracket(${prim},x,0,${a})`, 'Primitive en x', sg, 'prim'), E(value.toString(), 'Évaluer', sg, 'eval')] };
  };
  const pw = (k) => q(a ** k);
  const mass = rhoX ? piece('x', 'x^2', 'x^3/3', pw(3).mul(q(1, 3)), 'mass') : piece('1', 'x', 'x^2/2', pw(2).mul(q(1, 2)), 'mass');
  const mx = rhoX ? piece('x^2', 'x^3', 'x^4/4', pw(4).mul(q(1, 4)), 'moment') : piece('x', 'x^2', 'x^3/3', pw(3).mul(q(1, 3)), 'moment');
  const my = rhoX ? piece('x×y', 'x^3/2', 'x^4/8', pw(4).mul(q(1, 8)), 'moment') : piece('y', 'x^2/2', 'x^3/6', pw(3).mul(q(1, 6)), 'moment');
  const xb = mx.value.div(mass.value);
  const yb = my.value.div(mass.value);
  const def = (p) => defText(p.start, p.value.toString());
  const divPart = (name, num, den, v) => {
    const start = `${asFac(num.toString())}/${asFac(den.toString())}`;
    return { html: `${name} = moment / masse :`, ask: `${name} =`, start, judge: defText(start, v.toString()), lines: [E(v.toString(), 'Diviser', 'divide', 'div')] };
  };
  const parts = [
    { html: 'La masse M = ∬ ρ :', ask: 'M =', start: mass.start, judge: def(mass), lines: mass.lines },
    { html: 'Le moment ∬ x·ρ :', ask: 'M_x =', start: mx.start, judge: def(mx), lines: mx.lines },
    divPart('x̄', mx.value, mass.value, xb),
    { html: 'Le moment ∬ y·ρ :', ask: 'M_y =', start: my.start, judge: def(my), lines: my.lines },
    divPart('ȳ', my.value, mass.value, yb),
  ];
  if (level <= 2) parts[1].lines[1] = { ...parts[1].lines[1], ...tpl(parts[1].lines[1].math, [rhoX ? 'x^4/4' : 'x^3/3'], {}) };
  if (level === 2 || level === 3) parts[0].pre = [{ kind: 'decision', prompt: 'Le triangle 0 ≤ y ≤ x ≤ a a-t-il une symétrie qui donne une coordonnée ?', options: [
    { id: 'none', label: 'Non : il faut calculer x̄ et ȳ', valid: true },
    { id: 'eq', label: 'Oui, x̄ = ȳ', valid: false, why: 'Échanger x et y envoie le triangle sous la diagonale au-dessus : D change, la symétrie ne s\'applique pas.' },
  ] }];
  const { start, judge, script } = partsScript(parts, level, CHOICES);
  return linesItem({
    skill: SK, level, mode: modeOf(level), start, judge, script,
    prompt: `Une plaque occupe le triangle D = {${MT(`0 ≤ y ≤ x ≤ ${a}`, XY)}}, avec la densité ${rhoX ? 'ρ(x, y) = x' : 'ρ = 1'}. Trouve son centre de masse (x̄, ȳ).${level === 1 ? ` La masse est M = ${MT(mass.value.toString())}.` : ''}`,
    hints: H('x̄ = (1/M)∬ x·ρ et ȳ = (1/M)∬ y·ρ ; ici aucune symétrie ne donne une coordonnée.',
      `D : 0 ≤ x ≤ ${a}, 0 ≤ y ≤ x ; M = ${MT(mass.value.toString())}.`,
      `x̄ = ${MT(xb.toString())} et ȳ = ${MT(yb.toString())}.`),
    subgoals: SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:tri:${rho}:${a}`,
  });
}

// ---------- level 5: the half-ball (z̄ = 3R/8) ----------
function halfBall(rng) {
  const R = rng.pick([1, 2, 3, 4]);
  const Ms = `int(int(int(r^2×sin(θ),r,0,${R}),θ,0,π/2),φ,0,2π)`;
  const M = { q: q(2 * R ** 3, 3), e: 1 };
  const Zs = `int(int(int(r^3×cos(θ)×sin(θ),r,0,${R}),θ,0,π/2),φ,0,2π)`;
  const Z = { q: q(R ** 4, 4), e: 1 };
  const zb = ratio(Z, M);
  const div = `${asFac(qpiText(Z))}/${asFac(qpiText(M))}`;
  const parts = [
    { html: 'La masse (le volume, ρ = 1), en sphériques :', ask: 'M =', start: Ms, judge: defText(Ms, qpiText(M)), pre: [{ kind: 'note', html: 'Par symétrie autour de l\'axe z, x̄ = ȳ = 0 : il reste z̄.' }],
      lines: [E(`int(r^2,r,0,${R})×int(sin(θ),θ,0,π/2)×int(1,φ,0,2π)`, 'Produit', 'mass', 'sep'), E(qpiText(M), 'Évaluer', 'mass', 'eval')] },
    { html: 'Le moment ∭ z dV :', ask: 'M_z =', start: Zs, judge: defText(Zs, qpiText(Z)),
      lines: [E(`int(r^3,r,0,${R})×int(cos(θ)×sin(θ),θ,0,π/2)×int(1,φ,0,2π)`, 'Produit', 'moment', 'sep'), E(qpiText(Z), 'Évaluer', 'moment', 'eval')] },
    { html: 'z̄ = moment / masse :', ask: 'z̄ =', start: div, judge: defText(div, qpiText(zb)), lines: [E(qpiText(zb), 'Diviser', 'divide', 'div')] },
  ];
  const { start, judge, script } = partsScript(parts, 5, CHOICES);
  return linesItem({
    skill: SK, level: 5, mode: 'free', start, judge, script,
    prompt: `Trouve le centre de masse de la demi-boule homogène D = {${MT(`x^2+y^2+z^2 ≤ ${R * R} ; z ≥ 0`, { vars: ['x', 'y', 'z'] })}}.`,
    hints: [], noHints: true, subgoals: SUB, keys: A2_KEYS, key: `${SK}:5:ball:${R}`,
  });
}

const SUB = [
  { id: 'mass', label: 'la masse', skill: SK },
  { id: 'moment', label: 'le moment, en polaires', skill: 'a2-polar-int' },
  { id: 'divide', label: 'moment / masse', skill: SK },
];
const CHOICES = [
  { id: 'sep', label: 'Séparer en produit' },
  { id: 'inner', label: 'Intégrer d\'abord en y' },
  { id: 'jac', label: 'Passer en polaires, avec r' },
  { id: 'prim', label: 'Primitives' },
  { id: 'eval', label: 'Évaluer' },
  { id: 'div', label: 'Diviser le moment par la masse' },
  { id: 'nojac', label: 'Passer en polaires, sans r', rule: 'a2_jacobian_forgot', why: 'dx dy = r dr dφ.' },
];

export function massCenter(level, rng) {
  if (level === 5) return rng.next() < 0.5 ? halfBall(rng) : polarItem(5, rng);
  return level >= 2 && rng.next() < 0.3 ? triangleItem(level, rng) : polarItem(level, rng);
}

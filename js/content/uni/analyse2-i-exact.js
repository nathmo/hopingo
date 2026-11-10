// Generators of module A2, part i (unit `analyse2`, step U6): exact
// equations (a2-ode-exact) and linear systems X′ = AX (a2-ode-system).
// Catalogue: docs/universite/A2-analyse-2.md.
//
// a2-ode-exact: built from H (a polynomial of degree ≤ 3 in x, y with a
// mixed term, or Arctg(x² + y), or e^(xy) + cy²); M = H_x, N = H_y. Parts:
// M_y and N_x (equiv in x, y), H = ∫M dx + C (antideriv in x, the constant
// standing for φ(y)), φ′(y) = N − ∂/∂y ∫M dx (equiv), then the relations
// H = C, the constant, H = C₀ (ode, final 'implicit'). The trap
// a2_exact_phi_forgot reads cfg._exact (H without φ).
//
// a2-ode-system: built from P (integer eigenvectors, det ±1 or ±2) and D
// (distinct integer eigenvalues), A = PDP⁻¹ integer, X(0) = P·(c₁, c₂).
// Parts: the eigenvalues (solset in λ), one eigenvector each (eigvec), then
// the components « x = … ; y = … » judged by the `ode` judge with a vector
// unknown (cfg.system, js/judges/ode-system.js), the constants, X(t).

import { Q } from '../../math/rational.js';
import { linesItem, examTag, A2_KEYS } from './a2-kit.js';
import { N, H, E, fr } from './analyse1-e-kit.js';
import { assemble } from './analyse2-i-part.js';
import { ML } from './alglin-kit.js';
import { q, cmul, sum, expText, powText, blankMatches, blankValues, blankTail, mcq4, M } from './analyse2-i-kit.js';

// ======================================================================
// a2-ode-exact
// ======================================================================

const EX = 'a2-ode-exact';
const EX_SUB = [
  { id: 'test', label: 'M_y = N_x', skill: 'a2-partials' },
  { id: 'integrate', label: 'H = ∫ M dx', skill: EX },
  { id: 'adjust', label: 'φ(y)', skill: EX },
  { id: 'ic', label: 'la constante', skill: EX },
];

// Monomials c·xⁱyʲ: [{c, i, j}].
const mono = ({ c, i, j }) => cmul(c, [powText(i, 'x'), powText(j, 'y')].filter(Boolean).join(' '));
const polyT = (ms) => sum(ms.filter((m) => m.c !== 0).map(mono));
const dx = (ms) => ms.filter((m) => m.i > 0).map((m) => ({ c: m.c * m.i, i: m.i - 1, j: m.j }));
const dy = (ms) => ms.filter((m) => m.j > 0).map((m) => ({ c: m.c * m.j, i: m.i, j: m.j - 1 }));
const valAt = (ms, x, y) => ms.reduce((s, m) => s + m.c * x ** m.i * y ** m.j, 0);

function exactData(rng) {
  for (let t = 0; t < 200; t++) {
    const kind = rng.pick(['poly', 'poly', 'poly', 'atan', 'exp']);
    const x0 = rng.pick([0, 1, -1]);
    const y0 = rng.pick([1, -1, 2]);
    if (kind === 'poly') {
      const [i, j] = rng.pick([[1, 1], [2, 1], [1, 2]]);
      const a = rng.pick([1, 2, 3, -1]);
      const xi = rng.pick([1, 2, 3]);
      const b = rng.pick([1, 2, 3, -1, -2]);
      const yj = rng.pick([1, 2, 2, 3]);
      const c = rng.pick([1, 2, -1]);
      const Hm = [{ c: a, i, j }, { c: b, i: xi, j: 0 }, { c, i: 0, j: yj }];
      const H0m = Hm.filter((m) => m.i > 0);
      const phim = Hm.filter((m) => m.i === 0);
      const Mm = dx(Hm);
      const Nm = dy(Hm);
      const n0 = valAt(Nm, x0, y0);
      if (!n0) continue;
      // y ≡ y₀ would be a constant solution (M(x, y₀) = 0 for all x): skip.
      if (valAt(Mm, 0.3, y0) === 0 && valAt(Mm, 1.7, y0) === 0) continue;
      return {
        kind, x0, y0, H: polyT(Hm), H0: polyT(H0m), phi: polyT(phim), dphi: polyT(dy(phim)), M: polyT(Mm), N: polyT(Nm),
        My: polyT(dy(Mm)), Nx: polyT(dx(Nm)), C0: valAt(Hm, x0, y0), C0noPhi: valAt(H0m, x0, y0), Hy0: polyT(dy(H0m)),
      };
    }
    if (kind === 'atan') {
      // QCM 13 Q3: H = Arctg(x² + y), φ = 0. C₀ = arctan(x₀² + y₀).
      const u = x0 * x0 + y0;
      const C0 = u === 0 ? '0' : u === 1 ? 'π/4' : u === -1 ? '-π/4' : `arctan(${u})`;
      return {
        kind, x0, y0, H: 'arctan(x^2+y)', H0: 'arctan(x^2+y)', phi: '0', dphi: '0', M: '2x/(1+(x^2+y)^2)', N: '1/(1+(x^2+y)^2)',
        My: '-4x(x^2+y)/(1+(x^2+y)^2)^2', Nx: '-4x(x^2+y)/(1+(x^2+y)^2)^2', C0, C0noPhi: null, Hy0: '1/(1+(x^2+y)^2)',
      };
    }
    // H = e^(xy) + c·y²: φ = cy².
    const c = rng.pick([1, 2, -1]);
    if (x0 === 0 && y0 === 1 && c === -1) continue;
    const e0 = x0 * y0;
    const C0 = sum([e0 === 0 ? '1' : e0 === 1 ? 'e' : `e^(${e0})`, N(q(c * y0 * y0))]);
    return {
      kind, x0, y0, H: `e^(x y)+${cmul(c, 'y^2')}`.replace('+-', '-'), H0: 'e^(x y)', phi: cmul(c, 'y^2'), dphi: cmul(2 * c, 'y'),
      M: 'y e^(x y)', N: sum(['x e^(x y)', cmul(2 * c, 'y')]), My: 'e^(x y)+x y e^(x y)', Nx: 'e^(x y)+x y e^(x y)',
      C0, C0noPhi: e0 === 0 ? '1' : e0 === 1 ? 'e' : `e^(${e0})`, Hy0: 'x e^(x y)',
    };
  }
  return null;
}
const EX_FALLBACK = {
  kind: 'poly', x0: 0, y0: 1, H: 'x^2 y+3x+2y^2', H0: 'x^2 y+3x', phi: '2y^2', dphi: '4y', M: '2x y+3', N: 'x^2+4y', My: '2x', Nx: '2x', C0: 2, C0noPhi: 0, Hy0: 'x^2', fallback: true,
};

const EX_CHOICES = [
  { id: 'My', label: 'Calculer ∂M/∂y' }, { id: 'Nx', label: 'Calculer ∂N/∂x' },
  { id: 'intM', label: 'Intégrer M par rapport à x' }, { id: 'phi', label: 'Ajuster φ(y) avec N' },
  { id: 'rel', label: 'Écrire H(x, y) = C' }, { id: 'consts', label: 'Fixer C avec la condition initiale' }, { id: 'final', label: 'Écrire la relation finale' },
  { id: 'nophi', label: 'Écrire H = ∫ M dx = C directement', rule: 'a2_exact_phi_forgot', why: 'La « constante » d\'intégration en x dépend de y : il faut φ(y), fixée par H_y = N.' },
];

function exactParts(d, level) {
  const C0 = typeof d.C0 === 'number' ? N(q(d.C0)) : d.C0;
  const eq = `(${d.M})+(${d.N})y'=0`;
  const yr = [Math.min(-3, d.y0 - 2) - 0.1, Math.max(3, d.y0 + 2) + 0.3]; // integers off the scan grid
  const noPhi = d.phi === '0' ? [] : [`${d.H0} = C`, ...(d.C0noPhi !== null ? [`${d.H0} = ${typeof d.C0noPhi === 'number' ? N(q(d.C0noPhi)) : d.C0noPhi}`] : [])];
  const ode = { kind: 'ode', eq, order: 1, ic: { x: d.x0, y: d.y0 }, final: 'implicit', yRange: yr, firstIntegral: true, _exact: { noPhi, ctx: { N: fr(d.N), Hy: fr(d.Hy0), phi: fr(d.phi) } } };
  const xy = { kind: 'equiv', vars: ['x', 'y'], target: 'no-prime' };
  const rel = [E(`${d.H} = C`, 'Les solutions vérifient H(x, y) = C', 'ic', 'rel'), E(`C = ${C0}`, `y(${fr(d.x0)}) = ${fr(d.y0)}`, 'ic', 'consts'), E(`${d.H} = ${C0}`, 'La relation cherchée', 'ic', 'final')];
  const intL = E(`${d.H0}+C`, 'Primitive en x : la constante C peut dépendre de y (c\'est φ(y))', 'integrate', 'intM');
  const phiL = E(d.dphi, 'φ′(y) = N − ∂/∂y(∫ M dx)', 'adjust', 'phi');
  if (level <= 2) {
    Object.assign(rel[1], blankValues(rel[1].math));
    if (level === 1) Object.assign(rel[0], blankTail(rel[0].math, `${d.phi === '0' ? d.H : d.phi} = C`.replace(/ = C$/, '')));
    Object.assign(phiL, blankMatches(phiL.math, /-?\d+(?=[a-zA-Z])/g, 1));
  }
  const dec = { kind: 'decision', prompt: `∂M/∂y = ∂N/∂x ?`, options: [
    { id: 'yes', label: 'Oui : l\'équation est exacte', valid: true },
    { id: 'no', label: 'Non : elle n\'est pas exacte', valid: false, why: `${M(d.My)} = ${M(d.Nx)} : les deux dérivées sont égales.` },
  ] };
  const integ = { kind: 'decision', prompt: 'Pour trouver H :', options: [
    { id: 'M', label: 'intégrer M par rapport à x, puis ajuster φ(y)', valid: true, ref: true },
    { id: 'N', label: 'intégrer N par rapport à y, puis ajuster ψ(x)', valid: true, quality: 'poor', why: 'Juste aussi ; ici on intègre M en x, comme le corrigé.' },
    { id: 'nophi', label: 'H = ∫ M dx, sans rien ajouter', valid: false, rule: 'a2_exact_phi_forgot', why: 'La « constante » d\'intégration en x peut dépendre de y : H = ∫ M dx + φ(y).' },
  ] };
  return {
    eq,
    parts: [
      { html: `Teste l'exactitude : ∂M/∂y avec M = ${M(d.M)}.`, start: `pd(${d.M},y)`, judge: xy, lines: [E(d.My, 'Dériver M par rapport à y', 'test', 'My')] },
      { html: `∂N/∂x avec N = ${M(d.N)} :`, ask: '∂N/∂x =', start: `pd(${d.N},x)`, judge: xy, lines: [E(d.Nx, 'Dériver N par rapport à x', 'test', 'Nx')] },
      { html: 'H = ∫ M dx (à une fonction φ(y) près) :', ask: 'H =', start: `int(${d.M},x)`, judge: { kind: 'antideriv', v: 'x', vars: ['x', 'y'] }, pre: level >= 2 ? [dec, ...(level >= 3 ? [integ] : [])] : [], lines: [intL] },
      { html: `H_y doit valoir N : φ′(y) = N − ∂/∂y(${M(d.H0)}) :`, ask: 'φ′(y) =', start: `${d.N}-pd(${d.H0},y)`, judge: xy, lines: [phiL] },
      { html: 'Les solutions, puis la condition initiale :', ask: 'relation :', start: eq, judge: ode, lines: rel },
    ],
  };
}

function exactItem(level, rng, opts, d) {
  const { eq, parts } = exactParts(d, level);
  const { start, judge, script } = assemble(parts, level, EX_CHOICES);
  return linesItem({
    skill: EX, level, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', start, judge, script,
    prompt: `Résous ${M(`(${d.M})`)} dx + ${M(`(${d.N})`)} dy = 0 avec y(${fr(d.x0)}) = ${fr(d.y0)} : la solution vérifie une relation H(x, y) = C.`,
    hints: H('Vérifie ∂M/∂y = ∂N/∂x, puis cherche H avec H_x = M : H = ∫ M dx + φ(y).',
      `H = ${M(d.H0)} + φ(y), et H_y doit valoir ${M(d.N)}.`, `φ(y) = ${M(d.phi)} : ${M(`${d.H} = C`)}.`),
    subgoals: EX_SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${EX}:${level}:${eq}:${d.x0}:${d.y0}`, exam: examTag(opts), fallback: !!d.fallback,
    baits: ['a2_exact_phi_forgot'],
  });
}

// QCM 13 Q3: the relation satisfied by the solution.
function exactMcq(rng, opts, d) {
  const C0 = typeof d.C0 === 'number' ? N(q(d.C0)) : d.C0;
  const right = M(`${d.H} = ${C0}`);
  const wrongs = [];
  if (d.phi !== '0' && d.C0noPhi !== null) wrongs.push({ html: M(`${d.H0} = ${typeof d.C0noPhi === 'number' ? N(q(d.C0noPhi)) : d.C0noPhi}`), rule: 'a2_exact_phi_forgot' });
  if (d.phi !== '0') wrongs.push({ html: M(`${sum([d.H0, cmul(2, `(${d.phi})`)])} = ${C0}`) });
  wrongs.push({ html: M(`${d.H} = ${typeof d.C0 === 'number' ? N(q(-d.C0 || 1)) : `-${C0}`}`) });
  const fillers = [{ html: M(`${d.H} = 0`) }, { html: M(`${d.H} = 1`) }, { html: M(`${d.H0} = 0`) }];
  return mcq4({
    skill: EX, level: 4, prompt: `La solution de ${M(`(${d.M})`)} + ${M(`(${d.N})y'`)} = 0 avec y(${fr(d.x0)}) = ${fr(d.y0)} vérifie :`,
    right, wrongs, fillers, key: `${EX}:mcq:${d.H}:${d.x0}:${d.y0}`,
    solution: [{ html: `∂M/∂y = ${M(d.My)} = ∂N/∂x : exacte.`, note: '' }, { html: `H = ${M(d.H)}`, note: 'H_x = M, H_y = N' }, { html: right, note: '' }],
    exam: examTag(opts), expectedSec: 150, fallback: !!d.fallback,
  }, rng);
}

export function genExact(level, rng, profile, opts = {}) {
  const d = exactData(rng) || EX_FALLBACK;
  if (opts.exam === 'mcq') return exactMcq(rng, opts, d);
  return exactItem(level, rng, opts, d);
}

// ======================================================================
// a2-ode-system
// ======================================================================

const SY = 'a2-ode-system';
const SY_SUB = [
  { id: 'eigval', label: 'valeurs propres', skill: 'l-eig-charpoly' },
  { id: 'eigvec', label: 'vecteurs propres', skill: 'l-eig-space' },
  { id: 'general', label: 'X = Σ Cᵢ e^(λᵢt) vᵢ', skill: SY },
  { id: 'ic', label: 'les constantes', skill: SY },
];

const PAIRS = [[1, 1, 1, -1], [1, 0, 1, 1], [1, 1, 0, 1], [2, 1, 1, 1], [1, 2, 1, 1], [1, -1, 1, 1], [1, 1, 1, 2], [1, 0, 2, 1], [2, 1, 1, 0], [1, 1, -1, 1], [1, 2, 0, 1], [3, 1, 2, 1]];

function systemData(rng) {
  for (let t = 0; t < 200; t++) {
    const [a, b, c, e] = rng.pick(PAIRS); // P = [[a, b], [c, e]] (columns v₁ = (a, c), v₂ = (b, e))
    const det = a * e - b * c;
    if (![1, -1, 2, -2].includes(det)) continue;
    const l1 = rng.pick([-3, -2, -1, 1, 2, 3]);
    const l2 = rng.pick([-3, -2, -1, 1, 2, 3]);
    if (l1 === l2) continue;
    // A = P D P⁻¹ = (1/det)·[[a l1 e − b l2 c, −a l1 b + b l2 a], [c l1 e − e l2 c, −c l1 b + e l2 a]].
    const A = [[a * l1 * e - b * l2 * c, -a * l1 * b + b * l2 * a], [c * l1 * e - e * l2 * c, -c * l1 * b + e * l2 * a]].map((r) => r.map((x) => x / det));
    if (!A.flat().every(Number.isInteger) || A.flat().some((x) => Math.abs(x) > 9)) continue;
    const c1 = rng.pick([1, 2, -1, 1]);
    const c2 = rng.pick([1, -1, 2, -2]);
    return { P: [[a, b], [c, e]], l1, l2, A, c1, c2, X0: [c1 * a + c2 * b, c1 * c + c2 * e] };
  }
  return { P: [[1, 1], [1, -1]], l1: 3, l2: -1, A: [[1, 2], [2, 1]], c1: 1, c2: 1, X0: [2, 0], fallback: true };
}

const ex = (l) => expText(l, 't');
// Σ coefficient·C·e^(λt) for one component.
const comp = (k1, k2, d, C = ['C_1', 'C_2']) => sum([cmul(k1, `${C[0]} ${ex(d.l1)}`), cmul(k2, `${C[1]} ${ex(d.l2)}`)]);
const compN = (k1, k2, d) => sum([cmul(k1, ex(d.l1)), cmul(k2, ex(d.l2))]);
const matT = (A) => `[[${A[0].join(',')}],[${A[1].join(',')}]]`;
const vecT = (u, v) => `(${u} ; ${v})`;

const SY_CHOICES = [
  { id: 'eigval', label: 'Valeurs propres : det(A − λI) = 0' }, { id: 'eigvec', label: 'Un vecteur propre pour chaque λ' },
  { id: 'general', label: 'X = C₁e^{λ₁t}v₁ + C₂e^{λ₂t}v₂' }, { id: 'consts', label: 'Constantes avec X(0)' }, { id: 'final', label: 'Remplacer C₁ et C₂' },
  { id: 'swap', label: 'Associer e^{λ₁t} au vecteur propre de λ₂', rule: 'a2_ode_system_order', why: 'Chaque exponentielle e^{λt} va avec un vecteur propre de la même valeur propre λ.' },
];

function systemItem(level, rng, opts, d) {
  const { P, A, l1, l2, c1, c2, X0 } = d;
  const [[a, b], [c, e]] = P;
  const sysStart = `x' = ${sum([cmul(A[0][0], 'x'), cmul(A[0][1], 'y')])} ; y' = ${sum([cmul(A[1][0], 'x'), cmul(A[1][1], 'y')])}`;
  const general = `x = ${comp(a, b, d)} ; y = ${comp(c, e, d)}`;
  const swapped = `x = ${comp(b, a, d)} ; y = ${comp(e, c, d)}`;
  const final = `x = ${compN(c1 * a, c2 * b, d)} ; y = ${compN(c1 * c, c2 * e, d)}`;
  const Av = [A[0][0] * b + A[0][1] * e, A[1][0] * b + A[1][1] * e];
  const ode = { kind: 'ode', v: 't', system: { A: A.map((r) => r.map(String)), names: ['x', 'y'], X0: X0.map(String), swapped, ctx: { Av: fr(vecT(Av[0], Av[1])) } } };
  const bc = A[0][1] * A[1][0];
  const charT = `(${sum([String(A[0][0]), '-λ'])})(${sum([String(A[1][1]), '-λ'])})${bc === 0 ? '' : `${bc > 0 ? '-' : '+'}${Math.abs(bc)}`}=0`;
  const gl = E(general, 'Chaque couple (λ, v) donne une solution e^{λt}v', 'general', 'general');
  const cl = E(`C_1 = ${c1} ; C_2 = ${c2}`, `X(0) = ${fr(vecT(X0[0], X0[1]))}`, 'ic', 'consts');
  if (level <= 2) {
    Object.assign(gl, blankMatches(gl.math, /(?<=[=+]\s*|[^(^]-)\d*(?=C_)/g, level === 1 ? 1 : 2));
    if (!gl.blanks) Object.assign(gl, blankMatches(gl.math, /e\^\(?-?\d*t\)?/g, level === 1 ? 1 : 2));
    Object.assign(cl, blankValues(cl.math, level === 1 ? 1 : null));
  }
  const parts = [];
  if (level >= 2) parts.push({ html: 'Les valeurs propres de A :', start: charT, judge: { kind: 'solset', v: 'λ' }, lines: [E(`λ = ${Math.min(l1, l2)} ou λ = ${Math.max(l1, l2)}`, 'det(A − λI) = 0', 'eigval', 'eigval')] });
  parts.push({ html: `Un vecteur propre v₁ pour λ₁ = ${fr(l1)} :`, ask: 'v₁ =', start: 'v_1', judge: { kind: 'eigvec', A: matT(A), lambda: String(l1) }, lines: [E(vecT(a, c), '(A − λ₁I)v₁ = 0', 'eigvec', 'eigvec')] });
  parts.push({ html: `Un vecteur propre v₂ pour λ₂ = ${fr(l2)} :`, ask: 'v₂ =', start: 'v_2', judge: { kind: 'eigvec', A: matT(A), lambda: String(l2) }, lines: [E(vecT(b, e), '(A − λ₂I)v₂ = 0', 'eigvec', 'eigvec')] });
  const dec = { kind: 'decision', prompt: 'Comment résoudre le système ?', options: [
    { id: 'diag', label: 'Diagonaliser A : X = C₁e^{λ₁t}v₁ + C₂e^{λ₂t}v₂', valid: true },
    { id: 'elim', label: 'Éliminer y : une équation d\'ordre 2 en x', valid: true, quality: 'poor', why: 'Juste aussi, mais plus long à écrire en 2 × 2 : y se déduit de x′ ensuite.' },
  ] };
  if (level === 3) parts[0].pre = [dec];
  parts.push({ html: 'Les composantes de X, puis les constantes :', ask: 'X :', start: sysStart, judge: ode, lines: [gl, cl, E(final, 'X(t)', 'ic', 'final')] });
  const { start, judge, script } = assemble(parts, level, SY_CHOICES);
  const given = level === 1 ? ` Les valeurs propres de A sont ${fr(l1)} et ${fr(l2)}.` : '';
  return linesItem({
    skill: SY, level, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', start, judge, script,
    prompt: `Résous X′ = AX avec A = ${ML(matT(A))} et X(0) = ${ML(vecT(X0[0], X0[1]))}, X = (x ; y). Écris chaque composante : x = … ; y = ….${given}`,
    hints: H('Diagonalise A : chaque couple (λ, v) donne une solution e^{λt}v.',
      `Les valeurs propres sont ${fr(l1)} et ${fr(l2)}, de vecteurs propres ${fr(vecT(a, c))} et ${fr(vecT(b, e))}.`, M(general)),
    subgoals: SY_SUB, keys: [...A2_KEYS, 'mat'], tapActions: level === 3 ? 'steps' : null,
    key: `${SY}:${level}:${matT(A)}:${X0.join(',')}`, exam: examTag(opts), fallback: !!d.fallback,
    baits: ['a2_ode_system_order'],
  });
}

export function genSystem(level, rng, profile, opts = {}) {
  return systemItem(level, rng, opts, systemData(rng));
}

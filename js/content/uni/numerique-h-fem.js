// n-fem-hat and n-opt-kkt (module N, part h, step U9). Catalogue:
// docs/universite/N-analyse-numerique.md, n-fem-hat, n-opt-kkt, exam
// example 5.
//
// n-fem-hat: −u″ = f, u(0) = u(1) = 0, one hat function φ₁ centred in c ∈
// {1/2, 1/3, 1/4, 2/3, 3/4}, f ∈ {1, 2, x}: ∫(φ₁′)² = 1/(c(1 − c)),
// ∫fφ₁ = 1/2, 1 or (1 + c)/6, α = ∫fφ₁/∫(φ₁′)² (= u(c): P1 Galerkin is exact
// at the nodes in 1D). L1 the space V (exam options); L2 the integrals and
// α, guided; L3 the weak form and u_h (decisions), then α; L4 free, a hat
// that is not centred; L5 the program fem_hat, then its nodal values.
// Exam: mcq (V with Dirichlet or Neumann at 1, α).
//
// n-opt-kkt: min ½(x − a)² under x ≤ c or x ≥ c: ∂L/∂x (judge equiv, trap
// n_kkt_sign), the complementarity (decision), the case active or not
// (decision, trap n_kkt_multiplier_sign), x and λ. L4 the equality
// constraint b·q = c (the block system [[I, −Bᵀ], [B, 0]]); L5 the program
// kkt_eq. Exam: mcq (∇ₓL, complementarity, the block system).

import { mcq, examTag } from './kit.js';
import { partsItem } from './geo-kit.js';
import { refCode, codeItem, readtableItem, multiMcq } from './numerique-kit.js';
import { q, qt, fq, H, menuOf, opts4, pyValue , withThen } from './numerique-h-kit.js';
import { t } from '../../i18n.js';

const FE = 'n-fem-hat';
const KK = 'n-opt-kkt';

// ======================================================================
// n-fem-hat
// ======================================================================

const FE_SUB = [
  { id: 'weak', label: t('forme faible (intégration par parties)'), skill: 'a1-int-parts' },
  { id: 'space', label: t('l\'espace V'), skill: FE },
  { id: 'stiffness', label: '∫(φ′)²', skill: FE },
  { id: 'load', label: '∫fφ', skill: FE },
  { id: 'solve', label: 'α', skill: FE },
  { id: 'matrix', label: t('la matrice tridiagonale'), skill: 'n-bvp-fd' },
];
const CENTRES = [q(1, 2), q(1, 3), q(1, 4), q(2, 3), q(3, 4)];
const FS = [
  { f: '1', F: () => q(1, 2), u: 'x(1 − x)/2' },
  { f: '2', F: () => q(1), u: 'x(1 − x)' },
  { f: 'x', F: (c) => q(1).add(c).div(6), u: 'x(1 − x²)/6' },
];

function feData(rng, { centred = false } = {}) {
  const c = centred ? q(1, 2) : rng.pick(CENTRES);
  const fd = rng.pick(FS);
  const K = q(1).div(c.mul(q(1).sub(c)));
  const F = fd.F(c);
  const al = F.div(K);
  const s1 = q(1).div(c);
  const s2 = q(1).div(q(1).sub(c));
  return { c, fd, K, F, al, s1, s2 };
}
const coefT = (k) => (k.eq(1) ? '' : k.d === 1 ? fq(k) : `(${fq(k)})`);
const hatText = (d) => t('φ₁ est la fonction chapeau de sommet ({c} ; 1) : φ₁ = {s1}x sur [0 ; {c}], {s2}(1 − x) sur [{c} ; 1]', { c: fq(d.c), s1: coefT(d.s1), s2: coefT(d.s2) });

function feVMcq(rng, level, exam) {
  const neumann = rng.chance(0.4);
  const base = t('{g continue sur [0 ; 1], g′ continue par morceaux');
  const right = neumann ? `${base}, g(0) = 0}` : `${base}, g(0) = g(1) = 0}`;
  return mcq({
    skill: FE, level, key: `${FE}:V:${neumann}`, exam: exam || false,
    prompt: t('On écrit la forme faible de −u″ = f sur ]0 ; 1[, u(0) = 0, {v1} : trouver u ∈ V tel que ∫u′v′ = ∫fv pour tout v ∈ V. Quel est l\'espace V ?', { v1: neumann ? 'u′(1) = 0' : 'u(1) = 0' }),
    options: opts4(right, [
      { html: `${base}}`, rule: 'n_weak_space_bc' },
      { html: neumann ? `${base}, g(0) = g(1) = 0}` : `${base}, g(0) = 0}`, rule: 'n_weak_space_bc' },
      { html: `${base}, g′(0) = g′(1) = 0}`, rule: 'n_weak_space_bc' },
    ]),
    solution: [{ html: neumann ? t('La condition de Dirichlet u(0) = 0 entre dans V ; la condition de Neumann u′(1) = 0 sort de l\'intégration par parties : elle est naturelle.') : t('Les deux conditions de Dirichlet entrent dans V : [u′v] s\'annule car v(0) = v(1) = 0.'), note: '' }],
  }, rng);
}

function feParts(d, level) {
  const MENU = [{ id: 'K', label: 'Calculer ∫(φ₁′)²' }, { id: 'F', label: 'Calculer ∫fφ₁' }, { id: 'al', label: t('Résoudre α·∫(φ₁′)² = ∫fφ₁') }];
  const M = (id) => (level === 3 ? menuOf(MENU, id) : undefined);
  const lc = q(1).sub(d.c);
  return [
    {
      html: t('∫₀¹ (φ₁′)² : φ₁′ = {s1} sur ]0 ; {c}[, {v1} sur ]{c} ; 1[.', { s1: fq(d.s1), c: fq(d.c), v1: fq(d.s2.neg()) }), ask: '∫(φ₁′)² =',
      start: `(${qt(d.s1)})^2×${qt(d.c)}+(${qt(d.s2)})^2×${qt(lc)}`,
      judge: { kind: 'value', expect: qt(d.K), form: 'irreducible', ntraps: { n_hat_derivative: [...new Set(['2', qt(d.s1.mul(d.s1).add(d.s2.mul(d.s2)))])].filter((x) => x !== qt(d.K)) } },
      menu: M('K'),
      lines: [{ math: qt(d.K), note: t('pente² × longueur, sur chaque morceau'), subgoal: 'stiffness', blank: [qt(d.K)] }],
    },
    {
      html: t('∫₀¹ f·φ₁ avec f = {f}.', { f: d.fd.f }), ask: '∫fφ₁ =', start: 'F',
      judge: { kind: 'value', expect: qt(d.F), form: 'irreducible' },
      menu: M('F'),
      lines: [{ math: qt(d.F), note: d.fd.f === 'x' ? '∫₀ᶜ x²/c + ∫꜀¹ x(1 − x)/(1 − c)' : t('{f} × aire du triangle (base 1, hauteur 1)', { f: d.fd.f }), subgoal: 'load', blank: [qt(d.F)] }],
    },
    {
      html: 'u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁.', ask: 'α =',
      start: `α`,
      judge: { kind: 'value', expect: qt(d.al), form: 'irreducible', ntraps: { n_hat_derivative: [...new Set([qt(d.F.div(2)), qt(d.F.mul(2)), qt(d.F.div(d.s1.mul(d.s1).add(d.s2.mul(d.s2))))])].filter((x) => x !== qt(d.al)) } },
      menu: M('al'),
      decisions: [{
        kind: 'decision', prompt: t('Quelle est la forme faible ?'), options: [
          { id: 'ok', label: t('∫u′v′ = ∫fv pour tout v ∈ V'), valid: true, ref: true },
          { id: 'sign', label: t('−∫u′v′ = ∫fv pour tout v ∈ V'), valid: false, rule: 'n_weak_sign', why: t('−∫u″v = −[u′v] + ∫u′v′, et [u′v] = 0 car v(0) = v(1) = 0.') },
          { id: 'strong', label: t('∫u″v = ∫fv pour tout v ∈ V'), valid: false, why: t('On intègre par parties pour n\'avoir que des dérivées premières (u ∈ V n\'a pas de dérivée seconde).') },
        ],
      }],
      lines: [{ math: qt(d.al), note: t('= u({c}) : la méthode est exacte aux nœuds', { c: fq(d.c) }), subgoal: 'solve', blank: [qt(d.al)] }],
    },
  ];
}
function feHints(d) {
  return H(t('Avec u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁.'),
    t('φ₁′ vaut {s1} puis {v1}, donc ∫(φ₁′)² = □', { s1: fq(d.s1), v1: fq(d.s2.neg()) }),
    t('∫(φ₁′)² = {K}, ∫fφ₁ = {F}, donc α = {al}.', { K: fq(d.K), F: fq(d.F), al: fq(d.al) }));
}
function feLines(level, rng) {
  const d = feData(rng, { centred: level <= 2 && rng.chance(0.6) });
  return partsItem({
    skill: FE, level, key: `${FE}:${level}:${d.c}:${d.fd.f}`,
    prompt: level === 3
      ? t('−u″ = {f} sur ]0 ; 1[, u(0) = u(1) = 0. Galerkin avec V_h = span(φ₁), où {hat}. Calcule u_h = αφ₁. Choisis d\'abord chaque action.', { f: d.fd.f, hat: hatText(d) })
      : t('−u″ = {f} sur ]0 ; 1[, u(0) = u(1) = 0. Galerkin avec V_h = span(φ₁), où {hat}. Calcule u_h = αφ₁.', { f: d.fd.f, hat: hatText(d) }),
    parts: feParts(d, level), keys: ['calc'], subgoals: FE_SUB, hints: feHints(d),
    baits: ['n_hat_derivative', 'n_weak_sign'],
  });
}

const FEM = refCode(`def fem_hat(N):
    # -u'' = 1 sur ]0;1[, u(0) = u(1) = 0, N fonctions chapeau interieures
    h = 1 / (N + 1)
    K = zeros2(N, N)
    F = zeros(N)
    for i in range(N):
        K[i][i] = «2 / h»
        if i > 0:
            K[i][i - 1] = «-1 / h»
        if i < N - 1:
            K[i][i + 1] = -1 / h
        F[i] = «h»   # integrale de 1 * phi_i
    return solve(K, F)
`);
const FEM_TESTS = [
  { expr: 'fem_hat(1)', expect: '[0.125]', tol: 1e-12 },
  { expr: 'fem_hat(3)', expect: '[0.09375, 0.125, 0.09375]', tol: 1e-12 },
];
const FEM_TRAPS = { 0: [{ text: '2 / (h * h)', rule: 'n_bvp_h2_missing' }, { text: '2' }], 1: [{ text: '1 / h' }], 2: [{ text: '1.0' }, { text: 'h / 2' }] };

function feCode(level, rng) {
  const N = rng.pick([3, 4, 5]);
  const h = 1 / (N + 1);
  const vals = pyValue(FEM.text, `fem_hat(${N})`, { mat: true }).v;
  const rows = vals.map((u, i) => {
    const x = (i + 1) * h;
    return [String(Number(x.toPrecision(6))), String(Number(u.toPrecision(10))), String(Number((x * (1 - x) / 2).toPrecision(10)))];
  });
  const then = readtableItem({
    skill: FE, level, key: `${FE}:read:${N}`,
    prompt: t('fem_hat({N}) donne les coefficients uⱼ de u_h = Σ uⱼφⱼ ; on les compare à u(x) = x(1 − x)/2 aux nœuds xⱼ.', { N }),
    table: { columns: ['xⱼ', 'uⱼ', 'u(xⱼ)'], rows },
    question: multiMcq({
      skill: FE, level, key: `${FE}:readq:${N}`,
      prompt: t('Cocher les affirmations vraies.'),
      options: [
        { html: t('u_h(xⱼ) = uⱼ = u(xⱼ) : en 1D, la méthode est exacte aux nœuds'), correct: true },
        { html: t('La matrice de rigidité est K = (1/h)·tridiag(−1, 2, −1)'), correct: true },
        { html: t('La matrice de rigidité est K = (1/h²)·tridiag(−1, 2, −1)'), correct: false, rule: 'n_bvp_h2_missing' },
        { html: t('u_h = u sur tout [0 ; 1]'), correct: false },
      ],
      solution: [{ html: t('Kᵢⱼ = ∫φᵢ′φⱼ′ = (1/h)·(2, −1) et Fᵢ = ∫φᵢ = h. Entre les nœuds, u_h est affine et u est une parabole.'), note: '' }],
    }, rng),
  });
  return withThen(codeItem({
    skill: FE, level, ref: FEM, blanks: level === 5 ? [0, 1, 2] : [rng.pick([0, 2])], rng, traps: FEM_TRAPS, preludes: ['vec', 'mat'],
    prompt: t('Complète la méthode des éléments finis P1 (N fonctions chapeau intérieures, h = 1/(N + 1)) : Kᵢⱼ = ∫φᵢ′φⱼ′, Fᵢ = ∫φᵢ.'),
    tests: FEM_TESTS, then, hints: [], subgoals: FE_SUB, key: `5:${N}`,
  }));
}

function feExamMcq(rng, opts) {
  if (rng.chance(0.4)) return feVMcq(rng, 4, examTag(opts));
  const d = feData(rng);
  return mcq({
    skill: FE, level: 4, key: `${FE}:al:${d.c}:${d.fd.f}`, exam: examTag(opts),
    prompt: t('−u″ = {f} sur ]0 ; 1[, u(0) = u(1) = 0, V₁ = span(φ₁), {d}. On cherche u₁ = αφ₁ par Galerkin. Que vaut α ?', { f: d.fd.f, d: hatText(d) }),
    options: opts4(fq(d.al), [
      { html: fq(d.F.div(2)), rule: 'n_hat_derivative' },
      { html: fq(d.F.mul(2)), rule: 'n_hat_derivative' },
      { html: fq(d.F.div(d.s1.mul(d.s1).add(d.s2.mul(d.s2)))), rule: 'n_hat_derivative' },
    ], [fq(d.F), fq(d.al.mul(2))]),
    solution: [{ html: `∫(φ₁′)² = ${fq(d.K)}, ∫fφ₁ = ${fq(d.F)}, α = ${fq(d.al)}.`, note: '' }],
  }, rng);
}

function feGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return feExamMcq(rng, opts);
  if (level === 1) return feVMcq(rng, 1);
  if (level === 5) return feCode(5, rng);
  return feLines(level, rng);
}

// ======================================================================
// n-opt-kkt
// ======================================================================

const KK_SUB = [
  { id: 'lagrangian', label: t('le lagrangien'), skill: 'a2-lagrange' },
  { id: 'stationarity', label: '∇ₓL = 0', skill: KK },
  { id: 'cases', label: t('les deux cas de la complémentarité'), skill: KK },
  { id: 'gradient', label: t('gradient d\'une forme quadratique'), skill: 'm-quad-gradient' },
];

function kkData(rng) {
  for (let tries = 0; tries < 100; tries++) {
    const up = rng.chance(0.5); // x ≤ c (g = c − x) or x ≥ c (g = x − c)
    const a = rng.int(-4, 5);
    const c = rng.int(-2, 3);
    if (a === c) continue;
    const active = up ? a > c : a < c;
    if (tries < 50 && active !== rng.chance(0.5)) continue;
    const g = up ? `${c}-x` : `x-${c}`.replace('--', '+');
    const sgn = up ? '+' : '-';
    const x = active ? c : a;
    const lam = active ? Math.abs(a - c) : 0;
    const xa = a === 0 ? 'x' : a > 0 ? `x-${a}` : `x+${-a}`;
    return { up, a, c, active, g, x, lam, grad: `${xa}${sgn}λ`, wrong: `${xa}${up ? '-' : '+'}λ` };
  }
  return { up: true, a: 3, c: 1, active: true, g: '1-x', x: 1, lam: 2, grad: 'x-3+λ', wrong: 'x-3-λ', fallback: true };
}
const gR = (d) => (d.up ? `${fq(d.c)} − x ≥ 0` : `x − ${fq(d.c)} ≥ 0`).replace('− −', '+ ');
const fR = (d) => `½(x − ${fq(d.a)})²`.replace('− −', '+ ');
// b₁q₁ + b₂q₂ written out: 2q₁ − q₂.
const lin2 = (b) => [[b[0], 'q₁'], [b[1], 'q₂']].filter(([k]) => k !== 0).map(([k, v], i) => `${k < 0 ? (i ? ' − ' : '−') : i ? ' + ' : ''}${Math.abs(k) === 1 ? '' : Math.abs(k)}${v}`).join('');

function kkParts(d, level) {
  const MENU = [{ id: 'grad', label: t('Écrire ∂L/∂x = 0') }, { id: 'x', label: t('Traiter les deux cas : x') }, { id: 'lam', label: t('Puis λ') }];
  const M = (id) => (level === 3 ? menuOf(MENU, id) : undefined);
  const wrongCase = d.active
    ? { id: 'in', label: t('Contrainte inactive : λ = 0, x = {a}', { a: fq(d.a) }), valid: false, why: t('x = {a} ne vérifie pas {d}.', { a: fq(d.a), d: gR(d) }) }
    : { id: 'act', label: t('Contrainte active : x = {c}, λ = {lam}', { c: fq(d.c), lam: fq(d.up ? d.a - d.c : d.c - d.a) }), valid: false, rule: 'n_kkt_multiplier_sign', why: t('Le multiplicateur serait λ = {v1} < 0 : ce point n\'est pas un minimum sous contrainte.', { v1: fq(d.up ? d.a - d.c : d.c - d.a) }) };
  const okCase = d.active
    ? { id: 'act', label: t('Contrainte active : x = {c}, λ = {lam}', { c: fq(d.c), lam: d.lam }), valid: true, ref: true }
    : { id: 'in', label: t('Contrainte inactive : λ = 0, x = {a}', { a: fq(d.a) }), valid: true, ref: true };
  return [
    {
      html: t('L(x, λ) = {d} − λ·({v1}). La stationnarité :', { d: fR(d), v1: gR(d).replace(' ≥ 0', '') }), ask: '∂L/∂x =',
      start: `d(1/2×(x-${d.a})^2-λ×(${d.g}), x)`.replace('x--', 'x+'),
      judge: { kind: 'equiv', vars: ['x', 'λ'], domain: { x: [-3, 3], λ: [0, 3] }, target: 'no-prime', ntraps: { n_kkt_sign: [d.wrong] } },
      menu: M('grad'),
      decisions: level === 2 ? [{
        kind: 'decision', prompt: t('Quelle est la condition de complémentarité ?'), options: [
          { id: 'ok', label: `λ·(${gR(d).replace(' ≥ 0', '')}) = 0`, valid: true, ref: true },
          { id: 'x', label: 'λ·x = 0', valid: false, rule: 'n_kkt_complementarity', why: t('Chaque multiplicateur multiplie sa contrainte g(x).') },
          { id: 'sum', label: `λ + (${gR(d).replace(' ≥ 0', '')}) = 0`, valid: false, why: t('C\'est un produit nul : λ = 0 ou g(x) = 0.') },
        ],
      }] : [],
      lines: [{ math: d.grad, note: t('dérivée de {d}, puis de −λ·g', { d: fR(d) }), subgoal: 'stationarity', blank: [`${Math.abs(d.a)}`] }],
    },
    {
      html: t('Les deux cas : λ = 0, ou la contrainte active (g(x) = 0) ; on garde celui qui respecte g(x) ≥ 0 et λ ≥ 0.'), ask: 'x =', start: 'x',
      judge: { kind: 'value', expect: String(d.x), form: 'irreducible' },
      menu: M('x'),
      decisions: level >= 2 ? [{ kind: 'decision', prompt: t('Quel cas ?'), options: [okCase, wrongCase] }] : [],
      lines: [{ math: String(d.x), note: d.active ? `g(x) = 0` : t('λ = 0, donc x − a = 0'), subgoal: 'cases', blank: [String(d.x)] }],
    },
    {
      html: t('Le multiplicateur.'), ask: 'λ =', start: 'λ',
      judge: { kind: 'value', expect: String(d.lam), form: 'irreducible' },
      menu: M('lam'),
      lines: [{ math: String(d.lam), note: d.active ? t('par ∂L/∂x = 0, et λ ≥ 0') : t('contrainte inactive'), subgoal: 'cases', blank: [String(d.lam)] }],
    },
  ];
}
function kkLines(level, rng) {
  const d = kkData(rng);
  return partsItem({
    skill: KK, level, key: `${KK}:${level}:${d.up}:${d.a}:${d.c}`,
    prompt: level === 3
      ? t('Minimiser f(x) = {f} sous la contrainte {g}. Écris les conditions KKT et résous-les. Choisis d\'abord chaque action.', { f: fR(d), g: gR(d) })
      : t('Minimiser f(x) = {f} sous la contrainte {g}. Écris les conditions KKT et résous-les.', { f: fR(d), g: gR(d) }),
    parts: kkParts(d, level), keys: ['calc', 'greek'], subgoals: KK_SUB,
    hints: H(t('Écris ∇ₓL = 0, puis traite les deux cas de la complémentarité : λ = 0 ou contrainte active.'),
      `∂L/∂x = ${fR(d).slice(1).replace('²', '')} ${d.up ? '+' : '−'} □`,
      d.active ? t('Contrainte active : x = {c}, λ = {lam} ≥ 0.', { c: fq(d.c), lam: d.lam }) : t('λ = 0 et x = {a}, qui respecte {d}.', { a: fq(d.a), d: gR(d) })),
    baits: ['n_kkt_sign', 'n_kkt_complementarity', 'n_kkt_multiplier_sign'], fallback: d.fallback,
  });
}

// L4: min ½(q₁² + q₂²) under b₁q₁ + b₂q₂ = c: q = μb, μ = c/|b|².
function kkEq(level, rng) {
  let b;
  do b = [rng.int(-2, 3), rng.int(-2, 3)]; while (b[0] === 0 && b[1] === 0);
  const s = b[0] * b[0] + b[1] * b[1];
  const mu = rng.pick([q(1), q(2), q(-1), q(1, 2)]);
  const c = mu.mul(s);
  const qv = b.map((x) => mu.mul(x));
  const parts = [
    {
      html: t('Le système KKT [[I, −Bᵀ], [B, 0]]·(q ; μ) = (0 ; c) donne q = μ·bᵀ, puis b·q = c. Le multiplicateur :'), ask: 'μ =',
      start: `(${qt(c)})/(${s})`, judge: { kind: 'value', expect: qt(mu), form: 'irreducible' },
      lines: [{ math: qt(mu), note: `μ·‖b‖² = c, ‖b‖² = ${s}`, subgoal: 'stationarity' }],
    },
    {
      html: 'q₁ = μ·b₁.', ask: 'q₁ =', start: 'q_1', judge: { kind: 'value', expect: qt(qv[0]), form: 'irreducible' },
      lines: [{ math: qt(qv[0]), note: 'q − Bᵀμ = 0', subgoal: 'cases' }],
    },
    {
      html: 'q₂ = μ·b₂.', ask: 'q₂ =', start: 'q_2', judge: { kind: 'value', expect: qt(qv[1]), form: 'irreducible' },
      lines: [{ math: qt(qv[1]), note: 'q − Bᵀμ = 0', subgoal: 'cases' }],
    },
  ];
  return partsItem({
    skill: KK, level, key: `${KK}:eq:${b}:${mu}`,
    prompt: t('Minimiser ½(q₁² + q₂²) sous la contrainte {b} = {c} (B = ({v1}, {v2})), avec L = ½‖q‖² − μ(Bq − c).', { b: lin2(b), c: fq(c), v1: fq(b[0]), v2: fq(b[1]) }),
    parts, keys: ['calc', 'greek'], subgoals: KK_SUB,
    hints: H(t('∇_qL = q − Bᵀμ = 0, donc q = μBᵀ ; la contrainte donne μ.'), `μ·((${fq(b[0])})² + (${fq(b[1])})²) = □`, `μ = ${fq(mu)}, q = (${fq(qv[0])} ; ${fq(qv[1])}).`),
    baits: [],
  });
}

const KKT = refCode(`def kkt_eq(B, c):
    # min 1/2 |q|^2 sous B q = c (B : 1 x n) ; inconnues (q, mu)
    n = len(B[0])
    K = zeros2(n + 1, n + 1)
    rhs = zeros(n + 1)
    for i in range(n):
        K[i][i] = «1.0»
        K[i][n] = «-B[0][i]»     # bloc -B^T
        K[n][i] = «B[0][i]»      # bloc B
    rhs[n] = «c[0]»
    return solve(K, rhs)
`);
const KKT_TRAPS = { 1: [{ text: 'B[0][i]', rule: 'n_kkt_sign' }], 2: [{ text: '-B[0][i]', rule: 'n_kkt_sign' }], 3: [{ text: '0.0' }] };

function kkCode(level, rng) {
  return withThen(codeItem({
    skill: KK, level, ref: KKT, blanks: [0, 1, 2, 3], rng, traps: KKT_TRAPS, preludes: ['vec', 'mat'],
    prompt: t('Complète la résolution du système KKT [[I, −Bᵀ], [B, 0]]·(q ; μ) = (0 ; c) pour min ½‖q‖² sous Bq = c (une contrainte).'),
    tests: [
      { expr: 'kkt_eq([[1, 1]], [2])', expect: '[1.0, 1.0, 1.0]', tol: 1e-12 },
      { expr: 'kkt_eq([[1, 1, 2]], [6])', expect: '[1.0, 1.0, 2.0, 1.0]', tol: 1e-12 },
    ],
    hints: [], subgoals: KK_SUB, key: '5',
  }));
}

function kkExamMcq(rng, opts) {
  const r = rng.int(0, 2);
  if (r === 0) {
    return mcq({
      skill: KK, level: 4, key: `${KK}:grad`, exam: examTag(opts),
      prompt: t('Minimiser f(x) = ½xᵀAx − bᵀx sous x + c ≥ 0 et −x + c ≥ 0 (x, c ∈ ℝⁿ), avec L = f − λ₁ᵀ(x + c) − λ₂ᵀ(−x + c). La condition de stationnarité est…'),
      options: [
        { html: 'Ax − b − λ₁ + λ₂ = 0', correct: true },
        { html: 'Ax − b + λ₁ − λ₂ = 0', correct: false, rule: 'n_kkt_sign' },
        { html: 'Ax − b − λ₁ − λ₂ = 0', correct: false },
        { html: 'Ax + b − λ₁ + λ₂ = 0', correct: false },
      ],
      solution: [{ html: t('∇ₓL = Ax − b − λ₁ + λ₂ : la dérivée de −λ₁ᵀ(x + c) est −λ₁, celle de −λ₂ᵀ(−x + c) est +λ₂.'), note: '' }],
    }, rng);
  }
  if (r === 1) {
    return mcq({
      skill: KK, level: 4, key: `${KK}:compl`, exam: examTag(opts),
      prompt: t('Minimiser ½xᵀAx − bᵀx sous x + c ≥ 0 et −x + c ≥ 0 (x, c ∈ ℝⁿ), avec les multiplicateurs λ₁ ≥ 0 et λ₂ ≥ 0 de ces deux contraintes. Quelles sont les conditions de complémentarité ?'),
      options: [
        { html: '(λ₁)ᵢ(xᵢ + cᵢ) = 0 et (λ₂)ᵢ(cᵢ − xᵢ) = 0', correct: true },
        { html: '(λ₁)ᵢ(xᵢ − cᵢ) = 0 et (λ₂)ᵢ(xᵢ + cᵢ) = 0', correct: false, rule: 'n_kkt_complementarity' },
        { html: '(λ₁)ᵢ + (λ₂)ᵢ = 0', correct: false },
        { html: t('(λ₁)ᵢ(λ₂)ᵢ = 0 seulement'), correct: false },
      ],
      solution: [{ html: t('Chaque multiplicateur multiplie sa propre contrainte : λ₁ avec x + c, λ₂ avec c − x.'), note: '' }],
    }, rng);
  }
  return multiMcq({
    skill: KK, level: 4, key: `${KK}:block`, exam: examTag(opts),
    prompt: t('min ½‖q‖² sous Bq = c (B de taille m × n), avec L = ½‖q‖² − μᵀ(Bq − c). Cocher les affirmations vraies.'),
    options: [
      { html: t('Le système KKT est [[I, −Bᵀ], [B, 0]]·(q ; μ) = (0 ; c)'), correct: true },
      { html: t('Sa solution est unique si ker Bᵀ = {0}'), correct: true },
      { html: t('Le système KKT est [[I, Bᵀ], [B, 0]]·(q ; μ) = (0 ; c), avec ce L'), correct: false, rule: 'n_kkt_sign' },
      { html: t('Les multiplicateurs μ doivent être ≥ 0'), correct: false, rule: 'n_kkt_multiplier_sign' },
    ],
    solution: [{ html: t('∇_qL = q − Bᵀμ = 0 et Bq = c. Pour des égalités, μ n\'a pas de signe imposé ; si Bᵀμ = 0 force μ = 0, la solution est unique.'), note: '' }],
  }, rng);
}

function kkGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return kkExamMcq(rng, opts);
  if (level === 4) return rng.chance(0.5) ? kkEq(4, rng) : kkLines(4, rng);
  if (level === 5) return kkCode(5, rng);
  return kkLines(level, rng);
}

export const GEN = { [FE]: feGen, [KK]: kkGen };

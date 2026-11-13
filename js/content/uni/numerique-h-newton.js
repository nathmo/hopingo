// n-bvp-newton (module N, part h, step U9): a non-linear boundary problem
// by finite differences, Newton and a tridiagonal Cholesky factorisation
// (exam 2020, exam1.m). Catalogue: docs/universite/N-analyse-numerique.md,
// n-bvp-newton.
//
// F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, DF(x) = (N + 1)²·T +
// diag(g′(xᵢ)), SDP since g′ ≥ 0; g ∈ {x³ − 1 (2020), x⁵ − 1, x³ + x − 2,
// eˣ − 1}. Every level is the program bvp_newton: L1 one hole as a choice
// (the exam options), L2 one typed hole, L3 the holes of DF and F, L4 the
// holes of Cholesky and of the two substitutions, L5 every hole, then the
// printed `stop` column to read (several answers). Exam: mcq (a line of the
// program, the stop table, or the uniqueness question of 2020 mc1b).

import { mcq, examTag } from './kit.js';
import { refCode, codeItem, codeMcq, readtableItem, multiMcq, tableHtml } from './numerique-kit.js';
import { H, pyValue, eText , withThen } from './numerique-h-kit.js';
import { t } from '../../i18n.js';

const BN = 'n-bvp-newton';
const SUB = [
  { id: 'F', label: t('le vecteur F'), skill: BN },
  { id: 'jacobian', label: t('la jacobienne DF'), skill: 'n-newton-system' },
  { id: 'spd', label: t('DF symétrique définie positive'), skill: 'n-bvp-fd' },
  { id: 'cholesky', label: 'Cholesky tridiagonal', skill: 'm-cholesky' },
  { id: 'solve', label: t('descente et remontée'), skill: 'n-thomas' },
];

// g, its derivative (Python, with x[i] and x[0] / x[N - 1] spellings).
const GS = [
  { g: 'x³ − 1', F: (v) => `${v} ** 3 - 1`, J: (v) => `3 * ${v} * ${v}`, Jbad: (v) => `3 * ${v} * ${v} - 1`, Jraw: (v) => `${v} * ${v} * ${v}` },
  { g: 'x⁵ − 1', F: (v) => `${v} ** 5 - 1`, J: (v) => `5 * ${v} ** 4`, Jbad: (v) => `5 * ${v} ** 4 - 1`, Jraw: (v) => `${v} ** 5` },
  { g: 'x³ + x − 2', F: (v) => `${v} ** 3 + ${v} - 2`, J: (v) => `3 * ${v} * ${v} + 1`, Jbad: (v) => `3 * ${v} * ${v}`, Jraw: (v) => `${v} ** 3 + ${v}` },
  { g: 'eˣ − 1', F: (v) => `math.exp(${v}) - 1`, J: (v) => `math.exp(${v})`, Jbad: (v) => `2 * math.exp(${v})`, Jraw: (v) => `${v} * math.exp(${v})` },
];

function program(G) {
  return refCode(`def bvp_newton(N):
    # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = ${G.g} ; Newton DF(x)(x - x_new) = F(x)
    a = zeros(N)
    b = zeros(N)
    c = zeros(N - 1)
    x = zeros(N)
    for i in range(N):
        x[i] = 1.0
    coeff = (N + 1) * (N + 1)
    stop = 1.0
    stops = []
    while stop > 1e-10:
        for i in range(N):
            a[i] = 2 * coeff + «${G.J('x[i]')}»
        for i in range(N - 1):
            c[i] = -coeff
        b[0] = coeff * (2 * x[0] - x[1]) + «${G.F('x[0]')}»
        for i in range(1, N - 1):
            b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + «${G.F('x[i]')}»
        b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + ${G.F('x[N - 1]')}
        # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
        a[0] = «math.sqrt(a[0])»
        for i in range(N - 1):
            c[i] = «c[i] / a[i]»
            a[i + 1] = math.sqrt(a[i + 1] - «c[i] * c[i]»)
        # L z = F(x)
        b[0] = «b[0] / a[0]»
        for i in range(N - 1):
            b[i + 1] = (b[i + 1] - «c[i] * b[i]») / a[i + 1]
        # L^T y = z
        b[N - 1] = «b[N - 1] / a[N - 1]»
        for i in range(N - 2, -1, -1):
            b[i] = (b[i] - «c[i] * b[i + 1]») / a[i]
        for i in range(N):
            x[i] = x[i] - b[i]
        stop = norm(b) / norm(x)
        stops.append(stop)
    return [x, stops]
`);
}
// Holes: 0 DF term, 1 F at 0, 2 F at i, 3 √a₀, 4 c/a, 5 c², 6 b₀/a₀, 7 c·b
// (descent), 8 b/a (last), 9 c·b (ascent).
const LINKED = [[0, 2], [0, 1, 2]];
const CHOL = [3, 4, 5, 6, 7, 8, 9];

function traps(G) {
  return {
    0: [{ text: G.F('x[i]'), rule: 'n_jacobian_vs_F' }, { text: G.Jbad('x[i]') }, { text: G.Jraw('x[i]') }],
    1: [{ text: G.J('x[0]'), rule: 'n_jacobian_vs_F' }],
    2: [{ text: G.J('x[i]'), rule: 'n_jacobian_vs_F' }],
    3: [{ text: 'a[0]', rule: 'n_cholesky_tridiag_sq' }],
    4: [{ text: 'c[i] * a[i]' }],
    5: [{ text: 'a[i] * a[i]', rule: 'n_cholesky_tridiag_sq' }, { text: 'a[i] * c[i]', rule: 'n_cholesky_tridiag_sq' }, { text: 'c[i]' }],
    6: [],
    7: [{ text: 'c[i] * b[i + 1]', rule: 'n_thomas_index_shift' }],
    8: [],
    9: [{ text: 'c[i] * b[i]', rule: 'n_thomas_index_shift' }],
  };
}
const WRONG = { 6: 'b[0] * a[0]', 8: 'b[N - 1]' };

const CACHE = new Map();
function data(rng) {
  const k = rng.int(0, GS.length - 1);
  if (!CACHE.has(k)) {
    const G = GS[k];
    const R = program(G);
    const s9 = pyValue(R.text, 'bvp_newton(9)[1]').v;
    const s19 = pyValue(R.text, 'bvp_newton(19)[1]').v;
    const tests = [
      { expr: 'len(bvp_newton(9)[1])', expect: String(s9.length) },
      { expr: 'bvp_newton(9)[1][0]', expect: eText(s9[0]), tol: 1e-6 },
      { expr: 'bvp_newton(9)[1][2]', expect: eText(s9[2]), tol: 1e-6 },
      { expr: 'bvp_newton(5)[0][2]', expect: pyValue(R.text, 'bvp_newton(5)[0][2]').text, tol: 1e-8 },
    ];
    CACHE.set(k, { G, R, tests, s9, s19, traps: traps(G) });
  }
  return CACHE.get(k);
}

const hints = (d) => H(t('La jacobienne d\'un terme diagonal g(xᵢ) est diag(g′(xᵢ)) ; Cholesky : ℓᵢ₊₁,ᵢ₊₁² + ℓᵢ₊₁,ᵢ² = aᵢ₊₁.'),
  `a[i] = 2*coeff + d/dx(□) ; a[i + 1] = math.sqrt(a[i + 1] - □)`,
  t('a[i] = 2*coeff + {J}, b[i] contient {F}, et a[i + 1] = math.sqrt(a[i + 1] - c[i] * c[i]).', { J: d.G.J('x[i]'), F: d.G.F('x[i]') }));

const PROMPT = (d) => t('On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = {g}, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0.', { g: d.G.g });

function stopsTable(d) {
  const n = Math.max(d.s9.length, d.s19.length);
  const rows = Array.from({ length: n }, (_, k) => [String(k + 1), d.s9[k] !== undefined ? eText(d.s9[k]) : '', d.s19[k] !== undefined ? eText(d.s19[k]) : '']);
  return { columns: [t('itération'), 'stop, N = 9', 'stop, N = 19'], rows };
}
function stopsQuestion(rng, d, level) {
  return multiMcq({
    skill: BN, level, key: `${BN}:stops:${d.G.g}`,
    prompt: `${t('Le programme affiche stop = ‖xⁿ⁺¹ − xⁿ‖/‖xⁿ⁺¹‖ à chaque itération, pour N = 9 et N = 19 (départ x = 1).')} ${t('Que peut-on en déduire ?')}`,
    options: [
      { html: t('Newton converge quadratiquement pour ce point de départ'), correct: true },
      { html: t('Le nombre d\'itérations ne dépend presque pas de N'), correct: true },
      { html: t('Newton converge quadratiquement quel que soit le point de départ'), correct: false },
      { html: t('Newton diverge'), correct: false },
      { html: t('La méthode est d\'ordre 1, car stop est divisé par plus de 10 à chaque pas'), correct: false, rule: 'n_order_simple_ratio' },
    ],
    solution: [{ html: t('Les exposants doublent (10⁻², 10⁻⁷, 10⁻¹⁵) : convergence quadratique, pour ce départ seulement.'), note: '' }],
  }, rng);
}

function codeLevel(level, rng) {
  const d = data(rng);
  const R = d.R;
  let blanks;
  let choice;
  if (level <= 2) {
    const focus = rng.pick([0, 5, 0, 2, 7]);
    blanks = [focus];
    choice = level === 1 ? focus : undefined;
  } else if (level === 3) blanks = rng.pick(LINKED);
  else if (level === 4) blanks = CHOL;
  else blanks = R.answers.map((_, k) => k);
  const then = level === 5 ? readtableItem({
    skill: BN, level, key: `${BN}:read:${d.G.g}`,
    prompt: t('Le programme complet affiche les valeurs de stop :'),
    table: stopsTable(d), question: stopsQuestion(rng, d, level),
  }) : null;
  return withThen(codeItem({
    skill: BN, level, ref: R, blanks, choice, rng, traps: d.traps, wrong: WRONG,
    fillers: { 0: [d.G.Jraw('x[i]')], 2: [d.G.Jbad('x[i]')], 5: ['c[i]'], 7: ['d[i] * b[i]'] },
    preludes: ['vec'], maxSteps: 300000,
    prompt: level === 1 ? t('{p} Choisis ce qui manque.', { p: PROMPT(d) }) : t('{p} Complète les trous.', { p: PROMPT(d) }),
    tests: d.tests, then,
    hints: level >= 5 ? [] : hints(d), subgoals: SUB, key: `${level}:${d.G.g}:${blanks.join('')}`,
  }));
}

function examMcq(rng, opts) {
  const d = data(rng);
  const r = rng.int(0, 3);
  if (r === 0) {
    return codeMcq({
      skill: BN, ref: d.R, hole: 0, traps: d.traps, key: `jac:${d.G.g}`, exam: examTag(opts),
      prompt: PROMPT(d),
    }, rng);
  }
  if (r === 1) {
    return codeMcq({
      skill: BN, ref: d.R, hole: 5, traps: d.traps, key: `chol:${d.G.g}`, exam: examTag(opts),
      prompt: PROMPT(d),
    }, rng);
  }
  if (r === 2) {
    const qz = stopsQuestion(rng, d, 4);
    const ask = t('Que peut-on en déduire ?');
    return { ...qz, prompt: qz.prompt.replace(` ${ask}`, `${tableHtml(stopsTable(d))}${ask}`), exam: examTag(opts), key: `${BN}:examstops:${d.G.g}` };
  }
  return multiMcq({
    skill: BN, level: 4, key: `${BN}:unique:${d.G.g}`, exam: examTag(opts),
    prompt: t('F(x) = (N + 1)²·T·x + (g(xᵢ))ᵢ, T = tridiag(−1, 2, −1), g(x) = {g} (g croissante). Cocher les affirmations vraies.', { g: d.G.g }),
    options: [
      { html: t('DF(x) = (N + 1)²·T + diag(g′(xᵢ)) est symétrique définie positive'), correct: true },
      { html: t('Si F(x) = F(y) = 0, alors x = y'), correct: true },
      { html: `DF(x) = (N + 1)²·T + diag(g(xᵢ))`, correct: false, rule: 'n_jacobian_vs_F' },
      { html: t('Newton converge quel que soit le point de départ'), correct: false },
    ],
    solution: [{ html: t('(N + 1)²(x − y)ᵀT(x − y) + Σ(g(xᵢ) − g(yᵢ))(xᵢ − yᵢ) = 0, deux termes ≥ 0 (T SDP, g croissante) : x = y.'), note: '' }],
  }, rng);
}

export const GEN = {
  [BN]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? examMcq(rng, opts) : codeLevel(level, rng)),
};
export { mcq };

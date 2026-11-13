// n-fd-build (module N, part d, step U9): build a finite difference formula
// by Taylor. Catalogue: docs/universite/N-analyse-numerique.md, n-fd-build.
//
// D_h f(x̄) = (α·f(x̄ + k₀h) + β·f(x̄ + k₁h) + γ·f(x̄ + k₂h))/h for f′, on the
// stencils {0, −1, −2}, {0, 1, 2}, {−1, 0, 1}, {−1, 0, 2}: the coefficient
// of f(x̄) is 0, that of f′(x̄) is 1 and that of h·f″(x̄) is 0 (order 2);
// solved exactly (denominators ≤ 6); the next term is E·h²·f‴(x̄),
// E = Σ cⱼkⱼ³/6.
// Taylor lines: judge `equiv` with f defined as its cubic Taylor
// polynomial in the letters A = f(x̄), B = f′(x̄), C = f″(x̄), D = f‴(x̄)
// (numerique-d-kit.js); the system in α, β, γ: judge `system`.
// L1 developments and system given, the three coefficients as blanks; L2
// one development to write (blanks on the coefficients), then the system
// solved; L3 choose the conditions (order 1 only, or one too many), then
// the system; L4 a development, the system, the coefficient of h²f‴; L5
// the program (two formulas of order 2), then γ for which a family of
// order 1 becomes of order 2. Exam: mcq (which formula is of order 2),
// coef (one coefficient).

import { t } from '../../i18n.js';
import { Q } from '../../math/rational.js';
import { linesItem, mcq, answerItem, examTag } from './kit.js';
import { refCode, codeItem, holesFor, blankBy } from './numerique-kit.js';
import {
  q, R, H, TVARS, DEF_D, atText, atHtml, taylorText, taylorPlusText, readable, sumText, STENCILS, LETTERS, stencilData, formulaHtml,
} from './numerique-d-kit.js';

const SK = 'n-fd-build';
const SUB = [
  { id: 'taylor', label: t('développer f(x̄ + kh)'), skill: 'a1-dl-usual' },
  { id: 'system', label: t('les conditions d\'ordre'), skill: SK },
  { id: 'solve', label: t('résoudre le système'), skill: SK },
  { id: 'error', label: t('le terme d\'erreur'), skill: SK },
  { id: 'basic', label: t('formules de base'), skill: 'n-fd-basic' },
];
const KEYS = ['calc', 'greek', 'letters'];
const fq = (x) => R(String(q(x)));

function data(rng, ids = null) {
  const s = rng.pick(ids ? STENCILS.filter((x) => ids.includes(x.id)) : STENCILS);
  return stencilData(s);
}
// The three conditions, as text of the judge system.
function equations(d) {
  const eq = (cs, r) => `${sumText(cs.map((c, j) => [c, LETTERS[j]]))}=${r}`;
  return [eq([1, 1, 1], 0), eq(d.ks, 1), eq(d.ks.map((k) => q(k * k, 2)), 0)];
}
const eqHtml = (s) => R(s.replace(/=/g, ' = ').replace(/([+-])/g, ' $1 ').replace(/^ - /, '−').replace(/ = - /g, ' = −'));
const sysCfg = (d) => ({ kind: 'system', vars: LETTERS, solutions: [d.c.map(String)] });
const solText = (d) => LETTERS.map((L, j) => `${L}=${String(d.c[j])}`).join(' ; ');
const formulaText = (d) => `Dₕf(x̄) = (α·${atHtml(d.ks[0])} + β·${atHtml(d.ks[1])} + γ·${atHtml(d.ks[2])})/h`;
const LETTERS_NOTE = t('On note A = f(x̄), B = f′(x̄), C = f″(x̄), D = f‴(x̄) ; dans les lignes, x désigne x̄.');
const taylorCfg = (k) => ({ kind: 'equiv', vars: TVARS, funcs: ['f'], defs: { f: DEF_D }, target: 'goal', goal: taylorText(k), taylor: { k, last: 'D' } });
const farthest = (d) => d.ks.reduce((b, k) => (Math.abs(k) > Math.abs(b) ? k : b), 0);
const devNotes = (d) => d.ks.filter((k) => k !== 0).map((k) => `${atHtml(k)} = ${readable(taylorText(k))} + …`).join(' ; ');

function valueSegs(d, guided) {
  const out = [];
  [2, 1, 0].forEach((j) => {
    const v = String(d.c[j]);
    out.push({ kind: 'segment', html: t('Le coefficient {L} :', { L: LETTERS[j] }), ask: `${LETTERS[j]} =`, start: { math: LETTERS[j] }, judge: { kind: 'value', expect: v, form: 'irreducible' } });
    out.push({ kind: 'eq', math: v, ...(guided ? blankBy(v, [v]) : {}), note: '', subgoal: 'solve' });
  });
  return out;
}

// ---------- L1 ----------

function level1(rng) {
  const d = data(rng);
  const eqs = equations(d);
  const segs = valueSegs(d, true);
  const [first, ...rest] = segs;
  return linesItem({
    skill: SK, level: 1, mode: 'guided', keys: KEYS,
    prompt: t('On cherche {formula} d\'ordre 2 pour f′(x̄). En développant ({devs}), les conditions sont : {eqs}. Résous ce système.', { formula: formulaText(d), devs: devNotes(d), eqs: eqs.map(eqHtml).join(' ; ') }),
    start: first.start.math, judge: first.judge,
    script: [{ kind: 'note', html: t('Le coefficient de f(x̄) est nul, celui de f′(x̄) vaut 1, celui de h·f″(x̄) est nul.') }, { kind: 'note', html: first.html }, ...rest],
    hints: H(t('Commence par l\'équation qui a le moins d\'inconnues, puis remonte.'),
      t('{e2} et {e1} donnent {L} = □', { e2: eqHtml(eqs[2]), e1: eqHtml(eqs[1]), L: LETTERS[2] }),
      `(α, β, γ) = (${d.c.map(fq).join(', ')}).`),
    subgoals: SUB, key: `${SK}:1:${d.id}`, baits: [],
  });
}

// ---------- L2 ----------

function level2(rng) {
  const d = data(rng);
  const k = farthest(d);
  const tt = taylorText(k);
  const K = q(k);
  const c3 = K.mul(K).mul(K).div(6);
  const holes = [`${String(K.mul(K).div(2))}h^2C`, `${String(c3.n < 0 ? c3.neg() : c3)}h^3D`];
  let blanks = {};
  try { blanks = blankBy(tt, holes); } catch { blanks = {}; }
  const eqs = equations(d);
  return linesItem({
    skill: SK, level: 2, mode: 'guided', keys: KEYS,
    prompt: t('On cherche {formula} d\'ordre 2 pour f′(x̄). {note} Développe {at} jusqu\'au terme en h³, puis écris et résous le système des conditions.', { formula: formulaText(d), note: LETTERS_NOTE, at: atHtml(k) }),
    start: atText(k), judge: taylorCfg(k),
    script: [
      { kind: 'eq', math: tt, ...blanks, note: t('Les puissances impaires de h changent de signe si k < 0'), subgoal: 'taylor' },
      { kind: 'segment', html: t('Les conditions : coefficient de f(x̄) nul, de f′(x̄) égal à 1, de h·f″(x̄) nul.'), ask: t('Système :'), start: { math: eqs[0] }, judge: sysCfg(d) },
      { kind: 'eq', math: eqs.join(' ; '), note: '', subgoal: 'system' },
      { kind: 'eq', math: solText(d), note: '', subgoal: 'solve' },
    ],
    hints: H('f(x̄ + kh) = f + kh·f′ + (kh)²/2·f″ + (kh)³/6·f‴ + …',
      `${atHtml(k)} = A ${k < 0 ? '−' : '+'} ${Math.abs(k) === 1 ? '' : Math.abs(k)}hB + □ ${k < 0 ? '−' : '+'} □`,
      `${atHtml(k)} = ${readable(tt)} ; (α, β, γ) = (${d.c.map(fq).join(', ')}).`),
    subgoals: SUB, key: `${SK}:2:${d.id}`, baits: ['n_fd_taylor_sign'],
  });
}

// ---------- L3: choose the conditions ----------

function level3(rng) {
  const d = data(rng);
  const eqs = equations(d);
  const decision = {
    kind: 'decision', prompt: t('Pour une formule d\'ordre 2 en f′(x̄), quels coefficients imposes-tu ?'), options: [
      { id: 'ok', label: t('Celui de f(x̄) nul, celui de f′(x̄) égal à 1, celui de h·f″(x̄) nul'), valid: true, ref: true },
      { id: 'one', label: t('Celui de f(x̄) nul et celui de f′(x̄) égal à 1'), valid: false, rule: 'n_fd_order_conditions', why: t('Avec ces deux conditions seulement, il reste un terme en h·f″ : la formule n\'est que d\'ordre 1.') },
      { id: 'all', label: t('Ceux de f(x̄), f′(x̄) et h·f″(x̄) tous nuls'), valid: false, why: t('Alors Dₕf ne contient plus f′(x̄) : elle approche 0, pas la dérivée.') },
    ],
  };
  return linesItem({
    skill: SK, level: 3, mode: 'tap', keys: KEYS,
    prompt: t('On cherche {formula} d\'ordre 2 pour f′(x̄). Les développements sont : {devs}. Choisis les conditions, écris le système, puis résous-le.', { formula: formulaText(d), devs: devNotes(d) }),
    start: eqs[0], judge: sysCfg(d),
    script: [
      decision,
      { kind: 'eq', math: eqs.join(' ; '), note: t('Coefficients de f, f′ et h·f″'), subgoal: 'system' },
      { kind: 'eq', math: solText(d), note: '', subgoal: 'solve' },
    ],
    hints: H(t('Regroupe les termes en f(x̄), en f′(x̄), en h·f″(x̄) après division par h.'),
      `${eqHtml(eqs[0])} ; ${eqHtml(eqs[1])} ; □ = 0`,
      `(α, β, γ) = (${d.c.map(fq).join(', ')}).`),
    subgoals: SUB, key: `${SK}:3:${d.id}`, baits: ['n_fd_order_conditions'],
  });
}

// ---------- L4: the whole formula and its error term ----------

function level4(rng) {
  const d = data(rng);
  const k = farthest(d);
  const eqs = equations(d);
  const e = String(d.err);
  return linesItem({
    skill: SK, level: 4, mode: 'free', keys: KEYS,
    prompt: t('On cherche {formula} d\'ordre 2 pour f′(x̄). {note} Développe {at}, écris et résous le système, puis donne le coefficient E du terme d\'erreur : Dₕf(x̄) = f′(x̄) + E·h²·f‴(x̄) + …', { formula: formulaText(d), note: LETTERS_NOTE, at: atHtml(k) }),
    start: atText(k), judge: taylorCfg(k),
    script: [
      { kind: 'eq', math: taylorText(k), note: '', subgoal: 'taylor' },
      { kind: 'segment', html: t('Le système des conditions :'), ask: t('Système :'), start: { math: eqs[0] }, judge: sysCfg(d) },
      { kind: 'eq', math: eqs.join(' ; '), note: '', subgoal: 'system' },
      { kind: 'eq', math: solText(d), note: '', subgoal: 'solve' },
      { kind: 'segment', html: t('Le terme suivant : E = Σ cⱼkⱼ³/6.'), ask: 'E =', start: { math: 'E' }, judge: { kind: 'value', expect: e, form: 'irreducible' } },
      { kind: 'eq', math: e, note: t('Ordre exactement 2 : E = {e} ≠ 0', { e: fq(d.err) }), subgoal: 'error' },
    ],
    hints: H(t('Développe jusqu\'au terme en h³ : après division par h, il donne le terme d\'erreur en h².'),
      `E = (${d.c.map((c, j) => `${fq(c)}·(${fq(d.ks[j])})³`).join(' + ')})/6 = □`,
      `(α, β, γ) = (${d.c.map(fq).join(', ')}), E = ${fq(d.err)}.`),
    subgoals: SUB, key: `${SK}:4:${d.id}`, baits: ['n_fd_taylor_sign'],
  });
}

// ---------- L5: the program, then a family with a parameter ----------

export const BUILD_CODE = refCode(`def fd_back2(f, x, h):
    return «(3 * f(x) - 4 * f(x - h) + f(x - 2 * h)) / (2 * h)»

def fd_fwd2(f, x, h):
    return «(-3 * f(x) + 4 * f(x + h) - f(x + 2 * h)) / (2 * h)»
`);
const BUILD_TRAPS = { 0: [], 1: [] };
const BUILD_WRONG = { 0: '(3 * f(x) - 4 * f(x - h) + f(x - 2 * h)) / h', 1: '(-3 * f(x) + 4 * f(x + h) - f(x + 2 * h)) / h' };
const BUILD_TESTS = [
  { setup: 'def q(x): return 3*x*x - x + 2', expr: 'fd_back2(q, 1.5, 0.25)', expect: '8.0', tol: 1e-12 },
  { setup: 'def q(x): return 3*x*x - x + 2', expr: 'fd_fwd2(q, 1.5, 0.25)', expect: '8.0', tol: 1e-12 },
  { setup: 'def c(x): return x**3', expr: 'fd_back2(c, 1, 0.1)', expect: '2.98', tol: 1e-9 },
];

// The family of order 1 with γ (the third coefficient) free.
function family(d) {
  const [k0, k1, k2] = d.ks;
  const det = k1 - k0;
  // c0 = (−1 + (k2 − k1)γ)/det, c1 = (1 + (k0 − k2)γ)/det, c2 = γ.
  return [[q(-1, det), q(k2 - k1, det)], [q(1, det), q(k0 - k2, det)], [q(0), q(1)]];
}
const affine = ([a, b]) => {
  const g = b.eq(1) ? 'γ' : b.eq(-1) ? '−γ' : `${fq(b)}γ`;
  if (a.n === 0) return b.n === 0 ? '0' : g;
  if (b.n === 0) return fq(a);
  return `${fq(a)} ${b.n < 0 ? '−' : '+'} ${g.replace('−', '')}`;
};

function paramItem(rng, level) {
  const d = data(rng);
  const fam = family(d);
  const g = String(d.c[2]);
  return linesItem({
    skill: SK, level, mode: 'free', keys: KEYS, noHints: true,
    prompt: t('Pour tout γ, les coefficients (α, β, γ) = ({fam}) donnent une formule {formula} d\'ordre au moins 1. Pour quelle valeur de γ est-elle d\'ordre 2 ?', { fam: fam.map(affine).join(' ; '), formula: formulaText(d) }),
    start: 'γ', judge: { kind: 'value', expect: g, form: 'irreducible' },
    script: [{ kind: 'eq', math: g, note: t('Coefficient de h·f″ : {sum} = 0', { sum: fam.map((c, j) => `(${affine(c)})·${fq(q(d.ks[j] * d.ks[j], 2))}`).join(' + ') }), subgoal: 'system' }],
    subgoals: SUB, key: `${SK}:param:${d.id}`, baits: [],
  });
}

function level5(rng) {
  return codeItem({
    skill: SK, level: 5, ref: BUILD_CODE, blanks: holesFor(5, BUILD_CODE), traps: BUILD_TRAPS, wrong: BUILD_WRONG, rng,
    prompt: t('Complète les deux formules d\'ordre 2 pour f′(x) : la rétrograde sur x, x − h, x − 2h, et la progressive sur x, x + h, x + 2h. (Une formule d\'ordre 2 est exacte sur les polynômes de degré ≤ 2.)'),
    tests: BUILD_TESTS, then: paramItem(rng, 5), hints: [], subgoals: SUB, key: '5',
  });
}

// ---------- exam variants ----------

function examMcq(rng, opts) {
  const d = data(rng);
  const fam = family(d);
  const g1 = d.c[2].add(1);
  const order1 = fam.map(([a, b]) => a.add(b.mul(g1)));
  const mirror = d.c.map((c) => c.neg());
  const inconsistent = d.c.map((c, j) => (j === 0 ? c.add(1) : c));
  const options = [{ html: formulaHtml(d), correct: true }];
  const seen = new Set([options[0].html]);
  for (const [c, rule] of [[order1, 'n_fd_order_conditions'], [mirror, 'n_fd_taylor_sign'], [inconsistent, null]]) {
    const html = formulaHtml(d, c);
    if (seen.has(html)) continue;
    seen.add(html);
    options.push({ html, correct: false, ...(rule ? { rule } : {}) });
  }
  return mcq({
    skill: SK, level: 4, key: `${SK}:mcq:${d.id}`, exam: examTag(opts),
    prompt: t('Laquelle de ces formules approche f′(x̄) à l\'ordre 2 ?'),
    options,
    solution: [{ html: t('{formula} : le coefficient de f(x̄) est nul, celui de f′(x̄) vaut 1 et celui de h·f″(x̄) est nul ; le terme suivant est {e}·h²·f‴(x̄).', { formula: formulaHtml(d), e: fq(d.err) }), note: '' }],
  }, rng);
}

function examCoef(rng, opts) {
  const d = data(rng, ['back', 'fwd', 'skew']);
  const j = 1;
  const plus = stencilData({ ks: d.ks.map(Math.abs) });
  const traps = [];
  if (plus.c && !plus.c[j].eq(d.c[j])) traps.push({ value: String(plus.c[j]), rule: 'n_fd_taylor_sign' });
  return answerItem({
    skill: SK, level: 4, key: `${d.id}`, exam: examTag(opts),
    prompt: t('On cherche {formula} d\'ordre 2 pour f′(x̄). Que vaut β ?', { formula: formulaText(d) }),
    expected: String(d.c[j]), traps,
    solution: [{ html: t('Conditions : coefficient de f(x̄) nul, de f′(x̄) égal à 1, de h·f″(x̄) nul : (α, β, γ) = ({c}).', { c: d.c.map(fq).join(', ') }), note: '' }],
  });
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return examMcq(rng, opts);
    if (opts.exam === 'coef') return examCoef(rng, opts);
    switch (level) {
      case 1: return level1(rng);
      case 2: return level2(rng);
      case 3: return level3(rng);
      case 4: return level4(rng);
      default: return level5(rng);
    }
  },
};

export { Q, taylorPlusText };

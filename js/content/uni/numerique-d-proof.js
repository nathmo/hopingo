// n-fd-proof (module N, part d, step U9): prove the order of a finite
// difference formula, with its constant. Catalogue:
// docs/universite/N-analyse-numerique.md, n-fd-proof; exam example 6
// (7 points, 2019).
//
// The formula comes from n-fd-build: an order-2 formula for f′(x₀) on the
// stencils {0, −1, −2} (C = 1, on [x₀ − 2 ; x₀]), {0, 1, 2} (C = 1),
// {−1, 0, 2} (C = 1/3) or {−1, 0, 1} (C = 1/6). Each node gets its own
// Lagrange remainder: f(x₀ + kh) = A + khB + (kh)²/2·C + (kh)³/6·f‴(ξ),
// written with the letters U = f‴(ξ₁) and V = f‴(ξ₂) (judge `equiv`, f
// defined as its Taylor polynomial whose last coefficient is U, or V:
// numerique-d-kit.js). The combination, then f′ − Dₕf, are `equiv` lines
// with target 'goal'; the constant C is an `equiv` line whose start K
// stands for C (cfg.subst), target 'constant': a constant still written
// with U, V or h is wrong and named (n_proof_constant_depends_h).
// The bound itself (triangle inequality, |f‴(ξᵢ)| ≤ max|f‴|, ξᵢ in the
// interval because h ≤ 1) is a proof in blocks with decoys.
// L1 guided lines (developments with blanks, combination, constant); L2
// one development written in full; L3 choose where to stop Taylor and
// whether ξ₁ = ξ₂; L4 free lines, or the blocks, or a table of errors to
// read (« does it prove the bound? »); L5 and exam open: the 7-point
// problem. Exam tf: Vrai/Faux statements on the proof.

import { linesItem, blocksItem, examTag } from './kit.js';
import { readtableItem, multiMcq, expText, blankBy, vfMcq } from './numerique-kit.js';
import { problemItem } from './kit-problem.js';
import {
  q, R, H, TVARS, defWith, atText, atHtml, taylorText, readable, sumText, STENCILS, stencilData, formulaHtml,
} from './numerique-d-kit.js';

const SK = 'n-fd-proof';
const SUB = [
  { id: 'taylor', label: 'Taylor avec reste de Lagrange', skill: 'a1-dl-usual' },
  { id: 'combine', label: 'combiner les développements', skill: 'n-fd-build' },
  { id: 'bound', label: 'majorer', skill: SK },
  { id: 'constant', label: 'la constante', skill: SK },
];
const KEYS = ['calc', 'letters'];
const PV = ['h', 'A', 'B', 'C', 'U', 'V'];
const fq = (x) => R(String(q(x)));
const abs = (x) => (q(x).n < 0 ? q(x).neg() : q(x));

const INTERVAL = {
  back: '[x₀ − 2 ; x₀]', fwd: '[x₀ ; x₀ + 2]', skew: '[x₀ − 1 ; x₀ + 2]', cent: '[x₀ − 1 ; x₀ + 1]',
};

function data(rng) {
  const s = rng.pick([STENCILS[0], STENCILS[0], STENCILS[1], STENCILS[2], STENCILS[3]]);
  const d = stencilData(s);
  // The two nodes with a remainder, in the order of the formula.
  const nodes = d.ks.map((k, j) => ({ k, c: d.c[j] })).filter((x) => x.k !== 0);
  const [n1, n2] = nodes;
  n1.L = 'U';
  n2.L = 'V';
  // Integer coefficients of the numerator: D = (Σ mⱼ f(x₀ + kⱼh))/(den·h).
  const den = d.c.reduce((l, v) => lcm(l, v.d), 1);
  const m = d.c.map((c) => c.mul(den));
  // f′ − D = −Σ cₖ k³/6 h² f‴(ξₖ).
  const rem = nodes.map((x) => ({ L: x.L, r: x.c.mul(x.k ** 3).div(6).neg() }));
  return { ...d, n1, n2, den, m, rem, I: INTERVAL[d.id] };
}
function lcm(a, b) { const g = (x, y) => (y ? g(y, x % y) : x); return (a * b) / g(a, b); }
const xi = (d, x) => (x.k < 0 ? `]x₀ − ${Math.abs(x.k) === 1 ? '' : Math.abs(x.k)}h ; x₀[` : `]x₀ ; x₀ + ${x.k === 1 ? '' : x.k}h[`);
const fT = (d) => formulaHtml(d, d.c, 'x₀');
const statement = (d) => `Soit f ∈ C³${d.I} et 0 < h ≤ 1. Montrer que |f′(x₀) − ${fT(d)}| ≤ ${d.C.eq(1) ? '' : `${fq(d.C)}·`}h²·max|f‴| (maximum sur ${d.I}).`;
const NOTE = 'On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.';

// ---------- the segments ----------

const taylorCfg = (x) => ({ kind: 'equiv', vars: TVARS, funcs: ['f'], defs: { f: defWith(x.L) }, target: 'goal', goal: taylorText(x.k, x.L), taylor: { k: x.k, last: x.L } });
function taylorSeg(d, x, idx, { guided = false } = {}) {
  const t = taylorText(x.k, x.L);
  const c3 = q(x.k ** 3, 6);
  const blanks = guided ? blankBy(t, [`${String(q(x.k * x.k, 2))}h^2C`, `${String(abs(c3))}h^3${x.L}`]) : {};
  return [
    { kind: 'segment', html: `Développement de ${atHtml(x.k, 'x₀')}, avec ξ${idx === 1 ? '₁' : '₂'} ∈ ${xi(d, x)} :`, ask: `${atHtml(x.k, 'x₀')} =`, start: { math: atText(x.k) }, judge: taylorCfg(x) },
    { kind: 'eq', math: t, ...blanks, note: `Reste de Lagrange${x.k < 0 ? ' (signes alternés)' : ''} : f‴(ξ${idx === 1 ? '₁' : '₂'}) = ${x.L}`, subgoal: 'taylor' },
  ];
}
// The numerator Σ mⱼ f(x₀ + kⱼh) with the developments in place.
function numStart(d) {
  let out = '';
  d.ks.forEach((k, j) => {
    const mj = d.m[j];
    if (mj.n === 0) return;
    const node = k === d.n1.k ? d.n1 : k === d.n2.k ? d.n2 : null;
    const body = node ? `(${taylorText(k, node.L)})` : 'A';
    const a = abs(mj);
    out += `${mj.n < 0 ? '-' : out ? '+' : ''}${a.eq(1) ? '' : String(a)}${body}`;
  });
  return out;
}
// Σ mⱼ f(x₀ + kⱼh) = den·h·B + den·h³·Σ cₖk³/6·Rₖ.
const numGoal = (d) => sumText([[d.den, 'hB'], ...d.rem.map((x) => [x.r.neg().mul(d.den), `h^3${x.L}`])]);
const remGoal = (d) => sumText(d.rem.map((x) => [x.r, `h^2${x.L}`]));
function combineSegs(d, { guided = false, decision = null } = {}) {
  const ng = numGoal(d);
  const rg = remGoal(d);
  return [
    { kind: 'segment', html: 'Le numérateur, développements remplacés :', ask: 'Numérateur =', start: { math: numStart(d) }, judge: { kind: 'equiv', vars: PV, target: 'goal', goal: ng } },
    { kind: 'eq', math: ng, ...(guided ? blankBy(ng, [`${d.den}hB`]) : {}), note: 'Les termes en A et en h²C se compensent', subgoal: 'combine' },
    { kind: 'segment', html: `L'erreur : f′(x₀) moins ce numérateur divisé par ${d.den === 1 ? '' : d.den}h.`, ask: 'f′(x₀) − Dₕf =', start: { math: `B-(${ng})/(${d.den === 1 ? '' : d.den}h)` }, judge: { kind: 'equiv', vars: PV, target: 'goal', goal: rg, sameXi: { from: 'V', to: 'U' } } },
    ...(decision ? [decision] : []),
    { kind: 'eq', math: rg, note: 'U = f‴(ξ₁) et V = f‴(ξ₂) ne se simplifient pas', subgoal: 'combine' },
  ];
}
const constCfg = (d) => ({ kind: 'equiv', vars: ['h', 'U', 'V'], target: 'constant', subst: { K: String(d.C) }, proofC: { terms: d.rem.map((x) => [String(abs(x.r)), x.L]) } });
function constSegs(d, { guided = false } = {}) {
  const sum = d.rem.map((x) => String(abs(x.r))).join('+');
  const C = String(d.C);
  return [
    { kind: 'segment', html: `Majoration : |${fq(d.rem[0].r)}h²U ${d.rem[1].r.n < 0 ? '−' : '+'} ${fq(abs(d.rem[1].r))}h²V| ≤ (${fq(abs(d.rem[0].r))} + ${fq(abs(d.rem[1].r))})·h²·max|f‴|. La constante C, indépendante de h et de f :`, ask: 'C =', start: { math: 'K' }, judge: constCfg(d) },
    { kind: 'eq', math: sum, note: 'Somme des |coefficients|', subgoal: 'bound' },
    { kind: 'eq', math: C, ...(guided ? blankBy(C, [C]) : {}), note: `C = ${fq(d.C)}`, subgoal: 'constant' },
  ];
}

// ---------- L1–L4 lines ----------

function linesLevel(rng, level) {
  const d = data(rng);
  const guided = level <= 2;
  const segs = [
    ...taylorSeg(d, d.n1, 1, { guided }),
    ...taylorSeg(d, d.n2, 2, { guided: level === 1 }),
    ...combineSegs(d, {
      guided,
      decision: level === 3 ? {
        kind: 'decision', prompt: 'Les deux restes f‴(ξ₁) et f‴(ξ₂) sont-ils égaux ?', options: [
          { id: 'ok', label: 'Non : chaque développement a son propre point ξ ; on les garde séparés', valid: true, ref: true },
          { id: 'same', label: 'Oui : ce sont deux valeurs de f‴, on peut les regrouper', valid: false, rule: 'n_proof_same_xi', why: 'ξ₁ et ξ₂ sont deux points différents : f‴(ξ₁) et f‴(ξ₂) ne se simplifient pas.' },
        ],
      } : null,
    }),
    ...constSegs(d, { guided }),
  ];
  const [first, ...rest] = segs;
  const script = [{ kind: 'note', html: first.html }, ...rest];
  if (level === 3) {
    script.unshift({
      kind: 'decision', prompt: 'Jusqu\'où développes-tu f(x₀ + kh) ?', options: [
        { id: 'ok', label: 'Jusqu\'au terme en h², avec un reste de Lagrange en h³ : le premier terme qui ne s\'annule pas', valid: true, ref: true },
        { id: 'h1', label: 'Jusqu\'au terme en h, avec un reste en h²', valid: false, why: 'Les termes en h² se compensent dans la formule : il faut le terme suivant, en h³.' },
        { id: 'h4', label: 'Jusqu\'au terme en h³, avec un reste en h⁴', valid: true, quality: 'poor', why: 'Juste, mais f n\'est que C³ : le reste en h⁴ demande f⁽⁴⁾, qui peut ne pas exister.' },
      ],
    });
  }
  return linesItem({
    skill: SK, level, mode: { 1: 'guided', 2: 'guided', 3: 'tap', 4: 'free' }[level], keys: KEYS,
    prompt: `${statement(d)} ${NOTE}`,
    start: first.start.math, judge: first.judge, script,
    hints: H('Développe chaque f(x₀ + kh) jusqu\'à f‴, avec un reste de Lagrange <b>différent</b> pour chacun, puis combine.',
      `${atHtml(d.n2.k, 'x₀')} = A ${d.n2.k < 0 ? '−' : '+'} … + □·h³V`,
      `f′(x₀) − Dₕf = ${readable(remGoal(d))}, d'où C = ${d.rem.map((x) => fq(abs(x.r))).join(' + ')} = ${fq(d.C)}.`),
    subgoals: SUB, key: `${SK}:${level}:${d.id}`, baits: ['n_proof_same_xi', 'n_fd_taylor_sign', 'n_proof_constant_depends_h'],
  });
}

// ---------- the blocks of the bound ----------

function boundBlocks(d) {
  const [r1, r2] = d.rem.map((x) => fq(abs(x.r)));
  return [
    { id: 'tri', html: `|f′(x₀) − Dₕf| ≤ ${r1}·h²·|f‴(ξ₁)| + ${r2}·h²·|f‴(ξ₂)| (inégalité triangulaire)`, needs: [] },
    { id: 'xi', html: `ξ₁ et ξ₂ sont dans ${d.I}, car 0 < h ≤ 1`, needs: [] },
    { id: 'max', html: `|f‴(ξᵢ)| ≤ max|f‴| sur ${d.I}`, needs: ['xi'] },
    { id: 'end', html: `Donc |f′(x₀) − Dₕf| ≤ (${r1} + ${r2})·h²·max|f‴| = ${d.C.eq(1) ? '' : `${fq(d.C)}·`}h²·max|f‴|, avec une constante indépendante de h et de f`, needs: ['tri', 'max'] },
    { id: 'same', html: 'f‴(ξ₁) = f‴(ξ₂), donc les deux termes se compensent', distractor: 'n_proof_same_xi', why: 'ξ₁ et ξ₂ sont deux points différents : on majore chaque terme, on ne les simplifie pas.' },
    { id: 'cst', html: `On prend C = ${r1}·|f‴(ξ₁)| + ${r2}·|f‴(ξ₂)|`, distractor: 'n_proof_constant_depends_h', why: 'Cette « constante » dépend de h (ξ dépend de h) : il faut majorer par max|f‴|.' },
    { id: 'tab', html: 'Le tableau des erreurs pour f = eˣ montre que l\'erreur est ≈ C·h² : l\'inégalité est prouvée', distractor: 'g9_proof_by_example', why: 'Un exemple illustre l\'inégalité, il ne la prouve pas pour toutes les f.' },
  ];
}
function blocksLevel(rng, level, { exam = false, noHints = false } = {}) {
  const d = data(rng);
  const blocks = boundBlocks(d);
  return blocksItem({
    skill: SK, level, mode: 'order',
    prompt: `${statement(d)} On a obtenu f′(x₀) − Dₕf = ${readable(remGoal(d))}, avec U = f‴(ξ₁) et V = f‴(ξ₂). Touche les blocs de la majoration dans l'ordre.`,
    blocks: rng.shuffle(blocks), goal: 'end', order: ['tri', 'xi', 'max', 'end'],
    hints: noHints ? [] : H('Majore chaque terme séparément, puis chaque |f‴(ξᵢ)| par le maximum : il faut savoir où sont les ξᵢ.',
      'Inégalité triangulaire, puis « ξᵢ dans l\'intervalle », puis |f‴(ξᵢ)| ≤ max|f‴|, puis la conclusion.',
      'Les blocs sur f‴(ξ₁) = f‴(ξ₂), la constante avec f‴(ξ) et le tableau sont des pièges.'),
    noHints, exam,
    subgoals: SUB, key: `${level}:${d.id}`,
  });
}

// ---------- the table of errors ----------

function errTable(rng) {
  const d = data(rng);
  const hs = [0.1, 0.05, 0.025, 0.0125];
  const D = (h) => d.ks.reduce((s, k, j) => s + d.c[j].valueOf() * Math.exp(k * h), 0) / h;
  const E = Math.abs(d.err.valueOf());
  const rows = hs.map((h) => [String(h), expText(Math.abs(1 - D(h)), 3), expText(E * h * h, 3)]);
  return { d, table: { columns: ['h', 'erreur |f′(0) − Dₕf|', `${fq(abs(d.err))}·h²`], rows } };
}
function tableItem(rng, level) {
  const t = errTable(rng);
  const question = multiMcq({
    skill: SK, level, key: `${SK}:read:${t.d.id}`,
    prompt: 'Que peut-on en déduire ?',
    options: [
      { html: 'L\'ordre observé est 2 : l\'erreur est divisée par environ 4 quand h est divisé par 2', correct: true },
      { html: 'Ce tableau illustre l\'inégalité pour f = eˣ, sans la prouver', correct: true },
      { html: 'Ce tableau prouve l\'inégalité pour toute f ∈ C³', correct: false, rule: 'g9_proof_by_example' },
      { html: 'L\'ordre observé est 1', correct: false },
    ],
    solution: [{ html: 'Rapport ≈ 4 = 2² : ordre 2, comme le prédit la preuve. Un exemple ne prouve pas un énoncé « pour toute f ».', note: '' }],
  }, rng);
  return readtableItem({
    skill: SK, level, key: `${level}:${t.d.id}`,
    prompt: `Erreurs de la formule ${formulaHtml(t.d, t.d.c, 'x₀')} pour f = eˣ en x₀ = 0, comparées au premier terme d'erreur ${fq(abs(t.d.err))}·h²·f‴(0) (ici f‴(0) = 1).`,
    table: t.table, question,
    hints: H('Divise l\'erreur d\'une ligne par celle de la ligne suivante : h est divisé par 2.',
      'Rapport ≈ 2ᵖ, donc p = □.',
      'Rapport ≈ 4 : ordre 2. Mais un tableau sur un exemple ne prouve rien pour toutes les f.'),
    subgoals: SUB, baits: ['g9_proof_by_example'],
  });
}

// ---------- L5 and exam open: the 7-point problem ----------

function problem(rng, level, opts = {}) {
  const d = data(rng);
  const p1 = linesItem({
    skill: SK, level, mode: 'free', keys: KEYS, noHints: true,
    prompt: `Développe ${atHtml(d.n1.k, 'x₀')} et ${atHtml(d.n2.k, 'x₀')} avec un reste de Lagrange. ${NOTE}`,
    ...(() => { const s = [...taylorSeg(d, d.n1, 1), ...taylorSeg(d, d.n2, 2)]; return { start: s[0].start.math, judge: s[0].judge, script: [{ kind: 'note', html: s[0].html }, ...s.slice(1)] }; })(),
    subgoals: SUB, key: `${SK}:p1:${d.id}`, baits: ['n_fd_taylor_sign'],
  });
  const comb = combineSegs(d).slice(0, 2);
  const p2 = linesItem({
    skill: SK, level, mode: 'free', keys: KEYS, noHints: true,
    prompt: `Remplace les développements dans le numérateur ${fT(d).slice(1, fT(d).indexOf(')/('))} et simplifie.`,
    start: comb[0].start.math, judge: comb[0].judge, script: [{ kind: 'note', html: comb[0].html }, comb[1]],
    subgoals: SUB, key: `${SK}:p2:${d.id}`, baits: [],
  });
  const p3 = blocksLevel(rng, level, { noHints: true });
  const cs = constSegs(d);
  const p4 = linesItem({
    skill: SK, level, mode: 'free', keys: KEYS, noHints: true,
    prompt: 'La constante C de l\'inégalité :',
    start: cs[0].start.math, judge: cs[0].judge, script: [{ kind: 'note', html: cs[0].html }, ...cs.slice(1)],
    subgoals: SUB, key: `${SK}:p4:${d.id}`, baits: ['n_proof_constant_depends_h'],
  });
  return problemItem({
    skill: SK, level, key: `${d.id}`, exam: opts.exam ? examTag(opts, 7) : false,
    prompt: statement(d),
    parts: [
      { item: p1, points: [1.5, 1.5], title: 'Développements de Taylor' },
      { item: p2, points: [1.5], title: 'Combinaison' },
      { item: p3, points: [1.5], title: 'Majoration' },
      { item: p4, points: [1], title: 'Constante' },
    ],
  });
}

// ---------- exam tf ----------

function examTf(rng, opts) {
  const d = data(rng);
  const [r1, r2] = d.rem.map((x) => fq(abs(x.r)));
  const k = rng.int(0, 2);
  const S = [
    { key: 'exists', truth: true, statement: `Il existe C > 0 tel que pour toute f ∈ C³${d.I} et tout h ∈ ]0 ; 1], |f′(x₀) − ${fT(d)}| ≤ C·h²·max|f‴|.`, explanation: `Vrai : C = ${fq(d.C)} convient (Taylor avec reste de Lagrange en chaque nœud, puis inégalité triangulaire).` },
    { key: 'same', truth: false, ruleIfTrue: 'n_proof_same_xi', statement: `Dans la preuve, les restes ${r1}·h²·f‴(ξ₁) et ${r2}·h²·f‴(ξ₂) se regroupent en (${r1} ± ${r2})·h²·f‴(ξ), car ξ₁ = ξ₂.`, explanation: 'Faux : chaque développement a son propre point intermédiaire ; on majore chaque terme par max|f‴|.' },
    { key: 'cst', truth: false, ruleIfTrue: 'n_proof_constant_depends_h', statement: `On peut conclure avec la constante C = ${r1}·|f‴(ξ₁)| + ${r2}·|f‴(ξ₂)|.`, explanation: 'Faux : ξ₁ et ξ₂ dépendent de h ; la constante doit être indépendante de h. On majore |f‴(ξᵢ)| par max|f‴|.' },
  ][k];
  return vfMcq({ skill: SK, level: 4, key: `${SK}:tf:${S.key}:${d.id}`, exam: examTag(opts), ...S }, rng);
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'open') return problem(rng, 4, opts);
    if (opts.exam === 'tf') return examTf(rng, opts);
    if (level === 5) return problem(rng, 5);
    if (level === 4) {
      const r = rng.int(0, 3);
      if (r === 0) return blocksLevel(rng, 4);
      if (r === 1) return tableItem(rng, 4);
    }
    return linesLevel(rng, level);
  },
};

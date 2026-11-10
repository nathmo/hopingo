// f-parseval and f-coef-relations (module F, part a, step U10). Catalogue
// docs/universite/VCF-analyse-3-4.md.
//
// f-parseval: (2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²) on the period where f is
// given. Templates (f scaled by c ∈ {1, 2, 3}, the sums do not change):
// x → Σ 1/n², x² → Σ 1/n⁴, |x| → Σ 1/(2k + 1)⁴, the step → Σ 1/(2k + 1)²,
// and x³ with Σ 1/n², Σ 1/n⁴ given → Σ 1/n⁶ (2022, level 5). Parts: the
// left member G (`definite` with the value of the label G known: the
// student writes the integral, traps f_parseval_factor, _bounds, _square),
// a₀²/2 (`value`, f_parseval_a0), the square of a coefficient (`equiv` in n
// or k, f_parseval_square, f_parseval_expand), the sums substituted
// (`equiv` in S), then S (`value`).
//
// f-coef-relations: g′ = m·f ⟹ aₙ(g) = −m·bₙ(f)/(nω), a₀(g) apart. Pairs:
// f = x → g = m·x², f = x³ → g = m·x⁴ (2022), f = 2x on [−1 ; 1[ →
// g = m·x² (test blanc 2017), m ∈ {1/4, 1/2, 1, 2, 4}. Parts: aₙ(h) for
// h = ∫f (`prob` with expect, in n), aₙ(g) = m·aₙ(h) (trap
// f_coef_relation_factor), a₀(g) (`definite`).

import { MT, H, fr, build, COEF, COEFK, KEYS, mcqMulti, q, V, vText } from './fourier-a-kit.js';
import { examTag } from './kit.js';

// ---------- f-parseval ----------

const SKP = 'f-parseval';
const SUBP = [
  { id: 'lhs', label: 'membre de gauche (2/T)∫ f²', skill: SKP },
  { id: 'rhs', label: 'carrés des coefficients', skill: SKP },
  { id: 'substitute', label: 'sommes connues', skill: SKP },
  { id: 'solve', label: 'isoler la somme', skill: 'eq-one-step' },
];
const CHP = [
  { id: 'lhs', label: 'Écrire (2/T)∫ f(x)² dx sur la période où f est donnée' },
  { id: 'calc', label: 'Calculer l\'intégrale' },
  { id: 'square', label: 'Élever le coefficient au carré' },
  { id: 'subst', label: 'Remplacer les sommes connues' },
  { id: 'solve', label: 'Isoler S' },
  { id: 'nofactor', label: 'Écrire ∫ f² sans facteur', rule: 'f_parseval_factor', why: 'Avec la convention a₀/2, le membre de gauche est (2/T)∫ f², ici (1/π)∫.' },
];

const sq = (c) => c * c;
const Cπ = (c, t = 'π') => (c === 1 ? t : `${c}${t}`);
const cxT = (c, body) => (c === 1 ? body : `${c}${body}`);

// c·π^e as text for the CAS, reduced (2π²/3, 6π², π⁴/90), and for the screen.
const T = (num, den, e = 0) => vText(V([[q(num, den), e]]));
const sc = (t) => fr(t).replace(/\^2/g, '²').replace(/\^4/g, '⁴');

function parsevalData(id, c) {
  const c2 = sq(c);
  switch (id) {
    case 'x': {
      const G = T(2 * c2, 3, 2);
      return {
        id, def: `f(x) = ${cxT(c, 'x')} sur ]−π ; π[`, coefs: `a₀ = aₙ = 0, bₙ = ${2 * c}(−1)ⁿ⁺¹/n`,
        lhsLine: `(1/π) int((${cxT(c, 'x')})^2, x, -π, π)`, G,
        wrong: { factor: `int((${cxT(c, 'x')})^2, x, -π, π)`, bounds: `(1/π) int((${cxT(c, 'x')})^2, x, 0, 2π)`, square: `(1/π) int(${cxT(c, 'x')}, x, -π, π)` },
        a0: null, coef: { name: 'bₙ²', start: `(${2 * c}(-1)^(n+1)/n)^2`, goal: `${4 * c2}/n^2`, wrongSq: `${2 * c}(-1)^(n+1)/n`, v: 'n' },
        eq: `${sc(G)} = ${4 * c2}S`, S: 'π^2/6', Sshow: 'Σ<sub>n≥1</sub> 1/n²', solve: `(${G})/${4 * c2}`,
      };
    }
    case 'x2': {
      const G = T(2 * c2, 5, 4);
      const A = T(2 * c2, 9, 4);
      return {
        id, def: `f(x) = ${cxT(c, 'x²')} sur ]−π ; π[`, coefs: `a₀ = ${sc(T(2 * c, 3, 2))}, aₙ = ${4 * c}(−1)ⁿ/n², bₙ = 0`,
        lhsLine: `(1/π) int((${cxT(c, 'x^2')})^2, x, -π, π)`, G,
        wrong: { factor: `int((${cxT(c, 'x^2')})^2, x, -π, π)`, bounds: `(1/π) int((${cxT(c, 'x^2')})^2, x, 0, 2π)`, square: `(1/π) int(${cxT(c, 'x^2')}, x, -π, π)` },
        a0: { a0: T(2 * c, 3, 2), start: `(${T(2 * c, 3, 2)})^2/2`, value: A, wrong: T(4 * c2, 9, 4) },
        coef: { name: 'aₙ²', start: `(${4 * c}(-1)^n/n^2)^2`, goal: `${16 * c2}/n^4`, wrongSq: `${4 * c}(-1)^n/n^2`, v: 'n' },
        eq: `${sc(G)} = ${sc(A)} + ${16 * c2}S`, S: 'π^4/90', Sshow: 'Σ<sub>n≥1</sub> 1/n⁴', solve: `(${G}-${A})/${16 * c2}`,
      };
    }
    case 'abs': {
      const G = T(2 * c2, 3, 2);
      const A = T(c2, 2, 2);
      return {
        id, def: `f(x) = ${cxT(c, '|x|')} sur ]−π ; π[`, coefs: `a₀ = ${sc(T(c, 1, 1))}, a₂ₖ = 0, a₂ₖ₊₁ = −${4 * c}/(π(2k + 1)²), bₙ = 0`,
        lhsLine: `(2/π) int((${cxT(c, 'x')})^2, x, 0, π)`, G,
        wrong: { factor: `2 int((${cxT(c, 'x')})^2, x, 0, π)`, bounds: `(1/π) int((${cxT(c, 'x')})^2, x, 0, 2π)`, square: `(2/π) int(${cxT(c, 'x')}, x, 0, π)` },
        a0: { a0: T(c, 1, 1), start: `(${T(c, 1, 1)})^2/2`, value: A, wrong: T(c2, 1, 2) },
        coef: { name: 'a₂ₖ₊₁²', start: `(-${4 * c}/(π (2k+1)^2))^2`, goal: `${16 * c2}/(π^2 (2k+1)^4)`, wrongSq: `-${4 * c}/(π (2k+1)^2)`, v: 'k' },
        eq: `${sc(G)} = ${sc(A)} + (${16 * c2}/π²)S`, S: 'π^4/96', Sshow: 'Σ<sub>k≥0</sub> 1/(2k + 1)⁴', solve: `(${G}-${A})(π^2/${16 * c2})`,
      };
    }
    case 'step': return {
      id, def: `f(x) = −${c} sur ]−π ; 0[ et f(x) = ${c} sur ]0 ; π[`, coefs: `a₀ = aₙ = 0, b₂ₖ = 0, b₂ₖ₊₁ = ${4 * c}/(π(2k + 1))`,
      lhsLine: `(1/π) int(${c2}, x, -π, π)`, G: String(2 * c2),
      wrong: { factor: `int(${c2}, x, -π, π)`, bounds: null, square: `(2/π) int(${c}, x, 0, π)` },
      a0: null, coef: { name: 'b₂ₖ₊₁²', start: `(${4 * c}/(π (2k+1)))^2`, goal: `${16 * c2}/(π^2 (2k+1)^2)`, wrongSq: `${4 * c}/(π (2k+1))`, v: 'k' },
      eq: `${2 * c2} = (${16 * c2}/π²)S`, S: 'π^2/8', Sshow: 'Σ<sub>k≥0</sub> 1/(2k + 1)²', solve: `${2 * c2}π^2/${16 * c2}`,
    };
    default: return null;
  }
}

function lhsPart(d, level) {
  const traps = {
    f_parseval_factor: [{ line: d.wrong.factor, ctx: { T: '2π', want: `(1/π)∫ f² = ${sc(d.G)}` } }],
    f_parseval_square: [d.wrong.square],
    ...(d.wrong.bounds ? { f_parseval_bounds: [d.wrong.bounds] } : {}),
  };
  return {
    html: 'Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.', ask: 'G =', start: 'G',
    judge: { kind: 'definite', known: { G: d.G }, traps },
    pre: [level === 1 ? { kind: 'note', html: `T = 2π : G = (1/π)∫ f(x)² dx sur ]−π ; π[${d.id === 'abs' ? ' (f² est paire : (2/π)∫₀^π)' : ''}.` } : {
      kind: 'decision', prompt: 'Le membre de gauche de Parseval ?', levels: [2, 3], options: [
        { id: 'ok', label: '(1/π)∫ f(x)² dx sur ]−π ; π[', valid: true },
        { id: 'nofactor', label: '∫ f(x)² dx sur ]−π ; π[', valid: false, rule: 'f_parseval_factor', why: 'Avec la convention a₀/2, c\'est (2/T)∫ f² : ici 2/T = 1/π.' },
        { id: 'bounds', label: '(1/π)∫ f(x)² dx sur [0 ; 2π]', valid: false, rule: 'f_parseval_bounds', why: 'f est donnée par sa formule sur ]−π ; π[ : sur ]π ; 2π[, ce n\'est pas la même formule.' },
        { id: 'square', label: '(1/π)∫ f(x) dx sur ]−π ; π[', valid: false, rule: 'f_parseval_square', why: 'Parseval porte sur les carrés : f², aₙ², bₙ².' },
      ],
    }],
    lines: [
      { math: d.lhsLine, note: '(2/T)∫ f²', subgoal: 'lhs', act: 'lhs', blank: [d.lhsLine.replace(/^\((?:1|2)\/π\) /, '')] },
      { math: d.G, note: '', subgoal: 'lhs', act: 'calc', blank: [d.G] },
    ],
  };
}

function parsevalItem(level, rng, opts) {
  const c = rng.pick([1, 2, 3]);
  if (level === 5) return parsevalX3(level, rng, opts);
  const id = rng.pick(['x', 'x2', 'abs', 'step']);
  const d = parsevalData(id, c);
  const parts = [lhsPart(d, level)];
  if (d.a0) {
    parts.push({
      html: `Le terme constant : a₀²/2, avec a₀ = ${sc(d.a0.a0)}.`, ask: 'a₀²/2 =', start: 'a_0^2/2',
      judge: { kind: 'value', expect: d.a0.value, form: 'closed', traps: { f_parseval_a0: [d.a0.wrong] } },
      lines: [{ math: d.a0.start, note: 'a₀²/2', subgoal: 'rhs', act: 'square', from: 2 }, { math: d.a0.value, note: '', subgoal: 'rhs', act: 'calc', blank: [d.a0.value] }],
    });
  }
  const J = d.coef.v === 'n' ? COEF(d.coef.goal, { target: 'no-int', traps: { f_parseval_square: [d.coef.wrongSq] } }) : COEFK(d.coef.goal, { traps: { f_parseval_square: [d.coef.wrongSq] } });
  parts.push({ html: `Le carré du coefficient, ${d.coef.name} :`, ask: `${d.coef.name} =`, start: d.coef.start, judge: J, lines: [{ math: d.coef.goal, note: 'Au carré', subgoal: 'rhs', act: 'square', blank: [d.coef.goal] }] });
  parts.push({
    html: `Parseval donne ${d.eq}, avec S = ${d.Sshow}. Isole S :`, ask: 'S =', start: 'S',
    judge: { kind: 'value', expect: d.S, form: 'closed' },
    lines: [{ math: d.solve, note: 'Isoler S', subgoal: 'solve', act: 'solve', from: 2 }, { math: d.S, note: '', subgoal: 'solve', act: 'calc', blank: [d.S] }],
  });
  if (level === 3) {
    parts[0].pre.unshift({
      kind: 'decision', prompt: `Pour calculer S = ${d.Sshow}, quel outil ?`, options: [
        { id: 'parseval', label: 'Parseval : les carrés des coefficients donnent S', valid: true },
        { id: 'dirichlet', label: 'Dirichlet en un point', valid: false, why: `Dirichlet donne une somme des coefficients eux-mêmes (${d.coef.name.replace('²', '')}), pas de leurs carrés : ici, S vient des carrés.` },
      ],
    });
  }
  return build({
    skill: SKP, level, parts, subgoals: SUBP, keys: KEYS, choices: CHP,
    prompt: `${d.def}, 2π-périodique. Ses coefficients : ${d.coefs}. Avec l'égalité de Parseval, calcule S = ${d.Sshow}.`,
    hints: H('(2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²), sur la période où f est donnée.', `G = ${MT(d.lhsLine)}`, `G = ${MT(d.G)}`),
    key: `${SKP}:${level}:${id}:${c}`, exam: examTag(opts, 5),
  });
}

// Level 5 (2022): x³, Σ 1/n² and Σ 1/n⁴ given → Σ 1/n⁶ = π⁶/945.
function parsevalX3(level, rng, opts) {
  const d = {
    G: '2π^6/7', lhsLine: '(1/π) int((x^3)^2, x, -π, π)', id: 'x3',
    wrong: { factor: 'int((x^3)^2, x, -π, π)', bounds: '(1/π) int((x^3)^2, x, 0, 2π)', square: '(1/π) int(x^3, x, -π, π)' },
  };
  const parts = [lhsPart(d, level)];
  parts.push({
    html: 'Développe bₙ² :', ask: 'bₙ² =', start: '((-1)^(n+1)(2π^2/n-12/n^3))^2',
    judge: COEF('4π^4/n^2-48π^2/n^4+144/n^6', { traps: { f_parseval_expand: ['4π^4/n^2-144/n^6'], f_parseval_square: ['(-1)^(n+1)(2π^2/n-12/n^3)'] } }),
    lines: [{ math: '4π^4/n^2-48π^2/n^4+144/n^6', note: '(a − b)² = a² − 2ab + b²', subgoal: 'rhs', act: 'square' }],
  });
  parts.push({
    html: 'Avec Σ 1/n² = π²/6 et Σ 1/n⁴ = π⁴/90, et S = Σ 1/n⁶ : Σ bₙ² =', ask: 'Σ bₙ² =', start: '4π^4(π^2/6)-48π^2(π^4/90)+144S',
    judge: { kind: 'equiv', vars: ['S'], target: 'no-int', goal: '2π^6/15+144S' },
    lines: [{ math: '2π^6/15+144S', note: '2π⁶/3 − 8π⁶/15', subgoal: 'substitute', act: 'subst' }],
  });
  parts.push({
    html: 'Parseval : 2π⁶/7 = 2π⁶/15 + 144S. Isole S :', ask: 'S =', start: 'S',
    judge: { kind: 'value', expect: 'π^6/945', form: 'closed' },
    lines: [{ math: '(2π^6/7-2π^6/15)/144', note: 'Isoler S', subgoal: 'solve', act: 'solve' }, { math: 'π^6/945', note: '', subgoal: 'solve', act: 'calc' }],
  });
  return build({
    skill: SKP, level, parts, subgoals: SUBP, keys: [...KEYS], choices: CHP,
    prompt: 'f(x) = x³ sur ]−π ; π[, 2π-périodique : aₙ = 0 et bₙ = (−1)ⁿ⁺¹(2π²/n − 12/n³). On donne Σ 1/n² = π²/6 et Σ 1/n⁴ = π⁴/90. Avec Parseval, calcule S = Σ<sub>n≥1</sub> 1/n⁶.',
    hints: H('(1/π)∫ f² = Σ bₙ² ; développe bₙ² sans oublier le double produit.', MT('(1/π) int(x^6, x, -π, π)'), MT('4π^4/n^2-48π^2/n^4+144/n^6')),
    key: `${SKP}:${level}:x3`, exam: examTag(opts, 5),
  });
}

function parsevalMcq(rng, opts) {
  const c = rng.pick([1, 2]);
  const id = rng.pick(['x', 'x2']);
  const d = parsevalData(id, c);
  const fT = id === 'x' ? cxT(c, 'x') : cxT(c, 'x^2');
  const lhs = `(1/π) int((${fT})^2, x, -π, π)`;
  const rhsOk = id === 'x' ? 'Σ bₙ²' : 'a₀²/2 + Σ aₙ²';
  const options = [
    { html: `${MT(lhs)} = ${rhsOk}`, correct: true },
    { html: `${MT(`int((${fT})^2, x, -π, π)`)} = ${rhsOk}`, correct: false, rule: 'f_parseval_factor' },
    id === 'x2' ? { html: `${MT(lhs)} = a₀² + Σ aₙ²`, correct: false, rule: 'f_parseval_a0' } : { html: `${MT(`(1/π) int(${fT}, x, -π, π)`)} = Σ bₙ`, correct: false, rule: 'f_parseval_square' },
    { html: `${d.Sshow} = ${MT(d.S)}`, correct: true },
    { html: `${MT(lhs)} = ${MT(d.G)}`, correct: true },
    { html: `${MT(`(1/π) int((${fT})^2, x, 0, 2π)`)} = ${rhsOk}`, correct: false, rule: 'f_parseval_bounds' },
  ];
  return mcqMulti({
    skill: SKP, level: 4, key: `${SKP}:mcq:${id}:${c}`, exam: examTag(opts, 1), options,
    prompt: `${d.def}, 2π-périodique : ${d.coefs}. Quelles égalités sont vraies ?`,
    solution: [{ html: `Parseval : (2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²) sur ]−π ; π[ ; ici ${d.eq}, donc S = ${MT(d.S)}.`, note: '' }],
    expectedSec: 240,
  }, rng);
}

// ---------- f-coef-relations ----------

const SKR = 'f-coef-relations';
const SUBR = [
  { id: 'hyp', label: 'hypothèses : g continue, périodique, C¹ par morceaux', skill: SKR },
  { id: 'relation', label: 'aₙ(h) = −bₙ(h′)/(nω)', skill: SKR },
  { id: 'factor', label: 'la constante multiplicative', skill: SKR },
  { id: 'a0', label: 'a₀ à part', skill: 'f-coef' },
];
const CHR = [
  { id: 'rel', label: 'Appliquer aₙ(h) = −bₙ(h′)/(nω)' },
  { id: 'factor', label: 'Multiplier par la constante' },
  { id: 'a0', label: 'Calculer a₀ à part' },
  { id: 'all', label: 'Tout recalculer par parties', why: 'Juste, mais long : la relation donne le résultat en une ligne.' },
];
const MS = [q(1, 4), q(1, 2), q(1), q(2), q(4)];

function relData(rng) {
  const d = relRaw(rng);
  return d;
}
function relRaw(rng) {
  const kind = rng.pick(['x', 'x', 'x3', 'lin1']);
  const m = rng.pick(MS);
  const mt = (t) => (m.eq(1) ? t : m.d === 1 ? `${m}${t}` : `${t}/${m.d}`);
  if (kind === 'x') {
    // f = x, bₙ = 2(−1)ⁿ⁺¹/n ; h = x²/2 ; g = m·x² = 2m·h.
    const K = m.mul(2);
    return {
      kind, m, f: 'x', fShow: 'x', bf: '2(-1)^(n+1)/n', bfShow: '2(−1)ⁿ⁺¹/n', w: '', T: '2π', ivl: ']−π ; π[',
      h: 'x²/2', hRel: '-(2(-1)^(n+1)/n)/n', ah: '2(-1)^n/n^2', K, g: mt('x²'), gT: mt('x^2'),
      ag: vText(V([[K.mul(2), 0, 2, 1]])), a0start: `(1/π) int(${mt('x^2')}, x, -π, π)`, a0: vText(V([[m.mul(q(2, 3)), 2]])), cont: 'g(−π) = g(π)',
    };
  }
  if (kind === 'x3') {
    const K = m.mul(4);
    return {
      kind, m, f: 'x³', fShow: 'x³', bf: '(-1)^(n+1)(2π^2/n-12/n^3)', bfShow: '(−1)ⁿ⁺¹(2π²/n − 12/n³)', w: '', T: '2π', ivl: ']−π ; π[',
      h: 'x⁴/4', hRel: '-((-1)^(n+1)(2π^2/n-12/n^3))/n', ah: '(-1)^n(2π^2/n^2-12/n^4)', K, g: mt('x⁴'), gT: mt('x^4'),
      ag: vText(V([[K.mul(2), 2, 2, 1], [K.mul(-12), 0, 4, 1]])), a0start: `(1/π) int(${mt('x^4')}, x, -π, π)`, a0: vText(V([[m.mul(q(2, 5)), 4]])), cont: 'g(−π) = g(π)',
    };
  }
  // f = 2x on [−1 ; 1[ (T = 2, ω = π), bₙ = 4(−1)ⁿ⁺¹/(nπ) ; h = x² ; g = m·x².
  return {
    kind, m, f: '2x', fShow: '2x', bf: '4(-1)^(n+1)/(n π)', bfShow: '4(−1)ⁿ⁺¹/(nπ)', w: 'π', T: '2', ivl: '[−1 ; 1[',
    h: 'x²', hRel: '-(4(-1)^(n+1)/(n π))/(n π)', ah: '4(-1)^n/(n^2 π^2)', K: m, g: mt('x²'), gT: mt('x^2'),
    ag: vText(V([[m.mul(4), -2, 2, 1]])), a0start: `int(${mt('x^2')}, x, -1, 1)`, a0: vText(V([[m.mul(q(2, 3))]])), cont: 'g(−1) = g(1)',
  };
}
const fixT = (t) => t.replace(/\b1\(-1\)/g, '(-1)').replace(/^1\//, '1/').replace(/(\d+)\/(\d+)\(-1\)/g, '($1/$2)(-1)').replace(/(\d+)\/(\d+)π/g, '($1/$2)π').replace(/(\d+)\/(\d+)\//g, '($1/$2)/');

function relItem(level, rng, opts) {
  const d = relData(rng);
  const nw = d.w ? 'nπ' : 'n';
  const nwP = d.w ? '(nπ)' : 'n';
  const pre = [];
  pre.push(level === 1 ? { kind: 'note', html: `Relation : si h est continue et ${d.T}-périodique, C¹ par morceaux, alors aₙ(h) = −bₙ(h′)/${nwP}.` } : {
    kind: 'decision', prompt: `h = ${d.h} sur ${d.ivl}, h′ = ${d.fShow}. Que vaut aₙ(h) ?`, options: [
      { id: 'ok', label: `aₙ(h) = −bₙ(h′)/${nwP} : h est continue (${d.cont.replace(/g/g, 'h')}) et C¹ par morceaux`, valid: true },
      { id: 'sign', label: `aₙ(h) = bₙ(h′)/${nwP}`, valid: false, why: `Par parties, bₙ(h′) = −${nw}·aₙ(h) : le signe est −.` },
      { id: 'times', label: `aₙ(h) = −${nw}·bₙ(h′)`, valid: false, why: `C'est l'inverse : dériver multiplie par ${nw}, intégrer divise.` },
      { id: 'all', label: 'Recalculer aₙ(h) par parties', valid: true, quality: 'poor', why: 'Juste, mais la relation donne le résultat en une ligne.' },
    ],
  });
  if (level === 3 || level === 5) {
    pre.push({
      kind: 'decision', prompt: `Et dans l'autre sens : peut-on dériver terme à terme la série de f(x) = ${d.fShow} (${d.T}-périodique) pour obtenir celle de f′ ?`, options: [
        { id: 'no', label: `Non : le prolongement périodique de ${d.fShow} saute aux bords de ${d.ivl}`, valid: true },
        { id: 'yes', label: 'Oui : aₙ(f′) = nω·bₙ(f) vaut toujours', valid: false, rule: 'f_termwise_deriv', why: `Le prolongement de ${d.fShow} est discontinu : la série dérivée ne converge pas vers f′. On ne dérive terme à terme que la série d'une fonction continue et périodique.` },
      ],
    });
  }
  const mT = d.K.eq(1) ? '' : d.K.d === 1 ? String(d.K) : `(${d.K})`;
  const parts = [
    {
      html: `Avec h = ${d.h} (h′ = ${d.fShow}, bₙ(h′) = ${d.bfShow}) :`, ask: 'aₙ(h) =', start: 'a_n',
      judge: { kind: 'prob', vars: ['n'], domain: { n: { int: [1, 40] } }, expect: d.ah, label: 'a_n' }, pre,
      lines: [{ math: fixT(d.ah), note: `−bₙ(h′)/${nwP}`, subgoal: 'relation', act: 'rel' }],
    },
  ];
  if (!d.K.eq(1)) {
    parts.push({
      html: `g = ${d.g} = ${d.K.d === 1 ? d.K : `(${d.K})`}·h :`, ask: 'aₙ(g) =', start: 'a_n',
      judge: { kind: 'prob', vars: ['n'], domain: { n: { int: [1, 40] } }, expect: d.ag, label: 'a_n', traps: { f_coef_relation_factor: [{ line: d.ah, ctx: {} }] } },
      lines: [{ math: fixT(d.ag), note: `${mT}·aₙ(h)`, subgoal: 'factor', act: 'factor' }],
    });
  }
  parts.push({
    html: 'a₀(g) se calcule à part :', ask: 'a₀ =', start: d.a0start, judge: { kind: 'definite' },
    lines: [{ math: fixT(d.a0), note: '(2/T)∫ g', subgoal: 'a0', act: 'a0', blank: [fixT(d.a0)] }],
  });
  return build({
    skill: SKR, level, parts, subgoals: SUBR, keys: KEYS, choices: CHR,
    prompt: `f(x) = ${d.fShow} sur ${d.ivl}, ${d.T}-périodique, a pour coefficients aₙ = 0, bₙ = ${d.bfShow}. Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = ${d.g} sur ${d.ivl} (prolongée par périodicité).`,
    hints: H(`Par parties, aₙ(h) = −bₙ(h′)/${nwP} pour h continue et périodique ; puis la constante entre h et g ; a₀ à part.`, `aₙ(h) = −(${MT(d.bf)})/${nwP}`, `aₙ(h) = ${MT(d.ah)}`),
    key: `${SKR}:${level}:${d.kind}:${d.m}`, exam: examTag(opts, 4),
  });
}

function relMcq(rng, opts) {
  const d = relData(rng);
  const options = [
    { html: `aₙ(g) = ${MT(d.ag)}`, correct: true },
    d.K.eq(1) ? null : { html: `aₙ(g) = ${MT(d.ah)}`, correct: false, rule: 'f_coef_relation_factor' },
    { html: `bₙ(g) = 0`, correct: true },
    { html: `On obtient a₀(g) en prenant n = 0 dans aₙ(g)`, correct: false, rule: 'f_a0_separate' },
    { html: `On peut dériver terme à terme la série de f(x) = ${d.fShow} pour obtenir celle de f′`, correct: false, rule: 'f_termwise_deriv' },
    { html: `a₀(g) = ${MT(d.a0)}`, correct: true },
  ];
  return mcqMulti({
    skill: SKR, level: 4, key: `${SKR}:mcq:${d.kind}:${d.m}`, exam: examTag(opts, 1), options,
    prompt: `f(x) = ${d.fShow} sur ${d.ivl}, ${d.T}-périodique : aₙ = 0, bₙ = ${d.bfShow}. Soit g(x) = ${d.g} sur ${d.ivl}, prolongée par périodicité. Quelles affirmations sont vraies ?`,
    solution: [{ html: `g est continue et paire : aₙ(g) = ${d.K.eq(1) ? '' : `${d.K}·`}aₙ(h) avec aₙ(h) = −bₙ(f)/(${d.w ? 'nπ' : 'n'}) ; a₀ se calcule à part : ${MT(d.a0)}.`, note: '' }],
    expectedSec: 200,
  }, rng);
}

export const GEN_PARSEVAL = {
  [SKP]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return parsevalMcq(rng, opts);
    if (opts.exam === 'open') return rng.chance(0.4) ? parsevalX3(4, rng, opts) : parsevalItem(4, rng, opts);
    return parsevalItem(level, rng, opts);
  },
  [SKR]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return relMcq(rng, opts);
    if (opts.exam === 'open') return relItem(4, rng, opts);
    return relItem(level, rng, opts);
  },
};

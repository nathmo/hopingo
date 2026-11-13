// f-dirichlet (module F, part a, step U10): Dirichlet's theorem, F f(x₀) =
// (f(x₀ + 0) + f(x₀ − 0))/2, then a numerical sum. Catalogue
// docs/universite/VCF-analyse-3-4.md.
//
// Scenarios (f, its coefficients, a point x₀, the sum S they give), each
// with a multiplier c ∈ {1, 2, 3}: x² at π (Σ 1/n²) and at 0 (Σ (−1)ⁿ⁺¹/n²),
// |x| at 0 (Σ 1/(2k + 1)²), −x on [−π ; 0] and π on ]0 ; π[ at 0 (the
// catalogue's example, Σ 1/(2k − 1)² or Σ 1/(k − ½)²), the half ramp at π
// (Σ 1/(2k + 1)²), x at π/2 and the step at π/2 (Σ (−1)ᵏ/(2k + 1)), and the
// sine series of the constant c at π (the end of [0 ; π]) then at π/2.
// Parts: F(x₀) (`value`, f_dirichlet_skip / f_sine_endpoint), the term of
// the series at x₀ with n = 2k ± 1 (`equiv` in k), S (`value`).

import { MT, H, fr, q, V, vText, build, COEF, COEFK, KEYS, mcqMulti } from './fourier-a-kit.js';
import { examTag } from './kit.js';
import { t } from '../../i18n.js';

const SK = 'f-dirichlet';
const SUB = [
  { id: 'dirichlet', label: t('théorème de Dirichlet'), skill: SK },
  { id: 'evaluate', label: t('la série en x₀'), skill: 'f-coef' },
  { id: 'reindex', label: t('réindexer (n = 2k ± 1)'), skill: 'g5-reindex' },
  { id: 'solve', label: t('isoler la somme'), skill: SK },
];
const CHOICES = [
  { id: 'mean', label: t('Moyenne des limites à gauche et à droite') },
  { id: 'simp', label: t('Simplifier') },
  { id: 'odd', label: t('Garder les n impairs : n = 2k ± 1') },
  { id: 'solve', label: t('Isoler S') },
  { id: 'skip', label: t('Prendre f(x₀)'), rule: 'f_dirichlet_skip', why: t('Dirichlet donne la moyenne des limites à gauche et à droite : en un saut, ce n\'est pas f(x₀).') },
];

const C = (c, tt) => (c === 1 ? tt : `${c}${tt}`);
const Cπ = (c, tt = 'π') => (c === 1 ? tt : `${c}${tt}`);

// The scenarios. Texts for the CAS (series and values) and for the screen.
// fp, fm: f(x₀ + 0), f(x₀ − 0); fx0: f(x₀) as defined (the trap's value);
// term: the general term of the series at x₀ (n, or k after n = 2k ± 1);
// eq: the equation Dirichlet gives, in S; S: the value of S.
// c·π^e/d as text, reduced (PQ), and for the screen (sh).
const PQ = (num, den, e = 0) => vText(V([[q(num, den), e]]));
const sh = (tt) => fr(tt).replace(/\^2/g, '²');

function scenario(id, c) {
  const k1 = `${c === 1 ? '' : c}`;
  switch (id) {
    case 'x2-pi': return {
      id, def: t('f(x) = {a} sur ]−π ; π]', { a: C(c, 'x²') }), coefs: `a₀ = ${sh(PQ(2 * c, 3, 2))}, aₙ = ${4 * c}(−1)ⁿ/n², bₙ = 0`,
      x0: 'π', jump: false, fp: PQ(c, 1, 2), fm: PQ(c, 1, 2), F: PQ(c, 1, 2), fx0: null,
      series: `a₀/2 + Σ aₙ cos(nπ)`, termStart: `${4 * c}(-1)^n cos(n π)/n^2`, term: `${4 * c}/n^2`, reindex: null,
      S: 'π^2/6', Sshow: 'Σ<sub>n≥1</sub> 1/n²', eq: `${sh(PQ(c, 1, 2))} = ${sh(PQ(c, 3, 2))} + ${4 * c}S`,
      solveLine: `(${PQ(c, 1, 2)}-${PQ(c, 3, 2)})/${4 * c}`,
    };
    case 'x2-0': return {
      id, def: t('f(x) = {a} sur ]−π ; π]', { a: C(c, 'x²') }), coefs: `a₀ = ${sh(PQ(2 * c, 3, 2))}, aₙ = ${4 * c}(−1)ⁿ/n², bₙ = 0`,
      x0: '0', jump: false, fp: '0', fm: '0', F: '0', fx0: null,
      series: 'a₀/2 + Σ aₙ', termStart: `${4 * c}(-1)^n cos(n×0)/n^2`, term: `${4 * c}(-1)^n/n^2`, reindex: null,
      S: 'π^2/12', Sshow: 'Σ<sub>n≥1</sub> (−1)ⁿ⁺¹/n²', eq: `0 = ${sh(PQ(c, 3, 2))} − ${4 * c}S`,
      solveLine: `(${PQ(c, 3, 2)})/${4 * c}`,
    };
    case 'abs-0': return {
      id, def: t('f(x) = {a} sur ]−π ; π]', { a: C(c, '|x|') }), coefs: `a₀ = ${sh(PQ(c, 1, 1))}, aₙ = ${2 * c}((−1)ⁿ − 1)/(πn²), bₙ = 0`,
      x0: '0', jump: false, fp: '0', fm: '0', F: '0', fx0: null,
      series: 'a₀/2 + Σ aₙ', termStart: `${2 * c}((-1)^(2k+1)-1)/(π (2k+1)^2)`, term: `-${4 * c}/(π (2k+1)^2)`, reindex: { n: '2k + 1', from: 0 },
      S: 'π^2/8', Sshow: 'Σ<sub>k≥0</sub> 1/(2k + 1)²', eq: `0 = ${sh(PQ(c, 2, 1))} − (${4 * c}/π)S`,
      solveLine: `(${PQ(c, 2, 1)})(π/${4 * c})`,
    };
    case 'cat-0': return {
      id, def: t('f(x) = {a} sur [−π ; 0] et f(x) = {b} sur ]0 ; π[', { a: c === 1 ? '−x' : `−${c}x`, b: sh(PQ(c, 1, 1)) }), coefs: `a₀ = ${sh(PQ(3 * c, 2, 1))}, aₙ = ${k1}((−1)ⁿ − 1)/(πn²), bₙ = ${c}/n`,
      x0: '0', jump: true, fp: PQ(c, 1, 1), fm: '0', F: PQ(c, 2, 1), fx0: '0',
      series: 'a₀/2 + Σ aₙ', termStart: `${k1}((-1)^(2k-1)-1)/(π (2k-1)^2)`, term: `-${2 * c}/(π (2k-1)^2)`, reindex: { n: '2k − 1', from: 1 },
      S: 'π^2/8', Sshow: 'Σ<sub>k≥1</sub> 1/(2k − 1)²', eq: `${sh(PQ(c, 2, 1))} = ${sh(PQ(3 * c, 4, 1))} − (${2 * c}/π)S`,
      solveLine: `(${PQ(3 * c, 4, 1)}-${PQ(c, 2, 1)})(π/${2 * c})`,
    };
    case 'cat-half': return {
      id, def: t('f(x) = {a} sur [−π ; 0] et f(x) = {b} sur ]0 ; π[', { a: c === 1 ? '−x' : `−${c}x`, b: sh(PQ(c, 1, 1)) }), coefs: `a₀ = ${sh(PQ(3 * c, 2, 1))}, aₙ = ${k1}((−1)ⁿ − 1)/(πn²), bₙ = ${c}/n`,
      x0: '0', jump: true, fp: PQ(c, 1, 1), fm: '0', F: PQ(c, 2, 1), fx0: '0',
      series: 'a₀/2 + Σ aₙ', termStart: `${k1}((-1)^(2k-1)-1)/(π (2k-1)^2)`, term: `-${c}/(2π (k-1/2)^2)`, reindex: { n: '2k − 1', from: 1, half: true },
      S: 'π^2/2', Sshow: 'Σ<sub>k≥1</sub> 1/(k − ½)²', eq: `${sh(PQ(c, 2, 1))} = ${sh(PQ(3 * c, 4, 1))} − (${c}/(2π))S`,
      solveLine: `(${PQ(3 * c, 4, 1)}-${PQ(c, 2, 1)})(2π/${c})`,
    };
    case 'ramp-pi': return {
      id, def: t('f(x) = 0 sur ]−π ; 0[ et f(x) = {a} sur [0 ; π]', { a: C(c, 'x') }), coefs: `a₀ = ${sh(PQ(c, 2, 1))}, aₙ = ${k1}((−1)ⁿ − 1)/(πn²), bₙ = ${k1}(−1)ⁿ⁺¹/n`,
      x0: 'π', jump: true, fp: '0', fm: PQ(c, 1, 1), F: PQ(c, 2, 1), fx0: PQ(c, 1, 1),
      series: 'a₀/2 + Σ aₙ cos(nπ) (sin(nπ) = 0)', termStart: `${k1}((-1)^(2k+1)-1) cos((2k+1)π)/(π (2k+1)^2)`, term: `${2 * c}/(π (2k+1)^2)`, reindex: { n: '2k + 1', from: 0 },
      S: 'π^2/8', Sshow: 'Σ<sub>k≥0</sub> 1/(2k + 1)²', eq: `${sh(PQ(c, 2, 1))} = ${sh(PQ(c, 4, 1))} + (${2 * c}/π)S`,
      solveLine: `(${PQ(c, 2, 1)}-${PQ(c, 4, 1)})(π/${2 * c})`,
    };
    case 'x-half': return {
      id, def: t('f(x) = {a} sur ]−π ; π]', { a: C(c, 'x') }), coefs: `a₀ = aₙ = 0, bₙ = ${2 * c}(−1)ⁿ⁺¹/n`,
      x0: 'π/2', jump: false, fp: PQ(c, 2, 1), fm: PQ(c, 2, 1), F: PQ(c, 2, 1), fx0: null,
      series: 'Σ bₙ sin(nπ/2)', termStart: `${2 * c}(-1)^(2k+2) sin((2k+1)π/2)/(2k+1)`, term: `${2 * c}(-1)^k/(2k+1)`, reindex: { n: '2k + 1', from: 0, sin: true },
      S: 'π/4', Sshow: 'Σ<sub>k≥0</sub> (−1)ᵏ/(2k + 1)', eq: `${sh(PQ(c, 2, 1))} = ${2 * c}S`,
      solveLine: `(${PQ(c, 2, 1)})/${2 * c}`,
    };
    case 'step-half': return {
      id, def: t('f(x) = {a} sur ]−π ; 0[ et f(x) = {c} sur [0 ; π]', { a: -c, c }).replace('-', '−'), coefs: `a₀ = aₙ = 0, bₙ = ${2 * c}(1 − (−1)ⁿ)/(πn)`,
      x0: 'π/2', jump: false, fp: String(c), fm: String(c), F: String(c), fx0: null,
      series: 'Σ bₙ sin(nπ/2)', termStart: `${2 * c}(1-(-1)^(2k+1)) sin((2k+1)π/2)/(π (2k+1))`, term: `${4 * c}(-1)^k/(π (2k+1))`, reindex: { n: '2k + 1', from: 0, sin: true },
      S: 'π/4', Sshow: 'Σ<sub>k≥0</sub> (−1)ᵏ/(2k + 1)', eq: `${c} = (${4 * c}/π)S`,
      solveLine: null,
    };
    case 'step-0': return {
      id, def: t('f(x) = {a} sur ]−π ; 0[ et f(x) = {c} sur [0 ; π]', { a: -c, c }).replace('-', '−'), coefs: `a₀ = aₙ = 0, bₙ = ${2 * c}(1 − (−1)ⁿ)/(πn)`,
      x0: '0', jump: true, fp: String(c), fm: String(-c), F: '0', fx0: String(c), noSum: true,
    };
    case 'x-pi': return {
      id, def: t('f(x) = {a} sur ]−π ; π]', { a: C(c, 'x') }), coefs: `a₀ = aₙ = 0, bₙ = ${2 * c}(−1)ⁿ⁺¹/n`,
      x0: 'π', jump: true, fp: Cπ(-c).replace(/^-1π$/, '-π'), fm: Cπ(c), F: '0', fx0: Cπ(c), noSum: true,
    };
    case 'sine-pi': return {
      id, sine: true, def: t('f(x) = {c} sur ]0 ; π] ; F_s f est sa série en sinus', { c }), coefs: `bₙ = ${2 * c}(1 − (−1)ⁿ)/(πn)`,
      x0: 'π', jump: true, fp: String(-c), fm: String(c), F: '0', fx0: String(c), noSum: true,
    };
    default: return null;
  }
}

const SUMS = ['x2-pi', 'x2-0', 'abs-0', 'cat-0', 'ramp-pi', 'x-half', 'step-half'];
const JUMPS = ['step-0', 'x-pi', 'sine-pi'];

function continuityDecision(s) {
  const at = s.x0 === 'π' ? t('en π (le prolongement : à droite de π, on retrouve f près de −π)') : t('en {x0}', { x0: s.x0 });
  return {
    kind: 'decision', prompt: t('Le prolongement périodique de f est-il continu {at} ?', { at }), options: s.jump
      ? [
        { id: 'jump', label: t('Non : F f(x₀) est la moyenne des limites à gauche et à droite'), valid: true },
        { id: 'cont', label: 'Oui : F f(x₀) = f(x₀)', valid: false, rule: s.sine ? 'f_sine_endpoint' : 'f_dirichlet_skip', why: t('Les limites à gauche et à droite diffèrent ({a} et {b}) : la série vaut leur moyenne.', { a: fr(s.fm), b: fr(s.fp) }) },
      ]
      : [
        { id: 'cont', label: 'Oui : F f(x₀) = f(x₀)', valid: true },
        { id: 'jump', label: t('Non : il y a un saut'), valid: false, why: t('Les limites à gauche et à droite valent toutes deux {a} : pas de saut.', { a: fr(s.fp) }) },
      ],
  };
}

// Part 1: F(x₀) by Dirichlet.
function valuePart(s, level) {
  const mean = `(${s.fp}+${s.fm})/2`.replace('+-', '-');
  const traps = s.fx0 !== null && s.fx0 !== s.F ? { [s.sine ? 'f_sine_endpoint' : 'f_dirichlet_skip']: [{ line: s.fx0, ctx: { x0: s.x0.replace('π', 'π'), mean: fr(s.F) } }] } : {};
  return {
    html: s.sine ? t('Dirichlet pour la série en sinus :') : t('Dirichlet :'), ask: `F(${s.x0}) =`, start: `F(${s.x0})`,
    judge: { kind: 'value', expect: s.F, form: 'closed', funcs: ['F'], traps },
    pre: [level >= 2 ? continuityDecision(s) : { kind: 'note', html: t('F f(x₀) = (f(x₀ + 0) + f(x₀ − 0))/2 ; ici f(x₀ + 0) = {fp} et f(x₀ − 0) = {fm}.', { fp: MT(s.fp), fm: MT(s.fm) }) }],
    lines: [
      { math: mean, note: t('Moyenne des limites'), subgoal: 'dirichlet', act: 'mean', blank: [s.fp, s.fm], keep: true },
      ...(s.F === mean ? [] : [{ math: s.F, note: '', subgoal: 'dirichlet', act: 'simp', blank2: [s.F] }]),
    ],
  };
}

// Part 2: the term at x₀ (with n = 2k ± 1).
function termPart(s, level) {
  const J = s.reindex ? COEFK(s.term, { domain: { k: { int: [s.reindex.from, 40] } } }) : COEF(s.term);
  const pre = [];
  if (s.reindex) {
    const r = s.reindex;
    if (level === 3 || level === 4) {
      pre.push({ kind: 'decision', prompt: t('n = {n} : où commence k ?', { n: r.n }), options: [
        { id: 'ok', label: `k ≥ ${r.from}`, valid: true },
        { id: 'shift', label: `k ≥ ${1 - r.from}`, valid: false, rule: 'f_sum_reindex', why: t('n = 1 correspond à k = {from} : {a}.', { from: r.from, a: r.from === 0 ? 'k ≥ 0' : 'k ≥ 1' }) },
      ] });
    } else pre.push({ kind: 'note', html: t('n = {n}, k ≥ {from} (n = 1 pour k = {from}).', { n: r.n, from: r.from }) });
  }
  return {
    html: s.reindex ? t('En x₀ = {x0}, F(x₀) = {series}. Seuls les n impairs restent : écris le terme pour n = {n} :', { x0: s.x0, series: s.series, n: s.reindex.n }) : t('En x₀ = {x0}, F(x₀) = {series}. Simplifie le terme général :', { x0: s.x0, series: s.series }),
    ask: s.reindex ? t('terme =') : t('terme ='), start: s.termStart, judge: J, pre,
    lines: [{ math: s.term, note: s.reindex?.half ? '(2k − 1)² = 4(k − ½)²' : s.reindex?.sin ? 'sin((2k + 1)π/2) = (−1)ᵏ' : s.reindex ? `(−1)^(${s.reindex.n.replace(/ /g, '')}) = −1` : 'cos(nπ) = (−1)ⁿ', subgoal: s.reindex ? 'reindex' : 'evaluate', act: 'odd', blank: [s.term] }],
  };
}

// Part 3: the equation, then S.
function solvePart(s) {
  return {
    html: t('Dirichlet donne alors {a}, avec S = {Sshow}. Isole S :', { a: s.eq.replace(/S/, 'S'), Sshow: s.Sshow }), ask: 'S =', start: 'S',
    judge: { kind: 'value', expect: s.S, form: 'closed' },
    lines: [
      ...(s.solveLine ? [{ math: s.solveLine, note: t('Isoler S'), subgoal: 'solve', act: 'solve', from: 2 }] : []),
      { math: s.S, note: '', subgoal: 'solve', act: 'simp', blank: [s.S] },
    ],
  };
}

function linesVariant(level, rng, opts) {
  const c = rng.pick([1, 2, 3]);
  let id;
  if (level === 1) id = rng.pick(['x2-pi', 'abs-0', 'cat-0', 'ramp-pi', 'step-half']);
  else if (level === 5) id = rng.pick(['cat-half', 'cat-0', 'ramp-pi', 'x2-0', 'sine5']);
  else id = rng.pick([...SUMS, ...(level <= 3 ? JUMPS : [])]);
  if (id === 'sine5') return sineLevel5(level, rng, opts, c);
  const s = scenario(id, c);
  const parts = [valuePart(s, level)];
  if (!s.noSum) {
    parts.push(termPart(s, level));
    parts.push(solvePart(s));
  }
  const fx0 = s.sine ? 'F_s f' : 'F f';
  return build({
    skill: SK, level, parts, subgoals: SUB, keys: KEYS, choices: CHOICES,
    prompt: t('{def}, prolongée par périodicité (période 2π). Ses coefficients de Fourier : {coefs}. Note F(x) la somme de sa série. {a}', { def: s.def, coefs: s.coefs, a: s.noSum ? t('Que vaut {fx0}({x0}) ?', { fx0, x0: s.x0 }) : t('Calcule F({x0}), puis déduis-en S = {Sshow}.', { x0: s.x0, Sshow: s.Sshow }) }),
    hints: H(s.jump ? t('f saute en {x0} : Dirichlet donne la moyenne des limites, pas f({x0}).', { x0: s.x0 }) : t('Le prolongement est continu en {x0} : F({x0}) = f({x0}). Puis écris la série en {x0}.', { x0: s.x0 }),
      `F(${s.x0}) = (f(${s.x0} + 0) + f(${s.x0} − 0))/2 = ${MT(`(${s.fp}+${s.fm})/2`.replace('+-', '-'))}`,
      s.noSum ? `F(${s.x0}) = ${MT(s.F)}` : `${MT(s.termStart)} = ${MT(s.term)}`),
    key: `${SK}:${level}:${id}:${c}`, exam: examTag(opts, 4),
  });
}

// Level 5: compare F_s f and f on [0 ; π] (ends included), then a sum.
function sineLevel5(level, rng, opts, c) {
  const end = scenario('sine-pi', c);
  const s = scenario('step-half', c);
  const parts = [valuePart(end, level), termPart(s, level), solvePart(s)];
  parts[1].html = t('Sur ]0 ; π[, F_s f = f (f y est continue). En x₀ = π/2, F_s f(π/2) = {c} = Σ bₙ sin(nπ/2). Écris le terme pour n = 2k + 1 :', { c });
  return build({
    skill: SK, level, parts, subgoals: SUB, keys: KEYS, choices: CHOICES,
    prompt: t('f(x) = {c} sur ]0 ; π] ; sa série en sinus F_s f a les coefficients bₙ = {a}(1 − (−1)ⁿ)/(πn). Compare F_s f et f en π, puis déduis de la valeur en π/2 la somme S = Σ<sub>k≥0</sub> (−1)ᵏ/(2k + 1).', { c, a: 2 * c }),
    hints: H(t('Le prolongement impair vaut 0 en 0 et en π.'), `F_s f(π) = (f(π − 0) + f(π + 0))/2`, `F_s f(π) = 0`),
    key: `${SK}:${level}:sine5:${c}`, exam: examTag(opts, 4),
  });
}

// Exam: statements on F f at a few points (plusieurs réponses).
function mcqVariant(rng, opts) {
  const c = rng.pick([1, 2, 3]);
  const kind = rng.pick(['cat', 'ramp', 'sine']);
  let def; let st;
  if (kind === 'cat') {
    def = t('f(x) = {a} sur [−π ; 0] et f(x) = {b} sur ]0 ; π[, 2π-périodique', { a: c === 1 ? '−x' : `−${c}x`, b: fr(Cπ(c)) });
    st = [
      { html: `F f(0) = ${MT(PQ(c, 2, 1))}`, correct: true },
      { html: 'F f(0) = 0', correct: false, rule: 'f_dirichlet_skip' },
      { html: `F f(π) = ${MT(Cπ(c))}`, correct: true },
      { html: `F f(π/2) = ${MT(Cπ(c))}`, correct: true },
      { html: `F f(−π/2) = ${MT(PQ(c, 2, 1))}`, correct: true },
      { html: `F f(π) = ${MT(PQ(c, 2, 1))}`, correct: false },
    ];
  } else if (kind === 'ramp') {
    def = t('f(x) = 0 sur ]−π ; 0[ et f(x) = {a} sur [0 ; π], 2π-périodique', { a: C(c, 'x') });
    st = [
      { html: `F f(π) = ${MT(PQ(c, 2, 1))}`, correct: true },
      { html: `F f(π) = ${MT(Cπ(c))}`, correct: false, rule: 'f_dirichlet_skip' },
      { html: 'F f(0) = 0', correct: true },
      { html: `F f(π/2) = ${MT(PQ(c, 2, 1))}`, correct: true },
      { html: `F f(−π) = ${MT(Cπ(c))}`, correct: false, rule: 'f_dirichlet_skip' },
    ];
  } else {
    def = t('f(x) = {a} sur [0 ; π] ; F_s f est sa série en sinus', { a: C(c, 'x²') });
    st = [
      { html: 'F_s f(π) = 0', correct: true },
      { html: `F_s f(π) = ${MT(Cπ(c, 'π^2'))}`, correct: false, rule: 'f_sine_endpoint' },
      { html: 'F_s f(0) = 0', correct: true },
      { html: `F_s f(π/2) = ${MT(PQ(c, 4, 2))}`, correct: true },
      { html: `F_s f(−π/2) = ${MT(PQ(c, 4, 2))}`, correct: false },
    ];
  }
  return mcqMulti({
    skill: SK, level: 4, key: `${SK}:mcq:${kind}:${c}`, exam: examTag(opts, 1), options: st,
    prompt: t('{def}. Note F f la somme de sa série de Fourier. Quelles égalités sont vraies ?', { def }),
    solution: [{ html: t('Dirichlet : F f(x) = (f(x + 0) + f(x − 0))/2 partout ; en un saut, c\'est la moyenne des deux limites, et le prolongement impair d\'une série en sinus vaut 0 en 0 et en π.'), note: '' }],
    expectedSec: 180,
  }, rng);
}

export const GEN_DIRICHLET = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return mcqVariant(rng, opts);
    if (opts.exam === 'open') return linesVariant(4, rng, opts);
    return linesVariant(level, rng, opts);
  },
};

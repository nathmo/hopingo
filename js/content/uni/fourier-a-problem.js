// f-series-problem (module F, part a, step U10): the MT exam problem F1 of
// the catalogue (9 points): (a) the sine series F_s f, (b) F_s f compared
// with f on [0 ; π], ends included, (c) a numerical sum from x = π/2.
// docs/universite/VCF-analyse-3-4.md, « Exemples de type examen », F1.
//
// f ∈ {c·x(π − x), c(2πx − x²) (2021), the triangle 2x / 2π − 2x (2019)},
// c ∈ {1, 2, 3}. Levels 1 to 3: one of the three parts; level 4: the whole
// problem as one item with hints; level 5 and the exam: a `problem` of
// 9 points (a: 3 + 1, b: 2, c: 2 + 1).

import { MT, H, fr, q, V, vText, build, COEFK, KEYS } from './fourier-a-kit.js';
import { problemItem } from './kit-problem.js';
import { examTag } from './kit.js';
import { famOf, sineParts, formulaDecision, SINE_CHOICES } from './fourier-a-sine.js';
import { t } from '../../i18n.js';

const SK = 'f-series-problem';
const SUB = [
  { id: 'coefficients', label: t('bₙ de la série en sinus'), skill: 'f-sine-cosine' },
  { id: 'compare', label: t('comparer F_s f et f (Dirichlet)'), skill: 'f-dirichlet' },
  { id: 'evaluate', label: t('la série en π/2'), skill: 'f-dirichlet' },
  { id: 'solve', label: t('isoler la somme'), skill: 'f-dirichlet' },
];
const CHOICES = [
  ...SINE_CHOICES,
  { id: 'zero', label: t('Le prolongement impair vaut 0 en π') },
  { id: 'solve', label: t('Isoler S') },
];

const Cπ = (c, tt = 'π') => (c === 1 ? tt : `${c}${tt}`);

// The data of part (c): f(π/2), the term at π/2 for n = 2k + 1, the sum.
// c·π^e/d reduced, for the CAS (PQ) and the screen (sh).
const PQ = (num, den, e = 0) => vText(V([[q(num, den), e]]));
const sh = (tt) => fr(tt).replace(/\^2/g, '²');

function partC(f, oddGoal) {
  const c = f.c;
  if (f.kind === 'xpx') {
    const v = PQ(c, 4, 2);
    return { fpi2: v, term: `${8 * c}(-1)^k/(π (2k+1)^3)`, eq: `${sh(v)} = (${8 * c}/π)S`, S: 'π^3/32', Sshow: 'Σ<sub>k≥0</sub> (−1)ᵏ/(2k + 1)³', solve: `(${v})(π/${8 * c})`, oddGoal };
  }
  if (f.kind === 'quad2') {
    const v = PQ(3 * c, 4, 2);
    const w = PQ(2 * c, 4, 2);
    return {
      fpi2: v, term: `${c === 1 ? '' : c}(-1)^k(2π/(2k+1)+8/(π (2k+1)^3))`,
      eq: `${sh(v)} = ${sh(PQ(2 * c, 1, 1))}·(π/4) + (${8 * c}/π)S`, given: t('On donne Σ<sub>k≥0</sub> (−1)ᵏ/(2k + 1) = π/4.'),
      S: 'π^3/32', Sshow: 'Σ<sub>k≥0</sub> (−1)ᵏ/(2k + 1)³', solve: `(${v}-${w})(π/${8 * c})`, oddGoal,
    };
  }
  return { fpi2: Cπ(c), term: `${8 * c}/(π (2k+1)^2)`, eq: `${sh(Cπ(c))} = (${8 * c}/π)S`, S: 'π^2/8', Sshow: 'Σ<sub>k≥0</sub> 1/(2k + 1)²', solve: `(${Cπ(c)})(π/${8 * c})`, oddGoal };
}

function pickF(rng) {
  return famOf(rng.pick(['xpx', 'xpx', 'quad2', 'tri']), rng.pick([1, 2, 3]), 'π');
}

// The three parts, as lists of build() parts.
function pieces(f, level) {
  const { parts: a, sc } = sineParts(f, { level: Math.max(level, 2), sub: { formula: 'coefficients', ipp: 'coefficients', assemble: 'coefficients' } });
  if (level >= 2) a[0].pre = [formulaDecision(f, 'sin')];
  else a[0].pre = [{ kind: 'note', html: t('Formule : bₙ = (2/π)∫₀^π f(x) sin(nx) dx.') }];
  const cont = f.atL === '0';
  const dec = {
    kind: 'decision', prompt: t('Le prolongement impair et 2π-périodique de f est-il continu ?'), options: cont
      ? [
        { id: 'yes', label: t('Oui : f(0) = f(π) = 0, donc F_s f = f sur tout [0 ; π]'), valid: true },
        { id: 'open', label: t('F_s f = f seulement sur ]0 ; π['), valid: false, why: t('f(0) = f(π) = 0 : le prolongement impair ne saute ni en 0 ni en π, donc F_s f = f aussi aux bords.') },
        { id: 'no', label: t('Non : il saute en π'), valid: false, why: t('f(π) = 0 : en π, les limites à gauche (f(π) = 0) et à droite (−f(π) = 0) sont égales.') },
      ]
      : [
        { id: 'no', label: t('Non : il saute en π (f(π) = {a} ≠ 0). F_s f = f sur [0 ; π[ et F_s f(π) = 0', { a: fr(f.atL).replace('^2', '²') }), valid: true },
        { id: 'yes', label: t('Oui : F_s f = f sur tout [0 ; π]'), valid: false, rule: 'f_sine_endpoint', why: t('Le prolongement impair vaut −f près de π à droite : il saute de {a} à {b}. En π, Dirichlet donne la moyenne, 0.', { a: fr(f.atL).replace('^2', '²'), b: fr(`-${f.atL}`).replace('^2', '²') }) },
      ],
  };
  const b = [{
    html: t('Compare F_s f et f : que vaut F_s f(π) ?'), ask: 'F_s f(π) =', start: 'F(π)',
    judge: { kind: 'value', expect: '0', form: 'closed', funcs: ['F'], traps: cont ? {} : { f_sine_endpoint: [f.atL] } },
    pre: [level === 1 ? { kind: 'note', html: cont ? t('Le prolongement impair vaut 0 en 0 et en π ; ici f(0) = f(π) = 0 : il est continu, et F_s f = f sur [0 ; π].') : t('Le prolongement impair vaut 0 en 0 et en π.') } : dec],
    lines: [{ math: '0', note: cont ? 'F_s f(π) = f(π) = 0' : t('Moyenne de f(π) et −f(π)'), subgoal: 'compare', act: 'zero', blank: ['0'] }],
  }];
  const d = partC(f, sc.oddK);
  const termStart = `(${sc.oddK}) sin((2k+1)π/2)`;
  const c = [
    {
      html: t('En x = π/2, f est continue : F_s f(π/2) = f(π/2) = {fpi2} = Σ bₙ sin(nπ/2). Pour n pair, sin(nπ/2) = 0 ; pour n = 2k + 1 (k ≥ 0), écris le terme b₂ₖ₊₁ sin((2k + 1)π/2) :', { fpi2: MT(d.fpi2) }),
      ask: t('terme ='), start: termStart, judge: COEFK(d.term),
      lines: [{ math: d.term, note: 'sin((2k + 1)π/2) = (−1)ᵏ', subgoal: 'evaluate', act: 'odd', blank: [d.term] }],
    },
    {
      html: d.given ? t('Donc {eq}, avec S = {Sshow}. {given} Isole S :', { eq: d.eq, Sshow: d.Sshow, given: d.given }) : t('Donc {eq}, avec S = {Sshow}. Isole S :', { eq: d.eq, Sshow: d.Sshow }), ask: 'S =', start: 'S',
      judge: { kind: 'value', expect: d.S, form: 'closed' },
      lines: [{ math: d.solve, note: t('Isoler S'), subgoal: 'solve', act: 'solve', from: 2 }, { math: d.S, note: '', subgoal: 'solve', act: 'simp', blank: [d.S] }],
    },
  ];
  return { a, b, c, d, sc };
}

const promptOf = (f, d) => (f.kind === 'tri' ? t('f(x) = {a}. (a) Calcule sa série en sinus F_s f. (b) Compare F_s f et f sur [0 ; π]. (c) Déduis-en S = {Sshow}.', { a: fr(f.show), Sshow: d.Sshow }) : t('f(x) = {a} sur [0 ; π]. (a) Calcule sa série en sinus F_s f. (b) Compare F_s f et f sur [0 ; π]. (c) Déduis-en S = {Sshow}.', { a: fr(f.show), Sshow: d.Sshow }));
const hintsOf = (f, P) => H(t('(a) Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx, par parties. (b) Le prolongement impair vaut 0 en 0 et en π. (c) Écris Dirichlet en π/2.'),
  `bₙ = ${MT(P.a[0].start)}`, `bₙ = ${MT(P.sc.goal)}`);

function oneItem(level, rng, opts, f, which) {
  const P = pieces(f, level);
  const parts = which === 'a' ? P.a : which === 'b' ? P.b : which === 'c' ? P.c : [...P.a, ...P.b, ...P.c];
  const intro = which === 'b' ? t(' On a trouvé bₙ = {goal}.', { goal: MT(P.sc.goal) }) : which === 'c' ? (P.sc.odd ? t(' On a trouvé b₂ₖ = 0 et b₂ₖ₊₁ = {goal} ; F_s f = f sur ]0 ; π[.', { goal: MT(P.sc.odd.goal) }) : t(' On a trouvé bₙ = {goal}, et pour n = 2k + 1, b₂ₖ₊₁ = {oddK} ; F_s f = f sur ]0 ; π[.', { goal: MT(P.sc.goal), oddK: MT(P.sc.oddK) })) : '';
  const head = f.kind === 'tri' ? `f(x) = ${fr(f.show)}.` : t('f(x) = {a} sur [0 ; π].', { a: fr(f.show) });
  const ask = { a: t('(a) Calcule sa série en sinus F_s f.'), b: t('(b) Compare F_s f et f sur [0 ; π].'), c: t('(c) Déduis-en S = {Sshow}.', { Sshow: P.d.Sshow }) }[which];
  return build({
    skill: SK, level, parts, subgoals: SUB, keys: KEYS, choices: CHOICES,
    prompt: which === 'all' ? promptOf(f, P.d) : `${head}${intro} ${ask}`,
    hints: hintsOf(f, P), key: `${SK}:${level}:${which}:${f.id}`, exam: opts.exam ? examTag(opts, 9) : false,
  });
}

function problem(level, rng, opts) {
  const f = pickF(rng);
  const P = pieces(f, level);
  const mk = (parts, title, prompt) => build({ skill: SK, level, parts, subgoals: SUB, keys: KEYS, choices: CHOICES, prompt, hints: [], noHints: true, key: `${SK}:${level}:${title}:${f.id}` });
  return problemItem({
    skill: SK, level, prompt: promptOf(f, P.d), key: `${level}:${f.id}`, exam: opts.exam ? examTag(opts, 9) : false,
    parts: [
      { item: mk(P.a, '(a) La série en sinus F_s f.', t('(a) La série en sinus F_s f.')), points: P.a.length === 2 ? [3, 1] : [4], title: t('(a) Série en sinus') },
      { item: mk(P.b, '(b) Compare F_s f et f sur [0 ; π].', t('(b) Compare F_s f et f sur [0 ; π].')), points: [2], title: t('(b) Comparer F_s f et f') },
      { item: mk(P.c, `(c) Déduis-en S = ${P.d.Sshow}.`, t('(c) Déduis-en S = {Sshow}.', { Sshow: P.d.Sshow })), points: [2, 1], title: t('(c) La somme') },
    ],
    expectedSec: 1500,
  });
}

export const GEN_PROBLEM = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'open' || level === 5) return problem(5, rng, opts);
    const f = pickF(rng);
    if (level === 4) return oneItem(4, rng, opts, f, 'all');
    return oneItem(level, rng, opts, f, rng.pick(['a', 'a', 'b', 'c']));
  },
};

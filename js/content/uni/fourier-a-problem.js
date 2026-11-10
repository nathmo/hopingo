// f-series-problem (module F, part a, step U10): the MT exam problem F1 of
// the catalogue (9 points): (a) the sine series F_s f, (b) F_s f compared
// with f on [0 ; π], ends included, (c) a numerical sum from x = π/2.
// docs/universite/VCF-analyse-3-4.md, « Exemples de type examen », F1.
//
// f ∈ {c·x(π − x), c(2πx − x²) (2021), the triangle 2x / 2π − 2x (2019)},
// c ∈ {1, 2, 3}. Levels 1 to 3: one of the three parts; level 4: the whole
// problem as one item with hints; level 5 and the exam: a `problem` of
// 9 points (a: 3 + 1, b: 2, c: 2 + 1).

import { MT, H, fr, build, COEFK, KEYS } from './fourier-a-kit.js';
import { problemItem } from './kit-problem.js';
import { examTag } from './kit.js';
import { famOf, sineParts, formulaDecision, SINE_CHOICES } from './fourier-a-sine.js';

const SK = 'f-series-problem';
const SUB = [
  { id: 'coefficients', label: 'bₙ de la série en sinus', skill: 'f-sine-cosine' },
  { id: 'compare', label: 'comparer F_s f et f (Dirichlet)', skill: 'f-dirichlet' },
  { id: 'evaluate', label: 'la série en π/2', skill: 'f-dirichlet' },
  { id: 'solve', label: 'isoler la somme', skill: 'f-dirichlet' },
];
const CHOICES = [
  ...SINE_CHOICES,
  { id: 'zero', label: 'Le prolongement impair vaut 0 en π' },
  { id: 'solve', label: 'Isoler S' },
];

const Cπ = (c, t = 'π') => (c === 1 ? t : `${c}${t}`);

// The data of part (c): f(π/2), the term at π/2 for n = 2k + 1, the sum.
function partC(f, oddGoal) {
  const c = f.c;
  if (f.kind === 'xpx') {
    return { fpi2: `${Cπ(c, 'π^2')}/4`, term: `${8 * c}(-1)^k/(π (2k+1)^3)`, eq: `${fr(Cπ(c, 'π²'))}/4 = (${8 * c}/π)S`, S: 'π^3/32', Sshow: 'Σ<sub>k≥0</sub> (−1)ᵏ/(2k + 1)³', solve: `(${Cπ(c, 'π^2')}/4)(π/${8 * c})`, oddGoal };
  }
  if (f.kind === 'quad2') {
    return {
      fpi2: `${Cπ(3 * c, 'π^2')}/4`, term: `${c === 1 ? '' : c}(-1)^k(2π/(2k+1)+8/(π (2k+1)^3))`,
      eq: `${fr(Cπ(3 * c, 'π²'))}/4 = ${fr(Cπ(2 * c))}·(π/4) + (${8 * c}/π)S`, given: 'On donne Σ<sub>k≥0</sub> (−1)ᵏ/(2k + 1) = π/4.',
      S: 'π^3/32', Sshow: 'Σ<sub>k≥0</sub> (−1)ᵏ/(2k + 1)³', solve: `(${Cπ(3 * c, 'π^2')}/4-${Cπ(2 * c, 'π^2')}/4)(π/${8 * c})`, oddGoal,
    };
  }
  return { fpi2: Cπ(c), term: `${8 * c}/(π (2k+1)^2)`, eq: `${fr(Cπ(c))} = (${8 * c}/π)S`, S: 'π^2/8', Sshow: 'Σ<sub>k≥0</sub> 1/(2k + 1)²', solve: `${Cπ(c)}π/${8 * c}`, oddGoal };
}

function pickF(rng) {
  return famOf(rng.pick(['xpx', 'xpx', 'quad2', 'tri']), rng.pick([1, 2, 3]), 'π');
}

// The three parts, as lists of build() parts.
function pieces(f, level) {
  const { parts: a, sc } = sineParts(f, { level: Math.max(level, 2), sub: { formula: 'coefficients', ipp: 'coefficients', assemble: 'coefficients' } });
  if (level >= 2) a[0].pre = [formulaDecision(f, 'sin')];
  else a[0].pre = [{ kind: 'note', html: 'Formule : bₙ = (2/π)∫₀^π f(x) sin(nx) dx.' }];
  const cont = f.atL === '0';
  const dec = {
    kind: 'decision', prompt: 'Le prolongement impair et 2π-périodique de f est-il continu ?', options: cont
      ? [
        { id: 'yes', label: 'Oui : f(0) = f(π) = 0, donc F_s f = f sur tout [0 ; π]', valid: true },
        { id: 'open', label: 'F_s f = f seulement sur ]0 ; π[', valid: false, why: 'f(0) = f(π) = 0 : le prolongement impair ne saute ni en 0 ni en π, donc F_s f = f aussi aux bords.' },
        { id: 'no', label: 'Non : il saute en π', valid: false, why: `f(π) = 0 : en π, les limites à gauche (f(π) = 0) et à droite (−f(π) = 0) sont égales.` },
      ]
      : [
        { id: 'no', label: `Non : il saute en π (f(π) = ${fr(f.atL).replace('^2', '²')} ≠ 0). F_s f = f sur [0 ; π[ et F_s f(π) = 0`, valid: true },
        { id: 'yes', label: 'Oui : F_s f = f sur tout [0 ; π]', valid: false, rule: 'f_sine_endpoint', why: `Le prolongement impair vaut −f près de π à droite : il saute de ${fr(f.atL).replace('^2', '²')} à ${fr(`-${f.atL}`).replace('^2', '²')}. En π, Dirichlet donne la moyenne, 0.` },
      ],
  };
  const b = [{
    html: 'Compare F_s f et f : que vaut F_s f(π) ?', ask: 'F_s f(π) =', start: 'F(π)',
    judge: { kind: 'value', expect: '0', form: 'closed', funcs: ['F'], traps: cont ? {} : { f_sine_endpoint: [f.atL] } },
    pre: [level === 1 ? { kind: 'note', html: `Le prolongement impair vaut 0 en 0 et en π${cont ? ' ; ici f(0) = f(π) = 0 : il est continu, et F_s f = f sur [0 ; π]' : ''}.` } : dec],
    lines: [{ math: '0', note: cont ? 'F_s f(π) = f(π) = 0' : 'Moyenne de f(π) et −f(π)', subgoal: 'compare', act: 'zero', blank: ['0'] }],
  }];
  const d = partC(f, sc.oddK);
  const termStart = `(${sc.oddK}) sin((2k+1)π/2)`;
  const c = [
    {
      html: `En x = π/2, f est continue : F_s f(π/2) = f(π/2) = ${MT(d.fpi2)} = Σ bₙ sin(nπ/2). Pour n pair, sin(nπ/2) = 0 ; pour n = 2k + 1 (k ≥ 0), écris le terme b₂ₖ₊₁ sin((2k + 1)π/2) :`,
      ask: 'terme =', start: termStart, judge: COEFK(d.term),
      lines: [{ math: d.term, note: 'sin((2k + 1)π/2) = (−1)ᵏ', subgoal: 'evaluate', act: 'odd', blank: [d.term] }],
    },
    {
      html: `Donc ${d.eq}, avec S = ${d.Sshow}.${d.given ? ` ${d.given}` : ''} Isole S :`, ask: 'S =', start: 'S',
      judge: { kind: 'value', expect: d.S, form: 'closed' },
      lines: [{ math: d.solve, note: 'Isoler S', subgoal: 'solve', act: 'solve', from: 2 }, { math: d.S, note: '', subgoal: 'solve', act: 'simp', blank: [d.S] }],
    },
  ];
  return { a, b, c, d, sc };
}

const promptOf = (f, d) => `f(x) = ${fr(f.show)}${f.kind === 'tri' ? '' : ' sur [0 ; π]'}. (a) Calcule sa série en sinus F_s f. (b) Compare F_s f et f sur [0 ; π]. (c) Déduis-en S = ${d.Sshow}.`;
const hintsOf = (f, P) => H('(a) Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx, par parties. (b) Le prolongement impair vaut 0 en 0 et en π. (c) Écris Dirichlet en π/2.',
  `bₙ = ${MT(P.a[0].start)}`, `bₙ = ${MT(P.sc.goal)}`);

function oneItem(level, rng, opts, f, which) {
  const P = pieces(f, level);
  const parts = which === 'a' ? P.a : which === 'b' ? P.b : which === 'c' ? P.c : [...P.a, ...P.b, ...P.c];
  const intro = which === 'b' ? ` On a trouvé bₙ = ${MT(P.sc.goal)}.` : which === 'c' ? ` On a trouvé ${P.sc.odd ? `b₂ₖ = 0 et b₂ₖ₊₁ = ${MT(P.sc.odd.goal)}` : `bₙ = ${MT(P.sc.goal)}, et pour n = 2k + 1, b₂ₖ₊₁ = ${MT(P.sc.oddK)}`} ; F_s f = f sur ]0 ; π[.` : '';
  const ask = { a: '(a) Calcule sa série en sinus F_s f.', b: '(b) Compare F_s f et f sur [0 ; π].', c: `(c) Déduis-en S = ${P.d.Sshow}.` }[which];
  return build({
    skill: SK, level, parts, subgoals: SUB, keys: KEYS, choices: CHOICES,
    prompt: which === 'all' ? promptOf(f, P.d) : `f(x) = ${fr(f.show)}${f.kind === 'tri' ? '' : ' sur [0 ; π]'}.${intro} ${ask}`,
    hints: hintsOf(f, P), key: `${SK}:${level}:${which}:${f.id}`, exam: opts.exam ? examTag(opts, 9) : false,
  });
}

function problem(level, rng, opts) {
  const f = pickF(rng);
  const P = pieces(f, level);
  const mk = (parts, title) => build({ skill: SK, level, parts, subgoals: SUB, keys: KEYS, choices: CHOICES, prompt: title, hints: [], noHints: true, key: `${SK}:${level}:${title}:${f.id}` });
  return problemItem({
    skill: SK, level, prompt: promptOf(f, P.d), key: `${level}:${f.id}`, exam: opts.exam ? examTag(opts, 9) : false,
    parts: [
      { item: mk(P.a, '(a) La série en sinus F_s f.'), points: P.a.length === 2 ? [3, 1] : [4], title: '(a) Série en sinus' },
      { item: mk(P.b, '(b) Compare F_s f et f sur [0 ; π].'), points: [2], title: '(b) Comparer F_s f et f' },
      { item: mk(P.c, `(c) Déduis-en S = ${P.d.Sshow}.`), points: [2, 1], title: '(c) La somme' },
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

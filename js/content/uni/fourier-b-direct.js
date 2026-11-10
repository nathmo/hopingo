// f-ft-direct (module F, part b, step U10): the definition of f̂ and its
// direct computation. Templates with integer parameters: c(b² − x²) and
// c(b − |x|) on [−b ; b] (even, FP2, two integrations by parts), c·x on
// [−b ; b] (odd, FP3), c·e^(−w|x|) (even, the integral up to ∞). Parts:
// the formula by parity (judge transform), the integral (equiv in α, by
// parts), f̂(α) (transform), f̂(0) computed apart when α is in a
// denominator (definite; trap f_ft_alpha_zero as a decision). The
// definition itself: blocks (fourier-b-kit.js).

import { partsItem } from './geo-kit.js';
import { problemItem } from './kit-problem.js';
import { examTag } from './kit.js';
import { q, H, ft, term, fac, overSqrt2pi, FML, mcqF, defBlocks, KEYS_FT, TABLE } from './fourier-b-kit.js';

const SK = 'f-ft-direct';
const SUB = [
  { id: 'parity', label: 'parité : forme en cos ou en sin', skill: SK },
  { id: 'ipp', label: 'intégration par parties', skill: 'a1-int-parts' },
  { id: 'value', label: 'f̂(α)', skill: SK },
  { id: 'zero', label: 'f̂(0) à part', skill: SK },
];
const EQA = { kind: 'equiv', vars: ['α'], domain: { α: [0.4, 3] }, target: 'no-int' };

// ---------- templates ----------

function para(rng) {
  const b = rng.pick([1, 1, 2]);
  const c = b === 1 ? rng.pick([1, 2, 3]) : 1;
  const P = term(c, `(${b * b}-x^2)`);
  const ba = b === 1 ? 'α' : `${b}α`;
  return {
    id: `para:${b}:${c}`, parity: 'even', b, c,
    fHtml: `${c === 1 ? '' : c}(${b * b} − x²) si |x| ≤ ${b}, 0 sinon`,
    f: `H(${b}-abs(x))${P.startsWith('(') ? P : `(${P})`}`,
    F: `${2 * c}sqrt(2/π)(sin(${ba})-${ba} cos(${ba}))/α^3`,
    int: `int(${P}cos(α x), x, 0, ${b})`,
    ipp1: `int(${term(2 * c, 'x')} sin(α x)/α, x, 0, ${b})`,
    ipp1Blank: ['sin(α x)'],
    I: `${2 * c}(sin(${ba})-${ba} cos(${ba}))/α^3`,
    IBlank: [`α^3`],
    Fline: `f̂(α) = ${2 * c}√(2/π)(sin(${ba})-${ba} cos(${ba}))/α^3`,
    zeroStart: `(1/√(2π)) int(${P}, x, -${b}, ${b})`,
    zero: overSqrt2pi(q(4 * c * b ** 3, 3)),
    den: 'α³',
    wrongF: `${2 * c}√(2/π)(sin(${ba})+${ba} cos(${ba}))/α^3`,
  };
}

function tent(rng) {
  const b = rng.pick([1, 2, 3]);
  const c = rng.pick([1, 2]);
  const P = term(c, `(${b}-x)`);
  const ba = b === 1 ? 'α' : `${b}α`;
  return {
    id: `tent:${b}:${c}`, parity: 'even', b, c,
    fHtml: `${c === 1 ? `${b} − |x|` : `${c}(${b} − |x|)`} si |x| ≤ ${b}, 0 sinon`,
    f: `H(${b}-abs(x))${term(c, `(${b}-abs(x))`).replace(/^(\d+)\(/, '($1)(')}`,
    F: `${c}sqrt(2/π)(1-cos(${ba}))/α^2`,
    int: `int(${P}cos(α x), x, 0, ${b})`,
    ipp1: `int(${term(c, 'sin(α x)')}/α, x, 0, ${b})`,
    ipp1Blank: ['sin(α x)'],
    I: `${fac(c)}(1-cos(${ba}))/α^2`,
    IBlank: [`cos(${ba})`],
    Fline: `f̂(α) = ${fac(c)}√(2/π)(1-cos(${ba}))/α^2`,
    zeroStart: `(1/√(2π)) int(${term(c, `(${b}-abs(x))`)}, x, -${b}, ${b})`,
    zero: overSqrt2pi(q(c * b * b)),
    den: 'α²',
    wrongF: `${fac(c)}√(2/π)(1+cos(${ba}))/α^2`,
  };
}

function odd(rng) {
  const b = rng.pick([1, 2]);
  const c = rng.pick([1, 2, 3]);
  const ba = b === 1 ? 'α' : `${b}α`;
  const cx = term(c, 'x');
  return {
    id: `odd:${b}:${c}`, parity: 'odd', b, c,
    fHtml: `${c === 1 ? '' : c}x si |x| ≤ ${b}, 0 sinon`,
    f: `H(${b}-abs(x))${c === 1 ? 'x' : `(${c}x)`}`,
    F: `-${c === 1 ? "" : c}i sqrt(2/π)(sin(${ba})-${ba} cos(${ba}))/α^2`,
    int: `int(${cx} sin(α x), x, 0, ${b})`,
    ipp1: `-${term(c * b, `cos(${ba})`)}/α + int(${term(c, 'cos(α x)')}/α, x, 0, ${b})`,
    ipp1Blank: [`cos(${ba})`],
    I: `${fac(c)}(sin(${ba})-${ba} cos(${ba}))/α^2`,
    IBlank: ['α^2'],
    Fline: `f̂(α) = -${c === 1 ? '' : c}i√(2/π)(sin(${ba})-${ba} cos(${ba}))/α^2`,
    zeroStart: `(1/√(2π)) int(${cx}, x, -${b}, ${b})`,
    zero: '0',
    den: 'α²',
    wrongF: `${c === 1 ? '' : c}i√(2/π)(sin(${ba})-${ba} cos(${ba}))/α^2`,
  };
}

function expo(rng) {
  const w = rng.pick([1, 2, 3]);
  const c = rng.pick([1, 1, 2]);
  const wx = w === 1 ? 'x' : `${w}x`;
  const P = term(c, `e^(-${wx})`);
  return {
    id: `exp:${w}:${c}`, parity: 'even', w, c, table: true,
    fHtml: `${c === 1 ? '' : c}e<sup>−${w === 1 ? '' : w}|x|</sup>`,
    f: `${fac(c)}e^(-${w === 1 ? '' : w}abs(x))`,
    F: `${c * w}sqrt(2/π)/(α^2+${w * w})`,
    int: `int(${P}cos(α x), x, 0, ∞)`,
    ipp1: `${term(q(c, w), '')} - ${w === 1 ? 'α' : `(α/${w})`}int(${P}sin(α x), x, 0, ∞)`,
    ipp1Blank: [w === 1 ? 'α' : `α/${w}`],
    I: `${c * w}/(α^2+${w * w})`,
    IBlank: [`${w * w}`],
    Fline: `f̂(α) = ${c * w === 1 ? '' : c * w}√(2/π)/(α^2+${w * w})`,
    zeroStart: null,
    wrongF: `${c * w === 1 ? '' : c * w}√(2/π)/(${w * w}-α^2)`,
    alt: `f̂(α) = (${c === 1 ? '' : c}/√(2π))(1/(${w}-iα)+1/(${w}+iα))`.replace('(/', '(1/'),
  };
}

const TEMPLATES = [para, para, tent, odd, expo];
export const directData = (rng) => rng.pick(TEMPLATES)(rng);

// ---------- the lines ----------

const parityLine = (d) => (d.parity === 'odd'
  ? `f̂(α) = -i√(2/π) ${d.int}`
  : `f̂(α) = √(2/π) ${d.int}`);

function parts(d) {
  const ev = d.parity === 'even';
  const choose = {
    kind: 'decision', prompt: 'Quelle forme de f̂ utiliser ?', options: [
      { id: 'parity', label: ev ? 'f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx' : 'f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx', valid: true, ref: true },
      { id: 'other', label: ev ? 'f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx' : 'f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx', valid: false, why: ev ? 'f(−x) = f(x) : f est paire, la partie en sin s\'annule.' : 'f(−x) = −f(x) : f est impaire, la partie en cos s\'annule.' },
      { id: 'direct', label: 'La définition (1/√(2π)) ∫ f(x) e^(−iαx) dx sur ℝ', valid: true, quality: 'poor', why: 'Juste aussi, mais la parité divise le travail par deux et évite les complexes.' },
      d.table
        ? { id: 'table', label: 'Lire la ligne F7 de la table', valid: true, quality: 'poor', why: 'La table donne le résultat ; ici on demande le calcul direct.' }
        : { id: 'table', label: 'Lire une ligne de la table', valid: false, why: 'f n\'est pas une ligne de la table : on la calcule.' },
    ],
  };
  const out = [{
    html: '', start: `f(x) = ${d.f}`, judge: ft({ f: d.f, F: d.F, final: 'any' }), // the formula by parity, an integral left: final here
    decisions: [choose],
    menu: [
      { id: 'parity', label: ev ? 'Utiliser la parité (FP2)' : 'Utiliser l\'imparité (FP3)', valid: true },
      { id: 'deriv', label: 'Dériver f', valid: false, why: 'On ne dérive rien : on intègre f contre e^(−iαx).' },
      { id: 'zero', label: 'Calculer f̂(0) d\'abord', valid: false, why: 'D\'abord la formule pour α ≠ 0.' },
    ],
    lines: [{ math: parityLine(d), note: ev ? 'FP2 : f paire' : 'FP3 : f impaire', subgoal: 'parity', blank: ['√(2/π)'], blank2: [ev ? 'cos(α x)' : 'sin(α x)'] }],
  }, {
    html: 'L\'intégrale, par parties (α ≠ 0) :', ask: 'Calcule l\'intégrale.', start: d.int, judge: EQA,
    menu: [
      { id: 'ipp', label: 'Intégrer par parties', valid: true },
      { id: 'sub', label: 'Changer de variable u = αx', valid: false, why: 'Il reste un produit polynôme × trigonométrique : c\'est une intégration par parties.' },
      { id: 'prim', label: 'Écrire une primitive directe', valid: false, why: 'Le produit n\'a pas de primitive immédiate.' },
    ],
    lines: [
      { math: d.ipp1, note: 'Intégration par parties', subgoal: 'ipp', blank: d.ipp1Blank },
      { math: d.I, note: d.table ? 'Encore une fois par parties : I = 1/w − (α²/w²) I' : 'Encore par parties', subgoal: 'ipp', blank: d.IBlank, blank2: d.IBlank },
    ],
  }, {
    html: 'Donc :', ask: 'Écris f̂(α).', start: parityLine(d), judge: ft({ f: d.f, F: d.F, traps: { f_ipp_sign: [d.wrongF] } }),
    menu: [{ id: 'value', label: 'Remplacer l\'intégrale par sa valeur', valid: true }, { id: 'table', label: 'Lire la table', valid: false, why: 'On a déjà l\'intégrale : il suffit de la remplacer.' }],
    lines: [{ math: d.Fline, note: 'α ≠ 0', subgoal: 'value' }],
  }];
  if (d.zeroStart) {
    out.push({
      html: `En α = 0, la formule a ${d.den} au dénominateur :`, ask: 'Calcule f̂(0).', start: d.zeroStart, judge: { kind: 'definite' },
      decisions: [{
        kind: 'decision', prompt: 'Comment obtenir f̂(0) ?', options: [
          { id: 'direct', label: 'f̂(0) = (1/√(2π)) ∫ f(x) dx, calculée directement', valid: true, ref: true },
          { id: 'formula', label: 'Remplacer α par 0 dans la formule', valid: false, rule: 'f_ft_alpha_zero', why: `Avec ${d.den} au dénominateur, la formule donne 0/0 en α = 0.` },
        ],
      }],
      menu: [
        { id: 'direct', label: 'Intégrer f directement', valid: true },
        { id: 'formula', label: 'Remplacer α par 0 dans la formule', valid: false, rule: 'f_ft_alpha_zero', why: `Avec ${d.den} au dénominateur, la formule donne 0/0.` },
      ],
      lines: [{ math: d.zero, note: d.parity === 'odd' ? 'f impaire : ∫ f = 0' : 'f̂(0) = (1/√(2π))∫ f', subgoal: 'zero' }],
    });
  }
  return out;
}

export function directLines(level, rng, opts = {}, d = directData(rng)) {
  const ev = d.parity === 'even';
  return partsItem({
    skill: SK, level, parts: parts(d),
    prompt: `Calcule la transformée de Fourier de f(x) = ${d.fHtml}${d.zeroStart ? ', puis f̂(0)' : ''}.`,
    hints: H(ev ? 'f est paire : prends la forme en cos sur [0 ; ∞[ (FP2), puis intègre par parties.' : 'f est impaire : prends la forme en sin (FP3), puis intègre par parties.',
      FML(parityLine(d)), FML(d.ipp1)),
    subgoals: SUB, keys: KEYS_FT, key: `${SK}:${level}:${d.id}`, exam: examTag(opts), noHints: level >= 5 || !!opts.exam,
  });
}

// ---------- multiple choice ----------

function mcqVariant(level, rng, opts) {
  const d = directData(rng);
  const right = [FML(d.Fline)];
  if (d.alt) right.push(FML(d.alt));
  if (d.zeroStart) right.push(`f̂(0) = ${FML(d.zero)}`);
  const wrongs = [
    { html: FML(`f̂(α) = √(2π)(${d.F})`), rule: 'f_ft_norm' },
    { html: FML(`f̂(α) = (${d.F})/√(2π)`), rule: 'f_ft_norm' },
    { html: FML(`f̂(α) = ${d.wrongF}`), rule: 'f_ipp_sign' },
    ...(d.zeroStart && d.zero !== '0' ? [{ html: `f̂(0) = ${FML('0')}`, rule: 'f_ft_alpha_zero' }] : []),
  ];
  return mcqF({
    skill: SK, level, exam: examTag(opts), key: `${SK}:mcq:${d.id}`,
    prompt: `Soit f(x) = ${d.fHtml}. ${opts.exam ? 'Cochez les égalités vraies.' : 'Quelle égalité est vraie ?'}`,
    right: rng.shuffle(right), wrongs: rng.shuffle(wrongs),
    solution: [{ html: `${FML(parityLine(d))}, puis par parties : ${FML(d.Fline)}${d.zeroStart ? ` ; f̂(0) = ${FML(d.zero)} se calcule à part` : ''}.`, note: '' }],
    expectedSec: 150,
  }, rng);
}

// ---------- problem: definition + computation (2021, série de révision) ----------

export function directProblem(level, rng, opts = {}) {
  const d = directData(rng);
  const def = defBlocks(SK, 4, rng, { noHints: true });
  const calc = directLines(5, rng, {}, d);
  const n = d.zeroStart ? 4 : 3;
  return problemItem({
    skill: SK, level,
    prompt: `(i) Donne la définition de la transformée de Fourier, avec ses hypothèses. (ii) Calcule f̂ pour f(x) = ${d.fHtml}.${TABLE()}`,
    parts: [{ item: def, points: 2, title: 'Définition de f̂' }, { item: calc, points: n === 4 ? [1, 1.5, 0.5, 1] : [1, 1.5, 0.5], title: 'Calcul de f̂' }],
    key: `${d.id}:${level}`, exam: opts.exam ? { format: 'open', points: 2 + n } : false,
  });
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return mcqVariant(4, rng, opts);
    if (opts.exam === 'open') return directProblem(4, rng, opts);
    if (level === 5) return directProblem(5, rng, opts);
    if (level <= 2 && rng.chance(0.4)) return defBlocks(SK, level, rng);
    if (level === 4 && rng.chance(0.2)) return defBlocks(SK, 4, rng);
    return directLines(level, rng, opts);
  },
};

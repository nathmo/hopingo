// f-plancherel (module F, part b, step U10): ∫ |f|² = ∫ |f̂|² (no factor
// with the convention 1/√(2π)), to compute an integral in α from an easy
// integral in x. Targets: ∫ sin²(bα)/α² dα (F1), ∫ dα/(α² + w²)² (F7),
// ∫ α² e^(−α²/2) dα (F9), ∫ dx/(x² + w²)² (F6, the other way). Parts: f̂
// from the table (transform), the easy side (definite), the wanted
// integral (definite, its value known to the judge; trap
// f_plancherel_factor). Level 5: the proof from f ∗ f̃ at 0 (2016), in
// blocks, or the computation without help.

import { examTag, blocksItem } from './kit.js';
import { partsItem } from './geo-kit.js';
import { problemItem } from './kit-problem.js';
import { H, ft, FML, mcqF, KEYS_FT, TABLE } from './fourier-b-kit.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';

const SK = 'f-plancherel';
const SUB = [
  { id: 'table', label: 'f̂ par la table', skill: 'f-ft-table' },
  { id: 'lhs', label: 'l\'intégrale facile', skill: SK },
  { id: 'solve', label: 'Plancherel, puis isoler', skill: SK },
];
const key = (t) => toText(parse(t));

function sinc(rng) {
  const b = rng.pick([1, 2, 3]);
  const bα = b === 1 ? 'α' : `${b}α`;
  const want = b === 1 ? 'π' : `${b}π`;
  return {
    id: `F1:${b}`, table: 'F1',
    target: `int(sin(${bα})^2/α^2, α, -∞, ∞)`, value: want,
    fHtml: `f(x) = 1 si |x| &lt; ${b}, 0 sinon`, f: `H(${b}-abs(x))`, fhat: `√(2/π) sin(${bα})/α`,
    easyStart: `int(1, x, -${b}, ${b})`, easy: [String(2 * b)], easyHtml: '∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx',
    solve: [`(π/2) int(1, x, -${b}, ${b})`, want],
    hint2: FML(`int(1, x, -${b}, ${b}) = int((2/π) sin(${bα})^2/α^2, α, -∞, ∞)`),
    factor: [`${b === 1 ? '' : 2 * b}${b === 1 ? '2' : ''}π^2`, b === 2 ? '1' : `${b}/2`],
  };
}

function lorentz(rng) {
  const w = rng.pick([1, 2, 3]);
  const w3 = 2 * w ** 3;
  return {
    id: `F7:${w}`, table: 'F7',
    target: `int(1/(α^2+${w * w})^2, α, -∞, ∞)`, value: `π/${w3}`,
    fHtml: `f(x) = ${FML(`e^(-${w === 1 ? '' : w}|x|)`)}`, f: `e^(-${w === 1 ? '' : w}abs(x))`, fhat: `${w === 1 ? '' : w}√(2/π)/(α^2+${w * w})`,
    easyStart: `int(e^(-${2 * w}|x|), x, -∞, ∞)`, easyValue: `1/${w}`, easy: [`2int(e^(-${2 * w}x), x, 0, ∞)`, `1/${w}`.replace('1/1', '1')],
    easyHtml: '∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx',
    solve: [`(π/${w * w})int(e^(-${2 * w}x), x, 0, ∞)`.replace('/1)', ')'), `π/${w3}`],
    hint2: FML(`int(e^(-${2 * w}|x|), x, -∞, ∞) = (${2 * w * w}/π) int(1/(α^2+${w * w})^2, α, -∞, ∞)`),
    factor: [`π^2/${w3 / 2}`.replace('/1', ''), `1/${2 * w3}`],
  };
}

function gaussMoment() {
  return {
    id: 'F9:1', table: 'F9',
    target: 'int(α^2 e^(-α^2/2), α, -∞, ∞)', value: '√2√π',
    fHtml: `f(x) = ${FML('x e^(-x^2)')} (on donne ∫<sub>ℝ</sub> x² e<sup>−2x²</sup> dx = √(2π)/8)`, f: 'x e^(-x^2)', fhat: '-iα e^(-α^2/4)/(2√2)',
    easyStart: 'int(x^2 e^(-2x^2), x, -∞, ∞)', easy: ['√2√π/8'], easyHtml: '∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx (valeur donnée)',
    solve: ['8 int(x^2 e^(-2x^2), x, -∞, ∞)', '√2√π'],
    hint2: FML('int(x^2 e^(-2x^2), x, -∞, ∞) = (1/8)int(α^2 e^(-α^2/2), α, -∞, ∞)'),
    factor: ['2π√2√π', '√2/(2√π)'],
  };
}

function reverse(rng) {
  const w = rng.pick([1, 2, 3]);
  const w3 = 2 * w ** 3;
  return {
    id: `F6:${w}`, table: 'F6',
    target: `int(1/(x^2+${w * w})^2, x, -∞, ∞)`, value: `π/${w3}`,
    fHtml: `f(x) = ${FML(`1/(x^2+${w * w})`)}`, f: `1/(x^2+${w * w})`, fhat: `√(π/2) e^(-${w === 1 ? '' : w}abs(α))/${w}`.replace('/1', ''),
    easyStart: `int((π/2)e^(-${2 * w}|α|)/${w * w}, α, -∞, ∞)`.replace('/1,', ','), easyValue: `π/${w3}`, easy: [`(π/${w * w})int(e^(-${2 * w}α), α, 0, ∞)`.replace('/1)', ')'), `π/${w3}`], easyHtml: 'Cette fois, c\'est ∫ |f̂(α)|² dα qui est facile',
    solve: [`(π/${w * w})int(e^(-${2 * w}α), α, 0, ∞)`.replace('/1)', ')'), `π/${w3}`],
    hint2: FML(`int(1/(x^2+${w * w})^2, x, -∞, ∞) = int((π/2)e^(-${2 * w}abs(α))/${w * w}, α, -∞, ∞)`.replace('/1,', ',')),
    factor: [`π^2/${w3 / 2}`.replace('/1', ''), `1/${2 * w3}`],
  };
}

const TEMPLATES = [sinc, sinc, lorentz, lorentz, gaussMoment, reverse];

function parts(d) {
  return [{
    html: '', start: `f(x) = ${d.f}`, judge: ft({ f: d.f, F: d.fhat }),
    menu: [{ id: 'table', label: `Ligne ${d.table} de la table`, valid: true }, { id: 'direct', label: 'Calculer f̂ par la définition', valid: false, why: 'La table la donne directement.' }],
    lines: [{ math: `f̂(α) = ${d.fhat}`, note: `Ligne ${d.table}`, subgoal: 'table' }],
  }, {
    html: `${d.easyHtml} :`, ask: 'Calcule l\'intégrale facile.', start: d.easyStart, judge: { kind: 'definite', ...(d.easyValue ? { known: { [key(d.easyStart)]: d.easyValue } } : {}) },
    menu: [{ id: 'calc', label: 'Calculer cette intégrale', valid: true }, { id: 'res', label: 'Utiliser les résidus', valid: false, why: 'Inutile : elle se calcule directement.' }],
    lines: d.easy.map((math, i) => ({ math, note: i === d.easy.length - 1 ? 'Valeur' : 'Parité', subgoal: 'lhs', blank: i === d.easy.length - 1 ? [] : ['2'] })),
  }, {
    html: 'L\'intégrale demandée :', ask: 'Calcule-la avec Plancherel.', start: d.target,
    judge: { kind: 'definite', known: { [key(d.target)]: d.value }, traps: { f_plancherel_factor: d.factor } },
    decisions: [{
      kind: 'decision', prompt: 'Comment la calculer ?', levels: [2, 3, 4, 5], options: [
        { id: 'planch', label: 'Plancherel : ∫ |f(x)|² dx = ∫ |f̂(α)|² dα', valid: true, ref: true },
        { id: 'res', label: 'Les résidus', valid: true, why: 'Juste aussi (fraction rationnelle ou e^(iz)), mais Plancherel est ici plus court.' },
        { id: 'planch2pi', label: 'Plancherel : ∫ |f|² = 2π ∫ |f̂|²', valid: false, rule: 'f_plancherel_factor', why: 'Avec la convention 1/√(2π), Plancherel n\'a pas de facteur.' },
      ],
    }],
    menu: [
      { id: 'planch', label: 'Appliquer Plancherel', valid: true },
      { id: 'prim', label: 'Chercher une primitive', valid: false, why: 'Pas de primitive simple : on passe par Plancherel.' },
    ],
    lines: d.solve.map((math, i) => ({ math, note: i === 0 ? 'Plancherel, puis isoler' : 'Valeur', subgoal: 'solve', blank: i === 0 ? [] : [] })),
  }];
}

export function planchLines(level, rng, opts = {}, d = rng.pick(TEMPLATES)(rng)) {
  return partsItem({
    skill: SK, level, parts: parts(d),
    prompt: `Calcule ${FML(d.target)} avec la formule de Plancherel, en partant de ${d.fHtml}.${TABLE()}`,
    hints: H(`Quelle fonction a pour transformée ${FML(d.fhat)} ? C'est la ligne ${d.table}.`, d.hint2, FML(d.solve[0])),
    subgoals: SUB, keys: KEYS_FT, key: `${SK}:${level}:${d.id}`, exam: examTag(opts), noHints: level >= 5 || !!opts.exam,
  });
}

// ---------- the proof from f ∗ f̃ (2016) ----------

function proof(level, rng) {
  const B = [
    { id: 'p1', html: 'Soit f réelle et f̃(x) = f(−x). Alors ℱ(f̃)(α) = <span style="text-decoration:overline">f̂(α)</span>.', needs: [] },
    { id: 'p2', html: 'Par la convolution, ℱ(f ∗ f̃) = √(2π) f̂ · <span style="text-decoration:overline">f̂</span> = √(2π) |f̂|².', needs: ['p1'] },
    { id: 'p3', html: '(f ∗ f̃)(0) = ∫ f(t) f̃(0 − t) dt = ∫ f(t)² dt.', needs: [] },
    { id: 'p4', html: 'Par inversion en x = 0 : (f ∗ f̃)(0) = (1/√(2π)) ∫ ℱ(f ∗ f̃)(α) dα = ∫ |f̂(α)|² dα.', needs: ['p2'] },
    { id: 'p5', html: 'Donc ∫ f(x)² dx = ∫ |f̂(α)|² dα.', needs: ['p3', 'p4'] },
  ];
  const decoys = [
    { id: 'x1', html: 'Par la convolution, ℱ(f ∗ f̃) = f̂ · <span style="text-decoration:overline">f̂</span> = |f̂|².', needs: [], distractor: 'f_sqrt2pi_conv', why: 'Avec la convention 1/√(2π), ℱ(f ∗ g) = √(2π) f̂ ĝ.' },
    { id: 'x2', html: 'Donc ∫ f(x)² dx = 2π ∫ |f̂(α)|² dα.', needs: [], distractor: 'f_plancherel_factor', why: 'Les √(2π) se compensent : pas de facteur.' },
  ];
  return blocksItem({
    skill: SK, level, mode: 'order',
    prompt: 'Prouve la formule de Plancherel ∫ f² = ∫ |f̂|² à partir de la convolution f ∗ f̃ en 0 (f réelle, assez régulière) : touche les blocs dans l\'ordre.',
    blocks: rng.shuffle([...B, ...decoys]), goal: 'p5', order: ['p1', 'p2', 'p3', 'p4', 'p5'],
    hints: H('Calcule (f ∗ f̃)(0) de deux façons : directement, et par l\'inversion de Fourier.', 'ℱ(f ∗ f̃) = √(2π) |f̂|²', B.map((b) => b.html).join(' ')),
    noHints: level >= 5,
    subgoals: [{ id: 'proof', label: 'preuve de Plancherel', skill: SK }, { id: 'conv', label: 'ℱ(f ∗ g) = √(2π) f̂ ĝ', skill: 'f-ft-table' }],
    key: `proof:${level}`, expectedSec: 180,
  });
}

// ---------- multiple choice, problem ----------

function mcqVariant(level, rng, opts) {
  const d = rng.pick([sinc, lorentz, reverse])(rng);
  const right = [FML(`${d.target} = ${d.value}`), FML(`f̂(α) = ${d.fhat}`)];
  const wrongs = d.factor.map((v) => ({ html: FML(`${d.target} = ${v}`), rule: 'f_plancherel_factor' }));
  wrongs.push({ html: FML(`${d.target} = ${d.easy[d.easy.length - 1]}`), rule: 'f_parseval_square' });
  return mcqF({
    skill: SK, level, exam: examTag(opts), key: `${SK}:mcq:${d.id}`,
    prompt: `Avec ${d.fHtml} et la formule de Plancherel, ${opts.exam ? 'cochez les égalités vraies.' : 'quelle égalité est vraie ?'}${TABLE()}`,
    right: opts.exam ? rng.shuffle(right).slice(0, rng.pick([1, 2])) : [right[0]], wrongs: rng.shuffle(wrongs),
    solution: [{ html: `f̂(α) = ${FML(d.fhat)} (ligne ${d.table}) ; ∫ f² = ∫ |f̂|² donne ${FML(`${d.target} = ${d.value}`)}.`, note: '' }],
    expectedSec: 150,
  }, rng);
}

function planchProblem(level, rng, opts) {
  const it = planchLines(5, rng, {});
  return problemItem({
    skill: SK, level, prompt: it.prompt, parts: [{ item: { ...it, prompt: '' }, points: [1, 1, 1] }],
    key: `${it.key}:${level}`, exam: opts.exam ? { format: 'open', points: 3 } : false,
  });
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return mcqVariant(4, rng, opts);
    if (opts.exam === 'open') return planchProblem(4, rng, opts);
    if (level === 5) return rng.chance(0.5) ? proof(5, rng) : planchLines(5, rng, opts);
    if (level === 4 && rng.chance(0.15)) return proof(4, rng);
    return planchLines(level, rng, opts);
  },
};

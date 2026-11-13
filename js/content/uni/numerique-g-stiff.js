// n-ode-stiff (module N, part g, step U9): stiff problems. Catalogue:
// docs/universite/N-analyse-numerique.md, n-ode-stiff.
//
// A fast mode λ_rapide ∈ {−50, −100, −500, −1000} forces h < 2/|λ| on the
// explicit schemes, while the solution is smooth after a short transient;
// an implicit scheme (ER, CN) chooses h for accuracy only.
// L1 h_max of EP (guided); L2 a diagonal system: which eigenvalue sets h,
// then h_max; L3 choose the scheme (decision, with the trap « réduire la
// tolérance »), then h_max; L4 the table u′ = −50(u − cos t) to read (why
// EP explodes); L5 a non-diagonal 2 × 2 system A = PDP⁻¹: its eigenvalues
// (solset), then h_max, alone.
// Exam: tf (« si EP explose, il faut diminuer la tolérance », false).

import { Q } from '../../math/rational.js';
import { linesItem, mcq } from './kit.js';
import { readtableItem, vfMcq, H, blankBy } from './numerique-kit.js';
import { R, nice } from './numerique-g-kit.js';
import { stiffReadtable } from './numerique-g-stab.js';
import { examTag } from './kit.js';
import { t } from '../../i18n.js';

const SF = 'n-ode-stiff';
const SUB = [
  { id: 'lambda', label: t('repérer le mode rapide'), skill: SF },
  { id: 'hmax', label: 'h < 2/|λ|', skill: 'n-ode-stability' },
  { id: 'diagnose', label: t('stabilité, pas précision'), skill: SF },
  { id: 'choose', label: t('choisir un schéma implicite'), skill: SF },
];
const FAST = [-50, -100, -500, -1000];
const hmaxOf = (lam) => new Q(2, -lam);

const hSeg = (lam, guided, note = 'h_max = 2/|λ|') => {
  const hm = hmaxOf(lam);
  if (!guided) return [{ kind: 'eq', math: String(hm), note: `${note} : 2/${-lam} = ${nice(hm)}`, subgoal: 'hmax' }];
  return [
    { kind: 'eq', math: `2/${-lam}`, note, subgoal: 'hmax' },
    { kind: 'eq', math: String(hm), ...blankBy(String(hm), [String(hm)]), note: `≈ ${nice(hm)}`, subgoal: 'hmax' },
  ];
};

function level1(rng) {
  const lam = rng.pick(FAST);
  return linesItem({
    skill: SF, level: 1, mode: 'guided', keys: ['calc'],
    prompt: t('u′ = {lam}(u − cos t), u(0) = 0. Après un court transitoire, u ≈ cos t, une fonction lisse. Quel est le plus grand pas h_max pour lequel Euler progressif est stable ?', { lam: R(lam) }),
    start: 'h_max', judge: { kind: 'value', expect: String(hmaxOf(lam)), form: 'irreducible', stab: { lambda: String(lam) } },
    script: [{ kind: 'note', html: t('Le mode rapide est λ = {lam} : Euler progressif est stable si |1 + hλ| &lt; 1.', { lam: R(lam) }) }, ...hSeg(lam, true)],
    hints: H(t('Compare la condition de stabilité au pas que la précision demanderait.'), `h &lt; 2/□`, t('h &lt; {v1} alors que la solution est lisse : c\'est un problème raide.', { v1: nice(hmaxOf(lam)) })),
    subgoals: SUB, key: `${SF}:1:${lam}`, baits: ['n_stab_factor2'],
  });
}

function level2(rng) {
  const lam = rng.pick(FAST);
  const slow = rng.pick([-1, -2]);
  return linesItem({
    skill: SF, level: 2, mode: 'guided', keys: ['calc'],
    prompt: t('u′ = Au avec A = diag({slow} ; {lam}) (rapport de raideur {v1}). Quel pas maximal impose la stabilité d\'Euler progressif ?', { slow: R(slow), lam: R(lam), v1: lam / slow }),
    start: 'h_max', judge: { kind: 'value', expect: String(hmaxOf(lam)), form: 'irreducible', stab: { lambda: String(lam) } },
    script: [
      {
        kind: 'decision', prompt: t('Quelle valeur propre impose le pas ?'), options: rng.shuffle([
          { id: 'fast', label: t('λ = {lam}, le mode rapide', { lam: R(lam) }), valid: true, ref: true },
          { id: 'slow', label: t('λ = {slow}, le mode lent qu\'on veut suivre', { slow: R(slow) }), valid: false, why: t('Chaque valeur propre doit vérifier |1 + hλ| &lt; 1 : la plus grande en module, {lam}, est la plus exigeante.', { lam: R(lam) }) },
        ]),
      },
      ...hSeg(lam, true, `|1 + h·(${R(lam)})| < 1`),
    ],
    hints: H(t('Pour un système, chaque valeur propre doit vérifier |1 + hλ| &lt; 1 : la plus grande en module décide.'), 'h &lt; 2/□', `h &lt; 2/${-lam} = ${nice(hmaxOf(lam))}.`),
    subgoals: SUB, key: `${SF}:2:${slow}:${lam}`, baits: ['n_stab_factor2'],
  });
}

function level3(rng) {
  const lam = rng.pick(FAST);
  return linesItem({
    skill: SF, level: 3, mode: 'tap', keys: ['calc'],
    prompt: t('u′ = {lam}(u − cos t) sur [0 ; 10] : la solution est lisse après le transitoire, et la précision voulue demanderait h ≈ 0,1. Choisis le schéma, puis donne le pas maximal que demanderait Euler progressif.', { lam: R(lam) }),
    start: 'h_max', judge: { kind: 'value', expect: String(hmaxOf(lam)), form: 'irreducible', stab: { lambda: String(lam) } },
    script: [
      {
        kind: 'decision', prompt: t('Quel schéma choisis-tu ?'), options: [
          { id: 'er', label: t('Euler rétrograde (implicite), avec h ≈ 0,1 choisi pour la précision'), valid: true, ref: true },
          { id: 'ep', label: t('Euler progressif avec h = 0,1'), valid: false, why: t('Instable : il faut h &lt; 2/{v1}.', { v1: -lam }) },
          { id: 'tol', label: t('Euler progressif, en réduisant la tolérance s\'il explose'), valid: false, rule: 'n_stiff_accuracy', why: t('L\'explosion vient de la stabilité, pas de la précision : seul un pas h &lt; 2/|λ| la supprime.') },
        ],
      },
      ...hSeg(lam, false),
    ],
    hints: H(t('Un problème raide : la stabilité de l\'explicite impose un pas bien plus petit que la précision.'), 'h_max = 2/□', t('h_max = {v1} : choisis un schéma implicite.', { v1: nice(hmaxOf(lam)) })),
    subgoals: SUB, key: `${SF}:3:${lam}`, baits: ['n_stiff_accuracy'],
  });
}

function level4(rng) {
  const { table, prompt } = stiffReadtable(rng);
  const question = mcq({
    skill: SF, level: 4, key: `${SF}:why`,
    prompt: t('Pourquoi Euler progressif explose-t-il pour N = 20 et 24, alors que la solution est lisse ?'),
    options: [
      { html: t('Stabilité : h > 2/50 = 0,04, donc |1 − 50h| > 1'), correct: true },
      { html: t('Précision : il suffit de réduire la tolérance'), correct: false, rule: 'n_stiff_accuracy' },
      { html: t('La solution exacte explose elle aussi'), correct: false },
      { html: t('Les erreurs d\'arrondi de la machine'), correct: false },
    ],
    solution: [{ html: t('Le mode λ = −50 impose h &lt; 0,04 à Euler progressif : pour h = 0,05 et 0,0417, il explose. Euler rétrograde reste stable pour tout h.'), note: '' }],
  }, rng);
  return readtableItem({
    skill: SF, level: 4, key: 'why', prompt, table, question,
    hints: H(t('Compare h à 2/|λ| = 2/50.'), t('Pour h = 0,05 : |1 − 50h| = □'), t('|1 − 50·0,05| = 1,5 > 1 : instable.')),
    subgoals: SUB,
  });
}

// A = PDP⁻¹ with P unimodular, D = diag(slow, fast).
const PS = [[[1, 1], [1, 2]], [[2, 1], [1, 1]], [[1, 2], [1, 1]], [[1, 1], [2, 3]]];
function level5(rng) {
  const lam = rng.pick([-50, -100]);
  const slow = rng.pick([-1, -2]);
  const P = rng.pick(PS);
  const [[a, b], [c, d]] = P;
  const det = a * d - b * c; // ±1
  const Pi = [[d / det, -b / det], [-c / det, a / det]];
  const D = [slow, lam];
  const A = [0, 1].map((i) => [0, 1].map((j) => P[i][0] * D[0] * Pi[0][j] + P[i][1] * D[1] * Pi[1][j]));
  const tr = slow + lam;
  const dt = slow * lam;
  return linesItem({
    skill: SF, level: 5, mode: 'free', keys: ['calc', 'greek', 'set'], noHints: true,
    prompt: t('u′ = Au avec A = {v1}. Trouve les valeurs propres de A, puis le pas maximal d\'Euler progressif.', { v1: R(`[[${A[0].join(', ')}], [${A[1].join(', ')}]]`) }),
    start: `λ^2-(${tr})λ+${dt}=0`, judge: { kind: 'solset', v: 'λ' },
    script: [
      { kind: 'note', html: t('det(A − λI) = λ² − (tr A)λ + det A, avec tr A = {tr} et det A = {dt}.', { tr: R(tr), dt }) },
      { kind: 'eq', math: `{${lam} ; ${slow}}`, note: t('Rapport de raideur {v1}', { v1: lam / slow }), subgoal: 'lambda' },
      { kind: 'segment', html: t('Le pas maximal d\'Euler progressif :'), ask: 'h_max =', start: { math: 'h_max' }, judge: { kind: 'value', expect: String(hmaxOf(lam)), form: 'irreducible', stab: { lambda: String(lam) } } },
      ...hSeg(lam, false, t('Le mode rapide λ = {lam} décide', { lam: R(lam) })),
    ],
    hints: [], subgoals: SUB, key: `${SF}:5:${A.flat().join(',')}`, baits: [],
  });
}

function examTf(rng, opts) {
  return vfMcq({
    skill: SF, key: `${SF}:tf`, exam: examTag(opts), truth: false, ruleIfTrue: 'n_stiff_accuracy',
    statement: t('Si Euler progressif explose sur un problème raide, il faut diminuer la tolérance demandée.'),
    explanation: t('Faux : c\'est une question de stabilité. Il faut h &lt; 2/|λ_rapide|, ou un schéma implicite.'),
  }, rng);
}

export const GEN = {
  [SF]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'tf') return examTf(rng, opts);
    switch (level) {
      case 1: return level1(rng);
      case 2: return level2(rng);
      case 3: return level3(rng);
      case 4: return level4(rng);
      default: return level5(rng);
    }
  },
};

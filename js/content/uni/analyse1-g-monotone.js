// a1-seq-monotone (step U4): a sequence that is monotone and bounded
// converges. Templates of the catalogue: (a) uₙ = Σ_{k=1}^{n} 1/kᵖ (p = 2,
// 3), increasing, bounded by 2 with a telescoping sum; (b) uₙ = Σ_{k=0}^{n}
// 1/k!, bounded by 3 with a geometric sum; (c) uₙ₊₁ = √(c + uₙ), u₀ = 0,
// bounded by its fixed point ℓ (induction: `equiv` with rel on u ∈ [0 ; ℓ])
// and increasing. Parts: monotony (`equiv`), the bound (`equiv` with rel
// '≤' on whole n, ending on a number), then the conclusion (`value`: the
// bound, or ℓ). Level 5 and the `tf` variant: true/false of exams, with
// sequences as counter-examples.

import { linesItem, tfItem } from './kit.js';
import { modeOf, H, E, assemble, blanked } from './analyse1-c-kit.js';
import { M, VAL, EQN, seqCounter } from './analyse1-g-kit.js';

const MO = 'a1-seq-monotone';
const KEYS = ['calc', 'seq', 'fact'];
const SUB = [
  { id: 'tele', label: 'somme télescopique ou géométrique', skill: 'a1-ser-geo-tele' },
  { id: 'ind', label: 'récurrence', skill: 'g5-induction-more' },
  { id: 'concl', label: 'monotone et bornée', skill: MO },
];
const CHOICES = [
  { id: 'diff', label: 'Calculer uₙ₊₁ − uₙ' },
  { id: 'cmp', label: 'Majorer chaque terme par un terme plus simple' },
  { id: 'tele', label: 'Comparer à une somme télescopique' },
  { id: 'telesum', label: 'Télescoper' },
  { id: 'geo', label: 'Comparer à une somme géométrique' },
  { id: 'geosum', label: 'Sommer la suite géométrique' },
  { id: 'simplify', label: 'Simplifier' },
  { id: 'bound', label: 'Majorer par une constante' },
  { id: 'induct', label: 'Récurrence : utiliser u ≤ ℓ' },
  { id: 'conj', label: 'Multiplier par la quantité conjuguée' },
  { id: 'concl', label: 'Conclure : monotone et bornée' },
  { id: 'bounded', label: 'Conclure : elle est bornée, donc elle converge', rule: 'a1_bounded_implies_convergent', why: 'Bornée ne suffit pas : (−1)ⁿ est bornée et diverge.' },
];

function concludeDecision(up, bound) {
  return {
    kind: 'decision', prompt: 'Que conclure ?', options: [
      { id: 'mono', label: `(uₙ) est croissante et majorée par ${bound} : elle converge`, valid: true, ref: true },
      { id: 'bounded', label: '(uₙ) est bornée, donc elle converge', valid: false, rule: 'a1_bounded_implies_convergent', why: 'Bornée ne suffit pas : (−1)ⁿ est bornée et diverge. C\'est « croissante et majorée » qui donne la convergence.' },
      { id: 'inf', label: '(uₙ) est croissante, donc elle tend vers +∞', valid: false, why: `Elle est croissante mais majorée par ${bound} : elle ne peut pas tendre vers +∞.` },
    ],
  };
}

function sumItem(level, rng, opts) {
  const kind = rng.pick(['p2', 'p3', 'fact']);
  const fact = kind === 'fact';
  const p = kind === 'p3' ? 3 : 2;
  const term = fact ? '1/k!' : `1/k^${p}`;
  const lo = fact ? 0 : 1;
  const u = `sum(${term},k,${lo},n)`;
  const diff = `sum(${term},k,${lo},n+1)-sum(${term},k,${lo},n)`;
  const step = fact ? '1/(n+1)!' : `1/(n+1)^${p}`;
  const bound = fact ? '3' : '2';
  const bLines = fact ? [
    E('1+sum(1/2^(k-1),k,1,n)', '1/k! ≤ 1/2^(k−1) pour k ≥ 1', 'tele', 'geo'),
    E('1+2(1-1/2^n)', 'Somme géométrique de raison 1/2', 'tele', 'geosum'),
    E('3-1/2^(n-1)', 'Simplifier', 'tele', 'simplify'),
    E('3', 'Majorer par une constante', 'concl', 'bound'),
  ] : [
    ...(p === 3 ? [E('sum(1/k^2,k,1,n)', '1/k³ ≤ 1/k²', 'tele', 'cmp')] : []),
    E('1+sum(1/(k-1)-1/k,k,2,n)', '1/k² ≤ 1/(k(k − 1)) = 1/(k − 1) − 1/k pour k ≥ 2', 'tele', 'tele'),
    E('2-1/n', 'Télescoper', 'tele', 'telesum'),
    E('2', 'Majorer par une constante', 'concl', 'bound'),
  ];
  let mLines = [E(step, 'Tous les termes s\'en vont sauf le dernier', 'concl', 'diff')];
  if (level === 1) {
    mLines = [blanked(mLines[0], [fact ? 'n+1' : `(n+1)^${p}`])];
    bLines.splice(bLines.length - 2, 1, blanked(bLines[bLines.length - 2], [fact ? '1/2^(n-1)' : '1/n']));
  }
  const choice = fact ? {
    prompt: 'Quel majorant de 1/k! (k ≥ 1) donne une somme bornée ?', ok: '1/2^(k−1)',
    bad: [{ label: '1/k', why: 'Σ 1/k n\'est pas bornée : ce majorant ne prouve rien.' }, { label: '1/2^k', why: 'Pour k = 1 : 1/1! = 1 > 1/2. Ce n\'est pas un majorant.' }],
  } : {
    prompt: `Quel majorant de 1/k${p === 3 ? '³' : '²'} (k ≥ 2) donne une somme bornée ?`, ok: '1/(k − 1) − 1/k',
    bad: [{ label: '1/k', why: 'Σ 1/k n\'est pas bornée : ce majorant ne prouve rien.' }, { label: '1/(k(k + 1))', why: '1/(k(k + 1)) < 1/k² : ce n\'est pas un majorant.' }],
  };
  const pick = {
    kind: 'decision', prompt: choice.prompt, options: [
      { id: 'ok', label: choice.ok, valid: true, ref: true },
      ...choice.bad.map((b, i) => ({ id: `b${i}`, label: b.label, valid: false, why: b.why })),
    ],
  };
  const parts = [
    { html: 'Sens de variation :', start: diff, judge: EQN({ domain: { n: { int: [1, 30] } }, target: 'goal', goal: step }), lines: mLines, choices: CHOICES },
    {
      html: 'Un majorant :', start: u, judge: { kind: 'equiv', vars: ['n'], from: 1, span: 60, maxN: 1000, rel: '≤' },
      lines: bLines, pre: level === 2 ? [pick] : [], choices: CHOICES,
    },
    {
      html: 'Conclusion :', start: 'lim(u_n,n,∞)', ask: '≤', judge: VAL(bound), lines: [E(bound, 'Croissante et majorée', 'concl', 'concl')],
      pre: level <= 3 ? [concludeDecision(true, bound)] : [], choices: CHOICES,
    },
  ];
  const as = assemble(parts, level);
  return linesItem({
    skill: MO, level,
    prompt: `Soit uₙ = ${M(u)}. Montre que (uₙ) est croissante et majorée par ${bound}, et conclus.`,
    ...as, mode: modeOf(level), keys: KEYS, subgoals: SUB, tapActions: level === 3 ? 'steps' : null,
    hints: H(
      'Montre qu\'elle croît (uₙ₊₁ − uₙ), puis trouve un majorant qui ne dépend pas de n.',
      fact ? '1/k! ≤ 1/2^(k−1), donc uₙ ≤ 1 + Σ 1/2^(k−1)' : '1/k² ≤ 1/(k − 1) − □ pour k ≥ 2',
      fact ? `uₙ ≤ 1 + 2(1 − 1/2ⁿ) ≤ 3` : 'uₙ ≤ 1 + (1 − 1/n) ≤ 2',
    ),
    key: `${MO}:${u}`, exam: opts.exam ? { format: opts.exam, points: 2 } : false,
  });
}

function recItem(level, rng, opts) {
  const l = rng.pick([2, 3, 4, 5]);
  const c = l * (l - 1);
  const rel = (r) => ({ kind: 'equiv', vars: ['u'], domain: { u: [0, l] }, rel: r });
  let hLines = [E(`√(${c}+${l})`, `u ≤ ${l} et √ est croissante`, 'ind', 'induct'), E(String(l), 'Calculer', 'ind', 'simplify')];
  let mLines = [E(`(${c}+u-u^2)/(√(${c}+u)+u)`, 'Quantité conjuguée', 'concl', 'conj'), E('0', `${c} + u − u² = (${l} − u)(u + ${l - 1}) ≥ 0 sur [0 ; ${l}]`, 'concl', 'bound')];
  if (level === 1) {
    hLines = [blanked(hLines[0], [`${c}+${l}`]), hLines[1]];
    mLines = [blanked(mLines[0], [`${c}+u-u^2`]), mLines[1]];
  }
  const how = {
    kind: 'decision', prompt: `Comment montrer que uₙ ≤ ${l} pour tout n ?`, options: [
      { id: 'ind', label: `Par récurrence : u₀ = 0 ≤ ${l}, et uₙ ≤ ${l} ⇒ uₙ₊₁ ≤ ${l}`, valid: true, ref: true },
      { id: 'lim', label: `La limite est ${l}, donc uₙ ≤ ${l}`, valid: false, why: 'On ne sait pas encore que la suite converge : c\'est ce qu\'on veut prouver.' },
    ],
  };
  const parts = [
    {
      html: `Majorée par ${l} (récurrence) : on suppose 0 ≤ u ≤ ${l}, avec u = uₙ.`, start: `√(${c}+u)`, judge: rel('≤'), lines: hLines,
      pre: [{ kind: 'note', html: `u₀ = 0 ≤ ${l}. Hérédité : si 0 ≤ uₙ ≤ ${l}, alors uₙ₊₁ = √(${c} + uₙ) ≤ ?` }, ...(level === 2 ? [how] : [])], choices: CHOICES,
    },
    {
      html: `Croissante : uₙ₊₁ − uₙ = √(${c} + u) − u pour 0 ≤ u ≤ ${l}.`, start: `√(${c}+u)-u`, judge: rel('≥'), lines: mLines, choices: CHOICES,
      pre: level === 2 || level === 3 ? [{
        kind: 'decision', prompt: 'Comment montrer que (uₙ) est croissante ?', options: [
          { id: 'sign', label: 'Montrer que uₙ₊₁ − uₙ = √(' + c + ' + uₙ) − uₙ ≥ 0', valid: true, ref: true },
          { id: 'f', label: `f(x) = √(${c} + x) est croissante, donc (uₙ) est croissante`, valid: false, rule: 'a1_monotone_by_f_increasing', why: `f croissante dit seulement que (uₙ) est monotone ; le sens vient du signe de u₁ − u₀ = √${c} − 0, ou de uₙ₊₁ − uₙ.` },
        ],
      }] : [],
    },
    {
      html: `Conclusion : la limite ℓ vérifie ℓ = √(${c} + ℓ) et ℓ ≥ 0.`, start: 'lim(u_n,n,∞)', judge: VAL(l), lines: [E(String(l), `ℓ² − ℓ − ${c} = 0, ℓ ≥ 0`, 'concl', 'concl')],
      pre: level <= 3 ? [concludeDecision(true, l)] : [], choices: CHOICES,
    },
  ];
  const as = assemble(parts, level);
  return linesItem({
    skill: MO, level,
    prompt: `Soit u₀ = 0 et uₙ₊₁ = √(${c} + uₙ). Montre que (uₙ) est majorée par ${l} et croissante, puis calcule sa limite.`,
    ...as, declares: { vars: ['u', 'n'] }, mode: modeOf(level), keys: ['calc', 'seq'], subgoals: SUB, tapActions: level === 3 ? 'steps' : null,
    hints: H(
      `Récurrence : si uₙ ≤ ${l}, alors √(${c} + uₙ) ≤ √(${c} + ${l}). Puis le signe de uₙ₊₁ − uₙ.`,
      `√(${c} + u) − u = (${c} + u − u²)/(□)`,
      `√(${c} + u) ≤ √(${c + l}) = ${l} ; ${c} + u − u² = (${l} − u)(u + ${l - 1}) ≥ 0`,
    ),
    key: `${MO}:rec:${c}`, exam: opts.exam ? { format: opts.exam, points: 2 } : false,
  });
}

const TF = [
  { key: 'bounded', truth: false, rule: 'a1_bounded_implies_convergent', s: 'Toute suite bornée est convergente.', counter: () => seqCounter({ hyp: [{ p: 'bounded' }], concl: { p: 'converges' }, answer: { a: '(-1)^n' } }), why: 'Faux : aₙ = (−1)ⁿ est bornée et ne converge pas.' },
  { key: 'rec', truth: false, rule: 'a1_bounded_implies_convergent', s: 'Toute suite définie par une récurrence aₙ₊₁ = f(aₙ) et bornée est convergente.', counter: () => seqCounter({ hyp: [{ p: 'bounded' }], concl: { p: 'converges' }, answer: { a: '(-1)^n' } }), why: 'Faux : aₙ₊₁ = −aₙ avec a₀ = 1 donne aₙ = (−1)ⁿ, bornée et divergente (examen MT 2014).' },
  { key: 'dec', truth: false, s: 'Toute suite décroissante converge.', counter: () => seqCounter({ hyp: [{ p: 'decreasing' }], concl: { p: 'converges' }, answer: { a: '-n' } }), why: 'Faux : il faut aussi qu\'elle soit minorée. xₙ = 2 − (1 + 1/2 + … + 1/n) décroît vers −∞ ; plus simple : aₙ = −n.' },
  { key: 'pos', truth: false, s: 'Toute suite croissante et positive converge.', counter: () => seqCounter({ hyp: [{ p: 'increasing' }, { p: 'positive' }], concl: { p: 'converges' }, answer: { a: 'n' } }), why: 'Faux : positive veut dire minorée par 0 ; une suite croissante doit être majorée. aₙ = n.' },
  { key: 'mono', truth: false, s: 'Toute suite monotone est bornée.', counter: () => seqCounter({ hyp: [{ p: 'monotone' }], concl: { p: 'bounded' }, answer: { a: 'n' } }), why: 'Faux : aₙ = n est croissante et non bornée.' },
  { key: 'up', truth: true, s: 'Toute suite croissante et majorée converge.', why: 'Vrai : elle converge vers le Sup de ses termes.' },
  { key: 'f1n', truth: true, s: 'Si f : ℝ → ℝ est continue et aₙ = f(1/n), alors (aₙ) est de Cauchy.', why: 'Vrai : aₙ → f(0) par continuité, et une suite convergente est de Cauchy.' },
  { key: 'fn', truth: true, s: 'Si f : [1 ; +∞[ → ℝ est croissante et bornée, alors aₙ = f(n) est de Cauchy.', why: 'Vrai : (aₙ) est croissante et majorée, donc convergente, donc de Cauchy.' },
  { key: 'conv', truth: true, s: 'Toute suite convergente est bornée.', why: 'Vrai : à partir d\'un rang N, |aₙ − ℓ| ≤ 1 ; il reste un nombre fini de termes.' },
  { key: 'cauchy', truth: true, s: 'Une suite de réels converge si et seulement si elle est de Cauchy.', why: 'Vrai : c\'est la complétude de ℝ.' },
];

function moTf(level, rng, opts = {}) {
  const t = rng.pick(TF);
  return tfItem({
    skill: MO, level, truth: t.truth, key: t.key, statement: t.s, ruleIfTrue: t.truth ? null : t.rule || null,
    counter: t.truth ? null : t.counter(), explanation: t.why,
    exam: opts.exam ? { format: 'tf', points: 1 } : false, noHints: level === 5, expectedSec: 60,
    hints: H(
      'Pense aux exemples simples : (−1)ⁿ, n, −n, 1/n.',
      'Bornée ne suffit pas ; monotone non plus. Les deux ensemble, oui.',
      t.truth ? 'Cet énoncé est vrai.' : 'Cet énoncé est faux : cherche un contre-exemple.',
    ),
  });
}

export function moItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf' || level === 5) return moTf(level, rng, opts);
  const lv = opts.exam === 'open' ? 4 : level;
  return rng.chance(0.65) ? sumItem(lv, rng, opts) : recItem(lv, rng, opts);
}

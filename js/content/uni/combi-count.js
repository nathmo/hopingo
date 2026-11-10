// Generators of module G7, counting (step U7): g7-perm-arr, g7-combinations,
// g7-which-count. Catalogue: docs/universite/G-gymnase-2.md, « G7 ».
// Counts are judged by `prob` (C(n, k), A(n, k), n! exact); the literal
// simplifications of factorials by `equiv` (n a whole number, expanded
// polynomial as final form), with the trap's wrong lines in cfg.eqTraps.

import { statItem, choice, tf, numCounter, H, SM, examTag, openItem, modeOf } from './proba-kit.js';
import { partsItem } from './geo-kit.js';
import { mcq, answerItem, MT } from './kit.js';
import { choose, arrange, fact } from '../../cas/stats.js';

const big = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const KEYS = ['calc', 'stat', 'calcfn'];

// ======================================================================
// g7-perm-arr
// ======================================================================

const PA = 'g7-perm-arr';
const PA_SUB = [
  { id: 'formula', label: 'reconnaître et écrire la formule', skill: PA },
  { id: 'simplify', label: 'simplifier les factorielles', skill: PA },
  { id: 'boxes', label: 'une case par étape', skill: 'g7-mult-principle' },
];

// Words with repeated letters (French, common).
const WORDS = ['RADAR', 'BANANE', 'ANANAS', 'COCOTTE', 'ABBAYE', 'TOMATE', 'BALLE', 'POMME', 'MAMAN', 'CARAFE', 'ELLIPSE', 'PAPILLON', 'CHOCOLAT', 'BONBON', 'LETTRE', 'TERRASSE'];
function letterCounts(w) {
  const m = new Map();
  for (const c of w) m.set(c, (m.get(c) || 0) + 1);
  return [...m.entries()].filter(([, k]) => k > 1);
}

const PODIUM = [
  (n, k) => (k === 3 ? `De combien de façons ${n} coureurs peuvent-ils occuper les 3 marches du podium (or, argent, bronze) ?` : `${n} coureurs participent à une course. Combien de classements des ${k} premières places sont possibles ?`),
  (n, k) => `Un club de ${n} membres élit un président, un secrétaire${k > 2 ? ', un caissier' : ''}${k > 3 ? ' et un vice-président' : ''} (${k} postes différents, une personne par poste). Combien de bureaux possibles ?`,
  (n, k) => `${n} chevaux prennent le départ. Combien de tiercés${k === 2 ? ' (les 2 premiers seulement)' : k === 4 ? ' (quarté : les 4 premiers)' : ''} dans l'ordre sont possibles ?`,
];

function paData(rng, kinds) {
  const kind = rng.pick(kinds);
  if (kind === 'podium') {
    const n = rng.int(4, 10);
    const k = rng.int(2, Math.min(4, n - 1));
    const fs = Array.from({ length: k }, (_, i) => n - i);
    const value = arrange(n, k);
    return {
      kind, n, k, value, story: rng.pick(PODIUM)(n, k),
      lines: [
        { math: `A(${n};${k})`, note: 'Arrangement : ordre compté, pas de répétition', subgoal: 'formula', blank: [String(n), String(k)], blank2: [`A(${n};${k})`] },
        { math: fs.join('×'), note: `${k} cases : ${n} choix, puis un de moins`, subgoal: 'boxes', blank: [String(fs[fs.length - 1])] },
        { math: String(value), note: 'Calculer', blank: [String(value)] },
      ],
      traps: { g7_order_confusion: { values: [String(choose(n, k))], ctx: { ordered: 'les places sont différentes', k } }, g7_repetition_confusion: { values: [String(n ** k)], ctx: { repeat: false } } },
      hints: H('L\'ordre compte (or ≠ argent), et une personne ne peut pas occuper deux places : A(n, k).', SM(`${fs.slice(0, -1).join('×')}×□`), big(value)),
      action: 'Arrangement A(n, k) : une case par place',
      wrongActions: [
        { label: 'Combinaisons C(n, k) : l\'ordre ne compte pas', rule: 'g7_order_confusion', why: 'Ici l\'ordre compte : être premier ou deuxième, ce n\'est pas pareil.' },
        { label: `${n}^${k} : ${n} choix à chaque place`, rule: 'g7_repetition_confusion', why: 'Une même personne ne peut pas occuper deux places : un choix de moins à chaque fois.' },
      ],
    };
  }
  if (kind === 'line') {
    const n = rng.int(4, 8);
    const value = fact(n);
    const what = rng.pick([['personnes', 'se mettre en file'], ['livres différents', 'être rangés sur une étagère'], ['élèves', 's\'asseoir sur un banc de ' + n + ' places']]);
    return {
      kind, n, value, story: `De combien de façons ${n} ${what[0]} peuvent-ils ${what[1]} ?`.replace('peuvent-ils s', 'peuvent-ils s'),
      lines: [
        { math: `${n}!`, note: 'Permutation de n objets distincts : n!', subgoal: 'formula', blank: [String(n)] },
        { math: Array.from({ length: n }, (_, i) => n - i).join('×'), note: 'Une case par place', subgoal: 'boxes', blank: ['1'] },
        { math: String(value), note: 'Calculer', blank: [String(value)] },
      ],
      traps: { g7_repetition_confusion: { values: [String(n ** n)], ctx: { repeat: false } } },
      hints: H('Une place après l\'autre : n choix, puis n − 1, … C\'est n!.', SM(`${n}×${n - 1}×□`), big(value)),
      action: 'Permutation : n!',
      wrongActions: [{ label: `${n}^${n}`, rule: 'g7_repetition_confusion', why: 'Un objet placé ne peut pas l\'être une 2e fois.' }],
    };
  }
  // anagrams
  const w = rng.pick(WORDS);
  const reps = letterCounts(w);
  const n = w.length;
  const den = reps.reduce((p, [, k]) => p * fact(k), 1);
  const value = fact(n) / den;
  const denT = reps.map(([, k]) => `${k}!`).join('×');
  const one = reps[0];
  const partial = fact(n) / fact(one[1]);
  const traps = { g7_anagram_repeats: { values: [String(fact(n)), ...(reps.length > 1 ? [String(partial)] : [])], ctx: { over: denT.replace(/×/g, '·'), n } } };
  return {
    kind: 'anagram', n, value, word: w,
    story: `Combien d'anagrammes (mots avec les mêmes lettres, sans souci de sens) a le mot ${w} ?`,
    lines: [
      { math: reps.length > 1 ? `${n}!/(${denT})` : `${n}!/${denT}`, note: `${reps.map(([c, k]) => `${c} ${k} fois`).join(', ')}`, subgoal: 'formula', blank: reps.map(([, k]) => `${k}!`), blank2: [`${n}!`] },
      { math: `${fact(n)}/${den}`, note: 'Calculer', subgoal: 'simplify', blank: [String(den)] },
      { math: String(value), note: 'Simplifier', blank: [String(value)] },
    ],
    traps,
    hints: H(`${n} lettres : ${n}! rangements, mais échanger deux lettres identiques donne le même mot. Divise par la factorielle de chaque lettre répétée.`, SM(`${n}!/(□)`), big(value)),
    action: 'Anagrammes : n! divisé par les factorielles des lettres répétées',
    wrongActions: [{ label: `${n}! : toutes les lettres comme si elles étaient différentes`, rule: 'g7_anagram_repeats', why: 'Les lettres répétées sont indiscernables : chaque mot serait compté plusieurs fois.' }],
  };
}

// Simplification of a!/b! with a = n + p, b = n + q, 1 ≤ p − q ≤ 3.
function simplifyItem(level, rng, opts) {
  const q = rng.int(-1, 1);
  const p = q + rng.int(1, level >= 4 ? 3 : 2);
  const t = (k) => (k === 0 ? 'n' : k > 0 ? `n+${k}` : `n-${-k}`);
  const f = (k) => (k === 0 ? 'n!' : `(${t(k)})!`);
  const start = `${f(p)}/${f(q)}`;
  const factors = [];
  for (let k = p; k > q; k--) factors.push(k === 0 ? 'n' : `(${t(k)})`);
  const product = factors.join('');
  // Expanded polynomial: ∏ (n + k).
  let poly = [1];
  for (let k = p; k > q; k--) {
    const next = Array(poly.length + 1).fill(0);
    poly.forEach((c, i) => { next[i + 1] += c; next[i] += c * k; });
    poly = next;
  }
  const terms = [];
  for (let i = poly.length - 1; i >= 0; i--) {
    const c = poly[i];
    if (!c) continue;
    const mono = i === 0 ? '' : i === 1 ? 'n' : `n^${i}`;
    const coef = mono && Math.abs(c) === 1 ? (c < 0 ? '-' : '') : String(c);
    terms.push(`${terms.length && c > 0 ? '+' : ''}${coef}${mono}`);
  }
  const expanded = terms.join('');
  const wrongA = `(${t(p)})/(${t(q)})`;
  const wrongB = p - q === 1 ? '1' : `(${p - q})!`;
  const judge = { kind: 'equiv', vars: ['n'], domain: { n: { int: [3, 12] } }, target: 'expanded', eqTraps: { g7_factorial_quotient: [wrongA, wrongB] } };
  const expand = `${factors.join('·')}·${f(q)}`;
  const lines = [
    { math: `${product}×${f(q)}/${f(q)}`, note: `${f(p)} = ${expand}`, subgoal: 'simplify', blank: [f(q)] },
    { math: product, note: 'Simplifier par ' + f(q), subgoal: 'simplify', blank: [product] },
    { math: expanded, note: 'Développer', blank: [expanded] },
  ];
  if (factors.length === 1) lines.splice(1, 1);
  if (lines.length > 1 && lines[lines.length - 2].math === lines[lines.length - 1].math) lines.pop();
  const menu = [
    { id: 'expand', label: `Écrire ${f(p)} comme un produit qui contient ${f(q)}`, valid: true },
    { id: 'frac', label: 'Simplifier comme une fraction : enlever les « ! »', valid: false, rule: 'g7_factorial_quotient', why: 'Les factorielles ne se divisent pas comme des fractions : développe la plus grande.' },
    { id: 'cancel', label: 'Calculer (p − q)!', valid: false, rule: 'g7_factorial_quotient', why: 'a!/b! n\'est pas (a − b)! : par exemple 5!/3! = 20, alors que 2! = 2.' },
  ];
  const item = partsItem({
    skill: PA, level, prompt: `Simplifie (n est un entier, n ≥ 3), et écris le résultat comme un polynôme développé : ${MT(start)}`,
    parts: [{ start, judge, menu, lines }],
    hints: H(`${f(p)} = ${expand} : simplifie par ${f(q)}, puis développe.`, `${MT(start)} = ${MT(product)} = □`, MT(expanded)),
    subgoals: PA_SUB, keys: ['calc', 'stat', 'calcfn'], key: `${PA}:${level}:simp:${start}`, exam: examTag(opts),
  });
  return item;
}

function paItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return paMcq(rng, opts);
  if (opts.exam === 'tf') return paTf(rng, opts);
  if ((level === 4 && rng.chance(0.35)) || (level === 3 && rng.chance(0.25))) return simplifyItem(level, rng, opts);
  if (level === 5) return paL5(rng, opts);
  const kinds = level === 1 ? ['podium', 'anagram', 'line'] : ['podium', 'anagram', 'anagram', 'podium', 'line'];
  const d = paData(rng, kinds);
  const decisions = level === 2 ? [{ prompt: 'Quelle formule ?', options: [
    { id: 'arr', label: 'A(n, k) : k places parmi n, ordre compté', valid: d.kind === 'podium', why: 'Il n\'y a pas k places à choisir parmi n ici.' },
    { id: 'perm', label: 'n! : tous les objets en ligne', valid: d.kind === 'line', why: d.kind === 'podium' ? 'Il n\'y a que k places, pas n.' : 'Les lettres répétées ne sont pas des objets distincts.', rule: d.kind === 'anagram' ? 'g7_anagram_repeats' : undefined },
    { id: 'ana', label: 'n!/(n₁!·n₂!…) : lettres répétées', valid: d.kind === 'anagram', why: 'Il n\'y a pas d\'objets répétés ici.' },
  ] }] : [];
  return statItem({
    skill: PA, level, key: `${level}:${d.kind}:${d.word ?? `${d.n}-${d.k}`}`, prompt: d.story,
    parts: [{ label: 'N', kind: 'prob', expect: String(d.value), traps: d.traps, decisions, action: d.action, wrongActions: d.wrongActions, lines: d.lines }],
    hints: d.hints, subgoals: PA_SUB, exam: examTag(opts),
  });
}

// Level 5: anagrams with a constraint (the word starts with a given letter).
function paL5(rng, opts) {
  for (let t = 0; t < 50; t++) {
    const w = rng.pick(WORDS);
    const reps = letterCounts(w);
    const first = rng.pick([...new Set(w)]);
    const rest = w.replace(first, '');
    const rr = letterCounts(rest);
    const n = rest.length;
    const den = rr.reduce((p, [, k]) => p * fact(k), 1);
    const value = fact(n) / den;
    const denT = rr.map(([, k]) => `${k}!`).join('×') || '1';
    const all = fact(w.length) / reps.reduce((p, [, k]) => p * fact(k), 1);
    if (value === all) continue;
    return statItem({
      skill: PA, level: 5, key: `5:start:${w}:${first}`,
      prompt: `Combien d'anagrammes du mot ${w} commencent par la lettre ${first} ?`,
      parts: [{ label: 'N', kind: 'prob', expect: String(value),
        traps: { g7_anagram_repeats: { values: [String(fact(n)), String(all)], ctx: { over: denT.replace(/×/g, '·'), n } } },
        lines: [
          { math: rr.length ? `${n}!/(${denT})` : `${n}!`, note: `On place ${first} en tête ; il reste ${n} lettres (${rest})`, subgoal: 'formula' },
          { math: String(value), note: 'Calculer' },
        ] }],
      hints: [], subgoals: PA_SUB, exam: examTag(opts),
    });
  }
  return paItem(4, rng, null, opts);
}

function paMcq(rng, opts) {
  const d = paData(rng, ['podium', 'anagram', 'podium']);
  const wrongs = Object.entries(d.traps).flatMap(([rule, t]) => t.values.map((v) => ({ html: big(v), rule })));
  const fillers = [d.value * 2, d.value + d.n, Math.round(d.value / 2)].map((x) => ({ html: big(x) }));
  return choice({ skill: PA, level: 4, prompt: d.story, right: big(d.value), wrongs, fillers, key: `mcq:${d.kind}:${d.value}`, exam: examTag(opts) }, rng);
}

function paTf(rng, opts) {
  const kind = rng.pick(['double', 'succ', 'arr']);
  if (kind === 'double') {
    return tf({
      skill: PA, key: 'double', exam: examTag(opts),
      statement: 'Pour tout entier n ≥ 1, (2n)! = 2·n!.', truth: false, ruleIfTrue: 'g7_factorial_quotient',
      explanation: 'Faux : pour n = 2, (2n)! = 4! = 24, alors que 2·2! = 4.',
      counter: numCounter({ vars: [{ v: 'n', dom: 'N*' }], pred: '((2n)!)=2×(n!)', answer: { n: '2' } }),
    });
  }
  if (kind === 'succ') {
    return tf({
      skill: PA, key: 'succ', exam: examTag(opts),
      statement: 'Pour tout entier n ≥ 1, (n + 1)! = (n + 1)·n!.', truth: true,
      explanation: 'Vrai : (n + 1)! = (n + 1)·n·(n − 1)···1 = (n + 1)·n!.',
    });
  }
  const n = rng.int(5, 9);
  const k = rng.int(2, 3);
  const truth = rng.chance(0.5);
  const claim = truth ? arrange(n, k) : choose(n, k);
  return tf({
    skill: PA, key: `arr:${n}:${k}:${truth}`, exam: examTag(opts),
    statement: `Il y a ${claim} façons d'attribuer ${k} postes différents à ${k} personnes choisies parmi ${n}.`,
    truth, ruleIfTrue: truth ? null : 'g7_order_confusion',
    explanation: `Les postes sont différents : l'ordre compte, A(${n}, ${k}) = ${arrange(n, k)}.`,
    counter: truth ? null : numCounter({ vars: [{ v: 'N', label: 'Le bon nombre de façons =', dom: 'N' }], pred: `N=${claim}`, hyp: `N=${arrange(n, k)}`, answer: { N: String(arrange(n, k)) } }),
  });
}

// ======================================================================
// g7-combinations
// ======================================================================

const CO = 'g7-combinations';
const CO_SUB = [
  { id: 'groups', label: 'choisir dans chaque groupe', skill: 'g7-mult-principle' },
  { id: 'formula', label: 'C(n, k) = A(n, k)/k!', skill: 'g7-perm-arr' },
  { id: 'comb', label: 'combinaisons', skill: CO },
];
const GROUPS = [
  ['femmes', 'hommes', 'Un comité est formé de {a} femmes choisies parmi {A} et de {b} hommes choisis parmi {B}.'],
  ['élèves de 1re', 'élèves de 2e', 'Une délégation compte {a} élèves de 1re année (parmi {A}) et {b} élèves de 2e année (parmi {B}).'],
  ['romans', 'BD', 'Pour les vacances, Léa emporte {a} romans parmi {A} et {b} BD parmi {B}.'],
];

function coData(rng, kinds) {
  const kind = rng.pick(kinds);
  if (kind === 'equation') {
    const k = rng.int(2, 3);
    const n = rng.int(5, 15);
    const m = choose(n, k);
    const kf = fact(k);
    const prodT = k === 2 ? 'n(n − 1)' : 'n(n − 1)(n − 2)';
    const prodV = Array.from({ length: k }, (_, i) => n - i).join('·');
    return {
      kind, n, k, m, value: n,
      story: `Trouve l'entier n tel que C(n, ${k}) = ${m}.`,
      parts: [
        { label: k === 2 ? 'n(n−1)' : 'n(n−1)(n−2)', name: 'P', kind: 'prob', expect: String(m * kf), action: `Écrire C(n, ${k}) = ${prodT}/${k}! et chasser le dénominateur`,
          notes: [`C(n, ${k}) = ${prodT}/${kf} = ${m}`],
          lines: [{ math: `${kf}×${m}`, note: `On multiplie par ${k}! = ${kf}`, subgoal: 'formula', blank: [String(m)] }, { math: String(m * kf), note: 'Calculer', blank: [String(m * kf)] }] },
        { label: 'n', kind: 'prob', expect: String(n), action: `Chercher ${k} entiers consécutifs dont le produit vaut ${m * kf}`,
          lines: [{ math: String(n), note: `${prodV} = ${m * kf}`, subgoal: 'comb', blank: [String(n)] }] },
      ],
      hints: H(`C(n, ${k}) = ${prodT}/${k}! : multiplie par ${kf}, puis cherche des entiers consécutifs.`, `${prodT} = □`, `n = ${n}`),
    };
  }
  if (kind === 'cards') {
    const deck = rng.pick([32, 36, 52]);
    const hand = rng.int(3, 5);
    const j = rng.int(1, Math.min(3, hand - 1));
    const what = rng.pick(['dames', 'as', 'rois']);
    const v1 = choose(4, j);
    const v2 = choose(deck - 4, hand - j);
    const value = v1 * v2;
    return {
      kind, value,
      story: `On tire une main de ${hand} cartes d'un jeu de ${deck} cartes (4 ${what}). Combien de mains contiennent exactement ${j} ${j > 1 || what === 'as' ? what : what.slice(0, -1)} ?`,
      parts: [{ label: 'N', kind: 'prob', expect: String(value), action: 'Choisir les ' + what + ' parmi 4, puis le reste parmi les autres cartes, et multiplier',
        traps: { g7_order_confusion: { values: [String(arrange(4, j) * arrange(deck - 4, hand - j))], ctx: { k: hand, kf: fact(hand) } }, g7_add_instead_multiply: { values: [String(v1 + v2)], ctx: { second: v2 } } },
        wrongActions: [{ label: 'Additionner les deux choix', rule: 'g7_add_instead_multiply', why: 'Chaque choix des ' + what + ' va avec chaque choix des autres cartes : on multiplie.' }, { label: 'Utiliser A(n, k) : les cartes arrivent dans un ordre', rule: 'g7_order_confusion', why: 'Une main ne dépend pas de l\'ordre des cartes : C(n, k).' }],
        lines: [
          { math: `C(4;${j})×C(${deck - 4};${hand - j})`, note: `Les ${what}, puis ${hand - j > 1 ? `les ${hand - j} autres cartes` : "l'autre carte"}`, subgoal: 'groups', blank: [String(j), String(hand - j)], blank2: [`C(${deck - 4};${hand - j})`] },
          { math: `${v1}×${v2}`, note: 'Calculer', subgoal: 'comb', blank: [String(v2)] },
          { math: String(value), note: 'Résultat', blank: [String(value)] },
        ] }],
      hints: H(`Choisis les ${what} parmi les 4, puis les autres cartes parmi les ${deck - 4} qui restent : multiplie les deux comptes.`, SM(`C(4;${j})×C(□;${hand - j})`), big(value)),
    };
  }
  // committee
  const [, , tpl] = rng.pick(GROUPS);
  const A = rng.int(5, 12);
  const B = rng.int(4, 10);
  const a = rng.int(2, Math.min(4, A - 1));
  const b = rng.int(2, Math.min(4, B - 1));
  const v1 = choose(A, a);
  const v2 = choose(B, b);
  const value = v1 * v2;
  const story = `${tpl.replace('{a}', a).replace('{A}', A).replace('{b}', b).replace('{B}', B)} Combien de choix possibles ?`;
  return {
    kind: 'committee', value, story,
    parts: [{ label: 'N', kind: 'prob', expect: String(value), action: 'Choisir dans chaque groupe avec C(n, k), puis multiplier',
      traps: { g7_order_confusion: { values: [String(arrange(A, a) * arrange(B, b))], ctx: { k: a, kf: fact(a) } }, g7_add_instead_multiply: { values: [String(v1 + v2)], ctx: { second: v2 } } },
      wrongActions: [{ label: 'Additionner les choix des deux groupes', rule: 'g7_add_instead_multiply', why: 'Chaque choix du 1er groupe se combine avec chaque choix du 2e : on multiplie.' }, { label: 'Arrangements A(n, k)', rule: 'g7_order_confusion', why: 'Dans un groupe choisi, l\'ordre ne compte pas : C(n, k).' }],
      lines: [
        { math: `C(${A};${a})×C(${B};${b})`, note: 'Choisir dans chaque groupe', subgoal: 'groups', blank: [String(a), String(b)], blank2: [`C(${B};${b})`] },
        { math: `${v1}×${v2}`, note: `C(${A}, ${a}) = ${v1} ; C(${B}, ${b}) = ${v2}`, subgoal: 'comb', blank: [String(v1)] },
        { math: String(value), note: 'Multiplier', blank: [String(value)] },
      ] }],
    hints: H('Dans un groupe choisi, l\'ordre ne compte pas : C(n, k) dans chaque groupe, puis on multiplie.', SM(`C(${A};${a})×C(□;□)`), big(value)),
  };
}

// « At least one »: total − none.
function coAtLeast(rng) {
  const W = rng.int(3, 7);
  const M = rng.int(3, 8);
  const k = rng.int(2, 4);
  const total = choose(W + M, k);
  const none = choose(M, k);
  const value = total - none;
  return {
    kind: 'atleast', value,
    story: `Un groupe compte ${W} femmes et ${M} hommes. On choisit un comité de ${k} personnes. Combien de comités contiennent au moins une femme ?`,
    parts: [
      { label: 'N_tous', name: 'T', title: 'Tous les comités', kind: 'prob', expect: String(total), action: 'Compter tous les comités', lines: [{ math: `C(${W + M};${k})`, note: 'Tous les comités', subgoal: 'comb' }, { math: String(total), note: 'Calculer' }] },
      { label: 'N_0', name: 'Z', title: 'Comités sans femme', kind: 'prob', expect: String(none), action: 'Compter les comités sans femme', lines: [{ math: `C(${M};${k})`, note: 'Seulement des hommes', subgoal: 'groups' }, { math: String(none), note: 'Calculer' }] },
      { label: 'N', title: 'Au moins une femme', kind: 'prob', expect: '$T-$Z', action: 'Retirer les comités sans femme', traps: { g7_order_confusion: { values: [String(arrange(W + M, k) - arrange(M, k))], ctx: { k, kf: fact(k) } } },
        lines: [{ math: `${total}-${none}`, note: 'Au moins une = tous − aucune' }, { math: String(value), note: 'Résultat' }] },
    ],
    hints: H('« Au moins une femme » : compte tous les comités, puis retire ceux qui n\'ont aucune femme.', SM(`C(${W + M};${k})-C(□;${k})`), big(value)),
  };
}

function coItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return coMcq(rng, opts);
  if (opts.exam === 'tf') return coTf(rng, opts);
  if (opts.exam === 'open') return coOpen(rng, opts);
  const d = level === 5 ? coAtLeast(rng) : coData(rng, level >= 4 ? ['committee', 'cards', 'equation'] : level === 3 ? ['committee', 'cards', 'equation'] : ['committee', 'cards']);
  if (level === 2 && d.kind !== 'equation') {
    d.parts[0].decisions = [{ prompt: 'Un seul groupe ou plusieurs ?', options: [
      { id: 'several', label: 'Plusieurs groupes : choisir dans chacun, puis multiplier', valid: true },
      { id: 'one', label: 'Un seul groupe : C(total, total choisi)', valid: false, why: 'L\'énoncé impose combien on prend dans chaque groupe : on choisit dans chacun.' },
      { id: 'add', label: 'Plusieurs groupes : choisir dans chacun, puis additionner', valid: false, rule: 'g7_add_instead_multiply', why: 'On choisit dans le 1er groupe ET dans le 2e : on multiplie.' },
    ] }];
  }
  return statItem({ skill: CO, level, key: `${level}:${d.kind}:${d.story}`, prompt: d.story, parts: d.parts, hints: d.hints, subgoals: CO_SUB, exam: examTag(opts) });
}

function coMcq(rng, opts) {
  const d = coData(rng, ['committee', 'cards']);
  const t = d.parts[0].traps;
  const wrongs = Object.entries(t).flatMap(([rule, x]) => x.values.map((v) => ({ html: big(v), rule })));
  return choice({ skill: CO, level: 4, prompt: d.story, right: big(d.value), wrongs, fillers: [d.value * 2, d.value + 1, Math.round(d.value / 2)].map((x) => ({ html: big(x) })), key: `mcq:${d.story}`, exam: examTag(opts) }, rng);
}

function coTf(rng, opts) {
  if (rng.chance(0.5)) {
    const n = rng.int(6, 12);
    const k = rng.int(2, n - 2);
    const truth = rng.chance(0.6);
    const other = truth ? n - k : k + 1 !== n - k ? k + 1 : k - 1;
    return tf({
      skill: CO, key: `sym:${n}:${k}:${truth}`, exam: examTag(opts),
      statement: `C(${n}, ${k}) = C(${n}, ${other}).`, truth,
      explanation: truth ? `Vrai : choisir ${k} objets, c'est laisser les ${n - k} autres : C(n, k) = C(n, n − k).` : `Faux : C(${n}, ${k}) = ${choose(n, k)} et C(${n}, ${other}) = ${choose(n, other)}.`,
      counter: truth ? null : numCounter({ vars: [{ v: 'c', label: `C(${n}, ${other}) =`, dom: 'N' }], pred: `c=${choose(n, k)}`, hyp: `c=${choose(n, other)}`, answer: { c: String(choose(n, other)) } }),
    });
  }
  return tf({
    skill: CO, key: 'c-eq-a', exam: examTag(opts),
    statement: 'Pour tous entiers 0 ≤ k ≤ n, C(n, k) = A(n, k).', truth: false, ruleIfTrue: 'g7_order_confusion',
    explanation: 'Faux : A(n, k) = k!·C(n, k). Par exemple C(3, 2) = 3 et A(3, 2) = 6.',
    counter: numCounter({ vars: [{ v: 'n', dom: 'N' }, { v: 'k', dom: 'N' }], hyp: 'k≤n', pred: '(n!)/((k!)×((n-k)!))=(n!)/((n-k)!)', answer: { n: '3', k: '2' } }),
  });
}

// The open variant: a committee, then « at least one » (CMS exercise).
function coOpen(rng, opts) {
  const d = coAtLeast(rng);
  return openItem({ skill: CO, key: `open:${d.story}`, prompt: d.story, parts: d.parts, subgoals: CO_SUB, title: 'Au moins une femme' }, 4, rng);
}

// ======================================================================
// g7-which-count (flash exercise, multiple choice)
// ======================================================================

const WC = 'g7-which-count';
// Situations: text (n, k), its cell, and the clue of level 1.
// cells: pow = nᵏ (order, repetition), arr = A(n, k), comb = C(n, k), rep = C(n + k − 1, k).
const SITUATIONS = [
  { cell: 'pow', clue: 'dans l\'ordre', t: (n, k) => `Un cadenas a ${k} molettes, chacune de ${n} symboles. Combien de codes ?` },
  { cell: 'pow', clue: 'plusieurs fois', t: (n, k) => `On lance ${k} fois un dé à ${n} faces et on note les résultats dans l'ordre. Combien de suites de résultats ?` },
  { cell: 'pow', clue: 'remise', t: (n, k) => `Une urne contient ${n} boules numérotées. On en tire ${k}, une à une, avec remise, en notant l'ordre. Combien de résultats ?` },
  { cell: 'pow', clue: 'mot', t: (n, k) => `Combien de « mots » de ${k} lettres peut-on écrire avec un alphabet de ${n} lettres (les lettres peuvent se répéter) ?` },
  { cell: 'pow', clue: 'chaque question', t: (n, k) => `Un QCM a ${k} questions, chacune avec ${n} réponses possibles. De combien de façons peut-on remplir la grille ?` },
  { cell: 'arr', clue: 'podium', t: (n, k) => `${n} coureurs, ${k} places classées à la fin de la course (1er, 2e, …). Combien de classements des ${k} premiers ?` },
  { cell: 'arr', clue: 'postes différents', t: (n, k) => `Dans un club de ${n} membres, on choisit ${k} personnes pour ${k} postes différents. Combien de choix ?` },
  { cell: 'arr', clue: 'sans remise, dans l\'ordre', t: (n, k) => `On tire ${k} boules, une à une, sans remise, d'une urne de ${n} boules numérotées, en notant l'ordre. Combien de résultats ?` },
  { cell: 'arr', clue: 'chiffres distincts', t: (n, k) => `Combien de codes de ${k} chiffres tous différents peut-on former avec ${n} touches ?` },
  { cell: 'arr', clue: 'places numérotées', t: (n, k) => `${k} amis s'assoient sur ${k} des ${n} chaises numérotées d'une rangée. De combien de façons ?` },
  { cell: 'comb', clue: 'une poignée', t: (n, k) => `On prend une poignée de ${k} boules dans une urne de ${n} boules numérotées. Combien de poignées ?` },
  { cell: 'comb', clue: 'comité', t: (n, k) => `On forme un comité de ${k} personnes dans un groupe de ${n}. Combien de comités ?` },
  { cell: 'comb', clue: 'main', t: (n, k) => `On distribue une main de ${k} cartes prises dans un paquet de ${n}. Combien de mains ?` },
  { cell: 'comb', clue: 'équipe', t: (n, k) => `Un entraîneur choisit ${k} joueurs parmi ${n} pour une équipe (sans poste fixé). Combien d'équipes ?` },
  { cell: 'comb', clue: 'loterie', t: (n, k) => `À une loterie, on coche ${k} numéros parmi ${n}. Combien de grilles ?` },
  { cell: 'rep', clue: 'parfums, le même plusieurs fois', t: (n, k) => `Un cornet a ${k} boules de glace choisies parmi ${n} parfums (on peut reprendre un parfum ; l'ordre dans le cornet ne compte pas). Combien de cornets ?` },
  { cell: 'rep', clue: 'pièces identiques', t: (n, k) => `On répartit ${k} pièces identiques dans ${n} tirelires (une tirelire peut en recevoir plusieurs). Combien de répartitions ?` },
  { cell: 'rep', clue: 'avec répétition, sans ordre', t: (n, k) => `On lance ${k} dés identiques à ${n} faces en même temps et on note seulement combien de fois sort chaque face. Combien de résultats ?` },
];
const ORDER = { pow: true, arr: true, comb: false, rep: false };
const REPEAT = { pow: true, arr: false, comb: false, rep: true };
const FORM = { pow: (n, k) => `${n}^${k}`, arr: (n, k) => `A(${n};${k})`, comb: (n, k) => `C(${n};${k})`, rep: (n, k) => `C(${n + k - 1};${k})` };
const VALUE = { pow: (n, k) => n ** k, arr: arrange, comb: choose, rep: (n, k) => choose(n + k - 1, k) };
// The trap named by a wrong cell.
const cellRule = (right, wrong) => (ORDER[right] !== ORDER[wrong] ? 'g7_order_confusion' : 'g7_repetition_confusion');
const WC_SUB = (cell) => [{ id: 'calc', label: 'calculer', skill: cell === 'comb' || cell === 'rep' ? CO : PA }, { id: 'case', label: 'choisir la case', skill: WC }, { id: 'comb', label: 'combinaisons', skill: CO }];

function wcItem(level, rng, profile, opts = {}) {
  const pool = SITUATIONS.filter((s) => level >= 4 || opts.exam || s.cell !== 'rep');
  const s = rng.pick(pool);
  const n = rng.int(4, 12);
  const k = rng.int(2, Math.min(5, n - 1));
  const story = s.t(n, k);
  const key = `${level}:${SITUATIONS.indexOf(s)}:${n}:${k}`;
  const withSub = (it) => ({ ...it, subgoals: WC_SUB(s.cell) });
  if (level === 1 && !opts.exam) {
    const right = ORDER[s.cell];
    return withSub(mcq({ skill: WC, level, key: `${WC}:${key}`,
      prompt: `${story.replace(s.clue, `<b>${s.clue}</b>`)}<br>Échange deux éléments du résultat : obtiens-tu un autre résultat ? L'ordre compte-t-il ?`,
      options: [{ html: 'Oui, l\'ordre compte', correct: right, rule: right ? null : 'g7_order_confusion' }, { html: 'Non, l\'ordre ne compte pas', correct: !right, rule: right ? 'g7_order_confusion' : null }],
      keepOrder: true, solution: [{ html: right ? 'L\'ordre compte : deux résultats dans un autre ordre sont différents.' : 'L\'ordre ne compte pas : on obtient le même ensemble.', note: '' }] }, rng));
  }
  if (level === 2 && !opts.exam) {
    const cells = ['pow', 'arr', 'comb', 'rep'];
    const label = (c) => `Ordre : ${ORDER[c] ? 'oui' : 'non'} ; répétition : ${REPEAT[c] ? 'oui' : 'non'}`;
    return withSub(mcq({ skill: WC, level, key: `${WC}:${key}`, prompt: `${story}<br>L'ordre compte-t-il ? Peut-on reprendre le même élément ?`, keepOrder: true,
      options: cells.map((c) => ({ html: label(c), correct: c === s.cell, rule: c === s.cell ? null : cellRule(s.cell, c) })),
      solution: [{ html: label(s.cell), note: '' }] }, rng));
  }
  const cells = level === 3 && !opts.exam ? ['pow', 'arr', 'comb'] : ['pow', 'arr', 'comb', 'rep'];
  if (level === 3 && !opts.exam) {
    return withSub(mcq({ skill: WC, level, key: `${WC}:${key}`, prompt: `${story}<br>Quelle formule ?`,
      options: cells.map((c) => ({ html: SM(FORM[c](n, k)), correct: c === s.cell, rule: c === s.cell ? null : cellRule(s.cell, c) })),
      solution: [{ html: `${SM(FORM[s.cell](n, k))} = ${big(VALUE[s.cell](n, k))}`, note: '' }] }, rng));
  }
  const value = VALUE[s.cell](n, k);
  if (level === 4 && !opts.exam && rng.chance(0.5)) {
    const traps = cells.filter((c) => c !== s.cell && VALUE[c](n, k) !== value).map((c) => ({ value: String(VALUE[c](n, k)), rule: cellRule(s.cell, c) }));
    return withSub({ ...answerItem({ skill: WC, level, key, prompt: `${story}<br>Choisis la bonne formule, puis donne le nombre.`, expected: value, traps,
      solution: [{ html: `${SM(FORM[s.cell](n, k))} = ${big(value)}`, note: '' }] }), keys: 'int' });
  }
  // Levels 4 (half), 5 and the exam: the formulas with their values.
  const right = `${SM(FORM[s.cell](n, k))} = ${big(value)}`;
  const wrongs = cells.filter((c) => c !== s.cell).map((c) => ({ html: `${SM(FORM[c](n, k))} = ${big(VALUE[c](n, k))}`, rule: cellRule(s.cell, c) }));
  return withSub(choice({ skill: WC, level: opts.exam ? 4 : level, prompt: `${story}`, right, wrongs, key: `calc:${key}`, exam: examTag(opts) }, rng));
}

export const GEN = { [PA]: paItem, [CO]: coItem, [WC]: wcItem };
void modeOf; void KEYS;

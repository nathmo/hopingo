// Generators of module G7, counting (step U7): g7-perm-arr, g7-combinations,
// g7-which-count. Catalogue: docs/universite/G-gymnase-2.md, « G7 ».
// Counts are judged by `prob` (C(n, k), A(n, k), n! exact); the literal
// simplifications of factorials by `equiv` (n a whole number, expanded
// polynomial as final form), with the trap's wrong lines in cfg.eqTraps.

import { statItem, choice, tf, numCounter, H, SM, examTag, openItem, modeOf } from './proba-kit.js';
import { partsItem } from './geo-kit.js';
import { mcq, answerItem, MT } from './kit.js';
import { choose, arrange, fact } from '../../cas/stats.js';
import { t } from '../../i18n.js';

// French text with its values: the item keys stay built from the French story.
const frFill = (s, v) => s.replace(/\{(\w+)\}/g, (m, k) => (k in v ? String(v[k]) : m));

const big = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const KEYS = ['calc', 'stat', 'calcfn'];

// ======================================================================
// g7-perm-arr
// ======================================================================

const PA = 'g7-perm-arr';
const PA_SUB = [
  { id: 'formula', label: t('reconnaître et écrire la formule'), skill: PA },
  { id: 'simplify', label: t('simplifier les factorielles'), skill: PA },
  { id: 'boxes', label: t('une case par étape'), skill: 'g7-mult-principle' },
];

// Words with repeated letters (French, common).
const WORDS = ['RADAR', 'BANANE', 'ANANAS', 'COCOTTE', 'ABBAYE', 'TOMATE', 'BALLE', 'POMME', 'MAMAN', 'CARAFE', 'ELLIPSE', 'PAPILLON', 'CHOCOLAT', 'BONBON', 'LETTRE', 'TERRASSE'];
function letterCounts(w) {
  const m = new Map();
  for (const c of w) m.set(c, (m.get(c) || 0) + 1);
  return [...m.entries()].filter(([, k]) => k > 1);
}

const PODIUM = [
  (n, k) => (k === 3 ? t('De combien de façons {n} coureurs peuvent-ils occuper les 3 marches du podium (or, argent, bronze) ?', { n }) : t('{n} coureurs participent à une course. Combien de classements des {k} premières places sont possibles ?', { n, k })),
  (n, k) => (k > 3 ? t('Un club de {n} membres élit un président, un secrétaire, un caissier et un vice-président ({k} postes différents, une personne par poste). Combien de bureaux possibles ?', { n, k })
    : k > 2 ? t('Un club de {n} membres élit un président, un secrétaire, un caissier ({k} postes différents, une personne par poste). Combien de bureaux possibles ?', { n, k })
      : t('Un club de {n} membres élit un président, un secrétaire ({k} postes différents, une personne par poste). Combien de bureaux possibles ?', { n, k })),
  (n, k) => (k === 2 ? t('{n} chevaux prennent le départ. Combien de tiercés (les 2 premiers seulement) dans l\'ordre sont possibles ?', { n })
    : k === 4 ? t('{n} chevaux prennent le départ. Combien de tiercés (quarté : les 4 premiers) dans l\'ordre sont possibles ?', { n })
      : t('{n} chevaux prennent le départ. Combien de tiercés dans l\'ordre sont possibles ?', { n })),
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
        { math: `A(${n};${k})`, note: t('Arrangement : ordre compté, pas de répétition'), subgoal: 'formula', blank: [String(n), String(k)], blank2: [`A(${n};${k})`] },
        { math: fs.join('×'), note: t('{k} cases : {n} choix, puis un de moins', { k, n }), subgoal: 'boxes', blank: [String(fs[fs.length - 1])] },
        { math: String(value), note: t('Calculer'), blank: [String(value)] },
      ],
      traps: { g7_order_confusion: { values: [String(choose(n, k))], ctx: { ordered: t('les places sont différentes'), k } }, g7_repetition_confusion: { values: [String(n ** k)], ctx: { repeat: false } } },
      hints: H(t('L\'ordre compte (or ≠ argent), et une personne ne peut pas occuper deux places : A(n, k).'), SM(`${fs.slice(0, -1).join('×')}×□`), big(value)),
      action: t('Arrangement A(n, k) : une case par place'),
      wrongActions: [
        { label: t('Combinaisons C(n, k) : l\'ordre ne compte pas'), rule: 'g7_order_confusion', why: t('Ici l\'ordre compte : être premier ou deuxième, ce n\'est pas pareil.') },
        { label: t('{p} : {n} choix à chaque place', { p: `${n}^${k}`, n }), rule: 'g7_repetition_confusion', why: t('Une même personne ne peut pas occuper deux places : un choix de moins à chaque fois.') },
      ],
    };
  }
  if (kind === 'line') {
    const n = rng.int(4, 8);
    const value = fact(n);
    const story = rng.pick([
      t('De combien de façons {n} personnes peuvent-elles se mettre en file ?', { n }),
      t('De combien de façons {n} livres différents peuvent-ils être rangés sur une étagère ?', { n }),
      t('De combien de façons {n} élèves peuvent-ils s\'asseoir sur un banc de {n} places ?', { n }),
    ]);
    return {
      kind, n, value, story,
      lines: [
        { math: `${n}!`, note: t('Permutation de n objets distincts : n!'), subgoal: 'formula', blank: [String(n)] },
        { math: Array.from({ length: n }, (_, i) => n - i).join('×'), note: t('Une case par place'), subgoal: 'boxes', blank: ['1'] },
        { math: String(value), note: t('Calculer'), blank: [String(value)] },
      ],
      traps: { g7_repetition_confusion: { values: [String(n ** n)], ctx: { repeat: false } } },
      hints: H(t('Une place après l\'autre : n choix, puis n − 1, … C\'est n!.'), SM(`${n}×${n - 1}×□`), big(value)),
      action: t('Permutation : n!'),
      wrongActions: [{ label: `${n}^${n}`, rule: 'g7_repetition_confusion', why: t('Un objet placé ne peut pas l\'être une 2e fois.') }],
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
    story: t('Combien d\'anagrammes (mots avec les mêmes lettres, sans souci de sens) a le mot {w} ?', { w }),
    lines: [
      { math: reps.length > 1 ? `${n}!/(${denT})` : `${n}!/${denT}`, note: `${reps.map(([c, k]) => t('{c} {k} fois', { c, k })).join(', ')}`, subgoal: 'formula', blank: reps.map(([, k]) => `${k}!`), blank2: [`${n}!`] },
      { math: `${fact(n)}/${den}`, note: t('Calculer'), subgoal: 'simplify', blank: [String(den)] },
      { math: String(value), note: t('Simplifier'), blank: [String(value)] },
    ],
    traps,
    hints: H(t('{n} lettres : {n}! rangements, mais échanger deux lettres identiques donne le même mot. Divise par la factorielle de chaque lettre répétée.', { n }), SM(`${n}!/(□)`), big(value)),
    action: t('Anagrammes : n! divisé par les factorielles des lettres répétées'),
    wrongActions: [{ label: t('{n}! : toutes les lettres comme si elles étaient différentes', { n }), rule: 'g7_anagram_repeats', why: t('Les lettres répétées sont indiscernables : chaque mot serait compté plusieurs fois.') }],
  };
}

// Simplification of a!/b! with a = n + p, b = n + q, 1 ≤ p − q ≤ 3.
function simplifyItem(level, rng, opts) {
  const q = rng.int(-1, 1);
  const p = q + rng.int(1, level >= 4 ? 3 : 2);
  const nk = (k) => (k === 0 ? 'n' : k > 0 ? `n+${k}` : `n-${-k}`);
  const f = (k) => (k === 0 ? 'n!' : `(${nk(k)})!`);
  const start = `${f(p)}/${f(q)}`;
  const factors = [];
  for (let k = p; k > q; k--) factors.push(k === 0 ? 'n' : `(${nk(k)})`);
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
  const wrongA = `(${nk(p)})/(${nk(q)})`;
  const wrongB = p - q === 1 ? '1' : `(${p - q})!`;
  const judge = { kind: 'equiv', vars: ['n'], domain: { n: { int: [3, 12] } }, target: 'expanded', eqTraps: { g7_factorial_quotient: [wrongA, wrongB] } };
  const expand = `${factors.join('·')}·${f(q)}`;
  const lines = [
    { math: `${product}×${f(q)}/${f(q)}`, note: `${f(p)} = ${expand}`, subgoal: 'simplify', blank: [f(q)] },
    { math: product, note: t('Simplifier par {f}', { f: f(q) }), subgoal: 'simplify', blank: [product] },
    { math: expanded, note: t('Développer'), blank: [expanded] },
  ];
  if (factors.length === 1) lines.splice(1, 1);
  if (lines.length > 1 && lines[lines.length - 2].math === lines[lines.length - 1].math) lines.pop();
  const menu = [
    { id: 'expand', label: t('Écrire {a} comme un produit qui contient {b}', { a: f(p), b: f(q) }), valid: true },
    { id: 'frac', label: t('Simplifier comme une fraction : enlever les « ! »'), valid: false, rule: 'g7_factorial_quotient', why: t('Les factorielles ne se divisent pas comme des fractions : développe la plus grande.') },
    { id: 'cancel', label: t('Calculer (p − q)!'), valid: false, rule: 'g7_factorial_quotient', why: t('a!/b! n\'est pas (a − b)! : par exemple 5!/3! = 20, alors que 2! = 2.') },
  ];
  const item = partsItem({
    skill: PA, level, prompt: t('Simplifie (n est un entier, n ≥ 3), et écris le résultat comme un polynôme développé : {e}', { e: MT(start) }),
    parts: [{ start, judge, menu, lines }],
    hints: H(t('{a} = {b} : simplifie par {c}, puis développe.', { a: f(p), b: expand, c: f(q) }), `${MT(start)} = ${MT(product)} = □`, MT(expanded)),
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
  const decisions = level === 2 ? [{ prompt: t('Quelle formule ?'), options: [
    { id: 'arr', label: t('A(n, k) : k places parmi n, ordre compté'), valid: d.kind === 'podium', why: t('Il n\'y a pas k places à choisir parmi n ici.') },
    { id: 'perm', label: t('n! : tous les objets en ligne'), valid: d.kind === 'line', why: d.kind === 'podium' ? t('Il n\'y a que k places, pas n.') : t('Les lettres répétées ne sont pas des objets distincts.'), rule: d.kind === 'anagram' ? 'g7_anagram_repeats' : undefined },
    { id: 'ana', label: t('n!/(n₁!·n₂!…) : lettres répétées'), valid: d.kind === 'anagram', why: t('Il n\'y a pas d\'objets répétés ici.') },
  ] }] : [];
  return statItem({
    skill: PA, level, key: `${level}:${d.kind}:${d.word ?? `${d.n}-${d.k}`}`, prompt: d.story,
    parts: [{ label: 'N', kind: 'prob', expect: String(d.value), traps: d.traps, decisions, action: d.action, wrongActions: d.wrongActions, lines: d.lines }],
    hints: d.hints, subgoals: PA_SUB, exam: examTag(opts),
  });
}

// Level 5: anagrams with a constraint (the word starts with a given letter).
function paL5(rng, opts) {
  for (let tries = 0; tries < 50; tries++) {
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
      prompt: t('Combien d\'anagrammes du mot {w} commencent par la lettre {l} ?', { w, l: first }),
      parts: [{ label: 'N', kind: 'prob', expect: String(value),
        traps: { g7_anagram_repeats: { values: [String(fact(n)), String(all)], ctx: { over: denT.replace(/×/g, '·'), n } } },
        lines: [
          { math: rr.length ? `${n}!/(${denT})` : `${n}!`, note: t('On place {l} en tête ; il reste {n} lettres ({rest})', { l: first, n, rest }), subgoal: 'formula' },
          { math: String(value), note: t('Calculer') },
        ] }],
      hints: [], subgoals: PA_SUB, exam: examTag(opts),
    });
  }
  return paItem(4, rng, null, opts);
}

function paMcq(rng, opts) {
  const d = paData(rng, ['podium', 'anagram', 'podium']);
  const wrongs = Object.entries(d.traps).flatMap(([rule, x]) => x.values.map((v) => ({ html: big(v), rule })));
  const fillers = [d.value * 2, d.value + d.n, Math.round(d.value / 2)].map((x) => ({ html: big(x) }));
  return choice({ skill: PA, level: 4, prompt: d.story, right: big(d.value), wrongs, fillers, key: `mcq:${d.kind}:${d.value}`, exam: examTag(opts) }, rng);
}

function paTf(rng, opts) {
  const kind = rng.pick(['double', 'succ', 'arr']);
  if (kind === 'double') {
    return tf({
      skill: PA, key: 'double', exam: examTag(opts),
      statement: t('Pour tout entier n ≥ 1, (2n)! = 2·n!.'), truth: false, ruleIfTrue: 'g7_factorial_quotient',
      explanation: t('Faux : pour n = 2, (2n)! = 4! = 24, alors que 2·2! = 4.'),
      counter: numCounter({ vars: [{ v: 'n', dom: 'N*' }], pred: '((2n)!)=2×(n!)', answer: { n: '2' } }),
    });
  }
  if (kind === 'succ') {
    return tf({
      skill: PA, key: 'succ', exam: examTag(opts),
      statement: t('Pour tout entier n ≥ 1, (n + 1)! = (n + 1)·n!.'), truth: true,
      explanation: t('Vrai : (n + 1)! = (n + 1)·n·(n − 1)···1 = (n + 1)·n!.'),
    });
  }
  const n = rng.int(5, 9);
  const k = rng.int(2, 3);
  const truth = rng.chance(0.5);
  const claim = truth ? arrange(n, k) : choose(n, k);
  return tf({
    skill: PA, key: `arr:${n}:${k}:${truth}`, exam: examTag(opts),
    statement: t('Il y a {c} façons d\'attribuer {k} postes différents à {k} personnes choisies parmi {n}.', { c: claim, k, n }),
    truth, ruleIfTrue: truth ? null : 'g7_order_confusion',
    explanation: t('Les postes sont différents : l\'ordre compte, A({n}, {k}) = {v}.', { n, k, v: arrange(n, k) }),
    counter: truth ? null : numCounter({ vars: [{ v: 'N', label: t('Le bon nombre de façons ='), dom: 'N' }], pred: `N=${claim}`, hyp: `N=${arrange(n, k)}`, answer: { N: String(arrange(n, k)) } }),
  });
}

// ======================================================================
// g7-combinations
// ======================================================================

const CO = 'g7-combinations';
const CO_SUB = [
  { id: 'groups', label: t('choisir dans chaque groupe'), skill: 'g7-mult-principle' },
  { id: 'formula', label: 'C(n, k) = A(n, k)/k!', skill: 'g7-perm-arr' },
  { id: 'comb', label: t('combinaisons'), skill: CO },
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
      story: t('Trouve l\'entier n tel que C(n, {k}) = {m}.', { k, m }),
      storyFr: frFill('Trouve l\'entier n tel que C(n, {k}) = {m}.', { k, m }),
      parts: [
        { label: k === 2 ? 'n(n−1)' : 'n(n−1)(n−2)', name: 'P', kind: 'prob', expect: String(m * kf), action: t('Écrire C(n, {k}) = {p}/{k}! et chasser le dénominateur', { k, p: prodT }),
          notes: [`C(n, ${k}) = ${prodT}/${kf} = ${m}`],
          lines: [{ math: `${kf}×${m}`, note: t('On multiplie par {k}! = {kf}', { k, kf }), subgoal: 'formula', blank: [String(m)] }, { math: String(m * kf), note: t('Calculer'), blank: [String(m * kf)] }] },
        { label: 'n', kind: 'prob', expect: String(n), action: t('Chercher {k} entiers consécutifs dont le produit vaut {v}', { k, v: m * kf }),
          lines: [{ math: String(n), note: `${prodV} = ${m * kf}`, subgoal: 'comb', blank: [String(n)] }] },
      ],
      hints: H(t('C(n, {k}) = {p}/{k}! : multiplie par {kf}, puis cherche des entiers consécutifs.', { k, p: prodT, kf }), `${prodT} = □`, `n = ${n}`),
    };
  }
  if (kind === 'cards') {
    const deck = rng.pick([32, 36, 52]);
    const hand = rng.int(3, 5);
    const j = rng.int(1, Math.min(3, hand - 1));
    const what = rng.pick(['dames', 'as', 'rois']);
    const W = t(what);
    const W1 = t(j > 1 || what === 'as' ? what : what.slice(0, -1));
    const v1 = choose(4, j);
    const v2 = choose(deck - 4, hand - j);
    const value = v1 * v2;
    return {
      kind, value,
      story: t('On tire une main de {hand} cartes d\'un jeu de {deck} cartes (4 {what}). Combien de mains contiennent exactement {j} {w} ?', { hand, deck, what: W, j, w: W1 }),
      storyFr: frFill('On tire une main de {hand} cartes d\'un jeu de {deck} cartes (4 {what}). Combien de mains contiennent exactement {j} {w} ?', { hand, deck, what, j, w: j > 1 || what === 'as' ? what : what.slice(0, -1) }),
      parts: [{ label: 'N', kind: 'prob', expect: String(value), action: t('Choisir les {what} parmi 4, puis le reste parmi les autres cartes, et multiplier', { what: W }),
        traps: { g7_order_confusion: { values: [String(arrange(4, j) * arrange(deck - 4, hand - j))], ctx: { k: hand, kf: fact(hand) } }, g7_add_instead_multiply: { values: [String(v1 + v2)], ctx: { second: v2 } } },
        wrongActions: [{ label: t('Additionner les deux choix'), rule: 'g7_add_instead_multiply', why: t('Chaque choix des {what} va avec chaque choix des autres cartes : on multiplie.', { what: W }) }, { label: t('Utiliser A(n, k) : les cartes arrivent dans un ordre'), rule: 'g7_order_confusion', why: t('Une main ne dépend pas de l\'ordre des cartes : C(n, k).') }],
        lines: [
          { math: `C(4;${j})×C(${deck - 4};${hand - j})`, note: hand - j > 1 ? t('Les {what}, puis les {r} autres cartes', { what: W, r: hand - j }) : t('Les {what}, puis l\'autre carte', { what: W }), subgoal: 'groups', blank: [String(j), String(hand - j)], blank2: [`C(${deck - 4};${hand - j})`] },
          { math: `${v1}×${v2}`, note: t('Calculer'), subgoal: 'comb', blank: [String(v2)] },
          { math: String(value), note: t('Résultat'), blank: [String(value)] },
        ] }],
      hints: H(t('Choisis les {what} parmi les 4, puis les autres cartes parmi les {r} qui restent : multiplie les deux comptes.', { what: W, r: deck - 4 }), SM(`C(4;${j})×C(□;${hand - j})`), big(value)),
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
  const storyFr = `${tpl.replace('{a}', a).replace('{A}', A).replace('{b}', b).replace('{B}', B)} Combien de choix possibles ?`;
  const story = t(`${tpl} Combien de choix possibles ?`, { a, A, b, B });
  return {
    kind: 'committee', value, story, storyFr,
    parts: [{ label: 'N', kind: 'prob', expect: String(value), action: t('Choisir dans chaque groupe avec C(n, k), puis multiplier'),
      traps: { g7_order_confusion: { values: [String(arrange(A, a) * arrange(B, b))], ctx: { k: a, kf: fact(a) } }, g7_add_instead_multiply: { values: [String(v1 + v2)], ctx: { second: v2 } } },
      wrongActions: [{ label: t('Additionner les choix des deux groupes'), rule: 'g7_add_instead_multiply', why: t('Chaque choix du 1er groupe se combine avec chaque choix du 2e : on multiplie.') }, { label: t('Arrangements A(n, k)'), rule: 'g7_order_confusion', why: t('Dans un groupe choisi, l\'ordre ne compte pas : C(n, k).') }],
      lines: [
        { math: `C(${A};${a})×C(${B};${b})`, note: t('Choisir dans chaque groupe'), subgoal: 'groups', blank: [String(a), String(b)], blank2: [`C(${B};${b})`] },
        { math: `${v1}×${v2}`, note: `C(${A}, ${a}) = ${v1} ; C(${B}, ${b}) = ${v2}`, subgoal: 'comb', blank: [String(v1)] },
        { math: String(value), note: t('Multiplier'), blank: [String(value)] },
      ] }],
    hints: H(t('Dans un groupe choisi, l\'ordre ne compte pas : C(n, k) dans chaque groupe, puis on multiplie.'), SM(`C(${A};${a})×C(□;□)`), big(value)),
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
    story: t('Un groupe compte {W} femmes et {M} hommes. On choisit un comité de {k} personnes. Combien de comités contiennent au moins une femme ?', { W, M, k }),
    storyFr: `Un groupe compte ${W} femmes et ${M} hommes. On choisit un comité de ${k} personnes. Combien de comités contiennent au moins une femme ?`,
    parts: [
      { label: 'N_tous', name: 'T', title: t('Tous les comités'), kind: 'prob', expect: String(total), action: t('Compter tous les comités'), lines: [{ math: `C(${W + M};${k})`, note: t('Tous les comités'), subgoal: 'comb' }, { math: String(total), note: t('Calculer') }] },
      { label: 'N_0', name: 'Z', title: t('Comités sans femme'), kind: 'prob', expect: String(none), action: t('Compter les comités sans femme'), lines: [{ math: `C(${M};${k})`, note: t('Seulement des hommes'), subgoal: 'groups' }, { math: String(none), note: t('Calculer') }] },
      { label: 'N', title: t('Au moins une femme'), kind: 'prob', expect: '$T-$Z', action: t('Retirer les comités sans femme'), traps: { g7_order_confusion: { values: [String(arrange(W + M, k) - arrange(M, k))], ctx: { k, kf: fact(k) } } },
        lines: [{ math: `${total}-${none}`, note: t('Au moins une = tous − aucune') }, { math: String(value), note: t('Résultat') }] },
    ],
    hints: H(t('« Au moins une femme » : compte tous les comités, puis retire ceux qui n\'ont aucune femme.'), SM(`C(${W + M};${k})-C(□;${k})`), big(value)),
  };
}

function coItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return coMcq(rng, opts);
  if (opts.exam === 'tf') return coTf(rng, opts);
  if (opts.exam === 'open') return coOpen(rng, opts);
  const d = level === 5 ? coAtLeast(rng) : coData(rng, level >= 4 ? ['committee', 'cards', 'equation'] : level === 3 ? ['committee', 'cards', 'equation'] : ['committee', 'cards']);
  if (level === 2 && d.kind !== 'equation') {
    d.parts[0].decisions = [{ prompt: t('Un seul groupe ou plusieurs ?'), options: [
      { id: 'several', label: t('Plusieurs groupes : choisir dans chacun, puis multiplier'), valid: true },
      { id: 'one', label: t('Un seul groupe : C(total, total choisi)'), valid: false, why: t('L\'énoncé impose combien on prend dans chaque groupe : on choisit dans chacun.') },
      { id: 'add', label: t('Plusieurs groupes : choisir dans chacun, puis additionner'), valid: false, rule: 'g7_add_instead_multiply', why: t('On choisit dans le 1er groupe ET dans le 2e : on multiplie.') },
    ] }];
  }
  return statItem({ skill: CO, level, key: `${level}:${d.kind}:${d.storyFr ?? d.story}`, prompt: d.story, parts: d.parts, hints: d.hints, subgoals: CO_SUB, exam: examTag(opts) });
}

function coMcq(rng, opts) {
  const d = coData(rng, ['committee', 'cards']);
  const tr = d.parts[0].traps;
  const wrongs = Object.entries(tr).flatMap(([rule, x]) => x.values.map((v) => ({ html: big(v), rule })));
  return choice({ skill: CO, level: 4, prompt: d.story, right: big(d.value), wrongs, fillers: [d.value * 2, d.value + 1, Math.round(d.value / 2)].map((x) => ({ html: big(x) })), key: `mcq:${d.storyFr ?? d.story}`, exam: examTag(opts) }, rng);
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
      explanation: truth ? t('Vrai : choisir {k} objets, c\'est laisser les {r} autres : C(n, k) = C(n, n − k).', { k, r: n - k }) : t('Faux : C({n}, {k}) = {a} et C({n}, {o}) = {b}.', { n, k, a: choose(n, k), o: other, b: choose(n, other) }),
      counter: truth ? null : numCounter({ vars: [{ v: 'c', label: `C(${n}, ${other}) =`, dom: 'N' }], pred: `c=${choose(n, k)}`, hyp: `c=${choose(n, other)}`, answer: { c: String(choose(n, other)) } }),
    });
  }
  return tf({
    skill: CO, key: 'c-eq-a', exam: examTag(opts),
    statement: t('Pour tous entiers 0 ≤ k ≤ n, C(n, k) = A(n, k).'), truth: false, ruleIfTrue: 'g7_order_confusion',
    explanation: t('Faux : A(n, k) = k!·C(n, k). Par exemple C(3, 2) = 3 et A(3, 2) = 6.'),
    counter: numCounter({ vars: [{ v: 'n', dom: 'N' }, { v: 'k', dom: 'N' }], hyp: 'k≤n', pred: '(n!)/((k!)×((n-k)!))=(n!)/((n-k)!)', answer: { n: '3', k: '2' } }),
  });
}

// The open variant: a committee, then « at least one » (CMS exercise).
function coOpen(rng, opts) {
  const d = coAtLeast(rng);
  return openItem({ skill: CO, key: `open:${d.storyFr ?? d.story}`, prompt: d.story, parts: d.parts, subgoals: CO_SUB, title: t('Au moins une femme') }, 4, rng);
}

// ======================================================================
// g7-which-count (flash exercise, multiple choice)
// ======================================================================

const WC = 'g7-which-count';
// Situations: text (n, k), its cell, and the clue of level 1.
// cells: pow = nᵏ (order, repetition), arr = A(n, k), comb = C(n, k), rep = C(n + k − 1, k).
const SITUATIONS = [
  { cell: 'pow', clue: t('dans l\'ordre'), t: (n, k) => t('Un cadenas a {k} molettes, chacune de {n} symboles. Combien de codes ?', { n, k }) },
  { cell: 'pow', clue: t('plusieurs fois'), t: (n, k) => t('On lance {k} fois un dé à {n} faces et on note les résultats dans l\'ordre. Combien de suites de résultats ?', { n, k }) },
  { cell: 'pow', clue: t('remise'), t: (n, k) => t('Une urne contient {n} boules numérotées. On en tire {k}, une à une, avec remise, en notant l\'ordre. Combien de résultats ?', { n, k }) },
  { cell: 'pow', clue: t('mot'), t: (n, k) => t('Combien de « mots » de {k} lettres peut-on écrire avec un alphabet de {n} lettres (les lettres peuvent se répéter) ?', { n, k }) },
  { cell: 'pow', clue: t('chaque question'), t: (n, k) => t('Un QCM a {k} questions, chacune avec {n} réponses possibles. De combien de façons peut-on remplir la grille ?', { n, k }) },
  { cell: 'arr', clue: t('podium'), t: (n, k) => t('{n} coureurs, {k} places classées à la fin de la course (1er, 2e, …). Combien de classements des {k} premiers ?', { n, k }) },
  { cell: 'arr', clue: t('postes différents'), t: (n, k) => t('Dans un club de {n} membres, on choisit {k} personnes pour {k} postes différents. Combien de choix ?', { n, k }) },
  { cell: 'arr', clue: t('sans remise, dans l\'ordre'), t: (n, k) => t('On tire {k} boules, une à une, sans remise, d\'une urne de {n} boules numérotées, en notant l\'ordre. Combien de résultats ?', { n, k }) },
  { cell: 'arr', clue: t('chiffres distincts'), t: (n, k) => t('Combien de codes de {k} chiffres tous différents peut-on former avec {n} touches ?', { n, k }) },
  { cell: 'arr', clue: t('places numérotées'), t: (n, k) => t('{k} amis s\'assoient sur {k} des {n} chaises numérotées d\'une rangée. De combien de façons ?', { n, k }) },
  { cell: 'comb', clue: t('une poignée'), t: (n, k) => t('On prend une poignée de {k} boules dans une urne de {n} boules numérotées. Combien de poignées ?', { n, k }) },
  { cell: 'comb', clue: t('comité'), t: (n, k) => t('On forme un comité de {k} personnes dans un groupe de {n}. Combien de comités ?', { n, k }) },
  { cell: 'comb', clue: t('main'), t: (n, k) => t('On distribue une main de {k} cartes prises dans un paquet de {n}. Combien de mains ?', { n, k }) },
  { cell: 'comb', clue: t('équipe'), t: (n, k) => t('Un entraîneur choisit {k} joueurs parmi {n} pour une équipe (sans poste fixé). Combien d\'équipes ?', { n, k }) },
  { cell: 'comb', clue: t('loterie'), t: (n, k) => t('À une loterie, on coche {k} numéros parmi {n}. Combien de grilles ?', { n, k }) },
  { cell: 'rep', clue: t('parfums, le même plusieurs fois'), t: (n, k) => t('Un cornet a {k} boules de glace choisies parmi {n} parfums (on peut reprendre un parfum ; l\'ordre dans le cornet ne compte pas). Combien de cornets ?', { n, k }) },
  { cell: 'rep', clue: t('pièces identiques'), t: (n, k) => t('On répartit {k} pièces identiques dans {n} tirelires (une tirelire peut en recevoir plusieurs). Combien de répartitions ?', { n, k }) },
  { cell: 'rep', clue: t('avec répétition, sans ordre'), t: (n, k) => t('On lance {k} dés identiques à {n} faces en même temps et on note seulement combien de fois sort chaque face. Combien de résultats ?', { n, k }) },
];
const ORDER = { pow: true, arr: true, comb: false, rep: false };
const REPEAT = { pow: true, arr: false, comb: false, rep: true };
const FORM = { pow: (n, k) => `${n}^${k}`, arr: (n, k) => `A(${n};${k})`, comb: (n, k) => `C(${n};${k})`, rep: (n, k) => `C(${n + k - 1};${k})` };
const VALUE = { pow: (n, k) => n ** k, arr: arrange, comb: choose, rep: (n, k) => choose(n + k - 1, k) };
// The trap named by a wrong cell.
const cellRule = (right, wrong) => (ORDER[right] !== ORDER[wrong] ? 'g7_order_confusion' : 'g7_repetition_confusion');
const WC_SUB = (cell) => [{ id: 'calc', label: t('calculer'), skill: cell === 'comb' || cell === 'rep' ? CO : PA }, { id: 'case', label: t('choisir la case'), skill: WC }, { id: 'comb', label: t('combinaisons'), skill: CO }];

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
      prompt: t('{story}<br>Échange deux éléments du résultat : obtiens-tu un autre résultat ? L\'ordre compte-t-il ?', { story: story.replace(s.clue, `<b>${s.clue}</b>`) }),
      options: [{ html: t('Oui, l\'ordre compte'), correct: right, rule: right ? null : 'g7_order_confusion' }, { html: t('Non, l\'ordre ne compte pas'), correct: !right, rule: right ? 'g7_order_confusion' : null }],
      keepOrder: true, solution: [{ html: right ? t('L\'ordre compte : deux résultats dans un autre ordre sont différents.') : t('L\'ordre ne compte pas : on obtient le même ensemble.'), note: '' }] }, rng));
  }
  if (level === 2 && !opts.exam) {
    const cells = ['pow', 'arr', 'comb', 'rep'];
    const label = (c) => t('Ordre : {o} ; répétition : {r}', { o: ORDER[c] ? t('oui') : t('non'), r: REPEAT[c] ? t('oui') : t('non') });
    return withSub(mcq({ skill: WC, level, key: `${WC}:${key}`, prompt: t('{story}<br>L\'ordre compte-t-il ? Peut-on reprendre le même élément ?', { story }), keepOrder: true,
      options: cells.map((c) => ({ html: label(c), correct: c === s.cell, rule: c === s.cell ? null : cellRule(s.cell, c) })),
      solution: [{ html: label(s.cell), note: '' }] }, rng));
  }
  const cells = level === 3 && !opts.exam ? ['pow', 'arr', 'comb'] : ['pow', 'arr', 'comb', 'rep'];
  if (level === 3 && !opts.exam) {
    return withSub(mcq({ skill: WC, level, key: `${WC}:${key}`, prompt: t('{story}<br>Quelle formule ?', { story }),
      options: cells.map((c) => ({ html: SM(FORM[c](n, k)), correct: c === s.cell, rule: c === s.cell ? null : cellRule(s.cell, c) })),
      solution: [{ html: `${SM(FORM[s.cell](n, k))} = ${big(VALUE[s.cell](n, k))}`, note: '' }] }, rng));
  }
  const value = VALUE[s.cell](n, k);
  if (level === 4 && !opts.exam && rng.chance(0.5)) {
    const traps = cells.filter((c) => c !== s.cell && VALUE[c](n, k) !== value).map((c) => ({ value: String(VALUE[c](n, k)), rule: cellRule(s.cell, c) }));
    return withSub({ ...answerItem({ skill: WC, level, key, prompt: t('{story}<br>Choisis la bonne formule, puis donne le nombre.', { story }), expected: value, traps,
      solution: [{ html: `${SM(FORM[s.cell](n, k))} = ${big(value)}`, note: '' }] }), keys: 'int' });
  }
  // Levels 4 (half), 5 and the exam: the formulas with their values.
  const right = `${SM(FORM[s.cell](n, k))} = ${big(value)}`;
  const wrongs = cells.filter((c) => c !== s.cell).map((c) => ({ html: `${SM(FORM[c](n, k))} = ${big(VALUE[c](n, k))}`, rule: cellRule(s.cell, c) }));
  return withSub(choice({ skill: WC, level: opts.exam ? 4 : level, prompt: `${story}`, right, wrongs, key: `calc:${key}`, exam: examTag(opts) }, rng));
}

export const GEN = { [PA]: paItem, [CO]: coItem, [WC]: wcItem };
void modeOf; void KEYS;

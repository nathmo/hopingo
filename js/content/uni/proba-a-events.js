// Generators of module P, part a (step U7): events and their probabilities.
// p-events, p-count, p-cond-total, p-bayes-freq, p-bayes-formula, p-indep.
// Catalogue: docs/universite/P-probabilites.md. Probabilities are exact
// (judge `prob`): decimals with one or two digits, or fractions.

import { statItem, coefItem, openItem, choice, tf, numCounter, H, examTag } from './proba-kit.js';
import { q, t as ft, s, M, C, qpow, pct, ratio, nb } from './proba-a-kit.js';
import { t, tn } from '../../i18n.js';

const tenth = (rng, lo = 1, hi = 9) => q(rng.int(lo, hi), 10);
// « 1 dame », « 3 dames » (as nb of proba-a-kit.js), translated: one key per form.
const nbT = (k, words) => tn(k, `{n} ${words.split(' ').map((w) => w.replace(/s$/, '')).join(' ')}`, `{n} ${words}`);
// A text and its French version (the French builds the keys of the items).
const both = (text, vars) => ({ story: t(text, vars), storyFr: text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m)) });

// ======================================================================
// p-events
// ======================================================================

const EV = 'p-events';
const EV_SUB = [{ id: 'formula', label: t('choisir la formule'), skill: EV }, { id: 'num', label: t('remplacer'), skill: EV }];
const EV_STORIES = [
  { a: t('réussir l\'examen d\'analyse'), b: t('réussir l\'examen d\'algèbre'), who: t('Un étudiant passe deux examens.') },
  { a: t('une panne du moteur'), b: t('une panne électrique'), who: t('Sur une machine, deux pannes peuvent survenir pendant un mois.') },
  { a: t('lire le journal'), b: t('écouter la radio'), who: t('On interroge une personne au hasard sur ses habitudes du matin.') },
  { a: t('avoir un chat'), b: t('avoir un chien'), who: t('On choisit un ménage au hasard dans une ville.') },
];

// Feminine nouns (dames, femmes, pièces): « aucune », « une ».
const fem = (D) => /dames|femmes|pièces/.test(D.what);

function evData(rng, level) {
  for (let k = 0; k < 200; k++) {
    const pA = tenth(rng);
    const pB = tenth(rng);
    const lo = Math.max(0, pA.add(pB).sub(1).valueOf());
    const hi = Math.min(pA.valueOf(), pB.valueOf());
    const steps = [];
    for (let j = 0; j <= 20; j++) if (j / 20 >= lo - 1e-9 && j / 20 <= hi + 1e-9) steps.push(j);
    let j = steps[rng.int(0, steps.length - 1)];
    if (level <= 3 && j === 0) continue;
    const pAB = q(j, 20);
    if (pAB.eq(pA.mul(pB)) || pAB.eq(pA) || pAB.eq(pB)) continue;
    const u = pA.add(pB).sub(pAB);
    if (u.eq(1)) continue;
    void j;
    return { pA, pB, pAB, u, story: rng.pick(EV_STORIES) };
  }
  return { pA: q(1, 2), pB: q(7, 10), pAB: q(3, 10), u: q(9, 10), story: EV_STORIES[0], fallback: true };
}

const CONJ = { prompt: t('Une inégalité toujours vraie, avant de calculer :'), levels: [2, 3, 4], options: [
  { id: 'ok', label: t('Pr(A ∩ B) ≤ Pr(A) ≤ Pr(A ∪ B), car A ∩ B ⊂ A ⊂ A ∪ B'), valid: true },
  { id: 'conj', label: t('Pr(A ∩ B) peut dépasser Pr(A) si B est très probable'), valid: false, rule: 'p_conjunction', why: t('A ∩ B est contenu dans A : il ne peut pas être plus probable que A.') },
] };

function evParts(E, kind) {
  const sym = { 'Pr(A)': ft(E.pA), 'Pr(B)': ft(E.pB), 'Pr(A∩B)': ft(E.pAB), 'Pr(A∪B)': ft(E.u) };
  const union = {
    label: 'Pr(A∪B)', name: 'u', kind: 'prob', expect: ft(E.u), symbols: sym, action: t('Inclusion-exclusion : Pr(A) + Pr(B) − Pr(A ∩ B)'),
    notes: ['Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B)'],
    wrongActions: [{ label: t('Additionner Pr(A) et Pr(B)'), rule: 'p_union_add', why: t('Pr(A ∩ B) serait compté deux fois.') }, { label: t('Remplacer Pr(A ∩ B) par Pr(A)·Pr(B)'), rule: 'p_indep_assumed', why: t('Rien ne dit que A et B sont indépendants.') }],
    traps: { p_union_add: { values: [ft(E.pA.add(E.pB))], ctx: { v: ft(E.pA.add(E.pB)), pab: ft(E.pAB) } }, p_indep_assumed: { values: [ft(E.pA.add(E.pB).sub(E.pA.mul(E.pB)))], ctx: { pab: ft(E.pAB) } } },
    lines: [
      { math: 'Pr(A)+Pr(B)-Pr(A∩B)', note: t('Inclusion-exclusion'), subgoal: 'formula', from: 3 },
      { math: `${ft(E.pA)}+${ft(E.pB)}-${ft(E.pAB)}`, note: t('Remplacer'), subgoal: 'num', blank: [ft(E.pAB)], blank2: [`${ft(E.pB)}-${ft(E.pAB)}`] },
      { math: ft(E.u), note: t('Calculer'), blank: [ft(E.u)] },
    ],
  };
  const none = {
    label: 'Pr(Aᶜ∩Bᶜ)', name: 'n', kind: 'prob', expect: '1-$u', symbols: sym, action: t('De Morgan : ni A ni B, c\'est le contraire de A ∪ B'),
    wrongActions: [{ label: t('Calculer 1 − Pr(A ∩ B)'), rule: 'p_complement_wrong', why: t('« Ni A ni B » est le contraire de « A ou B ».') }],
    traps: { p_complement_wrong: { values: [ft(q(1).sub(E.pAB))] } },
    lines: [
      { math: 'Pr(A∪B)', note: t('« Ni A ni B » est le contraire de « A ou B »'), subgoal: 'formula', from: 3 },
      { math: `1-${ft(E.u)}`, note: t('Complément'), subgoal: 'num', blank: [ft(E.u)] },
      { math: ft(q(1).sub(E.u)), note: t('Calculer'), blank: [ft(q(1).sub(E.u))] },
    ].filter((l) => l.from !== 3),
  };
  const only = (X) => {
    const pX = X === 'A' ? E.pA : E.pB;
    const pY = X === 'A' ? E.pB : E.pA;
    const Y = X === 'A' ? 'B' : 'A';
    return {
      label: `Pr(${X}∩${Y}ᶜ)`, name: `o${X}`, kind: 'prob', expect: ft(pX.sub(E.pAB)), symbols: sym, action: `Pr(${X}) − Pr(A ∩ B)`,
      wrongActions: [{ label: `Pr(${X}) − Pr(${X})·Pr(${Y})`, rule: 'p_indep_assumed', why: t('A et B ne sont pas supposés indépendants.') }],
      traps: { p_indep_assumed: { values: [ft(pX.sub(pX.mul(pY)))], ctx: { pab: ft(E.pAB) } } },
      lines: [
        { math: `Pr(${X})-Pr(A∩B)`, note: t('{X} seulement : {X}, sans la partie commune', { X }), subgoal: 'formula', from: 3 },
        { math: `${ft(pX)}-${ft(E.pAB)}`, note: t('Remplacer'), subgoal: 'num', blank: [ft(E.pAB)] },
        { math: ft(pX.sub(E.pAB)), note: t('Calculer'), blank: [ft(pX.sub(E.pAB))] },
      ],
    };
  };
  const inter = {
    label: 'Pr(A∩B)', name: 'i', kind: 'prob', expect: ft(E.pAB), symbols: sym, action: t('Isoler Pr(A ∩ B) dans l\'inclusion-exclusion'),
    decisions: [CONJ],
    wrongActions: [{ label: 'Pr(A ∩ B) = Pr(A)·Pr(B)', rule: 'p_indep_assumed', why: t('L\'énoncé ne dit pas que A et B sont indépendants : on utilise Pr(A ∪ B).') }],
    traps: { p_indep_assumed: { values: [ft(E.pA.mul(E.pB))], ctx: { pab: ft(E.pAB) } } },
    lines: [
      { math: 'Pr(A)+Pr(B)-Pr(A∪B)', note: 'Pr(A ∩ B) = Pr(A) + Pr(B) − Pr(A ∪ B)', subgoal: 'formula', from: 3 },
      { math: `${ft(E.pA)}+${ft(E.pB)}-${ft(E.u)}`, note: t('Remplacer'), subgoal: 'num', blank: [ft(E.u)] },
      { math: ft(E.pAB), note: t('Calculer'), blank: [ft(E.pAB)] },
    ],
  };
  if (kind === 'union') return [union];
  if (kind === 'none') return [union, none];
  if (kind === 'only') return [{ ...only('A'), decisions: [CONJ] }];
  if (kind === 'inter') return [inter];
  return [union, none, only('A'), only('B')];
}

const EV_Q = {
  union: () => t('Probabilité qu’au moins un des deux arrive (A ∪ B) ?'),
  none: () => t('Probabilité qu’au moins un des deux arrive, puis qu’aucun des deux n’arrive ?'),
  only: () => t('Probabilité que A arrive sans B (A seulement) ?'),
  inter: () => t('Que vaut Pr(A ∩ B) ?'),
  all: () => t('Calcule Pr(A ∪ B), Pr(ni A ni B), Pr(A seulement) et Pr(B seulement).'),
};

function evItem(level, rng, profile, opts = {}) {
  const E = evData(rng, level);
  if (opts.exam === 'mcq') return evMcq(E, rng, opts);
  if (opts.exam === 'tf') return evTf(rng, opts);
  const kind = opts.exam === 'coef' ? rng.pick(['union', 'only']) : level === 5 ? 'all' : rng.pick(level <= 2 ? ['union', 'none', 'only'] : ['union', 'none', 'only', 'inter']);
  const st = E.story;
  const dv = { a: st.a, b: st.b, pA: s(E.pA), pB: s(E.pB), u: s(E.u), pAB: s(E.pAB) };
  const data = kind === 'inter' ? t('A = « {a} », B = « {b} » ; Pr(A) = {pA}, Pr(B) = {pB}, Pr(A ∪ B) = {u}.', dv) : t('A = « {a} », B = « {b} » ; Pr(A) = {pA}, Pr(B) = {pB}, Pr(A ∩ B) = {pAB}.', dv);
  const parts = evParts(E, kind);
  const prompt = `${st.who} ${data} ${EV_Q[kind](st)}`;
  if (opts.exam === 'coef') return coefItem({ skill: EV, key: `coef:${kind}:${ft(E.pA)}:${ft(E.pB)}:${ft(E.pAB)}`, prompt, parts, subgoals: EV_SUB, exam: examTag(opts) });
  return statItem({
    skill: EV, level, key: `${level}:${kind}:${ft(E.pA)}:${ft(E.pB)}:${ft(E.pAB)}`, fallback: E.fallback,
    prompt, parts, subgoals: EV_SUB, exam: examTag(opts),
    hints: H(t('« Ou » : inclusion-exclusion. « Ni l\'un ni l\'autre » : le contraire de « au moins un ». « A seulement » : Pr(A) − Pr(A ∩ B).'),
      M(kind === 'inter' ? `${ft(E.pA)}+${ft(E.pB)}-□` : `${ft(E.pA)}+${ft(E.pB)}-□`), `Pr(A ∪ B) = ${s(E.u)}`),
  });
}

function evMcq(E, rng, opts) {
  return choice({
    skill: EV, level: 4, key: `mcq:${ft(E.pA)}:${ft(E.pB)}:${ft(E.pAB)}`, exam: examTag(opts),
    prompt: t('Pr(A) = {pA}, Pr(B) = {pB} et Pr(A ∩ B) = {pAB}. Que vaut Pr(A ∪ B) ?', { pA: s(E.pA), pB: s(E.pB), pAB: s(E.pAB) }),
    right: s(E.u),
    wrongs: [{ html: s(E.pA.add(E.pB)), rule: 'p_union_add' }, { html: s(E.pA.add(E.pB).sub(E.pA.mul(E.pB))), rule: 'p_indep_assumed' }, { html: s(q(1).sub(E.pAB)), rule: 'p_complement_wrong' }],
    fillers: [{ html: s(E.pAB) }, { html: s(q(1).sub(E.u)) }],
  }, rng);
}

function evTf(rng, opts) {
  if (rng.chance(0.4)) {
    return tf({ skill: EV, key: 'sum>1', exam: examTag(opts), statement: t('Si Pr(A) + Pr(B) > 1, alors A et B ne sont pas incompatibles.'), truth: true, explanation: 'Pr(A ∩ B) = Pr(A) + Pr(B) − Pr(A ∪ B) ≥ Pr(A) + Pr(B) − 1 > 0.' });
  }
  return tf({
    skill: EV, key: 'union-add', exam: examTag(opts),
    statement: t('Pr(A ∪ B) = Pr(A) + Pr(B) pour tous événements A et B.'),
    truth: false, ruleIfTrue: 'p_union_add',
    explanation: t('Seulement si A et B sont incompatibles. Avec A = B et Pr(A) = 1/2 : Pr(A ∪ B) = 1/2, pas 1.'),
    counter: numCounter({
      vars: [{ v: 'a', label: 'Pr(A) =' }, { v: 'b', label: 'Pr(B) =' }, { v: 'c', label: 'Pr(A ∩ B) =' }],
      hyp: '0≤c≤a≤1∧c≤b≤1∧a+b-c≤1', pred: 'a+b-c=a+b', answer: { a: '1/2', b: '1/2', c: '1/2' },
    }),
  });
}

// ======================================================================
// p-count
// ======================================================================

const CT = 'p-count';
const CT_SUB = [{ id: 'model', label: t('modéliser'), skill: 'g7-which-count' }, { id: 'count', label: t('compter'), skill: 'g7-combinations' }, { id: 'ratio', label: t('rapport'), skill: CT }];

function ctData(rng) {
  for (let k = 0; k < 200; k++) {
    const g = rng.pick([
      { N: 32, K: 4, what: 'dames', deck: 'un jeu de 32 cartes (4 dames)', n: rng.int(3, 5), obj: 'cartes', story: (n) => t('On tire {n} cartes d\'un coup dans un jeu de 32 cartes (il contient 4 dames).', { n }) },
      { N: 36, K: 4, what: 'rois', n: rng.int(3, 5), obj: 'cartes', story: (n) => t('On tire {n} cartes d\'un coup dans un jeu de 36 cartes (il contient 4 rois).', { n }) },
      { N: 52, K: 13, what: 'cœurs', n: rng.int(3, 5), obj: 'cartes', story: (n) => t('On tire {n} cartes d\'un coup dans un jeu de 52 cartes (13 cœurs).', { n }) },
      (() => { const f = rng.int(5, 12); const hm = rng.int(5, 12); return { N: f + hm, K: f, what: 'femmes', n: rng.int(3, 5), obj: 'personnes', story: (n) => t('Un comité de {n} personnes est tiré au sort parmi {f} femmes et {hm} hommes.', { n, f, hm }) }; })(),
      (() => { const N = rng.int(15, 30); const K = rng.int(3, 6); return { N, K, what: 'pièces défectueuses', n: rng.int(3, 5), obj: 'pièces', story: (n) => t('Un lot de {N} pièces contient {K} pièces défectueuses. On en contrôle {n}, prises au hasard en même temps.', { N, K, n }) }; })(),
    ]);
    const kk = rng.int(1, Math.min(g.K, g.n));
    const om = C(g.N, g.n);
    const fa = C(g.K, kk) * C(g.N - g.K, g.n - kk);
    const p = q(fa, om);
    if (p.valueOf() < 0.001 || kk === g.n && g.K < g.n) continue;
    return { ...g, k: kk, om, fa, p, a: C(g.K, kk), b: C(g.N - g.K, g.n - kk) };
  }
  return { N: 32, K: 4, what: 'dames', n: 4, k: 2, om: 35960, fa: 2268, p: q(2268, 35960), a: 6, b: 378, obj: 'cartes', story: () => t('On tire {n} cartes d\'un coup dans un jeu de 32 cartes (il contient 4 dames).', { n: 4 }), fallback: true };
}

const binomQ = (n, k, K, N) => q(C(n, k)).mul(qpow(q(K, N), k)).mul(qpow(q(N - K, N), n - k));
const arrange = (n, k) => { let a = 1; for (let i = 0; i < k; i++) a *= n - i; return a; };
const dec4 = (x) => String(Number(x.valueOf().toFixed(4))).replace('.', ',');

function ctParts(D) {
  const pf = q(D.fa, D.om);
  const om = {
    label: '|Ω|', name: 'om', kind: 'prob', expect: String(D.om), action: t('Compter Ω : C(N, n) mains, sans ordre'),
    decisions: [{ prompt: t('Comment compter les tirages ?'), levels: [2, 3], options: [
      { id: 'c', label: t('Sans ordre et sans remise : des combinaisons C(N, n)'), valid: true },
      { id: 'a', label: t('Avec ordre : des arrangements A(N, n)'), valid: false, rule: 'g7_order_confusion', why: t('On tire d\'un coup : l\'ordre ne compte pas. (On peut aussi tout compter avec ordre, mais alors en haut et en bas.)') },
      { id: 'b', label: t('Avec remise : une loi binomiale'), valid: false, rule: 'p_binom_without_replacement', why: t('Les objets tirés ne sont pas remis : les tirages ne sont pas indépendants.') },
    ] }],
    lines: [
      { math: `C(${D.N};${D.n})`, note: t('{n} {obj} parmi {N}', { n: D.n, obj: t(D.obj), N: D.N }), subgoal: 'model', blank: [String(D.n)] },
      { math: String(D.om), note: t('Calculer'), subgoal: 'count', blank: [String(D.om)] },
    ],
  };
  const fa = {
    label: '|A|', name: 'fa', kind: 'prob', expect: String(D.fa), action: t('Choisir les {what}, puis le reste, et multiplier', { what: t(D.what) }),
    wrongActions: [{ label: t('Compter seulement les {what}', { what: t(D.what) }), rule: 'p_count_forget_rest', why: D.n - D.k > 1 ? t('Il faut aussi choisir les {m} autres.', { m: D.n - D.k }) : t('Il faut aussi choisir l’autre.') }],
    traps: { p_count_forget_rest: { values: [String(D.a)], ctx: { k: D.k, 'n−k': D.n - D.k } } },
    lines: [
      { math: `C(${D.K};${D.k})×C(${D.N - D.K};${D.n - D.k})`, note: t('{a} parmi {K}, puis {b} parmi {R}', { a: nbT(D.k, D.what), K: D.K, b: nbT(D.n - D.k, 'autres'), R: D.N - D.K }), subgoal: 'count', blank: [String(D.k), String(D.n - D.k)], blank2: [`C(${D.N - D.K};${D.n - D.k})`] },
      { math: `${D.a}×${D.b}`, note: t('Calculer chaque facteur'), blank: [String(D.b)] },
      { math: String(D.fa), note: t('Multiplier'), blank: [String(D.fa)] },
    ].filter((l, i) => !(i === 1 && (D.a === 1 || D.b === 1))),
  };
  const pr = {
    label: 'Pr(A)', name: 'p', kind: 'prob', expect: '$fa/$om', action: t('|A|/|Ω|, puis simplifier'),
    traps: {
      p_count_forget_rest: { values: [ft(q(D.a, D.om))], ctx: { k: D.k, 'n−k': D.n - D.k } },
      p_binom_without_replacement: { values: [ft(binomQ(D.n, D.k, D.K, D.N))] },
      g7_order_confusion: { values: [ft(q(D.fa, arrange(D.N, D.n)))], ctx: {} },
    },
    lines: [
      ...(pf.d === D.om ? [] : [{ math: `${D.fa}/${D.om}`, note: t('Cas favorables sur cas possibles'), subgoal: 'ratio', blank: [String(D.om)] }]),
      pf.toDecimal() ? { math: ft(pf), note: t('Simplifier'), subgoal: 'ratio', blank: [ft(pf)] } : { math: `${ft(pf)}≈${dec4(pf)}`, note: t('Fraction irréductible (et sa valeur approchée)'), subgoal: 'ratio' },
    ],
  };
  return [om, fa, pr];
}

function ctAtLeast(D) {
  // Pr(X ≥ 2) = 1 − Pr(X = 0) − Pr(X = 1).
  const p0 = q(C(D.N - D.K, D.n), D.om);
  const p1 = q(D.K * C(D.N - D.K, D.n - 1), D.om);
  const p2 = q(C(D.K, 2) * C(D.N - D.K, D.n - 2), D.om);
  const v = q(1).sub(p0).sub(p1);
  return { p0, p1, p2, v, parts: [
    { label: '|Ω|', name: 'om', kind: 'prob', expect: String(D.om), action: t('Compter Ω'), lines: [{ math: `C(${D.N};${D.n})`, subgoal: 'model', note: t('Sans ordre') }, { math: String(D.om), subgoal: 'count', note: t('Calculer') }] },
    { label: 'Pr(X=0)', name: 'pz', kind: 'prob', expect: ft(p0), action: t(fem(D) ? 'Aucune : les {n} parmi les {m} autres' : 'Aucun : les {n} parmi les {m} autres', { n: D.n, m: D.N - D.K }), lines: [{ math: `C(${D.N - D.K};${D.n})/${D.om}`, subgoal: 'count', note: t(fem(D) ? 'Aucune des {what}' : 'Aucun des {what}', { what: t(D.what) }) }, ...(p0.d === D.om ? [] : [{ math: ft(p0), note: t('Simplifier') }])].filter((l, i, a) => !(i === 0 && false)) },
    { label: 'Pr(X=1)', name: 'pu', kind: 'prob', expect: ft(p1), action: t(fem(D) ? 'Exactement une' : 'Exactement un'), lines: [{ math: `${D.K}×C(${D.N - D.K};${D.n - 1})/${D.om}`, subgoal: 'count', note: t(fem(D) ? 'Exactement une' : 'Exactement un') }, { math: ft(p1), note: t('Simplifier') }] },
    {
      label: 'Pr(X≥2)', name: 'pv', kind: 'prob', expect: '1-$pz-$pu', action: t('Complément : 1 − Pr(X = 0) − Pr(X = 1)'),
      wrongActions: [{ label: 'Pr(X ≥ 2) = Pr(X = 2)', rule: 'p_exactly_atleast', why: t('« Au moins 2 » contient aussi 3, 4, …') }],
      traps: { p_exactly_atleast: { values: [ft(p2)], ctx: { k: 2, 'k+1': 3 } } },
      lines: [{ math: `1-${ft(p0)}-${ft(p1)}`, subgoal: 'ratio', note: t('Complément') }, { math: ft(v), note: t('Calculer') }],
    },
  ] };
}

function ctItem(level, rng, profile, opts = {}) {
  const D = ctData(rng);
  if (opts.exam === 'mcq') return ctMcq(D, rng, opts);
  if (opts.exam === 'tf') return ctTf(rng, opts);
  const atLeast = (level === 5 || (level === 4 && rng.chance(0.3))) && D.n >= 3 && D.K >= 2 && !opts.exam;
  if (atLeast) {
    const A = ctAtLeast(D);
    // Pr(X = 0) of one line when the fraction is already irreducible: end there.
    A.parts[1].lines = A.p0.d === D.om ? [{ math: `${C(D.N - D.K, D.n)}/${D.om}`, subgoal: 'count', note: t(fem(D) ? 'Aucune des {what}' : 'Aucun des {what}', { what: t(D.what) }) }] : A.parts[1].lines;
    A.parts[2].lines = A.p1.d === D.om ? [{ math: `${D.K * C(D.N - D.K, D.n - 1)}/${D.om}`, subgoal: 'count', note: t(fem(D) ? 'Exactement une' : 'Exactement un') }] : A.parts[2].lines;
    return statItem({
      skill: CT, level, key: `${level}:atleast:${D.N}:${D.K}:${D.n}`, fallback: D.fallback,
      prompt: `${D.story(D.n)} ${t('Quelle est la probabilité d\'obtenir au moins deux {what} ?', { what: t(D.what) })}`,
      parts: A.parts, subgoals: CT_SUB,
      hints: H(t('« Au moins 2 » : le contraire de « 0 ou 1 ». Compte ces deux cas.'), M(`1-□-□`), `Pr(X ≥ 2) = ${s(A.v)}`),
      simulate: { model: 'urn', balls: { K: D.K, O: D.N - D.K }, draw: D.n, replace: false, count: 'K', event: { op: 'ge', k: 2 }, answer: A.v.valueOf(), label: t('Au moins deux {what}', { what: t(D.what) }) },
      exam: examTag(opts),
    });
  }
  const parts = ctParts(D);
  const prompt = `${D.story(D.n)} ${t('Quelle est la probabilité d\'obtenir exactement {x} ? Donne |Ω|, |A|, puis Pr(A) en fraction irréductible.', { x: nbT(D.k, D.what) })}`;
  if (opts.exam === 'coef') return coefItem({ skill: CT, key: `coef:${D.N}:${D.K}:${D.n}:${D.k}`, prompt: `${D.story(D.n)} ${t('Probabilité d\'obtenir exactement {x} (fraction irréductible) ?', { x: nbT(D.k, D.what) })}`, parts, subgoals: CT_SUB, exam: examTag(opts) });
  return statItem({
    skill: CT, level, key: `${level}:${D.N}:${D.K}:${D.n}:${D.k}`, fallback: D.fallback,
    prompt, parts, subgoals: CT_SUB, exam: examTag(opts),
    simulate: { model: 'urn', balls: { K: D.K, O: D.N - D.K }, draw: D.n, replace: false, count: 'K', event: { op: 'eq', k: D.k }, answer: D.p.valueOf(), label: t('Exactement {x}', { x: nbT(D.k, D.what) }) },
    hints: H(t('Choisis les {what}, puis les autres : multiplie les deux comptes. Compte Ω de la même façon (sans ordre).', { what: t(D.what) }), M(`C(${D.K};${D.k})×C(□;□)`), `|A| = ${D.a} · ${D.b} = ${D.fa}`),
  });
}

function ctMcq(D, rng, opts) {
  const p = q(D.fa, D.om);
  return choice({
    skill: CT, level: 4, key: `mcq:${D.N}:${D.K}:${D.n}:${D.k}`, exam: examTag(opts),
    prompt: `${D.story(D.n)} ${t('Probabilité d\'obtenir exactement {x} ?', { x: nbT(D.k, D.what) })}`,
    right: s(p), wrongs: [
      { html: s(q(D.a, D.om)), rule: 'p_count_forget_rest' },
      { html: s(binomQ(D.n, D.k, D.K, D.N)), rule: 'p_binom_without_replacement' },
      { html: s(q(D.fa, arrange(D.N, D.n))), rule: 'g7_order_confusion' },
    ], fillers: [{ html: s(q(D.fa, D.om * 2)) }],
  }, rng);
}

function ctTf(rng, opts) {
  if (rng.chance(0.5)) {
    return tf({ skill: CT, key: 'same', exam: examTag(opts), statement: t('Tirer 4 cartes d\'un coup ou une par une sans remise donne la même probabilité pour « exactement 2 dames ».'), truth: true, explanation: t('Une par une, on compte avec ordre en haut et en bas : le facteur 4! se simplifie.') });
  }
  const right = q(2268, 35960);
  const wrongV = binomQ(4, 2, 4, 32);
  return tf({
    skill: CT, key: 'binom', exam: examTag(opts),
    statement: t('Pour 4 cartes tirées d\'un coup dans un jeu de 32 cartes (4 dames), Pr(exactement 2 dames) = C(4, 2)·(1/8)²·(7/8)².'),
    truth: false, ruleIfTrue: 'p_binom_without_replacement',
    explanation: t('Sans remise, on compte : C(4, 2)·C(28, 2)/C(32, 4) = {r} ≈ {d}, pas {w}.', { r: s(right), d: dec4(right), w: dec4(wrongV) }),
    counter: numCounter({ vars: [{ v: 'p', label: t('La vraie probabilité (fraction) :') }], hyp: `p=${ft(right)}`, pred: `p=${ft(wrongV)}`, answer: { p: ft(right) } }),
  });
}

// ======================================================================
// p-cond-total
// ======================================================================

const CD = 'p-cond-total';
const CD_SUB = [{ id: 'part', label: t('partition'), skill: CD }, { id: 'sum', label: t('somme des branches'), skill: CD }];
const MED = { 'Pr(+|M)': 'se', 'Pr(M)': 'pi', 'Pr(+|M^c)': 'fp', 'Pr(M^c)': 'pc' };

function cdTotal(rng, level) {
  const g = rng.pick(level <= 2 ? ['test', 'urn'] : ['test', 'urn', 'machines', 'test']);
  if (g === 'machines') {
    const shares = rng.pick([[5, 3, 2], [4, 4, 2], [6, 3, 1], [5, 4, 1]]).map((x) => q(x, 10));
    const rates = rng.pick([[1, 2, 5], [2, 3, 4], [1, 3, 5], [2, 2, 6]]).map((x) => q(x, 100));
    const terms = shares.map((sh, i) => sh.mul(rates[i]));
    const v = terms.reduce((a, b) => a.add(b), q(0));
    return {
      g, v, terms,
      story: t('Trois machines A, B, C produisent {shares} des pièces ; leurs taux de défaut sont {rates}. Probabilité qu\'une pièce prise au hasard soit défectueuse ?', { shares: shares.map((x) => pct(x, 0)).join(', '), rates: rates.map((x) => pct(x, 0)).join(', ') }),
      label: 'Pr(D)', sym: null,
      formula: null,
      nums: shares.map((sh, i) => `${ft(sh)}×${ft(rates[i])}`).join('+'),
      mid: terms.map(ft).join('+'),
      drop: terms.map((x) => v.sub(x)),
      what: 'des machines',
    };
  }
  if (g === 'urn') {
    const r1 = rng.int(1, 5); const n1 = r1 + rng.int(1, 5);
    const r2 = rng.int(1, 5); const n2 = r2 + rng.int(1, 5);
    const a = q(r1, n1); const b = q(r2, n2);
    const v = a.add(b).div(2);
    return {
      g, v, terms: [a.div(2), b.div(2)],
      story: t('On lance une pièce équilibrée : pile, on tire une boule dans l\'urne 1 ({r1} rouges sur {n1}) ; face, dans l\'urne 2 ({r2} rouges sur {n2}). Probabilité de tirer une boule rouge ?', { r1, n1, r2, n2 }),
      label: 'Pr(R)', formula: null, nums: `1/2×${r1}/${n1}+1/2×${r2}/${n2}`, mid: `${ft(a.div(2))}+${ft(b.div(2))}`,
      drop: [a.div(2), b.div(2)], what: 'des urnes',
    };
  }
  const pi = q(rng.pick([5, 10, 20, 25, 30]), 100);
  const se = q(rng.pick([80, 90, 95]), 100);
  const fp = q(rng.pick([5, 10, 20]), 100);
  const a = se.mul(pi); const b = fp.mul(q(1).sub(pi));
  return {
    g: 'test', v: a.add(b), terms: [a, b], pi, se, fp,
    story: t('Dans une population, {pi} des personnes sont malades. Un test est positif avec probabilité {se} chez un malade et {fp} chez une personne saine. Probabilité qu\'une personne prise au hasard ait un test positif ?', { pi: pct(pi, 0), se: ft(se), fp: ft(fp) }),
    label: 'Pr(+)', sym: { 'Pr(+|M)': ft(se), 'Pr(M)': ft(pi), 'Pr(+|M^c)': ft(fp), 'Pr(M^c)': ft(q(1).sub(pi)) },
    formula: 'Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)',
    nums: `${ft(se)}×${ft(pi)}+${ft(fp)}×${ft(q(1).sub(pi))}`, mid: `${ft(a)}+${ft(b)}`, drop: [a, b], what: 'malade ou saine',
  };
}

function cdTotalPart(T) {
  return {
    label: T.label, name: 'tot', kind: 'prob', expect: ft(T.v), symbols: T.sym || undefined, action: t('Une branche par cas : multiplier le long, additionner les branches'),
    decisions: [{ prompt: t('Sur quels cas découper (quelle partition) ?'), levels: [2], options: [
      { id: 'p', label: t({ test: 'Malade ou sain : deux branches', urn: 'Pile ou face : une branche par urne', machines: 'A, B ou C : une branche par machine' }[T.g]), valid: true },
      { id: 'm', label: t('Seulement le cas le plus probable'), valid: false, rule: 'p_total_missing_branch', why: t('Toutes les branches qui mènent à l’événement comptent.') },
    ] }],
    wrongActions: [{ label: t('Garder seulement la branche principale'), rule: 'p_total_missing_branch', why: t('Toutes les branches qui mènent à l\'événement comptent.') }],
    traps: { p_total_missing_branch: { values: T.drop.map(ft), ctx: { v: ft(T.drop[0]) } } },
    lines: [
      ...(T.formula ? [{ math: T.formula, note: t('Probabilités totales'), subgoal: 'part', from: 3 }] : []),
      { math: T.nums, note: t('Une branche par cas'), subgoal: 'part', blank: [T.nums.split('+').pop()], blank2: [T.nums.split('+').slice(1).join('+')] },
      { math: T.mid, note: t('Multiplier le long des branches'), subgoal: 'sum', blank: [ft(T.terms[T.terms.length - 1])] },
      { math: ft(T.v), note: t('Additionner'), subgoal: 'sum', blank: [ft(T.v)] },
    ],
  };
}

// Pr(A | B) = Pr(A ∩ B)/Pr(B).
function cdCond(rng) {
  for (let k = 0; k < 100; k++) {
    const pB = q(rng.int(2, 8), 10);
    const pA = q(rng.int(2, 8), 10);
    const pAB = q(rng.int(1, 9), 20);
    if (pAB.cmp(pA) >= 0 || pAB.cmp(pB) >= 0 || pA.eq(pB)) continue;
    const v = pAB.div(pB);
    if (v.d > 20) continue;
    return { pA, pB, pAB, v };
  }
  return { pA: q(1, 2), pB: q(2, 5), pAB: q(1, 5), v: q(1, 2) };
}

// Two dice, sum S: Pr(at least one six | sum S) or Pr(a double | sum S).
function cdDice(rng) {
  const S = rng.int(7, 10);
  const what = S % 2 === 0 && S < 12 ? rng.pick(['six', 'double']) : 'six';
  const B = []; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === S) B.push([a, b]);
  const A = B.filter(([a, b]) => (what === 'six' ? a === 6 || b === 6 : a === b));
  return { S, what, nB: B.length, nA: A.length, v: q(A.length, B.length), pairs: B };
}

function cdItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return cdMcq(rng, opts);
  if (opts.exam === 'tf') return cdTf(rng, opts);
  const kind = opts.exam === 'coef' ? 'total' : level === 5 ? rng.pick(['dice', 'total+cond']) : level === 4 ? rng.pick(['total', 'cond', 'total']) : 'total';
  if (kind === 'dice') {
    const Dd = cdDice(rng);
    const parts = [
      { label: '|B|', name: 'nb', kind: 'prob', expect: String(Dd.nB), action: t('Compter les couples de somme {S}', { S: Dd.S }), lines: [{ math: String(Dd.nB), note: Dd.pairs.map(([a, b]) => `(${a}, ${b})`).join(' '), subgoal: 'part' }] },
      { label: '|A∩B|', name: 'na', kind: 'prob', expect: String(Dd.nA), action: t('Compter ceux qui réalisent aussi A'), lines: [{ math: String(Dd.nA), note: Dd.what === 'six' ? t('Avec au moins un 6') : t('Les doubles'), subgoal: 'part' }] },
      {
        label: 'Pr(A|B)', name: 'c', kind: 'prob', expect: '$na/$nb', action: t('Univers réduit : |A ∩ B|/|B|'),
        traps: { p_cond_denominator: { values: [ft(q(Dd.nA, 36))], ctx: { pb: `${Dd.nB}/36` } } },
        lines: [{ math: `${Dd.nA}/${Dd.nB}`, note: t('Dans l\'univers réduit'), subgoal: 'sum' }, ...(Dd.v.d === Dd.nB || Dd.nA === 0 ? [] : [{ math: ft(Dd.v), note: t('Simplifier') }])],
      },
    ];
    return statItem({
      skill: CD, level, key: `${level}:dice:${Dd.S}:${Dd.what}`,
      prompt: Dd.what === 'six' ? t('On lance deux dés équilibrés. Sachant que la somme vaut {S} (événement B), quelle est la probabilité d\'avoir au moins un 6 (événement A) ?', { S: Dd.S }) : t('On lance deux dés équilibrés. Sachant que la somme vaut {S} (événement B), quelle est la probabilité d\'avoir un double (événement A) ?', { S: Dd.S }),
      parts, subgoals: CD_SUB, exam: examTag(opts), hints: [],
    });
  }
  if (kind === 'cond') {
    const c = cdCond(rng);
    const sym = { 'Pr(A∩B)': ft(c.pAB), 'Pr(B)': ft(c.pB), 'Pr(A)': ft(c.pA) };
    return statItem({
      skill: CD, level, key: `${level}:cond:${ft(c.pAB)}:${ft(c.pB)}:${ft(c.pA)}`,
      prompt: t('Pr(A) = {pA}, Pr(B) = {pB} et Pr(A ∩ B) = {pAB}. Que vaut Pr(A | B) ?', { pA: s(c.pA), pB: s(c.pB), pAB: s(c.pAB) }),
      parts: [{
        label: 'Pr(A|B)', name: 'c', kind: 'prob', expect: ft(c.v), symbols: sym, action: t('Diviser Pr(A ∩ B) par Pr(B)'),
        wrongActions: [{ label: t('Diviser Pr(A ∩ B) par Pr(A)'), rule: 'p_cond_denominator', why: t('On conditionne par B : on divise par Pr(B).') }],
        traps: { p_cond_denominator: { values: [ft(c.pAB.div(c.pA))], ctx: { pb: ft(c.pB) } } },
        lines: [{ math: 'Pr(A∩B)/Pr(B)', note: t('Définition'), subgoal: 'part' }, { math: ratio(c.pAB, c.pB), note: t('Remplacer') }, { math: ft(c.v), note: t('Calculer'), subgoal: 'sum' }],
      }],
      subgoals: CD_SUB, exam: examTag(opts),
      hints: H(t('On sait que B a lieu : Pr(A | B) = Pr(A ∩ B)/Pr(B).'), M(`${ft(c.pAB)}/□`), `Pr(A | B) = ${s(c.v)}`),
    });
  }
  const T = cdTotal(rng, level);
  const parts = [cdTotalPart(T)];
  let q2 = '';
  if (kind === 'total+cond' && T.g === 'test') {
    const a = T.terms[0];
    parts.push({
      label: 'Pr(M|+)', name: 'post', kind: 'prob', expect: `${ft(a)}/$tot`, action: 'Pr(M ∩ +)/Pr(+)',
      wrongActions: [{ label: t('Diviser Pr(M ∩ +) par Pr(M)'), rule: 'p_cond_denominator', why: t('On sait que le test est positif : on divise par Pr(+).') }],
      traps: { p_cond_denominator: { values: [ft(T.se)], ctx: { pb: ft(T.v) } } },
      lines: [{ math: ratio(a, T.v), note: t('Branche « malade et positif » sur toutes les branches « positif »'), subgoal: 'part' }, { math: ft(a.div(T.v)), note: t('Simplifier'), subgoal: 'sum' }],
    });
    q2 = ` ${t('Puis la probabilité d\'être malade sachant que le test est positif.')}`;
  }
  const prompt = `${T.story}${q2}`;
  if (opts.exam === 'coef') return coefItem({ skill: CD, key: `coef:${T.nums}`, prompt, parts, subgoals: CD_SUB, exam: examTag(opts) });
  return statItem({
    skill: CD, level, key: `${level}:${kind}:${T.nums}`, prompt, parts, subgoals: CD_SUB, exam: examTag(opts),
    hints: H(t('Une branche par cas ; on multiplie le long d\'une branche, on additionne les branches.'), M(T.nums.replace(/[^+]*$/, '□')), `${T.label} = ${s(T.v)}`),
  });
}

function cdMcq(rng, opts) {
  const T = cdTotal(rng, 4);
  return choice({
    skill: CD, level: 4, key: `mcq:${T.nums}`, exam: examTag(opts), prompt: T.story,
    right: s(T.v), wrongs: T.drop.slice(0, 2).map((x) => ({ html: s(x), rule: 'p_total_missing_branch' })),
    fillers: [{ html: s(T.v.mul(2)) }, { html: s(T.drop[0].add(T.v).div(2)) }, { html: s(T.v.div(2)) }],
  }, rng);
}

function cdTf(rng, opts) {
  if (rng.chance(0.4)) return tf({ skill: CD, key: 'compl', exam: examTag(opts), statement: t('Pour tous événements A et B avec Pr(B) > 0 : Pr(A | B) + Pr(Aᶜ | B) = 1.'), truth: true, explanation: t('Sachant B, A et Aᶜ se partagent toutes les issues : Pr(· | B) est une probabilité.') });
  return tf({
    skill: CD, key: 'cond-sum', exam: examTag(opts),
    statement: t('Pour tous événements A et B : Pr(A | B) + Pr(A | Bᶜ) = 1.'),
    truth: false, ruleIfTrue: 'p_cond_inverse',
    explanation: t('Avec A = Ω (l\'événement certain) : Pr(A | B) = Pr(A | Bᶜ) = 1, la somme vaut 2.'),
    counter: numCounter({ vars: [{ v: 'a', label: 'Pr(A | B) =' }, { v: 'b', label: 'Pr(A | Bᶜ) =' }], hyp: '0≤a≤1∧0≤b≤1', pred: 'a+b=1', answer: { a: '1', b: '1' } }),
  });
}

// ======================================================================
// p-bayes-freq and p-bayes-formula: a test (or a filter, a machine)
// ======================================================================

const BF = 'p-bayes-freq';
const BY = 'p-bayes-formula';
const SCEN = [
  { id: 'med', ill: 'malades', ok: 'sains', pos: 'positifs', neg: 'négatifs', M: 'M', who: 'personnes', intro: (p) => t('Une maladie touche {p} de la population.', { p }), test: (se, fp) => t('Le test détecte {se} des malades, et il est positif chez {fp} des personnes saines.', { se, fp }), q: t('Quelle est la probabilité qu\'une personne positive soit malade ?') },
  { id: 'spam', ill: 'spams', ok: 'normaux', pos: 'signalés', neg: 'non signalés', M: 'S', who: 'messages', intro: (p) => t('{p} des courriels reçus sont des spams.', { p }), test: (se, fp) => t('Le filtre signale {se} des spams, mais aussi {fp} des messages normaux (« ham »).', { se, fp }), q: t('Quelle est la probabilité qu\'un message signalé soit un spam ?') },
  { id: 'qc', ill: 'défectueuses', ok: 'bonnes', pos: 'rejetées', neg: 'acceptées', M: 'D', who: 'pièces', intro: (p) => t('Une machine produit {p} de pièces défectueuses.', { p }), test: (se, fp) => t('Le contrôle rejette {se} des pièces défectueuses et, par erreur, {fp} des bonnes.', { se, fp }), q: t('Quelle est la probabilité qu\'une pièce rejetée soit défectueuse ?') },
];

function bfData(rng) {
  for (let k = 0; k < 400; k++) {
    const pi = q(rng.pick([5, 10, 20, 50, 100, 200]), 1000);
    const se = q(rng.pick([80, 90, 95, 99]), 100);
    const fp = q(rng.pick([1, 2, 5, 10, 20]), 100);
    for (const N of [1000, 10000]) {
      const m = pi.mul(N);
      const mp = m.mul(se);
      const sp = q(N).sub(m).mul(fp);
      if (!m.isInt() || !mp.isInt() || !sp.isInt()) continue;
      const pos = mp.add(sp);
      const post = mp.div(pos);
      if (post.valueOf() > 0.9) continue;
      return { pi, se, fp, N, m: m.n, ok: N - m.n, mp: mp.n, sp: sp.n, pos: pos.n, post };
    }
  }
  return { pi: q(1, 100), se: q(9, 10), fp: q(1, 10), N: 1000, m: 10, ok: 990, mp: 9, sp: 99, pos: 108, post: q(1, 12), fallback: true };
}

function bayesInterpret(D, sc) {
  const one = Math.round(D.pos / D.mp);
  return {
    prompt: t('Interpréter : quelle phrase est juste ?'),
    options: [
      { html: t('Parmi les {pos}, environ {p} sont {ill} (environ 1 sur {one}).', { pos: t(sc.pos), p: pct(D.post), ill: t(sc.ill), one }), correct: true },
      { html: t('{p} des {pos} sont {ill}.', { p: pct(D.se, 0), pos: t(sc.pos), ill: t(sc.ill) }), correct: false, rule: 'p_cond_inverse' },
      { html: t('{mp} {who} sur {N} sont {ill} parmi les {pos} : la probabilité cherchée est {p}.', { mp: D.mp, who: t(sc.who), N: D.N, ill: t(sc.ill), pos: t(sc.pos), p: s(q(D.mp, D.N)) }), correct: false, rule: 'p_bayes_joint' },
      { html: t('Environ {p} : le test se trompe rarement, la part des {ill} ne compte pas.', { p: pct(D.se.div(D.se.add(D.fp)), 0), ill: t(sc.ill) }), correct: false, rule: 'p_base_rate' },
    ],
  };
}

function bfParts(D, sc, level) {
  const postT = ft(D.post);
  return [
    { label: t(sc.ill), name: 'm', kind: 'prob', expect: String(D.m), action: t('Répartir selon le taux de base'), lines: [{ math: `${ft(D.pi)}×${D.N}`, note: t('Taux de base'), subgoal: 'base', blank: [ft(D.pi)], from: 1 }, { math: String(D.m), note: t('et {n} {ok}', { n: D.ok, ok: t(sc.ok) }), subgoal: 'base', blank: [String(D.m)] }] },
    { label: t(`${sc.ill} ${sc.pos}`), name: 'mp', kind: 'prob', expect: `${ft(D.se)}×$m`, action: t('Appliquer la sensibilité'), lines: [{ math: `${ft(D.se)}×${D.m}`, note: t('Sensibilité'), subgoal: 'sens', blank: [ft(D.se)] }, { math: String(D.mp), blank: [String(D.mp)] }] },
    { label: t(`${sc.ok} ${sc.pos}`), name: 'sp', kind: 'prob', expect: `${ft(D.fp)}×(${D.N}-$m)`, action: t('Appliquer le taux de faux positifs'), lines: [{ math: `${ft(D.fp)}×${D.ok}`, note: t('Faux positifs'), subgoal: 'fp', blank: [String(D.ok)] }, { math: String(D.sp), blank: [String(D.sp)] }] },
    { label: t(sc.pos), name: 'pos', kind: 'prob', expect: '$mp+$sp', action: t('Total des {pos}', { pos: t(sc.pos) }), lines: [{ math: `${D.mp}+${D.sp}`, note: t('Total de la colonne'), subgoal: 'ratio', blank: [String(D.sp)] }, { math: String(D.pos), blank: [String(D.pos)] }] },
    {
      label: `Pr(${sc.M}|+)`, name: 'post', kind: 'prob', expect: '$mp/$pos', action: t('{both} sur tous les {pos}', { both: t(`${sc.ill} ${sc.pos}`), pos: t(sc.pos) }),
      decisions: [{ prompt: t('Quel rapport ?'), levels: [2], options: [
        { id: 'r', label: `${D.mp}/${D.pos}`, valid: true },
        { id: 'i', label: `${D.mp}/${D.m}`, valid: false, rule: 'p_cond_inverse', why: t('C\'est la proportion de positifs chez les malades, l\'inverse de la question.') },
        { id: 'j', label: `${D.mp}/${D.N}`, valid: false, rule: 'p_bayes_joint', why: t('On ne regarde que les positifs, pas toute la population.') },
      ] }],
      traps: { p_cond_inverse: { values: [ft(D.se)], ctx: { v: ft(D.se) } }, p_bayes_joint: { values: [ft(q(D.mp, D.N))] }, p_base_rate: { values: [ft(D.se.div(D.se.add(D.fp)))], ctx: { 'π': pct(D.pi), nM: D.m } } },
      lines: [
        ...(D.post.d === D.pos ? [] : [{ math: `${D.mp}/${D.pos}`, note: t('Rapport'), subgoal: 'ratio', blank: [String(D.pos)] }]),
        D.post.toDecimal() ? { math: postT, note: t('Soit {p}', { p: pct(D.post) }), subgoal: 'pct', blank: [postT] } : { math: `${postT}≈${String(Number(D.post.valueOf().toFixed(3))).replace('.', ',')}`, note: t('Soit environ {p}', { p: pct(D.post) }), subgoal: 'pct' },
      ],
    },
  ];
}

const BF_SUB = [{ id: 'base', label: t('taux de base'), skill: 'p-cond-total' }, { id: 'sens', label: t('sensibilité'), skill: 'p-cond-total' }, { id: 'fp', label: t('faux positifs'), skill: 'p-cond-total' }, { id: 'ratio', label: t('rapport'), skill: BF }, { id: 'pct', label: t('pourcentage'), skill: 'pct-which' }];

function bfItem(level, rng, profile, opts = {}) {
  const D = bfData(rng);
  const sc = rng.pick(SCEN);
  const head = `${sc.intro(pct(D.pi))} ${sc.test(pct(D.se, 0), pct(D.fp, 0))}`;
  if (opts.exam === 'mcq') {
    return choice({
      skill: BF, level: 4, key: `mcq:${sc.id}:${ft(D.pi)}:${ft(D.se)}:${ft(D.fp)}`, exam: examTag(opts), prompt: `${head} ${sc.q}`,
      right: s(D.post), wrongs: [{ html: s(D.se), rule: 'p_cond_inverse' }, { html: s(D.se.div(D.se.add(D.fp))), rule: 'p_base_rate' }, { html: s(q(D.mp, D.N)), rule: 'p_bayes_joint' }],
      fillers: [{ html: s(q(1).sub(D.fp)) }, { html: s(q(D.sp, D.pos)) }],
    }, rng);
  }
  if (opts.exam === 'tf') {
    return tf({
      skill: BF, key: 'ppv', exam: examTag(opts),
      statement: t('Un test qui détecte 99 % des malades donne toujours au moins 99 % de malades parmi les personnes positives.'),
      truth: false, ruleIfTrue: 'p_cond_inverse',
      explanation: t('Avec une prévalence de 1 % et 5 % de faux positifs : Pr(M | +) = 0,0099/(0,0099 + 0,0495) = 1/6.'),
      counter: numCounter({ vars: [{ v: 'p', label: t('Prévalence p =') }, { v: 'f', label: t('Taux de faux positifs f =') }], hyp: '0<p<1∧0<f<1', pred: '0,99p/(0,99p+f×(1-p))≥0,99', answer: { p: '0,01', f: '0,05' } }),
    });
  }
  const parts = bfParts(D, sc, level);
  const prompt = `${head} ${t('Imagine {N} {who}.', { N: D.N === 1000 ? '1 000' : '10 000', who: t(sc.who) })} ${sc.q}`;
  if (opts.exam === 'coef') return coefItem({ skill: BF, key: `coef:${sc.id}:${ft(D.pi)}:${ft(D.se)}:${ft(D.fp)}`, prompt: `${head} ${sc.q} ${t('(fraction irréductible)')}`, parts, subgoals: BF_SUB, exam: examTag(opts), fallback: D.fallback });
  return statItem({
    skill: BF, level, key: `${level}:${sc.id}:${ft(D.pi)}:${ft(D.se)}:${ft(D.fp)}`, fallback: D.fallback, prompt, parts, subgoals: BF_SUB, exam: examTag(opts),
    hints: H(t('Commence par répartir les {N} {who} selon le taux de base, avant de parler du test.', { N: D.N === 1000 ? '1 000' : '10 000', who: t(sc.who) }), M(`${D.mp}/(${D.mp}+□)`), `Pr = ${D.mp}/${D.pos} = ${s(D.post)}`),
    interpret: bayesInterpret(D, sc),
    simulate: { model: 'bayes', prev: D.pi.valueOf(), sens: D.se.valueOf(), fpr: D.fp.valueOf(), tests: 1, event: { op: 'eq', k: 1 }, given: { positive: true }, answer: D.post.valueOf(), label: t('Pr({M} | +) sur 10 000 {who} tirées', { M: sc.M, who: t(sc.who) }) },
  });
}

// Bayes' formula, one or two tests.
function byData(rng, two) {
  for (let k = 0; k < 400; k++) {
    const pi = q(rng.pick([1, 2, 5, 10, 20, 25, 30]), 100);
    const se = q(rng.pick([7, 8, 9]), 10);
    const fp = q(rng.pick([1, 2, 3]), 10);
    const pp = se.mul(pi).add(fp.mul(q(1).sub(pi)));
    const post = se.mul(pi).div(pp);
    const num2 = se.mul(se).mul(pi);
    const pp2 = num2.add(fp.mul(fp).mul(q(1).sub(pi)));
    const post2 = num2.div(pp2);
    if (two && post2.d > 100) continue;
    if (post.d > 200) continue;
    return { pi, se, fp, pp, post, num2, pp2, post2 };
  }
  const pi = q(1, 5); const se = q(4, 5); const fp = q(1, 10);
  return { pi, se, fp, pp: q(6, 25), post: q(2, 3), num2: q(16, 125), pp2: q(17, 125), post2: q(16, 17), fallback: true };
}

const BY_SUB = [{ id: 'total', label: t('probabilités totales'), skill: 'p-cond-total' }, { id: 'bayes', label: t('formule de Bayes'), skill: BY }, { id: 'two', label: t('deux tests'), skill: BY }];

function byParts(D, two, check) {
  const nume = D.se.mul(D.pi);
  const sym = { 'Pr(+|M)': ft(D.se), 'Pr(M)': ft(D.pi), 'Pr(+|M^c)': ft(D.fp), 'Pr(M^c)': ft(q(1).sub(D.pi)) };
  const parts = [
    {
      label: 'Pr(+)', name: 'pp', kind: 'prob', expect: ft(D.pp), symbols: sym, action: t('Probabilités totales : le dénominateur Pr(+)'),
      wrongActions: [{ label: t('Prendre 1/2 pour Pr(M) et Pr(Mᶜ)'), rule: 'p_base_rate', why: t('La prévalence est donnée : elle n\'est pas 1/2.') }],
      traps: { p_total_missing_branch: { values: [ft(nume)] }, p_base_rate: { values: [ft(D.se.add(D.fp).div(2))] } },
      lines: [
        { math: 'Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)', note: t('Probabilités totales'), subgoal: 'total', from: 3 },
        { math: `${ft(D.se)}×${ft(D.pi)}+${ft(D.fp)}×${ft(q(1).sub(D.pi))}`, note: t('Remplacer'), subgoal: 'total', blank: [ft(q(1).sub(D.pi))] },
        { math: ft(D.pp), note: t('Calculer'), blank: [ft(D.pp)] },
      ],
    },
    {
      label: 'Pr(M|+)', name: 'post', kind: 'prob', expect: `${ft(nume)}/$pp`, symbols: sym, action: t('Bayes : branche « malade et positif » sur Pr(+)'),
      wrongActions: [{ label: 'Pr(M | +) = Pr(+ | M)', rule: 'p_cond_inverse', why: t('C\'est la probabilité inverse.') }],
      traps: { p_cond_inverse: { values: [ft(D.se)], ctx: { v: ft(D.se) } }, p_base_rate: { values: [ft(D.se.div(D.se.add(D.fp)))], ctx: { 'π': pct(D.pi, 0) } } },
      lines: [
        { math: ratio(nume, D.pp), note: 'Pr(+ | M)·Pr(M)/Pr(+)', subgoal: 'bayes', blank: [ft(D.pp)] },
        { math: ft(D.post), note: t('Soit {p}', { p: pct(D.post) }), subgoal: 'bayes', blank: [ft(D.post)] },
      ],
    },
  ];
  if (two) {
    parts.push({
      label: 'Pr(M|+,+)', name: 'two', kind: 'prob', expect: ft(D.post2), action: t('Deux tests indépendants sachant l\'état : Pr(+ | M)²'),
      wrongActions: [{ label: t('Élever Pr(M | +) au carré'), rule: 'p_two_tests_square', why: t('Un second test positif doit augmenter la probabilité.') }, { label: t('Diviser par Pr(+)²'), rule: 'p_two_tests_uncond', why: t('Les tests sont indépendants sachant l\'état, pas en général.') }],
      traps: { p_two_tests_square: { values: [ft(D.post.mul(D.post))] }, p_two_tests_uncond: { values: [ft(D.num2.div(D.pp.mul(D.pp)))].filter((v) => q(1).cmp(D.num2.div(D.pp.mul(D.pp))) > 0) } },
      lines: [
        { math: `${ft(D.se)}^2×${ft(D.pi)}/(${ft(D.se)}^2×${ft(D.pi)}+${ft(D.fp)}^2×${ft(q(1).sub(D.pi))})`, note: t('Les vraisemblances au carré'), subgoal: 'two', blank: [ft(D.fp)] },
        { math: ratio(D.num2, D.pp2), note: t('Calculer'), blank: [ft(D.pp2)] },
        { math: ft(D.post2), note: t('Soit {p}', { p: pct(D.post2) }), subgoal: 'two', blank: [ft(D.post2)] },
      ],
    });
    if (check) {
      parts.push({
        label: t('vérif'), name: 'chk', kind: 'prob', expect: ft(D.post2), action: t('L\'a posteriori devient l\'a priori du 2e test'),
        lines: [{ math: `${ft(D.se)}×${ft(D.post)}/(${ft(D.se)}×${ft(D.post)}+${ft(D.fp)}×(1-${ft(D.post)}))`, note: t('Mise à jour successive'), subgoal: 'two' }, { math: ft(D.post2), note: t('Même résultat') }],
      });
    }
  }
  return parts;
}

function byInterpret(D) {
  return {
    prompt: t('Interpréter : quelle phrase est juste ?'),
    options: [
      { html: t('Après deux tests positifs, la probabilité d\'être malade monte de {a} à {b}.', { a: pct(D.post), b: pct(D.post2) }), correct: true },
      { html: t('Après deux tests positifs, elle vaut ({p})², elle diminue.', { p: s(D.post) }), correct: false, rule: 'p_two_tests_square' },
      { html: t('{p} des positifs sont malades, quel que soit le nombre de tests.', { p: pct(D.se, 0) }), correct: false, rule: 'p_cond_inverse' },
      { html: t('La prévalence ne compte pas : seul le test compte.'), correct: false, rule: 'p_base_rate' },
    ],
  };
}

function byItem(level, rng, profile, opts = {}) {
  const two = opts.exam === 'open' || level === 5 ? true : level === 4 ? rng.chance(0.5) : level === 3 ? rng.chance(0.3) : false;
  const D = byData(rng, two);
  const head = t('{pi} d\'une population est malade. Un test est positif avec probabilité {se} chez un malade et {fp} chez une personne saine.', { pi: pct(D.pi, 0), se: ft(D.se), fp: ft(D.fp) });
  const key = `${ft(D.pi)}:${ft(D.se)}:${ft(D.fp)}`;
  if (opts.exam === 'mcq') {
    return choice({
      skill: BY, level: 4, key: `mcq:${key}`, exam: examTag(opts), prompt: `${head} ${t('Une personne a deux tests positifs (indépendants sachant l\'état). Pr(M | +, +) ?')}`,
      right: s(D.post2), wrongs: [{ html: s(D.post.mul(D.post)), rule: 'p_two_tests_square' }, ...(D.num2.div(D.pp.mul(D.pp)).cmp(1) < 0 ? [{ html: s(D.num2.div(D.pp.mul(D.pp))), rule: 'p_two_tests_uncond' }] : []), { html: s(D.se), rule: 'p_cond_inverse' }],
      fillers: [{ html: s(D.post) }, { html: s(D.se.mul(D.se)) }],
    }, rng);
  }
  if (opts.exam === 'tf') {
    return tf({
      skill: BY, key: `sq:${key}`, exam: examTag(opts),
      statement: `${head} ${t('Avec deux tests indépendants sachant l\'état, Pr(M | +, +) = Pr(M | +)².')}`,
      truth: false, ruleIfTrue: 'p_two_tests_square',
      explanation: t('Pr(M | +) = {a} et Pr(M | +, +) = {b}, pas ({a})².', { a: s(D.post), b: s(D.post2) }),
      counter: numCounter({ vars: [{ v: 'a', label: 'Pr(M | +) =' }, { v: 'b', label: 'Pr(M | +, +) =' }], hyp: `a=${ft(D.post)}∧b=${ft(D.post2)}`, pred: 'b=a^2', answer: { a: ft(D.post), b: ft(D.post2) } }),
    });
  }
  const parts = byParts(D, two, level === 5 || opts.exam === 'open');
  const prompt = `${head} ${two ? t('Calcule Pr(+), puis Pr(M | +), puis, pour deux tests positifs indépendants sachant l\'état, Pr(M | +, +).') : t('Calcule Pr(+), puis Pr(M | +).')}`;
  const o = {
    skill: BY, level, key: `${level}:${two}:${key}`, fallback: D.fallback, prompt, parts, subgoals: BY_SUB, exam: examTag(opts),
    hints: H(t('Numérateur : la branche « malade et positif ». Dénominateur : toutes les branches « positif ».'), M(`${ft(D.se.mul(D.pi))}/(${ft(D.se.mul(D.pi))}+□)`), `Pr(M | +) = ${s(D.post)}`),
    interpret: two ? byInterpret(D) : null,
  };
  if (opts.exam === 'open') return openItem({ ...o, key: `open:${key}`, title: t('Un test, puis deux') }, 10, rng);
  if (opts.exam === 'coef') return coefItem({ ...o, key: `coef:${key}`, prompt: `${head} ${t('Probabilité qu\'une personne positive soit malade (fraction irréductible) ?')}`, part: parts[1], parts });
  return statItem(o);
}

// ======================================================================
// p-indep
// ======================================================================

const IN = 'p-indep';
const IN_SUB = [{ id: 'marg', label: t('marginales'), skill: EV }, { id: 'dec', label: t('décision'), skill: IN }, { id: 'sys', label: t('système'), skill: IN }];
const SYS_WRONG = [
  { label: t('Multiplier n par p'), rule: 'p_atleast_one_np', why: t('n·p peut dépasser 1 : « au moins un » se calcule par le complément.') },
  { label: t('Échanger les formules série et parallèle'), rule: 'p_series_parallel', why: t('En série, tous doivent marcher (produit) ; en parallèle, au moins un (complément).') },
];

function inSystem(rng, level) {
  const kind = level >= 4 && rng.chance(0.4) ? 'mixed' : rng.pick(['parallel', 'series']);
  // Readable results: at most 6 decimals (0,95⁴ or 1 − 0,01⁴ are not), and
  // 0,99 in parallel only for two components (1 − 0,01³ = 0,999999).
  const pp = rng.pick(kind === 'parallel' ? [80, 90, 95] : [80, 90, 95, 99]);
  const p = q(pp, 100);
  const dec = pp % 10 ? 2 : 1;
  const n = rng.int(2, Math.min(level >= 4 ? 4 : 3, Math.floor(6 / dec)));
  const fail = q(1).sub(p);
  if (kind === 'mixed') {
    const r = q(rng.pick([90, 95, 99]), 100);
    const par = q(1).sub(fail.mul(fail));
    const v = par.mul(r);
    return {
      kind, v, ...both('Deux composants identiques (fiabilité {p}) sont montés en parallèle ; ce bloc est en série avec un troisième composant de fiabilité {r}. Les pannes sont indépendantes. Probabilité que le système marche ?', { p: ft(p), r: ft(r) }),
      parts: [
        { label: t('bloc'), name: 'b', kind: 'prob', expect: ft(par), action: t('Parallèle : 1 − Pr(tous en panne)'), wrongActions: SYS_WRONG, traps: { p_series_parallel: { values: [ft(p.mul(p))] }, p_atleast_one_np: { values: [ft(p.mul(2))].filter((x) => q(2).mul(p).cmp(1) < 0) } }, lines: [{ math: `1-(1-${ft(p)})^2`, note: t('Au moins un des deux marche'), subgoal: 'sys' }, { math: ft(par), note: t('Calculer') }] },
        { label: t('système'), name: 'v', kind: 'prob', expect: `$b×${ft(r)}`, action: t('Série : multiplier'), traps: { p_series_parallel: { values: [ft(q(1).sub(q(1).sub(par).mul(q(1).sub(r))))] } }, lines: [{ math: `${ft(par)}×${ft(r)}`, note: t('Série avec le troisième'), subgoal: 'sys' }, { math: ft(v), note: t('Calculer') }] },
      ],
    };
  }
  const v = kind === 'series' ? qpow(p, n) : q(1).sub(qpow(fail, n));
  const other = kind === 'series' ? q(1).sub(qpow(fail, n)) : qpow(p, n);
  return {
    kind, v, ...both(kind === 'series' ? '{n} composants indépendants, de fiabilité {p} chacun, sont montés en série (le système marche si tous marchent). Probabilité que le système marche ?' : '{n} composants indépendants, de fiabilité {p} chacun, sont montés en parallèle (le système marche si au moins un marche). Probabilité que le système marche ?', { n, p: ft(p) }),
    parts: [{
      label: t('Pr(marche)'), name: 'v', kind: 'prob', expect: ft(v), action: kind === 'series' ? t('Série : produit des fiabilités') : t('Parallèle : 1 − Pr(tous en panne)'),
      wrongActions: SYS_WRONG,
      traps: { p_series_parallel: { values: [ft(other)], ctx: {} }, ...(kind === 'parallel' ? { p_atleast_one_np: { values: [ft(p.mul(n)), ft(q(1).sub(qpow(p, n)))], ctx: { n, p: ft(p), v: ft(p.mul(n)) } } } : {}) },
      lines: kind === 'series'
        ? [{ math: `${ft(p)}^${n}`, note: t('Tous doivent marcher'), subgoal: 'sys', blank: [String(n)] }, { math: ft(v), note: t('Calculer'), blank: [ft(v)] }]
        : [{ math: `1-(1-${ft(p)})^${n}`, note: t('Contraire de « tous en panne »'), subgoal: 'sys', blank: [String(n)] }, { math: `1-${ft(qpow(fail, n))}`, note: t('Puissance'), blank: [ft(qpow(fail, n))] }, { math: ft(v), note: t('Calculer'), blank: [ft(v)] }],
    }],
  };
}

// Two dice: A = parity of die 1, B = parity of die 2, C = parity of the sum.
function inDice(rng) {
  const a = rng.pick(['pair', 'impair']); const b = rng.pick(['pair', 'impair']); const c = rng.pick(['paire', 'impaire']);
  // A ∩ B fixes the parity of the sum: C holds on all of it or on none of it.
  const sumParity = (a === b) ? 'paire' : 'impaire';
  const abc = sumParity === c ? q(1, 4) : q(0);
  return {
    abc, ...both(`On lance deux dés équilibrés. A = « le 1er dé est ${a} », B = « le 2e dé est ${b} », C = « la somme est ${c} ». Pr(A) = Pr(B) = Pr(C) = 1/2.`, {}),
    parts: [
      { label: 'Pr(A∩B)', name: 'ab', kind: 'prob', expect: '1/4', action: t('Compter les couples : 9 sur 36'), decisions: [], lines: [{ math: '9/36', note: t('3 · 3 couples'), subgoal: 'marg', blank: ['9'] }, { math: '1/4', note: t('= Pr(A)·Pr(B) : A et B indépendants'), subgoal: 'dec', blank: ['1/4'] }] },
      {
        label: 'Pr(A∩B∩C)', name: 'abc', kind: 'prob', expect: ft(abc), action: t('Sur A ∩ B, la parité de la somme est fixée'),
        decisions: [{ prompt: t('A, B et C sont indépendants deux à deux (même calcul pour chaque paire). Sont-ils mutuellement indépendants ?'), levels: [2, 3, 4, 5], options: [
          { id: 'calc', label: t('Il faut encore vérifier Pr(A ∩ B ∩ C) = 1/8'), valid: true },
          { id: 'yes', label: t('Oui : les trois paires sont indépendantes'), valid: false, rule: 'p_pairwise_mutual', why: t('Indépendants deux à deux ne suffit pas : il faut aussi la condition sur les trois.') },
        ] }],
        lines: [{ math: abc.n ? `${abc.n}/${abc.d}` : '0', note: t(`${abc.n ? 'Sur A ∩ B, la somme est toujours' : 'Sur A ∩ B, la somme n\'est jamais'} ${c} : {v} ≠ 1/8, pas mutuellement indépendants`, { v: abc.n ? `${abc.n}/${abc.d}` : 0 }), subgoal: 'dec' }],
      },
    ],
  };
}

// A 2×2 table: independent or not, or incompatible.
function inTable(rng) {
  const pA = q(rng.int(2, 8), 10); const pB = q(rng.int(2, 8), 10);
  const mode = rng.pick(['indep', 'dep', 'disjoint']);
  let pAB = mode === 'indep' ? pA.mul(pB) : mode === 'disjoint' ? q(0) : pA.mul(pB).add(q(rng.pick([-1, 1]), 20));
  if (pAB.cmp(0) < 0 || pAB.cmp(pA) > 0 || pAB.cmp(pB) > 0 || (mode === 'disjoint' && pA.add(pB).cmp(1) > 0)) { pAB = pA.mul(pB); }
  const indep = pAB.eq(pA.mul(pB));
  return {
    ...both('Pr(A) = {pA}, Pr(B) = {pB} et Pr(A ∩ B) = {pAB}. A et B sont-ils indépendants ?', { pA: s(pA), pB: s(pB), pAB: s(pAB) }),
    parts: [{
      label: 'Pr(A)·Pr(B)', name: 'pr', kind: 'prob', expect: ft(pA.mul(pB)), action: t('Comparer Pr(A ∩ B) à Pr(A)·Pr(B)'),
      decisions: [{ prompt: t('Que faut-il comparer ?'), levels: [2, 3, 4, 5], options: [
        { id: 'prod', label: t('Pr(A ∩ B) et Pr(A)·Pr(B)'), valid: true },
        { id: 'disj', label: pAB.n === 0 ? t('Rien : incompatibles, donc indépendants') : t('Pr(A ∩ B) et 0 : indépendants veut dire incompatibles'), valid: false, rule: 'p_indep_disjoint', why: t('Incompatibles et indépendants, ce n\'est pas la même chose.') },
      ] }],
      lines: [{ math: `${ft(pA)}×${ft(pB)}`, note: t('Produit'), subgoal: 'marg', blank: [ft(pB)] }, { math: ft(pA.mul(pB)), note: indep ? t('= Pr(A ∩ B) : indépendants') : t('≠ {p} = Pr(A ∩ B) : pas indépendants', { p: s(pAB) }), subgoal: 'dec' }],
    }],
  };
}

function inSixes(rng) {
  const k = rng.int(2, 4);
  const v = q(1).sub(qpow(q(5, 6), k));
  return {
    ...both('On lance un dé {k} fois. Probabilité d\'obtenir au moins un 6 ?', { k }),
    parts: [{
      label: t('Pr(au moins un 6)'), name: 'v', kind: 'prob', expect: ft(v), action: t('Complément : 1 − Pr(aucun 6)'),
      wrongActions: [SYS_WRONG[0]],
      traps: { p_atleast_one_np: { values: [ft(q(k, 6)), ft(q(1).sub(qpow(q(1, 6), k)))], ctx: { n: k, p: '1/6', v: ft(q(k, 6)) } } },
      simulate: { model: 'dice', dice: k, faces: 6, stat: 'six', event: { op: 'ge', k: 1 }, answer: v.valueOf(), label: t('Au moins un 6') },
      lines: [{ math: `1-(5/6)^${k}`, note: t('Lancers indépendants : aucun 6, c\'est (5/6)ᵏ'), subgoal: 'sys', blank: [String(k)] }, { math: `1-${ft(qpow(q(5, 6), k))}`, note: t('Puissance') }, { math: ft(v), note: t('Calculer') }],
    }],
  };
}

function inItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') {
    const S = inSystem(rng, 3);
    const p0 = S.parts[0];
    return choice({ skill: IN, level: 4, key: `mcq:${S.storyFr}`, exam: examTag(opts), prompt: S.story, right: s(S.v), wrongs: Object.entries(p0.traps).flatMap(([rule, x]) => x.values.map((v) => ({ html: s(q(0).add(evalQ(v))), rule }))), fillers: [{ html: s(S.v.mul(S.v)) }, { html: s(q(1).sub(S.v).div(2)) }] }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.35)) return tf({ skill: IN, key: 'compl', exam: examTag(opts), statement: t('Si A et B sont indépendants, alors Aᶜ et B le sont aussi.'), truth: true, explanation: 'Pr(Aᶜ ∩ B) = Pr(B) − Pr(A)Pr(B) = Pr(Aᶜ)Pr(B).' });
    return tf({
      skill: IN, key: 'disj', exam: examTag(opts),
      statement: t('Deux événements incompatibles de probabilités non nulles sont indépendants.'),
      truth: false, ruleIfTrue: 'p_indep_disjoint',
      explanation: t('Pile et face au même lancer : Pr(A ∩ B) = 0 ≠ 1/4 = Pr(A)·Pr(B).'),
      counter: numCounter({ vars: [{ v: 'a', label: 'Pr(A) =' }, { v: 'b', label: 'Pr(B) =' }], hyp: '0<a≤1∧0<b≤1∧a+b≤1', pred: '0=a×b', answer: { a: '1/2', b: '1/2' } }),
    });
  }
  const kind = opts.exam === 'coef' ? 'system' : level === 5 ? 'dice+n' : level === 1 ? rng.pick(['table', 'system']) : rng.pick(['system', 'dice', 'table', 'sixes', 'system']);
  let S;
  if (kind === 'system') S = inSystem(rng, level);
  else if (kind === 'dice') S = inDice(rng);
  else if (kind === 'table') S = inTable(rng);
  else if (kind === 'sixes') S = inSixes(rng);
  else {
    const Dd = inDice(rng);
    const p = q(rng.pick([80, 90]), 100);
    let n = 1; while (1 - (1 - p.valueOf()) ** n < 0.999 - 1e-12) n++;
    Dd.parts.push({ label: 'n', name: 'n', kind: 'prob', expect: String(n), action: t('Plus petit n avec 1 − (1 − p)ⁿ ≥ 0,999'), wrongActions: SYS_WRONG, lines: [{ math: String(n), note: t('1 − {f}^{n} ≥ 0,999, et pas avec {m}', { f: ft(q(1).sub(p)), n, m: n - 1 }), subgoal: 'sys' }] });
    const then = both('Puis : des composants de fiabilité {p} sont montés en parallèle ; combien en faut-il au moins pour que le système marche avec probabilité au moins 0,999 ?', { p: ft(p) });
    S = { story: `${Dd.story} ${then.story}`, storyFr: `${Dd.storyFr} ${then.storyFr}`, parts: Dd.parts };
  }
  if (opts.exam === 'coef') return coefItem({ skill: IN, key: `coef:${S.storyFr}`, prompt: S.story, parts: S.parts, subgoals: IN_SUB, exam: examTag(opts) });
  return statItem({
    skill: IN, level, key: `${level}:${kind}:${S.storyFr.length}:${S.parts.map((p) => p.expect).join(',')}`, prompt: S.story, parts: S.parts, subgoals: IN_SUB, exam: examTag(opts), simulate: S.parts[0].simulate,
    hints: H(t('Indépendants : le produit. Incompatibles : l\'intersection vide. Série : tous marchent ; parallèle : au moins un.'), M(S.parts[0].lines[0].math.replace(/\d+$/, '□')), `${S.parts[S.parts.length - 1].label} = ${s(evalQ(S.parts[S.parts.length - 1].lines[S.parts[S.parts.length - 1].lines.length - 1].math))}`),
  });
}

// A text of the judges' lines as a Q (fractions and decimals only).
function evalQ(text) {
  const x = String(text).replace(',', '.');
  if (x.includes('/')) { const [a, b] = x.split('/'); return q(Number(a), Number(b)); }
  const d = (x.split('.')[1] || '').length;
  return q(Math.round(Number(x) * 10 ** d), 10 ** d);
}

export const GEN = { [EV]: evItem, [CT]: ctItem, [CD]: cdItem, [BF]: bfItem, [BY]: byItem, [IN]: inItem };

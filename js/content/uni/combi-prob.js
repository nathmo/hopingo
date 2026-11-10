// Generators of module G7, binomial theorem and first probabilities (step
// U7): g7-binomial, g7-laplace, g7-tree. Catalogue:
// docs/universite/G-gymnase-2.md, « G7 ». The power of x in the general
// term is an expression in k (`prob` with vars ['k']); k, coefficients and
// probabilities are exact values (`prob`); a full expansion is judged by
// `equiv` (target expanded), its traps in cfg.eqTraps.

import { statItem, choice, tf, numCounter, H, SM, examTag } from './proba-kit.js';
import { partsItem } from './geo-kit.js';
import { MT } from './kit.js';
import { Q } from '../../math/rational.js';
import { choose } from '../../cas/stats.js';

const pl = (n, w) => `${n} ${w}${n > 1 ? 's' : ''}`;
const big = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const fr = (q) => (q.d === 1 ? String(q.n) : `${q.n}/${q.d}`);
const frS = (q) => fr(q).replace('-', '−');
const paren = (x) => (x < 0 ? `(${x})` : String(x));
const KEYS = ['calc', 'stat', 'calcfn'];

// ======================================================================
// g7-binomial
// ======================================================================

const BI = 'g7-binomial';
const BI_SUB = [
  { id: 'term', label: 'terme général', skill: 'g5-sigma' },
  { id: 'coef', label: 'coefficient', skill: 'g7-combinations' },
  { id: 'k', label: 'équation en k', skill: BI },
  { id: 'ident', label: '(a + b)² et (a − b)²', skill: 'lit-identities' },
];

// (αx^p + β/x^q)ⁿ written for the screen and for the CAS.
function biData(rng, { indep = false, impossible = false } = {}) {
  for (let t = 0; t < 200; t++) {
    const n = rng.int(4, 10);
    const a = rng.pick([1, 1, 2, -1, 2, 3, -2]);
    const b = rng.pick([1, -1, 2, -2, 3, -1, 1]);
    const p = rng.pick([1, 1, 2]);
    const q = rng.pick([1, 1, 2]);
    // Power of x in the general term: p(n − k) − qk = pn − (p + q)k.
    const k = indep ? (p * n) / (p + q) : rng.int(0, n);
    if (!Number.isInteger(k) || k < 0 || k > n) continue;
    let m = p * n - (p + q) * k;
    if (impossible) {
      m += 1;
      if ((p * n - m) % (p + q) === 0) continue;
    }
    const coef = choose(n, k) * a ** (n - k) * b ** k;
    if (!impossible && Math.abs(coef) > 1e6) continue;
    const ax = `${a === 1 ? '' : a === -1 ? '-' : a}x${p > 1 ? `^${p}` : ''}`;
    const bx = `${b < 0 ? '-' : '+'}${Math.abs(b)}/x${q > 1 ? `^${q}` : ''}`;
    const base = `(${ax}${bx})^${n}`;
    return { n, a, b, p, q, k, m, coef: impossible ? 0 : coef, base, ax, bAbs: Math.abs(b), impossible };
  }
  return null;
}

function biItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return biMcq(rng, opts);
  if (opts.exam === 'tf') return biTf(rng, opts);
  if (level === 4 && rng.chance(0.3)) return expandItem(level, rng, opts);
  const indep = level === 5 || rng.chance(0.25);
  const impossible = level >= 3 && level <= 4 && !indep && rng.chance(0.25);
  const d = biData(rng, { indep, impossible }) ?? biData(rng, {});
  const { n, a, b, p, q, k, m } = d;
  const want = m === 0 ? 'le terme indépendant de x' : `le coefficient de ${MT(`x^${m}`)}`;
  const expo = `${p * n}-${p + q}k`;
  const fac = (base, e) => (base === 1 ? [] : [`${paren(base)}^${e}`]);
  const general = [`C(${n};k)`, ...fac(a, `(${n}-k)`), ...fac(b, 'k'), `x^(${expo})`].join('×');
  const bx = `${b}/x${q > 1 ? `^${q}` : ''}`;
  const pow = (c, t) => (c === 1 ? t : `${c}${t.startsWith('(') ? t : `(${t})`}`);
  const notes = level <= 2 ? [`Terme général : ${SM(`C(${n};k)`)} · (${MT(d.ax)})<sup>${n} − k</sup> · (${MT(bx)})<sup>k</sup> = ${SM(general)}`] : [];
  const parts = [{
    label: 'exposant de x', name: 'e', kind: 'prob', vars: ['k'], domain: { k: [0, n] }, expect: expo, notes,
    action: 'Écrire le terme général et la puissance de x',
    lines: [{ math: expo, note: `Puissance de x : ${pow(p, `(${n} − k)`)} − ${pow(q, 'k').replace(/\((k)\)/, '$1')}`, subgoal: 'term', blank: [String(p + q)], blank2: [expo] }],
  }];
  if (d.impossible) {
    parts.push({
      label: 'coefficient', kind: 'prob', expect: '0', title: `Coefficient de x^${m}`,
      action: 'Résoudre l\'équation en k', decisions: level <= 4 ? [{ prompt: `${p * n} − ${p + q}k = ${m} : k est-il un entier de 0 à ${n} ?`, options: [
        { id: 'no', label: `Non : k = ${frS(new Q(p * n - m, p + q))} n'est pas entier, il n'y a pas de terme en x^${m}`, valid: true },
        { id: 'yes', label: 'Oui, on arrondit k', valid: false, why: 'k compte des termes : il est entier, on ne l\'arrondit pas.' },
      ] }] : [],
      lines: [{ math: '0', note: 'Aucun terme', subgoal: 'k', blank: ['0'] }],
    });
  } else {
    const c = choose(n, k);
    const wrongSign = choose(n, k) * Math.abs(a ** (n - k)) * Math.abs(b ** k);
    const traps = {
      g7_binomial_coef_power: { values: [String(c * b ** k), String(c * a ** (n - k)), String(c)], ctx: { a: d.ax, e: n - k, a0: a } },
      g7_binomial_index: { values: [k + 1, k - 1].filter((j) => j >= 0 && j <= n).map((j) => String(choose(n, j) * a ** (n - j) * b ** j)), ctx: {} },
    };
    if (wrongSign !== d.coef) traps.g7_binomial_sign = { values: [String(wrongSign), String(-wrongSign)], ctx: { b: `${b}/x`, k } };
    else if (b < 0 || a < 0) traps.g7_binomial_sign = { values: [String(-d.coef)], ctx: { b: `${b}/x`, k } };
    parts.push({ label: 'k', name: 'k', kind: 'prob', expect: String(k), title: 'Équation en k',
      action: 'Résoudre l\'équation en k',
      lines: [{ math: String(k), note: `${expo.replace('-', ' − ')} = ${frS(new Q(m))}`, subgoal: 'k', blank: [String(k)] }] });
    parts.push({ label: 'coefficient', kind: 'prob', expect: String(d.coef), title: 'Coefficient', traps,
      action: 'Calculer le coefficient (signe compris)',
      wrongActions: [
        { label: `C(${n}, k) seulement`, rule: 'g7_binomial_coef_power', why: 'Les coefficients de x et de 1/x sont aussi élevés à leur puissance.' },
        ...(b < 0 || a < 0 ? [{ label: 'Ignorer le signe moins', rule: 'g7_binomial_sign', why: 'Le signe est dans (−1)ᵏ (ou (−1)ⁿ⁻ᵏ) : il compte.' }] : []),
      ],
      lines: [
        { math: [`C(${n};${k})`, ...fac(a, n - k), ...fac(b, k)].join('×'), note: 'Remplacer k dans le terme général', subgoal: 'coef', blank: [String(k), String(n - k)], blank2: [`${paren(a)}^${n - k}`, `${paren(b)}^${k}`] },
        { math: `${c}×${a ** (n - k) * b ** k}`, note: `C(${n}, ${k}) = ${c}`, blank: [String(c)] },
        { math: String(d.coef), note: 'Calculer', blank: [String(d.coef)] },
      ] });
  }
  return statItem({
    skill: BI, level, key: `${level}:${d.base}:${m}`,
    prompt: `Dans le développement de ${MT(d.base)}, trouve ${want}${level >= 3 ? ' (0 s\'il n\'y en a pas)' : ''}.`,
    parts,
    hints: H(`Écris le terme général avec (${MT(d.ax)}) et (${MT(bx)}) entiers, signe compris ; la puissance de x vaut ${pow(p, `(${n} − k)`)} − ${pow(q, 'k').replace(/\((k)\)/, '$1')}.`, `${p * n} − ${p + q}k = ${frS(new Q(m))}, donc k = □`, d.impossible ? '0 : k n\'est pas entier' : big(d.coef)),
    subgoals: BI_SUB, exam: examTag(opts),
  });
}

// Gabarit 3: the full expansion of (x + c)ⁿ, n ≤ 5 (judge equiv).
function expandItem(level, rng, opts) {
  const n = rng.int(3, 5);
  const c = rng.pick([1, 2, 3, -1, -2, -3]);
  const start = `(x${c < 0 ? '-' : '+'}${Math.abs(c)})^${n}`;
  const terms = (sgn) => Array.from({ length: n + 1 }, (_, k) => ({ k, coef: choose(n, k) * (sgn(c)) ** k }));
  const write = (ts) => ts.map(({ k, coef }, i) => {
    const pw = n - k;
    const mono = pw === 0 ? '' : pw === 1 ? 'x' : `x^${pw}`;
    const body = mono && Math.abs(coef) === 1 ? '' : String(Math.abs(coef));
    return `${coef < 0 ? '-' : i ? '+' : ''}${body}${mono}`;
  }).join('');
  const right = write(terms((x) => x));
  const sum = Array.from({ length: n + 1 }, (_, k) => `C(${n};${k})x^${n - k}×${paren(c)}^${k}`).join('+');
  const eqTraps = {};
  if (c < 0) eqTraps.g7_binomial_sign = [write(terms((x) => -x))];
  const judge = { kind: 'equiv', vars: ['x'], target: 'expanded', eqTraps };
  const item = partsItem({
    skill: BI, level, prompt: `Développe et réduis ${MT(start)}.`,
    parts: [{ start, judge, lines: [{ math: right, note: `Σ C(${n}, k)·x^(${n} − k)·(${c})^k`, subgoal: 'coef' }] }],
    hints: H(`(x + b)ⁿ = Σ C(n, k)·xⁿ⁻ᵏ·bᵏ avec b = ${c} : le signe de b est dans bᵏ.`, `Coefficients C(${n}, k) : ${Array.from({ length: n + 1 }, (_, k) => choose(n, k)).join(', ')}`, MT(right)),
    subgoals: BI_SUB, keys: KEYS, key: `${BI}:${level}:expand:${start}`, exam: examTag(opts),
  });
  void sum;
  return item;
}

function biMcq(rng, opts) {
  const d = biData(rng, {}) ;
  const { n, a, b, k, m } = d;
  const c = choose(n, k);
  const wrongs = [
    { html: big(c), rule: 'g7_binomial_coef_power' },
    { html: big(c * b ** k), rule: 'g7_binomial_coef_power' },
    ...(Math.abs(d.coef) !== d.coef || b < 0 || a < 0 ? [{ html: big(-d.coef), rule: 'g7_binomial_sign' }] : []),
    ...[k + 1, k - 1].filter((j) => j >= 0 && j <= n).map((j) => ({ html: big(choose(n, j) * a ** (n - j) * b ** j), rule: 'g7_binomial_index' })),
  ].map((w) => ({ ...w, html: w.html.replace('-', '−') }));
  return choice({ skill: BI, level: 4, prompt: `Dans le développement de ${MT(d.base)}, quel est ${m === 0 ? 'le terme indépendant de x' : `le coefficient de ${MT(`x^${m}`)}`} ?`,
    right: big(d.coef).replace('-', '−'), wrongs, fillers: [d.coef * 2, d.coef + 1].map((x) => ({ html: big(x).replace('-', '−') })), key: `mcq:${d.base}:${m}`, exam: examTag(opts) }, rng);
}

function biTf(rng, opts) {
  const n = rng.int(4, 8);
  const j = rng.int(2, n - 2);
  const truth = rng.chance(0.4);
  const claim = truth ? choose(n, j) : n;
  return tf({
    skill: BI, key: `${n}:${j}:${truth}`, exam: examTag(opts),
    statement: `Le coefficient de x<sup>${j}</sup> dans (1 + x)<sup>${n}</sup> est ${claim}.`, truth, ruleIfTrue: truth ? null : 'g7_binomial_coef_power',
    explanation: `Le coefficient de x^${j} est C(${n}, ${j}) = ${choose(n, j)}.`,
    counter: truth ? null : numCounter({ vars: [{ v: 'c', label: `Le vrai coefficient =`, dom: 'N' }], pred: `c=${claim}`, hyp: `c=${choose(n, j)}`, answer: { c: String(choose(n, j)) } }),
  });
}

// ======================================================================
// g7-laplace
// ======================================================================

const LA = 'g7-laplace';
const LA_SUB = [{ id: 'count', label: 'compter', skill: 'g7-combinations' }, { id: 'ratio', label: 'diviser, simplifier', skill: LA }, { id: 'model', label: 'même modèle en haut et en bas', skill: 'g7-which-count' }];

function laData(rng, kinds) {
  const kind = rng.pick(kinds);
  if (kind === 'dice') {
    const s = rng.int(3, 11);
    const fav = 6 - Math.abs(7 - s);
    const P = new Q(fav, 36);
    const pairs = [];
    for (let i = 1; i <= 6; i++) if (s - i >= 1 && s - i <= 6) pairs.push(`(${i} ; ${s - i})`);
    return {
      kind, P, story: `On lance deux dés équilibrés. Quelle est la probabilité que la somme vaille ${s} ?`,
      parts: [
        { label: '|Ω|', name: 'O', kind: 'prob', expect: '36', action: 'Compter les couples (dé 1, dé 2)', lines: [{ math: '6×6', note: 'Couples (dé 1 ; dé 2), tous équiprobables', subgoal: 'count', blank: ['6'] }, { math: '36', blank: ['36'] }] },
        { label: '|A|', name: 'A', kind: 'prob', expect: String(fav), action: 'Compter les couples favorables', lines: [{ math: String(fav), note: pairs.join(', '), subgoal: 'count', blank: [String(fav)] }] },
        { label: 'P(A)', kind: 'prob', expect: '$A/$O', action: 'Diviser et simplifier',
          traps: { g7_laplace_not_equiprobable: { values: ['1/11'], ctx: { what: 'Les 11 sommes de 2 à 12' } } },
          wrongActions: [{ label: '1/11 : une somme parmi les 11 possibles', rule: 'g7_laplace_not_equiprobable', why: 'Les sommes ne sont pas équiprobables : 7 s\'obtient de 6 façons, 2 d\'une seule.' }],
          lines: [{ math: `${fav}/36`, note: 'Favorables / possibles', subgoal: 'ratio', blank: ['36'] }, ...(P.d === 36 ? [] : [{ math: fr(P), note: 'Simplifier', blank: [fr(P)] }])] },
      ],
      simulate: { model: 'dice', dice: 2, faces: 6, stat: 'sum', event: { op: 'eq', k: s }, answer: P.valueOf(), label: `Somme ${s}` },
      hints: H('Les issues équiprobables sont les couples (dé 1 ; dé 2) : il y en a 36. Compte ceux qui donnent la somme.', SM(`□/36`), frS(P)),
    };
  }
  const cards = kind === 'cards';
  const R = cards ? 4 : rng.int(2, 7);
  const B = cards ? rng.pick([28, 32]) : rng.int(2, 7);
  const k = cards ? rng.int(2, 4) : rng.int(2, 3);
  const j = rng.int(cards ? 1 : 0, Math.min(cards ? k - 1 : k, R, cards ? 2 : 3));
  if (k - j > B) return laData(rng, ['urn']);
  const N = R + B;
  const fav = choose(R, j) * choose(B, k - j);
  const all = choose(N, k);
  const P = new Q(fav, all);
  const what = cards ? 'dames' : 'rouges';
  const story = cards
    ? `On tire ${k} cartes d'un jeu de ${N} cartes (4 dames). Quelle est la probabilité d'avoir exactement ${j} dame${j > 1 ? 's' : ''} ?`
    : `Une urne contient ${R} boules rouges et ${B} bleues. On tire ${k} boules à la fois. Quelle est la probabilité d'avoir exactement ${j} rouge${j > 1 ? 's' : ''} ?`;
  const orderWrong = new Q(fav, Number(arrangeSafe(N, k)));
  return {
    kind: cards ? 'cards' : 'urn', P, story,
    parts: [
      { label: '|Ω|', name: 'O', kind: 'prob', expect: String(all), action: 'Compter les cas possibles (sans ordre)', lines: [{ math: `C(${N};${k})`, note: 'Tirage simultané : sans ordre', subgoal: 'count', blank: [String(N)] }, { math: String(all), blank: [String(all)] }] },
      { label: '|A|', name: 'A', kind: 'prob', expect: String(fav), action: `Compter les cas favorables : les ${what}, puis les autres`,
        lines: [{ math: `C(${R};${j})×C(${B};${k - j})`, note: `${pl(j, what.slice(0, -1))} parmi ${R}, ${pl(k - j, 'autre')} parmi ${B}`, subgoal: 'count', blank: [String(j), String(k - j)], blank2: [`C(${B};${k - j})`] }, { math: String(fav), blank: [String(fav)] }] },
      { label: 'P(A)', kind: 'prob', expect: '$A/$O', action: 'Diviser et simplifier',
        traps: { g7_order_confusion: { values: [fr(orderWrong)], ctx: { k } } },
        wrongActions: [{ label: 'Diviser par les tirages ordonnés A(N, k)', rule: 'g7_order_confusion', why: 'On a compté les cas favorables sans ordre : il faut compter les cas possibles de la même façon.' }],
        lines: [{ math: `${fav}/${all}`, note: 'Favorables / possibles', subgoal: 'ratio', blank: [String(all)] }, ...(P.d === all ? [] : [{ math: fr(P), note: 'Simplifier', blank: [fr(P)] }])] },
    ],
    simulate: cards ? { model: 'urn', balls: { D: 4, A: B }, count: 'D', draw: k, replace: false, event: { op: 'eq', k: j }, answer: P.valueOf(), label: `Exactement ${j} dame(s)` }
      : { model: 'urn', balls: { R, B }, count: 'R', draw: k, replace: false, event: { op: 'eq', k: j }, answer: P.valueOf(), label: `Exactement ${j} rouge(s)` },
    hints: H('Compte sans ordre en haut et en bas : C(N, k) cas possibles.', SM(`C(${R};${j})×C(${B};${k - j})/C(□;${k})`), frS(P)),
  };
}
const arrangeSafe = (n, k) => { let a = 1; for (let i = 0; i < k; i++) a *= n - i; return a; };

function laAtLeast(rng) {
  const R = rng.int(2, 6);
  const B = rng.int(3, 7);
  const k = rng.int(2, 3);
  const N = R + B;
  const none = new Q(choose(B, k), choose(N, k));
  const P = new Q(1).sub(none);
  return {
    kind: 'atleast', P,
    story: `Une urne contient ${R} boules rouges et ${B} bleues. On tire ${k} boules à la fois. Quelle est la probabilité d'avoir au moins une rouge ?`,
    parts: [
      { label: 'P(Aᶜ)', name: 'Z', title: 'Aucune rouge', notes: ['A = « au moins une rouge » ; son contraire Aᶜ = « aucune rouge ».'], kind: 'prob', expect: fr(none), lines: [{ math: `C(${B};${k})/C(${N};${k})`, note: 'Seulement des bleues', subgoal: 'count' }, { math: fr(none), note: 'Simplifier', subgoal: 'ratio' }] },
      { label: 'P(A)', title: 'Au moins une rouge', kind: 'prob', expect: '1-$Z', traps: { g7_order_confusion: { values: [fr(new Q(1).sub(new Q(arrangeSafe(B, k), choose(N, k))))], ctx: { k } } },
        lines: [{ math: `1-${fr(none)}`, note: 'Complément' }, { math: fr(P), note: 'Résultat' }] },
    ],
    simulate: { model: 'urn', balls: { R, B }, count: 'R', draw: k, replace: false, event: { op: 'ge', k: 1 }, answer: P.valueOf(), label: 'Au moins une rouge' },
  };
}

function laItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return laMcq(rng, opts);
  const d = level === 5 ? laAtLeast(rng) : laData(rng, level === 1 ? ['urn', 'cards'] : ['urn', 'cards', 'dice']);
  if (level === 2 && d.kind !== 'dice') {
    d.parts[0].decisions = [{ prompt: 'Comment compter ?', options: [
      { id: 'no', label: 'Sans ordre, en haut et en bas', valid: true },
      { id: 'mix', label: 'Avec ordre pour les cas possibles, sans ordre pour les favorables', valid: false, rule: 'g7_order_confusion', why: 'On compte les deux de la même façon.' },
    ] }];
  }
  if (level === 2 && d.kind === 'dice') {
    d.parts[0].decisions = [{ prompt: 'Quelles issues sont équiprobables ?', options: [
      { id: 'pairs', label: 'Les 36 couples (dé 1 ; dé 2)', valid: true },
      { id: 'sums', label: 'Les 11 sommes de 2 à 12', valid: false, rule: 'g7_laplace_not_equiprobable', why: 'Les sommes ne sont pas équiprobables : 2 ne s\'obtient que par (1 ; 1).' },
    ] }];
  }
  return statItem({ skill: LA, level, key: `${level}:${d.story}`, prompt: d.story, parts: d.parts, hints: d.hints ?? [], subgoals: LA_SUB, exam: examTag(opts), simulate: d.simulate });
}

function laMcq(rng, opts) {
  const d = laData(rng, ['dice', 'urn', 'dice']);
  const traps = d.parts[2].traps;
  const wrongs = Object.entries(traps).flatMap(([rule, t]) => t.values.map((v) => ({ html: SM(v), rule })));
  const fillers = [new Q(d.P.n, d.P.d * 2), new Q(1).sub(d.P), new Q(d.P.n + 1, d.P.d + 1)].map((x) => ({ html: SM(fr(x)) }));
  return choice({ skill: LA, level: 4, prompt: d.story, right: SM(fr(d.P)), wrongs, fillers, key: `mcq:${d.story}`, exam: examTag(opts) }, rng);
}

// ======================================================================
// g7-tree
// ======================================================================

const TR = 'g7-tree';
const TR_SUB = [{ id: 'path', label: 'chemins', skill: TR }, { id: 'laplace', label: 'branches par équiprobabilité', skill: LA }];

function trData(rng, kinds) {
  let kind = rng.pick(kinds);
  if (kind === 'test') {
    const prev = rng.pick([5, 10, 20, 30]);
    const sens = rng.pick([80, 90, 95]);
    const fp = rng.pick([5, 10, 20]);
    const pm = new Q(prev, 100);
    const a = pm.mul(new Q(sens, 100));
    const b = new Q(1).sub(pm).mul(new Q(fp, 100));
    const P = a.add(b);
    const dec = (q) => q.toDecimal();
    return {
      kind, P, story: `${prev} % d'une population est malade. Un test est positif chez ${sens} % des malades et chez ${fp} % des personnes saines. Quelle est la probabilité qu'une personne prise au hasard ait un test positif ?`,
      parts: [
        { label: 'P(M∩+)', name: 'MP', kind: 'prob', expect: fr(a), action: 'Multiplier le long du chemin « malade, positif »', lines: [{ math: `${dec(pm)}×${dec(new Q(sens, 100))}`, note: 'Chemin malade → positif', subgoal: 'path', blank: [dec(new Q(sens, 100))] }, { math: dec(a), blank: [dec(a)] }] },
        { label: 'P(S∩+)', name: 'SP', kind: 'prob', expect: fr(b), action: 'Multiplier le long du chemin « sain, positif »', lines: [{ math: `${dec(new Q(1).sub(pm))}×${dec(new Q(fp, 100))}`, note: 'Chemin sain → positif', subgoal: 'path', blank: [dec(new Q(1).sub(pm))] }, { math: dec(b), blank: [dec(b)] }] },
        { label: 'P(+)', kind: 'prob', expect: '$MP+$SP', action: 'Additionner les chemins', lines: [{ math: `${dec(a)}+${dec(b)}`, note: 'Additionner les chemins', subgoal: 'path' }, { math: dec(P), note: 'Résultat', blank: [dec(P)] }] },
      ],
      simulate: { model: 'bayes', prev: prev / 100, sens: sens / 100, fpr: fp / 100, tests: 1, event: { positive: true }, answer: P.valueOf(), label: 'Test positif' },
      hints: H('Deux chemins mènent à « positif » : malade puis positif, sain puis positif.', SM(`${dec(pm)}×${dec(new Q(sens, 100))}+□`), dec(P)),
    };
  }
  const R = rng.int(2, 6);
  const B = rng.int(2, Math.min(6, 10 - R));
  const N = R + B;
  const repl = kind === 'with';
  const ev = rng.pick(kind === 'mcq' ? ['same', 'atleast'] : ['same', 'atleast', 'second']);
  if (kind === 'mcq') kind = 'without';
  const p2 = (x, y) => (repl ? new Q(y === 'R' ? R : B, N) : new Q((y === 'R' ? R : B) - (x === y ? 1 : 0), N - 1));
  const p1 = (x) => new Q(x === 'R' ? R : B, N);
  const path = (x, y) => p1(x).mul(p2(x, y));
  const wrongPath = (x, y) => p1(x).mul(p1(y));
  // Each branch as the urn shows it (4/8, not 1/2: one ball fewer).
  const p1t = (x) => `${x === 'R' ? R : B}/${N}`;
  const p2t = (x, y) => (repl ? p1t(y) : `${(y === 'R' ? R : B) - (x === y ? 1 : 0)}/${N - 1}`);
  const show = (x, y) => `${p1t(x)}×${p2t(x, y)}`;
  const paths = ev === 'same' ? [['R', 'R'], ['B', 'B']] : ev === 'second' ? [['R', 'R'], ['B', 'R']] : [['B', 'B']];
  const evText = { same: 'que les deux boules soient de la même couleur', atleast: "qu'au moins une boule soit rouge", second: 'que la 2e boule soit rouge' }[ev];
  const parts = paths.map(([x, y]) => ({
    label: `P(${x}${y})`, name: `${x}${y}`, kind: 'prob', expect: fr(path(x, y)), action: `Multiplier le long du chemin ${x}${y}`,
    traps: repl ? undefined : { g7_tree_with_replacement: { values: [fr(wrongPath(x, y))], ctx: { left: `${N - 1} boules`, second: `${fr(p2(x, y))} et non ${fr(p1(y))}` } } },
    wrongActions: repl ? [] : [{ label: 'Garder les mêmes probabilités au 2e tirage', rule: 'g7_tree_with_replacement', why: 'Sans remise, il reste une boule de moins au 2e tirage.' }],
    lines: [{ math: show(x, y), note: `Chemin ${x} puis ${y}${repl ? '' : ' (sans remise)'}`, subgoal: 'path', blank: [p2t(x, y)] }, ...(fr(path(x, y)) === show(x, y) ? [] : [{ math: fr(path(x, y)), note: 'Calculer', blank: [fr(path(x, y))] }])],
  }));
  const P = ev === 'atleast' ? new Q(1).sub(path('B', 'B')) : path(...paths[0]).add(path(...paths[1]));
  const sumT = ev === 'atleast' ? '1-$BB' : `$${paths[0].join('')}+$${paths[1].join('')}`;
  const sumLine = ev === 'atleast' ? `1-${fr(path('B', 'B'))}` : `${fr(path(...paths[0]))}+${fr(path(...paths[1]))}`;
  const wrongP = ev === 'atleast' ? new Q(1).sub(wrongPath('B', 'B')) : wrongPath(...paths[0]).add(wrongPath(...paths[1]));
  parts.push({ label: 'P', kind: 'prob', expect: sumT, title: ev === 'atleast' ? 'Complément' : 'Additionner les chemins',
    action: ev === 'atleast' ? 'Passer au complément' : 'Additionner les chemins',
    traps: repl || wrongP.eq(P) ? undefined : { g7_tree_with_replacement: { values: [fr(wrongP)], ctx: { left: `${N - 1} boules` } } },
    lines: [{ math: sumLine, note: ev === 'atleast' ? '« Au moins une rouge » = contraire de « BB »' : 'Additionner les chemins', subgoal: 'path' }, ...(fr(P) === sumLine ? [] : [{ math: fr(P), note: 'Résultat', blank: [fr(P)] }])] });
  return {
    kind, P, parts,
    story: `Une urne contient ${R} boules rouges et ${B} bleues. On tire deux boules, l'une après l'autre, ${repl ? 'avec' : 'sans'} remise. Quelle est la probabilité ${evText} ?`,
    simulate: ev === 'second' ? null : { model: 'urn', balls: { R, B }, count: 'R', draw: 2, replace: repl, event: ev === 'same' ? { op: 'ne', k: 1 } : { op: 'ge', k: 1 }, answer: P.valueOf(), label: ev === 'same' ? 'Même couleur' : 'Au moins une rouge' },
    hints: H('Multiplie le long d\'un chemin, additionne les chemins.', SM(`${fr(p1(paths[0][0]))}×□`), frS(P)),
  };
}

// Level 5: three draws without replacement, same colour.
function trThree(rng) {
  const R = rng.int(3, 6);
  const B = rng.int(3, 6);
  const N = R + B;
  const rrr = new Q(R * (R - 1) * (R - 2), N * (N - 1) * (N - 2));
  const bbb = new Q(B * (B - 1) * (B - 2), N * (N - 1) * (N - 2));
  const P = rrr.add(bbb);
  return {
    P, story: `Une urne contient ${R} boules rouges et ${B} bleues. On tire trois boules, l'une après l'autre, sans remise. Quelle est la probabilité qu'elles soient toutes de la même couleur ?`,
    parts: [
      { label: 'P(RRR)', name: 'R3', kind: 'prob', expect: fr(rrr), traps: { g7_tree_with_replacement: { values: [fr(new Q(R ** 3, N ** 3))], ctx: { left: 'une boule de moins à chaque tirage' } } },
        lines: [{ math: `${R}/${N}×${R - 1}/${N - 1}×${R - 2}/${N - 2}`, note: 'Chemin RRR', subgoal: 'path' }, { math: fr(rrr), note: 'Calculer' }] },
      { label: 'P(BBB)', name: 'B3', kind: 'prob', expect: fr(bbb), lines: [{ math: `${B}/${N}×${B - 1}/${N - 1}×${B - 2}/${N - 2}`, note: 'Chemin BBB', subgoal: 'path' }, { math: fr(bbb), note: 'Calculer' }] },
      { label: 'P', kind: 'prob', expect: '$R3+$B3', lines: [{ math: `${fr(rrr)}+${fr(bbb)}`, note: 'Additionner les chemins', subgoal: 'path' }, { math: fr(P), note: 'Résultat' }] },
    ],
  };
}

function trItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return trMcq(rng, opts);
  const d = level === 5 ? trThree(rng) : trData(rng, level === 1 ? ['without', 'with'] : ['without', 'without', 'with', 'test']);
  if (level === 2 && d.kind === 'without') {
    d.parts[0].decisions = [{ prompt: 'Au 2e tirage, les probabilités…', options: [
      { id: 'change', label: 'changent : il reste une boule de moins', valid: true },
      { id: 'same', label: 'restent celles du 1er tirage', valid: false, rule: 'g7_tree_with_replacement', why: 'Sans remise, l\'urne a changé après le 1er tirage.' },
    ] }];
  }
  return statItem({ skill: TR, level, key: `${level}:${d.story}`, prompt: d.story, parts: d.parts, hints: d.hints ?? [], subgoals: TR_SUB, exam: examTag(opts), simulate: d.simulate ?? undefined });
}

function trMcq(rng, opts) {
  const d = trData(rng, ['mcq']);
  const last = d.parts[d.parts.length - 1];
  const wrongs = [];
  for (const p of d.parts) for (const [rule, t] of Object.entries(p.traps || {})) if (p === last) wrongs.push(...t.values.map((v) => ({ html: SM(v), rule })));
  if (!wrongs.length) wrongs.push({ html: SM(fr(new Q(1).sub(d.P))), rule: null });
  const fillers = [new Q(1).sub(d.P), new Q(d.P.n, d.P.d + 1), d.P.mul(new Q(1, 2))].map((x) => ({ html: SM(fr(x)) }));
  return choice({ skill: TR, level: 4, prompt: d.story, right: SM(fr(d.P)), wrongs, fillers, key: `mcq:${d.story}`, exam: examTag(opts) }, rng);
}

export const GEN = { [BI]: biItem, [LA]: laItem, [TR]: trItem };

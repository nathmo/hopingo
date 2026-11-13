// Generators of module P, part a (step U7): descriptive statistics,
// p-desc-summary and p-desc-boxplot. Catalogue: docs/universite/P-probabilites.md.
// Data are built backwards (convention 10): a whole mean, whole deviations
// of sum 0, Σd² divisible by n − 1 at levels 1 to 3.

import { statItem, coefItem, choice, tf, numCounter, H, examTag } from './proba-kit.js';
import { q, t as ft, s, M, list, sum } from './proba-a-kit.js';
import { t } from '../../i18n.js';

// ======================================================================
// p-desc-summary
// ======================================================================

const DS = 'p-desc-summary';
const DS_SUB = [
  { id: 'sort', label: t('ordonner'), skill: DS },
  { id: 'mean', label: t('moyenne'), skill: DS },
  { id: 'median', label: t('médiane'), skill: DS },
  { id: 'dev', label: t('écarts au carré'), skill: DS },
  { id: 'var', label: 's²', skill: DS },
  { id: 'root', label: t('racine et arrondi'), skill: 'cm-round' },
];
const STORIES = ['temps de trajet (en minutes)', 'notes d\'un test (sur 60)', 'âges des joueurs d\'un club', 'nombres de pas (en centaines) par jour', 'températures relevées (en °C)'];

// A data set: n odd, x̄ whole, s² whole (exact) or a finite decimal.
function dsData(rng, level) {
  for (let k = 0; k < 400; k++) {
    const n = rng.pick([5, 7, 9, 11]);
    const m = rng.int(6, 60);
    const d = Array.from({ length: n - 1 }, () => rng.int(-8, 8));
    d.push(-sum(d));
    if (Math.abs(d[n - 1]) > 12) continue;
    const SS = sum(d.map((x) => x * x));
    if (SS === 0) continue;
    const s2 = q(SS, n - 1);
    if (level <= 3 ? !s2.isInt() : !s2.toDecimal() || s2.toDecimal().length > 5) continue;
    const data = d.map((x) => m + x);
    if (Math.min(...data) < 0) continue;
    const sorted = [...data].sort((a, b) => a - b);
    const med = sorted[(n - 1) / 2];
    if (med === m) continue;
    const raw = rng.shuffle(data);
    const rawMed = raw[(n - 1) / 2];
    if (level >= 2 && rawMed === med) continue;
    return { n, m, d, SS, s2, data: raw, sorted, med, rawMed, sd: Math.sqrt(s2.valueOf()) };
  }
  // Fallback: the catalogue's example.
  const data = [7, 2, 11, 4, 9, 4, 5];
  return { n: 7, m: 6, SS: 60, s2: q(10), data, sorted: [2, 4, 4, 5, 7, 9, 11], med: 5, rawMed: 4, sd: Math.sqrt(10), fallback: true };
}

function dsParts(D, level, sortedGiven) {
  const shown = sortedGiven ? D.sorted : D.data;
  const n = D.n;
  const k = (n + 1) / 2;
  const sq = D.sorted.map((x) => (x - D.m) ** 2);
  const s2t = ft(D.s2);
  const sdT = D.sd.toFixed(2).replace('.', ',');
  const perfect = Number.isInteger(D.sd);
  return [
    {
      label: 'x̄', name: 'xbar', kind: 'prob', expect: `(${shown.join('+')})/${n}`, action: t('Calculer la moyenne x̄ = Σxᵢ/n'),
      lines: [
        { math: `${n * D.m}/${n}`, note: t('Somme des données : {data} = {sum}, divisée par n = {n}', { data: shown.join(' + '), sum: n * D.m, n }), subgoal: 'mean', blank: [String(n * D.m)] },
        { math: String(D.m), note: t('Diviser'), blank: [String(D.m)] },
      ],
    },
    {
      label: t('méd'), name: 'med', kind: 'prob', expect: String(D.med), action: t('Trier, puis prendre la donnée n° ⌈n/2⌉ = {k}', { k }),
      wrongActions: [{ label: t('Prendre la {k}ᵉ valeur de la liste telle qu\'elle est donnée', { k }), rule: 'p_median_unsorted', why: t('La médiane se lit sur les données triées.') }],
      decisions: sortedGiven ? [] : [{ prompt: t('Pour la médiane, que fais-tu d\'abord ?'), levels: [2, 3], options: [
        { id: 'sort', label: t('Trier les données'), valid: true },
        { id: 'raw', label: t('Prendre la {k}ᵉ valeur de la liste donnée', { k }), valid: false, rule: 'p_median_unsorted', why: t('La liste n\'est pas triée : sa valeur du milieu n\'a rien de spécial.') },
      ] }],
      traps: {
        ...(D.rawMed !== D.med && !sortedGiven ? { p_median_unsorted: { values: [String(D.rawMed)], ctx: { k } } } : {}),
        p_median_mean: { values: [String(D.m)], ctx: { 'x̄': D.m } },
      },
      lines: [{ math: String(D.med), note: t('Données triées : {data} ; la {k}ᵉ', { data: list(D.sorted), k }), subgoal: sortedGiven ? 'median' : 'median', blank: [String(D.med)] }],
    },
    {
      label: 'Σ(xᵢ−x̄)²', name: 'ss', kind: 'prob', expect: D.sorted.map((x) => `(${x}-$xbar)^2`).join('+'), action: t('Additionner les écarts au carré'),
      lines: [
        { math: sq.join('+'), note: t('Chaque écart (xᵢ − x̄), au carré'), subgoal: 'dev', blank: [String(sq[0]), String(sq[sq.length - 1])], blank2: [sq.join('+')] },
        { math: String(D.SS), note: t('Additionner'), blank: [String(D.SS)] },
      ],
    },
    {
      label: 's²', name: 's2', kind: 'prob', expect: `$ss/${n - 1}`, action: t('Diviser par n − 1'),
      wrongActions: [{ label: t('Diviser par n = {n}', { n }), rule: 'p_sd_n', why: t('La variance empirique du cours divise par n − 1.') }],
      traps: { p_sd_n: { values: [`${D.SS}/${n}`], ctx: { SS: D.SS, n, 'n−1': n - 1 } } },
      lines: q(D.SS, n - 1).d === n - 1
        ? [{ math: `${D.SS}/${n - 1}`, note: t('Diviser par n − 1 (fraction irréductible)'), subgoal: 'var', blank: [String(n - 1)] }]
        : [
          { math: `${D.SS}/${n - 1}`, note: t('Diviser par n − 1'), subgoal: 'var', blank: [String(n - 1)] },
          { math: s2t, note: t('Simplifier'), blank: [s2t] },
        ],
    },
    {
      label: 's', name: 's', kind: 'stat', decimals: 2, expect: '√($s2)', action: t('Prendre la racine de s²'),
      traps: { p_sd_n: { values: [String(Math.sqrt(D.SS / n))], ctx: { SS: D.SS, n, 'n−1': n - 1 } } },
      lines: [
        { math: `√(${s2t})`, note: t('Écart-type : racine de la variance'), subgoal: 'root', blank: [s2t] },
        ...(perfect ? [{ math: String(D.sd), note: t('Racine exacte'), blank: [String(D.sd)] }] : [{ math: sdT, note: t('Arrondir au centième'), subgoal: 'root', blank: [sdT] }]),
      ],
    },
  ];
}

// y = a·x + b: x̄, méd, s given; ȳ, méd(y), s_y.
function dsLinear(rng) {
  const g = rng.pick([
    { a: q(254, 100), b: q(0), what: 'longueurs', ax: 'y = 2,54x' },
    { a: q(18, 10), b: q(32), what: 'temperatures', ax: 'y = 1,8x + 32' },
    { a: q(-1), b: q(100), what: 'scores', ax: 'y = 100 − x' },
    { a: q(2), b: q(5), what: 'notes', ax: 'y = 2x + 5' },
  ]);
  const m = q(rng.int(8, 40));
  const med = m.add(rng.pick([-2, -1, 1, 2, 3]));
  const sd = q(rng.int(2, 9));
  const ab = g.a.n < 0 ? g.a.neg() : g.a;
  return { ...g, m, med, sd, ym: g.a.mul(m).add(g.b), ymed: g.a.mul(med).add(g.b), ysd: ab.mul(sd) };
}

// The prompts of dsLinearItem, one per conversion.
const LIN_PROMPT = {
  longueurs: 'Une série de longueurs en pouces a pour moyenne x̄ = {m}, médiane {med} et écart-type s = {sd}. On convertit chaque donnée en centimètres (1 pouce = 2,54 cm). Sans refaire le calcul, donne ȳ, la médiane et l\'écart-type des nouvelles données.',
  temperatures: 'Une série de températures en °C a pour moyenne x̄ = {m}, médiane {med} et écart-type s = {sd}. On convertit chaque donnée en °F (y = 1,8x + 32). Sans refaire le calcul, donne ȳ, la médiane et l\'écart-type des nouvelles données.',
  scores: 'Une série de scores sur 100 a pour moyenne x̄ = {m}, médiane {med} et écart-type s = {sd}. On convertit chaque donnée en points perdus (y = 100 − x). Sans refaire le calcul, donne ȳ, la médiane et l\'écart-type des nouvelles données.',
  notes: 'Une série de notes a pour moyenne x̄ = {m}, médiane {med} et écart-type s = {sd}. On convertit chaque donnée après la règle y = 2x + 5. Sans refaire le calcul, donne ȳ, la médiane et l\'écart-type des nouvelles données.',
};

function dsLinearItem(level, rng, opts) {
  const L = dsLinear(rng);
  const parts = [
    { label: 'ȳ', name: 'ym', kind: 'prob', expect: ft(L.ym), action: 'ȳ = a·x̄ + b', lines: [{ math: `${ft(L.a)}×${ft(L.m)}+${ft(L.b)}`.replace('+-', '-'), note: 'ȳ = a·x̄ + b', subgoal: 'mean' }, { math: ft(L.ym), note: t('Calculer') }] },
    { label: t('méd(y)'), name: 'ymed', kind: 'prob', expect: ft(L.ymed), action: t('méd(y) = a·méd(x) + b'), lines: [{ math: ft(L.ymed), note: t('La médiane suit la même règle'), subgoal: 'median' }] },
    {
      label: 's_y', name: 'ysd', kind: 'prob', expect: ft(L.ysd), action: t('s_y = |a|·s_x : b ne change pas l\'écart'),
      wrongActions: [{ label: 's_y = a·s_x + b', rule: 'p_lin_transform_sd', why: t('Ajouter b déplace les données sans les écarter.') }],
      traps: { p_lin_transform_sd: { values: [ft(L.a.mul(L.sd).add(L.b)), ft(L.sd.add(L.b)), ft(L.a.mul(L.a).mul(L.sd))].filter((v) => v !== ft(L.ysd)), ctx: { a: ft(L.a.n < 0 ? L.a.neg() : L.a), b: ft(L.b) } } },
      lines: [{ math: `${ft(L.a.n < 0 ? L.a.neg() : L.a)}×${ft(L.sd)}`, note: '|a|·s_x', subgoal: 'var' }, { math: ft(L.ysd), note: t('Calculer') }],
    },
  ];
  return statItem({
    skill: DS, level, key: `lin:${L.ax}:${ft(L.m)}:${ft(L.sd)}`,
    prompt: t(LIN_PROMPT[L.what], { m: s(L.m), med: s(L.med), sd: s(L.sd) }),
    parts, subgoals: DS_SUB, exam: examTag(opts),
    hints: H(t('Chaque donnée devient a·x + b : la moyenne et la médiane suivent la même règle ; l\'écart-type est seulement multiplié par |a|.'), `s_y = ${s(L.a.n < 0 ? L.a.neg() : L.a)} · □`, t('ȳ = {ym} ; méd = {ymed} ; s_y = {ysd}', { ym: s(L.ym), ymed: s(L.ymed), ysd: s(L.ysd) })),
  });
}

function dsItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return dsMcq(rng, opts);
  if (opts.exam === 'tf') return dsTf(rng, opts);
  if ((level === 5 && rng.chance(0.4)) || (level === 4 && rng.chance(0.25))) return dsLinearItem(level, rng, opts);
  const D = dsData(rng, level);
  const sortedGiven = level === 1;
  const parts = dsParts(D, level, sortedGiven);
  if (opts.exam === 'coef') {
    const which = rng.chance(0.5) ? 's' : 'med';
    return coefItem({ skill: DS, key: `coef:${which}:${D.data.join(',')}`, prompt: which === 's' ? t('Données : {data}. Donne l\'écart-type empirique s (diviseur n − 1), à 0,01 près.', { data: list(D.data) }) : t('Données : {data}. Donne la médiane.', { data: list(D.data) }), parts, part: parts.find((p) => p.name === which), subgoals: DS_SUB, exam: examTag(opts), fallback: D.fallback });
  }
  const story = rng.pick(STORIES);
  return statItem({
    skill: DS, level, key: `${level}:${D.data.join(',')}`, fallback: D.fallback,
    prompt: t(`Voici des ${story}${sortedGiven ? ', déjà triés' : ''} : {data}. Calcule la moyenne, la médiane, la variance empirique s² et l'écart-type s (à 0,01 près).`, { data: list(sortedGiven ? D.sorted : D.data) }),
    parts, subgoals: DS_SUB,
    hints: H(t('Trie d\'abord. Pour s², somme des écarts au carré, divisée par n − 1.'), `${M(`s²=${D.SS}/□`)}`, t('x̄ = {m} ; méd = {med} ; s² = {s2} ; s ≈ {sd}', { m: D.m, med: D.med, s2: s(D.s2), sd: D.sd.toFixed(2).replace('.', ',') })),
    exam: examTag(opts),
  });
}

function dsMcq(rng, opts) {
  const D = dsData(rng, 4);
  if (rng.chance(0.5)) {
    return choice({
      skill: DS, level: 4, key: `mcq:s2:${D.data.join(',')}`, exam: examTag(opts),
      prompt: t('Données : {data}. Quelle est la variance empirique s² ?', { data: list(D.data) }),
      right: s(D.s2), wrongs: [{ html: s(q(D.SS, D.n)), rule: 'p_sd_n' }], fillers: [{ html: String(D.SS) }, { html: s(q(D.SS, D.n - 2)) }, { html: s(D.s2.add(1)) }],
    }, rng);
  }
  return choice({
    skill: DS, level: 4, key: `mcq:med:${D.data.join(',')}`, exam: examTag(opts),
    prompt: t('Données : {data}. Quelle est la médiane ?', { data: list(D.data) }),
    right: String(D.med), wrongs: [{ html: String(D.rawMed), rule: 'p_median_unsorted' }, { html: String(D.m), rule: 'p_median_mean' }],
    fillers: [{ html: String(D.sorted[(D.n + 1) / 2]) }, { html: String(D.sorted[(D.n - 3) / 2]) }, { html: String(D.med + 1) }],
  }, rng);
}

function dsTf(rng, opts) {
  if (rng.chance(0.5)) {
    const c = rng.pick([5, 10, 20]);
    return tf({
      skill: DS, key: `shift${c}`, exam: examTag(opts),
      statement: t('Si on ajoute {c} à toutes les données d\'une série, l\'écart-type s augmente de {c}.', { c }),
      truth: false, ruleIfTrue: 'p_lin_transform_sd',
      explanation: t('Ajouter {c} déplace toutes les données sans les écarter : s ne change pas (1, 2, 3 et {c1}, {c2}, {c3} ont toutes deux s = 1).', { c, c1: 1 + c, c2: 2 + c, c3: 3 + c }),
      counter: numCounter({ vars: [{ v: 'a', label: t('1re donnée a =') }, { v: 'b', label: t('2e donnée b =') }], pred: `√((a-b)^2/2)=√((a-b)^2/2)+${c}`, answer: { a: '1', b: '2' } }),
    });
  }
  return tf({
    skill: DS, key: 'robust', exam: examTag(opts),
    statement: t('La médiane est moins sensible aux valeurs aberrantes que la moyenne.'),
    truth: true, ruleIfFalse: 'p_median_mean',
    explanation: t('Remplacer la plus grande donnée par une valeur énorme change la moyenne, mais pas la valeur du milieu.'),
  });
}

// ======================================================================
// p-desc-boxplot
// ======================================================================

const BX = 'p-desc-boxplot';
const BX_SUB = [
  { id: 'median', label: t('médiane'), skill: DS },
  { id: 'quart', label: t('quartiles'), skill: BX },
  { id: 'fence', label: t('seuils'), skill: BX },
  { id: 'whisk', label: t('moustaches'), skill: BX },
];
const ceil = Math.ceil;

function bxData(rng) {
  for (let k = 0; k < 300; k++) {
    const n = rng.pick([7, 9, 10, 11, 13, 14, 15]);
    const outlier = rng.pick(['high', 'high', 'low', 'none']);
    const xs = [rng.int(2, 25)];
    for (let i = 1; i < n; i++) xs.push(xs[i - 1] + rng.int(1, 6));
    // Even n: the two middle data are equal (both medians agree).
    if (n % 2 === 0) { const d = xs[n / 2] - xs[n / 2 - 1]; for (let i = n / 2; i < n; i++) xs[i] -= d; }
    const at = (p) => xs[p - 1];
    const k1 = ceil(n * 0.25); const k2 = ceil(n / 2); const k3 = ceil(n * 0.75);
    const q1 = at(k1); const q3 = at(k3);
    const eiq = q3 - q1;
    const c = q(3 * eiq, 2);
    const lo = q(q1).sub(c); const hi = q(q3).add(c);
    if (outlier === 'high') xs[n - 1] = Math.ceil(hi.valueOf()) + rng.int(1, 12);
    if (outlier === 'low') { const v = Math.floor(lo.valueOf()) - rng.int(1, 6); if (v < 0) continue; xs[0] = v; }
    if (xs[n - 1] > 100) continue;
    // Quartiles unchanged by the outlier (it is an extreme datum).
    if (at(k1) !== q1 || at(k3) !== q3) continue;
    const inside = xs.filter((x) => q(x).cmp(lo) >= 0 && q(x).cmp(hi) <= 0);
    const wl = Math.min(...inside); const wh = Math.max(...inside);
    const outs = xs.filter((x) => !inside.includes(x));
    if (q(wl).eq(lo) || q(wh).eq(hi)) continue;
    return { n, xs, k1, k2, k3, q1, med: at(k2), q3, eiq, c, lo, hi, wl, wh, outs, avg1: q(at(k1) + at(k1 + 1), 2), avg3: q(at(k3) + at(k3 + 1), 2), fl1: at(k1 - 1), fl3: at(k3 - 1) };
  }
  const xs = [3, 5, 6, 8, 8, 9, 10, 12, 13, 15, 31];
  return { n: 11, xs, k1: 3, k2: 6, k3: 9, q1: 6, med: 9, q3: 13, eiq: 7, c: q(21, 2), lo: q(-9, 2), hi: q(47, 2), wl: 3, wh: 15, outs: [31], avg1: q(7), avg3: q(14), fl1: 5, fl3: 12, fallback: true };
}

function bxParts(B, level) {
  const iv = (a, b) => `[${ft(a)};${ft(b)}]`;
  return [
    {
      label: 'q̂(0,25)', name: 'qa', kind: 'prob', expect: String(B.q1), action: t('Position ⌈n·0,25⌉ = {k}, puis la donnée à cette place', { k: B.k1 }),
      notes: level === 1 ? [t('Positions : ⌈{n} · 0,25⌉ = {k1}, ⌈{n}/2⌉ = {k2}, ⌈{n} · 0,75⌉ = {k3}.', { n: B.n, k1: B.k1, k2: B.k2, k3: B.k3 })] : [],
      wrongActions: [{ label: t('La moyenne des deux données autour de n·0,25'), rule: 'p_quartile_convention', why: t('Le cours prend q̂(α) = x₍⌈nα⌉₎, une donnée.') }],
      traps: { p_quartile_convention: { values: [ft(B.avg1), String(B.fl1)], ctx: { n: B.n, 'α': '0,25', k: B.k1, v: B.q1 } } },
      lines: [{ math: String(B.q1), note: t('⌈{n} · 0,25⌉ = {k} : la {k}ᵉ donnée', { n: B.n, k: B.k1 }), subgoal: 'quart', blank: [String(B.q1)] }],
    },
    {
      label: t('méd'), name: 'med', kind: 'prob', expect: String(B.med), action: t('Position ⌈n/2⌉ = {k}', { k: B.k2 }),
      lines: [{ math: String(B.med), note: t('⌈{n}/2⌉ = {k} : la {k}ᵉ donnée', { n: B.n, k: B.k2 }), subgoal: 'median', blank: [String(B.med)] }],
    },
    {
      label: 'q̂(0,75)', name: 'qc', kind: 'prob', expect: String(B.q3), action: t('Position ⌈n·0,75⌉ = {k}', { k: B.k3 }),
      traps: { p_quartile_convention: { values: [ft(B.avg3), String(B.fl3)], ctx: { n: B.n, 'α': '0,75', k: B.k3, v: B.q3 } } },
      lines: [{ math: String(B.q3), note: t('⌈{n} · 0,75⌉ = {k} : la {k}ᵉ donnée', { n: B.n, k: B.k3 }), subgoal: 'quart', blank: [String(B.q3)] }],
    },
    {
      label: t('EIQ'), name: 'eiq', kind: 'prob', expect: '$qc-$qa', action: t('EIQ = q̂(0,75) − q̂(0,25)'),
      wrongActions: [{ label: t('EIQ = max − min'), rule: 'p_boxplot_range', why: t('max − min est l\'étendue ; l\'EIQ ne prend que la boîte.') }],
      traps: { p_boxplot_range: { values: [String(B.xs[B.n - 1] - B.xs[0])], ctx: { q3: B.q3, q1: B.q1 } } },
      lines: [{ math: `${B.q3}-${B.q1}`, note: t('Écart entre les quartiles'), subgoal: 'quart', blank: [String(B.q1)] }, { math: String(B.eiq), note: t('Calculer'), blank: [String(B.eiq)] }],
    },
    {
      label: t('seuils'), name: 'fence', kind: 'prob', expect: ['$qa-1,5×$eiq', '$qc+1,5×$eiq'], action: t('Seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ'),
      lines: [{ math: iv(B.lo, B.hi), note: `C = 1,5 · ${B.eiq} = ${s(B.c)} ; [${B.q1} − C ; ${B.q3} + C]`, subgoal: 'fence', blank: [ft(B.lo), ft(B.hi)], blank2: [ft(B.hi)] }],
    },
    {
      label: t('moustaches'), name: 'wh', kind: 'prob', expect: [String(B.wl), String(B.wh)], action: t('Les données les plus extrêmes entre les seuils'),
      decisions: [{ prompt: t('Y a-t-il des valeurs aberrantes ?'), levels: [2, 3, 4], options: [
        { id: 'r', label: B.outs.length ? t('Oui : {outs}, hors des seuils', { outs: list(B.outs) }) : t('Non : toutes les données sont entre les seuils'), valid: true },
        { id: 'w', label: B.outs.length ? t('Non : toutes les données sont entre les seuils') : t('Oui : {v}, la plus grande donnée', { v: B.xs[B.n - 1] }), valid: false, why: t('Les seuils sont {lo} et {hi} : compare chaque donnée extrême.', { lo: s(B.lo), hi: s(B.hi) }) },
      ] }],
      wrongActions: [{ label: t('Arrêter les moustaches aux seuils'), rule: 'p_whisker_threshold', why: t('Une moustache s\'arrête sur une donnée.') }],
      traps: { p_whisker_threshold: { values: [iv(B.lo, B.hi)], ctx: { seuil: s(B.hi), v: B.wh } } },
      lines: [{ math: `[${B.wl};${B.wh}]`, note: B.outs.length ? (B.outs.length > 1 ? t('Aberrantes : {outs}', { outs: list(B.outs) }) : t('Aberrante : {outs}', { outs: list(B.outs) })) : t('Aucune valeur aberrante'), subgoal: 'whisk', blank: [String(B.wl), String(B.wh)], blank2: [String(B.wh)] }],
    },
  ];
}

function bxItem(level, rng, profile, opts = {}) {
  const B = bxData(rng);
  if (opts.exam === 'mcq') return bxMcq(B, rng, opts);
  if (opts.exam === 'tf') return bxTf(B, rng, opts);
  const sorted = level <= 2 || rng.chance(0.4);
  const shown = sorted ? B.xs : rng.shuffle(B.xs);
  const parts = bxParts(B, level);
  if (!sorted) parts[1].traps = { p_median_unsorted: { values: [String(shown[B.k2 - 1])].filter((v) => v !== String(B.med)), ctx: { k: B.k2 } } };
  return statItem({
    skill: BX, level, key: `${level}:${shown.join(',')}`, fallback: B.fallback,
    prompt: t(sorted ? 'Données (n = {n}), triées : {data}. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l\'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.' : 'Données (n = {n}) : {data}. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l\'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.', { n: B.n, data: list(shown) }),
    parts, subgoals: BX_SUB, exam: examTag(opts),
    hints: H(t('Position ⌈n·α⌉, puis la donnée à cette place. La moustache s\'arrête sur une donnée.'), `q̂(0,75) = x₍⌈${B.n} · 0,75⌉₎ = x₍□₎`, B.outs.length ? t('moustaches [{wl} ; {wh}] ; aberrantes : {outs}', { wl: B.wl, wh: B.wh, outs: list(B.outs) }) : t('moustaches [{wl} ; {wh}]', { wl: B.wl, wh: B.wh })),
  });
}

function bxMcq(B, rng, opts) {
  const iv = (a, b) => `[${s(a)} ; ${s(b)}]`;
  if (rng.chance(0.5)) {
    return choice({
      skill: BX, level: 4, key: `mcq:w:${B.xs.join(',')}`, exam: examTag(opts),
      prompt: t('Données triées : {data}. Où vont les moustaches de la boîte (convention q̂(α) = x₍⌈nα⌉₎, seuils à 1,5·EIQ) ?', { data: list(B.xs) }),
      right: iv(B.wl, B.wh), wrongs: [{ html: iv(B.lo, B.hi), rule: 'p_whisker_threshold' }, { html: iv(B.xs[0], B.xs[B.n - 1]) }],
      fillers: [{ html: iv(B.q1, B.q3) }, { html: iv(B.wl, B.q3) }],
    }, rng);
  }
  return choice({
    skill: BX, level: 4, key: `mcq:q:${B.xs.join(',')}`, exam: examTag(opts),
    prompt: t('Données triées : {data}. Que vaut l\'écart interquartile (q̂(α) = x₍⌈nα⌉₎) ?', { data: list(B.xs) }),
    right: String(B.eiq), wrongs: [{ html: String(B.xs[B.n - 1] - B.xs[0]), rule: 'p_boxplot_range' }, { html: s(B.avg3.sub(B.avg1)), rule: 'p_quartile_convention' }],
    fillers: [{ html: String(B.eiq + 2) }, { html: String(B.q3) }, { html: String(B.med - B.q1) }],
  }, rng);
}

function bxTf(B, rng, opts) {
  if (rng.chance(0.4)) {
    return tf({ skill: BX, key: 'half', exam: examTag(opts), statement: t('La boîte d\'une boîte à moustaches contient environ la moitié des données.'), truth: true, explanation: t('Elle va du premier au troisième quartile : environ 50 % des données.') });
  }
  return tf({
    skill: BX, key: `w:${B.xs.join(',')}`, exam: examTag(opts),
    statement: t('Pour les données {data}, la moustache supérieure va jusqu\'à q̂(0,75) + 1,5·EIQ = {hi}.', { data: list(B.xs), hi: s(B.hi) }),
    truth: false, ruleIfTrue: 'p_whisker_threshold',
    explanation: t('{hi} est un seuil, pas une donnée : la moustache s\'arrête à {wh}, la plus grande donnée sous le seuil.', { hi: s(B.hi), wh: B.wh }),
    counter: numCounter({ vars: [{ v: 'm', label: t('La moustache s\'arrête à'), dom: 'R' }], hyp: `m=${B.wh}`, pred: `m=${ft(B.hi).replace(',', '.')}`, answer: { m: String(B.wh) } }),
  });
}

export const GEN = { [DS]: dsItem, [BX]: bxItem };

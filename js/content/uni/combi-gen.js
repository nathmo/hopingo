// Generators of module G7 (unit `combi`, step U7). Catalogue:
// docs/universite/G-gymnase-2.md, « G7 ». Skills: combi.skills.js; tools:
// proba-kit.js; traps: js/cas/rules/g7.js.
//
// Levels (spec §8.3): 1–2 guided (lines with blanks; the decision shown,
// then one to choose), 3 « choose the action » (a menu per part), 4 free
// with three hints, 5 alone. Counts and probabilities are judged by
// `prob` (exact); a line like 26×26×9×10×10 is a step, the whole number
// (or the irreducible fraction) ends the part.

import { statItem, coefItem, choice, tf, numCounter, H, KEYS, SM, num, examTag } from './proba-kit.js';
import { t, tn } from '../../i18n.js';

const big = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const prod = (xs) => xs.reduce((p, x) => p * x, 1);
const times = (xs) => xs.join('×');

// ======================================================================
// g7-mult-principle
// ======================================================================

const MP = 'g7-mult-principle';
const MP_SUB = [{ id: 'boxes', label: t('une case par étape'), skill: MP }];

// A counting situation: {story, factors, value, raw?, why?, kind, cases?, labels}.
function mpData(rng, kinds) {
  const kind = rng.pick(kinds);
  if (kind === 'plate') {
    const L = rng.int(1, 3);
    const D = rng.int(2, 4);
    const first = rng.chance(0.6);
    const factors = [...Array(L).fill(26), first ? 9 : 10, ...Array(D - 1).fill(10)];
    return {
      kind, factors, value: prod(factors), raw: first ? prod(factors) / 9 * 10 : null,
      why: first ? t('Le premier chiffre ne peut pas être 0 : il n\'y a que 9 choix dans cette case.') : null,
      story: first
        ? tn(L, 'Une plaque a {n} lettre (A à Z), puis {d} chiffres, le premier chiffre non nul. Combien de plaques différentes ?', 'Une plaque a {n} lettres (A à Z), puis {d} chiffres, le premier chiffre non nul. Combien de plaques différentes ?', { d: D })
        : tn(L, 'Une plaque a {n} lettre (A à Z), puis {d} chiffres. Combien de plaques différentes ?', 'Une plaque a {n} lettres (A à Z), puis {d} chiffres. Combien de plaques différentes ?', { d: D }),
      labels: [...Array(L).fill('lettre'), ...Array(D).fill('chiffre')],
    };
  }
  if (kind === 'code') {
    const D = rng.int(3, 5);
    const c = rng.pick(['none', 'distinct', 'first']);
    const factors = c === 'distinct' ? Array.from({ length: D }, (_, i) => 10 - i) : c === 'first' ? [9, ...Array(D - 1).fill(10)] : Array(D).fill(10);
    return {
      kind, factors, value: prod(factors), raw: c === 'none' ? null : 10 ** D,
      why: c === 'distinct' ? t('Les chiffres doivent être tous différents : chaque case a un choix de moins que la précédente.') : c === 'first' ? t('Le premier chiffre ne peut pas être 0 : 9 choix dans la première case.') : null,
      story: c === 'distinct' ? t('Un code de {d} chiffres (0 à 9), tous différents. Combien de codes possibles ?', { d: D })
        : c === 'first' ? t('Un code de {d} chiffres (0 à 9), qui ne commence pas par 0. Combien de codes possibles ?', { d: D })
          : t('Un code de {d} chiffres (0 à 9). Combien de codes possibles ?', { d: D }),
      labels: Array(D).fill('chiffre'),
    };
  }
  if (kind === 'menu' || kind === 'outfit') {
    const factors = [rng.int(2, 7), rng.int(2, 7), rng.int(2, 6)];
    const story = kind === 'menu'
      ? t('Un restaurant propose {a} entrées, {b} plats et {c} desserts. Un menu est formé d\'une entrée, d\'un plat et d\'un dessert. Combien de menus ?', { a: factors[0], b: factors[1], c: factors[2] })
      : t('Lisa a {a} t-shirts, {b} pantalons et {c} paires de chaussures. Combien de tenues différentes peut-elle composer ?', { a: factors[0], b: factors[1], c: factors[2] });
    return { kind, factors, value: prod(factors), raw: null, story, labels: kind === 'menu' ? ['entrée', 'plat', 'dessert'] : ['t-shirt', 'pantalon', 'chaussures'] };
  }
  if (kind === 'word') {
    const k = rng.int(3, 4);
    const factors = Array.from({ length: k }, (_, i) => 26 - i);
    return {
      kind, factors, value: prod(factors), raw: 26 ** k,
      why: t('Les lettres doivent être distinctes : une lettre de moins à chaque case.'),
      story: t('Combien de « mots » de {k} lettres (A à Z), toutes distinctes, peut-on écrire (ils n\'ont pas besoin d\'avoir un sens) ?', { k }),
      labels: Array(k).fill('lettre'),
    };
  }
  if (kind === 'sum') {
    // Two cases that exclude each other: a code of a letters or of b digits.
    const a = rng.int(2, 3);
    const b = rng.int(3, 4);
    const cases = [Array(a).fill(26), Array(b).fill(10)];
    return {
      kind, cases, factors: null, value: 26 ** a + 10 ** b, raw: null,
      story: t('Un identifiant est formé soit de {a} lettres (A à Z), soit de {b} chiffres (0 à 9). Combien d\'identifiants possibles ?', { a, b }),
    };
  }
  // complement: at least one digit in a password of k characters.
  const k = rng.int(3, 4);
  return {
    kind: 'complement', factors: null, value: 36 ** k - 26 ** k, raw: 36 ** k, k,
    why: t('Il faut au moins un chiffre : on retire les mots de passe sans chiffre.'),
    story: t('Un mot de passe a {k} caractères, chacun une lettre (a à z) ou un chiffre (0 à 9). Il doit contenir au moins un chiffre. Combien de mots de passe possibles ?', { k }),
  };
}

// The lines of the corrigé and the traps of a situation.
function mpLines(d, level) {
  const lines = [];
  const traps = {};
  if (d.kind === 'sum') {
    const [A, B] = d.cases;
    const va = prod(A);
    const vb = prod(B);
    lines.push({ math: `${A[0]}^${A.length}+${B[0]}^${B.length}`, note: t('Deux cas qui s\'excluent : on additionne'), subgoal: 'boxes', blank: [`${A[0]}^${A.length}`, `${B[0]}^${B.length}`], blank2: [`${A[0]}^${A.length}+${B[0]}^${B.length}`] });
    lines.push({ math: `${va}+${vb}`, note: t('Calculer chaque cas'), blank: [String(vb)] });
    lines.push({ math: String(d.value), note: t('Résultat'), blank: [String(d.value)] });
    traps.g7_add_instead_multiply = { values: [String(va * vb)], ctx: { cases: 2 } };
    return { lines, traps };
  }
  if (d.kind === 'complement') {
    const all = 36 ** d.k;
    const none = 26 ** d.k;
    lines.push({ math: `36^${d.k}-26^${d.k}`, note: t('Tous les mots de passe, moins ceux sans chiffre'), subgoal: 'boxes', blank: [`26^${d.k}`], blank2: [`36^${d.k}-26^${d.k}`] });
    lines.push({ math: `${all}-${none}`, note: t('Calculer'), blank: [String(none)] });
    lines.push({ math: String(d.value), note: t('Résultat'), blank: [String(d.value)] });
    traps.g7_constraint_ignored = { values: [String(all)], ctx: { why: d.why } };
    traps.g7_add_instead_multiply = { values: [String(36 * d.k - 26 * d.k), String(36 * d.k)], ctx: { second: 36 } };
    return { lines, traps };
  }
  const f = d.factors;
  // Level 1: the boxes whose number of choices is asked (the constrained one first).
  const holes = level === 1 ? [String(f[0]), String(f[f.length - 1])] : [times(f)];
  lines.push({ math: times(f), note: t('Une case par étape, le nombre de choix dans chaque case'), subgoal: 'boxes', blank: holes });
  if (f.length >= 4) {
    const half = Math.ceil(f.length / 2);
    const a = prod(f.slice(0, half));
    const b = prod(f.slice(half));
    lines.push({ math: `${a}×${b}`, note: t('Calculer par morceaux'), blank: [String(b)] });
  }
  lines.push({ math: String(d.value), note: t('Résultat'), blank: [String(d.value)] });
  traps.g7_add_instead_multiply = { values: [String(f.reduce((s, x) => s + x, 0))], ctx: { second: f[1] } };
  if (d.raw) traps.g7_constraint_ignored = { values: [String(d.raw)], ctx: { why: d.why } };
  return { lines, traps };
}

function mpHints(d) {
  if (d.kind === 'sum') return H(t('Les deux sortes d\'identifiants s\'excluent : compte chaque cas (en multipliant), puis additionne.'), `${SM(`${d.cases[0][0]}^${d.cases[0].length}+□`)}`, big(d.value));
  if (d.kind === 'complement') return H(t('« Au moins un chiffre » : compte tous les mots de passe, puis retire ceux qui n\'ont aucun chiffre.'), `${SM(`36^${d.k}-□`)}`, big(d.value));
  const f = d.factors;
  return H(t('Dessine {n} cases et écris dans chacune le nombre de choix.', { n: f.length }), SM(times(f.map((x, i) => (i === f.length - 1 ? '□' : x)))), big(d.value));
}

function mpItem(level, rng, profile, opts = {}) {
  const kinds = level === 1 ? ['plate', 'code', 'menu', 'outfit']
    : level === 2 ? ['sum', 'plate', 'code', 'word']
      : level === 5 ? ['plate', 'code', 'word', 'complement', 'sum'] : ['plate', 'code', 'menu', 'outfit', 'word', 'sum', 'complement'];
  const d = mpData(rng, kinds);
  if (opts.exam === 'mcq') return mpMcq(d, rng, opts);
  if (opts.exam === 'tf') return mpTf(rng, opts);
  const { lines, traps } = mpLines(d, level);
  const decisions = [];
  if (d.kind === 'sum') {
    decisions.push({ prompt: t('Les deux sortes d\'identifiants : × ou + ?'), levels: [1, 2], options: [
      { id: 'plus', label: t('Additionner : un identifiant est d\'une sorte ou de l\'autre, jamais des deux'), valid: true },
      { id: 'times', label: t('Multiplier les deux nombres'), valid: false, rule: 'g7_add_instead_multiply', why: t('On multiplie des étapes qui se suivent (« et ») ; ici les deux cas s\'excluent (« ou ») : on additionne.') },
    ] });
  } else if (d.why) {
    decisions.push({ prompt: t('Toutes les cases ont-elles le même nombre de choix ?'), levels: [1, 2], options: [
      { id: 'no', label: t('Non. {why}', { why: d.why }), valid: true },
      { id: 'yes', label: t('Oui, chaque case a tous les choix'), valid: false, rule: 'g7_constraint_ignored', why: d.why },
    ] });
  }
  const action = d.kind === 'sum' ? t('Compter chaque cas, puis additionner') : d.kind === 'complement' ? t('Tout compter, puis retirer les cas sans chiffre') : t('Une case par étape, puis multiplier');
  return statItem({
    skill: MP, level, key: `${level}:${d.kind}:${d.value}`,
    prompt: d.story,
    parts: [{ label: 'N', kind: 'prob', expect: String(d.value), traps, decisions, action, lines,
      wrongActions: [
        { label: t('Additionner les nombres de choix de chaque case'), rule: 'g7_add_instead_multiply', why: t('Chaque choix d\'une case se combine avec tous les choix des autres : on multiplie.') },
        ...(d.why ? [{ label: t('Donner tous les choix à chaque case'), rule: 'g7_constraint_ignored', why: d.why }] : []),
      ] }],
    hints: mpHints(d), subgoals: MP_SUB, exam: examTag(opts),
  });
}

function mpMcq(d, rng, opts) {
  if (!d.factors) d = mpData(rng, ['plate', 'code', 'word']);
  const { traps } = mpLines(d, 4);
  const wrongs = [];
  if (traps.g7_constraint_ignored) wrongs.push({ html: big(traps.g7_constraint_ignored.values[0]), rule: 'g7_constraint_ignored' });
  wrongs.push({ html: big(traps.g7_add_instead_multiply.values[0]), rule: 'g7_add_instead_multiply' });
  const fillers = [d.value * 10, Math.round(d.value / 10), d.value * 2, d.value + 1000].map((x) => ({ html: big(x) }));
  return choice({ skill: MP, level: 4, prompt: d.story, right: big(d.value), wrongs, fillers, key: `mcq:${d.kind}:${d.value}`, exam: examTag(opts) }, rng);
}

function mpTf(rng, opts) {
  const [a, b, c] = [rng.int(2, 6), rng.int(2, 6), rng.int(2, 5)];
  const truth = rng.chance(0.4);
  const claimed = truth ? a * b * c : a + b + c;
  return tf({
    skill: MP, key: `${a}-${b}-${c}-${truth}`, exam: examTag(opts),
    statement: t('Avec {a} entrées, {b} plats et {c} desserts, on compose {n} menus (une entrée, un plat, un dessert).', { a, b, c, n: claimed }),
    truth, ruleIfTrue: truth ? null : 'g7_add_instead_multiply',
    explanation: t('On multiplie : {a} · {b} · {c} = {n} menus.', { a, b, c, n: a * b * c }),
    counter: truth ? null : numCounter({ vars: [{ v: 'N', label: t('Nombre de menus ='), dom: 'N' }], pred: `N=${claimed}`, hyp: `N=${a * b * c}`, answer: { N: String(a * b * c) } }),
    hints: H(t('Chaque entrée va avec chaque plat, et chaque paire avec chaque dessert.'), `${a} · ${b} · □`, `${a * b * c}`),
  });
}

// The other skills: counting (combi-count.js), binomial theorem and first
// probabilities (combi-prob.js).
import { GEN as COUNT } from './combi-count.js';
import { GEN as PROB } from './combi-prob.js';

export const GEN = {
  [MP]: mpItem,
  ...COUNT,
  ...PROB,
};

void coefItem; void num;

// Generators of module P, part a (step U7): discrete laws. p-disc-pmf,
// p-binom, p-poisson, p-hypergeom. Catalogue: docs/universite/P-probabilites.md.
// Exact probabilities are judged by `prob`; Poisson's (with e^(−λ)) by
// `stat` at 0,001.

import { statItem, coefItem, choice, tf, numCounter, H, examTag } from './proba-kit.js';
import { q, t as ft, s, M, C, qpow, list, ratio, nb } from './proba-a-kit.js';
import { t, tn } from '../../i18n.js';

const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
const f3 = (x) => x.toFixed(3).replace('.', ',');
// « 1 rouge », « 3 rouges » (as nb of proba-a-kit.js), translated: one key per form.
const nbT = (k, words) => tn(k, `{n} ${words.split(' ').map((w) => w.replace(/s$/, '')).join(' ')}`, `{n} ${words}`);
// A text and its French version (the French builds the keys of the items).
const both = (text, vars) => ({ story: t(text, vars), storyFr: text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m)) });

// ======================================================================
// p-disc-pmf
// ======================================================================

const PM = 'p-disc-pmf';
const PM_SUB = [{ id: 'norm', label: t('normaliser'), skill: PM }, { id: 'cum', label: t('cumuler'), skill: PM }, { id: 'inv', label: t('inverser F'), skill: PM }, { id: 'geo', label: t('somme géométrique'), skill: 'a1-ser-geo-tele' }];

// A table X ∈ {0, …, m}: probabilities multiples of 0,05, the last one c.
function pmTable(rng) {
  for (let k = 0; k < 200; k++) {
    const m = rng.pick([3, 3, 4]);
    const ps = Array.from({ length: m }, () => q(rng.int(1, 8), 20));
    const c = q(1).sub(ps.reduce((a, b) => a.add(b), q(0)));
    if (c.cmp(q(1, 20)) < 0) continue;
    const f = [...ps, c];
    const F = f.map((_, i) => f.slice(0, i + 1).reduce((a, b) => a.add(b), q(0)));
    const med = F.findIndex((x) => x.cmp(q(1, 2)) >= 0);
    // An interval a ≤ X < b, or a < X ≤ b.
    const a = rng.int(1, m - 1);
    const b = rng.int(a + 1, m);
    const strictLeft = rng.chance(0.5);
    const Fv = (i) => (i < 0 ? q(0) : F[Math.min(i, m)]);
    const v = strictLeft ? Fv(b).sub(Fv(a)) : Fv(b - 1).sub(Fv(a - 1));
    const wrong = strictLeft ? [Fv(b - 1).sub(Fv(a)), Fv(b).sub(Fv(a - 1))] : [Fv(b).sub(Fv(a - 1)), Fv(b - 1).sub(Fv(a))];
    if (wrong.some((w) => w.eq(v)) || F[0].cmp(q(1, 2)) >= 0) continue;
    return { m, f, F, c, med, a, b, strictLeft, v, wrong, Fv, F05: F[0] };
  }
  return null;
}

function pmTableParts(T, level) {
  const sym = Object.fromEntries(T.F.map((x, i) => [`F(${i})`, ft(x)]));
  const iv = T.strictLeft ? `${T.a} < X ≤ ${T.b}` : `${T.a} ≤ X < ${T.b}`;
  const hi = T.strictLeft ? T.b : T.b - 1;
  const lo = T.strictLeft ? T.a : T.a - 1;
  const k = T.m - 1;
  return [
    {
      label: 'c', name: 'c', kind: 'prob', expect: ft(T.c), action: t('La somme des probabilités vaut 1'),
      lines: [{ math: `1-(${T.f.slice(0, T.m).map(ft).join('+')})`, note: t('Normaliser'), subgoal: 'norm', blank: [ft(T.f[T.m - 1])] }, { math: ft(T.c), note: t('Calculer'), blank: [ft(T.c)] }],
    },
    {
      label: `F(${k})`, name: 'Fk', kind: 'prob', expect: ft(T.F[k]), action: t('Cumuler les masses jusqu\'à {k} inclus', { k }),
      lines: [{ math: T.f.slice(0, k + 1).map(ft).join('+'), note: `F(${k}) = Pr(X ≤ ${k})`, subgoal: 'cum', blank: [ft(T.f[k])] }, { math: ft(T.F[k]), note: t('Additionner'), blank: [ft(T.F[k])] }],
    },
    {
      label: `Pr(${iv.replace(/ /g, '')})`, name: 'iv', kind: 'prob', expect: ft(T.v), symbols: sym, action: t('Écrire la probabilité avec F (attention à < et ≤)'),
      wrongActions: [{ label: t('F({b}) − F({a}) dans tous les cas', { a: T.a, b: T.b }), rule: 'p_cdf_strict', why: t('F(x) = Pr(X ≤ x) inclut x : vérifie chaque borne.') }],
      traps: { p_cdf_strict: { values: T.wrong.map(ft) } },
      lines: [
        { math: lo >= 0 ? `F(${hi})-F(${lo})` : `F(${hi})`, note: t('{iv} : de F({lo}) exclu à F({hi}) inclus', { iv, lo, hi }), subgoal: 'cum', blank: [`F(${hi})`] },
        { math: lo >= 0 ? `${ft(T.F[hi])}-${ft(T.F[lo])}` : ft(T.F[hi]), note: t('Valeurs de F'), blank: [ft(T.F[hi])] },
        { math: ft(T.v), note: t('Calculer'), blank: [ft(T.v)] },
      ].filter((l, i, a) => i < a.length - 1 ? l.math !== ft(T.v) : true).filter((l, i, a) => a.findIndex((x) => x.math === l.math) === i),
    },
    {
      label: t('méd'), name: 'med', kind: 'prob', expect: String(T.med), action: t('Le plus petit x avec F(x) ≥ 0,5'),
      wrongActions: [{ label: t('Calculer F(0,5)'), rule: 'p_quantile_inverse', why: t('On cherche x tel que F(x) ≥ 0,5, pas la valeur de F en 0,5.') }],
      traps: { p_quantile_inverse: { values: [ft(T.F05)].filter((x) => x !== String(T.med)), ctx: { 'α': '0,5' } } },
      lines: [{ math: String(T.med), note: `F(${T.med - 1 < 0 ? 0 : T.med - 1}) < 0,5 ≤ F(${T.med})`.replace(/F\(0\) < 0,5 ≤ F\(0\)/, '0,5 ≤ F(0)'), subgoal: 'inv', blank: [String(T.med)] }],
    },
  ].map((p) => (level <= 2 ? p : p));
}

// f(k) = c·k on {1, …, m}.
function pmLinear(rng) {
  const m = rng.int(3, 6);
  const S = (m * (m + 1)) / 2;
  const c = q(1, S);
  const k = rng.int(2, m);
  const v = q(k + m, S).mul(k < m ? 1 : 1);
  const top = k === m ? q(m, S) : q(k + (k + 1 <= m ? 0 : 0), S);
  void top;
  // Pr(X ≥ k) = c·(k + … + m).
  const ge = Array.from({ length: m - k + 1 }, (_, i) => k + i);
  const pge = q(ge.reduce((a, b) => a + b, 0), S);
  void v;
  return {
    ...both('X prend les valeurs 1, 2, …, {m} avec Pr(X = k) = c·k. Trouve c, puis Pr(X ≥ {k}).', { m, k }),
    parts: [
      { label: 'c', name: 'c', kind: 'prob', expect: ft(c), action: 'c·(1 + 2 + … + m) = 1', lines: [{ math: `1/(${Array.from({ length: m }, (_, i) => i + 1).join('+')})`, note: t('Normaliser'), subgoal: 'norm' }, { math: ft(c), note: `1 + … + ${m} = ${S}` }] },
      {
        label: `Pr(X≥${k})`, name: 'p', kind: 'prob', expect: `$c×(${ge.join('+')})`, action: t('Additionner les masses de {k} à {m}', { k, m }),
        wrongActions: [{ label: t('Commencer la somme à {j}', { j: k + 1 }), rule: 'p_cdf_strict', why: t('« X ≥ {k} » contient {k}.', { k }) }],
        traps: { p_cdf_strict: { values: [ft(pge.sub(q(k, S)))] } },
        lines: [{ math: `${ge.join('+')}/${S}`.replace(/^(.*)\/(\d+)$/, `(${ge.join('+')})/${S}`), note: t('c fois la somme'), subgoal: 'cum' }, { math: ft(pge), note: t('Calculer') }],
      },
    ],
    v: pge,
  };
}

// Geometric (MATH-234): X counts the failures before the first success.
function pmGeom(rng) {
  const p = rng.pick([q(1, 2), q(1, 3), q(1, 4), q(1, 5)]);
  const r = q(1).sub(p);
  const k = rng.int(2, 3);
  return {
    ...both('Un archer touche la cible avec probabilité {p} à chaque tir, indépendamment. X compte les tirs manqués avant le premier tir réussi : Pr(X = x) = c·({r})ˣ pour x = 0, 1, 2, … (convention MATH-234). Trouve c, Pr(X ≥ {k}) et E[X].', { p: s(p), r: s(r), k }),
    parts: [
      { label: 'c', name: 'c', kind: 'prob', expect: ft(p), action: t('Série géométrique : Σ rˣ = 1/(1 − r)'), lines: [{ math: `1-${ft(r)}`, note: `c·1/(1 − ${s(r)}) = 1`, subgoal: 'geo' }, { math: ft(p), note: 'c = p' }] },
      {
        label: `Pr(X≥${k})`, name: 'g', kind: 'prob', expect: ft(qpow(r, k)), action: t('Les {k} premiers tirs manqués', { k }),
        wrongActions: [{ label: `(1 − p)^${k + 1}`, rule: 'p_cdf_strict', why: t('« X ≥ {k} » : les {k} premiers tirs manqués, pas {j}.', { k, j: k + 1 }) }],
        traps: { p_cdf_strict: { values: [ft(qpow(r, k + 1)), ft(qpow(r, k - 1))] } },
        lines: [{ math: pw(r, k), note: t('X ≥ {k} : les {k} premiers tirs manqués', { k }), subgoal: 'cum' }, { math: ft(qpow(r, k)), note: t('Calculer') }],
      },
      {
        label: 'E[X]', name: 'e', kind: 'prob', expect: ft(r.div(p)), action: t('E[X] = (1 − p)/p (échecs avant le succès)'),
        wrongActions: [{ label: 'E[X] = 1/p', rule: 'p_geom_support', why: t('C\'est l\'espérance du nombre d\'essais, pas d\'échecs.') }],
        traps: { p_geom_support: { values: [ft(p.inv())] } },
        lines: [{ math: ratio(r, p), note: t('Convention MATH-234 : (1 − p)/p'), subgoal: 'inv' }, { math: ft(r.div(p)), note: t('Calculer') }],
      },
    ],
  };
}

// The maximum of two dice: f(x) = (2x − 1)/36, F(x) = x²/36.
function pmMax(rng) {
  const k = rng.int(2, 6);
  return {
    ...both('On lance deux dés équilibrés ; X est le plus grand des deux numéros. Donne Pr(X = {k}), F({k}) = Pr(X ≤ {k}) et la médiane de X.', { k }),
    parts: [
      { label: `Pr(X=${k})`, name: 'f', kind: 'prob', expect: ft(q(2 * k - 1, 36)), action: t('Couples dont le maximum vaut k : 2k − 1'), lines: [{ math: `${2 * k - 1}/36`, note: t('{j} couples sur 36', { j: 2 * k - 1 }), subgoal: 'norm' }, ...(q(2 * k - 1, 36).d === 36 ? [] : [{ math: ft(q(2 * k - 1, 36)), note: t('Simplifier') }])] },
      { label: `F(${k})`, name: 'F', kind: 'prob', expect: ft(q(k * k, 36)), action: t('Les deux dés ≤ k'), lines: [{ math: `(${k}/6)^2`, note: t('max ≤ k : les deux dés ≤ k'), subgoal: 'cum' }, { math: ft(q(k * k, 36)), note: t('Calculer') }] },
      {
        label: t('méd'), name: 'med', kind: 'prob', expect: '5', action: t('Le plus petit x avec F(x) ≥ 1/2'),
        wrongActions: [{ label: t('Calculer F(1/2)'), rule: 'p_quantile_inverse', why: t('On inverse F.') }],
        lines: [{ math: '5', note: 'F(4) = 16/36 < 1/2 ≤ F(5) = 25/36', subgoal: 'inv' }],
      },
    ],
  };
}

function pmItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') {
    if (rng.chance(0.4)) return tf({ skill: PM, key: 'memo', exam: examTag(opts), statement: t('Une variable géométrique vérifie Pr(X > m + n | X > n) = Pr(X > m).'), truth: true, explanation: t('Pr(X > m + n)/Pr(X > n) = (1 − p)^(m+n)/(1 − p)ⁿ = (1 − p)^m : absence de mémoire.') });
    const T = pmTable(rng);
    const a = T.F[1]; const b = T.F[2];
    return tf({
      skill: PM, key: `strict:${T.f.map(ft).join(',')}`, exam: examTag(opts),
      statement: t('X prend les valeurs {vals} avec les probabilités {ps}. Pr(X < 2) = F(2).', { vals: T.f.map((_, i) => i).join(', '), ps: T.f.map(s).join(' ; ') }),
      truth: false, ruleIfTrue: 'p_cdf_strict',
      explanation: t('Pr(X < 2) = F(1) = {a}, alors que F(2) = {b}.', { a: s(a), b: s(b) }),
      counter: numCounter({ vars: [{ v: 'a', label: 'Pr(X < 2) =' }, { v: 'b', label: 'F(2) =' }], hyp: `a=${ft(a)}∧b=${ft(b)}`, pred: 'a=b', answer: { a: ft(a), b: ft(b) } }),
    });
  }
  const kind = opts.exam ? 'table' : level <= 3 ? 'table' : level === 4 ? rng.pick(['table', 'linear', 'geom', 'table']) : rng.pick(['geom', 'max']);
  if (kind === 'table') {
    const T = pmTable(rng);
    const parts = pmTableParts(T, level);
    const tab = T.f.map((x, i) => `Pr(X = ${i}) = ${i === T.m ? 'c' : s(x)}`).join(' ; ');
    const iv = T.strictLeft ? `${T.a} < X ≤ ${T.b}` : `${T.a} ≤ X < ${T.b}`;
    if (opts.exam === 'mcq') {
      return choice({ skill: PM, level: 4, key: `mcq:${T.f.map(ft).join(',')}:${iv}`, exam: examTag(opts), prompt: t('X a pour loi {law}. Que vaut Pr({iv}) ?', { law: T.f.map((x, i) => `Pr(X = ${i}) = ${s(x)}`).join(' ; '), iv }), right: s(T.v), wrongs: T.wrong.map((w) => ({ html: s(w), rule: 'p_cdf_strict' })), fillers: [{ html: s(T.F[T.b]) }, { html: s(T.v.add(q(1, 20))) }] }, rng);
    }
    const prompt = t('X prend les valeurs {vals} : {tab}. Trouve c, F({m}), Pr({iv}) et la médiane min{x : F(x) ≥ 0,5}.', { vals: T.f.map((_, i) => i).join(', '), tab, m: T.m - 1, iv });
    if (opts.exam === 'coef') return coefItem({ skill: PM, key: `coef:${T.f.map(ft).join(',')}:${iv}`, prompt: t('X a pour loi {law}. Que vaut Pr({iv}) ?', { law: T.f.map((x, i) => `Pr(X = ${i}) = ${s(x)}`).join(' ; '), iv }), parts, part: parts[2], subgoals: PM_SUB, exam: examTag(opts) });
    return statItem({
      skill: PM, level, key: `${level}:${T.f.map(ft).join(',')}:${iv}`, prompt, parts, subgoals: PM_SUB, exam: examTag(opts),
      hints: H(t('Une fonction de masse fait 1 au total ; F additionne les masses jusqu\'à x inclus.'), M(`F(${T.strictLeft ? T.b : T.b - 1})-F(□)`), `Pr(${iv}) = ${s(T.v)}`),
    });
  }
  const G = kind === 'linear' ? pmLinear(rng) : kind === 'geom' ? pmGeom(rng) : pmMax(rng);
  return statItem({
    skill: PM, level, key: `${level}:${kind}:${G.storyFr.length}:${G.parts.map((p) => p.expect).join(',')}`, prompt: G.story, parts: G.parts, subgoals: PM_SUB, exam: examTag(opts),
    hints: H(t('Une fonction de masse fait 1 au total ; F(x) = Pr(X ≤ x) cumule jusqu\'à x inclus.'), t('c · (somme des poids) = □'), `${G.parts[0].label} = ${s(G.parts[0].expect.includes('$') ? G.parts[0].lines.at(-1).math : G.parts[0].expect)}`),
  });
}

// ======================================================================
// p-binom
// ======================================================================

const BI = 'p-binom';
const BI_SUB = [{ id: 'coef', label: 'C(n, k)', skill: 'g7-binomial' }, { id: 'law', label: t('reconnaître la loi'), skill: BI }, { id: 'formula', label: t('formule'), skill: BI }];

function biData(rng, level) {
  const g = rng.pick(level <= 2 ? ['urn', 'qcm', 'pieces'] : ['urn', 'qcm', 'pieces', 'urn']);
  if (g === 'urn') {
    // Ten balls: p in tenths, results with at most 6 decimals.
    const r = rng.int(2, 8); const b = 10 - r;
    const n = rng.int(3, 6);
    return { g, n, p: q(r, r + b), r, b, story: (k) => t('Une urne contient {r} boules rouges et {b} bleues. On tire {n} boules <b>avec</b> remise. X = nombre de rouges. Pr(X = {k}) ?', { r, b, n, k }), what: 'rouges' };
  }
  if (g === 'qcm') {
    const opt = rng.pick([4, 5]); const n = rng.int(4, opt === 5 ? 6 : 8);
    return { g, n, p: q(1, opt), story: (k) => t('Un QCM a {n} questions à {opt} réponses, dont une juste. Un élève répond au hasard. X = nombre de bonnes réponses. Pr(X = {k}) ?', { n, opt, k }), what: 'bonnes réponses' };
  }
  const n = rng.int(4, 6); const p = q(rng.pick([1, 2]), 10);
  return { g, n, p, story: (k) => t('Une machine produit {p} de pièces défectueuses, indépendamment. On prend {n} pièces. X = nombre de pièces défectueuses. Pr(X = {k}) ?', { p: pct0(p), n, k }), what: 'pièces défectueuses' };
}
const pct0 = (x) => `${Math.round(x.valueOf() * 100)} %`;
const binom = (n, k, p) => q(C(n, k)).mul(qpow(p, k)).mul(qpow(q(1).sub(p), n - k));
const pw = (x, k) => (k === 1 ? ft(x) : x.d === 1 ? `${x.n}^${k}` : x.toDecimal() ? `${ft(x)}^${k}` : `(${ft(x)})^${k}`);

function biProbPart(D, k, name = 'pk') {
  const p = D.p; const r = q(1).sub(p); const n = D.n;
  const v = binom(n, k, p);
  const fac = [`C(${n};${k})`, ...(k ? [pw(p, k)] : []), ...(n - k ? [pw(r, n - k)] : [])];
  const nums = [String(C(n, k)), ...(k ? [ft(qpow(p, k))] : []), ...(n - k ? [ft(qpow(r, n - k))] : [])];
  const traps = {
    p_binom_no_coef: { values: [ft(qpow(p, k).mul(qpow(r, n - k)))].filter(() => C(n, k) > 1), ctx: { v: ft(qpow(p, k).mul(qpow(r, n - k))), n, k, c: C(n, k) } },
    p_binom_swap_p: { values: [ft(binom(n, k, r))].filter((x) => x !== ft(v)), ctx: { p: ft(p), k } },
  };
  if (D.g === 'urn' && D.n <= D.r) traps.p_binom_without_replacement = { values: [ft(q(C(D.r, k) * C(D.b, n - k), C(D.r + D.b, n)))] };
  return {
    label: `Pr(X=${k})`, name, kind: 'prob', expect: ft(v), action: 'C(n, k)·pᵏ·(1 − p)ⁿ⁻ᵏ',
    wrongActions: [{ label: t('pᵏ·(1 − p)ⁿ⁻ᵏ, sans C(n, k)'), rule: 'p_binom_no_coef', why: t('C(n, k) compte les places possibles des succès.') }, { label: t('Échanger p et 1 − p'), rule: 'p_binom_swap_p', why: t('p va avec le nombre de succès k.') }],
    traps,
    lines: [
      { math: fac.join('×'), note: t('Formule de la binomiale'), subgoal: 'formula', blank: [String(k), String(n - k)].filter((x, i) => (i ? n - k : k) > 0) },
      ...(nums.length > 1 ? [{ math: nums.join('×'), note: t('Calculer chaque facteur'), subgoal: 'coef', blank: [String(C(n, k))] }] : []),
      { math: ft(v), note: t('Multiplier'), blank: [ft(v)] },
    ].filter((l, i, a) => a.findIndex((x) => x.math === l.math) === i),
  };
}

function biItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') {
    if (rng.chance(0.4)) return tf({ skill: BI, key: 'var<E', exam: examTag(opts), statement: t('Si X ~ B(n, p), alors var(X) ≤ E[X].'), truth: true, explanation: 'var(X) = np(1 − p) ≤ np = E[X].' });
    return tf({
      skill: BI, key: 'sans-remise', exam: examTag(opts),
      statement: t('Dans une urne de 5 boules dont 2 rouges, le nombre de rouges en 3 tirages sans remise suit la loi B(3 ; 2/5).'),
      truth: false, ruleIfTrue: 'p_binom_without_replacement',
      explanation: t('Sans remise, on ne peut pas tirer 3 rouges : Pr(X = 3) = 0, alors que B(3 ; 2/5) donne (2/5)³ = 8/125.'),
      counter: numCounter({ vars: [{ v: 'p', label: t('La vraie valeur de Pr(X = 3) :') }], hyp: 'p=0', pred: 'p=8/125', answer: { p: '0' } }),
    });
  }
  const D = biData(rng, level);
  // A small p with a large k gives tiny probabilities (0,001215): k stays near np.
  const k = D.p.valueOf() <= 0.25 ? rng.int(1, Math.min(2, D.n - 1)) : rng.int(1, D.n - 1);
  const v = binom(D.n, k, D.p);
  if (opts.exam === 'mcq') {
    const r = q(1).sub(D.p);
    return choice({ skill: BI, level: 4, key: `mcq:${D.g}:${D.n}:${ft(D.p)}:${k}`, exam: examTag(opts), prompt: D.story(k), right: s(v), wrongs: [{ html: s(qpow(D.p, k).mul(qpow(r, D.n - k))), rule: 'p_binom_no_coef' }, { html: s(binom(D.n, k, r)), rule: 'p_binom_swap_p' }], fillers: [{ html: s(q(k, D.n)) }, { html: s(qpow(D.p, k)) }, { html: s(v.mul(2)) }] }, rng);
  }
  const law = {
    label: 'loi', name: null, kind: 'prob', expect: ft(D.p), action: t('Reconnaître la loi : X ~ B(n, p)'),
    decisions: [{ prompt: t('X suit-elle une loi binomiale ?'), levels: [2, 3, 4], options: [
      { id: 'y', label: t('Oui : {n} essais indépendants, même probabilité de succès, X compte les succès', { n: D.n }), valid: true },
      { id: 'h', label: t('Non : il faut compter les cas comme pour un tirage sans remise'), valid: false, rule: 'p_binom_without_replacement', why: D.g === 'urn' ? t('Ici on remet la boule : les tirages sont indépendants, de même p.') : t('Les essais sont indépendants et de même p.') },
    ] }],
    lines: [{ math: ft(D.p), note: t('p = probabilité d\'un succès, n = {n}', { n: D.n }), subgoal: 'law' }],
  };
  law.label = 'p';
  const parts = [law, biProbPart(D, k)];
  let prompt = D.story(k);
  if (level >= 4 && !opts.exam) {
    const mode = rng.pick(['le1', 'ge2', 'moments']);
    if (mode === 'moments' || level === 5) {
      parts.push({ label: 'E[X]', name: 'E', kind: 'prob', expect: ft(D.p.mul(D.n)), action: 'E[X] = np', lines: [{ math: `${D.n}×${ft(D.p)}`, note: 'np', subgoal: 'formula' }, { math: ft(D.p.mul(D.n)), note: t('Calculer') }] });
      parts.push({ label: 'var(X)', name: 'V', kind: 'prob', expect: ft(D.p.mul(D.n).mul(q(1).sub(D.p))), action: 'var(X) = np(1 − p)', lines: [{ math: `${D.n}×${ft(D.p)}×${ft(q(1).sub(D.p))}`, note: 'np(1 − p)', subgoal: 'formula' }, { math: ft(D.p.mul(D.n).mul(q(1).sub(D.p))), note: t('Calculer') }] });
      prompt += ` ${t('Puis E[X] et var(X).')}`;
    }
    if (mode !== 'moments' || level === 5) {
      const p0 = binom(D.n, 0, D.p); const p1 = binom(D.n, 1, D.p);
      const ge2 = level === 5 || mode === 'ge2';
      const val = ge2 ? q(1).sub(p0).sub(p1) : p0.add(p1);
      parts.push(biProbPart(D, 0, 'z'));
      if (k !== 1) parts.push(biProbPart(D, 1, 'u'));
      const uRef = k === 1 ? '$pk' : '$u';
      parts.push({
        label: ge2 ? 'Pr(X≥2)' : 'Pr(X≤1)', name: 'w', kind: 'prob', expect: ge2 ? `1-$z-${uRef}` : `$z+${uRef}`, action: ge2 ? t('Complément : 1 − Pr(X = 0) − Pr(X = 1)') : 'Pr(X = 0) + Pr(X = 1)',
        wrongActions: [{ label: ge2 ? t('n·p, comme pour « au moins un »') : t('Pr(X = 1) seulement'), rule: 'p_atleast_one_np', why: t('n·p n\'est pas une probabilité : passe par le complément.') }],
        traps: ge2 ? { p_atleast_one_np: { values: [ft(D.p.mul(D.n))].filter((x) => D.p.mul(D.n).cmp(1) < 0), ctx: { n: D.n, p: ft(D.p) } } } : {},
        lines: [{ math: ge2 ? `1-${ft(p0)}-${ft(p1)}` : `${ft(p0)}+${ft(p1)}`, note: ge2 ? t('Complément de « 0 ou 1 »') : t('Deux cas'), subgoal: 'formula' }, { math: ft(val), note: t('Calculer') }],
      });
      prompt += ` ${ge2 ? t('Puis Pr(X ≥ 2).') : t('Puis Pr(X ≤ 1).')}`;
    }
  }
  if (opts.exam === 'coef') return coefItem({ skill: BI, key: `coef:${D.g}:${D.n}:${ft(D.p)}:${k}`, prompt, parts, part: parts[1], subgoals: BI_SUB, exam: examTag(opts) });
  return statItem({
    skill: BI, level, key: `${level}:${D.g}:${D.n}:${ft(D.p)}:${k}:${parts.length}`, prompt, parts, subgoals: BI_SUB, exam: examTag(opts),
    simulate: { model: 'binom', n: D.n, p: D.p.valueOf(), event: { op: 'eq', k }, answer: v.valueOf(), label: `Pr(X = ${k})` },
    hints: H(t('C(n, k) compte les places des succès ; ne l\'oublie pas.'), M(`C(${D.n};${k})×${pw(D.p, k).replace(/\^\d+$/, '^□')}`), `Pr(X = ${k}) = ${s(v)}`),
  });
}

// ======================================================================
// p-poisson
// ======================================================================

const PO = 'p-poisson';
const PO_SUB = [{ id: 'np', label: 'λ = np', skill: BI }, { id: 'formula', label: t('formule'), skill: PO }, { id: 'sum', label: t('somme de cas'), skill: PO }];
const e = (lam) => `e^(-${ft(lam)})`;
const poisTerm = (lam, k) => (k === 0 ? e(lam) : k === 1 ? `${ft(lam)}×${e(lam)}` : `${pw(lam, k)}×${e(lam)}/${k}!`);
const poisVal = (lam, k) => lam.valueOf() ** k * Math.exp(-lam.valueOf()) / fact(k);

function poData(rng) {
  const g = rng.pick(['rate', 'approx', 'rate', 'two']);
  if (g === 'approx') {
    const lam = q(rng.pick([1, 2, 3, 4]));
    const n = rng.pick([100, 200, 500, 800]);
    return { g, lam, n, p: lam.div(n), lam0: null, story: t('Chaque jour, {n} voitures passent à un feu ; chacune le grille avec probabilité {p}, indépendamment. X = nombre de voitures qui grillent le feu.', { n, p: ft(lam.div(n)) }), lamLine: `${n}×${ft(lam.div(n))}` };
  }
  if (g === 'two') {
    const l1 = q(rng.pick([1, 2, 3]), 2); const l2 = q(rng.pick([1, 2, 3]), 2);
    const lam = l1.add(l2);
    if (!lam.isInt() && lam.d !== 2) return poData(rng);
    return { g, lam, story: t('Un standard reçoit des appels de deux services indépendants : Poiss({a}) et Poiss({b}) par heure. X = nombre total d\'appels en une heure.', { a: s(l1), b: s(l2) }), lamLine: `${ft(l1)}+${ft(l2)}`, lam0: l1 };
  }
  for (;;) {
    const r = q(rng.pick([1, 2, 3, 4]), 2);
    const T = q(rng.pick([1, 2, 3, 4]), 2);
    const lam = r.mul(T);
    if (lam.cmp(4) > 0 || lam.cmp(q(1, 2)) < 0 || T.eq(1) || !(lam.isInt() || lam.d === 2)) continue;
    const dur = T.eq(q(1, 2)) ? t('30 minutes') : T.isInt() ? t('{n} heures', { n: T.n }) : t('{h} h 30', { h: T.n / 2 | 0 });
    return { g: 'rate', lam, lam0: r, story: r.cmp(1) > 0 ? t('Une hotline reçoit en moyenne {r} appels par heure (loi de Poisson). X = nombre d\'appels pendant {dur}.', { r: s(r), dur }) : t('Une hotline reçoit en moyenne {r} appel par heure (loi de Poisson). X = nombre d\'appels pendant {dur}.', { r: s(r), dur }), lamLine: `${ft(r)}×${ft(T)}`, unit: 'heure', T };
  }
}

function poItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') {
    if (rng.chance(0.4)) return tf({ skill: PO, key: 'sum', exam: examTag(opts), statement: t('Si X ~ Poiss(2) et Y ~ Poiss(3) sont indépendantes, alors X + Y ~ Poiss(5).'), truth: true, explanation: t('Les taux de deux lois de Poisson indépendantes s\'additionnent.') });
    return tf({
      skill: PO, key: 'diff', exam: examTag(opts),
      statement: t('Si X ~ Poiss(2) et Y ~ Poiss(3) sont indépendantes, alors X − Y suit aussi une loi de Poisson (en particulier, X − Y ≥ 0).'),
      truth: false, ruleIfTrue: 'p_poisson_rate_scale',
      explanation: t('X − Y peut être négatif (X = 0 et Y = 1 a une probabilité > 0) : ce n\'est pas une loi de Poisson.'),
      counter: numCounter({ vars: [{ v: 'x', label: t('Une valeur de X :'), dom: 'N' }, { v: 'y', label: t('Une valeur de Y :'), dom: 'N' }], pred: 'x-y≥0', answer: { x: '0', y: '1' } }),
    });
  }
  const D = poData(rng);
  const lam = D.lam;
  const k = rng.int(level <= 2 ? 0 : 1, level <= 2 ? 1 : 3);
  const cum = level >= 3 && rng.chance(0.5);
  const ks = cum ? Array.from({ length: k + 1 }, (_, i) => i) : [k];
  const expr = ks.map((j) => poisTerm(lam, j)).join('+');
  const v = ks.reduce((a, j) => a + poisVal(lam, j), 0);
  const ev = cum ? `X≤${k}` : `X=${k}`;
  const traps = {};
  if (D.lam0) traps.p_poisson_rate_scale = { values: [String(ks.reduce((a, j) => a + poisVal(D.lam0, j), 0))], ctx: { 'λ': s(D.lam0), unité: t(D.unit || 'heure'), t: D.T ? s(D.T) : '…' } };
  if (Math.max(...ks) >= 2) traps.p_poisson_no_factorial = { values: [String(ks.reduce((a, j) => a + lam.valueOf() ** j * Math.exp(-lam.valueOf()), 0))], ctx: { kf: fact(Math.max(...ks)) } };
  const parts = [
    {
      label: 'λ', name: 'lam', kind: 'prob', expect: ft(lam), action: D.g === 'approx' ? 'λ = n·p' : D.g === 'two' ? t('Additionner les taux') : t('Mettre le taux à l\'échelle de la durée'),
      decisions: D.g === 'approx' ? [{ prompt: t('Quelle approximation de la loi binomiale ?'), levels: [2, 3, 4, 5], options: [
        { id: 'p', label: t('Poisson de paramètre np : n grand, p petit'), valid: true },
        { id: 'n', label: t('Normale N(np, np(1 − p))'), valid: false, rule: 'p_poisson_approx_bad', why: t('np = {v} est petit : la loi est très asymétrique, la normale l\'approche mal. Poisson convient.', { v: s(lam) }) },
      ] }] : [],
      wrongActions: [{ label: t('Garder le taux tel quel'), rule: 'p_poisson_rate_scale', why: t('Le taux suit la durée.') }, { label: t('Approcher par une normale'), rule: 'p_poisson_approx_bad', why: t('Avec λ petit, la normale approche mal.') }],
      lines: [{ math: D.lamLine, note: D.g === 'approx' ? 'λ = n·p' : D.g === 'two' ? t('Somme de Poisson indépendantes') : t('Taux × durée'), subgoal: 'np', blank: [D.lamLine.split(/[×+]/)[1]] }, { math: ft(lam), note: t('Calculer'), blank: [ft(lam)] }],
    },
    {
      label: `Pr(${ev})`, name: 'pr', kind: 'stat', decimals: 3, expect: expr, action: cum ? t('Additionner les cas k = 0, …') : 'λᵏe^(−λ)/k!',
      wrongActions: [{ label: t('λᵏe^(−λ), sans k!'), rule: 'p_poisson_no_factorial', why: t('Sans k!, les probabilités ne somment pas à 1.') }],
      traps,
      lines: [
        { math: expr, note: cum ? t('Somme des cas') : t('Formule de Poisson'), subgoal: cum ? 'sum' : 'formula', blank: [ft(lam)] },
        { math: f3(v), note: t('Valeur approchée à 0,001'), subgoal: 'formula', blank: [f3(v)] },
      ],
    },
  ];
  const prompt = `${D.story} ${t('Calcule λ, puis Pr({ev}) à 0,001 près.', { ev: ev.replace('≤', ' ≤ ').replace('=', ' = ') })}`;
  if (opts.exam === 'mcq') {
    return choice({ skill: PO, level: 4, key: `mcq:${D.g}:${ft(lam)}:${ev}`, exam: examTag(opts), prompt: `${D.story} Pr(${ev}) ≈ ?`, right: f3(v), wrongs: Object.entries(traps).map(([rule, x]) => ({ html: f3(Number(x.values[0])), rule })), fillers: [{ html: f3(Math.exp(-lam.valueOf())) }, { html: f3(1 - v) }, { html: f3(v / 2) }] }, rng);
  }
  if (opts.exam === 'coef') return coefItem({ skill: PO, key: `coef:${D.g}:${ft(lam)}:${ev}`, prompt, parts, subgoals: PO_SUB, exam: examTag(opts) });
  return statItem({
    skill: PO, level, key: `${level}:${D.g}:${ft(lam)}:${ev}`, prompt, parts, subgoals: PO_SUB, exam: examTag(opts),
    simulate: { model: 'poisson', lambda: lam.valueOf(), event: { op: cum ? 'le' : 'eq', k }, answer: v, label: `Pr(${ev})` },
    hints: H(t('λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!.'), cum ? `${M(poisTerm(lam, 0))} + …` : t('λ = {l}, puis {e}', { l: ft(lam).replace('-', '−'), e: M(expr) }), `Pr(${ev}) ≈ ${f3(v)}`),
  });
}

// ======================================================================
// p-hypergeom
// ======================================================================

const HY = 'p-hypergeom';
const HY_SUB = [{ id: 'count', label: t('compter'), skill: 'p-count' }, { id: 'cond', label: t('conditionner'), skill: 'p-cond-total' }];

function hyItem(level, rng, profile, opts = {}) {
  let r; let b; let n; let k;
  for (;;) {
    r = rng.int(3, 9); b = rng.int(3, 9); n = rng.int(2, Math.min(5, r + b - 2)); k = rng.int(1, Math.min(n, r));
    if (r + b >= 8 && r + b <= 20 && n - k <= b) break;
  }
  const N = r + b;
  const om = C(N, n);
  const fa = C(r, k) * C(b, n - k);
  const v = q(fa, om);
  const urn = rng.pick([true, false]);
  const story = urn ? t('Une urne contient {r} boules rouges et {b} bleues. On tire {n} boules <b>sans</b> remise.', { r, b, n }) : t('Un lot de {N} pièces contient {r} pièces défectueuses. On en prélève {n} au hasard, sans remise.', { N, r, n });
  const what = urn ? 'rouges' : 'défectueuses';
  const binV = q(C(n, k)).mul(qpow(q(r, N), k)).mul(qpow(q(b, N), n - k));
  const pk = {
    label: `Pr(X=${k})`, name: 'pk', kind: 'prob', expect: ft(v), action: t('Compter : C(K, k)·C(N − K, n − k)/C(N, n)'),
    wrongActions: [{ label: t('Multiplier des probabilités comme pour une binomiale'), rule: 'p_binom_without_replacement', why: t('Sans remise, les tirages ne sont pas indépendants : on compte.') }, { label: urn ? t('Choisir seulement les rouges') : t('Choisir seulement les défectueuses'), rule: 'p_count_forget_rest', why: t('Il faut aussi choisir les autres.') }],
    traps: { p_binom_without_replacement: { values: [ft(binV)] }, p_count_forget_rest: { values: [ft(q(C(r, k), om))].filter((x) => x !== ft(v)), ctx: { k, 'n−k': n - k } } },
    lines: [
      { math: `C(${r};${k})×C(${b};${n - k})/C(${N};${n})`, note: t('{a}, {b}, sur tous les tirages', { a: nbT(k, what), b: nbT(n - k, 'autres') }), subgoal: 'count', blank: [String(k), String(n - k)] },
      { math: `${fa}/${om}`, note: t('Calculer'), blank: [String(om)] },
      ...(v.d === om ? [] : [{ math: ft(v), note: t('Simplifier'), blank: [ft(v)] }]),
    ],
  };
  if (opts.exam === 'mcq') {
    return choice({ skill: HY, level: 4, key: `mcq:${r}:${b}:${n}:${k}`, exam: examTag(opts), prompt: `${story} ${t('Probabilité d\'obtenir exactement {x} ?', { x: nbT(k, what) })}`, right: s(v), wrongs: [{ html: s(binV), rule: 'p_binom_without_replacement' }, { html: s(q(C(r, k), om)), rule: 'p_count_forget_rest' }], fillers: [{ html: s(q(k, n)) }, { html: s(q(fa, om * 2)) }] }, rng);
  }
  const parts = [pk];
  let prompt = `${story} ${t('Probabilité d\'obtenir exactement {x} ?', { x: nbT(k, what) })}`;
  if (level >= 4 && !opts.exam) {
    const p0 = q(C(b, n), om);
    const ge = q(1).sub(p0);
    parts.push({ label: 'Pr(X≥1)', name: 'ge', kind: 'prob', expect: ft(ge), action: t('Complément : 1 − Pr(aucune)'), lines: [{ math: `1-C(${b};${n})/C(${N};${n})`, note: t('Contraire de « aucune »'), subgoal: 'count' }, { math: ft(ge), note: t('Calculer') }] });
    prompt += ` ${t('Puis la probabilité d\'en obtenir au moins une.')}`;
    if (level === 5) {
      parts.push({ label: `Pr(X=${k}|X≥1)`, name: 'c', kind: 'prob', expect: '$pk/$ge', action: t('Conditionner : Pr(X = k)/Pr(X ≥ 1)'), traps: { p_cond_denominator: { values: [ft(v)] } }, lines: [{ math: ratio(v, ge), note: t('{X = {k}} est contenu dans {X ≥ 1}', { k }), subgoal: 'cond' }, { math: ft(v.div(ge)), note: t('Calculer') }] });
      prompt += ` ${t('Enfin, la probabilité d\'en avoir exactement {k} sachant qu\'il y en a au moins une.', { k })}`;
    }
  }
  if (opts.exam === 'coef') return coefItem({ skill: HY, key: `coef:${r}:${b}:${n}:${k}`, prompt, parts, subgoals: HY_SUB, exam: examTag(opts) });
  return statItem({
    skill: HY, level, key: `${level}:${r}:${b}:${n}:${k}`, prompt, parts, subgoals: HY_SUB, exam: examTag(opts),
    simulate: { model: 'urn', balls: { R: r, B: b }, draw: n, replace: false, count: 'R', event: { op: 'eq', k }, answer: v.valueOf(), label: `Pr(X = ${k})` },
    hints: H(t('Sans remise : on compte, on ne multiplie pas des p.'), M(`C(${r};${k})×C(${b};□)/C(${N};${n})`), `Pr(X = ${k}) = ${s(v)}`),
  });
}

export const GEN = { [PM]: pmItem, [BI]: biItem, [PO]: poItem, [HY]: hyItem };
void list;

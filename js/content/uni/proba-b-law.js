// Generators of module P, part b (step U7): quantiles of a continuous law,
// uniform and exponential laws, moments, families of laws. Catalogue:
// docs/universite/P-probabilites.md. Tools: proba-kit.js, proba-b-kit.js;
// traps: js/cas/rules/pb.js.

import { statItem, coefItem, openItem, choice, tf, numCounter, H, SM, examTag } from './proba-kit.js';
import { MT } from './kit.js';
import { q, qt, qs, ql, dx, dl, fr } from './proba-b-kit.js';
import { t } from '../../i18n.js';

const X = (s, v = 'x') => MT(s, { vars: [v] });
const pickOf = (rng, xs) => xs[rng.int(0, xs.length - 1)];
const pq = (x) => (qt(x).includes('/') || qt(x).startsWith('-') ? `(${qt(x)})` : qt(x));
const v6 = (x) => String(Number(x.toFixed(6)));
const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));

// ======================================================================
// p-cont-quantile
// ======================================================================

const CQ = 'p-cont-quantile';
const CQ_SUB = [{ id: 'F', label: t('fonction de répartition'), skill: 'p-cont-density' }, { id: 'solve', label: t('résoudre F(q) = α'), skill: CQ }];
const LEVELS = [{ p: q(1, 4), t: '1/4', w: 'le premier quartile' }, { p: q(1, 2), t: '1/2', w: 'la médiane' }, { p: q(3, 4), t: '3/4', w: 'le quartile supérieur' }, { p: q(9, 10), t: '0,9', w: 'le quantile d\'ordre 0,9' }, { p: q(19, 20), t: '0,95', w: 'le quantile d\'ordre 0,95' }];

function cqLaw(rng, kinds, lev) {
  const kind = pickOf(rng, kinds);
  const p = lev.p.valueOf();
  const P = lev.t.replace(',', '.') === lev.t ? lev.t : lev.t;
  if (kind === 'pow') {
    const k = rng.int(2, 4);
    return { kind, f: `${k}x^${k - 1}`, supp: '0 ≤ x ≤ 1', F: `x^${k}`, Fdom: [0.1, 0.9], value: p ** (1 / k), exact: `(${P})^(1/${k})`, eqT: `q^${k} = ${lev.t}`,
      pdf: p / k <= 1 ? (p / k) ** (1 / (k - 1)) : null, Fp: p ** k, mean: k / (k + 1), hole: P };
  }
  if (kind === 'scale') {
    const a = rng.int(2, 4);
    return { kind, f: a * a === 2 ? 'x' : a % 2 === 0 ? `x/${(a * a) / 2}` : `2x/${a * a}`, supp: `0 ≤ x ≤ ${a}`, F: `x^2/${a * a}`, Fdom: [0.2, a - 0.2], value: a * Math.sqrt(p), exact: `${a}√(${P})`, eqT: `q²/${a * a} = ${lev.t}`,
      pdf: (p * a * a) / 2 <= a ? (p * a * a) / 2 : null, Fp: (p * p) / (a * a), mean: (2 * a) / 3, hole: P };
  }
  if (kind === 'pareto') {
    const al = rng.int(2, 4);
    return { kind, f: `${al}x^(-${al + 1})`, supp: 'x ≥ 1', F: `1-x^(-${al})`, Fdom: [1.1, 5], value: (1 - p) ** (-1 / al), exact: `(1-${P})^(-1/${al})`, eqT: `1 − q^(−${al}) = ${lev.t}`,
      pdf: null, Fp: null, mean: al / (al - 1), hole: P };
  }
  if (kind === 'exp') {
    const lam = pickOf(rng, [q(1, 2), q(1), q(2), q(3)]);
    const L = lam.valueOf();
    return { kind, f: lam.eq(1) ? 'e^(-x)' : `${qt(lam)}e^(-${pq(lam)}x)`, supp: 'x ≥ 0', F: lam.eq(1) ? '1-e^(-x)' : `1-e^(-${pq(lam)}x)`, Fdom: [0.1, 4], value: -Math.log(1 - p) / L,
      exact: lam.eq(1) ? `-ln(1-${P})` : `-ln(1-${P})/${pq(lam)}`, eqT: `1 − e^(−${lam.eq(1) ? '' : qs(lam)}q) = ${lev.t}`,
      pdf: L > p ? Math.log(L / p) / L : null, Fp: 1 - Math.exp(-L * p), mean: 1 / L, hole: P };
  }
  if (kind === 'ray') {
    const th = rng.int(1, 3);
    return { kind, f: `x/${th * th}×e^(-x^2/${2 * th * th})`, supp: 'x ≥ 0', F: `1-e^(-x^2/${2 * th * th})`, Fdom: [0.2, 3 * th], value: th * Math.sqrt(-2 * Math.log(1 - p)),
      exact: `${th === 1 ? '' : th}√(-2ln(1-${P}))`, eqT: `1 − e^(−q²/${2 * th * th}) = ${lev.t}`, pdf: null, Fp: 1 - Math.exp(-(p * p) / (2 * th * th)), mean: th * Math.sqrt(Math.PI / 2), hole: P };
  }
  // unif
  const a = rng.int(0, 5);
  const w = pickOf(rng, [4, 6, 8, 10]);
  return { kind: 'unif', f: `1/${w}`, supp: `${a} ≤ x ≤ ${a + w}`, F: a ? `(x-${a})/${w}` : `x/${w}`, Fdom: [a + 0.2, a + w - 0.2], value: a + p * w, exact: `${a ? `${a}+` : ''}${P}×${w}`,
    eqT: `${a ? `(q − ${a})` : 'q'}/${w} = ${lev.t}`, pdf: null, Fp: null, mean: null, hole: P };
}

function cqTraps(L, lev) {
  const out = {};
  const add = (id, x, ctx) => { if (x !== null && x !== undefined && Number.isFinite(x) && Math.abs(x - L.value) > 0.002) out[id] = { values: [v6(x)], ctx }; };
  add('p_quantile_from_pdf', L.pdf);
  add('p_quantile_inverse', L.Fp, { α: lev.t });
  if (lev.t === '1/2') add('p_median_mean', L.mean, { 'x̄': L.mean === null ? null : dx(L.mean) });
  return out;
}

function cqItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return cqMcq(rng, opts);
  if (opts.exam === 'tf') return cqTf(rng, opts);
  const lev = level === 1 ? pickOf(rng, LEVELS.slice(0, 3)) : pickOf(rng, LEVELS);
  if (level === 5 && rng.chance(0.5)) return cqNormalize(rng, opts);
  const kinds = level <= 2 ? ['pow', 'scale', 'unif'] : level === 5 ? ['ray', 'exp', 'pareto'] : ['pow', 'scale', 'pareto', 'exp', 'unif'];
  const L = cqLaw(rng, kinds, lev);
  const parts = [];
  if (level >= 2 && !opts.exam) {
    parts.push({ label: 'F(x)', name: 'F', kind: 'prob', vars: ['x'], domain: { x: L.Fdom }, expect: L.F, action: t('Intégrer f pour avoir F'), title: t('F(x) pour {s}', { s: L.supp }),
      wrongActions: [{ label: t('Résoudre f(q) = α'), rule: 'p_quantile_from_pdf', why: t('Le quantile se lit sur F (l\'aire cumulée), pas sur la hauteur f.') }],
      lines: [{ math: L.F, subgoal: 'F', blank: [L.F] }] });
  }
  parts.push({
    label: 'q', name: 'q', kind: 'stat', decimals: 3, expect: L.exact, action: t('Résoudre F(q) = α'), traps: cqTraps(L, lev),
    notes: [t('On résout F(q) = {a} : {eq}.', { a: lev.t, eq: L.eqT })],
    decisions: [{ prompt: t('Sur quelle fonction résout-on ?'), levels: [1, 2], options: [
      { id: 'F', label: `F(q) = ${lev.t}`, valid: true },
      { id: 'f', label: `f(q) = ${lev.t}`, valid: false, rule: 'p_quantile_from_pdf', why: t('Le quantile se lit sur F (l\'aire cumulée), pas sur la hauteur f.') },
      { id: 'Fa', label: `q = F(${lev.t})`, valid: false, rule: 'p_quantile_inverse', why: t('On cherche x tel que F(x) = {a}, pas la valeur de F en {a}.', { a: lev.t }) },
    ] }],
    lines: [{ math: L.exact, subgoal: 'solve', blank: [L.hole] }, { math: dl(L.value, 3), blank: [dl(L.value, 3)] }],
  });
  return statItem({
    skill: CQ, level, key: `${level}:${L.kind}:${L.f}:${lev.t}`,
    prompt: level === 1 ? t('X a pour densité {f} pour {s} (et 0 ailleurs), donc {F} sur ce support. Calcule q, {w} de X (au millième).', { f: X(`f(x)=${L.f}`), s: L.supp, F: X(`F(x)=${L.F}`), w: t(lev.w) }) : t('X a pour densité {f} pour {s} (et 0 ailleurs). Calcule q, {w} de X (au millième).', { f: X(`f(x)=${L.f}`), s: L.supp, w: t(lev.w) }),
    parts, subgoals: CQ_SUB, exam: examTag(opts),
    hints: H(t('Un quantile se lit sur F : on résout F(q) = α.'), t('{eq}, donc q = □', { eq: L.eqT }), `q = ${SM(L.exact)} ≈ ${dx(L.value)}`),
  });
}

// Level 5 (EE-209 2023, Q3): c·x on [0 ; a], normalize, then the median.
function cqNormalize(rng, opts) {
  const a = rng.int(2, 4);
  const c = q(2, a * a);
  return statItem({
    skill: CQ, level: 5, key: `5:norm:${a}`,
    prompt: t('X a pour densité {f} pour 0 ≤ x ≤ {a} (et 0 ailleurs). Trouve c, puis la médiane de X (au millième).', { f: X('f(x)=c×x'), a }),
    parts: [
      { label: 'c', name: 'c', kind: 'prob', expect: qt(c), lines: [{ math: `2/${a * a}`, subgoal: 'F' }, ...(qt(c) === `2/${a * a}` ? [] : [{ math: qt(c) }])] },
      { label: 'F(x)', name: 'F', kind: 'prob', vars: ['x'], domain: { x: [0.2, a - 0.2] }, expect: `x^2/${a * a}`, lines: [{ math: `x^2/${a * a}`, subgoal: 'F' }] },
      { label: t('méd'), name: 'q', kind: 'stat', decimals: 3, expect: `${a}/√2`,
        traps: { p_quantile_from_pdf: { values: [v6((a * a) / 4)] }, p_median_mean: { values: [v6((2 * a) / 3)], ctx: { 'x̄': dx((2 * a) / 3) } }, p_quantile_inverse: { values: [v6(1 / (4 * a * a))] } },
        lines: [{ math: `${a}/√2`, subgoal: 'solve' }, { math: dl(a / Math.SQRT2, 3) }] },
    ],
    subgoals: CQ_SUB, exam: examTag(opts), hints: [],
  });
}

function cqMcq(rng, opts) {
  const a = rng.int(2, 4);
  const med = { 2: '√2', 3: '3√2/2', 4: '2√2' }[a];
  return choice({
    skill: CQ, level: 4, key: `mcq:${a}`, exam: examTag(opts),
    prompt: t('X a pour densité f(x) = c·x pour 0 ≤ x ≤ {a} (et 0 ailleurs). Quelle est la médiane de X ?', { a }),
    right: med,
    wrongs: [{ html: qs(q(a * a, 4)), rule: 'p_quantile_from_pdf' }, { html: qs(q(2 * a, 3)), rule: 'p_median_mean' }, { html: qt(q(1, 4 * a * a)), rule: 'p_quantile_inverse' }],
    fillers: [{ html: qs(q(a, 2)) }],
  }, rng);
}

function cqTf(rng, opts) {
  if (rng.chance(0.5)) {
    return tf({ skill: CQ, key: 'median-mean', exam: examTag(opts), truth: false, ruleIfTrue: 'p_median_mean',
      statement: t('La médiane d\'une loi continue est toujours égale à son espérance.'),
      explanation: t('Faux : pour f(x) = 2x sur [0 ; 1], F(x) = x², la médiane vaut 1/√2 ≈ 0,707, mais E[X] = ∫ 2x² dx = 2/3.'),
      counter: numCounter({ vars: [{ v: 'm', label: t('f(x) = 2x sur [0 ; 1] : médiane m =') }, { v: 'w', label: t('espérance E[X] =') }], hyp: '|m-0,7071|<0,001∧w=2/3', pred: 'm=w', answer: { m: '1/√2', w: '2/3' } }) });
  }
  return tf({ skill: CQ, key: 'sym', exam: examTag(opts), truth: true,
    statement: t('Si F est continue et strictement croissante, la médiane m de X vérifie F(m) = 1/2.'),
    explanation: t('Vrai : la médiane est le quantile d\'ordre 1/2, la solution de F(m) = 1/2.') });
}

function cqCoef(rng, opts) {
  const lev = pickOf(rng, LEVELS);
  const L = cqLaw(rng, ['pow', 'scale', 'exp', 'pareto'], lev);
  return coefItem({ skill: CQ, key: `coef:${L.f}:${lev.t}`, exam: { format: 'coef', points: 1 },
    prompt: t('X a pour densité {f} pour {s} (et 0 ailleurs). Calcule {w} (au millième).', { f: X(`f(x)=${L.f}`), s: L.supp, w: t(lev.w) }),
    parts: [{ label: 'q', name: 'q', kind: 'stat', decimals: 3, expect: L.exact, traps: cqTraps(L, lev), lines: [{ math: dl(L.value, 3) }] }], subgoals: CQ_SUB });
}

// ======================================================================
// p-unif-exp
// ======================================================================

const UE = 'p-unif-exp';
const UE_SUB = [{ id: 'cond', label: t('conditionner'), skill: 'p-cond-total' }, { id: 'tail', label: t('F, queue'), skill: UE }];
const MEANS = [2, 5, 10, 20];
const unit = () => 'ans';
const ans = (x) => (x === 1 ? t('1 an') : t('{x} ans', { x: fr(x) }));

function ueItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return ueMcq(rng, opts);
  if (opts.exam === 'tf') return ueTf(rng, opts);
  if (opts.exam === 'coef') return ueCoef(rng);
  const kind = level <= 2 ? pickOf(rng, ['unif', 'exp', 'memo']) : level === 5 ? 'memo' : pickOf(rng, ['unif', 'exp', 'memo', 'median', 'wait']);
  if (kind === 'unif') return ueUnif(level, rng, opts);
  const m = pickOf(rng, MEANS);
  const lam = q(1, m);
  const U = unit(m);
  const lamPart = { label: 'λ', name: 'lam', kind: 'prob', expect: `1/${m}`, action: t('Taux : λ = 1/moyenne'),
    decisions: [{ prompt: t('Le paramètre λ de l\'exponentielle ?'), levels: [1, 2], options: [
      { id: 'inv', label: t('λ = 1/{m} : c\'est un taux, l\'inverse de la moyenne', { m }), valid: true },
      { id: 'mean', label: t('λ = {m}, la moyenne', { m }), valid: false, rule: 'p_exp_rate_mean', why: t('Une moyenne de {m} donne un taux λ = 1/{m}.', { m }) },
    ] }],
    wrongActions: [{ label: `λ = ${m}`, rule: 'p_exp_rate_mean', why: t('Une moyenne de {m} donne un taux λ = 1/{m}.', { m }) }],
    traps: { p_exp_rate_mean: { values: [String(m)], ctx: { m } } },
    lines: [{ math: `1/${m}`, blank: [String(m)], subgoal: 'tail' }] };
  if (kind === 'median') {
    const med = Math.log(2) * m;
    return statItem({ skill: UE, level, key: `${level}:median:${m}`, exam: examTag(opts),
      prompt: t(`La durée de vie X d'un composant suit une loi exponentielle de moyenne {m} ${U}. Calcule sa médiane (au millième).`, { m }),
      parts: [lamPart, { label: t('méd'), name: 'med', kind: 'stat', expect: 'ln(2)/$lam', action: t('Résoudre 1 − e^(−λq) = 1/2'),
        traps: { p_exp_rate_mean: { values: [v6(Math.log(2) / m)], ctx: { m } }, p_median_mean: { values: [String(m)], ctx: { 'x̄': m } } },
        lines: [{ math: `ln(2)×${m}`, blank: ['ln(2)'], subgoal: 'tail' }, { math: dl(med, 3) }] }],
      subgoals: UE_SUB.slice(1), hints: H(t('La médiane vérifie F(q) = 1/2, donc e^(−λq) = 1/2.'), `q = ln(2)/λ = ln(2)·□`, `q = ${dx(med)}`) });
  }
  const x = pickOf(rng, [m / 2, m, 2 * m]);
  const tail = Math.exp(-x / m);
  if (kind === 'exp' || kind === 'wait') {
    const story = kind === 'wait'
      ? t('Les appels arrivent selon un processus de Poisson, en moyenne un appel toutes les {m} minutes. Le temps T avant le premier appel suit une loi exponentielle. Calcule Pr(T > {x}) (au millième).', { m, x: fr(x) })
      : t(`La durée de vie X d'une télévision suit une loi exponentielle de moyenne {m} ${U}. Calcule Pr(X > {x}) (au millième).`, { m, x: fr(x) });
    const V = kind === 'wait' ? 'T' : 'X';
    return statItem({ skill: UE, level, key: `${level}:${kind}:${m}:${x}`, exam: examTag(opts), prompt: story,
      parts: [lamPart, { label: `Pr(${V}>${fr(x)})`, name: 'P', kind: 'stat', expect: `e^(-$lam*${x})`, action: t('Queue : Pr(X > x) = e^(−λx)'),
        traps: { p_exp_rate_mean: { values: [v6(Math.exp(-m * x))], ctx: { m, x: fr(x) } }, p_upper_tail: { values: [v6(1 - tail)] } },
        lines: [{ math: `e^(-${fr(x)}/${m})`, blank: [fr(x)], subgoal: 'tail' }, { math: dl(tail, 3) }] }],
      subgoals: UE_SUB.slice(1), hints: H(t('Pr(X > x) = e^(−λx), et λ = 1/moyenne.'), `e^(−${fr(x)}/□)`, `${dx(tail)}`) });
  }
  // memo: Pr(X > s + t | X > s).
  const s = pickOf(rng, [m / 5, m / 2, m].filter((v) => Number.isInteger(v * 10)));
  const tt = x;
  const A = Math.exp(-(s + tt) / m);
  const B = Math.exp(-s / m);
  const r = Math.exp(-tt / m);
  return statItem({ skill: UE, level, key: `${level}:memo:${m}:${s}:${tt}`, exam: examTag(opts),
    prompt: t('La durée de vie X d\'une télévision suit une loi exponentielle de moyenne {m}. Elle fonctionne déjà depuis {s}. Quelle est la probabilité qu\'elle dure encore au moins {t} (au millième) ?', { m: ans(m), s: ans(s), t: ans(tt) }),
    parts: [lamPart,
      { label: `Pr(X>${fr(s + tt)})`, name: 'A', kind: 'stat', expect: `e^(-$lam*${s + tt})`, action: t('Queue Pr(X > s + t)'), lines: [{ math: `e^(-${fr(s + tt)}/${m})`, subgoal: 'tail', blank: [fr(s + tt)] }, { math: dl(A, 3) }] },
      { label: `Pr(X>${fr(s)})`, name: 'B', kind: 'stat', expect: `e^(-$lam*${s})`, action: t('Queue Pr(X > s)'), lines: [{ math: `e^(-${fr(s)}/${m})`, subgoal: 'tail', blank: [fr(s)] }, { math: dl(B, 3) }] },
      { label: `Pr(X>${fr(s + tt)}|X>${fr(s)})`, name: 'C', kind: 'stat', expect: `e^(-$lam*${tt})`, tol: 0.0015, action: t('Diviser : conditionner'),
        traps: { p_memoryless_ignored: { values: [v6(A)], ctx: { s: fr(s), t: fr(tt) } } },
        wrongActions: [{ label: t('Garder Pr(X > {v})', { v: fr(s + tt) }), rule: 'p_memoryless_ignored', why: t('Il faut diviser par Pr(X > {v}).', { v: fr(s) }) }],
        notes: [t('Absence de mémoire : le résultat est Pr(X > t).')],
        lines: [{ math: `e^(-${fr(s + tt)}/${m})/e^(-${fr(s)}/${m})`, subgoal: 'cond', blank: [`e^(-${fr(s)}/${m})`] }, { math: `e^(-${fr(tt)}/${m})`, subgoal: 'tail' }, { math: dl(r, 3) }] }],
    subgoals: UE_SUB, hints: H(t('Pr(X > s + t | X > s) = Pr(X > s + t)/Pr(X > s) ; pour l\'exponentielle, Pr(X > x) = e^(−λx).'), `e^(−${fr(s + tt)}/${m})/e^(−□/${m})`, `e^(−${fr(tt)}/${m}) ≈ ${dx(r)}`) });
}

function ueUnif(level, rng, opts) {
  const a = pickOf(rng, [0, 0, 5, 10]);
  const w = pickOf(rng, [10, 20, 30, 40, 60].filter((x) => a + x <= 60));
  const b = a + w;
  const tt = a + w * pickOf(rng, [1 / 5, 1 / 2, 2 / 3, 5 / 6, 3 / 4].filter((f) => Number.isInteger(w * f)));
  const P = q(b - tt, w);
  const parts = [
    { label: 'f(x)', name: 'f', kind: 'prob', expect: `1/${w}`, action: t('Densité 1/(b − a)'), lines: [{ math: `1/(${b}-${a})`, subgoal: 'tail', blank: [`${b}-${a}`] }, { math: `1/${w}` }] },
    { label: `Pr(X>${tt})`, name: 'P', kind: 'prob', expect: `$f*(${b}-${tt})`, action: t('Longueur × densité'), lines: [{ math: `(${b}-${tt})/${w}`, subgoal: 'tail', blank: [`${b}-${tt}`] }, ...(qt(P) === `${b - tt}/${w}` ? [] : [{ math: qt(P) }])] },
  ];
  if (level >= 4) {
    parts.push({ label: 'var(X)', name: 'V', kind: 'prob', expect: `${w}^2/12`, action: 'var = (b − a)²/12',
      traps: { p_unif_var: { values: [qt(q(w, 12)), qt(q(w * w, 2))], ctx: { v: qs(q(w * w, 12)) } } },
      lines: [{ math: `${w}^2/12`, subgoal: 'tail' }, { math: qt(q(w * w, 12)) }] });
  }
  return statItem({ skill: UE, level, key: `${level}:unif:${a}:${b}:${tt}`, exam: examTag(opts),
    prompt: level >= 4 ? t('Le temps d\'attente X chez le coiffeur (en minutes) suit une loi uniforme U({a} ; {b}). Calcule la densité, puis Pr(X > {t}) et var(X).', { a, b, t: tt }) : t('Le temps d\'attente X chez le coiffeur (en minutes) suit une loi uniforme U({a} ; {b}). Calcule la densité, puis Pr(X > {t}).', { a, b, t: tt }),
    parts, subgoals: UE_SUB.slice(1),
    hints: H(t('U(a, b) : f = 1/(b − a) sur [a ; b] ; une probabilité est une longueur fois f.'), `Pr(X > ${tt}) = (${b} − □)/${w}`, `Pr(X > ${tt}) = ${qs(P)}`) });
}

function ueMcq(rng, opts) {
  const m = pickOf(rng, MEANS);
  const s = m / 5;
  const tt = m;
  const right = Math.exp(-1);
  if (rng.chance(0.3)) {
    const w = pickOf(rng, [6, 12, 24]);
    return choice({ skill: UE, level: 4, key: `mcq:unif:${w}`, exam: examTag(opts), prompt: t('X ~ U(0 ; {w}). Que vaut var(X) ?', { w }),
      right: qs(q(w * w, 12)), wrongs: [{ html: qs(q(w, 12)), rule: 'p_unif_var' }, { html: qs(q(w * w, 2)), rule: 'p_unif_var' }], fillers: [{ html: qs(q(w, 2)) }, { html: qs(q(w * w, 4)) }] }, rng);
  }
  return choice({ skill: UE, level: 4, key: `mcq:memo:${m}`, exam: examTag(opts),
    prompt: t('X ~ exp de moyenne {m}. Que vaut Pr(X > {a} | X > {b}) ?', { m, a: fr(s + tt), b: fr(s) }),
    right: `e^(−1) ≈ ${dx(right)}`,
    wrongs: [{ html: `e^(−${fr((s + tt) / m)}) ≈ ${dx(Math.exp(-(s + tt) / m))}`, rule: 'p_memoryless_ignored' }, { html: `e^(−${m * tt}) ≈ 0`, rule: 'p_exp_rate_mean' }],
    fillers: [{ html: `1 − e^(−1) ≈ ${dx(1 - right)}` }] }, rng);
}

function ueTf(rng, opts) {
  const m = pickOf(rng, MEANS);
  if (rng.chance(0.5)) {
    return tf({ skill: UE, key: `tv:${m}`, exam: examTag(opts), truth: false, ruleIfTrue: 'p_memoryless_ignored',
      statement: m / 5 >= 2 ? t('La durée de vie d\'une télévision suit une loi exponentielle de moyenne {m} ans. Une télévision qui a déjà {a} ans a moins de chances de durer encore {m} ans qu\'une neuve.', { m, a: String(m / 5).replace(".", ",") }) : t('La durée de vie d\'une télévision suit une loi exponentielle de moyenne {m} ans. Une télévision qui a déjà {a} an a moins de chances de durer encore {m} ans qu\'une neuve.', { m, a: String(m / 5).replace(".", ",") }),
      explanation: t('Faux : Pr(X > {a} | X > {b}) = e^(−{c}/{m}) = Pr(X > {m}) ≈ 0,368 (absence de mémoire).', { a: fr(m / 5 + m), b: fr(m / 5), c: fr(m), m }),
      counter: numCounter({ vars: [{ v: 'u', label: t('Usée : Pr(X > {a} | X > {b}) =', { a: fr(m / 5 + m), b: fr(m / 5) }) }, { v: 'n', label: t('Neuve : Pr(X > {m}) =', { m }) }], hyp: '|u-0,3679|<0,001∧|n-0,3679|<0,001', pred: 'u<n', answer: { u: 'e^(-1)', n: 'e^(-1)' } }) });
  }
  return tf({ skill: UE, key: `mean:${m}`, exam: examTag(opts), truth: true,
    statement: t('Si X ~ exp(λ) avec λ = 1/{m}, alors E[X] = {m}.', { m }), explanation: t('Vrai : E[X] = 1/λ.') });
}

function ueCoef(rng) {
  const m = pickOf(rng, MEANS);
  const x = pickOf(rng, [m / 2, m, 2 * m]);
  return coefItem({ skill: UE, key: `coef:${m}:${x}`, exam: { format: 'coef', points: 1 },
    prompt: t('X suit une loi exponentielle de moyenne {m}. Calcule Pr(X > {x}) au millième.', { m, x: fr(x) }),
    parts: [{ label: `Pr(X>${fr(x)})`, kind: 'stat', expect: `e^(-${x}/${m})`, traps: { p_exp_rate_mean: { values: [v6(Math.exp(-m * x))] } }, lines: [{ math: dl(Math.exp(-x / m), 3) }] }], subgoals: UE_SUB.slice(1) });
}

// ======================================================================
// p-moments
// ======================================================================

const MO = 'p-moments';
const MO_SUB = [{ id: 'int', label: t('intégrales'), skill: 'a1-int-direct' }, { id: 'mom', label: t('moments'), skill: MO }];

function moData(rng, kinds) {
  const kind = pickOf(rng, kinds);
  if (kind === 'disc') {
    for (;;) {
      const n = rng.int(3, 4);
      const xs = rng.shuffle([-1, 0, 1, 2, 3, 4]).slice(0, n).sort((a, b) => a - b);
      const ps = [];
      let left = 10;
      for (let i = 0; i < n - 1; i++) { const p = rng.int(1, left - (n - 1 - i)); ps.push(p); left -= p; }
      ps.push(left);
      if (ps.some((p) => p < 1)) continue;
      const P = ps.map((p) => q(p, 10));
      const E = xs.reduce((s, x, i) => s.add(P[i].mul(x)), q(0));
      const E2 = xs.reduce((s, x, i) => s.add(P[i].mul(x * x)), q(0));
      const pd = (p) => p.toDecimal();
      return { kind, xs, P, E, E2, desc: t('X prend les valeurs {xs} avec les probabilités {ps}.', { xs: xs.map(fr).join(', '), ps: P.map((p) => pd(p)).join(', ') }),
        Elines: [{ math: xs.map((x, i) => `${x < 0 ? `(${x})` : x}×${pd(P[i])}`).join('+'), blank: [`${xs[n - 1]}×${pd(P[n - 1])}`] }, { math: E.toDecimal() ?? qt(E) }],
        E2lines: [{ math: xs.map((x, i) => `${x < 0 ? `(${x})` : x}^2×${pd(P[i])}`).join('+'), blank: [`${xs[n - 1]}^2×${pd(P[n - 1])}`] }, { math: E2.toDecimal() ?? qt(E2) }] };
    }
  }
  if (kind === 'pow') {
    const k = rng.int(1, 5);
    const E = q(k + 1, k + 2);
    const E2 = q(k + 1, k + 3);
    return { kind, k, E, E2, desc: t('X a pour densité {f} sur ]0 ; 1[ (et 0 ailleurs).', { f: X(`f(y)=${k + 1}y^${k}`, 'y') }),
      Elines: fl(k + 1, k + 2, `∫₀¹ ${k + 1}y^${k + 1} dy`), E2lines: fl(k + 1, k + 3, `∫₀¹ ${k + 1}y^${k + 2} dy`) };
  }
  const al = rng.int(3, 5);
  const E = q(al, al - 1);
  const E2 = q(al, al - 2);
  return { kind: 'pareto', al, E, E2, desc: t('X a pour densité {f} pour x ≥ 1 (et 0 ailleurs).', { f: X(`f(x)=${al}x^(-${al + 1})`) }),
    Elines: fl(al, al - 1, `∫₁^∞ ${al}x^(−${al}) dx`), E2lines: fl(al, al - 2, `∫₁^∞ ${al}x^(−${al - 1}) dx`) };
}

// n/d, then its simplified form if it differs.
function fl(n, d, note) {
  const r = qt(q(n, d));
  return [{ math: `${n}/${d}`, blank: [String(d)], note }, ...(r === `${n}/${d}` ? [] : [{ math: r }])];
}

function moItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return moMcq(rng, opts);
  if (opts.exam === 'tf') return moTf(rng, opts);
  if (level === 5 && rng.chance(0.6)) return moExp(rng, opts);
  const d = moData(rng, level <= 2 ? ['pow', 'disc'] : ['pow', 'disc', 'pareto']);
  const V = d.E2.sub(d.E.mul(d.E));
  const wrongV = d.E2.sub(d.E);
  const parts = [
    { label: 'E[X]', name: 'E', kind: 'prob', expect: qt(d.E), action: t('Espérance'),
      decisions: d.kind === 'disc' ? [] : [{ prompt: t('E[X] existe-t-elle ?'), levels: [2, 3, 4], options: [
        { id: 'conv', label: d.kind === 'pareto' ? t('Oui : ∫₁^∞ x·{a}x^(−{b}) dx converge ({a} > 1)', { a: d.al, b: d.al + 1 }) : t('Oui : X est bornée, l’intégrale converge'), valid: true },
        { id: 'always', label: t('Pas besoin de vérifier : toute densité a une espérance'), valid: false, rule: 'p_mean_not_exist', why: t('L’espérance existe seulement si ∫ |x|·f(x) dx converge (Cauchy : non).') },
      ] }],
      lines: d.Elines.map((l, i) => ({ ...l, subgoal: i === 0 ? (d.kind === 'disc' ? 'mom' : 'int') : undefined })) },
    { label: 'E[X²]', name: 'E2', kind: 'prob', expect: qt(d.E2), action: t('Second moment'), lines: d.E2lines.map((l, i) => ({ ...l, subgoal: i === 0 ? (d.kind === 'disc' ? 'mom' : 'int') : undefined })),
      wrongActions: [{ label: 'E[X²] = E[X]²', rule: 'p_g_of_mean', why: t('E[g(X)] se calcule avec g(x)·f(x) ; ce n\'est pas g(E[X]).') }] },
    { label: 'var(X)', name: 'V', kind: 'prob', expect: '$E2-$E^2', action: 'König-Huygens',
      traps: wrongV.eq(V) ? undefined : { p_var_minus_mean: { values: [qt(wrongV)], ctx: { v: qs(wrongV) } } },
      decisions: [{ prompt: t('La variance ?'), levels: [2], options: [
        { id: 'kh', label: 'var(X) = E[X²] − E[X]²', valid: true },
        { id: 'bad', label: 'var(X) = E[X²] − E[X]', valid: false, rule: 'p_var_minus_mean', why: t('C\'est E[X]², au carré.') },
      ] }],
      // E[X] and E[X²] written as their own last lines (5/4, not 1,25).
      lines: [{ math: `${d.E2lines.at(-1)?.math ?? ql(d.E2)}-(${d.Elines.at(-1)?.math ?? ql(d.E)})^2`, blank: [d.Elines.at(-1)?.math ?? ql(d.E)], subgoal: 'mom' }, { math: ql(V) }] },
  ];
  return statItem({ skill: MO, level, key: `${level}:${d.kind}:${qt(d.E)}:${qt(d.E2)}`, exam: examTag(opts),
    prompt: `${d.desc} ${t('Calcule E[X], E[X²] et var(X).')}`, parts, subgoals: MO_SUB,
    hints: H(t('var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)).'), `var(X) = ${qs(d.E2)} − (□)²`, `var(X) = ${qs(V)}`) });
}

// Level 5 (série 7, ex. 2): X ~ exp(λ), E[e^X] and var(e^X), λ > 2.
function moExp(rng, opts) {
  const L = rng.int(3, 5);
  const A = q(L, L - 1);
  const B = q(L, L - 2);
  const V = B.sub(A.mul(A));
  return statItem({ skill: MO, level: 5, key: `5:exp:${L}`, exam: examTag(opts),
    prompt: t('X ~ exp(λ) avec λ = {L}. Calcule E[e^X], E[e^(2X)] et var(e^X).', { L }),
    parts: [
      { label: 'E[e^X]', name: 'A', kind: 'prob', expect: qt(A), traps: { p_g_of_mean: { values: [v6(Math.exp(1 / L))] } }, lines: [{ math: `${L}/(${L}-1)`, subgoal: 'int', note: `∫₀^∞ eˣ·${L}e^(−${L}x) dx` }, { math: qt(A) }] },
      { label: 'E[e^(2X)]', name: 'B', kind: 'prob', expect: qt(B), lines: [{ math: `${L}/(${L}-2)`, subgoal: 'int' }, { math: qt(B) }] },
      { label: 'var(e^X)', name: 'V', kind: 'prob', expect: '$B-$A^2', traps: { p_var_minus_mean: { values: [qt(B.sub(A))] } }, lines: [{ math: `${qt(B)}-(${qt(A)})^2`, subgoal: 'mom' }, { math: qt(V) }] },
    ], subgoals: MO_SUB, hints: [] });
}

function moMcq(rng, opts) {
  if (rng.chance(0.35)) {
    return choice({ skill: MO, level: 4, key: 'mcq:cauchy', exam: examTag(opts),
      prompt: t('X a pour densité f(x) = 1/(π(1 + x²)) sur ℝ (loi de Cauchy). Que vaut E[X] ?'),
      right: t('Elle n\'existe pas'), wrongs: [{ html: t('0, par symétrie'), rule: 'p_mean_not_exist' }], fillers: [{ html: '1/π' }, { html: '1' }] }, rng);
  }
  const d = moData(rng, ['pow', 'disc']);
  const V = d.E2.sub(d.E.mul(d.E));
  return choice({ skill: MO, level: 4, key: `mcq:${d.kind}:${qt(V)}`, exam: examTag(opts), prompt: `${d.desc} ${t('Que vaut var(X) ?')}`,
    right: qs(V), wrongs: [{ html: qs(d.E2.sub(d.E)), rule: 'p_var_minus_mean' }, { html: qs(d.E2), rule: null }],
    fillers: [{ html: qs(d.E.mul(d.E)) }, { html: qs(d.E) }, { html: qs(V.mul(2)) }] }, rng);
}

function moTf(rng, opts) {
  if (rng.chance(0.5)) {
    return tf({ skill: MO, key: 'inv', exam: examTag(opts), truth: false, ruleIfTrue: 'p_g_of_mean',
      statement: t('Pour toute variable X > 0, E[1/X] = 1/E[X].'),
      explanation: t('Faux : X uniforme sur {1 ; 2} donne E[1/X] = (1 + 1/2)/2 = 3/4, mais 1/E[X] = 2/3.'),
      counter: numCounter({ vars: [{ v: 'a', label: t('X uniforme sur {a ; b} : a =') }, { v: 'b', label: 'b =' }], hyp: 'a>0∧b>0', pred: '(1/a+1/b)/2=2/(a+b)', answer: { a: '1', b: '2' } }) });
  }
  return tf({ skill: MO, key: 'kh', exam: examTag(opts), truth: true, statement: t('Si E[X²] existe, var(X) = E[X²] − E[X]².'), explanation: t('Vrai : c\'est la formule de König-Huygens.') });
}

function moCoef(rng) {
  const d = moData(rng, ['pow', 'disc', 'pareto']);
  return coefItem({ skill: MO, key: `coef:${d.kind}:${qt(d.E)}`, exam: { format: 'coef', points: 1 }, prompt: `${d.desc} ${t('Que vaut var(X) ?')}`,
    parts: [{ label: 'var(X)', kind: 'prob', expect: qt(d.E2.sub(d.E.mul(d.E))), traps: { p_var_minus_mean: { values: [qt(d.E2.sub(d.E))] } }, lines: [{ math: qt(d.E2.sub(d.E.mul(d.E))) }] }], subgoals: MO_SUB });
}

// ======================================================================
// p-family
// ======================================================================

const FA = 'p-family';
const FA_SUB = [{ id: 'rec', label: t('reconnaître'), skill: FA }, { id: 'mom', label: 'E, var', skill: 'p-moments' }];
const TH = { vars: ['θ'], domain: { θ: [0.5, 5] } };

function famDecision(right, rule) {
  const all = [{ id: 'gamma', label: 'Gamma' }, { id: 'beta', label: 'Beta' }, { id: 'exp', label: t('Exponentielle') }, { id: 'pareto', label: 'Pareto' }];
  return { prompt: t('Quelle loi reconnais-tu au noyau ?'), levels: [1, 2, 3], options: all.map((o) => ({ ...o, valid: o.id === right, ...(o.id === right ? {} : { why: t('Regarde la forme du noyau : puissances de y et exponentielle, ou puissances de x et de (1 − x).'), rule: rule ?? undefined }) })) };
}

function faGamma(level, rng, opts, numeric) {
  const k = rng.int(2, 5);
  const th = numeric ? pickOf(rng, [q(1, 2), q(2), q(3)]) : null;
  const tht = th ? qt(th) : 'θ';
  const denQ = th ? q(fact(k - 1)).mul(th.pow(k)) : null;
  const den = th ? qt(denQ) : `${fact(k - 1)}θ^${k}`;
  const kern = k === 2 ? 'y' : `y^${k - 1}`;
  // θ = 1/2 is written e^(−2y): the student reads the scale 1/2 from the rate 2.
  const expo = th ? (th.eq(1) ? 'e^(-y)' : th.n === 1 ? `e^(-${th.d}y)` : `e^(-y/${pq(th)})`) : 'e^(-y/θ)';
  const E = th ? qt(th.mul(k)) : `${k}θ`;
  const Vv = th ? qt(th.mul(th).mul(k)) : `${k}θ^2`;
  const exprPart = (o) => (th ? { kind: 'prob', ...o, expect: o.num } : { kind: 'prob', ...TH, ...o, expect: o.sym });
  const parts = [
    { label: 'k', name: 'k', kind: 'prob', expect: String(k), action: t('Lire la forme k (exposant de y, plus 1)'),
      decisions: [famDecision('gamma')],
      traps: { p_gamma_shape_off: { values: [String(k - 1)], ctx: { e: k - 1, 'e+1': k } } },
      wrongActions: [{ label: t('k = {e}, l\'exposant de y', { e: k - 1 }), rule: 'p_gamma_shape_off', why: t('Le noyau est y^(k−1) : l\'exposant {e} donne k = {k}.', { e: k - 1, k }) }],
      lines: [{ math: `${k - 1}+1`, blank: [String(k - 1)], subgoal: 'rec' }, { math: String(k) }] },
    exprPart({ label: 'E[Y]', name: 'E', sym: `${k}θ`, num: E, action: 'E = kθ',
      traps: { p_gamma_scale_rate: { values: [th ? qt(q(k).div(th)) : `${k}/θ`] } },
      lines: [{ math: th ? `${k}×${pq(th)}` : `${k}θ`, subgoal: 'mom', blank: [String(k)] }, ...(th && `${k}×${pq(th)}` !== E ? [{ math: E }] : [])] }),
    exprPart({ label: 'var(Y)', name: 'V', sym: `${k}θ^2`, num: Vv, action: 'var = kθ²',
      traps: { p_gamma_scale_rate: { values: [th ? qt(q(k).div(th.mul(th))) : `${k}/θ^2`] } },
      lines: [{ math: th ? `${k}×${pq(th)}^2` : `${k}θ^2`, subgoal: 'mom', blank: [String(k)] }, ...(th ? [{ math: Vv }] : [])] }),
  ];
  // Level 5 and open (exam 2020–22, ex. 5): the constant checked, Γ(k)θᵏ.
  if (level === 5 && !th) {
    parts.splice(1, 0, { kind: 'prob', ...TH, label: 'Γ(k)θ^k', name: 'G', expect: `${fact(k - 1)}θ^${k}`, action: t('Vérifier la constante'),
      lines: [{ math: `${k - 1}!×θ^${k}`, subgoal: 'rec' }] });
  }
  return {
    skill: FA, level, key: `${level}:gamma:${k}:${tht}`,
    prompt: `${t(th ? 'Y a pour densité {f} pour y ≥ 0.' : 'Y a pour densité {f} pour y ≥ 0 (θ > 0).', { f: X(th && denQ.d > 1 ? `f(y)=${denQ.d}/${denQ.n}×${kern}×${expo}` : `f(y)=(${kern}×${expo})/(${den})`, 'y') })} ${t('Reconnais la loi, puis donne E[Y] et var(Y).')}`,
    parts, subgoals: FA_SUB,
    hints: H(t('Repère la puissance de y et ce qui divise y dans l\'exponentielle : y^(k−1)·e^(−y/θ).'), `Y ~ Γ(□, ${tht})`, `Y ~ Γ(${k}, ${tht}) : E = ${th ? fr(E) : `${k}θ`}, var = ${th ? fr(Vv) : `${k}θ²`}`),
  };
}

function faBeta(level, rng) {
  const a = rng.int(1, 5);
  const b = rng.int(1, 5);
  if (a + b < 3) return faBeta(level, rng);
  const C = fact(a + b - 1) / (fact(a - 1) * fact(b - 1));
  const kern = `${a === 1 ? '' : a === 2 ? 'x' : `x^${a - 1}`}${b === 1 ? '' : b === 2 ? '(1-x)' : `(1-x)^${b - 1}`}` || '1';
  return {
    skill: FA, level, key: `${level}:beta:${a}:${b}`,
    prompt: t('X a pour densité {f} sur [0 ; 1]. Reconnais la loi Beta(α, β), puis donne C et E[X].', { f: X(`f(x)=C×${kern}`) }),
    parts: [
      { label: 'α', name: 'a', kind: 'prob', expect: String(a), action: t('α = exposant de x, plus 1'), decisions: [famDecision('beta')],
        traps: { p_beta_shape_off: { values: [String(a - 1)] } }, lines: [{ math: `${a - 1}+1`, blank: [String(a - 1)], subgoal: 'rec' }, { math: String(a) }] },
      { label: 'β', name: 'b', kind: 'prob', expect: String(b), action: t('β = exposant de (1 − x), plus 1'),
        traps: { p_beta_shape_off: { values: [String(b - 1)] } }, lines: [{ math: `${b - 1}+1`, blank: [String(b - 1)], subgoal: 'rec' }, { math: String(b) }] },
      { label: 'C', name: 'C', kind: 'prob', expect: String(C), action: t('Constante Γ(α + β)/(Γ(α)Γ(β))'),
        lines: [{ math: `${a + b - 1}!/(${a - 1}!×${b - 1}!)`, blank: [`${a + b - 1}!`], subgoal: 'rec' }, { math: String(C) }] },
      { label: 'E[X]', name: 'E', kind: 'prob', expect: qt(q(a, a + b)), action: 'E = α/(α + β)', lines: [{ math: `${a}/(${a}+${b})`, subgoal: 'mom' }, ...(qt(q(a, a + b)) === `${a}/${a + b}` && a + b < 10 ? [{ math: qt(q(a, a + b)) }] : [{ math: qt(q(a, a + b)) }])] },
    ],
    subgoals: FA_SUB,
    hints: H(t('Le noyau d\'une Beta(α, β) est x^(α−1)(1 − x)^(β−1) : ajoute 1 à chaque exposant.'), `Beta(□, ${b})`, `Beta(${a}, ${b}), C = ${C}, E[X] = ${qs(q(a, a + b))}`),
  };
}

function faSum(level, rng) {
  const n = rng.int(2, 5);
  const lam = pickOf(rng, [2, 3, 4]);
  return {
    skill: FA, level, key: `${level}:sum:${n}:${lam}`,
    prompt: t('{vars} sont indépendantes, de loi exp(λ) avec λ = {lam}. Quelle est la loi de leur somme S ? Donne la forme k, l\'échelle θ et E[S].', { vars: n === 2 ? t('X₁ et X₂') : `X₁, …, X${['₂', '₃', '₄', '₅'][n - 2]}`, lam }),
    parts: [
      { label: 'k', name: 'k', kind: 'prob', expect: String(n), action: t('Somme de n exponentielles : Γ(n, 1/λ)'), decisions: [famDecision('gamma')], lines: [{ math: String(n), subgoal: 'rec' }] },
      { label: 'θ', name: 'th', kind: 'prob', expect: `1/${lam}`, action: t('Échelle θ = 1/λ'),
        traps: { p_gamma_scale_rate: { values: [String(lam)] } }, lines: [{ math: `1/${lam}`, subgoal: 'rec', blank: [String(lam)] }] },
      { label: 'E[S]', name: 'E', kind: 'prob', expect: '$k*$th', action: 'E = kθ', lines: [{ math: `${n}×1/${lam}`, subgoal: 'mom' }, { math: qt(q(n, lam)) }] },
    ],
    subgoals: FA_SUB,
    hints: H(t('Une somme de n exponentielles exp(λ) indépendantes suit Γ(n, 1/λ).'), `S ~ Γ(${n}, □)`, `S ~ Γ(${n}, 1/${lam}), E[S] = ${qs(q(n, lam))}`),
  };
}

function faChi(level, rng) {
  const r = 2 * rng.int(1, 5);
  return {
    skill: FA, level, key: `${level}:chi:${r}`,
    prompt: t('X ~ χ²({r}). Écris-la comme une loi Gamma (forme k, échelle θ), puis donne E[X] et var(X).', { r }),
    parts: [
      { label: 'k', name: 'k', kind: 'prob', expect: String(r / 2), action: 'χ²(r) = Γ(r/2, 2)', lines: [{ math: `${r}/2`, subgoal: 'rec' }, { math: String(r / 2) }] },
      { label: 'θ', name: 'th', kind: 'prob', expect: '2', action: t('Échelle 2'), traps: { p_gamma_scale_rate: { values: ['1/2'] } }, lines: [{ math: '2', subgoal: 'rec' }] },
      { label: 'E[X]', name: 'E', kind: 'prob', expect: '$k*$th', action: 'E = kθ', lines: [{ math: `${r / 2}×2`, subgoal: 'mom' }, { math: String(r) }] },
      { label: 'var(X)', name: 'V', kind: 'prob', expect: '$k*$th^2', action: 'var = kθ²', lines: [{ math: `${r / 2}×2^2`, subgoal: 'mom' }, { math: String(2 * r) }] },
    ],
    subgoals: FA_SUB,
    hints: H('χ²(r) = Γ(r/2, 2) : E = kθ, var = kθ².', `Γ(□, 2)`, `Γ(${r / 2}, 2) : E = ${r}, var = ${2 * r}`),
  };
}

function faItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return faMcq(rng, opts);
  if (opts.exam === 'tf') return faTf(rng, opts);
  if (opts.exam === 'coef') {
    const o = faGamma(4, rng, opts, true);
    return coefItem({ ...o, prompt: o.prompt.replace(t('Reconnais la loi, puis donne E[Y] et var(Y).'), t('Que vaut E[Y] ?')), exam: { format: 'coef', points: 1 }, parts: o.parts.slice(1, 2) });
  }
  if (opts.exam === 'open') {
    const o = faGamma(5, rng, opts, false);
    return openItem({ ...o, exam: { format: 'open', points: 10 } }, 10, rng);
  }
  const kind = level <= 2 ? pickOf(rng, ['gamma', 'beta']) : level === 5 ? 'gamma' : pickOf(rng, ['gamma', 'gammanum', 'beta', 'sum', 'chi']);
  const o = kind === 'gamma' ? faGamma(level, rng, opts, false) : kind === 'gammanum' ? faGamma(level, rng, opts, true) : kind === 'beta' ? faBeta(level, rng) : kind === 'sum' ? faSum(level, rng) : faChi(level, rng);
  return statItem({ ...o, exam: examTag(opts) });
}

function faMcq(rng, opts) {
  const k = rng.int(2, 5);
  return choice({ skill: FA, level: 4, key: `mcq:${k}`, exam: examTag(opts),
    prompt: t('Y a pour densité f(y) ∝ {k}·e^(−y/θ) pour y ≥ 0 (θ > 0). Que vaut E[Y] ?', { k: `y${k - 1 === 1 ? '' : `^${k - 1}`}` }),
    right: `${k}θ`, wrongs: [{ html: `${k}/θ`, rule: 'p_gamma_scale_rate' }, { html: k === 2 ? 'θ' : `${k - 1}θ`, rule: 'p_gamma_shape_off' }], fillers: [{ html: `${k}θ²` }, { html: 'θ' }] }, rng);
}

function faTf(rng, opts) {
  if (rng.chance(0.5)) {
    return tf({ skill: FA, key: 'chi2', exam: examTag(opts), truth: true, statement: t('La loi χ²(2) est une loi exponentielle.'), explanation: t('Vrai : χ²(2) = Γ(1, 2), c\'est-à-dire exp(1/2).') });
  }
  return tf({ skill: FA, key: 'sum', exam: examTag(opts), truth: false, ruleIfTrue: 'p_gamma_shape_off',
    statement: t('Si X₁ et X₂ sont indépendantes de loi exp(1), alors X₁ + X₂ suit la loi exp(2).'),
    explanation: t('Faux : X₁ + X₂ ~ Γ(2, 1), d\'espérance 2, alors qu\'une exp(2) a pour espérance 1/2.'),
    counter: numCounter({ vars: [{ v: 'a', label: 'E[X₁ + X₂] =' }, { v: 'b', label: t('Espérance de la loi exp(2) :') }], hyp: 'a=2∧b=1/2', pred: 'a=b', answer: { a: '2', b: '1/2' } }) });
}

export const GEN = {
  [CQ]: (level, rng, profile, opts = {}) => (opts.exam === 'coef' ? cqCoef(rng, opts) : cqItem(level, rng, profile, opts)),
  [UE]: ueItem,
  [MO]: (level, rng, profile, opts = {}) => (opts.exam === 'coef' ? moCoef(rng) : moItem(level, rng, profile, opts)),
  [FA]: faItem,
};

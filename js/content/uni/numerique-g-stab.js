// n-ode-stability (module N, part g, step U9): absolute stability on
// u′ = λu. Catalogue: docs/universite/N-analyse-numerique.md, n-ode-stability.
//
// Data: λ ∈ {−2, −5, −10, −20, −50, −100} (2/|λ| decimal); schemes EP, Heun
// (conditionally stable, h < 2/|λ|), ER, CN (always); θ-method with θ ∈
// {0, 1/4, 1/3} (h < 2/((1 − 2θ)|λ|)) or {1/2, 2/3, 1} (always); 2 × 2
// systems with eigenvalues a ± b (real, negative) or −a ± bi.
// The condition |R(hλ)| < 1 is a line of the judge solset in h on ]0 ; +∞[;
// the final form is ]0 ; h_max[ or ]0 ; +∞[.
// L1 R given (guided); L2 choose R(z) (decision, with the trap 1 − hλ), then
// the condition; L3 sort the schemes (several answers); L4 the θ-method,
// or a system (each eigenvalue counts); L5 the stiff table u′ = −50(u − cos t)
// to read (EP explodes for h > 0,04, ER does not).
// Exam: mcq (the interval of EP, or the θ-method); tf (Heun inconditionally
// stable: counter-example z = hλ = −3; or « ER stable donc précis »).

import { Q } from '../../math/rational.js';
import { linesItem, mcq, tfItem, examTag } from './kit.js';
import { mcqDistinct } from './alglin-kit.js';
import { readtableItem, multiMcq, vfMcq, H, blankBy } from './numerique-kit.js';
import { nice, R, q, stiffTable, e4, hShow } from './numerique-g-kit.js';
import { t } from '../../i18n.js';

const ST = 'n-ode-stability';
const SUB = [
  { id: 'factor', label: 'uₙ₊₁ = R(hλ)·uₙ', skill: ST },
  { id: 'ineq', label: '|R(hλ)| < 1', skill: ST },
  { id: 'implicit', label: t('stabilité d\'un schéma implicite'), skill: ST },
  { id: 'modes', label: t('valeurs propres d\'un système'), skill: 'm-ode-modes' },
  { id: 'schemes', label: t('les schémas et leur R(z)'), skill: 'n-ode-rk' },
];
const KEYS = ['calc'];
const CFG = { kind: 'solset', v: 'h', domain: ']0 ; +∞[' };
const LAMBDAS = [-2, -5, -10, -20, -50, -100];
// The lines of the judge solset scan h with a step of 0,04: h_max ≥ 0,1.
const SOLSET_LAMBDAS = [-2, -5, -10, -20];

// c·h with c a positive Q: 20h, (5/2)h, h.
const ch = (c) => (c.eq(1) ? 'h' : c.d === 1 ? `${c.n}h` : `(${c})h`);
const SCHEMES = {
  EP: { name: t('Euler progressif'), R: '1 + z', cond: true, start: (a) => `|1-${ch(a)}|<1` },
  Heun: { name: 'Heun', R: '1 + z + z²/2', cond: true, start: (a) => `|1-${ch(a)}+${ch(a.mul(a).div(2)).replace(/h$/, 'h^2')}|<1` },
  ER: { name: t('Euler rétrograde'), R: '1/(1 − z)', cond: false, start: (a) => `|1/(1+${ch(a)})|<1` },
  CN: { name: 'Crank-Nicolson', R: '(1 + z/2)/(1 − z/2)', cond: false, start: (a) => `|(1-${ch(a.div(2))})/(1+${ch(a.div(2))})|<1` },
};
const interval = (hmax) => (hmax ? `]0 ; ${hmax}[` : ']0 ; +∞[');

function stabData(rng, kinds) {
  const lam = rng.pick(SOLSET_LAMBDAS);
  const s = rng.pick(kinds);
  const a = q(-lam);
  const hmax = SCHEMES[s].cond ? q(2).div(a) : null;
  return { lam, a, s, S: SCHEMES[s], hmax, start: SCHEMES[s].start(a) };
}

// ---------- L1: R given ----------

function level1(rng) {
  const d = stabData(rng, ['EP', 'EP', 'ER', 'CN']);
  const script = [{ kind: 'note', html: t('{name} : uₙ₊₁ = R(hλ)·uₙ avec R(z) = {R}. Ici hλ = {lam}h.', { name: d.S.name, R: d.S.R, lam: R(d.lam) }) }];
  if (d.s === 'EP') {
    const mid = `-1<1-${ch(d.a)}<1`;
    script.push(
      { kind: 'eq', math: mid, ...blankBy(mid, [`1-${ch(d.a)}`]), note: '|x| < 1 ⇔ −1 < x < 1', subgoal: 'ineq' },
      { kind: 'eq', math: `0<h<${d.hmax}`, ...blankBy(`0<h<${d.hmax}`, [String(d.hmax)]), note: `−2 < −${d.a}h < 0`, subgoal: 'ineq' },
      { kind: 'eq', math: interval(d.hmax), note: 'h < 2/|λ|', subgoal: 'ineq' },
    );
  } else {
    script.push({ kind: 'eq', math: interval(null), ...blankBy(interval(null), [interval(null)]), note: t('Le dénominateur est > 1 pour tout h > 0 : |R| < 1 toujours'), subgoal: 'implicit' });
  }
  return linesItem({
    skill: ST, level: 1, mode: 'guided', keys: ['calc', 'set'],
    prompt: t('{name} sur u′ = λu avec λ = {lam}. Pour quels pas h > 0 le schéma est-il absolument stable ?', { name: d.S.name, lam: R(d.lam) }),
    start: d.start, judge: CFG, script,
    hints: H(t('Le schéma est stable si |R(hλ)| &lt; 1 : résous cette inégalité en h > 0.'),
      d.s === 'EP' ? `−1 &lt; 1 − ${d.a}h &lt; 1 ⇔ 0 &lt; h &lt; □` : t('1 + □·h > 1 pour tout h > 0'),
      `h ∈ ${interval(d.hmax)}.`),
    subgoals: SUB, key: `${ST}:1:${d.s}:${d.lam}`, baits: [],
  });
}

// ---------- L2: choose R(z) ----------

function level2(rng) {
  const d = stabData(rng, ['EP', 'Heun', 'ER', 'CN']);
  const options = [{ id: d.s, label: `R(z) = ${d.S.R}`, valid: true, ref: true }];
  for (const k of rng.shuffle(Object.keys(SCHEMES).filter((x) => x !== d.s)).slice(0, 2)) {
    options.push({ id: k, label: `R(z) = ${SCHEMES[k].R}`, valid: false, why: t('C\'est le facteur de {v1}.', { v1: SCHEMES[k].name }) });
  }
  if (d.s === 'EP') options.push({ id: 'sign', label: 'R(z) = 1 − z', valid: false, rule: 'n_stab_lambda_sign', why: 'uₙ₊₁ = uₙ + hλuₙ : R = 1 + hλ.' });
  else options.push({ id: 'sign', label: 'R(z) = 1 − z', valid: false, rule: 'n_stab_lambda_sign', why: t('Avec λ &lt; 0, 1 − z = 1 + h|λ| > 1 : ce n\'est le facteur d\'aucun schéma du cours.') });
  const decision = { kind: 'decision', prompt: t('{name} sur u′ = λu donne uₙ₊₁ = R(z)·uₙ avec z = hλ. Quel est R(z) ?', { name: d.S.name }), options: rng.shuffle(options) };
  const script = [decision];
  if (d.hmax) script.push({ kind: 'eq', math: `0<h<${d.hmax}`, ...blankBy(`0<h<${d.hmax}`, [String(d.hmax)]), note: d.s === 'EP' ? '−2 < hλ < 0' : '|1 + z + z²/2| < 1 ⇔ −2 < z < 0', subgoal: 'ineq' });
  script.push({ kind: 'eq', math: interval(d.hmax), ...(d.hmax ? {} : blankBy(interval(null), [interval(null)])), note: d.hmax ? 'h < 2/|λ|' : t('Stable pour tout h > 0'), subgoal: d.hmax ? 'ineq' : 'implicit' });
  return linesItem({
    skill: ST, level: 2, mode: 'guided', keys: ['calc', 'set'],
    prompt: t('{name} sur u′ = λu, λ = {lam}. Choisis R(z), puis donne les pas h > 0 qui rendent le schéma stable.', { name: d.S.name, lam: R(d.lam) }),
    start: d.start, judge: CFG, script,
    hints: H(t('Écris un pas du schéma sur u′ = λu : uₙ₊₁ = R(hλ)·uₙ.'),
      `|R(${R(d.lam)}h)| &lt; 1 ⇔ h ∈ ]0 ; □[`,
      `R(z) = ${d.S.R} ; h ∈ ${interval(d.hmax)}.`),
    subgoals: SUB, key: `${ST}:2:${d.s}:${d.lam}`, baits: ['n_stab_lambda_sign'],
  });
}

// ---------- L3: sort the schemes ----------

const THETAS = [[0, 1], [1, 4], [1, 3], [1, 2], [2, 3], [1, 1]];

function level3(rng) {
  const [tn, td] = rng.pick(THETAS.filter(([n, dd]) => n !== 0 && !(n === 1 && dd === 1)));
  const th = q(tn, td);
  const thetaOk = th.valueOf() >= 0.5;
  const options = [
    { html: t('Euler rétrograde'), correct: true },
    { html: 'Crank-Nicolson', correct: true },
    { html: t('Euler progressif'), correct: false, rule: 'n_stab_factor2' },
    { html: 'Heun', correct: false },
    { html: t('la θ-méthode avec θ = {th}', { th }), correct: thetaOk },
  ];
  const question = multiMcq({
    skill: ST, level: 3, key: `${ST}:sort:${th}`,
    prompt: t('Sur u′ = λu avec λ &lt; 0, quels schémas sont stables pour tout pas h > 0 ?'),
    options,
    solution: [{ html: t('ER : R = 1/(1 − z) et CN : R = (1 + z/2)/(1 − z/2) ont |R| &lt; 1 pour tout z &lt; 0. EP (1 + z) et Heun (1 + z + z²/2) demandent h &lt; 2/|λ|. La θ-méthode est inconditionnellement stable si et seulement si θ ≥ 1/2 ; ici θ = {th}.', { th }), note: '' }],
  }, rng);
  return readtableItem({
    skill: ST, level: 3, key: `sort:${th}`, prompt: t('Classe les schémas.'), table: null, question,
    hints: H(t('Écris R(z) pour chaque schéma et regarde si |R(z)| &lt; 1 pour tout z &lt; 0.'), t('θ-méthode : R(z) = (1 + (1 − θ)z)/(1 − θz) ; inconditionnellement stable ⇔ θ ≥ □'), t('Stables pour tout h : ER, CN, et la θ-méthode si θ ≥ 1/2.')),
    subgoals: SUB,
  });
}

// ---------- L4: θ-method or a system ----------

function thetaLevel(rng, level) {
  const [tn, td] = rng.pick(THETAS);
  const th = q(tn, td);
  const ok = th.valueOf() >= 0.5;
  // λ such that h_max = 2/((1 − 2θ)|λ|) is a short decimal.
  const lam = rng.pick(ok ? SOLSET_LAMBDAS : SOLSET_LAMBDAS.filter((l) => q(2).div(q(1).sub(th.mul(2)).mul(-l)).toDecimal()));
  const a = q(-lam);
  const hmax = ok ? null : q(2).div(q(1).sub(th.mul(2)).mul(a));
  const num = q(1).sub(th).mul(a);
  const den = th.mul(a);
  const start = th.n === 0 ? `|1-${ch(a)}|<1` : `|(1-${ch(num)})/(1+${ch(den)})|<1`;
  return linesItem({
    skill: ST, level, mode: 'free', keys: ['calc', 'set'],
    prompt: t('θ-méthode : uₙ₊₁ = uₙ + h[(1 − θ)f(tₙ, uₙ) + θf(tₙ₊₁, uₙ₊₁)], avec θ = {th}, sur u′ = λu, λ = {lam}. Pour quels pas h > 0 est-elle stable ?', { th, lam: R(lam) }),
    start, judge: CFG,
    script: [
      { kind: 'note', html: `R(z) = (1 + (1 − θ)z)/(1 − θz), z = hλ = ${R(lam)}h.` },
      {
        kind: 'decision', prompt: t('θ = {th} : la méthode est-elle stable pour tout h > 0 ?', { th }), options: [
          { id: 'yes', label: t('Oui (θ ≥ 1/2)'), valid: ok, ...(ok ? { ref: true } : { why: t('θ = {th} &lt; 1/2 : pour z → −∞, R(z) → −(1 − θ)/θ, de module > 1.', { th }) }) },
          { id: 'no', label: t('Non, il faut h assez petit (θ < 1/2)'), valid: !ok, ...(!ok ? { ref: true } : { why: t('θ = {th} ≥ 1/2 : |R(z)| &lt; 1 pour tout z &lt; 0.', { th }) }) },
        ],
      },
      { kind: 'eq', math: interval(hmax), note: ok ? t('Inconditionnellement stable') : `h < 2/((1 − 2θ)|λ|) = ${nice(hmax)}`, subgoal: ok ? 'implicit' : 'ineq' },
    ],
    hints: H(t('θ ≥ 1/2 : stable pour tout h ; sinon h &lt; 2/((1 − 2θ)|λ|).'), `2/((1 − 2·${th})·${a}) = □`, `h ∈ ${interval(hmax)}.`),
    subgoals: SUB, key: `${ST}:th:${level}:${th}:${lam}`, baits: [],
  });
}

function systemLevel(rng, level) {
  if (rng.chance(0.5)) {
    const a = rng.pick([1, 2]);
    const b = rng.pick([1, 2, 3]);
    const hmax = q(2 * a, a * a + b * b);
    const A = `[[${-a}, ${b}], [${-b}, ${-a}]]`;
    return linesItem({
      skill: ST, level, mode: level >= 5 ? 'free' : 'free', keys: ['calc', 'set'], noHints: level >= 5,
      prompt: t('Système u′ = Au avec A = {A}, de valeurs propres {v1} ± {v2}i. Pour quels pas h > 0 Euler progressif est-il stable ?', { A: R(A), v1: R(-a), v2: b === 1 ? '' : b }),
      start: `(1-${ch(q(a))})^2+(${b}h)^2<1`, judge: CFG,
      script: [
        { kind: 'note', html: t('Chaque valeur propre compte : |1 + hλ|² = (1 − {a}h)² + ({b}h)² &lt; 1.', { a, b }) },
        { kind: 'eq', math: interval(hmax), note: `h < 2a/(a² + b²) = ${nice(hmax)}`, subgoal: 'ineq' },
      ],
      hints: H(t('Pour un système, EP est stable si |1 + hλᵢ| &lt; 1 pour chaque valeur propre λᵢ (complexe : module).'), `(1 − ${a}h)² + ${b * b}h² &lt; 1 ⇔ h(${a * a + b * b}h − □) &lt; 0`, `h ∈ ${interval(hmax)}.`),
      subgoals: SUB, key: `${ST}:sysc:${a}:${b}`, baits: [],
    });
  }
  const a = rng.pick([-3, -5, -6]);
  const b = rng.pick([1, 2]);
  const l1 = a + b;
  const l2 = a - b;
  const hmax = q(2, -l2);
  const A = `[[${a}, ${b}], [${b}, ${a}]]`;
  return linesItem({
    skill: ST, level, mode: 'free', keys: ['calc', 'set', 'greek'], noHints: level >= 5,
    prompt: t('Système u′ = Au avec A = {A}. Trouve les valeurs propres, puis les pas h > 0 pour lesquels Euler progressif est stable.', { A: R(A) }),
    start: `(${a}-λ)^2-${b * b}=0`, judge: { kind: 'solset', v: 'λ' },
    script: [
      { kind: 'eq', math: `{${l2} ; ${l1}}`, note: 'det(A − λI) = 0', subgoal: 'modes' },
      { kind: 'segment', html: t('Chaque valeur propre doit vérifier |1 + hλᵢ| &lt; 1.'), ask: 'h ∈', start: { math: `|1-${ch(q(-l1))}|<1 et |1-${ch(q(-l2))}|<1` }, judge: CFG },
      { kind: 'eq', math: interval(hmax), note: t('La plus grande, |λ| = {v1}, impose h < 2/{v1}', { v1: -l2 }), subgoal: 'ineq' },
    ],
    hints: H(t('Les valeurs propres de A, puis |1 + hλᵢ| &lt; 1 pour chacune.'), `λ = ${a} ± ${b} ; h &lt; 2/□`, `λ ∈ {${R(l2)} ; ${R(l1)}}, h ∈ ${interval(hmax)}.`),
    subgoals: SUB, key: `${ST}:sysr:${a}:${b}`, baits: [],
  });
}

// ---------- L5: the stiff table ----------

export function stiffReadtable(rng, skill, level, mode = 'stab') {
  const T = stiffTable();
  const table = {
    columns: ['N', 'h', t('Euler progressif'), t('Euler rétrograde')],
    rows: T.map((r) => [String(r.N), hShow(r.h), e4(r.EP), e4(r.ER)]),
  };
  const prompt = t('u′ = −50(u − cos t), u(0) = 0, sur [0 ; 1]. Valeur uₙ obtenue en t = 1 avec N pas (la solution exacte vaut ≈ 5,57·10⁻¹) :');
  return { T, table, prompt };
}

function level5(rng) {
  const { table, prompt } = stiffReadtable(rng);
  const question = multiMcq({
    skill: ST, level: 5, key: `${ST}:stiff`,
    prompt: t('Que montre ce tableau ?'),
    options: [
      { html: t('Euler progressif est instable pour h > 2/50 = 0,04'), correct: true },
      { html: t('Euler rétrograde est stable pour tout h'), correct: true },
      { html: t('Euler progressif est d\'ordre 0 pour h = 0,05'), correct: false, rule: 'n_stab_order_confused' },
      { html: t('Euler progressif explose parce que sa précision est insuffisante : il suffit de diminuer la tolérance'), correct: false, rule: 'n_stiff_accuracy' },
    ],
    solution: [{ html: t('Pour h = 0,05 et 0,0417 > 0,04, |1 − 50h| > 1 et EP explose ; pour h = 0,0385 &lt; 0,04, il est stable mais oscille encore. ER reste proche de 0,557 pour tout h. Ce tableau mesure la stabilité, pas l\'ordre.'), note: '' }],
  }, rng);
  return readtableItem({ skill: ST, level: 5, key: 'stiff', prompt, table, question, subgoals: SUB });
}

// ---------- exam ----------

function examMcq(rng, opts) {
  if (rng.chance(0.5)) {
    const lam = rng.pick(LAMBDAS);
    const a = q(-lam);
    return mcqDistinct({
      skill: ST, level: 4, key: `${ST}:mcq:${lam}`, exam: examTag(opts),
      prompt: t('Euler progressif sur u′ = λu avec λ = {lam} est absolument stable si et seulement si', { lam: R(lam) }),
      right: `0 &lt; h &lt; ${nice(q(2).div(a))}`,
      wrongs: [{ html: `0 &lt; h &lt; ${nice(q(1).div(a))}`, rule: 'n_stab_factor2' }, { html: t('aucun h > 0 ne convient'), rule: 'n_stab_lambda_sign' }, { html: t('h > 0 quelconque'), rule: null }],
      fillers: [{ html: `0 &lt; h &lt; ${nice(a.mul(2))}` }],
      solution: [{ html: `uₙ₊₁ = (1 + hλ)uₙ ; |1 − ${a}h| &lt; 1 ⇔ 0 &lt; h &lt; 2/${a} = ${nice(q(2).div(a))}.`, note: '' }],
    }, rng);
  }
  return mcq({
    skill: ST, level: 4, key: `${ST}:mcq:theta`, exam: examTag(opts),
    prompt: t('La θ-méthode uₙ₊₁ = uₙ + h[(1 − θ)f(tₙ, uₙ) + θf(tₙ₊₁, uₙ₊₁)] est stable pour tout h > 0 sur u′ = λu (λ &lt; 0) si et seulement si'),
    options: [
      { html: 'θ ≥ 1/2', correct: true },
      { html: 'θ ≤ 1/2', correct: false },
      { html: t('θ = 1 seulement (Euler rétrograde)'), correct: false },
      { html: t('θ = 1/2 seulement (Crank-Nicolson)'), correct: false },
    ],
    solution: [{ html: t('R(z) = (1 + (1 − θ)z)/(1 − θz) ; |R(z)| &lt; 1 pour tout z &lt; 0 ⇔ θ ≥ 1/2. Pour θ &lt; 1/2 : h &lt; 2/((1 − 2θ)|λ|).'), note: '' }],
  }, rng);
}

function examTf(rng, opts) {
  if (rng.chance(0.5)) {
    return tfItem({
      skill: ST, level: 4, key: 'heun', exam: examTag(opts),
      statement: t('La méthode de Heun est inconditionnellement stable sur u′ = λu, λ &lt; 0.'),
      truth: false,
      counter: { kind: 'num', prop: 'heunUnstable', params: {}, ask: [{ v: 'z', label: 'z = hλ =' }], answer: { z: '-3' } },
      explanation: t('Faux : R(z) = 1 + z + z²/2 ; pour z = hλ = −3, R = 2,5 et |uₙ| grandit. Heun est stable seulement si h &lt; 2/|λ|.'),
    });
  }
  return vfMcq({
    skill: ST, key: `${ST}:tf:er`, exam: examTag(opts), truth: false, ruleIfTrue: 'n_stab_order_confused',
    statement: t('Euler rétrograde est stable pour tout h > 0 ; donc son erreur est petite pour tout h.'),
    explanation: t('Faux : stable ne veut pas dire précis. Euler rétrograde reste d\'ordre 1 : son erreur est de l\'ordre de h.'),
  }, rng);
}

export const GEN = {
  [ST]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return examMcq(rng, opts);
    if (opts.exam === 'tf') return examTf(rng, opts);
    switch (level) {
      case 1: return level1(rng);
      case 2: return level2(rng);
      case 3: return level3(rng);
      case 4: return rng.chance(0.5) ? thetaLevel(rng, 4) : systemLevel(rng, 4);
      default: return level5(rng);
    }
  },
};

export { Q };

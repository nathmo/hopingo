// Generators of module P, part d: tests (step U7) — p-test-setup,
// p-test-power, p-test-z, p-test-t1, p-test-t2, p-test-two-prop. Catalogue:
// docs/universite/P-probabilites.md (protocol of a test, convention 7).
// Tools: proba-kit.js, proba-d-kit.js; traps: js/cas/rules/pd.js (and the
// interpretation traps of part e, p_upper_tail of part b, p_sd_n of part a).
//
// Protocol: decisions (which test, H₀ / H₁ and side) before the first part,
// the parts of the calculation (named values, errors carried forward), the
// statistic, the critical value or the p-value, then « Conclure et
// interpréter »: the decision at level α and its meaning are one multiple
// choice asked after the last line (final.interpret).

import { statItem, coefItem, openItem, choice, tf, numCounter, H, SM, examTag } from './proba-kit.js';
import { dataSet, sqDevs, tq, tqText, testConclusion, ciInterpret, quantileDecision, dec, val, sc, list } from './proba-d-kit.js';
import { Phi, roundTo, phiTable, fInv } from '../../cas/stats.js';

const pick = (rng, xs) => xs[rng.int(0, xs.length - 1)];
const phiT = (z) => (z >= 0 ? (phiTable(roundTo(z, 3)) ?? roundTo(Phi(z), 3)) : 1 - (phiTable(roundTo(-z, 3)) ?? roundTo(Phi(-z), 3)));
const grid = (rng, lo, hi) => roundTo(rng.int(Math.round(lo / 0.025), Math.round(hi / 0.025)) * 0.025, 3);

// ======================================================================
// p-test-setup
// ======================================================================

const TS = 'p-test-setup';
const TS_SUB = [
  { id: 'hyp', label: 'hypothèses, côté, région, p-valeur', skill: TS },
  { id: 'phi', label: 'lecture de Φ', skill: 'p-normal-std' },
];
// {q: question, par, v0 (shown), side: right | left | two, claim (H₀ in words)}
const SCEN = [
  { q: 'La proportion p d’unités défectueuses d’une ligne de production dépasse-t-elle 1/1 000 ?', par: 'p', v0: '1/1 000', side: 'right', claim: 'la proportion de défauts vaut 1/1 000' },
  { q: 'Un nouveau médicament raccourcit-il la durée moyenne μ de guérison, qui était de 7 jours ?', par: 'μ', v0: '7', side: 'left', claim: 'la durée moyenne vaut 7 jours' },
  { q: 'Une pièce de monnaie est-elle truquée (p = probabilité de pile) ?', par: 'p', v0: '1/2', side: 'two', claim: 'la pièce est équilibrée' },
  { q: 'Des compteurs électriques mesurent-ils juste en moyenne (moyenne nominale 1 000 kWh) ?', par: 'μ', v0: '1 000', side: 'two', claim: 'la moyenne vaut 1 000 kWh' },
  { q: 'La teneur moyenne μ en alcool d’une boisson dépasse-t-elle la limite de 0,5 % ?', par: 'μ', v0: '0,5', side: 'right', claim: 'la teneur moyenne vaut 0,5 %' },
  { q: 'Le « oui » l’emporte-t-il au référendum (p = part des oui) ?', par: 'p', v0: '1/2', side: 'right', claim: 'la part des oui vaut 1/2' },
  { q: 'Le filtre anti-spam laisse-t-il passer moins de 5 % des spams (p = part des spams non filtrés) ?', par: 'p', v0: '0,05', side: 'left', claim: 'la part des spams non filtrés vaut 5 %' },
  { q: 'L’alcool allonge-t-il le temps de réaction moyen μ, qui est de 0,8 s à jeun ?', par: 'μ', v0: '0,8', side: 'right', claim: 'le temps moyen vaut 0,8 s' },
  { q: 'Une machine remplit-elle bien les paquets à 500 g en moyenne ?', par: 'μ', v0: '500', side: 'two', claim: 'la moyenne vaut 500 g' },
  { q: 'Une nouvelle méthode augmente-t-elle le taux de réussite p, qui était de 0,7 ?', par: 'p', v0: '0,7', side: 'right', claim: 'le taux de réussite vaut 0,7' },
  { q: 'Un radar de détection des tumeurs manque-t-il moins de 10 % des tumeurs (p = part manquée) ?', par: 'p', v0: '0,1', side: 'left', claim: 'la part manquée vaut 10 %' },
  { q: 'Les contrôles radar font-ils baisser la vitesse moyenne μ, qui était de 50 km/h ?', par: 'μ', v0: '50', side: 'left', claim: 'la vitesse moyenne vaut 50 km/h' },
  { q: 'La consommation moyenne μ d’une voiture diffère-t-elle des 6 L/100 km annoncés ?', par: 'μ', v0: '6', side: 'two', claim: 'la consommation moyenne vaut 6 L/100 km' },
];
const OP = { right: '>', left: '<', two: '≠' };
const pair = (s, h0op, h1op) => `H₀ : ${s.par} ${h0op} ${s.v0} contre H₁ : ${s.par} ${h1op} ${s.v0}`;

// The menu of hypotheses: the right pair, then the traps.
function pairOptions(s, count) {
  const right = { id: 'ok', label: pair(s, '=', OP[s.side]), valid: true };
  const wrong = [];
  if (s.side !== 'two') {
    wrong.push({ id: 'dir', label: pair(s, OP[s.side], '='), valid: false, rule: 'p_h0_direction', why: 'Ce que l’on veut établir va en H₁ ; H₀ garde l’égalité.' });
    wrong.push({ id: 'two', label: pair(s, '=', '≠'), valid: false, rule: 'p_one_two_sided', why: `Seul un sens intéresse (« ${s.side === 'right' ? 'dépasse, augmente' : 'diminue, moins'} ») : le test est unilatéral.` });
    wrong.push({ id: 'side', label: pair(s, '=', s.side === 'right' ? '<' : '>'), valid: false, rule: 'p_one_two_sided', why: 'H₁ va dans le sens de la question.' });
    wrong.push({ id: 'neq', label: pair(s, '≠', '='), valid: false, rule: 'p_h0_direction', why: 'H₀ contient l’égalité : c’est elle que l’on suppose pour calculer.' });
  } else {
    wrong.push({ id: 'one', label: pair(s, '=', '>'), valid: false, rule: 'p_one_two_sided', why: 'La question ne privilégie aucun sens : test bilatéral.' });
    wrong.push({ id: 'dir', label: pair(s, '≠', '='), valid: false, rule: 'p_h0_direction', why: 'H₀ contient l’égalité ; H₁ est ce que l’on cherche à établir.' });
    wrong.push({ id: 'one2', label: pair(s, '=', '<'), valid: false, rule: 'p_one_two_sided', why: 'La question ne privilégie aucun sens : test bilatéral.' });
    wrong.push({ id: 'ge', label: pair(s, '>', '≤'), valid: false, rule: 'p_h0_direction', why: 'H₀ garde l’égalité.' });
  }
  return [right, ...wrong.slice(0, count - 1)];
}

// z quantile of the region at level a (%), side; texts accepted.
function zCrit(side, a) {
  const two = side === 'two';
  const table = { '5:false': [1.645, ['1.64', '1.645']], '5:true': [1.96, ['1.96', '1.960']], '1:false': [2.326, ['2.33', '2.326']], '1:true': [2.576, ['2.576', '2.58', '2.5758']], '10:false': [1.282, ['1.28', '1.282']], '10:true': [1.645, ['1.64', '1.645']] };
  const [v, acc] = table[`${a}:${two}`];
  return { v, acc, text: dec(v, 3) };
}

// The p-value of t on a side (with the table of Φ), its expression for the judge.
// exact: the same p-value with Φ itself (a line « 2(1 − Φ(2,1)) »), accepted too.
function pvalue(side, t) {
  const a = Math.abs(t);
  const exact = side === 'two' ? 2 * (1 - Phi(a)) : 1 - Phi(a);
  const acc = { accept: [val(exact)], acceptTol: 0.0005 };
  return { ...pvalue0(side, t), exact, acc };
}
function pvalue0(side, t) {
  if (side === 'two') return { v: 2 * (1 - phiT(Math.abs(t))), expr: `2*(1-#phi(${val(Math.abs(t))}))`, line: `2(1-Φ(${dec(Math.abs(t), 3)}))`, one: 1 - phiT(Math.abs(t)) };
  if (side === 'right') return { v: 1 - phiT(t), expr: `1-#phi(${val(t)})`, line: `1-Φ(${dec(t, 3)})`, one: 2 * (1 - phiT(t)) };
  return { v: phiT(t), expr: `1-#phi(${val(-t)})`, line: `1-Φ(${dec(-t, 3)})`, one: 2 * phiT(t) };
}

function tsItem(level, rng, profile, opts = {}) {
  const s = pick(rng, SCEN);
  if (opts.exam === 'mcq') {
    const o = pairOptions(s, 5);
    return choice({ skill: TS, level: 4, key: `mcq:${SCEN.indexOf(s)}`, exam: examTag(opts), prompt: `${s.q} Quelles hypothèses tester ?`, right: o[0].label, wrongs: o.slice(1).map((x) => ({ html: x.label, rule: x.rule })), count: 5 }, rng);
  }
  if (opts.exam === 'tf') {
    if (rng.chance(0.5)) {
      return tf({ skill: TS, key: 'pval-min', exam: examTag(opts), truth: true, statement: 'La p-valeur est la plus petite valeur de α pour laquelle on rejette H₀.', explanation: 'On rejette au niveau α exactement quand p_obs < α.' });
    }
    const p = pick(rng, ['0,03', '0,02', '0,04']);
    return tf({
      skill: TS, key: `p-${p}`, exam: examTag(opts), truth: false, ruleIfTrue: 'p_reject_10_5',
      statement: `Si p_obs = ${p}, on rejette H₀ au niveau 5 % et au niveau 1 %.`,
      explanation: `${p} < 0,05 : rejet à 5 % ; mais ${p} > 0,01 : pas de rejet à 1 %.`,
      counter: numCounter({ vars: [{ v: 'a', label: 'Un de ces deux niveaux où l’on ne rejette pas : α =' }], hyp: 'a=0,05∨a=0,01', pred: `${p}<a`, answer: { a: '0,01' } }),
    });
  }
  // t_obs: on the grid, on the side of H₁.
  let t = grid(rng, 0.5, 3.5);
  if (s.side === 'left') t = -t;
  const alpha = pick(rng, [5, 5, 1]);
  const pv = pvalue(s.side, t);
  const zc = zCrit(s.side, alpha);
  const reject = pv.v < alpha / 100;
  if (Math.abs(pv.v - alpha / 100) < 0.004) return tsItem(level, rng, profile, opts);
  const count = level === 1 ? 3 : 5;
  const decisions = [
    { prompt: 'Quelles hypothèses ?', options: pairOptions(s, count) },
    { prompt: 'Le test est…', options: [
      { id: 'side', label: s.side === 'two' ? 'bilatéral' : `unilatéral ${s.side === 'right' ? 'à droite' : 'à gauche'}`, valid: true },
      { id: 'other', label: s.side === 'two' ? 'unilatéral' : 'bilatéral', valid: false, rule: 'p_one_two_sided', why: s.side === 'two' ? 'Aucun sens n’est privilégié.' : 'Un seul sens intéresse.' },
    ] },
  ];
  const parts = [
    {
      label: 't_c', name: 'tc', kind: 'stat', expect: val(zc.v), decimals: 3, accept: s.side === 'left' ? [...zc.acc, ...zc.acc.map((x) => `-${x}`)] : zc.acc, action: 'Région critique : le quantile de la loi normale',
      traps: { p_one_two_sided: [s.side === 'two' ? val(zCrit('right', alpha).v) : val(zCrit('two', alpha).v)] },
      decisions,
      lines: [{ math: zc.text, note: `R = ${s.side === 'two' ? `{|T| > ${zc.text}}` : s.side === 'right' ? `[${zc.text} ; +∞[` : `]−∞ ; −${zc.text}]`}`, subgoal: 'hyp', blank: [zc.text] }],
    },
    {
      label: 'p_obs', name: 'p', kind: 'stat', expect: pv.expr, decimals: 3, ...pv.acc, action: 'p-valeur',
      traps: { p_pvalue_two_sided: { values: [val(pv.one)], ctx: { t: dec(Math.abs(t), 3) } }, p_upper_tail: [val(1 - pv.v)] },
      wrongActions: [{ label: s.side === 'two' ? 'p = 1 − Φ(|t_obs|)' : 'p = 2(1 − Φ(|t_obs|))', rule: 'p_pvalue_two_sided', why: s.side === 'two' ? 'Bilatéral : les écarts des deux côtés comptent, on double.' : 'Unilatéral : un seul côté compte.' }],
      lines: [
        { math: pv.line, note: s.side === 'two' ? 'Bilatéral : les deux queues' : 'Une queue', subgoal: 'hyp', blank: [dec(Math.abs(t), 3)] },
        { math: pv.line.replace(/Φ\([^)]*\)/, dec(phiT(Math.abs(t)), 7).replace(/0+$/, '')), note: `Table : Φ(${dec(Math.abs(t), 3)}) = ${dec(phiT(Math.abs(t)), 7)}`, subgoal: 'phi', blank: [dec(phiT(Math.abs(t)), 7).replace(/0+$/, '')] },
        { math: dec(roundTo(pv.v, 4), 4), blank: [dec(roundTo(pv.v, 4), 4)] },
      ],
    },
  ];
  const interpret = level === 5
    ? { prompt: `Un IC à ${100 - alpha} % pour ${s.par} ne contient pas ${s.v0}. Que dit le test bilatéral au niveau ${alpha} % ?`, options: [
      { html: `Il rejette H₀ : ${s.par} = ${s.v0}.`, correct: true },
      { html: 'Il ne rejette pas H₀ : on ne peut rien dire.', correct: false, rule: 'p_accept_h0' },
      { html: `${s.par} = ${s.v0} a moins de ${alpha} % de chances d’être vrai.`, correct: false, rule: 'p_pvalue_h0' },
      { html: `Il rejette H₀, et donc ${s.par} est très différent de ${s.v0}.`, correct: false, rule: 'p_significant_large' },
    ] }
    : testConclusion(reject, alpha, s.claim, { p: pv.v });
  return statItem({
    skill: TS, level, key: `${level}:${SCEN.indexOf(s)}:${t}:${alpha}`,
    prompt: `${s.q} On fait un test z au niveau ${alpha} % et on observe t_obs = ${sc(t, 3)}. Pose les hypothèses, donne la région critique et la p-valeur.`,
    parts, interpret,
    hints: H('H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)).', SM(s.side === 'two' ? '2(1-Φ(□))' : '1-Φ(□)'), `p_obs = ${dec(roundTo(pv.v, 4), 4)}`),
    subgoals: TS_SUB, exam: examTag(opts),
  });
}

// ======================================================================
// p-test-power
// ======================================================================

const TP = 'p-test-power';
const TP_SUB = [
  { id: 'crit', label: 'seuil sous H₀', skill: TS },
  { id: 'std', label: 'standardiser, Φ', skill: 'p-normal-std' },
  { id: 'q', label: 'quantile normal', skill: 'p-normal-inverse' },
  { id: 'pow', label: 'β, puissance', skill: TP },
];
const TP_CASES = [[10, 100], [10, 25], [5, 25], [20, 64], [20, 100], [10, 64], [5, 100], [20, 16]];

function tpData(rng) {
  const [sigma, n] = pick(rng, TP_CASES);
  const se = sigma / Math.sqrt(n);
  const delta = pick(rng, [1, 1.5, 2, 2.5, 3, 3.5]);
  const mu0 = rng.int(10, 200);
  const mu1 = roundTo(mu0 + delta * se, 3);
  const a = pick(rng, [5, 5, 1, 10]);
  const zc = zCrit('right', a);
  const beta = Phi(zc.v - delta);
  return { sigma, n, se, delta, mu0, mu1, a, zc, beta, power: 1 - beta };
}

function errorDecisions(d) {
  return [
    { prompt: 'On garde H₀ alors que H₁ est vraie : quelle erreur ?', levels: [1, 2, 3, 4], options: [
      { id: 't2', label: 'Une erreur de type 2 (probabilité β)', valid: true },
      { id: 't1', label: 'Une erreur de type 1 (probabilité α)', valid: false, rule: 'p_type_errors_swap', why: 'Type 1 : rejeter H₀ vraie. Type 2 : garder H₀ fausse.' },
      { id: 'none', label: 'Aucune erreur', valid: false, why: `H₁ est vraie (μ = ${dec(d.mu1)}) : garder H₀ est une erreur.` },
    ] },
    { prompt: `On rejette H₀ et en fait μ = ${dec(d.mu1)} : quelle erreur ?`, levels: [2, 3, 4, 5], options: [
      { id: 'none', label: 'Aucune : la décision est juste', valid: true },
      { id: 't1', label: 'Une erreur de type 1', valid: false, rule: 'p_error_when_correct', why: 'H₁ est vraie et on a rejeté H₀ : la décision est juste.' },
      { id: 't2', label: 'Une erreur de type 2', valid: false, rule: 'p_type_errors_swap', why: 'Le type 2 est garder H₀ quand elle est fausse ; ici on l’a rejetée.' },
    ] },
  ];
}

function tpParts(d) {
  const seT = dec(d.se, 4);
  const b = roundTo(d.beta, 4);
  return [
    {
      label: 'se', name: 'se', kind: 'stat', expect: `${d.sigma}/√${d.n}`, decimals: 4, action: 'Erreur standard σ/√n', decisions: errorDecisions(d),
      lines: [{ math: `${d.sigma}/√(${d.n})`, note: 'σ/√n', subgoal: 'crit', blank: [String(d.n)] }, ...(seT !== `${d.sigma}/√(${d.n})` ? [{ math: seT, blank: [seT] }] : [])],
    },
    {
      label: 't_c', name: 'tc', kind: 'stat', expect: val(d.zc.v), decimals: 3, accept: d.zc.acc, action: 'Seuil sous H₀ : z₁₋α',
      traps: { p_one_two_sided: [val(zCrit('two', d.a).v)] },
      lines: [{ math: d.zc.text, note: `Unilatéral à ${d.a} % : Φ⁻¹(${dec(1 - d.a / 100, 2)})`, subgoal: 'q', blank: [d.zc.text] }],
    },
    {
      label: 'δ', name: 'dl', kind: 'stat', expect: `(${val(d.mu1)}-${d.mu0})/$se`, decimals: 3, action: 'Écart sous H₁ en erreurs standard',
      lines: [{ math: `(${dec(d.mu1)}-${d.mu0})/${seT}`, note: 'Sous H₁, T ~ N(δ, 1)', subgoal: 'std', blank: [String(d.mu0)] }, { math: dec(d.delta, 3), blank: [dec(d.delta, 3)] }],
    },
    {
      label: 'β', name: 'beta', kind: 'stat', expect: 'Φ($tc-$dl)', decimals: 2, action: 'β = Pr₁(T < t_c)',
      traps: { p_upper_tail: { values: [val(1 - d.beta)], ctx: { z: dec(d.zc.v - d.delta, 3) } } },
      lines: [{ math: `Φ(${d.zc.text}-${dec(d.delta, 3)})`, note: 'β = Φ(t_c − δ)', subgoal: 'std', blank: [dec(d.delta, 3)] }, { math: dec(b, 4), blank: [dec(b, 4)] }],
    },
    {
      label: '1 − β', name: 'pw', kind: 'stat', expect: '1-$beta', decimals: 2, action: 'Puissance 1 − β',
      traps: { p_power_alpha: [val(1 - d.a / 100)], p_upper_tail: [val(d.beta)] },
      wrongActions: [{ label: 'Puissance = 1 − α', rule: 'p_power_alpha', why: '1 − α se calcule sous H₀ ; la puissance se calcule sous H₁.' }],
      lines: [{ math: `1-${dec(b, 4)}`, note: 'Puissance', subgoal: 'pow', blank: [dec(b, 4)] }, { math: dec(1 - b, 4), blank: [dec(1 - b, 4)] }],
    },
  ];
}

function tpInterpret(d) {
  const pw = dec(roundTo(d.power * 100, 0), 0);
  return {
    prompt: 'Interpréter la puissance : quelle phrase est juste ?',
    options: [
      { html: `Si μ = ${dec(d.mu1)}, le test rejette H₀ pour environ ${pw} % des échantillons.`, correct: true },
      { html: `La puissance vaut 1 − α = ${dec(1 - d.a / 100, 2)}.`, correct: false, rule: 'p_power_alpha' },
      { html: 'β est la probabilité de rejeter H₀ alors qu’elle est vraie.', correct: false, rule: 'p_type_errors_swap' },
      { html: `Rejeter H₀ quand μ = ${dec(d.mu1)} est une erreur de type 1.`, correct: false, rule: 'p_error_when_correct' },
    ],
  };
}

function tpItem(level, rng, profile, opts = {}) {
  const d = tpData(rng);
  const story = `H₀ : μ = ${d.mu0} contre H₁ : μ = ${dec(d.mu1)} (unilatéral), σ = ${d.sigma} connu, n = ${d.n}, niveau α = ${d.a} %.`;
  if (opts.exam === 'mcq') return tpMcq(rng, opts, d, story);
  if (opts.exam === 'tf') return tpTf(rng, opts);
  const parts = tpParts(d);
  let prompt = `${story} Calcule β et la puissance du test z.`;
  if (level === 5) {
    const zb = 1.28;
    const dmu = d.mu1 - d.mu0;
    const raw = ((d.zc.v + zb) * d.sigma / dmu) ** 2;
    const nmin = Math.ceil(raw - 1e-9);
    const alt = Math.ceil(((d.zc.v + 1.282) * d.sigma / dmu) ** 2 - 1e-9);
    if (Math.abs(raw - Math.round(raw)) > 0.05) {
      parts.push({
        label: 'n', name: 'nmin', kind: 'stat', expect: String(nmin), decimals: 0, tol: 0.4, accept: [String(alt)], action: 'n pour une puissance de 0,9',
        notes: ['n ≥ ((z₁₋α + z₀,₉)·σ/(μ₁ − μ₀))², avec z₀,₉ = Φ⁻¹(0,9) = 1,28 ; on arrondit vers le haut.'],
        lines: [{ math: String(nmin), note: `((${d.zc.text} + 1,28)·${d.sigma}/${dec(dmu)})² = ${dec(raw, 2)}`, subgoal: 'pow' }],
      });
      prompt = `${story} Calcule β et la puissance, puis le plus petit n qui donne une puissance d’au moins 0,9.`;
    }
  }
  const o = {
    skill: TP, level, key: `${level}:${d.mu0}:${d.sigma}:${d.n}:${d.delta}:${d.a}`, prompt, parts,
    hints: H('Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1).', SM(`Φ(${d.zc.text}-□)`), `β = ${dec(roundTo(d.beta, 4), 4)}, puissance ${dec(roundTo(d.power, 4), 4)}`),
    subgoals: TP_SUB, interpret: tpInterpret(d), exam: examTag(opts),
  };
  if (opts.exam === 'coef') return coefItem({ ...o, prompt: `${story} Donne la puissance du test z (deux décimales).`, part: { label: '1 − β', kind: 'stat', expect: val(d.power), decimals: 2, ref: {}, lines: [{ math: dec(roundTo(d.power, 2), 2) }] } });
  return statItem(o);
}

function tpMcq(rng, opts, d, story) {
  if (rng.chance(0.5)) {
    const mu0 = rng.int(20, 60);
    const mu1 = mu0 + rng.int(3, 9);
    return choice({
      skill: TP, level: 4, key: `mcq-err:${mu0}:${mu1}`, exam: examTag(opts),
      prompt: `On teste H₀ : μ = ${mu0} contre H₁ : μ > ${mu0}. On rejette H₀. En réalité, μ = ${mu1}. Quelle erreur a-t-on commise ?`,
      right: 'Aucune erreur', wrongs: [{ html: 'Une erreur de type 1', rule: 'p_error_when_correct' }, { html: 'Une erreur de type 2', rule: 'p_type_errors_swap' }, { html: 'Les deux à la fois' }],
    }, rng);
  }
  const pw = (x) => dec(roundTo(x, 2), 2);
  return choice({
    skill: TP, level: 4, key: `mcq:${d.mu0}:${d.n}:${d.delta}:${d.a}`, exam: examTag(opts),
    prompt: `${story} Quelle est la puissance du test z (deux décimales) ?`,
    right: pw(d.power), wrongs: [{ html: pw(1 - d.a / 100), rule: 'p_power_alpha' }, { html: pw(d.beta), rule: 'p_upper_tail' }],
    fillers: [{ html: pw(Phi(d.delta)) }, { html: pw(1 - Phi(d.zc.v)) }],
  }, rng);
}

function tpTf(rng, opts) {
  if (rng.chance(0.5)) return tf({ skill: TP, key: 'n', exam: examTag(opts), truth: true, statement: 'À niveau α fixé, la puissance d’un test z augmente avec n.', explanation: 'δ = (μ₁ − μ₀)√n/σ grandit avec n, donc β = Φ(z₁₋α − δ) diminue.' });
  return tf({
    skill: TP, key: 'alpha', exam: examTag(opts), truth: false, ruleIfTrue: 'p_power_alpha',
    statement: 'Pour H₀ : μ = 100 contre H₁ : μ = 103, σ = 10, n = 100, au niveau 5 % (unilatéral), la puissance du test z vaut 0,95.',
    explanation: 'δ = 3, β = Φ(1,645 − 3) = 1 − Φ(1,355) ≈ 0,09 : la puissance vaut environ 0,91, pas 1 − α.',
    counter: numCounter({ vars: [{ v: 'p', label: 'La vraie puissance (deux décimales) :' }], hyp: '0,9<p∧p<0,92', pred: 'p=0,95', answer: { p: '0,91' } }),
  });
}

// ======================================================================
// p-test-z
// ======================================================================

const TZ = 'p-test-z';
const TZ_SUB = [
  { id: 'hyp', label: 'hypothèses, p-valeur', skill: TS },
  { id: 'stat', label: 'statistique, décision', skill: TZ },
  { id: 'clt', label: 'p̂ ≈ N(p, p(1 − p)/n)', skill: 'p-clt-binom' },
];
// Proportions with a whole σ for the count: [n, p0, √(np0(1 − p0))].
const PROP = [[100, 0.5, 5], [400, 0.5, 10], [100, 0.2, 4], [400, 0.2, 8], [625, 0.2, 10], [100, 0.1, 3], [900, 0.1, 9]];

function tzData(rng, kind) {
  if (kind === 'prop' || kind === 'propOne') {
    for (let k = 0; k < 100; k++) {
      const [n, p0, sc0] = pick(rng, PROP);
      const side = kind === 'prop' ? 'two' : pick(rng, ['right', 'left']);
      const dcount = rng.int(1, 3 * sc0) * (side === 'left' ? -1 : side === 'two' && rng.chance(0.4) ? -1 : 1);
      const t = dcount / sc0;
      // t with two decimals at most (on the grid of 0,05): no rounding to argue about.
      if (Math.abs(roundTo(t / 0.05, 6) - Math.round(t / 0.05)) > 1e-6 || Math.abs(t) < 0.5 || Math.abs(t) > 3.2) continue;
      const kk = Math.round(n * p0 + dcount);
      const se = Math.sqrt(p0 * (1 - p0) / n);
      return { kind, n, p0, k: kk, phat: kk / n, se, t, side, seLine: `√(${dec(p0)}×${dec(1 - p0)}/${n})`, seExpect: `√(${val(p0)}*${val(1 - p0)}/${n})`, stat: `(${dec(kk / n, 4)}-${dec(p0)})/$SE`, center: kk / n, h0: p0, sd0: Math.sqrt(p0 * (1 - p0)), par: 'p',
        story: kind === 'prop' && p0 === 0.5 ? `Une pièce est lancée ${n} fois ; on obtient ${kk} piles. Est-elle équilibrée ? Test z bilatéral de H₀ : p = 0,5.`
          : kind === 'prop' ? `Un fournisseur annonce ${dec(p0 * 100)} % de pièces défectueuses. Sur un lot de n = ${n} pièces, on en trouve ${kk}. Test z bilatéral de H₀ : p = ${dec(p0)}.` : `Sur n = ${n} unités, ${kk} présentent le caractère. On teste H₀ : p = ${dec(p0)} contre H₁ : p ${side === 'right' ? '>' : '<'} ${dec(p0)}.`,
        claim: `p vaut ${dec(p0)}` };
    }
  }
  if (kind === 'sigma' || kind === 'large') {
    const [sd, n] = kind === 'sigma' ? pick(rng, [[10, 16], [20, 25], [10, 25], [20, 100], [15, 36], [30, 100]]) : pick(rng, [[30, 225], [40, 400], [45, 900], [60, 400]]);
    const se = sd / Math.sqrt(n);
    const side = pick(rng, ['two', 'two', 'right']);
    let t = rng.int(10, 60) * 0.05;
    if (side === 'two' && rng.chance(0.4)) t = -t;
    t = roundTo(t, 2);
    const mu0 = kind === 'sigma' ? 1000 : rng.int(50, 400);
    const xbar = roundTo(mu0 + t * se, 6);
    return { kind, n, mu0, xbar, se, t, side, sd, seLine: `${sd}/√(${n})`, seExpect: `${sd}/√${n}`, center: xbar, h0: mu0, par: 'μ',
      story: kind === 'sigma' ? `Des compteurs de moyenne nominale μ₀ = 1 000 ; σ = ${sd} connu. Sur n = ${n} compteurs (normaux), x̄ = ${dec(xbar, 4)}. Test z ${side === 'two' ? 'bilatéral' : 'unilatéral (H₁ : μ > 1 000)'}.` : `Sur n = ${n} observations (loi inconnue), x̄ = ${dec(xbar, 4)} et s = ${sd}. Test z asymptotique de H₀ : μ = ${mu0} ${side === 'two' ? '(bilatéral)' : 'contre H₁ : μ > ' + mu0}.`,
      claim: `μ vaut ${mu0}` };
  }
  // Wald (EE-209): Poisson, I(λ̂) = n/λ̂.
  const [lh, se] = pick(rng, [[4, 0.2], [2.25, 0.15], [1.44, 0.12], [1, 0.1]]);
  const n = 100;
  let t = roundTo(rng.int(20, 60) * 0.05, 2);
  if (rng.chance(0.4)) t = -t;
  const l0 = roundTo(lh - t * se, 6);
  return { kind: 'wald', n, lh, se, t, side: 'two', mu0: l0, center: lh, h0: l0, par: 'λ', seLine: `√(${dec(lh)}/${n})`, seExpect: `√(${val(lh)}/${n})`,
    story: `n = ${n} comptages de Poisson, λ̂ = x̄ = ${dec(lh)}. Test de Wald (EE-209) de H₀ : λ = ${dec(l0, 4)}, bilatéral : T = √(I(λ̂))·(λ̂ − λ₀) avec I(λ̂) = n/λ̂.`,
    claim: `λ vaut ${dec(l0, 4)}` };
}

function tzParts(d, alpha) {
  const seT = dec(d.se, 4);
  const center = dec(d.center, 4);
  const h0 = dec(d.h0, 4);
  const pv = pvalue(d.side, roundTo(d.t, 2));
  const usePv = d.kind === 'prop' || d.kind === 'propOne' || d.kind === 'wald';
  const parts = [
    {
      label: 'se₀', name: 'SE', kind: 'stat', expect: d.seExpect, decimals: 4, action: 'Erreur standard sous H₀',
      traps: { p_se_forgot_sqrt_n: { values: [val(d.sd0 ?? d.sd ?? Math.sqrt(d.lh ?? 1))], ctx: { n: d.n, v: seT } } },
      wrongActions: [{ label: 'Oublier la division par n', rule: 'p_se_forgot_sqrt_n', why: 'L’écart-type d’une moyenne (ou de p̂) est divisé par √n.' }],
      lines: [{ math: d.seLine, note: d.kind === 'wald' ? 'se = 1/√I(λ̂) = √(λ̂/n)' : 'Sous H₀', subgoal: 'stat', blank: [String(d.n)] }, ...(seT !== d.seLine ? [{ math: seT, blank: [seT] }] : [])],
    },
    {
      label: 't_obs', name: 't', kind: 'stat', expect: `(${val(d.center)}-${val(d.h0)})/$SE`, decimals: 2, action: 'Statistique t_obs',
      lines: [{ math: `(${center}-${h0})/${seT}`, note: 'T = (estimation − valeur de H₀)/se', subgoal: 'stat', blank: [h0] }, { math: dec(roundTo(d.t, 2), 2), blank: [dec(roundTo(d.t, 2), 2)] }],
    },
  ];
  if (usePv) {
    parts.push({
      label: 'p_obs', name: 'pv', kind: 'stat', expect: pv.expr.replace(/#phi\(([^)]*)\)/, (m, z) => `#phi(${d.side === 'left' ? '-' : ''}${d.side === 'two' ? 'abs($t)' : '$t'})`).replace('#phi(-$t)', '#phi(-$t)'), decimals: 3, ...pv.acc, action: 'p-valeur',
      traps: { p_pvalue_two_sided: { values: [val(pv.one)], ctx: { t: dec(Math.abs(d.t), 2) } }, p_upper_tail: [val(1 - pv.v)] },
      wrongActions: [{ label: d.side === 'two' ? 'p = 1 − Φ(|t_obs|)' : 'p = 2(1 − Φ(|t_obs|))', rule: 'p_pvalue_two_sided', why: d.side === 'two' ? 'Bilatéral : on double.' : 'Unilatéral : une seule queue.' }],
      lines: [{ math: pv.line, note: d.side === 'two' ? 'Bilatéral' : 'Unilatéral', subgoal: 'hyp', blank: [dec(Math.abs(roundTo(d.t, 2)), 3)] }, { math: dec(roundTo(pv.v, 4), 4), blank: [dec(roundTo(pv.v, 4), 4)] }],
    });
    return { parts, reject: pv.v < alpha / 100, p: pv.v };
  }
  const zc = zCrit(d.side, alpha);
  parts.push({
    label: 't_c', name: 'tc', kind: 'stat', expect: val(zc.v), decimals: 3, accept: zc.acc, action: 'Valeur critique',
    traps: { p_one_two_sided: [val(zCrit(d.side === 'two' ? 'right' : 'two', alpha).v)] },
    lines: [{ math: zc.text, note: d.side === 'two' ? `Bilatéral à ${alpha} %` : `Unilatéral à ${alpha} %`, subgoal: 'hyp', blank: [zc.text] }],
  });
  const tt = roundTo(d.t, 2);
  return { parts, reject: d.side === 'two' ? Math.abs(tt) > zc.v : tt > zc.v, p: null };
}

function tzItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return tzTf(rng, opts);
  const kind = opts.exam ? 'prop' : level === 1 ? pick(rng, ['prop', 'sigma']) : level === 5 ? pick(rng, ['wald', 'propOne']) : pick(rng, ['prop', 'propOne', 'sigma', 'large']);
  const d = tzData(rng, kind);
  const alpha = 5;
  if (opts.exam === 'mcq') return tzMcq(d, rng, opts);
  const { parts, reject, p } = tzParts(d, alpha);
  // Too close to the threshold: draw again (the catalogue keeps 0,1 apart).
  const tt = Math.abs(roundTo(d.t, 2));
  if (level < 5 && Math.abs(tt - (d.side === 'two' ? 1.96 : 1.645)) < 0.1) return tzItem(level, rng, profile, opts);
  const decisions = [
    { prompt: 'Quel test ?', levels: [1, 2, 3], options: [
      { id: 'z', label: d.kind.startsWith('prop') ? 'Test z d’une proportion' : d.kind === 'wald' ? 'Test de Wald (z sur le MLE)' : d.kind === 'sigma' ? 'Test z : σ est connu' : 'Test z asymptotique : n est grand', valid: true },
      { id: 't', label: 'Test t de Student', valid: d.kind === 'large', quality: 'poor', why: d.kind === 'large' ? 'Pour n > 200, Student et la normale se confondent.' : d.kind === 'sigma' ? 'σ est connu : la loi normale exacte.' : 'Une proportion, n grand : la loi normale.' },
    ].filter((o) => o.valid || o.why) },
  ];
  parts[0].decisions = decisions;
  const o = {
    skill: TZ, level, key: `${level}:${d.kind}:${d.n}:${d.center}:${d.h0}:${d.side}`,
    prompt: `${d.story} Niveau 5 %.`, parts,
    hints: H(d.kind.startsWith('prop') ? 'Sous H₀, l’écart-type de p̂ est √(p₀(1 − p₀)/n).' : 'T = (estimation − valeur de H₀)/(erreur standard).', SM(`(${dec(d.center, 4)}-${dec(d.h0, 4)})/□`), `t_obs = ${dec(roundTo(d.t, 2), 2)}`),
    subgoals: TZ_SUB, interpret: testConclusion(reject, alpha, d.claim, { p }), exam: examTag(opts),
  };
  if (opts.exam === 'coef') return coefItem({ ...o, prompt: `${d.story} Donne t_obs (deux décimales).`, part: { label: 't_obs', kind: 'stat', expect: val(d.t), decimals: 2, ref: {}, lines: [{ math: dec(roundTo(d.t, 2), 2) }] } });
  return statItem(o);
}

function tzMcq(d, rng, opts) {
  const pv = pvalue(d.side, roundTo(d.t, 2));
  const tw = (d.phat - d.p0) / d.sd0;
  const pw = pvalue(d.side, roundTo(tw, 2)).v;
  const f = (x) => dec(roundTo(x, 3), 3);
  return choice({
    skill: TZ, level: 4, key: `mcq:${d.n}:${d.k}:${d.p0}`, exam: examTag(opts),
    prompt: `${d.story} Quelle est la p-valeur ?`, right: f(pv.v),
    wrongs: [{ html: f(pv.one), rule: 'p_pvalue_two_sided' }, { html: f(1 - pv.v), rule: 'p_upper_tail' }, { html: f(Math.max(pw, 0.0001)), rule: 'p_se_forgot_sqrt_n' }],
    fillers: [{ html: f(pv.v / 2) }, { html: f(Math.min(pv.v * 3, 0.9)) }],
  }, rng);
}

function tzTf(rng, opts) {
  if (rng.chance(0.5)) return tf({ skill: TZ, key: 'ic', exam: examTag(opts), truth: true, statement: 'Un test z bilatéral à 5 % rejette H₀ : θ = θ₀ si et seulement si θ₀ est hors de l’IC à 95 % construit avec la même statistique.', explanation: 'L’IC à 95 % contient exactement les θ₀ que le test bilatéral à 5 % ne rejette pas.' });
  return tf({
    skill: TZ, key: 'n', exam: examTag(opts), truth: false, ruleIfTrue: 'p_se_forgot_sqrt_n',
    statement: 'Pour un même écart p̂ − p₀, la statistique du test z d’une proportion est plus petite quand n est plus grand.',
    explanation: 'T = (p̂ − p₀)·√n/√(p₀(1 − p₀)) grandit comme √n : avec 4 fois plus de données, T double.',
    counter: numCounter({ vars: [{ v: 'a', label: 'Un petit n =', dom: 'N*' }, { v: 'b', label: 'Un n plus grand =', dom: 'N*' }], hyp: '0<a∧a<b', pred: '√b≤√a', answer: { a: '100', b: '400' } }),
  });
}

// ======================================================================
// p-test-t1
// ======================================================================

const T1 = 'p-test-t1';
const T1_SUB = [
  { id: 'desc', label: 'x̄ et s', skill: 'p-desc-summary' },
  { id: 'test', label: 'test t', skill: T1 },
  { id: 'z', label: 'démarche du test z', skill: TZ },
  { id: 'ci', label: 'quantile de Student, s/√n', skill: 'p-ci-mean' },
];

// {xs, n, mean, s2, SS, mu0, t, nu, reject, pairs?}
function t1Data(rng, { paired = false, n: n0 = null, close = false } = {}) {
  for (let k = 0; k < 300; k++) {
    const n = n0 ?? pick(rng, [5, 6, 9, 10, 16]);
    let d = dataSet(rng, n, paired ? { lo: 10, hi: 10, maxDev: 3 } : { lo: 8, hi: 90, maxDev: n <= 6 ? 4 : 5 });
    // Differences: a small mean, values of both signs.
    if (paired) { const m = rng.int(1, 3); d = { ...d, mean: m, xs: rng.shuffle(d.devs.map((x) => x + m)) }; }
    const se = Math.sqrt(d.s2 / n);
    const nu = n - 1;
    const tc = tq(nu);
    const shift = rng.int(1, 4) * (rng.chance(0.5) ? 1 : -1);
    const mu0 = paired ? 0 : d.mean - shift;
    const t = (d.mean - mu0) / se;
    if (Math.abs(t) > 6) continue;
    const gap = Math.abs(Math.abs(roundTo(t, 2)) - tc);
    if (!close && gap < 0.1) continue;
    let pairs = null;
    if (paired) {
      const before = d.xs.map(() => rng.int(5, 12));
      pairs = before.map((b, i) => [b, b + d.xs[i]]);
    }
    return { ...d, n, se, nu, tc, mu0, t, reject: Math.abs(roundTo(t, 2)) > tc, pairs };
  }
  return null;
}

function t1Parts(d, { raw = true, ci = false } = {}) {
  const parts = [];
  const m = d.pairs ? 'd̄' : 'x̄';
  if (raw) {
    parts.push({
      label: m, name: 'xbar', kind: 'prob', expect: String(d.mean), action: d.pairs ? 'Moyenne des différences' : 'Moyenne x̄',
      lines: [{ math: `(${d.xs.join('+')})/${d.n}`.replace(/\+-/g, '-'), note: 'Moyenne', subgoal: 'desc', blank: [String(d.n)] }, { math: String(d.mean), blank: [String(d.mean)] }],
    });
    parts.push({
      label: d.pairs ? 's_d²' : 's²', name: 's2', kind: 'prob', expect: String(d.s2), action: 'Variance (÷ n − 1)',
      traps: { p_sd_n: { values: [`${d.SS}/${d.n}`], ctx: { SS: d.SS, n: d.n, 'n−1': d.n - 1 } } },
      lines: [{ math: `(${sqDevs(d.xs, d.mean)})/${d.n - 1}`, note: 'Écarts au carré, ÷ (n − 1)', subgoal: 'desc', blank: [String(d.n - 1)] }, { math: `${d.SS}/${d.n - 1}` }, { math: String(d.s2) }],
    });
  }
  const s2 = raw ? '$s2' : String(d.s2);
  const seT = dec(roundTo(d.se, 3), 3);
  const seFirst = `√(${d.s2}/${d.n})`;
  parts.push({
    label: 's/√n', name: 'se', kind: 'stat', expect: `√(${s2}/${d.n})`, decimals: 3, action: 'Erreur standard s/√n',
    lines: [{ math: seFirst, note: 'Erreur standard', subgoal: 'ci', blank: [String(d.n)] }, ...(seT !== seFirst ? [{ math: seT, blank: [seT] }] : [])],
  });
  const xb = raw ? '$xbar' : String(d.mean);
  const tv = (d.mean - d.mu0) / Number(seT.replace(',', '.'));
  const tT = dec(roundTo(tv, 2), 2);
  parts.push({
    label: 't_obs', name: 't', kind: 'stat', expect: `(${xb}-${d.mu0})/$se`, decimals: 2, action: 'Statistique t_obs',
    traps: { p_se_forgot_sqrt_n: [val((d.mean - d.mu0) / Math.sqrt(d.s2))] },
    lines: [{ math: `(${d.mean}-${d.mu0})/${seT}`.replace('--', '+'), note: 'T = (x̄ − μ₀)/(s/√n)', subgoal: 'test', blank: [String(d.mu0)] }, { math: tT, blank: [tT] }],
  });
  parts.push({
    label: 'ν', name: 'nu', kind: 'prob', expect: String(d.nu), action: 'Degrés de liberté n − 1',
    traps: { p_df_wrong: { values: [String(d.n)], ctx: { 'ν': d.nu } } },
    lines: [{ math: String(d.nu), note: 'ν = n − 1', subgoal: 'test', blank: [String(d.nu)] }],
  });
  const tqn = tq(d.n);
  parts.push({
    label: 't_c', name: 'tc', kind: 'stat', expect: `#t($nu,5)`, decimals: 3, action: 'Lire s₅(ν) dans la table 3',
    traps: { p_t_vs_z: { values: ['1.96'], ctx: { 'ν': d.nu } }, ...(tqn ? { p_df_wrong: { values: [val(tqn)], ctx: { 'ν': d.nu } } } : {}) },
    decisions: [quantileDecision(d.nu)],
    wrongActions: [{ label: 'Prendre 1,96', rule: 'p_t_vs_z', why: 'σ est inconnu et n est petit : Student.' }],
    lines: [{ math: tqText(d.nu), note: `Table 3, ν = ${d.nu}`, subgoal: 'ci', blank: [tqText(d.nu)] }],
  });
  if (ci) {
    const u = d.tc * Number(seT.replace(',', '.'));
    parts.push({
      label: 'IC', name: 'ic', kind: 'stat', expect: [`${xb}-$tc*$se`, `${xb}+$tc*$se`], decimals: 2, action: 'IC à 95 % : x̄ ± t_c·s/√n',
      lines: [{ math: `[${d.mean}-${tqText(d.nu)}×${seT} ; ${d.mean}+${tqText(d.nu)}×${seT}]`, note: 'x̄ ± t_c·s/√n', subgoal: 'ci' }, { math: `[${dec(roundTo(d.mean - u, 2), 2)} ; ${dec(roundTo(d.mean + u, 2), 2)}]` }],
    });
  }
  return parts;
}

function t1Item(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return t1Tf(rng, opts);
  const paired = (level === 2 || level >= 4) && rng.chance(0.3) && opts.exam !== 'open';
  const d = t1Data(rng, { paired, n: opts.exam === 'open' ? 6 : null, close: level === 5 && rng.chance(0.33) });
  if (opts.exam === 'mcq') return t1Mcq(d, rng, opts);
  const raw = level >= 2 || opts.exam === 'open';
  const parts = t1Parts(d, { raw, ci: opts.exam === 'open' });
  const what = paired ? 'la différence moyenne μ_d' : 'μ';
  const claim = paired ? 'la différence moyenne est nulle' : `μ vaut ${d.mu0}`;
  let story;
  if (paired) {
    story = `Les mêmes ${d.n} personnes sont mesurées avant et après un traitement (avant ; après) : ${d.pairs.map(([a, b]) => `(${a} ; ${b})`).join(', ')}. Données supposées normales. Le traitement change-t-il la mesure ? Test bilatéral à 5 %.`;
    parts[0].decisions = [{ prompt: 'Comment traiter ces données ?', options: [
      { id: 'diff', label: 'Mêmes personnes : test t sur les différences après − avant', valid: true },
      { id: 'two', label: 'Deux échantillons indépendants (avant, après)', valid: false, rule: 'p_paired_as_two', why: 'Les mêmes personnes sont mesurées deux fois : on teste les différences.' },
    ] }];
    parts[0].lines[0].note = `Différences : ${list(d.xs)}`;
  } else if (raw) {
    story = `Mesures supposées normales : ${list(d.xs)}. On teste H₀ : μ = ${d.mu0} contre H₁ : μ ≠ ${d.mu0} au niveau 5 %.`;
  } else {
    story = `Sur n = ${d.n} mesures normales, x̄ = ${d.mean} et s² = ${d.s2}. On teste H₀ : μ = ${d.mu0} contre H₁ : μ ≠ ${d.mu0} au niveau 5 %.`;
  }
  const o = {
    skill: T1, level, key: `${level}:${paired}:${d.xs.join(',')}:${d.mu0}`, prompt: story, parts,
    hints: H('σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n.', SM(`(${d.mean}-${d.mu0})/□`), `t_obs = ${dec(roundTo(d.t, 2), 2)}, s₅(${d.nu}) = ${tqText(d.nu)}`),
    subgoals: T1_SUB, interpret: testConclusion(d.reject, 5, claim), exam: examTag(opts), fallback: d.fallback,
  };
  void what;
  if (opts.exam === 'open') {
    return openItem({ ...o, exam: undefined, prompt: `${story} Puis donne l’IC à 95 % pour μ (deux décimales).`, title: 'Test t et IC' }, 10, rng);
  }
  if (opts.exam === 'coef') {
    const seT = roundTo(d.se, 3);
    return coefItem({ ...o, prompt: `${story} Donne t_obs (deux décimales).`, part: { label: 't_obs', kind: 'stat', expect: val(d.t), accept: [val((d.mean - d.mu0) / seT)], decimals: 2, ref: {}, lines: [{ math: dec(roundTo(d.t, 2), 2) }] } });
  }
  return statItem(o);
}

function t1Mcq(d, rng, opts) {
  const f = (x) => sc(roundTo(x, 2), 2);
  const tn = (d.mean - d.mu0) / Math.sqrt(d.SS / d.n / d.n);
  return choice({
    skill: T1, level: 4, key: `mcq:${d.xs.join(',')}:${d.mu0}`, exam: examTag(opts),
    prompt: `Mesures supposées normales : ${list(d.xs)}. On teste H₀ : μ = ${d.mu0} contre H₁ : μ ≠ ${d.mu0}. Quelle est la valeur de t_obs ?`,
    right: f(d.t), wrongs: [{ html: f(tn), rule: 'p_sd_n' }, { html: f((d.mean - d.mu0) / Math.sqrt(d.s2)), rule: 'p_se_forgot_sqrt_n' }],
    fillers: [{ html: f(d.t * 2) }, { html: f(d.t / 2) }],
  }, rng);
}

function t1Tf(rng, opts) {
  if (rng.chance(0.5)) return tf({ skill: T1, key: '1-5', exam: examTag(opts), truth: true, statement: 'Si un test rejette H₀ au niveau 1 %, il la rejette aussi au niveau 5 %.', explanation: 'p_obs < 0,01 entraîne p_obs < 0,05.' });
  return tf({
    skill: T1, key: 'df', exam: examTag(opts), truth: false, ruleIfTrue: 'p_df_wrong',
    statement: 'Le test t à un échantillon de n données utilise la loi de Student à n degrés de liberté.',
    explanation: 'On estime μ par x̄ : on perd un degré de liberté, ν = n − 1.',
    counter: numCounter({ vars: [{ v: 'n', label: 'Un nombre de données n =', dom: 'N*' }, { v: 'v', label: 'et le bon ν =', dom: 'N' }], hyp: 'n≥2∧v=n-1', pred: 'v=n', answer: { n: '5', v: '4' } }),
  });
}

// ======================================================================
// p-test-t2
// ======================================================================

const T2 = 'p-test-t2';
const T2_SUB = [
  { id: 'desc', label: 'résumés', skill: 'p-desc-summary' },
  { id: 'test', label: 'test t poolé', skill: T2 },
  { id: 't1', label: 'statistique t', skill: T1 },
];

function t2Data(rng, { raw = false, unequal = false } = {}) {
  for (let k = 0; k < 300; k++) {
    const n1 = rng.int(4, 10);
    const n2 = unequal ? rng.int(4, 10) : n1;
    if (unequal && n1 === n2) continue;
    const a = dataSet(rng, n1, { lo: 10, hi: 40, maxDev: 6 });
    const b = dataSet(rng, n2, { lo: 10, hi: 40, maxDev: 6 });
    if (Math.abs(a.mean - b.mean) < 1 || Math.abs(a.mean - b.mean) > 6) continue;
    const ratio = a.s2 / b.s2;
    if (ratio < 1 / 3 || ratio > 3) continue;
    const fLo = roundTo(fInv(0.025, n1 - 1, n2 - 1), 3);
    const fHi = roundTo(fInv(0.975, n1 - 1, n2 - 1), 3);
    if (ratio <= fLo || ratio >= fHi) continue;
    const sp2 = ((n1 - 1) * a.s2 + (n2 - 1) * b.s2) / (n1 + n2 - 2);
    const se = Math.sqrt(sp2 * (1 / n1 + 1 / n2));
    const nu = n1 + n2 - 2;
    const t = (a.mean - b.mean) / se;
    const tc = tq(nu);
    if (!tc || Math.abs(Math.abs(roundTo(t, 2)) - tc) < 0.1 || Math.abs(t) > 4.5) continue;
    // About half of the items do not reject H₀.
    if (Math.abs(t) > tc && rng.chance(0.4)) continue;
    return { a, b, n1, n2, sp2, se, nu, t, tc, fLo, fHi, ratio, reject: Math.abs(roundTo(t, 2)) > tc, raw };
  }
  return null;
}

const spText = (d) => `(${d.n1 - 1}×${d.a.s2}+${d.n2 - 1}×${d.b.s2})/${d.n1 + d.n2 - 2}`;
function frac(num, den) {
  const g = (x, y) => (y ? g(y, x % y) : x);
  const k = g(num, den);
  return den / k === 1 ? String(num / k) : `${num / k}/${den / k}`;
}

function t2Parts(d) {
  const parts = [];
  if (d.raw) {
    for (const [g, s] of [[1, d.a], [2, d.b]]) {
      parts.push({
        label: `x̄${g === 1 ? '₁' : '₂'}`, name: `m${g}`, kind: 'prob', expect: String(s.mean), action: `Moyenne du groupe ${g}`,
        lines: [{ math: `(${s.xs.join('+')})/${s.xs.length}`, note: `Groupe ${g}`, subgoal: 'desc' }, { math: String(s.mean) }],
      });
      parts.push({
        label: `s${g === 1 ? '₁' : '₂'}²`, name: `v${g}`, kind: 'prob', expect: String(s.s2), action: `Variance du groupe ${g}`,
        lines: [{ math: `${s.SS}/${s.xs.length - 1}`, note: `Σ(x − x̄)² = ${s.SS}, ÷ (n − 1)`, subgoal: 'desc' }, { math: String(s.s2) }],
      });
    }
  }
  const v1 = d.raw ? '$v1' : String(d.a.s2);
  const v2 = d.raw ? '$v2' : String(d.b.s2);
  const Ft = dec(roundTo(d.ratio, 3), 3);
  parts.push({
    label: 'F', name: 'F', kind: 'stat', expect: `${v1}/${v2}`, decimals: 3, action: 'Test F : s₁²/s₂²',
    decisions: [{ prompt: 'Ces deux groupes sont-ils…', levels: [1, 2, 3], options: [
      { id: 'ind', label: 'Deux échantillons indépendants (des individus différents)', valid: true },
      { id: 'pair', label: 'Des données appariées : on teste les différences groupe par groupe', valid: false, rule: 'p_paired_as_two', why: 'Ce sont des individus différents (les tailles peuvent même différer) : pas de paires.' },
    ] }],
    lines: [{ math: Ft, note: `F = s₁²/s₂² = ${d.a.s2}/${d.b.s2}`, subgoal: 'test' }],
  });
  const spq = frac((d.n1 - 1) * d.a.s2 + (d.n2 - 1) * d.b.s2, d.n1 + d.n2 - 2);
  const avg = (d.a.s2 + d.b.s2) / 2;
  parts.push({
    label: 's_p²', name: 'sp2', kind: 'prob', expect: `((${d.n1}-1)*${v1}+(${d.n2}-1)*${v2})/(${d.n1 + d.n2 - 2})`, action: 'Variance poolée',
    decisions: [{ prompt: `F = ${Ft} et l’énoncé donne F(${d.n1 - 1} ; ${d.n2 - 1}) entre ${dec(d.fLo, 3)} et ${dec(d.fHi, 3)} (95 %) :`, levels: [2, 3, 4, 5], options: [
      { id: 'ok', label: 'Variances compatibles : le test t poolé convient', valid: true },
      { id: 'no', label: 'Variances différentes : il faudrait le test de Welch', valid: false, why: `${Ft} est entre ${dec(d.fLo, 3)} et ${dec(d.fHi, 3)} : on ne rejette pas l’égalité des variances.` },
    ] }],
    traps: Math.abs(avg - d.sp2) > 1e-9 ? { p_pooled_average: { values: [val(avg)], ctx: { n1: d.n1, n2: d.n2 } } } : {},
    wrongActions: [{ label: 'Faire la moyenne simple des deux variances', rule: 'p_pooled_average', why: 'Chaque variance pèse selon ses degrés de liberté.' }],
    lines: [{ math: spText(d), note: 's_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)', subgoal: 'test', blank: [String(d.n1 + d.n2 - 2)] }, ...(spq !== spText(d) ? [{ math: spq, blank: [spq] }] : [])],
  });
  const seT = dec(roundTo(d.se, 3), 3);
  parts.push({
    label: 'se', name: 'se', kind: 'stat', expect: `√($sp2*(1/${d.n1}+1/${d.n2}))`, decimals: 3, action: 'Erreur standard s_p·√(1/n₁ + 1/n₂)',
    traps: { p_two_sample_se: [val(Math.sqrt(d.a.s2 + d.b.s2))] },
    lines: [{ math: `√(${spq}×(1/${d.n1}+1/${d.n2}))`, note: 'se', subgoal: 'test' }, { math: seT }],
  });
  const m1 = d.raw ? '$m1' : String(d.a.mean);
  const m2 = d.raw ? '$m2' : String(d.b.mean);
  const tv = (d.a.mean - d.b.mean) / Number(seT.replace(',', '.'));
  parts.push({
    label: 't_obs', name: 't', kind: 'stat', expect: `(${m1}-${m2})/$se`, decimals: 2, action: 'Statistique t_obs',
    lines: [{ math: `(${d.a.mean}-${d.b.mean})/${seT}`, note: 'T = (x̄₁ − x̄₂)/se', subgoal: 't1' }, { math: dec(roundTo(tv, 2), 2) }],
  });
  parts.push({
    label: 'ν', name: 'nu', kind: 'prob', expect: String(d.nu), action: 'ν = n₁ + n₂ − 2',
    traps: { p_df_wrong: { values: [String(d.nu + 1)], ctx: { 'ν': d.nu } } },
    lines: [{ math: String(d.nu), note: 'ν = n₁ + n₂ − 2', subgoal: 'test', blank: [String(d.nu)] }],
  });
  parts.push({
    label: 't_c', name: 'tc', kind: 'stat', expect: '#t($nu,5)', decimals: 3, action: 'Lire s₅(ν)',
    traps: { p_t_vs_z: ['1.96'] },
    lines: [{ math: tqText(d.nu), note: `Table 3, ν = ${d.nu}`, subgoal: 'test', blank: [tqText(d.nu)] }],
  });
  return parts;
}

function t2Item(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return t2Tf(rng, opts);
  const raw = level >= 4 || opts.exam === 'open';
  const d = t2Data(rng, { raw, unequal: level >= 4 || opts.exam === 'mcq' || rng.chance(0.4) });
  if (opts.exam === 'mcq') return t2Mcq(d, rng, opts);
  const story = raw
    ? `Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : ${list(d.a.xs)}. Groupe 2 : ${list(d.b.xs)}. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(${d.n1 - 1} ; ${d.n2 - 1}) : ${dec(d.fLo, 3)} (2,5 %) et ${dec(d.fHi, 3)} (97,5 %).`
    : `Deux groupes indépendants, supposés normaux : n₁ = ${d.n1}, x̄₁ = ${d.a.mean}, s₁² = ${d.a.s2} ; n₂ = ${d.n2}, x̄₂ = ${d.b.mean}, s₂² = ${d.b.s2}. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(${d.n1 - 1} ; ${d.n2 - 1}) : ${dec(d.fLo, 3)} et ${dec(d.fHi, 3)}.`;
  const parts = t2Parts(d);
  const o = {
    skill: T2, level, key: `${level}:${d.a.xs.join(',')}:${d.b.xs.join(',')}`, prompt: story, parts,
    hints: H('Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2.', SM(`(${d.n1 - 1}×${d.a.s2}+${d.n2 - 1}×${d.b.s2})/□`), `s_p² = ${frac((d.n1 - 1) * d.a.s2 + (d.n2 - 1) * d.b.s2, d.n1 + d.n2 - 2).replace('/', ' / ')}`),
    subgoals: T2_SUB, interpret: testConclusion(d.reject, 5, 'les deux moyennes sont égales'), exam: examTag(opts),
  };
  if (opts.exam === 'open') return openItem({ ...o, exam: undefined, title: 'Test t à deux échantillons' }, 10, rng);
  if (opts.exam === 'coef') return coefItem({ ...o, prompt: `${story} Donne la variance poolée s_p².`, part: { ...parts.find((p) => p.name === 'sp2'), decisions: [], expect: `((${d.n1}-1)*${d.a.s2}+(${d.n2}-1)*${d.b.s2})/(${d.n1 + d.n2 - 2})`, ref: {} } });
  return statItem(o);
}

function t2Mcq(d, rng, opts) {
  const f = (x) => sc(roundTo(x, 2), 2);
  const avg = (d.a.s2 + d.b.s2) / 2;
  return choice({
    skill: T2, level: 4, key: `mcq:${d.a.xs.join(',')}:${d.b.xs.join(',')}`, exam: examTag(opts),
    prompt: `Deux groupes indépendants, normaux de même variance : n₁ = ${d.n1}, x̄₁ = ${d.a.mean}, s₁² = ${d.a.s2} ; n₂ = ${d.n2}, x̄₂ = ${d.b.mean}, s₂² = ${d.b.s2}. Quelle est la statistique t_obs du test t poolé ?`,
    right: f(d.t),
    wrongs: [
      { html: f((d.a.mean - d.b.mean) / Math.sqrt(avg * (1 / d.n1 + 1 / d.n2))), rule: 'p_pooled_average' },
      { html: f((d.a.mean - d.b.mean) / Math.sqrt(d.a.s2 + d.b.s2)), rule: 'p_two_sample_se' },
    ],
    fillers: [{ html: f(d.t * 2) }, { html: f((d.a.mean - d.b.mean) / Math.sqrt(d.sp2)) }],
  }, rng);
}

function t2Tf(rng, opts) {
  if (rng.chance(0.5)) return tf({ skill: T2, key: 'var', exam: examTag(opts), truth: true, statement: 'Le test t à deux échantillons avec variance poolée suppose les deux variances égales.', explanation: 'D’où le test F qui le précède.' });
  return tf({
    skill: T2, key: 'df', exam: examTag(opts), truth: false, ruleIfTrue: 'p_df_wrong',
    statement: 'Le test t poolé à deux échantillons de tailles n₁ et n₂ a n₁ + n₂ − 1 degrés de liberté.',
    explanation: 'On estime deux moyennes : ν = n₁ + n₂ − 2.',
    counter: numCounter({ vars: [{ v: 'a', label: 'n₁ =', dom: 'N*' }, { v: 'b', label: 'n₂ =', dom: 'N*' }, { v: 'v', label: 'le bon ν =', dom: 'N' }], hyp: 'a≥2∧b≥2∧v=a+b-2', pred: 'v=a+b-1', answer: { a: '5', b: '5', v: '8' } }),
  });
}

// ======================================================================
// p-test-two-prop
// ======================================================================

const TT = 'p-test-two-prop';
const TT_SUB = [
  { id: 'z', label: 'test z', skill: TZ },
  { id: 'pool', label: 'proportion poolée', skill: TT },
];
const CONTEXT = [
  ['guérisons avec le traitement A', 'avec le traitement B', 'les deux traitements ont le même taux de guérison'],
  ['pièces défectueuses de la machine 1', 'de la machine 2', 'les deux machines ont le même taux de défauts'],
  ['« oui » dans la région 1', 'dans la région 2', 'les deux régions votent oui dans la même proportion'],
];

function ttData(rng, oneSided) {
  for (let k = 0; k < 300; k++) {
    const n1 = pick(rng, [100, 200, 400]);
    const n2 = pick(rng, [100, 200, 400]);
    const p1 = rng.int(2, 16) / 20;
    const p2 = rng.int(2, 16) / 20;
    if (p1 === p2) continue;
    const k1 = Math.round(p1 * n1);
    const k2 = Math.round(p2 * n2);
    const p = (k1 + k2) / (n1 + n2);
    const se = Math.sqrt(p * (1 - p) * (1 / n1 + 1 / n2));
    const t = (p1 - p2) / se;
    if (Math.abs(t) > 3.5 || Math.abs(t) < 0.5) continue;
    if (oneSided && t < 0) continue;
    const tc = oneSided ? 1.645 : 1.96;
    if (Math.abs(Math.abs(roundTo(t, 2)) - tc) < 0.1) continue;
    return { n1, n2, p1, p2, k1, k2, p, se, t, oneSided, ctx: pick(rng, CONTEXT) };
  }
  return null;
}

function ttParts(d) {
  const seT = dec(roundTo(d.se, 4), 4);
  const tt = (d.p1 - d.p2) / Number(seT.replace(',', '.'));
  const tr = roundTo(tt, 2);
  const pv = pvalue(d.oneSided ? 'right' : 'two', tr);
  const pq = frac(d.k1 + d.k2, d.n1 + d.n2);
  return {
    reject: pv.v < 0.05, p: pv.v,
    parts: [
      { label: 'p̂₁', name: 'p1', kind: 'prob', expect: `${d.k1}/${d.n1}`, action: 'Proportions', lines: [{ math: `${d.k1}/${d.n1}`, subgoal: 'z' }, { math: dec(d.p1, 2) }].filter((l, i) => i === 0 || dec(d.p1, 2) !== `${d.k1}/${d.n1}`) },
      { label: 'p̂₂', name: 'p2', kind: 'prob', expect: `${d.k2}/${d.n2}`, action: 'Proportions', lines: [{ math: `${d.k2}/${d.n2}`, subgoal: 'z' }, { math: dec(d.p2, 2) }] },
      {
        label: 'p̂', name: 'pp', kind: 'prob', expect: `(${d.k1}+${d.k2})/(${d.n1}+${d.n2})`, action: 'Proportion poolée sous H₀',
        decisions: [{ prompt: 'Sous H₀ : p₁ = p₂, comment estimer la proportion commune ?', options: [
          { id: 'pool', label: 'Avec tous les individus : (k₁ + k₂)/(n₁ + n₂)', valid: true },
          { id: 'sep', label: 'Garder p̂₁ et p̂₂ séparément dans l’erreur standard', valid: false, rule: 'p_two_prop_no_pool', why: 'Sous H₀ les deux proportions sont égales : le cours les estime ensemble.' },
        ] }],
        lines: [{ math: `(${d.k1}+${d.k2})/(${d.n1}+${d.n2})`, note: 'Proportion poolée', subgoal: 'pool', blank: [String(d.n1 + d.n2)] }, { math: dec(d.p, 4) === pq ? pq : pq, blank: [pq] }].filter((l, i, a) => i === 0 || l.math !== a[0].math),
      },
      {
        label: 'se', name: 'se', kind: 'stat', expect: `√($pp*(1-$pp)*(1/${d.n1}+1/${d.n2}))`, decimals: 4, action: 'Erreur standard poolée',
        traps: {
          p_two_prop_no_pool: { values: [val(Math.sqrt(d.p1 * (1 - d.p1) / d.n1 + d.p2 * (1 - d.p2) / d.n2))], ctx: { p: dec(d.p, 4) } },
          p_two_sample_se: [val(Math.sqrt(d.p1 * (1 - d.p1) + d.p2 * (1 - d.p2)))],
        },
        lines: [{ math: `√(${dec(d.p, 4)}×${dec(1 - d.p, 4)}×(1/${d.n1}+1/${d.n2}))`, note: 'se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))', subgoal: 'pool' }, { math: seT }],
      },
      {
        label: 't_obs', name: 't', kind: 'stat', expect: '($p1-$p2)/$se', decimals: 2, action: 'Statistique',
        lines: [{ math: `(${dec(d.p1, 2)}-${dec(d.p2, 2)})/${seT}`, subgoal: 'z' }, { math: dec(tr, 2) }],
      },
      {
        label: 'p_obs', name: 'pv', kind: 'stat', expect: d.oneSided ? '1-#phi($t)' : '2*(1-#phi(abs($t)))', decimals: 2, action: 'p-valeur',
        traps: { p_pvalue_two_sided: { values: [val(pv.one)], ctx: { t: dec(Math.abs(tr), 2) } } },
        lines: [{ math: pv.line, note: d.oneSided ? 'Unilatéral' : 'Bilatéral', subgoal: 'z' }, { math: dec(roundTo(pv.v, 3), 3) }],
      },
    ],
  };
}

function ttItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return ttTf(rng, opts);
  const d = ttData(rng, level === 5);
  const [w1, w2, claim] = d.ctx;
  const story = `${d.k1} ${w1} sur n₁ = ${d.n1}, et ${d.k2} ${w2} sur n₂ = ${d.n2}. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ${d.oneSided ? '>' : '≠'} p₂ au niveau 5 %.`;
  if (opts.exam === 'mcq') {
    const f = (x) => dec(roundTo(x, 4), 4);
    return choice({
      skill: TT, level: 4, key: `mcq:${d.k1}:${d.n1}:${d.k2}:${d.n2}`, exam: examTag(opts), prompt: `${story} Quelle erreur standard utiliser sous H₀ ?`,
      right: f(d.se), wrongs: [{ html: f(Math.sqrt(d.p1 * (1 - d.p1) / d.n1 + d.p2 * (1 - d.p2) / d.n2)), rule: 'p_two_prop_no_pool' }, { html: f(Math.sqrt(d.p1 * (1 - d.p1) + d.p2 * (1 - d.p2))), rule: 'p_two_sample_se' }],
      fillers: [{ html: f(d.se * 2) }, { html: f(Math.sqrt(d.p * (1 - d.p) / (d.n1 + d.n2))) }],
    }, rng);
  }
  const { parts, reject, p } = ttParts(d);
  const o = {
    skill: TT, level, key: `${level}:${d.k1}:${d.n1}:${d.k2}:${d.n2}:${d.oneSided}`, prompt: story, parts,
    hints: H('Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus.', SM(`(${d.k1}+${d.k2})/□`), `p̂ = ${frac(d.k1 + d.k2, d.n1 + d.n2)}`),
    subgoals: TT_SUB, interpret: testConclusion(reject, 5, claim, { p }), exam: examTag(opts),
  };
  if (opts.exam === 'coef') return coefItem({ ...o, prompt: `${story} Donne la statistique t_obs (deux décimales).`, part: { label: 't_obs', kind: 'stat', expect: val(d.t), decimals: 2, accept: [], ref: {}, tol: 0.006, lines: [{ math: dec(roundTo(d.t, 2), 2) }] } });
  return statItem(o);
}

function ttTf(rng, opts) {
  if (rng.chance(0.4)) return tf({ skill: TT, key: 'eq', exam: examTag(opts), truth: true, statement: 'Quand n₁ = n₂, la proportion poolée est la moyenne de p̂₁ et p̂₂.', explanation: '(k₁ + k₂)/(2n) = (p̂₁ + p̂₂)/2.' });
  return tf({
    skill: TT, key: 'avg', exam: examTag(opts), truth: false, ruleIfTrue: 'p_two_prop_no_pool',
    statement: 'Sous H₀ : p₁ = p₂, on estime la proportion commune par la moyenne de p̂₁ = 0,2 et p̂₂ = 0,4, quels que soient n₁ et n₂.',
    explanation: 'La proportion poolée pondère par les tailles : avec n₁ = 100 et n₂ = 300, p̂ = (20 + 120)/400 = 0,35, pas 0,3.',
    counter: numCounter({ vars: [{ v: 'a', label: 'n₁ =', dom: 'N*' }, { v: 'b', label: 'n₂ =', dom: 'N*' }], hyp: 'a>0∧b>0', pred: '(0,2a+0,4b)/(a+b)=0,3', answer: { a: '100', b: '300' } }),
  });
}

export const GEN = { [TS]: tsItem, [TP]: tpItem, [TZ]: tzItem, [T1]: t1Item, [T2]: t2Item, [TT]: ttItem };
void ciInterpret;

// Generators of module P, part e: p-interpret (sentences about p-values
// and confidence intervals) and p-reg-diag (residual plots drawn by the
// app). Both have their own scale of items (catalogue « Niveaux (types
// propres) »): multiple choices and true/false, no calculation lines.
//
// p-interpret: L1 one sentence, « juste ou contresens ? » ; L2 four
// sentences, one right ; L3 « laquelle est fausse ? » ; L4 an interval and
// a p-value, which sentence is right (the traps of the module as options) ;
// L5 like L3, alone. The `match` of L4 (5 hypotheses to sort) is a
// multiple choice here.
// p-reg-diag: L1 one plot, 3 defects ; L2 one plot, 5 defects ; L3 two
// plots (residuals and QQ-plot) ; L4 the remedy ; L5 diagnosis and remedy.

import { choice, tf, numCounter, H, examTag } from './proba-kit.js';
import { mcq } from './kit.js';
import { vf, scatterSVG } from './proba-e-kit.js';
import { PhiInv } from '../../cas/stats.js';

const f2 = (x) => String(x).replace('.', ',').replace('-', '−');

// ======================================================================
// p-interpret
// ======================================================================

const INT = 'p-interpret';
const CONTEXTS = [
  { th: 'p', what: 'la proportion p de Suisses qui partent en randonnée le week-end', est: 'p̂', unit: '', ci: [[0.2, 0.6], [0.3, 0.5], [0.25, 0.45]] },
  { th: 'μ', what: 'la teneur moyenne μ en alcool d\'un vin (en %)', est: 'x̄', unit: ' %', ci: [[11.6, 12.4], [12.1, 12.9], [11.2, 11.8]] },
  { th: 'μ', what: 'la consommation moyenne μ d\'un compteur électrique (en kWh)', est: 'x̄', unit: ' kWh', ci: [[96, 104], [101, 109], [92, 99]] },
  { th: 'δ', what: 'la baisse moyenne δ de tension sous un médicament (en mmHg)', est: 'd̄', unit: ' mmHg', ci: [[2, 8], [-1, 5], [0.5, 6.5]] },
  { th: 'p', what: 'la proportion p de « oui » à une votation', est: 'p̂', unit: '', ci: [[0.48, 0.56], [0.51, 0.59], [0.44, 0.5]] },
];

function context(rng) {
  const C = rng.pick(CONTEXTS);
  const [a, b] = rng.pick(C.ci);
  const w = b - a;
  const round = (x) => Math.round(x * 100) / 100;
  const inside = round(a + w * rng.pick([0.25, 0.5, 0.75]));
  const outside = round(rng.chance(0.5) ? b + w * rng.pick([0.25, 0.5]) : a - w * rng.pick([0.25, 0.5]));
  const p = rng.pick([0.003, 0.02, 0.03, 0.04, 0.07, 0.08, 0.2, 0.45]);
  return { ...C, a, b, inside, outside, p, ic: `[${f2(a)} ; ${f2(b)}]` };
}

// Right sentences and wrong ones (with their trap) for a context.
function sentences(c) {
  const rej5 = c.p < 0.05;
  const right = [
    `Si on refaisait l'étude un grand nombre de fois, environ 95 % des IC construits de cette façon contiendraient ${c.th}.`,
    `${f2(c.inside)} est dans l'IC : le test bilatéral à 5 % ne rejette pas H₀ : ${c.th} = ${f2(c.inside)}.`,
    `${f2(c.outside)} est hors de l'IC : le test bilatéral à 5 % rejette H₀ : ${c.th} = ${f2(c.outside)}.`,
    `Si H₀ était vraie, on observerait un écart au moins aussi grand avec une probabilité de ${f2(c.p)}.`,
    rej5 ? `Avec p_obs = ${f2(c.p)}, on rejette H₀ au niveau 5 %, donc aussi au niveau 10 %.` : `Avec p_obs = ${f2(c.p)}, on ne rejette pas H₀ au niveau 5 % : les données sont compatibles avec H₀.`,
  ];
  const wrong = {
    p_ci_prob: `Il y a 95 % de chances que ${c.th} soit dans ${c.ic}.`,
    p_ci_data: `95 % des valeurs observées dans l'échantillon sont dans ${c.ic}.`,
    p_ci_xbar: `L'estimation ${c.est} est dans ${c.ic} avec probabilité 0,95.`,
    p_ci_intersection: 'Deux études indépendantes donnent chacune un IC à 95 % : leur intersection est un IC à 95 %.',
    p_pvalue_h0: `La probabilité que H₀ soit vraie est ${f2(c.p)}.`,
    p_accept_h0: rej5 ? `Si p_obs avait été 0,3, on aurait prouvé que H₀ est vraie.` : `On ne rejette pas H₀ : c'est la preuve que H₀ est vraie.`,
    p_reject_10_5: `Avec p_obs = 0,07, on rejette H₀ à 10 %, donc aussi à 5 %.`,
    p_significant_large: rej5 ? 'Le résultat est significatif, donc l\'effet est grand et important en pratique.' : 'Avec un échantillon dix fois plus grand, un effet significatif serait forcément grand.',
    p_multiple_tests: 'Sur 20 tests à 5 % faits sur les mêmes données, un seul rejette H₀ : l\'effet trouvé est démontré.',
  };
  return { right, wrong };
}
const TRAPS = ['p_ci_prob', 'p_ci_data', 'p_ci_xbar', 'p_ci_intersection', 'p_pvalue_h0', 'p_accept_h0', 'p_reject_10_5', 'p_significant_large', 'p_multiple_tests'];
const introCI = (c) => `IC à 95 % pour ${c.what} : ${c.ic}.`;
const introP = (c) => `Un test d'une hypothèse H₀ sur ${c.th}, fait sur d'autres données, donne p_obs = ${f2(c.p)}.`;

function intItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return intTf(rng, opts);
  const c = context(rng);
  const { right, wrong } = sentences(c);
  const ids = rng.shuffle(TRAPS);
  const exam = examTag(opts);
  if (level === 1 && !opts.exam) {
    const isRight = rng.chance(0.4);
    const id = ids[0];
    const s = isRight ? rng.pick(right) : wrong[id];
    return mcq({
      skill: INT, level, keepOrder: true, key: `${INT}:1:${isRight ? 'r' : id}:${c.a}:${c.p}`,
      prompt: `${introCI(c)} ${introP(c)}<br>Cette phrase est-elle <b>juste</b> ou un <b>contresens</b> ?<br><i>« ${s} »</i>`,
      options: [{ html: 'Juste', correct: isRight, rule: isRight ? null : id }, { html: 'Contresens', correct: !isRight }],
      solution: [{ html: isRight ? 'C\'est une lecture juste.' : 'Contresens : la phrase prête à l\'IC ou à la p-valeur un sens qu\'ils n\'ont pas.', note: '' }],
    }, rng);
  }
  if (level === 2 || (opts.exam === 'mcq' && rng.chance(0.5))) {
    return choice({ skill: INT, level: opts.exam ? 4 : level, prompt: `${introCI(c)} ${introP(c)}<br>Quelle phrase est juste ?`,
      right: rng.pick(right), wrongs: ids.slice(0, 3).map((id) => ({ html: wrong[id], rule: id })), key: `2:${ids.slice(0, 3).join(',')}:${c.a}:${c.p}`, exam }, rng);
  }
  if (level === 3 || level === 5 || opts.exam === 'mcq') {
    // « Laquelle est fausse ? » (format of the MATH-234 exam, ex. 2).
    const id = ids[0];
    const it = choice({ skill: INT, level: opts.exam ? 4 : level, prompt: `${introCI(c)} ${introP(c)}<br>Quelle affirmation est <b>fausse</b> ?`,
      right: wrong[id], wrongs: rng.shuffle(right).slice(0, 3).map((html) => ({ html })), key: `3:${id}:${c.a}:${c.p}`, exam }, rng);
    it.baits = [id];
    return it;
  }
  // Level 4: the interval and the tests (duality), with the traps.
  const r = rng.pick(right.slice(1, 3));
  const dual = r === right[1]
    ? `${f2(c.inside)} est dans l'IC, donc le test bilatéral à 5 % rejette H₀ : ${c.th} = ${f2(c.inside)}.`
    : `${f2(c.outside)} est hors de l'IC, donc le test bilatéral à 5 % ne rejette pas H₀ : ${c.th} = ${f2(c.outside)}.`;
  return choice({ skill: INT, level, prompt: `${introCI(c)} ${introP(c)}<br>Quelle phrase est juste ?`, right: r,
    wrongs: [{ html: dual }, ...ids.slice(0, 2).map((id) => ({ html: wrong[id], rule: id }))], key: `4:${ids.slice(0, 2).join(',')}:${c.a}:${c.p}`, exam }, rng);
}

function intTf(rng, opts) {
  const kind = rng.pick(['10-5', 'p03', 'dual', '5-10', 'inter', 'multi']);
  const exam = examTag(opts);
  if (kind === '10-5') {
    return tf({ skill: INT, key: kind, exam, truth: false, ruleIfTrue: 'p_reject_10_5', statement: 'Si on rejette H₀ au niveau 10 %, on la rejette aussi au niveau 5 %.',
      explanation: 'Avec p_obs = 0,07, on rejette à 10 % mais pas à 5 %. C\'est l\'inverse qui est vrai.',
      counter: numCounter({ vars: [{ v: 'p', label: 'Une p-valeur p_obs =' }], hyp: '0<p<0,1', pred: 'p<0,05', answer: { p: '0,07' } }) });
  }
  if (kind === 'p03') {
    return tf({ skill: INT, key: kind, exam, truth: false, ruleIfTrue: 'p_reject_10_5', statement: 'Avec p_obs = 0,03, on rejette H₀ à chacun des niveaux α = 5 % et α = 1 %.',
      explanation: 'On rejette quand p_obs < α : 0,03 < 0,05, mais 0,03 > 0,01.',
      counter: numCounter({ vars: [{ v: 'a', label: 'Un niveau α (0,05 ou 0,01) =', dom: [0.05, 0.01] }], pred: '0,03<a', answer: { a: '0,01' } }) });
  }
  if (kind === 'dual') return tf({ skill: INT, key: kind, exam, truth: true, statement: 'Un IC à 95 % contient exactement les valeurs θ₀ que le test bilatéral à 5 % (de même statistique) ne rejette pas.', explanation: 'C\'est la dualité entre tests et intervalles de confiance.' });
  if (kind === '5-10') return tf({ skill: INT, key: kind, exam, truth: true, statement: 'Si on rejette H₀ au niveau 5 %, on la rejette aussi au niveau 10 %.', explanation: 'p_obs < 0,05 entraîne p_obs < 0,10.' });
  if (kind === 'inter') return vf({ skill: INT, statement: 'Deux IC à 95 % pour θ, calculés sur des données différentes : leur intersection est un IC à 95 % pour θ.', truth: false, rule: 'p_ci_intersection', explanation: 'Chaque IC peut manquer θ dans 5 % des cas ; leur intersection peut le manquer plus souvent.', key: kind, opts }, rng);
  return vf({ skill: INT, statement: 'On fait 20 tests à 5 % sur des hypothèses H₀ toutes vraies : on n\'attend aucun rejet.', truth: false, rule: 'p_multiple_tests', explanation: 'Chaque test rejette à tort avec probabilité 0,05 : on attend environ un rejet par hasard.', key: kind, opts }, rng);
}

// ======================================================================
// p-reg-diag
// ======================================================================

const DIAG = 'p-reg-diag';
const DEFECTS = {
  curve: { name: 'une courbure (relation non linéaire)', hyp: 'la linéarité', remedy: 'Ajouter un terme en x² (modèle quadratique)', plot: 'fit', see: 'Les résidus dessinent un arc : la relation n\'est pas une droite.' },
  funnel: { name: 'un entonnoir (variance qui grandit)', hyp: 'la variance constante (homoscédasticité)', remedy: 'Transformer y (par exemple log y)', plot: 'fit', see: 'L\'écart des résidus grandit avec ŷ : la variance n\'est pas constante.' },
  outlier: { name: 'une valeur aberrante', hyp: 'l\'absence de points aberrants', remedy: 'Vérifier la mesure de ce point ; ne le retirer que si c\'est une erreur, et comparer les deux ajustements', plot: 'fit', see: 'Un seul point est très loin des autres résidus.' },
  autocorr: { name: 'des résidus liés dans l\'ordre (autocorrélation)', hyp: 'l\'indépendance des erreurs', remedy: 'Tenir compte de l\'ordre des mesures (modèle pour des erreurs dépendantes)', plot: 'order', see: 'Les résidus forment des vagues dans l\'ordre des mesures.' },
  heavy: { name: 'des queues lourdes (QQ-plot en S)', hyp: 'la normalité des erreurs', remedy: 'Ne pas se fier aux tests t ; utiliser plus de données ou une méthode robuste', plot: 'qq', see: 'Les points du QQ-plot s\'écartent de la droite aux deux bouts.' },
  none: { name: 'aucun défaut visible', hyp: 'aucune hypothèse', remedy: 'Garder le modèle linéaire', plot: 'fit', see: 'Les résidus forment une bande horizontale sans structure.' },
};
const PLOT_NAME = { fit: 'résidus en fonction de ŷ', order: 'résidus dans l\'ordre des mesures', qq: 'QQ-plot des résidus' };

const gauss = (rng) => Math.sqrt(-2 * Math.log(1 - rng.next())) * Math.cos(2 * Math.PI * rng.next());

// The residuals of a defect, as points of a plot.
function plotPoints(rng, defect, plot) {
  const n = 30;
  const yh = Array.from({ length: n }, (_, i) => 1 + (9 * i) / (n - 1));
  let res = yh.map(() => gauss(rng));
  if (defect === 'curve') res = yh.map((y, i) => 1.4 * ((y - 5.5) ** 2 / 6 - 1.15) + 0.35 * res[i]);
  if (defect === 'funnel') res = yh.map((y, i) => res[i] * (0.15 + 0.3 * y));
  if (defect === 'outlier') { res = res.map((x) => 0.8 * x); res[rng.int(5, 25)] = rng.pick([-1, 1]) * 5.5; }
  if (defect === 'autocorr') { const ph = rng.next() * 6; res = yh.map((_, i) => 1.6 * Math.sin(i / 3 + ph) + 0.3 * res[i]); }
  if (defect === 'heavy') res = res.map((x) => x * (1 + 0.5 * x * x));
  if (plot === 'qq') {
    const s = [...res].sort((a, b) => a - b);
    const sd = Math.sqrt(s.reduce((t, x) => t + x * x, 0) / n) || 1;
    return s.map((x, i) => [PhiInv((i + 0.5) / n), x / sd]);
  }
  if (plot === 'order') return res.map((x, i) => [i + 1, x]);
  return yh.map((y, i) => [y, res[i]]);
}
function plotHtml(rng, defect, plot) {
  const pts = plotPoints(rng, defect, plot);
  const svg = plot === 'qq' ? scatterSVG(pts, { xlabel: 'quantiles de N(0, 1)', ylabel: 'résidus réduits', diag: true, zero: false })
    : scatterSVG(pts, { xlabel: plot === 'order' ? 'ordre des mesures' : 'ŷ', ylabel: 'résidus' });
  return `<div style="text-align:center"><small>${PLOT_NAME[plot]}</small>${svg}</div>`;
}

// The defect a plot can show, by plot.
const FOR_PLOT = { fit: ['curve', 'funnel', 'outlier', 'none'], order: ['autocorr', 'none'], qq: ['heavy', 'none'] };

function diagItem(level, rng, profile, opts = {}) {
  const exam = examTag(opts);
  if (opts.exam === 'tf') return diagTf(rng, opts);
  if ((level === 4 && !opts.exam) || (opts.exam === 'mcq' && rng.chance(0.5)) || level === 5) return diagRemedy(level, rng, opts);
  if (level === 3) {
    // Two plots: residuals against ŷ, and the QQ-plot.
    const defect = rng.pick(['curve', 'funnel', 'heavy', 'none', 'outlier']);
    const fit = plotHtml(rng, ['heavy'].includes(defect) ? 'none' : defect, 'fit');
    const qq = plotHtml(rng, defect === 'heavy' ? 'heavy' : 'none', 'qq');
    const D = DEFECTS[defect];
    const others = Object.keys(DEFECTS).filter((k) => k !== defect && k !== 'autocorr');
    return choice({ skill: DIAG, level, prompt: `Deux graphiques d'une régression linéaire :${fit}${qq}Quelle hypothèse est violée ?`,
      right: defect === 'none' ? 'Aucune : les deux graphiques sont sans défaut' : `${D.hyp[0].toUpperCase()}${D.hyp.slice(1)}`,
      wrongs: rng.shuffle(others).slice(0, 3).map((k) => ({ html: k === 'none' ? 'Aucune : les deux graphiques sont sans défaut' : `${DEFECTS[k].hyp[0].toUpperCase()}${DEFECTS[k].hyp.slice(1)}` })),
      key: `3:${defect}`, exam, solution: [{ html: D.see, note: '' }] }, rng);
  }
  const plot = rng.pick(level === 1 ? ['fit'] : ['fit', 'fit', 'order', 'qq']);
  const defect = rng.pick(FOR_PLOT[plot]);
  const D = DEFECTS[defect];
  const pool = Object.keys(DEFECTS).filter((k) => k !== defect);
  const n = level === 1 ? 2 : 4;
  return choice({ skill: DIAG, level: opts.exam ? 4 : level, prompt: `Graphique d'une régression linéaire :${plotHtml(rng, defect, plot)}Quel défaut ce graphique montre-t-il ?`,
    right: D.name, wrongs: rng.shuffle(pool).slice(0, n).map((k) => ({ html: DEFECTS[k].name })), count: n + 1, key: `${level}:${plot}:${defect}`, exam, solution: [{ html: D.see, note: '' }] }, rng);
}

// Level 4 and 5: what to do; the traps of the catalogue as options.
function diagRemedy(level, rng, opts) {
  const defect = rng.pick(['curve', 'funnel', 'outlier', 'heavy']);
  const D = DEFECTS[defect];
  const plot = D.plot;
  const r2 = String(rng.pick([0.91, 0.93, 0.95, 0.97])).replace('.', ',');
  const right = level === 5 ? `Hypothèse violée : ${D.hyp}. Remède : ${D.remedy[0].toLowerCase()}${D.remedy.slice(1)}.` : D.remedy;
  const wrongs = [
    { html: defect === 'heavy' ? 'Vérifier la normalité sur un QQ-plot des valeurs de y, plutôt que des résidus' : 'Tester la normalité de y plutôt que celle des résidus', rule: 'p_diag_normal_y' },
    { html: `Garder le modèle tel quel : R² = ${r2} montre qu'il est adapté`, rule: 'p_r2_high_good' },
    { html: 'Supprimer le point qui s\'écarte le plus, puis refaire l\'ajustement', rule: 'p_outlier_delete' },
  ];
  return choice({ skill: DIAG, level: opts.exam ? 4 : level, prompt: `Régression linéaire, R² = ${r2}. Graphique :${plotHtml(rng, defect, plot)}${level === 5 ? 'Quel diagnostic et quel remède ?' : 'Que faut-il faire ?'}`,
    right, wrongs, key: `${level}:remedy:${defect}:${r2}`, exam: examTag(opts), solution: [{ html: `${D.see} ${D.remedy}.`, note: '' }] }, rng);
}

function diagTf(rng, opts) {
  const kind = rng.pick(['r2', 'y', 'funnel', 'resid']);
  if (kind === 'r2') return vf({ skill: DIAG, statement: 'Un R² de 0,95 garantit que le modèle linéaire est adapté.', truth: false, rule: 'p_r2_high_good', explanation: 'Des points sur une parabole peu courbée donnent un R² élevé avec une droite ; la courbure se voit sur les résidus.', key: kind, opts }, rng);
  if (kind === 'y') return vf({ skill: DIAG, statement: 'On vérifie la normalité sur les valeurs de y plutôt que sur les résidus.', truth: false, rule: 'p_diag_normal_y', explanation: 'Le modèle suppose les erreurs normales ; y dépend de x et n\'a pas à être normal.', key: kind, opts }, rng);
  if (kind === 'funnel') return tf({ skill: DIAG, key: kind, exam: examTag(opts), truth: true, statement: 'Des résidus en forme d\'entonnoir (écart qui grandit avec ŷ) signalent une variance non constante.', explanation: 'C\'est l\'hétéroscédasticité.' });
  return tf({ skill: DIAG, key: kind, exam: examTag(opts), truth: true, statement: 'Pour une droite des moindres carrés avec ordonnée à l\'origine, la somme des résidus vaut 0.', explanation: 'C\'est la première équation normale.' });
}

export const GEN = { [INT]: intItem, [DIAG]: diagItem };
void H;

// v-proof-identity (module V, part b, step U10): short proofs of 3 points
// (exam 2021 and the mock exam): with div F = 0 (or rot F = 0), a field G
// built from F by a symmetry and an exchange of components has rot G = 0
// (so a potential on ℝ², which is convex) or div G = 0.
// Levels 1, 2 and 5: proofs in blocks (order, decoys named by their trap).
// Levels 3 and 4: the calculation lines, judged by `equiv` with a sample
// field F = (∂ψ/∂y, −∂ψ/∂x) (div F = 0 by construction, ψ a random
// polynomial) in place of the abstract F₁, F₂ (catalogue: « F₁, F₂
// remplacées par des fonctions tirées au hasard »).

import { KEYS, pick, SG, H, MT, sum, cm, eqJudge, partsItem, examTag, decision, menu } from './vecto-b-kit.js';
import { blocksItem } from './kit.js';
import { t } from '../../i18n.js';

const SK = 'v-proof-identity';
const XY = ['x', 'y'];

// ---------- templates (abstract) ----------

// div F = 0 ⇒ rot G = 0 ⇒ potential; or rot F = 0 ⇒ div G = 0.
const TEMPLATES = {
  // Exam 2021: G(x, y) = (F₂(−x, y), F₁(−x, y)).
  mx: {
    hyp: 'div F = 0', G: 'G(x, y) = (F₂(−x, y), F₁(−x, y))', goal: 'G dérive d\'un potentiel sur ℝ²', what: 'rot',
    def: 'rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y = ∂/∂x [F₁(−x, y)] − ∂/∂y [F₂(−x, y)]',
    ch1: t('∂/∂x [F₁(−x, y)] = −(∂F₁/∂x)(−x, y), par la règle de chaîne (la dérivée de −x vaut −1)'),
    ch2: '∂/∂y [F₂(−x, y)] = (∂F₂/∂y)(−x, y)',
    res: 'rot G(x, y) = −(∂F₁/∂x + ∂F₂/∂y)(−x, y) = −div F(−x, y) = 0',
    bad: '∂/∂x [F₁(−x, y)] = (∂F₁/∂x)(−x, y)',
  },
  // G(x, y) = (F₂(x, −y), F₁(x, −y)).
  my: {
    hyp: 'div F = 0', G: 'G(x, y) = (F₂(x, −y), F₁(x, −y))', goal: 'G dérive d\'un potentiel sur ℝ²', what: 'rot',
    def: 'rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y = ∂/∂x [F₁(x, −y)] − ∂/∂y [F₂(x, −y)]',
    ch1: '∂/∂x [F₁(x, −y)] = (∂F₁/∂x)(x, −y)',
    ch2: t('∂/∂y [F₂(x, −y)] = −(∂F₂/∂y)(x, −y), par la règle de chaîne (la dérivée de −y vaut −1)'),
    res: 'rot G(x, y) = (∂F₁/∂x + ∂F₂/∂y)(x, −y) = div F(x, −y) = 0',
    bad: '∂/∂y [F₂(x, −y)] = (∂F₂/∂y)(x, −y)',
  },
  // G = (F₂, −F₁): rot G = −div F.
  sw: {
    hyp: 'div F = 0', G: 'G = (F₂, −F₁)', goal: 'G dérive d\'un potentiel sur ℝ²', what: 'rot',
    def: 'rot G = ∂G₂/∂x − ∂G₁/∂y = ∂(−F₁)/∂x − ∂F₂/∂y',
    ch1: null, ch2: null,
    res: 'rot G = −(∂F₁/∂x + ∂F₂/∂y) = −div F = 0',
    bad: null,
  },
  // rot F = 0, G = (−F₂, F₁): div G = −rot F.
  dv: {
    hyp: 'rot F = 0', G: 'G = (−F₂, F₁)', goal: 'div G = 0 sur ℝ²', what: 'div',
    def: 'div G = ∂G₁/∂x + ∂G₂/∂y = −∂F₂/∂x + ∂F₁/∂y',
    ch1: null, ch2: null,
    res: 'div G = −(∂F₂/∂x − ∂F₁/∂y) = −rot F = 0',
    bad: null,
  },
};

const SUB = [
  SG('definition', t('écrire rot G (ou div G) avec la définition'), 'v-ops'),
  SG('chain', t('règle de chaîne'), 'a2-chain'),
  SG('hyp', t('reconnaître l\'hypothèse'), 'v-proof-identity'),
  SG('conclude', t('citer le théorème avec ses hypothèses'), 'v-proof-identity'),
];

function proofBlocks(level, rng, opts) {
  const keys = level === 1 ? ['mx', 'my'] : level === 2 ? ['mx', 'my', 'sw'] : opts.exam ? ['mx', 'my'] : ['my', 'sw', 'dv'];
  const k = pick(rng, keys);
  const T = TEMPLATES[k];
  const blocks = [{ id: 'def', html: T.def, needs: [] }];
  const order = ['def'];
  if (T.ch1) { blocks.push({ id: 'ch1', html: T.ch1, needs: [] }, { id: 'ch2', html: T.ch2, needs: [] }); order.push('ch1', 'ch2'); }
  blocks.push({ id: 'res', html: T.res, needs: T.ch1 ? ['def', 'ch1', 'ch2'] : ['def'] });
  order.push('res');
  if (T.what === 'rot') {
    blocks.push({ id: 'concl', html: t('ℝ² est convexe et G est de classe C¹ : G dérive d\'un potentiel sur ℝ²'), needs: ['res'] });
    order.push('concl');
  } else {
    blocks.push({ id: 'concl', html: t('Donc div G = 0 en tout point de ℝ²'), needs: ['res'] });
    order.push('concl');
  }
  const decoys = [];
  if (T.bad) decoys.push({ id: 'bad', html: T.bad, distractor: 'v_chain_sign', why: t('La dérivée intérieure de −x (ou −y) vaut −1 : il manque un signe −.') });
  if (T.what === 'rot') {
    decoys.push({ id: 'nodom', html: t('rot G = 0, donc G dérive d\'un potentiel, quel que soit le domaine'), distractor: 'v_pot_no_domain', why: t('rot G = 0 ne suffit que sur un domaine simplement connexe (ou convexe) : il faut le dire.') });
    decoys.push({ id: 'sign', html: 'rot G = ∂G₁/∂y − ∂G₂/∂x', distractor: 'v_rot_sign', why: 'rot G = ∂G₂/∂x − ∂G₁/∂y.' });
  }
  decoys.push({ id: 'conf', html: T.what === 'rot' ? 'rot G = div F' : 'div G = div F', distractor: 'v_div_rot_confuse', why: t('Le calcul donne ±(div F ou rot F) au point transformé, pas cette égalité.') });
  const nDecoys = level === 1 ? 0 : level === 2 ? 1 : 2;
  const chosen = level === 2 && T.bad ? [decoys[0]] : rng.shuffle(decoys).slice(0, nDecoys);
  for (const d of chosen) blocks.push({ ...d, needs: [] });
  return blocksItem({
    skill: SK, level, mode: 'order', blocks: rng.shuffle(blocks), goal: 'concl', order,
    prompt: t('Soit F : ℝ² → ℝ² de classe C¹ avec {hyp}, et {G}. Montre que {goal}. Range les blocs de la preuve{a}.', { hyp: T.hyp, G: T.G, goal: t(T.goal), a: nDecoys ? t(' (attention : certains blocs sont faux)') : '' }),
    hints: H(t('Écris {what} G avec la définition.', { what: T.what }), T.ch1 ? T.ch1 : T.def, T.res),
    noHints: level >= 5 || !!opts.exam,
    subgoals: SUB, key: `${k}:${level}:${chosen.map((d) => d.id).join('')}`, exam: examTag(opts, 3),
  });
}

// ---------- the calculation with a sample field ----------

// ψ = a x²y + b y³ + c x y² + d x³; F = (∂ψ/∂y, −∂ψ/∂x).
function sample(rng) {
  const [a, b, c, d] = [pick(rng, [1, 2, -1]), pick(rng, [0, 1, -1]), pick(rng, [1, -2, 3]), pick(rng, [0, 1, 2])];
  const F1 = (X, Y) => sum([cm(a, `${X}^2`), cm(3 * b, `${Y}^2`), cm(2 * c, `${X}${Y}`)]);
  const F2 = (X, Y) => sum([cm(-2 * a, `${X}${Y}`), cm(-c, `${Y}^2`), cm(-3 * d, `${X}^2`)]);
  const F1x = (X, Y) => sum([cm(2 * a, X), cm(2 * c, Y)]);
  const F2y = (X, Y) => sum([cm(-2 * a, X), cm(-2 * c, Y)]);
  return { a, b, c, d, F1, F2, F1x, F2y, id: `${a}${b}${c}${d}`, F: `F(x, y) = (${MT(F1('x', 'y'))}, ${MT(F2('x', 'y'))})` };
}

function proofLines(level, rng, opts) {
  const S = sample(rng);
  const k = pick(rng, ['mx', 'my']);
  const T = TEMPLATES[k];
  const [X, Y] = k === 'mx' ? ['(-x)', 'y'] : ['x', '(-y)'];
  const G1 = S.F2(X, Y);
  const G2 = S.F1(X, Y);
  const d1 = k === 'mx' ? `-(${S.F1x(X, Y)})` : S.F1x(X, Y);
  const d2 = k === 'my' ? `-(${S.F2y(X, Y)})` : S.F2y(X, Y);
  const pt = k === 'mx' ? '(−x, y)' : '(x, −y)';
  const defDec = decision('rot G(x, y) = ?', [
    { id: 'def', label: '∂G₂/∂x − ∂G₁/∂y', valid: true, ref: true },
    { id: 'sign', label: '∂G₁/∂y − ∂G₂/∂x', valid: false, rule: 'v_rot_sign', why: 'rot G = ∂G₂/∂x − ∂G₁/∂y.' },
    { id: 'div', label: '∂G₁/∂x + ∂G₂/∂y', valid: false, rule: 'v_div_rot_confuse', why: t('Ça, c\'est div G.') },
  ]);
  const concl = decision(t('Pour conclure que G dérive d\'un potentiel :'), [
    { id: 'conv', label: t('rot G = 0 sur ℝ², qui est convexe, et G ∈ C¹'), valid: true, ref: true },
    { id: 'nodom', label: t('rot G = 0 suffit, quel que soit le domaine'), valid: false, rule: 'v_pot_no_domain', why: t('Il faut un domaine simplement connexe (ou convexe) : ici ℝ², qui est convexe.') },
  ]);
  const chainMenu = menu(t('Règle de chaîne : multiplier par la dérivée de l\'intérieur'), [{ label: t('Dériver F₁ sans la dérivée intérieure'), rule: 'v_chain_sign', why: t('La dérivée de −x (ou −y) vaut −1.') }]);
  const parts = [];
  if (level === 3) {
    parts.push({
      html: t('Avec cet exemple, G₂(x, y) = F₁{pt} = {G2}. La règle de chaîne : ∂/∂x [F₁{pt}] = {a}(∂F₁/∂x){pt} :', { pt, G2: MT(G2), a: k === 'mx' ? '−' : '' }), ask: `∂/∂x [F₁${pt}] =`,
      start: `pd(${G2}, x)`, judge: eqJudge(XY), decisions: [defDec], menu: chainMenu,
      lines: [{ math: d1, subgoal: 'chain' }],
    }, {
      html: `G₁(x, y) = F₂${pt} = ${MT(G1)}. ∂/∂y [F₂${pt}] = ${k === 'my' ? '−' : ''}(∂F₂/∂y)${pt} :`, ask: `∂/∂y [F₂${pt}] =`,
      start: `pd(${G1}, y)`, judge: eqJudge(XY), menu: chainMenu,
      lines: [{ math: d2, subgoal: 'chain' }],
    });
  }
  parts.push({
    html: `rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y${level === 3 ? t(', avec les deux lignes ci-dessus') : ''} :`, ask: 'rot G =',
    start: `pd(${G2}, x) - pd(${G1}, y)`, judge: eqJudge(XY),
    decisions: level === 3 ? [concl] : [defDec, concl],
    menu: menu(t('rot G = ∂/∂x [F₁(…)] − ∂/∂y [F₂(…)], puis reconnaître div F'), [{ label: t('Oublier le −1 de la dérivée intérieure'), rule: 'v_chain_sign', why: t('La dérivée de −x (ou −y) vaut −1.') }]),
    lines: [{ math: `(${d1})-(${d2})`, subgoal: 'definition' }],
  });
  return partsItem({
    skill: SK, level, parts, keys: KEYS,
    prompt: t('On veut montrer : si div F = 0 et {G}, alors G dérive d\'un potentiel sur ℝ². Vérifie le calcul sur l\'exemple {F} (div F = 0). Écris rot G avec la règle de chaîne, puis conclus.', { G: T.G, F: S.F }),
    hints: H(t('Écris rot G avec la définition : rot G = ∂G₂/∂x − ∂G₁/∂y.'), `∂/∂x [F₁${pt}] = ${k === 'mx' ? '−' : ''}(∂F₁/∂x)${pt}.`, `${T.res}.`),
    subgoals: SUB, key: `${SK}:${level}:${k}:${S.id}`, exam: examTag(opts, 3),
  });
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam) return proofBlocks(4, rng, opts);
    if (level === 3 || level === 4) return proofLines(level, rng, opts);
    return proofBlocks(level, rng, opts);
  },
};

// f-ft-eq (module F, part b, step U10): a·u + b·(f ∗ u) = f with f =
// e^(−w|x|), solved by the Fourier transform. Built backwards (catalogue):
// û = (√(2/π) w/a)/(α² + W²) with W² = w² + 2bw/a a perfect square, so
// u = (w/(aW)) e^(−W|x|). Parts: f̂ (F7, judge transform), the transformed
// equation and û isolated (transform with the unknown û and the symbol
// f̂), the rational fraction simplified (equiv in α, target 'short' with
// the goal), back to x (transform, inverse; decision: f_no_inverse,
// f_table_half_line). Level 5 and the open variant: exam example F2 (8
// points, with the definition of f̂). The catalogue's template with u″ in
// the convolution is not built.

import { examTag } from './kit.js';
import { partsItem } from './geo-kit.js';
import { problemItem } from './kit-problem.js';
import { q, H, ft, fac, FML, mcqF, defBlocks, KEYS_FT, TABLE } from './fourier-b-kit.js';

const SK = 'f-ft-eq';
const SUB = [
  { id: 'table', label: 'f̂ par la table', skill: 'f-ft-table' },
  { id: 'transform', label: 'transformer l\'équation', skill: SK },
  { id: 'isolate', label: 'isoler û', skill: 'iso-formula' },
  { id: 'simplify', label: 'simplifier la fraction', skill: 'rat-operations' },
  { id: 'inverse', label: 'revenir en x', skill: 'f-ft-table' },
];
// (a, b, w): W² = w² + 2bw/a is a perfect square.
const CASES = [[2, 3, 1], [4, 6, 1], [1, 4, 1], [2, 8, 1], [1, [3, 2], 1], [4, 5, 2], [1, 3, 2], [2, 6, 2], [3, 8, 3], [2, 9, 3]];

export function eqData(rng, pick = null) {
  const [a, bRaw, w] = pick || rng.pick(CASES);
  const b = Array.isArray(bRaw) ? q(bRaw[0], bRaw[1]) : q(bRaw);
  const W2 = q(w * w).add(b.mul(2 * w).div(a));
  const W = Math.round(Math.sqrt(W2.valueOf()));
  const kap = q(w, a); // û = κ√(2/π)/(α² + W²)
  const uc = kap.div(W); // u = uc·e^(−W|x|)
  const bT = b.d === 1 ? String(b.n) : `(${b})`;
  const aT = a === 1 ? '' : String(a);
  const wT = w === 1 ? '' : String(w);
  const fT = `e^(-${wT}|x|)`;
  const fhat = `${wT}√(2/π)/(α^2+${w * w})`;
  const twobw = b.mul(2 * w);
  const tb = twobw.d === 1 ? String(twobw.n) : `(${twobw})`;
  const uT = uc.n === 1 ? `e^(-${W}|x|)/${uc.d}`.replace(/\/1$/, '') : `${uc.n}e^(-${W}|x|)/${uc.d}`.replace(/\/1$/, '');
  const hatT = `${fac(kap)}√(2/π)/(α^2+${W * W})`;
  const den4 = a === 1 ? `α^2+${w * w}+${tb}` : `${a}(α^2+${w * w})+${tb}`;
  return {
    id: `${a}:${b}:${w}`, a, b, w, W, kap, uc,
    eqText: `${aT}u + ${b.d === 1 ? b.n : `(${b})`}(f ∗ u) = f`.replace(/-/g, '−'),
    fT, fhat,
    start: `${aT}u + ${bT}(f∗u) = f`,
    eqLine: `${aT}û + ${bT}√(2π) f̂ û = f̂`,
    iso: `û = f̂/(${a} + ${bT}√(2π) f̂)`,
    sub0: `(${fhat})/(${a}+${bT}√(2π)(${fhat}))`,
    sub1: `(${fhat})/(${a}+${tb}/(α^2+${w * w}))`,
    sub2: `${wT}√(2/π)/(${den4})`,
    hat: hatT,
    hatLine: `û = ${hatT}`,
    u: uT,
    uLine: `u(x) = ${uT}`,
    tb,
    traps: {
      eqB: {
        f_sqrt2pi_conv: [`û = f̂/(${a} + ${bT} f̂)`],
        f_conv_coef_dropped: [`û = f̂/(${a} + √(2π) f̂)`],
      },
      simp: a === 1 ? {} : { f_rat_simplify: [`${wT}√(2/π)/(${a}α^2+${w * w + twobw.valueOf()})`] },
      inv: {
        f_abs_dropped: [`u(x) = ${uT.replace(`|x|`, 'x')}`],
        ...(a === 1 ? {} : { f_rat_simplify: [`û = ${fac(kap)}√(2/π)/(α^2+${a * W * W})`] }),
      },
    },
  };
}

function parts(d) {
  const eqCfg = ft({ unknown: 'û', symbols: { 'f̂': d.fhat }, f: d.u, F: d.hat, dir: 'inverse', final: 'any', traps: d.traps.eqB });
  return [{
    html: '', start: `f(x) = ${d.fT}`, judge: ft({ f: d.fT, F: d.fhat, traps: { f_table_line: [{ line: `f̂(α) = 1/(√(2π)(${d.w}+iα))`, ctx: { want: 'F7' } }] } }),
    notes: [],
    menu: [{ id: 'table', label: 'Ligne F7 de la table', valid: true }, { id: 'F3', label: 'Ligne F3 de la table', valid: false, rule: 'f_table_line', why: 'F3 est e^(−wy) pour y > 0 seulement ; e^(−w|x|) est paire : F7.' }],
    lines: [{ math: `f̂(α) = ${d.fhat}`, note: `Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = ${d.w}`, subgoal: 'table', blank: [String(d.w * d.w)] }],
  }, {
    html: 'L\'équation transformée :', ask: 'Transforme l\'équation, puis isole û.', start: d.start, judge: eqCfg,
    menu: [
      { id: 'transform', label: 'Appliquer ℱ : ℱ(f ∗ u) = √(2π) f̂ û', valid: true },
      { id: 'isolate', label: 'Isoler û', valid: true },
      { id: 'inverse', label: 'Appliquer ℱ⁻¹ tout de suite', valid: false, rule: 'f_no_inverse', why: 'On ne connaît pas encore û : isole-le d\'abord.' },
    ],
    lines: [
      { math: d.eqLine, note: 'ℱ(f ∗ u) = √(2π) f̂ û', subgoal: 'transform', blank: ['√(2π)'], blank2: [d.b.d === 1 ? String(d.b.n) : `(${d.b})`] },
      { math: d.iso, note: 'Mettre û en facteur', subgoal: 'isolate' },
    ],
  }, {
    html: 'On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :', ask: 'Simplifie û(α).', start: d.sub0,
    judge: { kind: 'equiv', vars: ['α'], domain: { α: [-3, 3] }, target: 'short', goal: d.sub2, slack: 0, traps: d.traps.simp },
    menu: [
      { id: 'same', label: 'Mettre au même dénominateur', valid: true },
      { id: 'factor', label: 'Mettre le coefficient de α² en facteur', valid: true },
      { id: 'expand', label: 'Développer le numérateur', valid: false, why: 'Le numérateur est déjà simple : c\'est le dénominateur qu\'on réduit.' },
    ],
    lines: [
      { math: d.sub1, note: '√(2π)·√(2/π) = 2', subgoal: 'isolate', blank: [d.tb] },
      { math: d.sub2, note: 'Même dénominateur', subgoal: 'simplify', blank: [d.tb], blank2: [d.tb] },
    ],
  }, {
    html: 'Retour en x :', ask: 'Fais apparaître une ligne de la table, puis trouve u(x).', start: `û = ${d.sub2}`, judge: ft({ unknown: 'û', symbols: { 'f̂': d.fhat }, f: d.u, F: d.hat, dir: 'inverse', traps: d.traps.inv }),
    decisions: [{
      kind: 'decision', prompt: 'Il reste à :', options: [
        { id: 'F7', label: `reconnaître la ligne F7 (paire) avec w = ${d.W} et revenir en x`, valid: true, ref: true },
        { id: 'stop', label: 'rien : la réponse est û', valid: false, rule: 'f_no_inverse', why: 'On demande u(x) : il faut revenir en x avec la table.' },
        { id: 'F3', label: `lire la ligne F3 : u(x) = c·e^(−${d.W}x)`, valid: false, rule: 'f_table_half_line', why: 'F3 décrit une fonction nulle pour x < 0, de transformée non paire ; û est pair : ligne F7.' },
      ],
    }],
    menu: [
      { id: 'F7', label: 'Ligne F7 de la table', valid: true },
      { id: 'stop', label: 'Conclure : û est la réponse', valid: false, rule: 'f_no_inverse', why: 'On demande u(x).' },
      { id: 'F3', label: 'Ligne F3 de la table', valid: false, rule: 'f_table_half_line', why: 'F3 est une demi-droite ; û est pair : F7.' },
    ],
    lines: [
      { math: d.hatLine, note: `Coefficient de α² en facteur : W² = ${d.W * d.W}`, subgoal: 'simplify', blank: [String(d.W * d.W)], blank2: [String(d.W * d.W)] },
      { math: d.uLine, note: `F7 avec w = ${d.W}, sur tout ℝ`, subgoal: 'inverse', blank: [`|x|`], blank2: [String(d.W)] },
    ],
  }];
}

export function eqLines(level, rng, opts = {}, d = eqData(rng)) {
  return partsItem({
    skill: SK, level, parts: parts(d),
    prompt: `Trouve u : ℝ → ℝ telle que ${d.eqText}, avec f(x) = ${FML(d.fT)} (on suppose u intégrable).${TABLE()}`,
    hints: H('Transforme : la convolution devient √(2π) f̂ û. Puis isole û, simplifie et reconnais une ligne de la table.',
      FML(`û (${d.a} + ${d.b.d === 1 ? d.b.n : `(${d.b})`}√(2π) · ${d.fhat}) = f̂`), FML(d.sub2)),
    subgoals: SUB, keys: KEYS_FT, key: `${SK}:${level}:${d.id}`, exam: examTag(opts), noHints: level >= 5 || !!opts.exam,
  });
}

// ---------- the exam example F2 (8 points) ----------

function eqProblem(level, rng, opts = {}) {
  const d = eqData(rng);
  const def = defBlocks(SK, 4, rng, { noHints: true, subgoals: [{ id: 'definition', label: 'définition de f̂', skill: 'f-ft-direct' }] });
  const calc = eqLines(5, rng, {}, d);
  return problemItem({
    skill: SK, level,
    prompt: `(i) Donne la définition de la transformée de Fourier, avec ses hypothèses. (ii) Trouve u telle que ${d.eqText}, f(x) = ${FML(d.fT)}.${TABLE()}`,
    parts: [{ item: def, points: 2, title: 'Définition de f̂' }, { item: calc, points: [1, 2, 1.5, 1.5], title: 'Résolution' }],
    key: `${d.id}:${level}`, exam: opts.exam ? { format: 'open', points: 8 } : false,
  });
}

// ---------- multiple choice ----------

function mcqVariant(level, rng, opts) {
  const d = eqData(rng);
  const right = [FML(d.hatLine), FML(d.uLine), FML(`û(0) = ${fac(d.kap)}√(2/π)/${d.W * d.W}`)];
  const wrongs = [
    { html: FML(d.traps.eqB.f_sqrt2pi_conv[0]), rule: 'f_sqrt2pi_conv' },
    { html: FML(d.traps.inv.f_abs_dropped[0]), rule: 'f_abs_dropped' },
    ...(d.a === 1 ? [] : [{ html: FML(d.traps.inv.f_rat_simplify[0]), rule: 'f_rat_simplify' }]),
    { html: FML(`u(x) = ${d.hat.replace(/α/g, 'x')}`), rule: 'f_no_inverse' },
    { html: FML(d.traps.eqB.f_conv_coef_dropped[0]), rule: 'f_conv_coef_dropped' },
  ];
  return mcqF({
    skill: SK, level, exam: examTag(opts), key: `${SK}:mcq:${d.id}`,
    prompt: `u est intégrable et vérifie ${d.eqText} avec f(x) = ${FML(d.fT)}. ${opts.exam ? 'Cochez les affirmations vraies.' : 'Quelle affirmation est vraie ?'}${TABLE()}`,
    right: opts.exam ? rng.shuffle(right).slice(0, rng.pick([1, 2, 3])) : [right[rng.int(0, 1)]], wrongs: rng.shuffle(wrongs),
    solution: [{ html: `${FML(d.eqLine)}, f̂ = ${FML(d.fhat)}, donc ${FML(d.hatLine)} et ${FML(d.uLine)}.`, note: '' }],
    expectedSec: 240,
  }, rng);
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return mcqVariant(4, rng, opts);
    if (opts.exam === 'open') return eqProblem(4, rng, opts);
    if (level === 5) return eqProblem(5, rng, opts);
    return eqLines(level, rng, opts);
  },
};

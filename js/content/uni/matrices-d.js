// Generators of module M, part d (unit `matrices`, step U8), spec §8.3:
// m-ode-modes (x′ = Ax: modes, stability), m-expm (e^{At}), m-discrete
// (x_{k+1} = Ax_k). Catalogue: docs/universite/L-M-algebre-lineaire.md,
// part M.
//
// Items are chains of parts (segments), each with its judge: the companion
// matrix (mat), det(A − λI) (det), eigenvalues a ± ib (complex), an
// eigenvector (eigvec), the coefficients c (mat), x(t), e^{At} and x_k
// (odevec: the general line with c_1, c_2, the constants, then the
// solution), y(t) (ode), and the stability (value: α = max Re λ, or
// ρ(A) = max |λ|, after a decision whose wrong options carry the traps).
// Levels: 1–2 guided (grid cells, blanks; level 1 shows the decisions as
// notes), 3 choose the action (a menu per part), 4 free, 5 alone.

import * as MX from '../../cas/matrix.js';
import { MT } from './kit.js';
import { coefItem, mcqDistinct, tfL, examTag } from './alglin-kit.js';
import { problemItem, asProblem } from './kit-problem.js';
import {
  q, mt, vt, fq, qt, nz, R, ML, MLm, CM, listFr, modeT, combo, lin, polyT, factoredT, charLines,
  realSystem, complexSystem, complexModes, doubleSystem, expmDoubleT, solDoubleT, expmDiagT, expmEntryAt1,
  partsItem, vcells, mcells, withBlanks,
} from './matrices-d-kit.js';
import { t } from '../../i18n.js';

const MODES = 'm-ode-modes';
const EXPM = 'm-expm';
const DISC = 'm-discrete';

const MV = (text) => ML(text);
// The sentence added to a prompt at level 3 (the menu of actions).
const tapText = (level) => (level === 3 ? ` ${t('Choisis d\'abord chaque action.')}` : '');
const vR = (v) => R(vt(v));

// ---------- menus of the « choose the action » level ----------

const MENU = {
  companion: [
    { id: 'comp', label: t('x = (y ; ẏ) : la première ligne dit ẏ = ẏ, la seconde ÿ en fonction de y et ẏ'), valid: true },
    { id: 'copy', label: t('Recopier les coefficients de l\'équation dans la ligne du bas'), valid: false, rule: 'm_companion_sign', why: t('On isole ÿ : les coefficients passent de l\'autre côté et changent de signe.') },
  ],
  charpoly: [
    { id: 'dev', label: t('Développer det(A − λI), puis factoriser'), valid: true },
    { id: 'rref', label: t('Échelonner A et lire la diagonale'), valid: false, rule: 'l_eigen_rref', why: t('Les opérations sur les lignes changent les valeurs propres.') },
  ],
  roots: [
    { id: 'roots', label: t('Résoudre λ² + pλ + q = 0 (discriminant négatif : racines complexes)'), valid: true },
    { id: 'coef', label: t('Lire les valeurs propres sur la diagonale de A'), valid: false, why: t('A n\'est pas triangulaire : les valeurs propres sont les racines du polynôme.') },
  ],
  kernel: [
    { id: 'ker', label: t('Un vecteur du noyau de A − λI'), valid: true },
    { id: 'row', label: t('Prendre une ligne de A − λI'), valid: false, rule: 'l_eigvec_row', why: t('v doit être orthogonal aux lignes de A − λI, pas égal à l\'une d\'elles.') },
  ],
  coef: [
    { id: 'solve', label: t('Résoudre Pc = x(0), P = [v₁ v₂]'), valid: true },
    { id: 'copy', label: t('Prendre c = x(0)'), valid: false, rule: 'm_modes_c_equals_x0', why: t('Les cᵢ sont les coordonnées de x(0) dans la base des vecteurs propres, pas ses composantes.') },
  ],
  general: [
    { id: 'modes', label: t('Un mode cᵢe^{λᵢt}vᵢ par valeur propre'), valid: true },
    { id: 'solve', label: t('Résoudre Pc = x(0) pour trouver les constantes'), valid: true },
    { id: 'subst', label: t('Remplacer c₁ et c₂ dans la solution générale'), valid: true },
    { id: 'copy', label: t('Prendre c = x(0)'), valid: false, rule: 'm_modes_c_equals_x0', why: t('Les cᵢ sont les coordonnées de x(0) dans la base des vecteurs propres : résous Pc = x(0).') },
  ],
  generalDisc: [
    { id: 'modes', label: t('Un mode cᵢλᵢᵏvᵢ par valeur propre'), valid: true },
    { id: 'solve', label: t('Résoudre Pc = x₀ pour trouver les constantes'), valid: true },
    { id: 'subst', label: t('Remplacer c₁ et c₂ dans la solution générale'), valid: true },
    { id: 'exp', label: t('Un mode cᵢe^{λᵢk}vᵢ par valeur propre'), valid: false, rule: 'm_discrete_exp', why: t('En discret, chaque pas multiplie par λ : le mode est λᵏ, pas e^{λk}.') },
  ],
  stab: [
    { id: 're', label: t('Regarder le signe des parties réelles des valeurs propres'), valid: true },
    { id: 'abs', label: t('Comparer les |λ| à 1'), valid: false, rule: 'm_stab_discrete_in_cont', why: t('|λ| < 1 est le critère des systèmes discrets ; en continu, e^{λt} → 0 si Re λ < 0.') },
    { id: 'im', label: t('Regarder le signe des parties imaginaires'), valid: false, rule: 'm_stab_imag_part', why: t('La partie imaginaire donne la fréquence ; la partie réelle dit si e^{at} s\'amortit.') },
  ],
  stabDisc: [
    { id: 'abs', label: t('Comparer les |λ| à 1 : ρ(A) = max |λ|'), valid: true },
    { id: 're', label: t('Regarder le signe des parties réelles'), valid: false, rule: 'm_stab_cont_in_discrete', why: t('En discret, le mode λᵏ tend vers 0 si |λ| < 1, quel que soit le signe de λ.') },
  ],
  nil: [
    { id: 'n', label: t('N = A − λI, puis vérifier N² = 0'), valid: true },
    { id: 'diag', label: t('Diagonaliser A'), valid: false, why: t('La valeur propre est double et A ≠ λI : A n\'est pas diagonalisable.') },
  ],
  expm: [
    { id: 'series', label: t('e^{At} = e^{λt}(I + tN) (la série de e^{Nt} s\'arrête), puis case par case'), valid: true },
    { id: 'pdp', label: t('e^{At} = P·diag(e^{λᵢt})·P⁻¹, puis le produit'), valid: true },
    { id: 'entry', label: t('Prendre l\'exponentielle de chaque case de At'), valid: false, rule: 'm_expm_entrywise', why: t('e^{At} = Σ (At)ᵏ/k! : ce n\'est pas la matrice des e^{aᵢⱼt}.') },
  ],
  pd: [
    { id: 'pd', label: t('P = [v₁ v₂] et D = diag(λ₁, λ₂), dans le même ordre'), valid: true },
    { id: 'swap', label: t('Ranger P et D chacun dans son ordre'), valid: false, rule: 'l_pd_order', why: t('La colonne k de P doit être un vecteur propre de la valeur en position k de D.') },
  ],
  sol: [
    { id: 'mult', label: t('x(t) = e^{At}x(0) : multiplier e^{At} par x(0)'), valid: true },
    { id: 'left', label: 'x(t) = x(0)ᵀe^{At}', valid: false, why: t('e^{At} multiplie le vecteur colonne x(0) à droite.') },
  ],
  param: [
    { id: 'cases', label: t('Discuter selon c : signe des racines, puis signe du discriminant'), valid: true },
    { id: 'abs', label: t('Comparer les |λ| à 1'), valid: false, rule: 'm_stab_discrete_in_cont', why: t('En continu, le critère est Re λ < 0.') },
  ],
};

// ---------- stability decisions ----------

// eigs: [{re, im, text}] (floats and the readable value).
function contDecision(eigs) {
  const maxRe = Math.max(...eigs.map((e) => e.re));
  const truth = maxRe < 0 ? 'stable' : maxRe > 0 ? 'unstable' : 'bounded';
  const complex = eigs.some((e) => e.im !== 0);
  const allAbs = eigs.every((e) => Math.hypot(e.re, e.im) < 1);
  const big = eigs.find((e) => e.re === maxRe);
  const why = {
    stable: maxRe > 0 ? t('Re λ = {re} > 0 : ce mode explose.', { re: R(fq(big.x)) }) : t('Re λ = {re} : ce mode ne tend pas vers 0.', { re: R(fq(big.x)) }),
    unstable: t('Toutes les parties réelles sont < 0 : chaque mode e^{λt} tend vers 0.'),
    bounded: maxRe < 0 ? t('Toutes les parties réelles sont < 0 : les solutions tendent vers 0.') : t('Une partie réelle est > 0 : les solutions explosent.'),
  };
  const options = [
    { id: 'stable', label: t('Stable : toutes les Re λ &lt; 0'), valid: truth === 'stable', why: why.stable },
    { id: 'unstable', label: t('Instable : une Re λ &gt; 0'), valid: truth === 'unstable', why: why.unstable },
  ];
  if (complex) options.push({ id: 'bounded', label: t('Ni l\'un ni l\'autre : Re λ = 0, les solutions restent bornées'), valid: truth === 'bounded', why: why.bounded });
  options.push({ id: 'abs', label: allAbs ? t('Stable : toutes les |λ| &lt; 1') : t('Instable : une |λ| ≥ 1'), valid: false, rule: 'm_stab_discrete_in_cont', why: t('|λ| < 1 est le critère des systèmes discrets x_{k+1} = Ax_k. En continu, le mode e^{λt} tend vers 0 si Re λ < 0.') });
  if (complex) {
    options.push({ id: 'im', label: t('Stable : Im λ ≠ 0, les oscillations s\'amortissent'), valid: false, rule: 'm_stab_imag_part', why: t('La partie imaginaire donne la fréquence ; c\'est Re λ = {re} qui décide de l\'amortissement.', { re: R(fq(big.x)) }) });
  }
  return { decision: { kind: 'decision', prompt: t('Le système ẋ = Ax est-il stable ?'), options }, truth, maxRe };
}

function discDecision(eigs) {
  const rho = Math.max(...eigs.map((e) => Math.abs(e.re)));
  const truth = rho < 1 ? 'stable' : rho > 1 ? 'unstable' : 'bounded';
  const allRe = eigs.every((e) => e.re < 0);
  const options = [
    { id: 'stable', label: t('Stable : toutes les |λ| &lt; 1'), valid: truth === 'stable', why: t('Une valeur propre a |λ| ≥ 1 : son mode λᵏ ne tend pas vers 0.') },
    { id: 'unstable', label: t('Instable : une |λ| &gt; 1'), valid: truth === 'unstable', why: t('Toutes les |λ| sont < 1 : chaque mode λᵏ tend vers 0.') },
    { id: 'bounded', label: t('Ni l\'un ni l\'autre : ρ(A) = 1'), valid: truth === 'bounded', why: `ρ(A) = ${R(fq(rhoQ(eigs)))} ≠ 1.` },
    { id: 're', label: allRe ? t('Stable : toutes les Re λ &lt; 0') : t('Instable : une Re λ &gt; 0'), valid: false, rule: 'm_stab_cont_in_discrete', why: t('Re λ < 0 est le critère des systèmes continus. En discret, le mode λᵏ tend vers 0 si |λ| < 1.') },
  ];
  return { decision: { kind: 'decision', prompt: t('Le système x_{k+1} = Ax_k est-il stable ?'), options }, truth, rho };
}

const realE = (ls) => ls.map((l) => ({ re: q(l).valueOf(), im: 0, x: q(l) }));
// The exact real part of largest value, and the exact largest modulus (real eigenvalues).
const maxReQ = (eigs) => eigs.reduce((b, e) => (e.re > b.re ? e : b)).x;
const rhoQ = (eigs) => eigs.map((e) => (e.x.n < 0 ? e.x.neg() : e.x)).reduce((b, x) => (x.valueOf() > b.valueOf() ? x : b));
const TRUTH = { stable: t('stable'), unstable: t('instable'), bounded: t('ni stable ni instable') };

// ======================================================================
// m-ode-modes
// ======================================================================

const MODES_SUB = [
  { id: 'companion', label: t('matrice compagne'), skill: 'a2-ode-const2' },
  { id: 'charpoly', label: t('polynôme caractéristique'), skill: 'l-eig-charpoly' },
  { id: 'modes', label: t('modes propres'), skill: 'l-eig-space' },
  { id: 'diag', label: t('diagonaliser'), skill: 'l-eig-diag' },
  { id: 'coef', label: t('coefficients'), skill: 'l-sys-solution' },
  { id: 'polar', label: t('modes oscillants'), skill: 'g8-polar' },
  { id: 'stab', label: t('stabilité'), skill: MODES },
];

const odeT = (a, b) => { const s = lin([[a, "y'"], [b, 'y']]); return `y''${s.startsWith('-') ? '' : '+'}${s}=0`; };
// Readable sums: ÿ − 4ẏ + 3y, −3y + 4ẏ.
const sumR = (head, pairs) => pairs.reduce((acc, [c0, m]) => {
  const c = q(c0);
  if (c.n === 0) return acc;
  const a = c.n < 0 ? c.neg() : c;
  const term = `${a.eq(1) ? '' : fq(a)}${m}`;
  return acc ? `${acc} ${c.n < 0 ? '−' : '+'} ${term}` : `${c.n < 0 ? '−' : ''}${term}`;
}, head);
const odeR = (a, b) => `${sumR('ÿ', [[a, 'ẏ'], [b, 'y']])} = 0`;
const odecfg = (d, want = 'solution') => ({ kind: 'odevec', A: mt(d.A), x0: vt(d.x0), want, vars: ['t', 'c'] });

function companionPart(d, level, rng) {
  const [a, b] = d.ab;
  return {
    html: t('La matrice A de ẋ = Ax, avec x = (y ; ẏ).'), ask: 'A =', start: 'A',
    judge: { kind: 'mat', expect: mt(d.A), companion: [qt(a), qt(b)] },
    lines: [{ math: mt(d.A), note: `ÿ = ${sumR('', [[b.neg(), 'y'], [a.neg(), 'ẏ']])}`, subgoal: 'companion', cells: level <= 2 ? [[1, 0], [1, 1]] : null }],
    menu: MENU.companion,
  };
}
function charPart(d, level, rng, { factored = true } = {}) {
  const lines = charLines(d.A, d.eigs, { factored }).map((l, i, all) => (level <= 2 && i === all.length - 1 ? withBlanks(l, ['λ'], 1, rng) : l));
  return { html: t('Le polynôme caractéristique, factorisé.'), ask: 'det(A − λI) =', start: 'det(A-λI)', judge: { kind: 'det', vars: ['λ'], target: 'factored', names: { A: mt(d.A) } }, lines, menu: MENU.charpoly };
}
function vecParts(d, level, rng) {
  return d.eigs.map((l, i) => {
    const v = MX.col(d.P, i);
    return {
      html: t('Un vecteur propre pour λ = {l}.', { l: fq(l) }), ask: `v${'₁₂'[i]} =`, start: `v_${i + 1}`,
      judge: { kind: 'eigvec', A: mt(d.A), lambda: qt(l) },
      lines: [{ math: vt(v), note: t('Noyau de A {sign} {l}I', { sign: l.n < 0 ? '+' : '−', l: ((a) => (a.eq(1) ? '' : a.d > 1 ? `(${fq(a)})` : fq(a)))(l.n < 0 ? l.neg() : l) }), subgoal: 'modes', cells: level <= 2 ? vcells(v, 1, rng) : null }],
      menu: MENU.kernel,
    };
  });
}
const terms = (d, named) => d.eigs.map((l, i) => ({ c: named ? `c_${i + 1}` : d.c[i], l, v: MX.col(d.P, i) }));
const constT = (c) => c.map((x, i) => `c_${i + 1} = ${qt(x)}`).join(' ; ');
function generalPart(d, { discrete = false, menu } = {}) {
  const cfg = discrete
    ? { kind: 'odevec', A: mt(d.A), x0: vt(d.x0), discrete: true, v: 'k', want: 'solution', vars: ['k', 'c'], modes: d.eigs.map((l, i) => ({ l: qt(l), v: vt(MX.col(d.P, i)), c: qt(d.c[i]) })) }
    : odecfg(d);
  const lab = discrete ? 'x_k' : 'x(t)';
  return {
    html: discrete ? t('La solution x_k : la solution générale, puis les constantes avec x₀.') : t('La solution x(t) : la solution générale, puis les constantes avec x(0).'),
    ask: `${discrete ? 'x_k' : 'x(t)'} =`, start: lab, judge: cfg,
    lines: [
      { math: `${lab} = ${combo(terms(d, true), discrete)}`, note: discrete ? t('Un mode cᵢλᵢᵏvᵢ par valeur propre') : t('Un mode cᵢe^{λᵢt}vᵢ par valeur propre'), subgoal: 'modes' },
      { math: constT(d.c), note: `c₁v₁ + c₂v₂ = ${vR(d.x0)}`, subgoal: 'coef' },
      { math: `${lab} = ${combo(terms(d, false), discrete)}`, note: t('Les constantes remplacées'), subgoal: discrete ? 'decompose' : 'coef' },
    ],
    menu: menu || (discrete ? MENU.generalDisc : MENU.general),
  };
}
function stabPart(eigs, { level, html = t('La stabilité.') } = {}) {
  const { decision, maxRe } = contDecision(eigs);
  return {
    html, ask: 'α = max Re λ =', start: 'α', judge: { kind: 'value', expect: qt(maxReQ(eigs)) },
    decisions: [decision],
    lines: [{ math: qt(maxReQ(eigs)), note: maxRe < 0 ? t('La plus grande partie réelle : stable') : maxRe > 0 ? t('La plus grande partie réelle : instable') : t('La plus grande partie réelle : bornée'), subgoal: 'stab' }],
    menu: MENU.stab,
  };
}
function yPart(d) {
  const [a, b] = d.ab;
  const y = lin(d.eigs.map((l, i) => [d.c[i], modeT(l)]));
  return {
    html: t('y(t), la première composante de x(t).'), ask: 'y =', start: odeT(a, b),
    judge: { kind: 'ode', eq: odeT(a, b), unknown: 'y', v: 't', order: 2, ic: { x: 0, y: qt(d.x0[0]), dy: qt(d.x0[1]) } },
    lines: [{ math: `y=${y}`, note: t('La première composante'), subgoal: 'coef' }],
  };
}

function modesPrompt(d, extra) {
  if (d.companion) return t('{ode}, avec y(0) = {y0} et ẏ(0) = {dy0}. {extra}', { ode: odeR(...d.ab), y0: fq(d.x0[0]), dy0: fq(d.x0[1]), extra });
  return t('ẋ = Ax avec A = {A} et x(0) = {x0}. {extra}', { A: MLm(d.A), x0: MV(vt(d.x0)), extra });
}
function modesHints(d) {
  const ts = terms(d, false);
  return [
    { level: 1, html: t('Un mode e^{λt}v par valeur propre ; les coefficients résolvent Pc = x(0) ; stable si toutes les Re λ &lt; 0.') },
    { level: 2, html: `x(t) = c₁${R(modeT(d.eigs[0]))}${R(vt(MX.col(d.P, 0))).replace(/[−\d/]+\)$/, '□)')} + c₂${R(modeT(d.eigs[1]))}${R(vt(MX.col(d.P, 1))).replace(/[−\d/]+\)$/, '□)')}` },
    { level: 3, html: MV(`x(t) = ${combo(ts)}`) },
  ];
}

function modesReal(level, rng) {
  const companion = level === 1 ? rng.chance(0.5) : rng.chance(0.6);
  const d = realSystem(rng, { companion });
  const eigs = realE(d.eigs);
  const parts = [];
  if (level === 1) {
    parts.push(...vecParts(d, level, rng));
    parts.push({ html: t('Les coefficients c : Pc = x(0), avec P = [v₁ v₂].'), ask: 'c =', start: 'c', judge: { kind: 'mat', expect: vt(d.c) }, lines: [{ math: vt(d.c), note: `c₁v₁ + c₂v₂ = ${vR(d.x0)}`, subgoal: 'coef', cells: vcells(d.c, 1, rng) }], menu: MENU.coef });
    parts.push({ html: t('La solution x(t).'), ask: 'x(t) =', start: 'x(t)', judge: odecfg(d), lines: [{ math: `x(t) = ${combo(terms(d, false))}`, note: t('Un mode cᵢe^{λᵢt}vᵢ par valeur propre'), subgoal: 'modes' }] });
  } else {
    if (d.companion) parts.push(companionPart(d, level, rng));
    parts.push(charPart(d, level, rng));
    parts.push(...vecParts(d, level, rng));
    parts.push(generalPart(d));
    if (level === 3 && d.companion) parts.push(yPart(d));
  }
  parts.push(stabPart(eigs, { level }));
  const given = level === 1 ? `${d.companion ? ` ${t('Avec x = (y ; ẏ), ẋ = Ax où A = {A}.', { A: MLm(d.A) })}` : ''} ${t('Les valeurs propres de A sont {eigs}.', { eigs: listFr(d.eigs.map(fq)) })}` : '';
  return partsItem({
    skill: MODES, level, parts, hints: modesHints(d), subgoals: MODES_SUB, key: `${MODES}:${mt(d.A)}:${vt(d.x0)}:${level}`, fallback: d.fallback,
    prompt: modesPrompt(d, d.companion && level > 1
      ? t('Écris-la comme ẋ = Ax avec x = (y ; ẏ), trouve les modes propres, la solution x(t), et dis si le système est stable.{given}{tap}', { given, tap: tapText(level) })
      : t('Trouve les modes propres, la solution x(t), et dis si le système est stable.{given}{tap}', { given, tap: tapText(level) })),
  });
}

function modesComplex(level, rng, { exam = false, noHints = false } = {}) {
  const d = complexSystem(rng);
  const { ea, m1, m2 } = complexModes(d);
  const tr = d.a.mul(2);
  const det = d.a.mul(d.a).add(d.b.mul(d.b));
  const poly = polyT(tr, det);
  const bi = d.b.eq(1) ? 'i' : `${qt(d.b)}i`;
  const roots = d.a.n === 0 ? `λ=${bi} ou λ=-${bi}` : `λ=${qt(d.a)}+${bi} ou λ=${qt(d.a)}-${bi}`;
  const cfg = { kind: 'odevec', A: mt(d.A), x0: vt(d.x0), want: 'solution', vars: ['t', 'c'] };
  const gen = `x(t) = c_1${ea}${m1}+c_2${ea}${m2}`;
  const sol = `x(t) = ${combo([{ c: d.c[0], m: ea, v: m1 }, { c: d.c[1], m: ea, v: m2 }])}`;
  const parts = [
    { html: t('Le polynôme caractéristique, développé.'), ask: 'det(A − λI) =', start: 'det(A-λI)', judge: { kind: 'det', vars: ['λ'], target: 'expanded', names: { A: mt(d.A) } }, lines: charLines(d.A, null, { factored: false }), menu: MENU.charpoly },
    { html: t('Les valeurs propres (complexes).'), ask: 'λ :', start: `${poly}=0`, judge: { kind: 'complex', form: 'set', unknown: 'λ' }, lines: [{ math: roots, note: t('Δ &lt; 0 : deux racines conjuguées a ± ib'), subgoal: 'charpoly' }], menu: MENU.roots },
    {
      html: t('La solution réelle : modes e^{at}(cos bt, sin bt), puis les constantes avec x(0).'), ask: 'x(t) =', start: 'x(t)', judge: cfg,
      lines: [
        { math: gen, note: t('Partie réelle et partie imaginaire de e^{λt}w, w vecteur propre complexe'), subgoal: 'polar' },
        { math: constT(d.c), note: t('En t = 0 : c₁·{s1} + c₂·{s2} = {x0}', { s1: vR(MX.col(d.S, 0)), s2: vR(MX.col(d.S, 1)), x0: vR(d.x0) }), subgoal: 'coef' },
        { math: sol, note: t('Les constantes remplacées'), subgoal: 'coef' },
      ],
      menu: MENU.general,
    },
    stabPart([{ re: d.a.valueOf(), im: d.b.valueOf(), x: d.a }, { re: d.a.valueOf(), im: -d.b.valueOf(), x: d.a }], { level }),
  ];
  return partsItem({
    skill: MODES, level, parts, subgoals: MODES_SUB, key: `${MODES}:cplx:${mt(d.A)}:${vt(d.x0)}:${level}`, fallback: d.fallback, exam, noHints,
    hints: [
      { level: 1, html: t('λ = a ± ib : les modes réels sont e^{at}(Re w·cos bt − Im w·sin bt) et e^{at}(Re w·sin bt + Im w·cos bt), w vecteur propre de a + ib. La stabilité se lit sur a = Re λ.') },
      { level: 2, html: `λ = ${R(qt(d.a))} ± ${R(bi)} ; x(t) = c₁${R(ea)}(… cos(${R(qt(d.b).replace(/^1$/, ''))}t) …) + c₂${R(ea)}(…)` },
      { level: 3, html: MV(sol) },
    ],
    prompt: t('ẋ = Ax avec A = {A} et x(0) = {x0}. Trouve les valeurs propres, la solution réelle x(t) et dis si le système est stable.', { A: MLm(d.A), x0: MV(vt(d.x0)) }),
  });
}

// Level 5: ÿ + cẏ + 4y = 0 (catalogue): stable ⇔ c > 0, oscillating ⇔ |c| < 4;
// then the solution for c = ±5 (roots −1, −4 or 1, 4).
function modesParam(rng) {
  const c0 = rng.pick([5, -5]);
  const s = Math.sign(c0);
  const e1 = q(-s);
  const e2 = q(-4 * s);
  const P = MX.mat([[1, 1], [0, 0]]);
  P[1] = [e1, e2];
  let c;
  let x0;
  for (let tries = 0; tries < 50; tries++) {
    c = [q(nz(rng, -2, 2)), q(nz(rng, -2, 2))];
    x0 = MX.matVec(P, c);
    if (Math.max(...x0.map((x) => Math.abs(x.valueOf()))) <= 9) break;
  }
  const d = { A: [[q(0), q(1)], [q(-4), q(-c0)]], eigs: [e1, e2], P, c, x0, companion: true, ab: [q(c0), q(4)] };
  const stable = {
    kind: 'decision', prompt: t('Pour quelles valeurs de c le système est-il stable ?'), options: [
      { id: 'pos', label: 'c &gt; 0', valid: true },
      { id: 'big', label: 'c &gt; 4', valid: false, why: t('Pour 0 < c ≤ 4, les racines ont Re λ = −c/2 < 0 (complexes) ou sont négatives : stable aussi.') },
      { id: 'neg', label: 'c &lt; 0', valid: false, why: t('Le produit des racines est 4 > 0 et leur somme est −c : pour c < 0, les parties réelles sont positives.') },
      { id: 'abs', label: t('|λ| &lt; 1 : jamais, le produit des racines vaut 4'), valid: false, rule: 'm_stab_discrete_in_cont', why: t('En continu, le critère est Re λ < 0, pas |λ| < 1.') },
    ],
  };
  const parts = [
    { html: t('La matrice compagne (x = (y ; ẏ)).'), ask: 'A =', start: 'A', judge: { kind: 'mat', vars: ['c'], expect: '[[0,1],[-4,-c]]' }, lines: [{ math: '[[0,1],[-4,-c]]', note: 'ÿ = −4y − cẏ', subgoal: 'companion' }] },
    { html: t('Le polynôme caractéristique.'), ask: 'det(A − λI) =', start: 'det(A-λI)', judge: { kind: 'det', vars: ['λ', 'c'], target: 'any', names: { A: '[[0,1],[-4,-c]]' } }, lines: [{ math: 'λ^2+cλ+4', note: t('Somme des racines −c, produit 4'), subgoal: 'charpoly' }] },
    { html: t('Stabilité, puis les valeurs de c pour lesquelles les valeurs propres ne sont pas réelles (oscillations) : Δ = c² − 16 &lt; 0.'), ask: 'c ∈', start: 'c^2-16<0', judge: { kind: 'solset', v: 'c' }, decisions: [stable], lines: [{ math: ']-4 ; 4[', note: t('Oscillations amorties si 0 < c < 4'), subgoal: 'stab' }] },
    { ...generalPart(d), html: t('La solution pour c = {c}, avec y(0) = {y0} et ẏ(0) = {dy0}.', { c: R(String(c0)), y0: fq(x0[0]), dy0: fq(x0[1]) }) },
  ];
  return partsItem({
    skill: MODES, level: 5, parts, hints: [], noHints: true, subgoals: MODES_SUB, key: `${MODES}:param:${c0}:${vt(x0)}`,
    prompt: t('ÿ + cẏ + 4y = 0, c réel. Écris le système ẋ = Ax (x = (y ; ẏ)), son polynôme caractéristique, dis pour quels c il est stable et pour quels c il oscille, puis résous-le pour c = {c}.', { c: R(String(c0)) }),
  });
}

function modesItem(level, rng) {
  if (level === 4) return modesComplex(4, rng);
  if (level === 5) return rng.chance(0.6) ? modesParam(rng) : modesComplex(5, rng, { noHints: true });
  return modesReal(level, rng);
}

function modesExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const k = rng.int(0, 3);
    if (k === 0) {
      return tfL({
        skill: MODES, key: 'abs', truth: false, exam: tag, ruleIfTrue: 'm_stab_discrete_in_cont',
        statement: t('Si toutes les valeurs propres de A vérifient |λ| &lt; 1, le système ẋ = Ax est stable.'),
        counter: { kind: 'mx', prop: 'absLessOneUnstable', params: { n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: '[[1/2,0],[0,1/2]]' } },
        explanation: t('Faux : avec A = diag(1/2, 1/2), x(t) = e^{t/2}x(0) explose. En continu, le critère est Re λ &lt; 0.'),
      });
    }
    if (k === 1) {
      const b = rng.pick([1, 2, 3]);
      return tfL({ skill: MODES, key: `imag:${b}`, truth: true, exam: tag, ruleIfFalse: 'm_stab_imag_part', statement: t('Si les valeurs propres de A (2 × 2) sont ±{b}i, toute solution non nulle de ẋ = Ax reste bornée sans tendre vers 0.', { b: b === 1 ? '' : b }), explanation: t('Vrai : les modes sont cos({b}t) et sin({b}t) (Re λ = 0) : des oscillations d\'amplitude constante.', { b: b === 1 ? '' : b }) });
    }
    if (k === 2) return tfL({ skill: MODES, key: 'trdet', truth: true, exam: tag, statement: t('Pour A réelle 2 × 2, ẋ = Ax est stable si et seulement si tr A &lt; 0 et det A &gt; 0.'), explanation: t('Vrai : λ₁ + λ₂ = tr A et λ₁λ₂ = det A ; deux parties réelles négatives ⇔ somme &lt; 0 et produit &gt; 0.') });
    return tfL({
      skill: MODES, key: 'tr', truth: false, exam: tag,
      statement: t('Si tr A &lt; 0 (A réelle 2 × 2), le système ẋ = Ax est stable.'),
      counter: { kind: 'mx', prop: 'traceNegUnstable', params: { n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: '[[-3,0],[0,1]]' } },
      explanation: t('Faux : diag(−3, 1) a tr A = −2 &lt; 0, mais le mode e^{t} explose. Il faut aussi det A &gt; 0.'),
    });
  }
  // mcq: y(t) of a companion system, or the stability of a system.
  if (rng.chance(0.5)) {
    const d = realSystem(rng, { companion: true });
    const y = (c) => lin(d.eigs.map((l, i) => [c[i], modeT(l)]));
    const right = y(d.c);
    const wrongs = [
      { text: y(d.x0), rule: 'm_modes_c_equals_x0' },
      { text: y([d.c[1], d.c[0]]), rule: null },
      { text: lin(d.eigs.map((l, i) => [d.c[i], modeT(l.neg())])), rule: null },
      { text: y([d.c[0].neg(), d.c[1].neg()]), rule: null },
    ].filter((w) => w.text !== right);
    return mcqDistinct({
      skill: MODES, level: 4, key: `mcq:y:${mt(d.A)}:${vt(d.x0)}`, exam: tag,
      prompt: t('{ode}, y(0) = {y0}, ẏ(0) = {dy0}. Que vaut y(t) ?', { ode: odeR(...d.ab), y0: fq(d.x0[0]), dy0: fq(d.x0[1]) }),
      right: MT(`y=${right}`, { vars: ['t', 'y'] }),
      wrongs: wrongs.slice(0, 2).map((w) => ({ html: MT(`y=${w.text}`, { vars: ['t', 'y'] }), rule: w.rule })),
      fillers: wrongs.slice(2).map((w) => ({ html: MT(`y=${w.text}`, { vars: ['t', 'y'] }) })),
      solution: [{ html: t('{x} : y est la première composante.', { x: MV(`x(t) = ${combo(terms(d, false))}`) }), note: '' }],
      fallback: d.fallback,
    }, rng);
  }
  const cplx = rng.chance(0.5);
  let A;
  let eigs;
  let eigText;
  if (cplx) {
    const d = complexSystem(rng);
    A = d.A;
    eigs = [{ re: d.a.valueOf(), im: d.b.valueOf(), x: d.a }, { re: d.a.valueOf(), im: -d.b.valueOf(), x: d.a }];
    eigText = `${fq(d.a).replace(/^0$/, '')} ± ${d.b.eq(1) ? '' : fq(d.b)}i`.replace(/^ ± /, '±');
  } else {
    const d = realSystem(rng, { pool: [-3, -2, -1, 1, 2, 3, 4] });
    A = d.A;
    eigs = realE(d.eigs);
    eigText = listFr(d.eigs.map(fq));
  }
  const { decision, truth } = contDecision(eigs);
  const right = decision.options.find((o) => o.valid);
  const wrongs = decision.options.filter((o) => !o.valid && o.rule).map((o) => ({ html: o.label, rule: o.rule }));
  const fillers = decision.options.filter((o) => !o.valid && !o.rule).map((o) => ({ html: o.label }));
  if (!cplx) fillers.push({ html: t('Ni l\'un ni l\'autre : les solutions restent bornées') });
  return mcqDistinct({
    skill: MODES, level: 4, key: `mcq:stab:${mt(A)}`, exam: tag,
    prompt: t('Le système ẋ = Ax, avec A = {A}, est :', { A: MLm(A) }),
    right: right.label, wrongs, fillers,
    solution: [{ html: t('Valeurs propres {eigs} : {truth}.', { eigs: R(eigText), truth: TRUTH[truth] }), note: '' }],
  }, rng);
}

// ======================================================================
// m-expm
// ======================================================================

const EXPM_SUB = [
  { id: 'charpoly', label: t('polynôme caractéristique'), skill: 'l-eig-charpoly' },
  { id: 'nil', label: t('partie nilpotente'), skill: EXPM },
  { id: 'diag', label: t('diagonaliser'), skill: 'l-eig-diag' },
  { id: 'expm', label: t('exponentielle'), skill: EXPM },
  { id: 'sol', label: 'x(t) = e^{At}x(0)', skill: MODES },
];

const shiftExpr = (l) => (l.n > 0 ? `A-${l.eq(1) ? '' : qt(l)}I` : `A+${l.eq(-1) ? '' : qt(l.neg())}I`);
const shiftRd = (l) => R(shiftExpr(l)).replace(/([+−])/, ' $1 ');
const ecfg = (A, names) => ({ kind: 'odevec', A: mt(A), want: 'expm', names, vars: ['t', 'c'] });

function doubleParts(d, level, rng, { sol = false, n2 = true } = {}) {
  const charLs = charLines(d.A, [d.l, d.l]).map((l, i, all) => (level <= 2 && i === all.length - 1 ? withBlanks(l, ['λ'], 1, rng) : l));
  const parts = [
    { html: t('Le polynôme caractéristique.'), ask: 'det(A − λI) =', start: 'det(A-λI)', judge: { kind: 'det', vars: ['λ'], target: 'factored', names: { A: mt(d.A) } }, lines: charLs, menu: MENU.charpoly },
    { html: t('λ = {l} est double : la partie nilpotente N = {N}.', { l: fq(d.l), N: shiftRd(d.l) }), ask: 'N =', start: 'N', judge: { kind: 'mat', names: { A: mt(d.A) }, expect: shiftExpr(d.l) }, lines: [{ math: mt(d.N), note: t('{N} ≠ 0 : A n\'est pas diagonalisable', { N: shiftRd(d.l) }), subgoal: 'nil', cells: level <= 2 ? mcells(d.N, 2, rng) : null }], menu: MENU.nil },
  ];
  if (n2) parts.push({ html: t('Vérifie que N² = 0.'), ask: 'N² =', start: 'N^2', judge: { kind: 'mat', names: { N: mt(d.N) }, expect: 'N^2' }, lines: [{ math: '[[0,0],[0,0]]', note: t('La série de e^{Nt} s\'arrête : e^{Nt} = I + tN'), subgoal: 'nil' }] });
  parts.push({
    html: t('e^{At} = e^{λt}·e^{Nt}, écrite case par case.'), ask: 'e^{At} =', start: 'e^(At)', judge: ecfg(d.A, { N: mt(d.N) }),
    lines: [
      { math: `e^(At) = ${modeT(d.l)}(I+tN)`, note: t('λI et N commutent'), subgoal: 'expm' },
      { math: expmDoubleT(d), note: t('Case par case'), subgoal: 'expm' },
    ],
    menu: MENU.expm,
  });
  if (sol) parts.push({ html: t('x(t) = e^{At}x(0), avec x(0) = {x0}.', { x0: vR(d.x0) }), ask: 'x(t) =', start: 'x(t)', judge: { kind: 'odevec', A: mt(d.A), x0: vt(d.x0), want: 'solution', vars: ['t', 'c'] }, lines: [{ math: `x(t) = ${solDoubleT(d)}`, note: t('e^{At} fois x(0)'), subgoal: 'sol' }], menu: MENU.sol });
  return parts;
}

function diagParts(d, level, rng, { sol = false } = {}) {
  const [l1, l2] = d.eigs;
  const charLs = charLines(d.A, d.eigs).map((l, i, all) => (level <= 2 && i === all.length - 1 ? withBlanks(l, ['λ'], 1, rng) : l));
  const parts = [
    { html: t('Le polynôme caractéristique.'), ask: 'det(A − λI) =', start: 'det(A-λI)', judge: { kind: 'det', vars: ['λ'], target: 'factored', names: { A: mt(d.A) } }, lines: charLs, menu: MENU.charpoly },
    { html: t('Diagonalise : P (vecteurs propres en colonnes) et D.'), ask: 'P, D :', start: 'A = P·D·P^(-1)', judge: { kind: 'factor', A: mt(d.A), of: 'PDP' }, lines: [{ math: `P = ${mt(d.P)} ; D = diag(${qt(l1)},${qt(l2)})`, note: t('Colonne k de P ↔ case k de D'), subgoal: 'diag' }], menu: MENU.pd },
    {
      html: t('e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹, écrite case par case.'), ask: 'e^{At} =', start: 'e^(At)', judge: ecfg(d.A, { P: mt(d.P) }),
      lines: [
        { math: `e^(At) = P·diag(${modeT(l1)},${modeT(l2)})·P^(-1)`, note: 'e^{Dt} = diag(e^{λᵢt})', subgoal: 'expm' },
        { math: expmDiagT(d), note: t('Le produit, avec P⁻¹ = {Pi}', { Pi: R(mt(MX.inverse(d.P))) }), subgoal: 'expm' },
      ],
      menu: MENU.expm,
    },
  ];
  if (sol) parts.push({ html: t('x(t) = e^{At}x(0), avec x(0) = {x0}.', { x0: vR(d.x0) }), ask: 'x(t) =', start: 'x(t)', judge: { kind: 'odevec', A: mt(d.A), x0: vt(d.x0), want: 'solution', vars: ['t', 'c'] }, lines: [{ math: `x(t) = ${combo(terms(d, false))}`, note: t('Σ cᵢe^{λᵢt}vᵢ, avec Pc = x(0)'), subgoal: 'sol' }], menu: MENU.sol });
  return parts;
}

const expmHints = (d, double) => [
  { level: 1, html: double ? t('Valeur double : A = λI + N avec N² = 0, donc e^{At} = e^{λt}(I + tN).') : t('Diagonalisable : e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹.') },
  { level: 2, html: double ? `e^{At} = ${R(modeT(d.l))}(I + t·${R(mt(d.N)).replace(/\[\[[^,]+,/, '[[□,')})` : `e^{At} = P·diag(${R(modeT(d.eigs[0]))}, □)·P⁻¹` },
  { level: 3, html: MV(double ? expmDoubleT(d) : expmDiagT(d)) },
];
const realDiag = (rng, opts = {}) => realSystem(rng, { pool: [-3, -2, -1, 1, 2], ...opts });

function expmItem(level, rng) {
  if (level === 1) {
    const d = realDiag(rng);
    const [l1, l2] = d.eigs;
    const eD = `[[${modeT(l1)},0],[0,${modeT(l2)}]]`;
    const parts = [
      { html: t('D = P⁻¹AP : les valeurs propres, dans l’ordre des colonnes de P.'), ask: 'D =', start: 'D', judge: { kind: 'mat', names: { A: mt(d.A), P: mt(d.P) }, expect: 'P^(-1)·A·P' }, lines: [{ math: mt(MX.diag([l1, l2])), note: t('λ₁ = {l1} et λ₂ = {l2}', { l1: fq(l1), l2: fq(l2) }), subgoal: 'diag', cells: [[0, 0], [1, 1]] }] },
      { html: t('e^{Dt} pour D diagonale : l\'exponentielle de chaque valeur propre.'), ask: 'e^{Dt} =', start: 'e^(Dt)', judge: { kind: 'mat', vars: ['t'], expect: eD }, lines: [{ math: eD, note: t('D est diagonale : e^{Dt} = diag(e^{λ₁t}, e^{λ₂t})'), subgoal: 'expm', cells: [[rng.int(0, 1), rng.int(0, 1)]].map(([i]) => [i, i]) }] },
      {
        html: 'e^{At} = P·e^{Dt}·P⁻¹.', ask: 'e^{At} =', start: 'e^(At)', judge: ecfg(d.A, { P: mt(d.P) }),
        lines: [
          { math: `e^(At) = P·${eD}·P^(-1)`, note: 'A = PDP⁻¹', subgoal: 'expm' },
          { math: expmDiagT(d), note: t('Le produit'), subgoal: 'expm' },
        ],
      },
    ];
    return partsItem({
      skill: EXPM, level, parts, hints: expmHints(d, false), subgoals: EXPM_SUB, key: `${EXPM}:1:${mt(d.A)}`, fallback: d.fallback,
      prompt: t('A = {A} = PDP⁻¹ avec P = {P} (vecteurs propres en colonnes) et P⁻¹ = {Pi}. Trouve D, puis e^{Dt}, puis e^{At}.', { A: MLm(d.A), P: MLm(d.P), Pi: MLm(MX.inverse(d.P)) }),
    });
  }
  if (level === 5) return expmProblem(rng);
  const double = level === 4 ? true : rng.chance(0.5);
  const d = double ? doubleSystem(rng, { tri: level < 4 }) : realDiag(rng);
  const parts = double ? doubleParts(d, level, rng, { sol: level === 4, n2: level !== 2 }) : diagParts(d, level, rng);
  if (level === 2) {
    parts[1].decisions = [{
      kind: 'decision', prompt: t('Comment calculer e^{At} ?'), options: double ? [
        { id: 'nil', label: t('A = λI + N avec N² = 0 : e^{At} = e^{λt}(I + tN)'), valid: true },
        { id: 'diag', label: t('Diagonaliser A'), valid: false, why: t('λ = {l} est double et A ≠ {l}I : un seul vecteur propre, A n\'est pas diagonalisable.', { l: fq(d.l) }) },
        { id: 'noT', label: 'e^{At} = e^{λt}I', valid: false, rule: 'm_expm_double_no_t', why: t('Il manque le terme tN : la dérivée de e^{λt}I vaut λe^{λt}I, pas Ae^{At}.') },
        { id: 'entry', label: t('L\'exponentielle de chaque case de At'), valid: false, rule: 'm_expm_entrywise', why: t('e^{At} = Σ (At)ᵏ/k! : en t = 0, la matrice des e^{aᵢⱼt} vaut 1 partout, pas I.') },
      ] : [
        { id: 'diag', label: t('Diagonaliser : e^{At} = P·diag(e^{λᵢt})·P⁻¹'), valid: true },
        { id: 'nil', label: t('A = λI + N avec N² = 0'), valid: false, why: t('Les deux valeurs propres sont distinctes : A est diagonalisable.') },
        { id: 'entry', label: t('L\'exponentielle de chaque case de At'), valid: false, rule: 'm_expm_entrywise', why: t('e^{At} = Σ (At)ᵏ/k! : en t = 0, la matrice des e^{aᵢⱼt} vaut 1 partout, pas I.') },
      ],
    }];
  }
  return partsItem({
    skill: EXPM, level, parts, hints: expmHints(d, double), subgoals: EXPM_SUB, key: `${EXPM}:${level}:${mt(d.A)}`, fallback: d.fallback,
    prompt: level === 4
      ? t('Calcule e^{At} pour A = {A}, puis la solution de ẋ = Ax avec x(0) = {x0}.{tap}', { A: MLm(d.A), x0: MV(vt(d.x0)), tap: tapText(level) })
      : t('Calcule e^{At} pour A = {A}.{tap}', { A: MLm(d.A), tap: tapText(level) }),
  });
}

function expSumTf(rng, tag) {
  const k = rng.int(0, 3);
  if (k === 0) {
    return tfL({
      skill: EXPM, key: 'sum', truth: false, exam: tag, ruleIfTrue: 'm_expm_sum',
      statement: t('Pour toutes matrices carrées A et B de même taille, e^{A+B} = e^A·e^B.'),
      counter: { kind: 'mx', prop: 'expSumFails', params: { n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }, { v: 'B', label: 'B =', shape: [2, 2] }], answer: { A: '[[0,1],[0,0]]', B: '[[0,0],[1,0]]' } },
      explanation: t('Faux : il faut AB = BA. Avec A = [[0, 1], [0, 0]] et B = [[0, 0], [1, 0]], e^A e^B = [[2, 1], [1, 1]], mais e^{A+B} = [[ch 1, sh 1], [sh 1, ch 1]].'),
    });
  }
  if (k === 1) return tfL({ skill: EXPM, key: 'inv', truth: true, exam: tag, statement: t('Pour toute matrice carrée A et tout t, e^{At} est inversible.'), explanation: t('Vrai : At et −At commutent, donc e^{At}e^{−At} = e^{0} = I.') });
  if (k === 2) {
    return tfL({
      skill: EXPM, key: 'entry', truth: false, exam: tag, ruleIfTrue: 'm_expm_entrywise',
      statement: t('Pour toute matrice carrée A, e^A est la matrice des e^{aᵢⱼ}.'),
      counter: { kind: 'mx', prop: 'expEntrywise', params: { n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: '[[0,0],[0,0]]' } },
      explanation: t('Faux : e^0 = I, alors que la matrice des e⁰ n\'a que des 1.'),
    });
  }
  return tfL({ skill: EXPM, key: 'commute', truth: true, exam: tag, statement: t('Si AB = BA, alors e^{A+B} = e^A·e^B.'), explanation: t('Vrai : quand A et B commutent, la formule du binôme vaut pour (A + B)ᵏ, et les séries se multiplient.') });
}

// Level 5: e^{At}, x(t), then a true/false on e^{A+B} (catalogue L5).
function expmProblem(rng) {
  const d = doubleSystem(rng, { tri: false });
  const lines = partsItem({
    skill: EXPM, level: 5, parts: doubleParts(d, 5, rng, { sol: true }), hints: [], noHints: true, subgoals: EXPM_SUB, key: `${EXPM}:5:${mt(d.A)}`, fallback: d.fallback,
    prompt: t('A = {A}. Calcule e^{At}, puis la solution de ẋ = Ax avec x(0) = {x0}.', { A: MLm(d.A), x0: MV(vt(d.x0)) }),
  });
  const tf = expSumTf(rng, false);
  return problemItem({
    skill: EXPM, level: 5, prompt: t('Exponentielle de matrice, puis un vrai/faux.'), key: `5:${mt(d.A)}:${tf.key}`, fallback: d.fallback,
    parts: [{ item: lines, points: [1, 1, 1, 3, 2], title: t('e^{At} et x(t)') }, { item: tf, points: 1, title: t('Vrai ou faux') }],
  });
}

// Exam example 1 (10 points): double eigenvalue λ, diagonalisable?, N,
// e^{At}, x(t), stability (continuous and discrete).
function expmOpen(rng) {
  const d = doubleSystem(rng, { lams: [-3, -2, -2, 2], tri: false });
  const parts = doubleParts(d, 4, rng, { sol: true, n2: false });
  const eig = realE([d.l, d.l]);
  parts.splice(1, 0, {
    html: t('(b) A est-elle diagonalisable ? Le rang de {N}.', { N: shiftRd(d.l) }), ask: 'rang =', start: 'r', judge: { kind: 'value', expect: '1' },
    decisions: [{ kind: 'decision', prompt: t('A est-elle diagonalisable ?'), options: [
      { id: 'no', label: t('Non : dim E{l} = 2 − 1 = 1 &lt; 2', { l: `${'₋'.repeat(d.l.n < 0 ? 1 : 0)}${'₀₁₂₃₄₅'[Math.abs(d.l.n)]}` }), valid: true },
      { id: 'yes', label: t('Oui : A est 2 × 2 et a une valeur propre'), valid: false, rule: 'm_expm_double_no_t', why: t('{N} ≠ 0 a le rang 1 : un seul vecteur propre indépendant.', { N: shiftRd(d.l) }) },
    ] }],
    lines: [{ math: '1', note: t('Une seule ligne indépendante'), subgoal: 'nil' }],
  });
  const cont = contDecision(eig);
  const disc = discDecision(eig);
  parts.push({
    html: t('(f) Stabilité de ẋ = Ax, puis de x_{k+1} = Ax_k.'), ask: 'λ =', start: 'λ', judge: { kind: 'value', expect: qt(d.l) },
    decisions: [cont.decision, disc.decision],
    lines: [{ math: qt(d.l), note: t('Continu : {c} ; discret : {dsc} (|λ| = {abs})', { c: TRUTH[cont.truth], dsc: TRUTH[disc.truth], abs: fq(d.l.n < 0 ? d.l.neg() : d.l) }), subgoal: 'nil' }],
  });
  parts[0].html = t('(a) Le polynôme caractéristique.');
  parts[2].html = t('(c) La partie nilpotente N = {N} (et N² = 0).', { N: shiftRd(d.l) });
  parts[3].html = t('(d) e^{At}, case par case.');
  parts[4].html = t('(e) x(t) avec x(0) = {x0}.', { x0: vR(d.x0) });
  const item = partsItem({
    skill: EXPM, level: 4, exam: { format: 'open', points: 10 }, keepDecisions: true, parts, hints: [], noHints: true, subgoals: EXPM_SUB, key: `${EXPM}:open:${mt(d.A)}:${vt(d.x0)}`, fallback: d.fallback,
    prompt: t('ẋ = Ax avec A = {A} et x(0) = {x0}. (a) Polynôme caractéristique. (b) A est-elle diagonalisable ? (c) Partie nilpotente. (d) e^{At}. (e) x(t). (f) Stabilité, en continu et pour x_{k+1} = Ax_k.', { A: MLm(d.A), x0: MV(vt(d.x0)) }),
  });
  return asProblem(item, 10, { points: [1, 1, 1, 3, 2, 2] });
}

function expmExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') return expSumTf(rng, tag);
  if (exam === 'open') return expmOpen(rng);
  const double = rng.chance(0.5);
  const d = double ? doubleSystem(rng, { tri: rng.chance(0.3) }) : realDiag(rng);
  if (exam === 'coef') {
    const cells = [[0, 0], [0, 1], [1, 0], [1, 1]].filter(([i, j]) => expmEntryAt1(d, i, j, double) !== '0');
    const [i, j] = rng.pick(cells);
    const value = expmEntryAt1(d, i, j, double);
    const it = coefItem({
      skill: EXPM, level: 4, exam: tag, prompt: t('A = {M}. Que vaut la case ({i}, {j}) de e^{A} (t = 1) ? Écris-la exactement, avec e.', { M: MLm(d.A), i: i + 1, j: j + 1 }),
      label: `m_${i + 1}${j + 1}`, value, key: `${mt(d.A)}:${i}${j}`, askCoef: { label: t('case ({i}, {j}) de e^A', { i: i + 1, j: j + 1 }), path: [i, j], factor: 'e^A' },
      traps: [{ rule: 'm_expm_entrywise' }, ...(double ? [{ rule: 'm_expm_double_no_t' }] : [])],
      solution: [{ html: `e^{At} = ${MV(double ? expmDoubleT(d) : expmDiagT(d))}, en t = 1.`, note: '' }], fallback: d.fallback,
    });
    it.judge.form = 'closed';
    return it;
  }
  const right = double ? expmDoubleT(d) : expmDiagT(d);
  const eT = (l) => (q(l).n === 0 ? '1' : `e^(${q(l).eq(1) ? 't' : q(l).eq(-1) ? '-t' : `${qt(l)}t`})`);
  const entry = `[${d.A.map((r) => `[${r.map(eT).join(',')}]`).join(',')}]`;
  const wrongs = [{ html: MV(entry), rule: 'm_expm_entrywise' }];
  const fillers = [];
  if (double) {
    wrongs.push({ html: MV(`${modeT(d.l)}·[[1,0],[0,1]]`), rule: 'm_expm_double_no_t' });
    fillers.push({ html: MV(expmDoubleT({ ...d, N: MX.scale(d.N, -1) })) }, { html: MV(expmDoubleT({ ...d, N: MX.transpose(d.N) })) });
  } else {
    const swapped = { ...d, P: MX.inverse(d.P) };
    wrongs.push({ html: MV(expmDiagT(swapped)), rule: 'l_pdp_inverse_side' });
    fillers.push({ html: MV(`[[${modeT(d.eigs[0])},0],[0,${modeT(d.eigs[1])}]]`) }, { html: MV(expmDiagT({ ...d, eigs: [d.eigs[1], d.eigs[0]] })) });
  }
  return mcqDistinct({
    skill: EXPM, level: 4, key: `mcq:${mt(d.A)}`, exam: tag, prompt: t('A = {A}. Que vaut e^{At} ?', { A: MLm(d.A) }),
    right: MV(right), wrongs: wrongs.filter((w) => w.html !== MV(right)), fillers: fillers.filter((w) => w.html !== MV(right)),
    solution: [{ html: double ? t('Valeur propre {l} double : e^{At} = e^{λt}(I + tN), N = {N}.', { l: fq(d.l), N: R(mt(d.N)) }) : `e^{At} = P·diag(e^{λᵢt})·P⁻¹, P = ${R(mt(d.P))}.`, note: '' }],
    fallback: d.fallback,
  }, rng);
}

// ======================================================================
// m-discrete
// ======================================================================

const DISC_SUB = [
  { id: 'charpoly', label: t('valeurs propres'), skill: 'l-eig-charpoly' },
  { id: 'modes', label: t('vecteurs propres'), skill: 'l-eig-space' },
  { id: 'coef', label: t('coefficients'), skill: 'l-sys-solution' },
  { id: 'decompose', label: t('décomposer x₀'), skill: 'l-eig-powers' },
  { id: 'stab', label: t('stabilité'), skill: DISC },
];
const FR = [q(1, 2), q(-1, 2), q(1, 4), q(-1, 4), q(3, 4), q(-3, 4), q(1), q(2), q(-2)];
const discData = (rng, pool = FR) => realSystem(rng, { pool, discrete: true, max: 4, x0max: 5 });
const discPart = (eigs) => {
  const { decision, rho, truth } = discDecision(eigs);
  return {
    html: t('La stabilité.'), ask: 'ρ(A) = max |λ| =', start: 'ρ', judge: { kind: 'value', expect: qt(rhoQ(eigs)) },
    decisions: [decision],
    lines: [{ math: qt(rhoQ(eigs)), note: t('Le rayon spectral : {truth}', { truth: TRUTH[truth] }), subgoal: 'stab' }],
    menu: MENU.stabDisc,
  };
};
const discHints = (d) => [
  { level: 1, html: t('Chaque mode est multiplié par λ à chaque pas : x_k = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂, avec c₁v₁ + c₂v₂ = x₀. Stable si toutes les |λ| &lt; 1.') },
  { level: 2, html: `x_k = □${R(modeT(d.eigs[0], true))}${vR(MX.col(d.P, 0))} + □${R(modeT(d.eigs[1], true))}${vR(MX.col(d.P, 1))}` },
  { level: 3, html: MV(`x_k = ${combo(terms(d, false), true)}`) },
];

function discItem(level, rng) {
  if (level === 4) return discCompare(rng);
  if (level === 5) return discProblem(rng);
  const d = discData(rng);
  const eigs = realE(d.eigs);
  const parts = [];
  if (level === 1) {
    parts.push({ html: t('Décompose x₀ sur les vecteurs propres : c₁v₁ + c₂v₂ = x₀.'), ask: 'c =', start: 'c', judge: { kind: 'mat', expect: vt(d.c) }, lines: [{ math: vt(d.c), note: `c₁${vR(MX.col(d.P, 0))} + c₂${vR(MX.col(d.P, 1))} = ${vR(d.x0)}`, subgoal: 'coef', cells: vcells(d.c, 1, rng) }], menu: MENU.coef });
    const g = generalPart(d, { discrete: true });
    parts.push({ ...g, html: t('La solution x_k.'), lines: [g.lines[2]] });
  } else {
    parts.push(charPart(d, level, rng));
    parts.push(...vecParts(d, level, rng));
    parts.push(generalPart(d, { discrete: true }));
  }
  parts.push(discPart(eigs));
  const given = level === 1 ? ` ${t('Les valeurs propres sont {eigs}, de vecteurs propres v₁ = {v1} et v₂ = {v2}.', { eigs: listFr(d.eigs.map(fq)), v1: vR(MX.col(d.P, 0)), v2: vR(MX.col(d.P, 1)) })}` : '';
  return partsItem({
    skill: DISC, level, parts, hints: discHints(d), subgoals: DISC_SUB, key: `${DISC}:${mt(d.A)}:${vt(d.x0)}:${level}`, fallback: d.fallback,
    prompt: t('x_{k+1} = Ax_k avec A = {A} et x₀ = {x0}. Écris x_k et dis si le système est stable.{given}{tap}', { A: MLm(d.A), x0: MV(vt(d.x0)), given, tap: tapText(level) }),
  });
}

// Level 4: the same A, continuous and discrete (catalogue L4).
const CMP = [[-3, -1], [-2, q(-1, 2)], [-3, -2], [q(-1, 2), q(1, 2)], [q(-3, 2), q(-1, 2)], [q(1, 2), q(1, 4)], [-4, -2], [q(1, 4), q(-1, 4)]];
function discCompare(rng, { noHints = false } = {}) {
  let d;
  for (let tries = 0; tries < 50; tries++) {
    d = realSystem(rng, { pool: rng.pick(CMP).map((x) => q(x)), discrete: true, max: 5, x0max: 5 });
    if (!d.fallback) break;
  }
  const eigs = realE(d.eigs);
  const cont = contDecision(eigs);
  const parts = [
    charPart(d, 4, rng),
    { ...stabPart(eigs, { level: 4, html: t('En continu : ẋ = Ax.') }) },
    { ...discPart(eigs), html: t('En discret : x_{k+1} = Ax_k.') },
  ];
  return partsItem({
    skill: DISC, level: 4, parts, subgoals: DISC_SUB, key: `${DISC}:cmp:${mt(d.A)}`, fallback: d.fallback, noHints,
    hints: noHints ? [] : [
      { level: 1, html: t('Continu : stable si toutes les Re λ &lt; 0. Discret : stable si toutes les |λ| &lt; 1. Ce ne sont pas les mêmes critères.') },
      { level: 2, html: t('Valeurs propres □ et □ ; α = max Re λ, ρ = max |λ|') },
      { level: 3, html: t('λ = {eigs} : continu {c}, discret {dsc}.', { eigs: listFr(d.eigs.map(fq)), c: TRUTH[cont.truth], dsc: TRUTH[discDecision(eigs).truth] }) },
    ],
    prompt: t('A = {A}. Le système ẋ = Ax est-il stable ? Et x_{k+1} = Ax_k ?', { A: MLm(d.A) }),
  });
}

function discTf(rng, tag) {
  const k = rng.int(0, 3);
  if (k === 0) {
    const [a, b] = rng.pick([['−3', '−1'], ['−2', '−1/2'], ['−4', '−2'], ['−3/2', '−1/4']]);
    return tfL({ skill: DISC, key: `cross:${a}`, truth: true, exam: tag, ruleIfFalse: 'm_stab_cont_in_discrete', statement: t('Si les valeurs propres de A sont {a} et {b}, ẋ = Ax est stable mais x_{k+1} = Ax_k ne l\'est pas.', { a, b }), explanation: t('Vrai : Re λ &lt; 0 pour les deux (continu stable), mais |{a}| ≥ 1 (le mode ({a})ᵏ ne tend pas vers 0).', { a }) });
  }
  if (k === 1) {
    return tfL({
      skill: DISC, key: 're', truth: false, exam: tag, ruleIfTrue: 'm_stab_cont_in_discrete',
      statement: t('Si toutes les valeurs propres de A ont Re λ &lt; 0, le système x_{k+1} = Ax_k est stable.'),
      counter: { kind: 'mx', prop: 'reNegDiscreteUnstable', params: { n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: '[[-2,0],[0,-1/2]]' } },
      explanation: t('Faux : A = diag(−2, −1/2) a Re λ &lt; 0, mais (−2)ᵏ grandit. En discret, il faut |λ| &lt; 1.'),
    });
  }
  if (k === 2) return tfL({ skill: DISC, key: 'rho', truth: true, exam: tag, statement: t('Si ρ(A) &lt; 1, alors x_k = Aᵏx₀ → 0 pour tout x₀.'), explanation: t('Vrai : chaque mode λᵏ tend vers 0 quand |λ| &lt; 1 (et c\'est encore vrai quand A n\'est pas diagonalisable).') });
  return tfL({ skill: DISC, key: 'markov', truth: true, exam: tag, statement: t('Si A est diagonalisable, de valeurs propres 1 et 1/2, alors x_k converge pour tout x₀.'), explanation: t('Vrai : x_k = c₁v₁ + c₂(1/2)ᵏv₂ → c₁v₁, un vecteur fixe (comme une chaîne de Markov).') });
}

// Level 5: the whole computation alone, then a crossed true/false.
function discProblem(rng) {
  const d = discData(rng);
  const parts = [charPart(d, 5, rng), ...vecParts(d, 5, rng), generalPart(d, { discrete: true }), discPart(realE(d.eigs))];
  const lines = partsItem({
    skill: DISC, level: 5, parts, hints: [], noHints: true, subgoals: DISC_SUB, key: `${DISC}:5:${mt(d.A)}:${vt(d.x0)}`, fallback: d.fallback,
    prompt: t('x_{k+1} = Ax_k avec A = {A} et x₀ = {x0}. Trouve x_k et dis si le système est stable.', { A: MLm(d.A), x0: MV(vt(d.x0)) }),
  });
  const tf = discTf(rng, false);
  return problemItem({
    skill: DISC, level: 5, prompt: t('Système discret, puis un vrai/faux.'), key: `5:${mt(d.A)}:${tf.key}`, fallback: d.fallback,
    parts: [{ item: lines, points: [1, 1, 1, 3, 1], title: t('x_k et stabilité') }, { item: tf, points: 1, title: t('Vrai ou faux') }],
  });
}

function discExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') return discTf(rng, tag);
  const d = discData(rng);
  if (rng.chance(0.5)) {
    const right = `x_k = ${combo(terms(d, false), true)}`;
    const ex = (l) => `e^((${qt(l)})k)`;
    const pw = d.A.map((r) => r.map((a) => (a.n === 0 ? '0' : `(${qt(a)})^k`)));
    const entrywise = `x_k = (${pw.map((r) => r.map((p, j) => (d.x0[j].n === 0 || p === '0' ? null : `${d.x0[j].eq(1) ? '' : `${qt(d.x0[j])}·`}${p}`)).filter(Boolean).join('+') || '0').join(' ; ')})`;
    const wrongs = [
      { text: `x_k = ${combo(d.eigs.map((l, i) => ({ c: d.c[i], m: ex(l), v: MX.col(d.P, i) })))}`, rule: 'm_discrete_exp' },
      { text: entrywise, rule: 'l_powers_entrywise' },
      { text: `x_k = ${combo(d.eigs.map((l, i) => ({ c: d.x0[i], l, v: MX.col(d.P, i) })), true)}`, rule: 'm_modes_c_equals_x0' },
    ];
    return mcqDistinct({
      skill: DISC, level: 4, key: `mcq:x:${mt(d.A)}:${vt(d.x0)}`, exam: tag,
      prompt: t('x_{k+1} = Ax_k avec A = {A} (valeurs propres {eigs}) et x₀ = {x0}. Que vaut x_k ?', { A: MLm(d.A), eigs: listFr(d.eigs.map(fq)), x0: MV(vt(d.x0)) }),
      right: MV(right), wrongs: wrongs.map((w) => ({ html: MV(w.text), rule: w.rule })).filter((w) => w.html !== MV(right)),
      fillers: [{ html: MV(`x_k = ${combo(terms({ ...d, c: [d.c[1], d.c[0]] }, false), true)}`) }],
      solution: [{ html: t('x₀ = {c1}v₁ {sign} {c2}v₂, puis chaque mode est multiplié par λᵏ.', { c1: R(qt(d.c[0])), sign: d.c[1].n < 0 ? '−' : '+', c2: R(qt(d.c[1].n < 0 ? d.c[1].neg() : d.c[1])) }), note: '' }],
      fallback: d.fallback,
    }, rng);
  }
  const { decision, truth } = discDecision(realE(d.eigs));
  const right = decision.options.find((o) => o.valid);
  return mcqDistinct({
    skill: DISC, level: 4, key: `mcq:stab:${mt(d.A)}`, exam: tag,
    prompt: t('Le système x_{k+1} = Ax_k, avec A = {A}, est :', { A: MLm(d.A) }),
    right: right.label,
    wrongs: decision.options.filter((o) => !o.valid && o.rule).map((o) => ({ html: o.label, rule: o.rule })),
    fillers: decision.options.filter((o) => !o.valid && !o.rule).map((o) => ({ html: o.label })),
    solution: [{ html: t('Valeurs propres {eigs} : ρ(A) = {rho}, {truth}.', { eigs: listFr(d.eigs.map(fq)), rho: fq(rhoQ(realE(d.eigs))), truth: TRUTH[truth] }), note: '' }],
    fallback: d.fallback,
  }, rng);
}

export const GEN = {
  [MODES]: (level, rng, profile, opts = {}) => (opts.exam ? modesExam(rng, opts.exam) : modesItem(level, rng)),
  [EXPM]: (level, rng, profile, opts = {}) => (opts.exam ? expmExam(rng, opts.exam) : expmItem(level, rng)),
  [DISC]: (level, rng, profile, opts = {}) => (opts.exam ? discExam(rng, opts.exam) : discItem(level, rng)),
};

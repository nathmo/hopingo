// m-power-method (module M, part c, step U8): the power method and the
// inverse power method with a shift. Catalogue:
// docs/universite/L-M-algebre-lineaire.md, M, m-power-method.
//
// Data: a symmetric 2 × 2 with whole eigenvalues l1, l2, |l1| > |l2| and a
// ratio |l2/l1| ∈ {1/2, 1/3, 1/4, 2/3, 2/5, 2/7, 3/4, 3/5}; y0 a vector of
// the standard basis (b ≠ 0, so it is never an eigenvector). The fractions
// of the first rows stay small (denominators ≤ 200). Course convention:
// z = Ay_k, μ_k = the entry of z of largest modulus, y_{k+1} = z/μ_k.
//
// L1 the table (rows 0 and 1 given, row 2 to fill), then « vers quoi
// tendent les μ_k ? »; L2 the same steps as guided lines, with the choice
// of the normalisation; L3 « choose the action »: iterate, Rayleigh, speed;
// L4 inverse power with a shift (table judged by (A − σI)z = y, then
// λ = σ + 1/μ); L5 read a table of μ_k (λ₁, the ratio |λ₂/λ₁|, λ₂).
// Exam: mcq (speed, inverse power), tf, open (exam example 3, 7 points).

import { Q } from '../../math/rational.js';
import { powerRows } from '../../judges/iter-power.js';
import { linesItem, mcq, tableItem, examTag, MT } from './kit.js';
import { matLines, mcqDistinct, tfL, withCells } from './alglin-kit.js';
import { problemItem } from './kit-problem.js';
import {
  q, qt, mt, vt, MLm, ML, sub, MX, LF, R, fq, vR, rad, blankAll, menuOf, H, sym2List,
} from './matrices-c-kit.js';
import { t } from '../../i18n.js';

const PM = 'm-power-method';
const SUB = [
  { id: 'product', label: t('produit Ay'), skill: 'l-mat-product' },
  { id: 'iter', label: t('une itération'), skill: PM },
  { id: 'rayleigh', label: t('quotient de Rayleigh'), skill: 'm-rayleigh' },
  { id: 'speed', label: t('vitesse |λ₂/λ₁|'), skill: PM },
];
const RATIOS = ['1/2', '1/3', '1/4', '2/3', '2/5', '2/7', '3/4', '3/5'];
const KEYS = ['calc', 'greek'];

const smallQ = (x, d = 200) => x instanceof Q && Math.abs(x.d) <= d && Math.abs(x.n) <= 2000;

// A symmetric matrix of the method, its rows of the table.
function powerData(rng, { steps = 3, posdef = false, maxD = 200 } = {}) {
  const list = sym2List().filter((x) => x.l1 !== 0 && Math.abs(x.l1) > Math.abs(x.l2) && x.l1 > 0
    && RATIOS.includes(qt(q(Math.abs(x.l2), Math.abs(x.l1)))) && x.A.flat().every((v) => Math.abs(v) <= 8)
    && (!posdef || x.l2 > 0));
  for (let tries = 0; tries < 200; tries++) {
    const d = rng.pick(list);
    const e = rng.int(0, 1);
    const y0 = e ? ['0', '1'] : ['1', '0'];
    const phi = { kind: 'power', A: d.A.map((r) => r.map(String)), y0 };
    const rows = powerRows(phi, steps + 1);
    if (!rows.slice(0, steps).every((r) => [...r.y, ...r.z, r.mu].every((x) => smallQ(x, maxD)))) continue;
    const mus = rows.map((r) => String(r.mu));
    if (new Set(mus).size < mus.length) continue;
    return { ...d, Aq: MX.mat(d.A), y0, phi, rows, ratio: q(Math.abs(d.l2), Math.abs(d.l1)) };
  }
  const A = [[3, 1], [1, 3]];
  const phi = { kind: 'power', A: [['3', '1'], ['1', '3']], y0: ['1', '0'] };
  return { A, Aq: MX.mat(A), l1: 4, l2: 2, y0: ['1', '0'], phi, rows: powerRows(phi, steps + 1), ratio: q(1, 2), fallback: true };
}

const COLS = ['y<sub>k,1</sub>', 'y<sub>k,2</sub>', '(Ay<sub>k</sub>)<sub>1</sub>', '(Ay<sub>k</sub>)<sub>2</sub>', 'μ<sub>k</sub>'];
const rowText = (r) => [...r.y, ...r.z, r.mu].map((x) => qt(x));
const yML = (y) => ML(vt(y));

// The table: rows [0 … given−1] given, the next `inputs` rows to fill.
function powerTable(d, given, inputs) {
  const rows = [];
  const answers = {};
  for (let k = 0; k < given + inputs; k++) {
    const txt = rowText(d.rows[k]);
    const id = `r${k}`;
    const cells = txt.map((x, j) => (k < given || (k === 0 && j < 2) ? { given: R(x) } : { input: true }));
    rows.push({ id, label: `k = ${k}`, cells });
    answers[id] = txt;
  }
  return { table: { cols: COLS, rows }, answers };
}

const eigText = (d) => `${fq(q(d.l1))} et ${fq(q(d.l2))}`;

// ---------- L1: the table, then the limit of μ_k ----------

function level1(rng) {
  const d = powerData(rng, { steps: 3 });
  const { table, answers } = powerTable(d, 2, 1);
  const r2 = d.rows[2];
  const then = mcqDistinct({
    skill: PM, level: 1, key: `${PM}:lim:${mt(d.Aq)}`,
    prompt: t('Les valeurs propres de A sont {eig}. Vers quelle valeur tendent les μ<sub>k</sub> ?', { eig: eigText(d) }),
    right: fq(q(d.l1)),
    wrongs: [{ html: fq(q(d.l2)), rule: 'm_power_ratio' }, { html: fq(r2.mu) }],
    fillers: [{ html: fq(q(d.l1 + d.l2)) }, { html: fq(q(d.l1 - d.l2)) }, { html: '1' }],
    solution: [{ html: t('μ<sub>k</sub> → λ₁ = {l1}, la valeur propre de plus grand module ; l\'erreur est multipliée par environ |λ₂/λ₁| = {ratio} à chaque pas.', { l1: fq(q(d.l1)), ratio: fq(d.ratio) }), note: '' }],
  }, rng);
  return tableItem({
    skill: PM, level: 1, key: `1:${mt(d.Aq)}:${d.y0.join('')}`,
    prompt: t('Méthode de la puissance pour A = {A}, à partir de y₀ = {y0} : z = Ay<sub>k</sub>, μ<sub>k</sub> = la composante de z de plus grand module, y<sub>k+1</sub> = z/μ<sub>k</sub>. Les deux premières lignes sont faites ; remplis la ligne k = 2.', { A: MLm(d.Aq), y0: yML(d.rows[0].y) }),
    table, answers, phi: d.phi, then,
    hints: H(t('Divise z de la ligne 1 par μ₁ pour avoir y₂ (sa plus grande composante vaut 1), puis multiplie par A.'),
      `y₂ = ${vR(d.rows[1].z)}/${fq(d.rows[1].mu)} = (□ ; □)`,
      `y₂ = ${vR(r2.y)}, Ay₂ = ${vR(r2.z)}, μ₂ = ${fq(r2.mu)}`),
    subgoals: SUB, baits: ['m_power_ratio'],
    solution: d.rows.slice(0, 3).map((r, k) => ({ html: `k = ${k} : y = ${vR(r.y)}, Ay = ${vR(r.z)}, μ = ${fq(r.mu)}`, note: '' })),
    expectedSec: 150, fallback: d.fallback,
  });
}

// ---------- lines of the iterations ----------

// The parts of k iterations: z_k = A·y_k (mat), μ_k (value), y_{k+1} (mat).
function iterParts(d, k0, k1, { guided = false, menu = false, decision = null, lastY = true } = {}) {
  const A = mt(d.Aq);
  const M = (id) => (menu ? { menu: menuOf(MENU, id) } : {});
  const script = [];
  for (let k = k0; k < k1; k++) {
    const r = d.rows[k];
    const next = d.rows[k + 1];
    script.push({ kind: 'segment', html: t('Itération {n} : z = Ay{k}.', { n: k + 1, k: sub(k) }), ask: `Ay${sub(k)} =`, start: { math: `${A}·${vt(r.y)}` }, judge: { kind: 'mat', ...M('mult') } });
    const zl = { kind: 'eq', math: vt(r.z), note: t('Ligne par colonne'), subgoal: 'product' };
    script.push(guided ? withCells(zl, [[1, 0]]) : zl);
    script.push({ kind: 'segment', html: t('μ{k} : la composante de Ay{k} de plus grand module.', { k: sub(k) }), ask: `μ${sub(k)} =`, start: { math: `μ_${k}` }, judge: { kind: 'value', expect: qt(r.mu), form: 'irreducible', ...M('mu') } });
    if (decision && k === k0) script.push(decision);
    const ml = { kind: 'eq', math: qt(r.mu), note: t('max(|{a}| ; |{b}|), avec son signe', { a: fq(r.z[0]), b: fq(r.z[1]) }), subgoal: 'iter' };
    script.push(guided ? { ...ml, ...blankAll(qt(r.mu)) } : ml);
    if (k < k1 - 1 || lastY) {
      script.push({ kind: 'segment', html: `y${sub(k + 1)} = Ay${sub(k)}/μ${sub(k)}.`, ask: `y${sub(k + 1)} =`, start: { math: `y_${k + 1}` }, judge: { kind: 'mat', expect: vt(next.y), ...M('norm') } });
      const yl = { kind: 'eq', math: vt(next.y), note: t('Divisé par {mu} : une composante vaut 1', { mu: fq(r.mu) }), subgoal: 'iter' };
      script.push(guided ? withCells(yl, [[next.y.findIndex((x) => !x.eq(1)) < 0 ? 0 : next.y.findIndex((x) => !x.eq(1)), 0]]) : yl);
    }
  }
  return script;
}

const MENU = [
  { id: 'mult', label: t('Multiplier par A'), why: t('Il faut d\'abord lire μ et normaliser le vecteur obtenu.') },
  { id: 'mu', label: t('Lire μ (la plus grande composante en module)'), why: t('Il faut d\'abord un produit Ay.') },
  { id: 'norm', label: t('Diviser par μ'), why: t('Il faut d\'abord μ.') },
  { id: 'rayleigh', label: t('Quotient de Rayleigh'), why: t('Pas encore : on itère d\'abord.') },
  { id: 'speed', label: t('Vitesse de convergence'), why: t('Pas encore.') },
];

function splitFirst(script) {
  const [seg, ...rest] = script;
  return { start: seg.start.math, judge: seg.judge, script: seg.html ? [{ kind: 'note', html: seg.html }, ...rest] : rest };
}

const rayleighOf = (d, y) => {
  const Ay = MX.matVec(d.Aq, y);
  return MX.dot(y, Ay).div(MX.dot(y, y));
};

// ---------- L2: guided lines with the choice of the normalisation ----------

function level2(rng) {
  const d = powerData(rng, { steps: 2 });
  const r0 = d.rows[0];
  const nz = Math.hypot(...r0.z.map((x) => x.valueOf()));
  const decision = {
    kind: 'decision', prompt: t('Ay₀ = {z}. Comment normalises-tu (convention du cours) ?', { z: vR(r0.z) }), options: [
      { id: 'max', label: t('Diviser par la composante de plus grand module, μ₀'), valid: true },
      { id: 'norm', label: t('Diviser par la norme ‖Ay₀‖'), valid: true, quality: 'poor', why: t('Juste aussi (y reste de norme 1), mais le cours divise par μ : y garde une composante égale à 1 et μ tend directement vers λ₁. Ici ‖Ay₀‖ = {norm} ≈ {approx}.', { norm: R(rad(MX.dot(r0.z, r0.z))), approx: nz.toFixed(2).replace('.', ',') }) },
      { id: 'first', label: t('Diviser par la première composante, sans regarder les autres'), valid: false, why: t('Si la première composante est petite (ou nulle), y explose : on divise par celle de plus grand module.') },
    ],
  };
  const { start, judge, script } = splitFirst(iterParts(d, 0, 2, { guided: true, decision, lastY: false }));
  const r1 = d.rows[1];
  return matLines({
    skill: PM, level: 2, mode: 'guided', keys: KEYS,
    prompt: t('Deux itérations de la méthode de la puissance pour A = {A}, à partir de y₀ = {y0}.', { A: MLm(d.Aq), y0: yML(d.rows[0].y) }),
    start, judge, script, subgoals: SUB, key: `${PM}:2:${mt(d.Aq)}:${d.y0.join('')}`, baits: [],
    hints: H(t('Multiplie par A, puis divise par la plus grande composante (en module) : c\'est μ.'),
      `Ay₁ = ${R(mt(d.Aq))}·${vR(r1.y)} = (□ ; □)`,
      `Ay₁ = ${vR(r1.z)}, μ₁ = ${fq(r1.mu)}`),
    fallback: d.fallback,
  });
}

// ---------- L3: choose the action (iterate, Rayleigh, speed) ----------

function speedSeg(d, menu, html) {
  return [
    { kind: 'segment', html: html || t('Les valeurs propres de A sont {eig}. Par combien l\'erreur sur μ est-elle multipliée à chaque pas ?', { eig: eigText(d) }), ask: '|λ₂/λ₁| =', start: { math: '|λ_2/λ_1|' }, judge: { kind: 'value', expect: qt(d.ratio), form: 'irreducible', speed: { l1: String(d.l1), l2: String(d.l2) }, ...(menu ? { menu: menuOf(MENU, 'speed') } : {}) } },
    { kind: 'eq', math: qt(d.ratio), note: `|${fq(q(d.l2))}/${fq(q(d.l1))}|`, subgoal: 'speed' },
  ];
}

function level3(rng) {
  const d = powerData(rng, { steps: 2 });
  const y1 = d.rows[1].y;
  const Rq = rayleighOf(d, y1);
  const parts = iterParts(d, 0, 1, { menu: true });
  parts.push(
    { kind: 'segment', html: t('Le quotient de Rayleigh R(y₁) = y₁ᵀAy₁ / y₁ᵀy₁, une meilleure estimation de λ₁.'), ask: 'R(y₁) =', start: { math: 'R' }, judge: { kind: 'value', expect: qt(Rq), form: 'irreducible', menu: menuOf(MENU, 'rayleigh') } },
    { kind: 'eq', math: qt(Rq), note: `y₁ᵀAy₁ = ${fq(MX.dot(y1, MX.matVec(d.Aq, y1)))}, y₁ᵀy₁ = ${fq(MX.dot(y1, y1))}`, subgoal: 'rayleigh' },
    ...speedSeg(d, true),
  );
  const { start, judge, script } = splitFirst(parts);
  return matLines({
    skill: PM, level: 3, mode: 'tap', tapActions: 'menu', keys: KEYS,
    prompt: t('A = {A}, y₀ = {y0}. Fais une itération de la puissance, estime λ₁ par le quotient de Rayleigh de y₁, puis donne la vitesse de convergence. Choisis d\'abord chaque action.', { A: MLm(d.Aq), y0: yML(d.rows[0].y) }),
    start, judge, script, subgoals: SUB, key: `${PM}:3:${mt(d.Aq)}:${d.y0.join('')}`, baits: ['m_power_ratio'],
    hints: H(t('Une itération : z = Ay, μ = la plus grande composante, y ← z/μ. Rayleigh : yᵀAy / yᵀy.'),
      `R(y₁) = □ / (${fq(MX.dot(y1, y1))})`,
      t('R(y₁) = {R}, vitesse {ratio}', { R: fq(Rq), ratio: fq(d.ratio) })),
    fallback: d.fallback,
  });
}

// ---------- L4: inverse power with a shift ----------

function invData(rng, { offs = [1, -1, 2, -2] } = {}) {
  for (let tries = 0; tries < 200; tries++) {
    const d = powerData(rng, { steps: 1 });
    // σ between the eigenvalues, nearer to one of them, not equal.
    const target = rng.chance(0.5) ? d.l1 : d.l2;
    const other = target === d.l1 ? d.l2 : d.l1;
    const off = rng.pick(offs);
    const sigma = target + off;
    if (sigma === 0 || sigma === target || sigma === other || Math.abs(sigma - target) >= Math.abs(sigma - other)) continue;
    const phi = { kind: 'power', A: d.phi.A, y0: d.y0, inverse: true, shift: String(sigma) };
    let rows;
    try { rows = powerRows(phi, 3); } catch { continue; }
    if (!rows.slice(0, 2).every((r) => [...r.y, ...r.z, r.mu].every((x) => smallQ(x, 120)))) continue;
    const muInf = q(1, target - sigma);
    return { ...d, phi, rows, sigma, target, muInf };
  }
  const d = powerData(rng, { steps: 1 });
  const phi = { kind: 'power', A: [['6', '2'], ['2', '3']], y0: ['1', '0'], inverse: true, shift: '1' };
  return { ...d, A: [[6, 2], [2, 3]], Aq: MX.mat([[6, 2], [2, 3]]), l1: 7, l2: 2, phi, rows: powerRows(phi, 3), sigma: 1, target: 2, muInf: q(1), fallback: true };
}

function lambdaSeg(d) {
  const lam = qt(q(d.target));
  return [
    { kind: 'segment', html: t('En continuant, μ<sub>k</sub> → {mu}. Quelle valeur propre de A la méthode a-t-elle trouvée ?', { mu: fq(d.muInf) }), ask: 'λ =', start: { math: 'λ' }, judge: { kind: 'value', expect: lam, form: 'irreducible', invpow: { sigma: String(d.sigma), mu: qt(d.muInf) } } },
    { kind: 'eq', math: `${d.sigma}+1/(${qt(d.muInf)})`, note: t('μ → 1/(λ − σ), donc λ = σ + 1/μ'), subgoal: 'iter' },
    { kind: 'eq', math: lam, note: t('La valeur propre la plus proche de σ = {sigma}', { sigma: fq(q(d.sigma)) }), subgoal: 'iter' },
  ];
}

function level4(rng, opts = {}) {
  const d = invData(rng);
  const { table, answers } = powerTable(d, 0, 2);
  const then = linesItem({
    skill: PM, level: 4, mode: 'free', keys: KEYS, noHints: true,
    prompt: t('Puissance inverse avec σ = {sigma}.', { sigma: fq(q(d.sigma)) }),
    ...(() => { const s = lambdaSeg(d); return { start: s[0].start.math, judge: s[0].judge, script: [{ kind: 'note', html: s[0].html }, ...s.slice(1)] }; })(),
    subgoals: SUB, key: `${PM}:4then:${mt(d.Aq)}:${d.sigma}`,
  });
  const S = d.sigma < 0 ? `A + ${-d.sigma}I` : `A − ${d.sigma}I`;
  const r0 = d.rows[0];
  return tableItem({
    skill: PM, level: 4, key: `4:${mt(d.Aq)}:${d.sigma}:${d.y0.join('')}`,
    prompt: t('Puissance inverse avec décalage σ = {sigma} pour A = {A}, à partir de y₀ = {y0} : à chaque pas, z résout ({S})z = y<sub>k</sub> (sans inverser la matrice), μ<sub>k</sub> = la composante de z de plus grand module, y<sub>k+1</sub> = z/μ<sub>k</sub>. Remplis les lignes k = 0 et k = 1.', { sigma: fq(q(d.sigma)), A: MLm(d.Aq), y0: yML(d.rows[0].y), S }),
    table: { ...table, cols: ['y<sub>k,1</sub>', 'y<sub>k,2</sub>', 'z<sub>1</sub>', 'z<sub>2</sub>', 'μ<sub>k</sub>'] }, answers, phi: d.phi, then,
    hints: H(t('z n\'est pas Ay : on résout le système ({S})z = y (Cramer suffit en 2 × 2).', { S }),
      `(${S}) = ${R(mt(MX.sub(d.Aq, MX.scale(MX.identity(2), d.sigma))))} ; z₀ = (□ ; □)`,
      `z₀ = ${vR(r0.z)}, μ₀ = ${fq(r0.mu)}, y₁ = ${vR(d.rows[1].y)}`),
    subgoals: SUB, baits: ['m_inverse_power_value'],
    solution: d.rows.slice(0, 2).map((r, k) => ({ html: `k = ${k} : y = ${vR(r.y)}, z = ${vR(r.z)}, μ = ${fq(r.mu)}`, note: '' })),
    expectedSec: 240, exam: examTag(opts), fallback: d.fallback,
  });
}

// ---------- L5: read a table of μ_k ----------

function level5(rng) {
  for (let tries = 0; tries < 200; tries++) {
    const d = powerData(rng, { steps: 1 });
    const it = LF.powerMethod(d.A, d.y0.map(Number), { steps: 8, tol: 0 }).iterations;
    if (it.length < 8) continue;
    const mus = it.map((x) => x.mu);
    const e = mus.map((m) => m - d.l1);
    const r = e[7] / e[6];
    if (!(Math.abs(r - d.l2 / d.l1) < 0.03) || Math.abs(e[3]) < 1e-3 || Math.abs(e[7]) > 0.08) continue;
    const show = (x) => R(x.toFixed(6).replace('.', ','));
    const tbl = `<table class="u-table"><thead><tr><th>k</th>${mus.map((_, k) => `<th>${k}</th>`).join('')}</tr></thead><tbody><tr><th>μ<sub>k</sub></th>${mus.map((m) => `<td>${show(m)}</td>`).join('')}</tr></tbody></table>`;
    const script = [
      { kind: 'eq', math: String(d.l1), note: t('La limite des μ_k (λ₁ est entière)'), subgoal: 'iter' },
      { kind: 'segment', html: t('Le rapport |λ₂/λ₁|, lu sur les erreurs μ<sub>k</sub> − λ₁ (à 0,02 près).'), ask: '|λ₂/λ₁| ≈', start: { math: '|λ_2/λ_1|' }, judge: { kind: 'value', expect: qt(d.ratio), form: 'any', tol: 0.02, speed: { l1: String(d.l1), l2: String(d.l2) } } },
      { kind: 'eq', math: qt(d.ratio), note: `(μ₇ − λ₁)/(μ₆ − λ₁) ≈ ${R(r.toFixed(3).replace('.', ','))}`, subgoal: 'speed' },
      { kind: 'segment', html: t('λ₂ (entière ; le signe des erreurs dit son signe).'), ask: 'λ₂ =', start: { math: 'λ_2' }, judge: { kind: 'value', expect: String(d.l2), form: 'irreducible' } },
      { kind: 'eq', math: String(d.l2), note: e[7] * e[6] < 0 ? t('Les erreurs alternent : λ₂/λ₁ < 0') : t('Les erreurs gardent leur signe : λ₂/λ₁ > 0'), subgoal: 'speed' },
    ];
    return linesItem({
      skill: PM, level: 5, mode: 'free', keys: KEYS, noHints: true,
      prompt: t('La méthode de la puissance (normalisation par la plus grande composante) appliquée à une matrice symétrique 2 × 2 donne :{tbl}Lis λ₁ (entière), le rapport |λ₂/λ₁|, puis λ₂.', { tbl }),
      start: 'λ_1', judge: { kind: 'value', expect: String(d.l1), form: 'irreducible' }, script,
      subgoals: SUB, key: `${PM}:5:${mt(d.Aq)}:${d.y0.join('')}`, baits: ['m_power_ratio'],
    });
  }
  return { ...examOpen(rng), exam: false, fallback: true };
}

// ---------- exam ----------

function examMcq(rng, exam) {
  if (rng.chance(0.5)) {
    const d = powerData(rng, { steps: 1 });
    const r = d.ratio;
    return mcqDistinct({
      skill: PM, level: 4, key: `mcq:speed:${mt(d.Aq)}`, exam: examTag({ exam }),
      prompt: t('A = {A} a les valeurs propres {eig}. Avec la méthode de la puissance, par combien l\'erreur sur μ<sub>k</sub> est-elle multipliée environ à chaque pas ?', { A: MLm(d.Aq), eig: eigText(d) }),
      right: fq(r),
      wrongs: [{ html: fq(q(1).div(r)), rule: 'm_power_ratio' }, { html: fq(r.mul(r)) }, { html: fq(q(1).sub(r)) }],
      fillers: [{ html: fq(q(Math.abs(d.l2), Math.abs(d.l1) + Math.abs(d.l2))) }, { html: '1/2' }, { html: '1/3' }],
      solution: [{ html: t('Après k pas, la part du mode 2 est multipliée par (λ₂/λ₁)ᵏ : vitesse |λ₂/λ₁| = {r} (et {r2} avec le quotient de Rayleigh, A étant symétrique).', { r: fq(r), r2: fq(r.mul(r)) }), note: '' }],
    }, rng);
  }
  const d = invData(rng, { offs: [2, -2] });
  const mu = d.muInf;
  const s = q(d.sigma);
  return mcqDistinct({
    skill: PM, level: 4, key: `mcq:inv:${mt(d.Aq)}:${d.sigma}`, exam: examTag({ exam }),
    prompt: t('Puissance inverse avec décalage σ = {s} : les μ<sub>k</sub> (composantes de plus grand module des solutions de (A − σI)z = y<sub>k</sub>) tendent vers {mu}. Quelle valeur propre de A a-t-on trouvée ?', { s: fq(s), mu: fq(mu) }),
    right: fq(s.add(q(1).div(mu))),
    wrongs: [{ html: fq(mu), rule: 'm_inverse_power_value' }, { html: fq(q(1).div(mu)), rule: 'm_inverse_power_value' }, { html: fq(s.add(mu)), rule: 'm_inverse_power_value' }],
    fillers: [{ html: fq(s.sub(q(1).div(mu))) }, { html: fq(s.sub(mu)) }, { html: fq(s.add(q(2).div(mu))) }, { html: fq(s.mul(2)) }],
    solution: [{ html: t('(A − σI)⁻¹ a les valeurs propres 1/(λ − σ) : μ = 1/(λ − σ), donc λ = σ + 1/μ = {l}.', { l: fq(s.add(q(1).div(mu))) }), note: '' }],
  }, rng);
}

function examTf(rng) {
  const exam = { format: 'tf', points: 1 };
  const k = rng.int(0, 3);
  if (k === 0) {
    return tfL({
      skill: PM, key: 'smallest', truth: false, exam, ruleIfTrue: 'm_power_ratio',
      statement: t('La méthode de la puissance (sans décalage, ni inverse) converge vers la valeur propre de plus petit module.'),
      counter: { kind: 'mx', prop: 'powerDominant', params: {}, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: '[[3,1],[1,3]]' } },
      explanation: t('Faux : elle converge vers la valeur propre de plus grand module. Pour [[3, 1], [1, 3]] (valeurs propres 4 et 2), μ<sub>k</sub> → 4.'),
    });
  }
  if (k === 1) {
    return tfL({ skill: PM, key: 'inverse-zero', truth: true, exam, statement: t('La puissance inverse sans décalage (σ = 0) converge vers la valeur propre de plus petit module (si elle est unique).'), explanation: t('Vrai : A⁻¹ a les valeurs propres 1/λ, et la plus grande en module vient du λ le plus petit en module.') });
  }
  if (k === 2) {
    return tfL({
      skill: PM, key: 'symmetric', truth: false, exam,
      statement: t('Pour toute matrice symétrique A (inversible) et presque tout y₀, la méthode de la puissance converge.'),
      counter: { kind: 'mx', prop: 'powerFails', params: {}, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: '[[1,0],[0,-1]]' } },
      explanation: t('Faux : si λ₁ = −λ₂ (par exemple [[1, 0], [0, −1]]), les deux modes gardent le même poids et y<sub>k</sub> oscille.'),
    });
  }
  return tfL({ skill: PM, key: 'speed', truth: true, exam, ruleIfFalse: 'm_power_ratio', statement: t('Si |λ₁| > |λ₂| ≥ …, l\'erreur de la méthode de la puissance est multipliée à peu près par |λ₂/λ₁| à chaque pas.'), explanation: t('Vrai : Aᵏy₀ = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂ + …, et le reste relatif est en (λ₂/λ₁)ᵏ.') });
}

// The catalogue's exam example 3 (7 points), with other numbers.
function examOpen(rng) {
  for (let tries = 0; tries < 200; tries++) {
    const d = powerData(rng, { steps: 2, posdef: true });
    if (d.fallback && tries < 199) continue;
    const y1 = d.rows[1].y;
    const Rq = rayleighOf(d, y1);
    // σ for the inverse power: nearer to l2 than to l1, not equal.
    const sigma = d.l2 + rng.pick([-1, 1]);
    if (sigma === d.l2 || Math.abs(sigma - d.l2) >= Math.abs(sigma - d.l1)) continue;
    const muInf = q(1, d.l2 - sigma);
    const A = mt(d.Aq);
    const one = (o) => linesItem({ keys: KEYS, mode: 'free', noHints: true, subgoals: SUB, baits: [], ...o });
    const iterPart = one({
      skill: PM, level: 5, prompt: t('(a) Deux itérations (normalisation par la plus grande composante).'),
      ...splitFirst(iterParts(d, 0, 2, { lastY: false })),
      key: `${PM}:open:a:${A}`,
    });
    const rPart = one({
      skill: PM, level: 5, prompt: t('(b) Le quotient de Rayleigh R(y₁).'), start: 'R',
      judge: { kind: 'value', expect: qt(Rq), form: 'irreducible' },
      script: [{ kind: 'eq', math: qt(Rq), note: `y₁ᵀAy₁ = ${fq(MX.dot(y1, MX.matVec(d.Aq, y1)))}, y₁ᵀy₁ = ${fq(MX.dot(y1, y1))}`, subgoal: 'rayleigh' }],
      key: `${PM}:open:b:${A}`,
    });
    const sp = speedSeg(d, false, t('(c) Les valeurs propres de A, puis la vitesse de convergence de la puissance.'));
    const sPart = one({
      skill: PM, level: 5, prompt: t('(c) Vitesse de convergence.'), start: sp[0].start.math, judge: sp[0].judge,
      script: [{ kind: 'note', html: t('Valeurs propres : tr A et det A.') }, sp[1]], key: `${PM}:open:c:${A}`,
    });
    const iSeg = lambdaSeg({ ...d, sigma, target: d.l2, muInf });
    const iPart = one({
      skill: PM, level: 5, prompt: t('(d) Puissance inverse avec σ = {sigma} : vers quoi tendent les μ<sub>k</sub>, puis quelle valeur propre trouve-t-on ?', { sigma }),
      start: 'μ', judge: { kind: 'value', expect: qt(muInf), form: 'irreducible' },
      script: [
        { kind: 'eq', math: qt(muInf), note: t('1/(λ − σ) pour la valeur propre la plus proche de {sigma}', { sigma: fq(q(sigma)) }), subgoal: 'iter' },
        { ...iSeg[0], html: t('La valeur propre trouvée.') }, iSeg[2],
      ],
      key: `${PM}:open:d:${A}`,
    });
    const kPart = one({
      skill: PM, level: 5, prompt: t('(e) Le conditionnement κ₂(A).'), start: 'κ_2',
      judge: { kind: 'value', expect: qt(q(d.l1, d.l2)), form: 'irreducible' },
      script: [{ kind: 'eq', math: qt(q(d.l1, d.l2)), note: t('A symétrique définie positive : λ_max/λ_min'), subgoal: 'speed' }],
      key: `${PM}:open:e:${A}`,
    });
    return problemItem({
      skill: PM, level: 5, key: `open:${A}:${sigma}`, exam: { format: 'open', points: 7 },
      prompt: `A = ${MLm(d.Aq)}, y₀ = ${yML(d.rows[0].y)}.`,
      parts: [
        { item: iterPart, points: 2.5, title: t('(a) Deux itérations') },
        { item: rPart, points: 1, title: '(b) Rayleigh' },
        { item: sPart, points: 1, title: t('(c) Vitesse') },
        { item: iPart, points: [0.5, 1], title: t('(d) Puissance inverse') },
        { item: kPart, points: 1, title: t('(e) Conditionnement') },
      ],
    });
  }
  return null;
}

export function genPower(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return examMcq(rng, 'mcq');
  if (opts.exam === 'tf') return examTf(rng);
  if (opts.exam === 'open') return examOpen(rng);
  if (level === 1) return level1(rng);
  if (level === 2) return level2(rng);
  if (level === 3) return level3(rng);
  if (level === 4) return level4(rng);
  return rng.chance(0.25) ? examOpen(rng) : level5(rng);
}

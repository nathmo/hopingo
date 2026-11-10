// Generators of module A2, part e (step U6): the 3 × 3 Hessian (leading
// principal minors, trace and determinant). Catalogue:
// docs/universite/A2-analyse-2.md, `a2-hessian-3x3`.
//
// The generator starts from the nature: a symmetric S with whole entries
// (even diagonal, off-diagonal −3 … 3) whose minors Δ₁, Δ₂, Δ₃ are not 0
// and give the wanted nature, and a whole stationary point p; then
// f = ½(x − p)ᵀS(x − p) expanded, without its constant.

import {
  q, XYZ, poly, pd, pat, ptxt, N, ptR, rd, substT, sysCfg, partsLines, mcq4, tfItem, problemItem,
  natureDecision, H, E, MT, blanked, examTag, SML,
} from './analyse2-e-kit.js';

export const H3 = 'a2-hessian-3x3';

const H3_SUB = [
  { id: 'gradient', label: 'gradient', skill: 'a2-crit-points' },
  { id: 'solve', label: 'point stationnaire', skill: 'a2-crit-points' },
  { id: 'hessian', label: 'hessienne', skill: 'a2-partials' },
  { id: 'minors', label: 'mineurs principaux', skill: 'l-det-cofactor' },
  { id: 'classify', label: 'nature', skill: H3 },
];
const H3_CHOICES = [
  { id: 'grad', label: 'Calculer une dérivée partielle' },
  { id: 'solve', label: 'Résoudre le système linéaire ∇f = 0' },
  { id: 'hessian', label: 'Calculer la hessienne' },
  { id: 'd2', label: 'Calculer le mineur Δ₂' },
  { id: 'd3', label: 'Calculer Δ₃ = det H (développer)' },
  { id: 'evalf', label: 'Calculer f au point' },
  { id: 'detonly', label: 'Conclure avec det H seul', rule: 'a2_hess_det_only', why: 'En dimension 3, det H > 0 ne suffit pas : (−, −, +) a aussi un produit positif. Il faut les trois mineurs.' },
  { id: 'd13', label: 'Conclure avec Δ₁ et Δ₃', rule: 'a2_hess_partial_minors', why: 'Il faut les trois mineurs : le signe de Δ₂ compte aussi.' },
];

const det2 = (a, b, c, d) => a * d - b * c;
const det3 = (S) => S[0][0] * det2(S[1][1], S[1][2], S[2][1], S[2][2]) - S[0][1] * det2(S[1][0], S[1][2], S[2][0], S[2][2]) + S[0][2] * det2(S[1][0], S[1][1], S[2][0], S[2][1]);
const minors = (S) => [S[0][0], det2(S[0][0], S[0][1], S[1][0], S[1][1]), det3(S)];
export function natureOf(m) {
  if (m.some((x) => x === 0)) return 'none';
  if (m.every((x) => x > 0)) return 'min';
  if (m[0] < 0 && m[1] > 0 && m[2] < 0) return 'max';
  return 'saddle';
}
const matT = (S) => `[[${S.map((r) => r.join(',')).join('],[')}]]`;
const matR = (S) => `[[${S.map((r) => r.join(', ')).join('], [')}]]`;

function drawS(rng, nature) {
  for (let i = 0; i < 400; i++) {
    const d = () => rng.pick([-6, -4, -2, 2, 4, 6]);
    const o = () => rng.int(-3, 3);
    const a = o();
    const b = rng.chance(0.4) ? 0 : o();
    const c = o();
    const S = [[d(), a, b], [a, d(), c], [b, c, d()]];
    const m = minors(S);
    if (natureOf(m) !== nature) continue;
    if (Math.abs(m[2]) > 200 || (nature === 'saddle' && m[0] < 0 && m[2] < 0 && rng.chance(0.3) && m[1] > 0)) continue;
    return S;
  }
  return null;
}

export function hess3Data(rng, nature = rng.pick(['min', 'max', 'saddle', 'saddle'])) {
  let S = drawS(rng, nature);
  let fallback = false;
  if (!S) { S = [[2, -5, 0], [-5, 2, 0], [0, 0, 6]]; fallback = true; }
  const p = fallback ? [0, 0, 0] : [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)];
  // f = ½xᵀSx − (Sp)ᵀx.
  const terms = [];
  for (let i = 0; i < 3; i++) {
    const e = [0, 0, 0];
    e[i] = 2;
    terms.push([q(S[i][i], 2), e]);
    for (let j = i + 1; j < 3; j++) { const f = [0, 0, 0]; f[i] = 1; f[j] = 1; terms.push([S[i][j], f]); }
    const Sp = S[i][0] * p[0] + S[i][1] * p[1] + S[i][2] * p[2];
    const g = [0, 0, 0];
    g[i] = 1;
    terms.push([-Sp, g]);
  }
  const f = poly(terms);
  const m = minors(S);
  const grads = [0, 1, 2].map((i) => pd(f, i));
  return {
    S, p, f, fT: ptxt(f, XYZ), m, nature: natureOf(m), grads, gT: grads.map((g) => ptxt(g, XYZ)),
    value: pat(f, p.map((x) => q(x))), fallback,
  };
}

// ---------- lines ----------

const pr = (x) => (x < 0 ? `(${x})` : String(x));
// Δ₂ = a·c − b·b and Δ₃ developed along the first row.
const d2Text = (S) => `${pr(S[0][0])}×${pr(S[1][1])}-${pr(S[0][1])}×${pr(S[1][0])}`;
function d3Dev(S) {
  const minor = (j) => S.slice(1).map((r) => r.filter((_, k) => k !== j));
  const terms = [];
  [0, 1, 2].forEach((j) => {
    const c = (j % 2 ? -1 : 1) * S[0][j];
    if (c === 0) return;
    const sgn = c < 0 ? '-' : terms.length ? '+' : '';
    const k = Math.abs(c) === 1 ? '' : `${Math.abs(c)}·`;
    terms.push(`${sgn}${k}det${matT(minor(j))}`);
  });
  return terms.join('') || '0';
}

const ptT3 = (p) => `(${p.join(' ; ')})`;
const NAT = { min: 'minimum local', max: 'maximum local', saddle: 'point selle' };

function decisionOf(d) {
  const [a, b, c] = d.m;
  const rules = {};
  if (d.nature === 'saddle' && a < 0 && c < 0) rules.max = 'a2_hess_partial_minors';
  if (d.nature !== 'min' && c > 0) rules.min = 'a2_hess_det_only';
  const why = {
    min: d.nature === 'saddle' ? 'Les mineurs ne sont pas tous positifs : H n\'est pas définie positive.' : 'Regarde les signes : −, +, − pour un maximum.',
    max: b < 0 ? `Δ₂ = ${rd(b)} < 0 : H n'est pas définie négative (il faudrait −, +, −).` : 'Il faudrait les signes −, +, −.',
    saddle: d.nature === 'min' ? 'Tous les mineurs sont positifs : H est définie positive.' : 'Signes −, +, − : H est définie négative.',
    none: 'Aucun mineur n\'est nul : H est inversible et les signes décident.',
  };
  return natureDecision(`Δ₁ = ${rd(a)}, Δ₂ = ${rd(b)}, Δ₃ = ${rd(c)}. Nature du point ${ptR(d.p)} ?`, d.nature, rules, why);
}

function minorParts(d, level) {
  const d2 = d.m[1];
  const d3 = d.m[2];
  const sub2 = matT([[d.S[0][0], d.S[0][1]], [d.S[1][0], d.S[1][1]]]);
  const l2 = [E(d2Text(d.S), 'Δ₂ : déterminant 2 × 2 en haut à gauche', 'minors', 'd2'), E(N(d2), 'Calculer', 'minors', 'd2')];
  const l3 = [E(d3Dev(d.S), 'Développer selon la 1re ligne', 'minors', 'd3'), E(N(d3), 'Calculer', 'minors', 'd3')];
  if (level === 1) {
    l2[1] = blanked(l2[1], [N(d2)], { vars: [] });
    l3[1] = blanked(l3[1], [N(d3)], { vars: [] });
  }
  return [
    { html: `Δ₁ = ${rd(d.S[0][0])}. Le mineur Δ₂ :`, ask: 'Δ₂ =', start: `det${sub2}`, judge: { kind: 'det', target: 'number' }, lines: l2 },
    { html: 'Le mineur Δ₃ = det H :', ask: 'Δ₃ =', start: `det${matT(d.S)}`, judge: { kind: 'det', target: 'number' }, lines: l3 },
    {
      html: `Valeur de f en ${ptR(d.p)} :`, ask: 'f =', start: substT(d.fT, { x: String(d.p[0]), y: String(d.p[1]), z: String(d.p[2]) }, XYZ),
      judge: { kind: 'value' }, pre: [decisionOf(d)], lines: [E(N(d.value), 'Remplacer x, y, z dans f', 'classify', 'evalf')],
    },
  ];
}

function h3Lines(level, rng, opts) {
  const d = hess3Data(rng);
  const fML = MT(d.fT, { vars: XYZ });
  const parts = [];
  if (level === 4) {
    const names = ['x', 'y', 'z'];
    d.grads.forEach((g, i) => parts.push({
      ...(i ? { html: `Puis ∂f/∂${names[i]} :`, ask: `∂f/∂${names[i]} =` } : {}),
      start: `pd(${d.fT},${names[i]})`, judge: { kind: 'equiv', vars: XYZ, target: 'no-prime' },
      lines: [E(d.gT[i], `Dériver en ${names[i]}`, 'gradient', 'grad')],
    }));
    const cfg = sysCfg(XYZ, [d.p.map(String)], { grid: 3 });
    parts.push({
      html: 'Résous ∇f = 0 (système linéaire) :', ask: '⇔', start: d.gT.map((g) => `${g} = 0`).join(' ; '), judge: cfg,
      lines: [E(ptT3(d.p), 'Système linéaire 3 × 3 : une seule solution', 'solve', 'solve')],
    });
  }
  if (level >= 2) {
    parts.push({
      html: 'La hessienne (constante) :', ask: 'H =', start: 'H = ?', judge: { kind: 'mat', expect: matT(d.S) },
      lines: [E(matT(d.S), 'Dérivées secondes', 'hessian', 'hessian')],
    });
  }
  parts.push(...minorParts(d, level));
  const given = level === 1 ? ` Sa hessienne est H = ${SML({ kind: 'mat' }, matT(d.S))}.` : '';
  const pointT = level === 4 ? 'Trouve son point stationnaire, puis sa nature.' : `Le point ${ptR(d.p)} est un point stationnaire de f. Donne sa nature avec les mineurs principaux.`;
  const first = level === 4 ? 'Calcule ∂f/∂x :' : level === 1 ? 'Calcule Δ₂ :' : 'Calcule H :';
  const acts = [...new Set(parts.flatMap((p) => p.lines.map((l) => l.act)))];
  return partsLines({
    skill: H3, level, parts, choices: H3_CHOICES.filter((c) => acts.includes(c.id) || ['detonly', 'd13'].includes(c.id)),
    prompt: `Soit f(x, y, z) = ${fML}. ${pointT}${given}${level <= 2 ? '<br>Règle : Δ₁, Δ₂, Δ₃ &gt; 0 → minimum ; signes −, +, − → maximum ; sinon (aucun nul) → point selle.' : ''}<br>${first}`,
    hints: H('Calcule les trois mineurs principaux en haut à gauche, puis compare leurs signes à (+, +, +) et (−, +, −).',
      `Δ₂ = ${rd(d2Text(d.S)).replace(/×/g, '·')} = …`,
      `Δ₁ = ${rd(d.m[0])}, Δ₂ = ${rd(d.m[1])}, Δ₃ = ${rd(d.m[2])} : ${NAT[d.nature]}.`),
    subgoals: H3_SUB, keys: ['calcx', 'calcfn', 'a2', 'mat'], key: `${H3}:${level}:${d.fT}`, exam: examTag(opts), fallback: d.fallback,
  });
}

// ---------- exam variants ----------

// 2018 Q13: the nature of the stationary point.
function h3Mcq(level, rng, opts) {
  const d = hess3Data(rng, rng.pick(['saddle', 'saddle', 'min', 'max']));
  const opt = { min: `${ptR(d.p)} est un minimum local de f`, max: `${ptR(d.p)} est un maximum local de f`, saddle: `${ptR(d.p)} est un point selle de f`, none: 'la hessienne ne permet pas de conclure' };
  const rules = {};
  if (d.nature === 'saddle' && d.m[0] < 0 && d.m[2] < 0) rules.max = 'a2_hess_partial_minors';
  if (d.nature !== 'min' && d.m[2] > 0) rules.min = 'a2_hess_det_only';
  const wrongs = ['min', 'max', 'saddle', 'none'].filter((k) => k !== d.nature).map((k) => ({ html: opt[k], rule: rules[k] ?? null }));
  return mcq4({
    skill: H3, level, prompt: `Soit f(x, y, z) = ${MT(d.fT, { vars: XYZ })}, et ${ptR(d.p)} son point stationnaire. Laquelle de ces affirmations est vraie ?`,
    right: opt[d.nature], wrongs, key: `mcq:${d.fT}`, exam: examTag(opts, 3), expectedSec: 150, fallback: d.fallback,
    solution: [{ html: `H = ${SML({ kind: 'mat' }, matT(d.S))}`, note: '' }, { html: `Δ₁ = ${rd(d.m[0])}, Δ₂ = ${rd(d.m[1])}, Δ₃ = ${rd(d.m[2])} : ${NAT[d.nature]}.`, note: '' }],
  }, rng);
}

// The catalogue's three statements (2019 Q21, 2020 Q27, 2021 Q23).
function h3Tf(level, rng, opts, kind = rng.pick(['minors', 'det', 'trace', 'trace2'])) {
  const ask = [{ v: 'H', label: 'H =', keys: ['calc', 'mat'] }];
  if (kind === 'minors') {
    const fxx = -rng.int(1, 3);
    const det = -rng.int(1, 6);
    const c = q(det, fxx);
    return tfItem({
      skill: H3, level, statement: `Soit a un point stationnaire de f ∈ C²(ℝ³). Si f_xx(a) = ${rd(fxx)} et det H_f(a) = ${rd(det)}, alors f a un maximum local en a.`, truth: false,
      counter: { kind: 'a2', prop: 'hess3', params: { fxx, det, claim: 'max' }, ask, answer: { H: `[[${fxx},0,0],[0,1,0],[0,0,${c}]]` } },
      ruleIfTrue: 'a2_hess_partial_minors', prompt: 'Vrai ou faux ? Si c\'est faux, donne une hessienne H (symétrique 3 × 3) qui contredit l\'énoncé.',
      explanation: `Faux : Δ₂ n'est pas connu. H = diag(${rd(fxx)}, 1, ${rd(String(c))}) a Δ₁ = ${rd(fxx)} et det H = ${rd(det)}, mais Δ₂ = ${rd(fxx)} &lt; 0 : point selle.`,
      key: `minors:${fxx}:${det}`, exam: examTag(opts), hints: H('Pour un maximum, il faut Δ₁ &lt; 0, Δ₂ &gt; 0, Δ₃ &lt; 0.', 'Δ₂ n\'est pas donné.', 'Prends une matrice diagonale avec Δ₂ &lt; 0.'),
    });
  }
  if (kind === 'det') {
    return tfItem({
      skill: H3, level, statement: 'Soit a un point stationnaire de f ∈ C²(ℝ³). Si det H_f(a) &gt; 0, alors f a un minimum local en a.', truth: false,
      counter: { kind: 'a2', prop: 'hess3', params: { detPos: true, claim: 'min' }, ask, answer: { H: rng.pick(['[[-1,0,0],[0,-1,0],[0,0,1]]', '[[1,0,0],[0,-2,0],[0,0,-3]]']) } },
      ruleIfTrue: 'a2_hess_det_only', prompt: 'Vrai ou faux ? Si c\'est faux, donne une hessienne H (symétrique 3 × 3) qui contredit l\'énoncé.',
      explanation: 'Faux : diag(−1, −1, 1) a det H = 1 &gt; 0, mais deux valeurs propres négatives : point selle.',
      key: 'det', exam: examTag(opts), hints: H('det H est le produit des trois valeurs propres.', 'Deux valeurs propres négatives donnent aussi un produit positif.', 'diag(−1, −1, 1).'),
    });
  }
  // Trace and determinant force the signs: one negative eigenvalue (t > 0, d < 0) or two (t < 0, d > 0).
  const pos = kind === 'trace';
  const t = pos ? rng.int(1, 4) : -rng.int(1, 4);
  const dd = pos ? -rng.int(1, 5) : rng.int(1, 5);
  return tfItem({
    skill: H3, level, statement: `Soit a un point stationnaire de f ∈ C²(ℝ³), et λ₁, λ₂, λ₃ les valeurs propres de H_f(a). Si λ₁ + λ₂ + λ₃ = ${rd(t)} et λ₁λ₂λ₃ = ${rd(dd)}, alors a n'est pas un extremum local.`, truth: true,
    explanation: pos
      ? `Vrai : le produit ${rd(dd)} &lt; 0 donne une ou trois valeurs propres négatives ; trois négatives donneraient une somme négative. Donc exactement une : signes (+, +, −), point selle.`
      : `Vrai : le produit ${rd(dd)} &gt; 0 donne zéro ou deux valeurs propres négatives ; zéro donnerait une somme positive. Donc deux : signes (−, −, +), point selle.`,
    key: `trace:${t}:${dd}`, exam: examTag(opts), hints: H('Aucune valeur propre n\'est nulle (le produit ne l\'est pas).', 'Le signe du produit dit combien sont négatives (nombre pair ou impair).', 'La somme élimine un des deux cas.'),
  });
}

// Level 5: two true/false statements and a multiple choice, alone.
function h3Problem(level, rng, opts) {
  const kinds = rng.shuffle(['minors', 'det', 'trace', 'trace2']).slice(0, 2);
  const a = h3Tf(level, rng, {}, kinds[0]);
  const b = h3Tf(level, rng, {}, kinds[1]);
  const c = h3Mcq(level, rng, {});
  return problemItem({
    skill: H3, level, prompt: 'Trois questions au format de l\'examen, sans aide : deux vrai/faux, puis un QCM.',
    parts: [{ item: a, points: 1, title: 'Vrai ou faux (1)' }, { item: b, points: 1, title: 'Vrai ou faux (2)' }, { item: c, points: 3, title: 'QCM' }],
    key: `${level}:${a.key}:${b.key}:${c.key}`, exam: examTag(opts, 5), fallback: c.fallback,
  });
}

export function hessian3(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return h3Mcq(4, rng, opts);
  if (opts.exam === 'tf') return h3Tf(4, rng, opts);
  if (level === 5) return h3Problem(5, rng, opts);
  return h3Lines(level, rng, opts);
}


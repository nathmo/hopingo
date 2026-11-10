// m-gershgorin (module M, part c, step U8): Gershgorin discs. Catalogue:
// docs/universite/L-M-algebre-lineaire.md, M, m-gershgorin.
//
// Data: 3 × 3 whole matrices with a spaced diagonal and small entries off
// it (|aᵢⱼ| ≤ 2), drawn until the discs asked for are disjoint (or the
// matrix is diagonally dominant); each isolated disc is checked to hold one
// eigenvalue (js/cas/linalg-float.js). No `plot` task 'region' exists: the
// discs are written as centre and radius (value lines), the conclusions
// are decisions.

import { matLines, mcqDistinct, tfL } from './alglin-kit.js';
import { linesItem, examTag } from './kit.js';
import { mt, MLm, sub, MX, LF, R, blanksOf, blankAll, menuOf, H } from './matrices-c-kit.js';

const GM = 'm-gershgorin';
const SUB = [
  { id: 'discs', label: 'disques', skill: GM },
  { id: 'eig', label: 'valeurs propres', skill: 'l-eig-charpoly' },
];
const KEYS = ['calc', 'calcfn'];
const abs = Math.abs;

const radius = (A, i, by = 'rows') => (by === 'cols' ? A.map((r) => r[i]) : A[i]).reduce((s, x, j) => s + (j === i ? 0 : abs(x)), 0);
const radii = (A, by) => A.map((_, i) => radius(A, i, by));
const disjoint = (A, by) => {
  const Rr = radii(A, by);
  return A.every((_, i) => A.every((__, j) => j <= i || abs(A[i][i] - A[j][j]) > Rr[i] + Rr[j]));
};
// Each disc holds exactly one eigenvalue (disjoint discs).
function oneEach(A, by) {
  const e = LF.eig(A);
  const Rr = radii(A, by);
  return A.every((_, i) => e.filter((z) => Math.hypot(z.re - A[i][i], z.im) <= Rr[i] + 1e-9).length === 1);
}

function gData(rng, { sym = rng.chance(0.5), by = 'rows', need = 'disjoint' } = {}) {
  for (let t = 0; t < 400; t++) {
    const diag = rng.shuffle([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
    const A = diag.map((c, i) => diag.map((_, j) => (i === j ? c : 0)));
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      if (i === j || (sym && j < i)) continue;
      const v = rng.int(-2, 2);
      A[i][j] = v;
      if (sym) A[j][i] = v;
    }
    if (A.flat().filter((x) => x === 0).length > 4 || A.some((r, i) => radius(A, i) === 0 || radius(A, i, 'cols') === 0)) continue;
    if (need === 'disjoint' && !(disjoint(A, by) && oneEach(A, by))) continue;
    if (need === 'dominant' && !A.every((r, i) => abs(r[i]) > radius(A, i))) continue;
    if (need === 'zeroOut' && !A.every((r, i) => abs(r[i]) > radius(A, i, by))) continue;
    return { A, Aq: MX.mat(A), sym, by };
  }
  const A = [[4, 1, 0], [1, -3, 1], [0, 1, 7]];
  return { A, Aq: MX.mat(A), sym: true, by, fallback: true };
}

const rText = (A, i, by) => {
  const xs = (by === 'cols' ? A.map((r) => r[i]) : A[i]).filter((_, j) => j !== i);
  return xs.map((x) => `|${x}|`).join('+');
};
function radSeg(d, i, { guided = false, menu = false, by = d.by } = {}) {
  const Rr = radius(d.A, i, by);
  const line = { kind: 'eq', math: rText(d.A, i, by), note: `${by === 'cols' ? 'Colonne' : 'Ligne'} ${i + 1}, sans la diagonale`, subgoal: 'discs' };
  return [
    { kind: 'segment', html: `Le disque ${i + 1} : centre a${sub(i + 1)}${sub(i + 1)} = ${R(d.A[i][i])}, rayon R${sub(i + 1)}.`, ask: `R${sub(i + 1)} =`, start: { math: `R_${i + 1}` }, judge: { kind: 'value', expect: String(Rr), form: 'irreducible', gersh: { A: mt(d.Aq), i, by }, ...(menu ? { menu: menuOf(MENU, 'radius') } : {}) } },
    guided ? { ...line, ...blanksOf(rText(d.A, i, by), (by === 'cols' ? d.A.map((r) => r[i]) : d.A[i]).filter((_, j) => j !== i).slice(-1).map((x) => String(abs(x)))) } : line,
    guided ? { kind: 'eq', math: String(Rr), ...blankAll(String(Rr)), note: `D(${R(d.A[i][i])} ; ${Rr})`, subgoal: 'discs' } : { kind: 'eq', math: String(Rr), note: `D(${R(d.A[i][i])} ; ${Rr})`, subgoal: 'discs' },
  ];
}
const MENU = [
  { id: 'radius', label: 'Sommer les |aᵢⱼ| hors de la diagonale', why: '' },
  { id: 'diag', label: 'Sommer toute la ligne, diagonale comprise', why: 'La diagonale est le centre, pas une part du rayon.' },
  { id: 'eig', label: 'Calculer les valeurs propres exactement', why: 'Inutile : les disques suffisent, et le polynôme de degré 3 n\'a pas de racine simple.' },
];

function splitFirst(script) {
  const [s, ...rest] = script;
  return { start: s.start.math, judge: s.judge, script: s.html ? [{ kind: 'note', html: s.html }, ...rest] : rest };
}
const discsR = (d, by = d.by) => d.A.map((r, i) => `D(${R(r[i])} ; ${radius(d.A, i, by)})`).join(', ');
const hasZero = (d, by = d.by) => d.A.some((r, i) => abs(r[i]) <= radius(d.A, i, by));

function invDecision(d, by = d.by, show = true) {
  const z = hasZero(d, by);
  return {
    kind: 'decision', prompt: show ? `Disques ${discsR(d, by)}. Que peut-on dire de A ?` : 'Avec tes disques, que peut-on dire de A ?', options: [
      { id: 'inv', label: 'A est inversible : 0 n\'est dans aucun disque', valid: !z, why: z ? '0 est dans un disque : on ne peut rien conclure.' : undefined },
      { id: 'none', label: 'On ne peut pas conclure : 0 est dans un disque', valid: z, why: z ? undefined : `|aᵢᵢ| > Rᵢ pour chaque i : 0 n'est dans aucun disque, donc 0 n'est pas valeur propre.` },
      { id: 'sing', label: 'A n\'est pas inversible', valid: false, why: 'Les disques ne montrent jamais qu\'une valeur propre est nulle.' },
    ],
  };
}

function gItem(level, rng) {
  if (level === 5) return gDominant(rng);
  if (level === 2) return gColumns(rng);
  const d = gData(rng, { sym: level === 4 ? true : undefined });
  const guided = level === 1;
  const parts = [0, 1, 2].flatMap((i) => radSeg(d, i, { guided, menu: level === 3 }));
  if (level === 3) parts.splice(parts.length - 1, 0, invDecision(d, d.by, false));
  if (level === 4) {
    const lo = Math.min(...d.A.map((r, i) => r[i] - radius(d.A, i)));
    const hi = Math.max(...d.A.map((r, i) => r[i] + radius(d.A, i)));
    parts.push(
      { kind: 'segment', html: 'A est symétrique : ses valeurs propres sont réelles. Une borne inférieure de la plus petite.', ask: 'λ_min ≥', start: { math: 'm' }, judge: { kind: 'value', expect: String(lo), form: 'irreducible' } },
      { kind: 'eq', math: String(lo), note: 'Le bord gauche du disque le plus à gauche', subgoal: 'discs' },
      { kind: 'segment', html: 'Une borne supérieure de la plus grande.', ask: 'λ_max ≤', start: { math: 'M' }, judge: { kind: 'value', expect: String(hi), form: 'irreducible' } },
      { kind: 'eq', math: String(hi), note: 'Le bord droit du disque le plus à droite', subgoal: 'discs' },
    );
  }
  const { start, judge, script } = splitFirst(parts);
  const e = LF.eig(d.A).map((z) => z.re).sort((a, b) => a - b);
  return matLines({
    skill: GM, level, mode: guided ? 'guided' : level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'menu' : null, keys: KEYS,
    prompt: level === 4
      ? `A = ${MLm(d.Aq)}. Donne les rayons des disques de Gershgorin (lignes), puis un encadrement des valeurs propres.`
      : `A = ${MLm(d.Aq)}. Donne les disques de Gershgorin (par lignes)${level === 3 ? ', puis conclus. Choisis d\'abord chaque action' : ''}.`,
    start, judge, script, subgoals: SUB, key: `${GM}:${level}:${mt(d.Aq)}`, baits: ['m_gersh_radius_diag'],
    hints: H('Centre : aᵢᵢ ; rayon : la somme des |aᵢⱼ| de la ligne, sans la diagonale.',
      `R₂ = ${rText(d.A, 1, 'rows').replace(/\|[^|]*\|$/, '|□|')}`,
      `${discsR(d)} (valeurs propres ≈ ${e.map((x) => R(x.toFixed(2).replace('.', ','))).join(' ; ')})`),
    fallback: d.fallback,
  });
}

// L2: rows or columns — the finer family.
function gColumns(rng) {
  let d = null;
  for (let t = 0; t < 400 && !d; t++) {
    const c = gData(rng, { sym: false, by: 'cols' });
    if (!c.fallback && !disjoint(c.A, 'rows')) d = c;
  }
  if (!d) d = { ...gData(rng, { sym: false, by: 'cols' }), fallback: true };
  const decision = {
    kind: 'decision', prompt: `Par lignes, les disques sont ${discsR(d, 'rows')} : ils se chevauchent. Que fais-tu ?`, options: [
      { id: 'cols', label: 'Recommencer par colonnes (A et Aᵀ ont les mêmes valeurs propres)', valid: true },
      { id: 'rows', label: 'Garder les lignes', valid: true, quality: 'poor', why: 'Juste, mais les disques se chevauchent : on ne peut pas dire combien de valeurs propres chacun contient.' },
      { id: 'diag', label: 'Agrandir les rayons avec la diagonale', valid: false, rule: 'm_gersh_radius_diag', why: 'La diagonale est le centre ; elle n\'entre jamais dans le rayon.' },
    ],
  };
  const parts = [0, 1, 2].flatMap((i) => radSeg(d, i, { guided: true, by: 'cols' }));
  parts.splice(1, 0, decision);
  const { start, judge, script } = splitFirst(parts);
  return matLines({
    skill: GM, level: 2, mode: 'guided', keys: KEYS,
    prompt: `A = ${MLm(d.Aq)}. Trouve des disques de Gershgorin disjoints.`,
    start, judge, script, subgoals: SUB, key: `${GM}:2:${mt(d.Aq)}`, baits: ['m_gersh_radius_diag'],
    hints: H('Les disques par colonnes ont pour rayon la somme des |aᵢⱼ| de la colonne, sans la diagonale.',
      `R₁ (colonne 1) = ${rText(d.A, 0, 'cols').replace(/\|[^|]*\|$/, '|□|')}`, discsR(d, 'cols')),
    fallback: d.fallback,
  });
}

// L5: diagonal dominance ⇒ invertible (and Jacobi converges, module N).
function gDominant(rng) {
  const d = gData(rng, { need: 'dominant' });
  const margin = Math.min(...d.A.map((r, i) => abs(r[i]) - radius(d.A, i)));
  const parts = [0, 1, 2].flatMap((i) => radSeg(d, i));
  parts.push(
    { kind: 'segment', html: 'La plus petite marge minᵢ(|aᵢᵢ| − Rᵢ) : toute valeur propre vérifie |λ| ≥ cette marge.', ask: 'marge =', start: { math: 'm' }, judge: { kind: 'value', expect: String(margin), form: 'irreducible' } },
    { kind: 'decision', prompt: 'A est-elle à diagonale strictement dominante ?', options: [
      { id: 'yes', label: 'Oui : |aᵢᵢ| > Rᵢ pour chaque ligne', valid: true },
      { id: 'no', label: 'Non', valid: false, why: `|aᵢᵢ| − Rᵢ ≥ ${margin} > 0 pour chaque ligne.` },
    ] },
    invDecision(d),
    { kind: 'eq', math: String(margin), note: 'Donc 0 n\'est pas valeur propre : A est inversible (et Jacobi converge, voir module N)', subgoal: 'discs' },
  );
  const { start, judge, script } = splitFirst(parts);
  return linesItem({
    skill: GM, level: 5, mode: 'free', keys: KEYS, noHints: true,
    prompt: `A = ${MLm(d.Aq)}. Donne les rayons de Gershgorin (lignes) et la plus petite marge minᵢ(|aᵢᵢ| − Rᵢ). A est-elle inversible ?`,
    start, judge, script, subgoals: SUB, key: `${GM}:5:${mt(d.Aq)}`, baits: ['m_gersh_radius_diag'], fallback: d.fallback,
  });
}

function gMcq(rng, exam) {
  const d = gData(rng);
  const i = rng.int(0, 2);
  const Rr = radius(d.A, i);
  const signed = d.A[i].reduce((s, x, j) => s + (j === i ? 0 : x), 0);
  return mcqDistinct({
    skill: GM, level: 4, key: `mcq:${mt(d.Aq)}:${i}`, exam: examTag({ exam }),
    prompt: `A = ${MLm(d.Aq)}. Quel est le disque de Gershgorin de la ligne ${i + 1} ?`,
    right: `D(${R(d.A[i][i])} ; ${Rr})`,
    wrongs: [{ html: `D(${R(d.A[i][i])} ; ${Rr + abs(d.A[i][i])})`, rule: 'm_gersh_radius_diag' }, { html: `D(${R(d.A[i][i])} ; ${R(signed)})` }, { html: `D(0 ; ${Rr})` }],
    fillers: [{ html: `D(${R(d.A[i][i])} ; ${radius(d.A, i, 'cols') + 1})` }, { html: `D(${R(Rr)} ; ${R(abs(d.A[i][i]))})` }],
    solution: [{ html: `Centre a${sub(i + 1)}${sub(i + 1)} = ${R(d.A[i][i])}, rayon ${rText(d.A, i, 'rows')} = ${Rr} (sans la diagonale).`, note: '' }],
  }, rng);
}

function gTf(rng) {
  const exam = { format: 'tf', points: 1 };
  const k = rng.int(0, 2);
  if (k === 0) {
    return tfL({
      skill: GM, key: 'each-disc', truth: false, exam,
      statement: 'Chaque disque de Gershgorin contient au moins une valeur propre.',
      counter: { kind: 'mx', prop: 'gershEmptyDisc', params: {}, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: '[[0,1],[4,0]]' } },
      explanation: 'Faux quand les disques se chevauchent : [[0, 1], [4, 0]] a les disques D(0 ; 1) et D(0 ; 4), et les valeurs propres ±2, hors de D(0 ; 1). Seule une union de disques disjointe des autres en contient le bon nombre.',
    });
  }
  if (k === 1) return tfL({ skill: GM, key: 'dominant', truth: true, exam, statement: 'Une matrice à diagonale strictement dominante (|aᵢᵢ| > Σⱼ≠ᵢ |aᵢⱼ| pour chaque i) est inversible.', explanation: 'Vrai : 0 n\'est dans aucun disque de Gershgorin, donc 0 n\'est pas valeur propre.' });
  return tfL({ skill: GM, key: 'radius', truth: true, exam, ruleIfFalse: 'm_gersh_radius_diag', statement: 'Le rayon du disque de Gershgorin de la ligne i ne contient pas |aᵢᵢ|.', explanation: 'Vrai : aᵢᵢ est le centre ; le rayon est Σⱼ≠ᵢ |aᵢⱼ|.' });
}

export function genGersh(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return gMcq(rng, 'mcq');
  if (opts.exam === 'tf') return gTf(rng);
  return gItem(level, rng);
}

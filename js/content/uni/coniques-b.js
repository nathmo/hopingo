// Generators of module G10, part b (spec §8.3; step U5): conics from their
// elements, tangents, the nature of a conic, reduction with a term in xy,
// back to the first frame and sketch, families, loci, homogeneous
// coordinates. Catalogue: docs/universite/G-gymnase-2.md, G10. Tools: geo-kit.js.
//
// A reduction is built backwards: eigenvalues λ₁, λ₂, a unit eigenvector u₁
// among (1 ; 1)/√2, (2 ; 1)/√5, (1 ; 2)/√5 (A = λ₁u₁u₁ᵀ + λ₂u₂u₂ᵀ whole), a
// whole centre Ω and f(Ω) = −k; then f(x, y) = (X − Ω)ᵀA(X − Ω) − k is
// expanded. Parts: det(A − λI) (judge det), u₁ (eigvec, then vector: normed),
// u₂, Ω (vector), f(Ω) (value), the reduced equation (conic, with the frame).

import { Q } from '../../math/rational.js';
import {
  q, qt, fq, nz, H, add, sub, scale, dot, vt, vr, rootT, sumT, readable, eqT,
  partsItem, mcqD, examTag, MT, CML, pickW,
} from './geo-kit.js';
import { coefItem, mt, MLm } from './alglin-kit.js';
import { analyzeConic } from '../../cas/conic.js';
import { reduceData } from './coniques-b-kit.js';
import { asProblem } from './kit-problem.js';
import { GEN as NATURE } from './coniques-b-nature.js';
import { GEN as FRAME } from './coniques-b-frame.js';
import { GEN as DATA } from './coniques-b-data.js';
import { GEN as FAMILY } from './coniques-b-family.js';
import { t } from '../../i18n.js';

// ======================================================================
// Reductions built backwards
// ======================================================================

// reduceData is in coniques-b-kit.js (shared with the nature and the frame back).

// u = w/√n as text: (2 ; 1)/√5, or (1 ; 1)/√2.
const unitT = (w, n) => `${vt(w)}/√${n}`;
const unitR = (w, n) => `${vr(w)}/√${n}`;
const lamF = (a) => (a === 0 ? 'λ' : `${qt(a)}-λ`);
const parT = (x) => (q(x).n < 0 ? `(${qt(x)})` : qt(x));

// det(A − λI) lines: the matrix, the 2 × 2 formula, expanded, factored.
function charLines(d) {
  const [a, b2, c] = [d.A[0][0], d.A[0][1], d.A[1][1]];
  const tr = a.add(c);
  const det = a.mul(c).sub(b2.mul(b2));
  const L = (x) => (x.n === 0 ? '-λ' : `${qt(x)}-λ`);
  const m = `det[[${L(a)},${qt(b2)}],[${qt(b2)},${L(c)}]]`;
  const formula = `(${L(a)})(${L(c)})-${parT(b2)}^2`;
  const expanded = sumT([[1, 'λ^2'], [tr.neg(), 'λ'], [det, '']]);
  const fac = (l) => (l === 0 ? 'λ' : `(λ${l > 0 ? '-' : '+'}${Math.abs(l)})`);
  const factored = d.l2 === 0 ? `λ(λ${d.l1 > 0 ? '-' : '+'}${Math.abs(d.l1)})` : `${fac(d.l1)}${fac(d.l2)}`;
  return [
    { math: m, note: t('A = [[a, b/2], [b/2, c]] : b/2 = {v1} hors de la diagonale', { v1: fq(b2) }), subgoal: 'eig', cells: [[0, 1], [1, 0]] },
    { math: formula, note: t('Déterminant 2 × 2'), subgoal: 'eig', blank: [parT(b2)] },
    { math: expanded, note: t('Développer'), subgoal: 'eig', blank: [qt(det)], blank2: [] },
    { math: factored, note: `λ₁ = ${fq(d.l1)}, λ₂ = ${fq(d.l2)}`, subgoal: 'eig' },
  ];
}

// ======================================================================
// g10-conic-reduce
// ======================================================================

const RED = 'g10-conic-reduce';
const RED_SUB = [
  { id: 'eig', label: t('valeurs propres de A'), skill: 'l-eig-charpoly' },
  { id: 'vec', label: t('vecteurs propres normés'), skill: 'l-eig-space' },
  { id: 'centre', label: t('centre (système)'), skill: 'eq-systems' },
  { id: 'nature', label: t('nature : centre ou pas'), skill: 'g10-conic-nature' },
  { id: 'red', label: t('équation réduite'), skill: RED },
];

const RED_MENU = {
  char: [
    { id: 'char', label: t('Polynôme caractéristique det(A − λI)'), valid: true },
    { id: 'bfull', label: t('A = [[a, b], [b, c]] avec b entier'), valid: false, rule: 'g10_bhalf_matrix', why: t('Hors de la diagonale de A, on met la moitié du coefficient de xy : xᵀAx = ax² + 2a₁₂xy + cy².') },
    { id: 'complete', label: t('Compléter les carrés tout de suite'), valid: false, why: t('Le terme en xy empêche de compléter les carrés séparément : il faut d\'abord tourner le repère.') },
  ],
  vec: [
    { id: 'ker', label: t('Résoudre (A − λI)v = 0'), valid: true },
    { id: 'norm', label: t('Diviser par la norme'), valid: true },
    { id: 'col', label: t('Prendre une colonne de A'), valid: false, why: t('Une colonne de A n\'est pas un vecteur propre en général.') },
  ],
  centre: [
    { id: 'grad', label: '∂f/∂x = 0 et ∂f/∂y = 0', valid: true },
    { id: 'eig', label: t('Le centre est un vecteur propre'), valid: false, why: t('Le centre se trouve par les dérivées partielles nulles : c\'est le point de symétrie.') },
  ],
  const: [
    { id: 'sub', label: t('Remplacer x et y par les coordonnées de Ω'), valid: true },
    { id: 'keep', label: t('Garder la constante de départ'), valid: false, rule: 'g10_constant_not_updated', why: t('Après la translation au centre, la constante est f(Ω), pas celle de départ.') },
  ],
  red: [
    { id: 'diag', label: 'λ₁X² + λ₂Y² + f(Ω) = 0', valid: true },
    { id: 'square', label: t('Compléter le carré après la rotation'), valid: true },
    { id: 'unnorm', label: t('Garder les vecteurs propres non normés'), valid: false, rule: 'g10_eigvec_not_normed', why: t('Le repère doit être orthonormé : avec un vecteur de norme √n, X² est multiplié par n.') },
  ],
};

function reduceParts(d, level, { foci = false } = {}) {
  const eq = eqT(d.coefs);
  const Atext = mt(d.A);
  const parts = [];
  const trapCfg = { reduce: { l1: d.l1, l2: d.l2, n: d.n, f: qt(d.coefs[5]), fO: d.k === null ? null : qt(-d.k) }, abc: d.coefs.slice(0, 3).map(qt) };
  parts.push({
    html: t('A = {v1} (b/2 = {v2} hors de la diagonale).', { v1: MLm(d.A), v2: fq(d.A[0][1]) }), ask: 'det(A − λI) =', start: 'det(A-λI)',
    judge: { kind: 'det', vars: ['λ'], target: 'factored', names: { A: Atext }, ...trapCfg }, menu: RED_MENU.char,
    lines: charLines(d),
  });
  const v1 = d.w1;
  parts.push({
    html: t('λ₁ = {v1}. Un vecteur propre ?', { v1: fq(d.l1) }), ask: 'v₁ =', start: 'v_1',
    judge: { kind: 'eigvec', A: Atext, lambda: String(d.l1) }, menu: RED_MENU.vec,
    lines: [{ math: vt(v1), note: `(A ${d.l1 < 0 ? '+' : '−'} ${Math.abs(d.l1)}I)v = 0`, subgoal: 'vec', cells: [[1, 0]], cells2: [[0, 0], [1, 0]] }],
  });
  parts.push({
    html: t('Norme-le.'), ask: 'u₁ =', start: 'u_1',
    judge: { kind: 'vector', expect: unitT(v1, d.n), signed: true, form: 'any' }, menu: RED_MENU.vec,
    lines: [{ math: `u_1 = ${unitT(v1, d.n)}`, note: `‖${vr(v1)}‖ = √${d.n}`, subgoal: 'vec', blank: [`√${d.n}`] }],
  });
  parts.push({
    html: t('u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.'), ask: 'u₂ =', start: 'u_2',
    judge: { kind: 'vector', expect: unitT(d.w2, d.n), signed: true, form: 'any' }, menu: RED_MENU.vec,
    lines: [{ math: `u_2 = ${unitT(d.w2, d.n)}`, note: `λ₂ = ${fq(d.l2)}`, subgoal: 'vec', blank: [qt(d.w2[0])], blank2: [vt(d.w2)] }],
  });
  const fr = { O: d.kind === 'par' ? '(0 ; 0)' : vt(d.O), u1: unitT(v1, d.n), u2: unitT(d.w2, d.n) };
  if (d.kind !== 'par') {
    const [a, b, c, dd, e] = d.coefs;
    const gx = readable(sumT([[a.mul(2), 'x'], [b, 'y'], [dd, '']]));
    const gy = readable(sumT([[b, 'x'], [c.mul(2), 'y'], [e, '']]));
    parts.push({
      html: t('Le centre Ω : ∂f/∂x = {gx} = 0 et ∂f/∂y = {gy} = 0.', { gx, gy }), ask: 'Ω =', start: 'Ω',
      judge: { kind: 'vector', expect: vt(d.O) }, menu: RED_MENU.centre,
      decisions: [{
        levels: [2], kind: 'decision', prompt: t('La conique a-t-elle un centre ?'), options: [
          { id: 'yes', label: t('Oui : δ = λ₁λ₂ = {v1} ≠ 0', { v1: fq(d.l1 * d.l2) }), valid: true, ref: true },
          { id: 'no', label: t('Non : il faut compléter un carré après la rotation'), valid: false, why: t('δ = λ₁λ₂ = {v1} ≠ 0 : le système du centre a une solution unique.', { v1: fq(d.l1 * d.l2) }) },
        ],
      }],
      lines: [{ math: `Ω = ${vt(d.O)}`, note: t('Résoudre le système'), subgoal: 'centre', blank: [qt(d.O[0]), qt(d.O[1])] }],
    });
    const [x0, y0] = d.O.map(parT);
    // a·x₀² + b·x₀y₀ + … with the zero terms left out, a coefficient 1 not written.
    const term = (k, body) => (k.n === 0 ? null : k.eq(1) ? body : k.eq(-1) ? `-${body}` : `${parT(k)}·${body}`);
    const sub0 = [term(a, `${x0}^2`), term(b, `${x0}·${y0}`), term(c, `${y0}^2`), term(dd, x0), term(e, y0), d.coefs[5].n === 0 ? null : parT(d.coefs[5])]
      .filter(Boolean).join(' + ').replace(/\+ -/g, '- ');
    parts.push({
      html: t('La constante f(Ω) ?'), ask: 'f(Ω) =', start: sub0.replace(/\+ \(-/g, '+ (-'),
      judge: { kind: 'value', expect: String(-d.k), ...trapCfg }, menu: RED_MENU.const,
      lines: [{ math: String(-d.k), note: t('Remplacer x et y par les coordonnées de Ω'), subgoal: 'centre', blank: [String(-d.k)] }],
    });
    const redT = `${sumT([[d.l1, 'X^2'], [d.l2, 'Y^2'], [-d.k, '']])} = 0`;
    const a2 = new Q(d.k, d.l1);
    const b2 = new Q(d.k, d.l2);
    const stdT = `${sumT([[new Q(1).div(a2), 'X^2'], [new Q(1).div(b2), 'Y^2']])} = 1`;
    parts.push({
      html: t('L\'équation dans le repère Ru = (Ω ; u₁, u₂).'), ask: t('équation réduite :'), start: eq,
      judge: { kind: 'conic', equation: eq, target: 'reduced', frame: fr, ...trapCfg }, menu: RED_MENU.red,
      lines: [
        { math: redT, note: 'λ₁X² + λ₂Y² + f(Ω) = 0', subgoal: 'red', blank: [sumT([[d.l1, 'X^2']]), sumT([[Math.abs(d.l2), 'Y^2']])] },
      ],
    });
    if (foci) {
      const an = d.an ?? analyzeConic(d.coefs.map((x) => x.valueOf()));
      const F = an.foci.map((P) => P.map((x) => Math.round(x * 1e6) / 1e6));
      const fT = (P) => `(${P.map((x) => qt(toQ(x))).join(' ; ')})`;
      parts.push({
        html: t('Les foyers dans le repère initial Re.'), ask: t('foyers :'), start: stdT,
        judge: { kind: 'conic', equation: eq, ask: ['F'] },
        lines: [{ math: `F = ${fT(F[0])} ; F' = ${fT(F[1])}`, note: an.type === 'hyperbola' ? t('c² = a² + b² ; F = Ω ± c·u, u sur l\'axe réel') : t('c² = a² − b² ; F = Ω ± c·u, u sur l\'axe focal'), subgoal: 'red' }],
      });
    }
  } else {
    // Parabola: rotate first (frame (O ; u₁, u₂)), then complete the square.
    const [a, b, c, dd, e, f] = d.coefs;
    // In (O ; u₁, u₂): λ₁X² + (D·u₁)X + (D·u₂)Y + f = 0, D·uᵢ = D·wᵢ/√n.
    const Dw1 = dd.mul(d.w1[0]).add(e.mul(d.w1[1]));
    const Dw2 = dd.mul(d.w2[0]).add(e.mul(d.w2[1]));
    const rot = `${d.l1}X^2 + (${qt(Dw1)}/√${d.n})X + (${qt(Dw2)}/√${d.n})Y + ${parT(f)} = 0`;
    parts.push({
      html: t('Dans le repère (O ; u₁, u₂), x = X·u₁ + Y·u₂ : l\'équation sans terme en XY.'), ask: t('équation :'), start: eq,
      judge: { kind: 'conic', equation: eq, target: 'reduced', frame: fr, ...trapCfg }, menu: RED_MENU.red,
      decisions: [{
        levels: [2], kind: 'decision', prompt: t('La conique a-t-elle un centre ?'), options: [
          { id: 'no', label: t('Non : λ₂ = 0, on tourne d\'abord puis on complète le carré'), valid: true, ref: true },
          { id: 'yes', label: t('Oui : on résout ∂f/∂x = ∂f/∂y = 0'), valid: false, why: t('δ = λ₁λ₂ = 0 : le système du centre n\'a pas de solution unique, une parabole n\'a pas de centre.') },
        ],
      }],
      lines: [
        { math: rot, note: t('λ₁ = {v1} devant X², λ₂ = 0 : pas de Y²', { v1: fq(d.l1) }), subgoal: 'red' },
        { math: `${d.l1}X^2 + ${d.m}√${d.n}·Y = 0`.replace('+ -', '- '), note: t('Compléter le carré et translater au sommet S'), subgoal: 'red' },
      ],
    });
  }
  return parts;
}

const toQ = (x) => {
  // A float that is a fraction with a small denominator.
  for (let den = 1; den <= 60; den++) { const nn = Math.round(x * den); if (Math.abs(nn / den - x) < 1e-9) return new Q(nn, den); }
  return new Q(Math.round(x));
};

function reduceItem(level, rng, opts = {}) {
  const kind = level >= 4 && !opts.exam && rng.int(0, 3) === 0 ? 'par' : rng.pick(['hyp', 'ell', 'hyp']);
  const foci = (level === 5 || opts.exam === 'open') && kind !== 'par';
  const d = reduceData(rng, kind, { fociQ: foci });
  const eq = eqT(d.coefs);
  const parts = reduceParts(d, level, { foci });
  const hints = H(
    t('Diagonalise A : les valeurs propres sont les coefficients de X² et Y². Le centre annule ∂f/∂x et ∂f/∂y.'),
    `(${fq(d.A[0][0])} − λ)(${fq(d.A[1][1])} − λ) − □ = 0`,
    d.kind === 'par' ? t('λ₁X² + μY = 0 au sommet') : `${readable(sumT([[d.l1, 'X^2'], [d.l2, 'Y^2'], [-d.k, '']]))} = 0`,
  );
  return partsItem({
    skill: RED, level, parts, hints, subgoals: RED_SUB,
    prompt: reducePrompt(MT(eq, { vars: ['x', 'y'] }), d.kind === 'par', foci),
    key: `${RED}:${d.kind}:${eq}${foci ? ':foci' : ''}`, fallback: d.fallback,
    exam: opts.exam ? examTag(opts, opts.exam === 'open' ? 7.5 : 1) : false,
    keys: ['calc', 'geo', 'mat'],
  });
}

function reduceExam(rng, exam) {
  if (exam === 'open') return reduceItem(5, rng, { exam });
  const d = reduceData(rng, rng.pick(['hyp', 'ell']));
  const eq = eqT(d.coefs);
  const askConst = rng.chance(0.5);
  const big = Math.max(d.l1, d.l2);
  return coefItem({
    skill: RED, key: `${eq}:${askConst ? 'c' : 'l'}`, exam: examTag({ exam }), label: askConst ? 'c' : 'λ_1',
    prompt: t('On réduit la conique {v1} dans un repère orthonormé de ses axes, centré en son centre : λ₁X² + λ₂Y² + c = 0, avec λ₁ > λ₂. {v2}', { v1: MT(eq, { vars: ['x', 'y'] }), v2: askConst ? t('Que vaut c ?') : t('Que vaut λ₁ ?') }),
    value: askConst ? String(-d.k) : String(big),
    traps: askConst ? [{ rule: 'g10_constant_not_updated' }] : [{ rule: 'g10_bhalf_matrix' }],
    solution: [{ html: `λ₁ = ${fq(big)}, λ₂ = ${fq(Math.min(d.l1, d.l2))}, Ω = ${vr(d.O)}, c = f(Ω) = ${fq(-d.k)}.`, note: '' }],
    fallback: d.fallback,
  });
}

// The prompt of the reduction: with a centre or not (parabola), with the foci or not.
function reducePrompt(v1, par, foci) {
  if (par) {
    return foci
      ? t('Dans un repère orthonormé Re, on donne la conique {v1}. Réduis-la : valeurs propres et vecteurs propres normés de A, puis l\'équation dans le repère Ru, et enfin les foyers dans Re.', { v1 })
      : t('Dans un repère orthonormé Re, on donne la conique {v1}. Réduis-la : valeurs propres et vecteurs propres normés de A, puis l\'équation dans le repère Ru.', { v1 });
  }
  return foci
    ? t('Dans un repère orthonormé Re, on donne la conique {v1}. Réduis-la : valeurs propres et vecteurs propres normés de A, centre Ω, constante f(Ω), puis l\'équation dans le repère Ru, et enfin les foyers dans Re.', { v1 })
    : t('Dans un repère orthonormé Re, on donne la conique {v1}. Réduis-la : valeurs propres et vecteurs propres normés de A, centre Ω, constante f(Ω), puis l\'équation dans le repère Ru.', { v1 });
}

// ======================================================================

export const GEN = {
  ...DATA,
  ...FAMILY,
  ...NATURE,
  ...FRAME,
  // Level 5 is the long problem of the catalogue (E2), a `problem` item since
  // step U4, with the points of its open variant.
  [RED]: (level, rng, profile, opts = {}) => (opts.exam ? reduceExam(rng, opts.exam) : level === 5 ? asProblem(reduceItem(5, rng), 7.5) : reduceItem(level, rng)),
};

export { CML, mcqD, rootT, add, sub, scale };

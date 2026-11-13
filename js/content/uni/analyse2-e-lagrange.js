// Generators of module A2, part e (step U6): Lagrange multipliers, one
// constraint in ℝ² (judge `system` with λ eliminated at the end) and in ℝ³
// (a linear f on a sphere; a quadratic form xᵀAx on the unit sphere through
// the eigenvalues of A). Catalogue: docs/universite/A2-analyse-2.md,
// `a2-lagrange`, `a2-lagrange-3d`, and the exam example E2.
//
// Convention: ∇f = λ∇g. Families (each built from its points):
//   XY  f = xy on ax² + by² = c, c = 2abm: points (±√(bm), ±√(am))
//   LIN f = αx + βy on ax² + by² = c through (u, v): points ±(u, v)
//   XY2 f = xy² on x² + by² = c, c = 3m (E2): (±√c, 0) and (±√m, ±√(2m/b))

import {
  q, XY, XYZ, rd, rootT, substT, sysCfg, SML, partsLines, mcq4, tfItem, problemItem, mcq, H, E, MT, blanked, examTag,
} from './analyse2-e-kit.js';
import { t } from '../../i18n.js';

export const LG = 'a2-lagrange';
export const L3 = 'a2-lagrange-3d';
const XYL = ['x', 'y', 'λ'];

const LG_SUB = [
  { id: 'setup', label: t('∇f et ∇g'), skill: 'a2-partials' },
  { id: 'system', label: t('système de Lagrange'), skill: 'eq-systems' },
  { id: 'case', label: t('cas'), skill: 'eq-systems' },
  { id: 'points', label: t('points candidats'), skill: LG },
  { id: 'compare', label: t('comparer les valeurs'), skill: LG },
];
const LG_CHOICES = [
  { id: 'system', label: t('Écrire ∇f = λ∇g et g = 0') },
  { id: 'express', label: t('Exprimer x et y en fonction de λ') },
  { id: 'subst', label: t('Substituer pour éliminer une variable') },
  { id: 'factor', label: t('Factoriser une équation') },
  { id: 'cases', label: t('Séparer les cas (« … ou … »)') },
  { id: 'list', label: t('Écrire la liste des points') },
  { id: 'value', label: t('Calculer f en un candidat') },
  { id: 'compare', label: t('Comparer les valeurs') },
  { id: 'divide', label: t('Diviser par x (ou par y)'), rule: 'a2_lagrange_divide', why: t('x (ou y) peut valoir 0 : ce cas donne d\'autres candidats. Factorise et sépare les cas.') },
];

const cf = (k, v) => (k === 1 ? v : k === -1 ? `-${v}` : `${k}${v}`);
const gT = (a, b, c) => `${cf(a, 'x^2')}+${cf(b, 'y^2')} = ${c}`;
const gR = (a, b, c) => rd(`${a === 1 ? '' : a}x² + ${b === 1 ? '' : b}y² = ${c}`);
// c·x² as text: x^2, 2x^2, (1/2)x^2.
const qx2 = (c) => (c.eq(1) ? 'x^2' : c.d === 1 ? `${c}x^2` : `(${c})x^2`);
const neg = (t) => (t === '0' ? '0' : t.startsWith('-') ? t.slice(1) : `-${t}`);
const ptR = (p) => rd(`(${p[0]} ; ${p[1]})`);
const listT = (pts) => pts.map((p) => `(${p[0]} ; ${p[1]})`).join(', ');
const andList = (xs) => (xs.length > 1 ? t('{a} et {b}', { a: xs.slice(0, -1).join(', '), b: xs[xs.length - 1] }) : xs[0]);
// A number a·√m as text from its square and sign (exact values of f).
const sq = (x2, s = 1) => rootT(x2, s);

// ---------- data ----------

function dataXY(rng) {
  const [a, b] = rng.pick([[1, 1], [1, 2], [2, 1], [1, 4], [4, 1], [1, 3], [3, 1], [2, 2]]);
  const m = rng.pick([1, 2]);
  const c = 2 * a * b * m;
  const x0 = sq(b * m);
  const y0 = sq(a * m);
  const s = q(a, b);
  const sT = rootT(s);
  const lam = `${sT}/${2 * a}`;
  const pts = [[x0, y0], [neg(x0), neg(y0)], [x0, neg(y0)], [neg(x0), y0]];
  const sols = [[...pts[0], lam], [...pts[1], lam], [...pts[2], `-${lam}`], [...pts[3], `-${lam}`]];
  const fv = sq(a * b * m * m);
  const yx = sT === '1' ? 'x' : /^\d+$/.test(sT) ? `${sT}x` : `(${sT})x`;
  const lines = [
    { math: `y = ${cf(2 * a, 'λx')} ; x = ${cf(2 * b, 'λy')} ; ${gT(a, b, c)}`, note: '∇f = (y ; x), ∇g = (' + `${2 * a}x ; ${2 * b}y)`, act: 'system', sub: 'system' },
    { math: `y = ${cf(2 * a, 'λx')} ; x(1-${4 * a * b}λ^2) = 0 ; ${gT(a, b, c)}`, note: t('x = {k}λ·({j}λx) : mettre x en facteur', { k: 2 * b, j: 2 * a }), act: 'subst', sub: 'case' },
    { math: `(x = 0 ; y = 0 ; ${gT(a, b, c)}) ou (y = ${cf(2 * a, 'λx')} ; λ^2 = 1/${4 * a * b} ; ${gT(a, b, c)})`, note: t('Cas x = 0 (alors y = 0, pas sur la courbe), ou λ² = …'), act: 'cases', sub: 'case' },
    { math: `(y = ${yx} ou y = -${yx}) ; ${gT(a, b, c)}`, note: `λ = ±${rd(lam)} : y = ±${rd(yx)}`, act: 'cases', sub: 'case' },
    { math: listT(pts), note: t('Dans la contrainte'), act: 'list', sub: 'points' },
  ];
  const vals = [{ p: pts[0], v: fv, s: 1 }, { p: pts[1], v: fv, s: 1 }, { p: pts[2], v: `-${fv}`, s: -1 }, { p: pts[3], v: `-${fv}`, s: -1 }];
  return {
    fam: 'XY', a, b, c, m, fT: 'xy', f: 'x y', grad: ['y', 'x'], gradG: [cf(2 * a, 'x'), cf(2 * b, 'y')], gText: gT(a, b, c), gRead: gR(a, b, c),
    pts, sols, lines, vals, max: fv, min: `-${fv}`, nMax: 2, nMin: 2, firstCase: null, zeroVar: 'x',
    // Not on the curve: the point of the line y = sx with x = 1 (a2_lagrange_no_constraint).
    offCurve: { p: ['1', sT], v: sT },
  };
}

function dataLIN(rng) {
  for (let i = 0; i < 100; i++) {
    const [a, b] = rng.pick([[1, 1], [1, 2], [2, 1], [1, 3], [3, 1], [2, 3]]);
    const u = rng.pick([1, 2, -1, -2]);
    const v = rng.pick([1, 2, 3, -1, -2]);
    const c = a * u * u + b * v * v;
    if (c > 30) continue;
    let al = a * u;
    let be = b * v;
    const g = gcdi(al, be);
    al /= g;
    be /= g;
    const lam = q(1, 2 * g);
    const pts = [[String(u), String(v)], [String(-u), String(-v)]];
    const sols = [[...pts[0], String(lam)], [...pts[1], String(lam.neg())]];
    const fT = `${cf(al, 'x')}${be > 0 ? '+' : '-'}${cf(Math.abs(be), 'y')}`;
    const fv = q(c, g);
    // k/λ as text: 1/(2λ), -3/λ.
    const overL = (k) => (k.d === 1 ? `${k.n}/λ` : `${k.n}/(${k.d}λ)`);
    const xl = overL(q(al, 2 * a));
    const yl = overL(q(be, 2 * b));
    const lines = [
      { math: `${al} = ${cf(2 * a, 'λx')} ; ${be} = ${cf(2 * b, 'λy')} ; ${gT(a, b, c)}`, note: `∇f = (${rd(al)} ; ${rd(be)}), ∇g = (${2 * a}x ; ${2 * b}y)`, act: 'system', sub: 'system' },
      { math: `x = ${xl} ; y = ${yl} ; ${gT(a, b, c)}`, note: t('λ ≠ 0 (sinon la 1re équation donne 0 = …) : diviser par λ est permis'), act: 'express', sub: 'case' },
      { math: `x = ${xl} ; y = ${yl} ; λ^2 = ${lam.mul(lam)}`, note: t('Substituer dans la contrainte'), act: 'subst', sub: 'case' },
      { math: `(λ = ${lam} ou λ = ${lam.neg()}) ; x = ${xl} ; y = ${yl}`, note: t('Deux valeurs de λ'), act: 'cases', sub: 'case' },
      { math: listT(pts), note: t('Un point pour chaque λ'), act: 'list', sub: 'points' },
    ];
    const vals = [{ p: pts[0], v: String(fv), s: 1 }, { p: pts[1], v: String(fv.neg()), s: -1 }];
    return {
      fam: 'LIN', a, b, c, fT, f: fT, grad: [String(al), String(be)], gradG: [cf(2 * a, 'x'), cf(2 * b, 'y')], gText: gT(a, b, c), gRead: gR(a, b, c),
      pts, sols, lines, vals, max: String(fv), min: String(fv.neg()), nMax: 1, nMin: 1, firstCase: null, zeroVar: null,
      offCurve: { p: [String(q(al, a)), String(q(be, b))], v: String(q(al * al, a).add(q(be * be, b))) },
    };
  }
  return null;
}
function gcdi(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; }

// E2 family: f = xy² on x² + by² = 3m.
export function dataXY2(rng, fixed = false) {
  const [b, m] = fixed ? [2, 2] : rng.pick([[2, 1], [2, 2], [2, 3], [1, 1], [1, 2], [4, 2]]);
  const c = 3 * m;
  const xc = sq(c);
  const x1 = sq(m);
  const y1 = sq(q(2 * m, b));
  const pts = [[xc, '0'], [neg(xc), '0'], [x1, y1], [x1, neg(y1)], [neg(x1), y1], [neg(x1), neg(y1)]];
  const lam = `${x1}/${b}`;
  const sols = [[xc, '0', '0'], [neg(xc), '0', '0'], [x1, y1, lam], [x1, neg(y1), lam], [neg(x1), y1, `-${lam}`], [neg(x1), neg(y1), `-${lam}`]];
  const fv = q(2 * m, b);
  // f = x·y² = ±√m·2m/b.
  const top = rootT(fv.mul(fv).mul(m));
  const bl = b === 1 ? 'λ' : `${b}λ`;
  const y2 = qx2(q(2, b));
  const lines = [
    { math: `y^2 = 2λx ; 2xy = ${cf(2 * b, 'λy')} ; ${gT(1, b, c)}`, note: `∇f = (y² ; 2xy), ∇g = (2x ; ${2 * b}y)`, act: 'system', sub: 'system' },
    { math: `y^2 = 2λx ; 2y(x-${bl}) = 0 ; ${gT(1, b, c)}`, note: t('Factoriser la 2e équation (ne pas diviser par y)'), act: 'factor', sub: 'case' },
    { math: `(y = 0 ; λ = 0 ; x^2 = ${c}) ou (x = ${bl} ; y^2 = ${y2} ; 3x^2 = ${c})`, note: t('Cas y = 0 : x = ±{xc}, λ = 0. Cas x = {bl} : y² = 2λx = {y2}', { xc: rd(xc), bl, y2: y2.replace('^2', '²') }), act: 'cases', sub: 'case' },
    { math: listT(pts), note: t('Les six candidats'), act: 'list', sub: 'points' },
  ];
  const vals = [
    { p: pts[0], v: '0', s: 0 }, { p: pts[1], v: '0', s: 0 },
    { p: pts[2], v: top, s: 1 }, { p: pts[3], v: top, s: 1 }, { p: pts[4], v: `-${top}`, s: -1 }, { p: pts[5], v: `-${top}`, s: -1 },
  ];
  return {
    fam: 'XY2', b, c, m, fT: 'xy^2', f: 'x y^2', grad: ['y^2', '2xy'], gradG: ['2x', cf(2 * b, 'y')], gText: gT(1, b, c), gRead: gR(1, b, c),
    pts, sols, lines, vals, max: top, min: `-${top}`, nMax: 2, nMin: 2, firstCase: { v: '0', pts: pts.slice(0, 2) }, zeroVar: 'y',
    offCurve: { p: ['1', sq(q(2, b))], v: String(q(2, b)) },
  };
}

export function lagrangeData(rng, fam = rng.pick(['XY', 'XY', 'LIN', 'XY2', 'XY2'])) {
  const d = fam === 'XY' ? dataXY(rng) : fam === 'LIN' ? dataLIN(rng) || dataXY(rng) : dataXY2(rng);
  d.cfg = sysCfg(XYL, d.sols, { elim: ['λ'], grid: 4 });
  d.fML = MT(d.fT, { vars: XY });
  d.argmax = d.vals.filter((x) => x.s === 1);
  d.argmin = d.vals.filter((x) => x.s === -1);
  return d;
}

// ---------- parts ----------

const valueOf = (d, it, level) => {
  const l = E(it.v, `f${ptR(it.p)}`, 'compare', 'value');
  return {
    html: t('Valeur de f en {p} :', { p: ptR(it.p) }), ask: 'f =', start: 'f', judge: { kind: 'value', expect: it.v, form: 'exact' },
    lines: [level === 1 ? blanked(l, [it.v.replace(/^-/, '')], { vars: XY }) : l],
  };
};
function substLin(d, p) {
  const [al, be] = d.grad;
  return `${al}×(${p[0]})+${be.startsWith('-') ? `(${be})` : be}×(${p[1]})`;
}

function compareParts(d, level) {
  const countDecision = {
    kind: 'decision', prompt: t('Le maximum {M} est atteint en combien de points ?', { M: rd(d.max) }), options: [
      { id: 'n', label: d.nMax === 1 ? t('Un seul point') : t('{n} points : {pts}', { n: d.nMax, pts: andList(d.argmax.map((x) => ptR(x.p))) }), valid: true },
      ...(d.nMax > 1
        ? [{ id: 'one', label: t('Un seul point'), valid: false, rule: 'a2_lagrange_count', why: t('f vaut aussi {M} en {p} (symétrie).', { M: rd(d.max), p: ptR(d.argmax[1].p) }) }]
        : [{ id: 'two', label: t('Deux points (par symétrie)'), valid: false, why: t('f(−x, −y) = −f(x, y) ici : le symétrique {p} donne le minimum.', { p: ptR(d.argmin[0].p) }) }]),
    ],
  };
  const parts = [
    {
      html: t('Comparer les valeurs : le maximum de f sur la courbe.'), ask: 'max f =', start: 'M', judge: { kind: 'value', expect: d.max, form: 'exact' },
      pre: d.firstCase && level >= 2 ? [{
        kind: 'decision', prompt: t('Les points du cas {v} = 0 donnent f = 0. Est-ce le minimum ?', { v: d.zeroVar }), options: [
          { id: 'no', label: t('Non : il faut comparer avec tous les candidats'), valid: true },
          { id: 'yes', label: t('Oui : c\'est le premier cas trouvé'), valid: false, rule: 'a2_lagrange_no_compare', why: t('En {p}, f vaut {m} &lt; 0.', { p: ptR(d.argmin[0].p), m: rd(d.min) }) },
        ],
      }] : [],
      lines: [E(d.max, t('La plus grande valeur'), 'compare', 'compare')],
    },
    {
      html: t('Le minimum de f sur la courbe.'), ask: 'min f =', start: 'm', judge: { kind: 'value', expect: d.min, form: 'exact' },
      pre: [countDecision], lines: [E(d.min, t('La plus petite valeur'), 'compare', 'compare')],
    },
  ];
  return parts;
}

// One value per symmetric pair, plus the zero case.
function valueParts(d, level) {
  const seen = new Set();
  const out = [];
  for (const it of d.vals) {
    if (seen.has(it.v)) continue;
    seen.add(it.v);
    out.push(valueOf(d, it, level));
  }
  return out;
}

function lagLines(level, rng, opts) {
  const d = lagrangeData(rng, level === 1 ? rng.pick(['XY', 'XY2', 'LIN']) : undefined);
  const parts = [];
  let first;
  if (level === 1) {
    // The system and its cases are given: the points, then the values.
    const k = d.lines.length - 2;
    parts.push({ start: d.lines[k].math, judge: d.cfg, lines: [E(d.lines[k + 1].math, d.lines[k + 1].note, 'points', 'list')] });
    first = t('Les cas sont résolus jusqu\'à {s}. Écris la liste des points candidats :', { s: SML(d.cfg, d.lines[k].math) });
  } else {
    const lines = d.lines.map((l) => E(l.math, l.note, l.sub, l.act));
    if (level === 2) {
      const k = d.fam === 'LIN' ? 1 : lines.findIndex((l) => / ou /.test(l.math));
      lines.splice(k, 0, splitDecision(d));
    }
    if (level >= 4) {
      parts.push({
        start: `pd(${d.fT},x)`, judge: { kind: 'equiv', vars: XY, target: 'no-prime' }, lines: [E(d.grad[0], 'f_x', 'setup', 'grad')],
      }, {
        html: t('Puis ∂f/∂y :'), ask: '∂f/∂y =', start: `pd(${d.fT},y)`, judge: { kind: 'equiv', vars: XY, target: 'no-prime' }, lines: [E(d.grad[1], 'f_y', 'setup', 'grad')],
      });
    }
    parts.push({
      html: t('Le système de Lagrange, avec ∇g = ({a} ; {b}) :', { a: rd(d.gradG[0]), b: rd(d.gradG[1]) }), ask: '⇔', start: d.gText, judge: d.cfg, lines,
      pre: level >= 4 ? [{
        kind: 'decision', prompt: t('∇g = ({a} ; {b}) s\'annule-t-il sur la courbe {g} ?', { a: rd(d.gradG[0]), b: rd(d.gradG[1]), g: d.gRead }), options: [
          { id: 'no', label: t('Non : ∇g = 0 seulement en (0, 0), qui n\'est pas sur la courbe'), valid: true },
          { id: 'yes', label: t('Oui'), valid: false, why: t('∇g = 0 demande x = 0 et y = 0, et (0, 0) n\'est pas sur la courbe.') },
        ],
      }] : [],
    });
    first = level >= 4 ? t('Calcule ∂f/∂x :') : t('Écris le système ∇f = λ∇g et g = 0 :');
  }
  parts.push(...valueParts(d, level), ...compareParts(d, level));
  const acts = [...new Set(parts.flatMap((p) => p.lines.map((l) => l.act)).filter(Boolean))];
  const given = level <= 3 ? t(' On donne ∇f = ({a} ; {b}).', { a: MT(d.grad[0], { vars: XY }), b: MT(d.grad[1], { vars: XY }) }) : '';
  return partsLines({
    skill: LG, level, parts, choices: LG_CHOICES.filter((c) => acts.includes(c.id) || (c.id === 'divide' && d.zeroVar)),
    prompt: `${t('Trouve le maximum et le minimum de f(x, y) = {f} sous la contrainte {g}, et les points où ils sont atteints.', { f: d.fML, g: d.gRead })}${given}<br>${first}`,
    hints: H(d.zeroVar ? t('Écris ∇f = λ∇g et la contrainte, puis sépare le cas {v} = 0 (ne divise pas).', { v: d.zeroVar }) : t('Écris ∇f = λ∇g et la contrainte, puis exprime x et y en fonction de λ.'),
      t('Le système : {s}.', { s: SML(d.cfg, d.lines[0].math) }),
      `${SML(d.cfg, d.lines[d.lines.length - 2].math)} ; max ${rd(d.max)}, min ${rd(d.min)}.`),
    subgoals: LG_SUB, key: `${LG}:${level}:${d.fT}:${d.gText}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

function splitDecision(d) {
  if (d.fam === 'LIN') {
    return {
      kind: 'decision', prompt: t('Peut-on diviser par λ ?'), options: [
        { id: 'yes', label: t('Oui : λ = 0 donnerait {a} = 0, impossible', { a: rd(d.grad[0]) }), valid: true },
        { id: 'no', label: t('Non, jamais'), valid: false, why: t('Ici λ ≠ 0 : la 1re équation serait {a} = 0.', { a: rd(d.grad[0]) }) },
      ],
    };
  }
  return {
    kind: 'decision', prompt: t('Une équation est de la forme {v}·(…) = 0. Que fais-tu ?', { v: d.zeroVar }), options: [
      { id: 'cases', label: t('Séparer les cas : {v} = 0, ou (…) = 0', { v: d.zeroVar }), valid: true },
      { id: 'div', label: t('Diviser par {v}', { v: d.zeroVar }), valid: false, rule: 'a2_lagrange_divide', why: t('{v} peut valoir 0 : ce cas donne d\'autres candidats (ou aucun, mais il faut le vérifier).', { v: d.zeroVar }) },
    ],
  };
}

// ---------- level 5: the problem E2 ----------

function lagProblem(level, rng, opts) {
  const d = lagrangeData(rng, 'XY2');
  const { b, c, m } = d;
  const sub = (parts, prompt, k) => partsLines({ skill: LG, level, parts, choices: [], hints: [], noHints: true, prompt, subgoals: LG_SUB, key: `${LG}:5:${k}:${d.gText}` });
  const exist = mcq({
    skill: LG, level, prompt: t('Pourquoi f atteint-elle un maximum et un minimum sur la courbe {g}, et pourquoi la méthode de Lagrange s\'applique-t-elle ?', { g: d.gRead }),
    options: [
      { html: t('La courbe est compacte, f est continue, et ∇g = (2x ; {k}y) ≠ 0 sur la courbe', { k: 2 * b }), correct: true },
      { html: t('f est un polynôme, et ∇f ≠ 0 sur la courbe'), correct: false },
      { html: t('La courbe est bornée, donc tout point où ∇f = λ∇g est un extremum'), correct: false, rule: 'a2_lagrange_no_compare' },
      { html: t('Elle n\'en atteint pas : la courbe n\'est pas un ouvert'), correct: false, rule: 'a2_compact_open' },
    ],
    key: `exist:${d.gText}`, solution: [{ html: t('Bornes atteintes sur un compact ; Lagrange demande ∇g ≠ 0 sur la contrainte.'), note: '' }],
  }, rng);
  const xc = d.pts[0][0];
  const caseY0 = sysCfg(XYL, d.sols.slice(0, 2), { elim: ['λ'] });
  const caseY1 = sysCfg(XYL, d.sols.slice(2), { elim: ['λ'] });
  const bl = b === 1 ? 'λ' : `${b}λ`;
  const y2 = qx2(q(2, b));
  return problemItem({
    skill: LG, level, prompt: t('Trouve le maximum et le minimum de f(x, y) = {f} sous la contrainte {g}, et les points où ils sont atteints.', { f: d.fML, g: d.gRead }),
    parts: [
      { item: exist, points: 1, title: t('Existence et hypothèse') },
      { item: systemMcq(d, level, rng), points: 1, title: t('Système') },
      { item: sub([{ start: `y = 0 ; y^2 = 2λx ; ${d.gText}`, judge: caseY0, lines: [E(`λ = 0 ; y = 0 ; x^2 = ${c}`, t('y = 0 : λx = 0 et x² = …'), 'case', 'cases'), E(listT(d.pts.slice(0, 2)), `x = ±${rd(xc)}`, 'points', 'list')] }, valueOf(d, d.vals[0], 5)], t('Cas y = 0 : résous, puis calcule f en ces points.'), 'y0'), points: 2, title: t('Cas y = 0') },
      { item: sub([{ start: `x = ${bl} ; y^2 = 2λx ; ${d.gText}`, judge: caseY1, lines: [E(`x = ${bl} ; y^2 = ${y2} ; 3x^2 = ${c}`, t('y² = 2λx = {y2}, puis la contrainte', { y2: y2.replace('^2', '²') }), 'case', 'subst'), E(listT(d.pts.slice(2)), `x = ±${rd(d.pts[2][0])}`, 'points', 'list')] }], t('Cas y ≠ 0 : la 2e équation donne x = {bl}. Résous.', { bl: rd(bl) }), 'y1'), points: 3, title: t('Cas y ≠ 0') },
      { item: sub(valueParts(d, 5).slice(1), t('Valeurs de f aux candidats du cas y ≠ 0 : en {p} :', { p: ptR(d.vals[2].p) }), 'val'), points: 1, title: t('Valeurs') },
      { item: sub(compareParts(d, 5), t('Conclus. Le maximum de f sur la courbe :'), 'cmp'), points: 2, title: t('Conclusion') },
    ],
    key: `${level}:${d.gText}:${m}`, exam: examTag(opts, 10), expectedSec: 900, fallback: !!d.fallback,
  });
}

// The system of E2 as a multiple choice (a step must end on a final line).
function systemMcq(d, level, rng) {
  const { b, c } = d;
  const show = (t) => SML(d.cfg, t);
  return mcq({
    skill: LG, level, prompt: t('Quel est le système de Lagrange ∇f = λ∇g, g = 0 ?'),
    options: [
      { html: show(d.lines[0].math), correct: true },
      { html: show(`y^2 = 2λx ; 2xy = ${cf(2 * b, 'λy')}`), correct: false, rule: 'a2_lagrange_no_constraint' },
      { html: show(`2xy = 2λx ; y^2 = ${cf(2 * b, 'λy')} ; ${gT(1, b, c)}`), correct: false },
      { html: show(`y^2 = 2λ ; 2xy = ${cf(2 * b, 'λ')} ; ${gT(1, b, c)}`), correct: false },
    ],
    key: `system:${d.gText}`, solution: [{ html: `∇f = (y² ; 2xy), ∇g = (2x ; ${2 * b}y) : ${show(d.lines[0].math)}`, note: '' }],
  }, rng);
}

// ---------- exam variants ----------

// 2019 Q2 / E2: statements about the extrema.
function lagMcq(level, rng, opts) {
  const d = lagrangeData(rng);
  const atN = (n) => ({ 1: t('f atteint son maximum sur la contrainte en exactement un point'), 2: t('f atteint son maximum sur la contrainte en exactement deux points'), 4: t('f atteint son maximum sur la contrainte en exactement quatre points') }[n]);
  const maxIs = (v) => t('Le maximum de f sur la contrainte vaut {v}', { v });
  const minIs = (v) => t('Le minimum de f sur la contrainte vaut {v}', { v });
  const right = rng.chance(0.5) || d.nMax === 1
    ? atN(d.nMax)
    : maxIs(rd(d.max));
  const wrongs = [];
  if (d.nMax > 1) wrongs.push({ html: atN(1), rule: 'a2_lagrange_count' });
  if (d.firstCase) wrongs.push({ html: minIs('0'), rule: 'a2_lagrange_no_compare' });
  wrongs.push({ html: maxIs(rd(d.offCurve.v)), rule: 'a2_lagrange_no_constraint' });
  wrongs.push({ html: t('f n\'atteint pas de maximum sur la contrainte'), rule: 'a2_compact_open' });
  const fillers = [
    { html: atN(d.nMax === 1 ? 2 : 4) },
    { html: minIs(rd(neg(d.min))) },
  ];
  return mcq4({
    skill: LG, level, prompt: t('Soit f(x, y) = {f} sur la courbe {g}. Laquelle de ces affirmations est vraie ?', { f: d.fML, g: d.gRead }),
    right, wrongs: rng.shuffle(wrongs), fillers, key: `mcq:${d.fT}:${d.gText}`, exam: examTag(opts, 3), expectedSec: 240, fallback: !!d.fallback,
    solution: [{ html: SML(d.cfg, d.lines[0].math), note: '' }, ...d.vals.map((x) => ({ html: `f${ptR(x.p)} = ${rd(x.v)}`, note: '' })), { html: t('max {M} en {pts} ; min {m}.', { M: rd(d.max), pts: andList(d.argmax.map((x) => ptR(x.p))), m: rd(d.min) }), note: '' }],
  }, rng);
}

function lagTf(level, rng, opts) {
  const kind = rng.pick(['false', 'false', 'true', 'point']);
  if (kind === 'false') {
    return tfItem({
      skill: LG, level, statement: t('Si ∇f(p) = λ∇g(p) et g(p) = 0, alors f a un extremum local en p sur la courbe g = 0.'), truth: false,
      counter: { kind: 'a2', prop: 'lagrangeNotExtremum', params: {}, ask: [{ v: 'f', label: 'f(x, y) =', keys: ['calc', 'a2'] }, { v: 'g', label: 'g(x, y) =', keys: ['calc', 'a2'] }], answer: { f: 'y^3', g: 'y-x' } },
      ruleIfTrue: 'a2_lagrange_no_compare', prompt: t('Vrai ou faux ? Si c\'est faux, donne f et g avec p = (0, 0) qui contredisent l\'énoncé.'),
      explanation: t('Faux : f = y³, g = y − x, p = (0, 0) : ∇f(0, 0) = 0 = 0·∇g, mais sur la courbe y = x, f = x³ change de signe : pas d\'extremum.'),
      key: `false:${rng.int(0, 9)}`, exam: examTag(opts), hints: H(t('Lagrange donne des candidats.'), t('Prends ∇f(p) = 0 avec une fonction impaire le long de la courbe.'), t('f = y³ et g = y − x.')),
    });
  }
  if (kind === 'true') {
    return tfItem({
      skill: LG, level, statement: t('Si la courbe g = 0 est compacte et ∇g ≠ 0 sur elle, et si f est C¹, alors f atteint son maximum sur la courbe en un point p où ∇f(p) = λ∇g(p) pour un certain λ.'), truth: true,
      explanation: t('Vrai : le maximum existe (compact), et en un extremum sur la courbe ∇f est normal à la courbe, donc parallèle à ∇g ≠ 0.'),
      key: 'true', exam: examTag(opts), hints: H(t('Le maximum existe-t-il ?'), t('En un extremum sur la courbe, ∇f est orthogonal à la tangente.'), t('∇g est aussi orthogonal à la tangente.')),
    });
  }
  const d = lagrangeData(rng);
  const p = rng.pick(d.vals);
  return tfItem({
    skill: LG, level, statement: t('Pour f(x, y) = {f} sous la contrainte {g}, le point {p} vérifie ∇f = λ∇g pour un certain λ.', { f: d.fML, g: d.gRead, p: ptR(p.p) }), truth: true,
    explanation: t('Vrai : c\'est une solution du système {s}.', { s: SML(d.cfg, d.lines[0].math) }), key: `pt:${d.fT}:${d.gText}:${p.p.join()}`, exam: examTag(opts),
    hints: H(t('Vérifie d\'abord que le point est sur la courbe.'), t('Calcule ∇f et ∇g au point.'), t('Ils sont parallèles.')),
  });
}

export function lagrange(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return lagMcq(4, rng, opts);
  if (opts.exam === 'tf') return lagTf(4, rng, opts);
  if (level === 5) return rng.chance(0.5) ? lagProblem(5, rng, opts) : lagMcq(5, rng, opts);
  return lagLines(level, rng, opts);
}

// ====================================================================
// a2-lagrange-3d
// ====================================================================

const L3_SUB = [
  { id: 'system', label: t('système de Lagrange'), skill: LG },
  { id: 'solve', label: t('résoudre'), skill: LG },
  { id: 'points', label: t('points'), skill: L3 },
  { id: 'compare', label: t('max et min'), skill: L3 },
  { id: 'matrix', label: t('matrice de la forme'), skill: 'l-sym-quadform' },
];
const L3_CHOICES = [
  { id: 'parallel', label: t('Le point est un multiple de ∇f') },
  { id: 'subst', label: t('Substituer dans la contrainte') },
  { id: 'list', label: t('Écrire les deux points') },
  { id: 'value', label: t('Calculer f en un point') },
  { id: 'matrix', label: t('Écrire la matrice A de la forme') },
  { id: 'charpoly', label: t('Polynôme caractéristique de A') },
  { id: 'eigen', label: t('Valeurs propres de A') },
  { id: 'compare', label: t('Max et min') },
  { id: 'lagrange4', label: t('Lagrange direct : 4 équations en x, y, z, λ'), rule: null, why: t('Possible, mais 4 équations non linéaires : avec f = xᵀAx, le système est Ax = λx, les valeurs propres donnent tout.') },
];

const DIRS = [[1, 2, 2, 3], [2, 1, 2, 3], [2, 2, 1, 3], [2, 3, 6, 7], [3, 6, 2, 7], [6, 2, 3, 7], [1, 4, 8, 9], [4, 8, 1, 9], [8, 1, 4, 9]];
function lin3Data(rng) {
  const [a0, b0, c0, n] = rng.pick(DIRS);
  const s = [rng.pick([1, -1]), rng.pick([1, -1]), rng.pick([1, -1])];
  const v = [a0 * s[0], b0 * s[1], c0 * s[2]];
  const t = rng.pick([1, 1, 2]);
  const R = n * t;
  const P = v.map((x) => x * t);
  const fT = ptxtLin(v);
  return { v, n, t, R, P, fT, max: R * n, min: -R * n };
}
function ptxtLin(v) {
  const names = ['x', 'y', 'z'];
  return v.map((c, i) => `${i ? (c > 0 ? '+' : '-') : c < 0 ? '-' : ''}${Math.abs(c) === 1 ? '' : Math.abs(c)}${names[i]}`).join('');
}
const p3 = (p) => `(${p.join(' ; ')})`;

function lin3Lines(level, rng, opts) {
  const d = lin3Data(rng);
  const [a, b, c] = d.v;
  const R2 = d.R * d.R;
  const g = `x^2+y^2+z^2 = ${R2}`;
  const cfg = sysCfg(XYZ, [d.P.map(String), d.P.map((x) => String(-x))], { grid: 4 });
  const ry = q(b, a);
  const rz = q(c, a);
  const fx = (r) => (r.eq(1) ? 'x' : r.eq(-1) ? '-x' : r.d === 1 ? `${r}x` : r.n < 0 ? `-(${r.neg()})x` : `(${r})x`);
  const k2 = q(d.n * d.n, a * a);
  const k2T = k2.d === 1 ? `${k2}x^2` : `(${k2})x^2`;
  const lines = [
    E(`y = ${fx(ry)} ; z = ${fx(rz)} ; ${g}`, t('{v} = 2λ(x ; y ; z) : le point est un multiple de ∇f', { v: rd(`(${a} ; ${b} ; ${c})`) }), 'system', 'parallel'),
    E(`y = ${fx(ry)} ; z = ${fx(rz)} ; ${k2T} = ${R2}`, t('Substituer dans la contrainte'), 'solve', 'subst'),
    E(`${p3(d.P)}, ${p3(d.P.map((x) => -x))}`, `x = ±${d.P[0] < 0 ? -d.P[0] : d.P[0]}`, 'points', 'list'),
  ];
  const parts = [];
  if (level === 1) {
    parts.push({ start: lines[1].math, judge: cfg, lines: [lines[2]] });
  } else {
    parts.push({ start: g, judge: cfg, lines });
  }
  const valPart = (P, sign) => {
    const l = E(String(sign * d.R * d.n), `f${rd(p3(P))}`, 'compare', 'value');
    return {
      html: t('Valeur de f en {p} :', { p: rd(p3(P)) }), ask: 'f =', start: substT(d.fT, { x: String(P[0]), y: String(P[1]), z: String(P[2]) }, XYZ), judge: { kind: 'value' },
      lines: [level === 1 ? blanked(l, [String(d.R * d.n)], { vars: [] }) : l],
    };
  };
  parts.push(valPart(d.P, 1), valPart(d.P.map((x) => -x), -1));
  parts.push({ html: t('Le maximum de f sur la sphère :'), ask: 'max f =', start: 'M', judge: { kind: 'value', expect: String(d.max) }, lines: [E(String(d.max), t('La plus grande valeur'), 'compare', 'compare')] });
  parts.push({ html: t('Le minimum :'), ask: 'min f =', start: 'm', judge: { kind: 'value', expect: String(d.min) }, lines: [E(String(d.min), t('La plus petite'), 'compare', 'compare')] });
  const first = level === 1 ? t('On a déjà {s}. Écris les deux points :', { s: SML(cfg, lines[1].math) }) : t('Écris le système en x, y, z (le point est un multiple de ∇f), puis résous :');
  return partsLines({
    skill: L3, level, parts, choices: L3_CHOICES.filter((x) => ['parallel', 'subst', 'list', 'value', 'compare'].includes(x.id)),
    prompt: `${t('Trouve le maximum et le minimum de f(x, y, z) = {f} sur la sphère x² + y² + z² = {R2}. ∇f = ({a} ; {b} ; {c}) = 2λ(x ; y ; z).', { f: MT(d.fT, { vars: XYZ }), R2, a: rd(a), b: rd(b), c: rd(c) })}<br>${first}`,
    hints: H(t('Le point est un multiple de ∇f : (x ; y ; z) = t·∇f.'), t('(x ; y ; z) = t({a} ; {b} ; {c}) avec {n2}t² = {R2}.', { a: rd(a), b: rd(b), c: rd(c), n2: d.n * d.n, R2 }), t('Points ±{p} ; f = ±{v}.', { p: rd(p3(d.P)), v: d.R * d.n })),
    subgoals: L3_SUB, keys: ['calcx', 'calcfn', 'a2'], key: `${L3}:${level}:${d.fT}:${d.R}`, exam: examTag(opts),
  });
}

// f = xᵀAx: a·xy + b·yz (2021 Q2), or s(x² + y²) + 2t·xy + w·z².
function quadData(rng) {
  if (rng.chance(0.6)) {
    const [p, r] = rng.pick([[1, 2], [2, 1], [3, 4], [4, 3], [1, 1], [2, 2], [1, 3], [2, 4]]);
    const A = [[0, q(p, 2), 0], [q(p, 2), 0, q(r, 2)], [0, q(r, 2), 0]];
    const D = [[0, p, 0], [p, 0, r], [0, r, 0]];
    const L = q(p * p + r * r, 4);
    const top = rootT(L);
    return {
      kind: 'cross', fT: `${cf(p, 'xy')}+${cf(r, 'yz')}`, A, D,
      charT: `-λ^3+${L.d === 1 ? L : `(${L})`}λ`, charF: `-λ(λ^2-${L})`, target: 'expanded', eig: ['0', top, `-${top}`], max: top, min: `-${top}`,
      half: rootT(q(p * p + r * r)), // eigenvalues with the off-diagonal entries doubled
    };
  }
  for (;;) {
    const s = rng.int(1, 3);
    const t = rng.pick([1, 2, -1, -2]);
    const w = rng.pick([-2, -1, 1, 2, 3, 4]);
    const e = [s + t, s - t, w];
    if (new Set(e).size < 3 || e.includes(0)) continue;
    const A = [[s, t, 0], [t, s, 0], [0, 0, w]];
    const D = [[s, 2 * t, 0], [2 * t, s, 0], [0, 0, w]];
    const fT = `${cf(s, 'x^2')}${t > 0 ? '+' : '-'}${cf(Math.abs(2 * t), 'xy')}+${cf(s, 'y^2')}${w > 0 ? '+' : '-'}${cf(Math.abs(w), 'z^2')}`;
    const fac = (k) => (k === 0 ? 'λ' : `(${k}-λ)`);
    const charT = `${fac(w)}${fac(s - t)}${fac(s + t)}`;
    return {
      kind: 'block', fT, A, D, charT, charF: charT, target: 'factored', eig: e.map(String), max: String(Math.max(...e)), min: String(Math.min(...e)),
      half: String(Math.max(s + 2 * t, s - 2 * t, w)),
    };
  }
}
const qm = (A) => `[[${A.map((r) => r.map((x) => String(x)).join(',')).join('],[')}]]`;

function quadLines(level, rng, opts) {
  const d = quadData(rng);
  const parts = [
    {
      start: 'A = ?', judge: { kind: 'mat', expect: qm(d.A), a2quad: { doubled: qm(d.D) } },
      pre: level === 3 ? [{
        kind: 'decision', prompt: t('Quelle méthode pour les extrema de xᵀAx sur la sphère unité ?'), options: [
          { id: 'eig', label: t('Les valeurs propres de A : Ax = λx et f = λ aux points trouvés'), valid: true },
          { id: 'lag', label: t('Lagrange direct : 4 équations en x, y, z, λ'), valid: true, quality: 'poor', why: t('Juste, mais 4 équations non linéaires : c\'est le système Ax = λx, autant prendre les valeurs propres.') },
        ],
      }] : [],
      lines: [E(qm(d.A), t('Chaque terme croisé se partage en deux cases : aᵢⱼ = aⱼᵢ = coefficient/2'), 'matrix', 'matrix')],
    },
    {
      html: t('Le polynôme caractéristique de A :'), ask: 'det(A − λI) =', start: 'det(A-λI)', judge: { kind: 'det', vars: ['λ'], names: { A: qm(d.A) }, target: d.target },
      lines: [E(d.charT, d.kind === 'block' ? t('Bloc 2 × 2 et case z : factoriser') : t('Développer selon une ligne'), 'solve', 'charpoly')],
    },
    {
      html: t('Ses racines, les valeurs propres de A :'), ask: '⇔', start: `${d.charT} = 0`, judge: sysCfg(['λ'], d.eig.map((x) => [x])),
      lines: [
        ...(d.charF !== d.charT ? [E(`${d.charF} = 0`, t('Mettre λ en facteur'), 'solve', 'eigen')] : []),
        E(d.eig.map((x) => `λ = ${x}`).join(' ou '), t('Racines'), 'solve', 'eigen'),
      ],
    },
    {
      html: t('Sur la sphère unité, f = xᵀAx a pour maximum la plus grande valeur propre :'), ask: 'max f =', start: 'M', judge: { kind: 'value', expect: d.max, form: 'exact' },
      lines: [E(d.max, t('La plus grande valeur propre'), 'compare', 'compare')],
    },
    {
      html: t('Le minimum :'), ask: 'min f =', start: 'm', judge: { kind: 'value', expect: d.min, form: 'exact' },
      lines: [E(d.min, t('La plus petite valeur propre'), 'compare', 'compare')],
    },
  ];
  if (level === 1) parts[0].lines[0] = { ...parts[0].lines[0], cells: d.kind === 'cross' ? [[0, 1], [1, 2]] : [[0, 1], [1, 0]] };
  return partsLines({
    skill: L3, level, parts, choices: L3_CHOICES.filter((x) => ['matrix', 'charpoly', 'eigen', 'compare', 'lagrange4'].includes(x.id)),
    prompt: t('Trouve le maximum et le minimum de f(x, y, z) = {f} sur la sphère unité x² + y² + z² = 1. Écris d\'abord la matrice symétrique A telle que f = xᵀAx :', { f: MT(d.fT, { vars: XYZ }) }),
    hints: H(t('f = xᵀAx avec A symétrique : un terme c·xy donne a₁₂ = a₂₁ = c/2. Puis les valeurs propres de A.'), `A = ${SML({ kind: 'mat' }, qm(d.A))}`, t('Valeurs propres {e} : max {M}, min {m}.', { e: d.eig.map(rd).join(', '), M: rd(d.max), m: rd(d.min) })),
    subgoals: L3_SUB, keys: ['calcx', 'calcfn', 'a2', 'mat'], key: `${L3}:${level}:${d.fT}`, exam: examTag(opts),
  });
}

// 2021 Q2: the maximum of xᵀAx on the unit sphere.
function quadMcq(level, rng, opts) {
  const d = quadData(rng);
  const wrongs = [
    { html: rd(d.half), rule: 'a2_quadform_matrix_half' },
    { html: rd(d.min) },
    { html: d.kind === 'cross' ? rd(String(q(1, 2))) : rd(String(Number(d.max) + 1)) },
  ];
  const fillers = [{ html: '1' }, { html: '0' }, { html: rd(d.eig[0] === d.max ? d.eig[1] : d.eig[0]) }];
  return mcq4({
    skill: L3, level, prompt: t('Le maximum de f(x, y, z) = {f} sur la sphère unité x² + y² + z² = 1 vaut :', { f: MT(d.fT, { vars: XYZ }) }),
    right: rd(d.max), wrongs, fillers, key: `mcq:${d.fT}`, exam: examTag(opts, 3), expectedSec: 180,
    solution: [{ html: `A = ${SML({ kind: 'mat' }, qm(d.A))}, det(A − λI) = ${MT(d.charF, { vars: ['λ'] })}`, note: '' }, { html: t('Valeurs propres {e} : le maximum est {M}.', { e: d.eig.map(rd).join(', '), M: rd(d.max) }), note: '' }],
  }, rng);
}

export function lagrange3d(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq' || level === 5) return quadMcq(opts.exam ? 4 : level, rng, opts);
  if (level <= 2) return lin3Lines(level, rng, opts);
  if (level === 3) return rng.chance(0.5) ? lin3Lines(level, rng, opts) : quadLines(level, rng, opts);
  return quadLines(level, rng, opts);
}


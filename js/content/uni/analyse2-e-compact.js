// Generators of module A2, part e (step U6): absolute extrema on a compact
// set, boundary included. Catalogue: docs/universite/A2-analyse-2.md,
// `a2-extrema-compact`, and the exam example E3 (half disc).
//
// Domains: the disc x² + y² ≤ R² with f = ax² + by² + cx (on the circle,
// y² = R² − x² gives a polynomial in x on [−R ; R]); the half disc
// x² + y² ≤ R², y ≥ 0 with f = ax² + by² + ey (E3: the segment y = 0, the
// arc with x² = R² − y², y ∈ [0 ; R], and the corners (±R, 0)). Every
// value is rational; the points of the arc may have a root (±√3, 1).

import {
  q, XY, poly, pat, ptxt, N, rd, rootT, substT, sysCfg, partsLines, mcq4, vfMcq, tfItem, problemItem, mcq,
  H, E, MT, blanked, examTag,
} from './analyse2-e-kit.js';
import { t } from '../../i18n.js';

export const EC = 'a2-extrema-compact';

const EC_SUB = [
  { id: 'interior', label: t('points stationnaires intérieurs'), skill: 'a2-crit-points' },
  { id: 'boundary', label: t('restriction au bord'), skill: 'a1-extrema-global' },
  { id: 'boundary-crit', label: t('points critiques du bord'), skill: 'a1-extrema-global' },
  { id: 'corners', label: t('extrémités et coins'), skill: 'a1-extrema-global' },
  { id: 'compare', label: t('comparer les valeurs'), skill: EC },
];
const EC_CHOICES = [
  { id: 'interior', label: t('Résoudre ∇f = 0 à l\'intérieur') },
  { id: 'value', label: t('Calculer la valeur de f en un candidat') },
  { id: 'restrict', label: t('Restreindre f à un morceau du bord') },
  { id: 'crit', label: t('Annuler la dérivée de la restriction') },
  { id: 'ends', label: t('Valeur aux extrémités (coins)') },
  { id: 'compare', label: t('Comparer toutes les valeurs') },
  { id: 'hessian', label: t('Classer le point intérieur avec la hessienne'), rule: 'a2_compact_boundary_forgot', why: t('Inutile ici : sur un compact on compare des valeurs, et le max peut être sur le bord.') },
  { id: 'skipends', label: t('Passer au morceau suivant sans les extrémités'), rule: 'a2_compact_corner_forgot', why: t('Les extrémités d\'un morceau du bord sont des candidats, comme a et b sur [a ; b].') },
];

const lin = (a, v) => (a === 1 ? v : a === -1 ? `-${v}` : `${a}${v}`);
// Coordinates of a candidate: texts of the CAS.
const P = (x, y) => [String(x), String(y)];
const ptR2 = (p) => rd(`(${p[0]} ; ${p[1]})`);

function sumT(terms) {
  const out = terms.filter(([c]) => c !== 0).map(([c, m], i) => {
    const s = q(c);
    const abs = s.n < 0 ? s.neg() : s;
    const sign = s.n < 0 ? '-' : i ? '+' : '';
    if (!m) return `${sign}${abs}`;
    const body = abs.eq(1) ? '' : abs.d === 1 ? String(abs) : `(${abs})`;
    return `${sign}${body}${m}`;
  });
  return out.join('') || '0';
}

// ---------- data ----------

function discData(rng) {
  for (let i = 0; i < 300; i++) {
    const R = rng.pick([1, 2, 2, 3]);
    const a = rng.pick([-3, -2, -1, 1, 2, 3]);
    const b = rng.pick([-3, -2, -1, 1, 2, 3]);
    if (a === b) continue;
    const x0 = rng.int(-R + 1, R - 1);
    const c = -2 * a * x0;
    const xs = q(-c, 2 * (a - b));
    if (xs.d > 2 || Math.abs(Number(xs)) >= R) continue;
    const ys2 = q(R * R).sub(xs.mul(xs));
    const f = poly([[a, [2, 0]], [b, [0, 2]], [c, [1, 0]]]);
    const g = (x) => q(a - b).mul(q(x).mul(q(x))).add(q(c).mul(q(x))).add(q(b * R * R));
    const yT = rootT(ys2);
    const cands = [
      { key: 'int', p: P(x0, 0), v: pat(f, [q(x0), q(0)]), kind: 'interior' },
      { key: 'arc', p: P(xs, yT), v: g(xs), kind: 'boundary', twin: P(xs, `-${yT}`) },
      { key: 'arc2', p: P(xs, `-${yT}`), v: g(xs), kind: 'boundary' },
      { key: 'endR', p: P(R, 0), v: g(R), kind: 'ends' },
      { key: 'endL', p: P(-R, 0), v: g(-R), kind: 'ends' },
    ];
    const vals = cands.map((x) => Number(x.v));
    if (Math.max(...vals) === Math.min(...vals)) continue;
    return { dom: 'disc', R, a, b, c, x0, xs, ys2, yT, f, fT: ptxt(f, XY), cands, gT: sumT([[a - b, 'x^2'], [c, 'x'], [b * R * R, '']]) };
  }
  return null;
}

function halfData(rng) {
  for (let i = 0; i < 300; i++) {
    const R = rng.pick([2, 2, 3]);
    const a = rng.pick([-3, -2, -1, 1, 2, 3]);
    const b = rng.pick([-3, -2, -1, 1, 2, 3]);
    if (a === b) continue;
    const y0 = rng.int(1, R - 1);
    const e = -2 * b * y0;
    const ys = q(-e, 2 * (b - a));
    const inside = Number(ys) > 0 && Number(ys) < R;
    if (inside && ys.d > 2) continue;
    const f = poly([[a, [2, 0]], [b, [0, 2]], [e, [0, 1]]]);
    const g = (y) => q(b - a).mul(q(y).mul(q(y))).add(q(e).mul(q(y))).add(q(a * R * R));
    const cands = [
      { key: 'int', p: P(0, y0), v: pat(f, [q(0), q(y0)]), kind: 'interior' },
      { key: 'seg', p: P(0, 0), v: q(0), kind: 'boundary' },
      { key: 'cR', p: P(R, 0), v: q(a * R * R), kind: 'corner' },
      { key: 'cL', p: P(-R, 0), v: q(a * R * R), kind: 'corner' },
      { key: 'top', p: P(0, R), v: g(R), kind: 'ends' },
    ];
    let xT = null;
    if (inside) {
      xT = rootT(q(R * R).sub(ys.mul(ys)));
      cands.push({ key: 'arc', p: P(xT, ys), v: g(ys), kind: 'boundary' }, { key: 'arc2', p: P(`-${xT}`, ys), v: g(ys), kind: 'boundary' });
    }
    const vals = cands.map((x) => Number(x.v));
    if (Math.max(...vals) === Math.min(...vals)) continue;
    return { dom: 'half', R, a, b, e, y0, ys, inside, xT, f, fT: ptxt(f, XY), cands, gT: sumT([[b - a, 'y^2'], [e, 'y'], [a * R * R, '']]) };
  }
  return null;
}

// E3 of the catalogue: 2x² + y² − 2y on the half disc of radius 2.
const E3 = () => {
  const R = 2;
  const f = poly([[2, [2, 0]], [1, [0, 2]], [-2, [0, 1]]]);
  return {
    dom: 'half', R, a: 2, b: 1, e: -2, y0: 1, ys: q(-1), inside: false, xT: null, f, fT: ptxt(f, XY), gT: '-y^2-2y+8',
    cands: [
      { key: 'int', p: P(0, 1), v: q(-1), kind: 'interior' }, { key: 'seg', p: P(0, 0), v: q(0), kind: 'boundary' },
      { key: 'cR', p: P(2, 0), v: q(8), kind: 'corner' }, { key: 'cL', p: P(-2, 0), v: q(8), kind: 'corner' }, { key: 'top', p: P(0, 2), v: q(0), kind: 'ends' },
    ],
  };
};

export function compactData(rng, dom = rng.pick(['disc', 'half', 'half'])) {
  const d = (dom === 'disc' ? discData(rng) : halfData(rng)) || { ...E3(), fallback: true };
  const vals = d.cands.map((x) => Number(x.v));
  d.max = Math.max(...vals);
  d.min = Math.min(...vals);
  d.maxQ = d.cands.find((x) => Number(x.v) === d.max).v;
  d.minQ = d.cands.find((x) => Number(x.v) === d.min).v;
  d.argmax = d.cands.filter((x) => Number(x.v) === d.max);
  d.argmin = d.cands.filter((x) => Number(x.v) === d.min);
  d.D = d.dom === 'disc' ? `x² + y² ≤ ${d.R * d.R}` : `x² + y² ≤ ${d.R * d.R}, y ≥ 0`;
  return d;
}

const val = (d, key) => d.cands.find((x) => x.key === key);
const env = (p) => ({ x: p[0], y: p[1] });
const valuePart = (d, c, html, sub, act, level, extra = {}) => {
  const l = E(N(c.v), `f${ptR2(c.p)}`, sub, act);
  return {
    html, ask: 'f =', start: substT(d.fT, env(c.p), XY), judge: { kind: 'value' },
    lines: [level === 1 ? blanked(l, [N(c.v)], { vars: XY }) : l], ...extra,
  };
};

// ---------- the parts ----------

function interiorParts(d, level) {
  const p0 = val(d, 'int');
  const cfg = sysCfg(XY, [p0.p]);
  const g = [ptxt(poly([[2 * d.a, [1, 0]], [d.c ?? 0, [0, 0]]]), XY), ptxt(poly([[2 * d.b, [0, 1]], [d.e ?? 0, [0, 0]]]), XY)];
  const parts = [];
  if (level >= 2) {
    parts.push({
      html: '', start: `${g[0]} = 0 ; ${g[1]} = 0`, judge: cfg,
      lines: [E(`(${p0.p[0]} ; ${p0.p[1]})`, t('∇f = ({a} ; {b}) = 0 : un point, intérieur à D', { a: rd(g[0]), b: rd(g[1]) }), 'interior', 'interior')],
    });
  }
  parts.push(valuePart(d, p0, t('Valeur de f au point intérieur {p} :', { p: ptR2(p0.p) }), 'interior', 'value', level));
  return parts;
}

function choiceDecision(prompt, rightLabel, wrongs) {
  return {
    kind: 'decision', prompt, options: [
      { id: 'ok', label: rightLabel, valid: true },
      ...wrongs.map((w, i) => ({ id: `w${i}`, label: w.label, valid: false, why: w.why, ...(w.rule ? { rule: w.rule } : {}) })),
    ],
  };
}

function discParts(d, level) {
  const R2 = d.R * d.R;
  const arc = val(d, 'arc');
  const parts = [];
  const restrict = `${lin(d.a, 'x^2')}+${d.b === 1 ? '' : d.b === -1 ? '-' : d.b}(${R2}-x^2)${d.c ? `${d.c > 0 ? '+' : ''}${lin(d.c, 'x')}` : ''}`.replace('+-', '-');
  if (level >= 2) {
    parts.push({
      html: t('Bord : y² = {R2} − x², avec x ∈ [−{R} ; {R}]. Restriction de f :', { R2, R: d.R }), ask: 'f =', start: restrict, judge: { kind: 'equiv', vars: ['x'], target: 'expanded' },
      lines: [E(d.gT, t('Remplacer y² et développer'), 'boundary', 'restrict')],
    });
    parts.push({
      html: t('Point critique de la restriction :'), ask: '⇔', start: `${sumT([[2 * (d.a - d.b), 'x'], [d.c, '']])} = 0`, judge: sysCfg(['x'], [[String(d.xs)]]),
      lines: [E(`x = ${d.xs}`, t('Dérivée nulle'), 'boundary-crit', 'crit')],
    });
  }
  parts.push(valuePart(d, arc, t('En x = {x}, y = ±{y} : valeur de f en {p} (et en son symétrique)', { x: rd(String(d.xs)), y: rd(d.yT), p: ptR2(arc.p) }), 'boundary-crit', 'value', level));
  parts.push(valuePart(d, val(d, 'endR'), t('Extrémité x = {R} de l\'intervalle : point ({R} ; 0)', { R: d.R }), 'corners', 'ends', level));
  parts.push(valuePart(d, val(d, 'endL'), t('Extrémité x = −{R} : point (−{R} ; 0)', { R: d.R }), 'corners', 'ends', level));
  return parts;
}

function halfParts(d, level) {
  const R2 = d.R * d.R;
  const parts = [];
  // The segment y = 0.
  if (level >= 2) {
    parts.push({
      html: t('Segment y = 0, x ∈ [−{R} ; {R}] : restriction de f.', { R: d.R }), ask: 'f =', start: substT(d.fT, { y: '0' }, XY), judge: { kind: 'equiv', vars: ['x'], target: 'expanded' },
      lines: [E(lin(d.a, 'x^2'), t('Remplacer y par 0'), 'boundary', 'restrict')],
    });
  }
  parts.push(valuePart(d, val(d, 'seg'), t('Sur le segment, la dérivée s\'annule en x = 0 : valeur de f en (0 ; 0)'), 'boundary-crit', 'value', level));
  parts.push(valuePart(d, val(d, 'cR'), t('Coins (±{R} ; 0) : valeur de f en ({R} ; 0) (la même en (−{R} ; 0))', { R: d.R }), 'corners', 'ends', level));
  // The arc: x² = R² − y², y ∈ [0 ; R].
  const restrict = `${d.a === 1 ? '' : d.a === -1 ? '-' : d.a}(${R2}-y^2)${d.b > 0 ? '+' : '-'}${Math.abs(d.b) === 1 ? '' : Math.abs(d.b)}y^2${d.e > 0 ? '+' : '-'}${Math.abs(d.e) === 1 ? '' : Math.abs(d.e)}y`;
  const ysT = String(d.ys);
  if (level >= 2) {
    parts.push({
      html: t('Arc : x² = {R2} − y², avec y ∈ [0 ; {R}]. Restriction de f :', { R2, R: d.R }), ask: 'f =', start: restrict, judge: { kind: 'equiv', vars: ['y'], target: 'expanded' },
      lines: [E(d.gT, t('Remplacer x² et développer'), 'boundary', 'restrict')],
    });
    parts.push({
      html: t('Point critique de la restriction :'), ask: '⇔', start: `${sumT([[2 * (d.b - d.a), 'y'], [d.e, '']])} = 0`, judge: sysCfg(['y'], [[ysT]]),
      lines: [E(`y = ${ysT}`, t('Dérivée nulle'), 'boundary-crit', 'crit')],
    });
  }
  const arcDecision = choiceDecision(t('y = {y} est-il sur l\'arc (0 ≤ y ≤ {R}) ?', { y: rd(ysT), R: d.R }),
    d.inside ? t('Oui : il donne les points (±{x} ; {y})', { x: rd(d.xT), y: rd(ysT) }) : t('Non : l\'arc n\'a pas de point critique à l\'intérieur'),
    [{ label: d.inside ? t('Non : on l\'écarte') : t('Oui : on le garde comme candidat'), why: d.inside ? t('0 < {y} < {R} : le point est sur l\'arc.', { y: rd(ysT), R: d.R }) : t('{y} n\'est pas dans [0 ; {R}] : ce point n\'est pas sur l\'arc.', { y: rd(ysT), R: d.R }) }]);
  if (d.inside) parts.push(valuePart(d, val(d, 'arc'), t('Point critique de l\'arc {p} (et son symétrique)', { p: ptR2(val(d, 'arc').p) }), 'boundary-crit', 'value', level, { pre: level >= 2 ? [arcDecision] : [] }));
  parts.push(valuePart(d, val(d, 'top'), t('Extrémité y = {R} de l\'arc : point (0 ; {R})', { R: d.R }), 'corners', 'ends', level, { pre: level >= 2 && !d.inside ? [arcDecision] : [] }));
  return parts;
}

const listPts = (cs) => cs.map((x) => ptR2(x.p)).join(t(' et '));

function compareParts(d) {
  const wrongPts = (which) => {
    const arg = which === 'max' ? d.argmax : d.argmin;
    const out = [];
    if (arg.length > 1) out.push({ label: t('En {p} seulement', { p: ptR2(arg[0].p) }), why: t('f a la même valeur en {pts} : il y a {n} points.', { pts: listPts(arg), n: arg.length }) });
    const other = d.cands.find((x) => !arg.includes(x) && x.kind === 'interior') || d.cands.find((x) => !arg.includes(x));
    out.push({ label: t('En {p}', { p: ptR2(other.p) }), why: t('f{p} = {v} ; compare avec les autres valeurs.', { p: ptR2(other.p), v: rd(N(other.v)) }), rule: which === 'max' && other.kind === 'interior' ? 'a2_compact_boundary_forgot' : null });
    return out;
  };
  return [
    {
      html: t('Comparer toutes les valeurs : le maximum absolu.'), ask: 'max f =', start: 'M', judge: { kind: 'value', expect: N(d.maxQ) },
      pre: [choiceDecision(t('Où le maximum absolu est-il atteint ?'), t('En {p}', { p: listPts(d.argmax) }), wrongPts('max'))],
      lines: [E(N(d.maxQ), t('La plus grande valeur'), 'compare', 'compare')],
    },
    {
      html: t('Le minimum absolu.'), ask: 'min f =', start: 'm', judge: { kind: 'value', expect: N(d.minQ) },
      pre: [choiceDecision(t('Où le minimum absolu est-il atteint ?'), t('En {p}', { p: listPts(d.argmin) }), wrongPts('min'))],
      lines: [E(N(d.minQ), t('La plus petite valeur'), 'compare', 'compare')],
    },
  ];
}

const domText = (d) => (d.dom === 'disc' ? t('le disque D = {{s}}', { s: `x² + y² ≤ ${d.R * d.R}` }) : t('le demi-disque D = {{s}, y ≥ 0}', { s: `x² + y² ≤ ${d.R * d.R}` }));
function candTable(d) {
  return d.cands.filter((x) => x.key !== 'arc2' && x.key !== 'cL').map((x) => ptR2(x.p)).join(', ');
}

function compactLines(level, rng, opts) {
  const d = compactData(rng);
  const parts = [...interiorParts(d, level), ...(d.dom === 'disc' ? discParts(d, level) : halfParts(d, level)), ...compareParts(d)];
  const fML = MT(d.fT, { vars: XY });
  const given = level === 1 ? t('<br>Candidats (un par symétrie) : {c}. Calcule f en chacun, puis compare.', { c: candTable(d) }) : level === 2 ? t('<br>Candidats : le point stationnaire intérieur, les points critiques de f sur chaque morceau du bord (paramétré comme indiqué), les extrémités des morceaux.') : '';
  const first = level === 1 ? t('Valeur de f en {p} :', { p: ptR2(val(d, 'int').p) }) : t('Résous ∇f = 0 :');
  const acts = [...new Set(parts.flatMap((p) => p.lines.map((l) => l.act)))];
  return partsLines({
    skill: EC, level, parts, choices: EC_CHOICES.filter((c) => acts.includes(c.id) || c.rule),
    prompt: `${t('Trouve le maximum et le minimum absolus de f(x, y) = {f} sur {D}.', { f: fML, D: domText(d) })}${given}<br>${first}`,
    hints: H(t('Candidats : points stationnaires intérieurs, points critiques sur chaque morceau du bord, extrémités des morceaux. Puis compare les valeurs.'),
      d.dom === 'disc' ? t('Sur le bord, remplace y² par {R2} − x² : f = {g}, x ∈ [−{R} ; {R}].', { R2: d.R * d.R, g: MT(d.gT, { vars: ['x'] }), R: d.R }) : t('Sur l\'arc, remplace x² par {R2} − y² : f = {g}, y ∈ [0 ; {R}].', { R2: d.R * d.R, g: MT(d.gT, { vars: ['y'] }), R: d.R }),
      t('max f = {M} en {pM} ; min f = {m} en {pm}.', { M: rd(N(d.maxQ)), pM: listPts(d.argmax), m: rd(N(d.minQ)), pm: listPts(d.argmin) })),
    subgoals: EC_SUB, key: `${EC}:${level}:${d.dom}:${d.R}:${d.fT}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// ---------- level 5: the problem E3 ----------

function compactProblem(level, rng, opts) {
  const d = compactData(rng, 'half');
  const fML = MT(d.fT, { vars: XY });
  const L = 5;
  const sub = (parts, prompt, k) => partsLines({ skill: EC, level, parts, choices: [], hints: [], noHints: true, prompt, subgoals: EC_SUB, key: `${EC}:5:${k}:${d.fT}:${d.R}` });
  const hp = halfParts(d, L);
  const seg = hp.slice(0, 2);
  const corners = [hp[2]];
  const arc = hp.slice(3);
  const exist = mcq({
    skill: EC, level, prompt: t('Pourquoi f atteint-elle un maximum et un minimum absolus sur D ?'), keepOrder: false,
    options: [
      { html: t('D est fermé et borné (compact) et f est continue'), correct: true },
      { html: t('f est un polynôme, donc bornée sur ℝ²'), correct: false },
      { html: t('f a un point stationnaire dans D'), correct: false, rule: 'a2_stationary_is_extremum' },
      { html: t('D est borné'), correct: false, rule: 'a2_compact_open' },
    ],
    key: `exist:${d.fT}`, solution: [{ html: t('Théorème des bornes atteintes : f continue sur un compact non vide.'), note: '' }],
  }, rng);
  return problemItem({
    skill: EC, level, prompt: t('Trouve le maximum et le minimum absolus de f(x, y) = {f} sur {D}.', { f: fML, D: domText(d) }),
    parts: [
      { item: exist, points: 0.5, title: t('Existence') },
      { item: sub(interiorParts(d, L), t('Points stationnaires intérieurs. Résous ∇f = 0 :'), 'int'), points: 2, title: t('Intérieur') },
      { item: sub(seg, t('Segment y = 0, x ∈ [−{R} ; {R}]. Restriction de f :', { R: d.R }), 'seg'), points: 2, title: t('Segment') },
      { item: sub(arc, t('Arc x² + y² = {R2}, y ∈ [0 ; {R}] : x² = {R2} − y². Restriction de f :', { R2: d.R * d.R, R: d.R }), 'arc'), points: 3, title: t('Arc') },
      { item: sub(corners, t('Coins (±{R} ; 0). Valeur de f en ({R} ; 0) :', { R: d.R }), 'corners'), points: 1, title: t('Coins') },
      { item: sub(compareParts(d), t('Compare toutes les valeurs. Le maximum absolu :'), 'cmp'), points: 1.5, title: t('Comparaison') },
    ],
    key: `${level}:${d.fT}:${d.R}`, exam: examTag(opts, 10), expectedSec: 900, fallback: !!d.fallback,
  });
}

// ---------- exam variants ----------

// The QCM version of E3: « le maximum (minimum) absolu vaut … ».
function compactMcq(level, rng, opts) {
  const d = compactData(rng, rng.pick(['half', 'half', 'disc']));
  const which = rng.pick(['max', 'max', 'min']);
  const pick = (cs) => (which === 'max' ? Math.max(...cs.map((x) => Number(x.v))) : Math.min(...cs.map((x) => Number(x.v))));
  const qOf = (num) => d.cands.find((x) => Number(x.v) === num).v;
  const vaut = (v) => (which === 'max' ? t('Le maximum absolu de f sur D vaut {v}', { v }) : t('Le minimum absolu de f sur D vaut {v}', { v }));
  const right = qOf(which === 'max' ? d.max : d.min);
  const noCorner = d.cands.filter((x) => x.kind !== 'corner' && x.kind !== 'ends');
  const wrongs = [
    { html: vaut(rd(N(qOf(pick(noCorner))))), rule: 'a2_compact_corner_forgot' },
    { html: vaut(rd(N(val(d, 'int').v))), rule: 'a2_compact_boundary_forgot' },
    { html: which === 'max' ? t('f n\'a pas de maximum absolu sur D') : t('f n\'a pas de minimum absolu sur D'), rule: 'a2_compact_open' },
  ];
  const fillers = [...new Set(d.cands.map((x) => N(x.v)))].map((v) => ({ html: vaut(rd(v)) }));
  return mcq4({
    skill: EC, level, prompt: t('Soit f(x, y) = {f} sur {D}. Laquelle de ces affirmations est vraie ?', { f: MT(d.fT, { vars: XY }), D: domText(d) }),
    right: vaut(rd(N(right))), wrongs, fillers,
    key: `mcq:${d.dom}:${d.R}:${d.fT}:${which}`, exam: examTag(opts, 3), expectedSec: 240, fallback: !!d.fallback,
    solution: d.cands.map((x) => ({ html: `f${ptR2(x.p)} = ${rd(N(x.v))}`, note: x.kind === 'interior' ? t('intérieur') : x.kind === 'boundary' ? t('bord') : t('extrémité') })),
  }, rng);
}

function compactTf(level, rng, opts) {
  const kind = rng.pick(['compact', 'bounded', 'grad', 'interior']);
  if (kind === 'compact') {
    return tfItem({
      skill: EC, level, statement: t('Si D ⊂ ℝ² est compact et non vide, et f : D → ℝ est continue, alors f atteint son maximum sur D.'), truth: true,
      explanation: t('Vrai : c\'est le théorème des bornes atteintes (Weierstrass).'), key: 'compact', exam: examTag(opts),
      hints: H(t('Compact = fermé et borné.'), t('f continue sur un compact.'), t('Théorème des bornes atteintes.')),
    });
  }
  if (kind === 'interior') {
    return tfItem({
      skill: EC, level, statement: t('Si f ∈ C¹ atteint son maximum absolu sur D en un point p intérieur à D, alors ∇f(p) = 0.'), truth: true,
      explanation: t('Vrai : p est aussi un maximum local, et en un extremum local intérieur le gradient est nul.'), key: 'interior', exam: examTag(opts),
      hints: H(t('Un maximum absolu est aussi un maximum local.'), t('p est intérieur.'), t('Condition nécessaire : ∇f(p) = 0.')),
    });
  }
  if (kind === 'bounded') {
    return vfMcq(EC, t('Si D ⊂ ℝ² est borné et f : D → ℝ est continue, alors f atteint son maximum sur D.'), false, rng, {
      key: 'bounded', ruleIfTrue: 'a2_compact_open', exam: !!opts.exam, level,
      why: t('Faux : sur le disque ouvert x² + y² &lt; 1, f(x, y) = x² + y² ne dépasse pas 1 sans l\'atteindre. Il faut D fermé et borné.'),
    });
  }
  return vfMcq(EC, t('Sur un compact D, le maximum absolu d\'une fonction f ∈ C¹ est atteint en un point où ∇f = 0.'), false, rng, {
    key: 'grad', ruleIfTrue: 'a2_compact_boundary_forgot', exam: !!opts.exam, level,
    why: t('Faux : f(x, y) = x sur le disque unité a son maximum 1 en (1, 0), sur le bord, et ∇f = (1, 0) ne s\'annule jamais.'),
  });
}

export function extremaCompact(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return compactMcq(4, rng, opts);
  if (opts.exam === 'tf') return compactTf(4, rng, opts);
  if (level === 5) return compactProblem(5, rng, opts);
  return compactLines(level, rng, opts);
}

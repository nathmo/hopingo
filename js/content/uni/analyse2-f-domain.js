// a2-domain-describe and a2-fubini-swap (module A2, part f, step U6):
// describing a domain of the plane in type I (x outside) and type II (y
// outside), from its curves or from polar bounds, and changing the order
// of an iterated integral whose inner integrand has no elementary
// primitive. Judges: `solset` (the intersections), `domain` (the bounds,
// compared as sets), `definite` (the integrals).

import { parse } from '../../cas/parse.js';
import { stripParen } from '../../cas/ast.js';
import { evalFloat } from '../../cas/numeric.js';
import { blankLine } from '../../judges/lines.js';
import { MT, linesItem, examTag, H, E, SEG, modeOf, blanked, stepMenus, A2_KEYS, domainItem } from './a2-kit.js';
import { q, val, vText, vFloat, vScale, linT, swapXY, mcqV, R } from './analyse2-f-kit.js';
import { t } from '../../i18n.js';

const DD = 'a2-domain-describe';
const SW = 'a2-fubini-swap';
const XY = { vars: ['x', 'y'] };

// The bounds of a domain line with some of them blank: holes = [[chain, 'lo'|'hi']].
export function blankBounds(line, holes) {
  const node = parse(line.math, XY);
  const items = stripParen(node).t === 'list' ? stripParen(node).items : [node];
  const nodes = holes.map(([i, side]) => stripParen(items[i]).items[side === 'lo' ? 0 : 2]);
  return { ...line, ...blankLine(node, nodes, XY) };
}
// [{v, lo, hi}] (texts) of a line « lo ≤ v ≤ hi ; … ».
export const chainTexts = (text) => text.split(';').map((c) => { const [lo, v, hi] = c.split('≤').map((s) => s.trim()); return { v, lo, hi }; });

// ---------- regions bounded by curves ----------
// {region, box, I, II (type I and II lines, null when not one piece),
//  inter: {v, eq, sol} | null, curves, xs: [x1, x2]}
function baseRegion(rng) {
  const kind = rng.pick(['par', 'par', 'cub', 'sqrt', 'quarter', 'half', 'tri', 'line', 'line']);
  if (kind === 'par') {
    const m = rng.int(1, 3);
    const mx = m === 1 ? 'x' : `${m}x`;
    return {
      kind, region: ['y ≥ x^2', `y ≤ ${mx}`], xr: [0, m], yr: [0, m * m],
      I: `0 ≤ x ≤ ${m} ; x^2 ≤ y ≤ ${mx}`, II: `0 ≤ y ≤ ${m * m} ; ${m === 1 ? 'y' : `y/${m}`} ≤ x ≤ √y`,
      inter: { v: 'x', eq: `x^2 = ${mx}`, sol: `x = 0 ou x = ${m}`, said: (S) => t('{a} et {b}', { a: S('x = 0'), b: S(`x = ${m}`) }) }, curves: (S) => t('{a} et {b}', { a: R(S('y = x^2')), b: R(S(`y = ${mx}`)) }),
    };
  }
  if (kind === 'cub') {
    const m = rng.pick([1, 4]);
    const s = m === 1 ? 1 : 2;
    const mx = m === 1 ? 'x' : `${m}x`;
    return {
      kind, region: ['y ≥ x^3', `y ≤ ${mx}`, 'x ≥ 0'], xr: [0, s], yr: [0, m * s],
      I: `0 ≤ x ≤ ${s} ; x^3 ≤ y ≤ ${mx}`, II: `0 ≤ y ≤ ${m * s} ; ${m === 1 ? 'y' : `y/${m}`} ≤ x ≤ root(3,y)`,
      inter: { v: 'x', eq: `x^3 = ${mx}`, sol: `x = -${s} ou x = 0 ou x = ${s}`, said: (S) => t('{a} et {b} (pour {c})', { a: S('x = 0'), b: S(`x = ${s}`), c: S('x ≥ 0') }) }, curves: (S) => t('{a} et {b}, avec {c}', { a: R(S('y = x^3')), b: R(S(`y = ${mx}`)), c: S('x ≥ 0') }),
    };
  }
  if (kind === 'sqrt') {
    const c = rng.int(1, 3);
    return {
      kind, region: ['y ≥ 0', 'y ≤ √x', `x ≤ ${c * c}`], xr: [0, c * c], yr: [0, c],
      I: `0 ≤ x ≤ ${c * c} ; 0 ≤ y ≤ √x`, II: `0 ≤ y ≤ ${c} ; y^2 ≤ x ≤ ${c * c}`,
      inter: { v: 'x', eq: `√x = ${c}`, sol: `x = ${c * c}`, said: (S) => t('{a} ({b} rencontre {c})', { a: S(`x = ${c * c}`), b: R(S('y = √x')), c: S(`y = ${c}`) }) }, curves: (S) => t('{a}, {b} et {c}', { a: R(S('y = √x')), b: S('y = 0'), c: S(`x = ${c * c}`) }),
    };
  }
  if (kind === 'quarter' || kind === 'half') {
    const r = rng.int(1, 3);
    const R2 = r * r;
    const half = kind === 'half';
    return {
      kind, region: [`x^2+y^2 ≤ ${R2}`, 'y ≥ 0', ...(half ? [] : ['x ≥ 0'])], xr: [half ? -r : 0, r], yr: [0, r],
      I: `${half ? -r : 0} ≤ x ≤ ${r} ; 0 ≤ y ≤ √(${R2}-x^2)`,
      II: half ? `0 ≤ y ≤ ${r} ; -√(${R2}-y^2) ≤ x ≤ √(${R2}-y^2)` : `0 ≤ y ≤ ${r} ; 0 ≤ x ≤ √(${R2}-y^2)`,
      inter: null, curves: (S) => (half ? t('le cercle x² + y² = {r2} et l\'axe O{x} ({c})', { r2: R2, x: S('x'), c: S('y ≥ 0') }) : t('le cercle x² + y² = {r2} et les deux axes (x ≥ 0, y ≥ 0)', { r2: R2 })),
    };
  }
  if (kind === 'tri') {
    const c = rng.int(1, 3);
    const m = rng.int(1, 3);
    const mx = m === 1 ? 'x' : `${m}x`;
    return {
      kind, region: ['y ≥ 0', `y ≤ ${mx}`, `x ≤ ${c}`], xr: [0, c], yr: [0, m * c],
      I: `0 ≤ x ≤ ${c} ; 0 ≤ y ≤ ${mx}`, II: `0 ≤ y ≤ ${m * c} ; ${m === 1 ? 'y' : `y/${m}`} ≤ x ≤ ${c}`,
      inter: null, curves: (S) => t('les droites {a}, {b} et {c}', { a: S('y = 0'), b: R(S(`y = ${mx}`)), c: S(`x = ${c}`) }),
    };
  }
  // A line above a parabola: one piece in type I only.
  const r1 = -rng.int(1, 2);
  const r2 = rng.int(1, 3);
  const p = r1 + r2;
  const c0 = -r1 * r2;
  const L = linT([[p, 'x'], [c0, '']]);
  return {
    kind, region: ['y ≥ x^2', `y ≤ ${L}`], xr: [r1, r2], yr: [0, Math.max(r1 * r1, r2 * r2)],
    I: `${r1} ≤ x ≤ ${r2} ; x^2 ≤ y ≤ ${L}`, II: null,
    inter: { v: 'x', eq: `x^2 = ${L}`, sol: `x = ${r1} ou x = ${r2}`, said: (S) => t('{a} et {b}', { a: S(`x = ${r1}`), b: S(`x = ${r2}`) }) }, curves: (S) => t('{a} et {b}', { a: R(S('y = x^2')), b: R(S(`y = ${L}`)) }),
  };
}

const boxOf = (xr, yr) => [xr, yr].map(([a, b]) => { const m = 0.15 * (b - a) + 0.1; return [a - m, b + m]; });

// A region, mirrored (x ↔ y) half of the time.
export function regionData(rng) {
  const b = baseRegion(rng);
  const box = boxOf(b.xr, b.yr);
  const id = (s) => s;
  if (!rng.chance(0.4)) return { ...b, box, mirror: false, curves: b.curves(id), inter: b.inter && { ...b.inter, said: b.inter.said(id) } };
  const S = (s) => (s ? swapXY(s) : s);
  return {
    kind: b.kind, mirror: true, region: b.region.map(S), box: [box[1], box[0]],
    I: S(b.II), II: S(b.I),
    inter: b.inter && { v: 'y', eq: S(b.inter.eq), sol: S(b.inter.sol), said: b.inter.said(S) },
    curves: b.curves(S),
  };
}

const domCfg = (d, shape) => ({
  kind: 'domain', coords: 'cart', vars: ['x', 'y'], region: d.region, box: d.box,
  order: shape === 'typeI' ? ['x', 'y'] : ['y', 'x'], shape, answers: [d.I, d.II].filter(Boolean),
});
const regionText = (d) => `D = {(x, y) : ${d.region.map(R).join(', ')}}`;

const DD_SUB = [
  { id: 'intersect', label: t('points d\'intersection'), skill: 'fac-trinomial' },
  { id: 'order', label: t('la courbe du bas et celle du haut'), skill: DD },
  { id: 'typeI', label: t('type I'), skill: DD },
  { id: 'typeII', label: t('type II'), skill: DD },
];
const DD_CHOICES = [
  { id: 'solve', label: t('Résoudre : où les courbes se coupent-elles ?') },
  { id: 'typeI', label: t('x à l\'extérieur, entre deux nombres ; y de la courbe du bas à celle du haut') },
  { id: 'typeII', label: t('y à l\'extérieur, entre deux nombres ; x de la courbe de gauche à celle de droite') },
  { id: 'outer', label: t('Mettre les bornes qui contiennent x à l\'extérieur'), rule: 'a2_fubini_outer_var', why: t('L\'intégrale extérieure doit donner un nombre : ses bornes sont des nombres.') },
  { id: 'rename', label: t('Échanger simplement x et y dans les bornes'), rule: 'a2_fubini_swap_same', why: t('Renommer ne décrit pas le même domaine : dessine D.') },
];

// The decision « which curve is below / on the left ? » of a domain line.
function curveDecision(line) {
  const [o, i] = chainTexts(line);
  const below = i.v === 'y';
  const w = { lo: R(o.lo), hi: R(o.hi), o: o.v, i: i.v, ilo: R(i.lo), ihi: R(i.hi) };
  return {
    kind: 'decision', prompt: below ? t('Pour {lo} ≤ {o} ≤ {hi}, quelle courbe est en dessous ?', w) : t('Pour {lo} ≤ {o} ≤ {hi}, quelle courbe est à gauche ?', w), options: [
      { id: 'lo', label: `${i.v} = ${R(i.lo)}`, valid: true },
      { id: 'hi', label: `${i.v} = ${R(i.hi)}`, valid: false, rule: 'a2_domain_curve_order', why: below ? t('Teste {o} = {lo}…{hi} : {i} = {ilo} reste sous {i} = {ihi}.', w) : t('Teste {o} = {lo}…{hi} : {i} = {ilo} reste à gauche de {i} = {ihi}.', w) },
    ],
  };
}

function cartItem(level, rng, opts) {
  const d = regionData(rng);
  const parts = [];
  if (d.inter && level >= 2) {
    parts.push({ start: d.inter.eq, judge: { kind: 'solset', v: d.inter.v }, lines: [E(d.inter.sol, t('Intersections'), 'intersect', 'solve')] });
  }
  const types = [['typeI', d.I], ['typeII', d.II]].filter(([, l]) => l);
  let prevLine = d.region.join(' ; ');
  types.forEach(([shape, line], k) => {
    let l = E(line, shape === 'typeI' ? t('Type I') : t('Type II'), shape, shape);
    if (level === 1) l = blankBounds(l, [[1, 'lo'], [1, 'hi']]);
    if (level === 2) l = blankBounds(l, [[0, 'hi'], [1, k === 0 ? 'hi' : 'lo']]);
    parts.push({
      html: shape === 'typeI' ? t('Décris D en type I : x à l\'extérieur.') : t('Décris D en type II : y à l\'extérieur.'), ask: t('D :'),
      start: prevLine, judge: domCfg(d, shape), pre: k === 0 && (level === 2 || level === 3) ? [curveDecision(line)] : [], lines: [l],
    });
    prevLine = line;
  });
  // The first part's text goes in the prompt.
  const [first, ...rest] = parts;
  const menuOf = (p) => (level === 3 ? { ...p.judge, menus: stepMenus(p.start, p.lines, DD_CHOICES) } : p.judge);
  const script = [...(first.pre || []), ...first.lines];
  for (const p of rest) script.push(SEG(p.html, p.ask, p.start, menuOf(p)), ...(p.pre || []), ...p.lines);
  const asks = types.length === 2 ? t('Décris D en type I (x à l\'extérieur), puis en type II (y à l\'extérieur).')
    : types[0][0] === 'typeI' ? t('Décris D en type I (x à l\'extérieur).') : t('Décris D en type II (y à l\'extérieur).');
  const given = level === 1 && d.inter ? ` ${t('Les courbes se coupent en {p}.', { p: d.inter.said })}` : '';
  const firstAsk = first.judge.kind === 'solset' ? ` ${t('D\'abord, où les courbes se coupent-elles ? ({eq})', { eq: R(d.inter.eq) })}` : '';
  const [o1, i1] = chainTexts(types[0][1]);
  const typed = types.map(([, l]) => MT(l, XY));
  return linesItem({
    skill: DD, level, mode: modeOf(level), start: first.start, judge: menuOf(first), script,
    prompt: `${t('D est la région bornée par {curves} : {region}.', { curves: d.curves, region: regionText(d) })}${given} ${asks}${firstAsk}`,
    hints: H(d.inter ? t('Dessine les courbes et trouve leurs points d\'intersection. Les bornes extérieures sont des nombres.') : t('Dessine les courbes. Les bornes extérieures sont des nombres.'),
      t('{o} va de {lo} à … ; {i} va de … à {hi}', { o: o1.v, lo: R(o1.lo), i: i1.v, hi: R(i1.hi) }),
      typed.length === 2 ? t('{a} puis {b}', { a: typed[0], b: typed[1] }) : typed[0]),
    subgoals: DD_SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${DD}:${level}:${d.kind}:${d.I || d.II}:${d.mirror}`, exam: examTag(opts),
    baits: ['a2_fubini_outer_var', 'a2_domain_curve_order'],
  });
}

// ---------- from polar bounds to cartesian bounds (2019 Q10) ----------
function polarData(rng) {
  const kind = rng.pick(['tri1', 'tri2', 'quarter', 'para', 'half']);
  const c = rng.int(1, 3);
  if (kind === 'tri1') return { kind, ref: `0 ≤ φ ≤ π/4 ; 0 ≤ r ≤ ${c}/cos(φ)`, I: `0 ≤ x ≤ ${c} ; 0 ≤ y ≤ x`, xr: [0, c], yr: [0, c], read: t('le triangle 0 ≤ y ≤ x ≤ {c} (r cos φ ≤ {c} veut dire x ≤ {c})', { c }) };
  if (kind === 'tri2') return { kind, ref: `π/4 ≤ φ ≤ π/2 ; 0 ≤ r ≤ ${c}/sin(φ)`, I: `0 ≤ x ≤ ${c} ; x ≤ y ≤ ${c}`, xr: [0, c], yr: [0, c], read: t('le triangle 0 ≤ x ≤ y ≤ {c} (r sin φ ≤ {c} veut dire y ≤ {c})', { c }) };
  if (kind === 'quarter') return { kind, ref: `0 ≤ φ ≤ π/2 ; 0 ≤ r ≤ ${c}`, I: `0 ≤ x ≤ ${c} ; 0 ≤ y ≤ √(${c * c}-x^2)`, xr: [0, c], yr: [0, c], read: t('le quart de disque de rayon {c}', { c }) };
  if (kind === 'half') return { kind, ref: `0 ≤ φ ≤ π ; 0 ≤ r ≤ ${c}`, I: `${-c} ≤ x ≤ ${c} ; 0 ≤ y ≤ √(${c * c}-x^2)`, xr: [-c, c], yr: [0, c], read: t('le demi-disque de rayon {c}, y ≥ 0', { c }) };
  return { kind, ref: '0 ≤ φ ≤ π/4 ; 0 ≤ r ≤ sin(φ)/cos(φ)^2', I: '0 ≤ x ≤ 1 ; x^2 ≤ y ≤ x', xr: [0, 1], yr: [0, 1], read: t('la région x² ≤ y ≤ x (r cos²φ ≤ sin φ veut dire x² ≤ y, et φ ≤ π/4 veut dire y ≤ x)') };
}

function polarItem(level, rng, opts) {
  const d = polarData(rng);
  const judge = { kind: 'domain', coords: 'cart', vars: ['x', 'y'], ref: d.ref, refCoords: 'polar', box: boxOf(d.xr, d.yr), order: ['x', 'y'], shape: 'typeI', answers: [d.I] };
  const line = E(d.I, t('Type I'), 'typeI', 'typeI');
  return linesItem({
    skill: DD, level, mode: modeOf(level), start: d.ref, judge: level === 3 ? { ...judge, menus: stepMenus(d.ref, [line], DD_CHOICES) } : judge, script: [line],
    prompt: t('En coordonnées polaires, D̃ = {(r, φ) : {ref}}. Décris le même domaine D en coordonnées cartésiennes, en type I (x à l\'extérieur).', { ref: R(d.ref).replace(' ; ', ', ') }),
    hints: H(t('Écris chaque inégalité avec x = r cos φ et y = r sin φ, puis dessine D.'), t('C\'est {read}.', { read: d.read }), MT(d.I, XY)),
    subgoals: DD_SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${DD}:${level}:polar:${d.ref}`, exam: examTag(opts), baits: ['a2_fubini_outer_var', 'a2_domain_curve_order'],
  });
}

// ---------- multiple choice: which writing is equal? ----------
const FS = ['x y', 'x+y', 'x^2', 'y', 'x y^2', 'e^(x+y)', 'x'];
const intOf = (f, line) => {
  const [o, i] = chainTexts(line);
  return `int(int(${f},${i.v},${i.lo},${i.hi}),${o.v},${o.lo},${o.hi})`;
};
const numOf = (s) => { try { const x = evalFloat(parse(s), {}); return Number.isFinite(x) ? x : null; } catch { return null; } };
const opt = (s, rule = null) => ({ html: MT(s), x: numOf(s), rule });

// The wrong writings of `from` turned into the other order `to`.
function writings(f, from, to) {
  const [o, i] = chainTexts(from);
  const [o2, i2] = chainTexts(to);
  return [
    // Outer bounds kept: functions outside.
    opt(`int(int(${f},${o.v},${o.lo},${o.hi}),${i.v},${i.lo},${i.hi})`, 'a2_fubini_outer_var'),
    // Renamed: x ↔ y in the bounds.
    opt(`int(int(${f},${o.v},${swapXY(i.lo)},${swapXY(i.hi)}),${i.v},${o.lo},${o.hi})`, 'a2_fubini_swap_same'),
    // The inner bounds of the right writing swapped.
    opt(`int(int(${f},${i2.v},${i2.hi},${i2.lo}),${o2.v},${o2.lo},${o2.hi})`, 'a2_domain_curve_order'),
    // The outer bounds of the first writing kept for the new outer variable.
    opt(`int(int(${f},${i2.v},${i2.lo},${i2.hi}),${o2.v},${o.lo},${o.hi})`),
  ];
}

function describeMcq(rng, opts, level = 4) {
  for (let k = 0; k < 200; k++) {
    const d = regionData(rng);
    const f = rng.pick(FS);
    let right;
    let wrongs;
    let prompt;
    if (d.I && d.II) {
      const [from, to] = rng.chance(0.5) ? [d.I, d.II] : [d.II, d.I];
      right = opt(intOf(f, to));
      wrongs = writings(f, from, to);
      prompt = t('D est la région bornée par {curves}. Laquelle de ces écritures est égale à {I} ?', { curves: d.curves, I: MT(intOf(f, from)) });
    } else {
      const line = d.I || d.II;
      const [o, i] = chainTexts(line);
      right = opt(intOf(f, line));
      wrongs = [
        opt(`int(int(${f},${o.v},${o.lo},${o.hi}),${i.v},${i.lo},${i.hi})`, 'a2_fubini_outer_var'),
        opt(`int(int(${f},${i.v},${i.hi},${i.lo}),${o.v},${o.lo},${o.hi})`, 'a2_domain_curve_order'),
        opt(`int(int(${f},${i.v},${i.lo},${i.hi}),${o.v},0,${o.hi})`),
        opt(`int(int(${f},${o.v},${swapXY(i.lo)},${swapXY(i.hi)}),${i.v},${o.lo},${o.hi})`, 'a2_fubini_swap_same'),
      ];
      prompt = t('D est la région bornée par {curves} : {region}. Laquelle de ces écritures est égale à ∬<sub>D</sub> {f} dx dy ?', { curves: d.curves, region: regionText(d), f: MT(f) });
    }
    if (right.x === null) continue;
    const it = mcqV({
      skill: DD, level, prompt, right, wrongs: rng.shuffle(wrongs), key: `${DD}:mcq:${d.kind}:${d.I || d.II}:${d.mirror}:${f}`,
      expectedSec: 150, exam: examTag(opts) || false,
      solution: [{ html: d.I && d.II ? t('D en type I : {I} ; type II : {II}. Les bornes extérieures sont des nombres.', { I: MT(d.I, XY), II: MT(d.II, XY) }) : t('D en {D}. Les bornes extérieures sont des nombres.', { D: MT(d.I || d.II, XY) }), note: '' }],
    }, rng);
    if (it) return it;
  }
  return null;
}

// Level 4 (step U6, type `domain`): the bounds typed in boxes, one row per
// variable, in the order asked.
function boundsItem(level, rng, opts) {
  const d = regionData(rng);
  const types = [['typeI', d.I], ['typeII', d.II]].filter(([, l]) => l);
  const [shape, line] = rng.pick(types);
  const cs = chainTexts(line);
  const [o, i] = cs;
  const pv = { curves: d.curves, region: regionText(d) };
  return domainItem({
    skill: DD, level, prompt: shape === 'typeI' ? t('D est la région bornée par {curves} : {region}. Écris les bornes de D en type I (x à l’extérieur).', pv) : t('D est la région bornée par {curves} : {region}. Écris les bornes de D en type II (y à l’extérieur).', pv),
    judge: domCfg(d, shape), answer: Object.fromEntries(cs.map((c) => [c.v, [c.lo, c.hi]])),
    hints: H(d.inter ? t('Dessine les courbes et trouve leurs points d’intersection. Les bornes de {v}, à l\'extérieur, sont des nombres.', { v: o.v }) : t('Dessine les courbes. Les bornes de {v}, à l\'extérieur, sont des nombres.', { v: o.v }),
      t('{o} va de {lo} à … ; {i} va de … à {hi}', { o: o.v, lo: R(o.lo), i: i.v, hi: R(i.hi) }), MT(line, XY)),
    subgoals: DD_SUB.filter((g) => g.id === shape || g.id === 'order'),
    key: `${d.kind}:${line}:${d.mirror}`, exam: examTag(opts),
    baits: ['a2_fubini_outer_var', 'a2_domain_curve_order'],
  });
}

export function domainDescribe(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq' || level === 5) return describeMcq(rng, opts, opts.exam ? 4 : 5);
  if (level === 4 && rng.chance(0.35)) return polarItem(level, rng, opts);
  if (level === 4 && !opts.exam && rng.chance(0.4)) return boundsItem(level, rng, opts);
  if (level === 3 && rng.chance(0.2)) return polarItem(level, rng, opts);
  return cartItem(level, rng, opts);
}

// ======================================================================
// a2-fubini-swap
// ======================================================================

// An inner integrand g(y) with no elementary primitive; the domain
// 0 ≤ y ≤ c, 0 ≤ x ≤ φ(y) (φ increasing, inverse inv); the integrand
// x^k·g(y); after the x integral: inner(y); its primitive; the value.
const SWAPS = [
  { f: 'e^(y^3)', phi: 'y^2', inv: '√x', c: '1', cx: '1', inner: 'y^2 e^(y^3)', prim: 'e^(y^3)/3', V: val([q(1, 3), 'e'], [q(-1, 3)]) },
  { f: 'e^(y^2)', phi: 'y', inv: 'x', c: '1', cx: '1', inner: 'y e^(y^2)', prim: 'e^(y^2)/2', V: val([q(1, 2), 'e'], [q(-1, 2)]) },
  { f: 'e^(y^2)', phi: 'y', inv: 'x', c: '2', cx: '2', inner: 'y e^(y^2)', prim: 'e^(y^2)/2', V: val([q(1, 2), 'e^4'], [q(-1, 2)]) },
  { f: 'e^(y^2)', phi: '2y', inv: 'x/2', c: '1', cx: '2', inner: '2y e^(y^2)', prim: 'e^(y^2)', V: val([1, 'e'], [-1]) },
  { f: 'sin(y^2)', phi: 'y', inv: 'x', c: '√(π)', cx: '√(π)', inner: 'y sin(y^2)', prim: '-cos(y^2)/2', V: val([1]) },
  { f: 'sin(y^2)', phi: 'y', inv: 'x', c: '√(π/2)', cx: '√(π/2)', inner: 'y sin(y^2)', prim: '-cos(y^2)/2', V: val([q(1, 2)]) },
  { f: 'cos(y^2)', phi: 'y', inv: 'x', c: '√(π/2)', cx: '√(π/2)', inner: 'y cos(y^2)', prim: 'sin(y^2)/2', V: val([q(1, 2)]) },
  { f: '1/(1+y^4)', phi: 'y', inv: 'x', c: '1', cx: '1', inner: 'y/(1+y^4)', prim: 'arctan(y^2)/2', V: val([q(1, 8), 'π']) },
  { f: '1/(1+y^4)', phi: 'y^3', inv: 'root(3,x)', c: '1', cx: '1', inner: 'y^3/(1+y^4)', prim: 'ln(1+y^4)/4', V: val([q(1, 4), 'ln(2)']) },
  { f: 'x e^(y^3)', g: 'e^(y^3)', phi: 'y', inv: 'x', c: '1', cx: '1', inner: 'y^2 e^(y^3)/2', prim: 'e^(y^3)/6', V: val([q(1, 6), 'e'], [q(-1, 6)]) },
  ...[1, 2, 3].map((k) => ({
    f: `${k === 1 ? 'x' : `x^${k}`}/(1+y^${k + 2})`, g: `1/(1+y^${k + 2})`, phi: 'y', inv: 'x', c: '1', cx: '1',
    inner: `y^${k + 1}/(${k + 1}(1+y^${k + 2}))`, prim: `ln(1+y^${k + 2})/${(k + 1) * (k + 2)}`, V: val([q(1, (k + 1) * (k + 2)), 'ln(2)']),
  })),
];

const SW_SUB = [
  { id: 'read', label: t('lire D sur les bornes'), skill: DD },
  { id: 'swap', label: t('décrire D dans l\'autre ordre'), skill: DD },
  { id: 'inner', label: t('l\'intégrale intérieure'), skill: 'a1-int-direct' },
  { id: 'outer', label: t('l\'intégrale extérieure'), skill: 'a1-int-direct' },
];
const SW_CHOICES = [
  { id: 'read', label: t('Écrire D avec ses inégalités, en lisant les bornes') },
  { id: 'swap', label: t('Décrire D dans l\'autre ordre (dessin)') },
  { id: 'rename', label: t('Échanger x et y dans les bornes'), rule: 'a2_fubini_swap_same', why: t('Renommer ne décrit pas le même domaine : dessine D.') },
  { id: 'inner', label: t('Intégrer l\'intégrale intérieure') },
  { id: 'prim', label: t('Primitive, puis crochet') },
  { id: 'calc', label: t('Calculer le nombre') },
  { id: 'prim0', label: t('Chercher une primitive de l\'intégrande intérieur'), why: t('Il n\'a pas de primitive élémentaire : change l\'ordre.') },
];

// The texts of one swap: hard (given) and easy (new) integrals and lines.
function swapData(rng) {
  const s = rng.pick(SWAPS);
  const mirror = rng.chance(0.4);
  const S = (s) => (mirror ? swapXY(s) : s);
  const [X, Y] = mirror ? ['y', 'x'] : ['x', 'y'];
  const w = {
    s, mirror, X, Y, g: S(s.g || s.f), f: S(s.f), inner: S(s.inner), prim: S(s.prim), V: s.V,
    oldLine: `0 ≤ ${X} ≤ ${s.cx} ; ${S(s.inv)} ≤ ${Y} ≤ ${s.c}`,
    newLine: `0 ≤ ${Y} ≤ ${s.c} ; 0 ≤ ${X} ≤ ${S(s.phi)}`,
    region: [`${X} ≥ 0`, `${X} ≤ ${S(s.phi)}`, `${Y} ≥ 0`, `${Y} ≤ ${s.c}`],
  };
  const xr = [0, numOf(s.cx)];
  const yr = [0, numOf(s.c)];
  w.box = mirror ? boxOf(yr, xr) : boxOf(xr, yr);
  w.hard = intOf(w.f, w.oldLine);
  w.easy = intOf(w.f, w.newLine);
  w.value = vText(w.V);
  return w;
}
const swapCfg = (w, outer) => ({
  kind: 'domain', coords: 'cart', vars: ['x', 'y'], region: w.region, box: w.box,
  order: outer === 'x' ? ['x', 'y'] : ['y', 'x'], shape: outer === 'x' ? 'typeI' : 'typeII', answers: outer === w.X ? [w.oldLine] : [w.newLine],
});

function swapItem(level, rng, opts) {
  const w = swapData(rng);
  const { X, Y } = w;
  const readL = E(w.oldLine, t('Lire D sur les bornes'), 'read', 'read');
  let swapL = E(w.newLine, t('D dans l\'autre ordre : {v} à l\'extérieur', { v: Y }), 'swap', 'swap');
  let innerL = E(`int(${w.inner},${Y},0,${w.s.c})`, t('Intégrale en {v}', { v: X }), 'inner', 'inner');
  let primL = E(`bracket(${w.prim},${Y},0,${w.s.c})`, t('Primitive'), 'outer', 'prim');
  const valL = E(w.value, t('Calculer'), 'outer', 'calc');
  if (level === 1) { swapL = blankBounds(swapL, [[1, 'hi']]); innerL = blanked(innerL, [w.inner]); }
  if (level === 2) { swapL = blankBounds(swapL, [[0, 'hi'], [1, 'hi']]); primL = blanked(primL, [w.prim]); }
  const dec = {
    kind: 'decision', prompt: t('Comment calculer ?'), options: [
      { id: 'as', label: t('Intégrer tel quel, d\'abord en {v}', { v: Y }), valid: false, why: t('{g} n\'a pas de primitive élémentaire.', { g: R(w.g) }) },
      { id: 'swap', label: t('Changer l\'ordre d\'intégration'), valid: true },
    ],
  };
  const parts = [
    ...(level >= 2 ? [{ html: '', start: w.hard, judge: swapCfg(w, X), lines: [readL], pre: level === 3 ? [dec] : [] }] : []),
    { html: t('Décris D dans l\'autre ordre : {v} à l\'extérieur.', { v: Y }), ask: t('D :'), start: w.oldLine, judge: swapCfg(w, Y), lines: [swapL], pre: level === 1 ? [] : [] },
    { html: t('Calcule l\'intégrale dans le nouvel ordre :'), ask: '=', start: w.easy, judge: { kind: 'definite' }, lines: [innerL, primL, valL] },
  ];
  const [first, ...rest] = parts;
  const menuOf = (p) => (level === 3 ? { ...p.judge, menus: stepMenus(p.start, p.lines, SW_CHOICES) } : p.judge);
  const script = [...(first.pre || []), ...first.lines];
  for (const p of rest) script.push(SEG(p.html, p.ask, p.start, menuOf(p)), ...(p.pre || []), ...p.lines);
  const ask = level >= 2 ? ` ${t('Écris d\'abord D avec ses inégalités ({v} à l\'extérieur, comme dans l\'intégrale).', { v: X })}` : ` ${t('Ici D = {(x, y) : {D}}. Décris D avec {v} à l\'extérieur.', { D: R(w.oldLine).replace(' ; ', ', '), v: Y })}`;
  return linesItem({
    skill: SW, level, mode: modeOf(level), start: first.start, judge: menuOf(first), script,
    prompt: t('Calcule {I}. {g} n\'a pas de primitive élémentaire : change l\'ordre d\'intégration.', { I: MT(w.hard), g: R(w.g) }) + ask,
    hints: H(t('{g} n\'a pas de primitive : change l\'ordre. Dessine D = {{D}}.', { g: R(w.g), D: R(w.oldLine).replace(' ; ', ', ') }),
      t('{y} va de 0 à {c} ; {x} va de 0 à …', { y: Y, c: R(w.s.c), x: X }), MT(w.newLine, XY)),
    subgoals: SW_SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SW}:${level}:${w.hard}`, exam: examTag(opts), baits: ['a2_fubini_swap_same', 'a2_fubini_outer_var'],
  });
}

function swapMcq(rng, opts, level = 4) {
  for (let k = 0; k < 200; k++) {
    const w = swapData(rng);
    const sol = [{ html: t('D = {{A}} = {{B}}, donc {I} = {J} = {v}.', { A: R(w.oldLine).replace(' ; ', ', '), B: R(w.newLine).replace(' ; ', ', '), I: MT(w.hard), J: MT(w.easy), v: MT(w.value) }), note: '' }];
    let it;
    if (rng.chance(0.6)) {
      it = mcqV({
        skill: SW, level, prompt: t('{g} n\'a pas de primitive élémentaire. Laquelle de ces écritures est égale à {I} ?', { g: R(w.g), I: MT(w.hard) }),
        right: opt(w.easy), wrongs: rng.shuffle(writings(w.f, w.oldLine, w.newLine)), key: `${SW}:mcq:w:${w.hard}`,
        expectedSec: 150, exam: examTag(opts) || false, solution: sol,
      }, rng);
    } else {
      const x = vFloat(w.V);
      const wrongs = [vScale(w.V, 2), vScale(w.V, q(1, 2)), vScale(w.V, 3), vScale(w.V, -1)].map((W) => ({ html: MT(vText(W)), x: vFloat(W) }));
      it = mcqV({
        skill: SW, level, prompt: t('Que vaut {I} ?', { I: MT(w.hard) }), right: { html: MT(w.value), x }, wrongs: rng.shuffle(wrongs),
        key: `${SW}:mcq:v:${w.hard}`, expectedSec: 180, exam: examTag(opts) || false, solution: sol,
      }, rng);
      if (it) it.baits = ['a2_fubini_swap_same'];
    }
    if (it) return it;
  }
  return null;
}

export function fubiniSwap(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq' || level === 5) return swapMcq(rng, opts, opts.exam ? 4 : 5);
  return swapItem(level, rng, opts);
}

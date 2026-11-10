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
import { MT, linesItem, examTag, H, E, SEG, modeOf, blanked, stepMenus, A2_KEYS } from './a2-kit.js';
import { q, val, vText, vFloat, vScale, linT, swapXY, mcqV, R } from './analyse2-f-kit.js';

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
      inter: { v: 'x', eq: `x^2 = ${mx}`, sol: `x = 0 ou x = ${m}`, said: (S) => `${S('x = 0')} et ${S(`x = ${m}`)}` }, curves: (S) => `${R(S('y = x^2'))} et ${R(S(`y = ${mx}`))}`,
    };
  }
  if (kind === 'cub') {
    const m = rng.pick([1, 4]);
    const s = m === 1 ? 1 : 2;
    const mx = m === 1 ? 'x' : `${m}x`;
    return {
      kind, region: ['y ≥ x^3', `y ≤ ${mx}`, 'x ≥ 0'], xr: [0, s], yr: [0, m * s],
      I: `0 ≤ x ≤ ${s} ; x^3 ≤ y ≤ ${mx}`, II: `0 ≤ y ≤ ${m * s} ; ${m === 1 ? 'y' : `y/${m}`} ≤ x ≤ root(3,y)`,
      inter: { v: 'x', eq: `x^3 = ${mx}`, sol: `x = -${s} ou x = 0 ou x = ${s}`, said: (S) => `${S('x = 0')} et ${S(`x = ${s}`)} (pour ${S('x ≥ 0')})` }, curves: (S) => `${R(S('y = x^3'))} et ${R(S(`y = ${mx}`))}, avec ${S('x ≥ 0')}`,
    };
  }
  if (kind === 'sqrt') {
    const c = rng.int(1, 3);
    return {
      kind, region: ['y ≥ 0', 'y ≤ √x', `x ≤ ${c * c}`], xr: [0, c * c], yr: [0, c],
      I: `0 ≤ x ≤ ${c * c} ; 0 ≤ y ≤ √x`, II: `0 ≤ y ≤ ${c} ; y^2 ≤ x ≤ ${c * c}`,
      inter: { v: 'x', eq: `√x = ${c}`, sol: `x = ${c * c}`, said: (S) => `${S(`x = ${c * c}`)} (${R(S('y = √x'))} rencontre ${S(`y = ${c}`)})` }, curves: (S) => `${R(S('y = √x'))}, ${S('y = 0')} et ${S(`x = ${c * c}`)}`,
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
      inter: null, curves: (S) => `le cercle x² + y² = ${R2}${half ? ` et l'axe O${S('x')} (${S('y ≥ 0')})` : ' et les deux axes (x ≥ 0, y ≥ 0)'}`,
    };
  }
  if (kind === 'tri') {
    const c = rng.int(1, 3);
    const m = rng.int(1, 3);
    const mx = m === 1 ? 'x' : `${m}x`;
    return {
      kind, region: ['y ≥ 0', `y ≤ ${mx}`, `x ≤ ${c}`], xr: [0, c], yr: [0, m * c],
      I: `0 ≤ x ≤ ${c} ; 0 ≤ y ≤ ${mx}`, II: `0 ≤ y ≤ ${m * c} ; ${m === 1 ? 'y' : `y/${m}`} ≤ x ≤ ${c}`,
      inter: null, curves: (S) => `les droites ${S('y = 0')}, ${R(S(`y = ${mx}`))} et ${S(`x = ${c}`)}`,
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
    inter: { v: 'x', eq: `x^2 = ${L}`, sol: `x = ${r1} ou x = ${r2}`, said: (S) => `${S(`x = ${r1}`)} et ${S(`x = ${r2}`)}` }, curves: (S) => `${R(S('y = x^2'))} et ${R(S(`y = ${L}`))}`,
  };
}

const boxOf = (xr, yr) => [xr, yr].map(([a, b]) => { const m = 0.15 * (b - a) + 0.1; return [a - m, b + m]; });

// A region, mirrored (x ↔ y) half of the time.
export function regionData(rng) {
  const b = baseRegion(rng);
  const box = boxOf(b.xr, b.yr);
  const id = (t) => t;
  if (!rng.chance(0.4)) return { ...b, box, mirror: false, curves: b.curves(id), inter: b.inter && { ...b.inter, said: b.inter.said(id) } };
  const S = (t) => (t ? swapXY(t) : t);
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
  { id: 'intersect', label: 'points d\'intersection', skill: 'fac-trinomial' },
  { id: 'order', label: 'la courbe du bas et celle du haut', skill: DD },
  { id: 'typeI', label: 'type I', skill: DD },
  { id: 'typeII', label: 'type II', skill: DD },
];
const DD_CHOICES = [
  { id: 'solve', label: 'Résoudre : où les courbes se coupent-elles ?' },
  { id: 'typeI', label: 'x à l\'extérieur, entre deux nombres ; y de la courbe du bas à celle du haut' },
  { id: 'typeII', label: 'y à l\'extérieur, entre deux nombres ; x de la courbe de gauche à celle de droite' },
  { id: 'outer', label: 'Mettre les bornes qui contiennent x à l\'extérieur', rule: 'a2_fubini_outer_var', why: 'L\'intégrale extérieure doit donner un nombre : ses bornes sont des nombres.' },
  { id: 'rename', label: 'Échanger simplement x et y dans les bornes', rule: 'a2_fubini_swap_same', why: 'Renommer ne décrit pas le même domaine : dessine D.' },
];

// The decision « which curve is below / on the left ? » of a domain line.
function curveDecision(line) {
  const [o, i] = chainTexts(line);
  const where = i.v === 'y' ? 'en dessous' : 'à gauche';
  return {
    kind: 'decision', prompt: `Pour ${R(o.lo)} ≤ ${o.v} ≤ ${R(o.hi)}, quelle courbe est ${where} ?`, options: [
      { id: 'lo', label: `${i.v} = ${R(i.lo)}`, valid: true },
      { id: 'hi', label: `${i.v} = ${R(i.hi)}`, valid: false, rule: 'a2_domain_curve_order', why: `Teste ${o.v} = ${R(o.lo)}…${R(o.hi)} : ${i.v} = ${R(i.lo)} reste ${where === 'en dessous' ? 'sous' : 'à gauche de'} ${i.v} = ${R(i.hi)}.` },
    ],
  };
}

function cartItem(level, rng, opts) {
  const d = regionData(rng);
  const parts = [];
  if (d.inter && level >= 2) {
    parts.push({ start: d.inter.eq, judge: { kind: 'solset', v: d.inter.v }, lines: [E(d.inter.sol, 'Intersections', 'intersect', 'solve')] });
  }
  const types = [['typeI', d.I], ['typeII', d.II]].filter(([, t]) => t);
  let prevLine = d.region.join(' ; ');
  types.forEach(([shape, line], k) => {
    let l = E(line, shape === 'typeI' ? 'Type I' : 'Type II', shape, shape);
    if (level === 1) l = blankBounds(l, [[1, 'lo'], [1, 'hi']]);
    if (level === 2) l = blankBounds(l, [[0, 'hi'], [1, k === 0 ? 'hi' : 'lo']]);
    parts.push({
      html: shape === 'typeI' ? 'Décris D en type I : x à l\'extérieur.' : 'Décris D en type II : y à l\'extérieur.', ask: 'D :',
      start: prevLine, judge: domCfg(d, shape), pre: k === 0 && (level === 2 || level === 3) ? [curveDecision(line)] : [], lines: [l],
    });
    prevLine = line;
  });
  // The first part's text goes in the prompt.
  const [first, ...rest] = parts;
  const menuOf = (p) => (level === 3 ? { ...p.judge, menus: stepMenus(p.start, p.lines, DD_CHOICES) } : p.judge);
  const script = [...(first.pre || []), ...first.lines];
  for (const p of rest) script.push(SEG(p.html, p.ask, p.start, menuOf(p)), ...(p.pre || []), ...p.lines);
  const asks = types.map(([s]) => (s === 'typeI' ? 'en type I (x à l\'extérieur)' : 'en type II (y à l\'extérieur)')).join(', puis ');
  const given = level === 1 && d.inter ? ` Les courbes se coupent en ${d.inter.said}.` : '';
  const firstAsk = first.judge.kind === 'solset' ? ` D'abord, où les courbes se coupent-elles ? (${R(d.inter.eq)})` : '';
  const [o1, i1] = chainTexts(types[0][1]);
  return linesItem({
    skill: DD, level, mode: modeOf(level), start: first.start, judge: menuOf(first), script,
    prompt: `D est la région bornée par ${d.curves} : ${regionText(d)}.${given} Décris D ${asks}.${firstAsk}`,
    hints: H(`Dessine les courbes${d.inter ? ' et trouve leurs points d\'intersection' : ''}. Les bornes extérieures sont des nombres.`,
      `${o1.v} va de ${R(o1.lo)} à … ; ${i1.v} va de … à ${R(i1.hi)}`,
      types.map(([, t]) => MT(t, XY)).join(' puis ')),
    subgoals: DD_SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${DD}:${level}:${d.kind}:${d.I || d.II}:${d.mirror}`, exam: examTag(opts),
    baits: ['a2_fubini_outer_var', 'a2_domain_curve_order'],
  });
}

// ---------- from polar bounds to cartesian bounds (2019 Q10) ----------
function polarData(rng) {
  const kind = rng.pick(['tri1', 'tri2', 'quarter', 'para', 'half']);
  const c = rng.int(1, 3);
  if (kind === 'tri1') return { kind, ref: `0 ≤ φ ≤ π/4 ; 0 ≤ r ≤ ${c}/cos(φ)`, I: `0 ≤ x ≤ ${c} ; 0 ≤ y ≤ x`, xr: [0, c], yr: [0, c], read: `le triangle 0 ≤ y ≤ x ≤ ${c} (r cos φ ≤ ${c} veut dire x ≤ ${c})` };
  if (kind === 'tri2') return { kind, ref: `π/4 ≤ φ ≤ π/2 ; 0 ≤ r ≤ ${c}/sin(φ)`, I: `0 ≤ x ≤ ${c} ; x ≤ y ≤ ${c}`, xr: [0, c], yr: [0, c], read: `le triangle 0 ≤ x ≤ y ≤ ${c} (r sin φ ≤ ${c} veut dire y ≤ ${c})` };
  if (kind === 'quarter') return { kind, ref: `0 ≤ φ ≤ π/2 ; 0 ≤ r ≤ ${c}`, I: `0 ≤ x ≤ ${c} ; 0 ≤ y ≤ √(${c * c}-x^2)`, xr: [0, c], yr: [0, c], read: `le quart de disque de rayon ${c}` };
  if (kind === 'half') return { kind, ref: `0 ≤ φ ≤ π ; 0 ≤ r ≤ ${c}`, I: `${-c} ≤ x ≤ ${c} ; 0 ≤ y ≤ √(${c * c}-x^2)`, xr: [-c, c], yr: [0, c], read: `le demi-disque de rayon ${c}, y ≥ 0` };
  return { kind, ref: '0 ≤ φ ≤ π/4 ; 0 ≤ r ≤ sin(φ)/cos(φ)^2', I: '0 ≤ x ≤ 1 ; x^2 ≤ y ≤ x', xr: [0, 1], yr: [0, 1], read: 'la région x² ≤ y ≤ x (r cos²φ ≤ sin φ veut dire x² ≤ y, et φ ≤ π/4 veut dire y ≤ x)' };
}

function polarItem(level, rng, opts) {
  const d = polarData(rng);
  const judge = { kind: 'domain', coords: 'cart', vars: ['x', 'y'], ref: d.ref, refCoords: 'polar', box: boxOf(d.xr, d.yr), order: ['x', 'y'], shape: 'typeI', answers: [d.I] };
  const line = E(d.I, 'Type I', 'typeI', 'typeI');
  return linesItem({
    skill: DD, level, mode: modeOf(level), start: d.ref, judge: level === 3 ? { ...judge, menus: stepMenus(d.ref, [line], DD_CHOICES) } : judge, script: [line],
    prompt: `En coordonnées polaires, D̃ = {(r, φ) : ${R(d.ref).replace(' ; ', ', ')}}. Décris le même domaine D en coordonnées cartésiennes, en type I (x à l'extérieur).`,
    hints: H('Écris chaque inégalité avec x = r cos φ et y = r sin φ, puis dessine D.', `C'est ${d.read}.`, MT(d.I, XY)),
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
const numOf = (t) => { try { const x = evalFloat(parse(t), {}); return Number.isFinite(x) ? x : null; } catch { return null; } };
const opt = (t, rule = null) => ({ html: MT(t), x: numOf(t), rule });

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
      prompt = `D est la région bornée par ${d.curves}. Laquelle de ces écritures est égale à ${MT(intOf(f, from))} ?`;
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
      prompt = `D est la région bornée par ${d.curves} : ${regionText(d)}. Laquelle de ces écritures est égale à ∬<sub>D</sub> ${MT(f)} dx dy ?`;
    }
    if (right.x === null) continue;
    const it = mcqV({
      skill: DD, level, prompt, right, wrongs: rng.shuffle(wrongs), key: `${DD}:mcq:${d.kind}:${d.I || d.II}:${d.mirror}:${f}`,
      expectedSec: 150, exam: examTag(opts) || false,
      solution: [{ html: `D en ${d.I && d.II ? 'type I : ' + MT(d.I, XY) + ' ; type II : ' + MT(d.II, XY) : MT(d.I || d.II, XY)}. Les bornes extérieures sont des nombres.`, note: '' }],
    }, rng);
    if (it) return it;
  }
  return null;
}

export function domainDescribe(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq' || level === 5) return describeMcq(rng, opts, opts.exam ? 4 : 5);
  if (level === 4 && rng.chance(0.35)) return polarItem(level, rng, opts);
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
  { id: 'read', label: 'lire D sur les bornes', skill: DD },
  { id: 'swap', label: 'décrire D dans l\'autre ordre', skill: DD },
  { id: 'inner', label: 'l\'intégrale intérieure', skill: 'a1-int-direct' },
  { id: 'outer', label: 'l\'intégrale extérieure', skill: 'a1-int-direct' },
];
const SW_CHOICES = [
  { id: 'read', label: 'Écrire D avec ses inégalités, en lisant les bornes' },
  { id: 'swap', label: 'Décrire D dans l\'autre ordre (dessin)' },
  { id: 'rename', label: 'Échanger x et y dans les bornes', rule: 'a2_fubini_swap_same', why: 'Renommer ne décrit pas le même domaine : dessine D.' },
  { id: 'inner', label: 'Intégrer l\'intégrale intérieure' },
  { id: 'prim', label: 'Primitive, puis crochet' },
  { id: 'calc', label: 'Calculer le nombre' },
  { id: 'prim0', label: 'Chercher une primitive de l\'intégrande intérieur', why: 'Il n\'a pas de primitive élémentaire : change l\'ordre.' },
];

// The texts of one swap: hard (given) and easy (new) integrals and lines.
function swapData(rng) {
  const s = rng.pick(SWAPS);
  const mirror = rng.chance(0.4);
  const S = (t) => (mirror ? swapXY(t) : t);
  const [X, Y] = mirror ? ['y', 'x'] : ['x', 'y'];
  const t = {
    s, mirror, X, Y, g: S(s.g || s.f), f: S(s.f), inner: S(s.inner), prim: S(s.prim), V: s.V,
    oldLine: `0 ≤ ${X} ≤ ${s.cx} ; ${S(s.inv)} ≤ ${Y} ≤ ${s.c}`,
    newLine: `0 ≤ ${Y} ≤ ${s.c} ; 0 ≤ ${X} ≤ ${S(s.phi)}`,
    region: [`${X} ≥ 0`, `${X} ≤ ${S(s.phi)}`, `${Y} ≥ 0`, `${Y} ≤ ${s.c}`],
  };
  const xr = [0, numOf(s.cx)];
  const yr = [0, numOf(s.c)];
  t.box = mirror ? boxOf(yr, xr) : boxOf(xr, yr);
  t.hard = intOf(t.f, t.oldLine);
  t.easy = intOf(t.f, t.newLine);
  t.value = vText(t.V);
  return t;
}
const swapCfg = (t, outer) => ({
  kind: 'domain', coords: 'cart', vars: ['x', 'y'], region: t.region, box: t.box,
  order: outer === 'x' ? ['x', 'y'] : ['y', 'x'], shape: outer === 'x' ? 'typeI' : 'typeII', answers: outer === t.X ? [t.oldLine] : [t.newLine],
});

function swapItem(level, rng, opts) {
  const t = swapData(rng);
  const { X, Y } = t;
  const readL = E(t.oldLine, 'Lire D sur les bornes', 'read', 'read');
  let swapL = E(t.newLine, `D dans l'autre ordre : ${Y} à l'extérieur`, 'swap', 'swap');
  let innerL = E(`int(${t.inner},${Y},0,${t.s.c})`, `Intégrale en ${X}`, 'inner', 'inner');
  let primL = E(`bracket(${t.prim},${Y},0,${t.s.c})`, 'Primitive', 'outer', 'prim');
  const valL = E(t.value, 'Calculer', 'outer', 'calc');
  if (level === 1) { swapL = blankBounds(swapL, [[1, 'hi']]); innerL = blanked(innerL, [t.inner]); }
  if (level === 2) { swapL = blankBounds(swapL, [[0, 'hi'], [1, 'hi']]); primL = blanked(primL, [t.prim]); }
  const dec = {
    kind: 'decision', prompt: 'Comment calculer ?', options: [
      { id: 'as', label: `Intégrer tel quel, d'abord en ${Y}`, valid: false, why: `${R(t.g)} n'a pas de primitive élémentaire.` },
      { id: 'swap', label: 'Changer l\'ordre d\'intégration', valid: true },
    ],
  };
  const parts = [
    ...(level >= 2 ? [{ html: '', start: t.hard, judge: swapCfg(t, X), lines: [readL], pre: level === 3 ? [dec] : [] }] : []),
    { html: `Décris D dans l'autre ordre : ${Y} à l'extérieur.`, ask: 'D :', start: t.oldLine, judge: swapCfg(t, Y), lines: [swapL], pre: level === 1 ? [] : [] },
    { html: 'Calcule l\'intégrale dans le nouvel ordre :', ask: '=', start: t.easy, judge: { kind: 'definite' }, lines: [innerL, primL, valL] },
  ];
  const [first, ...rest] = parts;
  const menuOf = (p) => (level === 3 ? { ...p.judge, menus: stepMenus(p.start, p.lines, SW_CHOICES) } : p.judge);
  const script = [...(first.pre || []), ...first.lines];
  for (const p of rest) script.push(SEG(p.html, p.ask, p.start, menuOf(p)), ...(p.pre || []), ...p.lines);
  const ask = level >= 2 ? ` Écris d'abord D avec ses inégalités (${X} à l'extérieur, comme dans l'intégrale).` : ` Ici D = {(x, y) : ${R(t.oldLine).replace(' ; ', ', ')}}. Décris D avec ${Y} à l'extérieur.`;
  return linesItem({
    skill: SW, level, mode: modeOf(level), start: first.start, judge: menuOf(first), script,
    prompt: `Calcule ${MT(t.hard)}. ${R(t.g)} n'a pas de primitive élémentaire : change l'ordre d'intégration.${ask}`,
    hints: H(`${R(t.g)} n'a pas de primitive : change l'ordre. Dessine D = {${R(t.oldLine).replace(' ; ', ', ')}}.`,
      `${Y} va de 0 à ${R(t.s.c)} ; ${X} va de 0 à …`, MT(t.newLine, XY)),
    subgoals: SW_SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SW}:${level}:${t.hard}`, exam: examTag(opts), baits: ['a2_fubini_swap_same', 'a2_fubini_outer_var'],
  });
}

function swapMcq(rng, opts, level = 4) {
  for (let k = 0; k < 200; k++) {
    const t = swapData(rng);
    const sol = [{ html: `D = {${R(t.oldLine).replace(' ; ', ', ')}} = {${R(t.newLine).replace(' ; ', ', ')}}, donc ${MT(t.hard)} = ${MT(t.easy)} = ${MT(t.value)}.`, note: '' }];
    let it;
    if (rng.chance(0.6)) {
      it = mcqV({
        skill: SW, level, prompt: `${R(t.g)} n'a pas de primitive élémentaire. Laquelle de ces écritures est égale à ${MT(t.hard)} ?`,
        right: opt(t.easy), wrongs: rng.shuffle(writings(t.f, t.oldLine, t.newLine)), key: `${SW}:mcq:w:${t.hard}`,
        expectedSec: 150, exam: examTag(opts) || false, solution: sol,
      }, rng);
    } else {
      const x = vFloat(t.V);
      const wrongs = [vScale(t.V, 2), vScale(t.V, q(1, 2)), vScale(t.V, 3), vScale(t.V, -1)].map((W) => ({ html: MT(vText(W)), x: vFloat(W) }));
      it = mcqV({
        skill: SW, level, prompt: `Que vaut ${MT(t.hard)} ?`, right: { html: MT(t.value), x }, wrongs: rng.shuffle(wrongs),
        key: `${SW}:mcq:v:${t.hard}`, expectedSec: 180, exam: examTag(opts) || false, solution: sol,
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

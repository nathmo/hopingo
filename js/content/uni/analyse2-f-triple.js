// a2-triple-int (module A2, part f, step U6): a triple integral by Fubini.
// The bounds (z between two surfaces, then the projection), judged by the
// `domain` judge in dimension 3 (type I3: x, then y, then z inside); then
// the successive integrals (`definite`, the start I_D being the value of
// the integral, so that the triple quadrature runs once per line).

import { Q } from '../../math/rational.js';
import { MT, linesItem, examTag, H, E, SEG, modeOf, blanked, stepMenus, A2_KEYS } from './a2-kit.js';
import { q, linT, mcqV, R, pickW } from './analyse2-f-kit.js';
import { blankLine } from '../../judges/lines.js';
import { parse } from '../../cas/parse.js';
import { stripParen } from '../../cas/ast.js';

const SK = 'a2-triple-int';
const XYZ = { vars: ['x', 'y', 'z'] };
const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
const qt = (x) => String(x);

// x^i·y^j·z^k as text ('' for 1).
const mono = (i, j, k) => [[i, 'x'], [j, 'y'], [k, 'z']].filter(([e]) => e > 0).map(([e, v]) => (e === 1 ? v : `${v}^${e}`)).join(' ');
// c·body: 3x^2, (1/6)(1-x)^3, (1-x)^3/6.
function cBody(c, body) {
  const C = q(c);
  if (!body) return qt(C);
  if (C.eq(1)) return body;
  if (C.d === 1) return `${C.n}${body}`;
  return C.n === 1 ? `${body}/${C.d}` : `(${C})${body}`;
}
const pw = (base, n) => (n === 1 ? `(${base})` : `(${base})^${n}`);
// 1 − x/a as text.
const oneMinus = (a) => (a === 1 ? '1-x' : `1-x/${a}`);

// ---------- polynomials in x, y (family « under a plane ») ----------
const P = (terms) => { const m = new Map(); for (const [c, i, j] of terms) m.set(`${i},${j}`, (m.get(`${i},${j}`) || q(0)).add(q(c))); return m; };
function pmul(A, B) {
  const out = new Map();
  for (const [ka, ca] of A) for (const [kb, cb] of B) {
    const [i1, j1] = ka.split(',').map(Number);
    const [i2, j2] = kb.split(',').map(Number);
    const k = `${i1 + i2},${j1 + j2}`;
    out.set(k, (out.get(k) || q(0)).add(ca.mul(cb)));
  }
  return out;
}
const ppow = (A, n) => { let r = P([[1, 0, 0]]); for (let k = 0; k < n; k++) r = pmul(r, A); return r; };
// ∫ from 0 to b in y → a polynomial in x: [[coef, i]].
function intY(A, b) {
  const out = new Map();
  for (const [key, c] of A) {
    const [i, j] = key.split(',').map(Number);
    out.set(i, (out.get(i) || q(0)).add(c.mul(q(b).pow(j + 1)).div(j + 1)));
  }
  return [...out].filter(([, c]) => c.n !== 0).sort((u, v) => v[0] - u[0]).map(([i, c]) => [c, i]);
}
const intX = (terms, a) => terms.reduce((s, [c, i]) => s.add(c.mul(q(a).pow(i + 1)).div(i + 1)), q(0));
const polyXText = (terms) => linT(terms.map(([c, i]) => [c, i === 0 ? '' : i === 1 ? 'x' : `x^${i}`]));

// ---------- the domains ----------
// {kind, region, box, bounds (line x, y, z), integrand, inner, middle,
//  value (Q), zTop (text), proj (text)}
function tripleData(rng) {
  const kind = pickW(rng, [[4, 'simplex'], [2, 'prism'], [2, 'plane']]);
  if (kind === 'simplex') {
    const one = rng.chance(0.6);
    const [a, b, c] = one ? [1, 1, 1] : [rng.int(1, 3), rng.int(1, 3), rng.int(1, 3)];
    const [i, j, k] = rng.pick([[0, 0, 0], [0, 0, 1], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 2], [1, 0, 1], [2, 0, 0], [0, 1, 1]]);
    const Yt = linT([[b, ''], [q(-b, a), 'x']]);
    const Zt = linT([[c, ''], [q(-c, a), 'x'], [q(-c, b), 'y']]);
    const K = q(c ** (k + 1) * b ** (j + 1) * fact(j) * fact(k), fact(j + k + 2));
    const n = j + k + 2;
    const value = q(a ** (i + 1)).mul(K).mul(q(fact(i) * fact(n), fact(i + n + 1)));
    const same = a === b && b === c;
    const plane = same ? 'x+y+z' : [[a, 'x'], [b, 'y'], [c, 'z']].map(([d, v]) => (d === 1 ? v : `${v}/${d}`)).join('+');
    const rhs = same ? a : 1;
    return {
      kind, region: ['x ≥ 0', 'y ≥ 0', 'z ≥ 0', `${plane} ≤ ${rhs}`], ranges: [[0, a], [0, b], [0, c]],
      bounds: `0 ≤ x ≤ ${a} ; 0 ≤ y ≤ ${Yt} ; 0 ≤ z ≤ ${Zt}`, f: mono(i, j, k) || '1', Yt, Zt, a,
      inner: `int(int(${cBody(q(1, k + 1), [mono(i, j, 0), pw(Zt, k + 1)].filter(Boolean).join(' '))},y,0,${Yt}),x,0,${a})`,
      middle: `int(${cBody(K, [mono(i, 0, 0), pw(oneMinus(a), n)].filter(Boolean).join(' '))},x,0,${a})`,
      value, words: `le tétraèdre x, y, z ≥ 0, ${R(plane)} ≤ ${rhs}`, zWhy: `z va du sol au plan ${R(plane)} = ${rhs}`,
    };
  }
  if (kind === 'prism') {
    const [a, b] = [rng.int(1, 3), rng.int(1, 3)];
    const h = rng.int(1, 3);
    const [i, j, k] = rng.pick([[0, 0, 0], [0, 0, 1], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 2], [1, 0, 1]]);
    const Yt = linT([[b, ''], [q(-b, a), 'x']]);
    const K1 = q(h ** (k + 1), k + 1);
    const K = K1.mul(q(b ** (j + 1), j + 1));
    const n = j + 1;
    const value = q(a ** (i + 1)).mul(K).mul(q(fact(i) * fact(n), fact(i + n + 1)));
    const tri = [[a, 'x'], [b, 'y']].map(([d, v]) => (d === 1 ? v : `${v}/${d}`)).join('+');
    return {
      kind, region: ['x ≥ 0', 'y ≥ 0', `${tri} ≤ 1`, 'z ≥ 0', `z ≤ ${h}`], ranges: [[0, a], [0, b], [0, h]],
      bounds: `0 ≤ x ≤ ${a} ; 0 ≤ y ≤ ${Yt} ; 0 ≤ z ≤ ${h}`, f: mono(i, j, k) || '1', Yt, Zt: String(h), a,
      inner: `int(int(${cBody(K1, mono(i, j, 0))},y,0,${Yt}),x,0,${a})`,
      middle: `int(${cBody(K, [mono(i, 0, 0), pw(oneMinus(a), n)].filter(Boolean).join(' '))},x,0,${a})`,
      value, words: `le prisme de hauteur ${h} sur le triangle x, y ≥ 0, ${R(tri)} ≤ 1`, zWhy: `z va de 0 à ${h}`,
    };
  }
  const [a, b] = [rng.int(1, 2), rng.int(1, 3)];
  const p0 = rng.int(1, 3);
  const [r, s] = rng.pick([[1, 0], [0, 1], [1, 1], [2, 0], [0, 2], [1, 2], [2, 1]]);
  const [i, j, k] = rng.pick([[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]]);
  const Zt = linT([[p0, ''], [r, 'x'], [s, 'y']]);
  const Zp = P([[p0, 0, 0], [r, 1, 0], [s, 0, 1]]);
  const innerP = pmul(P([[q(1, k + 1), i, j]]), ppow(Zp, k + 1));
  const mid = intY(innerP, b);
  return {
    kind, region: [`0 ≤ x ≤ ${a}`, `0 ≤ y ≤ ${b}`, 'z ≥ 0', `z ≤ ${Zt}`], ranges: [[0, a], [0, b], [0, p0 + r * a + s * b]],
    bounds: `0 ≤ x ≤ ${a} ; 0 ≤ y ≤ ${b} ; 0 ≤ z ≤ ${Zt}`, f: mono(i, j, k) || '1', Yt: String(b), Zt, a,
    inner: `int(int(${cBody(q(1, k + 1), [mono(i, j, 0), pw(Zt, k + 1)].filter(Boolean).join(' '))},y,0,${b}),x,0,${a})`,
    middle: `int(${polyXText(mid)},x,0,${a})`,
    value: intX(mid, a), words: `le solide au-dessus du rectangle [0 ; ${a}] × [0 ; ${b}] et sous le plan z = ${R(Zt)}`, zWhy: `z va de 0 au plan z = ${R(Zt)}`,
  };
}
const boxOf = (ranges) => ranges.map(([lo, hi]) => { const m = 0.1 * (hi - lo) + 0.1; return [lo - m, hi + m]; });
const tripleOf = (d) => {
  const [cx, cy, cz] = d.bounds.split(';').map((c) => c.split('≤').map((s) => s.trim()));
  return `int(int(int(${d.f},z,${cz[0]},${cz[2]}),y,${cy[0]},${cy[2]}),x,${cx[0]},${cx[2]})`;
};

const SUB = [
  { id: 'bounds', label: 'les bornes (tranches en z, projection)', skill: SK },
  { id: 'inner', label: 'l\'intégrale en z', skill: 'a1-int-direct' },
  { id: 'middle', label: 'l\'intégrale en y', skill: 'a1-int-direct' },
  { id: 'outer', label: 'l\'intégrale en x', skill: 'a1-int-direct' },
];
const CHOICES = [
  { id: 'bounds', label: 'z entre deux surfaces, puis la projection sur le plan (x, y)' },
  { id: 'inner', label: 'Intégrer en z' },
  { id: 'middle', label: 'Intégrer en y' },
  { id: 'outer', label: 'Intégrer en x' },
  { id: 'outerFirst', label: 'Intégrer d\'abord en x de 0 à 1', rule: 'a2_fubini_outer_var', why: 'L\'intégrale extérieure doit donner un nombre : on intègre d\'abord la variable intérieure.' },
];

// The bounds of z blank, or the whole projection.
function blankZ(line, which) {
  const node = parse(line.math, XYZ);
  const items = stripParen(node).items;
  const holes = which.map(([c, side]) => stripParen(items[c]).items[side === 'lo' ? 0 : 2]);
  return { ...line, ...blankLine(node, holes, XYZ) };
}

function tripleItem(level, rng, opts) {
  const d = tripleData(rng);
  const value = qt(d.value);
  const T = tripleOf(d);
  const dom = {
    kind: 'domain', coords: 'cart', vars: ['x', 'y', 'z'], dim: 3, region: d.region, box: boxOf(d.ranges),
    order: ['x', 'y', 'z'], shape: 'typeI3', answers: [d.bounds],
  };
  const def = { kind: 'definite', seq: { I: value }, nRange: [1, 1] };
  let bl = E(d.bounds, 'z entre deux surfaces ; projection', 'bounds', 'bounds');

  let inner = E(d.inner, 'Intégrale en z', 'inner', 'inner');
  let middle = E(d.middle, 'Intégrale en y', 'middle', 'middle');
  const outer = E(value, 'Intégrale en x', 'outer', 'outer');
  const innerF = d.inner.match(/^int\(int\((.*),y,[^,]*,[^,]*\),x,[^,]*,[^,]*\)$/)[1];
  const middleF = d.middle.match(/^int\((.*),x,[^,]*,[^,]*\)$/)[1];
  if (level === 1) { inner = blanked(inner, [innerF]); middle = blanked(middle, [middleF]); }
  if (level === 2) { bl = blankZ(bl, [[2, 'hi']]); middle = blanked(middle, [middleF]); }
  const dec = {
    kind: 'decision', prompt: 'Quelle variable à l\'intérieur ?', options: [
      { id: 'z', label: `z : ${d.zWhy}`, valid: true, ref: true },
      { id: 'x', label: 'x', valid: true, quality: 'poor', why: 'Possible, mais la projection sur le plan (y, z) est moins simple : z est bornée par deux surfaces simples.' },
    ],
  };
  const parts = [];
  if (level >= 2) parts.push({ start: d.region.join(' ; '), judge: dom, lines: [bl], pre: level === 3 ? [dec] : [] });
  parts.push({ html: `Calcule I<sub>D</sub> = ${MT(T)}, de l'intérieur vers l'extérieur (d'abord en z) :`, ask: 'I =', start: 'I_D', judge: def, lines: [inner, middle, outer] });
  const [first, ...rest] = parts;
  const menuOf = (p) => (level === 3 ? { ...p.judge, menus: stepMenus(p.start, p.lines, CHOICES) } : p.judge);
  const script = [...(first.pre || []), ...first.lines];
  for (const p of rest) script.push(SEG(p.html, p.ask, p.start, menuOf(p)), ...(p.pre || []), ...p.lines);
  const D = `D = {(x, y, z) : ${d.region.map(R).join(', ')}}`;
  const given = level === 1 ? ` Les bornes sont ${MT(d.bounds, XYZ)}.` : ' Écris d\'abord les bornes : x à l\'extérieur, puis y, puis z.';
  return linesItem({
    skill: SK, level, mode: modeOf(level), start: first.start, judge: menuOf(first), script,
    prompt: `Calcule I<sub>D</sub> = ∭<sub>D</sub> ${d.f === '1' ? '' : MT(d.f)} dV, où D est ${d.words} : ${D}.${given}`,
    hints: H(`En z : ${d.zWhy} ; ensuite, (x, y) parcourt la projection de D sur le plan (x, y), décrite comme en 2D.`,
      `${MT(d.bounds, XYZ)}, puis ${MT(d.inner)}`, `= ${MT(d.middle)} = ${MT(value)}`),
    subgoals: SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${d.kind}:${d.bounds}:${d.f}`, exam: examTag(opts), baits: ['a2_fubini_outer_var'],
  });
}

// ---------- 2019 Q4: the simplex of side a, a result c·aⁿ ----------
function aText(C, p) {
  const body = p === 1 ? 'a' : `a^${p}`;
  if (C.eq(1)) return body;
  return C.n === 1 ? `${body}/${C.d}` : C.d === 1 ? `${C.n}${body}` : `${C.n}${body}/${C.d}`;
}
function tripleMcq(rng, opts, level) {
  const [i, j, k] = rng.pick([[0, 0, 0], [1, 0, 0], [0, 0, 1], [1, 1, 0], [0, 0, 2], [1, 0, 1], [1, 1, 1], [2, 0, 0], [0, 1, 1]]);
  const n = i + j + k;
  const C = q(fact(i) * fact(j) * fact(k), fact(n + 3));
  const p = n + 3;
  const f = mono(i, j, k) || '1';
  // Values at a = 1,7 (options compared as functions of a).
  const at = (c, e) => c.valueOf() * 1.7 ** e;
  const wrongs = [
    { html: MT(aText(C, p - 1)), x: at(C, p - 1) },
    { html: MT(aText(C, p + 1)), x: at(C, p + 1) },
    { html: MT(aText(C.mul(2), p)), x: at(C.mul(2), p) },
    { html: MT(aText(C.mul(n + 3), p)), x: at(C.mul(n + 3), p) },
    { html: MT(aText(C.div(2), p)), x: at(C.div(2), p) },
    { html: MT(cBody(C, `(a-x)^${p}`)), x: null, rule: 'a2_fubini_outer_var' },
  ];
  return mcqV({
    skill: SK, level, prompt: `Soit a > 0 et T<sub>a</sub> = {(x, y, z) : x, y, z ≥ 0, x + y + z ≤ a}. Que vaut ∭<sub>T<sub>a</sub></sub> ${f === '1' ? '' : MT(f)} dV ?`,
    right: { html: MT(aText(C, p)), x: at(C, p) }, wrongs: [wrongs[5], ...rng.shuffle(wrongs.slice(0, 5))],
    key: `${SK}:mcq:${f}`, expectedSec: 240, exam: examTag(opts) || false,
    solution: [{ html: `Bornes : ${MT('0 ≤ x ≤ a ; 0 ≤ y ≤ a-x ; 0 ≤ z ≤ a-x-y', { vars: ['x', 'y', 'z', 'a'] })}. Chaque intégration ajoute 1 au degré en a : le résultat est ${MT(aText(C, p))} (degré ${n} + 3).`, note: '' }],
  }, rng);
}

export function tripleInt(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq' || level === 5) return tripleMcq(rng, opts, opts.exam ? 4 : 5);
  return tripleItem(level, rng, opts);
}

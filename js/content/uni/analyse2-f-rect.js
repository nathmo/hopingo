// a2-fubini-rect (module A2, part f, step U6): a double integral on a
// rectangle, as a product of two simple integrals, or in the good order
// (x·e^(xy): y first), and the symmetries (V/F). Judge `definite`: the
// lines are iterated integrals, brackets and numbers (quadrature).

import { MT, linesItem, examTag, H, E, modeOf, blanked, partsScript, withMenus } from './a2-kit.js';
import { A2_KEYS } from './a2-kit.js';
import { problemItem } from './kit-problem.js';
import { q, val, vRat, vMul, vAdd, vText, vFloat, vRatOf, swapXY, mcqV, vfMcq, R, pickW } from './analyse2-f-kit.js';

const SK = 'a2-fubini-rect';
const SUB = [
  { id: 'separate', label: 'séparer en produit (ou choisir l\'ordre)', skill: SK },
  { id: 'integrate', label: 'intégrer chaque facteur', skill: 'a1-int-direct' },
  { id: 'combine', label: 'le résultat', skill: SK },
];
// The start line is I_D, the integral of the prompt (seq of the definite
// judge): the student writes it in the order he chooses, and the traps of
// one-variable integrals do not replay on a nested integral.
export const defI = (text) => ({ kind: 'definite', seq: { I: text }, nRange: [1, 1] });
export const I_D = 'I_D';

// ---------- one-variable integrals ∫ₐᵇ g(t) dt ----------
// {f(v), F(v) primitive, a, b, V exact value, W value with a classic slip
// in the primitive, odd: g odd, den: the denominator of g = 1/den}
const ONE = [];
for (const B of [1, 2, 3]) {
  for (const k of [1, 2, 3]) {
    if (k === 3 && B === 3) continue;
    ONE.push({
      id: `p${k}:${B}`, f: (v) => (k === 1 ? v : `${v}^${k}`), F: (v) => `${v}^${k + 1}/${k + 1}`, a: '0', b: String(B),
      V: vRat(q(B ** (k + 1), k + 1)), W: vRat(q(B ** (k + 1))), odd: k % 2 === 1, poly: true,
    });
  }
}
ONE.push(
  { id: 'cos', f: (v) => `cos(${v})`, F: (v) => `sin(${v})`, a: '0', b: 'π/2', V: vRat(1), W: vRat(-1) },
  { id: 'sin', f: (v) => `sin(${v})`, F: (v) => `-cos(${v})`, a: '0', b: 'π', V: vRat(2), W: vRat(-2), odd: true },
  { id: 'sin2', f: (v) => `sin(${v})`, F: (v) => `-cos(${v})`, a: '0', b: 'π/2', V: vRat(1), W: vRat(-1), odd: true },
  { id: 'sin2t', f: (v) => `sin(2${v})`, F: (v) => `-cos(2${v})/2`, a: '0', b: 'π/2', V: vRat(1), W: vRat(2), odd: true },
  { id: 'cos2t', f: (v) => `cos(2${v})`, F: (v) => `sin(2${v})/2`, a: '0', b: 'π/4', V: vRat(q(1, 2)), W: vRat(1) },
  { id: 'exp', f: (v) => `e^${v}`, F: (v) => `e^${v}`, a: '0', b: '1', V: val([1, 'e'], [-1]), W: val([1, 'e']), trans: true },
  { id: 'expln2', f: (v) => `e^${v}`, F: (v) => `e^${v}`, a: '0', b: 'ln(2)', V: vRat(1), W: vRat(2) },
  { id: 'expln3', f: (v) => `e^${v}`, F: (v) => `e^${v}`, a: '0', b: 'ln(3)', V: vRat(2), W: vRat(3) },
  { id: 'exp2', f: (v) => `e^(2${v})`, F: (v) => `e^(2${v})/2`, a: '0', b: '1', V: val([q(1, 2), 'e^2'], [q(-1, 2)]), W: val([1, 'e^2'], [-1]), trans: true },
  { id: 'gauss', f: (v) => `${v}e^(${v}^2)`, F: (v) => `e^(${v}^2)/2`, a: '0', b: '1', V: val([q(1, 2), 'e'], [q(-1, 2)]), W: val([1, 'e'], [-1]), trans: true, odd: true },
  { id: 'atan', f: (v) => `1/(1+${v}^2)`, den: (v) => `1+${v}^2`, F: (v) => `arctan(${v})`, a: '0', b: '1', V: val([q(1, 4), 'π']), W: val([q(1, 2), 'ln(2)']), trans: true },
  { id: 'inv', f: (v) => `1/${v}`, den: (v) => v, F: (v) => `ln(${v})`, a: '1', b: '2', V: val([1, 'ln(2)']), W: vRat(q(3, 4)), trans: true },
  { id: 'inve', f: (v) => `1/${v}`, den: (v) => v, F: (v) => `ln(${v})`, a: '1', b: 'e', V: vRat(1), W: val([1, 'e'], [-1]) },
);

// g(x)·h(y) as text: the denominators together, a power of a letter first.
function product(g, h) {
  const nums = [g, h].filter((p) => !p.den).map((p) => p.text);
  const dens = [g, h].filter((p) => p.den).map((p) => p.denText);
  nums.sort((s, t) => (/^[xy](\^\d)?$/.test(t) ? 1 : 0) - (/^[xy](\^\d)?$/.test(s) ? 1 : 0));
  const top = nums.length ? nums.join('×') : '1';
  if (!dens.length) return top;
  const wrap = (d) => (/^[a-z]$/.test(d) ? d : `(${d})`);
  return `${nums.length === 1 && !nums[0].includes('×') ? top : nums.length ? `(${top})` : '1'}/${dens.length === 1 ? wrap(dens[0]) : `(${dens.map(wrap).join('×')})`}`;
}

// A separable integral: {g, h (families), f text, value…}.
function sepData(rng) {
  for (let i = 0; i < 200; i++) {
    const g = rng.pick(ONE);
    const h = rng.pick(ONE);
    if (g.trans && h.trans) continue;
    if (g.id === h.id && rng.chance(0.7)) continue;
    const V = vMul(g.V, h.V);
    if (!V) continue;
    return { g, h, V };
  }
  return { g: ONE.find((o) => o.id === 'p1:1'), h: ONE.find((o) => o.id === 'p1:1'), V: vRat(q(1, 4)), fallback: true };
}

function sepTexts(d, inner) {
  const gx = { text: d.g.f('x'), den: !!d.g.den, denText: d.g.den?.('x') };
  const hy = { text: d.h.f('y'), den: !!d.h.den, denText: d.h.den?.('y') };
  const f = product(gx, hy);
  const Ix = `int(${d.g.f('x')},x,${d.g.a},${d.g.b})`;
  const Iy = `int(${d.h.f('y')},y,${d.h.a},${d.h.b})`;
  const start = inner === 'y' ? `int(int(${f},y,${d.h.a},${d.h.b}),x,${d.g.a},${d.g.b})` : `int(int(${f},x,${d.g.a},${d.g.b}),y,${d.h.a},${d.h.b})`;
  const brk = `bracket(${d.g.F('x')},x,${d.g.a},${d.g.b})×bracket(${d.h.F('y')},y,${d.h.a},${d.h.b})`;
  return { f, Ix, Iy, start, brk, value: vText(d.V) };
}
const rect = (d) => `[${R(d.g.a)} ; ${R(d.g.b)}] × [${R(d.h.a)} ; ${R(d.h.b)}]`;

const CHOICES = [
  { id: 'prod', label: 'f = g(x)·h(y) sur un rectangle : produit de deux intégrales' },
  { id: 'swap', label: 'Échanger l\'ordre d\'intégration (Fubini)' },
  { id: 'inner', label: 'Intégrer l\'intégrale intérieure' },
  { id: 'prim', label: 'Primitives, puis crochets' },
  { id: 'calc', label: 'Calculer le nombre' },
  { id: 'sym', label: 'Symétrie : l\'intégrale vaut 0', rule: 'a2_symmetry_wrong', why: 'Le domaine n\'est pas symétrique par rapport à un axe où f est impaire : aucune symétrie ne s\'applique.' },
];

function sepItem(level, rng, opts) {
  const d = sepData(rng);
  const inner = rng.chance(0.5) ? 'y' : 'x';
  const t = sepTexts(d, inner);
  let lines = [
    E(`${t.Ix}×${t.Iy}`, 'Rectangle et f = g(x)·h(y) : produit', 'separate', 'prod'),
    E(t.brk, 'Primitives', 'integrate', 'prim'),
    E(t.value, 'Calculer', 'combine', 'calc'),
  ];
  if (level === 1) lines = [blanked(lines[0], [d.h.f('y')]), blanked(lines[1], [d.h.F('y')]), lines[2]];
  if (level === 2) lines = [blanked(lines[0], [d.g.f('x'), d.h.f('y')]), blanked(lines[1], [d.g.F('x'), d.h.F('y')]), lines[2]];
  const judge = withMenus(defI(t.start), level, I_D, lines, CHOICES);
  const note = level === 1 ? `<br>Ici f(x, y) = ${MT(d.g.f('x'))} · ${MT(d.h.f('y'))} : c'est un produit.` : '';
  return linesItem({
    skill: SK, level, mode: modeOf(level), start: I_D, judge, script: lines,
    prompt: `Calcule I<sub>D</sub> = ${MT(t.start)}, l'intégrale de f(x, y) = ${MT(t.f)} sur le rectangle ${rect(d)}.${note}`,
    hints: H('f est un produit g(x)·h(y) et le domaine est un rectangle : l\'intégrale double est le produit de deux intégrales simples.',
      `= ${MT(t.Ix)} · ${MT(t.Iy)}`, `= ${MT(t.brk)} = ${MT(t.value)}`),
    subgoals: SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:sep:${t.start}`, exam: examTag(opts), fallback: !!d.fallback,
    baits: level === 3 ? ['a2_symmetry_wrong'] : undefined,
  });
}

// ---------- not separable: one order is easy ----------
// x·e^(xy) on [0 ; 1] × [0 ; B]: in y first, immediate; in x first, by parts.
function orderData(rng) {
  const kind = rng.pick(['xe', 'xe', 'yc']);
  if (kind === 'xe') {
    const B = rng.pick([1, 2]);
    return {
      f: 'x e^(x y)', good: 'y', bad: 'x', x: ['0', '1'], y: ['0', String(B)],
      after: B === 1 ? 'e^x-1' : 'e^(2x)-1', prim: B === 1 ? 'e^x-x' : 'e^(2x)/2-x', outer: 'x',
      value: B === 1 ? 'e-2' : 'e^2/2-3/2',
    };
  }
  const c = rng.pick(['π/2', 'π']);
  return {
    f: 'y cos(x y)', good: 'x', bad: 'y', x: ['0', c], y: ['0', '1'],
    after: c === 'π' ? 'sin(π y)' : 'sin(π y/2)', prim: c === 'π' ? '-cos(π y)/π' : '-2cos(π y/2)/π', outer: 'y',
    value: '2/π', parts: 'y·cos(xy) en y demande une intégration par parties',
  };
}

function orderItem(level, rng, opts) {
  const d0 = orderData(rng);
  const mirror = rng.chance(0.5);
  const S = (t) => (mirror ? swapXY(t) : t);
  const d = { ...d0, f: S(d0.f), good: S(d0.good), bad: S(d0.bad), after: S(d0.after), prim: S(d0.prim), outer: S(d0.outer) };
  const B = mirror ? { x: d0.y, y: d0.x } : { x: d0.x, y: d0.y };
  const inner = (v) => `int(${d.f},${v},${B[v][0]},${B[v][1]})`;
  const start = `int(${inner(d.bad)},${d.good},${B[d.good][0]},${B[d.good][1]})`;
  const swapped = `int(${inner(d.good)},${d.bad},${B[d.bad][0]},${B[d.bad][1]})`;
  const o = d.outer;
  const parts = `${MT(d.f)} en ${d.bad} demande une intégration par parties`;
  let lines = [
    E(swapped, `Rectangle : on peut intégrer d'abord en ${d.good}`, 'separate', 'swap'),
    E(`int(${d.after},${o},${B[o][0]},${B[o][1]})`, `Intégrale en ${d.good}`, 'integrate', 'inner'),
    E(`bracket(${d.prim},${o},${B[o][0]},${B[o][1]})`, 'Primitive', 'integrate', 'prim'),
    E(d.value, 'Calculer', 'combine', 'calc'),
  ];
  if (level === 2) lines[1] = blanked(lines[1], [d.after]);
  const decision = {
    kind: 'decision', prompt: 'Dans quel ordre intégrer ?', options: [
      { id: 'good', label: `D'abord en ${d.good}`, valid: true, ref: true },
      { id: 'bad', label: `D'abord en ${d.bad}, tel quel`, valid: true, quality: 'poor', why: `Juste, mais ${parts} ; en ${d.good} d'abord, c'est immédiat.` },
    ],
  };
  const script = level === 2 || level === 3 ? [decision, ...lines] : lines;
  const judge = withMenus(defI(start), level, I_D, lines, CHOICES);
  return linesItem({
    skill: SK, level, mode: modeOf(level), start: I_D, judge, script,
    prompt: `Calcule I<sub>D</sub> = ${MT(start)}. Le domaine est le rectangle [${R(B.x[0])} ; ${R(B.x[1])}] × [${R(B.y[0])} ; ${R(B.y[1])}] : choisis l'ordre qui évite les calculs.`,
    hints: H(`Sur un rectangle, Fubini permet d'intégrer dans l'ordre qu'on veut. L'intégrale de ${parts} ; en ${d.good}, c'est immédiat.`,
      `= ${MT(swapped)} = ${MT(`int(${d.after},${o},${B[o][0]},${B[o][1]})`)}`, `= ${MT(lines[2].math)} = ${MT(d.value)}`),
    subgoals: SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:order:${start}`, exam: examTag(opts),
  });
}

// ---------- symmetries (V/F) ----------
const ODD_Y = ['x y', 'y^3 e^x', 'x^2 y', 'y e^(x^2)', 'x^2 sin(y)', 'sin(x y)'];
const EVEN_Y = ['x^2+y^2', 'x y^2', 'y^2 e^x', '1+x^2 y^2', 'e^(x y^2)'];
const neg = (c) => `−${c}`;

// One statement: {statement, truth, why, ruleIfTrue, key}.
export function symStatement(rng, want) {
  const kind = want ?? pickW(rng, [[3, 'oddSym'], [3, 'oddNotSym'], [2, 'evenSym'], [2, 'disk'], [1, 'ball']]);
  const b = rng.pick([1, 2]);
  const c = rng.pick([1, 2]);
  const inX = rng.chance(0.4);
  const S = (t) => (inX ? swapXY(t) : t);
  const v = inX ? 'x' : 'y';
  const box = (sym) => (inX ? `[${sym ? neg(c) : 0} ; ${c}] × [0 ; ${b}]` : `[0 ; ${b}] × [${sym ? neg(c) : 0} ; ${c}]`);
  if (kind === 'oddSym' || kind === 'oddNotSym') {
    let f = rng.pick(ODD_Y);
    if (f === 'sin(x y)' && b * c > 3) f = 'x y';
    const sym = kind === 'oddSym';
    const F = S(f);
    return {
      kind, truth: sym, ruleIfTrue: sym ? null : 'a2_symmetry_wrong', key: `${kind}:${F}:${b}:${c}`,
      statement: `∬<sub>D</sub> ${MT(F)} dx dy = 0, où D = ${box(sym)}`,
      why: sym ? `f change de signe quand ${v} devient −${v} (impaire en ${v}), et D est symétrique par rapport à ${v} = 0 : les deux moitiés se compensent.`
        : `f est impaire en ${v}, mais D va de 0 à ${c} en ${v} : il n'est pas symétrique. Ici f > 0 à l'intérieur de D, donc l'intégrale est strictement positive.`,
      ctx: { f: R(F), v, a: '0', b: String(c) },
    };
  }
  if (kind === 'evenSym') {
    const F = S(rng.pick(EVEN_Y));
    return {
      kind, truth: false, ruleIfTrue: null, key: `${kind}:${F}:${b}:${c}`,
      statement: `∬<sub>D</sub> ${MT(F)} dx dy = 0, où D = ${box(true)}`,
      why: `D est symétrique, mais f est paire en ${v} (elle ne change pas quand ${v} devient −${v}) : rien ne se compense. Ici f > 0 sur D, donc l'intégrale est > 0.`,
    };
  }
  if (kind === 'disk') {
    const f = rng.pick(['x+y', 'x y^2', 'x^3+y', 'x y', 'y e^(x^2)', 'x cos(y)']);
    const Rr = rng.pick([1, 2, 3]);
    return {
      kind, truth: true, key: `${kind}:${f}:${Rr}`,
      statement: `∬<sub>D</sub> ${MT(f)} dx dy = 0, où D est le disque x² + y² ≤ ${Rr * Rr}`,
      why: 'Le disque est symétrique par rapport aux deux axes. Chaque terme de f est impair en x ou impair en y : son intégrale est nulle.',
    };
  }
  const g = rng.pick(['z/(x^2+y^2+z^2+1)', 'z^3', 'x z^2', 'z e^(x^2+y^2)', 'y/(1+z^2)']);
  const k = rng.pick([8, 6, 10]);
  return {
    kind, truth: false, key: `${kind}:${g}:${k}`,
    statement: `∭<sub>B</sub> ${MT(g)} dV ≥ π/${k}, où B est la boule unité x² + y² + z² ≤ 1`,
    why: 'La boule est symétrique et l\'intégrande est impair en une variable : l\'intégrale vaut 0, qui n\'est pas ≥ π/' + k + '.',
  };
}

function symMcq(rng, level, exam, want) {
  const s = symStatement(rng, want);
  return vfMcq({ skill: SK, level, statement: s.statement, truth: s.truth, key: s.key, why: s.why, ruleIfTrue: s.ruleIfTrue, exam }, rng);
}

// ---------- multiple choice: the exact value ----------
function valueMcq(rng, opts) {
  for (let i = 0; i < 200; i++) {
    const d = sepData(rng);
    if (d.fallback) break;
    const t = sepTexts(d, 'y');
    const x = vFloat(d.V);
    const wrongs = [];
    // The odd factor on a domain that is not symmetric: « 0 ».
    if ((d.g.odd && d.g.a === '0') || (d.h.odd && d.h.a === '0')) wrongs.push({ html: MT('0'), x: 0, rule: 'a2_symmetry_wrong' });
    for (const W of [vMul(d.g.W, d.h.V), vMul(d.g.V, d.h.W)]) if (W) wrongs.push({ html: MT(vText(W)), x: vFloat(W) });
    const sum = vAdd(d.g.V, d.h.V);
    wrongs.push({ html: MT(vText(sum)), x: vFloat(sum) });
    const ratG = vRatOf(d.g.V);
    if (ratG) { const W = vMul(vRat(ratG.mul(2)), d.h.V); wrongs.push({ html: MT(vText(W)), x: vFloat(W) }); }
    const it = mcqV({
      skill: SK, level: 4, prompt: `Que vaut ${MT(t.start)} ?`, right: { html: MT(t.value), x }, wrongs: rng.shuffle(wrongs),
      key: `${SK}:mcq:${t.start}`, expectedSec: 150, exam: examTag(opts) || false,
      solution: [{ html: `f est un produit sur un rectangle : ${MT(`${t.Ix}×${t.Iy}`)} = ${MT(t.value)}.`, note: '' }],
    }, rng);
    if (it) return it;
  }
  return mcqV({
    skill: SK, level: 4, prompt: `Que vaut ${MT('int(int(x y,y,0,1),x,0,1)')} ?`, right: { html: MT('1/4'), x: 0.25 },
    wrongs: [{ html: MT('1/2'), x: 0.5 }, { html: MT('1'), x: 1 }, { html: MT('0'), x: 0, rule: 'a2_symmetry_wrong' }],
    key: `${SK}:mcq:fallback`, exam: examTag(opts) || false, fallback: true,
  }, rng);
}

// ---------- level 5: three V/F, then a computation ----------
function soloProblem(rng, opts) {
  const kinds = rng.shuffle(['oddSym', 'oddNotSym', rng.pick(['evenSym', 'disk', 'ball'])]);
  const vfs = kinds.map((k) => ({ item: symMcq(rng, 5, false, k), points: 1, title: 'Symétrie : vrai ou faux ?' }));
  const calc = rng.chance(0.7) ? sepItem(5, rng, {}) : orderItem(5, rng, {});
  return problemItem({
    skill: SK, level: 5, prompt: 'Trois énoncés de symétrie, puis un calcul d\'intégrale double.',
    parts: [...vfs, { item: calc, points: 3, title: 'Calcul' }],
    key: `5:${vfs.map((v) => v.item.key).join('|')}:${calc.key}`, exam: examTag(opts),
  });
}

export function fubiniRect(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return valueMcq(rng, opts);
  if (opts.exam === 'tf') return symMcq(rng, 4, { format: 'tf', points: 1 });
  if (level === 5) return soloProblem(rng, opts);
  if (level === 1) return sepItem(1, rng, opts);
  return rng.chance(level === 3 ? 0.4 : 0.3) ? orderItem(level, rng, opts) : sepItem(level, rng, opts);
}

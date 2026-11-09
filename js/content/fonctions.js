// Functions: reading a graph, tables of values, placing points, linear and
// affine functions, from expression to graph and back, intersections.

import { answerItem, mcqItem } from './items.js';
import { algHtml } from '../math/algebra.js';
import { graphSvg } from '../math/graph.js';

const nz = (rng, lo, hi) => { for (;;) { const x = rng.int(lo, hi); if (x !== 0) return x; } };
const show = (x) => String(x).replace('-', '−');
const lin = (a, b) => `${a === 1 ? '' : a === -1 ? '-' : a}x${b ? (b < 0 ? `-${-b}` : `+${b}`) : ''}`;
const fig = (spec) => `<div class="graph-box">${graphSvg(spec)}</div>`;

// An affine function whose graph passes through grid points in view.
function affine(rng, { linear = false, maxA = 3 } = {}) {
  for (;;) {
    const a = nz(rng, -maxA, maxA);
    const b = linear ? 0 : nz(rng, -4, 4);
    if (Math.abs(b) <= 4) return { a, b };
  }
}

export const GEN = {};

// ---------- Lire un graphique ----------

GEN['fn-read'] = (level, rng) => {
  const { a, b } = affine(rng, { maxA: level <= 2 ? 2 : 3 });
  let x;
  do { x = rng.int(-3, 3); } while (Math.abs(a * x + b) > 5);
  const y = a * x + b;
  if (level <= 3) {
    return answerItem('fn-read', level, `Voici le graphique d'une fonction f. Que vaut f(${show(x)}) ?${fig({ lines: [{ a, b }] })}`, String(y), {
      keys: 'rel', signed: true, traps: y !== x ? [{ value: [x, 1], rule: 'graph_xy_swap' }] : [],
      solution: [{ html: '', note: `On part de x = ${show(x)} sur l'axe horizontal, on monte (ou descend) jusqu'à la droite, puis on lit la hauteur : ${show(y)}.` }], key: `r:${a}:${b}:${x}`,
    });
  }
  return answerItem('fn-read', level, `Voici le graphique d'une fonction f. Pour quel x a-t-on f(x) = ${show(y)} ?${fig({ lines: [{ a, b }] })}`, String(x), {
    keys: 'rel', signed: true, traps: y !== x ? [{ value: [y, 1], rule: 'graph_xy_swap' }] : [],
    solution: [{ html: '', note: `On part de y = ${show(y)} sur l'axe vertical, on va jusqu'à la droite, puis on descend lire x : ${show(x)}.` }], key: `x:${a}:${b}:${y}`,
  });
};

// ---------- Tableau de valeurs ----------

GEN['fn-table'] = (level, rng) => {
  const x = level <= 2 ? rng.int(1, 6) : nz(rng, -5, 5);
  if (level <= 3) {
    const { a, b } = affine(rng, { maxA: 5 });
    const expr = lin(a, b);
    const num = `${a}×${x < 0 ? `(${x})` : x}${b < 0 ? b : `+${b}`}`;
    return answerItem('fn-table', level, `f(x) = ${algHtml(expr)}. Calcule f(${show(x)}).`, String(a * x + b), {
      keys: 'rel', signed: true, tree: num, key: `t:${expr}:${x}`,
      solution: [{ math: num, note: `On remplace x par ${show(x)}.` }],
    });
  }
  const c = nz(rng, -5, 5);
  const k = level === 4 ? 1 : rng.int(2, 3);
  const expr = `${k === 1 ? '' : k}x^2${c < 0 ? c : `+${c}`}`;
  const num = `${k}×(${x})^2${c < 0 ? c : `+${c}`}`;
  return answerItem('fn-table', level, `f(x) = ${algHtml(expr)}. Calcule f(${show(x)}).`, String(k * x * x + c), {
    keys: 'rel', signed: true, tree: num, key: `q:${expr}:${x}`,
    solution: [{ math: num, note: `On remplace x par (${show(x)}) : le carré d'un nombre négatif est positif.` }],
  });
};

// ---------- Placer un point ----------

GEN['fn-point'] = (level, rng) => {
  let x;
  let y;
  do { x = level <= 2 ? rng.int(1, 4) : nz(rng, -4, 4); y = level <= 2 ? rng.int(1, 4) : nz(rng, -4, 4); } while (x === y);
  const onLine = level >= 4;
  const { a, b } = affine(rng, { maxA: 2 });
  const px = onLine ? rng.int(-2, 2) : x;
  const py = onLine ? a * px + b : y;
  if (onLine && Math.abs(py) > 5) return GEN['fn-point'](level, rng);
  return {
    skill: 'fn-point', level, type: 'graphpoint',
    prompt: onLine ? `Place le point de la droite d'équation ${algHtml(`y=${lin(a, b)}`)} qui a pour abscisse x = ${show(px)}.` : `Place le point A(${show(px)} ; ${show(py)}).`,
    grid: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 }, target: [px, py],
    baits: ['graph_xy_swap'], solution: [{ html: '', note: onLine ? `y = ${a} × ${show(px)} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${show(py)}` : `D'abord x = ${show(px)} (horizontal), puis y = ${show(py)} (vertical).` }],
    expectedSec: 15, key: `fn-point:${px}:${py}:${onLine}`,
  };
};

// ---------- Fonction linéaire ----------

GEN['fn-linear'] = (level, rng) => {
  const a = level <= 2 ? rng.int(2, 4) : nz(rng, -3, 3);
  if (level <= 3) {
    const x = rng.pick([1, 2]);
    return answerItem('fn-linear', level, `Ce graphique représente une fonction linéaire f(x) = a·x. Que vaut a ?${fig({ lines: [{ a, b: 0 }], points: [[x, a * x]] })}`, String(a), {
      keys: 'rel', signed: true, traps: a * x !== a ? [{ value: [a * x, 1], rule: 'slope_y_over_x' }] : [],
      solution: [{ html: '', note: `La droite passe par (0 ; 0) et (${x} ; ${show(a * x)}) : a = ${show(a * x)} ÷ ${x} = ${show(a)}.` }], key: `l:${a}:${x}`,
    });
  }
  const x = rng.int(2, 5);
  const y = a * x;
  return answerItem('fn-linear', level, `Une fonction linéaire vérifie f(${x}) = ${show(y)}. Que vaut f(${x + 1}) ?`, String(a * (x + 1)), {
    keys: 'rel', signed: true, traps: [{ value: [y + 1, 1], rule: 'additive_reasoning' }],
    solution: [{ html: '', note: `a = ${show(y)} ÷ ${x} = ${show(a)}, donc f(${x + 1}) = ${show(a)} × ${x + 1} = ${show(a * (x + 1))}.` }], key: `p:${a}:${x}`,
  });
};

// ---------- Fonction affine : de l'expression au graphique ----------

GEN['fn-affine'] = (level, rng) => {
  const { a, b } = affine(rng, { maxA: 3 });
  if (level <= 2) {
    const which = level === 1 ? 'b' : 'a';
    return answerItem('fn-affine', level, `Pour f(x) = ${algHtml(lin(a, b))}, que vaut ${which === 'a' ? 'la pente a' : 'l\'ordonnée à l\'origine b'} ?`, String(which === 'a' ? a : b), {
      keys: 'rel', signed: true, traps: [{ value: [which === 'a' ? b : a, 1], rule: 'slope_intercept_swap' }],
      solution: [{ html: algHtml(`f(x)=${lin(a, b)}`), note: 'Dans f(x) = ax + b, a est le nombre devant x (la pente) et b le nombre seul (là où la droite coupe l\'axe vertical).' }], key: `${which}:${a}:${b}`,
    });
  }
  // Which graph? The wrong graphs swap the slope and intercept, or the sign of the slope.
  const options = [
    { html: graphSvg({ lines: [{ a, b }], small: true }), correct: true },
    { html: graphSvg({ lines: [{ a: b, b: a }], small: true }), correct: false, rule: 'slope_intercept_swap' },
    { html: graphSvg({ lines: [{ a: -a, b }], small: true }), correct: false, rule: 'slope_sign' },
    { html: graphSvg({ lines: [{ a, b: -b }], small: true }), correct: false, rule: 'intercept_sign' },
  ].filter((o, i, all) => all.findIndex((p) => p.html === o.html) === i);
  return mcqItem('fn-affine', level, `Quel graphique représente f(x) = ${algHtml(lin(a, b))} ?`, options, rng, {
    solution: [{ html: '', note: `La droite coupe l'axe vertical en ${show(b)} (b), et monte de ${show(a)} quand x augmente de 1 (a).` }], key: `g:${a}:${b}`, expectedSec: 20,
  });
};

// ---------- Du graphique à l'expression ----------

GEN['fn-from-graph'] = (level, rng) => {
  const { a, b } = affine(rng, { maxA: level <= 2 ? 2 : 3, linear: level === 1 });
  return {
    skill: 'fn-from-graph', level, type: 'answer',
    prompt: `Écris l'expression de la fonction affine représentée : y = …${fig({ lines: [{ a, b }], points: [[0, b], [1, a + b]] })}`,
    expected: `y=${lin(a, b)}`, form: 'any', exact: null, tree: null, traps: [], suffix: '', figure: null,
    keys: ['7', '8', '9', 'x', 'y', '4', '5', '6', '+', '-', '1', '2', '3', '=', 'frac', 'left', '0', 'right', 'back', ''],
    baits: ['slope_intercept_swap', 'slope_sign', 'slope_inverted'],
    solution: [{ html: algHtml(`y=${lin(a, b)}`), note: `b = ${show(b)} (la droite coupe l'axe vertical en ${show(b)}) ; a = ${show(a)} (de x = 0 à x = 1, y change de ${show(a)}).` }],
    expectedSec: 45, key: `fg:${a}:${b}`,
    checker: 'isolate', variable: 'y', target: lin(a, b),
    isoTraps: [
      { expr: lin(b, a), rule: 'slope_intercept_swap' },
      { expr: lin(-a, b), rule: 'slope_sign' },
      ...(Math.abs(a) > 1 ? [{ expr: `${a < 0 ? '-' : ''}x/${Math.abs(a)}${b ? (b < 0 ? `-${-b}` : `+${b}`) : ''}`, rule: 'slope_inverted' }] : []),
    ],
    expectedHtml: algHtml(`y=${lin(a, b)}`),
  };
};

// ---------- Intersection de deux droites ----------

GEN['fn-intersection'] = (level, rng) => {
  for (;;) {
    const x = rng.int(-3, 3);
    const y = rng.int(-3, 3);
    const a1 = nz(rng, -2, 2);
    const a2 = nz(rng, -2, 2);
    if (a1 === a2) continue;
    const b1 = y - a1 * x;
    const b2 = y - a2 * x;
    if (Math.abs(b1) > 5 || Math.abs(b2) > 5) continue;
    const graph = level <= 3;
    return {
      skill: 'fn-intersection', level, type: 'answer',
      prompt: `Où se coupent les droites ${algHtml(`y=${lin(a1, b1)}`)} et ${algHtml(`y=${lin(a2, b2)}`)} ? Écris x = … ; y = …${graph ? fig({ lines: [{ a: a1, b: b1 }, { a: a2, b: b2 }] }) : ''}`,
      expected: `x=${x};y=${y}`, form: 'any', exact: null, tree: null, traps: [], keys: 'sys', suffix: '', figure: null,
      baits: ['system_one_equation', 'graph_xy_swap'],
      solution: [{ html: algHtml(`${lin(a1, b1)}=${lin(a2, b2)}`), note: `Au point commun, les deux y sont égaux : on résout, x = ${show(x)}, puis y = ${show(y)}.` }],
      expectedSec: 60, key: `i:${a1}:${b1}:${a2}:${b2}`,
      checker: 'system', pair: [x, y], eqs: [[-a1, 1, b1], [-a2, 1, b2]],
      expectedHtml: `${algHtml(`x=${x}`)} ; ${algHtml(`y=${y}`)}`,
    };
  }
};

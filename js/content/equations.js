// Equations (solved line by line), 2×2 systems, isolating a variable in a
// formula (physics included), and geometry by formula.

import { answerItem, mcqItem } from './items.js';
import { algHtml } from '../math/algebra.js';
import { solveLines } from '../math/equations.js';

const nz = (rng, lo, hi) => { for (;;) { const x = rng.int(lo, hi); if (x !== 0) return x; } };
const sgn = (x) => (x < 0 ? `-${-x}` : `+${x}`);
const co = (a, v = 'x') => (a === 1 ? v : a === -1 ? `-${v}` : `${a}${v}`);
const show = (x) => String(x).replace('-', '−');
const fix = (x) => Math.round(x * 1e9) / 1e9;
const dec = (x) => String(fix(x)).replace('.', ',');

const EQ_BAITS = ['eq_move_no_sign', 'eq_inverse_op', 'eq_change_side_sign_mult', 'eq_divide_one_term', 'eq_one_side_only'];

function eqItem(skill, level, equation, x, { showMoves = level <= 2, prompt } = {}) {
  return {
    skill, level, type: 'eqlines',
    prompt: prompt || `Résous l'équation, une ligne à la fois.`,
    equation, unknown: 'x', showMoves,
    answer: `x=${x}`,
    baits: EQ_BAITS,
    solution: solveLines(equation).map((l) => ({ html: algHtml(l.math), note: l.note })),
    expectedSec: 25 + 12 * solveLines(equation).length,
    key: `${skill}:${equation}`,
  };
}

export const GEN = {};

// ---------- Le sens de « = » ----------

GEN['eq-meaning'] = (level, rng) => {
  if (level <= 2) {
    const a = rng.int(2, 6);
    const b = nz(rng, -9, 9);
    const s = rng.int(1, 8);
    const c = a * s + b;
    const tried = rng.chance(0.5) ? s : s + rng.pick([-1, 1, 2]);
    const yes = tried === s;
    const lhs = a * tried + b;
    return mcqItem('eq-meaning', level, `${algHtml(`x=${tried}`)} est-il solution de ${algHtml(`${a}x${sgn(b)}=${c}`)} ?`, [
      { html: yes ? `Oui : ${a} × ${tried} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${c}` : `Non : ${a} × ${tried} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${show(lhs)}, pas ${show(c)}`, correct: true },
      { html: yes ? 'Non' : 'Oui', correct: false },
    ], rng, { keepOrder: true, key: `sol:${a}:${b}:${tried}` });
  }
  if (level <= 4) {
    const a = rng.int(3, 15);
    const b = rng.int(2, 15);
    const c = rng.int(2, a + b - 1);
    // 8 + 4 = … + 5: "=" means "same value", not "the answer comes next".
    return answerItem('eq-meaning', level, `Complète : ${a} + ${b} = … + ${c}`, String(a + b - c), {
      keys: 'int', traps: [{ value: [a + b, 1], rule: 'equals_as_result' }, { value: [a + b + c, 1], rule: 'equals_as_result' }],
      solution: [{ math: `${a}+${b}`, note: `= ${a + b} ; il faut donc ${a + b} − ${c} = ${a + b - c} pour que les deux côtés soient égaux.` }], key: `bal:${a}:${b}:${c}`,
    });
  }
  const a = rng.int(2, 6);
  const s = rng.int(2, 9);
  const b = rng.int(1, 9);
  return answerItem('eq-meaning', level, `Quel nombre <i>x</i> rend l'égalité vraie : ${algHtml(`${a}x+${b}=${a * s + b}`)} ?`, String(s), {
    keys: 'int', solution: [{ math: `${a}×${s}+${b}`, note: `= ${a * s + b} ✓` }], key: `guess:${a}:${b}:${s}`,
  });
};

// ---------- Équations du 1er degré ----------

GEN['eq-one-step'] = (level, rng) => {
  const s = nz(rng, -12, 15);
  const a = rng.int(2, 9);
  const kind = level === 1 ? rng.pick(['+', '-']) : rng.pick(['+', '-', '×', '÷']);
  const eq = { '+': `x+${a}=${s + a}`, '-': `x-${a}=${s - a}`, '×': `${a}x=${a * s}`, '÷': `x/${a}=${s}` }[kind];
  const x = kind === '÷' ? s * a : s;
  const equation = kind === '÷' ? `x/${a}=${s}` : eq;
  return eqItem('eq-one-step', level, equation, x);
};

GEN['eq-two-step'] = (level, rng) => {
  const s = level === 1 ? rng.int(1, 9) : nz(rng, -9, 9);
  const a = level <= 2 ? rng.int(2, 9) : nz(rng, -9, 9);
  const b = nz(rng, -15, 15);
  return eqItem('eq-two-step', level, `${co(a)}${sgn(b)}=${a * s + b}`, s);
};

GEN['eq-both-sides'] = (level, rng) => {
  for (;;) {
    const s = nz(rng, -9, 9);
    const a = level <= 2 ? rng.int(3, 9) : nz(rng, -9, 9);
    const c = level <= 2 ? rng.int(1, a - 1) : nz(rng, -9, 9);
    if (a === c) continue;
    const b = nz(rng, -12, 12);
    const d = a * s + b - c * s;
    return eqItem('eq-both-sides', level, `${co(a)}${sgn(b)}=${co(c)}${sgn(d)}`, s);
  }
};

GEN['eq-brackets'] = (level, rng) => {
  for (;;) {
    const s = nz(rng, -8, 8);
    const k = level <= 2 ? rng.int(2, 6) : nz(rng, -6, 6);
    if (Math.abs(k) === 1) continue;
    const p = nz(rng, -7, 7);
    const c = nz(rng, -5, 5);
    if (k === c) continue;
    const d = k * (s + p) - c * s;
    const right = level >= 4 ? `${nz(rng, -4, 4)}(x${sgn(nz(rng, -5, 5))})` : `${co(c)}${sgn(d)}`;
    let eq = `${k}(x${sgn(p)})=${right}`;
    if (level >= 4) {
      // Two brackets: build the right side so that s is the solution.
      const m = nz(rng, -4, 4);
      if (m === k) continue;
      const q = (k * (s + p)) / m - s;
      if (!Number.isInteger(q) || q === 0) continue;
      eq = `${k}(x${sgn(p)})=${m}(x${sgn(q)})`;
    }
    return eqItem('eq-brackets', level, eq, s);
  }
};

GEN['eq-fractions'] = (level, rng) => {
  for (;;) {
    const [a, b] = rng.pick([[2, 3], [3, 4], [2, 5], [4, 6], [3, 6], [2, 4]]);
    const s = a * b * rng.int(1, 4) * (level >= 4 && rng.chance(0.4) ? -1 : 1);
    if (level <= 2) {
      const k = nz(rng, -6, 6);
      return eqItem('eq-fractions', level, `x/${a}${sgn(k)}=${s / a + k}`, s);
    }
    if (level === 3) return eqItem('eq-fractions', level, `x/${a}+x/${b}=${s / a + s / b}`, s);
    const p = nz(rng, -5, 5);
    const r = (s + p) / a;
    if (!Number.isInteger(r)) continue;
    if (level === 4) return eqItem('eq-fractions', level, `(x${sgn(p)})/${a}=${r}`, s);
    const t = s / b;
    return eqItem('eq-fractions', level, `(x${sgn(p)})/${a}-x/${b}=${r - t}`, s);
  }
};

GEN['eq-proportion'] = (level, rng) => {
  for (;;) {
    const x = nz(rng, -9, 12);
    const b = rng.int(2, 6);
    const p = level <= 2 ? 0 : nz(rng, -5, 5);
    if (x + p === 0) continue;
    // (x + p)/b written equal to the same fraction in another form.
    const k = rng.int(2, 3);
    const left = p === 0 ? `x/${b}` : `(x${sgn(p)})/${b}`;
    return eqItem('eq-proportion', level, `${left}=${(x + p) * k}/${b * k}`, x, { prompt: 'Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.' });
  }
};

// ---------- Mise en équation ----------

const PROBLEMS = [
  (rng) => { const x = rng.int(3, 15); const k = rng.int(2, 5); const b = rng.int(2, 20); return [`Le ${['', '', 'double', 'triple', 'quadruple', 'quintuple'][k]} d'un nombre, augmenté de ${b}, vaut ${k * x + b}. Quel est ce nombre ?`, x, `${k}x+${b}=${k * x + b}`]; },
  (rng) => { const l = rng.int(3, 12); const w = l + rng.int(2, 6); return [`Un rectangle a une longueur de ${w - l} cm de plus que sa largeur, et un périmètre de ${2 * (l + w)} cm. Quelle est sa largeur (en cm) ?`, l, `2(x+x+${w - l})=${2 * (l + w)}`]; },
  (rng) => { const e = rng.int(8, 14); const d = rng.int(22, 30); return [`Un père a ${d + e} ans et son fils ${e} ans. Dans combien d'années le père aura-t-il le double de l'âge de son fils ?`, d + e - 2 * e, `${d + e}+x=2(${e}+x)`]; },
  (rng) => { const x = rng.int(4, 20); return [`La somme de trois nombres entiers qui se suivent vaut ${3 * x + 3}. Quel est le plus petit ?`, x, `x+x+1+x+2=${3 * x + 3}`]; },
  (rng) => { const n = rng.int(2, 6); const p = rng.pick([3, 4, 5]); const x = rng.int(6, 14); const T = n * x + n * (x + p); return [`Au cinéma, une entrée coûte ${p} CHF de plus pour un adulte que pour un enfant. Pour ${n} enfants et ${n} adultes, on paie ${T} CHF. Combien coûte une entrée enfant (CHF) ?`, x, `${n}x+${n}(x+${p})=${T}`]; },
];

GEN['eq-problems'] = (level, rng) => {
  for (;;) {
    const [q, x, eq] = rng.pick(PROBLEMS.slice(0, Math.min(PROBLEMS.length, level + 1)))(rng);
    if (!Number.isInteger(x) || x <= 0) continue;
    return answerItem('eq-problems', level, q, String(x), {
      keys: 'int', key: q,
      solution: [{ html: algHtml(eq), note: 'On appelle x le nombre cherché et on traduit l\'énoncé.' }, ...solveLines(eq).map((l) => ({ html: algHtml(l.math), note: l.note }))],
      expectedSec: 90,
    });
  }
};

// ---------- Équation produit nul ----------

GEN['eq-product'] = (level, rng) => {
  if (level === 5) {
    // (x − r)(x − s) = k with k ≠ 0: the zero-product rule does not apply.
    for (;;) {
      const r = nz(rng, -4, 4);
      const t = nz(rng, -4, 4);
      const k = r * t;
      // (x + r)(x + t) = k  ⇔ x² + (r+t)x = 0 ⇔ x(x + r + t) = 0
      if (k === 0 || r + t === 0) continue;
      return solsetItem('eq-product', level, `(x${sgn(r)})(x${sgn(t)})=${k}`, [0, -(r + t)], [[[k - r, k - t], 'zero_product_misuse']],
        'Le produit vaut ' + show(k) + ', pas 0 : on ne peut pas dire « un des facteurs est nul ». On développe : x² + ' + (r + t) + 'x + ' + k + ' = ' + k + ', donc x(x + ' + (r + t) + ') = 0.');
    }
  }
  const r = nz(rng, -9, 9);
  const a = level <= 2 ? 1 : rng.int(2, 5);
  const b = nz(rng, -7, 7);
  if (level === 1) return solsetItem('eq-product', level, `(x${sgn(-r)})(x${sgn(b)})=0`, [r, -b], [[[-r, b], 'zero_product_sign']], 'Un produit est nul si l\'un des facteurs est nul.');
  if (level === 4) return solsetItem('eq-product', level, `x(${a}x${sgn(b)})=0`, [0, -b / a], [[[-b / a], 'zero_product_forget_zero']], 'x = 0 est aussi une solution : le facteur x peut être nul.');
  return solsetItem('eq-product', level, `(x${sgn(-r)})(${a}x${sgn(b)})=0`, [r, -b / a], [[[-r, b / a], 'zero_product_sign']], 'Un produit est nul si l\'un des facteurs est nul.');
};

function solsetItem(skill, level, equation, values, traps, note) {
  const sorted = [...new Set(values.map(fix))].sort((p, q) => p - q);
  const txt = sorted.map((v) => {
    const f = fracText(v);
    return `x=${f}`;
  }).join(';');
  return {
    skill, level, type: 'answer',
    prompt: `Résous ${algHtml(equation)}. Sépare les solutions par « ; ».`,
    expected: txt, form: 'any', exact: null, tree: null, traps: [], keys: 'eqset', suffix: '', figure: null,
    baits: [...new Set(traps.map(([, r]) => r))],
    solution: [{ html: algHtml(equation), note }, { html: sorted.map((v) => algHtml(`x=${fracText(v)}`)).join(' ou '), note: '' }],
    expectedSec: 45, key: `${skill}:${equation}`, start: { math: equation },
    checker: 'solset', values: sorted, setTraps: traps.map(([vs, rule]) => ({ values: vs.map(fix), rule })),
    expectedHtml: sorted.map((v) => algHtml(`x=${fracText(v)}`)).join(' ou '),
  };
}

function fracText(v) {
  if (Number.isInteger(v)) return String(v);
  for (let d = 2; d <= 12; d++) if (Math.abs(v * d - Math.round(v * d)) < 1e-9) return `${Math.round(v * d)}/${d}`;
  return dec(v);
}

// ---------- Systèmes 2 × 2 ----------

GEN['eq-systems'] = (level, rng) => {
  for (;;) {
    const x = nz(rng, -6, 8);
    const y = nz(rng, -6, 8);
    let a; let b; let c; let d;
    if (level <= 2) { a = 1; b = 1; c = 1; d = -1; } else if (level === 3) { a = nz(rng, -3, 3); b = -1; c = rng.int(1, 4); d = rng.int(1, 4); } else { a = nz(rng, -5, 5); b = nz(rng, -5, 5); c = nz(rng, -5, 5); d = nz(rng, -5, 5); }
    if (a * d - b * c === 0) continue;
    const q = y - a * x;
    const e1 = level === 3 ? `y=${co(a)}${q ? sgn(q) : ''}` : `${co(a)}${b < 0 ? '-' : '+'}${co(Math.abs(b), 'y')}=${a * x + b * y}`;
    const e2 = `${co(c)}${d < 0 ? '-' : '+'}${co(Math.abs(d), 'y')}=${c * x + d * y}`;
    return {
      skill: 'eq-systems', level, type: 'answer',
      prompt: `Résous le système : <div class="system">${algHtml(e1)}<br>${algHtml(e2)}</div>Écris la réponse ainsi : x = … ; y = …`,
      expected: `x=${x};y=${y}`, form: 'any', exact: null, tree: null, traps: [], keys: 'sys', suffix: '', figure: null,
      baits: ['system_one_equation'],
      solution: [{ html: algHtml(`x=${x}`), note: level === 3 ? 'Substitution : on remplace y dans la deuxième équation.' : 'Combinaison : on additionne ou soustrait les équations pour éliminer une lettre.' }, { html: algHtml(`y=${y}`), note: 'Vérifie dans les deux équations.' }],
      expectedSec: 120, key: `sys:${e1}|${e2}`, start: { math: `${e1};${e2}` },
      checker: 'system', pair: [x, y], eqs: [[a, b, a * x + b * y], [c, d, c * x + d * y]],
      expectedHtml: `${algHtml(`x=${x}`)} ; ${algHtml(`y=${y}`)}`,
    };
  }
};

// ---------- Isoler une variable ----------

// [formula, variable to isolate, answer, traps [[expr, rule]], letters]
const ISO = {
  1: [
    ['d=vt', 't', 'd/v', [['dv', 'iso_wrong_inverse'], ['v/d', 'iso_wrong_inverse'], ['d-v', 'iso_wrong_inverse']]],
    ['abc=d', 'b', 'd/(ac)', [['d-ac', 'iso_wrong_inverse'], ['dac', 'iso_wrong_inverse'], ['ac/d', 'iso_wrong_inverse']]],
    ['P=UI', 'I', 'P/U', [['PU', 'iso_wrong_inverse'], ['U/P', 'iso_wrong_inverse'], ['P-U', 'iso_wrong_inverse']]],
    ['F=ma', 'a', 'F/m', [['Fm', 'iso_wrong_inverse'], ['m/F', 'iso_wrong_inverse']]],
  ],
  2: [
    ['P=2(L+l)', 'l', 'P/2-L', [['P-2L', 'distribute_partial'], ['P/2+L', 'eq_move_no_sign'], ['(P-L)/2', 'iso_wrong_inverse']]],
    ['y=ax+b', 'x', '(y-b)/a', [['y/a-b', 'eq_divide_one_term'], ['(y+b)/a', 'eq_move_no_sign'], ['y-b/a', 'eq_divide_one_term']]],
    ['v=w+at', 't', '(v-w)/a', [['v/a-w', 'eq_divide_one_term'], ['(v+w)/a', 'eq_move_no_sign']]],
  ],
  3: [
    ['A=(B+b)h/2', 'h', '2A/(B+b)', [['A/(2(B+b))', 'iso_wrong_inverse'], ['2A-B-b', 'iso_wrong_inverse']]],
    ['p=m/V', 'V', 'm/p', [['mp', 'iso_wrong_inverse'], ['p/m', 'iso_wrong_inverse']]],
    ['1/f=1/a+1/b', 'a', 'bf/(b-f)', [['f-b', 'iso_sum_invert'], ['f+b', 'iso_sum_invert']]],
  ],
  4: [
    ['A=πr^2', 'r', '√(A/π)', [['A/π', 'iso_forget_root'], ['√A/π', 'iso_forget_root'], ['A/(2π)', 'iso_forget_root']]],
    ['E=1/2mv^2', 'v', '√(2E/m)', [['2E/m', 'iso_forget_root'], ['√(E/(2m))', 'iso_wrong_inverse']]],
    ['V=a^3', 'a', 'V^(1/3)', []],
  ],
  5: [
    ['ax+b=cx', 'x', 'b/(c-a)', [['(cx-b)/a', 'iso_var_both_sides'], ['b/(a-c)', 'eq_move_no_sign']]],
    ['P=pgh', 'h', 'P/(pg)', [['P-pg', 'iso_wrong_inverse'], ['Ppg', 'iso_wrong_inverse']]],
    ['u^2=w^2+2ad', 'd', '(u^2-w^2)/(2a)', [['(u-w)^2/(2a)', 'pow_distribute_sum'], ['(u^2+w^2)/(2a)', 'eq_move_no_sign']]],
    ['U=RI', 'R', 'U/I', [['UI', 'iso_wrong_inverse'], ['I/U', 'iso_wrong_inverse']]],
  ],
};

GEN['iso-formula'] = (level, rng) => {
  const pool = ISO[level].filter(([, , ans]) => !ans.includes('^(1/3)'));
  const [formula, v, ans, traps] = rng.pick(pool);
  const letters = [...new Set(formula.replace(/[^a-zA-Zπ]/g, '').split(''))];
  return {
    skill: 'iso-formula', level, type: 'answer',
    prompt: `Isole <i class="m-var">${v}</i> dans ${algHtml(formula)}. Écris ${v} = …`,
    expected: `${v}=${ans}`, form: 'any', exact: null, tree: null, traps: [], suffix: '', figure: null,
    keys: ['7', '8', '9', '(', ')', '4', '5', '6', '+', '-', '1', '2', '3', '×', 'frac', '0', '^', '√', '=', 'back', ...letters, 'left', 'right'],
    baits: [...new Set(traps.map(([, r]) => r))],
    solution: [{ html: algHtml(`${v}=${ans}`), note: 'On défait les opérations autour de la lettre, dans l\'ordre inverse, en faisant la même chose des deux côtés.' }],
    expectedSec: 60, key: `iso:${formula}:${v}`, start: { math: formula },
    checker: 'isolate', variable: v, target: ans, isoTraps: traps.map(([expr, rule]) => ({ expr, rule })),
    expectedHtml: algHtml(`${v}=${ans}`),
  };
};

// ---------- Géométrie par formules ----------

function rounded(skill, level, prompt, exact, decimals, suffix, approxTraps, solution, key) {
  const shown = Math.round(exact * 10 ** decimals) / 10 ** decimals;
  return {
    skill, level, type: 'answer',
    prompt: decimals == null ? prompt : `${prompt} <small>(arrondi ${decimals === 0 ? 'à l\'unité' : decimals === 1 ? 'au dixième' : 'au centième'})</small>`,
    expected: dec(shown), form: 'any', exact: null, tree: null, traps: [], keys: 'dec', suffix, figure: null,
    baits: [...new Set(approxTraps.map((t) => t.rule).filter(Boolean))],
    solution, expectedSec: 60, key: `${skill}:${key}`,
    checker: 'rounded', exactValue: exact, decimals, approxTraps, expectedHtml: `${dec(shown)} ${suffix}`,
  };
}

GEN['geo-area'] = (level, rng) => {
  const a = rng.int(3, 15);
  const b = rng.int(2, 12);
  const h = rng.int(2, 10);
  if (level === 1) return rounded('geo-area', level, `Aire d'un triangle de base ${a} cm et de hauteur ${h} cm ?`, (a * h) / 2, 1, 'cm²', [{ exact: a * h, rule: 'triangle_forget_half' }], [{ math: `${a}×${h}÷2`, note: 'A = base × hauteur ÷ 2' }], `t:${a}:${h}`);
  if (level === 2) return rounded('geo-area', level, `Aire d'un trapèze de bases ${a} cm et ${b} cm, de hauteur ${h} cm ?`, ((a + b) * h) / 2, 1, 'cm²', [{ exact: (a + b) * h, rule: 'triangle_forget_half' }], [{ math: `(${a}+${b})×${h}÷2`, note: 'A = (B + b) × h ÷ 2' }], `z:${a}:${b}:${h}`);
  const r = rng.int(2, 12);
  if (level === 3) return rounded('geo-area', level, `Aire d'un disque de rayon ${r} cm ?`, Math.PI * r * r, 1, 'cm²', [{ exact: 2 * Math.PI * r, rule: 'circle_formula_swap' }, { exact: Math.PI * 2 * r * 2 * r, rule: 'radius_diameter' }], [{ math: `${r}^2×3,1416`, note: 'A = π × r²' }], `d:${r}`);
  if (level === 4) return rounded('geo-area', level, `Périmètre d'un cercle de diamètre ${2 * r} cm ?`, 2 * Math.PI * r, 1, 'cm', [{ exact: Math.PI * r * r, rule: 'circle_formula_swap' }, { exact: 2 * Math.PI * 2 * r, rule: 'radius_diameter' }], [{ math: `${2 * r}×3,1416`, note: 'P = π × diamètre = 2 × π × r' }], `p:${r}`);
  return rounded('geo-area', level, `Un rectangle de ${a} m sur ${b} m, dont on enlève un disque de rayon 1 m. Aire restante ?`, a * b - Math.PI, 2, 'm²', [{ exact: a * b - 2 * Math.PI, rule: 'circle_formula_swap' }], [{ math: `${a}×${b}-3,1416`, note: 'Aire du rectangle moins aire du disque (π × 1²).' }], `r:${a}:${b}`);
};

GEN['geo-volume'] = (level, rng) => {
  const a = rng.int(2, 10);
  const b = rng.int(2, 8);
  const h = rng.int(3, 12);
  const r = rng.int(2, 6);
  if (level === 1) return rounded('geo-volume', level, `Volume d'un pavé de ${a} cm × ${b} cm × ${h} cm ?`, a * b * h, 0, 'cm³', [{ exact: 2 * (a * b + a * h + b * h), rule: null }], [{ math: `${a}×${b}×${h}`, note: 'V = L × l × h' }], `p:${a}:${b}:${h}`);
  if (level === 2) return rounded('geo-volume', level, `Volume d'un prisme dont la base est un triangle de base ${a} cm et de hauteur ${b} cm, et de hauteur ${h} cm ?`, (a * b * h) / 2, 1, 'cm³', [{ exact: a * b * h, rule: 'triangle_forget_half' }], [{ math: `${a}×${b}÷2×${h}`, note: 'V = aire de la base × hauteur' }], `pr:${a}:${b}:${h}`);
  if (level === 3) return rounded('geo-volume', level, `Volume d'un cylindre de rayon ${r} cm et de hauteur ${h} cm ?`, Math.PI * r * r * h, 0, 'cm³', [{ exact: 2 * Math.PI * r * h, rule: 'circle_formula_swap' }], [{ math: `3,1416×${r}^2×${h}`, note: 'V = π × r² × h' }], `c:${r}:${h}`);
  if (level === 4) return rounded('geo-volume', level, `Volume d'une pyramide de base carrée de côté ${a} cm et de hauteur ${h} cm ?`, (a * a * h) / 3, 1, 'cm³', [{ exact: a * a * h, rule: 'pyramid_forget_third' }], [{ math: `${a}^2×${h}÷3`, note: 'V = aire de la base × hauteur ÷ 3' }], `py:${a}:${h}`);
  return rounded('geo-volume', level, `Volume d'un cône de rayon ${r} cm et de hauteur ${h} cm ?`, (Math.PI * r * r * h) / 3, 0, 'cm³', [{ exact: Math.PI * r * r * h, rule: 'pyramid_forget_third' }], [{ math: `3,1416×${r}^2×${h}÷3`, note: 'V = π × r² × h ÷ 3' }], `co:${r}:${h}`);
};

GEN['geo-missing'] = (level, rng) => {
  const a = rng.int(3, 12);
  const h = rng.int(2, 10);
  if (level <= 2) return rounded('geo-missing', level, `Un rectangle a une aire de ${a * h} cm² et une longueur de ${a} cm. Quelle est sa largeur ?`, h, 1, 'cm', [{ exact: a * h - a, rule: 'iso_wrong_inverse' }], [{ math: `${a * h}÷${a}`, note: 'A = L × l, donc l = A ÷ L' }], `r:${a}:${h}`);
  if (level === 3) return rounded('geo-missing', level, `Un triangle a une aire de ${(a * h) / 2} cm² et une base de ${a} cm. Quelle est sa hauteur ?`, h, 1, 'cm', [{ exact: h / 2, rule: 'triangle_forget_half' }], [{ math: `2×${(a * h) / 2}÷${a}`, note: 'A = b × h ÷ 2, donc h = 2A ÷ b' }], `t:${a}:${h}`);
  const A = rng.int(20, 300);
  if (level === 4) return rounded('geo-missing', level, `Un disque a une aire de ${A} cm². Quel est son rayon ?`, Math.sqrt(A / Math.PI), 1, 'cm', [{ exact: A / Math.PI, rule: 'iso_forget_root' }], [{ math: `${A}÷3,1416`, note: 'r² = A ÷ π' }, { math: `√(${A}÷3,1416)`, note: 'r = √(A ÷ π)' }], `d:${A}`);
  const V = rng.int(100, 2000);
  const r = rng.int(2, 8);
  return rounded('geo-missing', level, `Un cylindre de rayon ${r} cm a un volume de ${V} cm³. Quelle est sa hauteur ?`, V / (Math.PI * r * r), 1, 'cm', [{ exact: V / (Math.PI * r), rule: 'iso_wrong_inverse' }], [{ math: `${V}÷(3,1416×${r}^2)`, note: 'V = π r² h, donc h = V ÷ (π r²)' }], `c:${V}:${r}`);
};

const TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20]];

GEN['geo-pythagore'] = (level, rng) => {
  if (level <= 2) {
    const [a, b, c] = rng.pick(TRIPLES);
    if (level === 1) return rounded('geo-pythagore', level, `Un triangle rectangle a des côtés de l'angle droit de ${a} cm et ${b} cm. Longueur de l'hypoténuse ?`, c, 0, 'cm', [{ exact: a + b, rule: 'sqrt_distribute_sum' }, { exact: c * c, rule: 'iso_forget_root' }], [{ math: `${a}^2+${b}^2`, note: `= ${c * c}` }, { math: `√${c * c}`, note: `= ${c}` }], `h:${a}:${b}`);
    return rounded('geo-pythagore', level, `Un triangle rectangle a une hypoténuse de ${c} cm et un côté de ${a} cm. Longueur de l'autre côté ?`, b, 0, 'cm', [{ exact: Math.sqrt(a * a + c * c), rule: 'pythagore_hypotenuse' }, { exact: c - a, rule: 'sqrt_distribute_sum' }], [{ math: `${c}^2-${a}^2`, note: `= ${b * b} : on soustrait, car l'hypoténuse est le plus grand côté.` }, { math: `√${b * b}`, note: `= ${b}` }], `c:${c}:${a}`);
  }
  const a = rng.int(2, 12);
  const b = rng.int(2, 12);
  if (level === 3) return rounded('geo-pythagore', level, `Côtés de l'angle droit : ${a} cm et ${b} cm. Hypoténuse ?`, Math.hypot(a, b), 1, 'cm', [{ exact: a + b, rule: 'sqrt_distribute_sum' }, { exact: a * a + b * b, rule: 'iso_forget_root' }], [{ math: `${a}^2+${b}^2`, note: `= ${a * a + b * b}` }, { math: `√${a * a + b * b}`, note: '' }], `h3:${a}:${b}`);
  if (level === 4) {
    const c = Math.max(a, b) + rng.int(1, 6);
    const s = Math.min(a, b);
    return rounded('geo-pythagore', level, `Hypoténuse ${c} cm, un côté ${s} cm. L'autre côté ?`, Math.sqrt(c * c - s * s), 1, 'cm', [{ exact: Math.hypot(c, s), rule: 'pythagore_hypotenuse' }], [{ math: `${c}^2-${s}^2`, note: `= ${c * c - s * s}` }, { math: `√${c * c - s * s}`, note: '' }], `c4:${c}:${s}`);
  }
  const L = rng.int(3, 10);
  const H = rng.int(2, 6);
  return rounded('geo-pythagore', level, `Une échelle de ${L} m est posée contre un mur ; son pied est à ${dec(H / 2)} m du mur. À quelle hauteur touche-t-elle le mur ?`, Math.sqrt(L * L - (H / 2) ** 2), 2, 'm', [{ exact: Math.hypot(L, H / 2), rule: 'pythagore_hypotenuse' }], [{ math: `${L}^2-${dec(H / 2)}^2`, note: 'L\'échelle est l\'hypoténuse.' }], `e:${L}:${H}`);
};

GEN['geo-thales'] = (level, rng) => {
  const k = rng.pick([2, 3, 1.5, 2.5, 4]);
  const ab = rng.int(2, 8);
  const bc = rng.int(2, 8);
  const ad = fix(ab * k);
  const de = fix(bc * k);
  if (level <= 2) {
    return rounded('geo-thales', level, `Deux triangles semblables : le petit a des côtés de ${ab} cm et ${bc} cm ; dans le grand, le côté qui correspond à ${ab} cm mesure ${dec(ad)} cm. Que mesure le côté qui correspond à ${bc} cm ?`, de, 1, 'cm', [{ exact: bc + (ad - ab), rule: 'additive_reasoning' }, { exact: bc / k, rule: 'thales_ratio_mismatch' }], [{ math: `${dec(ad)}÷${ab}`, note: `rapport d'agrandissement k = ${dec(k)}` }, { math: `${bc}×${dec(k)}`, note: `= ${dec(de)} cm` }], `s:${ab}:${bc}:${k}`);
  }
  if (level <= 4) {
    return rounded('geo-thales', level, `Dans un triangle ADE, B est sur [AD] et C sur [AE], avec (BC) parallèle à (DE). AB = ${ab} cm, AD = ${dec(ad)} cm, BC = ${bc} cm. Que mesure DE ?`, de, 1, 'cm', [{ exact: (bc * ab) / ad, rule: 'thales_ratio_mismatch' }, { exact: bc + ad - ab, rule: 'additive_reasoning' }], [{ math: `${bc}×${dec(ad)}÷${ab}`, note: 'AD/AB = DE/BC (théorème de Thalès)' }], `t:${ab}:${bc}:${k}`);
  }
  return rounded('geo-thales', level, `Un bâton de ${ab / 2} m fait une ombre de ${bc / 2} m. Au même moment, un arbre fait une ombre de ${dec(de / 2)} m. Quelle est la hauteur de l'arbre ?`, (ab / 2) * k, 2, 'm', [{ exact: (bc / 2) * k, rule: 'thales_ratio_mismatch' }], [{ math: `${dec(de / 2)}÷${dec(bc / 2)}`, note: `rapport = ${dec(k)}` }, { math: `${dec(ab / 2)}×${dec(k)}`, note: '' }], `o:${ab}:${bc}:${k}`);
};

GEN['geo-scale'] = (level, rng) => {
  const k = rng.pick([2, 3, 4, 0.5, 1.5]);
  const what = level <= 2 ? 'aire' : 'volume';
  const p = what === 'aire' ? 2 : 3;
  const v = rng.int(2, 20);
  return rounded('geo-scale', level, `On ${k > 1 ? 'agrandit' : 'réduit'} une figure : toutes les longueurs sont multipliées par ${dec(k)}. ${what === 'aire' ? `Son aire valait ${v} cm². Que vaut-elle maintenant ?` : `Son volume valait ${v} cm³. Que vaut-il maintenant ?`}`, v * k ** p, 2, what === 'aire' ? 'cm²' : 'cm³',
    [{ exact: v * k, rule: 'linearity_illusion' }, { exact: v * k ** (p === 2 ? 3 : 2), rule: 'linearity_illusion' }],
    [{ math: `${v}×${dec(k)}^${p}`, note: `Longueurs × ${dec(k)}, ${what === 'aire' ? 'aires' : 'volumes'} × ${dec(k)}${p === 2 ? '²' : '³'}.` }], `${what}:${k}:${v}`);
};

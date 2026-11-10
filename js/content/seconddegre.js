// Rational fractions, quadratic equations, and the synthesis: equations
// with parameters, up to ax² + bx/(3cx) = (6x + 2)².

import { mcqItem, answerItem } from './items.js';
import { algHtml, parseAlg, toPoly, polyText } from '../math/algebra.js';

const nz = (rng, lo, hi) => { for (;;) { const x = rng.int(lo, hi); if (x !== 0) return x; } };
const sgn = (x) => (x < 0 ? `-${-x}` : `+${x}`);
const show = (x) => String(x).replace('-', '−');
const fix = (x) => Math.round(x * 1e9) / 1e9;
const canon = (e) => polyText(toPoly(parseAlg(e)), ['x']);
// Both keypads have the fraction, the power, √ and both brackets.
const KEYS_SOL = ['7', '8', '9', 'x', '=', ';', '4', '5', '6', '+', '-', '^', '1', '2', '3', 'frac', '√', '(', 'left', '0', 'right', 'back', ',', ')'];
const KEYS_ALG = ['7', '8', '9', 'x', '(', ')', '4', '5', '6', '+', '-', '^', '1', '2', '3', '×', 'frac', '=', 'left', '0', 'right', 'back', ',', '√'];

function frac(v) {
  if (Math.abs(v - Math.round(v)) < 1e-9) return String(Math.round(v));
  for (let d = 2; d <= 24; d++) if (Math.abs(v * d - Math.round(v * d)) < 1e-6) return `${Math.round(v * d)}/${d}`;
  return null;
}

// A set of solutions. texts: how each solution is written (for irrational ones).
// start: the equation to solve, as keypad text (the steps are checked against it).
function solset(skill, level, prompt, values, { texts, traps = [], note = '', sec = 60, start = null, baits = [] } = {}) {
  const order = values.map((v, i) => [v, texts ? texts[i] : frac(fix(v))]).sort((p, q) => p[0] - q[0]);
  const expected = order.length ? order.map(([, t]) => `x=${t}`).join(';') : 'aucune';
  const html = order.length ? order.map(([, t]) => algHtml(`x=${t}`)).join(' ou ') : 'aucune solution';
  return {
    skill, level, type: 'answer',
    prompt: `${prompt} <small>Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.</small>`,
    expected, form: 'any', exact: null, tree: null, traps: [], keys: KEYS_SOL, suffix: '', figure: null,
    baits: [...new Set([...traps.map(([, r]) => r), ...baits])],
    solution: [{ html, note }], expectedSec: sec, key: `${skill}:${prompt}`,
    ...(start ? { start: { math: start } } : {}),
    checker: 'solset', values: order.map(([v]) => fix(v)), setTraps: traps.map(([vs, rule]) => ({ values: vs.map(fix), rule })),
    expectedHtml: html,
  };
}

// start: the expression to transform, as keypad text.
function algAnswer(skill, level, prompt, target, { form = 'any', traps = [], note = '', sec = 60, start = null } = {}) {
  return {
    skill, level, type: 'answer', prompt,
    expected: target, form: 'any', exact: null, tree: null, traps: [], keys: KEYS_ALG, suffix: '', figure: null,
    baits: [...new Set(traps.map(([, r]) => r))],
    solution: [{ html: algHtml(target), note }], expectedSec: sec, key: `${skill}:${prompt}`,
    ...(start ? { start: { math: start } } : {}),
    checker: 'alg', target, form, algTraps: traps.map(([expr, rule]) => ({ expr, rule })),
    expectedHtml: algHtml(target),
  };
}

export const GEN = {};

// ---------- Fractions rationnelles ----------

GEN['rat-domain'] = (level, rng) => {
  const a = nz(rng, -6, 6);
  const b = nz(rng, -6, 6);
  if (level <= 2) {
    const k = nz(rng, -5, 5);
    return solset('rat-domain', level, `Pour quelles valeurs de x l'expression ${algHtml(`(x${sgn(k)})/(x${sgn(-a)})`)} n'est-elle pas définie ?`, [a], { start: `x${sgn(-a)}=0`,
      traps: [[[-k], 'forbidden_numerator'], [[-a], 'zero_product_sign']], note: 'On ne peut pas diviser par 0 : on cherche quand le dénominateur vaut 0.',
    });
  }
  const s = Math.abs(a);
  return solset('rat-domain', level, `Valeurs interdites de ${algHtml(`(x${sgn(b)})/(x^2-${s * s})`)} ?`, [s, -s], { start: `x^2-${s * s}=0`,
    traps: [[[-b], 'forbidden_numerator']], note: `x² − ${s * s} = 0 pour x = ${s} et x = −${s}.`,
  });
};

GEN['rat-simplify'] = (level, rng) => {
  const a = nz(rng, -6, 6);
  const k = rng.int(2, 6);
  if (level <= 2) {
    const m = nz(rng, -7, 7);
    return algAnswer('rat-simplify', level, `Simplifie : ${algHtml(`(${k}x${sgn(k * m)})/${k}`)}`, `x${sgn(m)}`, { start: `(${k}x${sgn(k * m)})/${k}`,
      form: 'reduced', traps: [[`x${sgn(k * m)}`, 'cancel_terms']], note: `On factorise le numérateur : ${k}(x ${m < 0 ? '−' : '+'} ${Math.abs(m)}), puis on simplifie par ${k}. On ne barre pas des termes, seulement des facteurs.`,
    });
  }
  if (level === 3) {
    return algAnswer('rat-simplify', level, `Simplifie : ${algHtml(`(x^2-${a * a})/(x${sgn(-a)})`)} (x ≠ ${show(a)})`, `x${sgn(a)}`, { start: `(x^2-${a * a})/(x${sgn(-a)})`,
      form: 'reduced', traps: [[`x${sgn(-a)}`, 'identity_sign_square'], [`x^2-${Math.abs(a)}`, 'cancel_terms']], note: `x² − ${a * a} = (x − ${show(a)})(x + ${show(a)}) : on simplifie par (x − ${show(a)}).`,
    });
  }
  const b = nz(rng, -5, 5);
  if (a === b) return GEN['rat-simplify'](level, rng);
  const num = canon(`(x${sgn(-a)})(x${sgn(-b)})`);
  return algAnswer('rat-simplify', level, `Simplifie : ${algHtml(`(${num})/(x${sgn(-a)})`)} (x ≠ ${show(a)})`, `x${sgn(-b)}`, { start: `(${num})/(x${sgn(-a)})`,
    form: 'reduced', traps: [[`x${sgn(b)}`, 'fac_trinomial_signs']], note: 'Factorise le numérateur (somme et produit), puis simplifie par le facteur commun.',
  });
};

GEN['rat-operations'] = (level, rng) => {
  const a = nz(rng, -5, 5);
  const b = nz(rng, -5, 5);
  if (level <= 2) {
    const k = rng.int(2, 5);
    return algAnswer('rat-operations', level, `Calcule et simplifie : ${algHtml(`x/(x${sgn(a)})×(x${sgn(a)})/${k}`)}`, `x/${k}`, { start: `x/(x${sgn(a)})×(x${sgn(a)})/${k}`,
      note: 'On multiplie numérateurs et dénominateurs, puis on simplifie par le facteur commun (x + …).',
    });
  }
  if (a === b) return GEN['rat-operations'](level, rng);
  // 1/(x + a) + 1/(x + b) = (2x + a + b)/((x + a)(x + b))
  const target = `(2x${sgn(a + b)})/((x${sgn(a)})(x${sgn(b)}))`.replace('+0)', ')');
  return algAnswer('rat-operations', level, `Écris en une seule fraction : ${algHtml(`1/(x${sgn(a)})+1/(x${sgn(b)})`)}`, target, { start: `1/(x${sgn(a)})+1/(x${sgn(b)})`,
    traps: [[`2/(2x${sgn(a + b)})`, 'add_across']], note: 'Dénominateur commun : (x + …)(x + …). On amplifie chaque fraction, puis on additionne les numérateurs.',
  });
};

GEN['rat-equation'] = (level, rng) => {
  if (level <= 2) {
    const s = nz(rng, -6, 6);
    const p = nz(rng, -5, 5);
    const k = rng.int(2, 5);
    if (s + p === 0) return GEN['rat-equation'](level, rng);
    // k/(x + p) = k/(s + p)… written as k/(x+p) = q with q = k/(s+p)
    const q = k / (s + p);
    const qt = frac(q);
    if (!qt) return GEN['rat-equation'](level, rng);
    return solset('rat-equation', level, `Résous ${algHtml(`${k}/(x${sgn(p)})=${qt}`)}.`, [s], { start: `${k}/(x${sgn(p)})=${qt}`, note: `Valeur interdite : x = ${show(-p)}. On multiplie les deux côtés par (x ${p < 0 ? '−' : '+'} ${Math.abs(p)}).` });
  }
  if (level <= 4) {
    // x + c/x = s with roots r1, r2: x² − sx + c = 0
    const r1 = rng.int(1, 6);
    let r2 = rng.int(1, 6);
    if (r2 === r1) r2 += 1;
    return solset('rat-equation', level, `Résous ${algHtml(`x+${r1 * r2}/x=${r1 + r2}`)}.`, [r1, r2], { start: `x+${r1 * r2}/x=${r1 + r2}`, baits: ['eq_mult_one_term'], note: `x ≠ 0. On multiplie par x : x² + ${r1 * r2} = ${r1 + r2}x, donc x² − ${r1 + r2}x + ${r1 * r2} = 0.` });
  }
  const a = rng.int(1, 6);
  // (x² − a²)/(x − a) = 0: x = a is forbidden, only x = −a remains.
  return solset('rat-equation', level, `Résous ${algHtml(`(x^2-${a * a})/(x-${a})=0`)}.`, [-a], { start: `(x^2-${a * a})/(x-${a})=0`,
    traps: [[[a], 'forbidden_value_kept']], note: `x = ${a} annule le dénominateur : il est interdit. Seul x = −${a} convient.`,
  });
};

// ---------- Équations du 2e degré ----------

GEN['quad-xk'] = (level, rng) => {
  const r = rng.int(1, 12);
  if (level === 5) return solset('quad-xk', level, `Résous ${algHtml(`x^2=-${r * r}`)}.`, [], { start: `x^2=-${r * r}`, traps: [[[r, -r], 'square_negative_solutions']], note: 'Un carré n\'est jamais négatif : aucune solution.' });
  if (level === 4) {
    const k = rng.pick([2, 3, 5, 7, 10]);
    return solset('quad-xk', level, `Résous ${algHtml(`x^2=${k}`)}.`, [-Math.sqrt(k), Math.sqrt(k)], { start: `x^2=${k}`, texts: [`-√${k}`, `√${k}`], note: `x = √${k} ou x = −√${k}.` });
  }
  const a = level >= 3 ? rng.int(2, 4) : 1;
  return solset('quad-xk', level, `Résous ${algHtml(`${a === 1 ? '' : a}x^2=${a * r * r}`)}.`, [r, -r], { start: `${a === 1 ? '' : a}x^2=${a * r * r}`, note: `x² = ${r * r}, donc x = ${r} ou x = −${r} : deux solutions.` });
};

GEN['quad-shift'] = (level, rng) => {
  const p = nz(rng, -6, 6);
  const r = rng.int(1, 6);
  const k = level >= 4 ? rng.pick([2, 3, 5]) : r * r;
  const vals = level >= 4 ? [p - Math.sqrt(k), p + Math.sqrt(k)] : [p - r, p + r];
  const texts = level >= 4 ? [`${p}-√${k}`, `${p}+√${k}`] : null;
  return solset('quad-shift', level, `Résous ${algHtml(`(x${sgn(-p)})^2=${k}`)}.`, vals, { start: `(x${sgn(-p)})^2=${k}`,
    texts, traps: [[[p + (level >= 4 ? Math.sqrt(k) : r)], 'square_eq_one_solution'], [[-p - r, -p + r], 'zero_product_sign']],
    note: `x ${p < 0 ? '+' : '−'} ${Math.abs(p)} = ${level >= 4 ? `√${k}` : r} ou x ${p < 0 ? '+' : '−'} ${Math.abs(p)} = −${level >= 4 ? `√${k}` : r}.`,
  });
};

GEN['quad-factor'] = (level, rng) => {
  const r = nz(rng, -7, 7);
  let s = nz(rng, -7, 7);
  if (level === 1) return solset('quad-factor', level, `Résous ${algHtml(`${canon(`x^2${sgn(-r)}x`)}=0`)}.`, [0, r], { start: `${canon(`x^2${sgn(-r)}x`)}=0`, traps: [[[r], 'zero_product_forget_zero']], note: `x(x ${r < 0 ? '+' : '−'} ${Math.abs(r)}) = 0 : x = 0 ou x = ${show(r)}.` });
  if (level === 2) { const a = Math.abs(r); return solset('quad-factor', level, `Résous ${algHtml(`x^2-${a * a}=0`)}.`, [a, -a], { start: `x^2-${a * a}=0`, note: `(x − ${a})(x + ${a}) = 0.` }); }
  if (s === r || s === -r) s = r + 1 || 2;
  const eq = canon(`(x${sgn(-r)})(x${sgn(-s)})`);
  return solset('quad-factor', level, `Résous ${algHtml(`${eq}=0`)}.`, [r, s], { start: `${eq}=0`,
    traps: [[[-r, -s], 'zero_product_sign']], note: `Somme ${show(r + s)}, produit ${show(r * s)} : (x ${r < 0 ? '+' : '−'} ${Math.abs(r)})(x ${s < 0 ? '+' : '−'} ${Math.abs(s)}) = 0.`,
  });
};

GEN['quad-complete'] = (level, rng) => {
  const h = nz(rng, -5, 5);
  const k = level <= 2 ? rng.pick([1, 4, 9, 16]) : rng.pick([2, 3, 5, 6, 7]);
  // (x + h)² = k  ⇔  x² + 2hx + h² − k = 0
  const eq = canon(`(x${sgn(h)})^2-${k}`);
  const r = Math.sqrt(k);
  const vals = [-h - r, -h + r];
  const texts = Number.isInteger(r) ? null : [`${-h}-√${k}`, `${-h}+√${k}`];
  return solset('quad-complete', level, `Résous en complétant le carré : ${algHtml(`${eq}=0`)}.`, vals, { start: `${eq}=0`,
    texts, traps: [[[-h + 2 * r, -h - 2 * r], 'complete_square_half']],
    note: `x² ${2 * h < 0 ? '−' : '+'} ${Math.abs(2 * h)}x = (x ${h < 0 ? '−' : '+'} ${Math.abs(h)})² − ${h * h}. Donc (x ${h < 0 ? '−' : '+'} ${Math.abs(h)})² = ${k}.`,
  });
};

GEN['quad-formula'] = (level, rng) => {
  // a > 0: a negative a is the same equation multiplied by −1.
  const a = rng.int(1, level <= 2 ? 3 : 4);
  const b = nz(rng, -9, 9);
  const c = nz(rng, -9, 9);
  const D = b * b - 4 * a * c;
  if (level === 1) {
    return answerItem('quad-formula', level, `Calcule le discriminant Δ = b² − 4ac de ${algHtml(`${canon(`${a}x^2${sgn(b)}x${sgn(c)}`)}=0`)}.`, String(D), {
      keys: 'rel', signed: true, traps: [{ value: [-b * b - 4 * a * c, 1], rule: 'discriminant_b_sign' }, { value: [b * b - a * c, 1], rule: 'discriminant_forget_4' }],
      solution: [{ html: '', note: `Δ = (${show(b)})² − 4 × ${show(a)} × ${show(c)} = ${b * b} ${-4 * a * c < 0 ? '−' : '+'} ${Math.abs(4 * a * c)} = ${show(D)}` }], key: `d:${a}:${b}:${c}`,
    });
  }
  if (level === 2) {
    const n = D > 0 ? 2 : D === 0 ? 1 : 0;
    return mcqItem('quad-formula', level, `Δ = ${show(D)}. Combien de solutions a l'équation ?`, [
      { html: 'Deux solutions', correct: n === 2 }, { html: 'Une seule solution', correct: n === 1 }, { html: 'Aucune solution', correct: n === 0 },
    ], rng, { keepOrder: true, key: `n:${D}`, solution: [{ html: '', note: 'Δ > 0 : deux solutions ; Δ = 0 : une ; Δ < 0 : aucune.' }] });
  }
  if (D < 0 || a === 0) return GEN['quad-formula'](level, rng);
  const sq = Math.sqrt(D);
  const vals = [(-b - sq) / (2 * a), (-b + sq) / (2 * a)];
  const exact = Number.isInteger(sq);
  if (!exact && level === 3) return GEN['quad-formula'](level, rng);
  const texts = exact ? null : [`(${-b}-√${D})/${2 * a}`, `(${-b}+√${D})/${2 * a}`];
  return solset('quad-formula', level, `Résous avec la formule : ${algHtml(`${canon(`${a}x^2${sgn(b)}x${sgn(c)}`)}=0`)}.`, D === 0 ? [vals[0]] : vals, {
    start: `${canon(`${a}x^2${sgn(b)}x${sgn(c)}`)}=0`,
    texts: D === 0 ? (texts ? [texts[0]] : null) : texts,
    traps: [[[(b - sq) / (2 * a), (b + sq) / (2 * a)], 'formula_minus_b'], [[-b - sq / (2 * a), -b + sq / (2 * a)], 'formula_2a_partial']],
    note: `x = (−b ± √Δ) / (2a), avec Δ = ${D}.`,
  });
};

const METHODS = [
  ['x^2-16=0', 'x² = 16, ou l\'identité a² − b²', ['La formule avec Δ', 'Compléter le carré', 'Mettre x en évidence']],
  ['x^2+5x=0', 'Mettre x en évidence', ['La formule avec Δ', 'x² = k', 'Compléter le carré']],
  ['x^2-5x+6=0', 'Somme et produit (factoriser)', ['x² = k', 'Mettre x en évidence', 'Identité a² − b²']],
  ['3x^2+2x-7=0', 'La formule avec Δ', ['Mettre x en évidence', 'x² = k', 'Identité a² − b²']],
  ['(x-3)^2=5', 'Prendre la racine des deux côtés', ['Développer puis la formule', 'Mettre x en évidence', 'Somme et produit']],
];

GEN['quad-choose'] = (level, rng) => {
  const [eq, right, wrongs] = rng.pick(METHODS);
  return mcqItem('quad-choose', level, `Quelle méthode est la plus rapide pour ${algHtml(eq)} ?`, [
    { html: right, correct: true }, ...wrongs.map((w) => ({ html: w, correct: false })),
  ], rng, { key: eq, solution: [{ html: '', note: 'La formule marche toujours, mais une factorisation directe (x en évidence, identité, somme et produit) est souvent plus rapide.' }] });
};

GEN['quad-reducible'] = (level, rng) => {
  if (level <= 3) {
    const r1 = rng.int(1, 3);
    let r2 = rng.int(1, 3);
    if (r2 === r1) r2 += 1;
    // x⁴ − (r1² + r2²)x² + r1²r2² = 0
    return solset('quad-reducible', level, `Résous ${algHtml(`x^4-${r1 * r1 + r2 * r2}x^2+${r1 * r1 * r2 * r2}=0`)} (pose X = x²).`, [r1, -r1, r2, -r2], { start: `x^4-${r1 * r1 + r2 * r2}x^2+${r1 * r1 * r2 * r2}=0`,
      traps: [[[r1 * r1, r2 * r2], 'square_eq_one_solution']], note: `X² − ${r1 * r1 + r2 * r2}X + ${r1 * r1 * r2 * r2} = 0 donne X = ${r1 * r1} ou X = ${r2 * r2}, puis x = ±√X.`,
    });
  }
  return { ...GEN['rat-equation'](4, rng), skill: 'quad-reducible', level };
};

// ---------- Synthèse : équations avec paramètres ----------

GEN['param-linear'] = (level, rng) => {
  const forms = [
    ['ax=b', 'x', 'b/a', 'a ≠ 0'],
    ['ax+b=c', 'x', '(c-b)/a', 'a ≠ 0'],
    ['ax+b=cx', 'x', 'b/(c-a)', 'a ≠ c'],
    ['a(x-b)=c', 'x', 'c/a+b', 'a ≠ 0'],
    ['ax+b=cx+d', 'x', '(d-b)/(a-c)', 'a ≠ c'],
  ];
  const [eq, v, ans, cond] = forms[Math.min(forms.length - 1, level - 1 + rng.int(0, 1))];
  return {
    skill: 'param-linear', level, type: 'answer',
    prompt: `Résous pour x, en supposant ${cond} : ${algHtml(eq)}. Écris x = …`,
    expected: `x=${ans}`, form: 'any', exact: null, tree: null, traps: [], suffix: '', figure: null,
    keys: ['7', '8', '9', 'x', '(', ')', '4', '5', '6', '+', '-', '=', '1', '2', '3', 'a', 'b', 'c', 'frac', '0', 'd', 'back', 'left', 'right'],
    baits: ['iso_var_both_sides', 'eq_move_no_sign'],
    solution: [{ html: algHtml(`x=${ans}`), note: `Même méthode qu'avec des nombres. La condition ${cond} évite de diviser par 0.` }],
    expectedSec: 60, key: `pl:${eq}`, start: { math: eq },
    checker: 'isolate', variable: v, target: ans, isoTraps: [{ expr: ans.replace('c-a', 'a-c').replace('d-b', 'b-d'), rule: 'eq_move_no_sign' }],
    expectedHtml: algHtml(`x=${ans}`),
  };
};

GEN['param-quadratic'] = (level, rng) => {
  const forms = [
    ['x^2=a^2', ['a', '-a'], [['a', 1, 5]]],
    ['x^2-2ax+a^2=1', ['a-1', 'a+1'], [['a', -4, 4]]],
    ['(x-a)^2=b', ['a-√b', 'a+√b'], [['a', -3, 3], ['b', 1, 9]]],
    ['x^2-(a+b)x+ab=0', ['a', 'b'], [['a', -4, -0.5], ['b', 0.5, 4]]],
    ['ax^2+bx=0', ['0', '-b/a'], [['a', 1, 4], ['b', 1, 6]]],
  ];
  const [eq, sols, params] = forms[level - 1];
  return {
    skill: 'param-quadratic', level, type: 'answer',
    prompt: `Résous pour x : ${algHtml(eq)}. Sépare les solutions par « ; ».`,
    expected: sols.map((s) => `x=${s}`).join(';'), form: 'any', exact: null, tree: null, traps: [], suffix: '', figure: null,
    keys: ['7', '8', '9', 'x', '(', ')', '4', '5', '6', '+', '-', ';', '1', '2', '3', 'a', 'b', '√', 'frac', '0', '=', 'back', 'left', 'right'],
    baits: [], solution: [{ html: sols.map((s) => algHtml(`x=${s}`)).join(' ou '), note: 'On reconnaît une identité, un facteur commun, ou on factorise ; les paramètres se manipulent comme des nombres.' }],
    expectedSec: 90, key: `pq:${eq}`, start: { math: eq },
    checker: 'paramset', solutions: sols, params, expectedHtml: sols.map((s) => algHtml(`x=${s}`)).join(' ou '),
  };
};

// The final problem, step by step: ax² + bx/(3cx) = (6x + 2)².
GEN['param-final'] = (level, rng) => {
  const E = 'ax^2+(bx)/(3cx)=(6x+2)^2';
  if (level === 1) {
    return mcqItem('param-final', level, `Pour quelles valeurs l'équation ${algHtml(E)} a-t-elle un sens ?`, [
      { html: 'x ≠ 0 et c ≠ 0', correct: true },
      { html: 'x ≠ 0 seulement', correct: false, rule: 'forbidden_value_kept' },
      { html: 'a ≠ 0', correct: false },
      { html: 'Pour toutes les valeurs', correct: false, rule: 'forbidden_value_kept' },
    ], rng, { key: 'pf:domain', solution: [{ html: '', note: 'Le dénominateur 3cx ne doit pas être nul : x ≠ 0 et c ≠ 0.' }] });
  }
  if (level === 2) {
    return { ...algAnswer('param-final', level, `Simplifie ${algHtml('(bx)/(3cx)')} (avec x ≠ 0, c ≠ 0).`, 'b/(3c)', { start: '(bx)/(3cx)', traps: [['b', 'cancel_terms']], note: 'On simplifie par le facteur x, présent en haut et en bas.' }), keys: ['b', 'c', 'x', '3', 'frac', '(', ')', '×', 'back', 'left', 'right'] };
  }
  if (level === 3) {
    return algAnswer('param-final', level, `Développe ${algHtml('(6x+2)^2')}.`, '36x^2+24x+4', {
      start: '(6x+2)^2', form: 'reduced', traps: [['36x^2+4', 'pow_distribute_sum'], ['36x^2+12x+4', 'identity_middle_term']], note: '(6x + 2)² = 36x² + 2 × 6x × 2 + 4.',
    });
  }
  if (level === 4) {
    return {
      skill: 'param-final', level, type: 'answer',
      prompt: `Ramène ${algHtml('ax^2+b/(3c)=36x^2+24x+4')} à la forme … = 0, en regroupant selon les puissances de x.`,
      expected: '(a-36)x^2-24x+b/(3c)-4=0', form: 'any', exact: null, tree: null, traps: [], suffix: '', figure: null,
      keys: ['7', '8', '9', 'x', '(', ')', '4', '5', '6', '+', '-', '^', '1', '2', '3', 'a', 'b', 'c', 'frac', '0', '=', 'back', 'left', 'right'],
      baits: [], solution: [{ html: algHtml('(a-36)x^2-24x+b/(3c)-4=0'), note: 'On soustrait 36x² + 24x + 4 des deux côtés, puis on met x² en évidence : (a − 36)x².' }],
      expectedSec: 120, key: 'pf:zero', start: { math: 'ax^2+b/(3c)=36x^2+24x+4' }, params: [['a', 1, 30], ['b', 1, 20], ['c', 1, 5]], checker: 'eqzero', target: '(a-36)x^2-24x+b/(3c)-4', expectedHtml: algHtml('(a-36)x^2-24x+b/(3c)-4=0'),
    };
  }
  const D = '576-4(a-36)(b/(3c)-4)';
  const sols = [`(24-√(${D}))/(2(a-36))`, `(24+√(${D}))/(2(a-36))`];
  return {
    skill: 'param-final', level, type: 'answer',
    prompt: `Le problème final : résous ${algHtml(E)} pour x (on suppose a ≠ 36, c ≠ 0 et Δ > 0). Sépare les deux solutions par « ; ».`,
    expected: sols.map((s) => `x=${s}`).join(';'), form: 'any', exact: null, tree: null, traps: [], suffix: '', figure: null,
    keys: ['7', '8', '9', 'x', '(', ')', '4', '5', '6', '+', '-', '^', '1', '2', '3', 'a', 'b', 'c', 'frac', '0', '√', '=', ';', 'back', 'left', 'right'],
    baits: [], solution: [
      { html: algHtml('(a-36)x^2-24x+b/(3c)-4=0'), note: 'Après simplification et développement.' },
      { html: algHtml(`Δ=${D}`.replace('Δ', 'D')), note: 'Δ = b² − 4ac avec A = a − 36, B = −24, C = b/(3c) − 4.' },
      { html: sols.map((s) => algHtml(`x=${s}`)).join(' ou '), note: 'Formule x = (−B ± √Δ) / (2A). Si une solution vaut 0, on la retire (x ≠ 0).' },
    ],
    expectedSec: 300, key: 'pf:final', start: { math: E },
    checker: 'paramset', solutions: sols, params: [['a', 1, 30], ['b', 1, 20], ['c', 1, 5]],
    expectedHtml: sols.map((s) => algHtml(`x=${s}`)).join(' ou '),
  };
};

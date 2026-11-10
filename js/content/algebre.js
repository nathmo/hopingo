// Algebra with letters: literal calculation (value of an expression,
// writing, equal or not, reduce, expand, identities) and factorisation.
// Answers are expressions, judged by the algebra checker: equal to the
// target for every value of the letters, and in the form asked.

import { parseAlg, toPoly, polyText, algHtml } from '../math/algebra.js';
import { answerItem, mcqItem } from './items.js';
import { gcd } from '../math/rational.js';

const nz = (rng, lo, hi) => { for (;;) { const x = rng.int(lo, hi); if (x !== 0) return x; } };
const sgn = (x) => (x < 0 ? `-${-x}` : `+${x}`);
// "3x", "-x", "x" for a coefficient and a letter part.
const term = (c, letters, first = false) => {
  if (c === 0) return '';
  const abs = Math.abs(c);
  const body = letters ? `${abs === 1 ? '' : abs}${letters}` : `${abs}`;
  return c < 0 ? `-${body}` : first ? body : `+${body}`;
};
const lin = (a, b, x = 'x') => `${term(a, x, true)}${term(b, '')}` || '0';
const show = (x) => String(x).replace('-', '−');
const canon = (expr) => polyText(toPoly(parseAlg(expr)), ['x', 'y', 'a', 'b']);

// An answer item judged by the algebra checker.
// start: the expression to transform (keypad text), for the steps.
function algItem(skill, level, prompt, target, { form = 'reduced', traps = [], solution = [], shown, key, sec = 40, start = null } = {}) {
  const t = parseAlg(target);
  const display = shown ?? target;
  const algTraps = traps.filter(([expr]) => {
    try { return !toPoly(parseAlg(expr)).eq(toPoly(t)); } catch { return true; }
  }).map(([expr, rule]) => ({ expr, rule }));
  return {
    skill, level, type: 'answer', prompt,
    expected: display, form: 'any', exact: null, tree: null,
    traps: [], keys: 'alg', suffix: '', figure: null,
    baits: [...new Set(algTraps.map((x) => x.rule).filter(Boolean))],
    solution, expectedSec: sec, key: `${skill}:${key ?? target}`,
    ...(start ? { start: { math: start } } : {}),
    checker: 'alg', target, form, algTraps, expectedHtml: algHtml(display),
  };
}

export const GEN = {};

// ---------- Valeur d'une expression ----------

GEN['lit-value'] = (level, rng) => {
  const a = level <= 2 ? rng.int(2, 9) : nz(rng, -5, 5);
  const b = nz(rng, -9, 9);
  const x = level === 1 ? rng.int(2, 9) : nz(rng, -5, 5);
  let expr;
  let num;
  let jux = null;
  if (level <= 2) {
    expr = lin(a, b);
    num = `${a}×${x < 0 ? `(${x})` : x}${sgn(b)}`;
    if (x > 0) jux = Number(`${a}${x}`) + b; // 3x with x = 4 read as 34
  } else if (level === 3) {
    expr = `${term(a, 'x^2', true)}${term(b, '')}`;
    num = `${a}×(${x})^2${sgn(b)}`;
  } else {
    const y = nz(rng, -4, 4);
    const c = nz(rng, -5, 5);
    if (level === 4) {
      expr = `${term(a, 'a', true)}${term(c, 'b')}`;
      num = `${a}×(${x})${c < 0 ? '-' : '+'}${Math.abs(c)}×(${y})`;
    } else {
      expr = 'a^2+b^2-2ab';
      num = `(${x})^2+(${y})^2-2×(${x})×(${y})`;
    }
    const value = toPoly(parseAlg(num)).constValue().toString();
    return answerItem('lit-value', level, `Calcule ${algHtml(expr)} pour <i class="m-var">a</i> = ${show(x)} et <i class="m-var">b</i> = ${show(y)}.`, value, {
      tree: num, keys: 'rel', signed: true, key: `${expr}:${x}:${y}`,
      solution: [{ math: num, note: 'On remplace chaque lettre par sa valeur, avec des parenthèses si elle est négative.' }],
    });
  }
  const value = toPoly(parseAlg(num)).constValue().toString();
  return answerItem('lit-value', level, `Calcule ${algHtml(expr)} pour <i class="m-var">x</i> = ${show(x)}.`, value, {
    tree: num, keys: 'rel', signed: true, key: `${expr}:${x}`,
    traps: jux != null ? [{ value: [jux, 1], rule: 'subst_juxtapose' }] : [],
    solution: [{ math: num, note: `${a}x veut dire ${a} × x : on remplace x par ${x}${x < 0 ? ', entre parenthèses' : ''}.` }],
  });
};

// ---------- Traduire en expression ----------

const PHRASES = [
  (k) => [`Le double de <i>x</i>, augmenté de ${k}`, `2x+${k}`, [[`2(x+${k})`, 'translate_order'], [`x^2+${k}`, null], [`2+x+${k}`, null]]],
  (k) => [`Le triple de la somme de <i>x</i> et ${k}`, `3(x+${k})`, [[`3x+${k}`, 'translate_order'], [`x+3×${k}`, null], [`3+x+${k}`, null]]],
  (k) => [`Le carré de <i>x</i>, diminué de ${k}`, `x^2-${k}`, [[`(x-${k})^2`, 'translate_order'], [`2x-${k}`, null], [`x-${k}^2`, null]]],
  (k) => [`Le périmètre d'un rectangle de côtés <i>x</i> et ${k}`, `2x+${2 * k}`, [[`${k}x`, null], [`x+${k}`, null], [`2x+${k}`, 'translate_order']]],
  (k) => [`L'aire d'un carré de côté <i>x</i> + ${k}`, `(x+${k})^2`, [[`x^2+${k}`, 'pow_distribute_sum'], [`4(x+${k})`, null], [`2(x+${k})`, null]]],
  () => ['La somme de trois nombres entiers qui se suivent, le premier étant <i>n</i>', '3n+3', [['3n', null], ['n+3', null], ['n^3', null]]],
  (k) => [`${k} de moins que le double de <i>x</i>`, `2x-${k}`, [[`${k}-2x`, 'translate_order'], [`2(x-${k})`, 'translate_order'], [`2x+${k}`, null]]],
];

GEN['lit-write'] = (level, rng) => {
  const pool = level <= 2 ? PHRASES.slice(0, 4) : PHRASES;
  const [q, right, wrongs] = rng.pick(pool)(rng.int(2, 7));
  return mcqItem('lit-write', level, `Quelle expression traduit : « ${q} » ?`, [
    { html: algHtml(right), correct: true }, ...wrongs.map(([e, rule]) => ({ html: algHtml(e), correct: false, rule })),
  ], rng, { key: q, expectedSec: 15 });
};

// ---------- Égal ou pas ? (exercice éclair) ----------

function equalPair(rng, level) {
  const a = rng.int(2, 6);
  const b = rng.int(1, 7);
  const pairs = [
    [`${a}(x+${b})`, `${a}x+${a * b}`, null],
    [`${a}(x+${b})`, `${a}x+${b}`, 'distribute_partial'],
    ['x×x', 'x^2', null],
    ['x×x', '2x', 'alg_x_times_x'],
    ['x+x', '2x', null],
    ['x+x', 'x^2', 'alg_x_plus_x'],
    [`${a}x+${b}`, `${a + b}x`, 'conjoin_terms'],
    [`-(x-${b})`, `-x+${b}`, null],
    [`-(x-${b})`, `-x-${b}`, 'minus_before_parens'],
  ];
  if (level >= 3) {
    pairs.push(
      [`(x+${b})^2`, `x^2+${2 * b}x+${b * b}`, null],
      [`(x+${b})^2`, `x^2+${b * b}`, 'pow_distribute_sum'],
      [`(${a}x)^2`, `${a * a}x^2`, null],
      [`(${a}x)^2`, `${a}x^2`, 'alg_coeff_power'],
      [`(x+${b})(x-${b})`, `x^2-${b * b}`, null],
      [`x^2×x^3`, 'x^5', null],
      [`x^2×x^3`, 'x^6', 'pow_product_multiply_exp'],
    );
  }
  return rng.pick(pairs);
}

GEN['lit-equal'] = (level, rng) => {
  const [l, r, rule] = equalPair(rng, level);
  const [left, right] = rng.chance(0.5) ? [l, r] : [r, l];
  const opts = [
    { html: 'Oui, pour toutes les valeurs de <i>x</i>', correct: !rule, rule: null },
    { html: 'Non, pas toujours', correct: !!rule, rule: null },
  ];
  if (rule) opts[0].rule = rule;
  return mcqItem('lit-equal', level, `${algHtml(left)} et ${algHtml(right)} sont-elles égales ?`, opts, rng, {
    keepOrder: true, key: `${left}~${right}`, expectedSec: 6,
    solution: [{ html: '', note: rule ? `Essaie avec x = 3 : on trouve deux valeurs différentes.` : 'On peut passer de l\'une à l\'autre par les règles du calcul.' }],
  });
};

// ---------- Réduire ----------

GEN['lit-reduce'] = (level, rng) => {
  let expr;
  const xs = level === 4 ? ['a', 'b'] : ['x', ''];
  const vars = level === 3 || level === 5 ? ['x^2', 'x', ''] : xs;
  const terms = [];
  const n = level <= 2 ? 4 : 5;
  for (let i = 0; i < n; i++) {
    const v = vars[i % vars.length];
    const c = level === 1 ? rng.int(1, 9) : nz(rng, -9, 9);
    terms.push([c, v]);
  }
  const shuffled = rng.shuffle(terms);
  expr = shuffled.map(([c, v], i) => term(c, v, i === 0)).join('');
  if (level === 5) expr += `${sgn(nz(rng, -4, 4))}x×x`.replace(/^\+/, '+');
  const target = canon(expr);
  const total = terms.reduce((s, [c]) => s + c, 0);
  return algItem('lit-reduce', level, `Réduis : ${algHtml(expr)}`, target, { start: expr,
    traps: [[`${total}x`, 'conjoin_terms'], [`${total}`, 'conjoin_terms']],
    solution: [{ math: '0', html: algHtml(target), note: 'On regroupe les termes de même sorte : les x ensemble, les x² ensemble, les nombres ensemble.' }],
    key: expr,
  });
};

// ---------- Multiplier des monômes ----------

GEN['lit-monomial'] = (level, rng) => {
  const a = level <= 2 ? rng.int(2, 6) : nz(rng, -6, 6);
  const b = level <= 2 ? rng.int(2, 6) : nz(rng, -6, 6);
  const p = rng.int(1, 3);
  const q = rng.int(1, 3);
  const pw = (e) => (e === 1 ? 'x' : `x^${e}`);
  let expr;
  let traps = [];
  if (level === 4) {
    const k = rng.int(2, 3);
    expr = `(${a < 0 ? `-${-a}` : a}x)^${k}`.replace('(-', '(-');
    traps = [[`${a}x^${k}`, 'alg_coeff_power'], [`${a * k}x^${k}`, 'alg_coeff_power']];
  } else if (level === 5) {
    expr = `${term(a, pw(p), true)}×(${term(b, pw(q), true)})×x`;
    traps = [[`${a * b}x^${p * q + 1}`, 'pow_product_multiply_exp']];
  } else {
    const right = b < 0 ? `(${term(b, pw(q), true)})` : term(b, pw(q), true);
    expr = `${term(a, pw(p), true)}×${right}`;
    traps = [[`${a * b}x^${p * q}`, 'pow_product_multiply_exp'], [`${a + b}x^${p + q}`, 'alg_coeff_add']];
  }
  const target = canon(expr);
  return algItem('lit-monomial', level, `Calcule et écris le plus simplement possible : ${algHtml(expr)}`, target, { start: expr,
    traps, key: expr, sec: 25,
    solution: [{ html: algHtml(target), note: 'On multiplie les nombres entre eux, et on additionne les exposants de x : x² × x³ = x⁵.' }],
  });
};

// ---------- Développer : distributivité simple ----------

GEN['lit-expand1'] = (level, rng) => {
  let k = level === 1 ? rng.int(2, 9) : nz(rng, -9, 9);
  if (Math.abs(k) === 1) k *= rng.int(2, 6);
  const a = level <= 2 ? rng.int(1, 6) : nz(rng, -6, 6);
  const b = nz(rng, -9, 9);
  let expr;
  let traps;
  if (level === 2 || (level === 3 && rng.chance(0.5))) {
    expr = `-(${lin(a, b)})`;
    traps = [[`${term(-a, 'x', true)}${term(b, '')}`, 'minus_before_parens']];
  } else if (level === 4) {
    expr = `${k === 1 ? '' : k === -1 ? '-' : k}x(${lin(a, b)})`;
    traps = [[`${term(k * a, 'x^2', true)}${term(b, '')}`, 'distribute_partial'], [`${term(k * a, 'x', true)}${term(k * b, '')}`, 'distribute_partial']];
  } else if (level === 5) {
    const m = nz(rng, -5, 5);
    const c = nz(rng, -6, 6);
    expr = `${k}(${lin(a, b)})${m < 0 ? '-' : '+'}${Math.abs(m)}(x${sgn(c)})`;
    traps = [[`${term(k * a, 'x', true)}${term(b, '')}${term(m, 'x')}${term(c, '')}`, 'distribute_partial']];
  } else {
    expr = `${k}(${lin(a, b)})`;
    traps = [[`${term(k * a, 'x', true)}${term(b, '')}`, 'distribute_partial']];
  }
  const target = canon(expr);
  return algItem('lit-expand1', level, `Développe et réduis : ${algHtml(expr)}`, target, { start: expr,
    traps, key: expr, sec: 30,
    solution: [{ html: algHtml(target), note: 'Le facteur devant la parenthèse multiplie <b>chaque</b> terme, avec son signe.' }],
  });
};

// ---------- Double distributivité ----------

GEN['lit-expand2'] = (level, rng) => {
  const a = level <= 2 ? 1 : rng.int(1, 4);
  const c = level <= 2 ? 1 : nz(rng, -3, 4);
  const b = level === 1 ? rng.int(1, 7) : nz(rng, -7, 7);
  const d = level === 1 ? rng.int(1, 7) : nz(rng, -7, 7);
  let expr = `(${lin(a, b)})(${lin(c, d)})`;
  if (level === 5) {
    const k = nz(rng, -4, 4);
    expr += `${k < 0 ? '-' : '+'}${Math.abs(k)}x(x${sgn(nz(rng, -5, 5))})`;
  }
  const target = canon(expr);
  return algItem('lit-expand2', level, `Développe et réduis : ${algHtml(expr)}`, target, { start: expr,
    traps: [[`${term(a * c, 'x^2', true)}${term(b * d, '')}`, 'double_distribution_partial']], key: expr, sec: 45,
    solution: [{ html: algHtml(target), note: 'Chaque terme de la première parenthèse multiplie chaque terme de la deuxième : 4 produits, puis on réduit.' }],
  });
};

// ---------- Identités remarquables ----------

GEN['lit-identities'] = (level, rng) => {
  const a = level <= 2 ? 1 : rng.int(2, 5);
  const b = rng.int(1, 9);
  const kind = level === 1 ? '+' : level === 2 ? '-' : rng.pick(['+', '-', '±']);
  const ax = a === 1 ? 'x' : `${a}x`;
  let expr;
  let traps;
  if (kind === '±') {
    expr = `(${ax}+${b})(${ax}-${b})`;
    traps = [[`${a * a}x^2+${b * b}`, 'identity_sign_square'], [`${a * a}x^2-${2 * a * b}x-${b * b}`, null]];
  } else {
    expr = `(${ax}${kind}${b})^2`;
    traps = [
      [`${a * a}x^2${kind === '+' ? '+' : '-'}${b * b}`, 'pow_distribute_sum'],
      [`${a * a}x^2${kind}${a * b}x+${b * b}`, 'identity_middle_term'],
      [`${a * a}x^2${kind}${2 * a * b}x-${b * b}`, 'identity_sign_square'],
      [`${a}x^2${kind}${2 * a * b}x+${b * b}`, 'alg_coeff_power'],
    ];
  }
  const target = canon(expr);
  return algItem('lit-identities', level, `Développe avec une identité remarquable : ${algHtml(expr)}`, target, { start: expr,
    traps, key: expr, sec: 30,
    solution: [{ html: algHtml(target), note: kind === '±' ? '(a + b)(a − b) = a² − b²' : `(a ${kind === '+' ? '+' : '−'} b)² = a² ${kind === '+' ? '+' : '−'} 2ab + b² : n'oublie pas le double produit.` }],
  });
};

// ---------- Développer, réduire, ordonner ----------

GEN['lit-polynomial'] = (level, rng) => {
  const b = rng.int(1, 5);
  const c = nz(rng, -5, 5);
  const k = nz(rng, -3, 3);
  const patterns = [
    `${rng.int(2, 3)}(x+${b})^2-(x-${b})(x+${b})`,
    `(x${sgn(c)})(x+${b})${k < 0 ? '-' : '+'}${Math.abs(k) === 1 ? '' : Math.abs(k)}x(x-${b})`,
    `(2x${sgn(c)})^2-4(x^2+${b})`,
    `(x+${b})^2+(x-${b})^2`,
    `x(x+${b})(x${sgn(c)})`,
  ];
  const expr = patterns[Math.min(patterns.length - 1, level - 1 + rng.int(0, 1))];
  const target = canon(expr);
  return algItem('lit-polynomial', level, `Développe, réduis et ordonne : ${algHtml(expr)}`, target, { start: expr,
    key: expr, sec: 90,
    solution: [{ html: algHtml(target), note: 'On développe chaque morceau, puis on regroupe les termes de même degré, du plus grand au plus petit.' }],
  });
};

// ---------- Factorisation : facteur commun ----------

GEN['fac-common'] = (level, rng) => {
  let factor;
  let inner;
  let traps = [];
  if (level <= 2) {
    const k = level === 1 ? rng.int(2, 6) : rng.int(2, 9);
    let a;
    let b;
    do { a = rng.int(1, 7); b = nz(rng, -9, 9); } while (gcd(a, Math.abs(b)) !== 1);
    factor = `${k}`;
    inner = lin(a, b);
    traps = [[`${k}(${lin(a, k * b)})`, 'fac_forget_divide']];
  } else if (level === 3) {
    const b = nz(rng, -9, 9);
    factor = 'x';
    inner = `x${sgn(b)}`;
    if (Math.abs(b) === 1) traps = [['x(x)', 'fac_forget_one']];
  } else {
    const k = rng.int(2, 5);
    let a;
    let b;
    do { a = rng.int(1, 5); b = nz(rng, -7, 7); } while (gcd(a, Math.abs(b)) !== 1);
    factor = `${k}x`;
    inner = lin(a, b);
    traps = [[`${k}x(${lin(a, k * b)})`, 'fac_forget_divide'], [`x(${lin(k * a, b)})`, null]];
  }
  const target = `${factor}(${inner})`;
  const shown = canon(target);
  return algItem('fac-common', level, `Factorise en mettant le plus grand facteur commun en évidence : ${algHtml(shown)}`, target, { start: shown,
    form: 'common', traps, key: shown, sec: 30,
    solution: [{ html: algHtml(target), note: `Le facteur commun ${factor} sort devant ; dans la parenthèse, on divise chaque terme par ${factor}. Vérifie en redéveloppant.` }],
  });
};

GEN['fac-bracket'] = (level, rng) => {
  const a = nz(rng, -6, 6);
  const b = nz(rng, -6, 6);
  const c = nz(rng, -5, 5);
  const common = `(x${sgn(a)})`;
  const expr = level <= 2
    ? `${common}(x${sgn(b)})${c < 0 ? '-' : '+'}${Math.abs(c)}${common}`
    : `${common}(2x${sgn(b)})${c < 0 ? '-' : '+'}${common}(x${sgn(c)})`;
  const inner = level <= 2 ? canon(`x${sgn(b)}${sgn(c)}`) : canon(`2x${sgn(b)}${c < 0 ? '-' : '+'}(x${sgn(c)})`);
  const target = `${common}(${inner})`;
  try {
    const p = toPoly(parseAlg(inner));
    const g = p.terms().reduce((acc, t) => gcd(acc, Math.abs(t.c.n)), 0);
    if (g > 1 || p.isConst) return GEN['fac-bracket'](level, rng);
  } catch { /* fine */ }
  return algItem('fac-bracket', level, `Factorise : ${algHtml(expr)}`, target, { start: expr,
    form: 'common', key: expr, sec: 45,
    solution: [{ html: algHtml(target), note: `La parenthèse ${common.replace(/[()]/g, '')} est un facteur commun : on la sort, et on écrit ce qui reste dans une seule parenthèse.` }],
  });
};

// ---------- Identités à l'envers ----------

GEN['fac-identities'] = (level, rng) => {
  const a = level <= 2 ? 1 : rng.int(2, 5);
  let b = rng.int(1, 9);
  while (gcd(a, b) !== 1) b = rng.int(1, 9); // 9x² − 36 = 9(x − 2)(x + 2) belongs to "factoriser complètement"
  const ax = a === 1 ? 'x' : `${a}x`;
  const kind = level === 1 ? '±' : level === 2 ? rng.pick(['+', '-']) : rng.pick(['±', '+', '-']);
  const target = kind === '±' ? `(${ax}-${b})(${ax}+${b})` : `(${ax}${kind}${b})^2`;
  const shown = canon(target);
  const traps = kind === '±'
    ? [[`(${ax}-${b})^2`, 'fac_diff_squares_as_square']]
    : [[`(${ax}${kind === '+' ? '-' : '+'}${b})^2`, 'identity_sign_square'], [`(${ax}+${b})(${ax}-${b})`, 'fac_diff_squares_as_square']];
  return algItem('fac-identities', level, `Factorise avec une identité remarquable : ${algHtml(shown)}`, target, { start: shown,
    form: 'factored', traps, key: shown, sec: 35,
    solution: [{ html: algHtml(target), note: kind === '±' ? 'a² − b² = (a − b)(a + b)' : 'a² ± 2ab + b² = (a ± b)² : repère les deux carrés et vérifie le double produit.' }],
  });
};

// ---------- Trinômes ----------

function roots(rng, level) {
  for (;;) {
    const r = nz(rng, -9, 9);
    const s = nz(rng, -9, 9);
    if (r !== s && r !== -s && (level > 1 || (r < 0 && s < 0))) return [r, s];
  }
}

GEN['fac-trinomial'] = (level, rng) => {
  const [r, s] = roots(rng, level);
  const target = `(x${sgn(-r)})(x${sgn(-s)})`;
  const shown = canon(target);
  return algItem('fac-trinomial', level, `Factorise : ${algHtml(shown)}`, target, { start: shown,
    form: 'factored', traps: [[`(x${sgn(r)})(x${sgn(s)})`, 'fac_trinomial_signs']], key: shown, sec: 45,
    solution: [{ html: algHtml(target), note: `Deux nombres de somme ${-(r + s) < 0 ? '−' : ''}${Math.abs(r + s)} et de produit ${r * s < 0 ? '−' : ''}${Math.abs(r * s)} : ${-r < 0 ? '−' : ''}${Math.abs(r)} et ${-s < 0 ? '−' : ''}${Math.abs(s)}. Vérifie en redéveloppant.` }],
  });
};

GEN['fac-trinomial-a'] = (level, rng) => {
  for (;;) {
    const a = rng.int(2, level <= 2 ? 3 : 5);
    const c = rng.int(1, 3);
    const b = nz(rng, -6, 6);
    const d = nz(rng, -6, 6);
    if (gcd(a, Math.abs(b)) !== 1 || gcd(c, Math.abs(d)) !== 1) continue;
    const target = `(${a}x${sgn(b)})(${c === 1 ? '' : c}x${sgn(d)})`;
    const shown = canon(target);
    return algItem('fac-trinomial-a', level, `Factorise : ${algHtml(shown)}`, target, { start: shown,
      form: 'factored', traps: [[`(${a}x${sgn(-b)})(${c === 1 ? '' : c}x${sgn(-d)})`, 'fac_trinomial_signs']], key: shown, sec: 90,
      solution: [{ html: algHtml(target), note: 'Méthode ac : cherche deux nombres de produit a·c et de somme b, coupe le terme du milieu en deux, puis regroupe.' }],
    });
  }
};

// ---------- Factoriser complètement ----------

GEN['fac-complete'] = (level, rng) => {
  const k = rng.int(2, 5);
  const b = rng.int(1, 6);
  const [r, s] = roots(rng, 2);
  const targets = [
    `${k}(x-${b})(x+${b})`,
    `${k}(x${sgn(-r)})^2`.replace(/\(x\+0\)/, 'x'),
    `${k}x(x-${b})(x+${b})`,
    `x(x${sgn(-r)})(x${sgn(-s)})`,
    `${k}x(x${sgn(-r)})(x${sgn(-s)})`,
  ];
  const target = targets[Math.min(4, level - 1)];
  const shown = canon(target);
  return algItem('fac-complete', level, `Factorise complètement : ${algHtml(shown)}`, target, { start: shown,
    form: 'factored', key: shown, sec: 90,
    solution: [{ html: algHtml(target), note: 'D\'abord le facteur commun, puis une identité ou un trinôme sur ce qui reste. On s\'arrête quand plus rien ne se factorise.' }],
  });
};

// Question generators for the powers unit (puissances).
// Item format: see items.js.

import { Q } from '../math/rational.js';
import { parse, evaluate, walk } from '../math/expr.js';
import { solve, sup as supChars } from '../math/solver.js';
import {
  mathHtml, BLANK, stepsItem, answerItem, mcqItem, computeMcq, coprimeNum, powHtml,
} from './items.js';
import { t } from '../i18n.js';

export const GEN = {};

const show = (x) => String(x).replace(/-/g, '−');
const sup = (k) => `<sup>${show(k)}</sup>`;

// 1 000 000 with thin spaces, as written in French.
export function bigNumber(v) {
  const s = Q.of(v).toDecimal();
  const [int, frac] = s.replace('-', '').split(',');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${s.startsWith('-') ? '−' : ''}${grouped}${frac ? `,${frac}` : ''}`;
}
const numHtml = (v) => `<span class="m">${bigNumber(v)}</span>`;

// ---------- Les puissances ----------

GEN['pow-def'] = (level, rng) => {
  if (level === 1) {
    const e = rng.int(2, 3);
    const b = rng.int(2, e === 3 ? 4 : 6);
    return stepsItem('pow-def', level, `${b}^${e}`, { mode: 'guided', irreducible: false, prompt: t('Calcule.'), solveOpts: { expandPowers: true } });
  }
  if (level === 2) {
    const b = rng.int(2, 9);
    let k = rng.int(3, 6);
    if (k === b) k += 1;
    const product = Array(k).fill(b).join('×');
    const opts = [
      { html: powHtml(b, k), correct: true },
      { html: powHtml(k, b), correct: false },
      { html: mathHtml(`${b}×${k}`), correct: false, rule: 'pow_times_exponent' },
      { html: powHtml(b, k + 1), correct: false },
    ];
    return mcqItem('pow-def', level, t('Comment écrire {p} avec une puissance ?', { p: mathHtml(product) }), opts, rng, {
      solution: [{ math: `${b}^${k}`, note: t('{k} facteurs égaux à {b}.', { k, b }) }], key: `write:${b}^${k}`,
    });
  }
  if (level === 3) {
    const [b, e] = rng.pick([[rng.int(3, 12), 2], [rng.int(2, 5), 3], [2, rng.int(4, 6)], [rng.int(1, 3) * 10, 2]]);
    const expr = `${b}^${e}`;
    return answerItem('pow-def', level, t('Calcule {e}.', { e: mathHtml(expr) }), evaluate(parse(expr)).toString(), { tree: expr, keys: 'int', key: expr });
  }
  if (level === 4) {
    if (rng.chance(0.5)) {
      const d = rng.int(2, 5);
      const n = coprimeNum(rng, d, 1, d - 1);
      const e = d <= 3 && rng.chance(0.4) ? 3 : 2;
      const expr = `(${n}/${d})^${e}`;
      return answerItem('pow-def', level, t('Calcule {e}.', { e: mathHtml(expr) }), evaluate(parse(expr)).toString(), { tree: expr, keys: 'frac', key: expr });
    }
    const a = rng.int(1, 9);
    const expr = `0,${a}^2`;
    return answerItem('pow-def', level, t('Calcule {e}.', { e: mathHtml(expr) }), evaluate(parse(expr)).toDecimal(), { tree: expr, keys: 'dec', form: 'decimal', key: expr });
  }
  // Level 5: the missing exponent or base.
  const [b, e] = rng.pick([[2, rng.int(3, 7)], [3, rng.int(2, 4)], [rng.int(4, 9), 2], [rng.int(2, 5), 3], [10, rng.int(2, 6)]]);
  const v = b ** e;
  if (rng.chance(0.6)) {
    return answerItem('pow-def', level, t('Complète : {q}', { q: `${powHtml(b, '?')} = ${numHtml(v)}` }), `${e}`, {
      keys: 'int', traps: [{ value: [v / b, 1], rule: Number.isInteger(v / b) && v / b !== e && v / b <= 30 ? 'pow_times_exponent' : null }],
      solution: [{ math: `${b}^${e}`, note: `= ${Array(e).fill(b).join(' × ')} = ${v}` }], key: `exp:${b}^${e}`,
    });
  }
  return answerItem('pow-def', level, t('Complète : {q}', { q: `${BLANK}<span class="m">${sup(e)}</span> = ${numHtml(v)}` }), `${b}`, {
    keys: 'int', traps: [{ value: [v / e, 1], rule: Number.isInteger(v / e) && v / e !== b ? 'pow_times_exponent' : null }],
    solution: [{ math: `${b}^${e}`, note: `= ${Array(e).fill(b).join(' × ')} = ${v}` }], key: `base:${b}^${e}`,
  });
};

// ---------- Calculs avec des puissances ----------

function acceptablePositive(expr, max = 500) {
  try {
    const tree = parse(expr);
    let ok = true;
    walk(tree, (n) => {
      if (n.t !== 'bin' && n.t !== 'pow') return;
      const v = evaluate(n);
      if (v.n < 0 || Math.abs(v.n) > max || v.d > 64) ok = false;
    });
    return ok && solve(tree).length <= 10;
  } catch { return false; }
}

const fillSmall = (pattern, rng, max = 6) => pattern.replace(/[A-E]/g, () => `${rng.int(2, max)}`);

const POW_PATTERNS = {
  1: ['A+B^2', 'A×B^2', 'A^2-B'],
  2: ['A×B^2', '(A+B)^2', 'A+B^2', '(A×B)^2'],
  3: ['A+B^2×C', '(A+B)^2-C', 'A×B^2-C', 'A^2+B^2'],
  4: ['(A-B)^2+C', '(A×B)^2-C', 'A^3-B×C', '(A+B)^2÷C'],
  5: ['(A+B)^2-(C-D)^2', 'A×(B+C)^2-D', '(A^2-B)×C', 'F^2+G×H'],
};

GEN['pow-priority'] = (level, rng) => {
  for (let i = 0; i < 300; i++) {
    const pattern = rng.pick(POW_PATTERNS[level]);
    let expr = fillSmall(pattern, rng);
    if (pattern.startsWith('F')) {
      const d = rng.int(2, 5);
      const g = rng.int(2, 4);
      expr = `(${coprimeNum(rng, d, 1, d - 1)}/${d})^2+${coprimeNum(rng, g, 1, g - 1)}/${g}×${rng.int(1, 3)}/${rng.int(2, 4)}`;
    }
    if (!acceptablePositive(expr)) continue;
    if (!pattern.startsWith('F') && !evaluate(parse(expr)).isInt()) continue;
    if (level === 2) return computeMcq('pow-priority', level, expr, rng);
    const mode = level === 1 ? 'guided' : level === 3 ? 'tap' : 'free';
    return stepsItem('pow-priority', level, expr, { mode, prompt: pattern.startsWith('F') ? undefined : t('Calcule.') });
  }
  return stepsItem('pow-priority', level, '2×3^2+1', { prompt: t('Calcule.') });
};

// ---------- Puissances et signes ----------

GEN['pow-sign'] = (level, rng) => {
  const b = rng.int(1, level < 3 ? 4 : 6);
  if (level === 1) {
    const e = rng.int(2, b <= 2 ? 4 : 3);
    return stepsItem('pow-sign', level, `(-${Math.max(2, b)})^${e}`, { mode: 'guided', prompt: t('Calcule.'), solveOpts: { expandPowers: true } });
  }
  const bb = Math.max(2, b);
  if (level === 2) {
    const expr = rng.pick([`-${bb}^2`, `(-${bb})^2`, `(-${bb})^3`, `-${bb}^3`]);
    return computeMcq('pow-sign', level, expr, rng, { signed: true });
  }
  if (level === 3) {
    const e = rng.int(2, bb <= 3 ? 4 : 3);
    const expr = rng.pick([`(-${bb})^${e}`, `-${bb}^${e}`, `-(-${bb})^${e}`]);
    return answerItem('pow-sign', level, t('Calcule {e}.', { e: mathHtml(expr) }), evaluate(parse(expr)).toString(), { tree: expr, keys: 'rel', signed: true, key: expr });
  }
  if (level === 4) {
    const n = rng.int(5, 30);
    const expr = rng.pick([`(-1)^${n}`, `-1^${n}`, `(-1)^${n}×(-1)^${n + 1}`]);
    return answerItem('pow-sign', level, t('Calcule {e}.', { e: mathHtml(expr) }), evaluate(parse(expr)).toString(), { tree: expr, keys: 'rel', signed: true, key: expr });
  }
  for (let i = 0; i < 100; i++) {
    const [x, y] = [rng.int(2, 5), rng.int(2, 5)];
    const expr = rng.pick([`-${x}^2+(-${y})^2`, `(-${x})^3-${y}^2`, `(-${x})^2×(-${y})`, `-(${x}-${y + x})^2`]);
    try {
      if (Math.abs(evaluate(parse(expr)).n) <= 200 && solve(parse(expr)).length <= 8) return stepsItem('pow-sign', level, expr, { prompt: t('Calcule.') });
    } catch { /* try another */ }
  }
  return stepsItem('pow-sign', level, '-3^2+(-2)^2', { prompt: t('Calcule.') });
};

// ---------- Puissances de 10 ----------

GEN['pow-ten'] = (level, rng) => {
  if (level === 1) {
    const n = rng.int(1, 7);
    return answerItem('pow-ten', level, t('Écris {e} en chiffres.', { e: powHtml(10, n) }), `${10 ** n}`, { tree: `10^${n}`, keys: 'int', key: `10^${n}` });
  }
  if (level === 2) {
    const n = rng.int(2, 9);
    return answerItem('pow-ten', level, t('Complète : {q}', { q: `${numHtml(10 ** n)} = ${powHtml(10, '?')}` }), `${n}`, {
      keys: 'int', traps: [{ value: [n + 1, 1], rule: 'pow_ten_count_digits' }],
      solution: [{ math: `10^${n}`, note: t('1 suivi de {n} zéros.', { n }) }], key: `exp:${n}`,
    });
  }
  if (level === 3) {
    const n = rng.int(1, 5);
    const expr = `10^-${n}`;
    return answerItem('pow-ten', level, t('Écris {e} sous forme décimale.', { e: powHtml(10, -n) }), new Q(1, 10 ** n).toDecimal(), {
      tree: expr, keys: 'reldec', form: 'decimal', signed: true, key: expr,
    });
  }
  if (level === 4) {
    const expr = rng.pick([`${rng.pick([2, 3, 5, 7, 10, 12, 25])}^0`, `${rng.pick([2, 4, 5, 10])}^-1`, `${rng.pick([2, 3, 10])}^-2`, `10^0`]);
    return computeMcq('pow-ten', level, expr, rng, { signed: true });
  }
  const n = rng.int(1, 6);
  const small = new Q(1, 10 ** n);
  return answerItem('pow-ten', level, t('Complète : {q}', { q: `${numHtml(small)} = ${powHtml(10, '?')}` }), `${-n}`, {
    keys: 'rel', signed: true, traps: [{ value: [n, 1], rule: 'exp_sign_small_number' }],
    solution: [{ math: `10^-${n}`, note: `= 1/10${supChars(n)} = ${small.toDecimal()}` }],
    key: `exp:-${n}`,
  });
};

// ---------- Règles de calcul ----------

const BASES = [2, 3, 5, 7, 10, 'a'];

function exponentItem(level, rng, kind, b, m, n) {
  const P = (e) => powHtml(b, e);
  if (kind === 'product') {
    return answerItem('pow-rules', level, t('Complète : {q}', { q: `${P(m)} × ${P(n)} = ${P('?')}` }), `${m + n}`, {
      keys: 'rel', signed: true, traps: [{ value: [m * n, 1], rule: 'pow_product_multiply_exp' }],
      solution: [{ math: `${m}+${n}`, note: t('= {v} : on additionne les exposants.', { v: show(m + n) }) }], key: `prod:${b}:${m}:${n}`,
    });
  }
  if (kind === 'quotient') {
    const div = n !== 0 && m % n === 0 && m / n !== m - n ? m / n : null;
    return answerItem('pow-rules', level, t('Complète : {q}', { q: `${P(m)} ÷ ${P(n)} = ${P('?')}` }), `${m - n}`, {
      keys: 'rel', signed: true, traps: [{ value: [div ?? 0, 1], rule: div !== null ? 'pow_quotient_divide_exp' : null }],
      solution: [{ math: `${m}-${op(n)}`, note: t('= {v} : on soustrait les exposants.', { v: show(m - n) }) }], key: `quot:${b}:${m}:${n}`,
    });
  }
  const inner = `<span class="m"><span class="m-par">(</span>${P(m)}<span class="m-par">)</span><sup class="m-sup"><span class="m-num">${show(n)}</span></sup></span>`;
  return answerItem('pow-rules', level, t('Complète : {q}', { q: `${inner} = ${P('?')}` }), `${m * n}`, {
    keys: 'rel', signed: true, traps: [{ value: [m + n, 1], rule: 'pow_power_add_exp' }],
    solution: [{ math: `${m}×${op(n)}`, note: t('= {v} : on multiplie les exposants.', { v: show(m * n) }) }], key: `pow:${b}:${m}:${n}`,
  });
}
const op = (x) => (x < 0 ? `(${x})` : `${x}`);

GEN['pow-rules'] = (level, rng) => {
  const b = rng.pick(BASES);
  let m = rng.int(2, 7);
  let n = rng.int(2, 6);
  if (m === n && m === 2) m = 3;
  if (level === 1) return exponentItem(level, rng, 'product', b, m, n);
  if (level === 2) {
    if (rng.chance(0.4)) return exponentItem(level, rng, 'product', b, m, n);
    if (rng.chance(0.5)) { n = rng.int(2, 3); m = n * rng.int(2, 4); }
    if (m <= n) m = n + rng.int(1, 4);
    return exponentItem(level, rng, 'quotient', b, m, n);
  }
  if (level === 3) {
    const kind = rng.pick(['product', 'quotient', 'power', 'power']);
    if (kind === 'quotient' && m <= n) m = n + rng.int(1, 4);
    if (kind === 'power') n = rng.int(2, 4);
    return exponentItem(level, rng, kind, b, m, n);
  }
  if (level === 4) {
    if (rng.chance(0.35)) {
      const k = rng.int(2, 6);
      const opts = [
        { html: powHtml(2, k + 1), correct: true },
        { html: powHtml(2, 2 * k), correct: false, rule: 'pow_sum_add_exp' },
        { html: powHtml(4, k), correct: false, rule: 'pow_product_multiply_bases' },
        { html: powHtml(4, 2 * k), correct: false },
      ];
      return mcqItem('pow-rules', level, t('Combien vaut {e} ?', { e: `${powHtml(2, k)} + ${powHtml(2, k)}` }), opts, rng, {
        solution: [{ math: `2×2^${k}`, note: t('= {p} : deux fois le même nombre, c\'est le double.', { p: `2^${k + 1}` }) }], key: `sum:${k}`,
      });
    }
    const base = rng.pick([2, 3, 5]);
    const opts = [
      { html: powHtml(base, m + n), correct: true },
      { html: powHtml(base, m * n), correct: false, rule: 'pow_product_multiply_exp' },
      { html: powHtml(base * base, m + n), correct: false, rule: 'pow_product_multiply_bases' },
      { html: powHtml(base * base, m * n), correct: false },
    ];
    return mcqItem('pow-rules', level, t('Combien vaut {e} ?', { e: `${powHtml(base, m)} × ${powHtml(base, n)}` }), opts, rng, {
      solution: [{ math: `${base}^${m + n}`, note: t('{m} + {n} = {s} facteurs égaux à {b}.', { m, n, s: m + n, b: base }) }], key: `mcq:${base}:${m}:${n}`,
    });
  }
  // Level 5: negative exponents.
  const kind = rng.pick(['product', 'quotient', 'power']);
  if (kind === 'product') return exponentItem(level, rng, kind, b, m, -n);
  if (kind === 'quotient') return exponentItem(level, rng, kind, b, n, m + n - 1 > n ? m + n - 1 : n + 2);
  return exponentItem(level, rng, kind, b, -m, rng.int(2, 3));
};

// ---------- Notation scientifique ----------

// A mantissa like 3,4 (one or two digits) and its exponent.
function sciNumber(rng, small) {
  const digits = rng.chance(0.75) ? rng.int(11, 99) : rng.int(2, 9);
  const a = digits >= 10 ? new Q(digits, 10) : new Q(digits);
  const n = small ? -rng.int(2, 5) : rng.int(3, 7);
  const v = a.mul(new Q(10).pow(n));
  return { a, n, v };
}
const trailingZeros = (v) => (Q.of(v).toDecimal().match(/0+$/)?.[0].length ?? 0);
const zerosAfterComma = (v) => (Q.of(v).toDecimal().match(/^0,(0*)/)?.[1].length ?? 0);

GEN['pow-sci'] = (level, rng) => {
  if (level === 1 || level === 2) {
    const { a, n, v } = sciNumber(rng, level === 2);
    const wrongZeros = n > 0 ? trailingZeros(v) : -zerosAfterComma(v);
    const traps = [{ value: [wrongZeros, 1], rule: wrongZeros !== n ? 'sci_count_zeros' : null }];
    if (n < 0) traps.push({ value: [-n, 1], rule: 'exp_sign_small_number' });
    return answerItem('pow-sci', level, t('Complète : {q}', { q: `${numHtml(v)} = <span class="m">${a.toDecimal()}</span> × ${powHtml(10, '?')}` }), `${n}`, {
      keys: 'rel', signed: true, traps,
      solution: [{ math: `${a.toDecimal()}×10^${n}`, note: n > 0 ? t('La virgule se déplace de {n} rangs vers la droite.', { n: Math.abs(n) }) : t('La virgule se déplace de {n} rangs vers la gauche.', { n: Math.abs(n) }) }],
      key: `exp:${v}`,
    });
  }
  if (level === 3) {
    const { a, n, v } = sciNumber(rng, rng.chance(0.3));
    const s = (m, e) => mathHtml(`${m.toDecimal()}×10^${e}`);
    const zeros = n > 0 ? trailingZeros(v) : -zerosAfterComma(v);
    const opts = [
      { html: s(a, n), correct: true },
      { html: s(a.mul(10), n - 1), correct: false, rule: 'sci_mantissa_range' },
      { html: s(a.div(10), n + 1), correct: false, rule: 'sci_mantissa_range' },
      { html: s(a, zeros !== n ? zeros : n + 1), correct: false, rule: zeros !== n ? 'sci_count_zeros' : null },
    ];
    return mcqItem('pow-sci', level, t('Quelle est la notation scientifique de {v} ?', { v: numHtml(v) }), opts, rng, {
      solution: [{ math: `${a.toDecimal()}×10^${n}`, note: t('{a} est entre 1 et 10.', { a: a.toDecimal() }) }], key: `which:${v}`,
    });
  }
  if (level === 4) {
    const { a, n } = sciNumber(rng, rng.chance(0.5));
    const nn = n > 0 ? Math.min(n, 5) : n;
    const expr = `${a.toDecimal()}×10^${nn}`;
    return answerItem('pow-sci', level, t('Écris {e} sous forme décimale.', { e: mathHtml(expr) }), evaluate(parse(expr)).toDecimal(), {
      tree: expr, keys: 'reldec', form: 'decimal', signed: true, key: expr,
    });
  }
  if (rng.chance(0.5)) {
    const [x, y] = rng.pick([[2, 3], [2, 4], [3, 3], [2, 2], [1.5, 4], [2.5, 2], [3, 2]]);
    const m = rng.int(2, 6);
    const n = rng.int(2, 6);
    const X = Q.fromDecimal(String(x)).toDecimal();
    return answerItem('pow-sci', level, t('Complète : {q}', { q: `(<span class="m">${X}</span> × ${powHtml(10, m)}) × (<span class="m">${y}</span> × ${powHtml(10, n)}) = <span class="m">${Q.fromDecimal(String(x * y)).toDecimal()}</span> × ${powHtml(10, '?')}` }), `${m + n}`, {
      keys: 'rel', signed: true, traps: [{ value: [m * n, 1], rule: m * n !== m + n ? 'pow_product_multiply_exp' : null }],
      solution: [{ math: `${m}+${n}`, note: t('= {s} : on multiplie {x} × {y} et on additionne les exposants.', { s: m + n, x: X, y }) }], key: `prod:${x}:${m}:${y}:${n}`,
    });
  }
  const a = rng.int(2, 3);
  const m = rng.int(2, 5);
  return answerItem('pow-sci', level, t('Complète : {q}', { q: `(<span class="m">${a}</span> × ${powHtml(10, m)})<sup>2</sup> = ${BLANK} × ${powHtml(10, 2 * m)}` }), `${a * a}`, {
    keys: 'int', traps: [{ value: [a, 1], rule: 'pow_forget_coefficient' }],
    solution: [{ math: `${a}^2`, note: t('= {s} : le carré porte sur {a} aussi, pas seulement sur {p}.', { s: a * a, a, p: `10${supChars(m)}` }) }], key: `sq:${a}:${m}`,
  });
};

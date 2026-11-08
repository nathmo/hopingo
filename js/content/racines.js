// Question generators for the square-roots unit (racines carrées).
// Item format: see items.js.

import { Q } from '../math/rational.js';
import { parse, evaluate } from '../math/expr.js';
import { solve } from '../math/solver.js';
import {
  mathHtml, stepsItem, answerItem, mcqItem, computeMcq, SYM, symbolOptions,
} from './items.js';

export const GEN = {};

const show = (x) => String(x).replace(/-/g, '−');
const text = (s) => `<span class="m">${s}</span>`;
const isSquare = (n) => n >= 0 && Number.isInteger(Math.sqrt(n));

// A whole number that is not a perfect square, in [lo, hi].
function nonSquare(rng, lo, hi) {
  for (let i = 0; i < 50; i++) {
    const n = rng.int(lo, hi);
    if (!isSquare(n)) return n;
  }
  return 50;
}

// Pythagorean pairs: a² + b² is a square, so both readings give whole numbers.
const TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [9, 12, 15], [12, 5, 13], [8, 15, 17], [12, 16, 20]];

// ---------- Racines carrées ----------

GEN['root-squares'] = (level, rng) => {
  if (level === 1) {
    const ns = rng.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, 4);
    return {
      skill: 'root-squares', level, type: 'match',
      prompt: 'Relie chaque racine carrée à sa valeur.',
      pairs: ns.map((n) => [mathHtml(`√${n * n}`), mathHtml(`${n}`)]),
      baits: [],
      solution: ns.map((n) => ({ math: `√${n * n}`, note: `= ${n} car ${n}² = ${n * n}` })),
      expectedSec: 25, key: `root-squares:match:${ns.join()}`,
    };
  }
  if (level === 2) {
    const n = rng.int(1, 12);
    const expr = `√${n * n}`;
    return answerItem('root-squares', level, `Calcule ${mathHtml(expr)}.`, `${n}`, { tree: expr, keys: 'int', key: expr });
  }
  if (level === 3) return computeMcq('root-squares', level, `√${rng.int(2, 15) ** 2}`, rng);
  if (level === 4) {
    if (rng.chance(0.5)) {
      const n = rng.pick([2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 20, 30, 100]) * 10;
      const expr = `√${n * n}`;
      return answerItem('root-squares', level, `Calcule ${mathHtml(expr)}.`, `${n}`, { tree: expr, keys: 'int', key: expr });
    }
    const n = rng.int(1, 9);
    const d = rng.pick([2, 3, 4, 5, 10]);
    const v = new Q(n, d);
    const expr = `√(${v.n * v.n}/${v.d * v.d})`;
    return answerItem('root-squares', level, `Calcule ${mathHtml(expr)}.`, v.toString(), { tree: expr, keys: 'frac', key: expr });
  }
  const n = rng.int(3, 12);
  const half = new Q(n * n, 2);
  const opts = [
    { html: mathHtml(`${n}`), correct: true },
    { html: `${text(show(-n))} et ${text(`${n}`)}`, correct: false, rule: 'sqrt_plus_minus' },
    { html: mathHtml(`${-n}`), correct: false, rule: 'sqrt_plus_minus' },
    { html: mathHtml(half.isInt() ? `${half.n}` : half.toDecimal()), correct: false, rule: 'sqrt_half' },
  ];
  return mcqItem('root-squares', level, `Combien vaut ${mathHtml(`√${n * n}`)} ?`, opts, rng, {
    solution: [{ math: `√${n * n}`, note: `= ${n} : le symbole √ désigne le nombre positif.` }], key: `pm:${n}`,
  });
};

// ---------- Encadrer une racine ----------

GEN['root-estimate'] = (level, rng) => {
  const hi = [0, 50, 100, 150, 200, 400][level];
  const n = nonSquare(rng, 3, hi);
  const k = Math.floor(Math.sqrt(n));
  const half = Math.floor(n / 2);
  const why = { math: `√${n}`, note: `${k}² = ${k * k} < ${n} < ${(k + 1) ** 2} = ${k + 1}², donc ${k} < √${n} < ${k + 1}.` };
  if (level === 1) {
    const pairs = [[k, k + 1, true, null], [k - 1, k, false, null], [k + 1, k + 2, false, null]];
    if (half > k + 1) pairs.push([half, half + 1, false, 'sqrt_half']);
    else pairs.push([k + 2, k + 3, false, null]);
    const opts = pairs.filter(([a]) => a >= 0).map(([a, b, correct, rule]) => ({ html: `${text(a)} et ${text(b)}`, correct, rule }));
    return mcqItem('root-estimate', level, `Entre quels entiers consécutifs se trouve ${mathHtml(`√${n}`)} ?`, opts, rng, {
      solution: [why], key: `between:${n}`,
    });
  }
  if (level === 2) {
    return answerItem('root-estimate', level, `Quel est le plus grand entier plus petit que ${mathHtml(`√${n}`)} ?`, `${k}`, {
      keys: 'int', traps: [{ value: [half, 1], rule: half !== k ? 'sqrt_half' : null }],
      solution: [why], key: `floor:${n}`,
    });
  }
  if (level === 3) {
    const closest = n - k * k <= (k + 1) ** 2 - n ? k : k + 1;
    const opts = [k - 1, k, k + 1].map((x) => ({ html: text(x), correct: x === closest, rule: null }));
    if (half > k + 1) opts.push({ html: text(half), correct: false, rule: 'sqrt_half' });
    else opts.push({ html: text(k + 2), correct: false });
    return mcqItem('root-estimate', level, `Quel entier est le plus proche de ${mathHtml(`√${n}`)} ?`, opts, rng, {
      solution: [why, { math: `${closest}^2`, note: `= ${closest * closest}, le carré le plus proche de ${n}.` }], key: `closest:${n}`,
    });
  }
  if (level === 4) {
    const m = rng.pick([k, k + 1]);
    const right = SYM(n - m * m);
    const options = symbolOptions(right, [['sqrt_half', SYM(n / 2 - m)]]);
    return mcqItem('root-estimate', level, `Compare : ${mathHtml(`√${n}`)} <span class="m-q">?</span> ${text(m)}`, options, rng, {
      keepOrder: true, big: true,
      solution: [{ math: `${m}^2`, note: `= ${m * m}, et ${n} ${right} ${m * m}, donc √${n} ${right} ${m}.` }], key: `cmp:${n}:${m}`,
    });
  }
  // Level 5: the largest of roots and whole numbers.
  for (let i = 0; i < 50; i++) {
    const items = [
      { r: nonSquare(rng, 10, 150) }, { r: nonSquare(rng, 10, 150) },
      { w: rng.int(3, 12) }, { w: rng.int(3, 12) },
    ];
    const val = (x) => (x.r ? Math.sqrt(x.r) : x.w);
    const halfView = (x) => (x.r ? x.r / 2 : x.w);
    const vs = items.map(val);
    if (new Set(vs.map((v) => v.toFixed(6))).size < 4) continue;
    const best = vs.indexOf(Math.max(...vs));
    const hv = items.map(halfView);
    const fooled = hv.indexOf(Math.max(...hv));
    const opts = items.map((x, j) => ({
      html: x.r ? mathHtml(`√${x.r}`) : text(x.w), correct: j === best,
      rule: j !== best && j === fooled && items[j].r ? 'sqrt_half' : null,
    }));
    const b = items[best];
    return mcqItem('root-estimate', level, 'Quel est le plus grand nombre ?', opts, rng, {
      big: true,
      solution: [{ math: b.r ? `√${b.r}` : `${b.w}`, note: 'Compare les carrés : le plus grand carré donne le plus grand nombre.' }],
      key: `max:${items.map((x) => x.r ?? `w${x.w}`).join()}`,
    });
  }
  return GEN['root-estimate'](1, rng);
};

// ---------- Calculer avec des racines ----------

const DECIMAL_ROOTS = ['0,25', '0,09', '0,16', '0,36', '0,49', '0,64', '0,81', '1,44', '1,21', '0,04', '2,25', '0,01'];

function acceptableRoot(expr) {
  try {
    const tree = parse(expr);
    const v = evaluate(tree);
    return v.isInt() && v.n >= 0 && v.n <= 300 && solve(tree).length <= 8;
  } catch { return false; }
}

const ROOT_PATTERNS = ['A+B×√S', '(√S+A)^2', '√(S+T)-A', '√S×√T+A', 'A×√S-√T', '√(P^2+Q^2)'];

GEN['root-calc'] = (level, rng) => {
  if (level === 1) {
    if (rng.chance(0.5)) {
      const s = rng.pick(DECIMAL_ROOTS);
      const expr = `√${s}`;
      return answerItem('root-calc', level, `Calcule ${mathHtml(expr)}.`, evaluate(parse(expr)).toDecimal(), { tree: expr, keys: 'dec', form: 'decimal', key: expr });
    }
    const v = new Q(rng.int(1, 7), rng.int(2, 9));
    const expr = `√(${v.n * v.n}/${v.d * v.d})`;
    return answerItem('root-calc', level, `Calcule ${mathHtml(expr)}.`, v.toString(), { tree: expr, keys: 'frac', key: expr });
  }
  if (level === 2) {
    const [a, b] = rng.pick(TRIPLES);
    const expr = rng.chance(0.5) ? `√(${a * a}+${b * b})` : `√${a * a}+√${b * b}`;
    return computeMcq('root-calc', level, expr, rng);
  }
  if (level === 3) {
    if (rng.chance(0.5)) {
      const n = nonSquare(rng, 2, 30);
      const expr = `(√${n})^2`;
      return answerItem('root-calc', level, `Calcule ${mathHtml(expr)}.`, `${n}`, {
        tree: expr, keys: 'rel', signed: true,
        traps: [{ value: [n * n, 1], rule: 'sqrt_squared_squares' }],
        solution: [{ math: expr, note: `= ${n} : √${n} est le nombre dont le carré vaut ${n}.` }], key: expr,
      });
    }
    const n = rng.int(2, 9);
    const expr = `√((-${n})^2)`;
    return answerItem('root-calc', level, `Calcule ${mathHtml(expr)}.`, `${n}`, {
      tree: expr, keys: 'rel', signed: true,
      traps: [{ value: [-n, 1], rule: 'sqrt_of_square_sign' }], key: expr,
    });
  }
  if (level === 4) {
    for (let i = 0; i < 300; i++) {
      const pattern = rng.pick(ROOT_PATTERNS);
      const [p, q] = rng.pick(TRIPLES);
      const expr = pattern
        .replace(/A/g, () => `${rng.int(1, 6)}`).replace(/B/g, () => `${rng.int(2, 5)}`)
        .replace(/S/g, () => `${rng.int(1, 10) ** 2}`).replace(/T/g, () => `${rng.int(1, 10) ** 2}`)
        .replace('P', `${p}`).replace('Q', `${q}`);
      if (acceptableRoot(expr)) return stepsItem('root-calc', level, expr, { prompt: 'Calcule.' });
    }
    return stepsItem('root-calc', level, '√(9+16)-2', { prompt: 'Calcule.' });
  }
  const n = rng.int(2, 9);
  if (rng.chance(0.5)) {
    const opts = [
      { html: 'n\'existe pas', correct: true },
      { html: mathHtml(`${-n}`), correct: false, rule: 'sqrt_negative_radicand' },
      { html: mathHtml(`${n}`), correct: false, rule: 'sqrt_negative_radicand' },
      { html: `${text(show(-n))} et ${text(`${n}`)}`, correct: false, rule: 'sqrt_negative_radicand' },
    ];
    return mcqItem('root-calc', level, `Combien vaut ${mathHtml(`√(${-n * n})`)} ?`, opts, rng, {
      solution: [{ math: `${n}^2`, note: `= ${n * n} et (−${n})² = ${n * n} : aucun carré ne vaut −${n * n}.` }], key: `neg:${n}`,
    });
  }
  const expr = `-√${n * n}`;
  return answerItem('root-calc', level, `Calcule ${mathHtml(expr)}.`, `${-n}`, { tree: expr, keys: 'rel', signed: true, key: expr });
};

// ---------- Équations x² = a ----------

const X2 = (a) => `<span class="m"><i class="m-var">x</i><sup class="m-sup">2</sup> = ${a}</span>`;
const two = (v) => `${text(show(v.neg().toString()))} et ${text(v.toString())}`;

GEN['root-eq'] = (level, rng) => {
  const n = rng.int(3, 12);
  if (level === 1 || level === 2) {
    const kind = level === 1 ? 'pos' : rng.pick(['pos', 'zero', 'neg', 'neg']);
    const a = kind === 'pos' ? n * n : kind === 'zero' ? 0 : -n * n;
    const half = new Q(n * n, 2);
    const opts = [
      { html: `${text(show(-n))} et ${text(n)}`, correct: kind === 'pos', rule: kind === 'neg' ? 'square_negative_solutions' : null },
      { html: `seulement ${text(n)}`, correct: false, rule: kind === 'pos' ? 'square_eq_one_solution' : kind === 'neg' ? 'square_negative_solutions' : null },
      { html: 'aucune solution', correct: kind === 'neg' },
      kind === 'zero'
        ? { html: `seulement ${text(0)}`, correct: true }
        : { html: `seulement ${text(half.isInt() ? half.n : half.toDecimal())}`, correct: false, rule: kind === 'pos' ? 'sqrt_half' : null },
    ];
    const note = kind === 'pos' ? `${n}² = ${n * n} et (−${n})² = ${n * n} : deux solutions.` : kind === 'zero' ? 'Seul 0 a pour carré 0.' : 'Un carré n\'est jamais négatif : pas de solution.';
    return mcqItem('root-eq', level, `Quelles sont les solutions de ${X2(show(a))} ?`, opts, rng, {
      solution: [{ math: kind === 'neg' ? `${n}^2` : `${kind === 'zero' ? 0 : n}^2`, note }], key: `${kind}:${a}`,
    });
  }
  if (level === 3) {
    const negative = rng.chance(0.6);
    return answerItem('root-eq', level, `${X2(n * n)} et <i>x</i> est ${negative ? 'négatif' : 'positif'}. Que vaut <i>x</i> ?`, `${negative ? -n : n}`, {
      keys: 'rel', signed: true,
      traps: [{ value: [n * n, 2], rule: 'sqrt_half' }, { value: [negative ? n : -n, 1], rule: negative ? 'square_eq_one_solution' : null }],
      solution: [{ math: `${negative ? `(-${n})` : n}^2`, note: `= ${n * n}` }], key: `sign:${n}:${negative}`,
    });
  }
  if (level === 4) {
    // A fraction or a decimal, never a whole number (and never 1/2 × 2 = its own half).
    let v = new Q(1, 3);
    for (let i = 0; i < 30; i++) {
      v = rng.chance(0.5) ? new Q(rng.int(1, 7), rng.int(2, 9)) : new Q(rng.int(1, 12), 10);
      if (!v.isInt() && !v.mul(v).div(2).eq(v)) break;
    }
    const sq = v.mul(v);
    const dec = v.d === 10 || v.d === 5 || v.d === 2;
    const s = (q) => (dec && q.toDecimal() ? q.toDecimal() : q.toString());
    const val = (q) => (q.isInt() || !s(q).includes('/') ? text(show(s(q))) : mathHtml(q.toString()));
    const opts = [
      { html: `${val(v.neg())} et ${val(v)}`, correct: true },
      { html: `seulement ${val(v)}`, correct: false, rule: 'square_eq_one_solution' },
      { html: `seulement ${val(sq.div(2))}`, correct: false, rule: 'sqrt_half' },
      { html: 'aucune solution', correct: false },
    ];
    const a = dec && sq.toDecimal() ? text(sq.toDecimal()) : mathHtml(sq.toString());
    return mcqItem('root-eq', level, `Quelles sont les solutions de <span class="m"><i class="m-var">x</i><sup class="m-sup">2</sup> = </span>${a} ?`, opts, rng, {
      solution: [{ math: `(${v})^2`, note: `= ${s(sq)}, et (−${s(v)})² aussi.` }], key: `frac:${sq}`,
    });
  }
  if (rng.chance(0.5)) {
    const area = n * n;
    return answerItem('root-eq', level, `Un carré a une aire de ${area} cm². Quelle est la longueur de son côté ?`, `${n}`, {
      keys: 'int', suffix: 'cm',
      traps: [{ value: [area, 2], rule: 'sqrt_half' }],
      solution: [{ math: `√${area}`, note: `= ${n} car ${n} × ${n} = ${area}.` }], key: `area:${n}`,
    });
  }
  const c = rng.int(1, 20);
  return answerItem('root-eq', level, `<span class="m"><i class="m-var">x</i><sup class="m-sup">2</sup> + ${c} = ${n * n + c}</span>, et <i>x</i> est positif. Que vaut <i>x</i> ?`, `${n}`, {
    keys: 'rel', signed: true,
    traps: [{ value: [n * n + c, 2], rule: 'sqrt_half' }],
    solution: [{ math: `${n * n + c}-${c}`, note: `= ${n * n}, donc x² = ${n * n} et x = ${n}.` }], key: `shift:${n}:${c}`,
  });
};

// ---------- Produits de racines ----------

const PRODUCT_PAIRS = [[2, 8], [3, 12], [2, 18], [5, 20], [3, 27], [2, 32], [6, 24], [7, 28], [5, 45], [8, 18], [2, 50], [3, 48], [6, 54], [10, 40]];
const QUOTIENT_PAIRS = [[50, 2], [75, 3], [98, 2], [48, 3], [45, 5], [72, 2], [27, 3], [80, 5], [200, 2], [63, 7], [12, 3], [32, 2]];

GEN['root-rules'] = (level, rng) => {
  if (level === 1) {
    const [a, b] = rng.pick(PRODUCT_PAIRS);
    const r = Math.sqrt(a * b);
    const opts = [
      { html: text(r), correct: true },
      { html: mathHtml(`√${a + b}`), correct: false, rule: 'sqrt_product_add' },
      { html: text(a * b), correct: false, rule: 'sqrt_forget_root' },
      { html: mathHtml(`√${r}`), correct: false },
    ];
    return mcqItem('root-rules', level, `Combien vaut ${mathHtml(`√${a}×√${b}`)} ?`, opts, rng, {
      solution: [{ math: `√(${a}×${b})`, note: `= √${a * b} = ${r}` }], key: `mcq:${a}:${b}`,
    });
  }
  if (level === 2) {
    const [a, b] = rng.pick(PRODUCT_PAIRS);
    const expr = `√${a}×√${b}`;
    return answerItem('root-rules', level, `Calcule ${mathHtml(expr)}.`, `${Math.sqrt(a * b)}`, {
      tree: expr, keys: 'int', traps: [{ value: [a * b, 1], rule: 'sqrt_forget_root' }], key: expr,
    });
  }
  if (level === 3) {
    const [a, b] = rng.pick(QUOTIENT_PAIRS);
    const expr = `√${a}÷√${b}`;
    return answerItem('root-rules', level, `Calcule ${mathHtml(expr)}.`, `${Math.sqrt(a / b)}`, {
      tree: expr, keys: 'int', traps: [{ value: [a / b, 1], rule: 'sqrt_forget_root' }], key: expr,
    });
  }
  if (level === 4) {
    const [p, q, r] = rng.pick(TRIPLES.filter(([x, y]) => x < y));
    const eq = (l, rr) => `${mathHtml(l)} <span class="m">=</span> ${mathHtml(rr)}`;
    const opts = [
      { html: eq(`√(${p * p}×${q * q})`, `${p}×${q}`), correct: true },
      { html: eq(`√(${p * p}+${q * q})`, `${p}+${q}`), correct: false, rule: 'sqrt_distribute_sum' },
      { html: eq(`√${p * p}+√${q * q}`, `√${r * r}`), correct: false, rule: 'sqrt_combine_sum' },
      { html: eq(`√(${q * q}-${p * p})`, `${q}-${p}`), correct: false, rule: 'sqrt_distribute_sum' },
    ];
    return mcqItem('root-rules', level, 'Quelle égalité est vraie ?', opts, rng, {
      solution: [{ math: `√(${p * p}×${q * q})`, note: `= √${p * p * q * q} = ${p * q} : ça marche pour ×, pas pour + et −.` }], key: `which:${p}:${q}`,
    });
  }
  if (rng.chance(0.5)) {
    const n = nonSquare(rng, 2, 20);
    const expr = `√${n}×√${n}`;
    return answerItem('root-rules', level, `Calcule ${mathHtml(expr)}.`, `${n}`, {
      tree: expr, keys: 'int', traps: [{ value: [n * n, 1], rule: 'sqrt_forget_root' }], key: expr,
    });
  }
  const k = rng.int(2, 5);
  const m = nonSquare(rng, 2, 7);
  return answerItem('root-rules', level, `Calcule ${mathHtml(`(${k}×√${m})^2`)}.`, `${k * k * m}`, {
    keys: 'int',
    traps: [{ value: [k * m, 1], rule: 'pow_forget_coefficient' }, { value: [k * k * m * m, 1], rule: 'sqrt_squared_squares' }],
    solution: [{ math: `${k}^2×(√${m})^2`, note: `= ${k * k} × ${m} = ${k * k * m} : on élève chaque facteur au carré.` }],
    key: `coef:${k}:${m}`,
  });
};

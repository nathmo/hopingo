// Arithmetic: divisibility, primes, prime factorisation, GCD and LCM, and
// their uses (fractions, √72 = 6√2). Also the "writings of a number"
// skills: decimal ↔ fraction ↔ percent, number sets, irrationals, cube
// roots.

import { gcd } from '../math/rational.js';
import { answerItem, mcqItem, mathHtml, stepsItem } from './items.js';

const m = (s) => `<span class="m">${s}</span>`;
const num = (x) => `<span class="m-num">${String(x).replace('-', '−')}</span>`;
const big = (x) => (Math.abs(x) >= 10000 ? String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(x));
const fix = (x) => Math.round(x * 1e9) / 1e9;
const dec = (x) => String(fix(x)).replace('.', ',');
const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
const lcm = (a, b) => (a / gcd(a, b)) * b;

export const isPrime = (n) => {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
};

// 360 → [[2, 3], [3, 2], [5, 1]]
export function primeFactors(n) {
  const out = [];
  for (let d = 2; n > 1; d++) {
    let k = 0;
    while (n % d === 0) { n /= d; k += 1; }
    if (k) out.push([d, k]);
  }
  return out;
}
export const factorString = (n) => primeFactors(n).map(([p, k]) => (k > 1 ? `${p}^${k}` : `${p}`)).join('×');
const factorText = (n) => primeFactors(n).map(([p, k]) => (k > 1 ? `${p}${'⁰¹²³⁴⁵⁶⁷⁸⁹'[k]}` : `${p}`)).join(' × ');
const divisors = (n) => range(1, n).filter((d) => n % d === 0);
const digitSum = (n) => String(n).split('').reduce((s, c) => s + Number(c), 0);

// Factor tree written as lines: 360 = 2 × 180 = 2 × 2 × 90…
function factorLines(n) {
  const lines = [];
  const done = [];
  let rest = n;
  while (rest > 1 && !isPrime(rest)) {
    const p = range(2, rest).find((d) => rest % d === 0);
    done.push(p);
    rest /= p;
    lines.push({ math: [...done, rest].join('×'), note: `${rest * p} = ${p} × ${rest}` });
  }
  lines.push({ math: factorString(n), note: 'Tous les facteurs sont premiers.' });
  return lines;
}

const yesNo = (skill, level, prompt, right, wrongs, rng, opts = {}) => mcqItem(skill, level, prompt,
  [{ html: right, correct: true }, ...wrongs.map(([html, rule]) => ({ html, correct: false, rule }))], rng, opts);

export const GEN = {};

// ---------- Critères de divisibilité ----------

GEN['ar-div'] = (level, rng) => {
  if (level <= 3) {
    const d = { 1: rng.pick([2, 5, 10]), 2: rng.pick([3, 9]), 3: 4 }[level];
    const ok = (n) => n % d === 0;
    const right = (() => { for (;;) { const n = rng.int(100, 9999); if (ok(n)) return n; } })();
    const wrongs = [];
    const add = (n, rule) => { if (!ok(n) && !wrongs.some(([x]) => x === n) && n !== right) wrongs.push([n, rule]); };
    for (let i = 0; wrongs.length < 3 && i < 300; i++) {
      let n = rng.int(100, 9999);
      let rule = null;
      if (d === 3 || d === 9) { n = n - (n % 10) + d; rule = 'div_last_digit'; } // ends with 3 or 9, not a multiple
      if (d === 9 && i % 2) { n = 3 * rng.int(40, 3000); rule = null; } // a multiple of 3 only
      if (d === 4 && i % 2) { n = n - (n % 2); rule = 'div_last_digit'; } // even, not a multiple of 4
      add(n, rule);
    }
    const rule = { 2: 'son dernier chiffre est pair', 5: 'il se termine par 0 ou 5', 10: 'il se termine par 0', 3: `la somme de ses chiffres (${digitSum(right)}) est un multiple de 3`, 9: `la somme de ses chiffres (${digitSum(right)}) est un multiple de 9`, 4: `le nombre formé par ses deux derniers chiffres (${right % 100}) est un multiple de 4` }[d];
    return yesNo('ar-div', level, `Lequel de ces nombres est divisible par ${d} ?`, m(num(big(right))),
      wrongs.map(([n, r]) => [m(num(big(n))), r]), rng, {
        solution: [{ math: String(right), note: `Divisible par ${d} : ${rule}.` }], key: `${d}:${right}`,
      });
  }
  if (level === 4) {
    const d = rng.pick([3, 9]);
    const yes = rng.chance(0.5);
    let n;
    for (;;) { n = rng.int(1000, 9999); if ((n % d === 0) === yes && n % 10 !== d) break; }
    const s = digitSum(n);
    const digits = String(n).split('').join(' + ');
    const right = yes ? `Oui : ${digits} = ${s}, un multiple de ${d}` : `Non : ${digits} = ${s}, pas un multiple de ${d}`;
    const wrongs = yes
      ? [[`Non : il ne se termine pas par ${d}`, 'div_last_digit'], [`Non : ${n % 2 ? 'il est impair' : 'il est pair'}`, null]]
      : [[`Oui : ${n % 2 ? 'il est impair' : 'il est pair'}`, null], [`Oui : son dernier chiffre est ${n % 10}`, 'div_last_digit']];
    return yesNo('ar-div', level, `${m(num(big(n)))} est-il divisible par ${d} ?`, right, wrongs, rng, { key: `yn${d}:${n}` });
  }
  const n = rng.pick([180, 240, 360, 450, 540, 630, 720, 900, 1260, 2340, 1080]) * rng.pick([1, 1, 7, 11]);
  const cands = [2, 3, 4, 5, 6, 8, 9, 10, 12, 25];
  const not = cands.filter((d) => n % d !== 0);
  const yes = cands.filter((d) => n % d === 0);
  if (!not.length) return GEN['ar-div'](4, rng);
  const right = rng.pick(not);
  const opts = rng.shuffle(yes).slice(0, 3);
  return yesNo('ar-div', level, `Par lequel de ces nombres ${m(num(big(n)))} n'est-il <b>pas</b> divisible ?`, m(num(right)),
    opts.map((d) => [m(num(d)), null]), rng, { key: `not:${n}:${right}` });
};

// ---------- Multiples et diviseurs ----------

GEN['ar-divisors'] = (level, rng) => {
  if (level === 1 || level === 3) {
    const n = level === 1 ? rng.pick([12, 18, 20, 24, 30, 36, 40, 42, 48]) : rng.int(6, 13);
    if (level === 1) {
      const ds = divisors(n).filter((d) => d > 1 && d < n);
      const right = rng.pick(ds);
      const wrongs = rng.shuffle(range(2, n - 1).filter((d) => n % d !== 0)).slice(0, 3);
      return yesNo('ar-divisors', level, `Lequel est un diviseur de ${m(num(n))} ?`, m(num(right)), wrongs.map((d) => [m(num(d)), null]), rng, {
        solution: [{ math: `${n}÷${right}`, note: `= ${n / right}, sans reste.` }], key: `div:${n}:${right}`,
      });
    }
    const right = n * rng.int(3, 12);
    const wrongs = [right + 1, right - 2, right + n - 1].map((x) => [m(num(x)), null]);
    return yesNo('ar-divisors', level, `Lequel est un multiple de ${m(num(n))} ?`, m(num(right)), wrongs, rng, {
      solution: [{ math: `${n}×${right / n}`, note: `= ${right}` }], key: `mul:${n}:${right}`,
    });
  }
  if (level === 2 || level === 5) {
    const n = level === 2 ? rng.pick([6, 8, 10, 12, 14, 15, 16, 18, 20]) : rng.pick([24, 30, 36, 40, 48, 60, 72, 100]);
    const ds = divisors(n);
    return answerItem('ar-divisors', level, `Combien de diviseurs a ${m(num(n))} ? (1 et ${n} comptent aussi)`, String(ds.length), {
      keys: 'int', traps: [{ value: [ds.length - 2, 1], rule: 'divisors_forget_ends' }],
      solution: [{ math: String(n), note: `Diviseurs : ${ds.join(', ')}.` }], key: `count:${n}`,
    });
  }
  const n = rng.int(11, 25);
  const k = rng.int(4, 9);
  return answerItem('ar-divisors', level, `Quel est le ${k}<sup>e</sup> multiple de ${m(num(n))} (en commençant par ${n}) ?`, String(n * k), {
    keys: 'int', solution: [{ math: `${n}×${k}`, note: `= ${n * k}` }], key: `kth:${n}:${k}`,
  });
};

// ---------- Nombres premiers ----------

GEN['ar-prime'] = (level, rng) => {
  if (level <= 2 || level === 4) {
    const pool = level === 1 ? range(2, 20) : level === 2 ? range(2, 50) : range(50, 99);
    const primes = pool.filter(isPrime);
    const right = rng.pick(primes);
    const traps = [];
    if (level === 1) traps.push([1, 'one_is_prime']);
    const odd = rng.shuffle(pool.filter((n) => n % 2 && !isPrime(n) && n > 1));
    for (const n of odd) if (traps.length < 3) traps.push([n, 'odd_is_prime']);
    return yesNo('ar-prime', level, 'Lequel de ces nombres est premier ?', m(num(right)), traps.map(([n, r]) => [m(num(n)), r]), rng, {
      solution: [{ math: String(right), note: 'Il n\'a que deux diviseurs : 1 et lui-même.' }, ...traps.filter(([n]) => n > 1).map(([n]) => ({ math: factorString(n), note: `${n} n'est pas premier.` }))],
      key: `p:${right}`,
    });
  }
  if (level === 3) {
    const n = rng.pick([21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93]);
    const [p] = primeFactors(n)[0];
    return yesNo('ar-prime', level, `${m(num(n))} est-il un nombre premier ?`, `Non : ${n} = ${p} × ${n / p}`,
      [['Oui : il est impair', 'odd_is_prime'], ['Oui : il n\'est pas dans les livrets de 2, 5 et 10', 'odd_is_prime'], ['Oui : on ne peut pas le diviser par 2', 'odd_is_prime']], rng, { key: `q:${n}` });
  }
  const [lo, hi] = rng.pick([[20, 40], [40, 60], [60, 80], [80, 100], [10, 30]]);
  const ps = range(lo, hi).filter(isPrime);
  return answerItem('ar-prime', level, `Combien y a-t-il de nombres premiers entre ${lo} et ${hi} ?`, String(ps.length), {
    keys: 'int', solution: [{ math: String(ps.length), note: `Ce sont ${ps.join(', ')}.` }], key: `count:${lo}`,
  });
};

// ---------- Décomposition en facteurs premiers ----------

const FACTOR_POOLS = {
  1: () => [12, 15, 18, 20, 21, 28, 30, 35, 42, 45, 50],
  2: () => [24, 36, 40, 48, 54, 56, 60, 63, 72, 75, 84, 90, 98, 100],
  3: () => [120, 126, 144, 150, 168, 180, 196, 200, 210, 225, 252, 270, 300, 360],
  4: () => [378, 400, 420, 450, 504, 540, 588, 600, 630, 720, 750, 792, 840, 900, 980],
  5: () => [1001, 1155, 1260, 1386, 1540, 1800, 2002, 2310, 2520, 3150, 4620],
};

GEN['ar-factor'] = (level, rng) => {
  const n = rng.pick(FACTOR_POOLS[level]());
  return {
    ...answerItem('ar-factor', level, `Décompose ${m(num(big(n)))} en produit de facteurs premiers.`, factorString(n), {
      keys: 'prod', solution: factorLines(n), key: `f:${n}`, expectedSec: 30,
    }),
    checker: 'primes', target: n, expectedHtml: mathHtml(factorString(n)),
  };
};

// ---------- PGDC et PPMC ----------

GEN['ar-gcd'] = (level, rng) => {
  let a;
  let b;
  const want = level === 1 || level === 3 ? 'gcd' : level === 5 ? rng.pick(['gcd', 'lcm']) : 'lcm';
  for (;;) {
    const g = level <= 2 ? rng.int(2, 6) : rng.int(4, 21);
    const x = rng.int(2, level <= 2 ? 5 : 9);
    const y = rng.int(2, level <= 2 ? 5 : 9);
    if (x === y || gcd(x, y) !== 1) continue;
    a = g * x;
    b = g * y;
    if (want === 'lcm' && lcm(a, b) > 600) continue;
    break;
  }
  const g = gcd(a, b);
  const l = lcm(a, b);
  const value = want === 'gcd' ? g : l;
  const traps = [{ value: [want === 'gcd' ? l : g, 1], rule: 'gcd_lcm_swap' }];
  if (want === 'lcm' && a * b !== l) traps.push({ value: [a * b, 1], rule: 'lcm_product' });
  const lines = [
    { math: factorString(a), note: `${a} = ${factorText(a)}` },
    { math: factorString(b), note: `${b} = ${factorText(b)}` },
    { math: String(value), note: want === 'gcd' ? 'PGDC : les facteurs communs, avec le plus petit exposant.' : 'PPMC : tous les facteurs, avec le plus grand exposant.' },
  ];
  let prompt = want === 'gcd' ? `PGDC(${a} ; ${b}) = ?` : `PPMC(${a} ; ${b}) = ?`;
  if (level === 5) {
    prompt = want === 'gcd'
      ? `On veut couper deux rubans de ${a} cm et de ${b} cm en morceaux tous de même longueur, la plus grande possible, sans chute. Quelle longueur (en cm) ?`
      : `Un bus passe toutes les ${a} minutes, un autre toutes les ${b} minutes. Ils partent ensemble. Dans combien de minutes repartent-ils ensemble ?`;
  }
  return answerItem('ar-gcd', level, prompt, String(value), { keys: 'int', traps, solution: lines, key: `${want}:${a}:${b}`, expectedSec: 30 });
};

// ---------- Fractions avec PGDC et PPMC ----------

GEN['ar-fractions'] = (level, rng) => {
  if (level <= 2) {
    let n;
    let d;
    for (;;) {
      const g = level === 1 ? rng.pick([6, 8, 9, 12, 14, 15]) : rng.pick([18, 21, 24, 28, 36, 42]);
      const x = rng.int(1, 9);
      const y = rng.int(2, 11);
      if (x >= y || gcd(x, y) !== 1) continue;
      n = g * x;
      d = g * y;
      break;
    }
    return stepsItem('ar-fractions', level, `${n}/${d}`, {
      mode: 'free', prompt: `Simplifie en une seule étape, en divisant par le PGDC de ${n} et ${d}.`,
    });
  }
  if (level <= 4) {
    let a;
    let b;
    for (;;) {
      a = rng.pick([6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24]);
      b = rng.pick([6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24]);
      if (a !== b && gcd(a, b) > 1 && a % b && b % a) break;
    }
    const n1 = rng.pick(range(1, a - 1).filter((x) => gcd(x, a) === 1));
    const n2 = rng.pick(range(1, b - 1).filter((x) => gcd(x, b) === 1));
    if (level === 3) {
      return answerItem('ar-fractions', level, `Quel est le plus petit dénominateur commun de ${mathHtml(`${n1}/${a}`)} et ${mathHtml(`${n2}/${b}`)} ?`, String(lcm(a, b)), {
        keys: 'int', traps: [{ value: [a * b, 1], rule: 'lcm_product' }],
        solution: [{ math: String(lcm(a, b)), note: `PPMC(${a} ; ${b}) : ${factorText(a)} et ${factorText(b)}.` }], key: `den:${a}:${b}`,
      });
    }
    return stepsItem('ar-fractions', level, `${n1}/${a}+${n2}/${b}`, { mode: 'free' });
  }
  const pairs = [[12, 18], [15, 20], [14, 21], [16, 24], [18, 24], [20, 30], [24, 36], [21, 28]];
  const [a, b] = rng.pick(pairs);
  const n1 = rng.pick(range(1, a - 1).filter((x) => gcd(x, a) === 1));
  const n2 = rng.pick(range(1, b - 1).filter((x) => gcd(x, b) === 1));
  return stepsItem('ar-fractions', level, `${n1}/${a}-${n2}/${b}`, { mode: 'free' });
};

// ---------- Sortir un carré de la racine : √72 = 6√2 ----------

const SQUAREFREE = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15];
export const isSquarefree = (n) => { for (let d = 2; d * d <= n; d++) if (n % (d * d) === 0) return false; return true; };

GEN['ar-surd'] = (level, rng) => {
  const k = { 1: 2, 2: rng.pick([3, 5]), 3: rng.pick([4, 6]), 4: rng.int(2, 7), 5: rng.int(5, 10) }[level];
  const r = rng.pick(level <= 2 ? [2, 3, 5, 6, 7] : SQUAREFREE);
  const n = k * k * r;
  const expr = `√${n}`;
  const steps = [];
  for (let s = k; s > 1; s--) if (n % (s * s) === 0) { steps.push(s); break; }
  return {
    skill: 'ar-surd', level, type: 'answer',
    prompt: `Écris ${mathHtml(expr)} sous la forme a√b, avec b le plus petit possible.`,
    expected: `${k}√${r}`, form: 'any', exact: null, tree: null,
    traps: [], keys: 'surd', suffix: '', figure: null,
    baits: ['surd_forget_root'],
    solution: [
      { math: `√(${k * k}×${r})`, note: `${n} = ${k * k} × ${r}, et ${k * k} est un carré.` },
      { math: `√${k * k}×√${r}`, note: '√(a × b) = √a × √b' },
      { math: `${k}×√${r}`, note: `√${k * k} = ${k}` },
    ],
    expectedSec: 30,
    key: `ar-surd:${n}`,
    checker: 'surd', target: n, surd: [k, r], expectedHtml: m(`${k}√${r}`),
  };
};

// ---------- Écritures d'un nombre : décimal, fraction, pourcentage ----------

GEN['nb-convert'] = (level, rng) => {
  if (level === 1) {
    const [n, d] = rng.pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 8], [3, 8], [1, 20], [7, 20], [1, 25], [3, 10], [7, 10]]);
    const x = fix(n / d);
    const digits = dec(x).split(',')[1];
    const traps = [];
    // 0,4 read as 1/4: the decimal digits become the denominator.
    if (digits.length === 1 && n === 1) traps.push({ value: [1, Number(digits)], rule: 'frac_decimal_digits' });
    return answerItem('nb-convert', level, `Écris ${m(num(dec(x)))} sous forme de fraction irréductible.`, `${n}/${d}`, {
      form: 'irreducible', traps,
      solution: [{ math: `${digits}/${10 ** digits.length}`, note: `${dec(x)} = ${digits} ${digits.length === 1 ? 'dixièmes' : digits.length === 2 ? 'centièmes' : 'millièmes'}` }, { math: `${n}/${d}`, note: 'On simplifie.' }],
      key: `d2f:${n}/${d}`,
    });
  }
  if (level === 2) {
    const [n, d] = rng.pick([[1, 4], [3, 4], [2, 5], [3, 5], [1, 8], [3, 8], [5, 8], [7, 20], [9, 25], [3, 50]]);
    const x = n / d;
    // 3/8 written 0,38, and 1/4 written 0,4: the digits are copied.
    const traps = [{ value: [Number(`${n}${d}`), 10 ** (String(n).length + String(d).length)], rule: 'frac_decimal_digits' }];
    if (n === 1 && d < 10) traps.push({ value: [d, 10], rule: 'frac_decimal_digits' });
    return answerItem('nb-convert', level, `Écris ${mathHtml(`${n}/${d}`)} sous forme décimale.`, dec(x), {
      form: 'decimal', keys: 'dec', traps: traps.filter((t) => t.value[0] / t.value[1] !== x),
      solution: [{ math: `${n}÷${d}`, note: `La barre de fraction veut dire « divisé par » : ${n} ÷ ${d} = ${dec(x)}.` }], key: `f2d:${n}/${d}`,
    });
  }
  if (level === 3) {
    const p = rng.pick([5, 8, 12, 15, 35, 40, 60, 75, 120, 150, 3, 0.5]);
    const x = fix(p / 100);
    if (rng.chance(0.5)) {
      return answerItem('nb-convert', level, `Écris ${m(num(dec(p)))} % sous forme décimale.`, dec(x), {
        form: 'decimal', keys: 'dec', traps: [{ value: [Math.round(p * 10), 100], rule: 'percent_shift' }].filter((t) => t.value[0] / t.value[1] !== x),
        solution: [{ math: `${dec(p)}÷100`, note: `Pour cent veut dire « sur 100 » : ${dec(p)} % = ${dec(x)}.` }], key: `p2d:${p}`,
      });
    }
    return answerItem('nb-convert', level, `Écris ${m(num(dec(x)))} en pourcentage.`, dec(p), {
      keys: 'dec', suffix: '%', traps: [{ value: [Math.round(p * 10), 100], rule: 'percent_shift' }].filter((t) => t.value[0] / t.value[1] !== p),
      solution: [{ math: `${dec(x)}×100`, note: `= ${dec(p)} %` }], key: `d2p:${p}`,
    });
  }
  if (level === 4) {
    const [n, d] = rng.pick([[1, 4], [3, 4], [2, 5], [3, 8], [7, 20], [9, 25], [1, 8], [3, 40], [11, 20], [13, 50]]);
    const p = fix((n / d) * 100);
    return answerItem('nb-convert', level, `Écris ${mathHtml(`${n}/${d}`)} en pourcentage.`, dec(p), {
      keys: 'dec', suffix: '%',
      solution: [{ math: `${n}/${d}×100`, note: `= ${dec(p)} %` }], key: `f2p:${n}/${d}`,
    });
  }
  // Repeating decimals.
  const [n, d] = rng.pick([[1, 3], [2, 3], [1, 9], [4, 9], [1, 6], [5, 6], [1, 11], [2, 11]]);
  const rep = (n / d).toFixed(6).replace('.', ',').replace(/0+$/, '');
  const wrong = (Math.round((n / d) * 10) / 10);
  return mcqItem('nb-convert', level, `Quelle fraction vaut ${m(num(`${rep.slice(0, 6)}…`))} ?`, [
    { html: mathHtml(`${n}/${d}`), correct: true },
    { html: mathHtml(`${Math.round(wrong * 10)}/10`), correct: false, rule: 'repeating_as_finite' },
    { html: mathHtml(`${Math.round((n / d) * 100)}/100`), correct: false, rule: 'repeating_as_finite' },
    { html: mathHtml(`${d}/${n * 10}`), correct: false },
  ].filter((o, i, all) => all.findIndex((x) => x.html === o.html) === i), rng, {
    solution: [{ math: `${n}÷${d}`, note: `= ${rep.slice(0, 6)}… : les chiffres se répètent sans fin.` }], key: `rep:${n}/${d}`,
  });
};

// ---------- Ensembles de nombres ----------

const SETS = ['ℕ', 'ℤ', 'ℚ', 'ℝ'];
const SET_ITEMS = [
  ['7', 0], ['0', 0], ['−3', 1], ['−12/4', 1, 'set_by_writing'], ['8/2', 0, 'set_by_writing'], ['0,25', 2], ['3/7', 2], ['−2,5', 2],
  ['√2', 3], ['√16', 0, 'root_always_irrational'], ['π', 3], ['−√9', 1, 'root_always_irrational'], ['1/3', 2], ['√(4/9)', 2, 'root_always_irrational'],
];

GEN['nb-sets'] = (level, rng) => {
  const pool = level <= 2 ? SET_ITEMS.slice(0, 8) : SET_ITEMS;
  const [x, k, rule] = rng.pick(pool);
  const baited = { set_by_writing: 'ℚ', root_always_irrational: 'ℝ' }[rule];
  const wrongs = SETS.filter((_, i) => i !== k).map((s) => [s, s === baited ? rule : null]);
  const why = [
    'C\'est un entier positif (ou nul) : il est dans ℕ.',
    'C\'est un entier, mais négatif : ℤ.',
    'C\'est un quotient d\'entiers, mais pas un entier : ℚ.',
    'Ce n\'est pas un quotient d\'entiers : il est irrationnel, dans ℝ seulement.',
  ][k];
  return mcqItem('nb-sets', level, `Quel est le plus petit ensemble qui contient ${m(num(x))} ?`,
    [{ html: SETS[k], correct: true }, ...wrongs.map(([s, r]) => ({ html: s, correct: false, rule: r || null }))], rng, {
      keepOrder: true, solution: [{ html: m(x), note: `${why} Rappel : ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.` }], key: `set:${x}`,
    });
};

// ---------- Rationnel ou irrationnel ----------

GEN['nb-irrational'] = (level, rng) => {
  const irr = rng.pick(['√2', '√3', '√5', '√10', '√50', 'π', '√20', '2√3']);
  const rationals = rng.shuffle([['√49', 'root_always_irrational'], ['√(9/16)', 'root_always_irrational'], ['0,25', null], ['2/3', null], ['√100', 'root_always_irrational'], ['−5', null], ['1,5', null], ['√0,01', 'root_always_irrational']]).slice(0, 3);
  return mcqItem('nb-irrational', level, 'Lequel de ces nombres est irrationnel ?', [
    { html: m(irr), correct: true }, ...rationals.map(([x, rule]) => ({ html: m(x), correct: false, rule })),
  ], rng, {
    solution: [{ html: m(irr), note: `${irr} ne peut pas s'écrire comme un quotient de deux entiers. Une racine d'un carré parfait (√49 = 7) est rationnelle.` }], key: `irr:${irr}`,
  });
};

// ---------- Racines cubiques ----------

GEN['nb-cube'] = (level, rng) => {
  const k = level === 1 ? rng.int(1, 5) : level === 2 ? rng.int(2, 10) : level === 3 ? -rng.int(1, 6) : level === 4 ? rng.pick([-10, -5, -4, 4, 6, 10]) : 0;
  if (level === 5) {
    const [n, d] = rng.pick([[1, 2], [2, 3], [1, 3], [3, 4], [1, 5]]);
    const neg = rng.chance(0.5) ? '−' : '';
    const sign = neg ? '-' : '';
    return answerItem('nb-cube', level, `Calcule ${m(`∛(${neg}${n ** 3}/${d ** 3})`)}.`, `${sign}${n}/${d}`, {
      keys: 'relfrac', signed: true, form: 'irreducible',
      solution: [{ math: `(${sign}${n}/${d})^3`, note: `= ${neg}${n ** 3}/${d ** 3}` }], key: `cf:${sign}${n}/${d}`,
    });
  }
  const c = k ** 3;
  const traps = [];
  if (c % 3 === 0 && c / 3 !== k) traps.push({ value: [c / 3, 1], rule: 'cube_root_third' });
  if (k < 0) traps.push({ value: [-k, 1], rule: 'cube_root_negative' });
  const inside = c < 0 ? `(${String(c).replace('-', '−')})` : big(c);
  return answerItem('nb-cube', level, `Calcule ${m(`∛${inside}`)}.`, String(k), {
    keys: k < 0 ? 'rel' : 'int', signed: true, traps,
    solution: [{ math: `(${k})^3`, note: `= ${c}, donc ∛${inside} = ${k}.` }], key: `c:${c}`,
  });
};

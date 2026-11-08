// Question generators for the fractions unit, one per skill, levels 1 to 5.
// Item format: see items.js.

import { Q, gcd, lcm } from '../math/rational.js';
import { parse, evaluate } from '../math/expr.js';
import { solve } from '../math/solver.js';
import {
  mathHtml, Fh, BLANK, valStr, solutionOf, stepsItem, answerItem, mcqItem, computeMcq,
  coprimeNum, coprimeFraction,
} from './items.js';

// ---------- helpers ----------

const SHAPE_WORD = { circle: 'du disque', bar: 'de la bande', grid: 'du rectangle' };
const GRIDS = { 4: [2, 2], 6: [2, 3], 8: [2, 4], 9: [3, 3], 10: [2, 5], 12: [3, 4] };

function properFraction(rng, dens, { maxNum } = {}) {
  const d = rng.pick(dens);
  const n = rng.int(1, maxNum ? Math.min(maxNum, d - 1) : d - 1);
  return [n, d];
}

const frac = ([n, d]) => (d === 1 ? `${n}` : `${n}/${d}`);

// ---------- generators ----------

export const GEN = {};

GEN['frac-read'] = (level, rng) => {
  if (level === 1 || level === 4) {
    if (level === 1) {
      const shape = rng.pick(['circle', 'bar']);
      const n = rng.int(2, 4);
      const k = rng.int(1, n - 1);
      return {
        skill: 'frac-read', level, type: 'shade',
        prompt: `Colorie ${Fh(k, n)} ${SHAPE_WORD[shape]}.`,
        figure: { kind: 'shape', shape, n, k: 0 },
        target: { count: k },
        baits: ['read_swap'],
        solution: [{ math: `${k}/${n}`, note: `On colorie ${k} parts sur ${n}.` }],
        expectedSec: 12, key: `frac-read:shade:${shape}:${k}/${n}`,
      };
    }
    const n = rng.pick([6, 8, 9, 10, 12]);
    const divs = [2, 3, 4, 5, 6].filter((b) => n % b === 0 && b < n);
    const b = rng.pick(divs);
    const a = rng.int(1, b - 1);
    const [rows, cols] = GRIDS[n];
    return {
      skill: 'frac-read', level, type: 'shade',
      prompt: `Colorie ${Fh(a, b)} du rectangle.`,
      figure: { kind: 'shape', shape: 'grid', n, rows, cols, k: 0 },
      target: { count: (n * a) / b },
      baits: [],
      solution: [{ math: `${a}/${b}`, note: `${a}/${b} = ${(n * a) / b}/${n} : on colorie ${(n * a) / b} cases sur ${n}.` }],
      expectedSec: 15, key: `frac-read:grid:${a}/${b}:${n}`,
    };
  }
  if (level === 5) {
    const n = rng.int(2, 6);
    const wholes = 2;
    const k = rng.int(n + 1, wholes * n - 1);
    return answerItem('frac-read', level, 'Chaque disque est une unité. Quelle fraction est coloriée ?', `${k}/${n}`, {
      figure: { kind: 'shape', shape: 'circle', n, k, wholes },
      traps: [{ value: [k, wholes * n], rule: 'read_total_parts' }, { value: [n, k], rule: 'read_swap' }],
      solution: [{ math: `${k}/${n}`, note: `Chaque unité est coupée en ${n}. On compte ${k} parts de 1/${n}.` }],
      key: `big:${k}/${n}`,
    });
  }
  // levels 2 and 3: read a shaded figure
  const shape = rng.pick(level === 2 ? ['circle', 'bar'] : ['circle', 'bar', 'grid']);
  const n = shape === 'grid' ? rng.pick([6, 8, 9, 10, 12]) : rng.int(3, level === 2 ? 8 : 12);
  let k = rng.int(1, n - 1);
  if (2 * k === n && n > 3) k = Math.max(1, k - 1);
  const figure = shape === 'grid'
    ? { kind: 'shape', shape, n, rows: GRIDS[n][0], cols: GRIDS[n][1], k }
    : { kind: 'shape', shape, n, k };
  const solution = [{ math: `${k}/${n}`, note: `${n} parts égales, ${k} coloriées.` }];
  if (level === 2) {
    const opts = [{ html: Fh(k, n), correct: true }];
    const seen = new Set([valStr(k, n)]);
    const add = (nn, dd, rule) => {
      if (dd <= 0 || nn <= 0) return;
      const key = `${nn}/${dd}`;
      if (seen.has(key)) return;
      seen.add(key);
      opts.push({ html: Fh(nn, dd), correct: false, rule });
    };
    add(n, k, 'read_swap');
    if (n - k > 1) add(k, n - k, 'read_part_over_rest');
    add(n - k, n, null);
    add(k + 1, n, null);
    return mcqItem('frac-read', level, 'Quelle fraction est coloriée ?', opts.slice(0, 4), rng, { figure, solution, key: `${shape}:${k}/${n}` });
  }
  return answerItem('frac-read', level, 'Quelle fraction est coloriée ?', `${k}/${n}`, {
    figure,
    traps: [{ value: [n, k], rule: 'read_swap' }, { value: [k, n - k], rule: 'read_part_over_rest' }],
    solution, key: `${shape}:${k}/${n}`,
  });
};

GEN['frac-line'] = (level, rng) => {
  const place = (max, den, n, d) => ({
    skill: 'frac-line', level, type: 'numberline',
    prompt: `Place ${Fh(n, d)} sur la droite.`,
    line: { max, den }, target: valStr(n, d),
    baits: [],
    solution: [{ math: `${n}/${d}`, note: d === den ? `${n} graduations de 1/${den} depuis 0.` : `${n}/${d} = ${(n * den) / d}/${den} : ${(n * den) / d} graduations.` }],
    expectedSec: 12, key: `frac-line:place:${n}/${d}:${max}:${den}`,
  });
  if (level === 1) { const [n, d] = properFraction(rng, [2, 4]); return place(1, d, n, d); }
  if (level === 2) { const [n, d] = properFraction(rng, [3, 5, 6, 8, 10]); return place(1, d, n, d); }
  if (level === 3) {
    const max = rng.pick([2, 3]);
    const d = rng.pick([2, 3, 4]);
    let n = rng.int(d + 1, max * d - 1);
    if (n % d === 0) n++;
    return place(max, d, n, d);
  }
  if (level === 5) {
    const den = rng.pick([6, 8, 10, 12]);
    const b = rng.pick([2, 3, 4, 5, 6].filter((x) => den % x === 0 && x < den));
    let a = rng.int(1, 2 * b - 1);
    if (a % b === 0) a++;
    return place(2, den, a, b);
  }
  // level 4: read a point
  const max = rng.pick([1, 2]);
  const den = rng.pick([3, 4, 5, 6, 8]);
  let n = rng.int(1, max * den - 1);
  if (n % den === 0) n++;
  return answerItem('frac-line', level, 'Quelle fraction est repérée par le point ?', `${n}/${den}`, {
    figure: { kind: 'line', max, den, mark: [n, den] },
    traps: [{ value: [n, den + 1], rule: null }],
    solution: [{ math: `${n}/${den}`, note: `L'unité est coupée en ${den} : le point est à ${n} graduations de 0.` }],
    key: `read:${n}/${den}:${max}`,
  });
};

const DECIMALS = [
  [1, 2, '0,5'], [1, 4, '0,25'], [3, 4, '0,75'], [1, 10, '0,1'], [3, 10, '0,3'], [7, 10, '0,7'],
  [3, 2, '1,5'], [5, 2, '2,5'], [1, 5, '0,2'], [2, 5, '0,4'], [1, 100, '0,01'], [4, 2, '2'],
];

GEN['frac-decimal'] = (level, rng) => {
  const basic = DECIMALS.slice(0, 6);
  if (level === 1 || level === 5) {
    const pool = rng.shuffle(level === 1 ? basic : DECIMALS).slice(0, level === 1 ? 4 : 5);
    return {
      skill: 'frac-decimal', level, type: 'match',
      prompt: 'Relie chaque fraction à son écriture décimale.',
      pairs: pool.map(([n, d, s]) => [Fh(n, d), `<span class="m">${s}</span>`]),
      baits: [],
      solution: pool.map(([n, d, s]) => ({ math: `${n}/${d}`, note: `= ${s}` })),
      expectedSec: 25, key: `frac-decimal:match:${pool.map((p) => p[2]).join()}`,
    };
  }
  const [n, d, s] = rng.pick(level === 2 ? basic : DECIMALS.slice(0, 10));
  const digits = `${n},${d}`;
  const solution = [{ math: `${n}/${d}`, note: `= ${n} ÷ ${d} = ${s}` }];
  if (level === 2) {
    const opts = [{ html: `<span class="m">${s}</span>`, correct: true }, { html: `<span class="m">${digits}</span>`, correct: false, rule: 'decimal_digits' }];
    const extra = rng.shuffle(DECIMALS.map((x) => x[2]).filter((x) => x !== s && x !== digits)).slice(0, 2);
    extra.forEach((x) => opts.push({ html: `<span class="m">${x}</span>`, correct: false }));
    return mcqItem('frac-decimal', level, `${Fh(n, d)} = ?`, opts, rng, { solution, key: `${n}/${d}`, big: true });
  }
  if (level === 3) {
    return answerItem('frac-decimal', level, `Écris ${Fh(n, d)} sous forme décimale.`, s, {
      form: 'decimal', keys: 'dec',
      traps: [{ value: [Q.fromDecimal(digits).n, Q.fromDecimal(digits).d], rule: 'decimal_digits' }],
      solution, key: `${n}/${d}`,
    });
  }
  return answerItem('frac-decimal', level, `Écris <span class="m">${s}</span> sous forme de fraction.`, `${n}/${d}`, {
    form: 'fraction', keys: 'frac', solution, key: `rev:${s}`,
  });
};

const THINGS = ['œufs', 'billes', 'élèves', 'bonbons', 'cartes', 'timbres', 'perles'];

GEN['frac-of'] = (level, rng) => {
  const thing = rng.pick(THINGS);
  let k;
  let d;
  let N;
  if (level === 1) { d = rng.int(2, 5); k = 1; N = d * rng.int(2, 5); }
  else if (level === 2) { d = rng.int(3, 6); k = coprimeNum(rng, d, 2, d - 1); N = d * rng.int(2, 6); }
  else if (level === 3) { d = rng.int(3, 10); k = coprimeNum(rng, d, 2, d - 1); N = d * rng.int(3, 10); }
  else if (level === 4) { d = rng.int(2, 6); k = coprimeNum(rng, d, d + 1, 2 * d - 1); N = d * rng.int(2, 8); }
  else {
    d = rng.pick([2, 4, 5]); k = coprimeNum(rng, d, 1, d - 1);
    N = rng.int(3, 19);
    if ((k * N) % d === 0) N++;
  }
  const res = new Q(k * N, d);
  const traps = [{ value: [N, d], rule: k > 1 ? 'of_divide_only' : null }, { value: [N * k, 1], rule: 'of_multiply_only' }];
  const solution = [{ math: `${N}÷${d}`, note: `= ${new Q(N, d).toString().replace('/', ' / ')} : une part.` }, { math: `${k}×${N}/${d}`, note: `= ${res.toDecimal() ?? res.toString()} : ${k} part${k > 1 ? 's' : ''}.` }];
  const prompt = level === 5
    ? `Combien font ${Fh(k, d)} de ${N} litres ?`
    : `Combien font ${Fh(k, d)} de ${N} ${thing} ?`;
  return answerItem('frac-of', level, prompt, res.toString(), {
    keys: level === 5 ? 'fracdec' : 'int', traps, solution, key: `${k}/${d}:${N}`,
  });
};

GEN['frac-equiv'] = (level, rng) => {
  if (level === 5) {
    const [a, b] = coprimeFraction(rng, [3, 4, 5, 6, 7]);
    const k = rng.int(1, 4);
    const ms = rng.shuffle([2, 3, 4, 5, 10]).slice(0, 3);
    const opts = [{ html: Fh(a + k, b + k), correct: true }, ...ms.map((m) => ({ html: Fh(a * m, b * m), correct: false }))];
    return mcqItem('frac-equiv', level, `Quelle fraction n'est <b>pas</b> égale à ${Fh(a, b)} ?`, opts, rng, {
      solution: [{ math: `${a + k}/${b + k}`, note: `On a ajouté ${k} en haut et en bas : ça change la fraction.` }],
      key: `${a}/${b}:${k}`,
    });
  }
  let a;
  let b;
  let m;
  if (level === 1) { [a, b] = coprimeFraction(rng, [2, 3, 4, 5]); m = rng.int(2, 3); }
  else if (level === 2 || level === 3) { [a, b] = coprimeFraction(rng, [2, 3, 4, 5, 6, 7, 8]); m = rng.int(2, 5); }
  if (level === 3) {
    return answerItem('frac-equiv', level, `Complète : ${Fh(a, b)} = ${Fh(a * m, BLANK)}`, b * m, {
      keys: 'int', traps: [{ value: [b + a * m - a, 1], rule: 'equiv_additive' }],
      solution: [{ math: `${a}/${b}`, note: `= ${a * m}/${b * m} : on a multiplié par ${m} en haut, donc aussi en bas.` }],
      key: `num:${a}/${b}:${m}`,
    });
  }
  if (level === 4) {
    const [p, qq] = coprimeFraction(rng, [2, 3, 4, 5]);
    const g = rng.int(2, 4);
    let m2 = rng.int(2, 5);
    if (m2 === g) m2++;
    a = p * g; b = qq * g;
    const target = qq * m2;
    return answerItem('frac-equiv', level, `Complète : ${Fh(a, b)} = ${Fh(BLANK, target)}`, p * m2, {
      keys: 'int', traps: [{ value: [a + target - b, 1], rule: 'equiv_additive' }],
      solution: [{ math: `${a}/${b}`, note: `= ${p}/${qq} (÷ ${g}) = ${p * m2}/${target} (× ${m2})` }],
      key: `2step:${a}/${b}:${target}`,
    });
  }
  return answerItem('frac-equiv', level, `Complète : ${Fh(a, b)} = ${Fh(BLANK, b * m)}`, a * m, {
    keys: 'int',
    traps: [{ value: [a + b * m - b, 1], rule: 'equiv_additive' }, { value: [a, 1], rule: 'equiv_denominator_only' }],
    solution: [{ math: `${a}/${b}`, note: `= ${a * m}/${b * m} : ${b} × ${m} = ${b * m}, donc ${a} × ${m} = ${a * m}.` }],
    key: `${a}/${b}:${m}`,
  });
};

GEN['frac-add-same'] = (level, rng) => {
  const d = rng.int(3, level < 3 ? 9 : 12);
  if (level === 1) {
    for (let i = 0; i < 30; i++) {
      const a = coprimeNum(rng, d, 1, d - 2);
      const b = coprimeNum(rng, d, 1, d - 1 - a);
      if (a + b < d && gcd(a + b, d) === 1) return stepsItem('frac-add-same', level, `${a}/${d}+${b}/${d}`, { mode: 'guided', irreducible: false });
    }
    return stepsItem('frac-add-same', level, '2/7+3/7', { mode: 'guided', irreducible: false });
  }
  if (level === 2) {
    const a = coprimeNum(rng, d, 1, d);
    const b = coprimeNum(rng, d, 1, d);
    const expr = `${a}/${d}+${b}/${d}`;
    return rng.chance(0.3) ? computeMcq('frac-add-same', level, expr, rng) : stepsItem('frac-add-same', level, expr, { irreducible: false });
  }
  if (level === 3) {
    const a = coprimeNum(rng, d, 2, d + 3);
    const b = coprimeNum(rng, d, 1, a - 1);
    return stepsItem('frac-add-same', level, `${a}/${d}${rng.chance(0.5) ? '+' : '-'}${b}/${d}`);
  }
  if (level === 4) {
    const a = coprimeNum(rng, d, 2, d);
    const b = coprimeNum(rng, d, 1, d);
    const c = coprimeNum(rng, d, 1, a + b - 1);
    return stepsItem('frac-add-same', level, `${a}/${d}+${b}/${d}-${c}/${d}`);
  }
  const a = coprimeNum(rng, d, 1, d - 1);
  const k = rng.int(1, 3);
  const expr = rng.pick([`${k}-${a}/${d}`, `${k}+${a}/${d}`, `${a}/${d}+${rng.int(d - a + 1, d + 2)}/${d}-1`]);
  return stepsItem('frac-add-same', level, expr);
};

GEN['frac-unit'] = (level, rng) => {
  const d = rng.int(2, 6);
  let r = rng.int(1, d - 1);
  if (level <= 2) {
    const k = level === 1 ? 1 : rng.int(2, 4);
    const n = k * d + r;
    return answerItem('frac-unit', level, `Complète : ${Fh(n, d)} = ${k} + ${Fh(BLANK, d)}`, r, {
      keys: 'int', traps: [{ value: [n - k, 1], rule: 'mixed_subtract_whole' }],
      solution: [{ math: `${k}`, note: `= ${k * d}/${d}, et ${n} − ${k * d} = ${r}` }],
      key: `${n}/${d}`,
    });
  }
  while (gcd(r, d) !== 1) r--;
  const k = rng.int(1, 4);
  if (level === 3) {
    return answerItem('frac-unit', level, `Complète : ${k} + ${Fh(r, d)} = ${Fh(BLANK, d)}`, k * d + r, {
      keys: 'int', traps: [{ value: [k + r, 1], rule: 'int_plus_frac' }],
      solution: [{ math: `${k}`, note: `= ${k * d}/${d}, puis ${k * d} + ${r} = ${k * d + r}` }],
      key: `${k}+${r}/${d}`,
    });
  }
  if (level === 4) {
    return answerItem('frac-unit', level, `Écris ${mathHtml(`${k}+${r}/${d}`)} sous forme d'une seule fraction.`, `${k * d + r}/${d}`, {
      tree: `${k}+${r}/${d}`, form: 'fraction', solution: solutionOf(`${k}+${r}/${d}`), key: `one:${k}+${r}/${d}`,
    });
  }
  const n = rng.int(2, 8) * d + r;
  const lo = Math.floor(n / d);
  const opts = [
    { html: `${lo} et ${lo + 1}`, correct: true },
    { html: `${lo - 1} et ${lo}`, correct: false },
    { html: `${lo + 1} et ${lo + 2}`, correct: false },
    { html: `${n} et ${n + 1}`, correct: false, rule: null },
  ];
  return mcqItem('frac-unit', level, `Entre quels entiers se trouve ${Fh(n, d)} ?`, opts, rng, {
    solution: [{ math: `${n}/${d}`, note: `= ${lo} + ${r}/${d} : entre ${lo} et ${lo + 1}.` }],
    key: `between:${n}/${d}`, keepOrder: false,
  });
};

GEN['frac-quotient'] = (level, rng) => {
  if (level === 1) {
    const b = rng.int(3, 8);
    const a = rng.int(1, b - 1);
    return answerItem('frac-quotient', level, `On partage équitablement ${a} pizza${a > 1 ? 's' : ''} entre ${b} enfants. Quelle part de pizza reçoit chaque enfant ?`, `${a}/${b}`, {
      traps: [{ value: [b, a], rule: 'quotient_larger_by_smaller' }],
      solution: [{ math: `${a}÷${b}`, note: `= ${a}/${b} de pizza chacun.` }],
      key: `share:${a}/${b}`,
    });
  }
  if (level === 5) {
    const d = rng.int(3, 6);
    const m = rng.int(2, 5);
    const opts = [
      { html: Fh(d * m, d), correct: true },
      { html: Fh(d * m + 1, d), correct: false },
      { html: Fh(d, d * m), correct: false },
      { html: Fh(d * m - 1, d), correct: false },
    ];
    return mcqItem('frac-quotient', level, 'Laquelle de ces fractions est égale à un nombre entier ?', opts, rng, {
      solution: [{ math: `${d * m}/${d}`, note: `= ${d * m} ÷ ${d} = ${m}` }], key: `int:${d}:${m}`,
    });
  }
  let a;
  let b;
  do { a = rng.int(1, 9); b = rng.int(2, 9); } while (a === b || gcd(a, b) !== 1 || (level === 2 && a > b));
  if (level === 4) {
    const g = rng.int(2, 3);
    return answerItem('frac-quotient', level, `Complète : ${b * g} × ${BLANK} = ${a * g}`, `${a}/${b}`, {
      form: 'irreducible', traps: [{ value: [b, a], rule: 'quotient_larger_by_smaller' }],
      solution: [{ math: `${a * g}/${b * g}`, note: `= ${a}/${b}` }], key: `mf:${a * g}/${b * g}`,
    });
  }
  if (level === 2) {
    return answerItem('frac-quotient', level, `Complète : ${b} × ${BLANK} = ${a}`, `${a}/${b}`, {
      traps: [{ value: [b, a], rule: 'quotient_larger_by_smaller' }],
      solution: [{ math: `${b}×${a}/${b}`, note: `= ${a}` }], key: `mf:${a}/${b}`,
    });
  }
  return answerItem('frac-quotient', level, `Écris ${a} ÷ ${b} sous forme de fraction.`, `${a}/${b}`, {
    form: 'fraction', traps: [{ value: [b, a], rule: 'quotient_larger_by_smaller' }],
    solution: [{ math: `${a}/${b}`, note: `${a} ÷ ${b} = ${a}/${b}` }], key: `div:${a}/${b}`,
  });
};

GEN['frac-simplify'] = (level, rng) => {
  const G = { 1: [2, 3], 2: [2, 3, 5], 3: [4, 6, 8, 9, 10], 4: [12, 15, 18, 20], 5: [14, 21, 24, 30] }[level];
  const g = rng.pick(G);
  let [p, qq] = coprimeFraction(rng, level < 4 ? [3, 4, 5, 7, 8, 9] : [3, 5, 7, 8, 11], { improper: level === 5 });
  if (level === 5 && rng.chance(0.3)) { p = rng.int(2, 6); qq = 1; }
  const a = p * g;
  const b = qq * g;
  const traps = [{ value: [a - g, b - g], rule: 'simplify_subtract' }, { value: [a / g, b], rule: 'simplify_one_part' }];
  const solution = [{ math: `${a}/${b}`, note: `On divise en haut et en bas par ${g} : ${frac([p, qq])}.` }];
  if (level === 1) {
    return answerItem('frac-simplify', level, `Simplifie ${Fh(a, b)} par ${g}.`, `${p}/${qq}`, {
      exact: [p, qq], traps, solution, key: `by:${a}/${b}`,
    });
  }
  return answerItem('frac-simplify', level, `Rends ${Fh(a, b)} irréductible.`, frac([p, qq]), {
    form: 'irreducible', traps, solution, key: `irr:${a}/${b}`,
  });
};

const SYM = (s) => (s < 0 ? '<' : s > 0 ? '>' : '=');

function compareItem(level, a, b, c, d, rng) {
  const right = SYM(new Q(a, b).cmp(new Q(c, d)));
  const preds = [['compare_numerators', SYM(Math.sign(a - c))]];
  if (b !== d) {
    preds.push(['compare_denominators', SYM(Math.sign(b - d))]);
    if (a !== c) preds.push(['compare_smallest_denominator', SYM(Math.sign(d - b))]);
  }
  const SHOW = { '<': '&lt;', '=': '=', '>': '&gt;' };
  const options = ['<', '=', '>'].map((s) => ({
    html: `<span class="sym">${SHOW[s]}</span>`, value: s, correct: s === right,
    rule: s === right ? null : (preds.find(([, p]) => p === s)?.[0] ?? null),
  }));
  const L = lcm(b, d);
  return mcqItem('frac-compare', level, `Compare : ${Fh(a, b)} <span class="m-q">?</span> ${Fh(c, d)}`, options, rng, {
    keepOrder: true, big: true,
    solution: [{ math: `${a}/${b}`, note: `= ${a * L / b}/${L} et ${c}/${d} = ${c * L / d}/${L}, donc ${a}/${b} ${right} ${c}/${d}.` }],
    key: `${a}/${b}:${c}/${d}`,
  });
}

GEN['frac-compare'] = (level, rng) => {
  if (level === 1) {
    const d = rng.pick([5, 7, 8, 9, 10, 11, 12]);
    const a = coprimeNum(rng, d, 1, d + 2);
    let c = coprimeNum(rng, d, 1, d + 2);
    if (c === a) c = coprimeNum(rng, d, a + 1, a + d);
    return compareItem(level, a, d, c, d, rng);
  }
  if (level === 2) {
    const a = rng.int(1, 5);
    const b = coprimeNum(rng, a, a + 1, 10);
    let d = coprimeNum(rng, a, a + 1, 12);
    if (d === b) d = coprimeNum(rng, a, b + 1, b + 6);
    return compareItem(level, a, b, a, d, rng);
  }
  if (level === 3) {
    const b = rng.int(2, 5);
    const d = b * rng.int(2, 3);
    const a = coprimeNum(rng, b, 1, b - 1);
    const c = coprimeNum(rng, d, 1, d - 1);
    return rng.chance(0.5) ? compareItem(level, a, b, c, d, rng) : compareItem(level, c, d, a, b, rng);
  }
  if (level === 4) {
    if (rng.chance(0.2)) {
      const [a, b] = coprimeFraction(rng, [2, 3, 4, 5]);
      const m = rng.int(2, 4);
      return compareItem(level, a, b, a * m, b * m, rng);
    }
    // Pick pairs where at least one whole-number reading gives the wrong answer.
    for (let i = 0; i < 50; i++) {
      const [a, b] = coprimeFraction(rng, [3, 4, 5, 6, 7, 8, 9]);
      const [c, d] = coprimeFraction(rng, [3, 4, 5, 6, 7, 8, 9, 10, 12]);
      if (b === d || a * d === b * c) continue;
      const it = compareItem(level, a, b, c, d, rng);
      if (it.baits.length) return it;
    }
  }
  // level 5: the largest of four
  for (let i = 0; i < 100; i++) {
    const fr = [];
    while (fr.length < 4) {
      const f = coprimeFraction(rng, [2, 3, 4, 5, 6, 7, 8, 9, 10, 12]);
      if (!fr.some((x) => x[0] * f[1] === x[1] * f[0])) fr.push(f);
    }
    const v = fr.map(([n, d]) => n / d);
    const best = v.indexOf(Math.max(...v));
    const byNum = fr.map((f) => f[0]).indexOf(Math.max(...fr.map((f) => f[0])));
    const byDen = fr.map((f) => f[1]).indexOf(Math.max(...fr.map((f) => f[1])));
    const bySmall = fr.map((f) => f[1]).indexOf(Math.min(...fr.map((f) => f[1])));
    if (best === byNum || best === byDen) continue;
    const rules = {};
    rules[byNum] = 'compare_numerators';
    if (!rules[byDen]) rules[byDen] = 'compare_denominators';
    if (!rules[bySmall] && bySmall !== best) rules[bySmall] = 'compare_smallest_denominator';
    const opts = fr.map(([n, d], i2) => ({ html: Fh(n, d), correct: i2 === best, rule: i2 === best ? null : rules[i2] || null }));
    const [bn, bd] = fr[best];
    return mcqItem('frac-compare', level, 'Quelle est la plus grande fraction ?', opts, rng, {
      solution: [{ math: `${bn}/${bd}`, note: `≈ ${(bn / bd).toFixed(2).replace('.', ',')}, la plus grande.` }],
      key: `max:${fr.map(frac).join()}`,
    });
  }
  return compareItem(level, 2, 3, 3, 5, rng);
};

GEN['frac-add-multiple'] = (level, rng) => {
  const b = rng.int(2, 5);
  const m = rng.int(2, level < 3 ? 3 : 4);
  const D = b * m;
  const a = coprimeNum(rng, b, 1, b - 1);
  const c = coprimeNum(rng, D, 1, D - 1);
  const swap = rng.chance(0.5);
  const pair = (op) => (swap ? `${c}/${D}${op}${a}/${b}` : `${a}/${b}${op}${c}/${D}`);
  if (level === 1) return stepsItem('frac-add-multiple', level, pair('+'), { mode: 'guided' });
  if (level === 2) {
    const expr = pair('+');
    return rng.chance(0.3) ? computeMcq('frac-add-multiple', level, expr, rng) : stepsItem('frac-add-multiple', level, expr, { irreducible: false });
  }
  if (level === 3) {
    const big = a / b >= c / D ? `${a}/${b}` : `${c}/${D}`;
    const small = big === `${a}/${b}` ? `${c}/${D}` : `${a}/${b}`;
    if (big === small || a * D === c * b) return stepsItem('frac-add-multiple', level, pair('+'));
    return stepsItem('frac-add-multiple', level, `${big}-${small}`);
  }
  if (level === 4) {
    const e = coprimeNum(rng, D, 1, D - 1);
    return stepsItem('frac-add-multiple', level, `${a}/${b}+${c}/${D}+${e}/${D}`);
  }
  return stepsItem('frac-add-multiple', level, `1-${a}/${b}+${c}/${D}`);
};

function nonMultiplePair(rng, max) {
  for (let i = 0; i < 100; i++) {
    const b = rng.int(2, max);
    const d = rng.int(2, max);
    if (b !== d && b % d && d % b) return [b, d];
  }
  return [3, 4];
}

GEN['frac-add-any'] = (level, rng) => {
  let [b, d] = nonMultiplePair(rng, level < 3 ? 6 : 10);
  if (level === 4) [b, d] = rng.pick([[4, 6], [6, 8], [6, 9], [4, 10], [10, 12], [8, 12], [6, 10], [9, 12]]);
  const a = coprimeNum(rng, b, 1, b - 1);
  const c = coprimeNum(rng, d, 1, d - 1);
  if (level === 1) return stepsItem('frac-add-any', level, `${a}/${b}+${c}/${d}`, { mode: 'guided' });
  if (level === 2) {
    const expr = `${a}/${b}+${c}/${d}`;
    return rng.chance(0.3) ? computeMcq('frac-add-any', level, expr, rng) : stepsItem('frac-add-any', level, expr, { irreducible: false });
  }
  if (level === 3 || level === 4) {
    const op = rng.chance(0.5) ? '+' : '-';
    if (op === '-' && a * d !== c * b) {
      return stepsItem('frac-add-any', level, a * d > c * b ? `${a}/${b}-${c}/${d}` : `${c}/${d}-${a}/${b}`);
    }
    return stepsItem('frac-add-any', level, `${a}/${b}+${c}/${d}`);
  }
  const [e, f] = coprimeFraction(rng, [2, 3, 4, 5, 6]);
  return stepsItem('frac-add-any', level, `${a}/${b}+${c}/${d}+${e}/${f}`);
};

GEN['frac-mul-int'] = (level, rng) => {
  const k = rng.int(2, level < 4 ? 5 : 9);
  const b = rng.int(3, 9);
  const a = coprimeNum(rng, b, 1, b - 1);
  if (level === 1) return stepsItem('frac-mul-int', level, `${k}×${a}/${b}`, { mode: 'guided', irreducible: false });
  if (level === 2) {
    const expr = `${k}×${a}/${b}`;
    return rng.chance(0.3) ? computeMcq('frac-mul-int', level, expr, rng) : stepsItem('frac-mul-int', level, expr, { irreducible: false });
  }
  if (level === 5) {
    const bb = rng.pick([2, 3, 4, 5, 6]);
    const aa = coprimeNum(rng, bb, 1, bb - 1);
    const kk = bb * rng.int(2, 6);
    return stepsItem('frac-mul-int', level, `${aa}/${bb}×${kk}`);
  }
  return stepsItem('frac-mul-int', level, rng.chance(0.5) ? `${a}/${b}×${k}` : `${k}×${a}/${b}`);
};

GEN['frac-mul'] = (level, rng) => {
  const [a, b] = coprimeFraction(rng, [2, 3, 4, 5, 6, 7]);
  const [c, d] = coprimeFraction(rng, [2, 3, 4, 5, 6, 7, 8, 9]);
  if (level === 1) return stepsItem('frac-mul', level, `${a}/${b}×${c}/${d}`, { mode: 'guided', irreducible: false });
  if (level === 2) {
    const expr = `${a}/${b}×${c}/${d}`;
    return rng.chance(0.3) ? computeMcq('frac-mul', level, expr, rng) : stepsItem('frac-mul', level, expr, { irreducible: false });
  }
  if (level === 3) return stepsItem('frac-mul', level, `${a}/${b}×${c}/${d}`);
  if (level === 4) {
    const [p, qq] = coprimeFraction(rng, [3, 5, 7, 9, 11]);
    const [r, s] = coprimeFraction(rng, [2, 4, 6, 8]);
    const g1 = rng.int(2, 5);
    const g2 = rng.int(2, 5);
    return stepsItem('frac-mul', level, `${p * g1}/${qq * g2}×${r * g2}/${s * g1}`);
  }
  if (rng.chance(0.5)) {
    const [e, f] = coprimeFraction(rng, [2, 3, 4, 5]);
    return stepsItem('frac-mul', level, `${a}/${b}×${c}/${d}×${e}/${f}`);
  }
  const people = rng.pick(['Léa', 'Noé', 'Yanis', 'Elif', 'Malia', 'Luca']);
  const tree = `${a}/${b}×${c}/${d}`;
  return answerItem('frac-mul', level, `${people} mange les ${Fh(a, b)} des ${Fh(c, d)} d'une tarte. Quelle fraction de la tarte a-t-il ou elle mangée ?`, new Q(a * c, b * d).toString(), {
    tree, form: 'irreducible', solution: solutionOf(tree), key: `pb:${tree}`,
  });
};

GEN['frac-div'] = (level, rng) => {
  if (level === 1) {
    if (rng.chance(0.3)) {
      const k = rng.int(2, 9);
      return answerItem('frac-div', level, `Quel est l'inverse de ${k} ?`, `1/${k}`, {
        solution: [{ math: `${k}×1/${k}`, note: '= 1' }], key: `inv:${k}`,
      });
    }
    const [a, b] = coprimeFraction(rng, [2, 3, 4, 5, 6, 7, 8, 9]);
    return answerItem('frac-div', level, `Quel est l'inverse de ${Fh(a, b)} ?`, `${b}/${a}`, {
      solution: [{ math: `${a}/${b}×${b}/${a}`, note: '= 1 : on échange le numérateur et le dénominateur.' }], key: `inv:${a}/${b}`,
    });
  }
  const [a, b] = coprimeFraction(rng, [2, 3, 4, 5, 6, 7]);
  const [c, d] = coprimeFraction(rng, [2, 3, 4, 5, 6, 7, 8]);
  if (level === 2) return stepsItem('frac-div', level, `${a}/${b}÷${c}/${d}`, { mode: 'guided', irreducible: false });
  if (level === 3) {
    const expr = `${a}/${b}÷${c}/${d}`;
    return rng.chance(0.3) ? computeMcq('frac-div', level, expr, rng) : stepsItem('frac-div', level, expr, { irreducible: false });
  }
  if (level === 4) {
    const k = rng.int(2, 6);
    return stepsItem('frac-div', level, rng.chance(0.5) ? `${a}/${b}÷${k}` : `${k}÷${a}/${b}`);
  }
  const [p, qq] = coprimeFraction(rng, [3, 5, 7, 9]);
  const g = rng.int(2, 4);
  return stepsItem('frac-div', level, `${p * g}/${qq}÷${(p * g) * rng.int(1, 2)}/${qq * g}`);
};

// ---------- multi-step expressions ----------

function smallFrac(rng, { proper = true } = {}) {
  const d = rng.pick([2, 3, 4, 5, 6, 8, 10]);
  if (!proper && rng.chance(0.2)) return `${rng.int(1, 3)}`;
  return `${coprimeNum(rng, d, 1, proper ? d - 1 : 2 * d)}/${d}`;
}

// No negative intermediate values, small final numbers.
function acceptable(expr) {
  try {
    const tree = parse(expr);
    const v = evaluate(tree);
    if (v.n <= 0 || v.d > 60 || v.n > 240) return false;
    let ok = true;
    const check = (n) => {
      if (n.t === 'bin') {
        const x = evaluate(n);
        if (x.n < 0) ok = false;
        check(n.l); check(n.r);
      } else if (n.e) check(n.e);
    };
    check(tree);
    return ok && solve(tree).length <= 10;
  } catch { return false; }
}

const PATTERNS = {
  1: ['A+B×C', 'A-B×C', 'A×B+C'],
  2: ['(A+B)×C', 'A×(B+C)', '(A-B)×C'],
  3: ['A×B+C', 'A-B×C', 'A+B÷C', 'A÷B-C'],
  4: ['(A-B)×C+D', 'A×B+C×D', 'A÷(B+C)', '(A+B)÷C-D'],
  5: ['A+B×(C-D)', '(A+B)×(C-D)', 'A÷B+C×D', 'A-(B+C)÷D', 'A×(B+C)-D'],
};

GEN['frac-multistep'] = (level, rng) => {
  for (let i = 0; i < 300; i++) {
    const pattern = rng.pick(PATTERNS[level]);
    const expr = pattern.replace(/[A-D]/g, () => smallFrac(rng, { proper: level < 4 || rng.chance(0.7) }));
    if (!acceptable(expr)) continue;
    const mode = level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free';
    return stepsItem('frac-multistep', level, expr, { mode });
  }
  return stepsItem('frac-multistep', level, '1/2+1/3×3/4', { mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free' });
};

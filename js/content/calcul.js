// Mental arithmetic and times tables ("livrets").
//
// Most questions are `fact` items, played as a fast series: the answer is
// checked as soon as enough digits are typed, a right answer moves straight
// on, a wrong one shows the strategy. Facts worth memorising (tables,
// squares, sums to 20) carry a `fact` key with its own spaced memory
// (engine/facts.js); computed ones (47 + 38) don't.
//
// Generators take an optional profile: with it, facts are chosen from the
// student's fact memory (mostly known facts, a few weak ones).

import { answerItem, mcqItem } from './items.js';
import { pickFact } from '../engine/facts.js';

// ---------- display ----------

const num = (x) => `<span class="m-num">${fmt(x)}</span>`;
const op = (o) => `<span class="m-op">${o}</span>`;
const m = (...parts) => `<span class="m">${parts.join('')}</span>`;
const sup2 = '<sup class="m-sup"><span class="m-num">2</span></sup>';

// 12345.6 → "12 345,6" (narrow no-break space, decimal comma).
export function fmt(x) {
  const neg = x < 0;
  const [i, d] = String(Math.abs(x)).split('.');
  const int = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : i;
  return `${neg ? '−' : ''}${int}${d ? `,${d}` : ''}`;
}
const dec = (x) => String(x).replace('.', ',');
const fix = (x) => Math.round(x * 1e6) / 1e6;
// Rounds half up, without floating-point surprises (0,25 / 0,1 = 2,4999…).
const round = (x, step) => fix(Math.round(fix(x / step)) * step);

// ---------- strategies, shown after a mistake ----------

export function mulStrategy(a, b) {
  const t = [10, 1, 2, 5, 9, 4, 3, 11, 6, 8, 12, 7].find((x) => x === a || x === b);
  const n = t === a ? b : a;
  const r = a * b;
  switch (t) {
    case 10: return `× 10 : on ajoute un zéro. ${n} × 10 = ${r}.`;
    case 1: return `Une fois ${n}, c'est ${n}.`;
    case 2: return `× 2, c'est le double : ${n} + ${n} = ${r}.`;
    case 5: return `× 5, c'est la moitié de × 10 : ${n} × 10 = ${n * 10}, et la moitié de ${n * 10} est ${r}.`;
    case 9: return `× 9, c'est 10 fois moins une fois : ${n} × 10 − ${n} = ${n * 10} − ${n} = ${r}.`;
    case 4: return `× 4, c'est le double du double : ${n} → ${2 * n} → ${r}.`;
    case 3: return `× 3, c'est le double plus une fois : ${2 * n} + ${n} = ${r}.`;
    case 11: return `× 11, c'est 10 fois plus une fois : ${n * 10} + ${n} = ${r}.`;
    case 6: return `× 6, c'est 5 fois plus une fois : ${5 * n} + ${n} = ${r}.`;
    case 8: return `× 8, c'est le double de × 4 : ${n} × 4 = ${4 * n}, et ${4 * n} × 2 = ${r}.`;
    case 12: return `× 12, c'est 10 fois plus 2 fois : ${n * 10} + ${2 * n} = ${r}.`;
    default: return `× 7, c'est 5 fois plus 2 fois : ${5 * n} + ${2 * n} = ${r}.`;
  }
}

export function squareStrategy(n) {
  const r = n * n;
  let s;
  if (n <= 10) s = `${n}² = ${n} × ${n}. ${mulStrategy(n, n)}`;
  else if (n < 20) s = `${n}² = (10 + ${n - 10})² = 100 + 2 × 10 × ${n - 10} + ${n - 10}² = 100 + ${20 * (n - 10)} + ${(n - 10) ** 2} = ${r}.`;
  else if (n === 20) s = '20² = 2² × 100 = 400.';
  else s = `${n}² = (20 + ${n - 20})² = 400 + 2 × 20 × ${n - 20} + ${n - 20}² = 400 + ${40 * (n - 20)} + ${(n - 20) ** 2} = ${r}.`;
  if (n % 10 === 5 && n > 10) {
    const t = (n - 5) / 10;
    s += ` Astuce des 5 : ${t} × ${t + 1} = ${t * (t + 1)}, puis on écrit 25 → ${r}.`;
  }
  return s;
}

function addStrategy(a, b) {
  const big = Math.max(a, b);
  const small = Math.min(a, b);
  const sum = a + b;
  if (a === b) return `C'est un double : ${a} + ${a} = ${sum}.`;
  if (big - small === 1) return `Presque un double : ${small} + ${small} = ${2 * small}, plus 1 = ${sum}.`;
  if (sum > 10) return `On fait 10 : ${big} + ${10 - big} = 10, puis 10 + ${sum - 10} = ${sum}.`;
  return `On part du plus grand : ${big}, puis ${small} de plus → ${sum}.`;
}

function subStrategy(c, b) {
  const d = c - b;
  if (c > 10 && b > c - 10) return `On passe par 10 : ${c} − ${c - 10} = 10, puis 10 − ${b - (c - 10)} = ${d}. Vérifie : ${b} + ${d} = ${c}.`;
  return `Pense à l'addition : ${b} + ${d} = ${c}, donc ${c} − ${b} = ${d}.`;
}

function addSmallStrategy(a, b, plus) {
  if (plus) {
    const up = 10 - (a % 10);
    if (b > up) return `On passe par la dizaine : ${a} + ${up} = ${a + up}, puis ${a + up} + ${b - up} = ${a + b}.`;
    return `On ajoute aux unités : ${a} + ${b} = ${a + b}.`;
  }
  const down = a % 10;
  if (b > down) return `On passe par la dizaine : ${a} − ${down} = ${a - down}, puis ${a - down} − ${b - down} = ${a - b}.`;
  return `On retire aux unités : ${a} − ${b} = ${a - b}.`;
}

function addTwoStrategy(a, b, plus) {
  const u = b % 10;
  const tens = b - u;
  if (u >= 7) {
    const B = tens + 10;
    const d = B - b;
    return plus
      ? `On arrondit puis on corrige : ${a} + ${B} − ${d} = ${a + B} − ${d} = ${a + b}.`
      : `On arrondit puis on corrige : ${a} − ${B} + ${d} = ${a - B} + ${d} = ${a - b}.`;
  }
  return plus
    ? `Les dizaines, puis les unités : ${a} + ${tens} = ${a + tens}, puis ${a + tens} + ${u} = ${a + b}.`
    : `Les dizaines, puis les unités : ${a} − ${tens} = ${a - tens}, puis ${a - tens} − ${u} = ${a - b}.`;
}

// ---------- fact items ----------

// traps: [[value, rule, note]]; keeps positive integers that differ from the
// answer. The note explains the mistake with the question's own numbers.
function factItem(skill, level, { fact = null, left, right = '', expected, traps = [], strategy, prompt, sec }) {
  const seen = new Set([expected]);
  const kept = [];
  for (const [value, rule, note] of traps) {
    if (!Number.isInteger(value) || value <= 0 || seen.has(value)) continue;
    seen.add(value);
    kept.push({ value: String(value), rule, note: note || '' });
  }
  const digits = String(expected).length;
  const expectedSec = sec ?? 3 + Math.max(0, digits - 2);
  return {
    skill, level, type: 'fact',
    prompt: prompt || 'Calcule de tête.',
    left, right, expected: String(expected), fact,
    traps: kept, strategy,
    baits: [...new Set(kept.map((t) => t.rule))],
    solution: [],
    expectedSec, fluentSec: expectedSec,
    key: `${skill}:${fact || `${left}|${right}`}`,
  };
}

const neighbours = (a, b) => [[a, b - 1], [a, b + 1], [a - 1, b], [a + 1, b]]
  .map(([x, y]) => [x * y, 'fact_neighbor', `${x * y}, c'est ${x} × ${y} : un fait voisin. Ici, c'est ${a} × ${b}.`]);

function mulFact(a, b) {
  const [x, y] = a <= b ? [a, b] : [b, a];
  return {
    fact: `mul:${x}x${y}`,
    make: (skill, level, rng) => {
      const [p, q] = rng.chance(0.5) ? [a, b] : [b, a];
      return factItem(skill, level, {
        fact: `mul:${x}x${y}`, left: m(num(p), op('×'), num(q), op('=')), expected: a * b,
        traps: [...neighbours(p, q), [a + b, 'fact_add_for_mul', `${p} + ${q} = ${a + b} : ça, c'est une addition. ${p} × ${q}, c'est ${q} répété ${p} fois.`]],
        strategy: mulStrategy(a, b),
      });
    },
  };
}

function divFact(a, b) {
  const c = a * b;
  return {
    fact: `div:${c}:${a}`,
    make: (skill, level) => factItem(skill, level, {
      fact: `div:${c}:${a}`, left: m(num(c), op(':'), num(a), op('=')), expected: b,
      traps: [b - 1, b + 1].map((v) => [v, 'fact_neighbor', `${a} × ${v} = ${a * v}, pas ${c}.`]),
      strategy: `Chaque division cache une multiplication : ${c} : ${a} = ${b}, car ${a} × ${b} = ${c}.`,
    }),
  };
}

function missingFactorFact(a, b) {
  const c = a * b;
  return {
    fact: `mis:${a}x?=${c}`,
    make: (skill, level) => factItem(skill, level, {
      fact: `mis:${a}x?=${c}`, prompt: 'Trouve le nombre manquant.',
      left: m(num(a), op('×')), right: m(op('='), num(c)), expected: b,
      traps: [
        [c - a, 'missing_factor_subtract', `${c} − ${a} = ${c - a} : c'est une soustraction. On cherche combien de fois ${a} dans ${c}.`],
        ...[b - 1, b + 1].map((v) => [v, 'fact_neighbor', `${a} × ${v} = ${a * v}, pas ${c}.`]),
      ],
      strategy: `On cherche combien de fois ${a} dans ${c} : ${c} : ${a} = ${b}, car ${a} × ${b} = ${c}.`,
    }),
  };
}

function squareFact(n) {
  const r = n * n;
  const t = Math.floor(n / 10);
  const u = n % 10;
  const traps = [
    [2 * n, 'pow_times_exponent', `${n}² = ${n} × ${n}, pas ${n} × 2.`],
    ...[n - 1, n + 1].map((k) => [n * k, 'fact_neighbor', `${n * k}, c'est ${n} × ${k}. Un carré, c'est ${n} × ${n}.`]),
  ];
  if (n >= 10) traps.unshift([Number(`${t * t}${u * u}`), 'square_digits', `${n}² ne se fait pas chiffre par chiffre (${t}² puis ${u}²) : c'est ${n} × ${n} = ${r}.`]);
  if (n > 10 && u) traps.unshift([(10 * t) ** 2 + u * u, 'pow_distribute_sum', `${n}² n'est pas ${10 * t}² + ${u}² : il manque le double produit, 2 × ${10 * t} × ${u} = ${20 * t * u}.`]);
  return {
    fact: `sq:${n}`,
    make: (skill, level) => factItem(skill, level, {
      fact: `sq:${n}`, left: m(num(n), sup2, op('=')), expected: r, traps, strategy: squareStrategy(n),
    }),
  };
}

function rootFact(n) {
  const r = n * n;
  return {
    fact: `rsq:${n}`,
    make: (skill, level) => factItem(skill, level, {
      fact: `rsq:${n}`, prompt: 'Quel nombre au carré donne ce résultat ?',
      left: '', right: m(sup2, op('='), num(r)), expected: n,
      traps: [
        [r / 2, 'sqrt_half', `${r} : 2 = ${r / 2}, mais on cherche le nombre qui, multiplié par lui-même, donne ${r}.`],
        ...[n - 1, n + 1].map((k) => [k, 'fact_neighbor', `${k}² = ${k * k}, pas ${r}.`]),
      ],
      strategy: `${n} × ${n} = ${r}, donc ${n}² = ${r}. ${squareStrategy(n)}`,
    }),
  };
}

function addFact(a, b) {
  const [x, y] = a <= b ? [a, b] : [b, a];
  return {
    fact: `add:${x}+${y}`,
    make: (skill, level, rng) => {
      const [p, q] = rng.chance(0.5) ? [a, b] : [b, a];
      return factItem(skill, level, {
        fact: `add:${x}+${y}`, left: m(num(p), op('+'), num(q), op('=')), expected: a + b,
        traps: [
          [a * b, 'fact_mul_for_add', `${p} × ${q} = ${a * b} : ça, c'est une multiplication. Ici, c'est ${p} + ${q}.`],
          ...[a + b + 1, a + b - 1].map((v) => [v, 'count_off_by_one', `${v}, c'est à 1 près : ${p} + ${q} = ${a + b}.`]),
        ],
        strategy: addStrategy(a, b),
      });
    },
  };
}

function missingAddendFact(a, c) {
  return {
    fact: `mis:${a}+?=${c}`,
    make: (skill, level) => factItem(skill, level, {
      fact: `mis:${a}+?=${c}`, prompt: 'Trouve le nombre manquant.',
      left: m(num(a), op('+')), right: m(op('='), num(c)), expected: c - a,
      traps: [
        [c + a, 'fact_add_for_sub', `${c} + ${a} = ${c + a} : on a additionné. On cherche ce qu'il faut ajouter à ${a} pour arriver à ${c}.`],
        ...[c - a + 1, c - a - 1].map((v) => [v, 'count_off_by_one', `${a} + ${v} = ${a + v}, pas ${c}.`]),
      ],
      strategy: `Combien pour aller de ${a} à ${c} ? ${subStrategy(c, a)}`,
    }),
  };
}

function subFact(c, b) {
  return {
    fact: `sub:${c}-${b}`,
    make: (skill, level) => factItem(skill, level, {
      fact: `sub:${c}-${b}`, left: m(num(c), op('−'), num(b), op('=')), expected: c - b,
      traps: [
        ...[c - b + 1, c - b - 1].map((v) => [v, 'count_off_by_one', `${v}, c'est à 1 près : ${b} + ${v} = ${b + v}, pas ${c}.`]),
        [c + b, 'fact_add_for_sub', `${c} + ${b} = ${c + b} : on a additionné. Relis le signe : c'est ${c} − ${b}.`],
      ],
      strategy: subStrategy(c, b),
    }),
  };
}

// Picks a fact from the student's memory when a profile is given.
function choose(cands, rng, profile, skill, level) {
  const c = profile ? pickFact(profile, cands, rng) : rng.pick(cands);
  return c.make(skill, level, rng);
}

const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
const tables = (ts, bMax = 10) => {
  const out = new Map();
  for (const a of ts) for (const b of range(1, bMax)) {
    const f = mulFact(a, b);
    if (!out.has(f.fact)) out.set(f.fact, f);
  }
  return [...out.values()];
};
const divisions = (ts) => ts.flatMap((a) => range(1, 10).map((b) => divFact(a, b)));
const missing = (ts) => ts.flatMap((a) => range(2, 10).map((b) => missingFactorFact(a, b)));

// Candidate facts for each skill and level. Sets grow with the level, so
// earlier facts keep coming back (interleaving).
const FACTS = {
  'cm-add20': (level) => {
    const pairs = range(1, 9).flatMap((a) => range(a, 9).map((b) => [a, b]));
    const keep = {
      1: ([a, b]) => a + b <= 10 || a === b,
      2: ([a, b]) => a + b > 10 && (a >= 8 || b >= 8),
      3: ([a, b]) => a + b > 10,
      4: () => true,
      5: () => true,
    }[level];
    const facts = pairs.filter(keep).map(([a, b]) => addFact(a, b));
    if (level === 5) facts.push(...pairs.filter(([a, b]) => a + b > 10).map(([a, b]) => missingAddendFact(a, a + b)));
    return facts;
  },
  'cm-sub20': (level) => {
    const all = range(2, 19).flatMap((c) => range(1, Math.min(9, c - 1)).map((b) => [c, b]));
    const keep = {
      1: ([c]) => c <= 10,
      2: ([c, b]) => c > 10 && b <= c - 10,
      3: ([c, b]) => c > 10 && b > c - 10,
      4: ([c]) => c > 10,
      5: () => true,
    }[level];
    return all.filter(keep).map(([c, b]) => subFact(c, b));
  },
  'tab-2510': (level) => {
    const ts = { 1: [2, 10], 2: [2, 5, 10], 3: [2, 5, 10], 4: [2, 5, 10], 5: [2, 5, 10] }[level];
    return [...tables(ts), ...(level === 5 ? missing([2, 5, 10]) : [])];
  },
  'tab-349': (level) => {
    const ts = { 1: [4], 2: [4, 9], 3: [3, 4, 9], 4: [2, 3, 4, 5, 9, 10], 5: [3, 4, 9] }[level];
    return [...tables(ts), ...(level === 5 ? missing([3, 4, 9]) : [])];
  },
  'tab-678': (level) => {
    const ts = { 1: [6], 2: [6, 8], 3: [6, 7, 8], 4: range(2, 10), 5: [6, 7, 8] }[level];
    return [...tables(ts), ...(level === 5 ? missing([6, 7, 8]) : [])];
  },
  'tab-div': (level) => {
    if (level === 1) return divisions([2, 5, 10]);
    if (level === 2) return divisions([2, 3, 4, 5, 9, 10]);
    if (level === 3) return divisions([6, 7, 8]);
    if (level === 4) return divisions(range(2, 10));
    return [...divisions(range(2, 10)), ...missing(range(2, 10))];
  },
  'tab-1112': (level) => ({
    1: tables([11], 9),
    2: tables([11], 12),
    3: tables([12], 10),
    4: tables([12], 12),
    5: tables([11, 12], 12),
  }[level]),
  'sq-13': (level) => {
    const ns = { 1: [1, 2, 3, 4, 5, 10], 2: range(1, 10), 3: range(6, 13), 4: range(1, 13), 5: range(1, 13) }[level];
    return [...ns.map(squareFact), ...(level === 5 ? range(2, 13).map(rootFact) : [])];
  },
  'sq-25': (level) => {
    const ns = { 1: range(14, 16), 2: range(14, 19), 3: range(14, 22), 4: range(14, 25), 5: range(11, 25) }[level];
    return [...ns.map(squareFact), ...(level === 5 ? range(11, 25).map(rootFact) : [])];
  },
};

// Every fact a skill can ask, for progress counts.
export function skillFacts(skill) {
  if (!FACTS[skill]) return [];
  const keys = new Set();
  for (let level = 1; level <= 5; level++) for (const f of FACTS[skill](level)) keys.add(f.fact);
  return [...keys];
}

const factGen = (skill) => (level, rng, profile) => choose(FACTS[skill](level), rng, profile, skill, level);

// ---------- computed (not memorised) ----------

// 2-digit ± 1-digit, through the ten from level 2.
function addOneDigit(level, rng) {
  const plus = level <= 2 || (level === 5 ? rng.chance(0.5) : false);
  const cross = level === 2 || level >= 4;
  let a;
  let b;
  for (;;) {
    a = rng.int(11, 98);
    b = rng.int(2, 9);
    const u = a % 10;
    const crosses = plus ? u + b >= 10 : b > u;
    if (crosses === cross && (plus ? a + b <= 99 : a - b >= 10) && u !== 0) break;
  }
  const traps = [];
  const u = a % 10;
  if (cross && plus) traps.push([a + b - 10, 'forget_carry', `${u} + ${b} = ${u + b} : ça fait ${u + b - 10} unités et <b>une dizaine de plus</b>, donc ${a + b}.`]);
  if (cross && !plus) traps.push([a - u + Math.abs(u - b), 'sub_smaller_from_larger', `Aux unités, c'est ${u} − ${b}, pas ${b} − ${u}. Comme ${b} est plus grand que ${u}, on passe par la dizaine.`]);
  return factItem('cm-add1', level, {
    left: m(num(a), op(plus ? '+' : '−'), num(b), op('=')), expected: plus ? a + b : a - b,
    traps, strategy: addSmallStrategy(a, b, plus), sec: 6,
  });
}

// 2-digit ± 2-digit.
function addTwoDigits(level, rng) {
  const plus = level <= 2 || (level === 5 ? rng.chance(0.5) : false);
  const carry = level === 2 || level >= 4;
  let a;
  let b;
  for (;;) {
    a = rng.int(21, 89);
    b = rng.int(12, 79);
    const ua = a % 10;
    const ub = b % 10;
    const hasCarry = plus ? ua + ub >= 10 : ub > ua;
    if (hasCarry === carry && ua && ub && (plus ? a + b <= 99 : a - b >= 10)) break;
  }
  const ub = b % 10;
  const B = b - ub + 10;
  const traps = [];
  if (plus) {
    if (carry) traps.push([a + b - 10, 'forget_carry', `${a % 10} + ${ub} = ${(a % 10) + ub} : ça fait <b>une dizaine de plus</b>, donc ${a + b}.`]);
    if (ub >= 7) traps.push([a + B + (B - b), 'compensation_wrong_way', `En ajoutant ${B} au lieu de ${b}, on a ajouté ${B - b} de trop : il faut <b>retirer</b> ce surplus. ${a} + ${B} − ${B - b} = ${a + b}.`]);
  } else {
    if (carry) {
      traps.push([(Math.floor(a / 10) - Math.floor(b / 10)) * 10 + Math.abs((a % 10) - ub), 'sub_smaller_from_larger', `Aux unités, c'est ${a % 10} − ${ub}, pas ${ub} − ${a % 10}. On emprunte une dizaine, ou on passe par la dizaine.`]);
      traps.push([a - b + 10, 'forget_carry', `On a emprunté une dizaine pour les unités : il faut aussi l'enlever aux dizaines, donc ${a - b}.`]);
    }
    if (ub >= 7) traps.push([a - B - (B - b), 'compensation_wrong_way', `En retirant ${B} au lieu de ${b}, on a retiré ${B - b} de trop : il faut <b>rajouter</b> ce qui manque. ${a} − ${B} + ${B - b} = ${a - b}.`]);
  }
  return factItem('cm-add2', level, {
    left: m(num(a), op(plus ? '+' : '−'), num(b), op('=')), expected: plus ? a + b : a - b,
    traps, strategy: addTwoStrategy(a, b, plus), sec: 9,
  });
}

// ---------- rounding ----------

const PLACES = { 10: 'à la dizaine', 100: 'à la centaine', 1: 'à l’unité', 0.1: 'au dixième', 0.01: 'au centième' };

function roundingItem(level, rng) {
  const step = { 1: 10, 2: 100, 3: 1, 4: 0.1, 5: rng.pick([1, 0.1, 0.01]) }[level];
  let x;
  for (;;) {
    if (step === 10) x = rng.int(11, 999);
    else if (step === 100) x = rng.int(101, 9999);
    else if (step === 1) x = rng.int(11, 999) / (rng.chance(0.5) ? 10 : 100);
    else if (step === 0.1) x = rng.int(101, 9999) / 100;
    else x = rng.int(1001, 9999) / 1000;
    x = fix(x);
    if (round(x, step) !== x) break;
  }
  const r = round(x, step);
  const next = Math.floor(fix((x / step) * 10)) % 10; // the digit that decides
  // Truncation, when rounding goes up.
  const cut = fix(Math.floor(fix(x / step)) * step);
  const den = step >= 1 ? 1 : Math.round(1 / step);
  const traps = cut !== r ? [{ value: [Math.round(cut * den), den], rule: 'round_truncate' }] : [];
  return answerItem('cm-round', level, `Arrondis ${m(num(x))} ${PLACES[step]}.`, dec(r), {
    keys: Number.isInteger(x) ? 'int' : 'dec',
    traps,
    solution: [
      { math: dec(x), note: `Le chiffre qui décide est ${next} : de 0 à 4 on garde, de 5 à 9 on monte.` },
      { math: dec(r), note: '' },
    ],
    key: `${x}@${step}`,
    expectedSec: 12,
  });
}

// ---------- estimation ----------

const oneDigit = (x) => {
  const p = 10 ** Math.floor(Math.log10(Math.abs(x)));
  return Math.round(x / p) * p;
};

function estimateItem(level, rng) {
  let expr;
  let est;
  let sol;
  if (level === 1) {
    const a = rng.int(120, 880);
    const b = rng.int(120, 880);
    est = round(a, 100) + round(b, 100);
    expr = m(num(a), op('+'), num(b));
    sol = `${round(a, 100)}+${round(b, 100)}`;
  } else if (level === 2) {
    const a = rng.int(21, 98);
    const b = rng.int(3, 9);
    est = round(a, 10) * b;
    expr = m(num(a), op('×'), num(b));
    sol = `${round(a, 10)}×${b}`;
  } else if (level === 3) {
    const a = rng.int(12, 98);
    const b = rng.int(12, 98);
    est = oneDigit(a) * oneDigit(b);
    expr = m(num(a), op('×'), num(b));
    sol = `${oneDigit(a)}×${oneDigit(b)}`;
  } else if (level === 4) {
    const D = rng.int(2, 9) * 10;
    const E = rng.int(3, 30);
    const c = E * D + rng.int(-Math.floor(D / 4), Math.floor(D / 4));
    const d = D + rng.int(-3, 3);
    est = E;
    expr = m(num(c), op(':'), num(d));
    sol = `${E * D}÷${D}`;
  } else {
    const A = rng.pick([0.2, 0.4, 0.5, 0.6, 0.8]);
    const H = rng.int(1, 9) * 100;
    const a = fix(A + rng.pick([-0.02, -0.01, 0.01, 0.02, 0.03]));
    const b = H + rng.int(-9, 9);
    est = fix(A * H);
    expr = m(num(a), op('×'), num(b));
    sol = `${dec(A)}×${H}`;
  }
  const values = [...new Set([est, fix(est * 10), fix(est * 100), fix(est / 10)])].filter((v) => v > 0).slice(0, 4);
  values.sort((x, y) => x - y);
  const options = values.map((v) => ({ html: m(num(v)), correct: v === est }));
  return mcqItem('cm-estimate', level, `Sans calculer exactement : ${expr} vaut environ…`, options, rng, {
    keepOrder: true,
    solution: [{ math: sol, note: 'On arrondit chaque nombre, puis on calcule.' }, { math: dec(est), note: '' }],
    key: expr,
    expectedSec: 10,
  });
}

// ---------- clever mental calculation ----------

function cleverItem(level, rng) {
  let prompt;
  let expected;
  let solution;
  let key;
  if (level === 1) {
    if (rng.chance(0.5)) {
      const n = rng.int(13, 49);
      expected = 2 * n;
      prompt = `Le double de ${m(num(n))} ?`;
      solution = [{ math: `${n}+${n}`, note: `Double des dizaines (${2 * (n - (n % 10))}) et des unités (${2 * (n % 10)}).` }, { math: String(expected), note: '' }];
      key = `double ${n}`;
    } else {
      const n = 2 * rng.int(12, 49);
      expected = n / 2;
      prompt = `La moitié de ${m(num(n))} ?`;
      solution = [{ math: `${n}÷2`, note: 'Moitié des dizaines, puis des unités.' }, { math: String(expected), note: '' }];
      key = `moitié ${n}`;
    }
  } else {
    let a;
    let b;
    let lines;
    if (level === 2) {
      a = 2 * rng.int(6, 49);
      b = 5;
      lines = [[`${a}×10÷2`, '× 5, c\'est × 10 puis ÷ 2.'], [`${a * 10}÷2`, '']];
    } else if (level === 3) {
      a = 4 * rng.int(2, 24);
      b = 25;
      lines = [[`${a}×100÷4`, '× 25, c\'est × 100 puis ÷ 4.'], [`${a * 100}÷4`, '']];
    } else if (level === 4) {
      a = rng.int(12, 49);
      b = rng.pick([9, 11]);
      lines = [[`${a}×10${b === 9 ? '-' : '+'}${a}`, b === 9 ? '× 9, c\'est 10 fois moins une fois.' : '× 11, c\'est 10 fois plus une fois.'], [`${a * 10}${b === 9 ? '-' : '+'}${a}`, '']];
    } else if (rng.chance(0.5)) {
      a = rng.int(12, 48);
      b = 50;
      lines = [[`${a}×100÷2`, '× 50, c\'est × 100 puis ÷ 2.'], [`${a * 100}÷2`, '']];
    } else {
      const c = 5 * rng.int(21, 99);
      expected = c / 5;
      prompt = `Calcule de tête : ${m(num(c), op(':'), num(5))}`;
      solution = [{ math: `${c}×2÷10`, note: '÷ 5, c\'est × 2 puis ÷ 10.' }, { math: `${2 * c}÷10`, note: '' }, { math: String(expected), note: '' }];
      key = `${c}:5`;
    }
    if (!prompt) {
      expected = a * b;
      prompt = `Calcule de tête : ${m(num(a), op('×'), num(b))}`;
      solution = [{ math: `${a}×${b}`, note: '' }, ...lines.map(([math, note]) => ({ math, note })), { math: String(expected), note: '' }];
      key = `${a}x${b}`;
    }
  }
  return answerItem('cm-mix', level, prompt, expected, { keys: 'int', solution, key, expectedSec: 15 });
}

export const GEN = {
  'cm-add20': factGen('cm-add20'),
  'cm-sub20': factGen('cm-sub20'),
  'cm-add1': addOneDigit,
  'cm-add2': addTwoDigits,
  'tab-2510': factGen('tab-2510'),
  'tab-349': factGen('tab-349'),
  'tab-678': factGen('tab-678'),
  'tab-div': factGen('tab-div'),
  'tab-1112': factGen('tab-1112'),
  'sq-13': factGen('sq-13'),
  'sq-25': factGen('sq-25'),
  'cm-round': roundingItem,
  'cm-estimate': estimateItem,
  'cm-mix': cleverItem,
};

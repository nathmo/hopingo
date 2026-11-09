// Calculations that mix chapters: powers of fractions and negative
// exponents, roots of fractions, and the "Calculs mélangés" unit where
// fractions, signed numbers, powers and roots meet in one expression.
//
// Expressions come from patterns. Each capital letter is a random operand:
//   F  positive fraction 1/2…5/6          S  signed fraction, often negative
//   N  signed integer −6…6 (not 0, ±1)    P  positive integer 2…6
//   R  root of a square fraction √(9/16)  Q  root of a square √49
//   E  small exponent 2 or 3              M  negative exponent −1 or −2

import { parse, evaluate } from '../math/expr.js';
import { solve } from '../math/solver.js';
import { stepsItem, answerItem, computeMcq, coprimeNum, mathHtml } from './items.js';

const DENS = [2, 3, 4, 5, 6];

function fraction(rng, dens = DENS) {
  const d = rng.pick(dens);
  return [coprimeNum(rng, d, 1, d - 1), d];
}

// Fills a pattern. A negative operand gets brackets unless it opens the
// expression; a fraction gets brackets when it is raised to a power.
export function fillMix(pattern, rng) {
  let out = '';
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    const powered = pattern[i + 1] === '^';
    const first = out === '' || out.endsWith('(');
    const wrap = (s, negative) => (powered || (negative && !first) ? `(${s})` : s);
    if (c === 'F') {
      const [n, d] = fraction(rng);
      out += wrap(`${n}/${d}`, false);
    } else if (c === 'S') {
      const [n, d] = fraction(rng);
      const negative = rng.chance(0.65);
      out += wrap(`${negative ? '-' : ''}${n}/${d}`, negative);
    } else if (c === 'N') {
      const x = rng.pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);
      out += x < 0 ? wrap(`${x}`, true) : `${x}`;
    } else if (c === 'P') out += `${rng.int(2, 6)}`;
    else if (c === 'R') {
      const [n, d] = fraction(rng, [2, 3, 4, 5, 6, 7]);
      out += `√(${n * n}/${d * d})`;
    } else if (c === 'Q') out += `√${rng.int(2, 9) ** 2}`;
    else if (c === 'E') out += `${rng.int(2, 3)}`;
    else if (c === 'M') out += `-${rng.int(1, 2)}`;
    else out += c;
  }
  return out;
}

// Small enough to compute without paper, and not trivial.
function acceptable(expr, { maxDen = 72, maxNum = 150, maxLines = 8 } = {}) {
  let v;
  let lines;
  try {
    v = evaluate(parse(expr));
    lines = solve(parse(expr));
  } catch { return false; }
  return v.d <= maxDen && Math.abs(v.n) <= maxNum && v.n !== 0 && lines.length >= 2 && lines.length <= maxLines;
}

const modeFor = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');

function fromPatterns(skill, patterns, fallback, opts = {}) {
  return (level, rng) => {
    for (let i = 0; i < 400; i++) {
      const expr = fillMix(rng.pick(patterns[level]), rng);
      if (!acceptable(expr, opts)) continue;
      return stepsItem(skill, level, expr, { mode: opts.mode?.(level) ?? modeFor(level), prompt: 'Calcule et donne le résultat sous forme irréductible.' });
    }
    return stepsItem(skill, level, fallback, { mode: modeFor(level) });
  };
}

export const GEN = {};

// ---------- Puissances de fractions et exposants négatifs ----------

GEN['pow-frac'] = (level, rng) => {
  if (level <= 2) {
    const [n, d] = fraction(rng, [2, 3, 4, 5]);
    const sign = level === 2 ? '-' : '';
    const e = rng.int(2, 3);
    return stepsItem('pow-frac', level, `(${sign}${n}/${d})^${e}`, {
      mode: 'guided', prompt: 'Calcule.', solveOpts: { expandPowers: true },
    });
  }
  if (level === 3) {
    const expr = rng.pick([
      () => { const [n, d] = fraction(rng); return `(${rng.chance(0.5) ? '-' : ''}${n}/${d})^-1`; },
      () => `${rng.int(2, 5)}^-${rng.int(1, 3)}`,
      () => { const [n, d] = fraction(rng, [2, 3, 4]); return `(${n}/${d})^-2`; },
    ])();
    return computeMcq('pow-frac', level, expr, rng, { signed: true });
  }
  const patterns = {
    4: ['S^M', 'F^M×P', 'S^-2', 'N^-2'],
    5: ['F^E×S^M', 'S^M+F', 'S^E-S^-1', 'P^-1+F^E'],
  };
  return fromPatterns('pow-frac', patterns, '(2/3)^-2', { mode: () => 'free' })(level, rng);
};

// ---------- Racines et fractions ----------

GEN['root-frac'] = (level, rng) => {
  if (level === 1) {
    const [n, d] = fraction(rng, [2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const expr = `√(${n * n}/${d * d})`;
    return answerItem('root-frac', level, `Calcule ${mathHtml(expr)}.`, `${n}/${d}`, {
      tree: expr, traps: [{ value: [n, d * d], rule: 'sqrt_numerator_only' }], key: expr,
    });
  }
  const patterns = {
    2: ['R×N^2', 'R×P', 'R+F'],
    3: ['R+F^2', 'R-F', 'P×R-F', 'Q×R'],
    4: ['R×S^2-F', 'S^2÷R', 'R×N^E+F', '(R-F)×N'],
    5: ['R×S^M+F', '(R-F)^2×N', 'Q-S^-1×R', 'S^E÷R-F'],
  };
  return fromPatterns('root-frac', patterns, '√(9/16)×(-2)^2')(level, rng);
};

// ---------- Calculs mélangés ----------

// 9H: sums of signed integers (no product of negatives yet: that is 10H),
// fractions times whole numbers, squares.
const MIX9 = {
  1: ['N+P×P', 'F+F×P', 'P^2-N'],
  2: ['N-P×P', '(F+F)×P', 'P^2+N'],
  3: ['N-(N+N)', 'P-F×P', 'F×P+P^2'],
  4: ['P^2-(N+N)', 'F+F-F×P', 'P^2-P×P+N'],
  5: ['N-P×(P+P)+P^2', '(P-F)×P+F', 'N+N-P^2×P'],
};
// 10H: signed fractions, powers of signed numbers.
const MIX10 = {
  1: ['S+N×F', 'N^2+S', 'S×N-F'],
  2: ['(S-F)×N', 'N^E-S×F', 'S^2+F'],
  3: ['-P^2+S×N', 'S×S-N', 'N^E÷S'],
  4: ['(S+F)×(N-P)', 'S^2-F×N', 'N^E+S÷F'],
  5: ['(S-F)^2×N', 'N^E×S-S^2', '-P^2+(S+F)×N'],
};
// 11H: everything, with roots and negative exponents.
const MIX11 = {
  1: ['S^2-F×R', 'R+S^E', 'Q×S-N'],
  2: ['S^M+R', 'R×N^E-F', 'Q-S^-1'],
  3: ['(S+F)^2×Q', 'Q-S^M×F', 'P^-1+R'],
  4: ['S^E-F×R+N', 'R×(S-F)^2', 'N^E×S^M-R'],
  5: ['(R-F)^E×S^M', 'Q×S^2-R÷F', '(S+F)^-1-R×N'],
};

GEN['mix-9'] = fromPatterns('mix-9', MIX9, '-3+4×(-2)');
GEN['mix-10'] = fromPatterns('mix-10', MIX10, '(-1/2)^2+3/4×(-2)');
GEN['mix-11'] = fromPatterns('mix-11', MIX11, '(-1/2)^2-3/4×√(16/9)');

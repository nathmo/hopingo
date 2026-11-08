// Question generators for the signed-numbers unit (nombres relatifs).
// Item format: see items.js.

import { Q } from '../math/rational.js';
import { parse, evaluate, walk } from '../math/expr.js';
import { solve } from '../math/solver.js';
import {
  mathHtml, BLANK, valStr, stepsItem, answerItem, mcqItem, computeMcq, coprimeNum,
  SYM, symbolOptions,
} from './items.js';

export const GEN = {};

// ---------- helpers ----------

// A non-zero integer in [lo, hi].
const nz = (rng, lo, hi) => {
  for (let i = 0; i < 50; i++) {
    const x = rng.int(lo, hi);
    if (x !== 0) return x;
  }
  return hi || 1;
};
// Mostly negative, sometimes positive: the unit is about the negatives.
const signed = (rng, max, pNeg = 0.6) => (rng.chance(pNeg) ? -rng.int(1, max) : rng.int(1, max));
// An operand after an operator: negative numbers get brackets.
const op = (x) => (String(x).startsWith('-') ? `(${x})` : String(x));
const dec = (q) => q.toDecimal();
const show = (x) => String(x).replace(/-/g, '−');

function placeItem(level, line, n, d) {
  const v = new Q(n, d);
  return {
    skill: 'rel-read', level, type: 'numberline',
    prompt: `Place ${mathHtml(v.toString())} sur la droite.`,
    line, target: v.toString(),
    baits: [],
    solution: [{ math: v.toString(), note: v.n < 0 ? `À gauche de 0 : ${Math.abs(v.n * line.den / v.d)} graduation${Math.abs(v.n * line.den / v.d) > 1 ? 's' : ''} depuis 0.` : 'À droite de 0.' }],
    expectedSec: 12, key: `rel-read:place:${v}:${line.min}:${line.den}`,
  };
}

const TEMP = (t) => `${show(t)} °C`;

// ---------- Les nombres relatifs ----------

GEN['rel-read'] = (level, rng) => {
  if (level === 1) return placeItem(level, { min: -5, max: 5, den: 1 }, signed(rng, 5, 0.8), 1);
  if (level === 2) {
    const x = signed(rng, 6, 0.8);
    return answerItem('rel-read', level, 'Quel nombre est repéré par le point ?', `${x}`, {
      figure: { kind: 'line', min: -6, max: 6, den: 1, mark: [x, 1] },
      keys: 'rel', signed: true,
      traps: [{ value: [-x, 1], rule: x < 0 ? 'read_neg_as_pos' : null }],
      solution: [{ math: `${x}`, note: x < 0 ? `${-x} graduations à gauche de 0 : c'est un nombre négatif.` : `${x} graduations à droite de 0.` }],
      key: `read:${x}`,
    });
  }
  if (level === 3) {
    if (rng.chance(0.5)) {
      const x = nz(rng, -12, 12);
      return answerItem('rel-read', level, `Quel est l'opposé de ${mathHtml(`${x}`)} ?`, `${-x}`, {
        keys: 'relfrac', signed: true,
        traps: [{ value: [Math.sign(x), Math.abs(x)], rule: Math.abs(x) > 1 ? 'opposite_inverse' : null }],
        solution: [{ math: `${-x}`, note: `${show(x)} et ${show(-x)} sont à la même distance de 0, de chaque côté.` }],
        key: `opp:${x}`,
      });
    }
    // Temperatures: a rise or a fall that crosses zero.
    const t = rng.int(-6, 6);
    const change = rng.chance(0.5) ? -rng.int(Math.max(1, t + 1), t + 9) : rng.int(Math.max(1, -t + 1), -t + 9);
    const tree = `${t}${change < 0 ? '-' : '+'}${Math.abs(change)}`;
    return answerItem('rel-read', level, `Il fait ${TEMP(t)}. La température ${change < 0 ? 'baisse' : 'monte'} de ${Math.abs(change)} °C. Quelle température fait-il ensuite ?`, evaluate(parse(tree)).toString(), {
      keys: 'rel', signed: true, tree, suffix: '°C', key: `temp:${tree}`,
    });
  }
  if (level === 4) {
    const den = rng.pick([2, 4]);
    let k = -rng.int(1, 2 * den - 1);
    if (k % den === 0) k -= 1;
    if (rng.chance(0.2)) k = -k;
    return placeItem(level, { min: -2, max: 2, den }, k, den);
  }
  // Level 5: read a fraction left of zero.
  const den = rng.pick([2, 3, 4]);
  let k = -rng.int(den + 1, 3 * den - 1);
  if (k % den === 0) k -= 1;
  const a = -k;
  const whole = Math.floor(a / den);
  const r = a % den;
  const mirrored = -(whole * den + (den - r));
  return answerItem('rel-read', level, 'Quel nombre est repéré par le point ?', valStr(k, den), {
    figure: { kind: 'line', min: -3, max: 1, den, mark: [k, den] },
    keys: 'relfrac', signed: true,
    traps: [{ value: [mirrored, den], rule: mirrored !== k ? 'neg_line_direction' : null }, { value: [a, den], rule: 'read_neg_as_pos' }],
    solution: [{ math: valStr(k, den), note: `Chaque unité est coupée en ${den}. Depuis 0, on compte ${a} graduations vers la gauche.` }],
    key: `readfrac:${k}/${den}`,
  });
};

// ---------- Comparer ----------

function compareItem(level, a, b, rng) {
  const qa = Q.of(evaluate(parse(String(a))));
  const qb = Q.of(evaluate(parse(String(b))));
  const right = SYM(qa.cmp(qb));
  const preds = [];
  if (qa.n === 0 && qb.n < 0) preds.push(['zero_smallest', '<']);
  if (qb.n === 0 && qa.n < 0) preds.push(['zero_smallest', '>']);
  const abs = (v) => (v.n < 0 ? v.neg() : v);
  if (qa.n < 0 || qb.n < 0) preds.push(['compare_neg_digits', SYM(abs(qa).cmp(abs(qb)))]);
  const options = symbolOptions(right, preds);
  const sa = qa.isInt() ? `${qa.n}` : dec(qa);
  const sb = qb.isInt() ? `${qb.n}` : dec(qb);
  return mcqItem('rel-compare', level, `Compare : ${mathHtml(sa)} <span class="m-q">?</span> ${mathHtml(sb)}`, options, rng, {
    keepOrder: true, big: true,
    solution: [{ math: sa, note: `${right} ${show(sb)} : ${right === '<' ? 'il est plus à gauche sur la droite' : right === '>' ? 'il est plus à droite sur la droite' : 'ce sont les mêmes nombres'}.` }],
    key: `${sa}:${sb}`,
  });
}

GEN['rel-compare'] = (level, rng) => {
  if (level === 1) {
    if (rng.chance(0.3)) {
      const x = -rng.int(1, 9);
      return rng.chance(0.5) ? compareItem(level, 0, x, rng) : compareItem(level, x, 0, rng);
    }
    const n = -rng.int(2, 9);
    const p = rng.int(1, -n - 1);
    return rng.chance(0.5) ? compareItem(level, n, p, rng) : compareItem(level, p, n, rng);
  }
  if (level === 2) {
    const a = -rng.int(1, 15);
    let b = -rng.int(1, 15);
    if (a === b) b -= 1;
    return compareItem(level, a, b, rng);
  }
  if (level === 3) {
    const w = rng.int(0, 5);
    const a = new Q(-(w * 10 + rng.int(1, 9)), 10);
    let b = new Q(-(w * 100 + rng.int(1, 99)), 100);
    if (a.eq(b)) b = b.sub(new Q(1, 100));
    return rng.chance(0.5) ? compareItem(level, dec(a), dec(b), rng) : compareItem(level, dec(b), dec(a), rng);
  }
  if (level === 4) {
    for (let i = 0; i < 50; i++) {
      const set = new Set([-rng.int(5, 15), -rng.int(1, 4), rng.chance(0.5) ? 0 : rng.int(1, 4), rng.int(1, 12)]);
      if (set.size < 4) continue;
      const xs = [...set];
      const min = Math.min(...xs);
      const byAbs = xs.reduce((m, x) => (Math.abs(x) < Math.abs(m) ? x : m));
      if (byAbs === min) continue;
      const opts = xs.map((x) => ({
        html: mathHtml(`${x}`), correct: x === min,
        rule: x === byAbs ? (x === 0 ? 'zero_smallest' : 'compare_neg_digits') : null,
      }));
      return mcqItem('rel-compare', level, 'Quel est le plus petit nombre ?', opts, rng, {
        big: true, solution: [{ math: `${min}`, note: 'C\'est le plus à gauche sur la droite graduée.' }],
        key: `min:${xs.join()}`,
      });
    }
  }
  // Level 5: the largest of four negative decimals.
  for (let i = 0; i < 50; i++) {
    const xs = [...new Set(Array.from({ length: 4 }, () => -rng.int(1, 60) / 10))];
    if (xs.length < 4) continue;
    const max = Math.max(...xs);
    const most = Math.min(...xs);
    const s = (x) => dec(Q.fromDecimal(String(Math.abs(x))).neg());
    const opts = xs.map((x) => ({ html: mathHtml(s(x)), correct: x === max, rule: x === most ? 'compare_neg_digits' : null }));
    return mcqItem('rel-compare', level, 'Quel est le plus grand nombre ?', opts, rng, {
      big: true, solution: [{ math: s(max), note: 'Le plus proche de zéro : c\'est le plus à droite.' }],
      key: `max:${xs.join()}`,
    });
  }
  return compareItem(level, -7, -3, rng);
};

// ---------- Additionner ----------

const CONTEXTS = [
  (a, b) => `Le matin, il fait ${TEMP(a)}. Pendant la journée, la température ${b < 0 ? 'baisse' : 'monte'} de ${Math.abs(b)} °C. Quelle température fait-il le soir ?`,
  (a, b) => `Un ascenseur est à l'étage ${show(a)} (sous-sol). Il ${b < 0 ? 'descend' : 'monte'} de ${Math.abs(b)} étages. À quel étage arrive-t-il ?`,
  (a, b) => `Le compte de Noé est à ${show(a)} francs. Il ${b < 0 ? 'dépense' : 'reçoit'} ${Math.abs(b)} francs. Combien y a-t-il sur le compte ?`,
];

GEN['rel-add'] = (level, rng) => {
  const pair = (max) => {
    for (let i = 0; i < 50; i++) {
      const a = nz(rng, -max, max);
      const b = nz(rng, -max, max);
      if ((a < 0 || b < 0) && a + b !== 0) return [a, b];
    }
    return [-3, 5];
  };
  if (level === 1) {
    const [a, b] = pair(9);
    return stepsItem('rel-add', level, `${a}+${op(b)}`, { mode: 'guided', prompt: 'Calcule.' });
  }
  if (level === 2) {
    const [a, b] = pair(12);
    const expr = `${a}+${op(b)}`;
    if (rng.chance(0.3)) return computeMcq('rel-add', level, expr, rng, { signed: true });
    return answerItem('rel-add', level, `Calcule ${mathHtml(expr)}.`, evaluate(parse(expr)).toString(), { tree: expr, keys: 'rel', signed: true, key: expr });
  }
  if (level === 3) {
    const a = -rng.int(1, 12);
    const b = rng.chance(0.6) ? rng.int(1, 20) : -rng.int(1, 9);
    const k = rng.int(0, CONTEXTS.length - 1);
    const tree = `${a}+${op(b)}`;
    return answerItem('rel-add', level, CONTEXTS[k](a, b), evaluate(parse(tree)).toString(), {
      tree, keys: 'rel', signed: true, suffix: k === 0 ? '°C' : '', key: `ctx${k}:${tree}`, expectedSec: 30,
    });
  }
  if (level === 4) {
    const [a, b] = pair(15);
    const c = nz(rng, -15, 15);
    return stepsItem('rel-add', level, `${a}+${op(b)}+${op(c)}`, { prompt: 'Calcule.' });
  }
  // Level 5: decimals.
  for (let i = 0; i < 30; i++) {
    const a = new Q(signed(rng, 60), 10);
    const b = new Q(signed(rng, 60, 0.5), 10);
    if ((a.n > 0 && b.n > 0) || a.isInt() || b.isInt()) continue;
    const expr = `${dec(a)}+${op(dec(b))}`;
    const v = evaluate(parse(expr));
    if (v.n === 0) continue;
    return answerItem('rel-add', level, `Calcule ${mathHtml(expr)}.`, dec(v), { tree: expr, keys: 'reldec', form: 'decimal', signed: true, key: expr });
  }
  return answerItem('rel-add', level, `Calcule ${mathHtml('-2,5+4')}.`, '1,5', { tree: '-2,5+4', keys: 'reldec', form: 'decimal', signed: true });
};

// ---------- Soustraire ----------

GEN['rel-sub'] = (level, rng) => {
  const pick = (max) => {
    const a = nz(rng, -max, max);
    const b = rng.chance(0.5) ? -rng.int(1, max) : rng.int(1, max);
    return a - b === 0 ? [a, b + 1 === 0 ? 2 : b + 1] : [a, b];
  };
  if (level === 1) {
    const b = rng.int(1, 9);
    const a = rng.chance(0.6) ? nz(rng, -9, 9) : -rng.int(1, 9);
    const expr = rng.chance(0.65) ? `${a}-(-${b})` : `${-Math.abs(a)}-${b}`;
    return stepsItem('rel-sub', level, expr, { mode: 'guided', prompt: 'Calcule.' });
  }
  if (level === 2) {
    const [a, b] = pick(12);
    const expr = `${a}-${op(b)}`;
    if (rng.chance(0.3)) return computeMcq('rel-sub', level, expr, rng, { signed: true });
    return answerItem('rel-sub', level, `Calcule ${mathHtml(expr)}.`, evaluate(parse(expr)).toString(), { tree: expr, keys: 'rel', signed: true, key: expr });
  }
  if (level === 3) {
    if (rng.chance(0.5)) {
      const a = nz(rng, -9, 9);
      const b = rng.int(2, 9);
      const opts = [
        { html: mathHtml(`${a}+${b}`), correct: true },
        { html: mathHtml(`${a}-${b}`), correct: false, rule: 'sub_neg_subtracts' },
        { html: mathHtml(`${a}+(-${b})`), correct: false, rule: 'sub_neg_subtracts' },
        { html: mathHtml(`${-a}+${b}`), correct: false },
      ];
      return mcqItem('rel-sub', level, `Quelle addition est égale à ${mathHtml(`${a}-(-${b})`)} ?`, opts, rng, {
        solution: [{ math: `${a}-(-${b})`, note: `= ${show(a)} + ${b} : soustraire −${b}, c'est ajouter ${b}.` }],
        key: `asadd:${a}:${b}`,
      });
    }
    const low = -rng.int(2, 12);
    const high = rng.int(1, 15);
    const tree = `${high}-(${low})`;
    return answerItem('rel-sub', level, `À midi, il fait ${TEMP(high)} ; la nuit, il faisait ${TEMP(low)}. Quel est l'écart entre ces deux températures ?`, `${high - low}`, {
      tree, keys: 'rel', signed: true, suffix: '°C', key: `gap:${tree}`, expectedSec: 30,
    });
  }
  if (level === 4) {
    const [a, b] = pick(12);
    const c = nz(rng, -12, 12);
    return stepsItem('rel-sub', level, `${a}-${op(b)}-${op(c)}`, { prompt: 'Calcule.' });
  }
  for (let i = 0; i < 30; i++) {
    const a = new Q(signed(rng, 60, 0.5), 10);
    const b = new Q(signed(rng, 60), 10);
    const expr = `${dec(a)}-${op(dec(b))}`;
    const v = evaluate(parse(expr));
    if (v.n === 0 || a.isInt() || b.isInt() || (a.n > 0 && b.n > 0 && v.n > 0)) continue;
    return answerItem('rel-sub', level, `Calcule ${mathHtml(expr)}.`, dec(v), { tree: expr, keys: 'reldec', form: 'decimal', signed: true, key: expr });
  }
  return answerItem('rel-sub', level, `Calcule ${mathHtml('-2,5-(-4)')}.`, '1,5', { tree: '-2,5-(-4)', keys: 'reldec', form: 'decimal', signed: true });
};

// ---------- Sommes de relatifs ----------

// Terms joined with + and −, as a student would write them: −3 + 5 − 4.
function chain(rng, n, max) {
  for (let k = 0; k < 20; k++) {
    let s = `${nz(rng, -max, max)}`;
    for (let i = 1; i < n; i++) s += `${rng.chance(0.5) ? '+' : '-'}${rng.chance(0.3) ? op(-rng.int(1, max)) : rng.int(1, max)}`;
    // Something must go below zero, or it is not about signed numbers.
    let below = false;
    walk(parse(s), (x) => { if (x.t === 'neg' || (x.t === 'bin' && evaluate(x).n < 0)) below = true; });
    if (below) return s;
  }
  return '-3+5-4';
}

GEN['rel-chain'] = (level, rng) => {
  if (level === 1) return stepsItem('rel-chain', level, chain(rng, 3, 9), { mode: 'guided', prompt: 'Calcule.' });
  if (level === 2) return stepsItem('rel-chain', level, chain(rng, 4, 12), { prompt: 'Calcule.' });
  if (level === 3) {
    const a = nz(rng, -12, 15);
    const b = rng.int(1, 9);
    const c = rng.int(1, 9);
    return stepsItem('rel-chain', level, `${a}-(${b}${rng.chance(0.5) ? '+' : '-'}${c})`, { prompt: 'Calcule.' });
  }
  if (level === 4) {
    const [a, b, c, d] = [rng.int(1, 9), rng.int(1, 12), nz(rng, -9, 9), rng.int(1, 9)];
    const expr = rng.pick([`-(${a}-${b})+(${c}-${d})`, `${c}-(${a}-${b})-(${d}+${a})`, `${a}-(${c}+${b})+${d}`]);
    return stepsItem('rel-chain', level, expr, { prompt: 'Calcule.' });
  }
  const expr = chain(rng, 5, 15);
  return answerItem('rel-chain', level, `Calcule de tête : ${mathHtml(expr)}`, evaluate(parse(expr)).toString(), {
    tree: expr, keys: 'rel', signed: true, key: expr, expectedSec: 35,
  });
};

// ---------- Multiplier et diviser ----------

GEN['rel-mul'] = (level, rng) => {
  const pair = (max) => {
    for (let i = 0; i < 50; i++) {
      const a = nz(rng, -max, max);
      const b = nz(rng, -max, max);
      if (a < 0 || b < 0) return [a, b];
    }
    return [-3, 4];
  };
  if (level === 1) {
    const [a, b] = pair(9);
    return stepsItem('rel-mul', level, `${a}×${op(b)}`, { mode: 'guided', prompt: 'Calcule.' });
  }
  if (level === 2) {
    const [a, b] = pair(12);
    const expr = `${a}×${op(b)}`;
    if (rng.chance(0.5)) return computeMcq('rel-mul', level, expr, rng, { signed: true });
    return answerItem('rel-mul', level, `Calcule ${mathHtml(expr)}.`, `${a * b}`, { tree: expr, keys: 'rel', signed: true, key: expr });
  }
  if (level === 3) {
    const [q, r] = pair(9);
    const expr = `${q * r}÷${op(q)}`;
    return answerItem('rel-mul', level, `Calcule ${mathHtml(expr)}.`, `${r}`, { tree: expr, keys: 'rel', signed: true, key: expr });
  }
  if (level === 4) {
    const n = rng.int(3, 5);
    const xs = Array.from({ length: n }, () => nz(rng, -6, 6));
    if (xs.filter((x) => x < 0).length < 2) xs[0] = -Math.abs(xs[0]);
    if (xs.filter((x) => x < 0).length < 2) xs[1] = -Math.abs(xs[1]);
    const expr = xs.map((x, i) => (i ? op(x) : `${x}`)).join('×');
    if (rng.chance(0.5)) {
      const negs = xs.filter((x) => x < 0).length;
      const pos = negs % 2 === 0;
      const opts = [
        { html: 'positif', correct: pos, rule: pos ? null : 'product_sign_count' },
        { html: 'négatif', correct: !pos, rule: pos ? 'product_sign_count' : null },
      ];
      return mcqItem('rel-mul', level, `Sans calculer : quel est le signe de ${mathHtml(expr)} ?`, opts, rng, {
        keepOrder: true,
        solution: [{ math: expr, note: `${negs} facteurs négatifs : un nombre ${pos ? 'pair' : 'impair'}, donc le produit est ${pos ? 'positif' : 'négatif'}.` }],
        key: `sign:${expr}`, expectedSec: 10,
      });
    }
    return stepsItem('rel-mul', level, xs.slice(0, 3).map((x, i) => (i ? op(x) : `${x}`)).join('×'), { prompt: 'Calcule.' });
  }
  const [a, b] = pair(9);
  return answerItem('rel-mul', level, `Complète : ${mathHtml(`${a}`)} × ${BLANK} = ${mathHtml(`${a * b}`)}`, `${b}`, {
    keys: 'rel', signed: true,
    traps: [{ value: [-b, 1], rule: 'mul_sign_dropped' }],
    solution: [{ math: `${a}×${op(b)}`, note: `= ${show(a * b)}` }],
    key: `missing:${a}:${b}`,
  });
};

// ---------- Priorités avec des relatifs ----------

// Every operation gives a small integer, so the work stays mental.
function acceptableInt(expr, max = 100) {
  try {
    const tree = parse(expr);
    let ok = true;
    walk(tree, (n) => {
      if (n.t !== 'bin') return;
      const v = evaluate(n);
      if (!v.isInt() || Math.abs(v.n) > max) ok = false;
    });
    return ok && solve(tree).length <= 10;
  } catch { return false; }
}

// Fills A, B, C... with signed integers, bracketing negatives after an operator.
function fill(pattern, rng, max = 9) {
  return pattern.replace(/[A-E]/g, (_, i) => {
    const x = nz(rng, -max, max);
    const prev = pattern[i - 1];
    return x < 0 && prev !== undefined && prev !== '(' ? `(${x})` : `${x}`;
  });
}

const REL_PATTERNS = {
  1: ['A+B×C', 'A×B+C', 'A-B×C'],
  2: ['(A+B)×C', 'A×(B-C)', '(A-B)×C'],
  3: ['A-B×C', 'A×B+C×D', 'A÷B-C', 'A+B×C-D'],
  4: ['(A-B)×(C+D)', 'A-(B+C)×D', 'A×B-C÷D', '-(A+B)×C'],
  5: ['A×B-C×(D+E)', '(A-B)÷C+D×E', '(A+B×C)×(D-E)', 'A-B×(C-D)'],
};
const modeFor = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');

GEN['rel-multistep'] = (level, rng) => {
  for (let i = 0; i < 300; i++) {
    const expr = fill(rng.pick(REL_PATTERNS[level]), rng);
    if (!/-/.test(expr) || !acceptableInt(expr) || evaluate(parse(expr)).n === 0) continue;
    return stepsItem('rel-multistep', level, expr, { mode: modeFor(level), prompt: 'Calcule.' });
  }
  return stepsItem('rel-multistep', level, '-3+4×(-2)', { mode: modeFor(level), prompt: 'Calcule.' });
};

// ---------- Fractions relatives ----------

function signedFrac(rng, dens, pNeg = 0.5) {
  const d = rng.pick(dens);
  const n = coprimeNum(rng, d, 1, d - 1);
  return rng.chance(pNeg) ? `-${n}/${d}` : `${n}/${d}`;
}

function acceptableFrac(expr) {
  try {
    const tree = parse(expr);
    const v = evaluate(tree);
    if (v.n === 0 || v.d > 60 || Math.abs(v.n) > 120) return false;
    return solve(tree).length <= 10;
  } catch { return false; }
}

const FRAC_PATTERNS = {
  4: ['A+B×C', 'A-B÷C', 'A×B-C'],
  5: ['(A-B)×C', 'A×B-C', 'A-(B+C)', '(A+B)÷C'],
};

GEN['rel-frac'] = (level, rng) => {
  if (level === 1) {
    const d = rng.int(3, 9);
    const a = coprimeNum(rng, d, 1, d - 1);
    const b = coprimeNum(rng, d, 1, d - 1);
    const c = coprimeNum(rng, d, a + 1, 2 * d - 1);
    const expr = rng.chance(0.5) ? `-${a}/${d}+${b}/${d}` : `${a}/${d}-${c}/${d}`;
    return stepsItem('rel-frac', level, expr, { mode: 'guided', irreducible: false });
  }
  if (level === 2) {
    for (let i = 0; i < 50; i++) {
      const [x, y] = [signedFrac(rng, [2, 3, 4, 5, 6], 0), signedFrac(rng, [2, 3, 4, 6, 8], 0)];
      const expr = `${x}-${y}`;
      if (evaluate(parse(expr)).n < 0 && acceptableFrac(expr)) return stepsItem('rel-frac', level, expr);
    }
    return stepsItem('rel-frac', level, '1/3-3/4');
  }
  if (level === 3) {
    for (let i = 0; i < 50; i++) {
      const x = signedFrac(rng, [2, 3, 4, 5, 7], 0.6);
      const y = signedFrac(rng, [2, 3, 4, 5, 6, 9], 0.5);
      const expr = `${x}${rng.chance(0.6) ? '×' : '÷'}${op(y)}`;
      if (acceptableFrac(expr) && /-/.test(expr)) return stepsItem('rel-frac', level, expr);
    }
    return stepsItem('rel-frac', level, '-2/3×9/4');
  }
  for (let i = 0; i < 300; i++) {
    const pattern = rng.pick(FRAC_PATTERNS[level]);
    const expr = pattern.replace(/[A-D]/g, (_, j) => {
      const f = signedFrac(rng, [2, 3, 4, 5, 6], 0.4);
      return f.startsWith('-') && j > 0 && pattern[j - 1] !== '(' ? `(${f})` : f;
    });
    if (!/-/.test(expr) || !acceptableFrac(expr)) continue;
    return stepsItem('rel-frac', level, expr, { mode: level === 4 ? 'tap' : 'free' });
  }
  return stepsItem('rel-frac', level, '-1/2+1/3×3/4', { mode: level === 4 ? 'tap' : 'free' });
};

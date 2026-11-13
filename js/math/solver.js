// Canonical step-by-step solutions: fractions, signed numbers, powers, roots.
// Used for guided blanks, hints, and the worked examples.

import { Q, gcd, lcm } from './rational.js';
import {
  tidy, nextOperationPath, getAt, replaceAt, isLiteral, litParts, lit,
  fracLit, num, evaluate, walk, children, stripParen, text, isRootRule,
} from './expr.js';
import { t, tn } from '../i18n.js';

// A fraction literal as written, negative numerators allowed.
export function fracNode(n, d) {
  if (d === 1) return n < 0 ? { t: 'neg', e: num(-n) } : num(n);
  return n < 0 ? { t: 'neg', e: fracLit(-n, d) } : fracLit(n, d);
}

const SAME_DEN = {
  '+': 'Même dénominateur : on additionne les numérateurs et on garde le dénominateur {d}.',
  '-': 'Même dénominateur : on soustrait les numérateurs et on garde le dénominateur {d}.',
};

const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
// Exponent as superscript characters, for plain-text labels: sup(-2) = "⁻²".
export const sup = (k) => String(k).split('').map((c) => SUP[c] ?? c).join('');
const show = (v) => String(v).replace(/-/g, '−');
const showQ = (v) => show(v.toString()).replace('/', ' / ');
// A number as a student reads it, bracketed if negative: (−3).
const operand = (node) => {
  const s = text(stripParen(node));
  return /^−|\//.test(s) ? `(${s})` : s;
};

// Sign sentence for a product or quotient with negative numbers.
function signNote(A, B, op) {
  const negs = (A.n < 0) + (B.n < 0);
  if (!negs) return '';
  if (op === '×') return ` ${negs === 2 ? t('Deux nombres négatifs : le produit est positif.') : t('Signes contraires : le produit est négatif.')}`;
  return ` ${negs === 2 ? t('Deux nombres négatifs : le quotient est positif.') : t('Signes contraires : le quotient est négatif.')}`;
}

// Label for an addition or subtraction of two integers.
function signedSumLabel(a, b, op, r) {
  if (op === '-') {
    if (a >= 0 && b > a) return t('On recule de {b} à partir de {a} : on passe sous zéro.', { b, a: show(a) });
    if (a < 0) return t('On part de {a} et on recule encore de {b}.', { a: show(a), b });
    return t('On calcule.');
  }
  if (a >= 0 && b >= 0) return t('On calcule.');
  if (a < 0 && b < 0) return t('Deux nombres négatifs : on additionne leurs distances à zéro ({a} + {b} = {s}) et le résultat est négatif.', { a: -a, b: -b, s: -r });
  const big = Math.abs(a) >= Math.abs(b) ? a : b;
  return t('Signes contraires : on fait la différence des distances à zéro ({x} − {y} = {d}), avec le signe du plus éloigné de zéro ({big}).', { x: Math.max(Math.abs(a), Math.abs(b)), y: Math.min(Math.abs(a), Math.abs(b)), d: Math.abs(r), big: show(big) });
}

// Sub-steps for one operation between two literals.
// Returns [{node, label}] where node replaces the operation.
export function operationSteps(opNode) {
  const op = opNode.op;
  const A = litParts(opNode.l);
  const B = litParts(opNode.r);
  const out = [];

  if (A.decimal || B.decimal) {
    const v = evaluate(opNode);
    out.push({ node: v.toDecimal() && v.n >= 0 ? { t: 'num', s: v.toDecimal(), v } : lit(v), label: t('On calcule.') });
    return out;
  }

  // Subtracting a negative number: add its opposite.
  if (op === '-' && B.n < 0) {
    const opp = B.int ? num(-B.n) : fracLit(-B.n, B.d);
    const asAdd = { t: 'bin', op: '+', l: opNode.l, r: opp };
    const b = B.int ? `${B.n}` : `${B.n}/${B.d}`;
    out.push({ node: asAdd, label: t('Soustraire {b}, c\'est ajouter son opposé {o}.', { b: show(b), o: b.slice(1) }) });
    out.push(...operationSteps(asAdd));
    return out;
  }

  if (op === '+' || op === '-') {
    if (A.int && B.int) {
      const r = op === '+' ? A.n + B.n : A.n - B.n;
      out.push({ node: lit(r), label: signedSumLabel(A.n, B.n, op, r) });
      return out;
    }
    let { n: a, d: b } = A;
    let { n: c, d: e } = B;
    if (b !== e) {
      const L = lcm(b, e);
      // An operand already over L is kept as it is (nothing new to write).
      const left = b === L ? opNode.l : fracNode(a * (L / b), L);
      const right = e === L ? opNode.r : fracNode(c * (L / e), L);
      a *= L / b;
      c *= L / e;
      b = e = L;
      out.push({
        node: { t: 'bin', op, l: left, r: right },
        label: t('On écrit les deux nombres avec le même dénominateur : {L}.', { L }),
      });
    }
    out.push({
      node: fracNode(op === '+' ? a + c : a - c, b),
      label: t(SAME_DEN[op], { d: b }),
    });
  } else if (op === '×') {
    const note = signNote(A, B, op);
    if (A.int && B.int) {
      out.push({ node: lit(A.n * B.n), label: note ? note.trim() : t('On calcule.') });
    } else if (A.int || B.int) {
      const k = A.int ? A : B;
      const f = A.int ? B : A;
      out.push({
        node: fracNode(k.n * f.n, f.d),
        label: `${t('On multiplie seulement le numérateur par {k}.', { k: show(k.n) })}${note}`,
      });
    } else {
      out.push({
        node: fracNode(A.n * B.n, A.d * B.d),
        label: `${t('On multiplie les numérateurs entre eux et les dénominateurs entre eux.')}${note}`,
      });
    }
  } else if (op === '÷') {
    if (B.n === 0) throw new RangeError('Division par zéro');
    // A whole quotient takes one step.
    if (A.int && B.int && A.n % B.n === 0) {
      const note = signNote(A, B, op);
      out.push({ node: lit(A.n / B.n), label: note ? note.trim() : t('On calcule.') });
      return out;
    }
    const inv = fracNode(B.d * Math.sign(B.n), Math.abs(B.n));
    const asMul = { t: 'bin', op: '×', l: opNode.l, r: inv };
    out.push({
      node: asMul,
      label: t('Diviser par {b}, c\'est multiplier par son inverse.', { b: show(B.int ? B.n : `${B.n}/${B.d}`) }),
    });
    out.push(...operationSteps(asMul));
  }
  return out;
}

// Powers. opts.expandPowers writes 2³ as 2 × 2 × 2 first.
function powerSteps(node, { expandPowers = false, underMinus = false } = {}) {
  const base = evaluate(node.b);
  const k = evaluate(node.e).n;
  const b = operand(node.b);
  const value = evaluate(node);
  const decimal = litParts(node.b).decimal;
  const result = decimal && value.toDecimal() && value.n >= 0 ? { t: 'num', s: value.toDecimal(), v: value } : lit(value);
  if (k === 0) return [{ node: num(1), label: t('Un nombre (non nul) à la puissance 0 vaut 1.') }];
  if (k === -1) {
    const inv = new Q(1).div(base);
    return [{ node: lit(inv), label: t('L\'exposant −1 donne l\'inverse : {b}⁻¹ = {i}.', { b, i: showQ(inv) }) }];
  }
  if (k < 0 && !base.isInt()) {
    // (2/3)⁻² = (3/2)²: invert the fraction, keep the exponent positive.
    const inv = new Q(1).div(base);
    return [{
      node: { t: 'pow', b: { t: 'paren', e: lit(inv) }, e: num(-k) },
      label: t('Un exposant négatif : on prend l\'inverse et l\'exposant devient positif. {b}{k} = ({i}){p}.', { b, k: sup(k), i: showQ(inv), p: sup(-k) }),
    }];
  }
  if (k < 0) {
    const pos = { t: 'pow', b: node.b, e: num(-k) };
    return [{ node: { t: 'frac', n: num(1), d: pos }, label: t('Un exposant négatif donne l\'inverse : {b}{k} = 1 / {b}{p}.', { b, k: sup(k), p: sup(-k) }) }];
  }
  if (k === 1) return [{ node: result, label: t('Un nombre à la puissance 1 ne change pas.') }];
  if (expandPowers && k <= 5) {
    const factor = node.b.t === 'num' || node.b.t === 'paren' ? node.b : { t: 'paren', e: node.b };
    let prod = factor;
    for (let i = 1; i < k; i++) prod = { t: 'bin', op: '×', l: prod, r: factor };
    return [{ node: prod, label: t('{b}{p}, c\'est {k} facteurs égaux à {b}.', { b, p: sup(k), k }) }];
  }
  let label;
  if (base.eq(10)) label = tn(k, '10{p} = 1 suivi de {n} zéro.', '10{p} = 1 suivi de {n} zéros.', { p: sup(k) });
  else if (k <= 4) label = `${b}${sup(k)} = ${Array(k).fill(b).join(' × ')} = ${decimal && value.toDecimal() ? value.toDecimal() : showQ(value)}.`;
  else label = t('{b}{p} : {k} facteurs égaux à {b}.', { b, p: sup(k), k });
  if (base.n < 0) label += ` ${k % 2 ? t('Nombre impair de facteurs négatifs : le résultat est négatif.') : t('Nombre pair de facteurs négatifs : le résultat est positif.')}`;
  else if (underMinus) label += ` ${t('Le signe − devant n\'est pas élevé à la puissance : l\'exposant ne porte que sur {b}.', { b })}`;
  return [{ node: result, label }];
}

// √a × √b = √(a × b), and (√a)² = a, when a or b is not a perfect square.
function rootRuleSteps(node) {
  if (node.t === 'pow') {
    const inner = text(stripParen(node.b).e);
    return [{ node: lit(evaluate(node)), label: t('Élever une racine carrée au carré redonne le nombre sous la racine : (√{x})² = {x}.', { x: inner }) }];
  }
  const x = stripParen(node.l).e;
  const y = stripParen(node.r).e;
  const op = node.op;
  return [{
    node: { t: 'sqrt', e: { t: 'paren', e: { t: 'bin', op, l: x, r: y } } },
    label: op === '×'
      ? t('Le produit de deux racines carrées est la racine du produit : on regroupe sous une seule racine.')
      : t('Le quotient de deux racines carrées est la racine du quotient : on regroupe sous une seule racine.'),
  }];
}

function rootSteps(node) {
  const v = evaluate(node);
  const r = evaluate(node.e);
  const decimal = litParts(node.e).decimal;
  const result = decimal && v.toDecimal() ? { t: 'num', s: v.toDecimal(), v } : lit(v);
  const vs = decimal ? v.toDecimal() : showQ(v);
  const rs = decimal ? r.toDecimal() : showQ(r);
  const sq = v.isInt() || decimal ? vs : `(${vs})`;
  return [{ node: result, label: t('√{r} = {v} car {sq}² = {rs}, et une racine carrée est positive.', { r: rs.includes(' ') ? `(${rs})` : rs, v: vs, sq, rs }) }];
}

// Steps for anything the solver computes: operations, powers, roots, opposites.
export function computeSteps(node, opts = {}) {
  if (isRootRule(node)) return rootRuleSteps(node);
  if (node.t === 'bin') return operationSteps(node);
  if (node.t === 'pow') return powerSteps(node, opts);
  if (node.t === 'sqrt') return rootSteps(node);
  if (node.t === 'neg') {
    const v = evaluate(node);
    return [{ node: lit(v), label: t('L\'opposé de {a} est {b}.', { a: show(v.neg().toString()), b: show(v.toString()) }) }];
  }
  return [];
}

// Simplification of a literal fraction, or null if already irreducible.
export function simplifyStep(node) {
  if (!isLiteral(node)) return null;
  const p = litParts(node);
  if (!p || p.int || p.decimal) return null;
  const g = gcd(p.n, p.d);
  if (g === 1) return null;
  const v = new Q(p.n, p.d);
  return {
    node: lit(v),
    label: v.isInt()
      ? t('{n} divisé par {d} donne {q}.', { n: Math.abs(p.n), d: p.d, q: Math.abs(v.n) })
      : t('On simplifie par {g} : on divise le numérateur et le dénominateur par {g}.', { g }),
  };
}

// Copies a subtree, flagging its numbers as new in this step.
function markFresh(node) {
  if (node.t === 'num') return { ...node, fresh: true };
  const out = { ...node };
  for (const [k, c] of children(node)) out[k] = markFresh(c);
  return out;
}

// Full canonical solution after the starting line: [{node, label}].
// In each node, numbers produced by that step carry fresh: true.
export function solve(start, { simplify = true, maxLines = 30, expandPowers = false } = {}) {
  let raw = start;
  const lines = [];
  const push = (path, stepNode, label) => {
    lines.push({ node: tidy(replaceAt(raw, path, markFresh(stepNode))), label });
    raw = replaceAt(raw, path, stepNode);
  };

  while (lines.length < maxLines) {
    const path = nextOperationPath(raw);
    if (path) {
      const parent = path.length ? getAt(raw, path.slice(0, -1)) : null;
      const underMinus = parent?.t === 'neg';
      for (const step of computeSteps(getAt(raw, path), { expandPowers, underMinus })) push(path, step.node, step.label);
      const cur = getAt(raw, path);
      const s = simplify && !isLiteral(raw) ? simplifyStep(cur) : null;
      if (s) push(path, s.node, s.label);
      continue;
    }
    if (isLiteral(raw)) {
      const s = simplify ? simplifyStep(raw) : null;
      if (s) push([], s.node, s.label);
      break;
    }
    push([], lit(evaluate(raw)), t('On calcule.'));
  }
  return lines;
}

export function nextStep(node, opts) {
  return solve(node, opts)[0] || null;
}

// Paths of the numbers produced by a solution line.
export function freshPaths(node) {
  const out = [];
  walk(node, (n, p) => { if (n.t === 'num' && n.fresh) out.push(p); });
  return out;
}

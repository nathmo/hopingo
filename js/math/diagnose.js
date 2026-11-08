// Mistake diagnosis by replay: apply each known error rule to the previous
// line and see whether it reproduces the student's value. Because only values
// are compared, it works whatever correct steps the student merged into the
// same line.

import { Q } from './rational.js';
import { OP_RULES } from './malrules.js';
import {
  walk, replaceAt, isLiteral, litParts, lit, evaluate, tryEvaluate, print, parse, sig,
  stripParen,
} from './expr.js';
import { operationSteps } from './solver.js';

const valueParts = (v) => ({ n: v.n, d: v.d, int: v.isInt() });

// The ways a student may have written an operand: as written if it is a
// literal, otherwise its value, reduced or not.
function operandForms(node) {
  if (isLiteral(node)) {
    const p = litParts(node);
    return [p.decimal ? { ...valueParts(evaluate(node)), decimal: true, s: p.s } : p];
  }
  const v = tryEvaluate(node);
  if (!v) return [];
  const forms = [valueParts(v)];
  if (node.t === 'bin' && isLiteral(node.l) && isLiteral(node.r)) {
    try {
      const steps = operationSteps(node);
      const last = steps[steps.length - 1].node;
      if (isLiteral(last)) {
        const p = litParts(last);
        if (p.n !== v.n || p.d !== v.d) forms.push(p);
      }
    } catch { /* not modelled */ }
  }
  return forms;
}

// Same chain of operations, evaluated strictly left to right.
export function leftToRight(node) {
  const inner = (n) => {
    switch (n.t) {
      case 'paren': return { t: 'paren', e: leftToRight(n.e) };
      case 'neg': return { t: 'neg', e: inner(n.e) };
      case 'frac': return { t: 'frac', n: inner(n.n), d: inner(n.d) };
      case 'bin': return leftToRight(n);
      default: return n;
    }
  };
  if (node.t !== 'bin') return inner(node);
  const items = [];
  const flatten = (n) => {
    if (n.t === 'bin') { flatten(n.l); items.push(n.op); flatten(n.r); } else items.push(inner(n));
  };
  flatten(node);
  let acc = items[0];
  for (let i = 1; i < items.length; i += 2) acc = { t: 'bin', op: items[i], l: acc, r: items[i + 1] };
  return acc;
}

// Same expression with grouping parentheses removed. Fraction bars stay, and
// so do brackets that are not about order: around a signed number (−3), a
// power's base, or under a root.
export function withoutParens(node) {
  const strip = (n) => {
    if (n.t === 'paren') {
      if (stripParen(n.e).t === 'neg' && isLiteral(n.e)) return n;
      return strip(n.e);
    }
    if (n.t === 'frac') return n;
    const out = { ...n };
    if (n.t === 'pow') {
      out.b = n.b.t === 'paren' ? { t: 'paren', e: strip(n.b.e) } : strip(n.b);
      out.e = strip(n.e);
      return out;
    }
    if (n.t === 'sqrt') {
      out.e = n.e.t === 'paren' ? { t: 'paren', e: strip(n.e.e) } : strip(n.e);
      return out;
    }
    for (const k of ['l', 'r', 'e']) if (out[k]) out[k] = strip(out[k]);
    return out;
  };
  try { return parse(print(strip(node))); } catch { return null; }
}

// a − (b + c) read as a − b + c is its own well-known mistake.
function hasMinusBeforeParens(node) {
  let found = false;
  walk(node, (n) => {
    if (n.t === 'bin' && n.op === '-' && n.r.t === 'paren' && n.r.e.t === 'bin') found = true;
    if (n.t === 'neg' && n.e.t === 'paren' && n.e.e.t === 'bin') found = true;
  });
  return found;
}

const group = (n) => (n.t === 'num' || n.t === 'paren' ? n : { t: 'paren', e: n });

// Structural misreadings: each returns a function giving, for one node, the
// misread replacement or null.
const STRUCTURAL = {
  // −3² read as (−3)², and (−3)² read as −3².
  neg_power_brackets: (n) => {
    if (n.t === 'neg' && n.e.t === 'pow' && isLiteral(n.e.b) && stripParen(n.e.b).t !== 'neg') {
      return { t: 'pow', b: { t: 'paren', e: { t: 'neg', e: stripParen(n.e.b) } }, e: n.e.e };
    }
    if (n.t === 'pow' && n.b.t === 'paren' && n.b.e.t === 'neg' && isLiteral(n.b.e)) {
      return { t: 'neg', e: { t: 'pow', b: group(n.b.e.e), e: n.e } };
    }
    return null;
  },
  // (a + b)² = a² + b²
  pow_distribute_sum: (n) => {
    if (n.t !== 'pow' || n.b.t !== 'paren' || n.b.e.t !== 'bin' || !'+-'.includes(n.b.e.op)) return null;
    const { op, l, r } = n.b.e;
    return { t: 'paren', e: { t: 'bin', op, l: { t: 'pow', b: group(l), e: n.e }, r: { t: 'pow', b: group(r), e: n.e } } };
  },
  // (a × b)² = a × b²
  pow_forget_coefficient: (n) => {
    if (n.t !== 'pow' || n.b.t !== 'paren' || n.b.e.t !== 'bin' || n.b.e.op !== '×') return null;
    const { l, r } = n.b.e;
    return { t: 'paren', e: { t: 'bin', op: '×', l, r: { t: 'pow', b: group(r), e: n.e } } };
  },
  // a × b² = (a × b)²
  pow_before_product: (n) => {
    if (n.t !== 'bin' || n.r.t !== 'pow' || n.r.b.t !== 'num') return null;
    return { t: 'pow', b: { t: 'paren', e: { ...n, r: n.r.b } }, e: n.r.e };
  },
  // √(a + b) = √a + √b
  sqrt_distribute_sum: (n) => {
    const e = n.t === 'sqrt' ? stripParen(n.e) : null;
    if (!e || e.t !== 'bin' || !'+-'.includes(e.op)) return null;
    return { t: 'paren', e: { t: 'bin', op: e.op, l: { t: 'sqrt', e: group(e.l) }, r: { t: 'sqrt', e: group(e.r) } } };
  },
  // √a + √b = √(a + b)
  sqrt_combine_sum: (n) => {
    if (n.t !== 'bin' || !'+-'.includes(n.op)) return null;
    const l = stripParen(n.l);
    const r = stripParen(n.r);
    if (l.t !== 'sqrt' || r.t !== 'sqrt') return null;
    return { t: 'sqrt', e: { t: 'paren', e: { t: 'bin', op: n.op, l: stripParen(l.e), r: stripParen(r.e) } } };
  },
};

// Misread trees, one per place where a structural rule applies.
function structuralVariants(tree) {
  const out = [];
  for (const [rule, fn] of Object.entries(STRUCTURAL)) {
    walk(tree, (n, path) => {
      const repl = fn(n);
      if (repl) out.push({ tree: replaceAt(tree, path, repl), rules: [rule] });
    });
  }
  return out;
}

// Operation rules that apply at one node: [{rule, A, B, op}].
function nodeRules(n) {
  if (n.t === 'bin') return { op: n.op, Lf: operandForms(n.l), Rf: operandForms(n.r) };
  if (n.t === 'pow' && isLiteral(n.b) && isLiteral(n.e)) return { op: '^', Lf: operandForms(n.b), Rf: [litParts(n.e)] };
  if (n.t === 'sqrt' && isLiteral(n.e)) return { op: '√', Lf: operandForms(n.e), Rf: [null] };
  return null;
}

// Every single-mistake replay of `tree`: cb({value, rules, path, A, B, op, wrong}).
function replays(tree, cb) {
  const correct = tryEvaluate(tree);
  const variants = [{ tree, rules: [] }];
  const add = (t, rules) => {
    if (t && !variants.some((v) => sig(v.tree) === sig(t))) variants.push({ tree: t, rules });
  };
  add(leftToRight(tree), ['priority_left_to_right']);
  add(withoutParens(tree), [hasMinusBeforeParens(tree) ? 'minus_before_parens' : 'ignore_parentheses']);
  for (const v of structuralVariants(tree)) add(v.tree, v.rules);

  // Misread structures first: on a tie, "−3² read as (−3)²" is a better
  // explanation than a slip inside the operation.
  for (const { tree: t, rules } of [...variants.slice(1), variants[0]]) {
    if (rules.length) {
      const v = tryEvaluate(t);
      if (v && correct && !v.eq(correct)) cb({ value: v, rules });
    }
    walk(t, (n, path) => {
      const at = nodeRules(n);
      if (!at) return;
      for (const rule of OP_RULES) {
        if (!rule.op.includes(at.op)) continue;
        for (const A of at.Lf) for (const B of at.Rf) {
          let ws = [];
          try { ws = rule.apply(A, B, at.op); } catch { ws = []; }
          for (const w of ws) {
            if (!w) continue;
            const v = tryEvaluate(replaceAt(t, path, lit(w)));
            if (v && correct && !v.eq(correct)) cb({ value: v, rules: [...rules, rule.id], path, A, B, op: at.op, wrong: w });
          }
        }
      }
    });
  }
}

// The simplest known mistake that turns `prev` into `target`, or null.
// `ambiguous` counts the distinct explanations that fit equally well, so
// evidence from an ambiguous error can be weighted down.
export function diagnose(prev, target) {
  const t = Q.of(target);
  let best = null;
  const fits = new Set();
  replays(prev, (c) => {
    if (!c.value.eq(t)) return;
    if (!best || c.rules.length < best.rules.length) {
      best = c;
      fits.clear();
    }
    if (c.rules.length === best.rules.length) fits.add(c.rules.join('+'));
  });
  return best && { ...best, ambiguous: fits.size };
}

// Distinct wrong final values produced by known mistakes, simplest first.
// Used for multiple-choice distractors and to know which traps an item baits.
export function wrongAnswers(tree) {
  const seen = new Map();
  replays(tree, (c) => {
    const key = c.value.toString();
    const prev = seen.get(key);
    if (!prev || c.rules.length < prev.rules.length) seen.set(key, { value: c.value, rules: c.rules });
  });
  return [...seen.values()].sort((a, b) => a.rules.length - b.rules.length);
}

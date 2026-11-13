// Building blocks shared by the question generators of every unit.
//
// An item is plain data:
//   {skill, level, type, prompt, ...type fields, baits, solution, expectedSec, key}
// Types:
//   steps       {expr, mode: guided|tap|free, requireIrreducible, signed, keys, tapKeys, solveOpts}
//   answer      {expected, form, tree, traps: [{value, rule}], keys, suffix}
//   mcq         {options: [{html, correct, rule}]}
//   shade       {figure, target: {count}}
//   numberline  {line: {min, max, den}, target}
//   match       {pairs: [[leftHtml, rightHtml]]}
// `baits` lists the traps (mistake rules) the item can catch, so the engine
// can use it to check whether a trap is beaten.

import { Q, gcd } from '../math/rational.js';
import { parse, evaluate, print, renderText, render, walk } from '../math/expr.js';
import { solve } from '../math/solver.js';
import { wrongAnswers } from '../math/diagnose.js';
import { F } from '../math/malrules.js';
import { t } from '../i18n.js';

export const mathHtml = (s) => `<span class="m">${renderText(s)}</span>`;
export const Fh = (n, d) => `<span class="m">${F(n, d)}</span>`;
export const BLANK = '<span class="m-q">?</span>';
export const valStr = (n, d) => new Q(n, d).toString();

// A power written with a blank or a letter: powHtml('2', '?') → 2 with a "?" exponent.
export const powHtml = (base, exp) => {
  const e = exp === '?' ? BLANK : `<span class="m-num">${String(exp).replace('-', '−')}</span>`;
  const b = /^[a-z]$/.test(base) ? `<i class="m-var">${base}</i>` : renderText(String(base));
  return `<span class="m">${b}<sup class="m-sup">${e}</sup></span>`;
};

export const solutionOf = (expr, opts) => solve(parse(expr), opts).map((l) => ({ math: print(l.node), note: l.label }));

// True if any number in the expression is negative.
const hasMinus = (tree) => {
  let found = false;
  walk(tree, (n) => { if (n.t === 'neg') found = true; });
  return found || evaluate(tree).n < 0;
};
const hasPowerOrRoot = (tree) => {
  let found = false;
  walk(tree, (n) => { if (n.t === 'pow' || n.t === 'sqrt') found = true; });
  return found;
};

export function stepsItem(skill, level, expr, { mode = 'free', irreducible = true, prompt, solveOpts } = {}) {
  const tree = parse(expr);
  const solution = solve(tree, solveOpts);
  const signed = hasMinus(tree) || solution.some((l) => hasMinus(l.node));
  return {
    skill, level, type: 'steps',
    prompt: prompt ?? (irreducible ? t('Calcule et donne le résultat sous forme irréductible.') : t('Calcule.')),
    expr, mode, requireIrreducible: irreducible,
    signed,
    keys: hasPowerOrRoot(tree) ? 'opsx' : 'ops',
    tapKeys: signed ? 'relfrac' : 'frac',
    solveOpts: solveOpts || null,
    answer: evaluate(tree).toString(),
    baits: [...new Set(wrongAnswers(tree).flatMap((w) => w.rules))],
    solution: solution.map((l) => ({ math: print(l.node), note: l.label })),
    expectedSec: 10 + 12 * solution.length,
    key: `${skill}:${expr}`,
  };
}

// opts.signed allows negative (and zero) trap values, for signed-number units.
export function answerItem(skill, level, prompt, expected, opts = {}) {
  const expectedValue = evaluate(parse(String(expected)));
  // Keep traps that are real wrong answers: valid and not the right value.
  const traps = (opts.traps || []).filter(({ value: [n, d], rule }) => rule && d > 0 && (opts.signed || n > 0) && !new Q(n, d).eq(expectedValue));
  const tree = opts.tree ? parse(opts.tree) : null;
  const baits = new Set(traps.map((t) => t.rule));
  if (tree) for (const w of wrongAnswers(tree)) w.rules.forEach((r) => baits.add(r));
  return {
    skill, level, type: 'answer', prompt,
    expected: String(expected),
    form: opts.form || 'any',
    exact: opts.exact || null,
    tree: opts.tree || null,
    // The question's expression: the steps before the answer keep its value.
    ...(opts.tree ? { start: { math: String(opts.tree) } } : {}),
    traps: traps.map((t) => ({ value: valStr(...t.value), rule: t.rule })),
    keys: opts.keys || 'frac',
    suffix: opts.suffix || '',
    figure: opts.figure || null,
    baits: [...baits],
    solution: opts.solution || (opts.tree ? solutionOf(opts.tree) : []),
    expectedSec: opts.expectedSec || 20,
    key: `${skill}:${opts.key || prompt}`,
  };
}

export function mcqItem(skill, level, prompt, options, rng, opts = {}) {
  const shuffled = opts.keepOrder ? options : rng.shuffle(options);
  return {
    skill, level, type: 'mcq', prompt,
    options: shuffled,
    figure: opts.figure || null,
    baits: [...new Set(options.filter((o) => o.rule).map((o) => o.rule))],
    solution: opts.solution || [],
    expectedSec: opts.expectedSec || 12,
    key: `${skill}:${opts.key || prompt}`,
    big: !!opts.big,
  };
}

// Multiple choice on a computation: distractors are the results of known mistakes.
// opts.signed allows negative distractors.
export function computeMcq(skill, level, expr, rng, opts = {}) {
  const tree = parse(expr);
  const right = evaluate(tree);
  const seen = new Set([right.toString()]);
  const options = [{ html: mathHtml(right.toString()), correct: true }];
  const add = (v, rule = null) => {
    const s = v.toString();
    if (seen.has(s) || options.length >= 4) return;
    seen.add(s);
    options.push({ html: mathHtml(s), correct: false, rule });
  };
  const size = (v) => Math.abs(v.n / v.d);
  for (const w of wrongAnswers(tree)) {
    if (!opts.signed && w.value.n <= 0) continue;
    // 20736 for √144 would give the answer away.
    if (size(w.value) > Math.max(100, 10 * size(right)) || w.value.d > 100) continue;
    add(w.value, w.rules[0]);
  }
  if (opts.signed && right.n !== 0) add(right.neg());
  for (let k = 1; options.length < 4 && k < 10; k++) add(new Q(right.n + k, right.d));
  return mcqItem(skill, level, opts.prompt || t('Combien vaut {e} ?', { e: mathHtml(expr) }), options, rng, {
    solution: solutionOf(expr, opts.solveOpts), expectedSec: 15, key: expr,
  });
}

// A numerator in [lo, hi] with no common factor with d, so the fraction
// is already irreducible (textbooks rarely give 6/8 as an operand).
export function coprimeNum(rng, d, lo, hi) {
  const options = [];
  for (let n = lo; n <= hi; n++) if (gcd(n, d) === 1 && n % d !== 0) options.push(n);
  return options.length ? rng.pick(options) : lo;
}

export function coprimeFraction(rng, dens, { improper = false } = {}) {
  for (let i = 0; i < 50; i++) {
    const d = rng.pick(dens);
    const n = rng.int(1, improper ? 2 * d : d - 1);
    if (gcd(n, d) === 1 && n !== d) return [n, d];
  }
  return [1, 2];
}

// Comparison symbols for multiple choice.
export const SYM = (s) => (s < 0 ? '<' : s > 0 ? '>' : '=');
export const SHOW_SYM = { '<': '&lt;', '=': '=', '>': '&gt;' };

// Ordering numbers by value, with options for each wrong reading:
// preds = [[ruleId, symbol the student following that rule would pick]].
export function symbolOptions(right, preds) {
  return ['<', '=', '>'].map((s) => ({
    html: `<span class="sym">${SHOW_SYM[s]}</span>`, value: s, correct: s === right,
    rule: s === right ? null : (preds.find(([, p]) => p === s)?.[0] ?? null),
  }));
}

// Checks a simple expression string gives a whole, small result: used to
// filter random patterns.
export function intResult(expr, max = 200) {
  try {
    const v = evaluate(parse(expr));
    return v.isInt() && Math.abs(v.n) <= max ? v : null;
  } catch { return null; }
}

// Renders an expression string as HTML (re-export for generators).
export const html = (expr) => `<span class="m">${render(parse(expr))}</span>`;

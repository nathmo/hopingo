// Generators of module G6 (unit `analyse0`), spec §8.3. Catalogue:
// docs/universite/G-gymnase-2.md. For now: the pilot g6-deriv-rules.
//
// Levels: 1 guided (rule line with u′ and v′ left blank), 2 guided with a
// decision and wider blanks, 3 « choose the action, then write the line »,
// 4 free lines with hints, 5 alone: derive, then compute f′(a).
// opts.exam = 'mcq' | 'tf' | 'coef' | 'open' gives the exam variants.

import { parse } from '../../cas/parse.js';
import { toText, toReadable } from '../../cas/print.js';
import { toMathML } from '../../cas/mathml.js';
import { walk, getAt, replaceAt, mapNode, lit, deriv, stripParen, numValue, rebuild } from '../../cas/ast.js';
import { diff, stepDeriv, expandDerivs, hasDeriv, ruleOf, innerOf } from '../../cas/diff.js';
import { pretty, exactValue } from '../../cas/normal.js';
import { equivalent, seedOf } from '../../cas/equiv.js';
import { blankLine, templateOf } from '../../judges/lines.js';
import { trapAnswers } from '../../judges/diagnose.js';
import { isFinal } from '../../judges/equiv.js';
import { mcqItem } from '../items.js';
import { t } from '../../i18n.js';

const SKILL = 'g6-deriv-rules';
const V = 'x';
const MM = (node, display = false) => toMathML(node, { display: display ? 'block' : 'inline' });
const MT = (text, display) => MM(parse(text), display);

// ---------- the functions to differentiate ----------

const paren = (s) => (/[+-]/.test(s.slice(1)) ? `(${s})` : s);
const coef = (k) => (k === 1 ? '' : k === -1 ? '-' : String(k));
const lin = (k) => `${coef(k)}x`;

const P_FACTORS = [
  () => 'x', () => 'x^2', () => 'x^3', (r) => `${r.pick([2, 3, 4])}x`, (r) => `x^2+${r.int(1, 4)}`,
  (r) => `x^2-${r.int(1, 4)}`, (r) => `${r.int(2, 4)}x+${r.int(1, 5)}`, (r) => `x-${r.int(1, 4)}`,
];
const LIN_OUTER = [
  (k) => `sin(${lin(k)})`, (k) => `cos(${lin(k)})`, (k) => `e^(${lin(k)})`,
];
const NL_INNER = (r) => r.pick([`x^2+${r.int(1, 4)}`, 'x^2', `${r.int(2, 3)}x^2+${r.int(1, 3)}`]);
const NL_OUTER = [
  (r) => `sin(${NL_INNER(r)})`, (r) => `cos(${NL_INNER(r)})`, (r) => `e^(x^2)`,
  (r) => `ln(x^2+${r.int(1, 4)})`, (r) => `√(x^2+${r.int(1, 5)})`, (r) => `(x^2+${r.int(1, 3)})^${r.int(2, 4)}`,
];

const TEMPLATES = {
  // One rule plus a linear chain (levels 1-2).
  prodLin: (r) => `${paren(r.pick(P_FACTORS)(r))}×${r.pick(LIN_OUTER)(r.pick([2, 3, 4, 5]))}`,
  quot: (r) => (r.chance(0.7)
    ? `(${coef(r.int(1, 4))}x${r.pick(['+', '-'])}${r.int(1, 5)})/(x^2+${r.int(1, 4)})`
    : `x^2/(x+${r.int(3, 5)})`),
  chainLin: (r) => (r.chance(0.6)
    ? `(${coef(r.int(2, 3))}x+${r.int(1, 5)})^${r.int(3, 5)}`
    : r.pick([`√(${r.int(2, 4)}x+${r.int(1, 5)})`, `e^(${lin(r.pick([2, 3, -1]))}+${r.int(1, 3)})`, `sin(${lin(r.int(2, 5))}+${r.int(1, 3)})`])),
  // Two rules nested (levels 3-5).
  prodNL: (r) => `${paren(r.pick(['x', 'x^2', '2x', 'x+1']))}×${r.pick(NL_OUTER)(r)}`,
  chainNL: (r) => r.pick(NL_OUTER)(r),
  quotChain: (r) => `${r.pick([`e^(${lin(r.int(2, 3))})`, `sin(${lin(r.int(2, 3))})`])}/(x^2+${r.int(1, 4)})`,
  twoChains: (r) => `e^(${lin(r.int(2, 3))})×${r.pick(['sin', 'cos'])}(${lin(r.int(2, 3))})`,
};
const BY_LEVEL = {
  1: ['prodLin', 'prodLin', 'quot', 'chainLin'],
  2: ['prodLin', 'quot', 'chainLin'],
  3: ['prodNL', 'quotChain', 'twoChains', 'chainNL', 'prodLin', 'quot'],
  4: ['prodNL', 'quotChain', 'twoChains', 'chainNL', 'quot'],
  5: ['prodNL', 'quotChain', 'twoChains', 'quot'],
};
const FALLBACK = 'x^2×sin(3x)';

// ---------- the reference solution ----------

const NOTES = {
  product: 'Règle du produit', quotient: 'Règle du quotient', chain: 'Règle de chaîne', table: 'Dérivées usuelles',
};
const SUBGOAL_OF = (rules) => (rules.has('product') ? 'product' : rules.has('quotient') ? 'quotient' : rules.has('chain') ? 'chain' : 'table');
const SUBGOALS = [
  { id: 'product', label: t('règle du produit'), skill: SKILL },
  { id: 'quotient', label: t('règle du quotient'), skill: SKILL },
  { id: 'chain', label: t('règle de chaîne'), skill: SKILL },
  { id: 'table', label: t('dérivées usuelles'), skill: 'g6-deriv-usual' },
  { id: 'simplify', label: t('simplifier'), skill: 'lit-monomial' },
  { id: 'evaluate', label: t('évaluer f′(a)'), skill: SKILL },
];

// The note is built in French, then looked up whole (every combination is
// in the dictionary js/i18n/en/uni-17.js).
const noteOf = (rules) => t(noteFr(rules));
function noteFr(rules) {
  const named = ['product', 'quotient', 'chain'].filter((r) => rules.has(r)).map((r) => NOTES[r]);
  const table = [...rules].some((r) => ['table', 'poly', 'var', 'sum', 'constfactor', 'linear'].includes(r));
  if (!named.length) return table ? NOTES.table : 'Calcul';
  const text = named.map((n, i) => (i ? n.toLowerCase() : n)).join(' et ');
  return table ? `${text}, avec les dérivées usuelles` : text;
}

// Applies one rule to every d(…) of a line.
function stepAll(node) {
  const paths = [];
  walk(node, (n, p) => { if (n.t === 'deriv') { paths.push(p); return false; } return true; });
  let out = node;
  const rules = new Set();
  for (const p of paths) {
    const st = stepDeriv(getAt(node, p).e, V);
    rules.add(st.rule);
    out = replaceAt(out, p, st.node);
  }
  return { node: rebuild(out), rules };
}

// Lines of the solution: [{node, note, subgoal, rules}], the last one final.
function derivation(f) {
  const out = [];
  let cur = deriv(f, V);
  for (let guard = 0; guard < 8; guard++) {
    const { node, rules } = stepAll(cur);
    if (!hasDeriv(node)) {
      const fin = pretty(node);
      const note = [...rules].some((r) => ['product', 'quotient', 'chain'].includes(r)) ? t(`${noteFr(rules)}, simplifier`) : t('Simplifier');
      out.push({ node: fin, note, subgoal: 'simplify', rules });
      return out;
    }
    out.push({ node, note: noteOf(rules), subgoal: SUBGOAL_OF(rules), rules });
    cur = node;
  }
  throw new Error('derivation too long');
}

// Number of terms of the final answer (the numerator for a quotient).
function termCount(node) {
  node = stripParen(node);
  if (node.t === 'neg') node = stripParen(node.e);
  if (node.t === 'frac') return termCount(node.n);
  if (node.t === 'bin' && (node.op === '+' || node.op === '-')) return termCount(node.l) + termCount(node.r);
  return 1;
}

// ---------- guided lines ----------

// 1·u → u and u + 0 → u, moving nothing else, so the holes stay in place.
const dropTrivial = (node) => mapNode(node, (n) => {
  if (n.t !== 'bin') return n;
  const l = numValue(n.l);
  const r = numValue(n.r);
  if (n.op === '×') {
    if (l?.n === 0 || r?.n === 0) return lit(0);
    if (l?.eq(1)) return n.r;
    if (r?.eq(1)) return n.l;
  }
  if ((n.op === '+' || n.op === '-') && r?.n === 0) return n.l;
  if (n.op === '+' && l?.n === 0) return n.r;
  return n;
});

// The rule line with the inner derivatives written out; holes: what the
// student fills. wide: whole terms instead of u′ and v′ (level 2).
function filledRuleLine(f, wide) {
  const st = stepDeriv(f, V);
  const holes = [];
  const filled = dropTrivial(mapNode(st.node, (n) => {
    if (n.t !== 'deriv') return n;
    const d = pretty(diff(n.e, n.v));
    holes.push(d);
    return d;
  }));
  // Level 1 shows f′(g) and asks for g′; level 2 asks for both.
  if (wide && st.rule === 'chain' && filled.t === 'bin' && filled.op === '×') holes.unshift(filled.l);
  if (wide) {
    const top = stripParen(st.rule === 'quotient' ? filled.n : filled);
    if (top.t === 'bin' && (top.op === '+' || top.op === '-')) return { node: filled, holes: [top.l, top.r], rule: st.rule };
  }
  // A filled number can be folded into its factor by the constructors:
  // keep only the holes still present in the line.
  const present = new Set();
  walk(filled, (n) => { present.add(n); });
  return { node: filled, holes: holes.filter((h) => present.has(h)), rule: st.rule };
}

// Holes of the final line: the coefficients in front of the terms.
function finalHoles(node) {
  const holes = [];
  walk(node, (n) => {
    if (n.t === 'bin' && n.op === '×' && n.l.t === 'num' && !holes.includes(n.l)) { holes.push(n.l); return false; }
    return true;
  });
  if (holes.length) return holes.slice(0, 3);
  const top = stripParen(node.t === 'frac' ? node.n : node);
  return top.t === 'bin' ? [top.r] : [node];
}

// ---------- items ----------

function judgeCfg(f, key) {
  const text = toText(f);
  const positive = /ln|√|root/.test(text);
  return {
    kind: 'equiv', vars: [V], dvar: V, target: 'no-prime',
    domain: { [V]: positive ? [0.2, 2.5] : [-2.5, 2.5] }, seed: seedOf(key),
  };
}

function ruleHint(f, rule) {
  const e = stripParen(f);
  const MM = (n) => toMathML(stripParen(n));
  if (rule === 'product') return t('C\'est un produit : (uv)′ = u′v + uv′, avec u = {u} et v = {v}.', { u: MM(e.l), v: MM(e.r) });
  if (rule === 'quotient') {
    const [u, w] = e.t === 'frac' ? [e.n, e.d] : [e.l, e.r];
    return t('C\'est un quotient : (u/v)′ = (u′v − uv′)/v², avec u = {u} et v = {v}.', { u: MM(u), v: MM(w) });
  }
  return t('C\'est une composée f(g(x)) avec g(x) = {g} : (f∘g)′ = f′(g)·g′.', { g: MM(innerOf(e)) });
}

function solutionOf(start, lines) {
  return [
    { html: MM(start), note: t('Départ') },
    ...lines.map((l) => ({ html: `<span class="eq">=</span> ${MM(l.node)}`, note: l.note })),
  ];
}

const PROMPTS = [
  (f) => t('Dérive f(x) = {f}.', { f: MM(f) }),
  (f) => t('Calcule f′(x) pour f(x) = {f}.', { f: MM(f) }),
];

// The value a where f′(a) is a nice exact number, or null.
function niceValue(dfinal, rng) {
  for (const a of rng.shuffle([0, 1, -1, 2])) {
    const at = mapNode(dfinal, (n) => (n.t === 'sym' && n.name === V ? lit(a) : n));
    const q = exactValue(at);
    if (q && Math.abs(q.n) <= 200 && q.d <= 20) return { a, at, q };
  }
  return null;
}

function draw(level, rng) {
  for (let i = 0; i < 200; i++) {
    const text = TEMPLATES[rng.pick(BY_LEVEL[level])](rng);
    const f = parse(text);
    const lines = derivation(f);
    const fin = lines[lines.length - 1].node;
    if (termCount(fin) > 6) continue;
    if (isFinal({ target: 'no-prime' }, fin) !== true) continue;
    return { f, lines };
  }
  const f = parse(FALLBACK);
  return { f, lines: derivation(f), fallback: true };
}

export function derivItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return mcqVariant(rng);
  if (opts.exam === 'tf') return tfVariant(rng);
  // Level 5 and the coef variant need a point a where f′(a) is exact.
  const wantValue = level === 5 || opts.exam === 'coef';
  let drawn = draw(opts.exam ? 4 : level, rng);
  let nice = wantValue ? niceValue(drawn.lines[drawn.lines.length - 1].node, rng) : null;
  for (let i = 0; wantValue && !nice && i < 50; i++) {
    drawn = draw(opts.exam ? 4 : level, rng);
    nice = niceValue(drawn.lines[drawn.lines.length - 1].node, rng);
  }
  const { f, lines, fallback } = drawn;
  const startNode = deriv(f, V);
  const key = `${SKILL}:${toText(f)}`;
  const judge = judgeCfg(f, key);
  const final = lines[lines.length - 1].node;
  const topRule = ruleOf(f, V);
  const ruleLine = filledRuleLine(f, false);
  const blanked = blankLine(ruleLine.node, ruleLine.holes);
  const hints = [
    { level: 1, html: ruleHint(f, topRule) },
    { level: 2, html: `= ${templateMath(blanked)}` },
    { level: 3, html: `= ${MM(final)}` },
  ];
  const ruleOptions = [
    { id: 'product', label: t('Règle du produit'), valid: topRule === 'product', why: t('Ce n\'est pas un produit de deux fonctions de x.') },
    { id: 'quotient', label: t('Règle du quotient'), valid: topRule === 'quotient', why: t('Il n\'y a pas de x au dénominateur.') },
    { id: 'chain', label: t('Règle de chaîne'), valid: topRule === 'chain', why: topRule === 'chain' ? '' : t('Regarde l\'opération la plus extérieure : c\'est elle qui décide de la première règle.') },
  ];
  let mode = 'free';
  let script = lines.map((l) => ({ kind: 'eq', math: toText(l.node), subgoal: l.subgoal, note: l.note }));
  if (level === 1 || level === 2) {
    mode = 'guided';
    const rl = level === 1 ? { ...ruleLine, ...blanked } : (() => { const w = filledRuleLine(f, true); return blankLine(w.node, w.holes); })();
    const firstNode = parse(rl.math);
    const firstFinal = isFinal(judge, firstNode) === true;
    const guidedFinal = level === 1 ? blankLine(final, finalHoles(final)) : { math: toText(final), blanks: [] };
    script = [
      level === 1
        ? { kind: 'note', html: ruleHint(f, topRule) }
        : { kind: 'decision', prompt: t('Quelle règle d\'abord ?'), options: ruleOptions },
      { kind: 'eq', math: rl.math, blanks: rl.blanks, subgoal: topRule === 'quotient' ? 'quotient' : topRule === 'product' ? 'product' : 'chain', note: noteOf(new Set([topRule, 'table'])) },
      ...(firstFinal ? [] : [{ kind: 'eq', math: guidedFinal.math, blanks: guidedFinal.blanks, subgoal: 'simplify', note: t('Simplifier') }]),
    ];
  } else if (level === 3) {
    mode = 'tap';
  } else if (level === 4 && !opts.exam) {
    script.splice(1, 0, {
      kind: 'rule', ask: t('Quelle règle as-tu utilisée en premier ?'), correct: topRule,
      options: [
        { id: 'product', label: '(uv)′ = u′v + uv′' }, { id: 'quotient', label: '(u/v)′ = (u′v − uv′)/v²' },
        { id: 'chain', label: '(f∘g)′ = f′(g)·g′' }, { id: 'sum', label: '(u + v)′ = u′ + v′' },
      ],
    });
  }
  let prompt = rng.pick(PROMPTS)(f);
  let finalCfg = { form: 'no-prime' };
  // Level 5 and the coef variant: derive, then f′(a).
  if (wantValue) {
    if (nice) {
      const label = `f′(${String(nice.a).replace('-', '−')})`;
      script.push({ kind: 'segment', html: t('Calcule maintenant {label}.', { label }), ask: `${label} =`, start: { math: toText(nice.at) }, judge: { kind: 'value', form: 'irreducible' } });
      script.push({ kind: 'eq', math: nice.q.toString(), subgoal: 'evaluate', note: `${label} = ${toReadable(lit(nice.q))}` });
      prompt = t('Soit f(x) = {f}. Dérive f, puis calcule {label}.', { f: MM(f), label });
      if (opts.exam === 'coef') finalCfg = { form: 'no-prime', askCoef: { label } };
    }
  }
  const used = new Set(script.filter((l) => l.subgoal).map((l) => l.subgoal));
  const baits = [...new Set(trapAnswers('equiv', startNode, judge).map((tr) => tr.rule))];
  const item = {
    skill: SKILL, level, type: 'lines', prompt,
    start: { math: toText(startNode) },
    judge,
    declares: { vars: [V], dvar: V },
    mode, script,
    final: finalCfg,
    followError: !opts.exam && (level === 3 || level === 4),
    hints: level >= 5 || opts.exam ? [] : hints,
    noHints: level >= 5 || !!opts.exam,
    subgoals: SUBGOALS.filter((s) => used.has(s.id)),
    tapActions: 'deriv',
    keys: ['calcx', 'calcfn'],
    baits,
    solution: solutionOf(startNode, lines),
    answerHtml: MM(final),
    expectedSec: 30 + 30 * script.filter((l) => l.kind === 'eq').length,
    key,
    exam: opts.exam ? { format: opts.exam, points: opts.exam === 'open' ? 3 : 1 } : false,
    fallback: !!fallback,
  };
  return item;
}

// The guided template of a line, with boxes for the blanks.
const templateMath = (line) => MM(parse(line.blanks.length ? templateOf(line) : line.math));

// ---------- exam variants ----------

function mcqVariant(rng) {
  const { f, lines } = draw(rng.pick([2, 3, 4]), rng);
  const startNode = deriv(f, V);
  const key = `${SKILL}:mcq:${toText(f)}`;
  const judge = judgeCfg(f, key);
  const right = lines[lines.length - 1].node;
  const opts = { vars: [V], domain: judge.domain, seed: judge.seed };
  const options = [{ node: right, correct: true, rule: null }];
  const isNew = (n) => options.every((o) => !equivalent(o.node, n, opts).equal);
  for (const tr of rng.shuffle(trapAnswers('equiv', startNode, judge, (n) => pretty(expandDerivs(n))))) {
    if (options.length < 4 && isNew(tr.node)) options.push({ node: tr.node, correct: false, rule: tr.rule });
  }
  // Without enough traps: the sign of one term, or the inner derivative forgotten twice.
  // Without enough traps: the sign of the answer, a minus in the product
  // rule, and the inner derivative times f itself (g′·f(g)).
  const top = stripParen(f);
  const extra = [
    pretty({ t: 'neg', e: right }),
    pretty(diff(f, V, { chain: (outer) => outer, product: (u, w, du, dw) => ({ t: 'bin', op: '-', l: { t: 'bin', op: '×', l: du, r: w }, r: { t: 'bin', op: '×', l: u, r: dw } }) })),
    ...(ruleOf(f, V) === 'chain' ? [pretty({ t: 'bin', op: '×', l: diff(innerOf(top), V), r: top })] : []),
  ];
  for (const n of extra) if (options.length < 4 && isNew(n)) options.push({ node: n, correct: false, rule: null });
  const html = (n) => MM(n);
  return {
    ...mcqItem(SKILL, 4, t('Quelle est la dérivée de f(x) = {f} ?', { f: MM(f) }), options.map((o) => ({ html: html(o.node), correct: o.correct, rule: o.rule })), rng, {
      key, solution: solutionOf(startNode, lines), expectedSec: 45,
    }),
    exam: { format: 'mcq', points: 1 },
  };
}

function tfVariant(rng) {
  const kind = rng.pick(['general', 'trap', 'true', 'trap']);
  if (kind === 'general') {
    return {
      ...mcqItem(SKILL, 4, t('Vrai ou faux ? <br>« Si f et g sont dérivables, alors (f/g)′ = f′/g′. »'), [
        { html: t('Vrai'), correct: false, rule: 'g6_quotient_sign' }, { html: t('Faux'), correct: true },
      ], rng, {
        keepOrder: true, key: `${SKILL}:tf:quotient`, expectedSec: 20,
        solution: [{ html: t('Faux. Contre-exemple : f(x) = x, g(x) = x², en x = 1. Alors f/g = 1/x et {d} = −1/x² vaut −1, mais f′/g′ = 1/(2x) vaut 1/2.', { d: MT('d(1/x)') }), note: '' }],
      }),
      exam: { format: 'tf', points: 1 },
    };
  }
  const { f, lines } = draw(rng.pick([2, 3]), rng);
  const startNode = deriv(f, V);
  const right = lines[lines.length - 1].node;
  const judge = judgeCfg(f, `${SKILL}:tf:${toText(f)}`);
  let claim = right;
  let rule = null;
  if (kind === 'trap') {
    const opts = { vars: [V], domain: judge.domain, seed: judge.seed };
    const wrong = trapAnswers('equiv', startNode, judge, (n) => pretty(expandDerivs(n))).find((tm) => !equivalent(tm.node, right, opts).equal);
    if (wrong) { claim = wrong.node; rule = wrong.rule; }
  }
  const truth = claim === right;
  return {
    ...mcqItem(SKILL, 4, t('Vrai ou faux ?<br>{e}', { e: MM({ t: 'rel', op: '=', l: startNode, r: claim }, true) }), [
      { html: t('Vrai'), correct: truth, rule: truth ? null : rule }, { html: t('Faux'), correct: !truth },
    ], rng, {
      keepOrder: true, key: `${SKILL}:tf:${toText(f)}:${truth}`, expectedSec: 30,
      solution: solutionOf(startNode, lines),
    }),
    exam: { format: 'tf', points: 1 },
  };
}

export const GEN = {
  [SKILL]: (level, rng, profile, opts = {}) => derivItem(level, rng, profile, opts),
};


// Generators of module G1 (unit `fonctions-g`), first half: domain,
// composition, inverse, injectivity, surjectivity, parity and period, sign
// of the trinomial, sign table. Spec §8.3. Catalogue:
// docs/universite/G-gymnase-1.md, G1.
//
// Levels: 1–2 guided (lines with boxes), 3 choose the action then write the
// line (a menu for each reference line, `tapActions: 'steps'`), 4 free
// lines with hints, 5 alone. Proofs (injective, surjective) follow the
// catalogue's scale for skills without calculation lines: a missing block,
// blocks with decoys, a decision, then the frame with typed calculations.
// Domains are judged by `solset` with `exprDomain` (an expression stands
// for the set where it is defined); compositions by `equiv` with the item's
// functions (`defs`); inverses by `solset` with the parameter y; sign
// tables by the table judge `signs`. Every generator starts from the
// answer (§8.4 « beaux nombres »). opts.exam = 'mcq' | 'tf' | 'open'.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText, toReadable } from '../../cas/print.js';
import { walk, lit, unparen, getAt, replaceAt, mapNode } from '../../cas/ast.js';
import { solutionSet, setToNode, domainOf, setEqual, union } from '../../cas/sets.js';
import { exactValue } from '../../cas/normal.js';
import { evalFloat } from '../../cas/numeric.js';
import { expandFns } from '../../cas/sets.js';
import { blankLine } from '../../judges/lines.js';
import { t } from '../../i18n.js';
import {
  MT, fr, linesItem, mcq, tfItem, blocksItem, tableItem,
} from './kit.js';

const V = 'x';
const q = (n, d = 1) => new Q(n, d);
const N = (x) => toText(lit(Q.of(x)));
const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
const E = (math, note, subgoal, act) => ({ kind: 'eq', math, note, subgoal, act });
const examOf = (opts, points = 1) => (opts?.exam ? { format: opts.exam, points } : false);
const uniq = (opts) => opts.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);
const KEYS = ['calc', 'relation', 'set'];
// x − r written out: x − 3, x + 1/2, x.
const lin = (r) => { const R = Q.of(r); return R.n === 0 ? 'x' : R.n < 0 ? `x+${N(R.neg())}` : `x-${N(R)}`; };
// px + c as text: 2x − 3, −x + 4, x.
function affine(p, c) {
  const P = Q.of(p);
  const C = Q.of(c);
  if (P.n === 0) return N(C);
  const head = P.eq(1) ? 'x' : P.eq(-1) ? '-x' : `${N(P)}x`;
  if (C.n === 0) return head;
  return C.n < 0 ? `${head}-${N(C.neg())}` : `${head}+${N(C)}`;
}
// A polynomial from its coefficients (highest first) as text.
function polyText(cs) {
  const d = cs.length - 1;
  let out = '';
  cs.forEach((c0, i) => {
    const c = Q.of(c0);
    const k = d - i;
    if (c.n === 0) return;
    const mono = k === 0 ? '' : k === 1 ? 'x' : `x^${k}`;
    const abs = c.n < 0 ? c.neg() : c;
    const coef = k > 0 && abs.eq(1) ? '' : N(abs);
    const sign = c.n < 0 ? '-' : out ? '+' : '';
    out += `${sign}${coef}${mono}`;
  });
  return out || '0';
}
const setOf = (text, cfg = { v: V }) => solutionSet(parse(text, { vars: [V] }), cfg);
const setText = (S) => toText(setToNode(S));
const domText = (f, opts = {}) => setText(domainOf(expandFns(parse(f, { vars: [V], funcs: opts.funcs }), opts.defs, V), { v: V }));
const RT = (s) => toReadable(unparen(parse(s, { vars: [V], funcs: ['f', 'g'] })));

// A line with the sub-expressions written in `texts` left blank.
function tpl(math, texts, opts = {}) {
  const node = parse(math, opts);
  const holes = [];
  for (const tx of texts) {
    const want = toText(parse(tx, opts));
    let found = null;
    walk(node, (n) => {
      if (found) return false;
      if (n.t !== 'paren' && !holes.includes(n) && toText(n) === want) { found = n; return false; }
      return true;
    });
    if (found) holes.push(found);
  }
  return holes.length ? blankLine(node, holes, opts) : { math };
}
const blanked = (line, texts, opts) => ({ ...line, ...tpl(line.math, texts, opts) });

// Level 3: one menu per reference line; the action of the line is right.
function stepMenus(start, lines, choices) {
  const eqs = lines.filter((l) => l.kind === 'eq');
  return eqs.map((l, i) => ({
    at: i === 0 ? start : eqs[i - 1].math,
    options: choices.map((c) => ({
      id: c.id, label: c.label, valid: c.id === l.act,
      why: c.why || t('Ce n\'est pas l\'étape à faire maintenant.'),
    })),
  }));
}
const withMenus = (judge, level, start, lines, choices) => (level === 3 ? { ...judge, menus: stepMenus(start, lines, choices) } : judge);

// ======================================================================
// g1-domain
// ======================================================================

const DOM = 'g1-domain';
const DOM_SUB = [
  { id: 'conds', label: t('écrire les conditions'), skill: DOM },
  { id: 'solve', label: t('résoudre chaque condition'), skill: 'rat-domain' },
  { id: 'combine', label: t('combiner en intervalles'), skill: 'g9-intervals' },
];
const DOM_CHOICES = [
  { id: 'conds', label: t('Écrire les conditions (racines, dénominateurs)') },
  { id: 'solve', label: t('Résoudre chaque condition') },
  { id: 'combine', label: t('Combiner : écrire D_f en intervalles') },
];

// A radicand px + c whose root is a whole number or a half.
function radLin(rng, sign = rng.pick([1, -1])) {
  const p = sign * rng.pick([1, 1, 2]);
  const r = p % 2 === 0 ? q(rng.int(-9, 9), 2) : q(rng.int(-5, 5));
  const c = r.mul(q(p)).neg();
  const solved = (strict) => `x${(p > 0) === true ? (strict ? '>' : '≥') : (strict ? '<' : '≤')}${N(r)}`;
  return { text: affine(p, c), solved, r, p };
}

// Bricks put together: √(radicand)/(denominator), …
function domData(rng, level) {
  for (let i = 0; i < 300; i++) {
    const kind = level >= 4 ? rng.pick(['frac', 'quadrad', 'rootden', 'tworoots', 'frac']) : rng.pick(['frac', 'frac', 'quadrad', 'rootden']);
    let f;
    let conds;
    if (kind === 'frac') {
      const R = radLin(rng);
      const a = rng.int(-5, 5);
      const b = level >= 2 && rng.chance(0.6) ? (rng.chance(0.5) ? -a : rng.int(-5, 5)) : null;
      if (b === a) continue;
      let den;
      if (b === null) den = lin(a);
      else if (b === -a) den = `x^2-${a * a}`;
      else den = level >= 4 ? polyText([1, -(a + b), a * b]) : `(${lin(a)})(${lin(b)})`;
      if (a === 0 && b === null) continue;
      f = `sqrt(${R.text})/(${den})`;
      const dsolved = b === null ? `x≠${a}` : `x≠${Math.min(a, b)}∧x≠${Math.max(a, b)}`;
      conds = [{ text: `${R.text}≥0`, solved: R.solved(false), left: R.text }, { text: `${den}≠0`, solved: dsolved, left: den }];
    } else if (kind === 'quadrad') {
      const r1 = rng.int(-4, 3);
      const r2 = rng.int(r1 + 1, 4);
      const out = rng.chance(0.6);
      const rad = out ? polyText([1, -(r1 + r2), r1 * r2]) : polyText([-1, r1 + r2, -r1 * r2]);
      const a = rng.int(-5, 5);
      if (a === r1 || a === r2) continue;
      f = `sqrt(${rad})/(${lin(a)})`;
      conds = [{ text: `${rad}≥0`, solved: out ? `(x≤${r1}∨x≥${r2})` : `${r1}≤x≤${r2}`, left: rad }, { text: `${lin(a)}≠0`, solved: `x≠${a}`, left: lin(a) }];
    } else if (kind === 'rootden') {
      const R = radLin(rng);
      const k = nz(rng, -4, 4);
      if (R.r.eq(-k)) continue;
      const a = rng.int(-5, 5);
      const extra = level >= 4 && rng.chance(0.5);
      f = `(${lin(-k)})/sqrt(${R.text})${extra ? `+1/(${lin(a)})` : ''}`;
      conds = [{ text: `${R.text}>0`, solved: R.solved(true), left: R.text }];
      if (extra) conds.push({ text: `${lin(a)}≠0`, solved: `x≠${a}`, left: lin(a) });
    } else {
      const R1 = radLin(rng, 1);
      const R2 = radLin(rng, -1);
      if (R1.r.cmp(R2.r) >= 0) continue;
      f = `sqrt(${R1.text})+sqrt(${R2.text})`;
      conds = [{ text: `${R1.text}≥0`, solved: R1.solved(false), left: R1.text }, { text: `${R2.text}≥0`, solved: R2.solved(false), left: R2.text }];
    }
    const D = domainOf(parse(f), { v: V });
    if (!D.parts.length) continue;
    if (conds.some((c) => toText(parse(c.text)) === toText(parse(c.solved)))) continue;
    // Each condition counts (removing it changes D), except on purpose at level 4.
    const partial = conds.map((_, j) => (conds.length > 1 ? setOf(conds.filter((__, k) => k !== j).map((c) => c.text).join('∧')) : null));
    const useless = partial.some((S) => S && setEqual(S, D));
    if (useless && !(level === 4 && rng.chance(0.33))) continue;
    if (setText(D).length > 40) continue;
    return { kind, f, conds, D, Dtext: setText(D), partial };
  }
  return { kind: 'frac', f: 'sqrt(x+3)/(x^2-4)', conds: [{ text: 'x+3≥0', solved: 'x≥-3', left: 'x+3' }, { text: 'x^2-4≠0', solved: 'x≠-2∧x≠2', left: 'x^2-4' }], D: setOf('[-3;-2[∪]-2;2[∪]2;+∞['), Dtext: '[-3;-2[∪]-2;2[∪]2;+∞[', partial: [], fallback: true };
}

function domLevel5(rng, opts) {
  for (let i = 0; i < 200; i++) {
    const qq = rng.int(-3, 3);
    const a = rng.int(-qq + 1, -qq + 4);
    const r = rng.int(-5, 5);
    if (r === a || r === -qq) continue;
    const f = `(${lin(r)})sqrt(${lin(-qq)})/(${lin(a)})`;
    const D = domainOf(parse(f), { v: V });
    const Dt = setText(D);
    const inD = r >= -qq;
    const seg1 = [
      E(`${lin(-qq)}≥0∧${lin(a)}≠0`, t('Conditions'), 'conds'),
      E(`x≥${-qq}∧x≠${a}`, t('Résoudre'), 'solve'),
      E(Dt, 'D_f', 'combine'),
    ];
    const eqStart = `${f}=0`;
    const sols = [r, -qq].sort((u, w) => u - w);
    const seg2 = [E(`x=${sols[0]}∨x=${sols[1]}`, t('Un produit est nul si un facteur est nul'), 'solve')];
    if (!inD) seg2.push(E(`{${-qq}}`, t('{r} n\'est pas dans D_f', { r: fr(String(r)) }), 'conds'));
    return linesItem({
      skill: DOM, level: 5,
      prompt: t('Soit f(x) = {f}. Détermine D_f, puis résous f(x) = 0.', { f: MT(f) }),
      start: f, judge: { kind: 'solset', v: V, exprDomain: true }, mode: 'free',
      script: [...seg1, { kind: 'segment', html: t('Résous f(x) = 0 sur D_f :'), start: { math: eqStart }, judge: { kind: 'solset', v: V, onDomain: true } }, ...seg2],
      hints: [], subgoals: DOM_SUB, keys: KEYS, key: `${DOM}:5:${f}`, exam: examOf(opts),
    });
  }
  return domItem(4, rng, opts);
}

function domItem(level, rng, opts = {}) {
  if (level === 5) return domLevel5(rng, opts);
  const d = domData(rng, level);
  const condsText = d.conds.map((c) => c.text).join('∧');
  const solvedText = d.conds.map((c) => c.solved).join('∧');
  const lines = [
    E(condsText, t('Écrire les conditions'), 'conds', 'conds'),
    E(solvedText, t('Résoudre chaque condition'), 'solve', 'solve'),
    E(d.Dtext, t('Combiner'), 'combine', 'combine'),
  ];
  let start = d.f;
  let script = lines;
  const judge = { kind: 'solset', v: V, exprDomain: true };
  if (level === 1) {
    start = condsText;
    const nums = d.conds.flatMap((c) => [...c.solved.matchAll(/[≥≤<>≠]=?(-?[\d/]+)/g)].map((m) => m[1]));
    script = [{ kind: 'note', html: t('Les conditions de {f} sont écrites. Résous-les.', { f: MT(d.f) }) }, blanked(lines[1], [...new Set(nums)].slice(0, 2)), lines[2]];
  } else if (level === 2) {
    script = [blanked(lines[0], d.conds.map((c) => c.left)), lines[1], lines[2]];
  } else if (level === 3) {
    const cond0 = d.conds.map((c) => RT(c.text)).join(t(' et '));
    const options = [{ id: 'right', label: cond0, valid: true }];
    if (d.conds.length > 1) options.push({ id: 'one', label: RT(d.conds[d.conds.length - 1].text), valid: false, rule: 'g1_domain_partial', why: t('Il manque une condition : chaque racine et chaque dénominateur donne la sienne.') });
    options.push({ id: 'num', label: t('{c} et numérateur ≠ 0', { c: cond0 }), valid: false, why: t('Le numérateur peut être nul : 0 divisé par un nombre non nul existe.') });
    if (d.conds.some((c) => c.text.includes('≥'))) options.push({ id: 'strict', label: d.conds.map((c) => RT(c.text.replace('≥', '>'))).join(t(' et ')), valid: false, why: t('Une racine carrée de 0 existe : sous la racine, il faut ≥ 0 (> 0 seulement si la racine est au dénominateur).') });
    script = [{ kind: 'decision', prompt: t('Quelles conditions écrire ?'), options }, ...lines];
  }
  const sLines = lines;
  return linesItem({
    skill: DOM, level, prompt: t('Détermine le domaine de définition de f(x) = {f}.', { f: MT(d.f) }),
    start, judge: withMenus(judge, level, start, sLines, DOM_CHOICES), mode: modeOf(level), script,
    hints: H(t('Deux dangers : une racine carrée (ce qui est dessous doit être ≥ 0) et un dénominateur (≠ 0).'), MT(condsText), MT(lines[1].math)),
    subgoals: DOM_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${DOM}:${level}:${d.f}`, exam: examOf(opts), fallback: !!d.fallback,
  });
}

function domExam(rng, exam) {
  if (exam === 'tf') {
    const bank = [
      { s: 'La fonction x ↦ √(x²) n\'est définie que sur [0 ; +∞[.', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: 'x^2≥0⇒x≥0', hyp: 'x^2≥0', ask: [{ v: 'x', label: 'x =' }], answer: { x: '-1' } }, why: t('Faux : x² ≥ 0 pour tout x, donc √(x²) est définie sur ℝ. Par exemple √((−1)²) = 1.') },
      { s: 'La fonction x ↦ 1/(x² + 1) est définie sur ℝ.', truth: true, why: t('Vrai : x² + 1 ≥ 1 ne s\'annule jamais.') },
      { s: 'La fonction x ↦ √(x − 1)/(x − 2) est définie sur [1 ; +∞[.', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: 'x≥1⇒x≠2', hyp: 'x≥1', ask: [{ v: 'x', label: 'x =' }], answer: { x: '2' } }, why: t('Faux : en x = 2, le dénominateur est nul. D = [1 ; 2[ ∪ ]2 ; +∞[.'), rule: 'g1_domain_partial' },
      { s: 'La fonction x ↦ 1/√(x + 4) est définie sur [−4 ; +∞[.', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: 'x≥-4⇒x+4≠0', hyp: 'x≥-4', ask: [{ v: 'x', label: 'x =' }], answer: { x: '-4' } }, why: t('Faux : en x = −4, on divise par √0 = 0. D = ]−4 ; +∞[.') },
      { s: 'La fonction x ↦ √(4 − x²) est définie sur [−2 ; 2].', truth: true, why: t('Vrai : 4 − x² ≥ 0 ⇔ −2 ≤ x ≤ 2.') },
    ];
    const b = rng.pick(bank);
    // The key stays the French statement.
    return tfItem({ skill: DOM, level: 4, statement: t(b.s), truth: b.truth, counter: b.counter || null, ruleIfTrue: b.truth ? null : b.rule || null, key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 } });
  }
  const d = domData(rng, 2);
  const options = [{ html: MT(d.Dtext), correct: true }];
  d.partial.forEach((S) => { if (S && S.parts.length && !setEqual(S, d.D)) options.push({ html: MT(setText(S)), correct: false, rule: 'g1_domain_partial' }); });
  // A bracket turned: the first closed bound opened, or the reverse.
  const flipped = d.Dtext.replace(/^\[/, ']').replace(/^\](?!-∞)/, '[');
  if (flipped !== d.Dtext) { try { setOf(flipped); options.push({ html: MT(flipped), correct: false, rule: 'g9_bracket' }); } catch { /* skip */ } }
  if (options.length < 4) options.push({ html: MT('ℝ'), correct: false });
  return mcq({
    skill: DOM, level: 4, prompt: t('Domaine de définition de f(x) = {f} :', { f: MT(d.f) }), options: uniq(options).slice(0, 4), key: `mcq:${d.f}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: t('{c} donne D_f = {d}.', { c: MT(d.conds.map((c) => c.text).join('∧')), d: MT(d.Dtext) }), note: '' }],
  }, rng);
}

// ======================================================================
// g1-compose
// ======================================================================

const CMP = 'g1-compose';
const CMP_SUB = [
  { id: 'subst', label: t('remplacer'), skill: CMP },
  { id: 'simplify', label: t('simplifier'), skill: CMP },
  { id: 'domain', label: t('domaine'), skill: DOM },
];
const CMP_CHOICES = [
  { id: 'subst', label: t('Remplacer : la fonction intérieure d\'abord') },
  { id: 'simplify', label: t('Simplifier') },
  { id: 'domain', label: t('Écrire le domaine') },
];

// Pairs (outer, inner): the raw writing, the simplified one, and the
// domain of the composition. c, a, b: parameters.
function compPairs(rng) {
  const c = rng.pick([1, 4, 9]);
  const a = rng.pick([2, 3, -2]);
  const b = nz(rng, -3, 3);
  const k = nz(rng, -3, 3);
  const quad = `${c}-x^2`;
  const af = affine(a, b);
  return [
    { outer: quad, inner: 'sqrt(x)', simple: `${c}-x` },
    { outer: 'sqrt(x)', inner: quad, simple: `sqrt(${c}-x^2)` },
    { outer: 'x^2', inner: 'sqrt(x)', simple: 'x' },
    { outer: 'sqrt(x)', inner: 'x^2', simple: '|x|' },
    { outer: '1/x', inner: `1/(${lin(k)})`, simple: lin(k) },
    { outer: af, inner: 'sqrt(x)', simple: `${a}sqrt(x)${b < 0 ? '' : '+'}${b}` },
    { outer: 'sqrt(x)', inner: af, simple: `sqrt(${af})` },
    { outer: af, inner: 'x^2', simple: affine(a, b).replace('x', 'x^2') },
    { outer: '1/x', inner: 'sqrt(x)', simple: '1/sqrt(x)' },
    { outer: '1/x', inner: af, simple: `1/(${af})` },
    { outer: af, inner: '1/x', simple: `${a}/x${b < 0 ? '' : '+'}${b}` },
    { outer: '|x|', inner: af, simple: `|${af}|` },
    { outer: `1/(${lin(k)})`, inner: '1/x', simple: `x/(1${k > 0 ? '-' : '+'}${Math.abs(k) === 1 ? '' : Math.abs(k)}x)` },
  ];
}

// outer with x replaced by inner, brackets only where needed: g(√x) = 1 − (√x)².
function subst(outerText, innerText) {
  const outer = parse(outerText);
  const inner = unparen(parse(innerText));
  const paths = [];
  walk(outer, (n, path) => { if (n.t === 'sym' && n.name === V) paths.push(path); return true; });
  let out = outer;
  for (const path of paths) {
    const parent = path.length ? getAt(outer, path.slice(0, -1)) : null;
    const prodParent = parent && parent.t === 'bin' && parent.op === '×';
    const group = parent && (['paren', 'abs', 'fn'].includes(parent.t) || (['sqrt', 'pow'].includes(inner.t) && prodParent && parent.r === getAt(outer, path)) || (inner.t === 'num' && !prodParent));
    out = replaceAt(out, path, inner.t === 'sym' || group ? inner : { t: 'paren', e: inner });
  }
  // 4·1² and not 41²: a product before a number shows its ×.
  const numFirst = (n) => n.t === 'num' || (n.t === 'pow' && numFirst(n.b));
  return toText(mapNode(out, (n) => (n.t === 'bin' && n.op === '×' && numFirst(n.r) ? { ...n, implicit: false } : n)));
}
// Do two functions commute? Compared at a few points.
function commute(f, g) {
  const fg = parse(subst(f, g));
  const gf = parse(subst(g, f));
  return [0.3, 0.7, 1.3, 2.2].every((x) => {
    const u = evalFloat(fg, { x });
    const w = evalFloat(gf, { x });
    return (!Number.isFinite(u) && !Number.isFinite(w)) || Math.abs(u - w) < 1e-9;
  });
}

function compData(rng) {
  for (let i = 0; i < 100; i++) {
    const pairs = compPairs(rng);
    const p = rng.pick(pairs);
    if (commute(p.outer, p.inner)) continue;
    // Which is called f: the composition asked is g ∘ f or f ∘ g.
    const fIsInner = rng.chance(0.5);
    const defs = fIsInner ? { f: p.inner, g: p.outer } : { f: p.outer, g: p.inner };
    const call = fIsInner ? 'g(f(x))' : 'f(g(x))';
    const name = fIsInner ? 'g ∘ f' : 'f ∘ g';
    const innerName = fIsInner ? 'f' : 'g';
    const raw = subst(p.outer, p.inner);
    const simple = toText(unparen(parse(p.simple)));
    const D = domText(call, { funcs: ['f', 'g'], defs });
    const Dsimple = domText(simple);
    // The other order, for the distractors.
    const other = { raw: subst(p.inner, p.outer), call: fIsInner ? 'f(g(x))' : 'g(f(x))' };
    return { ...p, pairs, defs, call, name, innerName, raw, simple, D, Dsimple, other };
  }
  return null;
}

const cmpJudge = (d) => {
  const D = setOf(d.D);
  const lo = Math.max(D.parts[0].lo.x, -3);
  const part = D.parts.find((pp) => pp.hi.x > lo + 0.2) || D.parts[0];
  const a = Math.max(part.lo.x, -3) + 0.05;
  const b = Math.min(part.hi.x, a + 3) - 0.05;
  return { kind: 'equiv', vars: [V], funcs: ['f', 'g'], defs: d.defs, domain: { x: [a, b] }, target: 'short', goal: d.simple };
};

const MU = (s) => MT(toText(unparen(parse(s))));
const fDisplay = (d) => t('f(x) = {f} et g(x) = {g}', { f: MU(d.defs.f), g: MU(d.defs.g) });

// The lines of one composition: replace, then simplify; then the domain.
function cmpParts(d, level) {
  const innerText = d.defs[d.innerName];
  const outerName = d.innerName === 'f' ? 'g' : 'f';
  const first = `${outerName}(${innerText})`;
  const clean = (s) => toText(unparen(parse(s, { funcs: ['f', 'g'] })));
  const expr = [
    E(clean(first), t('{n} d\'abord : {n}(x) = {e}', { n: d.innerName, e: RT(innerText) }), 'subst', 'subst'),
    E(d.raw, t('Remplacer x par {e} dans {o}', { e: RT(innerText), o: outerName }), 'subst', 'subst'),
  ];
  // The raw writing may already be the simple one.
  if (clean(d.raw) !== clean(d.simple)) expr.push(E(d.simple, t('Simplifier'), 'simplify', 'simplify'));
  if (level === 1 && expr[0]) expr[0] = blanked(expr[0], [toText(unparen(parse(innerText)))], { funcs: ['f', 'g'] });
  const domCond = domText(d.call, { funcs: ['f', 'g'], defs: d.defs });
  const dom = [E(domCond, t('Domaine : x doit être dans le domaine de la fonction intérieure, et l\'expression brute définie'), 'domain', 'domain')];
  return { expr, dom, domCond };
}

function cmpItem(level, rng, opts = {}) {
  const d = compData(rng);
  const both = level >= 4;
  const parts = cmpParts(d, level);
  const judge = cmpJudge(d);
  const domJudge = { kind: 'solset', v: V, funcs: ['f', 'g'], defs: d.defs, exprDomain: true, simplified: d.simple };
  const script = [];
  if (level <= 2) script.push({ kind: 'note', html: t('Le domaine de {name} est {d}.', { name: d.name, d: MT(d.D) }) });
  if (level === 3) {
    script.push({ kind: 'decision', prompt: t('Pour {name}, quelle fonction applique-t-on d\'abord ?', { name: d.name }), options: [
      { id: 'inner', label: t('{n} d\'abord', { n: d.innerName }), valid: true },
      { id: 'outer', label: t('{n} d\'abord', { n: d.innerName === 'f' ? 'g' : 'f' }), valid: false, rule: 'g1_compose_order', why: t('{name} : la fonction écrite à droite s\'applique d\'abord.', { name: d.name }) },
    ] });
  }
  script.push(...parts.expr);
  if (level >= 3) script.push({ kind: 'segment', html: t('Domaine de {name} :', { name: d.name }), start: { math: d.call }, judge: domJudge }, ...parts.dom);
  let prompt = level >= 3
    ? t('{fd}. Calcule ({name})(x) et simplifie, puis donne son domaine.', { fd: fDisplay(d), name: d.name })
    : t('{fd}. Calcule ({name})(x) et simplifie.', { fd: fDisplay(d), name: d.name });
  if (both) {
    // The other order too.
    const e = { ...d, call: d.other.call, raw: d.other.raw, innerName: d.innerName === 'f' ? 'g' : 'f', name: d.name === 'g ∘ f' ? 'f ∘ g' : 'g ∘ f' };
    const match = d.pairs.find((x) => toText(parse(x.outer)) === toText(parse(d.inner)) && toText(parse(x.inner)) === toText(parse(d.outer)));
    e.simple = match ? toText(unparen(parse(match.simple))) : d.other.raw;
    e.D = domText(e.call, { funcs: ['f', 'g'], defs: d.defs });
    const p2 = cmpParts(e, level);
    script.push({ kind: 'segment', html: t('Puis ({name})(x) :', { name: e.name }), start: { math: e.call }, judge: cmpJudge(e) }, ...p2.expr,
      { kind: 'segment', html: t('Domaine de {name} :', { name: e.name }), start: { math: e.call }, judge: { ...domJudge, simplified: e.simple } }, ...p2.dom);
    prompt = t('{fd}. Calcule ({a})(x) et ({b})(x), simplifie, et donne leurs domaines.', { fd: fDisplay(d), a: d.name, b: e.name });
  }
  return linesItem({
    skill: CMP, level, prompt,
    start: d.call, judge: withMenus(judge, level, d.call, parts.expr, CMP_CHOICES), mode: modeOf(level), script,
    declares: { vars: [V], funcs: ['f', 'g'] },
    hints: H(t('{name} : on calcule d\'abord {n}(x), puis on l\'envoie dans l\'autre fonction.', { name: d.name, n: d.innerName }), MT(parts.expr[0].math, { funcs: ['f', 'g'] }), MT(d.raw)),
    subgoals: CMP_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${CMP}:${level}:${d.defs.f}:${d.defs.g}:${d.call}`, exam: examOf(opts, 3),
  });
}

function cmpExam(rng, exam) {
  if (exam === 'tf') {
    const a = rng.pick([2, 3]);
    // s: the French statement, kept for the key; st: the statement shown.
    const bank = [
      { s: `Pour f(x) = x² et g(x) = x + ${a}, on a f ∘ g = g ∘ f.`, st: t('Pour f(x) = x² et g(x) = x + {a}, on a f ∘ g = g ∘ f.', { a }), truth: false, pred: `(x+${a})^2=x^2+${a}`, ans: '1', why: t('Faux : (f ∘ g)(x) = (x + {a})², (g ∘ f)(x) = x² + {a}. En x = 1 : {u} ≠ {v}.', { a, u: (1 + a) ** 2, v: 1 + a }) },
      { s: `Pour f(x) = ${a}x et g(x) = x + 1, on a f ∘ g = g ∘ f.`, st: t('Pour f(x) = {a}x et g(x) = x + 1, on a f ∘ g = g ∘ f.', { a }), truth: false, pred: `${a}(x+1)=${a}x+1`, ans: '0', why: t('Faux : {a}(x + 1) ≠ {a}x + 1.', { a }) },
      { s: 'Pour f(x) = x + 2 et g(x) = x − 5, on a f ∘ g = g ∘ f.', truth: true, why: t('Vrai : les deux donnent x − 3.') },
      { s: 'f ∘ g = g ∘ f pour toutes les fonctions f et g.', truth: false, pred: '(x+1)^2=x^2+1', ans: '1', with: 'f(x) = x², g(x) = x + 1', why: t('Faux : avec f(x) = x² et g(x) = x + 1, (f ∘ g)(1) = 4 mais (g ∘ f)(1) = 2.') },
    ];
    const b = rng.pick(bank);
    const counter = b.truth ? null : { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: b.pred, ask: [{ v: 'x', label: b.with ? t('Avec {w}, une valeur x où f(g(x)) ≠ g(f(x)) : x =', { w: b.with }) : 'x =' }], answer: { x: b.ans } };
    return tfItem({ skill: CMP, level: 4, statement: b.st ?? t(b.s), truth: b.truth, counter, key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 } });
  }
  const d = compData(rng);
  const options = [
    { html: t('{e}, sur {d}', { e: MU(d.simple), d: MT(d.D) }), correct: true },
    { html: t('{e}, sur {d}', { e: MU(d.other.raw), d: MT(domText(d.other.call, { funcs: ['f', 'g'], defs: d.defs })) }), correct: false, rule: 'g1_compose_order' },
  ];
  if (d.Dsimple !== d.D) options.push({ html: t('{e}, sur {d}', { e: MU(d.simple), d: MT(d.Dsimple) }), correct: false, rule: 'g1_compose_domain' });
  options.push({ html: t('{e}, sur {d}', { e: MU(`(${d.defs.f})*(${d.defs.g})`), d: MT(d.D) }), correct: false });
  return mcq({
    skill: CMP, level: 4, prompt: t('{fd}. Alors ({name})(x) =', { fd: fDisplay(d), name: d.name }), options: uniq(options), key: `mcq:${d.defs.f}:${d.defs.g}:${d.call}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: t('({name})(x) = {raw} = {simple}, sur {d}.', { name: d.name, raw: MT(d.raw), simple: MT(d.simple), d: MT(d.D) }), note: '' }],
  }, rng);
}


// ======================================================================
// g1-inverse
// ======================================================================

const INV = 'g1-inverse';
const INV_SUB = [
  { id: 'pose', label: t('poser y = f(x)'), skill: INV },
  { id: 'isolate', label: t('isoler x'), skill: 'iso-formula' },
  { id: 'solve', label: t('résoudre le 2e degré'), skill: 'quad-formula' },
  { id: 'branch', label: t('choisir la solution de l\'ensemble de départ'), skill: INV },
  { id: 'rename', label: t('renommer'), skill: INV },
];
const INV_CHOICES = [
  { id: 'isolate', label: t('Isoler x (regrouper les termes en x)') },
  { id: 'square', label: t('Faire apparaître un carré') },
  { id: 'solve', label: t('Résoudre en x (les deux racines)') },
  { id: 'branch', label: t('Garder la solution de l\'ensemble de départ') },
];
// The same affine text in the letter y.
const affY = (p, c) => affine(p, c).replace(/x/g, 'y');
// h ± √(rad): the text of a root.
const plusRoot = (h, sign, rad) => {
  const r = `sqrt(${rad})`;
  if (h === 0) return sign > 0 ? r : `-${r}`;
  return `${h}${sign > 0 ? '+' : '-'}${r}`;
};
const plusK = (k) => (k ? (k > 0 ? `+${k}` : `${k}`) : '');

function invData(rng, kind) {
  for (let i = 0; i < 200; i++) {
    if (kind === 'affine') {
      const a = nz(rng, -4, 4);
      if (Math.abs(a) === 1) continue;
      const b = nz(rng, -6, 6);
      const f = affine(a, b);
      const xy = a > 0 ? `(${affY(1, -b)})/${a}` : `(${affY(-1, b)})/${-a}`;
      const lines = [
        E(`${affine(a, 0)}=${affY(1, -b)}`, b > 0 ? t('Soustraire {b}', { b }) : t('Ajouter {b}', { b: -b }), 'isolate', 'isolate'),
        E(`x=${xy}`, t('Diviser par {a}', { a: fr(N(a)) }), 'isolate', 'isolate'),
      ];
      return { kind, f, A: 'ℝ', B: 'ℝ', start: `${f}=y`, lines, xy, inv: xy.replace(/y/g, 'x'), dom: [-3, 3], den: String(Math.abs(a)) };
    }
    if (kind === 'homog') {
      const a = nz(rng, -4, 4);
      const b = rng.int(-4, 4);
      const c = nz(rng, -3, 3);
      const d = rng.int(-4, 4);
      if (a * d - b * c === 0 || (b === 0 && d === 0)) continue;
      if (gcdI(gcdI(a, b), gcdI(c, d)) > 1) continue;
      const num = affine(a, b);
      const den = affine(c, d);
      const f = `(${num})/(${den})`;
      const pole = q(-d, c);
      const lim = q(a, c);
      const A = `ℝ∖{${N(pole)}}`;
      const B = `ℝ∖{${N(lim)}}`;
      const wrapT = (s) => (/^-?\d*[a-z]?$/.test(s) ? s : `(${s})`);
      const xy = `${wrapT(affY(-d, b))}/(${affY(c, -a)})`;
      const lines = [
        E(`${/^-?\d*x$/.test(den) ? `${den}y` : `y(${den})`}=${num}`, t('Multiplier par le dénominateur'), 'isolate', 'isolate'),
        E(`x(${affY(c, -a)})=${affY(-d, b)}`, t('Regrouper les termes en x'), 'isolate', 'isolate'),
        E(`x=${xy}`, t('Diviser : {e} ≠ 0 car y ≠ {l}', { e: toReadable(parse(affY(c, -a))), l: fr(N(lim)) }), 'isolate', 'isolate'),
      ];
      const lo = lim.valueOf() + 0.3;
      return { kind, f, A, B, start: `${f}=y`, lines, xy, inv: xy.replace(/y/g, 'x'), dom: [lo, lo + 3], pole, lim };
    }
    if (kind === 'square' || kind === 'squareX') {
      const h = rng.int(-3, 3);
      const k = rng.int(-3, 3);
      if (kind === 'squareX' && h === 0) continue;
      const right = rng.chance(0.6);
      const sq = h === 0 ? 'x^2' : `(${lin(h)})^2`;
      const f = kind === 'squareX' ? polyText([1, -2 * h, h * h + k]) : `${sq}${plusK(k)}`;
      const A = right ? `[${h};+∞[` : `]-∞;${h}]`;
      const B = `[${k};+∞[`;
      const rad = lin(k).replace('x', 'y');
      const keep = plusRoot(h, right ? 1 : -1, rad);
      const lose = plusRoot(h, right ? -1 : 1, rad);
      const lines = [];
      if (kind === 'squareX') lines.push(E(`${sq}${plusK(k)}=y`, t('Faire apparaître un carré'), 'isolate', 'square'));
      if (k !== 0) lines.push(E(`${sq}=${rad}`, t('Isoler le carré'), 'isolate', 'square'));
      lines.push(
        E(`x=${keep}∨x=${lose}`, t('Deux racines'), 'solve', 'solve'),
        E(`x=${keep}`, t('x {r} {h} : on garde la racine {s}', { r: right ? '≥' : '≤', h: fr(String(h)), s: right ? '+' : '−' }), 'branch', 'branch'),
      );
      return { kind, f, A, B, start: `${f}=y`, lines, xy: keep, inv: keep.replace(/y/g, 'x'), lose: lose.replace(/y/g, 'x'), dom: [k + 0.1, k + 4], h, k, right };
    }
    // √(x − a) + b on [a ; +∞[
    const a = rng.int(-4, 4);
    const b = nz(rng, -3, 3);
    const f = `sqrt(${lin(a)})${plusK(b)}`;
    const yb = lin(b).replace('x', 'y');
    const xy = `(${yb})^2${plusK(a)}`;
    const lines = [
      E(`sqrt(${lin(a)})=${yb}`, t('Isoler la racine'), 'isolate', 'isolate'),
      E(`${lin(a)}=(${yb})^2`, t('Élever au carré : y ≥ {b}, les deux membres sont ≥ 0', { b: fr(String(b)) }), 'isolate', 'square'),
    ];
    if (a !== 0) lines.push(E(`x=${xy}`, t('Isoler x'), 'isolate', 'isolate'));
    return { kind: 'sqrt', f, A: `[${a};+∞[`, B: `[${b};+∞[`, start: `${f}=y`, lines, xy, inv: xy.replace(/y/g, 'x'), dom: [b + 0.1, b + 4] };
  }
  return null;
}

function invItem(level, rng, opts = {}) {
  const kind = level === 1 ? 'affine' : level === 2 ? 'homog' : level === 3 ? rng.pick(['square', 'squareX']) : level === 4 ? rng.pick(['homog', 'square', 'squareX', 'sqrt']) : rng.pick(['squareX', 'homog', 'sqrt']);
  const d = invData(rng, kind);
  const judge = { kind: 'solset', v: V, ...(d.A === 'ℝ' ? {} : { domain: d.A }), params: { y: d.B } };
  const rename = { kind: 'equiv', vars: [V], subst: { y: 'x' }, fx: d.f, domain: { x: d.dom }, target: 'only', finalVars: [V] };
  let lines = d.lines;
  if (level === 1) lines = lines.map((l, i) => (i === lines.length - 1 ? blanked(l, [d.den], { vars: [V, 'y'] }) : l));
  const script = [];
  if (level === 3) {
    const at = lines.findIndex((l) => l.act === 'branch');
    script.push(...lines.slice(0, at), { kind: 'decision', prompt: t('Quelle racine garder ?'), options: [
      { id: 'keep', label: `x = ${RT(d.xy)}`, valid: true },
      { id: 'lose', label: `x = ${RT(d.lose.replace(/x/g, 'y'))}`, valid: false, rule: 'g1_inverse_branch', why: t('Cette racine est {r} {h} : elle n\'est pas dans l\'ensemble de départ.', { r: d.right ? '≤' : '≥', h: fr(String(d.h)) }) },
      { id: 'both', label: t('Les deux'), valid: false, why: t('f⁻¹(y) est un seul nombre : f est injective sur son ensemble de départ.') },
    ] }, ...lines.slice(at));
  } else script.push(...lines);
  script.push({ kind: 'segment', html: t('Renomme la variable :'), ask: 'f⁻¹(x) =', start: { math: d.xy }, judge: rename }, E(d.inv, t('Renommer y en x'), 'rename'));
  const YO = { vars: [V, 'y'] };
  return linesItem({
    skill: INV, level,
    prompt: t('f : {A} → {B}, f(x) = {f} est bijective. Résous y = f(x) en x, puis explicite f⁻¹.', { A: MT(d.A), B: MT(d.B), f: MU(d.f) }),
    start: d.start, judge: withMenus(judge, level, d.start, lines, INV_CHOICES), mode: modeOf(level), script,
    declares: { vars: [V, 'y'] },
    hints: H(d.A === 'ℝ' ? t('Résous y = f(x) en x.') : t('Résous y = f(x) en x, puis garde la solution qui est dans {A}.', { A: fr(d.A) }), MT(lines[Math.max(0, lines.length - 2)].math, YO), MT(lines[lines.length - 1].math, YO)),
    subgoals: INV_SUB, keys: [...KEYS, 'letters'], tapActions: level === 3 ? 'steps' : null,
    key: `${INV}:${level}:${d.f}:${d.A}`, exam: examOf(opts, 3),
  });
}

function invMcq(rng) {
  const d = invData(rng, rng.pick(['square', 'squareX', 'homog']));
  const options = [
    { html: MU(d.inv), correct: true },
    { html: MU(`1/(${d.f})`), correct: false, rule: 'g1_inverse_reciprocal' },
  ];
  if (d.lose) options.push({ html: MU(d.lose), correct: false, rule: 'g1_inverse_branch' });
  options.push({ html: MU(d.f), correct: false });
  return mcq({
    skill: INV, level: 4, prompt: t('f : {A} → {B}, f(x) = {f}. Alors f⁻¹(x) =', { A: MT(d.A), B: MT(d.B), f: MU(d.f) }),
    options: uniq(options), key: `mcq:${d.f}:${d.A}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: t('y = f(x) donne x = {x} ; donc f⁻¹(x) = {inv}.', { x: MT(d.xy, { vars: [V, 'y'] }), inv: MU(d.inv) }), note: '' }],
  }, rng);
}


// ======================================================================
// g1-trinome-sign
// ======================================================================

const TRI = 'g1-trinome-sign';
const TRI_SUB = [
  { id: 'delta', label: t('discriminant'), skill: 'quad-formula' },
  { id: 'roots', label: t('racines'), skill: 'quad-formula' },
  { id: 'sign', label: t('signe du trinôme'), skill: TRI },
  { id: 'write', label: t('écrire l\'ensemble'), skill: 'g9-intervals' },
];
const TRI_CHOICES = [
  { id: 'roots', label: t('Factoriser avec les racines') },
  { id: 'sign', label: t('Signe de a : entre ou à l\'extérieur des racines') },
  { id: 'write', label: t('Écrire S en intervalles') },
  { id: 'move', label: t('Tout passer à gauche') },
];
const RELS = ['<', '≤', '>', '≥'];
const STRICT = { '<': true, '>': true, '≤': false, '≥': false };
const paren = (x) => (Q.of(x).n < 0 ? `(${N(x)})` : N(x));

// a(x − r₁)(x − r₂) with integer coefficients, r₁ < r₂ whole or halves.
function triData(rng, kind = 'two') {
  for (let i = 0; i < 300; i++) {
    const rel = rng.pick(RELS);
    const a = rng.pick([1, -1, 2, -2, 3, -3]);
    if (kind === 'none') {
      const h = rng.int(-3, 3);
      const m = Math.sign(a) * rng.int(1, 4);
      const cs = [a, -2 * a * h, a * h * h + m];
      return { kind, a, rel, cs, poly: polyText(cs), roots: [] };
    }
    if (kind === 'double') {
      const r = nz(rng, -4, 4);
      const cs = [a, -2 * a * r, a * r * r];
      return { kind, a, rel, cs, poly: polyText(cs), roots: [q(r)], factored: `${a === 1 ? '' : a === -1 ? '-' : a}(${lin(r)})^2` };
    }
    const r1 = q(rng.int(-10, 9), rng.pick([1, 2, 2]));
    const r2 = q(rng.int(-10, 10), rng.pick([1, 1, 2]));
    if (r1.cmp(r2) >= 0 || Math.abs(r1.valueOf()) > 5 || Math.abs(r2.valueOf()) > 5) continue;
    const b = r1.add(r2).mul(q(-a));
    const c = r1.mul(r2).mul(q(a));
    if (b.d !== 1 || c.d !== 1 || (r1.d === 2 && r2.d === 2 && Math.abs(a) < 4)) continue;
    const cs = [a, b.n, c.n];
    const lead = a === 1 ? '' : a === -1 ? '-' : String(a);
    const facs = [r1, r2].sort((u, w) => (u.n === 0 ? -1 : w.n === 0 ? 1 : 0)).map((r) => (r.n === 0 ? 'x' : `(${lin(r)})`)).join('');
    return { kind, a, rel, cs, poly: polyText(cs), roots: [r1, r2], factored: `${lead}${facs}` };
  }
  return null;
}

// The sign step: « −1 ≤ x ≤ 3/2 » or « x < −1 ou x > 3/2 ».
function triSignLine(d) {
  const [r1, r2] = d.roots;
  const inside = (d.a > 0) === (d.rel === '<' || d.rel === '≤');
  const s = STRICT[d.rel];
  if (inside) return `${N(r1)}${s ? '<' : '≤'}x${s ? '<' : '≤'}${N(r2)}`;
  return `x${s ? '<' : '≤'}${N(r1)}∨x${s ? '>' : '≥'}${N(r2)}`;
}

const deltaText = (cs) => `${paren(cs[1])}^2-4×${paren(cs[0])}×${paren(cs[2])}`;
const deltaOf = (cs) => cs[1] * cs[1] - 4 * cs[0] * cs[2];

function triItem(level, rng, opts = {}) {
  let kind = 'two';
  if (level === 4 && rng.chance(0.25)) kind = rng.pick(['none', 'double']);
  const d = triData(rng, kind);
  const start = `${d.poly}${d.rel}0`;
  const S = setText(setOf(start));
  const judge = { kind: 'solset', v: V };
  let lines;
  if (kind === 'none') lines = [E(S, t('Δ = {delta} < 0 : le trinôme a partout le signe de a = {a}', { delta: fr(String(deltaOf(d.cs))), a: fr(String(d.a)) }), 'sign', 'write')];
  else if (kind === 'double') lines = [E(`${d.factored}${d.rel}0`, t('Δ = 0 : une racine double'), 'roots', 'roots'), E(S, t('Un carré est ≥ 0'), 'sign', 'write')];
  else {
    lines = [
      E(`${d.factored}${d.rel}0`, t('Racines {r1} et {r2}', { r1: fr(N(d.roots[0])), r2: fr(N(d.roots[1])) }), 'roots', 'roots'),
      E(triSignLine(d), d.a > 0 ? t('a > 0 : négatif entre les racines, positif à l\'extérieur') : t('a < 0 : positif entre les racines, négatif à l\'extérieur'), 'sign', 'sign'),
      E(S, t('Écrire S'), 'write', 'write'),
    ];
  }
  let first = start;
  const script = [];
  // Level 5: put everything on one side first.
  if (level === 5) {
    // a x² + b x + c rel 0, written as a x² + (b + s)x + (c + t) rel s x + t.
    const s1 = nz(rng, -3, 3);
    const t1 = rng.int(-5, 5);
    const right = polyText([s1, t1]);
    const left = polyText([d.cs[0], d.cs[1] + s1, d.cs[2] + t1]);
    first = `${left}${d.rel}${right}`;
    script.push(E(start, t('Tout passer à gauche'), 'roots', 'move'));
  }
  const withDelta = level >= 2 && level <= 3 && kind === 'two';
  if (level === 1) {
    const inside = (d.a > 0) === (d.rel === '<' || d.rel === '≤');
    script.push({ kind: 'note', html: t('Les racines de {p} sont {r1} et {r2}.', { p: MT(d.poly), r1: fr(N(d.roots[0])), r2: fr(N(d.roots[1])) }) });
    script.push({ kind: 'decision', prompt: d.rel === '<' || d.rel === '≤' ? t('Où {p} est-il négatif ?', { p: RT(d.poly) }) : t('Où {p} est-il positif ?', { p: RT(d.poly) }), options: [
      { id: 'in', label: t('Entre les racines'), valid: inside, rule: inside ? undefined : 'g1_trinome_sign_swap', why: t('a = {a} : entre les racines, le trinôme a le signe de −a.', { a: fr(String(d.a)) }) },
      { id: 'out', label: t('À l\'extérieur des racines'), valid: !inside, rule: inside ? 'g1_trinome_sign_swap' : undefined, why: t('a = {a} : à l\'extérieur des racines, le trinôme a le signe de a.', { a: fr(String(d.a)) }) },
    ] });
    script.push(blanked(lines[2], d.roots.map((r) => N(r))));
  } else if (level === 2) {
    script.push(blanked(lines[0], d.roots.map((r) => N(r))), lines[1], lines[2]);
  } else script.push(...lines);
  const deltaSeg = { kind: 'value', expect: String(deltaOf(d.cs)) };
  const segs = [];
  let mainStart = first;
  let mainScript = script;
  if (withDelta) {
    segs.push({ kind: 'segment', html: t('Résous {e}.', { e: MT(start) }), start: { math: first }, judge: withMenus(judge, level, first, lines, TRI_CHOICES) }, ...script);
    mainStart = deltaText(d.cs);
    mainScript = [E(String(deltaOf(d.cs)), 'Δ = b² − 4ac', 'delta')];
  }
  return linesItem({
    skill: TRI, level, prompt: t('Résous dans ℝ : {e}.', { e: MT(first) }),
    start: mainStart, judge: withDelta ? deltaSeg : withMenus(judge, level, first, level === 5 ? script : lines, TRI_CHOICES), mode: modeOf(level),
    script: [...mainScript, ...segs],
    hints: H(t('Le trinôme a le signe de a à l\'extérieur des racines, le signe contraire entre elles.'), kind === 'two' ? MT(`${d.factored}${d.rel}0`) : `Δ = ${deltaOf(d.cs)}`, MT(lines[lines.length - 1].math)),
    subgoals: TRI_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${TRI}:${level}:${first}`, exam: examOf(opts),
  });
}

function triExam(rng, exam) {
  if (exam === 'tf') {
    const bank = [
      { s: 'x² + x + 1 > 0 pour tout x ∈ ℝ.', truth: true, why: t('Vrai : Δ = −3 < 0 et a = 1 > 0.') },
      { s: '−x² + 4x − 5 < 0 pour tout x ∈ ℝ.', truth: true, why: t('Vrai : Δ = −4 < 0 et a = −1 < 0.') },
      { s: 'x² − 3x + 2 > 0 pour tout x ∈ ℝ.', truth: false, pred: 'x^2-3x+2>0', ans: '3/2', why: t('Faux : entre les racines 1 et 2, le trinôme est négatif. En x = 3/2 : −1/4.'), rule: 'g1_trinome_sign_swap' },
      { s: 'x² ≥ 4 équivaut à x ≥ 2.', truth: false, pred: 'x^2≥4⇒x≥2', hyp: 'x^2≥4', ans: '-3', why: t('Faux : x = −3 vérifie x² ≥ 4. S = ]−∞ ; −2] ∪ [2 ; +∞[.') },
      { s: '2x² − 8x + 8 ≤ 0 n\'a qu\'une solution.', truth: true, why: t('Vrai : 2(x − 2)² ≤ 0 seulement pour x = 2.') },
    ];
    const b = rng.pick(bank);
    const counter = b.truth ? null : { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: b.pred, ...(b.hyp ? { hyp: b.hyp } : {}), ask: [{ v: 'x', label: 'x =' }], answer: { x: b.ans } };
    return tfItem({ skill: TRI, level: 4, statement: t(b.s), truth: b.truth, counter, ruleIfTrue: b.rule || null, key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 } });
  }
  const d = triData(rng);
  const start = `${d.poly}${d.rel}0`;
  const S = setText(setOf(start));
  const swap = { '≥': '≤', '>': '≤', '≤': '≥', '<': '≥' };
  const options = [
    { html: MT(S), correct: true },
    { html: MT(setText(setOf(`${d.poly}${swap[d.rel]}0`))), correct: false, rule: 'g1_trinome_sign_swap' },
    { html: MT(setText(setOf(`${d.poly}${{ '≥': '>', '>': '≥', '≤': '<', '<': '≤' }[d.rel]}0`))), correct: false, rule: 'g9_bracket' },
    { html: MT(`{${N(d.roots[0])};${N(d.roots[1])}}`), correct: false },
  ];
  return mcq({
    skill: TRI, level: 4, prompt: t('Ensemble des solutions de {e} :', { e: MT(start) }), options: uniq(options), key: `mcq:${start}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `${MT(`${d.factored}${d.rel}0`)} : ${MT(S)}`, note: '' }],
  }, rng);
}


// ======================================================================
// g1-sign-table
// ======================================================================

const SGN = 'g1-sign-table';
const SGN_SUB = [
  { id: 'bounds', label: t('zéros et valeurs interdites'), skill: SGN },
  { id: 'rows', label: t('signe de chaque facteur'), skill: TRI },
  { id: 'read', label: t('lire l\'ensemble'), skill: 'g9-intervals' },
];

// 2 to 4 factors x − r or r − x, one squared half of the time, one in the
// denominator; roots whole and distinct in [−4 ; 4].
function sgnData(rng, level) {
  for (let i = 0; i < 200; i++) {
    const n = level >= 4 ? rng.int(3, 4) : rng.int(2, 3);
    const roots = [];
    while (roots.length < n) { const r = rng.int(-4, 4); if (!roots.includes(r)) roots.push(r); }
    roots.sort((u, w) => u - w);
    const even = rng.chance(0.5) ? rng.int(0, n - 1) : -1;
    const den = rng.chance(0.7) ? rng.int(0, n - 1) : -1;
    if (den === even && den >= 0 && rng.chance(0.5)) continue;
    const factors = roots.map((r, k) => {
      const flip = k !== even && rng.chance(0.33);
      const base = flip ? (r === 0 ? '-x' : `${r}-x`) : lin(r);
      const f = k === even ? (base === 'x' ? 'x^2' : `(${base})^2`) : base;
      return { id: `f${k}`, r, f, den: k === den, even: k === even, label: RT(f) };
    });
    const num = factors.filter((f) => !f.den);
    if (!num.length) continue;
    const prod = (fs) => fs.map((f) => (f.f.includes('^') || f.f === 'x' || fs.length === 1 ? f.f : `(${f.f})`)).join('');
    const numT = prod(num);
    const denF = factors.filter((f) => f.den);
    const expr = denF.length ? `${numT === 'x' || numT === 'x^2' ? numT : `(${numT})`}/(${prod(denF)})` : numT;
    const rel = rng.pick(['≥', '>', '≤', '<']);
    const S = setOf(`${expr}${rel}0`);
    if (!S.parts.length) continue;
    const bounds = [...roots].sort((a, b) => a - b);
    return { factors, expr, rel, S, Stext: setText(S), bounds };
  }
  return null;
}

const signOf = (val) => (val.n === 0 ? '0' : val.n > 0 ? '+' : '−');
function factorSigns(f, bounds) {
  const pts = [];
  for (let j = 0; j <= 2 * bounds.length; j++) {
    if (j % 2 === 1) pts.push(q(bounds[(j - 1) / 2]));
    else {
      const k = j / 2;
      pts.push(k === 0 ? q(bounds[0] - 1) : k === bounds.length ? q(bounds[bounds.length - 1] + 1) : q(bounds[k - 1] + bounds[k], 2));
    }
  }
  return pts.map((x) => signOf(exactValue(parse(f.f.replace(/x/g, `(${N(x)})`)))));
}

function sgnTable(level, rng, opts = {}) {
  const d = sgnData(rng, level);
  const m = d.bounds.length;
  const ncol = 2 * m + 1;
  const boundsInput = level >= 3;
  const cols = Array.from({ length: ncol }, (_, j) => (j % 2 ? (boundsInput ? '·' : fr(String(d.bounds[(j - 1) / 2]))) : ''));
  const rows = [];
  const answers = {};
  if (boundsInput) {
    rows.push({ id: 'bounds', label: 'x', cells: cols.map((_, j) => (j % 2 ? { input: true } : null)) });
    answers.bounds = cols.map((_, j) => (j % 2 ? String(d.bounds[(j - 1) / 2]) : null));
  }
  for (const f of d.factors) {
    const signs = factorSigns(f, d.bounds);
    const given = level === 1;
    rows.push({ id: f.id, label: f.den ? t('{f} (dén.)', { f: f.label }) : f.label, cells: signs.map((s) => (given ? { given: s } : { input: true, kind: 'sign' })) });
    answers[f.id] = signs.map((s) => (given ? null : s));
    f.signs = signs;
  }
  const fSigns = cols.map((_, j) => {
    if (d.factors.some((f) => f.den && f.signs[j] === '0')) return '‖';
    if (d.factors.some((f) => f.signs[j] === '0')) return '0';
    return d.factors.filter((f) => f.signs[j] === '−').length % 2 ? '−' : '+';
  });
  rows.push({ id: 'f', label: 'f(x)', cells: fSigns.map(() => ({ input: true, kind: 'sign' })) });
  answers.f = fSigns;
  const then = linesItem({
    skill: SGN, level, prompt: t('Lis le tableau : résous {e}.', { e: MT(`${d.expr}${d.rel}0`) }),
    start: `${d.expr}${d.rel}0`, judge: { kind: 'solset', v: V }, mode: 'free', noHints: true,
    script: [E(d.Stext, t('Lire le tableau'), 'read')], hints: [], subgoals: SGN_SUB, keys: KEYS,
    key: `${SGN}:then:${d.expr}${d.rel}`, exam: examOf(opts),
  });
  const hasEven = d.factors.some((f) => f.even);
  const line = (sig) => sig.join(' ');
  return tableItem({
    skill: SGN, level,
    prompt: boundsInput
      ? t('Tableau de signes de f(x) = {f}. Place d\'abord les zéros et les valeurs interdites dans l\'ordre (ligne x). Touche une case pour choisir + , − , 0 ou ‖.', { f: MU(d.expr) })
      : t('Tableau de signes de f(x) = {f}. Touche une case pour choisir + , − , 0 ou ‖.', { f: MU(d.expr) }),
    table: { cols, rows }, phi: { kind: 'signs', v: V, bounds: d.bounds.map(String), factors: d.factors.map((f) => ({ id: f.id, f: f.f, den: f.den, even: f.even })) },
    answers, then,
    hints: H(t('Une ligne par facteur : il change de signe en sa racine, sauf s\'il est au carré. ‖ sous une valeur interdite.'), `${d.factors[0].label} : ${line(d.factors[0].signs)}`, `f(x) : ${line(fSigns)}`),
    baits: hasEven ? ['g1_sign_even_root'] : [],
    subgoals: SGN_SUB, key: `${d.expr}:${level}`, exam: examOf(opts),
    solution: [...d.factors.map((f) => ({ html: `${f.label} : ${line(f.signs)}`, note: '' })), { html: `f(x) : ${line(fSigns)}`, note: t('Règle des signes') }, { html: MT(d.Stext), note: `f(x) ${d.rel} 0` }],
    noHints: level === 5 || !!opts.exam,
  });
}

// Level 5: an inequality to factor first (the sign table is the tool).
function sgnLevel5(rng, opts) {
  for (let i = 0; i < 100; i++) {
    const rs = [];
    while (rs.length < 3) { const r = rng.int(-4, 4); if (!rs.includes(r)) rs.push(r); }
    rs.sort((a, b) => a - b);
    const cs = [1, -(rs[0] + rs[1] + rs[2]), rs[0] * rs[1] + rs[0] * rs[2] + rs[1] * rs[2], -rs[0] * rs[1] * rs[2]];
    if (cs.some((c) => Math.abs(c) > 30)) continue;
    const rel = rng.pick(['≥', '>', '≤', '<']);
    const start = `${polyText(cs)}${rel}0`;
    const fac = rs.map((r) => (r === 0 ? 'x' : `(${lin(r)})`)).join('');
    const S = setText(setOf(start));
    return linesItem({
      skill: SGN, level: 5, prompt: t('Résous dans ℝ : {e}.', { e: MT(start) }),
      start, judge: { kind: 'solset', v: V }, mode: 'free',
      script: [E(`${fac}${rel}0`, t('Factoriser (racine évidente)'), 'bounds'), E(S, t('Tableau de signes, puis lire'), 'read')],
      hints: [], subgoals: [...SGN_SUB, { id: 'factor', label: t('factoriser'), skill: 'fac-complete' }], keys: KEYS,
      key: `${SGN}:5:${start}`, exam: examOf(opts, 3),
    });
  }
  return null;
}

function sgnMcq(rng) {
  let d;
  for (let i = 0; i < 50; i++) { d = sgnData(rng, 3); if (d.factors.some((f) => f.even) && d.factors.some((f) => f.den)) break; }
  const start = `${d.expr}${d.rel}0`;
  const options = [{ html: MT(d.Stext), correct: true }];
  const ev = d.factors.find((f) => f.even);
  if (ev) {
    const odd = d.expr.replace(ev.f, ev.f.replace(/\^2$/, ''));
    try { options.push({ html: MT(setText(setOf(`${odd}${d.rel}0`))), correct: false, rule: 'g1_sign_even_root' }); } catch { /* skip */ }
  }
  const pole = d.factors.find((f) => f.den);
  if (pole) options.push({ html: MT(setText(union(d.S, setOf(`{${pole.r}}`)))), correct: false });
  const strict = { '≥': '>', '>': '≥', '≤': '<', '<': '≤' }[d.rel];
  options.push({ html: MT(setText(setOf(`${d.expr}${strict}0`))), correct: false, rule: 'g9_bracket' });
  return mcq({
    skill: SGN, level: 4, prompt: t('Ensemble des solutions de {e} :', { e: MT(start) }), options: uniq(options).slice(0, 4), key: `mcq:${start}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: t('Tableau de signes : {s}', { s: MT(d.Stext) }), note: '' }],
  }, rng);
}


// ======================================================================
// g1-parity-period
// ======================================================================

const PAR = 'g1-parity-period';
const PAR_SUB = [
  { id: 'domain', label: t('domaine symétrique'), skill: DOM },
  { id: 'fmx', label: t('calculer f(−x)'), skill: PAR },
  { id: 'counter', label: t('contre-exemple'), skill: 'g9-counterexample' },
  { id: 'period', label: t('période'), skill: 'g3-reduce' },
];
const PAR_CHOICES = [
  { id: 'subst', label: t('Calculer f(−x) : remplacer x par −x') },
  { id: 'simplify', label: t('Simplifier f(−x)') },
  { id: 'test', label: t('Tester une valeur') },
  { id: 'domain', label: t('Vérifier le domaine') },
];
const PARITY = { even: t('paire'), odd: t('impaire'), none: t('ni paire ni impaire') };

// A bank of functions: f, f(−x) simplified, parity.
function parBank(rng) {
  const a = rng.int(2, 5);
  const b = rng.int(1, 6);
  const c = nz(rng, -4, 4);
  return [
    { f: `x^4-${a}x^2+${b}`, fm: `x^4-${a}x^2+${b}`, kind: 'even' },
    { f: `|x|+${b}`, fm: `|x|+${b}`, kind: 'even' },
    { f: `x^2×|x|`, fm: `x^2×|x|`, kind: 'even' },
    { f: `x×sin(x)`, fm: `x×sin(x)`, kind: 'even' },
    { f: `cos(${a}x)+x^2`, fm: `cos(${a}x)+x^2`, kind: 'even' },
    { f: `${a}/(x^2+${b})`, fm: `${a}/(x^2+${b})`, kind: 'even' },
    { f: `x^3-${a}x`, fm: `-x^3+${a}x`, kind: 'odd' },
    { f: 'x×|x|', fm: '-x×|x|', kind: 'odd' },
    { f: `x/(x^2+${b})`, fm: `-x/(x^2+${b})`, kind: 'odd' },
    { f: `sin(${a}x)+x`, fm: `-sin(${a}x)-x`, kind: 'odd' },
    { f: `x^5+${a}x^3`, fm: `-x^5-${a}x^3`, kind: 'odd' },
    { f: 'x×cos(x)', fm: '-x×cos(x)', kind: 'odd' },
    { f: `x^3+${a}x^2`, fm: `-x^3+${a}x^2`, kind: 'none' },
    { f: polyText([1, c, 0]), fm: polyText([1, -c, 0]), kind: 'none' },
    { f: `x^3-x+${b}`, fm: `-x^3+x+${b}`, kind: 'none' },
    { f: `x^2+${a}x+${b}`, fm: `x^2-${a}x+${b}`, kind: 'none' },
  ];
}

// A value x₀ where f(−x₀) is neither f(x₀) nor −f(x₀).
function witness(f) {
  const node = parse(f);
  for (const x of [1, 2, 3]) {
    const u = evalFloat(node, { x });
    const w = evalFloat(node, { x: -x });
    if (Math.abs(u - w) > 1e-9 && Math.abs(u + w) > 1e-9 && Number.isInteger(u) && Number.isInteger(w)) return x;
  }
  return null;
}

function parData(rng, kinds) {
  for (let i = 0; i < 100; i++) {
    const e = rng.pick(parBank(rng).filter((x) => kinds.includes(x.kind)));
    if (e.kind === 'none' && !witness(e.f)) continue;
    return { ...e, raw: subst(e.f, '-x'), x0: e.kind === 'none' ? witness(e.f) : null };
  }
  return null;
}

// Periods of sin(ax) + cos(bx), in units of π.
const gcdI = (a, b) => (b ? gcdI(b, a % b) : Math.abs(a));
const piText = (k) => (k.d === 1 ? (k.n === 1 ? 'π' : `${k.n}π`) : `${k.n === 1 ? '' : k.n}π/${k.d}`);
function perData(rng) {
  for (let i = 0; i < 100; i++) {
    const [a, b] = [rng.pick([q(1), q(2), q(3), q(4), q(1, 2)]), rng.pick([q(1), q(2), q(3), q(4), q(1, 2)])];
    if (a.eq(b)) continue;
    const p1 = q(2).div(a);
    const p2 = q(2).div(b);
    const T = new Q((p1.n * p2.n) / gcdI(p1.n, p2.n), gcdI(p1.d, p2.d));
    const arg = (k) => (k.eq(1) ? 'x' : k.d === 1 ? `${k.n}x` : 'x/2');
    return { a, b, p1, p2, T, f: `sin(${arg(a)})+cos(${arg(b)})`, s1: `sin(${arg(a)})`, s2: `cos(${arg(b)})` };
  }
  return null;
}

function perItem(level, rng, opts) {
  const d = perData(rng);
  const val = (e) => ({ kind: 'value', form: 'exact', expect: e });
  const script = [
    E(piText(d.p1), t('Période de {f} : 2π/|a|', { f: RT(d.s1) }), 'period'),
    { kind: 'segment', html: t('Période de {f} :', { f: MT(d.s2) }), ask: 'T₂ =', start: { math: 'T_2' }, judge: val(piText(d.p2)) },
    E(piText(d.p2), t('Période : 2π/|b|'), 'period'),
    { kind: 'segment', html: t('Plus petite période commune :'), ask: 'T =', start: { math: 'T' }, judge: val(piText(d.T)) },
    E(piText(d.T), t('Le plus petit nombre qui est un multiple des deux périodes'), 'period'),
  ];
  return linesItem({
    skill: PAR, level, prompt: t('Trouve la plus petite période de f(x) = {f}.', { f: MT(d.f) }), start: 'T_1', judge: val(piText(d.p1)), mode: level <= 2 ? 'guided' : 'free', script,
    hints: H(t('La période de sin(ax) et de cos(ax) est 2π/|a|. Une somme a pour période le plus petit multiple commun.'), t('{a} et {b}', { a: piText(d.p1), b: piText(d.p2) }), piText(d.T)),
    subgoals: PAR_SUB, keys: [...KEYS, 'trig'], key: `${PAR}:per:${d.f}`, exam: examOf(opts),
  });
}

function parItem(level, rng, opts = {}) {
  if ((level === 4 && rng.chance(0.4)) || (level === 5 && rng.chance(0.5))) return perItem(level, rng, opts);
  if (level === 1) return parMcq1(rng);
  const kinds = level === 5 ? ['none', 'odd'] : level === 2 ? ['even', 'odd'] : ['even', 'odd', 'none'];
  const d = parData(rng, kinds);
  const defs = { f: d.f };
  const judge = { kind: 'equiv', vars: [V], funcs: ['f'], defs, domain: { x: [0.3, 2.5] }, target: 'short', goal: d.fm, slack: 0 };
  const lines = [E(d.raw, t('Remplacer x par −x'), 'fmx', 'subst')];
  if (toText(unparen(parse(d.raw))) !== toText(unparen(parse(d.fm)))) lines.push(E(d.fm, t('Simplifier'), 'fmx', 'simplify'));
  if (level === 2) lines[0] = blanked(lines[0], ['-x']);
  const script = [...lines];
  const decision = { kind: 'decision', prompt: t('Donc f est :'), options: [
    { id: 'even', label: t('paire'), valid: d.kind === 'even', why: d.kind === 'odd' ? t('f(−x) = −f(x) : c\'est la définition d\'une fonction impaire.') : t('f(−x) n\'est pas égal à f(x) pour tout x.') },
    { id: 'odd', label: t('impaire'), valid: d.kind === 'odd', why: d.kind === 'even' ? t('f(−x) = f(x) : c\'est la définition d\'une fonction paire.') : t('f(−x) n\'est pas égal à −f(x) pour tout x.') },
    { id: 'none', label: t('ni paire ni impaire'), valid: d.kind === 'none', why: t('Compare f(−x) avec f(x) et avec −f(x).') },
  ] };
  if (d.kind === 'none') {
    const x0 = d.x0;
    script.push(
      { kind: 'segment', html: t('Contre-exemple : calcule f({x}) et f(−{x}).', { x: x0 }), ask: `f(${x0}) =`, start: { math: subst(d.f, String(x0)) }, judge: { kind: 'value' } }, decision,
      E(N(evalFloat(parse(d.f), { x: x0 })), `f(${x0})`, 'counter'),
      { kind: 'segment', html: '', ask: `f(−${x0}) =`, start: { math: subst(d.f, `-${x0}`) }, judge: { kind: 'value' } },
      E(N(evalFloat(parse(d.f), { x: -x0 })), t('f(−{x}) n\'est ni f({x}) ni −f({x})', { x: x0 }), 'counter'),
    );
  } else {
    const comb = d.kind === 'even' ? 'f(-x)-f(x)' : 'f(-x)+f(x)';
    script.push({ kind: 'segment', html: d.kind === 'even' ? t('Vérifie : f(−x) − f(x) =') : t('Vérifie : f(−x) + f(x) ='), ask: d.kind === 'even' ? 'f(−x) − f(x) =' : 'f(−x) + f(x) =', start: { math: comb }, judge: { kind: 'equiv', vars: [V], funcs: ['f'], defs, domain: { x: [0.3, 2.5] }, target: 'constant' } }, decision, E('0', t('Pour tout x : f est {p}', { p: PARITY[d.kind] }), 'fmx'));
  }
  return linesItem({
    skill: PAR, level, prompt: t('f(x) = {f}, définie sur ℝ. Calcule f(−x), puis dis si f est paire, impaire ou ni l\'une ni l\'autre.', { f: MU(d.f) }),
    start: 'f(-x)', judge: withMenus(judge, level, 'f(-x)', lines, PAR_CHOICES), mode: modeOf(level), script,
    declares: { vars: [V], funcs: ['f'] },
    hints: H(t('Calcule f(−x) et compare à f(x) et à −f(x).'), MT(d.raw), MT(d.fm)),
    subgoals: PAR_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${PAR}:${level}:${d.f}`, exam: examOf(opts),
  });
}

// Level 1: f(−x) is computed; the student compares.
function parMcq1(rng) {
  const nonSym = rng.chance(0.2);
  if (nonSym) {
    const a = rng.int(1, 4);
    const f = rng.pick([`x^2/(x-${a})`, `sqrt(x)+x^2`, `x^3/(x+${a})`]);
    return mcq({
      skill: PAR, level: 1, prompt: t('f(x) = {f}. f est :', { f: MU(f) }),
      options: [
        { html: t('ni paire ni impaire : son domaine n\'est pas symétrique'), correct: true },
        { html: t('paire'), correct: false }, { html: t('impaire'), correct: false },
      ], key: `par1:${f}`, solution: [{ html: t('D_f = {d} n\'est pas symétrique par rapport à 0.', { d: MT(domText(f)) }), note: '' }],
    }, rng);
  }
  const d = parData(rng, ['even', 'odd', 'none']);
  return mcq({
    skill: PAR, level: 1, prompt: t('f(x) = {f} sur ℝ, et f(−x) = {fm}. f est :', { f: MU(d.f), fm: MU(d.fm) }),
    options: ['even', 'odd', 'none'].map((k) => ({ html: PARITY[k], correct: k === d.kind })), key: `par1:${d.f}`,
    solution: [{ html: `f(−x) = ${MU(d.fm)} ${d.kind === 'even' ? '= f(x)' : d.kind === 'odd' ? '= −f(x)' : t('n\'est ni f(x) ni −f(x)')}.`, note: '' }],
  }, rng);
}

function parExam(rng, exam) {
  if (exam === 'tf') {
    const a = rng.int(1, 3);
    const bank = [
      // s: the French statement, kept for the key; st: the statement shown.
      { s: `f(x) = x³ − ${a * a}x vérifie f(−${a}) = f(${a}). Donc f est paire.`, st: t('f(x) = x³ − {aa}x vérifie f(−{a}) = f({a}). Donc f est paire.', { aa: a * a, a }), truth: false, pred: `(-x)^3-${a * a}(-x)=x^3-${a * a}x`, ans: String(a + 1), why: t('Faux : une valeur ne suffit pas. f(−{b}) = {u} et f({b}) = {v}.', { b: a + 1, u: -((a + 1) ** 3 - a * a * (a + 1)), v: (a + 1) ** 3 - a * a * (a + 1) }), rule: 'g1_parity_point' },
      { s: 'x ↦ x·|x| est impaire.', truth: true, why: t('Vrai : (−x)·|−x| = −x·|x|.') },
      { s: 'x ↦ cos(x) + x est paire.', truth: false, pred: 'cos(-x)+(-x)=cos(x)+x', ans: '1', why: t('Faux : f(−1) = cos 1 − 1 ≠ cos 1 + 1 = f(1).') },
      { s: 'Une fonction impaire définie en 0 vérifie f(0) = 0.', truth: true, why: t('Vrai : f(0) = f(−0) = −f(0), donc f(0) = 0.') },
    ];
    const b = rng.pick(bank);
    const counter = b.truth ? null : { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: b.pred, ask: [{ v: 'x', label: 'x =' }], answer: { x: b.ans } };
    return tfItem({ skill: PAR, level: 4, statement: b.st ?? t(b.s), truth: b.truth, counter, ruleIfTrue: b.rule || null, key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 } });
  }
  const d = perData(rng);
  const max = d.p1.cmp(d.p2) > 0 ? d.p1 : d.p2;
  const min = d.p1.cmp(d.p2) > 0 ? d.p2 : d.p1;
  const options = [{ html: piText(d.T), correct: true }];
  for (const w of [max, min, d.p1.mul(d.p2)]) if (!w.eq(d.T)) options.push({ html: piText(w), correct: false, rule: 'g1_period_sum' });
  if (options.length < 3) options.push({ html: piText(d.T.mul(q(2))), correct: false });
  return mcq({
    skill: PAR, level: 4, prompt: t('Plus petite période de f(x) = {f} :', { f: MT(d.f) }), options: uniq(options), key: `mcq:${d.f}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: t('Périodes {a} et {b} ; plus petit multiple commun : {T}.', { a: piText(d.p1), b: piText(d.p2), T: piText(d.T) }), note: '' }],
  }, rng);
}


// ======================================================================
// g1-injective, g1-surjective: proofs in blocks
// ======================================================================

const INJ = 'g1-injective';
const SURJ = 'g1-surjective';
const AB = { vars: ['a', 'b'] };
const XY = { vars: ['x', 'y'] };
const sq = (c) => Math.round(Math.sqrt(c));

// Injectivity proofs: f(a) = f(b), a calculation, then a = b.
function injBank(rng) {
  const kind = rng.pick(['homog', 'square', 'man']);
  if (kind === 'homog') {
    for (;;) {
      const p = nz(rng, -3, 3);
      const qq = nz(rng, -5, 5);
      const r = nz(rng, -4, 4);
      if (p * r + qq === 0) continue;
      const num = affine(p, qq);
      const f = `(${num})/(${lin(r)})`;
      const fa = f.replace(/x/g, 'a');
      const fb = f.replace(/x/g, 'b');
      const k = p * r + qq;
      const A = `ℝ∖{${r}}`;
      return {
        kind, f, A, id: `h:${f}`,
        statement: t('f(x) = {f} est injective sur {A}', { f: MU(f), A: MT(A) }),
        steps: [
          t('Soient a, b ∈ {A} tels que {e}.', { A: MT(A), e: MT(`${fa}=${fb}`, AB) }),
          t('{e} (produit en croix)', { e: MT(`(${num.replace(/x/g, 'a')})(${lin(r).replace(/x/g, 'b')})=(${num.replace(/x/g, 'b')})(${lin(r).replace(/x/g, 'a')})`, AB) }),
          t('{e} (les termes en ab et les constantes s\'éliminent)', { e: MT(`${-p * r}a+${qq}b=${-p * r}b+${qq}a`.replace(/\+-/g, '-'), AB) }),
          t('{e}, et {k} ≠ 0, donc a = b.', { e: MT(`${k}(b-a)=0`, AB), k: fr(String(k)) }),
          t('Donc f est injective sur {A}.', { A: MT(A) }),
        ],
        inputs: [
          { at: 1, kind: 'rel', vars: ['a', 'b'], expect: `(${num.replace(/x/g, 'a')})(${lin(r).replace(/x/g, 'b')})=(${num.replace(/x/g, 'b')})(${lin(r).replace(/x/g, 'a')})`, ask: t('Produit en croix :'), answer: `(${num.replace(/x/g, 'a')})(${lin(r).replace(/x/g, 'b')})=(${num.replace(/x/g, 'b')})(${lin(r).replace(/x/g, 'a')})` },
          { at: 3, kind: 'rel', vars: ['a', 'b'], expect: `${k}(b-a)=0`, ask: t('Factorise :'), answer: `${k}(b-a)=0` },
        ],
        decoys: [
          { html: t('f(0) ≠ f(1), donc f est injective.'), rule: 'g9_proof_by_example', why: t('Deux valeurs ne prouvent pas un « pour tous a, b ».') },
          { html: t('Si a = b, alors f(a) = f(b) : f est injective.'), rule: 'g9_converse_contra', why: t('C\'est la réciproque : elle est vraie pour toute fonction. Il faut f(a) = f(b) ⇒ a = b.') },
        ],
        sub: { id: 'cross', label: t('produit en croix'), skill: 'eq-proportion' },
      };
    }
  }
  if (kind === 'square') {
    const h = rng.int(-3, 3);
    const p = -2 * h;
    const right = rng.chance(0.5);
    const f = polyText([1, p, 0]);
    const A = right ? `[${h};+∞[` : `]-∞;${h}]`;
    const fa = f.replace(/x/g, 'a');
    const fb = f.replace(/x/g, 'b');
    const s2 = polyText([1, p]).replace('x', 'a+b');
    return {
      kind, f, A, id: `s:${f}:${A}`,
      statement: t('f(x) = {f} est injective sur {A}', { f: MU(f), A: MT(A) }),
      steps: [
        t('Soient a, b ∈ {A} tels que {e}.', { A: MT(A), e: MT(`${fa}=${fb}`, AB) }),
        t('{e} (tout à gauche, puis factoriser)', { e: MT(`(a-b)(${s2})=0`, AB) }),
        t('Sur {A}, a {r} {h} et b {r} {h}, donc {s} {r} 0, avec égalité seulement si a = b = {h}.', { A: MT(A), r: right ? '≥' : '≤', h: fr(String(h)), s: MT(s2, AB) }),
        t('Dans les deux cas, a − b = 0 : a = b.'),
        t('Donc f est injective sur {A}.', { A: MT(A) }),
      ],
      inputs: [{ at: 1, kind: 'rel', vars: ['a', 'b'], expect: `(a-b)(${s2})=0`, ask: t('Tout à gauche et factorise :'), answer: `(a-b)(${s2})=0` }],
      decoys: [
        { html: t('{e}, donc a = b.', { e: MT(`(a-b)(${s2})=0`, AB) }), rule: 'g1_inj_square', why: t('Un produit nul : a = b <b>ou</b> {s} = 0. Il faut utiliser l\'ensemble {A} pour écarter le second cas.', { s: toReadable(parse(s2)), A: fr(A) }) },
        { html: t('f(0) ≠ f(1), donc f est injective.'), rule: 'g9_proof_by_example', why: t('Deux valeurs ne prouvent pas un « pour tous a, b ».') },
      ],
      sub: { id: 'factor', label: t('factoriser'), skill: 'fac-common' },
    };
  }
  const c = rng.pick([1, 4, 9]);
  const s = sq(c);
  const right = rng.chance(0.5);
  const f = `x+${c}/x`;
  const A = right ? `[${s};+∞[` : `]-∞;${-s}]`;
  return {
    kind: 'man', f, A, id: `m:${c}:${right}`,
    statement: t('f(x) = {f} est injective sur {A}', { f: MU(f), A: MT(A) }),
    steps: [
      t('Soient a, b ∈ {A} tels que {e}.', { A: MT(A), e: MT(`a+${c}/a=b+${c}/b`, AB) }),
      t('{e} (multiplier par ab, puis factoriser)', { e: MT(`(a-b)(ab-${c})=0`, AB) }),
      t('Sur {A}, a et b ont le même signe et |a|, |b| ≥ {s}, donc ab ≥ {c}, avec ab = {c} seulement si a = b = {v}.', { A: MT(A), s, c, v: fr(String(right ? s : -s)) }),
      t('Dans les deux cas, a − b = 0 : a = b.'),
      t('Donc f est injective sur {A}.', { A: MT(A) }),
    ],
    inputs: [{ at: 1, kind: 'rel', vars: ['a', 'b'], expect: `(a-b)(ab-${c})=0`, ask: t('Multiplie par ab et factorise :'), answer: `(a-b)(ab-${c})=0` }],
    decoys: [
      { html: t('{e}, donc a = b.', { e: MT(`(a-b)(ab-${c})=0`, AB) }), rule: 'g1_inj_square', why: t('Un produit nul : a = b <b>ou</b> ab = {c}. Il faut l\'ensemble de départ pour écarter ab = {c}.', { c }) },
      { html: t('f(0) ≠ f(1), donc f est injective.'), rule: 'g9_proof_by_example', why: t('f n\'est même pas définie en 0, et deux valeurs ne prouvent rien.') },
    ],
    sub: { id: 'factor', label: t('factoriser'), skill: 'fac-common' },
  };
}

// The proof with one block missing, two choices (level 1 of the scale).
function holeMcq(skill, pr, rng, k) {
  const shown = pr.steps.map((s, i) => (i === k ? '<b>…</b>' : s)).map((s) => `<div class="proof-line">${s}</div>`).join('');
  const d = pr.decoys[0];
  return mcq({
    skill, level: 1, prompt: t('Preuve : {s}.{shown}Quel bloc manque ?', { s: pr.statement, shown }),
    options: [{ html: pr.steps[k], correct: true }, { html: d.html, correct: false, rule: d.rule }],
    key: `hole:${pr.id}:${k}`, solution: pr.steps.map((s) => ({ html: s, note: '' })),
  }, rng);
}

function proofBlocks(skill, pr, level, rng, opts, extra = {}) {
  const withInput = level >= 4 || !!opts.exam;
  const blocks = pr.steps.map((html, i) => ({ id: `b${i}`, html, needs: i ? [`b${i - 1}`] : [] }));
  if (withInput) for (const inp of pr.inputs) blocks[inp.at].input = { ...inp };
  const n = level === 2 ? 1 : level >= 5 || opts.exam ? pr.decoys.length : 2;
  pr.decoys.slice(0, n).forEach((d, i) => blocks.push({ id: `d${i}`, html: d.html, needs: [], distractor: d.rule, why: d.why }));
  return blocksItem({
    skill, level: opts.exam ? 4 : level, mode: withInput ? 'frame' : 'order',
    prompt: withInput
      ? t('Montre que {s}. Touche les blocs dans l\'ordre de la preuve et complète les calculs.', { s: pr.statement })
      : t('Montre que {s}. Touche les blocs dans l\'ordre de la preuve.', { s: pr.statement }),
    blocks: rng.shuffle(blocks), goal: `b${pr.steps.length - 1}`, order: pr.steps.map((_, i) => `b${i}`),
    decision: extra.decision || null,
    hints: extra.hints, noHints: level === 5 || !!opts.exam,
    key: `${pr.id}:${level}`, exam: opts.exam ? { format: opts.exam, points: extra.points || 3 } : false,
    subgoals: extra.subgoals || [],
  });
}

function injItem(level, rng, opts = {}) {
  const pr = injBank(rng);
  if (level === 1) return holeMcq(INJ, pr, rng, pr.kind === 'homog' ? 3 : 1);
  if (level === 2 && pr.kind === 'homog' && rng.chance(0.5)) pr.decoys.reverse();
  const decision = level === 3 ? { prompt: t('f(x) = {f} est-elle injective sur {A} ?', { f: toReadable(parse(pr.f)), A: fr(pr.A) }), options: [
    { id: 'yes', label: t('Oui : je pars de f(a) = f(b)'), valid: true },
    { id: 'no', label: t('Non : je cherche a ≠ b avec f(a) = f(b)'), valid: false, why: t('Sur cet ensemble, f(a) = f(b) force a = b : elle est injective.') },
  ] } : null;
  return proofBlocks(INJ, pr, level, rng, opts, {
    decision,
    hints: [
      { level: 1, html: t('Pars de f(a) = f(b) et cherche à obtenir a = b.') },
      { level: 2, html: pr.steps[1] },
      { level: 3, html: pr.steps[2] },
    ],
    subgoals: [pr.sub],
  });
}

function injTf(rng) {
  const bank = [
    // s: the French statement, kept for the key; st: the statement shown.
    () => ({ s: `x ↦ x² est injective sur ${fr('[-1;2]')}.`, st: t('x ↦ x² est injective sur {A}.', { A: fr('[-1;2]') }), f: 'a^2', g: 'b^2', A: '[-1;2]', ans: { a: '-1', b: '1' }, why: t('Faux : f(−1) = f(1) = 1 avec −1 ≠ 1.'), rule: 'g1_inj_square' }),
    () => {
      const h = rng.int(-2, 2);
      const d = rng.int(1, 2);
      const A = `[${h - d - 1};${h + d + 1}]`;
      const f = polyText([1, -2 * h, 0]);
      return { s: `x ↦ ${toReadable(parse(f))} est injective sur ${fr(A)}.`, st: t('x ↦ {f} est injective sur {A}.', { f: toReadable(parse(f)), A: fr(A) }), f: f.replace(/x/g, 'a'), g: f.replace(/x/g, 'b'), A, ans: { a: String(h - d), b: String(h + d) }, why: t('Faux : f({a}) = f({b}), deux points symétriques par rapport à {h}.', { a: h - d, b: h + d, h }), rule: 'g1_inj_square' };
    },
    () => ({ s: 'x ↦ x³ est injective sur ℝ.', truth: true, why: t('Vrai : a³ = b³ ⇒ (a − b)(a² + ab + b²) = 0, et a² + ab + b² > 0 sauf si a = b = 0.') }),
    () => ({ s: 'x ↦ (2x + 1)/(x − 3) est injective sur ℝ ∖ {3}.', truth: true, why: t('Vrai : f(a) = f(b) donne 7(b − a) = 0.') }),
    () => ({ s: 'x ↦ |x − 1| est injective sur [0 ; 3].', f: '|a-1|', g: '|b-1|', A: '[0;3]', ans: { a: '0', b: '2' }, why: t('Faux : f(0) = f(2) = 1.') }),
  ];
  const b = rng.pick(bank)();
  const counter = b.truth ? null : {
    kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R' }, { q: '∀', v: 'b', dom: 'R' }],
    pred: `(a∈${b.A}∧b∈${b.A}∧${b.f}=${b.g})⇒a=b`, hyp: `a∈${b.A}∧b∈${b.A}∧${b.f}=${b.g}`,
    ask: [{ v: 'a', label: 'a =' }, { v: 'b', label: 'b =' }], answer: b.ans,
  };
  return tfItem({ skill: INJ, level: 4, statement: b.st ?? t(b.s), truth: !!b.truth, counter, ruleIfTrue: b.rule || null, key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 } });
}

// Surjectivity proofs: y in B, an antecedent x, and x in A.
function surjBank(rng) {
  if (rng.chance(0.55)) {
    const c = rng.pick([1, 4]);
    const s = sq(c);
    const m = 2 * s;
    const right = rng.chance(0.6);
    const A = right ? `[${s};+∞[` : `]-∞;${-s}]`;
    const B = right ? `[${m};+∞[` : `]-∞;${-m}]`;
    const sg = right ? '+' : '-';
    const inv = `(x${sg}sqrt(x^2-${4 * c}))/2`;
    return {
      kind: 'man', f: `x+${c}/x`, A, B, id: `sm:${c}:${right}`,
      statement: t('f : {A} → {B}, f(x) = {f} est surjective, et explicite f⁻¹', { A: MT(A), B: MT(B), f: MU(`x+${c}/x`) }),
      steps: [
        t('Soit y {r} {v}. On cherche x ∈ {A} avec {e}.', { r: right ? '≥' : '≤', v: fr(String(right ? m : -m)), A: MT(A), e: MT(`x+${c}/x=y`, XY) }),
        t('{e} (multiplier par x ≠ 0)', { e: MT(`x^2-yx+${c}=0`, XY) }),
        t('Δ = {d} ≥ 0, car |y| ≥ {m}.', { d: MT(`y^2-${4 * c}`, XY), m }),
        t('{a} ou {b}.', { a: MT(`x=(y+sqrt(y^2-${4 * c}))/2`, XY), b: MT(`x=(y-sqrt(y^2-${4 * c}))/2`, XY) }),
        t('{e} {r} y/2 {r} {v} : cette solution est dans {A}.', { e: MT(`(y${sg}sqrt(y^2-${4 * c}))/2`, XY), r: right ? '≥' : '≤', v: fr(String(right ? s : -s)), A: MT(A) }),
        t('Donc f est surjective ; elle est aussi injective, donc bijective.'),
        `f⁻¹(x) = ${MU(inv)}, x ∈ ${MT(B)}.`,
      ],
      inputs: [
        { at: 1, kind: 'rel', vars: ['x', 'y'], expect: `x^2-yx+${c}=0`, ask: t('Équation en x :'), answer: `x^2-yx+${c}=0` },
        { at: 2, kind: 'expr', vars: ['y'], expect: `y^2-${4 * c}`, ask: 'Δ =', answer: `y^2-${4 * c}` },
      ],
      decoys: [
        { html: t('Δ ≥ 0 : une solution existe, donc f est surjective.'), rule: 'g1_surj_domain', why: t('Une solution existe, mais est-elle dans {A} ? Il faut un antécédent dans l\'ensemble de départ.', { A: fr(A) }) },
        { html: `f⁻¹(x) = ${MU(`(x${right ? '-' : '+'}sqrt(x^2-${4 * c}))/2`)}.`, rule: 'g1_inverse_branch', why: t('Cette racine n\'est pas dans {A}.', { A: fr(A) }) },
        { html: `f⁻¹(x) = ${MU(`1/(x+${c}/x)`)}.`, rule: 'g1_inverse_reciprocal', why: t('f⁻¹ n\'est pas 1/f.') },
      ],
      choices: [B, right ? `[${s};+∞[` : `]-∞;${-s}]`, 'ℝ'],
      disc: true,
    };
  }
  for (;;) {
    const p = nz(rng, -3, 3);
    const qq = nz(rng, -5, 5);
    const r = nz(rng, -4, 4);
    if (p * r + qq === 0) continue;
    const f = `(${affine(p, qq)})/(${lin(r)})`;
    const A = `ℝ∖{${r}}`;
    const B = `ℝ∖{${p}}`;
    const top = affY(r, qq);
    const bot = affY(1, -p);
    return {
      kind: 'homog', f, A, B, id: `sh:${f}`,
      statement: t('f : {A} → {B}, f(x) = {f} est surjective, et explicite f⁻¹', { A: MT(A), B: MT(B), f: MU(f) }),
      steps: [
        t('Soit y ≠ {p}. On cherche x ≠ {r} avec {e}.', { p: fr(String(p)), r: fr(String(r)), e: MT(`${f}=y`, XY) }),
        `${MT(`y(${lin(r)})=${affine(p, qq)}`, XY)}`,
        `${MT(`x(${bot})=${top}`, XY)}`,
        t('y ≠ {p}, donc {e}.', { p: fr(String(p)), e: MT(`x=(${top})/(${bot})`, XY) }),
        t('x ≠ {r} : sinon {e}, soit {k} = 0, impossible. La solution est dans {A}.', { r: fr(String(r)), e: MT(`${top}=${r}(${bot})`, XY), k: fr(String(p * r + qq)), A: MT(A) }),
        t('Donc f est surjective ; elle est aussi injective, donc bijective.'),
        `f⁻¹(x) = ${MU(`(${top.replace(/y/g, 'x')})/(${bot.replace(/y/g, 'x')})`)}, x ≠ ${fr(String(p))}.`,
      ],
      inputs: [
        { at: 1, kind: 'rel', vars: ['x', 'y'], expect: `y(${lin(r)})=${affine(p, qq)}`, ask: t('Multiplie par le dénominateur :'), answer: `y(${lin(r)})=${affine(p, qq)}` },
        { at: 2, kind: 'rel', vars: ['x', 'y'], expect: `x(${bot})=${top}`, ask: t('Regroupe les termes en x :'), answer: `x(${bot})=${top}` },
      ],
      decoys: [
        { html: t('On trouve une solution x, donc f est surjective.'), rule: 'g1_surj_domain', why: t('Cette solution est-elle différente de {r} ? Il faut un antécédent dans l\'ensemble de départ.', { r: fr(String(r)) }) },
        { html: `f⁻¹(x) = ${MU(`(${lin(r)})/(${affine(p, qq)})`)}.`, rule: 'g1_inverse_reciprocal', why: t('f⁻¹ n\'est pas 1/f.') },
      ],
      choices: [B, 'ℝ', `ℝ∖{${r}}`],
      disc: false,
    };
  }
}

const SURJ_SUB = [
  { id: 'disc', label: t('existence (discriminant)'), skill: 'quad-formula' },
  { id: 'inA', label: t('la solution est dans A'), skill: 'g1-irr-ineq' },
  { id: 'inv', label: t('réciproque'), skill: INV },
];

function surjItem(level, rng, opts = {}) {
  const pr = surjBank(rng);
  if (level === 1) return holeMcq(SURJ, pr, rng, 4);
  let decision = null;
  if (level === 3) {
    decision = { prompt: t('Pour quel ensemble d\'arrivée B la fonction f(x) = {f}, définie sur {A}, est-elle surjective ?', { f: toReadable(parse(pr.f)), A: fr(pr.A) }), options: pr.choices.map((B, i) => ({ id: `B${i}`, label: fr(B), valid: i === 0, why: i === 0 ? '' : t('Certains y de {B} n\'ont pas d\'antécédent dans {A}.', { B: fr(B), A: fr(pr.A) }) })) };
    if (pr.choices[1] === pr.choices[0]) decision.options.splice(1, 1);
  }
  return proofBlocks(SURJ, pr, level, rng, opts, {
    decision,
    hints: [
      { level: 1, html: t('Il faut un antécédent <b>dans {A}</b>, pas seulement une solution.', { A: fr(pr.A) }) },
      { level: 2, html: pr.steps[3] },
      { level: 3, html: pr.steps[4] },
    ],
    subgoals: SURJ_SUB, points: 7,
  });
}

// ======================================================================

export const GEN = {
  [INJ]: (level, rng, profile, opts = {}) => (opts.exam === 'tf' ? injTf(rng) : injItem(opts.exam ? 5 : level, rng, opts)),
  [SURJ]: (level, rng, profile, opts = {}) => surjItem(opts.exam ? 5 : level, rng, opts),
  [PAR]: (level, rng, profile, opts = {}) => (opts.exam ? parExam(rng, opts.exam) : parItem(level, rng, opts)),
  [SGN]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? sgnMcq(rng) : level === 5 ? sgnLevel5(rng, opts) : sgnTable(level, rng, opts)),
  [TRI]: (level, rng, profile, opts = {}) => (opts.exam ? triExam(rng, opts.exam) : triItem(level, rng, opts)),
  [INV]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? invMcq(rng) : invItem(opts.exam ? 5 : level, rng, opts)),
  [DOM]: (level, rng, profile, opts = {}) => (opts.exam ? domExam(rng, opts.exam) : domItem(level, rng, opts)),
  [CMP]: (level, rng, profile, opts = {}) => (opts.exam ? cmpExam(rng, opts.exam) : cmpItem(level, rng, opts)),
};

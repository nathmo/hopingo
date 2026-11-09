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
import { walk, lit, unparen, getAt, replaceAt } from '../../cas/ast.js';
import { solutionSet, setToNode, domainOf, setEqual } from '../../cas/sets.js';
import { evalFloat } from '../../cas/numeric.js';
import { expandFns } from '../../cas/sets.js';
import { blankLine } from '../../judges/lines.js';
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
const RT = (t) => toReadable(unparen(parse(t, { vars: [V], funcs: ['f', 'g'] })));

// A line with the sub-expressions written in `texts` left blank.
function tpl(math, texts, opts = {}) {
  const node = parse(math, opts);
  const holes = [];
  for (const t of texts) {
    const want = toText(parse(t, opts));
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
      why: c.why || 'Ce n\'est pas l\'étape à faire maintenant.',
    })),
  }));
}
const withMenus = (judge, level, start, lines, choices) => (level === 3 ? { ...judge, menus: stepMenus(start, lines, choices) } : judge);

// ======================================================================
// g1-domain
// ======================================================================

const DOM = 'g1-domain';
const DOM_SUB = [
  { id: 'conds', label: 'écrire les conditions', skill: DOM },
  { id: 'solve', label: 'résoudre chaque condition', skill: 'rat-domain' },
  { id: 'combine', label: 'combiner en intervalles', skill: 'g9-intervals' },
];
const DOM_CHOICES = [
  { id: 'conds', label: 'Écrire les conditions (racines, dénominateurs)' },
  { id: 'solve', label: 'Résoudre chaque condition' },
  { id: 'combine', label: 'Combiner : écrire D_f en intervalles' },
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
      E(`${lin(-qq)}≥0∧${lin(a)}≠0`, 'Conditions', 'conds'),
      E(`x≥${-qq}∧x≠${a}`, 'Résoudre', 'solve'),
      E(Dt, 'D_f', 'combine'),
    ];
    const eqStart = `${f}=0`;
    const sols = [r, -qq].sort((u, w) => u - w);
    const seg2 = [E(`x=${sols[0]}∨x=${sols[1]}`, 'Un produit est nul si un facteur est nul', 'solve')];
    if (!inD) seg2.push(E(`{${-qq}}`, `${fr(String(r))} n'est pas dans D_f`, 'conds'));
    return linesItem({
      skill: DOM, level: 5,
      prompt: `Soit f(x) = ${MT(f)}. Détermine D_f, puis résous f(x) = 0.`,
      start: f, judge: { kind: 'solset', v: V, exprDomain: true }, mode: 'free',
      script: [...seg1, { kind: 'segment', html: 'Résous f(x) = 0 sur D_f :', start: { math: eqStart }, judge: { kind: 'solset', v: V, onDomain: true } }, ...seg2],
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
    E(condsText, 'Écrire les conditions', 'conds', 'conds'),
    E(solvedText, 'Résoudre chaque condition', 'solve', 'solve'),
    E(d.Dtext, 'Combiner', 'combine', 'combine'),
  ];
  let start = d.f;
  let script = lines;
  const judge = { kind: 'solset', v: V, exprDomain: true };
  if (level === 1) {
    start = condsText;
    const nums = d.conds.flatMap((c) => [...c.solved.matchAll(/[≥≤<>≠]=?(-?[\d/]+)/g)].map((m) => m[1]));
    script = [{ kind: 'note', html: `Les conditions de ${MT(d.f)} sont écrites. Résous-les.` }, blanked(lines[1], [...new Set(nums)].slice(0, 2)), lines[2]];
  } else if (level === 2) {
    script = [blanked(lines[0], d.conds.map((c) => c.left)), lines[1], lines[2]];
  } else if (level === 3) {
    const cond0 = d.conds.map((c) => RT(c.text)).join(' et ');
    const options = [{ id: 'right', label: cond0, valid: true }];
    if (d.conds.length > 1) options.push({ id: 'one', label: RT(d.conds[d.conds.length - 1].text), valid: false, rule: 'g1_domain_partial', why: 'Il manque une condition : chaque racine et chaque dénominateur donne la sienne.' });
    options.push({ id: 'num', label: `${cond0} et numérateur ≠ 0`, valid: false, why: 'Le numérateur peut être nul : 0 divisé par un nombre non nul existe.' });
    if (d.conds.some((c) => c.text.includes('≥'))) options.push({ id: 'strict', label: d.conds.map((c) => RT(c.text.replace('≥', '>'))).join(' et '), valid: false, why: 'Une racine carrée de 0 existe : sous la racine, il faut ≥ 0 (> 0 seulement si la racine est au dénominateur).' });
    script = [{ kind: 'decision', prompt: 'Quelles conditions écrire ?', options }, ...lines];
  }
  const sLines = lines;
  return linesItem({
    skill: DOM, level, prompt: `Détermine le domaine de définition de f(x) = ${MT(d.f)}.`,
    start, judge: withMenus(judge, level, start, sLines, DOM_CHOICES), mode: modeOf(level), script,
    hints: H('Deux dangers : une racine carrée (ce qui est dessous doit être ≥ 0) et un dénominateur (≠ 0).', MT(condsText), MT(lines[1].math)),
    subgoals: DOM_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${DOM}:${level}:${d.f}`, exam: examOf(opts), fallback: !!d.fallback,
  });
}

function domExam(rng, exam) {
  if (exam === 'tf') {
    const bank = [
      { s: 'La fonction x ↦ √(x²) n\'est définie que sur [0 ; +∞[.', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: 'x^2≥0⇒x≥0', hyp: 'x^2≥0', ask: [{ v: 'x', label: 'x =' }], answer: { x: '-1' } }, why: 'Faux : x² ≥ 0 pour tout x, donc √(x²) est définie sur ℝ. Par exemple √((−1)²) = 1.' },
      { s: 'La fonction x ↦ 1/(x² + 1) est définie sur ℝ.', truth: true, why: 'Vrai : x² + 1 ≥ 1 ne s\'annule jamais.' },
      { s: 'La fonction x ↦ √(x − 1)/(x − 2) est définie sur [1 ; +∞[.', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: 'x≥1⇒x≠2', hyp: 'x≥1', ask: [{ v: 'x', label: 'x =' }], answer: { x: '2' } }, why: 'Faux : en x = 2, le dénominateur est nul. D = [1 ; 2[ ∪ ]2 ; +∞[.', rule: 'g1_domain_partial' },
      { s: 'La fonction x ↦ 1/√(x + 4) est définie sur [−4 ; +∞[.', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: 'x≥-4⇒x+4≠0', hyp: 'x≥-4', ask: [{ v: 'x', label: 'x =' }], answer: { x: '-4' } }, why: 'Faux : en x = −4, on divise par √0 = 0. D = ]−4 ; +∞[.' },
      { s: 'La fonction x ↦ √(4 − x²) est définie sur [−2 ; 2].', truth: true, why: 'Vrai : 4 − x² ≥ 0 ⇔ −2 ≤ x ≤ 2.' },
    ];
    const b = rng.pick(bank);
    return tfItem({ skill: DOM, level: 4, statement: b.s, truth: b.truth, counter: b.counter || null, ruleIfTrue: b.truth ? null : b.rule || null, key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 } });
  }
  const d = domData(rng, 2);
  const options = [{ html: MT(d.Dtext), correct: true }];
  d.partial.forEach((S) => { if (S && S.parts.length && !setEqual(S, d.D)) options.push({ html: MT(setText(S)), correct: false, rule: 'g1_domain_partial' }); });
  // A bracket turned: the first closed bound opened, or the reverse.
  const flipped = d.Dtext.replace(/^\[/, ']').replace(/^\](?!-∞)/, '[');
  if (flipped !== d.Dtext) { try { setOf(flipped); options.push({ html: MT(flipped), correct: false, rule: 'g9_bracket' }); } catch { /* skip */ } }
  if (options.length < 4) options.push({ html: MT('ℝ'), correct: false });
  return mcq({
    skill: DOM, level: 4, prompt: `Domaine de définition de f(x) = ${MT(d.f)} :`, options: uniq(options).slice(0, 4), key: `mcq:${d.f}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `${MT(d.conds.map((c) => c.text).join('∧'))} donne D_f = ${MT(d.Dtext)}.`, note: '' }],
  }, rng);
}

// ======================================================================
// g1-compose
// ======================================================================

const CMP = 'g1-compose';
const CMP_SUB = [
  { id: 'subst', label: 'remplacer', skill: CMP },
  { id: 'simplify', label: 'simplifier', skill: CMP },
  { id: 'domain', label: 'domaine', skill: DOM },
];
const CMP_CHOICES = [
  { id: 'subst', label: 'Remplacer : la fonction intérieure d\'abord' },
  { id: 'simplify', label: 'Simplifier' },
  { id: 'domain', label: 'Écrire le domaine' },
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
    const group = parent && (['paren', 'abs', 'fn'].includes(parent.t) || (inner.t === 'sqrt' && parent.t === 'bin' && parent.op === '×'));
    out = replaceAt(out, path, inner.t === 'sym' || group ? inner : { t: 'paren', e: inner });
  }
  return toText(out);
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

const MU = (t) => MT(toText(unparen(parse(t))));
const fDisplay = (d) => `f(x) = ${MU(d.defs.f)} et g(x) = ${MU(d.defs.g)}`;

// The lines of one composition: replace, then simplify; then the domain.
function cmpParts(d, level) {
  const innerText = d.defs[d.innerName];
  const outerName = d.innerName === 'f' ? 'g' : 'f';
  const first = `${outerName}(${innerText})`;
  const clean = (t) => toText(unparen(parse(t, { funcs: ['f', 'g'] })));
  const expr = [
    E(clean(first), `${d.innerName} d'abord : ${d.innerName}(x) = ${RT(innerText)}`, 'subst', 'subst'),
    E(d.raw, `Remplacer x par ${RT(innerText)} dans ${outerName}`, 'subst', 'subst'),
  ];
  // The raw writing may already be the simple one.
  if (clean(d.raw) !== clean(d.simple)) expr.push(E(d.simple, 'Simplifier', 'simplify', 'simplify'));
  if (level === 1 && expr[0]) expr[0] = blanked(expr[0], [toText(parse(innerText))], { funcs: ['f', 'g'] });
  const domCond = domText(d.call, { funcs: ['f', 'g'], defs: d.defs });
  const dom = [E(domCond, 'Domaine : x doit être dans le domaine de la fonction intérieure, et l\'expression brute définie', 'domain', 'domain')];
  return { expr, dom, domCond };
}

function cmpItem(level, rng, opts = {}) {
  const d = compData(rng);
  const both = level >= 4;
  const parts = cmpParts(d, level);
  const judge = cmpJudge(d);
  const domJudge = { kind: 'solset', v: V, funcs: ['f', 'g'], defs: d.defs, exprDomain: true, simplified: d.simple };
  const script = [];
  if (level <= 2) script.push({ kind: 'note', html: `Le domaine de ${d.name} est ${MT(d.D)}.` });
  if (level === 3) {
    script.push({ kind: 'decision', prompt: `Pour ${d.name}, quelle fonction applique-t-on d'abord ?`, options: [
      { id: 'inner', label: `${d.innerName} d'abord`, valid: true },
      { id: 'outer', label: `${d.innerName === 'f' ? 'g' : 'f'} d'abord`, valid: false, rule: 'g1_compose_order', why: `${d.name} : la fonction écrite à droite s'applique d'abord.` },
    ] });
  }
  script.push(...parts.expr);
  if (level >= 3) script.push({ kind: 'segment', html: `Domaine de ${d.name} :`, start: { math: d.call }, judge: domJudge }, ...parts.dom);
  let prompt = `${fDisplay(d)}. Calcule (${d.name})(x) et simplifie${level >= 3 ? ', puis donne son domaine' : ''}.`;
  if (both) {
    // The other order too.
    const e = { ...d, call: d.other.call, raw: d.other.raw, innerName: d.innerName === 'f' ? 'g' : 'f', name: d.name === 'g ∘ f' ? 'f ∘ g' : 'g ∘ f' };
    const match = d.pairs.find((x) => toText(parse(x.outer)) === toText(parse(d.inner)) && toText(parse(x.inner)) === toText(parse(d.outer)));
    e.simple = match ? toText(unparen(parse(match.simple))) : d.other.raw;
    e.D = domText(e.call, { funcs: ['f', 'g'], defs: d.defs });
    const p2 = cmpParts(e, level);
    script.push({ kind: 'segment', html: `Puis (${e.name})(x) :`, start: { math: e.call }, judge: cmpJudge(e) }, ...p2.expr,
      { kind: 'segment', html: `Domaine de ${e.name} :`, start: { math: e.call }, judge: { ...domJudge, simplified: e.simple } }, ...p2.dom);
    prompt = `${fDisplay(d)}. Calcule (${d.name})(x) et (${e.name})(x), simplifie, et donne leurs domaines.`;
  }
  return linesItem({
    skill: CMP, level, prompt,
    start: d.call, judge: withMenus(judge, level, d.call, parts.expr, CMP_CHOICES), mode: modeOf(level), script,
    declares: { vars: [V], funcs: ['f', 'g'] },
    hints: H(`${d.name} : on calcule d'abord ${d.innerName}(x), puis on l'envoie dans l'autre fonction.`, MT(parts.expr[0].math, { funcs: ['f', 'g'] }), MT(d.raw)),
    subgoals: CMP_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${CMP}:${level}:${d.defs.f}:${d.defs.g}:${d.call}`, exam: examOf(opts, 3),
  });
}

function cmpExam(rng, exam) {
  if (exam === 'tf') {
    const a = rng.pick([2, 3]);
    const bank = [
      { s: `Pour f(x) = x² et g(x) = x + ${a}, on a f ∘ g = g ∘ f.`, truth: false, pred: `(x+${a})^2=x^2+${a}`, ans: '1', why: `Faux : (f ∘ g)(x) = (x + ${a})², (g ∘ f)(x) = x² + ${a}. En x = 1 : ${(1 + a) ** 2} ≠ ${1 + a}.` },
      { s: `Pour f(x) = ${a}x et g(x) = x + 1, on a f ∘ g = g ∘ f.`, truth: false, pred: `${a}(x+1)=${a}x+1`, ans: '0', why: `Faux : ${a}(x + 1) ≠ ${a}x + 1.` },
      { s: 'Pour f(x) = x + 2 et g(x) = x − 5, on a f ∘ g = g ∘ f.', truth: true, why: 'Vrai : les deux donnent x − 3.' },
      { s: 'f ∘ g = g ∘ f pour toutes les fonctions f et g.', truth: false, pred: '(x+1)^2=x^2+1', ans: '1', with: 'f(x) = x², g(x) = x + 1', why: 'Faux : avec f(x) = x² et g(x) = x + 1, (f ∘ g)(1) = 4 mais (g ∘ f)(1) = 2.' },
    ];
    const b = rng.pick(bank);
    const counter = b.truth ? null : { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: b.pred, ask: [{ v: 'x', label: b.with ? `Avec ${b.with}, une valeur x où f(g(x)) ≠ g(f(x)) : x =` : 'x =' }], answer: { x: b.ans } };
    return tfItem({ skill: CMP, level: 4, statement: b.s, truth: b.truth, counter, key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 } });
  }
  const d = compData(rng);
  const options = [
    { html: `${MU(d.simple)}, sur ${MT(d.D)}`, correct: true },
    { html: `${MU(d.other.raw)}, sur ${MT(domText(d.other.call, { funcs: ['f', 'g'], defs: d.defs }))}`, correct: false, rule: 'g1_compose_order' },
  ];
  if (d.Dsimple !== d.D) options.push({ html: `${MU(d.simple)}, sur ${MT(d.Dsimple)}`, correct: false, rule: 'g1_compose_domain' });
  options.push({ html: `${MU(`(${d.defs.f})*(${d.defs.g})`)}, sur ${MT(d.D)}`, correct: false });
  return mcq({
    skill: CMP, level: 4, prompt: `${fDisplay(d)}. Alors (${d.name})(x) =`, options: uniq(options), key: `mcq:${d.defs.f}:${d.defs.g}:${d.call}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `(${d.name})(x) = ${MT(d.raw)} = ${MT(d.simple)}, sur ${MT(d.D)}.`, note: '' }],
  }, rng);
}

// ======================================================================

export const GEN = {
  [DOM]: (level, rng, profile, opts = {}) => (opts.exam ? domExam(rng, opts.exam) : domItem(level, rng, opts)),
  [CMP]: (level, rng, profile, opts = {}) => (opts.exam ? cmpExam(rng, opts.exam) : cmpItem(level, rng, opts)),
};

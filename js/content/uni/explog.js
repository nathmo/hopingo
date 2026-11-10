// Generators of module G2 (unit `explog`), spec §8.3. Catalogue:
// docs/universite/G-gymnase-1.md, G2.
//
// Levels: 1–2 guided (lines with boxes), 3 choose the action then write the
// line (a menu written for each reference line, `tapActions: 'steps'`), 4
// free lines with hints, 5 alone. Simplifications are judged by `equiv`
// (targets powers, log-expanded, log-single, goal, only), numbers by
// `value`, equations and inequations by `solset` with the additions of
// step U1b: `subst` (t = eˣ), `onDomain` with « D = … » lines, `params`
// (argsh, argth established for every y). Every generator starts from the
// answer (§8.4 « beaux nombres »).
// opts.exam = 'mcq' | 'tf' | 'open' gives the exam variants.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { walk, lit, getAt } from '../../cas/ast.js';
import { solutionSet } from '../../cas/sets.js';
import { blankLine } from '../../judges/lines.js';
import { MT, fr, linesItem, mcq, tfItem } from './kit.js';

const V = 'x';
const q = (n, d = 1) => new Q(n, d);
const N = (x) => toText(lit(Q.of(x)));
const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
const E = (math, note, subgoal, act) => ({ kind: 'eq', math, note, subgoal, act });
const examOf = (opts, points = 1) => (opts?.exam ? { format: opts.exam, points } : false);
const uniq = (opts) => opts.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);
const KEYS = ['calc', 'explog', 'relation', 'set'];

// A line with the sub-expressions written in `texts` left blank.
function tpl(math, texts, opts = {}) {
  const node = parse(math, opts);
  const holes = [];
  for (const t of texts) {
    const want = toText(parse(t, opts));
    let found = null;
    walk(node, (n, path) => {
      if (found) return false;
      // Never the base of log_a: log_□(…) does not read.
      if (path.at(-1) === 'args.0' && getAt(node, path.slice(0, -1)).name === 'logb') return false;
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
      ...(c.rule && c.id !== l.act ? { rule: c.rule } : {}),
    })),
  }));
}
const withMenus = (judge, level, start, lines, choices) => (level === 3 ? { ...judge, menus: stepMenus(start, lines, choices) } : judge);

// x written as a coefficient of a term: 3, −1/2…
const ex = (k) => { const s = N(k); return /^\d+$/.test(s) ? s : `(${s})`; };
// letter^k: '' for k = 0, the letter for k = 1.
function pw(letter, k) {
  const Qk = Q.of(k);
  if (Qk.n === 0) return '';
  if (Qk.eq(1)) return letter;
  return `${letter}^${ex(Qk)}`;
}
// c·ln(u) as text: ln(x), −ln(x), 3ln(x), (5/2)ln(x).
function cln(k, u) {
  const Qk = Q.of(k);
  if (Qk.eq(1)) return `ln(${u})`;
  if (Qk.eq(-1)) return `-ln(${u})`;
  if (Qk.d === 1) return `${Qk.n}ln(${u})`;
  return `${Qk.n < 0 ? '-' : ''}(${Math.abs(Qk.n)}/${Qk.d})ln(${u})`;
}
const joinSum = (terms) => terms.filter(Boolean).reduce((s, t) => (s ? (t.startsWith('-') ? `${s}${t}` : `${s}+${t}`) : t), '');
// x − r as text (x + 3, x − 2, x).
const lin = (r, v = V) => { const R = Q.of(r); return R.n === 0 ? v : R.n < 0 ? `${v}+${N(R.neg())}` : `${v}-${N(R)}`; };
// x = ln t for t > 0: 0, ln(3), −ln(2), ln(3/2).
function lnOf(t) {
  const T = Q.of(t);
  if (T.eq(1)) return '0';
  if (T.d === 1) return `ln(${T.n})`;
  if (T.n === 1) return `-ln(${T.d})`;
  return `ln(${N(T)})`;
}
// A finite set written in order: {a ; b}, or ∅.
function setText(items) {
  if (!items.length) return '∅';
  const xs = [...items].sort((a, b) => a.v - b.v);
  return `{${xs.map((x) => x.t).join(';')}}`;
}
const orEq = (xs, v = V) => xs.map((x) => `${v}=${x}`).join(' ou ');

// ======================================================================
// g2-real-powers
// ======================================================================

const RP = 'g2-real-powers';
const RP_SUB = [
  { id: 'prod', label: 'puissance d\'un produit', skill: 'pow-rules' },
  { id: 'root', label: 'a^(1/n) = ⁿ√a', skill: 'root-rules' },
  { id: 'quot', label: 'quotient de puissances', skill: RP },
  { id: 'reduce', label: 'réduire', skill: RP },
];
const RP_CHOICES = [
  { id: 'prod', label: 'Puissance d\'un produit ou d\'une puissance : multiplier les exposants' },
  { id: 'quot', label: 'Même base : additionner (produit) ou soustraire (quotient) les exposants' },
  { id: 'reduce', label: 'Calculer les exposants' },
  { id: 'add', label: '(aᵖ)ᵠ = a^(p + q)', rule: 'g2_power_power', why: '(aᵖ)ᵠ = aᵖᵠ : on multiplie les exposants.' },
];
const ROOT_WORD = { 2: 'carrée', 3: 'cubique', 4: 'quatrième', 5: 'cinquième', 6: 'sixième' };
const ROOTS = [[4, 2, 2], [8, 3, 2], [9, 2, 3], [16, 2, 4], [16, 4, 2], [25, 2, 5], [27, 3, 3], [32, 5, 2], [64, 2, 8], [64, 3, 4], [64, 6, 2], [81, 2, 9], [81, 4, 3]];

function rpNumber(level, rng, opts) {
  let d = null;
  for (let i = 0; i < 200 && !d; i++) {
    const [B, n, r] = rng.pick(ROOTS);
    const p = nz(rng, -4, 4);
    if (Math.abs(p) < 2 || gcd(Math.abs(p), n) !== 1 || r ** Math.abs(p) > 130) continue;
    d = { B, n, r, p };
  }
  d ||= { B: 16, n: 4, r: 2, p: -3 };
  const { B, n, r, p } = d;
  const k = Math.abs(p);
  const start = `${B}^(${p}/${n})`;
  const value = p > 0 ? q(r ** k) : q(1, r ** k);
  const lines = p > 0
    ? [E(`(${B}^(1/${n}))^${k}`, `a^(p/q) = (a^(1/q))^p`, 'root'), E(`${r}^${k}`, `racine ${ROOT_WORD[n]} de ${B} : ${r}`, 'root'), E(N(value), 'Calculer', 'reduce')]
    : [E(`1/${B}^(${k}/${n})`, 'a^(−p) = 1/aᵖ', 'prod'), E(`1/(${B}^(1/${n}))^${k}`, 'a^(p/q) = (a^(1/q))^p', 'root'), E(`1/${r}^${k}`, `racine ${ROOT_WORD[n]} de ${B} : ${r}`, 'root'), E(N(value), 'Calculer', 'reduce')];
  const script = level === 1 ? lines.map((l) => (l.math.includes('^(1/') ? blanked(l, [`1/${n}`]) : l.math === `${r}^${k}` || l.math === `1/${r}^${k}` ? blanked(l, [String(r)]) : l)) : lines;
  return linesItem({
    skill: RP, level, prompt: `Calcule ${MT(start)} sans calculatrice.`,
    start, judge: { kind: 'value', form: 'irreducible' }, mode: modeOf(level), script,
    hints: H(`a^(p/q) = (ⁿ√a)ᵖ avec n = q : prends d'abord la racine ${ROOT_WORD[n]} de ${B}.`, `${MT(`${B}^(1/${n})`)} = ${r}`, MT(lines[lines.length - 2].math)),
    subgoals: RP_SUB, keys: ['calc'], key: `${RP}:${start}`, exam: examOf(opts),
  });
}

function rpData(rng, two) {
  for (let i = 0; i < 300; i++) {
    const n = rng.pick([2, 3, 4, 6]);
    const p = rng.int(-2, 3);
    const qq = two ? rng.int(-2, 3) : 0;
    if (p === 0 && qq === 0) continue;
    if (!two && p === 0) continue;
    const A = nz(rng, -6, 6);
    if (A % n === 0) continue;
    const B = two ? nz(rng, -6, 6) : 0;
    const g = A - p;
    const dd = B - qq;
    if (Math.abs(g) > 4 || Math.abs(dd) > 4 || (g === 0 && dd === 0)) continue;
    if (two && (g === 0 || dd === 0) && rng.chance(0.5)) continue;
    return { n, A, B, g, dd, p, q: qq, two };
  }
  return { n: 6, A: 3, B: -2, g: 2, dd: -3, p: 1, q: 1, two: true };
}

// Exponent expression A − g written out: 3−2, −2+3.
const minusText = (A, g) => (g === 0 ? `${A}` : `${A}${g > 0 ? '-' : '+'}${Math.abs(g)}`);
const expPow = (letter, A, g) => (A - g === 0 && g === 0 ? '' : `${letter}^(${minusText(A, g)})`);

function rpLetters(d) {
  const { n, A, B, g, dd } = d;
  const inner = `${pw('a', q(A, n))}${d.two ? pw('b', q(B, n)) : ''}`;
  const den = `${pw('a', g)}${d.two ? pw('b', dd) : ''}`;
  const start = `(${inner})^${n}/(${den})`;
  const l1 = `${pw('a', A)}${d.two ? pw('b', B) : ''}/(${den})`;
  const l2 = `${expPow('a', A, g)}${d.two ? expPow('b', B, dd) : ''}`;
  const ans = `${pw('a', d.p)}${d.two ? pw('b', d.q) : ''}`;
  return { start, l1, l2, ans };
}

function rpItem(level, rng, opts = {}) {
  if (level === 1) return rpNumber(level, rng, opts);
  if (level === 5) return rpEquation(rng, opts);
  const d = rpData(rng, level >= 3);
  const { start, l1, l2, ans } = rpLetters(d);
  const lines = [
    E(l1, 'Puissance d\'un produit : multiplier les exposants', 'prod', 'prod'),
    E(l2, 'Quotient : soustraire les exposants', 'quot', 'quot'),
    E(ans, 'Réduire', 'reduce', 'reduce'),
  ];
  const opt = { vars: ['a', 'b'] };
  const script = level === 2 ? [blanked(lines[0], [String(d.A)], opt), lines[1], lines[2]] : lines;
  const judge = { kind: 'equiv', vars: ['a', 'b'], domain: { a: [0.2, 4], b: [0.2, 4] }, target: 'powers' };
  return linesItem({
    skill: RP, level, prompt: `Simplifie ${MT(start, opt)} (a${d.two ? ', b' : ''} > 0) : une seule puissance par lettre.`,
    start, judge: withMenus(judge, level, start, lines, RP_CHOICES), mode: modeOf(level), script,
    declares: { vars: ['a', 'b'] },
    hints: H('(xy)ⁿ = xⁿyⁿ, puis (aᵖ)ᵠ = aᵖᵠ. Ensuite aᵖ/aᵠ = a^(p − q).', `${MT(`(${pw('a', q(d.A, d.n))})^${d.n}`, opt)} = a^(…)`, MT(l1, opt)),
    subgoals: RP_SUB, keys: ['calc', 'letters'], tapActions: level === 3 ? 'steps' : null,
    key: `${RP}:${start}`, exam: examOf(opts),
  });
}

// Level 5: 2^(3x)·4^(x − 1) = 8.
function rpEquation(rng, opts) {
  let d = null;
  for (let i = 0; i < 200 && !d; i++) {
    const b = rng.pick([2, 3]);
    const x0 = rng.int(-2, 3);
    const al = rng.int(1, 3);
    const be = rng.int(-2, 2);
    const ga = (al + 2) * x0 + 2 * be;
    if (ga < 1 || ga > (b === 2 ? 6 : 4) || be === 0) continue;
    d = { b, x0, al, be, ga };
  }
  d ||= { b: 2, x0: 1, al: 3, be: -1, ga: 3 };
  const { b, x0, al, be, ga } = d;
  const xa = al === 1 ? 'x' : `${al}x`;
  const bx = al === 1 ? `${b}^x` : `${b}^(${xa})`;
  const lb = lin(-be);
  const start = `${bx}×${b * b}^(${lb})=${b ** ga}`;
  const lines = [
    E(`${bx}×${b}^(2(${lb}))=${b}^${ga}`, ga === 2 ? `${b * b} = ${b}²` : `${b * b} = ${b}² et ${b ** ga} = ${b}^${ga}`, 'prod'),
    E(`${b}^(${xa}+2(${lb}))=${b}^${ga}`, 'Produit de même base', 'quot'),
    E(`${xa}+2(${lb})=${ga}`, 'Comparer les exposants', 'reduce'),
    E(`x=${x0}`, 'Résoudre', 'reduce'),
  ];
  return linesItem({
    skill: RP, level: 5, prompt: `Résous ${MT(start)}.`,
    start, judge: { kind: 'solset', v: V }, mode: 'free', script: lines,
    hints: [], subgoals: RP_SUB, keys: KEYS, key: `${RP}:${start}`, exam: examOf(opts, 2),
  });
}

function rpExam(rng, exam) {
  if (exam === 'tf') {
    const bank = [
      { s: 'Pour tous a, b > 0 : (a + b)^(1/2) = a^(1/2) + b^(1/2).', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R+' }, { q: '∀', v: 'b', dom: 'R+' }], pred: '(a+b)^(1/2)=a^(1/2)+b^(1/2)', ask: [{ v: 'a', label: 'a =' }, { v: 'b', label: 'b =' }], answer: { a: '1', b: '1' } }, why: 'Faux : avec a = b = 1, √2 ≈ 1,41 mais 1 + 1 = 2.', rule: 'g2_exp_sum' },
      { s: 'Pour tout a > 0 : a^(1/2)·a^(1/3) = a^(1/6).', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R+' }], pred: 'a^(1/2)×a^(1/3)=a^(1/6)', ask: [{ v: 'a', label: 'a =' }], answer: { a: '2' } }, why: 'Faux : on additionne les exposants, a^(1/2 + 1/3) = a^(5/6). Avec a = 2, les deux côtés diffèrent.' },
      { s: 'Pour tout a > 0 : (a^(2/3))^(3/2) = a.', truth: true, why: 'Vrai : (2/3)·(3/2) = 1.' },
      { s: 'Pour tout a > 0 : a^(−1/2) = 1/√a.', truth: true, why: 'Vrai : a^(−p) = 1/aᵖ et a^(1/2) = √a.' },
      { s: 'Pour tout a > 0 : (a³)^(1/2) = a^(7/2).', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R+' }], pred: '(a^3)^(1/2)=a^(7/2)', ask: [{ v: 'a', label: 'a =' }], answer: { a: '2' } }, why: 'Faux : on multiplie les exposants, (a³)^(1/2) = a^(3/2).', rule: 'g2_power_power' },
    ];
    const b = rng.pick(bank);
    return tfItem({
      skill: RP, level: 4, statement: b.s.replace(/\^\(([^)]*)\)/g, '<sup>$1</sup>'), truth: b.truth, counter: b.counter || null, ruleIfTrue: b.truth ? null : b.rule || null,
      key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 },
    });
  }
  const d = rpData(rng, true);
  const { start, ans } = rpLetters(d);
  const opt = { vars: ['a', 'b'] };
  const mono = (pa, pb) => `${pw('a', pa)}${pw('b', pb)}` || '1';
  const al = q(d.A, d.n);
  const be = q(d.B, d.n);
  const options = [{ html: MT(ans, opt), correct: true }];
  const add = (t, rule) => { if (t && t !== ans) options.push({ html: MT(t, opt), correct: false, rule }); };
  add(mono(al.add(d.n).sub(d.g), be.add(d.n).sub(d.dd)), 'g2_power_power');
  add(mono(q(d.A + d.g), q(d.B + d.dd)));
  add(mono(al.sub(d.g), be.sub(d.dd)));
  add(mono(q(d.p).neg(), q(d.q)));
  return mcq({
    skill: RP, level: 4, prompt: `Pour a, b > 0, ${MT(start, opt)} =`, options: uniq(options).slice(0, 4), key: `mcq:${start}`,
    exam: { format: 'mcq', points: 1 }, solution: [{ html: `${MT(rpLetters(d).l1, opt)} = ${MT(ans, opt)}`, note: '' }],
  }, rng);
}

// ======================================================================
// g2-log-rules
// ======================================================================

const LR = 'g2-log-rules';
const LR_SUB = [
  { id: 'split', label: 'produit et quotient', skill: LR },
  { id: 'pow', label: 'puissances', skill: RP },
  { id: 'reduce', label: 'réduire', skill: LR },
];
const LR_CHOICES = [
  { id: 'split', label: 'ln(uv) = ln u + ln v, ln(u/v) = ln u − ln v' },
  { id: 'pow', label: 'ln(uᵖ) = p·ln u (√u = u^(1/2), ln(eᵏ) = k)' },
  { id: 'reduce', label: 'Réduire les termes semblables' },
  { id: 'sum', label: 'ln(u + v) = ln u + ln v', rule: 'g2_log_sum', why: 'Il n\'y a pas de règle pour ln d\'une somme.' },
];
const LR_BASES = [
  { b: '2', B: q(2), rs: [-4, -3, -2, 2, 3, 4, 5] },
  { b: '3', B: q(3), rs: [-3, -2, 2, 3, 4] },
  { b: '4', B: q(4), rs: [q(1, 2), q(3, 2), q(-1, 2), 2, 3, -1] },
  { b: '9', B: q(9), rs: [q(1, 2), q(3, 2), q(-1, 2), 2] },
  { b: '10', B: q(10), rs: [-3, -2, 2, 3, 4] },
  { b: '(1/2)', B: q(1, 2), rs: [-3, -2, -4, 2, 3] },
];

function powQ(B, r) {
  const R = Q.of(r);
  let v = B.pow(Math.abs(R.n));
  if (R.n < 0) v = q(1).div(v);
  if (R.d === 1) return v;
  // Square roots of perfect squares only (4, 9).
  const s = v.sqrt ? v.sqrt() : null;
  return s;
}

function lrValue(level, rng, opts) {
  let d = null;
  for (let i = 0; i < 100 && !d; i++) {
    const base = rng.pick(LR_BASES);
    const r = rng.pick(base.rs);
    const arg = powQ(base.B, r);
    if (!arg) continue;
    d = { ...base, r: Q.of(r), arg };
  }
  const start = `log_${d.b}(${N(d.arg)})`;
  const rt = N(d.r);
  const lines = [E(`log_${d.b}(${d.b}^${ex(d.r)})`, `${N(d.arg)} est une puissance de ${d.b.replace(/[()]/g, '')}`, 'pow'), E(rt, 'log_a(aʳ) = r', 'reduce')];
  const script = level === 1 ? [blanked(lines[0], [rt.startsWith('-') || rt.includes('/') ? rt : rt]), lines[1]] : lines;
  return linesItem({
    skill: LR, level, prompt: `Calcule ${MT(start)}.`,
    start, judge: { kind: 'value', form: 'irreducible' }, mode: modeOf(level), script,
    hints: H(`log_a y = x ⇔ aˣ = y : écris ${N(d.arg)} comme une puissance de ${d.b.replace(/[()]/g, '')}.`, `${fr(N(d.arg))} = ${d.b}^…`, MT(lines[0].math)),
    subgoals: LR_SUB, keys: KEYS, key: `${LR}:${start}`, exam: examOf(opts),
  });
}

// Factors of a product under ln: text and the terms they give.
const FACTORS = {
  eK: (rng) => { const k = rng.int(1, 3); return { text: k === 1 ? 'e' : `e^${k}`, terms: [{ u: '', k: q(k) }] }; },
  xN: (rng) => { const k = rng.int(2, 4); return { text: `x^${k}`, terms: [{ u: 'x', k: q(k) }] }; },
  sqrtX: () => ({ text: '√x', terms: [{ u: 'x', k: q(1, 2) }] }),
  sqrtLin: (rng) => { const c = rng.int(1, 5); return { text: `√(x+${c})`, terms: [{ u: `x+${c}`, k: q(1, 2) }] }; },
  powLin: (rng) => { const c = rng.int(1, 5); const k = rng.int(2, 3); return { text: `(x+${c})^${k}`, terms: [{ u: `x+${c}`, k: q(k) }] }; },
  lin: (rng) => { const c = rng.int(1, 5); return { text: `(x+${c})`, terms: [{ u: `x+${c}`, k: q(1) }] }; },
};

function lrDevelopData(rng, level) {
  for (let i = 0; i < 200; i++) {
    const kinds = level <= 2 ? rng.pick([['xN', 'sqrtLin'], ['xN', 'powLin'], ['eK', 'sqrtLin'], ['sqrtX', 'powLin']])
      : rng.pick([['eK', 'sqrtX', 'xN'], ['eK', 'xN', 'sqrtLin'], ['xN', 'sqrtLin', 'lin'], ['eK', 'powLin', 'xN'], ['sqrtX', 'xN', 'powLin']]);
    const fs = kinds.map((k) => FACTORS[k](rng));
    const nDen = level <= 2 ? (rng.chance(0.4) ? 1 : 0) : 1;
    const den = fs.slice(fs.length - nDen);
    const num = fs.slice(0, fs.length - nDen);
    if (!num.length) continue;
    // Two factors of the same (x + c) read badly: one each.
    const us = fs.flatMap((f) => f.terms.map((t) => t.u)).filter((u) => u.startsWith('x+'));
    if (new Set(us).size < us.length) continue;
    if (den.length && den[0].text === 'e' ) continue;
    return { num, den };
  }
  return { num: [FACTORS.eK({ int: () => 2 }), FACTORS.sqrtX()], den: [FACTORS.xN({ int: () => 3 })] };
}

function lrDevelopLines(d) {
  const numText = d.num.map((f) => f.text).join('×');
  const denText = d.den.map((f) => f.text).join('×');
  const start = d.den.length ? `ln(${d.num.length > 1 ? `(${numText})` : numText}/${d.den.length === 1 ? denText : `(${denText})`})` : `ln(${numText})`;
  const l1 = joinSum([...d.num.map((f) => `ln(${f.text.replace(/^\((.*)\)$/, '$1')})`), ...d.den.map((f) => `-ln(${f.text.replace(/^\((.*)\)$/, '$1')})`)]);
  const raw = [...d.num.flatMap((f) => f.terms.map((t) => ({ ...t }))), ...d.den.flatMap((f) => f.terms.map((t) => ({ ...t, k: t.k.neg() })))];
  const termText = (t) => (t.u ? cln(t.k, t.u) : N(t.k));
  const l2 = joinSum(raw.map(termText));
  // Combined: constants first, then each argument once.
  const groups = new Map();
  for (const t of raw) groups.set(t.u, (groups.get(t.u) ?? q(0)).add(t.k));
  const fin = joinSum([...groups.entries()].sort((a, b) => (a[0] === '' ? -1 : b[0] === '' ? 1 : 0)).filter(([, k]) => k.n !== 0).map(([u, k]) => termText({ u, k }))) || '0';
  return { start, l1, l2, fin, combine: groups.size < raw.length };
}

function lrItem(level, rng, opts = {}) {
  if (level === 1) return lrValue(level, rng, opts);
  if (level === 5) return lrChangeBase(rng, opts);
  const condense = level === 4 && rng.chance(0.4);
  if (condense) return lrCondense(level, rng, opts);
  const d = lrDevelopData(rng, level);
  const { start, l1, l2, fin, combine } = lrDevelopLines(d);
  let lines = [E(l1, 'Produit et quotient', 'split', 'split'), E(l2, 'Puissances', 'pow', 'pow')];
  if (combine) lines = level === 2 ? [...lines, E(fin, 'Réduire', 'reduce', 'reduce')] : [lines[0], E(fin, 'Puissances, puis réduire', 'pow', 'pow')];
  const script = level === 2 ? [blanked(lines[0], [`ln(${d.num[0].text.replace(/^\((.*)\)$/, '$1')})`]), ...lines.slice(1)] : [...lines];
  if (level === 3) {
    script.push({ kind: 'rule', ask: 'Quelle règle as-tu utilisée à la première ligne ?', correct: 'prod', options: [
      { id: 'prod', label: 'ln(uv) = ln u + ln v' }, { id: 'pow', label: 'ln(uᵖ) = p·ln u' },
      { id: 'sum', label: 'ln(u + v) = ln u + ln v' }, { id: 'chg', label: 'log_a y = ln y / ln a' },
    ] });
  }
  const judge = { kind: 'equiv', vars: [V], domain: { x: [0.2, 5] }, target: 'log-expanded' };
  return linesItem({
    skill: LR, level, prompt: `Développe ${MT(start)} (x > 0) : écris-le avec ln x et des ln(x + c) seulement.`,
    start, judge: withMenus(judge, level, start, lines, LR_CHOICES), mode: modeOf(level), script,
    hints: H('ln d\'un produit = somme des ln ; ln d\'un quotient = différence. Puis l\'exposant sort devant.', `${MT(l1)}, puis ln(√u) = (1/2)·ln u`, MT(lines[0].math)),
    subgoals: LR_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${LR}:${start}`, exam: examOf(opts),
  });
}

function lrCondense(level, rng, opts) {
  const a = rng.int(2, 3);
  const b = rng.int(1, 2);
  const c = rng.int(1, 5);
  const k = rng.int(1, 2);
  const start = `${a}ln(x)-${b === 1 ? '' : b}ln(x+${c})+${k}`;
  const den = b === 1 ? `(x+${c})` : `(x+${c})^${b}`;
  const lines = [
    E(`ln(x^${a})-ln(${den.replace(/^\((.*)\)$/, '$1')})+ln(${k === 1 ? 'e' : `e^${k}`})`, 'p·ln u = ln(uᵖ), k = ln(eᵏ)', 'pow'),
    E(`ln(${k === 1 ? 'e' : `e^${k}`}×x^${a}/${den})`, 'Un seul logarithme', 'split'),
  ];
  return linesItem({
    skill: LR, level, prompt: `Écris ${MT(start)} (x > 0) avec un seul logarithme.`,
    start, judge: { kind: 'equiv', vars: [V], domain: { x: [0.2, 5] }, target: 'log-single' }, mode: 'free', script: lines,
    hints: H('Fais d\'abord entrer chaque coefficient dans son ln (p·ln u = ln(uᵖ)), et écris le nombre comme un ln : k = ln(eᵏ).', `${MT(lines[0].math)}`, MT(lines[1].math)),
    subgoals: LR_SUB, keys: KEYS, key: `${LR}:${start}`, exam: examOf(opts),
  });
}

function lrChangeBase(rng, opts) {
  const a = rng.pick([2, 3, 5]);
  const b = rng.pick([3, 5, 7, 6].filter((x) => x !== a));
  const k = rng.int(2, 4);
  const c = a ** k;
  const start = `log_${a}(${b})×log_${b}(${c})`;
  const lines = [
    E(`ln(${b})/ln(${a})×ln(${c})/ln(${b})`, 'log_a y = ln y / ln a', 'pow'),
    E(`ln(${c})/ln(${a})`, `Simplifier par ln ${b}`, 'reduce'),
    E(`${k}ln(${a})/ln(${a})`, `${c} = ${a}^${k}`, 'pow'),
    E(String(k), 'Simplifier', 'reduce'),
  ];
  return linesItem({
    skill: LR, level: 5, prompt: `Calcule ${MT(start)} sans calculatrice.`,
    start, judge: { kind: 'value', form: 'any' }, mode: 'free', script: lines,
    hints: [], subgoals: LR_SUB, keys: KEYS, key: `${LR}:${start}`, exam: examOf(opts),
  });
}

function lrExam(rng, exam) {
  if (exam === 'tf') {
    const bank = [
      { s: 'Pour tous a, b > 0 : ln(a + b) = ln a · ln b.', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R+' }, { q: '∀', v: 'b', dom: 'R+' }], pred: 'ln(a+b)=ln(a)×ln(b)', ask: [{ v: 'a', label: 'a =' }, { v: 'b', label: 'b =' }], answer: { a: '1', b: '1' } }, why: 'Faux : avec a = b = 1, ln 2 ≈ 0,69, mais ln 1 · ln 1 = 0.', rule: 'g2_log_sum' },
      { s: 'log₂ 8 · log₈ 2 = 1.', truth: true, why: 'Vrai : log₂ 8 = 3 et log₈ 2 = 1/3.' },
      { s: 'Pour tout x > 0 : ln(x²) = (ln x)².', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R+' }], pred: 'ln(x^2)=ln(x)^2', ask: [{ v: 'x', label: 'x =' }], answer: { x: 'e' } }, why: 'Faux : ln(e²) = 2, mais (ln e)² = 1. L\'exposant sort devant : ln(x²) = 2 ln x.', rule: 'g2_log_power' },
      { s: 'Pour tous a, b > 0 : ln(a/b) = ln a − ln b.', truth: true, why: 'Vrai : c\'est la règle du quotient.' },
      { s: 'Pour tous a, b > 0 : ln a / ln b = ln(a − b)… n\'a pas de sens, mais ln(a/b) = ln a / ln b.', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R+' }, { q: '∀', v: 'b', dom: 'R+' }], pred: 'ln(a/b)=ln(a)/ln(b)', ask: [{ v: 'a', label: 'a =' }, { v: 'b', label: 'b =' }], answer: { a: '8', b: '2' } }, why: 'Faux : ln(8/2) = ln 4 ≈ 1,39, mais ln 8 / ln 2 = 3.', rule: 'g2_log_quotient' },
    ];
    const b = rng.pick(bank.filter((x) => !x.s.includes('n\'a pas de sens')).concat([{ ...bank[4], s: 'Pour tous a, b > 0 avec b ≠ 1 : ln(a/b) = ln a / ln b.' }]));
    return tfItem({
      skill: LR, level: 4, statement: b.s, truth: b.truth, counter: b.counter || null, ruleIfTrue: b.truth ? null : b.rule || null,
      key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 },
    });
  }
  const n = rng.int(2, 4);
  const c = rng.int(1, 5);
  const start = `ln(x^${n}/(x+${c}))`;
  const options = [
    { html: MT(`${n}ln(x)-ln(x+${c})`), correct: true },
    { html: MT(`ln(x)^${n}-ln(x+${c})`), correct: false, rule: 'g2_log_power' },
    { html: MT(`${n}ln(x)/ln(x+${c})`), correct: false, rule: 'g2_log_quotient' },
    { html: MT(`${n}ln(x)-ln(x)-ln(${c})`), correct: false, rule: 'g2_log_sum' },
  ];
  return mcq({
    skill: LR, level: 4, prompt: `Pour x > 0, ${MT(start)} =`, options, key: `mcq:${start}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `${MT(`ln(x^${n})-ln(x+${c})`)} = ${MT(`${n}ln(x)-ln(x+${c})`)}`, note: '' }],
  }, rng);
}

// ======================================================================
// g2-exp-eq
// ======================================================================

const XE = 'g2-exp-eq';
const XE_SUB = [
  { id: 'base', label: 'même base, ln des deux membres', skill: XE },
  { id: 'subst', label: 'poser t = eˣ', skill: XE },
  { id: 'trinome', label: 'résoudre en t', skill: 'quad-formula' },
  { id: 'back', label: 'revenir à x', skill: LR },
];
const XE_CHOICES = [
  { id: 'subst', label: 'Poser t = eˣ (ou t = 2ˣ)' },
  { id: 'solve', label: 'Résoudre le trinôme en t' },
  { id: 'sort', label: 'Garder les t > 0 et revenir à x' },
  { id: 'ln', label: 'Résoudre en x avec ln' },
  { id: 'lnall', label: 'Prendre ln de chaque terme', rule: 'g2_log_sum', why: 'ln d\'une somme ne se découpe pas : ln(e²ˣ − eˣ) ≠ 2x − x.' },
];

function xeSameBase(level, rng, opts) {
  let d = null;
  for (let i = 0; i < 300 && !d; i++) {
    const b = rng.pick([2, 3]);
    const k = rng.pick([2, 3]);
    const x0 = rng.int(-3, 4);
    const r = rng.int(1, 2);
    const s = rng.int(-3, 3);
    const p = rng.int(1, 3);
    const qq = k * (r * x0 + s) - p * x0;
    if (Math.abs(qq) > 9 || p === k * r || s === 0 || qq === 0) continue;
    d = { b, k, x0, r, s, p, qq };
  }
  d ||= { b: 2, k: 3, x0: 2, r: 1, s: -1, p: 1, qq: 1 };
  const { b, k, x0, r, s, p, qq } = d;
  const left = `${p === 1 ? '' : p}x${qq > 0 ? '+' : '-'}${Math.abs(qq)}`;
  const right = `${r === 1 ? '' : r}x${s > 0 ? '+' : '-'}${Math.abs(s)}`;
  const start = `${b}^(${left})=${b ** k}^(${right})`;
  const lines = [
    E(`${b}^(${left})=${b}^(${k}(${right}))`, `${b ** k} = ${b}^${k}`, 'base', 'base'),
    E(`${left}=${k}(${right})`, 'Comparer les exposants', 'base', 'base'),
    E(`x=${x0}`, 'Résoudre', 'base', 'solve'),
  ];
  const script = level === 1 ? [blanked(lines[0], [`${k}(${right})`]), lines[1], lines[2]] : lines;
  return linesItem({
    skill: XE, level, prompt: `Résous ${MT(start)}.`,
    start, judge: { kind: 'solset', v: V }, mode: modeOf(level), script,
    hints: H(`Écris ${b ** k} comme une puissance de ${b}, puis compare les exposants.`, `${b ** k} = ${b}^…, donc ${MT(start.split('=')[1])} = ${b}^(${k}(${right}))`, MT(lines[1].math)),
    subgoals: XE_SUB, keys: KEYS, key: `${XE}:${start}`, exam: examOf(opts),
  });
}

function xeLn(level, rng, opts) {
  const [a, b] = rng.pick([[3, 2], [2, 3], [5, 2], [2, 5], [3, 5], [5, 3], [7, 2]]);
  const p = nz(rng, -3, 3);
  const start = `${a}^(x${p > 0 ? '+' : '-'}${Math.abs(p)})=${b}^x`;
  const lines = [
    E(`(x${p > 0 ? '+' : '-'}${Math.abs(p)})ln(${a})=x ln(${b})`, 'ln des deux membres', 'base', 'ln'),
    ...(b > a
      ? [E(`x(ln(${b})-ln(${a}))=${coefText(p, `ln(${a})`)}`, 'Regrouper les x', 'base', 'ln'), E(`x=${coefText(p, `ln(${a})`)}/(ln(${b})-ln(${a}))`, 'Diviser', 'base', 'ln')]
      : [E(`x(ln(${a})-ln(${b}))=${coefText(-p, `ln(${a})`)}`, 'Regrouper les x', 'base', 'ln'), E(`x=${coefText(-p, `ln(${a})`)}/(ln(${a})-ln(${b}))`, 'Diviser', 'base', 'ln')]),
  ];
  const script = level <= 2 ? [blanked(lines[0], [`ln(${a})`, `ln(${b})`]), lines[1], lines[2]] : lines;
  return linesItem({
    skill: XE, level, prompt: `Résous ${MT(start)} (valeur exacte).`,
    start, judge: { kind: 'solset', v: V }, mode: modeOf(level), script,
    hints: H('Les bases sont différentes : prends ln des deux membres, ln(aᵘ) = u·ln a.', `(x ${p > 0 ? '+' : '−'} ${Math.abs(p)})·ln ${a} = x·…`, MT(lines[0].math)),
    subgoals: XE_SUB, keys: KEYS, key: `${XE}:${start}`, exam: examOf(opts),
  });
}

// Roots t₁, t₂ of the trinomial in t = eˣ (or 2ˣ): at least one > 0.
function xeSubstData(rng, { base = 'e', negative = 'maybe' } = {}) {
  const pool = base === 'e' ? [q(-3), q(-2), q(-1), q(1, 2), q(1), q(2), q(3), q(4)] : [q(-4), q(-2), q(-1), q(1, 2), q(1), q(2), q(4), q(8)];
  for (let i = 0; i < 300; i++) {
    const t1 = rng.pick(pool);
    const t2 = rng.pick(pool);
    if (t1.eq(t2)) continue;
    const neg = [t1, t2].filter((t) => t.n < 0).length;
    if (neg === 2) continue;
    if (negative === 'no' && neg) continue;
    if (negative === 'yes' && !neg) continue;
    // (t − t₁)(t − t₂)·m with integer coefficients.
    const m = (t1.d * t2.d) / gcd(t1.d, t2.d);
    const A = q(m);
    const B = t1.add(t2).neg().mul(m);
    const C = t1.mul(t2).mul(m);
    if (B.d !== 1 || C.d !== 1 || B.n === 0 || Math.abs(B.n) > 20 || Math.abs(C.n) > 40) continue;
    return { t1, t2, A: A.n, B: B.n, C: C.n };
  }
  return { t1: q(3), t2: q(-2), A: 1, B: -1, C: -6 };
}

// k·body: 2e^x, −t, 3×2^x (a × before a digit).
const coefText = (k, body) => (k === 1 ? body : k === -1 ? `-${body}` : /^\d/.test(body) ? `${k}×${body}` : `${k}${body}`);
function polyText(terms) {
  return joinSum(terms.filter(([k]) => k !== 0).map(([k, body]) => (body ? coefText(k, body) : String(k))));
}

function xeSubst(level, rng, opts, { base = 'e', negative = 'maybe' } = {}) {
  const d = xeSubstData(rng, { base, negative });
  const T = base === 'e' ? 'e^x' : '2^x';
  const sq = base === 'e' ? 'e^(2x)' : '4^x';
  const start = `${polyText([[d.A, sq], [d.B, T], [d.C, '']])}=0`;
  const tEq = `${polyText([[d.A, 't^2'], [d.B, 't'], [d.C, '']])}=0`;
  const ts = [d.t1, d.t2].sort((a, b) => b.valueOf() - a.valueOf());
  const pos = ts.filter((t) => t.n > 0);
  const xOf = (t) => (base === 'e' ? lnOf(t) : N(q(Math.round(Math.log2(t.valueOf())))));
  const xs = pos.map((t) => ({ t: xOf(t), v: Math.log(t.valueOf()) }));
  const lines = [
    E(tEq, `Posons t = ${base === 'e' ? 'eˣ' : '2ˣ'} > 0`, 'subst', 'subst'),
    E(orEq(ts.map(N), 't'), 'Résoudre le trinôme', 'trinome', 'solve'),
    E(pos.map((t) => `${T}=${N(t)}`).join(' ou '), ts.length > pos.length ? 'Garder t > 0, puis revenir à x' : 'Revenir à x', 'back', 'sort'),
    E(orEq(xs.sort((a, b) => a.v - b.v).map((x) => x.t)), 'Résoudre', 'back', 'ln'),
  ];
  const script = [];
  if (level === 3) {
    script.push({ kind: 'decision', prompt: 'Que fais-tu ?', options: [
      { id: 'subst', label: `Poser t = ${base === 'e' ? 'eˣ' : '2ˣ'} : ${base === 'e' ? 'e²ˣ' : '4ˣ'} = t²`, valid: true },
      { id: 'lnall', label: 'Prendre ln de chaque terme', valid: false, rule: 'g2_log_sum', why: 'ln d\'une somme ne se découpe pas.' },
      { id: 'same', label: 'Comparer les exposants', valid: false, why: 'Il y a trois termes : ce n\'est pas une égalité entre deux puissances.' },
    ] });
  }
  script.push(...lines);
  const judge = { kind: 'solset', v: V, subst: { t: T } };
  return linesItem({
    skill: XE, level, prompt: `Résous ${MT(start)}.${level >= 4 && level < 5 ? ` Tu peux poser t = ${base === 'e' ? 'eˣ' : '2ˣ'}.` : ''}`,
    start, judge: withMenus(judge, level, start, lines, XE_CHOICES), mode: modeOf(level), script,
    declares: { vars: [V, 't'] },
    hints: H(`${base === 'e' ? 'e²ˣ = (eˣ)²' : '4ˣ = (2ˣ)²'} : pose t = ${base === 'e' ? 'eˣ' : '2ˣ'}, qui est toujours > 0.`, `${MT(tEq)}, donc t = …`, MT(lines[1].math)),
    subgoals: XE_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${XE}:${start}`, exam: examOf(opts, 3), fallback: false,
  });
}

// Level 5: 4ˣ − 3·2^(x+1) + 8 = 0, written with 2^(x+1).
function xeLevel5(rng, opts) {
  const d = xeSubstData(rng, { base: '2', negative: 'no' });
  const B = d.B;
  const mid = B % 2 === 0 && B !== 0 ? [B / 2, '2^(x+1)'] : [B, '2^x'];
  const start = `${polyText([[d.A, '4^x'], mid, [d.C, '']])}=0`;
  const tEq = `${polyText([[d.A, 't^2'], [d.B, 't'], [d.C, '']])}=0`;
  const ts = [d.t1, d.t2].sort((a, b) => b.valueOf() - a.valueOf());
  const xs = ts.map((t) => ({ t: N(q(Math.round(Math.log2(t.valueOf())))), v: Math.log2(t.valueOf()) }));
  const lines = [
    E(tEq, 'Posons t = 2ˣ, 4ˣ = t², 2^(x+1) = 2t', 'subst'),
    E(orEq(ts.map(N), 't'), 'Résoudre', 'trinome'),
    E(ts.map((t) => `2^x=${N(t)}`).join(' ou '), 'Revenir à x', 'back'),
    E(orEq(xs.sort((a, b) => a.v - b.v).map((x) => x.t)), 'Puissances de 2', 'back'),
  ];
  return linesItem({
    skill: XE, level: 5, prompt: `Résous ${MT(start)}.`,
    start, judge: { kind: 'solset', v: V, subst: { t: '2^x' } }, mode: 'free', script: lines,
    declares: { vars: [V, 't'] }, hints: [], subgoals: XE_SUB, keys: KEYS, key: `${XE}:${start}`, exam: examOf(opts, 3),
  });
}

function xeItem(level, rng, opts = {}) {
  if (level === 1) return xeSameBase(level, rng, opts);
  if (level === 2) return rng.chance(0.5) ? xeLn(level, rng, opts) : xeSameBase(level, rng, opts);
  if (level === 3) return xeSubst(level, rng, opts, { negative: 'maybe' });
  if (level === 4) return rng.chance(0.75) ? xeSubst(level, rng, opts, { negative: rng.chance(0.5) ? 'yes' : 'no' }) : xeLn(level, rng, opts);
  return xeLevel5(rng, opts);
}

function xeMcq(rng) {
  const d = xeSubstData(rng, { negative: 'yes' });
  const start = `${polyText([[d.A, 'e^(2x)'], [d.B, 'e^x'], [d.C, '']])}=0`;
  const pos = [d.t1, d.t2].find((t) => t.n > 0);
  const negT = [d.t1, d.t2].find((t) => t.n < 0);
  const options = [
    { html: MT(`{${lnOf(pos)}}`), correct: true },
    { html: MT(setText([{ t: lnOf(pos), v: 1 }, { t: `ln(${N(negT)})`, v: 2 }])), correct: false, rule: 'g2_exp_neg_t' },
    { html: MT(setText([{ t: N(pos), v: pos.valueOf() }, { t: N(negT), v: negT.valueOf() }])), correct: false },
    { html: MT(`{${pos.eq(1) ? '1' : `e^${ex(pos)}`}}`), correct: false },
  ];
  return mcq({
    skill: XE, level: 4, prompt: `Ensemble des solutions de ${MT(start)} :`, options: uniq(options), key: `mcq:${start}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `t = eˣ : t = ${fr(N(pos))} ou t = ${fr(N(negT))} ; t > 0, donc eˣ = ${fr(N(pos))}.`, note: '' }],
  }, rng);
}

// ======================================================================
// g2-log-eq
// ======================================================================

const LE = 'g2-log-eq';
const LE_SUB = [
  { id: 'domain', label: 'domaine', skill: 'g1-domain' },
  { id: 'merge', label: 'regrouper les logarithmes', skill: LR },
  { id: 'exp', label: 'passer à l\'exponentielle', skill: LE },
  { id: 'solve', label: 'résoudre', skill: 'quad-formula' },
  { id: 'sort', label: 'trier selon le domaine', skill: LE },
];
const LE_CHOICES = [
  { id: 'domain', label: 'Écrire le domaine' },
  { id: 'merge', label: 'Regrouper en un seul logarithme' },
  { id: 'exp', label: 'Passer à l\'exponentielle : log_a u = k ⇔ u = aᵏ' },
  { id: 'solve', label: 'Résoudre l\'équation' },
  { id: 'sort', label: 'Garder les solutions du domaine' },
];
// (x − r) as a factor: x alone when r = 0.
const fac = (r) => (r === 0 ? V : `(${lin(r)})`);
const RD = (t) => fr(t.replace(/\*/g, '·'));
const logT = (a, u) => (a === 'e' ? `ln(${u})` : `log_${a}(${u})`);

function leData(rng) {
  for (let i = 0; i < 300; i++) {
    const [a, k] = rng.pick([[2, 1], [2, 2], [2, 3], [2, 4], [3, 1], [3, 2], [3, 3], [10, 1]]);
    const A = a ** k;
    const divs = [];
    for (let u = 1; u * u < A; u++) if (A % u === 0) divs.push(u);
    const u = rng.pick(divs);
    const w = A / u;
    const qq = rng.int(-3, 4);
    const r1 = qq + u;
    const p = r1 - w;
    const r2 = p - u;
    if (Math.abs(p) > 12 || Math.abs(r2) > 15) continue;
    return { a, k, A, p, q: qq, r1, r2 };
  }
  return { a: 2, k: 3, A: 8, p: -1, q: 1, r1: 3, r2: -3 };
}

function leMain(level, rng, opts) {
  const d = leData(rng);
  const { a, k, A, p, q: qq, r1, r2 } = d;
  const start = `${logT(a, lin(p))}+${logT(a, lin(qq))}=${k}`;
  const lines = [
    E(`D=]${qq};+∞[`, `Domaine : ${RD(lin(p))} > 0 et ${RD(lin(qq))} > 0`, 'domain', 'domain'),
    E(`${logT(a, `${fac(p)}${fac(qq)}`)}=${k}`, 'Regrouper', 'merge', 'merge'),
    E(`${fac(p)}${fac(qq)}=${A}`, `Passer à l'exponentielle : ${a}^${k} = ${A}`, 'exp', 'exp'),
    E(orEq([r1, r2].map(String)), 'Résoudre', 'solve', 'solve'),
    E(`{${r1}}`, `Trier selon D : ${fr(String(r2))} n'est pas dans D`, 'sort', 'sort'),
  ];
  let script = lines;
  if (level === 1) script = [{ kind: 'note', html: `Domaine : D = ]${fr(String(qq))} ; +∞[.` }, ...lines.slice(1).map((l, i) => (i === 1 ? blanked(l, [String(A)]) : l))];
  if (level === 2) script = [blanked(lines[0], [String(qq)]), ...lines.slice(1)];
  const judge = { kind: 'solset', v: V, onDomain: true, logs: true };
  const sLines = level === 1 ? lines.slice(1) : lines;
  return linesItem({
    skill: LE, level, prompt: `Résous ${MT(start)}.`,
    start, judge: withMenus(judge, level, start, sLines, LE_CHOICES), mode: modeOf(level), script,
    hints: H(`Commence par le domaine : ${MT(`${lin(p)}>0`)} et ${MT(`${lin(qq)}>0`)}.`, `log_${a}(…) = ${k} ⇔ (…) = ${a}^${k}`, MT(lines[2].math)),
    subgoals: LE_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${LE}:${start}`, exam: examOf(opts),
  });
}

// ln(x²) = 2 ln(x + c): the absolute value (g2_log_square_abs).
function leSquare(level, rng, opts) {
  const c = rng.int(1, 4);
  const start = `ln(x^2)=2ln(x+${c})`;
  const sol = N(q(-c, 2));
  const lines = [
    E(`D=]-${c};0[∪]0;+∞[`, 'Domaine : x ≠ 0 et x > −c', 'domain', 'domain'),
    E(`ln(x^2)=ln((x+${c})^2)`, '2 ln u = ln(u²)', 'merge', 'merge'),
    E(`x^2=(x+${c})^2`, 'ln est injective', 'exp', 'exp'),
    E(`${2 * c}x+${c * c}=0`, 'Développer', 'solve', 'solve'),
    E(`x=${sol}`, `Résoudre ; ${fr(sol)} est dans D`, 'sort', 'sort'),
  ];
  return linesItem({
    skill: LE, level, prompt: `Résous ${MT(start)}.`,
    start, judge: { kind: 'solset', v: V, onDomain: true, logs: true }, mode: modeOf(level), script: lines,
    hints: H('Attention : ln(x²) existe aussi pour x < 0. Ne remplace pas ln(x²) par 2 ln x.', `2 ln(x + ${c}) = ln((x + ${c})²)`, MT(lines[2].math)),
    subgoals: LE_SUB, keys: KEYS, key: `${LE}:${start}`, exam: examOf(opts),
  });
}

// Level 5: two bases, log₂ and log₄.
function leBases(rng, opts) {
  const [u1, u2] = rng.pick([[2, -1], [3, -2], [4, -3]]);
  const p = rng.int(-3, 3);
  const qq = -u1 * u2 - p;
  const start = `log_2(${lin(p)})=log_4(${lin(-qq)})`;
  const lines = [
    E(`D=]${p};+∞[`, `Domaine : ${RD(lin(p))} > 0 et ${RD(lin(-qq))} > 0`, 'domain'),
    E(`log_2(${lin(p)})=(1/2)log_2(${lin(-qq)})`, 'log₄ u = log₂ u / log₂ 4 = (1/2) log₂ u', 'merge'),
    E(`2log_2(${lin(p)})=log_2(${lin(-qq)})`, 'Multiplier par 2', 'merge'),
    E(`${p === 0 ? 'x' : `(${lin(p)})`}^2=${lin(-qq)}`, '2 log₂ u = log₂(u²), puis exponentielle', 'exp'),
    E(orEq([p + u2, p + u1].map(String)), 'Résoudre', 'solve'),
    E(`{${p + u1}}`, 'Trier selon D', 'sort'),
  ];
  return linesItem({
    skill: LE, level: 5, prompt: `Résous ${MT(start)}.`,
    start, judge: { kind: 'solset', v: V, onDomain: true, logs: true }, mode: 'free', script: lines,
    hints: [], subgoals: LE_SUB, keys: KEYS, key: `${LE}:${start}`, exam: examOf(opts),
  });
}

function leItem(level, rng, opts = {}) {
  if (level === 5) return leBases(rng, opts);
  if (level === 4 && rng.chance(0.4)) return leSquare(level, rng, opts);
  return leMain(level, rng, opts);
}

function leExam(rng, exam) {
  if (exam === 'tf') {
    const bank = [
      { s: 'Pour tout x ≠ 0 : ln(x²) = 2 ln x.', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: 'x≠0⇒ln(x^2)=2ln(x)', hyp: 'x≠0', ask: [{ v: 'x', label: 'x =' }], answer: { x: '-1' } }, why: 'Faux : pour x = −1, ln 1 = 0 existe, mais 2 ln(−1) n\'existe pas. ln(x²) = 2 ln|x|.', rule: 'g2_log_square_abs' },
      { s: 'Pour tout x > 0 : ln(x²) = 2 ln x.', truth: true, why: 'Vrai : pour x > 0, |x| = x.' },
      { s: 'Pour tous x, y > 0 : ln x + ln y = ln(x + y).', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R+' }, { q: '∀', v: 'y', dom: 'R+' }], pred: 'ln(x)+ln(y)=ln(x+y)', ask: [{ v: 'x', label: 'x =' }, { v: 'y', label: 'y =' }], answer: { x: '1', y: '1' } }, why: 'Faux : ln 1 + ln 1 = 0, mais ln 2 ≠ 0. ln x + ln y = ln(xy).', rule: 'g2_log_sum' },
    ];
    const b = rng.pick(bank);
    return tfItem({ skill: LE, level: 4, statement: b.s, truth: b.truth, counter: b.counter || null, ruleIfTrue: b.truth ? null : b.rule || null, key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 } });
  }
  const d = leData(rng);
  const start = `${logT(d.a, lin(d.p))}+${logT(d.a, lin(d.q))}=${d.k}`;
  const options = [
    { html: MT(`{${d.r1}}`), correct: true },
    { html: MT(setText([{ t: String(d.r1), v: d.r1 }, { t: String(d.r2), v: d.r2 }])), correct: false, rule: 'g2_log_domain' },
    { html: MT(`{${d.r2}}`), correct: false },
  ];
  const wrongSum = q(d.A + d.p + d.q, 2);
  if (!wrongSum.eq(d.r1)) options.push({ html: MT(`{${N(wrongSum)}}`), correct: false, rule: 'g2_log_sum' });
  else options.push({ html: MT('∅'), correct: false });
  return mcq({
    skill: LE, level: 4, prompt: `Ensemble des solutions de ${MT(start)} :`, options: uniq(options), key: `mcq:${start}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `D = ]${fr(String(d.q))} ; +∞[ ; (${MT(lin(d.p))})(${MT(lin(d.q))}) = ${d.A} donne x = ${fr(String(d.r1))} ou x = ${fr(String(d.r2))} ; seul ${fr(String(d.r1))} est dans D.`, note: '' }],
  }, rng);
}

// ======================================================================
// g2-ineq
// ======================================================================

const IQ = 'g2-ineq';
const IQ_SUB = [
  { id: 'domain', label: 'domaine', skill: 'g1-domain' },
  { id: 'base', label: 'base < 1 : retourner', skill: IQ },
  { id: 'merge', label: 'regrouper les logarithmes', skill: LE },
  { id: 'exp', label: 'passer à l\'exponentielle', skill: XE },
  { id: 'trinome', label: 'inéquation du 2e degré', skill: 'g1-trinome-sign' },
  { id: 'inter', label: 'intersecter avec D', skill: IQ },
];
const IQ_CHOICES = [
  { id: 'domain', label: 'Écrire le domaine' },
  { id: 'drop', label: 'Enlever les logarithmes (en retournant si la base est < 1)' },
  { id: 'merge', label: 'Ramener à une base, regrouper' },
  { id: 'exp', label: 'Passer à l\'exponentielle' },
  { id: 'solve', label: 'Résoudre' },
  { id: 'inter', label: 'Intersecter avec le domaine' },
];
const FLIP = { '<': '>', '>': '<', '≤': '≥', '≥': '≤' };
const IQ_BASES = [{ b: '(1/2)', lt1: true }, { b: '(1/3)', lt1: true }, { b: '(1/10)', lt1: true }, { b: '2', lt1: false }, { b: '3', lt1: false }, { b: '10', lt1: false }];

// log_b(px + q) R log_b(rx + s): the crossing x* lies in the domain.
function iqData(rng, lt1) {
  for (let i = 0; i < 300; i++) {
    const base = rng.pick(IQ_BASES.filter((x) => lt1 === undefined || x.lt1 === lt1));
    const p = rng.int(1, 3);
    const r = rng.int(1, 3);
    if (p === r) continue;
    const qq = rng.int(-5, 5);
    const s = rng.int(-5, 5);
    const xs = q(s - qq, p - r);
    if (xs.d !== 1) continue;
    const dlo = [q(-qq, p), q(-s, r)].reduce((m, x) => (x.valueOf() > m.valueOf() ? x : m));
    if (xs.valueOf() <= dlo.valueOf() + 0.5 || dlo.d > 3) continue;
    const R = rng.pick(['<', '>', '≤', '≥']);
    return { ...base, p, qq, r, s, xs, dlo, R };
  }
  return { b: '(1/3)', lt1: true, p: 2, qq: -1, r: 1, s: 2, xs: q(3), dlo: q(1, 2), R: '>' };
}

// The answer of px + q R' rx + s on ]d ; +∞[.
function iqAnswer(d, rel) {
  // (p − r)x R' (s − q): divide by p − r.
  const pr = d.p - d.r;
  const R2 = pr > 0 ? rel : FLIP[rel];
  const open = R2 === '<' || R2 === '>';
  const lo = N(d.dlo);
  const xs = N(d.xs);
  return { rel: R2, set: R2 === '<' || R2 === '≤' ? `]${lo};${xs}${open ? '[' : ']'}` : `${open ? ']' : '['}${xs};+∞[` };
}

function iqSimple(level, rng, opts) {
  const lt1 = level === 2 ? true : level === 1 ? false : undefined;
  const d = iqData(rng, lt1);
  const linP = `${d.p === 1 ? '' : d.p}x${d.qq >= 0 ? '+' : '-'}${Math.abs(d.qq)}`.replace(/[+-]0$/, '');
  const linR = `${d.r === 1 ? '' : d.r}x${d.s >= 0 ? '+' : '-'}${Math.abs(d.s)}`.replace(/[+-]0$/, '');
  const start = `log_${d.b}(${linP})${d.R}log_${d.b}(${linR})`;
  const rel = d.lt1 ? FLIP[d.R] : d.R;
  const ans = iqAnswer(d, rel);
  const lines = [
    E(`D=]${N(d.dlo)};+∞[`, `Domaine : ${RD(linP)} > 0 et ${RD(linR)} > 0`, 'domain', 'domain'),
    E(`${linP}${rel}${linR}`, d.lt1 ? `Base ${d.b.replace(/[()]/g, '')} < 1 : on retourne` : 'Base > 1 : même sens', 'base', 'drop'),
    E(`x${ans.rel}${N(d.xs)}`, 'Résoudre', 'inter', 'solve'),
    E(ans.set, 'Intersecter avec D', 'inter', 'inter'),
  ];
  const script = [];
  if (level === 1) script.push({ kind: 'note', html: `Domaine : D = ]${fr(N(d.dlo))} ; +∞[.` });
  else script.push(lines[0]);
  if (level === 2) {
    script.push({ kind: 'decision', prompt: 'Quand on enlève les logarithmes, faut-il retourner l\'inégalité ?', options: [
      { id: 'yes', label: `Oui : la base ${d.b.replace(/[()]/g, '')} est < 1`, valid: true },
      { id: 'no', label: 'Non : on garde le même sens', valid: false, rule: 'g2_base_lt1', why: `log_${d.b.replace(/[()]/g, '')} est décroissante : le plus grand logarithme a le plus petit argument.` },
    ] });
  }
  script.push(level <= 2 ? blanked(lines[1], [linP]) : lines[1], lines[2], lines[3]);
  const sLines = level === 1 ? lines.slice(1) : lines;
  const judge = { kind: 'solset', v: V, onDomain: true, logs: true };
  return linesItem({
    skill: IQ, level, prompt: `Résous ${MT(start)}.`,
    start, judge: withMenus(judge, level, start, sLines, IQ_CHOICES), mode: modeOf(level), script,
    hints: H(d.lt1 ? `log_${d.b.replace(/[()]/g, '')} est décroissante : le plus grand logarithme a le plus petit argument.` : 'log est croissante si la base est > 1 : on garde le sens.', `${MT(linP)} ${rel} …`, MT(lines[1].math)),
    subgoals: IQ_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${IQ}:${start}`, exam: examOf(opts, 3),
  });
}

// MAN form: log_{1/b}(x − p) ≥ −k + log_b(x + q).
function iqManData(rng) {
  for (let i = 0; i < 300; i++) {
    const [b, k] = rng.pick([[2, 2], [2, 3], [2, 4], [3, 2], [3, 3]]);
    const A = b ** k;
    const divs = [];
    for (let u = 1; u * u < A; u++) if (A % u === 0) divs.push(u);
    const u = rng.pick(divs);
    const pq = A / u - u;
    const p = rng.int(-3, 4);
    const qq = pq - p;
    if (Math.abs(qq) > 8 || qq === 0 || p === 0) continue;
    const r1 = p + u;
    const r2 = -qq - u;
    const le = rng.chance(0.6);
    return { b, k, A, p, q: qq, r1, r2, le };
  }
  return { b: 2, k: 3, A: 8, p: 2, q: 5, r1: 3, r2: -6, le: true };
}

function iqMan(level, rng, opts) {
  const d = iqManData(rng);
  const { b, k, A, p, r1, r2, le } = d;
  const qq = d.q;
  const R = le ? '≥' : '≤';
  const start = `log_(1/${b})(${lin(p)})${R}-${k}+log_${b}(${lin(-qq)})`;
  const tri = polyText([[1, 'x^2'], [qq - p, 'x'], [-p * qq - A, '']]);
  const inner = le ? '≤' : '≥';
  const lines = [
    E(`D=]${p};+∞[`, `Domaine : ${RD(lin(p))} > 0 et ${RD(lin(-qq))} > 0`, 'domain', 'domain'),
    E(`-log_${b}(${lin(p)})${R}-${k}+log_${b}(${lin(-qq)})`, `log_{1/${b}} u = −log_${b} u`, 'merge', 'merge'),
    E(`${k}${R}log_${b}(${fac(p)}${fac(-qq)})`, 'Regrouper', 'merge', 'merge'),
    E(`${fac(p)}${fac(-qq)}${inner}${A}`, `Base ${b} > 1 : exponentielle, même sens`, 'exp', 'exp'),
    E(`${tri}${inner}0`, 'Développer', 'trinome', 'solve'),
    E(le ? `${r2}≤x≤${r1}` : `x≤${r2} ou x≥${r1}`, 'Signe du trinôme', 'trinome', 'solve'),
    E(le ? `]${p};${r1}]` : `[${r1};+∞[`, 'Intersecter avec D', 'inter', 'inter'),
  ];
  const judge = { kind: 'solset', v: V, onDomain: true, logs: true };
  return linesItem({
    skill: IQ, level, prompt: `Résous ${MT(start)}.`,
    start, judge: withMenus(judge, level, start, lines, IQ_CHOICES), mode: modeOf(level), script: lines,
    hints: H(`Domaine d'abord. Puis log_{1/${b}} u = −log_${b} u : tout en base ${b}.`, `${k} ${R} log_${b}(…), donc (${MT(lin(p))})(${MT(lin(-qq))}) ${inner} ${b}^${k}`, MT(lines[2].math)),
    subgoals: IQ_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${IQ}:${start}`, exam: examOf(opts, 8),
  });
}

// (1/2)^(…) < (1/2)^(…): an exponential with a base < 1.
function iqExp(level, rng, opts) {
  const [B, Bt] = rng.pick([['(1/2)', '1/2'], ['(1/3)', '1/3'], ['(2/3)', '2/3'], ['3', '3'], ['2', '2']]);
  const lt1 = Bt.includes('/');
  const p = rng.int(1, 3);
  const r = rng.pick([1, 2, 3].filter((x) => x !== p));
  const xs = rng.int(-3, 4);
  const qq = rng.int(-4, 4);
  const s = (p - r) * xs + qq;
  const R = rng.pick(['<', '>', '≤', '≥']);
  const lp = `${p === 1 ? '' : p}x${qq >= 0 ? '+' : '-'}${Math.abs(qq)}`.replace(/[+-]0$/, '');
  const lr = `${r === 1 ? '' : r}x${s >= 0 ? '+' : '-'}${Math.abs(s)}`.replace(/[+-]0$/, '');
  const start = `${B}^(${lp})${R}${B}^(${lr})`;
  const rel = lt1 ? FLIP[R] : R;
  const R2 = p - r > 0 ? rel : FLIP[rel];
  const open = R2 === '<' || R2 === '>';
  const set = R2 === '<' || R2 === '≤' ? `]-∞;${xs}${open ? '[' : ']'}` : `${open ? ']' : '['}${xs};+∞[`;
  const lines = [
    E(`${lp}${rel}${lr}`, lt1 ? `Base ${Bt} < 1 : on retourne` : 'Base > 1 : même sens', 'base', 'drop'),
    E(`x${R2}${xs}`, 'Résoudre', 'base', 'solve'),
    E(set, 'Écrire l\'ensemble', 'base', 'inter'),
  ];
  return linesItem({
    skill: IQ, level, prompt: `Résous ${MT(start)}.`,
    start, judge: { kind: 'solset', v: V }, mode: modeOf(level), script: lines,
    hints: H(lt1 ? `x ↦ (${Bt})ˣ est décroissante : on retourne l'inégalité entre les exposants.` : `x ↦ ${Bt}ˣ est croissante : même sens entre les exposants.`, `${MT(lp)} ${rel} ${MT(lr)}`, MT(lines[0].math)),
    subgoals: IQ_SUB, keys: KEYS, key: `${IQ}:${start}`, exam: examOf(opts, 3),
  });
}

function iqItem(level, rng, opts = {}) {
  if (level <= 2) return iqSimple(level, rng, opts);
  if (level === 3) return rng.chance(0.5) ? iqMan(level, rng, opts) : iqSimple(level, rng, opts);
  if (level === 4) return rng.pick([iqSimple, iqExp, iqMan])(level, rng, opts);
  return iqMan(5, rng, opts);
}

function iqMcq(rng) {
  const d = iqData(rng, true);
  const linP = `${d.p === 1 ? '' : d.p}x${d.qq >= 0 ? '+' : '-'}${Math.abs(d.qq)}`.replace(/[+-]0$/, '');
  const linR = `${d.r === 1 ? '' : d.r}x${d.s >= 0 ? '+' : '-'}${Math.abs(d.s)}`.replace(/[+-]0$/, '');
  const start = `log_${d.b}(${linP})${d.R}log_${d.b}(${linR})`;
  const right = iqAnswer(d, FLIP[d.R]);
  const flipped = iqAnswer(d, d.R);
  // Without the domain: the half-line of x R' x*.
  const nodom = right.rel === '<' || right.rel === '≤' ? `]-∞;${N(d.xs)}${right.rel === '<' ? '[' : ']'}` : null;
  const options = [
    { html: MT(right.set), correct: true },
    { html: MT(flipped.set), correct: false, rule: 'g2_base_lt1' },
  ];
  if (nodom) options.push({ html: MT(nodom), correct: false, rule: 'g2_log_domain' });
  options.push({ html: MT(`]${N(d.dlo)};+∞[`), correct: false });
  return mcq({
    skill: IQ, level: 4, prompt: `Ensemble des solutions de ${MT(start)} :`, options: uniq(options), key: `mcq:${start}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `D = ]${fr(N(d.dlo))} ; +∞[ ; base < 1 : ${MT(`${linP}${FLIP[d.R]}${linR}`)}.`, note: '' }],
  }, rng);
}

// ======================================================================
// g2-xx
// ======================================================================

const XX = 'g2-xx';
const XX_SUB = [
  { id: 'exp', label: 'écrire avec e', skill: XX },
  { id: 'compare', label: 'comparer les exposants', skill: LE },
  { id: 'factor', label: 'factoriser', skill: XX },
  { id: 'zero', label: 'produit nul', skill: 'eq-product' },
];
const XX_CHOICES = [
  { id: 'exp', label: 'Écrire chaque membre avec e : xᵃ = e^(a ln x)' },
  { id: 'compare', label: 'Comparer les exposants (exp est injective)' },
  { id: 'factor', label: 'Factoriser par ln x' },
  { id: 'zero', label: 'Produit nul : chaque facteur' },
  { id: 'div', label: 'Diviser par ln x', rule: 'g2_xx_lost_one', why: 'ln x peut être nul : on perd x = 1.' },
];

function xxData(rng, kind) {
  if (kind === 'pow') {
    const p = rng.int(2, 4);
    return {
      kind, start: `(x^${p})^x=x^(x^2)`, exps: [`${p}x ln(x)`, `x^2ln(x)`],
      factor: `x ln(x)(${p}-x)=0`, sols: [1, p],
    };
  }
  if (kind === 'quad') {
    const [r1, r2] = rng.pick([[2, 3], [2, 4], [3, 4], [2, 5], [3, 5]]);
    const s = r1 + r2;
    const c = r1 * r2;
    return {
      kind, start: `x^(x^2+${c})=x^(${s}x)`, exps: [`(x^2+${c})ln(x)`, `${s}x ln(x)`],
      factor: `(x-${r1})(x-${r2})ln(x)=0`, mid: `(x^2-${s}x+${c})ln(x)=0`, sols: [1, r1, r2],
    };
  }
  const n = rng.pick([2, 3]);
  const root = n === 2 ? 'sqrt(x)' : 'x^(1/3)';
  return {
    kind, start: `x^(${root})=(${root})^x`, exps: [`${root}ln(x)`, `(x/${n})ln(x)`],
    factor: `ln(x)(${root}-x/${n})=0`, sols: n === 2 ? [1, 4] : [1, '3√3'],
  };
}

function xxItem(level, rng, opts = {}) {
  const kind = level === 5 ? 'root' : level === 4 ? rng.pick(['pow', 'quad']) : level === 3 ? rng.pick(['pow', 'quad']) : 'pow';
  const d = xxData(rng, kind);
  const [f, g] = d.exps;
  const fin = `{${d.sols.join(';')}}`;
  const lines = [
    E(`e^(${f})=e^(${g})`, 'Écrire avec e', 'exp', 'exp'),
    E(`${f}=${g}`, 'Comparer les exposants', 'compare', 'compare'),
    ...(d.mid ? [E(d.mid, 'Tout d\'un côté, factoriser par ln x', 'factor', 'factor')] : []),
    E(d.factor, 'Factoriser', 'factor', 'factor'),
    E(fin, d.kind === 'root' ? (d.sols[1] === 4 ? 'ln x = 0, ou √x = x/2 : x = 4' : 'ln x = 0, ou x^(2/3) = 3 : x = 3√3') : 'Produit nul (x = 0 exclu)', 'zero', 'zero'),
  ];
  let script = lines;
  if (level === 1) script = [{ kind: 'note', html: `Avec e : ${MT(lines[0].math)}` }, ...lines.slice(1).map((l) => (l.subgoal === 'factor' && l.math === d.factor ? blanked(l, [d.kind === 'pow' ? `${d.sols[1]}-x` : `x-${d.sols[2]}`]) : l))];
  if (level === 2) script = [blanked(lines[0], [f]), ...lines.slice(1)];
  const sLines = level === 1 ? lines.slice(1) : lines;
  const judge = { kind: 'solset', v: V, domain: ']0;+∞[' };
  return linesItem({
    skill: XX, level, prompt: `Résous ${MT(d.start)} pour x > 0.`,
    start: d.start, judge: withMenus(judge, level, d.start, sLines, XX_CHOICES), mode: modeOf(level), script,
    hints: H('Pour x > 0 : xᵃ = e^(a ln x). Puis compare les exposants, sans diviser par ln x.', `${MT(`${f}-(${g})`)} = ln x·(…)`, MT(lines[1].math)),
    subgoals: XX_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null, baits: ['g2_xx_lost_one'],
    key: `${XX}:${d.start}`, exam: examOf(opts, 5),
  });
}

function xxMcq(rng) {
  const d = xxData(rng, rng.pick(['pow', 'quad']));
  const rest = d.sols.slice(1);
  const options = [
    { html: MT(`{${d.sols.join(';')}}`), correct: true },
    { html: MT(`{${rest.join(';')}}`), correct: false, rule: 'g2_xx_lost_one' },
    { html: MT(`{0;${d.sols.join(';')}}`), correct: false },
    { html: MT(`{${rest.map((x) => -x).reverse().join(';')};${d.sols.join(';')}}`), correct: false },
  ];
  return mcq({
    skill: XX, level: 4, prompt: `Pour x > 0, ensemble des solutions de ${MT(d.start)} :`, options: uniq(options), key: `mcq:${d.start}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `${MT(d.factor)} : ln x = 0 donne x = 1.`, note: '' }],
  }, rng);
}

// ----------------------------------------------------------------------


// ======================================================================
// g2-hyp-def
// ======================================================================

const HD = 'g2-hyp-def';
const HD_SUB = [
  { id: 'def', label: 'définitions de sinh, cosh', skill: HD },
  { id: 'eln', label: 'e^(ln a) = a', skill: LR },
  { id: 'parity', label: 'parité', skill: 'g1-parity-period' },
  { id: 'calc', label: 'calculer', skill: HD },
];

function hdValue(level, rng, opts, fn = rng.pick(['sinh', 'cosh'])) {
  const a = level === 1 ? q(rng.pick([2, 3, 4, 5])) : rng.pick([q(2), q(3), q(4), q(1, 2), q(1, 3)]);
  const A = N(a);
  const inv = q(1).div(a);
  const s = fn === 'sinh' ? '-' : '+';
  const value = fn === 'sinh' ? a.sub(inv).div(2) : a.add(inv).div(2);
  const start = `${fn}(ln(${A}))`;
  const lines = [
    E(`(e^(ln(${A}))${s}e^(-ln(${A})))/2`, `Définition de ${fn}`, 'def'),
    E(`(${A}${s}${N(inv)})/2`, 'e^(ln a) = a et e^(−ln a) = 1/a', 'eln'),
    E(N(value), 'Calculer', 'calc'),
  ];
  const script = level === 1 ? [lines[0], blanked(lines[1], [N(inv)]), lines[2]] : lines;
  return linesItem({
    skill: HD, level, prompt: `Calcule ${MT(start)}.`,
    start, judge: { kind: 'value', form: 'irreducible' }, mode: modeOf(level), script,
    hints: H(`${fn} u = (eᵘ ${s === '-' ? '−' : '+'} e⁻ᵘ)/2, et e^(ln a) = a.`, `e^(ln ${fr(A)}) = ${fr(A)} et e^(−ln ${fr(A)}) = …`, MT(lines[1].math)),
    subgoals: HD_SUB, keys: KEYS, key: `${HD}:${start}`, exam: examOf(opts),
  });
}

function hdTanh(level, rng, opts) {
  const a = rng.pick([q(2), q(3), q(4), q(1, 2), q(1, 3)]);
  const A = N(a);
  const inv = q(1).div(a);
  const sv = a.sub(inv).div(2);
  const cv = a.add(inv).div(2);
  const start = `tanh(ln(${A}))`;
  const lines = [
    E(`sinh(ln(${A}))/cosh(ln(${A}))`, 'tanh = sinh / cosh', 'def'),
    E(`(${N(sv)})/(${N(cv)})`, 'Valeurs de sinh et cosh', 'eln'),
    E(N(sv.div(cv)), 'Simplifier', 'calc'),
  ];
  const script = level === 2 ? [lines[0], blanked(lines[1], [N(sv)]), lines[2]] : lines;
  return linesItem({
    skill: HD, level, prompt: `Calcule ${MT(start)}.`,
    start, judge: { kind: 'value', form: 'irreducible' }, mode: modeOf(level), script,
    hints: H('tanh = sinh / cosh : calcule sinh(ln a) et cosh(ln a).', `sinh(ln ${fr(A)}) = (${fr(A)} − ${fr(N(inv))})/2 = …`, MT(lines[1].math)),
    subgoals: HD_SUB, keys: KEYS, key: `${HD}:${start}`, exam: examOf(opts),
  });
}

const HD_IDENT = [
  { start: 'cosh(x)^2-sinh(x)^2', goal: '1', lines: [['((e^x+e^(-x))/2)^2-((e^x-e^(-x))/2)^2', 'Définitions'], ['(e^(2x)+2+e^(-2x))/4-(e^(2x)-2+e^(-2x))/4', 'Développer les carrés'], ['1', 'Réduire']] },
  { start: 'cosh(x)+sinh(x)', goal: 'e^x', lines: [['(e^x+e^(-x))/2+(e^x-e^(-x))/2', 'Définitions'], ['e^x', 'Réduire']] },
  { start: 'cosh(x)-sinh(x)', goal: 'e^(-x)', lines: [['(e^x+e^(-x))/2-(e^x-e^(-x))/2', 'Définitions'], ['e^(-x)', 'Réduire']] },
  { start: 'sinh(-x)', goal: '-sinh(x)', parity: true, lines: [['(e^(-x)-e^x)/2', 'Définition, avec −x'], ['-(e^x-e^(-x))/2', 'Sortir le signe'], ['-sinh(x)', 'sinh est impaire']] },
  { start: 'cosh(-x)', goal: 'cosh(x)', parity: true, lines: [['(e^(-x)+e^x)/2', 'Définition, avec −x'], ['cosh(x)', 'cosh est paire']] },
  { start: '1-tanh(x)^2', goal: '1/cosh(x)^2', lines: [['(cosh(x)^2-sinh(x)^2)/cosh(x)^2', 'tanh = sinh/cosh, même dénominateur'], ['1/cosh(x)^2', 'cosh² − sinh² = 1']] },
];

function hdIdentity(level, rng, opts) {
  const b = rng.pick(HD_IDENT);
  const lines = b.lines.map(([math, note], i) => E(math, note, i === 0 ? 'def' : b.parity && i === b.lines.length - 1 ? 'parity' : 'calc'));
  return linesItem({
    skill: HD, level, prompt: `Montre que ${MT(`${b.start}=${b.goal}`)} pour tout x, avec les exponentielles.`,
    start: b.start, judge: { kind: 'equiv', vars: [V], domain: { x: [-2, 2] }, target: 'goal', goal: b.goal }, mode: modeOf(level), script: lines,
    hints: H('Remplace sinh et cosh par leurs formules en eˣ et e⁻ˣ, puis développe.', `cosh x = (eˣ + e⁻ˣ)/2, sinh x = (eˣ − e⁻ˣ)/2 : ${MT(lines[0].math)}`, MT(lines[Math.max(0, lines.length - 2)].math)),
    subgoals: HD_SUB, keys: KEYS, key: `${HD}:id:${b.start}`, exam: examOf(opts),
  });
}

const HD_PROPS = [
  { q: 'Quelle fonction est paire ?', right: 'cosh', wrong: ['sinh', 'tanh', 'x ↦ eˣ'] },
  { q: 'Quelle est l\'image de tanh ?', right: ']−1 ; 1[', wrong: ['ℝ', '[1 ; +∞[', ']0 ; 1['] },
  { q: 'Quelle est l\'image de cosh ?', right: '[1 ; +∞[', wrong: ['ℝ', ']0 ; +∞[', '[0 ; +∞['] },
  { q: 'Laquelle est croissante sur ℝ ?', right: 'sinh', wrong: ['cosh', 'x ↦ 1/cosh x', 'x ↦ e⁻ˣ'] },
  { q: 'Que vaut cosh 0 ?', right: '1', wrong: ['0', '1/2', '2'] },
  { q: 'Quelle fonction est impaire ?', right: 'tanh', wrong: ['cosh', 'x ↦ eˣ', 'x ↦ cosh x − 1'] },
  { q: 'Le graphe de cosh ressemble à…', right: 'une chaînette : paire, minimum 1 en 0', wrong: ['une droite croissante', 'une courbe impaire bornée par −1 et 1', 'une exponentielle croissante'] },
];

function hdProps(level, rng, opts = {}) {
  const b = rng.pick(HD_PROPS);
  return mcq({
    skill: HD, level, prompt: b.q, key: `${HD}:prop:${b.q}`,
    options: [{ html: b.right, correct: true }, ...b.wrong.map((w) => ({ html: w, correct: false }))],
    exam: examOf(opts), solution: [{ html: `${b.right}.`, note: '' }],
  }, rng);
}

function hdItem(level, rng, opts = {}) {
  if (level === 1) return hdValue(level, rng, opts);
  if (level === 2) return hdTanh(level, rng, opts);
  if (level === 3) return hdProps(level, rng, opts);
  if (level === 4) return hdIdentity(level, rng, opts);
  return rng.pick([() => hdValue(5, rng, opts), () => hdTanh(5, rng, opts), () => hdIdentity(5, rng, opts)])();
}

function hdExam(rng, exam) {
  if (exam === 'tf') {
    const one = (v, dom = 'R') => ({ q: '∀', v, dom });
    const bank = [
      { s: 'cosh est croissante sur ℝ : si a < b, alors cosh a < cosh b.', truth: false, counter: { kind: 'refute', quants: [one('a'), one('b')], pred: 'a<b⇒cosh(a)<cosh(b)', hyp: 'a<b', ask: [{ v: 'a', label: 'a =' }, { v: 'b', label: 'b =' }], answer: { a: '-1', b: '0' } }, why: 'Faux : cosh(−1) ≈ 1,54 > cosh 0 = 1. cosh décroît sur ]−∞ ; 0].' },
      { s: 'tanh x < 1 pour tout réel x.', truth: true, why: 'Vrai : sinh x < cosh x, car cosh x − sinh x = e⁻ˣ > 0.' },
      { s: 'sinh(−x) = −sinh x pour tout réel x.', truth: true, why: 'Vrai : sinh est impaire.' },
      { s: 'cosh x ≥ 1 pour tout réel x.', truth: true, why: 'Vrai : cosh x = (eˣ + e⁻ˣ)/2 ≥ 1, avec égalité en 0.' },
      { s: 'sinh x ≥ 0 pour tout réel x.', truth: false, counter: { kind: 'refute', quants: [one('x')], pred: 'sinh(x)≥0', ask: [{ v: 'x', label: 'x =' }], answer: { x: '-1' } }, why: 'Faux : sinh(−1) < 0, sinh est impaire.' },
      { s: 'tanh est paire : tanh(−x) = tanh x pour tout x.', truth: false, counter: { kind: 'refute', quants: [one('x')], pred: 'tanh(-x)=tanh(x)', ask: [{ v: 'x', label: 'x =' }], answer: { x: '1' } }, why: 'Faux : tanh est impaire, tanh(−1) = −tanh 1 ≠ tanh 1.' },
    ];
    const b = rng.pick(bank);
    return tfItem({ skill: HD, level: 4, statement: b.s, truth: b.truth, counter: b.counter || null, key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 } });
  }
  const a = rng.pick([2, 3, 4, 5]);
  const inv = q(1, a);
  const right = q(a).add(inv).div(2);
  const options = uniq([
    { html: fr(N(right)), correct: true },
    { html: fr(N(q(a).sub(inv).div(2))), correct: false, rule: 'g2_hyp_trig_sign' },
    { html: fr(N(q(a).add(inv))), correct: false },
    { html: fr(N(q(a, 2))), correct: false },
  ]);
  return mcq({
    skill: HD, level: 4, prompt: `${MT(`cosh(ln(${a}))`)} =`, options, key: `mcq:cosh${a}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `(${a} + 1/${a})/2 = ${fr(N(right))}`, note: '' }],
  }, rng);
}

// ======================================================================
// g2-hyp-formulas
// ======================================================================

const HF = 'g2-hyp-formulas';
const HF_SUB = [
  { id: 'def', label: 'définitions', skill: HD },
  { id: 'formula', label: 'formules', skill: HF },
];
const HF_VERIFY = [
  { start: '2sinh(x)cosh(x)', goal: 'sinh(2x)', lines: [['2×(e^x-e^(-x))/2×(e^x+e^(-x))/2', 'Définitions'], ['(e^(2x)-e^(-2x))/2', '(a − b)(a + b) = a² − b²'], ['sinh(2x)', 'Définition de sinh 2x']], blank: '(e^x+e^(-x))/2' },
  { start: 'cosh(x)^2+sinh(x)^2', goal: 'cosh(2x)', lines: [['((e^x+e^(-x))/2)^2+((e^x-e^(-x))/2)^2', 'Définitions'], ['(e^(2x)+e^(-2x))/2', 'Développer, réduire'], ['cosh(2x)', 'Définition de cosh 2x']], blank: '((e^x-e^(-x))/2)^2' },
];
const HF_ADD = [
  { start: 'cosh(x)cosh(y)+sinh(x)sinh(y)', goal: 'cosh(x+y)', lines: [['((e^x+e^(-x))(e^y+e^(-y))+(e^x-e^(-x))(e^y-e^(-y)))/4', 'Définitions'], ['(2e^(x+y)+2e^(-x-y))/4', 'Développer : les termes croisés s\'annulent'], ['cosh(x+y)', 'Définition de cosh(x + y)']], blank: '2e^(x+y)' },
  { start: 'sinh(x)cosh(y)+cosh(x)sinh(y)', goal: 'sinh(x+y)', lines: [['((e^x-e^(-x))(e^y+e^(-y))+(e^x+e^(-x))(e^y-e^(-y)))/4', 'Définitions'], ['(2e^(x+y)-2e^(-x-y))/4', 'Développer : les termes croisés s\'annulent'], ['sinh(x+y)', 'Définition de sinh(x + y)']], blank: '2e^(x+y)' },
];
const HF_T = {
  cosh2: { start: 'cosh(2x)', fin: '(1+t^2)/(1-t^2)', lines: [['cosh(x)^2+sinh(x)^2', 'Angle double', 'double'], ['cosh(x)^2(1+tanh(x)^2)', 'cosh²x en facteur', 'factor'], ['(1+tanh(x)^2)/(1-tanh(x)^2)', 'cosh²x = 1/(1 − tanh²x)', 'tanh'], ['(1+t^2)/(1-t^2)', 'Remplacer tanh x par t', 'rename']] },
  sinh2: { start: 'sinh(2x)', fin: '2t/(1-t^2)', lines: [['2sinh(x)cosh(x)', 'Angle double', 'double'], ['2tanh(x)cosh(x)^2', 'sinh x = tanh x · cosh x', 'factor'], ['2tanh(x)/(1-tanh(x)^2)', 'cosh²x = 1/(1 − tanh²x)', 'tanh'], ['2t/(1-t^2)', 'Remplacer tanh x par t', 'rename']] },
  sh2: { start: 'sinh(x)^2', fin: 't^2/(1-t^2)', lines: [['tanh(x)^2cosh(x)^2', 'sinh x = tanh x · cosh x', 'factor'], ['tanh(x)^2/(1-tanh(x)^2)', 'cosh²x = 1/(1 − tanh²x)', 'tanh'], ['t^2/(1-t^2)', 'Remplacer tanh x par t', 'rename']] },
  ch2: { start: 'cosh(x)^2', fin: '1/(1-t^2)', lines: [['1/(1-tanh(x)^2)', '1 − tanh²x = 1/cosh²x', 'tanh'], ['1/(1-t^2)', 'Remplacer tanh x par t', 'rename']] },
  em2x: { start: 'e^(-2x)', fin: '(1-t)/(1+t)', lines: [['cosh(2x)-sinh(2x)', 'e^(−u) = cosh u − sinh u', 'double'], ['cosh(x)^2+sinh(x)^2-2sinh(x)cosh(x)', 'Angles doubles', 'double'], ['cosh(x)^2(1-tanh(x))^2', 'cosh²x en facteur', 'factor'], ['(1-tanh(x))^2/((1-tanh(x))(1+tanh(x)))', 'cosh²x = 1/(1 − tanh²x)', 'tanh'], ['(1-t)/(1+t)', 'Simplifier, remplacer tanh x par t', 'rename']] },
  e2x: { start: 'e^(2x)', fin: '(1+t)/(1-t)', lines: [['cosh(2x)+sinh(2x)', 'e^u = cosh u + sinh u', 'double'], ['cosh(x)^2+sinh(x)^2+2sinh(x)cosh(x)', 'Angles doubles', 'double'], ['cosh(x)^2(1+tanh(x))^2', 'cosh²x en facteur', 'factor'], ['(1+tanh(x))^2/((1-tanh(x))(1+tanh(x)))', 'cosh²x = 1/(1 − tanh²x)', 'tanh'], ['(1+t)/(1-t)', 'Simplifier, remplacer tanh x par t', 'rename']] },
};
const HF_CHOICES = [
  { id: 'double', label: 'Formule de l\'angle double (ou eᵘ = cosh u + sinh u)' },
  { id: 'factor', label: 'Mettre cosh²x en facteur pour faire apparaître tanh x' },
  { id: 'tanh', label: 'Remplacer cosh²x par 1/(1 − tanh²x)' },
  { id: 'rename', label: 'Écrire avec t = tanh x' },
  { id: 'trig', label: 'cosh 2x = cosh²x − sinh²x', rule: 'g2_hyp_trig_sign', why: 'cosh²x − sinh²x vaut 1 : en hyperbolique, cosh 2x = cosh²x + sinh²x.' },
];

function hfVerify(level, rng, opts) {
  const add = level === 2;
  const b = rng.pick(add ? HF_ADD : HF_VERIFY);
  const vars = add ? ['x', 'y'] : ['x'];
  const lines = b.lines.map(([math, note], i) => E(math, note, i === 0 ? 'def' : 'formula'));
  const blankAt = add ? 1 : 0;
  const script = lines.map((l, i) => (i === blankAt ? blanked(l, [b.blank], { vars }) : l));
  return linesItem({
    skill: HF, level, prompt: `Montre que ${MT(`${b.start}=${b.goal}`, { vars })} avec les exponentielles.`,
    start: b.start, judge: { kind: 'equiv', vars, domain: { x: [-2, 2], y: [-2, 2] }, target: 'goal', goal: b.goal }, mode: 'guided', script,
    declares: { vars },
    hints: H('Remplace chaque sinh et cosh par sa formule en exponentielles, puis développe.', MT(lines[0].math, { vars }), MT(lines[1].math, { vars })),
    subgoals: HF_SUB, keys: KEYS, key: `${HF}:${b.start}`, exam: examOf(opts),
  });
}

function hfT(level, rng, opts) {
  const kind = level === 3 ? rng.pick(['cosh2', 'sinh2', 'sh2']) : rng.pick(['cosh2', 'sinh2', 'e2x', 'sh2', 'ch2', 'em2x']);
  const b = HF_T[kind];
  const lines = b.lines.map(([math, note, act]) => E(math, note, act === 'double' ? 'def' : 'formula', act));
  const script = [];
  if (level === 3) {
    script.push(lines[0], lines[1]);
    script.push({ kind: 'decision', prompt: 'Quelle identité permet de remplacer cosh²x ?', options: [
      { id: 'right', label: '1 − tanh²x = 1/cosh²x', valid: true },
      { id: 'plus', label: '1 + tanh²x = 1/cosh²x', valid: false, rule: 'g2_hyp_trig_sign', why: 'En hyperbolique : cosh² − sinh² = 1, donc 1 − tanh² = 1/cosh². Le signe est celui de la trigonométrie inversé.' },
      { id: 'cos2', label: 'cosh²x − sinh²x = cosh 2x', valid: false, rule: 'g2_hyp_trig_sign', why: 'cosh²x − sinh²x vaut 1, pas cosh 2x.' },
    ] });
    script.push(...lines.slice(2));
  } else script.push(...lines);
  const judge = { kind: 'equiv', vars: [V, 't'], domain: { x: [-2, 2], t: [-0.5, 0.5] }, subst: { t: 'tanh(x)' }, target: 'only', finalVars: ['t'] };
  return linesItem({
    skill: HF, level, prompt: `Exprime ${MT(b.start)} en fonction de t = tanh x.`,
    start: b.start, judge: withMenus(judge, level, b.start, lines, HF_CHOICES), mode: modeOf(level), script,
    declares: { vars: [V, 't'] },
    hints: H('Angle double, puis mets cosh²x en facteur pour faire apparaître tanh x = sinh x / cosh x.', '1 − tanh²x = 1/cosh²x, donc cosh²x = …', MT(lines[lines.length - 2].math)),
    subgoals: HF_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${HF}:${b.start}`, exam: examOf(opts, 4),
  });
}

function hfItem(level, rng, opts = {}) {
  if (level <= 2) return hfVerify(level, rng, opts);
  return hfT(level, rng, opts);
}

function hfMcq(rng) {
  const kind = rng.pick(['cosh2', 'sinh2']);
  const opts = {
    cosh2: [['(1+t^2)/(1-t^2)', true], ['(1-t^2)/(1+t^2)', false, 'g2_hyp_trig_sign'], ['2t/(1-t^2)', false], ['(1+t)/(1-t)', false]],
    sinh2: [['2t/(1-t^2)', true], ['2t/(1+t^2)', false, 'g2_hyp_trig_sign'], ['(1+t^2)/(1-t^2)', false], ['t^2/(1-t^2)', false]],
  }[kind];
  return mcq({
    skill: HF, level: 4, prompt: `Avec t = tanh x, ${MT(HF_T[kind].start)} =`, key: `mcq:${kind}`,
    options: opts.map(([m, c, rule]) => ({ html: MT(m, { vars: ['t'] }), correct: c, rule })), exam: { format: 'mcq', points: 1 },
    solution: HF_T[kind].lines.map(([m, note]) => ({ html: MT(m, { vars: ['x', 't'] }), note })),
  }, rng);
}

// ======================================================================
// g2-hyp-eq
// ======================================================================

const HE = 'g2-hyp-eq';
const HE_SUB = [
  { id: 'def', label: 'exponentielles', skill: HD },
  { id: 'mult', label: 'multiplier par 2eˣ', skill: HE },
  { id: 'trinome', label: 'trinôme en t', skill: XE },
  { id: 'back', label: 'revenir à x', skill: LR },
];
const HE_CHOICES = [
  { id: 'def', label: 'Remplacer cosh et sinh par leurs exponentielles' },
  { id: 'mult', label: 'Multiplier par 2eˣ' },
  { id: 'subst', label: 'Poser t = eˣ' },
  { id: 'solve', label: 'Résoudre le trinôme en t' },
  { id: 'back', label: 'Revenir à x (t > 0)' },
];

// a cosh x + b sinh x = c ⇔ p t² − 2c t + q = 0 with p = a + b, q = a − b.
function heData(rng, negative) {
  const pos = [q(1, 3), q(1, 2), q(1), q(2), q(3)];
  for (let i = 0; i < 400; i++) {
    const t1 = rng.pick(pos);
    const t2 = negative ? rng.pick([q(-1), q(-2), q(-1, 2), q(-3)]) : rng.pick(pos);
    if (t1.eq(t2)) continue;
    const p = rng.int(1, 8);
    const c = t1.add(t2).mul(p).div(2);
    const qq = t1.mul(t2).mul(p);
    if (c.d !== 1 || qq.d !== 1) continue;
    if ((p + qq.n) % 2 !== 0) continue;
    const a = (p + qq.n) / 2;
    const b = (p - qq.n) / 2;
    if (!a || !b || Math.abs(a) > 9 || Math.abs(b) > 9 || Math.abs(c.n) > 12) continue;
    if (gcd(gcd(a, b), c.n) > 1 && i < 300) continue;
    return { t1, t2, p, c: c.n, q: qq.n, a, b };
  }
  return { t1: q(1), t2: q(1, 3), p: 3, c: 2, q: 1, a: 2, b: 1 };
}

function heItem(level, rng, opts = {}) {
  const negative = level === 4 && rng.chance(0.3);
  const d = heData(rng, negative);
  const start = `${joinSum([coefText(d.a, 'cosh(x)'), coefText(d.b, 'sinh(x)')])}=${d.c}`;
  const l1 = `${joinSum([coefText(d.a, '(e^x+e^(-x))/2'), coefText(d.b, '(e^x-e^(-x))/2')])}=${d.c}`;
  const l2 = `${polyText([[d.p, 'e^(2x)'], [-2 * d.c, 'e^x'], [d.q, '']])}=0`;
  const l3 = `${polyText([[d.p, 't^2'], [-2 * d.c, 't'], [d.q, '']])}=0`;
  const ts = [d.t1, d.t2].sort((a, b) => b.valueOf() - a.valueOf());
  const pos = ts.filter((t) => t.n > 0);
  const xs = pos.map((t) => ({ t: lnOf(t), v: Math.log(t.valueOf()) })).sort((a, b) => a.v - b.v);
  const lines = [
    E(l1, 'Exponentielles', 'def', 'def'),
    E(l2, 'Multiplier par 2eˣ', 'mult', 'mult'),
    E(l3, 'Posons t = eˣ > 0', 'trinome', 'subst'),
    E(orEq(ts.map(N), 't'), 'Résoudre le trinôme', 'trinome', 'solve'),
    ...(negative ? [E(pos.map((t) => `e^x=${N(t)}`).join(' ou '), 't > 0 : une seule racine', 'back', 'back')] : []),
    E(orEq(xs.map((x) => x.t)), 'Revenir à x', 'back', 'back'),
  ];
  let script = lines;
  if (level === 1) script = [{ kind: 'note', html: `Exponentielles : ${MT(l1)}` }, ...lines.slice(1).map((l, i) => (i === 2 ? blanked(l, [N(ts[1])], { vars: ['t'] }) : l))];
  if (level === 2) script = [lines[0], blanked(lines[1], [coefText(d.p, 'e^(2x)')]), ...lines.slice(2)];
  const sLines = level === 1 ? lines.slice(1) : lines;
  const judge = { kind: 'solset', v: V, subst: { t: 'e^x' } };
  return linesItem({
    skill: HE, level, prompt: `Résous ${MT(start)}.`,
    start, judge: withMenus(judge, level, start, sLines, HE_CHOICES), mode: modeOf(level), script,
    declares: { vars: [V, 't'] },
    hints: H('Remplace cosh et sinh par leurs formules en eˣ, multiplie par 2eˣ, puis pose t = eˣ.', `× 2eˣ : ${MT(l2)}`, MT(lines[1].math)),
    subgoals: HE_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${HE}:${start}`, exam: examOf(opts, 5),
  });
}

// Number of solutions of cosh x = mx + c, read on the graphs.
function heCount(rng, opts = {}, level = 5) {
  const m = rng.int(-2, 2);
  const c = rng.int(0, 3);
  const rhs = polyText([[m, 'x'], [c, '']]) || '0';
  const start = `cosh(x)=${rhs}`;
  const n = solutionSet(parse(start), { v: V }).parts.length;
  const options = ['0', '1', '2', '3'].map((k) => ({ html: k, correct: Number(k) === n }));
  return mcq({
    skill: HE, level, prompt: `Combien de solutions a l'équation ${MT(start)} ? (Pense aux graphes, sans calcul.)`,
    options, keepOrder: true, key: `count:${start}`, exam: opts.exam ? { format: 'mcq', points: 2 } : false,
    solution: [{ html: `cosh est convexe, de minimum 1 en 0 : la droite y = ${fr(rhs)} la coupe ${n} fois.`, note: '' }],
  }, rng);
}

// ======================================================================
// g2-arg
// ======================================================================

const AR = 'g2-arg';
const AR_SUB = [
  { id: 'def', label: 'définitions', skill: HD },
  { id: 'solve', label: 'trinôme en eᵘ', skill: HE },
  { id: 'sort', label: 'garder eᵘ > 0', skill: AR },
  { id: 'inverse', label: 'réciproque', skill: 'g1-inverse' },
];
const AR_CHOICES = [
  { id: 'def', label: 'Écrire avec les exponentielles' },
  { id: 'mult', label: 'Multiplier par eᵘ (ou 2eᵘ)' },
  { id: 'subst', label: 'Poser t = eᵘ' },
  { id: 'solve', label: 'Résoudre en t' },
  { id: 'sort', label: 'Garder la racine positive' },
  { id: 'back', label: 'Revenir à u avec ln' },
];

function arValue(level, rng, opts) {
  const k = rng.int(2, 5);
  const fn = rng.pick(['argsh', 'argch']);
  const y = fn === 'argsh' ? q(k).sub(q(1, k)).div(2) : q(k).add(q(1, k)).div(2);
  const r = fn === 'argsh' ? q(k).add(q(1, k)).div(2) : q(k).sub(q(1, k)).div(2);
  const Y = N(y);
  const start = `${fn}(${Y})`;
  const pm = fn === 'argsh' ? '+' : '-';
  const lines = [
    E(`ln(${Y}+sqrt((${Y})^2${pm}1))`, `${fn} y = ln(y + √(y² ${pm === '+' ? '+' : '−'} 1))`, 'def'),
    E(`ln(${Y}+${N(r)})`, `√((${fr(Y)})² ${pm === '+' ? '+' : '−'} 1) = ${fr(N(r))}`, 'solve'),
    E(`ln(${k})`, 'Additionner', 'sort'),
  ];
  const script = level === 1 ? [lines[0], blanked(lines[1], [N(r)]), lines[2]] : lines;
  return linesItem({
    skill: AR, level, prompt: `Calcule ${MT(start)} sous la forme ln(…).`,
    start, judge: { kind: 'value', form: 'log' }, mode: modeOf(level), script,
    hints: H(`${fn} y = ln(y + √(y² ${pm === '+' ? '+' : '−'} 1)).`, `(${fr(Y)})² ${pm === '+' ? '+' : '−'} 1 = (${fr(N(r))})²`, MT(lines[1].math)),
    subgoals: AR_SUB, keys: KEYS, key: `${AR}:${start}`, exam: examOf(opts),
  });
}

function arArgsh(level, rng, opts) {
  const lines = [
    E('(e^u-e^(-u))/2=y', 'Définition de sinh', 'def', 'def'),
    E('e^(2u)-2ye^u-1=0', 'Multiplier par 2eᵘ', 'def', 'mult'),
    E('t^2-2yt-1=0', 'Posons t = eᵘ > 0', 'solve', 'subst'),
    E('t=y+sqrt(y^2+1) ou t=y-sqrt(y^2+1)', 'Trinôme : Δ/4 = y² + 1', 'solve', 'solve'),
    E('t=y+sqrt(y^2+1)', 'y − √(y² + 1) < 0 : rejeté', 'sort', 'sort'),
    E('u=ln(y+sqrt(y^2+1))', 'Revenir à u', 'inverse', 'back'),
  ];
  let script = lines;
  if (level <= 2) script = lines.map((l, i) => (i === 3 ? blanked(l, ['sqrt(y^2+1)']) : l));
  if (level === 3) {
    script = [...lines.slice(0, 4), { kind: 'decision', prompt: 'Quelle racine garder ?', options: [
      { id: 'plus', label: 't = y + √(y² + 1)', valid: true },
      { id: 'minus', label: 't = y − √(y² + 1)', valid: false, rule: 'g2_argsh_sign', why: '√(y² + 1) > |y|, donc y − √(y² + 1) < 0. Or t = eᵘ > 0.' },
    ] }, ...lines.slice(4)];
  }
  const judge = { kind: 'solset', v: 'u', subst: { t: 'e^u' }, params: { y: 'ℝ' } };
  return linesItem({
    skill: AR, level, prompt: `Établis la formule de argsh : résous ${MT('sinh(u)=y', { vars: ['u'] })} en u, pour y ∈ ℝ.`,
    start: 'sinh(u)=y', judge: withMenus(judge, level, 'sinh(u)=y', lines, AR_CHOICES), mode: modeOf(level), script,
    declares: { vars: ['u', 't', 'y'] },
    hints: H('Écris sinh avec les exponentielles, multiplie par 2eᵘ et pose t = eᵘ > 0.', 't² − 2yt − 1 = 0 : t = y ± √(…)', MT(lines[3].math, { vars: ['t', 'y'] })),
    subgoals: AR_SUB, keys: [...KEYS, 'letters'], tapActions: level === 3 ? 'steps' : null,
    key: `${AR}:argsh:${level}`, exam: examOf(opts),
  });
}

function arArgch(level, rng, opts) {
  const lines = [
    E('(e^u+e^(-u))/2=y', 'Définition de cosh', 'def', 'def'),
    E('e^(2u)-2ye^u+1=0', 'Multiplier par 2eᵘ', 'def', 'mult'),
    E('t^2-2yt+1=0', 'Posons t = eᵘ, avec u ≥ 0 : t ≥ 1', 'solve', 'subst'),
    E('t=y+sqrt(y^2-1) ou t=y-sqrt(y^2-1)', 'Trinôme : Δ/4 = y² − 1 ≥ 0', 'solve', 'solve'),
    E('t=y+sqrt(y^2-1)', 'Le produit des racines vaut 1 : y − √(y² − 1) ≤ 1 donne u ≤ 0', 'sort', 'sort'),
    E('u=ln(y+sqrt(y^2-1))', 'Revenir à u', 'inverse', 'back'),
  ];
  let script = lines;
  if (level <= 2) script = lines.map((l, i) => (i === 3 ? blanked(l, ['sqrt(y^2-1)']) : l));
  if (level === 3) {
    script = [...lines.slice(0, 4), { kind: 'decision', prompt: 'Quelle racine garder, pour u ≥ 0 ?', options: [
      { id: 'plus', label: 't = y + √(y² − 1) ≥ 1', valid: true },
      { id: 'minus', label: 't = y − √(y² − 1) ≤ 1', valid: false, why: 'Les deux racines ont pour produit 1 : la plus petite est ≤ 1 et donne u = ln t ≤ 0.' },
    ] }, ...lines.slice(4)];
  }
  const judge = { kind: 'solset', v: 'u', domain: '[0;+∞[', subst: { t: 'e^u' }, params: { y: '[1;+∞[' } };
  return linesItem({
    skill: AR, level, prompt: `Établis la formule de argch : résous ${MT('cosh(u)=y', { vars: ['u'] })} en u ≥ 0, pour y ≥ 1.`,
    start: 'cosh(u)=y', judge: withMenus(judge, level, 'cosh(u)=y', lines, AR_CHOICES), mode: modeOf(level), script,
    declares: { vars: ['u', 't', 'y'] },
    hints: H('Écris cosh avec les exponentielles, multiplie par 2eᵘ et pose t = eᵘ. Avec u ≥ 0, il faut t ≥ 1.', 't² − 2yt + 1 = 0 : t = y ± √(…)', MT(lines[3].math, { vars: ['t', 'y'] })),
    subgoals: AR_SUB, keys: [...KEYS, 'letters'], tapActions: level === 3 ? 'steps' : null,
    key: `${AR}:argch:${level}`, exam: examOf(opts),
  });
}

function arArgth(level, rng, opts) {
  const lines = [
    E('(e^(2u)-1)/(e^(2u)+1)=y', 'tanh u = (e²ᵘ − 1)/(e²ᵘ + 1)', 'def'),
    E('e^(2u)-1=y(e^(2u)+1)', 'Multiplier par e²ᵘ + 1 > 0', 'solve'),
    E('e^(2u)(1-y)=1+y', 'Regrouper', 'solve'),
    E('e^(2u)=(1+y)/(1-y)', 'Diviser par 1 − y > 0', 'sort'),
    E('u=(1/2)ln((1+y)/(1-y))', 'ln, puis diviser par 2', 'inverse'),
  ];
  return linesItem({
    skill: AR, level, prompt: `Établis la formule de argth : résous ${MT('tanh(u)=y', { vars: ['u'] })} en u, pour −1 < y < 1.`,
    start: 'tanh(u)=y', judge: { kind: 'solset', v: 'u', params: { y: ']-1;1[' } }, mode: 'free', script: lines,
    declares: { vars: ['u', 'y'] },
    hints: H('tanh u = (e²ᵘ − 1)/(e²ᵘ + 1) : multiplie par le dénominateur et isole e²ᵘ.', 'e²ᵘ(1 − y) = …', MT(lines[3].math, { vars: ['u', 'y'] })),
    subgoals: AR_SUB, keys: [...KEYS, 'letters'], key: `${AR}:argth:${level}`, exam: examOf(opts),
  });
}

function arCosh(level, rng, opts) {
  const k = rng.int(2, 4);
  const a = q(k * k + 1, 2 * k);
  const start = `cosh(x)=${N(a)}`;
  const lines = [
    E(`e^x+e^(-x)=${N(a.mul(2))}`, 'Exponentielles', 'def'),
    E(`${k}e^(2x)-${k * k + 1}e^x+${k}=0`, `Multiplier par ${k}eˣ`, 'solve'),
    E(`${k}t^2-${k * k + 1}t+${k}=0`, 'Posons t = eˣ', 'solve'),
    E(`t=${k} ou t=1/${k}`, 'Résoudre : deux racines > 0', 'sort'),
    E(`x=-ln(${k}) ou x=ln(${k})`, 'Revenir à x : x = ±argch a', 'inverse'),
  ];
  return linesItem({
    skill: AR, level, prompt: `Résous ${MT(start)}.`,
    start, judge: { kind: 'solset', v: V, subst: { t: 'e^x' } }, mode: 'free', script: lines,
    declares: { vars: [V, 't'] },
    hints: H('cosh est paire : si x est solution, −x aussi. Pose t = eˣ.', `${k}t² − ${k * k + 1}t + ${k} = 0`, MT(lines[3].math, { vars: ['t'] })),
    subgoals: AR_SUB, keys: KEYS, key: `${AR}:${start}`, exam: examOf(opts),
  });
}

function arItem(level, rng, opts = {}) {
  if (level === 1) return arValue(level, rng, opts);
  if (level <= 3) return rng.chance(0.5) ? arArgsh(level, rng, opts) : arArgch(level, rng, opts);
  return rng.pick([arArgth, arCosh, arArgsh])(level, rng, opts);
}

function arExam(rng, exam) {
  if (exam === 'tf') {
    const one = (v) => ({ q: '∀', v, dom: 'R' });
    const bank = [
      { s: 'argch(cosh x) = x pour tout réel x.', truth: false, counter: { kind: 'refute', quants: [one('x')], pred: 'argch(cosh(x))=x', ask: [{ v: 'x', label: 'x =' }], answer: { x: '-1' } }, why: 'Faux : argch est à valeurs ≥ 0, argch(cosh(−1)) = 1 ≠ −1.' },
      { s: 'argsh est impaire.', truth: true, why: 'Vrai : c\'est la réciproque de sinh, qui est impaire.' },
      { s: 'argth x est défini pour tout réel x.', truth: false, counter: { kind: 'refute', quants: [one('x')], pred: '-1<x<1', ask: [{ v: 'x', label: 'x =' }], answer: { x: '2' } }, why: 'Faux : tanh prend ses valeurs dans ]−1 ; 1[, argth n\'est défini que là.' },
      { s: 'cosh(argch y) = y pour tout y ≥ 1.', truth: true, why: 'Vrai : argch est la réciproque de cosh restreint à [0 ; +∞[.' },
    ];
    const b = rng.pick(bank);
    return tfItem({ skill: AR, level: 4, statement: b.s, truth: b.truth, counter: b.counter || null, key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 } });
  }
  const k = rng.int(2, 4);
  const a = q(k * k + 1, 2 * k);
  const options = uniq([
    { html: MT(`{-ln(${k});ln(${k})}`), correct: true },
    { html: MT(`{ln(${k})}`), correct: false, rule: 'g2_cosh_one_root' },
    { html: MT(`{ln(${N(a.mul(2))})}`), correct: false },
    { html: MT(`{0;ln(${k})}`), correct: false },
  ]);
  return mcq({
    skill: AR, level: 4, prompt: `Ensemble des solutions de ${MT(`cosh(x)=${N(a)}`)} :`, options, key: `mcq:cosh=${N(a)}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `t = eˣ : t = ${k} ou t = 1/${k}, deux racines > 0 : x = ±ln ${k}.`, note: '' }],
  }, rng);
}


export const GEN = {
  [RP]: (level, rng, profile, opts = {}) => (opts.exam ? rpExam(rng, opts.exam) : rpItem(level, rng, opts)),
  [LR]: (level, rng, profile, opts = {}) => (opts.exam ? lrExam(rng, opts.exam) : lrItem(level, rng, opts)),
  [XE]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? xeMcq(rng) : xeItem(opts.exam ? 5 : level, rng, opts)),
  [LE]: (level, rng, profile, opts = {}) => (opts.exam ? leExam(rng, opts.exam) : leItem(level, rng, opts)),
  [IQ]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? iqMcq(rng) : iqItem(opts.exam ? 5 : level, rng, opts)),
  [XX]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? xxMcq(rng) : xxItem(opts.exam ? 5 : level, rng, opts)),
  [HD]: (level, rng, profile, opts = {}) => (opts.exam ? hdExam(rng, opts.exam) : hdItem(level, rng, opts)),
  [HF]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? hfMcq(rng) : hfItem(opts.exam ? 5 : level, rng, opts)),
  [HE]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? heCount(rng, opts) : level === 5 ? heCount(rng, opts, 5) : heItem(opts.exam ? 4 : level, rng, opts)),
  [AR]: (level, rng, profile, opts = {}) => (opts.exam ? arExam(rng, opts.exam) : arItem(level, rng, opts)),
};

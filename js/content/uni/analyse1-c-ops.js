// Generators of module A1, part c (step U2): a1-dl-ops (products and
// quotients of DLs) and a1-dl-compose (f(g(x)), recentring when g(0) ≠ 0).
// The products and quotients are exported: a1-dl-read reuses them.

import { MT, linesItem, mcq, tfItem, answerItem } from './kit.js';
import {
  V, q, modeOf, H, E, KEYS, examOf, coefs, isZero, maxDen, maxNum, remText, termAbs, joinTerms,
  polyText, dlText, termCount, valuation, blankDL, blanked, assemble, fitLines, uniq, mulCoefs,
} from './analyse1-c-kit.js';
import { boxText, polyFromNode, trapOptions, uText, plusU, fText, rd, substText, USUAL, coefOf } from './analyse1-c-dl.js';
import { trapAnswers } from '../../judges/diagnose.js';
import { parse } from '../../cas/parse.js';

const US = 'a1-dl-usual';
const cT = (c) => `(${c.toString()})`;

// ======================================================================
// Products and quotients
// ======================================================================

// Σ (−1)ᵏ·(w)ᵏ for k·val(w) ≤ n: 1 − (w) + (w)² − …
function invText(w, n) {
  const vw = valuation(w);
  const W = polyText(w.slice(0, n + 1));
  const parts = [{ neg: false, text: '1' }];
  // x alone needs no parentheses: 1 − x + x² …
  const bare = W === 'x';
  for (let k = 1; vw && k * vw <= n; k++) parts.push({ neg: k % 2 === 1, text: k === 1 ? (bare ? W : `(${W})`) : bare ? `${W}^${k}` : `(${W})^${k}` });
  return joinTerms(parts);
}

// The DL of A×B at order n: both DLs, the products of degree ≤ n (when
// some degree has several), then the reduced DL.
export function productLines(A, B, n) {
  const ca = coefs(A, n);
  const cb = coefs(B, n);
  const pa = polyText(ca, { rem: n });
  const pb = polyText(cb, { rem: n });
  const terms = [];
  for (let i = 0; i <= n; i++) for (let j = 0; i + j <= n; j++) if (!isZero(ca[i]) && !isZero(cb[j])) terms.push({ k: i + j, c: ca[i].mul(cb[j]) });
  terms.sort((x, y) => x.k - y.k);
  const dup = terms.some((t, i) => i && terms[i - 1].k === t.k);
  const fin = dlText(`(${A})×(${B})`, n);
  const lines = [
    E(`(${pa})×(${pb})`, 'DL des deux facteurs', 'factors', 'factors'),
    ...(dup ? [E(joinTerms([...terms.map((t) => ({ neg: t.c.n < 0, text: termAbs(t.c, t.k) })), { neg: false, text: remText(n) }]), `Développer, garder les termes de degré ≤ ${n}`, 'expand', 'expand')] : []),
    E(fin, dup ? 'Réduire' : `Développer, garder les termes de degré ≤ ${n}`, 'trunc', 'trunc'),
  ];
  return { lines, fin, pa, pb };
}

// The DL of Nt/Dt at order n: DLs of both (one order more per power of x
// in the denominator), simplify by xᵛ, 1/(c(1 + w)) = (1/c)(1 − w + w² …),
// then the reduced DL. exactDen: the denominator is already a polynomial.
export function quotientLines(Nt, Dt, n, { exactDen = false } = {}) {
  const v = valuation(coefs(Dt, n + 4));
  const W = n + v;
  const cn = coefs(Nt, W);
  const cd = coefs(Dt, W);
  const one = Nt === '1';
  const lines = [];
  if (!exactDen) lines.push(E(one ? `1/(${polyText(cd, { rem: W })})` : `(${polyText(cn, { rem: W })})/(${polyText(cd, { rem: W })})`, 'DL du numérateur et du dénominateur', 'factors', 'factors'));
  const sn = cn.slice(v);
  const sd = cd.slice(v);
  if (v > 0) lines.push(E(`(${polyText(sn, { rem: n })})/(${polyText(sd, { rem: n })})`, `Simplifier par x${v > 1 ? `^${v}` : ''}`, 'trunc', 'xfactor'));
  const c = sd[0];
  const w = sd.map((x, k) => (k === 0 ? q(0) : x.div(c)));
  const front = c.eq(1) ? '' : `${cT(q(1).div(c))}×`;
  const num = one ? '' : `(${polyText(sn.slice(0, n + 1))})×`;
  lines.push(E(`${front}${num}(${invText(w, n)})+${remText(n)}`, c.eq(1) ? '1/(1 + u) = 1 − u + u² − …' : `Constante ${c.toString().replace('-', '−')} en facteur, puis 1/(1 + u) = 1 − u + u² − …`, 'trunc', 'inverse'));
  const fin = dlText(`(${Nt})/(${Dt})`, n);
  lines.push(E(fin, `Développer, garder les termes de degré ≤ ${n}`, 'trunc', 'trunc'));
  return { lines, fin, v, c, w };
}

const OP = 'a1-dl-ops';
const OP_SUB = [
  { id: 'factors', label: 'DL des facteurs', skill: US },
  { id: 'expand', label: 'développer', skill: 'lit-polynomial' },
  { id: 'trunc', label: 'tronquer', skill: OP },
];
const ex = (a) => (a.eq(1) ? 'e^x' : `e^(${uText(a)})`);
const fn1 = (name, a) => `${name}(${uText(a)})`;
const lnp = (a, p = 1) => `ln(1${plusU(uText(a, p))})`;
export const OPS = {
  expsin: (r) => ({ kind: 'prod', A: ex(q(r.pick([1, 2, -1, -2]))), B: fn1('sin', q(r.pick([1, 2, 3]))), n: r.int(2, 4) }),
  expcos: (r) => ({ kind: 'prod', A: ex(q(r.pick([1, 2, -1, -2]))), B: fn1('cos', q(r.pick([1, 2, 3]))), n: r.int(2, 3) }),
  cosln: (r) => ({ kind: 'prod', A: fn1('cos', q(r.pick([1, 2]))), B: lnp(q(r.pick([1, 2, -1]))), n: r.int(3, 4) }),
  sinln: (r) => ({ kind: 'prod', A: fn1('sin', q(r.pick([1, 2]))), B: lnp(q(r.pick([1, 2, -1]))), n: r.int(3, 4) }),
  powexp: (r) => ({ kind: 'prod', A: fText('pow', 'x', r.pick([q(1, 2), q(-1), q(-1, 2)])), B: ex(q(r.pick([1, -1, 2]))), n: r.int(2, 3) }),
  logistic: (r) => ({ kind: 'quot', N: '1', D: `1+${ex(q(r.pick([-1, 1])))}`, n: r.int(2, 4) }),
  lin: (r) => { const b = r.int(2, 4); const c = r.pick([-3, -2, -1, 1, 2, 3].filter((x) => Math.abs(x) !== b)); return { kind: 'quot', N: '1', D: `${b}${plusU(uText(q(c)))}`, n: r.int(2, 3), exactDen: true }; },
  tan: (r) => { const a = r.pick([1, 1, 2]); return { kind: 'quot', N: fn1('sin', q(a)), D: fn1('cos', q(a)), n: a === 1 ? r.pick([3, 5]) : 3, show: fn1('tan', q(a)) }; },
  sinfrac: (r) => ({ kind: 'quot', N: fn1('sin', q(r.pick([1, 2]))), D: `1${plusU(uText(q(r.pick([1, 2, -1])), 2))}`, n: r.pick([3, 5]), exactDen: true }),
  lnsin: (r) => ({ kind: 'quot', N: lnp(q(r.pick([1, 2, -1])), 2), D: 'sin(x)', n: r.int(2, 4) }),
  expfrac: (r) => ({ kind: 'quot', N: ex(q(r.pick([1, 2, -1]))), D: `1${plusU(uText(q(r.pick([1, 2, -1]))))}`, n: r.int(2, 3), exactDen: true }),
};
const OPS_BY_LEVEL = {
  1: ['expsin', 'expcos', 'cosln', 'powexp', 'sinln'],
  2: ['expsin', 'cosln', 'powexp', 'lin', 'expfrac'],
  3: ['expsin', 'sinln', 'logistic', 'lin', 'tan', 'sinfrac', 'expfrac'],
  4: ['expsin', 'cosln', 'powexp', 'logistic', 'tan', 'sinfrac', 'lnsin', 'expfrac'],
  5: ['tan', 'sinfrac', 'lnsin', 'logistic'],
};
const OP_FALLBACK = { kind: 'prod', A: 'e^x', B: 'sin(x)', n: 3 };

const wrapF = (t) => (/[+-]/.test(t.replace(/\([^()]*\)/g, '')) ? `(${t})` : t);
export const opText = (d) => d.show || (d.kind === 'prod' ? `${wrapF(d.A)}×${wrapF(d.B)}` : `${wrapF(d.N)}/${wrapF(d.D)}`);
export function opBuild(d) {
  const f = opText(d);
  const r = d.kind === 'prod' ? productLines(d.A, d.B, d.n) : quotientLines(d.N, d.D, d.n, { exactDen: d.exactDen });
  const cs = coefs(f, d.n);
  return { f, cs, ...r };
}
// A product or quotient with nice coefficients, whose lines its judge takes.
export function opData(rng, kinds, { n, den = 360 } = {}) {
  for (let i = 0; i < 200; i++) {
    const d = OPS[rng.pick(kinds)](rng);
    if (n) d.n = n;
    try {
      const b = opBuild(d);
      if (maxDen(b.cs) > den || maxNum(b.cs) > 200 || termCount(b.cs) < 2) continue;
      fitLines({ kind: 'series', v: V, at: 0, order: d.n }, b.f, b.lines, false);
      return d;
    } catch { /* another draw */ }
  }
  return { ...OP_FALLBACK, n: n ?? OP_FALLBACK.n, fallback: true };
}

const OP_CHOICES = (d) => [
  { id: 'factors', label: d.kind === 'quot' ? 'Écrire le DL du numérateur et du dénominateur' : `Écrire le DL de chaque facteur à l'ordre ${d.n}` },
  ...(d.kind === 'quot' ? [{ id: 'xfactor', label: 'Simplifier par la puissance de x du dénominateur' }, { id: 'inverse', label: 'Écrire 1/(1 + u) = 1 − u + u² − … (constante en facteur)' }] : [{ id: 'expand', label: 'Développer le produit, sans encore réduire' }]),
  { id: 'trunc', label: `Développer, réduire et garder les termes de degré ≤ ${d.n}` },
  { id: 'early', label: `Arrêter un facteur à x^${d.n - 1}`, rule: 'a1_dl_truncate_early', why: 'Il manquerait des termes : chaque facteur doit aller assez loin pour donner tous les termes de degré ≤ n.' },
];

// The terms of a DL text (without the remainder), as texts.
const dlTerms = (dl) => {
  const out = [];
  let cur = '';
  let depth = 0;
  for (const ch of dl) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if ((ch === '+' || ch === '-') && depth === 0 && cur) { out.push(cur); cur = ch === '-' ? '' : ''; continue; }
    cur += ch;
  }
  if (cur) out.push(cur);
  return out.filter((t) => !t.includes('ε'));
};
const polyPart = (dl) => dl.replace(/[+-]x(\^\d+)?ε\(x\)$/, '');

function opBlanks(b, d, level) {
  if (level > 2) return b.lines;
  return b.lines.map((l, i) => {
    if (l.act === 'factors' && d.kind === 'prod') {
      if (level === 2) return blanked(l, [polyPart(b.pa), polyPart(b.pb)]);
      return blanked(l, [dlTerms(b.pa).at(-1), dlTerms(b.pb).at(-1)]);
    }
    if (i === b.lines.length - 1) return { ...l, ...blankDL(l.math, (j) => (j > 0 ? (level === 1 ? 'coef' : 'term') : false)) };
    if (l.act === 'inverse' && level === 1) {
      const m = l.math.match(/\(([^()]*)\)\^2/);
      return m ? blanked(l, [m[1]]) : l;
    }
    return l;
  });
}

function opItem(level, rng, profile, opts) {
  opts = opts || {};
  if (opts.exam === 'mcq') return opMcq(rng);
  if (opts.exam === 'tf') return opTf(rng);
  const d = opData(rng, OPS_BY_LEVEL[level]);
  const b = opBuild(d);
  const judge = { kind: 'series', v: V, at: 0, order: d.n };
  const parts = [{ start: b.f, judge, lines: opBlanks(b, d, level), choices: OP_CHOICES(d) }];
  const as = assemble(parts, level);
  const method = d.kind === 'prod' ? `Multiplie les deux DL et ne garde que les termes de degré ≤ ${d.n}.` : `Développe le haut et le bas, mets le dénominateur sous la forme c(1 + u), puis 1/(1 + u) = 1 − u + u² − …${b.v ? ' Le dénominateur commence par x : simplifie d\'abord par x (il faut un ordre de plus en haut et en bas).' : ''}`;
  return linesItem({
    skill: OP, level, prompt: `Écris le DL d'ordre ${d.n} de ${MT(b.f)} en 0.`,
    ...as, mode: modeOf(level),
    hints: H(method, boxText(blankDL(b.fin, (j) => (j > 0 ? 'coef' : false))), MT(b.fin)),
    subgoals: OP_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${OP}:${b.f}:${d.n}`, exam: examOf(opts), fallback: !!d.fallback,
  });
}

function opMcq(rng) {
  const d = rng.chance(0.4) ? { kind: 'quot', N: '1', D: '1+e^(-x)', n: 3 } : opData(rng, ['logistic', 'expsin', 'tan', 'sinfrac', 'expfrac', 'cosln']);
  const b = opBuild(d);
  const judge = { kind: 'series', v: V, at: 0, order: d.n };
  const rightHtml = MT(b.fin);
  const wrong = uniq([...trapOptions(b.f, judge, rightHtml), ...b.lines.slice(0, -1).flatMap((l) => trapOptions(l.math, judge, rightHtml))]);
  const prefer = ['a1_dl_truncate_early', 'a1_dl_cube_coeffs'];
  const sorted = [...wrong.filter((o) => prefer.includes(o.rule)), ...wrong.filter((o) => !prefer.includes(o.rule))];
  // A sign slip on the last term.
  const k = b.cs.length - 1 - [...b.cs].reverse().findIndex((c) => !isZero(c));
  const flip = polyText(b.cs.map((c, j) => (j === k ? c.neg() : c)), { rem: d.n });
  const options = uniq([{ html: rightHtml, correct: true }, ...sorted.slice(0, 2), { html: MT(flip), correct: false }, ...sorted.slice(2)]).slice(0, 4);
  return mcq({
    skill: OP, level: 4, prompt: `Le DL d'ordre ${d.n} de ${MT(b.f)} en 0 est :`, options, key: `mcq:${b.f}:${d.n}`,
    exam: { format: 'mcq', points: 1 }, expectedSec: 240, fallback: !!d.fallback,
    solution: b.lines.map((l) => ({ html: `= ${MT(l.math)}`, note: l.note })),
  }, rng);
}

function opTf(rng) {
  const kind = rng.pick(['cube', 'square', 'prod', 'inv']);
  if (kind === 'cube' || kind === 'square') {
    const cube = kind === 'cube';
    const s = cube
      ? 'Pour tous réels a, b, c : si f(x) = a + bx + cx² + x²·ε(x), alors f(x)³ = a³ + b³x + c³x² + x²·ε(x).'
      : 'Pour tous réels b, c : si f(x) = 1 + bx + cx² + x²·ε(x), alors f(x)² = 1 + b²x + c²x² + x²·ε(x).';
    const quants = (cube ? ['a', 'b', 'c'] : ['b', 'c']).map((v) => ({ q: '∀', v, dom: 'R' }));
    return tfItem({
      skill: OP, level: 4, truth: false, key: kind, statement: s, ruleIfTrue: 'a1_dl_cube_coeffs',
      counter: { kind: 'refute', quants, pred: cube ? '3a^2b=b^3∧3a^2c+3a×b^2=c^3' : '2b=b^2∧2c+b^2=c^2', ask: quants.map((x) => ({ v: x.v, label: `${x.v} =` })), answer: cube ? { a: '1', b: '1', c: '0' } : { b: '1', c: '0' } },
      explanation: cube ? 'Faux (examen 2021) : avec f = 1 + x, f³ = 1 + 3x + 3x² + x³, et non 1 + x. Une puissance ne se distribue pas sur une somme.' : 'Faux : avec f = 1 + x, f² = 1 + 2x + x², et non 1 + x. Il faut développer, avec les doubles produits.',
      exam: { format: 'tf', points: 1 }, expectedSec: 60,
    });
  }
  if (kind === 'prod') {
    return tfItem({
      skill: OP, level: 4, truth: true, key: 'prod',
      statement: 'Si f(x) = x + x²·ε(x) et g(x) = 1 + x + x·ε(x), alors f(x)·g(x) = x + x² + x²·ε(x).',
      explanation: 'Vrai : f commence en x, donc le reste x·ε(x) de g devient x²·ε(x) dans le produit ; x·(1 + x) = x + x² jusqu\'à l\'ordre 2.',
      exam: { format: 'tf', points: 1 }, expectedSec: 60,
    });
  }
  return tfItem({
    skill: OP, level: 4, truth: true, key: 'inv',
    statement: 'Si f(x) = 2 + 3x + x·ε(x), alors 1/f(x) = 1/2 − 3x/4 + x·ε(x).',
    explanation: 'Vrai : 1/f = (1/2)·1/(1 + 3x/2 + x·ε(x)) = (1/2)(1 − 3x/2) + x·ε(x) = 1/2 − 3x/4 + x·ε(x).',
    exam: { format: 'tf', points: 1 }, expectedSec: 60,
  });
}

// ======================================================================
// a1-dl-compose
// ======================================================================

const CO = 'a1-dl-compose';
const CO_SUB = [
  { id: 'limit', label: 'u → 0', skill: CO },
  { id: 'recenter', label: 'recentrer', skill: CO },
  { id: 'subst', label: 'substituer', skill: CO },
  { id: 'powers', label: 'puissances tronquées', skill: OP },
];
const par = (g) => (/[+-]/.test(g.replace(/\([^()]*\)/g, '').slice(1)) ? `(${g})` : g);
const OUTER = {
  exp: { c: USUAL.exp.c, f0: (g) => `e^(${g})`, f1: (g) => `e^(${g})`, name: 'eᵘ' },
  ln: { c: USUAL.ln.c, f0: (g) => `ln(1+${g})`, f1: (g) => `ln(${g})`, name: 'Log(1 + u)' },
  cos: { c: USUAL.cos.c, f0: (g) => `cos(${g})`, name: 'cos u' },
  sin: { c: USUAL.sin.c, f0: (g) => `sin(${g})`, name: 'sin u' },
  geom: { c: USUAL.geom.c, f0: (g) => `1/(1-${par(g)})`, name: '1/(1 − u)' },
  sqrt: { c: coefOf('pow', q(1, 2)), f0: (g) => `√(1+${g})`, f1: (g) => `√(${g})`, name: '√(1 + u)' },
};
const INNER0 = ['sin(x)', 'x/(1-x)', 'x+x^2', 'ln(1+x)', 'e^x-1', 'tan(x)', 'x-x^2', 'sinh(x)'];
const INNER1 = ['1/(1+x)', '1/(1-x)', 'cos(x)', '1+sin(x)', '1+x+x^2'];
// f(g) that is a usual DL in disguise (e^(ln(1 + x)) = 1 + x, ln(1/(1 − x))…).
const BANNED = new Set(['exp|ln(1+x)', 'ln|e^x-1', 'ln|x/(1-x)', 'ln|1/(1+x)', 'ln|1/(1-x)', 'sqrt|1/(1+x)', 'sqrt|1/(1-x)', 'geom|x+x^2', 'geom|x-x^2']);

// Σ cₖ·(G)ᵏ (k·v ≤ n) without the remainder.
const substPoly = (c, G, v, n) => substText(c, G, v, n).replace(/[+-]x(\^\d+)?ε\(x\)$/, '');
// c·P for a polynomial text P with several terms: (P)/2, 3(P), (2/3)(P).
function scaled(c, P) {
  const a = c.n < 0 ? c.neg() : c;
  if (a.d === 1) return a.n === 1 ? `(${P})` : `${a.n}(${P})`;
  return a.n === 1 ? `(${P})/${a.d}` : `(${a.n}/${a.d})(${P})`;
}
// The truncated powers: c₁·(G) + Σ cₖ·[Gᵏ]ₙ.
function truncPowers(c, gs, G, v, n) {
  const parts = [];
  let p = gs.map(() => q(0));
  p[0] = q(1);
  for (let k = 0; k * v <= n; k++) {
    if (k > 0) p = mulCoefs(p, gs, n);
    const a = c(k);
    if (isZero(a)) continue;
    if (k === 0) { parts.push({ neg: a.n < 0, text: termAbs(a, 0) }); continue; }
    if (k === 1) { parts.push({ neg: a.n < 0, text: scaled(a, G) }); continue; }
    if (termCount(p) === 1) {
      const j = valuation(p);
      const t = a.mul(p[j]);
      parts.push({ neg: t.n < 0, text: termAbs(t, j) });
    } else parts.push({ neg: a.n < 0, text: scaled(a, polyText(p)) });
  }
  return joinTerms(parts);
}

function coData(rng, { exact = false } = {}) {
  for (let i = 0; i < 200; i++) {
    const one = !exact && rng.chance(0.35) || (exact && rng.chance(0.2));
    const Fk = rng.pick(one ? ['exp', 'exp', 'ln', 'sqrt'] : Object.keys(OUTER));
    if (exact && one && Fk === 'exp') continue;
    const g = rng.pick(one ? INNER1 : INNER0);
    if (BANNED.has(`${Fk}|${g}`)) continue;
    const n = rng.int(Fk === 'cos' ? 3 : 2, 4);
    const d = { Fk, g, n, c: one ? 1 : 0 };
    try {
      const b = coBuild(d);
      if (termCount(b.gs) < 2 || maxDen(b.cs) > 720 || maxNum(b.cs) > 200 || termCount(b.cs) < 2) continue;
      if (b.lines.some((l) => l.math.length > 110)) continue;
      fitLines({ kind: 'series', v: V, at: 0, order: n }, b.f, b.lines, false);
      return d;
    } catch { /* another draw */ }
  }
  return { Fk: 'exp', g: '1/(1+x)', n: 2, c: 1, fallback: true };
}

function coBuild(d) {
  const O = OUTER[d.Fk];
  const n = d.n;
  const f = d.c ? O.f1(d.g) : O.f0(d.g);
  const gs = coefs(d.g, n).map((x, k) => (k === 0 ? q(0) : x));
  const G = polyText(gs);
  const v = valuation(gs);
  const rem = remText(n);
  const lines = [];
  const e = d.c && d.Fk === 'exp';
  const wrap = (t) => (e ? `e×(${t})+${rem}` : `${t}+${rem}`);
  if (d.c) {
    const l1 = d.Fk === 'exp' ? `e×e^(${G}+${rem})` : d.Fk === 'ln' ? `ln(1+(${G}+${rem}))` : `√(1+(${G}+${rem}))`;
    lines.push(E(l1, d.Fk === 'exp' ? `${rd(d.g)} → 1 : on sort e¹` : `${rd(d.g)} = 1 + u avec u → 0`, 'recenter', 'recenter'));
  }
  lines.push(E(wrap(substPoly(O.c, G, v, n)), `DL de ${O.name} avec u = ${rd(G)}`, 'subst', 'subst'));
  lines.push(E(wrap(truncPowers(O.c, gs, G, v, n)), `Puissances de u, termes de degré ≤ ${n}`, 'powers', 'powers'));
  // e^g = e·e^(g − 1): the coefficients of e^(g − 1), times e.
  const cs = e ? coefs(`e^(${G})`, n) : coefs(f, n);
  const fin = polyText(cs, { rem: n, K: e ? 'e' : '' });
  lines.push(E(fin, 'Réduire', 'subst', 'reduce'));
  return { f, gs, G, v, cs, fin, lines, e };
}

const CO_CHOICES = (d) => [
  ...(d.c ? [{ id: 'recenter', label: d.Fk === 'exp' ? 'Sortir la constante : e^(g) = e·e^(g − 1)' : 'Écrire g = 1 + u avec u → 0' }] : []),
  { id: 'subst', label: 'Remplacer u par son DL dans le DL de f' },
  { id: 'powers', label: `Calculer u², u³… en gardant les termes de degré ≤ ${d.n}` },
  { id: 'reduce', label: 'Réduire' },
  d.c ? { id: 'direct', label: 'Remplacer u par g(x) directement dans le DL de f en 0', rule: 'a1_dl_compose_nonzero_inner', why: 'g(x) tend vers 1, pas vers 0 : le DL de f en 0 ne s\'applique pas à u = g(x).' }
    : { id: 'lead', label: 'Dans uᵏ, ne garder que le premier terme de u', rule: 'a1_dl_truncate_inner', why: 'Dans uᵏ, les autres termes de u donnent aussi des termes de degré ≤ n.' },
];

function coParts(d, level) {
  const b = coBuild(d);
  let lines = b.lines;
  if (level <= 2) {
    lines = lines.map((l) => {
      if (l.act === 'powers' && level === 1) return { ...l, ...blankDL(l.math, (i) => (i >= 2 ? 'term' : false)) };
      if ((l.act === 'subst' && !d.c) || (l.act === 'recenter' && level === 2)) return blanked(l, d.c && d.Fk === 'exp' ? ['e', b.G] : [b.G]);
      if (l.act === 'reduce') return { ...l, ...blankDL(l.math, (i) => (i > 0 ? (level === 1 ? 'coef' : 'term') : false)) };
      return l;
    });
  }
  const limit = { kind: 'limit', v: V, to: '0' };
  const parts = [
    { start: d.g, judge: limit, lines: [E(String(d.c), d.c ? 'u ne tend pas vers 0 : il faudra recentrer' : 'u → 0 : le DL de f en 0 s\'applique', 'limit')] },
    { html: `DL d'ordre ${d.n} de ${MT(b.f)} en 0 :`, start: b.f, judge: { kind: 'series', v: V, at: 0, order: d.n }, lines, choices: CO_CHOICES(d) },
  ];
  return { b, parts };
}

function coItem(level, rng, profile, opts) {
  opts = opts || {};
  if (opts.exam === 'mcq') return coMcq(rng);
  if (opts.exam === 'coef') return coCoef(rng);
  const d = coData(rng);
  const { b, parts } = coParts(d, level);
  const as = assemble(parts, level);
  const O = OUTER[d.Fk];
  const m1 = d.c
    ? `${rd(d.g)} tend vers 1 : ${d.Fk === 'exp' ? 'sors e¹ avant d\'utiliser le DL de l\'exponentielle' : 'écris-le 1 + u avec u → 0'}.`
    : `u = ${rd(d.g)} tend vers 0 : remplace u par son DL dans celui de ${O.name}, et garde dans uᵏ tous les termes de degré ≤ ${d.n}.`;
  return linesItem({
    skill: CO, level,
    prompt: `Vérifie d'abord la limite en 0 de u = ${MT(d.g)}, puis écris le DL d'ordre ${d.n} de ${MT(b.f)} en 0.`,
    ...as, mode: modeOf(level),
    hints: H(m1, boxText(blankDL(b.fin, (i) => (i > 0 ? 'coef' : false))), MT(b.fin)),
    subgoals: CO_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${CO}:${b.f}:${d.n}`, exam: examOf(opts), fallback: !!d.fallback,
  });
}

function coMcq(rng) {
  const d = rng.chance(0.25) ? { Fk: 'exp', g: '1/(1-x)', n: 2, c: 1 } : coData(rng);
  const b = coBuild(d);
  const judge = { kind: 'series', v: V, at: 0, order: d.n };
  const rightHtml = MT(b.fin);
  const wrong = uniq([b.f, ...b.lines.slice(0, -1).map((l) => l.math)].flatMap((t) => trapOptions(t, judge, rightHtml)));
  const prefer = ['a1_dl_compose_nonzero_inner', 'a1_dl_truncate_inner', 'a1_dl_truncate_early'];
  const sorted = [...wrong.filter((o) => prefer.includes(o.rule)), ...wrong.filter((o) => !prefer.includes(o.rule))];
  const k = b.cs.length - 1 - [...b.cs].reverse().findIndex((c) => !isZero(c));
  const flip = polyText(b.cs.map((c, j) => (j === k ? c.neg() : c)), { rem: d.n, K: b.e ? 'e' : '' });
  // Without the powers u², u³… (only 1 + u, the first order of the DL of f).
  const O = OUTER[d.Fk];
  const lin = b.e ? coefs(`1+${par(b.G)}`, d.n) : coefs(`(${O.c(0).toString()})+(${O.c(1).toString()})×(${b.G})`, d.n);
  const linText = polyText(lin, { rem: d.n, K: b.e ? 'e' : '' });
  const options = uniq([{ html: rightHtml, correct: true }, ...sorted.slice(0, 2), { html: MT(flip), correct: false }, { html: MT(linText), correct: false }, ...sorted.slice(2)]).slice(0, 4);
  return mcq({
    skill: CO, level: 4, prompt: `Le DL d'ordre ${d.n} de ${MT(b.f)} en 0 est :`, options, key: `mcq:${b.f}:${d.n}`,
    exam: { format: 'mcq', points: 1 }, expectedSec: 240, fallback: !!d.fallback,
    solution: b.lines.map((l) => ({ html: `= ${MT(l.math)}`, note: l.note })),
  }, rng);
}

// One coefficient of the DL (exam 2019 : a₃ de e^(sin x), a₃ de sin(x/(1 − x))).
function coCoef(rng) {
  const d = coData(rng, { exact: true });
  const b = coBuild(d);
  const k = d.n;
  const want = b.cs[k];
  const judge = { kind: 'series', v: V, at: 0, order: d.n };
  const traps = [];
  for (const t of [b.f, ...b.lines.slice(0, -1).map((l) => l.math)].flatMap((x) => trapAnswers('series', parse(x), judge))) {
    try {
      const c = coefs(t.node, k)[k];
      if (c && c.n !== undefined && !c.eq(want) && !traps.some((x) => x.value === c.toString())) traps.push({ value: c.toString(), rule: t.rule });
    } catch { /* skip */ }
  }
  return answerItem({
    skill: CO, level: 4, prompt: `Dans le DL de ${MT(b.f)} en 0, quel est le coefficient de ${MT(`x^${k}`)} ?`,
    expected: want.toString(), traps: traps.slice(0, 4), key: `${b.f}:${k}`, exam: { format: 'coef', points: 1 }, fallback: !!d.fallback,
    solution: b.lines.map((l) => ({ html: `= ${MT(l.math)}`, note: l.note })),
  });
}

export const GEN = {
  [OP]: opItem,
  [CO]: coItem,
};

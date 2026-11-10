// Tools of module F, part a (unit `fourier`, step U10): exact Fourier
// coefficients, the lines of an integration by parts, texts, and the
// assembly of an item made of parts (each with its own judge).
//
// Values (V): finite sums of q·π^e·((−1)ⁿ)^s/n^k (q rational), a Map from
// 'e,k,s' to Q. Enough for ∫₀^L p(x)·sin or cos(nπx/L) dx with p a
// polynomial and L ∈ {π, 1, 2}: sin(nπ) = 0 and cos(nπ) = (−1)ⁿ at the ends.
// vText(V) writes the closed form for the CAS (4(1-(-1)^n)/(π n^3)).
//
// ipp({K, p, trig, L}) → {lines: [{math, act}], value, start}: the lines
// K∫₀^L p(x) trig(nπx/L) dx = K(bracket + (1/a)∫ p′ …) = … = closed form.
//
// build(o): an item of parts (spec §16.2) at the levels of §8.3. o =
// {skill, level, prompt, parts, hints, subgoals, keys, key, exam, choices,
// fallback}; a part = {html?, ask?, start, judge, pre?: [notes, decisions],
// lines: [{math, note?, subgoal, act?, blank?: [texts], blank2?: [texts]}]}.
// Level 1: decisions are notes (the reference choice), blanks `blank`;
// level 2: decisions asked, blanks `blank2` (else `blank`); level 3: one
// menu per line (choices: [{id, label, rule?, why?}], the line's act is the
// right one); levels 4 and 5: free lines (5 without hints).

import { Q } from '../../math/rational.js';
import { MT, linesItem, mcq } from './kit.js';
import { tpl, stepMenus, modeOf, H } from './analyse1-e-kit.js';
import { parseOpts } from '../../judges/common.js';
import { parse } from '../../cas/parse.js';
import { complexValue } from '../../cas/complex.js';
import { evalFloat } from '../../cas/numeric.js';
import { judgeFor, readWith } from '../../judges/index.js';

export { MT, H, modeOf };
export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const fr = (s) => String(s).replace(/-/g, '−');
// c·x^j as text (c rational): 'x^3/3', '3x^2/2', 'x', '2x'.
export function mono(c, j, v = 'x') {
  const C = q(c);
  const xj = j === 0 ? '' : j === 1 ? v : `${v}^${j}`;
  if (!xj) return String(C);
  const num = Math.abs(C.n) === 1 ? xj : `${Math.abs(C.n)}${xj}`;
  return `${C.n < 0 ? '-' : ''}${num}${C.d === 1 ? '' : `/${C.d}`}`;
}
// A factor before ∫ or a bracket: '(2/π) ', '2 ', '' for 1.
export const Kpre = (K) => (!K || K === '1' ? '' : /^\d+$/.test(K) ? `${K} ` : `(${K}) `);

// ---------- values ----------

const key = (e, k, s) => `${e},${k},${s}`;
export const V = (entries = []) => {
  const m = new Map();
  for (const [c, e = 0, k = 0, s = 0] of entries) vAddTo(m, key(e, k, s), q(c));
  return m;
};
function vAddTo(m, kk, c) {
  const old = m.get(kk) || q(0);
  const nw = old.add(c);
  if (nw.n === 0) m.delete(kk); else m.set(kk, nw);
}
export const vAdd = (a, b) => { const m = new Map(a); for (const [kk, c] of b) vAddTo(m, kk, c); return m; };
export const vScale = (a, c) => { const m = new Map(); for (const [kk, x] of a) vAddTo(m, kk, x.mul(q(c))); return m; };
const shift = (a, de, dk, ds) => {
  const m = new Map();
  for (const [kk, x] of a) { const [e, k, s] = kk.split(',').map(Number); vAddTo(m, key(e + de, k + dk, (s + ds) % 2), x); }
  return m;
};
export const vMulPi = (a, e) => shift(a, e, 0, 0);
export const vDivN = (a, k = 1) => shift(a, 0, k, 0);
export const vSign = (a) => shift(a, 0, 0, 1);
export const vMul = (a, b) => { let m = new Map(); for (const [kk, x] of b) { const [e, k, s] = kk.split(',').map(Number); m = vAdd(m, vScale(shift(a, e, k, s), x)); } return m; };
export const vZero = (a) => a.size === 0;
export const vNeg = (a) => vScale(a, -1);
// The value at n (a float), to check a text against.
export function vAt(a, n) {
  let t = 0;
  for (const [kk, x] of a) { const [e, k, s] = kk.split(',').map(Number); t += x.valueOf() * Math.PI ** e * (s ? (-1) ** n : 1) / n ** k; }
  return t;
}

// c·π^e as a factor text: numerator and denominator lists.
function piParts(e) { return e > 0 ? [[e === 1 ? 'π' : `π^${e}`], []] : e < 0 ? [[], [e === -1 ? 'π' : `π^${-e}`]] : [[], []]; }
const nPow = (k) => (k === 0 ? [] : [k === 1 ? 'n' : `n^${k}`]);

// One term: c ≥ 0 (its sign apart), a pattern ('' | '(-1)^n' | '(1-(-1)^n)' | '(1+(-1)^n)'), π^e, 1/n^k.
function termText(c, pat, e, k, v = 'n') {
  const [pn, pd] = piParts(e);
  const num = [];
  if (c.n !== 1 || (!pat && !pn.length)) num.push(String(c.n));
  num.push(...pn);
  if (pat) num.push(pat);
  const den = [...(c.d !== 1 ? [String(c.d)] : []), ...pd, ...nPow(k)];
  const numT = num.join('');
  const out = den.length ? `${numT}/${den.length > 1 ? `(${den.join(' ')})` : den[0]}` : numT;
  return v === 'n' ? out : out.replace(/n/g, v);
}

// The closed form of a value, as text for the CAS.
// split: each (−1)ⁿ term apart (another writing of the same value).
export function vText(a, { split = false } = {}) {
  if (vZero(a)) return '0';
  const groups = new Map();
  for (const [kk, x] of a) {
    const [e, k, s] = kk.split(',').map(Number);
    const g = groups.get(`${e},${k}`) || { e, k, A: q(0), B: q(0) };
    if (s) g.B = x; else g.A = x;
    groups.set(`${e},${k}`, g);
  }
  const terms = [];
  const list = [...groups.values()].sort((x, y) => x.k - y.k || y.e - x.e);
  for (const { e, k, A, B } of list) {
    if (B.n === 0) terms.push([A, '', e, k]);
    else if (split && A.n !== 0) { terms.push([A, '', e, k]); terms.push(B.n < 0 ? [B.neg(), '(-1)^(n+1)', e, k] : [B, '(-1)^n', e, k]); }
    else if (A.n === 0) {
      if (B.n < 0) terms.push([B.neg(), '(-1)^(n+1)', e, k]); else terms.push([B, '(-1)^n', e, k]);
    } else if (A.eq(B.neg())) terms.push(A.n < 0 ? [A.neg(), '((-1)^n-1)', e, k] : [A, '(1-(-1)^n)', e, k]);
    else if (A.eq(B)) terms.push([A, '(1+(-1)^n)', e, k]);
    else { terms.push([A, '', e, k]); terms.push(B.n < 0 ? [B.neg(), '(-1)^(n+1)', e, k] : [B, '(-1)^n', e, k]); }
  }
  let out = '';
  for (const [c, pat, e, k] of terms) {
    const neg = c.n < 0;
    const t = termText(neg ? c.neg() : c, pat, e, k);
    out += out ? (neg ? `-${t}` : `+${t}`) : (neg ? `-${t}` : t);
  }
  return out;
}

// ---------- polynomials with coefficients in V (constants: k = 0, s = 0) ----------

// p = [p0, p1, p2, …] (V or numbers); text in x.
const asV = (c) => (c instanceof Map ? c : V([[c]]));
export const P = (...cs) => cs.map(asV);
export const pDeriv = (p) => p.slice(1).map((c, j) => vScale(c, j + 1));
export const pIsZero = (p) => p.every(vZero);
export function pAt(p, Lv) {
  let out = V();
  let pw = V([[1]]);
  for (const c of p) { out = vAdd(out, vMul(c, pw)); pw = vMul(pw, Lv); }
  return out;
}
// A constant V written for a polynomial coefficient: 2, π, 2π, π/2, −3.
function cText(c) { return vText(c); }
export function pText(p, x = 'x') {
  let out = '';
  for (let j = p.length - 1; j >= 0; j--) {
    const c = p[j];
    if (vZero(c)) continue;
    let t = cText(c);
    const neg = t.startsWith('-');
    if (neg) t = t.slice(1);
    const mono = j === 0 ? '' : j === 1 ? x : `${x}^${j}`;
    let body;
    if (!mono) body = t;
    else if (t === '1') body = mono;
    else if (/[+\-]/.test(t)) body = `(${t})${mono}`;
    else if (/\//.test(t)) body = `(${t})${mono}`;
    else body = `${t}${mono}`;
    out += out ? (neg ? `-${body}` : `+${body}`) : (neg ? `-${body}` : body);
  }
  return out || '0';
}

// ---------- integrations by parts ----------

// L: 'π' | 1 | 2. The frequency a = nπ/L, the argument, and 1/a = (L/π)/n.
export function freq(L) {
  if (L === 'π') return { Lv: V([[1, 1]]), Lt: 'π', arg: 'n x', a: 'n', inv: V([[1, 0, 1]]) };
  if (L === 1) return { Lv: V([[1]]), Lt: '1', arg: 'n π x', a: 'n π', inv: V([[1, -1, 1]]) };
  return { Lv: V([[2]]), Lt: '2', arg: 'n π x/2', a: 'n π/2', inv: V([[2, -1, 1]]) };
}

// ∫₀^L p·trig(ax) dx as a value.
export function ipv(p, trig, L) {
  if (pIsZero(p)) return V();
  const { Lv, inv } = freq(L);
  const dp = pDeriv(p);
  if (trig === 'sin') {
    // [−p cos(ax)/a]₀^L + (1/a)∫ p′ cos(ax)
    const B = vMul(vNeg(vAdd(vSign(pAt(p, Lv)), vNeg(p[0] || V()))), inv);
    return vAdd(B, vMul(inv, ipv(dp, 'cos', L)));
  }
  // [p sin(ax)/a]₀^L = 0 ; − (1/a)∫ p′ sin(ax)
  return vNeg(vMul(inv, ipv(dp, 'sin', L)));
}
// The bracket of one step, evaluated.
function bracketValue(p, trig, L) {
  if (trig === 'cos') return V();
  const { Lv, inv } = freq(L);
  return vMul(vNeg(vAdd(vSign(pAt(p, Lv)), vNeg(p[0] || V()))), inv);
}

// A coefficient text before a factor: '3x^2 cos(…)', '(π-2x) sin(…)', 'cos(…)', '-cos(…)'.
const isMono = (t) => !/[+\-]/.test(t.slice(1));
function times(t, rest) {
  if (t === '1') return rest;
  if (t === '-1') return `-${rest}`;
  return isMono(t) ? `${t} ${rest}` : `(${t}) ${rest}`;
}
const integrand = (p, trig, arg) => times(pText(p), `${trig}(${arg})`);

// The same with the sign of every « tout intégré » term of a sine step
// changed (trap f_ipp_sign: the primitive of sin taken as +cos/a).
export function ipvWrong(p, trig, L) {
  if (pIsZero(p)) return V();
  const { inv } = freq(L);
  const dp = pDeriv(p);
  if (trig === 'sin') return vAdd(vNeg(bracketValue(p, 'sin', L)), vMul(inv, ipvWrong(dp, 'cos', L)));
  return vNeg(vMul(inv, ipvWrong(dp, 'sin', L)));
}

// The value at a whole n (a constant V), and the odd terms n = 2k + 1 as text in k.
export function vAtN(a, n) {
  const m = new Map();
  for (const [kk, x] of a) {
    const [e, k, s] = kk.split(',').map(Number);
    vAddTo(m, key(e, 0, 0), x.mul(q(s && n % 2 ? -1 : 1, n ** k)));
  }
  return m;
}
export function vEven(a) {
  const m = new Map();
  for (const [kk, x] of a) { const [e, k] = kk.split(',').map(Number); vAddTo(m, key(e, k, 0), x); }
  return m;
}
export function vOdd(a) {
  const m = new Map();
  for (const [kk, x] of a) { const [e, k, s] = kk.split(',').map(Number); vAddTo(m, key(e, k, 0), s ? x.neg() : x); }
  return m;
}
export const kText = (t) => t.replace(/n\^(\d+)/g, '(2k+1)^$1').replace(/\bn\b/g, '(2k+1)');
export const vOddText = (a) => kText(vText(vOdd(a)));

// The lines of K∫₀^L p trig(ax) dx: IPP steps, evaluated brackets, value.
// K: text of the factor ('2/π', '2', …) or ''. Returns {start, lines, value}.
// ∫₀^L c·cos(ax) dx = 0 is dropped at once (no IPP on a constant).
export function ipp({ K = '', Kv = V([[1]]), p, trig, L }) {
  const { Lt, arg, a } = freq(L);
  const A = a === 'n' ? 'n' : `(${a})`;
  const ps = [p];
  const trigs = [trig];
  const zeroInt = (i) => pIsZero(ps[i]) || (ps[i].slice(1).every(vZero) && trigs[i] === 'cos');
  while (!zeroInt(ps.length - 1)) { const d = pDeriv(ps[ps.length - 1]); ps.push(d); trigs.push(trigs[trigs.length - 1] === 'sin' ? 'cos' : 'sin'); }
  const depthMax = ps.length - 1;
  const intT = (i) => `int(${integrand(ps[i], trigs[i], arg)}, x, 0, ${Lt})`;
  const brT = (i) => (trigs[i] === 'sin'
    ? `bracket(${times(pText(vNegP(ps[i])), `cos(${arg})`)}/${A}, x, 0, ${Lt})`
    : `bracket(${times(pText(ps[i]), `sin(${arg})`)}/${A}, x, 0, ${Lt})`);
  const sg = (i) => (trigs[i] === 'sin' ? '+' : '-');
  const Kt = /^\d+$/.test(K) ? K : `(${K})`;
  const kWrap = (body) => (K && K !== '1' ? `${Kt}(${body})` : body);
  // The line once d IPP are done, the last bracket evaluated or not.
  const lineAt = (d, evaluated) => {
    const build = (i) => {
      if (i === d) return (evaluated && zeroInt(i)) || pIsZero(ps[i]) ? null : intT(i);
      const isEval = i < d - 1 || evaluated;
      const bv = bracketValue(ps[i], trigs[i], L);
      const br = isEval ? (vZero(bv) ? null : vText(bv)) : brT(i);
      const rest = build(i + 1);
      const tail = rest === null ? null : `${sg(i)}(1/${A})${/^int/.test(rest) ? rest : `(${rest})`}`;
      if (br === null && tail === null) return '0';
      if (br === null) return tail.startsWith('+') ? tail.slice(1) : tail;
      if (tail === null) return br;
      return `${br}${tail}`;
    };
    return build(0);
  };
  const start = K && K !== '1' ? `${Kt} ${intT(0)}` : intT(0);
  const lines = [];
  for (let d = 1; d <= depthMax; d++) {
    const i = d - 1;
    const prim = trigs[i] === 'sin' ? `${times(pText(vNegP(ps[i])), `cos(${arg})`)}/${A}` : `${times(pText(ps[i]), `sin(${arg})`)}/${A}`;
    const bv = bracketValue(ps[i], trigs[i], L);
    lines.push({ math: kWrap(lineAt(d, false)), act: ps[i].slice(1).every(vZero) ? 'prim' : 'ipp', piece: prim });
    lines.push({ math: kWrap(lineAt(d, true)), act: 'eval', piece: vZero(bv) ? null : vText(bv) });
  }
  if (depthMax === 0) lines.push({ math: '0', act: 'eval' });
  const value = vMul(Kv, ipv(p, trig, L));
  const out = [];
  // A line without ∫ nor [F] is already final for the judge: only the value is kept.
  for (const l of lines) if ((!out.length || out[out.length - 1].math !== l.math) && /int\(|bracket\(/.test(l.math)) out.push(l);
  out.push({ math: vText(value), act: 'simp' });
  return { start, lines: out, value };
}
const vNegP = (p) => p.map(vNeg);

// ---------- items of parts ----------

const STATIC = new Set(['prob', 'fcomplex', 'eigen', 'complex', 'stat']);

// A trap value equal to the value asked is no trap: dropped (parts with
// `expect`, judges value and fcomplex).
function cleanTraps(judge) {
  if (judge.traps && judge.kind === 'equiv' && judge.goal) return cleanEquiv(judge);
  if (!judge.traps || judge.expect === undefined || !['value', 'fcomplex'].includes(judge.kind)) return judge;
  const val = (t) => complexValue(parse(String(t), { complex: true, vars: judge.vars }));
  let want;
  try { want = val(judge.expect); } catch { return judge; }
  if (!want) return judge;
  const traps = {};
  for (const [id, list] of Object.entries(judge.traps)) {
    const keep = list.filter((x) => {
      try { const v = val(typeof x === 'string' ? x : x.line); return !v || Math.abs(v.re - want.re) + Math.abs(v.im - want.im) > 1e-9 * (1 + Math.abs(want.re) + Math.abs(want.im)); } catch { return true; }
    });
    if (keep.length) traps[id] = keep;
  }
  return { ...judge, traps };
}

// The same for a coefficient in n (or k): equal to the goal at n = 1 … 6.
function cleanEquiv(judge) {
  const v = judge.vars[0];
  const at = (t) => { const node = parse(String(t), { vars: judge.vars }); return [1, 2, 3, 4, 5, 6].map((n) => evalFloat(node, { [v]: n })); };
  let want;
  try { want = at(judge.goal); } catch { return judge; }
  const traps = {};
  for (const [id, list] of Object.entries(judge.traps)) {
    const keep = list.filter((x) => { try { const got = at(typeof x === 'string' ? x : x.line); return got.some((g, i) => !(Math.abs(g - want[i]) <= 1e-9 * (1 + Math.abs(want[i])))); } catch { return true; } });
    if (keep.length) traps[id] = keep;
  }
  return { ...judge, traps };
}

// The reference lines a judge takes as steps: a line before the last that
// the judge finds « right, to tidy » or already final is dropped (one
// marked `keep` ends the part instead) (the judges value and equiv accept (π + 0)/2, or a
// line without ∫, as an answer).
function prune(p) {
  const lines = p.lines;
  if (lines.length < 2) return lines;
  const j = cleanTraps(p.judge);
  let prev;
  try { prev = readWith(j, p.start); } catch { return lines; }
  const out = [];
  let stop = false;
  lines.forEach((l, i) => {
    if (stop) return;
    if (i === lines.length - 1) { out.push(l); return; }
    let v;
    try { v = judgeFor(j).judgeLine(j, prev, l.math, {}); } catch { v = { kind: 'parse' }; }
    if (v.kind === 'ok') { out.push(l); prev = v.node ?? prev; }
    // Already an answer: dropped, or it ends the part when it asks so
    // (keep: its blanks are the point of the line, the Dirichlet mean).
    if (v.kind === 'done' && l.keep) { out.push({ ...l, subgoal: lines[lines.length - 1].subgoal ?? l.subgoal }); stop = true; }
  });
  return out;
}

export function build(o) {
  const { level } = o;
  const guided = level <= 2;
  const choices = o.choices || [];
  const judgeAt = (p0) => {
    const p = { ...p0, judge: cleanTraps(p0.judge) };
    if (level !== 3) return p.judge;
    if (STATIC.has(p.judge.kind) || p.menu) {
      const acts = new Set(p.lines.map((l) => l.act).filter(Boolean));
      const menu = p.menu || choices.map((c) => ({ id: c.id, label: c.label, valid: acts.has(c.id), why: c.why || 'Ce n\'est pas l\'étape à faire maintenant.', ...(c.rule && !acts.has(c.id) ? { rule: c.rule } : {}) }));
      return { ...p.judge, menu };
    }
    const lines = p.lines.map((l) => ({ kind: 'eq', math: l.math, act: l.act }));
    return { ...p.judge, menus: stepMenus(p.start, lines, choices) };
  };
  const script = [];
  o.parts.forEach((p0, k) => {
    const p = { ...p0, lines: prune({ ...p0, lines: p0.lines.filter((l) => !(l.from && level < l.from)) }) };
    if (k > 0) script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge: judgeAt(p) });
    for (const x of p.pre || []) {
      if (x.kind === 'decision') {
        if (x.levels && !x.levels.includes(level)) continue;
        if (o.exam && !x.inExam) continue;
        if (level === 1) {
          const ok = x.options.find((y) => y.ref) ?? x.options.find((y) => y.valid && y.quality !== 'poor');
          script.push({ kind: 'note', html: `${x.prompt} ${ok.label}.` });
        } else {
          const { levels, inExam, ...line } = x;
          script.push(line);
        }
      } else if (!x.levels || x.levels.includes(level)) script.push({ kind: 'note', html: x.html });
    }
    // The first part's heading comes after its decisions (the parity, the formula…).
    if (k === 0 && p.html) script.push({ kind: 'note', html: p.html });
    const opts = parseOpts(p.judge);
    for (const l of p.lines) {
      if (l.from && level < l.from) continue;
      const line = { kind: 'eq', math: l.math, note: l.note || '', subgoal: l.subgoal };
      const b = level === 1 ? l.blank : (l.blank2 ?? l.blank);
      if (guided && b?.length && !STATIC.has(p.judge.kind)) Object.assign(line, tpl(l.math, b, opts));
      else if (guided && b?.length && p.judge.kind === 'fcomplex') Object.assign(line, tpl(l.math, b, { ...opts, complex: true }));
      script.push(line);
    }
  });
  return linesItem({
    skill: o.skill, level, mode: modeOf(level), prompt: o.prompt, start: o.parts[0].start, judge: judgeAt(o.parts[0]),
    script, hints: o.hints, subgoals: o.subgoals, keys: o.keys || KEYS, key: o.key,
    tapActions: level === 3 ? 'steps' : null, exam: o.exam || false, fallback: !!o.fallback, noHints: o.noHints,
    baits: o.baits, expectedSec: o.expectedSec,
  });
}

export const KEYS = ['calcx', 'calcfn', 'seq', 'anal'];
export const CKEYS = ['calc', 'cplx', 'calcfn', 'seq'];

// The equiv judge of a Fourier coefficient (lines in n, integrals evaluated
// by quadrature at each whole n drawn).
// goal: the closed form; a line is final when no ∫ nor [F] is left, tidy,
// with no more terms than the goal (equiv's target 'no-int').
export const COEF = (goal, extra = {}) => ({ kind: 'equiv', vars: ['n'], domain: { n: { int: [1, 40] } }, target: 'no-int', goal, ...extra });
export const COEFK = (goal, extra = {}) => ({ kind: 'equiv', vars: ['k'], domain: { k: { int: [0, 40] } }, target: 'no-int', goal, ...extra });

// A text in n with n replaced by an expression (2k+1).
export const atN = (text, by) => text.replace(/\bn\b/g, `(${by})`);

// ---------- multiple choice ----------

// One right answer, three distinct wrong ones (rules kept).
export function mcq1(o, rng) {
  const options = [{ html: o.right, correct: true }];
  for (const w of [...(o.wrongs || []), ...(o.fillers || [])]) {
    if (options.length >= (o.count || 4)) break;
    if (!w || w.html === undefined || options.some((x) => x.html === w.html)) continue;
    options.push({ html: w.html, correct: false, rule: w.rule ?? null });
  }
  return mcq({ ...o, options }, rng);
}
// Several right answers (exam, « plusieurs réponses »): options [{html, correct, rule?}].
export function mcqMulti(o, rng) {
  const seen = new Set();
  const options = [];
  for (const x of o.options) {
    if (!x || seen.has(x.html)) continue;
    seen.add(x.html);
    options.push({ html: x.html, correct: !!x.correct, rule: x.correct ? null : x.rule ?? null });
  }
  return mcq({ ...o, options, multi: true, prompt: `${o.prompt} (plusieurs réponses possibles)` }, rng);
}
export const opt = (text, rule = null, mopts = {}) => ({ html: MT(text, mopts), rule });

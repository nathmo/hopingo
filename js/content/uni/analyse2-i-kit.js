// Helpers of module A2, part i (unit `analyse2`, step U6): linear ODE with
// constant coefficients built from the answer. Functions are sums of terms
// c·xʲ·e^(mx)·T(kx) (T = 1, cos or sin), with exact rational c; the
// operator L = D² + pD + q acts on them with unknown coefficients (A, B)
// to write the line « L[y_p] = … » and the identification system; values
// at 0 (initial conditions) and at x₁ ∈ {1, π, π/2} are exact.

import { Q } from '../../math/rational.js';
import { tokenize, normalizeText } from '../../cas/parse.js';
import { MT, mcq } from './kit.js';
import { N } from './analyse1-e-kit.js';
import { t } from '../../i18n.js';

export const q = (n, d = 1) => new Q(n, d);
const Z = q(0);
const qv = (s) => Number(s.split('/')[0]) / Number(s.split('/')[1] || 1);

// ---------- numbers and texts ----------

// c·body as text: body, -body, 3body, (3/2)body; a number when body is ''.
export function cmul(c, body) {
  const C = Q.of(c);
  if (!body) return N(C);
  if (C.n === 0) return '';
  if (C.eq(1)) return body;
  if (C.eq(-1)) return `-${body}`;
  if (C.d === 1) return `${C.n}${body}`;
  return `${C.n < 0 ? '-' : ''}(${Math.abs(C.n)}/${C.d})${body}`;
}
// Terms joined into a sum (empty terms skipped).
export const sum = (terms) => terms.filter((t) => t && t !== '0').reduce((s, t) => (s ? (t.startsWith('-') ? `${s}${t}` : `${s}+${t}`) : t), '') || '0';
// e^(mx), xʲ, cos(kx) as text.
export function expText(m, v = 'x') {
  const M = Q.of(m);
  if (M.n === 0) return '';
  if (M.eq(1)) return `e^${v}`;
  if (M.eq(-1)) return `e^(-${v})`;
  return `e^(${cmul(M, v)})`;
}
export const powText = (j, v = 'x') => (j === 0 ? '' : j === 1 ? v : `${v}^${j}`);
export const trigText = (tr, k, v = 'x') => (tr === '1' ? '' : `${tr === 'c' ? 'cos' : 'sin'}(${k === 1 ? v : `${k}${v}`})`);
// xʲ·e^(mx)·T(kx).
export function basisText(t, v = 'x') {
  return [powText(t.j, v), expText(t.m, v), trigText(t.tr, t.k, v)].filter(Boolean).join(' ');
}

// ---------- terms ----------

// term = {c: Q, j, m: Q, tr: '1' | 'c' | 's', k}
export const T = (c, j, m, tr = '1', k = 0) => ({ c: Q.of(c), j, m: Q.of(m), tr, k });
const keyOf = (t) => `${t.j}|${t.m}|${t.tr}|${t.k}`;

// Like terms added, zero terms removed (order of first appearance).
export function combine(terms) {
  const map = new Map();
  for (const t of terms) {
    const k = keyOf(t);
    if (map.has(k)) map.set(k, { ...map.get(k), c: map.get(k).c.add(t.c) });
    else map.set(k, { ...t });
  }
  return [...map.values()].filter((t) => t.c.n !== 0);
}
export const scale = (terms, s) => terms.map((t) => ({ ...t, c: t.c.mul(s) }));
export const termsText = (terms, v = 'x') => sum(terms.map((t) => cmul(t.c, basisText(t, v))));

// f(0) and f′(0) of one term.
function at0(t) {
  const T0 = t.tr === 's' ? 0 : 1;
  const T1 = t.tr === 's' ? t.k : 0;
  const v = t.j === 0 ? q(T0) : Z;
  const d = t.j === 0 ? t.m.mul(T0).add(T1) : t.j === 1 ? q(T0) : Z;
  return [t.c.mul(v), t.c.mul(d)];
}
export function initial(terms) {
  return terms.reduce(([a, b], t) => { const [x, y] = at0(t); return [a.add(x), b.add(y)]; }, [Z, Z]);
}

// The constants C₁, C₂ of y = C₁h₁ + C₂h₂ + rest with y(0) = y0, y′(0) = y1.
export function fit(h1, h2, rest, y0, y1) {
  const [a, c] = initial([h1]);
  const [b, d] = initial([h2]);
  const [r0, r1] = initial(rest);
  const u = Q.of(y0).sub(r0);
  const w = Q.of(y1).sub(r1);
  const det = a.mul(d).sub(b.mul(c));
  return [u.mul(d).sub(b.mul(w)).div(det), a.mul(w).sub(c.mul(u)).div(det)];
}

// Value at x₁ ('1', 'π', 'π/2'): exact text, as a sum of rational multiples of
// π^j·e^(m·x₁). null when a term has no exact value (cos 1).
export function valueAt(terms, x1) {
  const atoms = new Map();
  for (const t of terms) {
    let c = t.c;
    let pj = 0;
    if (x1 === '1') {
      if (t.tr !== '1') return null;
    } else {
      pj = t.j;
      if (x1 === 'π/2') c = c.div(2 ** t.j);
      // cos(kπ), sin(kπ); cos(kπ/2), sin(kπ/2).
      const turns = x1 === 'π' ? 2 * t.k : t.k; // multiples of π/2
      const r = ((turns % 4) + 4) % 4;
      if (t.tr === 'c') c = c.mul([1, 0, -1, 0][r]);
      if (t.tr === 's') c = c.mul([0, 1, 0, -1][r]);
      if (x1 === 'π/2' && t.m.n !== 0) return null;
    }
    if (c.n === 0) continue;
    const key = `${pj}|${t.m}`;
    atoms.set(key, (atoms.get(key) || Z).add(c));
  }
  const parts = [...atoms.entries()].filter(([, c]) => c.n !== 0).sort(([a], [b]) => {
    const [pa, ma] = a.split('|');
    const [pb, mb] = b.split('|');
    return (Number(ma !== '0') - Number(mb !== '0')) || (Number(pa) - Number(pb)) || (qv(ma) - qv(mb));
  });
  const text = sum(parts.map(([key, c]) => {
    const [pj, m] = key.split('|');
    const M = new Q(Number(m.split('/')[0]), Number(m.split('/')[1] || 1));
    const pi = Number(pj) === 0 ? '' : Number(pj) === 1 ? 'π' : `π^${pj}`;
    let ex = '';
    if (M.n !== 0) {
      if (x1 === '1') ex = M.eq(1) ? 'e' : M.d === 1 && M.n > 0 ? `e^${M.n}` : `e^(${N(M)})`;
      else ex = M.eq(1) ? 'e^π' : `e^(${cmul(M, 'π')})`;
    }
    const atom = [pi, ex].filter(Boolean).join('');
    if (!atom) return N(c);
    // n·atom/d
    const top = Math.abs(c.n) === 1 ? atom : `${Math.abs(c.n)}${atom}`;
    return `${c.n < 0 ? '-' : ''}${top}${c.d === 1 ? '' : `/${c.d}`}`;
  }));
  return text;
}

// ---------- the operator L with unknown coefficients ----------

// A linear form in the unknowns: {A: Q, B: Q, '': Q}.
const lfAdd = (a, b) => { const o = { ...a }; for (const [k, v] of Object.entries(b)) o[k] = (o[k] || Z).add(v); return o; };
const lfScale = (a, s) => Object.fromEntries(Object.entries(a).map(([k, v]) => [k, v.mul(s)]));
const lfZero = (a) => Object.values(a).every((v) => v.n === 0);

// qp: Map key 'j|tr' → linear form, for fixed m and k.
function qpAdd(a, b) { const o = new Map(a); for (const [k, f] of b) o.set(k, o.has(k) ? lfAdd(o.get(k), f) : f); return o; }
function qpScale(a, s) { return new Map([...a].map(([k, f]) => [k, lfScale(f, s)])); }
function qpD(a, m, k) {
  let o = new Map();
  const put = (j, tr, f) => { o = qpAdd(o, new Map([[`${j}|${tr}`, f]])); };
  for (const [key, f] of a) {
    const [js, tr] = key.split('|');
    const j = Number(js);
    if (j > 0) put(j - 1, tr, lfScale(f, j));
    if (Q.of(m).n !== 0) put(j, tr, lfScale(f, m));
    if (tr === 'c') put(j, 's', lfScale(f, -k));
    if (tr === 's') put(j, 'c', lfScale(f, k));
  }
  return o;
}
// L[form] for L = D² + pD + q.
export function applyL(form, p, qq, m, k) {
  const d1 = qpD(form, m, k);
  const d2 = qpD(d1, m, k);
  return qpAdd(qpAdd(d2, qpScale(d1, p)), qpScale(form, qq));
}
export const qp = (entries) => new Map(entries);

function lfText(f) {
  const parts = [];
  for (const u of ['A', 'B']) if (f[u] && f[u].n !== 0) parts.push(cmul(f[u], u));
  if (f[''] && f[''].n !== 0) parts.push(N(f['']));
  return sum(parts);
}
// The text of a quasi-polynomial with unknown coefficients.
export function qpText(a, m, k, v = 'x') {
  const out = [];
  const keys = [...a.keys()].sort((x, y) => Number(y.split('|')[0]) - Number(x.split('|')[0]) || (x < y ? -1 : 1));
  for (const key of keys) {
    const f = a.get(key);
    if (lfZero(f)) continue;
    const [j, tr] = key.split('|');
    const body = basisText({ j: Number(j), m: Q.of(m), tr, k }, v);
    const nz = Object.entries(f).filter(([, c]) => c.n !== 0);
    if (nz.length === 1 && nz[0][0] === '') out.push(cmul(nz[0][1], body));
    else if (nz.length === 1) out.push(`${cmul(nz[0][1], nz[0][0])}${body ? ` ${body}` : ''}`);
    else if (!body) out.push(lfText(f));
    else out.push(`(${lfText(f)}) ${body}`);
  }
  return sum(out);
}

// Identification L[form] = rhs: one equation per basis function, then the
// solution (Cramer). Returns {eqs: ['-4A = 8', …], sol: {A, B}} or null.
export function identify(Lform, rhs, unknowns) {
  const keys = new Set([...Lform.keys(), ...rhs.keys()]);
  const eqs = [];
  const rows = [];
  for (const key of keys) {
    const f = Lform.get(key) || {};
    const r = rhs.get(key)?.[''] || Z;
    if (lfZero(f) && r.n === 0) continue;
    if (lfZero(f)) return null; // 0 = c ≠ 0: no solution of this form
    eqs.push(`${lfText(f)} = ${N(r.sub(f[''] || Z))}`);
    rows.push([...unknowns.map((u) => f[u] || Z), r.sub(f[''] || Z)]);
  }
  if (unknowns.length === 1) {
    const r = rows.find((x) => x[0].n !== 0);
    if (!r) return null;
    const A = r[1].div(r[0]);
    if (!rows.every((x) => x[0].mul(A).eq(x[1]))) return null;
    return { eqs, sol: { A } };
  }
  // Two unknowns: two independent rows.
  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 1; j < rows.length; j++) {
      const [a, b, e] = rows[i];
      const [c, d, f] = rows[j];
      const det = a.mul(d).sub(b.mul(c));
      if (det.n === 0) continue;
      const A = e.mul(d).sub(b.mul(f)).div(det);
      const B = a.mul(f).sub(e.mul(c)).div(det);
      if (!rows.every((x) => x[0].mul(A).add(x[1].mul(B)).eq(x[2]))) return null;
      return { eqs, sol: { A, B } };
    }
  }
  return null;
}

// ---------- items ----------

// Blanks: the values after each « = » of a line « C_1 = 1 ; C_2 = -2/3 »
// (token ranges), or of the k-th one only.
export function blankValues(math, only = null) {
  const toks = tokenize(math, {});
  const out = [];
  let n = 0;
  for (let i = 0; i < toks.length; i++) {
    if (toks[i].s !== '=') continue;
    let j = i + 1;
    while (j < toks.length && toks[j].s !== ';') j++;
    if (only === null || only === n) out.push([i + 1, j]);
    n++;
  }
  return out.length ? { math, blanks: out } : { math };
}

// Blanks on character ranges [from, to[ of math (as token ranges).
export function blankRanges(math, ranges) {
  const toks = tokenize(math, {});
  const at = (k) => normalizeText(math.slice(0, k)).length; // token positions are in the normalized text
  const out = [];
  for (const [a0, b0] of ranges) {
    const a = at(a0);
    const b = at(b0);
    const i = toks.findIndex((t) => t.pos >= a);
    if (i < 0) continue;
    let j = i;
    while (j < toks.length && toks[j].pos < b) j++;
    if (j > i && !out.some(([x, y]) => x < j && i < y)) out.push([i, j]);
  }
  out.sort((x, y) => x[0] - y[0]);
  return out.length ? { math, blanks: out } : { math };
}
// Blanks on the matches of a regular expression (global) in math.
export function blankMatches(math, re, max = 9) {
  const ranges = [];
  for (const m of math.matchAll(re)) if (ranges.length < max) ranges.push([m.index, m.index + m[0].length]);
  return blankRanges(math, ranges);
}
// Blanks on the last occurrence of a piece of text.
export function blankTail(math, piece) {
  const at = math.lastIndexOf(piece);
  return at < 0 ? { math } : blankRanges(math, [[at, at + piece.length]]);
}

// The level-3 menu of a part: the action `id` is the right one.
export const menuOf = (choices, id) => choices.map((c) => ({
  id: c.id, label: c.label, valid: c.id === id,
  why: c.why || t('Ce n\'est pas l\'étape à faire maintenant.'),
  ...(c.rule && c.id !== id ? { rule: c.rule } : {}),
}));

// Multiple choice with four distinct options (the right one first).
export function mcq4(o, rng) {
  const options = [{ html: o.right, correct: true }];
  for (const w of [...(o.wrongs || []), ...(o.fillers || [])]) {
    if (options.length >= (o.count || 4)) break;
    if (!w || w.html === undefined || options.some((x) => x.html === w.html)) continue;
    options.push({ html: w.html, correct: false, rule: w.rule ?? null });
  }
  return mcq({ ...o, options }, rng);
}

// V/F as a two-option multiple choice (statements without a checkable
// counter-example), with the exam tag `tf`.
export function vfMcq(skill, statement, truth, rng, { key, why, ruleIfTrue = null, ruleIfFalse = null, exam = true, level = 4 }) {
  return mcq({
    skill, level, prompt: t('Vrai ou faux ?<br>« {statement} »', { statement }), keepOrder: true,
    options: [{ html: t('Vrai'), correct: truth, rule: truth ? null : ruleIfTrue }, { html: t('Faux'), correct: !truth, rule: truth ? ruleIfFalse : null }],
    key: `${skill}:tf:${key}`, solution: [{ html: why, note: '' }], expectedSec: 60, exam: exam ? { format: 'tf', points: 1 } : false,
  }, rng);
}

export const M = (text, v = 'x') => MT(text, { dvar: v });

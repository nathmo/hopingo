// Counter-example properties of module A2, part a (step U6): {name: (params,
// answers) → {ok, message?, rule?}}, used by tf items with counter
// {kind: 'a2', prop: name, params, ask, answer} (js/judges/a2-examples.js).
// Every params object is plain data (items are saved as JSON).
//
// Sets of ℝ² or ℝ³ given by inequalities (a2-rn-topology): S = {dim, parts:
// [[atom…]…]}, a union of conjunctions; atom = {g: 'x^2+y^2', op: '<' | '≤' |
// '>' | '≥' | '≠', c: '4'}. inSet, pointKind (interior, boundary in E,
// boundary out of E, exterior; read on the neighbours p ± h at h = 10⁻⁴ and
// 10⁻⁶) are exported for the generators.
//
//   topoPoint {set, want: 'out' | 'in'}  answers {p: '(1 ; 0 ; 0)'}: a point of
//       ∂E outside E (E is not closed) or inside E (E is not open)
//   bdReal {test}  sets of ℝ written as intervals (« [0 ; 1] ∪ {3} »):
//       'incl' {E, F, p}: E ⊂ F, p ∈ ∂E, p ∉ ∂F; 'union' {A, B, p}: p ∈ ∂A ∪ ∂B,
//       p ∉ ∂(A ∪ B); 'inter' {A, B, p}: p in only one of ∂(A ∩ B), ∂A ∩ ∂B;
//       'inside' {E, p}: p ∈ ∂E, p ∉ E; 'intUnion' {A, B, p}: p ∈ int(A ∪ B),
//       p ∉ int A ∪ int B; 'neither' {E}: E neither open nor closed
//   vecSeq {dim, test}  answers {a1, a2, a3?} in n: 'boundedNotConv' (bounded,
//       not convergent), 'oneConv' (one component converges, the sequence
//       does not), 'normConv' (‖aₙ‖ converges, aₙ does not)
//   curveNotSmooth {dim}  answers {x, y, z?} in t: C¹ on [−3 ; 3] and γ′(t₀) = 0
//       at some t₀
//   arcCurve {test: 'sum' | 'square' | 'chord', a, b}  answers {x, y, z?} in t:
//       the length differs from ∫ (x′ + y′ + z′) dt, ∫ ‖γ′‖² dt or ‖γ(b) − γ(a)‖
//   fnDomain {domain, test: 'unbounded' | 'bounded' | 'noMax' | 'noMin'}  answers
//       {f}: f continuous on D (sampled) and not bounded, bounded, or without
//       a maximum (minimum). domain: {kind: 'interval', a, b} (open, in x) or a part of
//       ℝ²: {kind: 'openDisk' | 'punct' | 'R2' | 'half', r?}
//   imageNotOpen {}  answers {f} in x, y: f(ℝ²) is not open (f reaches a
//       global minimum or maximum)

import { parse, tryParse } from '../cas/parse.js';
import { compileFloat } from '../cas/numeric.js';
import { diff } from '../cas/diff.js';
import { quad } from '../cas/integrate.js';
import { limit } from '../cas/limit.js';
import { symbolsIn } from '../cas/ast.js';
import { solutionSet, contains01, union, intersect, minus } from '../cas/sets.js';
import { t } from '../i18n.js';

const XYZ = ['x', 'y', 'z'];

// ---------- compiled expressions ----------

const CACHE = new Map();
export function fnOf(text, vars = XYZ) {
  const key = `${vars.join()}|${text}`;
  if (!CACHE.has(key)) {
    if (CACHE.size > 800) CACHE.delete(CACHE.keys().next().value);
    const c = compileFloat(parse(String(text), { vars }));
    CACHE.set(key, (env) => { try { const v = c(env); return typeof v === 'number' ? v : NaN; } catch { return NaN; } });
  }
  return CACHE.get(key);
}
const numOf = (s) => fnOf(String(s), [])({});

// The student's expression in the letters `vars` only, compiled; or a message.
function studentFn(text, vars) {
  const raw = String(text ?? '').replace(/^\s*[a-zA-Zγ]+(_?\d)?(\([a-z ,;]*\))?\s*=/, '').trim();
  if (!raw) return { message: t('Écris ton exemple.') };
  const node = tryParse(raw, { vars });
  if (!node) return { message: t('Je n\'arrive pas à lire ta saisie.') };
  const extra = [...symbolsIn(node)].filter((s) => !vars.includes(s));
  if (extra.length) return { message: t('Écris une expression en {v} seulement.', { v: vars.join(', ') }) };
  let c;
  try { c = compileFloat(node); } catch { return { message: t('Je n\'arrive pas à calculer avec ta saisie.') }; }
  const f = (env) => { try { const v = c(env); return typeof v === 'number' ? v : NaN; } catch { return NaN; } };
  return { node, f };
}

// ---------- sets of ℝ² and ℝ³ given by inequalities ----------

const TOL = 1e-9;
export function atomHolds(a, env) {
  const v = fnOf(a.g)(env);
  const c = numOf(a.c);
  if (!Number.isFinite(v)) return false;
  const t = TOL * (1 + Math.abs(c));
  switch (a.op) {
    case '<': return v < c - t;
    case '≤': return v <= c + t;
    case '>': return v > c + t;
    case '≥': return v >= c - t;
    case '≠': return Math.abs(v - c) > t;
    default: return Math.abs(v - c) <= t;
  }
}
const envOf = (p) => ({ x: p[0], y: p[1], z: p[2] ?? 0 });
// Membership compiled once per set (the generators scan grids).
const TESTERS = new WeakMap();
function tester(S) {
  if (!TESTERS.has(S)) {
    const parts = S.parts.map((part) => part.map((a) => {
      const c = numOf(a.c);
      return { f: fnOf(a.g), op: a.op, c, t: TOL * (1 + Math.abs(c)) };
    }));
    const holds = ({ f, op, c, t }, env) => {
      const v = f(env);
      if (!Number.isFinite(v)) return false;
      switch (op) {
        case '<': return v < c - t;
        case '≤': return v <= c + t;
        case '>': return v > c + t;
        case '≥': return v >= c - t;
        case '≠': return Math.abs(v - c) > t;
        default: return Math.abs(v - c) <= t;
      }
    };
    TESTERS.set(S, (p) => { const env = envOf(p); return parts.some((part) => part.every((a) => holds(a, env))); });
  }
  return TESTERS.get(S);
}
export const inSet = (S, p) => tester(S)(p);

// The 3ᵈ − 1 directions of the cube around a point.
const DIRS = new Map();
function dirs(dim) {
  if (!DIRS.has(dim)) {
    const out = [];
    const rec = (pre) => {
      if (pre.length === dim) { if (pre.some((x) => x)) out.push(pre); return; }
      for (const s of [-1, 0, 1]) rec([...pre, s]);
    };
    rec([]);
    // The axes first: most boundaries are seen there.
    out.sort((u, v) => u.filter(Boolean).length - v.filter(Boolean).length);
    DIRS.set(dim, out);
  }
  return DIRS.get(dim);
}
// 'interior' | 'bdIn' (on ∂E, in E) | 'bdOut' (on ∂E, not in E) | 'exterior'.
export function pointKind(S, p, hs = [1e-4, 1e-6]) {
  const inSet = tester(S);
  const inside = inSet(p);
  let flip = false;
  for (const h of hs) {
    for (const d of dirs(S.dim)) {
      const q = p.map((x, i) => x + h * d[i]);
      if (inSet(q) !== inside) { flip = true; break; }
    }
    if (flip) break;
  }
  if (inside) return flip ? 'bdIn' : 'interior';
  return flip ? 'bdOut' : 'exterior';
}

// « (1 ; 0 ; 0) » → [1, 0, 0], or null.
export function readPoint(text, dim) {
  const t = String(text ?? '').replace(/^\s*[A-Za-z]\s*=\s*/, '').trim().replace(/^\(/, '').replace(/\)$/, '');
  const parts = t.includes(';') ? t.split(';') : t.split(/,(?=\s)|,(?=-)/);
  if (parts.length !== dim) return null;
  const out = parts.map((s) => { const n = tryParse(s.trim(), { vars: [] }); return n ? fnOf(s.trim().replace(/,/g, '.'), [])({}) : NaN; });
  return out.every(Number.isFinite) ? out : null;
}

// ---------- sets of ℝ (intervals) ----------

function realSet(text) {
  const node = tryParse(String(text ?? '').replace(/^\s*[A-Z]\s*=\s*/, ''), { vars: ['x'] });
  if (!node) return null;
  try { return solutionSet(node, { v: 'x', domain: 'R' }); } catch { return null; }
}
const near = (a, b) => Math.abs(a - b) < 1e-9;
const ends = (S) => S.parts.flatMap((p) => [p.lo.x, p.hi.x]).filter(Number.isFinite);
const inBd = (S, x) => ends(S).some((e) => near(e, x));
const inInt = (S, x) => contains01(S, x) && !inBd(S, x);
const isEmpty = (S) => S.parts.length === 0;

function bdReal(p, ans) {
  const sets = {};
  for (const k of ['A', 'B', 'E', 'F']) {
    if (ans[k] === undefined) continue;
    const S = realSet(ans[k]);
    if (!S) return { ok: false, message: t('Je n\'arrive pas à lire {k} : écris des intervalles, comme [0 ; 1] ou ]0 ; 1[ ∪ {3}.', { k }) };
    sets[k] = S;
  }
  if (p.test === 'neither') {
    if (!sets.E) return { ok: false, message: t('Donne {s}.', { s: 'E' }) };
    const S = sets.E;
    const fin = S.parts.flatMap((q) => [q.lo, q.hi]).filter((b) => Number.isFinite(b.x));
    const isIn = fin.some((b) => contains01(S, b.x));
    const isOut = fin.some((b) => !contains01(S, b.x));
    if (!isIn) return { ok: false, message: t('Ton ensemble est ouvert : aucun point de son bord n\'est dedans.'), rule: 'a2_topo_not_open_closed' };
    if (!isOut) return { ok: false, message: t('Ton ensemble est fermé : il contient tout son bord.') };
    return { ok: true };
  }
  const xs = readPoint(`(${ans.p ?? ''})`, 1);
  if (!xs) return { ok: false, message: t('Donne le point p (un nombre).') };
  const x = xs[0];
  const { A, B, E, F } = sets;
  switch (p.test) {
    case 'incl':
      if (!E || !F) return { ok: false, message: t('Donne {a} et {b}.', { a: 'E', b: 'F' }) };
      if (!isEmpty(minus(E, F))) return { ok: false, message: t('Il faut E ⊂ F.') };
      if (!inBd(E, x)) return { ok: false, message: t('{p} n\'est pas dans le bord de E.', { p: ans.p }) };
      if (inBd(F, x)) return { ok: false, message: t('{p} est aussi dans le bord de F.', { p: ans.p }) };
      return { ok: true };
    case 'union': {
      if (!A || !B) return { ok: false, message: t('Donne {a} et {b}.', { a: 'A', b: 'B' }) };
      if (!inBd(A, x) && !inBd(B, x)) return { ok: false, message: t('{p} n\'est ni dans ∂A ni dans ∂B.', { p: ans.p }) };
      if (inBd(union(A, B), x)) return { ok: false, message: t('{p} est aussi dans ∂(A ∪ B).', { p: ans.p }), rule: 'a2_bd_union' };
      return { ok: true };
    }
    case 'inter': {
      if (!A || !B) return { ok: false, message: t('Donne {a} et {b}.', { a: 'A', b: 'B' }) };
      const l = inBd(intersect(A, B), x);
      const r = inBd(A, x) && inBd(B, x);
      if (l === r) return { ok: false, message: l ? t('{p} est dans ∂(A ∩ B) et dans ∂A ∩ ∂B : ce point ne sépare pas les deux ensembles.', { p: ans.p }) : t('{p} est hors de ∂(A ∩ B) et hors de ∂A ∩ ∂B : ce point ne sépare pas les deux ensembles.', { p: ans.p }) };
      return { ok: true };
    }
    case 'inside':
      if (!E) return { ok: false, message: t('Donne {s}.', { s: 'E' }) };
      if (!inBd(E, x)) return { ok: false, message: t('{p} n\'est pas dans le bord de E.', { p: ans.p }) };
      if (contains01(E, x)) return { ok: false, message: t('{p} est dans E.', { p: ans.p }) };
      return { ok: true };
    case 'intUnion': {
      if (!A || !B) return { ok: false, message: t('Donne {a} et {b}.', { a: 'A', b: 'B' }) };
      if (!inInt(union(A, B), x)) return { ok: false, message: t('{p} n\'est pas intérieur à A ∪ B.', { p: ans.p }) };
      if (inInt(A, x) || inInt(B, x)) return { ok: false, message: t('{p} est déjà intérieur à A ou à B.', { p: ans.p }) };
      return { ok: true };
    }
    default: return { ok: false, message: t('Contre-exemple non vérifiable.') };
  }
}

// ---------- sequences of ℝⁿ ----------

// true (converges), false (does not) or null (cannot tell).
function seqConverges(node) {
  try {
    const L = limit(node, 'n', '+inf', undefined, { discrete: true }).value;
    if (L === null || L === undefined) return null;
    return typeof L !== 'string';
  } catch { return null; }
}
function seqBounded(node) {
  const conv = seqConverges(node);
  if (conv) return true;
  let c;
  try { c = compileFloat(node); } catch { return null; }
  const f = (n) => { try { return c({ n }); } catch { return NaN; } };
  const ns = [];
  for (let n = 1; n <= 2000; n++) ns.push(n);
  const far = [1e4, 1e5, 1e6, 1e7, 1e8, 1e8 + 1].map(Math.round);
  const m1 = Math.max(...ns.map((n) => Math.abs(f(n))));
  const m2 = Math.max(...far.map((n) => Math.abs(f(n))));
  if (!Number.isFinite(m1)) return null;
  if (m2 > 10 * m1 && m2 > 1e3) return false;
  if (m2 <= 2 * m1 + 1e-9) return true;
  return null;
}

function vecSeq(p, ans) {
  const names = ['a1', 'a2', 'a3'].slice(0, p.dim || 2);
  const nodes = [];
  for (const k of names) {
    const s = studentFn(ans[k], ['n']);
    if (s.message) return { ok: false, message: s.message };
    nodes.push(s.node);
  }
  const conv = nodes.map(seqConverges);
  if (conv.some((x) => x === null)) return { ok: false, message: t('Je n\'arrive pas à décider avec ton exemple : prends-en un plus simple.') };
  const all = conv.every(Boolean);
  switch (p.test) {
    case 'boundedNotConv': {
      const b = nodes.map(seqBounded);
      if (b.some((x) => x === null)) return { ok: false, message: t('Je n\'arrive pas à décider avec ton exemple : prends-en un plus simple.') };
      if (!b.every(Boolean)) return { ok: false, message: t('Ta suite n\'est pas bornée : une composante grandit sans limite.') };
      if (all) return { ok: false, message: t('Chaque composante converge : ta suite converge.') };
      return { ok: true };
    }
    case 'oneConv':
      if (!conv.some(Boolean)) return { ok: false, message: t('Aucune composante ne converge : ce n\'est pas l\'hypothèse.') };
      if (all) return { ok: false, message: t('Chaque composante converge : ta suite converge.') };
      return { ok: true };
    case 'normConv': {
      const normNode = tryParse(`√(${names.map((k) => `(${String(ans[k]).replace(/^\s*[a-z]_?\d?\s*=/, '')})^2`).join('+')})`, { vars: ['n'] });
      if (!normNode) return { ok: false, message: t('Je n\'arrive pas à lire ta saisie.') };
      const cn = seqConverges(normNode);
      if (cn === null) return { ok: false, message: t('Je n\'arrive pas à décider avec ton exemple : prends-en un plus simple.') };
      if (!cn) return { ok: false, message: t('La norme de ta suite ne converge pas.') };
      if (all) return { ok: false, message: t('Chaque composante converge : ta suite converge.') };
      return { ok: true };
    }
    default: return { ok: false, message: t('Contre-exemple non vérifiable.') };
  }
}

// ---------- curves ----------

function curveFns(p, ans) {
  const names = ['x', 'y', 'z'].slice(0, p.dim || 3);
  const out = [];
  for (const k of names) {
    const s = studentFn(ans[k], ['t']);
    if (s.message) return { message: s.message };
    let d;
    try { d = compileFloat(diff(s.node, 't')); } catch { return { message: t('Je n\'arrive pas à dériver ta courbe.') }; }
    out.push({ f: (t) => s.f({ t }), d: (t) => { try { return d({ t }); } catch { return NaN; } } });
  }
  return { comps: out };
}

function curveNotSmooth(p, ans) {
  const r = curveFns(p, ans);
  if (r.message) return { ok: false, message: r.message };
  const ts = Array.from({ length: 1201 }, (_, i) => -3 + i / 200);
  for (const tv of ts) {
    for (const c of r.comps) if (!Number.isFinite(c.f(tv)) || !Number.isFinite(c.d(tv))) return { ok: false, message: t('Ta courbe n\'est pas de classe C¹ : en t = {t}, elle (ou sa dérivée) n\'est pas définie.', { t: tv }) };
  }
  const zero = ts.find((tv) => r.comps.every((c) => Math.abs(c.d(tv)) < 1e-9));
  if (zero === undefined) return { ok: false, message: t('γ′(t) ne s\'annule pas (sur [−3 ; 3]) : ta courbe est lisse.') };
  return { ok: true };
}

function arcCurve(p, ans) {
  const r = curveFns(p, ans);
  if (r.message) return { ok: false, message: r.message };
  const a = numOf(p.a ?? 0);
  const b = numOf(p.b ?? 1);
  const speed = (t) => Math.sqrt(r.comps.reduce((s, c) => s + c.d(t) ** 2, 0));
  const L = quad(speed, a, b);
  if (!Number.isFinite(L)) return { ok: false, message: t('Je n\'arrive pas à calculer la longueur de ta courbe.') };
  if (p.test === 'sum') {
    const S = quad((tv) => r.comps.reduce((s, c) => s + c.d(tv), 0), a, b);
    if (Math.abs(L - S) <= 1e-6 * (1 + Math.abs(L))) return { ok: false, message: t('Pour ta courbe, les deux nombres sont égaux : ce n\'est pas un contre-exemple.') };
    return { ok: true };
  }
  if (p.test === 'square') {
    const S = quad((tv) => r.comps.reduce((s, c) => s + c.d(tv) ** 2, 0), a, b);
    if (Math.abs(L - S) <= 1e-6 * (1 + Math.abs(L))) return { ok: false, message: t('Pour ta courbe, les deux nombres sont égaux : ce n\'est pas un contre-exemple.') };
    return { ok: true };
  }
  const chord = Math.sqrt(r.comps.reduce((s, c) => s + (c.f(b) - c.f(a)) ** 2, 0));
  if (L - chord <= 1e-6 * (1 + L)) return { ok: false, message: t('Ta courbe est un segment parcouru une fois : sa longueur est bien ‖γ(b) − γ(a)‖.') };
  return { ok: true };
}

// ---------- functions on a set ----------

// Points of D: a base grid inside, and points that approach what D lacks
// (its missing boundary, the origin, infinity), k = 1 … 8.
function domainPoints(D) {
  const base = [];
  if (D.kind === 'interval') {
    const a = numOf(D.a);
    const b = numOf(D.b);
    for (let i = 0; i < 2000; i++) base.push({ x: a + ((b - a) * (i + 0.5)) / 2000 });
    const approach = (k) => [{ x: a + (b - a) * 10 ** -k }, { x: b - (b - a) * 10 ** -k }];
    return { base, approach, vars: ['x'] };
  }
  const r = D.r ?? 1;
  const angles = Array.from({ length: 24 }, (_, i) => (2 * Math.PI * i) / 24 + 0.01);
  const pt = (rho, th) => ({ x: rho * Math.cos(th), y: rho * Math.sin(th) });
  const inD = (e) => {
    const s = e.x * e.x + e.y * e.y;
    if (D.kind === 'openDisk') return s < r * r;
    if (D.kind === 'punct') return s > 0 && s <= r * r;
    if (D.kind === 'half') return e.y >= 0;
    return true;
  };
  for (let i = -20; i <= 20; i++) for (let j = -20; j <= 20; j++) { const e = { x: (i * (D.kind === 'R2' || D.kind === 'half' ? 5 : r)) / 20, y: (j * (D.kind === 'R2' || D.kind === 'half' ? 5 : r)) / 20 }; if (inD(e)) base.push(e); }
  const approach = (k) => {
    if (D.kind === 'openDisk') return angles.map((th) => pt(r * (1 - 10 ** -k), th));
    if (D.kind === 'punct') return angles.map((th) => pt(r * 10 ** -k, th));
    return angles.map((th) => pt(10 ** k, D.kind === 'half' ? th / 2 : th));
  };
  return { base, approach, vars: ['x', 'y'] };
}

function fnDomain(p, ans) {
  const D = p.domain;
  const P = domainPoints(D);
  const s = studentFn(ans.f, P.vars);
  if (s.message) return { ok: false, message: s.message };
  // noMin: the maximum of −f.
  const sg = p.test === 'noMin' ? -1 : 1;
  const val = (e) => sg * s.f(e);
  const baseV = P.base.map(val);
  const near = [1, 2, 3, 4, 5, 6, 7, 8].map((k) => P.approach(k).map(val));
  if (baseV.some((v) => !Number.isFinite(v)) || near.flat().some((v) => !Number.isFinite(v))) {
    return { ok: false, message: t('Ta fonction n\'est pas définie (donc pas continue) en certains points de D.') };
  }
  const maxAbs = (vs) => Math.max(...vs.map(Math.abs));
  const b0 = Math.max(maxAbs(baseV), ...near.slice(0, 2).map(maxAbs));
  const b4 = maxAbs(near[3]);
  const b8 = maxAbs(near[7]);
  const unbounded = b8 > 1e6 || (b8 >= 1.4 * b4 && b4 >= 1.4 * b0 && b8 > 10);
  switch (p.test) {
    case 'unbounded':
      if (!unbounded) return { ok: false, message: t('Ta fonction reste bornée sur D.') };
      return { ok: true };
    case 'bounded':
      if (unbounded || b8 > 2 * b0 + 1) return { ok: false, message: t('Ta fonction n\'est pas bornée sur D.') };
      return { ok: true };
    case 'noMax': case 'noMin': {
      const M0 = Math.max(...baseV, ...near.slice(0, 3).flat());
      const M8 = Math.max(...near[7]);
      if (!(M8 > M0 + 1e-7)) return { ok: false, message: p.test === 'noMin' ? t('Ta fonction atteint son minimum sur D (ou semble l\'atteindre).') : t('Ta fonction atteint son maximum sur D (ou semble l\'atteindre).') };
      return { ok: true };
    }
    default: return { ok: false, message: t('Contre-exemple non vérifiable.') };
  }
}

// f(ℝ²) not open: f reaches a global minimum or maximum (an interval with
// an end in it). Grid [−10 ; 10]², then rings up to radius 1000.
function imageNotOpen(p, ans) {
  const s = studentFn(ans.f, ['x', 'y']);
  if (s.message) return { ok: false, message: s.message };
  const grid = [];
  for (let i = -50; i <= 50; i++) for (let j = -50; j <= 50; j++) grid.push({ x: i / 5, y: j / 5 });
  const vs = grid.map((e) => s.f(e));
  if (vs.some((v) => !Number.isFinite(v))) return { ok: false, message: t('Ta fonction n\'est pas définie partout sur ℝ².') };
  const rings = [];
  for (const R of [20, 50, 100, 1000]) for (let i = 0; i < 72; i++) rings.push(s.f({ x: R * Math.cos((i * Math.PI) / 36 + 0.003), y: R * Math.sin((i * Math.PI) / 36 + 0.003) }));
  if (rings.some((v) => !Number.isFinite(v))) return { ok: false, message: t('Ta fonction n\'est pas définie partout sur ℝ².') };
  const m = Math.min(...vs);
  const M = Math.max(...vs);
  // The grid misses the exact extremum (sin x): a margin of 10⁻³ of the range.
  const tol = 1e-3 * (1e-6 + M - m);
  const inner = (v) => grid.some((e, i) => vs[i] === v && Math.abs(e.x) < 9.5 && Math.abs(e.y) < 9.5);
  const hasMin = inner(m) && rings.every((v) => v >= m - tol);
  const hasMax = inner(M) && rings.every((v) => v <= M + tol);
  if (!hasMin && !hasMax) return { ok: false, message: t('Ta fonction n\'atteint ni minimum ni maximum : son image est un intervalle ouvert.') };
  return { ok: true };
}

export const PROPS = {
  topoPoint: (p, ans) => {
    const S = p.set;
    const pt = readPoint(ans.p, S.dim);
    if (!pt) return { ok: false, message: t('Donne un point de {R}, comme {ex}.', { R: `ℝ${S.dim === 3 ? '³' : '²'}`, ex: S.dim === 3 ? '(1 ; 0 ; 2)' : '(1 ; 0)' }) };
    const k = pointKind(S, pt);
    if (p.want === 'out') {
      if (k === 'bdOut') return { ok: true };
      if (k === 'bdIn') return { ok: false, message: t('Ce point est bien sur le bord, mais il est dans E : il ne montre pas que E n\'est pas fermé. Cherche un point du bord qui manque.') };
      if (k === 'interior') return { ok: false, message: t('Ce point est intérieur à E.') };
      return { ok: false, message: t('Ce point n\'est pas sur le bord de E : une petite boule autour de lui ne touche pas E.') };
    }
    if (k === 'bdIn') return { ok: true };
    if (k === 'bdOut') return { ok: false, message: t('Ce point est sur le bord, mais il n\'est pas dans E : il montre que E n\'est pas fermé, pas qu\'il n\'est pas ouvert.') };
    if (k === 'interior') return { ok: false, message: t('Ce point est intérieur à E : une petite boule autour de lui reste dans E.') };
    return { ok: false, message: t('Ce point n\'est pas dans E.') };
  },
  bdReal,
  vecSeq,
  curveNotSmooth,
  arcCurve,
  fnDomain,
  imageNotOpen,
};

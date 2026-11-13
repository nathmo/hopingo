// Parametrised curves and surfaces (step U10, module V; judges `param` and
// `boundary`). Pure: reading a parametrisation, sampling it, and comparing
// two of them numerically (same set of points, same orientation, how many
// times it is run through).
//
// The line language:
//   [label =] (c₁ ; c₂ [; c₃]) [, bounds]      γ(t) = (2cos(t) ; 2sin(t)), t ∈ [0 ; π]
//   [label =] expression with i  (complex: a curve of ℂ)   γ(t) = (1 + i)t
//   bounds alone                                t ∈ [0 ; π]  ·  0 ≤ t ≤ π
//                                               (r ; φ) ∈ [0 ; 3] × [0 ; π]  ·  r ∈ [0 ; 3], φ ∈ [0 ; π]
// The label names the parameters in order: γ(t), σ(r, φ), σ(θ ; φ). The
// order of the parameters of a surface fixes its normal σ_u ∧ σ_v.
//
//   readParam(text, {params, complex}) → {label, params, comps: [node] | null, bounds: {p: [lo, hi]}, order}
//   compile(par) → (…values) → [x, y(, z)]
//   compareCurve(a, b) → {on, covers, orient: 1 | −1 | 0, tours}     a, b: {f, lo, hi, closed?}
//   compareSurface(a, b) → {on, covers, orient}                      a, b: {f, u: [lo, hi], v: [lo, hi]}

import { parse } from './parse.js';
import { compileFloat, evalFloat } from './numeric.js';
import { evalComplex } from './complex.js';
import { contains, symbolsIn } from './ast.js';
import { t as tr } from '../i18n.js';

export const PARAM_LETTERS = ['t', 's', 'u', 'v', 'θ', 'φ', 'r', 'x', 'y', 'ρ', 'ψ'];
const SUBDIG = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
export const normText = (t) => String(t).replace(/[−–]/g, '-').replace(/[₀-₉]/g, (c) => SUBDIG[c]).replace(/\s+/g, ' ').trim();

export function splitTop(text, seps) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if ('([{'.includes(c)) depth++;
    if (')]}'.includes(c)) depth--;
    const sep = depth === 0 ? seps.find((s) => text.startsWith(s, i)) : null;
    if (sep) { out.push(cur); cur = ''; i += sep.length - 1; continue; }
    cur += c;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

const isI = (n) => n.t === 'const' && n.name === 'i';

// Bounds: « t ∈ [a ; b] », « 0 ≤ t ≤ π », « (r ; φ) ∈ [0 ; 3] × [0 ; π] ».
function readBounds(text, letters) {
  const out = {};
  const order = [];
  const num = (s) => {
    const n = parse(s, { vars: [] });
    const x = evalFloat(n, {});
    if (!Number.isFinite(x)) throw new Error(tr('Je ne lis pas la borne « {s} ».', { s }));
    return x;
  };
  for (const piece of splitTop(text, [',', ' et ', ' pour '])) {
    if (!piece) continue;
    let m = /^\(?\s*([^()∈]+?)\s*\)?\s*∈\s*(.+)$/.exec(piece);
    if (m) {
      const names = m[1].split(/[;,]/).map((s) => s.trim());
      const ivs = splitTop(m[2], ['×']);
      if (names.length !== ivs.length) throw new Error(tr('Il faut un intervalle par paramètre.'));
      names.forEach((name, k) => {
        if (!letters.includes(name)) throw new Error(tr('« {name} » n\'est pas un paramètre.', { name }));
        const iv = /^[[\]]\s*(.+?)\s*;\s*(.+?)\s*[[\]]$/.exec(ivs[k]);
        if (!iv) throw new Error(tr('Écris l\'intervalle [a ; b], avec un point-virgule.'));
        out[name] = [num(iv[1]), num(iv[2])];
        order.push(name);
      });
      continue;
    }
    m = /^(.+?)\s*(?:≤|<=|<)\s*([^≤<]+?)\s*(?:≤|<=|<)\s*(.+)$/.exec(piece);
    if (m && letters.includes(m[2].trim())) {
      out[m[2].trim()] = [num(m[1]), num(m[3])];
      order.push(m[2].trim());
      continue;
    }
    throw new Error(tr('Je ne lis pas « {s} » : écris t ∈ [a ; b].', { s: piece }));
  }
  return { bounds: out, order };
}

// A label: γ(t), σ(r, φ), Γ₂, (x ; y), « σ(θ ; φ) ».
function readLabel(text) {
  const m = /^([A-Za-zα-ωΑ-Ω𝛾]+'?(?:_[A-Za-z0-9]+)?)\s*(?:\(([^()]*)\))?$/.exec(text.trim());
  if (!m) return null;
  const params = m[2] ? m[2].split(/[;,]/).map((s) => s.trim()).filter(Boolean) : [];
  return { name: m[1], params };
}

// text → {label, params, comps, complex, bounds, order}
export function readParam(text, { params = ['t'], complex = false } = {}) {
  const t = normText(text).replace(/^=\s*/, '');
  // The bounds after the parametrisation: at the first top-level « , »
  // (or « ; ») followed by bounds, or after « pour ».
  const pieces = splitTop(t, [', ', ',', ' pour ']);
  let head = pieces[0];
  let tail = pieces.slice(1).join(', ');
  // A head that is only bounds.
  const onlyBounds = /∈|≤|<=/.test(head) && !/=\s*\(/.test(head) && !/^[^=]*=[^=]/.test(head.replace(/[≤≥<>]=?/g, ''));
  if (onlyBounds) { tail = t; head = ''; }
  let label = null;
  let body = head;
  if (head) {
    const eq = splitTop(head, ['=']);
    if (eq.length > 2) throw new Error(tr('Une seule fois « = » : γ(t) = (… ; …).'));
    if (eq.length === 2) {
      label = readLabel(eq[0]);
      if (!label) throw new Error(tr('Je ne lis pas « {s} » : écris γ(t) = (… ; …).', { s: eq[0] }));
      body = eq[1];
    }
  }
  const names = label?.params?.length ? label.params : params;
  for (const n of names) if (!PARAM_LETTERS.includes(n)) throw new Error(tr('« {name} » n\'est pas un paramètre.', { name: n }));
  let comps = null;
  let isComplex = false;
  if (body) {
    const m = /^\((.*)\)$/.exec(body);
    const inner = m ? splitTop(m[1], [';']) : null;
    if (inner && inner.length >= 2) {
      comps = inner.map((c) => parse(c, { vars: names }));
    } else if (complex) {
      const n = parse(body, { vars: names, complex: true });
      comps = [n];
      isComplex = true;
    } else throw new Error(tr('Écris les composantes entre parenthèses, séparées par « ; ».'));
    for (const c of comps) {
      const bad = [...symbolsIn(c)].filter((s) => !names.includes(s));
      if (bad.length) throw new Error(tr('Je ne connais pas « {c} » ici : les paramètres sont {names}.', { c: bad[0], names: names.join(', ') }));
    }
  }
  const { bounds, order } = tail ? readBounds(tail, PARAM_LETTERS) : { bounds: {}, order: [] };
  return { label, params: label?.params?.length ? label.params : (comps ? names : order.length ? order : names), comps, complex: isComplex, bounds, order };
}

// (…values) → point as an array of numbers (a complex curve: [Re, Im]).
export function compile(par) {
  const names = par.params;
  if (par.complex) {
    const n = par.comps[0];
    const has = contains(n, isI);
    return (...xs) => {
      const env = Object.fromEntries(names.map((p, k) => [p, xs[k]]));
      if (!has) { const x = evalFloat(n, env); return [x, 0]; }
      const z = evalComplex(n, env);
      return z ? [z.re, z.im] : [NaN, NaN];
    };
  }
  const fs = par.comps.map((c) => compileFloat(c));
  const exact = par.comps.map((c) => (env) => evalFloat(c, env));
  return (...xs) => {
    const env = Object.fromEntries(names.map((p, k) => [p, xs[k]]));
    return fs.map((f, k) => { const y = f(env); return Number.isFinite(y) ? y : exact[k](env); });
  };
}

const dist = (p, q) => Math.hypot(...p.map((x, k) => x - q[k]));

// ---------- curves ----------

// The nearest point of curve c to p: {d, s} (s its parameter).
function nearestOnCurve(c, p, M = 1500) {
  let best = { d: Infinity, s: c.lo };
  for (let k = 0; k <= M; k++) {
    const s = c.lo + ((c.hi - c.lo) * k) / M;
    const d = dist(c.f(s), p);
    if (d < best.d) best = { d, s };
  }
  // Golden section around the best sample.
  let a = Math.max(c.lo, best.s - (c.hi - c.lo) / M);
  let b = Math.min(c.hi, best.s + (c.hi - c.lo) / M);
  const g = (Math.sqrt(5) - 1) / 2;
  for (let it = 0; it < 60; it++) {
    const x1 = b - g * (b - a);
    const x2 = a + g * (b - a);
    if (dist(c.f(x1), p) < dist(c.f(x2), p)) b = x2; else a = x1;
  }
  const s = (a + b) / 2;
  const d = dist(c.f(s), p);
  return d < best.d ? { d, s } : best;
}

function scaleOf(c) {
  const pts = Array.from({ length: 41 }, (_, k) => c.f(c.lo + ((c.hi - c.lo) * k) / 40));
  let s = 0;
  for (const p of pts) for (const q of pts) s = Math.max(s, dist(p, q));
  return s || 1;
}

// a: the student's curve, b: the reference. Both {f: (t) → point, lo, hi, closed}.
export function compareCurve(a, b, { n = 20, tol = 1e-5 } = {}) {
  const scale = scaleOf(b);
  const eps = tol * (1 + scale);
  const ts = Array.from({ length: n }, (_, k) => a.lo + ((a.hi - a.lo) * (k + 0.5)) / n);
  const near = ts.map((t) => nearestOnCurve(b, a.f(t)));
  const on = near.every((x) => x.d <= eps) && a.f(a.lo).every(Number.isFinite);
  const ss = Array.from({ length: n }, (_, k) => b.lo + ((b.hi - b.lo) * (k + 0.5)) / n);
  const covers = ss.every((s) => nearestOnCurve(a, b.f(s)).d <= eps)
    && (b.closed || [b.lo, b.hi].every((s) => nearestOnCurve(a, b.f(s)).d <= eps));
  // Orientation and tours: the reference parameters of the student's points,
  // unwrapped on a closed reference.
  let orient = 0;
  let tours = 0;
  if (on) {
    const P = b.hi - b.lo;
    const fine = Array.from({ length: 4 * n + 1 }, (_, k) => a.lo + ((a.hi - a.lo) * k) / (4 * n));
    const sv = fine.map((t) => nearestOnCurve(b, a.f(t)).s);
    let total = 0;
    let up = 0;
    let down = 0;
    for (let k = 1; k < sv.length; k++) {
      let d = sv[k] - sv[k - 1];
      if (b.closed) { while (d > P / 2) d -= P; while (d < -P / 2) d += P; }
      total += d;
      if (d > 1e-9 * P) up++; else if (d < -1e-9 * P) down++;
    }
    orient = up > 0 && down === 0 ? 1 : down > 0 && up === 0 ? -1 : 0;
    tours = Math.abs(total) / P;
  }
  return { on, covers, orient, tours };
}

// ---------- surfaces ----------

function nearestOnSurface(S, p, G = 40) {
  let best = { d: Infinity, u: S.u[0], v: S.v[0] };
  for (let i = 0; i <= G; i++) {
    for (let j = 0; j <= G; j++) {
      const u = S.u[0] + ((S.u[1] - S.u[0]) * i) / G;
      const v = S.v[0] + ((S.v[1] - S.v[0]) * j) / G;
      const d = dist(S.f(u, v), p);
      if (d < best.d) best = { d, u, v };
    }
  }
  // Pattern search around the best sample.
  let hu = (S.u[1] - S.u[0]) / G;
  let hv = (S.v[1] - S.v[0]) / G;
  const clampU = (x) => Math.min(S.u[1], Math.max(S.u[0], x));
  const clampV = (x) => Math.min(S.v[1], Math.max(S.v[0], x));
  for (let it = 0; it < 200 && (hu > 1e-12 || hv > 1e-12); it++) {
    let moved = false;
    for (const [du, dv] of [[hu, 0], [-hu, 0], [0, hv], [0, -hv], [hu, hv], [-hu, -hv], [hu, -hv], [-hu, hv]]) {
      const u = clampU(best.u + du);
      const v = clampV(best.v + dv);
      const d = dist(S.f(u, v), p);
      if (d < best.d) { best = { d, u, v }; moved = true; break; }
    }
    if (!moved) { hu /= 2; hv /= 2; }
  }
  return best;
}

function normalAt(S, u, v) {
  const h = 1e-5;
  const fu = S.f(u + h, v).map((x, k) => (x - S.f(u - h, v)[k]) / (2 * h));
  const fv = S.f(u, v + h).map((x, k) => (x - S.f(u, v - h)[k]) / (2 * h));
  return [fu[1] * fv[2] - fu[2] * fv[1], fu[2] * fv[0] - fu[0] * fv[2], fu[0] * fv[1] - fu[1] * fv[0]];
}

function surfScale(S) {
  const pts = [];
  for (let i = 0; i <= 8; i++) for (let j = 0; j <= 8; j++) pts.push(S.f(S.u[0] + ((S.u[1] - S.u[0]) * i) / 8, S.v[0] + ((S.v[1] - S.v[0]) * j) / 8));
  let s = 0;
  for (const p of pts) for (const q of pts) s = Math.max(s, dist(p, q));
  return s || 1;
}

// a: the student's surface, b: the reference; {f: (u, v) → [x, y, z], u, v}.
export function compareSurface(a, b, { tol = 1e-5 } = {}) {
  const scale = surfScale(b);
  const eps = tol * (1 + scale);
  const grid = (S) => {
    const out = [];
    for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) out.push([S.u[0] + ((S.u[1] - S.u[0]) * (i + 0.5)) / 5, S.v[0] + ((S.v[1] - S.v[0]) * (j + 0.5)) / 4]);
    return out;
  };
  const ga = grid(a);
  const near = ga.map(([u, v]) => nearestOnSurface(b, a.f(u, v)));
  const on = near.every((x) => x.d <= eps);
  const covers = grid(b).every(([u, v]) => nearestOnSurface(a, b.f(u, v)).d <= eps);
  let orient = 0;
  if (on) {
    let plus = 0;
    let minus = 0;
    ga.forEach(([u, v], k) => {
      const na = normalAt(a, u, v);
      const nb = normalAt(b, near[k].u, near[k].v);
      const d = na[0] * nb[0] + na[1] * nb[1] + na[2] * nb[2];
      const m = Math.hypot(...na) * Math.hypot(...nb);
      if (m < 1e-9) return;
      if (d > 1e-6 * m) plus++; else if (d < -1e-6 * m) minus++;
    });
    orient = plus > 0 && minus === 0 ? 1 : minus > 0 && plus === 0 ? -1 : 0;
  }
  return { on, covers, orient };
}

// Points of a parametrisation without bounds that lie on the reference
// carrier, sampled for the parameters in [−7 ; 7]: a γ line before its bounds.
export function someOnCurve(f, b, { tol = 1e-5 } = {}) {
  const eps = tol * (1 + scaleOf(b));
  let hits = 0;
  for (let k = 0; k <= 140; k++) {
    const p = f(-7 + k * 0.1 + 0.0137);
    if (!p.every(Number.isFinite)) continue;
    if (nearestOnCurve(b, p, 400).d <= eps * 10) hits++;
  }
  return hits >= 3;
}
export function someOnSurface(f, b, box, { tol = 1e-5 } = {}) {
  const eps = tol * (1 + surfScale(b));
  let hits = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const p = f(box.u[0] + ((box.u[1] - box.u[0]) * (i + 0.37)) / 6, box.v[0] + ((box.v[1] - box.v[0]) * (j + 0.41)) / 6);
      if (!p.every(Number.isFinite)) continue;
      if (nearestOnSurface(b, p, 20).d <= eps * 10) hits++;
    }
  }
  return hits >= 4;
}

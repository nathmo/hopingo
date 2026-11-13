// Curves of module V, part a (step U10): parametrised curves (segments,
// arcs of circles, graphs, ellipses, helices, the curve whose speed is a
// hidden perfect square), with exact components in t, cos t, sin t, and
// exact integrals over them (polynomials in t; trigonometric monomials
// cosᵐt·sinⁿt on [0 ; π/2], [0 ; π], [0 ; 2π], Wallis' formula). Values are
// r + p·π with r, p rational. Used by vecto-a-curves.js and vecto-a-pot2.js.

import { tokenize } from '../../cas/parse.js';
import { q, qt, fq } from './vecto-a-kit.js';
import { t } from '../../i18n.js';

// ---------- polynomials in t, C = cos t, S = sin t ----------

const PK = (k, m, n) => `${k},${m},${n}`;
const unkey = (key) => key.split(',').map(Number);
export const P = (entries = []) => {
  const out = new Map();
  for (const [k, c] of entries) { const v = (out.get(k) || q(0)).add(q(c)); if (v.n === 0) out.delete(k); else out.set(k, v); }
  return out;
};
export const pc = (c) => P([[PK(0, 0, 0), c]]);
export const pt = (c = 1, k = 1) => P([[PK(k, 0, 0), c]]);
export const pC = (c = 1) => P([[PK(0, 1, 0), c]]);
export const pS = (c = 1) => P([[PK(0, 0, 1), c]]);
export function padd(...ps) { return P(ps.flatMap((p) => [...p])); }
export const pscale = (p, c) => P([...p].map(([k, v]) => [k, v.mul(q(c))]));
export const pneg = (p) => pscale(p, -1);
export function pmul(a, b) {
  const out = [];
  for (const [ka, ca] of a) for (const [kb, cb] of b) {
    const x = unkey(ka);
    const y = unkey(kb);
    out.push([PK(x[0] + y[0], x[1] + y[1], x[2] + y[2]), ca.mul(cb)]);
  }
  return P(out);
}
export function ppow(p, n) { let r = pc(1); for (let i = 0; i < n; i++) r = pmul(r, p); return r; }
export const pzero = (p) => p.size === 0;
export const isConstP = (p) => [...p.keys()].every((k) => k === PK(0, 0, 0));
export const constOf = (p) => p.get(PK(0, 0, 0)) || q(0);

// A field component (terms of vecto-a-kit: {c, e: [a, b, c]}) at the point (X, Y, Z).
export function compose(terms, X, Y, Z = pc(0)) {
  let out = P();
  for (const tt of terms) out = padd(out, pscale(pmul(pmul(ppow(X, tt.e[0]), ppow(Y, tt.e[1])), ppow(Z, tt.e[2])), tt.c));
  return out;
}

// Text for the CAS: 3t^2-8sin(t)cos(t)^2+4 ('0' when empty).
export function ptext(p) {
  const keys = [...p.keys()].sort((a, b) => {
    const x = unkey(a);
    const y = unkey(b);
    return (y[0] - x[0]) || (y[2] - x[2]) || (y[1] - x[1]);
  });
  let out = '';
  for (const k of keys) {
    const c = p.get(k);
    const [kt, m, n] = unkey(k);
    const parts = [];
    if (kt) parts.push(kt === 1 ? 't' : `t^${kt}`);
    if (n) parts.push(n === 1 ? 'sin(t)' : `sin(t)^${n}`);
    if (m) parts.push(m === 1 ? 'cos(t)' : `cos(t)^${m}`);
    const body = parts.join('');
    const abs = c.n < 0 ? c.neg() : c;
    const sign = c.n < 0 ? '-' : out ? '+' : '';
    // (3/4)t² is written 3t^2/4.
    if (body && abs.d !== 1) { out += `${sign}${abs.n === 1 ? '' : abs.n}${body}/${abs.d}`; continue; }
    const coef = !body ? qt(abs) : abs.eq(1) ? '' : qt(abs);
    out += sign + coef + body;
  }
  return out || '0';
}

// ---------- exact integrals ----------

const df = (n) => { let r = 1; for (let k = n; k > 1; k -= 2) r *= k; return r; };
// ∫₀^{π/2} cosᵐ sinⁿ = (m − 1)!!(n − 1)!!/(m + n)!! (× π/2 when both are even).
function wallis(m, n) {
  const c = q(df(m - 1) * df(n - 1), df(m + n));
  return m % 2 === 0 && n % 2 === 0 ? { r: q(0), p: c.div(2) } : { r: c, p: q(0) };
}
export const V0 = { r: q(0), p: q(0) };
export const vadd = (a, b) => ({ r: a.r.add(b.r), p: a.p.add(b.p) });
export const vscale = (a, c) => ({ r: a.r.mul(q(c)), p: a.p.mul(q(c)) });
export const veq = (a, b) => a.r.eq(b.r) && a.p.eq(b.p);
export const vzero = (a) => a.r.n === 0 && a.p.n === 0;
export const vnum = (a) => a.r.valueOf() + a.p.valueOf() * Math.PI;

// ∫ₐᵇ p dt: a polynomial in t (a, b rational), or a trigonometric polynomial
// on range 'q' = [0 ; π/2], 'h' = [0 ; π], 'f' = [0 ; 2π]. null otherwise.
// part: 'all' | 'odd' (only the monomials with an odd power of sin t).
export function integrate(p, a, b, range = null, part = 'all') {
  let v = V0;
  for (const [key, c] of p) {
    const [k, m, n] = unkey(key);
    if (part === 'odd' && n % 2 === 0) continue;
    if (m === 0 && n === 0) {
      if (range) {
        const L = range === 'q' ? q(1, 2) : range === 'h' ? q(1) : q(2);
        if (k !== 0) return null;
        v = vadd(v, { r: q(0), p: c.mul(L) });
        continue;
      }
      const A = q(a);
      const B = q(b);
      let pb = q(1);
      let pa = q(1);
      for (let i = 0; i <= k; i++) { pb = pb.mul(B); pa = pa.mul(A); }
      v = vadd(v, { r: pb.sub(pa).div(k + 1).mul(c), p: q(0) });
      continue;
    }
    if (k !== 0 || !range) return null;
    const w = wallis(m, n);
    let f;
    if (range === 'q') f = w;
    else if (range === 'h') f = m % 2 ? V0 : vscale(w, 2);
    else f = m % 2 || n % 2 ? V0 : vscale(w, 4);
    v = vadd(v, vscale(f, c));
  }
  return v;
}

// r + p·π as CAS text: 13/15, 2π, -π/2, 16/3+2π.
export function vText(v) {
  const piT = (p) => {
    const a = p.n < 0 ? p.neg() : p;
    const s = p.n < 0 ? '-' : '';
    if (a.eq(1)) return `${s}π`;
    if (a.d === 1) return `${s}${a.n}π`;
    return `${s}${a.n === 1 ? '' : a.n}π/${a.d}`;
  };
  if (v.p.n === 0) return qt(v.r);
  if (v.r.n === 0) return piT(v.p);
  const pt2 = piT(v.p);
  return `${qt(v.r)}${pt2.startsWith('-') ? pt2 : `+${pt2}`}`;
}
export const vR = (v) => vText(v).replace(/-/g, '−');

// ---------- curves ----------

// k·π/2 as text: 0, π/2, π, 3π/2, 2π, -π/2.
export function quarterT(k) {
  if (k === 0) return '0';
  const s = k < 0 ? '-' : '';
  const a = Math.abs(k);
  if (a % 2 === 0) return `${s}${a / 2 === 1 ? '' : a / 2}π`;
  return `${s}${a === 1 ? '' : a}π/2`;
}
const ptR = (p) => `(${p.map(fq).join(' ; ')})`;
const tup = (texts) => `(${texts.join(' ; ')})`;
const lineOf = (comps, lo, hi, name = 'γ', v = 't') => `${name}(${v}) = ${tup(comps)}, ${v} ∈ [${lo} ; ${hi}]`;

function finish(c) {
  c.comps = c.P.map(ptext);
  c.dP = c.dP || c.P.map(pdiff);
  c.dT = c.dP.map(ptext);
  c.line = lineOf(c.comps, c.loT, c.hiT);
  c.pline = `γ(t) = ${tup(c.comps)}`;
  c.ref = tup(c.comps);
  c.judge = { kind: 'param', curve: { ref: c.ref, t: [c.loT, c.hiT], ...(c.closed ? { closed: true } : {}) } };
  return c;
}
// d/dt of a polynomial in t, C, S.
export function pdiff(p) {
  const out = [];
  for (const [key, c] of p) {
    const [k, m, n] = unkey(key);
    if (k) out.push([PK(k - 1, m, n), c.mul(k)]);
    if (m) out.push([PK(k, m - 1, n + 1), c.mul(-m)]);
    if (n) out.push([PK(k, m + 1, n - 1), c.mul(n)]);
  }
  return P(out);
}

// Segment from A to B: A + t(B − A), t ∈ [0 ; 1].
export function segment(A, B) {
  const D = B.map((b, i) => q(b).sub(q(A[i])));
  const n2 = D.reduce((s, x) => s.add(x.mul(x)), q(0));
  const r = Math.round(Math.sqrt(n2.valueOf()));
  const speed = r * r === n2.valueOf() ? String(r) : null;
  return finish({
    kind: 'segment', A, B, dim: A.length, lo: 0, hi: 1, loT: '0', hiT: '1',
    P: A.map((a, i) => padd(pc(a), pt(D[i]))), dP: D.map((x) => pc(x)), speed, speedQ: speed ? q(r) : null,
    desc: t('le segment de A{a} à B{b}', { a: ptR(A), b: ptR(B) }),
    rev: lineOf(B.map((b, i) => ptext(padd(pc(b), pt(D[i].neg())))), '0', '1'),
    bounds: lineOf(A.map((a, i) => ptext(padd(pc(a), pt(D[i])))), '0', '2'),
  });
}

// A segment on an axis, written with t itself: (t ; 0), t ∈ [a ; b] (b > a),
// or travelled downwards (0 ; −t), t ∈ [−a ; −b] (a > b).
export function axisSeg(axis, a, b) {
  const up = b > a;
  const v = up ? pt(1) : pt(-1);
  const lo = up ? a : -a;
  const hi = up ? b : -b;
  const Pc = axis === 'x' ? [v, pc(0)] : [pc(0), v];
  const A = axis === 'x' ? [q(a), q(0)] : [q(0), q(a)];
  const B = axis === 'x' ? [q(b), q(0)] : [q(0), q(b)];
  const r = up ? pt(-1) : pt(1);
  const Rc = axis === 'x' ? [r, pc(0)] : [pc(0), r];
  return finish({
    kind: 'segment', A, B, dim: 2, lo, hi, loT: qt(lo), hiT: qt(hi),
    P: Pc, speed: '1', speedQ: q(1),
    desc: t('le segment de A{a} à B{b}', { a: ptR(A), b: ptR(B) }),
    rev: lineOf(Rc.map(ptext), qt(-hi), qt(-lo)),
    bounds: lineOf(Pc.map(ptext), qt(lo), qt(hi + (hi - lo))),
  });
}

// Arc of the circle of centre c, radius R, from angle s·π/2 over span
// quarter turns, positive (sign 1) or negative (−1) orientation.
export function arc(c, R, s0, span, sign = 1) {
  const s = span === 4 ? 0 : s0; // a whole circle starts at angle 0
  const pts = (k) => [q(c[0]).add(q(R).mul(Math.round(Math.cos((k * Math.PI) / 2)))), q(c[1]).add(q(R).mul(Math.round(Math.sin((k * Math.PI) / 2))))];
  const lo = sign > 0 ? s : -s;
  const hi = lo + span;
  const X = (r) => padd(pc(c[0]), pC(r));
  const Y = (r, sg) => padd(pc(c[1]), pS(sg * r));
  const comps = (r, sg) => [ptext(X(r)), ptext(Y(r, sg))];
  const A = pts(s);
  const B = pts(s + sign * span);
  const full = span === 4;
  const sense = sign > 0 ? t('positif (trigonométrique)') : t('négatif (horaire)');
  const name = full ? t('le cercle') : span === 2 ? t('le demi-cercle') : t('le quart de cercle');
  const centre = c[0] === 0 && c[1] === 0 ? t('centré en l\'origine') : t('de centre {a}', { a: ptR(c) });
  const desc = full
    ? t('le cercle {centre} et de rayon {R}, parcouru une fois dans le sens {sense}', { centre, R, sense })
    : t('{name} {centre} et de rayon {R}, de A{a} à B{b} dans le sens {sense}', { name, centre, R, a: ptR(A), b: ptR(B), sense });
  const revLo = sign > 0 ? -(s + span) : s - span;
  return finish({
    kind: 'arc', c, R, s, span, sign, dim: 2, closed: full, A, B,
    lo: (lo * Math.PI) / 2, hi: (hi * Math.PI) / 2, loT: quarterT(lo), hiT: quarterT(hi),
    P: [X(R), Y(R, sign)], speed: String(R), speedQ: q(R),
    range: sign > 0 && s === 0 ? { 1: 'q', 2: 'h', 4: 'f' }[span] : null,
    desc,
    rev: lineOf(comps(R, -sign), quarterT(revLo), quarterT(revLo + span)),
    bounds: lineOf(comps(R, sign), quarterT(lo), quarterT(lo + (span === 4 ? 8 : span * 2))),
    radius2: R > 1 ? lineOf(comps(R * R, sign), quarterT(lo), quarterT(hi)) : null,
  });
}

// The graph y = xᵏ from x = a to x = b (b < a: travelled backwards).
export function graph(k, a, b) {
  const fwd = a < b;
  const X = fwd ? pt(1) : padd(pc(a + b), pt(-1));
  const lo = fwd ? a : b;
  const hi = fwd ? b : a;
  const pw = (x) => { let r = q(1); for (let i = 0; i < k; i++) r = r.mul(q(x)); return r; };
  const A = [q(a), pw(a)];
  const B = [q(b), pw(b)];
  const rX = fwd ? padd(pc(a + b), pt(-1)) : pt(1);
  return finish({
    kind: 'graph', k, dim: 2, lo, hi, loT: qt(lo), hiT: qt(hi), A, B,
    P: [X, ppow(X, k)], speed: null,
    desc: t('l\'arc de la courbe y = x{a} de A{b} à B{c}', { a: k === 2 ? '²' : '³', b: ptR(A), c: ptR(B) }),
    rev: lineOf([ptext(rX), ptext(ppow(rX, k))], qt(lo), qt(hi)),
    bounds: lineOf([ptext(X), ptext(ppow(X, k))], qt(lo), qt(hi + (hi - lo))),
  });
}

// The ellipse x²/a² + y²/b² = 1 (a ≠ b), positive orientation, span quarter turns from angle 0.
export function ellipse(a, b, span = 4) {
  const full = span === 4;
  const eqE = `${a === 1 ? 'x²' : `x²/${a * a}`} + ${b === 1 ? 'y²' : `y²/${b * b}`}`;
  const A = [q(a), q(0)];
  const B = [q(a * Math.round(Math.cos((span * Math.PI) / 2))), q(b * Math.round(Math.sin((span * Math.PI) / 2)))];
  return finish({
    kind: 'ellipse', a, b, span, dim: 2, closed: full, lo: 0, hi: (span * Math.PI) / 2, loT: '0', hiT: quarterT(span), A, B,
    P: [pC(a), pS(b)], speed: null,
    desc: full ? t('l\'ellipse {eqE} = 1, parcourue une fois dans le sens positif', { eqE }) : t('l\'arc de l\'ellipse {eqE} = 1 de A{a} à B{b} dans le sens positif', { eqE, a: ptR(A), b: ptR(B) }),
    rev: lineOf([ptext(pC(a)), ptext(pS(-b))], quarterT(-span), '0'),
    bounds: lineOf([ptext(pC(a)), ptext(pS(b))], '0', quarterT(full ? 8 : span * 2)),
  });
}

// The helix (cos t ; sin t ; k·t), t ∈ [0 ; 2π].
export function helix(k) {
  const s2 = 1 + k * k;
  return finish({
    kind: 'helix', k, dim: 3, lo: 0, hi: 2 * Math.PI, loT: '0', hiT: '2π',
    P: [pC(1), pS(1), pt(k)], speed: `sqrt(${s2})`, speedQ: null,
    desc: t('l\'hélice tracée sur le cylindre x² + y² = 1, qui monte de {a}π par tour : un tour de A(1 ; 0 ; 0) à B(1 ; 0 ; {a}π), dans le sens positif autour de l\'axe z, à vitesse de montée constante', { a: 2 * k }),
    rev: lineOf(['cos(t)', '-sin(t)', `${k === 1 ? '' : k}(2π-t)`], '0', '2π'),
    bounds: lineOf(['cos(t)', 'sin(t)', `${k === 1 ? '' : k}t`], '0', '4π'),
  });
}

// The curve of the 2021 exam: γ′ = (t² ; c ; √(2c)·t), |γ′| = t² + c (c = 1/2, 2, 8).
export function squareCurve(c, lo, hi) {
  const s = Math.sqrt(2 * c);
  const comps = [pt(q(1, 3), 3), pt(c), pt(q(s).div(2), 2)];
  const out = finish({
    kind: 'square', c, dim: 3, lo, hi, loT: qt(lo), hiT: qt(hi),
    P: comps, speed: ptext(padd(pt(1, 2), pc(c))), speedP: padd(pt(1, 2), pc(c)),
    desc: '',
  });
  return out;
}

// ---------- guided blanks of a parametrisation line ----------

// Token ranges: the given substrings of the components, then (bounds) the
// two bounds of « t ∈ [a ; b] ».
export function paramBlanks(math, parts = [], bounds = false) {
  const toks = tokenize(math, {});
  const starts = [];
  let compact = '';
  for (const tt of toks) { starts.push(compact.length); compact += tt.s; }
  const out = [];
  const eqAt = compact.indexOf('=');
  const inAt = compact.indexOf('∈');
  let from = eqAt + 1;
  for (const p0 of parts) {
    const p = typeof p0 === 'string' ? p0 : p0.s;
    let pc2;
    try { pc2 = tokenize(p, {}).map((tt) => tt.s).join(''); } catch { continue; }
    let at = typeof p0 === 'object' && p0.last ? compact.lastIndexOf(pc2) : compact.indexOf(pc2, from);
    // {s, last, skip}: the first `skip` characters (an operator) stay shown.
    if (at >= 0 && p0.skip) { at += p0.skip; pc2 = pc2.slice(p0.skip); }
    if (at < 0 || !pc2 || (inAt >= 0 && at > inAt) || at < from) continue;
    const i = starts.indexOf(at);
    if (i < 0) continue;
    let j = i;
    while (j < toks.length && starts[j] < at + pc2.length) j++;
    if (j < toks.length && starts[j] !== at + pc2.length) continue;
    out.push([i, j]);
    from = at + pc2.length;
  }
  if (bounds && inAt >= 0) {
    const iIn = starts.indexOf(inAt);
    const open = toks.findIndex((tt, k) => k > iIn && tt.s === '[');
    const semi = toks.findIndex((tt, k) => k > open && tt.s === ';');
    const close = toks.findIndex((tt, k) => k > semi && tt.s === ']');
    if (open > 0 && semi > open + 1 && close > semi + 1) { out.push([open + 1, semi]); out.push([semi + 1, close]); }
  }
  out.sort((a, b) => a[0] - b[0]);
  return out.length ? { math, blanks: out } : { math };
}

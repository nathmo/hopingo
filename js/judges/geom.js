// Judge `geom` (spec §5.2, §16.2; step U5): lines of the plane and of space,
// planes, circles, spheres, and unions of two lines (bisectors, tangents
// from a point). A line is right if it describes the same set of points as
// the reference object (cfg.ref), or as the previous line without ref:
// equations proportional, parametric and cartesian forms of the same line.
// Lines are read by js/cas/geomobj.js.
//
// cfg: {kind: 'geom', object: 'line2' | 'line3' | 'plane' | 'circle' | 'sphere',
//       ref?: text, count?: 2, form?: 'cartesian' | 'explicit' | 'param' | 'reduced' | 'any',
//       symbols?: {A: '(1 ; 2)'} (names allowed in a parametric line)}
// Final form (default by object): line2, plane: cartesian with whole coprime
// coefficients (ax + by + c = 0, or written x = −3); line3: two such
// equations, or a parametric form; circle, sphere: reduced form
// (x − h)² + (y − k)² = r²; count 2: the two objects, each in final form,
// joined by « ou ». A union is compared as the product of its parts.
// Traps (judges: ['geom']) receive prev and ctx.cfg; candidate lines are
// gline(cfg, text).

import { readObject, sameObject, affineDim, normGeomText } from '../cas/geomobj.js';
import { splitTop, parseVec, astML } from '../cas/vecexpr.js';
import { parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { toRatFun } from '../cas/normal.js';
import { stripParen, unparen, mapNode } from '../cas/ast.js';
import { diagnoseLine } from './diagnose.js';

export const sign = '⇔';

export const dimOf = (cfg) => (['line3', 'plane', 'sphere'].includes(cfg.object) ? 3 : 2);
const gopts = (cfg) => ({ dim: dimOf(cfg), symbols: cfg.symbols });

const REF = new WeakMap();
export function reference(cfg) {
  if (!cfg.ref) return null;
  if (!REF.has(cfg)) REF.set(cfg, readObject(String(cfg.ref), gopts(cfg)));
  return REF.get(cfg);
}

function readStrict(cfg, text) {
  const obj = readObject(String(text), gopts(cfg));
  return { t: 'gline', text: String(text).trim(), obj };
}

export function parseLine(cfg, text) {
  if (text && typeof text === 'object') return text;
  try { return readStrict(cfg, text); } catch { return { t: 'gline', text: String(text).trim(), obj: null, label: String(text).trim() }; }
}
export const gline = (cfg, text) => readStrict(cfg, text);
export const text = (cfg, node) => node.text;
export const start = (cfg) => cfg.start;

// ---------- display ----------

const ML = (n, bl) => toMathML(unparen(n), { blanks: bl || {} }).replace(/^<math[^>]*>/, '').replace(/<\/math>$/, '');
const COORD = { 2: '(x ; y)', 3: '(x ; y ; z)' };
// A side read by the CAS, its blanks numbered after those already met.
export function sideML(text, counter, bl, vars = ['x', 'y', 'z', 't', 's', 'k', 'λ', 'X', 'Y']) {
  try {
    const n = parse(text.trim(), { vars });
    const shifted = mapNode(n, (x) => (x.t === 'blank' ? { ...x, id: x.id + counter.n } : x));
    let k = 0;
    mapNode(n, (x) => { if (x.t === 'blank') k++; return x; });
    counter.n += k;
    return ML(shifted, bl);
  } catch { return `<mtext>${text}</mtext>`; }
}
function itemML(it, dim, counter, bl) {
  const m = /^\(\s*x\s*;[^)]*\)\s*=(.*)$/.exec(it);
  if (m) {
    const coords = COORD[dim].slice(1, -1).split(';').map((s) => `<mi>${s.trim()}</mi>`).join('<mo>;</mo>');
    let rhs;
    try { rhs = astML(parseVec(m[1], { params: ['t', 's', 'k', 'λ', 'μ'], _blanks: counter }), bl); } catch { rhs = `<mtext>${m[1]}</mtext>`; }
    return `<mrow><mo>(</mo>${coords}<mo>)</mo></mrow><mo>=</mo>${rhs}`;
  }
  return splitTop(it, '=').map((s) => sideML(s, counter, bl)).join('<mo>=</mo>');
}
export function geomML(t, dim = 2, bl = {}, counter = { n: 0 }) {
  const n = normGeomText(t);
  const label = /^([A-Za-zΩγΓπαβδ](?:_\d+|')?)\s*:\s*(.*)$/.exec(n);
  const body = label ? label[2] : n;
  const ors = splitTop(body, '∨').map((p) => splitTop(p, '∧;').map((it) => itemML(it.trim(), dim, counter, bl)).join('<mspace width="0.6em"/><mtext>et</mtext><mspace width="0.6em"/>'));
  const head = label ? `<mi>${label[1].replace(/_(\d)/, '')}</mi><mo>:</mo>` : '';
  return head + ors.join('<mspace width="0.6em"/><mtext>ou</mtext><mspace width="0.6em"/>');
}
export const templateML = (cfg, tpl, blanks = {}) => `<math><mrow>${geomML(tpl, dimOf(cfg), blanks)}</mrow></math>`;
export function show(cfg, node, { display } = {}) {
  const inner = node.obj ? geomML(node.text, dimOf(cfg)) : `<mi>${node.text}</mi>`;
  return `<math${display ? ' display="block"' : ''} alttext="${node.text.replace(/"/g, '&quot;')}"><mrow>${inner}</mrow></math>`;
}

// ---------- final forms ----------

// A sum of terms a, x, a·x (a a number), as written: 2x − 3y − 8, each
// monomial once (not 2 + 6).
function termsOf(n, out = []) {
  n = stripParen(n);
  if (n.t === 'bin' && (n.op === '+' || n.op === '-')) { termsOf(n.l, out); termsOf(n.r, out); return out; }
  if (n.t === 'add') { n.terms.forEach((x) => termsOf(x, out)); return out; }
  out.push(n);
  return out;
}
const isNumNode = (n) => { n = stripParen(n); if (n.t === 'neg') n = stripParen(n.e); return n.t === 'num' || (n.t === 'frac' && stripParen(n.n).t === 'num' && stripParen(n.d).t === 'num'); };
function monoOf(n) {
  n = stripParen(n);
  if (n.t === 'neg') return monoOf(n.e);
  if (isNumNode(n)) return '1';
  if (n.t === 'sym') return n.name;
  if (n.t === 'frac' && isNumNode(n.d)) return monoOf(n.n);
  if (n.t === 'bin' && n.op === '×' && isNumNode(n.l)) { const m = monoOf(n.r); return m === '1' ? null : m; }
  return null;
}
function flatLinear(n) {
  const ms = termsOf(n).map(monoOf);
  return ms.every((m) => m !== null) && new Set(ms).size === ms.length;
}
// Whole coprime coefficients of L − R (exact), or a message, or false.
function wholeCoprime(l, r) {
  let rf;
  try { rf = toRatFun({ t: 'bin', op: '-', l, r }).rf; } catch { return false; }
  if (!rf.d.isConst) return false;
  const cs = [...rf.n.terms.values()].map((x) => x.c.div(rf.d.constValue()));
  if (cs.some((c) => c.d !== 1)) return 'Écris-la avec des coefficients entiers.';
  const g = cs.reduce((acc, c) => gcd(acc, Math.abs(c.n)), 0);
  if (g > 1) return `Simplifie : tous les coefficients sont divisibles par ${g}.`;
  return true;
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

// (x − h)² (or x²), possibly divided by a number.
function squareOf(n, coords) {
  n = stripParen(n);
  if (n.t === 'frac' || (n.t === 'bin' && n.op === '÷')) return squareOf(n.n ?? n.l, coords) && stripParen(n.d ?? n.r).t === 'num';
  if (n.t === 'bin' && n.op === '×' && stripParen(n.l).t === 'num') return squareOf(n.r, coords);
  if (n.t !== 'pow' || stripParen(n.e).t !== 'num' || stripParen(n.e).v.valueOf() !== 2) return false;
  const b = stripParen(n.b);
  if (b.t === 'sym') return coords.includes(b.name);
  if (b.t === 'bin' && (b.op === '+' || b.op === '-')) {
    const l = stripParen(b.l);
    const r = stripParen(b.r);
    return l.t === 'sym' && coords.includes(l.name) && (r.t === 'num' || (r.t === 'frac' && stripParen(r.n).t === 'num'));
  }
  return false;
}
function sumOfSquares(n, coords) {
  n = stripParen(n);
  if (n.t === 'bin' && n.op === '+') return sumOfSquares(n.l, coords) && squareOf(n.r, coords);
  return squareOf(n, coords);
}
const isNumber = (n) => { n = stripParen(n); return n.t === 'num' || (n.t === 'frac' && stripParen(n.n).t === 'num' && stripParen(n.d).t === 'num') || (n.t === 'pow' && stripParen(n.b).t === 'num'); };

// The equations of a part, as written (from geomobj's eqs).
function partFinal(cfg, part, form) {
  const dim = dimOf(cfg);
  const coords = ['x', 'y', 'z'].slice(0, dim);
  if (part.shape === 'param') return form === 'param' || form === 'any' || cfg.object === 'line3' ? true : 'Juste. Donne maintenant une équation cartésienne.';
  if (form === 'param') return 'Juste. Donne maintenant une paramétrisation.';
  const eqs = part.eqs || [];
  if (cfg.object === 'circle' || cfg.object === 'sphere') {
    if (form === 'any') return true;
    if (eqs.length !== 1) return false;
    const { l, r } = eqs[0];
    if (sumOfSquares(l, coords) && isNumber(r)) return true;
    return false;
  }
  if (form === 'explicit') {
    if (eqs.length !== 1) return false;
    const l = stripParen(eqs[0].l);
    return l.t === 'sym' && l.name === 'y' && flatLinear(eqs[0].r) ? true : false;
  }
  if (part.shape === 'chain') return cfg.object === 'line3' ? 'Juste. Écris-la comme deux équations séparées par « ; ».' : false;
  const want = cfg.object === 'line3' ? 2 : 1;
  if (eqs.length !== want) return false;
  for (const { l, r } of eqs) {
    if (!flatLinear(l) || !flatLinear(r)) return false;
    const w = wholeCoprime(l, r);
    if (w !== true) return w;
  }
  if (form === 'any') return true;
  return true;
}

export function isFinal(cfg, node) {
  const o = node.obj;
  if (!o) return false;
  const form = cfg.form ?? (cfg.object === 'line3' ? 'any' : cfg.object === 'circle' || cfg.object === 'sphere' ? 'reduced' : 'cartesian');
  if (cfg.count === 2) {
    if (o.shape !== 'union') return false;
    for (const p of o.parts) {
      const f = partFinal(cfg, p, form);
      if (f !== true) return f;
    }
    return true;
  }
  if (o.shape === 'union') return false;
  return partFinal(cfg, o, form);
}

// ---------- judging ----------

function wrongMessage(cfg, want, got) {
  if (got.kind === 'empty') return 'Ton équation n\'a aucune solution.';
  if (cfg.count === 2 && got.shape !== 'union' && got.kind === 'affine') return 'Il y a deux objets : il en manque un.';
  if (want.kind === 'affine' && got.kind === 'affine') {
    const dw = affineDim(want);
    const dg = affineDim(got);
    if (dw !== dg) {
      const name = (d) => (d === 0 ? 'un point' : d === 1 ? 'une droite' : 'un plan');
      return `Ta ligne décrit ${name(dg)}, on cherche ${name(dw)}.`;
    }
    if (want.rows.length === 1 && want.rows[0].slice(0, -1).every((x, i) => x.eq(got.rows[0][i]))) return 'Bonne direction, mais ta droite (ou ton plan) ne passe pas par le bon point : vérifie la constante.';
  }
  return 'Ce n\'est pas le bon objet.';
}

export function judgeLine(cfg, prev, input) {
  let node;
  if (input && typeof input === 'object') node = input;
  else {
    try { node = readStrict(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  const want = reference(cfg) ?? prev?.obj;
  if (!want) return { kind: 'form', node, message: 'Je ne sais pas à quoi comparer ta ligne.' };
  if (prev?.text && node.text === prev.text) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  if (!sameObject(want, node.obj)) {
    const diag = diagnoseLine('geom', prev, node, cfg, (c, n) => sameObject(c.obj ?? c, n.obj));
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: wrongMessage(cfg, want, node.obj) };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: fin };
  return { kind: 'ok', node };
}

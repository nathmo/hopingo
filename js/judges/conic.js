// Judge `conic` (spec §5.2, §16.2; step U5): one conic, given by cfg.equation
// (in x, y). Two kinds of lines:
//   - an equation: in x, y, it must be proportional to the conic's
//     (completing the squares, dividing); in X, Y, it is the conic in a
//     reduced frame: the frame of cfg.frame, or one of the frames of its
//     axes (centre or vertex, eigenvectors in either order and sign);
//   - elements: « Ω = (2 ; −3) », « F = (2 + √5 ; −3) », « a = 3 », « e = √5/3 »,
//     « asymptote : 3x − 4y − 11 = 0 », « directrices : x = … ou x = … »,
//     « axe : x − 2y − 3 = 0 », « u₁ = (2 ; 1)/√5 », several on one line
//     separated by « ; ». Each is compared to the element computed from the
//     equation (js/cas/conic.js); the two foci (or vertices) in any order.
// cfg: {kind: 'conic', equation, ask?: ['Ω', 'a', 'b', 'F', 'e', 'S', 'asymptotes',
//       'directrices', 'directrice', 'axe', 'p', 'r', 'c'], target?: 'standard' |
//       'reduced' | 'none', frame?: {O, u1, u2} (texts)}
// Final: all the elements of `ask` given (state.given), or, without ask, an
// equation in the form of `target`: 'standard' ((x − 2)²/9 + (y + 3)²/4 = 1,
// (x − 3)² = 8(y + 1)), 'reduced' (in X, Y: no XY term, and no X, Y term
// for a centred conic: 3X² − 2Y² − 6 = 0, X²/2 − Y²/3 = 1, X² = 8Y).
// Traps (judges: ['conic']) receive prev and ctx.cfg (ctx.cfg._an: the
// analysis); candidate lines are cline(cfg, text).

import { analyzeConic, coefsOfText, conicIn, candidateFrames, samePoint, sameNum, sameLine, normLine } from '../cas/conic.js';
import { readObject, proportional, normGeomText } from '../cas/geomobj.js';
import { parseVec, evalVec, splitTop, astML, floats, labelML } from '../cas/vecexpr.js';
import { parse } from '../cas/parse.js';
import { evalFloat } from '../cas/numeric.js';
import { exactForm } from '../cas/exactform.js';
import { stripParen } from '../cas/ast.js';
import { geomML, sideML } from './geom.js';
import { toMathML } from '../cas/mathml.js';
import { diagnoseLine } from './diagnose.js';

export const sign = '⇔';

// The tokenizer of guided lines spells « : » as « ÷ » (fillBlanks, templateOf):
// « axe ÷ x = 3 » is « axe : x = 3 ».
const colon = (t) => t.replace(/(^|;)\s*(asymptotes?|directrices?|axe)\s*÷/g, '$1$2 :');

const AN = new WeakMap();
export function analysis(cfg) {
  if (!AN.has(cfg)) {
    const coefs = coefsOfText(String(cfg.equation));
    const an = analyzeConic(coefs);
    if (cfg.frame) {
      const v = (t) => floats(evalVec(parseVec(String(t), {}), {}, {}));
      an.given = { O: v(cfg.frame.O), u1: v(cfg.frame.u1), u2: v(cfg.frame.u2) };
    }
    AN.set(cfg, an);
  }
  return AN.get(cfg);
}

// ---------- reading ----------

const ELEMENT = /^(Ω|O|C|centre|F'*|F_\d|S'*|S_\d|a|b|c|e|p|r|asymptotes?|directrices?|axe|u_1|u_2)\s*[:=]\s*([\s\S]+)$/;
const KIND = (name) => {
  if (['Ω', 'O', 'C', 'centre'].includes(name)) return 'Ω';
  if (/^F/.test(name)) return 'F';
  if (/^S/.test(name)) return 'S';
  if (/^asymptote/.test(name)) return 'asymptotes';
  if (/^directrice/.test(name)) return 'directrices';
  if (/^u_/.test(name)) return name;
  return name;
};
const POINTS = new Set(['Ω', 'F', 'S', 'u_1', 'u_2']);
const LINES = new Set(['asymptotes', 'directrices', 'axe']);

function readElement(name, body) {
  const kind = KIND(name);
  if (POINTS.has(kind)) {
    const ast = parseVec(body, {});
    const v = evalVec(ast, {}, {});
    if (v.k !== 'v' || v.items.length !== 2) throw new Error(`${name} est un point (ou un vecteur) du plan : écris (x ; y).`);
    return { name, kind, ast, nodes: v.items, value: floats(v) };
  }
  if (LINES.has(kind)) {
    const o = readObject(body, { dim: 2 });
    const parts = o.shape === 'union' ? o.parts : [o];
    const lines = parts.map((p) => {
      // A line with irrational coefficients (x = 2 + 9√5/5) is read numerically.
      if (p.kind === 'poly' && p.coefs.slice(0, 3).every((c) => Math.abs(c) < 1e-12) && Math.hypot(p.coefs[3], p.coefs[4]) > 1e-12) return normLine(p.coefs.slice(3));
      if (p.kind !== 'affine' || p.rows.length !== 1) throw new Error('Écris une droite : ax + by + c = 0.');
      const r = p.rows[0].map((q) => q.valueOf());
      return normLine(r);
    });
    return { name, kind, body, lines };
  }
  const node = parse(body, {});
  const x = evalFloat(node, {});
  if (!Number.isFinite(x)) throw new Error(`Je n'arrive pas à calculer ${name}.`);
  return { name, kind, node, value: x };
}

function readStrict(cfg, text) {
  const t = colon(normGeomText(text)).replace(/^=\s*/, '');
  const items = splitTop(t, ';').map((s) => s.trim()).filter(Boolean);
  const els = items.map((it) => ELEMENT.exec(it));
  if (els.every(Boolean)) {
    return { t: 'cline', text: String(text).trim(), elements: els.map((m) => readElement(m[1], m[2])) };
  }
  if (els.some(Boolean) && items.length > 1) throw new Error('Une ligne donne soit des éléments (Ω = …, a = …), soit une équation.');
  // An equation in x, y or in X, Y.
  const reduced = /[XY]/.test(t);
  if (reduced && /[xy]/.test(t)) throw new Error('Écris l\'équation en x et y, ou en X et Y, pas les deux.');
  const coefs = coefsOfText(t, reduced ? ['X', 'Y'] : ['x', 'y']);
  if (!coefs) throw new Error('Écris une équation du 2e degré en x et y.');
  const body = reduced ? t.replace(/X/g, 'x').replace(/Y/g, 'y') : t;
  const sides = splitTop(body, '=');
  return { t: 'cline', text: String(text).trim(), eq: { coefs, reduced, sides: sides.map((s) => parse(s, { vars: ['x', 'y'] })) } };
}

export function parseLine(cfg, text) {
  if (text && typeof text === 'object') return text;
  try { return readStrict(cfg, text); } catch { return { t: 'cline', text: String(text).trim(), label: String(text).trim() }; }
}
export const cline = (cfg, text) => readStrict(cfg, text);
export const text = (cfg, node) => node.text;
export const start = (cfg) => cfg.start;

// ---------- display ----------

function elementML(el) {
  const name = labelML(el.name);
  if (el.ast) return `${name}<mo>=</mo>${astML(el.ast)}`;
  if (el.lines) return `${name}<mo>:</mo>${geomML(el.body, 2)}`;
  return `${name}<mo>=</mo>${toML(el.node.t === 'paren' ? el.node.e : el.node)}`;
}
const toML = (n) => toMathML(n).replace(/^<math[^>]*>/, '').replace(/<\/math>$/, '');

// A line (or a guided template with blanks □) as MathML, as written.
function lineML(t, bl = {}) {
  const counter = { n: 0 };
  const items = splitTop(colon(normGeomText(t)), ';').map((s) => s.trim()).filter(Boolean);
  const els = items.map((it) => ELEMENT.exec(it));
  if (els.every(Boolean)) {
    return els.map((m) => {
      const kind = KIND(m[1]);
      const name = labelML(m[1]);
      if (POINTS.has(kind)) {
        try { return `${name}<mo>=</mo>${astML(parseVec(m[2], { _blanks: counter }), bl)}`; } catch { return `${name}<mo>=</mo><mtext>${m[2]}</mtext>`; }
      }
      if (LINES.has(kind)) return `${name}<mo>:</mo>${geomML(m[2], 2, bl, counter)}`;
      return `${name}<mo>=</mo>${sideML(m[2], counter, bl)}`;
    }).join('<mspace width="0.8em"/><mo>;</mo><mspace width="0.4em"/>');
  }
  return splitTop(normGeomText(t), '=').map((s) => sideML(s, counter, bl)).join('<mo>=</mo>');
}

export function show(cfg, node, { display } = {}) {
  const inner = node.elements || node.eq ? lineML(node.text) : `<mi>${node.text}</mi>`;
  return `<math${display ? ' display="block"' : ''} alttext="${node.text.replace(/"/g, '&quot;')}"><mrow>${inner}</mrow></math>`;
}
export const templateML = (cfg, tpl, blanks = {}) => `<math><mrow>${lineML(tpl, blanks)}</mrow></math>`;

// ---------- comparing ----------

function frames(cfg) {
  const an = analysis(cfg);
  const out = candidateFrames(an);
  if (an.given) out.unshift(an.given);
  return out;
}

// An equation of the conic (x, y), or of the conic in a reduced frame (X, Y).
function sameEquation(cfg, eq) {
  const an = analysis(cfg);
  if (!eq.reduced) return proportional(an.coefs, eq.coefs);
  return frames(cfg).some((f) => proportional(conicIn(an.coefs, f), eq.coefs));
}

// One element against the analysis: → {ok, hits: {F: [i]…}} or {ok: false, message}.
function checkElement(cfg, el) {
  const an = analysis(cfg);
  const pick = (list, v) => list.findIndex((P) => samePoint(P, v));
  switch (el.kind) {
    case 'Ω': {
      const C = an.center ?? an.vertex;
      if (!C || an.type === 'parabola') return { ok: false, message: 'Une parabole n\'a pas de centre.' };
      return samePoint(C, el.value) ? { ok: true } : { ok: false, message: 'Ce n\'est pas le centre.' };
    }
    case 'F': { const i = pick(an.foci, el.value); return i >= 0 ? { ok: true, hit: ['F', i] } : { ok: false, message: 'Ce n\'est pas un foyer.' }; }
    case 'S': { const i = pick(an.allVertices, el.value); return i >= 0 ? { ok: true, hit: ['S', i] } : { ok: false, message: 'Ce n\'est pas un sommet.' }; }
    case 'u_1': case 'u_2': {
      const unit = Math.abs(Math.hypot(...el.value) - 1) < 1e-7;
      const eig = an.vecs.some((u) => Math.abs(Math.abs(u[0] * el.value[0] + u[1] * el.value[1]) - Math.hypot(...el.value)) < 1e-7);
      if (!eig) return { ok: false, message: 'Ce n\'est pas un vecteur propre de A.' };
      if (!unit) return { ok: false, message: 'Ce vecteur n\'est pas normé : divise-le par sa norme.', rule: 'g10_eigvec_not_normed' };
      return { ok: true };
    }
    case 'asymptotes': case 'directrices': {
      const list = an[el.kind];
      const idx = el.lines.map((L) => list.findIndex((M) => sameLine(L, M)));
      if (!list.length) return { ok: false, message: el.kind === 'asymptotes' ? 'Cette conique n\'a pas d\'asymptote.' : 'Cette conique n\'a pas de directrice.' };
      return idx.every((i) => i >= 0) ? { ok: true, hit: [el.kind, ...idx] } : { ok: false, message: el.kind === 'asymptotes' ? 'Ce n\'est pas une asymptote.' : 'Ce n\'est pas une directrice.' };
    }
    case 'axe': {
      const ok = el.lines.every((L) => (an.axis && sameLine(L, an.axis)) || (an.minorAxis && sameLine(L, an.minorAxis)));
      return ok ? { ok: true } : { ok: false, message: 'Ce n\'est pas un axe de la conique.' };
    }
    default: {
      const want = an[el.kind];
      if (want === undefined) return { ok: false, message: `Cette conique n'a pas de ${el.kind}.` };
      return sameNum(want, el.value) ? { ok: true } : { ok: false, message: `${el.name} n'a pas la bonne valeur.` };
    }
  }
}

// The elements still to give.
function missing(cfg, given) {
  const an = analysis(cfg);
  const has = (k, i) => (given[k] || []).includes(i);
  const out = [];
  for (const a of cfg.ask || []) {
    if (a === 'F') { if (an.foci.some((_, i) => !has('F', i))) out.push(a); continue; }
    if (a === 'S') { if (an.vertices.some((_, i) => !has('S', i))) out.push(a); continue; }
    if (a === 'asymptotes' || a === 'directrices') { if (an[a].some((_, i) => !has(a, i))) out.push(a); continue; }
    if (a === 'directrice') { if (!(given.directrices || []).length) out.push(a); continue; }
    if (!given[a]) out.push(a);
  }
  return out;
}

// Standard form in x, y (or reduced in X, Y): no xy term; centred: no linear term.
function standardShape(cfg, eq) {
  const [a, b, c, d, e, f] = eq.coefs;
  const an = analysis(cfg);
  if (Math.abs(b) > 1e-9) return false;
  if (eq.reduced) {
    if (an.type === 'parabola') return (Math.abs(a) < 1e-9) !== (Math.abs(c) < 1e-9) && Math.abs(f) < 1e-9 && (Math.abs(a) < 1e-9 ? Math.abs(e) < 1e-9 : Math.abs(d) < 1e-9);
    return Math.abs(d) < 1e-9 && Math.abs(e) < 1e-9;
  }
  // In x, y: squares of (x − h) and (y − k), as written.
  return writtenStandard(eq.sides || []);
}

const isNum = (n) => { n = stripParen(n); if (n.t === 'neg') n = stripParen(n.e); return n.t === 'num' || (n.t === 'frac' && stripParen(n.n).t === 'num' && stripParen(n.d).t === 'num'); };
function squareTerm(n) {
  n = stripParen(n);
  if (n.t === 'neg') return squareTerm(n.e);
  if (n.t === 'frac') return squareTerm(n.n) && isNum(n.d);
  if (n.t === 'bin' && n.op === '×' && isNum(n.l)) return squareTerm(n.r);
  if (n.t !== 'pow' || !isNum(n.e)) return false;
  const b = stripParen(n.b);
  if (b.t === 'sym') return true;
  return b.t === 'bin' && (b.op === '+' || b.op === '-') && stripParen(b.l).t === 'sym' && isNum(b.r);
}
const termsOf = (n, out = []) => { n = stripParen(n); if (n.t === 'bin' && (n.op === '+' || n.op === '-')) { termsOf(n.l, out); termsOf(n.r, out); } else out.push(n); return out; };
function linearTerm(n) {
  n = stripParen(n);
  if (n.t === 'neg') return linearTerm(n.e);
  if (n.t === 'sym') return true;
  if (n.t === 'bin' && n.op === '×' && isNum(n.l)) { const r = stripParen(n.r); return r.t === 'sym' || (r.t === 'bin' && (r.op === '+' || r.op === '-') && stripParen(r.l).t === 'sym' && isNum(r.r)); }
  return false;
}
function writtenStandard(sides) {
  if (sides.length !== 2) return false;
  const [l, r] = sides;
  const allSq = (n) => termsOf(n).every(squareTerm);
  if (allSq(l) && isNum(r)) return true;
  if (allSq(r) && isNum(l)) return true;
  // Parabola: a square = a·(y − k).
  if (termsOf(l).length === 1 && squareTerm(l) && linearTerm(r)) return true;
  if (termsOf(r).length === 1 && squareTerm(r) && linearTerm(l)) return true;
  return false;
}

function finalOf(cfg, node, state) {
  if (cfg.ask?.length) return missing(cfg, state.given || {}).length === 0;
  if (!node.eq) return false;
  const target = cfg.target ?? 'standard';
  if (target === 'none') return true;
  if (target === 'reduced' && !node.eq.reduced) return false;
  if (target === 'standard' && node.eq.reduced) return false;
  return standardShape(cfg, node.eq);
}

// Element values in final form (exact numbers written out).
function tidyElements(node) {
  for (const el of node.elements || []) {
    const ns = el.nodes || (el.node ? [el.node] : []);
    for (const n of ns) {
      const f = exactForm(n);
      if (typeof f === 'string') return f;
    }
  }
  return true;
}

function sameLineNode(cfg, c, n) {
  if (c.eq && n.eq) return c.eq.reduced === n.eq.reduced && proportional(c.eq.coefs, n.eq.coefs);
  if (c.elements && n.elements) {
    return n.elements.every((e) => c.elements.some((x) => x.kind === e.kind && (e.value && x.value ? (Array.isArray(e.value) ? samePoint(e.value, x.value) : sameNum(e.value, x.value)) : e.lines && x.lines ? e.lines.every((L) => x.lines.some((M) => sameLine(L, M))) : false)));
  }
  return false;
}

export function judgeLine(cfg, prev, input, state = {}) {
  let node;
  if (input && typeof input === 'object') node = input;
  else {
    try { node = readStrict(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  if (prev?.text && node.text === prev.text) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  const ctxCfg = Object.assign(Object.create(cfg), { _an: analysis(cfg) });
  const diag = () => diagnoseLine('conic', prev, node, ctxCfg, (c, n) => sameLineNode(cfg, c, n));
  if (node.eq) {
    if (!sameEquation(cfg, node.eq)) {
      const d = diag();
      const message = node.eq.reduced ? 'Ce n\'est pas l\'équation de la conique dans un repère de ses axes.' : 'Ce n\'est pas une équation de la même conique.';
      return { kind: 'wrong', node, rule: d?.rules[0] ?? null, diag: d, message };
    }
  } else if (node.elements) {
    const hits = [];
    for (const el of node.elements) {
      const r = checkElement(cfg, el);
      if (!r.ok) {
        const d = diag() ?? (r.rule ? { rules: [r.rule], ambiguous: 1, ctx: {} } : null);
        return { kind: 'wrong', node, rule: d?.rules[0] ?? null, diag: d, message: r.message };
      }
      hits.push([el, r]);
    }
    const tidy = tidyElements(node);
    if (typeof tidy === 'string') return { kind: 'stay', node, message: tidy };
    state.given ||= {};
    for (const [el, r] of hits) {
      if (r.hit) {
        const [k, ...idx] = r.hit;
        state.given[k] = [...new Set([...(state.given[k] || []), ...idx])];
      } else state.given[el.kind] = true;
    }
  } else return { kind: 'form', node, message: 'Écris une équation, ou des éléments comme « Ω = (1 ; 2) ».' };
  const fin = finalOf(cfg, node, state);
  if (fin === true) return { kind: 'done', node };
  return { kind: 'ok', node };
}

export function isFinal(cfg, node) {
  if (cfg.ask?.length) return false;
  return finalOf(cfg, node, {});
}

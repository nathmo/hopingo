// Judge `domain` (spec §6 type `domain`, §16.3; catalogue A2, « Lignes
// d'étape », point 5; step U6): the bounds of a double or triple integral.
// A line is a list of chains, the outer variable first:
//   « 0 ≤ x ≤ 2 ; x^2 ≤ y ≤ 2x »  (type I)   « 0 ≤ φ ≤ π ; 1 ≤ r ≤ 2 » (polar)
// cfg:
//   {coords: 'cart' | 'polar' | 'cyl' | 'sph' (the coordinates of the line),
//    vars?: the letters of the line (default x, y | r, φ | r, φ, z | r, θ, φ;
//           cartesian in 3D: x, y, z with dim: 3),
//    region: ['x^2+y^2 ≤ 4', 'y ≥ 0'] (the reference: cartesian inequalities,
//           all true) or ref: 'line' with refCoords (a reference description),
//    box: [[−2, 2], [0, 2](, [z…])] (cartesian box where points are drawn),
//    order?: ['y', 'x'] (the shape asked, outer first: type II here),
//    shape?: 'typeI' | 'typeII' | 'typeI3' | 'polar' | 'cyl' | 'sph' (the
//           name in messages)}
// A line is right if it describes the same set: 600 points of the box, each
// in both sets or in neither (r ≥ 0; an angle may be read modulo 2π). The
// bounds of a variable may only use the variables before it: an inner
// letter in an outer bound is `wrong` (trap a2_fubini_outer_var). Final
// form: every variable bounded once, in the order asked (else `stay`).

import { parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { toText } from '../cas/print.js';
import { symbolsIn, stripParen, unparen } from '../cas/ast.js';
import { compileFloat } from '../cas/numeric.js';
import { makeRng } from '../content/random.js';
import { seedOf } from '../cas/equiv.js';
import { frNum } from './common.js';
import { diagnoseLine } from './diagnose.js';

export const sign = '';

const VARS = { cart: ['x', 'y'], polar: ['r', 'φ'], cyl: ['r', 'φ', 'z'], sph: ['r', 'θ', 'φ'] };
export const varsOf = (cfg, coords = cfg.coords || 'cart') => (coords === cfg.coords && cfg.vars) || (coords === 'cart' && (cfg.dim === 3 || cfg.box?.length === 3) ? ['x', 'y', 'z'] : VARS[coords]);
const ANGLES = new Set(['φ', 'θ']);

export const parseLine = (cfg, text) => parse(String(text).replace(/^\s*=/, ''), { vars: varsOf(cfg) });
export const show = (cfg, node, opts = {}) => toMathML(unparen(node), opts);
export const text = (cfg, node) => toText(node);
export const start = (cfg) => cfg.start;

// A line → [{v, lo, hi, loStrict, hiStrict}] in its order, or an error text.
export function chainsOf(node, vars) {
  const items = stripParen(node).t === 'list' ? stripParen(node).items : [node];
  const out = [];
  for (let it of items) {
    it = stripParen(it);
    let lo; let hi; let v;
    if (it.t === 'chain' && it.items.length === 3) {
      const mid = stripParen(it.items[1]);
      if (mid.t !== 'sym' || !vars.includes(mid.name)) return `Au milieu de « ${toText(it)} », mets la variable.`;
      v = mid.name;
      const up = it.ops.every((o) => o === '≤' || o === '<');
      const down = it.ops.every((o) => o === '≥' || o === '>');
      if (!up && !down) return 'Écris chaque encadrement dans un seul sens : a ≤ x ≤ b.';
      [lo, hi] = up ? [it.items[0], it.items[2]] : [it.items[2], it.items[0]];
    } else if (it.t === 'rel' && ['≤', '<', '≥', '>'].includes(it.op)) {
      return `Encadre la variable des deux côtés : a ≤ … ≤ b.`;
    } else return 'Écris des encadrements « a ≤ x ≤ b », séparés par « ; ».';
    if (out.some((c) => c.v === v)) return `La variable ${v} est encadrée deux fois.`;
    out.push({ v, lo, hi });
  }
  return out;
}

// Cartesian point → the coordinates of the line.
function toCoords(coords, P) {
  const [x, y, z = 0] = P;
  if (coords === 'cart') return [P];
  const r2 = Math.hypot(x, y);
  const phi = Math.atan2(y, x);
  const phis = [phi, phi + 2 * Math.PI, phi - 2 * Math.PI, phi + 4 * Math.PI];
  if (coords === 'polar') return phis.map((p) => ({ r: r2, φ: p }));
  if (coords === 'cyl') return phis.map((p) => ({ r: r2, φ: p, z }));
  const r3 = Math.hypot(x, y, z);
  const th = Math.acos(r3 ? z / r3 : 1);
  return phis.map((p) => ({ r: r3, θ: th, φ: p }));
}

function member(chains, compiled, coords, vars, P) {
  const candidates = toCoords(coords, P).map((c) => (Array.isArray(c) ? Object.fromEntries(vars.map((v, i) => [v, c[i]])) : c));
  return candidates.some((env) => chains.every((c, i) => {
    const val = env[c.v];
    const lo = compiled[i][0](env);
    const hi = compiled[i][1](env);
    return Number.isFinite(lo) && Number.isFinite(hi) && val >= lo - 1e-12 && val <= hi + 1e-12;
  }));
}

const REGIONS = new Map();
function refMember(cfg) {
  const key = JSON.stringify([cfg.region, cfg.ref, cfg.refCoords, cfg.box?.length]);
  if (!REGIONS.has(key)) {
    let f;
    if (cfg.region) {
      const vars = (cfg.box?.length === 3 || cfg.dim === 3) ? ['x', 'y', 'z'] : ['x', 'y'];
      const tests = cfg.region.map((t) => {
        const n = parse(t, { vars });
        const parts = n.t === 'chain' ? n.items.slice(1).map((b, i) => ({ l: n.items[i], r: b, op: n.ops[i] })) : [n];
        return parts.map((p) => ({ l: compileFloat(p.l), r: compileFloat(p.r), op: p.op }));
      }).flat();
      f = (P) => {
        const env = Object.fromEntries(vars.map((v, i) => [v, P[i]]));
        return tests.every((t) => {
          const a = t.l(env);
          const b = t.r(env);
          if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
          return t.op === '≤' || t.op === '<' ? a <= b + 1e-12 : t.op === '≥' || t.op === '>' ? a >= b - 1e-12 : Math.abs(a - b) < 1e-12;
        });
      };
    } else {
      const rc = cfg.refCoords || cfg.coords || 'cart';
      const vars = varsOf(cfg, rc);
      const chains = chainsOf(parse(cfg.ref, { vars }), vars);
      const compiled = chains.map((c) => [compileFloat(c.lo), compileFloat(c.hi)]);
      f = (P) => member(chains, compiled, rc, vars, P);
    }
    REGIONS.set(key, f);
  }
  return REGIONS.get(key);
}

// The first point of the box in one set only, or null.
export function domainWitness(cfg, chains) {
  const vars = varsOf(cfg);
  const compiled = chains.map((c) => [compileFloat(c.lo), compileFloat(c.hi)]);
  const ref = refMember(cfg);
  const box = cfg.box || [[-3, 3], [-3, 3]];
  const rng = makeRng(seedOf(JSON.stringify(cfg.box) + chains.map((c) => toText(c.lo) + toText(c.hi)).join('|')));
  for (let i = 0; i < 600; i++) {
    const P = box.map(([lo, hi]) => lo + (hi - lo) * rng.next());
    const a = ref(P);
    const b = member(chains, compiled, cfg.coords || 'cart', vars, P);
    if (a !== b) return { P, inRef: a };
  }
  return null;
}

// Two lines that describe the same set (for the traps).
export function sameDomain(cfg, a, b) {
  const vars = varsOf(cfg);
  const A = chainsOf(a, vars);
  const B = chainsOf(b, vars);
  if (typeof A === 'string' || typeof B === 'string') return false;
  const ca = A.map((c) => [compileFloat(c.lo), compileFloat(c.hi)]);
  const cb = B.map((c) => [compileFloat(c.lo), compileFloat(c.hi)]);
  const box = cfg.box || [[-3, 3], [-3, 3]];
  const rng = makeRng(7);
  for (let i = 0; i < 300; i++) {
    const P = box.map(([lo, hi]) => lo + (hi - lo) * rng.next());
    if (member(A, ca, cfg.coords || 'cart', vars, P) !== member(B, cb, cfg.coords || 'cart', vars, P)) return false;
  }
  return true;
}

const ORDER_NAMES = { typeI: 'type I (x à l\'extérieur)', typeII: 'type II (y à l\'extérieur)', polar: 'polaires', cyl: 'cylindriques', sph: 'sphériques', typeI3: 'type I (z à l\'intérieur)' };

// true, false (variables missing) or a message (another order than asked).
export function isFinal(cfg, node) {
  const vars = varsOf(cfg);
  const chains = chainsOf(node, vars);
  if (typeof chains === 'string' || chains.length !== vars.length) return false;
  if (cfg.order && chains.some((c, i) => c.v !== cfg.order[i])) return `ta description est juste, mais il faut l'ordre ${cfg.order.join(', ')} (${ORDER_NAMES[cfg.shape] || 'demandé'}) : ${cfg.order[0]} à l'extérieur.`;
  return true;
}

export function judgeLine(cfg, prev, input, state = {}) {
  let node;
  if (input && typeof input === 'object') node = input;
  else {
    try { node = parseLine(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  const vars = varsOf(cfg);
  const unknown = [...symbolsIn(node)].filter((s) => !vars.includes(s));
  if (unknown.length) return { kind: 'parse', node, message: `Ici, les variables sont ${vars.join(', ')}.` };
  const chains = chainsOf(node, vars);
  if (typeof chains === 'string') return { kind: 'parse', node, message: chains };
  // Each bound uses only the variables before it.
  for (let i = 0; i < chains.length; i++) {
    const allowed = new Set(chains.slice(0, i).map((c) => c.v));
    const used = [...symbolsIn(chains[i].lo), ...symbolsIn(chains[i].hi)].filter((s) => vars.includes(s));
    const bad = used.find((s) => !allowed.has(s));
    if (bad) {
      return { kind: 'wrong', node, rule: 'a2_fubini_outer_var', diag: { rules: ['a2_fubini_outer_var'], ambiguous: 1, ctx: { v: bad } }, message: i === 0 ? `Les bornes de ${chains[0].v}, à l'extérieur, doivent être des nombres : elles ne peuvent pas dépendre de ${bad}.` : `Les bornes de ${chains[i].v} ne peuvent dépendre que des variables écrites avant : pas de ${bad}.` };
    }
  }
  if (chains.length < vars.length) return { kind: 'stay', node, message: `Encadre aussi ${vars.filter((v) => !chains.some((c) => c.v === v)).join(' et ')}.` };
  const w = domainWitness(cfg, chains);
  if (w) {
    const pt = `(${w.P.map((x) => frNum(x, 2)).join(' ; ')})`;
    const diag = prev ? diagnoseLine('domain', prev, node, cfg, (cand, line) => sameDomain(cfg, cand, line)) : null;
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: w.inRef ? `Le point ${pt} est dans le domaine, mais pas dans ta description.` : `Le point ${pt} est dans ta description, mais pas dans le domaine.` };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais ${fin}` };
  return { kind: 'ok', node };
}

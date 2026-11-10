// Judge `complex` (spec §5.2, step U4): a line is right if it has the same
// value as the previous one: exactly in ℚ(i) when both lines are there
// ((3 + 4i)/(1 − 2i) = −1 + 2i), else as float complexes (relative 1e−9),
// so e^(iπ/3), √2·(cos π/4 + i sin π/4) and (1 + i√3)⁶ are compared too.
// Lines are read with i the imaginary unit (cfg.complex is implied).
//
// cfg: {form, arg?, vars?, domain?, unknown?, itemForm?}
//   form   final form:
//          'algebraic' (default)  a + bi, a and b real numbers in closed form
//                                 (3 − 2i, √3/2 + i/2, −i), each part once
//          'exp'                  r·e^(iθ), r > 0
//          'trig'                 r(cos θ + i sin θ), r > 0
//          'polar'                'exp' or 'trig'
//          'real'                 a real number in closed form (|z|, arg z)
//          'set'                  a set of solutions (see below), each one
//                                 in cfg.itemForm ('algebraic' by default)
//          'any'                  every right line is final
//   arg    'principal': θ in ]−π ; π] ; 'positive': θ in [0 ; 2π[ ;
//          default: any θ (the value decides)
//   vars, domain: letters of real values (θ, x, y) sampled in domain
//          ([−3 ; 3] by default): the lines are compared at 6 points.
//   unknown  the letter of an equation ('z' by default).
// Sets of solutions: a line may be an equation in the unknown with a
// polynomial on each side (z² + 2z + 5 = 0, (z + 1)² = −4), a disjunction
// of them (z + 1 = 2i ou z + 1 = −2i), or a finite set {−1 + 2i ; −1 − 2i}.
// Two such lines are right if they have the same set of complex solutions
// (roots by Durand–Kerner, compared at 1e−7).
// Traps: rules listing 'complex' in `judges`, compared by value (or set).

import { parse } from '../cas/parse.js';
import { stripParen, contains, symbolsIn } from '../cas/ast.js';
import { evalFloat } from '../cas/numeric.js';
import { closedNumber } from '../cas/closedform.js';
import { CQ, C, complexValue, sameComplex, cText, polarParts, algebraicParts, cabs, cmul, cadd, csub, cdiv } from '../cas/complex.js';
import { polyOf, coeffs, I } from '../cas/polyx.js';
import { Q } from '../math/rational.js';
import { diagnoseLine } from './diagnose.js';
import { sameLine } from './common.js';
import { makeRng } from '../content/random.js';

export const sign = '=';

const unknownOf = (cfg) => cfg.unknown || 'z';

export function parseLine(cfg, text) {
  return parse(String(text).replace(/^\s*=/, ''), { vars: [...(cfg.vars || []), unknownOf(cfg)], complex: true });
}

// ---------- values ----------

const ENVS = new Map();
function envsOf(cfg) {
  const vars = cfg.vars || [];
  if (!vars.length) return [{}];
  const key = `${vars.join(',')}|${JSON.stringify(cfg.domain || {})}`;
  if (!ENVS.has(key)) {
    const rng = makeRng(7);
    const out = [];
    for (let k = 0; k < 6; k++) {
      const env = {};
      for (const v of vars) {
        const [lo, hi] = cfg.domain?.[v] || [-3, 3];
        env[v] = lo + (hi - lo) * (0.1 + 0.8 * rng.next());
      }
      out.push(env);
    }
    ENVS.set(key, out);
  }
  return ENVS.get(key);
}

const isSetLine = (n, cfg) => {
  n = stripParen(n);
  if (n.t === 'set' && n.kind === 'finite') return true;
  if (n.t === 'rel' && n.op === '=') return true;
  if (n.t === 'logic' && n.op === 'or') return true;
  return false;
};

// The values of a line at each sample point: [{exact, re, im}] or null.
function valuesOf(cfg, node) {
  const out = [];
  for (const env of envsOf(cfg)) {
    const v = complexValue(node, env);
    if (!v) return null;
    out.push(v);
  }
  return out;
}

// ---------- sets of solutions ----------

// Roots of a polynomial with float complex coefficients (lowest first).
export function polyRoots(cs) {
  const c = [...cs];
  while (c.length && cabs(c[c.length - 1]) < 1e-14) c.pop();
  const n = c.length - 1;
  if (n < 1) return [];
  const lead = c[n];
  const a = c.map((x) => cdiv(x, lead));
  const P = (z) => { let s = C(0); for (let k = n; k >= 0; k--) s = cadd(cmul(s, z), a[k]); return s; };
  let zs = Array.from({ length: n }, (_, k) => {
    const r = 0.4 + 0.9 * k / n;
    return cmul(C(r), { re: Math.cos(0.4 + (2 * Math.PI * k) / n), im: Math.sin(0.4 + (2 * Math.PI * k) / n) });
  });
  for (let it = 0; it < 500; it++) {
    let moved = 0;
    zs = zs.map((z, i) => {
      let d = C(1);
      zs.forEach((w, j) => { if (j !== i) d = cmul(d, csub(z, w)); });
      const step = cdiv(P(z), d);
      if (!Number.isFinite(step.re)) return z;
      moved = Math.max(moved, cabs(step));
      return csub(z, step);
    });
    if (moved < 1e-15) break;
  }
  // Newton polish.
  const dP = (z) => { let s = C(0); for (let k = n; k >= 1; k--) s = cadd(cmul(s, z), cmul(C(k), a[k])); return s; };
  return zs.map((z) => {
    for (let k = 0; k < 4; k++) { const d = dP(z); if (cabs(d) < 1e-14) break; z = csub(z, cdiv(P(z), d)); }
    return z;
  });
}

function qiOf(polyCoef) {
  // a + b·I_ → CQ (a, b numbers), else null.
  const parts = polyCoef.coeffsIn(I);
  if (!parts.every((p) => p.isConst)) return null;
  return new CQ(parts[0]?.constValue() ?? new Q(0), parts[1]?.constValue() ?? new Q(0));
}

// The set of solutions of a line: [{re, im}] (distinct), or null.
export function solutionsOf(cfg, node) {
  const n = stripParen(node);
  const v = unknownOf(cfg);
  if (n.t === 'logic' && n.op === 'or') {
    const a = solutionsOf(cfg, n.l);
    const b = solutionsOf(cfg, n.r);
    return a && b ? distinct([...a, ...b]) : null;
  }
  if (n.t === 'set' && n.kind === 'finite') {
    const xs = n.items.map((x) => complexValue(x));
    return xs.every(Boolean) ? distinct(xs) : null;
  }
  if (n.t === 'rel' && n.op === '=') {
    // z = a: a number (fast path), else a polynomial equation.
    const l = stripParen(n.l);
    if (l.t === 'sym' && l.name === v && !contains(n.r, (x) => x.t === 'sym' && x.name === v)) {
      const z = complexValue(n.r);
      return z ? [z] : null;
    }
    const diff = { t: 'bin', op: '-', l: n.l, r: { t: 'paren', e: n.r } };
    const p = polyOf(diff, { complex: true });
    if (!p) return null;
    const vs = [...p.vars()].filter((x) => x !== I);
    if (vs.some((x) => x !== v)) return null;
    const cs = coeffs(p, v).map(qiOf);
    if (cs.some((x) => !x)) return null;
    if (cs.length <= 1) return cs.length && !cs[0].isZero() ? [] : null;
    return distinct(polyRoots(cs.map((x) => x.toFloat())));
  }
  return null;
}

const near = (a, b) => Math.abs(a.re - b.re) + Math.abs(a.im - b.im) <= 1e-7 * (1 + cabs(a) + cabs(b));
function distinct(xs) {
  const out = [];
  for (const x of xs) if (!out.some((y) => near(x, y))) out.push(x);
  return out;
}
export function sameSolutions(A, B) {
  if (!A || !B || A.length !== B.length) return false;
  return A.every((a) => B.some((b) => near(a, b)));
}

// ---------- final forms ----------

const closed = (node) => {
  const r = closedNumber(node);
  return r;
};

function realOf(node) {
  const v = complexValue(node);
  return v && Math.abs(v.im) < 1e-12 ? v.re : NaN;
}

function argOk(cfg, theta) {
  const t = realOf(theta);
  if (!Number.isFinite(t)) return false;
  if (cfg.arg === 'principal' && !(t > -Math.PI - 1e-12 && t <= Math.PI + 1e-12)) return 'Prends l\'argument principal, dans ]−π ; π].';
  if (cfg.arg === 'positive' && !(t >= -1e-12 && t < 2 * Math.PI - 1e-12)) return 'Prends l\'argument dans [0 ; 2π[.';
  return true;
}

function finalOne(cfg, node, form) {
  const n = stripParen(node);
  if (form === 'any') return true;
  if (form === 'real') {
    if (contains(n, (x) => x.t === 'const' && x.name === 'i')) return false;
    return closed(n);
  }
  if (form === 'algebraic') {
    const parts = algebraicParts(n);
    if (!parts) return false;
    for (const p of [parts.re, parts.im]) {
      const c = closed(p);
      if (c !== true) return c;
    }
    // 0 + 3i, 2 + 0i: write it shorter.
    const re = stripParen(parts.re);
    const im = stripParen(parts.im);
    const zero = (x) => x.t === 'num' && x.v.n === 0;
    if (zero(re) && !zero(im) && contains(n, (x) => x === parts.re && x.t === 'num')) return 'Inutile d\'écrire 0 + … : écris seulement la partie imaginaire.';
    if (zero(im) && contains(n, (x) => x.t === 'const' && x.name === 'i')) return 'La partie imaginaire est nulle : écris seulement le réel.';
    return true;
  }
  if (form === 'exp' || form === 'trig' || form === 'polar') {
    const p = polarParts(n);
    if (!p || (form !== 'polar' && p.kind !== form)) return false;
    const r = realOf(p.r);
    if (!(r > 0)) return 'Le module r d\'une forme polaire est positif : change d\'argument (−1 = e^(iπ)).';
    for (const x of [p.r, p.theta]) {
      const c = closed(x);
      if (c !== true) return c;
    }
    return argOk(cfg, p.theta);
  }
  return false;
}

export function isFinal(cfg, node) {
  const form = cfg.form || 'algebraic';
  if (form === 'set') {
    const n = stripParen(node);
    const items = [];
    const collect = (x) => {
      x = stripParen(x);
      if (x.t === 'logic' && x.op === 'or') return collect(x.l) && collect(x.r);
      if (x.t === 'rel' && x.op === '=' && stripParen(x.l).t === 'sym' && stripParen(x.l).name === unknownOf(cfg)) { items.push(x.r); return true; }
      return false;
    };
    if (n.t === 'set' && n.kind === 'finite') items.push(...n.items);
    else if (!collect(n)) return false;
    if (items.some((x) => contains(x, (y) => y.t === 'sym' && y.name === unknownOf(cfg)))) return false;
    for (const x of items) {
      const f = finalOne(cfg, x, cfg.itemForm || 'algebraic');
      if (f !== true) return f || 'Écris chaque solution sous la forme a + bi.';
    }
    const vals = items.map((x) => complexValue(x));
    if (vals.some((v, i) => vals.some((w, j) => j < i && v && w && near(v, w)))) return 'Une solution est écrite deux fois.';
    return true;
  }
  if (cfg.vars?.length && [...symbolsIn(node)].some((s) => cfg.vars.includes(s))) return form === 'any';
  return finalOne(cfg, node, form);
}

export const start = (cfg) => cfg.start;

const FORM_MSG = {
  algebraic: 'écris-le sous la forme a + bi',
  exp: 'écris-le sous la forme r·e^(iθ)',
  trig: 'écris-le sous la forme r(cos θ + i sin θ)',
  polar: 'écris-le sous forme polaire',
  real: 'calcule ce nombre réel',
};

const say = (v) => cText(v.exact ?? v);

export function judgeLine(cfg, prev, input, state = {}) {
  let node;
  if (input && typeof input === 'object') node = input;
  else {
    try { node = parseLine(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  const allowed = new Set([...(cfg.vars || []), unknownOf(cfg)]);
  const unknown = [...symbolsIn(node)].filter((s) => !allowed.has(s));
  if (unknown.length) return { kind: 'parse', node, message: `Je ne connais pas la lettre « ${unknown[0].replace(/_$/, '')} » ici.` };
  if (sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  const setMode = (cfg.form === 'set') || isSetLine(prev, cfg);
  if (setMode) {
    const A = solutionsOf(cfg, prev);
    const B = solutionsOf(cfg, node);
    if (!B) return { kind: 'stay', node, message: 'Je n\'arrive pas à lire les solutions de cette ligne : écris une équation, ou les solutions.' };
    if (A && !sameSolutions(A, B)) {
      const diag = diagnoseLine('complex', prev, node, cfg, (cand, line) => sameSolutions(solutionsOf(cfg, cand), solutionsOf(cfg, line)));
      const miss = A.find((a) => !B.some((b) => near(a, b)));
      const extra = B.find((b) => !A.some((a) => near(a, b)));
      const msg = miss ? `${cText(miss)} est solution de la ligne précédente, mais pas de la tienne.` : `${cText(extra)} est solution de ta ligne, mais pas de la précédente.`;
      return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: msg };
    }
  } else {
    const a = valuesOf(cfg, prev);
    const b = valuesOf(cfg, node);
    if (!b) return { kind: 'stay', node, message: 'Ce nombre n\'est pas défini (division par 0 ?) : écris-le autrement.' };
    if (a && !a.every((x, k) => sameComplex(x, b[k]))) {
      const diag = diagnoseLine('complex', prev, node, cfg, (cand, line) => {
        const x = valuesOf(cfg, cand);
        const y = valuesOf(cfg, line);
        return !!x && !!y && x.every((u, k) => sameComplex(u, y[k]));
      });
      const k = a.findIndex((x, i) => !sameComplex(x, b[i]));
      const where = cfg.vars?.length ? ` (en ${cfg.vars.map((v) => `${v} = ${String(Math.round(envsOf(cfg)[k][v] * 100) / 100).replace('.', ',')}`).join(', ')})` : '';
      return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: `Ta ligne vaut ${say(b[k])}, mais la précédente vaut ${say(a[k])}${where}.` };
    }
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais ${fin.charAt(0).toLowerCase()}${fin.slice(1)}` };
  state.lines = (state.lines || 0) + 1;
  return { kind: 'ok', node };
}

// The message of a right line that is not final yet, for the UI.
export const formMessage = (cfg) => FORM_MSG[cfg.form || 'algebraic'] || '';

void evalFloat;

// Judge `poly` (spec §5.2, §16.2, step U1): polynomials in one variable,
// compared exactly (js/cas/polyx.js), with parameters (λ) or complex
// coefficients (cfg.complex).
// cfg: {v, mode, target, complex, params, names, dividend, divisor, solution}
// mode:
//   'same'      (default) the line is the same polynomial as the previous one
//   'monic'     the same up to a non-zero constant (the gcd made monic)
//   'div'       Euclidean division: the line A = B·Q + R is an identity; the
//               final form has deg R < deg B (cfg.dividend, cfg.divisor)
//   'identity'  identification of coefficients: the line is an identity in
//               x with parameters, or a system, or the values; it is right if
//               cfg.solution satisfies it, and it still fixes the parameters
// target (final form): 'any', 'expanded', 'factored-R', 'factored-C', 'monic'.
// A line may start with a name: « P = … », « A = … » (cfg.names gives
// the polynomials behind A, B).

import { Q } from '../math/rational.js';
import { parse } from '../cas/parse.js';
import { stripParen, sub } from '../cas/ast.js';
import { toText } from '../cas/print.js';
import {
  polyOf, degree, coeffs, qCoeffs, discriminant, productFactors, isExpanded, leadCoeff, splitByDivisor,
} from '../cas/polyx.js';
import { Poly } from '../cas/poly.js';
import { diagnoseLine } from './diagnose.js';
import { readLine, sameLine } from './common.js';

const V = (cfg) => cfg.v || 'x';

const CACHE = new WeakMap();
function prep(cfg) {
  if (CACHE.has(cfg)) return CACHE.get(cfg);
  const P = (t) => parse(t, { complex: cfg.complex });
  const names = {};
  for (const [k, t] of Object.entries(cfg.names || {})) names[k] = P(t);
  const out = {
    names,
    dividend: cfg.dividend ? polyOf(P(cfg.dividend), { complex: cfg.complex, names }) : null,
    divisor: cfg.divisor ? polyOf(P(cfg.divisor), { complex: cfg.complex, names }) : null,
    solution: cfg.solution ? Object.fromEntries(Object.entries(cfg.solution).map(([k, t]) => [k, P(String(t))])) : null,
  };
  CACHE.set(cfg, out);
  return out;
}

// « P = … »: the expression after a name.
export function bodyOf(node, cfg) {
  const n = stripParen(node);
  if (n.t === 'rel' && n.op === '=') {
    const l = stripParen(n.l);
    if (l.t === 'sym' && !l.sub && l.name !== V(cfg) && !(cfg.params || []).includes(l.name)) return n.r;
    if (l.t === 'fn' || (l.t === 'bin' && l.implicit && stripParen(l.l).t === 'sym' && /^[A-Z]$/.test(stripParen(l.l).name))) return n.r; // P(x) = …
  }
  return node;
}

export const polyLine = (node, cfg) => polyOf(bodyOf(node, cfg), { complex: cfg.complex, names: prep(cfg).names });

const proportional = (a, b, v) => {
  if (a.isZero || b.isZero) return a.isZero && b.isZero;
  const la = leadCoeff(a, v);
  const lb = leadCoeff(b, v);
  if (!la.isConst || !lb.isConst) return false;
  return a.scale(lb.constValue()).equals(b.scale(la.constValue()));
};

// ---------- division: B·Q + R ----------

// {q, r, hasB}: the terms with the divisor as a factor give Q, the others R.
export function splitDivision(node, cfg) {
  const { names, divisor } = prep(cfg);
  return splitByDivisor(bodyOf(node, cfg), divisor, { names, complex: cfg.complex, divisorName: cfg.divisorName });
}

// ---------- identification (g0-identify) ----------

function relationsOf(node) {
  const n = stripParen(node);
  if (n.t === 'list') return n.items.map(stripParen);
  return [n];
}

// The equations a line gives, as polynomials in the parameters = 0.
function equationsOf(node, cfg) {
  const v = V(cfg);
  const out = [];
  for (const rel of relationsOf(node)) {
    if (rel.t !== 'rel' || rel.op !== '=') return null;
    const p = polyOf(sub({ t: 'paren', e: rel.l }, { t: 'paren', e: rel.r }), { complex: cfg.complex });
    if (!p) return null;
    if (p.vars().has(v)) out.push(...coeffs(p, v).filter((c) => !c.isZero));
    else out.push(p);
  }
  return out;
}

// Value of a polynomial in the parameters at the solution.
const subst = (p, sol) => {
  let out = new Poly();
  for (const { m, c } of p.terms.values()) {
    let t = Poly.const(c);
    for (const [name, e] of m) {
      const val = sol[name];
      t = t.mul(val ? val.pow(e) : Poly.monomial([[name, e]], 1));
    }
    out = out.add(t);
  }
  return out;
};

// Rank of a linear system in the parameters (null if not linear).
function linearRank(eqs, params) {
  const rows = [];
  for (const e of eqs) {
    const row = params.map(() => new Q(0));
    for (const { m, c } of e.terms.values()) {
      if (!m.length) continue;
      if (m.length > 1 || m[0][1] !== 1) return null;
      const i = params.indexOf(m[0][0]);
      if (i < 0) return null;
      row[i] = row[i].add(c);
    }
    rows.push(row);
  }
  let rank = 0;
  const cols = params.length;
  for (let c = 0; c < cols && rank < rows.length; c++) {
    const piv = rows.findIndex((r, i) => i >= rank && r[c].n !== 0);
    if (piv < 0) continue;
    [rows[rank], rows[piv]] = [rows[piv], rows[rank]];
    for (let i = 0; i < rows.length; i++) {
      if (i === rank || rows[i][c].n === 0) continue;
      const f = rows[i][c].div(rows[rank][c]);
      rows[i] = rows[i].map((x, j) => x.sub(rows[rank][j].mul(f)));
    }
    rank++;
  }
  return rank;
}

function solutionPolys(cfg) {
  const { solution } = prep(cfg);
  const out = {};
  for (const [k, n] of Object.entries(solution || {})) out[k] = polyOf(n, { complex: cfg.complex });
  return out;
}

// « a = 2 ; b = 1 ; c = −1 » covering all the parameters.
function isValuesLine(node, cfg) {
  const rels = relationsOf(node);
  const seen = new Set();
  for (const r of rels) {
    if (r.t !== 'rel' || r.op !== '=') return false;
    const l = stripParen(r.l);
    if (l.t !== 'sym' || !(cfg.params || []).includes(l.name)) return false;
    if (polyOf(r.r) === null || !polyOf(r.r).isConst) return false;
    seen.add(l.name);
  }
  return (cfg.params || []).every((p) => seen.has(p));
}

function judgeIdentity(cfg, prev, node) {
  const eqs = equationsOf(node, cfg);
  if (!eqs) return { kind: 'parse', node, message: 'Écris une égalité (ou plusieurs, séparées par « ; »).' };
  const sol = solutionPolys(cfg);
  const bad = eqs.find((e) => !subst(e, sol).isZero);
  if (bad) return { kind: 'wrong', node, rule: null, message: 'Cette ligne n\'est pas une conséquence de l\'identité : vérifie le développement et les coefficients.' };
  const rank = linearRank(eqs, cfg.params || []);
  if (rank !== null && rank < (cfg.params || []).length) {
    return { kind: 'stay', node, message: `C'est juste, mais il manque des équations : ta ligne ne fixe pas ${(cfg.params || []).join(', ')}.` };
  }
  if (isValuesLine(node, cfg)) return { kind: 'done', node };
  return { kind: 'ok', node };
}

// ---------- final forms ----------

function factoredR(expr, cfg) {
  const v = V(cfg);
  const { factors } = productFactors(expr);
  if (factors.length === 0) return true;
  const keys = [];
  for (const f of factors) {
    const p = polyOf(f.node, { complex: cfg.complex });
    if (!p) return false;
    const cs = qCoeffs(p, v);
    if (!cs) return false;
    const d = cs.length - 1;
    if (d < 1) continue;
    if (d > 2) return false;
    if (d === 2 && discriminant(cs).n >= 0) return false;
    if (f.node.t !== 'sym' && !isExpanded(f.node, v)) return false;
    keys.push(p.scale(new Q(1).div(cs[d])).canon());
  }
  if (new Set(keys).size < keys.length) return 'Regroupe les facteurs égaux en une puissance, par exemple (x − 1)².';
  return factors.length > 1 || factors.some((f) => f.k > 1) || degree(polyOf(expr, { complex: cfg.complex }), v) <= 2;
}

function factoredC(expr, cfg) {
  const v = V(cfg);
  const { factors } = productFactors(expr);
  for (const f of factors) {
    const p = polyOf(f.node, { complex: true });
    if (!p) return false;
    if (degree(p, v) > 1) return false;
  }
  return true;
}

function monic(expr, cfg) {
  const v = V(cfg);
  const p = polyOf(expr, { complex: cfg.complex });
  if (!p) return false;
  const l = leadCoeff(p, v);
  if (!l?.isConst || !l.constValue().eq(1)) return 'Rends-le unitaire : divise par son coefficient dominant.';
  const { coef, factors } = productFactors(expr);
  if (factors.length <= 1 && coef.eq(1)) return isExpanded(expr, v) || factors.length === 1;
  return coef.eq(1);
}

export function isFinal(cfg, node) {
  const expr = bodyOf(node, cfg);
  switch (cfg.target || 'any') {
    case 'expanded': {
      if (!isExpanded(expr, V(cfg), { complex: cfg.complex })) return false;
      const p = polyOf(expr, { complex: cfg.complex });
      if (cfg.realCoeffs && p?.vars().has('I_')) return false;
      return true;
    }
    case 'factored-R': return factoredR(expr, cfg);
    case 'factored-C': return factoredC(expr, cfg);
    case 'monic': return monic(expr, cfg);
    default: return true;
  }
}

export const start = (cfg) => cfg.start;
export const parseLine = (cfg, t) => parse(t, { complex: cfg.complex, vars: [V(cfg), ...(cfg.params || [])] });
export const text = (cfg, node) => toText(node);

// A point where two polynomials differ, for the message.
function witness(a, b, v) {
  for (const x of [1, 2, -1, 0, 3, -2]) {
    const env = { [v]: x };
    const ya = a.evalFloat(env);
    const yb = b.evalFloat(env);
    if (Number.isFinite(ya) && Number.isFinite(yb) && Math.abs(ya - yb) > 1e-9) return { x, ya, yb };
  }
  return null;
}

const fmt = (y) => String(Math.round(y * 1000) / 1000).replace('.', ',').replace('-', '−');

export function judgeLine(cfg, prev, input) {
  const read = readLine({ ...cfg, vars: [V(cfg)], params: [...(cfg.params || []), ...Object.keys(cfg.names || {}), 'P', 'Q', 'R', 'A', 'B', 'D'] }, input);
  if (read.error) return read.error;
  const { node } = read;
  if (sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  if ((cfg.mode || 'same') === 'identity') return judgeIdentity(cfg, prev, node);
  const v = V(cfg);
  const pl = polyLine(node, cfg);
  if (!pl) return { kind: 'parse', node, message: `Écris un polynôme en ${v}.` };
  const pp = cfg.mode === 'div' ? prep(cfg).dividend : polyLine(prev, cfg);
  const same = (a, b) => (cfg.mode === 'monic' ? proportional(a, b, v) : a.equals(b));
  if (!pp || !same(pl, pp)) {
    const eq = (cand, line) => {
      const a = polyLine(cand, cfg);
      const b = polyLine(line, cfg);
      return !!a && !!b && same(a, b);
    };
    const diag = diagnoseLine('poly', prev, node, cfg, eq);
    const w = pp ? witness(pp, pl, v) : null;
    const message = w ? `En ${v} = ${fmt(w.x)}, la ligne précédente vaut ${fmt(w.ya)}, mais ta ligne vaut ${fmt(w.yb)}.` : 'Ta ligne n\'est pas égale à la précédente.';
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message };
  }
  if (cfg.mode === 'div') {
    const split = splitDivision(node, cfg);
    if (!split || !split.hasB) return { kind: 'ok', node };
    const dB = degree(prep(cfg).divisor, v);
    if (degree(split.r, v) < dB) return { kind: 'done', node, q: split.q, r: split.r };
    return { kind: 'ok', node, note: 'Le reste a encore un degré ≥ deg B : continue.' };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais : ${fin}` };
  return { kind: 'ok', node };
}


// Judge `equiv` (spec §5.2): a line is right if it is equivalent to the
// previous one, after every d(…) is replaced by its value. cfg:
//   {vars, domain, target, dvar, seed}
// target (final form):
//   'any'       every right line is final
//   'no-prime'  no d(…) or ′ left, and a tidy product: no ·1, no 0·,
//               numbers multiplied out (§5.2, G6 catalogue)
//   'no-sum'    no Σ (and no d(…)) left (G5 catalogue); with cfg.factored,
//               a product or quotient of first-degree factors with whole
//               coefficients ((n + 1)(n + 2)/2, n/(n + 1)); with
//               cfg.expanded, an expanded polynomial in the variable
//   'partial-fractions'  a polynomial part plus c/(x − a)ᵏ and (bx + c)/(x² + px + q)
//               with Δ < 0, each denominator once (G0 catalogue)
// Step U1b (G2 catalogue):
//   'goal'      the line is cfg.goal (sinh(2x), 1): an identity to reach
//   'only'      only the letters cfg.finalVars are left (t = tanh x), tidy
//   'powers'    a number times one power per letter, exponents written as
//               numbers (a^(1/2)·b^(−3), ab)
//   'log-expanded'  a sum of numbers and c·ln(u), u a letter, x + c or a
//               prime number, each u once (ln(x³√(x + 1)) developed)
//   'log-single'    a single logarithm, nothing around it
//   'constant'  a number written out
// cfg.subst = {t: 'tanh(x)'}: letters standing for an expression, replaced
// in both lines before they are compared.
// Step U1b (G1): cfg.defs = {f: 'sqrt(x)', g: '1-x^2'} with cfg.funcs: the
// item's functions, expanded before comparing (g(f(x)) = 1 − (√x)²);
// target 'short': no f or g left and a writing about as short as cfg.goal.
// Step U2 (G6 catalogue, implicit derivatives): cfg.implicit = {y: 'p'}: y
// is a function of x (cfg.vars[0]); every d(…) is the total derivative,
// y′ = d(y) being the letter p (listed in cfg.vars). So (x·y + y³)′ =
// y + x·y′ + 3y²·y′, and a line may write y′ or p. Target 'no-prime'
// accepts y′ in a final line.

import { expandDerivs, hasDeriv, diff } from '../cas/diff.js';
import { equivalent, seedOf } from '../cas/equiv.js';
import { numValue, stripParen, symbolsIn, contains, equalsStructural, unparen, walk, mapNode, add, mul, sym as symNode } from '../cas/ast.js';
import { parse } from '../cas/parse.js';
import { substSyms, expandFns } from '../cas/sets.js';
import { equalExact, exactValue } from '../cas/normal.js';
import { evalFloat } from '../cas/numeric.js';
import { exactForm, trigForm } from '../cas/exactform.js';
import { toText } from '../cas/print.js';
import { polyOf, qCoeffs, discriminant, sumTerms, productFactors, isExpanded } from '../cas/polyx.js';
import { diagnoseLine } from './diagnose.js';
import { readLine, sameLine, frNum } from './common.js';

// Factors of a product, through brackets.
function factors(n, out = []) {
  n = stripParen(n);
  if (n.t === 'bin' && n.op === '×') { factors(n.l, out); factors(n.r, out); } else out.push(n);
  return out;
}

const isProduct = (n) => n.t === 'bin' && n.op === '×';

// What is left to tidy in a line, or null.
export function presentationIssue(node) {
  let issue = null;
  const visit = (n, parentIsProduct) => {
    if (issue) return;
    n = n.t === 'paren' ? n.e : n;
    if (isProduct(n) && !parentIsProduct) {
      const fs = factors(n);
      const nums = fs.filter((f) => numValue(f) || (f.t === 'neg' && numValue(f.e)));
      if (nums.some((f) => numValue(f)?.n === 0)) { issue = 'Un produit par 0 vaut 0 : enlève ce terme.'; return; }
      if (nums.some((f) => numValue(f)?.eq(1))) { issue = 'Enlève les « ·1 » : multiplier par 1 ne change rien.'; return; }
      if (nums.length >= 2) { issue = 'Multiplie les nombres entre eux pour n\'en garder qu\'un.'; return; }
      fs.forEach((f) => visit(f, false));
      return;
    }
    if (n.t === 'bin' && (n.op === '+' || n.op === '-')) {
      if (numValue(n.l)?.n === 0 || numValue(n.r)?.n === 0) { issue = 'Enlève les « + 0 ».'; return; }
    }
    if (n.t === 'neg' && stripParen(n.e).t === 'neg') { issue = 'Simplifie les signes : −(−a) = a.'; return; }
    if (n.t === 'pow') {
      const k = numValue(n.e);
      if (k?.eq(1)) { issue = 'Un exposant 1 ne sert à rien : x¹ = x.'; return; }
      if (k?.n === 0) { issue = 'Un exposant 0 donne 1.'; return; }
    }
    if (n.t === 'frac' && numValue(n.d)?.eq(1)) { issue = 'Enlève le « /1 ».'; return; }
    for (const k of ['l', 'r', 'e', 'b', 'n', 'd']) if (n[k] && typeof n[k] === 'object' && n[k].t) visit(n[k], false);
    if (n.t === 'fn') n.args.forEach((a) => visit(a, false));
  };
  visit(node, false);
  return issue;
}

// A sum of simple elements (partial fractions): true, false or a message.
function partialFractions(node) {
  const dens = new Set();
  for (let t of sumTerms(node)) {
    t = stripParen(t.t === 'neg' ? t.e : t);
    if (t.t !== 'frac' || numValue(t.d)) {
      const p = polyOf(t);
      if (!p || [...p.vars()].some((v) => v !== 'x')) return false;
      continue;
    }
    const n = polyOf(t.n);
    let d = stripParen(t.d);
    if (d.t === 'pow') d = stripParen(d.b);
    const dp = polyOf(d);
    const dc = dp && qCoeffs(dp);
    const nc = n && qCoeffs(n);
    if (!dc || !nc) return false;
    if (dc.length === 3 && discriminant(dc).n < 0) { if (nc.length > 2) return false; } else if (dc.length !== 2 || nc.length > 1) return false;
    const key = dp.canon() + (stripParen(t.d).t === 'pow' ? `^${toText(stripParen(t.d).e)}` : '');
    if (dens.has(key)) return 'Regroupe les termes qui ont le même dénominateur.';
    dens.add(key);
  }
  return dens.size > 0 ? (presentationIssue(node) ?? true) : false;
}

// A quotient whose denominator is written as a product of factors that do
// not split any more (the first step of a partial fraction decomposition).
function factoredDen(node) {
  const n = stripParen(node);
  if (n.t !== 'frac') return false;
  for (const f of productFactors(n.d).factors) {
    const cs = polyOf(f.node) && qCoeffs(polyOf(f.node));
    if (!cs || cs.length > 3 || (cs.length === 3 && discriminant(cs).n >= 0)) return false;
  }
  return true;
}

// A product, quotient or power whose factors are whole-coefficient
// polynomials of degree ≤ 1 in v (or other sums without fractions): the
// closed form of a sum written « as f(n + 1) », (n + 1)(n + 2)/2, and not
// (n + 1)(n/2 + 1), (n + 1)(2n² + 7n + 6)/6 nor 1 − 1/(n + 1).
function closedProduct(node, v) {
  let n = stripParen(node);
  if (n.t === 'neg') n = stripParen(n.e);
  if (n.t === 'bin' && (n.op === '+' || n.op === '-')) return false;
  const bad = (f) => {
    f = stripParen(f);
    if (f.t === 'bin' && f.op === '×') return bad(f.l) || bad(f.r);
    if (f.t === 'frac') return bad(f.n) || bad(f.d);
    if (f.t === 'pow') return bad(f.b);
    if (f.t === 'neg') return bad(f.e);
    if (f.t !== 'bin') return false;
    if (contains(f, (x) => x.t === 'frac')) return true;
    const p = polyOf(f);
    const cs = p && [...p.vars()].every((x) => x === v) ? qCoeffs(p, v) : null;
    return !!cs && (cs.length > 2 || cs.some((c) => c.d !== 1));
  };
  return !bad(n);
}

const sym = (n) => n.t === 'sym' && !n.sub;
const isLn = (n) => n.t === 'fn' && ['ln', 'log', 'Log'].includes(n.name);
const literal = (n) => { n = stripParen(n); if (n.t === 'neg') n = stripParen(n.e); return n.t === 'num' || (n.t === 'frac' && stripParen(n.n).t === 'num' && stripParen(n.d).t === 'num'); };
const isPrime = (k) => { if (k < 2) return false; for (let d = 2; d * d <= k; d++) if (k % d === 0) return false; return true; };

// a·x^p·y^q…: one power per letter, exponents literal.
function powersForm(node) {
  const seen = new Set();
  let nums = 0;
  const visit = (n, top) => {
    n = stripParen(n);
    if (n.t === 'neg' && top) return visit(n.e, false);
    if (n.t === 'bin' && n.op === '×') return visit(n.l, false) && visit(n.r, false);
    if (n.t === 'frac' && !literal(n)) return visit(n.n, false) && visit(n.d, false);
    if (literal(n)) { nums++; return true; }
    let b = n;
    if (n.t === 'pow') {
      if (!literal(n.e) || numValue(stripParen(n.e))?.eq(1)) return false;
      b = stripParen(n.b);
    }
    if (!sym(b) || seen.has(b.name)) return false;
    seen.add(b.name);
    return true;
  };
  if (!visit(node, true)) return false;
  return nums <= 1 ? (presentationIssue(node) ?? true) : 'Multiplie les nombres entre eux.';
}

// c + a·ln(u) + …, each u a letter, x + c or a prime number, once.
function logExpanded(node) {
  const args = new Set();
  let consts = 0;
  for (let t of sumTerms(node)) {
    t = stripParen(t.t === 'neg' ? t.e : t);
    if (literal(t)) { consts++; continue; }
    const fs = productFactors(t);
    const lns = fs.factors.filter((f) => isLn(stripParen(f.node)));
    if (lns.length !== 1 || lns[0].k !== 1 || fs.factors.length !== 1) return false;
    const u = stripParen(stripParen(lns[0].node).args[0]);
    const k = numValue(u);
    if (k) {
      if (k.eq(1)) return 'ln 1 = 0 : enlève ce terme.';
      if (!k.isInt() || !isPrime(k.n)) return false;
    } else if (!sym(u)) {
      const p = polyOf(u);
      const cs = p && qCoeffs(p);
      if (!cs || cs.length !== 2) return false;
    }
    const key = toText(u);
    if (args.has(key)) return 'Regroupe les termes qui ont le même logarithme.';
    args.add(key);
  }
  if (consts > 1) return 'Additionne les nombres entre eux.';
  return presentationIssue(node) ?? true;
}

// The line is the goal, up to the order of factors and terms: exactly
// equal (sin x and cos x as letters), the same top operation and as many
// terms (2 sin x cos²x + … is not yet 3 sin x − 4 sin³x).
const topTerms = (n) => { n = stripParen(n); return n.t === 'bin' && (n.op === '+' || n.op === '-') ? topTerms(n.l) + 1 : 1; };
function reachesGoal(node, goal) {
  if (equalsStructural(unparen(node), unparen(goal), { parens: false })) return true;
  const a = stripParen(node);
  const b = stripParen(goal);
  const kind = (n) => (n.t === 'bin' ? (n.op === '+' || n.op === '-' ? 'sum' : 'prod') : n.t);
  // The functions are written as in the goal: cos((3x + x)/2) is not yet cos 2x.
  const fns = (n) => { const out = new Set(); walk(unparen(n), (y) => { if (y.t === 'fn') { out.add(toText(y)); return false; } return true; }); return [...out].sort().join('|'); };
  return equalExact(node, goal) === true && kind(a) === kind(b) && topTerms(a) === topTerms(b) && fns(node) === fns(goal);
}

// Fractions inside fractions: 1/(1/x − 2) is not simplified yet.
function fracDepth(n) {
  let best = 0;
  const visit = (x, d) => {
    if (!x || typeof x !== 'object') return;
    const here = x.t === 'frac' || (x.t === 'bin' && x.op === '÷') ? d + 1 : d;
    best = Math.max(best, here);
    for (const k of ['e', 'l', 'r', 'n', 'd', 'b']) if (x[k] && typeof x[k] === 'object') visit(x[k], here);
    if (Array.isArray(x.args)) x.args.forEach((a) => visit(a, here));
  };
  visit(n, 0);
  return best;
}

// Nodes of a tree, brackets left out: the size of a writing.
function size(n) {
  let k = 0;
  walk(unparen(n), () => { k++; return true; });
  return k;
}

const TARGETS = {
  // Step U1b (G1): the item's functions f, g are expanded (no call left)
  // and the line is about as short as cfg.goal (1 − x, not 1 − (√x)²).
  short: (node, cfg) => !contains(node, (x) => x.t === 'fn' && !!cfg.defs?.[x.name]) && size(node) <= size(parseGoal(cfg)) + (cfg.slack ?? 1)
    && fracDepth(node) <= fracDepth(parseGoal(cfg)),
  // Step U1b (G1): an expanded polynomial in the first variable (f(k) in m).
  expanded: (node, cfg) => (!!polyOf(node) && isExpanded(node, cfg.vars?.[0] || 'x') ? (presentationIssue(node) ?? true) : false),
  goal: (node, cfg) => (cfg.goal ? reachesGoal(node, parseGoal(cfg)) : false),
  only: (node, cfg) => {
    const ok = [...symbolsIn(node)].every((s) => (cfg.finalVars || []).includes(s));
    return ok ? (presentationIssue(node) ?? true) : false;
  },
  powers: (node) => powersForm(node),
  'log-expanded': (node) => logExpanded(node),
  'log-single': (node) => { const n = stripParen(node); return isLn(n) && !contains(n.args[0], (x) => isLn(x)); },
  constant: (node) => literal(node),
  any: () => true,
  'no-sum': (node, cfg) => {
    if (hasDeriv(node) || contains(node, (x) => x.t === 'sum')) return false;
    const v = cfg.vars?.[0] || 'n';
    if (cfg.factored && !closedProduct(node, v)) return false;
    if (cfg.expanded && !(polyOf(node) && isExpanded(node, v))) return false;
    // Numbers still to multiply out: a line on the way, not a final one.
    return !presentationIssue(node);
  },
  // Step U1b (G3): an exact number written out (radicals, π); a single
  // trigonometric function of x (cos(7π − x) = −cos x); the line given as
  // cfg.goal (proving an identity: one side is turned into the other).
  exact: (node) => exactForm(node),
  'one-trig': (node, cfg) => trigForm(node, cfg.vars?.[0] || 'x') || (exactForm(node) === true),
  'factored-den': (node) => factoredDen(node),
  'partial-fractions': (node) => partialFractions(node),
  'no-prime': (node, cfg) => {
    if (cfg?.implicit) node = mapNode(node, (n) => (n.t === 'deriv' && n.n === 1 && stripParen(n.e).t === 'sym' && cfg.implicit[stripParen(n.e).name] ? symNode(cfg.implicit[stripParen(n.e).name]) : n));
    if (hasDeriv(node)) return false;
    return presentationIssue(node) ?? true;
  },
};

// true (final), false (not yet), or a message (right but to tidy).
export function isFinal(cfg, node) {
  return (TARGETS[cfg.target || 'any'] || TARGETS.any)(node, cfg);
}

export const start = (cfg) => cfg.start;

const GOALS = new Map();
function parseGoal(cfg) {
  if (!GOALS.has(cfg.goal)) GOALS.set(cfg.goal, parse(cfg.goal, { vars: cfg.vars }));
  return GOALS.get(cfg.goal);
}
const SUBSTS = new Map();
function substOf(cfg) {
  if (!cfg.subst) return null;
  const key = JSON.stringify(cfg.subst);
  if (!SUBSTS.has(key)) SUBSTS.set(key, Object.fromEntries(Object.entries(cfg.subst).map(([k, t]) => [k, parse(t, { vars: cfg.vars })])));
  return SUBSTS.get(key);
}

function witnessMessage(r, cfg) {
  if (r.undecided) return 'Je n\'arrive pas à comparer cette ligne avec la précédente : vérifie qu\'elle est définie.';
  if (!r.witness) return 'Cette ligne n\'est pas égale à la précédente.';
  const [v] = Object.keys(r.witness.env);
  const [a, b] = r.witness.values;
  const at = v ? `En ${v} = ${frNum(r.witness.env[v])}, ` : '';
  return `${at}la ligne précédente vaut ${frNum(a)}, mais ta ligne vaut ${frNum(b)}.`;
}

export function judgeLine(cfg, prev, input, state = {}) {
  const read = readLine(cfg, input);
  if (read.error) return read.error;
  const { node } = read;
  if (node.t === 'rel') return { kind: 'parse', node, message: 'Écris seulement l\'expression, sans « = » au milieu.' };
  if (sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  if (cfg.rel) return judgeBound(cfg, prev, node);
  const opts = { vars: cfg.vars, domain: cfg.domain, seed: cfg.seed ?? seedOf(toText(prev)) };
  const map = substOf(cfg);
  const D = (n) => (cfg.defs ? expandFns(n, cfg.defs, cfg.vars?.[0] || 'x') : cfg.implicit ? implicitDerivs(n, cfg) : n);
  const S = (n) => (map ? substSyms(expandDerivs(D(n)), map) : expandDerivs(D(n)));
  const r = equivalent(S(prev), S(node), opts);
  if (!r.equal) {
    const same = (cand, line) => equivalent(S(cand), S(line), opts).equal;
    const diag = diagnoseLine('equiv', prev, node, cfg, same);
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, witness: r.witness ?? null, message: witnessMessage(r, cfg) };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais ${fin.charAt(0).toLowerCase()}${fin.slice(1)}` };
  state.lines = (state.lines || 0) + 1;
  return { kind: 'ok', node };
}

// cfg.implicit = {y: 'p'}: every first derivative d(e) in x replaced by
// ∂e/∂x + p·∂e/∂y (y′ = d(y) becomes p).
export function implicitDerivs(node, cfg) {
  const v = cfg.vars?.[0] || 'x';
  return mapNode(node, (n) => {
    if (n.t !== 'deriv' || n.n !== 1 || n.v !== v) return n;
    let out = diff(n.e, v);
    for (const [y, p] of Object.entries(cfg.implicit)) out = add(out, mul(symNode(p), diff(n.e, y)));
    return { t: 'paren', e: out };
  });
}

// ---------- chains of inequalities (step U1b, G1 catalogue « ajout 4 ») ----------
// cfg.rel '≤' (or '≥'): a line is right if prev ≤ line (or ≥) at every point
// of the domain {v: [lo, hi]}: 400 points and the ends. Final form: a number
// written out, within cfg.bound when the question gives one.

const BOUND_POINTS = 400;
function boundPoints(cfg) {
  const v = cfg.vars?.[0] || 'x';
  const [lo, hi] = cfg.domain?.[v] || [-3, 3];
  const xs = [];
  for (let i = 0; i <= BOUND_POINTS; i++) xs.push(lo + ((hi - lo) * i) / BOUND_POINTS);
  return { v, xs };
}

// The first point where the line is not a bound of prev, or null.
export function boundWitness(cfg, prev, node) {
  const { v, xs } = boundPoints(cfg);
  const sign = cfg.rel === '≥' ? -1 : 1;
  for (const x of xs) {
    const a = evalFloat(expandDerivs(prev), { [v]: x });
    if (!Number.isFinite(a)) continue;
    const b = evalFloat(expandDerivs(node), { [v]: x });
    if (!Number.isFinite(b) || sign * (a - b) > 1e-9 * (1 + Math.abs(a) + Math.abs(b))) return { [v]: x, a, b };
  }
  return null;
}

function judgeBound(cfg, prev, node) {
  const w = boundWitness(cfg, prev, node);
  const v = cfg.vars?.[0] || 'x';
  if (w) {
    const opts = { vars: cfg.vars, domain: cfg.domain, seed: seedOf(toText(prev)) };
    const same = (cand, line) => equivalent(cand, line, opts).equal;
    const diag = diagnoseLine('equiv', prev, node, cfg, same);
    const word = cfg.rel === '≥' ? 'plus grande' : 'plus petite';
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, witness: w, message: `En ${v} = ${frNum(w[v])}, ta ligne vaut ${frNum(w.b)}, ${word} que la précédente (${frNum(w.a)}) : ce n'est pas une ${cfg.rel === '≥' ? 'minoration' : 'majoration'}.` };
  }
  if (contains(node, (x) => x.t === 'sym' && x.name === v)) return { kind: 'ok', node };
  const q = exactValue(node);
  const val = q ? q.valueOf() : evalFloat(node, {});
  if (cfg.bound !== undefined) {
    const B = exactValue(parse(String(cfg.bound)))?.valueOf();
    if ((cfg.rel === '≥' ? val < B : val > B) && Math.abs(val - B) > 1e-12) return { kind: 'stay', node, message: `C'est une ${cfg.rel === '≥' ? 'minoration' : 'majoration'}, mais elle ${cfg.rel === '≥' ? 'est plus petite' : 'dépasse'} la borne demandée : sois plus précis.` };
  }
  if (!TARGETS.constant(node)) return { kind: 'stay', node, message: "C'est juste, mais calcule ce nombre." };
  return { kind: 'done', node };
}

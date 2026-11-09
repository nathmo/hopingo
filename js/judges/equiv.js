// Judge `equiv` (spec §5.2): a line is right if it is equivalent to the
// previous one, after every d(…) is replaced by its value. cfg:
//   {vars, domain, target, dvar, seed}
// target (final form):
//   'any'       every right line is final
//   'no-prime'  no d(…) or ′ left, and a tidy product: no ·1, no 0·,
//               numbers multiplied out (§5.2, G6 catalogue)
//   'partial-fractions'  a polynomial part plus c/(x − a)ᵏ and (bx + c)/(x² + px + q)
//               with Δ < 0, each denominator once (G0 catalogue)

import { expandDerivs, hasDeriv } from '../cas/diff.js';
import { equivalent, seedOf } from '../cas/equiv.js';
import { numValue, stripParen } from '../cas/ast.js';
import { toText } from '../cas/print.js';
import { polyOf, qCoeffs, discriminant, sumTerms, productFactors } from '../cas/polyx.js';
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

const TARGETS = {
  any: () => true,
  'factored-den': (node) => factoredDen(node),
  'partial-fractions': (node) => partialFractions(node),
  'no-prime': (node) => {
    if (hasDeriv(node)) return false;
    return presentationIssue(node) ?? true;
  },
};

// true (final), false (not yet), or a message (right but to tidy).
export function isFinal(cfg, node) {
  return (TARGETS[cfg.target || 'any'] || TARGETS.any)(node, cfg);
}

export const start = (cfg) => cfg.start;

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
  const opts = { vars: cfg.vars, domain: cfg.domain, seed: cfg.seed ?? seedOf(toText(prev)) };
  const r = equivalent(expandDerivs(prev), expandDerivs(node), opts);
  if (!r.equal) {
    const same = (cand, line) => equivalent(expandDerivs(cand), expandDerivs(line), opts).equal;
    const diag = diagnoseLine('equiv', prev, node, cfg, same);
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, witness: r.witness ?? null, message: witnessMessage(r, cfg) };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais ${fin.charAt(0).toLowerCase()}${fin.slice(1)}` };
  state.lines = (state.lines || 0) + 1;
  return { kind: 'ok', node };
}

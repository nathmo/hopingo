// Counter-examples (spec §6 `tf` and `example`, step U1): checking what the
// student gives to refute a statement.
//
// counter = {kind, ask:[{v, label, keys}], answer: {v: text}, …}:
//   refute     {quants: [{q:'∀'|'∃', v, dom}], pred, hyp?}
//              The statement is Q₁v₁ … Qₖvₖ, pred. A counter-example gives
//              each ∀ variable a value, possibly an expression of the ∃
//              variables written before it (∃y ∀x: x = y + 1). It is
//              accepted if pred is false for every value of the ∃ variables
//              (sampled on their domain). dom: 'R', 'R+', 'N', 'N*', 'Z',
//              [list of numbers] or 'sets' (finite sets of integers).
//              hyp: with an implication, a value that makes the hypothesis
//              false names the trap g9_counter_not_hyp.
//   truth      {left, right, letters}: values of P, Q… where the two
//              formulas differ (answer: {P: true, Q: false})
//   poly       {conds: […], complex?}: a polynomial P(x) with the conditions
//              {at, eq} P(at) = eq, {at, ne} P(at) ≠ ne, {degree}, {noRealRoot},
//              {mult: {at, k}} multiplicity of at equal to k, {minMult: {at, k}}
//   composite  {expr, v}: n ∈ ℕ with expr(n) not prime
//   sequence, function (step U4): see js/judges/counters.js
//   complex (step U4, G8): see js/judges/counters-complex.js
//   heredity   {v, from}: a property P(n) (a condition in n) whose heredity
//              P(n) ⇒ P(n + 1) holds for n = from … from + 40, but which is
//              false for some n: heredity alone proves nothing (answer: {P})
// checkCounter(counter, answers) → {ok, message?, rule?}

import { Q } from '../math/rational.js';
import { parse, tryParse } from '../cas/parse.js';
import { mapNode, lit } from '../cas/ast.js';
import { exactValue } from '../cas/normal.js';
import { evalFloat } from '../cas/numeric.js';
import { closedHolds, setValue, isFiniteSet } from '../cas/sets.js';
import { lexicon, parseFormula, truthOf } from '../cas/logic.js';
import { polyOf, coeffs, qCoeffs, degree, divide, I } from '../cas/polyx.js';
import { Poly, gcdPoly } from '../cas/poly.js';
import { checkSeqFn } from './counters.js';
import { checkComplexCounter } from './counters-complex.js';

const SAMPLES = {
  R: ['-3', '-2', '-1', '-1/2', '0', '1/3', '1/2', '1', '2', '5/2', '3', '7'],
  'R+': ['1/10', '1/3', '1/2', '1', '2', '3', '7/2', '10'],
  N: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '10', '12'],
  'N*': ['1', '2', '3', '4', '5', '6', '7', '8', '10', '12'],
  Z: ['-6', '-3', '-2', '-1', '0', '1', '2', '3', '4', '7'],
};

const DOM_NAME = { R: 'ℝ', 'R+': ']0 ; +∞[', N: 'ℕ', 'N*': 'ℕ*', Z: 'ℤ', sets: 'les ensembles d\'entiers' };

function inDomain(val, dom) {
  if (dom === 'sets') return val.set !== undefined;
  const q = val.q;
  const x = val.x;
  if (!Number.isFinite(x)) return false;
  if (Array.isArray(dom)) return dom.some((d) => Math.abs(Number(d) - x) < 1e-12);
  if (dom === 'R') return true;
  if (dom === 'R+') return x > 0;
  const isInt = q ? q.d === 1 : Number.isInteger(x);
  if (dom === 'Z') return isInt;
  if (dom === 'N') return isInt && x >= 0;
  if (dom === 'N*') return isInt && x >= 1;
  return true;
}

const samplesOf = (dom) => (Array.isArray(dom) ? dom.map(String) : SAMPLES[dom] ?? SAMPLES.R);

// Replace the variables of env in a node: numbers as fractions, sets as nodes.
function substitute(node, env) {
  return mapNode(node, (n) => {
    if (n.t !== 'sym' || n.sub || !(n.name in env)) return n;
    const v = env[n.name];
    if (v.set) return v.node;
    return v.q ? { t: 'paren', e: lit(v.q) } : { t: 'paren', e: { t: 'float', x: v.x } };
  });
}

function valueOfAnswer(text, env, dom) {
  const node = tryParse(String(text).replace(/^\s*[A-Za-zα-ω]\s*=/, ''), { vars: Object.keys(env) });
  if (!node) return null;
  if (dom === 'sets') {
    try {
      const S = setValue(node, {});
      if (!isFiniteSet(S)) return null;
      return { set: S, node };
    } catch { return null; }
  }
  const closed = substitute(node, env);
  const q = exactValue(closed);
  if (q) return { q, x: q.n / q.d };
  const x = evalFloat(closed, {});
  return Number.isFinite(x) ? { x } : null;
}

function predHolds(pred, env) {
  const node = substitute(typeof pred === 'string' ? parse(pred) : pred, env);
  return closedHolds(node, {});
}

function checkRefute(counter, answers) {
  const quants = counter.quants;
  let failure = null;
  const visit = (i, env) => {
    if (failure) return;
    if (i === quants.length) {
      let ok;
      try { ok = !predHolds(counter.pred, env); } catch { ok = false; }
      if (!ok) failure = { env, kind: 'pred' };
      return;
    }
    const { q, v, dom } = quants[i];
    if (q === '∃') {
      for (const s of samplesOf(dom)) {
        const val = dom === 'sets' ? { set: setValue(parse(s), {}), node: parse(s) } : (() => { const qq = exactValue(parse(s)); return { q: qq, x: qq.n / qq.d }; })();
        visit(i + 1, { ...env, [v]: val });
        if (failure) return;
      }
      return;
    }
    const text = answers?.[v];
    if (text === undefined || String(text).trim() === '') { failure = { kind: 'missing', v }; return; }
    const val = valueOfAnswer(text, env, dom);
    if (!val) { failure = { kind: 'read', v }; return; }
    if (!inDomain(val, dom)) { failure = { kind: 'domain', v, dom }; return; }
    visit(i + 1, { ...env, [v]: val });
  };
  visit(0, {});
  if (!failure) return { ok: true };
  if (failure.kind === 'missing') return { ok: false, message: `Donne une valeur pour ${failure.v}.` };
  if (failure.kind === 'read') return { ok: false, message: `Je n'arrive pas à lire la valeur de ${failure.v}.` };
  if (failure.kind === 'domain') return { ok: false, message: `${failure.v} doit être dans ${DOM_NAME[failure.dom] ?? 'le domaine'}.` };
  if (counter.hyp) {
    let hypTrue = true;
    try { hypTrue = predHolds(counter.hyp, failure.env); } catch { hypTrue = true; }
    if (!hypTrue) return { ok: false, rule: 'g9_counter_not_hyp', message: 'Avec cette valeur, l\'hypothèse est fausse : l\'implication est alors vraie. Il faut que l\'hypothèse soit vraie et la conclusion fausse.' };
  }
  return { ok: false, message: 'Avec cette valeur, l\'énoncé est vrai : ce n\'est pas un contre-exemple.' };
}

function checkTruth(counter, answers) {
  const lex = lexicon({ letters: counter.letters });
  const env = {};
  for (const l of counter.letters) {
    if (typeof answers?.[l] !== 'boolean') return { ok: false, message: `Choisis vrai ou faux pour ${l}.` };
    env[l] = answers[l];
  }
  const a = truthOf(parseFormula(counter.left, lex), env);
  const b = truthOf(parseFormula(counter.right, lex), env);
  return a !== b ? { ok: true } : { ok: false, message: `Avec ces valeurs, les deux formules valent ${a ? 'vrai' : 'faux'} : elles ne diffèrent pas.` };
}

// Multiplicity of the rational root a in P.
function multiplicity(P, a) {
  let k = 0;
  let p = P;
  const b = Poly.variable('x').sub(Poly.const(a));
  while (!p.isZero && k < 20) {
    const { q, r } = divide(p, b);
    if (!r.isZero) break;
    p = q;
    k++;
  }
  return k;
}

// Does a polynomial with rational or complex coefficients have a real root?
function hasRealRoot(P) {
  const cs = coeffs(P);
  const re = cs.reduce((s, c, k) => s.add(Poly.monomial([['x', k]], realPart(c))), new Poly());
  const im = cs.reduce((s, c, k) => s.add(Poly.monomial([['x', k]], imagPart(c))), new Poly());
  const g = im.isZero ? re : re.isZero ? im : gcdPoly(re, im, 'x');
  if (g.isZero) return true;
  const gc = qCoeffs(g);
  if (!gc || gc.length <= 1) return false;
  if (gc.length % 2 === 0) return true; // odd degree
  // Even degree: look for a sign change or a zero on a fine grid.
  const f = (x) => gc.reduce((s, c, k) => s + (c.n / c.d) * x ** k, 0);
  let prev = f(-50);
  for (let i = 1; i <= 20000; i++) {
    const y = f(-50 + i * 0.005);
    if (y === 0 || y * prev < 0 || Math.abs(y) < 1e-12) return true;
    prev = y;
  }
  return false;
}
const realPart = (c) => [...c.terms.values()].filter((t) => !t.m.length).reduce((s, t) => s.add(t.c), new Q(0));
const imagPart = (c) => [...c.terms.values()].filter((t) => t.m.length === 1 && t.m[0][0] === I).reduce((s, t) => s.add(t.c), new Q(0));

function checkPoly(counter, answers) {
  const text = answers?.P ?? answers?.p;
  if (!text) return { ok: false, message: 'Écris un polynôme P(x).' };
  const node = tryParse(String(text).replace(/^\s*P(\(x\))?\s*=/, ''), { complex: !!counter.complex });
  const P = node && polyOf(node, { complex: !!counter.complex });
  if (!P || [...P.vars()].some((v) => v !== 'x' && v !== I)) return { ok: false, message: 'Écris un polynôme en x.' };
  for (const c of counter.conds) {
    const at = (a) => {
      const cs = coeffs(P);
      const x = Q.of(a);
      let s = new Poly();
      for (let k = cs.length - 1; k >= 0; k--) s = s.scale(x).add(cs[k]);
      return s;
    };
    if (c.at !== undefined && c.eq !== undefined && !at(c.at).sub(Poly.const(c.eq)).isZero) return { ok: false, message: `Il faut P(${c.at}) = ${c.eq}.` };
    if (c.at !== undefined && c.ne !== undefined && at(c.at).sub(Poly.const(c.ne)).isZero) return { ok: false, message: `Avec ton polynôme, P(${c.at}) = ${c.ne} : ce n'est pas un contre-exemple.` };
    if (c.degree !== undefined && degree(P) !== c.degree) return { ok: false, message: `Il faut un polynôme de degré ${c.degree}.` };
    if (c.noRealRoot && hasRealRoot(P)) return { ok: false, message: 'Ton polynôme a une racine réelle.' };
    if (c.mult && multiplicity(P, c.mult.at) !== c.mult.k) return { ok: false, message: `${c.mult.at} doit être racine de multiplicité ${c.mult.k}.` };
    if (c.minMult && multiplicity(P, c.minMult.at) < c.minMult.k) return { ok: false, message: `(x − ${c.minMult.at})^${c.minMult.k} doit diviser P.` };
    if (c.notMult && multiplicity(P, c.notMult.at) === c.notMult.k) return { ok: false, message: `Avec ton polynôme, ${c.notMult.at} est racine de multiplicité ${c.notMult.k} : l'énoncé est vrai pour lui.` };
  }
  return { ok: true };
}

const isPrime = (n) => {
  if (n < 2 || !Number.isInteger(n)) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
};

function checkComposite(counter, answers) {
  const v = counter.v || 'n';
  const val = valueOfAnswer(answers?.[v] ?? '', {}, 'N');
  if (!val || !inDomain(val, 'N')) return { ok: false, message: `${v} doit être un entier naturel.` };
  const at = mapNode(parse(counter.expr), (n) => (n.t === 'sym' && n.name === v ? { t: 'paren', e: lit(val.q) } : n));
  const k = exactValue(at);
  if (!k || k.d !== 1) return { ok: false, message: 'Je n\'arrive pas à calculer.' };
  return isPrime(k.n) ? { ok: false, message: `Pour ${v} = ${val.q}, on obtient ${k.n}, qui est premier.` } : { ok: true };
}

function checkHeredity(counter, answers) {
  const v = counter.v || 'n';
  const text = String(answers?.P ?? '').replace(/^\s*P\(\s*n\s*\)\s*:?/, '');
  const node = tryParse(text, { vars: [v] });
  if (!node || !['rel', 'chain', 'logic', 'not'].includes(node.t)) return { ok: false, message: `Écris une propriété de ${v}, par exemple une inégalité.` };
  const at = (k) => closedHolds(mapNode(node, (n) => (n.t === 'sym' && n.name === v && !n.sub ? { t: 'paren', e: lit(new Q(k)) } : n)), {});
  const from = counter.from ?? 0;
  let vals;
  try { vals = Array.from({ length: 42 }, (_, i) => at(from + i)); } catch { return { ok: false, message: 'Je n’arrive pas à calculer ta propriété.' }; }
  for (let i = 0; i + 1 < vals.length; i++) {
    if (vals[i] && !vals[i + 1]) return { ok: false, message: `Ton hérédité est fausse : P(${from + i}) est vraie, mais P(${from + i + 1}) est fausse.` };
  }
  if (vals.every(Boolean)) return { ok: false, message: 'Ta propriété est vraie pour tout n : ce n’est pas un contre-exemple.' };
  return { ok: true };
}

export function checkCounter(counter, answers) {
  switch (counter.kind) {
    case 'heredity': return checkHeredity(counter, answers);
    case 'refute': return checkRefute(counter, answers);
    case 'truth': return checkTruth(counter, answers);
    case 'poly': return checkPoly(counter, answers);
    case 'composite': return checkComposite(counter, answers);
    // Step U4: sequences, series and functions (js/judges/counters.js).
    case 'sequence': case 'function': return checkSeqFn(counter, answers);
    // Step U4 (G8): complex numbers (js/judges/counters-complex.js).
    case 'complex': return checkComplexCounter(counter, answers);
    default: return { ok: false, message: 'Contre-exemple non vérifiable.' };
  }
}

// A `tf` item answered: choice true/false, and the counter-example when
// the student says « faux ». → {correct, rule?, message?, needCounter?}
export function judgeTf(item, choice, answers) {
  if (choice !== item.truth) {
    return { correct: false, rule: choice ? item.ruleIfTrue ?? null : item.ruleIfFalse ?? null };
  }
  if (item.truth || !item.counter) return { correct: true };
  if (answers === undefined) return { correct: null, needCounter: true };
  const r = checkCounter(item.counter, answers);
  return { correct: r.ok, rule: r.rule ?? null, message: r.message };
}


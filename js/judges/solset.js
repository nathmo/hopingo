// Judge `solset` (spec §5.2, steps U1a and U1b): a line is right if it has
// the same solution set as the previous one, on the item's domain: a
// condition on v (relations, chains −2 < x ≤ 4, ∧ ∨ ¬, x ∈ …) or a set
// (intervals, finite sets, ∪ ∩ ∖, ℝ ℕ ℤ ∅, set-builder notation).
// js/cas/sets.js compares the sets exactly at their bounds.
//
// cfg: {v, domain: 'R'|'N'|'Z'|set text, sets: {A: text, S_1: text}}, and
// the additions of step U1b (catalogue G, « Ce que ce catalogue ajoute »):
//   subst: {t: 'e^x'}    letters standing for an expression of v: a line
//                        in t is read with t replaced, so « t = 3 ou t = −2 »
//                        is the same line as « eˣ = 3 » (t = −2 gives nothing)
//   exprDomain: true     a line that is an expression (not a condition)
//                        stands for the set where it is defined (g1-domain)
//   onDomain: true       the lines in between are compared on D₀, the
//                        domain of the part's first line (merging two
//                        logarithms widens the domain); a line in final form
//                        must give the true solution set. A line « D = … »
//                        (or D_f) is checked against D₀ and does not replace
//                        the equation.
//   periodic: true       trigonometry (step U1b, G3): the letter k is an
//                        integer; x = π/6 + 2kπ, {π/6 + 2kπ ; …} and
//                        ]a + 2kπ ; b + 2kπ[ are families. Sets on ℝ are
//                        compared on the window [−13 ; 13] (cfg.window);
//                        final form in families, or without k on a bounded
//                        domain.
//   defs: {f: text}     functions declared by the item (with cfg.funcs):
//                        expanded before the set is computed (g1-compose)
//   params: {m: set}     a parameter: the lines are compared for sample
//                        values of m in its set (a case of the discussion);
//                        interval bounds may hold m.
// Cases are parts (segments) whose `domain` is the case, then a part that
// joins them with `sets` (S₁ ∪ S₂).
// state (per part): start, ref (true solution set), lastEq, and what a
// decision set: superset (squaring without condition: a line may hold more
// solutions until it is checked; the final line must be exact).
// Final form: a union of disjoint sorted intervals, a finite set written
// out, ∅, or « v = 3 » (a single solution).

import {
  solutionSet, setEqual, setWitness, finalForm, domainOf, substSyms, expandFns, intersect, minus, union, isSetNode,
} from '../cas/sets.js';
import { parse } from '../cas/parse.js';
import { toText, toReadable } from '../cas/print.js';
import { lit, mapNode, stripParen, contains } from '../cas/ast.js';
import { evalFloat } from '../cas/numeric.js';
import { Q } from '../math/rational.js';
import { diagnoseLine } from './diagnose.js';
import { readLine, sameLine, frNum } from './common.js';

const asNode = (x) => (typeof x === 'string' ? parse(x) : x);
const substMap = (cfg) => Object.fromEntries(Object.entries(cfg.subst || {}).map(([k, t]) => [k, asNode(t)]));
const paramNames = (cfg) => Object.keys(cfg.params || {});

// Letters a line may use: the variable, the substituted letters, the
// parameters, the named sets (S₁ is read as S_1) and D for the domain.
const lineCfg = (cfg) => ({
  ...cfg,
  vars: [cfg.v || 'x', ...Object.keys(cfg.subst || {})],
  params: [...Object.keys(cfg.sets || {}).map((k) => (k.includes('_') ? `${k.split('_')[0]}_` : k)), ...paramNames(cfg), 'D', 'D_', ...(cfg.periodic ? [cfg.kVar || 'k'] : [])],
});

// Sample values of the parameters, in their sets: whole numbers and halves
// in [−6 ; 6], the closed ends included. → [{m: Q}]
const SAMPLE_CACHE = new Map();
function paramSamples(cfg) {
  const names = paramNames(cfg);
  if (!names.length) return [{}];
  const key = JSON.stringify(cfg.params);
  if (SAMPLE_CACHE.has(key)) return SAMPLE_CACHE.get(key);
  const per = names.map((m) => {
    const S = solutionSet(asNode(cfg.params[m] ?? 'ℝ'), { v: m });
    const vals = [];
    for (let k = -12; k <= 12; k++) {
      const q = new Q(k, 2);
      if (S.parts.some((p) => (p.lo.x < q.valueOf() || (p.loC && p.lo.x === q.valueOf())) && (q.valueOf() < p.hi.x || (p.hiC && p.hi.x === q.valueOf())))) vals.push(q);
    }
    // Whole numbers first, spread over the set; halves when there are few.
    const ints = vals.filter((q) => q.d === 1);
    const spread = (xs, k) => (xs.length <= k ? xs : Array.from({ length: k }, (_, i) => xs[Math.round((i * (xs.length - 1)) / (k - 1))]));
    const out = spread(ints, 5);
    for (const q of vals) { if (out.length < 5 && !out.some((x) => x.eq(q))) out.push(q); }
    return out.map((q) => [m, q]);
  });
  // One sample per value of the first parameter, the others cycling.
  const n = Math.max(...per.map((x) => x.length));
  const samples = [];
  for (let i = 0; i < n; i++) samples.push(Object.fromEntries(per.map((x) => x[i % x.length]).filter(Boolean)));
  SAMPLE_CACHE.set(key, samples);
  return samples;
}

const withParams = (node, env) => mapNode(node, (n) => (n.t === 'sym' && !n.sub && env[n.name] ? { t: 'paren', e: lit(env[n.name]) } : n));
const baseCfg = (cfg) => ({ v: cfg.v || 'x', domain: cfg.domain, sets: cfg.sets, ...(cfg.periodic ? { periodic: true, window: cfg.window, kVar: cfg.kVar } : {}) });

const isCondition = (n) => ['rel', 'chain', 'in', 'not', 'logic', 'list'].includes(stripParen(n).t);
const isDomainLine = (node) => {
  const n = stripParen(node);
  return n.t === 'rel' && n.op === '=' && stripParen(n.l).t === 'sym' && stripParen(n.l).name === 'D' && isSetNode(n.r, {});
};

// The solution set of a line, for parameter values env.
function lineSet(node, cfg, env = {}) {
  let n = substSyms(withParams(cfg.defs ? expandFns(node, cfg.defs, cfg.v || 'x') : node, env), substMap(cfg));
  if (isDomainLine(n)) n = stripParen(n).r;
  if (cfg.exprDomain && !isCondition(n) && !isSetNode(n, baseCfg(cfg))) return domainOf(n, baseCfg(cfg));
  return solutionSet(n, baseCfg(cfg));
}

// The domain of the part's first line (onDomain).
// cfg.onDomainOf (text): the lines are compared where this expression is
// defined instead (t = tan(x/2): away from x = π + 2kπ, G3).
const startDomain = (start, cfg, env = {}) => domainOf(cfg.onDomainOf ? asNode(cfg.onDomainOf) : substSyms(withParams(start, env), substMap(cfg)), baseCfg(cfg));

export const setOf = (node, cfg) => lineSet(node, cfg);

// Final form, the parameters replaced by a sample value.
export function isFinal(cfg, node) {
  try {
    const params = paramNames(cfg);
    if (!params.length) return finalForm(node, cfg);
    if (contains(node, (x) => x.t === 'sym' && x.name === (cfg.v || 'x') && !x.sub) && !finalShapeX(node, cfg)) return false;
    return finalForm(withParams(node, paramSamples(cfg)[0]), { ...cfg, params: undefined, loose: true });
  } catch { return false; }
}
// With parameters: « x = m + 1 » or a set with bounds in m (no x inside).
function finalShapeX(node, cfg) {
  const n = stripParen(node);
  const v = cfg.v || 'x';
  return n.t === 'rel' && n.op === '=' && stripParen(n.l).t === 'sym' && stripParen(n.l).name === v && !contains(n.r, (x) => x.t === 'sym' && x.name === v);
}

export const start = (cfg) => cfg.start;

function numText(w) {
  if (w.q) return toReadable(lit(w.q));
  return frNum(w.x, 3);
}

function witnessMessage(w, cfg, env = {}) {
  const pre = Object.keys(env).length ? `Pour ${Object.entries(env).map(([k, q]) => `${k} = ${toReadable(lit(q))}`).join(', ')} : ` : '';
  if (!w) return `${pre}Ta ligne ne décrit pas le même ensemble que la précédente.`;
  const v = cfg.v || 'x';
  const x = numText(w);
  const discrete = cfg.domain === 'N' || cfg.domain === 'Z';
  if (discrete) {
    return pre + (w.inA
      ? `${x} est dans l'ensemble de la ligne précédente, mais pas dans le tien.`
      : `${x} est dans ton ensemble, mais pas dans celui de la ligne précédente.`);
  }
  return pre + (w.inA
    ? `${v} = ${x} est solution de la ligne précédente, mais pas de ta ligne.`
    : `${v} = ${x} est solution de ta ligne, mais pas de la ligne précédente.`);
}

// A sub-expression without the variable that does not exist: ln(−2), √(−4).
function undefinedPart(node, cfg) {
  const letters = new Set([cfg.v || 'x', ...Object.keys(cfg.subst || {}), ...paramNames(cfg)]);
  let bad = null;
  const visit = (n) => {
    if (bad || !n || typeof n !== 'object') return;
    if (['fn', 'sqrt', 'root', 'pow', 'frac'].includes(n.t) && !contains(n, (x) => x.t === 'sym')) {
      if (contains(n, (x) => x.t === 'set')) return;
      const val = evalFloat(n, {});
      if (Number.isNaN(val)) { bad = n; return; }
    }
    for (const k of ['e', 'l', 'r', 'n', 'd', 'b']) if (n[k] && typeof n[k] === 'object') visit(n[k]);
    for (const k of ['args', 'items', 'terms']) if (Array.isArray(n[k])) n[k].forEach(visit);
    if (n.t === 'set' && n.kind === 'interval') { visit(n.lo); visit(n.hi); }
  };
  visit(node);
  if (bad && contains(bad, (x) => x.t === 'sym' && letters.has(x.name))) return null;
  return bad;
}

const sets = (cfg, fn) => paramSamples(cfg).map((env) => ({ env, ...fn(env) }));

export function judgeLine(cfg, prevIn, input, state = {}) {
  const read = readLine(lineCfg(cfg), input);
  if (read.error) return read.error;
  const { node } = read;
  if (!state.start) state.start = prevIn;
  const prev = isDomainLine(prevIn) ? (state.lastEq ?? state.start) : prevIn;
  if (sameLine(node, prevIn)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  const bad = undefinedPart(node, cfg);
  if (bad) {
    const diag = diagnoseLine('solset', prev, node, cfg, (cand, line) => !!undefinedPart(cand, cfg) && sameSet(cand, line, cfg));
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: `${toReadable(bad)} n'existe pas : ${bad.t === 'sqrt' ? 'on ne prend la racine que d\'un nombre ≥ 0' : 'regarde le signe de ce qui est dedans'}.` };
  }
  // A domain line: checked against the domain of the first line.
  if ((cfg.onDomain || cfg.domainLine) && isDomainLine(node)) {
    for (const env of paramSamples(cfg)) {
      let D;
      let B;
      try { D = startDomain(state.start, cfg, env); B = lineSet(stripParen(node).r, cfg, env); } catch { return { kind: 'parse', node, message: 'Écris le domaine comme un ensemble : D = ]1 ; +∞[.' }; }
      if (!setEqual(D, B)) {
        const w = setWitness(D, B);
        const diag = diagnoseLine('solset', prev, node, cfg, (cand, line) => sameSet(cand, line, cfg));
        const x = w ? numText(w) : '';
        return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, witness: w, message: w ? (w.inA ? `En ${cfg.v || 'x'} = ${x}, tout est défini : ${x} est dans le domaine.` : `En ${cfg.v || 'x'} = ${x}, une expression n'est pas définie : ${x} n'est pas dans le domaine.`) : 'Ce n\'est pas le domaine.' };
      }
    }
    state.domain = true;
    state.lastEq = prev;
    return { kind: 'ok', node, note: 'Domaine' };
  }
  let checks;
  try {
    checks = sets(cfg, (env) => {
      const A = lineSet(prev, cfg, env);
      const B = lineSet(node, cfg, env);
      if (!state.ref) state.ref = {};
      const k = JSON.stringify(env);
      if (!state.ref[k]) state.ref[k] = lineSet(state.start, cfg, env);
      return { A, B, ref: state.ref[k] };
    });
  } catch (e) {
    try { sets(cfg, (env) => ({ A: lineSet(prev, cfg, env) })); } catch { return { kind: 'parse', node, message: 'Je n\'arrive pas à lire la ligne précédente.' }; }
    return { kind: 'parse', node, message: `Écris une condition sur ${cfg.v || 'x'} (par exemple ${cfg.v || 'x'} < 3) ou un ensemble (par exemple ]1 ; 4]).` };
  }
  const fin = isFinal(cfg, node);
  const wrong = (env, A, B, fromStart = false) => {
    const same = (cand, line) => sameSet(cand, line, cfg);
    const diag = diagnoseLine('solset', prev, node, cfg, same);
    const w = setWitness(A, B);
    let message = witnessMessage(w, cfg, env);
    if (fromStart && w && !cfg.domain) message = message.replace('de la ligne précédente', "de l'énoncé");
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, witness: w, message };
  };
  let note;
  for (const { env, A, B, ref } of checks) {
    if (state.superset) {
      // Squared without its condition: the line may hold more solutions.
      if (minus(ref, B).parts.length) return wrong(env, ref, B, true);
      if (fin !== false && !setEqual(ref, B)) note = 'Vérifie maintenant chaque solution dans l\'équation de départ : élever au carré a pu en ajouter.';
      continue;
    }
    if (cfg.onDomain && fin === false) {
      const D = startDomain(state.start, cfg, env);
      const a = intersect(A, D);
      const b = intersect(B, D);
      if (!setEqual(a, b)) return wrong(env, a, b);
      continue;
    }
    if (cfg.onDomain && !setEqual(ref, B)) {
      // « x = 3 ou x = −3 » before sorting: right on the domain, still to sort.
      const D = startDomain(state.start, cfg, env);
      if (!isSetNode(stripParen(node), baseCfg(cfg)) && setEqual(intersect(B, D), ref) && setEqual(intersect(A, D), ref)) { note = 'Garde maintenant seulement les solutions qui sont dans le domaine.'; continue; }
      return wrong(env, ref, B, true);
    }
    if (!cfg.onDomain && !setEqual(A, B)) return wrong(env, A, B);
  }
  state.lastEq = node;
  if (note) return { kind: 'ok', node, note };
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais ${fin.charAt(0).toLowerCase()}${fin.slice(1)}` };
  return { kind: 'ok', node };
}

// The judge's equivalence, for the diagnosis: same set for every sample of
// the parameters.
function sameSet(cand, line, cfg) {
  return paramSamples(cfg).every((env) => setEqual(lineSet(cand, cfg, env), lineSet(line, cfg, env)));
}

export const text = (cfg, node) => toText(node);
export { union };

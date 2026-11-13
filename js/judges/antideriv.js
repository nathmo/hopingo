// Judge `antideriv` (spec §5.2, §4.4, step U2): primitives are compared by
// differentiation, never directly, so F and F + 3 are both right. A line
// is G + ∫h dv + … [+ C]: its derivative is G′ + h. It is right if that
// derivative is the derivative of the previous line (so the first line
// ∫ f dx gives f). cfg:
//   {v, vars?, domain?, subst?: {t: 'sqrt(x)'}}
// subst: lines may be written in t = φ(x) (a change of variable): a line in
// t is differentiated in t, then t is replaced by φ(x) and the result
// multiplied by φ′(x). A decision may also put {subst} in the judge's state.
// A line without ∫ must also be defined where the integrand is (ln x is not
// a primitive of 1/x on ℝ*).
// Final form: no ∫ left, no letter of a substitution, and « + C ».

import { parse } from '../cas/parse.js';
import { contains, dependsOn, symbolsIn, mapNode } from '../cas/ast.js';
import { diff } from '../cas/diff.js';
import { equivalent, seedOf } from '../cas/equiv.js';
import { evalFloat, sample } from '../cas/numeric.js';
import { makeRng } from '../content/random.js';
import { toText } from '../cas/print.js';
import { t as tr } from '../i18n.js';
import { diagnoseLine } from './diagnose.js';
import { readLine, sameLine, frNum, parseOpts } from './common.js';
import { presentationIssue } from './equiv.js';
// Step U10: potentials and harmonic conjugates (cfg.grad).
import { judgePotential, isFinalPotential, readPotential } from './potential.js';

export const sign = '=';
const vOf = (cfg) => cfg.v || 'x';

const SUBSTS = new Map();
function substOf(cfg, state = {}) {
  if (state.subst) return state.subst;
  if (!cfg.subst) return null;
  const key = JSON.stringify(cfg.subst);
  if (!SUBSTS.has(key)) SUBSTS.set(key, Object.fromEntries(Object.entries(cfg.subst).map(([k, t]) => [k, parse(t, { vars: [vOf(cfg)] })])));
  return SUBSTS.get(key);
}
const varsOf = (cfg) => [...new Set([...(cfg.vars || [vOf(cfg)]), 'C', ...Object.keys(cfg.subst || {})])];

// d/dv of a line, as an expression of v.
export function derivOf(cfg, node, state = {}) {
  const v = vOf(cfg);
  const map = substOf(cfg, state);
  if (map) {
    for (const [t, phi] of Object.entries(map)) {
      if (!dependsOn(node, t)) continue;
      if (dependsOn(node, v)) throw new Error('mixed');
      const dt = diff(node, t);
      const back = mapNode(dt, (n) => (n.t === 'sym' && n.name === t && !n.sub ? { t: 'paren', e: phi } : n));
      return { t: 'bin', op: '×', l: { t: 'paren', e: back }, r: { t: 'paren', e: diff(phi, v) } };
    }
  }
  return diff(node, v);
}

const opts = (cfg, prev) => ({ vars: [vOf(cfg), ...(cfg.params || [])], domain: cfg.domain, seed: cfg.seed ?? seedOf(toText(prev)) });

export function sameDerivative(cfg, a, b, state = {}) {
  try { return equivalent(derivOf(cfg, a, state), derivOf(cfg, b, state), opts(cfg, a)).equal; } catch { return false; }
}

// A point of the domain where the integrand is defined but the line is not.
function undefinedAt(cfg, dprev, node, state = {}) {
  if (contains(node, (n) => n.t === 'int')) return null;
  const v = vOf(cfg);
  // A line in t = φ(x) is evaluated at t = φ(x).
  const map = substOf(cfg, state);
  if (map) node = mapNode(node, (n) => (n.t === 'sym' && !n.sub && map[n.name] ? { t: 'paren', e: map[n.name] } : n));
  const rng = makeRng(seedOf(toText(node)));
  for (const env of sample([v, ...(cfg.params || [])], cfg.domain || {}, rng, 16)) {
    const f = evalFloat(dprev, env);
    if (!Number.isFinite(f)) continue;
    const y = evalFloat(node, { ...env, C: 0 });
    if (Number.isNaN(y)) return env;
  }
  return null;
}

export function isFinal(cfg, node, state = {}) {
  if (cfg.grad) return isFinalPotential(cfg, node, state); // step U10
  if (contains(node, (n) => n.t === 'int')) return false;
  const map = substOf(cfg, state);
  if (map && Object.keys(map).some((t) => dependsOn(node, t))) return false;
  if (!symbolsIn(node).has('C')) return tr('N\'oublie pas la constante : ajoute + C.');
  let dc;
  try { dc = equivalent(diff(node, 'C'), parse('1'), { vars: [vOf(cfg), 'C'], domain: cfg.domain }).equal; } catch { dc = false; }
  if (!dc) return tr('La constante s\'ajoute seule : écris … + C.');
  return presentationIssue(node) ?? true;
}

export const start = (cfg) => cfg.start;

// Lines are read by the CAS; with cfg.grad, the unknown functions α(y, z)… too.
export const parseLine = (cfg, text) => (cfg.grad ? readPotential(cfg, text).node : parse(text, parseOpts(cfg)));

export function judgeLine(cfg, prev, input, state = {}) {
  if (cfg.grad) return judgePotential(cfg, prev, input, state); // step U10: ∇φ = F
  const read = readLine({ ...cfg, vars: varsOf(cfg) }, input);
  if (read.error) return read.error;
  const { node } = read;
  if (node.t === 'rel') return { kind: 'parse', node, message: tr('Écris seulement l\'expression, sans « = » au milieu.') };
  if (sameLine(node, prev)) return { kind: 'same', node, message: tr('Avance d\'au moins une étape.') };
  let da;
  let db;
  try { da = derivOf(cfg, prev, state); } catch { da = null; }
  try { db = derivOf(cfg, node, state); } catch (e) {
    return { kind: 'wrong', node, message: e.message === 'mixed' ? tr('N\'écris qu\'une seule variable par ligne : tout en x, ou tout en t.') : tr('Je n\'arrive pas à dériver ta ligne pour la vérifier.') };
  }
  const o = opts(cfg, prev);
  const r = da ? equivalent(da, db, o) : { equal: true };
  if (!r.equal) {
    const diag = diagnoseLine('antideriv', prev, node, cfg, (cand, line) => sameDerivative(cfg, cand, line, state));
    let message = tr('Dérive ta ligne : tu ne retrouves pas la fonction à intégrer.');
    if (r.witness) {
      const v = vOf(cfg);
      const [x, y] = r.witness.values;
      message = tr('Dérive ta ligne pour la contrôler : en {v} = {at}, elle donne {y} au lieu de {x}.', { v, at: frNum(r.witness.env[v]), y: frNum(y), x: frNum(x) });
    }
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, witness: r.witness ?? null, message };
  }
  const bad = da ? undefinedAt(cfg, da, node, state) : null;
  if (bad) {
    const v = vOf(cfg);
    const diag = diagnoseLine('antideriv', prev, node, cfg, (cand, line) => toText(cand) === toText(line) || (sameDerivative(cfg, cand, line, state) && !!undefinedAt(cfg, da, cand, state)));
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: tr('Ta primitive n\'est pas définie en {v} = {at}, alors que la fonction à intégrer l\'est.', { v, at: frNum(bad[v]) }) };
  }
  const fin = isFinal(cfg, node, state);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: tr('C\'est juste, mais {rest}', { rest: `${fin.charAt(0).toLowerCase()}${fin.slice(1)}` }) };
  state.lines = (state.lines || 0) + 1;
  return { kind: 'ok', node };
}

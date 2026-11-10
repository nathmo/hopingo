// Judge `bound` (spec §16.2 « limit … ligne bound »; catalogue A2, « Lignes
// d'étape », point 2; step U6): bounding |f(r cos φ, r sin φ) − L| by a
// function of r alone that tends to 0. cfg:
//   {vars: ['r', 'φ'], r?: [0, 0.5]}
// The start line is the expression to bound (its absolute value is meant);
// each line must bound the previous one (|prev| ≤ line) at 400 points
// (r, φ) of ]0 ; r₁] × [0 ; 2π[ (relative margin 1e−9). Final form: a line
// without φ whose limit as r → 0⁺ is 0. A bound that still depends on φ is
// `stay` (« majore |cos φ| et |sin φ| par 1 »), one that does not tend to 0
// is `stay` too.

import { parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { toText } from '../cas/print.js';
import { symbolsIn, unparen, equalsStructural } from '../cas/ast.js';
import { compileFloat } from '../cas/numeric.js';
import { limit } from '../cas/limit.js';
import { diagnoseLine } from './diagnose.js';
import { frNum } from './common.js';

export const sign = '≤';
const names = (cfg) => cfg.vars || ['r', 'φ'];

export const parseLine = (cfg, text) => parse(String(text).replace(/^\s*(≤|<=)/, ''), { vars: names(cfg) });
export const show = (cfg, node, opts = {}) => toMathML(unparen(node), opts);
export const text = (cfg, node) => toText(node);
export const start = (cfg) => cfg.start;

// The first grid point where |prev| > line, or null.
export function boundWitness2(cfg, prev, node) {
  const [r, p] = names(cfg);
  const [lo, hi] = cfg.r || [0, 0.5];
  const A = compileFloat(prev);
  const B = compileFloat(node);
  for (let i = 1; i <= 20; i++) {
    const rv = lo + ((hi - lo) * i) / 20;
    for (let j = 0; j < 20; j++) {
      const pv = (2 * Math.PI * (j + 0.31)) / 20;
      const env = { [r]: rv, [p]: pv };
      const a = Math.abs(A(env));
      if (!Number.isFinite(a)) continue;
      const b = B(env);
      if (!Number.isFinite(b) || a - b > 1e-9 * (1 + a + Math.abs(b))) return { env, a, b };
    }
  }
  return null;
}

export function isFinal(cfg, node) {
  const [r, p] = names(cfg);
  if (symbolsIn(node).has(p)) return 'Ta borne dépend encore de φ : majore |cos φ| et |sin φ| par 1.';
  let lim;
  try { lim = limit(node, r, '0', '+'); } catch { lim = { value: null }; }
  const v = lim.value;
  const zero = v !== null && v !== undefined && typeof v !== 'string' && Math.abs(typeof v === 'number' ? v : v.valueOf()) < 1e-9;
  if (!zero) return `Ta borne ne tend pas vers 0 quand ${r} → 0 : elle ne prouve rien.`;
  return true;
}

export function judgeLine(cfg, prev, input, state = {}) {
  let node;
  if (input && typeof input === 'object') node = input;
  else {
    try { node = parseLine(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  const known = new Set(names(cfg));
  const unknown = [...symbolsIn(node)].filter((s) => !known.has(s));
  if (unknown.length) return { kind: 'parse', node, message: `Écris ta borne avec ${names(cfg).join(' et ')} seulement.` };
  if (equalsStructural(unparen(node), unparen(prev), { parens: false })) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  const w = boundWitness2(cfg, prev, node);
  if (w) {
    const diag = diagnoseLine('bound', prev, node, cfg, (cand, line) => !boundWitness2(cfg, cand, line) && !boundWitness2(cfg, line, cand));
    const [r, p] = names(cfg);
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: `En ${r} = ${frNum(w.env[r], 3)}, ${p} = ${frNum(w.env[p], 3)}, la ligne précédente vaut ${frNum(w.a, 4)} en valeur absolue, mais ta borne vaut ${frNum(w.b, 4)} : ce n'est pas une majoration.` };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  return { kind: symbolsIn(node).has(names(cfg)[1]) ? 'ok' : 'stay', node, ...(symbolsIn(node).has(names(cfg)[1]) ? {} : { message: fin }) };
}

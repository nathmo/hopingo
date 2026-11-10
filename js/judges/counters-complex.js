// Counter-examples made of complex numbers (step U4, module G8), for `tf`
// items: js/judges/examples.js hands the kind 'complex' here.
//
// counter = {kind: 'complex', vars: ['z', 'w'], doms?: {n: 'N*'}, pred, hyp?,
//            ask: [{v: 'z', label: 'z₁ =', keys}], answer: {z: '1', w: '-1'}}
// pred and hyp are relations (=, ≠) between expressions of the letters, or
// « et » / « ou » of them, read with i the imaginary unit (|z + w| =
// |z| + |w|, arg(z) = arctan(Im(z)/Re(z)), z^n = 1). A letter takes a
// complex value; doms restricts it ('R', 'N', 'N*', 'Z'). The answer is a
// counter-example when every letter is defined, hyp holds and pred fails.
// checkComplexCounter(counter, answers) → {ok, message?}

import { parse, tryParse } from '../cas/parse.js';
import { stripParen } from '../cas/ast.js';
import { evalComplex, cabs } from '../cas/complex.js';

const DOM_NAME = { R: 'ℝ', N: 'ℕ', 'N*': 'ℕ*', Z: 'ℤ' };

function inDom(z, dom) {
  if (!dom || dom === 'C') return true;
  if (Math.abs(z.im) > 1e-9) return false;
  const x = z.re;
  const whole = Math.abs(x - Math.round(x)) < 1e-9;
  if (dom === 'R') return true;
  if (dom === 'Z') return whole;
  if (dom === 'N') return whole && x > -1e-9;
  if (dom === 'N*') return whole && x > 0.5;
  return true;
}

// true, false, or null (a side is not defined).
function holds(node, env) {
  const n = stripParen(node);
  if (n.t === 'logic' && (n.op === 'and' || n.op === 'or')) {
    const a = holds(n.l, env);
    const b = holds(n.r, env);
    if (a === null || b === null) return null;
    return n.op === 'and' ? a && b : a || b;
  }
  if (n.t === 'not') { const a = holds(n.e, env); return a === null ? null : !a; }
  if (n.t === 'rel' && (n.op === '=' || n.op === '≠')) {
    const a = evalComplex(n.l, env);
    const b = evalComplex(n.r, env);
    if (!a || !b) return null;
    const same = Math.abs(a.re - b.re) + Math.abs(a.im - b.im) <= 1e-9 * (1 + cabs(a) + cabs(b));
    return n.op === '=' ? same : !same;
  }
  return null;
}

export function checkComplexCounter(counter, answers) {
  const env = {};
  for (const v of counter.vars) {
    const label = counter.ask?.find((a) => a.v === v)?.label?.replace(/\s*=\s*$/, '') || v;
    const text = answers?.[v];
    if (text === undefined || String(text).trim() === '') return { ok: false, message: `Donne une valeur pour ${label}.` };
    const node = tryParse(String(text).replace(/^\s*[A-Za-zα-ω][₀-₉0-9_]*\s*=/, ''), { complex: true });
    const z = node && evalComplex(node);
    if (!z) return { ok: false, message: `Je n'arrive pas à lire la valeur de ${label}.` };
    const dom = counter.doms?.[v];
    if (!inDom(z, dom)) return { ok: false, message: `${label} doit être dans ${DOM_NAME[dom] ?? 'le domaine'}.` };
    env[v] = z;
  }
  const read = (t) => parse(t, { complex: true, vars: counter.vars });
  if (counter.hyp) {
    const h = holds(read(counter.hyp), env);
    if (h === null) return { ok: false, message: 'Avec ces valeurs, l\'énoncé n\'est pas défini (division par 0 ?).' };
    if (!h) return { ok: false, message: 'Avec ces valeurs, l\'hypothèse est fausse : il faut qu\'elle soit vraie et la conclusion fausse.' };
  }
  const p = holds(read(counter.pred), env);
  if (p === null) return { ok: false, message: 'Avec ces valeurs, l\'énoncé n\'est pas défini (division par 0 ?).' };
  if (p) return { ok: false, message: 'Avec ces valeurs, l\'énoncé est vrai : ce n\'est pas un contre-exemple.' };
  return { ok: true };
}

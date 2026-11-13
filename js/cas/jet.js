// Taylor polynomial of a given order at a point, in several variables
// (step U6, catalogue A2, a2-taylor2): the coefficient of
// (x − a)ⁱ(y − b)ʲ is ∂ⁱ⁺ʲf/∂xⁱ∂yʲ(a, b)/(i!·j!), every derivative taken
// symbolically (js/cas/diff.js) and evaluated in floating point. Used by
// the `equiv` judge with cfg.jet (two lines are « equal » when their
// Taylor polynomials are) and by the traps of rules/a2c.js.
//
// jet(node, {vars, at, order}) → {'i,j': coefficient} (one key per
// multi-index of total degree ≤ order); sameJet(a, b) → the first key
// where they differ, or null; monoText(key, vars, at) names a monomial.

import { diff, expandDerivs } from './diff.js';
import { evalFloat } from './numeric.js';
import { t } from '../i18n.js';

const fact = (k) => { let f = 1; for (let i = 2; i <= k; i++) f *= i; return f; };
const close = (a, b) => Math.abs(a - b) <= 1e-9 * (1 + Math.abs(a) + Math.abs(b));

export function jet(node, { vars = ['x', 'y'], at = {}, order = 2 } = {}) {
  const env = Object.fromEntries(vars.map((v) => [v, Number(at[v] ?? 0)]));
  const out = {};
  const rec = (expr, idx, from, deg) => {
    const val = evalFloat(expr, env);
    out[idx.join(',')] = val / idx.reduce((p, k) => p * fact(k), 1);
    if (deg === order) return;
    for (let i = from; i < vars.length; i++) {
      const next = idx.slice();
      next[i]++;
      rec(diff(expr, vars[i]), next, i, deg + 1);
    }
  };
  rec(expandDerivs(node), vars.map(() => 0), 0, 0);
  return out;
}

// The first multi-index where the coefficients differ (or one is not a number), or null.
export function sameJet(a, b) {
  for (const k of Object.keys(a)) {
    if (!Number.isFinite(a[k]) || !Number.isFinite(b[k]) || !close(a[k], b[k])) return k;
  }
  return null;
}

// A monomial as text: 'x·y', '(x − 1)²', '1'.
export function monoText(key, vars = ['x', 'y'], at = {}) {
  const ks = key.split(',').map(Number);
  const SUP = { 2: '²', 3: '³', 4: '⁴' };
  const parts = [];
  ks.forEach((k, i) => {
    if (!k) return;
    const a = Number(at[vars[i]] ?? 0);
    const base = a === 0 ? vars[i] : `(${vars[i]} ${a > 0 ? '−' : '+'} ${Math.abs(a)})`;
    parts.push(k === 1 ? base : `${base}${SUP[k] ?? `^${k}`}`);
  });
  return parts.length ? parts.join('·') : t('le terme constant');
}

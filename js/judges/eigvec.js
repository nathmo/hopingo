// Judge `eigvec` (spec §5.2, step U3): an eigenvector. The line is a vector
// v (or « v = (…) »); it is right if v ≠ 0 and (A − λI)v = 0. Any non-zero
// multiple is accepted. With cfg.complex, entries in ℚ(i) (a + bi).
//
// cfg: {kind:'eigvec', A: '[[…]]', lambda: '3' | '2+i', vars?, complex?}
// Its traps (judges: ['eigvec']) get cfg in ctx.cfg.

import { parseExpr, evalAst, envOf, mmul, madd, identityV, S, sameScalar, isZeroScalar, isVec } from '../cas/matexpr.js';
import { parse } from '../cas/parse.js';
import { diagnoseLine } from './diagnose.js';
import { readMat, mopts, wrongV, parseLine, show, text, input } from './matcommon.js';
import { t } from '../i18n.js';

export { parseLine, show, text, input };

const CACHE = new WeakMap();
// A − λI as a value.
export function shifted(cfg) {
  if (CACHE.has(cfg)) return CACHE.get(cfg);
  const opts = mopts(cfg);
  const A = evalAst(parseExpr(cfg.A, opts), { ...envOf(cfg) }, opts);
  const lam = parse(String(cfg.lambda), { vars: opts.vars, complex: opts.complex });
  const out = madd(A, mmul(S(lam), identityV(A.rows.length)), -1);
  CACHE.set(cfg, out);
  return out;
}

export const isEigen = (cfg, v) => {
  const opts = mopts(cfg);
  if (!isVec(v)) return false;
  const B = shifted(cfg);
  if (B.rows[0].length !== v.rows.length) return false;
  if (v.rows.every((r) => isZeroScalar(r[0], opts))) return false;
  return mmul(B, v).rows.every((r) => isZeroScalar(r[0], opts));
};

export function isFinal(cfg, node) {
  return !!node.value && isEigen(cfg, node.value);
}

export const start = (cfg) => cfg.start;

export function judgeLine(cfg, prev, input) {
  const read = readMat(cfg, input);
  if (read.error) return read.error;
  const node = read.node;
  const opts = mopts(cfg);
  const v = node.value;
  const n = shifted(cfg).rows.length;
  if (!v || !isVec(v) || v.rows.length !== n) return { kind: 'form', node, message: t('Écris un vecteur à {n} composantes : {v}.', { n, v: `(1 ; 2${n > 2 ? ' ; 0' : ''})` }) };
  const same = (c, x) => isVec(c.value ?? c) && (c.value ?? c).rows.length === x.value.rows.length && proportional(c.value ?? c, x.value, opts);
  if (v.rows.every((r) => isZeroScalar(r[0], opts))) {
    return wrongV(node, t('Le vecteur nul n\'est jamais un vecteur propre.'), { rules: ['l_eigvec_zero'], ambiguous: 1, ctx: {} });
  }
  if (!isEigen(cfg, v)) {
    const diag = diagnoseLine('eigvec', prev, node, cfg, same);
    return wrongV(node, t('(A − λI)v n\'est pas nul : ce vecteur n\'est pas propre pour λ = {l}.', { l: String(cfg.lambda).replace('-', '−') }), diag);
  }
  return { kind: 'done', node };
}

// u = k·v for some k ≠ 0 (or both zero).
export function proportional(u, v, opts = {}) {
  const a = u.rows.map((r) => r[0]);
  const b = v.rows.map((r) => r[0]);
  const i = b.findIndex((x) => !isZeroScalar(x, opts));
  const j = a.findIndex((x) => !isZeroScalar(x, opts));
  if (i < 0 || j < 0) return i < 0 && j < 0;
  // a·b[i] = b·a[i] for every entry.
  return a.every((x, k) => sameScalar({ t: 'bin', op: '×', l: x, r: b[i] }, { t: 'bin', op: '×', l: b[k], r: a[i] }, opts));
}

export { sameScalar };

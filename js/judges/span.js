// Judge `span` (spec §5.2, §16.2, step U3): a family of vectors that must
// span a given subspace, with a requirement on the family.
//
// cfg: {kind:'span', basis: ['(1 ; 0 ; 1)', …] (vectors spanning the
//         subspace W; [] for {0}), n?: the dimension of the space (with an
//         empty basis), require: 'span' | 'basis' (default) | 'orthogonal' |
//         'orthonormal', nested?: Gram-Schmidt — the k first vectors span
//         the same space as the k first of `basis`, for every k; partial
//         lines are right, the full list ends,
//       affine?: '(2 ; −1 ; 0)' a particular solution: the line is
//         « p + t·v + s·w » (params t, s, r, u), the set p + W,
//       params?: ['t', 's'], vars?}
// A line: « (1 ; 2), (0 ; 1) », « Span{…} », « {…} », « Ker A = Span{…} »,
// one vector, or for `affine`, « x = (2 ; −1 ; 0) + t(3 ; −1 ; 1) ».
// Its traps (judges: ['span']) compare families by the space they span.

import {
  parseExpr, evalAst, envOf, isVec, Mx, vecOf, simp, sameScalar, isZeroScalar, toQ, mmul, madd, S, ZERO, ONE,
} from '../cas/matexpr.js';
import { Q } from '../math/rational.js';
import { mapNode, lit, mul, add } from '../cas/ast.js';
import { evalFloat } from '../cas/numeric.js';
import * as MX from '../cas/matrix.js';
import { diagnoseLine } from './diagnose.js';
import { readMat, mopts, wrongV, parseLine, show, text, input, rankOfVectors, fRank } from './matcommon.js';
import { t } from '../i18n.js';

export { parseLine, show, text, input };

const PARAMS = ['t', 's', 'r', 'u'];
const paramsOf = (cfg) => cfg.params || PARAMS;
const optsOf = (cfg) => ({ ...mopts(cfg), vars: [...(cfg.vars || []), ...paramsOf(cfg)] });

const CACHE = new WeakMap();
export function reference(cfg) {
  if (CACHE.has(cfg)) return CACHE.get(cfg);
  const opts = mopts(cfg);
  const env = { ...envOf(cfg) };
  const basis = (cfg.basis || []).map((t) => evalAst(parseExpr(t, opts), env, opts));
  const p = cfg.affine ? evalAst(parseExpr(cfg.affine, opts), env, opts) : null;
  const out = { basis, p, n: basis[0]?.rows.length ?? p?.rows.length ?? cfg.n };
  CACHE.set(cfg, out);
  return out;
}

// The vectors of a line: a list, one vector, or an affine set p + Σ tᵢvᵢ.
export function familyOf(value, cfg) {
  if (!value) return null;
  if (value.k === 'list') return value.items.every(isVec) ? { vecs: value.items } : null;
  if (isVec(value)) {
    const ps = paramsOf(cfg).filter((t) => value.rows.some((r) => hasSym(r[0], t)));
    if (!ps.length) return { vecs: [value] };
    const at = (env) => vecOf(value.rows.map((r) => simp(subst(r[0], env))));
    const zero = Object.fromEntries(ps.map((t) => [t, 0]));
    const p = at(zero);
    const dirs = ps.map((t) => {
      const one = at({ ...zero, [t]: 1 });
      return vecOf(one.rows.map((r, i) => simp({ t: 'bin', op: '-', l: r[0], r: p.rows[i][0] })));
    });
    // Affine in the parameters: p + Σ tᵢvᵢ at t = 2 too.
    const two = at(Object.fromEntries(ps.map((t) => [t, 2])));
    const lin = vecOf(p.rows.map((r, i) => simp(dirs.reduce((s, d) => add(s, mul(lit(Q.of(2)), d.rows[i][0])), r[0]))));
    if (!lin.rows.every((r, i) => sameScalar(r[0], two.rows[i][0]))) return null;
    return { vecs: dirs, p, params: ps };
  }
  return null;
}

const hasSym = (n, name) => { let f = false; mapNode(n, (x) => { if (x.t === 'sym' && x.name === name && !x.sub) f = true; return x; }); return f; };
const subst = (n, env) => mapNode(n, (x) => (x.t === 'sym' && !x.sub && x.name in env ? lit(Q.of(env[x.name])) : x));

// Does span(us) ⊂ span(vs)? rank(vs) = rank(vs ∪ us).
const inSpan = (us, vs) => {
  const r = rankOfVectors(vs);
  const r2 = rankOfVectors([...vs, ...us]);
  return r !== null && r2 !== null && r === r2;
};
export const sameSpan = (us, vs) => inSpan(us, vs) && inSpan(vs, us);

const dotN = (u, v) => simp(u.rows.reduce((s, r, i) => add(s, mul(r[0], v.rows[i][0])), ZERO));
const orthogonal = (vs) => vs.every((u, i) => vs.every((v, j) => j <= i || isZeroScalar(dotN(u, v))));
const unit = (vs) => vs.every((v) => sameScalar(dotN(v, v), ONE));

export function judgeFamily(cfg, fam, node) {
  const ref = reference(cfg);
  const opts = optsOf(cfg);
  const need = cfg.require || 'basis';
  if (!fam) return { kind: 'form', node, message: cfg.affine ? t('Écris l\'ensemble sous la forme (point) + t·(vecteur) + s·(vecteur).') : t('Écris une liste de vecteurs : (1 ; 0 ; 2), (0 ; 1 ; −1).') };
  const n = ref.n;
  if (fam.vecs.some((v) => v.rows.length !== n)) return { kind: 'form', node, message: t('Chaque vecteur doit avoir {n} composantes.', { n }) };
  if (cfg.affine) {
    if (!fam.p) return { kind: 'form', node, message: t('Écris aussi le point : x = p + t·v.') };
    const d = vecOf(fam.p.rows.map((r, i) => simp({ t: 'bin', op: '-', l: r[0], r: ref.p.rows[i][0] })));
    const dZero = d.rows.every((r) => isZeroScalar(r[0]));
    if (!dZero && !inSpan([d], ref.basis)) return { kind: 'wrong', node, message: t('Ton point n\'est pas une solution du système.'), why: 'point' };
  }
  const vecs = fam.vecs.filter((v) => !v.rows.every((r) => isZeroScalar(r[0])));
  if (cfg.nested) {
    for (let k = 1; k <= vecs.length; k++) {
      if (!sameSpan(vecs.slice(0, k), ref.basis.slice(0, k))) return { kind: 'wrong', node, message: t('Les {k} premiers vecteurs n\'engendrent pas le même espace que {xs}.', { k, xs: `x₁${k > 1 ? `, …, x${'₀₁₂₃₄₅₆₇₈₉'[k]}` : ''}` }) };
    }
    if (vecs.length < fam.vecs.length) return { kind: 'wrong', node, message: t('Un vecteur nul n\'a pas sa place dans une base.') };
  } else if (!sameSpan(vecs, ref.basis)) {
    const msg = inSpan(vecs, ref.basis) ? t('Tes vecteurs sont bien dans l\'espace, mais ils ne l\'engendrent pas tout entier.') : t('Un de tes vecteurs n\'est pas dans l\'espace demandé.');
    return { kind: 'wrong', node, message: msg };
  }
  const rk = rankOfVectors(vecs);
  if (need !== 'span' && (rk !== vecs.length || vecs.length < fam.vecs.length)) return { kind: 'stay', node, message: t('Tes vecteurs engendrent le bon espace, mais ils sont liés : garde-en une base.') };
  if ((need === 'orthogonal' || need === 'orthonormal') && !orthogonal(vecs)) return { kind: 'stay', node, message: t('Ces vecteurs engendrent le bon espace, mais ils ne sont pas orthogonaux deux à deux.') };
  if (need === 'orthonormal' && !unit(vecs)) return { kind: 'stay', node, message: t('Ces vecteurs sont orthogonaux ; il reste à les diviser par leur norme.') };
  if (cfg.nested && vecs.length < ref.basis.length) return { kind: 'ok', node };
  return { kind: 'done', node };
}

export function isFinal(cfg, node) {
  const r = judgeFamily(cfg, familyOf(node.value, cfg), node);
  return r.kind === 'done' ? true : r.kind === 'stay' ? r.message : false;
}

export const start = (cfg) => cfg.start;

export function judgeLine(cfg, prev, input) {
  const read = readMat({ ...cfg, vars: optsOf(cfg).vars }, input);
  if (read.error) return read.error;
  const node = read.node;
  const fam = familyOf(node.value, cfg);
  const r = judgeFamily(cfg, fam, node);
  if (r.kind === 'wrong') {
    const same = (c, x) => {
      const a = familyOf(c.value ?? c, cfg);
      const b = familyOf(x.value, cfg);
      return !!a && !!b && a.vecs.length === b.vecs.length && sameSpan(a.vecs, b.vecs);
    };
    const diag = diagnoseLine('span', prev, node, cfg, same);
    return wrongV(node, r.message, diag);
  }
  return r;
}

export { familyOf as family };

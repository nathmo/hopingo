// Traps of module G10, part b (spec §7; step U5): conics from their
// elements, tangents, nature, reduction, frame back, families, loci,
// homogeneous coordinates. Catalogue: docs/universite/G-gymnase-2.md, G10,
// « Pièges du module ».
//
// The line traps read what the generators put in the judge's cfg:
//   cfg.reduce = {l1, l2, n, f, fO}   (reduction: eigenvalues, ‖w‖² of the
//                                      whole eigenvectors, the constant f of
//                                      the equation, f(Ω))
//   cfg.abc = [a, b, c]               (texts: the coefficients of x², xy, y²)
// A candidate line of the judge `conic` is cl(text, coefs, reduced).

import { parse } from '../parse.js';
import { vl, valueIn } from './g4a.js';

// A line of the judge conic holding an equation (coefficients of x², xy,
// y², x, y, 1, in X, Y when reduced).
export const cl = (text, coefs, reduced = true) => ({ t: 'cline', text, eq: { coefs, reduced } });
const num = (t) => Number(eval1(t));
function eval1(t) {
  const m = /^(-?\d+)(?:\/(\d+))?$/.exec(String(t).trim());
  return m ? Number(m[1]) / (m[2] ? Number(m[2]) : 1) : NaN;
}

export const RULES = [
  {
    id: 'g10_bhalf_matrix', family: 'linear', tag: 'E', skill: 'g10-conic-nature', repair: 'g10-conic-nature',
    example: ['A = [[5, −6], [−6, 5]]', '[[5, −3], [−3, 5]]'], name: 'Coefficient de xy entier dans A',
    judges: ['det', 'value'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      if (!cfg.abc) return [];
      const [a, b, c] = cfg.abc.map(num);
      // Δ = det M with b, d, e instead of their halves (the nature).
      if (cfg.kind === 'det' && cfg.co6) {
        const [, , , d, e, f] = cfg.co6.map(num);
        const full = a * (c * f - e * e) - b * (b * f - e * d) + d * (b * e - c * d);
        return [{ node: parse(String(full)), ctx: { b, h: b / 2 } }];
      }
      if (cfg.kind === 'det') return [{ node: parse(`(${a}-λ)(${c}-λ)-(${b})^2`, { vars: ['λ'] }), ctx: { b, h: b / 2 } }];
      // δ with b instead of b/2 (value lines of the nature).
      if (cfg.kind === 'value' && cfg.delta) return [{ node: parse(String(a * c - b * b)), ctx: { b, h: b / 2 } }];
      return [];
    },
    explain: (ctx = {}) => `xᵀAx = ax² + 2a₁₂xy + cy² : le coefficient de xy est deux fois a₁₂. Hors de la diagonale de A, mets la moitié${ctx.b !== undefined ? ` : ${String(ctx.h).replace('-', '−')}, pas ${String(ctx.b).replace('-', '−')}` : ''}.`,
    check: { judge: { kind: 'det', vars: ['λ'], target: 'factored', names: { A: '[[2,2],[2,-1]]' }, abc: ['2', '4', '-1'] }, prev: 'det(A-λI)', line: '(2-λ)(-1-λ)-16' },
  },
  {
    id: 'g10_eigvec_not_normed', family: 'linear', tag: 'E', skill: 'g10-conic-reduce', repair: 'l-eig-space',
    example: ['15X² − 10Y² − 6 = 0', '3X² − 2Y² − 6 = 0'], name: 'Vecteurs propres non normés',
    judges: ['conic'],
    transform(prev, ctx) {
      const r = ctx?.cfg?.reduce;
      if (!r || r.fO === null || r.fO === undefined) return [];
      const fO = num(r.fO);
      return [{ node: cl(`${r.l1 * r.n}X^2 + ${r.l2 * r.n}Y^2 + ${fO} = 0`, [r.l1 * r.n, 0, r.l2 * r.n, 0, 0, fO]), ctx: { n: r.n } }];
    },
    explain: (ctx = {}) => `Avec un vecteur propre non normé, le repère n'est pas orthonormé : X² est multiplié par le carré de sa norme${ctx.n ? ` (${ctx.n})` : ''}. Norme les vecteurs propres.`,
    check: { judge: { kind: 'conic', equation: '2x^2+4xy-y^2-6y-9=0', target: 'reduced', frame: { O: '(1;-1)', u1: '(2;1)/√5', u2: '(-1;2)/√5' }, reduce: { l1: 3, l2: -2, n: 5, f: '-9', fO: '-6' } }, prev: '2x^2+4xy-y^2-6y-9=0', line: '15X^2-10Y^2-6=0' },
  },
  {
    id: 'g10_constant_not_updated', family: 'rule', tag: 'E', skill: 'g10-conic-reduce', repair: 'g10-conic-reduce',
    example: ['3X² − 2Y² − 9 = 0', '3X² − 2Y² − 6 = 0'], name: 'Constante de départ gardée',
    judges: ['conic', 'value'],
    transform(prev, ctx) {
      const r = ctx?.cfg?.reduce;
      if (!r || r.fO === null || r.fO === undefined) return [];
      const f = num(r.f);
      if (ctx.cfg.kind === 'value') return [{ node: parse(String(f)), ctx: { f, fO: r.fO } }];
      return [{ node: cl(`${r.l1}X^2 + ${r.l2}Y^2 + ${f} = 0`, [r.l1, 0, r.l2, 0, 0, f]), ctx: { f, fO: r.fO } }];
    },
    explain: (ctx = {}) => `Après la translation au centre, la constante est f(Ω)${ctx.fO !== undefined ? ` = ${String(ctx.fO).replace('-', '−')}` : ''}, pas le terme constant de départ${ctx.f !== undefined ? ` (${String(ctx.f).replace('-', '−')})` : ''}.`,
    check: { judge: { kind: 'conic', equation: '2x^2+4xy-y^2-6y-9=0', target: 'reduced', frame: { O: '(1;-1)', u1: '(2;1)/√5', u2: '(-1;2)/√5' }, reduce: { l1: 3, l2: -2, n: 5, f: '-9', fO: '-6' } }, prev: '2x^2+4xy-y^2-6y-9=0', line: '3X^2-2Y^2-9=0' },
  },
  {
    id: 'g10_det_sign_nature', family: 'geometry', tag: 'E', skill: 'g10-conic-nature', repair: 'g10-conic-nature',
    example: ['δ > 0 ⇒ hyperbole', 'ellipse'], name: 'Genre lu à l\'envers sur le signe de δ',
    judges: [],
    explain: () => 'δ = λ₁λ₂. δ > 0 : les deux valeurs propres ont le même signe, comme dans X²/a² + Y²/b² = 1 : genre ellipse. δ < 0 : signes contraires, genre hyperbole.',
    check: { bait: { skill: 'g10-conic-nature', level: 2 } },
  },
  {
    id: 'g10_degenerate_ignored', family: 'method', tag: 'E', skill: 'g10-conic-nature', repair: 'g10-conic-nature',
    example: ['« hyperbole » pour (x − y)(x + 2y) = 0', 'deux droites'], name: 'Δ = 0 oublié : conique dégénérée',
    judges: [],
    explain: () => 'Ton Δ vaut 0 : la conique est dégénérée (un point, deux droites, ou rien). Calcule toujours Δ = det M avant de nommer la conique.',
    check: { bait: { skill: 'g10-conic-nature', exam: 'tf' } },
  },
];

// Wrong points written by the generator in cfg.trapPts[id] (texts), as
// lines of the judge vector (frame back).
function listed(id) {
  return (prev, ctx) => {
    const cfg = ctx?.cfg || {};
    if (cfg.kind !== 'vector') return [];
    return (cfg.trapPts?.[id] || []).map((t) => valueIn(cfg, t)).filter(Boolean).map((v) => ({ node: vl(v), ctx: {} }));
  };
}

RULES.push(
  {
    id: 'g10_foci_reduced_frame', family: 'geometry', tag: 'E', skill: 'g10-conic-frame-back', repair: 'g10-conic-frame-back',
    example: ['F = (√5 ; 0)', '(3 ; 0)'], name: 'Coordonnées de Ru données pour Re',
    judges: ['vector'], transform: listed('g10_foci_reduced_frame'),
    explain: () => 'Ces coordonnées sont celles du repère réduit Ru. La question demande Re : F = Ω + X·u₁ + Y·u₂.',
    check: { judge: { kind: 'vector', symbols: { Ω: '(1 ; -1)', u_1: '(2 ; 1)/√5', u_2: '(-1 ; 2)/√5' }, expect: '(3 ; 0)', trapPts: { g10_foci_reduced_frame: ['(√5 ; 0)'] } }, prev: 'F', line: '(√5 ; 0)' },
  },
  {
    id: 'g10_frame_back_transpose', family: 'linear', tag: 'E', skill: 'g10-conic-frame-back', repair: 'g10-conic-frame-back',
    example: ['x = Ω + Pᵀ(X ; Y)', 'Ω + P(X ; Y)'], name: 'Retour avec Pᵀ au lieu de P',
    judges: ['vector'], transform: listed('g10_frame_back_transpose'),
    explain: () => 'Les colonnes de P sont u₁ et u₂ : x = Ω + X·u₁ + Y·u₂ = Ω + P·(X ; Y). Avec Pᵀ, tu tournes dans le mauvais sens : ton point n\'est pas sur le bon axe.',
    check: { judge: { kind: 'vector', symbols: { Ω: '(1 ; -1)', u_1: '(2 ; 1)/√5', u_2: '(-1 ; 2)/√5' }, expect: '(3 ; 0)', trapPts: { g10_frame_back_transpose: ['(3 ; -2)'] } }, prev: 'F', line: '(3 ; -2)' },
  },
);

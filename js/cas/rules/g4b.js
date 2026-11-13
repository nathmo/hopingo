// Traps of module G4, part b (spec §7; step U5): cross and triple products,
// distances, skew lines, spheres. Catalogue: docs/universite/G-gymnase-2.md,
// G4, « Pièges du module ».
//
// g4_square_constant and g4_not_normalized are shared with g10-circle-eq
// (defined here, the first module of the graph, §16.4). They read:
//   geom: cfg.ref (the circle or sphere: its coefficients);
//   conic: cfg.equation;
//   vector: cfg.circleEq (text of the equation as given, not divided).
// A candidate line of `geom` is {t: 'gline', obj}, of `conic` cl(…) (rules/g10b.js).

import { readObject, MONO } from '../geomobj.js';
import { V } from '../vecexpr.js';
import { lit } from '../ast.js';
import { Q } from '../../math/rational.js';
import { vl } from './g4a.js';
import { cl } from './g10b.js';
import { t } from '../../i18n.js';

const gl = (dim, coefs) => ({ t: 'gline', text: '', obj: { kind: 'poly', dim, coefs } });

// The numeric coefficients of a quadric text (MONO order), or null.
function coefsOf(text, dim) {
  try { const o = readObject(String(text), { dim }); return o.kind === 'poly' ? o.coefs : null; } catch { return null; }
}
// Squares and linear terms of a quadric without cross terms: [{a, l}] per variable, and the constant.
function split(coefs, dim) {
  const mono = MONO[dim];
  const at = (e) => coefs[mono.findIndex((m) => m.every((k, i) => k === e[i]))];
  const unit = (i, k) => Array.from({ length: dim }, (_, j) => (j === i ? k : 0));
  const vars = Array.from({ length: dim }, (_, i) => ({ a: at(unit(i, 2)), l: at(unit(i, 1)) }));
  return { vars, c: at(Array(dim).fill(0)) };
}
const toQ = (x) => { for (let d = 1; d <= 48; d++) { const n = Math.round(x * d); if (Math.abs(n / d - x) < 1e-9) return new Q(n, d); } return null; };

export const RULES = [
  {
    id: 'g4_square_constant', family: 'rule', tag: 'E', skill: 'g4-sphere', repair: 'quad-complete',
    example: ['x² − 4x = (x − 2)²', '(x − 2)² − 4'], name: t('Constante du carré oubliée'),
    judges: ['geom', 'conic'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      const dim = cfg.kind === 'geom' && ['sphere', 'plane', 'line3'].includes(cfg.object) ? 3 : 2;
      const coefs = cfg.kind === 'conic' ? coefsOf(cfg.equation, 2) : cfg.object === 'circle' || cfg.object === 'sphere' ? coefsOf(cfg.ref, dim) : null;
      if (!coefs) return [];
      const { vars } = split(coefs, dim);
      if (vars.some((v) => !v.a) && cfg.kind !== 'conic') return [];
      // a(x + l/2a)² + … + f = 0 written without the −l²/4a: the constant grows by Σ l²/4a.
      const extra = vars.reduce((s, v) => s + (v.a ? (v.l * v.l) / (4 * v.a) : 0), 0);
      if (Math.abs(extra) < 1e-12) return [];
      const bad = coefs.map((x, i) => (i === coefs.length - 1 ? x + extra : x));
      const node = cfg.kind === 'conic' ? cl('', bad, false) : gl(dim, bad);
      return [{ node, ctx: { extra: String(toQ(extra) ?? extra) } }];
    },
    explain: (ctx = {}) => (ctx.extra
      ? t('(x − 2)² = x² − 4x + 4 : en écrivant le carré, tu as ajouté une constante, qu\'il faut retirer (ici, {extra} en tout). Ton rayon² est faux.', { extra: String(ctx.extra).replace('-', '−') })
      : t('(x − 2)² = x² − 4x + 4 : en écrivant le carré, tu as ajouté une constante, qu\'il faut retirer. Ton rayon² est faux.')),
    check: { judge: { kind: 'geom', object: 'circle', ref: 'x^2 + y^2 - 4x + 6y - 12 = 0' }, prev: 'x^2 + y^2 - 4x + 6y - 12 = 0', line: '(x - 2)^2 + (y + 3)^2 - 12 = 0' },
  },
  {
    id: 'g4_not_normalized', family: 'rule', tag: 'E', skill: 'g4-sphere', repair: 'g4-sphere',
    example: ['3x² + 3y² + 42x − 6y + 75 = 0 : Ω = (−21 ; 3)', '(−7 ; 1)'], name: t('Centre lu sans diviser par le coefficient de x²'),
    judges: ['vector', 'geom'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      const text = cfg.kind === 'vector' ? cfg.circleEq : cfg.kind === 'geom' && (cfg.object === 'circle' || cfg.object === 'sphere') ? cfg.circleEq : null;
      if (!text) return [];
      const dim = cfg.object === 'sphere' || /z/.test(text) ? 3 : 2;
      const coefs = coefsOf(text, dim);
      if (!coefs) return [];
      const { vars, c } = split(coefs, dim);
      const a = vars[0].a;
      if (!a || Math.abs(a - 1) < 1e-12) return [];
      // Ω = (−D/2 ; −E/2) and r² = h² + k² − F with the coefficients not divided by a.
      const centre = vars.map((v) => toQ(-v.l / 2));
      if (centre.some((x) => !x)) return [];
      if (cfg.kind === 'vector') return [{ node: vl(V(centre.map((x) => lit(x)))), ctx: { a: String(toQ(a)) } }];
      const r2 = centre.reduce((s, x) => s + x.valueOf() ** 2, 0) - c;
      // (x − h)² + (y − k)² = r²: coefficients 1, −2h, h² + k² − r².
      const bad = MONO[dim].map((e) => {
        const deg = e.reduce((s, k) => s + k, 0);
        if (deg === 2) return e.some((k) => k === 2) ? 1 : 0;
        if (deg === 1) return -2 * centre[e.indexOf(1)].valueOf();
        return centre.reduce((s, x) => s + x.valueOf() ** 2, 0) - r2;
      });
      return [{ node: gl(dim, bad), ctx: { a: String(toQ(a)) } }];
    },
    explain: (ctx = {}) => (ctx.a
      ? t('Le centre se lit sur x² + y² + Dx + Ey + F = 0, avec 1 devant x². Divise d\'abord toute l\'équation par {a}.', { a: ctx.a })
      : t('Le centre se lit sur x² + y² + Dx + Ey + F = 0, avec 1 devant x². Divise d\'abord toute l\'équation par le coefficient de x².')),
    check: { judge: { kind: 'vector', expect: '(-7 ; 1)', circleEq: '3x^2 + 3y^2 + 42x - 6y + 75 = 0' }, prev: 'Ω', line: '(-21 ; 3)' },
  },
];

// ---------- products, volumes, distances (fields of the judge's cfg) ----------
//   cfg.cross = [u, v]          (texts of components: the question asks u ∧ v)
//   cfg.bilin = {kWrong, n}     ((au + bv) ∧ (cu + dv) = (ad − bc)·u ∧ v; the trap gives (ad + bc)·n, n = u ∧ v)
//   cfg.tetra = {m}             (the triple product, the volume is |m|/6)
//   cfg.dist = {e, n?}          (the value of the plane's equation at P, ‖n⃗‖)
//   cfg.skew = {ab2}            (‖AB⃗‖² between the base points)
//   cfg.perp = {A, u, B, v, ask?: 's' | 't'}   (two skew lines: the common perpendicular)

const qOf = (t) => {
  if (t instanceof Q) return t;
  const m = /^(-?\d+)(?:\/(\d+))?$/.exec(String(t).trim());
  return m ? new Q(Number(m[1]), m[2] ? Number(m[2]) : 1) : new Q(Number(t));
};
const qv = (v) => v.map(qOf);
const crossQ = (u, v) => [u[1].mul(v[2]).sub(u[2].mul(v[1])), u[2].mul(v[0]).sub(u[0].mul(v[2])), u[0].mul(v[1]).sub(u[1].mul(v[0]))];
const dotQ = (u, v) => u.reduce((s, x, i) => s.add(x.mul(v[i])), new Q(0));
const vline = (xs) => vl(V(xs.map((x) => lit(x))));
const numNode = (x) => ({ t: 'paren', e: lit(x) });
const absQ = (x) => (x.n < 0 ? x.neg() : x);
const fr = (x) => String(x).replace('-', '−');

RULES.push(
  {
    id: 'g4_cross_middle_sign', family: 'sign', tag: 'E', skill: 'g4-cross', repair: 'g4-cross',
    example: ['(2 ; −7 ; 1)', '(2 ; 7 ; 1)'], name: t('Signe de la 2e composante du produit vectoriel'),
    judges: ['vector'],
    transform(prev, ctx) {
      const c = ctx?.cfg?.cross;
      if (!c) return [];
      const n = crossQ(qv(c[0]), qv(c[1]));
      if (n[1].n === 0) return [];
      return [{ node: vline([n[0], n[1].neg(), n[2]]), ctx: { c: fr(n[1]) } }];
    },
    explain: (ctx = {}) => (ctx.c
      ? t('La 2e composante est u₃v₁ − u₁v₃ = {c}. Avec le développement par la 1re ligne, le cofacteur du milieu porte un signe −. Contrôle : ton vecteur n\'est pas orthogonal à u⃗.', { c: ctx.c })
      : t('La 2e composante est u₃v₁ − u₁v₃. Avec le développement par la 1re ligne, le cofacteur du milieu porte un signe −. Contrôle : ton vecteur n\'est pas orthogonal à u⃗.')),
    check: { judge: { kind: 'vector', symbols: { u: '(2 ; -1 ; 3)', v: '(1 ; 0 ; -2)' }, expect: 'u ∧ v', cross: [['2', '-1', '3'], ['1', '0', '-2']] }, prev: 'u ∧ v', line: '(2 ; -7 ; 1)' },
  },
  {
    id: 'g4_cross_commute', family: 'rule', tag: 'E', skill: 'g4-cross', repair: 'g4-cross',
    example: ['v⃗ ∧ u⃗ = u⃗ ∧ v⃗', '−u⃗ ∧ v⃗'], name: t('Produit vectoriel pris comme commutatif'),
    judges: ['vector'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      if (cfg.bilin) {
        const n = qv(cfg.bilin.n);
        const k = qOf(cfg.bilin.kWrong);
        return [{ node: vline(n.map((x) => x.mul(k))), ctx: {} }];
      }
      if (!cfg.cross) return [];
      const n = crossQ(qv(cfg.cross[0]), qv(cfg.cross[1]));
      return [{ node: vline(n.map((x) => x.neg())), ctx: {} }];
    },
    explain: () => t('Le produit vectoriel change de signe quand on échange les facteurs : v⃗ ∧ u⃗ = −u⃗ ∧ v⃗, et u⃗ ∧ u⃗ = 0⃗.'),
    check: { judge: { kind: 'vector', symbols: { u: '(2 ; -1 ; 3)', v: '(1 ; 0 ; -2)' }, expect: 'u ∧ v', cross: [['2', '-1', '3'], ['1', '0', '-2']] }, prev: 'u ∧ v', line: '(-2 ; -7 ; -1)' },
  },
  {
    id: 'g4_tetra_factor', family: 'rule', tag: 'E', skill: 'g4-triple', repair: 'g4-triple',
    example: ['V = 24', '24/6 = 4'], name: t('Volume du tétraèdre sans le facteur 1/6'),
    judges: ['value'],
    transform(prev, ctx) {
      const t = ctx?.cfg?.tetra;
      if (!t) return [];
      const m = absQ(qOf(t.m));
      return [1, 2, 3].map((k) => ({ node: numNode(m.div(k)), ctx: { m: fr(m) } }));
    },
    explain: (ctx = {}) => t('{m} est le volume du parallélépipède. Le tétraèdre en est le sixième : ½ pour la base triangulaire, ⅓ pour la pyramide.', { m: ctx.m ? `|${ctx.m}|` : '|[AB⃗, AC⃗, AD⃗]|' }),
    check: { judge: { kind: 'value', expect: '4', tetra: { m: '24' } }, prev: 'V', line: '24' },
  },
  {
    id: 'g4_dist_no_norm', family: 'geometry', tag: 'E', skill: 'g4-dist-point', repair: 'g4-dist-point',
    example: ['d = 9', '9/3'], name: t('Distance sans diviser par ‖n⃗‖'),
    judges: ['value'],
    transform(prev, ctx) {
      const t = ctx?.cfg?.dist;
      if (!t) return [];
      const e = qOf(t.e);
      return [absQ(e), e].map((x) => ({ node: numNode(x), ctx: { e: fr(e), n: t.n ? fr(t.n) : null } }));
    },
    explain: (ctx = {}) => (ctx.n
      ? t('{e} est la valeur de l\'équation en P, pas une distance. Elle devient une distance après division par ‖n⃗‖ = {n}, en valeur absolue.', { e: ctx.e ?? 'ax₀ + by₀ + cz₀ + d', n: ctx.n })
      : t('{e} est la valeur de l\'équation en P, pas une distance. Elle devient une distance après division par ‖n⃗‖, en valeur absolue.', { e: ctx.e ?? 'ax₀ + by₀ + cz₀ + d' })),
    check: { judge: { kind: 'value', expect: '3', dist: { e: '9', n: '3' } }, prev: 'd', line: '9' },
  },
  {
    id: 'g4_skew_any_points', family: 'geometry', tag: 'E', skill: 'g4-dist-skew', repair: 'g4-dist-skew',
    example: ['d = ‖AB⃗‖', '|AB⃗·n⃗|/‖n⃗‖'], name: t('Distance prise entre deux points quelconques'),
    judges: ['value'],
    transform(prev, ctx) {
      const t = ctx?.cfg?.skew;
      if (!t) return [];
      return [{ node: { t: 'sqrt', e: lit(qOf(t.ab2)) }, ctx: { ab2: String(t.ab2) } }];
    },
    explain: (ctx = {}) => (ctx.ab2
      ? t('A et B sont des points quelconques des droites (AB = √{ab2}). La distance est la plus courte : c\'est la projection de AB⃗ sur n⃗ = u⃗ ∧ v⃗, |AB⃗·n⃗|/‖n⃗‖.', { ab2: ctx.ab2 })
      : t('A et B sont des points quelconques des droites. La distance est la plus courte : c\'est la projection de AB⃗ sur n⃗ = u⃗ ∧ v⃗, |AB⃗·n⃗|/‖n⃗‖.')),
    check: { judge: { kind: 'value', expect: '3', form: 'exact', skew: { ab2: '27' } }, prev: 'd', line: '√27' },
  },
  {
    id: 'g4_common_perp_one_condition', family: 'method', tag: 'E', skill: 'g4-common-perp', repair: 'g4-common-perp',
    example: [t('PQ⃗ ⟂ u⃗ seulement'), t('PQ⃗ ⟂ u⃗ et v⃗')], name: t("Une seule condition d'orthogonalité"),
    judges: ['vector', 'value'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      const p = cfg.perp;
      if (!p) return [];
      const [A, u, B, v] = [p.A, p.u, p.B, p.v].map(qv);
      const AB = B.map((x, i) => x.sub(A[i]));
      // t = 0, PQ⃗·u⃗ = 0: s = AB⃗·u⃗/u⃗·u⃗ ; s = 0, PQ⃗·v⃗ = 0: t = −AB⃗·v⃗/v⃗·v⃗.
      const s1 = dotQ(AB, u).div(dotQ(u, u));
      const t1 = dotQ(AB, v).div(dotQ(v, v)).neg();
      if (cfg.kind === 'value') return p.ask === 's' ? [{ node: numNode(s1), ctx: {} }] : p.ask === 't' ? [{ node: numNode(t1), ctx: {} }] : [];
      return [
        { node: vline(A.map((x, i) => x.add(s1.mul(u[i])))), ctx: {} },
        { node: vline(B.map((x, i) => x.add(t1.mul(v[i])))), ctx: {} },
      ];
    },
    explain: () => t("PQ⃗ doit être perpendiculaire aux deux droites : PQ⃗·u⃗ = 0 et PQ⃗·v⃗ = 0, un système en s et t. Ta ligne ne vérifie qu'une des deux conditions."),
    check: { judge: { kind: 'vector', expect: '(1 ; 0 ; 0)', perp: { A: ['-1', '1', '0'], u: ['2', '-1', '0'], B: ['4', '2', '1'], v: ['2', '0', '-1'] } }, prev: 'P', line: '(13/5 ; -4/5 ; 0)' },
  },
);

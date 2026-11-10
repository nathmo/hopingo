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
    example: ['x² − 4x = (x − 2)²', '(x − 2)² − 4'], name: 'Constante du carré oubliée',
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
    explain: (ctx = {}) => `(x − 2)² = x² − 4x + 4 : en écrivant le carré, tu as ajouté une constante, qu'il faut retirer${ctx.extra ? ` (ici, ${String(ctx.extra).replace('-', '−')} en tout)` : ''}. Ton rayon² est faux.`,
    check: { judge: { kind: 'geom', object: 'circle', ref: 'x^2 + y^2 - 4x + 6y - 12 = 0' }, prev: 'x^2 + y^2 - 4x + 6y - 12 = 0', line: '(x - 2)^2 + (y + 3)^2 - 12 = 0' },
  },
  {
    id: 'g4_not_normalized', family: 'rule', tag: 'E', skill: 'g4-sphere', repair: 'g4-sphere',
    example: ['3x² + 3y² + 42x − 6y + 75 = 0 : Ω = (−21 ; 3)', '(−7 ; 1)'], name: 'Centre lu sans diviser par le coefficient de x²',
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
    explain: (ctx = {}) => `Le centre se lit sur x² + y² + Dx + Ey + F = 0, avec 1 devant x². Divise d'abord toute l'équation par ${ctx.a ? ctx.a : 'le coefficient de x²'}.`,
    check: { judge: { kind: 'vector', expect: '(-7 ; 1)', circleEq: '3x^2 + 3y^2 + 42x - 6y + 75 = 0' }, prev: 'Ω', line: '(-21 ; 3)' },
  },
];

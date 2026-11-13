// Traps of module G10, part a (spec §7; step U5): circles (tangents, radical
// axis, polar) and the three conics in reduced form. Catalogue:
// docs/universite/G-gymnase-2.md, G10, « Pièges du module ».
//
// The line traps read what the generators put in the judge's cfg:
//   geom:  cfg.tangents = {others: [texts]}   (the tangents from Q that are not vertical)
//          cfg.tangentAt = {T, w}             (point of contact, radius ΩT⃗)
//          cfg.radical = {g1, g2}             (left sides of the two equations, as written)
//          cfg.polar = {P, r2}                (the pole P and r²)
//   conic: cfg.equation (the elements are computed from it, js/cas/conic.js).
// A candidate line of `geom` is {t: 'gline', obj}; of `conic` with
// elements, {t: 'cline', elements: [{name, kind, value | lines}]}.

import { readObject } from '../geomobj.js';
import { analyzeConic, coefsOfText, lineThrough } from '../conic.js';
import { t } from '../../i18n.js';

const gl = (text, dim = 2) => { try { return { t: 'gline', text, obj: readObject(text, { dim }) }; } catch { return null; } };
const P = (x) => String(x).replace('-', '−');
const fmt = (x) => P(Math.round(x * 1000) / 1000);

function analysisOf(cfg) {
  if (cfg._an) return cfg._an;
  try { return analyzeConic(coefsOfText(String(cfg.equation))); } catch { return null; }
}
const el = (name, kind, value) => ({ name, kind, value });
const els = (name, kind, lines) => ({ name, kind, lines });
const cl = (elements) => ({ t: 'cline', text: '', elements });
const at = (C, k, v) => [C[0] + k * v[0], C[1] + k * v[1]];

// The elements of an ellipse or hyperbola of centre C, focal unit vector u,
// other unit vector w, semi-axes a (focal) and b, focal distance c.
function elementsOf(type, C, u, w, a, b, c) {
  const out = [
    el('F', 'F', at(C, c, u)), el("F'", 'F', at(C, -c, u)),
    el('S', 'S', at(C, a, u)), el("S'", 'S', at(C, -a, u)),
    el('a', 'a', a), el('b', 'b', b), el('c', 'c', c), el('e', 'e', c / a),
  ];
  if (c > 1e-9) out.push(els('directrices', 'directrices', [lineThrough(at(C, (a * a) / c, u), w), lineThrough(at(C, (-a * a) / c, u), w)]));
  if (type === 'hyperbola') {
    out.push(els('asymptotes', 'asymptotes', [lineThrough(C, [a * u[0] + b * w[0], a * u[1] + b * w[1]]), lineThrough(C, [a * u[0] - b * w[0], a * u[1] - b * w[1]])]));
  }
  return out;
}

export const RULES = [
  {
    id: 'g10_vertical_tangent_lost', family: 'method', tag: 'E', skill: 'g10-circle-tangent', repair: 'g10-circle-tangent',
    example: [t('une seule tangente 3x + 4y − 19 = 0'), t('aussi x = −3')], name: t('Tangente verticale oubliée'),
    judges: ['geom'],
    transform(prev, ctx) {
      const t = ctx?.cfg?.tangents;
      if (!t?.others?.length || !t.vertical) return [];
      const c = gl(t.others.join(' ou '));
      return c ? [{ node: c, ctx: { vertical: t.vertical } }] : [];
    },
    explain: (ctx = {}) => (ctx.vertical
      ? t('En écrivant y − y_Q = m(x − x_Q), tu as exclu la droite verticale {v}. Sa distance au centre vaut r : c\'est aussi une tangente.', { v: P(ctx.vertical) })
      : t('En écrivant y − y_Q = m(x − x_Q), tu as exclu la droite verticale. Sa distance au centre vaut r : c\'est aussi une tangente.')),
    check: { judge: { kind: 'geom', object: 'line2', count: 2, ref: '3x + 4y - 19 = 0 ou x = -3', tangents: { others: ['3x + 4y - 19 = 0'], vertical: 'x = -3' } }, prev: 'T', line: '3x + 4y - 19 = 0' },
  },
  {
    id: 'g10_tangent_radius_direction', family: 'geometry', tag: 'E', skill: 'g10-circle-tangent', repair: 'g4-line2',
    example: [t('droite par T de direction ΩT⃗'), t('de normale ΩT⃗')], name: t('Rayon pris pour la direction de la tangente'),
    judges: ['geom'],
    transform(prev, ctx) {
      const t = ctx?.cfg?.tangentAt;
      if (!t) return [];
      const [Tx, Ty] = t.T.map(Number);
      const [wx, wy] = t.w.map(Number);
      // Through T, direction w: −w_y(x − T_x) + w_x(y − T_y) = 0.
      const c = gl(`${-wy}x + ${wx}y + ${wy * Tx - wx * Ty} = 0`);
      return c ? [{ node: c, ctx: { w: `(${t.w.map(P).join(' ; ')})` } }] : [];
    },
    explain: (ctx = {}) => (ctx.w
      ? t('ΩT⃗ = {w} est le rayon : la tangente lui est perpendiculaire. ΩT⃗ est donc un vecteur normal de la tangente, pas sa direction.', { w: ctx.w })
      : t('ΩT⃗ est le rayon : la tangente lui est perpendiculaire. ΩT⃗ est donc un vecteur normal de la tangente, pas sa direction.')),
    check: { judge: { kind: 'geom', object: 'line2', ref: '3x + 4y - 19 = 0', tangentAt: { T: [5, 1], w: [3, 4] } }, prev: 't', line: '4x - 3y - 17 = 0' },
  },
  {
    id: 'g10_radical_unnormalized', family: 'rule', tag: 'E', skill: 'g10-power-radical', repair: 'g10-power-radical',
    example: [t('2γ₁ − γ₂ garde un x²'), t('normaliser d\'abord')], name: t('Équations soustraites sans normaliser'),
    judges: ['geom'],
    transform(prev, ctx) {
      const r = ctx?.cfg?.radical;
      if (!r) return [];
      const c = gl(`(${r.g1}) - (${r.g2}) = 0`);
      return c && c.obj.kind === 'poly' ? [{ node: c, ctx: {} }] : [];
    },
    explain: () => t('Après ta soustraction, il reste des termes en x² et y² : ce n\'est pas une droite. Divise chaque équation par son coefficient de x² avant de soustraire.'),
    check: { judge: { kind: 'geom', object: 'line2', ref: '3x - 2y + 5 = 0', radical: { g1: 'x^2 + y^2 - 4x - 2y - 4', g2: '2x^2 + 2y^2 + 4x - 12y + 12' } }, prev: 'Δ', line: '-x^2 - y^2 - 8x + 10y - 16 = 0' },
  },
  {
    id: 'g10_orthogonal_sum', family: 'geometry', tag: 'E', skill: 'g10-power-radical', repair: 'g10-power-radical',
    example: [t('Ω₁Ω₂ = r₁ + r₂ : orthogonaux'), 'Ω₁Ω₂² = r₁² + r₂²'], name: t('Orthogonaux confondu avec tangents'),
    judges: [],
    explain: () => t('Ω₁Ω₂ = r₁ + r₂ veut dire tangents extérieurement. Deux cercles sont orthogonaux quand leurs rayons aux points communs sont perpendiculaires : par Pythagore, Ω₁Ω₂² = r₁² + r₂².'),
    check: { bait: { skill: 'g10-power-radical', level: 4 } },
  },
  {
    id: 'g10_polar_origin_formula', family: 'rule', tag: 'E', skill: 'g10-pole-polar', repair: 'g10-pole-polar',
    example: ['x₀x + y₀y = r²', '(x₀ − h)(x − h) + (y₀ − k)(y − k) = r²'], name: t('Polaire écrite comme si le centre était O'),
    judges: ['geom'],
    transform(prev, ctx) {
      const p = ctx?.cfg?.polar;
      if (!p) return [];
      const [x0, y0] = p.P.map(Number);
      const c = gl(`${x0}x + ${y0}y = ${p.r2}`);
      return c ? [{ node: c, ctx: {} }] : [];
    },
    explain: () => t('x₀x + y₀y = r² ne vaut que si le centre est l\'origine. Ici, dédouble la forme réduite : (x₀ − h)(x − h) + (y₀ − k)(y − k) = r².'),
    check: { judge: { kind: 'geom', object: 'line2', ref: '3x + y - 6 = 0', polar: { P: [4, -1], r2: 5 } }, prev: 'p', line: '4x - y - 5 = 0' },
  },
  {
    id: 'g10_c_wrong_formula', family: 'rule', tag: 'E', skill: 'g10-ellipse', repair: 'g10-ellipse',
    example: [t('ellipse : c² = a² + b²'), 'c² = a² − b²'], name: t('c² de l\'autre conique'),
    judges: ['conic'],
    transform(prev, ctx) {
      const an = analysisOf(ctx?.cfg || {});
      if (!an || !['ellipse', 'hyperbola'].includes(an.type)) return [];
      const { a, b, center: C, focal: u, other: w } = an;
      const c = an.type === 'ellipse' ? Math.hypot(a, b) : Math.sqrt(Math.abs(a * a - b * b));
      if (c < 1e-9) return [];
      return [{ node: cl(elementsOf(an.type, C, u, w, a, b, c).filter((e) => ['F', 'c', 'e', 'directrices'].includes(e.kind))), ctx: { type: an.type, c2: fmt(c * c) } }];
    },
    explain: (ctx = {}) => {
      if (ctx.type === 'hyperbola') {
        return ctx.c2
          ? t('Pour une hyperbole, les foyers sont plus loin que les sommets : c > a, donc c² = a² + b² (pas {c2}). C\'est l\'ellipse qui a c² = a² − b².', { c2: ctx.c2 })
          : t('Pour une hyperbole, les foyers sont plus loin que les sommets : c > a, donc c² = a² + b². C\'est l\'ellipse qui a c² = a² − b².');
      }
      return ctx.c2
        ? t('Pour une ellipse, les foyers sont à l\'intérieur : c < a, donc c² = a² − b² (pas {c2}). C\'est l\'hyperbole qui a c² = a² + b².', { c2: ctx.c2 })
        : t('Pour une ellipse, les foyers sont à l\'intérieur : c < a, donc c² = a² − b². C\'est l\'hyperbole qui a c² = a² + b².');
    },
    check: { judge: { kind: 'conic', equation: '4x^2 + 9y^2 - 16x + 54y + 61 = 0', ask: ['F'] }, prev: 'E', line: 'F = (2 + √13 ; -3)' },
  },
  {
    id: 'g10_axis_swap', family: 'geometry', tag: 'E', skill: 'g10-ellipse', repair: 'g10-hyperbola',
    example: [t('grand axe lu sur le petit dénominateur'), t('sur le grand')], name: t('Axes échangés'),
    judges: ['conic'],
    transform(prev, ctx) {
      const an = analysisOf(ctx?.cfg || {});
      if (!an || !['ellipse', 'hyperbola'].includes(an.type)) return [];
      const { a, b, c, center: C, focal: u, other: w } = an;
      // The roles of the two axes exchanged: the focal axis read on the other one.
      const out = elementsOf(an.type, C, w, u, an.type === 'ellipse' ? a : a, an.type === 'ellipse' ? b : b, c);
      out.push(el('a', 'a', b), el('b', 'b', a));
      return [{ node: cl(out.filter((e) => ['F', 'S', 'directrices', 'a', 'b'].includes(e.kind))), ctx: { type: an.type } }];
    },
    explain: (ctx = {}) => (ctx.type === 'hyperbola'
      ? t('L\'axe réel est du côté du terme positif quand le second membre vaut +1 : les sommets et les foyers sont sur cet axe.')
      : t('Le grand axe est du côté du plus grand dénominateur : les sommets principaux et les foyers sont sur cet axe.')),
    check: { judge: { kind: 'conic', equation: '4x^2 + 9y^2 - 16x + 54y + 61 = 0', ask: ['F'] }, prev: 'E', line: 'F = (2 ; -3 + √5)' },
  },
  {
    id: 'g10_asymptote_ratio', family: 'rule', tag: 'E', skill: 'g10-hyperbola', repair: 'g10-hyperbola',
    example: ['y − k = ±(a/b)(x − h)', '±(b/a)(x − h)'], name: t('Pente des asymptotes inversée'),
    judges: ['conic'],
    transform(prev, ctx) {
      const an = analysisOf(ctx?.cfg || {});
      if (!an || an.type !== 'hyperbola' || Math.abs(an.a - an.b) < 1e-9) return [];
      const { a, b, center: C, focal: u, other: w } = an;
      const L = [lineThrough(C, [b * u[0] + a * w[0], b * u[1] + a * w[1]]), lineThrough(C, [b * u[0] - a * w[0], b * u[1] - a * w[1]])];
      return [{ node: cl([els('asymptotes', 'asymptotes', L)]), ctx: { a: fmt(a), b: fmt(b) } }];
    },
    explain: (ctx = {}) => (ctx.a
      ? t('Pour x²/a² − y²/b² = 1, les asymptotes sont x/a = ±y/b, donc y = ±(b/a)x = ±({b}/{a})x : le dénominateur de la pente est a, sur l\'axe réel.', { a: ctx.a, b: ctx.b })
      : t('Pour x²/a² − y²/b² = 1, les asymptotes sont x/a = ±y/b, donc y = ±(b/a)x : le dénominateur de la pente est a, sur l\'axe réel.')),
    check: { judge: { kind: 'conic', equation: '9x^2 - 16y^2 - 18x - 64y - 199 = 0', ask: ['asymptotes'] }, prev: 'H', line: 'asymptote : 4x - 3y - 10 = 0' },
  },
  {
    id: 'g10_parabola_p_half', family: 'rule', tag: 'E', skill: 'g10-parabola', repair: 'g10-parabola',
    example: ['F = (3 ; 3)', '(3 ; 1)'], name: t('Foyer à p du sommet'),
    judges: ['conic'],
    transform(prev, ctx) {
      const an = analysisOf(ctx?.cfg || {});
      if (!an || an.type !== 'parabola') return [];
      const S = an.vertex;
      const v = an.focal;
      return [{ node: cl([el('F', 'F', at(S, an.p, v)), els('directrice', 'directrices', [lineThrough(at(S, -an.p, v), an.other)])]), ctx: { p: fmt(an.p) } }];
    },
    explain: (ctx = {}) => (ctx.p
      ? t('Dans (x − h)² = 2p(y − k), le foyer est à p/2 du sommet, pas à p : ici p = {p}, donc F est à {d} du sommet. La directrice est à p/2 de l\'autre côté.', { p: ctx.p, d: fmt(Number(String(ctx.p).replace('−', '-')) / 2) })
      : t('Dans (x − h)² = 2p(y − k), le foyer est à p/2 du sommet, pas à p. La directrice est à p/2 de l\'autre côté.')),
    check: { judge: { kind: 'conic', equation: 'x^2 - 6x - 8y + 1 = 0', ask: ['F'] }, prev: 'P', line: 'F = (3 ; 3)' },
  },
];

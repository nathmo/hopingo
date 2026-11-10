// Traps of module A2, part g (step U6): what makes the catalogue's traps
// of this part work (the table itself is META in rules/a2.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain, check}}; explain()
// falls back on the catalogue's text.
//
// Fields the generators of part g put in the judges' configurations:
//   domain   refLine: the reference description (« 0 ≤ φ ≤ π ; 0 ≤ r ≤ 2 »),
//            used when the previous line is the region itself;
//   equiv    jac: {from, factor} (js/judges/equiv.js): the start line is the
//            integrand in x, y(, z), the line after it the integrand in the
//            new variables times the jacobian; subst gives x, y, z;
//   definite jacFactor: the jacobian inside the integrals over r ('r',
//            'r^2×sin(θ)');
//   all      volume: true (volume items: the surfaces may be swapped).

import { parse } from '../parse.js';
import { toText } from '../print.js';
import { stripParen, mapNode, contains, walk } from '../ast.js';
import { evalFloat } from '../numeric.js';
import { chainsOf, varsOf } from '../../judges/domain.js';

const par = (e) => ({ t: 'paren', e });
const times = (a, b) => ({ t: 'bin', op: '×', l: par(a), r: par(b) });
const neg = (a) => ({ t: 'neg', e: par(a) });
const P = (text, cfg) => parse(text, { vars: cfg?.vars });

// ---------- domain lines ----------

// The chains of the previous line, or of the reference when the previous
// line is the region (the start of the part).
function baseChains(prev, cfg) {
  const vars = varsOf(cfg);
  const own = prev ? chainsOf(prev, vars) : null;
  if (Array.isArray(own) && own.length === vars.length) return own;
  if (!cfg.refLine) return null;
  const ref = chainsOf(parse(cfg.refLine, { vars }), vars);
  return Array.isArray(ref) ? ref : null;
}
const chainText = (cs) => cs.map((c) => `${typeof c.lo === 'string' ? c.lo : toText(c.lo)} ≤ ${c.v} ≤ ${typeof c.hi === 'string' ? c.hi : toText(c.hi)}`).join(' ; ');
const line = (cs, vars) => parse(chainText(cs), { vars });

// k·π as text: π/4, −π/2, 2π.
function piText(q) {
  const [n, d] = q;
  if (n === 0) return '0';
  const s = n < 0 ? '-' : '';
  const a = Math.abs(n);
  return `${s}${a === 1 ? '' : a}π${d === 1 ? '' : `/${d}`}`;
}
// A bound as a fraction of π, [n, d] with d ≤ 12, or null.
function piFraction(node) {
  const x = evalFloat(node, {}) / Math.PI;
  if (!Number.isFinite(x)) return null;
  for (let d = 1; d <= 12; d++) {
    const n = Math.round(x * d);
    if (Math.abs(n / d - x) < 1e-9) return [n, d];
  }
  return null;
}
// The neighbouring angles a student takes instead (π/2 ↔ π/4, π ↔ 2π…).
const NEIGHBOURS = {
  '1/4': ['1/2'], '1/2': ['1/4', '1'], '1': ['2', '1/2'], '2': ['1'], '1/6': ['1/3'], '1/3': ['1/6', '1/2'],
  '3/4': ['1/2', '1'], '-1/2': ['-1/4', '-1'], '-1/4': ['-1/2'], '-1': ['-1/2'],
};
const qKey = ([n, d]) => (d === 1 ? String(n) : `${n}/${d}`);
const qOf = (k) => (k.includes('/') ? k.split('/').map(Number) : [Number(k), 1]);

function angleCandidates(prev, ctx, v) {
  const cfg = ctx.cfg || {};
  const cs = baseChains(prev, cfg);
  if (!cs) return [];
  const vars = varsOf(cfg);
  const out = [];
  cs.forEach((c, i) => {
    if (c.v !== v) return;
    for (const side of ['lo', 'hi']) {
      const f = piFraction(c[side]);
      if (!f) continue;
      for (const k of NEIGHBOURS[qKey(f)] || []) {
        const copy = cs.map((x) => ({ ...x }));
        copy[i][side] = piText(qOf(k));
        out.push({ node: line(copy, vars), ctx: { wrong: piText(qOf(k)).replace('-', '−'), right: piText(f).replace('-', '−'), v } });
      }
    }
  });
  return out;
}

// θ measured from the plane xy: [a ; b] becomes [π/2 − b ; π/2 − a].
function thetaFromPlane(prev, ctx) {
  const cfg = ctx.cfg || {};
  if ((cfg.coords || 'cart') !== 'sph') return [];
  const cs = baseChains(prev, cfg);
  if (!cs) return [];
  const i = cs.findIndex((c) => c.v === 'θ');
  if (i < 0) return [];
  const copy = cs.map((x) => ({ ...x }));
  copy[i] = { v: 'θ', lo: `π/2-(${toText(cs[i].hi)})`, hi: `π/2-(${toText(cs[i].lo)})` };
  return [{ node: line(copy, varsOf(cfg)) }];
}

// The surfaces swapped: z from the top to the bottom.
function zSwapped(prev, ctx) {
  const cfg = ctx.cfg || {};
  if (!cfg.volume) return [];
  const cs = baseChains(prev, cfg);
  if (!cs) return [];
  const i = cs.findIndex((c) => c.v === 'z');
  if (i < 0) return [];
  const copy = cs.map((x) => ({ ...x }));
  copy[i] = { v: 'z', lo: cs[i].hi, hi: cs[i].lo };
  return [{ node: line(copy, varsOf(cfg)), ctx: { haut: toText(cs[i].hi).replace(/-/g, '−').replace(/\^2/g, '²') } }];
}

// ---------- integrands (equiv with cfg.jac) ----------

const isJacStart = (prev, cfg) => {
  if (!cfg?.jac) return false;
  try { return toText(stripParen(prev)) === toText(stripParen(P(cfg.jac.from, cfg))); } catch { return false; }
};

// The integrand without its jacobian, or with r in place of r²·sin θ.
function jacForgotEquiv(prev, ctx) {
  const cfg = ctx.cfg || {};
  if (!isJacStart(prev, cfg)) return [];
  const f = cfg.jac.factor;
  const out = [{ node: prev, ctx: { jac: f.replace(/×/g, '·') } }];
  if (f !== 'r') out.push({ node: times(prev, P('r', cfg)), ctx: { jac: f.replace(/×/g, '·') } }, { node: times(prev, P('r^2', cfg)), ctx: { jac: f.replace(/×/g, '·') } });
  return out;
}

// Integrals over r: the jacobian taken out of the integrand.
function jacForgotDefinite(prev, ctx) {
  const f = ctx.cfg?.jacFactor;
  if (!f || !contains(prev, (n) => n.t === 'int' && n.v === 'r')) return [];
  const J = parse(f);
  const node = mapNode(prev, (n) => (n.t === 'int' && n.v === 'r' ? { ...n, e: { t: 'frac', n: par(n.e), d: par(J) } } : n));
  return [{ node, ctx: { jac: f.replace(/×/g, '·') } }];
}

// θ from the plane: z = r sin θ, x = r cos θ cos φ, dV = r² cos θ.
const PLANE = { x: 'r×cos(θ)×cos(φ)', y: 'r×cos(θ)×sin(φ)', z: 'r×sin(θ)' };
function thetaFromPlaneEquiv(prev, ctx) {
  const cfg = ctx.cfg || {};
  if (!isJacStart(prev, cfg) || !cfg.subst?.z || !/θ/.test(cfg.jac.factor)) return [];
  const sub = (map) => mapNode(prev, (n) => (n.t === 'sym' && !n.sub && map[n.name] ? par(P(map[n.name], cfg)) : n));
  const right = Object.fromEntries(Object.entries(cfg.subst));
  const wrongJ = P('r^2×cos(θ)', cfg);
  return [
    { node: times(sub(PLANE), wrongJ) },
    { node: times(sub(right), wrongJ) },
    { node: times(sub(PLANE), P(cfg.jac.factor, cfg)) },
  ];
}

function swappedEquiv(prev, ctx) {
  const cfg = ctx.cfg || {};
  if (!cfg.volume) return [];
  if (isJacStart(prev, cfg)) return [{ node: neg(times(prev, P(cfg.jac.factor, cfg))) }, { node: neg(prev) }];
  return [{ node: neg(prev) }];
}

// ---------- Gauss ----------

// ∫ of e^(−t²) over ℝ.
function isGauss(prev) {
  let hit = false;
  walk(prev, (n) => {
    if (n.t === 'int' && n.lo && toText(n.e) === toText(parse(`e^(-${n.v}^2)`, { vars: [n.v] }))) hit = true;
    return !hit;
  });
  return hit;
}

const GAUSS_WHY = {
  π: "π, c'est l'intégrale double ∬ e^(−(x² + y²)) = (∫ e^(−x²) dx)². L'intégrale simple est sa racine : √π.",
  '√π/2': "√π/2, c'est l'intégrale de 0 à +∞ seulement. Sur ℝ tout entier, la fonction paire donne le double : √π.",
  '2√π': "Le carré de l'intégrale simple vaut π, donc l'intégrale vaut √π, pas 2√π : il n'y a pas de facteur 2.",
};
const POLAR_EXPLAIN = 'Une petite case en polaires a pour aire r dr dφ, pas dr dφ : le jacobien r multiplie l\'intégrande (r² sin θ en sphériques, r en cylindriques).';

export const DEFS = {
  a2_jacobian_forgot: {
    name: 'Jacobien oublié',
    judges: ['equiv', 'definite'],
    transform: (prev, ctx) => [...jacForgotEquiv(prev, ctx), ...jacForgotDefinite(prev, ctx)],
    explain: (ctx = {}) => (ctx.jac && ctx.jac !== 'r'
      ? `En sphériques, dV = r² sin θ dr dθ dφ : l'intégrande doit être multiplié par ${ctx.jac}, pas par r ni par 1.`
      : POLAR_EXPLAIN),
    check: {
      judge: { kind: 'equiv', vars: ['x', 'y', 'r', 'φ'], subst: { x: 'r×cos(φ)', y: 'r×sin(φ)' }, jac: { from: 'y', factor: 'r' }, domain: { r: [0.1, 2], φ: [0, 6.28] }, target: 'only', finalVars: ['r', 'φ'] },
      prev: 'y', line: 'r×sin(φ)',
    },
  },
  a2_polar_angle_bounds: {
    name: 'Bornes de l\'angle',
    judges: ['domain'],
    transform: (prev, ctx) => [...angleCandidates(prev, ctx, 'φ'), ...angleCandidates(prev, ctx, 'θ')],
    explain: (ctx = {}) => (ctx.right
      ? `Ta borne de ${ctx.v} est ${ctx.wrong}, mais le domaine s'arrête à ${ctx.v} = ${ctx.right}. Dessine les demi-droites qui le bordent : y = x, c'est tg φ = 1, donc φ = π/4.`
      : 'y ≤ x veut dire tg φ ≤ 1, donc φ ≤ π/4 : lis l\'angle sur le dessin, demi-droite par demi-droite.'),
    check: {
      judge: { kind: 'domain', coords: 'polar', region: ['x^2+y^2 ≤ 4', 'y ≥ 0', 'y ≤ x'], box: [[-0.2, 2.2], [-0.2, 2.2]], refLine: '0 ≤ φ ≤ π/4 ; 0 ≤ r ≤ 2' },
      prev: 'x^2+y^2 ≤ 4 ; 0 ≤ y ≤ x', line: '0 ≤ φ ≤ π/2 ; 0 ≤ r ≤ 2',
    },
  },
  a2_sph_theta_from_plane: {
    name: 'θ mesuré depuis le plan xy',
    judges: ['domain', 'equiv'],
    transform: (prev, ctx) => [...thetaFromPlane(prev, ctx), ...thetaFromPlaneEquiv(prev, ctx)],
    check: {
      judge: { kind: 'equiv', vars: ['x', 'y', 'z', 'r', 'θ', 'φ'], subst: { x: 'r×sin(θ)×cos(φ)', y: 'r×sin(θ)×sin(φ)', z: 'r×cos(θ)' }, jac: { from: 'z^2', factor: 'r^2×sin(θ)' }, domain: { r: [0.1, 2], θ: [0.05, 3.1], φ: [0, 6.28] }, target: 'only', finalVars: ['r', 'θ', 'φ'] },
      prev: 'z^2', line: 'r^4×sin(θ)^2×cos(θ)',
    },
  },
  a2_improper_exponent: {
    name: 'Seuil de convergence en dimension n',
    judges: [],
    // The verdict a student gets with the threshold of dimension 1.
    wrongValues: (item) => (item?.alpha !== undefined ? [{ value: (item.outside ? item.alpha > 1 : item.alpha < 1) ? 'converge' : 'diverge' }] : []),
    explain: (ctx = {}) => (ctx.n
      ? `En dimension ${ctx.n}, le jacobien ajoute r^${ctx.n - 1} : on intègre r^(${ctx.n - 1} − α). Il faut α > ${ctx.n} loin de 0, α < ${ctx.n} près de 0.`
      : 'En dimension n, le jacobien ajoute rⁿ⁻¹ : on intègre rⁿ⁻¹⁻ᵅ. Loin de 0, il faut α > n (et pas α > 1) ; près de 0, α < n.'),
    check: { bait: { skill: 'a2-improper-multi', level: 3 } },
  },
  a2_gauss_sqrt: {
    name: 'Gauss : π au lieu de √π',
    judges: ['definite'],
    transform: (prev) => (isGauss(prev) ? ['π', '√π/2', '2√π'].map((t) => ({ node: parse(t), ctx: { wrong: t } })) : []),
    wrongValues: () => ['π', '√π/2', '2√π'].map((value) => ({ value })),
    explain: (ctx = {}) => GAUSS_WHY[ctx.wrong] || GAUSS_WHY.π,
    check: { judge: { kind: 'definite' }, prev: 'int(e^(-x^2),x,-∞,∞)', line: 'π' },
  },
  a2_volume_surfaces_swapped: {
    name: 'Surfaces du dessus et du dessous inversées',
    judges: ['domain', 'equiv', 'definite'],
    transform: (prev, ctx) => {
      const cfg = ctx.cfg || {};
      if (!cfg.volume) return [];
      if (cfg.kind === 'domain' || cfg.coords) return zSwapped(prev, ctx);
      if (cfg.jac || cfg.vars?.length) return swappedEquiv(prev, ctx);
      return [{ node: neg(prev) }];
    },
    explain: (ctx = {}) => (ctx.haut
      ? `La surface du dessus est z = ${ctx.haut} : z va de la surface du dessous à celle du dessus, sinon le volume est négatif ou vide.`
      : 'Ton volume est négatif : tu as pris (dessous − dessus). Le volume est ∬ (dessus − dessous), la surface du dessus étant la plus haute au-dessus de R.'),
    check: {
      judge: { kind: 'domain', coords: 'cyl', region: ['z ≥ x^2+y^2', 'z ≤ 8-x^2-y^2'], box: [[-2.2, 2.2], [-2.2, 2.2], [-0.2, 8.2]], volume: true, refLine: '0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 2 ; r^2 ≤ z ≤ 8-r^2' },
      prev: 'z = x^2+y^2 ; z = 8-x^2-y^2', line: '0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 2 ; 8-r^2 ≤ z ≤ r^2',
    },
  },
};

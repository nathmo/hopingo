// Traps of module G4, part a (spec §7; step U5): vectors, lines of the
// plane, dot product, bisectors, lines of space, planes, relative positions.
// Catalogue: docs/universite/G-gymnase-2.md, G4, « Pièges du module ».
//
// The line traps read what the generators put in the judge's cfg:
//   cfg.proj2 = {u, v}   (texts of components: the projection of u on v, judge vector)
//   cfg.via = text       (the relation that gives the point: 2M - A, A + vec(B,C))
//   cfg.lineData = {A, n}          (line2 through A with normal n: texts)
//   cfg.l3 = {rows, A}             (line3: two plane rows [a, b, c, d], a point)
//   cfg.obtuse = {wrong}           (the angle of two vectors, when the lines' angle is asked)
//   cfg.bis = {r1, r2, N1, N2}     (bisectors of r1 = 0, r2 = 0; norms of the normals)
//   cfg.planeData = {A, u, v}      (plane through A with directions u, v)
// and those of module L (cfg.pc, cfg.proj, cfg.gs: js/cas/rules/l-orth.js).
// A candidate line of the judge `vector` is vl(value), of `geom` gl(cfg, text).

import { Q } from '../../math/rational.js';
import { lit, sqrt as sqrtN, mul, div } from '../ast.js';
import { simp } from '../matexpr.js';
import { V, vText, envFrom, namesOf, parseVec, evalVec } from '../vecexpr.js';
import { PROJ_NO_SQUARE_L } from './l-orth.js';
import { readObject } from '../geomobj.js';
import { t } from '../../i18n.js';

const q = (x) => (x instanceof Q ? x : new Q(Number(x)));
const dotQ = (u, v) => u.reduce((s, x, i) => s.add(q(x).mul(q(v[i]))), new Q(0));
// A line of the judge vector holding a value.
export const vl = (value, label = null) => ({ t: 'vline', text: `${label ? `${label} = ` : ''}${vText(value)}`, label, members: [{ ast: null, value }], value });

// The value of a text in the judge's names (cfg.symbols), or null.
export function valueIn(cfg, text) {
  try {
    const opts = { params: cfg.params || [] };
    const env = envFrom(cfg.symbols || {}, opts);
    return evalVec(parseVec(text, { ...opts, names: namesOf(env) }), env, opts);
  } catch { return null; }
}
// Candidate lines from texts (those that compute).
const fromTexts = (cfg, texts, ctx = {}) => texts.map((t) => valueIn(cfg, t)).filter(Boolean).map((v) => ({ node: vl(v), ctx }));
// The relation of the line: the last member of prev as written, else cfg.via.
function relationOf(prev, cfg) {
  const m = prev?.members?.[prev.members.length - 1];
  if (m?.ast && /vec|[A-Z]{2}/.test(prev.text)) return prev.text.split('=').pop().trim();
  return cfg.via || null;
}
const swapVec = (t) => t.replace(/vec\(\s*([A-Z]'?)\s*,\s*([A-Z]'?)\s*\)/g, 'vec($2,$1)');

export const RULES = [
  {
    id: 'g4_vector_reversed', family: 'geometry', tag: 'E', skill: 'g4-vectors', repair: 'g4-vectors',
    example: ['AB⃗ = A − B', 'B − A'], name: t("Vecteur pris à l'envers"),
    judges: ['vector'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      const rel = relationOf(prev, cfg);
      if (!rel || !/vec\(/.test(rel)) return [];
      return fromTexts(cfg, [swapVec(rel)]);
    },
    explain: () => t("Le vecteur AB⃗ va de A vers B : c'est B − A, l'arrivée moins le départ. Tu as calculé A − B."),
    check: { judge: { kind: 'vector', symbols: { A: '(2 ; 1)', B: '(5 ; -3)', C: '(6 ; 3)' }, expect: '(3 ; 7)', via: 'A + vec(B,C)' }, prev: 'D', line: '(1 ; -5)' },
  },
  {
    id: 'g4_midpoint_half', family: 'rule', tag: 'E', skill: 'g4-vectors', repair: 'g4-vectors',
    example: ['M = (B − A)/2', '(A + B)/2'], name: t('Milieu pris pour la moitié du vecteur'),
    judges: ['vector'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      const rel = relationOf(prev, cfg);
      if (!rel) return [];
      const out = [];
      let m = /^2([A-Z])\s*-\s*([A-Z])$/.exec(rel.replace(/\s+/g, ''));
      if (m) out.push(`${m[1]} - ${m[2]}`, `2${m[1]} + ${m[2]}`);
      m = /^\(([A-Z])\+([A-Z])\)\/2$/.exec(rel.replace(/\s+/g, ''));
      if (m) out.push(`(${m[2]} - ${m[1]})/2`, `(${m[1]} - ${m[2]})/2`);
      return fromTexts(cfg, out);
    },
    explain: () => t('(B − A)/2 est la moitié du vecteur AB⃗, pas le milieu. Le milieu est la moyenne des coordonnées : M = (A + B)/2, donc C = 2M − A quand M est le milieu de [AC].'),
    check: { judge: { kind: 'vector', symbols: { A: '(2 ; 1)', M: '(4 ; 2)' }, expect: '(6 ; 3)', via: '2M - A' }, prev: 'C', line: '(2 ; 1)' },
  },
  {
    id: 'g4_proj_no_square', family: 'geometry', tag: 'E', skill: 'g4-dot', repair: 'g4-dot',
    example: ['(u·v/‖v‖)·v', '(u·v/‖v‖²)·v'],
    // Module L (projections onto a subspace, Gram-Schmidt) and G4 (the
    // projection of a vector on another, judge vector).
    name: PROJ_NO_SQUARE_L.name,
    judges: ['mat', 'value', 'vector'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      if (cfg.kind !== 'vector') return PROJ_NO_SQUARE_L.transform(prev, ctx);
      if (!cfg.proj2) return [];
      const { u, v } = cfg.proj2;
      const d = dotQ(u, v);
      const n2 = dotQ(v, v);
      const k1 = simp(div(lit(d), sqrtN(lit(n2))));
      return [
        { node: vl(V(v.map((x) => simp(mul(k1, lit(q(x))))))), ctx: { n2: String(n2) } },
        { node: vl(V(v.map((x) => lit(d.mul(q(x)))))), ctx: { n2: String(n2) } },
      ];
    },
    explain: PROJ_NO_SQUARE_L.explain,
    check: PROJ_NO_SQUARE_L.check,
  },
  {
    id: 'g4_normal_as_direction', family: 'geometry', tag: 'E', skill: 'g4-line2', repair: 'g4-line2',
    example: [t('2x − 3y − 8 = 0 a la direction (2 ; −3)'), '(3 ; 2)'], name: t('Vecteur normal pris pour directeur'),
    judges: ['geom'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      if (cfg.lineData) {
        // The line through A whose direction is the normal (a ; b).
        const [a, b] = cfg.lineData.n.map(q);
        const [x, y] = cfg.lineData.A.map(q);
        return gl(2, `(x ; y) = (${x} ; ${y}) + t(${a} ; ${b})`, { n: `(${a} ; ${b})`.replace(/-/g, '−') });
      }
      if (cfg.l3) {
        const n = cfg.l3.rows[0].slice(0, 3);
        return gl(3, `(x ; y ; z) = (${cfg.l3.A.join(' ; ')}) + t(${n.join(' ; ')})`, { n: `(${n.join(' ; ')})`.replace(/-/g, '−') });
      }
      return [];
    },
    explain: (ctx = {}) => (ctx.n
      ? t('Dans ax + by + c = 0, (a ; b) = {n} est perpendiculaire à la droite : c\'est un vecteur normal. Une direction est (−b ; a).', { n: ctx.n })
      : t('Dans ax + by + c = 0, (a ; b) est perpendiculaire à la droite : c\'est un vecteur normal. Une direction est (−b ; a).')),
    check: { judge: { kind: 'geom', object: 'line2', ref: '2x - 3y - 8 = 0', lineData: { A: ['1', '-2'], n: ['2', '-3'] } }, prev: 'd', line: '3x + 2y + 1 = 0' },
  },
  {
    id: 'g4_line_constant', family: 'sign', tag: 'E', skill: 'g4-line2', repair: 'g4-line2',
    example: [t('2x − 3y = 8 écrit 2x − 3y + 8 = 0'), '2x − 3y − 8 = 0'], name: t('Constante de la droite (ou du plan) fausse'),
    judges: ['geom'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      if (!cfg.ref || !['line2', 'plane'].includes(cfg.object) || cfg.count) return [];
      let o;
      try { o = readObject(cfg.ref, { dim: cfg.object === 'plane' ? 3 : 2 }); } catch { return []; }
      if (o.kind !== 'affine' || o.rows.length !== 1) return [];
      const row = o.rows[0];
      const c = row[row.length - 1];
      if (c.n === 0) return [];
      return [c.neg(), new Q(0)].map((k) => ({ node: { t: 'gline', text: '', obj: { kind: 'affine', dim: o.dim, rows: [[...row.slice(0, -1), k]] } }, ctx: {} }));
    },
    explain: () => t('Ta droite (ou ton plan) a la bonne direction, mais ne passe pas par le point donné. Calcule la constante en remplaçant les coordonnées de ce point.'),
    check: { judge: { kind: 'geom', object: 'line2', ref: '2x - 3y - 8 = 0' }, prev: 'd', line: '2x - 3y + 8 = 0' },
  },
  {
    id: 'g4_angle_obtuse', family: 'geometry', tag: 'E', skill: 'g4-dot', repair: 'g4-dot',
    example: [t('angle de deux droites 2π/3'), 'π/3'], name: t('Angle obtus donné pour deux droites'),
    judges: ['vector'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      if (!cfg.obtuse) return [];
      return fromTexts(cfg, [cfg.obtuse.wrong]);
    },
    explain: () => t('Deux droites font deux angles, θ et π − θ. On donne le plus petit, avec |cos θ|.'),
    check: { judge: { kind: 'vector', expect: 'π/3', angle: true, obtuse: { wrong: '2π/3' } }, prev: 'θ', line: '2π/3' },
  },
  {
    id: 'g4_bisector_unnormalized', family: 'geometry', tag: 'E', skill: 'g4-bisectors', repair: 'g4-bisectors',
    example: [t('|a₁x + b₁y + c₁| = |a₂x + b₂y + c₂| sans les normes'), t('divisé par ‖n₁‖ et ‖n₂‖')], name: t('Bissectrices sans diviser par les normes'),
    judges: ['geom'],
    transform(prev, ctx) {
      const b = ctx?.cfg?.bis;
      if (!b || b.N1 === b.N2) return [];
      const L = (r) => `(${r[0]}x + (${r[1]})y + (${r[2]}))`;
      return gl(2, `${L(b.r1)} = ${L(b.r2)} ou ${L(b.r1)} = -${L(b.r2)}`, { N1: b.N1, N2: b.N2 });
    },
    explain: (ctx = {}) => (ctx.N1
      ? t('Les normales n\'ont pas la même longueur (‖n₁‖ = {N1}, ‖n₂‖ = {N2}). Une expression ax + by + c n\'est une distance qu\'après division par √(a² + b²).', { N1: ctx.N1, N2: ctx.N2 })
      : t('Les normales n\'ont pas la même longueur. Une expression ax + by + c n\'est une distance qu\'après division par √(a² + b²).')),
    check: { judge: { kind: 'geom', object: 'line2', count: 2, ref: '2x + y - 3 = 0 ou x - 2y + 1 = 0', bis: { r1: ['1', '0', '-1'], r2: ['3', '4', '-7'], N1: 1, N2: 5 } }, prev: 'b', line: 'x + 2y - 3 = 0 ou x + y - 2 = 0' },
  },
  {
    id: 'g4_bisector_one_sign', family: 'method', tag: 'E', skill: 'g4-bisectors', repair: 'g1-abs-eq',
    example: [t('une seule bissectrice'), t('les deux')], name: t('Une seule des deux bissectrices'),
    judges: ['geom'],
    transform(prev, ctx) {
      const b = ctx?.cfg?.bis;
      if (!b) return [];
      const L = (r) => `(${r[0]}x + (${r[1]})y + (${r[2]}))`;
      return [...gl(2, `${L(b.r1)}/${b.N1} = ${L(b.r2)}/${b.N2}`), ...gl(2, `${L(b.r1)}/${b.N1} = -${L(b.r2)}/${b.N2}`)];
    },
    explain: () => t('|A| = |B| donne A = B ou A = −B : il y a deux bissectrices, perpendiculaires.'),
    check: { judge: { kind: 'geom', object: 'line2', count: 2, ref: '2x + y - 3 = 0 ou x - 2y + 1 = 0', bis: { r1: ['1', '0', '-1'], r2: ['3', '4', '-7'], N1: 1, N2: 5 } }, prev: 'b', line: '2x + y - 3 = 0' },
  },
  {
    id: 'g4_line3_one_equation', family: 'geometry', tag: 'E', skill: 'g4-line3', repair: 'g4-line3',
    example: [t('(x − 1)/2 = (y + 2)/1 seul'), t('deux équations')], name: t("Une seule équation pour une droite de l'espace"),
    judges: ['geom'],
    transform(prev, ctx) {
      const l3 = ctx?.cfg?.l3;
      if (!l3) return [];
      return l3.rows.flatMap((r) => gl(3, `${r[0]}x + (${r[1]})y + (${r[2]})z + (${r[3]}) = 0`));
    },
    explain: () => t('Une seule équation en x, y, z décrit un plan. Il en faut deux pour une droite.'),
    check: { judge: { kind: 'geom', object: 'line3', ref: '(x ; y ; z) = (1 ; -2 ; 3) + t(2 ; 1 ; -1)', l3: { rows: [['1', '-2', '0', '-5'], ['0', '1', '1', '-1']], A: ['1', '-2', '3'] } }, prev: 'd', line: 'x - 2y - 5 = 0' },
  },
  {
    id: 'g4_normal_sum', family: 'geometry', tag: 'E', skill: 'g4-plane', repair: 'g4-dot',
    example: ['n⃗ = AB⃗ + AC⃗', t('solution de n⃗·AB⃗ = n⃗·AC⃗ = 0')], name: t('Normale prise dans le plan'),
    judges: ['vector', 'geom'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      const p = cfg.planeData;
      if (!p) return [];
      const u = p.u.map(q);
      const v = p.v.map(q);
      const A = p.A.map(q);
      const ns = [u.map((x, i) => x.add(v[i])), u.map((x, i) => x.sub(v[i]))].filter((n) => n.some((x) => x.n !== 0));
      const show = (n) => `(${n.join(' ; ')})`.replace(/-/g, '−');
      if (cfg.kind === 'vector') return ns.map((n) => ({ node: vl(V(n.map((x) => lit(x)))), ctx: { n: show(n) } }));
      return ns.flatMap((n) => gl(3, `${n[0]}(x - (${A[0]})) + (${n[1]})(y - (${A[1]})) + (${n[2]})(z - (${A[2]})) = 0`, { n: show(n) }));
    },
    explain: (ctx = {}) => t('{n} est dans le plan, pas perpendiculaire à lui. La normale doit être orthogonale aux deux directions : n⃗·u⃗ = 0 et n⃗·v⃗ = 0.', { n: ctx.n ? ctx.n : 'u⃗ + v⃗' }),
    check: { judge: { kind: 'vector', expect: '(4 ; -3 ; 5)', multiple: true, planeData: { A: ['1', '0', '2'], u: ['2', '1', '-1'], v: ['-1', '2', '2'] } }, prev: 'n', line: '(1 ; 3 ; 1)' },
  },
  {
    id: 'g4_skew_as_secant', family: 'geometry', tag: 'E', skill: 'g4-relative-pos', repair: 'g4-relative-pos',
    example: [t('non parallèles ⇒ sécantes'), t('gauches')], name: t('Droites gauches prises pour sécantes'),
    judges: [],
    explain: () => t("Dans l'espace, deux droites non parallèles peuvent ne jamais se couper : si le système en s et t n'a pas de solution (la 3e équation est fausse), elles sont gauches."),
    check: { bait: { skill: 'g4-relative-pos', exam: 'mcq' } },
  },
  {
    id: 'g4_param_same_letter', family: 'method', tag: 'E', skill: 'g4-relative-pos', repair: 'g4-relative-pos',
    example: ['A + t·u⃗ = B + t·v⃗', 'A + s·u⃗ = B + t·v⃗'], name: t('Même paramètre pour deux droites'),
    judges: [],
    explain: () => t('Avec le même paramètre t, tu cherches deux mobiles au même instant. Le point commun peut être atteint à des instants différents : prends s et t.'),
    check: { bait: { skill: 'g4-relative-pos', exam: 'mcq' } },
  },
];

// Candidate lines of the judge geom from texts (those that read).
function gl(dim, text, ctx = {}) {
  try { return [{ node: { t: 'gline', text, obj: readObject(text, { dim }) }, ctx }]; } catch { return []; }
}


// Traps of module G4, part a (spec §7; step U5): vectors, lines of the
// plane, dot product, bisectors, lines of space, planes, relative positions.
// Catalogue: docs/universite/G-gymnase-2.md, G4, « Pièges du module ».
//
// The line traps read what the generators put in the judge's cfg:
//   cfg.proj2 = {u, v}   (texts of components: the projection of u on v, judge vector)
// and those of module L (cfg.pc, cfg.proj, cfg.gs: js/cas/rules/l-orth.js).
// A candidate line of the judge `vector` is vl(value), of `geom` gl(cfg, text).

import { Q } from '../../math/rational.js';
import { lit, sqrt as sqrtN, mul, div } from '../ast.js';
import { simp } from '../matexpr.js';
import { V, vText, envFrom, namesOf, parseVec, evalVec } from '../vecexpr.js';
import { PROJ_NO_SQUARE_L } from './l-orth.js';

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
    example: ['AB⃗ = A − B', 'B − A'], name: "Vecteur pris à l'envers",
    judges: ['vector'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      const rel = relationOf(prev, cfg);
      if (!rel || !/vec\(/.test(rel)) return [];
      return fromTexts(cfg, [swapVec(rel)]);
    },
    explain: () => "Le vecteur AB⃗ va de A vers B : c'est B − A, l'arrivée moins le départ. Tu as calculé A − B.",
    check: { judge: { kind: 'vector', symbols: { A: '(2 ; 1)', B: '(5 ; -3)', C: '(6 ; 3)' }, expect: '(3 ; 7)', via: 'A + vec(B,C)' }, prev: 'D', line: '(1 ; -5)' },
  },
  {
    id: 'g4_midpoint_half', family: 'rule', tag: 'E', skill: 'g4-vectors', repair: 'g4-vectors',
    example: ['M = (B − A)/2', '(A + B)/2'], name: 'Milieu pris pour la moitié du vecteur',
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
    explain: () => '(B − A)/2 est la moitié du vecteur AB⃗, pas le milieu. Le milieu est la moyenne des coordonnées : M = (A + B)/2, donc C = 2M − A quand M est le milieu de [AC].',
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
];


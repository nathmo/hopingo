// Counter-example and example properties of modules V, C, F, part va (step
// U10): {name: (params, answers) → {ok, message?, rule?}}, used by tf items
// with counter {kind: 'vcf', prop: name, params, ask, answer} and by
// example items (js/judges/vcf-examples.js).
//
// Domains of ℝ² or ℝ³ (v-domain-topo): dom = {dim, parts: [[atom…]…]}, a
// union of conjunctions; atom = [text, op] for « text op 0 », op one of
// '<', '>', '≤', '≥' (x, y, z). inDomain(dom, p) is exported for the
// generators (the drawings of vecto-a-topo.js).
//
//   setNotConvex {dom}  answers {P: '(1 ; 0)', Q: '(-1 ; 0)'}: P and Q are in
//       Ω and a point of the segment [P ; Q] is not (sampled on 400 points)
//   loopAroundHole {dom, hole: [x, y] | 'z'}  answers {g: '(2cos(t) ; 2sin(t)), t ∈ [0 ; 2π]'}:
//       a closed curve of Ω (400 points) that winds around the hole (the
//       point, or the z axis)

import { parse } from '../cas/parse.js';
import { compileFloat, evalFloat } from '../cas/numeric.js';
import { readParam, compile } from '../cas/paramgeo.js';

const XYZ = ['x', 'y', 'z'];
const CACHE = new Map();
function fn(text) {
  if (!CACHE.has(text)) {
    if (CACHE.size > 400) CACHE.delete(CACHE.keys().next().value);
    const c = compileFloat(parse(text, { vars: XYZ }));
    CACHE.set(text, (env) => { try { const v = c(env); return typeof v === 'number' ? v : NaN; } catch { return NaN; } });
  }
  return CACHE.get(text);
}
const env = (p) => ({ x: p[0], y: p[1], z: p[2] ?? 0 });
const EPS = 1e-9;

function atomHolds([text, op], p) {
  const v = fn(text)(env(p));
  if (!Number.isFinite(v)) return false;
  if (op === '<') return v < -EPS;
  if (op === '>') return v > EPS;
  if (op === '≤') return v <= EPS;
  return v >= -EPS;
}
export const inDomain = (dom, p) => dom.parts.some((conj) => conj.every((a) => atomHolds(a, p)));

// A point written « (a ; b) » or « (a ; b ; c) », numbers read by the CAS.
function readPoint(text, dim) {
  const t = String(text ?? '').trim().replace(/^[A-Za-z]\s*=\s*/, '').replace(/[−–]/g, '-');
  const m = /^\((.*)\)$/.exec(t);
  if (!m) return null;
  const xs = m[1].split(/[;]/).map((s) => s.trim());
  if (xs.length !== dim) return null;
  const out = xs.map((s) => { try { return evalFloat(parse(s, {}), {}); } catch { return NaN; } });
  return out.every(Number.isFinite) ? out : null;
}
const fmt = (p) => `(${p.map((x) => String(Math.round(x * 1000) / 1000).replace('.', ',').replace('-', '−')).join(' ; ')})`;

export const PROPS = {
  setNotConvex(params, answers) {
    const { dom } = params;
    const P = readPoint(answers.P, dom.dim);
    const Q = readPoint(answers.Q, dom.dim);
    if (!P || !Q) return { ok: false, message: `Écris chaque point avec ses ${dom.dim} coordonnées : (a ; b${dom.dim === 3 ? ' ; c' : ''}).` };
    if (!inDomain(dom, P)) return { ok: false, message: `Le point ${fmt(P)} n'est pas dans Ω.` };
    if (!inDomain(dom, Q)) return { ok: false, message: `Le point ${fmt(Q)} n'est pas dans Ω.` };
    for (let k = 1; k < 400; k++) {
      const s = k / 400;
      const M = P.map((x, i) => x + s * (Q[i] - x));
      if (!inDomain(dom, M)) return { ok: true };
    }
    return { ok: false, message: 'Tout le segment entre tes deux points reste dans Ω : choisis-les de part et d\'autre du trou ou du morceau qui manque.', rule: 'v_convex_star_confuse' };
  },
  loopAroundHole(params, answers) {
    const { dom, hole } = params;
    let par;
    try { par = readParam(String(answers.g ?? ''), { params: ['t'] }); } catch { return { ok: false, message: 'Écris ta courbe : (… ; …), t ∈ [a ; b].' }; }
    if (!par?.comps || par.comps.length !== dom.dim) return { ok: false, message: `Écris ta courbe avec ${dom.dim} composantes : (… ; …${dom.dim === 3 ? ' ; …' : ''}), t ∈ [a ; b].` };
    const p = par.params[0];
    const b = par.bounds[p];
    if (!b) return { ok: false, message: 'Donne aussi l\'intervalle du paramètre : t ∈ [a ; b].' };
    const f = compile(par);
    const N = 400;
    const pts = [];
    for (let k = 0; k <= N; k++) pts.push(f(b[0] + ((b[1] - b[0]) * k) / N));
    if (pts.some((q) => q.some((x) => !Number.isFinite(x)))) return { ok: false, message: 'Je n\'arrive pas à calculer ta courbe.' };
    const bad = pts.find((q) => !inDomain(dom, q));
    if (bad) return { ok: false, message: `Ta courbe sort de Ω, par exemple en ${fmt(bad)}.` };
    const a0 = pts[0];
    const a1 = pts[N];
    if (Math.hypot(...a0.map((x, i) => x - a1[i])) > 1e-6) return { ok: false, message: 'Ta courbe n\'est pas fermée : elle ne revient pas à son point de départ.' };
    const c = hole === 'z' ? [0, 0] : hole;
    let turn = 0;
    for (let k = 0; k < N; k++) {
      const u = Math.atan2(pts[k][1] - c[1], pts[k][0] - c[0]);
      const v = Math.atan2(pts[k + 1][1] - c[1], pts[k + 1][0] - c[0]);
      let dlt = v - u;
      while (dlt > Math.PI) dlt -= 2 * Math.PI;
      while (dlt < -Math.PI) dlt += 2 * Math.PI;
      turn += dlt;
    }
    if (Math.abs(turn) < Math.PI) return { ok: false, message: 'Ta courbe fermée n\'entoure pas le trou : elle se réduit à un point dans Ω.', rule: 'v_rot_closed_zero' };
    return { ok: true };
  },
};

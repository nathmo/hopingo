// Counter-example properties of module A2, part c (step U6): {name: (params,
// answers) → {ok, message?, rule?}}, used by tf items with counter
// {kind: 'a2', prop: name, params, ask, answer} (js/judges/a2-examples.js).
//
//   fxxNeqFyy {}                 answers {f}: ∂²f/∂x² ≠ ∂²f/∂y² somewhere
//   polarGradIdentity {factor}   answers {f}: f_x² + f_y² ≠ f̃_r² + factor·f̃_φ²
//                                somewhere (f̃(r, φ) = f(r cos φ, r sin φ))
//   notHarmonic {f, n}           answers {x, y(, z)}: a point ≠ 0 where Δf ≠ 0
//   p2NotMin {p2}                answers {f}: f has the Taylor polynomial p2 of
//                                order 2 at (0, 0), and f(0, 0) is not a local minimum

import { parse } from '../cas/parse.js';
import { evalFloat } from '../cas/numeric.js';
import { diff, pdiff } from '../cas/diff.js';
import { substVar } from '../cas/diff.js';
import { jet, sameJet } from '../cas/jet.js';
import { makeRng } from '../content/random.js';

const XY = ['x', 'y'];
const read = (t, vars = XY) => parse(String(t ?? '').trim(), { vars });
const differ = (a, b) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) > 1e-6 * (1 + Math.abs(a) + Math.abs(b));

// Points of the plane (or of a box) away from 0, drawn the same way each time.
function points(k = 24, vars = XY, lo = -2, hi = 2) {
  const rng = makeRng(29);
  const out = [];
  for (let i = 0; i < k; i++) out.push(Object.fromEntries(vars.map((v) => [v, lo + (hi - lo) * rng.next()])));
  return out;
}

export const PROPS = {
  fxxNeqFyy: (p, ans) => {
    if (!String(ans.f ?? '').trim()) return { ok: false, message: 'Donne une fonction f(x, y).' };
    const f = read(ans.f);
    const fxx = pdiff(f, ['x', 'x']);
    const fyy = pdiff(f, ['y', 'y']);
    if (points().some((env) => differ(evalFloat(fxx, env), evalFloat(fyy, env)))) return { ok: true };
    return { ok: false, message: 'Pour ta fonction, ∂²f/∂x² = ∂²f/∂y² partout : cherche une fonction où x et y ne jouent pas le même rôle, comme f = x².' };
  },
  polarGradIdentity: (p, ans) => {
    if (!String(ans.f ?? '').trim()) return { ok: false, message: 'Donne une fonction f(x, y).' };
    const f = read(ans.f);
    const fx = diff(f, 'x');
    const fy = diff(f, 'y');
    const pol = substVar(substVar(f, 'x', read('r cos(φ)', ['r', 'φ'])), 'y', read('r sin(φ)', ['r', 'φ']));
    const fr = diff(pol, 'r');
    const fp = diff(pol, 'φ');
    const k = Number(p.factor ?? 1);
    for (const env of points(24, ['r', 'φ'], 0.5, 2.5)) {
      const x = env.r * Math.cos(env.φ);
      const y = env.r * Math.sin(env.φ);
      const lhs = evalFloat(fx, { x, y }) ** 2 + evalFloat(fy, { x, y }) ** 2;
      const factor = Number.isFinite(k) ? k : evalFloat(read(p.factor, ['r', 'φ']), env);
      const rhs = evalFloat(fr, env) ** 2 + factor * evalFloat(fp, env) ** 2;
      if (differ(lhs, rhs)) return { ok: true };
    }
    return { ok: false, message: 'Pour ta fonction, les deux membres sont égaux partout : prends une fonction qui dépend de φ, comme f = x.' };
  },
  notHarmonic: (p, ans) => {
    const vars = Number(p.n) === 3 ? ['x', 'y', 'z'] : XY;
    const env = {};
    for (const v of vars) {
      const t = String(ans[v] ?? '').trim();
      if (!t) return { ok: false, message: `Donne un point (${vars.join(' ; ')}).` };
      env[v] = evalFloat(parse(t), {});
      if (!Number.isFinite(env[v])) return { ok: false, message: 'Je n\'arrive pas à lire ton point.' };
    }
    if (vars.every((v) => Math.abs(env[v]) < 1e-12)) return { ok: false, message: 'La fonction n\'est pas définie à l\'origine : prends un autre point.' };
    const f = read(p.f, vars);
    const lap = vars.reduce((s, v) => s + evalFloat(pdiff(f, [v, v]), env), 0);
    if (!Number.isFinite(lap)) return { ok: false, message: 'La fonction n\'est pas définie en ce point.' };
    if (Math.abs(lap) > 1e-9) return { ok: true };
    return { ok: false, message: 'En ce point, Δf = 0 : il faut un point où le laplacien ne s\'annule pas.' };
  },
  p2NotMin: (p, ans) => {
    if (!String(ans.f ?? '').trim()) return { ok: false, message: 'Donne une fonction f(x, y).' };
    const f = read(ans.f);
    const opts = { vars: XY, at: { x: 0, y: 0 }, order: 2 };
    let J;
    try { J = jet(f, opts); } catch { return { ok: false, message: 'Je n\'arrive pas à dériver ta fonction.' }; }
    if (sameJet(jet(read(p.p2), opts), J)) return { ok: false, message: `Le polynôme de Taylor d'ordre 2 de ta fonction en (0 ; 0) n'est pas ${String(p.p2).replace(/\^2/g, '²').replace(/-/g, ' − ').replace(/\+/g, ' + ')}.` };
    const f0 = evalFloat(f, { x: 0, y: 0 });
    for (const r of [1e-1, 1e-2, 1e-3]) {
      for (let k = 0; k < 16; k++) {
        const t = (k * Math.PI) / 8;
        const v = evalFloat(f, { x: r * Math.cos(t), y: r * Math.sin(t) });
        if (Number.isFinite(v) && v < f0 - 1e-12) return { ok: true };
      }
    }
    return { ok: false, message: 'Ta fonction a bien un minimum local en (0 ; 0) : cherche une direction où elle descend.' };
  },
};

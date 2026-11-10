// Counter-example properties of module A2, part h (step U6): {name: (params,
// answers) → {ok, message?, rule?}}, used by tf items with counter
// {kind: 'a2', prop: name, params, ask, answer} (js/judges/a2-examples.js).
//
//   odeBlowUp {v?, ic: {x, y}}  answers {f, y}: f(x, y) is C¹ on ℝ² (finite
//       with its ∂f/∂y on a grid), y solves y′ = f near x₀ with y(x₀) = y₀,
//       and y blows up at a finite x (|y| passes 10³ like a pole, within
//       10 of x₀): a local solution that is not global.
//   odeOutside {eq, v?, domain?, family?, ic?}  answers {y}: y solves eq (and
//       ic) and is not in the family (a text with the constant C), for no C
//       (without family: just a solution, against « there is none »).
//   odeComboFails {eq, homog, v?, domain?}  answers {y0, y1, C}: y0 solves
//       the homogeneous equation, y1 the whole one, and y0 + C·y1 does not
//       (C = 1 is refused with the trap a2_ode_superposition_nonhom).
//   odeSumFails {eq, v?, domain?}  answers {y1, y2}: two solutions whose sum
//       is not one.
//   odeUnbounded {eq, v?, domain?}  answers {y}: a solution (no constant)
//       unbounded on [0 ; +∞[ (|y| > 10⁶ somewhere in [0 ; 60]).

import { parse } from '../cas/parse.js';
import { evalFloat } from '../cas/numeric.js';
import { diff } from '../cas/diff.js';
import { symbolsIn } from '../cas/ast.js';
import { solves } from './ode.js';

const read = (text, v) => parse(String(text), { vars: [v, 'y'], dvar: v });
const val = (n, env) => { const r = evalFloat(n, env); return typeof r === 'number' ? r : NaN; };

// The answer is a function of v alone (no constant, no other letter).
function onlyV(text, v) {
  let n;
  try { n = read(text, v); } catch { return { error: 'Je n\'arrive pas à lire ta fonction.' }; }
  const extra = [...symbolsIn(n)].filter((s) => s !== v);
  if (extra.length) return { error: `Donne une fonction précise de ${v}, sans ${extra[0]}.` };
  return { node: n };
}

function isSolution(cfg, text) {
  try { return solves(cfg, text); } catch { return false; }
}

const cfgOf = (p) => ({ eq: p.eq, v: p.v || 'x', unknown: p.unknown || 'y', domain: p.domain, homog: p.homog });

function icOk(p, node) {
  if (!p.ic) return true;
  const v = p.v || 'x';
  const got = val(node, { [v]: Number(p.ic.x) });
  const want = val(parse(String(p.ic.y)), {});
  return Math.abs(got - want) <= 1e-7 * (1 + Math.abs(want));
}

// Is y = fam(v, C) for some real C? C is found at one point (scan and
// bisection on [−40 ; 40]), then checked at others.
function inFamily(y, fam, v, [lo, hi]) {
  const xs = Array.from({ length: 9 }, (_, i) => lo + ((hi - lo) * (i + 0.5)) / 9);
  const x0 = xs[2];
  const target = val(y, { [v]: x0 });
  if (!Number.isFinite(target)) return false;
  const g = (C) => val(fam, { [v]: x0, C }) - target;
  const roots = [];
  let a = -40;
  let ga = g(a);
  for (let i = 1; i <= 1600; i++) {
    const b = -40 + i * 0.05;
    const gb = g(b);
    if (Number.isFinite(ga) && Number.isFinite(gb)) {
      if (gb === 0) roots.push(b);
      else if (ga * gb < 0) {
        let l = a; let r = b; let gl = ga;
        for (let k = 0; k < 80; k++) { const m = (l + r) / 2; const gm = g(m); if (gl * gm <= 0) r = m; else { l = m; gl = gm; } }
        roots.push((l + r) / 2);
      }
    }
    a = b;
    ga = gb;
  }
  return roots.some((C) => xs.every((x) => {
    const p = val(y, { [v]: x });
    const q = val(fam, { [v]: x, C });
    return !Number.isFinite(p) || !Number.isFinite(q) || Math.abs(p - q) <= 1e-6 * (1 + Math.abs(p));
  }));
}

export const PROPS = {
  odeBlowUp: (p, ans) => {
    const v = p.v || 'x';
    const x0 = Number(p.ic.x);
    let f;
    try { f = read(ans.f, v); } catch { return { ok: false, message: 'Je n\'arrive pas à lire f.' }; }
    const extra = [...symbolsIn(f)].filter((s) => s !== v && s !== 'y');
    if (extra.length) return { ok: false, message: `f ne doit dépendre que de ${v} et y.` };
    const fy = diff(f, 'y');
    for (let i = -6; i <= 6; i++) {
      for (let j = -6; j <= 6; j++) {
        const env = { [v]: i / 2, y: j / 2 };
        if (!Number.isFinite(val(f, env)) || !Number.isFinite(val(fy, env))) return { ok: false, message: `f doit être C¹ sur ℝ² : en (${String(i / 2).replace('-', '−')} ; ${String(j / 2).replace('-', '−')}), f ou ∂f/∂y n'est pas définie.` };
      }
    }
    const y = onlyV(ans.y, v);
    if (y.error) return { ok: false, message: y.error };
    if (!icOk(p, y.node)) return { ok: false, message: `Ta solution ne vérifie pas y(${x0}) = ${p.ic.y}.` };
    if (!isSolution({ eq: `y'=${ans.f}`, v, domain: { [v]: [x0 - 0.1, x0 + 0.1] } }, ans.y)) return { ok: false, message: `Ta fonction ne vérifie pas y′ = f(${v}, y) près de ${x0}.` };
    // A blow-up: within 10 of x₀, |y| passes 10³ while ln|y| changes faster
    // than 200 per unit (a pole, not an exponential).
    for (const dir of [1, -1]) {
      for (let k = 1; k <= 10000; k++) {
        let x = x0 + dir * k * 1e-3;
        let yx = Math.abs(val(y.node, { [v]: x }));
        if (!Number.isFinite(yx)) { x -= dir * 1e-6; yx = Math.abs(val(y.node, { [v]: x })); }
        if (!Number.isFinite(yx)) break;
        if (yx > 1e3) {
          const back = Math.abs(val(y.node, { [v]: x - dir * 1e-6 }));
          if (Number.isFinite(back) && back > 0 && Math.abs(Math.log(yx) - Math.log(back)) / 1e-6 > 200) return { ok: true };
          break;
        }
      }
    }
    return { ok: false, message: 'Ta solution reste bornée près de chaque point : elle ne montre pas qu\'une solution peut exploser en un temps fini.' };
  },

  odeOutside: (p, ans) => {
    const v = p.v || 'x';
    const y = onlyV(ans.y, v);
    if (y.error) return { ok: false, message: y.error };
    if (!isSolution(cfgOf(p), ans.y)) return { ok: false, message: 'Ta fonction n\'est pas une solution de l\'équation.' };
    if (!icOk(p, y.node)) return { ok: false, message: 'Ta fonction ne vérifie pas la condition initiale.' };
    if (!p.family) return { ok: true };
    const fam = parse(p.family, { vars: [v, 'C'], dvar: v });
    if (inFamily(y.node, fam, v, p.domain?.[v] || [-2, 2])) return { ok: false, rule: p.rule, message: 'Ta solution est bien de cette forme, pour une valeur de C : cherche-en une autre.' };
    return { ok: true };
  },

  odeComboFails: (p, ans) => {
    const v = p.v || 'x';
    const y0 = onlyV(ans.y0, v);
    if (y0.error) return { ok: false, message: y0.error };
    const y1 = onlyV(ans.y1, v);
    if (y1.error) return { ok: false, message: y1.error };
    let C;
    try { C = val(parse(String(ans.C)), {}); } catch { C = NaN; }
    if (!Number.isFinite(C)) return { ok: false, message: 'Donne un nombre C.' };
    const cfg = cfgOf(p);
    if (!isSolution({ ...cfg, eq: p.homog }, ans.y0)) return { ok: false, message: 'y₀ doit résoudre l\'équation homogène.' };
    if (!isSolution(cfg, ans.y1)) return { ok: false, message: 'y₁ doit résoudre l\'équation complète.' };
    if (isSolution(cfg, `(${ans.y0})+(${ans.C})×(${ans.y1})`)) {
      return { ok: false, rule: 'a2_ode_superposition_nonhom', message: Math.abs(C - 1) < 1e-12 ? 'Avec C = 1, y₀ + y₁ est bien une solution : prends un autre C.' : 'Avec ce C, y₀ + C·y₁ est une solution : prends un autre C.' };
    }
    return { ok: true };
  },

  odeSumFails: (p, ans) => {
    const v = p.v || 'x';
    for (const k of ['y1', 'y2']) {
      const y = onlyV(ans[k], v);
      if (y.error) return { ok: false, message: y.error };
      if (!isSolution(cfgOf(p), ans[k])) return { ok: false, message: `${k === 'y1' ? 'y₁' : 'y₂'} n'est pas une solution de l'équation.` };
    }
    if (isSolution(cfgOf(p), `(${ans.y1})+(${ans.y2})`)) return { ok: false, rule: 'a2_ode_superposition_nonhom', message: 'Leur somme est encore une solution : l\'énoncé n\'est pas réfuté par ces deux-là.' };
    return { ok: true };
  },

  odeUnbounded: (p, ans) => {
    const v = p.v || 'x';
    const y = onlyV(ans.y, v);
    if (y.error) return { ok: false, message: y.error };
    if (!isSolution(cfgOf(p), ans.y)) return { ok: false, message: 'Ta fonction n\'est pas une solution de l\'équation.' };
    for (let k = 0; k <= 600; k++) {
      const yx = val(y.node, { [v]: k / 10 });
      if (!Number.isFinite(yx) || Math.abs(yx) > 1e6) return { ok: true };
    }
    return { ok: false, message: 'Ta solution reste bornée : il en faut une qui ne l\'est pas.' };
  },
};

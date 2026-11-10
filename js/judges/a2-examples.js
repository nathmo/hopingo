// Counter-examples of module A2 (step U6, spec §16.3 « Contre-exemples »):
// the kind `a2` of checkCounter (js/judges/examples.js), counter =
// {kind: 'a2', prop, params, ask: [{v, label}], answer}. Each property is a
// function (params, answers) → {ok, message?, rule?}; the parts of the
// module add theirs in a2-examples-<part>.js (PROPS), merged here.
//
// Shared properties:
//   odeTwoSolutions {eq, v?, unknown?, ic, domain?}  answers {y1, y2}: two
//       different solutions of the same Cauchy problem (no uniqueness)
//   knownFn {want: ['K1', …], scale?: true, shift?: true}  answers {f}: one of
//       the functions K1 … K7 of the catalogue (up to a nonzero factor with
//       scale, an added constant with shift), recognised numerically.

import { parse } from '../cas/parse.js';
import { evalFloat } from '../cas/numeric.js';
import { makeRng } from '../content/random.js';
import { solves } from './ode.js';
import { PROPS as PA } from './a2-examples-a.js';
import { PROPS as PB } from './a2-examples-b.js';
import { PROPS as PC } from './a2-examples-c.js';
import { PROPS as PE } from './a2-examples-e.js';
import { PROPS as PH } from './a2-examples-h.js';

// The catalogue's library of counter-examples (A2, a2-diff-implications);
// each is 0 at (0, 0) (K6: 2).
export const K_LIBRARY = {
  K1: 'x y/(x^2+y^2)',
  K2: 'x^2 y/(x^4+y^2)',
  K3: '(x^2+y^2)sin(1/√(x^2+y^2))',
  K4: 'x y^2/(x^2+y^2)',
  K5: '√(|x y|)',
  K6: '2+x^2 y/(x^4+y^2)',
  K7: 'x y(x^2-y^2)/(x^2+y^2)',
};

// f = c·g + d at random points of the plane (c ≠ 0 with scale, d with shift).
export function sameFn(fText, gText, { scale = false, shift = false, vars = ['x', 'y'] } = {}) {
  let f;
  let g;
  try { f = parse(fText, { vars }); g = parse(gText, { vars }); } catch { return false; }
  const rng = makeRng(11);
  const pts = [];
  for (let i = 0; i < 40 && pts.length < 12; i++) {
    const env = Object.fromEntries(vars.map((v) => [v, (rng.next() - 0.5) * 3]));
    const a = evalFloat(f, env);
    const b = evalFloat(g, env);
    if (Number.isFinite(a) && Number.isFinite(b)) pts.push([a, b]);
  }
  if (pts.length < 8) return false;
  // Least squares a = c·b + d, then every point within 1e-7.
  const n = pts.length;
  const sb = pts.reduce((s, p) => s + p[1], 0);
  const sa = pts.reduce((s, p) => s + p[0], 0);
  const sbb = pts.reduce((s, p) => s + p[1] * p[1], 0);
  const sab = pts.reduce((s, p) => s + p[0] * p[1], 0);
  let c = 1;
  let d = 0;
  if (scale && shift) { const den = n * sbb - sb * sb; if (Math.abs(den) < 1e-12) return false; c = (n * sab - sa * sb) / den; d = (sa - c * sb) / n; } else if (scale) c = sab / sbb;
  else if (shift) d = (sa - sb) / n;
  if (Math.abs(c) < 1e-9) return false;
  return pts.every(([a, b]) => Math.abs(a - (c * b + d)) <= 1e-7 * (1 + Math.abs(a)));
}

const SHARED = {
  odeTwoSolutions: (p, ans) => {
    const cfg = { eq: p.eq, v: p.v || 'x', unknown: p.unknown || 'y', domain: p.domain };
    const v = cfg.v;
    for (const k of ['y1', 'y2']) {
      if (!String(ans[k] ?? '').trim()) return { ok: false, message: 'Donne deux solutions.' };
      let ok;
      try { ok = solves(cfg, ans[k]); } catch { return { ok: false, message: `Je n'arrive pas à lire ${k === 'y1' ? 'la 1re' : 'la 2e'} solution.` }; }
      if (!ok) return { ok: false, message: `${ans[k]} n'est pas une solution de l'équation.` };
      const at = evalFloat(parse(ans[k], { vars: [v] }), { [v]: Number(p.ic.x) });
      if (!(Math.abs(at - Number(p.ic.y)) < 1e-9)) return { ok: false, message: `${ans[k]} ne vérifie pas la condition initiale.` };
    }
    const [lo, hi] = p.domain?.[v] || [-2, 2];
    const f1 = parse(ans.y1, { vars: [v] });
    const f2 = parse(ans.y2, { vars: [v] });
    for (let i = 0; i <= 40; i++) {
      const x = lo + ((hi - lo) * i) / 40;
      const a = evalFloat(f1, { [v]: x });
      const b = evalFloat(f2, { [v]: x });
      if (Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) > 1e-6) return { ok: true };
    }
    return { ok: false, message: 'Tes deux solutions sont la même fonction.' };
  },
  knownFn: (p, ans) => {
    const f = String(ans.f ?? '').trim();
    if (!f) return { ok: false, message: 'Donne une fonction f(x, y).' };
    const hit = (p.want || []).find((k) => sameFn(f, K_LIBRARY[k], { scale: p.scale ?? true, shift: p.shift ?? false }));
    if (hit) return { ok: true, which: hit };
    return { ok: false, message: p.why || 'Je ne reconnais pas un contre-exemple qui convient : pense aux fonctions du cours (xy/(x² + y²), x²y/(x⁴ + y²)…).' };
  },
};

export const PROPS = { ...SHARED, ...PA, ...PB, ...PC, ...PE, ...PH };

export function checkA2(counter, answers) {
  const f = PROPS[counter.prop];
  if (!f) return { ok: false, message: 'Contre-exemple non vérifiable.' };
  try { return f(counter.params || {}, answers || {}); } catch { return { ok: false, message: 'Je n\'arrive pas à lire ton contre-exemple.' }; }
}

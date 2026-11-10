// Counter-example properties of module A2, part b (step U6): {name: (params,
// answers) → {ok, message?, rule?}}, used by tf items with counter
// {kind: 'a2', prop: name, params, ask, answer} (js/judges/a2-examples.js).
//
//   knownShift {want: ['K2', …], shift: L}  answers {f}: L plus a nonzero
//       multiple of one of the catalogue's functions K1 … K7 (L + x²y/(x⁴ + y²):
//       limit L along every line through the origin, but no limit).

import { K_LIBRARY, sameFn } from './a2-examples.js';

export const PROPS = {
  knownShift: (p, ans) => {
    const f = String(ans.f ?? '').trim();
    if (!f) return { ok: false, message: 'Donne une fonction f(x, y).' };
    const L = String(p.shift ?? 0);
    const hit = (p.want || []).find((k) => sameFn(`(${f})-(${L})`, K_LIBRARY[k], { scale: true }));
    if (hit) return { ok: true, which: hit };
    return { ok: false, message: p.why || `Je ne reconnais pas un contre-exemple qui convient : pense à ${L.replace(/-/g, '−')} + x²y/(x⁴ + y²).` };
  },
};

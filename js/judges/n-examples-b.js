// Counter-examples of module N, part b (see js/judges/n-examples.js).
// PROPS: {name: (params, answers) => {ok, message?, rule?}}.
//   newtonNoConv  {f, x0}: Newton from x0 does not converge (a cycle, a
//                 divergence, or f′ = 0 on the way), 200 steps.

import { fnOf, numberOf } from './n-examples-util.js';

// f′ by a centred difference (f is any formula the student types).
const dnum = (f, x) => { const h = 1e-6 * Math.max(1, Math.abs(x)); return (f(x + h) - f(x - h)) / (2 * h); };

export const PROPS = {
  newtonNoConv(params, a) {
    const f = fnOf(a.f);
    const x0 = numberOf(a.x0);
    if (!f || x0 === null) return { ok: false, message: 'Donne une fonction f de x et un nombre x⁽⁰⁾.' };
    if (!Number.isFinite(f(x0))) return { ok: false, message: 'f n\'est pas définie en x⁽⁰⁾.' };
    let x = x0;
    for (let k = 0; k < 200; k++) {
      const d = dnum(f, x);
      if (!Number.isFinite(d) || Math.abs(d) < 1e-12) return { ok: true };
      x -= f(x) / d;
      if (!Number.isFinite(x) || Math.abs(x) > 1e8) return { ok: true };
    }
    if (Math.abs(f(x)) < 1e-9) return { ok: false, message: `Avec ce départ, Newton converge (vers ${x.toPrecision(6).replace('.', ',')}). Cherche un départ qui tourne en rond.` };
    return { ok: true };
  },
};

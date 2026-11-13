// Counter-examples of module N, part e (quadrature; see js/judges/n-examples.js).
// PROPS: {name: (params, answers) => {ok, message?, rule?}}.
//   trapNotBetter {n}            answer f (in x): on [0 ; 1] with n
//                                sub-intervals, the trapezoid's error is
//                                larger than the midpoint's.
//   errScaling    {method}       answer f (in x and λ): a family f_λ whose
//                                error E_h(f_λ) grows without bound with
//                                λ, h fixed (no constant C works for all f).
//   notOrder      {method, q}    answer f (in x): E_h(f)/h^q is unbounded
//                                as h → 0 (the method is not of order q
//                                for this f).
// The errors are those of the composite formula on [0 ; 1] (method 'mid',
// 'trap', 'simp', 'gauss2'), against a precise integral (js/cas/integrate.js).

import { tryParse } from '../cas/parse.js';
import { compileFloat } from '../cas/numeric.js';
import { quad } from '../cas/integrate.js';
import { t } from '../i18n.js';

function composite(m, f, n) {
  const h = 1 / n;
  const al = 1 / Math.sqrt(3);
  let s = 0;
  for (let i = 0; i < n; i++) {
    const x0 = i * h;
    const x1 = x0 + h;
    if (m === 'mid') s += h * f(x0 + h / 2);
    else if (m === 'trap') s += (h / 2) * (f(x0) + f(x1));
    else if (m === 'simp') s += (h / 6) * (f(x0) + 4 * f(x0 + h / 2) + f(x1));
    else if (m === 'gauss2') s += (h / 2) * (f(x0 + (h / 2) * (1 - al)) + f(x0 + (h / 2) * (1 + al)));
    else if (m === 'rect') s += h * f(x0);
  }
  return s;
}
const errorOf = (m, f, n) => Math.abs(quad(f, 0, 1) - composite(m, f, n));

function reader(text, vars) {
  const node = tryParse(String(text ?? '').replace(/−/g, '-'), { vars });
  if (!node) return null;
  const c = compileFloat(node);
  return (env) => c(env);
}
const finiteOn = (f) => [0, 0.25, 0.5, 0.75, 1, 0.1, 0.9].every((x) => Number.isFinite(f(x)));
const READ = t('Je n\'arrive pas à lire ta fonction de x.');

export const PROPS = {
  trapNotBetter(params, a) {
    const g = reader(a.f, ['x']);
    if (!g) return { ok: false, message: READ };
    const f = (x) => g({ x });
    if (!finiteOn(f)) return { ok: false, message: t('Prends une fonction définie sur [0 ; 1].') };
    const n = params.n ?? 4;
    const et = errorOf('trap', f, n);
    const em = errorOf('mid', f, n);
    if (et > em * 1.0001 + 1e-13) return { ok: true };
    return { ok: false, message: t('Avec cette f, l\'erreur du trapèze ({v1}) n\'est pas plus grande que celle du point milieu ({v2}). Essaie f(x) = x².', { v1: et.toExponential(2), v2: em.toExponential(2) }) };
  },
  errScaling(params, a) {
    const g = reader(a.f, ['x', 'λ']);
    if (!g) return { ok: false, message: t('Écris une famille f_λ(x), en x et λ.') };
    const at = (lam) => (x) => g({ x, λ: lam });
    if (!finiteOn(at(1)) || !finiteOn(at(1000))) return { ok: false, message: t('Prends une fonction définie sur [0 ; 1].') };
    const m = params.method || 'simp';
    const e1 = errorOf(m, at(1), 2);
    const e2 = errorOf(m, at(1000), 2);
    if (e1 < 1e-9) return { ok: false, message: t('Pour λ = 1, la formule est exacte sur ta fonction : prends un polynôme de degré plus grand, comme λx⁴.') };
    if (e2 > 100 * e1) return { ok: true };
    return { ok: false, message: t('L\'erreur ne grandit pas avec λ : multiplie la fonction par λ.') };
  },
  notOrder(params, a) {
    const g = reader(a.f, ['x']);
    if (!g) return { ok: false, message: READ };
    const f = (x) => g({ x });
    if (!finiteOn(f)) return { ok: false, message: t('Prends une fonction définie sur [0 ; 1].') };
    const m = params.method || 'simp';
    const qq = params.q;
    const ratios = [4, 8, 16, 32].map((n) => errorOf(m, f, n) * n ** qq);
    if (ratios[0] < 1e-12) return { ok: false, message: t('La formule est exacte sur ta fonction : son erreur est nulle.') };
    if (ratios[3] > 1.5 * ratios[0] && ratios[3] > ratios[2] && ratios[2] > ratios[1]) return { ok: true };
    return { ok: false, message: t('Avec cette f, E_h(f)/h^{qq} reste borné : prends un polynôme qui n\'est pas intégré exactement.', { qq }) };
  },
};

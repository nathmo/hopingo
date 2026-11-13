// Counter-examples of module N, part d (see js/judges/n-examples.js).
// PROPS: {name: (params, answers) => {ok, message?, rule?}}.
//   fdForwardNotOrder2  {f, x0}: the forward difference of f at x0 is not
//                       of order 2: its error divided by 10 when h is (not
//                       by 100), and not 0.
//   fdSmallerWorse      {f, x0, h}: in double precision, the forward
//                       difference with h is less precise than with 10h.

import { tryParse } from '../cas/parse.js';
import { diff } from '../cas/diff.js';
import { compileFloat } from '../cas/numeric.js';
import { numberOf } from './n-examples-util.js';
import { t } from '../i18n.js';

function fnAndDeriv(text) {
  const n = tryParse(String(text ?? '').replace(/−/g, '-'), { vars: ['x'] });
  if (!n) return null;
  let d;
  try { d = diff(n, 'x'); } catch { return null; }
  const f = compileFloat(n);
  const df = compileFloat(d);
  return { f: (x) => f({ x }), df: (x) => df({ x }) };
}
const numText = (tq) => {
  const s = String(tq ?? '').trim().replace(/−/g, '-').replace(',', '.');
  if (/^-?\d*\.?\d+(e[+-]?\d+)?$/i.test(s)) return Number(s);
  return numberOf(tq);
};

export const PROPS = {
  fdForwardNotOrder2(params, a) {
    const F = fnAndDeriv(a.f);
    const x0 = numText(a.x0);
    if (!F || x0 === null) return { ok: false, message: t('Donne une fonction f de x et un point x̄.') };
    const err = (h) => Math.abs(F.df(x0) - (F.f(x0 + h) - F.f(x0)) / h);
    const e1 = err(1e-2);
    const e2 = err(1e-3);
    if (![e1, e2, F.df(x0)].every(Number.isFinite)) return { ok: false, message: t('f n\'est pas dérivable en ce point.') };
    if (e2 < 1e-9) return { ok: false, message: t('Avec cette f, la différence progressive est exacte : prends f″(x̄) ≠ 0.') };
    if (e1 / e2 > 30) return { ok: false, message: t('Avec cette f, l\'erreur est divisée par 100 quand h l\'est par 10 : prends f″(x̄) ≠ 0, par exemple f = x².') };
    return { ok: true };
  },
  fdSmallerWorse(params, a) {
    const F = fnAndDeriv(a.f);
    const x0 = numText(a.x0);
    const h = numText(a.h);
    if (!F || x0 === null || h === null || !(h > 0)) return { ok: false, message: t('Donne f, x̄ et un pas h > 0 (par exemple 1e-12).') };
    const err = (k) => Math.abs(F.df(x0) - (F.f(x0 + k) - F.f(x0)) / k);
    const a1 = err(h);
    const a2 = err(10 * h);
    if (![a1, a2].every(Number.isFinite)) return { ok: false, message: t('f n\'est pas définie près de x̄.') };
    if (a1 > a2) return { ok: true };
    return { ok: false, message: t('Avec h = {h}, l\'erreur ({v1}) est plus petite qu\'avec 10h ({v2}) : prends h beaucoup plus petit, vers 10⁻¹².', { h, v1: a1.toExponential(2), v2: a2.toExponential(2) }) };
  },
};

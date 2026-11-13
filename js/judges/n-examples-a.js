// Counter-examples of module N, part a (see js/judges/n-examples.js).
// PROPS: {name: (params, answers) => {ok, message?, rule?}}.
//   absSmallNotSig  {x, xt}: |x − x̃| ≤ params.tol, but e_rel > 5·10^(−sig)
//                   (fewer than `sig` significant digits right)
//   roundAbsLarge   {x}: ε·|x| far above 10⁻¹⁶ (|x| ≥ 10⁴): the rounding error
//                   of fl(x) is relative
//   bisectErrorUp   {f, a, b}: f changes sign on [a ; b], and the error of
//                   the midpoints grows at some step
//   fpNotGlobal     {phi, alpha, x0}: φ(α) = α, |φ′(α)| < 1, but the
//                   iteration from x0 does not tend to α
//   residualNotError {phi, x0}: the residual |x0 − φ(x0)| is at least 10
//                   times smaller than the error |x0 − α|
//   orderAboveTwo   {phi, alpha}: φ(α) = α, φ′(α) = 0 and φ″(α) = 0 (order ≥ 3)

import { fnOf, numberOf } from './n-examples-util.js';
import { t } from '../i18n.js';

const d1 = (f, x, h = 1e-4) => (f(x + h) - f(x - h)) / (2 * h);
const d2 = (f, x, h = 1e-3) => (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
const show = (x) => String(Number(x.toPrecision(4))).replace('.', ',').replace('-', '−');

// The limit of the iteration from x0 (null if it diverges or cycles).
function limitOf(phi, x0, n = 2000) {
  let x = x0;
  for (let k = 0; k < n; k++) {
    const y = phi(x);
    if (!Number.isFinite(y) || Math.abs(y) > 1e12) return null;
    if (Math.abs(y - x) < 1e-13 * Math.max(1, Math.abs(x))) return y;
    x = y;
  }
  return null;
}

export const PROPS = {
  absSmallNotSig(params, a) {
    const x = numberOf(a.x);
    const xt = numberOf(a.xt);
    if (x === null || xt === null) return { ok: false, message: t('Donne deux nombres x et x̃.') };
    if (x === 0) return { ok: false, message: t('Prends x ≠ 0 : l\'erreur relative divise par x.') };
    const tol = Number(params.tol ?? 1e-3);
    const ea = Math.abs(x - xt);
    if (ea > tol * (1 + 1e-12)) return { ok: false, message: t('Ici e_abs = {ea} > {tol} : l\'hypothèse n\'est pas vérifiée.', { ea: show(ea), tol: show(tol) }) };
    const er = ea / Math.abs(x);
    if (er <= 5 * 10 ** -(params.sig ?? 3)) return { ok: false, message: t('Ici e_rel = {er} : x̃ a bien {v1} chiffres significatifs exacts. Prends x plus petit.', { er: show(er), v1: params.sig ?? 3 }) };
    return { ok: true };
  },
  roundAbsLarge(params, a) {
    const x = numberOf(a.x);
    if (x === null) return { ok: false, message: t('Donne un nombre x.') };
    if (Math.abs(x) < 1e4) return { ok: false, message: t('Pour |x| = {v1}, ε·|x| est encore petit. Prends x très grand : l\'erreur ε·|x| grandit avec x.', { v1: show(Math.abs(x)) }), rule: 'n_eps_absolute' };
    return { ok: true };
  },
  bisectErrorUp(params, ans) {
    const f = fnOf(ans.f);
    let a = numberOf(ans.a);
    let b = numberOf(ans.b);
    if (!f || a === null || b === null || !(a < b)) return { ok: false, message: t('Donne f et un intervalle [a ; b] avec a < b.') };
    const fa0 = f(a);
    const fb0 = f(b);
    if (!(fa0 * fb0 < 0)) return { ok: false, message: t('f doit changer de signe sur [a ; b] : f(a)·f(b) < 0.') };
    const mids = [];
    for (let k = 0; k < 60; k++) {
      const x = (a + b) / 2;
      mids.push(x);
      const fx = f(x);
      if (fx === 0) break;
      if (Math.sign(fx) === Math.sign(f(a))) a = x; else b = x;
    }
    const alpha = (a + b) / 2;
    for (let k = 0; k + 1 < mids.length; k++) {
      if (Math.abs(mids[k + 1] - alpha) > Math.abs(mids[k] - alpha) + 1e-12) return { ok: true };
    }
    return { ok: false, message: t('Avec cet exemple, l\'erreur diminue à chaque pas. Place le zéro juste à côté d\'un milieu, par exemple x − 0,51 sur [0 ; 1].') };
  },
  fpNotGlobal(params, ans) {
    const phi = fnOf(ans.phi);
    const alpha = numberOf(ans.alpha);
    const x0 = numberOf(ans.x0);
    if (!phi || alpha === null || x0 === null) return { ok: false, message: t('Donne φ, α et x⁽⁰⁾.') };
    if (Math.abs(phi(alpha) - alpha) > 1e-9) return { ok: false, message: t('φ({alpha}) = {v1} : α n\'est pas un point fixe.', { alpha: show(alpha), v1: show(phi(alpha)) }) };
    if (!(Math.abs(d1(phi, alpha)) < 1 - 1e-9)) return { ok: false, message: t('|φ′(α)| = {v1} n\'est pas < 1 : l\'hypothèse n\'est pas vérifiée.', { v1: show(Math.abs(d1(phi, alpha))) }) };
    const L = limitOf(phi, x0);
    if (L !== null && Math.abs(L - alpha) < 1e-6) return { ok: false, message: t('À partir de x⁽⁰⁾ = {x0}, la méthode converge bien vers α. Prends un départ plus loin.', { x0: show(x0) }) };
    return { ok: true };
  },
  residualNotError(params, ans) {
    const phi = fnOf(ans.phi);
    const x0 = numberOf(ans.x0);
    if (!phi || x0 === null) return { ok: false, message: t('Donne φ et x⁽⁰⁾.') };
    const alpha = limitOf(phi, x0, 100000);
    if (alpha === null) return { ok: false, message: t('La méthode ne converge pas à partir de ce x⁽⁰⁾ : je ne trouve pas α.') };
    const res = Math.abs(x0 - phi(x0));
    const err = Math.abs(x0 - alpha);
    if (err < 10 * res) return { ok: false, message: t('Ici le résidu ({res}) et l\'erreur ({err}) sont proches. Prends φ′(α) proche de 1.', { res: show(res), err: show(err) }) };
    return { ok: true };
  },
  orderAboveTwo(params, ans) {
    const phi = fnOf(ans.phi);
    const alpha = numberOf(ans.alpha);
    if (!phi || alpha === null) return { ok: false, message: t('Donne φ et α.') };
    if (Math.abs(phi(alpha) - alpha) > 1e-9) return { ok: false, message: t('α n\'est pas un point fixe de φ.') };
    if (Math.abs(d1(phi, alpha)) > 1e-6) return { ok: false, message: t('φ′(α) ≈ {v1} ≠ 0 : l\'hypothèse n\'est pas vérifiée.', { v1: show(d1(phi, alpha)) }) };
    if (Math.abs(d2(phi, alpha)) > 1e-4) return { ok: false, message: t('φ″(α) ≈ {v1} ≠ 0 : cette méthode est bien d\'ordre 2.', { v1: show(d2(phi, alpha)) }), rule: 'n_fp_order_count' };
    return { ok: true };
  },
};

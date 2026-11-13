// Counter-example properties of module A2, part b (step U6): {name: (params,
// answers) → {ok, message?, rule?}}, used by tf items with counter
// {kind: 'a2', prop: name, params, ask, answer} (js/judges/a2-examples.js).
//
//   knownShift {want: ['K2', …], shift: L}  answers {f}: L plus a nonzero
//       multiple of one of the catalogue's functions K1 … K7 (L + x²y/(x⁴ + y²):
//       limit L along every line through the origin, but no limit).
//   negDir {}  answers {f}: a function with D_v f(0, 0) for v = (1 ; 0), and
//       D_{−v} f(0, 0) ≠ D_v f(0, 0) (f = x). Checked by difference quotients
//       at three scales.
//   normQuotient {}  answers {f}: a function with D_v f(0, 0) for
//       v = (1 ; 1)/√2 whose quotient (f(h, k) − f(0, 0))/√(h² + k²) has no
//       limit at (0, 0): it takes different values around a small circle (f = x).

import { parse } from '../cas/parse.js';
import { evalFloat } from '../cas/numeric.js';
import { K_LIBRARY, sameFn } from './a2-examples.js';
import { t } from '../i18n.js';

// f(x, y) as a function of two numbers, f(0, 0) (0 when the formula is not
// defined there), or null when f cannot be read.
function fnOf(text) {
  let node;
  try { node = parse(String(text ?? ''), { vars: ['x', 'y'] }); } catch { return null; }
  const F = (x, y) => evalFloat(node, { x, y });
  const f0 = Number.isFinite(F(0, 0)) ? F(0, 0) : 0;
  return { F, f0 };
}
// The limit of (f(t·v) − f(0))/t as t → 0⁺ (s = 1) or 0⁻ (s = −1): the
// quotients at three scales must agree, else null.
function oneSided({ F, f0 }, [v1, v2], s) {
  const qs = [1e-4, 1e-5, 1e-6].map((h) => (F(s * h * v1, s * h * v2) - f0) / (s * h));
  if (!qs.every(Number.isFinite)) return null;
  const spread = Math.max(...qs) - Math.min(...qs);
  return spread <= 1e-3 * (1 + Math.abs(qs[0])) ? qs[2] : null;
}

export const PROPS = {
  knownShift: (p, ans) => {
    const f = String(ans.f ?? '').trim();
    if (!f) return { ok: false, message: t('Donne une fonction f(x, y).') };
    const L = String(p.shift ?? 0);
    const hit = (p.want || []).find((k) => sameFn(`(${f})-(${L})`, K_LIBRARY[k], { scale: true }));
    if (hit) return { ok: true, which: hit };
    return { ok: false, message: p.why || t('Je ne reconnais pas un contre-exemple qui convient : pense à {L} + x²y/(x⁴ + y²).', { L: L.replace(/-/g, '−') }) };
  },
  negDir: (p, ans) => {
    const g = fnOf(ans.f);
    if (!g) return { ok: false, message: t('Je n\'arrive pas à lire ta fonction.') };
    const plus = oneSided(g, [1, 0], 1);
    const minus = oneSided(g, [1, 0], -1);
    if (plus === null || minus === null) return { ok: false, message: t('Pour ta fonction, la dérivée directionnelle suivant (1 ; 0) n\'existe pas en (0, 0) : prends plus simple.') };
    if (Math.abs(plus - minus) > 1e-3 * (1 + Math.abs(plus))) return { ok: false, message: t('Pour ta fonction, la dérivée directionnelle suivant (1 ; 0) n\'existe pas en (0, 0) (deux côtés différents).') };
    // D_{-v} f(0) = -D_v f(0): a counter-example needs D_v f(0) != 0.
    if (Math.abs(plus) < 1e-4) return { ok: false, message: t('Pour ta fonction, la dérivée directionnelle vaut 0 dans les deux sens : ce n\'est pas un contre-exemple.') };
    return { ok: true };
  },
  normQuotient: (p, ans) => {
    const g = fnOf(ans.f);
    if (!g) return { ok: false, message: t('Je n\'arrive pas à lire ta fonction.') };
    const u = [Math.SQRT1_2, Math.SQRT1_2];
    const up = oneSided(g, u, 1);
    const down = oneSided(g, u, -1);
    if (up === null || down === null || Math.abs(up - down) > 1e-3 * (1 + Math.abs(up))) return { ok: false, message: t('Pour ta fonction, la dérivée directionnelle suivant (1 ; 1)/√2 n\'existe pas en (0, 0) : prends une fonction de classe C¹.') };
    const r = 1e-5;
    const qs = Array.from({ length: 12 }, (_, i) => { const a = (2 * Math.PI * (i + 0.3)) / 12; return (g.F(r * Math.cos(a), r * Math.sin(a)) - g.f0) / r; });
    if (!qs.every(Number.isFinite)) return { ok: false, message: t('Ta fonction n\'est pas définie près de (0, 0).') };
    if (Math.max(...qs) - Math.min(...qs) < 1e-3) return { ok: false, message: t('Pour ta fonction, ce quotient a bien une limite en (0, 0) : cherche une fonction pour laquelle il dépend de la direction.') };
    return { ok: true };
  },
};

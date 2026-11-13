// The answer of a physics question: a number, rounded the way a physicist
// rounds. « 1,8·10^5 » is right for 175 000 m: the last digit written is
// the hundreds of thousands' tenth, so anything within half of it is fine.
// Too few significant figures (« 2·10^5 » when two are asked) is sent back.
//
// Item fields: value (the exact answer, in the unit of the suffix),
// minSig (default 2), physTraps [{value, rule}], unitTraps.

import { t } from '../i18n.js';

const clean = (raw) => String(raw).replace(/\s/g, '').replace(/−/g, '-').replace(/[·*x]/g, '×');

// « 1,8×10^5 », « 0,25 », « 3,6×10^(6) », « 2e5 » → {v, sig, ulp} or null.
export function readNumber(raw) {
  const s = clean(raw);
  const m = s.match(/^(-?)(\d+)(?:[.,](\d+))?(?:(?:×10\^\(?(-?\d+)\)?)|(?:e(-?\d+)))?$/i);
  if (!m) return null;
  const [, sign, int, frac = '', e1, e2] = m;
  const exp = Number(e1 ?? e2 ?? 0);
  const digits = (int + frac).replace(/^0+/, '');
  // Trailing zeros of a whole number are not significant (175000 → 3).
  const sig = frac ? digits.length : digits.replace(/0+$/, '').length;
  const v = Number(`${sign}${int}.${frac || '0'}`) * 10 ** exp;
  const lastPlace = frac ? -frac.length : int.length - int.replace(/0+$/, '').length;
  return { v, sig: Math.max(sig, 1), ulp: 10 ** (lastPlace + exp), exp: e1 != null || e2 != null };
}

const near = (v, target, rel) => Math.abs(v - target) <= rel * Math.abs(target) + 1e-12;

export function checkPhys(item, raw) {
  const r = readNumber(raw);
  if (!r) return { kind: 'stay', message: t('Écris un nombre, par exemple 1,8 ou 1,8·10^5.') };
  const exact = item.value;
  const minSig = item.minSig ?? 2;
  // Within half of the last digit written, or within 0,5 % (more digits).
  const ok = Math.abs(r.v - exact) <= r.ulp / 2 + 1e-9 * Math.abs(exact) || near(r.v, exact, 0.005);
  if (ok) {
    if (r.sig < minSig && !near(r.v, exact, 1e-9)) return { kind: 'stay', message: t('C\'est le bon ordre de grandeur, mais garde au moins {n} chiffres significatifs.', { n: minSig }) };
    return { kind: 'done' };
  }
  const trap = (item.physTraps || []).find((x) => near(r.v, x.value, 0.02));
  return { kind: 'wrong', rule: trap?.rule ?? null };
}

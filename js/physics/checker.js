// The answer of a physics question: a number, rounded the way a physicist
// rounds. « 1,8·10^5 » is right for 175 000 m: the last digit written is
// the hundreds of thousands' tenth, so anything within half of it is fine.
// Too few significant figures (« 2·10^5 » when two are asked) is sent back.
//
// Item fields: value (the exact answer, in the unit of the suffix),
// minSig (default 2), physTraps [{value, rule}], factor (an estimate: right
// within that factor).

import { t } from '../i18n.js';
import { tryParse, isolated, symbolsIn, evaluate, numbersIn, parse as parsePhys } from './expr.js';
import { parseUnit, dimEq } from './units.js';

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
  // An estimate (item.factor): right within that factor, any precision.
  if (item.factor && r.v > 0 && exact > 0 && Math.max(r.v / exact, exact / r.v) <= item.factor) return { kind: 'done' };
  // Within half of the last digit written, or within 0,5 % (more digits).
  const ok = Math.abs(r.v - exact) <= r.ulp / 2 + 1e-9 * Math.abs(exact) || near(r.v, exact, 0.005);
  if (ok) {
    if (r.sig < minSig && !near(r.v, exact, 1e-9)) return { kind: 'stay', message: t('C\'est le bon ordre de grandeur, mais garde au moins {n} chiffres significatifs.', { n: minSig }) };
    return { kind: 'done' };
  }
  const trap = (item.physTraps || []).find((x) => near(r.v, x.value, 0.02));
  return { kind: 'wrong', rule: trap?.rule ?? null };
}

// ---------- a formula with physics symbols: « v = √(2 E_c/m) » ----------
// Item fields: variable, target (the expression, text), symbols (those the
// keypad offers), physIsoTraps [{expr, rule}], numbersOk (default: only the
// numbers of the target are allowed).

function sameFn(a, b, syms) {
  for (let k = 0; k < 5; k++) {
    const env = Object.fromEntries(syms.map((s, j) => [s, 0.7 + ((k * 7 + j * 3) % 11) * 0.37]));
    let p; let q;
    try { p = evaluate(a, env); q = evaluate(b, env); } catch { return false; }
    if (!Number.isFinite(p) || !Number.isFinite(q) || Math.abs(p - q) > 1e-7 * Math.max(1, Math.abs(p))) return false;
  }
  return true;
}

export function checkPhysIso(item, raw) {
  const node = tryParse(raw, item.symbols);
  const v = item.variable;
  if (!node || node.t !== 'eq') return { kind: 'stay', message: t('Écris ta réponse ainsi : {v} = …', { v: item.variableText || v }) };
  const iso = isolated(node);
  if (!iso || iso.sym !== v) return { kind: 'stay', message: t('Il faut {v} tout seul d\'un côté du « = ».', { v: item.variableText || v }) };
  const target = parsePhys(item.target, item.symbols);
  const syms = [...new Set([...symbolsIn(iso.expr), ...symbolsIn(target)])];
  if (sameFn(iso.expr, target, syms)) {
    const allowed = new Set(numbersIn(target));
    const extra = numbersIn(iso.expr).filter((x) => !allowed.has(x) && x !== 1);
    if (extra.length && !item.numbersOk) return { kind: 'stay', message: t('C\'est juste, mais écris-le seulement avec des lettres.') };
    return { kind: 'done' };
  }
  const trap = (item.physIsoTraps || []).find((x) => { try { return sameFn(iso.expr, parsePhys(x.expr, item.symbols), syms); } catch { return false; } });
  return { kind: 'wrong', rule: trap?.rule ?? null };
}

// ---------- a unit: « kg·m²/s² », « J/s » ----------
// Item fields: unit (the expected unit, text), base (true: only kg, m, s, K,
// A, mol, cd may be written), unitTraps [{unit, rule}].

const BASE_NAMES = new Set(['kg', 'm', 's', 'K', 'A', 'mol', 'cd']);
export function checkPhysUnit(item, raw) {
  let u;
  try { u = parseUnit(raw, { prefixes: false }); } catch {
    return { kind: 'stay', message: t('Je n\'arrive pas à lire cette unité.') };
  }
  const want = parseUnit(item.unit);
  if (dimEq(u.d, want.d)) {
    if (item.base) {
      const names = String(raw).match(/[\p{L}Ω°]+/gu) || [];
      if (names.some((n) => !BASE_NAMES.has(n) && !n.split(/(?=[A-Z])/).every((x) => BASE_NAMES.has(x)))) return { kind: 'stay', message: t('C\'est juste, mais écris-le seulement avec kg, m, s, K, A.') };
    }
    return { kind: 'done' };
  }
  const trap = (item.unitTraps || []).find((x) => dimEq(parseUnit(x.unit).d, u.d));
  return { kind: 'wrong', rule: trap?.rule ?? null };
}

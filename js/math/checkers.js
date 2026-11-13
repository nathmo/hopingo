// Answers that are not a single number: a product of prime factors
// (360 = 2^3×3^2×5) and a simplified root (√72 = 6√2). Pure functions, no
// DOM, so they can be tested.
//
// Result: {kind: 'done'} | {kind: 'stay', message} | {kind: 'wrong', rule?}

import { parseAlg, tryParseAlg, equivalent, isReducedForm, factoredProblem, evalAt, varsIn } from './algebra.js';
import { t } from '../i18n.js';
import { checkPhys, checkPhysIso, checkPhysUnit } from '../physics/checker.js';

const isPrime = (n) => {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
};
const isSquarefree = (n) => { for (let d = 2; d * d <= n; d++) if (n % (d * d) === 0) return false; return true; };
const clean = (s) => String(s).replace(/\s/g, '').replace(/[*x·]/g, '×');
// factoredProblem's « not a product » message (French, or English once algebra.js translates it).
const NOT_PRODUCT = 'Écris l\'expression comme un produit de facteurs.';
const notProduct = (p) => p.startsWith('Écris') || p === t(NOT_PRODUCT);

export function checkPrimes(item, raw) {
  const s = clean(raw);
  if (!/^\d+(\^\d+)?(×\d+(\^\d+)?)*$/.test(s)) {
    return { kind: 'stay', message: t('Écris un produit de facteurs, par exemple 2^3×3×5.') };
  }
  let value = 1;
  const bases = [];
  for (const f of s.split('×')) {
    const [b, e = '1'] = f.split('^');
    value *= Number(b) ** Number(e);
    bases.push(Number(b));
  }
  if (value !== item.target) return { kind: 'wrong' };
  if (bases.includes(1)) return { kind: 'stay', message: t('C\'est égal, mais 1 n\'est pas un nombre premier : enlève-le.') };
  const notPrime = bases.find((b) => !isPrime(b));
  if (notPrime) return { kind: 'stay', message: t('C\'est égal, mais {n} n\'est pas premier : décompose-le encore.', { n: notPrime }) };
  return { kind: 'done' };
}

export function checkSurd(item, raw) {
  const s = clean(raw).replace(/×/g, '');
  const mm = s.match(/^(\d*)√(\d+)$/);
  const [K, R] = item.surd;
  if (/^\d+$/.test(s)) return { kind: 'wrong' };
  if (!mm) return { kind: 'stay', message: t('Écris ta réponse sous la forme a√b, par exemple 6√2.') };
  const k = mm[1] ? Number(mm[1]) : 1;
  const r = Number(mm[2]);
  if (k * k * r !== item.target) return { kind: 'wrong', rule: k === K * K && r === R ? 'surd_forget_root' : null };
  if (!isSquarefree(r)) return { kind: 'stay', message: t('C\'est égal, mais on peut encore sortir un carré de √{r}.', { r }) };
  return { kind: 'done' };
}

// A rounded measure (1 pied² ≈ 0,09 m²): any value within half a unit of
// the requested precision counts. Traps are matched the same way.
export function checkRounded(item, raw) {
  const s = clean(raw).replace(',', '.');
  if (!/^-?\d+(\.\d+)?$/.test(s)) return { kind: 'stay', message: t('Écris un nombre, avec une virgule si besoin.') };
  const v = Number(s);
  const tol = 0.5 * 10 ** -item.decimals + 1e-9;
  if (Math.abs(v - item.exactValue) <= tol) return { kind: 'done' };
  const trap = (item.approxTraps || []).find((t) => Math.abs(v - t.exact) <= Math.max(tol, Math.abs(t.exact) * 0.01));
  return { kind: 'wrong', rule: trap?.rule ?? null };
}

// An expression with letters: equal to the target for every value of the
// letters, and in the form asked (reduced, factored…).
export function checkAlg(item, raw) {
  const node = tryParseAlg(raw);
  if (!node) return { kind: 'stay', message: t('Je n\'arrive pas à lire cette expression.') };
  if (node.t === 'eq') return { kind: 'stay', message: t('Écris seulement l\'expression, sans « = ».') };
  const target = parseAlg(item.target);
  let same;
  try { same = equivalent(node, target); } catch { return { kind: 'stay', message: t('Je n\'arrive pas à calculer cette expression.') }; }
  if (!same) {
    const trap = (item.algTraps || []).find((t) => { try { return equivalent(node, parseAlg(t.expr)); } catch { return false; } });
    return { kind: 'wrong', rule: trap?.rule ?? null };
  }
  if (item.form === 'reduced' && !isReducedForm(node)) return { kind: 'stay', message: t('C\'est égal, mais développe et réduis encore : un seul terme de chaque sorte, sans parenthèses.') };
  if (item.form === 'factored' || item.form === 'common') {
    const problem = factoredProblem(node, { complete: item.form === 'factored' });
    if (problem) return { kind: 'stay', message: notProduct(problem) ? problem : t('C\'est égal, mais ce n\'est pas fini : {problem}', { problem }) };
  }
  return { kind: 'done' };
}

// Numbers typed as "x=2;x=-1/3" or "2;-1/3" (the order does not matter).
function readValues(raw, name) {
  const parts = String(raw).replace(/\s/g, '').replace(/−/g, '-').split(';').filter(Boolean);
  const out = [];
  for (const part of parts) {
    const node = tryParseAlg(part);
    if (!node) return null;
    let v = node;
    if (node.t === 'eq') {
      const left = node.l.t === 'var' ? node.l : node.r.t === 'var' ? node.r : null;
      if (!left || (name && left.name !== name)) return null;
      v = node.l.t === 'var' ? node.r : node.l;
    }
    try { out.push({ name: node.t === 'eq' ? (node.l.t === 'var' ? node.l.name : node.r.name) : null, value: evalAt(v, {}) }); } catch { return null; }
  }
  return out;
}
const close = (a, b) => Math.abs(a - b) < 1e-6;

// « none », « no solution »: the English answers (js/i18n.js).
const NONE = /aucune|aucun|∅|pas de solution|impossible|none|no solution/i;

// Solutions written with parameters: x = a − 1 ; x = a + 1. Compared at
// random values of the parameters (where the expected solutions exist).
export function checkParamset(item, raw) {
  const s = String(raw).replace(/\s/g, '');
  const parts = s.split(';').filter(Boolean).map((p) => tryParseAlg(p));
  if (!parts.length || parts.some((n) => !n)) return { kind: 'stay', message: t('Écris les solutions ainsi : x = … ; x = …') };
  const exprs = parts.map((n) => (n.t === 'eq' ? (n.l.t === 'var' && n.l.name === 'x' ? n.r : n.r.t === 'var' && n.r.name === 'x' ? n.l : null) : n));
  if (exprs.some((e) => !e)) return { kind: 'stay', message: t('Écris chaque solution sous la forme x = …') };
  if (exprs.some((e) => varsIn(e).has('x'))) return { kind: 'stay', message: t('x est encore des deux côtés : la solution ne doit dépendre que des paramètres.') };
  const want = item.solutions.map((e) => parseAlg(e));
  let tested = 0;
  for (let i = 0; i < 12 && tested < 4; i++) {
    const env = Object.fromEntries(item.params.map(([name, lo, hi], j) => [name, lo + ((i * 0.618 + j * 0.37) % 1) * (hi - lo)]));
    let w;
    try { w = want.map((e) => evalAt(e, env)); } catch { continue; }
    if (w.some((v) => !Number.isFinite(v))) continue;
    tested += 1;
    let g;
    try { g = exprs.map((e) => evalAt(e, env)); } catch { return { kind: 'wrong' }; }
    const used = new Set();
    for (const v of g) {
      const k = w.findIndex((x, idx) => !used.has(idx) && Math.abs(x - v) < 1e-6 * Math.max(1, Math.abs(x)));
      if (k < 0) return { kind: 'wrong' };
      used.add(k);
    }
    if (used.size < w.length) return { kind: 'stay', message: t('C\'est juste, mais il manque une solution.') };
  }
  return tested ? { kind: 'done' } : { kind: 'wrong' };
}

// An equation rewritten as "… = 0": same solutions as the target, written
// with everything on one side.
export function checkEqZero(item, raw) {
  const node = tryParseAlg(raw);
  if (!node || node.t !== 'eq') return { kind: 'stay', message: t('Écris une équation de la forme … = 0.') };
  const zero = (n) => n.t === 'num' && n.v.n === 0;
  if (!zero(node.r) && !zero(node.l)) return { kind: 'stay', message: t('Ramène tout du même côté : l\'autre côté doit être 0.') };
  const side = zero(node.r) ? node.l : node.r;
  const target = parseAlg(item.target);
  const names = [...new Set([...varsIn(side), ...varsIn(target)])];
  let ratio = null;
  for (let i = 0; i < 6; i++) {
    const env = Object.fromEntries(names.map((n, j) => [n, 0.7 + ((i * 1.3 + j * 0.77) % 3.1)]));
    let p; let q;
    try { p = evalAt(side, env); q = evalAt(target, env); } catch { return { kind: 'wrong' }; }
    if (Math.abs(q) < 1e-9) continue;
    const r = p / q;
    if (ratio == null) ratio = r;
    else if (Math.abs(r - ratio) > 1e-6 * Math.max(1, Math.abs(ratio))) return { kind: 'wrong' };
  }
  return ratio && Math.abs(ratio) > 1e-9 ? { kind: 'done' } : { kind: 'wrong' };
}

// A set of solutions: every value found, none missing, none extra.
export function checkSolset(item, raw) {
  if (NONE.test(String(raw))) return item.values.length ? { kind: 'wrong' } : { kind: 'done' };
  if (!item.values.length) return { kind: 'wrong', rule: (item.setTraps || [])[0]?.rule ?? null };
  const got = readValues(raw, 'x');
  if (!got) return { kind: 'stay', message: t('Écris les solutions ainsi : x = 2 ; x = −1/3') };
  const vals = [...new Set(got.map((g) => Math.round(g.value * 1e9) / 1e9))];
  const want = item.values;
  const allRight = vals.every((v) => want.some((w) => close(v, w)));
  if (allRight && vals.length === want.length) return { kind: 'done' };
  if (allRight && vals.length < want.length) return { kind: 'stay', message: want.length - vals.length === 1 ? t('C\'est juste, mais il manque une solution.') : t('C\'est juste, mais il manque des solutions.') };
  const trap = (item.setTraps || []).find((t) => vals.some((v) => t.values.some((w) => close(v, w))));
  return { kind: 'wrong', rule: trap?.rule ?? null };
}

// A 2×2 system: x = … ; y = … (or the pair in order).
export function checkSystem(item, raw) {
  const got = readValues(raw, null);
  if (!got || got.length !== 2) return { kind: 'stay', message: t('Écris la réponse ainsi : x = 2 ; y = −1') };
  const byName = Object.fromEntries(got.filter((g) => g.name).map((g) => [g.name, g.value]));
  const x = byName.x ?? got[0].value;
  const y = byName.y ?? got[1].value;
  const [X, Y] = item.pair;
  if (close(x, X) && close(y, Y)) return { kind: 'done' };
  if (close(x, Y) && close(y, X) && !close(X, Y)) return { kind: 'wrong', rule: 'graph_xy_swap' };
  // Right for one equation only.
  const fits = (e) => close(e[0] * x + e[1] * y, e[2]);
  return { kind: 'wrong', rule: item.eqs.some(fits) ? 'system_one_equation' : null };
}

// "v = d/t": the variable alone on one side, not on the other, and the
// same formula as the expected one (checked with random positive values).
export function checkIsolate(item, raw) {
  const node = tryParseAlg(raw);
  if (!node || node.t !== 'eq') return { kind: 'stay', message: t('Écris ta réponse ainsi : {v} = …', { v: item.variable }) };
  const v = item.variable;
  const isV = (n) => n.t === 'var' && n.name === v;
  const other = isV(node.l) ? node.r : isV(node.r) ? node.l : null;
  if (!other) return { kind: 'stay', message: t('Il faut {v} tout seul d\'un côté du « = ».', { v }) };
  if (varsIn(other).has(v)) return { kind: 'stay', message: t('{v} est encore des deux côtés : regroupe les termes en {v}, puis mets {v} en évidence.', { v }) };
  const same = (a, b) => {
    const names = [...new Set([...varsIn(a), ...varsIn(b)])];
    for (let i = 0; i < 4; i++) {
      const env = Object.fromEntries(names.map((n, j) => [n, 1.3 + ((i * 7 + j * 3) % 11) * 0.73]));
      let p; let q;
      try { p = evalAt(a, env); q = evalAt(b, env); } catch { return false; }
      if (!Number.isFinite(p) || !Number.isFinite(q) || Math.abs(p - q) > 1e-7 * Math.max(1, Math.abs(p))) return false;
    }
    return true;
  };
  if (same(other, parseAlg(item.target))) return { kind: 'done' };
  const trap = (item.isoTraps || []).find((t) => { try { return same(other, parseAlg(t.expr)); } catch { return false; } });
  if (trap) return { kind: 'wrong', rule: trap.rule };
  // The answer upside down (x = 2a/c for c/(2a)), in any formula.
  let flipped = false;
  try { flipped = same(other, parseAlg(`1/(${item.target})`)); } catch { /* not a quotient */ }
  return { kind: 'wrong', rule: flipped ? 'iso_flip_quotient' : null };
}

export const CHECKERS = {
  primes: checkPrimes, surd: checkSurd, rounded: checkRounded, alg: checkAlg,
  solset: checkSolset, system: checkSystem, isolate: checkIsolate,
  paramset: checkParamset, eqzero: checkEqZero,
  // Physics: a rounded number (js/physics/checker.js).
  phys: checkPhys, physiso: checkPhysIso, physunit: checkPhysUnit,
};

// Answers that are not a single number: a product of prime factors
// (360 = 2^3×3^2×5) and a simplified root (√72 = 6√2). Pure functions, no
// DOM, so they can be tested.
//
// Result: {kind: 'done'} | {kind: 'stay', message} | {kind: 'wrong', rule?}

import { parseAlg, tryParseAlg, equivalent, isReducedForm, factoredProblem } from './algebra.js';

const isPrime = (n) => {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
};
const isSquarefree = (n) => { for (let d = 2; d * d <= n; d++) if (n % (d * d) === 0) return false; return true; };
const clean = (s) => String(s).replace(/\s/g, '').replace(/[*x·]/g, '×');

export function checkPrimes(item, raw) {
  const s = clean(raw);
  if (!/^\d+(\^\d+)?(×\d+(\^\d+)?)*$/.test(s)) {
    return { kind: 'stay', message: 'Écris un produit de facteurs, par exemple 2^3×3×5.' };
  }
  let value = 1;
  const bases = [];
  for (const f of s.split('×')) {
    const [b, e = '1'] = f.split('^');
    value *= Number(b) ** Number(e);
    bases.push(Number(b));
  }
  if (value !== item.target) return { kind: 'wrong' };
  if (bases.includes(1)) return { kind: 'stay', message: 'C\'est égal, mais 1 n\'est pas un nombre premier : enlève-le.' };
  const notPrime = bases.find((b) => !isPrime(b));
  if (notPrime) return { kind: 'stay', message: `C'est égal, mais ${notPrime} n'est pas premier : décompose-le encore.` };
  return { kind: 'done' };
}

export function checkSurd(item, raw) {
  const s = clean(raw).replace(/×/g, '');
  const mm = s.match(/^(\d*)√(\d+)$/);
  const [K, R] = item.surd;
  if (/^\d+$/.test(s)) return { kind: 'wrong' };
  if (!mm) return { kind: 'stay', message: 'Écris ta réponse sous la forme a√b, par exemple 6√2.' };
  const k = mm[1] ? Number(mm[1]) : 1;
  const r = Number(mm[2]);
  if (k * k * r !== item.target) return { kind: 'wrong', rule: k === K * K && r === R ? 'surd_forget_root' : null };
  if (!isSquarefree(r)) return { kind: 'stay', message: `C'est égal, mais on peut encore sortir un carré de √${r}.` };
  return { kind: 'done' };
}

// A rounded measure (1 pied² ≈ 0,09 m²): any value within half a unit of
// the requested precision counts. Traps are matched the same way.
export function checkRounded(item, raw) {
  const s = clean(raw).replace(',', '.');
  if (!/^-?\d+(\.\d+)?$/.test(s)) return { kind: 'stay', message: 'Écris un nombre, avec une virgule si besoin.' };
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
  if (!node) return { kind: 'stay', message: 'Je n\'arrive pas à lire cette expression.' };
  if (node.t === 'eq') return { kind: 'stay', message: 'Écris seulement l\'expression, sans « = ».' };
  const target = parseAlg(item.target);
  let same;
  try { same = equivalent(node, target); } catch { return { kind: 'stay', message: 'Je n\'arrive pas à calculer cette expression.' }; }
  if (!same) {
    const trap = (item.algTraps || []).find((t) => { try { return equivalent(node, parseAlg(t.expr)); } catch { return false; } });
    return { kind: 'wrong', rule: trap?.rule ?? null };
  }
  if (item.form === 'reduced' && !isReducedForm(node)) return { kind: 'stay', message: 'C\'est égal, mais développe et réduis encore : un seul terme de chaque sorte, sans parenthèses.' };
  if (item.form === 'factored' || item.form === 'common') {
    const problem = factoredProblem(node, { complete: item.form === 'factored' });
    if (problem) return { kind: 'stay', message: problem.startsWith('Écris') ? problem : `C'est égal, mais ce n'est pas fini : ${problem}` };
  }
  return { kind: 'done' };
}

export const CHECKERS = { primes: checkPrimes, surd: checkSurd, rounded: checkRounded, alg: checkAlg };

// Answers that are not a single number: a product of prime factors
// (360 = 2^3×3^2×5) and a simplified root (√72 = 6√2). Pure functions, no
// DOM, so they can be tested.
//
// Result: {kind: 'done'} | {kind: 'stay', message} | {kind: 'wrong', rule?}

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

export const CHECKERS = { primes: checkPrimes, surd: checkSurd };

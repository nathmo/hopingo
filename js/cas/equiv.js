// Equivalence of two expressions (spec §4.4): exact when the normal form
// decides, else numeric sampling. 12 points of the domain; a point is
// dropped where either side is undefined or above 1e8; at least 8 valid
// points are needed; one differing point is enough, and is kept as witness.
// The draws are seeded, so the same pair is always judged the same way.

import { makeRng } from '../content/random.js';
import { symbolsIn } from './ast.js';
import { equalExact } from './normal.js';
import { evalFloat, sample } from './numeric.js';

const POINTS = 12;
const MIN_VALID = 8;
const MAX_DRAWS = 40;
const BIG = 1e8;

export const close = (a, b) => Math.abs(a - b) <= 1e-9 * (1 + Math.abs(a) + Math.abs(b));

// A seed from a text, for deterministic draws.
export function seedOf(text) {
  let h = 2166136261;
  for (const c of String(text)) h = Math.imul(h ^ c.codePointAt(0), 16777619);
  return h >>> 0;
}

export function equivalent(a, b, { vars, domain = {}, rng, seed = 1 } = {}) {
  const exact = equalExact(a, b);
  if (exact === true) return { equal: true, method: 'exact' };
  const names = vars ?? [...new Set([...symbolsIn(a), ...symbolsIn(b)])];
  const r = rng ?? makeRng(seed);
  let valid = 0;
  let draws = 0;
  let witness = null;
  while (valid < POINTS && draws < MAX_DRAWS && !(draws >= POINTS && valid >= MIN_VALID)) {
    const [env] = sample(names, domain, r, 1);
    draws++;
    const x = evalFloat(a, env, { guard: true });
    const y = evalFloat(b, env, { guard: true });
    if (!Number.isFinite(x) || !Number.isFinite(y) || Math.abs(x) > BIG || Math.abs(y) > BIG) continue;
    valid++;
    if (!close(x, y)) { witness = { env, values: [x, y] }; break; }
  }
  if (witness) return { equal: false, method: exact === false ? 'exact' : 'numeric', witness };
  if (exact === false) return { equal: false, method: 'exact' };
  if (valid < MIN_VALID) return { equal: false, method: 'numeric', undecided: true };
  return { equal: true, method: 'numeric' };
}

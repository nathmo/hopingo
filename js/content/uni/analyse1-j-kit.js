// Shared pieces of the generators of module A1, part j (step U4): numbers
// as text, square roots of fractions written without a fraction inside,
// parts assembled into a lines item (js/content/uni/analyse1-c-kit.js),
// the common fields of the items.

import { Q } from '../../math/rational.js';
import { MT } from './kit.js';

export { modeOf, H, E, examOf, uniqOptions, blanked, segment, frN, vfMcq } from './analyse1-a-kit.js';
export { assemble, fitLines } from './analyse1-c-kit.js';

export const q = (n, d = 1) => new Q(n, d);
export const V = 'x';
export const KEYS = ['calcx', 'calcfn', 'anal'];
export const LIM = (to, dir) => ({ kind: 'limit', v: V, to: String(to), ...(dir ? { dir } : {}) });

// A rational number as text (−3/4 written -3/4), in brackets when it is a
// fraction or negative (inside a product).
export const qt = (c) => (typeof c === 'string' ? c : Q.of(c).toString());
export const pq = (c) => { const x = Q.of(c); return x.n < 0 || x.d !== 1 ? `(${x.toString()})` : x.toString(); };
// French text of a rational number: −3/4.
export const fq = (c) => qt(c).replace(/-/g, '−');

// k·x as text: x, -x, 3x, 3x^2.
export const kx = (k, p = 1, v = V) => {
  const m = p === 1 ? v : `${v}^${p}`;
  if (k === 1) return m;
  if (k === -1) return `-${m}`;
  return `${k}${m}`;
};
// x + c as text: x+3, x-2, x.
export const xc = (c, v = V) => (c === 0 ? v : c > 0 ? `${v}+${c}` : `${v}-${-c}`);
// A signed constant after a term: +3, -2, ''.
export const sc = (c) => (c === 0 ? '' : c > 0 ? `+${c}` : `-${-c}`);

// A short text read aloud: x-2 → x − 2, 1/(x+1) → 1/(x + 1).
export const rd = (t) => String(t).replace(/-/g, ' − ').replace(/\+/g, ' + ').replace(/^ − /, '−').replace(/\( − /g, '(−');

// x² + bx + c as text.
export const poly2 = (b, c, v = V) => `${v}^2${b === 0 ? '' : b === 1 ? `+${v}` : b === -1 ? `-${v}` : `${sc(b)}${v}`}${sc(c)}`;

const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));

// √(p/q) (p, q > 0 whole) written s√m/t, without a fraction under the
// root: {text, exact: Q | null}.
export function sqrtFrac(p, qq) {
  const g = gcd(p, qq);
  p /= g; qq /= g;
  let n = p * qq;
  let s = 1;
  for (let k = 2; k * k <= n; k++) while (n % (k * k) === 0) { n /= k * k; s *= k; }
  const h = gcd(s, qq);
  const top = s / h;
  const den = qq / h;
  if (n === 1) return { text: qt(q(top, den)), exact: q(top, den) };
  const root = `√${n}`;
  const num = top === 1 ? root : `${top}√${n}`;
  return { text: den === 1 ? num : top === 1 ? `${root}/${den}` : `(${num})/${den}`, exact: null };
}

// A function written f(x) = … in the prompt.
export const fx = (t) => `f(x) = ${MT(t)}`;

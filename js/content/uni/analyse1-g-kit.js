// Shared pieces of the generators of module A1, part g (step U4): the
// judges of sequence items, a few writers of terms in n, and the
// counter-examples of the true/false items. The line machinery (fitLines,
// assemble, menus, blanks) is the one of part c (analyse1-c-kit.js).

import { Q } from '../../math/rational.js';
import { MT } from './kit.js';

export const OPTS = { vars: ['n'] };
export const M = (text, vars = ['n']) => MT(text, { vars });
// Limits of sequences (catalogue A1, convention 1): whole n → +∞.
export const LIMN = (v = 'n', extra = {}) => ({ kind: 'limit', v, to: '+∞', discrete: true, ...extra });
// A value asked for (lim sup, ℓ ≤ …).
export const VAL = (expect) => ({ kind: 'value', expect: String(expect) });
// Equal lines in n (whole n, small enough for n! and cⁿ²).
export const EQN = (extra = {}) => ({ kind: 'equiv', vars: ['n'], domain: { n: { int: [1, 12] } }, ...extra });

export const q = (n, d = 1) => new Q(n, d);
export const qt = (c) => c.toString();
// A rational as it is shown: −3/2.
export const qh = (c) => qt(c).replace('-', '−');
export const fr = (x) => String(x).replace(/-/g, '−');

// c·v (c a whole number): n, −n, 3n; with c = 0, ''.
export const cv = (c, v = 'n') => (c === 0 ? '' : c === 1 ? v : c === -1 ? `-${v}` : `${c}${v}`);
// a·v + b: 3n+2, n-1, 2n.
export function lin(a, b, v = 'n') {
  const head = cv(a, v);
  if (!b) return head || '0';
  if (!head) return String(b);
  return `${head}${b < 0 ? '-' : '+'}${Math.abs(b)}`;
}
// A text in brackets when it is a sum.
export const par = (t) => (/[+-]/.test(t.slice(1)) ? `(${t})` : t);
// A factor before a letter or a bracket: 1 → '', −1 → '-', 3 → '3'.
export const coef = (c) => (c === 1 ? '' : c === -1 ? '-' : String(c));
// n^k: n, n^2.
export const pw = (k, v = 'n') => (k === 0 ? '1' : k === 1 ? v : `${v}^${k}`);

// The French name of a limit value.
export const limWord = (t) => (t === '+∞' ? '+∞' : t === '-∞' ? '−∞' : fr(t));

// A sequence counter-example (js/judges/counters.js): one or more
// sequences asked, hypotheses and conclusion as properties.
export function seqCounter({ seqs = ['a'], hyp, concl, answer, labels }) {
  return {
    kind: 'sequence', v: 'n', from: 1, seqs, hyp, concl,
    ask: seqs.map((s) => ({ v: s, label: labels?.[s] || `${s}ₙ =`, keys: ['calc', 'calcfn', 'seq'] })),
    answer,
  };
}

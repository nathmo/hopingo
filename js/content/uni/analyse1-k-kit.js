// Helpers shared by the generators of module A1, part k (step U4): the
// lines helpers of part e (blanks, menus, parts), numbers written as
// decimals, options without duplicates.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toReadable } from '../../cas/print.js';
import { mcq } from './kit.js';

export {
  V, q, N, nz, modeOf, H, E, SEG, tpl, blanked, stepMenus, withMenus, partsScript, fr,
} from './analyse1-e-kit.js';

// Text of a node, readable (− and ·), for prompts.
export const RD = (t, o) => toReadable(parse(t, o));

// A rational as a decimal with a comma: exact if it ends within `digits`
// digits, else rounded (approx: true).
export function dec(x, digits = 4) {
  const v = Q.of(x);
  const f = v.n / v.d;
  const exact = Number(f.toFixed(12));
  let s = String(exact);
  let approx = false;
  const decimals = s.includes('.') ? s.split('.')[1].length : 0;
  if (decimals > digits || s.includes('e')) {
    s = f.toFixed(digits).replace(/0+$/, '').replace(/\.$/, '');
    approx = true;
  }
  return { text: s.replace('.', ','), show: s.replace('.', ',').replace('-', '−'), approx };
}

// Options of a multiple choice: the first one right, the others without
// duplicates (same html), at most `n`.
export function uniqOptions(options, n = 4) {
  const out = [];
  for (const o of options) {
    if (out.length >= n) break;
    if (!out.some((x) => x.html === o.html)) out.push(o);
  }
  return out;
}

// An exam multiple choice (level 4 with opts.exam, level 5 alone).
export function examMcq(o, rng, opts) {
  const it = mcq({ ...o, level: opts.exam ? 4 : 5, expectedSec: 240, exam: opts.exam ? { format: 'mcq', points: 1 } : false }, rng);
  return opts.exam ? it : { ...it, noHints: true, hints: [] };
}

export const tfTag = { format: 'tf', points: 1 };

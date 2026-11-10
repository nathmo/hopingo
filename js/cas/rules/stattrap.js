// The traps of modules G7 and P (step U7) are mostly wrong values: the
// count without the constraint, the variance divided by n, Pr(+ | M) for
// Pr(M | +)… The generator knows the numbers of its item and writes each
// trap's wrong values in the judge's configuration (cfg.traps: {id: [texts]}
// or {id: {values, ctx}}); `transform` reads them back, and the judges
// `prob` and `stat` compare them to the student's line (js/judges/diagnose.js).
// Multiple choices take their distractors from the same values.
//
// trap({id, family, tag, skill, repair, name, example, explain, judges?,
//       wrong?: [right, wrong], check?}): a rule of js/cas/rules/index.js.
// `explain(ctx)` gets the ctx the generator gave (and must read well
// without it); `wrong` builds the check of tests/judges.test.js: the
// example's wrong value, given as the trap's value, is diagnosed.

import { readStat } from '../../judges/statline.js';

export function trap(o) {
  const { explain, wrong, ...rest } = o;
  const rule = {
    judges: ['prob', 'stat'],
    ...rest,
    transform: (prev, ctx) => {
      const t = ctx?.cfg?.traps?.[o.id];
      if (!t) return [];
      const values = Array.isArray(t) ? t : t.values || [];
      const c = Array.isArray(t) ? {} : t.ctx || {};
      return values.map((v) => ({ node: readStat(ctx.cfg, String(v)), ctx: c }));
    },
    explain: (ctx = {}) => {
      try { return explain(ctx || {}); } catch { return explain({}); }
    },
  };
  if (!rule.check && wrong) {
    const [right, bad] = wrong;
    rule.check = { judge: { kind: rule.judges[0], expect: String(right), decimals: 6, traps: { [o.id]: [String(bad)] } }, prev: '?', line: String(bad) };
  }
  return rule;
}

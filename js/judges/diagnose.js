// Naming the mistake of a wrong line (spec §7): every trap whose `judges`
// contains this judge replays itself on the previous line; a candidate that
// the judge's own equivalence finds equal to the student's line names it.
// The school traps on numbers are tried by the `value` judge, which hands
// purely numeric lines to js/math/judge.js.

import { CAS_RULES } from '../cas/rules/index.js';

// same(candidate, line) → boolean, the judge's equivalence.
// Returns {rules: [id], ambiguous, ctx, all} or null.
export function diagnoseLine(kind, prev, node, cfg, same) {
  const ctx = { v: cfg.dvar || cfg.vars?.[0] || cfg.v || 'x', cfg };
  const matches = [];
  for (const r of CAS_RULES) {
    if (!r.judges?.includes(kind) || !r.transform) continue;
    let cands;
    try { cands = r.transform(prev, ctx); } catch { continue; }
    for (const c of cands) {
      const cand = c.node ?? c;
      let hit = false;
      try { hit = same(cand, node); } catch { hit = false; }
      if (hit) { matches.push({ rule: r.id, ctx: c.ctx ?? {} }); break; }
    }
  }
  if (!matches.length) return null;
  return { rules: [matches[0].rule], ambiguous: matches.length, ctx: matches[0].ctx, all: matches.map((m) => m.rule) };
}

// Wrong final answers a trap produces from the question's first line, for
// the distractors of a multiple choice (§7). Returns [{node, rule}].
export function trapAnswers(kind, start, cfg, finish = (n) => n) {
  const ctx = { v: cfg.dvar || cfg.vars?.[0] || cfg.v || 'x', cfg };
  const out = [];
  for (const r of CAS_RULES) {
    if (!r.judges?.includes(kind) || !r.transform) continue;
    let cands;
    try { cands = r.transform(start, ctx); } catch { continue; }
    for (const c of cands) {
      try { out.push({ node: finish(c.node ?? c), rule: r.id }); } catch { /* skip */ }
    }
  }
  return out;
}

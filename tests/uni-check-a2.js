// Checks of the step U6 item parts (judges ode, system, bound, domain, and
// `domain` items), called by tests/uni-check.js.
import assert from 'node:assert/strict';
import { readWith } from '../js/judges/index.js';
import { chainsOf, varsOf } from '../js/judges/domain.js';
import { judgeDomainItem } from '../js/judges/domain-item.js';
import { toText } from '../js/cas/print.js';

export const A2_JUDGES = ['ode', 'system', 'bound', 'domain'];

// The first chain of a domain line, its upper bound halfway to the lower one.
function shrink(cfg, final) {
  const vars = varsOf(cfg);
  const cs = chainsOf(readWith(cfg, final), vars);
  return cs.map((c, i) => `${toText(c.lo)} ≤ ${c.v} ≤ ${i === 0 ? `(${toText(c.lo)}+${toText(c.hi)})/2` : toText(c.hi)}`).join(' ; ');
}

// A line the judge must refuse, from the final line of the first part.
export function wrongA2(cfg, final) {
  if (cfg.kind === 'ode') return /=/.test(final) && !/d[a-z]\s*$/.test(final) ? `${final}+${cfg.v || 'x'}^5` : `${final}+1`;
  if (cfg.kind === 'system') {
    const n = cfg.vars.filter((v) => !(cfg.elim || []).includes(v)).length;
    return `${final} ou (${Array(n).fill('7').join(' ; ')})`;
  }
  if (cfg.kind === 'bound') return `(${final})/1000`;
  if (cfg.kind === 'domain') return shrink(cfg, final);
  return `${final}+1`;
}

// item = {type: 'domain', judge, fields, answer: {v: [lo, hi]}}
export function checkDomainItem(it, where) {
  const r = judgeDomainItem(it, it.answer);
  assert.ok(r.correct, `${where}: reference bounds ${r.verdict.kind} ${r.verdict.message ?? ''}`);
  const [first] = it.fields;
  const [lo, hi] = it.answer[first.v];
  const bad = { ...it.answer, [first.v]: [lo, `(${lo}+${hi})/2`] };
  assert.equal(judgeDomainItem(it, bad).correct, false, `${where}: shrunk bounds accepted`);
}

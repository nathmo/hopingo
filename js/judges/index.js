// Registry of line judges (spec §5.1). Each judge exports
//   judgeLine(cfg, prev, input, state) → Verdict
//   isFinal(cfg, node) → true | false | string (right, but to tidy)
//   start(cfg) → the line 0, if the judge builds it
// Verdict: {kind: parse|same|ok|done|wrong|stay|form, node, message?, rule?,
//           diag?, witness?}. Later phases add their judges here.

import * as value from './value.js';
import * as equiv from './equiv.js';

export const JUDGES = { value, equiv };

export function judgeFor(cfg) {
  const j = JUDGES[cfg.kind];
  if (!j) throw new Error(`Juge inconnu : ${cfg.kind}`);
  return j;
}

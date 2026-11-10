// Counter-examples and examples of modules V, C and F (step U10, spec §16.3
// « Contre-exemples »): the kind `vcf` of checkCounter (js/judges/examples.js),
// counter = {kind: 'vcf', prop, params, ask: [{v, label}], answer}. Each
// property is a function (params, answers) → {ok, message?, rule?}; each
// part adds its own in vcf-examples-<part>.js (PROPS), merged here.

import { PROPS as VA } from './vcf-examples-va.js';
import { PROPS as VB } from './vcf-examples-vb.js';
import { PROPS as CA } from './vcf-examples-ca.js';
import { PROPS as CB } from './vcf-examples-cb.js';
import { PROPS as FA } from './vcf-examples-fa.js';
import { PROPS as FB } from './vcf-examples-fb.js';
import { PROPS as FC } from './vcf-examples-fc.js';
import { PROPS as FD } from './vcf-examples-fd.js';

export const PROPS = { ...VA, ...VB, ...CA, ...CB, ...FA, ...FB, ...FC, ...FD };

export function checkVcf(counter, answers) {
  const f = PROPS[counter.prop];
  if (!f) return { ok: false, message: 'Contre-exemple non vérifiable.' };
  try { return f(counter.params || {}, answers || {}); } catch { return { ok: false, message: 'Je n\'arrive pas à lire ta réponse.' }; }
}

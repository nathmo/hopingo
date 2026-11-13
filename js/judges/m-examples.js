// Counter-examples of module M (step U8, spec §16.3 « Contre-exemples »):
// the kind `mx` of checkCounter (js/judges/examples.js), counter =
// {kind: 'mx', prop, params, ask: [{v, label, shape?}], answer}. An ask
// with a shape is entered in the grid (ui/matrix-items.js, usesGrid). Each
// property is a function (params, answers) → {ok, message?, rule?}; the
// parts of the module add theirs in m-examples-<part>.js (PROPS), merged
// here. The counter-examples of module L (matOne, matPair…) stay usable:
// js/judges/linalg-examples.js.
//
// Helpers for the parts: readQ (a matrix or a vector over ℚ, from
// linalg-examples.js), need(message).

import { PROPS as PA } from './m-examples-a.js';
import { PROPS as PB } from './m-examples-b.js';
import { PROPS as PC } from './m-examples-c.js';
import { PROPS as PD } from './m-examples-d.js';
import { t } from '../i18n.js';

export const PROPS = { ...PA, ...PB, ...PC, ...PD };

export function checkMx(counter, answers = {}) {
  const f = PROPS[counter.prop];
  if (!f) return { ok: false, message: 'Contre-exemple non vérifiable.' };
  try { return f(counter.params || {}, answers); } catch (e) { return { ok: false, message: t('Je n\'arrive pas à lire ta réponse ({m}).', { m: e.message }) }; }
}

// Counter-examples of module N (step U9): kind `num`, one line in
// checkCounter (js/judges/examples.js).
//   counter = {kind: 'num', prop, params, ask: [{v, label}], answer: {v: text}}
// Each part of the module has its table of properties
// (js/judges/n-examples-<part>.js, PROPS: {name: (params, answers) →
// {ok, message?, rule?}}). Answers are texts (numbers, expressions in x,
// matrices [[…]]); the helpers below read them.

import { PROPS as A } from './n-examples-a.js';
import { PROPS as B } from './n-examples-b.js';
import { PROPS as C } from './n-examples-c.js';
import { PROPS as D } from './n-examples-d.js';
import { PROPS as E } from './n-examples-e.js';
import { PROPS as F } from './n-examples-f.js';
import { PROPS as G } from './n-examples-g.js';
import { PROPS as H } from './n-examples-h.js';
import { t } from '../i18n.js';

export const N_PROPS = { ...A, ...B, ...C, ...D, ...E, ...F, ...G, ...H };

export function checkNum(counter, answers) {
  const f = N_PROPS[counter.prop];
  if (!f) return { ok: false, message: t('Contre-exemple non vérifiable ({prop}).', { prop: counter.prop }) };
  try {
    return f(counter.params || {}, answers || {});
  } catch (e) {
    return { ok: false, message: t('Je n\'arrive pas à lire ta réponse.') };
  }
}

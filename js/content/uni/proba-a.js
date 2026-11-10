// Generators of module P, part a (unit `proba`, step U7): see
// proba-a.skills.js. Descriptive statistics in proba-a-desc.js; events,
// counting, conditioning, Bayes and independence in proba-a-events.js;
// discrete laws in proba-a-laws.js. Helpers: proba-a-kit.js, proba-kit.js.

import { GEN as DESC } from './proba-a-desc.js';
import { GEN as EVENTS } from './proba-a-events.js';
import { GEN as LAWS } from './proba-a-laws.js';

export const GEN = { ...DESC, ...EVENTS, ...LAWS };

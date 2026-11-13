// Generators of module P (unit `proba`, step U7), spec §8.3. Catalogue:
// docs/universite/P-probabilites.md. One file per part (proba-a.js …
// proba-e.js), each exporting GEN; tools in proba-kit.js. A skill not
// written yet gets a stand-in item (`stub: true`), which the tests refuse.

import { SKILLS } from './proba.skills.js';
import { mcq } from './kit.js';
import { t } from '../../i18n.js';
import { GEN as A } from './proba-a.js';
import { GEN as B } from './proba-b.js';
import { GEN as C } from './proba-c.js';
import { GEN as D } from './proba-d.js';
import { GEN as E } from './proba-e.js';

const stub = (s) => (level, rng, profile, opts = {}) => ({
  ...mcq({
    skill: s.id, level, prompt: t('{title} : bientôt.', { title: s.title }), key: `${s.id}:stub`,
    options: [{ html: t('D\'accord'), correct: true }, { html: t('Plus tard'), correct: false }],
    exam: opts.exam ? { format: opts.exam, points: 1 } : false,
  }, rng),
  subgoals: s.prereqs.map((p) => ({ id: p, label: p, skill: p })),
  stub: true,
});

const STUBS = Object.fromEntries(SKILLS.map((s) => [s.id, stub(s)]));

export const GEN = { ...STUBS, ...A, ...B, ...C, ...D, ...E };

// Generators of module A2 (unit `analyse2`, step U6), spec §8.3. Catalogue:
// docs/universite/A2-analyse-2.md. One file per part (analyse2-a.js …
// analyse2-i.js), each exporting GEN. A skill not written yet gets a
// stand-in item (`stub: true`), which the tests refuse.

import { SKILLS } from './analyse2.skills.js';
import { mcq } from './kit.js';
import { t } from '../../i18n.js';
import { GEN as A } from './analyse2-a.js';
import { GEN as B } from './analyse2-b.js';
import { GEN as C } from './analyse2-c.js';
import { GEN as D } from './analyse2-d.js';
import { GEN as E } from './analyse2-e.js';
import { GEN as F } from './analyse2-f.js';
import { GEN as G } from './analyse2-g.js';
import { GEN as H } from './analyse2-h.js';
import { GEN as I } from './analyse2-i.js';

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

export const GEN = { ...STUBS, ...A, ...B, ...C, ...D, ...E, ...F, ...G, ...H, ...I };

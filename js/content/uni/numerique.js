// Generators of module N (unit `numerique`, step U9), spec §8.3. Catalogue:
// docs/universite/N-analyse-numerique.md. One file per part
// (numerique-a.js … numerique-h.js), each exporting GEN. A skill not written
// yet gets a stand-in item (`stub: true`), which the tests refuse.

import { SKILLS } from './numerique.skills.js';
import { mcq } from './kit.js';
import { t } from '../../i18n.js';
import { GEN as A } from './numerique-a.js';
import { GEN as B } from './numerique-b.js';
import { GEN as C } from './numerique-c.js';
import { GEN as D } from './numerique-d.js';
import { GEN as E } from './numerique-e.js';
import { GEN as F } from './numerique-f.js';
import { GEN as G } from './numerique-g.js';
import { GEN as H } from './numerique-h.js';

const stub = (s) => (level, rng, profile, opts = {}) => ({
  ...mcq({
    skill: s.id, level, prompt: t('{title} : bientôt.', { title: s.title }), key: `${s.id}:stub`,
    options: [{ html: t("D'accord"), correct: true }, { html: t('Plus tard'), correct: false }],
    exam: opts.exam ? { format: opts.exam, points: 1 } : false,
  }, rng),
  subgoals: s.prereqs.map((p) => ({ id: p, label: p, skill: p })),
  stub: true,
});

const STUBS = Object.fromEntries(SKILLS.map((s) => [s.id, stub(s)]));

export const GEN = { ...STUBS, ...A, ...B, ...C, ...D, ...E, ...F, ...G, ...H };

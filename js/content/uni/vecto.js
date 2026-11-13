// Generators of module V (unit `vecto`, step U10), spec §8.3. Catalogue:
// docs/universite/VCF-analyse-3-4.md. One file per part, each exporting GEN.
// A skill not written yet gets a stand-in item (`stub: true`), which the
// tests refuse.

import { SKILLS } from './vecto.skills.js';
import { mcq } from './kit.js';
import { GEN as A } from './vecto-a.js';
import { GEN as B } from './vecto-b.js';
import { t } from '../../i18n.js';

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

export const GEN = { ...STUBS, ...A, ...B };

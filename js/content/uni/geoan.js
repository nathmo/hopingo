// Generators of module G4 (unit `geoan`), spec §8.3. Catalogue:
// docs/universite/G-gymnase-2.md. One file per part (geoan-a.js, geoan-b.js),
// each exporting GEN; tools in geo-kit.js. A skill not written yet gets a
// stand-in item (`stub: true`), which the tests refuse.

import { SKILLS } from './geoan.skills.js';
import { mcq } from './kit.js';
import { t } from '../../i18n.js';
import { GEN as A } from './geoan-a.js';
import { GEN as B } from './geoan-b.js';

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

export const GEN = { ...STUBS, ...A, ...B };

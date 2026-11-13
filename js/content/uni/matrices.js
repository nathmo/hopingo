// Generators of module M (unit `matrices`, step U8), spec §8.3. Catalogue:
// docs/universite/L-M-algebre-lineaire.md, part M. One file per part
// (matrices-a.js … matrices-d.js), each exporting GEN. A skill not written
// yet gets a stand-in item (`stub: true`), which the tests refuse.

import { SKILLS } from './matrices.skills.js';
import { mcq } from './kit.js';
import { GEN as A } from './matrices-a.js';
import { GEN as B } from './matrices-b.js';
import { GEN as C } from './matrices-c.js';
import { GEN as D } from './matrices-d.js';
import { t } from '../../i18n.js';

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

export const GEN = { ...STUBS, ...A, ...B, ...C, ...D };

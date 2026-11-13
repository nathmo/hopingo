// Generators of module G7 (unit `combi`, step U7), spec §8.3. Catalogue:
// docs/universite/G-gymnase-2.md, G7. Items: combi-gen.js (tools in
// proba-kit.js, traps in js/cas/rules/g7.js). A skill not
// written yet gets a stand-in item (`stub: true`), which the tests refuse.

import { SKILLS } from './combi.skills.js';
import { mcq } from './kit.js';
import { GEN as A } from './combi-gen.js';
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

export const GEN = { ...STUBS, ...A };

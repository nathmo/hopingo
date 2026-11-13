// Generators of module L (unit `alglin`), spec §8.3. Catalogue:
// docs/universite/L-M-algebre-lineaire.md, part L. One file per section of
// the catalogue (alglin-<section>.js, each exporting GEN); tools in
// alglin-kit.js. A skill whose section is not written yet gets a stand-in
// item (`stub: true`), which the tests refuse once the unit is complete.

import { SKILLS } from './alglin.skills.js';
import { mcq } from './kit.js';
import { GEN as SYS } from './alglin-sys.js';
import { GEN as MAT } from './alglin-mat.js';
import { GEN as DET } from './alglin-det.js';
import { GEN as VS } from './alglin-vs.js';
import { GEN as EIG } from './alglin-eig.js';
import { GEN as ORTH } from './alglin-orth.js';
import { GEN as SYM } from './alglin-sym.js';
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

export const GEN = { ...STUBS, ...SYS, ...MAT, ...DET, ...VS, ...EIG, ...ORTH, ...SYM };

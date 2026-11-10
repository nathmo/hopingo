// Generators of module G10 (unit `coniques`), spec §8.3. Catalogue:
// docs/universite/G-gymnase-2.md. One file per part (coniques-a.js, coniques-b.js),
// each exporting GEN; tools in geo-kit.js. A skill not written yet gets a
// stand-in item (`stub: true`), which the tests refuse.

import { SKILLS } from './coniques.skills.js';
import { mcq } from './kit.js';
import { GEN as A } from './coniques-a.js';
import { GEN as B } from './coniques-b.js';

const stub = (s) => (level, rng, profile, opts = {}) => ({
  ...mcq({
    skill: s.id, level, prompt: `${s.title} : bientôt.`, key: `${s.id}:stub`,
    options: [{ html: "D'accord", correct: true }, { html: 'Plus tard', correct: false }],
    exam: opts.exam ? { format: opts.exam, points: 1 } : false,
  }, rng),
  subgoals: s.prereqs.map((p) => ({ id: p, label: p, skill: p })),
  stub: true,
});

const STUBS = Object.fromEntries(SKILLS.map((s) => [s.id, stub(s)]));

export const GEN = { ...STUBS, ...A, ...B };

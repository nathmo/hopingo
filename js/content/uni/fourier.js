// Generators of module F (unit `fourier`, step U10), spec §8.3. Catalogue:
// docs/universite/VCF-analyse-3-4.md. One file per part, each exporting GEN.
// A skill not written yet gets a stand-in item (`stub: true`), which the
// tests refuse.

import { SKILLS } from './fourier.skills.js';
import { mcq } from './kit.js';
import { GEN as A } from './fourier-a.js';
import { GEN as B } from './fourier-b.js';
import { GEN as C } from './fourier-c.js';
import { GEN as D } from './fourier-d.js';

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

export const GEN = { ...STUBS, ...A, ...B, ...C, ...D };

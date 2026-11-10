// TEMPORARY (step U2, during the parallel build): placeholder items for
// the skills whose generator is not written yet. Each part replaces its
// stubs; this file is deleted at the end of the step.

import { mcq } from './kit.js';

export const stubGen = (ids) => Object.fromEntries(ids.map((id) => [id, (level, rng, profile, opts = {}) => ({
  ...mcq({
    skill: id, level, prompt: `(${id} : en construction) 1 + 1 =`,
    options: [{ html: '2', correct: true }, { html: '3', correct: false }], key: `${id}:stub`,
    exam: opts.exam ? { format: opts.exam, points: 1 } : false,
  }, rng),
  subgoals: [],
})]));

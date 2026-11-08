// Placement skim: a short binary search along the path, starting from the
// student's school year, to find where to begin. About 4-7 questions.

import { SKILLS, skimStartIndex } from '../content/skills.js';
import { generate } from '../content/generators.js';
import { applyPlacement, recordTraps } from './learner.js';

const MAX_QUESTIONS = 7;

export class Skim {
  constructor(profile, rng) {
    this.profile = profile;
    this.rng = rng;
    this.lo = 0; // every skill before lo is known
    this.hi = SKILLS.length; // the skill at hi is not known
    this.idx = Math.min(skimStartIndex(profile.year, profile.track), SKILLS.length - 1);
    this.count = 0;
    this.log = [];
  }

  get total() { return MAX_QUESTIONS; }
  get progress() { return this.lo >= this.hi ? 1 : Math.min(0.95, this.count / Math.max(4, Math.ceil(Math.log2(this.hi - this.lo + 1)) + this.count)); }

  next() {
    if (this.lo >= this.hi || this.count >= MAX_QUESTIONS) return null;
    const skill = SKILLS[this.idx].id;
    let item = generate(skill, 3, this.rng);
    // The skim wants a quick answer, not a guided walk-through.
    if (item.type === 'steps') item = { ...item, mode: 'free' };
    return { ...item, skim: true };
  }

  // known: answered right without struggling.
  answer(item, { correct, slow, rules, ambiguous }) {
    this.count += 1;
    const known = correct && !slow;
    this.log.push({ skill: item.skill, known });
    if (!correct && rules?.length) recordTraps(this.profile, { correct: false, rules, ambiguous });
    if (known) this.lo = this.idx + 1;
    else this.hi = this.idx;
    this.idx = Math.floor((this.lo + this.hi) / 2);
  }

  finish() {
    const boundary = Math.min(this.lo, this.hi);
    applyPlacement(this.profile, boundary);
    return { boundary, skill: SKILLS[boundary]?.id ?? null };
  }
}

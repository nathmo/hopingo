// A lesson: about ten questions chosen one at a time, so difficulty follows
// the student's answers as they come. Mistakes come back at the end.

import { SKILLS, SKILL_BY_ID } from '../content/skills.js';
import { generate } from '../content/generators.js';
import { RULE_BY_ID } from '../math/malrules.js';
import {
  skillState, recordAnswer, recordTraps, frontier, practiceSkill, dueSkills, activeTraps,
  finishReview, isUnlocked, isSlow,
} from './learner.js';
import { now } from './time.js';
import { recordFact } from './facts.js';

export const CORE_LENGTH = 10;
// Fact skills (times tables…) are short questions played as a fast series.
export const FACT_LENGTH = 15;
const MAX_RETRIES = 6;

// Multi-step skills give indirect credit to the skill behind each operation
// the student performed.
const OP_SKILL = {
  'frac-multistep': { '+': 'frac-add-any', '-': 'frac-add-any', '×': 'frac-mul', '÷': 'frac-div' },
  'rel-multistep': { '+': 'rel-add', '-': 'rel-sub', '×': 'rel-mul', '÷': 'rel-mul' },
  'rel-frac': { '+': 'frac-add-any', '-': 'frac-add-any', '×': 'frac-mul', '÷': 'frac-div' },
  'pow-priority': { '^': 'pow-def' },
  'pow-sign': { '^': 'pow-def', '×': 'rel-mul' },
  'root-calc': { '√': 'root-squares', '^': 'pow-def' },
  'root-frac': { '√': 'root-squares', '^': 'pow-frac', '×': 'frac-mul', '+': 'frac-add-any', '-': 'frac-add-any' },
  'pow-frac': { '^': 'pow-sign', '×': 'frac-mul', '+': 'frac-add-any', '-': 'frac-add-any' },
  'mix-9': { '+': 'rel-add', '-': 'rel-sub', '×': 'frac-mul-int', '^': 'pow-def' },
  'mix-10': { '+': 'frac-add-any', '-': 'frac-add-any', '×': 'rel-mul', '÷': 'frac-div', '^': 'pow-sign' },
  'mix-11': { '+': 'frac-add-any', '-': 'frac-add-any', '×': 'frac-mul', '÷': 'frac-div', '^': 'pow-frac', '√': 'root-frac' },
};

const GUESS = { fact: 0.02, mcq: 0.3, match: 0.1, shade: 0.05, numberline: 0.08, answer: 0.03, steps: 0.02 };

export class Lesson {
  // kind: 'smart' continues the path, 'skill' practises one skill,
  // 'review' does due reviews and traps, 'trap' works on one trap.
  constructor(profile, { kind = 'smart', skill = null, rule = null } = {}, rng) {
    this.trapRule = rule;
    this.profile = profile;
    this.kind = kind;
    this.rng = rng;
    this.focus = skill || frontier(profile);
    this.startedAt = now();
    this.results = [];
    this.retries = [];
    this.retryCount = 0;
    this.keys = new Set();
    this.recent = [];
    this.events = [];
    this.xp = 0;
    this.combo = 0;
    this.bestCombo = 0;
    this.reviewed = {};
    this.plan = this.makePlan();
    this.pos = 0;
  }

  makePlan() {
    const p = this.profile;
    const hasDue = dueSkills(p).length > 0;
    const hasTraps = activeTraps(p).some((r) => this.trapSkill(r));
    let plan;
    if (this.kind === 'trap') return Array(8).fill('trap');
    if (this.kind === 'review' || !this.focus) {
      plan = Array.from({ length: CORE_LENGTH }, (_, i) => (hasTraps && i % 3 === 2 ? 'trap' : 'review'));
    } else if (this.kind === 'skill') {
      plan = Array.from({ length: this.coreLength }, (_, i) => (hasTraps && i === 5 ? 'trap' : 'focus'));
    } else {
      plan = ['focus', 'focus', hasDue ? 'review' : 'focus', 'focus', hasTraps ? 'trap' : 'focus',
        'focus', 'focus', hasDue ? 'review' : 'focus', 'focus', 'focus'];
      while (plan.length < this.coreLength) plan.push('focus');
    }
    if (this.focus && plan[0] === 'focus' && !skillState(p, practiceSkill(p, this.focus)).introduced) {
      plan.unshift('intro');
    }
    return plan;
  }

  get coreLength() { return SKILL_BY_ID[this.focus]?.facts ? FACT_LENGTH : CORE_LENGTH; }

  get total() { return this.plan.filter((s) => typeof s === 'string' && s !== 'intro').length; }
  get done() { return this.results.filter((r) => !r.retry && r.slot !== 'intro').length; }
  get progress() { return Math.min(1, (this.done) / (this.total + Math.min(this.retries.length, 3) * 0.3)); }

  // The skill a trap can be practised on, if the student has reached it.
  trapSkill(rule) {
    const s = RULE_BY_ID[rule]?.skill;
    return s && SKILL_BY_ID[s] && isUnlocked(this.profile, s) ? s : null;
  }

  // A new question: not asked yet in this lesson. Fact sets can be small
  // (10 facts for a 15-question series), so a fact only has to differ from
  // the last few, never the same one twice in a row.
  generateFresh(skill, level, accept = () => true) {
    let item = null;
    for (let i = 0; i < 25; i++) {
      item = generate(skill, level, this.rng, this.profile);
      const used = item.type === 'fact' ? this.recent.includes(item.key) : this.keys.has(item.key);
      if (!used && accept(item)) break;
    }
    this.keys.add(item.key);
    this.recent = [...this.recent, item.key].slice(-4);
    return item;
  }

  // Next item, or null when the lesson is over.
  next() {
    while (this.pos < this.plan.length) {
      const slot = this.plan[this.pos++];
      const item = this.makeItem(slot);
      if (item) return item;
    }
    if (this.retries.length && this.retryCount < MAX_RETRIES) {
      this.retryCount += 1;
      return { ...this.retries.shift(), retry: true };
    }
    return null;
  }

  makeItem(slot) {
    const p = this.profile;
    // A missed fact comes back a couple of questions later.
    if (slot.retryOf) return { ...slot.retryOf, retry: true };
    if (slot === 'intro') {
      const skill = practiceSkill(p, this.focus);
      skillState(p, skill).introduced = true;
      const intro = { type: 'intro', skill, slot, def: SKILL_BY_ID[skill] };
      // The worked example is followed by an easy try: "à toi !"
      this.plan.splice(this.pos, 0, 'try');
      return intro;
    }
    if (slot === 'try') {
      const skill = practiceSkill(p, this.focus);
      return { ...this.generateFresh(skill, 1), slot, introTry: true };
    }
    if (slot === 'focus') {
      // Mastered mid-lesson: skip ahead to the next skill on the path.
      if (this.kind === 'smart' && skillState(p, this.focus).mastered) {
        const nxt = frontier(p);
        if (nxt && nxt !== this.focus) {
          this.focus = nxt;
          this.events.push({ type: 'skipAhead', skill: nxt });
          if (!skillState(p, practiceSkill(p, nxt)).introduced) {
            this.plan.splice(this.pos, 0, 'focus');
            return this.makeItem('intro');
          }
        }
      }
      if (!this.focus) return this.makeItem('review');
      const skill = practiceSkill(p, this.focus);
      return { ...this.generateFresh(skill, skillState(p, skill).level), slot };
    }
    if (slot === 'review') {
      const due = dueSkills(p).filter((id) => !this.reviewed[id] || this.reviewed[id].n < 2);
      let skill = due[0];
      if (!skill) {
        // Nothing due: a light review of the least recently seen known skill.
        const known = SKILLS.map((s) => s.id).filter((id) => p.skills[id]?.mastered || p.skills[id]?.testedOut);
        known.sort((a, b) => (p.skills[a].lastSeen || 0) - (p.skills[b].lastSeen || 0));
        skill = known[0];
      }
      if (!skill) return this.kind === 'review' ? null : this.makeItem('focus');
      const level = Math.max(2, skillState(p, skill).level);
      return { ...this.generateFresh(skill, level), slot, review: true };
    }
    if (slot === 'trap') {
      const traps = this.trapRule ? [this.trapRule] : activeTraps(p).filter((r) => this.trapSkill(r));
      if (!traps.length || !this.trapSkill(traps[0])) return this.focus && this.kind !== 'trap' ? this.makeItem('focus') : null;
      const rule = this.rng.pick(traps);
      const skill = this.trapSkill(rule);
      const level = Math.min(Math.max(2, skillState(p, skill).level), 4);
      return { ...this.generateFresh(skill, level, (it) => it.baits.includes(rule)), slot, trap: rule };
    }
    return null;
  }

  // outcome = {correct, rtSec, rules, ambiguous, ops}
  // Returns {xp, events, slow}.
  answer(item, outcome) {
    const p = this.profile;
    const events = [];
    if (item.type === 'intro') {
      this.results.push({ slot: 'intro', skill: item.skill, correct: true });
      return { xp: 0, events };
    }
    const st = skillState(p, item.skill);
    const slow = isSlow(st, outcome.rtSec, item.expectedSec);
    const weight = item.retry ? 0.3 : item.introTry ? 0.5 : 1;
    events.push(...recordAnswer(p, {
      skill: item.skill, level: item.level, correct: outcome.correct,
      rtSec: outcome.rtSec, expectedSec: item.expectedSec,
      guess: item.type === 'mcq' ? 1 / item.options.length : GUESS[item.type] ?? 0.05,
      rules: outcome.rules, ambiguous: outcome.ambiguous, baits: item.baits,
      weight, review: !!item.review,
    }));

    // Multi-step work is also evidence for the operations it used.
    if (item.fact) recordFact(p, item.fact, outcome.correct, outcome.rtSec, item.fluentSec);

    if (OP_SKILL[item.skill] && outcome.correct) {
      for (const op of new Set(outcome.ops || [])) {
        const s = OP_SKILL[item.skill][op];
        if (s && p.skills[s]) recordAnswer(p, { skill: s, level: 0, correct: true, rtSec: 0, expectedSec: 1, weight: 0.3 });
      }
    }

    if (item.review) {
      const r = (this.reviewed[item.skill] ||= { n: 0, ok: 0 });
      r.n += 1;
      if (outcome.correct) r.ok += 1;
    }

    let xp = 0;
    if (outcome.correct) {
      xp = item.retry ? 1 : 2 + (slow ? 0 : 1) + (item.type === 'steps' ? 2 : 0);
      this.combo += 1;
      this.bestCombo = Math.max(this.bestCombo, this.combo);
    } else {
      this.combo = 0;
      const retryN = (item.retryN || 0) + 1;
      if (item.type === 'fact' && retryN <= 2) this.plan.splice(this.pos + 2, 0, { retryOf: { ...item, retryN } });
      else if (!item.retry || item.retryN < 2) this.retries.push({ ...item, retry: true, retryN });
    }
    this.xp += xp;
    this.results.push({
      skill: item.skill, slot: item.slot, correct: outcome.correct, retry: !!item.retry,
      rtSec: outcome.rtSec, type: item.type,
    });
    this.events.push(...events);
    return { xp, events, slow, combo: this.combo };
  }

  // Traps seen outside a scored answer (placement skim, for instance).
  noteMistake(rules, ambiguous) {
    return recordTraps(this.profile, { correct: false, rules, ambiguous });
  }

  finish() {
    for (const [skill, r] of Object.entries(this.reviewed)) finishReview(this.profile, skill, r.ok / r.n);
    const core = this.results.filter((r) => !r.retry && r.slot !== 'intro');
    const correct = core.filter((r) => r.correct).length;
    const perfect = core.length > 0 && correct === core.length;
    const bonus = 5 + (perfect ? 5 : 0);
    this.xp += bonus;
    return {
      xp: this.xp, bonus, perfect,
      correct, total: core.length,
      accuracy: core.length ? correct / core.length : 1,
      seconds: Math.round((now() - this.startedAt) / 1000),
      events: this.events,
      bestCombo: this.bestCombo,
      steps: core.filter((r) => r.type === 'steps' && r.correct).length,
    };
  }
}

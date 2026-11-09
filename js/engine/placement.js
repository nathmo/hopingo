// Placement skim: a short binary search along the path, starting from the
// student's school year, to find where to begin. About 4-7 questions.
//
// With {unit}, the search runs along one unit's skills in topological
// order (« Je connais déjà ce module »). From BA1 on (spec §8.4), the first
// placement searches the school and gymnase path (years below 13), then
// each university unit of the earlier years, one after the other.

import {
  SKILLS, UNITS, skimStartIndex, unitPath, isUniversity,
} from '../content/skills.js';
import { generate } from '../content/generators.js';
import { applyPlacement, applyUnitPlacement, recordTraps } from './learner.js';

const MAX_QUESTIONS = 7;
const MAX_UNIT_QUESTIONS = 4;

const minYear = (path) => Math.min(...path.map((s) => s.year));

// The searches a placement runs: [{unit|null, order: [skill ids], start, max}].
export function placementPlan(profile, unit = null) {
  if (unit) {
    const order = unitPath(unit).map((s) => s.id);
    return [{ unit, order, start: Math.floor(order.length / 2), max: MAX_UNIT_QUESTIONS }];
  }
  if (!isUniversity(profile.year)) {
    return [{ unit: null, order: SKILLS.map((s) => s.id), start: skimStartIndex(profile.year, profile.track), max: MAX_QUESTIONS }];
  }
  const school = SKILLS.filter((s) => s.year < 13).map((s) => s.id);
  const plan = [{ unit: null, order: school, start: school.length - 1, max: MAX_QUESTIONS }];
  const uniUnits = UNITS.map((u) => ({ u, path: unitPath(u.id) }))
    .filter(({ path }) => path.length && minYear(path) >= 13 && minYear(path) < profile.year)
    .sort((a, b) => minYear(a.path) - minYear(b.path));
  for (const { u, path } of uniUnits) plan.push({ unit: u.id, order: path.map((s) => s.id), start: path.length - 1, max: MAX_UNIT_QUESTIONS });
  return plan;
}

export class Skim {
  constructor(profile, rng, { unit = null } = {}) {
    this.profile = profile;
    this.rng = rng;
    this.unit = unit;
    this.plan = placementPlan(profile, unit);
    this.part = -1;
    this.count = 0;
    this.log = [];
    this.results = [];
    this.nextPart();
  }

  nextPart() {
    if (this.seg) this.results.push({ unit: this.seg.unit, boundary: Math.min(this.lo, this.hi), order: this.seg.order });
    this.part += 1;
    this.seg = this.plan[this.part] || null;
    if (!this.seg) return;
    this.lo = 0; // every skill before lo is known
    this.hi = this.seg.order.length; // the skill at hi is not known
    this.idx = Math.max(0, Math.min(this.seg.start, this.seg.order.length - 1));
    this.partCount = 0;
  }

  get total() { return this.plan.reduce((s, x) => s + x.max, 0); }
  get progress() {
    if (!this.seg) return 1;
    const left = this.lo >= this.hi ? 0 : Math.ceil(Math.log2(this.hi - this.lo + 1));
    return Math.min(0.95, this.count / Math.max(4, this.count + left + (this.plan.length - this.part - 1) * 2));
  }

  next() {
    while (this.seg && (this.lo >= this.hi || this.partCount >= this.seg.max)) this.nextPart();
    if (!this.seg) return null;
    const skill = this.seg.order[this.idx];
    let item = generate(skill, 3, this.rng);
    // The skim wants a quick answer, not a guided walk-through.
    if (item.type === 'steps' || item.type === 'lines') item = { ...item, mode: 'free', noHints: true, hints: [] };
    return { ...item, skim: true };
  }

  // known: answered right without struggling.
  answer(item, { correct, slow, rules, ambiguous }) {
    this.count += 1;
    this.partCount += 1;
    const known = correct && !slow;
    this.log.push({ skill: item.skill, known });
    if (!correct && rules?.length) recordTraps(this.profile, { correct: false, rules, ambiguous });
    if (known) this.lo = this.idx + 1;
    else this.hi = this.idx;
    this.idx = Math.floor((this.lo + this.hi) / 2);
  }

  finish() {
    while (this.seg) this.nextPart();
    let first = null;
    for (const r of this.results) {
      if (r.unit) applyUnitPlacement(this.profile, r.unit, r.boundary);
      else applyPlacement(this.profile, r.boundary);
      if (first === null && r.order[r.boundary]) first = r.order[r.boundary];
    }
    const main = this.results[0];
    return { boundary: main.boundary, skill: first, unit: this.unit };
  }
}

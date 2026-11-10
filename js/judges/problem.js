// The `problem` item (spec §6, §9.6, §16.3; step U4), without the DOM: a
// long problem in parts, scored step by step, saved after every action and
// resumed after the app is closed. js/ui/problem.js draws it.
//
// item = {type: 'problem', skill, level, prompt, parts: [item…], points: [[…]…],
//         titles?: [html…], noHints: true, resumable: true, …common fields}
//   parts   full items (lines, mcq, tf, answer, blocks, tokens, table), each
//           with its own prompt: the question of that part.
//   points  one list per part: the points of each step. A step of a `lines`
//           part is one of its segments (§17 U0); any other part is one step.
//
// Scoring: a step earns its points when it is done without a wrong line, a
// wrong choice, a shown line, « continue with my line » or a skip. Later
// steps still count after a mistake (an exam is marked step by step).
//
// Save and resume: every action is an entry of `log`, and replaying the log
// on a new run rebuilds the same state (judging is deterministic):
//   {part, op: 'submit', input, guided}       a line
//   {part, op: 'decide', seg, index, id}       a decision of the script (or
//   {part, op: 'decide', options, id}          a « choose the action » menu)
//   {part, op: 'then', seg, index, id, input}  the typed follow-up of a decision
//   {part, op: 'pass', index}                  script notes and decisions shown
//   {part, op: 'follow' | 'reveal' | 'skip'}   « continue with my line », a
//                                              shown line, a skipped step
//   {part, op: 'hint', n}                      hints asked (lines items)
//   {part, op: 'answer', correct, rules}       a part that is not `lines`
// profile.pending = {item, log, at} (pendingOf); resumeRun(pending) gives
// the run back: a ProblemRun, or a LoggedLinesRun for a long `lines` item
// (§9.6: more than 8 reference lines).
//
// referenceLog(item) is the log of a perfect play (tests, the U4 criterion);
// checkProblem(item) replays it and expects every point.

import { LinesRun, segmentsOf } from './lines.js';

// ---------- a lines run that logs its actions ----------

export class LoggedLinesRun extends LinesRun {
  constructor(item, owner = null, part = 0) {
    super(item);
    this.owner = owner;
    this.part = part;
    this.log = owner ? null : [];
    this.bad = new Set(); // segments with a mistake, a shown line, a follow or a skip
    this.skipped = new Set();
    this._hints = 0;
  }

  record(e) {
    const entry = { part: this.part, ...e };
    if (this.owner) this.owner.record(entry);
    else { this.log.push(entry); this.onChange?.(); }
  }

  get hintsUsed() { return this._hints ?? 0; }
  set hintsUsed(n) {
    const before = this._hints ?? 0;
    this._hints = n;
    if (this.part !== undefined && n !== before && this.bad) this.record({ op: 'hint', n });
  }

  submit(input, opts = {}) {
    const seg = this.seg;
    const m = this.mistakes;
    const text = typeof input === 'string' ? input : String(input);
    const v = super.submit(text, opts);
    if (this.mistakes > m) this.bad.add(seg);
    if (v.kind !== 'parse') this.record({ op: 'submit', input: text, guided: !!opts.guided });
    return v;
  }

  decide(line, optionId) {
    const seg = this.seg;
    const m = this.mistakes;
    const index = this.segment.lines.indexOf(line);
    const opt = super.decide(line, optionId);
    if (this.mistakes > m) this.bad.add(seg);
    if (index >= 0) this.record({ op: 'decide', seg, index, id: optionId });
    else this.record({ op: 'decide', options: JSON.parse(JSON.stringify(line.options)), id: optionId });
    return opt;
  }

  answerThen(opt, input) {
    const seg = this.seg;
    const m = this.mistakes;
    const index = this.segment.lines.findIndex((l) => l.kind === 'decision' && l.options.includes(opt));
    const r = super.answerThen(opt, input);
    if (this.mistakes > m) this.bad.add(seg);
    if (r.kind !== 'parse') this.record({ op: 'then', seg, index, id: opt.id, input: String(input) });
    return r;
  }

  passScript(index) {
    const before = this.cursor;
    super.passScript(index);
    if (this.cursor !== before) this.record({ op: 'pass', index });
  }

  follow() {
    const seg = this.seg;
    const r = super.follow();
    if (r) { this.bad.add(seg); this.record({ op: 'follow' }); }
    return r;
  }

  reveal() {
    const seg = this.seg;
    const r = super.reveal();
    if (r) { this.bad.add(seg); this.record({ op: 'reveal' }); }
    return r;
  }

  // Give up the current step: it earns nothing, the next one starts.
  skip() {
    if (this.done) return null;
    const seg = this.seg;
    this.bad.add(seg);
    this.skipped.add(seg);
    if (this.seg + 1 < this.segments.length) this.enter(this.seg + 1);
    else this.done = true;
    this.record({ op: 'skip' });
    return { segmentDone: true, finished: this.done };
  }

  // Replays one log entry (its part is this run's).
  apply(e) {
    switch (e.op) {
      case 'submit': return this.submit(e.input, { guided: e.guided });
      case 'decide': {
        const line = e.options ? { options: e.options } : this.segments[e.seg].lines[e.index];
        return this.decide(line, e.id);
      }
      case 'then': {
        const line = this.segments[e.seg].lines[e.index];
        const opt = line.options.find((o) => o.id === e.id);
        return this.answerThen(opt, e.input);
      }
      case 'pass': return this.passScript(e.index);
      case 'follow': return this.follow();
      case 'reveal': return this.reveal();
      case 'skip': return this.skip();
      case 'hint': this.hintsUsed = e.n; return null;
      default: throw new Error(`Action inconnue : ${e.op}`);
    }
  }

  // Points of each segment, given the points of the steps.
  stepScores(points) {
    return this.segments.map((_, s) => ({ max: points[s] ?? 0, got: this.done || s < this.seg ? (this.bad.has(s) ? 0 : points[s] ?? 0) : 0 }));
  }
}

// ---------- the problem ----------

export class ProblemRun {
  constructor(item, log = [], { onChange } = {}) {
    this.item = item;
    this.log = [];
    this.onChange = null;
    this.part = 0;
    this.results = item.parts.map(() => null); // non-lines parts: {correct, rules}
    this.runs = item.parts.map(() => null);
    this.rules = [];
    this.done = false;
    this.startPart(0);
    for (const e of log) this.apply(e);
    this.onChange = onChange || null;
  }

  get current() { return this.item.parts[this.part]; }
  get linesRun() { return this.runs[this.part]; }

  record(e) {
    this.log.push(e);
    // A lines part ends with its run.
    const run = this.runs[this.part];
    if (run && run.done && !this.done && e.part === this.part) this.nextPart();
    this.onChange?.(this);
  }

  startPart(i) {
    this.part = i;
    if (i >= this.item.parts.length) { this.done = true; return; }
    const p = this.item.parts[i];
    if (p.type === 'lines') this.runs[i] = new LoggedLinesRun(p, this, i);
  }

  nextPart() {
    const run = this.runs[this.part];
    if (run) this.rules.push(...run.rules);
    this.startPart(this.part + 1);
  }

  // A part that is not `lines` has been answered.
  answer(outcome) {
    if (this.done || this.current.type === 'lines') return;
    const r = { correct: !!outcome.correct, rules: outcome.rules || [] };
    this.results[this.part] = r;
    this.rules.push(...r.rules);
    const part = this.part;
    this.startPart(part + 1);
    this.log.push({ part, op: 'answer', correct: r.correct, rules: r.rules });
    this.onChange?.(this);
  }

  // Give up the current step (a lines part: its current segment).
  skip() {
    if (this.done) return;
    const run = this.runs[this.part];
    if (run) run.skip();
    else this.answer({ correct: false, rules: [] });
  }

  apply(e) {
    if (e.part !== this.part) throw new Error(`Journal incohérent : partie ${e.part}, attendue ${this.part}`);
    if (e.op === 'answer') return this.answer(e);
    const run = this.runs[this.part];
    if (!run) throw new Error(`La partie ${e.part} n'est pas en lignes`);
    return run.apply(e);
  }

  // {got, max, parts: [{got, max, steps: [{got, max}]}]}
  score() {
    const parts = this.item.parts.map((p, i) => {
      const pts = this.item.points[i] || [];
      let steps;
      if (p.type === 'lines') {
        steps = this.runs[i] ? this.runs[i].stepScores(pts) : pts.map((m) => ({ max: m, got: 0 }));
      } else {
        steps = [{ max: pts[0] ?? 0, got: this.results[i]?.correct ? pts[0] ?? 0 : 0 }];
      }
      return { got: steps.reduce((s, x) => s + x.got, 0), max: steps.reduce((s, x) => s + x.max, 0), steps };
    });
    return { got: parts.reduce((s, x) => s + x.got, 0), max: parts.reduce((s, x) => s + x.max, 0), parts };
  }

  outcome() {
    const sc = this.score();
    const subgoals = new Set();
    for (const r of this.runs) if (r) for (const s of r.credited) subgoals.add(s);
    const correct = this.done && sc.got === sc.max;
    return {
      correct,
      rules: [...this.rules],
      ambiguous: 1,
      hintsUsed: 0,
      subgoals: [...subgoals],
      solo: correct && this.item.level === 5,
      score: { got: sc.got, max: sc.max },
    };
  }

  toPending() { return pendingOf(this); }
}

// ---------- pending and resume ----------

export const pendingOf = (run) => ({ item: run.item, log: [...(run.log || [])], at: Date.now() });

// A long `lines` item is saved too (§9.6).
export const isLongLines = (item) => item.type === 'lines' && (item.script || []).filter((l) => l.kind === 'eq').length > 8;
export const isResumable = (item) => item.type === 'problem' || isLongLines(item);

export function resumeRun(pending, opts = {}) {
  const { item, log } = pending;
  if (item.type === 'problem') return new ProblemRun(item, log, opts);
  const run = new LoggedLinesRun(item);
  for (const e of log) run.apply(e);
  run.onChange = opts.onChange || null;
  return run;
}

// ---------- reference play ----------

// The log of the reference solution of one lines item (part index `part`).
function linesReference(item, part) {
  const out = [];
  const guided = item.mode === 'guided';
  segmentsOf(item).forEach((seg, s) => {
    seg.lines.forEach((line, index) => {
      if (line.kind === 'decision') {
        const opt = line.options.find((o) => o.ref) ?? line.options.find((o) => o.valid && o.quality !== 'poor') ?? line.options.find((o) => o.valid);
        out.push({ part, op: 'decide', seg: s, index, id: opt.id });
        if (opt.then) out.push({ part, op: 'then', seg: s, index, id: opt.id, input: opt.then.expect });
      }
      if (line.kind === 'eq') out.push({ part, op: 'submit', input: line.math, guided });
    });
  });
  return out;
}

export function referenceLog(item) {
  if (item.type === 'lines') return linesReference(item, 0);
  return item.parts.flatMap((p, i) => (p.type === 'lines' ? linesReference(p, i) : [{ part: i, op: 'answer', correct: true, rules: [] }]));
}

// Replays the reference: every point, and the run is done. → {ok, score, log}
export function checkProblem(item) {
  const run = new ProblemRun(item);
  const log = referenceLog(item);
  for (const e of log) {
    if (run.done) return { ok: false, at: e, why: 'fini trop tôt' };
    run.apply(e);
  }
  const sc = run.score();
  return { ok: run.done && sc.got === sc.max && sc.max > 0, score: sc, log, run };
}

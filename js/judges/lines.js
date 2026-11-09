// The `lines` item (spec §6), without the DOM: segments, judging each line
// against the student's previous line, decisions, sub-goal credit,
// « continue with my line » (followError) and the outcome for the engine.
// js/ui/lines.js draws it; tests replay reference solutions with it.
//
// item = {type:'lines', start:{math}, judge:{kind, …cfg}, mode, script, final,
//         followError, hints, noHints, subgoals:[{id, label, skill}], tapActions, keys}
// ScriptLine:
//   {kind:'eq', math, subgoal?, note?, blanks?:[[i, j]]}   blanks: token ranges of math
//   {kind:'decision', prompt, options:[{id, label, valid, quality?, why?}]}
//   {kind:'note', html}
//   {kind:'rule', ask, options:[{id, label}], correct}      self-explanation
//   {kind:'segment', html, start:{math}, judge:{kind, …}}   a new part: its own judge (§16.2)

import { parse, tokenize } from '../cas/parse.js';
import { toText } from '../cas/print.js';
import { judgeFor } from './index.js';
import { parseOpts } from './common.js';

export function segmentsOf(item) {
  const segs = [{ start: item.start, judge: item.judge, html: null, lines: [] }];
  for (const l of item.script || []) {
    if (l.kind === 'segment') segs.push({ start: l.start, judge: l.judge, html: l.html, ask: l.ask, lines: [] });
    else segs[segs.length - 1].lines.push(l);
  }
  return segs;
}

export class LinesRun {
  constructor(item) {
    this.item = item;
    this.segments = segmentsOf(item);
    this.history = []; // {seg, node, how: 'start'|'ok'|'shown'|'followed'}
    this.mistakes = 0;
    this.rules = [];
    this.ambiguous = 1;
    this.diag = null;
    this.hintsUsed = 0;
    this.revealed = false;
    this.followed = false;
    this.lastWrong = null;
    this.wrongHere = 0;
    this.credited = new Set();
    this.done = false;
    this.enter(0);
  }

  enter(i) {
    this.seg = i;
    const s = this.segments[i];
    this.cfg = s.judge;
    this.prev = parse(s.start.math, parseOpts(this.cfg));
    this.state = {};
    this.cursor = 0; // index in s.lines of the next line to play
    this.history.push({ seg: i, node: this.prev, how: 'start' });
  }

  get segment() { return this.segments[this.seg]; }

  // The next reference line of this segment, from the cursor on.
  nextScript(kind = 'eq') {
    const lines = this.segment.lines;
    for (let k = this.cursor; k < lines.length; k++) if (lines[k].kind === kind) return { line: lines[k], index: k };
    return null;
  }

  credit(subgoalId) {
    const sg = this.item.subgoals?.find((s) => s.id === subgoalId);
    if (sg?.skill) this.credited.add(sg.skill);
  }

  accept(node, how, scriptIndex = null) {
    this.history.push({ seg: this.seg, node, how });
    this.prev = node;
    this.lastWrong = null;
    this.wrongHere = 0;
    if (scriptIndex !== null) {
      const line = this.segment.lines[scriptIndex];
      if (how === 'ok' && line.subgoal) this.credit(line.subgoal);
      this.cursor = scriptIndex + 1;
    }
  }

  finishSegment() {
    // In free lines the student's lines do not match the reference ones:
    // the sub-goals of the whole segment are credited at its end.
    if (this.item.mode !== 'guided' && !this.revealed) {
      for (const l of this.segment.lines) if (l.kind === 'eq' && l.subgoal) this.credit(l.subgoal);
    }
    if (this.seg + 1 < this.segments.length) this.enter(this.seg + 1);
    else this.done = true;
  }

  // Judge one line. guided: the line fills the next reference line, so a
  // right but untidy line (stay) is fine: the next reference line tidies it.
  submit(input, { guided = false } = {}) {
    if (this.done) return { kind: 'same', message: 'C\'est terminé.' };
    const v = judgeFor(this.cfg).judgeLine(this.cfg, this.prev, input, this.state);
    if (v.kind === 'wrong') {
      this.mistakes += 1;
      this.wrongHere += 1;
      this.lastWrong = v.node;
      if (v.diag) {
        this.rules.push(...v.diag.rules);
        this.ambiguous = Math.max(this.ambiguous, v.diag.ambiguous || 1);
        this.diag = v.diag;
      }
      return v;
    }
    if (guided && v.kind === 'stay') { v.kind = 'ok'; v.note = v.message; delete v.message; }
    if (v.kind !== 'ok' && v.kind !== 'done') return v;
    const next = guided ? this.nextScript() : null;
    this.accept(v.node, 'ok', next ? next.index : null);
    const last = guided && !this.nextScript();
    if (v.kind === 'done' || (last && v.kind === 'done')) {
      this.finishSegment();
      v.segmentDone = true;
      v.finished = this.done;
    }
    return v;
  }

  // Keep the wrong line and go on from it (§9.4). The item stays failed.
  follow() {
    if (!this.lastWrong) return null;
    const node = this.lastWrong;
    this.followed = true;
    this.accept(node, 'followed');
    const fin = judgeFor(this.cfg).isFinal(this.cfg, node);
    if (fin === true) { this.finishSegment(); return { segmentDone: true, finished: this.done }; }
    return { segmentDone: false };
  }

  // Show the next reference line (guided mode, after two misses).
  reveal() {
    const next = this.nextScript();
    if (!next) return null;
    this.revealed = true;
    const node = parse(next.line.math, parseOpts(this.cfg));
    this.accept(node, 'shown', next.index);
    const out = { line: next.line, node, segmentDone: false };
    if (!this.nextScript()) { this.finishSegment(); out.segmentDone = true; out.finished = this.done; }
    return out;
  }

  // A decision line: a wrong choice counts as a mistake, without a trap.
  decide(line, optionId) {
    const opt = line.options.find((o) => o.id === optionId);
    if (opt && !opt.valid) this.mistakes += 1;
    return opt;
  }

  // Skip non-eq script lines the UI has shown (decisions, notes, rules).
  passScript(index) { this.cursor = Math.max(this.cursor, index + 1); }

  outcome() {
    const correct = this.mistakes === 0 && !this.revealed && !this.followed;
    const level = this.item.level;
    return {
      correct,
      rules: this.rules,
      ambiguous: this.ambiguous,
      diag: this.diag,
      hintsUsed: this.hintsUsed,
      subgoals: [...this.credited],
      solo: correct && level === 5 && this.hintsUsed === 0,
    };
  }
}

// Replays the reference solution: every line must be right, and each
// segment must end with `done` on its last line. Returns {ok, log}.
export function checkScript(item) {
  const run = new LinesRun(item);
  const log = [];
  const segs = run.segments;
  for (let s = 0; s < segs.length; s++) {
    const eqs = segs[s].lines.filter((l) => l.kind === 'eq');
    if (!eqs.length) return { ok: false, log: [...log, { seg: s, kind: 'empty' }] };
    for (let k = 0; k < eqs.length; k++) {
      const v = run.submit(eqs[k].math, { guided: item.mode === 'guided' });
      log.push({ seg: s, math: eqs[k].math, kind: v.kind, message: v.message });
      const want = k === eqs.length - 1 ? 'done' : 'ok';
      if (v.kind !== want) return { ok: false, log };
    }
  }
  return { ok: run.done, log };
}

// ---------- blanks of guided lines ----------

// A line with some sub-expressions left blank: {math, blanks: [[i, j]]},
// token ranges of math. holes: nodes of `node` (same objects).
export function blankLine(node, holes, opts = {}) {
  const marked = toText(node, { ...opts, marks: new Set(holes) });
  let math = '';
  const ranges = [];
  const open = [];
  for (const c of marked) {
    if (c === '⟦') open.push(math.length);
    else if (c === '⟧') ranges.push([open.pop(), math.length]);
    else math += c;
  }
  const toks = tokenize(math, opts);
  const blanks = ranges.sort((a, b) => a[0] - b[0]).map(([a, b]) => {
    const i = toks.findIndex((t) => t.pos >= a);
    let j = i;
    while (j < toks.length && toks[j].pos < b) j++;
    return [i, j];
  });
  return { math, blanks };
}

// The text of a guided line: '□' for each blank (for display).
export function templateOf(line, opts = {}) {
  const toks = tokenize(line.math, opts);
  const out = [];
  for (let k = 0; k < toks.length; k++) {
    const b = line.blanks?.find(([i]) => i === k);
    if (b) { out.push('□'); k = b[1] - 1; } else out.push(toks[k].s);
  }
  return out.join('');
}

// The line with the student's entries in the blanks, each in brackets.
export function fillBlanks(line, values, opts = {}) {
  const toks = tokenize(line.math, opts);
  const out = [];
  let n = 0;
  for (let k = 0; k < toks.length; k++) {
    const b = line.blanks?.find(([i]) => i === k);
    if (b) { out.push(`(${values[n++] ?? ''})`); k = b[1] - 1; } else out.push(toks[k].s);
  }
  return out.join('');
}

// The expected text of each blank.
export function blankAnswers(line, opts = {}) {
  const toks = tokenize(line.math, opts);
  return (line.blanks || []).map(([i, j]) => toks.slice(i, j).map((t) => t.s).join(''));
}

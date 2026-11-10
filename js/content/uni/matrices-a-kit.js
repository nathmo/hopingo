// Tools of module M, part a (unit `matrices`, step U8): items made of parts
// (each with its judge), as alglin-mat.js does for L, plus blanks in the
// CAS lines (value, solset) and decisions shown at every level.
//
// partsItem(level, rng, segs, o): segs = [{html?, ask?, start, judge, menu?,
//   decision? (level 2 only), pre? (decisions at every level), lines:
//   [{math, note, subgoal, grid?, blank?}]}]. grid: the matrix of the line
//   (its cells become blanks at levels 1 and 2, judges mat/factor); blank:
//   a CAS line whose last numbers become blanks at levels 1 and 2. Level 3
//   puts `menu` in the judge (tapActions 'menu'). o: {skill, prompt, hints,
//   subgoals, key, fallback, baits?, keys?, noHints?, exam?}.

import { parse } from '../../cas/parse.js';
import { walk } from '../../cas/ast.js';
import { blankLine } from '../../judges/lines.js';
import { matLines, pickCells, withCells } from './alglin-kit.js';

export const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');

// The last k numbers of a CAS line as blanks.
export function blankNums(math, k = 1, vars = []) {
  try {
    const node = parse(math, { vars });
    const nums = [];
    walk(node, (n) => {
      if (n.t === 'pow') return false;
      if (n.t === 'num') nums.push(n);
      return true;
    });
    if (!nums.length) return { math };
    return blankLine(node, nums.slice(-k), { vars });
  } catch { return { math }; }
}

export function partsItem(level, rng, segs, o) {
  const script = [];
  const judgeOf = (s) => (level === 3 && s.menu ? { ...s.judge, menu: s.menu } : s.judge);
  segs.forEach((s, k) => {
    if (k > 0) script.push({ kind: 'segment', html: s.html, ask: s.ask, start: { math: s.start }, judge: judgeOf(s) });
    if (s.decision && level === 2) script.push(s.decision);
    for (const d of s.pre || []) script.push(d);
    for (const l of s.lines) {
      let line = { kind: 'eq', math: l.math, note: l.note || '', subgoal: l.subgoal };
      if (level <= 2 && l.grid) {
        const rows = [...Array(l.grid.length).keys()];
        const k2 = Math.min(l.grid.length * l.grid[0].length, level === 1 ? 2 : 3);
        line = withCells(line, pickCells(l.grid, rows, k2, rng));
      } else if (level <= 2 && l.blank) {
        const b = blankNums(l.math, level === 1 ? 1 : 2, s.judge.vars || (s.judge.v ? [s.judge.v] : []));
        if (b.blanks?.length) line = { ...line, math: b.math, blanks: b.blanks };
      }
      script.push(line);
    }
  });
  const item = matLines({
    skill: o.skill, level, prompt: o.prompt, start: segs[0].start, judge: judgeOf(segs[0]),
    mode: modeOf(level), tapActions: level === 3 ? 'menu' : null,
    script, hints: o.hints, subgoals: o.subgoals, key: o.key, fallback: o.fallback,
    noHints: o.noHints, exam: o.exam, keys: o.keys,
  });
  if (o.baits) item.baits = [...new Set([...item.baits, ...o.baits])];
  return item;
}

// A menu for level 3: the right action first in the data, shuffled.
export const menuOf = (rng, valid, others) => rng.shuffle([{ id: 'ok', label: valid, valid: true }, ...others]);

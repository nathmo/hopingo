// Tools shared by the generators of module A2 (step U6): the `domain` item,
// and the helpers of the earlier calculus parts re-exported (lines with
// blanks, menus of the « choose the action » mode, parts with their own
// judge: analyse1-e-kit.js; items: kit.js; vectors and parts: geo-kit.js).

import { MT, linesItem, mcq, tfItem, examTag, answerItem } from './kit.js';
import { domainLine } from '../../judges/domain-item.js';
import { readWith, showWith } from '../../judges/index.js';

export { MT, linesItem, mcq, tfItem, examTag, answerItem };
export { V, q, N, nz, modeOf, H, E, KEYS, SEG, tpl, blanked, stepMenus, withMenus, partsScript, piText, joinSum, fac, fr, sup } from './analyse1-e-kit.js';

// Keypads of A2 lines: numbers and letters, functions, ∫ lim, and x y z ∂ r φ θ λ C.
export const A2_KEYS = ['calcx', 'calcfn', 'a2', 'anal'];

// The bounds of an integral (type `domain`, spec §6): one row per variable,
// outer first. o = {skill, level, prompt, judge: {coords, region | ref,
// box, order?, shape?}, answer: {v: [lo, hi]} (texts), fields?: [{v,
// label?}] (default: the keys of answer, in order), hints, solution?,
// subgoals?, key, exam?, fallback?, keys?}.
export function domainItem(o) {
  const fields = o.fields || Object.keys(o.answer).map((v) => ({ v }));
  const judge = { kind: 'domain', ...o.judge, order: o.judge.order || fields.map((f) => f.v) };
  const line = domainLine({ fields }, o.answer);
  const exam = o.exam || false;
  const noHints = o.noHints ?? (o.level >= 5 || !!exam);
  return {
    skill: o.skill, level: o.level, type: 'domain', prompt: o.prompt,
    judge, fields, answer: o.answer, answerShape: o.judge.shape || o.judge.coords,
    keys: o.keys || ['calc', 'calcfn', 'a2'],
    hints: noHints ? [] : o.hints,
    noHints,
    subgoals: o.subgoals || [],
    solution: o.solution || [{ html: showWith(judge, readWith(judge, line), { display: 'block' }), note: '' }],
    answerHtml: o.answerHtml || showWith(judge, readWith(judge, line)),
    baits: o.baits || ['a2_fubini_outer_var'],
    key: `${o.skill}:domain:${o.key}`,
    expectedSec: o.expectedSec || 90,
    exam,
    fallback: !!o.fallback,
  };
}

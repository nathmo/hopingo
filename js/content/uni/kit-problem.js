// Constructors of `problem` items (spec §6, step U4; engine in
// js/judges/problem.js).
//
// problemItem({skill, level, prompt, parts: [{item, points, title?}], key,
//              exam?, expectedSec?, fallback?})
//   points: a number (one step, or spread over the segments of a lines
//   part by their reference lines) or a list, one number per step.
// asProblem(item, total, {points?}): one item as a one-part problem (the
//   open exam variants of earlier steps, the long problems of U2): its
//   segments are the steps.
// splitPoints(total, weights) → points per step, in halves, summing to total.

import { segmentsOf } from '../../judges/lines.js';
import { t } from '../../i18n.js';

const stepsOf = (item) => (item.type === 'lines' ? segmentsOf(item) : [null]);

export function splitPoints(total, weights) {
  const n = weights.length;
  if (!n) return [];
  const W = weights.reduce((s, w) => s + Math.max(w, 0.0001), 0);
  // Halves: at least 0,5 per step, the rest by the largest remainders.
  const units = Math.round(total * 2);
  const base = weights.map(() => (units >= n ? 1 : 0));
  let left = units - base.reduce((s, x) => s + x, 0);
  const share = weights.map((w) => (Math.max(w, 0.0001) / W) * left);
  const out = base.map((b, i) => b + Math.floor(share[i]));
  left = units - out.reduce((s, x) => s + x, 0);
  const order = share.map((x, i) => ({ i, r: x - Math.floor(x) })).sort((a, b) => b.r - a.r);
  for (let k = 0; k < left; k++) out[order[k % n].i] += 1;
  return out.map((u) => u / 2);
}

function pointsOf(item, points) {
  const steps = stepsOf(item);
  if (Array.isArray(points)) {
    if (points.length !== steps.length) throw new Error(`${item.key}: ${points.length} barèmes pour ${steps.length} étapes`);
    return points;
  }
  if (steps.length === 1) return [points];
  const weights = steps.map((s) => s.lines.filter((l) => l.kind === 'eq' || l.kind === 'decision').length);
  return splitPoints(points, weights);
}

const strip = (html) => String(html || '').replace(/<[^>]+>/g, '').trim();

export function problemItem(o) {
  const parts = o.parts.map((p) => ({ ...p.item, noHints: true, hints: [], followError: p.item.type === 'lines' ? true : p.item.followError }));
  const points = o.parts.map((p, i) => pointsOf(parts[i], p.points));
  // A title per step: the part's own title, then the segments' headings.
  const titles = o.parts.map((p, i) => stepsOf(parts[i]).map((seg, s) => {
    if (s === 0) return p.title || (o.parts.length > 1 ? strip(parts[i].prompt) : t('Début du problème'));
    return (seg.html || '').replace(/\s*:\s*$/, '') || t('Étape {n}', { n: s + 1 });
  }));
  const solution = parts.flatMap((p, i) => [
    ...(o.parts.length > 1 ? [{ html: `<b>${o.parts[i].title || strip(p.prompt)}</b>`, note: '' }] : []),
    ...(p.solution || []),
  ]);
  const total = points.flat().reduce((s, x) => s + x, 0);
  return {
    skill: o.skill, level: o.level, type: 'problem', prompt: o.prompt,
    parts, points, titles,
    noHints: true, resumable: true, hints: [],
    baits: [...new Set(parts.flatMap((p) => p.baits || []))],
    subgoals: [...new Map(parts.flatMap((p) => p.subgoals || []).map((g) => [g.id + g.skill, g])).values()],
    solution,
    answerHtml: parts[parts.length - 1]?.answerHtml || '',
    key: `${o.skill}:problem:${o.key}`,
    exam: o.exam || false,
    total,
    expectedSec: o.expectedSec || Math.max(300, parts.reduce((s, p) => s + (p.expectedSec || 60), 0)),
    fallback: !!o.fallback || parts.some((p) => p.fallback),
  };
}

// One item as a problem: its prompt becomes the problem's, its segments the steps.
export function asProblem(item, total, { points } = {}) {
  if (item.type === 'problem') return item;
  const pts = points ?? total ?? item.exam?.points ?? 1;
  const part = { ...item, prompt: '' };
  const p = problemItem({
    skill: item.skill, level: item.level, prompt: item.prompt,
    parts: [{ item: part, points: pts }],
    key: item.key, exam: item.exam, expectedSec: Math.max(item.expectedSec || 300, 300), fallback: item.fallback,
  });
  p.key = `${item.key}:problem`;
  return p;
}

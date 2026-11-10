// The `domain` item (spec §6, §16.3; step U6): the bounds of a double or
// triple integral, one field per bound, outer variable first. The fields are
// joined into a line « lo ≤ v ≤ hi ; … » and judged by the `domain` judge.
// item = {type: 'domain', judge: {kind: 'domain', …cfg}, fields: [{v}],
//         answer: {v: [lo, hi]}, answerShape}

import { judgeLine } from './domain.js';

export const domainLine = (item, values) => item.fields.map(({ v }) => `${values[v]?.[0] ?? ''} ≤ ${v} ≤ ${values[v]?.[1] ?? ''}`).join(' ; ');

// → {correct, verdict}
export function judgeDomainItem(item, values) {
  const blank = item.fields.find(({ v }) => !String(values[v]?.[0] ?? '').trim() || !String(values[v]?.[1] ?? '').trim());
  if (blank) return { correct: false, verdict: { kind: 'parse', message: `Remplis les deux bornes de ${blank.v}.` } };
  const verdict = judgeLine(item.judge, null, domainLine(item, values), {});
  return { correct: verdict.kind === 'done', verdict };
}

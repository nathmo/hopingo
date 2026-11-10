// The `matrix` item (spec §6, step U3): one answer in a grid, judged by the
// item's judge from its start line; right when the judge says `done`.
// judgeMatrixItem(item, text) → {correct, verdict}

import { judgeFor, readWith } from './index.js';

export function judgeMatrixItem(item, text) {
  const cfg = item.judge;
  const prev = readWith(cfg, item.start?.math ?? '?');
  const verdict = judgeFor(cfg).judgeLine(cfg, prev, text, {});
  return { correct: verdict.kind === 'done', verdict };
}

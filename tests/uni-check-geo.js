// Checks of the step U5 item parts (judges vector, geom, conic, and `plot`
// items), called by tests/uni-check.js.
import assert from 'node:assert/strict';
import { JUDGES, readWith } from '../js/judges/index.js';
import { templateOf, blankAnswers } from '../js/judges/lines.js';
import { checkPlot } from '../js/judges/plot.js';
import { vText } from '../js/cas/vecexpr.js';
import { add, num } from '../js/cas/ast.js';

export const GEO_JUDGES = ['vector', 'geom', 'conic'];

// A line the judge must refuse, from the final line of the first part.
export function wrongGeo(cfg, final) {
  if (cfg.kind === 'vector') {
    const node = readWith(cfg, final);
    const v = node.value;
    if (v?.k === 'v') return vText({ k: 'v', items: v.items.map((x, i) => (i === 0 ? add(x, num(7)) : x)) });
    return `${final}+7`;
  }
  if (cfg.kind === 'geom' && /\(\s*x\s*;/.test(final)) return final.replace(/\)\s*$/, '+1)');
  if (cfg.kind === 'conic' && /\)\s*$/.test(final)) return final.replace(/\)\s*$/, '+1)');
  return `${final}+1`;
}

export function checkOwnTemplate(cfg, line, where) {
  const ml = JUDGES[cfg.kind].templateML(cfg, templateOf(line), {});
  const n = (ml.match(/data-blank=/g) || []).length;
  assert.equal(n, line.blanks.length, `${where}: ${line.blanks.length} blanks drawn in ${line.math}`);
  assert.ok(blankAnswers(line).every((a) => a.length > 0), `${where}: empty blank`);
}

export function checkPlotItem(it, where) {
  assert.ok(it.view && it.place?.length && it.expect, `${where}: plot fields`);
  const r = checkPlot(it, it.answer);
  assert.ok(r.ok, `${where}: reference placement refused ${JSON.stringify(r.parts)}`);
  // The first element moved by 2: refused.
  const p = it.place[0];
  const shift = ([P, Q]) => {
    const d = [Q[0] - P[0], Q[1] - P[1]];
    const k = 2 / Math.hypot(...d);
    return [P, Q].map((X) => [X[0] - k * d[1], X[1] + k * d[0]]);
  };
  const moved = { ...it.answer, [p.id]: it.answer[p.id].map((g, i) => (i ? g : p.kind === 'point' ? [g[0] + 2, g[1] + 1] : shift(g))) };
  assert.equal(checkPlot(it, moved).ok, false, `${where}: a misplaced element is accepted`);
  if (!it.noHints) assert.equal(it.hints.length, 3, `${where}: three hints`);
}

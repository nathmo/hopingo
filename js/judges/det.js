// Judge `det` (step U3, catalogue L lacuna 2): lines with determinants,
// « −4·det[[2, 0, 3], [1, −1, 0], [3, 0, 1]] », « (2 − λ)·det[[3 − λ, 1], [1, 3 − λ]] »,
// « det(A − λI) ». A line keeps the value of the previous one (each det is
// computed by matexpr.js, exactly in ℚ(λ)); it is shown as written.
//
// cfg: {kind:'det', vars?: ['λ'], names?: {A: '[[…]]'},
//       target: 'number' (default) | 'factored' (a product of factors of
//       degree ≤ 1 or irreducible) | 'expanded' | 'any'}
// The traps of `det` read the det(…) of the previous line: detsOf(node).

import { sameScalar, exprML, hasDet } from '../cas/matexpr.js';
import { isExpanded } from '../cas/polyx.js';
import { diagnoseLine } from './diagnose.js';
import { readMat, mopts, wrongV, buildLine, text, input, litNum } from './matcommon.js';
import * as polyJudge from './poly.js';

export { text, input };

// Lines are shown as written: det(…) kept.
export function parseLine(cfg, t) {
  const node = buildLine(cfg, t);
  if (node.body && !node.raw) return { ...node, ml: exprML(node.body), raw: true };
  return node;
}

export const show = (cfg, node, opts = {}) => `<math${opts.display ? ' display="block"' : ''}><mrow>${node.label ? `<mtext>${node.label}</mtext><mo>=</mo>` : ''}${node.ml ?? exprML(node.body)}</mrow></math>`;

// The det(…) sub-expressions of a line: [{ast, path}] (ast.e is the matrix).
export function detsOf(node) {
  const out = [];
  const walk = (a) => {
    if (!a || typeof a !== 'object' || !a.op) return;
    if (a.op === 'det') out.push(a);
    for (const k of ['e', 'a', 'b']) if (a[k]) walk(a[k]);
    for (const x of a.items || []) walk(x);
  };
  walk(node.body);
  return out;
}

export function isFinal(cfg, node) {
  if (!node.body || hasDet(node.body) || node.value?.k !== 's') return false;
  const n = node.value.n;
  const v = cfg.vars?.[0];
  switch (cfg.target || 'number') {
    case 'number': return litNum(n);
    case 'factored': return polyJudge.isFinal({ v, target: 'factored-R' }, n) === true;
    case 'expanded': return isExpanded(n, v);
    default: return true;
  }
}

export const start = (cfg) => cfg.start;

export function judgeLine(cfg, prev, input) {
  const read = readMat(cfg, input);
  if (read.error) return read.error;
  let node = read.node;
  if (node.body && !node.raw) node = { ...node, ml: exprML(node.body), raw: true };
  const opts = mopts(cfg);
  if (node.value?.k !== 's') return { kind: 'form', node, message: 'Écris une expression du déterminant (un nombre, ou des det[[…]]).' };
  if (node.text === prev.text) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  if (!sameScalar(node.value.n, prev.value.n, opts)) {
    const diag = diagnoseLine('det', prev, node, cfg, (c, n) => sameScalar(c.value?.n ?? c, n.value.n, opts));
    return wrongV(node, 'Cette ligne n\'a pas la même valeur que la précédente.', diag);
  }
  if (isFinal(cfg, node)) return { kind: 'done', node };
  return { kind: 'ok', node };
}

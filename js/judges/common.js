// Pieces shared by the line judges: reading a line with the item's
// declarations, the « same line » test, and readable messages.

import { parse } from '../cas/parse.js';
import { equalsStructural, symbolsIn } from '../cas/ast.js';

export const parseOpts = (cfg = {}) => ({
  vars: cfg.vars, funcs: cfg.funcs, complex: cfg.complex, dvar: cfg.dvar || cfg.vars?.[0] || 'x',
});

// Reads a line. A leading « = » is allowed: the student may copy it.
// Returns {node} or {error} (a parse verdict).
export function readLine(cfg, input) {
  if (input && typeof input === 'object') return { node: input };
  const text = String(input ?? '').replace(/^\s*=/, '');
  let node;
  try {
    node = parse(text, parseOpts(cfg));
  } catch (e) {
    return { error: { kind: 'parse', message: e.message } };
  }
  if (cfg.vars) {
    const known = new Set([...cfg.vars, ...(cfg.params || [])]);
    const unknown = [...symbolsIn(node)].filter((s) => !known.has(s));
    if (unknown.length) {
      return { error: { kind: 'parse', node, message: `Je ne connais pas la lettre « ${unknown[0].replace(/_$/, '')} » ici : la variable est ${cfg.vars.join(', ')}.` } };
    }
  }
  return { node };
}

export const sameLine = (a, b) => equalsStructural(a, b, { parens: false });

// 1,25 — French decimal, at most `digits` decimals.
export function frNum(x, digits = 2) {
  if (!Number.isFinite(x)) return String(x);
  const r = Number(x.toFixed(digits));
  return String(r).replace('.', ',').replace('-', '−');
}
